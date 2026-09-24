'use strict';
// Only these reviewed public assets may enter the Pages artifact.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const files = ['index.html', 'style.css', 'countries.js', 'script.js'];
// Fail closed rather than publish leftovers or follow a directory symlink.
if (fs.existsSync(output)) {
  if (!fs.lstatSync(output).isDirectory() || fs.readdirSync(output).length) {
    throw new Error('_site must be absent or an empty real directory. Review and remove the old build before rebuilding.');
  }
} else fs.mkdirSync(output);
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.lstatSync(source).isFile()) throw new Error(`Not a regular file: ${file}`);
  fs.copyFileSync(source, path.join(output, file), fs.constants.COPYFILE_EXCL);
}
console.log('Public artifact contains only:', fs.readdirSync(output).sort().join(', '));
