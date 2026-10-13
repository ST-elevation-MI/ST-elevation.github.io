'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync, spawnSync } = require('node:child_process');
const quizRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(quizRoot, '..');
const sourceAssets = ['index.html', 'style.css', 'countries.js', 'quiz-types.js', 'quiz-engine.js', 'script.js'];
const siteAssets = [
  'mori-stay/index.html',
  'mori-stay/partner/index.html',
  'mori-stay/assets/korea-stay.png'
];
const publicSharedAssets = ['style.css', 'countries.js', 'quiz-types.js', 'quiz-engine.js', 'script.js'];
const quizTypes = ['country-to-capital', 'capital-to-country', 'flag-to-country'];
const continents = {
  africa: 'Africa', asia: 'Asia', europe: 'Europe',
  'north-america': 'North America', 'south-america': 'South America', oceania: 'Oceania'
};
const html = fs.readFileSync(path.join(quizRoot, 'index.html'), 'utf8');
assert.match(html, /http-equiv="Content-Security-Policy"/);
for (const directive of ["default-src 'none'", "script-src 'self'", "connect-src 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]) assert.ok(html.includes(directive));
assert.doesNotMatch(html, /unsafe-inline|unsafe-eval|\son\w+\s*=/i);
assert.match(html, /name="referrer" content="no-referrer"/);
for (const locale of ['ko', 'en', 'ja']) assert.match(html, new RegExp(`id="language-link-${locale}" href="../_site/${locale}/"`));
for (const typeId of quizTypes) assert.ok(html.includes(`href="../_site/ko/quiz/${typeId}/"`));
for (const slug of Object.keys(continents)) assert.ok(html.includes(`href="../_site/ko/practice/${slug}/country-to-capital/"`));
for (const match of html.matchAll(/<script\b[^>]*src="([^"]+)"/g)) assert.ok(publicSharedAssets.includes(match[1]));
// These are regression checks, not a general-purpose secret scanner.
for (const [base, name] of [
  ...sourceAssets.map(name => [quizRoot, name]),
  ...siteAssets.map(name => [projectRoot, name])
]) {
  const content = fs.readFileSync(path.join(base, name), 'utf8');
  if (!name.endsWith('.png')) assert.doesNotMatch(content, /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|github_pat_[A-Za-z0-9_]+|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/);
}
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'capital-quiz-build-test-'));
try {
  const tempQuiz = path.join(temp, 'capital-quiz');
  fs.mkdirSync(path.join(tempQuiz, 'scripts'), { recursive: true });
  fs.copyFileSync(path.join(quizRoot, 'scripts/build-site.cjs'), path.join(tempQuiz, 'scripts/build-site.cjs'));
  fs.copyFileSync(path.join(quizRoot, 'scripts/locales.cjs'), path.join(tempQuiz, 'scripts/locales.cjs'));
  for (const file of sourceAssets) {
    fs.mkdirSync(path.dirname(path.join(tempQuiz, file)), { recursive: true });
    fs.copyFileSync(path.join(quizRoot, file), path.join(tempQuiz, file));
  }
  for (const file of siteAssets) {
    fs.mkdirSync(path.dirname(path.join(temp, file)), { recursive: true });
    fs.copyFileSync(path.join(projectRoot, file), path.join(temp, file));
  }
  fs.writeFileSync(path.join(temp, '.env'), 'TEST_ONLY=must-not-publish');
  fs.writeFileSync(path.join(temp, 'private-notes.txt'), 'TEST_ONLY');
  execFileSync(process.execPath, [path.join(tempQuiz, 'scripts/build-site.cjs')]);
  assert.deepEqual(fs.readdirSync(path.join(temp, '_site')).sort(), ['countries.js', 'en', 'index.html', 'ja', 'ko', 'mori-stay', 'quiz-engine.js', 'quiz-types.js', 'robots.txt', 'script.js', 'sitemap.xml', 'style.css']);
  assert.deepEqual(fs.readdirSync(path.join(temp, '_site', 'mori-stay')).sort(), ['assets', 'index.html', 'partner']);
  assert.deepEqual(fs.readdirSync(path.join(temp, '_site', 'mori-stay', 'partner')), ['index.html']);
  assert.deepEqual(fs.readdirSync(path.join(temp, '_site', 'mori-stay', 'assets')), ['korea-stay.png']);
  for (const locale of ['ko', 'en', 'ja']) {
    const localized = fs.readFileSync(path.join(temp, '_site', locale, 'index.html'), 'utf8');
    assert.match(localized, new RegExp(`<html lang="${locale}">`));
    assert.match(localized, new RegExp(`<link rel="canonical" href="https://st-elevation-mi.github.io/ST-elevation.github.io/${locale}/">`));
    for (const alternate of ['ko', 'en', 'ja', 'x-default']) assert.match(localized, new RegExp(`hreflang="${alternate}"`));
    assert.match(localized, /href="\.\.\/style\.css"/);
    assert.match(localized, /src="\.\.\/script\.js"/);
    assert.match(localized, /src="\.\.\/quiz-types\.js"/);
    assert.match(localized, /src="\.\.\/quiz-engine\.js"/);
    assert.match(localized, /<body data-page-kind="hub">/);
  }
  const typePages = Object.fromEntries(quizTypes.map(typeId => [typeId, `quiz/${typeId}`]));
  const practicePages = Object.entries(continents).flatMap(([slug, continent]) =>
    quizTypes.map(typeId => ({ typeId, slug, continent, route: `practice/${slug}/${typeId}` }))
  );
  const pageTitles = new Set();
  for (const locale of ['ko', 'en', 'ja']) for (const [typeId, route] of Object.entries(typePages)) {
    const pagePath = path.join(temp, '_site', locale, ...route.split('/'), 'index.html');
    assert.ok(fs.existsSync(pagePath), `missing ${locale}/${route}`);
    const localized = fs.readFileSync(pagePath, 'utf8');
    const canonical = `https://st-elevation-mi.github.io/ST-elevation.github.io/${locale}/${route}/`;
    assert.equal((localized.match(/<link rel="canonical"/g) || []).length, 1);
    assert.ok(localized.includes(`<link rel="canonical" href="${canonical}">`));
    assert.ok(localized.includes(`<body data-page-kind="quiz" data-quiz-type="${typeId}">`));
    assert.ok(localized.includes(`id="type-${typeId}" aria-current="page"`));
    assert.ok(localized.includes('id="scope-all" aria-current="page"'));
    assert.match(localized, /href="\.\.\/\.\.\/\.\.\/style\.css"/);
    for (const alternate of ['ko', 'en', 'ja', 'x-default']) assert.match(localized, new RegExp(`hreflang="${alternate}"`));
    pageTitles.add(localized.match(/<title>([^<]+)<\/title>/)[1]);
  }
  for (const locale of ['ko', 'en', 'ja']) for (const { typeId, slug, continent, route } of practicePages) {
    const pagePath = path.join(temp, '_site', locale, ...route.split('/'), 'index.html');
    assert.ok(fs.existsSync(pagePath), `missing ${locale}/${route}`);
    const localized = fs.readFileSync(pagePath, 'utf8');
    const canonical = `https://st-elevation-mi.github.io/ST-elevation.github.io/${locale}/${route}/`;
    assert.equal((localized.match(/<link rel="canonical"/g) || []).length, 1);
    assert.ok(localized.includes(`<link rel="canonical" href="${canonical}">`));
    assert.ok(localized.includes(`<body data-page-kind="quiz" data-quiz-type="${typeId}" data-continent="${continent}">`));
    assert.ok(localized.includes(`id="type-${typeId}" aria-current="page"`));
    assert.ok(localized.includes(`id="scope-${slug}" aria-current="page"`));
    assert.match(localized, /href="\.\.\/\.\.\/\.\.\/\.\.\/style\.css"/);
    for (const alternateType of quizTypes) assert.ok(localized.includes(`href="../../../practice/${slug}/${alternateType}/"`));
    assert.ok(localized.includes(`href="../../../../en/${route}/"`));
    for (const alternate of ['ko', 'en', 'ja', 'x-default']) assert.match(localized, new RegExp(`hreflang="${alternate}"`));
    pageTitles.add(localized.match(/<title>([^<]+)<\/title>/)[1]);
  }
  assert.equal(pageTitles.size, 63);
  const english = fs.readFileSync(path.join(temp, '_site/en/index.html'), 'utf8');
  const japanese = fs.readFileSync(path.join(temp, '_site/ja/index.html'), 'utf8');
  assert.match(english, /How far will you go\?/);
  assert.match(japanese, /どこまで挑戦しますか？/);
  const sitemap = fs.readFileSync(path.join(temp, '_site/sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<url>/g) || []).length, 66);
  for (const route of Object.values(typePages)) for (const locale of ['ko', 'en', 'ja']) assert.ok(sitemap.includes(`/${locale}/${route}/`));
  for (const { route } of practicePages) for (const locale of ['ko', 'en', 'ja']) assert.ok(sitemap.includes(`/${locale}/${route}/`));
  assert.match(fs.readFileSync(path.join(temp, '_site/robots.txt'), 'utf8'), /Sitemap: https:\/\//);
  fs.writeFileSync(path.join(temp, '_site', 'leftover.txt'), 'TEST_ONLY');
  assert.notEqual(spawnSync(process.execPath, [path.join(tempQuiz, 'scripts/build-site.cjs')]).status, 0);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
console.log('PASS: CSP, common secret patterns, localized quiz and MORI STAY deployment allowlist, SEO metadata, sitemap and stale build rejection.');
