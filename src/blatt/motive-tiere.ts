// ---------------------------------------------------------------------------
// Farbige Kinder-Motive für die Spielschule (Cycle 1): Tiere, Natur, Wetter
// und Luxemburger Feste. Gleicher Strich wie motive.ts (dunkle Tinte-Kontur,
// flache warme Farben), freundlich, ohne Text. Jede Fläche hat eine Kontur,
// damit die Motive auch als Ausmalvorlage (modus 'anmalen') funktionieren.
// Erkennbar ab ca. 18 mm Bildhöhe (Bildkarte), gedacht für 30–50 mm.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'

const T = 'tinte'
const W = 'papier'

// Farben aus motive.ts / figuren.ts (gleiche Werte, damit alles zusammenpasst)
const GRUEN = '#8DB87C'
const GRUEN_HELL = '#C4DDB6'
const GRUEN_DUNKEL = '#5E8F4E'
const ROT = '#D2574B'
const GELB = '#EFC44A'
const ORANGE = '#E59E57'
const BLAU = '#6C8FC6'
const BLAU_HELL = '#A9D2EE'
const WELLE = '#7FA6C4'
const LILA = '#9B87C8'
const HOLZ = '#B08A64'
const HOLZ_DUNKEL = '#8A6A4A'
const SAND = '#F1DFAE'
const WANGE = '#F4A9A0'

// wenige neue Tierfarben
const ROSA = '#F4B9B2'
const ROSA_DUNKEL = '#E2938C'
const SCHNABEL = '#F0A43A'
const BRAUN_DUNKEL = '#6E4F3C'
const CREME = '#F6E9D3'
const GRAU = '#AFB3BC'
const GRAU_DUNKEL = '#5B5F6B'
const FUCHS = '#E07B3A'
const KUEKEN = '#F6D35B'

// --- Bausteine -----------------------------------------------------------------

/** Umriss-Technik wie in motive.ts: erst dick umranden, dann ohne Rand füllen. */
function silhouette(formen: Form[], fuellung: string, strich = 4.6): Form[] {
  const mit = (f: Form, extra: { s: string; w?: number; f: string }): Form =>
    f.t === 'g' ? { ...f, formen: f.formen.map((x) => mit(x, extra)) } : ({ ...f, ...extra } as Form)
  return [...formen.map((f) => mit(f, { s: T, w: strich, f: T })), ...formen.map((f) => mit(f, { s: 'none', f: fuellung }))]
}

/** Dicke farbige Linie mit Tinte-Rand (Beine, Stiele, Schwänze). */
function tube(d: string, farbe: string, dicke: number): Form[] {
  return [
    { t: 'path', d, s: T, f: 'none', w: dicke + 2.6 },
    { t: 'path', d, s: farbe, f: 'none', w: dicke },
  ]
}

/** Freundliches Punktauge mit Glanzlicht. */
function auge(x: number, y: number, r = 3): Form[] {
  return [
    { t: 'circle', cx: x, cy: y, r, f: T, s: 'none' },
    { t: 'circle', cx: x + r * 0.35, cy: y - r * 0.4, r: r * 0.36, f: W, s: 'none' },
  ]
}

/** Auge mit weißem Rand (für dunkle Gesichter). */
function augeHell(x: number, y: number, r = 3.6): Form[] {
  return [{ t: 'circle', cx: x, cy: y, r, f: W, s: T, w: 1.4 }, ...auge(x + 0.3, y + 0.3, r * 0.6)]
}

function wange(x: number, y: number, rx = 4, ry = 2.6): Form {
  return { t: 'ellipse', cx: x, cy: y, rx, ry, f: WANGE, s: 'none', o: 0.85 }
}

function laecheln(x: number, y: number, b = 5, w = 1.8): Form {
  return { t: 'path', d: `M${x - b} ${y} Q${x} ${y + b * 0.8} ${x + b} ${y}`, s: T, f: 'none', w }
}

function schatten(cx: number, cy: number, rx: number, ry = 3.4): Form {
  return { t: 'ellipse', cx, cy, rx, ry, f: 'hellgrau', s: 'none' }
}

function linie(d: string, w = 2, s: string = T): Form {
  return { t: 'path', d, s, f: 'none', w }
}

function el(cx: number, cy: number, rx: number, ry: number, f: string, w = 2.2, winkel = 0): Form {
  const e: Form = { t: 'ellipse', cx: winkel ? 0 : cx, cy: winkel ? 0 : cy, rx, ry, f, s: w ? T : 'none', w }
  return winkel ? { t: 'g', tf: `translate(${cx} ${cy}) rotate(${winkel})`, formen: [e] } : e
}

function pfad(d: string, f: string, w = 2.2): Form {
  return { t: 'path', d, f, s: w ? T : 'none', w }
}

function kreis(cx: number, cy: number, r: number, f: string, w = 2.2): Form {
  return { t: 'circle', cx, cy, r, f, s: T, w }
}

function rechteck(x: number, y: number, b: number, h: number, f: string, rx = 3, w = 2.2): Form {
  return { t: 'rect', x, y, b, h, rx, f, s: T, w }
}

/** Bein mit Huf (von oben y1 bis unten y2). */
function huf(x: number, y1: number, y2: number, b: number, fell: string, hufFarbe = BRAUN_DUNKEL): Form[] {
  return [rechteck(x, y1, b, y2 - y1, fell, b * 0.4), rechteck(x, y2 - 7, b, 7, hufFarbe, 2.4, 2)]
}

// =============================================================================
// 1  Bauernhof und Garten
// =============================================================================

function kuh(): Zeichnung {
  return {
    vb: [0, 0, 144, 112],
    formen: [
      schatten(68, 104, 54),
      ...tube('M22 44 Q8 52 11 76', W, 2.4),
      pfad('M11 72 Q4 80 8 88 Q16 85 15 74 Z', T, 1.6),
      ...huf(26, 64, 100, 12, W),
      ...huf(44, 64, 100, 12, W),
      ...huf(78, 64, 100, 12, W),
      ...huf(94, 64, 100, 12, W),
      el(54, 76, 11, 8, ROSA),
      rechteck(16, 30, 94, 46, W, 22, 2.6),
      pfad('M32 37 Q44 32 51 40 Q56 50 46 55 Q35 58 31 49 Q28 41 32 37 Z', T, 1.4),
      pfad('M66 52 Q78 46 86 53 Q90 63 80 67 Q70 69 66 61 Z', T, 1.4),
      pfad('M84 33 Q92 31 96 36 Q92 42 85 40 Z', T, 1.4),
      el(97, 26, 9, 4.6, W, 2.2, -18),
      el(131, 26, 9, 4.6, W, 2.2, 18),
      el(97, 26, 4.5, 2, ROSA, 0, -18),
      el(131, 26, 4.5, 2, ROSA, 0, 18),
      pfad('M105 20 Q100 11 104 5 Q109 11 111 18 Z', CREME, 2),
      pfad('M123 20 Q128 11 124 5 Q119 11 117 18 Z', CREME, 2),
      el(114, 35, 16, 18, W, 2.6),
      pfad('M108 19 Q114 13 120 19 Q117 24 114 22 Q111 24 108 19 Z', T, 1.2),
      ...auge(107, 33),
      ...auge(121, 33),
      el(114, 49, 15, 10, ROSA, 2.4),
      el(109, 47, 2, 2.6, ROSA_DUNKEL, 1.4),
      el(119, 47, 2, 2.6, ROSA_DUNKEL, 1.4),
      laecheln(114, 53, 5),
    ],
  }
}

function huhn(): Zeichnung {
  const fell = '#D99355'
  const dunkel = '#B66E3A'
  return {
    vb: [0, 0, 110, 100],
    formen: [
      schatten(54, 94, 32),
      ...tube('M46 80 L44 91 M37 93 L44 90 L51 93', SCHNABEL, 2.6),
      ...tube('M62 80 L64 91 M57 93 L64 90 L71 93', SCHNABEL, 2.6),
      pfad('M32 60 Q12 54 12 30 Q20 32 25 40 Q22 24 32 15 Q37 28 39 40 Q42 30 48 28 Q46 44 44 56 Z', dunkel, 2.2),
      pfad('M68 22 Q66 13 73 15 Q74 7 80 11 Q84 5 88 12 Q90 18 85 22 Z', ROT, 2),
      ...silhouette(
        [
          { t: 'ellipse', cx: 54, cy: 62, rx: 30, ry: 22 },
          { t: 'circle', cx: 77, cy: 33, r: 13 },
          { t: 'polygon', p: '66,36 88,34 86,58 62,56' },
        ],
        fell,
      ),
      pfad('M89 29 L100 34 L89 39 Z', SCHNABEL, 2),
      pfad('M88 39 Q93 45 89 50 Q84 46 86 39 Z', ROT, 1.8),
      ...auge(80, 29, 2.8),
      wange(83, 37, 3, 2),
      pfad('M36 56 Q50 48 68 56 Q66 64 60 64 Q60 70 53 70 Q51 76 44 74 Q36 70 36 56 Z', dunkel, 2),
    ],
  }
}

function kueken(): Zeichnung {
  return {
    vb: [0, 0, 100, 100],
    formen: [
      schatten(50, 93, 28),
      ...tube('M42 82 L40 90 M34 92 L40 89 L46 92', SCHNABEL, 2.4),
      ...tube('M56 82 L58 90 M52 92 L58 89 L64 92', SCHNABEL, 2.4),
      ...silhouette(
        [
          { t: 'ellipse', cx: 47, cy: 64, rx: 29, ry: 22 },
          { t: 'circle', cx: 59, cy: 37, r: 19 },
        ],
        KUEKEN,
      ),
      linie('M54 19 Q55 10 60 15 Q63 8 66 18', 2.2),
      pfad('M76 36 L87 40 L76 44 Z', SCHNABEL, 2),
      ...auge(66, 33, 3),
      wange(69, 43, 3.4, 2.2),
      pfad('M28 62 Q40 53 54 61 Q50 74 37 74 Q29 70 28 62 Z', '#EDBB3E', 2),
    ],
  }
}

const EI_PFAD = (dx: number, dy: number, s = 1) => {
  const p = (x: number, y: number) => `${(dx + x * s).toFixed(1)} ${(dy + y * s).toFixed(1)}`
  return `M${p(0, 0)} Q${p(27, 0)} ${p(30, 47)} Q${p(32, 84)} ${p(0, 84)} Q${p(-32, 84)} ${p(-30, 47)} Q${p(-27, 0)} ${p(0, 0)} Z`
}
const EI_FARBE = '#F1DCBB'

function ei(): Zeichnung {
  return {
    vb: [0, 0, 80, 100],
    formen: [
      schatten(40, 93, 24),
      pfad(EI_PFAD(40, 8), EI_FARBE, 2.6),
      linie('M24 34 Q27 22 36 18', 4, W),
    ],
  }
}

function eiRiss(): Zeichnung {
  return {
    vb: [0, 0, 90, 100],
    formen: [
      schatten(45, 93, 24),
      pfad(EI_PFAD(45, 8), EI_FARBE, 2.6),
      pfad('M28 50 L32 36 L38 41 L44 30 L51 38 L57 31 L62 41 L64 50 L58 55 L51 49 L44 56 L37 49 Z', KUEKEN, 2),
      ...auge(42, 42, 2.4),
      pfad('M49 42 L57 45 L49 48 Z', SCHNABEL, 1.4),
      linie('M15 55 L22 49 L28 50 M64 50 L69 56 L75 51', 2.2),
      pfad('M62 30 L68 26 L67 33 Z', EI_FARBE, 1.6),
      pfad('M27 32 L22 26 L30 27 Z', EI_FARBE, 1.6),
      linie('M8 30 Q3 37 8 44 M82 30 Q87 37 82 44', 2.2),
      linie('M28 30 Q30 22 37 19', 3.6, W),
    ],
  }
}

function eiImNest(): Zeichnung {
  const stroh = '#E6C06A'
  const strohDunkel = '#C29343'
  return {
    vb: [0, 0, 120, 92],
    formen: [
      el(60, 54, 50, 12, strohDunkel, 2.2),
      pfad(EI_PFAD(60, 8, 0.8), EI_FARBE, 2.6),
      linie('M48 26 Q50 18 57 15', 3.4, W),
      linie('M14 52 L5 44 M24 47 L18 38 M98 46 L104 37 M108 52 L117 45', 2.4, strohDunkel),
      pfad('M8 53 Q10 88 60 88 Q110 88 112 53 Q92 64 60 64 Q28 64 8 53 Z', stroh, 2.6),
      linie('M16 64 Q36 74 60 72 M26 78 Q60 86 94 74 M68 66 Q90 66 104 60', 2, strohDunkel),
      linie('M40 80 L52 72 M80 80 L88 70', 1.6, strohDunkel),
    ],
  }
}

function schaf(): Zeichnung {
  const wolle = '#FBF6EC'
  const flocken: Form[] = [{ t: 'ellipse', cx: 60, cy: 50, rx: 34, ry: 20 }]
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12
    flocken.push({ t: 'circle', cx: 60 + 34 * Math.cos(a), cy: 50 + 19 * Math.sin(a), r: 11.5 })
  }
  return {
    vb: [0, 0, 132, 100],
    formen: [
      schatten(62, 93, 46),
      ...huf(34, 62, 90, 9, GRAU_DUNKEL, '#3B3E48'),
      ...huf(48, 62, 90, 9, GRAU_DUNKEL, '#3B3E48'),
      ...huf(74, 62, 90, 9, GRAU_DUNKEL, '#3B3E48'),
      ...huf(88, 62, 90, 9, GRAU_DUNKEL, '#3B3E48'),
      ...silhouette(flocken, wolle, 4.6),
      el(91, 38, 9, 4.4, GRAU_DUNKEL, 2.2, -20),
      el(121, 38, 9, 4.4, GRAU_DUNKEL, 2.2, 20),
      el(106, 47, 13, 16, GRAU_DUNKEL, 2.4),
      ...silhouette(
        [
          { t: 'circle', cx: 99, cy: 33, r: 6 },
          { t: 'circle', cx: 106, cy: 30, r: 6.5 },
          { t: 'circle', cx: 113, cy: 33, r: 6 },
        ],
        wolle,
        3.6,
      ),
      ...augeHell(101, 45, 3.4),
      ...augeHell(111, 45, 3.4),
      linie('M102 56 Q106 59 110 56', 1.8, W),
    ],
  }
}

function ziege(): Zeichnung {
  const fell = '#D9BC94'
  const horn = '#9C8B78'
  return {
    vb: [0, 0, 136, 112],
    formen: [
      schatten(64, 105, 46),
      pfad('M26 50 L17 36 L31 45 Z', fell, 2),
      ...huf(28, 64, 101, 9, fell, GRAU_DUNKEL),
      ...huf(42, 64, 101, 9, fell, GRAU_DUNKEL),
      ...huf(76, 64, 101, 9, fell, GRAU_DUNKEL),
      ...huf(90, 64, 101, 9, fell, GRAU_DUNKEL),
      ...silhouette(
        [
          { t: 'rect', x: 20, y: 44, b: 82, h: 32, rx: 16 },
          { t: 'polygon', p: '86,48 100,34 116,40 106,66 88,64' },
        ],
        fell,
      ),
      ...tube('M101 22 Q97 9 86 6', horn, 3.6),
      ...tube('M115 22 Q119 9 130 6', horn, 3.6),
      el(92, 31, 9, 4, fell, 2.2, 15),
      el(124, 31, 9, 4, fell, 2.2, -15),
      pfad('M101 49 Q103 64 108 72 Q113 64 115 49 Z', W, 2),
      el(108, 36, 12, 16, fell, 2.4),
      el(108, 47, 8.5, 6.5, CREME, 2),
      ...auge(103, 33, 2.8),
      ...auge(113, 33, 2.8),
      el(105.5, 45.5, 1.2, 1.6, T, 0),
      el(110.5, 45.5, 1.2, 1.6, T, 0),
      laecheln(108, 50, 3.5, 1.6),
    ],
  }
}

function schwein(): Zeichnung {
  const haut = '#F5BDB6'
  return {
    vb: [0, 0, 132, 100],
    formen: [
      schatten(64, 94, 46),
      linie('M20 50 Q8 47 10 40 Q13 33 18 39 Q21 45 12 49', 2.4),
      ...huf(30, 66, 90, 11, haut, ROSA_DUNKEL),
      ...huf(46, 66, 90, 11, haut, ROSA_DUNKEL),
      ...huf(72, 66, 90, 11, haut, ROSA_DUNKEL),
      ...huf(88, 66, 90, 11, haut, ROSA_DUNKEL),
      el(60, 55, 42, 27, haut, 2.6),
      pfad('M86 34 L84 14 L100 27 Z', haut, 2.2),
      pfad('M110 27 L126 14 L124 34 Z', haut, 2.2),
      kreis(105, 46, 22, haut, 2.6),
      ...auge(97, 40, 2.8),
      ...auge(113, 40, 2.8),
      wange(92, 52, 3.6, 2.4),
      wange(118, 52, 3.6, 2.4),
      el(105, 54, 11, 8, ROSA_DUNKEL, 2.2),
      el(101, 54, 1.8, 2.8, T, 0),
      el(109, 54, 1.8, 2.8, T, 0),
      linie('M100 64 Q105 67 110 64', 1.8),
    ],
  }
}

/** Pferd, Esel und Zebra teilen sich den Körperbau (Profil nach rechts). */
function pferdeart(art: 'pferd' | 'esel' | 'zebra'): Zeichnung {
  const fell = art === 'pferd' ? '#B98058' : art === 'esel' ? '#A8A39D' : W
  const haar = art === 'pferd' ? '#6B4A36' : art === 'esel' ? '#57514C' : T
  const huefe = art === 'zebra' ? T : '#4A3B33'
  const beinLaenge = art === 'esel' ? 112 : 118
  const formen: Form[] = [schatten(64, beinLaenge + 4, 48)]
  // Schweif hinten
  if (art === 'pferd') formen.push(pfad('M28 60 Q8 64 10 100 Q20 92 24 80 Q26 92 34 96 Q30 80 32 66 Z', haar, 2.2))
  else formen.push(...tube('M26 60 Q14 70 15 92', fell === W ? W : fell, 2.2), pfad('M15 88 Q8 98 13 106 Q21 101 19 88 Z', haar, 1.8))
  // Ohren (Esel: lang)
  if (art === 'esel') {
    formen.push(
      pfad('M104 22 Q104 0 114 -6 Q116 8 110 24 Z', fell, 2.2),
      pfad('M96 22 Q86 2 92 -6 Q102 4 104 20 Z', fell, 2.2),
      pfad('M95 15 Q91 5 93 0 Q98 7 100 15 Z', '#D9D2CA', 0),
    )
  } else formen.push(pfad('M98 20 L98 6 L107 17 Z', fell, 2.2))
  // Mähne hinter dem Hals
  if (art === 'pferd') formen.push(pfad('M94 14 Q82 22 84 36 Q76 44 80 56 Q72 62 78 70 L92 60 L100 22 Z', haar, 2.2))
  else formen.push(pfad('M98 14 Q86 18 84 34 Q80 46 82 58 L92 58 L102 22 Z', haar, 2.2))
  const beine = [28, 42, 78, 92]
  formen.push(
    ...silhouette(
      [
        { t: 'ellipse', cx: 62, cy: 68, rx: 38, ry: art === 'esel' ? 22 : 20 },
        { t: 'polygon', p: '80,62 94,22 112,24 106,72' },
        { t: 'path', d: 'M96 26 Q100 12 114 17 L132 39 Q138 50 127 54 L119 53 Q108 48 99 38 Z' },
        ...beine.map((x): Form => ({ t: 'rect', x, y: 66, b: 10, h: beinLaenge - 66, rx: 4 })),
      ],
      fell,
    ),
  )
  for (const x of beine) formen.push(rechteck(x, beinLaenge - 7, 10, 7, huefe, 2.4, 2))
  if (art === 'zebra') {
    // Streifen bleiben innerhalb der Kontur
    formen.push(
      pfad('M40 52 Q44 66 38 82 L44 84 Q50 66 46 50 Z', T, 1),
      pfad('M54 49 Q58 66 52 86 L58 87 Q64 66 60 48 Z', T, 1),
      pfad('M68 49 Q72 66 68 86 L74 85 Q78 66 74 50 Z', T, 1),
      pfad('M28 60 Q34 66 28 76 L32 79 Q38 66 32 56 Z', T, 1),
      pfad('M86 54 L101 48 L100 54 L86 60 Z', T, 1),
      pfad('M88 42 L104 38 L103 44 L87 48 Z', T, 1),
      pfad('M92 30 L106 28 L106 33 L91 36 Z', T, 1),
      pfad('M110 27 L118 24 L120 28 L112 31 Z', T, 1),
      pfad('M28 88 L38 88 L38 92 L28 92 Z M42 92 L52 92 L52 96 L42 96 Z', T, 1),
      pfad('M78 92 L88 92 L88 96 L78 96 Z M92 88 L102 88 L102 92 L92 92 Z', T, 1),
      pfad('M28 102 L38 102 L38 106 L28 106 Z M78 104 L88 104 L88 108 L78 108 Z', T, 1),
    )
  }
  // Maul heller (Esel), Gesicht
  if (art === 'esel') formen.push(pfad('M118 40 L132 39 Q138 50 127 54 L119 53 Q114 50 113 46 Z', '#E8E2DA', 2))
  formen.push(...auge(110, 30, 3), el(129, 45, 1.8, 2.4, T, 0), laecheln(123, 49, 3.5, 1.6), wange(117, 40, 3.4, 2.2))
  return { vb: art === 'esel' ? [0, -8, 140, 132] : [0, 0, 140, 126], formen }
}

function hase(): Zeichnung {
  const fell = '#C7A583'
  return {
    vb: [0, -10, 110, 122],
    formen: [
      schatten(52, 106, 34),
      kreis(22, 80, 9, W, 2.2),
      ...silhouette(
        [
          { t: 'ellipse', cx: 50, cy: 76, rx: 29, ry: 26 },
          { t: 'circle', cx: 70, cy: 46, r: 18 },
          { t: 'g', tf: 'translate(62 32) rotate(-14)', formen: [{ t: 'ellipse', cx: 0, cy: -16, rx: 7, ry: 19 }] },
          { t: 'g', tf: 'translate(76 32) rotate(14)', formen: [{ t: 'ellipse', cx: 0, cy: -16, rx: 7, ry: 19 }] },
        ],
        fell,
      ),
      { t: 'g', tf: 'translate(62 32) rotate(-14)', formen: [{ t: 'ellipse', cx: 0, cy: -16, rx: 3.4, ry: 13, f: ROSA, s: 'none' }] },
      { t: 'g', tf: 'translate(76 32) rotate(14)', formen: [{ t: 'ellipse', cx: 0, cy: -16, rx: 3.4, ry: 13, f: ROSA, s: 'none' }] },
      el(46, 99, 17, 6, fell, 2.2),
      el(70, 99, 7, 5, fell, 2),
      el(76, 54, 9, 7, CREME, 0),
      ...auge(66, 44, 3),
      ...auge(80, 44, 3),
      pfad('M70 51 L76 51 L73 55 Z', ROSA_DUNKEL, 1.4),
      linie('M73 55 L73 58 M69 59 Q73 62 77 59', 1.6),
      linie('M64 54 L54 52 M64 57 L55 59 M83 54 L93 52 M83 57 L92 59', 1.2),
    ],
  }
}

function katze(): Zeichnung {
  const fell = '#B9B4B0'
  const streifen = '#7F7975'
  return {
    vb: [0, 0, 104, 112],
    formen: [
      schatten(52, 106, 34),
      ...tube('M70 100 Q96 100 95 80 Q94 66 85 67', fell, 6),
      ...silhouette(
        [
          { t: 'path', d: 'M30 104 Q22 66 40 52 L60 52 Q78 66 70 104 Z' },
          { t: 'circle', cx: 50, cy: 40, r: 23 },
          { t: 'path', d: 'M30 32 L27 8 L47 20 Z' },
          { t: 'path', d: 'M70 32 L73 8 L53 20 Z' },
        ],
        fell,
      ),
      pfad('M32 26 L31 14 L41 21 Z', ROSA, 0),
      pfad('M68 26 L69 14 L59 21 Z', ROSA, 0),
      pfad('M41 58 Q50 66 59 58 Q60 80 50 90 Q40 80 41 58 Z', W, 2),
      linie('M45 19 L46 25 M50 18 L50 25 M55 19 L54 25', 2.2, streifen),
      linie('M28 70 Q34 72 34 78 M72 70 Q66 72 66 78', 2.2, streifen),
      el(41, 103, 8, 4.5, fell, 2),
      el(59, 103, 8, 4.5, fell, 2),
      ...auge(41, 38, 3.2),
      ...auge(59, 38, 3.2),
      wange(36, 47, 3.6, 2.2),
      wange(64, 47, 3.6, 2.2),
      pfad('M47 45 L53 45 L50 48.5 Z', ROSA_DUNKEL, 1.4),
      linie('M50 48.5 L50 50 M44 50 Q47 54 50 50 Q53 54 56 50', 1.6),
      linie('M40 47 L24 44 M40 50 L25 53 M60 47 L76 44 M60 50 L75 53', 1.2),
    ],
  }
}

function hund(): Zeichnung {
  const fell = '#CFA06C'
  const ohr = '#7A5440'
  return {
    vb: [0, 0, 112, 112],
    formen: [
      schatten(56, 106, 36),
      ...tube('M78 92 Q96 88 100 70', fell, 6),
      linie('M100 58 Q106 62 104 68 M92 60 Q96 62 96 66', 1.6),
      ...silhouette(
        [
          { t: 'path', d: 'M30 104 Q24 68 42 56 L70 56 Q88 68 82 104 Z' },
          { t: 'ellipse', cx: 56, cy: 40, rx: 24, ry: 21 },
        ],
        fell,
      ),
      el(56, 84, 11, 15, CREME, 0),
      pfad('M35 26 Q20 28 22 55 Q31 60 37 47 Z', ohr, 2.2),
      pfad('M77 26 Q92 28 90 55 Q81 60 75 47 Z', ohr, 2.2),
      el(56, 50, 13, 9.5, CREME, 2),
      pfad('M53 57 Q56 66 59 57 Z', '#EE8F8F', 1.6),
      linie('M49 53 Q53 58 56 53 Q59 58 63 53', 1.8),
      el(56, 46, 5, 3.6, T, 0),
      ...auge(47, 36, 3.2),
      ...auge(65, 36, 3.2),
      pfad('M38 60 Q56 68 74 60 L74 66 Q56 74 38 66 Z', ROT, 2),
      kreis(56, 73, 3.6, GELB, 1.6),
      el(46, 103, 8, 4.5, fell, 2),
      el(66, 103, 8, 4.5, fell, 2),
    ],
  }
}

// =============================================================================
// 2  Wald, Wildtiere, Vögel
// =============================================================================

function igel(): Zeichnung {
  const cx = 56
  const cy = 72
  const pkt: string[] = []
  const n = 15
  for (let i = 0; i <= n * 2; i++) {
    const a = Math.PI - (i / (n * 2)) * (Math.PI * 0.8)
    const r = i % 2 === 0 ? 0.8 : 1
    pkt.push(`${(cx + 46 * r * Math.cos(a)).toFixed(1)},${(cy - 44 * r * Math.sin(a)).toFixed(1)}`)
  }
  const stacheln = `${pkt.join(' ')} 96,${cy} ${cx - 46 * 0.8},${cy}`
  return {
    vb: [0, 0, 130, 92],
    formen: [
      schatten(64, 86, 50),
      el(40, 82, 8, 4.5, BRAUN_DUNKEL, 2),
      el(64, 83, 8, 4.5, BRAUN_DUNKEL, 2),
      el(90, 82, 7, 4.5, BRAUN_DUNKEL, 2),
      el(58, 74, 44, 9, '#D9B98F', 2.2),
      { t: 'polygon', p: stacheln, f: '#7A5A44', s: T, w: 2.4 },
      linie('M28 52 L36 58 M40 40 L46 48 M56 34 L58 44 M72 38 L70 48 M84 48 L80 56 M34 66 L42 68 M52 56 L56 62 M66 56 L66 64', 2, '#A47F5E'),
      pfad('M78 42 Q96 40 110 56 L121 63 Q125 70 118 73 L104 77 Q88 83 76 79 Q70 60 78 42 Z', '#EBD3AE', 2.4),
      kreis(121, 67, 4.2, T, 0),
      ...auge(97, 55, 3.2),
      wange(100, 66, 3.6, 2.4),
      linie('M106 72 Q111 74 115 71', 1.6),
      el(84, 46, 5, 4, '#EBD3AE', 2),
    ],
  }
}

function eichhoernchen(): Zeichnung {
  const fell = '#C9692F'
  return {
    vb: [0, 0, 112, 118],
    formen: [
      schatten(56, 112, 34),
      pfad('M48 106 Q10 104 8 72 Q6 44 24 28 Q38 16 32 6 Q58 6 60 32 Q62 50 46 60 Q36 68 40 82 Q44 94 56 98 Z', fell, 2.6),
      linie('M22 72 Q20 48 34 34 Q42 26 40 16', 2.2, '#E89A5E'),
      pfad('M58 34 L56 16 L68 28 Z', fell, 2.2),
      pfad('M70 32 L76 14 L82 30 Z', fell, 2.2),
      linie('M56 16 L55 10 M76 14 L77 8', 2, T),
      ...silhouette(
        [
          { t: 'ellipse', cx: 64, cy: 84, rx: 20, ry: 24 },
          { t: 'circle', cx: 70, cy: 46, r: 16 },
          { t: 'ellipse', cx: 80, cy: 52, rx: 11, ry: 8 },
        ],
        fell,
      ),
      el(68, 88, 11, 15, CREME, 0),
      el(66, 108, 14, 5, fell, 2),
      pfad('M76 66 Q86 62 90 68 Q92 78 84 80 Q76 80 76 72 Z', '#9C6B3E', 2),
      pfad('M75 66 Q84 58 92 66 Q84 64 75 66 Z', '#6E4F3C', 1.6),
      el(76, 76, 5, 4, fell, 1.8),
      el(88, 77, 5, 4, fell, 1.8),
      ...auge(74, 44, 3.2),
      el(90, 51, 2.2, 1.8, T, 0),
      wange(78, 55, 3.4, 2.2),
      linie('M84 56 Q87 58 90 56', 1.6),
    ],
  }
}

function fuchs(): Zeichnung {
  const fell = FUCHS
  return {
    vb: [0, 0, 120, 112],
    formen: [
      schatten(60, 106, 40),
      pfad('M72 100 Q106 104 110 76 Q112 58 98 54 Q102 72 90 84 Q80 90 70 88 Z', fell, 2.4),
      pfad('M98 54 Q112 58 110 74 Q106 66 96 66 Q99 60 98 54 Z', W, 2),
      ...silhouette(
        [
          { t: 'path', d: 'M36 104 Q30 72 46 60 L74 60 Q90 72 84 104 Z' },
          { t: 'path', d: 'M32 34 Q32 20 44 20 L76 20 Q88 20 88 34 Q88 46 74 58 L60 66 L46 58 Q32 46 32 34 Z' },
          { t: 'path', d: 'M36 30 L33 4 L54 22 Z' },
          { t: 'path', d: 'M84 30 L87 4 L66 22 Z' },
        ],
        fell,
      ),
      pfad('M37 24 L36 11 L46 21 Z', CREME, 0),
      pfad('M83 24 L84 11 L74 21 Z', CREME, 0),
      pfad('M33 4 L34 13 L41 10 Z', T, 1.2),
      pfad('M87 4 L86 13 L79 10 Z', T, 1.2),
      pfad('M50 64 Q60 72 70 64 Q72 88 60 98 Q48 88 50 64 Z', W, 2),
      pfad('M33 38 Q44 46 55 46 Q57 56 60 65 Q41 58 33 38 Z', W, 2),
      pfad('M87 38 Q76 46 65 46 Q63 56 60 65 Q79 58 87 38 Z', W, 2),
      el(60, 61, 4.6, 3.4, T, 0),
      ...auge(48, 36, 3.2),
      ...auge(72, 36, 3.2),
      el(48, 103, 8, 4.5, BRAUN_DUNKEL, 2),
      el(72, 103, 8, 4.5, BRAUN_DUNKEL, 2),
    ],
  }
}

function reh(): Zeichnung {
  const fell = '#C2855A'
  return {
    vb: [0, 0, 124, 124],
    formen: [
      schatten(58, 118, 40),
      pfad('M24 60 L16 54 L22 66 Z', fell, 2),
      ...silhouette(
        [
          { t: 'ellipse', cx: 54, cy: 68, rx: 32, ry: 16 },
          { t: 'polygon', p: '70,62 86,30 98,34 86,76' },
          ...[30, 42, 66, 78].map((x): Form => ({ t: 'rect', x, y: 70, b: 7, h: 44, rx: 3 })),
        ],
        fell,
      ),
      ...[30, 42, 66, 78].map((x) => rechteck(x, 109, 7, 6, BRAUN_DUNKEL, 2, 1.8)),
      el(28, 64, 6, 7, W, 1.8),
      el(78, 25, 12, 6, fell, 2.2, -28),
      el(108, 25, 12, 6, fell, 2.2, 28),
      el(78, 25, 7, 3, CREME, 0, -28),
      el(108, 25, 7, 3, CREME, 0, 28),
      pfad('M80 34 Q80 20 93 20 Q106 20 106 34 Q106 46 97 54 Q93 57 89 54 Q80 46 80 34 Z', fell, 2.4),
      pfad('M86 48 Q93 44 100 48 Q98 56 93 57 Q88 56 86 48 Z', W, 1.8),
      el(93, 50, 3.6, 2.8, T, 0),
      ...auge(87, 35, 3.2),
      ...auge(99, 35, 3.2),
      pfad('M82 62 Q88 56 94 60 Q90 70 84 70 Z', W, 0),
    ],
  }
}

function eule(): Zeichnung {
  const fell = '#A87A55'
  const dunkel = '#7E583C'
  return {
    vb: [0, 0, 100, 120],
    formen: [
      ...tube('M2 108 Q50 102 98 110', HOLZ_DUNKEL, 6),
      pfad('M86 108 Q94 96 98 100 Q96 108 86 108 Z', GRUEN, 1.8),
      pfad('M22 30 L18 6 L40 20 Z', fell, 2.2),
      pfad('M78 30 L82 6 L60 20 Z', fell, 2.2),
      pfad('M50 12 Q84 12 84 60 Q84 104 50 104 Q16 104 16 60 Q16 12 50 12 Z', fell, 2.6),
      pfad('M18 54 Q8 74 22 94 Q28 76 24 56 Z', dunkel, 2),
      pfad('M82 54 Q92 74 78 94 Q72 76 76 56 Z', dunkel, 2),
      el(50, 78, 21, 23, CREME, 2),
      linie('M40 70 L44 74 L48 70 M52 70 L56 74 L60 70 M44 82 L48 86 L52 82 M56 82 L60 86 L64 82 M38 84 L40 86 M48 94 L50 96 L52 94', 1.8, dunkel),
      kreis(37, 42, 13, CREME, 2.2),
      kreis(63, 42, 13, CREME, 2.2),
      ...auge(37, 42, 6.4),
      ...auge(63, 42, 6.4),
      pfad('M45 52 L55 52 L50 61 Z', SCHNABEL, 1.8),
      ...tube('M40 104 L40 108 M46 104 L46 108 M54 104 L54 108 M60 104 L60 108', SCHNABEL, 2.4),
    ],
  }
}

function vogelFormen(): Form[] {
  return [
    ...tube('M46 70 L44 84 M38 86 L44 84 L50 86', SCHNABEL, 2),
    ...tube('M58 70 L60 84 M54 86 L60 84 L66 86', SCHNABEL, 2),
    pfad('M28 48 L6 38 L9 50 L4 58 L28 58 Z', '#4F6FA6', 2.2),
    ...silhouette(
      [
        { t: 'ellipse', cx: 50, cy: 52, rx: 28, ry: 21 },
        { t: 'circle', cx: 72, cy: 34, r: 15 },
      ],
      BLAU,
    ),
    pfad('M40 66 Q60 76 74 60 Q82 50 83 40 Q72 48 62 50 Q48 54 40 66 Z', '#F2CF5B', 0),
    pfad('M86 31 L97 35 L86 39 Z', SCHNABEL, 1.8),
    pfad('M30 46 Q44 40 56 48 Q50 62 38 62 Q30 58 30 46 Z', '#4F6FA6', 2),
    ...auge(77, 31, 3),
    wange(80, 40, 3, 2),
  ]
}

function vogel(): Zeichnung {
  return { vb: [0, 0, 104, 92], formen: [schatten(52, 88, 24), ...vogelFormen()] }
}

function nest(): Zeichnung {
  const ei = (x: number) => pfad(EI_PFAD(x, 22, 0.32), '#BFE0EE', 2)
  return {
    vb: [0, 0, 120, 92],
    formen: [
      ...tube('M2 80 Q50 72 118 84', HOLZ_DUNKEL, 6),
      pfad('M98 80 Q106 66 116 68 Q112 80 98 80 Z', GRUEN, 1.8),
      pfad('M12 78 Q4 66 8 60 Q18 66 12 78 Z', GRUEN, 1.8),
      el(60, 46, 44, 11, '#6E4F3C', 2.2),
      ei(46),
      ei(60),
      ei(74),
      linie('M20 44 L10 36 M30 40 L26 30 M92 40 L98 32 M102 46 L112 40', 2.4, HOLZ_DUNKEL),
      pfad('M14 46 Q16 78 60 78 Q104 78 106 46 Q86 56 60 56 Q34 56 14 46 Z', '#9B7650', 2.6),
      linie('M20 56 Q40 66 62 64 M28 70 Q60 76 92 66 M66 58 Q88 58 100 52 M40 72 L52 64 M80 72 L88 62', 2, '#6E4F3C'),
    ],
  }
}

function vogelhaus(): Zeichnung {
  return {
    vb: [0, 0, 104, 124],
    formen: [
      rechteck(45, 82, 12, 40, HOLZ_DUNKEL, 2, 2.2),
      schatten(51, 121, 22, 2.6),
      pfad('M22 44 L51 18 L80 44 L80 82 L22 82 Z', '#E8C99A', 2.4),
      kreis(51, 52, 9, T, 0),
      kreis(51, 68, 2.6, HOLZ_DUNKEL, 1.6),
      pfad('M12 50 L51 12 L90 50 L84 56 L51 24 L18 56 Z', ROT, 2.4),
      rechteck(14, 80, 74, 7, HOLZ, 2, 2.2),
      { t: 'g', tf: 'translate(55 50) scale(0.36)', formen: vogelFormen() },
      kreis(26, 78, 1.6, '#B07A3C', 1),
      kreis(32, 78.5, 1.6, '#B07A3C', 1),
      kreis(40, 78, 1.6, '#B07A3C', 1),
    ],
  }
}

function frosch(): Zeichnung {
  const haut = '#7FB46A'
  return {
    vb: [0, 0, 112, 100],
    formen: [
      pfad('M8 90 Q8 78 56 78 Q104 78 104 90 Q104 100 56 100 Q8 100 8 90 Z', GRUEN_DUNKEL, 2.2),
      linie('M56 90 L76 82', 2, T),
      el(22, 74, 13, 15, haut, 2.4, -20),
      el(90, 74, 13, 15, haut, 2.4, 20),
      pfad('M6 88 Q10 80 22 86 Q30 80 32 88 Z', haut, 2.2),
      pfad('M106 88 Q102 80 90 86 Q82 80 80 88 Z', haut, 2.2),
      ...silhouette(
        [
          { t: 'ellipse', cx: 56, cy: 64, rx: 32, ry: 24 },
          { t: 'ellipse', cx: 56, cy: 44, rx: 30, ry: 19 },
          { t: 'circle', cx: 39, cy: 28, r: 12 },
          { t: 'circle', cx: 73, cy: 28, r: 12 },
        ],
        haut,
      ),
      el(56, 72, 19, 13, GRUEN_HELL, 2),
      kreis(39, 28, 8, W, 2),
      kreis(73, 28, 8, W, 2),
      ...auge(40, 29, 4),
      ...auge(74, 29, 4),
      linie('M36 50 Q56 64 76 50', 2.4),
      wange(31, 52, 4, 2.6),
      wange(81, 52, 4, 2.6),
      el(52, 40, 1.4, 1.4, T, 0),
      el(60, 40, 1.4, 1.4, T, 0),
      pfad('M38 90 Q42 82 50 88 L42 92 Z', haut, 2),
      pfad('M74 90 Q70 82 62 88 L70 92 Z', haut, 2),
    ],
  }
}

// =============================================================================
// 3  Krabbeltiere und Verwandlung
// =============================================================================

function raupe(): Zeichnung {
  const formen: Form[] = [schatten(64, 74, 54, 3)]
  const glieder = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 14 + i * 15.5, y: 54 - Math.sin(i * 0.9) * 6 }))
  for (const g of glieder) formen.push(el(g.x, g.y + 12, 3.4, 2.4, GRUEN_DUNKEL, 1.6))
  glieder.forEach((g, i) => {
    formen.push(kreis(g.x, g.y, 12, i % 2 ? '#9DCB75' : '#86BB62', 2.4))
    formen.push(kreis(g.x + 2, g.y - 5, 2, GELB, 0))
  })
  formen.push(
    linie('M98 22 Q94 12 90 8 M110 22 Q114 12 120 9', 2.2),
    kreis(90, 8, 3, ROT, 1.6),
    kreis(120, 9, 3, ROT, 1.6),
    kreis(106, 36, 16, '#B7D86F', 2.6),
    ...auge(100, 33, 3),
    ...auge(113, 33, 3),
    wange(97, 42, 3.4, 2.2),
    wange(116, 42, 3.4, 2.2),
    laecheln(106.5, 42, 5),
  )
  return { vb: [0, 0, 132, 80], formen }
}

function puppe(): Zeichnung {
  const huelle = '#B7BF6E'
  return {
    vb: [0, 0, 84, 124],
    formen: [
      pfad('M58 12 Q70 -2 82 4 Q76 18 58 12 Z', GRUEN, 1.8),
      ...tube('M2 16 Q42 8 82 12', HOLZ_DUNKEL, 6),
      linie('M42 14 L42 24', 2.2),
      pfad('M42 22 Q60 32 60 60 Q60 92 42 112 Q24 92 24 60 Q24 32 42 22 Z', huelle, 2.6),
      pfad('M42 22 Q52 30 54 46 Q46 40 42 22 Z', '#98A355', 1.4),
      linie('M27 66 Q42 72 57 66 M28 79 Q42 85 56 79 M32 92 Q42 97 52 92 M37 103 Q42 106 47 103', 2, '#7F8A45'),
      kreis(34, 50, 1.8, GELB, 1),
      kreis(50, 54, 1.8, GELB, 1),
      linie('M32 34 Q30 40 30 46', 3, W),
    ],
  }
}

function schmetterling(): Zeichnung {
  const oben = '#E8835A'
  const unten = GELB
  const spiegel = (d: string) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${120 - Number(x)} ${y}`)
  const fluegelO = 'M58 46 Q44 8 18 12 Q4 16 8 34 Q12 54 56 54 Z'
  const fluegelU = 'M57 56 Q26 58 20 76 Q18 92 34 90 Q50 86 58 62 Z'
  return {
    vb: [0, 0, 120, 100],
    formen: [
      pfad(fluegelO, oben, 2.4),
      pfad(spiegel(fluegelO), oben, 2.4),
      pfad(fluegelU, unten, 2.4),
      pfad(spiegel(fluegelU), unten, 2.4),
      kreis(28, 30, 8, GELB, 2),
      kreis(92, 30, 8, GELB, 2),
      kreis(14, 26, 3, W, 1.4),
      kreis(106, 26, 3, W, 1.4),
      kreis(36, 76, 5, W, 1.8),
      kreis(84, 76, 5, W, 1.8),
      linie('M56 28 Q50 14 42 12 M64 28 Q70 14 78 12', 2.2),
      kreis(42, 12, 2.6, T, 0),
      kreis(78, 12, 2.6, T, 0),
      el(60, 58, 5.5, 24, '#6E4F3C', 2.2),
      kreis(60, 31, 7, '#6E4F3C', 2.2),
      kreis(57.6, 30, 1.3, W, 0),
      kreis(62.4, 30, 1.3, W, 0),
    ],
  }
}

function biene(): Zeichnung {
  const fluegel = '#E4F2FB'
  return {
    vb: [0, 0, 120, 92],
    formen: [
      linie('M4 70 Q12 58 20 66', 2, GRAU),
      { t: 'path', d: 'M2 50 Q8 40 16 46', s: GRAU, f: 'none', w: 2, dash: '3 4' },
      pfad('M24 56 L13 58 L24 62 Z', T, 1.4),
      el(56, 58, 33, 23, GELB, 2.6),
      pfad('M42 37 Q50 58 42 79 L52 80.5 Q60 58 52 35.6 Z', T, 0),
      pfad('M62 35.6 Q70 58 62 80.5 L72 79 Q78 58 71 37 Z', T, 0),
      el(56, 58, 33, 23, 'none', 2.6),
      el(48, 28, 12, 18, fluegel, 2.2, -24),
      el(66, 27, 10, 16, fluegel, 2.2, 22),
      linie('M88 34 Q86 22 80 16 M98 34 Q102 22 108 18', 2.2),
      kreis(80, 16, 3, T, 0),
      kreis(108, 18, 3, T, 0),
      kreis(94, 48, 15, GELB, 2.6),
      ...auge(91, 45, 3),
      ...auge(102, 45, 3),
      wange(88, 53, 3, 2),
      laecheln(97, 54, 4.5),
    ],
  }
}

function ameise(): Zeichnung {
  const k = '#8B4A33'
  return {
    vb: [0, 0, 124, 84],
    formen: [
      linie('M0 80 L124 80', 2, GRAU),
      ...tube('M58 52 L46 64 L40 77', k, 2.8),
      ...tube('M66 54 L66 66 L62 77', k, 2.8),
      ...tube('M72 52 L84 64 L92 77', k, 2.8),
      el(36, 48, 21, 16, k, 2.6),
      el(64, 48, 11, 8, k, 2.4),
      linie('M88 26 L92 12 L104 6 M98 26 L106 16 L118 16', 2.4),
      kreis(92, 38, 14, k, 2.6),
      ...augeHell(88, 34, 4),
      ...augeHell(100, 34, 4),
      linie('M90 45 Q95 49 100 45', 1.8, W),
      linie('M28 40 Q32 34 40 34', 3, '#B9785E'),
    ],
  }
}

function regenwurm(): Zeichnung {
  const haut = '#EBA5A0'
  const bogen = 'M22 70 Q20 44 46 46 Q68 48 72 32 Q76 18 96 22'
  return {
    vb: [0, 0, 124, 86],
    formen: [
      ...tube(bogen, haut, 15),
      { t: 'path', d: bogen, s: '#D98580', f: 'none', w: 15, dash: '1.6 7' },
      el(30, 46, 6, 7.6, '#E08F8A', 0, 20),
      kreis(97, 22, 8.5, haut, 0),
      ...auge(95, 19, 2.4),
      ...auge(103, 21, 2.4),
      wange(96, 27, 2.6, 1.6),
      pfad('M4 76 Q30 62 62 68 Q92 74 120 66 Q126 78 114 84 L14 84 Q2 84 4 76 Z', '#9B7650', 2.4),
      el(22, 70, 10, 3, '#5E4636', 0),
      linie('M86 70 L84 58 M90 70 L94 60 M112 66 L110 56', 2.2, GRUEN_DUNKEL),
      kreis(48, 78, 2, '#7A5A44', 0),
      kreis(76, 80, 1.6, '#7A5A44', 0),
      kreis(104, 78, 2, '#7A5A44', 0),
    ],
  }
}

function schnecke(): Zeichnung {
  const koerper = '#DCCAB0'
  const spirale: string[] = []
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 4.2 + Math.PI * 0.5
    const r = 22 - (i / 40) * 19
    spirale.push(`${(50 + r * Math.cos(a)).toFixed(1)} ${(46 + r * Math.sin(a)).toFixed(1)}`)
  }
  return {
    vb: [0, 0, 124, 90],
    formen: [
      schatten(60, 84, 50),
      linie('M100 40 Q96 26 94 16 M106 40 Q110 26 114 18', 2.4),
      kreis(94, 15, 4.2, koerper, 2),
      kreis(114, 17, 4.2, koerper, 2),
      kreis(94.6, 15.6, 2, T, 0),
      kreis(114.6, 17.6, 2, T, 0),
      pfad('M8 80 Q8 70 26 70 L86 70 Q90 52 98 40 Q106 32 114 40 Q120 52 112 70 Q108 80 96 80 Z', koerper, 2.6),
      laecheln(106, 56, 4.5),
      wange(102, 63, 3, 2),
      kreis(50, 46, 28, '#D9925A', 2.6),
      linie(`M${spirale.join(' L')}`, 2.4),
    ],
  }
}

function marienkaefer(): Zeichnung {
  return {
    vb: [0, 0, 100, 104],
    formen: [
      linie('M20 42 L8 36 M18 60 L4 60 M20 78 L8 86 M80 42 L92 36 M82 60 L96 60 M80 78 L92 86', 3),
      linie('M42 16 Q36 6 30 4 M58 16 Q64 6 70 4', 2.2),
      kreis(30, 4, 2.6, T, 0),
      kreis(70, 4, 2.6, T, 0),
      kreis(50, 26, 15, '#2E2A2A', 2.4),
      kreis(50, 62, 36, '#DC4B3E', 2.6),
      linie('M50 28 L50 98', 2.4),
      pfad('M23 38 Q36 30 50 30 Q64 30 77 38', 'none', 2.4),
      kreis(34, 48, 6.5, T, 0),
      kreis(66, 48, 6.5, T, 0),
      kreis(28, 70, 6, T, 0),
      kreis(72, 70, 6, T, 0),
      kreis(40, 86, 5, T, 0),
      kreis(60, 86, 5, T, 0),
      ...augeHell(44, 20, 3.6),
      ...augeHell(56, 20, 3.6),
    ],
  }
}

// =============================================================================
// 4  Zoo
// =============================================================================

function elefant(): Zeichnung {
  const haut = '#AEB4C0'
  return {
    vb: [0, 0, 150, 114],
    formen: [
      schatten(72, 108, 56),
      ...tube('M22 52 Q12 60 14 76', haut, 2.4),
      pfad('M14 72 Q8 80 12 86 Q19 82 17 72 Z', GRAU_DUNKEL, 1.6),
      ...silhouette(
        [
          { t: 'ellipse', cx: 60, cy: 58, rx: 40, ry: 30 },
          { t: 'circle', cx: 104, cy: 46, r: 25 },
          { t: 'path', d: 'M114 48 Q130 56 130 76 Q130 90 136 89 Q140 88 140 82 L147 82 Q148 97 135 98 Q122 98 122 80 Q122 66 104 62 Z' },
          ...[26, 46, 72, 92].map((x): Form => ({ t: 'rect', x, y: 66, b: 17, h: 38, rx: 6 })),
        ],
        haut,
      ),
      ...[26, 46, 72, 92].map((x) => linie(`M${x + 3} 100 Q${x + 5} 97 ${x + 7} 100 M${x + 10} 100 Q${x + 12} 97 ${x + 14} 100`, 1.4)),
      pfad('M96 24 Q66 16 66 48 Q68 80 98 70 Q90 48 96 24 Z', '#C4C9D3', 2.4),
      pfad('M90 32 Q74 30 74 48 Q76 64 90 62 Q86 48 90 32 Z', ROSA, 0),
      ...auge(110, 40, 3.4),
      wange(116, 52, 4, 2.6),
      linie('M106 62 Q111 66 116 62', 1.8),
    ],
  }
}

function giraffe(): Zeichnung {
  const fell = '#F2C25C'
  const fleck = '#C27A3E'
  const beine = [20, 32, 50, 62]
  return {
    vb: [0, 0, 110, 142],
    formen: [
      schatten(44, 137, 32),
      ...tube('M14 80 Q6 92 8 104', fell, 2.2),
      pfad('M8 100 Q3 108 7 113 Q13 109 11 100 Z', BRAUN_DUNKEL, 1.6),
      pfad('M60 74 L74 28 L80 30 L70 74 Z', fleck, 2),
      linie('M80 12 L78 2 M90 12 L92 2', 3),
      kreis(78, 2, 3, BRAUN_DUNKEL, 1.6),
      kreis(92, 2, 3, BRAUN_DUNKEL, 1.6),
      ...silhouette(
        [
          { t: 'ellipse', cx: 42, cy: 82, rx: 30, ry: 16 },
          { t: 'polygon', p: '52,74 76,18 92,22 72,90' },
          { t: 'path', d: 'M74 18 Q78 8 90 10 L104 22 Q110 30 102 33 L90 31 Q80 28 74 22 Z' },
          ...beine.map((x): Form => ({ t: 'rect', x, y: 86, b: 8, h: 48, rx: 3 })),
        ],
        fell,
      ),
      ...beine.map((x) => rechteck(x, 128, 8, 6, BRAUN_DUNKEL, 2, 1.8)),
      el(72, 14, 7, 3.4, fell, 2, -30),
      pfad('M24 74 L32 70 L36 78 L28 82 Z', fleck, 1.4),
      pfad('M42 70 L52 71 L50 80 L41 79 Z', fleck, 1.4),
      pfad('M30 86 L40 85 L39 93 L31 93 Z', fleck, 1.4),
      pfad('M50 84 L58 82 L60 90 L51 91 Z', fleck, 1.4),
      pfad('M62 62 L70 58 L71 66 L63 70 Z', fleck, 1.4),
      pfad('M67 44 L74 41 L75 48 L68 51 Z', fleck, 1.4),
      pfad('M73 28 L79 26 L79 33 L74 35 Z', fleck, 1.4),
      pfad('M98 22 Q106 24 105 30 Q100 32 96 30 Z', '#F6DFA0', 0),
      ...auge(88, 19, 3),
      el(103, 26, 1.4, 1.8, T, 0),
      laecheln(96, 28, 3, 1.5),
    ],
  }
}

function loewe(): Zeichnung {
  const fell = '#EDB75E'
  const maehne = '#C46F35'
  const ring: Form[] = []
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12
    ring.push({ t: 'circle', cx: 60 + 27 * Math.cos(a), cy: 44 + 27 * Math.sin(a), r: 13 })
  }
  return {
    vb: [0, 0, 122, 118],
    formen: [
      schatten(60, 112, 38),
      ...tube('M80 104 Q104 104 106 84 Q107 74 101 70', fell, 4),
      pfad('M101 72 Q94 66 97 60 Q104 58 106 66 Z', maehne, 1.8),
      pfad('M36 108 Q30 76 44 66 L76 66 Q90 76 84 108 Z', fell, 2.6),
      el(60, 92, 11, 14, '#F6DCA6', 0),
      ...silhouette([{ t: 'circle', cx: 60, cy: 44, r: 30 }, ...ring], maehne, 4.6),
      kreis(40, 24, 7, fell, 2.2),
      kreis(80, 24, 7, fell, 2.2),
      kreis(60, 46, 25, fell, 2.6),
      el(60, 56, 12, 9, '#F6DCA6', 2),
      pfad('M55 49 L65 49 L60 55 Z', '#9C5A3C', 1.4),
      linie('M60 55 L60 58 M54 59 Q57 62 60 58 Q63 62 66 59', 1.6),
      ...auge(50, 41, 3.4),
      ...auge(70, 41, 3.4),
      wange(44, 52, 3.6, 2.4),
      wange(76, 52, 3.6, 2.4),
      el(48, 107, 8, 4.6, fell, 2),
      el(72, 107, 8, 4.6, fell, 2),
    ],
  }
}

function affe(): Zeichnung {
  const fell = '#9B6B48'
  const hell = '#F0D3AE'
  return {
    vb: [0, 0, 118, 118],
    formen: [
      schatten(58, 112, 36),
      ...tube('M78 100 Q106 102 106 78 Q106 62 94 63 Q86 66 91 73', fell, 4),
      pfad('M36 106 Q30 74 46 64 L70 64 Q86 74 80 106 Z', fell, 2.6),
      el(58, 88, 12, 14, hell, 2),
      ...tube('M44 70 Q32 84 40 96', fell, 7),
      ...tube('M72 70 Q86 80 82 92', fell, 7),
      pfad('M76 82 Q90 76 96 86 Q98 92 94 92 Q90 86 80 90 Z', GELB, 1.8),
      kreis(80, 92, 5, hell, 1.8),
      kreis(40, 97, 5, hell, 1.8),
      el(46, 107, 9, 4.6, hell, 2),
      el(70, 107, 9, 4.6, hell, 2),
      kreis(34, 40, 9, fell, 2.4),
      kreis(82, 40, 9, fell, 2.4),
      kreis(34, 40, 5, hell, 0),
      kreis(82, 40, 5, hell, 0),
      kreis(58, 40, 23, fell, 2.6),
      pfad('M58 30 Q50 22 43 28 Q36 36 41 46 Q43 60 58 63 Q73 60 75 46 Q80 36 73 28 Q66 22 58 30 Z', hell, 2),
      ...auge(50, 38, 3.2),
      ...auge(66, 38, 3.2),
      el(55.5, 47, 1.3, 1.6, T, 0),
      el(60.5, 47, 1.3, 1.6, T, 0),
      laecheln(58, 52, 6, 2),
    ],
  }
}

function pinguin(): Zeichnung {
  const schwarz = '#2F3542'
  return {
    vb: [0, 0, 96, 116],
    formen: [
      schatten(48, 110, 28),
      pfad('M18 50 Q4 64 8 84 Q18 74 22 62 Z', schwarz, 2.2),
      pfad('M78 50 Q92 64 88 84 Q78 74 74 62 Z', schwarz, 2.2),
      pfad('M48 8 Q79 8 80 60 Q82 104 48 106 Q14 104 16 60 Q17 8 48 8 Z', schwarz, 2.6),
      pfad('M48 30 Q39 19 30 27 Q22 37 26 56 Q24 84 32 96 Q48 104 64 96 Q72 84 70 56 Q74 37 66 27 Q57 19 48 30 Z', W, 2),
      el(37, 106, 10, 4.5, SCHNABEL, 2),
      el(59, 106, 10, 4.5, SCHNABEL, 2),
      ...auge(39, 34, 3.2),
      ...auge(57, 34, 3.2),
      pfad('M42 40 L54 40 L48 49 Z', SCHNABEL, 1.8),
      wange(33, 44, 3.6, 2.4),
      wange(63, 44, 3.6, 2.4),
    ],
  }
}

function krokodil(): Zeichnung {
  const haut = '#6FA35A'
  const bauch = '#C9DE9C'
  const hoecker: string[] = []
  for (let x = 28; x <= 96; x += 12) hoecker.push(`M${x} 38 Q${x + 6} 24 ${x + 12} 38`)
  return {
    vb: [0, 0, 160, 92],
    formen: [
      schatten(80, 86, 66, 3),
      pfad('M38 62 L34 78 L28 81 L44 82 L48 64 Z', GRUEN_DUNKEL, 2),
      pfad('M96 62 L92 78 L86 81 L102 82 L106 64 Z', GRUEN_DUNKEL, 2),
      pfad(hoecker.join(' ') + ' Z', GRUEN_DUNKEL, 2),
      pfad('M2 52 Q24 36 60 35 L100 35 Q112 26 126 30 L148 37 Q160 44 155 55 L128 64 Q108 70 60 70 Q24 70 2 52 Z', haut, 2.6),
      pfad('M24 62 Q50 70 80 69 Q108 68 124 63 Q104 65 80 65 Q52 66 24 62 Z', bauch, 0),
      pfad('M56 62 L52 78 L46 81 L62 82 L66 64 Z', haut, 2),
      pfad('M112 60 L108 78 L102 81 L118 82 L122 62 Z', haut, 2),
      kreis(116, 28, 10, haut, 2.4),
      kreis(117, 27, 6.4, W, 1.6),
      ...auge(118, 27.5, 3.2),
      kreis(148, 37, 3.6, haut, 1.8),
      linie('M122 50 Q138 54 154 47', 2.2),
      wange(132, 44, 4, 2.4),
    ],
  }
}

// =============================================================================
// 5  Natur und Wetter
// =============================================================================

function wolke(x: number, y: number, s = 1): Form[] {
  const k = (cx: number, cy: number, r: number): Form => ({ t: 'circle', cx: x + cx * s, cy: y + cy * s, r: r * s })
  return silhouette([k(-12, 2, 9), k(0, -4, 11), k(12, 2, 9), { t: 'rect', x: x - 20 * s, y: y + 1 * s, b: 40 * s, h: 10 * s, rx: 5 * s }], W, 4)
}

function regenbogen(): Zeichnung {
  const farben = ['#E0524A', '#F09A48', '#F4D24E', '#7CC06A', '#5AA6DE', '#5468B4', '#9670C0']
  const cx = 70
  const cy = 74
  const b = 6.6
  const baender: Form[] = farben.map((f, i) => {
    const r1 = 62 - i * b
    const r2 = r1 - b
    return {
      t: 'path',
      d: `M${cx - r1} ${cy} A${r1} ${r1} 0 0 1 ${cx + r1} ${cy} L${cx + r2} ${cy} A${r2} ${r2} 0 0 0 ${cx - r2} ${cy} Z`,
      f,
      s: T,
      w: 1.4,
    }
  })
  return {
    vb: [0, 0, 140, 92],
    formen: [...baender, ...wolke(20, 72, 1.2), ...wolke(120, 72, 1.2)],
  }
}

function wind(): Zeichnung {
  const krone: Form[] = [
    { t: 'circle', cx: 50, cy: 46, r: 17 },
    { t: 'circle', cx: 66, cy: 40, r: 15 },
    { t: 'circle', cx: 40, cy: 34, r: 13 },
    { t: 'circle', cx: 58, cy: 26, r: 13 },
    { t: 'circle', cx: 78, cy: 50, r: 11 },
  ]
  return {
    vb: [0, 0, 140, 114],
    formen: [
      linie('M2 110 L76 110', 2.4),
      ...tube('M30 110 Q30 84 46 58', HOLZ, 7),
      ...silhouette(krone, GRUEN, 4.4),
      linie('M48 60 Q56 52 64 50', 2),
      pfad('M90 64 Q96 58 102 62 Q96 68 90 64 Z', GRUEN, 1.6),
      pfad('M100 84 Q107 80 112 85 Q105 89 100 84 Z', ORANGE, 1.6),
      pfad('M84 86 Q88 80 94 82 Q90 88 84 86 Z', GELB, 1.6),
      linie('M2 22 Q20 18 30 12 Q38 6 32 3 Q26 2 27 8', 3, WELLE),
      linie('M2 56 Q14 52 24 54', 3, WELLE),
      linie('M2 84 Q12 80 20 82', 3, WELLE),
      linie('M80 74 Q100 70 112 72 Q122 74 120 80 Q118 84 114 80', 3, WELLE),
      linie('M88 100 Q106 96 122 98', 3, WELLE),
      linie('M114 46 Q116 70 128 84 Q134 96 136 112', 1.4, GRAU_DUNKEL),
      pfad('M114 6 L130 24 L114 46 L98 24 Z', ROT, 2.4),
      pfad('M114 6 L130 24 L114 24 Z', GELB, 0),
      pfad('M114 24 L114 46 L98 24 Z', GELB, 0),
      pfad('M114 6 L130 24 L114 46 L98 24 Z', 'none', 2.4),
      linie('M114 6 L114 46 M98 24 L130 24', 1.6),
      linie('M114 46 Q108 56 114 64 Q120 72 112 80', 1.8),
      pfad('M108 56 L114 58 L110 62 Z', BLAU, 1.4),
      pfad('M112 68 L118 70 L114 74 Z', GELB, 1.4),
    ],
  }
}

function stiefel(x: number, y: number, farbe: string): Form[] {
  return [
    pfad(`M${x} ${y} L${x + 20} ${y} L${x + 20} ${y + 36} Q${x + 36} ${y + 36} ${x + 40} ${y + 44} L${x + 40} ${y + 50} L${x} ${y + 50} Z`, farbe, 2.4),
    rechteck(x - 2, y - 4, 24, 8, farbe, 3, 2.2),
    pfad(`M${x} ${y + 46} L${x + 40} ${y + 46} L${x + 40} ${y + 50} L${x} ${y + 50} Z`, '#3B3E48', 1.6),
  ]
}

function pfuetze(): Zeichnung {
  const tropfen = (x: number, y: number, s = 1, r = 0): Form => ({
    t: 'g',
    tf: `translate(${x} ${y}) rotate(${r}) scale(${s})`,
    formen: [pfad('M0 -7 Q5 0 4 3 Q2 7 0 7 Q-2 7 -4 3 Q-5 0 0 -7 Z', BLAU_HELL, 1.6)],
  })
  return {
    vb: [0, 0, 130, 100],
    formen: [
      el(65, 86, 60, 12, BLAU_HELL, 2.4),
      el(65, 87, 42, 7, 'none', 1.4),
      ...stiefel(52, 34, GELB),
      ...stiefel(36, 38, '#F2D266'),
      pfad('M22 82 Q26 74 34 80', 'none', 2.2),
      pfad('M98 82 Q104 74 110 80', 'none', 2.2),
      tropfen(22, 62, 1.1, -30),
      tropfen(12, 74, 0.9, -50),
      tropfen(30, 52, 0.8, -15),
      tropfen(104, 58, 1.1, 30),
      tropfen(116, 70, 0.9, 50),
      tropfen(96, 46, 0.8, 15),
    ],
  }
}

function schneeflocke(x: number, y: number, r: number): Form {
  const a = r * 0.87
  const b = r * 0.5
  return linie(`M${x} ${y - r} L${x} ${y + r} M${x - a} ${y - b} L${x + a} ${y + b} M${x - a} ${y + b} L${x + a} ${y - b}`, 1.6, WELLE)
}

function schneeball(): Zeichnung {
  const ball = (cx: number, cy: number, r: number): Form[] => [
    kreis(cx, cy, r, W, 2.6),
    { t: 'path', d: `M${cx - r * 0.2} ${cy + r * 0.92} Q${cx + r * 0.9} ${cy + r * 0.6} ${cx + r * 0.94} ${cy - r * 0.2} Q${cx + r * 0.5} ${cy + r * 0.5} ${cx - r * 0.2} ${cy + r * 0.92} Z`, f: '#D6E6F3', s: 'none' },
    kreis(cx - r * 0.35, cy - r * 0.2, r * 0.08, '#D6E6F3', 0),
    kreis(cx + r * 0.1, cy + r * 0.3, r * 0.06, '#D6E6F3', 0),
  ]
  return {
    vb: [0, 0, 110, 96],
    formen: [
      pfad('M2 88 Q30 74 56 80 Q84 74 108 88 L108 92 Q56 96 2 92 Z', '#EEF4FA', 2.2),
      ...ball(34, 66, 18),
      ...ball(74, 66, 18),
      ...ball(54, 36, 18),
      schneeflocke(12, 18, 6),
      schneeflocke(96, 14, 7),
      schneeflocke(100, 40, 4.5),
      schneeflocke(14, 44, 4),
    ],
  }
}

function schlitten(): Zeichnung {
  const kufe = '#C9473D'
  return {
    vb: [0, 0, 140, 92],
    formen: [
      pfad('M0 84 Q70 74 140 84 L140 92 L0 92 Z', '#EEF4FA', 2.2),
      linie('M120 40 Q134 46 132 60 Q130 70 138 74', 2, HOLZ_DUNKEL),
      ...tube('M36 44 L36 70 M66 44 L66 70 M96 44 L96 70', kufe, 4),
      rechteck(22, 36, 92, 10, HOLZ, 3, 2.4),
      linie('M48 36 L48 46 M70 36 L70 46 M92 36 L92 46', 1.6, HOLZ_DUNKEL),
      ...tube('M14 72 L104 72 Q124 72 124 56 Q124 42 112 42', kufe, 5),
    ],
  }
}

function kastanie(): Zeichnung {
  const huelle = '#8DBF5C'
  const stacheln = (cx: number, cy: number, von: number, bis: number): Form => {
    let d = ''
    for (let a = von; a <= bis; a += 18) {
      const r = (a * Math.PI) / 180
      d += `M${(cx + 27 * Math.cos(r)).toFixed(1)} ${(cy + 23 * Math.sin(r)).toFixed(1)} L${(cx + 35 * Math.cos(r)).toFixed(1)} ${(cy + 31 * Math.sin(r)).toFixed(1)} `
    }
    return linie(d, 2.2, GRUEN_DUNKEL)
  }
  return {
    vb: [0, 0, 130, 100],
    formen: [
      schatten(66, 94, 50),
      stacheln(34, 64, 90, 270),
      el(34, 64, 28, 24, huelle, 2.4),
      el(40, 64, 20, 17, '#F4EDD8', 2),
      stacheln(96, 64, -90, 90),
      el(96, 64, 28, 24, huelle, 2.4),
      el(90, 64, 20, 17, '#F4EDD8', 2),
      pfad('M65 30 Q90 30 92 58 Q92 84 65 86 Q38 84 38 58 Q40 30 65 30 Z', '#8A4B2A', 2.6),
      pfad('M44 74 Q65 64 86 74 Q80 86 65 86 Q50 86 44 74 Z', '#E2C89C', 2),
      linie('M62 25 L65 31 L68 25', 2),
      linie('M50 46 Q54 38 62 36', 3.6, '#C98A60'),
    ],
  }
}

function eichel(): Zeichnung {
  return {
    vb: [0, 0, 100, 112],
    formen: [
      pfad('M60 30 Q66 14 80 6 Q94 4 96 16 Q86 18 90 26 Q80 28 82 36 Q70 36 60 30 Z', GRUEN, 2.2),
      linie('M62 30 Q76 18 88 12', 1.6, GRUEN_DUNKEL),
      ...tube('M46 32 Q46 22 52 16', HOLZ_DUNKEL, 4),
      pfad('M46 52 Q72 52 72 76 Q72 100 46 106 Q20 100 20 76 Q20 52 46 52 Z', '#C89A52', 2.6),
      linie('M46 106 L46 110', 2.4),
      linie('M30 66 Q30 78 36 90', 3.4, '#E3BE7E'),
      pfad('M14 56 Q14 30 46 30 Q78 30 78 56 Q46 64 14 56 Z', '#8A6A4A', 2.6),
      linie('M22 48 L30 40 M30 54 L42 38 M42 56 L54 38 M54 56 L66 40 M66 54 L72 46 M24 40 L38 54 M36 36 L54 56 M50 34 L66 54 M62 34 L74 48', 1.4, '#A88560'),
    ],
  }
}

function kuerbis(): Zeichnung {
  const o = '#EE8E3C'
  return {
    vb: [0, 0, 124, 100],
    formen: [
      schatten(62, 94, 52),
      linie('M70 22 Q82 10 92 16 Q98 22 92 26 Q86 28 88 22', 2, GRUEN_DUNKEL),
      el(34, 60, 26, 30, o, 2.4),
      el(90, 60, 26, 30, o, 2.4),
      el(62, 60, 26, 33, '#F29A48', 2.4),
      linie('M52 32 Q46 60 52 90 M72 32 Q78 60 72 90', 1.8, '#C9692F'),
      pfad('M56 30 Q56 18 62 10 L68 12 Q64 20 66 30 Z', '#7D8C4A', 2.2),
      pfad('M64 24 Q48 8 34 16 Q44 30 64 26 Z', GRUEN, 2),
      linie('M62 24 Q50 18 40 18', 1.4, GRUEN_DUNKEL),
    ],
  }
}

function kartoffel(): Zeichnung {
  const schale = '#CFA36A'
  const auge2 = (x: number, y: number): Form => linie(`M${x - 2.5} ${y} Q${x} ${y + 2} ${x + 2.5} ${y}`, 1.6, '#8A6038')
  return {
    vb: [0, 0, 124, 92],
    formen: [
      schatten(62, 86, 54),
      pfad('M12 54 Q10 30 38 24 Q64 18 74 36 Q84 56 66 70 Q42 84 22 74 Q12 66 12 54 Z', schale, 2.6),
      auge2(30, 40),
      auge2(56, 34),
      auge2(44, 62),
      auge2(64, 54),
      kreis(36, 52, 1.4, '#A97E4C', 0),
      kreis(52, 46, 1.2, '#A97E4C', 0),
      linie('M24 36 Q30 30 38 30', 3, '#E6C796'),
      pfad('M76 50 Q92 40 108 48 Q120 56 116 70 Q110 82 92 80 Q74 80 72 68 Q70 56 76 50 Z', '#C89A60', 2.6),
      auge2(90, 54),
      auge2(104, 64),
      auge2(86, 70),
      linie('M80 54 Q86 48 94 48', 2.6, '#E6C796'),
    ],
  }
}

function blattHerbst(): Zeichnung {
  const ahorn: string[] = []
  const spitzen = [
    [-90, 38],
    [-30, 34],
    [30, 24],
    [150, 24],
    [210, 34],
  ]
  for (const [a, r] of spitzen) {
    const w = (deg: number, rad: number) => {
      const x = Math.cos((deg * Math.PI) / 180) * rad
      const y = Math.sin((deg * Math.PI) / 180) * rad
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }
    ahorn.push(w(a - 30, 13), w(a - 12, r * 0.72), w(a - 6, r * 0.8), w(a, r), w(a + 6, r * 0.8), w(a + 12, r * 0.72))
  }
  ahorn.push('4,14', '0,10', '-4,14')
  const eiche = 'M0 -34 Q10 -32 8 -22 Q18 -20 12 -10 Q20 -6 14 4 Q20 10 10 16 Q8 26 0 28 Q-8 26 -10 16 Q-20 10 -14 4 Q-20 -6 -12 -10 Q-18 -20 -8 -22 Q-10 -32 0 -34 Z'
  return {
    vb: [0, 0, 124, 104],
    formen: [
      {
        t: 'g',
        tf: 'translate(30 56) rotate(-34)',
        formen: [linie('M0 26 L0 40', 2.6, BRAUN_DUNKEL), pfad(eiche, '#E8873A', 2.4), linie('M0 -26 L0 26 M0 -6 L-9 -12 M0 4 L9 -2 M0 12 L-8 8', 1.6, '#B85F24')],
      },
      {
        t: 'g',
        tf: 'translate(94 58) rotate(32)',
        formen: [linie('M0 28 L0 40', 2.6, BRAUN_DUNKEL), pfad('M0 -36 Q24 -12 0 30 Q-24 -12 0 -36 Z', GELB, 2.4), linie('M0 -28 L0 28 M0 -10 L8 -16 M0 0 L-9 -6 M0 10 L8 4', 1.6, '#C9962E')],
      },
      {
        t: 'g',
        tf: 'translate(62 48)',
        formen: [
          linie('M0 10 L0 50', 2.8, BRAUN_DUNKEL),
          { t: 'polygon', p: ahorn.join(' '), f: '#D9533E', s: T, w: 2.4 },
          linie('M0 10 L0 -32 M0 4 L26 -16 M0 4 L-26 -16 M0 8 L18 10 M0 8 L-18 10', 1.6, '#A93A2A'),
        ],
      },
    ],
  }
}

function kresse(tag: 1 | 3 | 7): Zeichnung {
  const formen: Form[] = []
  const erde = '#6E4F3C'
  const spross = (x: number, h: number, neig: number, gross: number): Form[] => {
    const tx = x + neig
    const ty = 46 - h
    return [
      linie(`M${x} 47 Q${x + neig * 0.3} ${47 - h * 0.6} ${tx} ${ty}`, 2, '#9DBF6A'),
      el(tx - gross * 0.9, ty - 1, gross, gross * 0.62, '#7DB55E', 1.3, -25),
      el(tx + gross * 0.9, ty - 1, gross, gross * 0.62, '#7DB55E', 1.3, 25),
    ]
  }
  if (tag === 3) {
    for (const [x, n] of [
      [26, -2],
      [36, 1],
      [46, -1],
      [56, 2],
      [64, 0],
    ])
      formen.push(...spross(x, 10, n, 3.8))
  }
  if (tag === 7) {
    const stiele: [number, number, number][] = [
      [20, 30, -6],
      [26, 38, -3],
      [32, 34, -1],
      [38, 42, 0],
      [44, 36, 1],
      [50, 44, 2],
      [56, 34, 3],
      [62, 40, 4],
      [68, 30, 6],
      [30, 26, 4],
      [46, 28, -4],
      [60, 26, -2],
    ]
    for (const [x, h, n] of stiele) formen.push(...spross(x, h, n, 5.4))
  }
  return {
    vb: [0, -6, 90, 106],
    formen: [
      pfad('M18 56 L72 56 L66 94 L24 94 Z', '#D9824F', 2.6),
      rechteck(12, 46, 66, 12, '#E39462', 3, 2.6),
      el(45, 46, 33, 7.5, '#E39462', 2.6),
      el(45, 46.5, 28, 5.2, erde, 1.6),
      ...(tag === 1
        ? ([
            [24, 46],
            [32, 44],
            [40, 47.5],
            [48, 44.5],
            [56, 47],
            [64, 45],
            [36, 49],
            [58, 43.5],
          ] as [number, number][]).map(([x, y]) => el(x, y, 2.4, 1.6, '#E8C890', 1))
        : []),
      ...formen,
    ],
  }
}

function regenschirm(): Zeichnung {
  const tropfen = (x: number, y: number): Form => pfad(`M${x} ${y - 6} Q${x + 4.4} ${y} ${x + 3.6} ${y + 2.6} Q${x + 2} ${y + 6} ${x} ${y + 6} Q${x - 2} ${y + 6} ${x - 3.6} ${y + 2.6} Q${x - 4.4} ${y} ${x} ${y - 6} Z`, '#7DBDEB', 1.6)
  const dach = 'M10 62 Q12 22 55 18 Q98 22 100 62 Q91 55 82 62 Q73 55 64 62 Q55 55 46 62 Q37 55 28 62 Q19 55 10 62 Z'
  return {
    vb: [0, -14, 110, 134],
    formen: [
      tropfen(14, -2),
      tropfen(40, -6),
      tropfen(72, -4),
      tropfen(98, 2),
      tropfen(6, 30),
      tropfen(104, 34),
      tropfen(10, 80),
      tropfen(100, 84),
      tropfen(22, 102),
      tropfen(88, 108),
      ...tube('M55 60 L55 104 Q55 114 46 114 Q38 114 38 106', BRAUN_DUNKEL, 3),
      pfad(dach, BLAU, 2.6),
      pfad('M28 62 Q30 30 55 18 Q40 34 46 62 Q37 55 28 62 Z', '#8FB2E0', 2),
      pfad('M64 62 Q70 34 55 18 Q80 30 82 62 Q73 55 64 62 Z', '#8FB2E0', 2),
      linie('M55 18 L55 12', 3),
    ],
  }
}

function sonnenschirm(): Zeichnung {
  const strahlen = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4
    return `M${(20 + 15 * Math.cos(a)).toFixed(1)} ${(18 + 15 * Math.sin(a)).toFixed(1)} L${(20 + 21 * Math.cos(a)).toFixed(1)} ${(18 + 21 * Math.sin(a)).toFixed(1)}`
  }).join(' ')
  // Unterkante: Q-Kurve (16,56) → (70,42) → (124,56); Streifen von der Spitze (74,14) aus
  const punkt = (u: number) => [(1 - u) ** 2 * 16 + 2 * u * (1 - u) * 70 + u * u * 124, (1 - u) ** 2 * 56 + 2 * u * (1 - u) * 42 + u * u * 56]
  const keile: Form[] = []
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = punkt(i / 6)
    const [x2, y2] = punkt((i + 1) / 6)
    const k1 = 40 + (i / 6) * 68
    const k2 = 40 + ((i + 1) / 6) * 68
    keile.push({ t: 'path', d: `M74 14 Q${k1.toFixed(1)} 18 ${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} Q${k2.toFixed(1)} 18 74 14 Z`, f: i % 2 ? W : ROT, s: T, w: 1.6 })
  }
  return {
    vb: [0, 0, 140, 112],
    formen: [
      linie(strahlen, 2.4, '#E9A93A'),
      kreis(20, 18, 11, GELB, 2.2),
      pfad('M6 108 Q30 88 70 90 Q110 88 136 108 Z', SAND, 2.4),
      ...tube('M74 14 L70 100', '#E7E2DA', 3.4),
      ...keile,
      pfad('M74 14 Q46 18 16 56 Q70 42 124 56 Q102 18 74 14 Z', 'none', 2.6),
      kreis(74, 12, 3, ROT, 1.8),
      kreis(40, 100, 1.4, '#D9BE7E', 0),
      kreis(100, 98, 1.4, '#D9BE7E', 0),
      kreis(112, 102, 1.4, '#D9BE7E', 0),
    ],
  }
}

// =============================================================================
// 6  Feste in Luxemburg und Kirmes
// =============================================================================

function peckvillchen(): Zeichnung {
  const ton = '#C9673F'
  const dunkel = '#9E4A2C'
  return {
    vb: [0, -6, 124, 100],
    formen: [
      el(64, 86, 24, 5.5, dunkel, 2.2),
      pfad('M40 50 L9 42 Q3 47 7 55 L38 67 Z', ton, 2.4),
      el(7, 48.5, 2.6, 5.6, T, 0),
      pfad('M30 62 Q30 36 58 34 Q72 32 78 24 Q82 12 94 13 Q107 14 108 28 Q108 36 101 40 Q106 60 92 72 Q78 84 56 82 Q34 80 30 62 Z', ton, 2.6),
      pfad('M107 23 L119 27 L107 32 Z', GELB, 2),
      ...auge(97, 24, 3.2),
      pfad('M46 50 Q66 40 86 52 Q80 68 60 68 Q46 64 46 50 Z', GELB, 2),
      kreis(58, 54, 2.4, ROT, 1.2),
      kreis(68, 52, 2.4, ROT, 1.2),
      kreis(76, 57, 2.4, ROT, 1.2),
      kreis(64, 61, 2.4, ROT, 1.2),
      linie('M40 72 Q56 78 74 76', 2.4, '#F6E9D3'),
      kreis(46, 66, 1.8, '#F6E9D3', 0),
      kreis(84, 70, 1.8, '#F6E9D3', 0),
      linie('M92 46 Q98 52 96 60', 2.4, '#8DB87C'),
      el(66, 36.5, 3.6, 2.2, T, 0),
      linie('M58 24 Q62 18 60 12 M70 22 Q76 16 76 8', 2, BLAU),
      linie('M84 4 L84 -4 L90 -2', 1.8),
      el(82, 4, 2.6, 2, T, 0),
    ],
  }
}

function buergbrennen(): Zeichnung {
  return {
    vb: [0, 0, 112, 134],
    formen: [
      linie('M2 122 L110 122', 2.4),
      ...tube('M56 4 L56 40', HOLZ_DUNKEL, 5),
      pfad('M56 30 L98 120 L14 120 Z', '#E2C27A', 2.6),
      linie('M46 54 L60 40 M38 72 L68 46 M30 90 L78 58 M24 106 L88 74 M40 118 L94 92 M44 60 L72 72 M34 80 L84 98 M26 98 L60 118', 2, '#B98F48'),
      ...tube('M30 22 L82 22', HOLZ_DUNKEL, 5),
      pfad('M34 17 Q30 22 34 27 L44 27 Q42 22 44 17 Z', '#E2C27A', 1.6),
      pfad('M78 17 Q82 22 78 27 L68 27 Q70 22 68 17 Z', '#E2C27A', 1.6),
      pfad('M14 122 Q10 110 20 104 Q22 112 28 112 Q26 100 36 94 Q38 106 46 108 Q46 98 54 92 Q58 104 64 106 Q66 98 72 96 Q78 106 76 114 Q84 110 86 102 Q96 112 92 122 Z', '#F08A3A', 2.2),
      pfad('M28 122 Q26 114 32 110 Q36 116 42 116 Q42 108 50 104 Q54 114 60 114 Q62 108 68 108 Q72 116 68 122 Z', GELB, 1.8),
      kreis(14, 94, 2, '#F08A3A', 0),
      kreis(96, 92, 2.4, GELB, 0),
      kreis(90, 82, 1.6, '#F08A3A', 0),
      kreis(20, 82, 1.6, GELB, 0),
    ],
  }
}

function lampion(): Zeichnung {
  const rand = '#4F5D82'
  return {
    vb: [0, 0, 112, 124],
    formen: [
      ...tube('M4 18 L108 6', HOLZ, 4),
      linie('M56 12 L56 28', 1.8),
      el(56, 70, 40, 38, '#F08A48', 2.6),
      el(56, 72, 24, 25, '#F8C96A', 0),
      linie('M19 52 Q56 60 93 52 M16 70 Q56 78 96 70 M19 88 Q56 96 93 88', 1.6, '#C9682F'),
      pfad('M38 52 Q30 60 34 70 Q38 78 48 78 Q40 72 40 64 Q40 56 48 50 Q42 50 38 52 Z', GELB, 1.6),
      pfad('M72 54 L74 59 L79 59 L75 62 L77 67 L72 64 L67 67 L69 62 L65 59 L70 59 Z', GELB, 1.4),
      rechteck(38, 26, 36, 8, rand, 2, 2.2),
      rechteck(40, 104, 32, 8, rand, 2, 2.2),
    ],
  }
}

function riesenrad(): Zeichnung {
  const cx = 60
  const cy = 54
  const r = 42
  const farben = [ROT, GELB, BLAU, GRUEN, ORANGE, LILA, '#5AA6DE', '#D8899A']
  const speichen: string[] = []
  const gondeln: Form[] = []
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)
    speichen.push(`M${cx} ${cy} L${x.toFixed(1)} ${y.toFixed(1)}`)
    gondeln.push(linie(`M${x.toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y + 4).toFixed(1)}`, 1.6))
    gondeln.push(pfad(`M${(x - 7).toFixed(1)} ${(y + 4).toFixed(1)} L${(x + 7).toFixed(1)} ${(y + 4).toFixed(1)} L${(x + 6).toFixed(1)} ${(y + 14).toFixed(1)} Q${x.toFixed(1)} ${(y + 17).toFixed(1)} ${(x - 6).toFixed(1)} ${(y + 14).toFixed(1)} Z`, farben[i], 1.8))
  }
  return {
    vb: [0, 0, 120, 124],
    formen: [
      linie('M4 120 L116 120', 2.4),
      ...tube(`M${cx} ${cy} L32 118 M${cx} ${cy} L88 118`, '#9AA2B1', 4),
      { t: 'circle', cx, cy, r, f: 'none', s: T, w: 2.6 },
      { t: 'circle', cx, cy, r: r - 6, f: 'none', s: T, w: 1.6 },
      linie(speichen.join(' '), 1.6),
      ...gondeln,
      kreis(cx, cy, 6, GELB, 2.2),
      rechteck(26, 114, 68, 6, '#9AA2B1', 2, 2),
    ],
  }
}

function karussellPferd(x: number, y: number, rechts: boolean, sattel: string): Form {
  const formen: Form[] = [
    ...silhouette(
      [
        { t: 'ellipse', cx: 0, cy: 0, rx: 12, ry: 6.5 },
        { t: 'polygon', p: '6,-2 10,-14 16,-13 13,2' },
        { t: 'g', tf: 'translate(17 -11) rotate(30)', formen: [{ t: 'ellipse', cx: 0, cy: 0, rx: 6.5, ry: 3.6 }] },
        { t: 'g', tf: 'translate(8 4) rotate(-50)', formen: [{ t: 'rect', x: -2, y: 0, b: 4, h: 11, rx: 2 }] },
        { t: 'g', tf: 'translate(-8 4) rotate(30)', formen: [{ t: 'rect', x: -2, y: 0, b: 4, h: 11, rx: 2 }] },
      ],
      W,
      3.4,
    ),
    pfad('M9 -14 Q4 -10 5 -2 L9 -2 L12 -13 Z', '#8A6A4A', 1.2),
    pfad('M-6 -6 L4 -6 L4 0 L-6 0 Z', sattel, 1.4),
    linie('M-12 -2 Q-18 2 -17 8', 2.4, '#8A6A4A'),
    kreis(18, -13, 1.1, T, 0),
  ]
  return { t: 'g', tf: `translate(${x} ${y}) scale(${rechts ? 1 : -1} 1)`, formen }
}

function karussell(): Zeichnung {
  const keile: Form[] = []
  for (let i = 0; i < 8; i++) {
    const x1 = 10 + i * 13
    keile.push(pfad(`M62 12 L${x1} 42 L${x1 + 13} 42 Z`, i % 2 ? W : ROT, 1.6))
  }
  const bogen: string[] = []
  for (let i = 0; i < 8; i++) bogen.push(`M${10 + i * 13} 42 Q${16.5 + i * 13} 52 ${23 + i * 13} 42 Z`)
  return {
    vb: [0, -4, 124, 124],
    formen: [
      linie('M62 12 L62 -2', 2),
      pfad('M62 -2 L74 2 L62 6 Z', BLAU, 1.6),
      ...tube('M30 46 L30 104 M94 46 L94 104', '#E9B949', 2.6),
      rechteck(54, 46, 16, 58, '#BFE0EE', 2, 2.2),
      linie('M54 62 L70 62 M54 84 L70 84', 1.6),
      karussellPferd(31, 76, false, BLAU),
      karussellPferd(93, 82, true, GRUEN),
      ...keile,
      pfad('M10 42 L62 12 L114 42 Z', 'none', 2.4),
      pfad(bogen.join(' '), GELB, 1.8),
      rechteck(6, 102, 112, 12, ROT, 4, 2.4),
      ...[18, 34, 50, 66, 82, 98].map((x) => kreis(x + 4, 108, 2, GELB, 1)),
    ],
  }
}

function feuerwerk(): Zeichnung {
  const stern = (cx: number, cy: number, r: number, farbe: string, n: number): Form[] => {
    let d = ''
    const punkte: Form[] = []
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI) / n
      d += `M${(cx + r * 0.3 * Math.cos(a)).toFixed(1)} ${(cy + r * 0.3 * Math.sin(a)).toFixed(1)} L${(cx + r * 0.82 * Math.cos(a)).toFixed(1)} ${(cy + r * 0.82 * Math.sin(a)).toFixed(1)} `
      punkte.push({ t: 'circle', cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a), r: r * 0.08, f: farbe, s: 'none' })
    }
    return [
      { t: 'path', d, s: T, f: 'none', w: 4.4 },
      { t: 'path', d, s: farbe, f: 'none', w: 2.4 },
      ...punkte,
      kreis(cx, cy, r * 0.14, farbe, 1.4),
    ]
  }
  return {
    vb: [0, 0, 124, 112],
    formen: [
      { t: 'path', d: 'M38 108 Q36 80 40 62 M84 110 Q88 70 86 46 M100 108 Q104 96 98 82', s: GRAU, f: 'none', w: 1.8, dash: '3 4' },
      ...stern(38, 40, 30, '#E0524A', 12),
      ...stern(90, 30, 24, '#5AA6DE', 10),
      ...stern(92, 78, 18, '#7CC06A', 9),
      ...stern(16, 86, 12, GELB, 8),
      pfad('M64 70 L66 75 L71 76 L66 78 L64 83 L62 78 L57 76 L62 75 Z', GELB, 1.2),
      pfad('M114 54 L115.5 58 L119.5 59 L115.5 60.5 L114 64.5 L112.5 60.5 L108.5 59 L112.5 58 Z', '#F09A48', 1.2),
      pfad('M62 10 L63.5 14 L67.5 15 L63.5 16.5 L62 20.5 L60.5 16.5 L56.5 15 L60.5 14 Z', LILA, 1.2),
    ],
  }
}

function fahneLu(): Zeichnung {
  const welle = (y: number) => `Q38 ${y - 8} 62 ${y} Q86 ${y + 8} 112 ${y}`
  const zurueck = (y: number) => `Q86 ${y + 8} 62 ${y} Q38 ${y - 8} 16 ${y}`
  const streifen = (y: number, f: string): Form => ({ t: 'path', d: `M16 ${y} ${welle(y)} L112 ${y + 18} ${zurueck(y + 18)} Z`, f, s: 'none' })
  return {
    vb: [0, 0, 120, 104],
    formen: [
      ...tube('M14 6 L14 100', '#9AA2B1', 3.6),
      kreis(14, 5, 4, GELB, 2),
      streifen(12, '#E8323A'),
      streifen(30, W),
      streifen(48, '#3AA8E0'),
      linie(`M16 30 ${welle(30)} M16 48 ${welle(48)}`, 1.4),
      { t: 'path', d: `M16 12 ${welle(12)} L112 66 ${zurueck(66)} Z`, f: 'none', s: T, w: 2.4 },
    ],
  }
}

function kleeschen(): Zeichnung {
  const rot = '#C9433A'
  const gold = '#E9B949'
  const haut = '#F3D2B6'
  return {
    vb: [0, 0, 108, 154],
    formen: [
      schatten(52, 149, 34),
      ...tube('M84 40 L86 146', gold, 3.6),
      linie('M84 40 L84 22 Q84 8 72 8 Q62 8 62 18 Q62 27 70 27 Q76 27 76 20', 5.4, T),
      linie('M84 40 L84 22 Q84 8 72 8 Q62 8 62 18 Q62 27 70 27 Q76 27 76 20', 3, gold),
      pfad('M30 62 Q22 100 16 146 L88 146 Q82 100 74 62 Q52 54 30 62 Z', rot, 2.6),
      pfad('M42 70 L62 70 L68 146 L36 146 Z', W, 2.2),
      linie('M30 62 Q24 100 18 144 M74 62 Q80 100 86 144', 3, gold),
      pfad('M26 64 Q16 84 22 100 L32 98 Q30 84 36 70 Z', rot, 2.4),
      kreis(26, 102, 5.4, W, 2),
      pfad('M74 64 Q86 72 84 84 L76 86 Q76 78 70 72 Z', rot, 2.4),
      kreis(82, 84, 5.4, W, 2),
      kreis(52, 46, 14, haut, 2.4),
      pfad('M35 44 Q34 76 52 84 Q70 76 69 44 Q64 56 52 56 Q40 56 35 44 Z', W, 2.2),
      pfad('M44 54 Q48 50 52 53 Q56 50 60 54 Q56 57 52 55 Q48 57 44 54 Z', W, 1.6),
      linie('M48 60 Q52 63 56 60', 1.8),
      ...auge(46, 43, 2.6),
      ...auge(58, 43, 2.6),
      wange(42, 50, 3, 2),
      wange(62, 50, 3, 2),
      pfad('M36 36 L36 18 Q40 8 52 0 Q64 8 68 18 L68 36 Q52 32 36 36 Z', rot, 2.4),
      pfad('M36 30 Q52 26 68 30 L68 36 Q52 32 36 36 Z', gold, 1.8),
      pfad('M48 30 L48 6 Q50 3 52 2 Q54 3 56 6 L56 30 Z', gold, 1.8),
      pfad('M52 12 L55 16 L52 20 L49 16 Z', W, 1.2),
    ],
  }
}

function boxemaennchen(): Zeichnung {
  const teig = '#D99A52'
  const rosine = '#5C3A2E'
  return {
    vb: [0, 0, 100, 126],
    formen: [
      schatten(50, 120, 32),
      ...silhouette(
        [
          { t: 'circle', cx: 50, cy: 24, r: 16 },
          { t: 'rect', x: 31, y: 36, b: 38, h: 56, rx: 15 },
          { t: 'g', tf: 'translate(36 44) rotate(58)', formen: [{ t: 'rect', x: -7, y: 0, b: 14, h: 28, rx: 7 }] },
          { t: 'g', tf: 'translate(64 44) rotate(-58)', formen: [{ t: 'rect', x: -7, y: 0, b: 14, h: 28, rx: 7 }] },
          { t: 'g', tf: 'translate(41 84) rotate(12)', formen: [{ t: 'rect', x: -8, y: 0, b: 16, h: 32, rx: 8 }] },
          { t: 'g', tf: 'translate(59 84) rotate(-12)', formen: [{ t: 'rect', x: -8, y: 0, b: 16, h: 32, rx: 8 }] },
        ],
        teig,
        4.4,
      ),
      linie('M50 92 L50 104', 2),
      el(50, 64, 12, 18, '#E8B470', 0),
      linie('M38 16 Q44 10 52 10', 3, '#EBBF80'),
      el(44, 22, 2.6, 3.2, rosine, 1),
      el(56, 22, 2.6, 3.2, rosine, 1),
      laecheln(50, 29, 5, 2.2),
      wange(40, 29, 3.2, 2),
      wange(60, 29, 3.2, 2),
      el(50, 50, 3, 3.4, rosine, 1),
      el(50, 63, 3, 3.4, rosine, 1),
      el(50, 76, 3, 3.4, rosine, 1),
      ...[
        [44, 12],
        [56, 13],
        [38, 40],
        [62, 40],
        [18, 56],
        [82, 56],
        [40, 104],
        [60, 104],
      ].map(([x, y]) => ({ t: 'rect', x: x - 1.6, y: y - 1.2, b: 3.2, h: 2.4, rx: 0.6, f: W, s: T, w: 0.8 }) as Form),
    ],
  }
}

// =============================================================================
// Register
// =============================================================================

export const TIERE: Record<string, () => Zeichnung> = {
  // 1 Bauernhof und Garten
  kuh,
  huhn,
  kueken,
  ei,
  'ei-im-nest': eiImNest,
  'ei-riss': eiRiss,
  schaf,
  ziege,
  schwein,
  pferd: () => pferdeart('pferd'),
  esel: () => pferdeart('esel'),
  hase,
  katze,
  hund,
  // 2 Wald, Wildtiere, Vögel
  igel,
  eichhoernchen,
  fuchs,
  reh,
  eule,
  vogel,
  nest,
  vogelhaus,
  frosch,
  // 3 Krabbeltiere und Verwandlung
  raupe,
  puppe,
  schmetterling,
  biene,
  ameise,
  regenwurm,
  schnecke,
  marienkaefer,
  // 4 Zoo
  elefant,
  giraffe,
  loewe,
  affe,
  pinguin,
  zebra: () => pferdeart('zebra'),
  krokodil,
  // 5 Natur und Wetter
  regenbogen,
  wind,
  pfuetze,
  schneeball,
  schlitten,
  kastanie,
  eichel,
  kuerbis,
  kartoffel,
  'blatt-herbst': blattHerbst,
  'kresse-1': () => kresse(1),
  'kresse-2': () => kresse(3),
  'kresse-3': () => kresse(7),
  regenschirm,
  sonnenschirm,
  // 6 Feste in Luxemburg und Kirmes
  peckvillchen,
  buergbrennen,
  lampion,
  riesenrad,
  karussell,
  feuerwerk,
  'fahne-lu': fahneLu,
  kleeschen,
  boxemaennchen,
}

