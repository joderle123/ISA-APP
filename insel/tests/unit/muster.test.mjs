// Muster im Journal: jede gezählte Entscheidung gibt es in den Situationen wirklich; Sätze erst ab genug Wiederholungen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { muster } from '../../src/lycee/muster.js';

const sit = readFileSync(new URL('../../src/lycee/situationen.js', import.meta.url), 'utf8');
const quelle = readFileSync(new URL('../../src/lycee/muster.js', import.meta.url), 'utf8');

test('Gezählte Entscheidungen kommen in situationen.js vor', () => {
  const paare = [...quelle.matchAll(/'(sit_[a-z]+):([a-z]+)'/g)].map((m) => [m[1], m[2]]);
  assert.ok(paare.length > 30);
  const fehlt = paare.filter(([k, v]) => !new RegExp(`a\\.merke\\('${k}',[^)]*'${v}'`).test(sit));
  assert.deepEqual(fehlt, []);
});

test('Leer ohne Entscheidungen, höchstens vier Sätze, Gelungenes bei Gleichstand zuerst', () => {
  assert.deepEqual(muster({}), []);
  assert.deepEqual(muster({ sit_wald: 'mitgemacht' }), []);
  const m = muster({ sit_wald: 'mitgemacht', sit_vape: 'gezogen', sit_link: 'geprueft', sit_kiste: 'gefragt', sit_halle: 'hilfe', sit_witz: 'geholfen', sit_zaun: 'begleitet' });
  assert.ok(m.length <= 4);
  assert.equal(m[0].art, 'gefragt');
  assert.ok(m.findIndex((x) => x.art === 'mitgemacht') > m.findIndex((x) => x.art === 'andere'));
});
