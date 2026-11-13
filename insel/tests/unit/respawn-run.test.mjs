// RESPAWN – Spiellogik und Inhalte (reine Node-Tests): Regeln, Schreibregeln, keine Sackgassen, jeder Ausgang erreichbar.
import { test } from 'node:test';
import { angebote, nimmAn, aktuell, weiter, schliesse, sterneFuer, sterneLauf, sterneSammeln, sterneTreffer, zeitFuerStrecke } from '../../src/respawn/missionen.js';
import assert from 'node:assert/strict';
import { neuerLauf, wirke, wahlen, zeitFuer, ohneWahl, planeJahreszeit, jahreszeitWechsel, ausgangFuer, akteFuer, verschlaeft, hatKarte, verteile, folgenAmMorgen, neuerTag, JAHRESZEITEN } from '../../src/respawn/run.js';
import { SITUATIONEN, AUSGAENGE, AKTE, KARTEN, FIGUREN, STIMMEN, ORTE, ORT_BEI, ORT_AKTIONEN, LEUTE_AKTIONEN, LEUTE_REIHE, FOLGEN, VERPASST, WICHTIG, statistSagt, TRATSCH_ZEILEN, ideenFuerHeute, IDEEN_ZEILEN, kapitelAuftakt, KAPITEL_ZEILEN, MISSIONEN, THEMEN, MISSION_WEG, wegVon } from '../../src/respawn/daten/index.js';

const K = (kopf = 'zuendschnur', zuhause = 'oma', tasche = 'ok') => ({ kopf, zuhause, tasche });
const woerter = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;
const alleKarten = () => { const l = []; for (const a of KARTEN.kopf) for (const b of KARTEN.zuhause) for (const c of KARTEN.tasche) l.push({ kopf: a.id, zuhause: b.id, tasche: c.id }); return l; };

test('Start: Geld und Druck nach Karten', () => {
  assert.equal(neuerLauf({ karten: K('voll', 'oma', 'leer') }).geld, 5);
  assert.equal(neuerLauf({ karten: K('voll', 'oma', 'ok') }).geld, 40);
  assert.equal(neuerLauf({ karten: K('voll', 'allein', 'ok') }).druck, 25);
});
test('Kurze Zündschnur: Reiz lädt schneller, ruhige Wahl früher gesperrt – und eigene Mut-Wahl', () => {
  const a = neuerLauf({ karten: K('zuendschnur') }), b = neuerLauf({ karten: K('voll') });
  wirke(a, { druck: 20 }, { reiz: true }); wirke(b, { druck: 20 }, { reiz: true });
  assert.equal(a.druck, 50); assert.equal(b.druck, 40);
  a.druck = 62; b.druck = 62;
  const l = [{ t: 'Reden', art: 'ruhig' }, { t: 'Gehen', art: 'weg' }, { t: 'Dazwischen', art: 'mut', nur: 'zuendschnur' }];
  assert.equal(wahlen(a, l)[0].gesperrt, 'druck'); assert.equal(wahlen(b, l)[0].gesperrt, null);
  assert.equal(wahlen(a, l).length, 3); assert.equal(wahlen(b, l).length, 2);
});
test('Kann nicht Nein sagen / Trau keinem: Sperren und Stärken', () => {
  const n = neuerLauf({ karten: K('nein') }); n.druck = 40;
  assert.equal(wahlen(n, [{ t: 'Nein', art: 'nein' }, { t: 'Okay', art: 'weg' }])[0].gesperrt, 'nein');
  assert.equal(wirke(n, { bond: { tun: 1 } }).bond.tun, 2);
  const t = neuerLauf({ karten: K('trau') });
  assert.equal(wahlen(t, [{ t: 'Ilda holen', art: 'hilfe', wer: 'ilda' }, { t: 'Gehen', art: 'weg' }])[0].gesperrt, 'trau');
  wirke(t, { bond: { ilda: 2 } });
  assert.equal(wahlen(t, [{ t: 'Ilda holen', art: 'hilfe', wer: 'ilda' }])[0].gesperrt, null);
});
test('Uhr: mehr Druck = weniger Zeit; läuft sie ab, gewinnt bei rotem Druck die harte Wahl', () => {
  const r = neuerLauf({ karten: K('trau') });
  assert.equal(zeitFuer(r), 0); r.druck = 50; assert.equal(zeitFuer(r), 14); r.druck = 80; assert.equal(zeitFuer(r), 8);
  const v = neuerLauf({ karten: K('voll') }); assert.ok(zeitFuer(v) > 0 && zeitFuer(v) < 14);
  const s = wahlen(r, [{ t: 'Reden', art: 'ruhig' }, { t: 'Gehen', art: 'weg' }, { t: 'Schlagen', art: 'hart' }]);
  assert.equal(s[ohneWahl(r, s)].art, 'hart'); r.druck = 50; assert.equal(s[ohneWahl(r, wahlen(r, s))].art, 'weg');
});
test('Nie eine Sackgasse: sind alle Wahlen gesperrt, wird eine frei', () => {
  const r = neuerLauf({ karten: K('zuendschnur') }); r.druck = 95;
  const s = wahlen(r, [{ t: 'Reden', art: 'ruhig' }, { t: 'Nein', art: 'nein' }]);
  assert.ok(s.some((w) => !w.gesperrt));
});

// ---- Inhalte ----
function durchlaufe(schritte, R, f, tiefe = 0) {
  for (const s of schritte || []) {
    f(s, tiefe);
    if (s[0] === 'w') for (const w of s[1]) durchlaufe(w.dann, R, f, tiefe + 1);
    if (s[0] === 'wenn') { durchlaufe(s[2], R, f, tiefe); durchlaufe(s[3], R, f, tiefe); }
    if (s[0] === 'spiel') for (const treffer of [0, 1, 2, 3]) durchlaufe(s[2]({ treffer, von: 3 }, R), R, f, tiefe);   // Geschick: alle Ausgänge prüfen
    if (s[0] === 'atem') for (const gut of [0, 1, 2, 3]) durchlaufe(s[2]({ gut }, R), R, f, tiefe);   // Durchatmen: alle Ausgänge prüfen
    if (s[0] === 'merk') for (const richtig of [0, 1, 2, 3]) durchlaufe(s[2]({ richtig, von: 3 }, R), R, f, tiefe);   // Merken: alle Ausgänge prüfen
    if (s[0] === 'zuck') for (const richtig of [0, 3, 5, 7]) durchlaufe(s[2]({ richtig, von: 7 }, R), R, f, tiefe);   // Nicht zucken: alle Ausgänge prüfen
  }
}
test('Schreibregeln: Blase ≤ 12 Wörter, Wahl ≤ 6 Wörter, bekannte Figuren, bekannte Akten-Einträge', () => {
  const fehler = [];
  const bekannt = new Set(['ilda', 'jolie', 'tun', 'mika', 'pit', 'fraenz', 'noor', 'luc', 'yara', 'maelle', 'tiago', 'lucinda', ...Object.keys(FIGUREN), ...Object.keys(STIMMEN)]);
  for (const karten of alleKarten()) for (const sanft of [false, true]) {
    const R = neuerLauf({ karten }); R.sanft = sanft; R.flags['nachricht.an'] = 'maelle';
    for (const sit of SITUATIONEN) {
      const steps = typeof sit.szene === 'function' ? sit.szene(R) : sit.szene;
      durchlaufe(steps, R, (s) => {
        const text = s[0] === 't' || s[0] === 'd' ? s[1] : (s[0] === 's' || s[0] === 'k') ? s[2] : null;
        if (text && woerter(typeof text === 'function' ? text(R) : text) > 12) fehler.push(`${sit.id}: zu lang „${text}“`);
        if (s[0] === 's') { const w = typeof s[1] === 'function' ? s[1](R) : s[1]; if (!bekannt.has(w)) fehler.push(`${sit.id}: unbekannte Figur ${w}`); }
        if (s[0] === 'k' && !KARTEN.kopf.some((k) => k.id === s[1])) fehler.push(`${sit.id}: unbekannte Karte ${s[1]}`);
        if (s[0] === 'e' && s[1].akte && !AKTE[s[1].akte]) fehler.push(`${sit.id}: Akte ${s[1].akte} fehlt`);
        if (s[0] === 'w') {
          for (const w of s[1]) {
            if (woerter(w.t) > 6) fehler.push(`${sit.id}: Wahl zu lang „${w.t}“`);
            if (!['ruhig', 'nein', 'hilfe', 'hart', 'weg', 'mut'].includes(w.art)) fehler.push(`${sit.id}: Art ${w.art}`);
            if (w.e && w.e.akte && !AKTE[w.e.akte]) fehler.push(`${sit.id}: Akte ${w.e.akte} fehlt`);
          }
          // In jeder Lage muss mindestens eine Wahl bleiben, die nie gesperrt wird (weg/hart ohne Kosten)
          const frei = s[1].filter((w) => (!w.nur || hatKarte(R, w.nur)) && (!w.wenn || w.wenn(R)) && ['weg', 'hart', 'mut'].includes(w.art) && !w.kostet);
          const ohneBedingung = s[1].filter((w) => !w.nur && !w.kostet && ['weg', 'hart'].includes(w.art));
          if (!frei.length && !ohneBedingung.length && !(s[2] && s[2].ruhe)) fehler.push(`${sit.id}: Wahl ohne sichere Möglichkeit („${s[1].map((w) => w.t).join(' / ')}“)`);
        }
      });
    }
  }
  assert.deepEqual([...new Set(fehler)], []);
});
test('Plan: jede Jahreszeit hat Situationen, das Jahr beginnt mit „ankunft“ und endet mit „finale“', () => {
  for (let seed = 1; seed <= 40; seed++) {
    let a = seed; const rng = () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff; };
    const R = neuerLauf({ seed, karten: alleKarten()[seed % 24] });
    const alle = [];
    for (let jz = 0; jz < 4; jz++) { R.jz = jz; const p = planeJahreszeit(R, SITUATIONEN, rng); assert.ok(p.length >= 2, JAHRESZEITEN[jz]); assert.equal(verteile(p, SITUATIONEN).flat().length, p.length); R.gespielt.push(...p); alle.push(...p); jahreszeitWechsel(R); }
    assert.equal(alle[0], 'ankunft'); assert.equal(alle[alle.length - 1], 'finale');
    assert.equal(new Set(alle).size, alle.length);
    assert.ok(alle.length >= 11 && alle.length <= 14, String(alle.length));   // seit 13.11.2026: dichteres Jahr (13 Situationen)
  }
});
test('Tage: Situationen einer Jahreszeit verteilen sich auf drei Tage, Ankunft am ersten, Gespräch am letzten', () => {
  const tage = verteile(['ankunft', 'video'], SITUATIONEN);
  assert.deepEqual(tage[0], ['ankunft']); assert.equal(tage.flat().length, 2);
  const w = verteile(['kontrolle', 'luege', 'gespraech'], SITUATIONEN);
  assert.deepEqual(w[2], ['gespraech']); assert.equal(w.flat().length, 3);
});
test('Offene Welt: Texte kurz, Aktionen vollständig, Akten-Einträge vorhanden', () => {
  const fehler = [];
  const pruefe = (wo, steps) => durchlaufe(steps, null, (s) => {
    const text = s[0] === 't' || s[0] === 'd' ? s[1] : (s[0] === 's' || s[0] === 'k') ? s[2] : null;
    if (text && woerter(text) > 12) fehler.push(`${wo}: zu lang „${text}“`);
    if (s[0] === 'w') for (const x of s[1]) { if (woerter(x.t) > 6) fehler.push(`${wo}: Wahl zu lang „${x.t}“`); if (x.e && x.e.akte && !AKTE[x.e.akte]) fehler.push(`${wo}: Akte ${x.e.akte}`); }
    if (s[0] === 'e' && s[1].akte && !AKTE[s[1].akte]) fehler.push(`${wo}: Akte ${s[1].akte}`);
  });
  for (const o of ORTE) for (const a of o.aktionen) assert.ok(ORT_AKTIONEN[a], a);
  for (const id of LEUTE_REIHE) assert.ok(LEUTE_AKTIONEN[id], id);
  for (const zeugen of [[], ['jolie', 'pit']]) for (const karten of alleKarten().slice(0, 6)) {
    const R = neuerLauf({ karten }); R.bond.jolie = 2; R.bond.pit = -1;
    for (const [id, a] of Object.entries(ORT_AKTIONEN)) { assert.ok(woerter(a.t) <= 6, id); pruefe('ort ' + id, a.szene(R, { zeugen })); }
    for (const [id, a] of Object.entries(LEUTE_AKTIONEN)) { assert.ok(woerter(a.t) <= 6, id); for (const wer of WICHTIG) if (!a.wenn || a.wenn(R, wer) || id === 'zurueck' || id === 'entschuldigen') pruefe(`leute ${id}/${wer}`, a.szene(R, { wer, zeugen })); }
  }
  for (const f of FOLGEN) { for (const z of f.text) if (woerter(z) > 12) fehler.push(`folge ${f.id}: „${z}“`); }
  for (const [id, v] of Object.entries(VERPASST)) { assert.ok(SITUATIONEN.find((s) => s.id === id), id); if (woerter(v.text) > 12) fehler.push(`verpasst ${id}`); if (v.e.akte) assert.ok(AKTE[v.e.akte], v.e.akte); }
  assert.deepEqual([...new Set(fehler)], []);
});
test('Folgen kommen am nächsten Morgen, jede nur einmal: Kasse ohne Zeuge trifft später Pit', () => {
  const R = neuerLauf({ karten: K() });
  wirke(R, { geld: 20, flags: { 'kasse.geklaut': true, 'kasse.tag': 0, 'kasse.zeuge': '' } });
  assert.equal(folgenAmMorgen(R, FOLGEN).length, 0);                 // derselbe Tag: noch nichts
  R.tag = 1; neuerTag(R);
  let f = folgenAmMorgen(R, FOLGEN).map((x) => x.id);
  assert.deepEqual(f, ['kasse.fraenz']); assert.ok(R.flags['job.weg']); assert.ok(R.akte.includes('kasse')); assert.ok(R.bond.fraenz < 0);
  assert.equal(folgenAmMorgen(R, FOLGEN).length, 0);                 // nicht doppelt
  R.tag = 2;
  f = folgenAmMorgen(R, FOLGEN).map((x) => x.id);
  assert.deepEqual(f, ['kasse.pit']); assert.ok(R.chats.some((c) => c.von === 'pit'));
  // Spott: zweimal Pit → er kommt nicht mehr, Jolie wendet sich ab
  const S = neuerLauf({ karten: K() });
  wirke(S, { flags: { 'spott.pit': 2, 'spott.tag.pit': 0 } }); S.tag = 1;
  assert.ok(folgenAmMorgen(S, FOLGEN).some((x) => x.id === 'spott.pit')); assert.ok(S.flags['pit.weg'] && S.flags['meidet.pit']); assert.ok(S.bond.jolie < 0);
});
test('Ausgänge: jeder ist erreichbar, der letzte fängt alles auf; Akte hat beide Seiten', () => {
  const mit = (f) => { const R = neuerLauf({ karten: K() }); f(R); return ausgangFuer(R, AUSGAENGE).id; };
  assert.equal(mit((R) => { R.flags.schlag = true; R.flags['mitfahren.erwischt'] = true; }), 'geflogen');
  assert.equal(mit((R) => { R.ruf.krater = 4; R.flags.tasche = true; }), 'krater');
  assert.equal(mit((R) => { R.flags['prakt.gut'] = true; R.flags.job = true; R.bond.fraenz = 3; }), 'werft');
  assert.equal(mit((R) => { R.flags['video.geloescht'] = R.flags['neue.geschuetzt'] = R.flags['fest.geblieben'] = true; }), 'dazwischen');
  assert.equal(mit((R) => { R.bond.jolie = 3; R.bond.tun = 3; }), 'leute');
  assert.equal(mit((R) => { R.druck = 80; }), 'abgehauen');
  assert.equal(mit((R) => { R.flags['video.geteilt'] = true; R.flags['gespraech.eigen'] = true; R.bond.ilda = 1; R.akte.push('gespraech.eigen'); }), 'zweite');
  assert.equal(mit((R) => { R.geld = 120; R.bond.fraenz = 1; R.akte.push('kontrolle.ohne'); }), 'kiosk');
  assert.equal(mit(() => {}), 'unsichtbar');
  assert.equal(mit((R) => { R.bond.ilda = 1; }), 'offen');
  assert.equal(mit((R) => { R.bond.pit = -2; R.bond.jolie = -3; R.bond.tun = -2; }), 'allein');
  // freies Spiel: ein anderer steht für den eigenen Mist gerade → „Davongekommen“; wer es zugibt, bekommt die zweite Chance
  assert.equal(mit((R) => { R.flags.spray = true; R.flags['spray.tunschuld'] = true; R.bond.ilda = 1; }), 'davongekommen');
  assert.equal(mit((R) => { R.flags['kasse.geklaut'] = true; R.flags['gestanden.kasse'] = true; R.bond.ilda = 1; R.akte.push('gestanden'); }), 'zweite');
  // Bühne: zweimal getraut und Maëlle an der Seite → eigener Ausgang; Feuer an der Hütte ohne Zeuge trifft die Crew
  assert.equal(mit((R) => { R.flags['buehne.n'] = 2; R.bond.maelle = 2; }), 'stimme');
  assert.equal(mit((R) => { R.flags['feuer.nah'] = true; R.flags['feuer.mikaschuld'] = true; R.bond.ilda = 1; }), 'davongekommen');
  assert.equal(mit((R) => { R.flags['feuer.nah'] = true; R.flags['gestanden.feuer'] = true; R.bond.ilda = 1; R.akte.push('gestanden'); }), 'zweite');
  assert.equal(new Set(AUSGAENGE.map((a) => a.id)).size, 13);
  const R = neuerLauf({ karten: K() }); R.akte.push('schlag', 'luege.gedeckt'); R.flags['luege.gestanden'] = true;
  const z = akteFuer(R, AKTE); assert.equal(z.length, 2); assert.match(z[1].echt, /zugegeben/);
  for (const [id, e] of Object.entries(AKTE)) { assert.ok(e.amt && e.echt, id); assert.ok(woerter(e.amt) <= 12, id); }
});
test('Verschlafen: „Viel allein“ schon nach einer langen Nacht', () => {
  const a = neuerLauf({ karten: K('voll', 'allein') }), o = neuerLauf({ karten: K('voll', 'oma') });
  a.spaet = 1; o.spaet = 1; assert.equal(verschlaeft(a), true); assert.equal(verschlaeft(o), false);
});

// Häuser der neuen Stadt versperren der Kamera die Sicht: Rechtecke mit sicht: true zählen in segmentHit
test('Kamera: Rechtecke mit „sicht“ halten die Sichtlinie auf, andere nicht', async () => {
  const { createColliders } = await import('../../src/world/colliders.js');
  const c = createColliders();
  c.addBox(10, 0, 2, 3, 0, { tag: 'haus', sicht: true, yMax: 6 });
  c.addBox(-10, 0, 2, 3, 0, { tag: 'zaun' });
  const t = c.segmentHit(0, 0, 20, 0, 0.3, 1.5, 3);
  assert.ok(Math.abs(t - (10 - 2 - 0.3) / 20) < 1e-6, 'trifft die Hauswand vorn: ' + t);
  assert.equal(c.segmentHit(0, 0, -20, 0, 0.3, 1.5, 3), 1, 'ein Rechteck ohne sicht hält nichts auf');
  assert.equal(c.segmentHit(0, 0, 20, 0, 0.3, 8, 9), 1, 'über dem Dach ist frei');
  assert.equal(c.segmentHit(0, 8, 20, 8, 0.3, 1.5, 3), 1, 'am Haus vorbei ist frei');
  // gedreht um 90°: Tiefe (3) liegt jetzt in x-Richtung
  const d = createColliders(); d.addBox(10, 0, 2, 3, Math.PI / 2, { sicht: true });
  const t2 = d.segmentHit(0, 0, 20, 0, 0, 0, 0);
  assert.ok(Math.abs(t2 - (10 - 3) / 20) < 1e-6, 'gedrehtes Haus: ' + t2);
  // ein Filter (wie in der Kamera) lässt sicht-Rechtecke durch
  assert.ok(c.segmentHit(0, 0, 20, 0, 0.3, 1.5, 3, (o) => o.sicht || o.tag === 'pine') < 1);
});

test('Statisten: kurze Sätze; was man angestellt hat, spricht sich herum', () => {
  for (const z of TRATSCH_ZEILEN) assert.ok(z.trim().split(/\s+/).length <= 12, z);
  const R = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } });
  const ohne = new Set(['a', 'bb', 'ccc', 'dddd'].map((w) => statistSagt(R, w)));
  assert.ok([...ohne].every((z) => !/Strandhütte|Werft|Bühne/.test(z)), 'ohne Vorfall nur Grüße');
  R.flags['feuer.nah'] = true; R.flags['feuer.tag'] = -1;
  const mit = ['a', 'bb', 'ccc', 'dddd', 'eeeee'].map((w) => statistSagt(R, w));
  assert.ok(mit.some((z) => /Strandhütte/.test(z)), 'nach dem Feuer redet jemand über die Hütte');
});

test('Fahren üben: erst nach dem Zugeben (oder mit gutem Draht zu Fränz), einmal am Tag; Sätze kurz', () => {
  const a = ORT_AKTIONEN.ueben, R = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } });
  assert.equal(a.wenn(R), false, 'ohne Draht zu Fränz kein Üben');
  R.flags['auto.genommen'] = true; assert.equal(a.wenn(R), false, 'wer den Wagen genommen hat, muss es erst zugeben');
  R.flags['gestanden.auto'] = true; assert.equal(a.wenn(R), true);
  for (const erg of [{ wasser: true }, { beulen: 1, strecke: 10 }, { strecke: 80, beulen: 0 }, { strecke: 5, beulen: 0 }]) for (const s of a.nach(R, erg)) if (s[0] === 's') assert.ok(s[2].trim().split(/\s+/).length <= 12, s[2]);
  const R2 = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } }); R2.bond.fraenz = 3; assert.equal(a.wenn(R2), true, 'guter Draht reicht auch');
});

test('Rennen gegen Pit: Ziel und Zeit stehen fest, beide Ausgänge haben kurze Sätze, einmal am Tag', () => {
  const a = ORT_AKTIONEN.rennen, R = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } });
  assert.ok(a.lauf && a.lauf.sekunden >= 20 && Number.isFinite(a.lauf.ziel.x) && Number.isFinite(a.lauf.ziel.z));
  assert.equal(a.wenn(R), true);
  const schritte = a.szene(R); const e = schritte.find((s) => s[0] === 'e')[1];
  assert.equal(e.flags['lauf.jetzt'], true);
  wirke(R, e); assert.equal(a.wenn(R), false, 'heute schon gerannt');
  for (const erg of [{ geschafft: true, zeit: 12 }, { geschafft: true, zeit: 22 }, { geschafft: false, zeit: 26 }]) for (const s of a.nach(R, erg)) if (s[0] === 's') assert.ok(s[2].trim().split(/\s+/).length <= 12, s[2]);
  R.flags['pit.weg'] = true; R.flags['rennen.tag'] = -5; assert.equal(a.wenn(R), false, 'ohne Pit kein Rennen');
});

test('Zuhören: nach den Pommes fragt die Person einmal nach – richtig gemerkt gibt Nähe, falsch kostet nichts', () => {
  const R = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } });
  const reden = (wer) => LEUTE_AKTIONEN.reden.szene(R, { wer });
  assert.ok(!reden('pit').some((s) => s[0] === 'w'), 'ohne Pommes keine Frage');
  R.flags['eingeladen.pit'] = 0; R.tag = 1;   // gestern eingeladen
  const f = reden('pit'); const w = f.find((s) => s[0] === 'w');
  assert.ok(w && w[1].length === 3, 'drei Antworten');
  for (const x of w[1]) { assert.ok(x.t.trim().split(/\s+/).length <= 6, x.t); assert.ok(x.dann[0][2].trim().split(/\s+/).length <= 12); }
  const gut = w[1].filter((x) => x.e.bond); assert.equal(gut.length, 1); assert.equal(gut[0].t, 'Sein Bruder zog weg.');
  assert.ok(w[1].every((x) => x.e.flags['gemerkt.pit']), 'die Frage kommt nur einmal');
  wirke(R, gut[0].e); assert.ok(!reden('pit').some((s) => s[0] === 'w'), 'danach wieder normales Reden');
});

test('Freundschaft: ab Bindung 3 kommt am Morgen eine Einladung, danach gibt es „Zusammen losziehen“ – einmal', () => {
  const R = neuerLauf({ karten: { kopf: 'voll', zuhause: 'oma', tasche: 'ok' } });
  assert.equal(LEUTE_AKTIONEN.treffen.wenn(R, 'pit'), false);
  R.bond.pit = 3;
  const f = FOLGEN.find((x) => x.id === 'freund.pit'); assert.ok(f && f.wenn(R));
  for (const z of f.text) assert.ok(z.trim().split(/\s+/).length <= 12, z);
  wirke(R, f.e(R)); assert.ok(R.chats.some((c) => c.von === 'pit'), 'Nachricht von Pit');
  assert.equal(LEUTE_AKTIONEN.treffen.wenn(R, 'pit'), true);
  const sz = LEUTE_AKTIONEN.treffen.szene(R, { wer: 'pit' });
  for (const x of sz) if (x[0] === 't') assert.ok(x[1].trim().split(/\s+/).length <= 12, x[1]);
  wirke(R, sz.find((x) => x[0] === 'e')[1]);
  assert.equal(LEUTE_AKTIONEN.treffen.wenn(R, 'pit'), false, 'nur einmal'); assert.equal(R.bond.pit, 4);
  assert.ok(LEUTE_REIHE.includes('treffen'));
});

test('Ideen für heute: höchstens drei, je Ort eine, nie Mist, kurze Sätze, müde → Bett zuerst', () => {
  for (const z of IDEEN_ZEILEN) assert.ok(z.trim().split(/\s+/).length <= 12, z);
  const R = neuerLauf({ seed: 7, karten: { kopf: 'ruhig', zuhause: 'voll', tasche: 'voll' } });
  const orteJeTag = new Set();
  for (let t = 0; t < 12; t++) {
    R.jz = Math.floor(t / 3); R.tag = t % 3;
    const i = ideenFuerHeute(R);
    assert.ok(i.length >= 2 && i.length <= 3, 'Tag ' + t + ': ' + i.length);
    assert.equal(new Set(i.map((x) => x.ort)).size, i.length, 'je Ort eine');
    for (const x of i) { assert.ok(ORTE.some((o) => o.id === x.ort), x.ort); orteJeTag.add(x.ort); }
  }
  assert.ok(orteJeTag.size >= 6, 'über das Jahr verschiedene Orte: ' + orteJeTag.size);
  R.kraft = 0; R.jz = 0; R.tag = 0;
  const muede = ideenFuerHeute(R);
  assert.equal(muede[0].ort, 'zuhause');
  assert.ok(muede.every((x) => x.ort !== 'kiosk'), 'ohne Kraft kein Job');
  R.kraft = 3; R.druck = 80;
  assert.equal(ideenFuerHeute(R)[0].ort, 'steg');
  R.flags['job.weg'] = true; R.flags['pit.weg'] = true; R.flags['meidet.mika'] = true;
  for (let t = 0; t < 12; t++) { R.jz = Math.floor(t / 3); R.tag = t % 3; for (const x of ideenFuerHeute(R)) assert.ok(!['kiosk', 'brunnen', 'krater'].includes(x.ort), x.ort); }
});

test('Handy „Leute“: jeder Ort hat ein Wort dafür, wo jemand ist', () => {
  for (const o of ORTE) assert.ok(ORT_BEI[o.id] && ORT_BEI[o.id].split(/\s+/).length <= 3, o.id);
});

test('Finale: am Steg stehen die engsten drei, jede Person erinnert an etwas Getanes; wer abgereist ist, fehlt', async () => {
  const { amSteg } = await import('../../src/respawn/daten/situationen-2.js');
  const R = neuerLauf({ karten: K() });
  assert.deepEqual(amSteg(R), []);
  Object.assign(R.bond, { pit: 4, noor: 3, jolie: 2, tun: 2, mika: 1 });
  assert.deepEqual(amSteg(R).slice(0, 2), ['pit', 'noor']);
  assert.equal(amSteg(R).length, 3);
  wirke(R, { flag: 'pit.geholfen' }); wirke(R, { flag: 'abschied.kontakt' });
  assert.ok(!amSteg(R).includes('noor'), 'Noor ist mit der Fähre weg');
  const fin = SITUATIONEN.find((s) => s.id === 'finale');
  assert.deepEqual(fin.cast(R), ['ilda', 'pit', 'jolie', 'tun']);
  const zeilen = fin.szene(R).filter((s) => s[0] === 's' && s[1] !== 'ilda');
  assert.equal(zeilen.length, 3);
  assert.equal(zeilen[0][2], 'Du bist damals geblieben. Das weiß ich noch.');
  for (const z of zeilen) assert.ok(woerter(z[2]) <= 12, z[2]);
  // leere Akte: Ilda behauptet nicht, sie sei dicker geworden
  assert.ok(fin.szene(R).some((s) => s[0] === 's' && /nichts dazu/.test(s[2])));
});

test('Kapitel-Auftakt: erst die Insel, dann du – nur was stimmt, kurze Sätze', () => {
  for (const z of KAPITEL_ZEILEN) assert.ok(woerter(z) <= 12, z);
  const R = neuerLauf({ karten: K() });
  assert.deepEqual(kapitelAuftakt(R), ['Herbst. Die Bäume am Hafen werden rot.', 'Du kennst hier niemanden. Noch nicht.']);
  R.jz = 1;
  assert.deepEqual(kapitelAuftakt(R), ['Über Nacht kam der Schnee. Die Dächer sind weiß.', 'Am Hafen grüßt man dich. Mehr nicht.']);
  Object.assign(R.bond, { pit: 3, jolie: 2, mika: -2 }); R.akte.push('kasse', 'spray');
  assert.deepEqual(kapitelAuftakt(R).slice(1), ['Pit hebt die Hand, wenn du kommst.', 'Mika schaut weg, wenn du kommst.', 'In Ildas Büro liegt eine Akte. Deine.']);
  R.jz = 3; R.akte.length = 0;
  const s = kapitelAuftakt(R);
  assert.ok(s.length <= 4 && s[s.length - 1] === 'Noch ein paar Wochen. Dann kommt die Fähre.');
  for (const z of s) assert.ok(woerter(z) <= 12, z);
});

// ---- Aufträge (Missionen) ----
const missionSchritte = (m, R, M) => m.schritte.flatMap((s) => {
  if (s.art === 'hin' || s.art === 'szene') return [s.szene(R, M)];
  if (s.art === 'lauf') return [true, false].map((geschafft) => s.nach ? s.nach(R, { geschafft, rest: geschafft ? 9 : 0, zeit: 20 }, M) : []);
  return [5, 2].map((gefunden) => s.nach ? s.nach(R, { gefunden, von: 5, geschafft: gefunden >= 5, rest: 3, sekunden: 60 }, M) : []);
});
test('Aufträge: vollständig beschrieben, kurze Sätze, bekannte Orte, Figuren und Themen', () => {
  const fehler = [];
  const bekannt = new Set(['ilda', 'jolie', 'tun', 'mika', 'pit', 'fraenz', 'noor', 'luc', 'yara', 'maelle', 'tiago', 'lucinda', ...Object.keys(FIGUREN), ...Object.keys(STIMMEN)]);
  assert.ok(MISSIONEN.length >= 5);
  assert.equal(new Set(MISSIONEN.map((m) => m.id)).size, MISSIONEN.length);
  for (const t of THEMEN) assert.ok(MISSIONEN.some((m) => m.thema === t.id), 'Thema ohne Auftrag: ' + t.id);
  for (const m of MISSIONEN) {
    if (!m.titel || !m.bild || !m.lohn || !bekannt.has(m.von)) fehler.push(m.id + ': Kopf unvollständig');
    if (!ORTE.some((o) => o.id === m.ort)) fehler.push(m.id + ': Ort ' + m.ort);
    if (m.thema && !THEMEN.some((t) => t.id === m.thema)) fehler.push(m.id + ': Thema ' + m.thema);
    if (!Array.isArray(m.wie) || m.wie.length !== 3) fehler.push(m.id + ': Erklärkarte braucht genau drei Sätze');
    for (const z of [m.kurz, ...(m.wie || [])]) if (woerter(z) > 12) fehler.push(m.id + ': zu lang „' + z + '“');
    if (!(m.gespraech || []).length) fehler.push(m.id + ': Fragen fürs Gespräch fehlen');
    if (!m.schritte.some((s) => s.art === 'lauf' || s.art === 'sammeln' || s.art === 'hin')) fehler.push(m.id + ': kein Schritt in der Welt');
    for (const s of m.schritte) {
      if (!['hin', 'lauf', 'sammeln', 'szene'].includes(s.art)) fehler.push(m.id + ': Art ' + s.art);
      if (s.art !== 'szene' && (!s.text || woerter(s.text) > 8)) fehler.push(m.id + ': Schritt-Text fehlt oder zu lang „' + s.text + '“');
      if (s.ort && !ORTE.some((o) => o.id === s.ort)) fehler.push(m.id + ': Ort ' + s.ort);
      if ((s.art === 'hin' || s.art === 'lauf') && !s.ort && !s.platz) fehler.push(m.id + ': Schritt ohne Ziel');
      for (const c of s.cast || []) if (!bekannt.has(c)) fehler.push(m.id + ': Figur ' + c);
      for (const d of s.dinge || []) if (!ORTE.some((o) => o.id === d.ort)) fehler.push(m.id + ': Ding an ' + d.ort);
    }
    // Szenen in allen Lagen durchgehen: ohne Flags und mit jedem Flag, das der Auftrag selbst setzt
    const flags = new Set();
    const pruefe = (R) => {
      const M = { id: m.id, i: 0, sterne: [], versuche: 0 };
      let spiel = false;
      for (const steps of missionSchritte(m, R, M)) durchlaufe(steps, R, (s) => {
        const text = s[0] === 't' || s[0] === 'd' ? s[1] : (s[0] === 's' || s[0] === 'k') ? s[2] : null;
        if (text && woerter(text) > 12) fehler.push(`${m.id}: zu lang „${text}“`);
        if (s[0] === 's' && !bekannt.has(s[1])) fehler.push(`${m.id}: unbekannte Figur ${s[1]}`);
        if (s[0] === 'e') { if (s[1].flag) flags.add(s[1].flag); if (s[1].akte && !AKTE[s[1].akte]) fehler.push(`${m.id}: Akte ${s[1].akte} fehlt`); if (s[1].chat && woerter(s[1].chat.text) > 14) fehler.push(`${m.id}: Chat zu lang`); }
        if (['spiel', 'merk', 'zuck', 'atem'].includes(s[0])) spiel = true;
        if (s[0] === 'w') {
          if (s[1].length < 2 || s[1].length > 4) fehler.push(`${m.id}: ${s[1].length} Wahlen`);
          for (const w of s[1]) {
            if (woerter(w.t) > 6) fehler.push(`${m.id}: Wahl zu lang „${w.t}“`);
            if (!['ruhig', 'nein', 'hilfe', 'hart', 'weg', 'mut'].includes(w.art)) fehler.push(`${m.id}: Art ${w.art}`);
            if (w.e && w.e.flag) flags.add(w.e.flag);
            if (w.e && w.e.akte && !AKTE[w.e.akte]) fehler.push(`${m.id}: Akte ${w.e.akte} fehlt`);
          }
        }
      });
      return spiel;
    };
    const spiel = pruefe(neuerLauf({ karten: K() }));
    // fordernd: jeder Auftrag hat ein Spielteil (Geschick, Merken, Ruhe, Atem) oder einen Lauf gegen die Uhr
    if (!spiel && !m.schritte.some((s) => s.art === 'lauf' || s.art === 'sammeln')) fehler.push(m.id + ': nichts, was fordert');
    for (const f of [...flags]) { const R = neuerLauf({ karten: K() }); R.flags[f] = true; pruefe(R); }
    // mehr als ein Weg: mindestens drei verschiedene Entscheidungen bleiben hängen
    if (flags.size < 3) fehler.push(m.id + ': zu wenig Entscheidungen mit Folgen (' + flags.size + ')');
  }
  for (const f of FOLGEN) for (const z of f.text) if (woerter(z) > 12) fehler.push('Folge zu lang: ' + z);
  assert.deepEqual(fehler, []);
});
test('Aufträge: „Dein Weg“ – jeder Auftrag hat Sätze, jeder Satz ist kurz und hängt an einer echten Entscheidung', () => {
  const fehler = [];
  for (const m of MISSIONEN) {
    const weg = MISSION_WEG[m.id] || [];
    if (weg.length < 3) fehler.push(m.id + ': weniger als drei Weg-Sätze');
    const quelle = m.schritte.map((s) => String(s.szene || '') + String(s.nach || '')).join('\n');
    for (const [f, t] of weg) {
      if (!quelle.includes("'" + f + "'")) fehler.push(m.id + ': Flag ' + f + ' wird nie gesetzt');
      if (woerter(t) > 8) fehler.push(m.id + ': Weg-Satz zu lang „' + t + '“');
    }
  }
  for (const id of Object.keys(MISSION_WEG)) if (!MISSIONEN.some((m) => m.id === id)) fehler.push('Weg ohne Auftrag: ' + id);
  assert.deepEqual(fehler, []);
  const R = neuerLauf({ karten: K() });
  R.flags['suche.zugehoert'] = true; R.flags['suche.ilda'] = true;
  assert.deepEqual(wegVon(R, 'suche'), ['Du hast zugehört.', 'Du hast Ilda geholt.']);
  assert.deepEqual(wegVon(R, 'hitze'), []);
});
test('Aufträge: Ablauf – anbieten, annehmen, Schritte, Sterne, erledigt; Themen nur wenn eingeschaltet', () => {
  const R = neuerLauf({ karten: K() });
  const ohne = angebote(R, MISSIONEN, []).map((m) => m.id);
  assert.ok(ohne.includes('lieferung') && !ohne.includes('mutprobe') && !ohne.includes('nachtwache'), 'Herbst ohne Thema: ' + ohne);
  assert.equal(angebote(R, MISSIONEN, ['nein'])[0].id, 'mutprobe', 'Themen-Auftrag steht vorn');
  R.jz = 1;
  assert.ok(angebote(R, MISSIONEN, []).some((m) => m.id === 'sturm') && angebote(R, MISSIONEN, []).some((m) => m.id === 'nachtwache'));
  R.jz = 2;
  assert.ok(!angebote(R, MISSIONEN, []).some((m) => m.id === 'sturm'), 'Sturm gibt es nur im Winter');
  const m = MISSIONEN.find((x) => x.id === 'lieferung');
  nimmAn(R, m);
  assert.deepEqual(angebote(R, MISSIONEN, ['nein', 'wut']), [], 'nur ein Auftrag zur Zeit');
  assert.equal(aktuell(R, MISSIONEN).s.art, 'hin');
  let n = 0; while (!weiter(R, MISSIONEN)) n += 1;
  assert.equal(n, m.schritte.length - 1);
  R.mission.sterne = [3, 2, 0, 3];
  assert.equal(sterneFuer(R.mission), 2);
  assert.equal(schliesse(R), 2);
  assert.equal(R.mission, null);
  assert.ok(!angebote(R, MISSIONEN, []).some((x) => x.id === 'lieferung'), 'erledigt kommt nicht wieder');
  assert.deepEqual(JSON.parse(JSON.stringify(R)).missionen, { lieferung: { sterne: 2, jz: 2, tag: 0 } });
  // Wertung
  assert.equal(sterneLauf({ geschafft: true, rest: 10 }, 30), 3); assert.equal(sterneLauf({ geschafft: true, rest: 2 }, 30), 2); assert.equal(sterneLauf({ geschafft: false, rest: 0 }, 30), 0);
  assert.equal(sterneSammeln({ gefunden: 5, von: 5, rest: 20, sekunden: 60 }), 3); assert.equal(sterneSammeln({ gefunden: 3, von: 5, rest: 0, sekunden: 60 }), 1);
  assert.equal(sterneTreffer(3, 3), 3); assert.equal(sterneTreffer(2, 3), 2); assert.equal(sterneTreffer(0, 3), 0);
  assert.ok(zeitFuerStrecke(100, 5, 1.15) > zeitFuerStrecke(100, 5, 0.92));
  assert.equal(sterneFuer({ sterne: [0, 0] }), 1, 'durchgezogen = mindestens ein Stern');
});
