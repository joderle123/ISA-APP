// Build: bündelt src/main.js mit esbuild und fügt JS + CSS in src/shell.html ein.
// Ausgabe: dist/index.html (volles Dokument) und dist/lumo-vorschau.html (ohne html/head/body-Hülle).
// Vorher: tools/gen.mjs erzeugt src/_gen/plugins.js (alle src/**/plugin.js) und src/_gen/content.js (alle src/content/**).
// Nachher: alle tools/postbuild/*.mjs laufen mit { root, distDir, files, content, plugins, log }.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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
  logLevel: 'warning',
});

let js = result.outputFiles[0].text;
// Sicher einbetten: kein vorzeitiges </script>
js = js.replace(/<\/script/gi, '<\\/script');
const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
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

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`dist/index.html ${kb(full)} · dist/lumo-vorschau.html ${kb(preview)} · JS ${kb(js)} · CSS ${kb(css)}`);
if (Buffer.byteLength(full) > 3 * 1024 * 1024) console.warn('⚠ dist/index.html ist größer als 3 MB (DESIGN §20)');

// ---- Postbuild-Hooks ----
await runPostbuild({
  root, distDir, log,
  files: { 'index.html': full, 'lumo-vorschau.html': preview },
  content: gen.content.map(({ file, kind, name, abs }) => ({ file, kind, name, abs })),
  plugins: gen.plugins.map(({ file, id, order, deps }) => ({ file, id, order, deps })),
});
