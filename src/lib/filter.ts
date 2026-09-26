import type {
  AgeLevel,
  EldibDomain,
  EtepStufe,
  Language,
  Material,
  MaterialType,
  ParticipantMode,
} from '../types/material'
import { eldibGoalById, themeLabel } from '../data/taxonomy'

/** Provenance value of a material. */
export type MaterialSource = Material['source']

export interface FilterState {
  search: string
  themes: string[]
  ageLevels: AgeLevel[]
  types: MaterialType[]
  participantModes: ParticipantMode[]
  etepStufen: EtepStufe[]
  eldibDomains: EldibDomain[]
  eldibGoals: string[]
  tags: string[]
  authors: string[]
  languages: Language[]
  sources: MaterialSource[]
  /** Only materials that ship a printable worksheet ("Arbeitsblatt"). */
  hasWorksheet: boolean
  /** Minimum star rating (0 = any). Ratings live in localStorage (per device). */
  minRating: number
  /** Only materials the user has not rated yet. */
  onlyUnrated: boolean
}

export const emptyFilter: FilterState = {
  search: '',
  themes: [],
  ageLevels: [],
  types: [],
  participantModes: [],
  etepStufen: [],
  eldibDomains: [],
  eldibGoals: [],
  tags: [],
  authors: [],
  languages: [],
  sources: [],
  hasWorksheet: false,
  minRating: 0,
  onlyUnrated: false,
}

/** Sort order of the result list. */
export type SortMode = 'empfohlen' | 'titel' | 'bewertung'

export type RatingLookup = Record<string, number>

// --- Search -----------------------------------------------------------------

/** Lower-case, strip diacritics (é→e, ü→u, ë→e), ß→ss — so „Glecks“ finds
 *  „Glécks“ and „gluck“ finds „Glück“. */
export function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
}

interface SearchDoc {
  title: string
  tags: string
  all: string
}
const docCache = new WeakMap<Material, SearchDoc>()

function searchDoc(m: Material): SearchDoc {
  let d = docCache.get(m)
  if (!d) {
    const title = fold(m.title)
    const tags = fold([...m.tags, ...m.themes.map(themeLabel)].join(' '))
    const all = [
      title,
      tags,
      fold(m.author ?? ''),
      fold(m.shortDescription),
      fold(m.remark ?? ''),
      fold(m.materialsNeeded ?? ''),
      fold(m.ablauf.map((a) => `${a.title ?? ''} ${a.text}`).join(' ')),
      fold(m.eldibGoals.join(' ')),
      m.id,
    ].join(' \n ')
    d = { title, tags, all }
    docCache.set(m, d)
  }
  return d
}

export function searchTokens(q: string): string[] {
  return fold(q).split(/\s+/).filter(Boolean)
}

const WORD_CHAR = /[\p{L}\p{N}]/u

/** Does a (folded) search token occur in the (folded) text? Tokens of one or
 *  two characters only as a whole word („KI“ not in „Skills“ or „Kinder“),
 *  three characters at a word start („Wut“ → „Wutvulkan“, „ich“ not in
 *  „nicht“), longer ones anywhere, so German compounds still match
 *  („Angst“ → „Prüfungsangst“). Also used by the Arbeitsblätter. */
export function tokenMatch(text: string, t: string): boolean {
  if (t.length > 3) return text.includes(t)
  const start = WORD_CHAR.test(t[0])
  const end = t.length < 3 && WORD_CHAR.test(t[t.length - 1])
  for (let i = text.indexOf(t); i >= 0; i = text.indexOf(t, i + 1)) {
    if (start && i > 0 && WORD_CHAR.test(text[i - 1])) continue
    if (end && i + t.length < text.length && WORD_CHAR.test(text[i + t.length])) continue
    return true
  }
  return false
}

/** Relevance of a material for the search tokens (0 = no match). Every token
 *  must appear somewhere (AND, see tokenMatch); title and tag hits weigh more. */
export function searchScore(m: Material, tokens: string[]): number {
  if (!tokens.length) return 1
  const d = searchDoc(m)
  let score = 0
  for (const t of tokens) {
    if (!tokenMatch(d.all, t)) return 0
    score += tokenMatch(d.title, t) ? 6 : tokenMatch(d.tags, t) ? 3 : 1
  }
  return score
}

// --- Matching (with optional facet exclusion for counts) ----------------------

export type FacetKey =
  | 'themes'
  | 'ageLevels'
  | 'types'
  | 'participantModes'
  | 'etepStufen'
  | 'eldibDomains'
  | 'eldibGoals'
  | 'tags'
  | 'authors'
  | 'languages'
  | 'sources'
  | 'hasWorksheet'
  | 'rating'

const FACETS: FacetKey[] = [
  'themes',
  'ageLevels',
  'types',
  'participantModes',
  'etepStufen',
  'eldibDomains',
  'eldibGoals',
  'tags',
  'authors',
  'languages',
  'sources',
  'hasWorksheet',
  'rating',
]

const some = <T,>(selected: T[], values: T[]) =>
  selected.length === 0 || selected.some((v) => values.includes(v))

const domainCache = new WeakMap<Material, Set<EldibDomain>>()
function domainsOf(m: Material): Set<EldibDomain> {
  let out = domainCache.get(m)
  if (!out) {
    out = new Set<EldibDomain>()
    for (const id of m.eldibGoals) {
      const d = eldibGoalById.get(id)?.domain
      if (d) out.add(d)
    }
    domainCache.set(m, out)
  }
  return out
}

function passes(key: FacetKey, m: Material, f: FilterState, ratings: RatingLookup): boolean {
  switch (key) {
    case 'themes':
      return some(f.themes, m.themes)
    case 'ageLevels':
      return some(f.ageLevels, m.ageLevels)
    case 'types':
      return some(f.types, m.type)
    case 'participantModes':
      return some(f.participantModes, m.participants.map((p) => p.mode))
    case 'etepStufen':
      return some(f.etepStufen, m.etepStufen)
    case 'eldibDomains': {
      if (!f.eldibDomains.length) return true
      const ds = domainsOf(m)
      return f.eldibDomains.some((d) => ds.has(d))
    }
    case 'eldibGoals':
      return some(f.eldibGoals, m.eldibGoals)
    case 'tags':
      return some(f.tags, m.tags)
    case 'authors':
      return some(f.authors, m.author ? [m.author] : [])
    case 'languages':
      return some(f.languages, [m.language])
    case 'sources':
      return some(f.sources, [m.source])
    case 'hasWorksheet':
      return !f.hasWorksheet || !!m.worksheet
    case 'rating': {
      const r = ratings[m.id] || 0
      if (f.minRating > 0 && r < f.minRating) return false
      if (f.onlyUnrated && r) return false
      return true
    }
  }
}

export function matches(m: Material, f: FilterState, ratings: RatingLookup = {}): boolean {
  if (searchScore(m, searchTokens(f.search)) === 0) return false
  return FACETS.every((k) => passes(k, m, f, ratings))
}

export function applyFilters(materials: Material[], f: FilterState, ratings: RatingLookup = {}): Material[] {
  const tokens = searchTokens(f.search)
  return materials.filter(
    (m) => searchScore(m, tokens) > 0 && FACETS.every((k) => passes(k, m, f, ratings)),
  )
}

/** How well a material fits the selected ELDiB goals: number of hits first,
 *  then how focused it is (fewer goals overall = more targeted). */
export function eldibFit(m: Material, goals: string[]): number {
  if (!goals.length) return 0
  const hits = goals.filter((g) => m.eldibGoals.includes(g)).length
  return hits * 100 - Math.min(m.eldibGoals.length, 99)
}

/** Filter + sort in one go. */
export function queryLibrary(
  materials: Material[],
  f: FilterState,
  ratings: RatingLookup,
  sort: SortMode,
): Material[] {
  const tokens = searchTokens(f.search)
  const scored: { m: Material; s: number; i: number }[] = []
  materials.forEach((m, i) => {
    const s = searchScore(m, tokens)
    if (s > 0 && FACETS.every((k) => passes(k, m, f, ratings))) scored.push({ m, s, i })
  })
  if (sort === 'titel') {
    scored.sort((a, b) => a.m.title.localeCompare(b.m.title, 'de', { sensitivity: 'base' }))
  } else if (sort === 'bewertung') {
    scored.sort((a, b) => (ratings[b.m.id] || 0) - (ratings[a.m.id] || 0) || a.i - b.i)
  } else if (tokens.length || f.eldibGoals.length) {
    // „Empfohlen“: beste Suchtreffer zuerst, dann beste Passung zu den ELDiB-Zielen.
    scored.sort(
      (a, b) =>
        b.s - a.s ||
        eldibFit(b.m, f.eldibGoals) - eldibFit(a.m, f.eldibGoals) ||
        a.i - b.i,
    )
  }
  return scored.map((x) => x.m)
}

// --- Facet counts ---------------------------------------------------------------

export interface FacetCounts {
  themes: Map<string, number>
  ageLevels: Map<string, number>
  types: Map<string, number>
  participantModes: Map<string, number>
  etepStufen: Map<number, number>
  eldibDomains: Map<string, number>
  eldibGoals: Map<string, number>
  tags: Map<string, number>
  authors: Map<string, number>
  languages: Map<string, number>
  sources: Map<string, number>
  hasWorksheet: number
  unrated: number
}

function inc<K>(map: Map<K, number>, key: K) {
  map.set(key, (map.get(key) || 0) + 1)
}

/**
 * Counts per filter option: how many results you get when you add that option
 * — all other active filters apply, the option's own group not. One pass: a
 * material counts for group G if it fails no filter group other than G.
 */
export function facetCounts(materials: Material[], f: FilterState, ratings: RatingLookup): FacetCounts {
  const c: FacetCounts = {
    themes: new Map(),
    ageLevels: new Map(),
    types: new Map(),
    participantModes: new Map(),
    etepStufen: new Map(),
    eldibDomains: new Map(),
    eldibGoals: new Map(),
    tags: new Map(),
    authors: new Map(),
    languages: new Map(),
    sources: new Map(),
    hasWorksheet: 0,
    unrated: 0,
  }
  const tokens = searchTokens(f.search)
  for (const m of materials) {
    if (searchScore(m, tokens) === 0) continue
    let failed: FacetKey | null = null
    let fails = 0
    for (const k of FACETS) {
      if (!passes(k, m, f, ratings)) {
        fails++
        failed = k
        if (fails > 1) break
      }
    }
    if (fails > 1) continue
    const counts = (k: FacetKey) => fails === 0 || failed === k
    if (counts('themes')) for (const t of m.themes) inc(c.themes, t)
    if (counts('ageLevels')) for (const a of m.ageLevels) inc(c.ageLevels, a)
    if (counts('types')) for (const t of m.type) inc(c.types, t)
    if (counts('participantModes'))
      for (const p of new Set(m.participants.map((x) => x.mode))) inc(c.participantModes, p)
    if (counts('etepStufen')) for (const e of m.etepStufen) inc(c.etepStufen, e)
    if (counts('eldibDomains')) for (const d of domainsOf(m)) inc(c.eldibDomains, d)
    if (counts('eldibGoals')) for (const g of m.eldibGoals) inc(c.eldibGoals, g)
    if (counts('tags')) for (const t of m.tags) inc(c.tags, t)
    if (counts('authors') && m.author) inc(c.authors, m.author)
    if (counts('languages')) inc(c.languages, m.language)
    if (counts('sources')) inc(c.sources, m.source)
    if (counts('hasWorksheet') && m.worksheet) c.hasWorksheet++
    if (counts('rating') && !ratings[m.id]) c.unrated++
  }
  return c
}

export function activeFilterCount(f: FilterState): number {
  return (
    (f.search.trim() ? 1 : 0) +
    f.themes.length +
    f.ageLevels.length +
    f.types.length +
    f.participantModes.length +
    f.etepStufen.length +
    f.eldibDomains.length +
    f.eldibGoals.length +
    f.tags.length +
    f.authors.length +
    f.languages.length +
    f.sources.length +
    (f.hasWorksheet ? 1 : 0) +
    (f.minRating > 0 ? 1 : 0) +
    (f.onlyUnrated ? 1 : 0)
  )
}

/** Unique tag list across a set of materials, most frequent first. */
export function collectTags(materials: Material[]): string[] {
  const n = new Map<string, number>()
  for (const m of materials) for (const t of m.tags) n.set(t, (n.get(t) || 0) + 1)
  return [...n.keys()].sort((a, b) => (n.get(b) || 0) - (n.get(a) || 0) || a.localeCompare(b, 'de'))
}

/** Unique, sorted author list (skips materials without an author). */
export function collectAuthors(materials: Material[]): string[] {
  const set = new Set<string>()
  for (const m of materials) if (m.author) set.add(m.author)
  return [...set].sort((a, b) => a.localeCompare(b, 'de'))
}
