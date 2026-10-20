// ---------------------------------------------------------------------------------------------------------------
// Vorschläge zu Arbeitsblättern – über die Brücke zum CDSE Hub (dieselbe wie Passgenau, src/passgenau/ui/hub.ts).
// Jede freigeschaltete Person schreibt zu einem Blatt, was fehlt oder besser sein könnte; der Hub sammelt alles
// verschlüsselt im Hub-Ordner und ordnet es für die Verwaltung nach Blatt (Hub: hub-quellen/blatt-vorschlaege.js).
//
//   blatt-vorschlaege        {blatt}                                         → VorschlagListe
//   blatt-vorschlag          {blatt, titel, bereich, nr, art, text, trotzdem} → VorschlagListe & {id}   (grund 'namen')
//   blatt-vorschlag-plus     {id}                                            → VorschlagListe   „Sehe ich auch so“
//   blatt-vorschlag-weg      {id}                                            → VorschlagListe   eigenen zurücknehmen
//
// Ohne Hub (Toolbox allein geöffnet) gibt es keine Vorschläge: Sie gehören dem Team, nicht dem PC.
// ---------------------------------------------------------------------------------------------------------------
import { frage, hubFenster, HubFehler } from '../passgenau/ui/hub'

export type VorschlagArt = 'uebung' | 'fehler' | 'schwer' | 'leicht' | 'gestaltung' | 'sprache' | 'idee' | 'sonst'

/** Dieselben Schlüssel wie im Hub (ARTEN in blatt-vorschlaege.js) */
export const VORSCHLAG_ARTEN: { key: VorschlagArt; text: string }[] = [
  { key: 'uebung', text: 'Übung fehlt' },
  { key: 'fehler', text: 'Fehler im Blatt' },
  { key: 'schwer', text: 'Zu schwer' },
  { key: 'leicht', text: 'Zu leicht' },
  { key: 'gestaltung', text: 'Bild & Gestaltung' },
  { key: 'sprache', text: 'Sprache & Übersetzung' },
  { key: 'idee', text: 'Idee' },
  { key: 'sonst', text: 'Sonstiges' },
]

export interface Vorschlag {
  id: string
  art: VorschlagArt
  artText?: string
  text: string
  /** ISO-Zeitpunkt */
  am: string
  /** Vorname – oder „du“ */
  von: string
  eigen: boolean
  /** wie viele andere es auch so sehen */
  plus: number
  ichPlus: boolean
}
export interface VorschlagListe {
  liste: Vorschlag[]
  /** darf die Sammlung im Hub sehen (Verwaltung) */
  sammeln: boolean
  ich: string
  id?: string
}
/** Woran der Hub das Blatt erkennt – auch für die Sammlung (Titel, Bereich, Nummer) */
export interface BlattKennung {
  blatt: string
  titel: string
  bereich: string
  nr: string
}

export const mitHub = (): boolean => !!hubFenster()

export function vorschlaegeLesen(blatt: string): Promise<VorschlagListe> {
  return frage<VorschlagListe>('blatt-vorschlaege', { blatt }, 6000)
}
export function vorschlagSenden(k: BlattKennung, art: VorschlagArt, text: string, trotzdem = false): Promise<VorschlagListe> {
  return frage<VorschlagListe>('blatt-vorschlag', { ...k, art, text, trotzdem }, 20000)
}
export function vorschlagPlus(id: string): Promise<VorschlagListe> {
  return frage<VorschlagListe>('blatt-vorschlag-plus', { id }, 20000)
}
export function vorschlagWeg(id: string): Promise<VorschlagListe> {
  return frage<VorschlagListe>('blatt-vorschlag-weg', { id }, 20000)
}

/** Verständlicher Satz zu einem Fehler der Brücke */
export function vorschlagFehlerText(e: unknown): string {
  if (e instanceof HubFehler) {
    if (e.grund === 'unbekannt') return 'Der Hub ist älter als die Toolbox – nach einem Update des Hubs gehen Vorschläge.'
    if (e.grund === 'kein-bereich') return 'Im Hub zuerst anmelden und die Schülerdaten öffnen – dann gehen Vorschläge.'
    if (e.grund === 'abgemeldet') return 'Im Hub ist niemand angemeldet.'
    if (e.grund === 'zeitlimit' || e.grund === 'kein-hub') return 'Der Hub antwortet nicht. Vorschläge gehen, wenn die Toolbox aus dem Hub geöffnet ist.'
    return e.message
  }
  return e instanceof Error ? e.message : 'Das ging nicht.'
}
