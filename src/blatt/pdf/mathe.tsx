// ---------------------------------------------------------------------------
// Mathe-Bausteine (Modul 2): Rechenpäckchen, Stellentafel, Hunderterfeld,
// Zahlenstrahl, Bruchbilder, Einheiten-Treppe, Komma-Sprünge und Geometrie in
// Originalgröße. Gleicher Kontext wie alle Bausteine (Maße, Farben, Sprache).
// ---------------------------------------------------------------------------

import { View, Text, Svg, Path, Circle, Line, Rect, Polygon, G } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Baustein, Bruchbild, FlaecheFeld, GeoElement, GeoFeld, GeoPunkt, TemperaturItem } from '../typen'
import { NEUTRAL } from '../zeichnung'
import { Fliess, type Ctx } from './bausteine'
import { SCHRIFT, typo } from './stil'

const t = (c: Ctx, s: string | undefined) => (s ? typo(s, c.sprache) : '')

/** 1 mm in pt – Geometrie wird in Originalgröße gezeichnet. */
export const MM = 72 / 25.4
/** Karo-Linien wie in rechnungen/kaestchen */
const KARO_LINIE = '#D3D9E4'
/** zweite Farbe (geteilt, Hinweise) neben der Bereichsfarbe */
const WARM = '#B0621C'

/** „12,5“ → 12.5 (auch mit geschütztem Leerzeichen als Tausender-Trenner) */
export function wert(s: string): number {
  return Number(String(s).replace(/[\s  ]/g, '').replace(',', '.'))
}

/** 0.45 → „0,45“ ohne Rundungsrauschen */
function zahlText(x: number): string {
  return String(Math.round(x * 1e6) / 1e6).replace('.', ',')
}

// --- Rechenpäckchen ---------------------------------------------------------------

type Stueck = { art: 'text'; s: string } | { art: 'linie'; n: number } | { art: 'kasten' } | { art: 'loesung'; s: string } | { art: 'bruch'; z: string; n: string }

/** Zerlegt eine Päckchen-Zeile: ___ Linie, [] Kästchen, {x} Lösung, #z/n# Bruch. */
export function stuecke(s: string): Stueck[] {
  const out: Stueck[] = []
  const re = /(_{3,})|(\[\])|\{([^}]*)\}|#([^#/]*)\/([^#]*)#/g
  let last = 0
  for (const m of s.matchAll(re)) {
    const i = m.index ?? 0
    if (i > last) out.push({ art: 'text', s: s.slice(last, i) })
    if (m[1]) out.push({ art: 'linie', n: m[1].length })
    else if (m[2]) out.push({ art: 'kasten' })
    else if (m[3] !== undefined) out.push({ art: 'loesung', s: m[3] })
    else out.push({ art: 'bruch', z: m[4], n: m[5] })
    last = i + m[0].length
  }
  if (last < s.length) out.push({ art: 'text', s: s.slice(last) })
  return out
}

/** Bruch mit Bruchstrich; '_' bzw. leer = Kästchen zum Ausfüllen. */
export function Bruch({ c, z, n, groesse, farbe }: { c: Ctx; z: string; n: string; groesse?: number; farbe?: string }) {
  const g = groesse ?? c.m.basis
  const f = farbe ?? NEUTRAL.text
  const leer = (x: string) => !x.trim() || x.trim() === '_'
  const breite = Math.max(z.length, n.length, 1) * g * 0.62 + 5
  const teil = (x: string) =>
    leer(x) ? (
      <View style={{ width: g * 1.1, height: g * 1.1, borderWidth: 0.9, borderColor: NEUTRAL.linie, borderRadius: 2, marginVertical: 1.2 }} />
    ) : (
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: g, lineHeight: 1.08, color: f, textAlign: 'center' }}>{x}</Text>
    )
  return (
    <View style={{ alignItems: 'center', marginHorizontal: 2 }}>
      {teil(z)}
      <View style={{ width: Math.max(breite, g * 1.4), height: 0.9, backgroundColor: f, marginVertical: 0.6 }} />
      {teil(n)}
    </View>
  )
}

/** Eine Päckchen-Zeile als Reihe aus Text, Linien, Kästchen und Brüchen. */
export function Zeile({ c, s, klein }: { c: Ctx; s: string; klein?: boolean }) {
  const g = klein ? c.m.klein : c.m.basis
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {stuecke(s).map((x, i) => {
        if (x.art === 'text') return <Text key={i} style={{ fontFamily: c.m.schrift, fontSize: g, lineHeight: c.m.lh, color: NEUTRAL.text }}>{t(c, x.s)}</Text>
        if (x.art === 'linie') return <View key={i} style={{ width: 30 + x.n * 5, height: g * 1.35, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, marginHorizontal: 2 }} />
        if (x.art === 'kasten') return <View key={i} style={{ width: g * 1.45, height: g * 1.45, borderWidth: 0.9, borderColor: NEUTRAL.linie, borderRadius: 2.5, marginHorizontal: 3, marginBottom: g * 0.12 }} />
        if (x.art === 'loesung')
          return (
            <Text key={i} style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: g, lineHeight: c.m.lh, color: c.p.tief, textDecoration: 'underline', textDecorationColor: c.p.mittel }}>
              {t(c, x.s)}
            </Text>
          )
        return (
          <View key={i} style={{ marginBottom: g * 0.12 }}>
            <Bruch c={c} z={x.z} n={x.n} groesse={g * 0.95} />
          </View>
        )
      })}
    </View>
  )
}

const BUCHSTABEN = 'abcdefghijklmnopqrstuvwxyz'

export function Paeckchen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'paeckchen' }> }) {
  const sp = b.spalten ?? 2
  const reihen: string[][] = []
  b.items.forEach((x, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(x)
  })
  return (
    <View>
      {reihen.map((reihe, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 7 : 0 }}>
          {Array.from({ length: sp }, (_, i) => {
            const nr = ri * sp + i
            return (
              <View key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingRight: 10 }}>
                {reihe[i] !== undefined && b.buchstaben ? (
                  <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein, lineHeight: c.m.lh * (c.m.basis / c.m.klein), color: NEUTRAL.leise, width: 14 }}>{BUCHSTABEN[nr]})</Text>
                ) : null}
                {reihe[i] !== undefined ? (
                  reihe[i].includes('\t') ? (
                    // Tabulator: rechter Teil (z. B. Ankreuzkästchen) bündig am rechten Rand
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Zeile c={c} s={reihe[i].split('\t')[0]} />
                      </View>
                      <Zeile c={c} s={reihe[i].split('\t').slice(1).join('   ')} />
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <Zeile c={c} s={reihe[i]} />
                    </View>
                  )
                ) : null}
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

// --- Stellenwerttafel ---------------------------------------------------------------

export function Stellentafel({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'stellentafel' }> }) {
  const n = b.stellen.length
  const k = b.komma
  const hatLabel = b.zeilen.some((z) => z.label)
  const langstes = Math.max(0, ...b.zeilen.map((z) => (z.label ?? '').length))
  const labelB = hatLabel ? Math.min(118, c.breite * 0.34, Math.max(58, langstes * c.m.klein * 0.56 + 14)) : 0
  const kommaB = 11
  const zelleB = Math.min(31, (c.breite - labelB - kommaB - 2) / n)
  const H = 20
  const rahmen = { borderColor: NEUTRAL.rahmen }
  const ziffer = (ch: string, beispiel: boolean) => (
    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 11.5, fontWeight: beispiel ? 600 : 400, color: beispiel ? c.p.tief : NEUTRAL.text, lineHeight: 1 }}>{ch}</Text>
  )
  const zelle = (key: string, inhalt: ReactNode, nach: boolean, kopf = false) => (
    <View key={key} style={{ width: zelleB, height: H, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 0.7, ...rahmen, backgroundColor: kopf ? c.p.zart : nach ? '#FAFAFE' : '#FFFFFF' }}>
      {inhalt}
    </View>
  )
  const kommaZelle = (key: string, inhalt: ReactNode, kopf = false) => (
    <View key={key} style={{ width: kommaB, height: H, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1.4, borderLeftColor: c.p.tief, backgroundColor: kopf ? c.p.zart : '#FFFFFF' }}>
      {inhalt}
    </View>
  )
  const zeile = (key: string, label: string | undefined, zahl: string | undefined, kopf: boolean) => {
    const [g, nk] = zahl ? (zahl.includes(',') ? zahl.split(',') : [zahl, '']) : ['', '']
    const zellen: ReactNode[] = []
    for (let i = 0; i < n; i++) {
      const nach = i >= k
      let inhalt: ReactNode = null
      if (kopf) inhalt = <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: c.p.tief, lineHeight: 1 }}>{b.stellen[i]}</Text>
      else if (zahl) {
        const ch = nach ? nk[i - k] : g[g.length - (k - i)]
        if (ch !== undefined) inhalt = ziffer(ch, true)
      }
      if (i === k) zellen.push(kommaZelle(key + 'k', kopf ? null : <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 12, color: zahl && nk ? c.p.tief : NEUTRAL.rahmen, lineHeight: 1 }}>,</Text>, kopf))
      zellen.push(zelle(key + i, inhalt, nach, kopf))
    }
    return (
      <View key={key} style={{ flexDirection: 'row', borderTopWidth: kopf ? 0 : 0.7, ...rahmen }}>
        {hatLabel ? (
          <View style={{ width: labelB, height: H, justifyContent: 'center', paddingHorizontal: 6, backgroundColor: kopf ? c.p.zart : '#FFFFFF' }}>
            {label ? (
              <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein, color: NEUTRAL.text, lineHeight: 1.1 }}>{t(c, label)}</Text>
            ) : null}
          </View>
        ) : null}
        {zellen}
      </View>
    )
  }
  return (
    <View wrap={false} style={{ alignSelf: 'flex-start', borderWidth: 0.9, borderColor: NEUTRAL.linie, borderRadius: 5, overflow: 'hidden' }}>
      {zeile('kopf', undefined, undefined, true)}
      {b.zeilen.map((z, i) => zeile('z' + i, z.label, z.zahl, false))}
    </View>
  )
}

// --- Hunderterfeld --------------------------------------------------------------------

export function Hunderterfeld({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'hunderterfeld' }> }) {
  const sp = b.spalten ?? Math.min(4, b.felder.length)
  const luecke = 14
  const zelleB = (c.breite - (sp - 1) * luecke) / sp
  const s = Math.min(8.4, (zelleB - 6) / 10)
  const g = s * 10
  const reihen: (typeof b.felder)[] = []
  b.felder.forEach((f, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(f)
  })
  const feld = (f: (typeof b.felder)[number], key: number) => {
    const n = Math.max(0, Math.min(100, f.gefaerbt ?? 0))
    const voll = Math.floor(n / 10)
    const rest = n % 10
    return (
      <View key={key} style={{ width: zelleB, alignItems: 'center' }}>
        {f.label ? (
          <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ alignSelf: 'flex-start', marginBottom: 3 }}>
            {t(c, f.label)}
          </Fliess>
        ) : null}
        <Svg width={g + 2} height={g + 2} viewBox={`-1 -1 ${g + 2} ${g + 2}`}>
          {voll ? <Rect x={0} y={0} width={voll * s} height={g} fill={c.p.mittel} /> : null}
          {rest ? <Rect x={voll * s} y={0} width={s} height={rest * s} fill={c.p.mittel} /> : null}
          {Array.from({ length: 9 }, (_, i) => (
            <Line key={'h' + i} x1={0} y1={(i + 1) * s} x2={g} y2={(i + 1) * s} stroke="#CDD3DD" strokeWidth={0.45} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <Line key={'v' + i} x1={(i + 1) * s} y1={0} x2={(i + 1) * s} y2={g} stroke="#7E889A" strokeWidth={0.65} />
          ))}
          <Rect x={0} y={0} width={g} height={g} fill="none" stroke={NEUTRAL.tinte} strokeWidth={1} />
        </Svg>
        {f.text !== undefined ? (
          <View style={{ marginTop: 5, minHeight: c.m.basis * 1.4, justifyContent: 'flex-end' }}>
            <Zeile c={c} s={f.text} />
          </View>
        ) : (
          <View style={{ width: g * 0.8, height: c.m.basis * 1.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        )}
      </View>
    )
  }
  return (
    <View>
      {reihen.map((r, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 10 : 0 }}>
          {r.map((f, i) => (
            <View key={i} style={{ marginLeft: i ? luecke : 0 }}>
              {feld(f, i)}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Zahlenstrahl ------------------------------------------------------------------------

export function Zahlenstrahl({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'zahlenstrahl' }> }) {
  const von = wert(b.von)
  const bis = wert(b.bis)
  const schritt = wert(b.schritt)
  const fein = b.fein ? wert(b.fein) : 0
  const W = c.breite
  const x0 = 16
  const x1 = W - 24
  const X = (v: number) => x0 + ((v - von) / (bis - von)) * (x1 - x0)
  const punkte = b.punkte ?? []
  const leerePunkte = punkte.some((p) => !p.name)
  const oben = punkte.length ? (leerePunkte ? 40 : 30) : 6
  const yL = oben + 6
  const H = yL + 26
  const nGross = Math.round((bis - von) / schritt)
  const nFein = fein ? Math.round((bis - von) / fein) : 0
  const zahlen = b.zahlen ?? Array.from({ length: nGross + 1 }, (_, i) => zahlText(von + i * schritt))
  return (
    <View wrap={false} style={{ width: W, height: H }}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <Line x1={x0 - 8} y1={yL} x2={x1 + 14} y2={yL} stroke={NEUTRAL.tinte} strokeWidth={1.2} />
        <Polygon points={`${x1 + 20},${yL} ${x1 + 12},${yL - 3.6} ${x1 + 12},${yL + 3.6}`} fill={NEUTRAL.tinte} />
        {Array.from({ length: nFein + 1 }, (_, i) => {
          const v = von + i * fein
          return <Line key={'f' + i} x1={X(v)} y1={yL - 3.2} x2={X(v)} y2={yL + 3.2} stroke={NEUTRAL.leise} strokeWidth={0.6} />
        })}
        {Array.from({ length: nGross + 1 }, (_, i) => (
          <Line key={'g' + i} x1={X(von + i * schritt)} y1={yL - 6} x2={X(von + i * schritt)} y2={yL + 6} stroke={NEUTRAL.tinte} strokeWidth={1} />
        ))}
        {punkte.map((p, i) => {
          const x = X(wert(p.wert))
          return (
            <G key={'p' + i}>
              <Line x1={x} y1={yL - 17} x2={x} y2={yL - 6} stroke={c.p.tief} strokeWidth={1.2} />
              <Polygon points={`${x},${yL - 2.5} ${x - 3.2},${yL - 8} ${x + 3.2},${yL - 8}`} fill={c.p.tief} />
            </G>
          )
        })}
      </Svg>
      {zahlen.map((z, i) => (
        <View key={'z' + i} style={{ position: 'absolute', left: X(wert(z)) - 20, top: yL + 8, width: 40, alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: c.m.klein + 0.5, color: NEUTRAL.text }}>{z}</Text>
        </View>
      ))}
      {punkte.map((p, i) => {
        const x = X(wert(p.wert))
        return p.name ? (
          <View key={'n' + i} style={{ position: 'absolute', left: x - 30, top: yL - 31, width: 60, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, color: c.p.tief }}>{p.name}</Text>
          </View>
        ) : (
          <View key={'n' + i} style={{ position: 'absolute', left: x - 19, top: yL - 37, width: 38, height: 18, borderWidth: 0.9, borderColor: NEUTRAL.linie, borderRadius: 3, backgroundColor: '#FFFFFF' }} />
        )
      })}
    </View>
  )
}

// --- Bruchbilder ---------------------------------------------------------------------------

/** Absichtlich ungleiche Teile (Anteile), damit „gleich große Teile“ geprüft werden kann. */
const UNGLEICH: Record<number, number[]> = {
  2: [0.36, 0.64],
  3: [0.22, 0.33, 0.45],
  4: [0.14, 0.22, 0.3, 0.34],
  5: [0.12, 0.16, 0.2, 0.24, 0.28],
  6: [0.1, 0.13, 0.16, 0.18, 0.2, 0.23],
}

function anteile(n: number, ungleich?: boolean): number[] {
  if (ungleich && UNGLEICH[n]) return UNGLEICH[n]
  return Array.from({ length: n }, () => 1 / n)
}

function sektor(cx: number, cy: number, r: number, a0: number, a1: number): string {
  // Winkel im Uhrzeigersinn ab 12 Uhr
  const p = (a: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`
}

/** Punkte je Reihe: ein Teiler der Anzahl (6, 5, 4, 3), damit sich Gruppen gut einkreisen lassen */
function mengeReihe(anzahl: number, breite: number, d: number): number {
  const passt = Math.max(3, Math.floor((breite - 6) / d))
  const teiler = [6, 5, 4, 3].find((t) => t <= passt && anzahl % t === 0 && anzahl > t)
  return teiler ?? Math.min(anzahl, passt, 6)
}

function BruchForm({ c, x, breite }: { c: Ctx; x: Bruchbild; breite: number }): ReactNode {
  const voll = c.p.mittel
  const strich = NEUTRAL.tinte
  const gef = x.gefaerbt ?? 0
  if (x.form === 'kreis') {
    const D = Math.min(64, breite - 8)
    const r = D / 2 - 1
    const n = Math.max(1, x.teile ?? 1)
    const a = anteile(n, x.ungleich)
    let w = 0
    const teile = a.map((f, i) => {
      const a0 = w * 2 * Math.PI
      w += f
      return { a0, a1: w * 2 * Math.PI, an: i < gef }
    })
    return (
      <Svg width={D} height={D} viewBox={`0 0 ${D} ${D}`}>
        {n === 1 ? (
          <Circle cx={D / 2} cy={D / 2} r={r} fill={gef ? voll : '#FFFFFF'} stroke={strich} strokeWidth={1.1} />
        ) : (
          teile.map((s, i) => <Path key={i} d={sektor(D / 2, D / 2, r, s.a0, s.a1)} fill={s.an ? voll : '#FFFFFF'} stroke={strich} strokeWidth={1} strokeLinejoin="round" />)
        )}
      </Svg>
    )
  }
  if (x.form === 'rechteck' || x.form === 'streifen') {
    const n = Math.max(1, x.teile ?? 1)
    const zwei = x.form === 'rechteck' && !x.ungleich && n >= 4 && n % 2 === 0
    const W = x.form === 'streifen' ? breite - 6 : Math.min(96, breite - 8)
    const H = x.form === 'streifen' ? 20 : zwei ? 48 : 34
    const cols = zwei ? n / 2 : n
    const a = anteile(cols, x.ungleich)
    const rects: ReactNode[] = []
    let xx = 0
    let k = 0
    for (let r = 0; r < (zwei ? 2 : 1); r++) {
      xx = 0
      for (let i = 0; i < cols; i++) {
        const w = a[i] * W
        rects.push(<Rect key={k} x={xx} y={(r * H) / (zwei ? 2 : 1)} width={w} height={H / (zwei ? 2 : 1)} fill={k < gef ? voll : '#FFFFFF'} stroke={strich} strokeWidth={1} />)
        xx += w
        k++
      }
    }
    return (
      <Svg width={W + 2} height={H + 2} viewBox={`-1 -1 ${W + 2} ${H + 2}`}>
        {rects}
      </Svg>
    )
  }
  if (x.form === 'menge') {
    const anzahl = Math.max(1, x.anzahl ?? 1)
    const gruppen = x.gruppen ?? 0
    const r = 4.3
    const d = 12.5
    if (!gruppen) {
      const proReihe = mengeReihe(anzahl, breite, d)
      const reihen = Math.ceil(anzahl / proReihe)
      const W = proReihe * d
      const H = reihen * d
      return (
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {Array.from({ length: anzahl }, (_, i) => (
            <Circle key={i} cx={(i % proReihe) * d + d / 2} cy={Math.floor(i / proReihe) * d + d / 2} r={r} fill="#FFFFFF" stroke={strich} strokeWidth={0.9} />
          ))}
        </Svg>
      )
    }
    const jeGruppe = Math.ceil(anzahl / gruppen)
    const gc = Math.ceil(Math.sqrt(jeGruppe))
    const gr = Math.ceil(jeGruppe / gc)
    const pad = 5
    const gW = gc * d + pad * 2
    const gH = gr * d + pad * 2
    const luecke = 6
    const W = gruppen * gW + (gruppen - 1) * luecke
    return (
      <Svg width={W + 2} height={gH + 2} viewBox={`-1 -1 ${W + 2} ${gH + 2}`}>
        {Array.from({ length: gruppen }, (_, gi) => {
          const ox = gi * (gW + luecke)
          const an = gi < gef
          return (
            <G key={gi}>
              <Rect x={ox} y={0} width={gW} height={gH} rx={9} ry={9} fill={an ? c.p.zart : '#FFFFFF'} stroke={c.p.tief} strokeWidth={1} strokeDasharray={an ? undefined : '3 2.4'} />
              {Array.from({ length: Math.min(jeGruppe, anzahl - gi * jeGruppe) }, (_, i) => (
                <Circle key={i} cx={ox + pad + (i % gc) * d + d / 2} cy={pad + Math.floor(i / gc) * d + d / 2} r={r} fill={an ? c.p.tief : '#FFFFFF'} stroke={an ? c.p.tief : strich} strokeWidth={0.9} />
              ))}
            </G>
          )
        })}
      </Svg>
    )
  }
  // Bruchwand: Streifen mit 1, 1/2, 1/3 … untereinander
  const nenner = x.nenner ?? [1, 2, 3, 4]
  const W = breite - 4
  const h = 27
  const gap = 3
  return (
    <View style={{ width: W }}>
      {nenner.map((n, ri) => (
        <View key={ri} style={{ flexDirection: 'row', height: h, marginTop: ri ? gap : 0 }}>
          {Array.from({ length: n }, (_, i) => (
            <View key={i} style={{ flex: 1, borderWidth: 0.9, borderColor: strich, marginLeft: i ? -0.9 : 0, backgroundColor: ri % 2 ? '#FFFFFF' : c.p.zart, alignItems: 'center', justifyContent: 'center' }}>
              {n === 1 ? (
                <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9.5, color: NEUTRAL.text }}>1</Text>
              ) : (
                <Bruch c={c} z="1" n={String(n)} groesse={7.6} />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

/** Höhe der Form (für gleich hohe Reihen) – dieselben Maße wie in BruchForm */
function formHoehe(x: Bruchbild, breite: number): number {
  if (x.form === 'kreis') return Math.min(64, breite - 8)
  if (x.form === 'streifen') return 22
  if (x.form === 'rechteck') return (!x.ungleich && (x.teile ?? 1) >= 4 && (x.teile ?? 1) % 2 === 0 ? 48 : 34) + 2
  if (x.form === 'menge') {
    const anzahl = Math.max(1, x.anzahl ?? 1)
    const d = 12.5
    if (!x.gruppen) return Math.ceil(anzahl / mengeReihe(anzahl, breite, d)) * d
    const je = Math.ceil(anzahl / x.gruppen)
    const gc = Math.ceil(Math.sqrt(je))
    return Math.ceil(je / gc) * d + 12
  }
  return (x.nenner ?? [1, 2, 3, 4]).length * 30
}

export function Bruchbilder({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'bruchbilder' }> }) {
  const sp = b.spalten ?? Math.min(4, b.items.length)
  const luecke = 12
  const zelleB = (c.breite - (sp - 1) * luecke) / sp
  const reihen: Bruchbild[][] = []
  b.items.forEach((x, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(x)
  })
  const unter = (x: Bruchbild) => (
    <>
      {x.bruch !== undefined ? (
        <View style={{ marginTop: 5 }}>
          {x.bruch.includes('/') ? <Bruch c={c} z={x.bruch.split('/')[0]} n={x.bruch.split('/')[1]} groesse={11} /> : <Bruch c={c} z="" n="" groesse={11} />}
        </View>
      ) : null}
      {x.text !== undefined ? (
        x.text ? (
          <View style={{ marginTop: 5 }}>
            <Zeile c={c} s={x.text} />
          </View>
        ) : (
          <View style={{ width: Math.min(90, zelleB - 10), height: c.m.basis * 1.8, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        )
      ) : null}
      {x.ankreuzen?.length ? (
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          {x.ankreuzen.map((o, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: i ? 12 : 0 }}>
              <View style={{ width: 10, height: 10, borderWidth: 0.9, borderColor: NEUTRAL.linie, borderRadius: 2, marginRight: 4 }} />
              <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein, color: NEUTRAL.text }}>{t(c, o)}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </>
  )
  return (
    <View>
      {reihen.map((r, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: ri ? 12 : 0 }}>
          {r.map((x, i) => (
            <View key={i} style={{ width: zelleB, marginLeft: i ? luecke : 0, alignItems: x.form === 'wand' ? 'flex-start' : 'center' }}>
              {x.label ? (
                <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ alignSelf: 'flex-start', marginBottom: 3 }}>
                  {t(c, x.label)}
                </Fliess>
              ) : null}
              <View style={{ height: Math.max(...r.map((y) => formHoehe(y, zelleB))), justifyContent: 'center', alignItems: x.form === 'wand' ? 'flex-start' : 'center' }}>
                <BruchForm c={c} x={x} breite={zelleB} />
              </View>
              {unter(x)}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Einheiten-Treppe --------------------------------------------------------------------------

export function Treppe({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'treppe' }> }) {
  const n = b.stufen.length
  const w = 38
  const h = 25
  const dx = Math.min(66, (c.breite - w - 40) / Math.max(1, n - 1))
  const dy = 23
  const ox = 30
  const oy = 12
  const W = ox + (n - 1) * dx + w + 40
  const H = oy + (n - 1) * dy + h + 16
  const bx = (i: number) => ox + i * dx
  const by = (i: number) => oy + i * dy
  const pfeil = (x: number, y: number, rx: number, ry: number, farbe: string, key: string) => {
    const l = Math.hypot(rx, ry) || 1
    const ux = rx / l
    const uy = ry / l
    return <Polygon key={key} points={`${x},${y} ${x - ux * 6 - uy * 3},${y - uy * 6 + ux * 3} ${x - ux * 6 + uy * 3},${y - uy * 6 - ux * 3}`} fill={farbe} />
  }
  const boegen: ReactNode[] = []
  const labels: ReactNode[] = []
  for (let i = 0; i < n - 1; i++) {
    // runter (mal): von der rechten Kante der Stufe i zur Oberkante der Stufe i+1
    const ax = bx(i) + w + 2
    const ay = by(i) + h * 0.4
    const ex = bx(i + 1) + w * 0.62
    const ey = by(i + 1) - 2
    const kx = ex
    const ky = ay
    boegen.push(<Path key={'r' + i} d={`M${ax} ${ay} Q${kx} ${ky} ${ex} ${ey - 4}`} stroke={c.p.tief} strokeWidth={1.3} fill="none" />)
    boegen.push(pfeil(ex, ey, 0, 1, c.p.tief, 'rp' + i))
    labels.push(
      <View key={'rl' + i} style={{ position: 'absolute', left: kx + 3, top: ky - 13, width: 44 }}>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, color: c.p.tief }}>{t(c, b.runter)}</Text>
      </View>,
    )
    // rauf (geteilt): von der linken Kante der Stufe i+1 zur Unterkante der Stufe i
    const ax2 = bx(i + 1) - 2
    const ay2 = by(i + 1) + h * 0.62
    const ex2 = bx(i) + w * 0.38
    const ey2 = by(i) + h + 2
    const kx2 = ex2
    const ky2 = ay2
    boegen.push(<Path key={'u' + i} d={`M${ax2} ${ay2} Q${kx2} ${ky2} ${ex2} ${ey2 + 4}`} stroke={WARM} strokeWidth={1.3} fill="none" />)
    boegen.push(pfeil(ex2, ey2, 0, -1, WARM, 'up' + i))
    labels.push(
      <View key={'ul' + i} style={{ position: 'absolute', left: kx2 - 47, top: ky2 + 1, width: 44, alignItems: 'flex-end' }}>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, color: WARM }}>{t(c, b.rauf)}</Text>
      </View>,
    )
  }
  return (
    <View wrap={false} style={{ alignItems: 'center' }}>
      <View style={{ width: W, height: H }}>
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {b.stufen.map((_, i) => (
            <Rect key={i} x={bx(i)} y={by(i)} width={w} height={h} rx={5} ry={5} fill={c.p.zart} stroke={c.p.tief} strokeWidth={1.1} />
          ))}
          {boegen}
        </Svg>
        {b.stufen.map((s, i) => (
          <View key={'s' + i} style={{ position: 'absolute', left: bx(i), top: by(i), width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 12.5, color: c.p.tief, lineHeight: 1 }}>{s}</Text>
          </View>
        ))}
        {labels}
      </View>
      {b.beispiel ? (
        <View style={{ marginTop: 4 }}>
          <Zeile c={c} s={b.beispiel} klein />
        </View>
      ) : null}
    </View>
  )
}

// --- Flächen auf Zentimeter-Karo (Originalgröße) --------------------------------------------------------

/** Platz eines Flächen-Feldes in mm: das Karo-Feld oder das Rechteck mit Rand (oben und rechts Platz für die Maße). */
export function flaecheGroesse(f: FlaecheFeld): { B: number; H: number } {
  if (f.feld) return { B: f.feld[0] * 10, H: f.feld[1] * 10 }
  const rechts = f.masse ? Math.max(5, f.masse[1].length * 1.95 + 3.5) : 4
  return { B: f.l * 10 + 4 + rechts, H: f.b * 10 + (f.masse ? 7.5 : 4) + 4 }
}

/** Ein Feld (B × H in mm): Karo um das Rechteck nur mit `feld`, cm²-Kästchen im Rechteck, gefärbte Kästchen reihenweise. */
function FlaecheZeichnung({ c, f, B, H }: { c: Ctx; f: FlaecheFeld; B: number; H: number }) {
  const L = f.l * 10
  const T = f.b * 10
  const rechteck = L > 0 && T > 0
  const kaestchen = rechteck && f.kaestchen !== false
  // Lage: auf dem Karo mittig in ganzen Zentimetern, sonst mittig im Feld
  const g = flaecheGroesse(f)
  const x = f.feld ? Math.floor((f.feld[0] - f.l) / 2) * 10 : (B - g.B) / 2 + 4
  const y = f.feld ? Math.floor((f.feld[1] - f.b) / 2) * 10 : (H - g.H) / 2 + (f.masse ? 7.5 : 4)
  const teile: ReactNode[] = []
  if (f.feld) {
    for (let i = 10; i < B - 0.01; i += 10) teile.push(<Line key={'kx' + i} x1={i} y1={0} x2={i} y2={H} stroke={KARO_LINIE} strokeWidth={0.22} />)
    for (let j = 10; j < H - 0.01; j += 10) teile.push(<Line key={'ky' + j} x1={0} y1={j} x2={B} y2={j} stroke={KARO_LINIE} strokeWidth={0.22} />)
  }
  if (rechteck) {
    teile.push(<Rect key="fl" x={x} y={y} width={L} height={T} fill={kaestchen ? c.p.zart : '#FFFFFF'} />)
    if (kaestchen) {
      const proReihe = Math.round(f.l)
      const n = Math.min(f.gefaerbt ?? 0, proReihe * Math.round(f.b))
      for (let k = 0; k < n; k++) teile.push(<Rect key={'g' + k} x={x + (k % proReihe) * 10} y={y + Math.floor(k / proReihe) * 10} width={10} height={10} fill={c.p.mittel} />)
      for (let i = 10; i < L - 0.01; i += 10) teile.push(<Line key={'ix' + i} x1={x + i} y1={y} x2={x + i} y2={y + T} stroke="#8A95A8" strokeWidth={0.2} />)
      for (let j = 10; j < T - 0.01; j += 10) teile.push(<Line key={'iy' + j} x1={x} y1={y + j} x2={x + L} y2={y + j} stroke="#8A95A8" strokeWidth={0.2} />)
    }
    teile.push(<Rect key="rand" x={x} y={y} width={L} height={T} fill="none" stroke={NEUTRAL.tinte} strokeWidth={0.4} />)
  }
  const mass = (key: string, text: string, style: Record<string, unknown>) => (
    <View key={key} style={{ position: 'absolute', height: 14, justifyContent: 'center', ...style }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, lineHeight: 1.2, color: NEUTRAL.text }}>{t(c, text)}</Text>
    </View>
  )
  return (
    <View style={{ width: B * MM, height: H * MM }}>
      <Svg width={B * MM} height={H * MM} viewBox={`0 0 ${B} ${H}`}>
        {teile}
      </Svg>
      {rechteck && f.masse ? mass('mo', f.masse[0], { left: (x + L / 2) * MM - 40, top: y * MM - 15, width: 80, alignItems: 'center' }) : null}
      {rechteck && f.masse ? mass('mr', f.masse[1], { left: (x + L + 1.6) * MM, top: (y + T / 2) * MM - 7, width: 60, alignItems: 'flex-start' }) : null}
      <View style={{ position: 'absolute', left: 0, top: 0, width: B * MM, height: H * MM, borderWidth: 0.6, borderColor: NEUTRAL.haarlinie, borderRadius: 5 }} />
    </View>
  )
}

export function Flaeche({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'flaeche' }> }) {
  const sp = b.spalten ?? Math.min(4, b.felder.length)
  const luecke = 10
  const spalte = (c.breite - (sp - 1) * luecke) / sp
  const reihen: FlaecheFeld[][] = []
  b.felder.forEach((f, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(f)
  })
  return (
    <View>
      {reihen.map((r, ri) => {
        // Felder ohne Karo füllen die Spalte und sind in einer Reihe gleich hoch
        const hoehe = Math.max(0, ...r.map((f) => (f.feld ? 0 : flaecheGroesse(f).H)))
        return (
          <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 10 : 0 }}>
            {r.map((f, i) => {
              const B = f.feld ? f.feld[0] * 10 : spalte / MM
              const H = f.feld ? f.feld[1] * 10 : hoehe
              return (
                <View key={i} style={{ width: spalte, marginLeft: i ? luecke : 0 }}>
                  {f.label ? (
                    <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 3 }}>
                      {t(c, f.label)}
                    </Fliess>
                  ) : null}
                  <FlaecheZeichnung c={c} f={f} B={B} H={H} />
                  {f.text !== undefined ? (
                    f.text ? (
                      <View style={{ marginTop: 4 }}>
                        <Zeile c={c} s={f.text} />
                      </View>
                    ) : (
                      <View style={{ width: Math.min(B * MM, 120), height: c.m.basis * 1.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
                    )
                  ) : null}
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

// --- Thermometer (°C) mit Minusgraden ------------------------------------------------------------------------

const ROT = '#D9523F'
const KALT = '#E6EEF8'

/** Maße eines Thermometers in pt (für alle Thermometer eines Bausteins gleich; auch für das Prüfskript). */
export function temperaturSkala(b: { von: number; bis: number; items: TemperaturItem[] }) {
  const R = Math.max(1, b.bis - b.von)
  // pt je Grad: Skala etwa 150 pt hoch, die Grad-Striche mindestens 2,6 pt auseinander
  const d = Math.min(6, Math.max(2.6, 150 / R))
  const oben = 16
  const kugel = 7.5
  const cx = 32
  const a = 3.6
  const pfeil = b.items.some((x) => x.pfeil)
  const marke = b.items.some((x) => x.ziel !== undefined)
  return {
    d,
    kugel,
    cx,
    a,
    /** Grad → y */
    y: (v: number) => oben + (b.bis - v) * d,
    /** Mitte der Kugel */
    cb: oben + R * d + 5 + kugel,
    H: oben + R * d + 5 + kugel * 2 + 2,
    W: cx + a + (pfeil ? 34 : marke ? 9 : 4),
    /** Zahlen alle 5 (10) Grad, Striche jedes (zweite) Grad */
    schritt: R > 40 ? 10 : 5,
    fein: R > 60 ? 2 : 1,
  }
}

/** „–5“ mit Gedankenstrich wie im Text */
const grad = (v: number) => (v < 0 ? '–' + Math.abs(v) : String(v))

function ThermometerSkala({ c, b, x }: { c: Ctx; b: Extract<Baustein, { art: 'temperatur' }>; x: TemperaturItem }) {
  const s = temperaturSkala(b)
  const { cx, a, kugel, cb, y } = s
  const links = cx - a - 0.8
  const oben = y(b.bis) - 5
  const yj = cb - Math.sqrt(kugel * kugel - a * a)
  const roehre = `M${cx - a} ${yj} L${cx - a} ${oben + a} A${a} ${a} 0 0 1 ${cx + a} ${oben + a} L${cx + a} ${yj} A${kugel} ${kugel} 0 1 1 ${cx - a} ${yj} Z`
  const formen: ReactNode[] = []
  const texte: ReactNode[] = []
  if (b.von < 0) formen.push(<Rect key="kalt" x={1} y={y(Math.min(0, b.bis))} width={links - 1.5} height={y(b.von) - y(Math.min(0, b.bis)) + 2} rx={2} ry={2} fill={KALT} />)
  formen.push(<Path key="r0" d={roehre} fill="#FFFFFF" />)
  formen.push(<Circle key="kugel" cx={cx} cy={cb} r={kugel - 1.7} fill={ROT} />)
  const saeule = x.wert !== undefined ? y(x.wert) : y(b.von) + 3
  formen.push(<Rect key="saeule" x={cx - 1.5} y={saeule} width={3} height={cb - saeule} fill={ROT} />)
  formen.push(<Path key="r1" d={roehre} fill="none" stroke={NEUTRAL.tinte} strokeWidth={0.8} strokeLinejoin="round" />)
  for (let v = b.von; v <= b.bis; v += s.fein) {
    const gross = v % s.schritt === 0
    const l = v === 0 ? 7.5 : gross ? 5.5 : 3.2
    formen.push(<Line key={'t' + v} x1={links} y1={y(v)} x2={links - l} y2={y(v)} stroke={NEUTRAL.tinte} strokeWidth={v === 0 ? 0.95 : gross ? 0.7 : 0.4} />)
    if (gross)
      texte.push(
        <View key={'z' + v} style={{ position: 'absolute', left: 0, top: y(v) - 5, width: links - 9, height: 10, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.5, fontWeight: v === 0 ? 600 : 400, lineHeight: 1, color: NEUTRAL.text }}>{grad(v)}</Text>
        </View>,
      )
  }
  texte.push(
    <View key="einheit" style={{ position: 'absolute', left: 0, top: 0, width: links - 9, height: 10, alignItems: 'flex-end' }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.5, fontWeight: 600, lineHeight: 1, color: NEUTRAL.leise }}>°C</Text>
    </View>,
  )
  if (x.ziel !== undefined) {
    const yz = y(x.ziel)
    const xr = cx + a + 1.2
    formen.push(<Polygon key="ziel" points={`${xr},${yz} ${xr + 4.8},${yz - 2.9} ${xr + 4.8},${yz + 2.9}`} fill={c.p.tief} />)
  }
  if (x.pfeil && x.wert !== undefined && x.ziel !== undefined && x.wert !== x.ziel) {
    const xa = cx + a + 10
    const ya = y(x.wert)
    const ye = y(x.ziel)
    const auf = x.ziel > x.wert
    const r = auf ? 1 : -1
    formen.push(<Line key="pa" x1={xa - 2.6} y1={ya} x2={xa + 2.6} y2={ya} stroke={c.p.tief} strokeWidth={0.9} />)
    formen.push(<Line key="pl" x1={xa} y1={ya} x2={xa} y2={ye + r * 4} stroke={c.p.tief} strokeWidth={1.1} />)
    formen.push(<Polygon key="pp" points={`${xa},${ye} ${xa - 2.7},${ye + r * 5.5} ${xa + 2.7},${ye + r * 5.5}`} fill={c.p.tief} />)
    // über die 0: in zwei Teilen
    const punkte = x.wert * x.ziel < 0 ? [x.wert, 0, x.ziel] : [x.wert, x.ziel]
    if (punkte.length === 3) formen.push(<Line key="p0" x1={xa - 2.6} y1={y(0)} x2={xa + 2.6} y2={y(0)} stroke={c.p.tief} strokeWidth={0.9} />)
    for (let i = 0; i < punkte.length - 1; i++) {
      const mitte = (y(punkte[i]) + y(punkte[i + 1])) / 2
      texte.push(
        <View key={'pt' + i} style={{ position: 'absolute', left: xa + 4, top: mitte - 5.5, height: 11, justifyContent: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.5, fontWeight: 600, lineHeight: 1, color: c.p.tief }}>{(auf ? '+' : '–') + Math.abs(punkte[i + 1] - punkte[i])}</Text>
        </View>,
      )
    }
  }
  return (
    <View style={{ width: s.W, height: s.H }}>
      <Svg width={s.W} height={s.H} viewBox={`0 0 ${s.W} ${s.H}`}>
        {formen}
      </Svg>
      {texte}
    </View>
  )
}

export function Temperatur({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'temperatur' }> }) {
  const sp = b.spalten ?? Math.min(6, b.items.length)
  const luecke = 10
  const zelle = (c.breite - (sp - 1) * luecke) / sp
  const reihen: TemperaturItem[][] = []
  b.items.forEach((x, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(x)
  })
  return (
    <View>
      {reihen.map((r, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 10 : 0 }}>
          {r.map((x, i) => (
            <View key={i} style={{ width: zelle, marginLeft: i ? luecke : 0, alignItems: 'center' }}>
              {x.label ? (
                <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 2 }}>
                  {t(c, x.label)}
                </Fliess>
              ) : null}
              <ThermometerSkala c={c} b={b} x={x} />
              {x.text !== undefined ? (
                x.text ? (
                  <View style={{ marginTop: 3 }}>
                    <Zeile c={c} s={x.text} />
                  </View>
                ) : (
                  <View style={{ width: Math.min(zelle - 6, 70), height: c.m.basis * 1.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
                )
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Komma-Sprünge ---------------------------------------------------------------------------------

interface Sprung {
  /** Ziffern der Anzeige */
  ziffern: { z: string; neu?: boolean; leer?: boolean }[]
  /** Komma vorher (Anzahl Ziffern davor) und nachher */
  vor: number
  nach: number
  ergebnis: string
  echtesKomma: boolean
}

/** Rechnet die Komma-Verschiebung aus (auch für das Prüfskript). */
export function kommaSprung(zahl: string, op: '·' | ':', faktor: number): Sprung {
  const s = zahl.replace(/[\s ]/g, '')
  const echtesKomma = s.includes(',')
  const [g, nk] = echtesKomma ? s.split(',') : [s, '']
  const ziffern = [...(g + nk)].map((z) => ({ z }) as { z: string; neu?: boolean; leer?: boolean })
  let vor = g.length
  const k = Math.round(Math.log10(faktor))
  let nach = op === '·' ? vor + k : vor - k
  while (nach > ziffern.length) ziffern.push({ z: '0', neu: true })
  while (nach < 1) {
    ziffern.unshift({ z: '0', neu: true })
    nach++
    vor++
  }
  const ganz = ziffern.slice(0, nach).map((x) => x.z).join('').replace(/^0+(?=\d)/, '')
  const rest = ziffern.slice(nach).map((x) => x.z).join('').replace(/0+$/, '')
  return { ziffern, vor, nach, ergebnis: rest ? `${ganz},${rest}` : ganz, echtesKomma }
}

export function Kommasprung({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'kommasprung' }> }) {
  const sp = b.spalten ?? Math.min(3, b.items.length)
  const luecke = 12
  const zelleB = (c.breite - (sp - 1) * luecke) / sp
  const k = 17
  const reihen: (typeof b.items)[] = []
  b.items.forEach((x, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(x)
  })
  const eins = (x: (typeof b.items)[number], key: number) => {
    const zeigen = x.ergebnis !== undefined || !!x.boegen
    const s = kommaSprung(x.zahl, x.op, x.faktor)
    let ziffern = s.ziffern
    let vor = s.vor
    if (!zeigen) {
      // Aufgabe: nur die Zahl, daneben leere Kästchen für nötige Nullen
      const roh = kommaSprung(x.zahl, '·', 1)
      const leer = Array.from({ length: 3 }, () => ({ z: '', leer: true }))
      ziffern = x.op === '·' ? [...roh.ziffern, ...leer] : [...leer, ...roh.ziffern]
      vor = roh.vor + (x.op === ':' ? 3 : 0)
    }
    const n = ziffern.length
    const oben = zeigen ? 15 : 4
    const W = n * k
    const H = oben + k + 5
    const bogen = (a: number, e: number, i: number) => {
      const xa = a * k
      const xe = e * k
      const y = oben
      const top = oben - 12
      return (
        <G key={i}>
          <Path d={`M${xa} ${y - 1} C${xa} ${top} ${xe} ${top} ${xe} ${y - 3.5}`} stroke={c.p.tief} strokeWidth={1.1} fill="none" />
          <Polygon points={`${xe},${y - 0.6} ${xe - 2.6},${y - 5.2} ${xe + 2.6},${y - 5.2}`} fill={c.p.tief} />
        </G>
      )
    }
    const schritte = zeigen ? Array.from({ length: Math.abs(s.nach - s.vor) }, (_, i) => (s.nach > s.vor ? [s.vor + i, s.vor + i + 1] : [s.vor - i, s.vor - i - 1])) : []
    const gleichung = `${x.zahl} ${x.op} ${x.faktor} = ${x.ergebnis !== undefined ? '{' + x.ergebnis + '}' : '___'}`
    return (
      <View key={key} style={{ width: zelleB }}>
        {x.label ? (
          <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 2 }}>
            {t(c, x.label)}
          </Fliess>
        ) : null}
        <View style={{ width: W + 2, height: H }}>
          <View style={{ position: 'absolute', left: 0, top: oben, flexDirection: 'row', borderLeftWidth: 0.5, borderTopWidth: 0.5, borderColor: KARO_LINIE }}>
            {ziffern.map((z, i) => (
              <View key={i} style={{ width: k, height: k, alignItems: 'center', justifyContent: 'center', borderRightWidth: 0.5, borderBottomWidth: 0.5, borderColor: KARO_LINIE, backgroundColor: z.leer ? '#FAFBFD' : '#FFFFFF' }}>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 11, fontWeight: z.neu ? 600 : 400, color: z.neu ? c.p.tief : NEUTRAL.text, lineHeight: 1 }}>{z.z}</Text>
              </View>
            ))}
          </View>
          <Svg width={W + 2} height={H} viewBox={`0 0 ${W + 2} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
            {schritte.map(([a, e], i) => bogen(a, e, i))}
          </Svg>
          {/* altes Komma (grau; bei ganzen Zahlen das „versteckte“), neues Komma in der Akzentfarbe */}
          <View style={{ position: 'absolute', left: vor * k - 4, top: oben + 1.5, width: 8, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 14, color: zeigen ? NEUTRAL.sehrLeise : s.echtesKomma ? NEUTRAL.text : NEUTRAL.rahmen, lineHeight: 1 }}>,</Text>
          </View>
          {zeigen && s.nach < n ? (
            <View style={{ position: 'absolute', left: s.nach * k - 4, top: oben + 1, width: 8, alignItems: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 700, fontSize: 15, color: c.p.tief, lineHeight: 1 }}>,</Text>
            </View>
          ) : null}
        </View>
        <View style={{ marginTop: 4 }}>
          <Zeile c={c} s={gleichung} />
        </View>
      </View>
    )
  }
  return (
    <View>
      {reihen.map((r, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: ri ? 12 : 0 }}>
          {r.map((x, i) => (
            <View key={i} style={{ marginLeft: i ? luecke : 0 }}>
              {eins(x, i)}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Daten: Diagramm und Strichliste -------------------------------------------------------------------

/** grobe Textbreite in pt (für Platz und Umbruch der Beschriftungen) */
const textBreite = (s: string, g: number) => s.length * g * 0.56
const GITTER_FEIN = '#E3E7EE'
const GITTER = '#C4CBD7'

type DiagrammB = Extract<Baustein, { art: 'diagramm' }>

/** Skala (beschriftet, alle `schritt`) und feines Gitter (alle `fein`) */
function diagrammSkala(b: DiagrammB): { grob: number[]; fein: number[] } {
  const reihe = (d: number) => Array.from({ length: Math.round(b.max / d) + 1 }, (_, i) => Math.round(i * d * 1e6) / 1e6)
  return { grob: reihe(b.schritt), fein: b.fein ? reihe(b.fein) : [] }
}

/** Pfeilspitze der Werte-Achse: nach oben (o) bzw. nach rechts (r), Spitze bei (x, y) */
function pfeilspitze(x: number, y: number, r: 'o' | 'r') {
  const p = r === 'o' ? `${x},${y} ${x - 3.2},${y + 6.5} ${x + 3.2},${y + 6.5}` : `${x},${y} ${x - 6.5},${y - 3.2} ${x - 6.5},${y + 3.2}`
  return <Polygon points={p} fill={NEUTRAL.tinte} />
}

/** Legende unter dem Diagramm für die gestrichelte Linie (z. B. den Mittelwert) */
function LinienLegende({ c, text, links }: { c: Ctx; text: string; links: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, marginLeft: links }}>
      <Svg width={26} height={8} viewBox="0 0 26 8">
        <Line x1={1} y1={4} x2={25} y2={4} stroke={WARM} strokeWidth={1.5} strokeDasharray="4 2.5" />
      </Svg>
      <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: c.m.klein, lineHeight: 1.2, color: WARM, marginLeft: 5 }}>{t(c, text)}</Text>
    </View>
  )
}

function DiagrammStehend({ c, b }: { c: Ctx; b: DiagrammB }) {
  const g = c.m.klein
  const n = b.kategorien.length
  const { grob, fein } = diagrammSkala(b)
  const ax = Math.max(...grob.map((v) => textBreite(zahlText(v), g + 0.5))) + 12
  const rechts = 12
  const s = Math.min(66, (c.breite - ax - rechts) / n)
  const PW = s * n
  const oben = b.achsen?.[1] ? 22 : 13
  const PH = b.hoehe ?? 118
  const y0 = oben + PH
  const Y = (v: number) => y0 - (v / b.max) * PH
  const X = (i: number) => ax + (i + 0.5) * s
  const bw = Math.min(28, s * 0.55)
  const zwei = b.kategorien.some((k) => textBreite(k, g) > s - 4)
  const katH = g * (zwei ? 2.7 : 1.55)
  const W = ax + PW + rechts
  const H = y0 + 5 + katH + (b.achsen?.[0] ? g * 1.5 : 0)
  const werte = b.werte ?? []
  return (
    <View wrap={false} style={{ alignSelf: 'flex-start' }}>
      {b.titel ? (
        <Fliess c={c} klein fett style={{ marginBottom: 2 }}>
          {t(c, b.titel)}
        </Fliess>
      ) : null}
      <View style={{ width: W, height: H }}>
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {fein.map((v) => (
            <Line key={'f' + v} x1={ax} y1={Y(v)} x2={ax + PW} y2={Y(v)} stroke={GITTER_FEIN} strokeWidth={0.5} />
          ))}
          {grob.map((v) => (v ? <Line key={'g' + v} x1={ax - 3} y1={Y(v)} x2={ax + PW} y2={Y(v)} stroke={GITTER} strokeWidth={0.7} /> : null))}
          {werte.map((v, i) =>
            v === null || v === undefined || v <= 0 ? null : (
              <G key={'b' + i}>
                <Rect x={X(i) - bw / 2} y={Y(v)} width={bw} height={y0 - Y(v)} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={0.9} />
                {b.einheiten
                  ? Array.from({ length: Math.max(0, Math.ceil(v) - 1) }, (_, k) => (
                      <Line key={k} x1={X(i) - bw / 2} y1={Y(k + 1)} x2={X(i) + bw / 2} y2={Y(k + 1)} stroke={c.p.tief} strokeWidth={0.45} />
                    ))
                  : null}
              </G>
            ),
          )}
          {b.linie ? <Line x1={ax} y1={Y(b.linie.wert)} x2={ax + PW} y2={Y(b.linie.wert)} stroke={WARM} strokeWidth={1.5} strokeDasharray="4 2.5" /> : null}
          <Line x1={ax} y1={y0} x2={ax} y2={oben - 5} stroke={NEUTRAL.tinte} strokeWidth={1.1} />
          {pfeilspitze(ax, oben - 10, 'o')}
          <Line x1={ax} y1={y0} x2={ax + PW + 4} y2={y0} stroke={NEUTRAL.tinte} strokeWidth={1.1} />
        </Svg>
        {b.achsen?.[1] ? (
          <View style={{ position: 'absolute', left: ax + 7, top: oben - 17, width: PW }}>
            <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: g, lineHeight: 1.2, color: NEUTRAL.leise }}>{t(c, b.achsen[1])}</Text>
          </View>
        ) : null}
        {grob.map((v) => (
          <View key={'s' + v} style={{ position: 'absolute', left: 0, top: Y(v) - g * 0.68, width: ax - 6 }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: g + 0.5, lineHeight: 1.2, color: NEUTRAL.text, textAlign: 'right' }}>{zahlText(v)}</Text>
          </View>
        ))}
        {b.kategorien.map((k, i) => (
          <View key={'k' + i} style={{ position: 'absolute', left: X(i) - s / 2, top: y0 + 4, width: s, alignItems: 'center' }}>
            {k ? (
              <Text style={{ fontFamily: c.m.schrift, fontSize: g, lineHeight: 1.2, color: NEUTRAL.text, textAlign: 'center' }}>{t(c, k)}</Text>
            ) : (
              <View style={{ width: s * 0.78, height: g * 1.45, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            )}
          </View>
        ))}
        {b.zahlen
          ? werte.map((v, i) =>
              v === null || v === undefined ? null : (
                <View key={'z' + i} style={{ position: 'absolute', left: X(i) - s / 2, top: Y(v) - g * 1.6, width: s, alignItems: 'center' }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: g + 0.5, lineHeight: 1.2, color: c.p.tief }}>{zahlText(v)}</Text>
                </View>
              ),
            )
          : null}
        {b.achsen?.[0] ? (
          <View style={{ position: 'absolute', left: ax, top: y0 + 5 + katH, width: PW, alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: g, lineHeight: 1.2, color: NEUTRAL.leise }}>{t(c, b.achsen[0])}</Text>
          </View>
        ) : null}
      </View>
      {b.linie?.text ? <LinienLegende c={c} text={b.linie.text} links={ax} /> : null}
    </View>
  )
}

function DiagrammLiegend({ c, b }: { c: Ctx; b: DiagrammB }) {
  const g = c.m.klein
  const n = b.kategorien.length
  const { grob, fein } = diagrammSkala(b)
  const lw = Math.min(c.breite * 0.34, Math.max(26, ...b.kategorien.map((k) => textBreite(k, g))) + 12)
  const rechts = 16
  const PW = Math.min(c.breite - lw - rechts, 400)
  const sh = b.hoehe ? b.hoehe / n : 21
  const oben = b.achsen?.[0] ? 20 : 8
  const PH = sh * n
  const yA = oben + PH
  const X = (v: number) => lw + (v / b.max) * PW
  const Yc = (i: number) => oben + (i + 0.5) * sh
  const bh = Math.min(13, sh * 0.62)
  const W = lw + PW + rechts
  const H = yA + 5 + g * 1.5 + (b.achsen?.[1] ? g * 1.5 : 0)
  const werte = b.werte ?? []
  return (
    <View wrap={false} style={{ alignSelf: 'flex-start' }}>
      {b.titel ? (
        <Fliess c={c} klein fett style={{ marginBottom: 2 }}>
          {t(c, b.titel)}
        </Fliess>
      ) : null}
      <View style={{ width: W, height: H }}>
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {fein.map((v) => (
            <Line key={'f' + v} x1={X(v)} y1={oben - 3} x2={X(v)} y2={yA} stroke={GITTER_FEIN} strokeWidth={0.5} />
          ))}
          {grob.map((v) => (v ? <Line key={'g' + v} x1={X(v)} y1={oben - 3} x2={X(v)} y2={yA + 3} stroke={GITTER} strokeWidth={0.7} /> : null))}
          {werte.map((v, i) =>
            v === null || v === undefined || v <= 0 ? null : (
              <G key={'b' + i}>
                <Rect x={lw} y={Yc(i) - bh / 2} width={X(v) - lw} height={bh} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={0.9} />
                {b.einheiten
                  ? Array.from({ length: Math.max(0, Math.ceil(v) - 1) }, (_, k) => (
                      <Line key={k} x1={X(k + 1)} y1={Yc(i) - bh / 2} x2={X(k + 1)} y2={Yc(i) + bh / 2} stroke={c.p.tief} strokeWidth={0.45} />
                    ))
                  : null}
              </G>
            ),
          )}
          {b.linie ? <Line x1={X(b.linie.wert)} y1={oben - 3} x2={X(b.linie.wert)} y2={yA} stroke={WARM} strokeWidth={1.5} strokeDasharray="4 2.5" /> : null}
          <Line x1={lw} y1={oben - 4} x2={lw} y2={yA} stroke={NEUTRAL.tinte} strokeWidth={1.1} />
          <Line x1={lw} y1={yA} x2={W - 5} y2={yA} stroke={NEUTRAL.tinte} strokeWidth={1.1} />
          {pfeilspitze(W, yA, 'r')}
        </Svg>
        {b.achsen?.[0] ? (
          <View style={{ position: 'absolute', left: 0, top: 0, width: lw + PW }}>
            <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: g, lineHeight: 1.2, color: NEUTRAL.leise }}>{t(c, b.achsen[0])}</Text>
          </View>
        ) : null}
        {b.kategorien.map((k, i) => (
          <View key={'k' + i} style={{ position: 'absolute', left: 0, top: Yc(i) - g * 0.72, width: lw - 7, alignItems: 'flex-end' }}>
            {k ? (
              <Text style={{ fontFamily: c.m.schrift, fontSize: g, lineHeight: 1.2, color: NEUTRAL.text, textAlign: 'right' }}>{t(c, k)}</Text>
            ) : (
              <View style={{ width: (lw - 7) * 0.85, height: g * 1.3, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            )}
          </View>
        ))}
        {grob.map((v) => (
          <View key={'s' + v} style={{ position: 'absolute', left: X(v) - 20, top: yA + 4, width: 40, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: g + 0.5, lineHeight: 1.2, color: NEUTRAL.text }}>{zahlText(v)}</Text>
          </View>
        ))}
        {b.zahlen
          ? werte.map((v, i) =>
              v === null || v === undefined ? null : (
                <View key={'z' + i} style={{ position: 'absolute', left: X(v) + 4, top: Yc(i) - g * 0.72, width: 40 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: g + 0.5, lineHeight: 1.2, color: c.p.tief }}>{zahlText(v)}</Text>
                </View>
              ),
            )
          : null}
        {b.achsen?.[1] ? (
          <View style={{ position: 'absolute', left: lw, top: yA + 5 + g * 1.5, width: PW + rechts, alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: g, lineHeight: 1.2, color: NEUTRAL.leise }}>{t(c, b.achsen[1])}</Text>
          </View>
        ) : null}
      </View>
      {b.linie?.text ? <LinienLegende c={c} text={b.linie.text} links={lw} /> : null}
    </View>
  )
}

/** Säulen- bzw. Balkendiagramm mit Achsen, Skala und Gitter – ausgefüllt zum Ablesen oder leer zum Zeichnen. */
export function Diagramm({ c, b }: { c: Ctx; b: DiagrammB }) {
  return b.liegend ? <DiagrammLiegend c={c} b={b} /> : <DiagrammStehend c={c} b={b} />
}

const STRICH_KOPF: Record<string, [string, string, string]> = { de: ['Wert', 'Strichliste', 'Häufigkeit'], fr: ['Valeur', 'Liste de comptage', 'Effectif'] }
const GESAMT: Record<string, string> = { de: 'Gesamt', fr: 'Total' }

/** Striche in Fünferbündeln: vier senkrecht, der fünfte quer darüber. */
export function Striche({ n, h, farbe }: { n: number; h: number; farbe: string }) {
  const d = 3.7
  const bund = 3 * d + 8.5
  const voll = Math.floor(n / 5)
  const rest = n % 5
  const W = Math.max(6, 3 + voll * bund + rest * d + 2)
  const linien: ReactNode[] = []
  const strich = (key: string, x: number) => <Line key={key} x1={x} y1={1} x2={x} y2={h - 1} stroke={farbe} strokeWidth={1.15} strokeLinecap="round" />
  for (let k = 0; k < voll; k++) {
    const x = 3 + k * bund
    for (let j = 0; j < 4; j++) linien.push(strich(`${k}-${j}`, x + j * d))
    linien.push(<Line key={`${k}q`} x1={x - 2} y1={h - 2.4} x2={x + 3 * d + 2} y2={2.4} stroke={farbe} strokeWidth={1.15} strokeLinecap="round" />)
  }
  for (let j = 0; j < rest; j++) linien.push(strich(`r${j}`, 3 + voll * bund + j * d))
  return (
    <Svg width={W} height={h} viewBox={`0 0 ${W} ${h}`}>
      {linien}
    </Svg>
  )
}

export function Strichliste({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'strichliste' }> }) {
  const g = c.m.klein
  const kopf = b.kopf ?? STRICH_KOPF[c.sprache]
  const mitSumme = b.summe !== undefined && b.summe !== false
  const texte = [kopf[0], ...b.zeilen.map((z) => z.text), mitSumme ? GESAMT[c.sprache] : '']
  const w1 = Math.min(c.breite * 0.36, Math.max(34, ...texte.map((s) => textBreite(s, g) + 16)))
  const w3 = Math.min(96, Math.max(56, textBreite(kopf[2], g) + 18))
  const w2 = Math.min(c.breite - w1 - w3, 210)
  const H = 20
  const rahmen = NEUTRAL.rahmen
  const zelle = (key: string, w: number, inhalt: ReactNode, opt: { mitte?: boolean; letzte?: boolean; ton?: string; kopf?: boolean } = {}) => (
    <View
      key={key}
      style={{ width: w, minHeight: H, justifyContent: 'center', alignItems: opt.mitte ? 'center' : 'flex-start', paddingHorizontal: 7, paddingVertical: opt.kopf ? 3 : 0, borderRightWidth: opt.letzte ? 0 : 0.8, borderRightColor: rahmen, backgroundColor: opt.ton }}
    >
      {inhalt}
    </View>
  )
  const text = (s: string, fett?: boolean) => (
    <Fliess c={c} klein fett={fett}>
      {t(c, s)}
    </Fliess>
  )
  // Gezählte Häufigkeit (Zeile mit Strichen) in der Akzentfarbe wie ein Beispiel-Ergebnis, vorgegebene Zahlen in Tinte
  const zahl = (x: number | undefined, ergebnis: boolean) =>
    x === undefined ? null : <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis, lineHeight: 1.2, color: ergebnis ? c.p.tief : NEUTRAL.tinte }}>{String(x)}</Text>
  const alleGezaehlt = b.zeilen.every((z) => z.striche !== undefined && z.anzahl !== undefined)
  return (
    <View wrap={false} style={{ alignSelf: 'flex-start' }}>
      {b.daten?.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: c.breite, marginBottom: 6 }}>
          {b.daten.map((d, i) => (
            <View key={i} style={{ minWidth: 20, height: 16, paddingHorizontal: 5, marginRight: 4, marginBottom: 3, borderWidth: 0.7, borderColor: rahmen, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: g + 0.8, lineHeight: 1, color: NEUTRAL.text }}>{t(c, d)}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={{ width: w1 + w2 + w3, borderWidth: 0.8, borderColor: rahmen, borderRadius: 8 }}>
        <View style={{ flexDirection: 'row', backgroundColor: c.p.zart, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth: 0.8, borderBottomColor: rahmen }}>
          {zelle('k1', w1, text(kopf[0], true), { kopf: true })}
          {zelle('k2', w2, text(kopf[1], true), { kopf: true })}
          {zelle('k3', w3, text(kopf[2], true), { kopf: true, mitte: true, letzte: true })}
        </View>
        {b.zeilen.map((z, i) => (
          <View key={i} style={{ flexDirection: 'row', borderTopWidth: i ? 0.8 : 0, borderTopColor: rahmen }}>
            {zelle('a', w1, text(z.text))}
            {zelle('b', w2, z.striche ? <Striche n={z.striche} h={12.5} farbe={NEUTRAL.tinte} /> : null)}
            {zelle('c', w3, zahl(z.anzahl, z.striche !== undefined), { mitte: true, letzte: true })}
          </View>
        ))}
        {mitSumme ? (
          <View style={{ flexDirection: 'row', borderTopWidth: 1.1, borderTopColor: NEUTRAL.linie }}>
            {zelle('a', w1, text(GESAMT[c.sprache], true))}
            {zelle('b', w2, null, { ton: '#F7F8FB' })}
            {zelle('c', w3, zahl(typeof b.summe === 'number' ? b.summe : undefined, alleGezaehlt), { mitte: true, letzte: true })}
          </View>
        ) : null}
      </View>
    </View>
  )
}

// --- Geometrie in Originalgröße ------------------------------------------------------------------------

type P2 = [number, number]
const RAD = Math.PI / 180
/** Richtung zum Winkel (gegen den Uhrzeigersinn ab rechts; y zeigt nach unten) */
const richtung = (a: number): P2 => [Math.cos(a * RAD), -Math.sin(a * RAD)]
const plus = (a: P2, b: P2, f = 1): P2 => [a[0] + b[0] * f, a[1] + b[1] * f]
const minus = (a: P2, b: P2): P2 => [a[0] - b[0], a[1] - b[1]]
const laenge = (a: P2) => Math.hypot(a[0], a[1])
const einheit = (a: P2): P2 => {
  const l = laenge(a) || 1
  return [a[0] / l, a[1] / l]
}

/** Parameterbereich der Linie A + t(B − A) innerhalb des Feldes (Rand m) */
function innerhalb(A: P2, B: P2, W: number, H: number, m: number): [number, number] {
  let lo = -Infinity
  let hi = Infinity
  const d = minus(B, A)
  for (const [a, dd, min, max] of [
    [A[0], d[0], m, W - m],
    [A[1], d[1], m, H - m],
  ] as [number, number, number, number][]) {
    if (Math.abs(dd) < 1e-9) continue
    const t1 = (min - a) / dd
    const t2 = (max - a) / dd
    lo = Math.max(lo, Math.min(t1, t2))
    hi = Math.min(hi, Math.max(t1, t2))
  }
  return [lo, hi]
}

const LAGE: Record<string, P2> = { o: [0, -1], u: [0, 1], l: [-1, 0], r: [1, 0], ol: [-0.75, -0.75], or: [0.75, -0.75], ul: [-0.75, 0.75], ur: [0.75, 0.75] }
const FLAECHE = { grau: '#ECEFF3', gruen: '#E1EEDA', blau: '#DDEAF6' }

/** Alle Punkte eines Feldes mit Namen (für Verweise in Linien). */
export function geoPunkte(f: GeoFeld): Map<string, P2> {
  const m = new Map<string, P2>()
  for (const e of f.elemente) if (e.t === 'punkt' && e.name) m.set(e.name, [e.x, e.y])
  return m
}

function GeoZeichnung({ c, f, B }: { c: Ctx; f: GeoFeld; B: number }) {
  const H = f.h
  const punkte = geoPunkte(f)
  const P = (p: GeoPunkt): P2 => (typeof p === 'string' ? (punkte.get(p) ?? [0, 0]) : p)
  const linie = 0.3
  const formen: ReactNode[] = []
  const unten: ReactNode[] = []
  const texte: ReactNode[] = []
  const farbeVon = (x?: string) => (x === 'tief' ? c.p.tief : x === 'grau' ? NEUTRAL.sehrLeise : NEUTRAL.tinte)
  /** Text an Punkt p; `n` = Richtung, in die der Text vom Punkt weg liegt (Anker auf der Gegenseite). */
  const beschrift = (key: string, p: P2, text: string, opt: { groesse?: number; fett?: boolean; farbe?: string; links?: boolean; n?: P2 } = {}) => {
    const g = opt.groesse ?? 9.5
    const w = Math.max(14, text.length * g * 0.62 + 6)
    const h = g * 1.7
    const n = opt.n ?? [0, 0]
    const left = opt.links ? p[0] * MM : p[0] * MM - (n[0] < -0.4 ? w : n[0] > 0.4 ? 0 : w / 2)
    const top = p[1] * MM - (n[1] < -0.4 ? h : n[1] > 0.4 ? 0 : h / 2)
    const ausr = opt.links || n[0] > 0.4 ? 'flex-start' : n[0] < -0.4 ? 'flex-end' : 'center'
    texte.push(
      <View key={key} style={{ position: 'absolute', left, top, width: w, height: h, alignItems: ausr, justifyContent: 'center' }}>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: opt.fett === false ? 400 : 600, fontSize: g, lineHeight: 1.2, color: opt.farbe ?? NEUTRAL.text }}>{t(c, text)}</Text>
      </View>,
    )
  }
  f.elemente.forEach((e: GeoElement, i) => {
    const k = 'e' + i
    switch (e.t) {
      case 'flaeche':
        unten.push(<Rect key={k} x={e.x} y={e.y} width={e.b} height={e.h} rx={e.rx ?? 1.5} ry={e.rx ?? 1.5} fill={FLAECHE[e.ton ?? 'grau']} />)
        break
      case 'punkt': {
        const s = 1.15
        if (e.kreuz !== false) {
          formen.push(<Line key={k + 'a'} x1={e.x - s} y1={e.y - s} x2={e.x + s} y2={e.y + s} stroke={NEUTRAL.tinte} strokeWidth={0.28} strokeLinecap="round" />)
          formen.push(<Line key={k + 'b'} x1={e.x - s} y1={e.y + s} x2={e.x + s} y2={e.y - s} stroke={NEUTRAL.tinte} strokeWidth={0.28} strokeLinecap="round" />)
        }
        if (e.name) {
          const lage = e.lage ?? 'o'
          beschrift(k + 't', plus([e.x, e.y], LAGE[lage], lage === 'l' || lage === 'r' ? 2.6 : lage.length === 2 ? 2.4 : 1.9), e.name, { fett: true, n: LAGE[lage] })
        }
        break
      }
      case 'linie': {
        const A = P(e.von)
        const Bp = P(e.bis)
        const art = e.art ?? 'strecke'
        let [t0, t1] = [0, 1]
        if (art !== 'strecke') {
          const [lo, hi] = innerhalb(A, Bp, B, H, 1.5)
          t1 = hi
          if (art === 'gerade') t0 = lo
        }
        const d = minus(Bp, A)
        const a = plus(A, d, t0)
        const z = plus(A, d, t1)
        if (e.stil === 'strasse') {
          unten.push(<Line key={k + 'r'} x1={a[0]} y1={a[1]} x2={z[0]} y2={z[1]} stroke="#D4D9E1" strokeWidth={5.4} />)
          unten.push(<Line key={k} x1={a[0]} y1={a[1]} x2={z[0]} y2={z[1]} stroke="#F4F5F8" strokeWidth={4.6} />)
        } else {
          formen.push(
            <Line key={k} x1={a[0]} y1={a[1]} x2={z[0]} y2={z[1]} stroke={farbeVon(e.farbe)} strokeWidth={e.stil === 'dick' ? 0.7 : linie} strokeDasharray={e.stil === 'gestrichelt' ? '1.2 1' : undefined} strokeLinecap="round" />,
          )
        }
        const n = einheit([d[1], -d[0]])
        const nOben: P2 = n[1] > 0 ? [-n[0], -n[1]] : n
        if (e.name) beschrift(k + 'n', plus(plus(A, d, t1 - 3 / (laenge(d) || 1)), nOben, 1.6), e.name, { fett: false, groesse: 9.5, n: nOben })
        if (e.mass) beschrift(k + 'm', plus(plus(A, d, 0.5), nOben, 1.4), e.mass, { groesse: 9, n: nOben })
        break
      }
      case 'winkel': {
        const V: P2 = [e.x, e.y]
        const r = e.r ?? 22
        const e1 = plus(V, richtung(e.a1), r)
        const e2 = plus(V, richtung(e.a2), e.r2 ?? r)
        formen.push(<Line key={k + 'a'} x1={V[0]} y1={V[1]} x2={e1[0]} y2={e1[1]} stroke={NEUTRAL.tinte} strokeWidth={0.4} strokeLinecap="round" />)
        formen.push(<Line key={k + 'b'} x1={V[0]} y1={V[1]} x2={e2[0]} y2={e2[1]} stroke={NEUTRAL.tinte} strokeWidth={0.4} strokeLinecap="round" />)
        const delta = (((e.a2 - e.a1) % 360) + 360) % 360
        if (e.marke !== false) {
          if (Math.abs(delta - 90) < 0.01) {
            const s = 3.4
            const p1 = plus(V, richtung(e.a1), s)
            const p3 = plus(V, richtung(e.a2), s)
            const p2 = plus(p1, richtung(e.a2), s)
            unten.push(<Polygon key={k + 'q'} points={`${V[0]},${V[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={0.25} />)
          } else {
            const ra = Math.min(6, r * 0.4)
            const s1 = plus(V, richtung(e.a1), ra)
            const s2 = plus(V, richtung(e.a2), ra)
            unten.push(<Path key={k + 'm'} d={`M${V[0]} ${V[1]} L${s1[0]} ${s1[1]} A${ra} ${ra} 0 ${delta > 180 ? 1 : 0} 0 ${s2[0]} ${s2[1]} Z`} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={0.25} />)
          }
        }
        if (e.name) beschrift(k + 'n', plus(V, richtung(e.a1 + delta / 2), Math.min(10, r * 0.6)), e.name, { groesse: 8.5, n: richtung(e.a1 + delta / 2) })
        break
      }
      case 'vieleck': {
        const pk = e.punkte
        const mitte: P2 = [pk.reduce((s, p) => s + p[0], 0) / pk.length, pk.reduce((s, p) => s + p[1], 0) / pk.length]
        unten.push(<Polygon key={k} points={pk.map((p) => p.join(',')).join(' ')} fill={e.fuellung ? c.p.zart : 'none'} stroke="none" />)
        formen.push(<Polygon key={k + 's'} points={pk.map((p) => p.join(',')).join(' ')} fill="none" stroke={NEUTRAL.tinte} strokeWidth={0.4} strokeLinejoin="round" />)
        for (const j of e.rechte ?? []) {
          const V = pk[j]
          const u1 = einheit(minus(pk[(j - 1 + pk.length) % pk.length], V))
          const u2 = einheit(minus(pk[(j + 1) % pk.length], V))
          const s = 3
          const p1 = plus(V, u1, s)
          const p3 = plus(V, u2, s)
          const p2 = plus(p1, u2, s)
          formen.push(<Polygon key={k + 'r' + j} points={`${V[0]},${V[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={0.25} />)
        }
        ;(e.seiten ?? []).forEach((s, j) => {
          if (!s) return
          const A = pk[j]
          const Bq = pk[(j + 1) % pk.length]
          const M: P2 = [(A[0] + Bq[0]) / 2, (A[1] + Bq[1]) / 2]
          let n = einheit([Bq[1] - A[1], A[0] - Bq[0]])
          if (n[0] * (M[0] - mitte[0]) + n[1] * (M[1] - mitte[1]) < 0) n = [-n[0], -n[1]]
          beschrift(k + 's' + j, plus(M, n, 1.5), s, { groesse: 9, n })
        })
        ;(e.ecken ?? []).forEach((s, j) => {
          if (!s) return
          const V = pk[j]
          const u = einheit(minus(V, mitte))
          beschrift(k + 'c' + j, plus(V, u, 1.6), s, { fett: true, n: u })
        })
        break
      }
      case 'text':
        beschrift(k, [e.x, e.y], e.text, { groesse: e.klein ? 7.6 : 9, fett: !!e.fett, farbe: NEUTRAL.leise, links: !e.mitte, n: e.mitte ? [0, 0] : undefined })
        break
      case 'lineal': {
        const x0 = e.x0
        const y = e.y
        const mmZahl = Math.round(e.cm * 10)
        unten.push(<Rect key={k} x={x0 - 4} y={y} width={e.cm * 10 + 8} height={11} rx={1} ry={1} fill="#EAF2FA" stroke="#9DB4CC" strokeWidth={0.25} />)
        for (let j = 0; j <= mmZahl; j++) {
          const l = j % 10 === 0 ? 3.6 : j % 5 === 0 ? 2.5 : 1.5
          formen.push(<Line key={k + 't' + j} x1={x0 + j} y1={y} x2={x0 + j} y2={y + l} stroke={NEUTRAL.tinte} strokeWidth={0.16} />)
        }
        for (let j = 0; j <= e.cm; j++) beschrift(k + 'z' + j, [x0 + j * 10, y + 4.2], String(j), { groesse: 6.4, fett: false, n: [0, 1] })
        break
      }
      case 'uhr': {
        const C: P2 = [e.x, e.y]
        formen.push(<Circle key={k} cx={e.x} cy={e.y} r={e.r} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={0.45} />)
        for (let j = 0; j < 12; j++) {
          const a = j * 30 * RAD
          const l = j % 3 === 0 ? 0.17 : 0.1
          const u: P2 = [Math.sin(a), -Math.cos(a)]
          const p1 = plus(C, u, e.r * (1 - l))
          const p2 = plus(C, u, e.r * 0.93)
          formen.push(<Line key={k + 't' + j} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={NEUTRAL.tinte} strokeWidth={j % 3 === 0 ? 0.4 : 0.25} strokeLinecap="round" />)
        }
        const m = e.m ?? 0
        const ah = ((e.h % 12) + m / 60) * 30 * RAD
        const am = m * 6 * RAD
        const ph = plus(C, [Math.sin(ah), -Math.cos(ah)], e.r * 0.52)
        const pm = plus(C, [Math.sin(am), -Math.cos(am)], e.r * 0.8)
        formen.push(<Line key={k + 'h'} x1={e.x} y1={e.y} x2={ph[0]} y2={ph[1]} stroke={c.p.tief} strokeWidth={0.95} strokeLinecap="round" />)
        formen.push(<Line key={k + 'm'} x1={e.x} y1={e.y} x2={pm[0]} y2={pm[1]} stroke={NEUTRAL.tinte} strokeWidth={0.6} strokeLinecap="round" />)
        formen.push(<Circle key={k + 'c'} cx={e.x} cy={e.y} r={0.9} fill={NEUTRAL.tinte} />)
        break
      }
      case 'laptop': {
        const l = e.l ?? 26
        const V: P2 = [e.x, e.y]
        const bs = plus(V, richtung(e.winkel), l * 0.92)
        formen.push(<Line key={k + 't'} x1={e.x} y1={e.y} x2={e.x + l} y2={e.y} stroke={NEUTRAL.tinte} strokeWidth={1.5} strokeLinecap="round" />)
        formen.push(<Line key={k + 'b'} x1={e.x} y1={e.y} x2={bs[0]} y2={bs[1]} stroke={c.p.tief} strokeWidth={1.2} strokeLinecap="round" />)
        formen.push(<Circle key={k + 'g'} cx={e.x} cy={e.y} r={0.95} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={0.3} />)
        break
      }
    }
  })
  const raster: ReactNode[] = []
  if (f.raster === 'karo') {
    for (let x = 5; x < B; x += 5) raster.push(<Line key={'rx' + x} x1={x} y1={0} x2={x} y2={H} stroke="#E4E8EF" strokeWidth={0.15} />)
    for (let y = 5; y < H; y += 5) raster.push(<Line key={'ry' + y} x1={0} y1={y} x2={B} y2={y} stroke="#E4E8EF" strokeWidth={0.15} />)
  } else if (f.raster === 'punkte') {
    for (let x = 5; x < B; x += 5) for (let y = 5; y < H; y += 5) raster.push(<Circle key={`d${x}-${y}`} cx={x} cy={y} r={0.22} fill="#B7BFCC" />)
  }
  return (
    <View style={{ width: B * MM, height: H * MM }}>
      <Svg width={B * MM} height={H * MM} viewBox={`0 0 ${B} ${H}`}>
        {raster}
        {unten}
        {formen}
      </Svg>
      {texte}
      <View style={{ position: 'absolute', left: 0, top: 0, width: B * MM, height: H * MM, borderWidth: 0.6, borderColor: NEUTRAL.haarlinie, borderRadius: 5 }} />
    </View>
  )
}

/** Breite eines Geo-Feldes in mm (Standard: ganze Spalte). */
export function geoBreite(f: GeoFeld, spalteMm: number): number {
  return f.b ?? Math.floor(spalteMm)
}

export function Geo({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'geo' }> }) {
  const sp = b.spalten ?? Math.min(4, b.felder.length)
  const luecke = 10
  const spalte = (c.breite - (sp - 1) * luecke) / sp
  const reihen: GeoFeld[][] = []
  b.felder.forEach((f, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(f)
  })
  return (
    <View>
      {reihen.map((r, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 10 : 0 }}>
          {r.map((f, i) => {
            const B = Math.min(geoBreite(f, spalte / MM), spalte / MM)
            return (
              <View key={i} style={{ width: spalte, marginLeft: i ? luecke : 0 }}>
                {f.label ? (
                  <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 3 }}>
                    {t(c, f.label)}
                  </Fliess>
                ) : null}
                <GeoZeichnung c={c} f={f} B={B} />
                {f.text !== undefined ? (
                  f.text ? (
                    <View style={{ marginTop: 4 }}>
                      <Zeile c={c} s={f.text} />
                    </View>
                  ) : (
                    <View style={{ width: Math.min(B * MM, 120), height: c.m.basis * 1.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
                  )
                ) : null}
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}
