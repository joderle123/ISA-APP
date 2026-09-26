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
// One search for the whole Toolbox (Einheiten, Arbeitsblätter, Material-Finder,
// filter lists, Team): case and accents don't matter, umlauts match both ways
// („Gefühle“ = „Gefuehle“, „Glück“ = „Gluck“), ß = ss, ELDiB codes in any
// spelling („KOG-29“, „kog29“, „KOG 29“) and levels by code or name („C3“,
// „Cycle 3“, „Spielschule“, „Sekundar“). Texts are prepared once (searchText,
// cached per material or sheet), not on every keystroke.

/** Lower-case, strip diacritics (é→e, ü→u, ë→e), ß→ss — so „Glecks“ finds
 *  „Glécks“ and „gluck“ finds „Glück“. */
export function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
}

/** Like fold, but German umlauts as two letters: ä→ae, ö→oe, ü→ue. */
function foldUmlaut(s: string): string {
  return fold(s.normalize('NFC').replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue'))
}

/** Searchable form of a text, in both spellings of the umlauts (see fold and
 *  foldUmlaut) – so „Glück“, „Glueck“ and „Gluck“ find each other. */
export function searchText(s: string): string {
  const a = fold(s)
  const b = foldUmlaut(s)
  return a === b ? a : a + '\n' + b
}

/** How the levels are called in the app besides their codes (taxonomy and
 *  filter labels), matched at word starts against an item's levels – so
 *  „Sekundar“ finds ES, but „Schule“ does not find every C1 or ES item. */
const LEVEL_WORDS: Record<string, string[]> = {
  C1: ['cycle', 'precoce', 'spillschoul', 'spielschule'],
  C2: ['cycle'],
  C3: ['cycle'],
  C4: ['cycle'],
  ES: ['enseignement', 'secondaire', 'sekundarschule'],
}

export interface SearchToken {
  /** The word in both spellings (see searchText). */
  forms: string[]
  /** Letters as typed (an umlaut counts once) – decides how the word must match. */
  len: number
  /** ELDiB code such as „kog-29“: only as a whole word („kog-2“ is not „kog-29“). */
  code: boolean
  /** A level (C1–C4, ES): matched against the levels, not the text. */
  level?: AgeLevel
}

const LEVEL_CODES: AgeLevel[] = ['C1', 'C2', 'C3', 'C4', 'ES']

export function searchTokens(q: string): SearchToken[] {
  const s = q
    .toLowerCase()
    .normalize('NFC')
    // ELDiB codes: „KOG 29“, „kog29“, „KOG–29“ → „kog-29“
    .replace(/(^|[^\p{L}\p{N}])(v|k|soz|kog)\s*[-–_]?\s*(\d{1,2})(?!\p{N})/gu, '$1$2-$3')
    // levels: „Cycle 3“, „Zyklus 3“, „c 3“ → „c3“
    .replace(/(^|[^\p{L}\p{N}])(?:cycle|zyklus|c)\s*[-–_]?\s*([1-4])(?!\p{N})/gu, '$1c$2')
  return s
    .split(/[\s–—]+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w))
    .map((w) => {
      const f = fold(w)
      return {
        forms: [...new Set([f, foldUmlaut(w)])],
        len: f.length,
        code: /^(v|k|soz|kog)-\d{1,2}$/.test(f),
        level: LEVEL_CODES.find((l) => l.toLowerCase() === f),
      }
    })
}

const WORD_CHAR = /[\p{L}\p{N}]/u

/** One or two letters only as a whole word („KI“ not in „Skills“ or „Kinder“),
 *  three at a word start („Wut“ → „Wutvulkan“, „ich“ not in „nicht“), longer
 *  ones anywhere, so German compounds still match („Angst“ →
 *  „Prüfungsangst“). len 0 = whole word. */
function wordMatch(text: string, w: string, len: number): boolean {
  if (len > 3) return text.includes(w)
  const start = WORD_CHAR.test(w[0])
  const end = len < 3 && WORD_CHAR.test(w[w.length - 1])
  for (let i = text.indexOf(w); i >= 0; i = text.indexOf(w, i + 1)) {
    if (start && i > 0 && WORD_CHAR.test(text[i - 1])) continue
    if (end && i + w.length < text.length && WORD_CHAR.test(text[i + w.length])) continue
    return true
  }
  return false
}

/** Does the search token occur in the prepared text (searchText) – or, given
 *  the item's `levels`, name one of them („C3“, „Cycle 3“, „Spielschule“)?
 *  Also used by the Arbeitsblätter, the filter lists and the Team page. */
export function tokenMatch(text: string, t: SearchToken, levels?: readonly string[]): boolean {
  if (t.level) return !!levels?.includes(t.level)
  if (levels?.some((l) => LEVEL_WORDS[l]?.some((w) => t.forms.some((f) => (t.len < 3 ? w === f : w.startsWith(f)))))) return true
  return t.forms.some((w) => wordMatch(text, w, t.code ? 0 : t.len))
}

interface SearchDoc {
  title: string
  meta: string
  all: string
}
const docCache = new WeakMap<Material, SearchDoc>()

function searchDoc(m: Material): SearchDoc {
  let d = docCache.get(m)
  if (!d) {
    const title = searchText(m.title)
    // tags, themes, ELDiB codes, short description, author (levels: see tokenMatch)
    const meta = searchText([...m.tags, ...m.themes.map(themeLabel), ...m.eldibGoals, m.shortDescription, m.author ?? ''].join(' '))
    // procedure and the tasks of the worksheet – hits only here rank last
    const ws = m.worksheet
    const text = searchText(
      [m.remark ?? '', m.materialsNeeded ?? '', ...m.ablauf.map((a) => `${a.title ?? ''} ${a.text}`), ws?.title ?? '', ws?.intro ?? '', ...(ws?.blocks ?? []).map((b) => b.text ?? ''), m.id].join(' '),
    )
    d = { title, meta, all: [title, meta, text].join('\n') }
    docCache.set(m, d)
  }
  return d
}

/** Prepare search texts ahead of time in small steps while the browser is idle,
 *  so the first keystroke is not slower. Returns a function that stops it. */
export function prepareInIdle<T>(items: readonly T[], prepare: (x: T) => unknown): () => void {
  const idle = typeof window.requestIdleCallback === 'function'
  const plan = (cb: () => void) => (idle ? window.requestIdleCallback(cb) : window.setTimeout(cb, 50))
  let i = 0
  let id = 0
  const step = () => {
    const end = performance.now() + 8
    while (i < items.length && performance.now() < end) prepare(items[i++])
    if (i < items.length) id = plan(step)
  }
  id = plan(step)
  return () => (idle ? window.cancelIdleCallback(id) : window.clearTimeout(id))
}

export function prepareMaterialSearch(m: Material): void {
  searchDoc(m)
}

/** Relevance of a material for the search tokens (0 = no match). Every token
 *  must appear somewhere (AND, see tokenMatch); hits in the title weigh most,
 *  then tags, levels, codes and short description, last procedure and tasks. */
export function searchScore(m: Material, tokens: SearchToken[]): number {
  if (!tokens.length) return 1
  const d = searchDoc(m)
  let score = 0
  for (const t of tokens) {
    if (!tokenMatch(d.all, t, m.ageLevels)) return 0
    score += tokenMatch(d.title, t) ? 6 : tokenMatch(d.meta, t, m.ageLevels) ? 3 : 1
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
