// Unit-Tests Bewegung (Node, ohne Browser): Schwapp-Modell, Halt-Ring, Kletter-Geometrie und Auto-Greifen,
// Aufwind-Registry, Runen (Tor durchflogen, Dornen, Sporen, Tauchring), Segel-Modi und Kombis, Pumpsprung-Faktor.
// Aufruf: node --test tests/unit/moves.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createSlosh, SLOSH } from '../../src/actors/moves/carry.js';
import { createHalt, CLIMB } from '../../src/actors/moves/climb.js';
import { createClimbRegistry } from '../../src/world/climbables.js';
import { createUpdraftRegistry } from '../../src/world/updrafts.js';
import { createRuneRegistry } from '../../src/world/runes.js';
import { resolveMode, SEGEL_MODES, COMBOS, EMOTIONS } from '../../src/actors/moves/glide.js';
import { PUMP_FACTOR, PUMP_HOLD } from '../../src/actors/moves/pump.js';
import { K } from '../../src/actors/moves/index.js';

test('Schwappen: Sprint + Landung verschüttet ≥ 30 %, vorsichtiges Gehen < 5 %', () => {
  const s = createSlosh();
  let spilled = 0;
  for (let i = 0; i < 60; i++) spilled += s.tick(1 / 30, { speed: 6.4, accel: 0.05 });   // 2 s Sprint
  spilled += s.tick(1 / 30, { speed: 6.4, impact: 10.2 });                                 // harte Landung
  assert.ok(spilled >= 0.3, `Sprint+Landung: ${spilled.toFixed(2)}`);
  assert.ok(Math.abs(1 - s.fill - spilled) < 1e-9);
  const w = createSlosh();
  let walk = 0;
  for (let i = 0; i < 150; i++) walk += w.tick(1 / 30, { speed: 3.4, accel: 0.02 });      // 5 s gehen
  assert.ok(walk < 0.05, `Gehen: ${walk.toFixed(3)}`);
  // Empfindlichkeit 0 = nichts schwappt, Füllstand nie negativ
  const z = createSlosh(); z.sensitivity = 0;
  for (let i = 0; i < 60; i++) z.tick(1 / 30, { speed: 6.4, impact: 20 });
  assert.equal(z.fill, 1);
  const e = createSlosh(); e.reset(0.02);
  for (let i = 0; i < 60; i++) e.tick(1 / 30, { speed: 6.4, impact: 20 });
  assert.ok(e.fill >= 0 && e.fill <= 0.02);
});

test('Halt-Ring: Basis 3, max. 12, Abbau/Aufbau, Klettersprung kostet 1, nie unter 0', () => {
  const h = createHalt({ segments: 3 });
  assert.equal(h.max, 3); assert.equal(h.current, 3);
  h.setSegments(20); assert.equal(h.max, CLIMB.maxSegments);
  h.setSegments(5); h.fill();
  // 40 m mit 2,2 m/s: reicht mit 5 Segmenten (frei), nicht mit 3
  const secondsFor40m = 40 / CLIMB.speed;
  assert.ok(secondsFor40m / CLIMB.drainSeconds <= 5, 'fünf Segmente reichen für 40 m');
  assert.ok(secondsFor40m / CLIMB.drainSeconds > 3, 'drei Segmente reichen nicht');
  for (let i = 0; i < 100; i++) h.drain(1);
  assert.equal(h.current, 0); assert.ok(h.empty);
  assert.equal(h.spend(1), false, 'leer: kein Klettersprung');
  h.regen(CLIMB.ledgeRegenSeconds * 2); assert.ok(Math.abs(h.current - 2) < 1e-9);
  assert.equal(h.spend(1), true); assert.ok(Math.abs(h.current - 1) < 1e-9);
  h.regen(100); assert.equal(h.current, h.max);
});

test('Kletter-Geometrie: Zylinder und Wand, Simse, Auto-Greifen nur beim Zulaufen', () => {
  const reg = createClimbRegistry();
  const cyl = reg.add({ id: 'stamm', kind: 'mangrove', type: 'cylinder', x: 10, z: 0, r: 1.7, yMin: 0.4, yMax: 40, ledges: [{ y: 12, a0: 0.15, a1: 1.15 }] });
  const out = {};
  cyl.place({ a: 0, y: 5 }, out);
  assert.ok(Math.abs(out.z - (1.7 + 0.36)) < 1e-9 && Math.abs(out.x - 10) < 1e-9);
  assert.ok(Math.abs(cyl.facing({ a: 0 }) - Math.PI) < 1e-9, 'Blick zur Mitte');
  assert.ok(cyl.ledgeAt({ a: 0.5, y: 12.3 }), 'Sims auf der Hauptroute');
  assert.equal(cyl.ledgeAt({ a: 2.5, y: 12.3 }), null, 'Rückseite ohne Sims');
  const l = { a: 0, y: 10 }; cyl.step(l, 1.03, 1); assert.ok(Math.abs(l.a - 0.5) < 1e-9 && l.y === 11);
  cyl.step(l, 0, 100); assert.equal(l.y, 40, 'oben begrenzt');
  // Greifen: am Fuß (Füße unter yMin) beim Zulaufen, nicht beim Weglaufen
  const foot = { x: 10, y: 0.2, z: 1.7 + 0.36 + 0.1 };
  assert.ok(reg.grab(foot, 0, -1, { reach: 0.55, grounded: true }), 'zulaufen greift');
  assert.equal(reg.grab(foot, 0, 1, { reach: 0.55, grounded: true }), null, 'weglaufen greift nicht');
  assert.equal(reg.grab({ x: 10, y: 5, z: 6 }, 0, -1, { reach: 0.55, grounded: true }), null, 'zu weit weg');
  assert.ok(reg.grab({ x: 10, y: 20, z: 2.2 }, 0, 0, { reach: 0.45, grounded: false, vy: -3 }), 'im Fall greift auch ohne Richtung');
  const wall = reg.add({ id: 'wand', kind: 'fels', type: 'wall', x: 0, z: 0, hw: 2, rot: 0, yMin: 0, yMax: 9, ledges: [{ y: 4.5 }] });
  const w = {}; wall.place({ u: 3, y: 2 }, w);
  assert.ok(Math.abs(w.x - 2) < 1e-9 && w.z > 0.3, 'u wird auf die Wandbreite begrenzt, Abstand vor der Wand');
  const n = wall.normal({}); assert.ok(Math.abs(n.z - 1) < 1e-9);
  assert.ok(wall.ledgeAt({ u: 0, y: 4.6 }));
  assert.equal(reg.grab({ x: 0, y: 3, z: 0.4 }, 0, -1, { reach: 0.5, grounded: true }).entry.id, 'wand');
  assert.equal(reg.grab({ x: 0, y: 3, z: -0.8 }, 0, 1, { reach: 0.5, grounded: true }), null, 'hinter der Wand nicht');
  reg.remove('wand'); assert.equal(reg.count, 1);
});

test('Aufwind: innen stark, am Rand schwächer, oben aus; Krater bis 110 m', () => {
  const r = createUpdraftRegistry();
  r.add({ id: 'krater', x: 0, z: -42, r: 11, yMin: 42, yMax: 112, strength: 9 });
  assert.equal(r.liftAt(0, 60, -42), 9);
  assert.ok(r.liftAt(8, 60, -42) < 9 && r.liftAt(8, 60, -42) > 2);
  assert.equal(r.liftAt(12, 60, -42), 0);
  assert.equal(r.liftAt(0, 30, -42), 0);
  assert.ok(r.liftAt(0, 108, -42) > 0 && r.liftAt(0, 108, -42) < 9, 'zum Rand hin schwächer');
  assert.equal(r.liftAt(0, 115, -42), 0);
});

test('Runen: Tor nur beim Durchfliegen, Dornen brechen, Sporen, Tauchring', () => {
  const r = createRuneRegistry();
  const tor = r.add({ id: 'tor', kind: 'tor', emotion: 'freude', x: 0, y: 10, z: 0, r: 2.5, yaw: 0 });
  assert.equal(tor.color, 0xffd23f, 'Gefühlsfarbe');
  assert.equal(r.passTor({ x: 0.3, y: 9, z: -1 }, { x: 0.3, y: 9.2, z: 1 }), tor, 'mittig hindurch');
  assert.equal(r.passTor({ x: 3, y: 9, z: -1 }, { x: 3, y: 9, z: 1 }), null, 'neben dem Ring');
  assert.equal(r.passTor({ x: 0, y: 9, z: 1 }, { x: 0, y: 9, z: 2 }), null, 'nicht gekreuzt');
  const d = r.add({ id: 'dorn', kind: 'dornen', x: 20, y: 0, z: 0, hw: 3, hd: 0.6, h: 4, yaw: Math.PI / 2 });
  assert.ok(r.hitDornen({ x: 21.0, y: 1, z: 0 }, 0.8), 'vor der Wand');
  assert.equal(r.hitDornen({ x: 20, y: 6, z: 0 }, 0.8), null, 'darüber');
  assert.equal(r.hitDornen({ x: 20, y: 1, z: 5 }, 0.8), null, 'seitlich vorbei');
  r.breakDornen(d); assert.equal(r.hitDornen({ x: 21, y: 1, z: 0 }, 0.8), null, 'gebrochen');
  const s = r.add({ id: 'sporen', kind: 'sporen', x: 0, y: 8, z: 30, r: 4 });
  assert.equal(r.inSporen({ x: 1, y: 7, z: 31 }), s); assert.equal(r.inSporen({ x: 6, y: 7, z: 31 }), null);
  r.add({ id: 'ring', kind: 'tauchring', x: 50, y: 5.2, z: 50, r: 2.2 });
  assert.ok(r.tauchringAt(51, 50)); assert.equal(r.tauchringAt(54, 50), null);
  r.setColors({ freude: '#ff0000' }); assert.equal(tor.color, 0xff0000);
});

test('Segel-Modi: sechs Gefühle mit eigener Regel, Kombis nur mit segel.kombi', () => {
  for (const e of EMOTIONS) assert.ok(SEGEL_MODES[e], e);
  assert.ok(SEGEL_MODES.wut.breaks && SEGEL_MODES.wut.fwd > SEGEL_MODES.neutral.fwd);
  assert.equal(SEGEL_MODES.angst.timeScale, 0.5);
  assert.ok(SEGEL_MODES.trauer.dive && SEGEL_MODES.trauer.sink > 5);
  assert.ok(SEGEL_MODES.freude.sink < SEGEL_MODES.neutral.sink && SEGEL_MODES.freude.lift > 1);
  assert.equal(SEGEL_MODES.ueberraschung.hover, 2);
  assert.ok(SEGEL_MODES.ekel.sporen);
  assert.equal(resolveMode('freude', 'trauer', true).id, 'regenbogen');
  assert.equal(resolveMode('trauer', 'freude', true).id, 'regenbogen');
  assert.equal(resolveMode('angst', 'wut', true).id, 'schutzschub');
  assert.equal(resolveMode('freude', 'trauer', false).id, 'freude', 'ohne Kombi-Upgrade zählt das erste Gefühl');
  assert.equal(resolveMode('freude', 'wut', true).id, 'freude', 'unbekannte Paarung: erstes Gefühl');
  assert.equal(resolveMode(null).id, 'neutral');
  assert.ok(Object.keys(COMBOS).length === 2);
  // Gleitweite: neutral L/D ≥ 6 → vom 10-m-Podest ≥ 60 m
  assert.ok(SEGEL_MODES.neutral.fwd / SEGEL_MODES.neutral.sink >= 6);
});

test('Pumpsprung: Faktor ergibt ≥ 2,2-fache Höhe, Halten ≥ 0,5 s', () => {
  const h = (v) => (v * v) / (2 * K.GRAVITY);
  assert.ok(h(K.JUMP_V * PUMP_FACTOR) / h(K.JUMP_V) >= 2.2);
  assert.equal(PUMP_HOLD, 0.5);
});
