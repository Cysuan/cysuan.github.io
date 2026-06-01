import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(__dirname, '../dist/index.html');
const destination = path.resolve(__dirname, '../dist/404.html');

try {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    console.log('✅ Successfully copied index.html to 404.html for GitHub Pages!');
  } else {
    console.error('❌ Error: dist/index.html not found. Make sure build succeeded first.');
    process.exit(1);
  }
} catch (err) {
  console.error('❌ Failed to copy 404.html:', err);
  process.exit(1);
}