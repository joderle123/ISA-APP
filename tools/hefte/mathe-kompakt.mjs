// Mathe-Modulheft KOMPAKT (Rückmeldung der Mathelehrerin der Annexe, 25.11.2026, Modul 3):
// „Das neue Heft ist ausführlicher (Erklärungen gefallen), aber das kompakte Format von vorher war besser, und die schönen
//  Übungen mit Bildern fehlen. In der Mathe verlieren sich die Schüler, wenn so viel Platz ist wie in den Sprachheften.“
//
// Darum: Grundlage sind die alten Toolbox-Blätter des Moduls (daten/mathe-mN-alt.json – Regel, Thermometer, Diagramme,
// Strichlisten, Kästchen, Umfang oder Fläche …). Dazu kommt aus dem Mathe-Programm (daten/mathe-programm.json):
//   · „Schritt für Schritt“ (die Erklärung) · eine Musterlösung und „Noch mehr Beispiele“ (gerechnet)
//   · „Jetzt du“ (wie in den Beispielen) und ein „Übungspäckchen“ – nur wo Aufgaben ohne Bild Sinn machen
//   · „Fit bleiben“ NICHT in jeder Lektion, sondern alle drei Lektionen einmal – dafür mehr Aufgaben
//   · kein „Los geht’s“
// Lektions-Wünsche (Notizen der Lehrerin) stehen unten in EXTRA.
// Aufruf: node tools/hefte/mathe-kompakt.mjs 3   → schreibt die Blätter in src/data/blaetter/mathe-2.json (nur Deutsch; Französisch bleibt)
import { readFileSync, writeFileSync } from 'node:fs'
import { erzeuge } from './mathe-gen.mjs'

const ROOT = new URL('../../', import.meta.url)
const nr = +(process.argv[2] || 3)
const P = JSON.parse(readFileSync(new URL('tools/hefte/daten/mathe-programm.json', ROOT), 'utf8'))
const ALT = JSON.parse(readFileSync(new URL(`tools/hefte/daten/mathe-m${nr}-alt.json`, ROOT), 'utf8'))
const ZIEL = new URL('src/data/blaetter/mathe-2.json', ROOT)

// Programm-Lektionen des Moduls in Reihenfolge → passen der Reihe nach zu den alten Blättern
const M = P.module[nr - 1]
const PL = M.themen.flatMap((t) => t.lektionen)
if (PL.length !== ALT.length) throw new Error(`Modul ${nr}: ${PL.length} Lektionen im Programm, ${ALT.length} alte Blätter`)

const minus = (s) => String(s ?? '').replace(/(^|[\s(;=:→])-(?=\d)/g, '$1−')
const kurz = (l) => minus(String(l).replace(/\s*\([^)]*\)\s*$/, '').replace(/^≈\s*/, '').trim())
const BR = (s) => String(s).replace(/\[\[([^\]/]+)\/([^\]/]+)\]\]/g, '$1/$2').replace(/÷/g, ':')   // geteilt wie im Unterricht: „:“
  .replace(/\s*✓/g, ' – passt').replace(/\|{4}\u0336/g, '4 Striche + 1 Querstrich')   // Zeichen, die die Heft-Schriften nicht haben
// Aufgabe aus dem Erzeuger → [Päckchen-Zeile mit ___, kurze Lösung]
const FORM = {
  rundenEinheit: (x) => [`${/Runde ([\d,]+)/.exec(x.a)[1]} ≈ ___`, kurz(x.l)],
  dezimalMalGanz: (x) => [x.a.replace(/=\s*$/, '= ___'), kurz(x.l)],
  dezimalDurchGanz: (x) => [x.a.replace('÷', ':').replace(/=\s*$/, '= ___'), kurz(x.l)],
  flaecheRechteck: (x) => { const r = /Länge ([\d,]+) (\w+), Breite ([\d,]+)/.exec(x.a), q = /Quadrat mit Seite ([\d,]+) (\w+)/.exec(x.a), e = (r || q)[2];
    return [r ? `${r[1]} ${e} × ${r[3]} ${e}:  A = ___ ${e}²` : `Quadrat ${q[1]} ${e}:  A = ___ ${e}²`, x.l.split('=').pop().trim()] },
  flaecheEinheit: (x) => [x.a, kurz(x.l)],
  tempAenderung: (x) => { const m = /Morgens (-?[\d,]+) °C, mittags (-?[\d,]+) °C/.exec(x.a); return [`${minus(m[1])} °C → ${minus(m[2])} °C:   ___`, kurz(x.l)] },
  mittelwert: (x) => [`${/von: (.*)\.$/.exec(x.a)[1]}  →  moy = ___`, x.l.split('=').pop().trim()],   // Rückmeldung 26.11.: „moy“, nicht Ø
}
// Rückmeldung 26.11.: Brüche nicht „2/3“, sondern übereinander – #z/n# setzt der Päckchen-Renderer als Bruch
const stapel = (s) => String(s).replace(/(?<![\d,.\/#])(\d+)\/(\d+)(?![\d,.\/#])/g, '#$1/$2#')
const allgemein = (x) => { const a = stapel(BR(minus(x.a)).replace('÷', ':').replace('▢', '___')); return [/___/.test(a) ? a : /=\s*\??\s*$/.test(a) ? a.replace(/=\s*\??\s*$/, '= ___') : a + '   ___', kurz(BR(x.l))] }
const zeile = (gen, x) => (FORM[gen.type] || allgemein)(x)
const wuerfle = (gen, n, niveau, seed) => erzeuge(gen, n, niveau, seed).map((x) => zeile(gen, x))
// Beispiel mit Lösung: steht die Einheit schon hinter der Lücke („A = ___ cm²“), nicht noch einmal einsetzen
const gefuellt = ([a, l]) => { const e = /___\s*([^\s:;,]+)/.exec(a)?.[1]; const w = e && String(l).endsWith(' ' + e) ? String(l).slice(0, -e.length - 1) : l; return a.replace('___', '{' + w + '}') }
const lsg = (liste) => liste.map(([, l], i) => 'abcdefghijklmnop'[i] + ') ' + l).join(' · ')

// Stellentafel wie im Unterricht (Foto der Mathelehrerin, 26.11.): Gruppen oben, Kürzel, Namen, dicker Strich = Komma
const DEZ_TAFEL = (zeilen) => ({ art: 'stellentafel', stellen: ['HT', 'ZT', 'T', 'H', 'Z', 'E', 'z', 'h', 't'], komma: 6,
  gruppen: [{ titel: 'Tausender', spalten: 3 }, { titel: 'Einer', spalten: 3 }, { titel: 'Tausendstel', spalten: 3 }],
  namen: ['Hundert-\ntausender', 'Zehn-\ntausender', 'Tausender', 'Hunderter', 'Zehner', 'Einer', 'Zehntel', 'Hundertstel', 'Tausendstel'], zeilen })
// Umwandlungstabelle für Flächen: jede Einheit zwei Spalten (Zehner, Einer), dicke Striche zwischen den Einheiten
const FL = ['km²', 'ha', 'a', 'm²', 'dm²', 'cm²', 'mm²']
const FL_TAFEL = (zeilen) => ({ art: 'stellentafel', stellen: FL.flatMap(() => ['Z', 'E']), komma: -1, gruppen: FL.map((t) => ({ titel: t, spalten: 2 })), zeilen })
const eSp = (e) => FL.indexOf(e) * 2 + 1   // Einer-Spalte einer Einheit

// ---------------- Wünsche der Lehrerin je Lektion (Index im Modul, ab 0) ----------------
const EXTRA = {
  1: {
    // gerundete Ergebnisse mit ≈ (die Schritte erklären das Zeichen); „4 → ab“ bleibt ein Pfeil
    zeichen: (t) => t.replace(/(\d+,\d+|___) → (\d+|___)/g, '$1 ≈ $2')
      .replace('Das Zeichen für „ungefähr gleich“ (zwei Wellenlinien) an die Tafel schreiben; auf dem Blatt steht dafür der Pfeil →.', 'Das Zeichen ≈ für „ungefähr gleich“ (zwei Wellenlinien) an die Tafel schreiben – so steht es auch im Heft.'),
  },
  3: {
    // Lektion 3: „eine Wiederholung von :10, :100, :1000 am Anfang“
    vorne: [{
      bausteine: [
        { art: 'aufgabe', stufe: 1, text: 'Wiederholung: Geteilt durch 10, 100 und 1000. Das Komma springt nach links – so viele Stellen, wie Nullen da sind.' },
        { art: 'kommasprung', spalten: 3, items: [{ zahl: '45,6', op: ':', faktor: 10, label: 'a)', boegen: true }, { zahl: '382', op: ':', faktor: 100, label: 'b)', boegen: true }, { zahl: '1250', op: ':', faktor: 1000, label: 'c)', boegen: true }] },
        { art: 'text', text: 'In der Stellentafel siehst du es: Die Ziffern bleiben gleich, sie rutschen nach rechts. Der dicke Strich ist das Komma. Trag b) und c) selbst ein.' },
        DEZ_TAFEL([{ label: 'a) 45,6', zahl: '45,6' }, { label: '45,6 : 10', zahl: '4,56' }, { label: 'b) 382' }, { label: '382 : 100' }, { label: 'c) 1250' }, { label: '1250 : 1000' }]),
        { art: 'paeckchen', spalten: 3, items: ['7,5 : 10 = ___', '64 : 100 = ___', '3200 : 1000 = ___', '0,9 : 10 = ___', '12,5 : 100 = ___', '450 : 1000 = ___', '86 : 10 = ___', '4,2 : 100 = ___', '725 : 1000 = ___', '9 : 10 = ___', '310 : 100 = ___', '5000 : 1000 = ___'], buchstaben: true },
      ],
      loes: ['Wiederholung: a) 4,56 · b) 3,82 · c) 1,25 – Stellentafel: 382 → 3,82 · 1250 → 1,250 – Päckchen: 0,75 · 0,64 · 3,2 · 0,09 · 0,125 · 0,45 · 8,6 · 0,042 · 0,725 · 0,9 · 3,1 · 5'],
    }],
  },
  5: {
    // Flächeneinheiten: Umwandlungstabelle wie die Stellentafel aus dem Unterricht (Rückmeldung 26.11.)
    nachRegel: [{ ...FL_TAFEL([{ label: '3 m² = 300 dm²', zahl: '300', bis: eSp('dm²') }, { label: '400 cm² = 4 dm²', zahl: '400', bis: eSp('cm²') }, { label: '5 ha = 500 a', zahl: '500', bis: eSp('a') }, { label: '2 a = 200 m²', zahl: '200', bis: eSp('m²') }]),
      titel: 'Die Umwandlungstabelle', punkte: ['Jede Einheit hat zwei Spalten: Zehner und Einer.', 'Schreib die Zahl so, dass die letzte Ziffer in der Einer-Spalte ihrer Einheit steht.', 'Dann liest du in der neuen Einheit ab. Leere Spalten bis dahin: 0.'] }],
    hinten: [{
      bausteine: [
        { art: 'aufgabe', stufe: 1, text: 'Trag in die Umwandlungstabelle ein und rechne um. Die letzte Ziffer kommt in die Einer-Spalte der Einheit.' },
        FL_TAFEL([{ label: 'a) 7 m² = ___ dm²' }, { label: 'b) 2 dm² = ___ cm²' }, { label: 'c) 600 cm² = ___ dm²' }, { label: 'd) 9 a = ___ m²' },
          { label: 'e) 4 ha = ___ a' }, { label: 'f) 800 dm² = ___ m²' }, { label: 'g) 3 km² = ___ ha' }, { label: 'h) 500 mm² = ___ cm²' }]),
      ],
      loes: ['Umwandlungstabelle: a) 700 dm² · b) 200 cm² · c) 6 dm² · d) 900 m² · e) 400 a · f) 8 m² · g) 300 ha · h) 5 cm²'],
    }],
  },
  6: {
    // Temperatur: „+ Hilfestellung Thermometer“ – das Thermometer steht neben den Übungen
    thermometer: true,
  },
  7: {
    // Diagramme: Übungen mit echten Diagrammen statt Zahlen im Text („die von vorher waren wesentlich besser“)
    diagramme: true,   // „Jetzt du“, Übungspäckchen und Wiederholung mit gezeichneten Balken
    ohneBasis: true,   // die Basis-Fragen (Fußball 9, Tennis 4 …) stellt schon die alte Aufgabe „Freizeitsport in der 5e“
    bilder: {
      kern: { art: 'diagramm', titel: 'Lieblingsfarbe', kategorien: ['Blau', 'Rot', 'Gelb', 'Grün'], werte: [7, 5, 5, 3], max: 8, schritt: 2, fein: 1, achsen: ['Farbe', 'Anzahl'], hoehe: 84 },
      plus: { art: 'diagramm', titel: 'Eis-Kugeln am Kiosk', kategorien: ['Mo', 'Di', 'Mi', 'Do'], werte: [12, 8, 15, 10], max: 16, schritt: 4, fein: 1, achsen: ['Tag', 'Kugeln'], hoehe: 84 },
    },
    alltagDiagramm: { k: ['Fußball', 'Basketball', 'Schwimmen', 'Tanzen', 'Skateboard'], l: 'Fußball 8 · Basketball 5 · Schwimmen 3 · Tanzen 6 · Skateboard 2' },
    // Rückmeldung 26.11.: mehr Beispiele
    mehrBeispiele: ['Balkendiagramm „Weg zur Schule“: Bus 9, Auto 4, Fahrrad 2. Wie viele mehr mit dem Bus als mit dem Auto? → 9 − 4 = 5',
      'Balkendiagramm „Lieblingsfarbe“: Blau 7, Rot 5, Grün 3. Was ist am wenigsten beliebt? → Grün (3)',
      'Balkendiagramm „Eis-Kugeln“: Montag 12, Dienstag 8. Wie viele an beiden Tagen zusammen? → 12 + 8 = 20'],
    hinten: [
      {
        bausteine: [
          { art: 'aufgabe', stufe: 2, text: 'Lieblingsfarbe in der 5e. Lies ab und rechne.' },
          { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'diagramm', kategorien: ['Grün', 'Schwarz', 'Blau', 'Rot'], werte: [10, 2, 9, 6], max: 12, schritt: 2, fein: 1, achsen: ['Farbe', 'Anzahl'] }],
            rechts: [{ art: 'paeckchen', spalten: 1, items: ['Wie viele mehr bei Grün als bei Schwarz?   ___', 'Grün und Rot zusammen:   ___', 'So viele wurden befragt:   ___', 'Am beliebtesten ist:   ___'], buchstaben: true }] },
        ],
        loes: ['Lieblingsfarbe: a) 10 − 2 = 8 · b) 16 · c) 27 · d) Grün'],
      },
      {
        bausteine: [
          { art: 'aufgabe', stufe: 2, text: 'Weg zur Schule. Die Balken liegen. Lies unten ab.' },
          { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'diagramm', liegend: true, kategorien: ['Auto', 'Zug', 'zu Fuß', 'Bus'], werte: [7, 6, 5, 9], max: 10, schritt: 2, fein: 1, achsen: ['Weg', 'Anzahl'] }],
            rechts: [{ art: 'paeckchen', spalten: 1, items: ['Am beliebtesten ist:   ___', 'Wie viele mehr mit dem Auto als mit dem Zug?   ___', 'Wie viele kommen nicht mit dem Bus?   ___', 'Alle zusammen:   ___'], buchstaben: true }] },
        ],
        loes: ['Weg zur Schule: a) Bus · b) 1 · c) 18 · d) 27'],
      },
    ],
  },
  8: {
    striche: 'strichliste',   // Aufgaben des großen Dossiers als echte Strichlisten
    mehrBeispiele: ['Strichliste: 4 Fünferbündel und 1 Strich. Wie groß ist die Häufigkeit? → 4 · 5 + 1 = 21',
      'Du willst 13 als Strichliste zeichnen. → 2 Fünferbündel und 3 Striche (2 · 5 + 3 = 13)',
      'Noten: die 1: 2-mal, die 2: 6-mal, die 3: 8-mal. Wie viele Noten sind es? → 2 + 6 + 8 = 16'],
    bilder: {
      kern: { art: 'diagramm', titel: '20-mal gewürfelt', kategorien: ['1', '2', '3', '4', '5', '6'], werte: [3, 5, 2, 4, 3, 3], max: 6, schritt: 1, achsen: ['Augenzahl', 'Häufigkeit'], hoehe: 84 },
      plus: { art: 'strichliste', kopf: ['Note', 'Strichliste', 'Häufigkeit'], zeilen: [{ text: '1', striche: 2 }, { text: '2', striche: 6 }, { text: '3', striche: 8 }, { text: '4', striche: 3 }, { text: '5', striche: 1 }] },
    },
  },
  9: {
    // Durchschnitt: „mehr Beispiele“ und „wann macht ein Mittelwert Sinn? – Noten, Schuhgröße …“
    nachRegel: [{ art: 'info', symbol: 'merke', titel: 'So schreibt man den Mittelwert', punkte: ['moy (von französisch moyenne) – oder ein M mit einem Strich darüber.', 'Beispiel: moy = (12 + 15 + 9 + 14) : 4 = 50 : 4 = 12,5'] },
      { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'info', symbol: 'tipp', titel: 'Beispiel aus dem Alltag', text: 'Punkte in vier Spielen: 12, 15, 9 und 14.', punkte: ['Summe: 12 + 15 + 9 + 14 = 50', 'Anzahl: 4 Spiele', 'Mittelwert: 50 : 4 = 12,5 Punkte pro Spiel', 'Probe: 12,5 liegt zwischen 9 und 15 – passt'] }],
      rechts: [{ art: 'info', symbol: 'achtung', titel: 'Wann macht ein Mittelwert Sinn?', punkte: ['Wenn die Werte Zahlen sind, die man zusammenzählen kann: Noten, Punkte, Temperaturen, Minuten.', 'Wenn kein Wert ganz aus der Reihe fällt.', 'Sonst sagt er wenig: Schuhgröße 38,6 gibt es nicht.'] }] }],
    hinten: [{
      bausteine: [
        { art: 'aufgabe', stufe: 2, text: 'Wann macht ein Mittelwert Sinn? Kreuze an. Schreib kurz, warum.' },
        // andere Beispiele als im Kasten „Wann macht ein Mittelwert Sinn?“: übertragen statt abschreiben
        { art: 'tabelle', spalten: ['Daten', 'sinnvoll', 'nicht sinnvoll', 'Warum?'], breiten: [2.6, 0.9, 1.1, 2.2], zeilen: 0, werte: [
          ['Minuten Schulweg: 10, 15, 20, 5', '', '', ''], ['Körpergröße in cm: 148, 152, 155, 161', '', '', ''], ['Lieblingsfarben: rot, blau, rot, grün', '', '', ''],
          ['Trikotnummern im Team: 7, 10, 23, 99', '', '', ''], ['Taschengeld: 10 €, 10 €, 12 € und 200 €', '', '', '']] },
      ],
      loes: ['Sinnvoll: Schulweg (12,5 min), Körpergröße (154 cm). Nicht sinnvoll: Lieblingsfarben (keine Zahlen), Trikotnummern (Nummern sind Namen, keine Mengen). Vorsicht: Taschengeld (200 € verzieht den Mittelwert auf 58 € – das bekommt fast niemand).'],
    }],
  },
}

// ---------------- Aufbau einer Lektion ----------------
// Rückmeldung 2 (25.11.): „die Anzahl der Übungen wie im großen Dossier behalten“, „die Erklärungen so gut wie im großen
// Dossier“, „Fit bleiben = Wiederholung aus den Modulen davor, vor jedem Kapitel“. Darum kommt jede Lektion jetzt aus
// drei Quellen: (1) das große Dossier (tools/hefte/inhalt/mathe-mN.mjs – Erklärung, Merksatz, Vorgehen, zwei Musterlösungen,
// Beispiele, Gemeinsam, Jetzt du, Basis, Kern, Übungspäckchen, Plus, Exit-Ticket, Rechnen im Alltag, Erklären, Wiederholung
// nach dem Kapitel – mit denselben Zufallszahlen, also dieselben Aufgaben), (2) das alte Toolbox-Blatt (Grafik zur Regel,
// Übungen mit Bildern, Kurz-Check, Lehrer-Hinweise), (3) „Fit für das Kapitel“ aus Modul 1 und 2 (FIT unten).
const { LEKTIONEN: BIG } = await import(new URL(`tools/hefte/inhalt/mathe-m${nr}.mjs`, ROOT))
const zitat = (s) => s.replace(/„([^"“”]*)"/g, '„$1“').replace(/"([^"]*)"/g, '„$1“')   // gerade Anführungszeichen → „…“
const T = (s) => zitat(BR(minus(String(s ?? '').replace(/\*\*/g, '').replace(/\{\{(\d+)\/(\d+)\}\}/g, '$1/$2').replace(/\bNele\b/g, 'Lou'))))
const lies = (s) => T(s).replace(/Hör gut zu und/g, 'Lies und').replace(/Hör zu und/g, 'Lies und').replace(/Hör zu\./g, 'Lies.').replace(/Hör zu/g, 'Lies')
const ohnePunkt = (s) => T(s).replace(/\.\s*$/, '')
// feste Aufgabe {a, l} → Päckchen-Zeile mit Lücke
const posten = (x) => { let a = stapel(T(x.a).trim()); if (/___/.test(a)) {} else if (/=\s*\?\s*$/.test(a)) a = a.replace(/=\s*\?\s*$/, '= ___'); else if (/=\s*$/.test(a)) a = a + ' ___'; else a = a + '   ___'; return [a, ohnePunkt(x.l)] }
const spaltenFuer = (it) => { const m = Math.max(...it.map(([a]) => a.length)); return m <= 22 ? 3 : m <= 46 ? 2 : 1 }
const block = (stufe, text, items, extra = {}) => ({ bausteine: [{ art: 'aufgabe', stufe, text, ...(extra.hinweis ? { hinweis: extra.hinweis } : {}) }, { art: 'paeckchen', spalten: extra.spalten || spaltenFuer(items), items: items.map(([a]) => a), buchstaben: items.length > 1 }, ...(extra.danach || [])], loes: [items.length > 1 ? lsg(items) : items[0][1]] })
const satzWeise = (t) => T(t).split(/(?<=[.!])\s+(?=[A-ZÄÖÜ0-9„−])/).filter(Boolean)

// Zufall mit festem Startwert (Diagramme für Lektion 7)
const zufall = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
const DIAGRAMM_THEMEN = [
  { titel: 'Lieblingssport', achse: 'Sport', k: ['Fußball', 'Tennis', 'Schwimmen', 'Basketball', 'Tanzen'] },
  { titel: 'Weg zur Schule', achse: 'Weg', k: ['Bus', 'Auto', 'Fahrrad', 'zu Fuß', 'Zug'] },
  { titel: 'Lieblingsobst', achse: 'Obst', k: ['Apfel', 'Banane', 'Kiwi', 'Mango', 'Erdbeere'] },
  { titel: 'Lieblingsfarbe', achse: 'Farbe', k: ['Grün', 'Rot', 'Blau', 'Gelb', 'Schwarz'] },
]
// ein Balkendiagramm mit vier Fragen (Ablesen, Vergleichen, Zusammenzählen) – echte Balken statt Zahlen im Text
function diagrammAufgabe(seed, thema, liegend) {
  const r = zufall(seed), th = DIAGRAMM_THEMEN[thema % DIAGRAMM_THEMEN.length]
  const k = [...th.k].sort(() => r() - 0.5).slice(0, 4)
  let w
  do { w = k.map(() => 2 + Math.floor(r() * 10)) } while (new Set(w).size < 4)
  const max = Math.max(...w), i = w.indexOf(max), j = (i + 1 + Math.floor(r() * 3)) % 4, m = w.indexOf(Math.min(...w))
  const fragen = [
    [`Was ist am beliebtesten?   ___`, `${k[i]} (${max})`],
    [`Wie viele bei ${k[j]}?   ___`, String(w[j])],
    [`Wie viele mehr bei ${k[i]} als bei ${k[m]}?   ___`, `${max} − ${w[m]} = ${max - w[m]}`],
    [`Wie viele wurden befragt?   ___`, `${w.join(' + ')} = ${w.reduce((a, b) => a + b, 0)}`],
  ]
  const diagramm = { art: 'diagramm', titel: th.titel, kategorien: k, werte: w, max: max + (max % 2 ? 1 : 2), schritt: 2, fein: 1, achsen: [th.achse, 'Anzahl'], hoehe: 78, ...(liegend ? { liegend: true } : {}) }
  return { diagramm, fragen }
}
const diagrammSpalte = (d) => [d.diagramm, { art: 'paeckchen', spalten: 1, items: d.fragen.map(([a]) => a), buchstaben: true }]

// Strichlisten-Aufgaben aus dem Erzeuger (Lektion 8) → echte Strichliste statt Text
function strichAufgaben(items) {
  const zeilen = [], text = [], loes = []
  for (const x of items) {
    const b = /(\d+) Fünferbündel und (\d+) Strich/.exec(x.a), z = /Du willst (\d+) als Strichliste/.exec(x.a)
    if (b) zeilen.push({ z: { text: '', striche: 5 * +b[1] + +b[2] }, l: String(5 * +b[1] + +b[2]) })
    else if (z) zeilen.push({ z: { text: '', anzahl: +z[1] }, l: `${Math.floor(z[1] / 5)} Bündel + ${z[1] % 5} Striche` })
    else text.push([T(x.a).replace(/\s*Wie oft wurde insgesamt gewürfelt\?/, ' Wie oft insgesamt?   ___'), ohnePunkt(x.l)])
  }
  zeilen.forEach((x, i) => { x.z.text = 'abcdefghijklmnop'[i] + ')' })
  const bausteine = zeilen.length ? [{ art: 'strichliste', kopf: ['', 'Strichliste', 'Häufigkeit'], zeilen: zeilen.map((x) => x.z) }] : []
  return { bausteine, text, loes: zeilen.map((x, i) => 'abcdefghijklmnop'[i] + ') ' + x.l).join(' · ') }
}

// „Fit für das Kapitel“: vor jedem Kapitel (Thema) Aufgaben aus Modul 1 und 2, die man dafür braucht
const FIT = {
  'Dezimalzahlen weiterrechnen': [
    { text: 'aus Modul 2: Dezimalzahlen – Stellenwert, plus und minus', gens: [['dezimalStellenwert', 3], ['dezimalAddSub', 3]] },
    { text: 'aus Modul 1: Runden und Einmaleins', gens: [['runden', 3], ['einmaleins', 3]] },
  ],
  'Flächeninhalt': [
    { text: 'aus Modul 2: Umfang von Rechteck, Quadrat und Dreieck', gens: [['umfang', 4]] },
    { text: 'aus Modul 1: Längen umrechnen und Figuren erkennen', gens: [['laenge', 4], ['figurBenennen', 2]] },
  ],
  'Temperatur': [
    { text: 'aus Modul 1: Vorgänger und Nachfolger, Uhrzeit', gens: [['vorNach', 3], ['uhrzeit', 3]] },
    { text: 'aus Modul 2: Dezimalzahlen plus und minus, Liter', gens: [['dezimalAddSub', 3], ['kapazitaet', 3]] },
  ],
  'Daten und Statistik': [
    { text: 'aus Modul 1: Einmaleins und Rechnen mit Geld', gens: [['einmaleins', 4], ['geld', 2]] },
    { text: 'aus Modul 2: Bruchteil einer Menge', gens: [['bruchteil', 6]] },
  ],
}
const THEMA_VON = M.themen.flatMap((t) => t.lektionen.map(() => t.titel.replace(/ & /g, ' und ')))
function fitFuerKapitel(k) {
  const thema = THEMA_VON[k]
  if (k > 0 && THEMA_VON[k - 1] === thema) return []
  return (FIT[thema] || []).map((teil, j) => {
    const items = teil.gens.flatMap(([type, n], g) => erzeuge({ type }, n, 'basis', nr * 1000 + k * 53 + j * 7 + g).map((x) => allgemein(x)))
    return block(1, `Fit für das Kapitel „${thema}“ – Wiederholung ${teil.text}. Rechne allein, ohne Hilfe.`, items)
  })
}

const zahlAufgaben = (b) => (b.art === 'aufgabe' ? 1 : b.art === 'spalten' ? [...(b.links || []), ...(b.rechts || [])].filter((x) => x.art === 'aufgabe').length : 0)
function baue(alt, k) {
  const pl = PL[k], gr = BIG[k], x = EXTRA[k + 1] || {}
  const gen = pl.gen && (FORM[pl.gen.type] ? pl.gen : null)
  const B = alt.de.bausteine.filter((b) => b.art !== 'seitenumbruch'), L0 = alt.de.lehrer.loesungen
  const ersteAufgabe = B.findIndex((b) => zahlAufgaben(b) > 0)
  const schlussAb = B.length - 2   // „Kurz-Check: Wie sicher bist du?“ + Einschätzung
  const kopf = B.slice(0, ersteAufgabe)
  const schluss = B[schlussAb]?.art === 'text' && B[schlussAb + 1]?.art === 'einschaetzung' ? [{ ...B[schlussAb + 1], titel: B[schlussAb].text }] : B.slice(schlussAb)
  const gruppen = []; let li = 0
  for (const b of B.slice(ersteAufgabe, schlussAb)) {
    const n = zahlAufgaben(b)
    if (n) gruppen.push({ bausteine: [b], loes: L0.slice(li, li + n).map((s) => s.replace(/^\d+\)\s*/, '')) }), li += n
    else gruppen[gruppen.length - 1].bausteine.push(b)
  }

  // --- Erklärung wie im großen Dossier: Begriff, Schritte (mit Grafik des alten Moduls), Merksatz, Vorgehen, Wörter,
  //     zwei Musterlösungen, noch mehr Beispiele
  const regelSp = kopf.find((b) => b.art === 'spalten' && b.links.some((y) => y.art === 'info'))
  const grafik = regelSp ? [...regelSp.links.filter((y) => y.art !== 'info'), ...regelSp.rechts] : []
  const verh = grafik.some((g) => ['strichliste', 'tabelle', 'flaeche'].includes(g.art) || (g.art === 'diagramm' && g.kategorien.some((c) => c.length > 5))) ? '1:1' : '2:1'
  const def = { art: 'info', symbol: 'wissen', titel: T(pl.def.begriff), text: T(pl.def.text) }
  const schritte = { art: 'schritte', stil: 'liste', linien: 0, teilbar: true, items: pl.erklaerung.map((s) => ({ titel: T(s.titel), text: T(s.text) + (s.beispiel ? '  Beispiel: ' + T(s.beispiel) : '') })) }
  const mu = (m, j) => ({ art: 'info', symbol: j ? 'merke' : 'tipp', titel: 'Musterlösung' + (m.titel ? ': ' + T(m.titel) : ''), text: 'Aufgabe: ' + T(m.a), punkte: [...m.schritte.map(T), 'Ergebnis: ' + T(m.erg)] })
  const S0 = nr * 1000 + pl.nr * 10
  // Rückmeldung 26.11.: „gerne mehr Wiederholungen – wo nur 4 stehen, gerne doppelt so viele“ und „gerne mehr Beispiele“
  const einmal = (xs) => xs.filter((y, i) => xs.findIndex((z) => z.a === y.a) === i)
  const basisG = gen ? einmal(erzeuge(gen, 30, 'basis', S0 + 1)) : []
  const kernG = gen ? einmal(erzeuge(gen, 24, 'kern', S0 + 2)).filter((y) => !basisG.some((b) => b.a === y.a)) : []
  const bspG = gen ? einmal(erzeuge(gen, 12, 'basis', S0 + 5)).filter((y) => !basisG.some((b) => b.a === y.a)).slice(0, 6) : []
  const fz = (xs) => xs.map((y) => zeile(gen, y))
  // Lektionen ohne Erzeuger im Programm (7, 8): Beispiele aus dem großen Dossier als Text
  const bspPunkte = gen ? fz(bspG.length >= 4 ? bspG : basisG.slice(19, 25)).map((b) => gefuellt(b).replace(/[{}]/g, ''))
    : [...((gr.regel.reihen.find((r) => r[0]?.titel === 'Noch mehr Beispiele') || [])[0]?.punkte || []).map((p) => T(p)), ...(x.mehrBeispiele || [])]
  const verstehen = [
    { art: 'text', text: 'Die Regel – Schritt für Schritt:' },
    grafik.length ? { art: 'spalten', zusammen: true, verhaeltnis: verh, links: [def, schritte], rechts: grafik } : def,
    ...(grafik.length ? [] : [schritte]),
    { art: 'spalten', zusammen: true, verhaeltnis: '1:1',
      links: [{ art: 'info', symbol: 'merke', titel: 'Merksatz', punkte: satzWeise(pl.merksatz) }],
      rechts: [{ art: 'info', symbol: 'wissen', titel: 'So gehst du vor', punkte: pl.vorgehen.map((v, i) => `${i + 1}. ${T(v).replace(/^\d+\.\s*/, '')}`) },
        ...(pl.wortschatz?.length ? [{ art: 'info', symbol: 'wissen', titel: 'Wörter · Mots', punkte: pl.wortschatz.map((w) => `${T(w.de)} – ${T(w.fr)}`) }] : [])] },
    { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [mu(pl.musterl[0], 0)], rechts: pl.musterl[1] ? [mu(pl.musterl[1], 1)] : [] },
    ...(bspPunkte.length ? [{ art: 'info', symbol: 'merke', titel: 'Noch mehr Beispiele', punkte: bspPunkte }] : []),
    ...(x.nachRegel || []),
  ]

  // --- Üben wie im großen Dossier (dieselben Aufgaben)
  const thermo = (inhalt) => (x.thermometer ? [{ art: 'spalten', zusammen: true, verhaeltnis: '2:1', links: inhalt, rechts: [{ art: 'temperatur', von: -10, bis: 10, items: [{}] }] }] : inhalt)
  const mitThermo = (bl) => (x.thermometer ? { ...bl, bausteine: [bl.bausteine[0], ...thermo(bl.bausteine.slice(1))] } : bl)
  const gemeinsam = block(1, 'Gemeinsam: Rechnet zusammen an der Tafel. Sprecht laut, wie ihr rechnet.', [...pl.gemeinsam.map(posten), ...(gen ? fz(basisG.slice(17, 19)) : [])])
  let jetztDu = null, paeckchen = null
  if (gen) {
    jetztDu = mitThermo(block(1, 'Jetzt du – rechne genau wie in den Beispielen.', fz(basisG.slice(0, 8))))
    paeckchen = mitThermo(block(2, 'Übungspäckchen – übe, bis es sitzt. Erst die leichten, dann die schwereren.', fz([...basisG.slice(11, 17), ...kernG.slice(3, 9)])))
  } else if (x.diagramme) {
    const d1 = diagrammAufgabe(S0 + 1, 0), d = [1, 2, 3].map((t) => diagrammAufgabe(S0 + 2 + t, t, t === 2))
    jetztDu = { bausteine: [{ art: 'aufgabe', stufe: 1, text: 'Jetzt du – lies ab wie in den Beispielen.' }, { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [d1.diagramm], rechts: [{ art: 'paeckchen', spalten: 1, items: d1.fragen.map(([a]) => a), buchstaben: true }] }], loes: [lsg(d1.fragen)] }
    paeckchen = { bausteine: [{ art: 'aufgabe', stufe: 2, text: 'Übungspäckchen – drei Diagramme, je vier Fragen.' },
      { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: diagrammSpalte(d[0]), rechts: diagrammSpalte(d[1]) },
      { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [d[2].diagramm], rechts: [{ art: 'paeckchen', spalten: 1, items: d[2].fragen.map(([a]) => a), buchstaben: true }] }],
      loes: ['links: ' + lsg(d[0].fragen) + ' – rechts: ' + lsg(d[1].fragen) + ' – unten: ' + lsg(d[2].fragen)] }
  } else if (x.striche) {
    const gx = { type: x.striche }, b13 = erzeuge(gx, 17, 'basis', S0 + 1), k14 = erzeuge(gx, 14, 'kern', S0 + 2).filter((y) => !b13.some((b) => b.a === y.a))
    const j = strichAufgaben(b13.slice(3, 11)), p = strichAufgaben([...b13.slice(11, 17), ...k14.slice(0, 6)])
    jetztDu = { bausteine: [{ art: 'aufgabe', stufe: 1, text: 'Jetzt du – wie groß ist die Häufigkeit? Oder zeichne die Striche.' }, ...j.bausteine, ...(j.text.length ? [{ art: 'paeckchen', spalten: 1, items: j.text.map(([a]) => a), buchstaben: false }] : [])], loes: [j.loes + (j.text.length ? ' · ' + j.text.map(([, l]) => l).join(' · ') : '')] }
    paeckchen = { bausteine: [{ art: 'aufgabe', stufe: 2, text: 'Übungspäckchen – Häufigkeit bestimmen, Striche zeichnen, zusammenzählen.' }, ...p.bausteine, ...(p.text.length ? [{ art: 'paeckchen', spalten: 1, items: p.text.map(([a]) => a), buchstaben: false }] : [])], loes: [p.loes + (p.text.length ? ' – Würfeln: ' + p.text.map(([, l]) => l).join(' · ') : '')] }
  }
  const mitBild = (bl, bild) => (bild ? { ...bl, bausteine: [bl.bausteine[0], { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [bild], rechts: bl.bausteine.slice(1).map((b) => (b.art === 'paeckchen' ? { ...b, spalten: 1 } : b)) }] } : bl)
  const A = pl.aufgaben
  const basis = x.ohneBasis ? null : mitBild(block(1, 'Basis – Schritt für Schritt.', [...A.basis.items.map(posten), ...(gen ? fz(basisG.slice(8, 11)) : [])], { hinweis: A.basis.hinweis && T(A.basis.hinweis) }), x.bilder?.basis)
  const kern = mitBild(block(2, 'Kern – das Niveau des Moduls.', [...A.kern.items.map(posten), ...(gen ? fz(kernG.slice(0, 3)) : [])]), x.bilder?.kern)
  const plusIt = A.plus.items.map(posten)
  const plus = mitBild(block(3, 'Plus – zum Knobeln. Rechne in den Kästchen.', plusIt, { spalten: 1, danach: x.bilder?.plus ? [] : [{ art: 'kaestchen', zeilen: 4 }] }), x.bilder?.plus)
  const ex = /^(.*?)\s*\(([^()]*)\)\s*$/.exec(T(pl.exit)) || [null, T(pl.exit), '']
  const exit = block(2, 'Exit-Ticket – allein lösen, ohne Hilfe.', [posten({ a: ex[1], l: ex[2] })], { spalten: 1 })

  // --- Rechnen im Alltag (großes Dossier, ohne Hörtext: zum Lesen)
  const alltag = []
  const h = gr.hoeren
  if (h) {
    const kopfA = [{ art: 'info', symbol: 'wissen', titel: `Rechnen im Alltag: ${T(h.titel)}`, text: `${T(h.wo)}. ${lies(h.situation)}` }, { art: 'dialog', zeilen: h.text.map(([wer, t]) => ({ wer: T(wer), text: T(t) })) }]
    let erst = true
    for (const a of [...(h.vor || []), ...(h.beim || []), ...(h.nach || [])]) {
      const vorne = erst ? kopfA : []; erst = false
      const auf = { art: 'aufgabe', stufe: a.stufe || 1, text: lies(a.auftrag) }
      if (a.art === 'mc') {
        const f = a.fragen[0]
        alltag.push({ bausteine: [...vorne, auf, { art: 'paeckchen', spalten: 1, items: [(f.f ? T(f.f) + '   ' : '') + f.o.map((o) => `${T(o)}  []`).join('       ')] }], loes: [T(f.o[f.r])] })
      } else if (a.art === 'tabelle') {
        const loes = a.zeilen.map((z) => z.map((c) => T(String(c).replace(/[[\]]/g, ''))).filter(Boolean).join(' ')).join(' · ')
        alltag.push({ bausteine: [...vorne, auf, { art: 'tabelle', spalten: a.kopf.map(T), breiten: (a.breiten || a.kopf.map(() => 1)).map((w) => w / 10), zeilen: 0, werte: a.zeilen.map((z) => z.map((c) => (/^\[.*\]$/.test(c) ? '' : T(c)))) }], loes: [loes] })
      } else if (a.art === 'luecken') {
        const it = a.saetze.map((st) => [T(st.replace(/\[[^\]]*\]/g, '___')), [...st.matchAll(/\[([^\]]*)\]/g)].map((m) => T(m[1])).join(' / ')])
        alltag.push({ bausteine: [...vorne, auf, { art: 'paeckchen', spalten: 1, items: it.map(([q]) => q), buchstaben: true }], loes: [lsg(it)] })
      } else if (a.art === 'rechnen') {
        const it = a.items.map(posten)
        alltag.push({ bausteine: [...vorne, auf, { art: 'paeckchen', spalten: 1, items: it.map(([q]) => q), buchstaben: true }, { art: 'kaestchen', zeilen: 3 }], loes: [lsg(it)] })
      } else if (a.art === 'fragen') {
        alltag.push({ bausteine: [...vorne, auf, { art: 'linien', anzahl: 2 }], loes: [T(a.fragen[0].l)] })
      } else if (a.art === 'frei' && x.alltagDiagramm) {
        alltag.push({ bausteine: [...vorne, auf, { art: 'diagramm', kategorien: x.alltagDiagramm.k, max: 10, schritt: 2, fein: 1, achsen: ['Sport', 'Anzahl'], hoehe: 100 }], loes: [x.alltagDiagramm.l] })
      } else if (a.art === 'sprechen') {
        const karte = (a.karten || [])[0]
        alltag.push({ bausteine: [...vorne, { ...auf, text: (a.auftrag.length > 110 ? '' : 'In der Gruppe: ') + T(a.auftrag) }, ...(karte ? [{ art: 'info', symbol: 'tipp', titel: T(karte.titel), punkte: karte.text.map(T) }] : [])], loes: ['mündlich – eigene Lösungen'] })
      }
    }
  }

  // --- Erklären (Schreibauftrag des großen Dossiers)
  const schreib = (gr.schreiben || [])[0]
  const erklaeren = schreib ? { bausteine: [{ art: 'aufgabe', stufe: schreib.stufe || 2, text: 'Erklären: ' + T(schreib.auftrag) }, { art: 'satzanfaenge', items: (schreib.anfaenge || []).map(T), linien: 2 }], loes: ['eigene Erklärung – auf Fachwörter und ein Beispiel achten'] } : null

  // --- Wiederholung nach dem Kapitel (letzte Lektion eines Themas): gemischt aus allen Lektionen des Themas
  let wiederholung = null
  const letzteImThema = k === PL.length - 1 || THEMA_VON[k + 1] !== THEMA_VON[k]
  if (letzteImThema) {
    const imThema = PL.map((l, i) => ({ l, i })).filter((y) => THEMA_VON[y.i] === THEMA_VON[k])
    const mitGen = imThema.filter((y) => y.l.gen && FORM[y.l.gen.type])
    const je = Math.max(2, Math.ceil(8 / Math.max(1, imThema.length)))
    const listen = mitGen.map((y) => fz2(y.l.gen, erzeuge(y.l.gen, je, 'kern', nr * 1000 + y.l.nr * 10 + 9)))
    const gemischt = []
    for (let r = 0; r < je; r++) listen.forEach((l) => l[r] && gemischt.push(l[r]))
    const thema = THEMA_VON[k], bs = [], ls = []
    if (gemischt.length) { bs.push({ art: 'paeckchen', spalten: spaltenFuer(gemischt), items: gemischt.map(([a]) => a), buchstaben: true }); ls.push(lsg(gemischt)) }
    if (imThema.some((y) => EXTRA[y.i + 1]?.diagramme)) { const d = diagrammAufgabe(nr * 1000 + 999, 3, true); bs.push({ art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [d.diagramm], rechts: [{ art: 'paeckchen', spalten: 1, items: d.fragen.map(([a]) => a), buchstaben: false }] }); ls.push('Diagramm: ' + d.fragen.map(([, l]) => l).join(' · ')) }
    const st = imThema.find((y) => EXTRA[y.i + 1]?.striche)
    if (st) { const s = strichAufgaben(erzeuge({ type: EXTRA[st.i + 1].striche }, je, 'kern', nr * 1000 + st.l.nr * 10 + 9)); bs.push(...s.bausteine); if (s.text.length) bs.push({ art: 'paeckchen', spalten: 1, items: s.text.map(([a]) => a), buchstaben: false }); ls.push('Strichliste: ' + s.loes + (s.text.length ? ' · ' + s.text.map(([, l]) => l).join(' · ') : '')) }
    if (bs.length) wiederholung = { bausteine: [{ art: 'aufgabe', stufe: 2, text: `Wiederholung zum Kapitel „${thema}“ – gemischt aus ${imThema.length > 1 ? 'allen Lektionen' : 'der Lektion'}. Was kannst du schon sicher?` }, ...bs], loes: [ls.join(' – ')] }
  }

  const fit = fitFuerKapitel(k)
  const einstiegBilder = kopf.filter((b) => b.art === 'bilder')
  const einstieg = [...einstiegBilder, { art: 'text', text: T(pl.einstieg.text) }]
  const regelRest = kopf.filter((b) => !(b.art === 'bilder' || b.art === 'text') && b !== regelSp)
  const vor = [...fit, ...(x.vorne || [])]
  const ueben = [gemeinsam, jetztDu, basis, kern, ...gruppen, ...(x.hinten || []), ...alltag, paeckchen, plus, exit, erklaeren].filter(Boolean)
  const nach = wiederholung ? [wiederholung] : []
  const bausteine = [...einstieg, ...vor.flatMap((g) => g.bausteine), ...regelRest, ...verstehen, ...ueben.flatMap((g) => g.bausteine), ...schluss, ...nach.flatMap((g) => g.bausteine)]
    .map((b) => (b.art === 'spalten' && b.zusammen === undefined ? { ...b, zusammen: true } : b))
  const loes = [...vor, ...ueben, ...nach].flatMap((g) => g.loes).map((s, i) => (i + 1) + ') ' + s)

  // --- Lehrer-Hinweise: alte Aufgabennummern → neue, dazu die neuen Blöcke
  const aufgabenIn = (liste) => liste.flatMap((b) => (b.art === 'aufgabe' ? [b] : b.art === 'spalten' ? [...b.links, ...b.rechts].filter((y) => y.art === 'aufgabe') : []))
  const altA = aufgabenIn(B), neuA = aufgabenIn(bausteine)
  const nrVon = (bl) => (bl ? neuA.indexOf(bl.bausteine.find((b) => b.art === 'aufgabe')) + 1 : 0)
  const neueNr = (n) => neuA.indexOf(altA[n - 1]) + 1 || n
  const [gemNr, jetztNr, paeckNr, plusNr, exitNr, erklNr, wNr] = [gemeinsam, jetztDu || basis || kern, paeckchen, plus, exit, erklaeren, wiederholung].map(nrVon)
  const EINZEL = /Aufgaben 1 bis \d+, Aufgabe \d+ für alle, die fertig sind\./
  const umschreiben = (t) => {
    const einzel = EINZEL.test(t)
    let u = String(t).replace(EINZEL, '§EINZEL§')
      .replace(/Den Kasten „[^“]+“ (gemeinsam )?lesen/, (_, g) => `„Die Regel – Schritt für Schritt“ ${g || ''}lesen, Grafik daneben zeigen; dann Merksatz und die zwei Musterlösungen`)
      .replace(/(Aufgaben?) (\d+(?:(?:, | und | bis )\d+)*)/g, (_, w, z) => w + ' ' + z.replace(/\d+/g, (n) => String(neueNr(+n))))
    if (einzel) u = u.replace('§EINZEL§', `Aufgaben ${jetztNr} bis ${(paeckNr || exitNr) - 1} nach Stufe; Übungspäckchen (Aufgabe ${paeckNr}) und Plus (Aufgabe ${plusNr}) für alle, die fertig sind.`)
    if (/^Gemeinsam an der Tafel/.test(u)) u += ` Im Heft: Aufgabe ${gemNr}.`
    if (/^Abschluss/.test(u)) u = u.replace('Exit-Ticket:', `Exit-Ticket (Aufgabe ${exitNr}):`) + (erklNr ? ` Erklären (Aufgabe ${erklNr}) als Hausaufgabe.` : '')
    return u
  }
  const lehrer = { ...alt.de.lehrer }
  lehrer.ablauf = (lehrer.ablauf || []).map(umschreiben)
  if (fit.length) lehrer.ablauf.splice(1, 0, `Fit für das Kapitel (10 Min.): Aufgaben 1 und 2 – Wiederholung aus Modul 1 und 2, allein und ohne Hilfe. Kurz vergleichen.`)
  else if (x.vorne) lehrer.ablauf.splice(1, 0, 'Wiederholung (5 Min.): Aufgabe 1 gemeinsam beginnen, dann allein.')
  if (wNr) lehrer.ablauf.push(`Wiederholung zum Kapitel (Aufgabe ${wNr}): gemischte Aufgaben aus dem ganzen Kapitel – vor der Klassenarbeit oder als Hausaufgabe.`)
  if (lehrer.differenzierung) lehrer.differenzierung = Object.fromEntries(Object.entries(lehrer.differenzierung).map(([kk, v]) => [kk, umschreiben(v)]))
  for (const kk of ['tipps', 'material', 'impulse']) if (Array.isArray(lehrer[kk])) lehrer[kk] = lehrer[kk].map(umschreiben); else if (typeof lehrer[kk] === 'string') lehrer[kk] = umschreiben(lehrer[kk])
  lehrer.loesungen = loes
  // Rückmeldung 26.11.: Die Überschrift der Lektion = der Titel aus dem Inhaltsverzeichnis (nicht „Ungefähr wie viel?“)
  const titelInhalt = String(alt.de.untertitel || '').split(' – ')[0].trim() || alt.de.titel
  let blatt = { ...alt, de: { ...alt.de, titel: titelInhalt, untertitel: `Modul ${nr}, Lektion ${k + 1}`, bausteine, lehrer } }
  blatt = JSON.parse(JSON.stringify(blatt, (kk, v) => (typeof v === 'string' ? v.replace(/Ø/g, 'moy') : v)))
  if (x.zeichen) blatt = JSON.parse(JSON.stringify(blatt, (kk, v) => (typeof v === 'string' ? x.zeichen(v) : v)))
  return blatt
}
const fz2 = (gen, xs) => xs.map((y) => zeile(gen, y))

const neu = ALT.map(baue)
const alle = JSON.parse(readFileSync(ZIEL, 'utf8'))
const ids = new Set(neu.map((b) => b.id))
const raus = alle.map((b) => (ids.has(b.id) ? neu.find((n) => n.id === b.id) : b))
writeFileSync(ZIEL, JSON.stringify(raus, null, 2) + '\n')
for (const b of neu) console.log('✓', b.id, '·', b.de.bausteine.length, 'Bausteine ·', b.de.lehrer.loesungen.length, 'Lösungen')
