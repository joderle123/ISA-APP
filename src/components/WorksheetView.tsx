import type { ReactNode } from 'react'
import type { Worksheet, WorksheetBlock } from '../types/material'
import { themeColor } from '../lib/themeColors'

// On-screen, visually rich rendering of a worksheet — mirrors the printable PDF
// (numbered tasks, writing lines, pictorial scales, drawing boxes, tables).

const FACES = ['😞', '🙁', '😐', '🙂', '😊']
const COLOR_WORD: Record<string, string> = {
  grün: '#43a047', gruen: '#43a047', gelb: '#f9c400', orange: '#fb8c00', rot: '#e53935',
  blau: '#1e88e5', grau: '#9e9e9e', rosa: '#ec407a', lila: '#8e24aa', violett: '#8e24aa',
  braun: '#795548', schwarz: '#37474f', türkis: '#1f8a8a', tuerkis: '#1f8a8a',
}
const WEATHER: [RegExp, string][] = [
  [/sonn/, '☀️'], [/wolk|bewölk|bewoelk/, '☁️'], [/regen|regn/, '🌧️'],
  [/gewitter|sturm|blitz|donner/, '⛈️'], [/schnee/, '❄️'],
]

function glyphFor(label: string, deep: string): ReactNode {
  const k = label.toLowerCase().replace(/[^a-zäöüß]/g, '')
  if (COLOR_WORD[k])
    return <span className="inline-block h-5 w-5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: COLOR_WORD[k] }} />
  for (const [re, emo] of WEATHER) if (re.test(k)) return <span className="text-2xl leading-none">{emo}</span>
  void deep
  return null
}

function Lines({ n, color }: { n: number; color: string }) {
  return (
    <div className="mt-2 space-y-3">
      {Array.from({ length: Math.max(1, n) }).map((_, i) => (
        <div key={i} className="border-b" style={{ borderColor: color }} />
      ))}
    </div>
  )
}

function Num({ n, deep }: { n: number; deep: string }) {
  return (
    <span
      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: deep }}
    >
      {n}
    </span>
  )
}

function Block({ block, num, deep, light }: { block: WorksheetBlock; num: number | null; deep: string; light: string }) {
  const { kind, text, lines, items } = block
  const prompt = (
    <div className="flex items-start gap-2.5">
      {num ? <Num n={num} deep={deep} /> : null}
      <p className="font-semibold text-slate-800">{text}</p>
    </div>
  )

  if (kind === 'heading')
    return (
      <div className="mt-5 mb-1 flex items-center gap-2">
        <span className="h-5 w-1.5 rounded-full" style={{ backgroundColor: deep }} />
        <h4 className="text-base font-bold" style={{ color: deep }}>{text}</h4>
      </div>
    )

  if (kind === 'instruction')
    return (
      <p className="mt-2 rounded-lg px-3 py-2 text-sm" style={{ backgroundColor: light, color: deep }}>
        {text}
      </p>
    )

  if (kind === 'question' || (kind === 'lines' && text))
    return (
      <div className="mt-4">
        {prompt}
        <div className={num ? 'pl-[34px]' : ''}>
          <Lines n={lines ?? 2} color="#cdd5df" />
        </div>
      </div>
    )

  if (kind === 'lines') return <div className="mt-3"><Lines n={lines ?? 3} color="#cdd5df" /></div>

  if (kind === 'box')
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div
          className={`mt-2 rounded-xl border-2 border-dashed ${num ? 'ml-[34px]' : ''}`}
          style={{ borderColor: '#cbd5e1', height: Math.min(220, (lines ?? 5) * 26) }}
        />
      </div>
    )

  if (kind === 'checklist')
    return (
      <div className="mt-3 space-y-2.5">
        {(items ?? []).map((it, i) => {
          const g = glyphFor(it, deep)
          return (
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-5 w-5 shrink-0 rounded-md border-2" style={{ borderColor: deep }} />
              {g}
              <span className="text-slate-700">{it}</span>
            </div>
          )
        })}
      </div>
    )

  if (kind === 'scale') {
    const its = items ?? []
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-3 flex flex-wrap gap-2.5 ${num ? 'pl-[34px]' : ''}`}>
          {its.map((lab, i) => {
            const g = glyphFor(lab, deep) ?? (
              <span className="text-2xl leading-none">
                {FACES[Math.round((its.length > 1 ? i / (its.length - 1) : 0.5) * (FACES.length - 1))]}
              </span>
            )
            return (
              <div
                key={i}
                className="flex min-w-[84px] flex-1 flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5"
                style={{ borderColor: deep }}
              >
                {g}
                <span className="text-center text-xs font-semibold text-slate-700">{lab}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (kind === 'table') {
    const cols = items ?? []
    const rows = lines ?? 3
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex" style={{ backgroundColor: deep }}>
            {cols.map((c, i) => (
              <div key={i} className="flex-1 px-3 py-2 text-xs font-bold text-white">{c}</div>
            ))}
          </div>
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex" style={{ backgroundColor: r % 2 ? '#f6f9fc' : '#fff' }}>
              {cols.map((_, c) => (
                <div key={c} className="h-9 flex-1 border-t border-l border-slate-200 first:border-l-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function WorksheetView({
  worksheet: w,
  themeId,
  fallbackTitle,
}: {
  worksheet: Worksheet
  themeId?: string
  fallbackTitle: string
}) {
  const { deep, light } = themeColor(themeId)
  let task = 0
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1.5" style={{ backgroundColor: deep }} />
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase"
            style={{ backgroundColor: deep }}
          >
            Arbeitsblatt
          </span>
          <h3 className="font-bold text-slate-800">{w.title || fallbackTitle}</h3>
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">
          <span>Numm: <span className="inline-block w-40 border-b border-slate-300" /></span>
          <span>Datum: <span className="inline-block w-24 border-b border-slate-300" /></span>
        </div>

        {w.intro ? (
          <p className="mt-3 rounded-lg px-3 py-2 text-sm text-slate-700" style={{ backgroundColor: light }}>
            {w.intro}
          </p>
        ) : null}

        {w.blocks.map((b, i) => {
          const isTask = b.kind !== 'heading' && b.kind !== 'instruction'
          if (isTask) task += 1
          return <Block key={i} block={b} num={isTask ? task : null} deep={deep} light={light} />
        })}

        <p className="mt-4 text-xs text-slate-400">
          So sieht das druckbare Arbeitsblatt aus — „PDF herunterladen" für die Druckversion.
        </p>
      </div>
    </div>
  )
}
