// ---------------------------------------------------------------------------
// Spielschule (Cycle 1)
// 1. Feste Bezeichnungen für die Seite „Beobachten & Begleiten“ und die Zusatzseiten
//    (Klassenraster, Portfolio, Elternbrief) – Lernbereiche des Plan d'études,
//    Beobachtungsstufen, Jahrgänge, Standard-Sicherheitssätze. Inhalte stehen in den
//    Blättern (typen.ts: Spielideen, Themenwoche); hier nur, was für alle gleich ist.
// 2. Geometrie und Aufteilung der Bausteine zum Tun – Labyrinth, Mini-Buch, Punkte
//    verbinden, Fädelkarte, Suchbild, Laufweg, Farbpunkte im Text. Reine Rechnungen
//    ohne React: das PDF (src/blatt/pdf/spielschule.tsx) und das Prüfskript
//    (scripts/blatt-pruefen.ts) nutzen dieselben Zahlen. Maße in pt (1 mm = 2,835 pt).
// ---------------------------------------------------------------------------

import type { Baustein, BildId, Blatt, DomaeneId, Farbwort, Freitagskarte, PunkteForm, Sprache, Spielideen, WochenWort } from './typen'

/** Lernbereiche des Plan d'études Cycle 1 (MENFP 2011). Die französischen Bezeichnungen sind die des Dokuments;
 *  die deutschen sind Arbeitsübersetzungen (gegen eine deutsche Fassung prüfen, falls vorhanden). */
export const DOMAENEN: { id: DomaeneId; fr: string; de: string; farbe: string }[] = [
  { id: 'logique-math', fr: 'Raisonnement logique et mathématique', de: 'Logisches Denken und Mathematik', farbe: '#3F46A8' },
  { id: 'langage', fr: 'Langage, langue luxembourgeoise et éveil aux langues', de: 'Sprache, Luxemburgisch und Öffnung für Sprachen', farbe: '#1F6B6F' },
  { id: 'monde', fr: 'Découverte du monde par tous les sens', de: 'Die Welt mit allen Sinnen entdecken', farbe: '#3F6E3A' },
  { id: 'psychomotricite', fr: 'Psychomotricité, expression corporelle et santé', de: 'Psychomotorik, Körperausdruck und Gesundheit', farbe: '#3E6A85' },
  { id: 'expression', fr: 'Expression créatrice, éveil à l’esthétique et à la culture', de: 'Kreativer Ausdruck, Ästhetik und Kultur', farbe: '#A33B5B' },
  { id: 'vivre-ensemble', fr: 'Vie en commun et valeurs', de: 'Zusammenleben und Werte', farbe: '#8A6414' },
]
export const domaeneById = new Map(DOMAENEN.map((d) => [d.id, d]))

/** Die drei festen Stufen jedes Beobachtungspunkts (FR bewusst ohne Mittelpunkt-Formen). */
export const BEOBACHTUNG_STUFEN: Record<Sprache, [string, string, string]> = {
  de: ['mit Hilfe', 'allein', 'zeigt es anderen'],
  fr: ['avec de l’aide', 'tout seul', 'le montre aux autres'],
}

/** Die drei Jahrgänge des Cycle 1 (Schlüssel wie in Altersstufen). */
export const JAHRGAENGE: { key: 'precoce' | 'p1' | 'p2'; name: string; de: string; fr: string }[] = [
  { key: 'precoce', name: 'Précoce', de: '3–4 Jahre', fr: '3–4 ans' },
  { key: 'p1', name: 'Préscolaire 1', de: '4–5 Jahre', fr: '4–5 ans' },
  { key: 'p2', name: 'Préscolaire 2', de: '5–6 Jahre', fr: '5–6 ans' },
]

/** Einheitliche Sicherheitssätze. In `freitag.sicherheit` als 'standard:<schlüssel>' verwenden – so steht derselbe
 *  Satz in jeder Einheit gleich. */
export const SICHERHEIT_STANDARD: Record<string, Record<Sprache, string>> = {
  spiesse: {
    de: 'Keine spitzen Spieße oder Zahnstocher: Obst auf dem Teller anrichten; gegessen wird im Sitzen.',
    fr: 'Pas de pics ni de cure-dents pointus : présenter les fruits sur l’assiette ; on mange assis.',
  },
  pusten: {
    de: 'Strohhalm: nur pusten, nie saugen – vorher üben; jedes Kind hat seinen eigenen Halm.',
    fr: 'Paille : on souffle, on n’aspire jamais – s’entraîner avant ; une paille par enfant.',
  },
  fotos: {
    de: 'Fotos und Aufnahmen nur mit schriftlicher Einwilligung der Familien; nur für Portfolio und Klasse, nie ins Internet.',
    fr: 'Photos et enregistrements seulement avec l’accord écrit des familles ; pour le portfolio et la classe, jamais sur Internet.',
  },
  hitze: {
    de: 'Herd, Ofen und heißes Wasser bedienen nur Erwachsene; die Kinder bleiben einen großen Schritt entfernt.',
    fr: 'Plaque, four et eau chaude : seulement les adultes ; les enfants restent à un grand pas.',
  },
  kleinteile: {
    de: 'Kleinteile (Perlen, Samen, Münzen, Magnete) nur unter Aufsicht; danach zählen und wegräumen.',
    fr: 'Petits objets (perles, graines, pièces, aimants) seulement sous surveillance ; ensuite les compter et les ranger.',
  },
  allergien: {
    de: 'Allergien und Essensregeln der Familien vorher klären; niemand muss probieren.',
    fr: 'Allergies et habitudes alimentaires des familles : vérifier avant ; personne n’est obligé de goûter.',
  },
  messer: {
    de: 'Mit dem Messer schneiden nur Erwachsene; die Kinder zupfen, reißen oder brechen.',
    fr: 'Seuls les adultes coupent au couteau ; les enfants effeuillent, déchirent ou cassent.',
  },
  wasser: {
    de: 'Am Wasser hat immer eine erwachsene Person die Kinder im Blick; Wannen danach sofort leeren.',
    fr: 'Près de l’eau, un adulte garde toujours les enfants à l’œil ; vider les bacs tout de suite après.',
  },
  draussen: {
    de: 'Draußen: die Kinder beim Losgehen und beim Zurückkommen zählen; auf der Straße Warnwesten.',
    fr: 'Dehors : compter les enfants au départ et au retour ; gilets de sécurité dans la rue.',
  },
}

/** Sicherheitszeile in der Sprache des Blatts ('standard:pusten' → Standardsatz). */
export function sicherheitText(zeile: string, sprache: Sprache): string {
  const m = /^standard:([a-z]+)$/.exec(zeile.trim())
  return m ? (SICHERHEIT_STANDARD[m[1]]?.[sprache] ?? zeile) : zeile
}

/** Freitags-Karte: Wörter für die Symbolzeile. */
export const FREITAG_TEXT: Record<
  Sprache,
  { vorlauf: Record<Freitagskarte['vorlauf'], string>; material: Record<Freitagskarte['material'], string>; kueche: [string, string]; ausflug: [string, string]; besuch: [string, string] }
> = {
  de: {
    vorlauf: { 0: 'sofort startklar', 1: '1 Woche Vorlauf', 3: '3 Wochen Vorlauf' },
    material: { standard: 'Material vorhanden', besorgen: 'Material besorgen', selten: 'Material selten' },
    kueche: ['Küche nötig', 'ohne Küche'],
    ausflug: ['Ausflug', 'kein Ausflug'],
    besuch: ['Besuch', 'kein Besuch'],
  },
  fr: {
    vorlauf: { 0: 'prêt tout de suite', 1: '1 semaine avant', 3: '3 semaines avant' },
    material: { standard: 'matériel disponible', besorgen: 'matériel à prévoir', selten: 'matériel rare' },
    kueche: ['cuisine nécessaire', 'sans cuisine'],
    ausflug: ['sortie', 'pas de sortie'],
    besuch: ['visite', 'pas de visite'],
  },
}

/** Elternbrief: feste Überschriften je Sprache. Luxemburgisch steht mit in der Prüfliste (scripts/lb-liste.ts). */
export const BRIEF_TEXT: Record<'de' | 'fr' | 'pt' | 'lb', { sprache: string; anrede: string; woche: string; idee: string; bitte: string; woerter: string; satz: string }> = {
  de: { sprache: 'Deutsch', anrede: 'Liebe Familien,', woche: 'Das machen wir', idee: 'Idee für zu Hause', bitte: 'Unsere Bitte', woerter: 'Unsere Wörter der Woche', satz: 'Satz der Woche' },
  fr: { sprache: 'Français', anrede: 'Chères familles,', woche: 'Ce que nous faisons', idee: 'Une idée pour la maison', bitte: 'Notre demande', woerter: 'Nos mots de la semaine', satz: 'La phrase de la semaine' },
  pt: { sprache: 'Português', anrede: 'Queridas famílias,', woche: 'O que fazemos', idee: 'Uma ideia para casa', bitte: 'O nosso pedido', woerter: 'As palavras da semana', satz: 'A frase da semana' },
  lb: { sprache: 'Lëtzebuergesch', anrede: 'Moien,', woche: 'Dat maache mir', idee: 'Eng Iddi fir doheem', bitte: 'Eis Bitt', woerter: 'Wierder vun der Woch', satz: 'Saz vun der Woch' },
}

/** Zusatzseiten, die es einzeln zum Herunterladen gibt (nicht im Lehrerteil). */
export type Zusatz = 'klassenraster' | 'portfolio' | 'elternbrief'
export const ZUSAETZE: { id: Zusatz; de: string; fr: string; knopf: string; datei: string }[] = [
  { id: 'klassenraster', de: 'Klassenraster', fr: 'Grille de classe', knopf: 'Klassenraster', datei: 'Klassenraster' },
  { id: 'portfolio', de: 'Portfolio-Blatt', fr: 'Fiche portfolio', knopf: 'Portfolio', datei: 'Portfolio' },
  { id: 'elternbrief', de: 'Elternbrief', fr: 'Lettre aux familles', knopf: 'Elternbrief', datei: 'Elternbrief' },
]

/** Hat die Sprachfassung (oder die Woche) etwas für die Seite „Beobachten & Begleiten“? */
export function hatBegleiten(blatt: Blatt, sp: Spielideen | undefined): boolean {
  if (blatt.bereich !== 'spielschule' || !sp) return false
  const w = blatt.woche
  return !!(sp.beobachtung?.length || sp.entscheiden || sp.stufen || sp.zugang?.length || sp.mehrsprachig || sp.freitag || w?.domaenen?.length || w?.sprachen?.woerter?.length)
}

/** Welche Zusatzseiten hat dieses Blatt in dieser Sprache? Klassenraster und Portfolio brauchen das
 *  Beobachtungsfenster (3 Punkte), der Elternbrief `woche.elternbrief`. */
export function zusaetzeVon(blatt: Blatt, sprache: Sprache): Zusatz[] {
  if (blatt.bereich !== 'spielschule') return []
  const sp = ((sprache === 'fr' && blatt.fr) || blatt.de).lehrer.spielschule
  const out: Zusatz[] = []
  if (sp?.beobachtung?.length) out.push('klassenraster', 'portfolio')
  if (blatt.woche?.elternbrief) out.push('elternbrief')
  return out
}

function kartenIn(liste: Baustein[]): { titel?: string; bild?: BildId }[] {
  return liste.flatMap((b) => (b.art === 'karten' ? b.karten : b.art === 'spalten' ? [...kartenIn(b.links), ...kartenIn(b.rechts)] : []))
}

/** Bild zu einem Wort des Wörterstreifens: eigenes `bild` oder das der Bildkarte mit demselben Titel. */
export function wortBild(blatt: Blatt, w: WochenWort): BildId | undefined {
  if (w.bild) return w.bild
  const norm = (s: string | undefined) => (s ?? '').trim().toLowerCase().replace(/’/g, "'")
  const karten = [...kartenIn(blatt.de.bausteine).map((k) => [k, w.de] as const), ...kartenIn(blatt.fr?.bausteine ?? []).map((k) => [k, w.fr] as const)]
  return karten.find(([k, wort]) => k.bild && norm(k.titel) === norm(wort))?.[0].bild
}

// ===== Bausteine zum Tun (Seite 2) =====

export const MM = 72 / 25.4

// --- Zufall: fest aus einer Zahl oder einem Text (gleiches Blatt = gleiches Bild) -------------------

/** FNV-1a über einen Text → 32-Bit-Zahl. */
export function hashText(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

/** Mulberry32: kleiner, fester Zufallsgenerator (0 ≤ x < 1). */
export function zufall(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Reihenfolge 0…n-1 gemischt, kein Element an seinem Platz (ab n = 2). */
export function mischen(n: number, seed: number): number[] {
  const r = zufall(seed)
  const idx = Array.from({ length: n }, (_, i) => i)
  if (n < 2) return idx
  for (let versuch = 0; versuch < 200; versuch++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    if (idx.every((x, i) => x !== i)) return idx
  }
  // Notfall: um eins verschieben
  return Array.from({ length: n }, (_, i) => (i + 1) % n)
}

// --- Farben: Farbpunkte im Text ------------------------------------------------------------------

export const FARBEN: Record<Farbwort, string> = {
  rot: '#D9523F',
  orange: '#EE9A3E',
  gelb: '#EFCB4A',
  gruen: '#5DAE6B',
  blau: '#4F86C6',
  hellblau: '#8FCBEF',
  lila: '#8E6CC0',
  rosa: '#F2A6C2',
  braun: '#8B6443',
  grau: '#9AA2B1',
  schwarz: '#1B2233',
  weiss: '#FFFFFF',
}

export const FARBWOERTER = Object.keys(FARBEN) as Farbwort[]

/** Wortanfänge (klein, ohne Umlaute) → Farbe. Deutsch und Französisch, auch gebeugt („roten“, « vertes »). */
const STAEMME: [string, Farbwort][] = (
  [
    ['hellblau', 'hellblau'], ['bleu clair', 'hellblau'], ['bleu ciel', 'hellblau'],
    ['rot', 'rot'], ['rouge', 'rot'],
    ['orange', 'orange'],
    ['gelb', 'gelb'], ['jaune', 'gelb'],
    ['gruen', 'gruen'], ['vert', 'gruen'],
    ['blau', 'blau'], ['bleu', 'blau'],
    ['lila', 'lila'], ['violett', 'lila'], ['violet', 'lila'], ['mauve', 'lila'],
    ['rosa', 'rosa'], ['rose', 'rosa'],
    ['braun', 'braun'], ['marron', 'braun'], ['brun', 'braun'],
    ['grau', 'grau'], ['gris', 'grau'],
    ['schwarz', 'schwarz'], ['noir', 'schwarz'],
    ['weiss', 'weiss'], ['blanc', 'weiss'],
  ] as [string, Farbwort][]
).sort((a, b) => b[0].length - a[0].length)

function normal(w: string): string {
  return w.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').trim()
}

/** Farbe zu einem Farbwort („rot“, „roten“, « vertes ») – sonst null. */
export function farbeVonWort(wort: string): Farbwort | null {
  const w = normal(wort)
  for (const [stamm, farbe] of STAEMME) if (w.startsWith(stamm)) return farbe
  return null
}

export type FarbTeil = { text: string } | { farbe: Farbwort; wort: string }

/** Text mit `{rot}` in Teile zerlegen; null, wenn keine gültige Farbe vorkommt. Ungültiges `{…}` bleibt Text. */
export function farbTeile(text: string): FarbTeil[] | null {
  const re = /\{([^{}]{1,24})\}/g
  const teile: FarbTeil[] = []
  let pos = 0
  let gefunden = false
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const farbe = farbeVonWort(m[1])
    if (!farbe) continue
    gefunden = true
    if (m.index > pos) teile.push({ text: text.slice(pos, m.index) })
    teile.push({ farbe, wort: m[1] })
    pos = m.index + m[0].length
  }
  if (!gefunden) return null
  if (pos < text.length) teile.push({ text: text.slice(pos) })
  return teile
}

/** `{…}` im Text, das kein Farbwort ist (für das Prüfskript). */
export function fremdeFarbtokens(text: string): string[] {
  return [...text.matchAll(/\{([^{}]*)\}/g)].map((m) => m[1]).filter((w) => !farbeVonWort(w))
}

// --- Labyrinth ---------------------------------------------------------------------------------

/** Spalten × Zeilen je Stufe. */
export const LABYRINTH_RASTER: Record<1 | 2 | 3, [number, number]> = { 1: [5, 3], 2: [6, 4], 3: [8, 5] }

export interface Labyrinth {
  spalten: number
  zeilen: number
  /** Wand rechts von Zelle [z][s] (bei der letzten Spalte: Außenwand) */
  rechts: boolean[][]
  /** Wand unter Zelle [z][s] (bei der letzten Zeile: Außenwand) */
  unten: boolean[][]
  /** Zeile des Eingangs (linke Außenwand) und des Ausgangs (rechte Außenwand) */
  eingang: number
  ausgang: number
}

/** Labyrinth ohne Schleifen (Tiefensuche): zwischen zwei Zellen gibt es genau einen Weg. Ein- und Ausgang werden so
 *  gewählt, dass der Weg möglichst lang ist. */
export function labyrinth(stufe: 1 | 2 | 3, seed: number): Labyrinth {
  const [S, Z] = LABYRINTH_RASTER[stufe] ?? LABYRINTH_RASTER[1]
  const r = zufall(seed)
  const rechts = Array.from({ length: Z }, () => Array(S).fill(true) as boolean[])
  const unten = Array.from({ length: Z }, () => Array(S).fill(true) as boolean[])
  const besucht = Array.from({ length: Z }, () => Array(S).fill(false) as boolean[])
  const stapel: [number, number][] = [[Math.floor(r() * Z), Math.floor(r() * S)]]
  besucht[stapel[0][0]][stapel[0][1]] = true
  while (stapel.length) {
    const [z, s] = stapel[stapel.length - 1]
    const nachbarn = ([[z - 1, s], [z + 1, s], [z, s - 1], [z, s + 1]] as [number, number][]).filter(([a, b]) => a >= 0 && a < Z && b >= 0 && b < S && !besucht[a][b])
    if (!nachbarn.length) {
      stapel.pop()
      continue
    }
    const [a, b] = nachbarn[Math.floor(r() * nachbarn.length)]
    if (a === z) rechts[z][Math.min(s, b)] = false
    else unten[Math.min(z, a)][s] = false
    besucht[a][b] = true
    stapel.push([a, b])
  }
  let best = { e: 0, a: 0, l: -1 }
  for (let e = 0; e < Z; e++) {
    const d = abstaende({ spalten: S, zeilen: Z, rechts, unten, eingang: e, ausgang: 0 }, e)
    for (let a = 0; a < Z; a++) if (d[a][S - 1] > best.l) best = { e, a, l: d[a][S - 1] }
  }
  return { spalten: S, zeilen: Z, rechts, unten, eingang: best.e, ausgang: best.a }
}

function abstaende(l: Labyrinth, startZeile: number): number[][] {
  const d = Array.from({ length: l.zeilen }, () => Array(l.spalten).fill(-1) as number[])
  const q: [number, number][] = [[startZeile, 0]]
  d[startZeile][0] = 0
  while (q.length) {
    const [z, s] = q.shift()!
    const schritte: [number, number, boolean][] = [
      [z, s + 1, s + 1 < l.spalten && !l.rechts[z][s]],
      [z, s - 1, s > 0 && !l.rechts[z][s - 1]],
      [z + 1, s, z + 1 < l.zeilen && !l.unten[z][s]],
      [z - 1, s, z > 0 && !l.unten[z - 1][s]],
    ]
    for (const [a, b, offen] of schritte) {
      if (!offen || d[a][b] >= 0) continue
      d[a][b] = d[z][s] + 1
      q.push([a, b])
    }
  }
  return d
}

/** Weg vom Eingang zum Ausgang als Zellenliste – null, wenn es keinen gibt (für das Prüfskript). */
export function labyrinthWeg(l: Labyrinth): [number, number][] | null {
  const d = abstaende(l, l.eingang)
  let z = l.ausgang
  let s = l.spalten - 1
  if (d[z][s] < 0) return null
  const weg: [number, number][] = [[z, s]]
  while (d[z][s] > 0) {
    const n = d[z][s] - 1
    if (s > 0 && !l.rechts[z][s - 1] && d[z][s - 1] === n) s--
    else if (s + 1 < l.spalten && !l.rechts[z][s] && d[z][s + 1] === n) s++
    else if (z > 0 && !l.unten[z - 1][s] && d[z - 1][s] === n) z--
    else if (z + 1 < l.zeilen && !l.unten[z][s] && d[z + 1][s] === n) z++
    else return null
    weg.unshift([z, s])
  }
  return weg
}

/** Aufteilung: Zellgröße (Gangbreite) und Platz für Start- und Zielbild links und rechts. */
export function labyrinthMasse(stufe: 1 | 2 | 3, breite: number): { zelle: number; rand: number; B: number; H: number } {
  const [S, Z] = LABYRINTH_RASTER[stufe] ?? LABYRINTH_RASTER[1]
  const rand = Math.min(84, breite * 0.17)
  const zelle = Math.min((breite - 2 * rand) / S, 300 / Z, 80)
  return { zelle, rand, B: breite, H: zelle * Z + 16 }
}

// --- Mini-Buch -------------------------------------------------------------------------------------

/** Ein Blatt, 8 Felder (2 Spalten × 4 Zeilen, hochkant). Standard-Faltbuch, um 90° gedreht: links (von oben)
 *  Seite 6, 7, Rückseite, Titel – Inhalt im Uhrzeigersinn gedreht; rechts (von oben) 5, 4, 3, 2 – gegen den
 *  Uhrzeigersinn. Schnitt: senkrechte Mittellinie über die beiden mittleren Zeilen. */
export const MINIBUCH_LAGE: { seite: number; spalte: 0 | 1; zeile: number; drehung: 90 | -90 }[] = [
  { seite: 6, spalte: 0, zeile: 0, drehung: 90 },
  { seite: 7, spalte: 0, zeile: 1, drehung: 90 },
  { seite: 8, spalte: 0, zeile: 2, drehung: 90 },
  { seite: 1, spalte: 0, zeile: 3, drehung: 90 },
  { seite: 5, spalte: 1, zeile: 0, drehung: -90 },
  { seite: 4, spalte: 1, zeile: 1, drehung: -90 },
  { seite: 3, spalte: 1, zeile: 2, drehung: -90 },
  { seite: 2, spalte: 1, zeile: 3, drehung: -90 },
]

export function minibuchMasse(breite: number): { fb: number; fh: number; H: number } {
  const fb = breite / 2
  const fh = Math.min(152, fb * 0.62)
  return { fb, fh, H: fh * 4 + 30 }
}

// --- Punkte verbinden --------------------------------------------------------------------------------

type P = [number, number]

function kreisPunkte(n: number, cx: number, cy: number, rx: number, ry: number, start = -90): P[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((start + (360 * i) / n) * Math.PI) / 180
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as P
  })
}

function herzPunkt(t: number, k = 2.6, cx = 50, cy = 50): P {
  const x = 16 * Math.sin(t) ** 3
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
  return [cx + k * x, cy - k * y + 6]
}

/** Feste Formen: Punkte im 100er-Feld (y nach unten), Reihenfolge = Zahlen 1, 2, 3 …; `deko` = Linien, die schon
 *  da sind (Auge, Tür, Schnur …), als einfache SVG-Pfade im selben Feld. */
export const PUNKTE_FORMEN: Record<PunkteForm, { punkte: P[]; deko?: string[]; offen?: boolean }> = {
  stern: {
    punkte: Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 ? 20 : 47
      const a = ((-90 + 36 * i) * Math.PI) / 180
      return [50 + r * Math.cos(a), 54 + r * Math.sin(a)] as P
    }),
  },
  haus: {
    punkte: [[50, 10], [88, 44], [88, 92], [12, 92], [12, 44]],
    deko: ['M42 92 L42 66 L58 66 L58 92', 'M22 54 L36 54 L36 66 L22 66 Z', 'M64 54 L78 54 L78 66 L64 66 Z'],
  },
  herz: { punkte: Array.from({ length: 10 }, (_, i) => herzPunkt((2 * Math.PI * i) / 10)) },
  fisch: {
    punkte: [[6, 50], [30, 24], [58, 24], [76, 44], [95, 22], [95, 78], [76, 56], [58, 76], [30, 76]],
    deko: ['M22 44 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0', 'M36 36 Q42 50 36 64'],
  },
  boot: {
    punkte: [[50, 6], [82, 58], [96, 58], [80, 86], [20, 86], [4, 58], [50, 58]],
    deko: ['M50 58 L82 58', 'M50 6 L40 11 L50 15', 'M10 95 Q20 90 30 95 Q40 100 50 95 Q60 90 70 95 Q80 100 90 95'],
  },
  ballon: {
    punkte: kreisPunkte(8, 50, 40, 32, 36, -67.5),
    deko: ['M50 76 L46 82 L54 82 Z', 'M50 82 Q44 88 50 93 Q56 98 50 100'],
  },
  apfel: {
    punkte: [[12, 34], [30, 18], [50, 28], [70, 18], [88, 34], [88, 62], [70, 90], [50, 84], [30, 90], [12, 62]],
    deko: ['M50 28 Q51 18 55 11'],
  },
  tanne: {
    punkte: [[50, 6], [78, 44], [64, 44], [90, 80], [10, 80], [36, 44], [22, 44]],
    deko: ['M44 80 L44 96 L56 96 L56 80'],
  },
  drachen: {
    punkte: [[50, 4], [82, 38], [50, 84], [18, 38]],
    deko: ['M50 4 L50 84', 'M18 38 L82 38', 'M50 84 Q40 90 46 96 Q54 100 60 96', 'M44 90 L40 86 L42 94 Z', 'M58 97 L62 92 L64 100 Z'],
  },
  schmetterling: {
    punkte: [[50, 30], [74, 8], [94, 32], [72, 50], [86, 84], [50, 64], [14, 84], [28, 50], [6, 32], [26, 8]],
    deko: ['M50 28 L50 72', 'M50 30 Q44 16 38 12', 'M50 30 Q56 16 62 12'],
  },
}

export function punkteVon(b: Extract<Baustein, { art: 'punkte_verbinden' }>): P[] {
  return b.punkte?.length ? b.punkte : PUNKTE_FORMEN[b.form ?? 'stern']?.punkte ?? []
}

export function punkteMasse(breite: number, gruppen: boolean): { S: number; rand: number; H: number } {
  const rand = gruppen ? 54 : 34
  const S = Math.min(breite - 2 * rand, 330)
  return { S, rand, H: S + 2 * rand }
}

/** Wohin die Zahl neben einen Punkt kommt: weg vom Schwerpunkt (Einheitsvektor). */
export function aussen(pkt: P[], i: number): P {
  const cx = pkt.reduce((a, p) => a + p[0], 0) / pkt.length
  const cy = pkt.reduce((a, p) => a + p[1], 0) / pkt.length
  // Richtung aus Schwerpunkt und Winkelhalbierender der Nachbarkanten – liegt die Zahl so nie auf einer Linie
  const [x, y] = pkt[i]
  const v = pkt[(i - 1 + pkt.length) % pkt.length]
  const n = pkt[(i + 1) % pkt.length]
  const e1 = norm([x - v[0], y - v[1]])
  const e2 = norm([x - n[0], y - n[1]])
  let d: P = [e1[0] + e2[0], e1[1] + e2[1]]
  if (Math.hypot(d[0], d[1]) < 0.2) d = [-(n[1] - v[1]), n[0] - v[0]]
  d = norm(d)
  const zentral = norm([x - cx, y - cy])
  // zeigt die Halbierende nach innen (spitze Ecke nach innen), nach außen drehen
  if (d[0] * zentral[0] + d[1] * zentral[1] < -0.2) d = [-d[0], -d[1]]
  return d
}

function norm([x, y]: P): P {
  const l = Math.hypot(x, y) || 1
  return [x / l, y / l]
}

/** Wo Zahl und Mengenpunkte neben jedem Punkt stehen (im 100er-Feld): zuerst nach außen; liegt dort ein anderer
 *  Punkt, eine schon gesetzte Zahl oder eine vorgezeichnete Linie, schrittweise drehen. `k` = pt je Einheit. */
export function punkteBeschriftung(pkt: P[], deko: string[], k: number, gruppen: boolean): { zahl: P; gruppe: P }[] {
  const abstand = 22 / k
  const gAbstand = 50 / k
  const hindernisse: P[] = [...pkt]
  for (const d of deko) {
    const z = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number)
    for (let i = 0; i + 1 < z.length; i += 2) if (z[i] >= 0 && z[i] <= 100 && z[i + 1] >= 0 && z[i + 1] <= 100) hindernisse.push([z[i], z[i + 1]])
  }
  const gesetzt: P[] = []
  return pkt.map((p, i) => {
    const d = aussen(pkt, i)
    let best: { zahl: P; gruppe: P; wert: number } | null = null
    for (const w of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) {
      const a = (w * Math.PI) / 180
      const r: P = [d[0] * Math.cos(a) - d[1] * Math.sin(a), d[0] * Math.sin(a) + d[1] * Math.cos(a)]
      const zahl: P = [p[0] + r[0] * abstand, p[1] + r[1] * abstand]
      const gruppe: P = [p[0] + r[0] * gAbstand, p[1] + r[1] * gAbstand]
      const naechster = (q: P, ohne: number) =>
        Math.min(...hindernisse.filter((_, j) => j !== ohne).map((h) => Math.hypot(h[0] - q[0], h[1] - q[1])), ...gesetzt.map((h) => Math.hypot(h[0] - q[0], h[1] - q[1]) * 0.75))
      // freier Platz in pt (Zahl wichtiger als Mengenpunkte), kleine Strafe für Drehung
      const frei = Math.min(naechster(zahl, i) * k, gruppen ? naechster(gruppe, i) * k * 1.2 : Infinity)
      const wert = Math.min(frei, 30) - Math.abs(w) / 40
      if (!best || wert > best.wert) best = { zahl, gruppe, wert }
      if (frei >= 30 && w === 0) break
    }
    gesetzt.push(best!.zahl)
    if (gruppen) gesetzt.push(best!.gruppe)
    return { zahl: best!.zahl, gruppe: best!.gruppe }
  })
}

/** Punkte einer Menge (Würfelbild bis 6, darüber zwei Reihen), im Feld ±1. */
export function mengenPunkte(n: number): P[] {
  const W: Record<number, P[]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  }
  if (W[n]) return W[n]
  const oben = Math.ceil(n / 2)
  return Array.from({ length: n }, (_, i) => {
    const reihe = i < oben ? 0 : 1
    const k = reihe ? i - oben : i
    const anz = reihe ? n - oben : oben
    return [(k - (anz - 1) / 2) * 1.0, reihe ? 0.55 : -0.55] as P
  })
}

// --- Fädelkarte --------------------------------------------------------------------------------------

/** Umriss als geschlossener Linienzug im 100er-Feld. */
export function faedelUmriss(form: 'kreis' | 'oval' | 'herz' | 'stern' | 'quadrat'): P[] {
  const n = 240
  switch (form) {
    case 'oval':
      return kreisPunkte(n, 50, 50, 48, 36)
    case 'herz':
      return Array.from({ length: n }, (_, i) => herzPunkt((2 * Math.PI * i) / n, 2.75, 50, 40))
    case 'stern': {
      const ecken = Array.from({ length: 10 }, (_, i) => {
        const r = i % 2 ? 24 : 49
        const a = ((-90 + 36 * i) * Math.PI) / 180
        return [50 + r * Math.cos(a), 54 + r * Math.sin(a)] as P
      })
      return ecken.flatMap((p, i) => {
        const q = ecken[(i + 1) % 10]
        return Array.from({ length: 24 }, (_, k) => [p[0] + ((q[0] - p[0]) * k) / 24, p[1] + ((q[1] - p[1]) * k) / 24] as P)
      })
    }
    case 'quadrat': {
      const r = 14
      const pts: P[] = []
      const ecke = (cx: number, cy: number, a0: number) => {
        for (let k = 0; k <= 15; k++) {
          const a = ((a0 + (90 * k) / 15) * Math.PI) / 180
          pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
        }
      }
      ecke(96 - r, 4 + r, -90)
      ecke(96 - r, 96 - r, 0)
      ecke(4 + r, 96 - r, 90)
      ecke(4 + r, 4 + r, 180)
      return pts
    }
    default:
      return kreisPunkte(n, 50, 50, 48, 48)
  }
}

/** Lochmarken: gleichmäßig auf dem nach innen versetzten Umriss (Abstand `einzug` im 100er-Feld). */
export function faedelLoecher(form: 'kreis' | 'oval' | 'herz' | 'stern' | 'quadrat', anzahl: number, einzug: number): P[] {
  const u = faedelUmriss(form)
  const n = u.length
  const cx = u.reduce((a, p) => a + p[0], 0) / n
  const cy = u.reduce((a, p) => a + p[1], 0) / n
  // Stern: Löcher auf den Kanten (nicht in den spitzen Ecken), je Kante gleich viele, um `einzug` nach innen
  if (form === 'stern') {
    const ecken = Array.from({ length: 10 }, (_, i) => u[i * 24])
    const jeKante = Math.max(1, Math.round(anzahl / 10))
    return ecken.flatMap((p, i) => {
      const q = ecken[(i + 1) % 10]
      let nrm = norm([-(q[1] - p[1]), q[0] - p[0]])
      const m: P = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
      if ((cx - m[0]) * nrm[0] + (cy - m[1]) * nrm[1] < 0) nrm = [-nrm[0], -nrm[1]]
      return Array.from({ length: jeKante }, (_, k) => {
        const f = jeKante === 1 ? 0.5 : 0.28 + (0.44 * k) / (jeKante - 1)
        return [p[0] + (q[0] - p[0]) * f + nrm[0] * einzug, p[1] + (q[1] - p[1]) * f + nrm[1] * einzug] as P
      })
    })
  }
  // Umlaufsinn (Flächenvorzeichen) bestimmt, welche Normale nach innen zeigt – auch an der Herzkerbe,
  // wo der Blick zum Schwerpunkt in die falsche Richtung führt.
  let flaeche = 0
  for (let i = 0; i < n; i++) flaeche += u[i][0] * u[(i + 1) % n][1] - u[(i + 1) % n][0] * u[i][1]
  const innenNormale = (i: number): P => {
    const glatt = Math.max(2, Math.round(n / 40))
    const v = u[(i - glatt + n) % n]
    const w = u[(i + glatt) % n]
    const tx = w[0] - v[0]
    const ty = w[1] - v[1]
    return norm(flaeche > 0 ? [-ty, tx] : [ty, -tx])
  }
  const laengen = [0]
  for (let i = 1; i <= n; i++) laengen.push(laengen[i - 1] + Math.hypot(u[i % n][0] - u[i - 1][0], u[i % n][1] - u[i - 1][1]))
  const gesamt = laengen[n]
  // gleichmäßig auf dem Umriss verteilen (halber Abstand Versatz: nie genau in Kerbe oder Spitze), dann nach innen
  return Array.from({ length: anzahl }, (_, k) => {
    const ziel = (gesamt * (k + 0.5)) / anzahl
    let i = 1
    while (i < n && laengen[i] < ziel) i++
    const a = u[(i - 1) % n]
    const b = u[i % n]
    const f = (ziel - laengen[i - 1]) / Math.max(1e-6, laengen[i] - laengen[i - 1])
    const nrm = innenNormale(i % n)
    return [a[0] + (b[0] - a[0]) * f + nrm[0] * einzug, a[1] + (b[1] - a[1]) * f + nrm[1] * einzug] as P
  })
}

export function faedelMasse(breite: number): { S: number; H: number } {
  const S = Math.min(breite, 430)
  return { S, H: S + 10 }
}

// --- Suchbild ----------------------------------------------------------------------------------------

export interface Streubild {
  bild: string
  x: number
  y: number
  g: number
  drehung: number
  gesucht: boolean
}

/** Bilder in der Szene verteilen (fester Zufall, ohne Überlappung). Maße in pt. */
export function suchbildLage(b: Extract<Baustein, { art: 'suchbild' }>, B: number, H: number): Streubild[] {
  const r = zufall(b.seed ?? hashText(JSON.stringify(b.suchen) + JSON.stringify(b.ablenker ?? [])))
  const liste: { bild: string; gesucht: boolean }[] = [
    ...b.suchen.flatMap((s) => Array.from({ length: s.anzahl }, () => ({ bild: s.bild, gesucht: true }))),
    ...(b.ablenker ?? []).flatMap((s) => Array.from({ length: s.anzahl ?? 2 }, () => ({ bild: s.bild, gesucht: false }))),
  ]
  // gemischt, damit gleiche Bilder nicht nebeneinander liegen
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[liste[i], liste[j]] = [liste[j], liste[i]]
  }
  const flaeche = B * H
  let basis = Math.min(58, Math.sqrt(flaeche / Math.max(1, liste.length) / 2.4))
  for (let runde = 0; runde < 8; runde++) {
    const out: Streubild[] = []
    let ok = true
    for (const x of liste) {
      const g = basis * (0.86 + r() * 0.28)
      let gesetzt = false
      for (let v = 0; v < 600 && !gesetzt; v++) {
        const px = 12 + g / 2 + r() * (B - 24 - g)
        const py = 12 + g / 2 + r() * (H - 24 - g)
        if (out.every((o) => Math.hypot(o.x - px, o.y - py) > (o.g + g) / 2 + 9)) {
          out.push({ bild: x.bild, x: px, y: py, g, drehung: Math.round((r() - 0.5) * 30), gesucht: x.gesucht })
          gesetzt = true
        }
      }
      if (!gesetzt) {
        ok = false
        break
      }
    }
    if (ok) return out
    basis *= 0.9
  }
  return []
}

export function suchbildMasse(b: Extract<Baustein, { art: 'suchbild' }>, breite: number): { szeneH: number; legendeH: number; H: number } {
  const n = b.suchen.reduce((a, s) => a + s.anzahl, 0) + (b.ablenker ?? []).reduce((a, s) => a + (s.anzahl ?? 2), 0)
  const szeneH = Math.min(420, Math.max(330, n * 19))
  const zeilen = Math.ceil(b.suchen.length / (breite > 400 ? 2 : 1))
  const legendeH = 14 + zeilen * 46
  return { szeneH, legendeH, H: szeneH + legendeH }
}

// --- Laufweg -----------------------------------------------------------------------------------------

/** Schlangenweg: Feld i (0 = Start, n+1 = Ziel) → Spalte und Zeile (jede zweite Zeile von rechts nach links). */
export function laufwegRaster(felder: number, breite: number): { spalten: number; zeilen: number; feld: number; luecke: number; lage: { s: number; z: number }[] } {
  const N = felder + 2
  const spalten = N <= 12 ? 4 : N <= 15 ? 5 : 6
  const zeilen = Math.ceil(N / spalten)
  const luecke = 18
  const feld = Math.min((breite - luecke * (spalten - 1)) / spalten, 390 / zeilen - luecke, 112)
  const lage = Array.from({ length: N }, (_, i) => {
    const z = Math.floor(i / spalten)
    const k = i % spalten
    return { s: z % 2 ? spalten - 1 - k : k, z }
  })
  return { spalten, zeilen, feld, luecke, lage }
}

export function laufwegMasse(felder: number, breite: number): { wegH: number; H: number } {
  const r = laufwegRaster(felder, breite)
  const wegH = r.zeilen * r.feld + (r.zeilen - 1) * r.luecke + 8
  return { wegH, H: wegH + 130 }
}

// --- Höhen für die Seitenprüfung -----------------------------------------------------------------------

/** Ungefähre Höhe eines Spielschul-Bausteins in pt (ohne Aufgabe davor) – null für andere Bausteine. */
export function spielHoehe(b: Baustein, breite: number): number | null {
  switch (b.art) {
    case 'schneiden_kleben':
      return schneidenMasse(b.bilder.length, breite, b.bilder.some((x) => x.text)).H
    case 'memory':
      return memoryMasse(b.bilder.length, breite, !!b.rueckseite, b.bilder.some((x) => x.text)).H
    case 'labyrinth':
      return labyrinthMasse(b.stufe ?? 1, breite).H
    case 'laufweg':
      return laufwegMasse(b.felder.length, breite).H
    case 'minibuch':
      return minibuchMasse(breite).H
    case 'punkte_verbinden':
      return punkteMasse(breite, !!b.gruppen).H
    case 'klappbild':
      return klappMasse(b.bilder.length, breite).H
    case 'faedelkarte':
      return faedelMasse(breite).H
    case 'bastelbogen':
      return bastelMasse(b.vorlage, breite, !!b.ohren).H
    case 'suchbild':
      return suchbildMasse(b, breite).H
    case 'anziehpuppe':
      return 470
    default:
      return null
  }
}

/** Schneiden & Kleben: Klebefelder oben, Schneidestreifen unten (gleich große Karten, Felder etwas größer). */
export function schneidenMasse(n: number, breite: number, mitText: boolean): { spalten: number; zeilen: number; feld: number; karte: number; luecke: number; H: number } {
  const spalten = n <= 4 ? n : 3
  const zeilen = Math.ceil(n / spalten)
  const luecke = 22
  const text = mitText ? 18 : 0
  const proZeile = (breite - luecke * (spalten - 1)) / spalten
  // Höhe: Klebefelder (zeilen × (feld + 24)) + Streifen (zeilen × (karte + text)) + 40 ≤ 610
  const maxFeld = (610 - 40 - zeilen * (24 + text + 10)) / (2 * zeilen) + 4
  const feld = Math.min(proZeile, maxFeld, 172)
  const karte = feld - 10
  const H = zeilen * (feld + 24) + 40 + zeilen * (karte + text)
  return { spalten, zeilen, feld, karte, luecke, H }
}

export function memoryMasse(paare: number, breite: number, rueckseite: boolean, mitText: boolean): { spalten: number; zeilen: number; kb: number; kh: number; H: number } {
  const n = paare * 2
  const spalten = 4
  const zeilen = Math.ceil(n / spalten)
  const kb = breite / spalten
  const verfuegbar = rueckseite ? (600 - 30) / 2 : 610
  const kh = Math.min(kb * (mitText ? 1.12 : 1), verfuegbar / zeilen)
  // + Schneidekopf und Legende
  return { spalten, zeilen, kb, kh, H: (rueckseite ? 2 * zeilen * kh + 30 : zeilen * kh) + 44 }
}

export function klappMasse(n: number, breite: number): { spalten: number; zeilen: number; s: number; lasche: number; luecke: number; H: number } {
  const spalten = n <= 4 ? n : 3
  const zeilen = Math.ceil(n / spalten)
  const lasche = 24
  const luecke = 20
  const s = Math.min((breite - luecke * (spalten - 1)) / spalten, (640 - 60 - 2 * zeilen * (lasche + 12)) / (2 * zeilen), 160)
  return { spalten, zeilen, s, lasche, luecke, H: 2 * zeilen * (s + lasche + 12) + 46 }
}

export function bastelMasse(vorlage: 'maske' | 'krone' | 'stirnband' | 'fahne', breite: number, ohren: boolean): { H: number } {
  switch (vorlage) {
    case 'maske':
      return { H: breite * 0.45 + (ohren ? breite * 0.22 : 0) + 30 }
    case 'krone':
      return { H: 160 + 3 * 58 + 20 }
    case 'stirnband':
      return { H: 74 + (ohren ? 104 : 70) + 3 * 58 + 20 }
    default:
      return { H: Math.min(breite - 60, 400) * (2 / 3) + 40 }
  }
}
