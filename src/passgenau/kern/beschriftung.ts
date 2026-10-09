// Passgenau – Beschriftung (Konzept 4.6, Phase 1/2): geprüfte Werte einzelner Katalogeinträge, getrennt vom automatisch
// erzeugten Katalog. Liegen als Overlays in src/data/passgenau/beschriftung/*.json (Format: README.md dort), werden vom
// Katalog-Skript beim Erzeugen angewandt (Overlay gewinnt, `sicher` aus dem Overlay) und vom Prüfskript und vom
// Import geprüft. Ohne Abhängigkeiten zu Node (läuft auch im Browser).
import type { Bogen, Einzeltauglich, Merkmale, MikroBaustein, Rolle, Stufe, Zielgruppe } from '../typen'
import type { Blatt } from '../../blatt/typen'
import type { SchrittMeta } from './format'
import { KATHARSIS_RE, KOMPETENZ_NAME, type Kompetenz } from './vokabular'
import { STUFE_ALTER } from './hilfen'
import { paketBausteine, texte } from './inhalt'

export const ROLLEN: Rolle[] = ['ankommen', 'einstieg', 'kern', 'uebung', 'bewegung', 'spiel', 'regulation', 'reflexion', 'abschluss', 'transfer']
export const BOEGEN: Bogen[] = ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen', 'reflektieren']
export const KOMPETENZEN = Object.keys(KOMPETENZ_NAME) as Kompetenz[]
export const EINZELTAUGLICH: Einzeltauglich[] = ['ja', 'angepasst', 'nein']
export const ZIELGRUPPEN: Zielgruppe[] = ['kind', 'fachkraft', 'eltern']
export const SENSIBEL = ['kinderschutz', 'akut', 'familie', 'koerper'] as const
export const MERKMALE: (keyof Merkmale)[] = ['wettbewerb', 'koerperkontakt', 'laut', 'gewaltbezug', 'katharsis']
export type Sensibel = (typeof SENSIBEL)[number]

/** Felder, die eine Beschriftung setzen darf (in dieser Reihenfolge in README und Anleitung). */
export const BESCHRIFTUNG_FELDER = [
  'rolle', 'bogen', 'eldib', 'kompetenz', 'alter', 'energie', 'belastung', 'einzeltauglich', 'einzelvariante', 'allgemein',
  'zielgruppe', 'merkmale', 'sensibel',
] as const
export type BeschriftungFeld = (typeof BESCHRIFTUNG_FELDER)[number]
const META = ['begruendung', 'von', 'sicher', 'h'] as const

/** Längengrenzen (Zeichen). */
export const GRENZEN = { begruendung: 120, einzelvariante: 300, einzelvarianteMin: 40, sagen: 160, sagenAnzahl: 3, eldibPrimaer: 2, eldibSekundaer: 3, eldib: 4, kompetenz: 2, rolle: 3 }

export interface Einzelvariante { text: string; sagen?: string[] }

/** Ein Overlay-Eintrag: nur die geprüften Felder plus Begründung, Herkunft und Sicherheit. */
export interface Beschriftung {
  rolle?: Rolle[]
  bogen?: Bogen
  /** primär (Gewicht 1) und sekundär (Gewicht 0,5); leere Listen = kein ELDiB-Bezug */
  eldib?: { primaer: string[]; sekundaer?: string[] }
  kompetenz?: Kompetenz[]
  alter?: { von: number; bis: number }
  energie?: 1 | 2 | 3
  belastung?: 0 | 1 | 2
  einzeltauglich?: Einzeltauglich
  /** nur Stundenschritte, nur mit einzeltauglich „angepasst“: so geht es mit einem Kind (DE; FR, wenn die Quelle FR hat) */
  einzelvariante?: Einzelvariante & { fr?: Einzelvariante }
  /** nur Mikro-Bausteine: Text-Pfad im Paket → Text ohne Figurenbezug */
  allgemein?: Record<string, string>
  zielgruppe?: Zielgruppe
  /** vollständige Menge: was fehlt, ist false */
  merkmale?: Merkmale
  /** null = ausdrücklich nicht sensibel */
  sensibel?: Sensibel | null
  begruendung: string
  von: 'agent' | 'fachkraft'
  sicher: number
  /** Prüfsumme des Eintrags zur Zeit der Beschriftung (setzt der Import) */
  h?: string
}

export type BeschriftungDatei = Record<string, Beschriftung>

/** Was die Prüfung über den Eintrag wissen muss (alles optional: geprüft wird, was bekannt ist). */
export interface EintragKontext {
  typ: 'baustein' | 'schritt'
  h?: string
  /** Stufen des Blatts (Bausteine) – das Alter muss sich mit ihnen überschneiden */
  stufen?: Stufe[]
  /** die Quelle hat einen französischen Text */
  fr?: boolean
  /** Text-Pfade des Pakets (Bausteine) → Originaltext, für `allgemein` */
  textPfade?: Map<string, string>
  /** aller Text des Eintrags (für Sicherheitsregeln) */
  text?: string
  /** Werkzeug für Fachkräfte (nie fürs Kind) */
  werkzeug?: boolean
  dauerTyp?: number
  mehrtaegig?: boolean
}

/** Werkzeuge für Fachkräfte, die doch fürs Kind sind (P1); alle anderen Blätter im Bereich „werkzeuge“ nie aufs Blatt des Kindes. */
export const WERKZEUGE_FUERS_KIND = new Set(['ruhe-ecke-karten', 'tagesplan-bildkarten', 'belohnungs-menue'])

/** Kontext eines Mikro-Bausteins (Text-Pfade des Pakets auf Deutsch, Stufen und Bereich des Blatts). */
export function kontextBaustein(b: Pick<MikroBaustein, 'h' | 'stufen' | 'sprache' | 'quelle' | 'dauer' | 'mehrtaegig'>, blatt: Blatt): EintragKontext {
  const tp = texte(paketBausteine(blatt, b.quelle.pfad, 'de'))
  return {
    typ: 'baustein', h: b.h, stufen: b.stufen, fr: b.sprache.fr, textPfade: new Map(tp.map((t) => [t.pfad, t.text])), text: tp.map((t) => t.text).join(' '),
    werkzeug: blatt.bereich === 'werkzeuge' && !WERKZEUGE_FUERS_KIND.has(blatt.id), dauerTyp: b.dauer.typ, mehrtaegig: !!b.mehrtaegig,
  }
}

/** Kontext eines Stundenschritts (Texte aus der Quelle). */
export function kontextSchritt(s: { h: string; dauer: { typ: number }; mehrtaegig?: boolean }, t: { titel: string; text: string; sagen?: string[]; fr?: unknown }): EintragKontext {
  return { typ: 'schritt', h: s.h, fr: !!t.fr, text: [t.titel, t.text, ...(t.sagen ?? [])].join(' '), dauerTyp: s.dauer.typ, mehrtaegig: !!s.mehrtaegig }
}

/** Text zu Suizid/Selbstverletzung bzw. zu Übergriffen (wie Prüfregel 16). */
export const AKUT_RE = /(suizid|selbstmord|selbstverletz|sich (selbst )?(ritzen|verletzen)|(nicht mehr|nimmer) leben wollen|sich das leben)/i
export const SCHUTZ_RE = /(sexuell(e|er|en)? (gewalt|übergriff|missbrauch)|kindesmissbrauch|missbraucht|übergriff(e|ig)? (am|an|gegen) (kind|körper))/i
/** Codes und Etiketten gehören nie in Texte für Kind oder Fachkraft-Sätze */
const CODE_RE = /\b(?:(?:K|V|SOZ|KOG)-\d{1,3}\b|PEI\b|ELDiB|WISC)/

const istObjekt = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x)
const istText = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0

function pruefeVariante(v: unknown, wo: string, f: string[]): void {
  if (!istObjekt(v)) {
    f.push(`${wo}: kein Objekt {text, sagen?}`)
    return
  }
  for (const k of Object.keys(v)) if (!['text', 'sagen', 'fr'].includes(k)) f.push(`${wo}: unbekanntes Feld „${k}“`)
  if (!istText(v.text)) f.push(`${wo}.text fehlt`)
  else {
    if (v.text.length > GRENZEN.einzelvariante) f.push(`${wo}.text zu lang (${v.text.length} > ${GRENZEN.einzelvariante})`)
    if (v.text.length < GRENZEN.einzelvarianteMin) f.push(`${wo}.text zu kurz (${v.text.length} < ${GRENZEN.einzelvarianteMin})`)
  }
  if (v.sagen !== undefined) {
    if (!Array.isArray(v.sagen) || !v.sagen.length || v.sagen.length > GRENZEN.sagenAnzahl || !v.sagen.every(istText)) f.push(`${wo}.sagen: 1–${GRENZEN.sagenAnzahl} Sätze`)
    else for (const s of v.sagen as string[]) if (s.length > GRENZEN.sagen) f.push(`${wo}.sagen zu lang (${s.length} > ${GRENZEN.sagen})`)
  }
  const alles = [v.text, ...(Array.isArray(v.sagen) ? v.sagen : [])].join(' ')
  if (KATHARSIS_RE.test(alles)) f.push(`${wo}: Katharsis („Wut rauslassen“ o. Ä.) – auf Regulation umschreiben`)
  if (CODE_RE.test(alles)) f.push(`${wo}: Code oder Etikett im Text`)
}

/**
 * Einen Overlay-Eintrag prüfen. `ctx` undefined = Eintrag nicht im Katalog. Liefert Fehlertexte (leer = gültig).
 * `bank`: ELDiB-Bank (Code → Eintrag).
 */
export function pruefeBeschriftung(id: string, roh: unknown, ctx: EintragKontext | undefined, bank: Record<string, unknown>): string[] {
  const f: string[] = []
  if (!/^[bkfmsc]:/.test(id)) return [`${id}: nur Einträge des automatischen Katalogs (b:, k:, f:, m:, s:, c:) – neue Inhalte tragen ihre Werte selbst`]
  if (!ctx) return [`${id}: nicht im Katalog`]
  if (!istObjekt(roh)) return [`${id}: kein Objekt`]
  const b = roh as Record<string, unknown>
  for (const k of Object.keys(b)) if (!(BESCHRIFTUNG_FELDER as readonly string[]).includes(k) && !(META as readonly string[]).includes(k)) f.push(`unbekanntes Feld „${k}“`)
  if (!BESCHRIFTUNG_FELDER.some((k) => k in b)) f.push('kein beschriftetes Feld')
  if (b.von !== 'agent' && b.von !== 'fachkraft') f.push('von: „agent“ oder „fachkraft“')
  if (typeof b.sicher !== 'number' || !(b.sicher >= 0 && b.sicher <= 1)) f.push('sicher: Zahl 0…1')
  if (!istText(b.begruendung)) f.push('begruendung fehlt')
  else if (b.begruendung.length > GRENZEN.begruendung) f.push(`begruendung zu lang (${b.begruendung.length} > ${GRENZEN.begruendung})`)
  if (b.h !== undefined && !(typeof b.h === 'string' && /^[0-9a-f]{8}$/.test(b.h))) f.push('h: 8 Hex-Zeichen')
  const agent = b.von !== 'fachkraft'

  if ('rolle' in b) {
    const r = b.rolle
    if (!Array.isArray(r) || !r.length || r.length > GRENZEN.rolle || !r.every((x) => ROLLEN.includes(x as Rolle)) || new Set(r).size !== r.length) f.push(`rolle: 1–${GRENZEN.rolle} verschiedene aus ${ROLLEN.join(', ')}`)
    else {
      if (r.includes('ankommen') && (ctx.dauerTyp ?? 0) > 12) f.push('rolle „ankommen“ bei mehr als 12 Minuten')
      if (r.includes('kern') && ctx.mehrtaegig) f.push('mehrtägig nie „kern“ (nur „transfer“)')
    }
  }
  if ('bogen' in b && !BOEGEN.includes(b.bogen as Bogen)) f.push(`bogen: eins von ${BOEGEN.join(', ')}`)
  if ('eldib' in b) {
    const e = b.eldib
    if (!istObjekt(e) || !Array.isArray(e.primaer) || (e.sekundaer !== undefined && !Array.isArray(e.sekundaer))) f.push('eldib: { "primaer": [...], "sekundaer": [...] }')
    else {
      for (const k of Object.keys(e)) if (k !== 'primaer' && k !== 'sekundaer') f.push(`eldib: unbekanntes Feld „${k}“`)
      const p = e.primaer as unknown[]
      const s = (e.sekundaer ?? []) as unknown[]
      if (p.length > GRENZEN.eldibPrimaer) f.push(`eldib.primaer: höchstens ${GRENZEN.eldibPrimaer}`)
      if (s.length > GRENZEN.eldibSekundaer) f.push(`eldib.sekundaer: höchstens ${GRENZEN.eldibSekundaer}`)
      if (p.length + s.length > GRENZEN.eldib) f.push(`eldib: zusammen höchstens ${GRENZEN.eldib}`)
      if (!p.length && s.length) f.push('eldib: sekundär ohne primär')
      const alle = [...p, ...s]
      for (const c of alle) if (typeof c !== 'string' || !bank[c]) f.push(`eldib: Code „${String(c)}“ nicht in der ELDiB-Bank`)
      if (new Set(alle).size !== alle.length) f.push('eldib: Code doppelt')
    }
  }
  if ('kompetenz' in b) {
    const k = b.kompetenz
    if (!Array.isArray(k) || k.length > GRENZEN.kompetenz || !k.every((x) => KOMPETENZEN.includes(x as Kompetenz)) || new Set(k).size !== k.length) f.push(`kompetenz: 0–${GRENZEN.kompetenz} aus ${KOMPETENZEN.join(', ')}`)
  }
  if ('alter' in b) {
    const a = b.alter
    if (!istObjekt(a) || !Number.isInteger(a.von) || !Number.isInteger(a.bis) || (a.von as number) < 3 || (a.bis as number) > 18 || (a.von as number) > (a.bis as number)) f.push('alter: { "von": 3…18, "bis": von…18 } in ganzen Jahren')
    else if (ctx.stufen?.length && !ctx.stufen.some((s) => STUFE_ALTER[s][0] <= (a.bis as number) + 1 && STUFE_ALTER[s][1] >= (a.von as number) - 1)) f.push(`alter ${a.von}–${a.bis} passt zu keiner Stufe des Blatts (${ctx.stufen.join(', ')})`)
  }
  if ('energie' in b && ![1, 2, 3].includes(b.energie as number)) f.push('energie: 1, 2 oder 3')
  if ('belastung' in b && ![0, 1, 2].includes(b.belastung as number)) f.push('belastung: 0, 1 oder 2')
  if ('einzeltauglich' in b && !EINZELTAUGLICH.includes(b.einzeltauglich as Einzeltauglich)) f.push('einzeltauglich: ja, angepasst oder nein')
  if (ctx.typ === 'baustein' && b.einzeltauglich === 'angepasst') f.push('einzeltauglich „angepasst“ nur für Stundenschritte (Bausteine: ja oder nein)')
  if (ctx.typ === 'schritt' && b.einzeltauglich === 'angepasst' && !('einzelvariante' in b)) f.push('einzeltauglich „angepasst“ ohne einzelvariante')
  if ('einzelvariante' in b) {
    if (ctx.typ !== 'schritt') f.push('einzelvariante nur für Stundenschritte')
    else if (b.einzeltauglich !== 'angepasst') f.push('einzelvariante nur zusammen mit einzeltauglich „angepasst“')
    pruefeVariante(b.einzelvariante, 'einzelvariante', f)
    const fr = istObjekt(b.einzelvariante) ? b.einzelvariante.fr : undefined
    if (fr !== undefined) {
      if (!ctx.fr) f.push('einzelvariante.fr, aber die Quelle hat kein Französisch')
      pruefeVariante(fr, 'einzelvariante.fr', f)
      if (istObjekt(fr) && 'fr' in fr) f.push('einzelvariante.fr.fr')
    } else if (ctx.fr && ctx.typ === 'schritt') f.push('einzelvariante.fr fehlt (die Quelle hat Französisch)')
  }
  if ('allgemein' in b) {
    const a = b.allgemein
    if (ctx.typ !== 'baustein') f.push('allgemein nur für Mikro-Bausteine')
    else if (!istObjekt(a) || !Object.keys(a).length) f.push('allgemein: { "<pfad>": "Text" }')
    else
      for (const [pfad, t] of Object.entries(a)) {
        const orig = ctx.textPfade?.get(pfad)
        if (ctx.textPfade && orig === undefined) f.push(`allgemein: Pfad „${pfad}“ gibt es im Paket nicht`)
        if (!istText(t)) f.push(`allgemein.${pfad}: leer`)
        else {
          if (orig !== undefined && t.length > Math.max(60, Math.round(orig.length * 1.5))) f.push(`allgemein.${pfad} zu lang (${t.length} Zeichen, Original ${orig.length})`)
          if (orig !== undefined && t === orig) f.push(`allgemein.${pfad} gleich dem Original`)
          if (KATHARSIS_RE.test(t) || CODE_RE.test(t)) f.push(`allgemein.${pfad}: Katharsis oder Code im Text`)
        }
      }
  }
  if ('zielgruppe' in b) {
    if (!ZIELGRUPPEN.includes(b.zielgruppe as Zielgruppe)) f.push(`zielgruppe: ${ZIELGRUPPEN.join(', ')}`)
    else if (ctx.werkzeug && b.zielgruppe === 'kind') f.push('Werkzeug für Fachkräfte bleibt zielgruppe „fachkraft“')
  }
  if ('merkmale' in b) {
    const m = b.merkmale
    if (!istObjekt(m) || !Object.entries(m).every(([k, v]) => MERKMALE.includes(k as keyof Merkmale) && typeof v === 'boolean')) f.push(`merkmale: { ${MERKMALE.map((x) => `"${x}": true`).join(', ')} } (nur true/false)`)
    else if (agent && !m.katharsis && ctx.text && KATHARSIS_RE.test(ctx.text)) f.push('merkmale: Text mit Katharsis-Wortliste – katharsis bleibt true (nur eine Fachkraft darf das ändern)')
  }
  if ('sensibel' in b) {
    const s = b.sensibel
    if (s !== null && !SENSIBEL.includes(s as Sensibel)) f.push(`sensibel: ${SENSIBEL.join(', ')} oder null`)
    else if (agent && ctx.text && AKUT_RE.test(ctx.text) && s !== 'akut') f.push('sensibel: Text zu Suizid/Selbstverletzung bleibt „akut“')
    else if (agent && ctx.text && SCHUTZ_RE.test(ctx.text) && s !== 'akut' && s !== 'kinderschutz') f.push('sensibel: Text zu Übergriffen bleibt „kinderschutz“')
  }
  return f.map((x) => `${id}: ${x}`)
}

/** Sicherheitswert eines Overlay-Felds im Katalog (eigene Spalte für einzelvariante/allgemein/zielgruppe/merkmale). */
const SICHER_SPALTE: Record<BeschriftungFeld, string> = {
  rolle: 'rolle', bogen: 'bogen', eldib: 'eldib', kompetenz: 'kompetenz', alter: 'alter', energie: 'energie', belastung: 'belastung',
  einzeltauglich: 'einzeltauglich', einzelvariante: 'einzelvariante', allgemein: 'allgemein', zielgruppe: 'zielgruppe', merkmale: 'merkmale',
  sensibel: 'sensibel',
}

/** Felder eines Overlays, die tatsächlich gesetzt sind. */
export function beschriftungFelder(b: Beschriftung): BeschriftungFeld[] {
  return BESCHRIFTUNG_FELDER.filter((k) => k in b)
}

/** Ein gültiges Overlay auf einen Eintrag des Katalog-Skripts anwenden (Overlay gewinnt, `sicher` aus dem Overlay).
 *  Sicherungen: eine Beschriftung durch einen Agenten senkt nie Katharsis, „akut“ oder „kinderschutz“ (E-M16, T-M1).
 *  Gehört das Overlay zu einer älteren Fassung (h), gelten die Werte, aber höchstens mit Sicherheit 0,6 – so kommt der
 *  Eintrag beim nächsten Export wieder in einen Stapel. */
export function wendeBeschriftungAn(e: MikroBaustein | SchrittMeta, b: Beschriftung, opt: { baustein: boolean }): { veraltet: boolean; kompetenz: boolean } {
  const veraltet = !!b.h && b.h !== e.h
  const sicher = veraltet ? Math.min(b.sicher, 0.6) : b.sicher
  const agent = b.von !== 'fachkraft'
  if (b.rolle) e.rolle = [...b.rolle]
  if (b.bogen) e.bogen = b.bogen
  if (b.eldib) e.eldib = [...b.eldib.primaer.map((code) => ({ code, gewicht: 1 as const })), ...(b.eldib.sekundaer ?? []).map((code) => ({ code, gewicht: 0.5 as const }))]
  if (b.kompetenz) e.kompetenz = [...b.kompetenz]
  if (b.alter) e.alter = { von: b.alter.von, bis: b.alter.bis }
  if (b.energie) e.energie = b.energie
  if (b.belastung !== undefined) e.belastung = b.belastung
  if (b.einzeltauglich) e.einzeltauglich = b.einzeltauglich
  if (b.einzelvariante && !opt.baustein) {
    const s = e as SchrittMeta
    s.einzelvariante = { text: b.einzelvariante.text, ...(b.einzelvariante.sagen ? { sagen: [...b.einzelvariante.sagen] } : {}) }
    if (b.einzelvariante.fr) s.einzelvarianteFr = { text: b.einzelvariante.fr.text, ...(b.einzelvariante.fr.sagen ? { sagen: [...b.einzelvariante.fr.sagen] } : {}) }
  }
  if (b.allgemein && opt.baustein) (e as MikroBaustein).allgemein = { ...b.allgemein }
  if (b.zielgruppe) {
    if (b.zielgruppe === 'kind') delete e.zielgruppe
    else e.zielgruppe = b.zielgruppe
  }
  if (b.merkmale) {
    const katharsis = !!b.merkmale.katharsis || (agent && !!e.merkmale?.katharsis)
    const m: Merkmale = {}
    for (const k of MERKMALE) if (k === 'katharsis' ? katharsis : b.merkmale[k]) m[k] = true
    if (Object.keys(m).length) e.merkmale = m
    else delete e.merkmale
  }
  if ('sensibel' in b) {
    const hart = e.sensibel === 'akut' || e.sensibel === 'kinderschutz'
    const neu = b.sensibel ?? undefined
    // ein Agent darf „akut“/„kinderschutz“ nicht senken, nur bestätigen oder von kinderschutz auf akut heben
    if (!(agent && hart && neu !== 'akut' && neu !== 'kinderschutz')) {
      if (neu) e.sensibel = neu
      else delete e.sensibel
    }
  }
  for (const k of beschriftungFelder(b)) e.sicher[SICHER_SPALTE[k]] = sicher
  return { veraltet, kompetenz: !!b.kompetenz }
}

/** Mehrere Overlay-Dateien zusammenführen: Fachkraft vor Agent; bei gleicher Herkunft gilt die spätere Datei (Liste
 *  sortiert), die Doppelung wird gemeldet. */
export function fuehreZusammen(dateien: { datei: string; daten: BeschriftungDatei }[]): { eintraege: Map<string, Beschriftung & { datei: string }>; doppelt: string[] } {
  const eintraege = new Map<string, Beschriftung & { datei: string }>()
  const doppelt: string[] = []
  for (const { datei, daten } of dateien)
    for (const [id, b] of Object.entries(daten)) {
      const da = eintraege.get(id)
      if (da) {
        if (da.von === 'fachkraft' && b.von !== 'fachkraft') continue
        if (da.von === b.von) doppelt.push(`${id} in ${da.datei} und ${datei}`)
      }
      eintraege.set(id, { ...b, datei })
    }
  return { eintraege, doppelt }
}
