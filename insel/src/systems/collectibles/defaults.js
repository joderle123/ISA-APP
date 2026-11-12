// Standard-Sammelsachen (WP42, DESIGN §9): 100 Lichtsplitter (64 frei, 36 versteckt an den 12 Aussichtspunkten),
// 30 Erinnerungsmuscheln, 12 Aussichtspunkte (8 s stillstehen), 10 Nebelkerne, 24 Knobel-Tafeln.
// Reine Logik: Positionen kommen deterministisch aus festen Seeds (stabile IDs, unabhängig vom Spielstand).
// Inhalte unter content/collectibles/<region>.js ergänzen oder ersetzen Einträge mit gleicher ID.
import { mulberry32 } from '../../world/noise.js';

export const COUNTS = { lichtsplitter: 100, muschel: 30, aussicht: 12, nebelkern: 10, knobel: 24 };
const FREE_SPLITTER = { hafen: 9, strand: 9, dschungel: 9, klippen: 8, moor: 6, markt: 8, vulkan: 9, leuchtturm: 6 };   // 64
const SHELLS = { hafen: 4, strand: 6, dschungel: 3, klippen: 4, moor: 3, markt: 3, vulkan: 3, leuchtturm: 4 };            // 30

// 12 Aussichtspunkte: hoch gelegene Orte mit Blick über die Insel (y = Höhe über Grund, falls Luftort)
export const AUSSICHTSPUNKTE = [
  { id: 'ap-hafen-dach', zone: 'hafen', x: 34, z: 122, name: 'Hafendach' },
  { id: 'ap-steg', zone: 'hafen', x: 6, z: 150, name: 'Stegende' },
  { id: 'ap-mangrove', zone: 'strand', x: 150, z: -8, y: 40, name: 'Mangrovenkrone', needs: { ability: 'klettern' } },
  { id: 'ap-spiegelbecken', zone: 'strand', x: 142, z: 44, name: 'Spiegelbecken' },
  { id: 'ap-wasserfall', zone: 'dschungel', x: 91, z: -98, name: 'Wasserfallkante' },
  { id: 'ap-kronendorf', zone: 'dschungel', x: 70, z: -70, y: 16, name: 'Kronendorf', needs: { ability: 'klettern' } },
  { id: 'ap-gipfel', zone: 'klippen', x: -106, z: -106, name: 'Klippengipfel' },
  { id: 'ap-menhire', zone: 'moor', x: -114, z: 68, name: 'Menhir-Kreis' },
  { id: 'ap-buehne', zone: 'markt', x: -118, z: 2, name: 'Marktbühne' },
  { id: 'ap-krater', zone: 'vulkan', x: -12, z: -29, name: 'Kraterrand' },
  { id: 'ap-quellen', zone: 'vulkan', x: 47, z: -23, name: 'Quellental' },
  { id: 'ap-leuchtturm', zone: 'leuchtturm', x: -122, z: 124, name: 'Leuchtturmfuß' },
];
// 10 Nebelkerne: schwere Knoten aus Grau, einer je Region (erst sichtbar, wenn das Modul erreicht ist)
export const NEBELKERNE = [
  { id: 'nk-hafen', region: 'hafen', x: -24, z: 128 }, { id: 'nk-strand', region: 'strand', x: 156, z: -14 },
  { id: 'nk-dschungel', region: 'dschungel', x: 84, z: -92 }, { id: 'nk-klippen', region: 'klippen', x: -120, z: -110 },
  { id: 'nk-moor', region: 'moor', x: -112, z: 82 }, { id: 'nk-markt', region: 'markt', x: -132, z: 20 },
  { id: 'nk-vulkan', region: 'vulkan', x: -6, z: -22 }, { id: 'nk-glimmer', region: 'glimmer', x: 20, z: -118, y: 90 },
  { id: 'nk-quellen', region: 'quellen', x: 52, z: -28 }, { id: 'nk-leuchtturm', region: 'leuchtturm', x: -116, z: 128 },
];
// 24 Knobel-Tafeln: bildbasiert, freiwillig (WP36+ füllt die Rätsel); je Modul-Region 2–3 Tafeln
export const KNOBEL_SITES = {
  hafen: [[10, 104], [-14, 114], [24, 112]], strand: [[124, 34], [136, 52], [146, 40]], dschungel: [[64, -64], [76, -78], [88, -102]],
  klippen: [[-94, -76], [-100, -92], [-110, -102]], moor: [[-106, 62], [-118, 78], [-128, 70]], markt: [[-114, 18], [-126, 10], [-104, 26]],
  vulkan: [[10, 30], [-16, -24], [42, -20]], leuchtturm: [[-118, 116], [-126, 128], [-112, 130]],
};

// Erzeugen. ctx = { zones:[{id,x,z,r,spawn:{x,z}}], heightAt(x,z), walkable(x,z), waterLevel?(x,z) }
export function generateDefaults(ctx) {
  const items = [];
  const ok = (x, z) => ctx.walkable(x, z) && ctx.heightAt(x, z) > 0.25 && (!ctx.waterLevel || ctx.heightAt(x, z) > ctx.waterLevel(x, z) + 0.15);
  const sample = (rng, Z, minD) => {
    for (let k = 0; k < 60; k++) {
      const a = rng() * Math.PI * 2, r = (0.3 + 0.65 * Math.sqrt(rng())) * Z.r;
      const x = Math.round((Z.x + Math.cos(a) * r) * 10) / 10, z = Math.round((Z.z + Math.sin(a) * r) * 10) / 10;
      if (!ok(x, z)) continue;
      if (Z.spawn && Math.hypot(x - Z.spawn.x, z - Z.spawn.z) < minD) continue;
      return { x, z };
    }
    return { x: Z.x, z: Z.z };
  };
  const pad = (n) => String(n).padStart(2, '0');
  let shellNo = 1;
  for (const Z of ctx.zones) {
    const rng = mulberry32(4242 + Z.id.length * 131 + Z.x * 3 + Z.z);
    const nS = FREE_SPLITTER[Z.id] || 0;
    for (let i = 0; i < nS; i++) { const p = sample(rng, Z, 6); items.push({ id: `ls-${Z.id}-${pad(i + 1)}`, type: 'lichtsplitter', zone: Z.id, pos: { x: p.x, z: p.z } }); }
    const nM = SHELLS[Z.id] || 0;
    for (let i = 0; i < nM; i++) { const p = sample(rng, Z, 8); items.push({ id: `mu-${Z.id}-${pad(i + 1)}`, type: 'muschel', zone: Z.id, pos: { x: p.x, z: p.z }, memoryImage: shellNo++ }); }
    for (const [x, z] of KNOBEL_SITES[Z.id] || []) items.push({ id: `kn-${Z.id}-${pad(items.filter((it) => it.type === 'knobel' && it.zone === Z.id).length + 1)}`, type: 'knobel', zone: Z.id, pos: { x, z }, needs: { unit: firstUnitOf(Z.id) } });
  }
  for (const ap of AUSSICHTSPUNKTE) {
    items.push({ id: ap.id, type: 'aussicht', zone: ap.zone, pos: { x: ap.x, z: ap.z, y: ap.y }, name: ap.name, needs: ap.needs || null });
    // drei versteckte Splitter je Aussichtspunkt (erscheinen erst danach)
    const rng = mulberry32(777 + ap.x * 7 + ap.z * 13);
    for (let k = 0; k < 3; k++) {
      const a = rng() * Math.PI * 2, r = 6 + rng() * 12;
      let x = Math.round((ap.x + Math.cos(a) * r) * 10) / 10, z = Math.round((ap.z + Math.sin(a) * r) * 10) / 10;
      if (!ok(x, z)) { x = ap.x + (k - 1) * 2.5; z = ap.z + 2.5; }
      items.push({ id: `ls-${ap.id}-${k + 1}`, type: 'lichtsplitter', zone: ap.zone, pos: { x, z, y: ap.y }, needs: { collectible: ap.id }, hidden: true });
    }
  }
  for (const nk of NEBELKERNE) items.push({ id: nk.id, type: 'nebelkern', zone: nk.region, pos: { x: nk.x, z: nk.z, y: nk.y }, needs: { unit: firstUnitOf(nk.region) } });
  return items;
}
// Erste Einheit eines Regions-Moduls (Sichtbarkeit von Nebelkernen und Tafeln)
export function firstUnitOf(region) {
  return { hafen: 'j1-e01', strand: 'j1-e04', dschungel: 'j1-e07', klippen: 'j1-e11', moor: 'j1-e16', markt: 'j1-e20', vulkan: 'j1-e24', glimmer: 'j1-e27', quellen: 'j1-e29', leuchtturm: 'j1-e30' }[region] || 'j1-e01';
}
// Inhalte (content/collectibles/*) mit den Standards zusammenführen: gleiche ID ersetzt
export function mergeCollectibles(defaults, contentSets = []) {
  const map = new Map(defaults.map((it) => [it.id, it]));
  for (const set of contentSets) for (const it of (set && set.items) || []) if (it && it.id) map.set(it.id, { ...(map.get(it.id) || {}), ...it });
  return [...map.values()];
}
export function countByType(items) {
  const out = {};
  for (const it of items) out[it.type] = (out[it.type] || 0) + 1;
  return out;
}
