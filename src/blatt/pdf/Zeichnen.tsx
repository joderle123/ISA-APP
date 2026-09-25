// Übersetzt eine Zeichnung (src/blatt/zeichnung.ts) in @react-pdf-SVG.
import { Svg, Path, Circle, Ellipse, Rect, Line, Polyline, Polygon, G } from '@react-pdf/renderer'
import type { ReactElement } from 'react'
import { farbe, type Form, type Palette, type Zeichnung } from '../zeichnung'

function formPdf(f: Form, p: Palette, w: number, key: number): ReactElement {
  if (f.t === 'g') {
    return (
      <G key={key} transform={f.tf} opacity={f.o}>
        {f.formen.map((x, i) => formPdf(x, p, w, i))}
      </G>
    )
  }
  const fill = farbe(f.f, p) ?? 'none'
  const stroke = farbe(f.s, p) ?? 'none'
  const common = {
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
      return <Path key={key} d={f.d} {...common} />
    case 'circle':
      return <Circle key={key} cx={f.cx} cy={f.cy} r={f.r} {...common} />
    case 'ellipse':
      return <Ellipse key={key} cx={f.cx} cy={f.cy} rx={f.rx} ry={f.ry} {...common} />
    case 'rect':
      return <Rect key={key} x={f.x} y={f.y} width={f.b} height={f.h} rx={f.rx} ry={f.rx} {...common} />
    case 'line':
      return <Line key={key} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2} {...common} />
    case 'polyline':
      return <Polyline key={key} points={f.p} {...common} />
    case 'polygon':
      return <Polygon key={key} points={f.p} {...common} />
  }
}

/** Zeichnung in fester Breite (Höhe aus dem Seitenverhältnis) oder in eine Box eingepasst. */
export function Zeichnen({
  z,
  p,
  breite,
  hoehe,
}: {
  z: Zeichnung
  p: Palette
  breite?: number
  hoehe?: number
}) {
  const [x, y, vw, vh] = z.vb
  let b = breite ?? 40
  let h = (b * vh) / vw
  if (hoehe !== undefined && breite === undefined) {
    h = hoehe
    b = (h * vw) / vh
  } else if (hoehe !== undefined && h > hoehe) {
    h = hoehe
    b = (h * vw) / vh
  }
  return (
    <Svg width={b} height={h} viewBox={`${x} ${y} ${vw} ${vh}`}>
      {z.formen.map((f, i) => formPdf(f, p, z.w ?? 2, i))}
    </Svg>
  )
}
