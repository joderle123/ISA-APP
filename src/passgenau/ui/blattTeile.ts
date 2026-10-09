// Passgenau – das synthetische Kinderblatt (Kern: kinderblatt()) in Teile zerlegen, damit jeder Mikro-Baustein in
// der Vorschau antippbar ist. Nur über die Schnittstelle des Kerns: das Blatt einmal ganz, einmal ohne Teile und je
// Teil einzeln rechnen; was alle gemeinsam haben, ist Kopf (z. B. Zielkarte) bzw. Fuß.
import type { Baustein, Blatt } from '../../blatt/typen'
import type { BlattTeil, KatalogEintrag, Plan, Profil, Sprache } from '../typen'
import { kinderblatt, type Katalog } from './kern'

export interface ZerlegtesBlatt {
  blatt: Blatt
  kopf: Baustein[]
  /** je BlattTeil (gleiche Reihenfolge wie sitzung.blatt.bausteine) */
  teile: Baustein[][]
  fuss: Baustein[]
}

function inhalt(b: Blatt, sprache: Sprache): Baustein[] {
  return (sprache === 'fr' && b.fr ? b.fr : b.de).bausteine.filter((x) => x.art !== 'seitenumbruch' && x.art !== 'abstand')
}
const gleich = (a: Baustein, b: Baustein) => JSON.stringify(a) === JSON.stringify(b)
function praefix(a: Baustein[], b: Baustein[]): number {
  let i = 0
  while (i < a.length && i < b.length && gleich(a[i], b[i])) i++
  return i
}
function suffix(a: Baustein[], b: Baustein[]): number {
  let i = 0
  while (i < a.length && i < b.length && gleich(a[a.length - 1 - i], b[b.length - 1 - i])) i++
  return i
}

export function mitTeilen(plan: Plan, nr: number, teile: BlattTeil[]): Plan {
  return {
    ...plan,
    sitzungen: plan.sitzungen.map((s) => (s.nr === nr ? { ...s, blatt: { titel: s.blatt?.titel ?? '', bausteine: teile } } : s)),
  }
}

export function zerlegen(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): ZerlegtesBlatt {
  const blatt = kinderblatt(k, p, plan, nr, sprache)
  const voll = inhalt(blatt, sprache)
  const teileRef = plan.sitzungen.find((s) => s.nr === nr)?.blatt?.bausteine ?? []
  const leer = inhalt(kinderblatt(k, p, mitTeilen(plan, nr, []), nr, sprache), sprache)
  const vor = praefix(voll, leer)
  const nach = suffix(voll.slice(vor), leer.slice(vor))
  const mitte = voll.slice(vor, voll.length - nach)
  const laengen = teileRef.map((t) => {
    const e = inhalt(kinderblatt(k, p, mitTeilen(plan, nr, [t]), nr, sprache), sprache)
    const a = praefix(e, leer)
    const b = suffix(e.slice(a), leer.slice(a))
    return Math.max(0, e.length - a - b)
  })
  const teile: Baustein[][] = []
  if (laengen.reduce((s, x) => s + x, 0) === mitte.length) {
    let i = 0
    for (const n of laengen) {
      teile.push(mitte.slice(i, i + n))
      i += n
    }
  } else {
    // Rückfall: ein Teil je Baustein der Mitte, solange es reicht
    mitte.forEach((b, i) => {
      if (i < teileRef.length) teile.push([b])
      else teile[teile.length - 1]?.push(b)
    })
  }
  return { blatt, kopf: voll.slice(0, vor), teile, fuss: voll.slice(voll.length - nach) }
}

/** Inhalt eines Katalog-Bausteins, wie er auf dem Blatt stünde (für Miniaturen der Alternativen und der Suche) */
export function inhaltVon(k: Katalog, p: Profil, plan: Plan, nr: number, e: KatalogEintrag, sprache: Sprache): Baustein[] {
  const leer = inhalt(kinderblatt(k, p, mitTeilen(plan, nr, []), nr, sprache), sprache)
  const x = inhalt(kinderblatt(k, p, mitTeilen(plan, nr, [{ ref: e.id, h: e.h }]), nr, sprache), sprache)
  const a = praefix(x, leer)
  const b = suffix(x.slice(a), leer.slice(a))
  return x.slice(a, x.length - b)
}

// --- Textfelder (Baukasten) -------------------------------------------------------------------------------------

/** Wert an einem Pfad wie „1.felder.0.text“ – relativ zum Teil (Index des Bausteins) oder, falls das nicht passt,
 *  relativ zum ersten Baustein des Teils. */
export function wertAnPfad(bausteine: Baustein[], pfad: string): string | undefined {
  const geh = (o: unknown, teile: string[]): unknown => teile.reduce<unknown>((x, k) => (x && typeof x === 'object' ? (x as Record<string, unknown>)[k] : undefined), o)
  const t = pfad.split('.')
  const v = geh(bausteine, t)
  if (typeof v === 'string') return v
  for (const b of bausteine) {
    const w = geh(b, t)
    if (typeof w === 'string') return w
  }
  return undefined
}

const ZAHL = /^\d+$/
/** Beschriftung eines Textfelds aus seinem Pfad */
export function pfadLabel(bausteine: Baustein[], pfad: string): string {
  const t = pfad.split('.')
  const i = ZAHL.test(t[0]) ? +t[0] : 0
  const art = bausteine[i]?.art ?? bausteine[0]?.art
  const r = ZAHL.test(t[0]) ? t.slice(1) : t
  const n = (s?: string) => (s && ZAHL.test(s) ? +s + 1 : 1)
  const [a, b, c] = r
  if (a === 'text') return art === 'aufgabe' ? 'Aufgabe' : art === 'frage' ? 'Frage' : art === 'info' ? 'Infotext' : 'Text'
  if (a === 'felder') return `Sprechblase ${n(b)}`
  if (a === 'items') return art === 'satzanfaenge' ? `Satzanfang ${n(b)}` : art === 'wortspeicher' ? `Wort ${n(b)}` : `Zeile ${n(b)}`
  if (a === 'beispiele') return c === 'wenn' ? 'Beispiel: Wenn …' : 'Beispiel: … dann'
  if (a === 'karten') return `Karte ${n(b)}`
  if (a === 'bilder') return `Bild ${n(b)}`
  if (a === 'stufen') return c === 'text' ? `Stufe ${n(b)} – Text` : `Stufe ${n(b)}`
  if (a === 'von') return 'Skala links'
  if (a === 'bis') return 'Skala rechts'
  if (a === 'frage') return 'Frage'
  if (a === 'titel') return 'Überschrift'
  return r.join(' ')
}

export const PLATZHALTER = ['NAME', 'INTERESSE', 'WOCHENZIEL'] as const
