// Gedächtnis der Welt: jede Erinnerung hängt an einer Entscheidung, die es in der Geschichte wirklich gibt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { GEDAECHTNIS, RUF } from '../../src/lycee/gedaechtnis.js';

const story = readdirSync(new URL('../../src/lycee/story/', import.meta.url)).filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(new URL('../../src/lycee/story/' + f, import.meta.url), 'utf8')).join('\n');
const gesetzt = new Set();
for (const m of story.matchAll(/merke:\s*(\[[^\]]*\]|'[^']*')/g)) for (const f of m[1].matchAll(/'([A-Za-z0-9_]+)'/g)) gesetzt.add(f[1]);
const quelle = readFileSync(new URL('../../src/lycee/gedaechtnis.js', import.meta.url), 'utf8');

test('Ids sind eindeutig, Zeitfenster stimmen', () => {
  const ids = GEDAECHTNIS.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const g of [...GEDAECHTNIS, ...RUF]) { assert.ok(g.ab >= 1 && g.ab <= 10, g.id); assert.ok(!g.bis || g.bis >= g.ab, g.id); }
});

test('Jede Bedingung nennt eine Entscheidung, die die Geschichte setzt', () => {
  const genannt = new Set([...quelle.matchAll(/(?:m|und)\(([^)]*)\)/g)].flatMap((x) => [...x[1].matchAll(/'([A-Za-z0-9_]+)'/g)].map((y) => y[1])));
  assert.ok(genannt.size > 30);
  const fehlt = [...genannt].filter((f) => !gesetzt.has(f));
  assert.deepEqual(fehlt, []);
});

test('Bedingungen greifen nur mit dem passenden Flag', () => {
  for (const g of GEDAECHTNIS) { assert.equal(g.wenn({}), false, g.id); assert.ok(Array.isArray(g.g) && g.g.length, g.id); }
  for (const r of RUF) { assert.equal(r.wenn({}), false, r.id); assert.ok(r.t.length, r.id); }
});
