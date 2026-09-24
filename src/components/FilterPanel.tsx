import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import type { FacetCounts, FilterState } from '../lib/filter'
import { fold } from '../lib/filter'
import type { EldibDomain } from '../types/material'
import { StarRating } from './StarRating'
import { Icon } from './Icon'
import { domainStyle } from '../lib/ui'
import {
  ageLevels,
  eldibDomains,
  eldibGoalById,
  eldibGoals,
  etepStufen,
  languages,
  materialTypes,
  participantModes,
  sources,
  themes,
} from '../data/taxonomy'

interface Props {
  filter: FilterState
  update: (partial: Partial<FilterState>) => void
  /** Result counts per option under the current filters. */
  counts: FacetCounts
  /** Counts over the whole library (to hide options that never occur). */
  totals: FacetCounts
  /** All distinct tags, most frequent first. */
  allTags: string[]
  allAuthors: string[]
}

function toggleIn<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

/** Umschaltbarer Filter-Chip mit Trefferzahl. */
function Chip({
  on,
  n,
  onClick,
  title,
  children,
  style,
}: {
  on: boolean
  n?: number
  onClick: () => void
  title?: string
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <button
      type="button"
      className="fchip"
      aria-pressed={on}
      onClick={onClick}
      title={title}
      style={style}
      disabled={!on && n === 0}
    >
      {on ? <Icon name="check" /> : null}
      {children}
      {n !== undefined ? <span className="n">{n}</span> : null}
    </button>
  )
}

function Section({
  title,
  active,
  defaultOpen = true,
  children,
}: {
  title: string
  active: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen || active > 0)
  const id = useId()
  return (
    <section className="fsec">
      <h3>
        <button
          type="button"
          className="fsec-toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="grow">{title}</span>
          {active > 0 && (
            <span className="fsec-count" aria-label={`${active} aktiv`}>
              {active}
            </span>
          )}
          <Icon name="chevronDown" className="ic chev" />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pb-4">
        {children}
      </div>
    </section>
  )
}

export function FilterPanel({ filter, update, counts, totals, allTags, allAuthors }: Props) {
  const [goalQuery, setGoalQuery] = useState('')
  const [goalDomain, setGoalDomain] = useState<EldibDomain>(() => {
    const first = filter.eldibGoals[0]
    return (first && eldibGoalById.get(first)?.domain) || 'V'
  })
  const [tagQuery, setTagQuery] = useState('')

  const q = fold(goalQuery.trim())
  const goalsToShow = q
    ? eldibGoals.filter((g) => fold(`${g.id} ${g.label}`).includes(q) || fold(g.id.replace('-', '')).includes(q))
    : eldibGoals.filter((g) => g.domain === goalDomain)

  const tq = fold(tagQuery.trim())
  const tagList = (tq ? allTags.filter((t) => fold(t).includes(tq)) : allTags).slice(0, tq ? 40 : 14)
  const selectedTagsHidden = filter.tags.filter((t) => !tagList.includes(t))

  const themeOrder = themes
    .filter((t) => (totals.themes.get(t.id) ?? 0) > 0 || filter.themes.includes(t.id))
    .sort((a, b) => a.label.localeCompare(b.label, 'de'))
  const moreCount = filter.languages.length + filter.sources.length + filter.authors.length + filter.tags.length

  return (
    <div className="flex flex-col">
      <Section title="Altersstufe" active={filter.ageLevels.length}>
        <div className="flex flex-wrap gap-1.5">
          {ageLevels.map((a) => (
            <Chip
              key={a.id}
              on={filter.ageLevels.includes(a.id)}
              n={counts.ageLevels.get(a.id) ?? 0}
              title={a.description}
              onClick={() => update({ ageLevels: toggleIn(filter.ageLevels, a.id) })}
            >
              {a.label}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Format" active={filter.types.length}>
        <div className="flex flex-wrap gap-1.5">
          {materialTypes
            .filter((t) => (totals.types.get(t.id) ?? 0) > 0 || filter.types.includes(t.id))
            .map((t) => (
              <Chip
                key={t.id}
                on={filter.types.includes(t.id)}
                n={counts.types.get(t.id) ?? 0}
                onClick={() => update({ types: toggleIn(filter.types, t.id) })}
              >
                {t.labelDe}
              </Chip>
            ))}
        </div>
      </Section>

      <Section title="Sozialform" active={filter.participantModes.length}>
        <div className="flex flex-wrap gap-1.5">
          {participantModes.map((p) => (
            <Chip
              key={p.id}
              on={filter.participantModes.includes(p.id)}
              n={counts.participantModes.get(p.id) ?? 0}
              onClick={() => update({ participantModes: toggleIn(filter.participantModes, p.id) })}
            >
              {p.labelDe}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Arbeitsblatt" active={filter.hasWorksheet ? 1 : 0}>
        <Chip
          on={filter.hasWorksheet}
          n={counts.hasWorksheet}
          onClick={() => update({ hasWorksheet: !filter.hasWorksheet })}
        >
          Nur mit Arbeitsblatt
        </Chip>
      </Section>

      <Section title="ELDiB-Ziele" active={filter.eldibGoals.length + filter.eldibDomains.length}>
        <div className="seg mb-2.5 w-full" role="tablist" aria-label="ELDiB-Bereich zum Durchblättern">
          {eldibDomains.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={!q && goalDomain === d.id}
              title={d.label}
              style={domainStyle(d.id)}
              onClick={() => {
                setGoalDomain(d.id)
                setGoalQuery('')
              }}
            >
              <span className="dot" />
              {d.id}
            </button>
          ))}
        </div>
        <label className="search search-sm mb-2">
          <Icon name="search" className="ic h-4 w-4" />
          <span className="sr-only">ELDiB-Ziel suchen</span>
          <input
            type="search"
            value={goalQuery}
            onChange={(e) => setGoalQuery(e.target.value)}
            placeholder="Ziel oder Code, z. B. V-13"
          />
        </label>
        {filter.eldibGoals.length > 0 && (
          <div className="mb-2 flex flex-wrap items-center gap-1">
            <span className="mr-0.5 text-[12px] font-semibold text-muted">Gewählt:</span>
            {filter.eldibGoals.map((id) => (
              <button
                key={id}
                type="button"
                className="code inline-flex items-center gap-1"
                style={domainStyle(id)}
                title={`${id} ${eldibGoalById.get(id)?.label ?? ''} – entfernen`}
                aria-label={`ELDiB-Ziel ${id} entfernen`}
                onClick={() => update({ eldibGoals: filter.eldibGoals.filter((g) => g !== id) })}
              >
                {id}
                <Icon name="x" className="ic h-3 w-3" />
              </button>
            ))}
          </div>
        )}
        <div
          className="scroll-slim -mx-1 max-h-64 overflow-y-auto px-1"
          role="group"
          aria-label={q ? 'Gefundene ELDiB-Ziele' : `ELDiB-Ziele ${eldibDomains.find((d) => d.id === goalDomain)?.label}`}
        >
          {goalsToShow.map((g) => {
            const n = counts.eldibGoals.get(g.id) ?? 0
            const on = filter.eldibGoals.includes(g.id)
            return (
              <label key={g.id} className={`check-row ${n === 0 && !on ? 'zero' : ''}`}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => update({ eldibGoals: toggleIn(filter.eldibGoals, g.id) })}
                />
                <span className="code text-[11px]" style={domainStyle(g.id)}>
                  {g.id}
                </span>
                <span className="min-w-0 truncate">{g.label}</span>
                <span className="n">{n}</span>
              </label>
            )
          })}
          {goalsToShow.length === 0 && <p className="px-1.5 py-2 text-[13px] text-muted">Kein Ziel gefunden.</p>}
        </div>
        <div className="mt-3">
          <div className="mb-1.5 text-[12px] font-semibold text-muted">Ganzer Bereich</div>
          <div className="flex flex-wrap gap-1.5">
            {eldibDomains.map((d) => (
              <Chip
                key={d.id}
                on={filter.eldibDomains.includes(d.id)}
                n={counts.eldibDomains.get(d.id) ?? 0}
                style={domainStyle(d.id)}
                onClick={() => update({ eldibDomains: toggleIn(filter.eldibDomains, d.id) })}
              >
                <span className="dot" />
                {d.label}
              </Chip>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Themenbereich" active={filter.themes.length}>
        <div className="scroll-slim -mx-1.5 max-h-72 overflow-y-auto px-0" role="group" aria-label="Themenbereiche">
          {themeOrder.map((t) => {
            const n = counts.themes.get(t.id) ?? 0
            const on = filter.themes.includes(t.id)
            return (
              <label key={t.id} className={`check-row ${n === 0 && !on ? 'zero' : ''}`}>
                <input type="checkbox" checked={on} onChange={() => update({ themes: toggleIn(filter.themes, t.id) })} />
                <span className="min-w-0 truncate">{t.label}</span>
                <span className="n">{n}</span>
              </label>
            )
          })}
        </div>
      </Section>

      <Section title="ETEP-Stufe" active={filter.etepStufen.length} defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {etepStufen.map((e) => (
            <Chip
              key={e.id}
              on={filter.etepStufen.includes(e.id)}
              n={counts.etepStufen.get(e.id) ?? 0}
              title={e.description}
              onClick={() => update({ etepStufen: toggleIn(filter.etepStufen, e.id) })}
            >
              {e.label}
            </Chip>
          ))}
        </div>
      </Section>

      <Section
        title="Meine Bewertung"
        active={(filter.minRating > 0 ? 1 : 0) + (filter.onlyUnrated ? 1 : 0)}
        defaultOpen={false}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-muted">Mindestens</span>
          <StarRating
            value={filter.minRating}
            onChange={(n) => update({ minRating: n, onlyUnrated: false })}
            size={18}
            label="Mindestbewertung"
          />
        </div>
        <div className="mt-2">
          <Chip
            on={filter.onlyUnrated}
            n={counts.unrated}
            onClick={() => update({ onlyUnrated: !filter.onlyUnrated, minRating: 0 })}
          >
            Nur unbewertete
          </Chip>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-muted">
          Bewertungen bleiben nur in diesem Browser gespeichert.
        </p>
      </Section>

      <Section title="Weitere Filter" active={moreCount} defaultOpen={false}>
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 text-[12.5px] font-semibold text-ink-2">Sprache</div>
            <div className="flex flex-wrap gap-1.5">
              {languages
                .filter((l) => (totals.languages.get(l.id) ?? 0) > 0 || filter.languages.includes(l.id))
                .map((l) => (
                  <Chip
                    key={l.id}
                    on={filter.languages.includes(l.id)}
                    n={counts.languages.get(l.id) ?? 0}
                    onClick={() => update({ languages: toggleIn(filter.languages, l.id) })}
                  >
                    {l.labelDe}
                  </Chip>
                ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[12.5px] font-semibold text-ink-2">Herkunft</div>
            <div className="flex flex-wrap gap-1.5">
              {sources
                .filter((s) => (totals.sources.get(s.id) ?? 0) > 0 || filter.sources.includes(s.id))
                .map((s) => (
                  <Chip
                    key={s.id}
                    on={filter.sources.includes(s.id)}
                    n={counts.sources.get(s.id) ?? 0}
                    onClick={() => update({ sources: toggleIn(filter.sources, s.id) })}
                  >
                    {s.labelDe}
                  </Chip>
                ))}
            </div>
          </div>
          {allAuthors.length > 0 && (
            <div>
              <div className="mb-1 text-[12.5px] font-semibold text-ink-2">Autor:in</div>
              <div className="-mx-1.5">
                {allAuthors.map((a) => {
                  const n = counts.authors.get(a) ?? 0
                  const on = filter.authors.includes(a)
                  return (
                    <label key={a} className={`check-row ${n === 0 && !on ? 'zero' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => update({ authors: toggleIn(filter.authors, a) })} />
                      <span className="min-w-0 truncate">{a}</span>
                      <span className="n">{n}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
          <div>
            <div className="mb-1.5 text-[12.5px] font-semibold text-ink-2">Schlagwort</div>
            <label className="search search-sm mb-1.5">
              <Icon name="search" className="ic h-4 w-4" />
              <span className="sr-only">Schlagwort suchen</span>
              <input
                type="search"
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
                placeholder={`${allTags.length} Schlagwörter durchsuchen`}
              />
            </label>
            <div className="-mx-1.5">
              {[...selectedTagsHidden, ...tagList].map((t) => {
                const n = counts.tags.get(t) ?? 0
                const on = filter.tags.includes(t)
                return (
                  <label key={t} className={`check-row ${n === 0 && !on ? 'zero' : ''}`}>
                    <input type="checkbox" checked={on} onChange={() => update({ tags: toggleIn(filter.tags, t) })} />
                    <span className="min-w-0 truncate">{t}</span>
                    <span className="n">{n}</span>
                  </label>
                )
              })}
              {tq && tagList.length === 0 && <p className="px-1.5 py-1 text-[13px] text-muted">Kein Schlagwort gefunden.</p>}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
