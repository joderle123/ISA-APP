// Passgenau – Vorlieben der Fachkraft (Konzept 6.2/6.9): localStorage „passgenau-vorlieben-v1“.
// Der Hub legt alle App-Daten im persönlichen, verschlüsselten Tresor ab; hier nur lesen/schreiben mit try/catch –
// ohne Speicher (privates Fenster, gesperrt) läuft Passgenau mit dem Kaltstart weiter.
import type { Plan, VorliebenFachkraft } from '../typen'

export const SCHLUESSEL = 'passgenau-vorlieben-v1'

export type FachkraftVorlieben = VorliebenFachkraft & {
  /** wie oft schon fürs Team geteilt (die ersten Male: „Nur Original-Bausteine“ vorgewählt) */
  geteilt?: number
  /** zuletzt gewählte Dauer in Weg 2 */
  dauer?: number
}

export function leer(): FachkraftVorlieben {
  return { v: 1, erkundung: 0.2, zurueckgesetzt: null, z: {}, eigeneVorlagen: [] }
}

export function laden(): FachkraftVorlieben {
  try {
    const roh = localStorage.getItem(SCHLUESSEL)
    if (!roh) return leer()
    const j = JSON.parse(roh) as Partial<FachkraftVorlieben>
    if (!j || j.v !== 1 || typeof j.z !== 'object' || !j.z) return leer()
    return {
      ...leer(),
      ...j,
      erkundung: [0, 0.1, 0.2, 0.3].includes(Number(j.erkundung)) ? Number(j.erkundung) : 0.2,
      eigeneVorlagen: Array.isArray(j.eigeneVorlagen) ? j.eigeneVorlagen : [],
    }
  } catch {
    return leer()
  }
}

export function sichern(v: FachkraftVorlieben): boolean {
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify(v))
    return true
  } catch {
    return false
  }
}

/** Eigene Vorlage: der Plan ohne Kind (ohne Rückmeldungen, Daten, Begründungen) */
export function alsVorlage(plan: Plan, titel: string): { id: string; titel: string; inhalt: Plan } {
  const inhalt: Plan = {
    ...plan,
    id: 'ev-' + Date.now().toString(36),
    kinder: [],
    auftrag: undefined,
    sitzungen: plan.sitzungen.map((s) => ({
      ...s,
      status: 'geplant',
      datum: null,
      rueckmeldung: null,
      hinweise: undefined,
      schritte: s.schritte.map((x) => ({ ref: x.ref, h: x.h, rolle: x.rolle, min: x.min, ...(x.ueber ? { ueber: x.ueber } : {}) })),
    })),
  }
  return { id: inhalt.id, titel, inhalt }
}
