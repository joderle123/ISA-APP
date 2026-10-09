// Urheber-Vermerk für alles, was mit KI erstellt wurde: Arbeitsblätter, Einheiten und
// Grundlagen des Skills-Kurses, KI-Materialien. Nur hier steht der Text – PDF, Druck und
// Ansicht holen ihn von hier. Digitalisierte Originale der Kolleginnen und Kollegen und
// die Team-Ablage bekommen ihn nicht.
import type { Material } from '../types/material'
import type { Sprache } from '../blatt/typen'

/** Vermerk je Sprache (luxemburgische Inhalte: Deutsch). */
export const URHEBER: Record<Sprache, string> = {
  de: '© 2026 Joey Guedes, Psychologe · CDSE',
  fr: '© 2026 Joey Guedes, psychologue · CDSE',
}

/** Autor in den PDF-Angaben (Dokumenteigenschaften). */
export const URHEBER_NAME = 'Joey Guedes'

/** Spielschule: alle Blätter, Zusatzseiten und die Forscherkartei sind von Michèle Wagner – ohne CDSE und ohne
 *  Logo (Wunsch des Teams). Der Rest der Toolbox behält URHEBER. */
export const URHEBER_SPIELSCHULE: Record<Sprache, string> = {
  de: '© 2026 Michèle Wagner',
  fr: '© 2026 Michèle Wagner',
}
export const URHEBER_NAME_SPIELSCHULE = 'Michèle Wagner'

export interface Urheberschaft {
  /** Vermerk je Sprache */
  text: Record<Sprache, string>
  /** Autor in den PDF-Angaben */
  name: string
  /** CDSE-Logo zeigen */
  logo: boolean
  /** Marke in der Fußzeile und als Ersteller der PDF */
  marke: Record<Sprache, string>
}

/** Wer steht auf einem Blatt dieses Bereichs? */
export function urheberschaft(bereich?: string): Urheberschaft {
  return bereich === 'spielschule'
    ? { text: URHEBER_SPIELSCHULE, name: URHEBER_NAME_SPIELSCHULE, logo: false, marke: { de: 'Spielschule', fr: 'Préscolaire' } }
    : { text: URHEBER, name: URHEBER_NAME, logo: true, marke: { de: 'CDSE Toolbox', fr: 'CDSE Toolbox' } }
}

/** Mit KI erstelltes Material (nicht Original, nicht Team-Ablage). */
export function vonKi(m: Pick<Material, 'source'>): boolean {
  return m.source === 'generated'
}
