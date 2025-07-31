const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('画像最適化を開始します...');
  
  // 元のサイズを取得
  const originalSize = getDirectorySize('./out/images');
  console.log(`元の画像サイズ: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // 画像ファイルを再帰的に検索
  const imageFiles = findImageFiles('./out/images');
  console.log(`処理対象ファイル数: ${imageFiles.length}`);
  
  let processedCount = 0;
  let totalSaved = 0;
  
  for (const file of imageFiles) {
    try {
      const originalStats = fs.statSync(file);
      const originalSize = originalStats.size;
      
      // ファイル拡張子を取得
      const ext = path.extname(file).toLowerCase();
      
      if (ext === '.png') {
        // PNG最適化
        await sharp(file)
          .png({ quality: 80, compressionLevel: 9 })
          .toBuffer()
          .then(buffer => {
            fs.writeFileSync(file, buffer);
            const newStats = fs.statSync(file);
            const saved = originalSize - newStats.size;
            totalSaved += saved;
            processedCount++;
            console.log(`最適化完了: ${file} (${(saved / 1024).toFixed(1)}KB 削減)`);
          });
      } else if (ext === '.jpg' || ext === '.jpeg') {
        // JPEG最適化
        await sharp(file)
          .jpeg({ quality: 80, progressive: true })
          .toBuffer()
          .then(buffer => {
            fs.writeFileSync(file, buffer);
            const newStats = fs.statSync(file);
            const saved = originalSize - newStats.size;
            totalSaved += saved;
            processedCount++;
            console.log(`最適化完了: ${file} (${(saved / 1024).toFixed(1)}KB 削減)`);
          });
      }
    } catch (error) {
      console.error(`エラー: ${file} - ${error.message}`);
    }
  }
  
  // 最適化後のサイズを取得
  const optimizedSize = getDirectorySize('./out/images');
  console.log(`\n最適化完了！`);
  console.log(`処理したファイル数: ${processedCount}`);
  console.log(`最適化後の画像サイズ: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`削減サイズ: ${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`削減率: ${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}%`);
}

function findImageFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
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

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }
  
  calculateSize(dirPath);
  return totalSize;
}

optimizeImages().catch(console.error); 