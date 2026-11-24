const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = path.join(root, 'index.html');
const www = path.join(root, 'www', 'index.html');
const androidPublic = path.join(root, 'android', 'app', 'src', 'main', 'assets', 'public', 'index.html');

if (!fs.existsSync(src)) {
  console.error('Missing index.html');
  process.exit(1);
}

fs.mkdirSync(path.dirname(www), { recursive: true });
fs.copyFileSync(src, www);

if (fs.existsSync(path.dirname(path.dirname(androidPublic)))) {
  fs.mkdirSync(path.dirname(androidPublic), { recursive: true });
  fs.copyFileSync(src, androidPublic);
}

console.log('✅ synced index.html → www/ and android assets');
