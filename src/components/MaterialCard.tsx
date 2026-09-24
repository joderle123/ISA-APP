import { memo } from 'react'
import type { Material } from '../types/material'
import { ageLevelById, themeLabel } from '../data/taxonomy'
import { domainStyle, goalText, sourceInfo, typeLabels } from '../lib/ui'
import { StarRating } from './StarRating'
import { variantCount } from '../data/variants'
import { Icon } from './Icon'

interface Props {
  material: Material
  onOpen: (m: Material) => void
  onDownload: (m: Material) => void
  downloading: boolean
  rating: number
  onRate: (id: string, n: number) => void
  /** Active ELDiB goal filter — matching codes are shown on the card. */
  goals: string[]
}

function MaterialCardImpl({ material: m, onOpen, onDownload, downloading, rating, onRate, goals }: Props) {
  const src = sourceInfo(m.source)
  const versions = variantCount(m.id)
  const matched = goals.length ? m.eldibGoals.filter((g) => goals.includes(g)) : []
  const isUpload = m.source === 'cdse' && !!m.upload
  return (
    <article className="card" data-card={m.id}>
      <div className="flex grow flex-col gap-2.5 px-5 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <span className="eyebrow mt-0.5 text-accent">{typeLabels(m)}</span>
          <span className={src.badge} title={src.title}>
            <Icon name={src.icon} />
            {src.short}
          </span>
        </div>
        <h3 className="disp text-[18px] leading-[1.25] text-ink">
          <button type="button" className="card-open text-left" onClick={() => onOpen(m)}>
            {m.title}
          </button>
        </h3>
        <p className="clamp-3 text-[14px] leading-[1.55] text-muted">{m.shortDescription}</p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
          {m.ageLevels.map((a) => (
            <span key={a} className="tag" title={ageLevelById.get(a)?.description}>
              {a}
            </span>
          ))}
          {m.worksheet && (
            <span className="tag tag-outline">
              <Icon name="file" />
              Arbeitsblatt
            </span>
          )}
          {versions > 0 && (
            <span className="tag tag-outline" title="Wählbare Versionen (z. B. Weltall, Arktis) – Titel, Ablauf und PDF passen sich an">
              <Icon name="layers" />
              {versions} Versionen
            </span>
          )}
        </div>
        {matched.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted">
            <span className="font-semibold text-ink-2">Passt zu</span>
            {matched.map((g) => (
              <span key={g} className="code" style={domainStyle(g)} title={goalText(g)}>
                {g}
              </span>
            ))}
          </div>
        ) : m.themes.length > 0 ? (
          <p className="truncate text-[12.5px] text-muted" title={m.themes.map(themeLabel).join(' · ')}>
            {m.themes.map(themeLabel).join(' · ')}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <StarRating value={rating} onChange={(n) => onRate(m.id, n)} size={17} label={m.title} className="raise" />
        <span className="grow" />
        <button
          type="button"
          onClick={() => onDownload(m)}
          disabled={downloading}
          className="btn btn-sm raise"
          aria-label={isUpload ? `Original-Datei öffnen: ${m.title}` : `PDF herunterladen: ${m.title}`}
        >
          {downloading ? <span className="spin" /> : <Icon name={isUpload ? 'external' : 'download'} />}
          {isUpload ? 'Datei' : 'PDF'}
        </button>
      </div>
    </article>
  )
}

export const MaterialCard = memo(MaterialCardImpl)
