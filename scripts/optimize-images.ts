import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Image optimization script for reducing file sizes.
 * Processes PNG and JPEG images in the out/images directory.
 */
async function optimizeImages(): Promise<void> {
  console.log('Starting image optimization...');

  const imagesDir = './out/images';
  const originalSize = getDirectorySize(imagesDir);
  console.log(`Original image size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

  const imageFiles = findImageFiles(imagesDir);
  console.log(`Files to process: ${imageFiles.length}`);

  let processedCount = 0;
  let totalSaved = 0;

  for (const file of imageFiles) {
    try {
      const originalStats = fs.statSync(file);
      const originalFileSize = originalStats.size;
      const ext = path.extname(file).toLowerCase();

      if (ext === '.png') {
        const buffer = await sharp(file)
          .png({ quality: 80, compressionLevel: 9 })
          .toBuffer();
        fs.writeFileSync(file, buffer);
        const newStats = fs.statSync(file);
        const saved = originalFileSize - newStats.size;
        totalSaved += saved;
        processedCount++;
        console.log(`Optimized: ${file} (${(saved / 1024).toFixed(1)}KB saved)`);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        const buffer = await sharp(file)
          .jpeg({ quality: 80, progressive: true })
          .toBuffer();
        fs.writeFileSync(file, buffer);
        const newStats = fs.statSync(file);
        const saved = originalFileSize - newStats.size;
        totalSaved += saved;
        processedCount++;
        console.log(`Optimized: ${file} (${(saved / 1024).toFixed(1)}KB saved)`);
      }
    } catch (error) {
      console.error(`Error: ${file} -`, (error as Error).message);
    }
  }

  const optimizedSize = getDirectorySize(imagesDir);
  console.log('\nOptimization complete!');
  console.log(`Files processed: ${processedCount}`);
  console.log(`Optimized image size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Size reduction: ${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Reduction rate: ${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}%`
  );
}

function findImageFiles(dir: string): string[] {
  const files: string[] = [];

  function scanDirectory(currentDir: string): void {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        scanDirectory(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
          files.push(fullPath);
        }
      }
    }
  }
  scanDirectory(dir);
  return files;
}

function getDirectorySize(dirPath: string): number {
  let totalSize = 0;

  function calculateSize(currentPath: string): void {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      const entries = fs.readdirSync(currentPath);
      for (const entry of entries) {
        calculateSize(path.join(currentPath, entry));
      }
    } else {
      totalSize += stats.size;
    }
  }
  calculateSize(dirPath);
  return totalSize;
}

optimizeImages().catch(console.error);
