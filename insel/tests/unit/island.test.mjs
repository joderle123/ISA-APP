// Unit-Tests Insel und Gewässer (WP11, Node ohne Browser): Zone Moor (Senke 1,2–2,6 m, Bohlen-Trasse begehbar),
// Gewässer-API (Pegel 0,2–1,8 m, Ebbe/Flut), Gezeitenbecken-Schale, Mangroven-Lagune (watbar), Quellen-Terrassen,
// Torfbecken, alle Orte aus DESIGN §11, Oberflächen und Wasserspiegel.
// Aufruf: node --test tests/unit/island.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createIsland, ZONES, ZONE_INDEX, SITES, WATER_BODIES, PATHS, FEATURES, SEA_LEVEL } from '../../src/world/island.js';

const island = createIsland({ cell: 2.5 });

test('Zonen: 8 Zonen mit Moor als letzter (Index 7), Spawn im Moor begehbar und in der Zone', () => {
  assert.equal(ZONES.length, 8);
  assert.equal(ZONES[7].id, 'moor'); assert.equal(ZONE_INDEX.moor, 7);
  const m = island.zoneById('moor');
  assert.equal(island.zoneAt(m.spawn.x, m.spawn.z), 'moor');
  assert.ok(island.isWalkable(m.spawn.x, m.spawn.z), 'Moor-Spawn begehbar');
  for (const z of ZONES) assert.ok(island.isWalkable(z.spawn.x, z.spawn.z), `Spawn ${z.id} begehbar`);
});

test('Moor: Senke mit Mittelhöhe 1,2–2,6 m, Bohlen-Trasse (Weg markt-moor) begehbar und geneigt', () => {
  const M = FEATURES.moor;
  let sum = 0, n = 0, lo = Infinity, hi = -Infinity;
  for (let a = 0; a < 24; a++) for (let r = 0; r <= 12; r += 3) {
    const x = M.x + Math.cos(a / 24 * Math.PI * 2) * r, z = M.z + Math.sin(a / 24 * Math.PI * 2) * r;
    const h = island.getHeight(x, z);
    sum += h; n++; lo = Math.min(lo, h); hi = Math.max(hi, h);
  }
  const mean = sum / n;
  assert.ok(mean >= 1.2 && mean <= 2.6, `Mittelhöhe ${mean.toFixed(2)}`);
  assert.ok(lo > 0.5 && hi < 3.2, `Spanne ${lo.toFixed(2)}–${hi.toFixed(2)}`);
  const path = PATHS.find((p) => p.id === 'markt-moor');
  assert.ok(path, 'Weg markt-moor vorhanden');
  for (const [x, z] of path.pts) assert.ok(island.isWalkable(x, z), `Trasse begehbar bei ${x}/${z}`);
  for (const [x, z] of path.pts) assert.ok(island.pathWeight(x, z) > 0.4, `Wegfläche bei ${x}/${z}`);
  // Torfbecken: flach, unter dem Pegel, dunkle Oberfläche
  for (const b of WATER_BODIES.filter((b) => b.kind === 'moor')) {
    const h = island.getHeight(b.x, b.z);
    assert.ok(h < b.level && b.level - h < 1.0, `${b.id}: Tiefe ${(b.level - h).toFixed(2)} (man versinkt nicht)`);
    assert.equal(island.surfaceAt(b.x, b.z), 'water');
    assert.equal(island.waterLevel(b.x, b.z), b.level);
  }
  assert.equal(island.surfaceAt(M.x - 6, M.z + 1), 'moor', 'Torfboden zwischen den Becken');
});

test('Gewässer-API: Pegel setzen (0,2–1,8 m geklemmt), Ebbe/Flut, waterLevel folgt dem Pegel, Meer bleibt 0', () => {
  const W = island.water;
  const b = W.get('gezeiten-ost');
  assert.ok(b && b.kind === 'gezeiten');
  assert.equal(W.setLevel('gezeiten-ost', 1.4), 1.4);
  assert.equal(island.waterLevel(b.x, b.z), 1.4);
  assert.equal(W.setLevel('gezeiten-ost', 5), 1.8, 'nach oben geklemmt');
  assert.equal(W.setLevel('gezeiten-ost', -1), 0.2, 'nach unten geklemmt');
  assert.equal(W.tide('gezeiten-ost', 1), 1.8); assert.equal(W.tideOf('gezeiten-ost'), 1);
  assert.equal(W.tide('gezeiten-ost', 0), 0.2); assert.equal(W.tideOf('gezeiten-ost'), 0);
  assert.equal(W.tide('gezeiten-ost', 0.5), 1.0);
  assert.equal(W.setLevel('lagune', 3), null, 'Lagune ist Meer');
  assert.equal(W.setLevel('gibtsnicht', 1), null);
  assert.equal(island.waterLevel(0, 190), SEA_LEVEL);
  assert.equal(island.waterLevel(FEATURES.pool.x, FEATURES.pool.z), FEATURES.pool.level, 'Tränensee unverändert');
  W.setLevel('gezeiten-ost', 0.9);
});

test('Gezeitenbecken: Felsschale über dem Strand, Mulde unter dem Pegel, Rand begehbar', () => {
  for (const b of WATER_BODIES.filter((b) => b.kind === 'gezeiten')) {
    const hc = island.getHeight(b.x, b.z);
    assert.ok(hc < b.floor + 0.35 && hc > b.floor - 0.6, `${b.id}: Boden ${hc.toFixed(2)} nahe floor ${b.floor}`);
    const rim = Math.max(island.getHeight(b.x + b.r * 1.1, b.z), island.getHeight(b.x, b.z + b.r * 1.1));
    assert.ok(rim > 1.3, `${b.id}: Felsrand ${rim.toFixed(2)} m über dem Strand`);
    assert.ok(rim > b.max - 0.6, 'Rand hält den höchsten Pegel');
    assert.ok(island.isWalkable(b.x + b.r * 1.3, b.z), 'Rand begehbar');
    assert.equal(island.surfaceAt(b.x, b.z), 'water');
    assert.equal(island.zoneAt(b.x, b.z), 'strand');
  }
});

test('Mangroven-Lagune: Wurzelinsel in der Mitte, watbarer Ring auf Meereshöhe, Rand steigt zum Strand', () => {
  const L = FEATURES.lagoon;
  const mound = island.getHeight(L.x, L.z);
  assert.ok(mound > 0.4 && mound < 1.0, `Wurzelinsel ${mound.toFixed(2)}`);
  const ring = island.getHeight(L.x, L.z + 9);
  assert.ok(ring < -0.4 && ring > -1.45, `Ring ${ring.toFixed(2)} (watbar, nicht schwimmpflichtig)`);
  assert.equal(island.waterLevel(L.x, L.z + 9), SEA_LEVEL);
  assert.ok(island.getHeight(L.x, L.z + 18) > 0.6, 'Strand hinter dem Ring');
  assert.ok(SITES.mangrove.x === L.x && SITES.mangrove.z === L.z);
});

test('Quellental: drei Terrassen mit warmen Becken, jede tiefer als die vorige, Pegel unter Terrassenkante', () => {
  const q = WATER_BODIES.filter((b) => b.kind === 'quelle');
  assert.equal(q.length, 3);
  const cx = q.reduce((s, b) => s + b.x, 0) / q.length, cz = q.reduce((s, b) => s + b.z, 0) / q.length;
  for (let i = 0; i < q.length; i++) {
    const b = q[i];
    // Terrassenkante auf der Seite, die von den anderen Quellen wegzeigt (die Terrassen überlappen wie Stufen)
    const dx = b.x - cx, dz = b.z - cz, dl = Math.hypot(dx, dz) || 1;
    const ex = b.x + (dx / dl) * (b.r + 2.5), ez = b.z + (dz / dl) * (b.r + 2.5);
    const edge = island.getHeight(ex, ez);
    assert.ok(Math.abs(edge - b.terrace) < 0.9, `${b.id}: Terrasse ${edge.toFixed(2)} ≈ ${b.terrace}`);
    assert.ok(island.getHeight(b.x, b.z) < b.level, `${b.id}: Becken unter dem Pegel`);
    assert.equal(island.waterLevel(b.x, b.z), b.level);
    if (i) assert.ok(b.terrace < q[i - 1].terrace, 'Terrassen fallen ab');
    assert.ok(island.isWalkable(ex, ez), 'Terrassenrand begehbar');
  }
});

test('Orte aus DESIGN §11 vorhanden, Innenraum-Orte markiert, Luftorte mit y', () => {
  for (const id of ['hafengrotte', 'muschelbucht', 'gezeitenhoehle', 'mangrove', 'spiegelbecken', 'traenensee', 'kronendorf', 'federtempel', 'wetterwarte', 'klangschlucht', 'gedankenschlucht', 'sturmhuette', 'moorSenke', 'buehne', 'noorsMauer', 'lucindasGarten', 'friedenstreppe', 'glimmerwolke', 'quellental', 'leuchtturm']) {
    assert.ok(SITES[id], 'Ort ' + id);
    assert.ok(typeof SITES[id].x === 'number' && typeof SITES[id].z === 'number');
  }
  assert.equal(SITES.gezeitenhoehle.interior, 'gezeitenhoehle');
  assert.equal(SITES.glimmerwolke.y, 90);
  assert.equal(SITES.kronendorf.y, 16);
  assert.equal(SITES.moorSenke.zone, 'moor');
});
