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
import type { DossierPassgenau, Ereignis, HalloArg, HalloErgebnis, HubAntwort, HubFrage, HubOp, Plan, PraxisVorlage, Profil, VorliebenKind } from '../typen'
import { PASSGENAU_PLAN_V, PASSGENAU_PROFIL_V, PASSGENAU_PROTO } from '../typen'
import type { Schalter } from './erweitert'

/** Antwort auf „hallo“ (T-M11) plus optionale Zusätze: Kuratier-Recht, Fachkraft („Nele · ISA“), Schalter CDSE_PASSGENAU */
export type Hallo = HalloErgebnis & {
  rechte: HalloErgebnis['rechte'] & { kuratieren?: boolean }
  ich?: { name?: string; team?: string; funktion?: string }
  schalter?: Partial<Schalter>
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
  constructor(grund: string, zeitlimit = false) {
    super(grund)
    this.grund = grund
    this.zeitlimit = zeitlimit
  }
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
  else f.fehler(new HubFehler(d.grund || 'Der Hub hat abgelehnt.'))
}

/** Eine Frage an den Hub; die Antwort kommt über n zurück. */
export function frage<T = unknown>(op: HubOp, arg?: unknown, ms = 8000): Promise<T> {
  const ziel = hubFenster()
  if (!ziel) return Promise.reject(new HubFehler('Kein Hub verbunden.'))
  if (!hoertZu) {
    window.addEventListener('message', empfangen)
    hoertZu = true
  }
  const n = naechste++
  return new Promise<T>((ok, fehler) => {
    const timer = window.setTimeout(() => {
      offen.delete(n)
      fehler(new HubFehler('Der Hub antwortet nicht.', true))
    }, ms)
    offen.set(n, { op, ok: ok as (e: unknown) => void, fehler, timer })
    const nachricht: HubFrage = { cdsePassgenau: 1, n, op, arg }
    try {
      ziel.postMessage(nachricht, ZIEL_URSPRUNG())
    } catch (e) {
      window.clearTimeout(timer)
      offen.delete(n)
      fehler(new HubFehler(e instanceof Error ? e.message : 'Nachricht an den Hub nicht möglich.'))
    }
  })
}

// --- Ops (Konzept 9.2) ------------------------------------------------------------------------------------------

/** „hallo“ – mit kurzem Zeitlimit (1,5 s): ohne Antwort plant die Toolbox ohne Kind. */
export function hallo(ms = 1500): Promise<Hallo> {
  return frage<Hallo>('hallo', TOOLBOX_VERSION, ms)
}

/** Profil plus (optional, noch nicht im Vertrag) die gespeicherten Pläne und Ereignisse dieses Kindes. */
export type ProfilVomHub = Profil & { verlauf?: { plaene?: Plan[]; ereignisse?: Ereignis[] }; kind?: Partial<DossierPassgenau['kind']> }

export function profil(ref: string): Promise<ProfilVomHub> {
  return frage<ProfilVomHub>('profil', { ref })
}

/** Plan speichern. Mit dabei (gebündelt, T-M9): die gesammelten Ereignisse und die Kind-Vorlieben – eine Dossier-Änderung. */
export function speichern(ref: string, plan: Plan, zusatz?: { ereignisse?: Ereignis[]; vorlieben?: VorliebenKind | null; grund?: 'knopf' | 'druck' | 'gehalten' }): Promise<{ planId: string }> {
  return frage('speichern', { ref, plan, ...zusatz })
}

export function rueckmeldung(arg: {
  ref: string
  planId: string
  sitzung: number
  ergebnis: import('../typen').Rueckmeldung['ergebnis']
  ziele: { code: string; richtung: 'gelingt' | 'mit-hilfe' | 'noch-nicht' }[]
  chips: string[]
  ereignisse: Ereignis[]
  /** Text der Notiz (aus Chips gebaut) – der Hub schreibt ihn als Beobachtung ins Dossier */
  notiz?: string
  /** Quellblätter, die „gemacht“ bekommen (blatt:<id>) */
  gemacht?: string[]
  /** P7: „Stunde gehalten“ speichert den Plan mit (eine Dossier-Änderung) */
  plan?: Plan
  vorlieben?: VorliebenKind | null
  /** Stimme des Kindes (E-M15) */
  kind?: { wahl?: string; daumen?: 'hoch' | 'runter' }
}): Promise<{ notizId: string | null }> {
  return frage('rueckmeldung', arg)
}

/** Änderungen am Kind (d.passgenau): Vorlieben der Kind-Ebene, Korrekturen, Interessen, Vorname, Rituale, Ereignisse. */
export interface KindAenderungen {
  vorlieben?: VorliebenKind | null
  kind?: Partial<DossierPassgenau['kind']>
  ereignisse?: Ereignis[]
  /** Zeile im Protokoll des Dossiers, z. B. „Passgenau: Vorlieben zurückgesetzt“ */
  protokoll?: string
}
export function vorlieben(ref: string, aenderungen: KindAenderungen): Promise<{ ok: boolean }> {
  return frage('vorlieben', { ref, aenderungen })
}

export type PraxisListe = PraxisVorlage[]
export function praxisListe(filter?: Record<string, unknown>): Promise<PraxisListe> {
  return frage<PraxisListe>('praxis-liste', filter ? { filter } : {})
}
export function praxisPruefen(ref: string, entwurf: unknown): Promise<{ treffer: { pfad: string; von: number; bis: number; art: string }[] }> {
  return frage('praxis-pruefen', { ref, entwurf })
}
export function praxisTeilen(entwurf: unknown): Promise<{ id: string; version: number; status: PraxisVorlage['status'] }> {
  return frage('praxis-teilen', { entwurf })
}
export type PraxisSignalArt = 'genutzt' | 'hoch' | 'runter' | 'geklappt' | 'teils' | 'nicht' | 'melden-datenschutz' | 'melden-fachlich' | 'melden-unpassend'
export function praxisSignal(id: string, art: PraxisSignalArt): Promise<{ ok: boolean }> {
  return frage('praxis-signal', { id, art })
}
export function praxisKuratieren(id: string, aktion: 'freigeben' | 'ausblenden' | 'zurueckziehen' | 'offiziell', grund?: string): Promise<{ status: PraxisVorlage['status'] }> {
  return frage('praxis-kuratieren', { id, aktion, grund })
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
