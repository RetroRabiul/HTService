const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'favicon');
const destDir = path.join(__dirname, '..', 'public');

const filesToCopy = [
  'favicon-96x96.png',
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png',
  'site.webmanifest'
];

for (const file of filesToCopy) {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file}`);
    } else {
      console.warn(`Source missing, skipping: ${file}`);
    }
  } catch (err) {
    console.error(`Failed to copy ${file}:`, err.message);
    process.exitCode = 1;
  }
}

console.log('Favicon copy script finished.');
