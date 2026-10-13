'use strict';
// Only these reviewed public assets may enter the Pages artifact.
const fs = require('node:fs');
const path = require('node:path');
const { LOCALES, PAGES, renderPage } = require('./locales.cjs');
const quizRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(quizRoot, '..');
const output = path.join(projectRoot, '_site');
const publicAssets = [
  ...[
    'data/countries.js', 'data/capital-context.js',
    'engine/quiz-types.js', 'engine/quiz-engine.js', 'engine/quiz-session.js',
    'ui/style.css', 'ui/messages.js', 'ui/quiz-type-text.js', 'ui/quiz-view.js', 'app.js'
  ].map(file => [file, path.join(quizRoot, file)]),
  ['mori-stay/index.html', path.join(projectRoot, 'mori-stay/index.html')],
  ['mori-stay/partner/index.html', path.join(projectRoot, 'mori-stay/partner/index.html')],
  ['mori-stay/assets/korea-stay.png', path.join(projectRoot, 'mori-stay/assets/korea-stay.png')]
];
const defaultSiteUrl = 'https://st-elevation-mi.github.io/ST-elevation.github.io';
const siteUrl = (process.env.SITE_URL || defaultSiteUrl).replace(/\/$/, '');
if (!/^https:\/\/[^/]+(?:\/[^?#]*)?$/.test(siteUrl)) throw new Error('SITE_URL must be an absolute HTTPS URL.');
// Fail closed rather than publish leftovers or follow a directory symlink.
if (fs.existsSync(output)) {
  if (!fs.lstatSync(output).isDirectory() || fs.readdirSync(output).length) {
    throw new Error('_site must be absent or an empty real directory. Review and remove the old build before rebuilding.');
  }
} else fs.mkdirSync(output);
for (const [destinationName, source] of publicAssets) {
  if (!fs.lstatSync(source).isFile()) throw new Error(`Not a regular file: ${destinationName}`);
  const destination = path.join(output, destinationName);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
}
const template = fs.readFileSync(path.join(quizRoot, 'ui/index.html'), 'utf8');
for (const locale of Object.keys(LOCALES)) {
  const localeDirectory = path.join(output, locale);
  fs.mkdirSync(localeDirectory);
  for (const [pageId, page] of Object.entries(PAGES)) {
    const pageDirectory = page.route ? path.join(localeDirectory, ...page.route.split('/')) : localeDirectory;
    if (page.route) fs.mkdirSync(pageDirectory, { recursive: true });
    fs.writeFileSync(path.join(pageDirectory, 'index.html'), renderPage(template, locale, pageId, siteUrl), { flag: 'wx' });
  }
}
const alternates = Object.keys(LOCALES).map((locale) =>
  `  <link rel="alternate" hreflang="${locale}" href="${siteUrl}/${locale}/">`
).join('\n');
const rootPage = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'; form-action 'none'">
  <meta name="referrer" content="no-referrer">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=./ko/">
  <title>WORLD CAPITAL QUIZ</title>
  <link rel="canonical" href="${siteUrl}/ko/">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/ko/">
</head>
<body><p><a href="./ko/">한국어 퀴즈로 이동</a> · <a href="./en/" lang="en">English</a> · <a href="./ja/" lang="ja">日本語</a></p></body>
</html>
`;
fs.writeFileSync(path.join(output, 'index.html'), rootPage, { flag: 'wx' });
const sitemapEntries = Object.entries(PAGES).flatMap(([pageId, page]) => Object.keys(LOCALES).map((locale) => ({ pageId, page, locale })));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.map(({ page, locale }) => {
  const suffix = page.route ? `${page.route}/` : '';
  return `  <url>
    <loc>${siteUrl}/${locale}/${suffix}</loc>
${Object.keys(LOCALES).map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${siteUrl}/${alternate}/${suffix}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/ko/${suffix}"/>
  </url>`;
}).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(output, 'sitemap.xml'), sitemap, { flag: 'wx' });
fs.writeFileSync(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, { flag: 'wx' });
console.log('Public artifact contains shared assets plus localized quiz-type pages, sitemap.xml and robots.txt.');
