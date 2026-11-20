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
