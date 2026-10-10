// ---------------------------------------------------------------------------
// Mappe als Heft: Deckblatt (Titel, Untertitel, Anzahl Blätter, Namensfeld), Inhalt
// (Blattnummer, Titel, Stufe) und dahinter die Blätter – so, wie sie einzeln aussehen
// (BlattSeiten, am Blatt-Layout ändert sich nichts). Schrift, Farben, Logo und Urheber-
// Vermerk wie im Modulheft. Die Seiten für die Lehrperson stehen auf Wunsch gesammelt
// hinten oder nach jedem Blatt. Fortlaufende Seitenzahlen gibt es nicht: Wie viele Seiten
// ein Blatt hat, steht erst beim Setzen fest – darum führen die Blattnummern durch den Inhalt.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Svg, Rect, Line, Image } from '@react-pdf/renderer'
import type { Blatt, Sprache } from '../typen'
import { bereichById, stufenText, type Farben } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { fassungDruck, type Fassung } from '../variante'
import { Plakette, type Ctx } from './bausteine'
import { BlattSeiten, blattInhalt } from './BlattDokument'
import { MASSE, SCHRIFT, SEITE, typo } from './stil'
import { urheberschaft, type Urheberschaft } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'
import type { LehrerSeiten } from '../../lib/mappen'

const SEITE_B = 595.28

export interface MappeQuelle {
  blatt: Blatt
  /** Blattnummer, z. B. 'G-07' */
  nr?: string
  sprache?: Sprache
  fassung?: Fassung
}

export interface MappeAngaben {
  titel: string
  /** „Für wen“, frei (z. B. „Gruppe Mittwoch“) */
  untertitel?: string
  lehrer: LehrerSeiten
  /** Deckblatt und Inhalt voranstellen */
  deckblatt: boolean
}

const TX = {
  de: {
    blatt: 'Blatt',
    blaetter: 'Blätter',
    inhalt: 'Inhalt',
    name: 'Name',
    inDieserMappe: 'In dieser Mappe',
    lehrerHinten: 'Die Seiten für die Lehrperson stehen am Ende der Mappe.',
    lehrerNach: 'Nach jedem Blatt folgt die Seite für die Lehrperson.',
    seite: 'Seite',
    groesser: 'größer',
    wenigSchreiben: 'wenig schreiben',
  },
  fr: {
    blatt: 'fiche',
    blaetter: 'fiches',
    inhalt: 'Sommaire',
    name: 'Nom',
    inDieserMappe: 'Dans ce dossier',
    lehrerHinten: 'Les pages pour l’équipe pédagogique se trouvent à la fin du dossier.',
    lehrerNach: 'Chaque fiche est suivie de la page pour l’équipe pédagogique.',
    seite: 'Page',
    groesser: 'plus grand',
    wenigSchreiben: 'peu d’écriture',
  },
} satisfies Record<Sprache, Record<string, string>>

type Tx = (typeof TX)['de']

const zahlText = (n: number, t: Tx) => `${n} ${n === 1 ? t.blatt : t.blaetter}`

const seitenStil = { paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }

function ctxFuer(p: Palette, sprache: Sprache): Ctx {
  return { m: MASSE.jugend, p, sprache, nummern: new Map(), breite: SEITE_B - SEITE.rand * 2 }
}

/** Alle Blätter eines Bereichs: dessen Farbe; gemischt: die ruhige Markenfarbe der Toolbox (Werkzeuge). */
function mappeFarben(quellen: MappeQuelle[]): Farben {
  const bereiche = new Set(quellen.map((q) => q.blatt.bereich))
  const nur = bereiche.size === 1 ? bereichById.get([...bereiche][0]) : undefined
  return (nur ?? bereichById.get('werkzeuge')!).farben
}

// --- Kopf und Fuß der Mappenseiten (wie im Modulheft) ----------------------------------------

function MappeKopf({ reiter, meta, p }: { reiter: string; meta: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
      <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{reiter.toUpperCase()}</Text>
      </View>
      <Text style={{ marginLeft: 8, flex: 1, maxLines: 1, textOverflow: 'ellipsis', fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3 }}>{meta}</Text>
    </View>
  )
}

function MappeFuss({ u, titel, sprache }: { u: Urheberschaft; titel: string; sprache: Sprache }) {
  const h = 19
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      {u.logo ? <Image src={CDSE_LOGO} style={{ width: h * CDSE_LOGO_SEITEN, height: h, marginRight: 8 }} /> : null}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{u.marke[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{titel}</Text>
          {/* nur wenn das Inhaltsverzeichnis über mehrere Seiten geht */}
          <Text
            style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, textAlign: 'right' }}
            render={({ subPageNumber, subPageTotalPages }) => (subPageTotalPages > 1 ? `${TX[sprache].seite} ${subPageNumber} / ${subPageTotalPages}` : '')}
          />
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{u.text[sprache]}</Text>
      </View>
    </View>
  )
}

// --- Deckblatt ---------------------------------------------------------------------------------

/** Ruhiger Schmuck im Band: feines Raster und ein Stapel Blätter – das vorderste mit Titelbalken und Linien. */
function Stapel({ p, hoehe }: { p: Palette; hoehe: number }) {
  const w = 120
  const h = 162
  const x = 398
  const y = hoehe - h - 52
  const blatt = (dx: number, dy: number, fuellung: number, rand: number) => (
    <Rect x={x + dx} y={y + dy} width={w} height={h} rx={6} fill="#FFFFFF" fillOpacity={fuellung} stroke="#FFFFFF" strokeWidth={1.4} strokeOpacity={rand} />
  )
  return (
    <Svg width={SEITE_B} height={hoehe} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 28 }, (_, i) => (
        <Line key={'x' + i} x1={i * 22} y1={0} x2={i * 22} y2={hoehe} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: Math.ceil(hoehe / 22) + 1 }, (_, i) => (
        <Line key={'y' + i} x1={0} y1={i * 22} x2={SEITE_B} y2={i * 22} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {blatt(34, -30, 0.08, 0.5)}
      {blatt(17, -15, 0.14, 0.75)}
      {blatt(0, 0, 1, 0)}
      <Rect x={x + 14} y={y + 16} width={50} height={6} rx={3} fill={p.tief} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Line key={'l' + i} x1={x + 14} y1={y + 44 + i * 16} x2={x + w - 14 - (i % 2 ? 22 : 0)} y2={y + 44 + i * 16} stroke={p.mittel} strokeWidth={1.6} strokeLinecap="round" />
      ))}
      <Rect x={x + 14} y={y + h - 30} width={10} height={10} rx={2} fill="none" stroke={p.tief} strokeWidth={1.2} />
      <Line x1={x + 32} y1={y + h - 25} x2={x + 70} y2={y + h - 25} stroke={p.mittel} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  )
}

/** Schriftgröße des Titels: lang → kleiner; auch ein sehr langes Einzelwort soll in die Spalte passen. */
function titelGroesse(titel: string): number {
  const nachLaenge = titel.length <= 16 ? 46 : titel.length <= 30 ? 36 : titel.length <= 50 ? 29 : 24
  const langesWort = Math.max(...titel.split(/\s+/).map((w) => w.length), 1)
  return Math.max(20, Math.min(nachLaenge, Math.floor(310 / (0.62 * langesWort))))
}

function Deckblatt({ quellen, angaben, sprache, p, u }: { quellen: MappeQuelle[]; angaben: MappeAngaben; sprache: Sprache; p: Palette; u: Urheberschaft }) {
  const t: Tx = TX[sprache]
  const ty = (s: string) => typo(s, sprache)
  const band = 380
  // Bereiche in der Reihenfolge, in der sie in der Mappe zuerst vorkommen
  const bereiche = [...new Set(quellen.map((q) => q.blatt.bereich))].map((id) => ({ b: bereichById.get(id)!, n: quellen.filter((q) => q.blatt.bereich === id).length }))
  const stufen = stufenText([...new Set(quellen.flatMap((q) => q.blatt.stufen))])
  const gr = titelGroesse(angaben.titel)
  return (
    <Page size="A4" style={{ padding: 0 }}>
      <View style={{ height: band, backgroundColor: p.tief }}>
        <Stapel p={p} hoehe={band} />
        <View style={{ position: 'absolute', left: 48, top: 56, width: 320 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.5, letterSpacing: 1.6, color: p.mittel }}>{[zahlText(quellen.length, t), stufen].filter(Boolean).join(' · ').toUpperCase()}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: gr, lineHeight: 1.1, color: '#FFFFFF', marginTop: 12, letterSpacing: -0.6 }}>{ty(angaben.titel)}</Text>
          {angaben.untertitel ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 12.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.86)', marginTop: 16 }}>{ty(angaben.untertitel)}</Text> : null}
        </View>
      </View>

      <View style={{ paddingHorizontal: 48, paddingTop: 26 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 1.2, color: NEUTRAL.leise }}>{t.inDieserMappe.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
          {bereiche.map(({ b, n }) => (
            <View key={b.id} style={{ width: '33.3%', flexDirection: 'row', alignItems: 'center', marginBottom: 14, paddingRight: 10 }}>
              <Plakette c={ctxFuer(palette(b.farben), sprache)} id={'icon:' + b.icon} d={36} />
              <View style={{ marginLeft: 9, flex: 1 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, lineHeight: 1.25, color: NEUTRAL.text }}>{ty(b[sprache])}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.leise, marginTop: 1.5 }}>{zahlText(n, t)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ position: 'absolute', left: 48, width: 330, bottom: 66 }}>
        <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: NEUTRAL.linie }} />
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 3 }}>{t.name}</Text>
      </View>

      <View style={{ position: 'absolute', left: 48, right: 48, bottom: 26, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 6 }}>
        {u.logo ? <Image src={CDSE_LOGO} style={{ width: 22 * CDSE_LOGO_SEITEN, height: 22, marginRight: 9 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{u.marke[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: NEUTRAL.sehrLeise, marginTop: 2 }}>{u.text[sprache]}</Text>
        </View>
      </View>
    </Page>
  )
}

// --- Inhalt --------------------------------------------------------------------------------------

function Leiter() {
  return <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3.2, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
}

function Zeile({ nr, titel, marke, stufe, p }: { nr: string; titel: string; marke?: string; stufe: string; p: Palette }) {
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 7 }}>
      <View style={{ width: 40, height: 17, borderRadius: 4, backgroundColor: p.tief, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 0.5 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.8, letterSpacing: 0.4, color: '#FFFFFF', lineHeight: 1 }}>{nr}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ flexShrink: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text }}>{titel}</Text>
        {marke ? <Text style={{ marginLeft: 6, fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.leise }}>{marke}</Text> : null}
        <Leiter />
        <Text style={{ width: 44, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text }}>{stufe}</Text>
      </View>
    </View>
  )
}

function InhaltSeite({ quellen, angaben, sprache, p, u }: { quellen: MappeQuelle[]; angaben: MappeAngaben; sprache: Sprache; p: Palette; u: Urheberschaft }) {
  const t: Tx = TX[sprache]
  const ty = (s: string) => typo(s, sprache)
  const hinweis = angaben.lehrer === 'hinten' ? t.lehrerHinten : angaben.lehrer === 'nach' ? t.lehrerNach : null
  return (
    <Page size="A4" style={seitenStil}>
      <MappeKopf reiter={t.inhalt} meta={[ty(angaben.titel), angaben.untertitel ? ty(angaben.untertitel) : null].filter(Boolean).join('  ·  ')} p={p} />
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: NEUTRAL.text, letterSpacing: -0.3 }}>{t.inhalt}</Text>
      <View style={{ marginTop: 6 }}>
        {quellen.map((q) => {
          const sp = q.sprache ?? 'de'
          const marke = q.fassung === 'groesser' ? t.groesser : q.fassung === 'wenigSchreiben' ? t.wenigSchreiben : undefined
          return <Zeile key={q.blatt.id} nr={q.nr ?? ''} titel={typo(blattInhalt(q.blatt, sp).titel, sp)} marke={marke} stufe={stufenText(q.blatt.stufen)} p={p} />
        })}
      </View>
      {hinweis ? (
        <View wrap={false} style={{ marginTop: 18, flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 10, paddingLeft: 12 }}>
          <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
          <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 9.4, lineHeight: 1.45, color: NEUTRAL.text }}>{hinweis}</Text>
        </View>
      ) : null}
      <MappeFuss u={u} titel={t.inhalt} sprache={sprache} />
    </Page>
  )
}

// --- Das Heft --------------------------------------------------------------------------------------

export function MappeHeftDokument({ quellen, angaben }: { quellen: MappeQuelle[]; angaben: MappeAngaben }) {
  // Deckblatt und Inhalt auf Französisch nur, wenn jedes Blatt französisch ist (und es eine Fassung gibt)
  const sprache: Sprache = quellen.length > 0 && quellen.every((q) => q.sprache === 'fr' && q.blatt.fr) ? 'fr' : 'de'
  // wie MappeDokument: nur Spielschule → Michèle Wagner, ohne CDSE-Logo; sonst die Toolbox
  const u = urheberschaft(quellen.length > 0 && quellen.every((q) => q.blatt.bereich === 'spielschule') ? 'spielschule' : undefined)
  const p = palette(mappeFarben(quellen))
  const gedruckt = quellen.map((q) => ({ q, ...fassungDruck(q.blatt, q.fassung) }))
  return (
    <Document title={angaben.titel} author={u.name} creator={u.marke.de} producer={u.marke.de} language={sprache}>
      {angaben.deckblatt ? <Deckblatt quellen={quellen} angaben={angaben} sprache={sprache} p={p} u={u} /> : null}
      {angaben.deckblatt ? <InhaltSeite quellen={quellen} angaben={angaben} sprache={sprache} p={p} u={u} /> : null}
      {gedruckt.map(({ q, blatt, layout }) => (
        <BlattSeiten key={q.blatt.id} blatt={blatt} opt={{ nr: q.nr, sprache: q.sprache, layout, schueler: true, lehrer: angaben.lehrer === 'nach' }} />
      ))}
      {/* Lehrerseiten gesammelt hinten: dieselben Seiten wie „Nur Lehrerseite“, in der Reihenfolge der Mappe */}
      {angaben.lehrer === 'hinten'
        ? gedruckt.map(({ q, blatt }) => <BlattSeiten key={'lehrer-' + q.blatt.id} blatt={blatt} opt={{ nr: q.nr, sprache: q.sprache, schueler: false, lehrer: true }} />)
        : null}
    </Document>
  )
}
