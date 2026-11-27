// Bilder für die kompakten Mathe-Hefte (Module 1, 4–9): je Lektion ein Bild zur Regel (grafik / grafikUnten)
// und eine Übung mit Bild (hinten) – Rückmeldung der Mathelehrerin: „die schönen Übungen mit Bildern“.
// Alle Geometrie in Originalgröße (mm), damit man nachmessen kann. Lösungen stehen in loes (Lösungsheft).
// Schlüssel: Nummer der Lektion im Modul (ab 1), wie EXTRA in mathe-kompakt.mjs.

// ---------- kleine Helfer ----------
const auf = (stufe, text) => ({ art: 'aufgabe', stufe, text })
const sp = (links, rechts, verhaeltnis = '1:1') => ({ art: 'spalten', zusammen: true, verhaeltnis, links, rechts })
const pk = (items, spalten = 1, buchstaben = true) => ({ art: 'paeckchen', spalten, items, buchstaben })
const ueb = (bausteine, ...loes) => ({ bausteine, loes: [loes.join(' – ')] })
const geo = (felder, spalten) => ({ art: 'geo', felder, ...(spalten ? { spalten } : {}) })
const tab = (spalten, werte, extra = {}) => ({ art: 'tabelle', spalten, zeilen: 0, werte, ...extra })
const r2 = (v) => Math.round(v * 100) / 100

// Kreis als Vieleck (40 Ecken) – im Druck rund
const kreis = (cx, cy, r, n = 40) => ({ t: 'vieleck', punkte: Array.from({ length: n }, (_, i) => [r2(cx + r * Math.cos((2 * Math.PI * i) / n)), r2(cy + r * Math.sin((2 * Math.PI * i) / n))]) })
const ellipse = (cx, cy, rx, ry, n = 40) => ({ t: 'vieleck', punkte: Array.from({ length: n }, (_, i) => [r2(cx + rx * Math.cos((2 * Math.PI * i) / n)), r2(cy + ry * Math.sin((2 * Math.PI * i) / n))]) })
const txt = (x, y, text, o = {}) => ({ t: 'text', x, y, text, ...o })
const pt = (name, x, y, lage = 'o') => ({ t: 'punkt', name, x, y, lage })
const st = (von, bis, o = {}) => ({ t: 'linie', von, bis, ...o })

// Koordinatensystem auf Karo (1 Einheit = e mm, Achsen auf den Karolinien)
function koord({ nx = 6, ny = 6, e = 10, punkte = [], linien = [], namen = ['x', 'y'], marken = (i) => String(i), markenY, label, text } = {}) {
  const x0 = 10, y0 = 5 + ny * e
  const P = (x, y) => [r2(x0 + x * e), r2(y0 - y * e)]
  const el = [st([x0, y0], [x0 + nx * e + 6, y0], { stil: 'dick' }), st([x0, y0], [x0, 2], { stil: 'dick' })]
  for (let i = 1; i <= nx; i++) el.push(txt(x0 + i * e, y0 + 5, marken(i), { klein: true, mitte: true }))
  for (let j = 1; j <= ny; j++) el.push(txt(x0 - 4, y0 - j * e + 1, (markenY || marken)(j), { klein: true, mitte: true }))
  el.push(txt(x0 - 3, y0 + 5, '0', { klein: true, mitte: true }), txt(x0 + nx * e + 7, y0 + 5, namen[0], { klein: true, fett: true, mitte: true }), txt(x0 + 4, 4, namen[1], { klein: true, fett: true }))
  for (const [a, b, o] of linien) el.push(st(P(...a), P(...b), o || {}))
  for (const [n, x, y, lage] of punkte) el.push(pt(n, ...P(x, y), lage || 'or'))
  return { b: x0 + nx * e + 10, h: y0 + 8, raster: 'karo', elemente: el, ...(label ? { label } : {}), ...(text !== undefined ? { text } : {}) }
}

// Quader schräg von vorne (Kavalier), mit Würfel-Linien: l × b × h Würfel, Kante e mm, vorne links unten bei (x, y)
function quader(l, b, h, e = 8, { x = 6, y, gitter = true, masse } = {}) {
  const dx = r2(b * e * 0.45), dy = r2(b * e * 0.35), Y = y ?? r2(dy + h * e + 4), X = x
  const L = l * e, H = h * e, top = Y - H
  const el = [
    { t: 'vieleck', punkte: [[X, top], [X + L, top], [X + L, Y], [X, Y]] },
    { t: 'vieleck', punkte: [[X, top], [X + L, top], [r2(X + L + dx), r2(top - dy)], [r2(X + dx), r2(top - dy)]], fuellung: true },
    { t: 'vieleck', punkte: [[X + L, top], [r2(X + L + dx), r2(top - dy)], [r2(X + L + dx), r2(Y - dy)], [X + L, Y]], fuellung: true },
  ]
  if (gitter) {
    for (let i = 1; i < l; i++) el.push(st([X + i * e, top], [X + i * e, Y]), st([X + i * e, top], [r2(X + i * e + dx), r2(top - dy)]))
    for (let j = 1; j < h; j++) el.push(st([X, top + j * e], [X + L, top + j * e]), st([X + L, top + j * e], [r2(X + L + dx), r2(top + j * e - dy)]))
    for (let k = 1; k < b; k++) {
      const ox = r2((k * dx) / b), oy = r2((k * dy) / b)
      el.push(st([X + ox, top - oy], [X + L + ox, top - oy]), st([X + L + ox, top - oy], [X + L + ox, Y - oy]))
    }
  }
  if (masse) el.push(txt(X + L / 2, Y + 5, masse[0], { klein: true, mitte: true }), txt(r2(X + L + dx + 2), r2(top + H / 2 - dy / 2), masse[2]), txt(r2(X + L + dx / 2 + 2), r2(top - dy / 2 - 1), masse[1], { klein: true }))
  return { el, B: r2(X + L + dx + (masse ? 16 : 4)), H: r2(Y + (masse ? 8 : 4)) }
}

// Algebra-Kacheln: x² (Quadrat), x (Streifen), 1 (kleines Quadrat) in einer Reihe ab (x, y)
function kacheln(n2, n1, n0, x = 4, y = 4, { a = 16, k = 6 } = {}) {
  const el = []
  for (let i = 0; i < n2; i++) { el.push({ t: 'vieleck', punkte: [[x, y], [x + a, y], [x + a, y + a], [x, y + a]], fuellung: true }, txt(x + a / 2, y + a / 2 + 1.5, 'x²', { mitte: true, fett: true })); x += a + 3 }
  for (let i = 0; i < n1; i++) { el.push({ t: 'vieleck', punkte: [[x, y], [x + k, y], [x + k, y + a], [x, y + a]] }, txt(x + k / 2, y + a / 2 + 1.5, 'x', { mitte: true })); x += k + 3 }
  for (let i = 0; i < n0; i++) { el.push({ t: 'vieleck', punkte: [[x, y + a - k], [x + k, y + a - k], [x + k, y + a], [x, y + a]] }, txt(x + k / 2, y + a - k / 2 + 1.5, '1', { mitte: true, klein: true })); x += k + 3 }
  return { el, ende: x }
}

// Flächenmodell für a · (b + c): Rechteck geteilt, Beschriftung oben und links
function flaechenModell(links, teile, { e = 1, h = 22, x0 = 14, y0 = 10, innen = [] } = {}) {
  const el = []; let x = x0
  teile.forEach(([name, w], i) => {
    el.push({ t: 'vieleck', punkte: [[x, y0], [x + w, y0], [x + w, y0 + h], [x, y0 + h]], fuellung: i % 2 === 0 }, txt(x + w / 2, y0 - 2.5, name, { mitte: true, fett: true }))
    if (innen[i] !== undefined) el.push(txt(x + w / 2, y0 + h / 2 + 1.5, innen[i], { mitte: true }))
    x += w
  })
  el.push(txt(x0 - 6, y0 + h / 2 + 1.5, links, { mitte: true, fett: true }))
  return { el, B: x + 4, H: y0 + h + 4 }
}

// Stellentafel für ganze Zahlen bis 999 999
const GANZ = (zeilen) => ({ art: 'stellentafel', stellen: ['HT', 'ZT', 'T', 'H', 'Z', 'E'], komma: -1,
  gruppen: [{ titel: 'Tausender', spalten: 3 }, { titel: 'Einer', spalten: 3 }],
  namen: ['Hundert-\ntausender', 'Zehn-\ntausender', 'Tausender', 'Hunderter', 'Zehner', 'Einer'], zeilen: zeilen.map((z) => ({ ...z, ...(z.zahl ? { bis: 5 } : {}) })) })

// Uhr in einem Feld
const uhr = (h, m, label) => ({ b: 36, h: 40, label, text: '', elemente: [{ t: 'uhr', x: 18, y: 19, r: 16, h, m }] })

// Rechteck/Vieleck mit Seiten
const vieleck = (punkte, o = {}) => ({ t: 'vieleck', punkte, ...o })

export const BILDER = {
  // ===================================================================== Modul 1
  1: {
    1: {
      grafikUnten: [GANZ([{ label: '352 418', zahl: '352418' }, { label: '70 305', zahl: '70305' }])],
      hinten: [ueb([
        auf(1, 'Trag die Zahlen in die Stellentafel ein. Dann: Was ist die 6 in jeder Zahl wert?'),
        GANZ([{ label: 'a) 461 207' }, { label: 'b) 36 018' }, { label: 'c) 600 450' }]),
        pk(['In a) ist die 6 ___ wert.', 'In b) ist die 6 ___ wert.', 'In c) ist die 6 ___ wert.'], 1, false),
      ], 'a) 60 000 (Zehntausender)', 'b) 6 000 (Tausender)', 'c) 600 000 (Hunderttausender)')],
    },
    2: {
      grafikUnten: [GANZ([{ label: '45 312', zahl: '45312' }, { label: '45 132', zahl: '45132' }]),
        { art: 'text', text: 'Von links vergleichen: Zehntausender gleich (4), Tausender gleich (5), Hunderter: 3 > 1. Also 45 312 > 45 132.' }],
      hinten: [ueb([
        auf(1, 'Welche Zahl zeigt jeder Pfeil? Schreib sie in die Kästchen. Ordne dann von klein nach groß.'),
        { art: 'zahlenstrahl', von: '0', bis: '10000', schritt: '1000', fein: '500', punkte: [{ wert: '6500' }, { wert: '1500' }, { wert: '8500' }, { wert: '4000' }] },
        pk(['___ < ___ < ___ < ___', '6500 [] 4000', '1500 [] 8500', '9000 [] 9000'], 1, true),
      ], 'Pfeile (von links): 1500 · 4000 · 6500 · 8500', 'geordnet: 1500 < 4000 < 6500 < 8500', '6500 > 4000 · 1500 < 8500 · 9000 = 9000')],
    },
    3: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '4000', bis: '5000', schritt: '100', fein: '50', punkte: [{ wert: '4380', name: '4380' }] },
        { art: 'text', text: '4380 liegt näher bei 4000 als bei 5000. Auf Tausender gerundet: 4380 ≈ 4000. Auf Hunderter: 4380 ≈ 4400.' }],
      hinten: [ueb([
        auf(1, 'Lies die Zahlen an den Pfeilen ab. Runde sie dann auf Hunderter.'),
        { art: 'zahlenstrahl', von: '300', bis: '400', schritt: '10', punkte: [{ wert: '320' }, { wert: '350' }, { wert: '380' }] },
        pk(['erster Pfeil: ___ ≈ ___', 'zweiter Pfeil: ___ ≈ ___', 'dritter Pfeil: ___ ≈ ___'], 3, false),
      ], '320 ≈ 300', '350 ≈ 400 (bei 5 wird aufgerundet)', '380 ≈ 400')],
    },
    4: {
      grafik: [tab(['Vorgänger', 'Zahl', 'Nachfolger'], [['4 999', '5 000', '5 001'], ['99 999', '100 000', '100 001']])],
      hinten: [ueb([
        auf(1, 'Ergänze die Tabelle. Vorgänger = 1 weniger, Nachfolger = 1 mehr.'),
        tab(['Vorgänger', 'Zahl', 'Nachfolger'], [['', '38 000', ''], ['', '100 000', ''], ['59 999', '', ''], ['', '', '250 000'], ['', '909 090', '']]),
      ], '37 999 | 38 000 | 38 001', '99 999 | 100 000 | 100 001', '59 999 | 60 000 | 60 001', '249 998 | 249 999 | 250 000', '909 089 | 909 090 | 909 091')],
    },
    5: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '0', bis: '1000', schritt: '100', fein: '50', punkte: [{ wert: '450', name: '450' }, { wert: '750', name: '750' }] },
        { art: 'text', text: 'Von 450 springst du 300 weiter: 450 + 300 = 750. Zurück geht es mit minus: 750 − 300 = 450.' }],
      hinten: [ueb([
        auf(1, 'Lies die Zahlen an den Pfeilen ab. Rechne dann mit ihnen.'),
        { art: 'zahlenstrahl', von: '0', bis: '1000', schritt: '100', fein: '50', punkte: [{ wert: '250' }, { wert: '600' }, { wert: '850' }, { wert: '950' }] },
        pk(['Von der ersten bis zur zweiten Zahl sind es ___', 'dritte Zahl − zweite Zahl = ___', 'vierte Zahl + ___ = 1000', 'erste Zahl + vierte Zahl = ___'], 1, true),
      ], 'Pfeile: 250 · 600 · 850 · 950', 'a) 350 · b) 250 · c) 50 · d) 1200')],
    },
    6: {
      grafik: [{ art: 'rechnungen', items: [{ label: 'Beispiel', zeilen: ['4586', '2347'], op: '+', ergebnis: '6933' }] }],
      hinten: [ueb([
        auf(2, 'Ein Fahrradladen. Rechne schriftlich, Stelle unter Stelle.'),
        sp([{ art: 'bon', titel: 'Fahrrad-Laden', posten: [{ text: 'Fahrrad', preis: '489,00 €' }, { text: 'Helm', preis: '64,00 €' }, { text: 'Schloss', preis: '38,00 €' }], fuss: 'Wie viel kostet alles zusammen?' }],
          [{ art: 'rechnungen', items: [{ label: 'a) alles zusammen', zeilen: ['489', '64', '38'], op: '+' }] }]),
        pk(['b) Du hast 650 €. Was bleibt? 650 − ___ = ___ €'], 1, false),
      ], 'a) 489 + 64 + 38 = 591 €', 'b) 650 − 591 = 59 €')],
    },
    7: {
      grafikUnten: [{ art: 'kommasprung', spalten: 2, items: [{ zahl: '45', op: '·', faktor: 100, ergebnis: '4500', label: 'mal 100: zwei Nullen dazu', boegen: true }, { zahl: '7000', op: ':', faktor: 1000, ergebnis: '7', label: 'geteilt durch 1000: drei Nullen weg', boegen: true }] }],
      hinten: [ueb([
        auf(1, 'Rechne. Zeichne die Sprünge ein wie im Beispiel.'),
        { art: 'kommasprung', spalten: 3, items: [{ zahl: '37', op: '·', faktor: 10, label: 'a)' }, { zahl: '52', op: '·', faktor: 100, label: 'b)' }, { zahl: '8', op: '·', faktor: 1000, label: 'c)' }, { zahl: '4500', op: ':', faktor: 10, label: 'd)' }, { zahl: '6000', op: ':', faktor: 100, label: 'e)' }, { zahl: '9000', op: ':', faktor: 1000, label: 'f)' }] },
      ], 'a) 370 · b) 5200 · c) 8000 · d) 450 · e) 60 · f) 9')],
    },
    8: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'menge', anzahl: 24, gruppen: 4, text: '4 Gruppen mit je 6: 4 · 6 = 24' }] }],
      hinten: [ueb([
        auf(1, 'Schreib die Malaufgabe zum Bild: Wie viele Gruppen? Wie viele in jeder Gruppe?'),
        { art: 'bruchbilder', spalten: 3, items: [{ form: 'menge', anzahl: 15, gruppen: 3, label: 'a)', text: '' }, { form: 'menge', anzahl: 28, gruppen: 4, label: 'b)', text: '' }, { form: 'menge', anzahl: 18, gruppen: 6, label: 'c)', text: '' }] },
      ], 'a) 3 · 5 = 15', 'b) 4 · 7 = 28', 'c) 6 · 3 = 18')],
    },
    9: {
      grafik: [geo([{ h: 30, elemente: [st([4, 8], [69, 8], { stil: 'dick', mass: '6 cm 5 mm = 65 mm' }), { t: 'lineal', x0: 4, y: 14, cm: 7 }] }])],
      hinten: [ueb([
        auf(1, 'Miss die Strecken genau mit dem Lineal (Blatt in 100 % gedruckt). Schreib in cm und in mm.'),
        geo([{ h: 36, text: '', elemente: [pt('A', 6, 8, 'l'), pt('B', 46, 8, 'r'), st('A', 'B'), pt('C', 6, 20, 'l'), pt('D', 81, 20, 'r'), st('C', 'D'), pt('E', 6, 32, 'l'), pt('F', 58, 32, 'r'), st('E', 'F')] }]),
        pk(['AB = ___ cm = ___ mm', 'CD = ___ cm = ___ mm', 'EF = ___ cm = ___ mm'], 3, false),
      ], 'AB = 4 cm = 40 mm', 'CD = 7,5 cm = 75 mm', 'EF = 5,2 cm = 52 mm')],
    },
    10: {
      grafik: [{ art: 'bon', titel: 'Bäckerei', posten: [{ text: 'Brot', preis: '2,40 €' }, { text: '2 Croissants', preis: '2,60 €' }], summe: '5,00 €', fuss: 'gegeben 10 € – zurück 5,00 €' }],
      hinten: [ueb([
        auf(2, 'Einkauf im Supermarkt. Rechne die Summe aus. Du zahlst mit 10 €. Wie viel bekommst du zurück?'),
        sp([{ art: 'bon', titel: 'Supermarkt', posten: [{ text: 'Milch', preis: '1,15 €' }, { text: 'Äpfel', preis: '3,25 €' }, { text: 'Brot', preis: '2,40 €' }], fuss: 'Summe: ? – gegeben: 10 €' }],
          [pk(['Summe: ___ €', 'Rückgeld: 10 € − ___ € = ___ €', 'Reicht das Rückgeld für ein Eis (2,50 €)? ___'], 1, true)]),
      ], 'Summe 6,80 €', 'Rückgeld 3,20 €', 'ja, es bleiben 0,70 €')],
    },
    11: {
      grafik: [geo([{ b: 40, h: 40, text: '7:45 Uhr – Viertel vor acht', elemente: [{ t: 'uhr', x: 20, y: 19, r: 17, h: 7, m: 45 }] }])],
      hinten: [ueb([
        auf(1, 'Wie spät ist es? Schreib die Uhrzeit darunter.'),
        geo([uhr(3, 0, 'a)'), uhr(8, 30, 'b)'), uhr(10, 15, 'c)'), uhr(5, 45, 'd)')], 4),
        pk(['Von b) bis c) vergehen ___ Stunden und ___ Minuten.'], 1, false),
      ], 'a) 3:00 · b) 8:30 · c) 10:15 · d) 5:45', 'von 8:30 bis 10:15: 1 Stunde 45 Minuten')],
    },
    12: {
      grafik: [geo([{ h: 34, elemente: [vieleck([[4, 6], [28, 6], [28, 30], [4, 30]], { rechte: [0, 1, 2, 3] }), txt(16, 33, 'Quadrat', { mitte: true, klein: true }),
        vieleck([[34, 10], [72, 10], [72, 30], [34, 30]], { rechte: [0, 1, 2, 3] }), txt(53, 33, 'Rechteck', { mitte: true, klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Wie heißen die Figuren? Vorsicht bei d) – drehe das Blatt im Kopf.'),
        geo([{ b: 36, h: 34, label: 'a)', text: '', elemente: [vieleck([[4, 8], [36, 8], [36, 26], [4, 26]])] },
          { b: 36, h: 34, label: 'b)', text: '', elemente: [vieleck([[4, 28], [36, 28], [20, 4]])] },
          { b: 36, h: 34, label: 'c)', text: '', elemente: [vieleck([[8, 4], [32, 4], [32, 28], [8, 28]])] },
          { b: 36, h: 34, label: 'd)', text: '', elemente: [vieleck([[20, 3], [33, 16], [20, 29], [7, 16]])] }], 4),
      ], 'a) Rechteck · b) Dreieck · c) Quadrat · d) Quadrat (nur gedreht: vier gleich lange Seiten, vier rechte Winkel)')],
    },
    13: {
      grafik: [geo([{ b: 60, h: 46, elemente: [kreis(30, 23, 20), pt('M', 30, 23, 'u'), st([30, 23], [50, 23], { mass: 'r = 2 cm' }), st([10, 23], [30, 23], { stil: 'gestrichelt' }), txt(30, 45, 'Durchmesser d = 4 cm', { mitte: true, klein: true })] }])],
      hinten: [ueb([
        auf(1, 'Miss den Radius. Berechne den Durchmesser: d = 2 · r.'),
        geo([{ b: 50, h: 46, label: 'a)', elemente: [kreis(25, 22, 15), pt('M', 25, 22, 'u'), st([25, 22], [40, 22])] },
          { b: 60, h: 46, label: 'b)', elemente: [kreis(30, 22, 20), pt('M', 30, 22, 'u'), st([30, 22], [r2(30 + 20 * Math.cos(-0.8)), r2(22 + 20 * Math.sin(-0.8))])] }], 2),
        pk(['a) r = ___ cm   d = ___ cm', 'b) r = ___ cm   d = ___ cm'], 2, false),
      ], 'a) r = 1,5 cm, d = 3 cm', 'b) r = 2 cm, d = 4 cm')],
    },
    14: {
      grafik: [geo([{ b: 60, h: 40, raster: 'karo', elemente: [vieleck([[15, 35], [15, 20], [30, 10], [45, 20], [45, 35]]), st([30, 2], [30, 38], { stil: 'gestrichelt', name: 'Achse' })] }])],
      hinten: [ueb([
        auf(2, 'Ergänze das Spiegelbild an der Achse (gestrichelt). Zähle die Kästchen: Jede Ecke ist gleich weit von der Achse entfernt.'),
        geo([{ b: 80, h: 50, raster: 'karo', elemente: [st([40, 2], [40, 48], { stil: 'gestrichelt' }), st([40, 10], [25, 10]), st([25, 10], [25, 25]), st([25, 25], [15, 25]), st([15, 25], [15, 40]), st([15, 40], [40, 40])] }]),
      ], 'Spiegelbild: rechts von der Achse dieselbe Form – 15 mm, 25 mm usw. auf der anderen Seite (Ecken bei x = 55 und 65 mm)')],
    },
  },

  // ===================================================================== Modul 4
  4: {
    1: {
      grafik: [tab(['Zahl', ': 2', ': 5', ': 10'], [['340', 'ja', 'ja', 'ja'], ['45', 'nein', 'ja', 'nein'], ['78', 'ja', 'nein', 'nein']])],
      hinten: [ueb([
        auf(1, 'Schau nur auf die letzte Ziffer. Schreib ja oder nein.'),
        tab(['Zahl', 'durch 2', 'durch 5', 'durch 10'], [['120', '', '', ''], ['85', '', '', ''], ['64', '', '', ''], ['300', '', '', ''], ['97', '', '', ''], ['1 005', '', '', '']]),
      ], '120: ja, ja, ja', '85: nein, ja, nein', '64: ja, nein, nein', '300: ja, ja, ja', '97: nein, nein, nein', '1 005: nein, ja, nein')],
    },
    2: {
      grafik: [tab(['Zahl', 'Quersumme', ': 3', ': 9'], [['252', '2 + 5 + 2 = 9', 'ja', 'ja'], ['714', '7 + 1 + 4 = 12', 'ja', 'nein']])],
      hinten: [ueb([
        auf(1, 'Rechne die Quersumme. Ist die Zahl durch 3 teilbar? Durch 9?'),
        tab(['Zahl', 'Quersumme', 'durch 3', 'durch 9'], [['135', '', '', ''], ['408', '', '', ''], ['621', '', '', ''], ['1 000', '', '', ''], ['2 457', '', '', '']], { breiten: [1, 2, 1, 1] }),
      ], '135: 9 – ja, ja', '408: 12 – ja, nein', '621: 9 – ja, ja', '1 000: 1 – nein, nein', '2 457: 18 – ja, ja')],
    },
    3: {
      grafik: [tab(['Teiler', 'Regel'], [['4', 'die letzten zwei Ziffern durch 4'], ['6', 'durch 2 und durch 3'], ['25', 'endet auf 00, 25, 50, 75']], { breiten: [1, 3] })],
      hinten: [ueb([
        auf(3, 'Teilbarkeits-Detektiv: Kreuze an, wodurch die Zahl teilbar ist.'),
        tab(['Zahl', '2', '3', '4', '5', '6', '9', '10', '25'], [['120', '', '', '', '', '', '', '', ''], ['75', '', '', '', '', '', '', '', ''], ['216', '', '', '', '', '', '', '', ''], ['450', '', '', '', '', '', '', '', '']], { breiten: [2, 1, 1, 1, 1, 1, 1, 1, 1] }),
      ], '120: 2, 3, 4, 5, 6, 10', '75: 3, 5, 25', '216: 2, 3, 4, 6, 9', '450: 2, 3, 5, 6, 9, 10, 25')],
    },
    4: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'kreis', teile: 4, gefaerbt: 3, bruch: '3/4', text: '3 von 4 gleichen Teilen' }] }],
      hinten: [ueb([
        auf(1, 'Welcher Bruch ist gefärbt? Schreib Zähler und Nenner. Bei e): Ist das ein Viertel?'),
        { art: 'bruchbilder', spalten: 4, items: [{ form: 'kreis', teile: 8, gefaerbt: 3, label: 'a)', bruch: '' }, { form: 'rechteck', teile: 6, gefaerbt: 5, label: 'b)', bruch: '' }, { form: 'streifen', teile: 5, gefaerbt: 2, label: 'c)', bruch: '' }, { form: 'kreis', teile: 3, gefaerbt: 1, label: 'd)', bruch: '' }] },
        { art: 'bruchbilder', spalten: 2, items: [{ form: 'kreis', teile: 4, gefaerbt: 1, ungleich: true, label: 'e)', ankreuzen: ['ein Viertel', 'kein Viertel'] }] },
      ], 'a) 3/8 · b) 5/6 · c) 2/5 · d) 1/3', 'e) kein Viertel – die Teile sind nicht gleich groß')],
    },
    5: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'wand', nenner: [1, 2, 4, 8] }] }],
      hinten: [ueb([
        auf(2, 'Der Strahl von 0 bis 1 ist in Achtel geteilt. Welcher Bruch steht an jedem Pfeil? Vergleiche dann.'),
        { art: 'zahlenstrahl', von: '0', bis: '1', schritt: '1', fein: '0,125', punkte: [{ wert: '0,25' }, { wert: '0,5' }, { wert: '0,875' }] },
        pk(['erster Pfeil: ___ Achtel = ___ Viertel', 'zweiter Pfeil: ___ Achtel = ___ Hälfte', 'dritter Pfeil: ___ Achtel', '#3/8# [] #5/8#', '#1/2# [] #3/8#', '#7/8# [] #3/4#'], 3, true),
      ], 'Pfeile: 2/8 = 1/4 · 4/8 = 1/2 · 7/8', '3/8 < 5/8 · 1/2 > 3/8 · 7/8 > 3/4')],
    },
    6: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'streifen', teile: 2, gefaerbt: 1, bruch: '1/2' }, { form: 'streifen', teile: 4, gefaerbt: 2, bruch: '2/4' }, { form: 'streifen', teile: 8, gefaerbt: 4, bruch: '4/8' }] }],
      hinten: [ueb([
        auf(2, 'Kürze: Welcher einfache Bruch zeigt denselben Teil? Schreib beide Brüche.'),
        { art: 'bruchbilder', spalten: 4, items: [{ form: 'rechteck', teile: 6, gefaerbt: 4, label: 'a)', text: '' }, { form: 'streifen', teile: 10, gefaerbt: 5, label: 'b)', text: '' }, { form: 'kreis', teile: 8, gefaerbt: 6, label: 'c)', text: '' }, { form: 'kreis', teile: 12, gefaerbt: 4, label: 'd)', text: '' }] },
      ], 'a) 4/6 = 2/3 · b) 5/10 = 1/2 · c) 6/8 = 3/4 · d) 4/12 = 1/3')],
    },
    7: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'kreis', teile: 8, gefaerbt: 3, bruch: '3/8' }, { form: 'kreis', teile: 8, gefaerbt: 5, bruch: '5/8', text: '3/8 + 2/8 = 5/8' }] }],
      hinten: [ueb([
        auf(2, 'Male die Brüche in den Streifen an. Rechne dann. Der Nenner bleibt gleich.'),
        sp([{ art: 'bruchbilder', spalten: 1, items: [{ form: 'streifen', teile: 7, gefaerbt: 0, label: 'a)' }, { form: 'streifen', teile: 9, gefaerbt: 0, label: 'b)' }, { form: 'streifen', teile: 6, gefaerbt: 0, label: 'c)' }, { form: 'streifen', teile: 10, gefaerbt: 0, label: 'd)' }] }],
          [pk(['#2/7# + #3/7# = ___', '#7/9# − #4/9# = ___', '#1/6# + #4/6# = ___', '#9/10# − #3/10# = ___'], 1, true)]),
      ], 'a) 5/7 · b) 3/9 = 1/3 · c) 5/6 · d) 6/10 = 3/5')],
    },
    8: {
      grafik: [{ art: 'hunderterfeld', felder: [{ gefaerbt: 25, text: '25 von 100 = 0,25 = 1/4' }] }],
      hinten: [ueb([
        auf(2, 'Wie viel ist gefärbt? Schreib als Bruch (gekürzt) und als Dezimalzahl.'),
        { art: 'hunderterfeld', spalten: 4, felder: [{ gefaerbt: 50, label: 'a)' }, { gefaerbt: 75, label: 'b)' }, { gefaerbt: 10, label: 'c)' }, { gefaerbt: 5, label: 'd)' }] },
      ], 'a) 50/100 = 1/2 = 0,5', 'b) 75/100 = 3/4 = 0,75', 'c) 10/100 = 1/10 = 0,1', 'd) 5/100 = 1/20 = 0,05')],
    },
    9: {
      grafik: [{ art: 'hunderterfeld', felder: [{ gefaerbt: 30, text: '30 von 100 = 30 %' }] }],
      hinten: [ueb([
        auf(1, 'Wie viel Prozent sind gefärbt? Bei e): Male selbst 60 % an.'),
        { art: 'hunderterfeld', spalten: 4, felder: [{ gefaerbt: 45, label: 'a)' }, { gefaerbt: 80, label: 'b)' }, { gefaerbt: 5, label: 'c)' }, { gefaerbt: 100, label: 'd)' }] },
        sp([{ art: 'hunderterfeld', spalten: 2, felder: [{ gefaerbt: 0, label: 'e) 60 %', text: 'angemalt: 60 von 100' }] }], [{ art: 'text', text: 'Wie viel Prozent sind bei e) nicht angemalt?' }, { art: 'linien', anzahl: 1 }]),
      ], 'a) 45 % · b) 80 % · c) 5 % · d) 100 %', 'e) 60 Kästchen anmalen – 40 % bleiben weiß')],
    },
    10: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'streifen', teile: 10, gefaerbt: 2, text: '50 € in 10 Teile: 1 Teil = 10 % = 5 €. 20 % = 2 Teile = 10 €' }] }],
      hinten: [ueb([
        auf(2, 'Jeder Streifen hat 10 Teile, jeder Teil ist 10 %. Rechne erst 10 %, dann den Rest.'),
        { art: 'bruchbilder', spalten: 2, items: [{ form: 'streifen', teile: 10, gefaerbt: 3, label: 'a) 30 % von 80 €', text: '' }, { form: 'streifen', teile: 10, gefaerbt: 5, label: 'b) 50 % von 120 €', text: '' }, { form: 'streifen', teile: 10, gefaerbt: 1, label: 'c) 10 % von 45 €', text: '' }, { form: 'streifen', teile: 10, gefaerbt: 7, label: 'd) 70 % von 200 €', text: '' }] },
      ], 'a) 10 % = 8 € → 24 € · b) 10 % = 12 € → 60 € · c) 4,50 € · d) 10 % = 20 € → 140 €')],
    },
    11: {
      grafik: [tab(['Soldes', ''], [['Sneaker', '75,00 €'], ['Rabatt 20 %', '− 15,00 €'], ['neuer Preis', '60,00 €']])],
      hinten: [ueb([
        auf(2, 'Schlussverkauf. Rechne den Rabatt und den neuen Preis.'),
        sp([tab(['Jacke', ''], [['Preis', '90,00 €'], ['Rabatt 30 %', ''], ['neuer Preis', '']])],
          [tab(['Kopfhörer', ''], [['Preis', '40,00 €'], ['Rabatt 25 %', ''], ['neuer Preis', '']])]),
        pk(['Welches Angebot spart mehr Euro? ___'], 1, false),
      ], 'Jacke: Rabatt 27 € → 63 €', 'Kopfhörer: Rabatt 10 € → 30 €', 'die Jacke spart mehr (27 €)')],
    },
    12: {
      grafik: [{ art: 'bon', titel: 'Rechnung', posten: [{ text: 'Fahrradschloss netto', preis: '20,00 €' }, { text: 'MwSt 17 %', preis: '3,40 €' }], summe: '23,40 €' }],
      hinten: [ueb([
        auf(2, 'In Luxemburg kommen 17 % MwSt dazu. Rechne den Aufschlag und den Endpreis.'),
        sp([tab(['Kopfhörer', ''], [['netto', '50,00 €'], ['MwSt 17 %', ''], ['Endpreis', '']])],
          [tab(['Busfahrt', ''], [['Preis bisher', '4,00 €'], ['Erhöhung 10 %', ''], ['neuer Preis', '']])]),
      ], 'Kopfhörer: 8,50 € MwSt → 58,50 €', 'Busfahrt: 0,40 € → 4,40 €')],
    },
    13: {
      grafik: [geo([{ b: 84, h: 34, elemente: [vieleck([[4, 30], [30, 30], [4, 8]], { rechte: [0] }), txt(15, 33, 'rechtwinklig', { mitte: true, klein: true }),
        vieleck([[34, 30], [58, 30], [46, 9.2]]), txt(46, 33, 'gleichseitig', { mitte: true, klein: true }),
        vieleck([[62, 30], [82, 30], [56, 18]]), txt(70, 33, 'stumpfwinklig', { mitte: true, klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Wie heißt jedes Dreieck? Nach den Winkeln (spitz-, recht-, stumpfwinklig) und nach den Seiten (gleichschenklig, gleichseitig).'),
        geo([{ b: 36, h: 34, label: 'a)', text: '', elemente: [vieleck([[6, 28], [34, 28], [20, 6]])] },
          { b: 36, h: 34, label: 'b)', text: '', elemente: [vieleck([[6, 28], [30, 28], [6, 8]], { rechte: [0] })] },
          { b: 36, h: 34, label: 'c)', text: '', elemente: [vieleck([[4, 28], [36, 28], [r2(20), r2(28 - 27.7)]])] },
          { b: 36, h: 34, label: 'd)', text: '', elemente: [vieleck([[14, 28], [36, 28], [3, 14]])] }], 4),
      ], 'a) spitzwinklig, gleichschenklig · b) rechtwinklig · c) gleichseitig (alle Seiten 32 mm), spitzwinklig · d) stumpfwinklig')],
    },
    14: {
      grafik: [geo([{ b: 60, h: 36, elemente: [{ t: 'winkel', x: 10, y: 32, a1: 0, a2: 60, r: 30, marke: true, name: 'α = 60°' }] }])],
      hinten: [ueb([
        auf(2, 'Miss die Winkel mit dem Geodreieck. Schreib die Größe und die Art (spitz, recht, stumpf).'),
        geo([{ b: 36, h: 36, label: 'a)', text: '', elemente: [{ t: 'winkel', x: 6, y: 30, a1: 0, a2: 50, r: 30, marke: true }] },
          { b: 36, h: 36, label: 'b)', text: '', elemente: [{ t: 'winkel', x: 6, y: 30, a1: 0, a2: 90, r: 26, marke: true }] },
          { b: 36, h: 36, label: 'c)', text: '', elemente: [{ t: 'winkel', x: 22, y: 30, a1: 0, a2: 120, r: 16, marke: true }] },
          { b: 36, h: 36, label: 'd)', text: '', elemente: [{ t: 'winkel', x: 4, y: 30, a1: 0, a2: 35, r: 34, marke: true }] }], 4),
      ], 'a) 50°, spitz · b) 90°, recht · c) 120°, stumpf · d) 35°, spitz')],
    },
    15: {
      grafik: [geo([{ b: 70, h: 42, elemente: [vieleck([[6, 36], [64, 36], [24, 8]], { ecken: ['A', 'B', 'C'] }), st([24, 8], [24, 36], { stil: 'gestrichelt', mass: 'h' }), { t: 'winkel', x: 24, y: 36, a1: 0, a2: 90, r: 4, marke: true }, txt(44, 40, 'Grundseite c', { klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Zeichne die Höhe von C auf die Grundseite AB (Geodreieck: rechter Winkel). Miss sie.'),
        geo([{ b: 80, h: 48, label: 'a)', elemente: [vieleck([[10, 42], [70, 42], [30, 7]], { ecken: ['A', 'B', 'C'] })] },
          { b: 80, h: 48, label: 'b)', elemente: [vieleck([[10, 42], [60, 42], [45, 12]], { ecken: ['A', 'B', 'C'] })] }], 2),
        pk(['a) h = ___ cm', 'b) h = ___ cm'], 2, false),
      ], 'a) h = 3,5 cm', 'b) h = 3 cm')],
    },
    16: {
      grafik: [geo([{ b: 70, h: 40, raster: 'karo', elemente: [vieleck([[10, 35], [40, 35], [40, 15], [10, 15]]), vieleck([[10, 35], [40, 35], [25, 15]], { fuellung: true }), txt(25, 39, 'g = 3 cm', { mitte: true, klein: true }), txt(48, 26, 'h = 2 cm', { klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Jedes Kästchen ist 5 mm. Lies g und h ab. Berechne die Fläche: A = g · h : 2.'),
        geo([{ b: 70, h: 45, raster: 'karo', label: 'a)', elemente: [vieleck([[10, 40], [50, 40], [20, 10]], { fuellung: true })] },
          { b: 70, h: 45, raster: 'karo', label: 'b)', elemente: [vieleck([[10, 40], [60, 40], [60, 5]], { fuellung: true, rechte: [1] })] }], 2),
        pk(['a) g = ___  h = ___  A = ___', 'b) g = ___  h = ___  A = ___'], 1, false),
      ], 'a) g = 4 cm, h = 3 cm, A = 6 cm²', 'b) g = 5 cm, h = 3,5 cm, A = 8,75 cm²')],
    },
  },

  // ===================================================================== Modul 5
  5: {
    1: {
      grafik: [{ art: 'temperatur', von: -10, bis: 10, items: [{ wert: -4, label: 'am Morgen', text: '−4 °C' }] }],
      hinten: [ueb([
        auf(1, 'Lies die Temperaturen ab. Welche ist die kälteste?'),
        { art: 'temperatur', von: -10, bis: 10, spalten: 4, items: [{ wert: -6, label: 'a)', text: '' }, { wert: 3, label: 'b)', text: '' }, { wert: -1, label: 'c)', text: '' }, { wert: 0, label: 'd)', text: '' }] },
        pk(['Am kältesten ist es bei ___.'], 1, false),
      ], 'a) −6 °C · b) 3 °C · c) −1 °C · d) 0 °C', 'am kältesten: a) −6 °C')],
    },
    2: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '-10', bis: '10', schritt: '2', fein: '1', punkte: [{ wert: '-7', name: 'A' }, { wert: '3', name: 'B' }] },
        { art: 'text', text: 'Links ist kleiner: −7 < 3. Und −7 < −2, weil −7 weiter links liegt.' }],
      hinten: [ueb([
        auf(1, 'Welche Zahl zeigt jeder Pfeil? Vergleiche dann mit < oder >.'),
        { art: 'zahlenstrahl', von: '-10', bis: '10', schritt: '2', fein: '1', punkte: [{ wert: '-8' }, { wert: '-3' }, { wert: '2' }, { wert: '6' }] },
        pk(['−5 [] −2', '−8 [] 1', '0 [] −3', '−6 [] −9'], 4, true),
      ], 'Pfeile: −8 · −3 · 2 · 6', '−5 < −2 · −8 < 1 · 0 > −3 · −6 > −9')],
    },
    3: {
      grafik: [{ art: 'temperatur', von: -10, bis: 10, items: [{ wert: -3, ziel: 5, pfeil: true, text: '+ 8 °C' }] }],
      hinten: [ueb([
        auf(2, 'Um wie viel Grad steigt oder fällt die Temperatur? Zähle die Striche.'),
        { art: 'temperatur', von: -10, bis: 10, spalten: 4, items: [{ wert: -5, ziel: 2, pfeil: true, label: 'a)', text: '' }, { wert: 4, ziel: -3, pfeil: true, label: 'b)', text: '' }, { wert: -8, ziel: -2, pfeil: true, label: 'c)', text: '' }, { wert: 7, ziel: -2, pfeil: true, label: 'd)', text: '' }] },
      ], 'a) + 7 °C · b) − 7 °C · c) + 6 °C · d) − 9 °C')],
    },
    4: {
      grafik: [tab(['Hefte', '1', '2', '3', '4'], [['Preis in €', '1,50', '3,00', '4,50', '6,00']]), { art: 'text', text: 'Doppelt so viele Hefte → doppelter Preis: proportional.' }],
      hinten: [ueb([
        auf(2, 'Proportional oder nicht? Wenn ja: ergänze die Tabelle.'),
        tab(['Brötchen', '1', '2', '4', '8'], [['Preis in €', '0,40', '0,80', '', '']]),
        tab(['Alter (Jahre)', '1', '2', '3', '6'], [['Größe in cm', '75', '87', '95', '?']]),
        pk(['Brötchen: proportional? ___', 'Alter und Größe: proportional? ___'], 2, false),
      ], 'Brötchen: ja – 1,60 € · 3,20 €', 'Alter und Größe: nein – ein Kind wächst nicht jedes Jahr gleich viel, mit 6 ist es nicht doppelt so groß wie mit 3')],
    },
    5: {
      grafik: [geo([koord({ nx: 5, ny: 6, e: 10, namen: ['kg', '€'], marken: (i) => String(i), markenY: (j) => String(j * 2), linien: [[[0, 0], [5, 5]]], punkte: [['A', 1, 1], ['B', 2, 2], ['C', 3, 3]] })])],
      hinten: [ueb([
        auf(2, 'Äpfel: 1 Kästchen nach oben = 2 €. Lies ab. Ist der Preis proportional zur Menge?'),
        geo([koord({ nx: 5, ny: 6, e: 10, namen: ['kg', '€'], markenY: (j) => String(j * 2), linien: [[[0, 0], [5, 5]]] })]),
        pk(['2 kg kosten ___ €', '4 kg kosten ___ €', 'Für 6 € bekommst du ___ kg.', 'Die Gerade geht durch 0. Also: ___'], 1, true),
      ], '2 kg = 4 € · 4 kg = 8 € · 6 € = 3 kg · proportional (Gerade durch den Nullpunkt)')],
    },
    6: {
      grafik: [tab(['', 'Menge', 'Preis'], [['', '3 kg', '6,90 €'], [': 3', '1 kg', '2,30 €'], ['· 5', '5 kg', '11,50 €']])],
      hinten: [ueb([
        auf(2, 'Dreisatz in der Tabelle: erst auf 1, dann auf die gesuchte Menge.'),
        sp([tab(['', 'Hefte', 'Preis'], [['', '4', '6,00 €'], [': 4', '1', ''], ['· 7', '7', '']])],
          [tab(['', 'Liter', 'Preis'], [['', '5', '8,50 €'], [': 5', '1', ''], ['· 3', '3', '']])]),
      ], 'Hefte: 1 Heft 1,50 € · 7 Hefte 10,50 €', 'Liter: 1 l 1,70 € · 3 l 5,10 €')],
    },
    7: {
      grafik: [tab(['Personen', '4', '1', '6'], [['Mehl', '200 g', '50 g', '300 g']])],
      hinten: [ueb([
        auf(2, 'Pfannkuchen für 4 Personen. Rechne für 1 Person und dann für 6 Personen.'),
        tab(['Zutat', '4 Personen', '1 Person', '6 Personen'], [['Mehl', '200 g', '', ''], ['Eier', '4', '', ''], ['Milch', '400 ml', '', ''], ['Zucker', '40 g', '', '']]),
      ], 'Mehl 50 g → 300 g · Eier 1 → 6 · Milch 100 ml → 600 ml · Zucker 10 g → 60 g')],
    },
    8: {
      grafik: [geo([koord({ nx: 6, ny: 5, e: 10, punkte: [['A(2; 3)', 2, 3], ['B(5; 1)', 5, 1]], linien: [[[2, 0], [2, 3], { stil: 'gestrichelt' }], [[0, 3], [2, 3], { stil: 'gestrichelt' }]] })])],
      hinten: [ueb([
        auf(2, 'Links: Lies die Punkte ab (erst x nach rechts, dann y nach oben). Rechts: Zeichne P(1; 4), Q(5; 4), R(5; 1) und verbinde sie.'),
        geo([koord({ nx: 6, ny: 5, e: 10, punkte: [['C', 1, 2], ['D', 4, 5], ['E', 6, 0], ['F', 0, 3]] }), koord({ nx: 6, ny: 5, e: 10 })], 2),
      ], 'C(1; 2) · D(4; 5) · E(6; 0) · F(0; 3)', 'P, Q, R ergeben ein rechtwinkliges Dreieck (rechter Winkel bei Q)')],
    },
    9: {
      grafikUnten: [geo([{ b: 50, h: 30, text: 'parallel ∥', elemente: [st([2, 6], [26, 14], { name: 'g' }), st([2, 16], [26, 24], { name: 'h' })] },
        { b: 50, h: 30, text: 'senkrecht ⊥', elemente: [st([2, 20], [26, 20]), st([14, 3], [14, 27]), { t: 'winkel', x: 14, y: 20, a1: 0, a2: 90, r: 4, marke: true }] },
        { b: 50, h: 30, text: 'schneidend', elemente: [st([2, 5], [26, 25]), st([2, 22], [26, 10])] }], 3)],
      hinten: [ueb([
        auf(2, 'Parallel, senkrecht oder schneidend? Prüfe mit dem Geodreieck.'),
        geo([{ b: 36, h: 34, label: 'a)', text: '', elemente: [st([3, 30], [33, 4]), st([3, 8], [33, 28])] },
          { b: 36, h: 34, label: 'b)', text: '', elemente: [st([3, 10], [33, 3]), st([3, 30], [33, 23])] },
          { b: 36, h: 34, label: 'c)', text: '', elemente: [st([6, 30], [28, 4]), st([3, 11], [33, 30])] },
          { b: 36, h: 34, label: 'd)', text: '', elemente: [st([3, 17], [33, 17]), st([3, 26], [33, 26])] }], 4),
      ], 'a) schneidend · b) parallel · c) schneidend · d) parallel', 'Tipp: c) sieht fast senkrecht aus – mit dem Geodreieck prüfen')],
    },
    10: {
      grafik: [geo([{ b: 75, h: 38, raster: 'karo', elemente: [vieleck([[10, 30], [50, 30], [65, 10], [25, 10]], { fuellung: true }), st([25, 10], [25, 30], { stil: 'gestrichelt' }), txt(30, 35, 'g = 4 cm', { klein: true }), txt(27, 21, 'h = 2 cm', { klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Jedes Kästchen ist 5 mm. Lies g und h ab. Berechne die Fläche: A = g · h.'),
        geo([{ b: 80, h: 30, raster: 'karo', label: 'a)', elemente: [vieleck([[5, 25], [55, 25], [70, 10], [20, 10]], { fuellung: true })] },
          { b: 80, h: 30, raster: 'karo', label: 'b)', elemente: [vieleck([[5, 25], [45, 25], [55, 5], [15, 5]], { fuellung: true })] }], 2),
        pk(['a) g = ___  h = ___  A = ___', 'b) g = ___  h = ___  A = ___'], 1, false),
      ], 'a) g = 5 cm, h = 1,5 cm, A = 7,5 cm²', 'b) g = 4 cm, h = 2 cm, A = 8 cm²')],
    },
    11: {
      grafik: [geo([{ b: 75, h: 34, raster: 'karo', elemente: [vieleck([[5, 25], [65, 25], [50, 10], [20, 10]], { fuellung: true }), txt(35, 30, 'a = 6 cm', { mitte: true, klein: true }), txt(35, 8, 'c = 3 cm', { mitte: true, klein: true }), st([20, 10], [20, 25], { stil: 'gestrichelt' }), txt(9, 19, 'h = 1,5 cm', { klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Lies a, c und h ab (1 Kästchen = 5 mm). Fläche: A = (a + c) : 2 · h.'),
        geo([{ b: 80, h: 34, raster: 'karo', label: 'a)', elemente: [vieleck([[10, 30], [60, 30], [50, 10], [20, 10]], { fuellung: true })] },
          { b: 80, h: 34, raster: 'karo', label: 'b)', elemente: [vieleck([[5, 30], [75, 30], [55, 15], [15, 15]], { fuellung: true })] }], 2),
        pk(['a) a = ___  c = ___  h = ___  A = ___', 'b) a = ___  c = ___  h = ___  A = ___'], 1, false),
      ], 'a) a = 5 cm, c = 3 cm, h = 2 cm, A = 8 cm²', 'b) a = 7 cm, c = 4 cm, h = 1,5 cm, A = 8,25 cm²')],
    },
    12: {
      grafik: [geo([{ b: 56, h: 48, elemente: [kreis(28, 24, 20), pt('M', 28, 24, 'u'), st([28, 24], [48, 24], { mass: 'r = 2 cm' })] }]),
        { art: 'text', text: 'U = 2 · π · r ≈ 2 · 3,14 · 2 = 12,56 cm · A = π · r · r ≈ 3,14 · 2 · 2 = 12,56 cm²' }],
      hinten: [ueb([
        auf(3, 'Miss den Radius. Berechne d, den Umfang U und die Fläche A (π ≈ 3,14).'),
        geo([{ b: 40, h: 40, label: 'a)', elemente: [kreis(20, 20, 15), pt('M', 20, 20, 'u'), st([20, 20], [35, 20])] },
          { b: 60, h: 56, label: 'b)', elemente: [kreis(30, 28, 25), pt('M', 30, 28, 'u'), st([30, 28], [30, 3])] }], 2),
        pk(['a) r = ___  d = ___  U ≈ ___  A ≈ ___', 'b) r = ___  d = ___  U ≈ ___  A ≈ ___'], 1, false),
      ], 'a) r = 1,5 cm, d = 3 cm, U ≈ 9,42 cm, A ≈ 7,07 cm²', 'b) r = 2,5 cm, d = 5 cm, U ≈ 15,7 cm, A ≈ 19,63 cm²')],
    },
    13: {
      grafik: [geo([{ b: 70, h: 40, raster: 'karo', elemente: [vieleck([[10, 35], [50, 35], [50, 25], [30, 25], [30, 5], [10, 5]], { fuellung: true }), st([10, 25], [30, 25], { stil: 'gestrichelt' }), txt(20, 16, 'A1', { mitte: true }), txt(30, 31, 'A2', { mitte: true })] }]),
        { art: 'text', text: 'Teile die Figur in Rechtecke. Rechne jede Fläche und zähle zusammen.' }],
      hinten: [ueb([
        auf(3, 'Teile in Rechtecke und Dreiecke (1 Kästchen = 5 mm). Berechne die ganze Fläche.'),
        geo([{ b: 80, h: 45, raster: 'karo', label: 'a)', elemente: [vieleck([[10, 40], [70, 40], [70, 20], [50, 20], [50, 10], [10, 10]], { fuellung: true })] },
          { b: 70, h: 45, raster: 'karo', label: 'b)', elemente: [vieleck([[15, 40], [55, 40], [55, 20], [35, 5], [15, 20]], { fuellung: true })] }], 2),
        pk(['a) A = ___', 'b) A = ___'], 2, false),
      ], 'a) 6 cm · 3 cm = 18 cm², minus 2 cm · 1 cm = 2 cm² (die Ecke oben rechts) → 16 cm²', 'b) Rechteck 4 cm · 2 cm = 8 cm² + Dreieck 4 cm · 1,5 cm : 2 = 3 cm² → 11 cm²')],
    },
  },

  // ===================================================================== Modul 6
  6: {
    1: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '-6', bis: '6', schritt: '1', punkte: [{ wert: '-2', name: 'Start −2' }, { wert: '3', name: '+5 → 3' }] }],
      hinten: [ueb([
        auf(1, 'Rechne mit dem Zahlenstrahl: plus = nach rechts, minus = nach links.'),
        { art: 'zahlenstrahl', von: '-10', bis: '10', schritt: '1' },
        pk(['−4 + 7 = ___', '3 − 8 = ___', '−2 − 5 = ___', '−9 + 4 = ___', '6 − 10 = ___', '−3 + 3 = ___'], 3, true),
      ], 'a) 3 · b) −5 · c) −7 · d) −5 · e) −4 · f) 0')],
    },
    2: {
      grafik: [tab(['·', 'plus', 'minus'], [['plus', 'plus', 'minus'], ['minus', 'minus', 'plus']])],
      hinten: [ueb([
        auf(3, 'Setz das Muster fort. Was fällt dir auf, wenn du mit einer negativen Zahl malnimmst?'),
        tab(['·', '3', '2', '1', '0', '−1', '−2', '−3'], [['2', '6', '4', '', '', '', '', ''], ['−2', '−6', '−4', '', '', '', '', '']]),
        { art: 'linien', anzahl: 2 },
      ], '2: 6, 4, 2, 0, −2, −4, −6', '−2: −6, −4, −2, 0, 2, 4, 6', 'bei −2 wird es jedes Mal 2 mehr – darum ist minus mal minus plus')],
    },
    3: {
      grafik: [{ art: 'bon', titel: 'Kino', posten: [{ text: '3 Tickets à 8 €', preis: '24,00 €' }, { text: '1 Popcorn', preis: '5,00 €' }], summe: '29,00 €', fuss: 'Term: 3 · 8 + 5 = 29' }],
      hinten: [ueb([
        auf(2, 'Schreib für jeden Einkauf einen Term. Rechne Punkt vor Strich.'),
        sp([tab(['Pizza-Abend', 'Anzahl', 'Preis'], [['Pizza', '2', '9,50 €'], ['Getränk', '4', '2,50 €']])],
          [tab(['Ausflug', 'Anzahl', 'Preis'], [['Busticket', '5', '2,00 €'], ['Eintritt', '1', '15,00 €']])]),
        pk(['Pizza-Abend: ___ = ___ €', 'Ausflug: ___ = ___ €'], 1, false),
      ], 'Pizza: 2 · 9,50 + 4 · 2,50 = 19 + 10 = 29 €', 'Ausflug: 5 · 2 + 15 = 25 €')],
    },
    4: {
      grafik: [geo([{ b: 84, h: 22, elemente: [
        vieleck([[4, 6], [14, 6], [14, 16], [4, 16]]), txt(9, 21, '4', { mitte: true, klein: true }),
        vieleck([[22, 6], [32, 6], [32, 16], [22, 16]]), vieleck([[32, 6], [42, 6], [42, 16], [32, 16]]), txt(32, 21, '7', { mitte: true, klein: true }),
        vieleck([[50, 6], [60, 6], [60, 16], [50, 16]]), vieleck([[60, 6], [70, 6], [70, 16], [60, 16]]), vieleck([[70, 6], [80, 6], [80, 16], [70, 16]]), txt(65, 21, '10', { mitte: true, klein: true })] }]),
        { art: 'text', text: 'Hölzchen-Quadrate: Jedes neue Quadrat braucht 3 Hölzchen mehr. Für n Quadrate: 3 · n + 1.' }],
      hinten: [ueb([
        auf(3, 'Wie viele Hölzchen brauchst du? Ergänze die Tabelle. Schreib am Ende den Term mit n.'),
        tab(['Quadrate n', '1', '2', '3', '4', '10', 'n'], [['Hölzchen', '4', '7', '10', '', '', '']]),
      ], '4 Quadrate: 13 · 10 Quadrate: 31 · n Quadrate: 3 · n + 1')],
    },
    5: {
      grafik: [geo([{ b: 70, h: 32, elemente: [vieleck([[10, 6], [60, 6], [60, 26], [10, 26]], { seiten: ['x', '3 cm', 'x', '3 cm'] })] }]),
        { art: 'text', text: 'Umfang: x + 3 + x + 3 = 2 · x + 6' }],
      hinten: [ueb([
        auf(2, 'Schreib einen Term für den Umfang jeder Figur.'),
        geo([{ b: 36, h: 36, label: 'a)', text: '', elemente: [vieleck([[8, 6], [32, 6], [32, 30], [8, 30]], { seiten: ['a', 'a', 'a', 'a'] })] },
          { b: 52, h: 36, label: 'b)', text: '', elemente: [vieleck([[6, 8], [46, 8], [46, 28], [6, 28]], { seiten: ['x', '5', 'x', '5'] })] },
          { b: 44, h: 36, label: 'c)', text: '', elemente: [vieleck([[4, 30], [40, 30], [22, 4]], { seiten: ['4', 'x', 'x'] })] }], 3),
      ], 'a) 4 · a · b) 2 · x + 10 · c) 2 · x + 4')],
    },
    6: {
      grafik: [tab(['x', '1', '2', '3'], [['3 · x + 2', '5', '8', '11']])],
      hinten: [ueb([
        auf(2, 'Setze ein und rechne. Fülle die Tabelle.'),
        tab(['x', '0', '1', '2', '5', '10'], [['2 · x + 1', '', '', '', '', ''], ['x · x', '', '', '', '', ''], ['10 − x', '', '', '', '', '']]),
      ], '2x + 1: 1, 3, 5, 11, 21', 'x · x: 0, 1, 4, 25, 100', '10 − x: 10, 9, 8, 5, 0')],
    },
    7: {
      grafik: [geo([{ b: 84, h: 26, elemente: [...kacheln(0, 2, 3, 4, 4).el, txt(52, 14, '+', { mitte: true, fett: true }), ...kacheln(0, 1, 1, 57, 4).el] }]),
        { art: 'text', text: '2x + 3 + x + 1 = 3x + 4 – Streifen (x) zu Streifen, Kästchen (1) zu Kästchen.' }],
      hinten: [ueb([
        auf(2, 'Schreib jedes Bild als Term und fasse zusammen.'),
        geo([{ label: 'a)', h: 26, text: '', elemente: [...kacheln(0, 3, 2, 4, 4).el, txt(65, 14, '+', { mitte: true, fett: true }), ...kacheln(0, 2, 4, 70, 4).el] },
          { label: 'b)', h: 26, text: '', elemente: [...kacheln(0, 1, 5, 4, 4).el, txt(65, 14, '+', { mitte: true, fett: true }), ...kacheln(0, 4, 0, 70, 4).el] }], 1),
      ], 'a) 3x + 2 + 2x + 4 = 5x + 6', 'b) x + 5 + 4x = 5x + 5')],
    },
    8: {
      grafik: [geo([{ b: 84, h: 36, elemente: flaechenModell('3', [['x', 40], ['4', 24]], { innen: ['3 · x', '3 · 4'] }).el }]),
        { art: 'text', text: '3 · (x + 4) = 3 · x + 3 · 4 = 3x + 12 – jedes Stück wird mit 3 malgenommen.' }],
      hinten: [ueb([
        auf(3, 'Schreib die Fläche zweimal: als Produkt mit Klammer und aufgelöst.'),
        geo([{ label: 'a)', h: 36, text: '', elemente: flaechenModell('5', [['x', 40], ['2', 16]]).el },
          { label: 'b)', h: 36, text: '', elemente: flaechenModell('4', [['2x', 44], ['3', 20]]).el }], 2),
      ], 'a) 5 · (x + 2) = 5x + 10', 'b) 4 · (2x + 3) = 8x + 12')],
    },
  },

  // ===================================================================== Modul 7
  7: {
    1: {
      grafik: [{ art: 'waage', links: 'x + 3', rechts: '8', zeilen: 0 }, { art: 'text', text: 'Auf beiden Seiten 3 wegnehmen: x = 5' }],
      hinten: [ueb([
        auf(1, 'Die Waage ist im Gleichgewicht. Was wiegt x? Schreib die Gleichung und die Lösung.'),
        sp([{ art: 'waage', links: 'x + 5', rechts: '12', zeilen: 1 }], [{ art: 'waage', links: 'x + x', rechts: '14', zeilen: 1 }]),
        sp([{ art: 'waage', links: 'x + x + 2', rechts: '10', zeilen: 1 }], [{ art: 'waage', links: '9', rechts: 'x + 4', zeilen: 1 }]),
      ], 'a) x + 5 = 12 → x = 7', 'b) 2x = 14 → x = 7', 'c) 2x + 2 = 10 → x = 4', 'd) 9 = x + 4 → x = 5')],
    },
    2: {
      grafik: [{ art: 'waage', links: '3x + 2', rechts: '17', zeilen: 0 }, { art: 'text', text: '− 2 auf beiden Seiten: 3x = 15. Dann : 3: x = 5.' }],
      hinten: [ueb([
        auf(2, 'Zwei Schritte: erst die Zahl wegnehmen, dann teilen. Mach die Probe.'),
        sp([{ art: 'waage', links: '4x + 1', rechts: '21', zeilen: 1 }], [{ art: 'waage', links: '2x + 7', rechts: '15', zeilen: 1 }]),
        sp([{ art: 'waage', links: '5x + 3', rechts: '18', zeilen: 1 }], [{ art: 'waage', links: '3x + 6', rechts: '30', zeilen: 1 }]),
      ], 'a) x = 5 · b) x = 4 · c) x = 3 · d) x = 8')],
    },
    3: {
      grafik: [geo([{ b: 70, h: 30, elemente: [vieleck([[6, 6], [56, 6], [56, 26], [6, 26]], { seiten: ['2x', 'x', '2x', 'x'] })] }]),
        { art: 'text', text: 'Umfang 30 cm: 2x + x + 2x + x = 6x = 30 → x = 5. Das Rechteck ist 10 cm lang und 5 cm breit.' }],
      hinten: [ueb([
        auf(3, 'Stell eine Gleichung auf. Löse sie und gib alle Seitenlängen an.'),
        geo([{ b: 60, h: 36, label: 'a) Umfang 24 cm', text: '', elemente: [vieleck([[6, 8], [54, 8], [54, 28], [6, 28]], { seiten: ['3x', 'x', '3x', 'x'] })] },
          { b: 60, h: 36, label: 'b) Umfang 26 cm', text: '', elemente: [vieleck([[6, 30], [54, 30], [30, 4]], { seiten: ['8 cm', 'x', 'x'] })] }], 2),
        { art: 'kaestchen', zeilen: 3 },
      ], 'a) 8x = 24 → x = 3: Seiten 9 cm und 3 cm', 'b) 2x + 8 = 26 → x = 9: Seiten 9 cm, 9 cm, 8 cm')],
    },
    4: {
      grafik: [tab(['Datum', 'Text', 'Betrag', 'Kontostand'], [['01.10.', 'Start', '', '120,00 €'], ['03.10.', 'Taschengeld', '+ 30,00 €', '150,00 €'], ['05.10.', 'Kino', '− 12,00 €', '138,00 €']], { breiten: [1, 2, 1.4, 1.4] })],
      hinten: [ueb([
        auf(2, 'Ein Kontoauszug. Rechne den Kontostand nach jeder Zeile. Ist das Konto am Ende im Minus?'),
        tab(['Datum', 'Text', 'Betrag', 'Kontostand'], [['01.11.', 'Start', '', '85,50 €'], ['02.11.', 'Handy-Rechnung', '− 25,00 €', ''], ['08.11.', 'Lohn Ferienjob', '+ 140,00 €', ''], ['12.11.', 'Fahrrad', '− 180,00 €', ''], ['20.11.', 'Geschenk', '− 35,00 €', '']], { breiten: [1, 2, 1.4, 1.4] }),
      ], '60,50 € · 200,50 € · 20,50 € · −14,50 € – ja, am Ende 14,50 € im Minus (Soll)')],
    },
    5: {
      grafik: [tab(['Jahr', 'Zinsen (2 %)', 'Kontostand'], [['Start', '', '500,00 €'], ['1', '10,00 €', '510,00 €'], ['2', '10,20 €', '520,20 €']])],
      hinten: [ueb([
        auf(3, 'Handy kaufen: sofort bezahlen oder in Raten? Rechne, wie viel die Raten mehr kosten – in Euro und in Prozent.'),
        sp([{ art: 'bon', titel: 'Sofort bezahlen', posten: [{ text: 'Handy', preis: '480,00 €' }], summe: '480,00 €' }],
          [tab(['In Raten', ''], [['Rate pro Monat', '44,00 €'], ['Anzahl Raten', '12'], ['zusammen', '']])]),
        pk(['Raten zusammen: ___ €', 'mehr als sofort: ___ €', 'das sind ___ % von 480 €'], 1, true),
      ], '12 · 44 = 528 € · 48 € mehr · 48 von 480 = 10 %')],
    },
    6: {
      grafik: [geo([{ b: 50, h: 46, text: '1 dm³ = 1 000 cm³ = 1 l', elemente: quader(1, 1, 1, 26, { x: 6 }).el }])],
      hinten: [ueb([
        auf(1, 'Jeder kleine Würfel ist 1 cm³. Zähle: Wie viele Würfel? Wie groß ist das Volumen?'),
        geo([{ b: 70, h: 46, label: 'a)', text: '', elemente: quader(3, 2, 2, 10, { x: 8 }).el },
          { b: 80, h: 50, label: 'b)', text: '', elemente: quader(4, 3, 2, 10, { x: 6 }).el }], 2),
      ], 'a) 3 · 2 · 2 = 12 Würfel = 12 cm³', 'b) 4 · 3 · 2 = 24 Würfel = 24 cm³')],
    },
    7: {
      grafik: [geo([{ b: 80, h: 44, elemente: quader(5, 3, 2, 9, { x: 4, gitter: false, masse: ['l = 5 cm', 'b = 3 cm', 'h = 2 cm'] }).el }]),
        { art: 'text', text: 'V = l · b · h = 5 · 3 · 2 = 30 cm³' }],
      hinten: [ueb([
        auf(2, 'Berechne das Volumen. Gib es auch in Litern an (1 l = 1 000 cm³).'),
        geo([{ b: 84, h: 46, label: 'a) Schuhkarton', text: '', elemente: quader(6, 4, 2.4, 8, { x: 4, gitter: false, masse: ['30 cm', '20 cm', '12 cm'] }).el },
          { b: 60, h: 50, label: 'b) Würfel', text: '', elemente: quader(3, 3, 3, 9, { x: 4, gitter: false, masse: ['10 cm', '10 cm', '10 cm'] }).el }], 2),
      ], 'a) 30 · 20 · 12 = 7 200 cm³ = 7,2 l', 'b) 10 · 10 · 10 = 1 000 cm³ = 1 l')],
    },
    8: {
      grafik: [geo([{ b: 50, h: 56, text: 'Dose: d = 8 cm, h = 10 cm', elemente: [ellipse(24, 10, 16, 5), st([8, 10], [8, 46]), st([40, 10], [40, 46]), ellipse(24, 46, 16, 5), st([24, 10], [40, 10], { stil: 'gestrichelt' }), txt(32, 8, 'r', { klein: true })] }]),
        { art: 'text', text: 'V = Grundfläche · Höhe = π · r · r · h ≈ 3,14 · 4 · 4 · 10 = 502,4 cm³ ≈ 0,5 l' }],
      hinten: [ueb([
        auf(3, 'Berechne das Volumen: V = Grundfläche · Höhe.'),
        geo([{ b: 84, h: 50, label: 'a) Prisma (Dreieck: g = 4 cm, h = 3 cm, Länge 10 cm)', text: '', elemente: [vieleck([[6, 44], [26, 44], [12, 29]], { fuellung: true }), vieleck([[46, 22], [66, 22], [52, 7]]), st([6, 44], [46, 22]), st([26, 44], [66, 22]), st([12, 29], [52, 7])] },
          { b: 50, h: 50, label: 'b) Zylinder (r = 3 cm, h = 5 cm)', text: '', elemente: [ellipse(24, 10, 15, 4.5), st([9, 10], [9, 40]), st([39, 10], [39, 40]), ellipse(24, 40, 15, 4.5)] }], 2),
      ], 'a) Grundfläche 4 · 3 : 2 = 6 cm² → V = 60 cm³', 'b) Grundfläche ≈ 3,14 · 3 · 3 = 28,26 cm² → V ≈ 141,3 cm³')],
    },
  },

  // ===================================================================== Modul 8
  8: {
    1: {
      grafik: [geo([{ b: 84, h: 40, raster: 'karo', elemente: [vieleck([[5, 5], [65, 5], [65, 10], [5, 10]], { fuellung: true }), txt(70, 9, '1 · 12', { klein: true }),
        vieleck([[5, 15], [35, 15], [35, 25], [5, 25]], { fuellung: true }), txt(40, 22, '2 · 6', { klein: true }),
        vieleck([[50, 15], [70, 15], [70, 30], [50, 30]], { fuellung: true }), txt(72, 34, '3 · 4', { klein: true })] }]),
        { art: 'text', text: '12 Kästchen als Rechteck: 1 · 12, 2 · 6, 3 · 4. Die Teiler von 12: 1, 2, 3, 4, 6, 12.' }],
      hinten: [ueb([
        auf(3, 'Zeichne alle Rechtecke aus 18 Kästchen. Schreib dann alle Teiler von 18 auf.'),
        geo([{ h: 45, raster: 'karo', elemente: [] }]),
        pk(['Teiler von 18: ___', 'Die ersten 5 Vielfachen von 18: ___'], 1, false),
      ], 'Rechtecke: 1 · 18, 2 · 9, 3 · 6 → Teiler 1, 2, 3, 6, 9, 18', 'Vielfache: 18, 36, 54, 72, 90')],
    },
    2: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '0', bis: '36', schritt: '4', punkte: [{ wert: '12', name: '12' }, { wert: '24', name: '24' }, { wert: '36', name: '36' }] },
        { art: 'zahlenstrahl', von: '0', bis: '36', schritt: '6', punkte: [{ wert: '12', name: '12' }, { wert: '24', name: '24' }, { wert: '36', name: '36' }] },
        { art: 'text', text: 'Oben die Vielfachen von 4, unten die von 6. Wo sich beide treffen: 12, 24, 36. Das kleinste gemeinsame Vielfache: kgV(4; 6) = 12.' }],
      hinten: [ueb([
        auf(2, 'Bus A fährt alle 10 Minuten, Bus B alle 15 Minuten. Beide fahren um 8:00 ab. Markiere oben Bus A und unten Bus B.'),
        { art: 'zahlenstrahl', von: '0', bis: '60', schritt: '10', fein: '5' },
        { art: 'zahlenstrahl', von: '0', bis: '60', schritt: '15', fein: '5' },
        pk(['Beide fahren wieder zusammen nach ___ Minuten, also um ___ Uhr.', 'kgV(10; 15) = ___', 'Wie oft fahren beide zusammen bis 9:00? ___'], 1, true),
      ], 'nach 30 Minuten, um 8:30 · kgV(10; 15) = 30 · um 8:00, 8:30 und 9:00 (3-mal)')],
    },
    3: {
      grafik: [geo([{ b: 84, h: 34, raster: 'karo', elemente: [vieleck([[5, 25], [10, 25], [10, 30], [5, 30]], { fuellung: true }), txt(7.5, 22, '1²', { mitte: true, klein: true }),
        vieleck([[15, 20], [25, 20], [25, 30], [15, 30]], { fuellung: true }), txt(20, 17, '2² = 4', { mitte: true, klein: true }),
        vieleck([[30, 15], [45, 15], [45, 30], [30, 30]], { fuellung: true }), txt(37.5, 12, '3² = 9', { mitte: true, klein: true }),
        vieleck([[50, 10], [70, 10], [70, 30], [50, 30]], { fuellung: true }), txt(60, 7, '4² = 16', { mitte: true, klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Schreib als Potenz und rechne aus.'),
        geo([{ b: 60, h: 40, label: 'a) Würfel aus Würfeln', text: '', elemente: quader(3, 3, 3, 8, { x: 6 }).el },
          { b: 50, h: 40, raster: 'karo', label: 'b) Quadrat', text: '', elemente: [vieleck([[10, 10], [35, 10], [35, 35], [10, 35]], { fuellung: true })] }], 2),
        tab(['Potenz', '10¹', '10²', '10³', '10⁶'], [['Zahl', '10', '100', '', '']]),
      ], 'a) 3³ = 27 Würfel · b) 5² = 25 Kästchen', '10³ = 1 000 · 10⁶ = 1 000 000')],
    },
    4: {
      grafik: [geo([{ b: 70, h: 40, raster: 'karo', elemente: [vieleck([[10, 5], [40, 5], [40, 35], [10, 35]], { fuellung: true, seiten: ['a = ?', '', '', ''] }), txt(25, 22, 'A = 36 Kästchen', { mitte: true, klein: true }), txt(45, 22, '√36 = 6', { fett: true })] }])],
      hinten: [ueb([
        auf(3, 'Zwischen welchen ganzen Zahlen liegt die Wurzel? Markiere ungefähr auf dem Zahlenstrahl.'),
        { art: 'zahlenstrahl', von: '0', bis: '10', schritt: '1', fein: '0,5' },
        pk(['√20 liegt zwischen ___ und ___', '√50 liegt zwischen ___ und ___', '√2 liegt zwischen ___ und ___', '√99 liegt zwischen ___ und ___'], 2, true),
      ], '√20: zwischen 4 und 5 (≈ 4,47) · √50: zwischen 7 und 8 (≈ 7,07) · √2: zwischen 1 und 2 (≈ 1,41) · √99: zwischen 9 und 10 (≈ 9,95)')],
    },
    5: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'streifen', teile: 2, gefaerbt: 1, bruch: '1/2' }, { form: 'streifen', teile: 3, gefaerbt: 1, bruch: '1/3' }, { form: 'streifen', teile: 6, gefaerbt: 5, bruch: '5/6', text: '3/6 + 2/6 = 5/6' }] }],
      hinten: [ueb([
        auf(3, 'Suche in der Bruchwand den gemeinsamen Nenner. Rechne dann.'),
        sp([{ art: 'bruchbilder', items: [{ form: 'wand', nenner: [2, 3, 4, 6, 12] }] }],
          [pk(['#1/4# + #1/6# = ___', '#2/3# − #1/4# = ___', '#1/2# + #1/4# = ___', '#5/6# − #1/3# = ___'], 1, true)]),
      ], 'a) 3/12 + 2/12 = 5/12 · b) 8/12 − 3/12 = 5/12 · c) 2/4 + 1/4 = 3/4 · d) 5/6 − 2/6 = 3/6 = 1/2')],
    },
    6: {
      grafik: [{ art: 'bruchbilder', items: [{ form: 'menge', anzahl: 12, gruppen: 4, gefaerbt: 3, bruch: '3/4', text: '12 : 4 = 3, dann 3 · 3 = 9' }] }],
      hinten: [ueb([
        auf(2, 'Färbe den Bruchteil. Wie viele sind es?'),
        { art: 'bruchbilder', spalten: 3, items: [{ form: 'menge', anzahl: 15, gruppen: 3, label: 'a) 2/3 von 15', text: '' }, { form: 'menge', anzahl: 20, gruppen: 5, label: 'b) 3/5 von 20', text: '' }, { form: 'menge', anzahl: 18, gruppen: 6, label: 'c) 5/6 von 18', text: '' }] },
      ], 'a) 15 : 3 = 5, · 2 = 10 · b) 20 : 5 = 4, · 3 = 12 · c) 18 : 6 = 3, · 5 = 15')],
    },
    7: {
      grafik: [{ art: 'hunderterfeld', felder: [{ gefaerbt: 75, text: '3/4 = 0,75 = 75 %' }] }],
      hinten: [ueb([
        auf(2, 'Schreib jedes Bild auf drei Arten: als Bruch (gekürzt), als Dezimalzahl und in Prozent.'),
        { art: 'hunderterfeld', spalten: 4, felder: [{ gefaerbt: 20, label: 'a)' }, { gefaerbt: 40, label: 'b)' }, { gefaerbt: 25, label: 'c)' }, { gefaerbt: 60, label: 'd)' }] },
      ], 'a) 1/5 = 0,2 = 20 % · b) 2/5 = 0,4 = 40 % · c) 1/4 = 0,25 = 25 % · d) 3/5 = 0,6 = 60 %')],
    },
    8: {
      grafik: [geo([{ b: 80, h: 44, elemente: [vieleck([[8, 38], [68, 38], [44, 6]], { ecken: ['A', 'B', 'C'], seiten: ['c = 6 cm', 'a = 4 cm', 'b = 5 cm'] })] }]),
        { art: 'text', text: 'Erst c zeichnen. Dann um A einen Kreis mit b, um B einen Kreis mit a. Wo sie sich schneiden: C.' }],
      hinten: [ueb([
        auf(3, 'Geht das Dreieck? Prüfe: Die zwei kürzeren Seiten zusammen müssen länger sein als die längste. Konstruiere b) im Karo.'),
        geo([{ b: 84, h: 26, label: 'a) 3 cm, 4 cm, 8 cm', text: '', elemente: [st([4, 6], [34, 6], { stil: 'dick' }), st([4, 13], [44, 13], { stil: 'dick' }), st([4, 20], [84, 20], { stil: 'dick' })] }]),
        geo([{ h: 45, raster: 'karo', label: 'b) c = 6 cm, a = 4 cm, b = 5 cm', elemente: [] }]),
      ], 'a) geht nicht: 3 + 4 = 7 < 8', 'b) geht: 4 + 5 = 9 > 6 – Dreieck mit c = 6 cm, Kreise mit 5 cm um A und 4 cm um B')],
    },
    9: {
      grafik: [geo([{ b: 80, h: 44, elemente: [pt('A', 10, 30, 'l'), pt('B', 70, 30, 'r'), st('A', 'B'), pt('M', 40, 30, 'ur'), st([40, 4], [40, 42], { stil: 'gestrichelt', name: 'm' }), { t: 'winkel', x: 40, y: 30, a1: 0, a2: 90, r: 4, marke: true }] }]),
        { art: 'text', text: 'Die Mittelsenkrechte m geht durch die Mitte M und steht senkrecht auf AB. Jeder Punkt auf m ist von A und B gleich weit weg.' }],
      hinten: [ueb([
        auf(3, 'Zwei Freunde wohnen in A und B. Wo können sie sich treffen, damit beide gleich weit laufen? Zeichne die Mittelsenkrechte von AB. Zeichne dann die Winkelhalbierende bei C.'),
        geo([{ h: 55, raster: 'karo', elemente: [pt('A', 20, 45, 'l'), pt('B', 80, 45, 'r'), pt('C', 60, 10, 'o'), st('A', 'B'), st('B', 'C'), st('C', 'A')] }]),
      ], 'Mittelsenkrechte: durch M (3 cm von A) senkrecht zu AB – jeder Punkt darauf ist ein fairer Treffpunkt', 'Winkelhalbierende bei C: teilt den Winkel bei C in zwei gleiche Teile')],
    },
  },

  // ===================================================================== Modul 9
  9: {
    1: {
      grafikUnten: [{ art: 'zahlenstrahl', von: '-2', bis: '2', schritt: '1', fein: '0,25', punkte: [{ wert: '-1,5', name: '−1,5' }, { wert: '0,75', name: '0,75' }] },
        { art: 'text', text: 'Auch Brüche und Dezimalzahlen haben ihren Platz: −1,5 = −3/2 liegt links von 0, 0,75 = 3/4 rechts.' }],
      hinten: [ueb([
        auf(2, 'Welche Zahl zeigt jeder Pfeil? Vergleiche dann mit < oder >.'),
        { art: 'zahlenstrahl', von: '-3', bis: '3', schritt: '1', fein: '0,5', punkte: [{ wert: '-2,5' }, { wert: '-0,5' }, { wert: '1,5' }, { wert: '2,5' }] },
        pk(['−0,5 [] −0,25', '−1,5 [] −2', '#1/2# [] 0,4', '−#3/4# [] −0,7'], 4, true),
      ], 'Pfeile: −2,5 · −0,5 · 1,5 · 2,5', '−0,5 < −0,25 · −1,5 > −2 · 1/2 > 0,4 · −3/4 < −0,7')],
    },
    2: {
      grafik: [tab(['Kino für 4', 'pro Person'], [['Ticket', '9,00 €'], ['Popcorn', '4,00 €'], ['für alle 4', '4 · (9 + 4) = 52 €']])],
      hinten: [ueb([
        auf(2, 'Schreib einen Term mit Klammer und rechne. Rechne zur Probe auch ohne Klammer.'),
        sp([tab(['Klassenfahrt, 3 Tage', 'pro Tag'], [['Zug', '12,00 €'], ['Essen', '15,00 €']])],
          [tab(['Fußball-Team, 11 Spieler', 'pro Spieler'], [['Trikot', '20,00 €'], ['Hose', '8,00 €']])]),
        pk(['Klassenfahrt: ___', 'Team: ___'], 1, false),
      ], 'Klassenfahrt: 3 · (12 + 15) = 81 € = 36 + 45', 'Team: 11 · (20 + 8) = 308 € = 220 + 88')],
    },
    3: {
      grafik: [geo([{ b: 84, h: 26, elemente: kacheln(2, 3, 1, 4, 4).el }]), { art: 'text', text: '2x² + 3x + 1 – nur gleiche Kacheln darf man zusammenzählen.' }],
      hinten: [ueb([
        auf(2, 'Schreib jedes Bild als Polynom. Addiere dann a) und b).'),
        geo([{ label: 'a)', h: 26, text: '', elemente: kacheln(1, 2, 3, 4, 4).el }, { label: 'b)', h: 26, text: '', elemente: kacheln(2, 1, 1, 4, 4).el }], 2),
        pk(['a) + b) = ___'], 1, false),
      ], 'a) x² + 2x + 3 · b) 2x² + x + 1', 'a) + b) = 3x² + 3x + 4')],
    },
    4: {
      grafik: [geo([{ b: 84, h: 46, elemente: [
        vieleck([[14, 8], [44, 8], [44, 38], [14, 38]], { fuellung: true }), txt(29, 24, 'x²', { mitte: true, fett: true }),
        vieleck([[44, 8], [62, 8], [62, 38], [44, 38]]), txt(53, 24, '3x', { mitte: true }),
        vieleck([[14, 38], [44, 38], [44, 44], [14, 44]]), txt(29, 42.5, '2x', { mitte: true, klein: true }),
        vieleck([[44, 38], [62, 38], [62, 44], [44, 44]], { fuellung: true }), txt(53, 42.5, '6', { mitte: true, klein: true }),
        txt(29, 5, 'x', { mitte: true, fett: true }), txt(53, 5, '3', { mitte: true, fett: true }), txt(9, 24, 'x', { mitte: true, fett: true }), txt(9, 42.5, '2', { mitte: true, fett: true })] }]),
        { art: 'text', text: '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6' }],
      hinten: [ueb([
        auf(3, 'Rechne die Teil-Flächen aus und schreib das Ergebnis ohne Klammer.'),
        geo([{ label: 'a) 2x · (x + 4)', h: 36, text: '', elemente: flaechenModell('2x', [['x', 34], ['4', 22]]).el },
          { label: 'b) 4 · (3x + 2)', h: 36, text: '', elemente: flaechenModell('4', [['3x', 40], ['2', 18]]).el }], 2),
      ], 'a) 2x · x + 2x · 4 = 2x² + 8x', 'b) 4 · 3x + 4 · 2 = 12x + 8')],
    },
    5: {
      grafik: [geo([{ b: 84, h: 36, elemente: flaechenModell('?', [['3x', 40], ['12', 24]], { innen: ['3x', '12'] }).el }]),
        { art: 'text', text: 'Was steckt in beiden Teilen? 3. Also 3x + 12 = 3 · (x + 4).' }],
      hinten: [ueb([
        auf(3, 'Finde den gemeinsamen Faktor (er kommt links hin) und klammere aus.'),
        geo([{ label: 'a) 5x + 15', h: 36, text: '', elemente: flaechenModell('?', [['', 40], ['', 20]], { innen: ['5x', '15'] }).el },
          { label: 'b) x² + 4x', h: 36, text: '', elemente: flaechenModell('?', [['', 34], ['', 26]], { innen: ['x²', '4x'] }).el }], 2),
      ], 'a) 5 · (x + 3) – oben x und 3', 'b) x · (x + 4) – oben x und 4')],
    },
    6: {
      grafik: [geo([{ b: 70, h: 34, raster: 'karo', elemente: [vieleck([[10, 5], [35, 5], [35, 30], [10, 30]], { fuellung: true }), txt(22.5, 19, 'A = 25', { mitte: true, klein: true }), txt(40, 19, 'a = √25 = 5', { fett: true, klein: true })] }])],
      hinten: [ueb([
        auf(2, 'Schätze die Wurzel: Zwischen welchen Quadratzahlen liegt die Zahl? Markiere ungefähr und prüfe mit dem Taschenrechner.'),
        { art: 'zahlenstrahl', von: '0', bis: '10', schritt: '1', fein: '0,5' },
        pk(['√10 ≈ ___', '√30 ≈ ___', '√60 ≈ ___', '√85 ≈ ___'], 4, true),
      ], '√10 ≈ 3,16 (zwischen 3 und 4) · √30 ≈ 5,48 · √60 ≈ 7,75 · √85 ≈ 9,22')],
    },
    7: {
      grafik: [geo([{ b: 70, h: 66, raster: 'karo', elemente: [
        vieleck([[20, 40], [40, 40], [20, 25]], { rechte: [0], fuellung: true }),
        vieleck([[20, 40], [40, 40], [40, 60], [20, 60]]), txt(30, 51, 'b² = 16', { mitte: true, klein: true }),
        vieleck([[20, 40], [20, 25], [5, 25], [5, 40]]), txt(12.5, 34, 'a² = 9', { mitte: true, klein: true }),
        vieleck([[40, 40], [20, 25], [35, 5], [55, 20]]), txt(37.5, 23, 'c² = 25', { mitte: true, klein: true })] }]),
        { art: 'text', text: 'a² + b² = c²: 9 + 16 = 25 – die zwei kleinen Quadrate zusammen sind so groß wie das große.' }],
      hinten: [ueb([
        auf(3, 'Berechne die längste Seite c. Miss danach nach (Blatt in 100 % gedruckt).'),
        geo([{ b: 60, h: 48, label: 'a) a = 3 cm, b = 4 cm', text: '', elemente: [vieleck([[8, 42], [48, 42], [8, 12]], { rechte: [0], seiten: ['b', 'c', 'a'] })] },
          { b: 60, h: 48, label: 'b) a = 2,4 cm, b = 3,2 cm', text: '', elemente: [vieleck([[8, 42], [40, 42], [8, 18]], { rechte: [0], seiten: ['b', 'c', 'a'] })] }], 2),
      ], 'a) c² = 9 + 16 = 25 → c = 5 cm', 'b) c² = 5,76 + 10,24 = 16 → c = 4 cm')],
    },
    8: {
      grafik: [geo([{ b: 70, h: 56, elemente: [st([4, 50], [66, 50], { stil: 'dick' }), st([56, 50], [56, 4], { stil: 'dick' }), st([26, 50], [56, 10], { mass: '5 m' }), { t: 'winkel', x: 56, y: 50, a1: 90, a2: 180, r: 4, marke: true }, txt(41, 55, '3 m', { mitte: true, klein: true }), txt(59, 30, '?', { fett: true })] }]),
        { art: 'text', text: 'Leiter an der Wand: ? = √(5² − 3²) = √(25 − 9) = √16 = 4 m' }],
      hinten: [ueb([
        auf(3, 'Pythagoras im Alltag. Zeichne das rechtwinklige Dreieck in die Skizze und rechne.'),
        geo([{ b: 70, h: 60, label: 'a) Leiter 5 m, unten 1,4 m von der Wand', text: '', elemente: [st([4, 54], [66, 54], { stil: 'dick' }), st([56, 54], [56, 4], { stil: 'dick' }), st([42, 54], [56, 6]), txt(49, 59, '1,4 m', { mitte: true, klein: true })] },
          { b: 80, h: 60, label: 'b) Bildschirm 80 cm × 45 cm: Diagonale?', text: '', elemente: [vieleck([[6, 8], [70, 8], [70, 44], [6, 44]]), st([6, 44], [70, 8], { stil: 'gestrichelt' }), txt(38, 50, '80 cm', { mitte: true, klein: true }), txt(72, 27, '45 cm', { klein: true })] }], 2),
      ], 'a) Höhe = √(25 − 1,96) = √23,04 = 4,8 m', 'b) Diagonale = √(6400 + 2025) = √8425 ≈ 91,8 cm')],
    },
    9: {
      grafik: [geo([{ b: 80, h: 40, raster: 'karo', elemente: [vieleck([[10, 30], [30, 30], [30, 10]], { fuellung: true }), st([40, 2], [40, 38], { stil: 'gestrichelt', name: 's' }), vieleck([[70, 30], [50, 30], [50, 10]], { fuellung: true })] }]),
        { art: 'text', text: 'Spiegeln an s: Jeder Punkt geht senkrecht über die Achse, gleich weit auf die andere Seite.' }],
      hinten: [ueb([
        auf(3, 'a) Spiegle das Dreieck an der Achse s. b) Zeichne die Parallele zu g durch P und die Senkrechte zu g durch P.'),
        geo([{ b: 80, h: 55, raster: 'karo', label: 'a)', elemente: [vieleck([[10, 45], [30, 45], [15, 20]], { fuellung: true }), st([40, 2], [40, 53], { stil: 'gestrichelt', name: 's' })] },
          { b: 80, h: 55, raster: 'karo', label: 'b)', elemente: [st([5, 45], [75, 25], { art: 'gerade', name: 'g' }), pt('P', 25, 15, 'o')] }], 2),
      ], 'a) Spiegelbild mit den Ecken (70|45), (50|45), (65|20) in mm', 'b) Parallele durch P im selben Winkel wie g; Senkrechte durch P mit rechtem Winkel zu g (Geodreieck)')],
    },
  },
}
