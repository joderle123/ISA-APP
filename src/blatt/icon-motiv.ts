// ---------------------------------------------------------------------------
// Piktogramm → farbiges Motiv und Duotone-Piktogramme (Design-Umbau 16.10.2026).
//
// Junge Stufen (C1–C3) sehen auf Karten, in Auswahlrastern und im Kopf statt eines
// grauen Linien-Piktogramms das farbige Motiv mit derselben Bedeutung; ältere Stufen
// (C3–ES) bekommen das Piktogramm als „Duotone“: Linie in Tinte, geschlossene Formen
// zart in der Bereichsfarbe gefüllt. Beides geschieht beim Zeichnen (src/blatt/pdf) –
// in den Blättern steht weiter `icon:<name>`.
//
// Zuordnung:
//   ICON_MOTIV_BESTAND – Motive, die es schon gab (hier gepflegt)
//   ICON_MOTIV         – neue Motive des Design-Umbaus (src/blatt/motive-neu.ts)
// Gleiche Bedeutung ist Pflicht: ein Motiv ersetzt ein Piktogramm nur, wenn Kinder
// dasselbe darin sehen („ear“ → Körper-Motiv „ohr“ wäre kein Ersatz für „zuhören“).
// ---------------------------------------------------------------------------

import { MOTIV_NAMEN } from './motive'
import { ICON_MOTIV } from './motive-neu'
import type { BildId } from './typen'
import type { Form, Zeichnung } from './zeichnung'

/** Piktogramm-Name (ohne „icon:“) → vorhandenes farbiges Motiv (ohne „motiv:“). */
export const ICON_MOTIV_BESTAND: Record<string, string> = {
  // Orte, Haus, Schule
  home: 'haus',
  'building-cottage': 'haus',
  school: 'schule',
  'building-castle': 'burg',
  // Dinge im Alltag
  book: 'buch',
  'book-2': 'buch',
  books: 'buecherregal',
  bed: 'bett',
  backpack: 'rucksack',
  armchair: 'sofa',
  cup: 'becher',
  mug: 'tasse',
  coffee: 'tasse',
  'glass-full': 'wasserglas',
  bottle: 'flasche',
  key: 'schluessel',
  hourglass: 'sanduhr',
  microphone: 'mikrofon',
  magnet: 'magnet',
  search: 'lupe',
  compass: 'kompass',
  crown: 'krone',
  balloon: 'ballon',
  brush: 'pinsel',
  candle: 'led-kerze',
  bucket: 'eimer',
  shovel: 'schaufel',
  'baby-carriage': 'baby',
  'traffic-lights': 'ampel',
  'hand-stop': 'stopp',
  'battery-4': 'batterie-voll',
  'battery-1': 'batterie-leer',
  battery: 'batterie',
  // Natur und Wetter
  sun: 'sonne',
  'sun-high': 'sonne',
  cloud: 'wolke',
  'cloud-rain': 'regen',
  umbrella: 'regenschirm',
  rainbow: 'regenbogen',
  tree: 'baum',
  flower: 'blume',
  acorn: 'eichel',
  volcano: 'vulkan',
  snowman: 'schneemann',
  // Essen
  apple: 'apfel',
  carrot: 'karotte',
  lemon: 'zitrone',
  bread: 'brot',
  milk: 'milch',
  egg: 'ei',
  cookie: 'plaetzchen',
  'cookie-man': 'boxemaennchen',
  salad: 'salat',
  // Fahrzeuge
  bike: 'fahrrad',
  bus: 'bus',
  car: 'auto',
  train: 'zug',
  plane: 'flugzeug',
  ship: 'schiff',
  sailboat: 'schiff',
  tractor: 'traktor',
  scooter: 'roller',
  rocket: 'rakete',
  // Tiere
  cat: 'katze',
  dog: 'hund',
  horse: 'pferd',
  pig: 'schwein',
  deer: 'reh',
  fish: 'fisch',
  bug: 'kaefer',
  spider: 'spinne',
  butterfly: 'schmetterling',
  dragon: 'drache',
  // Menschen
  friends: 'freunde',
  users: 'freunde',
  'users-group': 'gruppe',
}

/** Alle Zuordnungen: Bestand, darüber die neuen Motive (sie haben Vorrang). */
export const ICON_MOTIV_ALLE: Record<string, string> = { ...ICON_MOTIV_BESTAND, ...ICON_MOTIV }

const motivSet = new Set(MOTIV_NAMEN)

/** Motiv für ein Piktogramm („book“ oder „icon:book“) oder undefined, wenn es keins gibt (oder das Motiv fehlt). */
export function motivFuerIconName(name: string): string | undefined {
  const m = ICON_MOTIV_ALLE[name.replace(/^icon:/, '')]
  return m && motivSet.has(m) ? m : undefined
}

/** Bild-Verweis für junge Stufen: ‚icon:book‘ → ‚motiv:buch‘; alles andere bleibt, wie es ist. */
export function motivFuerIcon(id: BildId): BildId {
  if (!id.startsWith('icon:')) return id
  const m = motivFuerIconName(id)
  return m ? 'motiv:' + m : id
}

// --- Jugendfiguren statt Kinderfiguren (C4–ES) -----------------------------------------------------------

/** Kinderfigur → mögliche Jugendfiguren (in dieser Reihenfolge; ähnliche Haare, Haut und Kopfbedeckung zuerst). Nele (Rollstuhl) und
 *  Finn (Hörgerät) sind Figuren mit Merkmal und werden nie von selbst eingesetzt. */
const JUGEND_VON: Record<string, string[]> = {
  mia: ['jana', 'chloe'],
  lea: ['chloe', 'jana'],
  amira: ['lina'],
  sami: ['yusuf', 'ben'],
  noah: ['ben', 'yusuf'],
  tom: ['ben', 'yusuf'],
}

/** Welche Kinderfiguren eines Blatts werden zu Jugendfiguren? Nur wenn jede Figur ihre eigene Jugendfigur bekommt (die Figuren des
 *  Blatts bleiben unterscheidbar, eine bereits genutzte Jugendfigur wird nicht doppelt vergeben) – sonst bleibt alles, wie es ist. */
export function jugendFiguren(text: string): Map<string, string> | undefined {
  const namen = [...new Set([...text.matchAll(/figur:([a-z]+)/g)].map((m) => m[1]))]
  const kinder = namen.filter((n) => JUGEND_VON[n])
  if (!kinder.length) return undefined
  const belegt = new Set(namen.filter((n) => !JUGEND_VON[n]))
  const karte = new Map<string, string>()
  for (const n of kinder) {
    const ziel = JUGEND_VON[n].find((z) => !belegt.has(z))
    if (!ziel) return undefined
    belegt.add(ziel)
    karte.set(n, ziel)
  }
  return karte
}

// --- Duotone: Linie in Tinte, geschlossene Formen zart gefüllt ---------------------------------------------

type Teil = { c: string; p: number[] }

const ANZAHL: Record<string, number> = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 }

function teile(d: string): Teil[] {
  const out: Teil[] = []
  const re = /([a-zA-Z])([^a-zA-Z]*)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(d))) {
    const zahlen = (m[2].match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) ?? []).map(Number)
    const n = ANZAHL[m[1].toLowerCase()]
    if (n === 0) {
      out.push({ c: m[1], p: [] })
      continue
    }
    for (let i = 0; i + n <= zahlen.length; i += n) {
      // weitere Paare nach einem M sind Linien
      const c = i > 0 && m[1] === 'M' ? 'L' : i > 0 && m[1] === 'm' ? 'l' : m[1]
      out.push({ c, p: zahlen.slice(i, i + n) })
    }
  }
  return out
}

/** Geschlossene Teilwege eines Pfads (Tabler-Piktogramme schließen ohne „z“: Endpunkt = Startpunkt). */
function geschlosseneTeilwege(d: string): string[] {
  const out: string[] = []
  let x = 0
  let y = 0
  let start: [number, number] | null = null
  let cur: Teil[] = []
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  let zu = false
  const abschluss = () => {
    if (start && cur.length > 1) {
      const ende = Math.hypot(x - start[0], y - start[1])
      const gross = maxX - minX >= 2.5 && maxY - minY >= 2.5
      if (gross && (zu || ende < 0.06)) out.push(`M${start[0]} ${start[1]}` + cur.slice(1).map((s) => s.c + s.p.join(' ')).join(''))
    }
    cur = []
    start = null
    zu = false
    minX = minY = Infinity
    maxX = maxY = -Infinity
  }
  const merke = (px: number, py: number) => {
    minX = Math.min(minX, px)
    maxX = Math.max(maxX, px)
    minY = Math.min(minY, py)
    maxY = Math.max(maxY, py)
  }
  for (const s of teile(d)) {
    const rel = s.c === s.c.toLowerCase()
    const k = s.c.toLowerCase()
    if (k === 'm') {
      abschluss()
      x = rel ? x + s.p[0] : s.p[0]
      y = rel ? y + s.p[1] : s.p[1]
      start = [x, y]
      cur = [s]
      merke(x, y)
      continue
    }
    if (k === 'z') {
      zu = true
      if (start) {
        x = start[0]
        y = start[1]
      }
      cur.push(s)
      continue
    }
    cur.push(s)
    const n = s.p.length
    if (k === 'h') x = rel ? x + s.p[0] : s.p[0]
    else if (k === 'v') y = rel ? y + s.p[0] : s.p[0]
    else {
      x = rel ? x + s.p[n - 2] : s.p[n - 2]
      y = rel ? y + s.p[n - 1] : s.p[n - 1]
    }
    merke(x, y)
  }
  abschluss()
  return out
}

const teilwegCache = new Map<string, string[]>()

function teilwege(d: string): string[] {
  let r = teilwegCache.get(d)
  if (!r) teilwegCache.set(d, (r = geschlosseneTeilwege(d)))
  return r
}

/** Piktogramm als Duotone: unter den Linien werden geschlossene Formen mit `fuellung` (z. B. ein heller Ton der
 *  Bereichsfarbe) gefüllt. Strich und Form bleiben unverändert. */
export function duotone(z: Zeichnung, fuellung: string): Zeichnung {
  const flaechen: Form[] = []
  for (const f of z.formen) {
    if (f.t === 'g' || (f.f && f.f !== 'none')) continue
    if (f.t === 'circle' || f.t === 'ellipse' || f.t === 'rect' || f.t === 'polygon') flaechen.push({ ...f, f: fuellung, s: 'none' } as Form)
    else if (f.t === 'path') for (const d of teilwege(f.d)) flaechen.push({ t: 'path', d, f: fuellung, s: 'none' })
  }
  return { ...z, formen: [...flaechen, ...z.formen] }
}
