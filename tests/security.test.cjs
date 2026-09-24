'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync, spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const assets = ['index.html', 'style.css', 'countries.js', 'script.js'];
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /http-equiv="Content-Security-Policy"/);
for (const directive of ["default-src 'none'", "script-src 'self'", "connect-src 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]) assert.ok(html.includes(directive));
assert.doesNotMatch(html, /unsafe-inline|unsafe-eval|\son\w+\s*=/i);
assert.match(html, /name="referrer" content="no-referrer"/);
for (const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g)) assert.ok(assets.includes(match[1]));
// These are regression checks, not a general-purpose secret scanner.
for (const name of assets) {
  const content = fs.readFileSync(path.join(root, name), 'utf8');
  assert.doesNotMatch(content, /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|github_pat_[A-Za-z0-9_]+|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/);
}
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'capital-quiz-build-test-'));
try {
  fs.mkdirSync(path.join(temp, 'scripts'));
  fs.copyFileSync(path.join(root, 'scripts/build-site.cjs'), path.join(temp, 'scripts/build-site.cjs'));
  for (const file of assets) fs.copyFileSync(path.join(root, file), path.join(temp, file));
  fs.writeFileSync(path.join(temp, '.env'), 'TEST_ONLY=must-not-publish');
  fs.writeFileSync(path.join(temp, 'private-notes.txt'), 'TEST_ONLY');
  execFileSync(process.execPath, [path.join(temp, 'scripts/build-site.cjs')]);
  assert.deepEqual(fs.readdirSync(path.join(temp, '_site')).sort(), [...assets].sort());
  fs.writeFileSync(path.join(temp, '_site', 'leftover.txt'), 'TEST_ONLY');
  assert.notEqual(spawnSync(process.execPath, [path.join(temp, 'scripts/build-site.cjs')]).status, 0);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
console.log('PASS: CSP, local assets, common secret patterns, four-file deployment allowlist, stale build rejection.');
