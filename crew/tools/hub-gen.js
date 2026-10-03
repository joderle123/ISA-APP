/* Erzeugt integration/crew-hub.js (Hub-Anbindung für Galileo/Unified) aus
     integration/src/crew-hub.src.js  (Logik, von Hand gepflegt)
     docs/spielekatalog.json          (Katalog, über tools/katalog-gen.js)
     src/games/** /<id>.js             (welche Spiele gebaut sind)
     src/core/qr.js                   (QR-Kern, qrcode-generator MIT)
   Wird von build.js aufgerufen; kann auch direkt laufen:  node crew/tools/hub-gen.js */
'use strict';
const fs = require('fs');
const path = require('path');

function builtGames(root) {
  const dir = path.join(root, 'src', 'games');
  const out = new Set();
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).forEach((n) => {
      const p = path.join(d, n);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (n.endsWith('.js')) {
        const src = fs.readFileSync(p, 'utf8');
        const m = src.match(/registerGame\(\s*\{[^}]*?id:\s*'([a-z0-9-]+)'/);
        out.add(m ? m[1] : n.replace(/\.js$/, ''));
      }
    });
  };
  walk(dir);
  return out;
}

function generate(root) {
  const srcFile = path.join(root, 'integration', 'src', 'crew-hub.src.js');
  const out = path.join(root, 'integration', 'crew-hub.js');
  if (!fs.existsSync(srcFile)) return false;
  const kat = require('./katalog-gen.js').build(JSON.parse(fs.readFileSync(path.join(root, 'docs', 'spielekatalog.json'), 'utf8')));
  const built = builtGames(root);
  Object.keys(kat.spiele).forEach((id) => { kat.spiele[id].gebaut = built.has(id); });
  kat.gebaut = Object.keys(kat.spiele).filter((id) => built.has(id)).length;
  // Für den Hub reicht der Katalog ohne Bestands-Notizen
  const katalog = { stand: kat.stand, gebaut: kat.gebaut, themen: kat.themen, formate: kat.formate, spiele: kat.spiele, einheiten: kat.einheiten };

  const qrSrc = fs.readFileSync(path.join(root, 'src', 'core', 'qr.js'), 'utf8');
  const a = qrSrc.indexOf('var qrcode = function() {');
  const b = qrSrc.indexOf('/* ---------- CREW-Hülle ---------- */');
  const svgA = qrSrc.indexOf('function svg(text, o) {');
  const svgB = qrSrc.indexOf('CREW.qr = ');
  if (a < 0 || b < 0 || svgA < 0 || svgB < 0) throw new Error('hub-gen: QR-Kern in src/core/qr.js nicht gefunden');
  const qr = qrSrc.slice(a, b) + '\n' + qrSrc.slice(svgA, svgB).replace('function svg(text, o) {', 'function qrSvgRaw(text, o) {');

  const tpl = fs.readFileSync(srcFile, 'utf8');
  const body = tpl
    .replace('/*__KATALOG__*/null', () => JSON.stringify(katalog))
    .replace('/*__QR__*/', () => qr)
    .replace(/^\/\* CREW-Hub – Anbindung/, '/* GENERIERT durch tools/hub-gen.js aus integration/src/crew-hub.src.js – NICHT von Hand ändern.\n   Stand ' + kat.stand + ', ' + kat.gebaut + ' von ' + Object.keys(kat.spiele).length + ' Spielen gebaut.\n   CREW-Hub – Anbindung');
  const old = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (old !== body) fs.writeFileSync(out, body);
  return true;
}

module.exports = { generate, builtGames };
if (require.main === module) {
  generate(path.resolve(__dirname, '..'));
  console.log('integration/crew-hub.js erzeugt.');
}
