// RESPAWN – Spiellogik und Inhalte (reine Node-Tests): Regeln, Schreibregeln, keine Sackgassen, jeder Ausgang erreichbar.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { neuerLauf, wirke, wahlen, zeitFuer, ohneWahl, planeJahreszeit, jahreszeitWechsel, ausgangFuer, akteFuer, verschlaeft, hatKarte, verteile, folgenAmMorgen, neuerTag, JAHRESZEITEN } from '../../src/respawn/run.js';
import { SITUATIONEN, AUSGAENGE, AKTE, KARTEN, FIGUREN, STIMMEN, ORTE, ORT_AKTIONEN, LEUTE_AKTIONEN, LEUTE_REIHE, FOLGEN, VERPASST, WICHTIG, statistSagt, TRATSCH_ZEILEN } from '../../src/respawn/daten/index.js';

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
    assert.ok(alle.length >= 8 && alle.length <= 10, String(alle.length));
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
