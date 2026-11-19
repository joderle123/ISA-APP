// Unit-Tests Annexe-Situationen (situationen.js, Node ohne Browser): wer wann sichtbar ist, Lehrpersonen-Schalter,
// Auslöse-Zonen, jede Szene läuft mit jeder Wahl ohne Fehler durch und setzt ihr Ergebnis, Rückblick im Journal.
// Aufruf: node --test tests/unit/situationen.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { SIT_LEUTE, SZENEN, SIT_ZONEN, sitSichtbar, sitRueckblick, sitSaetze, lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest, zurueckbringen } from '../../src/lycee/situationen.js';

const FN = { wald: lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest };

// Skript-API zum Testen: Wahlen nach Liste (danach immer 0), merkt alles mit
function api(wahlen = [], m = {}) {
  const log = [], w = [...wahlen];
  return {
    log, m,
    sag: async (wer, t) => { assert.ok(typeof t === 'string' && t.length, 'leerer Satz von ' + wer); log.push([wer, t]); },
    wahl: async (o) => { assert.ok(Array.isArray(o) && o.length >= 2 && o.length <= 4, 'Wahl mit ' + o.length + ' Optionen'); const k = w.length ? w.shift() : 0; return Math.min(k, o.length - 1); },
    blende: async () => {}, merke: (k, v = true) => { m[k] = v; }, mErg: m, nachricht: () => {}, teleport: () => {}, deko: () => {}, ton: () => {},
  };
}

test('Sprecher in den Szenen sind bekannt', async () => {
  const bekannt = new Set([...Object.keys(SIT_LEUTE), 'e', 'du', 'zu', 'kaya', 'mesenberg', 'lenning', 'fernand', 'noor', 'tiago']);
  for (const [id, fn] of Object.entries(FN)) for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) {
    const x = api([a, b, b, b]);
    const A = { ...x, m: () => x.mErg };
    await fn(A);
    for (const [wer] of x.log) assert.ok(bekannt.has(wer), id + ': unbekannter Sprecher ' + wer);
  }
});

test('jede Szene setzt ihr Ergebnis (alle ersten beiden Wahl-Ebenen)', async () => {
  for (const [id, fn] of Object.entries(FN)) for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) {
    const x = api([a, b, 0, 0]); const A = { ...x, m: () => x.mErg };
    await fn(A);
    assert.ok(x.mErg['sit_' + id], id + ' ohne Ergebnis bei Wahl ' + a + '/' + b);
  }
});

test('Zurückbringen markiert die Wiedergutmachung', async () => {
  const x = api(); await zurueckbringen({ ...x, m: () => x.mErg });
  assert.equal(x.mErg.zurueckgebracht, true);
});

test('Sichtbarkeit: Kapitel, Schalter, nach der Szene, Tante Lisette immer', () => {
  assert.equal(sitSichtbar('lisette', 1, {}, false, 0), true);
  assert.equal(sitSichtbar('dex', 3, {}, true, 0), false);
  assert.equal(sitSichtbar('dex', 4, {}, true, 0), true);
  assert.equal(sitSichtbar('dex', 4, {}, false, 0), false, 'Schalter aus: niemand da');
  assert.equal(sitSichtbar('mika', 4, { sit_wald: 'nein' }, true, 5), false, 'Mika ist nach der Szene weg');
  assert.equal(sitSichtbar('dex', 4, { sit_wald: 'nein' }, true, 6), true, 'Dex hängt weiter an der Lichtung ab');
  assert.equal(sitSichtbar('dex', 4, { sit_wald: 'nein', sitWeg: { wald: 6 } }, true, 6), false, 'gerade gegangen');
  assert.equal(sitSichtbar('rafa', 6, { sit_kiste: 'erklaert' }, true, 9), true);
  assert.equal(sitSichtbar('jules', 6, {}, true, 0), false);
  assert.equal(sitSichtbar('jules', 7, {}, true, 0), true);
  assert.equal(sitSichtbar('nieman', 7, {}, true, 0), false);
  assert.equal(sitSichtbar('mikaFest', 10, {}, true, 0, 'k10_morgen'), false, 'Sommerfest nur am Festtag');
  assert.equal(sitSichtbar('mikaFest', 10, {}, true, 0, 'k10_fest'), true);
});

test('Zonen: Szenen draußen haben einen Ort, Szenen im Schulhaus beginnen im Gespräch, öffnen nur einmal', () => {
  const ids = SIT_ZONEN.map((z) => z.id).sort();
  assert.deepEqual(ids, Object.keys(SZENEN).filter((k) => SZENEN[k].zone).sort());
  for (const nurReden of ['kiste', 'link', 'video']) assert.ok(!ids.includes(nurReden), nurReden + ' beginnt nur im Gespräch');
  for (const z of SIT_ZONEN) { assert.equal(z.offen({}), true); assert.equal(z.offen({ ['sit_' + z.id]: 'x' }), false); }
  for (const [id, s] of Object.entries(SZENEN)) { assert.ok(s.ab >= 4 && s.ab <= 10, id); assert.equal(s.titel.length, 3); const t = Array.isArray(s.teaser[0]) ? s.teaser : [s.teaser]; for (const x of t) assert.ok(x.length === 2 && x[1].length > 5, id + ' ohne Handy-Nachricht'); }
});

test('Rückblick im Journal: neutral, je Szene eine Zeile, Wiedergutmachung sichtbar', () => {
  assert.deepEqual(sitRueckblick({}), []);
  const r = sitRueckblick({ sit_laden: 'geklaut', zurueckgebracht: true, sit_halle: 'gefilmt', halleGeloescht: true });
  assert.equal(r.length, 2);
  assert.match(r.find((x) => /Mutprobe/.test(x.t)).w, /zurückgebracht/);
  assert.match(r.find((x) => /Kreis/.test(x.t)).w, /gelöscht/);
});

test('kurze Sätze für spätere Besuche gibt es für alle, die bleiben', () => {
  for (const [id, p] of Object.entries(SIT_LEUTE)) if (p.bleibt || p.immer || p.stumm) assert.ok(sitSaetze(id, {}).length >= 1, id);
});
