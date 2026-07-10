import { useEffect, useMemo, useRef, useState } from 'react'
import { allMaterials } from '../data/materials'
import type { FilterState } from '../lib/filter'
import type { Material } from '../types/material'
import { ageColors } from '../lib/ui'
import { StarRating } from './StarRating'
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
  'Hi! Ich bin dein Material-Assistent. Beschreib mir in eigenen Worten deine Situation — z. B. Alter/Klasse, Thema, ob Einzeln/Gruppe/Klasse, Interessen, ob du ein Arbeitsblatt brauchst. Ich suche dir die passendsten Materialien heraus und ranke sie.'

function MatchBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-isa-blue-deep" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-[10px] font-semibold text-slate-500">{percent}%</span>
    </div>
  )
}

function ResultCard({
  r, rating, onOpen, onDownload, downloading, rankNo,
}: {
  r: Ranked; rating: number; onOpen: () => void; onDownload: () => void; downloading: boolean; rankNo: number
}) {
  const m = r.material
  return (
    <div className="flex gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5">
      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-isa-blue/60 text-xs font-bold text-isa-blue-deep">
        {rankNo}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">{m.title}</span>
          <MatchBar percent={r.percent} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {m.ageLevels.map((a) => (
            <span key={a} className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${ageColors[a]}`}>{a}</span>
          ))}
          {m.worksheet && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-amber-100">+ AB</span>
          )}
          <StarRating value={rating} size={11} readOnly />
        </div>
        {r.reasons.length > 0 && (
          <div className="mt-1 text-[11px] text-slate-500">✓ {r.reasons.join(' · ')}</div>
        )}
        <div className="mt-1.5 flex gap-1.5">
          <button type="button" onClick={onOpen} className="rounded-lg px-2 py-1 text-xs font-medium text-isa-blue-deep hover:bg-isa-blue/40">
            Öffnen
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="rounded-lg bg-isa-blue-deep px-2 py-1 text-xs font-medium text-white hover:bg-[#264a82] disabled:opacity-50"
          >
            {downloading ? '…' : 'PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ChatFinder({ onClose, onApply, onOpen, onDownload, downloadingId, ratings }: Props) {
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: GREETING }])
  const [signals, setSignals] = useState<Signals>(emptySignals)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

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
    const results = rank(allMaterials, merged, ratings)
    const understood = describe(merged)
    let botText: string
    if (!hasAnySignal(merged)) {
      botText =
        'Hmm, daraus konnte ich noch kein Kriterium erkennen. Nenn mir z. B. das Alter (oder die Klasse), worum es geht (Thema/Verhalten), und ob es für Einzeln, Gruppe oder Klasse sein soll.'
    } else if (results.length) {
      botText = `Alles klar — ich habe ${results.length} passende Materialien gefunden. Die besten oben. Du kannst weiter verfeinern (z. B. „lieber ohne Arbeitsblatt" oder „eher für die ganze Klasse").`
    } else {
      botText = 'Ich habe leider nichts gefunden, das gut passt. Lockere ein Kriterium oder beschreib es etwas anders.'
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
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-start sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl sm:my-2 sm:h-[calc(100vh-1rem)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-isa-blue-deep text-lg">✨</div>
            <div>
              <div className="font-bold text-slate-800">Material-Assistent</div>
              <div className="text-xs text-slate-400">Beschreib deine Situation — ich finde & ranke passende Materialien</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {hasAnySignal(signals) && (
              <button type="button" onClick={reset} className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100">
                ↻ Neu
              </button>
            )}
            <button type="button" onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Schließen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-isa-blue-deep px-3.5 py-2 text-sm text-white">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="flex flex-col items-start gap-2">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2 text-sm text-slate-700">{m.text}</div>
                {m.understood && m.understood.length > 0 && (
                  <div className="flex flex-wrap gap-1 pl-1">
                    {m.understood.map((u, j) => (
                      <span key={j} className="rounded-full bg-isa-green px-2 py-0.5 text-[11px] font-medium text-isa-green-deep">{u}</span>
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
                    <button
                      type="button"
                      onClick={() => onApply(signalsToFilter(signals))}
                      className="w-full rounded-lg border border-isa-blue-deep py-2 text-xs font-semibold text-isa-blue-deep hover:bg-isa-blue/30"
                    >
                      Alle Treffer in der Bibliothek anzeigen
                    </button>
                  </div>
                )}
              </div>
            ),
          )}

          {/* Example prompts (only before first user message) */}
          {messages.length === 1 && (
            <div className="space-y-1.5 pt-1">
              <div className="pl-1 text-xs font-medium text-slate-400">💡 Beispiele — antippen oder selbst tippen:</div>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => send(ex)}
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-600 transition hover:border-isa-blue-deep hover:text-isa-blue-deep"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Understanding summary + input */}
        <div className="border-t border-slate-100 p-3">
          {understood.length > 0 && (
            <div className="mb-2 flex flex-wrap items-center gap-1">
              <span className="text-[11px] text-slate-400">Verstanden:</span>
              {understood.map((u, i) => (
                <span key={i} className="rounded-full bg-isa-blue/60 px-2 py-0.5 text-[11px] text-isa-blue-deep">{u}</span>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className="flex items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              rows={1}
              placeholder={lastResults ? 'Verfeinern … (z. B. „lieber ohne Arbeitsblatt")' : 'Beschreib deinen Schüler / deine Situation …'}
              className="max-h-28 min-h-[2.6rem] flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-isa-blue-deep"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-isa-blue-deep text-white transition hover:bg-[#264a82] disabled:opacity-40"
              aria-label="Senden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
