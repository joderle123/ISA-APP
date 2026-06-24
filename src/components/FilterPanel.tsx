import { useState, type ReactNode } from 'react'
import type { FilterState } from '../lib/filter'
import { activeFilterCount } from '../lib/filter'
import {
  ageLevels,
  eldibDomains,
  eldibGoals,
  etepStufen,
  materialTypes,
  themes,
} from '../data/taxonomy'

interface Props {
  filter: FilterState
  update: (partial: Partial<FilterState>) => void
  reset: () => void
  total: number
  shown: number
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 transition ${
        active
          ? 'bg-isa-blue-deep text-white ring-isa-blue-deep'
          : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'
      }`}
    >
      {children}
    </button>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-slate-100 py-3">
      <h3 className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function FilterPanel({ filter, update, reset, total, shown }: Props) {
  const [goalQuery, setGoalQuery] = useState('')

  function toggle<K extends keyof FilterState>(key: K, value: unknown) {
    const arr = filter[key] as unknown[]
    update({
      [key]: arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value],
    } as Partial<FilterState>)
  }

  const active = activeFilterCount(filter)
  const filteredGoals = goalQuery
    ? eldibGoals.filter((g) =>
        `${g.label} ${g.id}`.toLowerCase().includes(goalQuery.toLowerCase()),
      )
    : []

  return (
    <aside className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-2">
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{shown}</span> von {total}
        </div>
        {active > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-isa-blue-deep hover:underline"
          >
            Zurücksetzen ({active})
          </button>
        )}
      </div>

      <div className="scroll-slim grow overflow-y-auto pr-1">
        <Section title="Themenbereich">
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {themes.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={filter.themes.includes(t.id)}
                  onChange={() => toggle('themes', t.id)}
                  className="accent-isa-blue-deep"
                />
                {t.label}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Altersstufe">
          <div className="flex flex-wrap gap-1.5">
            {ageLevels.map((a) => (
              <Chip
                key={a.id}
                active={filter.ageLevels.includes(a.id)}
                onClick={() => toggle('ageLevels', a.id)}
              >
                {a.label}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="Typ">
          <div className="flex flex-wrap gap-1.5">
            {materialTypes.map((t) => (
              <Chip
                key={t.id}
                active={filter.types.includes(t.id)}
                onClick={() => toggle('types', t.id)}
              >
                {t.labelDe}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="ETEP-Stufe">
          <div className="flex flex-wrap gap-1.5">
            {etepStufen.map((e) => (
              <Chip
                key={e.id}
                active={filter.etepStufen.includes(e.id)}
                onClick={() => toggle('etepStufen', e.id)}
              >
                {e.label}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="ELDiB-Bereich">
          <div className="flex flex-wrap gap-1.5">
            {eldibDomains.map((d) => (
              <Chip
                key={d.id}
                active={filter.eldibDomains.includes(d.id)}
                onClick={() => toggle('eldibDomains', d.id)}
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="ELDiB-Ziel">
          <input
            type="search"
            value={goalQuery}
            onChange={(e) => setGoalQuery(e.target.value)}
            placeholder="Ziel suchen…"
            className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-isa-blue-deep"
          />
          {filter.eldibGoals.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {filter.eldibGoals.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle('eldibGoals', id)}
                  className="rounded-full bg-isa-blue-deep px-2 py-0.5 text-[11px] text-white"
                >
                  {id} ✕
                </button>
              ))}
            </div>
          )}
          {filteredGoals.length > 0 && (
            <div className="mt-2 max-h-44 space-y-0.5 overflow-y-auto pr-1">
              {filteredGoals.slice(0, 40).map((g) => (
                <label
                  key={g.id}
                  className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={filter.eldibGoals.includes(g.id)}
                    onChange={() => toggle('eldibGoals', g.id)}
                    className="accent-isa-blue-deep"
                  />
                  <span className="font-medium">{g.label}</span>
                  <span className="text-slate-400">[{g.id}]</span>
                </label>
              ))}
            </div>
          )}
        </Section>
      </div>
    </aside>
  )
}
