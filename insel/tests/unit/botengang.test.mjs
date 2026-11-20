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
  assert.deepEqual(freigeschaltet({ merke: {} }), ['k_start', 'r_schul', 'e_winken', 'e_jubeln', 'e_tanzen', 'e_zucken'], 'leerer Stand: nur das Start-Geschenk und die vier Start-Emotes');
  const voll = { jetonsGesamt: 500, merke: { gewunken: 6, hundBesuche: 5, jagd: { i: 6, fertig: true }, tore: 10, musikGewechselt: 3, skateRekord: 20, emoteArten: ['winken', 'jubeln', 'tanzen', 'daumen', 'herz'], ttSiege: 3, tanzRekord: 2500, kevinRekord: 1200, sticker: new Array(24).fill('x'), boten: { n: 8, best: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1 } }, skate5: 'SKATE', skate5Rekord: 30, fotoBingo: new Array(9).fill('x'), tanzRekord: 9000, tanzSterne: 3, kickerSiege: 1, kicker: 5, tanz: 2, dosenRekord: 6, elfmeterRekord: 5, volleyRekord: 12, renn_brett: 50, renn_trotti: 40, enten: 2, billardSiege: 1, kevinRekord: 1200, eisMeter: 700, eisSorten: [1, 2, 3, 4, 5, 6], schneemann: 1, laub: 12, wochenGesamt: 3, wochenVoll: 5, tierStreicheln: 20, lernen: 10, kickerBesiegt: [1, 2, 3], billardBesiegt: [1, 2, 3], hf: { fertig: [1, 2, 3, 4, 5, 6, 7] } }, herz: { a: 4, b: 5, c: 4, d: 4 } };
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

test('Spur: fünf Arten, jede mit Teil in der Garderobe', async () => {
  const { SPUR_ARTEN } = await import('../../src/lycee/spur.js');
  const { GARDEROBE } = await import('../../src/lycee/garderobe.js');
  assert.equal(SPUR_ARTEN.length, 5);
  for (const a of SPUR_ARTEN) assert.ok(GARDEROBE.some((g) => g.art === 'spur' && g.wert === a), 'Teil für ' + a);
});

test('Schneemann: Kugeln nur groß genug, oben höchstens 85 % der unteren, nach drei fertig', async () => {
  const { kugelPasst, STUFEN, SCHNEEFELD, BAUPLATZ } = await import('../../src/lycee/schneemann.js');
  assert.equal(kugelPasst([], 0.2).grund, 'klein');
  assert.deepEqual(kugelPasst([], 0.4), { ok: true, r: 0.4 });
  assert.ok(Math.abs(kugelPasst([0.4], 0.45).r - 0.34) < 1e-9, 'zu groß für oben → kleiner');
  assert.equal(kugelPasst([0.4, 0.3], 0.1).grund, 'klein');
  assert.equal(kugelPasst([0.4, 0.3, 0.2], 0.2).grund, 'fertig');
  assert.ok(STUFEN.every((s, i) => i === 0 || s.min < STUFEN[i - 1].min * 0.85 + 1e-9), 'jede Stufe erreichbar');
  assert.ok(BAUPLATZ.x > SCHNEEFELD.x0 && BAUPLATZ.x < SCHNEEFELD.x1 && BAUPLATZ.z > SCHNEEFELD.z0 && BAUPLATZ.z < SCHNEEFELD.z1);
});

test('Herausforderungen: Winter-Aufgaben nur in Kapitel 5–6, offene verfällt still danach', async () => {
  const { herausforderungPruefen } = await import('../../src/lycee/herausforderungen.js');
  assert.ok(!['h_schneemann', 'h_eis'].includes((herausforderungPruefen({}, 3, 1).neu || {}).id), 'Herbst: keine Winter-Aufgabe');
  assert.equal(herausforderungPruefen({}, 5, 1).neu.id, 'h_schneemann', 'Winter: Schneemann zuerst');
  const m = { hf: { aktiv: 'h_schneemann', fertig: [], schritt: 1 } };
  assert.equal(herausforderungPruefen(m, 6, 2), null, 'noch Winter: bleibt offen');
  const r = herausforderungPruefen(m, 7, 3); assert.ok(r && r.neu && r.neu.id !== 'h_schneemann' && r.neu.id !== 'h_eis', 'Frühling: nächste kommt');
  assert.ok(herausforderungPruefen({ schneemann: 1, hf: { aktiv: 'h_schneemann', fertig: [] } }, 5, 2).geschafft);
});

test('Laubhaufen: Blätter fliegen beim Hineinrennen, fallen zurück, Zähler über Rückruf', async () => {
  const THREE = await import('three');
  const { createLaubhaufen, LAUB_PLAETZE } = await import('../../src/lycee/laubhaufen.js');
  const scene = new THREE.Scene(), st = { pos: new THREE.Vector3(LAUB_PLAETZE[0][0], 0, LAUB_PLAETZE[0][1] - 2), tempo: 0, yaw: 0 };
  let n = 0; const l = createLaubhaufen({ scene, steuerung: st, onSprung: () => n++ });
  l.tick(1 / 60, false); assert.ok(!l.haufen[0].pts.visible, 'außerhalb vom Herbst unsichtbar');
  l.tick(1 / 60, true); assert.ok(l.haufen[0].pts.visible);
  st.tempo = 3; for (let i = 0; i < 60; i++) { st.pos.z += 3 / 60; l.tick(1 / 60, true); }
  assert.equal(n, 1, 'einmal gesprungen (gesperrt danach)');
  const hoch = Math.max(...Array.from(l.haufen[0].pos).filter((_, i) => i % 3 === 1)); assert.ok(hoch > 0.6, 'Blätter fliegen hoch: ' + hoch);
  st.tempo = 0; for (let i = 0; i < 60 * 14; i++) l.tick(1 / 60, true);
  assert.deepEqual(Array.from(l.haufen[0].pos), Array.from(l.haufen[0].heim), 'wieder zum Haufen zusammengeweht');
});

test('Pfützen: hindurchrennen spritzt einmal, langsam gehen nicht', async () => {
  const THREE = await import('three');
  const { createPfuetzen, PFUETZEN } = await import('../../src/lycee/pfuetzen.js');
  const [px, pz] = PFUETZEN[0];
  const st = { pos: new THREE.Vector3(px, 0, pz - 2), tempo: 0.8, yaw: 0 };
  let n = 0; const p = createPfuetzen({ scene: new THREE.Scene(), steuerung: st, onPlatsch: () => n++ });
  for (let i = 0; i < 120; i++) { st.pos.z += 0.8 / 60; p.tick(1 / 60, true); }
  assert.equal(n, 0, 'langsam: kein Platsch');
  st.pos.z = pz - 2; st.tempo = 4;
  for (let i = 0; i < 60; i++) { st.pos.z += 4 / 60; p.tick(1 / 60, true); }
  assert.equal(n, 1, 'gerannt: einmal Platsch');
  p.tick(1 / 60, false); assert.ok(!p.liste[0].m.visible, 'außerhalb der Zeit weg');
});

test('Pokale: zehn, leerer Stand keiner, voller Stand alle', async () => {
  const { POKALE, pokaleVon } = await import('../../src/lycee/pokale.js');
  assert.equal(POKALE.length, 10); assert.equal(new Set(POKALE.map((p) => p.id)).size, 10);
  assert.deepEqual(pokaleVon({ merke: {} }), []);
  const voll = { merke: { kickerBesiegt: [1, 2, 3], billardBesiegt: [1, 2, 3], kevinRekord: 600, tanzSterne: 3, dosenRekord: 6, elfmeterRekord: 5, skate5: 'SKATE', boten: { best: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1 } }, schneemann: 1, eisSorten: [1, 2, 3, 4, 5, 6] } };
  assert.equal(pokaleVon(voll).length, 10);
  for (const p of POKALE) assert.ok(p.wie.split(/\s+/).length <= 7, 'kurz: ' + p.wie);
});

test('Garderobe: Fortschritt beginnt bei 0, hat ein Ziel und ist für die meisten Teile da', async () => {
  const { GARDEROBE, fortschritt } = await import('../../src/lycee/garderobe.js');
  let mit = 0;
  for (const g of GARDEROBE) { const f = fortschritt(g.id, { merke: {} }); if (!f) continue; mit++; assert.equal(f[0], 0, g.id); assert.ok(f[1] > 0, g.id); }
  assert.ok(mit >= 60, 'Fortschritt für die meisten Teile: ' + mit);
  assert.deepEqual(fortschritt('e_daumen', { merke: { gewunken: 3 } }), [3, 5]);
  assert.deepEqual(fortschritt('e_daumen', { merke: { gewunken: 9 } }), [5, 5], 'nicht über das Ziel hinaus');
  assert.equal(fortschritt('t_igel', { merke: {} }), null, 'Einmal-Dinge ohne Balken');
});

test('Schnitzeljagd: sechs Stationen, kurze Rätsel, Fund nur am richtigen Ort, am Ende fertig', async () => {
  const { JAGD, jagdFund, FUND_R } = await import('../../src/lycee/schatzsuche.js');
  assert.equal(JAGD.length, 6);
  for (const st of JAGD) assert.ok(st.raetsel.split(/\s+/).length <= 12 && st.ort, st.ort);
  const j = { i: 0 };
  assert.equal(jagdFund(j, JAGD[1].x, JAGD[1].z), null, 'falsche Station zählt nicht');
  assert.equal(jagdFund(j, JAGD[0].x + FUND_R + 1, JAGD[0].z), null, 'zu weit weg');
  for (let k = 0; k < JAGD.length; k++) { const r = jagdFund(j, JAGD[k].x + 0.5, JAGD[k].z); assert.ok(r, 'Station ' + k); assert.equal(r.fertig, k === JAGD.length - 1); }
  assert.equal(j.fertig, true); assert.equal(jagdFund(j, JAGD[0].x, JAGD[0].z), null, 'nach dem Ende nichts mehr');
});

test('Garderobe: jedes Kopf-Teil, jeder Rucksack und jedes Haustier lässt sich bauen', async () => {
  const THREE = await import('three');
  const { GARDEROBE } = await import('../../src/lycee/garderobe.js');
  const { baueFrisur } = await import('../../src/lycee/frisur.js');
  const { baueRuecken, RUECKEN_ARTEN } = await import('../../src/lycee/ruecken.js');
  const { baueTier } = await import('../../src/lycee/haustier.js');
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true });
  for (const g of GARDEROBE.filter((x) => x.art === 'kopf')) assert.ok(baueFrisur({ hair: '#222', hairStyle: null, head: g.wert, headColor: g.farbe }, mat), 'Kopf ' + g.id);
  for (const g of GARDEROBE.filter((x) => x.art === 'ruecken')) { assert.ok(RUECKEN_ARTEN.includes(g.wert), g.id); const r = baueRuecken(g.wert, g.farbe, mat); let n = 0; r.traverse((o) => { if (o.isMesh) n++; }); assert.ok(n >= 3, 'Rücken ' + g.id); }
  for (const g of GARDEROBE.filter((x) => x.art === 'tier')) { const t = baueTier(g.wert, g.farbe); assert.ok(t.g.children.length >= 3 && t.kopf.children.length >= 2, 'Tier ' + g.id); }
});
