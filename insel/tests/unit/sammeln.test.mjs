// Sticker-Jagd: 24 eindeutige Sticker, keiner an Orten schwieriger Situationen, Belohnungen bei 8/16/24
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Sticker: 24 Stück, eindeutig, fern von Orten schwieriger Situationen', async () => {
  const { STICKER, STICKER_PREIS } = await import('../../src/lycee/sammeln.js');
  assert.equal(STICKER.length, 24);
  assert.equal(new Set(STICKER.map((s) => s[0])).size, 24);
  const RISIKO = [[-60, -93], [60.4, -17], [42, 92], [-24.5, 42.6]];   // Lichtung, Raucherecke, Épicerie, Bushäuschen-Kritzeleien
  for (const [id, x, z] of STICKER) for (const [rx, rz] of RISIKO) assert.ok(Math.hypot(x - rx, z - rz) > 6, id + ' zu nah an ' + rx + ',' + rz);
  assert.deepEqual(Object.keys(STICKER_PREIS).map(Number), [8, 16, 24]);
});
