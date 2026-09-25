// Zeichnung als SVG im Browser (Karten und Kopfbilder in der App).
import type { ReactElement } from 'react'
import { farbe, type Form, type Palette, type Zeichnung } from './zeichnung'

function form(f: Form, p: Palette, w: number, key: number): ReactElement {
  if (f.t === 'g') {
    return (
      <g key={key} transform={f.tf} opacity={f.o}>
        {f.formen.map((x, i) => form(x, p, w, i))}
      </g>
    )
  }
  const fill = farbe(f.f, p) ?? 'none'
  const stroke = farbe(f.s, p) ?? 'none'
  const c = {
    fill,
    stroke,
    strokeWidth: stroke === 'none' ? 0 : (f.w ?? w),
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeDasharray: f.dash,
    opacity: f.o,
  }
  switch (f.t) {
    case 'path':
      return <path key={key} d={f.d} {...c} />
    case 'circle':
      return <circle key={key} cx={f.cx} cy={f.cy} r={f.r} {...c} />
    case 'ellipse':
      return <ellipse key={key} cx={f.cx} cy={f.cy} rx={f.rx} ry={f.ry} {...c} />
    case 'rect':
      return <rect key={key} x={f.x} y={f.y} width={f.b} height={f.h} rx={f.rx} {...c} />
    case 'line':
      return <line key={key} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2} {...c} />
    case 'polyline':
      return <polyline key={key} points={f.p} {...c} />
    case 'polygon':
      return <polygon key={key} points={f.p} {...c} />
  }
}

export function ZeichnungSvg({ z, p, className, titel }: { z: Zeichnung; p: Palette; className?: string; titel?: string }) {
  return (
    <svg viewBox={z.vb.join(' ')} className={className} role={titel ? 'img' : undefined} aria-label={titel} aria-hidden={titel ? undefined : true}>
      {z.formen.map((f, i) => form(f, p, z.w ?? 2, i))}
    </svg>
  )
}
