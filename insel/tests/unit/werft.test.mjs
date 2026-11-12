// Unit-Tests Werft (Kostprobe, BAUPLAN §2.1 A4): Kosten der drei Teile (Ausleger, Segel, Laterne) gehen mit allen Funden
// und mit JEDEN 9 der 10 Funde; die Laterne geht schon mit JEDEN 6 der 7 Funde vor der Nebelwand; die Laterne braucht
// Ildas Plan; doppelt bauen geht nicht; Bezahlen zieht genau die Kosten ab.
// Aufruf: node --test tests/unit/werft.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import FUNDE from '../../src/content/bergen/hafen.js';
import TEILE from '../../src/content/boot/teile.js';
import { fundorte, sumMaterials, MATERIALS } from '../../src/systems/bergen/model.js';
import { checkBuild, payFor, totalCost, affords } from '../../src/systems/werft/model.js';

const L = fundorte(FUNDE);
const T = TEILE.teile.filter((t) => !t.mission);   // die drei Boots-Teile; der Blitz-Motor (QUELLE) ist ein Missions-Teil
const ids = L.map((f) => f.id);
const combos = (arr, k) => (k === 0 ? [[]] : arr.flatMap((x, i) => combos(arr.slice(i + 1), k - 1).map((c) => [x, ...c])));

test('Teile: Ausleger, Segel, Laterne mit Kosten aus den vier Materialien', () => {
  assert.deepEqual(T.map((t) => t.id).sort(), ['ausleger', 'laterne', 'segel']);
  for (const t of T) for (const k of Object.keys(t.kosten)) assert.ok(MATERIALS.includes(k));
  assert.deepEqual(TEILE.materialien.map((m) => m.id), MATERIALS);
});

test('Alle drei Teile sind mit allen Funden und mit jeden 9 von 10 Funden baubar', () => {
  const cost = totalCost(T);
  assert.ok(affords(sumMaterials(L), cost));
  for (const c of combos(ids, 9)) assert.ok(affords(sumMaterials(L, c), cost), 'ohne ' + ids.filter((i) => !c.includes(i)));
});

test('Laterne geht mit jeden 6 der 7 Funde vor der Nebelwand (Szenario: 6 bergen → Laterne)', () => {
  const lat = T.find((t) => t.id === 'laterne');
  const vor = L.filter((f) => f.kind !== 'wrack').map((f) => f.id);
  assert.equal(vor.length, 7);
  for (const c of combos(vor, 6)) assert.ok(affords(sumMaterials(L, c), lat.kosten), 'ohne ' + vor.filter((i) => !c.includes(i)));
});

test('Bauen: Laterne braucht Ildas Plan, fehlendes Material wird genannt, bezahlen zieht ab, kein Doppelbau', () => {
  const lat = T.find((t) => t.id === 'laterne');
  const all = sumMaterials(L);
  assert.equal(checkBuild(lat, all, { plans: [] }).ok, false);
  assert.equal(checkBuild(lat, all, { plans: [] }).plan, false);
  assert.equal(checkBuild(lat, all, { plans: ['laterne'] }).ok, true);
  const r = checkBuild(lat, { metall: 1 }, { plans: ['laterne'] });
  assert.deepEqual(r.fehlt, { tau: 1, tuch: 1 });
  const after = payFor(lat, all);
  for (const k of MATERIALS) assert.equal(after[k], all[k] - (lat.kosten[k] || 0));
  assert.equal(checkBuild(lat, after, { plans: ['laterne'], gebaut: ['laterne'] }).ok, false);
  // Reihenfolge egal: alle drei nacheinander bezahlen, nie negativ
  let m = all;
  for (const t of T) { assert.ok(checkBuild(t, m, { plans: ['laterne'] }).ok, t.id); m = payFor(t, m); }
  for (const k of MATERIALS) assert.ok(m[k] >= 0);
});

test('Blitz-Motor (QUELLE): versteckt, braucht Tuns Plan, geht nach allen drei Teilen mit allen 10 Funden', () => {
  const bm = TEILE.teile.find((t) => t.id === 'blitzmotor');
  assert.ok(bm && bm.versteckt && bm.mission && bm.plan === 'blitzmotor');
  let m = sumMaterials(L);
  for (const t of T) m = payFor(t, m);
  assert.equal(checkBuild(bm, m, { plans: ['laterne'] }).ok, false);
  assert.equal(checkBuild(bm, m, { plans: ['laterne', 'blitzmotor'] }).ok, true);
  const rest = Object.values(bm.kosten).reduce((a, b) => a + b, 0);
  assert.ok(rest >= 5, 'viel Material');
});
