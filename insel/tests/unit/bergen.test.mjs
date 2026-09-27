// Unit-Tests Bergen + Kielpost-Physik (Kostprobe „Die Kielpost fährt“, BAUPLAN §2.1 A1–A3, Node ohne Browser):
// feste Fundorte (gleich in verschiedenen Spielständen/Seeds), 6/1/3 nach Art, alle im Schären-Sektor auf offenem Wasser,
// Haken-Reichweite, Fehlversuch schiebt nur weiter, Klippen-Fund vom Boot erreichbar, Wrack erst ohne Nebel,
// Fahrgefühl (Beschleunigen/Ausrollen, Segel schneller, Ausleger ruhiger, sanftes Abprallen ohne Durchfahren),
// Nebel ohne Licht dreht ab, Sektor-Grenze 220 nur vor dem Hafen.
// Aufruf: node --test tests/unit/bergen.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import FUNDE from '../../src/content/bergen/hafen.js';
import { fundorte, fundPos, nearestFund, missDrift, gapTo, HOOK, sumMaterials, isOpen } from '../../src/systems/bergen/model.js';
import { defaultState } from '../../src/core/save.js';
import { createIsland, worldLimitAt, WORLD_LIMIT, SECTOR, WORLD_HALF } from '../../src/world/island.js';
import { SCHAEREN, LEDGE, schaerenHit, nebelPush } from '../../src/world/schaeren.js';
import { createBootState, stepBoot, BOOT } from '../../src/actors/boot.js';

const island = createIsland({ cell: 2.5 });

test('Fundorte: 10 feste Orte (6 treibend, 1 Klippe, 3 Wrack), in zwei Spielständen mit anderem Seed identisch', () => {
  const a = defaultState(11), b = defaultState(987654);
  assert.notEqual(a.seed, b.seed);
  const la = fundorte(FUNDE), lb = fundorte(FUNDE);
  assert.deepEqual(la, lb);
  assert.equal(la.length, 10);
  const n = (k) => la.filter((f) => f.kind === k).length;
  assert.deepEqual([n('treibend'), n('klippe'), n('wrack')], [6, 1, 3]);
  for (const t of [0, 13.7, 600]) assert.deepEqual(la.map((f) => fundPos(f, t)), lb.map((f) => fundPos(f, t)));
  assert.equal(new Set(la.map((f) => f.id)).size, 10);
});

test('Fundorte liegen im Schären-Sektor auf offenem Wasser, nicht in Felsen; Wrack-Kisten hinter der Nebelwand', () => {
  for (const f of fundorte(FUNDE)) {
    for (const t of [0, 20, 40]) {
      const p = fundPos(f, t);
      const r = Math.hypot(p.x, p.z);
      assert.ok(r < worldLimitAt(p.x, p.z) - 4, `${f.id} innerhalb der Grenze`);
      if (f.kind !== 'klippe') assert.ok(island.getHeight(p.x, p.z) < -1.5, `${f.id} auf tiefem Wasser`);
    }
    const N = SCHAEREN.nebel;
    const dN = Math.hypot(f.x - N.x, f.z - N.z);
    if (f.kind === 'wrack') assert.ok(dN < N.inner, `${f.id} im Nebelring`);
    else assert.ok(dN > N.outer + 4, `${f.id} außerhalb des Nebels`);
  }
  assert.ok(!isOpen(fundorte(FUNDE).find((f) => f.kind === 'wrack'), { fogOpen: false }));
});

test('Haken: 2 m ab Bordwand; Klippen-Fund ist vom Boot aus erreichbar; Fehlversuch schiebt die Kiste nur weiter', () => {
  const L = fundorte(FUNDE);
  const k1 = L.find((f) => f.kind === 'klippe');
  assert.equal(k1.x, LEDGE.x); assert.equal(k1.z, LEDGE.z);
  // Boot so nah wie möglich an der Klippe (Kollision), Richtung Vorsprung
  const M = SCHAEREN.moewenklippe;
  const dx = k1.x - M.x, dz = k1.z - M.z, l = Math.hypot(dx, dz);
  const boat = { x: M.x + dx / l * (M.r + 1.3), z: M.z + dz / l * (M.r + 1.3) };
  assert.equal(schaerenHit(boat.x, boat.z, 1.2), null, 'Boot passt neben die Klippe');
  assert.ok(gapTo(boat, fundPos(k1, 0)) <= HOOK.reach, 'Vorsprung in Haken-Reichweite');
  // Fehlversuch
  const d1 = L.find((f) => f.id === 'd1');
  const b2 = { x: d1.x, z: d1.z - 3 };
  const before = gapTo(b2, fundPos(d1, 0));
  const dr = missDrift(d1, null, b2, 0);
  assert.ok(gapTo(b2, fundPos(d1, 0, dr)) > before, 'Kiste treibt weg');
  let d = dr; for (let i = 0; i < 20; i++) d = missDrift(d1, d, b2, 0);
  assert.ok(Math.hypot(d.x, d.z) <= HOOK.maxDrift + 1e-9, 'nie weiter als maxDrift');
  assert.deepEqual(missDrift(k1, null, boat, 0), { x: 0, z: 0 }, 'Klippe bleibt liegen');
  const n = nearestFund(L, ['d1'], b2, 0, null, { fogOpen: false });
  assert.notEqual(n.fund.id, 'd1'); assert.notEqual(n.fund.kind, 'wrack');
  assert.equal(sumMaterials(L).holz + sumMaterials(L).tau + sumMaterials(L).tuch + sumMaterials(L).metall, 18);
});

test('Sektor-Grenze: 220 vor dem Hafen (±32°), sonst 205; Rasterrand bleibt ≥ 20 entfernt', () => {
  assert.equal(worldLimitAt(6, 138), 220);
  assert.equal(worldLimitAt(0, -100), WORLD_LIMIT);
  assert.equal(worldLimitAt(-100, 0), WORLD_LIMIT);
  assert.ok(SECTOR.limit <= WORLD_HALF - 20);
  // Rand-Test: im ganzen Sektor bei r 180–220 nur tiefes Wasser
  for (let a = -SECTOR.half; a <= SECTOR.half; a += 0.05) for (let r = 180; r <= 220; r += 5) {
    const x = Math.sin(a + SECTOR.yaw) * r, z = Math.cos(a + SECTOR.yaw) * r;
    assert.ok(island.getHeight(x, z) < -3, `tief bei ${x.toFixed(0)}/${z.toFixed(0)}`);
  }
});

// kleine Welt für die Physik: Wand bei z > 20
const wall = (x, z) => (z > 20 ? { nx: 0, nz: -1 } : null);
const run = (st, secs, inp, env = {}) => { const ev = []; for (let t = 0; t < secs; t += 1 / 60) { const r = stepBoot(st, 1 / 60, inp, env); if (r.bump) ev.push(r.bump); } return ev; };

test('Fahrgefühl: beschleunigt weich, rollt aus; Segel-Teil ≈ +25 %; Ausleger schaukelt weniger', () => {
  const st = createBootState(0, 0, 0);
  const fwd = { x: 0, y: 1, camYaw: Math.PI };   // Kamera hinter dem Boot (Blick nach +z)
  run(st, 0.5, fwd);
  const v05 = st.speed;
  run(st, 6, fwd);
  assert.ok(v05 > 0.3 && v05 < st.speed * 0.6, `weich beschleunigen (${v05.toFixed(2)} → ${st.speed.toFixed(2)})`);
  assert.ok(Math.abs(st.speed - BOOT.speed) < 0.6);
  const top = st.speed;
  run(st, 1.5, {});
  assert.ok(st.speed > top * 0.4 && st.speed < top * 0.8, 'rollt aus statt stehen zu bleiben');
  const s2 = createBootState(); run(s2, 8, fwd, { teile: { segel: true } });
  assert.ok(Math.abs(s2.speed / top - BOOT.segel) < 0.08, 'Segel ≈ +25 %');
  const rock = (teile) => { const s = createBootState(); let m = 0; for (let t = 0; t < 8; t += 1 / 60) { stepBoot(s, 1 / 60, {}, { teile }); m = Math.max(m, Math.abs(s.roll)); } return m; };
  assert.ok(rock({ ausleger: true }) < rock({}) * 0.6, 'Ausleger: weniger Schaukeln');
  // Schräglage in der Kurve
  const s3 = createBootState(); run(s3, 4, fwd); run(s3, 0.6, { x: 1, y: 0, camYaw: Math.PI });
  assert.ok(Math.abs(s3.roll) > 0.06, 'Schräglage in der Kurve');
});

test('Böe: Segel dicht in der Böe gibt kurzen Schub; Abprallen: sanft, nie durch die Wand', () => {
  const st = createBootState(0, -400, 0);
  const fwd = { x: 0, y: 1, camYaw: Math.PI };
  run(st, BOOT.gustEvery - BOOT.gustLen - 0.2, fwd);
  const before = st.speed;
  run(st, 0.8, { ...fwd, sail: true });
  assert.ok(st.boostT > 0 && st.speed > before * 1.15, 'Schub in der Böe');
  const w = createBootState(0, 0, 0);
  const bumps = run(w, 12, fwd, { hit: wall });
  assert.ok(w.z <= 20, 'nie durch die Wand');
  assert.ok(bumps.length >= 1 && bumps.length <= 12, 'Abprall-Ereignis (mit Pause)');
  assert.ok(w.speed < BOOT.speed, 'kein Tempo-Gewinn an der Wand');
});

test('Nebelwand ohne Laterne dreht die Kielpost sanft ab (kommt nie bis zum Wrack)', () => {
  const N = SCHAEREN.nebel;
  assert.equal(nebelPush(N.x, N.z - 40), null);
  const st = createBootState(N.x, N.z - 40, 0);
  const push = (x, z) => nebelPush(x, z);
  let minD = Infinity, pushed = false;
  for (let t = 0; t < 20; t += 1 / 60) {
    const want = Math.atan2(N.x - st.x, N.z - st.z);   // Spieler hält stur auf das Wrack zu
    const r = stepBoot(st, 1 / 60, { x: 0, y: 1, camYaw: want + Math.PI }, { push, hit: (x, z) => schaerenHit(x, z, 1.2) });
    pushed = pushed || r.pushed;
    minD = Math.min(minD, Math.hypot(st.x - N.x, st.z - N.z));
  }
  assert.ok(pushed, 'Nebel schiebt');
  assert.ok(minD > N.inner, `bleibt draußen (min ${minD.toFixed(1)} m)`);
});
