// Passgenau – Ersetzen per Antippen (5.8, T-M7): gleichwertige Alternativen mit Vielfalt (MMR, λ = 0,7 auf das Format),
// nie aus einer anderen Sitzung derselben Folge; Suche im Baukasten (7.2).
import type { Alternative, Auftrag, BlattTeil, KatalogEintrag, Layout, MikroBaustein, Plan, PlanSchritt, Profil, Rolle } from '../typen'
import { norm } from './hilfen'
import { bausteinInhalt, textVon, type Katalog } from './katalog'
import { bewerte, kontext, NACHBAR, pruefe, rang, warum, type Bewertet, type Kontext } from './regeln'
import { kandidaten } from './planer'
import { teilHoehe, verteile } from './seiten'
import { texte } from './inhalt'
import type { Vorlieben } from './vorlieben'

export type Ort = { sitzung: number; schritt?: number; blatt?: number }

function auftragVon(plan: Plan, p: Profil): Auftrag {
  return plan.auftrag ?? { weg: plan.weg, ziele: plan.ziele, n: plan.n, dauer: plan.dauer as Auftrag['dauer'], sozialform: 'einzeln', sprache: p.sprache.blatt, datum: plan.erstellt }
}

/** Alle Teile einer Folge – Alternativen dürfen in keiner Sitzung vorkommen (außer Rituale). */
function inDerFolge(plan: Plan): Set<string> {
  const s = new Set<string>()
  for (const x of plan.sitzungen) {
    for (const y of x.schritte) {
      if (y.rolle !== 'ankommen' && y.rolle !== 'abschluss') s.add(y.ref)
      for (const w of y.wahl ?? []) s.add(w.ref)
    }
    for (const b of x.blatt?.bausteine ?? []) s.add(b.ref)
  }
  return s
}

/** Maximal Marginal Relevance (λ = 0,7): hohe Bewertung, aber nicht fünfmal dasselbe Format. */
export function mmr(liste: Bewertet[], n: number, lambda = 0.7): Bewertet[] {
  const rest = [...liste]
  const aus: Bewertet[] = []
  while (rest.length && aus.length < n) {
    let bi = 0
    let best = -Infinity
    rest.forEach((x, i) => {
      const gleich = aus.some((y) => y.e.format[0] === x.e.format[0]) ? 1 : 0
      const w = lambda * x.s - (1 - lambda) * gleich * 0.5
      if (w > best) {
        best = w
        bi = i
      }
    })
    aus.push(rest.splice(bi, 1)[0])
  }
  return aus
}

function ueberschneidung(a: KatalogEintrag, b: KatalogEintrag): boolean {
  if (a.ohneZiel && b.ohneZiel) return true
  if (a.eldib.some((x) => b.eldib.some((y) => y.code === x.code))) return true
  if (a.thema.some((t) => b.thema.includes(t))) return true
  return a.kompetenz.some((k) => b.kompetenz.includes(k))
}

export function alternativen(k: Katalog, p: Profil, plan: Plan, ort: Ort, v: Vorlieben, anzahl = 5): Alternative[] {
  const s = plan.sitzungen.find((x) => x.nr === ort.sitzung)
  if (!s) return []
  const c = kontext(k, p, auftragVon(plan, p), v)
  const folge = inDerFolge(plan)
  if (ort.blatt !== undefined) return blattAlternativen(c, plan, ort, folge, anzahl)
  if (ort.schritt === undefined) return []
  const x = s.schritte[ort.schritt]
  if (!x || x.ref === 'pg:blatt') return []
  const cur = k.eintraege.get(x.ref)
  const ritual = x.rolle === 'ankommen' || x.rolle === 'abschluss'
  const gesperrt = ritual ? new Set([x.ref]) : folge
  const vorher = new Set(plan.sitzungen.filter((y) => y.nr < s.nr).flatMap((y) => y.schritte.map((z) => z.ref)))
  const salz = `${c.seed}|${plan.id}|${s.nr}|alt|${ort.schritt}`
  let liste: Bewertet[]
  if (ritual) {
    liste = (k.nachRolle.get(x.rolle) ?? [])
      .filter((e) => e.typ === 'schritt' && !gesperrt.has(e.id) && pruefe(e, c, { ritual: true, rolle: x.rolle }) === null && e.dauer.min <= x.min + 2)
      .map((e) => bewerte(e, c, { phase: s.phase }))
  } else {
    liste = kandidaten(c, { rolle: x.rolle as Rolle, min: x.min, phase: s.phase, nr: s.nr, salz, gesperrt, vorher, formate: new Set() }).map((w) => w.b)
    if (cur) {
      const gleich = liste.filter((b) => ueberschneidung(b.e, cur))
      if (gleich.length >= 3) liste = gleich
      const typ = cur.dauer.typ
      const nahe = liste.filter((b) => b.e.dauer.typ >= 0.6 * typ && b.e.dauer.typ <= 1.4 * typ)
      if (nahe.length >= 3) liste = nahe
    }
  }
  liste = liste.filter((b) => b.e.id !== x.ref)
  liste.sort((a, b) => rang(a, b, salz))
  return mmr(liste, anzahl).map((b) => ({ eintrag: b.e, wert: Math.round(b.s * 1000) / 1000, warum: warum(b, c, { phase: s.phase, nr: s.nr, rolle: x.rolle, ritual }) }))
}

function blattAlternativen(c: Kontext, plan: Plan, ort: Ort, folge: Set<string>, anzahl: number): Alternative[] {
  const k = c.k
  const s = plan.sitzungen.find((x) => x.nr === ort.sitzung)!
  const teil = s.blatt?.bausteine[ort.blatt!]
  if (!teil || teil.ref.startsWith('pg:')) return []
  const cur = k.eintraege.get(teil.ref) as (KatalogEintrag & { typ: 'baustein' }) | undefined
  const layout = c.layout
  const andere = s.blatt!.bausteine.filter((_, i) => i !== ort.blatt)
  const slotMin = s.schritte.find((x) => x.rolle === 'uebung')?.min ?? 10
  const andereMin = andere.reduce((n, t) => n + (k.eintraege.get(t.ref)?.dauer.typ ?? 0), 0)
  const maxSeiten = layout === 'bild' || layout === 'gross' ? 1 : 2
  const bogen = cur?.bogen
  const erlaubt = bogen ? [bogen, ...NACHBAR[bogen]] : null
  const out: Bewertet[] = []
  for (const e of k.eintraege.values()) {
    if (e.typ !== 'baustein' || e.id === teil.ref || folge.has(e.id)) continue
    if (erlaubt && !erlaubt.includes(e.bogen)) continue
    if (['info', 'text', 'geschichte'].includes(e.art[0]) && e.art[0] !== 'aufgabe') continue
    if (pruefe(e, c, { blatt: true }) !== null) continue
    if (cur && !ueberschneidung(e, cur)) continue
    if ((e.braucht ?? []).some((d) => !andere.some((t) => t.ref === d))) continue
    if (andereMin + e.dauer.typ > 1.25 * slotMin + 1) continue
    const refs = s.blatt!.bausteine.map((t, i) => (i === ort.blatt ? e.id : t.ref))
    const seiten = verteile(k, refs, layout)
    if (seiten.length > maxSeiten || seiten[seiten.length - 1] > 1) continue
    const b = bewerte(e, c, { phase: s.phase })
    out.push(e.bogen === bogen ? { ...b, s: b.s + 0.05 } : b)
  }
  const salz = `${c.seed}|${plan.id}|${s.nr}|altb|${ort.blatt}`
  out.sort((a, b) => rang(a, b, salz))
  return mmr(out, anzahl).map((b) => ({ eintrag: b.e, wert: Math.round(b.s * 1000) / 1000, warum: warum(b, c, { phase: s.phase, nr: s.nr }) }))
}

/** Einen Teil durch einen anderen Katalogeintrag ersetzen (neuer Plan, der alte bleibt unverändert). */
export function ersetzen(plan: Plan, ort: Ort, neu: KatalogEintrag): Plan {
  const kopie = JSON.parse(JSON.stringify(plan)) as Plan
  const s = kopie.sitzungen.find((x) => x.nr === ort.sitzung)
  if (!s) return kopie
  if (ort.blatt !== undefined && s.blatt) {
    const teil: BlattTeil = { ref: neu.id, h: neu.h, t: textVon(neu, 'de').titel.slice(0, 60) }
    s.blatt.bausteine[ort.blatt] = teil
    // Abhängigkeiten (Geschichte zur Frage) davor einfügen, wenn sie fehlen
    if (neu.typ === 'baustein')
      for (const d of [...(neu.braucht ?? [])].reverse())
        if (!s.blatt.bausteine.some((t) => t.ref === d)) s.blatt.bausteine.splice(ort.blatt, 0, { ref: d, h: d })
  } else if (ort.schritt !== undefined && s.schritte[ort.schritt]) {
    const alt = s.schritte[ort.schritt]
    const x: PlanSchritt = { ref: neu.id, h: neu.h, rolle: alt.rolle, min: alt.min, t: textVon(neu, 'de').titel.slice(0, 60), warum: ['von dir gewählt'] }
    s.schritte[ort.schritt] = x
  }
  if (s.status === 'geplant') s.status = 'angepasst'
  return kopie
}

export interface SuchFilter {
  rolle?: Rolle
  bogen?: string
  ziel?: string
  thema?: string
  format?: string
  art?: string
  quelle?: string
  text?: string
  passtHoehe?: number
}

/** Suche im Baukasten (7.2): Filter als Chips, Suchwort möglich, nie nötig. Harte Regeln (Alter, Vorsicht …) gelten. */
export function suchen(k: Katalog, p: Profil, filter: SuchFilter, anzahl = 30): Alternative[] {
  const a: Auftrag = { weg: 'gruendlich', ziele: filter.ziel ? [filter.ziel] : [], n: 1, dauer: 30, sozialform: 'einzeln', sprache: p.sprache.blatt, datum: new Date().toISOString().slice(0, 10) }
  const c = kontext(k, p, a, { kind: null, ich: { v: 1, erkundung: 0, z: {} }, team: null })
  const wort = filter.text ? norm(filter.text) : null
  const layout: Layout = c.layout
  const out: Bewertet[] = []
  for (const e of k.eintraege.values()) {
    if (e.id.startsWith('pg:')) continue
    if (filter.rolle && !e.rolle.includes(filter.rolle)) continue
    if (filter.bogen && e.bogen !== filter.bogen) continue
    if (filter.ziel && !e.eldib.some((x) => x.code === filter.ziel) && !(filter.ziel.startsWith('kompetenz:') && e.kompetenz.includes(filter.ziel.slice(10)))) continue
    if (filter.thema && !e.thema.includes(filter.thema)) continue
    if (filter.format && !e.format.includes(filter.format)) continue
    if (filter.art && !(e.typ === 'baustein' ? e.art.includes(filter.art) : e.phase === filter.art)) continue
    if (filter.quelle && (e.typ === 'baustein' ? 'blatt' : e.quelle.art) !== filter.quelle) continue
    if (filter.passtHoehe !== undefined && (e.typ !== 'baustein' || teilHoehe(k, e.id, layout) > filter.passtHoehe)) continue
    if (pruefe(e, c, { blatt: e.typ === 'baustein' }) !== null) continue
    if (wort) {
      const t = e.typ === 'schritt' ? `${e.titel} ${e.text}` : texte(bausteinInhalt(k, e as MikroBaustein, 'de')).map((x) => x.text).join(' ')
      if (!norm(t).includes(wort)) continue
    }
    out.push(bewerte(e, c, {}))
  }
  out.sort((x, y) => rang(x, y, 'suche'))
  return out.slice(0, anzahl).map((b) => ({ eintrag: b.e, wert: Math.round(b.s * 1000) / 1000, warum: warum(b, c, {}) }))
}
