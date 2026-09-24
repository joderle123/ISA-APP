import { useId, useState, type ReactNode } from 'react'
import type { Material } from '../types/material'
import {
  ageLevelById,
  eldibDomains,
  eldibGoalById,
  etepStufen,
  languageById,
  participantModeById,
  themeLabel,
} from '../data/taxonomy'
import { domainStyle, plainLabel, sourceInfo, typeLabels } from '../lib/ui'
import { StarRating } from './StarRating'
import { variants, applyVariant } from '../data/variants'
import { WorksheetView } from './WorksheetView'
import { Dialog } from './Dialog'
import { Icon } from './Icon'

export type DownloadKind = 'pdf' | 'ab'

interface Props {
  material: Material
  onClose: () => void
  onDownload: (m: Material, kind: DownloadKind) => void
  /** Which download of THIS material is running (null = none). */
  downloading: DownloadKind | null
  rating: number
  onRate: (id: string, n: number) => void
  /** ELDiB goals of the active filter (e.g. from the hub) — highlighted. */
  highlightGoals: string[]
  /** Show all materials for one ELDiB goal (closes the detail). */
  onShowGoal: (code: string) => void
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 border-t border-line py-2.5 first:border-t-0 first:pt-0">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="m-0 text-[14px] leading-snug font-[540] text-ink">{children}</dd>
    </div>
  )
}

export function MaterialDetail({
  material: m,
  onClose,
  onDownload,
  downloading,
  rating,
  onRate,
  highlightGoals,
  onShowGoal,
}: Props) {
  // `null` = original setting; otherwise index into the variant settings list.
  const [variantIdx, setVariantIdx] = useState<number | null>(null)
  const titleId = useId()
  const vset = variants[m.id]
  const setting = vset && variantIdx !== null ? vset.settings[variantIdx] : null
  // The re-skinned copy used for BOTH the on-screen detail and the PDF.
  const view = setting ? applyVariant(m, setting) : m
  const src = sourceInfo(m.source)
  const isUpload = m.source === 'cdse' && !!m.upload

  const goalsByDomain = eldibDomains
    .map((d) => ({
      domain: d,
      goals: view.eldibGoals
        .map((id) => eldibGoalById.get(id))
        .filter((g): g is NonNullable<typeof g> => !!g && g.domain === d.id),
    }))
    .filter((x) => x.goals.length > 0)
  const unknownGoals = view.eldibGoals.filter((id) => !eldibGoalById.get(id))

  return (
    <Dialog onClose={onClose} labelledBy={titleId} className="dlg-wide">
      <header className="dlg-head">
        <div className="min-w-0 flex-1">
          <div className="eyebrow text-accent">{typeLabels(view)} · ISA-Material</div>
          <h2 id={titleId} className="disp mt-1 text-[24px] leading-[1.18] text-ink sm:text-[27px]">
            {view.title}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className={src.badge} title={src.title}>
              <Icon name={src.icon} />
              {src.label}
            </span>
            {m.author && (
              <span className="inline-flex items-center gap-1.5 text-[13.5px] text-muted">
                <Icon name="user" className="ic h-4 w-4" />
                {m.author}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
              <StarRating value={rating} onChange={(n) => onRate(m.id, n)} size={18} label={m.title} />
              <span aria-hidden="true">{rating ? `${rating}/5` : 'noch nicht bewertet'}</span>
            </span>
          </div>
        </div>
        <button type="button" className="icon-btn -mt-1 -mr-1" onClick={onClose} aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>

      <div className="dlg-body scroll-slim outline-none" tabIndex={-1} data-autofocus>
        {vset && (
          <div className="border-b border-line bg-surface-2 px-6 py-3 max-sm:px-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-2">
                <Icon name="layers" className="ic h-4 w-4 text-accent" />
                Version
              </span>
              <div className="seg" role="group" aria-label="Version wählen">
                <button type="button" aria-pressed={variantIdx === null} onClick={() => setVariantIdx(null)}>
                  {plainLabel(vset.base)}
                </button>
                {vset.settings.map((s, i) => (
                  <button key={s.label} type="button" aria-pressed={variantIdx === i} onClick={() => setVariantIdx(i)}>
                    {plainLabel(s.label)}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-1.5 text-[12.5px] text-muted">
              {setting?.description ?? 'Titel, Ablauf und PDF passen sich an – die Lernziele bleiben gleich.'}
            </p>
          </div>
        )}

        <div className="grid gap-6 p-6 max-sm:p-4 lg:grid-cols-[minmax(0,1fr)_330px] lg:grid-rows-[auto_auto_1fr]">
          {/* Auf einen Blick */}
          <section className="panel p-4 lg:col-start-2 lg:row-start-1" aria-label="Auf einen Blick">
            <h3 className="mb-3 text-[14px] font-semibold text-ink">Auf einen Blick</h3>
            <dl className="m-0">
              <Fact label="Altersstufe">
                <span className="flex flex-wrap gap-1">
                  {view.ageLevels.map((a) => (
                    <span key={a} className="tag" title={ageLevelById.get(a)?.description}>
                      {a}
                    </span>
                  ))}
                </span>
                <span className="mt-1 block text-[12.5px] font-normal text-muted">
                  {view.ageLevels
                    .map((a) => ageLevelById.get(a)?.description.match(/\(([^)]+)\)/)?.[1])
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </Fact>
              <Fact label="Format">{typeLabels(view)}</Fact>
              {view.participants.length > 0 && (
                <Fact label="Sozialform">
                  <ul className="m-0 list-none space-y-1 p-0">
                    {view.participants.map((p) => (
                      <li key={p.mode}>
                        {participantModeById.get(p.mode)?.labelDe ?? p.mode}
                        {p.note ? <span className="block text-[12.5px] font-normal text-muted">{p.note}</span> : null}
                      </li>
                    ))}
                  </ul>
                </Fact>
              )}
              <Fact label="Dauer">{view.duration || '—'}</Fact>
              <Fact label="Material">
                <span className="font-normal">{view.materialsNeeded || '—'}</span>
              </Fact>
              <Fact label="Sprache">{languageById.get(view.language)?.labelDe ?? view.language}</Fact>
              <Fact label="Herkunft">
                {src.label}
                {m.source === 'generated' && (
                  <span className="block text-[12.5px] font-normal text-muted">Vor dem Einsatz fachlich prüfen.</span>
                )}
                {m.uploadedBy && <span className="block text-[12.5px] font-normal text-muted">von {m.uploadedBy}</span>}
              </Fact>
            </dl>
          </section>

          {/* Inhalt */}
          <div className="min-w-0 space-y-7 lg:col-start-1 lg:row-span-3 lg:row-start-1">
            <section>
              <h3 className="eyebrow mb-2">Kurzbeschreibung</h3>
              <p className="text-[15.5px] leading-[1.65] text-ink-2">{view.shortDescription}</p>
            </section>

            <section>
              <h3 className="eyebrow mb-3">Ablauf</h3>
              <ol className="m-0 list-none space-y-3 p-0">
                {view.ablauf.map((phase, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-bold text-accent-strong"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1 rounded-xl border border-line bg-surface-2 px-4 py-3">
                      {phase.title && <div className="mb-1 text-[14.5px] font-semibold text-ink">{phase.title}</div>}
                      <p className="text-[14.5px] leading-[1.65] whitespace-pre-line text-ink-2">{phase.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {view.remark && (
              <section className="callout callout-info" aria-label="Hinweise">
                <Icon name="lightbulb" />
                <div className="min-w-0">
                  <h3 className="mb-1 text-[14px] font-semibold">Hinweise zur Durchführung</h3>
                  <p className="text-[14px] leading-[1.6] whitespace-pre-line text-ink-2">{view.remark}</p>
                </div>
              </section>
            )}

            {view.worksheet && (
              <section aria-labelledby={titleId + '-ab'}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 id={titleId + '-ab'} className="eyebrow">
                      Arbeitsblatt
                    </h3>
                    <p className="mt-0.5 text-[13px] text-muted">So wird es gedruckt – am Ende des Material-PDFs oder einzeln.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => onDownload(view, 'ab')}
                    disabled={downloading !== null}
                  >
                    {downloading === 'ab' ? <span className="spin" /> : <Icon name="download" />}
                    Nur Arbeitsblatt (PDF)
                  </button>
                </div>
                <WorksheetView worksheet={view.worksheet} themeId={view.themes[0]} fallbackTitle={view.title} />
              </section>
            )}
          </div>

          {/* Ziele & Themen */}
          <section className="panel p-4 lg:col-start-2 lg:row-start-2" aria-label="Ziele">
            <h3 className="mb-3 text-[14px] font-semibold text-ink">Zielsetzungen</h3>
            {view.etepStufen.length > 0 && (
              <div className="mb-3">
                <div className="mb-1.5 text-[12.5px] font-semibold text-muted">ETEP-Stufen</div>
                <div className="flex flex-wrap gap-1">
                  {etepStufen
                    .filter((e) => view.etepStufen.includes(e.id))
                    .map((e) => (
                      <span key={e.id} className="tag" title={e.description}>
                        {e.label}
                      </span>
                    ))}
                </div>
              </div>
            )}
            <div className="mb-1.5 text-[12.5px] font-semibold text-muted">
              ELDiB-Ziele{view.eldibGoals.length ? ` (${view.eldibGoals.length})` : ''}
            </div>
            {goalsByDomain.length === 0 && unknownGoals.length === 0 && (
              <p className="text-[13.5px] text-muted">Keine ELDiB-Ziele hinterlegt.</p>
            )}
            <div className="space-y-3">
              {goalsByDomain.map(({ domain, goals }) => (
                <div key={domain.id} style={domainStyle(domain.id)}>
                  <div className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-ink">
                    <span className="dot" />
                    {domain.label}
                  </div>
                  <ul className="m-0 list-none space-y-0.5 p-0">
                    {goals.map((g) => {
                      const hit = highlightGoals.includes(g.id)
                      return (
                        <li key={g.id}>
                          <button
                            type="button"
                            onClick={() => onShowGoal(g.id)}
                            title={`Alle Materialien zu ${g.id} ${g.label} anzeigen`}
                            className={`flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left text-[13.5px] hover:bg-page ${
                              hit ? 'bg-[color-mix(in_srgb,var(--bc)_8%,white)] font-semibold text-ink' : 'text-ink-2'
                            }`}
                          >
                            <span className="code">{g.id}</span>
                            <span className="min-w-0 flex-1">{g.label}</span>
                            {hit && (
                              <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted">
                                <Icon name="check" className="ic h-3.5 w-3.5" />
                                gesucht
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
              {unknownGoals.length > 0 && (
                <p className="text-[13px] text-muted">Weitere Codes: {unknownGoals.join(', ')}</p>
              )}
            </div>
          </section>

          <section className="panel p-4 lg:col-start-2 lg:row-start-3 lg:self-start" aria-label="Themen und Schlagwörter">
            {view.themes.length > 0 && (
              <>
                <h3 className="mb-2 text-[14px] font-semibold text-ink">Themen</h3>
                <div className="mb-3 flex flex-wrap gap-1">
                  {view.themes.map((t) => (
                    <span key={t} className="tag tag-outline">
                      {themeLabel(t)}
                    </span>
                  ))}
                </div>
              </>
            )}
            {view.tags.length > 0 && (
              <p className="text-[13px] leading-relaxed text-muted">{view.tags.map((t) => `#${t}`).join('  ')}</p>
            )}
            {m.attachments?.length ? (
              <div className="mt-3 border-t border-line pt-3">
                <h3 className="mb-1.5 text-[14px] font-semibold text-ink">Weitere Materialien</h3>
                <ul className="m-0 list-none space-y-1.5 p-0">
                  {m.attachments.map((a, i) => (
                    <li key={i}>
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 text-[13.5px] font-semibold text-accent underline decoration-accent-line underline-offset-3 hover:decoration-accent"
                      >
                        <Icon name="external" className="ic mt-0.5 h-4 w-4" />
                        {a.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </div>
      </div>

      <footer className="dlg-foot">
        <span className="hidden min-w-0 flex-1 truncate text-[13px] text-muted sm:block">
          {setting ? `Version: ${plainLabel(setting.label)}` : vset ? 'Original-Version' : ''}
        </span>
        <span className="flex-1 sm:hidden" />
        <button type="button" className="btn btn-quiet max-sm:hidden" onClick={onClose}>
          Schließen
        </button>
        {view.worksheet && !isUpload && (
          <button
            type="button"
            className="btn"
            onClick={() => onDownload(view, 'ab')}
            disabled={downloading !== null}
            title="Nur das Arbeitsblatt als PDF (zum Kopieren für die Klasse)"
          >
            {downloading === 'ab' ? <span className="spin" /> : <Icon name="file" />}
            Arbeitsblatt
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onDownload(view, 'pdf')}
          disabled={downloading !== null}
        >
          {downloading === 'pdf' ? <span className="spin" /> : <Icon name={isUpload ? 'external' : 'download'} />}
          {isUpload ? (
            downloading === 'pdf' ? 'Öffne Datei …' : 'Original-Datei öffnen'
          ) : downloading === 'pdf' ? (
            'PDF wird erstellt …'
          ) : (
            <>
              <span className="sm:hidden">PDF</span>
              <span className="max-sm:hidden">PDF herunterladen</span>
            </>
          )}
        </button>
      </footer>
    </Dialog>
  )
}
