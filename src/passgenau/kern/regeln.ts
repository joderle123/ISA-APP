// Passgenau – Kontext, harte Regeln (5.2), Bewertung (5.3) und Begründungen (5.9). Deterministisch.
// Nach den Kritiken vom 9.10.: Zugang streng (P4), Fachkraft-Material nie fürs Kind (P1), Reiz/Trauma-Merkmale (P9),
// keine Katharsis (E-M16), heikel nur freigeschaltet (T-M1), Französisch als weicher Faktor (T-M4), Lockerungsleiter (T-M3).
import type { Auftrag, Bogen, Heute, KatalogEintrag, Layout, Plan, Profil, Rolle, Sprache, Stufe, Tagesform, Weg } from '../typen'
import { hash01, layoutAusStufe, norm, stufeAusAlter, stufenAbstand, tageZwischen, istEldib } from './hilfen'
import { intern, eldibKurz, eldibStufe, type Katalog } from './katalog'
import { kaltstart, V, vorliebe, type Vorlieben } from './vorlieben'
import { FORMAT_NAME, INTERESSEN, KOMPETENZ_NAME, TAGESFORM_FORMATE, TAGESFORM_NAME, kompetenzAusCode, themaByKey, type Kompetenz } from './vokabular'

/** Gewichte der Bewertung (5.3) – Version V1; eine Änderung bekommt eine neue Version. */
export const GEWICHTE_V1: Record<string, number> = {
  ziel: 0.35,
  phase: 0.15,
  zugang: 0.15,
  thema: 0.12,
  tagesform: 0.1,
  abwechslung: 0.05,
  qualitaet: 0.05,
  interesse: 0.03,
}

/** Weg 3: das Ziel entfällt, das Gewicht geht an die Tagesform (5.7). */
export const GEWICHTE_LEICHT: Record<string, number> = {
  ziel: 0,
  phase: 0,
  zugang: 0.15,
  thema: 0.02,
  tagesform: 0.45,
  abwechslung: 0.15,
  qualitaet: 0.08,
  interesse: 0.15,
}

export interface ZielKontext {
  code: string
  prio: number
  quelle?: string
  seit?: string
  ich?: string
  /** Kompetenzfeld des Ziels (bei 'kompetenz:<feld>' das Feld selbst) */
  feld: Kompetenz | null
}

export interface Kontext {
  k: Katalog
  p: Profil
  a: Auftrag
  v: Vorlieben
  weg: Weg
  alter: number
  stufe: Stufe
  layout: Layout
  sprache: Sprache
  heute: Heute
  datum: string
  ziele: ZielKontext[]
  themen: Map<string, { w: number; art?: string; datum?: string; gewaehlt?: boolean }>
  /** Id → Tage seit „gemacht“ (Blätter als 'blatt:<id>', Schritte mit ihrer Id) */
  gemacht: Map<string, number>
  vorsicht: Set<string>
  hilft: Set<string>
  heikelFrei: Set<string>
  tagesformen: Tagesform[]
  prior: Record<string, [number, number]>
  ohneKind: boolean
  seed: string
  erkundung: number
  /** Gründe mit Datum dürfen nur am Bildschirm stehen (nie im Druck) – die Texte selbst enthalten keine Werte */
  zugangText: string | null
}

const PRIO = [1, 0.8, 0.6, 0.5, 0.4]

export function kontext(k: Katalog, p: Profil, a: Auftrag, v: Vorlieben, verlauf?: { plaene: Plan[] }): Kontext {
  const alter = p.alterJahre
  const ausAlter = stufeAusAlter(alter)
  // Stufe: aus dem Profil, aber liegt sie ≥ 2 Stufen vom Alter weg, zählt das Alter (kein Spielschulblatt für 13-Jährige)
  let stufe: Stufe = p.stufen[0] ?? ausAlter
  if (stufenAbstand(ausAlter, [stufe]) >= 2) stufe = ausAlter
  let layout: Layout = p.layout ?? layoutAusStufe(stufe)
  if (alter >= 12 && (layout === 'bild' || layout === 'gross')) layout = 'jugend'
  const datum = (a.datum || new Date().toISOString()).slice(0, 10)
  // Ziele in Reihenfolge des Auftrags; 'kompetenz:<feld>' bei dünnen Daten (T-M5)
  const codes = a.ziele.length ? a.ziele : a.weg === 'leicht' ? [] : p.ziele.slice().sort((x, y) => x.prio - y.prio).map((z) => z.code)
  const ziele: ZielKontext[] = codes.slice(0, 5).map((code, i) => {
    const pz = p.ziele.find((z) => z.code === code)
    const feld = code.startsWith('kompetenz:') ? (code.slice(10) as Kompetenz) : null
    return { code, prio: PRIO[i] ?? 0.4, quelle: pz?.quelle, seit: pz?.seit, ich: pz?.ich, feld: feld ?? (istEldib(code) ? kompetenzVonCode(code) : null) }
  })
  for (const t of a.thema ?? []) if (t.startsWith('kompetenz:') && !ziele.some((z) => z.code === t)) ziele.push({ code: t, prio: ziele.length ? 0.6 : 1, feld: t.slice(10) as Kompetenz })
  const themen = new Map<string, { w: number; art?: string; datum?: string; gewaehlt?: boolean }>()
  for (const t of p.themen) {
    const tage = tageZwischen(t.datum, datum)
    if (tage < 0 || tage > 60) continue
    const w = tage <= 14 ? 1 : tage <= 30 ? 0.7 : 0.4
    const alt = themen.get(t.key)
    if (!alt || alt.w < w || (alt.w === w && (alt.datum ?? '') < t.datum)) themen.set(t.key, { w, art: t.art, datum: t.datum })
  }
  for (const t of a.thema ?? []) if (!t.startsWith('kompetenz:')) themen.set(t, { w: 1.2, gewaehlt: true })
  // Ganz ohne Ziel und Thema (dünne Daten, keine Wahl): Stunde zum Kennenlernen – Stärken und Vorlieben (T-M5)
  if (!ziele.length && !themen.size && a.weg !== 'leicht') ziele.push({ code: 'kompetenz:selbstbild', prio: 0.6, quelle: 'kennenlernen', feld: 'selbstbild' })
  const gemacht = new Map<string, number>()
  const merke = (id: string, am: string) => {
    const d = tageZwischen(am, datum)
    if (d >= 0 && (!gemacht.has(id) || gemacht.get(id)! > d)) gemacht.set(id, d)
  }
  for (const g of p.gemacht) merke(g.id, g.am)
  for (const plan of verlauf?.plaene ?? [])
    for (const s of plan.sitzungen) {
      if (s.status !== 'gehalten' || !(s.datum || s.rueckmeldung?.am)) continue
      const am = (s.datum || s.rueckmeldung!.am).slice(0, 10)
      for (const x of s.schritte) merke(x.ref, am)
      for (const b of s.blatt?.bausteine ?? []) merke(b.ref, am)
    }
  const heute = a.heute ?? { energie: 4, konzentration: 4, stimmung: 4 }
  const tagesformen = (a.tagesformen?.length ? a.tagesformen : a.tagesform ? [a.tagesform] : []).slice(0, 2)
  const seed = p.seed ?? hash01Seed(p)
  const zq = p.zugang.quelle.find((x) => x.startsWith('test:'))
  return {
    k, p, a, v, weg: a.weg, alter, stufe, layout, sprache: a.sprache ?? p.sprache.blatt, heute, datum, ziele, themen, gemacht,
    vorsicht: new Set(p.vorsicht), hilft: new Set(p.hilft ?? []), heikelFrei: new Set(a.heikel ?? []), tagesformen,
    prior: kaltstart(p), ohneKind: p.lernen === false || !v.kind, seed, erkundung: v.ich.erkundung ?? 0.2,
    zugangText: zq ? zugangBeschreibung(p) : null,
  }
}

function hash01Seed(p: Profil): string {
  // ohne Hub-Seed: aus abgeleiteten Merkmalen (stabil über Sitzungen, ohne ref und Datum – T-M7)
  return `${p.alterJahre}|${p.sprache.blatt}|${p.ziele.map((z) => z.code).join(',')}|${p.interessen.join(',')}`
}

function kompetenzVonCode(code: string): Kompetenz | null {
  return istEldib(code) ? kompetenzAusCode(code) : null
}

function zugangBeschreibung(p: Profil): string {
  const l = ['kaum Text', 'wenig Text', 'mittlere Textmenge', 'viel Text'][p.zugang.lesen]
  const b = p.zugang.bild >= 2 ? ', viele Bilder' : ''
  return `${l}${b}`
}

// ---------------------------------------------------------------------------------------------------------------------
// Harte Regeln (5.2)
// ---------------------------------------------------------------------------------------------------------------------

/** Material, das nicht jede Einrichtung hat – nur in Weg 1 (5.2, P S11). */
const NICHT_STANDARD = new Set(['beamer', 'ipad', 'matten', 'schwungtuch', 'kueche', 'lochzange', 'wolle', 'klangschale'])

export interface Pruefung {
  /** 0 streng · 1 Nachbarphase · 2 Ziel ±2 · 3 Sperrfrist halbiert · 4 Gruppenschritt mit Hinweis (T-M3) */
  locker?: number
  /** Ids, die in dieser Folge schon vorkommen (Alternativen, Tausch) */
  gesperrt?: Set<string>
  /** Prüfung für das Blatt des Kindes */
  blatt?: boolean
  /** Ritual (Sperrfrist gilt nicht) */
  ritual?: boolean
  /** Rolle des Slots (mehrtägig nur Transfer) */
  rolle?: Rolle
  /** Ids der Schritte, die vorher in der Folge vorkamen (Voraussetzungen) */
  vorher?: Set<string>
}

/** Ist ein Eintrag für dieses Kind und diesen Auftrag erlaubt? null = ja, sonst der Grund. */
export function pruefe(e: KatalogEintrag, c: Kontext, o: Pruefung = {}): string | null {
  const locker = o.locker ?? 0
  // Alter und Gestaltung – nie gelockert
  if (stufenAbstand(c.stufe, e.stufen) >= 2) return 'Stufe'
  if (c.alter < e.alter.von - 1 || c.alter > e.alter.bis + 1) return 'Alter'
  if (c.alter >= 12 && e.stufen.every((s) => s === 'C1' || s === 'C2')) return 'für Jüngere'
  if (e.typ === 'baustein') {
    if (e.zielgruppe === 'fachkraft' || e.zielgruppe === 'eltern') return 'für Erwachsene'
    if (e.material.includes('film')) return 'braucht einen Film'
    if (c.alter >= 12 && e.art.includes('rueckblick')) return 'Smileys'
  }
  // heikel nur freigeschaltet; Selbstverletzung/Suizid nie als Baustein (T-M1)
  if (e.sensibel === 'akut') return 'heikel'
  if (e.sensibel === 'kinderschutz' && !c.heikelFrei.has('kinderschutz') && !c.heikelFrei.has('sexualitaet')) return 'heikel'
  if (e.sensibel === 'familie' && (c.vorsicht.has('familie') || c.vorsicht.has('trauer'))) return 'Vorsicht Familie'
  if (e.sensibel === 'koerper' && (c.vorsicht.has('koerper') || c.vorsicht.has('trauma'))) return 'Vorsicht Körper'
  // Vorsicht (3.3, P9, E-M2)
  if (c.vorsicht.has('familie') && e.belastung >= 2 && e.thema.includes('familie')) return 'Vorsicht Familie'
  if (c.vorsicht.has('trauer') && e.belastung >= 2 && (e.thema.includes('familie') || e.thema.includes('traurig'))) return 'Vorsicht Trauer'
  if (c.vorsicht.has('heikel') && e.belastung >= 1) return 'Vorsicht'
  const m = e.merkmale
  if (m?.katharsis) return 'Katharsis'
  if ((c.vorsicht.has('reiz') || c.hilft.has('reizarm')) && (m?.laut || (e.typ === 'schritt' && e.reiz >= 2))) return 'zu laut'
  if (c.vorsicht.has('reiz') && m?.wettbewerb) return 'Wettbewerb'
  if (c.vorsicht.has('trauma') && (m?.gewaltbezug || m?.koerperkontakt || e.belastung >= 2)) return 'Vorsicht Trauma'
  // Tagesform (5.2, P9)
  if (c.heute.stimmung <= 2 && (e.belastung >= 2 || m?.wettbewerb)) return 'Stimmung'
  if (c.heute.energie <= 2 && e.energie === 3 && e.dauer.min > 3) return 'Energie'
  if (c.weg === 'leicht') {
    if (!e.ohneZiel) return 'mit Förderziel'
    if (m?.wettbewerb && c.tagesformen.some((t) => t === 'wuetend' || t === 'aufgewuehlt' || t === 'aufgedreht' || t === 'aengstlich')) return 'Wettbewerb'
    if (e.format[0] === 'gespraech' && c.tagesformen.some((t) => t === 'traurig' || t === 'rueckzug')) return 'kein Gespräch'
  }
  // Sozialform (Einzelstunde)
  if (c.a.sozialform === 'einzeln' || !c.a.sozialform) {
    if (e.einzeltauglich === 'nein') return 'nur Gruppe'
    if (e.einzeltauglich === 'angepasst' && !(e.typ === 'schritt' && e.einzelvariante) && (locker < 4 || c.weg === 'leicht')) return 'Gruppe (ohne Einzelvariante)'
  }
  // Zugang (P4): Lesemenge ≤ Kind (vorlesbar: + 1), Schreibmenge ≤ Kind
  if (e.typ === 'baustein') {
    const lesen = c.p.zugang.lesen + (intern(c.k).vorlesbar.has(e.id) ? 1 : 0)
    if (e.lesemenge > lesen) return 'zu viel Text'
    if (e.schreibmenge > c.p.zugang.schreiben) return 'zu viel Schreiben'
    if (c.p.zugang.tempo === 'ruhig' && e.dauer.min > 12) return 'zu lang'
  }
  // mehrtägig nur als Transfer (P1)
  if (e.mehrtaegig && o.rolle && o.rolle !== 'transfer' && !o.blatt) return 'mehrtägig'
  // Voraussetzungen
  const vo = e.typ === 'schritt' ? e.voraussetzungen : undefined
  if (vo?.eldib?.some((x) => !c.p.erreicht.includes(x) && !c.ziele.some((z) => z.code === x))) return 'Voraussetzung'
  if (vo?.schritt?.length && !vo.schritt.some((x) => o.vorher?.has(x))) return 'Brücke ohne letzte Stunde'
  // Ort und Material
  if (e.typ === 'schritt' && e.ort && e.ort !== 'raum' && !(c.a.ort ?? []).includes(e.ort)) return 'Ort'
  if (c.weg !== 'gruendlich' && e.material.some((x) => NICHT_STANDARD.has(x))) return 'Material'
  // schon gemacht / schon in der Folge
  if (o.gesperrt?.has(e.id)) return 'schon in der Folge'
  if (!o.ritual) {
    const f = locker >= 3 ? 0.5 : 1
    const tage = gemachtVor(e, c)
    if (tage !== null) {
      const frist = e.ohneZiel ? 7 : e.typ === 'baustein' ? 42 : e.id.startsWith('c:') ? 14 : 28
      if (tage < frist * f) return 'schon gemacht'
    }
  }
  return null
}

export function gemachtVor(e: KatalogEintrag, c: Kontext): number | null {
  const ids = e.typ === 'baustein' ? [`blatt:${e.quelle.blatt}`, e.id] : e.id.startsWith('m:') ? [e.id, `material:${e.id.split(':')[1]}`] : e.id.startsWith('c:') ? [e.id, `crew:${e.id.slice(2)}`] : [e.id]
  let best: number | null = null
  for (const id of ids) {
    const t = c.gemacht.get(id)
    if (t !== undefined && (best === null || t < best)) best = t
  }
  return best
}

// ---------------------------------------------------------------------------------------------------------------------
// Bewertung (5.3)
// ---------------------------------------------------------------------------------------------------------------------

export const NACHBAR: Record<Bogen, Bogen[]> = {
  wahrnehmen: ['verstehen'],
  verstehen: ['wahrnehmen', 'ueben'],
  ueben: ['verstehen', 'uebertragen'],
  uebertragen: ['ueben', 'reflektieren'],
  reflektieren: ['uebertragen'],
}

export interface Bewertet {
  e: KatalogEintrag
  f: Record<string, number>
  g: number
  vorliebe: number
  s: number
  /** Ziel, das den Zielwert trägt */
  ziel?: ZielKontext
  zielArt?: 'primaer' | 'sekundaer' | 'bereich' | 'feld'
}

export interface BewertungsOpt {
  phase?: Bogen | 'leicht'
  /** Formate, die in der Stunde schon vorkommen */
  formate?: Set<string>
  /** Format des Kerns der vorigen Sitzung */
  vorigerKern?: string
  /** Ziel-Prioritäten für diesen Slot (Fokus der Sitzung) */
  fokus?: Map<string, number>
  locker?: number
  /** Zusatz (Kohärenz Kern ↔ Blatt) */
  bonus?: number
}

const interessenCache = new WeakMap<KatalogEintrag, Set<string>>()
function interessenVon(e: KatalogEintrag): Set<string> {
  let s = interessenCache.get(e)
  if (s) return s
  s = new Set()
  if (e.typ === 'schritt') {
    const t = norm(`${e.titel} ${e.text}`)
    for (const [k, i] of Object.entries(INTERESSEN)) if (i.woerter.some((w) => t.includes(w))) s.add(k)
  }
  interessenCache.set(e, s)
  return s
}

function zielWert(e: KatalogEintrag, c: Kontext, o: BewertungsOpt): { w: number; ziel?: ZielKontext; art?: Bewertet['zielArt'] } {
  let best = { w: 0 } as { w: number; ziel?: ZielKontext; art?: Bewertet['zielArt'] }
  const weit = (o.locker ?? 0) >= 2
  for (const z of c.ziele) {
    const pr = o.fokus?.get(z.code) ?? z.prio
    if (z.code.startsWith('kompetenz:')) {
      if (z.feld && e.kompetenz.includes(z.feld) && 0.7 * pr > best.w) best = { w: 0.7 * pr, ziel: z, art: 'feld' }
      continue
    }
    const [d] = z.code.split('-')
    const sZ = eldibStufe(c.k, z.code)
    for (const eb of e.eldib) {
      if (eb.code === z.code) {
        const w = (eb.gewicht === 1 ? 1 : 0.5) * pr
        if (w > best.w) best = { w, ziel: z, art: eb.gewicht === 1 ? 'primaer' : 'sekundaer' }
      } else if (eb.code.split('-')[0] === d) {
        const ds = Math.abs(eldibStufe(c.k, eb.code) - sZ)
        const w = (ds <= 1 ? 0.25 : weit && ds <= 2 ? 0.15 : 0) * pr
        if (w > best.w) best = { w, ziel: z, art: 'bereich' }
      }
    }
    if (z.feld && e.kompetenz.includes(z.feld) && 0.2 * pr > best.w) best = { w: 0.2 * pr, ziel: z, art: 'feld' }
  }
  return best
}

function themaWert(e: KatalogEintrag, c: Kontext): number {
  let w = 0
  for (const t of e.thema) w = Math.max(w, Math.min(1, c.themen.get(t)?.w ?? 0))
  return w
}

function tagesformWert(e: KatalogEintrag, c: Kontext): number {
  if (c.weg === 'leicht') {
    const tf = c.tagesformen
    if (!tf.length) return e.energie <= 2 ? 0.8 : 0.6
    let w = 0.3
    const eigen = e.typ === 'schritt' ? (e.tagesform ?? []) : []
    if (tf.some((t) => eigen.includes(t))) w = 1
    else if (tf.some((t) => e.format.some((f) => TAGESFORM_FORMATE[t]?.includes(f)))) w = 0.8
    if (tf.some((t) => t === 'aufgedreht' || t === 'wuetend' || t === 'aufgewuehlt') && e.energie === 3) w = Math.min(1, w + 0.2)
    if (tf.some((t) => t === 'muede' || t === 'traurig' || t === 'rueckzug') && e.energie === 3) w -= 0.3
    return Math.max(0, w)
  }
  const h = c.heute
  let w = 1
  if (h.energie >= 6) w = 1 - Math.abs(3 - e.energie) / 3
  else if (h.energie <= 2) w = 1 - Math.abs(1 - e.energie) / 2.5
  else if (e.energie === 3) w = 0.8
  if (h.konzentration <= 3 && e.dauer.typ > 8) w *= 0.5
  if (h.konzentration >= 6 && e.dauer.typ >= 10) w = Math.min(1, w + 0.1)
  if (h.stimmung <= 2) {
    if (e.belastung >= 1) w *= 0.6
    if (e.format.includes('spiel')) w = Math.min(1, w + 0.25)
  }
  return Math.max(0, w)
}

function zugangWert(e: KatalogEintrag, c: Kontext): number {
  if (e.typ !== 'baustein') return 1
  const z = c.p.zugang
  return Math.max(0, 1 - (Math.abs(e.lesemenge - z.lesen) + Math.abs(e.schreibmenge - z.schreiben) + Math.max(0, z.bild - e.bildanteil)) / 6)
}

/** Formate-Wunsch (2.3 Block 4) – zählt zum Deckel der Vorlieben (E-S3e). */
function wunschWert(e: KatalogEintrag, c: Kontext): number {
  const w = c.a.formate ?? []
  if (!w.length) return 0
  let v = 0
  const f = new Set(e.format)
  if (w.includes('bewegung') && f.has('bewegung')) v += 0.5
  if (w.includes('kreativ') && (f.has('malen') || f.has('basteln') || f.has('musik'))) v += 0.5
  if (w.includes('gespraech') && f.has('gespraech')) v += 0.5
  if (w.includes('spiel') && (f.has('spiel') || f.has('rollenspiel'))) v += 0.5
  if (w.includes('wenig-schreiben') && (f.has('schreiben') || (e.typ === 'baustein' && e.schreibmenge >= 2))) v -= 0.7
  return Math.max(-1, Math.min(1, v))
}

export function bewerte(e: KatalogEintrag, c: Kontext, o: BewertungsOpt = {}): Bewertet {
  const leicht = c.weg === 'leicht'
  const W = leicht ? GEWICHTE_LEICHT : GEWICHTE_V1
  const z = leicht ? { w: 0 } : zielWert(e, c, o)
  const phase = o.phase && o.phase !== 'leicht' ? o.phase : null
  const f: Record<string, number> = {
    ziel: z.w,
    phase: !phase ? 0.5 : !e.typ || (e.typ === 'schritt' && !e.bogen) ? 0.5 : e.bogen === phase ? 1 : NACHBAR[phase].includes(e.bogen!) ? 0.35 : 0,
    zugang: zugangWert(e, c),
    thema: themaWert(e, c),
    tagesform: tagesformWert(e, c),
    abwechslung: o.formate && e.format.some((x) => o.formate!.has(x)) ? 0.4 : o.vorigerKern && e.format[0] === o.vorigerKern ? 0.6 : 1,
    qualitaet: e.qualitaet === 'geprueft' ? 1 : 0.5,
    interesse: c.p.interessen.some((i) => interessenVon(e).has(i)) || (e.typ === 'baustein' && (e.platzhalter ?? []).includes('INTERESSE')) ? 1 : 0,
  }
  let g = 0
  for (const k of Object.keys(W)) g += W[k] * (f[k] ?? 0)
  g += o.bonus ?? 0
  // Französisch: Blatt-Teile ohne FR zählen weniger (T-M4)
  if (c.sprache === 'fr' && e.typ === 'baustein' && !e.sprache.fr && e.lesemenge > 0) g *= 0.7
  const deckel = leicht ? 0.4 : 0.3
  const vorl = Math.max(-1, Math.min(1, V(e, c.v, c.datum, c.prior, c.ohneKind) + wunschWert(e, c)))
  return { e, f, g, vorliebe: vorl, s: g * (1 + deckel * vorl), ziel: z.ziel, zielArt: z.art }
}

/** Gleichstand: fester Wert aus (Seed, Plan, Sitzung, Slot, Id) – kein Datum, kein ref (T-M7). */
export function rang(a: Bewertet, b: Bewertet, salz: string): number {
  return b.s - a.s || hash01(salz + '|' + a.e.id) - hash01(salz + '|' + b.e.id)
}

// ---------------------------------------------------------------------------------------------------------------------
// Begründungen (5.9) – höchstens zwei, ohne Testwerte
// ---------------------------------------------------------------------------------------------------------------------

function datumKurz(iso?: string): string {
  if (!iso) return ''
  const [, m, d] = iso.slice(0, 10).split('-')
  return `${Number(d)}.${Number(m)}.`
}

const ZIEL_QUELLE: Record<string, string> = { pei: 'Förderziel aus dem PEI', eldib: 'ELDiB-Förderziel', vorgemerkt: 'vorgemerkt für das nächste PEI', andere: 'weiteres Ziel' }
const THEMA_ART: Record<string, string> = { vorfall: 'Vorfall am', notiz: 'Notiz vom', beobachtung: 'Beobachtung vom', gespraech: 'Gespräch am', reunion: 'Réunion am', screening: 'Screening vom', klassenbuch: 'Klassenbuch,' }

export function zielText(c: Kontext, z: ZielKontext, vermutet: boolean): string {
  if (z.quelle === 'kennenlernen') return 'Zum Kennenlernen: was das Kind mag und gut kann (noch kein Ziel)'
  if (z.code.startsWith('kompetenz:')) return `Schwerpunkt ${KOMPETENZ_NAME[z.feld!]?.de ?? z.feld} – heute gewählt`
  const q = z.quelle ? ZIEL_QUELLE[z.quelle] : 'Ziel der Stunde'
  return `Zu ${z.code} ${eldibKurz(c.k, z.code)}${vermutet ? ' (Zuordnung vermutet)' : ''} – ${q}${z.seit ? ` (${datumKurz(z.seit)})` : ''}`
}

export interface WarumOpt {
  phase?: Bogen | 'leicht'
  nr?: number
  erkundung?: boolean
  ritual?: boolean
  locker?: string
  rolle?: Rolle
}

export function warum(b: Bewertet, c: Kontext, o: WarumOpt = {}): string[] {
  const l: { v: number; t: string }[] = []
  const e = b.e
  const W = c.weg === 'leicht' ? GEWICHTE_LEICHT : GEWICHTE_V1
  const name = c.p.vorname ?? 'dem Kind'
  if (o.ritual) l.push({ v: 9, t: c.weg === 'leicht' ? 'Ritual, das nichts verlangt – ohne Druck' : 'Ritual – bleibt in der Folge gleich (Sicherheit, Vorhersehbarkeit)' })
  if (o.erkundung) l.push({ v: 8, t: 'Neu ausprobiert – mal etwas anderes als sonst' })
  if (o.locker) l.push({ v: 7, t: o.locker })
  if (b.ziel && b.f.ziel >= 0.2) {
    const vermutet = (e.sicher.eldib ?? 1) < 0.7 || e.qualitaet === 'entwurf' || b.zielArt === 'bereich'
    const t = b.zielArt === 'bereich' ? `Ähnliches Ziel wie ${b.ziel.code} ${eldibKurz(c.k, b.ziel.code)} (gleicher Bereich)` : zielText(c, b.ziel, vermutet)
    l.push({ v: W.ziel * b.f.ziel, t })
  }
  if (b.f.thema > 0) {
    const key = e.thema.find((x) => c.themen.has(x))
    const th = key ? c.themen.get(key) : undefined
    if (key && th) {
      const name2 = themaByKey.get(key)?.name ?? key
      const herkunft = th.gewaehlt ? 'heute gewählt' : th.art ? `${THEMA_ART[th.art] ?? ''} ${datumKurz(th.datum)}`.trim() : ''
      l.push({ v: W.thema * b.f.thema + 0.02, t: `Thema ${name2}${herkunft ? ' – ' + herkunft : ''}` })
    }
  }
  if (o.phase && o.phase !== 'leicht' && b.f.phase === 1 && o.nr) {
    const P: Record<string, string> = { wahrnehmen: 'wahrnehmen', verstehen: 'verstehen', ueben: 'üben', uebertragen: 'in den Alltag übertragen', reflektieren: 'zurückschauen und feiern' }
    l.push({ v: W.phase * 0.6, t: `Sitzung ${o.nr}: ${P[o.phase]}` })
  }
  if (c.weg === 'leicht' && b.f.tagesform >= 0.8 && c.tagesformen.length) l.push({ v: 0.4, t: `passt, wenn ${name} heute ${c.tagesformen.map((t) => TAGESFORM_NAME[t]).join(' und ')} ist` })
  if (c.weg !== 'leicht') {
    if (c.heute.energie >= 6 && e.energie === 3) l.push({ v: 0.2, t: 'heute viel Energie: erst bewegen, dann denken' })
    if (c.heute.energie <= 2 && e.energie === 1) l.push({ v: 0.15, t: `heute wenig Energie: ruhig im Sitzen, ${e.dauer.typ} Minuten` })
    if (c.heute.konzentration <= 3 && e.dauer.typ <= 8) l.push({ v: 0.12, t: 'heute kurze Teile' })
  }
  if (e.typ === 'baustein' && b.f.zugang >= 0.83 && c.zugangText) l.push({ v: 0.1, t: c.zugangText })
  if (b.f.interesse) {
    const i = c.p.interessen.find((x) => interessenVon(e).has(x))
    if (i) l.push({ v: 0.12, t: `mit ${INTERESSEN[i]?.de ?? i}-Beispiel (Interesse)` })
  }
  // Vorlieben: Kind vor Fachkraft vor Team
  if (!c.ohneKind) {
    let best: { f: string; p: number; a: number; b: number } | null = null
    for (const f of e.format) {
      const x = vorliebe(c.v, 'kind', `format:${f}`, c.datum, c.prior)
      if (x.p > 0.2 && x.a + x.b >= 3 && (!best || x.p > best.p)) best = { f, p: x.p, a: x.a, b: x.b }
    }
    if (best) l.push({ v: 0.14 + best.p * 0.1, t: `${FORMAT_NAME[best.f] ?? best.f} klappt bei ${name} oft (${Math.round(best.a)} von ${Math.round(best.a + best.b)})` })
  }
  for (const f of e.format) {
    const x = vorliebe(c.v, 'ich', `format:${f}`, c.datum)
    if (x.p > 0.3) {
      l.push({ v: 0.1, t: `du nimmst oft ${FORMAT_NAME[f] ?? f}` })
      break
    }
  }
  const t = c.v.team && c.v.team.personen >= 3 ? c.v.team.z[`baustein:${e.id}`] : undefined
  if (t && t.n >= 3) {
    const r = t.geklappt + t.teils + t.nicht
    l.push({ v: 0.09, t: r >= 10 ? `im Team beliebt: ${t.n}× genutzt, ${Math.round((100 * t.geklappt) / Math.max(1, r))} % hat geklappt` : `im Team genutzt: ${t.n}×, ${t.geklappt} von ${r} als gelungen angegeben` })
  }
  if (e.typ === 'schritt' && e.einzeltauglich === 'angepasst' && !e.einzelvariante) l.push({ v: 6, t: 'Gruppenaktivität – so mit einem Kind machen' })
  if (!l.length && e.ohneZiel) l.push({ v: 0.1, t: 'leicht und ohne Förderziel – für die Beziehung' })
  if (!l.length && o.rolle === 'bewegung') l.push({ v: 0.05, t: 'Bewegung zwischendurch' })
  if (!l.length && o.rolle === 'regulation') l.push({ v: 0.05, t: 'zur Ruhe kommen' })
  if (!l.length) l.push({ v: 0.01, t: `passt zu Alter und Zugang von ${name}` })
  if (o.ritual) return [l[0].t]
  l.sort((a, b) => b.v - a.v)
  return [...new Set(l.map((x) => x.t))].slice(0, 2)
}
