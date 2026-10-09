// ---------------------------------------------------------------------------
// Spielschule: Forscherblatt der Kinder zum Experiment der Woche – drei große
// Rahmen „Ich vermute“ (Bild einkreisen), „Ich sehe“ (malen oder stempeln,
// auf Wunsch vorher/nachher) und „So war es“ (Bild oder Gesicht einkreisen).
// Ohne Lesen: Nummer, Piktogramm und Handlungssymbol führen; die Wörter sind
// für die Erwachsenen, die vorlesen. Eine ganze Seite (Seite 2 des Schülerteils
// oder Zusatzseite „Forscherblatt“).
// ---------------------------------------------------------------------------

import { View, Text } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Forscherblatt, ForscherWahl, Gefuehl, Sprache } from '../typen'
import { iconZeichnung, NEUTRAL, type Zeichnung } from '../zeichnung'
import { gesichtZeichnung } from '../gesichter'
import { forscherZeichnung } from '../forschen'
import { Zeichnen } from './Zeichnen'
import { SCHRIFT, typo } from './stil'
import type { Ctx } from './bausteine'

export const FORSCHERBLATT_TEXT: Record<Sprache, { vermuten: string; sehen: string; ergebnis: string; vorher: string; nachher: string; name: string; titel: string }> = {
  de: { vermuten: 'Ich vermute', sehen: 'Ich sehe', ergebnis: 'So war es', vorher: 'vorher', nachher: 'nachher', name: 'Name', titel: 'Forscherblatt' },
  fr: { vermuten: 'Je pense', sehen: 'J’observe', ergebnis: 'Ce qui s’est passé', vorher: 'avant', nachher: 'après', name: 'Prénom', titel: 'Fiche du chercheur' },
}

/** Einkreisen (wie das Aufgabensymbol) – Linie um einen Punkt. */
const EINKREISEN: Zeichnung = {
  vb: [0, 0, 24, 24],
  w: 1.7,
  formen: [
    { t: 'path', d: 'M18 7 Q12 2 6 6 Q2 10 4 15 Q7 21 14 20 Q20 18 20 12 Q20 8 16 6', s: 'tinte', f: 'none' },
    { t: 'circle', cx: 12, cy: 12.5, r: 1.6, s: 'none', f: 'tinte' },
  ],
}

/** Bild aus einem Verweis; Piktogramme groß gedruckt mit feinerem Strich (wie Bild in bausteine). */
function FBild({ c, id, g }: { c: Ctx; id: string; g: number }) {
  let z = forscherZeichnung(id)
  if (id.startsWith('icon:') || id.startsWith('forschen:')) z = { ...z, w: Math.max(0.55, Math.min(1.7, (2.3 * 24) / g)) }
  return <Zeichnen z={z} p={c.p} breite={g} hoehe={g} />
}

function Symbol({ c, z }: { c: Ctx; z: Zeichnung }) {
  const g = 22
  return (
    <View style={{ width: g, height: g, borderRadius: g * 0.28, borderWidth: 1, borderColor: NEUTRAL.rahmen, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Zeichnen z={z} p={c.p} breite={g * 0.66} />
    </View>
  )
}

const KOPF = 104
const LUECKE = 12

/** Linke Spalte eines Rahmens: Nummer, großes Piktogramm, Wort, Handlungssymbol. */
function RahmenKopf({ c, n, icon, wort, symbol }: { c: Ctx; n: number; icon: string; wort: string; symbol: Zeichnung }) {
  const d = 50
  return (
    <View style={{ width: KOPF, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', justifyContent: 'space-between', marginBottom: 6 }}>
        <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: c.p.tief, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 14, color: '#FFFFFF', lineHeight: 1, marginTop: 0.5 }}>{String(n)}</Text>
        </View>
        <Symbol c={c} z={symbol} />
      </View>
      <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: c.p.zart, alignItems: 'center', justifyContent: 'center' }}>
        <Zeichnen z={{ ...iconZeichnung(icon.replace('icon:', '')), w: 1.5 }} p={{ ...c.p, tinte: c.p.tief }} breite={d * 0.56} />
      </View>
      <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: 13.5, lineHeight: 1.2, color: c.p.tief, textAlign: 'center', marginTop: 5 }}>{typo(wort, c.sprache)}</Text>
    </View>
  )
}

function Rahmen({ c, children, hoehe }: { c: Ctx; children: ReactNode; hoehe: number }) {
  return (
    <View wrap={false} style={{ flexDirection: 'row', height: hoehe, borderWidth: 1.3, borderColor: c.p.mittel, borderRadius: 14, padding: 10, marginTop: LUECKE }}>
      {children}
    </View>
  )
}

/** Auswahl zum Einkreisen: Bilder (mit Wort darunter), Daumen oder Gesichter – gleich breite Felder. */
function Wahl({ c, wahl, breite, hoehe }: { c: Ctx; wahl: ({ z?: Zeichnung } & Partial<ForscherWahl>)[]; breite: number; hoehe: number }) {
  const n = wahl.length
  const luecke = 12
  const w = (breite - luecke * (n - 1)) / n
  const text = wahl.some((x) => x.text)
  const g = Math.min(w * 0.62, hoehe - (text ? 34 : 18), 78)
  return (
    <View style={{ flexDirection: 'row' }}>
      {wahl.map((x, i) => (
        <View key={i} style={{ width: w, height: hoehe, marginRight: i < n - 1 ? luecke : 0, borderWidth: 1, borderColor: NEUTRAL.haarlinie, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
          <View style={{ height: g, alignItems: 'center', justifyContent: 'center' }}>
            {x.z ? <Zeichnen z={x.z} p={c.p} breite={g} hoehe={g} /> : x.bild ? <FBild c={c} id={x.bild} g={g} /> : null}
          </View>
          {x.text ? (
            <Text style={{ fontFamily: c.m.schrift, fontSize: 12.5, lineHeight: 1.15, color: NEUTRAL.text, textAlign: 'center', marginTop: 6, maxLines: 1 }}>{typo(x.text, c.sprache)}</Text>
          ) : null}
        </View>
      ))}
    </View>
  )
}

const DAUMEN = (): { z: Zeichnung }[] => [{ z: { ...iconZeichnung('thumb-up'), w: 1.15 } }, { z: { ...iconZeichnung('thumb-down'), w: 1.15 } }]
const GESICHTER: Gefuehl[] = ['froh', 'ueberrascht', 'verwirrt']

/** Malfeld (gestrichelt), auf Wunsch mit kleinem Wort oben links („vorher“, „nachher“). */
function Malfeld({ c, breite, hoehe, wort }: { c: Ctx; breite: number; hoehe: number; wort?: string }) {
  return (
    <View style={{ width: breite, height: hoehe, borderWidth: 1.1, borderStyle: 'dashed', borderColor: c.p.mittel, borderRadius: 12 }}>
      {wort ? (
        <View style={{ position: 'absolute', left: 8, top: 7, backgroundColor: c.p.zart, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 }}>
          <Text style={{ fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: 11, color: c.p.tief }}>{typo(wort, c.sprache)}</Text>
        </View>
      ) : null}
      <View style={{ position: 'absolute', right: 8, bottom: 7, opacity: 0.55 }}>
        <Zeichnen z={iconZeichnung('pencil')} p={{ ...c.p, tinte: c.p.tief }} breite={14} />
      </View>
    </View>
  )
}

/** Höhen der drei Rahmen (pt). Auf Seite 2 und auf der Zusatzseite passt das Blatt mit Kopf auf eine Seite. */
const H = { wahl: 136, sehen: 280 }

/** Das Forscherblatt als Baustein (ganze Breite). `frage` und `bild` oben; ohne `name: false` eine Namenszeile.
 *  `sehenHoehe`: Höhe des Rahmens „Ich sehe“ (die Zusatzseite hat einen höheren Kopf und nimmt ihn etwas kleiner). */
export function ForscherblattBlock({ c, b, sehenHoehe = H.sehen }: { c: Ctx; b: Forscherblatt; sehenHoehe?: number }) {
  const t = FORSCHERBLATT_TEXT[c.sprache]
  const innen = c.breite - 2 * 11.3 - KOPF - 14
  const wahl = (liste: ForscherWahl[] | undefined) => (liste?.length ? liste : DAUMEN())
  const ergebnis = b.ergebnis === 'gesichter' ? GESICHTER.map((g) => ({ z: gesichtZeichnung(g) })) : wahl(b.ergebnis?.length ? b.ergebnis : b.vermuten)
  const vorherNachher = b.sehen === 'vorher-nachher'
  const sehenH = sehenHoehe - 23
  const pfeil = 22
  return (
    <View wrap={false}>
      {b.name !== false ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 8 }}>
          <Text style={{ fontFamily: c.m.schrift, fontSize: 11, color: NEUTRAL.leise, marginRight: 6 }}>{t.name}</Text>
          <View style={{ width: 170, height: 16, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        </View>
      ) : null}
      {b.frage ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: c.p.zart, borderRadius: 14, paddingVertical: 9, paddingHorizontal: 12 }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <FBild c={c} id={b.bild ?? 'icon:search'} g={b.bild && !b.bild.startsWith('icon:') ? 42 : 28} />
          </View>
          <Text style={{ flex: 1, fontFamily: c.m.schrift, fontWeight: c.m.fett, fontSize: 17, lineHeight: 1.25, color: NEUTRAL.text }}>{typo(b.frage, c.sprache)}</Text>
        </View>
      ) : null}
      <Rahmen c={c} hoehe={H.wahl}>
        <RahmenKopf c={c} n={1} icon="icon:bulb" wort={t.vermuten} symbol={EINKREISEN} />
        <View style={{ width: 14 }} />
        <Wahl c={c} wahl={wahl(b.vermuten)} breite={innen} hoehe={H.wahl - 23} />
      </Rahmen>
      <Rahmen c={c} hoehe={sehenHoehe}>
        <RahmenKopf c={c} n={2} icon="icon:eye" wort={t.sehen} symbol={iconZeichnung('brush')} />
        <View style={{ width: 14 }} />
        {vorherNachher ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Malfeld c={c} breite={(innen - pfeil) / 2} hoehe={sehenH} wort={t.vorher} />
            <View style={{ width: pfeil, alignItems: 'center' }}>
              <Zeichnen z={{ ...iconZeichnung('arrow-right'), w: 2.2 }} p={{ ...c.p, tinte: c.p.tief }} breite={16} />
            </View>
            <Malfeld c={c} breite={(innen - pfeil) / 2} hoehe={sehenH} wort={t.nachher} />
          </View>
        ) : (
          <Malfeld c={c} breite={innen} hoehe={sehenH} />
        )}
      </Rahmen>
      <Rahmen c={c} hoehe={H.wahl}>
        <RahmenKopf c={c} n={3} icon="icon:circle-check" wort={t.ergebnis} symbol={EINKREISEN} />
        <View style={{ width: 14 }} />
        <Wahl c={c} wahl={ergebnis} breite={innen} hoehe={H.wahl - 23} />
      </Rahmen>
    </View>
  )
}
