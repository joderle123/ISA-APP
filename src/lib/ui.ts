import type { AgeLevel } from '../types/material'

/** Subtle per-cycle colours (echoing the SharePoint list styling). */
export const ageColors: Record<AgeLevel, string> = {
  C1: 'bg-sky-100 text-sky-700 ring-sky-200',
  C2: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  C3: 'bg-amber-100 text-amber-700 ring-amber-200',
  C4: 'bg-violet-100 text-violet-700 ring-violet-200',
  ES: 'bg-rose-100 text-rose-700 ring-rose-200',
}

export function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s
}

/** Visual identity of a material's provenance (AI draft ↔ CDSE / ISA-Team). */
export function sourceInfo(source: 'original' | 'cdse' | 'generated'): {
  short: string
  label: string
  title: string
  chip: string
} {
  if (source === 'generated')
    return {
      short: 'KI-Entwurf',
      label: 'KI-generierter Entwurf',
      title: 'KI-generierter Entwurf – vor dem Einsatz prüfen',
      chip: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
    }
  return {
    short: source === 'cdse' ? 'CDSE ✓' : 'ISA-Team ✓',
    label: source === 'cdse' ? 'Von CDSE-Mitarbeiter:in' : 'CDSE / ISA-Team',
    title: 'Geprüftes Material von CDSE / ISA-Team',
    chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  }
}
