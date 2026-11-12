// RESPAWN – Spiellogik eines Durchgangs (reine Funktionen ohne Browser; Test: tests/unit/respawn-run.test.mjs).
// Ein Durchgang ist ein Jahr auf der Insel in vier Jahreszeiten. Am Anfang zieht man drei Startkarten (Kopf, Zuhause,
// Tasche). Jede Wahl wirkt auf Druck, Geld, Ruf und die Bindung zu einzelnen Leuten und hinterlässt Spuren (flags),
// die spätere Situationen und der Ausgang lesen. Nichts hier bewertet eine Wahl.
//
//   neuerLauf({ seed, karten }) → R          zieheKarten(rng) → { kopf, zuhause, tasche }
//   wirke(R, e, { reiz }) → Änderungen        e = { druck, geld, ruf:{…}, bond:{…}, flag, flags:{…}, akte, spaet, chat }
//   wahlen(R, liste) → sichtbare Wahlen mit { gesperrt: null | 'druck' | 'nein' | 'trau' }
//   zeitFuer(R) → Sekunden für die Wahl (0 = keine Uhr)     ohneWahl(R, sichtbar) → Index, wenn die Uhr abläuft
//   planeJahreszeit(R, SITUATIONEN, rng) → Liste von Ids     jahreszeitWechsel(R) → Änderungen (Schlaf, Zuhause-Karte)
//   ausgangFuer(R, AUSGAENGE) → Ausgang                      akteFuer(R, EINTRAEGE) → Zeilen { amt, echt }
import { KARTEN } from './daten/karten.js';

export const KRAFT_JE_TAG = 3;     // so viel schafft man an einem Tag (Ereignisse und größere Aktionen kosten 1)
export const TAGE_JE_JAHRESZEIT = 3;
export const UHR_NACH_KRAFT = [21.2, 17.3, 13.5, 9.5];   // Tageszeit: je weniger Kraft übrig, desto später
export const JAHRESZEITEN = ['herbst', 'winter', 'fruehling', 'sommer'];
export const JAHRESZEIT_NAME = { herbst: 'Herbst', winter: 'Winter', fruehling: 'Frühling', sommer: 'Sommer' };
export const LEUTE = ['ilda', 'jolie', 'tun', 'mika', 'pit', 'fraenz', 'noor'];
export const DRUCK_ROT = 70;
export const DRUCK_GELB = 40;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const druckZone = (d) => (d >= DRUCK_ROT ? 'rot' : d >= DRUCK_GELB ? 'gelb' : 'gruen');

export function zieheKarten(rng = Math.random) {
  const pick = (l) => l[Math.floor(rng() * l.length) % l.length].id;
  return { kopf: pick(KARTEN.kopf), zuhause: pick(KARTEN.zuhause), tasche: pick(KARTEN.tasche) };
}
export function karte(art, id) { return (KARTEN[art] || []).find((k) => k.id === id) || null; }

export function neuerLauf({ seed = 1, karten } = {}) {
  const k = karten || zieheKarten();
  const R = {
    v: 1, seed, karten: { ...k },
    druck: 20, geld: k.tasche === 'leer' ? 5 : 40,
    ruf: { hafen: 0, krater: 0, gross: 0 },          // Clique am Hafen · Krater-Crew · Erwachsene
    bond: {}, flags: {}, akte: [], chats: [], spaet: 0,
    jz: 0, schritt: 0, plan: [], gespielt: [], log: [], fertig: false, ausgang: null,
    tag: 0, kraft: KRAFT_JE_TAG, tage: [], folgen: [], angekommen: false,
  };
  if (k.zuhause === 'allein') R.druck = 25;
  return R;
}

export const hat = (R, flag) => !!R.flags[flag];
export const wert = (R, flag, d = 0) => (R.flags[flag] === undefined ? d : R.flags[flag]);
export const bond = (R, wer) => R.bond[wer] || 0;
export const hatKarte = (R, id) => R.karten.kopf === id || R.karten.zuhause === id || R.karten.tasche === id;
export const jahreszeit = (R) => JAHRESZEITEN[clamp(R.jz, 0, 3)];

// ---- Wirkungen ----
// reiz: true = jemand provoziert oder beschämt dich (die „Kurze Zündschnur“ lädt dann schneller)
export function wirke(R, e, { reiz = false } = {}) {
  const aend = { druck: 0, geld: 0, bond: {}, ruf: {} };
  if (!e) return aend;
  if (typeof e.druck === 'number') {
    let d = e.druck;
    if (d > 0 && R.karten.kopf === 'zuendschnur' && (reiz || e.reiz)) d = Math.round(d * 1.5);
    const vor = R.druck;
    R.druck = clamp(R.druck + d, 0, 100);
    aend.druck = R.druck - vor;
  }
  if (typeof e.geld === 'number') { const vor = R.geld; R.geld = Math.max(0, R.geld + e.geld); aend.geld = R.geld - vor; }
  for (const [wer, n] of Object.entries(e.bond || {})) {
    let d = n;
    if (d > 0 && R.karten.kopf === 'nein') d += 1;            // „Kann nicht Nein sagen“: Leute mögen dich schnell
    const vor = bond(R, wer);
    R.bond[wer] = clamp(vor + d, -3, 5);
    aend.bond[wer] = R.bond[wer] - vor;
  }
  for (const [gruppe, n] of Object.entries(e.ruf || {})) {
    const vor = R.ruf[gruppe] || 0;
    R.ruf[gruppe] = clamp(vor + n, -5, 5);
    aend.ruf[gruppe] = R.ruf[gruppe] - vor;
  }
  if (e.flag) R.flags[e.flag] = true;
  for (const [f, v] of Object.entries(e.flags || {})) R.flags[f] = v;
  if (e.akte && !R.akte.includes(e.akte)) R.akte.push(e.akte);
  if (e.spaet) R.spaet += e.spaet;
  if (e.chat) R.chats.push(...(Array.isArray(e.chat) ? e.chat : [e.chat]));
  return aend;
}

// ---- Wahlen ----
// art: 'ruhig' (reden, fragen, erklären) · 'nein' (ablehnen) · 'hilfe' (jemanden einweihen, wer: 'ilda')
//      'hart' (laut werden, drohen, zuschlagen) · 'weg' (gehen, schweigen, mitlaufen) · 'mut' (sich vor jemanden stellen)
// nur: 'kartenId' zeigt die Wahl nur mit dieser Startkarte · wenn: (R) => boolean
const RUHIG_AB = (R) => (R.karten.kopf === 'zuendschnur' ? 60 : 78);
export function sperre(R, w) {
  if (w.art === 'ruhig' && R.druck >= RUHIG_AB(R)) return 'druck';
  if (w.art === 'nein' && R.karten.kopf === 'nein' && R.druck >= 35) return 'nein';
  if (w.art === 'nein' && R.druck >= 90) return 'druck';
  if (w.art === 'hilfe' && R.karten.kopf === 'trau' && bond(R, w.wer || 'ilda') < 2) return 'trau';
  return null;
}
export const SPERRE_TEXT = { druck: 'Zu viel Druck', nein: 'Nein geht gerade nicht', trau: 'Du traust keinem' };

export function wahlen(R, liste) {
  const sichtbar = (liste || []).filter((w) => (!w.nur || hatKarte(R, w.nur)) && (!w.wenn || w.wenn(R)) && (!w.kostet || R.geld >= w.kostet || w.zeigen));
  let out = sichtbar.map((w, i) => ({ ...w, index: i, gesperrt: sperre(R, w) || (w.kostet && R.geld < w.kostet ? 'geld' : null) }));
  // Nie in die Sackgasse: bleibt nichts frei, wird die erste gesperrte Wahl wieder frei (Inhalte sollen das vermeiden)
  if (out.length && out.every((w) => w.gesperrt)) out[0].gesperrt = null;
  return out;
}

// Uhr: je höher der Druck, desto weniger Zeit. „Kopf voll“ hat immer eine Uhr und weniger Zeit.
export function zeitFuer(R, { ruhe = false } = {}) {
  if (ruhe) return 0;
  const voll = R.karten.kopf === 'voll';
  let s = 0;
  if (R.druck >= DRUCK_ROT) s = 8;
  else if (R.druck >= DRUCK_GELB) s = 14;
  else if (voll) s = 16;
  if (s && voll) s = Math.max(5, Math.round(s * 0.7));
  return s;
}
// Was passiert, wenn die Uhr abläuft: bei rotem Druck die harte Wahl, sonst die Wahl „weg“, sonst die erste freie.
export function ohneWahl(R, sichtbar) {
  const frei = sichtbar.filter((w) => !w.gesperrt);
  const find = (art) => frei.find((w) => w.art === art);
  const w = (R.druck >= DRUCK_ROT ? find('hart') || find('weg') : find('weg') || find('hart')) || frei.find((x) => x.sonst) || frei[0];
  return w ? w.index : 0;
}

// ---- Plan ----
// Situation: { id, fest?: 'herbst' | …, zeit: ['herbst', …], wenn?(R), gewicht?, platz?: 'anfang'|'ende' }
// Je Jahreszeit: alle festen Situationen dieser Zeit plus so viele gezogene, dass es `anzahl` sind.
export const JE_JAHRESZEIT = { herbst: 2, winter: 3, fruehling: 2, sommer: 2 };
export function planeJahreszeit(R, SITUATIONEN, rng = Math.random) {
  const jz = jahreszeit(R);
  const offen = SITUATIONEN.filter((s) => !R.gespielt.includes(s.id) && (!s.wenn || s.wenn(R)));
  const fest = offen.filter((s) => s.fest === jz);
  const pool = offen.filter((s) => !s.fest && (s.zeit || JAHRESZEITEN).includes(jz));
  const n = Math.max(0, (JE_JAHRESZEIT[jz] || 2) - fest.length);
  const gezogen = [];
  const rest = pool.slice();
  while (gezogen.length < n && rest.length) {
    const sum = rest.reduce((a, s) => a + (s.gewicht ? s.gewicht(R) : 1), 0);
    let r = rng() * sum, k = 0;
    for (; k < rest.length - 1; k++) { r -= rest[k].gewicht ? rest[k].gewicht(R) : 1; if (r <= 0) break; }
    gezogen.push(rest.splice(k, 1)[0]);
  }
  const ordnung = { anfang: 0, mitte: 1, ende: 2 };
  const plan = fest.concat(gezogen).sort((a, b) => (ordnung[a.platz || 'mitte'] - ordnung[b.platz || 'mitte']));
  return plan.map((s) => s.id);
}

// Die Situationen einer Jahreszeit auf drei Tage verteilen: „anfang“ am ersten, „ende“ am letzten Tag, der Rest dazwischen
export function verteile(plan, SITUATIONEN) {
  const tage = [[], [], []];
  const rest = [];
  for (const id of plan) {
    const s = SITUATIONEN.find((x) => x.id === id) || {};
    if (s.platz === 'anfang') tage[0].push(id); else if (s.platz === 'ende') tage[2].push(id); else rest.push(id);
  }
  const reihe = [1, 0, 2, 1];
  rest.forEach((id, i) => tage[reihe[i % reihe.length]].push(id));
  return tage;
}
// Jeden Morgen: Was aus dem geworden ist, was man getan (oder gelassen) hat. Jede Folge passiert einmal.
export function folgenAmMorgen(R, FOLGEN) {
  const out = [];
  R.folgen = R.folgen || [];
  for (const f of FOLGEN) {
    if (R.folgen.includes(f.id) || !f.wenn(R)) continue;
    R.folgen.push(f.id);
    out.push({ id: f.id, text: f.text, aend: wirke(R, typeof f.e === 'function' ? f.e(R) : f.e) });
  }
  return out;
}
// Neuer Tag: Kraft voll, eine Nacht Schlaf senkt den Druck etwas (nach einer langen Nacht weniger)
export function neuerTag(R) {
  R.kraft = KRAFT_JE_TAG - (R.spaet >= 2 ? 1 : 0);
  const e = { druck: R.spaet >= 1 ? -3 : -8 };
  R.spaet = Math.max(0, R.spaet - 1);
  return wirke(R, e);
}

// Neue Jahreszeit: einmal schlafen senkt den Druck etwas; die Zuhause-Karte meldet sich.
export function jahreszeitWechsel(R) {
  const e = { druck: -10 };
  if (R.karten.zuhause === 'zwei') e.druck += 6;        // Koffer packen, hin und her
  if (R.karten.zuhause === 'oma') e.geld = 10;          // Oma steckt dir etwas zu
  if (R.spaet >= 2 && R.karten.zuhause !== 'allein') e.druck += 5;
  R.spaet = Math.max(0, R.spaet - 1);
  return wirke(R, e);
}
export const verschlaeft = (R) => R.spaet >= (R.karten.zuhause === 'allein' ? 1 : 2);

// ---- Ausgang und Akte ----
export function ausgangFuer(R, AUSGAENGE) {
  return AUSGAENGE.find((a) => a.wenn(R)) || AUSGAENGE[AUSGAENGE.length - 1];
}
export function akteFuer(R, EINTRAEGE) {
  return R.akte.map((id) => EINTRAEGE[id]).filter(Boolean).map((e) => ({ amt: e.amt, echt: typeof e.echt === 'function' ? e.echt(R) : e.echt }));
}

// Beste Bindung (für Ausgänge und Texte)
export function besteBindung(R, unter = LEUTE) {
  let best = null;
  for (const w of unter) if (bond(R, w) > (best ? bond(R, best) : 0)) best = w;
  return best;
}
