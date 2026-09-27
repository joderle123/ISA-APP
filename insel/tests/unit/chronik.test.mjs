// Unit-Tests Herzglas-Chronik (WP54, Node ohne Browser): Zeitstrahl, Splitter legen, Widersprüche mit „Warum“-Slots,
// Kette, Cliffhanger-Pool (≤ 12 Wörter), Grisel-Zustände, die vier Erinnerungen (Bildunterschrift ≤ 12 Wörter, kein
// Ausbruch als Ursache des Graus).
// Aufruf: node --test tests/unit/chronik.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../../src/systems/chronik/model.js';
import { countWords } from '../../src/content/schema/text.js';
import m1 from '../../src/content/memories/erinnerung-1-jolie.js';
import m2 from '../../src/content/memories/erinnerung-2-tiago.js';
import m3 from '../../src/content/memories/erinnerung-3-maelle.js';
import m4 from '../../src/content/memories/erinnerung-4-jhemp.js';

const MEMS = [m1, m2, m3, m4];

test('Zeitstrahl: neun Slots von früh bis spät, jeder Splitter hat genau einen Platz', () => {
  assert.equal(C.TIMELINE.length, 9);
  for (let i = 1; i < C.TIMELINE.length; i++) assert.ok(C.TIMELINE[i].hour >= C.TIMELINE[i - 1].hour);
  assert.deepEqual(Object.keys(C.SLOT_OF).map(Number).sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(C.SHARD_AT[C.SLOT_OF[4]], 4);
  assert.ok(C.SLOT_OF[2] < C.SLOT_OF[8] && C.SLOT_OF[8] < C.SLOT_OF[3] && C.SLOT_OF[3] < C.SLOT_OF[4] && C.SLOT_OF[4] < C.SLOT_OF[9], 'Tiago (19:00) vor Kim (20:00) vor Maëlle vor Jhemp vor der Nacht');
  assert.equal(C.fmtHour(22.45), '22:27');
});

test('Splitter legen: falscher Platz erlaubt (wackelt nur), ein Slot je Splitter, Kette komplett bei 9 richtigen', () => {
  let r = C.placeShard([], 3, C.SLOT_OF[3]);
  assert.ok(r.ok && r.correct);
  r = C.placeShard(r.placed, 4, C.SLOT_OF[3]);
  assert.ok(r.ok && !r.correct && r.placed.length === 1, 'Slot ersetzt den vorherigen Splitter');
  r = C.placeShard(r.placed, 4, C.SLOT_OF[4]);
  assert.ok(r.correct && r.placed.length === 1);
  assert.ok(!C.placeShard([], 10, 1).ok && !C.placeShard([], 1, 0).ok);
  let all = [];
  for (let s = 1; s <= 9; s++) all = C.placeShard(all, s, C.SLOT_OF[s]).placed;
  assert.ok(C.chainComplete(all)); assert.equal(C.correctCount(all), 9);
  assert.equal(C.unplaceShard(all, 5).length, 8);
  assert.equal(C.shardInSlot(all, C.SLOT_OF[7]), 7);
});

test('Widersprüche: erst wenn beide gefunden und gelegt; Warum-Kacheln ≤ 6 Wörter mit Icon; nie Ausbruch als Ursache', () => {
  for (const c of C.CONTRADICTIONS) {
    assert.ok(c.tiles.filter((t) => t.ok).length === 1, c.id + ': genau eine passende Kachel');
    for (const t of c.tiles) { assert.ok(countWords(t.t) <= 6, t.t); assert.ok(t.icon); }
    assert.ok(countWords(c.say) <= 12 && countWords(c.prompt) <= 12);
    const ok = c.tiles.find((t) => t.ok).t.toLowerCase();
    assert.ok(!/kaputt|absicht|schuld/.test(ok), 'die passende Antwort macht niemanden schuldig');
  }
  assert.equal(C.openContradictions({ shards: [1, 2] }).length, 0);
  const found = C.openContradictions({ shards: [3, 4], placed: [] });
  assert.equal(found.length, 1); assert.ok(!found[0].ready);
  const ready = C.openContradictions({ shards: [3, 4], placed: [{ shard: 3, slot: 1 }, { shard: 4, slot: 2 }] });
  assert.ok(ready[0].ready && !ready[0].solved);
  assert.ok(C.openContradictions({ shards: [3, 4], placed: ready[0].shards.map((s, i) => ({ shard: s, slot: i + 1 })), solved: ['wer-rannte'] })[0].solved);
  assert.ok(C.answerWhy('wer-rannte', 'zu-laut').ok);
  const wrong = C.answerWhy('wer-rannte', 'absicht');
  assert.ok(!wrong.ok && wrong.say === 'Schau nochmal hin.');
  assert.ok(!C.answerWhy('gibtsnicht', 'x').ok && !C.answerWhy('wer-rannte', 'x').ok);
});

test('Kette: Glied je gelegtem Splitter aus MemoryDef.chain', () => {
  const ch = C.chainFor(MEMS, [{ shard: 2, slot: C.SLOT_OF[2] }, { shard: 4, slot: 1 }]);
  assert.equal(ch.length, 9);
  const l2 = ch.find((c) => c.shard === 2);
  assert.ok(l2.placed && l2.correct && l2.step === 'video' && l2.say.length > 0);
  const l4 = ch.find((c) => c.shard === 4);
  assert.ok(l4.placed && !l4.correct);
  assert.ok(!ch.find((c) => c.shard === 1).placed && ch.find((c) => c.shard === 1).say === null);
});

test('Cliffhanger-Pool: ≤ 12 Wörter, passend zu den jüngsten Splittern und gelösten Widersprüchen', () => {
  assert.deepEqual(C.cliffhangerPool({}), []);
  const p = C.cliffhangerPool({ shards: [1, 2, 3], solved: ['lachen'], units: {} });
  assert.ok(p.length >= 3);
  for (const t of p) assert.ok(countWords(t) <= 12, t);
  assert.ok(p.some((t) => t.includes('Maëlle')) && p.some((t) => t.includes('Schnitt')));
  assert.ok(!p.some((t) => t.includes('Turm wurde dunkel')), 'nur die zwei jüngsten Splitter');
  const g = C.cliffhangerPool({ shards: [1, 2, 3, 4], units: { 'j1-e11': 'offen' } });
  assert.ok(g.some((t) => t.startsWith('Grisel')));
  for (const k of Object.keys(C.CLIFF_BY_SHARD)) for (const t of C.CLIFF_BY_SHARD[k]) assert.ok(countWords(t) <= 12, t);
});

test('Grisel: verborgen → Ferne ab M3 → nah ab acht Splittern → Lichtfalter im Finale', () => {
  assert.equal(C.griselStateFor({ module: 2 }), 'verborgen');
  assert.equal(C.griselStateFor({ module: 3 }), 'ferne');
  assert.equal(C.griselStateFor({ module: 3, shards: [1, 2, 3, 4, 5, 6, 7, 8] }), 'nah');
  assert.equal(C.griselStateFor({ module: 9, flags: { 'finale.lichtfalter': true } }), 'lichtfalter');
  assert.equal(C.griselStateFor({ module: 1, flags: { 'grisel.nah': true } }), 'nah');
  assert.equal(C.GRISEL_PROP_STATE.ferne, 'schatten');
});

test('Die vier Erinnerungen: Splitter 1–4, Bildunterschrift ≤ 12 Wörter, Gefühlsfarbe, Kettenglied, kein Ausbruch als Ursache', () => {
  assert.deepEqual(MEMS.map((m) => m.shard), [1, 2, 3, 4]);
  for (const m of MEMS) {
    assert.ok(countWords(C.textOf(m.caption)) <= 12, m.id);
    assert.ok(m.chain && countWords(C.textOf(m.chain.say)) <= 12, m.id + ' Kette');
    assert.ok(/^#[0-9a-f]{6}$/i.test(m.filter.tint));
    assert.equal(m.owner, C.SHARDS[m.shard].owner);
    assert.equal(m.unit, C.SHARDS[m.shard].unit);
    assert.ok(m.diorama && m.diorama.scene && m.diorama.figures.length >= 1);
    if (m.laterTruth) assert.ok(countWords(C.textOf(m.laterTruth.say)) <= 12);
  }
  const j = MEMS[3];
  const all = [C.textOf(j.caption), C.textOf(j.chain.say), C.textOf(j.laterTruth.say)].join(' ').toLowerCase();
  assert.ok(all.includes('unfall') && all.includes('schweigen'), 'Jhemps Erinnerung: Unfall, Grau vom Schweigen');
  assert.ok(!/schuld|absicht|böse/.test(all));
});
