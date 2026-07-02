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
const LEGEND_COLORS = ['#e53935', '#1e88e5', '#43a047', '#f9a825', '#8e24aa', '#fb8c00']

function zoneColor(label: string, idx: number, count: number): string {
  const k = label.toLowerCase().replace(/[^a-zäöüß]/g, '')
  if (COLOR_WORD[k]) return COLOR_WORD[k]
  const ramp = ['#43a047', '#f9c400', '#fb8c00', '#e53935']
  return ramp[Math.min(3, Math.round((idx / Math.max(1, count - 1)) * 3))]
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

  if (kind === 'columns') {
    const cols = items ?? []
    const rows = lines ?? 4
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-2 flex gap-2.5 ${num ? 'pl-[34px]' : ''}`}>
          {cols.map((c, i) => (
            <div key={i} className="flex-1 overflow-hidden rounded-xl border" style={{ borderColor: deep }}>
              <div className="px-2 py-1.5 text-center text-xs font-bold text-white" style={{ backgroundColor: deep }}>
                {c}
              </div>
              <div className="space-y-4 px-2.5 pt-1 pb-3">
                {Array.from({ length: rows }).map((_, r) => (
                  <div key={r} className="border-b border-slate-300" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'wordbank')
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-2 flex flex-wrap gap-1.5 rounded-xl p-2.5 ${num ? 'ml-[34px]' : ''}`} style={{ backgroundColor: light }}>
          {(items ?? []).map((w, i) => (
            <span
              key={i}
              className="rounded-full border bg-white px-2.5 py-0.5 text-xs font-semibold"
              style={{ borderColor: deep, color: deep }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    )

  if (kind === 'sentences')
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`space-y-3 ${num ? 'pl-[34px]' : ''} mt-1`}>
          {(items ?? []).map((st, i) => (
            <div key={i}>
              <div className="flex items-end gap-1.5">
                <span className="text-sm font-semibold italic" style={{ color: deep }}>{st}</span>
                <span className="mb-0.5 flex-1 border-b border-slate-300" />
              </div>
              {Array.from({ length: Math.max(0, (lines ?? 1) - 1) }).map((_, r) => (
                <div key={r} className="mt-5 border-b border-slate-300" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )

  if (kind === 'bubble') {
    const speakers = items && items.length ? items : ['']
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`space-y-3 ${num ? 'pl-[34px]' : ''} mt-1`}>
          {speakers.map((sp, i) => {
            const right = i % 2 === 1
            return (
              <div key={i} className={`flex flex-col ${right ? 'items-end' : 'items-start'}`}>
                {sp ? (
                  <span className={`mb-0.5 text-xs font-bold ${right ? 'mr-3' : 'ml-3'}`} style={{ color: deep }}>
                    {sp}
                  </span>
                ) : null}
                <div
                  className={`w-[82%] rounded-2xl border-2 bg-white px-3 pt-1 pb-3 ${right ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                  style={{ borderColor: deep }}
                >
                  {Array.from({ length: lines ?? 2 }).map((_, r) => (
                    <div key={r} className="mt-5 border-b border-slate-300" />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (kind === 'steps') {
    const st = items ?? []
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-2 ${num ? 'pl-[34px]' : ''}`}>
          {st.map((label, i) => {
            const filled = !!(label && label.trim())
            const extra = filled ? (lines ?? 0) : Math.max(1, lines ?? 1)
            return (
              <div key={i} className="flex gap-2.5">
                <div className="flex w-6 flex-col items-center">
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: deep }}
                  >
                    {i + 1}
                  </span>
                  {i < st.length - 1 ? <span className="my-0.5 w-0.5 flex-1 rounded" style={{ backgroundColor: light }} /> : null}
                </div>
                <div className="flex-1 pb-3">
                  {filled ? <p className="pt-0.5 text-sm text-slate-700">{label}</p> : null}
                  {Array.from({ length: extra }).map((_, r) => (
                    <div key={r} className="mt-5 border-b border-slate-300" />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (kind === 'thermometer') {
    const zones = items && items.length ? items : ['ruhig', 'angespannt', 'gestresst', 'kurz vorm Überkochen']
    const n = zones.length
    const rev = [...zones].reverse()
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-2 flex gap-3 ${num ? 'pl-[34px]' : ''}`}>
          <div className="flex w-7 flex-col items-center">
            {rev.map((lab, i) => (
              <div
                key={i}
                className="mb-1 w-5 flex-1 rounded"
                style={{ backgroundColor: zoneColor(lab, n - 1 - i, n), minHeight: 40 }}
              />
            ))}
            <div className="h-7 w-7 rounded-full" style={{ backgroundColor: zoneColor(zones[0], 0, n) }} />
          </div>
          <div className="flex flex-1 flex-col">
            {rev.map((lab, i) => (
              <div key={i} className="flex flex-1 flex-col justify-center pb-1" style={{ minHeight: 44 }}>
                <span className="text-xs font-bold text-slate-700">{lab}</span>
                <div className="mt-3 border-b border-slate-300" />
              </div>
            ))}
            <div className="h-7" />
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'bodymap')
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className={`mt-2 flex gap-3 ${num ? 'ml-[34px]' : ''}`}>
          <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 py-3">
            <svg width={Math.min(120, (lines ?? 8) * 12)} viewBox="0 0 100 240" fill="none">
              <circle cx="50" cy="26" r="19" stroke={deep} strokeWidth="5" />
              <rect x="36" y="52" width="28" height="80" rx="13" stroke={deep} strokeWidth="5" />
              <line x1="34" y1="64" x2="12" y2="112" stroke={deep} strokeWidth="7" strokeLinecap="round" />
              <line x1="66" y1="64" x2="88" y2="112" stroke={deep} strokeWidth="7" strokeLinecap="round" />
              <line x1="43" y1="134" x2="37" y2="218" stroke={deep} strokeWidth="7" strokeLinecap="round" />
              <line x1="57" y1="134" x2="63" y2="218" stroke={deep} strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
          {items && items.length ? (
            <div className="w-36 shrink-0">
              <p className="mb-1.5 text-xs font-bold text-slate-700">Legende</p>
              {items.map((it, i) => (
                <div key={i} className="mb-1.5 flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: LEGEND_COLORS[i % LEGEND_COLORS.length] }}
                  />
                  <span className="text-xs text-slate-600">{it}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )

  if (kind === 'target') {
    const rings = items && items.length ? items : ['später', 'bald', 'jetzt']
    const n = rings.length
    return (
      <div className="mt-4">
        {text ? prompt : null}
        <div className="mt-2 flex flex-col items-center">
          <svg width="150" height="150" viewBox="0 0 140 140">
            {rings.map((_, i) => (
              <circle
                key={i}
                cx="70"
                cy="70"
                r={66 - (i * 66) / n}
                fill={i === n - 1 ? light : i % 2 ? '#fff' : '#f2f5f9'}
                stroke={deep}
                strokeWidth="1.6"
              />
            ))}
          </svg>
          <div className="mt-1.5 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {rings.map((lab, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-slate-600">
                <span
                  className="h-2.5 w-2.5 rounded-full border"
                  style={{ borderColor: deep, backgroundColor: i === n - 1 ? light : i % 2 ? '#fff' : '#f2f5f9' }}
                />
                {n - i}. {lab}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'mindmap') {
    const branches = items && items.length ? items : Array.from({ length: Math.max(3, Math.min(8, lines ?? 6)) }, () => '')
    const n = branches.length
    const W = 460
    const H = 220
    const cx = W / 2
    const cy = H / 2
    const bw = 96
    const bh = 32
    return (
      <div className="mt-4 overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="mx-auto block">
          {branches.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2
            const bx = cx + Math.cos(a) * (W / 2 - bw / 2 - 6)
            const by = cy + Math.sin(a) * (H / 2 - bh / 2 - 6)
            return <line key={'l' + i} x1={cx} y1={cy} x2={bx} y2={by} stroke={deep} strokeWidth="1.4" />
          })}
          {branches.map((lab, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2
            const bx = cx + Math.cos(a) * (W / 2 - bw / 2 - 6)
            const by = cy + Math.sin(a) * (H / 2 - bh / 2 - 6)
            return (
              <g key={'e' + i}>
                <ellipse cx={bx} cy={by} rx={bw / 2} ry={bh / 2} fill="#fff" stroke={deep} strokeWidth="1.6" />
                {lab ? (
                  <text x={bx} y={by + 3.5} textAnchor="middle" fontSize="10" fill="#334155">
                    {lab.length > 16 ? lab.slice(0, 15) + '…' : lab}
                  </text>
                ) : null}
              </g>
            )
          })}
          <ellipse cx={cx} cy={cy} rx={64} ry={25} fill={deep} />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">
            {(text || 'Ich').length > 18 ? (text || 'Ich').slice(0, 17) + '…' : text || 'Ich'}
          </text>
        </svg>
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
