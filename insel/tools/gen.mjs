// Generator für den Plugin- und Inhalte-Autoload (wird von build.mjs vor dem Bündeln aufgerufen).
//   src/**/plugin.js            → src/_gen/plugins.js   (sortiert nach export order, deps geprüft)
//   src/content/**/*.js         → src/_gen/content.js   (ohne src/content/schema/**)
// Beide Dateien sind generiert, stehen in .gitignore und werden bei jedem Build neu geschrieben.
// Konvention Plugin:  export default { id: 'name', order: 30, deps: ['state'], install(game) {…} }
//   id/order/deps müssen Literale sein, damit der Build sie statisch lesen kann (siehe src/core/state.js).
// Konvention Inhalt:  export default { id: '…', … }  (eine Datei = ein Eintrag; kind = Ordnername unter content/)
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, sep, basename, dirname } from 'node:path';

const toPosix = (p) => p.split(sep).join('/');

// Alle Dateien unter dir (rekursiv), gefiltert; Rückgabe: absolute Pfade, stabil sortiert
export function walk(dir, filter = () => true, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, filter, out);
    else if (filter(p)) out.push(p);
  }
  return out;
}

// Plugins finden: src/**/plugin.js (nicht in src/_gen)
export function findPlugins(srcDir) {
  return walk(srcDir, (p) => basename(p) === 'plugin.js' && !toPosix(relative(srcDir, p)).startsWith('_gen/'))
    .map((abs) => ({ abs, file: toPosix(relative(srcDir, abs)), ...readPluginMeta(abs) }));
}

// Inhalte finden: src/content/**/*.js ohne schema/
export function findContent(srcDir) {
  const contentDir = join(srcDir, 'content');
  return walk(contentDir, (p) => p.endsWith('.js') && !toPosix(relative(contentDir, p)).startsWith('schema/'))
    .map((abs) => {
      const rel = toPosix(relative(contentDir, abs));           // z. B. regions/strand.js oder glimm.js
      const parts = rel.replace(/\.js$/, '').split('/');
      const kind = parts.length > 1 ? parts[0] : parts[0];      // Ordnername, sonst Dateiname
      const name = parts.length > 1 ? parts.slice(1).join('/') : parts[0];
      const src = readFileSync(abs, 'utf8');
      const hasDefault = /export\s+default\b/.test(src);
      return { abs, file: 'content/' + rel, kind, name, hasDefault };
    });
}

// Statische Metadaten aus einer plugin.js lesen (erste Treffer von id/order/deps)
export function readPluginMeta(abs) {
  const src = readFileSync(abs, 'utf8');
  const head = src.slice(src.search(/export\s+default/) >= 0 ? src.search(/export\s+default/) : 0);
  const id = (head.match(/\bid\s*:\s*['"`]([^'"`]+)['"`]/) || [])[1] || null;
  const orderM = head.match(/\border\s*:\s*(-?\d+(?:\.\d+)?)/);
  const order = orderM ? Number(orderM[1]) : 50;
  const depsM = head.match(/\bdeps\s*:\s*\[([^\]]*)\]/);
  const deps = depsM ? (depsM[1].match(/['"`]([^'"`]+)['"`]/g) || []).map((s) => s.slice(1, -1)) : [];
  return { id, order, deps };
}

// Reihenfolge: nach order, dann Abhängigkeiten (ein Plugin kommt erst nach allen deps); Fehler bei Zyklen/fehlenden deps
export function orderPlugins(plugins) {
  const byId = new Map(plugins.map((p) => [p.id, p]));
  const problems = [];
  for (const p of plugins) {
    if (!p.id) problems.push(`${p.file}: keine statische id gefunden (export default { id: '…' })`);
    for (const d of p.deps) if (d !== 'core' && !byId.has(d)) problems.push(`${p.file}: Abhängigkeit '${d}' gibt es nicht`);
  }
  const ids = plugins.map((p) => p.id).filter(Boolean);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const d of new Set(dupes)) problems.push(`Plugin-id '${d}' ist doppelt`);
  const sorted = [...plugins].sort((a, b) => a.order - b.order || a.file.localeCompare(b.file));
  const out = [];
  const done = new Set(['core']);
  let guard = sorted.length * sorted.length + 1;
  while (sorted.length && guard-- > 0) {
    const i = sorted.findIndex((p) => p.deps.every((d) => done.has(d) || !byId.has(d)));
    if (i < 0) { problems.push('Zyklus in Plugin-Abhängigkeiten: ' + sorted.map((p) => p.id).join(', ')); break; }
    const p = sorted.splice(i, 1)[0];
    out.push(p);
    if (p.id) done.add(p.id);
  }
  return { ordered: out.concat(sorted), problems };
}

function relImport(fromDir, abs) {
  let r = toPosix(relative(fromDir, abs));
  if (!r.startsWith('.')) r = './' + r;
  return r;
}

// Beide _gen-Dateien schreiben. Rückgabe: { plugins, content, problems, warnings }
export function generate({ srcDir, outDir = join(srcDir, '_gen'), log = () => {} } = {}) {
  mkdirSync(outDir, { recursive: true });
  const plugins = findPlugins(srcDir);
  const { ordered, problems } = orderPlugins(plugins);
  const content = findContent(srcDir);
  const warnings = content.filter((c) => !c.hasDefault).map((c) => `${c.file}: kein 'export default' – wird übersprungen`);
  const used = content.filter((c) => c.hasDefault);

  const pl = [
    '// GENERIERT von tools/gen.mjs (build.mjs) – nicht bearbeiten, nicht einchecken.',
    '// Alle src/**/plugin.js, sortiert nach order und Abhängigkeiten.',
    ...ordered.map((p, i) => `import p${i} from '${relImport(outDir, p.abs)}';`),
    'export default [',
    ...ordered.map((p, i) => `  { file: ${JSON.stringify(p.file)}, plugin: p${i} },`),
    '];',
    '',
  ].join('\n');
  const ct = [
    '// GENERIERT von tools/gen.mjs (build.mjs) – nicht bearbeiten, nicht einchecken.',
    '// Alle src/content/**/*.js (ohne schema/), je Datei ein Eintrag: kind = Ordner, name = Dateiname.',
    ...used.map((c, i) => `import c${i} from '${relImport(outDir, c.abs)}';`),
    'export default [',
    ...used.map((c, i) => `  { file: ${JSON.stringify(c.file)}, kind: ${JSON.stringify(c.kind)}, name: ${JSON.stringify(c.name)}, def: c${i} },`),
    '];',
    '',
  ].join('\n');
  writeFileSync(join(outDir, 'plugins.js'), pl);
  writeFileSync(join(outDir, 'content.js'), ct);
  log(`_gen: ${ordered.length} Plugin(s) [${ordered.map((p) => p.id || '?').join(', ')}] · ${used.length} Inhalt(e)`);
  return { plugins: ordered, content: used, problems, warnings };
}

// Postbuild-Hooks: tools/postbuild/*.mjs, jede Datei exportiert default async (ctx) => {}
export async function runPostbuild(ctx) {
  const dir = join(ctx.root, 'tools/postbuild');
  const files = walk(dir, (p) => p.endsWith('.mjs'));
  for (const f of files) {
    const mod = await import('file://' + f);
    if (typeof mod.default === 'function') {
      ctx.log(`postbuild: ${basename(f)}`);
      await mod.default(ctx);
    }
  }
  return files.length;
}

export const srcDirOf = (root) => join(root, 'src');
export { dirname };
