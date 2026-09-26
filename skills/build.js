#!/usr/bin/env node
/* Baut SKILL DECK zu EINER HTML-Datei zusammen (gleiche Technik wie CREW).
   Aufruf:  node skills/build.js
   Ergebnis:
     skills/dist/index.html        – vollständige Seite (GitHub Pages, USB-Stick, O:-Laufwerk)
     skills/dist/skills-vorschau.html – ohne <html>/<head>/<body> (für die Claude-Vorschau)
     skills/dist/sw.js, manifest.webmanifest – Offline-Unterstützung auf GitHub Pages */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
// Optionen (für paralleles Arbeiten):  --out <ordner>   --only radar,clash,solo-
const argv = process.argv.slice(2);
const argVal = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : null; };
const DIST = argVal('--out') ? path.resolve(argVal('--out')) : path.join(ROOT, 'dist');
const ONLY = argVal('--only') ? argVal('--only').split(',').map((s) => s.trim()).filter(Boolean) : null;
const allowed = (file) => !ONLY || ONLY.some((p) => path.basename(file).startsWith(p));

const read = (p) => fs.readFileSync(p, 'utf8');
const listJs = (dir) => {
  const d = path.join(SRC, dir);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter((f) => f.endsWith('.js')).sort().map((f) => path.join(d, f)).filter(allowed);
};

/* Schriften einbetten (keine externen Anfragen, datenschutzfreundlich) */
const FONTS = [
  ['Lilita One', 'lilita-one.woff2', '400', 'normal'],
  ['Rubik', 'rubik.woff2', '300 900', 'normal'],
  ['Pixelify Sans', 'pixelify-sans.woff2', '400 700', 'normal'],
  ['Chakra Petch', 'chakra-petch-400.woff2', '400', 'normal'],
  ['Chakra Petch', 'chakra-petch-600.woff2', '600', 'normal'],
];
const fontCss = FONTS.map(([fam, file, weight, style]) => {
  const b64 = fs.readFileSync(path.join(ROOT, 'assets', 'fonts', file)).toString('base64');
  return `@font-face{font-family:"${fam}";src:url(data:font/woff2;base64,${b64}) format("woff2");font-weight:${weight};font-style:${style};font-display:swap;}`;
}).join('\n');

/* CSS: Kern zuerst, dann Modul-CSS (falls vorhanden) */
const cssFiles = [path.join(SRC, 'core', 'styles.css')]
  .concat(['app', 'missions', 'battle'].flatMap((d) => {
    const dir = path.join(SRC, d);
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.css')).sort().map((f) => path.join(dir, f)).filter(allowed) : [];
  }));
const css = cssFiles.map((f) => `/* ---- ${path.relative(SRC, f)} ---- */\n` + read(f)).join('\n');

/* JS: feste Reihenfolge. app/main.js startet das Spiel und kommt zuletzt. */
const coreFirst = ['util.js', 'icons.js', 'sound.js', 'ui.js', 'registry.js'].map((f) => path.join(SRC, 'core', f));
const appFiles = listJs('app');
const mainJs = appFiles.filter((f) => path.basename(f) === 'main.js');
const jsFiles = [
  ...coreFirst,
  ...listJs('content'),
  ...listJs('missions'),
  ...listJs('battle'),
  ...appFiles.filter((f) => path.basename(f) !== 'main.js'),
  ...mainJs,
].filter((f) => fs.existsSync(f));
const js = jsFiles.map((f) => `/* ---- ${path.relative(SRC, f)} ---- */\n` + read(f).replace(/<\/script/gi, '<\\/script')).join('\n');

const shell = read(path.join(SRC, 'shell.html'));
const filled = shell
  .replace('/*FONTS*/', () => fontCss)
  .replace('/*STYLES*/', () => css)
  .replace('/*SCRIPTS*/', () => js);

const strip = (s, a, b) => s.replace(new RegExp(`<!--${a}-->[\\s\\S]*?<!--${b}-->\\n?`, 'g'), '');
const markers = (s) => s.replace(/<!--(HEAD|BODY|TAIL)_(START|END)-->\n?/g, '');

const full = markers(filled);
const preview = markers(strip(strip(strip(filled, 'HEAD_START', 'HEAD_END'), 'BODY_START', 'BODY_END'), 'TAIL_START', 'TAIL_END'))
  // In der Vorschau: 100% Höhe über den Rahmen
  .replace('<style>', '<style>\nhtml,body{height:100%;margin:0;background:#231433;}\n');

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'index.html'), full);
fs.writeFileSync(path.join(DIST, 'skills-vorschau.html'), preview);

/* Offline: Service Worker + Manifest */
const version = require('crypto').createHash('sha1').update(full).digest('hex').slice(0, 10);
fs.writeFileSync(path.join(DIST, 'sw.js'), `/* SKILL DECK Offline-Cache ${version} */
const CACHE = 'skills-${version}';
const FILES = ['./', './index.html', './manifest.webmanifest'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))));
});
`);
fs.writeFileSync(path.join(DIST, 'manifest.webmanifest'), JSON.stringify({
  name: 'SKILL DECK', short_name: 'SKILLS', start_url: './', display: 'standalone', orientation: 'any',
  background_color: '#231433', theme_color: '#231433', lang: 'de',
  icons: [{ src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#ff6b3d"/><text x="50" y="66" font-size="44" text-anchor="middle" font-family="Arial Black,Arial" fill="#1a0b05">SKILL</text></svg>'), sizes: 'any', type: 'image/svg+xml' }],
}, null, 2));

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`SKILL DECK gebaut: dist/index.html (${kb(full)}), dist/skills-vorschau.html (${kb(preview)}), ${jsFiles.length} JS-Dateien, ${cssFiles.length} CSS-Dateien.`);
