// ---------------------------------------------------------------------------
// Bausteine für Passgenau (Konzept 7.5, 10): Zielkarte, Check-in, Wahlkarte,
// Stundenleiste und Abhaken. Gleiche Schriften, Farben und Maße wie alle
// Bausteine; jugendgerecht (nüchtern, Text statt Bildwahl) in der Gestaltung
// `jugend`. Ruhig gezeichnet: keine Smileys bei Jugendlichen, keine Bewertung.
// ---------------------------------------------------------------------------

import { View, Text } from '@react-pdf/renderer'
import type { Baustein, Gefuehl, Sprache } from '../typen'
import { NEUTRAL } from '../zeichnung'
import { gesichtZeichnung } from '../gesichter'
import { Zeichnen } from './Zeichnen'
import { SCHRIFT, typo } from './stil'
import { Fliess, Kaestchen, Plakette, type Ctx } from './bausteine'

const T: Record<Sprache, { meinZiel: string; geschafft: string; wahl: string; heute: string; checkin: string; min: string; erledigt: string; wetter: string[] }> = {
  de: { meinZiel: 'Mein Ziel', geschafft: 'geschafft', wahl: 'Heute möchte ich zuerst …', heute: 'Das machen wir heute', checkin: 'So bin ich heute da:', min: 'Min.', erledigt: 'Heute', wetter: ['sonnig', 'wolkig', 'Regen', 'Gewitter'] },
  fr: { meinZiel: 'Mon objectif', geschafft: 'réussi', wahl: 'Aujourd’hui, je voudrais d’abord …', heute: 'Ce qu’on fait aujourd’hui', checkin: 'Comment je suis là aujourd’hui :', min: 'min', erledigt: 'Aujourd’hui', wetter: ['soleil', 'nuages', 'pluie', 'orage'] },
}

const ty = (c: Ctx, s: string) => typo(s, c.sprache)
const jung = (c: Ctx) => c.m.layout !== 'jugend'

/** Zielkarte: Ich-Satz groß, darunter Kästchen „geschafft“ (Wochenziel, Ziel einer Folge). */
export function Zielkarte({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'zielkarte' }> }) {
  const tx = T[c.sprache]
  const n = Math.max(1, Math.min(7, b.kaestchen ?? b.tage?.length ?? 3))
  const k = c.m.kaestchen * 1.6
  return (
    <View wrap={false} style={{ borderWidth: 1.2, borderColor: c.p.tief, borderRadius: 12, padding: 12, backgroundColor: c.p.zart }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, letterSpacing: 0.9, color: c.p.tief, marginBottom: 5 }}>{(b.titel ?? tx.meinZiel).toUpperCase()}</Text>
      <Fliess c={c} fett groesse={c.m.basis * 1.25}>
        {ty(c, b.text)}
      </Fliess>
      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-end' }}>
        {Array.from({ length: n }, (_, i) => (
          <View key={i} style={{ alignItems: 'center', marginRight: 14 }}>
            <Kaestchen c={c} groesse={k} />
            <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein * 0.9, color: NEUTRAL.leise, marginTop: 3 }}>{ty(c, b.tage?.[i] ?? tx.geschafft)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

/** Check-in: Gesichter, Wetter oder Zahl 0–10 zum Einkreisen. Jugendliche: nie Gesichter (Zahl). */
export function Checkin({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'checkin' }> }) {
  const tx = T[c.sprache]
  const modus = !jung(c) && b.modus === 'gesichter' ? 'zahl' : (b.modus ?? (jung(c) ? 'gesichter' : 'zahl'))
  const frage = b.frage ?? tx.checkin
  if (modus === 'zahl') {
    const d = c.m.kaestchen * 1.9
    return (
      <View wrap={false}>
        <Fliess c={c} fett>
          {ty(c, frage)}
        </Fliess>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          {Array.from({ length: 11 }, (_, i) => (
            <View key={i} style={{ width: d, height: d, borderRadius: d / 2, borderWidth: 1, borderColor: NEUTRAL.leise, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 700, fontSize: d * 0.42, color: NEUTRAL.text }}>{String(i)}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
  const opt: { id: string; text: string }[] =
    modus === 'wetter'
      ? [
          { id: 'icon:sun', text: tx.wetter[0] },
          { id: 'icon:cloud', text: tx.wetter[1] },
          { id: 'icon:cloud-rain', text: tx.wetter[2] },
          { id: 'icon:cloud-storm', text: tx.wetter[3] },
        ]
      : (['froh', 'ruhig', 'traurig', 'wuetend'] as Gefuehl[]).map((g) => ({ id: `gesicht:${g}`, text: '' }))
  const d = c.m.layout === 'bild' ? 64 : 52
  return (
    <View wrap={false}>
      <Fliess c={c} fett>
        {ty(c, frage)}
      </Fliess>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
        {opt.map((o) => (
          <View key={o.id} style={{ alignItems: 'center' }}>
            {o.id.startsWith('gesicht:') ? <Zeichnen z={gesichtZeichnung(o.id.slice(8) as Gefuehl)} p={c.p} breite={d} /> : <Plakette c={c} id={o.id} d={d} />}
            {o.text ? <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein, color: NEUTRAL.leise, marginTop: 3 }}>{ty(c, o.text)}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  )
}

/** Wahlkarte: 2–3 Optionen nebeneinander, je Bild, Text und Kästchen. Jugendliche: Text-Kacheln ohne Bild. */
export function Wahlkarte({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'wahlkarte' }> }) {
  const tx = T[c.sprache]
  const optionen = b.optionen.slice(0, 3)
  const d = c.m.layout === 'bild' ? 70 : c.m.layout === 'jugend' ? 0 : 56
  return (
    <View wrap={false}>
      <Fliess c={c} fett>
        {ty(c, b.frage ?? tx.wahl)}
      </Fliess>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {optionen.map((o, i) => (
          <View key={i} style={{ flex: 1, marginRight: i < optionen.length - 1 ? 10 : 0, borderWidth: 1, borderColor: NEUTRAL.rahmen, borderRadius: 12, padding: 10, alignItems: 'center' }}>
            {d && o.bild ? <Plakette c={c} id={o.bild} d={d} /> : null}
            <Fliess c={c} zentriert style={{ marginTop: d ? 6 : 0 }}>
              {ty(c, o.text)}
            </Fliess>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Kaestchen c={c} groesse={c.m.kaestchen * 1.3} />
              {o.min ? <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein * 0.9, color: NEUTRAL.leise, marginLeft: 5 }}>{`${o.min} ${tx.min}`}</Text> : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

/** Stundenleiste: der Ablauf der Stunde als Kette (Piktogramm, Wort, Minuten), höchstens 7 Teile. */
export function Stundenleiste({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'stundenleiste' }> }) {
  const tx = T[c.sprache]
  const teile = b.schritte.slice(0, 7)
  const d = c.m.layout === 'bild' ? 34 : c.m.layout === 'jugend' ? 22 : 28
  return (
    <View wrap={false} style={{ borderWidth: 0.8, borderColor: c.p.mittel, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 8 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.8, color: c.p.tief, marginBottom: 5 }}>{(b.titel ?? tx.heute).toUpperCase()}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {teile.map((s, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {s.bild && c.m.layout !== 'jugend' ? <Plakette c={c} id={s.bild} d={d} /> : <Kaestchen c={c} groesse={c.m.kaestchen} />}
              <Text style={{ fontFamily: c.m.schrift, fontSize: c.m.klein * 0.92, lineHeight: 1.2, color: NEUTRAL.text, marginTop: 3, textAlign: 'center' }}>{ty(c, s.text)}</Text>
              {s.min ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.leise, marginTop: 1 }}>{`${s.min} ${tx.min}`}</Text> : null}
            </View>
            {i < teile.length - 1 ? <Text style={{ fontFamily: SCHRIFT.titel, fontSize: 9, color: c.p.mittel, marginHorizontal: 1 }}>›</Text> : null}
          </View>
        ))}
      </View>
    </View>
  )
}

/** Abhaken: kurze Checkliste mit Kästchen (Material, Schritte der Stunde). */
export function Abhaken({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'abhaken' }> }) {
  return (
    <View wrap={false}>
      {b.titel ? (
        <Fliess c={c} fett style={{ marginBottom: 4 }}>
          {ty(c, b.titel)}
        </Fliess>
      ) : null}
      {b.items.map((x, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Kaestchen c={c} />
          <Fliess c={c} style={{ marginLeft: 7, flex: 1 }}>
            {ty(c, x)}
          </Fliess>
        </View>
      ))}
    </View>
  )
}
