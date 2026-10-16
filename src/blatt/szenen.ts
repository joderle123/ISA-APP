// ---------------------------------------------------------------------------
// Szenen-Hintergründe für Arbeitsblätter: 'szene:pausenhof', 'szene:bus' …
// Zart und ruhig: helle Pastellflächen, feine graue Linien, wenige Dinge – im
// Schwarzweißdruck nur helle Grautöne. Eine Figur (src/blatt/figuren.ts) steht
// davor und bleibt gut sichtbar: Mitte und untere Hälfte sind frei, Dinge
// sitzen am Rand und weiter hinten.
//
// Alle Szenen außer 'chat' sind 3 : 2 (viewBox 240 × 160); der Boden liegt bei
// y = 132, Figuren stehen dort mit den Füßen. `szeneMitFiguren` setzt Figuren
// und Motive in eine Szene und liefert eine einzige Zeichnung.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { figurZeichnung } from './figuren'
import { motivZeichnung } from './motive'

export const SZENEN_NAMEN = ['pausenhof', 'klassenzimmer', 'bus', 'kueche', 'kinderzimmer', 'park', 'flur', 'kantine', 'umkleide', 'chat'] as const
export type SzenenName = (typeof SZENEN_NAMEN)[number]

export interface SzenenInfo {
  de: string
  fr: string
  /** viewBox-Breite und -Höhe */
  b: number
  h: number
  /** Bodenlinie (Füße der Figuren) als Anteil der Höhe; undefiniert = keine Figuren davor */
  boden?: number
  /** empfohlene Mittelpunkte (Anteil der Breite) für eine oder zwei Figuren und ihre Höhe (Anteil der Szenenhöhe) */
  figuren?: { x: number[]; hoehe: number }
  /** Nur 'chat': leere Sprechblasen (viewBox-Einheiten) zum Beschriften; seite 'l' = empfangen, 'r' = gesendet */
  blasen?: { x: number; y: number; b: number; h: number; seite: 'l' | 'r' }[]
}

const WEIT = { b: 240, h: 160, boden: 132 / 160, figuren: { x: [0.27, 0.7], hoehe: 0.66 } }

export const SZENEN: Record<SzenenName, SzenenInfo> = {
  pausenhof: { de: 'Pausenhof', fr: 'Cour de récréation', ...WEIT },
  klassenzimmer: { de: 'Klassenzimmer', fr: 'Salle de classe', ...WEIT },
  bus: { de: 'Bus', fr: 'Bus', ...WEIT },
  kueche: { de: 'Küche', fr: 'Cuisine', ...WEIT },
  kinderzimmer: { de: 'Kinderzimmer', fr: 'Chambre d’enfant', ...WEIT },
  park: { de: 'Park', fr: 'Parc', ...WEIT },
  flur: { de: 'Schulflur', fr: 'Couloir de l’école', ...WEIT },
  kantine: { de: 'Kantine', fr: 'Cantine', ...WEIT },
  umkleide: { de: 'Umkleide', fr: 'Vestiaire', ...WEIT },
  chat: {
    de: 'Handy-Chat',
    fr: 'Chat sur le téléphone',
    b: 120,
    h: 160,
    blasen: [
      { x: 16, y: 44, b: 62, h: 22, seite: 'l' },
      { x: 42, y: 72, b: 62, h: 28, seite: 'r' },
      { x: 16, y: 106, b: 56, h: 20, seite: 'l' },
    ],
  },
}

export function istSzene(name: string): name is SzenenName {
  return (SZENEN_NAMEN as readonly string[]).includes(name)
}

// --- Zeichenhilfen -------------------------------------------------------------------------------
const LINIE = '#B9C2D0'
const LINIE2 = '#A3AEBF'
const HIMMEL = '#DDECF8'
const WOLKE = '#FFFFFF'
const HOLZ = '#E6D2B0'
const HOLZ2 = '#D9C29A'
const GRUEN = '#D5EAC4'
const GRUEN2 = '#C6E1B0'
const BODEN = '#E8EDF2'

const rc = (x: number, y: number, b: number, h: number, f: string, rx = 0, s: string = LINIE, w = 1): Form => ({ t: 'rect', x, y, b, h, rx, f, s, w })
const fl = (x: number, y: number, b: number, h: number, f: string, rx = 0): Form => ({ t: 'rect', x, y, b, h, rx, f, s: 'none' })
const ci = (cx: number, cy: number, r: number, f: string, s: string = LINIE, w = 1): Form => ({ t: 'circle', cx, cy, r, f, s, w })
const el = (cx: number, cy: number, rx: number, ry: number, f: string, s: string = 'none', w = 1): Form => ({ t: 'ellipse', cx, cy, rx, ry, f, s, w })
const li = (x1: number, y1: number, x2: number, y2: number, s: string = LINIE, w = 1): Form => ({ t: 'line', x1, y1, x2, y2, s, w })
const pa = (d: string, f: string, s: string = LINIE, w = 1): Form => ({ t: 'path', d, f, s, w })
const po = (p: string, f: string, s: string = LINIE, w = 1): Form => ({ t: 'polygon', p, f, s, w })

function wolke(x: number, y: number, k = 1): Form[] {
  return [
    el(x, y, 18 * k, 6 * k, WOLKE),
    el(x - 8 * k, y - 4 * k, 9 * k, 6.5 * k, WOLKE),
    el(x + 6 * k, y - 6 * k, 10 * k, 7.5 * k, WOLKE),
  ].map((f) => ({ ...f, o: 0.95 }) as Form)
}

/** Fenster mit Kreuz; `aussen` = Formen im Fenster (Koordinaten wie die Szene). */
function fenster(x: number, y: number, b: number, h: number, aussen: Form[] = [], rahmen = '#FFFFFF'): Form[] {
  return [
    rc(x, y, b, h, HIMMEL, 1.5, LINIE2),
    ...aussen,
    li(x + b / 2, y, x + b / 2, y + h, LINIE2, 1),
    li(x, y + h * 0.52, x + b, y + h * 0.52, LINIE2, 1),
    rc(x - 2, y + h, b + 4, 3.4, rahmen, 1, LINIE2),
  ]
}

function baum(x: number, y: number, k = 1, f = GRUEN): Form[] {
  return [
    rc(x - 4 * k, y, 8 * k, 46 * k, '#E2CBA9', 1.5),
    ci(x, y - 6 * k, 22 * k, f),
    ci(x - 17 * k, y + 6 * k, 15 * k, f),
    ci(x + 17 * k, y + 6 * k, 15 * k, f),
    fl(x - 12 * k, y - 4 * k, 24 * k, 14 * k, f, 6),
  ]
}

/** Zeile aus Schiebetüren/Spinden: n Türen ab x. */
function spinde(x: number, y: number, b: number, h: number, farben: string[], n: number): Form[] {
  const out: Form[] = []
  for (let i = 0; i < n; i++) {
    const sx = x + i * b
    out.push(rc(sx, y, b, h, farben[i % farben.length], 1.2))
    for (let j = 0; j < 3; j++) out.push(li(sx + b * 0.25, y + 6 + j * 3.2, sx + b * 0.75, y + 6 + j * 3.2, LINIE2, 0.9))
    out.push(rc(sx + b * 0.62, y + h * 0.5, 3, 8, '#FFFFFF', 1.2, LINIE2, 0.9))
    out.push(rc(sx + b * 0.26, y + h * 0.5 - 14, b * 0.4, 5, '#FFFFFF', 1, LINIE2, 0.8))
  }
  return out
}

function bodenFliesen(y: number, b = 240, h = 52, f = BODEN, zeilen = [14, 30, 44]): Form[] {
  const out: Form[] = [fl(0, y, b, h, f)]
  for (const dz of zeilen) out.push(li(0, y + dz, b, y + dz, LINIE, 0.7))
  return out
}

// --- Szenen ----------------------------------------------------------------------------------------

function pausenhof(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 110, HIMMEL), ...wolke(150, 22, 1), ...wolke(214, 40, 0.8), ...wolke(40, 14, 0.7)]
  // Schulhaus links
  f.push(po('-4,36 48,18 100,36', '#E9CDBB', LINIE))
  f.push(rc(0, 36, 96, 72, '#F4E6D8', 0))
  for (const y of [48, 78])
    for (let i = 0; i < 3; i++) f.push(rc(10 + i * 28, y, 16, 18, HIMMEL, 1.5, LINIE2), li(18 + i * 28, y, 18 + i * 28, y + 18, LINIE2, 0.8))
  f.push(rc(40, 80, 18, 28, '#E2C9B0', 2), ci(53, 95, 1.2, '#FFFFFF', LINIE2, 0.7))
  // Baum und Zaun rechts
  f.push(...baum(206, 56, 1))
  f.push(rc(112, 94, 88, 3, '#FFFFFF', 0))
  for (let i = 0; i < 12; i++) f.push(rc(114 + i * 7.5, 90, 4, 18, '#FFFFFF', 1))
  // Boden, Hüpfkästchen, Ball
  f.push(fl(0, 108, 240, 52, BODEN), fl(0, 108, 240, 4, '#DCE2EA'))
  f.push(li(0, 126, 240, 126, LINIE, 0.6), li(0, 146, 240, 146, LINIE, 0.6))
  const hx = 150
  for (let i = 0; i < 6; i++) {
    if (i % 3 === 2) f.push(rc(hx + i * 13, 141, 13, 7, '#FFFFFF', 0, LINIE2, 0.9), rc(hx + i * 13, 148, 13, 7, '#FFFFFF', 0, LINIE2, 0.9))
    else f.push(rc(hx + i * 13, 141, 13, 14, '#FFFFFF', 0, LINIE2, 0.9))
  }
  f.push(ci(26, 146, 6, '#F8DCD4', LINIE2, 0.9), pa('M20.5 144 Q26 148 31.5 144', 'none', LINIE2, 0.8))
  return f
}

function klassenzimmer(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 108, '#F7F2E8'), fl(0, 104, 240, 5, '#E5D8C2')]
  f.push(...bodenFliesen(109, 240, 51, '#ECE0CC', [12, 27, 42]))
  // Tafel
  f.push(rc(56, 18, 118, 62, HOLZ2, 2), rc(61, 23, 108, 49, '#D2E1D7', 1, LINIE2, 0.8), rc(56, 79, 118, 4, HOLZ2, 1))
  f.push(rc(120, 76, 14, 3.4, '#FFFFFF', 1, LINIE2, 0.7))
  // Uhr und Pinnwand links
  f.push(ci(26, 34, 11, '#FFFFFF', LINIE2), li(26, 34, 26, 27, LINIE2, 1.3), li(26, 34, 31, 36, LINIE2, 1.3))
  f.push(rc(8, 56, 38, 36, '#EBDDC0', 1.5, LINIE2))
  f.push(rc(13, 61, 11, 13, '#FBE3E0', 0, LINIE, 0.7), rc(27, 63, 13, 10, '#E3F0D8', 0, LINIE, 0.7), rc(15, 77, 12, 11, '#FFF3C9', 0, LINIE, 0.7), rc(30, 77, 10, 11, '#DDEAF8', 0, LINIE, 0.7))
  // Fenster rechts mit Vorhang
  f.push(...fenster(186, 18, 46, 56, [fl(187, 56, 44, 17, GRUEN)]))
  f.push(pa('M184 16 L196 16 Q192 40 196 70 L184 70 Z', 'zart', LINIE, 0.9))
  // Pult hinten rechts
  f.push(rc(196, 92, 40, 4, HOLZ, 1), li(200, 96, 200, 120, LINIE2, 1.4), li(232, 96, 232, 120, LINIE2, 1.4), rc(204, 104, 26, 3, HOLZ2, 1))
  f.push(rc(6, 100, 24, 3.6, HOLZ, 1), li(10, 104, 10, 122, LINIE2, 1.4), li(26, 104, 26, 122, LINIE2, 1.4))
  return f
}

function bus(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 118, '#EAEFF5'), fl(0, 0, 240, 13, '#DFE6EE'), ...bodenFliesen(118, 240, 42, '#DEE3EA', [12, 26, 38])]
  // Fenster mit Häusern, Bäumen
  for (const x of [14, 90, 166]) {
    f.push(
      ...fenster(x, 26, 60, 46, [
        rc(x + 4, 46, 14, 26, '#CCD9E8', 0, 'none'),
        rc(x + 20, 38, 12, 34, '#D8E2EC', 0, 'none'),
        ci(x + 46, 56, 9, GRUEN2, 'none'),
        fl(x + 1, 62, 58, 9, '#E3EFD6'),
      ], '#F6F8FB'),
    )
  }
  f.push(fl(0, 76, 240, 40, '#EFF3F7'), li(0, 76, 240, 76, LINIE, 0.8))
  // Haltestange oben, Schlaufen, senkrechte Stange
  f.push(rc(0, 16, 240, 3, '#C9D1DC', 0, 'none'))
  for (const x of [46, 128, 206]) f.push(li(x, 19, x, 28, LINIE2, 1), el(x, 36, 4.2, 8, 'none', LINIE2, 1.3))
  f.push(rc(120.5, 17, 4, 108, '#CBD3DE', 1, 'none'))
  // Sitze links und rechts am Rand
  for (const x of [-4, 216]) {
    f.push(rc(x + 8, 56, 22, 50, '#DCE4EF', 8), rc(x + 4, 100, 32, 9, '#CFDAE8', 4), li(x + 12, 64, x + 26, 64, LINIE, 0.8))
  }
  return f
}

function kueche(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 110, '#F8F2E6'), ...bodenFliesen(110, 240, 50, '#EBE1D1', [12, 28, 42])]
  // Fliesenspiegel
  f.push(fl(0, 44, 240, 32, '#FFFFFF'))
  for (let x = 0; x <= 240; x += 12) f.push(li(x, 44, x, 76, LINIE, 0.5))
  for (let y = 52; y < 76; y += 8) f.push(li(0, y, 240, y, LINIE, 0.5))
  // Oberschränke
  f.push(rc(6, 8, 96, 36, 'zart', 2), li(54, 8, 54, 44, LINIE), ci(50, 28, 1.6, '#FFFFFF', LINIE2, 0.8), ci(58, 28, 1.6, '#FFFFFF', LINIE2, 0.8))
  // Fenster mit Pflanze
  f.push(...fenster(138, 14, 66, 48, [fl(139, 44, 64, 17, GRUEN)]))
  f.push(rc(212, 8, 22, 36, 'zart', 2), ci(223, 30, 1.6, '#FFFFFF', LINIE2, 0.8))
  // Arbeitsplatte mit Unterschränken
  f.push(rc(0, 76, 240, 6, '#E9DBC3', 0), rc(0, 82, 240, 28, 'zart', 0))
  for (const x of [60, 120, 180]) f.push(li(x, 82, x, 110, LINIE))
  for (const x of [66, 126, 186, 54]) f.push(rc(x - 3, 88, 6, 2.4, '#FFFFFF', 1, LINIE2, 0.7))
  // Herd mit Topf links
  f.push(rc(10, 70, 40, 6, '#DCE2EA', 1), rc(14, 84, 32, 22, '#FFFFFF', 2, LINIE2, 0.9), ci(30, 95, 5, 'none', LINIE2, 0.9))
  f.push(rc(15, 56, 26, 14, '#E3E9F0', 3, LINIE2), rc(13, 52, 30, 5, '#D5DCE5', 2.5, LINIE2), li(10, 62, 15, 62, LINIE2, 1.6), li(41, 62, 46, 62, LINIE2, 1.6))
  f.push(pa('M24 46 Q20 41 24 36 Q28 31 24 26', 'none', LINIE, 1), pa('M33 46 Q29 41 33 36 Q37 31 33 26', 'none', LINIE, 1))
  // Schüssel rechts
  f.push(pa('M170 76 Q170 62 184 62 Q198 62 198 76 Z', '#FBEBD0', LINIE2, 0.9), ci(180, 66, 3, '#F3C9BC', 'none'), ci(188, 68, 3, '#CDE5BC', 'none'))
  return f
}

function kinderzimmer(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 110, '#F8F3EA'), fl(0, 100, 240, 10, '#EFE6D6'), ...bodenFliesen(110, 240, 50, '#EBDEC8', [12, 28, 42])]
  // Sterne an der Wand
  for (const [x, y, k] of [[20, 20, 1], [60, 32, 0.7], [112, 16, 0.8]] as const)
    f.push(pa(`M${x} ${y - 6 * k} L${x + 1.8 * k} ${y - 1.8 * k} L${x + 6 * k} ${y - 1.4 * k} L${x + 2.6 * k} ${y + 1.6 * k} L${x + 3.8 * k} ${y + 6 * k} L${x} ${y + 3.4 * k} L${x - 3.8 * k} ${y + 6 * k} L${x - 2.6 * k} ${y + 1.6 * k} L${x - 6 * k} ${y - 1.4 * k} L${x - 1.8 * k} ${y - 1.8 * k} Z`, '#FFF1C2', 'none'))
  // Bett links
  f.push(rc(4, 62, 7, 46, HOLZ2, 2), rc(8, 86, 88, 16, '#FFFFFF', 4), pa('M30 86 Q48 78 66 86 Q84 80 96 88 L96 102 L30 102 Z', 'mittel', LINIE, 1), el(26, 82, 14, 6, '#FFFFFF', LINIE))
  f.push(rc(8, 102, 88, 6, HOLZ, 1), rc(92, 78, 6, 30, HOLZ2, 2))
  // Fenster mit Vorhängen
  f.push(...fenster(112, 18, 44, 50, [fl(113, 54, 42, 13, GRUEN)]))
  f.push(pa('M108 14 L120 14 Q116 38 120 66 L108 66 Z', 'zart', LINIE, 0.9), pa('M160 14 L148 14 Q152 38 148 66 L160 66 Z', 'zart', LINIE, 0.9))
  // Regal rechts mit Bauklötzen und Büchern
  f.push(rc(172, 34, 62, 4, HOLZ2, 1), rc(172, 70, 62, 4, HOLZ2, 1))
  f.push(rc(178, 19, 14, 15, '#F6D3CF', 1.5), rc(194, 23, 11, 11, '#D5E6F5', 1.5), ci(216, 28, 6, '#FBE7B0'))
  for (const [i, c] of ['#D5E6F5', '#F6D3CF', '#DCEBCB', '#FBE7B0', '#E6DAF2'].entries()) f.push(rc(178 + i * 9.5, 52 + (i % 2) * 2, 8, 18 - (i % 2) * 2, c, 1))
  // Teppich
  f.push(el(150, 148, 62, 9, 'zart', LINIE, 0.9), el(150, 148, 46, 5.5, 'none', LINIE, 0.7))
  return f
}

function park(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 100, HIMMEL), ci(204, 26, 12, '#FDF1C8', 'none'), ...wolke(70, 22, 1), ...wolke(150, 40, 0.8)]
  f.push(pa('M0 92 Q50 60 110 82 Q170 62 240 86 L240 104 L0 104 Z', '#D3E8C2', 'none'))
  f.push(fl(0, 98, 240, 62, '#DDEFCB'))
  // Weg
  f.push(pa('M104 100 Q116 124 92 140 Q84 148 78 160 L158 160 Q148 142 138 124 Q130 108 134 100 Z', '#F3E8D2', 'none'))
  // Baum links, Büsche
  f.push(...baum(32, 50, 1))
  f.push(el(196, 100, 20, 9, GRUEN2, LINIE, 0.9), el(170, 99, 12, 6, GRUEN2, LINIE, 0.9))
  // Bank rechts
  f.push(rc(182, 94, 44, 4, HOLZ2, 1), rc(182, 102, 44, 4, HOLZ, 1), li(186, 106, 186, 118, LINIE2, 1.6), li(222, 106, 222, 118, LINIE2, 1.6), li(186, 94, 186, 102, LINIE2, 1.2), li(222, 94, 222, 102, LINIE2, 1.2))
  for (const [x, y, c] of [[14, 124, '#F6D2DA'], [54, 142, '#FDF1C8'], [90, 120, '#F6D2DA'], [160, 150, '#FDF1C8'], [206, 140, '#F6D2DA'], [228, 126, '#FDF1C8'], [40, 108, '#FDF1C8']] as const)
    f.push(ci(x, y, 2.2, c, 'none'), ci(x, y, 0.8, '#FFFFFF', 'none'))
  return f
}

function flur(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 108, '#F2EEE6'), { ...fl(0, 56, 240, 6, 'mittel'), o: 0.55 } as Form, ...bodenFliesen(108, 240, 52, '#E8EBF0', [14, 30, 46])]
  // Spinde links
  f.push(...spinde(0, 28, 17.5, 78, ['#D4DFEB', '#DEE7F1'], 6))
  // Aushang
  f.push(rc(118, 34, 40, 32, '#EBDDC0', 1.5, LINIE2), rc(123, 39, 12, 14, '#FBE3E0', 0, LINIE, 0.7), rc(139, 41, 13, 10, '#E3F0D8', 0, LINIE, 0.7), rc(127, 56, 20, 6, '#DDEAF8', 0, LINIE, 0.7))
  // Tür rechts
  f.push(rc(174, 24, 44, 84, '#E9D8BE', 2, LINIE2), rc(180, 32, 32, 28, HIMMEL, 1.5, LINIE2), rc(180, 66, 32, 36, '#EFE0C8', 1.5, LINIE, 0.8), ci(209, 86, 2, '#FFFFFF', LINIE2, 0.8))
  // Deckenlampe
  f.push(rc(84, 0, 40, 5, '#FFFFFF', 2, LINIE, 0.8))
  return f
}

function kantine(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 108, '#F8F3E8'), ...bodenFliesen(108, 240, 52, '#E9EDF2', [14, 30, 46])]
  // Fensterband
  f.push(rc(18, 10, 204, 36, HIMMEL, 2, LINIE2))
  for (let x = 18 + 34; x < 222; x += 34) f.push(li(x, 10, x, 46, LINIE2, 0.9))
  f.push(pa('M19 45 L19 38 Q50 30 90 37 T170 36 T221 39 L221 45 Z', GRUEN, 'none'))
  // Lampen
  for (const x of [50, 120, 190]) f.push(li(x, 0, x, 20, LINIE2, 0.9), pa(`M${x - 11} 32 Q${x - 8} 20 ${x} 20 Q${x + 8} 20 ${x + 11} 32 Z`, '#FBEBC4', LINIE2, 0.9))
  // Essensausgabe links
  f.push(rc(2, 80, 134, 28, 'zart', 0), rc(0, 74, 138, 7, '#DDE3EB', 1.5))
  f.push(po('6,50 130,50 134,74 2,74', '#FFFFFF', LINIE, 0.9), li(6, 56, 130, 56, LINIE, 0.6))
  for (const [x, c] of [[22, '#F5CDBE'], [52, '#FBE6A8'], [82, '#CFE6BC'], [110, '#F3D4C0']] as const) f.push(pa(`M${x - 10} 74 Q${x - 10} 62 ${x} 62 Q${x + 10} 62 ${x + 10} 74 Z`, c, LINIE2, 0.8))
  // Tabletts
  f.push(rc(140, 64, 16, 3, '#E0E6EE', 1), rc(140, 69, 16, 3, '#E0E6EE', 1), rc(140, 74, 16, 3, '#E0E6EE', 1))
  // Tisch mit Bänken rechts
  f.push(rc(160, 90, 76, 5, HOLZ, 1.5), li(166, 95, 166, 114, LINIE2, 1.6), li(230, 95, 230, 114, LINIE2, 1.6), rc(160, 104, 76, 4, HOLZ2, 1.5, LINIE, 0.9))
  f.push(rc(172, 85, 18, 5, '#FFFFFF', 1.5, LINIE2, 0.8), rc(200, 85, 18, 5, '#FFFFFF', 1.5, LINIE2, 0.8), ci(182, 84, 3, '#F5CDBE', 'none'), ci(209, 84, 3, '#CFE6BC', 'none'))
  return f
}

function umkleide(): Form[] {
  const f: Form[] = [fl(0, 0, 240, 108, '#F1F3F6'), ...bodenFliesen(108, 240, 52, '#E7EBF0', [14, 30, 46])]
  // Spinde über die ganze Wand
  f.push(...spinde(0, 18, 24, 88, ['#D4DFEB', '#DCE9E2', '#EDE4D4'], 10))
  // Bänke (nur Holzbänke), Tasche und Flasche
  f.push(rc(14, 100, 112, 5, HOLZ, 1.5), li(24, 105, 24, 122, LINIE2, 1.8), li(116, 105, 116, 122, LINIE2, 1.8))
  f.push(rc(150, 100, 80, 5, HOLZ, 1.5), li(158, 105, 158, 122, LINIE2, 1.8), li(222, 105, 222, 122, LINIE2, 1.8))
  f.push(rc(30, 86, 28, 14, 'mittel', 5, LINIE2, 0.9), pa('M36 86 Q44 76 52 86', 'none', LINIE2, 1.2))
  f.push(rc(190, 88, 7, 12, '#DDECF8', 2, LINIE2, 0.8), rc(191, 85, 5, 3, '#FFFFFF', 1, LINIE2, 0.7))
  f.push(pa('M92 100 Q98 94 106 98 L108 100 Z', '#F6D3CF', LINIE2, 0.8), pa('M100 124 Q104 119 112 122 L114 124 Z', '#DDEAF8', LINIE2, 0.8))
  return f
}

function chat(): Form[] {
  const f: Form[] = []
  // Handy
  f.push(rc(5, 2, 110, 156, '#F6F8FB', 14, '#8F99AA', 2.4))
  f.push(rc(11, 14, 98, 134, '#FFFFFF', 4, LINIE, 1))
  f.push(rc(46, 6.2, 28, 3.6, '#D5DBE5', 1.8, 'none'), ci(80, 8, 1.6, '#D5DBE5', 'none'))
  // Kopfzeile mit Bild und Namensstreifen (ohne Schrift)
  f.push(fl(11.5, 14.5, 97, 22, 'zart', 3), li(11, 37, 109, 37, LINIE, 0.9))
  f.push(ci(24, 26, 6.5, 'mittel', LINIE2, 1), rc(35, 22, 34, 4, '#DCE1E9', 2, 'none'), rc(35, 28.6, 20, 3, '#E7EAF0', 1.5, 'none'))
  // leere Sprechblasen mit Zipfel
  f.push(pa('M20 44 L76 44 Q80 44 80 48 L80 62 Q80 66 76 66 L26 66 L18 72 L19 64 Q16 63 16 60 L16 48 Q16 44 20 44 Z', '#EEF1F5', LINIE, 0.9))
  f.push(pa('M46 72 L100 72 Q104 72 104 76 L104 96 Q104 100 100 100 L102 106 L94 100 L46 100 Q42 100 42 96 L42 76 Q42 72 46 72 Z', 'zart', LINIE, 0.9))
  f.push(pa('M20 106 L68 106 Q72 106 72 110 L72 122 Q72 126 68 126 L26 126 L18 132 L19 124 Q16 123 16 120 L16 110 Q16 106 20 106 Z', '#EEF1F5', LINIE, 0.9))
  // Eingabezeile
  f.push(rc(16, 134, 66, 9, '#F1F3F7', 4.5, LINIE, 0.8), ci(95, 138.5, 5, 'mittel', LINIE2, 0.9))
  return f
}

const SZENEN_FORMEN: Record<SzenenName, () => Form[]> = { pausenhof, klassenzimmer, bus, kueche, kinderzimmer, park, flur, kantine, umkleide, chat }

/** Szene als Zeichnung. Unbekannte Namen ergeben eine leere Zeichnung (das Prüfskript meldet sie). */
export function szeneZeichnung(name: string): Zeichnung {
  if (!istSzene(name)) return { vb: [0, 0, 240, 160], formen: [] }
  const info = SZENEN[name]
  return { vb: [0, 0, info.b, info.h], formen: SZENEN_FORMEN[name](), w: 1 }
}

// --- Figuren in der Szene ------------------------------------------------------------------------------

export interface SzenenFigur {
  /** 'figur:mia:froh:winken' oder 'motiv:ball' */
  bild: string
  /** Mittelpunkt als Anteil der Szenenbreite (Standard: erste Figur 0.27, zweite 0.7) */
  x?: number
  /** Höhe als Anteil der Szenenhöhe (Standard: 0.66 bei Figuren) */
  hoehe?: number
  /** spiegeln (Blick nach links) */
  spiegeln?: boolean
}

function einzel(bild: string): Zeichnung {
  const [art, ...r] = bild.split(':')
  if (art === 'figur') return figurZeichnung(r[0] ?? 'mia', r[1], r[2])
  if (art === 'motiv') return motivZeichnung(r[0] ?? '')
  return { vb: [0, 0, 10, 10], formen: [] }
}

/** Trägt die Standard-Linienstärke der Zeichnung in alle Formen ein, die keine eigene haben (die Szene hat eine andere). */
function mitW(formen: Form[], w: number): Form[] {
  return formen.map((f) => (f.t === 'g' ? { ...f, formen: mitW(f.formen, w) } : f.w === undefined ? { ...f, w } : f))
}

/** Szene mit Figuren/Motiven davor als eine einzige Zeichnung. Figuren stehen mit den Füßen auf der Bodenlinie der Szene. */
export function szeneMitFiguren(name: string, figuren: SzenenFigur[]): Zeichnung {
  const sz = szeneZeichnung(name)
  if (!istSzene(name)) return sz
  const info = SZENEN[name]
  const [, , W, H] = sz.vb
  const boden = (info.boden ?? 0.825) * H
  const formen: Form[] = [...sz.formen]
  figuren.forEach((fg, i) => {
    const z = einzel(fg.bild)
    if (!z.formen.length) return
    const istFigur = fg.bild.startsWith('figur:')
    const x = (fg.x ?? info.figuren?.x[i] ?? 0.5) * W
    const hoehe = (fg.hoehe ?? (istFigur ? (info.figuren?.hoehe ?? 0.66) : 0.3)) * H
    const [vx, vy, vw, vh] = z.vb
    const s = hoehe / vh
    // Figuren: Füße bei y = 155 (Bodenschatten) des 160er-Rasters; Motive: Unterkante
    const unten = istFigur ? 155 : vy + vh
    const sp = fg.spiegeln ? -1 : 1
    const tx = x - sp * (vx + vw / 2) * s
    const ty = boden + 3 * s - unten * s
    formen.push({ t: 'g', tf: `translate(${+tx.toFixed(2)} ${+ty.toFixed(2)}) scale(${+(sp * s).toFixed(4)} ${+s.toFixed(4)})`, formen: mitW(z.formen, z.w ?? 2) })
  })
  return { ...sz, formen }
}
