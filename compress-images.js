import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images', 'susmi-petter');

async function compressAll() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Compressing ${files.length} images in ${dir}...`);
  
  let totalSaved = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const statsBefore = fs.statSync(filePath);
    if (statsBefore.size === 0) continue; // Skip broken 0-byte file

    const tempPath = path.join(dir, `_temp_${file}`);

    await sharp(filePath)
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(tempPath);

    const statsAfter = fs.statSync(tempPath);
    fs.renameSync(tempPath, filePath);

    const saved = statsBefore.size - statsAfter.size;
    totalSaved += saved;
    console.log(`Compressed ${file}: ${(statsBefore.size / 1024).toFixed(0)}KB -> ${(statsAfter.size / 1024).toFixed(0)}KB (Saved ${(saved / 1024).toFixed(0)}KB)`);
  }

  console.log(`\nCOMPRESSION COMPLETE! Saved total ${(totalSaved / (1024 * 1024)).toFixed(2)} MB!`);
}

compressAll().catch(err => {
  console.error('Error during image compression:', err);
});
