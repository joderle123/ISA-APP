// Jahresplan Spielschule: verteilt die Einheiten auf das Drei-Jahres-Rad (Jahr A, B, C; je 36 Wochen) und schreibt
// src/data/spielschule-jahresplan.json (nur Einheiten-ids – Titel, Experimente und Domänen liest das PDF aus den
// Blättern). Deterministisch: dieselben Regeln ergeben immer denselben Plan.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/spielschule-jahresplan.ts [--pruefen]
// --pruefen: nichts schreiben, nur prüfen, ob die JSON-Datei zum Ergebnis passt (Exit-Code 1, wenn nicht).
//
// Regeln (hier von Hand festgelegt):
//  • Anker: Willkommen (Woche 1), Kleeschen (Woche vor dem 6.12.), Bald bin ich ein Schulkind – jedes Jahr.
//  • Feste: die Einheit zum Fest steht einmal im Rad, in der Woche des Festes (src/blatt/jahresplan.ts: FESTE).
//  • Zeitfenster je Einheit (Jahreszeit, Rentrée, Vorlauf, dunkle Zeit …), in Wochen 1–36.
//  • Joker: Kandidaten mit Art und Grund; übrig bleibt, was im Rad keinen Platz hat.
// Danach sucht ein Optimierer (Simulated Annealing mit festem Startwert) die Verteilung mit den ausgewogensten Jahren:
// Themen gleichmäßig auf A/B/C, jeder Lernbereich in jedem Trimester, kein Thema zweimal hintereinander, ähnliche
// Einheiten (z. B. drei Schnee-Wochen) nicht im selben Jahr, höchstens drei Küchenwochen je Jahr.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { nummerieren } from '../src/blatt/nummern'
import type { Blatt, DomaeneId } from '../src/blatt/typen'
import { ANKER, FESTE, JAHRE, TRIMESTER, WOCHEN, FERIEN, MONAT_DER_WOCHE, type JahrId, type JahresplanDaten, type JokerArt } from '../src/blatt/jahresplan'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ZIEL = join(ROOT, 'src/data/spielschule-jahresplan.json')

// --- Einheiten -------------------------------------------------------------------------------------------------

const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.startsWith('spielschule') && d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
const alle = nummerieren(dateien).filter((b) => b.bereich === 'spielschule')
const byId = new Map(alle.map((b) => [b.id, b]))

// --- Feste Wochen ----------------------------------------------------------------------------------------------

/** Welches Jahr bekommt die ganze Einheit zum Fest? Je Jahr zwei Luxemburger Feste, nicht nebeneinander. */
const FEST_JAHR: Record<string, JahrId> = {
  schueberfouer: 'A',
  buergbrennen: 'A',
  liichtmessdag: 'B',
  nationalfeierdag: 'B',
  sprachen: 'B',
  fuesent: 'C',
  eimaischen: 'C',
}

// --- Zeitfenster (Wochen, beide Grenzen eingeschlossen) ----------------------------------------------------------

type Fenster = [number, number][]
const IMMER: Fenster = [[3, 34]]
const F: Record<string, Fenster> = {
  // Ich und die Gruppe: Ankommen in den ersten Wochen
  'sp-das-bin-ich': [[2, 5]],
  'sp-mein-name': [[2, 5]],
  'sp-guten-morgen': [[2, 5]],
  'sp-unsere-regeln': [[2, 5]],
  'sp-schon-allein': [[3, 13]],
  'sp-mitspielen': [[2, 8]],
  'sp-alles-an-seinem-platz': [[2, 10]],
  'sp-ich-helfe-dir': [[4, 34]],
  'sp-kinderkonferenz': [[3, 6]],
  'sp-kinderrechte': [[9, 9]],
  // Gefühle
  'sp-wenn-ich-froh-bin': IMMER,
  'sp-wenn-ich-traurig-bin': [[4, 34]],
  'sp-wenn-ich-wuetend-bin': [[5, 34]],
  'sp-angst-und-mut': [[4, 34]],
  'sp-gefuehle-in-gesichtern': [[3, 13]],
  'sp-ganz-ruhig-werden': [[5, 34]],
  'sp-streiten-und-vertragen': [[5, 34]],
  'sp-darauf-bin-ich-stolz': [[20, 36]],
  'sp-abschied-wiedersehen': [[34, 36]],
  'sp-musik-malt-gefuehle': [[4, 34]],
  // Körper
  'sp-von-kopf-bis-fuss': [[2, 8]],
  'sp-haende-waschen': [[4, 22]],
  'sp-zaehne-putzen': IMMER,
  'sp-ohren-auf': IMMER,
  'sp-hell-und-dunkel': [[7, 19]],
  'sp-fuehlen-und-tasten': IMMER,
  'sp-riechen-und-schmecken': IMMER,
  'sp-bewegungsbaustelle': [[7, 30]],
  // Familie
  'sp-meine-familie': [[2, 8]],
  'sp-bei-uns-zu-hause': IMMER,
  'sp-als-ich-baby-war': [[5, 34]],
  'sp-oma-opa-und-wir': [[3, 30]],
  'sp-ich-helfe-mit': IMMER,
  'sp-gute-nacht': [[7, 19]],
  'sp-familiencafe': [[8, 13], [21, 34]],
  // Herbst
  'sp-apfelzeit': [[2, 6]],
  'sp-bunte-blaetter': [[4, 9]],
  'sp-igel': [[4, 10]],
  'sp-kastanien-eicheln': [[2, 6]],
  'sp-kartoffelzeit': [[2, 7]],
  'sp-wind-und-wetter': [[3, 10]],
  'sp-kuerbis': [[3, 7]],
  // Winter
  'sp-schnee-und-eis': [[14, 19]],
  'sp-warm-angezogen': [[8, 19]],
  'sp-tiere-im-winter': [[9, 19]],
  'sp-licht-und-schatten': [[7, 19]],
  'sp-plaetzchen-backen': [[12, 13]],
  'sp-schneemann': [[14, 21]],
  'sp-spass-im-schnee': [[14, 21]],
  // Frühling
  'sp-kresse-saeen': [[21, 28]],
  'sp-blumen-bluehen': [[22, 30]],
  'sp-vogelnest': [[21, 29]],
  'sp-ei-kueken': [[20, 25]],
  'sp-raupe-schmetterling': [[25, 33]],
  'sp-regen-regenbogen': [[21, 30]],
  'sp-im-garten': [[23, 32]],
  'sp-tiere-im-gras': [[25, 33]],
  // Sommer
  'sp-sonne-schatten': [[29, 36]],
  'sp-wasser-marsch': [[30, 36]],
  'sp-picknick': [[29, 36]],
  'sp-sand-matsch': [[29, 36]],
  'sp-kuehles-heisse-tage': [[31, 36]],
  'sp-wir-verreisen': [[33, 36]],
  'sp-sommernacht': [[31, 36]],
  // Tiere
  'sp-tiere-bauernhof': [[2, 10], [22, 34]],
  'sp-tiere-wald': [[3, 10], [25, 34]],
  'sp-tiere-haustiere': IMMER,
  'sp-tiere-zoo': IMMER,
  'sp-tiere-fische': [[25, 36]],
  'sp-tiere-tierkinder': [[22, 34]],
  'sp-tiere-spuren': [[5, 10], [14, 23]],
  'sp-tiere-wer-wohnt-wo': IMMER,
  // Essen
  'sp-obst-und-gemuese': [[2, 8]],
  'sp-gutes-fruehstueck': IMMER,
  'sp-wir-backen-brot': IMMER,
  'sp-wasser-trinken': [[29, 36]],
  'sp-auf-dem-markt': [[2, 8], [25, 34]],
  'sp-gemuesesuppe': [[7, 19]],
  'sp-gemeinsam-am-tisch': IMMER,
  // Farben, Formen, Zahlen
  'sp-farben-rot-gelb-blau': IMMER,
  'sp-farben-mischen': IMMER,
  'sp-farben-formen': IMMER,
  'sp-farben-gross-klein': IMMER,
  'sp-farben-zaehlen-bis-5': [[3, 22]],
  'sp-farben-zaehlen-bis-10': [[14, 34]],
  'sp-farben-muster': IMMER,
  'sp-farben-sortieren': IMMER,
  'sp-gestern-heute-morgen': [[14, 14]],
  // Unterwegs
  'sp-strasse-sicher': [[6, 10]],
  'sp-fahrzeuge': IMMER,
  'sp-bus': IMMER,
  'sp-feuerwehr': [[5, 34]],
  'sp-beim-arzt': [[7, 24]],
  'sp-berufe-im-ort': IMMER,
  'sp-baustelle': [[21, 34]],
  // Feste
  'sp-geburtstag': IMMER,
  // Fantasie
  'sp-drachen-ritter': IMMER,
  'sp-hokuspokus': IMMER,
  'sp-geschichten-erfinden': IMMER,
  'sp-theater': [[14, 36]],
  'sp-grosse-fragen': [[5, 34]],
  'sp-melusina': [[5, 34]],
  // Kunst, Sprachen, Forschen
  'sp-leuchttisch-werkstatt': [[7, 19]],
  'sp-kreise-wie-kandinsky': IMMER,
  'sp-zirkus-spillschoul': [[30, 36]],
  'sp-haende-sprechen': [[5, 34]],
  'sp-wir-machen-ein-hoerspiel': [[5, 34]],
  'sp-buecherreise': [[25, 26]],
  'sp-forscherbuch': [[3, 13]],
  'sp-magnet-detektive': IMMER,
  'sp-luft-ist-nicht-nichts': [[3, 10], [20, 26]],
  'sp-brueckenbauer': IMMER,
  'sp-bodenroboter': [[5, 34]],
  'sp-unser-waldplatz': [[4, 8]],
  'sp-muell-detektive': IMMER,
}

// --- Joker-Kandidaten -------------------------------------------------------------------------------------------
// kosten: wie ungern die Einheit aus dem Rad fällt (0 = typischer Joker). {sp-id} wird im PDF zur SP-Nummer.

const JOKER: Record<string, { art: JokerArt; grund: string; kosten: number }> = {
  'sp-schneemann': { art: 'wetter', grund: 'Nur, wenn Schnee liegt – dann sofort einschieben.', kosten: 0 },
  'sp-spass-im-schnee': { art: 'wetter', grund: 'Nur, wenn Schnee liegt: Schlitten, Spuren, Rutschen.', kosten: 0 },
  'sp-kuehles-heisse-tage': { art: 'wetter', grund: 'An heißen Tagen im Juni oder Juli.', kosten: 0 },
  'sp-regen-regenbogen': { art: 'wetter', grund: 'Bei Aprilwetter, wenn Regen und Sonne sich abwechseln.', kosten: 2 },
  'sp-sand-matsch': { art: 'wetter', grund: 'An warmen, trockenen Tagen mit Sandkasten oder Matschküche.', kosten: 1 },
  'sp-feuerwehr': { art: 'gelegenheit', grund: 'Wenn die Feuerwehr einen Besuch anbietet (3 Wochen Vorlauf).', kosten: 1 },
  'sp-baustelle': { art: 'gelegenheit', grund: 'Wenn in der Nähe der Schule gebaut wird.', kosten: 0 },
  'sp-auf-dem-markt': { art: 'gelegenheit', grund: 'Wenn im Ort Markttag ist und ein Gang dorthin möglich ist.', kosten: 1 },
  'sp-berufe-im-ort': { art: 'gelegenheit', grund: 'Wenn Familien oder Nachbarn ihren Beruf zeigen möchten.', kosten: 1 },
  'sp-beim-arzt': { art: 'gelegenheit', grund: 'Wenn ein Gesundheitsbesuch ansteht oder Kinder vom Arzt erzählen.', kosten: 2 },
  'sp-als-ich-baby-war': { art: 'gelegenheit', grund: 'Wenn in einer Familie ein Baby geboren wird.', kosten: 1 },
  'sp-tiere-tierkinder': { art: 'gelegenheit', grund: 'Wenn im Frühling Tierkinder zu sehen sind (Hof, Park, Bauernhof).', kosten: 1 },
  'sp-geburtstag': { art: 'gelegenheit', grund: 'Wenn die Klasse ihr Geburtstagsritual einführt – jederzeit.', kosten: 2 },
  'sp-wir-backen-brot': { art: 'gelegenheit', grund: 'Wenn eine Küche oder Bäckerei mitmacht (Ofen).', kosten: 1 },
  'sp-gemuesesuppe': { art: 'gelegenheit', grund: 'Wenn eine Küche mitmacht (Herd) – am besten in der kalten Zeit.', kosten: 1 },
  'sp-bus': { art: 'gelegenheit', grund: 'Wenn ein Ausflug mit dem Bus ansteht.', kosten: 2 },
  'sp-gutes-fruehstueck': { art: 'gelegenheit', grund: 'Wenn die Klasse ein gemeinsames Frühstück einführt.', kosten: 2 },
  'sp-drachen-ritter': { art: 'wunsch', grund: 'Wenn Drachen, Burgen und Mut die Kinder beschäftigen.', kosten: 1 },
  'sp-hokuspokus': { art: 'wunsch', grund: 'Wenn Zaubern und Verwandeln die Kinder packt.', kosten: 1 },
  'sp-tiere-zoo': { art: 'wunsch', grund: 'Wenn Kinder vom Zoo oder von fernen Tieren erzählen.', kosten: 1 },
  'sp-fahrzeuge': { art: 'wunsch', grund: 'Wenn die Bauecke voller Autos und Bagger ist.', kosten: 1 },
  'sp-theater': { art: 'wunsch', grund: 'Wenn die Kinder etwas vorspielen wollen.', kosten: 2 },
  'sp-tiere-fische': { art: 'wunsch', grund: 'Wenn Wasser und Fische die Kinder neugierig machen.', kosten: 2 },
  'sp-licht-und-schatten': { art: 'vertiefung', grund: 'Vertieft Hell und Dunkel ({sp-hell-und-dunkel}) in der dunklen Jahreszeit.', kosten: 1 },
  'sp-farben-sortieren': { art: 'vertiefung', grund: 'Vertieft Ordnen ({sp-alles-an-seinem-platz}) mit Mengen und Merkmalen.', kosten: 1 },
  'sp-farben-gross-klein': { art: 'vertiefung', grund: 'Vergleichen und Messen – nach den Zähl-Wochen.', kosten: 1 },
  'sp-sommernacht': { art: 'vertiefung', grund: 'Sterne und Dunkelheit an langen Sommerabenden.', kosten: 1 },
  'sp-ich-helfe-mit': { art: 'vertiefung', grund: 'Vertieft Ich helfe dir ({sp-ich-helfe-dir}): Dienste in Klasse und Familie.', kosten: 1 },
  'sp-bei-uns-zu-hause': { art: 'vertiefung', grund: 'Vertieft Meine Familie ({sp-meine-familie}): Räume, Möbel, Wege.', kosten: 1 },
  'sp-haende-waschen': { art: 'vertiefung', grund: 'Vertieft Schon allein ({sp-schon-allein}) in der Erkältungszeit.', kosten: 1 },
}

// --- Ähnliche Einheiten: höchstens `max` im selben Jahr -----------------------------------------------------------

const GRUPPEN: { name: string; ids: string[]; max: number }[] = [
  { name: 'Licht', ids: ['sp-laternen', 'sp-hell-und-dunkel', 'sp-licht-und-schatten', 'sp-sonne-schatten', 'sp-sommernacht', 'sp-leuchttisch-werkstatt'], max: 2 },
  { name: 'Schnee', ids: ['sp-schnee-und-eis', 'sp-schneemann', 'sp-spass-im-schnee'], max: 1 },
  { name: 'Wasser', ids: ['sp-regen-regenbogen', 'sp-wasser-marsch', 'sp-tiere-fische', 'sp-wasser-trinken', 'sp-melusina'], max: 2 },
  { name: 'Lebenszyklen', ids: ['sp-vogelnest', 'sp-ei-kueken', 'sp-raupe-schmetterling', 'sp-tiere-im-gras', 'sp-tiere-tierkinder'], max: 2 },
  { name: 'Pflanzen', ids: ['sp-kresse-saeen', 'sp-im-garten', 'sp-blumen-bluehen'], max: 2 },
  { name: 'Butter', ids: ['sp-tiere-bauernhof', 'sp-gutes-fruehstueck'], max: 1 },
  { name: 'Marktstand', ids: ['sp-obst-und-gemuese', 'sp-auf-dem-markt'], max: 1 },
  { name: 'Backen', ids: ['sp-plaetzchen-backen', 'sp-wir-backen-brot'], max: 1 },
  { name: 'Obst', ids: ['sp-picknick', 'sp-obst-und-gemuese', 'sp-geburtstag'], max: 2 },
  { name: 'Kleidung', ids: ['sp-schon-allein', 'sp-warm-angezogen', 'sp-sonne-schatten', 'sp-wind-und-wetter'], max: 2 },
  { name: 'Hände', ids: ['sp-schon-allein', 'sp-haende-waschen'], max: 1 },
  { name: 'Mut', ids: ['sp-angst-und-mut', 'sp-drachen-ritter'], max: 1 },
  { name: 'Verkehr', ids: ['sp-fahrzeuge', 'sp-bus', 'sp-wir-verreisen', 'sp-strasse-sicher'], max: 2 },
  { name: 'Ordnen', ids: ['sp-alles-an-seinem-platz', 'sp-farben-sortieren'], max: 1 },
  { name: 'Klang', ids: ['sp-ohren-auf', 'sp-musik-malt-gefuehle', 'sp-wir-machen-ein-hoerspiel'], max: 2 },
  { name: 'Ankommen', ids: ['sp-das-bin-ich', 'sp-mein-name', 'sp-guten-morgen', 'sp-unsere-regeln'], max: 2 },
]
/** Reihenfolge, wenn beide im selben Jahr stehen. */
const VORHER: [string, string][] = [
  ['sp-farben-zaehlen-bis-5', 'sp-farben-zaehlen-bis-10'],
  ['sp-farben-rot-gelb-blau', 'sp-farben-mischen'],
  ['sp-wenn-ich-froh-bin', 'sp-wenn-ich-wuetend-bin'],
]

/** Jahreszeiten in jedem Jahr: mindestens `min` Einheiten des Themas in den Wochen `von`–`bis` (ohne Anker). */
const JAHRESZEITEN: { thema: string; von: number; bis: number; min: number }[] = [
  { thema: 'herbst', von: 2, bis: 10, min: 2 },
  { thema: 'winter', von: 12, bis: 21, min: 1 },
  { thema: 'fruehling', von: 20, bis: 33, min: 2 },
  { thema: 'sommer', von: 29, bis: 36, min: 2 },
]

/** Mindestzahl je Lernbereich und Trimester (bei 11–13 Wochen). */
const MIN_TRIMESTER: Record<DomaeneId, number> = { 'logique-math': 3, langage: 3, monde: 4, psychomotricite: 2, expression: 2, 'vivre-ensemble': 4 }

// --- Aufbau ----------------------------------------------------------------------------------------------------

const DOMS: DomaeneId[] = ['logique-math', 'langage', 'monde', 'psychomotricite', 'expression', 'vivre-ensemble']
const fehler: string[] = []
for (const id of [...Object.keys(F), ...Object.keys(JOKER), ...ANKER.map((a) => a.einheit), ...FESTE.map((f) => f.einheit)]) if (!byId.has(id)) fehler.push(`unbekannte Einheit: ${id}`)
const fest: Record<JahrId, (string | null)[]> = { A: Array(WOCHEN).fill(null), B: Array(WOCHEN).fill(null), C: Array(WOCHEN).fill(null) }
const setze = (j: JahrId, woche: number, id: string) => {
  if (fest[j][woche - 1]) fehler.push(`Woche ${woche} in Jahr ${j} doppelt belegt (${fest[j][woche - 1]}, ${id})`)
  fest[j][woche - 1] = id
}
for (const a of ANKER) for (const j of JAHRE) setze(j, a.woche, a.einheit)
for (const f of FESTE) if (FEST_JAHR[f.id]) setze(FEST_JAHR[f.id], f.woche, f.einheit)
const fixIds = new Set([...ANKER.map((a) => a.einheit), ...FESTE.filter((f) => FEST_JAHR[f.id]).map((f) => f.einheit)])
const frei = alle.filter((b) => !fixIds.has(b.id))
for (const b of frei) if (!F[b.id]) fehler.push(`kein Zeitfenster für ${b.id}`)
if (fehler.length) {
  console.error(fehler.join('\n'))
  process.exit(1)
}

// Slots: alle freien Wochen in A, B, C
const slots: { j: number; w: number }[] = []
JAHRE.forEach((j, ji) => fest[j].forEach((x, i) => (x ? null : slots.push({ j: ji, w: i + 1 }))))
const R = frei.length - slots.length
const kandidaten = frei.filter((b) => JOKER[b.id])
if (R < 0 || R > kandidaten.length) {
  console.error(`Plätze ${slots.length}, freie Einheiten ${frei.length}, Joker-Kandidaten ${kandidaten.length} – passt nicht.`)
  process.exit(1)
}

// Kompakte Daten für den Optimierer: Index 0 … n-1 = freie Einheiten, dazu die festen Einheiten
const themen = [...new Set(alle.map((b) => b.thema))]
interface E {
  id: string
  thema: number
  dom: number[]
  kueche: boolean
  ausflug: boolean
  vorlauf3: boolean
  passt: boolean[]
  joker: number // Kosten, Infinity = muss ins Rad
}
const info = (b: Blatt, fenster: Fenster | null): E => {
  const fr = b.de.lehrer.spielschule?.freitag
  const passt = Array(WOCHEN + 1).fill(false)
  for (const [a, z] of fenster ?? []) for (let w = a; w <= z; w++) passt[w] = true
  return {
    id: b.id,
    thema: themen.indexOf(b.thema),
    dom: (b.woche?.domaenen ?? []).map((d) => DOMS.indexOf(d)),
    kueche: !!fr?.kueche,
    ausflug: !!fr?.ausflug,
    vorlauf3: fr?.vorlauf === 3,
    passt,
    joker: JOKER[b.id] ? JOKER[b.id].kosten : Infinity,
  }
}
const E_FREI = frei.map((b) => info(b, F[b.id]))
const E_FEST = new Map(alle.filter((b) => fixIds.has(b.id)).map((b) => [b.id, info(b, null)]))
const idx = new Map(E_FREI.map((e, i) => [e.id, i]))
const gruppen = GRUPPEN.map((g) => ({ ...g, ids: g.ids }))
const ankerIds = new Set(ANKER.map((a) => a.einheit))
const ferienNach = new Set(FERIEN.map((f) => f.nach))
const triVon = (w: number) => TRIMESTER.findIndex((t) => w >= t.von && w <= t.bis)

// --- Bewertung -------------------------------------------------------------------------------------------------

type Zustand = { slot: number[]; joker: number[] }

function jahre(z: Zustand): E[][] {
  const y: E[][] = JAHRE.map((j) => fest[j].map((x) => (x ? E_FEST.get(x)! : (null as unknown as E))))
  z.slot.forEach((u, s) => (y[slots[s].j][slots[s].w - 1] = E_FREI[u]))
  return y
}

function bewerten(z: Zustand, bericht = false): number {
  let s = 0
  const notiz: string[] = []
  // Zeitfenster
  z.slot.forEach((u, si) => {
    if (!E_FREI[u].passt[slots[si].w]) {
      s += 1000
      if (bericht) notiz.push(`Fenster verletzt: ${E_FREI[u].id} in Woche ${slots[si].w}`)
    }
  })
  const y = jahre(z)
  // Themen gleichmäßig auf die Jahre (ohne Anker)
  const tz = themen.map(() => [0, 0, 0])
  y.forEach((woche, j) => woche.forEach((e) => (ankerIds.has(e.id) ? null : tz[e.thema][j]++)))
  for (const t of tz) {
    const m = (t[0] + t[1] + t[2]) / 3
    for (const c of t) s += 3 * (c - m) ** 2
  }
  // Lernbereiche: gleich viele je Jahr, Mindestzahl je Trimester
  const dz = DOMS.map(() => [0, 0, 0])
  y.forEach((woche, j) => {
    const tri = [0, 1, 2].map(() => DOMS.map(() => 0))
    woche.forEach((e, i) => e.dom.forEach((d) => (dz[d][j]++, tri[triVon(i + 1)][d]++)))
    tri.forEach((t, ti) =>
      t.forEach((c, d) => {
        const fehlt = MIN_TRIMESTER[DOMS[d]] - c
        if (fehlt > 0) {
          s += 12 * fehlt * fehlt
          if (bericht) notiz.push(`Jahr ${JAHRE[j]}, Trimester ${ti + 1}: ${DOMS[d]} nur ${c}×`)
        }
      }),
    )
  })
  for (const d of dz) {
    const m = (d[0] + d[1] + d[2]) / 3
    for (const c of d) s += 1.5 * (c - m) ** 2
  }
  // Psychomotorik und Ausdruck sind in der Sammlung knapp: lieber im Rad als im Joker
  for (const u of z.joker) for (const d of E_FREI[u].dom) if (d === 3 || d === 4) s += 1.5
  // Nachbarwochen: nicht zweimal dasselbe Thema
  y.forEach((woche, j) =>
    woche.forEach((e, i) => {
      if (i === 0) return
      if (woche[i - 1].thema === e.thema) {
        s += ferienNach.has(i) ? 1.5 : 5
        if (bericht && !ferienNach.has(i)) notiz.push(`Jahr ${JAHRE[j]}, Woche ${i}/${i + 1}: zweimal ${themen[e.thema]}`)
      }
      if (i > 1 && woche[i - 2].thema === e.thema) s += 1.2
      if (woche[i - 1].kueche && e.kueche) s += 4
    }),
  )
  // Ähnliche Einheiten, Küche, Ausflüge, Vorlauf, Reihenfolge
  y.forEach((woche, j) => {
    const ids = new Map(woche.map((e, i) => [e.id, i]))
    for (const g of gruppen) {
      const c = g.ids.filter((x) => ids.has(x)).length
      if (c > g.max) {
        s += 8 * (c - g.max)
        if (bericht) notiz.push(`Jahr ${JAHRE[j]}: ${c}× ${g.name}`)
      }
    }
    const k = woche.filter((e) => e.kueche).length
    if (k > 3) s += 8 * (k - 3)
    const a = woche.filter((e) => e.ausflug).length
    if (a > 3) s += 6 * (a - 3)
    const v = woche.filter((e) => e.vorlauf3 && !ankerIds.has(e.id)).length
    if (v > 2) s += 6 * (v - 2)
    for (const [x, z2] of VORHER) if (ids.has(x) && ids.has(z2) && ids.get(x)! > ids.get(z2)!) s += 4
  })
  // Jahreszeiten
  y.forEach((woche, j) => {
    for (const jz of JAHRESZEITEN) {
      const t = themen.indexOf(jz.thema)
      const c = woche.slice(jz.von - 1, jz.bis).filter((e) => e.thema === t && !ankerIds.has(e.id)).length
      if (c < jz.min) {
        s += 15 * (jz.min - c)
        if (bericht) notiz.push(`Jahr ${JAHRE[j]}: nur ${c}× ${jz.thema}`)
      }
    }
  })
  // Joker-Kosten
  for (const u of z.joker) s += 2 * E_FREI[u].joker
  if (bericht && notiz.length) console.log('  Hinweise:\n   ' + notiz.join('\n   '))
  return s
}

// --- Optimierer (deterministisch) -------------------------------------------------------------------------------

function zufall(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function start(rnd: () => number): Zustand {
  // Joker: die R billigsten Kandidaten; Rest nach engstem Fenster zuerst auf passende Plätze
  const sortiert = [...kandidaten].sort((a, b) => JOKER[a.id].kosten - JOKER[b.id].kosten || alle.indexOf(a) - alle.indexOf(b))
  const joker = sortiert.slice(0, R).map((b) => idx.get(b.id)!)
  const jokerSet = new Set(joker)
  const rest = E_FREI.map((_, i) => i).filter((i) => !jokerSet.has(i))
  rest.sort((a, b) => E_FREI[a].passt.filter(Boolean).length - E_FREI[b].passt.filter(Boolean).length)
  const slot: number[] = Array(slots.length).fill(-1)
  const offen = slots.map((_, i) => i)
  for (const u of rest) {
    const passend = offen.filter((s) => E_FREI[u].passt[slots[s].w])
    const wahl = passend.length ? passend[Math.floor(rnd() * passend.length)] : offen[Math.floor(rnd() * offen.length)]
    slot[wahl] = u
    offen.splice(offen.indexOf(wahl), 1)
  }
  return { slot, joker }
}

function optimieren(seed: number, schritte: number): { z: Zustand; s: number } {
  const rnd = zufall(seed)
  const z = start(rnd)
  let s = bewerten(z)
  let best = { z: { slot: [...z.slot], joker: [...z.joker] }, s }
  const t0 = 40
  const t1 = 0.03
  for (let k = 0; k < schritte; k++) {
    const T = t0 * Math.pow(t1 / t0, k / schritte)
    let rueck: () => void
    if (rnd() < 0.8 || !z.joker.length) {
      const a = Math.floor(rnd() * slots.length)
      const b = Math.floor(rnd() * slots.length)
      if (a === b) continue
      ;[z.slot[a], z.slot[b]] = [z.slot[b], z.slot[a]]
      rueck = () => ([z.slot[a], z.slot[b]] = [z.slot[b], z.slot[a]])
    } else {
      const a = Math.floor(rnd() * slots.length)
      if (!isFinite(E_FREI[z.slot[a]].joker)) continue
      const r = Math.floor(rnd() * z.joker.length)
      ;[z.slot[a], z.joker[r]] = [z.joker[r], z.slot[a]]
      rueck = () => ([z.slot[a], z.joker[r]] = [z.joker[r], z.slot[a]])
    }
    const neu = bewerten(z)
    if (neu <= s || rnd() < Math.exp((s - neu) / T)) {
      s = neu
      if (s < best.s) best = { z: { slot: [...z.slot], joker: [...z.joker] }, s }
    } else rueck()
  }
  return best
}

const SCHRITTE = 120000
let bestes = optimieren(1, SCHRITTE)
for (const seed of [2, 3, 4, 5, 6]) {
  const x = optimieren(seed, SCHRITTE)
  if (x.s < bestes.s) bestes = x
}

// --- Ergebnis --------------------------------------------------------------------------------------------------

const y = jahre(bestes.z)
const monat = (w: number) => MONAT_DER_WOCHE[w - 1]
function passtText(f: Fenster): string {
  return f.map(([a, z]) => (a <= 3 && z >= 34 ? 'jederzeit' : monat(a) === monat(z) ? monat(a) : `${monat(a)} – ${monat(z)}`)).join(' oder ')
}
const daten: JahresplanDaten = {
  hinweis: 'Erzeugt von scripts/spielschule-jahresplan.ts (npm run blaetter:jahresplan-daten) – nicht von Hand ändern.',
  wochen: WOCHEN,
  jahre: { A: y[0].map((e) => e.id), B: y[1].map((e) => e.id), C: y[2].map((e) => e.id) },
  joker: bestes.z.joker
    .map((u) => E_FREI[u].id)
    .sort((a, b) => alle.indexOf(byId.get(a)!) - alle.indexOf(byId.get(b)!))
    .map((id) => ({ einheit: id, art: JOKER[id].art, grund: JOKER[id].grund, passt: passtText(F[id]) })),
}

console.log(`Bewertung ${bestes.s.toFixed(1)} · ${slots.length} freie Wochen, ${daten.joker.length} Joker`)
bewerten(bestes.z, true)
JAHRE.forEach((j, ji) => {
  const dom = DOMS.map((d, di) => `${d.slice(0, 5)} ${TRIMESTER.map((t) => y[ji].slice(t.von - 1, t.bis).filter((e) => e.dom.includes(di)).length).join('/')}`)
  console.log(`\nJahr ${j}: ${dom.join(' · ')}`)
  y[ji].forEach((e, i) => console.log(`  ${String(i + 1).padStart(2)} ${byId.get(e.id)!.nr.padEnd(7)} ${byId.get(e.id)!.thema.padEnd(10)} ${byId.get(e.id)!.de.titel}`))
})
console.log('\nJoker: ' + daten.joker.map((x) => `${byId.get(x.einheit)!.nr} ${x.einheit} (${x.art})`).join(', '))

const json = JSON.stringify(daten, null, 2) + '\n'
if (process.argv.includes('--pruefen')) {
  const alt = readFileSync(ZIEL, 'utf8')
  if (alt !== json) {
    console.error(`✗ ${ZIEL} passt nicht zu den Regeln – neu erzeugen.`)
    process.exitCode = 1
  } else console.log(`✓ ${ZIEL} ist aktuell.`)
} else {
  writeFileSync(ZIEL, json)
  console.log(`✓ ${ZIEL}`)
}
