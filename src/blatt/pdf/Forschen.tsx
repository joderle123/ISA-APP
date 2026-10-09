// ---------------------------------------------------------------------------
// Spielschule: Lehrerseite „Forschen: Experiment der Woche“ (nach „Aktivitäten
// & Ideen“, vor „Beobachten & Begleiten“) und die Zusatzseite „Forscherblatt“.
// Dieselbe Seite steht – mit eigenem Kopf und Fuß – in der Forscherkartei.
// Aufbau: Forscherfrage groß, Material mit Bildern, Schritte mit Piktogrammen,
// Vermuten – Beobachten – Erklären (mit „Warum?“ für Kinder als Sprechblase),
// Hintergrund für Erwachsene, Sicherheit mit den Standardsätzen, Weiterforschen.
// ---------------------------------------------------------------------------

import { Page, View, Text } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { BildId, Blatt, Experiment, Sprache } from '../typen'
import { iconZeichnung, NEUTRAL, type Palette } from '../zeichnung'
import { forscherZeichnung, materialBild, phaenomenById, schrittBild, textVon } from '../forschen'
import { sicherheitText } from '../spielschule'
import { Zeichnen } from './Zeichnen'
import { type Ctx } from './bausteine'
import { ForscherblattBlock, FORSCHERBLATT_TEXT } from './Forscherblatt'
import { MASSE, SCHRIFT, SEITE, dauerText, typo } from './stil'

const BREITE = 595.28 - SEITE.rand * 2
const ROT = { linie: '#B4533A', flaeche: '#FBF1EC', text: '#8A3A24' }

export const FORSCHEN_TEXT: Record<
  Sprache,
  { titel: string; frage: string; material: string; schritte: string; vermuten: string; beobachten: string; erklaeren: string; warum: string; hintergrund: string; sicherheit: string; weiter: string; dauer: string; phaenomen: string; phaenomene: string }
> = {
  de: {
    titel: 'Forschen: Experiment der Woche',
    frage: 'Unsere Forscherfrage',
    material: 'Material',
    schritte: 'Schritt für Schritt',
    vermuten: 'Vermuten',
    beobachten: 'Beobachten',
    erklaeren: 'Erklären',
    warum: 'Warum? (für Kinder)',
    hintergrund: 'Hintergrund (für Erwachsene)',
    sicherheit: 'Sicherheit',
    weiter: 'Weiterforschen',
    dauer: 'Dauer',
    phaenomen: 'Phänomen',
    phaenomene: 'Phänomene',
  },
  fr: {
    titel: 'Explorer : l’expérience de la semaine',
    frage: 'Notre question',
    material: 'Matériel',
    schritte: 'Étape par étape',
    vermuten: 'Supposer',
    beobachten: 'Observer',
    erklaeren: 'Expliquer',
    warum: 'Pourquoi ? (pour les enfants)',
    hintergrund: 'Repères scientifiques (pour les adultes)',
    sicherheit: 'Sécurité',
    weiter: 'Pour aller plus loin',
    dauer: 'Durée',
    phaenomen: 'Phénomène',
    phaenomene: 'Phénomènes',
  },
}

/** Bild auf getöntem Kreis; Piktogramme fein, Motive größer. Ohne Bild ein ruhiger Punkt. */
function Rund({ id, d, p, ton }: { id?: string; d: number; p: Palette; ton?: string }) {
  const istIcon = !id || id.startsWith('icon:') || id.startsWith('forschen:')
  const g = istIcon ? d * 0.56 : d * 0.82
  const z = id ? forscherZeichnung(id) : null
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: ton ?? p.zart, alignItems: 'center', justifyContent: 'center' }}>
      {z ? (
        <Zeichnen z={istIcon ? { ...z, w: Math.max(0.9, Math.min(1.9, (2.1 * 24) / g)) } : z} p={p} breite={g} hoehe={g} />
      ) : (
        <View style={{ width: d * 0.22, height: d * 0.22, borderRadius: d * 0.11, backgroundColor: p.mittel }} />
      )}
    </View>
  )
}

function Ueberschrift({ children, farbe, icon, p }: { children: string; farbe?: string; icon?: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      {icon ? (
        <View style={{ marginRight: 5 }}>
          <Zeichnen z={{ ...iconZeichnung(icon), w: 2 }} p={{ ...p, tinte: farbe ?? p.tief }} breite={11} />
        </View>
      ) : null}
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: farbe ?? NEUTRAL.text, letterSpacing: 0.1 }}>{children}</Text>
    </View>
  )
}

function T({ children, groesse = 8.5, farbe, lh = 1.42, style }: { children: ReactNode; groesse?: number; farbe?: string; lh?: number; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: lh, color: farbe ?? NEUTRAL.text, ...style }}>{children}</Text>
}

function Chip({ text, p }: { text: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: NEUTRAL.rahmen, borderRadius: 9, paddingHorizontal: 6, paddingVertical: 2, marginRight: 4, marginBottom: 3 }}>
      <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: p.tief, marginRight: 4 }} />
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.text }}>{text}</Text>
    </View>
  )
}

/** Ein Schritt von „Vermuten – Beobachten – Erklären“ als Karte. */
function Phase({ n, titel, icon, p, children, ton, breit = 1 }: { n: number; titel: string; icon: string; p: Palette; children: ReactNode; ton?: boolean; breit?: number }) {
  return (
    <View style={{ flex: breit, borderWidth: 0.8, borderColor: ton ? p.mittel : NEUTRAL.rahmen, backgroundColor: ton ? p.zart : '#FFFFFF', borderRadius: 9, padding: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Rund id={'icon:' + icon} d={20} p={p} ton={ton ? '#FFFFFF' : undefined} />
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief, marginLeft: 6, flex: 1 }}>{titel}</Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: NEUTRAL.sehrLeise }}>{String(n)}</Text>
      </View>
      {children}
    </View>
  )
}

function Pfeil({ p }: { p: Palette }) {
  return (
    <View style={{ width: 14, alignItems: 'center', justifyContent: 'center' }}>
      <Zeichnen z={{ ...iconZeichnung('arrow-right'), w: 2.2 }} p={{ ...p, tinte: p.mittel }} breite={11} />
    </View>
  )
}

/** Sprechblase mit Zipfel unten links (Kinderschrift: so sagt man es den Kindern). */
function Sprechblase({ text, sprache, p }: { text: string; sprache: Sprache; p: Palette }) {
  return (
    <View style={{ marginBottom: 6 }}>
      <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.9, borderColor: p.mittel, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 8 }}>
        <Text style={{ fontFamily: SCHRIFT.kind, fontSize: 9, lineHeight: 1.36, color: NEUTRAL.text }}>{typo(text, sprache)}</Text>
      </View>
      <View style={{ position: 'absolute', left: 14, bottom: -4.4, width: 9, height: 9, backgroundColor: '#FFFFFF', borderRightWidth: 0.9, borderBottomWidth: 0.9, borderColor: p.mittel, transform: 'rotate(45deg)' }} />
    </View>
  )
}

/**
 * Lehrerseite „Forschen“. `kopf` und `fuss` kommen fertig vom Aufrufer (Blatt: Kopf „Für die Lehrperson“;
 * Forscherkartei: Thema und fortlaufende Seitenzahl). `unter`: Titel der Einheit neben der Überschrift.
 */
export function ForschenSeite({ exp, sprache, p, kopf, fuss, unter, titel }: { exp: Experiment; sprache: Sprache; p: Palette; kopf: ReactNode; fuss: ReactNode; unter: string; titel?: string }) {
  const t = FORSCHEN_TEXT[sprache]
  const ty = (x: string) => typo(x, sprache)
  const sicher = exp.sicherheit.map((x) => sicherheitText(x, sprache))
  const phaen = exp.phaenomene.map((id) => phaenomenById.get(id)).filter((x) => !!x)
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      {kopf}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 7 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, letterSpacing: -0.2 }}>{ty(titel ?? t.titel)}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.5, color: NEUTRAL.leise, marginLeft: 8, marginBottom: 2.5, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(unter)}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 6 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.8, color: NEUTRAL.leise, marginRight: 6, marginBottom: 3 }}>{(phaen.length > 1 ? t.phaenomene : t.phaenomen).toUpperCase()}</Text>
        {phaen.map((x) => (
          <Chip key={x.id} text={ty(x[sprache])} p={p} />
        ))}
      </View>

      {/* Forscherfrage */}
      <View wrap={false} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: p.zart, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 12 }}>
        <Rund id="icon:search" d={44} p={p} ton="#FFFFFF" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
            <Text style={{ flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.8, color: p.tief, maxLines: 1, textOverflow: 'ellipsis' }}>{(titel ? t.frage : `${t.frage}  ·  ${ty(exp.titel)}`).toUpperCase()}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 1.5, marginLeft: 8 }}>
              <View style={{ marginRight: 4 }}>
                <Zeichnen z={{ ...iconZeichnung('clock'), w: 2 }} p={{ ...p, tinte: p.tief }} breite={8.5} />
              </View>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.4, color: NEUTRAL.text }}>{`${t.dauer}${sprache === 'fr' ? ' : ' : ': '}${dauerText(exp.dauer, sprache)}`}</Text>
            </View>
          </View>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 16, lineHeight: 1.24, color: NEUTRAL.text, letterSpacing: -0.15 }}>{ty(exp.frage)}</Text>
        </View>
      </View>

      {/* Material | Schritte */}
      <View wrap={false} style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={{ width: 178, marginRight: 18 }}>
          <Ueberschrift p={p} icon="package">{t.material}</Ueberschrift>
          {exp.material.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3.5 }}>
              <Rund id={materialBild(x)} d={20} p={p} ton={NEUTRAL.flaeche} />
              <View style={{ flex: 1, marginLeft: 6 }}>
                <T groesse={8.4} lh={1.3}>
                  {ty(textVon(x))}
                </T>
              </View>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <Ueberschrift p={p} icon="list-check">{t.schritte}</Ueberschrift>
          {exp.schritte.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4.5 }}>
              <View style={{ width: 17, height: 17, borderRadius: 8.5, backgroundColor: p.tief, alignItems: 'center', justifyContent: 'center', marginTop: 2.5 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: '#FFFFFF', lineHeight: 1 }}>{String(i + 1)}</Text>
              </View>
              <View style={{ marginLeft: 5, marginRight: 8 }}>
                <Rund id={schrittBild(x)} d={22} p={p} />
              </View>
              <View style={{ flex: 1, paddingTop: 1.5 }}>
                <T groesse={8.6} lh={1.34}>
                  {ty(textVon(x))}
                </T>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Vermuten – Beobachten – Erklären */}
      <View wrap={false} style={{ flexDirection: 'row', alignItems: 'stretch', marginBottom: 10 }}>
        <Phase n={1} titel={t.vermuten} icon="bulb" p={p} breit={0.86}>
          <T groesse={8.2} lh={1.38}>
            {ty(exp.vermutung)}
          </T>
        </Phase>
        <Pfeil p={p} />
        <Phase n={2} titel={t.beobachten} icon="eye" p={p} breit={0.86}>
          <T groesse={8.2} lh={1.38}>
            {ty(exp.beobachten)}
          </T>
        </Phase>
        <Pfeil p={p} />
        <Phase n={3} titel={t.erklaeren} icon="message-circle" p={p} ton breit={1.28}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.4, color: p.tief, marginBottom: 3 }}>{ty(t.warum)}</Text>
          <Sprechblase text={exp.warumKind} sprache={sprache} p={p} />
        </Phase>
      </View>

      {/* Hintergrund für Erwachsene (klein) */}
      <View wrap={false} style={{ borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 7, marginBottom: 9 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: NEUTRAL.leise, marginBottom: 2 }}>{ty(t.hintergrund)}</Text>
        <T groesse={7.8} farbe={NEUTRAL.leise} lh={1.38}>
          {ty(exp.hintergrund)}
        </T>
      </View>

      {/* Sicherheit | Weiterforschen */}
      <View wrap={false} style={{ flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ flex: 1.5, borderLeftWidth: 3, borderLeftColor: ROT.linie, backgroundColor: ROT.flaeche, borderRadius: 6, padding: 8, marginRight: 10 }}>
          <Ueberschrift p={p} icon="alert-triangle" farbe={ROT.text}>
            {t.sicherheit}
          </Ueberschrift>
          {sicher.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: ROT.text, width: 10 }}>{String(i + 1)}</Text>
              <View style={{ flex: 1 }}>
                <T groesse={8.1} lh={1.36}>
                  {ty(x)}
                </T>
              </View>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, borderLeftWidth: 3, borderLeftColor: p.tief, backgroundColor: p.zart, borderRadius: 6, padding: 8 }}>
          <Ueberschrift p={p} icon="route" farbe={p.tief}>
            {t.weiter}
          </Ueberschrift>
          <T groesse={8.2} lh={1.38}>
            {ty(exp.weiter)}
          </T>
        </View>
      </View>
      {fuss}
    </Page>
  )
}

/** Zusatzseite „Forscherblatt“: Kopf mit Name (wie die Schülerseite), Titel des Experiments, darunter das Blatt. */
export function ForscherblattSeite({ blatt, exp, sprache, p, kopf, fuss }: { blatt: Blatt; exp: Experiment; sprache: Sprache; p: Palette; kopf: ReactNode; fuss: ReactNode }) {
  const m = MASSE.bild
  const c: Ctx = { m, p, sprache, nummern: new Map(), breite: BREITE }
  const fb = exp.forscherblatt ?? {}
  const bild: BildId = blatt.bild ?? 'icon:search'
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      {kopf}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 6 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 0.9, color: p.tief, marginBottom: 2 }}>{FORSCHERBLATT_TEXT[sprache].titel.toUpperCase()}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: exp.titel.length <= 34 ? 23 : exp.titel.length <= 42 ? 19 : 16, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3, maxLines: 1 }}>{typo(exp.titel, sprache)}</Text>
        </View>
        <Rund id={bild} d={58} p={p} />
      </View>
      <ForscherblattBlock c={c} b={{ ...fb, frage: fb.frage ?? exp.frage, name: false }} sehenHoehe={258} />
      {fuss}
    </Page>
  )
}
