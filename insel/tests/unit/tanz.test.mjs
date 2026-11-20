// Tanzfläche (Jugendhaus): Noten für 16 Takte – sortiert, vier Spuren, „leicht“ nur Viertel, nicht zu dicht
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Tanz-Noten: sortiert, Spuren 0–3, leicht nur auf Vierteln', async () => {
  const { tanzNoten } = await import('../../src/lycee/tanz.js');
  let z = 1; const zufall = () => { z = (z * 16807) % 2147483647; return z / 2147483647; };
  const normal = tanzNoten({ zufall }), leicht = tanzNoten({ leicht: true, zufall });
  for (const liste of [normal, leicht]) {
    for (let i = 1; i < liste.length; i++) assert.ok(liste[i].schlag > liste[i - 1].schlag, 'Noten nicht sortiert');
    for (const n of liste) assert.ok(n.spur >= 0 && n.spur <= 3);
    assert.ok(liste[liste.length - 1].schlag < 64, 'länger als 16 Takte');
  }
  assert.ok(leicht.every((n) => Number.isInteger(n.schlag)), 'leicht hat Achtel');
  assert.ok(normal.some((n) => !Number.isInteger(n.schlag)), 'normal ohne Achtel');
  assert.ok(leicht.length >= 50 && normal.length <= 100, 'Anzahl unpassend: ' + leicht.length + ' / ' + normal.length);
  assert.ok(normal.filter((n) => n.schlag < 8).every((n) => n.schlag % 2 === 0), 'Anfang zu schwer');
});
