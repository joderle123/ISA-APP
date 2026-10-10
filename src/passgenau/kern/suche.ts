// Passgenau – Suche im Baukasten (7.2): wortweise wie auf der Blätterseite (src/lib/filter.ts) – jedes Wort muss vorkommen,
// Umlaute und Akzente sind egal, Treffer im Titel zählen 6, in Thema, Format, Ziel, Quelle 3, nur im Text 1.
// Der Suchtext je Eintrag wird einmal berechnet und gemerkt (WeakMap); `suchtexteVorbereiten` macht das vorab in Ruhe-
// zeiten des Browsers, damit schon der erste Buchstabe flüssig bleibt. Die harten Regeln gelten nicht hier, sondern in
// `suchen` (alternativen.ts): erst was erlaubt ist, wird überhaupt durchsucht.
import { prepareInIdle, searchText, searchTokens, tokenMatch, type SearchToken } from '../../lib/filter'
import type { KatalogEintrag } from '../typen'
import { artName, bausteinInhalt, eldibKurz, intern, merkmaleVon, textVon, type Katalog } from './katalog'
import { texte } from './inhalt'
import { FORMAT_NAME, KOMPETENZ_NAME, ROLLE_NAME, TAGESFORM_NAME, themaByKey, type Kompetenz } from './vokabular'

/** Vorbereiteter Suchtext eines Eintrags in drei Teilen: Titel · Thema, Format, Ziel, Quelle … · Text und Sagen-Sätze. */
export interface SuchDoc {
  titel: string
  meta: string
  text: string
}

const DOCS = new WeakMap<KatalogEintrag, SuchDoc>()

/** Titel und Text eines Eintrags in einer Sprache (Schritte: roh aus dem Katalog, Bausteine: aus dem Blatt). */
function textenVon(k: Katalog, e: KatalogEintrag, sprache: 'de' | 'fr'): { titel: string[]; text: string[] } {
  if (e.typ === 'schritt') {
    const t = sprache === 'fr' ? e.fr : e
    if (!t) return { titel: [], text: [] }
    const ev = t.einzelvariante
    return { titel: [t.titel], text: [t.text, ...(t.sagen ?? []), ...(ev ? [ev.text, ...(ev.sagen ?? [])] : [])] }
  }
  if (sprache === 'fr' && !e.sprache.fr) return { titel: [], text: [] }
  return { titel: [textVon(e, sprache).titel], text: texte(bausteinInhalt(k, e, sprache)).map((x) => x.text) }
}

/** Wörter, mit denen man ein Format sucht, auch wenn sie im Namen fehlen („Atem“ für Atmen, „zeichnen“ für Malen). */
const FORMAT_WORTE: Record<string, string> = {
  atmen: 'Atem Atmung Atemübung respiration souffle', malen: 'zeichnen Zeichnung dessin', spiel: 'spielen Spiel jeu', gespraech: 'sprechen reden discussion',
  musik: 'Lied singen Rhythmus musique chanson', schreiben: 'aufschreiben écrire', karten: 'Kartenspiel cartes', geschichte: 'erzählen histoire',
  bewegung: 'bewegen mouvement', rollenspiel: 'Theater jeu de rôle', basteln: 'bricolage', sinne: 'fühlen riechen sens', comic: 'bande dessinée',
}

/** Alles, was die Fachkraft beim Suchen meinen kann, ohne dass es im Text steht: Thema, Art, Ziel, Quelle, Material. */
function metaVon(k: Katalog, e: KatalogEintrag): string {
  const i = intern(k)
  const m: string[] = []
  for (const t of e.thema) {
    const d = themaByKey.get(t)
    m.push(d ? `${d.name} ${d.fr}` : t)
  }
  for (const f of e.format) m.push(FORMAT_NAME[f] ?? f, f, FORMAT_WORTE[f] ?? '')
  for (const r of e.rolle) m.push(ROLLE_NAME[r].de, ROLLE_NAME[r].fr)
  // Ziele: Codes (auch „kog 29“ findet sie, siehe searchTokens) und bei den Hauptzielen der Kurztext („warten können“)
  for (const z of e.eldib) m.push(z.code)
  for (const z of e.eldib) if (z.gewicht === 1) m.push(eldibKurz(k, z.code))
  for (const c of e.kompetenz) {
    const n = KOMPETENZ_NAME[c as Kompetenz]
    m.push(n ? `${n.de} ${n.fr}` : c)
  }
  for (const x of e.material) {
    const n = i.materialName[x]
    m.push(n ? `${n.de} ${n.fr}` : x)
  }
  if (e.typ === 'baustein') {
    // Art des Bausteins (Atemübung, Karten, Skala …) und das Blatt, aus dem er kommt: Titel, Untertitel, Schlagwörter
    for (const a of e.art) m.push(artName(a), a)
    const b = i.q.blatt.get(e.quelle.blatt)
    m.push(e.quelle.nr)
    if (b) {
      m.push(b.de.titel, b.de.untertitel ?? '', ...b.schlagworte)
      if (b.fr) m.push(b.fr.titel, b.fr.untertitel ?? '')
    }
  } else {
    m.push(e.quelle.titel, e.quelle.einheit ?? '')
    for (const t of e.tagesform ?? []) m.push(TAGESFORM_NAME[t])
    // „kurz“ ist ein Wunsch, kein Wort im Text: Schritte bis 5 Minuten tragen es als Merkmal (Blatt-Bausteine sind fast alle kurz)
    if (e.dauer.typ <= 5) m.push('kurz', 'court', 'bref')
  }
  return m.join(' ')
}

/** Suchtext eines Eintrags – einmal berechnet, danach aus dem Speicher. */
export function suchDoc(k: Katalog, e: KatalogEintrag): SuchDoc {
  let d = DOCS.get(e)
  if (!d) {
    const de = textenVon(k, e, 'de')
    const fr = textenVon(k, e, 'fr')
    const titel = searchText([...de.titel, ...fr.titel].join(' '))
    const meta = searchText(metaVon(k, e))
    const text = searchText([...de.text, ...fr.text].join(' '))
    d = { titel, meta, text }
    DOCS.set(e, d)
  }
  return d
}

/** Suchtexte (und die Textmerkmale der Regeln) aller Einträge in Ruhezeiten vorbereiten. Gibt eine Funktion zurück, die das
 *  Vorbereiten beendet (React: Aufräumen des Effekts). Nur im Browser. */
export function suchtexteVorbereiten(k: Katalog): () => void {
  if (typeof window === 'undefined') return () => undefined
  return prepareInIdle([...k.eintraege.values()], (e) => {
    if (e.id.startsWith('pg:')) return
    merkmaleVon(k, e)
    suchDoc(k, e)
  })
}

// --- Wörter -----------------------------------------------------------------------------------------------------------------

/** Endungen, die beim Suchen nicht zählen („warten“ findet „wartet“ und „Wartezeit“, „Gefühle“ auch „Gefühlsrad“), mit der
 *  Länge, die vom Wort mindestens bleiben muss – bei einem einzelnen Buchstaben mehr, sonst fände „leise“ auch „Leistung“. */
const ENDUNGEN: [string, number][] = [['en', 4], ['er', 4], ['es', 4], ['e', 5], ['n', 5], ['s', 5]]

/** Wort mit Stamm: ab fünf Buchstaben zusätzlich ohne Endung. Codes („kog-29“) und Stufen („C3“) bleiben, wie sie sind. */
function mitStamm(t: SearchToken): SearchToken {
  if (t.code || t.level) return t
  const formen = new Set(t.forms)
  for (const f of t.forms) {
    if (f.length < 5) continue
    const ende = ENDUNGEN.find(([x, rest]) => f.endsWith(x) && f.length - x.length >= rest)
    if (ende) formen.add(f.slice(0, -ende[0].length))
  }
  return formen.size === t.forms.length ? t : { ...t, forms: [...formen] }
}

/** Füllwörter („ruhig werden“, „Streit und Wut“): zählen nicht als Suchwort, solange etwas Anderes dasteht – sonst fände „werden“
 *  in jedem zweiten Titel. Besteht die Eingabe nur daraus, wird sie wörtlich gesucht. Verneinungen („ohne“, „nicht“) bleiben
 *  Suchwörter: dafür gibt es die Chips „ohne Schreiben“ und „ohne Material“. */
const FUELLWOERTER = new Set(
  [
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'und', 'oder', 'mit', 'für', 'von', 'vor', 'bei', 'aus', 'zu', 'zur', 'zum', 'im', 'in', 'am', 'an',
    'auf', 'ist', 'sind', 'war', 'wird', 'werden', 'wurde', 'sein', 'hat', 'haben', 'kann', 'können', 'soll', 'muss', 'wie', 'was', 'wer', 'wo', 'ich', 'du', 'er', 'sie', 'es', 'wir',
    'ihr', 'mein', 'dein', 'auch', 'als', 'nach', 'über', 'um', 'so', 'sich', 'mir', 'dir', 'uns',
    'le', 'la', 'les', 'un', 'une', 'et', 'ou', 'avec', 'pour', 'sur', 'dans', 'en', 'au', 'aux', 'est', 'sont', 'être', 'se', 'que', 'qui',
  ].flatMap((w) => searchTokens(w).flatMap((t) => t.forms)),
)

/** Die Wörter einer Eingabe (leer: keine Wörter = alles passt). */
export function suchWoerter(eingabe: string): SearchToken[] {
  const alle = searchTokens(eingabe)
  const inhalt = alle.filter((t) => t.code || t.level || !t.forms.some((f) => FUELLWOERTER.has(f)))
  return (inhalt.length ? inhalt : alle).map(mitStamm)
}

/** Punkte eines Eintrags für die Wörter (0 = kein Treffer): jedes Wort muss irgendwo vorkommen; im Titel 6, in Thema, Format,
 *  Ziel, Quelle 3, nur im Text 1. Ohne Wörter zählt jeder Eintrag 1 (die Reihenfolge bleibt die der Bewertung). */
export function suchPunkte(k: Katalog, e: KatalogEintrag, woerter: SearchToken[]): number {
  if (!woerter.length) return 1
  const d = suchDoc(k, e)
  let p = 0
  for (const w of woerter) {
    const wert = tokenMatch(d.titel, w) ? 6 : tokenMatch(d.meta, w, e.stufen) ? 3 : tokenMatch(d.text, w) ? 1 : 0
    if (!wert) return 0
    p += wert
  }
  return p
}
