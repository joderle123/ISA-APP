// Build: bündelt src/main.js mit esbuild und fügt JS + CSS in src/shell.html ein.
// Ausgabe: dist/index.html (volles Dokument) und dist/lumo-vorschau.html (ohne html/head/body-Hülle).
// Vorher: tools/gen.mjs erzeugt src/_gen/plugins.js (alle src/**/plugin.js) und src/_gen/content.js (alle src/content/**).
// Nachher: alle tools/postbuild/*.mjs laufen mit { root, distDir, files, content, plugins, log }.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate, runPostbuild } from './tools/gen.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const watchMode = process.argv.includes('--dev');
const log = (...a) => console.log('·', ...a);

// ---- Autoload: Plugins und Inhalte einsammeln ----
const gen = generate({ srcDir: join(root, 'src'), log });
for (const w of gen.warnings) console.warn('⚠', w);
if (gen.problems.length) {
  for (const p of gen.problems) console.error('✘', p);
  process.exit(1);
}

const result = await build({
  entryPoints: [join(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  minify: !watchMode,
  target: ['es2019', 'safari14.1'],
  write: false,
  legalComments: 'none',
  treeShaking: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.gltf': 'text', '.glb': 'binary' },   // Figuren (src/respawn/modelle) als Text einbetten – alles bleibt eine Datei
  logLevel: 'warning',
});

let js = result.outputFiles[0].text;
// Sicher einbetten: kein vorzeitiges </script>
js = js.replace(/<\/script/gi, '<\\/script');
// Schriften (src/ui/fonts/*.woff2, OFL) werden als data-URL in das CSS eingebettet: url(fonts/<datei>) → data:font/woff2;base64,…
const css = readFileSync(join(root, 'src/styles.css'), 'utf8').replace(/url\((["']?)fonts\/([\w.-]+\.woff2)\1\)/g, (m, q, file) => {
  const path = join(root, 'src/ui/fonts', file);
  if (!existsSync(path)) { console.warn('⚠ Schrift fehlt:', path); return m; }
  return `url(data:font/woff2;base64,${readFileSync(path).toString('base64')})`;
});
const shell = readFileSync(join(root, 'src/shell.html'), 'utf8');

const full = shell
  .replace('/*__STYLE__*/', () => css)
  .replace('/*__SCRIPT__*/', () => js);

// Vorschau-Variante: ohne DOCTYPE/html/head/body, <title> und <style> ganz oben.
const titleMatch = full.match(/<title>[\s\S]*?<\/title>/i);
const styleMatch = full.match(/<style>[\s\S]*?<\/style>/i);
const metaViewport = full.match(/<meta name="viewport"[^>]*>/i);
const bodyMatch = full.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const preview = [
  titleMatch ? titleMatch[0] : '<title>LUMO</title>',
  '<meta charset="utf-8">',
  metaViewport ? metaViewport[0] : '',
  styleMatch ? styleMatch[0] : '',
  bodyMatch ? bodyMatch[1].trim() : '',
].join('\n');

const distDir = join(root, 'dist');
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'index.html'), full);
writeFileSync(join(distDir, 'lumo-vorschau.html'), preview);
// RESPAWN (src/respawn): dieselbe Datei mit gesetztem Spielmodus und eigener Titelkarte
const respawn = full
  .replace('<script>', '<script>window.__LUMO_MODE="respawn";</script>\n<script>')
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>RESPAWN</title>')
  .replace('<div class="boot-kicker">Ein Abenteuer auf der Insel</div>', '<div class="boot-kicker">Ein Jahr auf der Insel</div>')
  .replace(/<h1 class="boot-title"[\s\S]*?<\/h1>/, '<h1 class="boot-title boot-title-rs" aria-label="RESPAWN"><span>R</span><span>E</span><span>S</span><span>P</span><span>A</span><span>W</span><span>N</span></h1>')
  .replace('<div class="boot-sub">Die Insel</div>', '<div class="boot-sub">Dann nochmal. Anders.</div>');
writeFileSync(join(distDir, 'respawn.html'), respawn);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`dist/index.html ${kb(full)} · dist/lumo-vorschau.html ${kb(preview)} · JS ${kb(js)} · CSS ${kb(css)}`);
if (Buffer.byteLength(full) > 9 * 1024 * 1024) console.warn('⚠ dist/index.html ist größer als 9 MB (mit eingebetteten Figuren, src/respawn/modelle)');

// ---- Postbuild-Hooks ----
await runPostbuild({
  root, distDir, log,
  files: { 'index.html': full, 'lumo-vorschau.html': preview },
  content: gen.content.map(({ file, kind, name, abs }) => ({ file, kind, name, abs })),
  plugins: gen.plugins.map(({ file, id, order, deps }) => ({ file, id, order, deps })),
});
