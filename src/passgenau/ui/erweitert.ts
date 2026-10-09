// Passgenau – was der Vertrag (src/passgenau/typen.ts) noch nicht trägt, die Oberfläche aber braucht.
import type { Blatt } from '../../blatt/typen'
import type { Sprache } from '../typen'

/** Schalter des Hubs (E-M11): window.CDSE_PASSGENAU in hub-apps.js */
export interface Schalter {
  an: boolean
  lernen: boolean
  teilen: boolean
  freigabe: boolean
  loeschenNachMonaten?: number
}
export const SCHALTER_VORGABE: Schalter = { an: true, lernen: true, teilen: true, freigabe: true, loeschenNachMonaten: 24 }

/** Schalter lesen: zuerst aus der Antwort auf „hallo“ (Feld `schalter`), sonst aus dem Hub-Fenster (gleicher Ursprung),
 *  sonst aus diesem Fenster, sonst Vorgabe. */
export function schalterLesen(ausHallo?: Partial<Schalter> | null): Schalter {
  const kandidaten: unknown[] = [ausHallo]
  for (const w of [() => window.parent, () => window.opener as Window | null, () => window]) {
    try {
      const f = w() as (Window & { CDSE_PASSGENAU?: Partial<Schalter> }) | null
      if (f && f.CDSE_PASSGENAU) kandidaten.push(f.CDSE_PASSGENAU)
    } catch {
      /* anderer Ursprung */
    }
  }
  const s = kandidaten.find((x) => x && typeof x === 'object') as Partial<Schalter> | undefined
  return { ...SCHALTER_VORGABE, ...(s ?? {}) }
}

/** Kern-Erweiterung des Blatts (im Kern-Branch in src/blatt/typen.ts): „Mein Ziel“ unter dem Titel, Herkunft im Fuß */
export type PassgenauBlatt = Blatt & { passgenau?: { ziel?: Partial<Record<Sprache, string>>; herkunft?: string } }
export const blattZusatz = (b: Blatt) => (b as PassgenauBlatt).passgenau
