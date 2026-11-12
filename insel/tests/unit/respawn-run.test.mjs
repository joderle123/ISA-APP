// RESPAWN – Spiellogik und Inhalte (reine Node-Tests): Regeln, Schreibregeln, keine Sackgassen, jeder Ausgang erreichbar.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { neuerLauf, wirke, wahlen, zeitFuer, ohneWahl, planeJahreszeit, jahreszeitWechsel, ausgangFuer, akteFuer, verschlaeft, hatKarte, JAHRESZEITEN } from '../../src/respawn/run.js';
import { SITUATIONEN, AUSGAENGE, AKTE, KARTEN, FREIZEIT, FREIZEIT_JE, FIGUREN, STIMMEN } from '../../src/respawn/daten/index.js';

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
    for (let jz = 0; jz < 4; jz++) { R.jz = jz; const p = planeJahreszeit(R, SITUATIONEN, rng); assert.ok(p.length >= 2, JAHRESZEITEN[jz]); R.gespielt.push(...p); alle.push(...p); jahreszeitWechsel(R); }
    assert.equal(alle[0], 'ankunft'); assert.equal(alle[alle.length - 1], 'finale');
    assert.equal(new Set(alle).size, alle.length);
    assert.ok(alle.length >= 8 && alle.length <= 10, String(alle.length));
  }
});
test('Freizeit: Angebote je Jahreszeit vorhanden', () => {
  for (const jz of JAHRESZEITEN) { assert.equal(FREIZEIT_JE[jz].length, 4); for (const id of FREIZEIT_JE[jz]) assert.ok(FREIZEIT.find((f) => f.id === id), id); }
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
  assert.equal(new Set(AUSGAENGE.map((a) => a.id)).size, 10);
  const R = neuerLauf({ karten: K() }); R.akte.push('schlag', 'luege.gedeckt'); R.flags['luege.gestanden'] = true;
  const z = akteFuer(R, AKTE); assert.equal(z.length, 2); assert.match(z[1].echt, /zugegeben/);
  for (const [id, e] of Object.entries(AKTE)) { assert.ok(e.amt && e.echt, id); assert.ok(woerter(e.amt) <= 12, id); }
});
test('Verschlafen: „Viel allein“ schon nach einer langen Nacht', () => {
  const a = neuerLauf({ karten: K('voll', 'allein') }), o = neuerLauf({ karten: K('voll', 'oma') });
  a.spaet = 1; o.spaet = 1; assert.equal(verschlaeft(a), true); assert.equal(verschlaeft(o), false);
});
