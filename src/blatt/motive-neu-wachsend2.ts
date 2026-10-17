// ---------------------------------------------------------------------------
// „Wachsende“ Motive für die neuen Einzelkurse, Teil 2: dasselbe Bild in 5 oder 6 Stufen,
// jede Stufe ein Teil vollständiger (wie `bruecke-1` … `bruecke-5`, Teil 1 in motive-neu-wachsend.ts).
//   schutzschild-1 … 5   Wappenschild mit fünf Feldern (Kreuz + Mitte): n Felder gefüllt, der Rest gestrichelt und leer
//                        (ruhig und flächig, ohne Schrift und Symbole – passt auch für 13–16)
//   stopp-hand-1 … 6     erhobene offene Hand: Daumen, Zeige-, Mittel-, Ring-, kleiner Finger, zuletzt die Handfläche;
//                        fehlende Teile als gestrichelte Kontur
//   zebra-1 … 6          Zebra von der Seite: n bunte Streifen zwischen den schwarzen (vom Schwanz zum Hals);
//                        Kopf, Körper und schwarze Streifen sind in jeder Stufe gleich
//   rakete-1 … 5         Rakete auf der Startrampe: n von fünf Lampen leuchten gelb (von oben nach unten),
//                        in Stufe 5 zusätzlich Flammen und Rauch – sie hebt ab
//   schluesselbund-1 … 5 Schlüsselring: n verschiedene Schlüssel (Form und Farbe), fehlende als gestrichelte Umrisse
//   tagesuhr-1 … 5       Wanduhr mit fünf Segmenten im Zifferblatt (ab 12 Uhr im Uhrzeigersinn), n farbig, der Rest
//                        weiß mit gestrichelter Kante; die Zeiger bleiben sichtbar
//   uhr-ziffern          Uhr mit den Ziffern 12 / 3 / 6 / 9 zum Uhrzeit-Lesen. Das Zeichnung-Format kennt keinen Text:
//                        die Ziffern sind Linienzüge (Pfade) – die einzige Ausnahme von „ohne Schrift“, weil sie Inhalt sind
//   turm-umgefallen      umgefallener Turm aus Bauklötzen, Klötze verstreut (Gegenstück zu `turm-1` … `-5`)
//   platzhalter          leerer Kreis mit gestrichelter Kontur (für noch nicht erreichte Teile in Ketten)
// Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, jede Fläche mit Kontur; im Schwarzweißdruck
// helle Flächen gegen dunkle Konturen, Lampen und Streifen auch ohne Farbe unterscheidbar.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, CREME, DUNKEL, GELB, GRUEN, H2, HOLZ, LICHT, LILA, METALL, ORANGE, ROT, WANGE, g, glanz, linie, silhouette, sternPfad, z,
} from './motive-dinge'
import { T, auge, boden, el, kr, pf, poly, punkt, ringPfad, rr, vieleck } from './motive-neu-helfer'

type Pt = [number, number]
const rad = (grad: number) => (grad * Math.PI) / 180
const r1 = (n: number) => +n.toFixed(1)
const pktText = (p: Pt) => `${r1(p[0])} ${r1(p[1])}`
/** Punkt auf dem Kreis um (cx, cy): Winkel in Grad ab 12 Uhr im Uhrzeigersinn. */
const pol = (cx: number, cy: number, r: number, grad: number): Pt => [cx + Math.sin(rad(grad)) * r, cy - Math.cos(rad(grad)) * r]

/** Gestrichelte Linie für Teile, die noch fehlen: etwas kräftiger als GRAU, damit sie auch im Schwarzweißdruck und auf 18 mm sichtbar bleibt. */
const FEHLT_LINIE = '#8A93A3'

/** Platzhalter für ein Teil, das noch fehlt (wie `fehlt()` in motive-neu-wachsend.ts); innen weiß, damit nichts durchscheint. */
const fehlt = (f: Form): Form =>
  f.t === 'g' ? { ...f, formen: f.formen.map(fehlt) } : ({ ...f, f: 'papier', s: FEHLT_LINIE, w: 2, dash: '4 3.6' } as Form)

/** Wie `silhouette`, aber mit gestrichelter Außenlinie: erst alle Teile mit doppelt dicker gestrichelter Linie, dann alle
 *  Flächen ohne Rand darüber – so bleibt nur die äußere Hälfte der Linie und keine Linie zwischen den Teilen. */
function umrissGestrichelt(formen: Form[]): Form[] {
  const mit = (f: Form, extra: { f: string; s: string; w: number; dash?: string }): Form =>
    f.t === 'g' ? { ...f, formen: f.formen.map((x) => mit(x, extra)) } : ({ ...f, ...extra } as Form)
  return [
    ...formen.map((f) => mit(f, { f: 'papier', s: FEHLT_LINIE, w: 4.2, dash: '3.4 6.6' })),
    ...formen.map((f) => mit(f, { f: 'papier', s: 'none', w: 0, dash: undefined })),
  ]
}

// =============================================================================
// Schutzschild
// =============================================================================

function schutzschild(stufe: number): Zeichnung {
  // Kreuzteilung (vier Felder) und eine runde Mitte, die zuletzt darübergelegt wird: leer ist sie eine weiße Scheibe mit
  // gestrichelter Kante, auch wenn die vier Felder schon gefärbt sind.
  const quadranten: Form[] = [
    pf('M20 20 L57.5 20 L57.5 53.5 L20 53.5 Z', '#6FA3DD', 2),
    pf('M62.5 20 L100 20 L100 53.5 L62.5 53.5 Z', GRUEN, 2),
    pf('M20 58.5 L57.5 58.5 L57.5 116 Q20 94 20 62 Z', GELB, 2),
    pf('M62.5 58.5 L100 58.5 L100 62 Q100 94 62.5 116 Z', ORANGE, 2),
  ]
  const mitte = kr(60, 56, 15.5, LILA, 2)
  return z([0, 0, 120, 136], [
    boden(60, 131, 36),
    pf('M12 12 L108 12 L108 62 Q108 100 60 127 Q12 100 12 62 Z', 'hellgrau', 2.8),
    ...quadranten.map((f, i) => (i < stufe ? f : fehlt(f))),
    stufe >= 5 ? mitte : fehlt(mitte),
  ])
}

// =============================================================================
// Stopp-Hand
// =============================================================================

function stoppHand(stufe: number): Zeichnung {
  const AERMEL = '#8EB5E6'
  const finger = (x: number, laenge: number, winkel: number): Form =>
    g(`translate(${x} 82) rotate(${winkel})`, [pf(`M-7 1 L-7 ${7 - laenge} A7 7 0 0 1 7 ${7 - laenge} L7 1 Z`, H2, 2.4)])
  // Reihenfolge der Teile: Daumen, Zeige-, Mittel-, Ring-, kleiner Finger, Handfläche
  const teile: Form[] = [
    g('translate(36 108) rotate(-40)', [pf('M-8 2 L-8 -38 A8 8 0 0 1 8 -38 L8 2 Z', H2, 2.4)]),
    finger(39, 56, -5),
    finger(55, 62, -1.5),
    finger(71, 56, 3),
    finger(87, 44, 8),
    pf('M30 80 L96 80 L96 112 Q96 126 82 126 L44 126 Q30 126 30 112 Z', H2, 2.4),
  ]
  const out: Form[] = []
  teile.forEach((t, i) => {
    if (i >= stufe) out.push(fehlt(t))
  })
  // erst die Finger, die Handfläche zuletzt: ihre Kante deckt die Fußenden der Finger sauber ab
  teile.slice(0, 5).forEach((t, i) => {
    if (i < stufe) out.push(t)
  })
  if (stufe >= 6) out.push(teile[5])
  out.push(rr(30, 118, 66, 28, AERMEL, 8, 2.6), rr(28, 113, 70, 11, CREME, 4, 2.4))
  return z([-6, 12, 112, 140], out)
}

// =============================================================================
// Zebra
// =============================================================================

/** Punkte auf einer (gedrehten) Ellipse. */
function ellipsePunkte(cx: number, cy: number, rx: number, ry: number, winkel = 0, n = 72): Pt[] {
  const w = rad(winkel)
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI
    const x = rx * Math.cos(t)
    const y = ry * Math.sin(t)
    return [cx + x * Math.cos(w) - y * Math.sin(w), cy + x * Math.sin(w) + y * Math.cos(w)] as Pt
  })
}

/** Randpunkt einer gedrehten Ellipse (Parameterwinkel in Grad) und nach außen zeigende Normale. */
function ellipseRand(cx: number, cy: number, rx: number, ry: number, winkel: number, tGrad: number): { p: Pt; n: Pt } {
  const w = rad(winkel)
  const t = rad(tGrad)
  const x = rx * Math.cos(t)
  const y = ry * Math.sin(t)
  const nx = Math.cos(t) / rx
  const ny = Math.sin(t) / ry
  const nl = Math.hypot(nx, ny)
  const dreh = (px: number, py: number): Pt => [px * Math.cos(w) - py * Math.sin(w), px * Math.sin(w) + py * Math.cos(w)]
  const [gx, gy] = dreh(x, y)
  const [mx, my] = dreh(nx / nl, ny / nl)
  return { p: [cx + gx, cy + gy], n: [mx, my] }
}

/** Schneidet ein beliebiges Vieleck mit einem konvexen Vieleck (Sutherland–Hodgman). */
function klipp(subjekt: Pt[], clip: Pt[]): Pt[] {
  let flaeche = 0
  clip.forEach((p, i) => {
    const q = clip[(i + 1) % clip.length]
    flaeche += p[0] * q[1] - q[0] * p[1]
  })
  const vz = flaeche >= 0 ? 1 : -1
  let aus = subjekt
  for (let i = 0; i < clip.length && aus.length; i++) {
    const a = clip[i]
    const b = clip[(i + 1) % clip.length]
    const seite = (p: Pt) => vz * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]))
    const schnitt = (p: Pt, q: Pt): Pt => {
      const s1 = seite(p)
      const s2 = seite(q)
      const t = s1 / (s1 - s2)
      return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
    }
    const neu: Pt[] = []
    aus.forEach((p, j) => {
      const q = aus[(j + 1) % aus.length]
      const pi = seite(p) >= 0
      const qi = seite(q) >= 0
      if (pi) {
        neu.push(p)
        if (!qi) neu.push(schnitt(p, q))
      } else if (qi) neu.push(schnitt(p, q))
    })
    aus = neu
  }
  return aus
}

/** Gefülltes Vieleck ohne Rand (leer, wenn nichts übrig bleibt). */
const fuell = (p: Pt[], f: string): Form[] => (p.length >= 3 ? [poly(p, f, 0)] : [])

const ZEBRA_FARBEN = ['#EC7B6C', '#F2A23E', '#F0CB45', '#74C285', '#62A4E2', '#A98AD8']

function zebra(stufe: number): Zeichnung {
  const KOERPER = { cx: 68, cy: 72, rx: 44, ry: 28 }
  const HALS = { cx: 106, cy: 54, rx: 28, ry: 17, w: -48 }
  const KOPF = { cx: 140, cy: 42, rx: 22, ry: 14.5, w: 28 }
  const out: Form[] = [boden(72, 127, 62, 3.8)]

  // Schwanz mit schwarzer Quaste
  out.push(...tube('M28 64 Q12 66 12 90', 'papier', 4.4), pf('M12 86 Q4 96 9 107 Q19 104 18 89 Z', T, 1.6))

  // Mähne hinter dem Hals: schwarze Zacken entlang des Halsrückens
  for (let k = 0; k < 7; k++) {
    const t = -142 + k * 14
    const a = ellipseRand(HALS.cx, HALS.cy, HALS.rx, HALS.ry, HALS.w, t - 6.5)
    const m = ellipseRand(HALS.cx, HALS.cy, HALS.rx, HALS.ry, HALS.w, t)
    const e = ellipseRand(HALS.cx, HALS.cy, HALS.rx, HALS.ry, HALS.w, t + 6.5)
    const spitze: Pt = [m.p[0] + m.n[0] * 11, m.p[1] + m.n[1] * 11]
    out.push(poly([a.p, spitze, e.p], T, 1.8))
  }

  // Beine: hintere (ferne) zuerst; oben vom Körper verdeckt
  const bein = (x: number, ferne: boolean): Form[] => [
    rr(x, 80, 13, 44, ferne ? '#F3F4F7' : 'papier', 5, 2.4),
    rr(x + 0.8, 101, 11.4, 4.4, T, 0, 0),
    rr(x, 114, 13, 11, T, 4.5, 2.4),
  ]
  out.push(...bein(48, true), ...bein(76, true), ...bein(30, false), ...bein(94, false))

  // Körper und Hals als eine Silhouette
  out.push(
    ...silhouette(
      [
        { t: 'ellipse', cx: KOERPER.cx, cy: KOERPER.cy, rx: KOERPER.rx, ry: KOERPER.ry },
        g(`translate(${HALS.cx} ${HALS.cy}) rotate(${HALS.w})`, [{ t: 'ellipse', cx: 0, cy: 0, rx: HALS.rx, ry: HALS.ry }]),
      ],
      'papier',
      4.4,
    ),
  )

  // Streifen: sieben schwarze und dazwischen sechs bunte; innen am Rand gekürzt, damit die Kontur bleibt
  const B = 4.2
  const C = 12.5
  const breiten = [B, C, B, C, B, C, B, C, B, C, B, C, B]
  const grenzen: number[] = [27]
  breiten.forEach((w) => grenzen.push(grenzen[grenzen.length - 1] + w))
  const x = (i: number, y: number) => grenzen[i] + 0.55 * (i / 13) ** 1.2 * (y - 72)
  const regionen = [
    ellipsePunkte(KOERPER.cx, KOERPER.cy, KOERPER.rx - 2.4, KOERPER.ry - 2.4),
    ellipsePunkte(HALS.cx, HALS.cy, HALS.rx - 2.4, HALS.ry - 2.4, HALS.w),
  ]
  breiten.forEach((_, j) => {
    const bunt = j % 2 === 1
    const nr = (j - 1) / 2
    if (bunt && nr >= stufe) return
    const farbe = bunt ? ZEBRA_FARBEN[nr] : T
    const viereck: Pt[] = [[x(j, 10), 10], [x(j + 1, 10), 10], [x(j + 1, 120), 120], [x(j, 120), 120]]
    for (const region of regionen) out.push(...fuell(klipp(viereck, region), farbe))
  })

  // Ohren (hinter dem Kopf)
  out.push(
    pf('M124 32 Q120 16 127 7 Q136 13 137 29 Z', 'papier', 2.2),
    pf('M134 28 Q134 11 143 3 Q152 10 149 29 Z', 'papier', 2.2),
    pf('M138.5 22 Q138.5 12 143 7.5 Q147.5 13 146 23 Z', T, 0),
  )
  // Kopf mit Streifen
  out.push(el(KOPF.cx, KOPF.cy, KOPF.rx, KOPF.ry, 'papier', 2.4, KOPF.w))
  const achse: Pt = [Math.cos(rad(KOPF.w)), Math.sin(rad(KOPF.w))]
  const quer: Pt = [-achse[1], achse[0]]
  const nacken: Pt = [KOPF.cx - achse[0] * KOPF.rx, KOPF.cy - achse[1] * KOPF.rx]
  const kopfRegion = ellipsePunkte(KOPF.cx, KOPF.cy, KOPF.rx - 2.2, KOPF.ry - 2.2, KOPF.w)
  for (const t of [0.13, 0.27, 0.41]) {
    const m: Pt = [nacken[0] + achse[0] * KOPF.rx * 2 * t, nacken[1] + achse[1] * KOPF.rx * 2 * t]
    const eck = (da: number, dq: number): Pt => [m[0] + achse[0] * da + quer[0] * dq, m[1] + achse[1] * da + quer[1] * dq]
    out.push(...fuell(klipp([eck(-2.2, -20), eck(2.2, -20), eck(2.2, 20), eck(-2.2, 20)], kopfRegion), T))
  }
  // Schopf, Maul, Gesicht
  out.push(
    pf('M130 28 Q131 19 138 14 Q139 22 137 31 Z', T, 1.6),
    el(153.5, 50.5, 10.5, 8.5, '#434B5C', 2.2, 28),
    punkt(158.6, 47.8, 1.3, 'papier'),
    linie('M148.5 55 Q153.5 58.8 158.6 54.6', 1.8, 'papier'),
    el(139.5, 51, 4.4, 2.7, WANGE, 0, 28),
    ...auge(146.5, 38.5, 3.6),
  )
  return z([0, 0, 172, 134], out)
}

// =============================================================================
// Rakete
// =============================================================================

function rakete(stufe: number): Zeichnung {
  const abheben = stufe >= 5
  const LAMPEN_Y = [70, 88, 106, 124, 142]
  const rumpf: Form[] = [
    // Flossen
    pf('M30 108 Q8 124 6 164 L30 146 Z', ROT, 2.4),
    pf('M82 108 Q104 124 106 164 L82 146 Z', ROT, 2.4),
    // Düse
    pf('M40 156 L72 156 L77 174 L35 174 Z', DUNKEL, 2.4),
    // Rumpf und Spitze
    pf('M56 14 Q82 34 82 74 L82 156 L30 156 L30 74 Q30 34 56 14 Z', '#F1F4F8', 2.6),
    pf('M56 14 Q75 28.6 80.1 54 L31.9 54 Q37 28.6 56 14 Z', ROT, 2.4),
    rr(30, 150, 52, 7, BLAU, 0, 2),
    glanz('M37 62 L37 140', 3, 0.8),
  ]
  LAMPEN_Y.forEach((y, i) => {
    if (i < stufe) rumpf.push(kr(56, y, 10, '#FFE9A0', 0))
  })
  LAMPEN_Y.forEach((y, i) => {
    if (i < stufe) {
      rumpf.push(kr(56, y, 7.4, LICHT, 2.2), glanz(`M53 ${y - 2.4} Q54 ${y - 4.4} 57 ${y - 4.6}`, 1.6, 0.95))
      rumpf.push(linie(`M43 ${y} L38.5 ${y} M69 ${y} L73.5 ${y}`, 1.8, '#D9A62E'))
    } else rumpf.push(kr(56, y, 7.4, '#59627A', 2.2))
  })

  const turm: Form[] = [
    rr(108, 70, 24, 114, '#E6EBF1', 1.5, 2.4),
    ...[0, 1, 2, 3, 4, 5].map((k): Form => linie(`M108 ${70 + k * 19} L132 ${89 + k * 19} M132 ${70 + k * 19} L108 ${89 + k * 19}`, 1.3, '#9AA2B1')),
    rr(104, 65, 32, 6, DUNKEL, 2, 2.2),
    kr(120, 61, 4, ROT, 1.8),
  ]
  const platte: Form[] = [rr(20, 174, 92, 9, METALL, 3, 2.2), rr(10, 183, 122, 11, '#8A93A3', 3, 2.4)]

  const out: Form[] = [...turm]
  if (!abheben) out.push(rr(80, 96, 30, 6, METALL, 1.5, 2))
  if (abheben) {
    // Flammen bis auf die Platte, Rauch daneben; die Rakete ist 30 Einheiten höher
    out.push(
      pf('M34 144 Q16 166 56 198 Q96 166 78 144 Z', ORANGE, 2.4),
      pf('M42 144 Q35 164 56 188 Q77 164 70 144 Z', '#FFE27A', 1.8),
      pf('M49 144 Q48 158 56 172 Q64 158 63 144 Z', '#FFF6D2', 0),
    )
  }
  out.push(...platte)
  if (abheben) {
    const wolke = (x: number, s: number): Form[] =>
      silhouette(
        [
          { t: 'circle', cx: x, cy: 177, r: 10 },
          { t: 'circle', cx: x + 11 * s, cy: 181, r: 7.5 },
          { t: 'circle', cx: x - 9 * s, cy: 182, r: 6.5 },
        ],
        '#F4F6F9',
        4,
      )
    out.push(...wolke(22, 1), ...wolke(100, -1))
  }
  out.push(g(`translate(0 ${abheben ? -30 : 0})`, rumpf))
  return z([0, -20, 140, 218], out)
}

// =============================================================================
// Schlüsselbund
// =============================================================================

interface Schluessel {
  farbe: string
  kopf: Form
  loch: [number, number, number]
  laenge: number
  bart: (l: number) => Form[]
}

const zahn = (x: number, y: number, b: number, h: number): Form => ({ t: 'rect', x, y, b, h, rx: 1.4 })

/** Fünf Schlüssel, jeder mit eigener Kopfform, Farbe, Länge und eigenem Bart. Der Kopf sitzt bei (0, 0), der Schaft läuft nach unten. */
const SCHLUESSEL: Schluessel[] = [
  {
    farbe: GELB,
    kopf: { t: 'circle', cx: 0, cy: 0, r: 11 },
    loch: [0, 0, 4],
    laenge: 80,
    bart: (l) => [zahn(3.5, l - 27, 10, 7), zahn(3.5, l - 15, 7, 7)],
  },
  {
    farbe: '#7FAEE3',
    kopf: { t: 'rect', x: -10, y: -10, b: 20, h: 20, rx: 5 },
    loch: [0, 0, 3.8],
    laenge: 86,
    bart: (l) => [zahn(-12.5, l - 28, 9, 7), zahn(3.5, l - 19, 11, 7), zahn(-10, l - 9, 6.5, 7)],
  },
  {
    farbe: '#EE8E7C',
    kopf: { t: 'ellipse', cx: 0, cy: -1, rx: 9.5, ry: 12.5 },
    loch: [0, -1, 3.6],
    laenge: 90,
    bart: (l) => [zahn(3.5, l - 25, 14, 8), zahn(3.5, l - 11, 14, 11)],
  },
  {
    farbe: '#8DC47A',
    kopf: poly([[0, -12.5], [12, 9], [-12, 9]], 'papier', 0),
    loch: [0, 1.5, 3.4],
    laenge: 86,
    bart: (l) => [zahn(-14, l - 27, 10, 6.5), zahn(-11, l - 16, 7.5, 6.5), zahn(3.5, l - 10, 9, 6.5)],
  },
  {
    farbe: '#B59AE0',
    kopf: poly(vieleck(0, 0, 12.5, 6, -90), 'papier', 0),
    loch: [0, 0, 3.8],
    laenge: 80,
    bart: (l) => [zahn(-11, l - 22, 7.5, 6.5), zahn(3.5, l - 28, 11, 6.5), zahn(3.5, l - 15, 9, 6.5)],
  },
]

function schluesselbund(stufe: number): Zeichnung {
  const RC = { x: 100, y: 44, r: 28 }
  // Die Schlüssel hängen am unteren Bogen des Rings und fächern sich nach außen auf.
  const lage = (i: number) => {
    const phi = (i - 2) * 18
    return { x: RC.x + RC.r * Math.sin(rad(phi)), y: RC.y + RC.r * Math.cos(rad(phi)), psi: (i - 2) * 28 }
  }
  const teile = (s: Schluessel): Form[] => [
    s.kopf,
    { t: 'rect', x: -4, y: 6, b: 8, h: s.laenge - 6, rx: 2 },
    ...s.bart(s.laenge),
  ]
  const zeichne = (i: number): Form => {
    const s = SCHLUESSEL[i]
    const p = lage(i)
    const [lx, ly, lr] = s.loch
    const farbig = i < stufe
    return g(`translate(${r1(p.x)} ${r1(p.y)}) rotate(${-p.psi})`, [
      ...(farbig ? silhouette(teile(s), s.farbe, 4.4) : umrissGestrichelt(teile(s))),
      farbig ? kr(lx, ly, lr, 'papier', 1.8) : fehlt(kr(lx, ly, lr, 'papier', 1.8)),
    ])
  }
  const out: Form[] = []
  for (let i = 0; i < 5; i++) if (i >= stufe) out.push(zeichne(i))
  for (let i = 0; i < 5; i++) if (i < stufe) out.push(zeichne(i))
  out.push(pf(ringPfad(RC.x, RC.y, 31, 31, 25, 25), METALL, 2.4), glanz('M80 24 Q88 16 100 14', 2.6, 0.8))
  return z([0, 0, 200, 170], out)
}

// =============================================================================
// Uhren
// =============================================================================

function ringSektor(cx: number, cy: number, ra: number, ri: number, a0: number, a1: number): string {
  const gross = a1 - a0 > 180 ? 1 : 0
  return `M${pktText(pol(cx, cy, ra, a0))} A${ra} ${ra} 0 ${gross} 1 ${pktText(pol(cx, cy, ra, a1))} L${pktText(pol(cx, cy, ri, a1))} A${ri} ${ri} 0 ${gross} 0 ${pktText(pol(cx, cy, ri, a0))} Z`
}

function zeiger(cx: number, cy: number, grad: number, laenge: number, w: number): Form {
  return linie(`M${cx} ${cy} L${pktText(pol(cx, cy, laenge, grad))}`, w)
}

function ticks(cx: number, cy: number, ra: number, ri: number): Form[] {
  return Array.from({ length: 12 }, (_, i): Form => linie(`M${pktText(pol(cx, cy, ra, i * 30))} L${pktText(pol(cx, cy, ri, i * 30))}`, i % 3 === 0 ? 2.8 : 2))
}

const TAG_FARBEN = [GELB, '#8DC47A', ORANGE, '#6FA3DD', '#A98BD6']

function tagesuhr(stufe: number): Zeichnung {
  const cx = 65
  const cy = 66
  const RA = 37
  const RI = 14
  const out: Form[] = [kr(cx, cy, 56, HOLZ, 2.8), kr(cx, cy, 47, 'papier', 2.2), ...ticks(cx, cy, 44.5, 40)]
  // Fehlende Segmente: eine gemeinsame weiße Fläche mit gestrichelter Kante und gestrichelten Trennlinien (keine Doppellinien)
  if (stufe < 5) {
    out.push(fehlt(pf(ringSektor(cx, cy, RA, RI, stufe * 72 + 2, 358), 'papier', 1)))
    for (let k = stufe + 1; k < 5; k++) out.push({ ...fehlt(linie(`M${pktText(pol(cx, cy, RI, k * 72))} L${pktText(pol(cx, cy, RA, k * 72))}`, 2)), f: 'none' } as Form)
  }
  TAG_FARBEN.slice(0, stufe).forEach((farbe, i) => out.push(pf(ringSektor(cx, cy, RA, RI, i * 72 + 2, (i + 1) * 72 - 2), farbe, 1.8)))
  out.push(zeiger(cx, cy, 300, 21, 4), zeiger(cx, cy, 60, 32, 3.2), kr(cx, cy, 4.6, T, 0), kr(cx, cy, 1.5, 'papier', 0))
  return z([4, 4, 122, 124], out)
}

/** Ziffern als Linienzüge in einem Kästchen von etwa 9 × 14 Einheiten, Mitte bei (0, 0). */
const ZIFFER: Record<string, string> = {
  '1': 'M-2.8 -3.6 L1.4 -6.8 L1.4 6.6',
  '2': 'M-4 -3.4 C-3.6 -7.8 4.4 -7.8 4.2 -3 C4 -0.4 -0.8 2.2 -4.4 6.6 L4.6 6.6',
  '3': 'M-3.6 -5.2 C-2 -7.4 3.8 -7.4 3.8 -3.6 C3.8 -1.2 1.4 -0.2 -1 -0.2 C1.8 -0.2 4.4 1 4.4 3.8 C4.4 7.6 -2 8 -4.2 5.4',
  '6': 'M3.4 -5.6 C0 -8.4 -4.4 -5 -4.4 1 C-4.4 5 -2.4 7 0.2 7 C3 7 4.4 4.8 4.4 2.6 C4.4 0.2 2.6 -1.4 0 -1.4 C-2.4 -1.4 -4.4 0.6 -4.4 2',
}

function ziffer(c: '1' | '2' | '3' | '6' | '9', x: number, y: number, s = 1.1): Form {
  const d = c === '9' ? ZIFFER['6'] : ZIFFER[c]
  return g(`translate(${r1(x)} ${r1(y)})${c === '9' ? ' rotate(180)' : ''} scale(${s})`, [linie(d, 2.4)])
}

function uhrZiffern(): Zeichnung {
  const cx = 70
  const cy = 68
  const R = 33
  return z([6, 6, 128, 128], [
    kr(cx, cy, 60, BLAU, 2.8),
    kr(cx, cy, 51, 'papier', 2.2),
    ...ticks(cx, cy, 47, 42.5),
    // 12, 3, 6, 9 als Pfade
    ziffer('1', cx - 5.8, cy - R),
    ziffer('2', cx + 5.8, cy - R),
    ziffer('3', cx + R, cy),
    ziffer('6', cx, cy + R),
    ziffer('9', cx - R, cy),
    zeiger(cx, cy, 300, 20, 4),
    zeiger(cx, cy, 60, 27, 3.2),
    kr(cx, cy, 4.6, T, 0),
    kr(cx, cy, 1.5, 'papier', 0),
    glanz('M26 50 Q32 34 48 26', 3.4, 0.7),
  ])
}

// =============================================================================
// Turm umgefallen
// =============================================================================

/** Klötze wie in `turm` (motive-neu-wachsend.ts): Breite, Farbe, Zeichen darauf. */
const KLOETZE: { w: number; f: string; deko: (cx: number, cy: number) => Form[] }[] = [
  { w: 78, f: ROT, deko: (cx, cy) => [kr(cx, cy, 6.4, 'papier', 1.6)] },
  { w: 70, f: GELB, deko: (cx, cy) => [pf(sternPfad(cx, cy, 8, 3.8), 'papier', 1.6)] },
  { w: 62, f: BLAU, deko: (cx, cy) => [poly([[cx - 7, cy + 6], [cx + 7, cy + 6], [cx, cy - 7]], 'papier', 1.6)] },
  { w: 54, f: GRUEN, deko: (cx, cy) => [-9, 0, 9].map((d): Form => punkt(cx + d, cy, 3, 'papier')) },
  { w: 46, f: ORANGE, deko: (cx, cy) => [linie(`M${cx - 10} ${cy + 3} L${cx - 5} ${cy - 3} L${cx} ${cy + 3} L${cx + 5} ${cy - 3} L${cx + 10} ${cy + 3}`, 2.2, 'papier')] },
]

function turmUmgefallen(): Zeichnung {
  const H = 23
  const klotz = (i: number, cx: number, cy: number, grad: number): Form => {
    const b = KLOETZE[i]
    return g(`translate(${r1(cx)} ${r1(cy)}) rotate(${grad})`, [
      rr(-b.w / 2, -H / 2, b.w, H, b.f, 4, 2.6),
      glanz(`M${-b.w / 2 + 6} ${-H / 2 + 5} L${-b.w / 2 + 22} ${-H / 2 + 5}`, 2.6, 0.7),
      ...b.deko(0, 1),
    ])
  }
  // zwei Reihen: hinten (Boden y 94) der Rest des Turms, vorn (Boden y 112) zwei Klötze, die weit gefallen sind
  const HINTEN = 94
  const VORN = 112
  // liegt flach (oder leicht gedreht) auf dem Boden oder auf einer Fläche in Höhe `grund`
  const liegt = (i: number, cx: number, grad: number, grund: number): Form => {
    const w = KLOETZE[i].w
    const s = Math.abs(Math.sin(rad(grad)))
    const c = Math.cos(rad(grad))
    return klotz(i, cx, grund - ((w / 2) * s + (H / 2) * c), grad)
  }
  // lehnt mit der Unterseite an einer Kante (kx, boden − H) und steht mit dem unteren Ende auf dem Boden
  const lehnt = (i: number, kx: number, grad: number, boden: number): Form => {
    const w = KLOETZE[i].w
    const s = Math.sin(rad(grad))
    const c = Math.cos(rad(grad))
    const abstand = H / s // Strecke von der Kante bis zum Fuß entlang der Unterseite
    const ax = kx + abstand * c
    const u: Pt = [-c, -s] // entlang der Unterseite nach oben
    const n: Pt = [s, -c] // ins Innere des Klotzes
    return klotz(i, ax + (w / 2) * u[0] + (H / 2) * n[0], boden + (w / 2) * u[1] + (H / 2) * n[1], grad)
  }
  return z([0, 40, 182, 92], [
    boden(80, HINTEN + 2, 80, 3),
    boden(92, VORN + 2, 88, 3.6),
    // hinten: roter Grundklotz, darauf schief der orange; der gelbe lehnt an der Ecke des roten und steht mit dem Fuß am Boden
    liegt(0, 46, -2, HINTEN),
    liegt(4, 32, -6, HINTEN - H),
    lehnt(1, 85, 25, HINTEN),
    // Staub am Fuß des gelben
    kr(151, 86, 3, 'hellgrau', 1.4),
    kr(157, 80.5, 2.4, 'hellgrau', 1.2),
    kr(147.5, 79.5, 2, 'hellgrau', 1.2),
    // vorn: blau und grün liegen verstreut
    liegt(2, 84, 3, VORN),
    liegt(3, 148, -4, VORN),
    // die Fahne liegt ganz vorn
    linie('M26 123 L96 123', 2.8),
    poly([[88, 122], [106, 125], [88, 128]], ROT, 2),
  ])
}

// =============================================================================
// Platzhalter
// =============================================================================

function platzhalter(): Zeichnung {
  return z([0, 0, 100, 100], [{ t: 'circle', cx: 50, cy: 50, r: 40, f: 'none', s: FEHLT_LINIE, w: 3, dash: '6.5 6.5' }])
}

export const NEU_WACHSEND2: Record<string, () => Zeichnung> = {
  'turm-umgefallen': turmUmgefallen,
  platzhalter,
  'uhr-ziffern': uhrZiffern,
}
for (let i = 1; i <= 5; i++) {
  NEU_WACHSEND2[`schutzschild-${i}`] = () => schutzschild(i)
  NEU_WACHSEND2[`rakete-${i}`] = () => rakete(i)
  NEU_WACHSEND2[`schluesselbund-${i}`] = () => schluesselbund(i)
  NEU_WACHSEND2[`tagesuhr-${i}`] = () => tagesuhr(i)
}
for (let i = 1; i <= 6; i++) {
  NEU_WACHSEND2[`stopp-hand-${i}`] = () => stoppHand(i)
  NEU_WACHSEND2[`zebra-${i}`] = () => zebra(i)
}
