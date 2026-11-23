// Modulhefte ohne Hörtexte (Auftrag 23.11.2026: Hörtexte nur in Deutsch und Französisch).
// Mathe, Culture générale, Vie et société, Atelier und Sport: kein QR-Code, keine Audio-Datei. Der frühere Hörteil
// bleibt als Szene zum Lesen (das Gespräch steht gedruckt im Heft); die Aufträge werden zu Leseaufträgen.
// Nur Anweisungen werden umgeschrieben – Lesetexte, Gespräche und Beispiele der Jugendlichen bleiben, wie sie sind.

/** Anweisungen: „Hör zu …“ → „Lies …“ usw. (Reihenfolge wichtig: Besonderes zuerst) */
const ANWEISUNG = [
  [/Hör zu und mach mit/g, 'Eine Person liest vor, alle machen mit'],
  [/Hör zu \(und mach mit\)/g, 'Lies (und mach mit)'],
  [/Hör genau auf die Kommandos/g, 'Lies die Kommandos genau'],
  [/Hör (gut|genau) zu/g, 'Lies genau'],
  [/Hör noch einmal/g, 'Lies noch einmal'],
  [/Hör genau\b/g, 'Lies genau'],
  [/Hör zu und schneide mit/g, 'Lies und schneide mit'],
  [/Hör zu/g, 'Lies'],
  [/Zeichne, was du hörst/g, 'Zeichne, was du liest'],
  [/aus der Hördatei/g, 'aus der Szene'],
  [/(aus|in|zu) dem Hörtext/g, '$1 der Szene'],
  [/wie im Hörtext/g, 'wie in der Szene'],
  [/den Hörtext/g, 'die Szene'],
  [/der Hörtext/g, 'die Szene'],
  [/Ein kleines Hörspiel/g, 'Eine kleine Szene'],
  [/Ein Hörspiel/g, 'Eine Szene'],
  [/Ein Hör-Rätsel/g, 'Ein Rätsel'],
  [/Hör-Rätsel/g, 'Rätsel'],
  [/Hörszene/g, 'Szene'],
  [/Du hörst den Text zweimal\.?/g, ''],
]

// Personen, die man in einer Szene „kennenlernt“ (statt sie zu hören)
const PERSON = /^(eine?n?|zwei|drei|den|die|der)?\s*(?:[a-zäöüß-]+\s)?(Köchin|Koch|Förster|Försterin|Imkerin|Imker|Gärtnerin|Gärtner|Feuerwehrfrau|Mentorin|Lehrerin|Lehrer|Näherin|Sportlehrer|Sportlehrerin|Schiedsrichterin|Kapitänin|Frau|Mann|Kakaobauern|Hüttenarbeiter|Auszubildende|Jugendliche|Team|Tom|Marc|Finn|Chefin|Ärztin|Trainerin|Trainer)\b/

/** Untertitel der Lektion: „…, hörst ein Gespräch und …“ → „…, verfolgst ein Gespräch und …“ */
const NAMEN = /^[A-ZÄÖÜ][a-zäöüé]+( und [A-ZÄÖÜ][a-zäöüé]+)?$/
function untertitel(s) {
  let t = anweisung(s)
    .replace(/liest und hörst/g, 'liest')
    .replace(/hörst (zwei|drei) (Jugendliche|Menschen) über ([^,.]*?)(?= und |,|\.)/g, 'liest, was $1 $2 über $3 erzählen')
    .replace(/hörst ([^,.]*?) erzählen/g, 'liest, was $1 erzählen')
    .replace(/hörst über /g, 'erfährst etwas über ')
    .replace(/hörst, (was|warum|wie|wer|wo|wann|ob|welche|welcher|welches) /g, 'erfährst, $1 ')
  // „hörst <Satzteil>“ bis zum nächsten „ und “, Komma oder Punkt: Personen „triffst“ du, sonst „liest“ oder „verfolgst“ du
  t = t.replace(/hörst ([^,.:;!?]*?)(?=( und |, |\.|:|;|!|\?|$))/g, (_m, np, _z, pos, ganz) => {
    if (PERSON.test(np) || NAMEN.test(np)) return `triffst ${np}`
    const satz = ganz.slice(0, pos).split(/[.!?:]\s/).pop()
    return /\bliest\b/.test(satz) ? `verfolgst ${np}` : `liest ${np}`
  })
  return t
}

const schritt = (a) => {
  if (!a || typeof a !== 'object') return a
  const b = { ...a }
  for (const k of ['auftrag', 'titel', 'hinweis']) if (typeof b[k] === 'string') b[k] = anweisung(b[k])
  return b
}
export const anweisung = (s) => ANWEISUNG.reduce((t, [re, neu]) => t.replace(re, neu), s).replace(/\s{2,}/g, ' ').trim()

/** Eine Lektion ohne Audio: Lesetext ohne QR, Hörteil als Szene zum Lesen, Aufträge umformuliert. */
export function ohneAudio(L) {
  const n = { ...L }
  if (typeof n.untertitel === 'string') n.untertitel = untertitel(n.untertitel)
  if (n.lesen) n.lesen = { ...n.lesen, ohneAudio: true, aufgaben: (n.lesen.aufgaben || []).map(schritt) }
  if (n.hoeren) {
    const h = { ...n.hoeren, lesen: true }
    for (const k of ['was', 'titel', 'situation', 'wieOft']) if (typeof h[k] === 'string') h[k] = anweisung(h[k])
    for (const k of ['vor', 'beim', 'nach']) if (Array.isArray(h[k])) h[k] = h[k].map(schritt)
    n.hoeren = h
  }
  for (const k of ['start', 'ueben', 'sprechen', 'schreiben']) {
    if (Array.isArray(n[k])) n[k] = n[k].map(schritt)
    else if (n[k]?.aufgaben) n[k] = { ...n[k], aufgaben: n[k].aufgaben.map(schritt) }
  }
  return n
}
