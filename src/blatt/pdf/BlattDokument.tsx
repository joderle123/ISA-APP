// ---------------------------------------------------------------------------
// Ein Arbeitsblatt als PDF: Schülerseite(n) und auf Wunsch die Seite
// „Für die Lehrperson“. Kopf, Fuß, Raster und Schriften sind für alle Blätter
// gleich – nur Inhalt, Stufe und Bereichsfarbe ändern sich.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text } from '@react-pdf/renderer'
import type { Blatt, BlattInhalt, Sprache } from '../typen'
import { bereichById, layoutFuer, stufenText, themaLabel } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { eldibDomainById, eldibGoalById } from '../../data/taxonomy'
import { Bausteine, nummerieren, Plakette, Fliess, type Ctx } from './bausteine'
import { LEHRER_MASSE, MASSE, SCHRIFT, SEITE, TEXTE, dauerText, typo, type Masse } from './stil'
import { ELDIB_FR } from '../eldib-fr'

const BREITE = 595.28 - SEITE.rand * 2

export interface BlattOptionen {
  sprache?: Sprache
  /** Schülerseiten (Standard: ja) */
  schueler?: boolean
  /** Seite „Für die Lehrperson“ (Standard: ja) */
  lehrer?: boolean
  /** Blattnummer, z. B. 'G-07' */
  nr?: string
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

function Kopfzeile({ blatt, nr, sprache, p, m, lehrer }: { blatt: Blatt; nr?: string; sprache: Sprache; p: Palette; m: Masse; lehrer?: boolean }) {
  const bereich = bereichById.get(blatt.bereich)!
  const tx = TEXTE[sprache]
  const nummer = [nr ? `${tx.arbeitsblatt} ${nr}` : null, stufenText(blatt.stufen)].filter(Boolean).join('  ·  ')
  const thema = themaLabel(blatt.bereich, blatt.thema, sprache)
  const reiter = lehrer ? tx.lehrer : bereich[sprache]
  // Passt die Meta-Zeile neben Reiter, Name und Datum? Breiten je Zeichen an Inter 7,4 pt und
  // Manrope 7 pt (Versalien) gemessen – obere Werte, damit nie eine Zeile ungewollt umbricht.
  const felder = lehrer ? 0 : m.layout === 'bild' ? 14 + 27 + 150 : 14 + 27 + 118 + 14 + 27 + 62
  const frei = BREITE - (reiter.length * 5.85 + 12) - 8 - felder
  const metaText = [nummer, thema].join('  ·  ')
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
        {!lehrer ? (
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

function Fusszeile({ blatt, nr, sprache }: { blatt: Blatt; nr?: string; sprache: Sprache }) {
  const tx = TEXTE[sprache]
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 20, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 6 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>CDSE Toolbox</Text>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1 }}>
        {[nr ? `${tx.arbeitsblatt} ${nr}` : null, blattInhalt(blatt, sprache).titel].filter(Boolean).join('  ·  ')}
      </Text>
      {/* Seiten zählen je Blatt (auch in einer Mappe); ein einseitiger Teil braucht keine Seitenzahl */}
      <Text
        style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise }}
        render={({ subPageNumber, subPageTotalPages }) => (subPageTotalPages > 1 ? `${tx.seite} ${subPageNumber} / ${subPageTotalPages}` : '')}
      />
    </View>
  )
}

function Titelblock({ blatt, inhalt, sprache, p, m }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; m: Masse }) {
  const c: Ctx = { m, p, sprache, nummern: new Map(), breite: BREITE }
  const bild = blatt.bild ?? 'icon:' + (bereichById.get(blatt.bereich)?.icon ?? 'star')
  const d = m.layout === 'jugend' ? 54 : m.layout === 'bild' ? 74 : 64
  return (
    <View style={{ marginBottom: m.abstand * 0.6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: m.titel, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3 }}>{typo(inhalt.titel, sprache)}</Text>
          {inhalt.untertitel ? (
            <Text style={{ fontFamily: m.schrift, fontSize: m.untertitel, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 5 }}>{typo(inhalt.untertitel, sprache)}</Text>
          ) : null}
        </View>
        <Plakette c={c} id={bild} d={d} />
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
function Folgekopf({ inhalt, sprache, p }: { inhalt: BlattInhalt; sprache: Sprache; p: Palette }) {
  const start = { seite: Number.POSITIVE_INFINITY }
  return (
    <View
      fixed
      render={({ pageNumber, subPageNumber }) => {
        if (subPageNumber === undefined) start.seite = Math.min(start.seite, pageNumber)
        const folgeseite = subPageNumber === undefined ? pageNumber > start.seite : subPageNumber > 1
        return folgeseite ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 6, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <View style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 6 }} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text, flex: 1 }}>{typo(inhalt.titel, sprache)}</Text>
          </View>
        ) : null
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

function Lehrerseite({ blatt, inhalt, sprache, p, nr }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; nr?: string }) {
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
      <Kopfzeile blatt={blatt} nr={nr} sprache={sprache} p={p} m={LEHRER_MASSE} lehrer />
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
          </View>
          {L.achtung ? (
            <View wrap={false} style={{ borderLeftWidth: 3, borderLeftColor: '#B4533A', backgroundColor: '#FBF1EC', borderRadius: 6, padding: 9, marginBottom: 11 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: '#8A3A24', marginBottom: 2 }}>{tx.achtung}</Text>
              <LText>{ty(L.achtung)}</LText>
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
      <Fusszeile blatt={blatt} nr={nr} sprache={sprache} />
    </Page>
  )
}

export function BlattSeiten({ blatt, opt }: { blatt: Blatt; opt?: BlattOptionen }) {
  const sprache = opt?.sprache ?? 'de'
  const inhalt = blattInhalt(blatt, sprache)
  const bereich = bereichById.get(blatt.bereich) ?? bereichById.get('werkzeuge')!
  const p = palette(bereich.farben)
  const m = MASSE[blatt.layout ?? (blatt.bereich === 'werkzeuge' ? 'jugend' : layoutFuer(blatt.stufen))]
  const c: Ctx = { m, p, sprache, nummern: nummerieren(inhalt.bausteine), breite: BREITE }
  return (
    <>
      {opt?.schueler !== false ? (
        <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
          <Folgekopf inhalt={inhalt} sprache={sprache} p={p} />
          <Kopfzeile blatt={blatt} nr={opt?.nr} sprache={sprache} p={p} m={m} />
          <Titelblock blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} m={m} />
          <Bausteine c={c} liste={inhalt.bausteine} />
          <Fusszeile blatt={blatt} nr={opt?.nr} sprache={sprache} />
        </Page>
      ) : null}
      {opt?.lehrer !== false ? <Lehrerseite blatt={blatt} inhalt={inhalt} sprache={sprache} p={p} nr={opt?.nr} /> : null}
    </>
  )
}

export function BlattDokument({ blatt, opt }: { blatt: Blatt; opt?: BlattOptionen }) {
  const inhalt = blattInhalt(blatt, opt?.sprache ?? 'de')
  return (
    <Document title={inhalt.titel} author="CDSE Toolbox" creator="CDSE Toolbox" producer="CDSE Toolbox" language={opt?.sprache === 'fr' ? 'fr' : 'de'}>
      <BlattSeiten blatt={blatt} opt={opt} />
    </Document>
  )
}

/** Mehrere Blätter in einer Datei (z. B. eine Themenmappe). Jedes Blatt in seiner Sprache (sonst opt.sprache). */
export function MappeDokument({ blaetter, opt, titel }: { blaetter: { blatt: Blatt; nr?: string; sprache?: Sprache }[]; opt?: BlattOptionen; titel: string }) {
  const fr = blaetter.length > 0 && blaetter.every((x) => (x.sprache ?? opt?.sprache) === 'fr')
  return (
    <Document title={titel} author="CDSE Toolbox" creator="CDSE Toolbox" producer="CDSE Toolbox" language={fr ? 'fr' : 'de'}>
      {blaetter.map(({ blatt, nr, sprache }) => (
        <BlattSeiten key={blatt.id} blatt={blatt} opt={{ ...opt, nr, sprache: sprache ?? opt?.sprache }} />
      ))}
    </Document>
  )
}
