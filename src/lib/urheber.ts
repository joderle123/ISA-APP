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

/** Mit KI erstelltes Material (nicht Original, nicht Team-Ablage). */
export function vonKi(m: Pick<Material, 'source'>): boolean {
  return m.source === 'generated'
}
