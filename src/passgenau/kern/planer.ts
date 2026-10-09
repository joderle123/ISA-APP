// Passgenau – der Planer (Konzept 5.1–5.10, Kritiken vom 9.10.): Vorlagen je Dauer und Tagesform (eine Slot-Tabelle),
// Folgen mit Bogen, Rituale konstant, Kern mit Ziel, Blatt mit Seiten- und Zeitbudget, Weg 3 nur ohne Ziel mit echter
// Wahl, Erkundung ≈ 20 % reproduzierbar, Lockerungsleiter mit sichtbarem Grund. Deterministisch: gleicher Auftrag,
// gleiches Kind, gleiche Vorlieben → gleicher Plan (Seed aus Kind, Plan-Id, Sitzung, Variante – kein Datum, kein ref).
import type { Auftrag, Bogen, Ereignis, KatalogEintrag, Plan, PlanSchritt, Profil, Rolle, Sitzung, Sprache } from '../typen'
import { hash01, hash8, stufeAusAlter, layoutAusStufe } from './hilfen'
import { aktuellerKatalog, ichSatz, intern, type Katalog } from './katalog'
import { bewerte, kontext, pruefe, rang, warum, type Bewertet, type Kontext } from './regeln'
import { baueBlatt } from './blatt'
import { vertrauenKind, vorliebe, type Vorlieben } from './vorlieben'
import { KOMPETENZ_NAME, themaByKey, type Kompetenz } from './vokabular'

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

const KANDIDAT_ROLLEN: Record<SlotRolle, Rolle[]> = {
  ankommen: ['ankommen'], einstieg: ['einstieg'], kern: ['kern'], uebung: ['kern', 'spiel'], bewegung: ['bewegung'], spiel: ['spiel', 'bewegung'],
  regulation: ['regulation'], reflexion: ['reflexion'], abschluss: ['abschluss'], transfer: ['transfer'], wahl: ['spiel', 'bewegung', 'regulation'], pause: ['bewegung'],
}

function vorlage(c: Kontext): Slot[] {
  const leicht = c.weg === 'leicht'
  const tab = SLOTS[leicht ? 'leicht' : 'normal']
  const d = c.a.dauer
  const basis = tab[d] ?? (leicht ? tab[d <= 10 ? 10 : d <= 20 ? 20 : 30] : tab[30])
  const v: Slot[] = basis.map(([rolle, min]) => ({ rolle, min }))
  if (leicht) return v
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
  if (h.energie >= 6) {
    const b = idx('bewegung')
    if (b >= 0) v.splice(1, 0, v.splice(b, 1)[0])
    else {
      const n = nimm('kern', 2, 6) + nimm('einstieg', 1) + (idx('einstieg') < 0 ? nimm('uebung', 1) : 0)
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
    if (i >= 0 && v[i].min > 8) {
      const rest = v[i].min - 8
      v[i].min = 8
      if (rest >= 2) v.splice(i + 1, 0, { rolle: h.energie >= 4 ? 'bewegung' : 'regulation', min: rest })
      else v[i].min += rest
    }
  } else if (h.konzentration >= 6) {
    const n = nimm('einstieg', 2)
    const k = v.find((x) => x.rolle === 'kern')
    if (k) k.min += n
  }
  if (h.stimmung <= 2) {
    const n = nimm('kern', 2, 6)
    const a = v.find((x) => x.rolle === 'ankommen')
    if (a) a.min += n
    for (const s of v) if (s.rolle === 'einstieg') s.rolle = 'spiel'
  }
  // Bewegungspausen (P11): nach jedem Block über 8 Minuten 2 Minuten Pause
  if (c.hilft.has('bewegungspausen'))
    for (let i = v.length - 1; i >= 0; i--)
      if (v[i].min > 8 && (v[i].rolle === 'kern' || v[i].rolle === 'uebung' || v[i].rolle === 'spiel')) {
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
const NIE_KANDIDAT = new Set(['pg:blatt', 'pg:pause', 'pg:da-sein', 'pg:ankommen', 'pg:abschluss', 'pg:ankommen-still', 'pg:abschluss-still'])

function dauerPasst(e: KatalogEintrag, min: number, locker: number): boolean {
  const t = locker >= 1 ? 3 : 1
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
      if (s.rolle === 'kern' && s.kernFormate?.length === 2 && s.kernFormate[0] === s.kernFormate[1] && e.format[0] === s.kernFormate[0]) continue
      if (s.rolle === 'bewegung' && c.heute.energie >= 6 && e.energie < 2) continue
      const b = bewerte(e, c, { phase: s.phase, formate: s.formate, vorigerKern: s.vorigerKern, fokus: s.fokus, locker, bonus: s.bevorzugt?.has(e.id) ? 1 : 0 })
      if (phaseSlot && locker < 1 && e.bogen && s.phase !== 'leicht' && b.f.phase < 0.3) continue
      if (zielSlot && !(b.f.ziel >= (locker >= 2 ? 0.15 : 0.25) || b.f.thema > 0)) continue
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
  if (locker === 4 && e.typ === 'schritt' && e.einzeltauglich === 'angepasst') return 'Gruppenaktivität – so mit einem Kind machen'
  return undefined
}

// ---------------------------------------------------------------------------------------------------------------------
// Rituale (5.6): einmal je Folge, Vorlieben des Kindes zuerst; Weg 3: nur, was nichts verlangt (P8)
// ---------------------------------------------------------------------------------------------------------------------

function ritualErlaubt(c: Kontext, e: KatalogEintrag, rolle: 'ankommen' | 'abschluss'): boolean {
  if (e.typ !== 'schritt') return false
  const anspruch = e.anspruch ?? 1
  if (c.weg === 'leicht') {
    const still = c.tagesformen.some((t) => ['traurig', 'aengstlich', 'rueckzug', 'will-nicht', 'aufgewuehlt'].includes(t))
    if (rolle === 'ankommen' && anspruch > (still ? 0 : 1)) return false
    if (rolle === 'abschluss' && anspruch > 1) return false
  }
  if (c.heute.stimmung <= 2 && anspruch > 1) return false
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
    const b = bewerte(e, c, { phase: c.weg === 'leicht' ? 'leicht' : undefined, bonus: (e.id === gewuenscht ? 0.6 : 0) + (e.einzeltauglich === 'ja' ? 0.05 : 0) + (e.typ === 'schritt' && e.quelle.art === 'ritual' ? 0.1 : 0) - (e.dauer.typ > min * 2 ? 0.08 : 0) })
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
}

function planSchritt(b: Bewertet, rolle: Rolle, min: number, c: Kontext, o: { phase: Bogen | 'leicht'; nr: number; ritual?: boolean; erkundung?: boolean; lockerText?: string }): PlanSchritt {
  const e = b.e
  const t = e.typ === 'schritt' ? e.titel : e.id
  const s: PlanSchritt = { ref: e.id, h: e.h, rolle, min, t: t.length > 60 ? t.slice(0, 59) + '…' : t, warum: warum(b, c, { phase: o.phase, nr: o.nr, ritual: o.ritual, erkundung: o.erkundung, locker: o.lockerText, rolle }) }
  if (o.erkundung) s.erkundung = true
  if (o.lockerText) s.hinweis = o.lockerText
  else if (e.typ === 'schritt' && e.einzeltauglich === 'angepasst' && !e.einzelvariante) s.hinweis = 'Gruppenaktivität – so mit einem Kind machen'
  return s
}

/** Quelle eines Schritts als Einheit (gleiche Material-Einheit, Kurs-Einheit, Themenwoche) – für den roten Faden. */
export function quelleEinheit(id: string): string {
  const t = id.split(':')
  return t.length >= 3 ? `${t[0]}:${t[1]}` : id
}

export function fuelleSitzung(c: Kontext, o: SitzungsAuftrag): Sitzung {
  const salz = `${c.seed}|${o.plan}|${o.nr}|${o.variante}`
  const slots = vorlage(c)
  const formate = new Set<string>()
  const benutzt = new Set<string>(o.gesperrt)
  const hinweise: string[] = []
  const ergebnis: (PlanSchritt | null)[] = slots.map(() => null)
  const gewaehlt: { b: Bewertet; slot: Slot; i: number }[] = []
  let kern: KatalogEintrag | undefined
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
    // roter Faden: Einstieg und Reflexion aus derselben Einheit wie der Kern bevorzugt
    const kernQuelle = kern ? quelleEinheit(kern.id) : null
    const bevorzugt = new Set(o.bevorzugt ?? [])
    const liste = kandidaten(c, { rolle: slot.rolle, min: slot.min, phase: o.phase, nr: o.nr, salz: `${salz}|${i}`, gesperrt: benutzt, vorher: o.vorher, formate, vorigerKern: o.kernFormate[o.kernFormate.length - 1], kernFormate: o.kernFormate.slice(-2), fokus: slot.rolle === 'kern' ? undefined : o.fokus, bevorzugt })
    let auswahl = liste
    if (slot.rolle === 'einstieg' || slot.rolle === 'reflexion') {
      // Einstieg und Abschlussphase einer Material-Einheit führen in deren Hauptteil ein – nur zusammen mit ihm
      auswahl = liste.filter((w) => !w.b.e.id.startsWith('m:') || (kernQuelle !== null && quelleEinheit(w.b.e.id) === kernQuelle))
      for (const w of auswahl) if (kernQuelle && quelleEinheit(w.b.e.id) === kernQuelle) w.b = { ...w.b, s: w.b.s + 0.25 }
      auswahl.sort((x, y) => rang(x.b, y.b, `${salz}|${i}`))
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
  const blattIndex = slots.findIndex((x) => x.rolle === 'uebung')
  if (blattIndex >= 0 && ergebnis[blattIndex]) {
    const min = ergebnis[blattIndex]!.min
    const erg = baueBlatt(c, { phase: o.phase, min, nr: o.nr, salz, gesperrt: benutzt, fokus: o.fokus, kern })
    if (erg) {
      blatt = { titel: erg.titel, bausteine: erg.teile, ziel: false }
      for (const t of erg.teile) benutzt.add(t.ref)
      const gruende = [...erg.bewertet.values()].flatMap((b) => warum(b, c, { phase: o.phase, nr: o.nr }))
      const top = [...new Set(gruende)].slice(0, 2)
      ergebnis[blattIndex] = { ...ergebnis[blattIndex]!, t: erg.titel, warum: top.length ? top : ['Blatt zum Ziel der Stunde'] }
    } else {
      hinweise.push('Heute ohne Blatt: Es gibt zu wenig passende Blatt-Teile (Alter, Lesen, Schreiben).')
      // Slot mit einem Spiel oder Gespräch derselben Minuten füllen
      const liste = kandidaten(c, { rolle: 'spiel', min, phase: o.phase, nr: o.nr, salz: `${salz}|ersatz`, gesperrt: benutzt, vorher: o.vorher, formate })
      if (liste[0]) {
        ergebnis[blattIndex] = planSchritt(liste[0].b, 'spiel', min, c, { phase: o.phase, nr: o.nr, lockerText: liste[0].lockerText })
        benutzt.add(liste[0].b.e.id)
      } else ergebnis[blattIndex] = null
    }
  }
  const schritte = ergebnis.filter((x): x is PlanSchritt => !!x)
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

function erkunde(c: Kontext, o: SitzungsAuftrag, schritte: (PlanSchritt | null)[], gewaehlt: { b: Bewertet; slot: Slot; i: number }[], benutzt: Set<string>, salz: string): void {
  const rate = c.erkundung
  if (rate <= 0 || c.weg === 'leicht') return
  const frei = gewaehlt.filter((g) => ['einstieg', 'bewegung', 'spiel', 'regulation'].includes(g.slot.rolle))
  if (!frei.length || hash01(salz + '|erk') >= Math.min(1, rate * (frei.length + 1))) return
  const wahl = frei[Math.floor(hash01(salz + '|erk-slot') * frei.length)]
  const best = wahl.b
  const liste = kandidaten(c, { rolle: wahl.slot.rolle, min: wahl.slot.min, phase: o.phase, nr: o.nr, salz: salz + '|erk-k', gesperrt: benutzt, vorher: o.vorher, formate: new Set() })
    .map((w) => w.b)
    .filter((b) => b.e.id !== best.e.id && b.g >= 0.85 * best.g && b.e.format[0] !== best.e.format[0])
    .filter((b) => vorliebe(c.v, 'kind', `baustein:${b.e.id}`, c.datum).p > -0.3 && vorliebe(c.v, 'ich', `baustein:${b.e.id}`, c.datum).p > -0.5)
  liste.sort((a, b) => vertrauenKind(a.e, c.v, c.datum) - vertrauenKind(b.e, c.v, c.datum) || b.g - a.g || (a.e.id < b.e.id ? -1 : 1))
  const neu = liste[0]
  if (!neu) return
  benutzt.delete(best.e.id)
  benutzt.add(neu.e.id)
  schritte[wahl.i] = planSchritt(neu, wahl.slot.rolle as Rolle, wahl.slot.min, c, { phase: o.phase, nr: o.nr, erkundung: true })
  wahl.b = neu
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

function planTitel(c: Kontext): string {
  if (c.weg === 'leicht') return 'Beziehungszeit'
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
  const zweiZiele = c.ziele.filter((z) => z.code.includes('-')).length >= 2
  bogen.forEach((phase, i) => {
    // Jugendliche: alle zwei Sitzungen ein anderes Ankommen, Abschluss gleich (S9)
    if (c.alter >= 12 && i > 0 && i % 2 === 0 && rit.ankommen) {
      const neu = waehleRitual(c, 'ankommen', 4, `${salz}|r-a${i}`, new Set([rit.ankommen.e.id]))
      if (neu) rit = { ...rit, ankommen: neu }
    }
    const fokus = zweiZiele && i % 2 === 1 ? new Map([[c.ziele[0].code, 0.8], [c.ziele[1].code, 1]]) : undefined
    const s = fuelleSitzung(c, { plan: id, nr: i + 1, phase, rituale: rit, gesperrt, vorher, kernFormate, variante, fokus })
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
    ziele: c.ziele.filter((z) => z.code.includes('-')).map((z) => z.code),
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
