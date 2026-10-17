// Selbstreflexion für Jugendliche (Bereich `selbstreflexion`, 10/2026): Formen zum Beschreiben (Gedankenwolken, Sprechblasen,
// Bänder, Herzen), Regler zwischen zwei Polen, ein Jahr in Farben und Personen-Karten. Ruhige Linien, zarte Töne, viel Platz –
// wie die Gläser, das Netz und die Kurve: das Blatt lädt zum Innehalten ein, nicht zum Abarbeiten.
import { View, Text, Svg, Path, Circle, Rect, Line } from '@react-pdf/renderer'
import type { Baustein, Sprache } from '../typen'
import { NEUTRAL } from '../zeichnung'
import { SCHRIFT, typo } from './stil'
import { aufhellen, SEKTOR_TOENE } from './design'
import { FARBWORT, Fliess, type Ctx } from './bausteine'

const t = (c: Ctx, s: string | undefined) => (s ? typo(s, c.sprache) : '')
const z = (x: number) => x.toFixed(1)

// --- Formfelder ---------------------------------------------------------------------------------------------------------

type Form = Extract<Baustein, { art: 'formfelder' }>['form']

/** Umriss der Form in einem Kasten w × h (pt); Rand 2 pt, damit der Strich nicht abgeschnitten wird */
function formPfad(form: Form, w: number, h: number): string {
  const P = (x: number, y: number) => `${z(2 + x * (w - 4))} ${z(2 + y * (h - 4))}`
  switch (form) {
    case 'wolke':
      return `M${P(0.17, 0.95)} C${P(0.03, 0.95)} ${P(0, 0.68)} ${P(0.11, 0.6)} C${P(0.03, 0.36)} ${P(0.22, 0.18)} ${P(0.37, 0.27)} C${P(0.43, 0.02)} ${P(0.7, 0)} ${P(0.74, 0.23)} C${P(0.88, 0.12)} ${P(1, 0.32)} ${P(0.93, 0.5)} C${P(1, 0.62)} ${P(0.96, 0.95)} ${P(0.8, 0.95)} Z`
    case 'blase': {
      const r = 12
      const hb = h - 14
      return `M${z(2 + r)} 2 H${z(w - 2 - r)} Q${z(w - 2)} 2 ${z(w - 2)} ${z(2 + r)} V${z(hb - r)} Q${z(w - 2)} ${z(hb)} ${z(w - 2 - r)} ${z(hb)} H${z(w * 0.3)} L${z(w * 0.13)} ${z(h - 2)} L${z(w * 0.17)} ${z(hb)} H${z(2 + r)} Q2 ${z(hb)} 2 ${z(hb - r)} V${z(2 + r)} Q2 2 ${z(2 + r)} 2 Z`
    }
    case 'band':
      return `M2 6 C${z(w * 0.3)} 1 ${z(w * 0.62)} 11 ${z(w - 2)} 4 L${z(w - 2)} ${z(h - 6)} C${z(w * 0.62)} ${z(h - 1)} ${z(w * 0.3)} ${z(h - 11)} 2 ${z(h - 4)} Z`
    case 'herz':
      return `M${P(0.5, 0.98)} C${P(0.12, 0.7)} ${P(0, 0.42)} ${P(0.14, 0.18)} C${P(0.28, 0)} ${P(0.46, 0.06)} ${P(0.5, 0.24)} C${P(0.54, 0.06)} ${P(0.72, 0)} ${P(0.86, 0.18)} C${P(1, 0.42)} ${P(0.88, 0.7)} ${P(0.5, 0.98)} Z`
  }
}

/** Schreibfläche in der Form (Anteile von w und h): links, oben, rechts, unten */
const INNEN: Record<Form, [number, number, number, number]> = {
  wolke: [0.15, 0.3, 0.12, 0.12],
  blase: [0.06, 0.08, 0.06, 0.2],
  band: [0.04, 0.2, 0.04, 0.2],
  herz: [0.24, 0.26, 0.24, 0.3],
}

export function Formfelder({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'formfelder' }> }) {
  const sp = b.spalten ?? (b.form === 'band' ? 1 : b.form === 'herz' ? 3 : 2)
  const items = b.items ?? []
  const n = Math.max(items.length, b.anzahl ?? 0) || sp * 2
  const luecke = b.form === 'band' ? 0 : 12
  const w = (c.breite - luecke * (sp - 1)) / sp
  const zeilen = b.hoehe ?? (b.form === 'band' ? 1.4 : b.form === 'herz' ? 3.4 : 3.3)
  const h = zeilen * c.m.zeile
  const zellen = Array.from({ length: n }, (_, i) => items[i] ?? '')
  const reihen: string[][] = []
  for (let i = 0; i < zellen.length; i += sp) reihen.push(zellen.slice(i, i + sp))
  const ton = (i: number) => (b.form === 'wolke' ? aufhellen(c.p.mittel, 0.9) : b.form === 'herz' ? '#FBE3EC' : aufhellen(SEKTOR_TOENE[i % SEKTOR_TOENE.length], 0.25))
  const rand = b.form === 'band' ? aufhellen(c.p.mittel, 0.35) : c.p.mittel
  // Schreiblinien in Wolke und Blase: zart, nur im unteren Teil der Schreibfläche
  const linien = b.form === 'wolke' || b.form === 'blase' ? Math.max(1, Math.floor(zeilen) - 1) : 0
  return (
    <View>
      {reihen.map((reihe, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? (b.form === 'band' ? 6 : 10) : 0 }}>
          {reihe.map((text, k) => {
            const i = ri * sp + k
            const [l, o, r, u] = INNEN[b.form]
            const innenH = h * (1 - o - u)
            return (
              // die Form im Fluss (nicht absolut: sonst übersah der Seitenumbruch die Höhe und die Herzen liefen in die Fußzeile),
              // die Beschriftung mit negativem Abstand darüber
              <View key={k} style={{ width: w, height: h, marginLeft: k ? luecke : 0 }}>
                <Svg width={w} height={h}>
                  <Path d={formPfad(b.form, w, h)} fill={ton(i)} stroke={rand} strokeWidth={1} />
                  {Array.from({ length: linien }, (_, li) => {
                    const y = h * o + innenH * ((li + 1) / (linien + 0.6))
                    return <Line key={li} x1={w * l} y1={y} x2={w * (1 - r)} y2={y} stroke={aufhellen(c.p.mittel, 0.45)} strokeWidth={0.6} strokeDasharray="2 2.5" />
                  })}
                </Svg>
                {text ? (
                  <View style={{ marginTop: b.form === 'band' ? -h : -h + h * o - 2, marginLeft: w * l, width: w * (1 - l - r), height: b.form === 'band' ? h : undefined, justifyContent: b.form === 'band' ? 'center' : 'flex-start', alignItems: b.form === 'herz' ? 'center' : 'flex-start' }}>
                    <Fliess c={c} klein fett={b.form !== 'band'} farbe={b.form === 'band' ? NEUTRAL.leise : c.p.tief} zentriert={b.form === 'herz'}>
                      {t(c, text)}
                    </Fliess>
                  </View>
                ) : null}
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

// --- Regler zwischen zwei Polen ------------------------------------------------------------------------------------------

export function Regler({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'regler' }> }) {
  const sp = b.spalten ?? (b.paare.length > 6 ? 2 : 1)
  const st = b.stufen ?? 5
  const luecke = 18
  const spaltenB = (c.breite - luecke * (sp - 1)) / sp
  const labelB = sp === 2 ? spaltenB * 0.27 : Math.min(spaltenB * 0.24, 120)
  const spur = spaltenB - 2 * labelB - 12
  const hoch = 16
  const proSpalte = Math.ceil(b.paare.length / sp)
  const spalten = Array.from({ length: sp }, (_, s) => b.paare.slice(s * proSpalte, (s + 1) * proSpalte))
  const zeile = (paar: [string, string], i: number) => (
    <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', minHeight: c.m.zeile * 0.95 }}>
      <View style={{ width: labelB, alignItems: 'flex-end' }}>
        <Fliess c={c} klein style={{ textAlign: 'right' }}>
          {t(c, paar[0])}
        </Fliess>
      </View>
      <Svg width={spur} height={hoch} style={{ marginHorizontal: 6 }}>
        <Rect x={0.6} y={0.6} width={spur - 1.2} height={hoch - 1.2} rx={(hoch - 1.2) / 2} fill="#FFFFFF" stroke={c.p.mittel} strokeWidth={0.9} />
        {Array.from({ length: st }, (_, k) => {
          const x = hoch / 2 + ((spur - hoch) * k) / (st - 1)
          const mitte = k === (st - 1) / 2
          return <Circle key={k} cx={x} cy={hoch / 2} r={mitte ? 2.6 : 2} fill={mitte ? aufhellen(c.p.mittel, 0.5) : aufhellen(c.p.mittel, 0.7)} />
        })}
      </Svg>
      <View style={{ width: labelB }}>
        <Fliess c={c} klein>
          {t(c, paar[1])}
        </Fliess>
      </View>
    </View>
  )
  return (
    <View style={{ flexDirection: 'row' }}>
      {spalten.map((l, s) => (
        <View key={s} style={{ width: spaltenB, marginLeft: s ? luecke : 0 }}>
          {l.map((p, i) => zeile(p, s * proSpalte + i))}
        </View>
      ))}
    </View>
  )
}

// --- Ein Jahr in Farben (je Tag ein Kästchen) ------------------------------------------------------------------------------

const MONATE: Record<Sprache, string[]> = {
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  fr: ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
}
const TAGE_IM_MONAT = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export function Jahr({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'jahr' }> }) {
  const nrB = 16
  const gap = 2
  const legendeB = Math.min(170, c.breite * 0.32)
  const zelleB = Math.min(24, (c.breite - legendeB - nrB - 14 - gap * 12) / 12)
  const zelleH = 10.2
  const rasterB = nrB + 12 * (zelleB + gap)
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ width: rasterB }}>
        <View style={{ flexDirection: 'row', marginBottom: 3, paddingLeft: nrB }}>
          {MONATE[c.sprache].map((m, i) => (
            <View key={i} style={{ width: zelleB, marginRight: gap, alignItems: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, color: c.p.tief }}>{m}</Text>
            </View>
          ))}
        </View>
        {Array.from({ length: 31 }, (_, tag) => (
          <View key={tag} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: gap }}>
            <View style={{ width: nrB, alignItems: 'flex-end', paddingRight: 3 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise }}>{tag + 1}</Text>
            </View>
            {TAGE_IM_MONAT.map((n, m) => (
              <View key={m} style={{ width: zelleB, height: zelleH, marginRight: gap, borderRadius: 2.5, borderWidth: tag < n ? 0.6 : 0, borderColor: aufhellen(c.p.mittel, 0.3), backgroundColor: tag < n ? '#FFFFFF' : NEUTRAL.flaeche }} />
            ))}
          </View>
        ))}
      </View>
      <View style={{ width: legendeB, marginLeft: 14, paddingTop: 12 }}>
        {b.legende.map((l, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 9 }}>
            <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: FARBWORT[l.farbe], borderWidth: 0.8, borderColor: NEUTRAL.tinte, marginRight: 7 }} />
            {l.text ? (
              <Fliess c={c} klein style={{ flex: 1 }}>
                {t(c, l.text)}
              </Fliess>
            ) : (
              <View style={{ flex: 1, height: 14, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

// --- Personen-Karten -------------------------------------------------------------------------------------------------------

/** Ruhige Figur (Kopf und Schultern) als Platzhalter für einen Menschen – ohne Gesicht, damit jede Person passt */
function Figur({ c, w, h, i }: { c: Ctx; w: number; h: number; i: number }) {
  const ton = i % 2 ? aufhellen(SEKTOR_TOENE[(i * 3 + 4) % SEKTOR_TOENE.length], 0) : aufhellen(c.p.mittel, 0.66)
  const rand = aufhellen(c.p.mittel, 0.2)
  const kopf = w * 0.24
  return (
    <Svg width={w} height={h}>
      <Circle cx={w / 2} cy={kopf + 4} r={kopf} fill={ton} stroke={rand} strokeWidth={1} />
      <Path d={`M${z(w * 0.1)} ${z(h - 2)} C${z(w * 0.1)} ${z(kopf * 2 + 14)} ${z(w * 0.3)} ${z(kopf * 2 + 10)} ${z(w / 2)} ${z(kopf * 2 + 10)} C${z(w * 0.7)} ${z(kopf * 2 + 10)} ${z(w * 0.9)} ${z(kopf * 2 + 14)} ${z(w * 0.9)} ${z(h - 2)} Z`} fill={ton} stroke={rand} strokeWidth={1} />
    </Svg>
  )
}

export function Personen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'personen' }> }) {
  const n = b.anzahl ?? 1
  const figB = 58
  return (
    <View>
      {Array.from({ length: n }, (_, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', borderWidth: 0.9, borderColor: c.p.mittel, borderRadius: 12, padding: 10, marginTop: i ? 10 : 0, backgroundColor: '#FFFFFF' }}>
          <View style={{ width: figB, marginRight: 12, alignItems: 'center' }}>
            <Figur c={c} w={figB} h={86} i={i} />
          </View>
          <View style={{ flex: 1 }}>
            {b.felder.map((f, k) => (
              <View key={k} style={{ flexDirection: 'row', alignItems: 'flex-end', minHeight: c.m.zeile * 0.92 }}>
                <Fliess c={c} klein farbe={c.p.tief} fett style={{ marginRight: 6 }}>
                  {t(c, f)}
                </Fliess>
                <View style={{ flex: 1, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, marginBottom: 3 }} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}
