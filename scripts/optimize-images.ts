import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Image optimization script (Lighthouse "uses-optimized-images").
 * - Compresses PNG/JPEG in public/images (and optionally out/images).
 * - Generates WebP versions for smaller delivery.
 * @see https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images
 */

const PUBLIC_IMAGES = './public/images';
const OUT_IMAGES = './out/images';
const JPEG_QUALITY = 85; // Match Lighthouse audit comparison (level 85)
const PNG_QUALITY = 80;
const PNG_COMPRESSION_LEVEL = 9;
const WEBP_QUALITY = 85;

async function optimizeImages(): Promise<void> {
  const dirs = [PUBLIC_IMAGES];
  if (fs.existsSync(OUT_IMAGES)) dirs.push(OUT_IMAGES);

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Skipping ${dir} (not found)`);
      continue;
    }
    console.log(`\nProcessing ${dir}...`);
    const imageFiles = findImageFiles(dir);
    let processedCount = 0;
    let totalSaved = 0;
    let webpCount = 0;

    for (const file of imageFiles) {
      try {
        const ext = path.extname(file).toLowerCase();
        const basename = path.basename(file, ext);
        const dirname = path.dirname(file);

        if (ext === '.png') {
          const originalStats = fs.statSync(file);
          const buffer = await sharp(file)
            .png({ quality: PNG_QUALITY, compressionLevel: PNG_COMPRESSION_LEVEL })
            .toBuffer();
          fs.writeFileSync(file, buffer);
          totalSaved += originalStats.size - buffer.length;
          processedCount++;
          const webpPath = path.join(dirname, `${basename}.webp`);
          await sharp(file).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
          webpCount++;
        } else if (ext === '.jpg' || ext === '.jpeg') {
          const originalStats = fs.statSync(file);
          const buffer = await sharp(file)
            .jpeg({ quality: JPEG_QUALITY, progressive: true })
            .toBuffer();
          fs.writeFileSync(file, buffer);
          totalSaved += originalStats.size - buffer.length;
          processedCount++;
          const webpPath = path.join(dirname, `${basename}.webp`);
          await sharp(file).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
          webpCount++;
        }
      } catch (err) {
        console.error(`Error: ${file} -`, (err as Error).message);
      }
    }

    console.log(`  Compressed: ${processedCount} images, saved ${(totalSaved / 1024).toFixed(1)} KiB`);
    console.log(`  WebP generated: ${webpCount} files`);
  }
  console.log('\nDone.');
}

function findImageFiles(dir: string): string[] {
  const files: string[] = [];
  function scan(current: string): void {
    const items = fs.readdirSync(current);
    for (const item of items) {
      const full = path.join(current, item);
      if (fs.statSync(full).isDirectory()) scan(full);
      else {
        const ext = path.extname(item).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') files.push(full);
      }
    }
  }
  scan(dir);
  return files;
}

optimizeImages().catch(console.error);
