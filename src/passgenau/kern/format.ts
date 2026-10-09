// Passgenau – kompaktes Dateiformat für src/data/passgenau/bausteine.json und schritte.json (Konzept 4.4–4.6).
// Gespeichert sind nur Metadaten (kurze Schlüssel, Standardwerte weggelassen); Texte der Stundenschritte kommen beim
// Laden aus den Quellen (Kurs, Förderfach, Material, Spielschule, CREW) – so steht kein Inhalt doppelt im Paket.
import type { BausteinTexte, Bogen, Dauer, EldibBezug, Einzeltauglich, KatalogZusatz, Layout, Merkmale, MikroBaustein, Rolle, Sozialform, Stufe, Stundenschritt, Tagesform } from '../typen'

/** Reihenfolge der Sicherheitswerte je Feld (Array statt Objekt spart Platz). */
export const SICHER_FELDER = [
  'eldib', 'thema', 'kompetenz', 'rolle', 'bogen', 'alter', 'lesemenge', 'schreibmenge', 'bildanteil', 'format', 'dauer',
  'sozialform', 'einzeltauglich', 'energie', 'belastung', 'reiz', 'material', 'hoehe', 'braucht', 'sensibel', 'ohneZiel', 'tagesform',
  // seit der Beschriftung (4.6 Phase 1) – hinten angehängt, ältere Dateien bleiben lesbar
  'einzelvariante', 'allgemein', 'zielgruppe', 'merkmale', 'mehrtaegig',
] as const

export const LAYOUTS: Layout[] = ['bild', 'gross', 'mittel', 'jugend']

function packeSicher(s: Record<string, number>): (number | null)[] {
  const out = SICHER_FELDER.map((f) => (f in s ? Math.round(s[f] * 10) / 10 : null))
  while (out.length && out[out.length - 1] === null) out.pop()
  return out
}

function entpackeSicher(a: (number | null)[] | undefined): Record<string, number> {
  const s: Record<string, number> = {}
  ;(a ?? []).forEach((x, i) => {
    if (x !== null && x !== undefined) s[SICHER_FELDER[i]] = x
  })
  return s
}

const eldibPack = (e: EldibBezug[]) => e.map((x) => (x.gewicht === 1 ? x.code : x.code + '~'))
const eldibAus = (e: string[] | undefined): EldibBezug[] =>
  (e ?? []).map((x) => (x.endsWith('~') ? { code: x.slice(0, -1), gewicht: 0.5 as const } : { code: x, gewicht: 1 as const }))

/** Merkmale als Bitmaske: 1 wettbewerb · 2 koerperkontakt · 4 laut · 8 gewaltbezug · 16 katharsis */
const MERKMAL_BITS: (keyof Merkmale)[] = ['wettbewerb', 'koerperkontakt', 'laut', 'gewaltbezug', 'katharsis']
function merkmalePack(m: Merkmale | undefined): number | undefined {
  if (!m) return undefined
  const n = MERKMAL_BITS.reduce((a, k, i) => (m[k] ? a | (1 << i) : a), 0)
  return n || undefined
}
function merkmaleAus(n: number | undefined): Merkmale | undefined {
  if (!n) return undefined
  const m: Merkmale = {}
  MERKMAL_BITS.forEach((k, i) => {
    if (n & (1 << i)) m[k] = true
  })
  return m
}

/** Gemeinsame Zusatzfelder (Kritik 9.10.) kompakt: zg Zielgruppe, mt mehrtägig, mk Merkmale, an Anspruch. Die Texte
 *  achtung/vorbereitung/elternbrief kommen beim Laden aus den Quellen. */
interface RohZusatz {
  zg?: 'f' | 'e'
  mt?: 1
  mk?: number
  an?: 0 | 1 | 2
}
function zusatzPack(z: KatalogZusatz): RohZusatz {
  return {
    zg: z.zielgruppe === 'fachkraft' ? 'f' : z.zielgruppe === 'eltern' ? 'e' : undefined,
    mt: z.mehrtaegig ? 1 : undefined,
    mk: merkmalePack(z.merkmale),
    an: z.anspruch,
  }
}
function zusatzAus(r: RohZusatz, ziel: KatalogZusatz): void {
  if (r.zg) ziel.zielgruppe = r.zg === 'f' ? 'fachkraft' : 'eltern'
  if (r.mt) ziel.mehrtaegig = true
  const m = merkmaleAus(r.mk)
  if (m) ziel.merkmale = m
  if (r.an !== undefined) ziel.anspruch = r.an
}

const leer = (x: unknown) => x === undefined || x === null || (Array.isArray(x) && x.length === 0) || (typeof x === 'object' && x !== null && !Array.isArray(x) && Object.keys(x).length === 0)

function ohneLeere<T extends Record<string, unknown>>(o: T): T {
  for (const k of Object.keys(o)) if (leer(o[k])) delete o[k]
  return o
}

// --- Mikro-Bausteine ----------------------------------------------------------------------------------------------

export interface RohBaustein extends RohZusatz {
  /** 'b:<blatt>:<n>' – Blatt, Nummer, Stufen, Sozialform und Kompetenzfeld kommen beim Laden aus dem Blatt */
  id: string
  h: string
  /** Stellen in de.bausteine */
  p: number[]
  a: string[]
  bo: Bogen
  r?: Rolle[]
  t?: string[]
  e?: string[]
  al: [number, number]
  l?: number
  w?: number
  bi?: number
  f?: string[]
  fr?: 1
  wo?: ('lb' | 'pt')[]
  d: [number, number, number]
  ez?: 'a' | 'n'
  en?: 2 | 3
  be?: 1 | 2
  m?: string[]
  ho?: (number | null)[]
  br?: string[]
  pl?: ('NAME' | 'INTERESSE' | 'WOCHENZIEL')[]
  se?: MikroBaustein['sensibel']
  qu?: 'e'
  /** Stelle in der Tabelle der Sicherheits-Muster (Dateikopf `sicher`) */
  s?: number
  oz?: 1
  /** Kompetenzfelder aus einer Beschriftung (sonst aus dem Blatt) */
  k?: string[]
  /** Variante ohne Figurenbezug (Beschriftung): Text-Pfad im Paket → Text */
  ag?: BausteinTexte
}

/** Gleiche Sicherheitswerte kommen oft vor – sie stehen einmal im Dateikopf, die Einträge verweisen darauf. */
export class SicherTabelle {
  muster: (number | null)[][] = []
  private index = new Map<string, number>()
  nr(s: Record<string, number>): number {
    const m = packeSicher(s)
    const k = JSON.stringify(m)
    let i = this.index.get(k)
    if (i === undefined) {
      i = this.muster.length
      this.muster.push(m)
      this.index.set(k, i)
    }
    return i
  }
}

/** `mitKompetenz`: Kompetenzfelder speichern (nur wenn eine Beschriftung sie gesetzt hat – sonst kommen sie aus dem Blatt). */
export function packeBaustein(b: MikroBaustein, sicher: SicherTabelle, mitKompetenz = false): RohBaustein {
  const r: RohBaustein = {
    id: b.id,
    h: b.h,
    p: b.quelle.pfad,
    a: b.art,
    bo: b.bogen,
    r: b.rolle.length === 1 && b.rolle[0] === 'uebung' ? undefined : b.rolle,
    t: b.thema,
    e: eldibPack(b.eldib.slice(0, 4)),
    al: [b.alter.von, b.alter.bis],
    l: b.lesemenge || undefined,
    w: b.schreibmenge || undefined,
    bi: b.bildanteil || undefined,
    f: b.format,
    fr: b.sprache.fr ? 1 : undefined,
    wo: b.sprache.woerter,
    d: [b.dauer.min, b.dauer.typ, b.dauer.max],
    ez: b.einzeltauglich === 'ja' ? undefined : b.einzeltauglich === 'angepasst' ? 'a' : 'n',
    en: b.energie === 1 ? undefined : b.energie,
    be: b.belastung === 0 ? undefined : b.belastung,
    m: b.material,
    ho: LAYOUTS.some((l) => b.hoehe[l] !== undefined) ? LAYOUTS.map((l) => b.hoehe[l] ?? null) : undefined,
    br: b.braucht,
    pl: b.platzhalter,
    se: b.sensibel,
    qu: b.qualitaet === 'entwurf' ? 'e' : undefined,
    s: sicher.nr(b.sicher),
    oz: b.ohneZiel ? 1 : undefined,
    k: mitKompetenz ? b.kompetenz : undefined,
    ag: b.allgemein,
    ...zusatzPack(b),
  }
  const o = ohneLeere(r as unknown as Record<string, unknown>) as unknown as RohBaustein
  // ausdrücklich keine Kompetenz (Beschriftung) bleibt als leere Liste stehen
  if (mitKompetenz && !b.kompetenz.length) o.k = []
  return o
}

/** Aus dem Blatt abgeleitete Felder eines Bausteins. */
export interface BlattAngaben {
  nr: string
  stufen: Stufe[]
  sozialform: Sozialform[]
  kompetenz: string[]
}

export function entpackeBaustein(r: RohBaustein, blatt: BlattAngaben, sicher: (number | null)[][]): MikroBaustein {
  const hoehe: MikroBaustein['hoehe'] = {}
  ;(r.ho ?? []).forEach((x, i) => {
    if (x !== null && x !== undefined) hoehe[LAYOUTS[i]] = x
  })
  const b: MikroBaustein = {
    id: r.id,
    h: r.h,
    quelle: { blatt: r.id.split(':')[1], nr: blatt.nr, pfad: r.p },
    art: r.a,
    bogen: r.bo,
    rolle: r.r ?? ['uebung'],
    thema: r.t ?? [],
    eldib: eldibAus(r.e),
    kompetenz: r.k ?? blatt.kompetenz,
    alter: { von: r.al[0], bis: r.al[1] },
    stufen: blatt.stufen,
    lesemenge: (r.l ?? 0) as MikroBaustein['lesemenge'],
    schreibmenge: (r.w ?? 0) as MikroBaustein['schreibmenge'],
    bildanteil: (r.bi ?? 0) as MikroBaustein['bildanteil'],
    format: r.f ?? [],
    sprache: { de: true, fr: !!r.fr, ...(r.wo ? { woerter: r.wo } : {}) },
    dauer: { min: r.d[0], typ: r.d[1], max: r.d[2] },
    sozialform: blatt.sozialform,
    einzeltauglich: r.ez === 'a' ? 'angepasst' : r.ez === 'n' ? 'nein' : 'ja',
    energie: r.en ?? 1,
    belastung: r.be ?? 0,
    material: r.m ?? [],
    hoehe,
    textfelder: [],
    qualitaet: r.qu === 'e' ? 'entwurf' : 'geprueft',
    sicher: entpackeSicher(r.s === undefined ? undefined : sicher[r.s]),
  }
  if (r.br) b.braucht = r.br
  if (r.pl) b.platzhalter = r.pl
  if (r.se) b.sensibel = r.se
  if (r.oz) b.ohneZiel = true
  if (r.ag) b.allgemein = r.ag
  zusatzAus(r, b)
  return b
}

// --- Stundenschritte (nur Metadaten; Texte aus den Quellen) -------------------------------------------------------

/** Metadaten eines Stundenschritts ohne Texte und Quelle (die kommen beim Laden aus den Quellen). Die Einzelvariante
 *  stammt aus einer Beschriftung (steht in keiner Quelle) und wird deshalb mitgespeichert. */
export type SchrittMeta = Omit<Stundenschritt, 'titel' | 'text' | 'sagen' | 'wennEsKippt' | 'tipp' | 'fr' | 'quelle' | 'achtung' | 'vorbereitung' | 'elternbrief'> & {
  /** Stelle in der Quelle, wenn sie von der Nummer in der Id abweicht (stabile Ids) */
  stelle?: number
  /** französische Einzelvariante (Beschriftung) – landet beim Laden in `fr.einzelvariante` */
  einzelvarianteFr?: { text: string; sagen?: string[] }
  /** Texte ohne Kursbezug (Beschriftung `allgemein`): Pfad → Text; ersetzt beim Laden die Texte aus der Quelle */
  allgemein?: Record<string, string>
}

export interface RohSchritt extends RohZusatz {
  /** Stufen kommen aus `al`, Kompetenzfelder aus den ELDiB-Codes, die Originalphase aus der Quelle */
  id: string
  h: string
  r: Rolle[]
  bo?: Bogen
  t?: string[]
  e?: string[]
  al: [number, number]
  d: [number, number, number]
  so?: Sozialform[]
  ez?: 'j' | 'a'
  g?: Stundenschritt['gruppe']
  en?: 2 | 3
  be?: 1 | 2
  rz?: 1 | 2
  f?: string[]
  m?: string[]
  o?: 'turnhalle' | 'draussen'
  bl?: string[]
  vo?: Stundenschritt['voraussetzungen']
  kb?: Stundenschritt['kombinierbar']
  fr?: 1
  oz?: 1
  tf?: Tagesform[]
  qu?: 'e'
  s?: number
  se?: Stundenschritt['sensibel']
  /** Stelle in der Quelle (Schritt, Ablaufphase, Aktivität), wenn sie von der Nummer in der Id abweicht (stabile Ids, T-M10) */
  p?: number
  /** Kompetenzfelder aus einer Beschriftung (sonst aus den ELDiB-Codes) */
  k?: string[]
  /** Einzelvariante (Beschriftung): Text und Sätze zum Sagen, DE und FR */
  ev?: { t: string; s?: string[] }
  evf?: { t: string; s?: string[] }
  /** Texte ohne Kursbezug (Beschriftung `allgemein`): Pfad → Text */
  ag?: Record<string, string>
}

const evPack = (v: { text: string; sagen?: string[] } | undefined) => (v ? { t: v.text, ...(v.sagen?.length ? { s: v.sagen } : {}) } : undefined)
const evAus = (v: { t: string; s?: string[] } | undefined) => (v ? { text: v.t, ...(v.s?.length ? { sagen: v.s } : {}) } : undefined)

export function packeSchritt(s: SchrittMeta, sicher: SicherTabelle, mitKompetenz = false): RohSchritt {
  const r: RohSchritt = {
    id: s.id,
    h: s.h,
    r: s.rolle,
    bo: s.bogen,
    t: s.thema,
    e: eldibPack(s.eldib.slice(0, 4)),
    al: [s.alter.von, s.alter.bis],
    d: [s.dauer.min, s.dauer.typ, s.dauer.max],
    so: s.sozialform.length === 1 && s.sozialform[0] === 'gruppe' ? undefined : s.sozialform,
    ez: s.einzeltauglich === 'nein' ? undefined : s.einzeltauglich === 'ja' ? 'j' : 'a',
    g: s.gruppe,
    en: s.energie === 1 ? undefined : s.energie,
    be: s.belastung === 0 ? undefined : s.belastung,
    rz: s.reiz === 0 ? undefined : s.reiz,
    f: s.format,
    m: s.material,
    o: s.ort === 'raum' ? undefined : s.ort,
    bl: s.blatt,
    vo: s.voraussetzungen,
    kb: s.kombinierbar,
    fr: s.sprache.fr ? 1 : undefined,
    oz: s.ohneZiel ? 1 : undefined,
    tf: s.tagesform,
    qu: s.qualitaet === 'entwurf' ? 'e' : undefined,
    s: sicher.nr(s.sicher),
    se: s.sensibel,
    p: s.stelle,
    k: mitKompetenz ? s.kompetenz : undefined,
    ev: evPack(s.einzelvariante),
    evf: evPack(s.einzelvarianteFr),
    ag: s.allgemein,
    ...zusatzPack(s),
  }
  const o = ohneLeere(r as unknown as Record<string, unknown>) as unknown as RohSchritt
  if (mitKompetenz && !s.kompetenz.length) o.k = []
  return o
}

export function entpackeSchritt(r: RohSchritt, sicher: (number | null)[][], kompetenz: (codes: string[]) => string[], stufen: (von: number, bis: number) => Stufe[]): SchrittMeta {
  const eldib = eldibAus(r.e)
  const s: SchrittMeta = {
    id: r.id,
    h: r.h,
    rolle: r.r,
    thema: r.t ?? [],
    eldib,
    kompetenz: r.k ?? kompetenz(eldib.slice(0, 2).map((x) => x.code)),
    alter: { von: r.al[0], bis: r.al[1] },
    stufen: stufen(r.al[0], r.al[1]),
    dauer: { min: r.d[0], typ: r.d[1], max: r.d[2] } as Dauer,
    sozialform: r.so ?? ['gruppe'],
    einzeltauglich: (r.ez === 'j' ? 'ja' : r.ez === 'a' ? 'angepasst' : 'nein') as Einzeltauglich,
    energie: r.en ?? 1,
    belastung: r.be ?? 0,
    reiz: r.rz ?? 0,
    format: r.f ?? [],
    material: r.m ?? [],
    sprache: { de: true, fr: !!r.fr },
    qualitaet: r.qu === 'e' ? 'entwurf' : 'geprueft',
    sicher: entpackeSicher(r.s === undefined ? undefined : sicher[r.s]),
  }
  if (r.bo) s.bogen = r.bo
  if (r.g) s.gruppe = r.g
  if (r.o) s.ort = r.o
  if (r.bl) s.blatt = r.bl
  if (r.vo) s.voraussetzungen = r.vo
  if (r.kb) s.kombinierbar = r.kb
  if (r.oz) s.ohneZiel = true
  if (r.tf) s.tagesform = r.tf
  if (r.se) s.sensibel = r.se
  if (r.p !== undefined) s.stelle = r.p
  const ev = evAus(r.ev)
  if (ev) s.einzelvariante = ev
  const evf = evAus(r.evf)
  if (evf) s.einzelvarianteFr = evf
  if (r.ag) s.allgemein = r.ag
  zusatzAus(r, s)
  return s
}

/** Kopf von bausteine.json: Stand, Seitenmaße je Gestaltung (gemessen), Zähler. */
export interface BausteineDatei {
  v: 1
  stand: string
  /** Hash aus stil.ts und dem Renderer der Bausteine: stimmt er nicht, sind die Höhen veraltet (T-S13) */
  stilHash?: string
  /** nutzbare Höhe in mm: erste Seite (unter Kopf, Titel und „Mein Ziel“), Folgeseite; Abstand zwischen Paketen */
  seite: Partial<Record<Layout, { erste: number; folge: number; abstand: number }>>
  /** Sicherheits-Muster (SICHER_FELDER-Reihenfolge), auf die die Einträge verweisen */
  sicher: (number | null)[][]
  bausteine: RohBaustein[]
}

export interface SchritteDatei {
  v: 1
  stand: string
  sicher: (number | null)[][]
  schritte: RohSchritt[]
}
