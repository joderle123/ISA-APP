// Botengänge (Brett neben der Bäckerei) und S-K-A-T-E-Buchstaben im Skatepark: Daten stimmig, Sätze kurz
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Botengänge: 8 eindeutige Aufträge, Start ≠ Ziel, kurze Sätze', async () => {
  const { BOTENGAENGE } = await import('../../src/lycee/botengang.js');
  assert.equal(BOTENGAENGE.length, 8);
  assert.equal(new Set(BOTENGAENGE.map((b) => b.id)).size, 8);
  for (const b of BOTENGAENGE) {
    assert.ok(Math.hypot(b.nach.x - b.von.x, b.nach.z - b.von.z) > 20, b.id + ': Weg zu kurz');
    for (const satz of [b.von.satz, b.nach.danke]) assert.ok(satz.split(/\s+/).length <= 12, b.id + ': Satz zu lang: ' + satz);
    assert.ok(b.ding && b.von.ort && b.nach.ort && b.von.wer && b.nach.wer, b.id + ': Angaben fehlen');
  }
});

test('S-K-A-T-E: fünf Buchstaben im Skatepark, nur mit Sprung erreichbar', async () => {
  const { SKATE_BUCHSTABEN } = await import('../../src/lycee/buchstaben.js');
  assert.equal(SKATE_BUCHSTABEN.map((b) => b[0]).join(''), 'SKATE');
  for (const [b, x, z, y] of SKATE_BUCHSTABEN) {
    assert.ok(x > 79 && x < 105 && z > 74.5 && z < 81, b + ' liegt außerhalb des Skateparks');
    assert.ok(y - 0.95 > 0.5, b + ' wäre ohne Sprung erreichbar');   // Kopfhöhe am Boden 0.95, Fenster ±0.5
    assert.ok(y < 2.2, b + ' zu hoch');
  }
});

test('Dosenwerfen: Pyramide 3-2-1, jede obere Dose steht auf zwei unteren', async () => {
  const { pyramide, DOSEN_STAND } = await import('../../src/lycee/dosen.js');
  const d = pyramide();
  assert.equal(d.length, 6);
  assert.deepEqual(d.map((x) => x.auf.length), [0, 0, 0, 2, 2, 2]);
  for (const x of d) for (const j of x.auf) { assert.ok(d[j].y < x.y, 'steht nicht auf einer tieferen Dose'); assert.ok(Math.abs(d[j].x - x.x) < 0.2, 'zu weit seitlich'); }
  assert.ok(DOSEN_STAND.z - DOSEN_STAND.wurfZ > 4, 'Wurflinie zu nah');
});

test('Garderobe: eindeutige Teile, jede Art vertreten, Hinweise kurz, Tests laufen auf leerem Stand', async () => {
  const { GARDEROBE, ARTEN, freigeschaltet } = await import('../../src/lycee/garderobe.js');
  assert.equal(new Set(GARDEROBE.map((g) => g.id)).size, GARDEROBE.length);
  for (const [a] of ARTEN) assert.ok(GARDEROBE.filter((g) => g.art === a).length >= 4, 'zu wenig: ' + a);
  assert.ok(GARDEROBE.some((g) => g.level), 'Level-Belohnungen fehlen');
  for (const g of GARDEROBE) assert.ok(g.hinweis.split(/\s+/).length <= 12 && g.name && g.sy, g.id);
  assert.deepEqual(freigeschaltet({ merke: {} }), ['k_start'], 'leerer Stand: nur das Start-Geschenk');
  const voll = { jetonsGesamt: 500, merke: { sticker: new Array(24).fill('x'), boten: { n: 8, best: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1 } }, skate5: 'SKATE', skate5Rekord: 30, fotoBingo: new Array(9).fill('x'), tanzRekord: 9000, tanzSterne: 3, kickerSiege: 1, kicker: 5, tanz: 2, dosenRekord: 6, elfmeterRekord: 5, volleyRekord: 12, renn_brett: 50, renn_trotti: 40, enten: 2, billardSiege: 1, kickerBesiegt: [1, 2, 3], billardBesiegt: [1, 2, 3], hf: { fertig: [1, 2, 3, 4, 5] } }, herz: { a: 4, b: 5, c: 4 } };
  assert.equal(freigeschaltet(voll).length, GARDEROBE.length, 'alles erreichbar');
});

test('Herausforderungen: kurze Sätze, bekannte Leute, eine nach der anderen', async () => {
  const { HERAUSFORDERUNGEN, herausforderungPruefen } = await import('../../src/lycee/herausforderungen.js');
  const { GLEICHALTRIGE } = await import('../../src/lycee/freunde.js');
  for (const h of HERAUSFORDERUNGEN) { assert.ok(GLEICHALTRIGE.includes(h.von), h.von); for (const t of [h.text, h.danke]) assert.ok(t.split(/\s+/).length <= 12, t); }
  const m = {};
  const a = herausforderungPruefen(m, 1, 5); assert.ok(a && a.neu);
  m.hf = { aktiv: a.neu.id, schritt: 5, fertig: [] };
  assert.equal(herausforderungPruefen(m, 1, 6), null, 'nicht geschafft: nichts');
  m.dosenRekord = 6; m.kickerSiege = 1;
  const b = herausforderungPruefen(m, 1, 6); assert.ok(b && b.geschafft && b.geschafft.id === a.neu.id);
  m.hf = { aktiv: null, schritt: 6, fertig: [a.neu.id] };
  assert.equal(herausforderungPruefen(m, 1, 6), null, 'im selben Abschnitt keine neue');
});

test('Billard: Dreieck mit 15 Kugeln, die 8 in der Mitte, nichts überlappt', async () => {
  const { dreieck, KUGEL_R } = await import('../../src/lycee/billard.js');
  const d = dreieck();
  assert.equal(d.length, 15); assert.equal(new Set(d.map((k) => k.n)).size, 15);
  const acht = d.find((k) => k.n === 8), mitte = d.filter((k) => Math.abs(k.z) < 1e-9);
  assert.ok(mitte.includes(acht), 'die 8 liegt nicht in der Mitte');
  for (let i = 0; i < d.length; i++) for (let j = i + 1; j < d.length; j++) assert.ok(Math.hypot(d[i].x - d[j].x, d[i].z - d[j].z) >= 2 * KUGEL_R - 1e-6, 'Überlappung');
});

test('Kicker 3D: jede Stange kann gleiten, das Fünfer-Mittelfeld nur wenig', async () => {
  const { STANGEN3D, stangenWeg, KICKER_TISCH } = await import('../../src/lycee/kicker3d.js');
  assert.equal(STANGEN3D.length, 8);
  assert.deepEqual(STANGEN3D.filter((s) => s[1] === 'b').map((s) => s[2]).sort(), [1, 2, 3, 5]);
  for (const [u, , n, a] of STANGEN3D) {
    const w = stangenWeg(n, a); assert.ok(w > 0.03, 'Stange bei ' + u + ' steckt fest');
    assert.ok((n - 1) / 2 * a + w < KICKER_TISCH.B / 2, 'Figur stößt an die Bande');
  }
  assert.ok(stangenWeg(5, 0.13) < stangenWeg(2, 0.24));
});
