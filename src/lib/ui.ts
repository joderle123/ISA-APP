import type { CSSProperties } from 'react'
import type { EldibDomain, Material } from '../types/material'
import { eldibDomainById, eldibGoalById, materialTypeById } from '../data/taxonomy'
import type { IconName } from '../components/Icon'

/** Visual identity of a material's provenance (AI draft ↔ CDSE / ISA-Team). */
export function sourceInfo(source: Material['source']): {
  short: string
  label: string
  title: string
  badge: string
  icon: IconName
} {
  if (source === 'generated')
    return {
      short: 'KI-Entwurf',
      label: 'KI-Entwurf',
      title: 'KI-generierter Entwurf – vor dem Einsatz fachlich prüfen',
      badge: 'badge badge-ki',
      icon: 'sparkles',
    }
  if (source === 'cdse')
    return {
      short: 'Team-Ablage',
      label: 'Team-Ablage',
      title: 'Von einer CDSE-Mitarbeiterin / einem CDSE-Mitarbeiter hochgeladen',
      badge: 'badge badge-upload',
      icon: 'folder',
    }
  return {
    short: 'ISA-Team',
    label: 'CDSE / ISA-Team',
    title: 'Geprüftes Material von CDSE / ISA-Team',
    badge: 'badge badge-ok',
    icon: 'checkCircle',
  }
}

/** ELDiB domain of a goal code ("SOZ-32" → "SOZ"). */
export function domainOf(code: string): EldibDomain | null {
  const d = eldibGoalById.get(code)?.domain ?? code.split('-')[0]
  return d === 'V' || d === 'K' || d === 'SOZ' || d === 'KOG' ? d : null
}

/** CSS custom property `--bc` (Bereichsfarbe) for a code or domain. */
export function domainStyle(codeOrDomain: string): CSSProperties {
  const d = domainOf(codeOrDomain) ?? (codeOrDomain as EldibDomain)
  const color = eldibDomainById.get(d)?.color
  return color ? ({ '--bc': color } as CSSProperties) : {}
}

/** "V-13" → "V-13 Aktivitäten" (label from the ELDiB catalogue, if known). */
export function goalText(code: string): string {
  const g = eldibGoalById.get(code)
  return g ? `${code} ${g.label}` : code
}

/** German labels of a material's formats ("Aktivitéit" → "Aktivität"). */
export function typeLabels(m: Pick<Material, 'type'>): string {
  return m.type.map((t) => materialTypeById.get(t)?.labelDe ?? t).join(' · ')
}

/** Variant chip labels come with a leading emoji ("🚀 Weltall") — the UI shows
 *  calm text only; the data stays untouched. */
export function plainLabel(label: string): string {
  return (
    label
      .replace(/^(?:\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Regional_Indicator}|[\u{E0020}-\u{E007F}]|‍|️|⃣|\s)+/u, '')
      .trim() || label
  )
}
