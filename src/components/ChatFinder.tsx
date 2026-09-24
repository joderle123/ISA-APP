import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { FilterState } from '../lib/filter'
import type { Material } from '../types/material'
import { typeLabels } from '../lib/ui'
import { StarRating } from './StarRating'
import { Dialog } from './Dialog'
import { Icon } from './Icon'
import {
  describe,
  emptySignals,
  hasAnySignal,
  mergeSignals,
  parse,
  rank,
  signalsToFilter,
  type Ranked,
  type Signals,
} from '../lib/nlu'

interface Props {
  onClose: () => void
  onApply: (f: FilterState) => void
  onOpen: (m: Material) => void
  onDownload: (m: Material) => void
  downloadingId: string | null
  ratings: Record<string, number>
  materials: Material[]
}

type Msg =
  | { role: 'user'; text: string }
  | { role: 'bot'; text: string; results?: Ranked[]; understood?: string[] }

const EXAMPLES = [
  'Schüler, 10 Jahre, 4. Klasse, oft wütend, soll in der Kleingruppe üben — mit Arbeitsblatt',
  'Ganze Klasse, 7. Schuljahr, Thema Social Media und Selbstwert',
  'Kurze Aktivität zum Kennenlernen für eine neue Gruppe (C2)',
  '13-Jährige, viel Streit in der Klasse, faire Lösungen finden',
]

const GREETING =
  'Beschreib mir in eigenen Worten die Situation – zum Beispiel Alter oder Klasse, Thema, ob Einzeln, Gruppe oder Klasse, Interessen und ob du ein Arbeitsblatt brauchst. Ich suche die passendsten Materialien heraus und sortiere sie nach Passung.'

function MatchBar({ percent }: { percent: number }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5" title={`Passung ${percent} %`}>
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-page-2">
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-8 text-right text-[11.5px] font-semibold text-muted tabular-nums">{percent} %</span>
    </div>
  )
}

function ResultCard({
  r,
  rating,
  onOpen,
  onDownload,
  downloading,
  rankNo,
}: {
  r: Ranked
  rating: number
  onOpen: () => void
  onDownload: () => void
  downloading: boolean
  rankNo: number
}) {
  const m = r.material
  return (
    <div className="flex gap-3 rounded-xl border border-line bg-surface p-3">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-[12.5px] font-bold text-accent-strong">
        {rankNo}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[14.5px] leading-snug font-semibold text-ink">{m.title}</span>
          <MatchBar percent={r.percent} />
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted">
          <span className="font-semibold text-accent">{typeLabels(m)}</span>
          {m.ageLevels.map((a) => (
            <span key={a} className="tag">
              {a}
            </span>
          ))}
          {m.worksheet && (
            <span className="tag tag-outline">
              <Icon name="file" />
              Arbeitsblatt
            </span>
          )}
          {rating > 0 && <StarRating value={rating} size={12} readOnly />}
        </div>
        {r.reasons.length > 0 && (
          <div className="mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-snug text-muted">
            <Icon name="check" className="ic mt-px h-3.5 w-3.5 text-ok" />
            <span>{r.reasons.join(' · ')}</span>
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={onOpen} className="btn btn-sm">
            Öffnen
          </button>
          <button type="button" onClick={onDownload} disabled={downloading} className="btn btn-sm btn-quiet">
            {downloading ? <span className="spin" /> : <Icon name="download" />}
            PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export function ChatFinder({ onClose, onApply, onOpen, onDownload, downloadingId, ratings, materials }: Props) {
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: GREETING }])
  const [signals, setSignals] = useState<Signals>(emptySignals)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const lastResults = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role === 'bot' && m.results) return m.results
    }
    return null
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function send(raw: string) {
    const text = raw.trim()
    if (!text) return
    setInput('')
    const add = parse(text)
    const merged = mergeSignals(signals, add)
    setSignals(merged)
    const results = rank(materials, merged, ratings)
    const understood = describe(merged)
    let botText: string
    if (!hasAnySignal(merged)) {
      botText =
        'Daraus konnte ich noch kein Kriterium erkennen. Nenn mir zum Beispiel das Alter (oder die Klasse), worum es geht (Thema oder Verhalten) und ob es für Einzeln, Gruppe oder Klasse sein soll.'
    } else if (results.length) {
      botText = `Ich habe ${results.length} passende Materialien gefunden – die besten stehen oben. Du kannst weiter verfeinern, z. B. „lieber ohne Arbeitsblatt“ oder „eher für die ganze Klasse“.`
    } else {
      botText = 'Dazu habe ich nichts Passendes gefunden. Lockere ein Kriterium oder beschreib es etwas anders.'
    }
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'bot', text: botText, results: results.slice(0, 6), understood },
    ])
  }

  function reset() {
    setSignals(emptySignals)
    setMessages([{ role: 'bot', text: GREETING }])
  }

  const understood = describe(signals)

  return (
    <Dialog onClose={onClose} labelledBy={titleId} className="dlg-mid sm:h-[min(820px,calc(100dvh-48px))]">
      <header className="dlg-head items-center">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name="compass" className="ic h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="disp text-[19px] leading-tight">
            Material-Finder
          </h2>
          <p className="text-[13px] text-muted max-sm:hidden">Situation beschreiben – passende Materialien finden und vergleichen</p>
        </div>
        {hasAnySignal(signals) && (
          <button type="button" onClick={reset} className="btn btn-sm btn-quiet">
            <Icon name="reset" />
            <span className="max-sm:sr-only">Neu starten</span>
          </button>
        )}
        <button type="button" onClick={onClose} className="icon-btn" aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>

      <div ref={scrollRef} className="dlg-body scroll-slim space-y-3 bg-surface-2 p-4 sm:p-5" aria-live="polite">
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[14px] text-white">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="flex flex-col items-start gap-2">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-2.5 text-[14px] leading-relaxed text-ink-2">
                {m.text}
              </div>
              {m.understood && m.understood.length > 0 && (
                <div className="flex flex-wrap gap-1 pl-1">
                  {m.understood.map((u, j) => (
                    <span key={j} className="badge badge-upload">
                      {u}
                    </span>
                  ))}
                </div>
              )}
              {m.results && m.results.length > 0 && (
                <div className="w-full space-y-2">
                  {m.results.map((r, j) => (
                    <ResultCard
                      key={r.material.id}
                      r={r}
                      rankNo={j + 1}
                      rating={ratings[r.material.id] || 0}
                      onOpen={() => onOpen(r.material)}
                      onDownload={() => onDownload(r.material)}
                      downloading={downloadingId === r.material.id}
                    />
                  ))}
                  <button type="button" onClick={() => onApply(signalsToFilter(signals))} className="btn w-full">
                    Alle Treffer in der Bibliothek anzeigen
                    <Icon name="arrowRight" />
                  </button>
                </div>
              )}
            </div>
          ),
        )}

        {messages.length === 1 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 pl-1 text-[12.5px] font-semibold text-muted">
              <Icon name="lightbulb" className="ic h-4 w-4" />
              Beispiele – antippen oder selbst schreiben
            </div>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => send(ex)}
                className="block w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left text-[14px] text-ink-2 transition hover:border-accent-line hover:text-accent-strong"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dlg-foot flex-col items-stretch gap-2">
        {understood.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1 text-[12px] font-semibold text-muted">Verstanden:</span>
            {understood.map((u, i) => (
              <span key={i} className="badge badge-upload">
                {u}
              </span>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-end gap-2"
        >
          <label className="sr-only" htmlFor={titleId + '-in'}>
            Situation beschreiben
          </label>
          <textarea
            id={titleId + '-in'}
            data-autofocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            rows={1}
            placeholder={lastResults ? 'Verfeinern, z. B. „ohne Arbeitsblatt“' : 'Situation beschreiben …'}
            className="field max-h-28 min-h-[42px] flex-1 resize-none"
          />
          <button type="submit" disabled={!input.trim()} className="btn btn-primary h-[42px] w-[42px] p-0" aria-label="Senden">
            <Icon name="send" />
          </button>
        </form>
      </div>
    </Dialog>
  )
}
