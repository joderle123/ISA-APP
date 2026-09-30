// ---------------------------------------------------------------------------
// Gemeinsame Teile der Förderfach-Hefte (Lehrerhandbuch und Schülerheft):
// Kopf und Fuß der Seiten, Überschriften, Kompetenz-Punkte und das Deckblatt.
// Schriften, Ränder und Grundfarben wie bei den Arbeitsblättern der Toolbox
// (src/blatt/pdf/stil.ts) – nur die Akzentfarbe kommt von der Klassenstufe.
// ---------------------------------------------------------------------------

import { Page, View, Text, Svg, Circle, Line, Image } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import { NEUTRAL, iconZeichnung, palette, type Palette } from '../../blatt/zeichnung'
import { Zeichnen } from '../../blatt/pdf/Zeichnen'
import { SCHRIFT, SEITE, typo } from '../../blatt/pdf/stil'
import { URHEBER } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'
import { FACH, KOMPETENZEN, STUFE_FARBEN, TX } from '../fach'
import type { HandbuchText, Jahresplan, Klasse, Kompetenz, Sprache } from '../typen'

export const SEITE_B = 595.28
export const BREITE = SEITE_B - SEITE.rand * 2
export const WARM = '#F2C14E'
export const seitenStil = { paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 10 }

export function stufenPalette(k: Klasse): Palette {
  return palette(STUFE_FARBEN[k])
}

/** Feinsatz in der Sprache des Hefts */
export const ty = (s: string | undefined, sprache: Sprache) => (s ? typo(s, sprache) : '')

// --- Seitenmarken: merken sich, auf welcher Seite ein Abschnitt beginnt -----------------

export type Marken = Map<string, number>

/** Unsichtbare Marke: trägt beim Setzen die Seitenzahl in `marken` ein (für das Inhaltsverzeichnis). */
export function Marke({ id, marken }: { id: string; marken?: Marken }) {
  if (!marken) return null
  return (
    <Text
      style={{ position: 'absolute', left: 0, top: 0, fontSize: 1, color: '#FFFFFF' }}
      render={({ pageNumber }) => {
        const alt = marken.get(id)
        if (alt === undefined || pageNumber < alt) marken.set(id, pageNumber)
        return ''
      }}
    />
  )
}

// --- Kopf und Fuß ------------------------------------------------------------------------------

export function Kopf({ reiter, meta, p }: { reiter: string; meta: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{versal(reiter)}</Text>
      </View>
      <Text style={{ marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3 }}>{meta}</Text>
    </View>
  )
}

/** Fußzeile: CDSE-Logo, Heft und Abschnitt, Seitenzahl, darunter der Urheber-Vermerk. */
export function Fuss({ links, titel, sprache }: { links: string; titel: string; sprache: Sprache }) {
  const h = 19
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      <Image src={CDSE_LOGO} style={{ width: h * CDSE_LOGO_SEITEN, height: h, marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{links}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{titel}</Text>
          <Text style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: NEUTRAL.text, textAlign: 'right' }} render={({ pageNumber }) => String(pageNumber)} />
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{URHEBER[sprache]}</Text>
      </View>
    </View>
  )
}

// --- Überschriften und Text ----------------------------------------------------------------------

export function SeitenTitel({ titel, unter, p, sprache }: { titel: string; unter?: string; p: Palette; sprache: Sprache }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: NEUTRAL.text, letterSpacing: -0.3 }}>{ty(titel, sprache)}</Text>
      {unter ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.2, lineHeight: 1.5, color: NEUTRAL.leise, marginTop: 5 }}>{ty(unter, sprache)}</Text> : null}
    </View>
  )
}

export function Zwischentitel({ children, p, oben = 14 }: { children: string; p: Palette; oben?: number }) {
  return (
    <View minPresenceAhead={60} style={{ flexDirection: 'row', alignItems: 'center', marginTop: oben, marginBottom: 6 }}>
      <View style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 6 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: NEUTRAL.text }}>{children}</Text>
    </View>
  )
}

export function Absatz({ children, groesse = 9.6, farbe, style }: { children: ReactNode; groesse?: number; farbe?: string; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: 1.5, color: farbe ?? NEUTRAL.text, ...style }}>{children}</Text>
}

export function Fett({ children, groesse = 9.6, farbe, style }: { children: ReactNode; groesse?: number; farbe?: string; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: groesse, lineHeight: 1.4, color: farbe ?? NEUTRAL.text, ...style }}>{children}</Text>
}

/** Versalien – Klassenstufen wie „7e“ bleiben klein geschrieben. */
export const versal = (s: string) => s.toUpperCase().replace(/\b([567])E\b/g, '$1e')

export function Kleinlabel({ children, farbe, style }: { children: string; farbe?: string; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.9, color: farbe ?? NEUTRAL.leise, ...style }}>{versal(children)}</Text>
}

export function Punktliste({ punkte, p, groesse = 9.4, sprache }: { punkte: string[]; p: Palette; groesse?: number; sprache: Sprache }) {
  return (
    <View>
      {punkte.map((x, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', marginTop: i ? 2.5 : 0 }}>
          <View style={{ width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: p.tief, marginTop: groesse * 0.55, marginRight: 7 }} />
          <View style={{ flex: 1 }}>
            <Absatz groesse={groesse}>{ty(x, sprache)}</Absatz>
          </View>
        </View>
      ))}
    </View>
  )
}

/** Piktogramm in beliebiger Farbe. */
export function Ikon({ name, farbe, groesse }: { name: string; farbe: string; groesse: number }) {
  const p = palette({ tief: farbe, mittel: farbe, zart: farbe })
  return <Zeichnen z={iconZeichnung(name.replace(/^icon:/, ''))} p={{ ...p, tinte: farbe }} breite={groesse} />
}

/** Piktogramm auf getöntem Kreis. */
export function Plakette({ name, d, farbe, grund }: { name: string; d: number; farbe: string; grund: string }) {
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: grund, alignItems: 'center', justifyContent: 'center' }}>
      <Ikon name={name} farbe={farbe} groesse={d * 0.54} />
    </View>
  )
}

// --- Kompetenzen ----------------------------------------------------------------------------------

/** Fünf Punkte in fester Reihenfolge: gefüllt, wenn die Einheit den Bereich fördert. */
export function KompetenzPunkte({ aktiv, d = 7 }: { aktiv: Kompetenz[]; d?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {KOMPETENZEN.map((k) => {
        const an = aktiv.includes(k.id)
        return <View key={k.id} style={{ width: d, height: d, borderRadius: d / 2, marginLeft: 3, backgroundColor: an ? k.farbe : '#FFFFFF', borderWidth: an ? 0 : 0.8, borderColor: NEUTRAL.rahmen }} />
      })}
    </View>
  )
}

/** Farbiger Punkt mit Namen des Bereichs. */
export function KompetenzChip({ id, sprache, groesse = 8 }: { id: Kompetenz; sprache: Sprache; groesse?: number }) {
  const k = KOMPETENZEN.find((x) => x.id === id)!
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 3 }}>
      <View style={{ width: groesse * 0.85, height: groesse * 0.85, borderRadius: groesse, backgroundColor: k.farbe, marginRight: 4 }} />
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, color: NEUTRAL.text }}>{k.name[sprache]}</Text>
    </View>
  )
}

// --- Deckblatt -----------------------------------------------------------------------------------------

/** Fünf überlappende Kreise (die fünf Kompetenzbereiche) mit ihren Piktogrammen – in Weiß auf der Stufenfarbe. */
function Blume({ p }: { p: Palette }) {
  const cx = 462
  const cy = 232
  const abstand = 54
  const r = 60
  const punkte = KOMPETENZEN.map((_, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180
    return { x: cx + abstand * Math.cos(a), y: cy + abstand * Math.sin(a), a }
  })
  return (
    <>
      <Svg width={SEITE_B} height={470} style={{ position: 'absolute', left: 0, top: 0 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <Line key={'l' + i} x1={0} y1={i * 16} x2={SEITE_B} y2={i * 16} stroke="#FFFFFF" strokeWidth={0.4} strokeOpacity={0.06} />
        ))}
        <Circle cx={cx} cy={cy} r={abstand + r + 14} fill="none" stroke="#FFFFFF" strokeWidth={0.8} strokeOpacity={0.25} strokeDasharray="2 5" />
        {punkte.map((q, i) => (
          <Circle key={'k' + i} cx={q.x} cy={q.y} r={r} fill="#FFFFFF" fillOpacity={0.09} stroke="#FFFFFF" strokeWidth={1.4} strokeOpacity={0.55} />
        ))}
        <Circle cx={cx} cy={cy} r={22} fill={WARM} stroke="#FFFFFF" strokeWidth={1.6} />
        {punkte.map((q, i) => {
          const x = cx + (abstand + r + 14) * Math.cos(q.a)
          const y = cy + (abstand + r + 14) * Math.sin(q.a)
          return <Circle key={'d' + i} cx={x} cy={y} r={4} fill={KOMPETENZEN[i].farbe} stroke="#FFFFFF" strokeWidth={1.2} />
        })}
      </Svg>
      {punkte.map((q, i) => {
        const x = cx + (abstand + 24) * Math.cos(q.a)
        const y = cy + (abstand + 24) * Math.sin(q.a)
        const g = 24
        return (
          <View key={'i' + i} style={{ position: 'absolute', left: x - g / 2, top: y - g / 2 }}>
            <Ikon name={KOMPETENZEN[i].bild} farbe="#FFFFFF" groesse={g} />
          </View>
        )
      })}
      <View style={{ position: 'absolute', left: cx - 10, top: cy - 10 }}>
        <Ikon name="icon:stairs" farbe={p.tief} groesse={20} />
      </View>
    </>
  )
}

export function Deckblatt({ plan, sprache, art, felder }: { plan: Jahresplan; sprache: Sprache; art: 'handbuch' | 'heft'; felder?: boolean }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const weiss = (o: number) => `rgba(255,255,255,${o})`
  const kapitelBereich = (id: string) => {
    const nr = plan.einheiten.filter((e) => e.kapitel === id).flatMap((e) => Array.from({ length: e.termine ?? 1 }, (_, i) => e.nr + i))
    return nr.length > 1 ? `${t.einheiten} ${nr[0]}–${nr[nr.length - 1]}` : `${t.einheit} ${nr[0]}`
  }
  const halb = Math.ceil(plan.kapitel.length / 2)
  const spalten = [plan.kapitel.slice(0, halb), plan.kapitel.slice(halb)]
  return (
    <Page size="A4" style={{ padding: 0 }}>
      <View style={{ height: 470, backgroundColor: p.tief }}>
        <Blume p={p} />
        <View style={{ position: 'absolute', left: 48, top: 54, width: 272 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.5, letterSpacing: 1.6, color: p.mittel }}>{`${FACH.voie[sprache].toUpperCase()} · ${plan.klasse}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 46, lineHeight: 1.04, color: '#FFFFFF', marginTop: 12, letterSpacing: -1 }}>{FACH.name}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 700, fontSize: 17, lineHeight: 1.2, color: '#FFFFFF', marginTop: 10 }}>{FACH.untertitel[sprache]}</Text>
          <View style={{ width: 40, height: 2, backgroundColor: WARM, marginTop: 18, marginBottom: 14 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>{`${plan.klasse} · ${ty(plan.titel[sprache], sprache)}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, lineHeight: 1.5, color: weiss(0.86), marginTop: 5 }}>{ty(plan.untertitel[sprache], sprache)}</Text>
          <View style={{ flexDirection: 'row', marginTop: 18 }}>
            <View style={{ backgroundColor: WARM, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 1, color: NEUTRAL.tinte }}>{(art === 'handbuch' ? t.lehrerhandbuch : t.schuelerheft).toUpperCase()}</Text>
            </View>
            <View style={{ marginLeft: 8, borderWidth: 1, borderColor: p.mittel, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3.2 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, letterSpacing: 1, color: '#FFFFFF' }}>{t.entwurf.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 48, paddingTop: 22 }}>
        <Kleinlabel>{t.kapitelDerKlasse(plan.klasse)}</Kleinlabel>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {spalten.map((liste, s) => (
            <View key={s} style={{ flex: 1, marginRight: s ? 0 : 16 }}>
              {liste.map((k) => (
                <View key={k.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                  <Plakette name={k.bild} d={24} farbe={p.tief} grund={p.zart} />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.2, lineHeight: 1.2, color: NEUTRAL.text }}>{`${k.nr} ${ty(k.titel[sprache], sprache)}`}</Text>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginTop: 1 }}>{`${kapitelBereich(k.id)} · ${ty(k.leitfrage[sprache], sprache)}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>

      {felder ? (
        <View style={{ position: 'absolute', left: 48, right: 48, bottom: 70, flexDirection: 'row' }}>
          {(
            [
              [t.name, 3],
              [t.klasse, 1.2],
              [t.schuljahr, 1.6],
            ] as [string, number][]
          ).map(([label, f], i) => (
            <View key={i} style={{ flex: f, marginLeft: i ? 16 : 0 }}>
              <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: NEUTRAL.linie }} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 3 }}>{label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ position: 'absolute', left: 48, right: 48, bottom: 26, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 6 }}>
        <Image src={CDSE_LOGO} style={{ width: 22 * CDSE_LOGO_SEITEN, height: 22, marginRight: 9 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{`${FACH.name} · ${FACH.untertitel[sprache]}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: NEUTRAL.sehrLeise, marginTop: 2 }}>{URHEBER[sprache]}</Text>
        </View>
      </View>
    </Page>
  )
}

// --- Notizen und Rückseite (Booklet) -----------------------------------------------------------

/** Linierte Seite – füllt das Heft auf ein Vielfaches von 4 Seiten auf. */
export function NotizenSeite({ klasse, sprache }: { klasse: Klasse; sprache: Sprache }) {
  const t = TX[sprache]
  const p = stufenPalette(klasse)
  return (
    <Page size="A4" style={seitenStil}>
      <Kopf reiter={t.notizen} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
      <SeitenTitel titel={t.notizen} p={p} sprache={sprache} />
      {Array.from({ length: 26 }, (_, i) => (
        <View key={i} style={{ height: 24.5, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.rahmen }} />
      ))}
      <Fuss links={FACH.name} titel={t.notizen} sprache={sprache} />
    </Page>
  )
}

/** Rückseite: die drei Jahre (dieses Heft hervorgehoben), die fünf Kompetenzbereiche, Urheber und Stand. */
export function Rueckseite({ plan, plaene, sprache, text, stand }: { plan: Jahresplan; plaene: Jahresplan[]; sprache: Sprache; text: HandbuchText; stand: string }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const r = text.rueckseite
  return (
    <Page size="A4" style={{ padding: 0 }}>
      <View style={{ paddingHorizontal: 48, paddingTop: 96 }}>
        <Kleinlabel farbe={p.tief}>{`${FACH.voie[sprache]} · ${plaene.map((x) => x.klasse).join(' · ')}`}</Kleinlabel>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 30, lineHeight: 1.1, color: NEUTRAL.text, marginTop: 8, letterSpacing: -0.5 }}>{FACH.name}</Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 700, fontSize: 13, color: p.tief, marginTop: 4 }}>{FACH.untertitel[sprache]}</Text>
        <View style={{ width: 40, height: 2, backgroundColor: WARM, marginTop: 18, marginBottom: 14 }} />
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 15, color: NEUTRAL.text }}>{ty(r.titel, sprache)}</Text>
        <Absatz groesse={10.4} style={{ marginTop: 5, lineHeight: 1.55 }}>
          {ty(r.text, sprache)}
        </Absatz>
        <View style={{ flexDirection: 'row', marginTop: 22 }}>
          {plaene.map((pl, i) => {
            const aktiv = pl.klasse === plan.klasse
            const f = STUFE_FARBEN[pl.klasse]
            return (
              <View key={pl.klasse} style={{ flex: 1, marginLeft: i ? 10 : 0, borderRadius: 10, padding: 12, backgroundColor: aktiv ? f.zart : NEUTRAL.flaeche, borderWidth: 1.2, borderColor: aktiv ? f.tief : NEUTRAL.flaeche }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: f.tief, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 13, color: '#FFFFFF' }}>{pl.klasse}</Text>
                  </View>
                  {aktiv ? (
                    <View style={{ marginLeft: 8, backgroundColor: f.tief, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1.5 }}>
                      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, letterSpacing: 0.6, color: '#FFFFFF' }}>{versal(r.dieses)}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, lineHeight: 1.2, color: NEUTRAL.text, marginTop: 8 }}>{ty(pl.titel[sprache], sprache)}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 2 }}>{ty(pl.untertitel[sprache], sprache)}</Text>
              </View>
            )
          })}
        </View>
        <Kleinlabel style={{ marginTop: 26 }}>{t.kompetenzen}</Kleinlabel>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {KOMPETENZEN.map((k) => (
            <View key={k.id} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 3 }}>
              <Plakette name={k.bild} d={32} farbe="#FFFFFF" grund={k.farbe} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8, lineHeight: 1.3, color: NEUTRAL.text, marginTop: 5, textAlign: 'center' }}>{k.name[sprache]}</Text>
            </View>
          ))}
        </View>
        <Kleinlabel style={{ marginTop: 26 }}>{text.ueberblick.titel}</Kleinlabel>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {text.ueberblick.fakten.map((f, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 4, borderLeftWidth: i ? 0.6 : 0, borderLeftColor: NEUTRAL.haarlinie }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 20, lineHeight: 1.15, color: p.tief }}>{f.zahl}</Text>
              {/* nur der Kern: „Jahre: 7e, 6e und 5e“ → „Jahre“ */}
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, lineHeight: 1.3, color: NEUTRAL.leise, textAlign: 'center', marginTop: 1 }}>{ty(f.text.split(/\s*(?::|–|,)\s*/)[0], sprache)}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ position: 'absolute', left: 48, right: 48, bottom: 50, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 10 }}>
        <Image src={CDSE_LOGO} style={{ width: 30 * CDSE_LOGO_SEITEN, height: 30, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: NEUTRAL.marke, letterSpacing: 0.3 }}>{URHEBER[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginTop: 2 }}>{t.stand(stand)}</Text>
        </View>
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 20, backgroundColor: p.tief }} />
    </Page>
  )
}
