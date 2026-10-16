import { memo } from 'react'
import type { Material } from '../types/material'
import type { Gesamtbewertung } from '../lib/teamSync'
import { ageLevelById, languageById, themeLabel } from '../data/taxonomy'
import { domainStyle, goalText, sourceInfo, typeLabels } from '../lib/ui'
import { BewertungKurz } from './Bewertung'
import { alterText, dauerKurz, stufenKurz } from './stufe'
import { variantCount } from '../data/variants'
import { Icon } from './Icon'

interface Props {
  material: Material
  onOpen: (m: Material) => void
  onDownload: (m: Material) => void
  downloading: boolean
  /** Eigene Bewertung (Sterne) */
  rating: number
  /** Schnitt aus dem Team, falls es einen gibt */
  gesamt?: Gesamtbewertung
  /** Active ELDiB goal filter — matching codes are shown on the card. */
  goals: string[]
}

/** Kürzel der Sprache auf der Karte: DE · FR · LU (Luxemburgisch) · EN */
const SPRACHE_KURZ: Record<Material['language'], string> = { de: 'DE', fr: 'FR', lb: 'LU', en: 'EN' }

/** Karte der Einheiten – gleiche Vorlage wie die Blatt-Karte: Kopf, Titel, Text, ruhige Metazeile, Fußzeile. */
function MaterialCardImpl({ material: m, onOpen, onDownload, downloading, rating, gesamt, goals }: Props) {
  const src = sourceInfo(m.source)
  const versions = variantCount(m.id)
  const matched = goals.length ? m.eldibGoals.filter((g) => goals.includes(g)) : []
  const isUpload = m.source === 'cdse' && !!m.upload
  const sprache = languageById.get(m.language)?.labelDe ?? m.language
  const themen = m.themes.map(themeLabel).join(' · ')
  // Das Herkunftsabzeichen nur, wenn die Karte vom Üblichen abweicht (nicht auf jeder Karte „ISA-Team“)
  const abweichend = m.source !== 'original'
  const zusatz = [m.worksheet ? 'mit Arbeitsblatt' : null, versions > 0 ? `${versions} Versionen` : null].filter(Boolean).join(' · ')
  return (
    <article className="card einheit-karte" data-card={m.id}>
      <div className="flex grow flex-col gap-2 px-5 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <span className="eyebrow mt-0.5 text-accent">{typeLabels(m)}</span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className={`sprache ${m.language === 'de' ? '' : 'fremd'}`} title={`Sprache: ${sprache}`}>
              <span className="sr-only">Sprache: {sprache}</span>
              <span aria-hidden="true">{SPRACHE_KURZ[m.language]}</span>
            </span>
            {abweichend ? (
              <span className={src.badge} title={src.title}>
                <Icon name={src.icon} />
                {src.short}
              </span>
            ) : null}
          </span>
        </div>
        <h3 className="disp text-lg leading-[1.25] text-ink">
          <button type="button" className="card-open text-left" onClick={() => onOpen(m)}>
            {m.title}
          </button>
        </h3>
        <p className="clamp-3 text-base leading-[1.55] text-muted">{m.shortDescription}</p>

        {/* ruhige Metazeile: Alter und Dauer; Thema und Besonderes grau darunter (Stufe C3 usw. im Tooltip) */}
        <div className="bl-meta mt-auto pt-1">
          <p className="bl-meta-eins" title={`Stufe ${stufenKurz(m.ageLevels)}${m.ageLevels.length === 1 ? ' · ' + (ageLevelById.get(m.ageLevels[0])?.description ?? '') : ''}`}>
            <b>{alterText(m.ageLevels) || m.ageLevels.join(', ')}</b>
            {dauerKurz(m.duration) ? <> · {dauerKurz(m.duration)}</> : null}
          </p>
          {matched.length > 0 ? (
            <p className="bl-meta-zwei flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-ink-2">Passt zu</span>
              {matched.map((g) => (
                <span key={g} className="code" style={domainStyle(g)} title={goalText(g)}>
                  {g}
                </span>
              ))}
            </p>
          ) : themen || zusatz ? (
            <p className="bl-meta-zwei truncate" title={[themen, zusatz].filter(Boolean).join(' · ')}>
              {[themen, zusatz].filter(Boolean).join(' · ')}
            </p>
          ) : null}
        </div>
      </div>

      <div className="bl-karte-fuss">
        <BewertungKurz gesamt={gesamt} eigen={rating} />
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
