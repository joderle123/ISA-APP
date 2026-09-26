// Inhalte aus einem Ordner laden (Node): wie src/_gen/content.js, aber per dynamischem Import.
//   loadContent(dir) → [{ file, kind, name, def, abs }]   dir = src/content (Standard) oder ein Fixture-Ordner
//   knownSites() → Ortsnamen der Insel (world/island.js SITES + Zonen-IDs)
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const toPosix = (p) => p.split(sep).join('/');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== 'schema') walk(p, out); }
    else if (p.endsWith('.js')) out.push(p);
  }
  return out;
}

export async function loadContent(dir = join(ROOT, 'src/content')) {
  const out = [];
  for (const abs of walk(dir)) {
    const rel = toPosix(relative(dir, abs));
    const parts = rel.replace(/\.js$/, '').split('/');
    const kind = parts[0];
    const name = parts.length > 1 ? parts.slice(1).join('/') : parts[0];
    let def;
    try {
      const mod = await import('file://' + abs + '?t=' + Date.now());
      def = mod.default;
    } catch (e) {
      out.push({ file: 'content/' + rel, kind, name, def: null, abs, loadError: e });
      continue;
    }
    if (def === undefined) { out.push({ file: 'content/' + rel, kind, name, def: null, abs, loadError: new Error("kein 'export default'") }); continue; }
    out.push({ file: 'content/' + rel, kind, name, def, abs });
  }
  return out;
}

export async function knownSites() {
  try {
    const island = await import('../src/world/island.js');
    return [...Object.keys(island.SITES), ...island.ZONES.map((z) => z.id)];
  } catch (e) {
    return [];
  }
}
