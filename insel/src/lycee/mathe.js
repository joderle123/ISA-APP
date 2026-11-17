// Annexe Junglinster – Mathe-Pilot (Auftrag 17.11.2026): Module zum Bearbeiten am eigenen Platz.
// VORLÄUFIGE Einteilung in sechs Module (Voie de préparation, angelehnt an den üblichen Aufbau: Zahlen, Rechnen,
// Geld, Messen, Brüche/Prozent). Sobald die offiziellen Modulbeschreibungen (Descripteurs, eduDocs) vorliegen,
// werden Nummern und Inhalte angepasst. Alle Aufgaben sind selbst geschrieben, nichts ist aus Büchern kopiert.
// Jedes Blatt hat eine kurze Erklärung („So geht's“: Idee, Schritte, Beispiel) und einen Aufgaben-Erzeuger:
// jedes Mal neue Zahlen, damit man üben kann, so oft man will. Aufgaben: { t: 'Text mit ___', a: ['Lösung'] } oder
// { t: 'a ◻ b', wahl: ['<', '=', '>'], a: '<' }, optional tipp.

const fmt = (n) => (Number.isInteger(n) ? String(n) : (Math.round(n * 100) / 100).toFixed(2).replace('.', ','));
const euro = (ct) => (ct / 100).toFixed(2).replace('.', ',');
function zufall(seed) { let s = (seed >>> 0) || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const zw = (r, a, b) => a + Math.floor(r() * (b - a + 1));   // ganze Zahl a … b
const viele = (n, f) => Array.from({ length: n }, (_, i) => f(i));

export const MATHE = [
  { nr: 1, titel: 'Zahlen bis 1000', ziele: ['Zahlen in Hunderter, Zehner, Einer zerlegen', 'Nachbarzahlen und Nachbarzehner finden', 'Zahlen vergleichen und runden'], blaetter: [
    { id: 'm1-stellen', titel: 'Hunderter, Zehner, Einer',
      erkl: { idee: 'Jede Ziffer hat ihren Platz. Der Platz sagt, wie viel sie wert ist.', schritte: ['H = Hunderter (100er)', 'Z = Zehner (10er)', 'E = Einer (1er)'], beispiel: '472 = 4 H + 7 Z + 2 E = 400 + 70 + 2' },
      gen: (r) => viele(10, (i) => { const h = zw(r, 1, 9), z = zw(r, 0, 9), e = zw(r, 0, 9), n = h * 100 + z * 10 + e;
        return i % 2 ? { t: n + ' = ___ H + ___ Z + ___ E', a: [String(h), String(z), String(e)], tipp: 'Lies die Ziffern von links nach rechts: H, Z, E.' }
          : { t: h + ' H + ' + z + ' Z + ' + e + ' E = ___', a: [String(n)], tipp: h + ' Hunderter sind ' + h * 100 + '.' }; }) },
    { id: 'm1-nachbarn', titel: 'Nachbarzahlen und Nachbarzehner',
      erkl: { idee: 'Nachbarn stehen direkt davor und danach.', schritte: ['Vorgänger: 1 weniger', 'Nachfolger: 1 mehr', 'Nachbarzehner: der Zehner davor und danach'], beispiel: '346 → Nachbarzahlen 345 und 347 · Nachbarzehner 340 und 350' },
      gen: (r) => viele(10, (i) => { const n = zw(r, 11, 989); if (n % 10 === 0) return { t: '___ < ' + (n + 1) + ' < ___', a: [String(n), String(n + 2)], frage: 'Nachbarzahlen' };
        return i < 5 ? { t: '___ < ' + n + ' < ___', a: [String(n - 1), String(n + 1)], tipp: 'Einer weniger, einer mehr.' }
          : { t: 'Zehner: ___ < ' + n + ' < ___', a: [String(Math.floor(n / 10) * 10), String(Math.floor(n / 10) * 10 + 10)], tipp: 'Schau nur auf H und Z. Die Einer werden 0.' }; }) },
    { id: 'm1-vergleichen', titel: 'Größer, kleiner, gleich',
      erkl: { idee: 'Das Zeichen ist ein hungriges Maul. Es frisst immer die größere Zahl.', schritte: ['Zuerst die Hunderter vergleichen', 'Gleich? Dann die Zehner', 'Wieder gleich? Dann die Einer'], beispiel: '468 > 459, weil 6 Zehner mehr sind als 5 Zehner.' },
      gen: (r) => viele(10, () => { const a = zw(r, 100, 999), b = r() < 0.15 ? a : r() < 0.5 ? a + zw(r, -9, 9) : zw(r, 100, 999); return { t: a + ' ◻ ' + b, wahl: ['<', '=', '>'], a: a < b ? '<' : a > b ? '>' : '=' }; }) },
    { id: 'm1-runden', titel: 'Runden auf Zehner und Hunderter',
      erkl: { idee: 'Runden heißt: zur nächsten „schönen“ Zahl gehen.', schritte: ['Schau auf die Stelle rechts davon', '0 bis 4: abrunden', '5 bis 9: aufrunden'], beispiel: '347 auf Zehner: 350 (7 → aufrunden) · 347 auf Hunderter: 300 (4 → abrunden)' },
      gen: (r) => viele(10, (i) => { const n = zw(r, 101, 989), z = i % 2 === 0; const rund = z ? Math.round(n / 10) * 10 : Math.round(n / 100) * 100;
        return { t: n + ' gerundet auf ' + (z ? 'Zehner' : 'Hunderter') + ': ___', a: [String(rund)], tipp: z ? 'Schau auf die Einer.' : 'Schau auf die Zehner.' }; }) },
  ] },
  { nr: 2, titel: 'Plus und Minus', ziele: ['Im Kopf über den Zehner rechnen', 'Zum Hunderter und Tausender ergänzen', 'Schriftlich addieren und subtrahieren'], blaetter: [
    { id: 'm2-plus', titel: 'Plus über den Zehner',
      erkl: { idee: 'Erst bis zum nächsten Zehner, dann den Rest.', schritte: ['Wie viel fehlt bis zum Zehner?', 'Diesen Teil zuerst dazu', 'Dann den Rest dazu'], beispiel: '47 + 8 → 47 + 3 = 50 → 50 + 5 = 55' },
      gen: (r) => viele(10, () => { const a = zw(r, 12, 89), b = zw(r, 3, 9) + (r() < 0.4 ? 10 * zw(r, 1, 3) : 0); return { t: a + ' + ' + b + ' = ___', a: [String(a + b)], tipp: 'Bis ' + (Math.ceil((a + 1) / 10) * 10) + ' fehlen ' + (Math.ceil((a + 1) / 10) * 10 - a) + '.' }; }) },
    { id: 'm2-minus', titel: 'Minus über den Zehner',
      erkl: { idee: 'Erst bis zum Zehner zurück, dann den Rest weg.', schritte: ['Zurück bis zum Zehner', 'Dann den Rest abziehen'], beispiel: '53 − 7 → 53 − 3 = 50 → 50 − 4 = 46' },
      gen: (r) => viele(10, () => { const a = zw(r, 21, 99), b = zw(r, 3, 9) + (r() < 0.4 ? 10 * zw(r, 1, 2) : 0); return { t: a + ' – ' + Math.min(b, a - 1) + ' = ___', a: [String(a - Math.min(b, a - 1))], tipp: 'Zuerst ' + (a % 10 || 10) + ' zurück bis ' + (a - (a % 10 || 10)) + '.' }; }) },
    { id: 'm2-ergaenzen', titel: 'Ergänzen bis 100 und 1000',
      erkl: { idee: 'Wie viel fehlt? Rechne vom kleinen Wert hoch.', schritte: ['Erst bis zum nächsten Zehner', 'Dann bis zum Hunderter', 'Alles zusammenzählen'], beispiel: '37 + ___ = 100 → 37 + 3 = 40 → 40 + 60 = 100 → 63' },
      gen: (r) => viele(10, (i) => { const ziel = i < 5 ? 100 : 1000, a = i < 5 ? zw(r, 11, 89) : zw(r, 2, 19) * 50; return { t: a + ' + ___ = ' + ziel, a: [String(ziel - a)] }; }) },
    { id: 'm2-schriftlich', titel: 'Schriftlich rechnen',
      erkl: { idee: 'Untereinander schreiben: Einer unter Einer, Zehner unter Zehner.', schritte: ['Rechts bei den Einern anfangen', 'Mehr als 9? Den Zehner merken (Übertrag)', 'Beim Minus: zu wenig? Einen Zehner „leihen“'], beispiel: '386 + 247: 6+7=13 (3, merke 1) · 8+4+1=13 (3, merke 1) · 3+2+1=6 → 633' },
      gen: (r) => viele(8, (i) => { const a = zw(r, 120, 699), b = zw(r, 105, 299); return i % 2 ? { t: (a + b) + ' – ' + b + ' = ___', a: [String(a)] } : { t: a + ' + ' + b + ' = ___', a: [String(a + b)] }; }) },
  ] },
  { nr: 3, titel: 'Mal und Geteilt', ziele: ['Das kleine Einmaleins sicher können', 'Teilen als Umkehraufgabe', 'Mit Zehnern und Hundertern malnehmen', 'Kleine Sachaufgaben lösen'], blaetter: [
    { id: 'm3-einmaleins', titel: 'Das kleine Einmaleins',
      erkl: { idee: 'Mal heißt: mehrmals das Gleiche.', schritte: ['Kernaufgaben: ·1, ·2, ·5, ·10', 'Von dort aus weiterrechnen', '7 · 6 = 5 · 6 + 2 · 6 = 30 + 12'], beispiel: '8 · 7 → 10 · 7 = 70 → minus 2 · 7 = 14 → 56' },
      gen: (r) => viele(12, () => { const a = zw(r, 2, 10), b = zw(r, 2, 10); return { t: a + ' · ' + b + ' = ___', a: [String(a * b)], tipp: '10 · ' + b + ' = ' + 10 * b + '. Wie viel weniger?' }; }) },
    { id: 'm3-geteilt', titel: 'Geteilt durch',
      erkl: { idee: 'Teilen ist Mal rückwärts.', schritte: ['Frag dich: Welche Zahl mal … gibt …?', '56 : 8 = ? → ? · 8 = 56'], beispiel: '42 : 6 = 7, weil 7 · 6 = 42' },
      gen: (r) => viele(12, () => { const a = zw(r, 2, 10), b = zw(r, 2, 10); return { t: (a * b) + ' : ' + b + ' = ___', a: [String(a)], tipp: '___ · ' + b + ' = ' + a * b }; }) },
    { id: 'm3-zehner', titel: 'Mal mit Zehnern und Hundertern',
      erkl: { idee: 'Rechne ohne Nullen, hänge die Nullen dann an.', schritte: ['30 · 4 → 3 · 4 = 12', 'Eine Null war dabei → 120'], beispiel: '20 · 70 → 2 · 7 = 14 → zwei Nullen → 1400' },
      gen: (r) => viele(10, (i) => { const a = zw(r, 2, 9), b = zw(r, 2, 9), fa = i % 3 === 0 ? 100 : 10, fb = i % 2 ? 1 : 10; return { t: (a * fa) + ' · ' + (b * fb) + ' = ___', a: [String(a * fa * b * fb)] }; }) },
    { id: 'm3-sach', titel: 'Kleine Sachaufgaben',
      erkl: { idee: 'Lies zweimal. Was ist gefragt? Welche Zahlen brauchst du?', schritte: ['Wichtige Zahlen unterstreichen', 'Mal, geteilt, plus oder minus?', 'Antwort mit Einheit'], beispiel: '4 Freunde teilen 24 Kekse gerecht → 24 : 4 = 6 Kekse für jeden' },
      gen: (r) => viele(6, (i) => { const n = zw(r, 3, 9), p = zw(r, 2, 8);
        const vorlagen = [
          { t: 'Ein Heft kostet ' + p + ' €. Du kaufst ' + n + ' Hefte. Du zahlst ___ €.', a: [String(n * p)] },
          { t: n * p + ' Bonbons für ' + n + ' Kinder, gerecht verteilt. Jedes Kind bekommt ___.', a: [String(p)] },
          { t: 'Ein Bus hat ' + n + ' Reihen mit je ' + p + ' Plätzen. Das sind ___ Plätze.', a: [String(n * p)] },
          { t: n + ' Wochen sind ___ Tage.', a: [String(n * 7)] },
          { t: 'Eine Kiste hat ' + p * 6 + ' Flaschen in ' + p + ' Reihen. In jeder Reihe stehen ___.', a: ['6'] },
          { t: 'Du sparst jede Woche ' + p + ' €. Nach ' + n + ' Wochen hast du ___ €.', a: [String(n * p)] },
        ];
        return vorlagen[i % vorlagen.length]; }) },
  ] },
  { nr: 4, titel: 'Geld und Komma', ziele: ['Euro und Cent umrechnen', 'Preise zusammenzählen', 'Rückgeld berechnen'], blaetter: [
    { id: 'm4-euro', titel: 'Euro und Cent',
      erkl: { idee: '1 Euro = 100 Cent. Das Komma trennt Euro und Cent.', schritte: ['3,45 € = 3 € und 45 ct', 'In Cent: 3 · 100 + 45 = 345 ct', 'Achtung: 3,05 € = 305 ct'], beispiel: '250 ct = 2,50 €' },
      gen: (r) => viele(10, (i) => { const ct = zw(r, 105, 1995); return i % 2 ? { t: euro(ct) + ' € = ___ ct', a: [String(ct)] } : { t: ct + ' ct = ___ €', a: [euro(ct)], tipp: 'Zwei Stellen nach dem Komma sind die Cent.' }; }) },
    { id: 'm4-einkaufen', titel: 'Einkaufen: zusammenzählen',
      erkl: { idee: 'Euro zu Euro, Cent zu Cent.', schritte: ['Erst die Euro', 'Dann die Cent', 'Mehr als 100 ct? Das ist 1 Euro mehr'], beispiel: '2,80 € + 1,50 € → 3 € und 130 ct → 4,30 €' },
      gen: (r) => viele(8, () => { const a = zw(r, 10, 99) * 10, b = zw(r, 10, 99) * 10; return { t: euro(a) + ' € + ' + euro(b) + ' € = ___ €', a: [euro(a + b)] }; }) },
    { id: 'm4-rueckgeld', titel: 'Rückgeld',
      erkl: { idee: 'Rückgeld = bezahlt minus Preis. Oder: vom Preis aus hochzählen.', schritte: ['Preis 6,40 €, bezahlt 10 €', 'Bis 7 € fehlen 0,60 €', 'Bis 10 € fehlen 3 € → 3,60 €'], beispiel: 'Du zahlst 20 € für 13,25 € → 6,75 € zurück' },
      gen: (r) => viele(8, () => { const schein = [5, 10, 20, 50][zw(r, 0, 3)] * 100, preis = zw(r, Math.floor(schein / 300), schein / 10 - 1) * 10 - zw(r, 0, 1) * 5; return { t: 'Preis ' + euro(preis) + ' €, du zahlst ' + euro(schein).replace(',00', '') + ' €. Zurück: ___ €', a: [euro(schein - preis)], tipp: 'Zähl vom Preis hoch bis ' + schein / 100 + ' €.' }; }) },
  ] },
  { nr: 5, titel: 'Messen und Zeit', ziele: ['Längen und Gewichte umrechnen', 'Zeitspannen berechnen', 'Uhrzeiten lesen'], blaetter: [
    { id: 'm5-laengen', titel: 'Längen: km, m, cm',
      erkl: { idee: 'Einheiten sind wie Treppenstufen.', schritte: ['1 m = 100 cm', '1 km = 1000 m', 'Größere Einheit → kleinere: mal', 'Kleinere → größere: geteilt'], beispiel: '3 m = 300 cm · 2500 m = 2,5 km' },
      gen: (r) => viele(10, (i) => { const n = zw(r, 2, 9);
        return [{ t: n + ' m = ___ cm', a: [String(n * 100)] }, { t: n + ' km = ___ m', a: [String(n * 1000)] }, { t: n * 100 + ' cm = ___ m', a: [String(n)] }, { t: n * 1000 + ' m = ___ km', a: [String(n)] }, { t: n + ' kg = ___ g', a: [String(n * 1000)] }][i % 5]; }) },
    { id: 'm5-zeit', titel: 'Zeitspannen',
      erkl: { idee: 'Rechne in Schritten bis zur vollen Stunde.', schritte: ['Von 8:40 bis 9:00 = 20 min', 'Von 9:00 bis 9:15 = 15 min', 'Zusammen 35 min'], beispiel: 'Der Bus fährt 7:48 ab und ist 8:10 da → 22 Minuten' },
      gen: (r) => viele(8, () => { const h = zw(r, 7, 15), m1 = zw(r, 2, 11) * 5, dauer = zw(r, 3, 14) * 5; const ende = h * 60 + m1 + dauer; const uhr = (min) => Math.floor(min / 60) + ':' + String(min % 60).padStart(2, '0');
        return { t: 'Von ' + uhr(h * 60 + m1) + ' bis ' + uhr(ende) + ' sind es ___ Minuten.', a: [String(dauer)] }; }) },
    { id: 'm5-stunden', titel: 'Stunden und Minuten',
      erkl: { idee: '1 Stunde = 60 Minuten. 1 Minute = 60 Sekunden.', schritte: ['Halbe Stunde = 30 min', 'Viertelstunde = 15 min', 'Dreiviertelstunde = 45 min'], beispiel: '2 h 15 min = 120 + 15 = 135 min' },
      gen: (r) => viele(8, (i) => { const h = zw(r, 1, 4), m = zw(r, 1, 11) * 5;
        return [{ t: h + ' h = ___ min', a: [String(h * 60)] }, { t: h + ' h ' + m + ' min = ___ min', a: [String(h * 60 + m)] }, { t: (h * 60 + m) + ' min = ___ h ___ min', a: [String(h), String(m)] }, { t: h + ' min = ___ s', a: [String(h * 60)] }][i % 4]; }) },
  ] },
  { nr: 6, titel: 'Brüche, Prozent, Fläche', ziele: ['Halbe, Viertel, Drittel von Mengen', 'Einfache Prozente (10 %, 25 %, 50 %)', 'Umfang und Fläche vom Rechteck'], blaetter: [
    { id: 'm6-brueche', titel: 'Bruchteile von Mengen',
      erkl: { idee: 'Ein Viertel von 20 heißt: 20 in 4 gleiche Teile.', schritte: ['Nenner (unten): in so viele Teile teilen', 'Zähler (oben): so viele Teile nehmen'], beispiel: '3/4 von 20 → 20 : 4 = 5 → 3 · 5 = 15' },
      gen: (r) => viele(10, (i) => { const n = [2, 3, 4, 5, 10][i % 5], z = i < 5 ? 1 : zw(r, 1, n - 1), teil = zw(r, 2, 12), menge = teil * n;
        return { t: (z === 1 ? '1/' + n : z + '/' + n) + ' von ' + menge + ' = ___', a: [String(z * teil)], tipp: menge + ' : ' + n + ' = ' + teil + (z > 1 ? ', dann · ' + z : '') }; }) },
    { id: 'm6-prozent', titel: 'Prozente: 10 %, 25 %, 50 %',
      erkl: { idee: 'Prozent heißt „von hundert“.', schritte: ['50 % = die Hälfte', '25 % = ein Viertel', '10 % = durch 10'], beispiel: 'Jacke 60 €, 25 % Rabatt → 60 : 4 = 15 € weniger → 45 €' },
      gen: (r) => viele(8, (i) => { const p = [10, 25, 50][i % 3], wert = zw(r, 2, 20) * 20; const w = wert * p / 100;
        return i < 6 ? { t: p + ' % von ' + wert + ' € = ___ €', a: [fmt(w)] } : { t: 'Preis ' + wert + ' €, ' + p + ' % Rabatt. Neuer Preis: ___ €', a: [fmt(wert - w)] }; }) },
    { id: 'm6-flaeche', titel: 'Umfang und Fläche (Rechteck)',
      erkl: { idee: 'Umfang = einmal rundherum. Fläche = wie viele Quadrate passen hinein.', schritte: ['Umfang = 2 · Länge + 2 · Breite', 'Fläche = Länge · Breite', 'Fläche hat „hoch 2“: m²'], beispiel: 'Zimmer 5 m × 4 m → Umfang 18 m · Fläche 20 m²' },
      gen: (r) => viele(8, (i) => { const l = zw(r, 3, 12), b = zw(r, 2, Math.min(9, l)); return i % 2 ? { t: 'Rechteck ' + l + ' m × ' + b + ' m: Fläche = ___ m²', a: [String(l * b)] } : { t: 'Rechteck ' + l + ' m × ' + b + ' m: Umfang = ___ m', a: [String(2 * l + 2 * b)] }; }) },
  ] },
];

// Ein Blatt mit frischen Zahlen (Startwert: z. B. Zeit). Gibt das Format für ui.arbeitsblatt zurück.
export function matheBlatt(modul, blattId, seed = Date.now()) {
  const m = MATHE.find((x) => x.nr === modul), b = m && m.blaetter.find((x) => x.id === blattId);
  if (!b) return null;
  const r = zufall(seed);
  return { id: b.id, modul: 'Mathe · Modul ' + m.nr, titel: b.titel, untertitel: m.titel, erkl: b.erkl, info: [], aufgaben: b.gen(r) };
}
