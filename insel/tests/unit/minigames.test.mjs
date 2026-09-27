// Unit-Tests Minispiele (WP36–39, Node ohne Browser): Medaillen-Hülle (Bronze/Silber/Gold, versteckter Leuchtstern,
// Rückenwind, Bestwerte), Rhythmus-Bewertung, Rennen-Logik und Geist-Aufzeichnung, alle Satz-Bau-Regelsets (inkl. der
// Beispiele e21-klarklang-noor und e18-schmiede je Regel), Duell, Mäxchen mit Tells je Modus, Tank-Leitungen, Grotte mit
// Stopp-Recht, Verteidigung, Regie-Share-Code, Inhaltsdateien.
// Aufruf: node --test tests/unit/minigames.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { medalFor, medalCriteria, primaryKey, updateBest, formatValue, timingFor, meets, RUECKENWIND_TIMING } from '../../src/minigames/shell/medals.js';
import { makeBeats, createRhythm } from '../../src/minigames/rhythmus/logic.js';
import { createRace, createSampler, loadSamples } from '../../src/minigames/rennen/logic.js';
import { evaluate, tileTone, schmiedePhysics, RULESETS } from '../../src/minigames/satzbau/rules.js';
import { createDuel, pickRounds } from '../../src/minigames/duell/logic.js';
import { RANKS, MAEXCHEN, rankOf, valueOf, higher, announceOptions, createMaexchen } from '../../src/minigames/wuerfel/logic.js';
import { faceSvg } from '../../src/minigames/wuerfel/face.js';
import { generateBoard, rotate, rotateCell, flow, solved } from '../../src/minigames/bauen/pipes.js';
import { encodeScene, decodeScene } from '../../src/minigames/bauen/share.js';
import { createGrotto, DEFAULT_MAP } from '../../src/minigames/lotsen/grid.js';
import { createDefense, PETALS } from '../../src/minigames/verteidigung/logic.js';
import { tellFor } from '../../src/systems/npc/model.js';
import { createRng } from '../../src/core/rng.js';
import { MINIGAME_TEMPLATES, SATZBAU_RULESETS } from '../../src/content/schema/consts.js';
import { loadContent } from '../../tools/content-load.mjs';
import TAUZIEHEN from '../../src/content/minigames/e11-tauziehen.js';
import DAECHER from '../../src/content/minigames/hafen-daecher.js';
import KLARKLANG from '../../src/content/minigames/e21-klarklang-noor.js';
import SCHMIEDE from '../../src/content/minigames/e18-schmiede.js';
import KOMPLIMENT from '../../src/content/minigames/e02-kompliment.js';
import KOMMENTAR from '../../src/content/minigames/e27-kommentar.js';
import NEIN from '../../src/content/minigames/e25-nein-vorschlag.js';
import TUN from '../../src/content/npcs/tun.js';

// ---- Medaillen ----
test('Medaillen: Bronze/Silber/Gold nach Quote, Leuchtstern nur bei 100 % ohne Rückenwind und ohne Fehlschlag', () => {
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 0.4 }), { medal: null, stern: false });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 0.5 }), { medal: 'bronze', stern: false });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 0.8 }), { medal: 'silber', stern: false });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 0.95 }), { medal: 'gold', stern: false });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 1 }), { medal: 'gold', stern: true });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 1 }, { rueckenwind: true }), { medal: 'gold', stern: false });
  assert.deepEqual(medalFor(TAUZIEHEN, { hits: 1, fails: 1 }), { medal: 'gold', stern: false });
  assert.equal(primaryKey(TAUZIEHEN), 'hits');
});
test('Medaillen: Zeiten je Modus (Rennen), Rückenwind macht Zeitgrenzen × 1,35 großzügiger', () => {
  assert.equal(primaryKey(DAECHER), 'seconds');
  const C = medalCriteria(DAECHER, 'abenteuer');
  assert.equal(C.gold.seconds, 90); assert.equal(C.silber.seconds, 130); assert.equal(C.bronze.seconds, 200);
  assert.equal(medalCriteria(DAECHER, 'entspannt').gold.seconds, 110);
  assert.equal(medalCriteria(DAECHER, 'profi').gold.seconds, 70);
  assert.equal(medalFor(DAECHER, { seconds: 85 }, { mode: 'abenteuer' }).medal, 'gold');
  assert.equal(medalFor(DAECHER, { seconds: 85 }, { mode: 'profi' }).medal, 'silber');
  assert.equal(medalFor(DAECHER, { seconds: 100 }, { mode: 'abenteuer' }).medal, 'silber');
  assert.equal(medalFor(DAECHER, { seconds: 100 }, { mode: 'abenteuer', rueckenwind: true }).medal, 'gold');
  assert.equal(medalFor(DAECHER, { seconds: 59, fails: 0 }, { mode: 'abenteuer' }).stern, true);
  assert.equal(medalFor(DAECHER, { seconds: 59, fails: 0 }, { mode: 'abenteuer', rueckenwind: true }).stern, false);
  assert.equal(timingFor('entspannt'), 1.3); assert.equal(timingFor('profi', true), 0.8 * RUECKENWIND_TIMING);
  assert.equal(meets({ seconds: 90 }, { seconds: 120 }, { rueckenwind: true }), true);
  assert.equal(meets({ seconds: 90 }, { seconds: 125 }, { rueckenwind: true }), false);
});
test('Bestwerte: neuer Bestwert nur bei besserer Zeit/Quote, Medaille sinkt nie, Stern bleibt', () => {
  let r = updateBest(null, { key: 'seconds', value: 100, medal: 'silber', stern: false, mode: 'abenteuer', ok: true });
  assert.equal(r.newBest, true); assert.equal(r.next.best, 100); assert.equal(r.next.medal, 'silber'); assert.equal(r.next.runs, 1);
  r = updateBest(r.next, { key: 'seconds', value: 120, medal: 'bronze', stern: false, mode: 'abenteuer', ok: true });
  assert.equal(r.newBest, false); assert.equal(r.next.best, 100); assert.equal(r.next.medal, 'silber');
  r = updateBest(r.next, { key: 'seconds', value: 80, medal: 'gold', stern: true, mode: 'profi', ok: true });
  assert.equal(r.newBest, true); assert.equal(r.next.best, 80); assert.equal(r.next.stern, true); assert.equal(r.next.bests.profi, 80);
  r = updateBest(r.next, { key: 'seconds', value: 300, medal: null, stern: false, mode: 'profi', ok: false });
  assert.equal(r.next.stern, true); assert.equal(r.next.medal, 'gold'); assert.equal(r.next.tries, 1);
  assert.equal(formatValue('seconds', 83.45), '1:23,4'); assert.equal(formatValue('seconds', 9.9), '9,9'); assert.equal(formatValue('hits', 0.8), '80 %');
});

// ---- Rhythmus ----
test('Rhythmus: Böen steigen in der Zeit, perfektes Halten trifft alles, Dauerhaltung von weit vorher zählt nicht', () => {
  const beats = makeBeats({ beats: 8, interval: 1.6, hold: 0.7 });
  assert.equal(beats.length, 8);
  for (let i = 1; i < beats.length; i++) assert.ok(beats[i].t > beats[i - 1].t + beats[i - 1].len);
  const R = createRhythm({ beats, window: 0.22 });
  for (const b of beats) { R.press(b.t + 0.05); R.release(b.t + b.len - 0.02); }
  R.tick(999);
  assert.equal(R.ratio, 1);
  assert.deepEqual(R.results, beats.map(() => 'hit'));
  const R2 = createRhythm({ beats, window: 0.22 });
  R2.press(0); R2.release(999); R2.tick(999);
  assert.equal(R2.ratio, 0, 'nur festhalten bringt nichts');
  const R3 = createRhythm({ beats, window: 0.22 });
  for (const b of beats) { R3.press(b.t + 0.35); R3.release(b.t + b.len + 0.1); }
  R3.tick(999);
  assert.equal(R3.ratio, 0.5, 'etwas zu spät = halbe Treffer');
  const irregular = makeBeats({ beats: 12, irregular: true, seed: 5 });
  const gaps = irregular.slice(1).map((b, i) => b.t - irregular[i].t);
  assert.ok(new Set(gaps.map((g) => g.toFixed(2))).size > 3, 'unregelmäßig');
});
test('Rhythmus: Tippen auf den Schlag', () => {
  const beats = makeBeats({ beats: 6, interval: 1.1 });
  const R = createRhythm({ beats, window: 0.2, input: 'tap' });
  beats.forEach((b, i) => { if (i < 4) R.press(b.t + 0.1); });
  R.tick(999);
  assert.equal(R.results.filter((x) => x === 'hit').length, 4);
  assert.equal(R.results.filter((x) => x === 'miss').length, 2);
});

// ---- Rennen ----
test('Rennen: Ringe nur der Reihe nach, Ziel, Bodenkontakt (Kletterei) und Ruder-Abschnitte', () => {
  const race = createRace({ checkpoints: [{ x: 0, z: 10 }, { x: 0, z: 20 }, { x: 0, z: 30 }] });
  race.start(0);
  assert.equal(race.update(1, { x: 0, y: 0, z: 20 }), null, 'zweiter Ring vor dem ersten zählt nicht');
  assert.equal(race.update(2, { x: 0, y: 0, z: 10 }), 'checkpoint');
  assert.equal(race.index, 1);
  race.update(3, { x: 0, y: 0, z: 17 });
  assert.equal(race.update(3.2, { x: 0, y: 0, z: 23 }), 'checkpoint', 'schnell durchquert: Strecke trifft den Ring');
  assert.equal(race.update(4, { x: 0, y: 0, z: 30 }), 'ziel');
  assert.equal(race.done, true); assert.equal(race.seconds, 4);
  const climb = createRace({ checkpoints: [{ x: 0, z: 0, y: 5 }, { x: 0, z: 0, y: 10 }], noGround: true });
  climb.start(0);
  assert.equal(climb.update(1, { x: 0, y: 5, z: 0 }, { grounded: false }), 'checkpoint');
  assert.equal(climb.update(2, { x: 0, y: 0, z: 0 }, { grounded: true }), 'boden');
  climb.reset(0); assert.equal(climb.fails, 1); assert.equal(climb.index, 0);
  const boat = createRace({ checkpoints: [{ x: 0, z: 10 }, { x: 0, z: 20 }, { x: 0, z: 30 }], sections: [{ emotion: 'angst', until: 0 }, { emotion: 'wut', until: 2 }] });
  boat.start(0);
  assert.equal(boat.section.emotion, 'angst');
  assert.equal(boat.update(1, { x: 0, y: 0, z: 10 }), 'abschnitt');
  assert.equal(boat.section.emotion, 'wut'); assert.equal(boat.ruder, null);
  boat.setRuder('wut'); assert.equal(boat.ruder, 'wut');
});
test('Geist der Bestzeit: Aufzeichnung im Takt, kompakt gespeichert, weich abgespielt', () => {
  const s = createSampler(0.2);
  assert.equal(s.add(0, 0, 0, 0), true); assert.equal(s.add(0.1, 1, 0, 0), false); assert.equal(s.add(0.2, 2, 0, 0), true); s.add(0.4, 4, 0, 0);
  const flat = s.serialize();
  assert.equal(flat.length, 12);
  const g = loadSamples(flat);
  assert.equal(g.length, 3);
  const p = g.at(0.3);
  assert.ok(Math.abs(p.x - 3) < 1e-9);
  assert.ok(Math.abs(g.at(-1).x - 0) < 1e-9 && Math.abs(g.at(9).x - 4) < 1e-9);
});

// ---- Satz-Bau ----
const pickOk = (def) => Object.fromEntries(def.slots.map((s) => [s.id, s.tiles.find((t) => tileTone(def, t) === 'konsonant' && t.kind !== 'leer' && t.ok !== false)]));
test('Satz-Bau: Regelsets bekannt, e21-klarklang-noor liefert klar/Dorn/fast', () => {
  assert.deepEqual(RULESETS, SATZBAU_RULESETS);
  const clean = evaluate(KLARKLANG, pickOk(KLARKLANG));
  assert.equal(clean.clean, true); assert.equal(clean.thorn, false); assert.equal(clean.score, 1); assert.equal(clean.text, 'Klar. Das trägt.');
  const thorn = evaluate(KLARKLANG, { ...pickOk(KLARKLANG), grund: KLARKLANG.slots[2].tiles[1] });
  assert.equal(thorn.thorn, true); assert.equal(thorn.clean, false); assert.equal(thorn.per.grund, 'dorn'); assert.ok(thorn.text.startsWith('Schiefer Ton'));
  const fast = evaluate(KLARKLANG, { ...pickOk(KLARKLANG), gefuehl: KLARKLANG.slots[0].tiles[1] });
  assert.equal(fast.thorn, false); assert.equal(fast.clean, false); assert.equal(fast.per.gefuehl, 'leer');
  const missing = evaluate(KLARKLANG, { gefuehl: KLARKLANG.slots[0].tiles[0] });
  assert.equal(missing.complete, false); assert.equal(missing.per.kamera, 'fehlt');
  assert.equal(tileTone(KLARKLANG, KLARKLANG.slots[1].tiles[1]), 'dissonant');
  assert.equal(tileTone(KLARKLANG, KLARKLANG.slots[1].tiles[0]), 'konsonant');
});
test('Satz-Schmiede (e18): jede Regel ergibt ihre Brettphysik', () => {
  const T = (slot, i) => SCHMIEDE.slots[slot].tiles[i];
  const traegt = evaluate(SCHMIEDE, { anfang: T(0, 1), mitte: T(1, 0), ende: T(2, 0) });
  assert.equal(traegt.physics, 'traegt'); assert.equal(traegt.clean, true); assert.equal(traegt.bonus, false); assert.equal(traegt.text, 'Das Brett trägt.');
  const waechst = evaluate(SCHMIEDE, { anfang: T(0, 0), mitte: T(1, 0), ende: T(2, 2) });
  assert.equal(waechst.physics, 'traegt'); assert.equal(waechst.bonus, true); assert.equal(waechst.score, 1); assert.ok(waechst.text.includes('wächst'));
  const glas = evaluate(SCHMIEDE, { anfang: T(0, 1), mitte: T(1, 1), ende: T(2, 0) });
  assert.equal(glas.physics, 'glas'); assert.equal(glas.clean, false); assert.equal(glas.thorn, true); assert.equal(glas.text, 'Glas. Es bricht.');
  const spaet = evaluate(SCHMIEDE, { anfang: T(0, 2), mitte: T(1, 0), ende: T(2, 0) });
  assert.equal(spaet.physics, 'spaet');
  const nicht = evaluate(SCHMIEDE, { anfang: T(0, 3), mitte: T(1, 0), ende: T(2, 0) });
  assert.equal(nicht.physics, 'bricht', 'nicht trägt nicht');
  const passiv = evaluate(SCHMIEDE, { anfang: T(0, 1), mitte: T(1, 0), ende: T(2, 1) });
  assert.equal(passiv.physics, 'bricht', 'passiv trägt nicht');
  const unbeeinflussbar = evaluate(SCHMIEDE, { anfang: T(0, 1), mitte: T(1, 2), ende: T(2, 0) });
  assert.equal(unbeeinflussbar.physics, 'bricht');
  assert.equal(schmiedePhysics([{ rules: { realistisch: false, gegenwart: false } }]).physics, 'glas', 'Glas vor Zukunft');
  assert.ok(traegt.score > glas.score && glas.score >= 0);
});
test('Kompliment (e02): Tat fliegt, Aussehen kippt, „Ach, war nix“ lässt die Laterne sinken', () => {
  const S = KOMPLIMENT.slots;
  const person = S[0].tiles[0];
  const tat = evaluate(KOMPLIMENT, { person, lob: S[1].tiles[1], antwort: S[2].tiles[0] });
  assert.equal(tat.clean, true); assert.equal(tat.physics, 'fliegt'); assert.equal(tat.score, 1);
  const aussehen = evaluate(KOMPLIMENT, { person, lob: S[1].tiles[2], antwort: S[2].tiles[0] });
  assert.equal(aussehen.physics, 'faellt'); assert.equal(aussehen.thorn, true); assert.equal(aussehen.per.lob, 'dorn');
  const leer = evaluate(KOMPLIMENT, { person, lob: S[1].tiles[3], antwort: S[2].tiles[0] });
  assert.equal(leer.clean, false); assert.equal(leer.physics, 'sinkt');
  const nix = evaluate(KOMPLIMENT, { person, lob: S[1].tiles[1], antwort: S[2].tiles[1] });
  assert.equal(nix.clean, false); assert.equal(nix.text, 'Die Laterne sinkt.'); assert.equal(nix.per.antwort, 'sinkt');
});
test('Zusammenfassung, Kommentar, Nein + Vorschlag', () => {
  const Z = { ruleset: 'zusammenfassung', slots: [{ id: 'kern', label: 'Kern', multi: true, tiles: [{ t: 'a', kind: 'kern' }, { t: 'b', kind: 'kern' }, { t: 'c', kind: 'detail' }, { t: 'd', kind: 'urteil' }] }] };
  assert.equal(evaluate(Z, { kern: [Z.slots[0].tiles[0], Z.slots[0].tiles[1]] }).clean, true);
  assert.equal(evaluate(Z, { kern: [Z.slots[0].tiles[0]] }).clean, false);
  const detail = evaluate(Z, { kern: [Z.slots[0].tiles[0], Z.slots[0].tiles[1], Z.slots[0].tiles[2]] });
  assert.equal(detail.clean, true); assert.ok(detail.score < 1);
  assert.equal(evaluate(Z, { kern: [Z.slots[0].tiles[0], Z.slots[0].tiles[3]] }).thorn, true);
  const K = KOMMENTAR.slots;
  assert.equal(evaluate(KOMMENTAR, { start: K[0].tiles[0], dann: K[1].tiles[0] }).clean, true);
  assert.equal(evaluate(KOMMENTAR, { start: K[0].tiles[1], dann: K[1].tiles[0] }).thorn, true);
  assert.equal(evaluate(KOMMENTAR, { start: K[0].tiles[2], dann: K[1].tiles[0] }).clean, true);
  const N = NEIN.slots;
  assert.equal(evaluate(NEIN, { nein: N[0].tiles[0], vorschlag: N[1].tiles[0] }).clean, true);
  assert.equal(evaluate(NEIN, { nein: N[0].tiles[1], vorschlag: N[1].tiles[0] }).text, 'Ein Vielleicht. Kein Nein.');
  assert.equal(evaluate(NEIN, { nein: N[0].tiles[0], vorschlag: N[1].tiles[1] }).text, 'Nein. Und dann?');
  assert.equal(evaluate(NEIN, { nein: N[0].tiles[0], vorschlag: N[1].tiles[2] }).thorn, true);
});

// ---- Duell ----
test('Duell: schnell = Treffer, spät = halber, Zeit abgelaufen = keiner; Runden je Modus', () => {
  const rounds = [{ say: 'x', options: [{ t: 'a', ok: true }, { t: 'b' }] }, { say: 'y', options: [{ t: 'a' }, { t: 'b', ok: true }] }, { say: 'z', options: [{ t: 'a', ok: true }, { t: 'b' }] }];
  const d = createDuel({ rounds, seconds: 4 });
  d.next(); d.begin(0); assert.deepEqual(d.answer(1, 0).ok, true);
  d.next(); d.begin(10); const late = d.answer(13, 1); assert.equal(late.ok, true); assert.equal(late.late, true);
  d.next(); d.begin(20); assert.equal(d.timeout(23), false); assert.equal(d.timeout(24.1), true);
  assert.equal(d.done, true); assert.equal(d.hits, 1.5); assert.equal(d.correct, 2);
  const def = { rounds, modes: { entspannt: { rounds: 2 }, abenteuer: { rounds: 3 }, profi: { rounds: 5 } } };
  assert.equal(pickRounds(def, 'entspannt', createRng(3)).length, 2);
  assert.equal(pickRounds(def, 'profi', createRng(3)).length, 5);
  const r = pickRounds(def, 'abenteuer', createRng(9))[0];
  assert.equal(r.options.filter((o) => o.ok).length, 1, 'richtige Karte bleibt markiert');
});

// ---- Mäxchen ----
test('Mäxchen: Rangfolge, Ansage-Optionen, Zeig!-Auflösung und Tell nur beim Bluff, Stärke je Modus', () => {
  assert.equal(RANKS[0], 31); assert.equal(RANKS[RANKS.length - 1], MAEXCHEN); assert.ok(rankOf(66) < rankOf(21) && rankOf(65) < rankOf(11));
  assert.equal(valueOf(3, 5), 53); assert.equal(valueOf(4, 4), 44); assert.equal(valueOf(1, 2), 21);
  assert.equal(higher(65)[0], 11);
  const opts = announceOptions(43, 42);
  assert.equal(opts[0].value, 43); assert.equal(opts[0].truth, true); assert.ok(opts.every((o, i) => i === 0 || rankOf(o.value) > rankOf(43)));
  const bluffOnly = announceOptions(31, 54);
  assert.ok(bluffOnly.every((o) => !o.truth && rankOf(o.value) > rankOf(54)));
  const tell = tellFor(TUN, 'profi');
  assert.equal(tell.bluff, 'grinst-einseitig'); assert.equal(tell.amp, 0.3); assert.equal(tellFor(TUN, 'entspannt').amp, 1);
  // festes Spiel: Würfel liefern immer 3 und 1 (31 = niedrigster Wert)
  const rng = { int: () => 0, next: () => 0.5, chance: () => false, pick: (a) => a[0] };
  let k = 0;
  const g = createMaexchen({ rng: { ...rng, int: () => [3, 1][k++ % 2] }, tell, shells: 3, sharp: 0.5 });
  g.roll(); assert.equal(g.actual, 31);
  g.announce(31);
  assert.equal(g.npcDecide().call, false, 'niedrige Ansage wird geglaubt');
  const t = g.npcTurn();
  assert.ok(rankOf(t.value) > rankOf(31));
  assert.equal(t.truth, false, 'sie muss bluffen (31 ist am niedrigsten)'); assert.equal(t.tell.bluff, 'grinst-einseitig'); assert.equal(t.tell.amp, 0.3);
  const r = g.call();
  assert.equal(r.truth, false); assert.equal(r.loser, 'npc'); assert.equal(g.shells.npc, 2); assert.equal(g.calls.right, 1);
  // Wahrheit beim Zeig!: Zweifler verliert
  const g2 = createMaexchen({ rng: { ...rng, int: () => 6, chance: () => true }, tell, shells: 3 });
  g2.turn = 'npc'; const t2 = g2.npcTurn(); assert.equal(t2.truth, true); assert.equal(t2.tell, null);
  const r2 = g2.call(); assert.equal(r2.truth, true); assert.equal(r2.loser, 'du'); assert.equal(g2.shells.du, 2);
  const svg = faceSvg({ tell: 'grinst-einseitig', amp: 1 });
  assert.ok(svg.includes('<svg') && svg.includes('stroke="#7a3b3b"'));
  assert.notEqual(faceSvg({ tell: 'blick-links-unten', amp: 1 }), faceSvg({ tell: 'blick-links-unten', amp: 0.3 }), 'Profi subtiler');
});

// ---- Tank-Leitungen ----
test('Tank-Leitungen: erzeugtes Brett ist lösbar, verdreht nicht gelöst, Drehen ist zyklisch, Lösung verbindet alle Tanks', () => {
  for (const seed of [1, 2, 3, 7, 42]) {
    const b = generateBoard({ w: 5, h: 4, tanks: 3, seed });
    assert.equal(b.tanks.length, 3);
    assert.equal(solved(b), false, 'verdreht');
    assert.equal(flow({ ...b, cells: b.solution }).all, true, 'Lösung erreicht alle Tanks');
    assert.ok(b.par >= 1 && b.par <= b.cells.length * 2);
    b.cells = b.solution.slice(); assert.equal(solved(b), true);
  }
  assert.equal(rotate(1), 2); assert.equal(rotate(8), 1); assert.equal(rotate(rotate(rotate(rotate(5)))), 5);
  const b = generateBoard({ w: 3, h: 3, tanks: 1, seed: 5 });
  const before = b.cells[0];
  rotateCell(b, 0, 0); assert.equal(b.moves, before ? 1 : 0);
  assert.equal(b.moves, rotateCell(b, 9, 9).moves, 'außerhalb zählt nicht');
});

// ---- Grotte (Lotsen) ----
test('Grotte: kürzester Weg existiert, Stopp-Recht vor Unbekanntem, Warten beruhigt, Drängeln lässt sie zurückweichen', () => {
  const g = createGrotto({ map: DEFAULT_MAP });
  assert.ok(Number.isFinite(g.optimal) && g.optimal > 5);
  assert.equal(g.dir, 1);
  const r1 = g.command('vor');
  assert.equal(r1.event, 'unsicher'); assert.equal(g.unsure, true); assert.deepEqual(g.pos, g.start);
  const r2 = g.command('vor');
  assert.equal(r2.event, 'draengeln'); assert.equal(g.draengeln, 1);
  g.command('warten'); assert.equal(g.unsure, false); assert.equal(g.trust, true);
  const r3 = g.command('vor'); assert.equal(r3.event, 'schritt');
  assert.equal(g.command('links').event, 'gedreht'); assert.equal(g.dir, 0);
  assert.equal(g.command('vor').event, 'wand');
  assert.ok(g.score < 1 && g.score >= 0.5, 'Drängeln kostet');
  // Laterne: neben der Laterne anzünden macht Felder sichtbar
  const g2 = createGrotto({ map: ['#####', '#S.L#', '#..X#', '#####'] });
  assert.equal(g2.command('vor').event, 'unsicher', 'dahinter ist es dunkel');
  assert.equal(g2.command('warten').event, 'beruhigt');
  assert.equal(g2.command('vor').event, 'schritt');
  assert.equal(g2.command('laterne').event, 'laterne');
  assert.equal(g2.lit(3, 1), true);
  const r = g2.command('vor'); assert.equal(r.event, 'schritt', 'beleuchtet: kein Stopp');
  g2.command('rechts'); assert.equal(g2.command('vor').event, 'ziel'); assert.equal(g2.done, true); assert.equal(g2.score, 1);
});

// ---- Verteidigung ----
test('Verteidigung: Geister erreichen Beete (Blüte weg), Stopp hält, zweites Stopp löst auf, Spiel endet', () => {
  const rng = createRng(11);
  const d = createDefense({ waves: 1, perWave: 2, speed: 30, rng, stoppRadius: 100 });
  let ev = [], guard = 400;
  while (!d.done && guard-- > 0) ev = ev.concat(d.update(0.1));
  assert.ok(ev.some((e) => e.type === 'klammer'), 'ohne Stopp klammern sie');
  assert.ok(d.petals < d.beds.length * PETALS);
  assert.ok(ev.some((e) => e.type === 'ende'));
  const d2 = createDefense({ waves: 1, perWave: 1, speed: 2, rng: createRng(3), stoppRadius: 100 });
  d2.update(0.1); d2.update(0.1); d2.update(2);
  const g = d2.ghosts[0]; assert.ok(g);
  assert.equal(d2.stopp(g.x, g.y).event, 'stopp'); assert.equal(g.state, 'stopp');
  assert.equal(d2.stopp(g.x, g.y).event, 'weg'); assert.equal(g.state, 'weg');
  let guard2 = 200; while (!d2.done && guard2-- > 0) d2.update(0.2);
  assert.equal(d2.score, 1);
});

// ---- Regie-Share-Code ----
test('Regie-Share-Code: Runde durch, nur IDs und Zahlen, kaputte Codes sind null', () => {
  const code = encodeScene({ id: 'e23-theater-regie', cells: ['noor', 'lucinda', null, 'tun'], seed: 3, name: 'Max Muster' });
  assert.ok(code.startsWith('LUMO1-'));
  const back = decodeScene(code);
  assert.deepEqual(back.cells, ['noor', 'lucinda', null, 'tun']); assert.equal(back.seed, 3);
  assert.equal(back.name, '', 'Freitext wird nie übernommen');
  assert.equal(decodeScene('quatsch'), null); assert.equal(decodeScene('LUMO1-###'), null);
});

// ---- Inhalte ----
test('Minispiel-Inhalte: jede Vorlage hat ein Beispiel, Medaillen vollständig, der Stern ist nie Pflicht', async () => {
  const all = (await loadContent()).filter((c) => c.kind === 'minigames' && c.def);
  assert.ok(all.length >= 20, String(all.length));
  const templates = new Set(all.map((c) => c.def.template));
  for (const t of MINIGAME_TEMPLATES) assert.ok(templates.has(t), 'Beispiel für ' + t);
  for (const c of all) {
    const d = c.def;
    assert.ok(d.medals && d.medals.bronze && d.medals.silber && d.medals.gold, d.id + ' Medaillen');
    assert.notEqual(d.story && d.story.minMedal, 'stern', d.id);
    if (d.template === 'rennen') assert.ok(d.params.checkpoints.length >= 3, d.id);
    if (d.template === 'satzbau') assert.ok(SATZBAU_RULESETS.includes(d.ruleset), d.id);
  }
  const rs = new Set(all.filter((c) => c.def.template === 'satzbau').map((c) => c.def.ruleset));
  for (const r of ['klarklang', 'schmiede', 'kompliment', 'kommentar', 'nein-vorschlag']) assert.ok(rs.has(r), r);
});
