// Unit-Tests Kräfte und Tore (WP35, Node ohne Browser): Blick-Stufen, 36 Wörter, Profi liest Körper, Fäden; Stopp-Schild
// (Fenster ±250/±150/±100 ms je Modus, 4 Lichter, Bewegung/Lächeln schwächt); Zuschauer-Wende; Mut-Auswahl; Tor-Symbole und
// Bedingungen (auch weg/gadget in der Cond-DSL).
// Aufruf: node --test tests/unit/abilities.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { blickStages, BLICK_WORDS, WORD_TOTAL, wordFor, sharedThreads, createStoppSchild, STOPP_WINDOW_MS, bystanderEffect, mutActionFor } from '../../src/systems/abilities/model.js';
import { GATE_META, GATE_TYPES, symbolFor, needsFor, gateSymbol, isOpen } from '../../src/props/gates/model.js';
import { GATE_TYPES as SCHEMA_GATE_TYPES } from '../../src/content/schema/consts.js';
import { createDslContext, evalCond } from '../../src/systems/quests/dsl.js';
import { createState } from '../../src/core/state.js';
import { defaultState } from '../../src/core/save.js';

test('Blick: Stufen aus Upgrades, Profi liest nur Körper, 36 Wörter (6 je Gefühl), Wort nach Intensität', () => {
  const s = blickStages(['blick.faeden', 'blick.tanks'], ['blick']);
  assert.equal(s.auren, true); assert.equal(s.faeden, true); assert.equal(s.tanks, true); assert.equal(s.masken, false);
  assert.equal(blickStages([], []).auren, false);
  assert.equal(WORD_TOTAL, 36);
  for (const l of Object.values(BLICK_WORDS)) assert.equal(l.length, 6);
  assert.equal(wordFor('wut', 0), 'genervt'); assert.equal(wordFor('wut', 10), 'rasend'); assert.equal(wordFor('wut', 5), 'sauer');
  assert.equal(wordFor('wut', 9, { profi: true, heat: 90 }), 'Fäuste geballt');
  assert.equal(wordFor('trauer', 3, { profi: true, heat: 0 }), 'Blick weg');
  const pairs = sharedThreads([{ id: 'a', emotion: 'trauer', need: 'x' }, { id: 'b', emotion: 'trauer', need: 'y' }, { id: 'c', emotion: 'freude', need: 'y' }]);
  assert.deepEqual(pairs.map((p) => p.a + p.b + ':' + p.what), ['ab:gefuehl', 'bc:tank']);
});

test('Stopp-Schild: Fenster ±250/±150/±100 ms je Modus, vier Treffer = Stopp, daneben kein Licht', () => {
  assert.deepEqual(STOPP_WINDOW_MS, { entspannt: 250, abenteuer: 150, profi: 100 });
  for (const [mode, ms] of Object.entries(STOPP_WINDOW_MS)) {
    const s = createStoppSchild({ mode });
    s.start();
    assert.equal(s.windowSeconds, ms / 1000);
    s.hold(); s.tick(0, {}); s.setPhase(0.5 + (ms / 1000 - 0.01) / 1.6);
    assert.equal(s.release().hit, true, mode + ' innen');
    s.hold(); s.tick(0, {}); s.setPhase(0.5 + (ms / 1000 + 0.02) / 1.6);
    const r = s.release();
    assert.equal(r.hit, false, mode + ' außen'); assert.equal(r.lights, 1);
  }
  const s = createStoppSchild({ mode: 'abenteuer' });
  s.start();
  let r = null;
  for (let i = 0; i < 4; i++) { s.hold(); s.tick(0, {}); s.setPhase(0.5); r = s.release(); }
  assert.equal(r.done, true); assert.equal(r.lights, 4); assert.equal(s.active, false);
});

test('Stopp-Schild: Bewegung oder Lächeln schwächt (Licht geht aus, Loslassen zählt nicht)', () => {
  const s = createStoppSchild({ mode: 'entspannt' });
  s.start();
  s.hold(); s.tick(0, {}); s.setPhase(0.5); assert.equal(s.release().lights, 1);
  s.hold(); s.tick(0, {}); s.setPhase(0.5); assert.equal(s.release().lights, 2);
  s.tick(0.1, { moving: true });
  assert.equal(s.lights, 1, 'ein Licht weg');
  s.hold(); s.setPhase(0.5); s.tick(0, { smiling: true }); s.setPhase(0.5);
  const r = s.release();
  assert.equal(r.hit, false); assert.equal(r.weakened, true); assert.equal(r.lights, 1);
});

test('Zuschauer-Wende: −15 Hitze je Umstehendem, höchstens 3; Mut-Auswahl: Stopp vor Klarklang, sonst Zeichen', () => {
  assert.deepEqual(bystanderEffect(0), { heat: 0, courage: 0, count: 0 });
  assert.equal(bystanderEffect(2).heat, -30); assert.equal(bystanderEffect(7).heat, -45);
  assert.equal(mutActionFor({ upgrades: ['mut.stopp', 'mut.klarklang'], target: 'tun', targetHeat: 80, near: true }), 'stopp');
  assert.equal(mutActionFor({ upgrades: ['mut.stopp', 'mut.klarklang'], target: 'tun', targetHeat: 20, near: true }), 'klarklang');
  assert.equal(mutActionFor({ upgrades: ['mut.zeichen'], target: null }), 'zeichen');
  assert.equal(mutActionFor({ upgrades: [], target: null }), null);
});

test('Tore: alle 13 Typen des Schemas haben Meta und Symbol; Symbol folgt der ersten Anforderung (auch weg/gadget)', () => {
  assert.deepEqual([...GATE_TYPES].sort(), [...SCHEMA_GATE_TYPES].sort());
  for (const t of GATE_TYPES) { assert.ok(GATE_META[t], t); const s = gateSymbol({ type: t }); assert.ok(s.icon && s.color && s.label, t); }
  assert.equal(symbolFor({ ability: 'klettern' }).icon, 'klettern');
  assert.equal(symbolFor({ upgrade: 'teamgeist.ruf' }).label, 'Crew-Ruf');
  assert.equal(symbolFor({ weg: 'spalt' }).label, 'Jolies Spalten');
  assert.equal(symbolFor({ gadget: 'kaeltekristall' }).icon, 'kristall');
  assert.equal(symbolFor({ feather: 'wut' }).icon, 'flamme');
  assert.equal(symbolFor({ any: [{ upgrade: 'mut.klarklang' }, { gadget: 'klangmuschel' }] }).kind, 'upgrade');
  assert.equal(symbolFor(null).kind, 'frei');
  assert.equal(needsFor({ type: 'windschatten' }), null);
  assert.deepEqual(needsFor({ type: 'spalt', needs: { bond: ['jolie', 2] } }), { bond: ['jolie', 2] });
});

test('Tore öffnen sich über die Cond-DSL (weg, gadget, upgrade) oder erzwungen; Windschatten ist immer offen', () => {
  const state = createState({ data: defaultState(1) });
  const ctx = createDslContext({ state });
  const ev = (c) => evalCond(c, ctx);
  assert.equal(isOpen({ type: 'windschatten' }, { evalCond: ev }), true);
  assert.equal(isOpen({ type: 'spalt' }, { evalCond: ev }), false);
  state.addUnique('wege', 'spalt');
  assert.equal(isOpen({ type: 'spalt' }, { evalCond: ev }), true);
  assert.equal(isOpen({ type: 'kaeltefeld' }, { evalCond: ev }), false);
  state.addUnique('gadgets', 'kaeltekristall');
  assert.equal(isOpen({ type: 'kaeltefeld' }, { evalCond: ev }), true);
  assert.equal(isOpen({ type: 'runentor' }, { evalCond: ev, forced: true }), true);
  state.addUnique('upgrades', 'teamgeist.ruf');
  assert.equal(isOpen({ type: 'runentor' }, { evalCond: ev }), true);
  assert.equal(isOpen({ type: 'runentor' }, { evalCond: ev, forced: false }), false);
});
