// ---------------------------------------------------------------------------
// Ein Arbeitsblatt als PDF: Schülerseite(n) und auf Wunsch die Seite
// „Für die Lehrperson“. Kopf, Fuß, Raster und Schriften sind für alle Blätter
// gleich – nur Inhalt, Stufe und Bereichsfarbe ändern sich.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import type { AktivitaetArt, Baustein, Blatt, BlattInhalt, Layout, Sprache } from '../typen'
import { bereichById, blattLayout, stufenText, themaLabel, type Farben } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { eldibDomainById, eldibGoalById } from '../../data/taxonomy'
import { Bausteine, nummerieren, NiveauZeichen, Plakette, Fliess, type Ctx } from './bausteine'
import { LEHRER_MASSE, MASSE, SCHRIFT, SEITE, TEXTE, dauerText, typo, type Masse } from './stil'
import { ELDIB_FR } from '../eldib-fr'
import { urheberschaft } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'
import { hatBegleiten, zusaetzeVon, type Zusatz } from '../spielschule'
import { BegleitenSeite, ElternbriefSeite, KlassenrasterSeite, PortfolioSeite } from './Begleiten'
import { ForschenSeite, ForscherblattSeite } from './Forschen'
import { experimentVon } from '../forschen'

const BREITE = 595.28 - SEITE.rand * 2
/** Das Logo in der Fußzeile ist so hoch wie ihre beiden Zeilen – die Fußzeile wird nicht höher. */
const LOGO_HOEHE = 19

export interface BlattOptionen {
  sprache?: Sprache
  /** Schülerseiten (Standard: ja) */
  schueler?: boolean
  /** Seite „Für die Lehrperson“ (Standard: ja) */
  lehrer?: boolean
  /** Blattnummer, z. B. 'G-07' */
  nr?: string
  /** Teil eines Hefts (z. B. Mathe-Modulheft): eigener Kopf und Fuß, fortlaufende Seitenzahl, Lernziel statt Untertitel */
  heft?: HeftAngaben
  /** Eigene Farben statt der Bereichsfarbe (Förderfach: die Farbe der Klassenstufe) */
  farben?: Farben
  /** Meldet die Seitenzahl der ersten Schülerseite im Dokument (für Verweise aus einem anderen Heft) */
  seite?: (n: number) => void
  /** Spielschule: Zusatzseiten (Klassenraster, Portfolio-Blatt, Elternbrief) – kommen nach Schüler- und Lehrerteil,
   *  nur wenn das Blatt die Daten dafür hat (siehe zusaetzeVon). Standard: keine. */
  zusaetze?: Zusatz[]
  /** Anderes Layout als das der Stufe (Fassung „Größer“: das Layout der nächstjüngeren Stufe, siehe variante.ts) */
  layout?: Layout
}

export interface HeftAngaben {
  /** Reiter oben links, z. B. „Lektion 1“ */
  reiter: string
  /** Zeile neben dem Reiter, z. B. „Mathe · Modul 2 · Dezimalzahlen“ */
  meta: string
  /** Fußzeile vor dem Titel, z. B. „Mathe · Modul 2 · Lektion 1“ */
  fuss: string
  /** „Mein Ziel: …“ unter dem Titel (ersetzt den Untertitel) */
  lernziel?: string
  zielWort?: string
}

export function blattInhalt(b: Blatt, sprache: Sprache): BlattInhalt {
  return (sprache === 'fr' && b.fr) || b.de
}

function Reiter({ text, farbe }: { text: string; farbe: string }) {
  return (
    <View style={{ backgroundColor: farbe, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{text.toUpperCase()}</Text>
    </View>
  )
}

function Meta({ children }: { children: string }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3 }}>{children}</Text>
}

function NameFeld({ label, breite, m }: { label: string; breite: number; m: Masse }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 14 }}>
      <Text style={{ fontFamily: m.schrift, fontSize: 8.6, color: NEUTRAL.leise, marginRight: 5 }}>{label}</Text>
      <View style={{ width: breite, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 12 }} />
    </View>
  )
}

function Kopfzeile({ blatt, nr, sprache, p, m, lehrer, heft }: { blatt: Blatt; nr?: string; sprache: Sprache; p: Palette; m: Masse; lehrer?: boolean; heft?: HeftAngaben }) {
  const bereich = bereichById.get(blatt.bereich)!
  const tx = TEXTE[sprache]
  // Im Heft: „Lektion 1“ als Reiter, Modul und Thema daneben, keine Namensfelder (der Name steht auf dem Deckblatt)
  // Passgenau: auch kein Stufenkürzel („C3“, „ES“) – auf dem Blatt eines Kindes wirkt es wie die Klasse im Klartext
  const nummer = heft ? (lehrer ? heft.reiter : '') : [nr ? `${tx.arbeitsblatt} ${nr}` : null, blatt.passgenau ? null : stufenText(blatt.stufen)].filter(Boolean).join('  ·  ')
  // Passgenau: kein Bereichs-Etikett auf dem Blatt des Kindes (Farbe bleibt, Text „Passgenau“, bei Jugendlichen „CDSE“)
  const thema = heft ? heft.meta : blatt.passgenau ? '' : themaLabel(blatt.bereich, blatt.thema, sprache)
  // Passgenau: bei Jugendlichen neutral „CDSE“ – ein Etikett „Passgenau“ fällt auf dem Tisch neben den Mitschülern auf
  const reiter = lehrer ? tx.lehrer : heft ? heft.reiter : blatt.passgenau ? (m.layout === 'jugend' ? 'CDSE' : 'Passgenau') : bereich[sprache]
  // Passt die Meta-Zeile neben Reiter, Name und Datum? Breiten je Zeichen an Inter 7,4 pt und
  // Manrope 7 pt (Versalien) gemessen – obere Werte, damit nie eine Zeile ungewollt umbricht.
  const felder = lehrer || heft ? 0 : m.layout === 'bild' ? 14 + 27 + 150 : 14 + 27 + 118 + 14 + 27 + 62
  const frei = BREITE - (reiter.length * 5.85 + 12) - 8 - felder
  const metaText = [nummer, thema].filter(Boolean).join('  ·  ')
  const eineZeile = metaText.length * 3.95 <= frei
  // Langer Reiter (z. B. „Lernen & Selbstorganisation“): passt auch zweizeilig nicht daneben –
  // dann steht die Meta-Zeile vollständig unter dem Kopf statt über vier Zeilen gequetscht.
  const zweiZeilen = !eineZeile && Math.max(nummer.length, thema.length) * 3.95 <= frei
  const darunter = !eineZeile && !zweiZeilen
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Reiter text={reiter} farbe={lehrer ? NEUTRAL.tinte : p.tief} />
        {eineZeile ? (
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Meta>{metaText}</Meta>
          </View>
        ) : zweiZeilen ? (
          // zu lang für eine Zeile: bewusst zwei Zeilen statt eines zufälligen Umbruchs
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Meta>{nummer}</Meta>
            <Meta>{thema}</Meta>
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {!lehrer && !heft ? (
          <>
            <NameFeld label={tx.name} breite={m.layout === 'bild' ? 150 : 118} m={m} />
            {m.layout !== 'bild' ? <NameFeld label={tx.datum} breite={62} m={m} /> : null}
          </>
        ) : null}
      </View>
      {darunter ? (
        <View style={{ marginTop: 5 }}>
          <Meta>{metaText}</Meta>
        </View>
      ) : null}
    </View>
  )
}

/** Fußzeile: links das CDSE-Logo, daneben Marke, Blatt und Seitenzahl, darunter klein der Urheber-Vermerk
 *  in der Sprache des Blatts (Spielschule: Michèle Wagner, ohne Logo – lib/urheber.ts). Sie steht tiefer als der Inhalt je reicht (SEITE.unten) – auch auf ganz vollen
 *  Seiten bleibt Luft. */
function Fusszeile({ blatt, nr, sprache, heft }: { blatt: Blatt; nr?: string; sprache: Sprache; heft?: HeftAngaben }) {
  const tx = TEXTE[sprache]
  const u = urheberschaft(blatt.bereich)
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      {u.logo ? <Image src={CDSE_LOGO} style={{ width: LOGO_HOEHE * CDSE_LOGO_SEITEN, height: LOGO_HOEHE, marginRight: 8 }} /> : null}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{heft ? heft.fuss : u.marke[sprache]}</Text>
          {/* immer eine Zeile: ein sehr langer Titel endet mit „…“, statt die Fußzeile zu erhöhen */}
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>
            {[nr && !heft ? `${tx.arbeitsblatt} ${nr}` : null, typo(blattInhalt(blatt, sprache).titel, sprache), blatt.passgenau?.herkunft ?? null].filter(Boolean).join('  ·  ')}
          </Text>
          {/* Seiten zählen je Blatt (auch in einer Mappe); ein einseitiger Teil braucht keine Seitenzahl.
              Feste Breite: Der Titel wird gesetzt, bevor die Seitenzahl feststeht – so berührt er sie nie. */}
          {heft ? (
            // im Heft: fortlaufende Seitenzahl (wie im Inhaltsverzeichnis)
            <Text style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: NEUTRAL.text, textAlign: 'right' }} render={({ pageNumber }) => String(pageNumber)} />
          ) : (
            <Text
              style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, textAlign: 'right' }}
              render={({ subPageNumber, subPageTotalPages }) => (subPageTotalPages > 1 ? `${tx.seite} ${subPageNumber} / ${subPageTotalPages}` : '')}
            />
          )}
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{u.text[sprache]}</Text>
      </View>
    </View>
  )
}

function Titelblock({ blatt, inhalt, sprache, p, m, heft }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; m: Masse; heft?: HeftAngaben }) {
  const c: Ctx = { m, p, sprache, nummern: new Map(), breite: BREITE }
  const bild = blatt.bild ?? 'icon:' + (bereichById.get(blatt.bereich)?.icon ?? 'star')
  const d = m.layout === 'jugend' ? 54 : m.layout === 'bild' ? 74 : 64
  // Passgenau, Jugendblatt: kein Kreis-Piktogramm neben dem Titel (wirkt kindlich), der Titel nutzt die ganze Breite
  const ohneBild = !!blatt.passgenau && m.layout === 'jugend'
  return (
    <View style={{ marginBottom: m.abstand * 0.6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, paddingRight: ohneBild ? 0 : 14 }}>
          <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: m.titel, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3 }}>{typo(inhalt.titel, sprache)}</Text>
          {heft?.lernziel ? (
            <Text style={{ fontFamily: m.schrift, fontSize: m.untertitel, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 5 }}>
              <Text style={{ fontWeight: m.fett, color: p.tief }}>{heft.zielWort ?? 'Mein Ziel:'} </Text>
              {typo(heft.lernziel, sprache)}
            </Text>
          ) : blatt.passgenau?.ziel?.[sprache] ? (
            // Passgenau: Ich-Satz des Förderziels statt des Untertitels
            <Text style={{ fontFamily: m.schrift, fontSize: m.untertitel, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 5 }}>
              <Text style={{ fontWeight: m.fett, color: p.tief }}>{typo(TEXTE[sprache].meinZiel + ':', sprache)} </Text>
              {typo(blatt.passgenau.ziel[sprache]!, sprache)}
            </Text>
          ) : inhalt.untertitel ? (
            <Text style={{ fontFamily: m.schrift, fontSize: m.untertitel, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 5 }}>{typo(inhalt.untertitel, sprache)}</Text>
          ) : null}
        </View>
        {ohneBild ? null : <Plakette c={c} id={bild} d={d} />}
      </View>
      {inhalt.anleitung ? (
        <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: NEUTRAL.flaeche, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 10 }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.4, color: NEUTRAL.leise, marginRight: 6 }}>{TEXTE[sprache].anleitung}:</Text>
          <Fliess c={{ ...c, m: { ...LEHRER_MASSE } }} klein farbe={NEUTRAL.leise} style={{ flex: 1, fontSize: 8.6 }}>
            {typo(inhalt.anleitung, sprache)}
          </Fliess>
        </View>
      ) : null}
    </View>
  )
}

/** Kleiner Kopf auf den Folgeseiten dieses Blatts. In einer Mappe zählt pageNumber das ganze
 *  Dokument; beim Umbrechen kennt react-pdf aber nur pageNumber, noch nicht subPageNumber.
 *  Deshalb merkt sich der Kopf die erste Seite seines Blatts – sonst stünde er auch auf der
 *  ersten Seite jedes weiteren Blatts und schöbe dort Inhalt auf eine neue Seite. */
function Folgekopf({ inhalt, sprache, p, m }: { inhalt: BlattInhalt; sprache: Sprache; p: Palette; m: Masse }) {
  const start = { seite: Number.POSITIVE_INFINITY }
  // Spielschule: Auch Seite 2 (das Blatt zum Tun) braucht Name und Datum – Seite 1 wird zerschnitten.
  // „Mein Zeichen“: Feld für das Symbol oder den Aufkleber des Kindes, das seinen Namen noch nicht schreibt.
  const bild = m.layout === 'bild'
  const tx = TEXTE[sprache]
  return (
    <View
      fixed
      render={({ pageNumber, subPageNumber }) => {
        if (subPageNumber === undefined) start.seite = Math.min(start.seite, pageNumber)
        const folgeseite = subPageNumber === undefined ? pageNumber > start.seite : subPageNumber > 1
        if (!folgeseite) return null
        return bild ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10, paddingBottom: 6, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <View style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 6 }} />
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text, flex: 1, maxLines: 2 }}>{typo(inhalt.titel, sprache)}</Text>
            </View>
            <NameFeld label={tx.name} breite={128} m={m} />
            <NameFeld label={tx.datum} breite={62} m={m} />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 14 }}>
              <Text style={{ fontFamily: m.schrift, fontSize: 8.6, color: NEUTRAL.leise, marginRight: 5 }}>{tx.meinZeichen}</Text>
              <View style={{ width: 34, height: 34, borderRadius: 6, borderWidth: 1, borderColor: p.mittel, borderStyle: 'dashed', backgroundColor: '#FFFFFF' }} />
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 6, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <View style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 6 }} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text, flex: 1 }}>{typo(inhalt.titel, sprache)}</Text>
          </View>
        )
      }}
    />
  )
}

function Abschnitt({ titel, children, farbe }: { titel: string; children: React.ReactNode; farbe?: string }) {
  return (
    <View style={{ marginBottom: 11 }} wrap={false}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: farbe ?? NEUTRAL.text, marginBottom: 4, letterSpacing: 0.1 }}>{titel}</Text>
      {children}
    </View>
  )
}

function LText({ children, farbe }: { children: string; farbe?: string }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: LEHRER_MASSE.basis, lineHeight: 1.45, color: farbe ?? NEUTRAL.text }}>{children}</Text>
}

function Lehrerseite({ blatt, inhalt, sprache, p, nr, heft }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; nr?: string; heft?: HeftAngaben }) {
  const tx = TEXTE[sprache]
  const L = inhalt.lehrer
  const ty = (s: string) => typo(s, sprache)
  const punkte = (liste: string[], nummeriert = false) =>
    liste.map((x, i) => (
      <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
        {nummeriert ? (
          <View style={{ width: 15, height: 15, borderRadius: 7.5, backgroundColor: p.zart, alignItems: 'center', justifyContent: 'center', marginRight: 7, marginTop: 0.5 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, color: p.tief }}>{String(i + 1)}</Text>
          </View>
        ) : (
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: p.tief, marginTop: 5.2, marginRight: 8, marginLeft: 3 }} />
        )}
        <View style={{ flex: 1 }}>
          <LText>{ty(x)}</LText>
        </View>
      </View>
    ))
  const sozial = blatt.sozialform.map((s) => tx[s]).join(', ')
  const fakten: [string, string][] = [
    [tx.stufe, stufenText(blatt.stufen)],
    [tx.sozialform, sozial],
    [tx.dauer, dauerText(blatt.dauer, sprache)],
  ]
  if (L.material) fakten.push([tx.material, ty(L.material)])
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Kopfzeile blatt={blatt} nr={nr} sprache={sprache} p={p} m={LEHRER_MASSE} lehrer heft={heft} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, letterSpacing: -0.2 }}>{ty(inhalt.titel)}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, marginBottom: 14, backgroundColor: p.zart, borderRadius: 9, padding: 10 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief, marginRight: 8, marginTop: 0.6 }}>{tx.ziel}</Text>
        <View style={{ flex: 1 }}>
          <LText>{ty(L.ziel)}</LText>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1.62, paddingRight: 18 }}>
          <Abschnitt titel={tx.ablauf}>{punkte(L.ablauf, true)}</Abschnitt>
          {L.differenzierung && (L.differenzierung.leichter || L.differenzierung.schwerer) ? (
            <Abschnitt titel={tx.differenzierung}>
              <View style={{ flexDirection: 'row' }}>
                {L.differenzierung.leichter ? (
                  <View style={{ flex: 1, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8, padding: 8, marginRight: L.differenzierung.schwerer ? 8 : 0 }}>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.2, color: p.tief, marginBottom: 2 }}>{tx.leichter}</Text>
                    <LText>{ty(L.differenzierung.leichter)}</LText>
                  </View>
                ) : null}
                {L.differenzierung.schwerer ? (
                  <View style={{ flex: 1, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8, padding: 8 }}>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.2, color: p.tief, marginBottom: 2 }}>{tx.schwerer}</Text>
                    <LText>{ty(L.differenzierung.schwerer)}</LText>
                  </View>
                ) : null}
              </View>
            </Abschnitt>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: NEUTRAL.flaeche, borderRadius: 10, padding: 11, marginBottom: 11 }}>
            {fakten.map(([k, v]) => (
              <View key={k} style={{ marginBottom: 6 }}>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3 }}>{k.toUpperCase()}</Text>
                <LText>{v}</LText>
              </View>
            ))}
            {blatt.eldib.length ? (
              <View>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginBottom: 3 }}>{tx.eldib.toUpperCase()}</Text>
                {blatt.eldib.map((code) => {
                  const g = eldibGoalById.get(code)
                  const farbe = g ? (eldibDomainById.get(g.domain)?.color ?? NEUTRAL.tinte) : NEUTRAL.tinte
                  return (
                    <View key={code} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2.5 }}>
                      <View style={{ borderRadius: 4, backgroundColor: farbe, paddingHorizontal: 4, paddingVertical: 1, marginRight: 5 }}>
                        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: '#FFFFFF' }}>{code}</Text>
                      </View>
                      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.text }}>{(sprache === 'fr' ? ELDIB_FR[code] : null) ?? g?.label ?? ''}</Text>
                    </View>
                  )
                })}
              </View>
            ) : null}
            {/* Spielschule: Zeichen an den Aufgaben (Einstieg, Stern) – rechts, weil die linke Spalte meist voller ist */}
            {(['einstieg', 'stern'] as const)
              .filter((n) => niveaus(inhalt.bausteine).has(n))
              .map((n, i) => (
                <View key={n} style={{ flexDirection: 'row', alignItems: 'center', marginTop: i ? 3 : 7 }}>
                  <NiveauZeichen niveau={n} g={13} />
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, lineHeight: 1.3, color: NEUTRAL.leise, marginLeft: 5, flex: 1 }}>{n === 'stern' ? tx.niveauStern : tx.niveauEinstieg}</Text>
                </View>
              ))}
          </View>
          {L.achtung ? (
            <View wrap={false} style={{ borderLeftWidth: 3, borderLeftColor: '#B4533A', backgroundColor: '#FBF1EC', borderRadius: 6, padding: 9, marginBottom: 11 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: '#8A3A24', marginBottom: 2 }}>{tx.achtung}</Text>
              <LText>{ty(L.achtung)}</LText>
            </View>
          ) : null}
          {L.loesungen?.length ? (
            <View wrap={false} style={{ borderWidth: 0.8, borderColor: p.mittel, borderRadius: 10, padding: 10, marginBottom: 11 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief, marginBottom: 3 }}>{tx.loesungen}</Text>
              {mitStufen(inhalt.bausteine) ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, lineHeight: 1.35, color: NEUTRAL.leise, marginBottom: 5 }}>{tx.stufen}</Text> : null}
              {L.loesungen.map((x, i) => (
                <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.4, color: NEUTRAL.text, marginBottom: 2 }}>
                  {ty(x)}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      </View>
      <View wrap={false} style={{ borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 4 }}>{tx.hintergrund}</Text>
        <LText>{ty(L.hintergrund)}</LText>
        {L.quellen?.length ? (
          <View style={{ marginTop: 6 }}>
            {L.quellen.map((q, i) => (
              <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, lineHeight: 1.4, color: NEUTRAL.leise, marginBottom: 1.5 }}>
                {typo(q, 'de')}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      {L.impulse?.length || L.tipps?.length ? (
        <View wrap={false} style={{ flexDirection: 'row' }}>
          {L.impulse?.length ? (
            <View style={{ flex: 1, paddingRight: L.tipps?.length ? 18 : 0 }}>
              <Abschnitt titel={tx.impulse}>{punkte(L.impulse)}</Abschnitt>
            </View>
          ) : null}
          {L.tipps?.length ? (
            <View style={{ flex: 1 }}>
              <Abschnitt titel={tx.tipps}>{punkte(L.tipps)}</Abschnitt>
            </View>
          ) : null}
        </View>
      ) : null}
      <Fusszeile blatt={blatt} nr={nr} sprache={sprache} heft={heft} />
    </Page>
  )
}

// --- Spielschule: Seite „Aktivitäten & Ideen“ (zweite Seite für die Lehrperson) ------------------

const IDEEN_TEXT: Record<Sprache, { titel: string; woerter: string; reim: string; gesten: string; ecken: string; eltern: string; material: string }> = {
  de: { titel: 'Aktivitäten & Ideen', woerter: 'Wörter der Woche', reim: 'Reim zum Mitmachen', gesten: 'Bewegungen', ecken: 'Für die Spielecken', eltern: 'Für zu Hause', material: 'Material' },
  fr: { titel: 'Activités et idées', woerter: 'Les mots de la semaine', reim: 'Comptine à mimer', gesten: 'Gestes', ecken: 'Pour les coins de jeu', eltern: 'À la maison', material: 'Matériel' },
}

/** Art der Aktivität: Name, Piktogramm und Farbe (Farben der Bereiche, damit die Seite ruhig bleibt). */
const ART: Record<AktivitaetArt, { de: string; fr: string; icon: string; farben: Farben }> = {
  kreis: { de: 'Sitzkreis', fr: 'Cercle', icon: 'icon:friends', farben: { tief: '#1F6B6F', mittel: '#AFD3D1', zart: '#E6F2F1' } },
  sprache: { de: 'Sprache', fr: 'Langage', icon: 'icon:message-circle', farben: { tief: '#1F6B6F', mittel: '#AFD3D1', zart: '#E6F2F1' } },
  theater: { de: 'Rollenspiel', fr: 'Jeu de rôle', icon: 'icon:masks-theater', farben: { tief: '#1F6B6F', mittel: '#AFD3D1', zart: '#E6F2F1' } },
  bewegung: { de: 'Bewegung', fr: 'Mouvement', icon: 'icon:footsteps', farben: { tief: '#3F6E3A', mittel: '#BBD4B4', zart: '#EAF2E7' } },
  draussen: { de: 'Draußen', fr: 'Dehors', icon: 'icon:tree', farben: { tief: '#3F6E3A', mittel: '#BBD4B4', zart: '#EAF2E7' } },
  gestalten: { de: 'Gestalten', fr: 'Création', icon: 'icon:palette', farben: { tief: '#A33B5B', mittel: '#E3B3C3', zart: '#F8EBF0' } },
  musik: { de: 'Musik & Rhythmus', fr: 'Musique et rythme', icon: 'icon:music', farben: { tief: '#A33B5B', mittel: '#E3B3C3', zart: '#F8EBF0' } },
  sinne: { de: 'Sinne', fr: 'Les sens', icon: 'icon:eye', farben: { tief: '#3E6A85', mittel: '#BDD0DC', zart: '#EDF3F7' } },
  ruhe: { de: 'Ruhe', fr: 'Calme', icon: 'icon:moon', farben: { tief: '#3E6A85', mittel: '#BDD0DC', zart: '#EDF3F7' } },
  zaehlen: { de: 'Zählen & Sortieren', fr: 'Compter et trier', icon: 'icon:abacus', farben: { tief: '#3F46A8', mittel: '#C5C8EE', zart: '#EEEFFB' } },
  spiel: { de: 'Spiel', fr: 'Jeu', icon: 'icon:dice-5', farben: { tief: '#3F46A8', mittel: '#C5C8EE', zart: '#EEEFFB' } },
  kochen: { de: 'Kochen & Probieren', fr: 'Cuisiner et goûter', icon: 'icon:chef-hat', farben: { tief: '#8A6414', mittel: '#E0CB98', zart: '#F8F2E2' } },
}

function IdeenSeite({ blatt, inhalt, sprache, p, nr, heft }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; nr?: string; heft?: HeftAngaben }) {
  const sp = inhalt.lehrer.spielschule
  if (!sp) return null
  const t = IDEEN_TEXT[sprache]
  const ty = (x: string) => typo(x, sprache)
  const klein = (x: string, farbe?: string) => <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.5, lineHeight: 1.42, color: farbe ?? NEUTRAL.text }}>{ty(x)}</Text>
  const ueberschrift = (x: string, farbe?: string) => (
    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.2, color: farbe ?? NEUTRAL.text, marginBottom: 4, letterSpacing: 0.1 }}>{x}</Text>
  )
  // zwei Spalten: links die Aktivitäten 1, 3, 5 …, rechts 2, 4, 6 … (gleich breite Karten, ruhiges Raster)
  const spalten = [sp.aktivitaeten.filter((_, i) => i % 2 === 0), sp.aktivitaeten.filter((_, i) => i % 2 === 1)]
  const karte = (a: (typeof sp.aktivitaeten)[number], i: number) => {
    const art = ART[a.art] ?? ART.spiel
    const ap = palette(art.farben)
    const ac: Ctx = { m: LEHRER_MASSE, p: ap, sprache, nummern: new Map(), breite: BREITE }
    return (
      <View key={i} wrap={false} style={{ borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 9, padding: 9, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Plakette c={ac} id={art.icon} d={20} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, letterSpacing: 0.8, color: ap.tief, marginLeft: 6, flex: 1 }}>{art[sprache].toUpperCase()}</Text>
          {a.dauer ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise }}>{dauerText(a.dauer, sprache)}</Text> : null}
        </View>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, lineHeight: 1.25, color: NEUTRAL.text, marginBottom: 2.5 }}>{ty(a.titel)}</Text>
        {klein(a.text)}
        {a.material ? (
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, lineHeight: 1.35, color: NEUTRAL.leise, marginTop: 3 }}>
            <Text style={{ fontWeight: 600 }}>{t.material + (sprache === 'fr' ? ' : ' : ': ')}</Text>
            {ty(a.material)}
          </Text>
        ) : null}
      </View>
    )
  }
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Kopfzeile blatt={blatt} nr={nr} sprache={sprache} p={p} m={LEHRER_MASSE} lehrer heft={heft} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, letterSpacing: -0.2 }}>{t.titel}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.5, color: NEUTRAL.leise, marginLeft: 8, marginBottom: 2.5, flex: 1 }}>{ty(inhalt.titel)}</Text>
      </View>
      <View style={{ backgroundColor: p.zart, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, marginBottom: 11 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.8, color: p.tief, marginBottom: 5 }}>{t.woerter.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {sp.wortschatz.map((w, i) => (
            <View key={i} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 0.7, borderColor: p.mittel, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 4 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.6, color: NEUTRAL.text }}>{ty(w)}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {spalten.map((liste, s) => (
          <View key={s} style={{ flex: 1, marginRight: s === 0 ? 8 : 0 }}>
            {liste.map((a, i) => karte(a, i))}
          </View>
        ))}
      </View>
      <View wrap={false} style={{ flexDirection: 'row', marginTop: 3 }}>
        {sp.reim ? (
          <View style={{ flex: 1, backgroundColor: NEUTRAL.flaeche, borderRadius: 10, padding: 10, marginRight: sp.ecken?.length || sp.eltern ? 8 : 0 }}>
            {ueberschrift(t.reim, p.tief)}
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 3 }}>{ty(sp.reim.titel)}</Text>
            {sp.reim.zeilen.map((z, i) => (
              <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: 9, lineHeight: 1.45, color: NEUTRAL.text }}>
                {ty(z)}
              </Text>
            ))}
            {sp.reim.gesten ? (
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 4 }}>
                <Text style={{ fontWeight: 600 }}>{t.gesten + (sprache === 'fr' ? ' : ' : ': ')}</Text>
                {ty(sp.reim.gesten)}
              </Text>
            ) : null}
          </View>
        ) : null}
        {sp.ecken?.length || sp.eltern ? (
          <View style={{ flex: 1 }}>
            {sp.ecken?.length ? (
              <View style={{ marginBottom: 8 }}>
                {ueberschrift(t.ecken)}
                {sp.ecken.map((x, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 2.5 }}>
                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: p.tief, marginTop: 4.6, marginRight: 7, marginLeft: 2 }} />
                    <View style={{ flex: 1 }}>{klein(x)}</View>
                  </View>
                ))}
              </View>
            ) : null}
            {sp.eltern ? (
              <View style={{ borderLeftWidth: 3, borderLeftColor: p.tief, backgroundColor: p.zart, borderRadius: 6, padding: 8 }}>
                {ueberschrift(t.eltern, p.tief)}
                {klein(sp.eltern)}
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
      <Fusszeile blatt={blatt} nr={nr} sprache={sprache} heft={heft} />
    </Page>
  )
}

/** Spielschule: Welche Zeichen (Einstieg, Stern) kommen an den Aufgaben vor? Die Lehrerseite erklärt sie. */
function niveaus(liste: Baustein[], out = new Set<'einstieg' | 'stern'>()): Set<'einstieg' | 'stern'> {
  for (const b of liste) {
    if (b.art === 'aufgabe' && b.niveau) out.add(b.niveau)
    if (b.art === 'spalten') {
      niveaus(b.links, out)
      niveaus(b.rechts, out)
    }
  }
  return out
}

/** Haben Aufgaben eine Stufe (Mathe: Punkte an der Nummer)? Dann erklärt die Lehrerseite sie. */
function mitStufen(liste: Baustein[]): boolean {
  return liste.some((b) => (b.art === 'aufgabe' && !!b.stufe) || (b.art === 'spalten' && (mitStufen(b.links) || mitStufen(b.rechts))))
}

export function BlattSeiten({ blatt, opt }: { blatt: Blatt; opt?: BlattOptionen }) {
  const sprache = opt?.sprache ?? 'de'
  const inhalt = blattInhalt(blatt, sprache)
  const bereich = bereichById.get(blatt.bereich) ?? bereichById.get('werkzeuge')!
  const p = palette(opt?.farben ?? bereich.farben)
  const layoutName = opt?.layout ?? blattLayout(blatt)
  // Passgenau, Jugendblatt: großzügigere Schreibzeilen (28 statt 23 pt) – wer Gedanken aufschreibt, braucht Platz
  const m = blatt.passgenau && layoutName === 'jugend' ? { ...MASSE.jugend, zeile: 28 } : MASSE[layoutName]
  const teile = blatt.passgenau?.teile
  const ids = teile ? new Map(inhalt.bausteine.flatMap((b, i) => (teile[i] ? [[b, teile[i]!] as const] : []))) : undefined
  const c: Ctx = { m, p, sprache, nummern: nummerieren(inhalt.bausteine), breite: BREITE, ids }
  const melde = opt?.seite
  // Spielschule: Seite „Beobachten & Begleiten“ und Zusatzseiten mit demselben Kopf und Fuß wie alle Seiten
  const lehrerKopf = <Kopfzeile blatt={blatt} nr={opt?.nr} sprache={sprache} p={p} m={LEHRER_MASSE} lehrer heft={opt?.heft} />
  const fuss = <Fusszeile blatt={blatt} nr={opt?.nr} sprache={sprache} heft={opt?.heft} />
  const moeglich = zusaetzeVon(blatt, sprache)
  const zusaetze = (opt?.zusaetze ?? []).filter((z) => moeglich.includes(z))
  // Spielschule: Experiment der Woche (Seite „Forschen“ und Zusatzseite „Forscherblatt“)
  const experiment = experimentVon(blatt, sprache)
  return (
    <>
      {opt?.schueler !== false ? (
        <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
          {melde ? (
            <Text
              style={{ position: 'absolute', left: 0, top: 0, fontSize: 1, color: '#FFFFFF' }}
              render={({ pageNumber }) => {
                melde(pageNumber)
                return ''
              }}
            />
          ) : null}
          <Folgekopf inhalt={inhalt} sprache={sprache} p={p} m={m} />
          <Kopfzeile blatt={blatt} nr={opt?.nr} sprache={sprache} p={p} m={m} heft={opt?.heft} />
          <Titelblock blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} m={m} heft={opt?.heft} />
          <Bausteine c={c} liste={inhalt.bausteine} oben />
          <Fusszeile blatt={blatt} nr={opt?.nr} sprache={sprache} heft={opt?.heft} />
        </Page>
      ) : null}
      {opt?.lehrer !== false ? <Lehrerseite blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} nr={opt?.nr} heft={opt?.heft} /> : null}
      {opt?.lehrer !== false && inhalt.lehrer.spielschule ? <IdeenSeite blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} nr={opt?.nr} heft={opt?.heft} /> : null}
      {opt?.lehrer !== false && experiment ? <ForschenSeite exp={experiment} sprache={sprache} p={p} kopf={lehrerKopf} fuss={fuss} unter={inhalt.titel} /> : null}
      {opt?.lehrer !== false && hatBegleiten(blatt, inhalt.lehrer.spielschule) ? <BegleitenSeite blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} kopf={lehrerKopf} fuss={fuss} /> : null}
      {zusaetze.map((z) =>
        z === 'klassenraster' ? (
          <KlassenrasterSeite key={z} inhalt={inhalt} sprache={sprache} p={p} kopf={lehrerKopf} fuss={fuss} />
        ) : z === 'portfolio' ? (
          <PortfolioSeite key={z} blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} kopf={<Kopfzeile blatt={blatt} nr={opt?.nr} sprache={sprache} p={p} m={m} heft={opt?.heft} />} fuss={fuss} />
        ) : z === 'forscherblatt' ? (
          experiment ? <ForscherblattSeite key={z} blatt={blatt} exp={experiment} sprache={sprache} p={p} kopf={<Kopfzeile blatt={blatt} nr={opt?.nr} sprache={sprache} p={p} m={m} heft={opt?.heft} />} fuss={fuss} /> : null
        ) : (
          <ElternbriefSeite key={z} blatt={blatt} sprache={sprache} p={p} fuss={fuss} />
        ),
      )}
    </>
  )
}

export function BlattDokument({ blatt, opt }: { blatt: Blatt; opt?: BlattOptionen }) {
  const inhalt = blattInhalt(blatt, opt?.sprache ?? 'de')
  const u = urheberschaft(blatt.bereich)
  return (
    <Document title={inhalt.titel} author={u.name} creator={u.marke.de} producer={u.marke.de} language={opt?.sprache === 'fr' ? 'fr' : 'de'}>
      <BlattSeiten blatt={blatt} opt={opt} />
    </Document>
  )
}

/** Mehrere Blätter in einer Datei (z. B. eine Themenmappe). Jedes Blatt in seiner Sprache (sonst opt.sprache). */
export function MappeDokument({ blaetter, opt, titel }: { blaetter: { blatt: Blatt; nr?: string; sprache?: Sprache }[]; opt?: BlattOptionen; titel: string }) {
  const fr = blaetter.length > 0 && blaetter.every((x) => (x.sprache ?? opt?.sprache) === 'fr')
  // eine Mappe nur aus der Spielschule: Michèle Wagner; sonst wie die Toolbox
  const u = urheberschaft(blaetter.length > 0 && blaetter.every((x) => x.blatt.bereich === 'spielschule') ? 'spielschule' : undefined)
  return (
    <Document title={titel} author={u.name} creator={u.marke.de} producer={u.marke.de} language={fr ? 'fr' : 'de'}>
      {blaetter.map(({ blatt, nr, sprache }) => (
        <BlattSeiten key={blatt.id} blatt={blatt} opt={{ ...opt, nr, sprache: sprache ?? opt?.sprache }} />
      ))}
    </Document>
  )
}
