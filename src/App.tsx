import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { allMaterials } from './data/materials'
import {
  activeFilterCount,
  collectAuthors,
  collectTags,
  emptyFilter,
  facetCounts,
  queryLibrary,
  type FacetCounts,
  type FilterState,
  type SortMode,
} from './lib/filter'
import { FilterPanel } from './components/FilterPanel'
import { MaterialCard } from './components/MaterialCard'
import { MaterialDetail, type DownloadKind } from './components/MaterialDetail'
import { ChatFinder } from './components/ChatFinder'
import { TeamPanel } from './components/TeamPanel'
import { Dialog } from './components/Dialog'
import { Icon } from './components/Icon'
import { Toaster } from './components/Toaster'
import { teamSync } from './lib/teamSync'
import { loadRatings, saveRatings, type RatingMap } from './lib/ratings'
import { buildHash, isEmptyLink, parseHash, writeHash, type DeepLink } from './lib/deeplink'
import { toast } from './lib/toast'
import { loadPdfModule } from './lib/loadPdf'
import {
  ageLevelById,
  eldibDomainById,
  eldibGoalById,
  eldibGoals as allEldibGoals,
  languageById,
  materialTypeById,
  participantModeById,
  sources,
  themeLabel,
} from './data/taxonomy'
import { domainStyle, goalText } from './lib/ui'
import type { Material } from './types/material'

const PAGE = 36

/** Filter state for a deep link: eldib/alter/q start a fresh query. */
function filterFromLink(link: DeepLink, base: FilterState): FilterState {
  if (!link.eldib.length && !link.alter.length && !link.q) return base
  return { ...emptyFilter, eldibGoals: link.eldib, ageLevels: link.alter, search: link.q ?? '' }
}

interface ActiveChip {
  key: string
  label: string
  remove: () => void
  style?: CSSProperties
  eldib?: boolean
}

export default function App() {
  // Deep link at start (e.g. from the CDSE Hub): applied before the first paint.
  const [initialLink] = useState(() => parseHash(window.location.hash))
  const [filter, setFilter] = useState<FilterState>(() => filterFromLink(initialLink, emptyFilter))
  const [sort, setSort] = useState<SortMode>('empfohlen')
  const [selected, setSelected] = useState<Material | null>(() =>
    initialLink.material ? (allMaterials.find((m) => m.id === initialLink.material) ?? null) : null,
  )
  const [downloading, setDownloading] = useState<{ id: string; kind: DownloadKind } | null>(null)
  const [ratings, setRatings] = useState<RatingMap>(() => loadRatings())
  const [finderOpen, setFinderOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [teamMaterials, setTeamMaterials] = useState<Material[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  // Connect to the shared team folder (CDSE uploads) and keep the merged list.
  useEffect(() => {
    const off = teamSync.onChange(setTeamMaterials)
    teamSync.reconnect().catch(() => {})
    return off
  }, [])

  // Full library = baked-in materials + live team uploads (team wins on id).
  const library = useMemo(() => {
    if (!teamMaterials.length) return allMaterials
    const ids = new Set(teamMaterials.map((m) => m.id))
    return [...teamMaterials, ...allMaterials.filter((m) => !ids.has(m.id))]
  }, [teamMaterials])
  const libraryRef = useRef(library)
  useEffect(() => {
    libraryRef.current = library
  }, [library])

  // --- Deep links ---------------------------------------------------------------
  useEffect(() => {
    if (initialLink.material && !allMaterials.some((m) => m.id === initialLink.material))
      toast(`Das Material „${initialLink.material}“ wurde nicht gefunden.`, 'error')
  }, [initialLink])

  useEffect(() => {
    function onHash() {
      const hash = window.location.hash
      const link = parseHash(hash)
      // Sprungmarken wie #ergebnisse sind keine Deep-Links.
      if (isEmptyLink(link) && hash.length > 1 && !hash.includes('=')) return
      setFinderOpen(false)
      setTeamOpen(false)
      setFiltersOpen(false)
      if (isEmptyLink(link)) {
        // Der Hub hat die Vorauswahl entfernt.
        setFilter(emptyFilter)
        setSelected(null)
        return
      }
      setFilter((f) => filterFromLink(link, f))
      if (link.eldib.length || link.alter.length || link.q) setSort('empfohlen')
      if (link.material) {
        const m = libraryRef.current.find((x) => x.id === link.material)
        setSelected(m ?? null)
        if (!m) toast(`Das Material „${link.material}“ wurde nicht gefunden.`, 'error')
      } else setSelected(null)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Keep the URL in sync (without history entries), so a link sent again by
  // the hub is always recognised as a change.
  const eldibKey = filter.eldibGoals.join(',')
  const selectedId = selected?.id ?? null
  useEffect(() => {
    writeHash(buildHash(eldibKey ? eldibKey.split(',') : [], selectedId))
  }, [eldibKey, selectedId])

  // "/" focuses the search (like in the hub).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable="true"]') || document.querySelector('dialog[open]')) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // --- Filtering ----------------------------------------------------------------
  const update = useCallback((partial: Partial<FilterState>) => setFilter((f) => ({ ...f, ...partial })), [])
  const reset = useCallback(() => setFilter(emptyFilter), [])

  const rate = useCallback(
    (id: string, n: number) =>
      setRatings((prev) => {
        const next = { ...prev }
        if (n) next[id] = n
        else delete next[id]
        saveRatings(next)
        return next
      }),
    [],
  )

  const query = useDeferredValue(filter)
  const results = useMemo(() => queryLibrary(library, query, ratings, sort), [library, query, ratings, sort])
  const counts = useMemo(() => facetCounts(library, query, ratings), [library, query, ratings])
  const totals = useMemo(() => facetCounts(library, emptyFilter, ratings), [library, ratings])
  const allTags = useMemo(() => collectTags(library), [library])
  const allAuthors = useMemo(() => collectAuthors(library), [library])
  const active = activeFilterCount(filter)
  const withSheet = useMemo(() => results.filter((m) => m.worksheet).length, [results])
  const stale = query !== filter

  const chips = useMemo(() => activeChips(filter, update), [filter, update])

  // --- Actions ---------------------------------------------------------------------
  const handleDownload = useCallback(async (m: Material, kind: DownloadKind = 'pdf') => {
    setDownloading({ id: m.id, kind })
    try {
      if (m.source === 'cdse' && m.upload) {
        // CDSE-uploaded original file — open it from the shared team folder.
        const url = await teamSync.getFileUrl(m)
        if (!url) throw new Error('Datei nicht verfügbar – ist die Team-Ablage verbunden?')
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 60000)
      } else {
        // The (heavy) PDF renderer is loaded only on the first download.
        const pdf = await loadPdfModule()
        const name = kind === 'ab' ? await pdf.downloadWorksheetPdf(m) : await pdf.downloadMaterialPdf(m)
        toast(`PDF erstellt: ${name}`, 'ok')
      }
    } catch (err) {
      console.error(err)
      toast(err instanceof Error ? err.message : 'Datei konnte nicht geöffnet werden.', 'error')
    } finally {
      setDownloading(null)
    }
  }, [])
  const downloadPdf = useCallback((m: Material) => handleDownload(m, 'pdf'), [handleDownload])
  const openDetail = useCallback((m: Material) => setSelected(m), [])

  const showGoal = useCallback((code: string) => {
    setSelected(null)
    setFilter({ ...emptyFilter, eldibGoals: [code] })
    setSort('empfohlen')
    window.scrollTo({ top: 0 })
  }, [])

  const filterPanel = (
    <FilterPanel filter={filter} update={update} counts={counts} totals={totals} allTags={allTags} allAuthors={allAuthors} />
  )

  return (
    <div className="min-h-screen">
      <a
        href="#ergebnisse"
        onClick={(e) => {
          // Fokus springen lassen, ohne den URL-Hash (Deep-Link) zu verändern.
          e.preventDefault()
          document.getElementById('ergebnisse')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:shadow-[var(--shadow-3)]"
      >
        Zu den Materialien springen
      </a>

      {/* Kopfzeile */}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-2.5 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent text-white shadow-[0_6px_14px_-6px_var(--accent)]">
              <Icon name="briefcase" className="ic h-[19px] w-[19px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="disp block text-[17px] text-ink">Toolbox</span>
              <span className="block truncate text-[11.5px] font-medium text-muted">ISA-Material-Bibliothek</span>
            </span>
          </div>

          <label className="search order-3 w-full md:order-none md:ml-4 md:w-auto md:max-w-xl md:flex-1">
            <Icon name="search" />
            <span className="sr-only">Materialien durchsuchen</span>
            <input
              ref={searchRef}
              type="search"
              value={filter.search}
              onChange={(e) => update({ search: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && filter.search) {
                  e.preventDefault()
                  update({ search: '' })
                }
              }}
              placeholder="Suchen: Titel, Thema, ELDiB-Code …"
              autoComplete="off"
              spellCheck={false}
            />
            {filter.search ? (
              <button type="button" className="icon-btn h-7 w-7" onClick={() => update({ search: '' })} aria-label="Suche leeren">
                <Icon name="x" className="ic h-4 w-4" />
              </button>
            ) : (
              <span className="kbd max-md:hidden" aria-hidden="true">
                /
              </span>
            )}
          </label>

          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="btn" onClick={() => setFinderOpen(true)} title="Situation beschreiben – passende Materialien finden">
              <Icon name="compass" />
              <span className="max-sm:sr-only">Material-Finder</span>
            </button>
            <button type="button" className="btn" onClick={() => setTeamOpen(true)} title="Gemeinsame CDSE-Ablage (Upload und Teilen)">
              <Icon name="folder" />
              <span className="max-sm:sr-only">Team-Ablage</span>
              {teamMaterials.length > 0 && (
                <span className="fsec-count" aria-label={`${teamMaterials.length} Team-Blätter`}>
                  {teamMaterials.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 pt-6 pb-16 sm:px-6 lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:gap-7">
        {/* Filter (Seitenleiste ab 960 px) */}
        <aside className="hidden lg:block" aria-label="Filter">
          <div className="panel scroll-slim sticky top-[80px] max-h-[calc(100vh-96px)] overflow-y-auto px-4 pb-2">
            <div className="flex items-center justify-between border-b border-line py-3">
              <h2 className="disp text-[17px] text-ink">Filter</h2>
              {active > 0 && (
                <button type="button" className="link-btn text-[13px]" onClick={reset}>
                  Alle zurücksetzen
                </button>
              )}
            </div>
            {filterPanel}
          </div>
        </aside>

        <main id="ergebnisse" tabIndex={-1} className="min-w-0 outline-none">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h1 className="disp text-[26px] leading-tight text-ink sm:text-[30px]">Material-Bibliothek</h1>
              <p className="mt-1 text-[14px] text-muted" aria-live="polite">
                <b className="font-semibold text-ink">{results.length}</b>
                {results.length !== library.length ? ` von ${library.length}` : ''} Materialien
                {withSheet > 0 ? ` · ${withSheet} mit Arbeitsblatt` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="btn lg:hidden" onClick={() => setFiltersOpen(true)}>
                <Icon name="filter" />
                Filter
                {active > 0 && <span className="fsec-count">{active}</span>}
              </button>
              <label className="flex items-center gap-2 text-[13px] text-muted">
                <span className="max-sm:sr-only">Sortieren</span>
                <select className="field w-auto py-1.5 pr-8" value={sort} onChange={(e) => setSort(e.target.value as SortMode)}>
                  <option value="empfohlen">Empfohlen</option>
                  <option value="titel">Titel A–Z</option>
                  <option value="bewertung">Meine Bewertung</option>
                </select>
              </label>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5" role="group" aria-label="Aktive Filter">
              {chips.map((c) => (
                <span key={c.key} className={`achip ${c.eldib ? 'eldib' : ''}`} style={c.style}>
                  {c.eldib && <span className="dot" />}
                  <span>{c.label}</span>
                  <button type="button" onClick={c.remove} aria-label={`Filter entfernen: ${c.label}`} title="Filter entfernen">
                    <Icon name="x" />
                  </button>
                </span>
              ))}
              {chips.length > 1 && (
                <button type="button" className="link-btn ml-1 text-[13px]" onClick={reset}>
                  Alle zurücksetzen
                </button>
              )}
            </div>
          )}

          <div className={stale ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            {results.length === 0 ? (
              <EmptyState filter={query} counts={counts} chips={chips} onReset={reset} onGoal={(g) => update({ eldibGoals: [g] })} />
            ) : (
              <ResultGrid
                key={JSON.stringify(query) + sort}
                items={results}
                ratings={ratings}
                downloading={downloading}
                goals={query.eldibGoals}
                onOpen={openDetail}
                onDownload={downloadPdf}
                onRate={rate}
              />
            )}
          </div>
        </main>
      </div>

      {selected && (
        <MaterialDetail
          key={selected.id}
          material={selected}
          onClose={() => setSelected(null)}
          onDownload={handleDownload}
          downloading={downloading?.id === selected.id ? downloading.kind : null}
          rating={ratings[selected.id] || 0}
          onRate={rate}
          highlightGoals={filter.eldibGoals}
          onShowGoal={showGoal}
        />
      )}

      {filtersOpen && (
        <Dialog onClose={() => setFiltersOpen(false)} labelledBy="filter-dialog-title" className="dlg-mid">
          <header className="dlg-head items-center">
            <h2 id="filter-dialog-title" className="disp flex-1 text-[19px]">
              Filter
            </h2>
            {active > 0 && (
              <button type="button" className="link-btn text-[13px]" onClick={reset}>
                Alle zurücksetzen
              </button>
            )}
            <button type="button" className="icon-btn" onClick={() => setFiltersOpen(false)} aria-label="Schließen">
              <Icon name="x" />
            </button>
          </header>
          <div className="dlg-body scroll-slim px-4 sm:px-6" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
            {filterPanel}
          </div>
          <footer className="dlg-foot">
            <button type="button" className="btn btn-primary w-full" onClick={() => setFiltersOpen(false)}>
              {results.length} {results.length === 1 ? 'Material' : 'Materialien'} anzeigen
            </button>
          </footer>
        </Dialog>
      )}

      {finderOpen && (
        <ChatFinder
          onClose={() => setFinderOpen(false)}
          onApply={(f) => {
            setFilter(f)
            setSort('empfohlen')
            setFinderOpen(false)
          }}
          onOpen={(m) => {
            setFinderOpen(false)
            setSelected(m)
          }}
          onDownload={downloadPdf}
          downloadingId={downloading?.id ?? null}
          ratings={ratings}
          materials={library}
        />
      )}

      {teamOpen && <TeamPanel onClose={() => setTeamOpen(false)} teamMaterials={teamMaterials} />}

      <Toaster />
    </div>
  )
}

// --- Aktive Filter als entfernbare Chips ---------------------------------------------

function activeChips(f: FilterState, update: (p: Partial<FilterState>) => void): ActiveChip[] {
  const out: ActiveChip[] = []
  const without = <T,>(arr: T[], v: T) => arr.filter((x) => x !== v)
  if (f.search.trim())
    out.push({ key: 'q', label: `Suche: „${f.search.trim()}“`, remove: () => update({ search: '' }) })
  for (const g of f.eldibGoals)
    out.push({
      key: 'g' + g,
      label: `ELDiB-Ziel ${goalText(g)}`,
      remove: () => update({ eldibGoals: without(f.eldibGoals, g) }),
      style: domainStyle(g),
      eldib: true,
    })
  for (const d of f.eldibDomains)
    out.push({
      key: 'd' + d,
      label: `ELDiB-Bereich ${eldibDomainById.get(d)?.label ?? d}`,
      remove: () => update({ eldibDomains: without(f.eldibDomains, d) }),
      style: domainStyle(d),
      eldib: true,
    })
  for (const a of f.ageLevels)
    out.push({ key: 'a' + a, label: `Altersstufe ${ageLevelById.get(a)?.label ?? a}`, remove: () => update({ ageLevels: without(f.ageLevels, a) }) })
  for (const t of f.types)
    out.push({ key: 't' + t, label: materialTypeById.get(t)?.labelDe ?? t, remove: () => update({ types: without(f.types, t) }) })
  for (const p of f.participantModes)
    out.push({
      key: 'p' + p,
      label: `Sozialform: ${participantModeById.get(p)?.labelDe ?? p}`,
      remove: () => update({ participantModes: without(f.participantModes, p) }),
    })
  if (f.hasWorksheet) out.push({ key: 'ws', label: 'Mit Arbeitsblatt', remove: () => update({ hasWorksheet: false }) })
  for (const t of f.themes)
    out.push({ key: 'th' + t, label: `Thema: ${themeLabel(t)}`, remove: () => update({ themes: without(f.themes, t) }) })
  for (const e of f.etepStufen)
    out.push({ key: 'e' + e, label: `ETEP-Stufe ${e}`, remove: () => update({ etepStufen: without(f.etepStufen, e) }) })
  if (f.minRating > 0)
    out.push({ key: 'r', label: `Ab ${f.minRating} ${f.minRating === 1 ? 'Stern' : 'Sternen'}`, remove: () => update({ minRating: 0 }) })
  if (f.onlyUnrated) out.push({ key: 'u', label: 'Nur unbewertete', remove: () => update({ onlyUnrated: false }) })
  for (const l of f.languages)
    out.push({ key: 'l' + l, label: `Sprache: ${languageById.get(l)?.labelDe ?? l}`, remove: () => update({ languages: without(f.languages, l) }) })
  for (const s of f.sources)
    out.push({
      key: 's' + s,
      label: `Herkunft: ${sources.find((x) => x.id === s)?.labelDe ?? s}`,
      remove: () => update({ sources: without(f.sources, s) }),
    })
  for (const a of f.authors)
    out.push({ key: 'au' + a, label: `Autor:in: ${a}`, remove: () => update({ authors: without(f.authors, a) }) })
  for (const t of f.tags) out.push({ key: 'tg' + t, label: `#${t}`, remove: () => update({ tags: without(f.tags, t) }) })
  return out
}

// --- Ergebnisliste (schrittweise gerendert) -----------------------------------------

function ResultGrid({
  items,
  ratings,
  downloading,
  goals,
  onOpen,
  onDownload,
  onRate,
}: {
  items: Material[]
  ratings: RatingMap
  downloading: { id: string; kind: DownloadKind } | null
  goals: string[]
  onOpen: (m: Material) => void
  onDownload: (m: Material) => void
  onRate: (id: string, n: number) => void
}) {
  const [limit, setLimit] = useState(PAGE)
  const sentinel = useRef<HTMLDivElement>(null)
  const more = items.length - limit

  useEffect(() => {
    const el = sentinel.current
    if (!el || more <= 0 || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setLimit((l) => l + PAGE)
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [more])

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-4">
        {items.slice(0, limit).map((m) => (
          <MaterialCard
            key={m.id}
            material={m}
            onOpen={onOpen}
            onDownload={onDownload}
            downloading={downloading?.id === m.id}
            rating={ratings[m.id] || 0}
            onRate={onRate}
            goals={goals}
          />
        ))}
      </div>
      {more > 0 && (
        <div ref={sentinel} className="mt-6 flex flex-col items-center gap-2 text-[13px] text-muted">
          <span>
            {limit} von {items.length} angezeigt
          </span>
          <button type="button" className="btn" onClick={() => setLimit((l) => l + PAGE)}>
            Weitere {Math.min(PAGE, more)} anzeigen
          </button>
        </div>
      )}
    </>
  )
}

// --- Leerer Zustand ---------------------------------------------------------------------

function EmptyState({
  filter,
  counts,
  chips,
  onReset,
  onGoal,
}: {
  filter: FilterState
  counts: FacetCounts
  chips: ActiveChip[]
  onReset: () => void
  onGoal: (code: string) => void
}) {
  // Für ELDiB-Ziele ohne Material: benachbarte Ziele desselben Bereichs vorschlagen.
  const suggestions: { code: string; n: number }[] = []
  for (const g of filter.eldibGoals) {
    const goal = eldibGoalById.get(g)
    const [dom, num] = g.split('-')
    const nr = Number(num)
    allEldibGoals
      .filter((x) => x.domain === (goal?.domain ?? dom) && !filter.eldibGoals.includes(x.id) && (counts.eldibGoals.get(x.id) ?? 0) > 0)
      .sort((a, b) => Math.abs(Number(a.id.split('-')[1]) - nr) - Math.abs(Number(b.id.split('-')[1]) - nr))
      .slice(0, 4)
      .forEach((x) => {
        if (!suggestions.some((s) => s.code === x.id)) suggestions.push({ code: x.id, n: counts.eldibGoals.get(x.id) ?? 0 })
      })
  }
  const onlyEldib = filter.eldibGoals.length > 0 && chips.every((c) => c.key.startsWith('g'))

  return (
    <div className="panel px-6 py-12 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-page-2 text-muted">
        <Icon name="search" className="ic h-6 w-6" />
      </div>
      <h2 className="disp text-[20px] text-ink">Keine passenden Materialien</h2>
      <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-muted">
        {onlyEldib
          ? `Zu ${filter.eldibGoals.length === 1 ? 'diesem ELDiB-Ziel' : 'diesen ELDiB-Zielen'} (${filter.eldibGoals.map(goalText).join(', ')}) gibt es in der Toolbox noch kein Material.`
          : filter.search.trim()
            ? `Für „${filter.search.trim()}“ mit diesen Filtern gibt es keinen Treffer. Prüfe die Schreibweise oder entferne einzelne Filter.`
            : 'Mit dieser Kombination von Filtern gibt es keinen Treffer. Entferne einzelne Filter oben oder setze alle zurück.'}
      </p>
      {suggestions.length > 0 && (
        <div className="mx-auto mt-5 max-w-[560px]">
          <div className="mb-2 text-[13px] font-semibold text-ink-2">Benachbarte Ziele mit Material:</div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {suggestions.map((s) => (
              <button key={s.code} type="button" className="fchip" style={domainStyle(s.code)} onClick={() => onGoal(s.code)}>
                <span className="code">{s.code}</span>
                {eldibGoalById.get(s.code)?.label}
                <span className="n">{s.n}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button type="button" className="btn btn-primary mt-6" onClick={onReset}>
        <Icon name="reset" />
        Alle Filter zurücksetzen
      </button>
    </div>
  )
}
