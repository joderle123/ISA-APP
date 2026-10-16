// ---------------------------------------------------------------------------
// Neue farbige Motive aus dem Design-Umbau der Arbeitsblätter (16.10.2026):
// Dinge, die auf Karten und in Auswahlrastern oft vorkommen und bisher nur als
// graues Piktogramm da waren, und „wachsende“ Motive für Kurse (Teil für Teil).
// ICON_MOTIV: Piktogramm → farbiges Motiv mit derselben Bedeutung; die Bausteine
// zeigen für junge Stufen statt des Piktogramms das Motiv.
// ---------------------------------------------------------------------------

import type { Zeichnung } from './zeichnung'

export const NEU: Record<string, () => Zeichnung> = {}

/** Piktogramm-Name (ohne „icon:“) → Motiv-Name (ohne „motiv:“) */
export const ICON_MOTIV: Record<string, string> = {}
