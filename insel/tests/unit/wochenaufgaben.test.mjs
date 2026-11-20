// Wochenaufgaben: drei je Kapitel, Lernen immer dabei, gleich für alle (fest je Kapitel), zählen ab Kapitelbeginn
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Wochenaufgaben: drei verschiedene, Lernen immer dabei, fest je Kapitel', async () => {
  const { aufgabenFuer, aufgabenStand, AUFGABEN } = await import('../../src/lycee/wochenaufgaben.js');
  const S = { merke: {} };
  for (let kap = 1; kap <= 10; kap++) {
    const a = aufgabenFuer(kap, S);
    assert.equal(a.length, 3); assert.equal(a[0].id, 'lernen'); assert.equal(new Set(a.map((x) => x.id)).size, 3);
    assert.deepEqual(a, aufgabenFuer(kap, S), 'nicht fest');
    assert.ok(!a.some((x) => x.id === 'tier'), 'Haustier-Aufgabe ohne Haustier');
  }
  for (const x of AUFGABEN) assert.ok(x.t(2).split(/\s+/).length <= 9, x.id);
  const wo = { liste: [{ id: 'lernen', n: 2 }, { id: 'sticker', n: 2 }], start: { lernen: 3, sticker: 5 } };
  const st = aufgabenStand({ merke: { lernen: 4, sticker: new Array(7).fill('x') } }, wo);
  assert.deepEqual(st.map((x) => [x.ist, x.fertig]), [[1, false], [2, true]]);
});

test('Wochenaufgaben: im Winter (Kapitel 5–6) ist die Eisbahn sicher dabei, sonst nie', async () => {
  const { aufgabenFuer } = await import('../../src/lycee/wochenaufgaben.js');
  for (const kap of [5, 6]) { const l = aufgabenFuer(kap, { merke: {} }); assert.equal(l.length, 3); assert.ok(l.some((x) => x.id === 'eis'), 'Eis in Kap ' + kap); assert.equal(new Set(l.map((x) => x.id)).size, 3); }
  for (const kap of [1, 2, 3, 4, 7, 8, 9, 10]) assert.ok(!aufgabenFuer(kap, { merke: {} }).some((x) => x.id === 'eis'));
});
