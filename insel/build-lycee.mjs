// Build: Lycée-Simulator (src/lycee) → dist/lycee.html (eine Datei, Modelle und Schrift eingebettet).
// Aufruf: node build-lycee.mjs
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const result = await build({
  entryPoints: [join(root, 'src/lycee/main.js')],
  bundle: true, format: 'iife', minify: true, target: ['es2019', 'safari14.1'], write: false, legalComments: 'none',
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.glb': 'binary' },
  logLevel: 'warning',
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = readFileSync(join(root, 'src/lycee/stil.css'), 'utf8').replace(/url\((["']?)fonts\/([\w.-]+\.woff2)\1\)/g, (m, q, file) => {
  const p = join(root, 'src/ui/fonts', file);
  return existsSync(p) ? `url(data:font/woff2;base64,${readFileSync(p).toString('base64')})` : m;
});
const html = readFileSync(join(root, 'src/lycee/shell.html'), 'utf8').replace('/*__STYLE__*/', () => css).replace('/*__SCRIPT__*/', () => js);
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/lycee.html'), html);
console.log('dist/lycee.html', (Buffer.byteLength(html) / 1048576).toFixed(1) + ' MB');
