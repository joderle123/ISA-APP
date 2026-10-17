// ---------------------------------------------------------------------------
// Bausteine der Arbeitsblätter als @react-pdf-Komponenten.
// Jeder Baustein bekommt denselben Kontext (Maße der Stufe, Farben des
// Bereichs, Sprache) – dadurch sehen alle Blätter wie aus einem Guss aus.
// ---------------------------------------------------------------------------

import { View, Text, Svg, Path, Circle, Line, Rect, Polygon, Defs, LinearGradient, Stop, G } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Baustein, BildId, ComicFeld, Farbwort, Gefuehl, Rechnung, Sprache, Stufentext, Symbol } from '../typen'
import { bildZeichnung, iconZeichnung, NEUTRAL, type Form, type Palette, type Zeichnung } from '../zeichnung'
import { gefuehlWort, gesichtZeichnung } from '../gesichter'
import { motivZeichnung, VULKAN, HAND, fingerSpitze, EISBERG } from '../motive'
import { Zeichnen, ZeichnungFlaeche, ZeichnungG } from './Zeichnen'
import { ForscherblattBlock } from './Forscherblatt'
import { Bruchbilder, Diagramm, Flaeche, Geo, Hunderterfeld, Kommasprung, Paeckchen, Stellentafel, Strichliste, Temperatur, Treppe, Zahlenstrahl, Zeile } from './mathe'
import { SCHRIFT, TEXTE, typo, type Masse } from './stil'
import { FARBEN, farbTeile, type FarbTeil } from '../spielschule'
import { Anziehpuppe, Bastelbogen, Faedelkarte, Klappbild, Labyrinth, Laufweg, Memory, Minibuch, PunkteVerbinden, SchneidenKleben, Suchbild } from './spielschule'
import { Abhaken, Checkin, Stundenleiste, Wahlkarte, Zielkarte } from './passgenau'
import { Formfelder, Jahr, Personen, Regler } from './reflexion'
import { aufhellen, mischen, SEKTOR_TOENE, verlauf, WASSER, type Design } from './design'
import { duotone, motivFuerIcon } from '../icon-motiv'
import { istSzene, szeneMitFiguren } from '../szenen'

export interface Ctx {
  m: Masse
  p: Palette
  sprache: Sprache
  nummern: Map<Baustein, number>
  /** verfügbare Breite in pt */
  breite: number
  /** Passgenau: Kennung des Teils, das mit diesem Baustein beginnt (Ziel im PDF für die antippbare Vorschau) */
  ids?: Map<Baustein, string>
  /** Gestaltung nach Alter (Motive statt Piktogramme, Duotone, Jugendfiguren – siehe design.ts); ohne Angabe wie bisher */
  design?: Design
  /** Fülle die Restseite: der letzte Baustein dieser Liste darf bis zum Seitenende wachsen (siehe `fuellen`) */
  fuellen?: boolean
}

type Tx = (typeof TEXTE)['de']
const tx = (c: Ctx): Tx => TEXTE[c.sprache]
const t = (c: Ctx, s: string | undefined) => (s ? typo(s, c.sprache) : '')

// --- Grundelemente -----------------------------------------------------------

function Fliess({ c, children, klein, fett, farbe, zentriert, groesse, style }: { c: Ctx; children: ReactNode; klein?: boolean; fett?: boolean; farbe?: string; zentriert?: boolean; groesse?: number; style?: Record<string, unknown> }) {
  const stil = {
    fontFamily: c.m.schrift,
    fontSize: groesse ?? (klein ? c.m.klein : c.m.basis),
    fontWeight: fett ? c.m.fett : 400,
    lineHeight: c.m.lh,
    color: farbe ?? NEUTRAL.text,
    textAlign: (zentriert ? 'center' : 'left') as 'center' | 'left',
    ...style,
  }
  // Farbwort mit Farbpunkt: „Male die Äpfel {rot} an.“
  const teile = typeof children === 'string' && children.includes('{') ? farbTeile(children) : null
  if (teile) return <FarbZeile teile={teile} stil={stil} zentriert={zentriert} />
  return <Text style={stil}>{children}</Text>
}

const SCHRIFT_STIL = new Set(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'textAlign', 'letterSpacing', 'fontStyle'])

/** Text mit Farbpunkten: Wörter als Reihe (bricht zwischen Wörtern um), vor jedem Farbwort ein Punkt in der Farbe. */
function FarbZeile({ teile, stil, zentriert }: { teile: FarbTeil[]; stil: Record<string, unknown>; zentriert?: boolean }) {
  const schrift: Record<string, unknown> = {}
  const rahmen: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(stil)) (SCHRIFT_STIL.has(k) ? schrift : rahmen)[k] = v
  const groesse = Number(schrift.fontSize ?? 12)
  // Wörter sammeln: Leerraum trennt, ein Farbwort hängt am Satzzeichen danach („{rot}.“)
  const woerter: FarbTeil[][] = [[]]
  for (const t of teile) {
    if ('farbe' in t) {
      woerter[woerter.length - 1].push(t)
      continue
    }
    t.text.split(/(\s+)/).forEach((stueck) => {
      if (!stueck) return
      if (/^\s+$/.test(stueck)) woerter.push([])
      else woerter[woerter.length - 1].push({ text: stueck })
    })
  }
  const d = groesse * 0.82
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: zentriert || schrift.textAlign === 'center' ? 'center' : 'flex-start', ...rahmen }}>
      {woerter
        .filter((w) => w.length)
        .map((w, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginRight: groesse * 0.3 }}>
            {w.map((t, k) =>
              'farbe' in t ? (
                <View key={k} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: FARBEN[t.farbe], borderWidth: 0.9, borderColor: NEUTRAL.tinte, marginRight: groesse * 0.22, marginLeft: k ? groesse * 0.12 : 1 }} />
                  <Text style={{ ...schrift, textAlign: 'left' }}>{t.wort}</Text>
                </View>
              ) : (
                <Text key={k} style={{ ...schrift, textAlign: 'left' }}>
                  {t.text}
                </Text>
              ),
            )}
          </View>
        ))}
    </View>
  )
}

/** Kästchen zum Ankreuzen: in der Spielschule mindestens 10 mm. */
const kreuzGroesse = (c: Ctx) => (c.m.layout === 'bild' ? 29 : c.m.kaestchen)

/** Schriftgröße, bei der das längste Wort in die Breite passt (Kinderschrift: ca. 0,54 em je Zeichen). */
function passend(text: string, breite: number, groesse: number, min: number): number {
  const laengstes = Math.max(1, ...text.split(/\s+/).map((w) => w.length))
  return Math.max(min, Math.min(groesse, breite / (laengstes * 0.54)))
}

function Linien({ c, n, hoehe, farbe }: { c: Ctx; n: number; hoehe?: number; farbe?: string }) {
  const h = hoehe ?? c.m.zeile
  return (
    <View>
      {Array.from({ length: Math.max(0, n) }, (_, i) => (
        <View key={i} style={{ height: h, borderBottomWidth: 0.8, borderBottomColor: farbe ?? NEUTRAL.linie }} />
      ))}
    </View>
  )
}

function Kaestchen({ c, rund, groesse }: { c: Ctx; rund?: boolean; groesse?: number }) {
  const k = groesse ?? c.m.kaestchen
  return <View style={{ width: k, height: k, borderWidth: 1.1, borderColor: NEUTRAL.leise, borderRadius: rund ? k / 2 : k * 0.18, backgroundColor: '#FFFFFF' }} />
}

function Nummer({ c, n, d, farbe }: { c: Ctx; n: number | string; d?: number; farbe?: string }) {
  const g = d ?? c.m.nummer
  return (
    <View style={{ width: g, height: g, borderRadius: g / 2, backgroundColor: farbe ?? c.p.tief, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: g * 0.54, color: '#FFFFFF', lineHeight: 1, marginTop: g * 0.02 }}>{String(n)}</Text>
    </View>
  )
}

/** Bild-Verweis in der Gestaltung der Stufe: junge Stufen sehen statt des Piktogramms das farbige Motiv mit derselben Bedeutung,
 *  ältere Stufen statt der Kinderfigur eine Jugendfigur (design.ts, icon-motiv.ts). Ohne `c.design` bleibt der Verweis. */
export function bildAuf(c: Ctx, id: BildId): BildId {
  const d = c.design
  if (!d) return id
  if (d.motive && id.startsWith('icon:')) return motivFuerIcon(id)
  if (d.figuren && id.startsWith('figur:')) {
    const [, name, ...rest] = id.split(':')
    const neu = d.figuren.get(name)
    if (neu) return ['figur', neu, ...rest].join(':')
  }
  return id
}

export function Bild({ c, id, breite, hoehe, ausmalen }: { c: Ctx; id: BildId; breite?: number; hoehe?: number; ausmalen?: boolean }) {
  id = bildAuf(c, id)
  let z = bildZeichnung(id)
  if (id.startsWith('icon:')) {
    // Piktogramme sind für 24 px gezeichnet: groß gedruckt den Strich verfeinern
    const g = Math.min(breite ?? hoehe ?? 24, hoehe ?? breite ?? 24)
    z = { ...z, w: Math.max(0.55, Math.min(1.7, (2.3 * 24) / g)) }
    // Duotone (C3–ES): geschlossene Formen zart in der Bereichsfarbe, die Linie bleibt Tinte
    if (c.design?.duotone && !ausmalen) z = { ...duotone(z, aufhellen(c.p.mittel, 0.8)), w: Math.max(0.7, Math.min(1.7, (2.5 * 24) / g)) }
  }
  return <Zeichnen z={ausmalen ? zumAusmalen(z) : z} p={c.p} breite={breite} hoehe={hoehe} />
}

/** Zeichnung eines Bild-Verweises mit denselben Regeln wie `Bild` (Motiv statt Piktogramm, Duotone, Jugendfigur), für flexible Flächen. */
function bildFlaeche(c: Ctx, id: BildId, g = 70): Zeichnung {
  const eff = bildAuf(c, id)
  let z = bildZeichnung(eff)
  if (eff.startsWith('icon:')) {
    z = { ...z, w: Math.max(0.55, Math.min(1.7, (2.3 * 24) / g)) }
    if (c.design?.duotone) z = { ...duotone(z, aufhellen(c.p.mittel, 0.8)), w: Math.max(0.7, Math.min(1.7, (2.5 * 24) / g)) }
  }
  return z
}

/** Alle Flächen weiß → Vorlage zum Ausmalen. */
export function zumAusmalen(z: Zeichnung): Zeichnung {
  const weiss = (f: Form): Form => {
    if (f.t === 'g') return { ...f, formen: f.formen.map(weiss) }
    if (!f.f || f.f === 'none' || f.f === 'tinte' || f.f === NEUTRAL.tinte || f.f === '#1B2233') return f
    return { ...f, f: 'papier' }
  }
  return { ...z, formen: z.formen.map(weiss) }
}

/** Piktogramm auf zart getöntem Kreis (Leitbilder, Info-Kästen). In den jungen Stufen steht statt des Piktogramms
 *  das Motiv (größer, farbig), in den älteren das Duotone-Piktogramm (etwas größer als der graue Strich). */
export function Plakette({ c, id, d, ton }: { c: Ctx; id: BildId; d: number; ton?: string }) {
  const eff = bildAuf(c, id)
  const istIcon = eff.startsWith('icon:') || !eff.includes(':')
  const g = istIcon ? d * (c.design?.duotone ? 0.6 : 0.52) : d * 0.8
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: ton ?? c.p.zart, alignItems: 'center', justifyContent: 'center' }}>
      <Bild c={c} id={eff} breite={g} hoehe={g} />
    </View>
  )
}

/** Leitbild im Kopf des Blatts, `h` hoch: Motiv (oder Figur) frei auf dem Band; ohne Motiv das Duotone-Piktogramm
 *  auf weißem Kreis (Bilderbuch) bzw. getöntem Quadrat (Magazin). */
export function Leitbild({ c, id, h, b }: { c: Ctx; id: BildId; h: number; b?: number }) {
  const eff = bildAuf(c, id)
  if (!(eff.startsWith('icon:') || !eff.includes(':'))) {
    return (
      <View style={{ height: h, justifyContent: 'center', alignItems: 'center' }}>
        <Bild c={c} id={eff} breite={b ?? h * 1.5} hoehe={h} />
      </View>
    )
  }
  const magazin = !!c.design?.magazin
  const s = Math.min(magazin ? h : h * 0.9, b ?? 999)
  return (
    <View style={{ width: s, height: s, borderRadius: magazin ? s * 0.26 : s / 2, backgroundColor: magazin ? c.p.zart : '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
      <Bild c={c} id={eff} breite={s * 0.58} hoehe={s * 0.58} />
    </View>
  )
}

const SYMBOL_ICON: Record<Symbol, string> = {
  malen: 'icon:brush',
  schreiben: 'icon:pencil',
  lesen: 'icon:book',
  schneiden: 'icon:scissors',
  kleben: 'kleben',
  ankreuzen: 'icon:checkbox',
  einkreisen: 'einkreisen',
  verbinden: 'verbinden',
  sprechen: 'icon:message-circle',
  zuhoeren: 'icon:ear',
  nachdenken: 'icon:bulb',
  zeigen: 'icon:hand-finger',
  partner: 'icon:users',
  gruppe: 'icon:users-group',
}

const EIGENE_SYMBOLE: Record<string, Zeichnung> = {
  kleben: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'rect', x: 8, y: 9, b: 8, h: 12, rx: 1.5, s: 'tinte', f: 'none' },
      { t: 'rect', x: 9, y: 4, b: 6, h: 5, rx: 1, s: 'tinte', f: 'none' },
      { t: 'line', x1: 8, y1: 13, x2: 16, y2: 13, s: 'tinte' },
    ],
  },
  einkreisen: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'path', d: 'M18 7 Q12 2 6 6 Q2 10 4 15 Q7 21 14 20 Q20 18 20 12 Q20 8 16 6', s: 'tinte', f: 'none' },
      { t: 'circle', cx: 12, cy: 12.5, r: 1.6, s: 'none', f: 'tinte' },
    ],
  },
  verbinden: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'circle', cx: 5, cy: 7, r: 2.2, s: 'tinte', f: 'tinte' },
      { t: 'circle', cx: 19, cy: 17, r: 2.2, s: 'tinte', f: 'tinte' },
      { t: 'path', d: 'M7 8 Q14 8 17 15', s: 'tinte', f: 'none' },
    ],
  },
}

function SymbolKachel({ c, s }: { c: Ctx; s: Symbol }) {
  const id = SYMBOL_ICON[s]
  const g = c.m.nummer
  const z = EIGENE_SYMBOLE[id] ?? iconZeichnung(id.replace('icon:', ''))
  return (
    <View style={{ width: g, height: g, borderRadius: g * 0.28, borderWidth: 1, borderColor: NEUTRAL.rahmen, alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
      <Zeichnen z={z} p={c.p} breite={g * 0.66} />
    </View>
  )
}

const FARBWORT: Record<Farbwort, string> = FARBEN

/** Zonenfarben ruhig → heiß */
function zonenFarbe(i: number, n: number): string {
  const reihe = ['#5DAE6B', '#A9C85A', '#EFCB4A', '#EE9A3E', '#D9523F']
  if (n <= 1) return reihe[0]
  const pos = (i / (n - 1)) * (reihe.length - 1)
  return reihe[Math.round(pos)]
}

// --- Bausteine --------------------------------------------------------------------

/** Stufe einer Aufgabe (Mathe): drei kleine Punkte, 1–3 davon gefüllt – Basis, Kern, Plus. */
function StufenPunkte({ c, n }: { c: Ctx; n: 1 | 2 | 3 }) {
  const d = 4.6
  return (
    <View style={{ flexDirection: 'row', marginLeft: 5, marginTop: (c.m.nummer - d) / 2 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ width: d, height: d, borderRadius: d / 2, marginRight: 1.6, backgroundColor: i <= n ? c.p.tief : '#FFFFFF', borderWidth: 0.8, borderColor: i <= n ? c.p.tief : NEUTRAL.sehrLeise }} />
      ))}
    </View>
  )
}

/** Spielschule: Zeichen für die Stufe einer Aufgabe – Stern (für ältere/schnellere Kinder) oder Keimling (Einstieg). */
export function NiveauZeichen({ niveau, g }: { niveau: 'einstieg' | 'stern'; g: number }) {
  if (niveau === 'stern') {
    const pkt = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 ? 4.4 : 10.6
      const a = ((-90 + 36 * i) * Math.PI) / 180
      return `${(12 + r * Math.cos(a)).toFixed(2)},${(12.8 + r * Math.sin(a)).toFixed(2)}`
    }).join(' ')
    return (
      <Svg width={g} height={g} viewBox="0 0 24 24">
        <Polygon points={pkt} fill="#F2C94C" stroke={NEUTRAL.tinte} strokeWidth={1.3} strokeLinejoin="round" />
      </Svg>
    )
  }
  return (
    <View style={{ width: g, height: g, borderRadius: g / 2, backgroundColor: '#E4F2E6', borderWidth: 1.2, borderColor: '#4E9A5C', alignItems: 'center', justifyContent: 'center' }}>
      <Zeichnen z={iconZeichnung('seedling')} p={PAL_GRUEN} breite={g * 0.64} />
    </View>
  )
}
const PAL_GRUEN: Palette = { tinte: '#2F6B3A', tief: '#2F6B3A', mittel: '#9CC9A3', zart: '#E4F2E6', grau: '#9AA2B1', hellgrau: '#E4E8EE', papier: '#FFFFFF', haut: '#F3DCC8', haar: '#4A3B33' }

function Aufgabe({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'aufgabe' }> }) {
  const n = c.nummern.get(b)
  return (
    <View wrap={false} style={{ marginTop: c.m.abstand * 0.7, marginBottom: c.m.abstand * 0.5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {n !== undefined && <Nummer c={c} n={n} />}
        {b.stufe ? <StufenPunkte c={c} n={b.stufe} /> : null}
        {b.niveau ? (
          <View style={{ marginLeft: 4 }}>
            <NiveauZeichen niveau={b.niveau} g={c.m.nummer} />
          </View>
        ) : null}
        {(b.symbole ?? []).map((s) => (
          <SymbolKachel key={s} c={c} s={s} />
        ))}
        <View style={{ flex: 1, marginLeft: 9, paddingTop: Math.max(0, (c.m.nummer - c.m.basis * c.m.lh) / 2) }}>
          <Fliess c={c} fett>
            {t(c, b.text)}
          </Fliess>
          {b.hinweis ? (
            <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ marginTop: 1 }}>
              {t(c, b.hinweis)}
            </Fliess>
          ) : null}
        </View>
      </View>
    </View>
  )
}

const INFO_ICON = { tipp: 'bulb', wissen: 'book', achtung: 'alert-triangle', merke: 'bookmark', hilfe: 'lifebuoy' } as const

function Info({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'info' }> }) {
  const sym = b.symbol ?? 'wissen'
  const titel = b.titel ?? tx(c)[sym]
  return (
    <View wrap={false} style={{ flexDirection: 'row', backgroundColor: c.p.zart, borderRadius: 9, padding: 11, paddingLeft: 12 }}>
      <View style={{ width: 3, borderRadius: 2, backgroundColor: c.p.tief, marginRight: 10 }} />
      <View style={{ marginRight: 9, marginTop: 1 }}>
        <Zeichnen z={iconZeichnung(INFO_ICON[sym])} p={{ ...c.p, tinte: c.p.tief }} breite={c.m.basis * 1.35} />
      </View>
      <View style={{ flex: 1 }}>
        <Fliess c={c} fett farbe={c.p.tief} style={{ marginBottom: 2 }}>
          {t(c, titel)}
        </Fliess>
        {b.text ? <Fliess c={c}>{t(c, b.text)}</Fliess> : null}
        {(b.punkte ?? []).map((x, i) => (
          <View key={i} style={{ flexDirection: 'row', marginTop: 2 }}>
            <View style={{ width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: c.p.tief, marginTop: c.m.basis * 0.55, marginRight: 7 }} />
            <Fliess c={c} style={{ flex: 1 }}>
              {t(c, x)}
            </Fliess>
          </View>
        ))}
      </View>
    </View>
  )
}

/** Szene (mit Figur davor) als Zeichnung, die die Fläche füllt (zugeschnitten, nicht verzerrt). */
function SzeneFlaeche({ c, z, b, h }: { c: Ctx; z: Zeichnung; b: number; h: number }) {
  const [, , vw, vh] = z.vb
  const k = Math.max(b / vw, h / vh)
  return (
    <Svg width={b} height={h} viewBox={`0 0 ${b} ${h}`}>
      <ZeichnungG z={z} p={c.p} x={(b - vw * k) / 2} y={(h - vh * k) / 2} b={vw * k} h={vh * k} />
    </Svg>
  )
}

function Geschichte({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'geschichte' }> }) {
  // Die Figur steht als Porträt im Rahmen: Kopf und Oberkörper groß, die Beine sind abgeschnitten – das Gesicht (und damit das
  // Gefühl) trägt die Geschichte. Der Rahmen ist so hoch wie vorher (117 pt); bei langem Text, der das Kästchen ohnehin hoch macht,
  // wächst er mit (bis 176 pt). So ändert sich die Seitenhöhe nicht. Mit `szene` steht die ganze Figur in der Szene (src/blatt/szenen.ts).
  const klein = c.m.layout === 'jugend' ? 62 : 78
  const eff = b.bild ? bildAuf(c, b.bild) : ''
  const szene = b.szene && c.design && istSzene(b.szene) ? b.szene : undefined
  const figur = !!c.design && eff.startsWith('figur:') && !szene
  let hFig = klein * 1.5
  const breiteVon = (h: number) => (szene ? h * 1.25 : figur ? h * 0.72 : klein)
  if (figur || szene) {
    const fs = c.m.basis
    const zeichenBreite = c.m.layout === 'jugend' ? 0.5 : 0.54
    const textB = c.breite - 24 - 12 - breiteVon(hFig)
    const zeilen = Math.ceil((b.text.length * zeichenBreite * fs * 1.06) / textB)
    const hText = zeilen * fs * (c.m.lh + 0.08) + (b.titel ? c.m.basis * 1.05 * 1.3 + 4 : 0)
    // geschätzt, eher zu klein als zu groß: der Rahmen darf das Kästchen nie höher machen als der Text
    hFig = Math.max(hFig, Math.min(176, hText * 0.88))
  }
  const bildB = breiteVon(hFig)
  const rahmen = { width: bildB, height: hFig - 2, marginRight: 12, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: aufhellen(c.p.mittel, 0.7), overflow: 'hidden' as const, alignItems: 'center' as const }
  return (
    <View wrap={false} style={{ flexDirection: 'row', backgroundColor: c.design ? c.p.zart : NEUTRAL.flaeche, borderRadius: 10, padding: 12 }}>
      {szene ? (
        <View style={rahmen}>
          <SzeneFlaeche c={c} z={szeneMitFiguren(szene, eff.startsWith('figur:') ? [{ bild: eff, x: 0.5, hoehe: 0.74 }] : [])} b={bildB - 2} h={hFig - 4} />
        </View>
      ) : b.bild ? (
        figur ? (
          <View style={rahmen}>
            <View style={{ position: 'absolute', top: hFig * 0.04, left: 0, right: 0, alignItems: 'center' }}>
              <Bild c={c} id={eff} hoehe={hFig * 1.3} />
            </View>
          </View>
        ) : (
          <View style={{ width: klein, marginRight: 12, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Bild c={c} id={b.bild} breite={klein} hoehe={klein * 1.5} />
          </View>
        )
      ) : null}
      <View style={{ flex: 1 }}>
        {b.titel ? (
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 1.05, color: NEUTRAL.text, marginBottom: 4 }}>{t(c, b.titel)}</Text>
        ) : null}
        <Fliess c={c} style={{ lineHeight: c.m.lh + 0.08 }}>
          {t(c, b.text)}
        </Fliess>
      </View>
    </View>
  )
}

const BILD_GROESSE = { s: 60, m: 100, l: 160, xl: 240 }

function Einzelbild({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'bild' }> }) {
  const g = Math.min(BILD_GROESSE[b.groesse ?? 'm'], c.breite)
  const align = b.ausrichtung === 'links' ? 'flex-start' : b.ausrichtung === 'rechts' ? 'flex-end' : 'center'
  return (
    <View wrap={false} style={{ alignItems: align }}>
      <Bild c={c} id={b.bild} breite={g} hoehe={g * 1.3} />
      {b.text ? (
        <Fliess c={c} klein farbe={NEUTRAL.leise} zentriert style={{ marginTop: 4, maxWidth: Math.max(g, 160) }}>
          {t(c, b.text)}
        </Fliess>
      ) : null}
    </View>
  )
}

/** Bausteine aus Reihen nebeneinander (Bilder, Comic, Gesichter, Karten): Eine Spalte damit kann react-pdf nicht
 *  sauber über eine Seite teilen – Inhalt lief über die Fußzeile und überlagerte sich. */
const REIHEN_ARTEN = new Set<Baustein['art']>(['bilder', 'comic', 'gefuehle', 'karten', 'glaeser'])

/** Spalten mit Reihen-Bausteinen (und in der Spielschule immer) brechen als Ganzes nicht um; dann bricht innen nichts um. */
export function spaltenFest(b: Extract<Baustein, { art: 'spalten' }>, layout: string): boolean {
  // `zusammen`: Autor*in entscheidet (z. B. Spalten mit Info-Kästen, die nicht über die Seitengrenze brechen sollen)
  if (b.zusammen !== undefined) return b.zusammen
  return layout === 'bild' || [...b.links, ...b.rechts].some((x) => REIHEN_ARTEN.has(x.art))
}

function Spalten({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'spalten' }> }) {
  const [l, r] = b.verhaeltnis === '2:1' ? [2, 1] : b.verhaeltnis === '1:2' ? [1, 2] : [1, 1]
  const luecke = 16
  const bl = Math.floor((((c.breite - luecke) * l) / (l + r)) * 100) / 100
  const br = Math.floor((c.breite - luecke - bl) * 100) / 100
  const fest = spaltenFest(b, c.m.layout)
  return (
    <View wrap={!fest} style={{ flexDirection: 'row' }}>
      <View style={{ width: bl }}>
        <Bausteine c={{ ...c, breite: bl }} liste={b.links} inSpalte={fest} />
      </View>
      <View style={{ width: luecke }} />
      <View style={{ width: br }}>
        <Bausteine c={{ ...c, breite: br }} liste={b.rechts} inSpalte={fest} />
      </View>
    </View>
  )
}

function Frage({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'frage' }> }) {
  return (
    <View wrap={false}>
      <Fliess c={c}>{t(c, b.text)}</Fliess>
      <Linien c={c} n={b.linien ?? 2} />
    </View>
  )
}

function Satzanfaenge({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'satzanfaenge' }> }) {
  const extra = Math.max(0, (b.linien ?? 1) - 1)
  return (
    <View>
      {b.items.map((s, i) => (
        <View key={i} wrap={false} style={{ marginBottom: 2 }}>
          <View style={{ height: c.m.zeile, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, justifyContent: 'flex-end' }}>
            <Fliess c={c} style={{ marginBottom: 2 }}>
              {t(c, s)}
            </Fliess>
          </View>
          <Linien c={c} n={extra} />
        </View>
      ))}
    </View>
  )
}

function Feld({ c, b, grow }: { c: Ctx; b: Extract<Baustein, { art: 'feld' }>; grow?: boolean }) {
  const h = (b.hoehe ?? 4) * c.m.zeile
  return (
    <View wrap={false} style={{ ...(grow ? { flexGrow: 1, minHeight: h } : { height: h }), borderWidth: 1, borderColor: b.zeichnen ? c.p.mittel : NEUTRAL.rahmen, borderStyle: b.zeichnen ? 'dashed' : 'solid', borderRadius: 10, padding: 9 }}>
      {b.label ? (
        <Fliess c={c} klein fett farbe={NEUTRAL.leise}>
          {t(c, b.label)}
        </Fliess>
      ) : null}
      {b.beispiel ? (
        <Fliess c={c} klein farbe={NEUTRAL.sehrLeise} style={{ marginTop: 2 }}>
          {t(c, tx(c).beispiel + ': ' + b.beispiel)}
        </Fliess>
      ) : null}
      {b.zeichnen ? (
        <View style={{ position: 'absolute', right: 8, bottom: 7, opacity: 0.55 }}>
          <Zeichnen z={iconZeichnung('pencil')} p={{ ...c.p, tinte: c.p.tief }} breite={14} />
        </View>
      ) : null}
    </View>
  )
}

/** Schreiblinien: `grow` füllt den Rest der Seite (mehr Linien, vom Seitenrand abgeschnitten) – mindestens `n` bleiben. */
function LinienBlock({ c, b, grow }: { c: Ctx; b: Extract<Baustein, { art: 'linien' }>; grow?: boolean }) {
  const label = b.label ? (
    <Fliess c={c} klein fett farbe={NEUTRAL.leise}>
      {t(c, b.label)}
    </Fliess>
  ) : null
  if (!grow)
    return (
      <View wrap={false}>
        {label}
        <Linien c={c} n={b.anzahl} />
      </View>
    )
  const h = c.m.zeile
  const w = c.breite
  return (
    <View wrap={false} style={{ flexGrow: 1 }}>
      {label}
      <View style={{ flexGrow: 1, minHeight: b.anzahl * h, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', left: 0, top: 0 }}>
          <Svg width={w} height={MAX_REST + 2} viewBox={`0 0 ${w} ${MAX_REST + 2}`}>
            {Array.from({ length: Math.floor(MAX_REST / h) }, (_, i) => (
              <Line key={i} x1={0} y1={(i + 1) * h - 0.4} x2={w} y2={(i + 1) * h - 0.4} stroke={NEUTRAL.linie} strokeWidth={0.8} />
            ))}
          </Svg>
        </View>
      </View>
    </View>
  )
}

/** Höchste Restseite in pt, die gefüllt werden kann (A4 ohne Kopf und Fuß) */
const MAX_REST = 760

function Tabelle({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'tabelle' }> }) {
  const n = b.spalten.length
  const gew = b.breiten && b.breiten.length === n ? b.breiten : Array(n).fill(1)
  const summe = gew.reduce((a, x) => a + x, 0)
  const breite = (i: number) => `${(gew[i] / summe) * 100}%`
  const d = !!c.design
  // Schrift: C3/C4 mindestens 10 pt (vorher 9,4), C1/C2 mindestens 11 pt; Jugendliche wie bisher kompakt
  const gr = !d ? c.m.klein : c.m.layout === 'mittel' ? 10.5 : c.m.layout === 'jugend' ? c.m.klein : Math.max(c.m.klein, 11)
  // Zeilenhöhe: `hoehe` in Schreibzeilen (für Antworten in ganzen Sätzen), sonst wie bisher
  const zeileH = b.hoehe ? c.m.zeile * b.hoehe : c.m.zeile * (c.m.layout === 'jugend' ? 1.35 : 1.25)
  const kopfTon = d ? mischen(c.p.zart, c.p.mittel, 0.5) : c.p.zart
  const rahmen = d ? aufhellen(c.p.mittel, 0.75) : NEUTRAL.rahmen
  const zelle = (i: number, inhalt: ReactNode, kopf = false, hoehe?: number) => (
    <View key={i} style={{ width: breite(i), borderRightWidth: i < n - 1 ? 0.8 : 0, borderRightColor: rahmen, paddingHorizontal: 6, paddingVertical: kopf ? 5 : 4, justifyContent: kopf ? 'center' : 'flex-start', ...(kopf && b.kopffarben?.[i] ? { backgroundColor: aufhellen(FARBWORT[b.kopffarben[i]], 0.3) } : {}) }}>
      {/* Antwortzellen mit mehreren Zeilen: zarte Schreiblinien */}
      {hoehe && hoehe >= 2
        ? Array.from({ length: Math.floor(hoehe) - 1 }, (_, k) => (
            <View key={k} style={{ position: 'absolute', left: 6, right: 6, top: (k + 1) * c.m.zeile - 0.4, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }} />
          ))
        : null}
      {inhalt}
    </View>
  )
  return (
    <View style={{ borderWidth: 0.8, borderColor: rahmen, borderRadius: 8 }}>
      <View style={{ flexDirection: 'row', backgroundColor: kopfTon, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth: 0.8, borderBottomColor: rahmen }} wrap={false}>
        {b.spalten.map((s, i) =>
          zelle(
            i,
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {b.kopffarben?.[i] ? <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: FARBWORT[b.kopffarben[i]], borderWidth: 0.8, borderColor: NEUTRAL.tinte, marginRight: 4 }} /> : null}
              <Fliess c={c} klein fett groesse={gr} farbe={d ? c.p.tief : undefined} style={{ flex: 1 }}>
                {t(c, s)}
              </Fliess>
            </View>,
            true,
          ),
        )}
      </View>
      {b.beispiel ? (
        // Beispielzeile: so groß wie der Text und in der Akzentfarbe, damit man sie als Vorbild liest (nicht als Grau-in-Grau)
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: rahmen, minHeight: zeileH, backgroundColor: d ? c.p.zart : undefined }} wrap={false}>
          {b.spalten.map((_, i) =>
            zelle(
              i,
              <Fliess c={c} klein groesse={d ? gr : undefined} farbe={d ? c.p.tief : NEUTRAL.leise}>
                {t(c, b.beispiel?.[i] ?? '')}
              </Fliess>,
            ),
          )}
        </View>
      ) : null}
      {(b.werte ?? []).map((w, r) => (
        <View key={'w' + r} style={{ flexDirection: 'row', minHeight: zeileH, borderBottomWidth: r < (b.werte?.length ?? 0) - 1 || b.zeilen > 0 ? 0.8 : 0, borderBottomColor: rahmen }} wrap={false}>
          {b.spalten.map((_, i) => zelle(i, <Fliess c={c} klein groesse={gr}>{t(c, w[i] ?? '')}</Fliess>))}
        </View>
      ))}
      {Array.from({ length: b.zeilen }, (_, r) => (
        <View key={r} style={{ flexDirection: 'row', height: zeileH, borderBottomWidth: r < b.zeilen - 1 ? 0.8 : 0, borderBottomColor: rahmen }} wrap={false}>
          {b.spalten.map((_, i) =>
            zelle(
              i,
              i === 0 && typeof b.nummern === 'number' ? (
                <Fliess c={c} klein groesse={gr} farbe={NEUTRAL.leise}>
                  {String(b.nummern + r)}
                </Fliess>
              ) : null,
              false,
              i === 0 && typeof b.nummern === 'number' ? undefined : b.hoehe,
            ),
          )}
        </View>
      ))}
    </View>
  )
}

function Pfeil({ c, b = 18, farbe }: { c: Ctx; b?: number; farbe?: string }) {
  return (
    <Svg width={b} height={b * 0.7} viewBox="0 0 24 16">
      <Path d="M2 8 L20 8 M14 2 L20 8 L14 14" stroke={farbe ?? c.p.tief} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  )
}

function WennDann({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'wennDann' }> }) {
  const bsp = b.beispiele ?? []
  const zeilen = [...bsp.map((x) => ({ ...x, bsp: true })), ...Array.from({ length: b.zeilen }, () => ({ wenn: '', dann: '', bsp: false }))]
  const kopf = (s: string) => (
    <Fliess c={c} klein fett farbe={c.p.tief}>
      {t(c, s)}
    </Fliess>
  )
  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 3 }}>
        <View style={{ flex: 1 }}>{kopf(b.wenn ?? tx(c).wenn)}</View>
        <View style={{ width: 30 }} />
        <View style={{ flex: 1 }}>{kopf(b.dann ?? tx(c).dann)}</View>
      </View>
      {zeilen.map((z, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <View style={{ flex: 1, borderRadius: 8, backgroundColor: z.bsp ? NEUTRAL.flaeche : '#FFFFFF', borderWidth: z.bsp ? 0 : 1, borderColor: NEUTRAL.rahmen, minHeight: c.m.zeile * 1.7, padding: 7, justifyContent: 'center' }}>
            {z.bsp ? (
              <Fliess c={c} klein farbe={NEUTRAL.leise}>
                {t(c, z.wenn)}
              </Fliess>
            ) : null}
          </View>
          <View style={{ width: 30, alignItems: 'center' }}>
            <Pfeil c={c} />
          </View>
          <View style={{ flex: 1, borderRadius: 8, backgroundColor: z.bsp ? NEUTRAL.flaeche : c.p.zart, borderWidth: z.bsp ? 0 : 1, borderColor: z.bsp ? NEUTRAL.rahmen : c.p.mittel, minHeight: c.m.zeile * 1.7, padding: 7, justifyContent: 'center' }}>
            {z.bsp ? (
              <Fliess c={c} klein farbe={NEUTRAL.leise}>
                {t(c, z.dann)}
              </Fliess>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  )
}

function Blase({ c, text, linien, rechts, denken }: { c: Ctx; text?: string; linien?: number; rechts?: boolean; denken?: boolean }) {
  const rand = rechts ? c.p.tief : NEUTRAL.leise
  return (
    <View style={{ borderWidth: 1.1, borderColor: rand, borderRadius: denken ? 18 : 12, backgroundColor: rechts ? c.p.zart : '#FFFFFF', paddingHorizontal: 10, paddingVertical: text ? 7 : 2 }}>
      {text ? <Fliess c={c}>{t(c, text)}</Fliess> : <Linien c={c} n={linien ?? 2} hoehe={c.m.zeile * 0.95} />}
    </View>
  )
}

function Dialog({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'dialog' }> }) {
  if (b.stil === 'chat') return <ChatVerlauf c={c} b={b} />
  return (
    <View>
      {b.zeilen.map((z, i) => {
        const rechts = i % 2 === 1
        return (
          <View key={i} wrap={false} style={{ flexDirection: rechts ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 7 }}>
            <View style={{ width: 64, alignItems: rechts ? 'flex-start' : 'flex-end', paddingTop: 7, paddingHorizontal: 6 }}>
              <Fliess c={c} klein fett farbe={rechts ? c.p.tief : NEUTRAL.leise} zentriert>
                {t(c, z.wer)}
              </Fliess>
            </View>
            <View style={{ flex: 1, maxWidth: '80%' }}>
              <Blase c={c} text={z.text} linien={2} rechts={rechts} />
            </View>
          </View>
        )
      })}
    </View>
  )
}

/** Handy-Verlauf: Blasen links (weiß) und rechts (getönt) auf einem hellen Chat-Hintergrund, Name über der Blase, optional Uhrzeit darunter.
 *  Ohne Marken und Zeichen echter Apps. Leere Blasen haben Schreiblinien. */
function ChatVerlauf({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'dialog' }> }) {
  const rechtsTon = mischen(c.p.zart, c.p.mittel, 0.5)
  return (
    <View style={{ backgroundColor: NEUTRAL.flaeche, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 16, paddingHorizontal: 12, paddingTop: 8, paddingBottom: 3 }}>
      <View style={{ alignSelf: 'center', width: 34, height: 3.5, borderRadius: 2, backgroundColor: NEUTRAL.rahmen, marginBottom: 8 }} />
      {b.zeilen.map((z, i) => {
        const rechts = i % 2 === 1
        return (
          <View key={i} wrap={false} style={{ alignItems: rechts ? 'flex-end' : 'flex-start', marginBottom: 7 }}>
            <Fliess c={c} klein fett farbe={rechts ? c.p.tief : NEUTRAL.leise} style={{ marginBottom: 1.5, marginHorizontal: 7 }}>
              {t(c, z.wer)}
            </Fliess>
            <View
              style={{
                ...(z.text ? { maxWidth: '80%' } : { width: '80%' }),
                backgroundColor: rechts ? rechtsTon : '#FFFFFF',
                borderWidth: 1,
                borderColor: rechts ? c.p.tief : NEUTRAL.rahmen,
                borderRadius: 14,
                [rechts ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 3,
                paddingHorizontal: 10,
                paddingVertical: z.text ? 6 : 1,
              }}
            >
              {z.text ? <Fliess c={c}>{t(c, z.text)}</Fliess> : <Linien c={c} n={2} hoehe={c.m.zeile * 0.95} />}
            </View>
            {z.zeit ? (
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.sehrLeise, marginTop: 1.5, marginHorizontal: 7 }}>{z.zeit}</Text>
            ) : null}
          </View>
        )
      })}
    </View>
  )
}

function Vertrag({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'vertrag' }> }) {
  const teile = t(c, b.text).split('___')
  return (
    <View wrap={false} style={{ borderWidth: 1.4, borderColor: c.p.tief, borderRadius: 12, padding: 16, paddingTop: 12 }}>
      <View style={{ position: 'absolute', left: 4, right: 4, top: 4, bottom: 4, borderWidth: 0.6, borderColor: c.p.mittel, borderRadius: 9 }} />
      {b.titel ? (
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 1.3, color: c.p.tief, textAlign: 'center', marginBottom: 8, marginTop: 4 }}>{t(c, b.titel)}</Text>
      ) : null}
      <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.basis, lineHeight: 2.1, color: NEUTRAL.text }}>
        {teile.map((x, i) => (
          <Text key={i}>
            {x}
            {i < teile.length - 1 ? <Text style={{ color: NEUTRAL.linie }}>{'_______________________'}</Text> : null}
          </Text>
        ))}
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 18, flexWrap: 'wrap' }}>
        {[...b.unterschriften, tx(c).datumUnterschrift].map((u, i) => (
          <View key={i} style={{ width: `${100 / Math.min(b.unterschriften.length + 1, 4)}%`, paddingRight: 12, marginBottom: b.unterschriften.length > 3 ? 10 : 0 }}>
            <View style={{ height: c.m.zeile, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.tinte }} />
            <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ marginTop: 2 }}>
              {t(c, u)}
            </Fliess>
          </View>
        ))}
      </View>
    </View>
  )
}

function Ankreuzen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'ankreuzen' }> }) {
  const sp = b.spalten ?? 1
  const eintraege: (string | null)[] = [...b.items, ...Array.from({ length: b.frei ?? 0 }, () => null)]
  return (
    <View>
      {b.titel ? (
        <Fliess c={c} fett style={{ marginBottom: 4 }}>
          {t(c, b.titel)}
        </Fliess>
      ) : null}
      {/* in Reihen statt flexWrap: bei ungerader Zahl in zwei Spalten lag die letzte Zeile sonst über dem nächsten Baustein
          (Blind-Bewertung 7, übereinander gedruckter Text) */}
      {Array.from({ length: Math.ceil(eintraege.length / sp) }, (_, ri) => eintraege.slice(ri * sp, ri * sp + sp)).map((reihe, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row' }}>
          {reihe.map((x, i) => (
            <View key={i} wrap={false} style={{ width: `${100 / sp}%`, flexDirection: 'row', alignItems: x === null ? 'flex-end' : c.m.layout === 'bild' ? 'center' : 'flex-start', paddingRight: 10, marginBottom: c.m.layout === 'jugend' ? 5 : 7 }}>
              <View style={{ marginTop: x === null || c.m.layout === 'bild' ? 0 : (c.m.basis * c.m.lh - c.m.kaestchen) / 2, marginRight: 8 }}>
                <Kaestchen c={c} groesse={kreuzGroesse(c)} />
              </View>
              {x === null ? (
                <View style={{ flex: 1, height: c.m.zeile * 0.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
              ) : (
                <Fliess c={c} style={{ flex: 1 }}>
                  {t(c, x)}
                </Fliess>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

/** In Reihen aufteilen (statt flexWrap: gleich breite Karten, die zusammen genau die Breite füllen, brachen durch
 *  Rundung manchmal eine Karte zu früh um – vor allem in Spalten). */
function reihen<T>(liste: T[], sp: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < liste.length; i += sp) out.push(liste.slice(i, i + sp))
  return out
}

/** Bilderreihe als wachsendes Modell: das Bild von heute ist getönt und umrandet (Kurs-Kritik 16.10.) */
const istHeute = (x: { text?: string; heute?: boolean }) => x.heute ?? HEUTE_RE.test(x.text ?? '')

function Bilder({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'bilder' }> }) {
  const luecke = 10
  // in schmalen Spalten nicht mehr Bilder nebeneinander, als sinnvoll Platz haben (mind. ca. 70 pt je Karte)
  const spMax = Math.max(1, Math.floor((c.breite + luecke) / ((b.klein ? 110 : 70) + luecke)))
  const sp = Math.min(b.spalten ?? (b.bilder.length <= 4 ? b.bilder.length : 3), spMax)
  const kb = Math.floor(((c.breite - luecke * (sp - 1)) / sp) * 100) / 100
  if (b.klein) {
    // kompakte Reihe: Motiv (junge Stufen) oder Duotone-Piktogramm auf getöntem Kreis, etwas größer als früher
    const d = c.m.basis * 3.1
    return (
      <View>
        {reihen(b.bilder, sp).map((reihe, k) => (
          <View key={k} wrap={false} style={{ flexDirection: 'row' }}>
            {reihe.map((x, i) => (
              <View key={i} style={{ width: kb, marginRight: i < sp - 1 ? luecke : 0, marginBottom: 6, flexDirection: 'row', alignItems: 'center', ...(istHeute(x) ? { backgroundColor: c.p.zart, borderRadius: 999, borderWidth: 1.5, borderColor: c.p.tief, paddingRight: 6 } : {}) }}>
                <Plakette c={c} id={x.bild} d={d} />
                {x.text ? (
                  /[_[{#]/.test(x.text) && !farbTeile(x.text) ? (
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Zeile c={c} s={x.text} />
                    </View>
                  ) : (
                    <Fliess c={c} fett style={{ marginLeft: 8, flex: 1 }}>
                      {t(c, x.text)}
                    </Fliess>
                  )
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
  // Karten: Motiv 62 % der Zellbreite (statt eines Piktogramms im Kreis, das nur ein Drittel füllte) auf getöntem Kartengrund; die Beschriftung
  // bleibt in C1 und C2 mindestens 11 pt. Die Zellhöhe bleibt wie vorher – die Seitenzahl darf nicht steigen.
  const bildB = Math.min(kb * 0.62, 110)
  const innen = kb - 12
  const minSchrift = c.m.layout === 'bild' || c.m.layout === 'gross' ? 11 : c.m.klein
  const anmalen = b.modus === 'anmalen'
  const grund = c.design ? (anmalen ? '#FFFFFF' : c.p.zart) : undefined
  const rand = c.design ? aufhellen(c.p.mittel, 0.7) : NEUTRAL.haarlinie
  return (
    <View>
      {reihen(b.bilder, sp).map((reihe, k) => (
        <View key={k} wrap={false} style={{ flexDirection: 'row' }}>
          {reihe.map((x, i) => {
            const eff = bildAuf(c, x.bild)
            const pikto = eff.startsWith('icon:') && !anmalen
            return (
              <View key={i} style={{ width: kb, marginRight: i < sp - 1 ? luecke : 0, marginBottom: luecke, borderWidth: istHeute(x) ? 2 : 1, borderColor: istHeute(x) ? c.p.tief : rand, backgroundColor: istHeute(x) ? (c.design ? aufhellen(c.p.mittel, 0.55) : c.p.zart) : grund, borderRadius: 12, alignItems: 'center', paddingVertical: istHeute(x) ? 9 : 10, paddingHorizontal: istHeute(x) ? 5 : 6 }}>
                <View style={{ height: bildB * 0.95, justifyContent: 'center', alignItems: 'center' }}>
                  {pikto ? <Plakette c={c} id={eff} d={bildB * 0.92} ton="#FFFFFF" /> : <Bild c={c} id={eff} breite={bildB} hoehe={bildB * 0.95} ausmalen={anmalen} />}
                </View>
                {x.text ? (
                  <Fliess c={c} zentriert groesse={passend(x.text.replace(/[{}]/g, ''), innen, c.m.basis, minSchrift)} style={{ marginTop: 6, maxWidth: innen }}>
                    {t(c, x.text)}
                  </Fliess>
                ) : null}
                {b.modus === 'ankreuzen' ? (
                  <View style={{ marginTop: 6 }}>
                    <Kaestchen c={c} groesse={kreuzGroesse(c)} />
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

function Wortspeicher({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'wortspeicher' }> }) {
  return (
    <View wrap={false} style={{ borderWidth: 1, borderColor: c.p.mittel, borderRadius: 12, padding: 10, paddingBottom: 4 }}>
      {b.titel ? (
        <Fliess c={c} klein fett farbe={c.p.tief} style={{ marginBottom: 6 }}>
          {t(c, b.titel)}
        </Fliess>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {b.items.map((w, i) => (
          <View key={i} style={{ borderRadius: 20, backgroundColor: c.p.zart, paddingHorizontal: 10, paddingVertical: 3, marginRight: 6, marginBottom: 6 }}>
            <Fliess c={c}>{t(c, w)}</Fliess>
          </View>
        ))}
      </View>
    </View>
  )
}

const SKALA_GESICHTER: Gefuehl[] = ['traurig', 'besorgt', 'neutral', 'ruhig', 'froh']

function Skala({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'skala' }> }) {
  const n = b.stufen ?? 5
  const start = n === 11 ? 0 : 1
  const werte = Array.from({ length: n }, (_, i) => start + i)
  const d = Math.min(c.m.kaestchen * 1.9, (c.breite - 20) / n - 6)
  const gesichter = b.gesichter && n === 5
  // Farbverlauf (Thermometer-Balken) in der Bereichsfarbe: von hell nach kräftig, ohne Ampelfarben – die Skala wertet nicht
  const verlaufB = !!c.design
  const bandH = d + 8
  const gid = 'sk' + c.p.tief.slice(1)
  return (
    <View wrap={false}>
      {b.frage ? <Fliess c={c} style={{ marginBottom: 6 }}>{t(c, b.frage)}</Fliess> : null}
      <View style={{ height: verlaufB ? bandH : undefined, justifyContent: 'center' }}>
        {verlaufB ? (
          <View style={{ position: 'absolute', left: 0, top: 0 }}>
            <Svg width={c.breite} height={bandH} viewBox={`0 0 ${c.breite} ${bandH}`}>
              <Defs>
                <LinearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor={verlauf(c.p, 0.02)} />
                  <Stop offset="0.5" stopColor={verlauf(c.p, 0.5)} />
                  <Stop offset="1" stopColor={verlauf(c.p, 0.95)} />
                </LinearGradient>
              </Defs>
              <Rect x={0} y={0} width={c.breite} height={bandH} rx={bandH / 2} fill={`url(#${gid})`} />
            </Svg>
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: verlaufB ? 4 + 4 : 4 }}>
          {werte.map((w, i) => (
            <View key={w} style={{ alignItems: 'center', width: gesichter ? d * 1.6 : d }}>
              {gesichter ? (
                <Zeichnen z={gesichtZeichnung(SKALA_GESICHTER[i])} p={c.p} breite={d * 1.35} />
              ) : (
                <View style={{ width: d, height: d, borderRadius: d / 2, borderWidth: verlaufB ? 1.3 : 1.1, borderColor: verlaufB ? c.p.tief : NEUTRAL.leise, backgroundColor: verlaufB ? '#FFFFFF' : undefined, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 700, fontSize: d * 0.42, color: verlaufB ? NEUTRAL.text : NEUTRAL.leise }}>{String(w)}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      {verlaufB ? null : <View style={{ height: 3, marginHorizontal: d / 2 + 4, marginTop: 5, borderRadius: 2, backgroundColor: c.p.mittel }} />}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verlaufB ? 3 : 4 }}>
        <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ maxWidth: '45%' }}>
          {t(c, b.von)}
        </Fliess>
        <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ maxWidth: '45%', textAlign: 'right' }}>
          {t(c, b.bis)}
        </Fliess>
      </View>
    </View>
  )
}

function Einschaetzung({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'einschaetzung' }> }) {
  const n = b.optionen.length
  const optB = Math.min(64, (c.breite * 0.46) / n)
  return (
    <View style={{ borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8 }}>
      <View wrap={false} style={{ flexDirection: 'row', backgroundColor: c.design ? mischen(c.p.zart, c.p.mittel, 0.5) : c.p.zart, borderTopLeftRadius: 7.2, borderTopRightRadius: 7.2, paddingVertical: 5 }}>
        <View style={{ flex: 1 }} />
        {b.optionen.map((o, i) => {
          const farbe = b.kopffarben?.[i]
          return (
            <View key={i} style={{ width: optB, paddingHorizontal: 2, alignItems: 'center' }}>
              {farbe ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: FARBWORT[farbe], borderWidth: 0.8, borderColor: NEUTRAL.tinte, marginBottom: 2 }} /> : null}
              <Fliess c={c} klein fett zentriert farbe={c.design ? c.p.tief : undefined}>
                {t(c, o)}
              </Fliess>
            </View>
          )
        })}
      </View>
      {b.items.map((x, r) => (
        <View
          key={r}
          wrap={false}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 0.8,
            borderTopColor: NEUTRAL.haarlinie,
            paddingTop: 5,
            paddingBottom: r === b.items.length - 1 ? 7 : 5,
            backgroundColor: r % 2 ? '#FBFCFD' : '#FFFFFF',
            // letzte Zeile: Ecken des Rahmens frei lassen
            borderBottomLeftRadius: r === b.items.length - 1 ? 7.2 : 0,
            borderBottomRightRadius: r === b.items.length - 1 ? 7.2 : 0,
          }}
        >
          <View style={{ flex: 1, paddingLeft: 8, paddingRight: 6 }}>
            <Fliess c={c}>{t(c, x)}</Fliess>
          </View>
          {b.optionen.map((_, i) => (
            <View key={i} style={{ width: optB, alignItems: 'center' }}>
              <Kaestchen c={c} rund />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function Zuordnen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'zuordnen' }> }) {
  const n = Math.max(b.links.length, b.rechts.length)
  const punkt = (
    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.p.tief }} />
  )
  const kasten = (s: string | undefined, rechts: boolean) =>
    s ? (
      <View style={{ flexDirection: rechts ? 'row' : 'row-reverse', alignItems: 'center' }}>
        {punkt}
        <View style={{ flex: 1, borderWidth: 1, borderColor: NEUTRAL.rahmen, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 9, marginHorizontal: 6 }}>
          <Fliess c={c}>{t(c, s)}</Fliess>
        </View>
      </View>
    ) : null
  return (
    <View wrap={false}>
      {b.titel ? (
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Fliess c={c} klein fett farbe={c.p.tief} style={{ width: '42%' }}>
            {t(c, b.titel[0])}
          </Fliess>
          <View style={{ width: '16%' }} />
          <Fliess c={c} klein fett farbe={c.p.tief} style={{ width: '42%', paddingLeft: 14 }}>
            {t(c, b.titel[1])}
          </Fliess>
        </View>
      ) : null}
      {Array.from({ length: n }, (_, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
          <View style={{ width: '42%' }}>{kasten(b.links[i], false)}</View>
          <View style={{ width: '16%' }} />
          <View style={{ width: '42%' }}>{kasten(b.rechts[i], true)}</View>
        </View>
      ))}
    </View>
  )
}

function Gefuehle({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'gefuehle' }> }) {
  const alle: (Gefuehl | null)[] = [...b.gefuehle, ...Array.from({ length: b.leer ?? 0 }, () => null)]
  const sp = b.spalten ?? Math.min(alle.length, c.m.layout === 'jugend' ? 6 : c.m.layout === 'bild' ? 3 : 4)
  const luecke = 10
  const kb = (c.breite - luecke * (sp - 1)) / sp
  const d = Math.min(kb * 0.7, c.m.layout === 'bild' ? 120 : 84)
  const benennen = b.modus === 'benennen'
  const zeile = (reihe: (Gefuehl | null)[], k: number) => (
    <View key={k} wrap={false} style={{ flexDirection: 'row' }}>
      {reihe.map((g, j) => {
        const i = k * sp + j
        return (
        <View key={i} style={{ width: kb, marginRight: j < sp - 1 ? luecke : 0, alignItems: 'center', marginBottom: 12 }}>
          {g ? (
            <Zeichnen z={gesichtZeichnung(g)} p={c.p} breite={d} />
          ) : (
            <Svg width={d} height={d} viewBox="0 0 100 100">
              <Circle cx={50} cy={52} r={43} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={2.4} strokeDasharray="5 4" />
            </Svg>
          )}
          {g && !benennen ? (
            <Fliess c={c} zentriert style={{ marginTop: 4 }}>
              {b.woerter?.[i] ? t(c, b.woerter[i]) : gefuehlWort(g, c.sprache)}
            </Fliess>
          ) : (
            <View style={{ width: '86%', height: c.m.zeile * 0.9, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
          )}
        </View>
        )
      })}
    </View>
  )
  return <View>{reihen(alle, sp).map(zeile)}</View>
}

type RadFeld = { wort: string; farbe: Farbwort; aussen: string[] }
/** Standard-Gefühlsrad (nach Willcox, 1982): sechs Grundgefühle, je vier genauere Wörter.
 *  Reihenfolge im Uhrzeigersinn ab oben – angenehme Gefühle nebeneinander. */
const RAD: Record<Sprache, RadFeld[]> = {
  de: [
    { wort: 'fröhlich', farbe: 'gelb', aussen: ['begeistert', 'gut gelaunt', 'albern', 'hoffnungsvoll'] },
    { wort: 'stark', farbe: 'orange', aussen: ['stolz', 'mutig', 'selbstsicher', 'wertgeschätzt'] },
    { wort: 'wütend', farbe: 'rot', aussen: ['genervt', 'gereizt', 'gekränkt', 'eifersüchtig'] },
    { wort: 'ängstlich', farbe: 'lila', aussen: ['nervös', 'unsicher', 'überfordert', 'hilflos'] },
    { wort: 'traurig', farbe: 'blau', aussen: ['enttäuscht', 'einsam', 'gelangweilt', 'müde'] },
    { wort: 'ruhig', farbe: 'gruen', aussen: ['entspannt', 'zufrieden', 'geborgen', 'dankbar'] },
  ],
  fr: [
    { wort: 'joyeux', farbe: 'gelb', aussen: ['enthousiaste', 'de bonne humeur', 'blagueur', 'plein d’espoir'] },
    { wort: 'fort', farbe: 'orange', aussen: ['fier', 'courageux', 'sûr de moi', 'apprécié'] },
    { wort: 'en colère', farbe: 'rot', aussen: ['agacé', 'irrité', 'blessé', 'jaloux'] },
    { wort: 'anxieux', farbe: 'lila', aussen: ['nerveux', 'pas sûr de moi', 'débordé', 'impuissant'] },
    { wort: 'triste', farbe: 'blau', aussen: ['déçu', 'seul', 'ennuyé', 'fatigué'] },
    { wort: 'calme', farbe: 'gruen', aussen: ['détendu', 'content', 'en sécurité', 'reconnaissant'] },
  ],
}

function Gefuehlsrad({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'gefuehlsrad' }> }) {
  const felder = b.felder ?? RAD[c.sprache]
  const d = Math.min(c.breite, 440)
  const R = d / 2
  const r1 = R * 0.5
  const r0 = R * 0.14
  const seg = 360 / felder.length
  const pkt = (r: number, a: number): [number, number] => [R + r * Math.sin((a * Math.PI) / 180), R - r * Math.cos((a * Math.PI) / 180)]
  const sektor = (ri: number, ra: number, a0: number, a1: number) => {
    const [x0, y0] = pkt(ra, a0)
    const [x1, y1] = pkt(ra, a1)
    const [x2, y2] = pkt(ri, a1)
    const [x3, y3] = pkt(ri, a0)
    const g = a1 - a0 > 180 ? 1 : 0
    return `M${x0} ${y0} A${ra} ${ra} 0 ${g} 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 ${g} 0 ${x3} ${y3} Z`
  }
  const ring = R - r1
  const wortH = c.m.klein * 1.5
  return (
    <View wrap={false} style={{ alignItems: 'center' }}>
      <View style={{ width: d, height: d }}>
        <Svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
          {felder.map((f, i) => (
            <Path key={`i${i}`} d={sektor(r0, r1, i * seg, (i + 1) * seg)} fill={aufhellen(FARBWORT[f.farbe], 0.62)} stroke="#FFFFFF" strokeWidth={2} />
          ))}
          {felder.flatMap((f, i) => {
            const k = Math.max(f.aussen.length, 1)
            return Array.from({ length: k }, (_, j) => (
              <Path key={`a${i}-${j}`} d={sektor(r1, R - 1, i * seg + (j * seg) / k, i * seg + ((j + 1) * seg) / k)} fill={aufhellen(FARBWORT[f.farbe], 0.22)} stroke="#FFFFFF" strokeWidth={1.4} />
            ))
          })}
          <Circle cx={R} cy={R} r={r0} fill="#FFFFFF" stroke={NEUTRAL.rahmen} strokeWidth={1} />
        </Svg>
        {felder.map((f, i) => {
          const [x, y] = pkt((r0 + r1) / 2 + 2, (i + 0.5) * seg)
          const w = 76
          return (
            <View key={`k${i}`} style={{ position: 'absolute', left: x - w / 2, top: y - c.m.basis * 0.75, width: w, alignItems: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 0.95, color: NEUTRAL.text }}>{t(c, f.wort)}</Text>
            </View>
          )
        })}
        {b.aussenLeer
          ? null
          : felder.flatMap((f, i) =>
              f.aussen.map((wort, j) => {
                const a = i * seg + ((j + 0.5) * seg) / f.aussen.length
                const [x, y] = pkt((r1 + R) / 2, a)
                const w = ring * 0.94
                const drehung = a > 180 ? a + 90 : a - 90
                // gedreht immer in der kompakten Schrift und so klein, dass das Wort in eine Zeile passt (Kurs-Kritik 16.10.: in der
                // Kinderschrift erschien der gedrehte Außenring gar nicht – das Rad blieb außen leer)
                const txt = t(c, wort)
                const fs = Math.min(c.m.klein, (w * 0.96) / Math.max(4, txt.length * 0.52))
                const h = Math.max(wortH, fs * 1.5)
                return (
                  <View key={`w${i}-${j}`} style={{ position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, alignItems: 'center', justifyContent: 'center', transform: `rotate(${drehung}deg)` }}>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: fs, color: NEUTRAL.text }}>{txt}</Text>
                  </View>
                )
              }),
            )}
        {b.mitte ? (
          <View style={{ position: 'absolute', left: R - r0, top: R - c.m.klein * 0.8, width: r0 * 2, alignItems: 'center' }}>
            <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein * 0.9, color: NEUTRAL.leise }}>{t(c, b.mitte)}</Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

function Ampel({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'ampel' }> }) {
  const farben = ['#D9523F', '#EFC44A', '#4FA36C']
  const n = b.linien ?? 2
  const d = c.m.layout === 'jugend' ? 26 : 32
  return (
    <View wrap={false} style={{ flexDirection: 'row' }}>
      <View style={{ width: d + 18, backgroundColor: '#3A4152', borderRadius: (d + 18) / 2, paddingVertical: 10, alignItems: 'center', justifyContent: 'space-around' }}>
        {farben.map((f) => (
          <View key={f} style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: f, borderWidth: 1.5, borderColor: '#1B2233' }} />
        ))}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        {b.stufen.map((s, i) => (
          <View key={i} style={{ flexGrow: 1, justifyContent: 'center', borderLeftWidth: 3, borderLeftColor: farben[i], paddingLeft: 10, paddingVertical: 5, marginBottom: i < 2 ? 8 : 0, backgroundColor: i === 0 ? '#FCEFED' : i === 1 ? '#FDF7E4' : '#EAF5EE', borderTopRightRadius: 8, borderBottomRightRadius: 8, paddingRight: 10 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 1.05, color: NEUTRAL.text }}>{t(c, s.titel)}</Text>
            {s.text ? (
              <Fliess c={c} klein farbe={NEUTRAL.leise}>
                {t(c, s.text)}
              </Fliess>
            ) : null}
            <Linien c={c} n={n} hoehe={c.m.zeile * 0.95} />
          </View>
        ))}
      </View>
    </View>
  )
}

function Thermometer({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'thermometer' }> }) {
  const n = b.stufen.length
  const zonen = [...b.stufen.map((s, i) => ({ s, i }))].reverse() // oben = heiß
  const lin = b.linien ?? 1
  const breite = c.m.layout === 'jugend' ? 30 : 36
  return (
    <View wrap={false} style={{ flexDirection: 'row' }}>
      <View style={{ width: breite + 14, alignItems: 'center' }}>
        <View style={{ flexGrow: 1, minHeight: 60, width: breite * 0.62, borderWidth: 1.6, borderColor: NEUTRAL.tinte, borderTopLeftRadius: breite, borderTopRightRadius: breite, borderBottomWidth: 0, overflow: 'hidden', padding: 3, paddingBottom: 0 }}>
          {zonen.map(({ i }) => (
            <View key={i} style={{ flexGrow: 1, backgroundColor: zonenFarbe(i, n), marginBottom: 2, borderRadius: 3 }} />
          ))}
        </View>
        <View style={{ width: breite, height: breite, borderRadius: breite / 2, backgroundColor: zonenFarbe(0, n), borderWidth: 1.6, borderColor: NEUTRAL.tinte, marginTop: -4 }} />
      </View>
      <View style={{ flex: 1, marginLeft: 10, paddingBottom: breite * 0.7 }}>
        {zonen.map(({ s, i }, k) => (
          <View key={i} style={{ flexGrow: 1, flexDirection: 'row', borderTopWidth: k === 0 ? 0 : 0.8, borderTopColor: NEUTRAL.haarlinie, paddingTop: 5, paddingBottom: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: zonenFarbe(i, n), marginTop: c.m.basis * 0.45, marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Fliess c={c} fett>
                {t(c, s.titel)}
              </Fliess>
              {s.text ? (
                <Fliess c={c} klein farbe={NEUTRAL.leise}>
                  {t(c, s.text)}
                </Fliess>
              ) : null}
              <Linien c={c} n={lin} hoehe={c.m.zeile * 0.9} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const VULKAN_TEXT: Record<Sprache, [Stufentext, Stufentext, Stufentext]> = {
  de: [
    { titel: 'Das bringt mich zum Kochen', text: 'Situationen, Sätze, Dinge' },
    { titel: 'So merke ich, dass es brodelt', text: 'Körper, Gedanken, Stimme' },
    { titel: 'Das tue ich, bevor es ausbricht', text: 'Mein Plan' },
  ],
  fr: [
    { titel: 'Ce qui me fait bouillir', text: 'Situations, phrases, choses' },
    { titel: 'Je sens que ça monte', text: 'Corps, pensées, voix' },
    { titel: 'Ce que je fais avant l’éruption', text: 'Mon plan' },
  ],
}

function Vulkan({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'vulkan' }> }) {
  const stufen = b.stufen ?? VULKAN_TEXT[c.sprache]
  const bildB = c.breite * 0.4
  const farben = ['#EFCB4A', '#EE9A3E', '#D9523F']
  const reihe = [2, 1, 0]
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      <View style={{ width: bildB, justifyContent: 'flex-end' }}>
        <Zeichnen z={motivZeichnung('vulkan')} p={c.p} breite={bildB} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        {reihe.map((i, k) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: k < 2 ? 8 : 0, flexGrow: 1 }}>
            <Nummer c={c} n={i + 1} d={c.m.nummer * 0.9} farbe={farben[i]} />
            <View style={{ flex: 1, marginLeft: 8, borderWidth: 1, borderColor: NEUTRAL.rahmen, borderRadius: 9, padding: 8, paddingBottom: 2 }}>
              <Fliess c={c} fett>
                {t(c, stufen[i].titel)}
              </Fliess>
              {stufen[i].text ? (
                <Fliess c={c} klein farbe={NEUTRAL.leise}>
                  {t(c, stufen[i].text)}
                </Fliess>
              ) : null}
              <Linien c={c} n={2} hoehe={c.m.zeile * 0.9} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
void VULKAN

function Eisberg({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'eisberg' }> }) {
  const bildB = c.breite * 0.42
  const skala = bildB / EISBERG.vb[2]
  const obenH = EISBERG.wasser * skala
  const box = (titel: string, bsp: string | undefined, zeilen: number, ton: string) => (
    <View style={{ borderRadius: 9, backgroundColor: ton, padding: 9, paddingBottom: 3 }}>
      <Fliess c={c} fett>
        {t(c, titel)}
      </Fliess>
      {bsp ? (
        <Fliess c={c} klein farbe={NEUTRAL.leise}>
          {t(c, tx(c).beispiel + ': ' + bsp)}
        </Fliess>
      ) : null}
      <Linien c={c} n={zeilen} hoehe={c.m.zeile * 0.9} />
    </View>
  )
  return (
    <View wrap={false} style={{ flexDirection: 'row' }}>
      <View style={{ width: bildB }}>
        <Zeichnen z={motivZeichnung('eisberg')} p={c.p} breite={bildB} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <View style={{ minHeight: obenH }}>{box(b.oben, b.beispielOben, 2, NEUTRAL.flaeche)}</View>
        <View style={{ marginTop: 10, flexGrow: 1 }}>{box(b.unten, b.beispielUnten, 6, '#EAF2F8')}</View>
      </View>
    </View>
  )
}

function Koerper({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'koerper' }> }) {
  const h = c.m.layout === 'bild' ? 330 : 290
  return (
    <View wrap={false}>
      {b.frage ? <Fliess c={c} style={{ marginBottom: 6 }}>{t(c, b.frage)}</Fliess> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Zeichnen z={motivZeichnung('koerper')} p={c.p} hoehe={h} />
        </View>
        {b.legende && b.legende.length ? (
          <View style={{ width: '44%' }}>
            {b.legende.map((l, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: c.m.kaestchen * 1.5, height: c.m.kaestchen * 1.5, borderRadius: c.m.kaestchen * 0.75, backgroundColor: FARBWORT[l.farbe], borderWidth: 1, borderColor: NEUTRAL.tinte, marginRight: 9 }} />
                <Fliess c={c} style={{ flex: 1 }}>
                  {t(c, l.text)}
                </Fliess>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  )
}

/** Leere Batterie mit fünf Feldern zum Ausmalen (statt 3 von 5 gefüllt, was wie ein Ergebnis wirkt). */
function BatterieLeer({ w }: { w: number }) {
  return (
    <Svg width={w} height={w * 0.42} viewBox="0 0 200 84">
      <Rect x={4} y={6} width={176} height={72} rx={14} fill="#FFFFFF" stroke={NEUTRAL.tinte} strokeWidth={4} />
      <Rect x={184} y={28} width={12} height={28} rx={4} fill={NEUTRAL.tinte} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Rect key={i} x={15 + i * 32} y={17} width={27} height={50} rx={5} fill="#FFFFFF" stroke={NEUTRAL.sehrLeise} strokeWidth={2} strokeDasharray="4 3" />
      ))}
    </Svg>
  )
}

function Batterie({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'batterie' }> }) {
  const n = b.linien ?? 4
  const spalte = (titel: string, icon: string, ton: string, rand: string) => (
    <View style={{ flex: 1, borderRadius: 10, backgroundColor: ton, borderWidth: 1, borderColor: rand, padding: 10, paddingBottom: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        <Zeichnen z={iconZeichnung(icon)} p={c.p} breite={c.m.basis * 1.3} />
        <Fliess c={c} fett style={{ marginLeft: 6, flex: 1 }}>
          {t(c, titel)}
        </Fliess>
      </View>
      <Linien c={c} n={n} hoehe={c.m.zeile * 0.92} />
    </View>
  )
  return (
    <View wrap={false}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        {b.leer ? <BatterieLeer w={Math.min(170, c.breite * 0.4)} /> : <Zeichnen z={motivZeichnung('batterie')} p={c.p} breite={Math.min(170, c.breite * 0.4)} />}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {spalte(b.laden, 'battery-4', '#EAF5EE', '#BFDCC8')}
        <View style={{ width: 12 }} />
        {spalte(b.leeren, 'battery-1', '#FCEFED', '#F0C9C0')}
      </View>
    </View>
  )
}

function Waage({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'waage' }> }) {
  const n = b.zeilen ?? 4
  return (
    <View wrap={false}>
      <View style={{ alignItems: 'center' }}>
        <Zeichnen z={motivZeichnung('waage')} p={c.p} breite={Math.min(220, c.breite * 0.5)} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>
        {[b.links, b.rechts].map((s, i) => (
          <View key={i} style={{ flex: 1, marginLeft: i ? 14 : 0, borderTopWidth: 3, borderTopColor: c.p.tief, paddingTop: 6 }}>
            <Fliess c={c} fett zentriert>
              {t(c, s)}
            </Fliess>
            <Linien c={c} n={n} hoehe={c.m.zeile * 0.95} />
          </View>
        ))}
      </View>
    </View>
  )
}

function Leiter({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'leiter' }> }) {
  const n = b.stufen
  const stufeH = c.m.zeile * 1.45
  const versatz = (c.breite * 0.34) / Math.max(1, n - 1)
  const reihe = Array.from({ length: n }, (_, i) => n - 1 - i) // oben = schwerste Stufe
  return (
    <View wrap={false}>
      {b.oben ? (
        <Fliess c={c} klein fett farbe={c.p.tief} style={{ textAlign: 'right', marginBottom: 3 }}>
          {t(c, b.oben)}
        </Fliess>
      ) : null}
      {reihe.map((i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-end', height: stufeH, marginLeft: versatz * i }}>
          <View style={{ flex: 1, height: stufeH - 4, flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 3, borderBottomColor: c.p.tief, borderLeftWidth: HEUTE_RE.test(b.beispiele?.[i] ?? '') ? 4 : 1, borderLeftColor: HEUTE_RE.test(b.beispiele?.[i] ?? '') ? c.p.tief : c.p.mittel, backgroundColor: i % 2 ? c.p.zart : '#FFFFFF', paddingLeft: 6, paddingBottom: 4 }}>
            <Nummer c={c} n={i + 1} d={c.m.nummer * 0.85} />
            <View style={{ flex: 1, marginLeft: 8, marginRight: 8, height: c.m.zeile * 0.8, justifyContent: 'flex-end', borderBottomWidth: b.beispiele?.[i] ? 0 : 0.8, borderBottomColor: NEUTRAL.linie }}>
              {b.beispiele?.[i] ? (
                <Fliess c={c} klein fett={HEUTE_RE.test(b.beispiele[i])} farbe={HEUTE_RE.test(b.beispiele[i]) ? c.p.tief : NEUTRAL.leise}>
                  {t(c, b.beispiele[i])}
                </Fliess>
              ) : null}
            </View>
          </View>
        </View>
      ))}
      {b.unten ? (
        <Fliess c={c} klein fett farbe={c.p.tief} style={{ marginTop: 3 }}>
          {t(c, b.unten)}
        </Fliess>
      ) : null}
    </View>
  )
}

function Zielscheibe({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'zielscheibe' }> }) {
  const n = b.ringe.length
  // Viele oder lange Ringnamen passen nicht in die schmalen Ringe: dann stehen nur Nummern auf der Scheibe und die Namen als Liste daneben
  const daneben = b.daneben ?? (n >= 5 || b.ringe.some((r) => r.length > 14))
  const d = daneben ? Math.min(c.breite * 0.56, 290) : Math.min(c.breite, c.m.layout === 'jugend' ? 330 : 360)
  const r = d / 2
  const schritt = r / (n + 0.8)
  const toene = [c.p.zart, '#FFFFFF']
  const scheibe = (
    <View style={{ width: d, height: d }}>
      <Svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
        {b.ringe.map((_, i) => (
          <Circle key={i} cx={r} cy={r} r={r - i * schritt - 1} fill={toene[i % 2]} stroke={c.p.tief} strokeWidth={1.2} />
        ))}
        <Circle cx={r} cy={r} r={schritt * 0.8} fill={c.p.mittel} stroke={c.p.tief} strokeWidth={1.4} />
      </Svg>
      {b.ringe.map((s, i) =>
        daneben ? (
          <View key={i} style={{ position: 'absolute', top: i * schritt + (schritt - 14) / 2 + 1, left: 0, right: 0, alignItems: 'center' }}>
            <Nummer c={c} n={i + 1} d={14} />
          </View>
        ) : (
          <View key={i} style={{ position: 'absolute', top: i * schritt + 5, left: 0, right: 0, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 6 }}>
              <Fliess c={c} klein fett farbe={c.p.tief}>
                {t(c, s)}
              </Fliess>
            </View>
          </View>
        ),
      )}
      <View style={{ position: 'absolute', top: r - 9, left: 0, right: 0, alignItems: 'center' }}>
        <Fliess c={c} fett>
          {t(c, b.mitte ?? tx(c).ich)}
        </Fliess>
      </View>
    </View>
  )
  if (!daneben)
    return (
      <View wrap={false} style={{ alignItems: 'center' }}>
        {scheibe}
      </View>
    )
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center' }}>
      {scheibe}
      <View style={{ flex: 1, marginLeft: 16 }}>
        {b.ringe.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
            <Nummer c={c} n={i + 1} d={c.m.nummer * 0.85} />
            <View style={{ flex: 1, marginLeft: 8, minHeight: c.m.zeile * 0.9, justifyContent: 'flex-end', borderBottomWidth: s ? 0 : 0.8, borderBottomColor: NEUTRAL.linie }}>
              {s ? (
                <Fliess c={c} fett>
                  {t(c, s)}
                </Fliess>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function Hand({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'hand' }> }) {
  const h = c.m.layout === 'bild' ? 300 : 250
  const skala = h / HAND.vb[3]
  const bildB = HAND.vb[2] * skala
  const finger = b.finger ?? ['', '', '', '', '']
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: bildB, height: h }}>
        <Zeichnen z={motivZeichnung('hand')} p={c.p} breite={bildB} />
        {[0, 1, 2, 3, 4].map((i) => {
          const [x, y] = fingerSpitze(i)
          const d = c.m.nummer * 0.85
          return (
            <View key={i} style={{ position: 'absolute', left: x * skala - d / 2, top: y * skala + 4 }}>
              <Nummer c={c} n={i + 1} d={d} />
            </View>
          )
        })}
        {b.mitte ? (
          <View style={{ position: 'absolute', left: 60 * skala, top: 170 * skala, width: 96 * skala, alignItems: 'center' }}>
            <Fliess c={c} fett zentriert>
              {t(c, b.mitte)}
            </Fliess>
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        {finger.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 }}>
            <Nummer c={c} n={i + 1} d={c.m.nummer * 0.85} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              {f ? (
                <Fliess c={c} klein farbe={NEUTRAL.leise}>
                  {t(c, f)}
                </Fliess>
              ) : null}
              <View style={{ height: c.m.zeile * 0.95, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function Mindmap({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'mindmap' }> }) {
  const aeste = b.aeste && b.aeste.length ? b.aeste : Array.from({ length: b.anzahl ?? 6 }, () => '')
  const n = aeste.length
  const W = c.breite
  const H = c.m.layout === 'jugend' ? 250 : 280
  const cx = W / 2
  const cy = H / 2
  const kb = Math.min(150, W * 0.3)
  const kh = c.m.zeile * 2.4
  const rx = W / 2 - kb / 2 - 2
  const ry = H / 2 - kh / 2 - 2
  const pos = aeste.map((_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
  })
  return (
    <View wrap={false} style={{ width: W, height: H }}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {pos.map(([x, y], i) => (
          <Line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={c.p.mittel} strokeWidth={2} />
        ))}
      </Svg>
      <View style={{ position: 'absolute', left: cx - 70, top: cy - 26, width: 140, height: 52, borderRadius: 26, backgroundColor: c.p.tief, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis, color: '#FFFFFF', textAlign: 'center' }}>{t(c, b.mitte)}</Text>
      </View>
      {pos.map(([x, y], i) => (
        <View key={i} style={{ position: 'absolute', left: x - kb / 2, top: y - kh / 2, width: kb, height: kh, borderRadius: 10, borderWidth: 1, borderColor: c.p.mittel, backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingTop: 4 }}>
          {aeste[i] ? (
            <Fliess c={c} klein fett farbe={c.p.tief}>
              {t(c, aeste[i])}
            </Fliess>
          ) : null}
          <Linien c={c} n={aeste[i] ? 1 : 2} hoehe={c.m.zeile * 0.8} />
        </View>
      ))}
    </View>
  )
}

/** „heute“ in einer Kette oder auf einer Leiter-Sprosse (Kurse: „Heute: …“, « aujourd’hui ») */
const HEUTE_RE = /(^|[\s(–-])(heute|aujourd[’']hui)\b/i

function Schritte({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'schritte' }> }) {
  const lin = b.linien ?? 1
  if (b.stil === 'kette' || b.stil === 'weg') {
    const n = b.items.length
    // nur der Schritt von heute ist getönt (Kurs-Kritik 16.10.: abwechselnd getönte Kästchen sahen aus wie „schon erledigt“)
    const heute = b.items.map((s) => s.heute ?? HEUTE_RE.test(`${s.titel} ${s.text ?? ''}`))
    return (
      <View wrap={false} style={{ flexDirection: 'row', alignItems: 'stretch' }}>
        {b.items.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'stretch', borderRadius: 10, borderWidth: heute[i] ? 2 : 1, borderColor: heute[i] ? c.p.tief : c.p.mittel, backgroundColor: heute[i] ? c.p.zart : '#FFFFFF', padding: heute[i] ? 7 : 8, paddingBottom: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                <Nummer c={c} n={i + 1} d={c.m.nummer * 0.8} />
                <Fliess c={c} fett style={{ marginLeft: 6, flex: 1 }} groesse={c.m.basis * (n > 3 ? 0.9 : 1)}>
                  {t(c, s.titel)}
                </Fliess>
              </View>
              {s.text ? (
                <Fliess c={c} klein farbe={NEUTRAL.leise}>
                  {t(c, s.text)}
                </Fliess>
              ) : null}
              <Linien c={c} n={lin} hoehe={c.m.zeile * 0.85} />
            </View>
            {i < n - 1 ? (
              <View style={{ width: 16, alignItems: 'center' }}>
                <Pfeil c={c} b={13} />
              </View>
            ) : null}
          </View>
        ))}
      </View>
    )
  }
  return (
    <View>
      {b.items.map((s, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row' }}>
          <View style={{ width: c.m.nummer, alignItems: 'center' }}>
            <Nummer c={c} n={i + 1} />
            {i < b.items.length - 1 ? <View style={{ flexGrow: 1, width: 2, backgroundColor: c.p.mittel, marginVertical: 2 }} /> : null}
          </View>
          <View style={{ flex: 1, marginLeft: 10, paddingBottom: 8 }}>
            <Fliess c={c} fett style={{ paddingTop: Math.max(0, (c.m.nummer - c.m.basis * c.m.lh) / 2) }}>
              {t(c, s.titel)}
            </Fliess>
            {s.text ? (
              <Fliess c={c} klein farbe={NEUTRAL.leise}>
                {t(c, s.text)}
              </Fliess>
            ) : null}
            <Linien c={c} n={lin} hoehe={c.m.zeile * 0.9} />
          </View>
        </View>
      ))}
    </View>
  )
}

const TAGE: Record<Sprache, string[]> = { de: ['Mo', 'Di', 'Mi', 'Do', 'Fr'], fr: ['Lu', 'Ma', 'Me', 'Je', 'Ve'] }

function Stern({ d }: { d: number }) {
  const pkt = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / 5
    const r = i % 2 ? 4.2 : 10
    return `${(12 + r * Math.cos(a)).toFixed(2)},${(12.6 + r * Math.sin(a)).toFixed(2)}`
  }).join(' ')
  return (
    <Svg width={d} height={d} viewBox="0 0 24 24">
      <Polygon points={pkt} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={1.3} strokeLinejoin="round" />
    </Svg>
  )
}

function Plan({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'plan' }> }) {
  const tage = b.tage ?? TAGE[c.sprache]
  const symbol = b.symbol ?? 'gesicht'
  const zelleB = Math.min(58, (c.breite * 0.55) / tage.length)
  const d = Math.min(zelleB * 0.62, c.m.kaestchen * 2)
  const zeichen = () =>
    symbol === 'kasten' ? (
      <Kaestchen c={c} />
    ) : symbol === 'stern' ? (
      <Stern d={d} />
    ) : (
      <Svg width={d} height={d} viewBox="0 0 100 100">
        <Circle cx={50} cy={50} r={44} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={4} />
        <Circle cx={36} cy={42} r={4.5} fill={NEUTRAL.sehrLeise} />
        <Circle cx={64} cy={42} r={4.5} fill={NEUTRAL.sehrLeise} />
      </Svg>
    )
  return (
    <View wrap={false}>
      {b.ziel !== undefined ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: c.p.zart, borderRadius: 9, padding: 9, marginBottom: 8 }}>
          <Fliess c={c} fett farbe={c.p.tief}>
            {t(c, tx(c).meinZiel + ':')}
          </Fliess>
          <View style={{ flex: 1, marginLeft: 8, minHeight: c.m.zeile * 0.8, justifyContent: 'flex-end', borderBottomWidth: b.ziel ? 0 : 0.8, borderBottomColor: NEUTRAL.linie }}>
            {b.ziel ? <Fliess c={c}>{t(c, b.ziel)}</Fliess> : null}
          </View>
        </View>
      ) : null}
      <View style={{ borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8 }}>
        <View style={{ flexDirection: 'row', backgroundColor: NEUTRAL.flaeche, borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingVertical: 4 }}>
          <View style={{ flex: 1 }} />
          {tage.map((tg) => (
            <View key={tg} style={{ width: zelleB, alignItems: 'center' }}>
              <Fliess c={c} klein fett>
                {tg}
              </Fliess>
            </View>
          ))}
        </View>
        {b.zeilen.map((z, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.8, borderTopColor: NEUTRAL.haarlinie, minHeight: d + 12, paddingVertical: 4 }}>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              {z ? <Fliess c={c}>{t(c, z)}</Fliess> : <View style={{ height: c.m.zeile * 0.7, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />}
            </View>
            {tage.map((tg) => (
              <View key={tg} style={{ width: zelleB, alignItems: 'center', borderLeftWidth: 0.8, borderLeftColor: NEUTRAL.haarlinie, alignSelf: 'stretch', justifyContent: 'center' }}>
                {zeichen()}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

function Tagesplan({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'tagesplan' }> }) {
  const zeilen = [...b.zeilen, ...Array.from({ length: b.leer ?? 0 }, () => ({}) as { zeit?: string; text?: string; bild?: BildId })]
  const bildD = c.m.layout === 'bild' ? 52 : c.m.layout === 'gross' ? 42 : 32
  return (
    <View>
      {zeilen.map((z, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: i ? 0.8 : 0, borderTopColor: NEUTRAL.haarlinie, paddingVertical: 5 }}>
          <View style={{ width: 54 }}>
            {z.zeit ? (
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 0.95, color: c.p.tief }}>{z.zeit}</Text>
            ) : (
              <View style={{ width: 44, height: c.m.zeile * 0.7, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            )}
          </View>
          <View style={{ width: bildD + 8, height: bildD, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: z.bild ? c.p.zart : '#FFFFFF', borderWidth: z.bild ? 0 : 1, borderColor: NEUTRAL.haarlinie, borderStyle: 'dashed', marginRight: 10 }}>
            {z.bild ? <Bild c={c} id={z.bild} breite={bildD * 0.62} hoehe={bildD * 0.8} /> : null}
          </View>
          <View style={{ flex: 1 }}>
            {z.text ? <Fliess c={c}>{t(c, z.text)}</Fliess> : <View style={{ height: c.m.zeile * 0.8, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />}
          </View>
        </View>
      ))}
    </View>
  )
}

const ATEM: Record<Sprache, Record<string, string[]>> = {
  de: {
    quadrat: ['Einatmen – 4 Sekunden', 'Luft halten – 4', 'Ausatmen – 4', 'Pause – 4'],
    ballon: ['Lege eine Hand auf den Bauch.', 'Atme langsam durch die Nase ein. Der Bauch wird rund wie ein Ballon.', 'Atme langsam durch den Mund aus. Der Ballon wird wieder klein.', 'Wiederhole das fünfmal.'],
    blume: ['Rieche an der Blume: langsam durch die Nase einatmen.', 'Puste die Kerze aus: langsam durch den Mund ausatmen.', 'Die Flamme soll nur flackern, nicht ausgehen.'],
    'fuenf-sinne': ['Dinge, die ich sehe', 'Dinge, die ich fühle', 'Dinge, die ich höre', 'Dinge, die ich rieche', 'Ding, das ich schmecke'],
    finger: ['Fahre mit dem Finger der anderen Hand an deinen Fingern entlang.', 'Hoch am Finger: einatmen.', 'Runter am Finger: ausatmen.', 'Fünf Finger – fünf ruhige Atemzüge.'],
  },
  fr: {
    quadrat: ['Inspirer – 4 secondes', 'Retenir – 4', 'Expirer – 4', 'Pause – 4'],
    ballon: ['Pose une main sur ton ventre.', 'Inspire lentement par le nez : ton ventre se gonfle comme un ballon.', 'Expire lentement par la bouche : le ballon se dégonfle.', 'Recommence cinq fois.'],
    blume: ['Sens la fleur : inspire lentement par le nez.', 'Souffle la bougie : expire lentement par la bouche.', 'La flamme doit vaciller, pas s’éteindre.'],
    'fuenf-sinne': ['choses que je vois', 'choses que je touche', 'choses que j’entends', 'choses que je sens', 'chose que je goûte'],
    finger: ['Avec un doigt de l’autre main, suis le contour de tes doigts.', 'Quand tu montes : inspire.', 'Quand tu descends : expire.', 'Cinq doigts – cinq respirations calmes.'],
  },
}

function Atmen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'atmen' }> }) {
  const texte = ATEM[c.sprache][b.uebung]
  if (b.uebung === 'quadrat') {
    const s = Math.min(170, c.breite * 0.36)
    const pad = 14
    const W = s + pad * 2
    const m = pad
    const chevron = (d: string, k: number) => <Path key={k} d={d} stroke={c.p.tief} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    const badge = (x: number, y: number, n: number) => (
      <View key={n} style={{ position: 'absolute', left: x - 9, top: y - 9 }}>
        <Nummer c={c} n={n} d={18} />
      </View>
    )
    return (
      <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: W, height: W }}>
          <Svg width={W} height={W} viewBox={`0 0 ${W} ${W}`}>
            <Rect x={m} y={m} width={s} height={s} rx={14} fill={c.p.zart} stroke={c.p.tief} strokeWidth={2.4} />
            {chevron(`M${m + s / 2 - 5} ${m - 6} L${m + s / 2 + 3} ${m} L${m + s / 2 - 5} ${m + 6}`, 1)}
            {chevron(`M${m + s - 6} ${m + s / 2 - 5} L${m + s} ${m + s / 2 + 3} L${m + s + 6} ${m + s / 2 - 5}`, 2)}
            {chevron(`M${m + s / 2 + 5} ${m + s - 6} L${m + s / 2 - 3} ${m + s} L${m + s / 2 + 5} ${m + s + 6}`, 3)}
            {chevron(`M${m - 6} ${m + s / 2 + 5} L${m} ${m + s / 2 - 3} L${m + 6} ${m + s / 2 + 5}`, 4)}
            <Circle cx={m} cy={m + s} r={5.5} fill={c.p.tief} />
          </Svg>
          {badge(m + s / 2, m + 16, 1)}
          {badge(m + s - 16, m + s / 2, 2)}
          {badge(m + s / 2, m + s - 16, 3)}
          {badge(m + 16, m + s / 2, 4)}
          <View style={{ position: 'absolute', left: m + s / 2 - 17, top: m + s / 2 - 17 }}>
            <Zeichnen z={iconZeichnung('wind')} p={{ ...c.p, tinte: c.p.tief }} breite={34} />
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 18 }}>
          {texte.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
              <Nummer c={c} n={i + 1} d={c.m.nummer * 0.85} />
              <Fliess c={c} fett={i === 0 || i === 2} style={{ marginLeft: 8, flex: 1 }}>
                {t(c, x)}
              </Fliess>
            </View>
          ))}
        </View>
      </View>
    )
  }
  if (b.uebung === 'fuenf-sinne') {
    const icons = ['eye', 'hand-finger', 'ear', 'flower', 'apple']
    return (
      <View wrap={false}>
        {[5, 4, 3, 2, 1].map((zahl, i) => (
          <View key={zahl} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 2, color: c.p.tief, width: c.m.basis * 1.8, lineHeight: 1 }}>{String(zahl)}</Text>
            <View style={{ width: c.m.basis * 2.2, alignItems: 'center', marginRight: 8 }}>
              <Plakette c={c} id={'icon:' + icons[i]} d={c.m.basis * 2.1} />
            </View>
            <View style={{ flex: 1 }}>
              <Fliess c={c} klein fett farbe={NEUTRAL.leise}>
                {t(c, texte[i])}
              </Fliess>
              <View style={{ height: c.m.zeile * 0.85, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            </View>
          </View>
        ))}
      </View>
    )
  }
  const motiv = b.uebung === 'ballon' ? 'ballon' : b.uebung === 'finger' ? 'hand' : null
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: c.breite * 0.3, alignItems: 'center' }}>
        {motiv ? (
          <Zeichnen z={motivZeichnung(motiv)} p={c.p} hoehe={150} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Plakette c={c} id="icon:flower" d={70} />
            <View style={{ width: 8 }} />
            <Plakette c={c} id="icon:candle" d={70} ton="#FDF4DE" />
          </View>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        {texte.map((x, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 7 }}>
            <Nummer c={c} n={i + 1} d={c.m.nummer * 0.85} />
            <Fliess c={c} style={{ flex: 1, marginLeft: 8 }}>
              {t(c, x)}
            </Fliess>
          </View>
        ))}
      </View>
    </View>
  )
}

function ComicPanel({ c, f, breite, hoehe }: { c: Ctx; f: ComicFeld; breite: number; hoehe: number }) {
  const figuren = f.figuren ?? []
  const blase = f.blase ?? (f.leer ? 'keine' : 'sprechen')
  const figH = hoehe * (blase === 'keine' ? 0.8 : 0.58)
  const spricht = f.sprecher ?? 0
  // Kulisse (src/blatt/szenen.ts) hinter den Figuren
  const szene = f.szene && c.design && istSzene(f.szene) ? bildZeichnung(`szene:${f.szene}`) : undefined
  const kulisse = szene ? (
    <View style={{ position: 'absolute', left: 0, top: 0 }}>
      <SzeneFlaeche c={c} z={szene} b={breite - 3} h={hoehe - 3} />
    </View>
  ) : null
  return (
    <View style={{ width: breite }}>
      <View style={{ height: hoehe, borderWidth: 1.4, borderColor: NEUTRAL.tinte, borderRadius: 6, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
        {f.leer ? (
          <>
            {kulisse}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {szene ? null : (
                <Fliess c={c} klein farbe={NEUTRAL.sehrLeise}>
                  {tx(c).zeichnen}
                </Fliess>
              )}
            </View>
          </>
        ) : (
          <>
            {kulisse}
            {szene ? null : <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: hoehe * 0.16, backgroundColor: NEUTRAL.flaeche }} />}
            {blase !== 'keine' ? (
              <View style={{ position: 'absolute', top: 7, left: 8, right: 8 }}>
                <View style={{ alignSelf: figuren.length > 1 && spricht === 1 ? 'flex-end' : figuren.length === 1 ? 'center' : 'flex-start', maxWidth: '92%', minWidth: '62%' }}>
                  <Blase c={c} text={f.text} linien={2} denken={blase === 'denken'} />
                  <View style={{ flexDirection: 'row', justifyContent: figuren.length > 1 && spricht === 1 ? 'flex-end' : figuren.length === 1 ? 'center' : 'flex-start', paddingHorizontal: 22, marginTop: -1.2 }}>
                    {blase === 'denken' ? (
                      <Svg width={22} height={16} viewBox="0 0 22 16">
                        <Circle cx={8} cy={4} r={3.4} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={1.1} />
                        <Circle cx={13} cy={11.5} r={2.2} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={1.1} />
                      </Svg>
                    ) : (
                      <Svg width={16} height={12} viewBox="0 0 16 12">
                        <Path d={figuren.length > 1 && spricht === 1 ? 'M2 0 L10 11 L12 0' : 'M4 0 L6 11 L14 0'} fill="#FFFFFF" stroke={NEUTRAL.leise} strokeWidth={1.1} strokeLinejoin="round" />
                        <Rect x={1} y={-1} width={14} height={1.9} fill="#FFFFFF" />
                      </Svg>
                    )}
                  </View>
                </View>
              </View>
            ) : null}
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: hoehe * (szene ? 0.1 : 0.06), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
              {figuren.map((id, i) => (
                <View key={i} style={{ alignItems: 'center' }}>
                  <Bild c={c} id={id} hoehe={figH} />
                </View>
              ))}
              {f.requisit ? <Bild c={c} id={f.requisit} breite={figH * 0.3} /> : null}
            </View>
          </>
        )}
      </View>
      {f.untertitel !== undefined ? (
        f.untertitel ? (
          // Spielschule: „zuerst – dann – zum Schluss“ gut lesbar (mind. 11 pt), sonst klein
          <Fliess c={c} klein groesse={c.m.layout === 'bild' ? 11 : undefined} style={{ marginTop: c.m.layout === 'bild' ? 3 : 4, lineHeight: c.m.layout === 'bild' ? 1.2 : c.m.lh }}>
            {t(c, f.untertitel)}
          </Fliess>
        ) : (
          <View style={{ height: c.m.zeile * 0.85, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        )
      ) : null}
    </View>
  )
}

function Comic({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'comic' }> }) {
  const luecke = 10
  // Felder unter ca. 118 pt Breite (z. B. drei Felder in einer schmalen Spalte) brachten den Renderer zum Absturz
  // (negative Innenbreiten der Sprechblase) – dann weniger Felder je Reihe.
  const spMax = Math.max(1, Math.floor((c.breite + luecke) / (118 + luecke)))
  const sp = Math.min(b.spalten ?? (b.felder.length === 3 ? 3 : 2), spMax)
  const fb = (c.breite - luecke * (sp - 1)) / sp
  const fh = sp === 3 ? Math.max(150, fb * 1.1) : Math.min(210, fb * 0.8)
  const reihen: ComicFeld[][] = []
  for (let i = 0; i < b.felder.length; i += sp) reihen.push(b.felder.slice(i, i + sp))
  return (
    <View>
      {reihen.map((r, k) => (
        <View key={k} wrap={false} style={{ flexDirection: 'row', marginBottom: 10 }}>
          {r.map((f, i) => (
            <View key={i} style={{ marginRight: i < sp - 1 ? luecke : 0 }}>
              <ComicPanel c={c} f={f} breite={fb} hoehe={fh} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function Karten({ c, b, grow }: { c: Ctx; b: Extract<Baustein, { art: 'karten' }>; grow?: boolean }) {
  const sp = b.spalten ?? 3
  const schneiden = b.schneiden !== false
  const luecke = schneiden ? 0 : 8
  const kb = (c.breite - 1.5 - luecke * (sp - 1)) / sp
  const kh = b.hoehe ?? (sp === 2 ? 150 : sp === 3 ? 124 : 104)
  const titelGr = c.m.basis * (sp >= 4 ? 0.9 : 1)
  // Beschriftung in C1/C2 mindestens 11 pt (Zweitzeile: „das Kalb“)
  const textGr = c.m.layout === 'bild' || c.m.layout === 'gross' ? Math.max(c.m.klein, 11) : c.m.klein
  // Das Motiv bekommt, was neben der Beschriftung übrig ist: gut 60 % der Karte, vorher 42 %
  const textHoehe = (k: { titel?: string; text?: string }) => {
    const innen = kb - 18
    const zeilen = (s: string, gr: number) => Math.max(1, Math.ceil((s.length * gr * 0.55) / innen))
    return (k.titel ? zeilen(k.titel, titelGr) * titelGr * 1.3 : 0) + (k.text ? zeilen(k.text, textGr) * textGr * c.m.lh + 2 : 0)
  }
  const bildHoehe = (k: { titel?: string; text?: string }) => (c.design ? Math.max(kh * 0.36, Math.min(kh * 0.62, kh - 18 - 7 - textHoehe(k))) : kh * 0.42)
  const kante = NEUTRAL.sehrLeise
  const karte = (k: (typeof b.karten)[number], i: number, r: number) => {
    const bildH = bildHoehe(k)
    const stil = schneiden
      ? { borderRightWidth: 1, borderBottomWidth: 1, borderColor: kante, borderStyle: 'dashed' as const, borderTopWidth: r === 0 ? 1 : 0 }
      : { borderWidth: 1, borderColor: aufhellen(c.p.mittel, 0.6), borderRadius: 10, marginRight: i < sp - 1 ? luecke : 0, marginBottom: luecke }
    const abzeichen =
      k.nummer !== undefined || k.farbe ? (
        <View style={{ position: 'absolute', left: 6, top: 6 }}>
          {k.nummer !== undefined ? <Nummer c={c} n={k.nummer} d={16} farbe={k.farbe ? FARBWORT[k.farbe] : undefined} /> : <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: FARBWORT[k.farbe!], borderWidth: 0.8, borderColor: NEUTRAL.tinte }} />}
        </View>
      ) : null
    const beschriftung = (
      <>
        {k.titel ? (
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: titelGr, color: c.p.tief, textAlign: 'center' }}>{t(c, k.titel)}</Text>
        ) : null}
        {k.text ? (
          <Fliess c={c} klein groesse={textGr} zentriert style={{ marginTop: 2 }}>
            {t(c, k.text)}
          </Fliess>
        ) : null}
      </>
    )
    const kasten = { width: kb, ...(grow ? { minHeight: kh } : { height: kh }), ...stil, backgroundColor: c.design ? c.p.zart : undefined }
    // wachsende Karten: Bild und Beschriftung liegen frei in der Karte (Bild oben, so groß wie der Platz erlaubt, Text unten) –
    // so wächst das Motiv mit der Karte, ohne dass die Höhe vom Inhalt abhängt
    if (grow)
      return (
        <View key={i} wrap={false} style={kasten}>
          {k.bild ? (
            <View style={{ position: 'absolute', left: 9, right: 9, top: 9, bottom: 9 + textHoehe(k) + 8, alignItems: 'center', justifyContent: 'center' }}>
              {/* Motive wachsen mit der Karte, Piktogramme bleiben bei höchstens 100 pt (sonst würde der Strich plump) */}
              <View style={{ width: '100%', height: '100%', ...(bildAuf(c, k.bild).startsWith('icon:') ? { maxWidth: 100, maxHeight: 100 } : {}) }}>
                <ZeichnungFlaeche z={bildFlaeche(c, k.bild, 90)} p={c.p} />
              </View>
            </View>
          ) : null}
          <View style={{ position: 'absolute', left: 9, right: 9, bottom: 9, alignItems: 'center' }}>{beschriftung}</View>
          {abzeichen}
        </View>
      )
    return (
      <View key={i} wrap={false} style={{ ...kasten, padding: 9, alignItems: 'center', justifyContent: 'center' }}>
        {abzeichen}
        {k.bild ? (
          <View style={{ height: bildH, justifyContent: 'center', marginBottom: 5 }}>
            <Bild c={c} id={k.bild} hoehe={bildH} breite={kb * (c.design ? 0.74 : 0.6)} />
          </View>
        ) : null}
        {beschriftung}
      </View>
    )
  }
  return (
    <View style={grow ? { flexGrow: 1 } : undefined}>
      {schneiden ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
          <Zeichnen z={iconZeichnung('scissors')} p={c.p} breite={13} />
          <View style={{ flex: 1, marginLeft: 6, borderTopWidth: 1, borderTopColor: kante, borderStyle: 'dashed' }} />
        </View>
      ) : null}
      <View style={{ ...(grow ? { flexGrow: 1 } : {}), ...(schneiden ? { borderLeftWidth: 1, borderLeftColor: kante, borderStyle: 'dashed' as const } : {}) }}>
        {reihen(b.karten, sp).map((reihe, r) => (
          <View key={r} wrap={false} style={{ flexDirection: 'row', ...(grow ? { flexGrow: 1 } : {}) }}>
            {reihe.map((k, i) => karte(k, i, r))}
          </View>
        ))}
      </View>
    </View>
  )
}

function Rueckblick({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'rueckblick' }> }) {
  const d = c.m.layout === 'jugend' ? 22 : 28
  const opt: [Gefuehl, string][] = [
    ['froh', tx(c).leicht],
    ['neutral', tx(c).mittel],
    ['besorgt', tx(c).schwer],
  ]
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.8, borderTopColor: NEUTRAL.haarlinie, paddingTop: 8, marginTop: 4 }}>
      <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ flex: 1 }}>
        {t(c, b.frage ?? tx(c).rueckblick)}
      </Fliess>
      {opt.map(([g, w]) => (
        <View key={g} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
          <Zeichnen z={gesichtZeichnung(g)} p={c.p} breite={d} />
          <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ marginLeft: 4 }}>
            {w}
          </Fliess>
        </View>
      ))}
    </View>
  )
}

const NOTFALL: Record<Sprache, { name: string; nummer: string }[]> = {
  de: [
    { name: 'Notruf: Rettung und Feuerwehr', nummer: '112' },
    { name: 'Polizei', nummer: '113' },
    { name: 'Kanner- a Jugendtelefon (anonym, kostenlos)', nummer: '116 111' },
    { name: 'SOS Détresse – Hilfe am Telefon', nummer: '45 45 45' },
    { name: 'BEE SECURE Helpline (Internet, Cybermobbing)', nummer: '8002 1234' },
  ],
  fr: [
    { name: 'Urgences : secours et pompiers', nummer: '112' },
    { name: 'Police', nummer: '113' },
    { name: 'Kanner- a Jugendtelefon (anonyme, gratuit)', nummer: '116 111' },
    { name: 'SOS Détresse – aide par téléphone', nummer: '45 45 45' },
    { name: 'BEE SECURE Helpline (internet, cyberharcèlement)', nummer: '8002 1234' },
  ],
}

function Notfall({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'notfall' }> }) {
  const liste = b.eintraege ?? NOTFALL[c.sprache]
  return (
    <View wrap={false} style={{ borderWidth: 1.2, borderColor: c.p.tief, borderRadius: 12, padding: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Zeichnen z={iconZeichnung('lifebuoy')} p={{ ...c.p, tinte: c.p.tief }} breite={c.m.basis * 1.5} />
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.basis * 1.1, color: c.p.tief, marginLeft: 7 }}>{t(c, b.text ?? tx(c).notfall)}</Text>
      </View>
      {liste.map((e, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: i ? 0.6 : 0, borderTopColor: NEUTRAL.haarlinie, paddingVertical: 3 }}>
          <Fliess c={c} klein style={{ flex: 1 }}>
            {t(c, e.name)}
          </Fliess>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.klein * 1.1, color: NEUTRAL.text }}>{e.nummer}</Text>
        </View>
      ))}
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {[tx(c).vertrauen, tx(c).telefon].map((x, i) => (
          <View key={i} style={{ flex: i ? 0.7 : 1.3, marginLeft: i ? 12 : 0 }}>
            <View style={{ height: c.m.zeile * 0.8, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
            <Fliess c={c} klein farbe={NEUTRAL.leise}>
              {x}
            </Fliess>
          </View>
        ))}
      </View>
    </View>
  )
}

// --- Selbstreflexion: Gläser, Netz, Kurve, Tageskreis, Farbkalender ----------------------
// Ruhige Liniengrafiken zum Füllen, Ausmalen und Einzeichnen – viel Weißraum, dünne Striche
// in der Bereichsfarbe, keine Deko.

/** Ein Glas als Umriss: oben offen breit, unten schmaler mit runden Ecken.
 *  `wasser`: das Glas ist zart wasserblau getönt, Wasser (`fuell`) ist blau; `teilstriche`: ¼ ½ ¾ links neben dem Glas. */
function GlasForm({ b, h, farbe, fuell, strich, skala, feinFarbe, wasser, teilstriche }: { b: number; h: number; farbe: string; fuell?: number; strich?: number; skala?: boolean; feinFarbe?: string; wasser?: boolean; teilstriche?: boolean }) {
  const ein = b * 0.13
  const r = b * 0.17
  const umriss = `M1 1 L${b - 1} 1 L${b - 1 - ein} ${h - 1 - r} Q${b - 1 - ein} ${h - 1} ${b - 1 - ein - r} ${h - 1} L${1 + ein + r} ${h - 1} Q${1 + ein} ${h - 1} ${1 + ein} ${h - 1 - r} Z`
  /** x der linken Wand in Höhe y (0 = oben) */
  const links = (y: number) => 1 + ein * Math.min(1, (y - 1) / (h - 2 - r))
  const hoeheBei = (anteil: number) => h - 1 - (h - 2) * anteil
  const rand = teilstriche ? 14 : 0
  const wasserFarbe = wasser ? WASSER.fuell : (feinFarbe ?? farbe)
  const strichFarbe = wasser ? WASSER.linie : (feinFarbe ?? farbe)
  const marke = ['¼', '½', '¾']
  return (
    <Svg width={b + rand * 2} height={h} viewBox={`${-rand} 0 ${b + rand * 2} ${h}`}>
      <Path d={umriss} fill={wasser ? WASSER.hell : '#FFFFFF'} stroke="none" />
      {fuell ? (
        <Path
          d={`M${links(hoeheBei(fuell))} ${hoeheBei(fuell)} L${b - links(hoeheBei(fuell))} ${hoeheBei(fuell)} L${b - 1 - ein} ${h - 1 - r} Q${b - 1 - ein} ${h - 1} ${b - 1 - ein - r} ${h - 1} L${1 + ein + r} ${h - 1} Q${1 + ein} ${h - 1} ${1 + ein} ${h - 1 - r} Z`}
          fill={wasserFarbe}
          stroke="none"
        />
      ) : null}
      {skala
        ? [0.25, 0.5, 0.75].map((a, i) => {
            const y = hoeheBei(a)
            const x = links(y)
            return (
              <G key={a}>
                <Line x1={teilstriche ? x - 3 : x + 1} y1={y} x2={x + (a === 0.5 ? 7 : 4.5)} y2={y} stroke={strichFarbe} strokeWidth={teilstriche ? 1 : 0.9} />
                {teilstriche ? (
                  <Text x={x - 4.5} y={y + 2.4} style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.8 }} fill={NEUTRAL.leise} textAnchor="end">
                    {marke[i]}
                  </Text>
                ) : null}
              </G>
            )
          })
        : null}
      {strich !== undefined ? (
        <Line x1={links(hoeheBei(strich)) - 2} y1={hoeheBei(strich)} x2={b - links(hoeheBei(strich)) + 2} y2={hoeheBei(strich)} stroke={NEUTRAL.tinte} strokeWidth={1.6} strokeLinecap="round" />
      ) : null}
      <Path d={umriss} fill="none" stroke={farbe} strokeWidth={1.3} strokeLinejoin="round" />
    </Svg>
  )
}

function Glaeser({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'glaeser' }> }) {
  const sp = b.spalten ?? 5
  const zelle = c.breite / sp
  const gb = Math.min(zelle * 0.52, 56)
  const gh = gb * 1.24
  const alle = [...b.items.map((text) => text), ...Array.from({ length: b.leer ?? 0 }, () => '')]
  const reihen: string[][] = []
  for (let i = 0; i < alle.length; i += sp) reihen.push(alle.slice(i, i + sp))
  const skala = b.skala !== false
  const wasser = !!c.design
  return (
    <View>
      {b.legende ? (
        <View wrap={false} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
          {b.legende.map((l, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 22, marginBottom: 2 }}>
              <GlasForm b={15} h={19} farbe={c.p.tief} feinFarbe={c.p.mittel} fuell={i === 1 ? 0.45 : undefined} strich={i === 0 ? 0.72 : undefined} wasser={wasser} />
              <Fliess c={c} klein style={{ marginLeft: 6 }}>
                {t(c, l)}
              </Fliess>
            </View>
          ))}
        </View>
      ) : null}
      {reihen.map((reihe, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', marginTop: i ? c.m.abstand * 0.8 : 0 }}>
          {reihe.map((text, k) => (
            <View key={k} style={{ width: zelle, alignItems: 'center' }}>
              <GlasForm b={gb} h={gh} farbe={c.p.tief} feinFarbe={c.p.mittel} skala={skala} wasser={wasser} teilstriche={wasser && skala && gb >= 36} />
              {text ? (
                <Fliess c={c} klein zentriert style={{ marginTop: 4, width: zelle - 6 }}>
                  {t(c, text)}
                </Fliess>
              ) : (
                <View style={{ width: zelle * 0.72, height: c.m.klein * 1.7, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function Netz({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'netz' }> }) {
  const n = b.bereiche.length
  const st = b.stufen ?? 10
  const rand = 98
  const d = Math.min(c.breite - 2 * rand, 336)
  const W = c.breite
  const H = d + 58
  const R = d / 2
  const cx = W / 2
  const cy = H / 2
  const seg = 360 / n
  const pkt = (r: number, a: number): [number, number] => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)]
  const sektor = (ra: number, a0: number, a1: number) => {
    const [x0, y0] = pkt(ra, a0)
    const [x1, y1] = pkt(ra, a1)
    return `M${cx} ${cy} L${x0} ${y0} A${ra} ${ra} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`
  }
  const labelB = rand - 8
  return (
    <View wrap={false} style={{ width: W, height: H }}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {b.bereiche.map((_, i) => (
          <Path key={`s${i}`} d={sektor(R, i * seg, (i + 1) * seg)} fill={c.design ? SEKTOR_TOENE[i % SEKTOR_TOENE.length] : i % 2 ? '#FFFFFF' : c.p.zart} stroke="none" />
        ))}
        {Array.from({ length: st }, (_, k) => (
          <Circle key={`r${k}`} cx={cx} cy={cy} r={(R * (k + 1)) / st} fill="none" stroke={(k + 1) % 5 === 0 && k + 1 < st ? c.p.tief : c.p.mittel} strokeWidth={(k + 1) % 5 === 0 && k + 1 < st ? 0.9 : 0.7} />
        ))}
        {b.bereiche.map((_, i) => {
          const [x, y] = pkt(R, i * seg)
          return <Line key={`l${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke={c.p.tief} strokeWidth={0.9} />
        })}
        <Circle cx={cx} cy={cy} r={R} fill="none" stroke={c.p.tief} strokeWidth={1.4} />
        <Circle cx={cx} cy={cy} r={2.2} fill={c.p.tief} />
      </Svg>
      {[1, Math.round(st / 2), st].map((k) => {
        const [x, y] = pkt((R * (k - 0.5)) / st, seg * 0.5)
        return (
          <View key={`z${k}`} style={{ position: 'absolute', left: x - 7, top: y - 5, width: 14, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.4, color: c.p.tief }}>{String(k)}</Text>
          </View>
        )
      })}
      {b.bereiche.map((name, i) => {
        const a = (i + 0.5) * seg
        const [x, y] = pkt(R + 9, a)
        const sin = Math.sin((a * Math.PI) / 180)
        const cos = Math.cos((a * Math.PI) / 180)
        const ausr = sin > 0.3 ? 'left' : sin < -0.3 ? 'right' : 'center'
        const left = ausr === 'left' ? x : ausr === 'right' ? x - labelB : x - labelB / 2
        const hoehe = c.m.klein * 2.8
        const top = cos > 0.3 ? y - hoehe : cos < -0.3 ? y : y - hoehe / 2
        return (
          <View key={`t${i}`} style={{ position: 'absolute', left, top, width: labelB, height: hoehe, justifyContent: cos > 0.3 ? 'flex-end' : cos < -0.3 ? 'flex-start' : 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.klein, lineHeight: 1.2, color: NEUTRAL.text, textAlign: ausr }}>{t(c, name)}</Text>
          </View>
        )
      })}
    </View>
  )
}

function Kurve({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'kurve' }> }) {
  const H = b.hoehe ?? 190
  const achse = 70
  const unten = 30
  const W = c.breite
  const pl = achse
  const pr = W - 4
  const pt = 8
  const pb = H - unten
  const n = b.x.length
  const schritt = (pr - pl) / n
  const xi = (i: number) => pl + (i + 0.5) * schritt
  const stufen = 4
  const yi = (k: number) => pt + ((pb - pt) * k) / stufen
  const mitte = b.mitte !== undefined
  return (
    <View wrap={false}>
      <View style={{ width: W, height: H }}>
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <Rect x={pl} y={pt} width={pr - pl} height={pb - pt} fill={c.p.zart} stroke="none" />
          {Array.from({ length: stufen + 1 }, (_, k) => (
            <Line key={`h${k}`} x1={pl} y1={yi(k)} x2={pr} y2={yi(k)} stroke={k === stufen / 2 && mitte ? c.p.tief : c.p.mittel} strokeWidth={k === stufen / 2 && mitte ? 1 : 0.7} strokeDasharray={k === 0 || k === stufen || (k === stufen / 2 && mitte) ? undefined : '3 3'} />
          ))}
          {b.x.map((_, i) => (
            <Line key={`v${i}`} x1={xi(i)} y1={pt} x2={xi(i)} y2={pb} stroke={c.p.mittel} strokeWidth={0.6} strokeDasharray="1.5 3" />
          ))}
          <Line x1={pl} y1={pt - 4} x2={pl} y2={pb} stroke={c.p.tief} strokeWidth={1.3} />
          <Line x1={pl} y1={pb} x2={pr} y2={pb} stroke={c.p.tief} strokeWidth={1.3} />
          {b.x.map((_, i) => (
            <Circle key={`p${i}`} cx={xi(i)} cy={pb} r={1.8} fill={c.p.tief} />
          ))}
        </Svg>
        {[
          [b.oben, yi(0)],
          ...(mitte ? [[b.mitte ?? '', yi(stufen / 2)] as [string, number]] : []),
          [b.unten, yi(stufen)],
        ].map(([text, y], k) => (
          <View key={`y${k}`} style={{ position: 'absolute', left: 0, top: (y as number) - c.m.klein * 0.75, width: achse - 8 }}>
            <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein, lineHeight: 1.2, color: NEUTRAL.leise, textAlign: 'right' }}>{t(c, text as string)}</Text>
          </View>
        ))}
        {b.x.map((text, i) => (
          <View key={`x${i}`} style={{ position: 'absolute', left: xi(i) - schritt / 2, top: pb + 5, width: schritt, alignItems: 'center' }}>
            <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: c.m.klein, lineHeight: 1.2, color: NEUTRAL.text, textAlign: 'center' }}>{t(c, text)}</Text>
          </View>
        ))}
      </View>
      {b.linien ? (
        <View style={{ flexDirection: 'row', marginTop: 6, marginLeft: achse }}>
          {b.linien.map((l, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 22 }}>
              <Svg width={26} height={8} viewBox="0 0 26 8">
                <Line x1={1} y1={4} x2={25} y2={4} stroke={i ? NEUTRAL.leise : c.p.tief} strokeWidth={2} strokeDasharray={i ? '4 3' : undefined} strokeLinecap="round" />
              </Svg>
              <Fliess c={c} klein style={{ marginLeft: 6 }}>
                {t(c, l)}
              </Fliess>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  )
}

function FarbLegende({ c, legende, spalten = 4 }: { c: Ctx; legende: { farbe: Farbwort; text: string }[]; spalten?: number }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
      {legende.map((l, i) => (
        <View key={i} style={{ width: `${100 / spalten}%`, flexDirection: 'row', alignItems: 'center', marginBottom: 6, paddingRight: 8 }}>
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: aufhellen(FARBWORT[l.farbe], 0.75), borderWidth: 0.9, borderColor: FARBWORT[l.farbe], marginRight: 6 }} />
          <View style={{ flex: 1, borderBottomWidth: l.text ? 0 : 0.8, borderBottomColor: NEUTRAL.linie, minHeight: 12 }}>
            {l.text ? (
              <Fliess c={c} klein>
                {t(c, l.text)}
              </Fliess>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  )
}

function Tageskreis({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'tageskreis' }> }) {
  const anz = Math.max(1, Math.min(2, b.titel.length))
  const d = anz === 2 ? Math.min((c.breite - 24) / 2, 236) : Math.min(c.breite, 270)
  const R = d / 2 - 15
  const r0 = R * 0.24
  const m = d / 2
  const pkt = (r: number, stunde: number): [number, number] => {
    const a = (stunde * 15 * Math.PI) / 180
    return [m + r * Math.sin(a), m - r * Math.cos(a)]
  }
  const kreis = (titel: string, k: number) => (
    <View key={k} style={{ width: d, alignItems: 'center' }}>
      <View style={{ width: d, height: d }}>
        <Svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
          <Circle cx={m} cy={m} r={R} fill="#FFFFFF" stroke={c.p.tief} strokeWidth={1.4} />
          {Array.from({ length: 24 }, (_, h) => {
            const [x0, y0] = pkt(r0, h)
            const [x1, y1] = pkt(R, h)
            const stark = h % 6 === 0
            return <Line key={h} x1={x0} y1={y0} x2={x1} y2={y1} stroke={stark ? c.p.tief : c.p.mittel} strokeWidth={stark ? 1 : 0.7} />
          })}
          <Circle cx={m} cy={m} r={r0} fill={c.p.zart} stroke={c.p.tief} strokeWidth={1} />
        </Svg>
        {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
          const [x, y] = pkt(R + 8.5, h)
          return (
            <View key={h} style={{ position: 'absolute', left: x - 9, top: y - 5, width: 18, alignItems: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: h % 6 === 0 ? c.p.tief : NEUTRAL.leise, fontWeight: h % 6 === 0 ? 600 : 400 }}>{String(h)}</Text>
            </View>
          )
        })}
        <View style={{ position: 'absolute', left: m - r0, top: m - 5, width: r0 * 2, alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: c.p.tief }}>24 h</Text>
        </View>
      </View>
      {titel ? (
        <Fliess c={c} fett zentriert style={{ marginTop: 2, width: d }}>
          {t(c, titel)}
        </Fliess>
      ) : null}
    </View>
  )
  return (
    <View wrap={false}>
      <View style={{ flexDirection: 'row', justifyContent: anz === 2 ? 'space-between' : 'center' }}>{b.titel.slice(0, 2).map((x, k) => kreis(x, k))}</View>
      <FarbLegende c={c} legende={b.legende} />
    </View>
  )
}

const WOCHE: Record<Sprache, string[]> = { de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], fr: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'] }

function Farbkalender({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'farbkalender' }> }) {
  const wochen = b.wochen ?? 5
  const luecke = 5
  const k = Math.min((c.breite - luecke * 6) / 7, 60)
  const breite = k * 7 + luecke * 6
  return (
    <View wrap={false} style={{ alignItems: 'center' }}>
      <View style={{ width: breite }}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          {WOCHE[c.sprache].map((w, i) => (
            <View key={w + i} style={{ width: k, marginRight: i < 6 ? luecke : 0, alignItems: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.klein, color: i >= 5 ? c.p.tief : NEUTRAL.leise }}>{w}</Text>
            </View>
          ))}
        </View>
        {Array.from({ length: wochen }, (_, z) => (
          <View key={z} style={{ flexDirection: 'row', marginBottom: luecke }}>
            {Array.from({ length: 7 }, (_, i) => (
              <View key={i} style={{ width: k, height: k * 0.86, marginRight: i < 6 ? luecke : 0, borderWidth: 0.9, borderColor: c.p.mittel, borderRadius: 6, backgroundColor: '#FFFFFF' }}>
                <View style={{ width: 15, height: 11, borderRightWidth: 0.6, borderBottomWidth: 0.6, borderColor: c.p.mittel, borderBottomRightRadius: 4 }} />
              </View>
            ))}
          </View>
        ))}
        <FarbLegende c={c} legende={b.legende} spalten={3} />
      </View>
    </View>
  )
}

// --- Verteiler ------------------------------------------------------------------------

// --- Mathe -------------------------------------------------------------------

/** Karo wie im Mathe-Heft: 5 mm */
const KARO = 14.17
const KARO_LINIE = '#D3D9E4'

/** „12,5“ → ['12', '5'] */
function zerlege(x: string): [string, string] {
  const s = String(x ?? '').replace(/\s/g, '')
  const i = s.indexOf(',')
  return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]
}

/** Eine schriftliche Rechnung Komma unter Komma: jede Ziffer, das Komma und das Rechenzeichen in einem Kästchen. */
function EineRechnung({ c, r, auffuellen, k }: { c: Ctx; r: Rechnung; auffuellen?: boolean; k: number }) {
  const teile = [...r.zeilen, ...(r.ergebnis ? [r.ergebnis] : [])].map(zerlege)
  const nach = Math.max(0, ...teile.map(([, n]) => n.length))
  /* vorn ein Kästchen mehr, wenn das Ergebnis eine Stelle mehr bekommen kann (Übertrag) */
  const ganz = Math.max(1, ...teile.map(([g]) => g.length)) + (!r.ergebnis && r.op !== '-' ? 1 : 0)
  const n = 1 + ganz + (nach ? 1 : 0) + nach
  const schrift = { fontFamily: SCHRIFT.jugend, fontSize: k * 0.64, lineHeight: 1 }
  const zelle = (key: string, ch: string, farbe?: string, fett?: boolean) => (
    <View key={key} style={{ width: k, height: k, alignItems: 'center', justifyContent: 'center', borderRightWidth: 0.5, borderBottomWidth: 0.5, borderColor: KARO_LINIE }}>
      <Text style={{ ...schrift, color: farbe ?? NEUTRAL.text, fontWeight: fett ? 700 : 400 }}>{ch}</Text>
    </View>
  )
  const zeile = (key: string, zahl: string | null, op: string, farbe?: string, fett?: boolean) => {
    const [g, nk] = zahl == null ? ['', ''] : zerlege(zahl)
    const zellen = [zelle(key + 'o', op, NEUTRAL.text, true)]
    for (let i = 0; i < ganz; i++) {
      const j = i - (ganz - g.length)
      zellen.push(zelle(key + 'g' + i, j >= 0 ? g[j] : '', farbe, fett))
    }
    if (nach) {
      const komma = zahl != null && (nk.length > 0 || !!auffuellen)
      zellen.push(zelle(key + 'k', komma ? ',' : '', nk.length ? farbe : c.p.tief, fett))
      for (let i = 0; i < nach; i++) {
        const leer = zahl == null || i >= nk.length
        zellen.push(zelle(key + 'n' + i, !leer ? nk[i] : zahl != null && auffuellen ? '0' : '', !leer ? farbe : c.p.tief, fett))
      }
    }
    return (
      <View key={key} style={{ flexDirection: 'row' }}>
        {zellen}
      </View>
    )
  }
  const MINUS = String.fromCharCode(0x2212)
  return (
    <View wrap={false}>
      {r.label ? (
        <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 3 }}>
          {t(c, r.label)}
        </Fliess>
      ) : null}
      <View style={{ width: n * k, borderLeftWidth: 0.5, borderTopWidth: 0.5, borderColor: KARO_LINIE }}>
        {r.zeilen.map((z, i) => zeile('z' + i, z, i === r.zeilen.length - 1 ? (r.op === '-' ? MINUS : '+') : ''))}
        <View style={{ height: 1.3, backgroundColor: NEUTRAL.text }} />
        {zeile('e', r.ergebnis ?? null, '', c.p.tief, true)}
      </View>
    </View>
  )
}

function Rechnungen({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'rechnungen' }> }) {
  const sp = b.spalten ?? Math.min(4, Math.max(1, b.items.length))
  const k = c.m.layout === 'jugend' ? 16 : 19
  const reihen: Rechnung[][] = []
  b.items.forEach((r, i) => {
    if (i % sp === 0) reihen.push([])
    reihen[reihen.length - 1].push(r)
  })
  return (
    <View>
      {reihen.map((reihe, ri) => (
        <View key={ri} wrap={false} style={{ flexDirection: 'row', marginTop: ri ? 10 : 0 }}>
          {Array.from({ length: sp }, (_, i) => (
            <View key={i} style={{ flex: 1 }}>
              {reihe[i] ? <EineRechnung c={c} r={reihe[i]} auffuellen={b.auffuellen} k={k} /> : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

/** Karopapier (5 mm) für eigene Rechnungen; `grow` füllt den Rest der Seite (mindestens `zeilen` Zeilen) */
function KaestchenFeld({ c, b, grow }: { c: Ctx; b: Extract<Baustein, { art: 'kaestchen' }>; grow?: boolean }) {
  const n = Math.max(1, b.zeilen)
  const spalten = Math.floor((c.breite - 1) / KARO)
  const w = spalten * KARO
  const nz = grow ? Math.floor(MAX_REST / KARO) : n
  const h = nz * KARO
  const gitter = (
    <Svg width={w + 1} height={h + 1}>
      {Array.from({ length: spalten + 1 }, (_, i) => (
        <Line key={'v' + i} x1={0.5 + i * KARO} y1={0.5} x2={0.5 + i * KARO} y2={h + 0.5} stroke={KARO_LINIE} strokeWidth={0.5} />
      ))}
      {Array.from({ length: nz + 1 }, (_, i) => (
        <Line key={'h' + i} x1={0.5} y1={0.5 + i * KARO} x2={w + 0.5} y2={0.5 + i * KARO} stroke={KARO_LINIE} strokeWidth={0.5} />
      ))}
    </Svg>
  )
  return (
    <View wrap={false} style={grow ? { flexGrow: 1 } : undefined}>
      {b.label ? (
        <Fliess c={c} klein fett farbe={NEUTRAL.leise} style={{ marginBottom: 3 }}>
          {t(c, b.label)}
        </Fliess>
      ) : null}
      {grow ? (
        <View style={{ flexGrow: 1, minHeight: n * KARO + 1, width: w + 1, overflow: 'hidden' }}>
          <View style={{ position: 'absolute', left: 0, top: 0 }}>{gitter}</View>
        </View>
      ) : (
        gitter
      )}
    </View>
  )
}

/** Kassenbon: gezackter Rand oben und unten, Posten mit Preisen, Summe (leer = ausrechnen) */
function Bon({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'bon' }> }) {
  const w = Math.min(c.breite, 232)
  const zacke = 7, hz = 4.5
  const zacken = (unten: boolean) => {
    const n = Math.floor(w / zacke)
    const pkt: string[] = []
    for (let i = 0; i <= n; i++) pkt.push(`${(i * w) / n},${unten ? (i % 2 ? hz : 0) : i % 2 ? 0 : hz}`)
    const rand = unten ? `${w},0 0,0` : `${w},${hz} 0,${hz}`
    return (
      <Svg width={w} height={hz}>
        <Polygon points={pkt.join(' ') + ' ' + rand} fill="#FFFFFF" stroke="none" />
        <Path d={'M' + pkt.join(' L')} stroke={NEUTRAL.rahmen} strokeWidth={0.8} fill="none" />
        <Line x1={0.4} y1={0} x2={0.4} y2={hz} stroke={NEUTRAL.rahmen} strokeWidth={0.8} />
        <Line x1={w - 0.4} y1={0} x2={w - 0.4} y2={hz} stroke={NEUTRAL.rahmen} strokeWidth={0.8} />
      </Svg>
    )
  }
  const strich = <View style={{ borderTopWidth: 0.8, borderTopColor: NEUTRAL.rahmen, borderStyle: 'dashed', marginVertical: 5 }} />
  const zeile = (links: string, rechts: ReactNode, fett?: boolean) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginVertical: 1.2 }}>
      <Fliess c={c} klein={!fett} fett={fett}>
        {t(c, links)}
      </Fliess>
      {typeof rechts === 'string' ? (
        <Fliess c={c} klein={!fett} fett={fett}>
          {t(c, rechts)}
        </Fliess>
      ) : (
        rechts
      )}
    </View>
  )
  return (
    <View wrap={false} style={{ width: w }}>
      {zacken(false)}
      <View style={{ backgroundColor: '#FFFFFF', borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: NEUTRAL.rahmen, paddingHorizontal: 13, paddingVertical: 6 }}>
        {b.titel ? (
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: c.m.klein, letterSpacing: 1.2, textAlign: 'center', color: NEUTRAL.text }}>{t(c, b.titel).toUpperCase()}</Text>
        ) : null}
        {b.titel ? strich : null}
        {b.posten.map((x, i) => (
          <View key={i}>{zeile(x.text, x.preis)}</View>
        ))}
        {strich}
        {zeile(
          tx(c).summe.toUpperCase(),
          b.summe ? (
            t(c, b.summe)
          ) : (
            <View style={{ width: 66, height: c.m.basis * 1.5, borderBottomWidth: 1, borderBottomColor: NEUTRAL.linie }} />
          ),
          true,
        )}
        {b.fuss ? (
          <Fliess c={c} klein zentriert farbe={NEUTRAL.leise} style={{ marginTop: 5 }}>
            {t(c, b.fuss)}
          </Fliess>
        ) : null}
      </View>
      {zacken(true)}
    </View>
  )
}

function EinBaustein({ c, b, grow }: { c: Ctx; b: Baustein; grow?: boolean }) {
  switch (b.art) {
    case 'aufgabe':
      return <Aufgabe c={c} b={b} />
    case 'text':
      return (
        <Fliess c={c} klein={b.klein} farbe={b.klein ? NEUTRAL.leise : undefined}>
          {t(c, b.text)}
        </Fliess>
      )
    case 'info':
      return <Info c={c} b={b} />
    case 'geschichte':
      return <Geschichte c={c} b={b} />
    case 'bild':
      return <Einzelbild c={c} b={b} />
    case 'spalten':
      return <Spalten c={c} b={b} />
    case 'abstand':
      return <View style={{ height: b.hoehe ?? c.m.abstand }} />
    case 'seitenumbruch':
      return <View break />
    case 'linien':
      return <LinienBlock c={c} b={b} grow={grow} />
    case 'frage':
      return <Frage c={c} b={b} />
    case 'satzanfaenge':
      return <Satzanfaenge c={c} b={b} />
    case 'feld':
      return <Feld c={c} b={b} grow={grow} />
    case 'tabelle':
      return <Tabelle c={c} b={b} />
    case 'wennDann':
      return <WennDann c={c} b={b} />
    case 'dialog':
      return <Dialog c={c} b={b} />
    case 'vertrag':
      return <Vertrag c={c} b={b} />
    case 'ankreuzen':
      return <Ankreuzen c={c} b={b} />
    case 'bilder':
      return <Bilder c={c} b={b} />
    case 'wortspeicher':
      return <Wortspeicher c={c} b={b} />
    case 'skala':
      return <Skala c={c} b={b} />
    case 'einschaetzung':
      return <Einschaetzung c={c} b={b} />
    case 'zuordnen':
      return <Zuordnen c={c} b={b} />
    case 'gefuehle':
      return <Gefuehle c={c} b={b} />
    case 'gefuehlsrad':
      return <Gefuehlsrad c={c} b={b} />
    case 'ampel':
      return <Ampel c={c} b={b} />
    case 'thermometer':
      return <Thermometer c={c} b={b} />
    case 'vulkan':
      return <Vulkan c={c} b={b} />
    case 'eisberg':
      return <Eisberg c={c} b={b} />
    case 'koerper':
      return <Koerper c={c} b={b} />
    case 'batterie':
      return <Batterie c={c} b={b} />
    case 'waage':
      return <Waage c={c} b={b} />
    case 'leiter':
      return <Leiter c={c} b={b} />
    case 'zielscheibe':
      return <Zielscheibe c={c} b={b} />
    case 'hand':
      return <Hand c={c} b={b} />
    case 'mindmap':
      return <Mindmap c={c} b={b} />
    case 'schritte':
      return <Schritte c={c} b={b} />
    case 'plan':
      return <Plan c={c} b={b} />
    case 'tagesplan':
      return <Tagesplan c={c} b={b} />
    case 'atmen':
      return <Atmen c={c} b={b} />
    case 'comic':
      return <Comic c={c} b={b} />
    case 'karten':
      return <Karten c={c} b={b} grow={grow} />
    case 'rueckblick':
      return <Rueckblick c={c} b={b} />
    case 'notfall':
      return <Notfall c={c} b={b} />
    case 'forscherblatt':
      return <ForscherblattBlock c={c} b={b} />
    case 'glaeser':
      return <Glaeser c={c} b={b} />
    case 'netz':
      return <Netz c={c} b={b} />
    case 'kurve':
      return <Kurve c={c} b={b} />
    case 'tageskreis':
      return <Tageskreis c={c} b={b} />
    case 'farbkalender':
      return <Farbkalender c={c} b={b} />
    case 'formfelder':
      return <Formfelder c={c} b={b} />
    case 'regler':
      return <Regler c={c} b={b} />
    case 'jahr':
      return <Jahr c={c} b={b} />
    case 'personen':
      return <Personen c={c} b={b} />
    case 'rechnungen':
      return <Rechnungen c={c} b={b} />
    case 'kaestchen':
      return <KaestchenFeld c={c} b={b} grow={grow} />
    case 'bon':
      return <Bon c={c} b={b} />
    case 'paeckchen':
      return <Paeckchen c={c} b={b} />
    case 'stellentafel':
      return <Stellentafel c={c} b={b} />
    case 'hunderterfeld':
      return <Hunderterfeld c={c} b={b} />
    case 'zahlenstrahl':
      return <Zahlenstrahl c={c} b={b} />
    case 'bruchbilder':
      return <Bruchbilder c={c} b={b} />
    case 'treppe':
      return <Treppe c={c} b={b} />
    case 'flaeche':
      return <Flaeche c={c} b={b} />
    case 'temperatur':
      return <Temperatur c={c} b={b} />
    case 'kommasprung':
      return <Kommasprung c={c} b={b} />
    case 'geo':
      return <Geo c={c} b={b} />
    case 'diagramm':
      return <Diagramm c={c} b={b} />
    case 'strichliste':
      return <Strichliste c={c} b={b} />
    case 'schneiden_kleben':
      return <SchneidenKleben c={c} b={b} />
    case 'memory':
      return <Memory c={c} b={b} />
    case 'labyrinth':
      return <Labyrinth c={c} b={b} />
    case 'laufweg':
      return <Laufweg c={c} b={b} />
    case 'minibuch':
      return <Minibuch c={c} b={b} />
    case 'punkte_verbinden':
      return <PunkteVerbinden c={c} b={b} />
    case 'klappbild':
      return <Klappbild c={c} b={b} />
    case 'faedelkarte':
      return <Faedelkarte c={c} b={b} />
    case 'bastelbogen':
      return <Bastelbogen c={c} b={b} />
    case 'suchbild':
      return <Suchbild c={c} b={b} />
    case 'anziehpuppe':
      return <Anziehpuppe c={c} b={b} />
    case 'zielkarte':
      return <Zielkarte c={c} b={b} />
    case 'checkin':
      return <Checkin c={c} b={b} />
    case 'wahlkarte':
      return <Wahlkarte c={c} b={b} />
    case 'stundenleiste':
      return <Stundenleiste c={c} b={b} />
    case 'abhaken':
      return <Abhaken c={c} b={b} />
  }
}

/** Abstand vor einem Baustein (Aufgaben bringen ihren eigenen mit). */
function abstandVor(b: Baustein, vorher: Baustein | undefined, c: Ctx): number {
  if (!vorher) return 0
  if (b.art === 'aufgabe' || b.art === 'seitenumbruch' || b.art === 'abstand') return 0
  if (vorher.art === 'aufgabe') return 0
  return c.m.abstand * 0.75
}

/** Bausteine, die nie über eine Seite umbrechen – eine Aufgabe davor bleibt
 *  deshalb mit ihnen zusammen auf einer Seite. */
const FEST = new Set<Baustein['art']>([
  'info', 'geschichte', 'bild', 'frage', 'feld', 'vertrag', 'wortspeicher', 'skala', 'zuordnen', 'ampel', 'thermometer',
  'vulkan', 'eisberg', 'koerper', 'batterie', 'waage', 'leiter', 'zielscheibe', 'hand', 'mindmap', 'plan', 'atmen', 'notfall', 'linien',
  'gefuehlsrad', 'netz', 'kurve', 'tageskreis', 'farbkalender', 'rechnungen', 'bon',
  'stellentafel', 'hunderterfeld', 'zahlenstrahl', 'bruchbilder', 'treppe', 'kommasprung', 'geo',
  'flaeche', 'temperatur',
  'diagramm', 'strichliste',
  'schneiden_kleben', 'memory', 'labyrinth', 'laufweg', 'minibuch', 'punkte_verbinden', 'klappbild', 'faedelkarte',
  'bastelbogen', 'suchbild', 'anziehpuppe',
  'zielkarte', 'checkin', 'wahlkarte', 'stundenleiste', 'abhaken',
])

/** Kleine Bausteine, die nicht umbrechen sollen (auch wenn sie es könnten). */
function istFest(b: Baustein, layout: string): boolean {
  if (FEST.has(b.art)) return true
  switch (b.art) {
    case 'spalten':
      return spaltenFest(b, layout)
    case 'tabelle':
      return b.zeilen + (b.beispiel ? 1 : 0) + (b.werte?.length ?? 0) <= 8
    case 'kaestchen':
      return b.zeilen <= 14
    case 'paeckchen':
      return b.items.length <= 16
    case 'satzanfaenge':
      return b.items.length * (b.linien ?? 1) <= 8
    case 'ankreuzen':
      return Math.ceil((b.items.length + (b.frei ?? 0)) / (b.spalten ?? 1)) <= 10
    case 'bilder':
      return b.bilder.length <= 6
    case 'gefuehle':
      return b.gefuehle.length + (b.leer ?? 0) <= 8
    case 'einschaetzung':
      return b.items.length <= 9
    case 'schritte':
      return b.items.length <= 5
    case 'tagesplan':
      return b.zeilen.length + (b.leer ?? 0) <= 8
    case 'dialog':
      return b.zeilen.length <= 5
    case 'comic':
      return b.felder.length <= 4
    case 'karten':
      return b.karten.length <= 6
    case 'text':
      return b.text.length < 500
    case 'glaeser':
      return b.items.length + (b.leer ?? 0) <= (b.spalten ?? 5) * 2
    // Selbstreflexion (10/2026): kleine Gruppen bleiben zusammen und wandern als Ganzes auf die nächste Seite
    case 'formfelder':
      return Math.ceil(Math.max(b.items?.length ?? 0, b.anzahl ?? 0) / (b.spalten ?? (b.form === 'band' ? 1 : b.form === 'herz' ? 3 : 2))) <= (b.form === 'band' ? 4 : 2)
    case 'regler':
      return b.paare.length <= 16
    case 'jahr':
      return true
    case 'personen':
      return (b.anzahl ?? 1) <= 2
    default:
      return false
  }
}

/** Darf dieser Baustein den Rest der Seite füllen? Schreibfeld, Schreiblinien, Karo und Karten (ohne `hoehe`): ausdrücklich mit `fuellen: true`,
 *  von selbst als letzter Baustein des Blatts (`fuellen: false` schaltet es aus). Nur Bausteine, die nicht umbrechen – sie wachsen
 *  höchstens bis zum Seitenende und bleiben mindestens so groß wie angegeben, die Seitenzahl ändert sich dadurch nie. */
function waechst(b: Baustein, c: Ctx, letzter: boolean): boolean {
  if (b.art === 'karten') return b.fuellen ?? (!!c.fuellen && letzter && b.hoehe === undefined && b.karten.length <= 6)
  if (b.art !== 'feld' && b.art !== 'linien' && b.art !== 'kaestchen') return false
  if (b.art === 'kaestchen' && b.zeilen > 14) return false
  return b.fuellen ?? (!!c.fuellen && letzter)
}

/** Bausteine untereinander.
 *  - `oben` (die Seite selbst, Spielschule): je Abschnitt zwischen zwei `seitenumbruch` eine Hülle; ab dem zweiten
 *    mit `break`. react-pdf beachtet `break` nur bei Kindern, die es beim Umbrechen einzeln prüft – in einer Hülle, die ganz
 *    auf die Seite passt, ging ein Seitenumbruch früher verloren. Innerhalb eines Abschnitts bleibt alles wie zuvor.
 *  - `inSpalte`: Inhalt einer Spalte, die als Ganzes nicht umbricht – innen keine Umbrüche. */
export function Bausteine({ c, liste, inSpalte, oben }: { c: Ctx; liste: Baustein[]; inSpalte?: boolean; oben?: boolean }) {
  // nur in der Spielschule (C1): dort ist jeder Abschnitt genau eine Seite. Bei längeren Blättern lief ein zu langer
  // erster Abschnitt bisher auf Seite 2 weiter, und der Umbruch danach fiel weg – daran hängen deren Seitenzahlen.
  if (oben && c.m.layout === 'bild') {
    const abschnitte: Baustein[][] = [[]]
    for (const b of liste) {
      if (b.art === 'seitenumbruch') abschnitte.push([])
      else abschnitte[abschnitte.length - 1].push(b)
    }
    return (
      <>
        {abschnitte.map((a, i) => (
          <View key={i} break={i > 0} style={a.some((b, k) => waechst(b, c, i === abschnitte.length - 1 && k === a.length - 1)) ? { flexGrow: 1 } : undefined}>
            {abschnittInhalt(c, a, i === abschnitte.length - 1)}
          </View>
        ))}
      </>
    )
  }
  if (inSpalte)
    return (
      <View>
        {liste
          .filter((b) => b.art !== 'seitenumbruch')
          .map((b, i, l) => (
            <View key={i} style={{ marginTop: abstandVor(b, l[i - 1], c) }}>
              <EinBaustein c={c} b={b} />
            </View>
          ))}
      </View>
    )
  // Restseite füllen: nur auf der Seite selbst (nicht in Spalten) und nur, wenn kein Seitenumbruch den Baustein von der letzten Seite trennt
  const fuell = !!oben && liste.some((b, k) => waechst(b, c, k === liste.length - 1))
  return <View style={fuell ? { flexGrow: 1 } : undefined}>{abschnittInhalt(c, liste, true, !!oben)}</View>
}

function abschnittInhalt(c: Ctx, liste: Baustein[], letzterAbschnitt = true, seite = true): ReactNode[] {
  const out: ReactNode[] = []
  let umbruch = false
  for (let i = 0; i < liste.length; i++) {
    const b = liste[i]
    if (b.art === 'seitenumbruch') {
      umbruch = true
      continue
    }
    const naechster = liste[i + 1]
    const gruppe = b.art === 'aufgabe' && naechster && istFest(naechster, c.m.layout)
    const style: { marginTop: number; flexGrow?: number } = { marginTop: umbruch ? 0 : abstandVor(b, liste[i - 1], c) }
    // wächst dieser Baustein (oder bei einer Gruppe der nach der Aufgabe) bis ans Seitenende?
    const wachs = seite && (gruppe ? waechst(naechster, c, letzterAbschnitt && i + 1 === liste.length - 1) : waechst(b, c, letzterAbschnitt && i === liste.length - 1))
    if (wachs) style.flexGrow = 1
    if (gruppe) {
      out.push(
        <View key={i} id={c.ids?.get(b)} break={umbruch} wrap={false} style={style}>
          <EinBaustein c={c} b={b} />
          <EinBaustein c={c} b={naechster} grow={wachs} />
        </View>,
      )
      i++
    } else {
      out.push(
        <View key={i} id={c.ids?.get(b)} break={umbruch} wrap={!istFest(b, c.m.layout) && !wachs} style={style} minPresenceAhead={b.art === 'aufgabe' ? c.m.zeile * 4 : undefined}>
          <EinBaustein c={c} b={b} grow={wachs} />
        </View>,
      )
    }
    umbruch = false
  }
  return out
}

/** Aufgaben fortlaufend nummerieren (auch in Spalten). */
export function nummerieren(liste: Baustein[]): Map<Baustein, number> {
  const karte = new Map<Baustein, number>()
  let n = 0
  const gehe = (l: Baustein[]) => {
    for (const b of l) {
      if (b.art === 'aufgabe') karte.set(b, ++n)
      if (b.art === 'spalten') {
        gehe(b.links)
        gehe(b.rechts)
      }
    }
  }
  gehe(liste)
  return karte
}

export { FARBWORT, Fliess, Linien, Nummer, Kaestchen, kreuzGroesse, passend, EIGENE_SYMBOLE }
