// Gemeinsame Bausteine für die Sachfächer der Voie de préparation:
// Culture générale (CULGE, 9 Module) und Vie et société (VIESO).
// Grundlage CULGE: MENJE, Leitfaden „La voie de préparation de l’enseignement secondaire général“ (Module 1/4/7:
// Geschichte, Bürgerkunde, Berufsorientierung · 2/5/8: Biologie, Gesundheit, nachhaltige Entwicklung ·
// 3/6/9: Geografie, Physik/Chemie, neue Technologien, Medienbildung).
// Grundlage VIESO: MENJE, Rahmenlehrplan „Leben und Gesellschaft“ (Lernfelder und Themen der 7., 8. und 9. Klasse).
import { KARTEN_QUELLE } from './karten.mjs'

export const mische = (hex, ziel, anteil) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(hex.slice(1 + i, 3 + i), 16) * (1 - anteil) + ziel * anteil).toString(16).padStart(2, '0')).join('')

// nur für die Stimme (Python-Regex, Reihenfolge zählt)
export const SACH_AUSSPRACHE = {
  // zuerst: Notrufnummern und feste Beispiele (sonst greifen die Jahreszahl- und Einheiten-Regeln)
  '\\b112\\b': 'eins eins zwei', '116 111': 'eins eins sechs, eins eins eins', '8002 1234': 'acht null null zwei, eins zwei drei vier',
  'MHBfjAg3WmS!': 'M, H, B, f, j, A, g, drei, W, m, S, Ausrufezeichen', 'JOJO15': 'Jojo fünfzehn', 'BEE SECURE': 'Bie Sikjur', '\\bSePAS\\b': 'Sepass', '\\bUNESCO\\b': 'Unesko',
  '\\bUND\\b': 'und', '\\bODER\\b': 'oder', 'Cześć': 'Tschäschtsch', 'Olá': 'Ola', '\\bHej\\b': 'Hei', '8002 5500': 'acht null null zwei, fünf fünf null null',
  // Tausender mit Leerzeichen („300 000“) als eine Zahl lesen
  '(\\d)[  ](\\d{3})\\b': '\\1\\2', '(\\d+)/(\\d\\d)\\b': '\\1 auf \\2',
  '\\bv\\. ?Chr\\.': 'vor Christus', '\\bn\\. ?Chr\\.': 'nach Christus', '\\bz\\. ?B\\.': 'zum Beispiel', '\\bca\\.': 'zirka', '\\bbzw\\.': 'beziehungsweise',
  '\\bd\\. ?h\\.': 'das heißt', '\\bJh\\.': 'Jahrhundert', '\\busw\\.': 'und so weiter', '\\bu\\. ?a\\.': 'unter anderem', '\\bNr\\.': 'Nummer', '\\bStd\\.': 'Stunden',
  // doppelte Angaben in Klammern nicht zweimal vorlesen: „vor Christus (vor Christus)“, „Grad Celsius (°C)“
  '(vor|nach) Christus \\((vor|nach) Christus\\)': '\\1 Christus', '\\s*\\(°C\\)': '', '\\s*\\(kWh\\)': '',
  'CO₂': 'Ce O zwei', '\\bEU\\b': 'E U', '\\bKI\\b': 'Ka I', '\\bpH\\b': 'pe ha', '#ad\\b': 'Hashtag äd', '\\bApp(s?)\\b': 'Äpp\\1', '\\bFI-': 'F I ',
  '(\\d) ?km²': '\\1 Quadratkilometer', '(\\d) ?km/h': '\\1 Kilometer pro Stunde', '(\\d) ?km\\b': '\\1 Kilometer', '(\\d) ?cm\\b': '\\1 Zentimeter', '(\\d) ?mm\\b': '\\1 Millimeter',
  '(\\d) ?kg\\b': '\\1 Kilogramm', '(\\d) ?g\\b': '\\1 Gramm', '(\\d) ?ml\\b': '\\1 Milliliter', '(\\d) ?l\\b': '\\1 Liter', '(\\d) ?m\\b': '\\1 Meter', '(\\d) ?W\\b': '\\1 Watt', '(\\d) ?kWh\\b': '\\1 Kilowattstunden',
  '(\\d) ?°C': '\\1 Grad', '°': ' Grad', '(\\d) ?%': '\\1 Prozent', '(\\d+),(\\d\\d) ?€': '\\1 Euro \\2', '(\\d+) ?€': '\\1 Euro',
  // Jahreszahlen 1100–1999 wie im Deutschen: „achtzehnhundertneununddreißig“, auch „1980er-Jahre“
  '\\b(1[1-9])([1-9]0)er\\b': '\\1hundert\\2er',
  '\\b(1[1-9])00\\b': '\\1hundert', '\\b(1[1-9])0(\\d)\\b': '\\1hundert\\2', '\\b(1[1-9])([1-9]\\d)\\b': '\\1hundert\\2',
  '(\\d)\\.(\\d{3})\\b': '\\1\\2', ' – ': ', ', '→': ', also ', '≈': ' ungefähr ', '\\+': ' plus ', '\\|': ', ',
}

const ANLEITUNG = {
  culge: [
    'Jede Lektion hat diese Teile: **Los geht’s**, **Lesen und verstehen**, **Hören**, **Merken**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Neben jedem Lesetext und jedem Hörtext ist ein **QR-Code**. Halte die Kamera deines Handys darauf: Du hörst den Text, auch langsamer.',
    'In diesem Fach arbeitest du mit **Karten**, **Zeitleisten**, **Schaubildern** und **Versuchen**. Lies die Legende und schau genau hin.',
    'Die Punkte zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Die wichtigsten Fachwörter stehen auch auf Französisch.',
  ],
  vieso: [
    'Jede Lektion hat diese Teile: **Los geht’s**, **Lesen**, **Hören**, **Gut zu wissen**, **Nachdenken**, **Miteinander reden** und **Meine Gedanken**.',
    'Neben jedem Text ist ein **QR-Code**. Halte die Kamera deines Handys darauf: Du hörst den Text, auch langsamer.',
    'Viele Aufgaben haben **kein Richtig oder Falsch**. Wichtig ist, dass du deine Meinung **begründest** und anderen **zuhörst**.',
    'Persönliches erzählst du nur, wenn du willst. Du darfst immer eine **ausgedachte Person** nehmen. Sorgen? Sprich mit einer Vertrauensperson oder ruf **116 111** an (kostenlos, anonym).',
  ],
}

const TEILE = {
  culge: { start: { de: 'Los geht’s', icon: 'rocket' }, lesen: { de: 'Lesen und verstehen', icon: 'book' }, hoeren: { de: 'Hören', icon: 'headphones' }, regel: { de: 'Merken', icon: 'bulb' }, ueben: { de: 'Üben', icon: 'pencil' }, sprechen: { de: 'Austauschen', icon: 'messages' }, schreiben: { de: 'Schreiben', icon: 'writing' } },
  vieso: { start: { de: 'Los geht’s', icon: 'rocket' }, lesen: { de: 'Lesen', icon: 'book' }, hoeren: { de: 'Hören', icon: 'headphones' }, regel: { de: 'Gut zu wissen', icon: 'bulb' }, ueben: { de: 'Nachdenken', icon: 'brain' }, sprechen: { de: 'Miteinander reden', icon: 'messages' }, schreiben: { de: 'Meine Gedanken', icon: 'writing' } },
}
const MEDIEN = {
  culge: [['book', 'var(--lesen)', 'Lesen', 'Sachtexte und Quellen'], ['headphones', 'var(--hoeren)', 'Hören', 'QR-Code scannen'], ['map-2', 'var(--regel)', 'Entdecken', 'Karten, Zeitleisten, Versuche'], ['writing', 'var(--schreiben)', 'Schreiben', 'mit viel Platz']],
  vieso: [['book', 'var(--lesen)', 'Lesen', 'Geschichten und Fragen'], ['headphones', 'var(--hoeren)', 'Hören', 'QR-Code scannen'], ['cards', 'var(--regel)', 'Karten', 'zum Reden und Ausschneiden'], ['messages', 'var(--schreiben)', 'Reden', 'zuhören und begründen']],
}
const JAHR = ['7P', '7P', '7P', '6P', '6P', '6P', '5P', '5P', '5P']

/** Modul-Kopf für Culture générale ('culge') und Vie et société ('vieso'). */
export function sachModul(fach, nr, o) {
  const tief = o.farbe
  const culge = fach === 'culge'
  return {
    id: `${fach}-m${nr}`, kuerzel: `${culge ? 'cg' : 'vs'}${nr}`, nr, sprache: 'de', klasse: 'Voie de préparation',
    niveau: `${o.jahr || JAHR[nr - 1]} · Modul ${nr} von 9`,
    dateiname: `${culge ? 'Culture-generale' : 'Vie-et-societe'}_Modul-${nr}`,
    fach: culge ? { de: 'Culture générale', fr: 'Culture générale' } : { de: 'Vie et société', fr: 'Vie et société' },
    titel: { de: o.titel, fr: o.titelFr || '' },
    untertitel: { de: o.unter, fr: o.unterFr || '' },
    farben: { tief, mittel: mische(tief, 255, 0.55), zart: mische(tief, 255, 0.92), dunkel: mische(tief, 0, 0.35) },
    deckbild: o.deckbild, blasen: o.blasen,
    themen: o.themen,
    anleitung: o.anleitung || ANLEITUNG[fach], checkMitSchreiben: true,
    teile: TEILE[fach], medien: MEDIEN[fach],
    quellen: [o.karten ? KARTEN_QUELLE : '', o.quellen || ''].filter(Boolean).join(' '),
    aussprache: { ...SACH_AUSSPRACHE, ...(o.aussprache || {}) },
  }
}
