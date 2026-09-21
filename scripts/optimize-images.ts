import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

/** Compresses PNG/JPEG in place and writes a WebP beside each; defaults to git-changed files.
 * Never replaces an output with a larger file: re-encoding an optimized image can grow it. */

const DEFAULT_ROOT = 'public/images';
const JPEG_QUALITY = 85; // Match Lighthouse audit comparison (level 85)
const PNG_QUALITY = 80;
const PNG_COMPRESSION_LEVEL = 9;
const WEBP_QUALITY = 85;

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg']);

/** Images git does not have yet, plus ones whose bytes differ from HEAD. */
function gitChangedImages(root: string): string[] {
  const git = (args: string[]) =>
    execFileSync('git', args, { encoding: 'utf8' })
      .split('\0')
      .filter(Boolean);

  const untracked = git(['ls-files', '--others', '--exclude-standard', '-z', '--', root]);
  // Against HEAD, not the index: a staged image is a difference from the
  // commit, and comparing to the index would report nothing for it.
  const changed = git(['diff', '--name-only', '-z', 'HEAD', '--', root]);

  return [...new Set([...untracked, ...changed])]
    .filter(f => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .filter(f => fs.existsSync(f));
}

function findImageFiles(dir: string): string[] {
  const files: string[] = [];
  function scan(current: string): void {
    for (const item of fs.readdirSync(current)) {
      const full = path.join(current, item);
      if (fs.statSync(full).isDirectory()) scan(full);
      else if (IMAGE_EXT.has(path.extname(item).toLowerCase())) files.push(full);
    }
  }
  scan(dir);
  return files;
}

/** Expands the arguments, which may name either files or directories. */
function expandTargets(targets: string[]): string[] {
  const files: string[] = [];
  for (const target of targets) {
    if (!fs.existsSync(target)) {
      console.error(`Skipping ${target} (not found)`);
      continue;
    }
    if (fs.statSync(target).isDirectory()) files.push(...findImageFiles(target));
    else if (IMAGE_EXT.has(path.extname(target).toLowerCase())) files.push(target);
    else console.error(`Skipping ${target} (not an image)`);
  }
  return files;
}

/** Writes only when the new bytes are smaller than what is already there. */
function writeIfSmaller(file: string, bytes: Buffer): number {
  const current = fs.existsSync(file) ? fs.statSync(file).size : Infinity;
  if (bytes.length >= current) return 0;
  fs.writeFileSync(file, bytes);
  return current === Infinity ? 0 : current - bytes.length;
}

async function optimizeImages(): Promise<void> {
  const targets = process.argv.slice(2);
  const imageFiles = targets.length ? expandTargets(targets) : gitChangedImages(DEFAULT_ROOT);

  if (imageFiles.length === 0) {
    console.log(
      targets.length
        ? 'Nothing to do: no images in the given paths.'
        : `Nothing to do: git reports no new or modified images under ${DEFAULT_ROOT}.`
    );
    return;
  }

  console.log(`Processing ${imageFiles.length} image(s)...`);
  let rewritten = 0;
  let saved = 0;
  let webpWritten = 0;

  for (const file of imageFiles) {
    try {
      const ext = path.extname(file).toLowerCase();
      const webpPath = path.join(path.dirname(file), `${path.basename(file, ext)}.webp`);
      // Read once and encode from these bytes. Deriving the WebP from a
      // freshly quantized PNG instead makes it larger, not smaller.
      const original = fs.readFileSync(file);

      const recompressed =
        ext === '.png'
          ? await sharp(original).png({ quality: PNG_QUALITY, compressionLevel: PNG_COMPRESSION_LEVEL }).toBuffer()
          : await sharp(original).jpeg({ quality: JPEG_QUALITY, progressive: true }).toBuffer();

      const gained = writeIfSmaller(file, recompressed);
      if (gained > 0) {
        saved += gained;
        rewritten++;
      }

      const webp = await sharp(original).webp({ quality: WEBP_QUALITY }).toBuffer();
      const existed = fs.existsSync(webpPath);
      if (writeIfSmaller(webpPath, webp) > 0 || !existed) webpWritten++;
    } catch (err) {
      console.error(`Error: ${file} -`, (err as Error).message);
    }
  }

  console.log(`  Rewritten: ${rewritten} of ${imageFiles.length}, saved ${(saved / 1024).toFixed(1)} KiB`);
  console.log(`  WebP written: ${webpWritten} (the rest were already smaller)`);
  console.log('\nDone.');
}

optimizeImages().catch(console.error);
