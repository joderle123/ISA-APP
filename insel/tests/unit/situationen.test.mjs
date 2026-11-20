// Unit-Tests Annexe-Situationen (situationen.js, Node ohne Browser): wer wann sichtbar ist, Lehrpersonen-Schalter,
// Auslöse-Zonen, jede Szene läuft mit jeder Wahl ohne Fehler durch und setzt ihr Ergebnis, Rückblick im Journal.
// Aufruf: node --test tests/unit/situationen.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { SIT_LEUTE, SZENEN, SIT_ZONEN, sitSichtbar, sitOffen, sitRueckblick, sitSaetze, lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest, spiel, dach, fundkiste, zurueckbringen, SIT_ANTWORTEN, sitAntwortenOffen, zaun, roller, witz } from '../../src/lycee/situationen.js';

const FN = { wald: lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest, spiel, dach, fundkiste, zaun, roller, witz };

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
  const bekannt = new Set([...Object.keys(SIT_LEUTE), 'e', 'du', 'zu', 'kaya', 'mesenberg', 'lenning', 'fernand', 'noor', 'tiago', 'leo', 'hoffmann', 'rosa', 'paulo']);
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
  for (const nurReden of ['kiste', 'link', 'video', 'fundkiste']) assert.ok(!ids.includes(nurReden), nurReden + ' beginnt nur im Gespräch');
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

test('Stammgäste behalten ihre alten Reaktionen neben den neuen (kein doppelter Schlüssel)', async () => {
  const { STAMM } = await import('../../src/lycee/stammgaeste.js');
  const keys = (id, m) => (STAMM.find((s) => s.id === id).reaktion(m) || []).filter(Boolean).map((r) => r.key);
  assert.ok(keys('noor', { bandMal: 1 }).includes('stx_noor_band'));
  assert.ok(keys('noor', { graffitiGesagt: true }).includes('stx_noor_wand1'));
  assert.ok(keys('tiago', { roboter: true }).includes('stx_tiago_rob'));
  assert.ok(keys('tiago', { sit_kiste: 'erklaert' }).includes('stx_tiago_kiste'));
  assert.ok(keys('fernand', { huetchen: 2 }).includes('stx_fernand_h2'));
  assert.ok(keys('fernand', { sit_wald: 'nein' }).includes('stx_fernand_wald'));
});

test('Zeitfenster: verpasste Situationen sind vorbei, die Clique an der Lichtung bleibt', () => {
  assert.equal(sitSichtbar('jules', 8, {}, true, 0), false, 'Streit nur in Kapitel 7');
  assert.equal(sitOffen('halle', 8, {}), false);
  assert.equal(sitOffen('halle', 7, {}), true);
  assert.equal(sitOffen('wald', 5, {}), true);
  assert.equal(sitOffen('wald', 5, { sit_wald: 'nein' }), false);
  assert.equal(sitSichtbar('mika', 7, {}, true, 0), false, 'Mika ist nach dem Fenster nicht mehr an der Lichtung');
  assert.equal(sitSichtbar('dex', 9, {}, true, 0), true, 'Dex hängt weiter ab');
  assert.equal(sitSichtbar('rafa', 9, {}, true, 0), false, 'Rafa ohne Szene nach dem Fenster weg');
  assert.equal(sitSichtbar('rafa', 9, { sit_kiste: 'gefragt' }, true, 0), true, 'nach der Szene bleibt Rafa');
  for (const [id, sz] of Object.entries(SZENEN)) { assert.ok(sz.bis >= sz.ab && sz.bis <= 10, id); assert.ok(sz.frage && sz.frage.endsWith('?'), id + ' ohne Reflexionsfrage'); }
});

test('Uhrzeit-Fenster: Die Fundkiste gibt es nur mittags, Jeff tritt nur in der Szene auf', () => {
  assert.equal(sitOffen('fundkiste', 7, {}, 'x', 8.0), false);
  assert.equal(sitOffen('fundkiste', 7, {}, 'x', 12.4), true);
  assert.equal(sitSichtbar('tom', 7, {}, true, 0, 'x', 12.4), true);
  assert.equal(sitSichtbar('tom', 7, {}, true, 0, 'x', 9.9), false);
  assert.equal(sitSichtbar('jeffSit', 7, {}, true, 0, 'x', 12.4), false);
});

test('Sicherheit: Hilfe ist in den schweren Ausgängen da, keine falschen Versprechen', async () => {
  const lauf = async (fn, wahlen, m = {}) => { const x = api(wahlen, m); await fn({ ...x, m: () => x.mErg }); return { text: x.log.map(([, t]) => t).join(' '), m: x.mErg }; };
  // Sommerfest: Wer Mika findet, erlebt den 112-Anruf – auch, wer selbst getrunken hat
  for (const w of [[1, 0], [1, 1], [3, 0], [2]]) assert.match((await lauf(fest, w)).text, /112/, 'Fest ohne 112 bei Wahl ' + w);
  // Wald: Auch nach „Selbst schuld“ kann man umdrehen und Hilfe holen
  const r = await lauf(lichtung, [0, 0, 2, 0]);
  assert.equal(r.m.mikaGeholfen, true); assert.equal(r.m.kuedesWald, true);
  // 116 111 ist nicht rund um die Uhr erreichbar
  for (const [id, fn] of Object.entries(FN)) for (let a = 0; a < 4; a++) assert.doesNotMatch((await lauf(fn, [a, 0, 0, 0])).text, /rund um die Uhr/i, id);
  // Fake-Link: Adresse, die es nicht geben kann
  assert.doesNotMatch(JSON.stringify(SZENEN.link.teaser), /\.win\b/);
  // Fundkiste: Jeff bekommt die Powerbank nur zurück, wenn jemand sie zurückgeholt hat
  assert.match((await lauf(fundkiste, [2, 0])).text, /zurückgeholt/);
});

test('Später antworten (Handy): passende Wiedergutmachung, nur einmal, kurze Sätze', () => {
  assert.deepEqual(sitAntwortenOffen({}), [], 'ohne schweren Ausgang nichts zu schreiben');
  const m = { mikaAllein: true, sit_halle: 'gefilmt', sit_fundkiste: 'weg' };
  assert.deepEqual(sitAntwortenOffen(m).map((x) => x.id), ['mika', 'sami', 'jeff']);
  assert.deepEqual(sitAntwortenOffen({ ...m, halleGeloescht: true, antwort_mika: true }).map((x) => x.id), ['jeff'], 'erledigt ist erledigt');
  const ids = new Set();
  for (const a of SIT_ANTWORTEN) {
    assert.ok(!ids.has(a.id), 'doppelt: ' + a.id); ids.add(a.id);
    for (const t of [a.text, a.antwort]) assert.ok(t.split(/\s+/).length <= 12, a.id + ': zu lang: ' + t);
    assert.ok(Array.isArray(a.setzt) && a.setzt.length, a.id + ' setzt nichts');
  }
});

test('Dex’ Weg: Wer ihn zu Mme Kiesser schickt, findet ihn später im Neubau statt an der Lichtung', () => {
  const m = { sit_graffiti: 'kiesser', sitKap_graffiti: 6 };
  assert.equal(sitSichtbar('dexKunst', 6, m, true, 0), false, 'erst ab dem nächsten Kapitel');
  assert.equal(sitSichtbar('dexKunst', 7, m, true, 0), true);
  assert.equal(sitSichtbar('dex', 7, m, true, 0), false, 'nicht mehr an der Lichtung');
  assert.equal(sitSichtbar('dex', 7, { sit_graffiti: 'gespruht', sitKap_graffiti: 6 }, true, 0), true);
  assert.equal(sitSichtbar('dexKunst', 7, { sit_graffiti: 'papier', sitKap_graffiti: 6 }, true, 0), false);
  assert.ok(SIT_LEUTE.dexKunst.aussehen && SIT_LEUTE.dexKunst.aussehen === SIT_LEUTE.dex.aussehen);
});

test('Szenen greifen ineinander: Wer mit Mika Nein-Sagen geübt hat (Roller), erlebt Mikas Nein an der Lichtung', async () => {
  const x = api([1, 0]); await roller({ ...x, m: () => x.mErg });
  assert.equal(x.mErg.mikaNein, true);
  const y = api([0, 0], { mikaNein: true }); await lichtung({ ...y, m: () => y.mErg });
  assert.equal(y.mErg.mikaNeinWald, true); assert.ok(!y.mErg.mikaGeholfen, 'keine Panik, keine Hilfe nötig');
  assert.ok(y.log.some(([w, t]) => w === 'mika' && /Nein/.test(t)));
  assert.match(sitRueckblick(y.mErg).find((r) => /Lichtung/.test(r.t)).w, /Mika hat Nein gesagt/);
});

test('Gefühl danach steht im Rückblick', () => {
  const r = sitRueckblick({ sit_wald: 'nein', gefuehl_wald: 'gemischt' });
  assert.match(r[0].w, /Gefühl danach: gemischt\./);
});

test('Der Witz: Akzent wird erzählt, nicht vorgespielt; Paulos Wörter nur, wenn wirklich gelernt', async () => {
  const quelle = (await import('node:fs')).readFileSync(new URL('../../src/lycee/situationen.js', import.meta.url), 'utf8');
  assert.doesNotMatch(quelle, /Tomatsch|Kartoffelsch/);
  const lauf = async (wahlen, m) => { const x = api(wahlen, m); await witz({ ...x, m: () => x.mErg, wahl: async (o) => { x.opts = (x.opts || []).concat([o]); return x.wahl(o); } }); return x; };
  const ohne = await lauf([0, 0], { stb_paulo_2: true, stb_paulo_3: true, stb_paulo_4: true, stb_paulo_5: true, stb_paulo_7: true, stb_paulo_8: true });
  assert.ok(!ohne.opts.flat().some((t) => /Desculpa/.test(t)), 'Desculpa ohne Woche 6');
  const mit = await lauf([0, 0], { stb_paulo_6: true });
  assert.ok(mit.opts.flat().some((t) => /Desculpa/.test(t)));
  assert.equal(mit.mErg.pauloDesculpa, true);
});

test('SePAS: Herr Kuedes hat zu jeder Situation einen kurzen Satz, Themen nur nach dem Erleben', async () => {
  const { SEPAS_NACH, sepasThemen } = await import('../../src/lycee/situationen.js');
  for (const id of Object.keys(SZENEN)) { assert.ok(SEPAS_NACH[id], 'kein Satz zu ' + id); assert.ok(SEPAS_NACH[id].split(/\s+/).length <= 12, id); }
  assert.deepEqual(sepasThemen({}), []);
  assert.deepEqual(sepasThemen({ sit_wald: 'nein', sit_laden: 'bezahlt', sit_halle: 'sami' }).length, 2);
  assert.deepEqual(sepasThemen({ sit_wald: 'nein', sepas_wald: true }), []);
  assert.match(sitRueckblick({ sit_wald: 'nein', sepas_wald: true })[0].w, /Herrn Kuedes darüber geredet/);
});
