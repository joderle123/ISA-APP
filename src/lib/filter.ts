import type {
  AgeLevel,
  EldibDomain,
  EtepStufe,
  Material,
  MaterialType,
} from '../types/material'
import { eldibGoalById } from '../data/taxonomy'

export interface FilterState {
  search: string
  themes: string[]
  ageLevels: AgeLevel[]
  types: MaterialType[]
  etepStufen: EtepStufe[]
  eldibDomains: EldibDomain[]
  eldibGoals: string[]
}

export const emptyFilter: FilterState = {
  search: '',
  themes: [],
  ageLevels: [],
  types: [],
  etepStufen: [],
  eldibDomains: [],
  eldibGoals: [],
}

const some = <T,>(selected: T[], values: T[]) =>
  selected.length === 0 || selected.some((v) => values.includes(v))

function matchesSearch(m: Material, q: string): boolean {
  if (!q) return true
  const hay = [
    m.title,
    m.author ?? '',
    m.shortDescription,
    m.tags.join(' '),
    m.ablauf.map((a) => `${a.title ?? ''} ${a.text}`).join(' '),
  ]
    .join(' ')
    .toLowerCase()
  // every whitespace-separated token must appear (AND search)
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((tok) => hay.includes(tok))
}

export function matches(m: Material, f: FilterState): boolean {
  if (!matchesSearch(m, f.search)) return false
  if (!some(f.themes, m.themes)) return false
  if (!some(f.ageLevels, m.ageLevels)) return false
  if (!some(f.types, m.type)) return false
  if (!some(f.etepStufen, m.etepStufen)) return false
  if (f.eldibGoals.length && !f.eldibGoals.some((g) => m.eldibGoals.includes(g)))
    return false
  if (f.eldibDomains.length) {
    const domains = new Set(
      m.eldibGoals.map((id) => eldibGoalById.get(id)?.domain).filter(Boolean),
    )
    if (!f.eldibDomains.some((d) => domains.has(d))) return false
  }
  return true
}

export function applyFilters(materials: Material[], f: FilterState): Material[] {
  return materials.filter((m) => matches(m, f))
}

export function activeFilterCount(f: FilterState): number {
  return (
    (f.search ? 1 : 0) +
    f.themes.length +
    f.ageLevels.length +
    f.types.length +
    f.etepStufen.length +
    f.eldibDomains.length +
    f.eldibGoals.length
  )
}
