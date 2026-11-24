// Build: Lycée-Simulator (src/lycee) → dist/lycee.html (eine Datei, Modelle und Schrift eingebettet).
// Aufruf: node build-lycee.mjs
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const result = await build({
  entryPoints: [join(root, 'src/lycee/main.js')],
  bundle: true, format: 'iife', minify: !process.env.UNMIN, target: ['es2019', 'safari14.1'], write: false, legalComments: 'none',
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.glb': 'binary', '.wav': 'binary', '.ogg': 'binary' },
  logLevel: 'warning',
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = readFileSync(join(root, 'src/lycee/stil.css'), 'utf8').replace(/url\((["']?)fonts\/([\w.-]+\.woff2)\1\)/g, (m, q, file) => {
  const p = join(root, 'src/ui/fonts', file);
  return existsSync(p) ? `url(data:font/woff2;base64,${readFileSync(p).toString('base64')})` : m;
});
const html = readFileSync(join(root, 'src/lycee/shell.html'), 'utf8').replace('/*__STYLE__*/', () => css).replace('/*__SCRIPT__*/', () => js);
mkdirSync(join(root, 'dist'), { recursive: true });
const out = process.env.LYCEE_OUT || join(root, 'dist/lycee.html');
writeFileSync(out, html);
// iPad-App (PWA): Manifest, Service Worker und Symbole neben lycee.html. Wirken nur, wenn die Seite über http(s) läuft.
const ziel = dirname(out), pwa = join(root, 'src/lycee/pwa');
mkdirSync(join(ziel, 'lycee-pwa'), { recursive: true });
for (const n of [180, 192, 512]) copyFileSync(join(pwa, `icon-${n}.png`), join(ziel, `lycee-pwa/icon-${n}.png`));
copyFileSync(join(pwa, 'sw.js'), join(ziel, 'lycee-sw.js'));
writeFileSync(join(ziel, 'lycee.webmanifest'), JSON.stringify({
  name: 'Annexe Junglinster', short_name: 'Annexe', lang: 'de', start_url: 'lycee.html', scope: './', display: 'standalone',
  orientation: 'landscape', background_color: '#1b1830', theme_color: '#2d3d5c',
  icons: [{ src: 'lycee-pwa/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'lycee-pwa/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'lycee-pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }],
}, null, 2));
console.log('dist/lycee.html', (Buffer.byteLength(html) / 1048576).toFixed(1) + ' MB');
