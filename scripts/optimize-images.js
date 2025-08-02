const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image optimization script for reducing file sizes
 * Processes PNG and JPEG images in the out/images directory to reduce file sizes
 * while maintaining quality. Uses Sharp library for high-quality image compression.
 * Provides detailed progress reporting and statistics on optimization results.
 */
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Get original directory size for comparison
  const originalSize = getDirectorySize('./out/images');
  console.log(`Original image size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Find all image files recursively
  const imageFiles = findImageFiles('./out/images');
  console.log(`Files to process: ${imageFiles.length}`);
  
  let processedCount = 0;
  let totalSaved = 0;
  
  // Process each image file
  for (const file of imageFiles) {
    try {
      const originalStats = fs.statSync(file);
      const originalSize = originalStats.size;
      
      // Get file extension for processing
      const ext = path.extname(file).toLowerCase();
      
      if (ext === '.png') {
        // Optimize PNG files with high compression
        await sharp(file)
          .png({ quality: 80, compressionLevel: 9 })
          .toBuffer()
          .then(buffer => {
            fs.writeFileSync(file, buffer);
            const newStats = fs.statSync(file);
            const saved = originalSize - newStats.size;
            totalSaved += saved;
            processedCount++;
            console.log(`Optimized: ${file} (${(saved / 1024).toFixed(1)}KB saved)`);
          });
      } else if (ext === '.jpg' || ext === '.jpeg') {
        // Optimize JPEG files with progressive encoding
        await sharp(file)
          .jpeg({ quality: 80, progressive: true })
          .toBuffer()
          .then(buffer => {
            fs.writeFileSync(file, buffer);
            const newStats = fs.statSync(file);
            const saved = originalSize - newStats.size;
            totalSaved += saved;
            processedCount++;
            console.log(`Optimized: ${file} (${(saved / 1024).toFixed(1)}KB saved)`);
          });
      }
    } catch (error) {
      console.error(`Error: ${file} - ${error.message}`);
    }
  }
  
  // Get optimized directory size for final comparison
  const optimizedSize = getDirectorySize('./out/images');
  console.log(`\nOptimization complete!`);
  console.log(`Files processed: ${processedCount}`);
  console.log(`Optimized image size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Size reduction: ${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reduction rate: ${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}%`);
}

/**
 * Recursively find all image files in a directory
 * @param dir - Directory path to search
 * @returns Array of image file paths
 */
function findImageFiles(dir) {
  const files = [];
  
  /**
   * Recursively scan directory for image files
   * @param currentDir - Current directory being scanned
   */
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(fullPath);
      } else {
        // Check if file is an image
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

/**
 * Calculate total size of a directory and all its subdirectories
 * @param dirPath - Directory path to calculate size for
 * @returns Total size in bytes
 */
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  /**
   * Recursively calculate size of files and directories
   * @param currentPath - Current path being processed
   */
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
      // Process all files in directory
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      // Add file size to total
      totalSize += stats.size;
    }
  }
  
  calculateSize(dirPath);
  return totalSize;
}

// Execute image optimization
optimizeImages().catch(console.error); 