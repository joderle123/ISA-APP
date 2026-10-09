// ---------------------------------------------------------------------------
// Spielschule (C1): Bausteine zum Tun für Seite 2 – Schneiden & Kleben, Memory,
// Labyrinth, Laufweg, Mini-Buch, Punkte verbinden, Klappbild, Fädelkarte,
// Bastelbogen, Suchbild, Anziehpuppe. Linien-Sprache auf allen Blättern gleich:
//   gestrichelt (grau)      = schneiden (Schere am Anfang)
//   Strich-Punkt (Farbe)    = falten
//   getönte Fläche + Stift  = kleben
// Bilder über dieselben Namen wie überall ('icon:', 'motiv:', 'gesicht:', 'figur:').
// ---------------------------------------------------------------------------

import { View, Text, Svg, G, Path, Rect, Circle, Line, Polyline, Ellipse, Text as SText } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Baustein, BildId } from '../typen'
import { bildZeichnung, iconZeichnung, NEUTRAL, type Zeichnung } from '../zeichnung'
import { Zeichnen, ZeichnungG } from './Zeichnen'
import { Bild, EIGENE_SYMBOLE, Fliess, Nummer, zumAusmalen, type Ctx } from './bausteine'
import { SCHRIFT, TEXTE, typo } from './stil'
import {
  FARBEN, MINIBUCH_LAGE, PUNKTE_FORMEN, punkteBeschriftung, bastelMasse, faedelLoecher, faedelMasse, faedelUmriss, hashText, klappMasse, labyrinth, labyrinthMasse,
  laufwegMasse, laufwegRaster, memoryMasse, mengenPunkte, minibuchMasse, mischen, punkteMasse, punkteVon, schneidenMasse, suchbildLage, suchbildMasse,
} from '../spielschule'
import { kleidungTeile, puppeZeichnung, schnittKontur, type Teil } from '../kleidung'

type B<A extends Baustein['art']> = Extract<Baustein, { art: A }>

const t = (c: Ctx, s: string | undefined) => (s ? typo(s, c.sprache) : '')
const tx = (c: Ctx) => TEXTE[c.sprache]

/** Schnittlinie: grau gestrichelt, gut sichtbar beim Kopieren. */
const SCHNITT = { farbe: NEUTRAL.leise, breite: 1.3, dash: '6 4' }
/** Faltlinie: Strich-Punkt in der Bereichsfarbe. */
const FALT = { dash: '9 3 2 3', breite: 1.2 }
const GOLD = '#F2C94C'
const GRUEN = '#5DAE6B'

/** Piktogramme für die Größe nachschärfen (wie im Baustein „Bild“). */
function bildZ(id: BildId, g: number, ausmalen = false): Zeichnung {
  let z = bildZeichnung(id)
  if (id.startsWith('icon:')) z = { ...z, w: Math.max(0.55, Math.min(1.7, (2.3 * 24) / g)) }
  return ausmalen ? zumAusmalen(z) : z
}

function Schere({ g = 14, c }: { g?: number; c: Ctx }) {
  return <Zeichnen z={iconZeichnung('scissors')} p={c.p} breite={g} />
}

/** Kopfzeile eines Schneidebereichs: Schere + gestrichelte Linie (+ Wort, klein). */
function Schneidekopf({ c, wort }: { c: Ctx; wort?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Schere c={c} />
      {wort ? <Text style={{ fontFamily: SCHRIFT.kind, fontSize: 11, color: NEUTRAL.leise, marginLeft: 5 }}>{wort}</Text> : null}
      <View style={{ flex: 1, marginLeft: 6, borderTopWidth: SCHNITT.breite, borderTopColor: SCHNITT.farbe, borderStyle: 'dashed' }} />
    </View>
  )
}

/** Legende unter Bastelblättern: Schere = schneiden, Strich-Punkt = falten, Fläche = kleben. */
function Legende({ c, falten, kleben }: { c: Ctx; falten?: boolean; kleben?: boolean }) {
  const T = tx(c)
  const wort = (s: string) => <Text style={{ fontFamily: SCHRIFT.kind, fontSize: 11, color: NEUTRAL.leise, marginLeft: 4, marginRight: 16 }}>{s}</Text>
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
      <Schere c={c} g={13} />
      <Svg width={26} height={6}>
        <Line x1={2} y1={3} x2={26} y2={3} stroke={SCHNITT.farbe} strokeWidth={SCHNITT.breite} strokeDasharray="4 3" />
      </Svg>
      {wort(T.schneidenWort)}
      {falten ? (
        <>
          <Svg width={30} height={6}>
            <Line x1={0} y1={3} x2={30} y2={3} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
          </Svg>
          {wort(T.faltenWort)}
        </>
      ) : null}
      {kleben ? (
        <>
          <View style={{ width: 22, height: 12, borderRadius: 3, backgroundColor: c.p.zart, borderWidth: 0.8, borderColor: c.p.mittel, alignItems: 'center', justifyContent: 'center' }}>
            <Zeichnen z={EIGENE_SYMBOLE.kleben} p={c.p} breite={10} />
          </View>
          {wort(T.klebenWort)}
        </>
      ) : null}
    </View>
  )
}

/** Getönte Klebefläche mit Klebestift (als Svg-Gruppe). */
function KlebeG({ c, x, y, b, h, rx = 6 }: { c: Ctx; x: number; y: number; b: number; h: number; rx?: number }) {
  const g = Math.min(h * 0.7, 20)
  return (
    <G>
      <Rect x={x} y={y} width={b} height={h} rx={rx} fill={c.p.zart} stroke={c.p.mittel} strokeWidth={1} />
      <ZeichnungG z={EIGENE_SYMBOLE.kleben} p={c.p} x={x + b / 2 - g / 2} y={y + h / 2 - g / 2} b={g} h={g} />
    </G>
  )
}

function SchereG({ c, x, y, g = 14, drehung = 0 }: { c: Ctx; x: number; y: number; g?: number; drehung?: number }) {
  return <ZeichnungG z={iconZeichnung('scissors')} p={c.p} x={x - g / 2} y={y - g / 2} b={g} h={g} drehung={drehung} />
}

/** Text im Svg, mittig. */
function TextG({ x, y, text, groesse = 12, fett, farbe, schrift }: { x: number; y: number; text: string; groesse?: number; fett?: boolean; farbe?: string; schrift?: string }) {
  return (
    <SText x={x} y={y} textAnchor="middle" fill={farbe ?? NEUTRAL.text} style={{ fontFamily: schrift ?? SCHRIFT.kind, fontSize: groesse, fontWeight: fett ? 700 : 400 }}>
      {text}
    </SText>
  )
}

/** Text auf Zeilen verteilen (Svg-Text bricht nicht um). */
function umbrechen(text: string, maxZeichen: number): string[] {
  const out: string[] = []
  let zeile = ''
  for (const w of text.split(/\s+/)) {
    if (zeile && (zeile + ' ' + w).length > maxZeichen) {
      out.push(zeile)
      zeile = w
    } else zeile = zeile ? zeile + ' ' + w : w
  }
  if (zeile) out.push(zeile)
  return out
}

// --- 1. Schneiden & Kleben ------------------------------------------------------------------------------

export function SchneidenKleben({ c, b }: { c: Ctx; b: B<'schneiden_kleben'> }) {
  const n = b.bilder.length
  const mitText = b.bilder.some((x) => x.text)
  const M = schneidenMasse(n, c.breite, mitText)
  const folge = b.gemischt === false ? b.bilder.map((_, i) => i) : mischen(n, hashText(b.bilder.map((x) => x.bild).join('|')))
  const ziele = Array.from({ length: n }, (_, i) => i)
  const zeilen = (liste: number[]) => Array.from({ length: M.zeilen }, (_, z) => liste.slice(z * M.spalten, (z + 1) * M.spalten))
  const textH = mitText ? 18 : 0
  return (
    <View>
      {zeilen(ziele).map((reihe, z) => (
        <View key={z} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
          {reihe.map((i, k) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: M.feld, height: M.feld + 10, borderRadius: 10, borderWidth: 1.4, borderColor: c.p.mittel, borderStyle: 'dashed', backgroundColor: c.p.zart, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ position: 'absolute', left: 6, top: 6, flexDirection: 'row', alignItems: 'center' }}>
                  <Nummer c={c} n={i + 1} d={26} />
                  <Svg width={30} height={14} style={{ marginLeft: 4 }}>
                    {mengenPunkte(i + 1).map(([px, py], j) => (
                      <Circle key={j} cx={15 + px * 5.5 * (i + 1 > 6 ? 1.6 : 1)} cy={7 + py * 4.5} r={2} fill={c.p.tief} />
                    ))}
                  </Svg>
                </View>
                <View style={{ opacity: 0.4 }}>
                  <Zeichnen z={EIGENE_SYMBOLE.kleben} p={c.p} breite={Math.min(34, M.feld * 0.3)} />
                </View>
              </View>
              {k < reihe.length - 1 ? (
                <Svg width={M.luecke} height={16} viewBox="0 0 24 16">
                  <Path d="M3 8 L19 8 M14 3 L20 8 L14 13" stroke={c.p.tief} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </Svg>
              ) : null}
            </View>
          ))}
        </View>
      ))}
      <View style={{ marginTop: 8 }}>
        <Schneidekopf c={c} />
        {zeilen(folge).map((reihe, z) => (
          <View key={z} style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {reihe.map((i, k) => {
              const x = b.bilder[i]
              const g = M.karte * 0.74
              return (
                <View key={k} style={{ width: M.karte, height: M.karte + textH, borderWidth: SCHNITT.breite, borderColor: SCHNITT.farbe, borderStyle: 'dashed', marginLeft: k ? -SCHNITT.breite : 0, marginTop: z ? -SCHNITT.breite : 0, alignItems: 'center', justifyContent: 'center' }}>
                  <Bild c={c} id={x.bild} breite={g} hoehe={g} />
                  {x.text ? (
                    <Fliess c={c} zentriert groesse={13} style={{ marginTop: 2 }}>
                      {t(c, x.text)}
                    </Fliess>
                  ) : null}
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

// --- 2. Memory ---------------------------------------------------------------------------------------------

function Muster({ c, b, h }: { c: Ctx; b: number; h: number }) {
  const s = 16
  const pkt: [number, number][] = []
  for (let y = s / 2; y < h; y += s) for (let x = ((y / s) % 2 ? s : s / 2); x < b; x += s) pkt.push([x, y])
  return (
    <Svg width={b} height={h}>
      <Rect x={0} y={0} width={b} height={h} fill={c.p.zart} />
      {pkt.map(([x, y], i) => (
        <Circle key={i} cx={x} cy={y} r={2.6} fill={c.p.mittel} />
      ))}
    </Svg>
  )
}

export function Memory({ c, b }: { c: Ctx; b: B<'memory'> }) {
  const mitText = b.bilder.some((x) => x.text)
  const rueck = !!b.rueckseite && b.bilder.length <= 6
  const M = memoryMasse(b.bilder.length, c.breite, rueck, mitText)
  const karten = b.bilder.flatMap((x) => [{ bild: x.bild, text: x.text }, { bild: x.paar ?? x.bild, text: x.text }])
  const W = 1.8
  // Karten mischen, bis kein Paar waagrecht oder senkrecht nebeneinander liegt
  const nachbarn = (f: number[]) =>
    f.some((k, i) => {
      const paar = (j: number) => j >= 0 && j < f.length && Math.floor(f[j] / 2) === Math.floor(k / 2)
      return ((i + 1) % M.spalten !== 0 && paar(i + 1)) || paar(i + M.spalten)
    })
  const basis = hashText(karten.map((k) => k.bild).join('|'))
  let folge = mischen(karten.length, basis)
  for (let v = 1; v < 60 && nachbarn(folge); v++) folge = mischen(karten.length, basis + v)
  const kb = (c.breite + (M.spalten - 1) * W) / M.spalten - 0.2
  const raster = (inhalt: (i: number) => ReactNode, anzahl: number) => (
    <View>
      {Array.from({ length: Math.ceil(anzahl / M.spalten) }, (_, z) => (
        <View key={z} style={{ flexDirection: 'row' }}>
          {Array.from({ length: Math.min(M.spalten, anzahl - z * M.spalten) }, (_, s) => (
            <View key={s} style={{ width: kb, height: M.kh, borderWidth: W, borderColor: SCHNITT.farbe, borderStyle: 'dashed', marginLeft: s ? -W : 0, marginTop: z ? -W : 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {inhalt(z * M.spalten + s)}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
  const g = Math.min(kb, M.kh - (mitText ? 18 : 0)) * 0.7
  return (
    <View>
      <Schneidekopf c={c} />
      {raster((i) => {
        const k = karten[folge[i]]
        return (
          <>
            <Bild c={c} id={k.bild} breite={g} hoehe={g} />
            {k.text ? (
              <Fliess c={c} zentriert groesse={12.5} style={{ marginTop: 2 }}>
                {t(c, k.text)}
              </Fliess>
            ) : null}
          </>
        )
      }, karten.length)}
      {rueck ? (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 30 }}>
            <Svg width={c.breite - 80} height={8}>
              <Line x1={0} y1={4} x2={c.breite - 80} y2={4} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
            </Svg>
            <Text style={{ fontFamily: SCHRIFT.kind, fontSize: 11, color: c.p.tief, marginLeft: 8 }}>{tx(c).faltenWort}</Text>
          </View>
          {raster(() => <Muster c={c} b={kb - 2 * W} h={M.kh - 2 * W} />, karten.length)}
        </>
      ) : null}
      <Legende c={c} falten={rueck} />
    </View>
  )
}

// --- 3. Labyrinth --------------------------------------------------------------------------------------------

export function Labyrinth({ c, b }: { c: Ctx; b: B<'labyrinth'> }) {
  const stufe = b.stufe ?? 1
  const L = labyrinth(stufe, b.seed ?? hashText(b.start + '>' + b.ziel + stufe))
  const M = labyrinthMasse(stufe, c.breite)
  const z = M.zelle
  const x0 = M.rand
  const y0 = 8
  const W = Math.max(4, z * 0.1)
  const linien: [number, number, number, number][] = []
  linien.push([x0, y0, x0 + L.spalten * z, y0])
  for (let r = 0; r < L.zeilen; r++) {
    if (r !== L.eingang) linien.push([x0, y0 + r * z, x0, y0 + (r + 1) * z])
    for (let s = 0; s < L.spalten; s++) {
      const rechtsAussen = s === L.spalten - 1
      if (L.rechts[r][s] && !(rechtsAussen && r === L.ausgang)) linien.push([x0 + (s + 1) * z, y0 + r * z, x0 + (s + 1) * z, y0 + (r + 1) * z])
      if (L.unten[r][s]) linien.push([x0 + s * z, y0 + (r + 1) * z, x0 + (s + 1) * z, y0 + (r + 1) * z])
    }
  }
  const d = Math.min(M.rand - 10, 74)
  const ey = y0 + (L.eingang + 0.5) * z
  const ay = y0 + (L.ausgang + 0.5) * z
  const xs = M.rand / 2 - 4
  const xz = c.breite - M.rand / 2 + 4
  const ende = (x: number, y: number, id: BildId, ring: string, wort: string) => (
    <G>
      <Circle cx={x} cy={y} r={d / 2} fill="#FFFFFF" stroke={ring} strokeWidth={3} />
      <ZeichnungG z={bildZ(id, d * 0.66)} p={c.p} x={x - d * 0.33} y={y - d * 0.33} b={d * 0.66} h={d * 0.66} />
      <TextG x={x} y={y + d / 2 + 13 <= M.H + 8 ? y + d / 2 + 13 : y - d / 2 - 5} text={wort} groesse={11} farbe={NEUTRAL.leise} />
    </G>
  )
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={c.breite} height={M.H + 10}>
        <Rect x={x0} y={y0} width={L.spalten * z} height={L.zeilen * z} fill={c.p.zart} />
        {/* Zugänge: Gang zum Start- und Zielbild */}
        <Rect x={xs + d / 2 - 2} y={ey - z * 0.3} width={x0 - xs - d / 2 + 2} height={z * 0.6} fill={c.p.zart} />
        <Rect x={x0 + L.spalten * z} y={ay - z * 0.3} width={xz - d / 2 - x0 - L.spalten * z + 2} height={z * 0.6} fill={c.p.zart} />
        {linien.map(([a, bb, cc, dd], i) => (
          <Line key={i} x1={a} y1={bb} x2={cc} y2={dd} stroke={NEUTRAL.tinte} strokeWidth={W} strokeLinecap="round" />
        ))}
        <Circle cx={x0 + z * 0.22} cy={ey} r={Math.max(4, z * 0.08)} fill={GRUEN} />
        {ende(xs, ey, b.start, GRUEN, tx(c).start)}
        {ende(xz, ay, b.ziel, GOLD, tx(c).spielziel)}
      </Svg>
    </View>
  )
}

// --- 4. Laufweg ------------------------------------------------------------------------------------------------

function Wuerfel({ g, augen = 5 }: { g: number; augen?: number }) {
  const P: Record<number, [number, number][]> = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }
  return (
    <Svg width={g} height={g} viewBox="0 0 40 40">
      <Rect x={2} y={2} width={36} height={36} rx={8} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={2.4} />
      {P[augen].map(([x, y], i) => (
        <Circle key={i} cx={20 + x * 9.5} cy={20 + y * 9.5} r={3.6} fill={NEUTRAL.tinte} />
      ))}
    </Svg>
  )
}

export function Laufweg({ c, b }: { c: Ctx; b: B<'laufweg'> }) {
  const R = laufwegRaster(b.felder.length, c.breite)
  const M = laufwegMasse(b.felder.length, c.breite)
  const f = R.feld
  const gesamtB = R.spalten * f + (R.spalten - 1) * R.luecke
  const ox = (c.breite - gesamtB) / 2
  const pos = R.lage.map(({ s, z }) => [ox + s * (f + R.luecke), 4 + z * (f + R.luecke)] as [number, number])
  const mitte = pos.map(([x, y]) => `${x + f / 2},${y + f / 2}`).join(' ')
  const N = b.felder.length + 2
  const T = tx(c)
  const figuren = b.figuren?.length ? b.figuren : ['figur:mia:froh', 'figur:noah:froh', 'figur:lea:froh', 'figur:sami:froh']
  const fg = 64
  return (
    <View>
      <Svg width={c.breite} height={M.wegH}>
        <Polyline points={mitte} fill="none" stroke={c.p.mittel} strokeWidth={f * 0.42 + 4} strokeLinejoin="round" strokeLinecap="round" />
        <Polyline points={mitte} fill="none" stroke={c.p.zart} strokeWidth={f * 0.42} strokeLinejoin="round" strokeLinecap="round" />
        {pos.map(([x, y], i) => {
          const start = i === 0
          const ziel = i === N - 1
          const feld = !start && !ziel ? b.felder[i - 1] : undefined
          const rand = start ? GRUEN : ziel ? '#C9A227' : NEUTRAL.tinte
          const fuell = start ? '#E4F2E6' : ziel ? '#FBF0C9' : '#FFFFFF'
          const bild = start ? (b.start ?? 'icon:flag') : ziel ? (b.ziel ?? 'icon:star') : feld?.bild
          const wort = start ? T.start : ziel ? T.spielziel : t(c, feld?.text)
          // nur ein Wort (Handlung): groß und mittig im Feld
          const nurText = !bild && !!wort
          const zg = nurText ? 14 : start || ziel ? 12.5 : 11.5
          const zeilen = wort ? umbrechen(wort, Math.max(6, Math.floor((f - 10) / (zg * 0.56)))) : []
          const textH = zeilen.length * (zg + 1.5)
          const g = bild ? Math.min(f * 0.7, f - 14 - textH) : 0
          return (
            <G key={i}>
              <Rect x={x} y={y} width={f} height={f} rx={f * 0.16} fill={fuell} stroke={rand} strokeWidth={start || ziel ? 2.6 : 1.8} />
              {bild ? <ZeichnungG z={bildZ(bild, g)} p={c.p} x={x + (f - g) / 2} y={y + 6 + (f - 12 - textH - g) / 2} b={g} h={g} /> : null}
              {zeilen.map((zl, k) => (
                <TextG key={k} x={x + f / 2} y={nurText ? y + f / 2 + zg * 0.35 + (k - (zeilen.length - 1) / 2) * (zg + 1.5) : y + f - 7 - (zeilen.length - 1 - k) * (zg + 1.5)} text={zl} groesse={zg} fett={start || ziel || nurText} />
              ))}
            </G>
          )
        })}
      </Svg>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 12 }}>
        <View style={{ width: 150, flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Wuerfel g={34} />
          <Text style={{ fontFamily: SCHRIFT.kind, fontSize: 12, color: NEUTRAL.text, marginLeft: 8, flex: 1 }}>{T.wuerfeln}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Schneidekopf c={c} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {figuren.slice(0, 6).map((id, i) => (
              <View key={i} style={{ width: fg, height: fg + 10, borderWidth: SCHNITT.breite, borderColor: SCHNITT.farbe, borderStyle: 'dashed', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <Bild c={c} id={id} hoehe={fg} breite={fg * 0.8} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

// --- 5. Mini-Buch ----------------------------------------------------------------------------------------------

export function Minibuch({ c, b }: { c: Ctx; b: B<'minibuch'> }) {
  const M = minibuchMasse(c.breite)
  const { fb, fh } = M
  const T = tx(c)
  const W = 4 * fh
  // Inhalt einer Seite im eigenen Koordinatensystem: Breite fh (kurze Seite), Höhe fb (lange Seite), Mitte = 0,0
  const seite = (nr: number) => {
    const w = fh
    const h = fb
    const rand = 10
    if (nr === 1) {
      const zeilen = umbrechen(t(c, b.titel), Math.floor((w - 2 * rand) / 9.6))
      const g = Math.min(w - 2 * rand - 10, h - 2 * rand - zeilen.length * 20 - 16)
      return (
        <G>
          <Rect x={-w / 2 + 5} y={-h / 2 + 5} width={w - 10} height={h - 10} rx={8} fill={c.p.zart} stroke={c.p.mittel} strokeWidth={1} />
          {zeilen.map((z, i) => (
            <TextG key={i} x={0} y={-h / 2 + rand + 18 + i * 20} text={z} groesse={17} fett schrift={SCHRIFT.titel} farbe={c.p.tief} />
          ))}
          {b.titelbild ? <ZeichnungG z={bildZ(b.titelbild, g)} p={c.p} x={-g / 2} y={-h / 2 + rand + zeilen.length * 20 + 14 + (h - 2 * rand - zeilen.length * 20 - 14 - g) / 2} b={g} h={g} /> : null}
        </G>
      )
    }
    if (nr === 8) {
      return (
        <G>
          <TextG x={0} y={-h / 2 + 40} text={T.buchVon} groesse={13} farbe={NEUTRAL.leise} />
          <Line x1={-w / 2 + 16} y1={-h / 2 + 76} x2={w / 2 - 16} y2={-h / 2 + 76} stroke={NEUTRAL.linie} strokeWidth={0.9} />
          <Rect x={-17} y={-h / 2 + 94} width={34} height={34} rx={5} fill="#FFFFFF" stroke={c.p.mittel} strokeWidth={1.1} strokeDasharray="3 2" />
          <TextG x={0} y={-h / 2 + 142} text={T.meinZeichen} groesse={9} farbe={NEUTRAL.sehrLeise} schrift={SCHRIFT.jugend} />
          <TextG x={0} y={h / 2 - 22} text={T.ende} groesse={15} fett schrift={SCHRIFT.titel} farbe={c.p.tief} />
        </G>
      )
    }
    const s = b.seiten[nr - 2]
    const wort = s?.text ? t(c, s.text) : ''
    const textH = wort ? 22 : 0
    const g = Math.min(w - 2 * rand, h - 2 * rand - textH - 12)
    return (
      <G>
        {s?.bild ? (
          <ZeichnungG z={bildZ(s.bild, g)} p={c.p} x={-g / 2} y={-h / 2 + rand + (h - 2 * rand - textH - 12 - g) / 2} b={g} h={g} />
        ) : (
          <Rect x={-w / 2 + rand} y={-h / 2 + rand} width={w - 2 * rand} height={h - 2 * rand - textH - 12} rx={8} fill="none" stroke={c.p.mittel} strokeWidth={1.2} strokeDasharray="4 3" />
        )}
        {wort ? <TextG x={0} y={h / 2 - rand - 14} text={wort} groesse={14} fett /> : null}
        <TextG x={w / 2 - 12} y={h / 2 - 6} text={String(nr)} groesse={8} farbe={NEUTRAL.sehrLeise} schrift={SCHRIFT.jugend} />
      </G>
    )
  }
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={c.breite} height={W + 4}>
        {MINIBUCH_LAGE.map((l) => (
          <G key={l.seite} transform={`translate(${l.spalte * fb + fb / 2} ${2 + l.zeile * fh + fh / 2}) rotate(${l.drehung})`}>{seite(l.seite)}</G>
        ))}
        {/* Faltlinien: Mitte senkrecht oben und unten, waagrecht zwischen den Zeilen */}
        {[1, 2, 3].map((z) => (
          <Line key={z} x1={0} y1={2 + z * fh} x2={c.breite} y2={2 + z * fh} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
        ))}
        <Line x1={fb} y1={2} x2={fb} y2={2 + fh} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
        <Line x1={fb} y1={2 + 3 * fh} x2={fb} y2={2 + 4 * fh} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
        {/* Schnitt in der Mitte über die beiden mittleren Felder */}
        <Line x1={fb} y1={2 + fh} x2={fb} y2={2 + 3 * fh} stroke={NEUTRAL.tinte} strokeWidth={2} strokeDasharray="7 4" />
        <Rect x={fb - 9} y={2 + fh + 2} width={18} height={18} rx={9} fill="#FFFFFF" />
        <SchereG c={c} x={fb} y={2 + fh + 11} g={15} drehung={90} />
        {/* Außenrand: ausschneiden */}
        <Rect x={0.8} y={2} width={c.breite - 1.6} height={W} fill="none" stroke={SCHNITT.farbe} strokeWidth={SCHNITT.breite} strokeDasharray={SCHNITT.dash} />
      </Svg>
      <Legende c={c} falten />
    </View>
  )
}

// --- 6. Punkte verbinden --------------------------------------------------------------------------------------

export function PunkteVerbinden({ c, b }: { c: Ctx; b: B<'punkte_verbinden'> }) {
  const pkt = punkteVon(b)
  const deko = b.punkte?.length ? [] : (PUNKTE_FORMEN[b.form ?? 'stern']?.deko ?? [])
  const M = punkteMasse(c.breite, !!b.gruppen)
  const k = M.S / 100
  const ox = (c.breite - M.S) / 2
  const oy = M.rand
  const P = (p: [number, number]) => [ox + p[0] * k, oy + p[1] * k] as [number, number]
  const lage = punkteBeschriftung(pkt, deko, k, !!b.gruppen)
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={c.breite} height={M.H}>
        <G transform={`translate(${ox} ${oy}) scale(${k})`}>
          {deko.map((d, i) => (
            <Path key={i} d={d} fill="none" stroke="#9AA2B1" strokeWidth={1.8 / k} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </G>
        {pkt.map((p, i) => {
          const [x, y] = P(p)
          const [nx, ny] = P(lage[i].zahl)
          const [gx0, gy0] = P(lage[i].gruppe)
          return (
            <G key={i}>
              {i === 0 ? <Circle cx={x} cy={y} r={10} fill="#E4F2E6" stroke={GRUEN} strokeWidth={2} /> : null}
              <Circle cx={x} cy={y} r={5} fill={NEUTRAL.tinte} />
              <TextG x={nx} y={ny + 7} text={String(i + 1)} groesse={21} fett farbe={i === 0 ? '#2F6B3A' : NEUTRAL.text} />
              {b.gruppen
                ? mengenPunkte(i + 1).map(([gx, gy], j) => (
                    <Circle key={j} cx={gx0 + gx * 7.8} cy={gy0 + gy * 7.8} r={2.6} fill={c.p.tief} />
                  ))
                : null}
            </G>
          )
        })}
      </Svg>
    </View>
  )
}

// --- 7. Klappbild ----------------------------------------------------------------------------------------------

export function Klappbild({ c, b }: { c: Ctx; b: B<'klappbild'> }) {
  const n = b.bilder.length
  const M = klappMasse(n, c.breite)
  const { s, lasche, luecke } = M
  const zeilen = Array.from({ length: M.zeilen }, (_, z) => b.bilder.map((_, i) => i).slice(z * M.spalten, (z + 1) * M.spalten))
  const klappe = (x: number, y: number) => (
    <G>
      {b.klappe ? (
        <ZeichnungG z={bildZ(b.klappe, s * 0.7)} p={c.p} x={x + s * 0.15} y={y + s * 0.15} b={s * 0.7} h={s * 0.7} />
      ) : (
        <TextG x={x + s / 2} y={y + s / 2 + s * 0.16} text="?" groesse={s * 0.48} fett schrift={SCHRIFT.titel} farbe={c.p.mittel} />
      )}
    </G>
  )
  const breiteReihe = (k: number) => k * s + (k - 1) * luecke
  return (
    <View>
      {/* Fenster mit Bild, darüber der Klebestreifen für die Lasche */}
      {zeilen.map((reihe, z) => (
        <Svg key={z} width={c.breite} height={s + lasche + 12}>
          {reihe.map((i, k) => {
            const x = (c.breite - breiteReihe(reihe.length)) / 2 + k * (s + luecke)
            const g = s * 0.72
            return (
              <G key={i}>
                <KlebeG c={c} x={x} y={0} b={s} h={lasche - 3} rx={4} />
                <Rect x={x} y={lasche} width={s} height={s} rx={6} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={1.6} />
                <ZeichnungG z={bildZ(b.bilder[i].bild, g)} p={c.p} x={x + (s - g) / 2} y={lasche + (s - g) / 2} b={g} h={g} />
              </G>
            )
          })}
        </Svg>
      ))}
      <View style={{ marginTop: 6 }}>
        <Schneidekopf c={c} />
        {zeilen.map((reihe, z) => (
          <Svg key={z} width={c.breite} height={s + lasche + 12}>
            {reihe.map((i, k) => {
              const x = (c.breite - breiteReihe(reihe.length)) / 2 + k * (s + luecke)
              const y = 2
              return (
                <G key={i}>
                  <Rect x={x} y={y} width={s} height={lasche} fill={c.p.zart} />
                  <ZeichnungG z={EIGENE_SYMBOLE.kleben} p={c.p} x={x + s / 2 - 8} y={y + lasche / 2 - 8} b={16} h={16} />
                  <Rect x={x} y={y + lasche} width={s} height={s} fill="#FFFFFF" />
                  {klappe(x, y + lasche)}
                  <Line x1={x} y1={y + lasche} x2={x + s} y2={y + lasche} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
                  <Rect x={x} y={y} width={s} height={s + lasche} rx={4} fill="none" stroke={SCHNITT.farbe} strokeWidth={SCHNITT.breite} strokeDasharray={SCHNITT.dash} />
                </G>
              )
            })}
          </Svg>
        ))}
      </View>
      <Legende c={c} falten kleben />
    </View>
  )
}

// --- 8. Fädelkarte ---------------------------------------------------------------------------------------------

export function Faedelkarte({ c, b }: { c: Ctx; b: B<'faedelkarte'> }) {
  const form = b.form ?? 'kreis'
  const M = faedelMasse(c.breite)
  const S = M.S
  const k = S / 100
  const ox = (c.breite - S) / 2
  const umriss = faedelUmriss(form)
  const n = b.loecher ?? (form === 'stern' ? 20 : 16)
  const loecher = faedelLoecher(form, n, 8)
  const pfad = umriss.map(([x, y], i) => `${i ? 'L' : 'M'}${(ox + x * k).toFixed(1)} ${(4 + y * k).toFixed(1)}`).join(' ') + ' Z'
  const g = S * (form === 'stern' ? 0.34 : form === 'herz' ? 0.32 : form === 'oval' ? 0.4 : 0.48)
  const ym = 4 + (form === 'stern' ? 56 : form === 'herz' ? 50 : 50) * k
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={c.breite} height={M.H}>
        <Path d={pfad} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={1.6} strokeDasharray="7 4" strokeLinejoin="round" />
        {b.bild ? <ZeichnungG z={bildZ(b.bild, g, b.ausmalen)} p={c.p} x={c.breite / 2 - g / 2} y={ym - g / 2} b={g} h={g} /> : null}
        {loecher.map(([x, y], i) => {
          const px = ox + x * k
          const py = 4 + y * k
          return (
            <G key={i}>
              {i === 0 ? <Circle cx={px} cy={py} r={12} fill="#E4F2E6" stroke={GRUEN} strokeWidth={2} /> : null}
              <Circle cx={px} cy={py} r={7} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={1.5} />
              <Line x1={px - 3} y1={py} x2={px + 3} y2={py} stroke={NEUTRAL.tinte} strokeWidth={0.9} />
              <Line x1={px} y1={py - 3} x2={px} y2={py + 3} stroke={NEUTRAL.tinte} strokeWidth={0.9} />
            </G>
          )
        })}
      </Svg>
      <Legende c={c} />
    </View>
  )
}

// --- 9. Bastelbogen --------------------------------------------------------------------------------------------

/** Ohren (Katze, Hase, Bär, Maus) auf einer Grundlinie bei (x, y), Größe e; `spiegel` für das rechte Ohr. */
/** Ohren (Katze, Hase, Bär, Maus) auf einer Grundlinie bei (x, y), höchstens `e` hoch; `spiegel` für das rechte Ohr.
 *  `teil`: 'umriss' (gestrichelte Schnittlinie, dicker) und danach 'flaeche' (weiß + Innenohr) – so verschwindet die
 *  Linie dort, wo das Ohr auf Band oder Maske liegt. */
function Ohr({ art, x, y, e, spiegel, teil }: { art: 'katze' | 'hase' | 'baer' | 'maus'; x: number; y: number; e: number; spiegel?: boolean; teil: 'umriss' | 'flaeche' }) {
  const sx = spiegel ? -1 : 1
  const rosa = '#F6D3DE'
  const stil = teil === 'umriss' ? { fill: '#FFFFFF', stroke: NEUTRAL.tinte, strokeWidth: 2.6, strokeDasharray: SCHNITT.dash } : { fill: '#FFFFFF' }
  const innen = teil === 'flaeche'
  switch (art) {
    case 'katze':
      return (
        <G>
          <Path d={`M${x - sx * 0.5 * e} ${y + 0.12 * e} L${x - sx * 0.2 * e} ${y - 0.9 * e} L${x + sx * 0.42 * e} ${y + 0.12 * e} Z`} {...stil} />
          {innen ? <Path d={`M${x - sx * 0.3 * e} ${y + 0.02 * e} L${x - sx * 0.18 * e} ${y - 0.56 * e} L${x + sx * 0.2 * e} ${y + 0.02 * e} Z`} fill={rosa} /> : null}
        </G>
      )
    case 'hase':
      return (
        <G>
          <Ellipse cx={x} cy={y - 0.4 * e} rx={0.17 * e} ry={0.5 * e} {...stil} />
          {innen ? <Ellipse cx={x} cy={y - 0.42 * e} rx={0.08 * e} ry={0.36 * e} fill={rosa} /> : null}
        </G>
      )
    case 'baer':
      return (
        <G>
          <Circle cx={x} cy={y - 0.2 * e} r={0.34 * e} {...stil} />
          {innen ? <Circle cx={x} cy={y - 0.22 * e} r={0.19 * e} fill="#E7D3BE" /> : null}
        </G>
      )
    default:
      return (
        <G>
          <Circle cx={x} cy={y - 0.42 * e} r={0.46 * e} {...stil} />
          {innen ? <Circle cx={x} cy={y - 0.42 * e} r={0.3 * e} fill={rosa} /> : null}
        </G>
      )
  }
}

/** Streifen zum Verlängern (Krone, Stirnband): Klebefläche an einem Ende. */
function Streifen({ c, n, h }: { c: Ctx; n: number; h: number }) {
  return (
    <View>
      {Array.from({ length: n }, (_, i) => (
        <Svg key={i} width={c.breite} height={h + 14}>
          <KlebeG c={c} x={2} y={2} b={34} h={h} rx={2} />
          <Rect x={1} y={1} width={c.breite - 2} height={h + 2} fill="none" stroke={SCHNITT.farbe} strokeWidth={SCHNITT.breite} strokeDasharray={SCHNITT.dash} />
        </Svg>
      ))}
    </View>
  )
}

export function Bastelbogen({ c, b }: { c: Ctx; b: B<'bastelbogen'> }) {
  const W = c.breite
  const rand = { stroke: NEUTRAL.tinte, strokeWidth: 1.6, strokeDasharray: SCHNITT.dash }
  if (b.vorlage === 'maske') {
    const mw = W * 0.92
    const k = mw / 200
    const oh = b.ohren ? W * 0.22 : 0
    const ox = (W - mw) / 2
    const oy = oh + 6
    const H = bastelMasse('maske', W, !!b.ohren).H
    const p = (x: number, y: number) => `${(ox + x * k).toFixed(1)} ${(oy + y * k).toFixed(1)}`
    const maske = `M${p(4, 40)} C${p(4, 14)} ${p(30, 6)} ${p(64, 8)} C${p(84, 9)} ${p(94, 16)} ${p(100, 22)} C${p(106, 16)} ${p(116, 9)} ${p(136, 8)} C${p(170, 6)} ${p(196, 14)} ${p(196, 40)} C${p(196, 64)} ${p(170, 84)} ${p(138, 82)} C${p(118, 81)} ${p(108, 70)} ${p(100, 60)} C${p(92, 70)} ${p(82, 81)} ${p(62, 82)} C${p(30, 84)} ${p(4, 64)} ${p(4, 40)} Z`
    return (
      <View>
        <Svg width={W} height={H - 22}>
          {/* erst alle Umrisse, dann alle Flächen: es bleibt nur die äußere Schnittlinie */}
          {b.ohren ? (
            <>
              <Ohr art={b.ohren} x={ox + 46 * k} y={oy + 14 * k} e={oh} teil="umriss" />
              <Ohr art={b.ohren} x={ox + 154 * k} y={oy + 14 * k} e={oh} spiegel teil="umriss" />
            </>
          ) : null}
          <Path d={maske} fill="#FFFFFF" {...rand} strokeWidth={2.6} />
          {b.ohren ? (
            <>
              <Ohr art={b.ohren} x={ox + 46 * k} y={oy + 14 * k} e={oh} teil="flaeche" />
              <Ohr art={b.ohren} x={ox + 154 * k} y={oy + 14 * k} e={oh} spiegel teil="flaeche" />
            </>
          ) : null}
          <Path d={maske} fill="#FFFFFF" />
          {[62, 138].map((x) => (
            <G key={x}>
              <Ellipse cx={ox + x * k} cy={oy + 42 * k} rx={22 * k} ry={15 * k} fill="#F4F6F9" stroke={NEUTRAL.tinte} strokeWidth={1.4} strokeDasharray="4 3" />
              <SchereG c={c} x={ox + x * k} y={oy + 42 * k} g={16} />
            </G>
          ))}
          {[12, 188].map((x) => (
            <G key={x}>
              <Circle cx={ox + x * k} cy={oy + 40 * k} r={5} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={1.2} />
              <Line x1={ox + x * k - 2.5} y1={oy + 40 * k} x2={ox + x * k + 2.5} y2={oy + 40 * k} stroke={NEUTRAL.tinte} strokeWidth={0.8} />
            </G>
          ))}
          <TextG x={ox + 62 * k} y={oy + 68 * k} text={tx(c).erwachsene} groesse={9} farbe={NEUTRAL.leise} schrift={SCHRIFT.jugend} />
        </Svg>
        <Legende c={c} />
      </View>
    )
  }
  if (b.vorlage === 'krone' || b.vorlage === 'stirnband') {
    const krone = b.vorlage === 'krone'
    const bandH = krone ? 58 : 66
    const obenH = krone ? 96 : b.ohren ? 100 : b.bild ? 96 : 0
    const H = obenH + bandH + 8
    const y1 = obenH + 4
    const zacken = 5
    let form = ''
    if (krone) {
      const zb = (W - 4) / zacken
      form = `M2 ${y1 + bandH} L2 ${y1}` + Array.from({ length: zacken }, (_, i) => ` L${2 + zb * (i + 0.5)} 14 L${2 + zb * (i + 1)} ${y1}`).join('') + ` L${W - 2} ${y1 + bandH} Z`
    }
    const g = 84
    return (
      <View>
        <Svg width={W} height={H}>
          {/* erst alle Umrisse, dann alle Flächen: nur die äußere Schnittlinie bleibt */}
          {!krone && b.ohren ? (
            <>
              <Ohr art={b.ohren} x={W * 0.34} y={y1 + 6} e={obenH} teil="umriss" />
              <Ohr art={b.ohren} x={W * 0.66} y={y1 + 6} e={obenH} spiegel teil="umriss" />
            </>
          ) : null}
          {!krone && !b.ohren && b.bild ? <Circle cx={W / 2} cy={y1 - g / 2 + 14} r={g / 2 + 6} fill="#FFFFFF" {...rand} strokeWidth={2.6} /> : null}
          {krone ? <Path d={form} fill="#FFFFFF" {...rand} strokeLinejoin="round" /> : <Rect x={2} y={y1} width={W - 4} height={bandH} rx={4} fill="#FFFFFF" {...rand} strokeWidth={2.6} />}
          {!krone && b.ohren ? (
            <>
              <Ohr art={b.ohren} x={W * 0.34} y={y1 + 6} e={obenH} teil="flaeche" />
              <Ohr art={b.ohren} x={W * 0.66} y={y1 + 6} e={obenH} spiegel teil="flaeche" />
            </>
          ) : null}
          {!krone && !b.ohren && b.bild ? <Circle cx={W / 2} cy={y1 - g / 2 + 14} r={g / 2 + 6} fill="#FFFFFF" /> : null}
          {!krone ? <Rect x={2} y={y1} width={W - 4} height={bandH} rx={4} fill="#FFFFFF" /> : null}
          {krone
            ? Array.from({ length: zacken }, (_, i) => <Circle key={i} cx={2 + ((W - 4) / zacken) * (i + 0.5)} cy={y1 - 24} r={9} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={1.4} />)
            : null}
          <KlebeG c={c} x={4} y={y1 + 4} b={30} h={bandH - 8} rx={3} />
          <KlebeG c={c} x={W - 34} y={y1 + 4} b={30} h={bandH - 8} rx={3} />
          {b.bild ? (
            krone ? (
              <ZeichnungG z={bildZ(b.bild, bandH - 12, true)} p={c.p} x={W / 2 - (bandH - 12) / 2} y={y1 + 6} b={bandH - 12} h={bandH - 12} />
            ) : !b.ohren ? (
              <ZeichnungG z={bildZ(b.bild, g, true)} p={c.p} x={W / 2 - g / 2} y={y1 - g + 14} b={g} h={g} />
            ) : null
          ) : null}
        </Svg>
        <View style={{ marginTop: 10 }}>
          <Streifen c={c} n={3} h={42} />
        </View>
        <Legende c={c} kleben />
      </View>
    )
  }
  // Fahne: Streifen zum Ausmalen (Farbpunkt + Wort), links eine Lasche für den Stab
  const farben = b.farben ?? []
  const fw = Math.min(W - 60, 400)
  const fh = fw * (2 / 3)
  const lx = (W - fw - 40) / 2
  const fx = lx + 40
  const sh = farben.length ? fh / farben.length : fh
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={W} height={fh + 8}>
        <KlebeG c={c} x={lx} y={4} b={40} h={fh} rx={2} />
        <Rect x={fx} y={4} width={fw} height={fh} fill="#FFFFFF" />
        {farben.map((f, i) => (
          <G key={i}>
            {i ? <Line x1={fx} y1={4 + i * sh} x2={fx + fw} y2={4 + i * sh} stroke={NEUTRAL.tinte} strokeWidth={1.2} /> : null}
            <Circle cx={fx + 24} cy={4 + i * sh + sh / 2} r={9} fill={FARBEN[f]} stroke={NEUTRAL.tinte} strokeWidth={1} />
          </G>
        ))}
        <Line x1={fx} y1={4} x2={fx} y2={4 + fh} stroke={c.p.tief} strokeWidth={FALT.breite} strokeDasharray={FALT.dash} />
        <Rect x={lx} y={4} width={fw + 40} height={fh} fill="none" {...rand} />
      </Svg>
      <Legende c={c} falten kleben />
    </View>
  )
}

// --- 10. Suchbild ----------------------------------------------------------------------------------------------

const SZENE: Record<string, { himmel: string; boden?: string; linie?: string }> = {
  wiese: { himmel: '#F2F8FC', boden: '#E2F0D8', linie: '#B9D9A8' },
  wald: { himmel: '#F2F7F0', boden: '#DCEBD2', linie: '#A9CC98' },
  wasser: { himmel: '#E4F0F9', linie: '#B7D5EC' },
  schnee: { himmel: '#F1F5FA', boden: '#FFFFFF', linie: '#C6D5E5' },
  zimmer: { himmel: '#FBF6EE', boden: '#EFE1CB', linie: '#D9C3A0' },
  nacht: { himmel: '#E9EBF6', linie: '#C6CBE6' },
}

export function Suchbild({ c, b }: { c: Ctx; b: B<'suchbild'> }) {
  const M = suchbildMasse(b, c.breite)
  const B_ = c.breite
  const H = M.szeneH
  const lage = suchbildLage(b, B_, H)
  const sz = b.szene ? SZENE[b.szene] : undefined
  const T = tx(c)
  const zwei = b.suchen.length > 1 && c.breite > 400
  const kb = 29
  return (
    <View>
      <Svg width={B_} height={H}>
        <Rect x={0.8} y={0.8} width={B_ - 1.6} height={H - 1.6} rx={14} fill={sz?.himmel ?? '#FFFFFF'} />
        {sz?.boden ? <Path d={`M1 ${H * 0.58} Q${B_ * 0.25} ${H * 0.5} ${B_ * 0.5} ${H * 0.57} T${B_ - 1} ${H * 0.55} L${B_ - 1} ${H - 15} Q${B_ - 1} ${H - 1} ${B_ - 15} ${H - 1} L15 ${H - 1} Q1 ${H - 1} 1 ${H - 15} Z`} fill={sz.boden} stroke={sz.linie} strokeWidth={1.2} /> : null}
        {b.szene === 'wasser'
          ? [0.25, 0.5, 0.75].map((f, i) => <Path key={i} d={Array.from({ length: 8 }, (_, k) => `${k ? '' : `M${20} ${H * f}`} q${(B_ - 40) / 16} -6 ${(B_ - 40) / 8} 0`).join(' ')} fill="none" stroke={sz?.linie} strokeWidth={1.4} />)
          : null}
        {b.szene === 'zimmer' ? <Line x1={1} y1={H * 0.58} x2={B_ - 1} y2={H * 0.58} stroke={sz?.linie} strokeWidth={2} /> : null}
        <Rect x={0.8} y={0.8} width={B_ - 1.6} height={H - 1.6} rx={14} fill="none" stroke={NEUTRAL.tinte} strokeWidth={1.4} />
        {lage.map((x, i) => (
          <ZeichnungG key={i} z={bildZ(x.bild, x.g)} p={c.p} x={x.x - x.g / 2} y={x.y - x.g / 2} b={x.g} h={x.g} drehung={x.drehung} />
        ))}
      </Svg>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 2 }}>
        <Zeichnen z={iconZeichnung('search')} p={c.p} breite={16} />
        <Text style={{ fontFamily: SCHRIFT.kind, fontWeight: 700, fontSize: 13, marginLeft: 5 }}>{typo(T.finde + ':', c.sprache)}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {b.suchen.map((s, i) => (
          <View key={i} style={{ width: zwei ? '50%' : '100%', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.p.zart, alignItems: 'center', justifyContent: 'center' }}>
              <Bild c={c} id={s.bild} breite={30} hoehe={30} />
            </View>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 18, marginLeft: 8, marginRight: 8, color: NEUTRAL.text }}>{`${s.anzahl} ×`}</Text>
            {Array.from({ length: s.anzahl }, (_, k) => (
              <View key={k} style={{ width: kb, height: kb, borderRadius: 5, borderWidth: 1.3, borderColor: NEUTRAL.leise, marginRight: 5, backgroundColor: '#FFFFFF' }} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

// --- 11. Anziehpuppe -------------------------------------------------------------------------------------------

export function Anziehpuppe({ c, b }: { c: Ctx; b: B<'anziehpuppe'> }) {
  const teile: Teil[] = b.kleider.flatMap((k) => kleidungTeile(k, b.ausmalen))
  const rand = 2.6 // Abstand der Schnittlinie (Rastereinheiten)
  const pad = rand + 2
  const luecke = 8
  const maxH = 470
  // Maßstab so wählen, dass alle Teile rechts neben die Puppe passen
  const pack = (k: number) => {
    const dollB = 84 * k
    const R = c.breite - dollB - 18
    let x = 0
    let y = 22
    let zeileH = 0
    const lage: { x: number; y: number; b: number; h: number }[] = []
    const sortiert = teile.map((tl, i) => ({ tl, i })).sort((a, b2) => b2.tl.box[3] - b2.tl.box[1] - (a.tl.box[3] - a.tl.box[1]))
    for (const { tl, i } of sortiert) {
      const bb = (tl.box[2] - tl.box[0] + 2 * pad) * k
      const hh = (tl.box[3] - tl.box[1] + 2 * pad) * k
      if (x > 0 && x + bb > R) {
        x = 0
        y += zeileH + luecke
        zeileH = 0
      }
      lage[i] = { x: dollB + 18 + x, y, b: bb, h: hh }
      x += bb + luecke
      zeileH = Math.max(zeileH, hh)
    }
    return { lage, H: Math.max(y + zeileH, 160 * k), dollB }
  }
  let k = 2.3
  let P = pack(k)
  while (P.H > maxH && k > 1.3) {
    k -= 0.05
    P = pack(k)
  }
  const puppe = puppeZeichnung(b.figur)
  return (
    <View>
      <Svg width={c.breite} height={P.H + 4}>
        <ZeichnungG z={puppe} p={c.p} x={0} y={P.H - 160 * k} b={P.dollB} h={160 * k} />
        <SchereG c={c} x={P.dollB + 26} y={9} g={14} />
        <Line x1={P.dollB + 38} y1={9} x2={c.breite} y2={9} stroke={SCHNITT.farbe} strokeWidth={SCHNITT.breite} strokeDasharray={SCHNITT.dash} />
        {teile.map((tl, i) => {
          const l = P.lage[i]
          const vb: [number, number, number, number] = [tl.box[0] - pad, tl.box[1] - pad, tl.box[2] - tl.box[0] + 2 * pad, tl.box[3] - tl.box[1] + 2 * pad]
          const [k1, k2, k3] = schnittKontur(tl.formen, rand)
          return (
            <G key={i}>
              <ZeichnungG z={{ vb, formen: k1 }} p={c.p} x={l.x} y={l.y} b={l.b} h={l.h} />
              <ZeichnungG z={{ vb, formen: k2 }} p={c.p} x={l.x} y={l.y} b={l.b} h={l.h} />
              <ZeichnungG z={{ vb, formen: k3 }} p={c.p} x={l.x} y={l.y} b={l.b} h={l.h} cap="butt" />
              <ZeichnungG z={{ vb, formen: tl.formen, w: 2.2 }} p={c.p} x={l.x} y={l.y} b={l.b} h={l.h} />
            </G>
          )
        })}
      </Svg>
    </View>
  )
}
