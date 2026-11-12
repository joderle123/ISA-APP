// Unit-Tests Grauschleier (WP10, Node ohne Browser): 12 Slots (8 Zonen + 4 Flecken), Flecken-API, weiche Übergänge,
// Teil-Farbwelle, Rückfall-Welle nach innen, CPU-amountAt gegen einen Nachbau der GLSL-Formel (200 Punkte, < 0,02),
// Zustand rein/raus inkl. Flecken, Grundwert-Override für Innenräume.
// Aufruf: node --test tests/unit/veil.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createVeil, MAX_ZONES, NUM_ZONES, MAX_PATCHES, VEIL_GLSL, WAVE_FRONT, veilFormula } from '../../src/world/veil.js';
import { ZONES } from '../../src/world/island.js';
import { createEvents } from '../../src/engine/events.js';
import { mulberry32 } from '../../src/world/noise.js';

// ---- Nachbau der Shader-Formel (lumoVeilAmount aus VEIL_GLSL), bewusst unabhängig von veilFormula geschrieben ----
const glslSmooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const glslMix = (a, b, t) => a * (1 - t) + b * t;
function glslVeilAmount(u, px, pz) {
  // u = { uVeilZones:[vec4], uVeilBase, uVeilWave:vec4, uVeilWave2:vec4, uVeilStrength }
  const waveValue = (k, v) => {
    if (u.uVeilWave[2] < 0 || Math.abs(k - u.uVeilWave[3]) > 0.5) return v;
    const dw = Math.hypot(px - u.uVeilWave[0], pz - u.uVeilWave[1]);
    const R = u.uVeilWave[2];
    const ins = u.uVeilWave2[2] > 0 ? 1 - glslSmooth(R - WAVE_FRONT, R, dw) : glslSmooth(R, R + WAVE_FRONT, dw);
    return glslMix(u.uVeilWave2[0], u.uVeilWave2[1], ins);
  };
  let cov = 0, acc = 0, wsum = 0;
  for (let k = 0; k < NUM_ZONES; k++) {
    const z = u.uVeilZones[k];
    if (z[2] <= 0) continue;
    const w = 1 - glslSmooth(z[2] * 0.72, z[2] * 1.18, Math.hypot(px - z[0], pz - z[1]));
    acc += w * waveValue(k, z[3]); wsum += w; cov = Math.max(cov, w);
  }
  let amt = glslMix(u.uVeilBase, wsum > 0 ? acc / wsum : 0, cov);
  for (let k = NUM_ZONES; k < MAX_ZONES; k++) {
    const z = u.uVeilZones[k];
    if (z[2] <= 0) continue;
    const w = 1 - glslSmooth(z[2] * 0.55, z[2], Math.hypot(px - z[0], pz - z[1]));
    amt = glslMix(amt, waveValue(k, z[3]), w);
  }
  return amt * u.uVeilStrength;
}
const readUniforms = (veil) => ({
  uVeilZones: veil.uniforms.uVeilZones.value.map((v) => [v.x, v.y, v.z, v.w]),
  uVeilBase: veil.uniforms.uVeilBase.value,
  uVeilWave: [veil.uniforms.uVeilWave.value.x, veil.uniforms.uVeilWave.value.y, veil.uniforms.uVeilWave.value.z, veil.uniforms.uVeilWave.value.w],
  uVeilWave2: [veil.uniforms.uVeilWave2.value.x, veil.uniforms.uVeilWave2.value.y, veil.uniforms.uVeilWave2.value.z, veil.uniforms.uVeilWave2.value.w],
  uVeilStrength: veil.uniforms.uVeilStrength.value,
});
function samplePoints(n, seed = 3) {
  const r = mulberry32(seed);
  const pts = [];
  for (let i = 0; i < n; i++) pts.push([(r() - 0.5) * 420, (r() - 0.5) * 420]);
  return pts;
}

test('12 Slots: 8 Zonen aus island.ZONES (Hafen frei, Rest grau) + 4 freie Flecken-Slots', () => {
  const v = createVeil({});
  assert.equal(MAX_ZONES, 12); assert.equal(NUM_ZONES, 8); assert.equal(MAX_PATCHES, 4);
  assert.equal(v.slots.length, 12);
  assert.equal(v.zones.length, Math.min(8, ZONES.length));
  assert.ok(v.zones.some((z) => z.id === 'moor'), 'Moor ist als 8. Zone dabei');
  assert.equal(v.zoneValue('hafen'), 0); assert.equal(v.zoneValue('strand'), 1);
  assert.equal(v.patches.length, 0);
  assert.ok(VEIL_GLSL.includes(`uVeilZones[${MAX_ZONES}]`) && VEIL_GLSL.includes('uVeilWave2'));
});

test('Flecken: addPatch/setPatch/removePatch, überstimmen ihre Zone, höchstens 4', () => {
  const v = createVeil({});
  v.setZone('strand', 0);
  assert.ok(v.amountAt(150, -8) < 0.2, 'Strand frei → Mangrove-Stelle fast farbig (nur Grundwert)');
  const p = v.addPatch({ id: 'mangrove', x: 150, z: -8, r: 18, veil: 1 });
  assert.ok(p && v.patches.length === 1);
  assert.ok(v.amountAt(150, -8) > 0.98, 'Fleck überstimmt die freie Zone');
  assert.ok(v.amountAt(150, -8 + 17.9) < 0.15, 'am Fleckenrand kaum Wirkung');
  assert.ok(Math.abs(v.amountAt(136, 40)) < 0.02, 'Strandmitte bleibt frei');
  v.setPatch('mangrove', 0.5);
  assert.ok(Math.abs(v.amountAt(150, -8) - 0.5) < 0.01);
  assert.equal(v.setPatch('strand', 0.5), false, 'Zonen sind keine Flecken');
  assert.equal(v.addPatch({ id: 'strand', x: 0, z: 0, r: 5 }), null, 'Zonen-ID als Fleck abgelehnt');
  for (const id of ['glimmer', 'quellen', 'rueckfall']) assert.ok(v.addPatch({ id, x: 0, z: 0, r: 10 }));
  assert.equal(v.addPatch({ id: 'zuviel', x: 0, z: 0, r: 10 }), null, 'fünfter Fleck: kein Slot');
  assert.equal(v.removePatch('glimmer'), true);
  assert.ok(v.addPatch({ id: 'zuviel', x: 0, z: 0, r: 10 }), 'freier Slot wird wiederverwendet');
  assert.equal(v.removePatch('gibtsnicht'), false);
});

test('CPU-amountAt entspricht der GLSL-Formel an 200 Punkten (< 0,02) – ohne Welle, mit Farbwelle, mit Rückfall', () => {
  const v = createVeil({});
  v.addPatch({ id: 'mangrove', x: 150, z: -8, r: 18, veil: 1 });
  v.addPatch({ id: 'quellen', x: 47, z: -23, r: 16, veil: 0.4 });
  v.setZone('strand', 0.3); v.setZone('klippen', 0.8);
  v.update(0.5, 1);
  const pts = samplePoints(200);
  const check = (label) => {
    const u = readUniforms(v);
    let maxErr = 0;
    for (const [x, z] of pts) { const e = Math.abs(v.amountAt(x, z) - glslVeilAmount(u, x, z)); if (e > maxErr) maxErr = e; }
    assert.ok(maxErr < 0.02, `${label}: größte Abweichung ${maxErr}`);
    // veilFormula direkt (gleiche Slots) stimmt ebenfalls
    const w = v.wave ? { index: v.wave.index, x: v.wave.x, z: v.wave.z, radius: v.wave.radius, dir: v.wave.dir, from: v.wave.from, to: v.wave.to } : null;
    assert.ok(Math.abs(veilFormula(v.slots, v.baseValue, w, 10, 20) - v.amountAt(10, 20)) < 1e-9);
  };
  check('ruhig');
  v.restoreZone('dschungel', { amount: 0.2, duration: 4, sound: false });
  for (let i = 0; i < 40; i++) v.update(1 / 30, i / 30);
  assert.ok(v.waveActive && v.wave.dir === 1);
  check('Farbwelle läuft');
  for (let i = 0; i < 200; i++) v.update(1 / 30, 2 + i / 30);
  assert.equal(v.waveActive, false);
  assert.ok(Math.abs(v.zoneValue('dschungel') - 0.2) < 1e-9, 'Teilwelle endet beim Zielwert');
  v.relapse('mangrove', { to: 0.9, duration: 4, sound: false });
  for (let i = 0; i < 40; i++) v.update(1 / 30, 10 + i / 30);
  assert.ok(v.waveActive && v.wave.dir === -1 && v.uniforms.uVeilWave2.value.w === 1);
  check('Rückfall läuft');
  for (let i = 0; i < 200; i++) v.update(1 / 30, 12 + i / 30);
  assert.ok(Math.abs(v.getPatch('mangrove').veil - 0.9) < 1e-9);
  check('nach dem Rückfall');
});

test('Teil-Farbwelle: Ereignisse, Wert läuft von innen nach außen, Rückfall läuft vom Rand nach innen', () => {
  const events = createEvents();
  const seen = [];
  events.on('veil:restore:start', (e) => seen.push(['start', e.id, e.to]));
  events.on('veil:restored', (e) => seen.push(['done', e.id, e.to]));
  events.on('veil:relapse:start', (e) => seen.push(['rstart', e.id, e.to]));
  events.on('veil:relapsed', (e) => seen.push(['rdone', e.id, e.to]));
  const v = createVeil({ events });
  const Z = v.zones.find((z) => z.id === 'markt');
  assert.ok(v.restoreZone('markt', { amount: 0.4, duration: 2, sound: false }));
  for (let i = 0; i < 15; i++) v.update(1 / 30, i / 30);
  const innen = v.amountAt(Z.x, Z.z), aussen = v.amountAt(Z.x + Z.r * 0.6, Z.z);
  assert.ok(innen < aussen, `innen schon heller (${innen.toFixed(2)}) als außen (${aussen.toFixed(2)})`);
  for (let i = 0; i < 90; i++) v.update(1 / 30, 1 + i / 30);
  assert.ok(Math.abs(v.zoneValue('markt') - 0.4) < 1e-9);
  assert.ok(v.relapse('markt', { to: 1, duration: 2, sound: false }));
  for (let i = 0; i < 15; i++) v.update(1 / 30, 5 + i / 30);
  const innen2 = v.amountAt(Z.x, Z.z), aussen2 = v.amountAt(Z.x + Z.r * 0.75, Z.z);
  assert.ok(aussen2 > innen2, `Rückfall: außen schon grau (${aussen2.toFixed(2)}), innen noch heller (${innen2.toFixed(2)})`);
  for (let i = 0; i < 90; i++) v.update(1 / 30, 6 + i / 30);
  assert.equal(v.zoneValue('markt'), 1);
  assert.deepEqual(seen.map((s) => s[0]), ['start', 'done', 'rstart', 'rdone']);
  assert.deepEqual(seen[0].slice(1), ['markt', 0.4]);
  assert.deepEqual(seen[3].slice(1), ['markt', 1]);
});

test('Weiche Übergänge: setZone mit seconds läuft linear, Welle übernimmt einen laufenden Übergang', () => {
  const v = createVeil({});
  v.setZone('vulkan', 0, { seconds: 2 });
  assert.equal(v.zoneValue('vulkan'), 1, 'vor dem Update unverändert');
  for (let i = 0; i < 30; i++) v.update(1 / 30, i / 30);
  assert.ok(Math.abs(v.zoneValue('vulkan') - 0.5) < 0.03, `nach 1 s etwa halb: ${v.zoneValue('vulkan')}`);
  for (let i = 0; i < 45; i++) v.update(1 / 30, 1 + i / 30);
  assert.equal(v.zoneValue('vulkan'), 0);
  v.setZone('vulkan', 1);
  v.setZone('vulkan', 0.2, { seconds: 10 });
  v.restoreZone('vulkan', { amount: 0, duration: 1, sound: false });
  for (let i = 0; i < 60; i++) v.update(1 / 30, 3 + i / 30);
  assert.equal(v.zoneValue('vulkan'), 0, 'Welle setzt den Zielwert, der Übergang ist verworfen');
});

test('Zustand: getState flach (kompatibel), getFullState mit Flecken, setState rund; Grundwert-Override', () => {
  const v = createVeil({});
  v.addPatch({ id: 'mangrove', x: 150, z: -8, r: 18, veil: 1 });
  v.setZone('strand', 0.3);
  const flat = v.getState();
  assert.equal(flat.strand, 0.3); assert.equal(flat.mangrove, undefined, 'flach = nur Zonen');
  const full = v.getFullState();
  assert.deepEqual(full.patches.mangrove, { x: 150, z: -8, r: 18, veil: 1 });
  const w = createVeil({});
  w.setState(full);
  assert.equal(w.zoneValue('strand'), 0.3);
  assert.deepEqual(w.getFullState(), full);
  const u = createVeil({});
  u.setState(flat);                       // nur Zonen (wie core/index.js)
  assert.equal(u.zoneValue('strand'), 0.3); assert.equal(u.patches.length, 0);
  // Innenräume: außerhalb aller Zonen gilt der Override
  assert.ok(u.amountAt(0, 470) < 0.4);
  u.setBaseOverride(0.85);
  assert.ok(Math.abs(u.amountAt(0, 470) - 0.85) < 1e-6);
  u.setBaseOverride(null);
  for (let i = 0; i < 400; i++) u.update(1 / 30, i / 30);
  assert.ok(u.amountAt(0, 470) < 0.4, 'zurück auf den automatischen Grundwert');
});
