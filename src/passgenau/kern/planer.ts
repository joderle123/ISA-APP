// Passgenau – der Planer (Konzept 5.1–5.10, Kritiken vom 9.10.): Vorlagen je Dauer und Tagesform (eine Slot-Tabelle),
// Folgen mit Bogen, Rituale konstant, Kern mit Ziel, Blatt mit Seiten- und Zeitbudget, Weg 3 nur ohne Ziel mit echter
// Wahl, Erkundung ≈ 20 % reproduzierbar, Lockerungsleiter mit sichtbarem Grund. Deterministisch: gleicher Auftrag,
// gleiches Kind, gleiche Vorlieben → gleicher Plan (Seed aus Kind, Plan-Id, Sitzung, Variante – kein Datum, kein ref).
import type { Auftrag, Bogen, Ereignis, KatalogEintrag, Plan, PlanSchritt, Profil, Rolle, Sitzung, Sprache } from '../typen'
import { hash01, hash8, stufeAusAlter, layoutAusStufe, istEldib } from './hilfen'
import { aktuellerKatalog, ichSatz, intern, kurz, merkmaleVon, setzeTextModus, textVon, type Katalog } from './katalog'
import { bewerte, kontext, krisenlage, pruefe, rang, warum, type Bewertet, type Kontext } from './regeln'
import { baueBlatt, kernBlatt } from './blatt'
import { BLATT_SYSTEM } from './system'
import { vertrauenKind, vorliebe, type Vorlieben } from './vorlieben'
import { KOMPETENZ_NAME, NUR_DEUTSCH, themaByKey, type Kompetenz } from './vokabular'

export interface Verlauf {
  plaene: Plan[]
  ereignisse: Ereignis[]
}

// ---------------------------------------------------------------------------------------------------------------------
// Bogen und Vorlagen (5.4, 5.6, T-M2: eine Slot-Tabelle)
// ---------------------------------------------------------------------------------------------------------------------

const W: Bogen = 'wahrnehmen'
const Vs: Bogen = 'verstehen'
const U: Bogen = 'ueben'
const T: Bogen = 'uebertragen'
const R: Bogen = 'reflektieren'
export const BOGEN: Record<number, Bogen[]> = {
  1: [U], 2: [Vs, U], 3: [Vs, U, T], 4: [Vs, U, T, R], 5: [W, Vs, U, T, R], 6: [W, Vs, U, U, T, R], 7: [W, Vs, U, U, T, T, R],
  8: [W, Vs, U, U, U, T, T, R], 9: [W, Vs, Vs, U, U, U, T, T, R], 10: [W, Vs, Vs, U, U, U, T, T, T, R],
}

export type SlotRolle = Rolle | 'wahl' | 'pause'
export interface Slot { rolle: SlotRolle; min: number }

/** Die Slot-Tabelle: Minuten je Rolle und Dauer, Weg 1/2 und Weg 3. Summe = Dauer. */
export const SLOTS: Record<'normal' | 'leicht', Record<number, [SlotRolle, number][]>> = {
  normal: {
    10: [['ankommen', 2], ['kern', 6], ['abschluss', 2]],
    15: [['ankommen', 3], ['kern', 9], ['abschluss', 3]],
    20: [['ankommen', 3], ['kern', 10], ['uebung', 4], ['abschluss', 3]],
    30: [['ankommen', 4], ['einstieg', 4], ['kern', 10], ['uebung', 8], ['abschluss', 4]],
    45: [['ankommen', 5], ['einstieg', 5], ['kern', 12], ['bewegung', 5], ['uebung', 13], ['abschluss', 5]],
    60: [['ankommen', 5], ['einstieg', 5], ['kern', 16], ['bewegung', 8], ['uebung', 16], ['reflexion', 5], ['abschluss', 5]],
  },
  leicht: {
    10: [['ankommen', 2], ['wahl', 6], ['abschluss', 2]],
    15: [['ankommen', 2], ['wahl', 9], ['abschluss', 4]],
    20: [['ankommen', 3], ['wahl', 9], ['regulation', 5], ['abschluss', 3]],
    30: [['ankommen', 3], ['wahl', 10], ['spiel', 8], ['regulation', 5], ['abschluss', 4]],
  },
}

/** Jugendliche (ab 12): weniger, längere Teile – ein Kern von 15–20 Minuten statt 8–12 (dritte Blind-Bewertung: „in
 *  8 Minuten nicht machbar“, „zu viele kurze Wechsel“). */
export const SLOTS_JUGEND: Record<number, [SlotRolle, number][]> = {
  15: [['ankommen', 2], ['kern', 11], ['abschluss', 2]],
  20: [['ankommen', 2], ['kern', 12], ['uebung', 4], ['abschluss', 2]],
  30: [['ankommen', 3], ['einstieg', 3], ['kern', 13], ['uebung', 8], ['abschluss', 3]],
  45: [['ankommen', 4], ['einstieg', 4], ['kern', 18], ['bewegung', 4], ['uebung', 11], ['abschluss', 4]],
  60: [['ankommen', 4], ['einstieg', 4], ['kern', 22], ['bewegung', 5], ['uebung', 14], ['reflexion', 6], ['abschluss', 5]],
}

const KANDIDAT_ROLLEN: Record<SlotRolle, Rolle[]> = {
  ankommen: ['ankommen'], einstieg: ['einstieg'], kern: ['kern'], uebung: ['kern', 'spiel'], bewegung: ['bewegung'], spiel: ['spiel', 'bewegung'],
  regulation: ['regulation'], reflexion: ['reflexion'], abschluss: ['abschluss'], transfer: ['transfer'], wahl: ['spiel', 'bewegung', 'regulation'], pause: ['bewegung'],
}

function vorlage(c: Kontext): Slot[] {
  const leicht = c.weg === 'leicht'
  const tab = SLOTS[leicht ? 'leicht' : 'normal']
  const d = c.a.dauer
  const basis = (!leicht && c.alter >= 12 ? SLOTS_JUGEND[d] : undefined) ?? tab[d] ?? (leicht ? tab[d <= 10 ? 10 : d <= 20 ? 20 : 30] : tab[30])
  const v: Slot[] = basis.map(([rolle, min]) => ({ rolle, min }))
  if (leicht) {
    // Weg 3 mit Blatt (P2): eine Mitmach-Seite statt Spiel bzw. Ruhe; bei 10/15 Min. ist sie eine Option der Wahl
    if (c.a.blatt === 'mit') {
      const i = v.findIndex((x) => x.rolle === 'spiel')
      const j = v.findIndex((x) => x.rolle === 'regulation')
      if (i >= 0) v[i].rolle = 'uebung'
      else if (j >= 0) v[j].rolle = 'uebung'
    }
    return v
  }
  // ausdrücklich mit Blatt, aber 10/15 Min. ohne Blatt-Slot: ein kurzer Slot aus dem Kern („1 Paket als Karte“, T-M2)
  if (c.a.blatt === 'mit' && !v.some((x) => x.rolle === 'uebung')) {
    const k = v.find((x) => x.rolle === 'kern')
    if (k && k.min >= 6) {
      const n = k.min >= 9 ? 4 : 2
      k.min -= n
      v.splice(v.indexOf(k) + 1, 0, { rolle: 'uebung', min: n })
    }
  }
  const h = c.heute
  const idx = (r: SlotRolle) => v.findIndex((x) => x.rolle === r)
  const nimm = (r: SlotRolle, n: number, mindest = 3) => {
    const i = idx(r)
    if (i < 0 || v[i].min - n < mindest) return 0
    v[i].min -= n
    return n
  }
  // Blatt ohne: Slot Übung/Blatt wird Spiel, Gespräch oder Bewegung derselben Minuten (P2)
  if (blattModus(c) === 'ohne') for (const s of v) if (s.rolle === 'uebung') s.rolle = 'spiel'
  // Jugendliche schon ab Energie 5 (Blind-Bewertung 5: „bei Energie 5 komplett im Sitzen und Schreiben“)
  if (h.energie >= (c.alter >= 12 ? 5 : 6)) {
    const b = idx('bewegung')
    if (b >= 0) v.splice(1, 0, v.splice(b, 1)[0])
    else {
      // Jugendliche: nicht aus dem Kern (die Einzelübungen brauchen ihre 12–15 Minuten), sondern aus Blatt und Ankommen
      const n = c.alter >= 12 ? nimm('uebung', 2, 4) + nimm('ankommen', 1, 2) : nimm('kern', 2, 6) + nimm('einstieg', 1) + (idx('einstieg') < 0 ? nimm('uebung', 1) : 0)
      if (n >= 2) v.splice(1, 0, { rolle: 'bewegung', min: n })
    }
  } else if (h.energie <= 2) {
    for (const s of v) if (s.rolle === 'bewegung') {
      const rest = s.min - 3
      s.rolle = 'regulation'
      s.min = 3
      const k = v.find((x) => x.rolle === 'kern')
      if (k && rest > 0) k.min += rest
    }
  }
  if (h.konzentration <= 3) {
    const i = idx('kern')
    const kurz = c.alter >= 12 ? 12 : 8
    if (i >= 0 && v[i].min > kurz) {
      const rest = v[i].min - kurz
      v[i].min = kurz
      if (rest >= 2) v.splice(i + 1, 0, { rolle: h.energie >= 4 ? 'bewegung' : 'regulation', min: rest })
      else v[i].min += rest
    }
  } else if (h.konzentration >= 6) {
    const n = nimm('einstieg', 2)
    const k = v.find((x) => x.rolle === 'kern')
    if (k) k.min += n
  }
  if (h.stimmung <= 2) {
    const n = c.alter >= 12 ? nimm('uebung', 2, 4) : nimm('kern', 2, 6)
    const a = v.find((x) => x.rolle === 'ankommen')
    if (a) a.min += n
    for (const s of v) if (s.rolle === 'einstieg') s.rolle = 'spiel'
  }
  // Bewegungspausen (P11): nach jedem Block über 8 Minuten 2 Minuten Pause
  if (c.hilft.has('bewegungspausen'))
    for (let i = v.length - 1; i >= 0; i--)
      // Jugendliche: die Pause nach dem Kern geht vom Blatt ab, nicht vom Kern (die Einzelübungen brauchen ihre Minuten)
      if (c.alter >= 12 && v[i].rolle === 'kern' && v[i].min > 8) {
        const u = v.find((x) => x.rolle === 'uebung' && x.min >= 6)
        if (u) {
          u.min -= 2
          v.splice(i + 1, 0, { rolle: 'pause', min: 2 })
        }
      } else if (v[i].min > 8 && (v[i].rolle === 'kern' || v[i].rolle === 'uebung' || v[i].rolle === 'spiel')) {
        v[i].min -= 2
        v.splice(i + 1, 0, { rolle: 'pause', min: 2 })
      }
  return v
}

export function blattModus(c: Kontext): 'mit' | 'ohne' {
  return c.a.blatt ?? (c.alter <= 5 || c.weg === 'leicht' ? 'ohne' : 'mit')
}

function bogenFuer(c: Kontext, n: number): Bogen[] {
  if (n === 1) {
    const s = c.a.schwerpunkt?.[0]
    const map: Record<string, Bogen> = { verstehen: Vs, ueben: U, uebertragen: T, selbstbild: R, beziehung: U }
    return [s ? map[s] : U]
  }
  return BOGEN[Math.max(1, Math.min(10, n))]
}

// ---------------------------------------------------------------------------------------------------------------------
// Kandidaten mit Lockerungsleiter (5.2, T-M3)
// ---------------------------------------------------------------------------------------------------------------------

export interface SlotAuftrag {
  rolle: SlotRolle
  min: number
  phase: Bogen | 'leicht'
  nr: number
  salz: string
  gesperrt: Set<string>
  vorher: Set<string>
  formate: Set<string>
  vorigerKern?: string
  /** Formate der letzten zwei Kerne (nie dreimal dasselbe) */
  kernFormate?: string[]
  fokus?: Map<string, number>
  /** bevorzugte Einträge (gespeicherte Sitzung, „kein Neuwurf“) */
  bevorzugt?: Set<string>
}

export interface Wahl {
  b: Bewertet
  locker: number
  lockerText?: string
}

/** Passgenau-eigene Schritte, die nur gezielt eingesetzt werden (Blatt-Slot, Pause, Rituale, „einfach da sein“). */
const NIE_KANDIDAT = new Set(['pg:blatt', 'pg:pause', 'pg:da-sein', 'pg:ankommen', 'pg:abschluss', 'pg:ankommen-still', 'pg:abschluss-still', 'pg:einstieg', 'pg:rueckblick', 'pg:folge-transfer', 'pg:uebertragen'])

const MINUTEN_RE = /(\d{1,3})\s*(?:Minuten|Min\.|minutes)/g
const TEXT_MIN = new WeakMap<KatalogEintrag, number>()
/** Größte Minutenzahl, die der Text eines Schritts nennt (0: keine). */
function textMinuten(e: KatalogEintrag): number {
  let m = TEXT_MIN.get(e)
  if (m !== undefined) return m
  m = 0
  if (e.typ === 'schritt') for (const x of (e.einzelvariante?.text ?? e.text).matchAll(MINUTEN_RE)) m = Math.max(m, Number(x[1]))
  TEXT_MIN.set(e, m)
  return m
}

const JUNGE_FORMATE = new WeakMap<Kontext, Map<string, number>>()
/** Formate der Kerne, die das Kind in den letzten 21 Tagen hatte (aus „gemacht“). */
function jungeKernFormate(c: Kontext): Map<string, number> {
  let m = JUNGE_FORMATE.get(c)
  if (m) return m
  m = new Map()
  for (const [id, tage] of c.gemacht) {
    if (tage > 21) continue
    const e = c.k.eintraege.get(id)
    if (e && e.typ === 'schritt' && e.rolle.includes('kern') && e.format[0]) m.set(e.format[0], (m.get(e.format[0]) ?? 0) + 1)
  }
  JUNGE_FORMATE.set(c, m)
  return m
}

function dauerPasst(e: KatalogEintrag, min: number, locker: number): boolean {
  const t = locker >= 1 ? 3 : 1
  // Blind-Bewertung 9.10.: mehrstufige Kerne in 4–8 Minuten waren nicht machbar – der Slot hat mindestens drei Viertel
  // der üblichen Dauer (ohne Lockerung)
  if (locker < 2 && e.typ === 'schritt' && min < 0.75 * e.dauer.typ) return false
  return e.dauer.min <= min + t && e.dauer.max >= min - t
}

/** Kandidaten eines Slots, bewertet und sortiert; Lockerung nur so weit wie nötig (bis ≥ 3). */
export function kandidaten(c: Kontext, s: SlotAuftrag): Wahl[] {
  const rollen = KANDIDAT_ROLLEN[s.rolle]
  const roh = new Map<string, KatalogEintrag>()
  for (const r of rollen) for (const e of c.k.nachRolle.get(r) ?? []) if (e.typ === 'schritt' && !NIE_KANDIDAT.has(e.id) && !roh.has(e.id)) roh.set(e.id, e)
  const zielSlot = (s.rolle === 'kern' || s.rolle === 'uebung') && c.weg !== 'leicht' && (c.ziele.length > 0 || c.themen.size > 0)
  const phaseSlot = (s.rolle === 'kern' || s.rolle === 'einstieg') && s.phase !== 'leicht'
  let beste: Wahl[] = []
  for (let locker = 0; locker <= 4; locker++) {
    const out: Wahl[] = []
    for (const e of roh.values()) {
      if (pruefe(e, c, { locker, gesperrt: s.gesperrt, rolle: s.rolle === 'pause' ? 'bewegung' : (s.rolle as Rolle), vorher: s.vorher }) !== null) continue
      if (!dauerPasst(e, s.min, locker)) continue
      // der Text nennt selbst eine längere Zeit („30 Minuten Ruhezeit“, „20 Minuten backen“) als der Slot hat
      if (textMinuten(e) > s.min + 5) continue
      if (s.rolle === 'kern' && s.kernFormate?.length === 2 && s.kernFormate[0] === s.kernFormate[1] && e.format[0] === s.kernFormate[0]) continue
      if (s.rolle === 'bewegung' && c.heute.energie >= 6 && e.energie < 2) continue
      // Phasen aus Material-Einheiten sind Teile längerer Stunden: als kurzes Spiel oder Pause weniger passend
      const malus = (e.id.startsWith('m:') && (s.rolle === 'spiel' || s.rolle === 'bewegung' || s.rolle === 'regulation' || s.rolle === 'wahl') ? 0.08 : 0) +
        // Abwechslung über die Wochen: ein Kern im selben Format wie die Kerne der letzten drei Wochen zählt etwas weniger
        (s.rolle === 'kern' ? Math.min(0.1, 0.04 * (jungeKernFormate(c).get(e.format[0] ?? '') ?? 0)) : 0)
      const b = bewerte(e, c, { phase: s.phase, formate: s.formate, vorigerKern: s.vorigerKern, fokus: s.fokus, locker, bonus: (s.bevorzugt?.has(e.id) ? 1 : 0) - malus })
      if (phaseSlot && locker < 1 && e.bogen && s.phase !== 'leicht' && b.f.phase < 0.3) continue
      // Kern: genau das Ziel (ELDiB-Code des Ziels, primär oder sekundär) – ein Nachbar-Code im selben Bereich erst bei
      // Lockerung (Blind-Bewertung 9.10.: Kerne einer Folge drifteten zu Chat-Ton, Schulden, Gaming bei Ziel „warten“)
      if (zielSlot && s.rolle === 'kern' && c.ziele.length) {
        if (!(b.f.ziel >= (locker >= 2 ? 0.25 : 0.4) || (locker >= 3 && b.f.thema > 0))) continue
      } else if (zielSlot && !(b.f.ziel >= (locker >= 2 ? 0.15 : 0.25) || b.f.thema > 0)) continue
      out.push({ b, locker, lockerText: locker >= 3 && e.typ === 'schritt' ? lockerGrund(c, e, locker) : undefined })
    }
    out.sort((x, y) => rang(x.b, y.b, s.salz))
    if (out.length >= 3 || locker === 4) {
      beste = out.length ? out : beste
      if (out.length) break
    } else if (out.length > beste.length) beste = out
  }
  return beste
}

function lockerGrund(c: Kontext, e: KatalogEintrag, locker: number): string | undefined {
  if (locker === 3) {
    const tage = c.gemacht.get(e.id)
    if (tage !== undefined) return `schon vor ${tage} Tagen gemacht – wieder vorgeschlagen, weil sonst wenig passt`
  }
  if (locker === 4 && c.sprache === 'fr' && e.typ === 'schritt' && !e.fr && !e.id.startsWith('pg:')) return NUR_DEUTSCH
  if (locker === 4 && e.typ === 'schritt' && e.einzeltauglich === 'angepasst') return 'Gruppenaktivität – so mit einem Kind machen'
  return undefined
}

// ---------------------------------------------------------------------------------------------------------------------
// Rituale (5.6): einmal je Folge, Vorlieben des Kindes zuerst; Weg 3: nur, was nichts verlangt (P8)
// ---------------------------------------------------------------------------------------------------------------------

/** Rituale, die auf eine nächste Sitzung der Folge zählen („In der nächsten Stunde wird zuerst hineingeschaut“) */
const FOLGE_RITUAL_RE = /(in der nächsten Stunde|nächste[ns]? Mal (wird|ist|liegt|bereit)|über die Folge|der Folge\b|fürs nächste Mal|zur nächsten Stunde|séance suivante|la prochaine fois|de la série|au fil de la série|pour la prochaine fois)/i
function folgeRitual(e: KatalogEintrag): boolean {
  if (e.typ !== 'schritt') return false
  return FOLGE_RITUAL_RE.test(`${e.titel} ${e.text} ${(e.sagen ?? []).join(' ')} ${e.fr?.text ?? ''} ${e.fr?.titel ?? ''}`)
}

function ritualErlaubt(c: Kontext, e: KatalogEintrag, rolle: 'ankommen' | 'abschluss'): boolean {
  if (e.typ !== 'schritt') return false
  // Blind-Bewertung 9.10.: Schatz-Schachtel und „Wunsch fürs nächste Mal“ in Einzelstunden versprachen eine nächste Sitzung
  if (c.weg !== 'gruendlich' && folgeRitual(e)) return false
  const anspruch = e.anspruch ?? 1
  if (c.weg === 'leicht') {
    const still = c.tagesformen.some((t) => ['traurig', 'aengstlich', 'rueckzug', 'will-nicht', 'aufgewuehlt'].includes(t))
    if (rolle === 'ankommen' && anspruch > (still ? 0 : 1)) return false
    if (rolle === 'abschluss' && anspruch > 1) return false
  }
  if (c.heute.stimmung <= 2 && anspruch > 1) return false
  // Krisenlage (Stimmung ≤ 2, Trauer, Trauma): das Ankommen fragt nichts ab (A12) – nur Rituale ohne Anspruch
  if (rolle === 'ankommen' && krisenlage(c) && anspruch > 0) return false
  return true
}

function waehleRitual(c: Kontext, rolle: 'ankommen' | 'abschluss', min: number, salz: string, ausser: Set<string>): Bewertet | null {
  const gewuenscht = c.p.rituale?.[rolle]
  const liste: Bewertet[] = []
  for (const e of c.k.nachRolle.get(rolle) ?? []) {
    if (ausser.has(e.id) || e.id.startsWith('pg:')) continue
    if (!ritualErlaubt(c, e, rolle)) continue
    if (pruefe(e, c, { ritual: true, rolle }) !== null) continue
    if (!(e.dauer.min <= min + 2)) continue
    // Rituale sollen tragen, nicht lehren: kurze, einzeltaugliche Schritte bevorzugt
    const b = bewerte(e, c, { phase: c.weg === 'leicht' ? 'leicht' : undefined, bonus: (e.id === gewuenscht ? 0.6 : 0) + (e.einzeltauglich === 'ja' ? 0.05 : 0) + (e.typ === 'schritt' && e.quelle.art === 'ritual' ? 0.5 : e.id.endsWith(':reim') ? 0.2 : 0) - (e.dauer.typ > min * 2 ? 0.08 : 0) })
    liste.push(b)
  }
  liste.sort((a, b) => rang(a, b, salz))
  if (liste[0]) return liste[0]
  // Rückfall: stille Passgenau-Rituale
  const id = c.weg === 'leicht' || c.heute.stimmung <= 2 ? `pg:${rolle}-still` : `pg:${rolle}`
  const e = c.k.eintraege.get(id)
  return e ? bewerte(e, c, {}) : null
}

// ---------------------------------------------------------------------------------------------------------------------
// Eine Sitzung füllen
// ---------------------------------------------------------------------------------------------------------------------

export interface SitzungsAuftrag {
  plan: string
  nr: number
  phase: Bogen | 'leicht'
  rituale: { ankommen: Bewertet | null; abschluss: Bewertet | null }
  gesperrt: Set<string>
  vorher: Set<string>
  kernFormate: string[]
  variante: number
  bevorzugt?: Set<string>
  /** zweites Ziel trägt das Blatt (A · B · A · B) */
  fokus?: Map<string, number>
  /** Kerne der früheren Sitzungen dieser Folge (für den Rückblick der letzten Sitzung) */
  fruehereKerne?: string[]
}

function planSchritt(b: Bewertet, rolle: Rolle, min: number, c: Kontext, o: { phase: Bogen | 'leicht'; nr: number; ritual?: boolean; erkundung?: boolean; lockerText?: string }): PlanSchritt {
  const e = b.e
  const t = e.typ === 'schritt' ? e.titel : e.id
  const s: PlanSchritt = { ref: e.id, h: e.h, rolle, min, t: t.length > 60 ? t.slice(0, 59) + '…' : t, warum: warum(b, c, { phase: o.phase, nr: o.nr, ritual: o.ritual, erkundung: o.erkundung, locker: o.lockerText, rolle }) }
  if (o.erkundung) s.erkundung = true
  if (o.lockerText) {
    s.hinweis = o.lockerText
    s.gelockert = true
  }
  else if (e.typ === 'schritt' && e.einzeltauglich === 'angepasst' && !e.einzelvariante) s.hinweis = 'Gruppenaktivität – so mit einem Kind machen'
  return s
}

/** Quelle eines Schritts als Einheit (gleiche Material-Einheit, Kurs-Einheit, Themenwoche) – für den roten Faden. */
export function quelleEinheit(id: string): string {
  const t = id.split(':')
  return t.length >= 3 ? `${t[0]}:${t[1]}` : id
}

/** Teilt ein Eintrag Hauptziel oder Thema mit dem Kern (für Einstieg, Reflexion und Nebenschritte)? */
function gleichesThema(e: KatalogEintrag, kern: KatalogEintrag): boolean {
  const codes = new Set(kern.eldib.filter((x) => x.gewicht === 1).map((x) => x.code))
  const ziel = e.eldib.some((x) => x.gewicht === 1 && codes.has(x.code))
  const thema = !e.thema.length || !kern.thema.length || e.thema.some((t) => kern.thema.includes(t))
  // dasselbe Hauptziel (Thema nicht fremd) – oder dasselbe Thema im selben Kompetenzfeld
  const gemeinsamesThema = e.thema.some((t) => kern.thema.includes(t)) && e.kompetenz.some((x) => kern.kompetenz.includes(x))
  return (ziel && thema) || gemeinsamesThema
}

/** Eigener Einstieg, der den Kern der Stunde ankündigt (wenn keine Einheit einen passenden hat). */
function einstiegSchritt(c: Kontext, min: number, kern: KatalogEintrag, nr = 1, titel?: { de: string; fr: string }): PlanSchritt {
  const e = c.k.eintraege.get('pg:einstieg')!
  const de = titel?.de ?? textVon(kern, 'de').titel
  const fr = titel?.fr ?? (kern.typ === 'schritt' && kern.fr ? kern.fr.titel : de)
  // Jugendliche: ohne „Material zeigen“ und „das Kind“; ab Sitzung 2 kurz an die letzte anknüpfen (roter Faden)
  if (c.alter >= 12)
    return {
      ref: e.id, h: e.h, rolle: 'einstieg', min: Math.min(min, 5), t: 'Worum es heute geht',
      ueber: {
        text: `${nr > 1 ? 'Zuerst kurz fragen, was seitdem passiert ist und was von der Übung davor hängen geblieben ist – ein Satz reicht, nichts muss. ' : ''}Die Fachkraft sagt in einem Satz, worum es heute geht („${de}“), und nennt ein kurzes Beispiel aus dem Alltag. Der oder die Jugendliche darf nachfragen, widersprechen oder einfach zuhören.`,
        'fr.text': `${nr > 1 ? 'D’abord demander brièvement ce qui s’est passé depuis et ce qui est resté de l’exercice d’avant – une phrase suffit, rien n’est obligatoire. ' : ''}L’adulte dit en une phrase de quoi il s’agit aujourd’hui (« ${fr} ») et donne un court exemple du quotidien. Le ou la jeune peut poser une question, ne pas être d’accord ou simplement écouter.`,
      },
      warum: ['Führt in den Kern der Stunde ein'],
    }
  return {
    ref: e.id, h: e.h, rolle: 'einstieg', min: Math.min(min, 5), t: 'Worum es heute geht',
    ueber: {
      text: `Die Fachkraft sagt in einem Satz, worum es heute geht („${de}“), und zeigt das Material der Übung. Sie erzählt ein kurzes Beispiel aus ihrem eigenen Alltag. Das Kind darf eine Frage stellen oder einfach zuhören.`,
      'fr.text': `L’adulte dit en une phrase de quoi il s’agit aujourd’hui (« ${fr} ») et montre le matériel de l’activité. Il raconte un court exemple de son propre quotidien. L’enfant peut poser une question ou simplement écouter.`,
    },
    warum: ['Führt in den Kern der Stunde ein'],
  }
}

/** Phase „Übertragen“ bei Jugendlichen: eine Übung der Folge in eine Situation der nächsten Tage übertragen. */
function uebertragenSchritt(c: Kontext, min: number, ref: string, nr: number): PlanSchritt {
  const e = c.k.eintraege.get('pg:uebertragen')!
  const q = c.k.eintraege.get(ref)
  const de = q ? textVon(q, 'de').titel : ''
  const fr = q && q.typ === 'schritt' && q.fr ? q.fr.titel : de
  return {
    ref: e.id, h: e.h, rolle: 'kern', min, t: `Übertragen: ${de}`.slice(0, 60),
    ueber: {
      titel: `Übertragen: ${de}`,
      'fr.titel': `Transférer : ${fr}`,
      text: `Die Übung „${de}“ aus Sitzung ${nr} kommt heute in den Alltag. Der oder die Jugendliche wählt eine Situation der nächsten Tage aus Schule, Freundeskreis oder Freizeit, in der sie passt (echt oder erfunden). Zuerst wird sie genau beschrieben: wo, wann, wer ist dabei, was ist der schwierige Moment. Dann wird sie zweimal durchgespielt: Die Fachkraft spielt die andere Person, erst leicht, dann etwas schwieriger; ein Stopp ist jederzeit erlaubt. Zum Schluss wird ein kleiner Versuch vereinbart – ohne Bewertung, auch „hat nicht geklappt“ ist eine Information.`,
      'fr.text': `L’activité « ${fr} » de la séance ${nr} passe aujourd’hui dans le quotidien. Le ou la jeune choisit une situation des prochains jours, à l’école, entre amis ou pendant les loisirs, où elle convient (vraie ou inventée). D’abord, on la décrit précisément : où, quand, qui est là, quel est le moment difficile. Puis on la joue deux fois : l’adulte joue l’autre personne, d’abord facilement, puis un peu plus difficilement ; on peut dire stop à tout moment. Pour finir, on convient d’un petit essai – sans évaluation, « ça n’a pas marché » est aussi une information.`,
    },
    warum: ['Übertragen: die geübte Übung in eine kommende Situation bringen'],
  }
}

/** Letzte Sitzung einer Jugend-Folge: die Übungen der Folge durchgehen, eine wählen und in eine kommende Situation aus
 *  Schule, Freundeskreis oder Freizeit übertragen (nie aus der Familie – Vorsicht Familie, Kinderschutz). */
function folgeTransferSchritt(c: Kontext, min: number, kerne: string[]): PlanSchritt {
  const e = c.k.eintraege.get('pg:folge-transfer')!
  const eintraege = [...new Set(kerne)].filter((r) => !r.startsWith('pg:')).map((r) => c.k.eintraege.get(r)).filter((x): x is KatalogEintrag => !!x)
  const de = eintraege.map((x) => `„${textVon(x, 'de').titel}“`).join(', ')
  const fr = eintraege.map((x) => `« ${x.typ === 'schritt' && x.fr ? x.fr.titel : textVon(x, 'de').titel} »`).join(', ')
  return {
    ref: e.id, h: e.h, rolle: 'kern', min, t: 'Das Wichtigste mitnehmen',
    ueber: {
      text: `Zuerst gemeinsam die Übungen der Folge durchgehen: ${de}. Der oder die Jugendliche wählt die, die am meisten gebracht hat, und eine Situation der nächsten Wochen aus Schule, Freundeskreis oder Freizeit, in der sie helfen kann (echt oder erfunden). Die Situation wird zweimal kurz durchgespielt: Die Fachkraft spielt die andere Person, erst leicht, dann etwas schwieriger; ein Stopp ist jederzeit erlaubt. Zum Schluss nennt die Fachkraft eine Sache, die sie seit der ersten Sitzung hat wachsen sehen.`,
      'fr.text': `D’abord passer en revue ensemble les activités de la série : ${fr}. Le ou la jeune choisit celle qui lui a le plus apporté et une situation des prochaines semaines, à l’école, entre amis ou pendant les loisirs, où elle peut aider (vraie ou inventée). La situation est jouée deux fois brièvement : l’adulte joue l’autre personne, d’abord facilement, puis un peu plus difficilement ; on peut dire stop à tout moment. Pour finir, l’adulte nomme une chose qu’il a vu grandir depuis la première séance.`,
    },
    warum: ['Letzte Sitzung: das Wichtigste der Folge in eine kommende Situation übertragen'],
  }
}

/** Rückblick der letzten Sitzung: nennt die Kerne der Folge. */
function rueckblickSchritt(c: Kontext, min: number, kerne: string[]): PlanSchritt {
  const e = c.k.eintraege.get('pg:rueckblick')!
  const titel = (sp: 'de' | 'fr') => [...new Set(kerne)].filter((r) => !r.startsWith('pg:')).map((r) => c.k.eintraege.get(r)).filter((x): x is KatalogEintrag => !!x).map((x) => (sp === 'fr' && x.typ === 'schritt' && x.fr ? x.fr.titel : textVon(x, 'de').titel))
  const liste = (l: string[]) => l.map((t) => `„${t}“`).join(', ')
  // das Blatt der letzten Sitzung fragt schon „Das nehme ich mit“ – nicht doppelt (Blind-Bewertung 5)
  const mitBlatt = c.weg !== 'leicht' && blattModus(c) !== 'ohne'
  return {
    ref: e.id, h: e.h, rolle: 'reflexion', min, t: 'Rückblick auf die Folge',
    // ab 12 ohne Abzeichen und Sticker (dritte Blind-Bewertung: „wirkt bei 14 Jahren kindlich“), ohne „noch einmal zeigen“
    ueber: c.alter >= 12
      ? {
          text: `Gemeinsam auf die letzten Sitzungen schauen: ${liste(titel('de'))}. Der oder die Jugendliche sagt, was davon am meisten gebracht hat und wo es im Alltag schon geholfen hat. Die Fachkraft nennt eine Sache, die sie hat wachsen sehen.${mitBlatt ? ' Was der oder die Jugendliche mitnimmt, kommt nachher aufs Blatt.' : ' Zum Schluss schreibt der oder die Jugendliche einen Satz auf eine Karte: Das nehme ich mit.'}`,
          'fr.text': `Regarder ensemble les dernières séances : ${titel('fr').map((t) => `« ${t} »`).join(', ')}. Le ou la jeune dit ce qui lui a le plus apporté et où cela a déjà aidé au quotidien. L’adulte nomme une chose qu’il a vu grandir.${mitBlatt ? ' Ce que le ou la jeune garde sera noté ensuite sur la fiche.' : ' Pour finir, le ou la jeune écrit une phrase sur une carte : Ce que je garde.'}`,
        }
      : {
          text: `Gemeinsam auf die letzten Sitzungen schauen: ${liste(titel('de'))}. Das Kind wählt die Übung, die am meisten geholfen hat, und zeigt sie noch einmal. Die Fachkraft nennt eine Sache, die sie beim Kind hat wachsen sehen. Zum Schluss eine kleine Feier: Das Kind malt ein Abzeichen oder sucht sich einen Sticker aus.`,
          'fr.text': `Regarder ensemble les dernières séances : ${titel('fr').map((t) => `« ${t} »`).join(', ')}. L’enfant choisit l’activité qui l’a le plus aidé et la montre encore une fois. L’adulte nomme une chose qu’il a vu grandir chez l’enfant. Pour finir, une petite fête : l’enfant dessine un badge ou choisit un autocollant.`,
        },
    warum: ['Letzte Sitzung: zurückblicken und feiern'],
  }
}

export function fuelleSitzung(c: Kontext, o: SitzungsAuftrag): Sitzung {
  const salz = `${c.seed}|${o.plan}|${o.nr}|${o.variante}`
  const slots = vorlage(c)
  // letzte Sitzung einer Folge („Rückblick & Feiern“): der Einstieg wird zum Rückblick auf die Kerne der Folge, mit Zeit
  // aus dem Kern (Blind-Bewertung 9.10.: die Schluss-Sitzungen blickten nicht zurück)
  if (o.phase === 'reflektieren' && (o.fruehereKerne ?? []).length >= 2 && !slots.some((x) => x.rolle === 'reflexion')) {
    const ei = slots.findIndex((x) => x.rolle === 'einstieg')
    const ke = slots.find((x) => x.rolle === 'kern')
    // Jugendliche: kein eigener Rückblick-Schritt – der Kern ist der Rückblick mit Übertragung (folgeTransferSchritt), er
    // bekommt die Minuten des Einstiegs (Blind-Bewertung 6: „Rückblick vor dem wiederholten Kern“, „wortgleiche Wiederholung“)
    if (c.alter >= 12 && ke) {
      if (ei >= 0) {
        ke.min += slots[ei].min
        slots.splice(ei, 1)
      }
    } else {
      const zeit = ke && ke.min >= 8 ? 4 : 0
      if (ke) ke.min -= zeit
      if (ei >= 0) slots[ei] = { ...slots[ei], rolle: 'reflexion', min: slots[ei].min + zeit }
      else if (zeit) slots.splice(1, 0, { rolle: 'reflexion', min: zeit })
    }
  }
  const formate = new Set<string>()
  const benutzt = new Set<string>(o.gesperrt)
  const hinweise: string[] = []
  const ergebnis: (PlanSchritt | null)[] = slots.map(() => null)
  const gewaehlt: { b: Bewertet; slot: Slot; i: number }[] = []
  let kern: KatalogEintrag | undefined
  // Titel des Kerns, wenn der Plan ihn selbst schreibt (Übertragen), für den Einstieg
  let kernTitel: { de: string; fr: string } | undefined
  // Reihenfolge des Füllens: erst der Kern (trägt das Ziel), dann der Rest – Einstieg und Reflexion passen sich an
  const reihe = slots.map((_, i) => i).sort((a, b) => (slots[a].rolle === 'kern' ? 0 : 1) - (slots[b].rolle === 'kern' ? 0 : 1) || a - b)
  for (const i of reihe) {
    const slot = slots[i]
    if (slot.rolle === 'ankommen' || slot.rolle === 'abschluss') {
      const r = o.rituale[slot.rolle]
      if (r) {
        ergebnis[i] = planSchritt(r, slot.rolle, slot.min, c, { phase: o.phase, nr: o.nr, ritual: true })
        gewaehlt.push({ b: r, slot, i })
      }
      continue
    }
    if (slot.rolle === 'uebung') {
      const e = c.k.eintraege.get('pg:blatt')!
      ergebnis[i] = { ref: e.id, h: e.h, rolle: 'uebung', min: slot.min, t: 'Blatt' }
      continue
    }
    if (slot.rolle === 'pause') {
      const e = c.k.eintraege.get('pg:pause')!
      ergebnis[i] = { ref: e.id, h: e.h, rolle: 'bewegung', min: slot.min, t: e.typ === 'schritt' ? e.titel : 'Pause', warum: ['Bewegungspause – hilft beim Dranbleiben'] }
      continue
    }
    if (slot.rolle === 'wahl') {
      const w = wahlSlot(c, slot, o, salz, benutzt)
      if (w) {
        ergebnis[i] = w.schritt
        for (const b of w.optionen) {
          benutzt.add(b.e.id)
          b.e.format.forEach((f) => formate.add(f))
        }
      }
      continue
    }
    // Jugendliche, Phase „Übertragen“: kein neues Thema, sondern die zuletzt geübte Übung in eine kommende Situation
    // übertragen (Blind-Bewertungen 5 und 6: „die Übertragen-Sitzungen bringen neue Themen statt Übertragung“)
    if (slot.rolle === 'kern' && c.alter >= 12 && c.weg !== 'leicht' && o.phase === 'uebertragen') {
      // zuerst Übungen mit einem Ziel des Kindes, die jüngste zuerst (Blind-Bewertung 6: „Gesprächseinstieg liegt außerhalb
      // der Ziele“)
      const ziel = new Set(c.ziele.map((z) => z.code))
      const mitZiel = (r: string) => !!c.k.eintraege.get(r)?.eldib.some((x) => x.gewicht === 1 && ziel.has(x.code))
      const frueher = [...new Set((o.fruehereKerne ?? []).filter((r) => !r.startsWith('pg:')))].reverse()
      const reihe = [...frueher.filter(mitZiel), ...frueher.filter((r) => !mitZiel(r))]
      const schon = (o.fruehereKerne ?? []).filter((r) => r === 'pg:uebertragen').length
      const quelle = reihe[schon % Math.max(1, reihe.length)]
      if (quelle) {
        const sch = uebertragenSchritt(c, slot.min, quelle, (o.fruehereKerne ?? []).indexOf(quelle) + 1)
        ergebnis[i] = sch
        kern = c.k.eintraege.get(sch.ref)
        kernTitel = { de: sch.ueber!.titel, fr: sch.ueber!['fr.titel'] }
        continue
      }
    }
    // Jugendliche, letzte Sitzung einer Folge: kein neues Werkzeug und keine wortgleiche Wiederholung, sondern die Übungen
    // der Folge durchgehen, die hilfreichste wählen und in eine kommende Situation übertragen (Blind-Bewertungen 5 und 6)
    if (slot.rolle === 'kern' && c.alter >= 12 && c.weg !== 'leicht' && o.phase === 'reflektieren' && (o.fruehereKerne ?? []).length >= 2) {
      const sch = folgeTransferSchritt(c, slot.min, o.fruehereKerne!)
      ergebnis[i] = sch
      kern = c.k.eintraege.get(sch.ref)
      continue
    }
    // roter Faden: Einstieg und Reflexion aus derselben Einheit wie der Kern bevorzugt
    const kernQuelle = kern ? quelleEinheit(kern.id) : null
    const bevorzugt = new Set(o.bevorzugt ?? [])
    const liste = kandidaten(c, { rolle: slot.rolle, min: slot.min, phase: o.phase, nr: o.nr, salz: `${salz}|${i}`, gesperrt: benutzt, vorher: o.vorher, formate, vorigerKern: o.kernFormate[o.kernFormate.length - 1], kernFormate: o.kernFormate.slice(-2), fokus: slot.rolle === 'kern' ? undefined : o.fokus, bevorzugt })
    let auswahl = liste
    // roter Faden der Folge: ein Kern, der Ziel-Code oder Thema mit den Kernen davor teilt, zählt mehr
    if (slot.rolle === 'kern' && (o.fruehereKerne ?? []).length) {
      const frueher = (o.fruehereKerne ?? []).map((r) => c.k.eintraege.get(r)).filter((x): x is KatalogEintrag => !!x)
      const codes = new Set(frueher.flatMap((x) => x.eldib.filter((y) => y.gewicht === 1).map((y) => y.code)))
      const themen = new Set(frueher.flatMap((x) => x.thema))
      for (const w of auswahl) {
        const passt = w.b.e.eldib.some((y) => y.gewicht === 1 && codes.has(y.code)) || w.b.e.thema.some((t) => themen.has(t))
        if (passt) w.b = { ...w.b, s: w.b.s + 0.06 }
      }
      auswahl = [...auswahl].sort((x, y) => rang(x.b, y.b, `${salz}|${i}`))
    }
    // Jugendliche: eine Einzelübung für Jugendliche mit Bezug zum Ziel geht immer vor Bruchstücken aus Kurs, Förderfach und
    // Material (Blind-Bewertung 5: „Kärtchen gestalten und laminieren“, „Erst das Selbstbild, dann die Regeln“)
    if (slot.rolle === 'kern' && c.alter >= 12 && c.weg !== 'leicht') {
      const jugend = auswahl.filter((w) => w.b.e.id.startsWith('j:') && w.b.f.ziel >= 0.25)
      if (jugend.length) auswahl = jugend
    }
    if (slot.rolle === 'einstieg' || slot.rolle === 'reflexion') {
      // Einstieg und Abschlussphase einer Material-Einheit führen in deren Hauptteil ein – nur zusammen mit ihm
      auswahl = liste.filter((w) => !w.b.e.id.startsWith('m:') || (kernQuelle !== null && quelleEinheit(w.b.e.id) === kernQuelle))
      // Blind-Bewertung 9.10.: Einstieg, Kern und Blatt behandelten oft drei Themen. Einstieg und Reflexion nur aus der
      // Einheit des Kerns oder mit demselben Hauptziel und Thema; sonst ein eigener Einstieg, der den Kern ankündigt
      if (kern) auswahl = auswahl.filter((w) => kernQuelle === quelleEinheit(w.b.e.id) || gleichesThema(w.b.e, kern!))
      // Jugendliche: Einstiege aus Kurs und Förderfach setzen Vorwissen voraus („Neues Thema: …“, „Notbremse und Lenkung“ mit
      // Skills und Thermometer-Blatt in Sitzung 1) – nur Einzelübungen für Jugendliche oder der eigene Einstieg
      if (c.alter >= 12) auswahl = auswahl.filter((w) => w.b.e.id.startsWith('j:') || (kernQuelle !== null && quelleEinheit(w.b.e.id) === kernQuelle))
      for (const w of auswahl) if (kernQuelle && quelleEinheit(w.b.e.id) === kernQuelle) w.b = { ...w.b, s: w.b.s + 0.25 }
      auswahl.sort((x, y) => rang(x.b, y.b, `${salz}|${i}`))
      // letzte Sitzung einer Folge: ein echter Rückblick auf die Kerne der Folge
      if (slot.rolle === 'reflexion' && o.phase === 'reflektieren' && (o.fruehereKerne ?? []).length >= 2 && c.alter < 12) {
        ergebnis[i] = rueckblickSchritt(c, slot.min, o.fruehereKerne!)
        continue
      }
      if (!auswahl[0] && slot.rolle === 'einstieg' && kern) {
        ergebnis[i] = einstiegSchritt(c, slot.min, kern, o.nr, kernTitel)
        continue
      }
    }
    // Jugendliche: im Bewegungs-Slot echte Bewegung, keine Sitzübung (Blind-Bewertung 6: „Atemquadrat, 5-4-3-2-1 und
    // Punkt im Raum als Bewegung“)
    if (slot.rolle === 'bewegung' && c.alter >= 12) {
      const echt = auswahl.filter((w) => w.b.e.format.includes('bewegung'))
      if (echt.length) auswahl = echt
    }
    // Spiel, Bewegung, Ruhe neben dem Kern: kein fremdes Thema (eine Wut-Übung als Pause in einer Motivations-Stunde)
    if (kern && c.weg !== 'leicht' && (slot.rolle === 'spiel' || slot.rolle === 'bewegung' || slot.rolle === 'regulation')) {
      const ohneFremd = auswahl.filter((w) => !w.b.e.thema.length || w.b.e.ohneZiel || gleichesThema(w.b.e, kern!))
      if (ohneFremd.length) auswahl = ohneFremd
    }
    const w = auswahl[0]
    if (!w) {
      if (slot.rolle === 'kern') hinweise.push(`Hier fehlt Material: kein passender Kern für ${c.ziele[0]?.code ?? 'dieses Kind'} – im Baukasten suchen.`)
      continue
    }
    const rolle: Rolle = slot.rolle as Rolle
    ergebnis[i] = planSchritt(w.b, rolle, slot.min, c, { phase: o.phase, nr: o.nr, lockerText: w.lockerText })
    gewaehlt.push({ b: w.b, slot, i })
    benutzt.add(w.b.e.id)
    w.b.e.format.forEach((f) => formate.add(f))
    if (slot.rolle === 'kern') kern = w.b.e
  }
  // Erkundung (6.6): neben dem Kern, fester Wert aus Seed, Plan und Sitzung
  erkunde(c, o, ergebnis, gewaehlt, benutzt, salz)
  // Blatt (5.5)
  let blatt: Sitzung['blatt'] = null
  // Weg 3 mit Blatt, ohne eigenen Slot (10/15 Min.): die Mitmach-Seite ist eine Option der Wahl (P2, P8)
  const wahlIndex = slots.findIndex((x) => x.rolle === 'wahl')
  if (c.weg === 'leicht' && c.a.blatt === 'mit' && !slots.some((x) => x.rolle === 'uebung') && wahlIndex >= 0 && ergebnis[wahlIndex]) {
    const w = ergebnis[wahlIndex]!
    const erg = baueBlatt(c, { phase: 'leicht', min: w.min, nr: o.nr, salz, gesperrt: benutzt, optional: true })
    if (erg) {
      blatt = { titel: erg.titel, bausteine: erg.teile, ziel: false }
      for (const t of erg.teile) benutzt.add(t.ref)
      const da = (w.wahl ?? []).filter((x) => x.ref === 'pg:da-sein')
      const andere = (w.wahl ?? []).filter((x) => x.ref !== 'pg:da-sein').slice(0, 0)
      const e = c.k.eintraege.get('pg:blatt')!
      w.wahl = [...andere, { ref: e.id, h: e.h, min: w.min, t: `Mitmach-Seite: ${erg.titel}` }, ...da]
      w.warum = [`Das Kind wählt: ${w.t ?? ''}, die Mitmach-Seite oder einfach da sein`, ...(w.warum ?? []).slice(1, 2)]
    } else hinweise.push('Keine passende Mitmach-Seite – ohne Blatt geplant.')
  }
  const blattIndex = slots.findIndex((x) => x.rolle === 'uebung')
  if (blattIndex >= 0 && ergebnis[blattIndex]) {
    const min = ergebnis[blattIndex]!.min
    const auftrag = { phase: o.phase, min, nr: o.nr, salz, gesperrt: benutzt, fokus: o.fokus, kern, optional: c.weg === 'leicht' || min < 6 }
    // Jugendliche: das Blatt zur Übung der Stunde statt Teilen aus Kurs- und Kinderblättern (Blind-Bewertung 5)
    const erg = c.alter >= 12 && c.weg !== 'leicht' && kern ? kernBlatt(c, auftrag) : baueBlatt(c, auftrag)
    if (erg) {
      blatt = { titel: erg.titel, bausteine: erg.teile, ziel: false }
      for (const t of erg.teile) benutzt.add(t.ref)
      hinweise.push(...erg.hinweise)
      const gruende = [...erg.bewertet.values()].flatMap((b) => warum(b, c, { phase: o.phase, nr: o.nr }))
      const top = [...new Set(gruende)].slice(0, 2)
      ergebnis[blattIndex] = { ...ergebnis[blattIndex]!, t: erg.titel, warum: top.length ? top : ['Blatt zum Ziel der Stunde'] }
      if (erg.teile.some((t) => t.ref === BLATT_SYSTEM.kernblatt))
        ergebnis[blattIndex]!.ueber = {
          text: 'Das Blatt zur Übung hinlegen. Der oder die Jugendliche schreibt, die Fachkraft bleibt in der Nähe und hilft, wenn gefragt. Was nicht passt, darf leer bleiben; Persönliches muss nicht aufs Blatt – ein erfundenes Beispiel geht auch.',
          'fr.text': 'Poser la fiche de l’exercice. Le ou la jeune écrit, l’adulte reste à proximité et aide si on le lui demande. Ce qui ne convient pas peut rester vide ; rien de personnel ne doit être écrit – un exemple inventé, ça marche aussi.',
        }
    } else {
      hinweise.push(c.weg === 'leicht' ? 'Keine passende Mitmach-Seite – ohne Blatt geplant.' : 'Kein passendes Blatt – ohne Blatt geplant: zu wenig passende Blatt-Teile für Ziel, Alter, Lesen und Schreiben.')
      // Slot mit einem Spiel oder Gespräch derselben Minuten füllen
      const liste = kandidaten(c, { rolle: 'spiel', min, phase: o.phase, nr: o.nr, salz: `${salz}|ersatz`, gesperrt: benutzt, vorher: o.vorher, formate })
      if (liste[0]) {
        ergebnis[blattIndex] = planSchritt(liste[0].b, 'spiel', min, c, { phase: o.phase, nr: o.nr, lockerText: liste[0].lockerText })
        benutzt.add(liste[0].b.e.id)
      } else ergebnis[blattIndex] = null
    }
  }
  const schritte = ergebnis.filter((x): x is PlanSchritt => !!x)
  // Kern aus einer Material-Einheit ohne deren Einstieg (kurze Stunde): den Einstieg als Hinweis davor (roter Faden)
  const kernSchritt = schritte.find((x) => x.rolle === 'kern')
  if (kernSchritt?.ref.startsWith('m:') && !kernSchritt.hinweis && !schritte.some((x) => x !== kernSchritt && quelleEinheit(x.ref) === quelleEinheit(kernSchritt.ref))) {
    const einheit = quelleEinheit(kernSchritt.ref)
    const einstieg = (c.k.nachRolle.get('einstieg') ?? []).find((e) => quelleEinheit(e.id) === einheit && e.typ === 'schritt' && Number(e.id.split(':')[2] ?? 0) < Number(kernSchritt.ref.split(':')[2] ?? 0))
    // ohne Gruppen-Einführung („Beginnt im Sitzkreis“) und ohne Gefühle abzufragen in Krisenlage
    const em = einstieg ? merkmaleVon(c.k, einstieg) : new Set<string>()
    if (einstieg?.typ === 'schritt' && !em.has('gruppe') && !em.has('ihr') && !em.has('jugend') && !(em.has('gefuehlfrage') && krisenlage(c))) {
      const t = einstieg.text.replace(/\s+/g, ' ').trim()
      kernSchritt.hinweis = `Erst kurz einführen: ${kurz(t, 200)}`
    }
  }
  // Französisch bevorzugt (T-M4): sagen, wie viele Teile es nur auf Deutsch gibt
  if (c.sprache === 'fr') {
    const teile = [...schritte.map((x) => x.ref), ...(blatt?.bausteine ?? []).map((b) => b.ref)]
      .filter((r) => !r.startsWith('pg:'))
      .map((r) => c.k.eintraege.get(r))
      .filter((e): e is KatalogEintrag => !!e)
    const nurDe = teile.filter((e) => (e.typ === 'schritt' ? !e.fr : !e.sprache.fr)).length
    if (nurDe) hinweise.push(`${nurDe} von ${teile.length} Teilen nur auf Deutsch.`)
  }
  // Dünne Daten (T-M5): ohne ELDiB-Ziel sagen, woran sich die Stunde orientiert
  if (c.weg !== 'leicht' && !c.ziele.some((z) => istEldib(z.code))) {
    const feld = c.ziele.find((z) => z.feld && z.quelle !== 'kennenlernen')?.feld
    const thema = (c.a.thema ?? []).filter((t) => !t.startsWith('kompetenz:')).map((t) => themaByKey.get(t)?.name ?? t)
    const schwerpunkt = [...(feld ? [KOMPETENZ_NAME[feld]?.de ?? feld] : []), ...thema].join(', ')
    hinweise.push(schwerpunkt ? `Schwerpunkt: ${schwerpunkt} (noch kein ELDiB-Ziel) – ELDiB-Einschätzung fehlt.` : 'Noch kein ELDiB-Ziel – Stunde zum Kennenlernen. ELDiB-Einschätzung fehlt.')
  }
  if (c.weg !== 'leicht' && blattModus(c) === 'ohne' && c.alter <= 5) hinweise.push('Ohne Blatt (bis 5 Jahre Vorgabe) – Mitmach-Seite auf Wunsch.')
  if (c.weg !== 'leicht' && [c.heute.energie, c.heute.konzentration, c.heute.stimmung].filter((x) => x <= 2).length >= 2) hinweise.push('Heute geht nicht viel? Leichte Stunde zeigen.')
  minutenAusgleichen(schritte, c.a.dauer)
  for (const t of benutzt) o.gesperrt.add(t)
  return { nr: o.nr, phase: o.phase, status: 'geplant', datum: null, schritte, blatt, ...(hinweise.length ? { hinweise: [...new Set(hinweise)] } : {}), rueckmeldung: null }
}

function minutenAusgleichen(schritte: PlanSchritt[], dauer: number): void {
  const summe = schritte.reduce((s, x) => s + x.min, 0)
  const diff = dauer - summe
  if (!diff) return
  const ziel = schritte.find((x) => x.rolle === 'kern') ?? schritte.find((x) => x.rolle === 'uebung') ?? schritte.find((x) => x.rolle === 'spiel') ?? [...schritte].filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss').sort((a, b) => b.min - a.min)[0] ?? schritte[0]
  if (ziel) ziel.min = Math.max(1, ziel.min + diff)
}

/** Weg 3: ein Slot „Wahl“ mit 2–3 echten Optionen (eine kräftige oder ruhige, eine andere, „einfach da sein“) – P8. */
function wahlSlot(c: Kontext, slot: Slot, o: SitzungsAuftrag, salz: string, benutzt: Set<string>): { schritt: PlanSchritt; optionen: Bewertet[] } | null {
  const kraeftig = c.tagesformen.some((t) => t === 'aufgedreht' || t === 'wuetend' || t === 'aufgewuehlt')
  // 1. eine fertige Wahlkarte (neue Inhalte), deren Tagesform und Alter passen
  const karten = intern(c.k)
    .wahlkarten.filter((w) => c.alter >= w.alter.von - 1 && c.alter <= w.alter.bis + 1 && (!c.tagesformen.length || w.tagesform.some((t) => c.tagesformen.includes(t))))
    .filter((w) => !(w.merkmale?.laut && (c.vorsicht.has('reiz') || c.hilft.has('reizarm'))) && !(w.merkmale?.koerperkontakt && c.vorsicht.has('trauma')))
    .map((w) => ({ w, treffer: w.tagesform.filter((t) => c.tagesformen.includes(t)).length, h: hash01(`${salz}|wk|${w.id}`) }))
    .sort((a, b) => b.treffer - a.treffer || a.h - b.h)
  for (const { w } of karten) {
    const opt = w.optionen
      .map((x) => (x.ref ? c.k.eintraege.get(x.ref) : undefined))
      .filter((e): e is KatalogEintrag => !!e && pruefe(e, c, { gesperrt: benutzt, rolle: 'spiel' }) === null)
      .map((e) => bewerte(e, c, { phase: 'leicht' }))
      .sort((a, b) => rang(a, b, `${salz}|wk`))
    if (!opt.length) continue
    const erste = (kraeftig ? opt.find((b) => b.e.energie >= 2) : opt.find((b) => b.e.energie <= 2)) ?? opt[0]
    const zweite = opt.find((b) => b !== erste && (kraeftig ? b.e.energie <= 2 : b.e.format[0] !== erste.e.format[0])) ?? opt.find((b) => b !== erste)
    const optionen = [erste, zweite].filter((x): x is Bewertet => !!x)
    const da = c.k.eintraege.get('pg:da-sein')!
    const schritt = planSchritt(optionen[0], 'spiel', slot.min, c, { phase: 'leicht', nr: o.nr })
    schritt.wahl = [...optionen.slice(1), bewerte(da, c, {})].map((b) => ({ ref: b.e.id, h: b.e.h, min: slot.min, t: b.e.typ === 'schritt' ? b.e.titel : b.e.id }))
    schritt.wahlkarte = w.id
    schritt.warum = [`Das Kind wählt: ${optionen.map((b) => (b.e.typ === 'schritt' ? b.e.titel : '')).join(' oder ')} oder einfach da sein`, ...(schritt.warum ?? []).slice(0, 1)]
    return { schritt, optionen }
  }
  // 2. sonst aus dem Katalog
  const liste = kandidaten(c, { rolle: 'wahl', min: slot.min, phase: 'leicht', nr: o.nr, salz: `${salz}|wahl`, gesperrt: benutzt, vorher: o.vorher, formate: new Set() })
  const erste = (kraeftig ? liste.find((w) => w.b.e.energie >= 2) : liste.find((w) => w.b.e.energie <= 2)) ?? liste[0]
  const zweite = liste.find((w) => w !== erste && w.b.e.format[0] !== erste?.b.e.format[0] && (kraeftig ? w.b.e.energie <= 2 : true)) ?? liste.find((w) => w !== erste)
  const da = c.k.eintraege.get('pg:da-sein')!
  const optionen = [erste, zweite].filter((x): x is Wahl => !!x).map((w) => w.b)
  if (!optionen.length) {
    const b = bewerte(da, c, {})
    return { schritt: { ...planSchritt(b, 'spiel', slot.min, c, { phase: 'leicht', nr: o.nr }), warum: ['Heute zählt, dass das Kind da ist – nichts muss'] }, optionen: [b] }
  }
  const schritt = planSchritt(optionen[0], 'spiel', slot.min, c, { phase: 'leicht', nr: o.nr })
  schritt.wahl = [...optionen.slice(1), bewerte(da, c, {})].map((b) => ({ ref: b.e.id, h: b.e.h, min: slot.min, t: b.e.typ === 'schritt' ? b.e.titel : b.e.id }))
  schritt.warum = [...new Set([`Das Kind wählt: ${optionen.map((b) => (b.e.typ === 'schritt' ? b.e.titel : '')).join(' oder ')} oder einfach da sein`, ...(schritt.warum ?? [])])].slice(0, 2)
  return { schritt, optionen }
}

/** Freie Slots für die Erkundung (6.6): Einstieg, Bewegung, Spiel, Ruhe – außer was zur Einheit des Kerns gehört
 *  (roter Faden). Exportiert für die Tests. */
export function erkundbar(rolle: string, ref: string, kernRef: string | undefined): boolean {
  return ['einstieg', 'bewegung', 'spiel', 'regulation'].includes(rolle) && !ref.startsWith('pg:') && !(kernRef && quelleEinheit(ref) === quelleEinheit(kernRef))
}

function erkunde(c: Kontext, o: SitzungsAuftrag, schritte: (PlanSchritt | null)[], gewaehlt: { b: Bewertet; slot: Slot; i: number }[], benutzt: Set<string>, salz: string): void {
  const rate = c.erkundung
  if (rate <= 0 || c.weg === 'leicht') return
  const kern = gewaehlt.find((g) => g.slot.rolle === 'kern')?.b.e.id
  const frei = gewaehlt.filter((g) => erkundbar(g.slot.rolle, g.b.e.id, kern))
  // jeder freie Slot mit Wahrscheinlichkeit rate (≈ 20 % der freien Slots), fester Wert aus Seed, Plan, Sitzung und Slot
  for (const wahl of frei) {
    if (hash01(`${salz}|erk|${wahl.i}`) >= rate) continue
    const best = wahl.b
    const alle = kandidaten(c, { rolle: wahl.slot.rolle, min: wahl.slot.min, phase: o.phase, nr: o.nr, salz: salz + '|erk-k', gesperrt: benutzt, vorher: o.vorher, formate: new Set() })
      .map((w) => w.b)
      .filter((b) => b.e.id !== best.e.id && b.g >= 0.8 * best.g)
      // Phasen aus Material-Einheiten nur zusammen mit ihrem Kern (roter Faden)
      .filter((b) => !b.e.id.startsWith('m:') || wahl.slot.rolle === 'kern')
      .filter((b) => vorliebe(c.v, 'kind', `baustein:${b.e.id}`, c.datum).p > -0.3 && vorliebe(c.v, 'ich', `baustein:${b.e.id}`, c.datum).p > -0.5)
    // erst ein anderes Format (Neues ausprobieren), sonst ein anderer gleichwertiger Teil
    const anders = alle.filter((b) => b.e.format[0] !== best.e.format[0])
    const liste = anders.length ? anders : alle
    liste.sort((a, b) => vertrauenKind(a.e, c.v, c.datum) - vertrauenKind(b.e, c.v, c.datum) || b.g - a.g || (a.e.id < b.e.id ? -1 : 1))
    const neu = liste[0]
    if (!neu) continue
    benutzt.delete(best.e.id)
    benutzt.add(neu.e.id)
    schritte[wahl.i] = planSchritt(neu, wahl.slot.rolle as Rolle, wahl.slot.min, c, { phase: o.phase, nr: o.nr, erkundung: true })
    wahl.b = neu
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Pläne
// ---------------------------------------------------------------------------------------------------------------------

const FOLGE_TITEL: Record<Kompetenz, string> = {
  impulskontrolle: 'Stopp – Denken – Handeln', selbstregulation: 'Ruhig werden', 'gefuehle-erkennen': 'Gefühle erkennen',
  'gefuehle-ausdruecken': 'Gefühle zeigen und benennen', aufmerksamkeit: 'Bei der Sache bleiben', ausdauer: 'Dranbleiben',
  kooperation: 'Gemeinsam statt allein', konflikte: 'Streit lösen', kommunikation: 'Reden und zuhören', selbstbild: 'Meine Stärken',
  lernstrategien: 'Gut lernen', alltag: 'Den Alltag schaffen',
}

const FOLGE_TITEL_FR: Record<Kompetenz, string> = {
  impulskontrolle: 'Stop – réfléchir – agir', selbstregulation: 'Se calmer', 'gefuehle-erkennen': 'Reconnaître les émotions',
  'gefuehle-ausdruecken': 'Montrer et nommer ses émotions', aufmerksamkeit: 'Rester concentré·e', ausdauer: 'Persévérer',
  kooperation: 'Ensemble plutôt que seul·e', konflikte: 'Résoudre les conflits', kommunikation: 'Parler et écouter', selbstbild: 'Mes forces',
  lernstrategien: 'Bien apprendre', alltag: 'Gérer le quotidien',
}

/** Titel des Plans in der Sprache des Blatts (Planblatt, Mappe): sonst stünde „Einzelstunde: …“ auf einem französischen Blatt */
function planTitel(c: Kontext): string {
  // Gruppe (Aufgabe 151): „Gruppenstunde“ statt „Einzelstunde“
  const gr = (c.a.sozialform ?? 'einzeln') !== 'einzeln'
  const t0 = planTitelEinzeln(c)
  if (!gr) return t0
  return t0.replace(/^Einzelstunde/, 'Gruppenstunde').replace(/^Séance individuelle/, 'Séance en groupe').replace(/^Beziehungszeit$/, 'Zeit zusammen').replace(/^Temps relationnel$/, 'Temps ensemble')
}
function planTitelEinzeln(c: Kontext): string {
  if (c.sprache === 'fr') {
    if (c.weg === 'leicht') return 'Temps relationnel'
    if (c.ziele[0]?.quelle === 'kennenlernen') return c.weg === 'schnell' ? 'Séance individuelle : faire connaissance' : 'Faire connaissance'
    const f = c.ziele.find((z) => z.feld)?.feld
    if (c.weg === 'schnell') return `Séance individuelle : ${f ? (KOMPETENZ_NAME[f]?.fr ?? FOLGE_TITEL_FR[f]) : 'à la carte'}`
    return f ? FOLGE_TITEL_FR[f] : 'Série de séances'
  }
  if (c.weg === 'leicht') return 'Beziehungszeit'
  if (c.ziele[0]?.quelle === 'kennenlernen') return c.weg === 'schnell' ? 'Einzelstunde: Kennenlernen' : 'Kennenlernen'
  const feld = c.ziele.find((z) => z.feld)?.feld
  const thema = [...c.themen.entries()].sort((a, b) => b[1].w - a[1].w)[0]?.[0]
  const t = feld ? FOLGE_TITEL[feld] : thema ? (themaByKey.get(thema)?.name ?? 'Einzelstunde') : 'Kennenlernen'
  if (c.weg === 'schnell') return `Einzelstunde: ${feld ? (KOMPETENZ_NAME[feld]?.de ?? t) : t}`
  return thema && feld ? `${themaByKey.get(thema)?.name.split(' & ')[0] ?? ''}: ${t}`.replace(/^: /, '') : t
}

/** Plan-Id aus Kind und Auftrag (ohne Datum, ohne ref) – derselbe Klick liefert denselben Plan (T-M7). */
export function planId(c: Kontext, variante = 0): string {
  const a = c.a
  const teile = [c.seed, a.weg, a.ziele.join(','), a.n, a.dauer, a.sozialform, (a.schwerpunkt ?? []).join(','), (a.formate ?? []).join(','), a.heute ? `${a.heute.energie}${a.heute.konzentration}${a.heute.stimmung}` : '', c.tagesformen.join(','), a.sprache, a.blatt ?? '', (a.thema ?? []).join(','), variante]
  return 'pl-' + hash8(teile.join('|'))
}

function rituale(c: Kontext, salz: string, ausser = new Set<string>()): { ankommen: Bewertet | null; abschluss: Bewertet | null } {
  const ank = SLOTS[c.weg === 'leicht' ? 'leicht' : 'normal'][c.a.dauer]?.[0]?.[1] ?? 4
  return { ankommen: waehleRitual(c, 'ankommen', ank, salz + '|r-a', ausser), abschluss: waehleRitual(c, 'abschluss', 4, salz + '|r-b', ausser) }
}

function planFolge(c: Kontext, n: number, variante: number, verlauf?: Verlauf): Plan {
  const id = planId(c, variante)
  const bogen = phasen(c, n)
  const gesperrt = new Set<string>()
  const salz = `${c.seed}|${id}|${variante}`
  let rit = rituale(c, salz)
  const vorher = new Set<string>()
  for (const pl of verlauf?.plaene ?? []) for (const s of pl.sitzungen) if (s.status === 'gehalten') for (const x of s.schritte) vorher.add(x.ref)
  const kernFormate: string[] = []
  const sitzungen: Sitzung[] = []
  const zweiZiele = c.ziele.filter((z) => istEldib(z.code)).length >= 2
  bogen.forEach((phase, i) => {
    // Rituale bleiben die ganze Folge gleich, auch bei Jugendlichen (Blind-Bewertung 5: „das Ankommens-Ritual wechselt
    // mitten in der Folge“ – früher S9: alle zwei Sitzungen ein anderes Ankommen)
    // letzte Sitzung: kein Abschluss-Ritual, das auf die nächste Sitzung zählt
    if (i === bogen.length - 1 && bogen.length > 1 && rit.abschluss && folgeRitual(rit.abschluss.e)) {
      const e = c.k.eintraege.get('pg:abschluss')
      if (e) rit = { ...rit, abschluss: bewerte(e, c, {}) }
    }
    const fokus = zweiZiele && i % 2 === 1 ? new Map([[c.ziele[0].code, 0.8], [c.ziele[1].code, 1]]) : undefined
    const s = fuelleSitzung(c, { plan: id, nr: i + 1, phase, rituale: rit, gesperrt, vorher, kernFormate, variante, fokus, fruehereKerne: sitzungen.flatMap((x) => x.schritte.filter((y) => y.rolle === 'kern').map((y) => y.ref)) })
    for (const x of s.schritte) vorher.add(x.ref)
    const k = s.schritte.find((x) => x.rolle === 'kern')
    const ke = k ? c.k.eintraege.get(k.ref) : undefined
    if (ke) kernFormate.push(ke.format[0] ?? '')
    sitzungen.push(s)
  })
  return {
    id,
    erstellt: c.datum,
    weg: c.weg,
    gewichte: 'V1',
    titel: planTitel(c),
    ziele: c.ziele.filter((z) => istEldib(z.code)).map((z) => z.code),
    n: sitzungen.length,
    dauer: c.a.dauer,
    vorlage: null,
    kinder: ['self'],
    auftrag: c.a,
    sitzungen,
    variante,
    katalogStand: c.k.stand,
  }
}

/** Weg 2 mit laufender Folge: die gespeicherte nächste Sitzung, nur an die Tagesform angepasst (T-M7, 5.6). */
function weiterMitFolge(c: Kontext, folge: Plan): Plan {
  const nr = folge.sitzungen.find((s) => s.status !== 'gehalten')?.nr
  if (!nr) return planFolge(c, 1, 0)
  const gespeichert = folge.sitzungen.find((s) => s.nr === nr)!
  const zuletzt = [...folge.sitzungen].reverse().find((s) => s.status === 'gehalten' && s.rueckmeldung)
  const reihe: Bogen[] = ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen', 'reflektieren']
  let phase = gespeichert.phase
  const hinweise: string[] = []
  if (zuletzt?.rueckmeldung && zuletzt.phase !== 'leicht') {
    if (zuletzt.rueckmeldung.ergebnis === 'nicht') {
      phase = reihe[Math.max(0, reihe.indexOf(zuletzt.phase) - 1)]
      hinweise.push(`Sitzung ${nr} angepasst, weil Sitzung ${zuletzt.nr} nicht geklappt hat: eine Stufe zurück. Weniger Text? Im Ergebnis anpassen.`)
    } else if (zuletzt.rueckmeldung.ergebnis === 'teils') {
      phase = zuletzt.phase
      hinweise.push(`Sitzung ${nr}: Phase von Sitzung ${zuletzt.nr} wiederholt, mit anderen Bausteinen.`)
    }
  }
  const neutral = c.heute.energie === 4 && c.heute.konzentration === 4 && c.heute.stimmung === 4
  const dauerGleich = c.a.dauer === folge.dauer
  if (neutral && dauerGleich && phase === gespeichert.phase) return { ...folge, sitzungen: folge.sitzungen.map((s) => ({ ...s })) }
  const gesperrt = new Set<string>()
  for (const s of folge.sitzungen) if (s.nr !== nr) for (const x of s.schritte) if (x.rolle !== 'ankommen' && x.rolle !== 'abschluss') gesperrt.add(x.ref)
  for (const s of folge.sitzungen) if (s.nr !== nr) for (const b of s.blatt?.bausteine ?? []) gesperrt.add(b.ref)
  const behalte = new Set([...gespeichert.schritte.map((x) => x.ref), ...(gespeichert.blatt?.bausteine.map((b) => b.ref) ?? [])])
  const ritAnk = gespeichert.schritte.find((x) => x.rolle === 'ankommen')
  const ritAbs = gespeichert.schritte.find((x) => x.rolle === 'abschluss')
  const alsBewertet = (ref?: string) => {
    const e = ref ? c.k.eintraege.get(ref) : undefined
    return e && pruefe(e, c, { ritual: true }) === null && ritualErlaubt(c, e, e.rolle.includes('ankommen') ? 'ankommen' : 'abschluss') ? bewerte(e, c, {}) : null
  }
  const salz = `${c.seed}|${folge.id}|${folge.variante ?? 0}`
  const rit = { ankommen: alsBewertet(ritAnk?.ref) ?? waehleRitual(c, 'ankommen', 4, salz + '|r-a', new Set()), abschluss: alsBewertet(ritAbs?.ref) ?? waehleRitual(c, 'abschluss', 4, salz + '|r-b', new Set()) }
  const vorher = new Set(folge.sitzungen.filter((s) => s.nr < nr).flatMap((s) => s.schritte.map((x) => x.ref)))
  const neu = fuelleSitzung(c, { plan: folge.id, nr, phase, rituale: rit, gesperrt, vorher, kernFormate: [], variante: folge.variante ?? 0, bevorzugt: behalte })
  if (gespeichert.blatt?.ziel && neu.blatt) neu.blatt.ziel = true
  const geaendert = JSON.stringify(neu.schritte.map((x) => [x.ref, x.min])) !== JSON.stringify(gespeichert.schritte.map((x) => [x.ref, x.min]))
  neu.status = geaendert ? 'angepasst' : gespeichert.status
  if (geaendert) hinweise.push('Angepasst an heute: ' + neu.schritte.filter((x, i) => gespeichert.schritte[i]?.ref !== x.ref || gespeichert.schritte[i]?.min !== x.min).map((x) => `${x.t ?? x.ref} (${x.min} Min.)`).join(', '))
  if (hinweise.length) neu.hinweise = [...(neu.hinweise ?? []), ...hinweise]
  return { ...folge, dauer: c.a.dauer, sitzungen: folge.sitzungen.map((s) => (s.nr === nr ? neu : s)) }
}

export function planen(k: Katalog, p: Profil, a: Auftrag, v: Vorlieben, verlauf: Verlauf): Plan {
  setzeTextModus((a.sozialform ?? 'einzeln') !== 'einzeln')
  const c = kontext(k, p, a, v, verlauf)
  if (a.weg === 'schnell' && p.folge) {
    const folge = verlauf.plaene.find((pl) => pl.id === p.folge!.id)
    if (folge) return weiterMitFolge(c, folge)
  }
  const n = a.weg === 'gruendlich' ? Math.max(1, Math.min(10, a.n || 6)) : 1
  return planFolge(c, n, 0, verlauf)
}

/** Phasen der Folge (Weg 3: „leicht“). */
function phasen(c: Kontext, n: number): (Bogen | 'leicht')[] {
  return c.weg === 'leicht' ? ['leicht'] : bogenFuer(c, n)
}

/** Eine ganze Sitzung neu füllen: gleiche Phase, die bisherigen Teile (außer Ritualen) gesperrt (5.8). */
export function sitzungNeu(k: Katalog, p: Profil, plan: Plan, nr: number, v: Vorlieben): Plan {
  const a = plan.auftrag ?? { weg: plan.weg, ziele: plan.ziele, n: plan.n, dauer: plan.dauer as Auftrag['dauer'], sozialform: 'einzeln', sprache: p.sprache.blatt, datum: plan.erstellt }
  const c = kontext(k, p, a, v)
  const alt = plan.sitzungen.find((s) => s.nr === nr)
  if (!alt) return plan
  const variante = (plan.variante ?? 0) + 1
  const gesperrt = new Set<string>()
  for (const s of plan.sitzungen) {
    for (const x of s.schritte) if (x.rolle !== 'ankommen' && x.rolle !== 'abschluss') gesperrt.add(x.ref)
    for (const b of s.blatt?.bausteine ?? []) if (!b.ref.startsWith('pg:')) gesperrt.add(b.ref)
  }
  const rit = {
    ankommen: (() => {
      const e = c.k.eintraege.get(alt.schritte.find((x) => x.rolle === 'ankommen')?.ref ?? '')
      return e ? bewerte(e, c, {}) : null
    })(),
    abschluss: (() => {
      const e = c.k.eintraege.get(alt.schritte.find((x) => x.rolle === 'abschluss')?.ref ?? '')
      return e ? bewerte(e, c, {}) : null
    })(),
  }
  const vorher = new Set(plan.sitzungen.filter((s) => s.nr < nr).flatMap((s) => s.schritte.map((x) => x.ref)))
  const neu = fuelleSitzung(c, { plan: plan.id, nr, phase: alt.phase, rituale: rit, gesperrt, vorher, kernFormate: [], variante })
  if (alt.blatt?.ziel && neu.blatt) neu.blatt.ziel = true
  neu.status = alt.status === 'gehalten' ? alt.status : 'geplant'
  return { ...plan, variante, sitzungen: plan.sitzungen.map((s) => (s.nr === nr ? neu : s)) }
}

/** Profil für „Ohne Kind planen“ (Toolbox ohne Hub): nur Alter, Sprache, Ziele per Chips. */
export function ohneKindProfil(wahl: { alterJahre: number; sprache: Sprache; ziele: string[] }): Profil {
  const stufe = stufeAusAlter(wahl.alterJahre)
  const lesen = stufe === 'C1' ? 0 : stufe === 'C2' ? (wahl.alterJahre <= 6 ? 0 : 1) : stufe === 'ES' ? 3 : 2
  const schreiben = stufe === 'C1' ? 0 : stufe === 'C2' ? 1 : stufe === 'ES' ? 3 : 2
  const k = aktuellerKatalog()
  return {
    v: 1,
    ref: 'ohne-kind',
    erstellt: new Date().toISOString().slice(0, 19),
    anrede: null,
    alterJahre: wahl.alterJahre,
    stufen: [stufe],
    layout: layoutAusStufe(stufe),
    sprache: { blatt: wahl.sprache, woerter: [] },
    zugang: { lesen: lesen as 0 | 1 | 2 | 3, schreiben: schreiben as 0 | 1 | 2 | 3, bild: stufe === 'C1' ? 3 : stufe === 'C2' ? 2 : 1, tempo: 'normal', struktur: 'normal', quelle: ['alter'] },
    ziele: wahl.ziele.map((code, i) => ({ code, ich: (k && ichSatz(k, code)) || '', quelle: 'andere', prio: i + 1 })),
    erreicht: [],
    themen: [],
    vorsicht: [],
    interessen: [],
    wochenziel: null,
    gemacht: [],
    folge: null,
    vorlieben: null,
    seed: `ohne-kind|${wahl.alterJahre}|${wahl.sprache}`,
    dichte: wahl.ziele.length ? 'mittel' : 'duenn',
    rechte: { speichern: false, rueckmelden: false },
  }
}
