// RESPAWN – Aufträge (Missionen): reine Logik ohne Welt, damit sie sich in Node testen lässt.
// Ein Auftrag hat mehrere Schritte. Der Stand liegt im Lauf: R.mission = { id, i, sterne: [], versuche }, erledigte in
// R.missionen = { id: { sterne, tag } }. Die Welt (Marken, Wettlauf, Sammeln, Bühne) steckt in plugin.js.
//
// Schritt-Arten (daten/missionen.js):
//   hin      { art: 'hin', ort, text, cast?, uhr?, szene(R, M) }            – hingehen; dort läuft die Szene
//   lauf     { art: 'lauf', ort, text, faktor?, cast?, nach(R, erg, M) }    – rechtzeitig ankommen (erg: geschafft, rest, zeit)
//   sammeln  { art: 'sammeln', text, bild, dinge: [{ ort, dx, dz }], faktor?, nach(R, erg, M) } – alles einsammeln, die Uhr läuft
//   szene    { art: 'szene', cast?, ort?, uhr?, szene(R, M) }               – läuft sofort, wo man steht (oder am Ort)
// `hin` wartet auf die Spielerin oder den Spieler, alle anderen laufen sofort nach dem vorigen Schritt los.

export const themenAn = (meta) => (meta && Array.isArray(meta.themen) ? meta.themen : []);
export const erledigt = (R, id) => !!(R.missionen && R.missionen[id]);

// Was gerade angeboten wird: nie zwei zugleich annehmen; Themen-Aufträge nur, wenn das Thema eingeschaltet ist – die zuerst.
export function angebote(R, MISSIONEN, themen = []) {
  if (!R || R.mission) return [];
  const jz = R.jz || 0;
  return MISSIONEN.filter((m) => !erledigt(R, m.id) && jz >= (m.ab || 0) && (m.bis === undefined || jz <= m.bis)
    && (!m.thema || themen.includes(m.thema)) && (!m.wenn || m.wenn(R)))
    .sort((a, b) => (b.thema ? 1 : 0) - (a.thema ? 1 : 0));
}
export function nimmAn(R, m) {
  R.mission = { id: m.id, i: 0, sterne: [], versuche: 0 };
  return R.mission;
}
export function aktuell(R, MISSIONEN) {
  const M = R && R.mission;
  if (!M) return null;
  const m = MISSIONEN.find((x) => x.id === M.id);
  if (!m || !m.schritte[M.i]) return null;
  return { m, M, s: m.schritte[M.i] };
}
// Einen Schritt weiter. true = der Auftrag ist durch.
export function weiter(R, MISSIONEN) {
  const a = aktuell(R, MISSIONEN);
  if (!a) return true;
  a.M.i += 1; a.M.versuche = 0;
  return a.M.i >= a.m.schritte.length;
}
// Sterne: Schnitt aus allem, was unterwegs gewertet wurde (0–3), mindestens einer fürs Durchziehen
export function sterneFuer(M) {
  const s = (M && M.sterne) || [];
  if (!s.length) return 2;
  return Math.max(1, Math.min(3, Math.round(s.reduce((a, b) => a + b, 0) / s.length)));
}
export function schliesse(R) {
  const M = R.mission;
  if (!M) return 0;
  const n = sterneFuer(M);
  R.missionen = R.missionen || {};
  R.missionen[M.id] = { sterne: n, jz: R.jz || 0, tag: R.tag || 0 };
  R.mission = null;
  return n;
}
export function brichAb(R) { const M = R.mission; R.mission = null; return M; }

// Wertung der Spielteile
export const sterneLauf = (erg, sekunden) => (!erg || !erg.geschafft ? 0 : erg.rest / Math.max(1, sekunden) >= 0.22 ? 3 : 2);
export const sterneSammeln = (erg) => (!erg || !erg.von ? 0 : erg.gefunden >= erg.von ? (erg.rest / Math.max(1, erg.sekunden) >= 0.2 ? 3 : 2) : erg.gefunden / erg.von >= 0.6 ? 1 : 0);
export const sterneTreffer = (richtig, von) => (von <= 0 ? 0 : richtig >= von ? 3 : richtig / von >= 0.6 ? 2 : richtig > 0 ? 1 : 0);

// Zeit für eine Strecke: Maß ist das Rennen zum Leuchtturm (knapp, aber zu Fuß zu schaffen). faktor > 1 = mehr Luft.
export function zeitFuerStrecke(meter, tempo, faktor = 1.15) {
  return Math.max(14, Math.round(meter / Math.max(0.5, tempo) * faktor) + 4);
}
