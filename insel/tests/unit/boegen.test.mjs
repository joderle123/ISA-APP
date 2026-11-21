// Freundschafts-Bögen: drei Teile je Person, gültige Zeitfenster, jede abgefragte Entscheidung wird vorher gesetzt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BOEGEN } from '../../src/lycee/boegen.js';

const quelle = readFileSync(new URL('../../src/lycee/boegen.js', import.meta.url), 'utf8');

test('Je Person drei Teile mit passenden Zeitfenstern', () => {
  for (const [id, teile] of Object.entries(BOEGEN)) {
    assert.equal(teile.length, 3, id);
    for (let i = 0; i < teile.length; i++) {
      const t = teile[i];
      assert.ok(t.titel && t.ab >= 1 && t.bis <= 10 && t.bis >= t.ab, id + ' ' + i);
      if (i) assert.ok(t.ab > teile[i - 1].ab, id + ': Teil ' + (i + 1) + ' beginnt nach Teil ' + i);
    }
  }
});

test('Jeder Teil liefert ein Gespräch mit Auswahl – mit und ohne frühere Entscheidungen', () => {
  const gesetzt = [...quelle.matchAll(/merke: '([a-z_]+)'/g)].map((m) => m[1]);
  const alle = Object.fromEntries(gesetzt.map((f) => [f, true]));
  for (const [id, teile] of Object.entries(BOEGEN)) for (const t of teile) for (const m of [{}, alle]) {
    const g = t.g(m);
    assert.ok(Array.isArray(g) && g.length >= 2, id + ' ' + t.titel);
    const w = g.find((z) => z && z.wahl);
    assert.ok(w && w.wahl.length >= 2, id + ' ' + t.titel + ': Auswahl');
    for (const o of w.wahl) assert.ok(o.t && Array.isArray(o.dann), id + ' ' + t.titel);
  }
});

test('Abgefragte Flags werden irgendwo gesetzt', () => {
  const gesetzt = new Set([...quelle.matchAll(/merke: '([a-z_]+)'/g)].map((m) => m[1]));
  const gefragt = [...quelle.matchAll(/hat\(m, ([^)]*)\)/g)].flatMap((m) => [...m[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]));
  assert.ok(gefragt.length >= 8);
  assert.deepEqual(gefragt.filter((f) => !gesetzt.has(f)), []);
});
