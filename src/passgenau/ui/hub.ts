// ---------------------------------------------------------------------------------------------------------------
// Passgenau – Brücke zum CDSE Hub (Konzept 9.2), nach dem Muster der ELDiB-/Klassenbuch-Brücke.
//
//   Toolbox → Hub   { cdsePassgenau: 1, n, op, arg }
//   Hub → Toolbox   { cdsePassgenau: 1, antwort: true, n, ok, erg | grund }
//
// Ziel ist das Fenster, das die Toolbox geöffnet hat: der Rahmen (window.parent) oder – Annexe unter file:// im
// eigenen Tab – window.opener. Unter http nur derselbe Ursprung, unter file:// zählt die Quelle (ev.source).
// Jede Frage hat eine laufende Nummer n; die Antwort wird über n zugeordnet. Ohne Antwort: Zeitlimit.
// ---------------------------------------------------------------------------------------------------------------
import type { Ereignis, HalloArg, HalloErgebnis, HubAntwort, HubFrage, HubOp, Plan, PraxisVorlage, Profil, ProfilZiel, Rueckmeldung, VorliebenKind, VorliebenTeam } from '../typen'
import { PASSGENAU_PLAN_V, PASSGENAU_PROFIL_V, PASSGENAU_PROTO } from '../typen'
import type { Schalter } from './erweitert'
import type { Korrekturen } from './zustand'

// Verbindlich: src/passgenau/PROTOKOLL.md (Ops, Argumente, Ergebnisse, Felder). Diese Datei setzt es für die Toolbox um.

/** Antwort auf „hallo“ (PROTOKOLL.md, T-M11) */
export type Hallo = HalloErgebnis & {
  rechte: HalloErgebnis['rechte'] & { kuratieren?: boolean }
  schalter?: Partial<Schalter>
  ich?: { name?: string; team?: string; funktion?: string }
  chips?: { key: string; text: string }[]
  interessen?: { key: string; text: string }[]
  hilft?: string[]
  hinweis?: string
}
/** Stand dieser Toolbox für den Versionsabgleich */
export const TOOLBOX_VERSION: HalloArg = { toolbox: { build: '2026-10-09', proto: PASSGENAU_PROTO, planV: PASSGENAU_PLAN_V, profilV: PASSGENAU_PROFIL_V } }

/** Versionsabgleich: gleiches Protokoll → normal; Hub älter → Speichern aus; Toolbox älter → Hinweis */
export function versionAbgleich(h: Hallo): { ok: boolean; speichern: boolean; hinweis: string | null } {
  const proto = h.hub?.proto ?? h.schema
  if (typeof proto !== 'number' || proto === PASSGENAU_PROTO) return { ok: true, speichern: true, hinweis: null }
  if (proto < PASSGENAU_PROTO) return { ok: false, speichern: false, hinweis: 'Der Hub ist älter als die Toolbox – bitte den Hub aktualisieren. Planen geht, Speichern ist aus.' }
  return { ok: false, speichern: true, hinweis: 'Die Toolbox ist älter als der Hub – bitte die Toolbox aktualisieren.' }
}

export class HubFehler extends Error {
  grund: string
  zeitlimit: boolean
  /** Treffer der Sperrliste oder offene Häkchen (praxis-teilen) */
  treffer?: { pfad: string; von: number; bis: number; art: string }[]
  constructor(grund: string, zeitlimit = false, text?: string) {
    super(text || GRUND_TEXT[grund] || grund)
    this.grund = grund
    this.zeitlimit = zeitlimit
  }
}

const GRUND_TEXT: Record<string, string> = {
  fehlt: 'Passgenau fehlt in dieser Hub-Datei.',
  aus: 'Passgenau ist in diesem Hub ausgeschaltet.',
  abgemeldet: 'Im Hub ist niemand angemeldet.',
  gesperrt: 'Der Hub ist gesperrt.',
  'kein-bereich': 'Die Schülerdaten sind im Hub noch nicht geöffnet.',
  ref: 'Die Verknüpfung zum Kind ist abgelaufen – bitte im Hub noch einmal „Passgenau“ wählen.',
  'kein-zugriff': 'Für dieses Kind fehlt das Recht.',
  recht: 'Dafür fehlt dir das Recht.',
  konflikt: 'Der Plan wurde inzwischen an einem anderen PC geändert.',
  ungueltig: 'Der Hub hat die Angaben nicht angenommen.',
}

/** Fenster des Hubs (Rahmen oder Öffner) – null, wenn die Toolbox allein läuft */
export function hubFenster(): Window | null {
  try {
    if (window.parent && window.parent !== window) return window.parent
  } catch {
    /* fremder Rahmen */
  }
  try {
    if (window.opener && !window.opener.closed) return window.opener as Window
  } catch {
    /* kein Zugriff */
  }
  return null
}

const ZIEL_URSPRUNG = () => (location.protocol === 'file:' || location.origin === 'null' ? '*' : location.origin)

let naechste = 1
const offen = new Map<number, { op: HubOp; ok: (erg: unknown) => void; fehler: (e: HubFehler) => void; timer: number }>()
let hoertZu = false

function empfangen(ev: MessageEvent) {
  const d = ev.data as Partial<HubAntwort> | null
  if (!d || typeof d !== 'object' || d.cdsePassgenau !== 1 || d.antwort !== true || typeof d.n !== 'number') return
  const ziel = hubFenster()
  if (!ziel || ev.source !== ziel) return
  if (location.protocol !== 'file:' && ev.origin !== location.origin && ev.origin !== 'null') return
  const f = offen.get(d.n)
  if (!f) return
  offen.delete(d.n)
  window.clearTimeout(f.timer)
  if (d.ok) f.ok(d.erg)
  else {
    const x = d as Partial<HubAntwort> & { text?: string; treffer?: HubFehler['treffer'] }
    const e = new HubFehler(x.grund || 'fehler', false, x.text || (x.grund ? undefined : 'Der Hub hat abgelehnt.'))
    if (Array.isArray(x.treffer)) e.treffer = x.treffer
    f.fehler(e)
  }
}

/** Eine Frage an den Hub; die Antwort kommt über n zurück. */
export function frage<T = unknown>(op: HubOp, arg?: unknown, ms = 8000): Promise<T> {
  const ziel = hubFenster()
  if (!ziel) return Promise.reject(new HubFehler('kein-hub', false, 'Kein Hub verbunden.'))
  if (!hoertZu) {
    window.addEventListener('message', empfangen)
    hoertZu = true
  }
  const n = naechste++
  return new Promise<T>((ok, fehler) => {
    const timer = window.setTimeout(() => {
      offen.delete(n)
      fehler(new HubFehler('zeitlimit', true, 'Der Hub antwortet nicht.'))
    }, ms)
    offen.set(n, { op, ok: ok as (e: unknown) => void, fehler, timer })
    const nachricht: HubFrage = { cdsePassgenau: 1, n, op, arg }
    try {
      ziel.postMessage(nachricht, ZIEL_URSPRUNG())
    } catch (e) {
      window.clearTimeout(timer)
      offen.delete(n)
      fehler(new HubFehler('fehler', false, e instanceof Error ? e.message : 'Nachricht an den Hub nicht möglich.'))
    }
  })
}

// --- Ops (Konzept 9.2) ------------------------------------------------------------------------------------------

/** „hallo“ – mit kurzem Zeitlimit (1,5 s): ohne Antwort plant die Toolbox ohne Kind. */
export function hallo(ms = 1500): Promise<Hallo> {
  return frage<Hallo>('hallo', TOOLBOX_VERSION, ms)
}

/** Gespeicherte Angaben des Kindes (d.passgenau.kind), wie der Hub sie mit dem Profil schickt */
export interface KindAngaben {
  korrekturen?: Record<string, { wert: unknown; am?: string } | unknown>
  interessen?: string[] | null
  vorname?: boolean
  lernen?: boolean
}
/** Antwort auf „profil“: das Profil (3.4) und drei Zusätze außerhalb des Profils (PROTOKOLL.md) */
export type ProfilVomHub = Profil & { kind?: KindAngaben; verlauf?: { plaene?: Plan[] }; team?: VorliebenTeam | null }

export function profil(ref: string): Promise<ProfilVomHub> {
  return frage<ProfilVomHub>('profil', { ref })
}

export interface SpeichernErgebnis {
  planId: string
  rev?: number
  ort: 'dossier' | 'tresor'
  hinweis?: string
}
/** Plan speichern (gedruckt = gespeichert, P7). Mit dabei (T-M9): gesammelte Ereignisse und Kind-Vorlieben – eine Dossier-Änderung. */
export function speichern(ref: string, plan: Plan, zusatz: { gedruckt?: boolean; ereignisse?: Ereignis[]; vorlieben?: VorliebenKind | null } = {}): Promise<SpeichernErgebnis> {
  return frage('speichern', { ref, plan, ...zusatz })
}

export interface RueckmeldungArg {
  ref: string
  planId: string
  sitzung: number
  ergebnis: Rueckmeldung['ergebnis']
  ziele?: { code: string; richtung: 'gelingt' | 'mit-hilfe' | 'noch-nicht' }[]
  /** Schlüssel aus hallo.chips */
  chips?: string[]
  /** Stimme des Kindes (E-M15): Ref des gewählten Schritts, Daumen am Schluss */
  kind?: { wahl?: string; daumen?: 'hoch' | 'runter' }
  ereignisse?: Ereignis[]
  /** P7: „Stunde gehalten“ speichert den aktuellen Plan mit (eine Dossier-Änderung) */
  plan?: Plan
  vorlieben?: VorliebenKind | null
  am?: string
}
/** „Stunde gehalten“ – die Notiz schreibt der Hub (nur aus Geklicktem), dazu Haken und Protokollzeile. */
export function rueckmeldung(arg: RueckmeldungArg): Promise<{ notizId: string | null; planId: string; rev?: number; hinweis?: string }> {
  return frage('rueckmeldung', arg)
}

/** Änderungen am Kind (d.passgenau) – nur Geändertes (PROTOKOLL.md, „vorlieben“). */
export interface KindAenderungen {
  korrekturen?: Record<string, unknown>
  interessen?: string[] | null
  vorname?: boolean
  lernen?: boolean
  rituale?: { ankommen?: string; abschluss?: string }
  vorlieben?: VorliebenKind | null
  /** true = alles (Zeile im Protokoll), sonst ein Merkmal */
  zuruecksetzen?: true | string
  ereignisse?: Ereignis[]
}
export function vorlieben(ref: string, aenderungen: KindAenderungen): Promise<{ ok: boolean }> {
  return frage('vorlieben', { ref, aenderungen })
}

export interface PraxisListe {
  vorlagen: PraxisVorlage[]
  /** Ids zurückgezogener oder wegen Datenschutz gemeldeter Vorlagen (E-M9) */
  zurueckgezogen: string[]
}
export function praxisListe(filter?: { ziel?: string; nurFreigegeben?: boolean; status?: string }): Promise<PraxisListe> {
  return frage<PraxisListe>('praxis-liste', filter ? { filter } : {})
}
export function praxisPruefen(ref: string, entwurf: unknown): Promise<{ treffer: { pfad: string; von: number; bis: number; art: string }[] }> {
  return frage('praxis-pruefen', { ref, entwurf })
}
/** Entwurf = fuerTeam(…).vorlage + Häkchen je eigenem Text (Pfade), anonym, Belastung, heikel */
export type PraxisEntwurf = Omit<PraxisVorlage, 'id' | 'version' | 'status' | 'erstellt'> & { bestaetigt: string[]; anonym: boolean; eigenerTausch?: boolean; id?: string }
export function praxisTeilen(entwurf: PraxisEntwurf, ref?: string | null, planId?: string): Promise<{ id: string; version: number; status: PraxisVorlage['status'] }> {
  return frage('praxis-teilen', { entwurf, ...(ref ? { ref } : {}), ...(planId ? { planId } : {}) })
}
export type PraxisSignalArt = 'genutzt' | 'hoch' | 'runter' | 'geklappt' | 'teils' | 'nicht' | 'melden'
export function praxisSignal(id: string, art: PraxisSignalArt, grund?: 'datenschutz' | 'fachlich' | 'unpassend'): Promise<{ ok: boolean; status?: string }> {
  return frage('praxis-signal', { id, art, ...(grund ? { grund } : {}) })
}
export type KuratierAktion = 'freigeben' | 'einblenden' | 'ablehnen' | 'ausblenden' | 'zurueckziehen'
export function praxisKuratieren(id: string, aktion: KuratierAktion, opt: { checkliste?: Record<'datenschutz' | 'alter' | 'faden' | 'wirksamkeit', boolean>; grund?: string } = {}): Promise<{ status: PraxisVorlage['status'] | 'abgelehnt' }> {
  return frage('praxis-kuratieren', { id, aktion, ...opt })
}

// --- Korrekturen: gespeicherte Form (Hub) ↔ Zustand der Oberfläche ---------------------------------------------

const wertVon = (x: unknown): unknown => (x && typeof x === 'object' && !Array.isArray(x) && 'wert' in (x as object) ? (x as { wert: unknown }).wert : x)
const HILFT = ['stundenleiste', 'bewegungspausen', 'reizarm', 'bildplan'] as const
const VORSICHT = ['familie', 'trauer', 'koerper', 'heikel', 'reiz', 'trauma'] as const

/** Gespeicherte Korrekturen (d.passgenau.kind) → Zustand der Oberfläche. Der Hub hat sie im Profil schon angewandt; hier
 *  nur, damit „Das weiß ich schon“ zeigt, was korrigiert ist, und Abgewähltes wieder einschalten kann. */
export function korrekturenAusHub(kind: KindAngaben | undefined): Korrekturen {
  const k: Korrekturen = {}
  const roh = (kind?.korrekturen ?? {}) as Record<string, unknown>
  const w = (key: string) => wertVon(roh[key])
  // Zugang, Bestätigung, Stufe, Sprache und Wörter hat der Hub im Profil schon angewandt (mit der Regel „bis eine neuere
  // Quelle kommt“) – sie hier noch einmal anzuwenden, könnte eine neuere Quelle überdecken.
  const zi = w('ziele') as { aus?: string[]; reihenfolge?: string[] } | undefined
  if (zi?.aus?.length) k.ziele = Object.fromEntries(zi.aus.map((c) => [c, false]))
  if (zi?.reihenfolge?.length) k.reihe = zi.reihenfolge
  const th = w('themen') as { aus?: string[] } | undefined
  if (th?.aus?.length) k.themen = Object.fromEntries(th.aus.map((c) => [c, false]))
  const vo = w('vorsicht') as { an?: string[]; aus?: string[] } | undefined
  if (vo && (vo.an?.length || vo.aus?.length)) k.vorsicht = { ...Object.fromEntries((vo.aus ?? []).map((x) => [x, false])), ...Object.fromEntries((vo.an ?? []).map((x) => [x, true])) }
  const hi = w('hilft')
  if (Array.isArray(hi)) k.hilft = Object.fromEntries(HILFT.map((h) => [h, hi.includes(h)]))
  const dw = w('darfWieder')
  if (Array.isArray(dw) && dw.length) k.frei = Object.fromEntries(dw.map((x) => [String(x), true]))
  if (Array.isArray(kind?.interessen)) k.interessen = kind!.interessen!
  if (typeof kind?.vorname === 'boolean') k.vorname = kind.vorname
  if (kind?.lernen === false) k.lernen = false
  return k
}

/** Was sich an den Korrekturen geändert hat → Änderungen für „vorlieben“ (nur Geändertes; null löscht). */
export function korrekturenFuerHub(alt: Korrekturen, neu: Korrekturen, roh: Pick<Profil, 'ziele' | 'hilft' | 'vorsicht'>): KindAenderungen {
  const form = (k: Korrekturen): Record<string, unknown> => {
    const ziele: ProfilZiel[] = roh.ziele
    const aus = ziele.filter((z) => k.ziele?.[z.code] === false).map((z) => z.code)
    return {
      lesen: k.zugang?.lesen ?? null,
      schreiben: k.zugang?.schreiben ?? null,
      bild: k.zugang?.bild ?? null,
      tempo: k.zugang?.tempo ?? null,
      struktur: k.zugang?.struktur ?? null,
      zugangBestaetigt: k.zugangBestaetigt ? true : null,
      stufe: k.stufe ?? null,
      sprache: k.sprache ?? null,
      woerter: k.woerter === false ? [] : null,
      ziele: aus.length || k.reihe?.length ? { aus, reihenfolge: k.reihe ?? [] } : null,
      themen: Object.values(k.themen ?? {}).some((x) => x === false) ? { aus: Object.keys(k.themen!).filter((x) => k.themen![x] === false) } : null,
      vorsicht: k.vorsicht && Object.keys(k.vorsicht).length ? { an: VORSICHT.filter((v) => k.vorsicht![v] === true), aus: VORSICHT.filter((v) => k.vorsicht![v] === false && v !== 'heikel') } : null,
      hilft: k.hilft && Object.keys(k.hilft).length ? HILFT.filter((h) => (k.hilft![h] !== undefined ? k.hilft![h] : (roh.hilft ?? []).includes(h))) : null,
      darfWieder: Object.keys(k.frei ?? {}).filter((x) => k.frei![x]).length ? Object.keys(k.frei!).filter((x) => k.frei![x]) : null,
    }
  }
  const a = form(alt)
  const b = form(neu)
  const korrekturen: Record<string, unknown> = {}
  for (const key of Object.keys(b)) if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) korrekturen[key] = b[key]
  const erg: KindAenderungen = {}
  if (Object.keys(korrekturen).length) erg.korrekturen = korrekturen
  if (JSON.stringify(alt.interessen) !== JSON.stringify(neu.interessen) && neu.interessen) erg.interessen = neu.interessen
  if (alt.vorname !== neu.vorname && typeof neu.vorname === 'boolean') erg.vorname = neu.vorname
  if (alt.lernen !== neu.lernen && typeof neu.lernen === 'boolean') erg.lernen = neu.lernen
  return erg
}

/** Start der Toolbox aus dem Hub: #passgenau=<ref>&weg=schnell|leicht|gruendlich&ziel=V-21 */
export interface PassgenauStart {
  ref: string | null
  weg: 'gruendlich' | 'schnell' | 'leicht' | null
  ziel: string | null
}
export function startAusHash(hash: string): PassgenauStart {
  const p = new URLSearchParams(hash.replace(/^#\/?/, ''))
  const ref = p.get('passgenau')
  const weg = p.get('weg')
  return {
    ref: ref && /^[\w-]{3,64}$/.test(ref) ? ref : null,
    weg: weg === 'gruendlich' || weg === 'schnell' || weg === 'leicht' ? weg : null,
    ziel: p.get('ziel')?.toUpperCase().replace(/[^A-Z0-9-]/g, '') || null,
  }
}
