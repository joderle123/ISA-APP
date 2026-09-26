// Build: bündelt src/main.js mit esbuild und fügt JS + CSS in src/shell.html ein.
// Ausgabe: dist/index.html (volles Dokument) und dist/lumo-vorschau.html (ohne html/head/body-Hülle).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const watchMode = process.argv.includes('--dev');

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

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/index.html'), full);
writeFileSync(join(root, 'dist/lumo-vorschau.html'), preview);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`dist/index.html ${kb(full)} · dist/lumo-vorschau.html ${kb(preview)} · JS ${kb(js)} · CSS ${kb(css)}`);
