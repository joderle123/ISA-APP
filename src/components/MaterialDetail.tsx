import type { Material } from '../types/material'
import {
  ageLevels,
  eldibDomains,
  eldibGoalById,
  etepStufen,
  materialTypeById,
  participantModeById,
  themeLabel,
} from '../data/taxonomy'
import { ageColors } from '../lib/ui'
import { StarRating } from './StarRating'

interface Props {
  material: Material | null
  onClose: () => void
  onDownload: (m: Material) => void
  downloading: boolean
  rating: number
  onRate: (n: number) => void
}

export function MaterialDetail({ material: m, onClose, onDownload, downloading, rating, onRate }: Props) {
  if (!m) return null

  const goalsByDomain = eldibDomains
    .map((d) => ({
      domain: d,
      goals: m.eldibGoals
        .map((id) => eldibGoalById.get(id))
        .filter((g) => g && g.domain === d.id),
    }))
    .filter((x) => x.goals.length > 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="my-4 w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wide text-isa-blue-deep uppercase">
              ISA – Material
            </div>
            <h2 className="text-xl font-bold text-slate-800">{m.title}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {m.author || 'ISA-App'}
              {m.source === 'generated' && ' · KI-Entwurf (vor Einsatz prüfen)'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <StarRating value={rating} onChange={onRate} size={22} />
              <span className="text-xs text-slate-400">
                {rating ? `${rating}/5 — meine Bewertung` : 'noch nicht bewertet'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Schließen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {m.ageLevels.map((a) => (
              <span
                key={a}
                className={`rounded px-2 py-0.5 text-xs font-semibold ring-1 ${ageColors[a]}`}
                title={ageLevels.find((x) => x.id === a)?.description}
              >
                {a}
              </span>
            ))}
            {m.type.map((t) => (
              <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {materialTypeById.get(t)?.labelDe ?? t}
              </span>
            ))}
            {m.participants.map((p) => (
              <span key={p.mode} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {participantModeById.get(p.mode)?.labelDe}
                {p.note ? ` (${p.note})` : ''}
              </span>
            ))}
          </div>

          {/* Themes */}
          <div className="flex flex-wrap gap-1.5">
            {m.themes.map((t) => (
              <span key={t} className="rounded-full bg-isa-blue/60 px-2.5 py-0.5 text-xs text-isa-blue-deep">
                {themeLabel(t)}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-700">{m.shortDescription}</p>

          {/* Ablauf */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-800">Ablauf</h3>
            <div className="space-y-3">
              {m.ablauf.map((phase, i) => (
                <div key={i} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                  {phase.title && (
                    <div className="mb-1 text-sm font-semibold text-slate-700">{phase.title}</div>
                  )}
                  <p className="text-sm whitespace-pre-line text-slate-600">{phase.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 p-3">
              <div className="text-xs font-semibold text-slate-500">Dauer</div>
              <div className="text-sm text-slate-700">{m.duration || '—'}</div>
            </div>
            <div className="rounded-lg border border-slate-100 p-3">
              <div className="text-xs font-semibold text-slate-500">Material</div>
              <div className="text-sm text-slate-700">{m.materialsNeeded || '—'}</div>
            </div>
          </div>

          {/* ETEP / ELDiB */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-800">Zielsetzungen</h3>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {etepStufen
                .filter((e) => m.etepStufen.includes(e.id))
                .map((e) => (
                  <span
                    key={e.id}
                    title={e.description}
                    className="rounded-full bg-isa-green px-2.5 py-0.5 text-xs font-medium text-isa-green-deep"
                  >
                    ETEP {e.id}
                  </span>
                ))}
            </div>
            <div className="space-y-2">
              {goalsByDomain.map(({ domain, goals }) => (
                <div key={domain.id}>
                  <div className="mb-1 text-xs font-semibold" style={{ color: domain.color }}>
                    {domain.label}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {goals.map(
                      (g) =>
                        g && (
                          <span
                            key={g.id}
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
                          >
                            {g.label} <span className="text-slate-400">[{g.id}]</span>
                          </span>
                        ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worksheet */}
          {m.worksheet && (
            <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
                  Arbeitsblatt
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {m.worksheet.title || m.title}
                </span>
              </div>
              {m.worksheet.intro && (
                <p className="mb-2 text-sm text-slate-600">{m.worksheet.intro}</p>
              )}
              <ul className="space-y-0.5 text-sm text-slate-600">
                {m.worksheet.blocks
                  .filter((b) => b.kind === 'heading' || b.kind === 'question')
                  .slice(0, 8)
                  .map((b, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span className="text-amber-500">
                        {b.kind === 'heading' ? '▸' : '·'}
                      </span>
                      <span>{b.text}</span>
                    </li>
                  ))}
              </ul>
              <p className="mt-2 text-xs text-slate-400">
                Vollständig als druckbare Seite im PDF enthalten.
              </p>
            </div>
          )}

          {/* Tags + attachments */}
          {m.tags.length > 0 && (
            <div className="text-xs text-slate-400">{m.tags.map((t) => `#${t}`).join(' ')}</div>
          )}
          {m.attachments?.length ? (
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">Weitere Materialien</h3>
              <ul className="space-y-1">
                {m.attachments.map((a, i) => (
                  <li key={i} className="text-sm">
                    <a href={a.href} target="_blank" rel="noreferrer" className="text-isa-blue-deep hover:underline">
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-2 rounded-b-2xl border-t border-slate-100 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Schließen
          </button>
          <button
            type="button"
            onClick={() => onDownload(m)}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-isa-blue-deep px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#264a82] disabled:opacity-50"
          >
            {downloading ? 'Erstelle PDF…' : 'PDF herunterladen'}
          </button>
        </div>
      </div>
    </div>
  )
}
