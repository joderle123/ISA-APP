// ---------------------------------------------------------------------------
// Passgenau – Planblatt der Fachkraft (7.5), Blatt des Kindes, Karten und Mappe.
// Gleiche Schriften, Farben und Fußzeile wie die Arbeitsblätter (stil.ts, BlattDokument).
// Bekommt reine Druckdaten (kern/druck.ts) – kennt keinen Katalog.
// Datenschutz: Vorname und Ziel-Codes nur auf dem Planblatt (vertraulich, nicht fürs Kind), keine Daten von
// Vorfällen oder Notizen, Begründungen nur auf Wunsch. Das Blatt des Kindes trägt kein Etikett.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Sprache } from '../../blatt/typen'
import { BlattSeiten } from '../../blatt/pdf/BlattDokument'
import { LEHRER_MASSE, SCHRIFT, SEITE, typo } from '../../blatt/pdf/stil'
import { NEUTRAL, palette } from '../../blatt/zeichnung'
import { urheberschaft } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'
import type { DruckFolge, DruckSchritt, DruckSitzung } from '../kern/druck'

const P = palette({ tief: '#3E6A85', mittel: '#BDD0DC', zart: '#EDF3F7' })
const BREITE = 595.28 - SEITE.rand * 2

/** Schriftgrößen und Abstände des Planblatts. KOMPAKT, wenn das Blatt damit auf eine Seite passt oder sonst nur eine
 *  einzelne Zeile auf die zweite Seite rutschte (Testlauf 9.10.: 24 von 163 Planblättern mit nur dem Abschluss auf S. 2). */
export interface PlanMasse { basis: number; lh: number; titel: number; sagen: number; kippt: number; achtung: number; klein: number; pad: number; notiz: number; abstand: number }
export const PLAN_NORMAL: PlanMasse = { basis: LEHRER_MASSE.basis, lh: 1.42, titel: 10, sagen: 8.8, kippt: 8.4, achtung: 8.2, klein: 7.8, pad: 7, notiz: 3, abstand: 10 }
export const PLAN_KOMPAKT: PlanMasse = { basis: 8.9, lh: 1.36, titel: 9.6, sagen: 8.2, kippt: 7.8, achtung: 7.7, klein: 7.3, pad: 4.5, notiz: 2, abstand: 7 }

/** nutzbare Höhe einer Seite des Planblatts (pt) */
const PLAN_HOEHE = 841.89 - SEITE.oben - (SEITE.unten + 6)
/** mittlere Zeichenbreite (em) der Fließschrift – eher großzügig, damit die Schätzung nicht zu knapp ausfällt */
const ZEICHEN = 0.5
const SPALTE = BREITE - 62
const zeilen = (t: string, size: number, breite: number) =>
  t
    .split('\n')
    .filter(Boolean)
    .reduce((n, a) => n + Math.max(1, Math.ceil((a.length * size * ZEICHEN) / breite)), 0)

function schrittHoehe(x: DruckSchritt, d: DruckSitzung, m: PlanMasse): number {
  const tx = T[d.sprache]
  let h = m.titel * 1.25 + 2
  if (x.wahl?.length) h += m.basis * m.lh + x.wahl.reduce((n, w) => n + 2 + zeilen(`${w.titel} (${w.min} ${tx.min})`, 9, SPALTE - 14) * 9 * 1.25 + (w.kurz ? zeilen(w.kurz, m.klein, SPALTE - 14) * m.klein * m.lh : 0), 0) + 3
  h += zeilen(x.text, m.basis, SPALTE) * m.basis * m.lh
  if (x.sagen.length) h += 3 + x.sagen.slice(0, 3).reduce((n, s, i) => n + zeilen(`${i ? '' : tx.sagen + tx.dp + ' '}„${s}“`, m.sagen, SPALTE - 8) * m.sagen * 1.4, 0)
  if (x.wennEsKippt) h += 3 + zeilen(`${tx.kippt}${tx.dp} ${x.wennEsKippt}`, m.kippt, SPALTE) * m.kippt * 1.4
  if (x.achtung) h += 4 + 10 + zeilen(`${tx.beachten}${tx.dp} ${x.achtung}`, m.achtung, SPALTE - 12.5) * m.achtung * 1.38
  if (x.hinweis) h += 3 + zeilen(x.hinweis, m.klein, SPALTE) * m.klein * 1.25
  if (x.blatt && d.blattTeile.length) h += 4 + d.blattTeile.reduce((n, b) => n + zeilen(`• ${b.titel}  (${b.quelle})${b.tipp ? `  ${tx.leichter}${tx.dp} ${b.tipp}` : ''}`, m.achtung, SPALTE) * m.achtung * 1.38, 0)
  h += 3 + 7.2 * 1.25
  if (d.warum && x.warum.length) h += 1.5 + zeilen(`${tx.warum}: ${x.warum.join(' · ')}`, 7.4, SPALTE) * 7.4 * 1.25
  return Math.max(h, 36) + 2 * m.pad + 0.6
}

function oberteilHoehe(d: DruckSitzung, m: PlanMasse): number {
  const tx = T[d.sprache]
  let h = 12 + 12 + 10 + 18 * 1.2
  if (d.ziele.length) h += 18 + d.ziele.reduce((n, z) => n + 2 + zeilen(z.text, m.basis, BREITE - 18 - 40) * m.basis * m.lh, 0) + m.abstand
  if (d.hinweise.length) h += 14 + d.hinweise.reduce((n, x) => n + zeilen(x, m.klein, BREITE - 17) * m.klein * m.lh, 0) + m.abstand
  // Kasten oben: links Material/Vorbereitung/Eltern, rechts Notiz
  const links = (BREITE - 18) * (1.45 / 2.45) - 12
  const absatz = 9.4 * 1.2 + 4
  const matBreite = d.material.reduce((n, x) => n + 7.5 + 4 + 9 + x.length * 8.4 * ZEICHEN, 0)
  let l = absatz + Math.max(1, Math.ceil(matBreite / links)) * 13.5 + m.abstand
  if (d.vorbereitung.length) l += absatz + d.vorbereitung.slice(0, 3).reduce((n, v) => n + zeilen(v, m.klein, links) * m.klein * m.lh, 0) + m.abstand
  if (d.elternbrief) l += 13 + 7
  const r = absatz + (d.krisentag ? 2 : 2) * 12 + m.notiz * 15 + m.abstand
  void tx
  h += Math.max(l, r) + 7 + 4 + 1.4 + m.abstand
  return h + 9.4 * 1.2 + 2
}

/** Seitenumbruch des Planblatts schätzen: Zeilen je Seite (Schrittzeilen brechen nicht um); `frei` = Rest der letzten Seite. */
export function planUmbruch(d: DruckSitzung, m: PlanMasse): number[] & { frei?: number } {
  const seiten: number[] & { frei?: number } = [0]
  let frei = PLAN_HOEHE - oberteilHoehe(d, m)
  for (const x of d.schritte) {
    const h = schrittHoehe(x, d, m)
    if (h > frei && seiten[seiten.length - 1] > 0) {
      seiten.push(0)
      frei = PLAN_HOEHE
    }
    seiten[seiten.length - 1]++
    frei -= h
  }
  seiten.frei = frei
  return seiten
}

/** Normal, außer kompakt spart eine Seite oder normal stünde nur eine Zeile auf der letzten Seite. Die Schätzung irrt
 *  um einige Millimeter – eine knapp volle Seite (Rest < 8 %) gilt deshalb auch schon als Kandidat für kompakt. */
export function planMasse(d: DruckSitzung): PlanMasse {
  const n = planUmbruch(d, PLAN_NORMAL)
  if (n.length === 1 && (n.frei ?? 0) > 0.08 * PLAN_HOEHE) return PLAN_NORMAL
  const k = planUmbruch(d, PLAN_KOMPAKT)
  // kompakt, wenn es eine Seite spart oder normal nur eine einzelne Zeile auf der letzten Seite stünde
  if (k.length < n.length || (n.length > 1 && n[n.length - 1] === 1)) return PLAN_KOMPAKT
  return PLAN_NORMAL
}

const T: Record<Sprache, Record<string, string>> = {
  de: {
    reiter: 'Passgenau', fuer: 'für', ziele: 'Ziele', ablauf: 'Ablauf', min: 'Min.', sagen: 'Sagen', kippt: 'Wenn es kippt', warum: 'Warum',
    material: 'Material', vorbereitung: 'Vorbereitung', notiz: 'Notiz nach der Stunde', datum: 'Datum', vertraulich: 'vertraulich – nicht fürs Kind',
    beachten: 'Beachten', eltern: 'Vorher: Eltern informiert (Hausregel)?', blatt: 'Das Blatt', leichter: 'leichter', wahl: 'Zur Wahl', dp: ':',
    hinweise: 'Hinweise', neu: 'neu ausprobiert', deckblatt: 'Folge', sitzung: 'Sitzung', phase: 'Phase', kern: 'Kern', alleMaterial: 'Material für die ganze Folge',
    ergebnis: 'Ergebnis', geklappt: 'hat geklappt', teils: 'teils', nicht: 'hat nicht geklappt', quelle: 'Quelle', ankreuzen: 'nach der Stunde ankreuzen',
    beruhigt: 'hat sich beruhigt', dabei: 'war dabei', nurDa: 'wollte nur da sein', abgebrochen: 'abgebrochen',
  },
  fr: {
    reiter: 'Passgenau', fuer: 'pour', ziele: 'Objectifs', ablauf: 'Déroulement', min: 'min', sagen: 'Dire', kippt: 'Si ça bascule', warum: 'Pourquoi',
    material: 'Matériel', vorbereitung: 'Préparation', notiz: 'Note après la séance', datum: 'Date', vertraulich: 'confidentiel – pas pour l’enfant',
    beachten: 'Attention', eltern: 'Avant : parents informés (règle de la maison) ?', blatt: 'La fiche', leichter: 'plus simple', wahl: 'Au choix', dp: '\u202f:',
    hinweise: 'Remarques', neu: 'nouvel essai', deckblatt: 'Série', sitzung: 'Séance', phase: 'Phase', kern: 'Cœur', alleMaterial: 'Matériel pour toute la série',
    ergebnis: 'Résultat', geklappt: 'réussi', teils: 'en partie', nicht: 'pas réussi', quelle: 'Source', ankreuzen: 'à cocher après la séance',
    beruhigt: 'retour au calme', dabei: 'a participé', nurDa: 'voulait juste être là', abgebrochen: 'interrompu',
  },
}

const ty = (s: string, sp: Sprache) => typo(s, sp)

function Kaestchen({ g = 8.5 }: { g?: number }) {
  return <View style={{ width: g, height: g, borderWidth: 0.9, borderColor: NEUTRAL.leise, borderRadius: 1.6, backgroundColor: '#FFFFFF' }} />
}

function Fuss({ sprache, spielschule }: { sprache: Sprache; spielschule: boolean }) {
  const u = urheberschaft(undefined)
  const sp = urheberschaft('spielschule')
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      <Image src={CDSE_LOGO} style={{ width: 19 * CDSE_LOGO_SEITEN, height: 19, marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{u.marke[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1 }}>{`Passgenau  ·  ${T[sprache].vertraulich}`}</Text>
          <Text style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, textAlign: 'right' }} render={({ subPageNumber, subPageTotalPages }) => (subPageTotalPages > 1 ? `${sprache === 'fr' ? 'Page' : 'Seite'} ${subPageNumber} / ${subPageTotalPages}` : '')} />
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{u.text[sprache] + (spielschule ? `  ·  ${sprache === 'fr' ? 'Préscolaire' : 'Spielschule'}: ${sp.text[sprache]}` : '')}</Text>
      </View>
    </View>
  )
}

function Kopf({ d }: { d: DruckSitzung }) {
  const tx = T[d.sprache]
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{tx.reiter.toUpperCase()}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginLeft: 8, flex: 1 }}>{d.zeile.replace(/^Passgenau · /, '')}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.6, color: NEUTRAL.leise, marginRight: 5 }}>{tx.datum}</Text>
        <View style={{ width: 70, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 12 }} />
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 18, color: NEUTRAL.text, marginTop: 10, letterSpacing: -0.2 }}>{ty(d.titel, d.sprache) + (d.vorname ? `  ·  ${tx.fuer} ${d.vorname}` : '')}</Text>
    </View>
  )
}

function Absatz({ titel, children, farbe, abstand = 10 }: { titel: string; children: ReactNode; farbe?: string; abstand?: number }) {
  return (
    <View style={{ marginBottom: abstand }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: farbe ?? NEUTRAL.text, marginBottom: 4 }}>{titel}</Text>
      {children}
    </View>
  )
}

function LText({ children, farbe, klein, fett, kursiv, m = PLAN_NORMAL }: { children: string; farbe?: string; klein?: boolean; fett?: boolean; kursiv?: boolean; m?: PlanMasse }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: klein ? m.klein : m.basis, fontWeight: fett ? 600 : 400, lineHeight: m.lh, color: farbe ?? NEUTRAL.text, ...(kursiv ? { fontStyle: 'normal' } : {}) }}>{children}</Text>
}

/** `vorAus`: Platz, den die nächste Zeile braucht – der vorletzte Schritt geht mit auf die neue Seite, statt den Abschluss
 *  allein auf Seite 2 zu lassen (Blind-Bewertung 8: „Planblatt-Seite 2 enthält nur den Abschluss“). */
function SchrittZeile({ x, i, d, m, vorAus = 0 }: { x: DruckSchritt; i: number; d: DruckSitzung; m: PlanMasse; vorAus?: number }) {
  const tx = T[d.sprache]
  const sp = d.sprache
  const absaetze = x.text.split('\n').filter(Boolean)
  return (
    <View id={`pg-teil:${d.nr}:schritt:${i}`} wrap={false} minPresenceAhead={vorAus} style={{ flexDirection: 'row', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingVertical: m.pad }}>
      <View style={{ width: 62, paddingRight: 6 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 13, color: P.tief }}>{`${x.min}`}<Text style={{ fontSize: 7.4, fontFamily: SCHRIFT.jugend, fontWeight: 400, color: NEUTRAL.leise }}>{` ${tx.min}`}</Text></Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.6, color: NEUTRAL.leise, marginTop: 2 }}>{x.rolle.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: m.titel, color: NEUTRAL.text, marginBottom: 2 }}>{ty(x.titel, sp)}</Text>
        {x.wahl?.length ? (
          <View style={{ marginBottom: 3 }}>
            <LText fett m={m}>{`${tx.wahl}${tx.dp}`}</LText>
            {x.wahl.map((w, k) => (
              <View key={k} style={{ marginTop: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Kaestchen />
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9, color: NEUTRAL.text, marginLeft: 5 }}>{ty(`${w.titel} (${w.min} ${tx.min})`, sp)}</Text>
                </View>
                {w.kurz ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.klein, lineHeight: m.lh, color: NEUTRAL.leise, marginLeft: 14 }}>{ty(w.kurz, sp)}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
        {absaetze.map((a, k) => (
          <LText key={k} m={m}>{ty(a, sp)}</LText>
        ))}
        {x.sagen.length ? (
          <View style={{ marginTop: 3, borderLeftWidth: 2, borderLeftColor: P.mittel, paddingLeft: 6 }}>
            {x.sagen.slice(0, 3).map((s, k) => (
              <Text key={k} style={{ fontFamily: SCHRIFT.jugend, fontSize: m.sagen, lineHeight: 1.4, color: NEUTRAL.text }}>
                <Text style={{ fontWeight: 600, color: P.tief }}>{k === 0 ? `${tx.sagen}${tx.dp} ` : ''}</Text>
                {ty(sp === 'fr' ? `« ${s} »` : `„${s}“`, sp)}
              </Text>
            ))}
          </View>
        ) : null}
        {x.wennEsKippt ? (
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.kippt, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 3 }}>
            <Text style={{ fontWeight: 600 }}>{`${tx.kippt}${tx.dp} `}</Text>
            {ty(x.wennEsKippt, sp)}
          </Text>
        ) : null}
        {x.achtung ? (
          <View style={{ borderLeftWidth: 2.5, borderLeftColor: '#B4533A', backgroundColor: '#FBF1EC', borderRadius: 4, padding: 5, marginTop: 4 }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.achtung, lineHeight: 1.38, color: NEUTRAL.text }}>
              <Text style={{ fontWeight: 600, color: '#8A3A24' }}>{`${tx.beachten}${tx.dp} `}</Text>
              {ty(x.achtung, sp)}
            </Text>
          </View>
        ) : null}
        {x.hinweis ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.klein, color: '#8A6414', marginTop: 3 }}>{ty(x.hinweis, sp)}</Text> : null}
        {x.blatt && d.blattTeile.length ? (
          <View style={{ marginTop: 4 }}>
            {d.blattTeile.map((b, k) => (
              <Text key={k} style={{ fontFamily: SCHRIFT.jugend, fontSize: m.achtung, lineHeight: 1.38, color: NEUTRAL.text }}>
                {`• ${ty(b.titel, sp)}`}
                <Text style={{ color: NEUTRAL.leise }}>{`  (${b.quelle})`}</Text>
                {b.tipp ? <Text style={{ color: NEUTRAL.leise }}>{`  ${tx.leichter}${tx.dp} ${ty(b.tipp, sp)}`}</Text> : null}
              </Text>
            ))}
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          {x.quelle ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.2, color: NEUTRAL.sehrLeise, flex: 1 }}>{ty(x.quelle, sp)}</Text> : <View style={{ flex: 1 }} />}
        </View>
        {d.warum && x.warum.length ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: P.tief, marginTop: 1.5 }}>{ty(`${tx.warum}: ${x.warum.join(' · ')}`, sp)}</Text> : null}
      </View>
    </View>
  )
}

/** Das Planblatt einer Sitzung (eine oder zwei Seiten). */
export function PlanSeite({ d }: { d: DruckSitzung }) {
  const tx = T[d.sprache]
  const sp = d.sprache
  const m = planMasse(d)
  const spielschule = d.schritte.some((x) => x.quelle.startsWith('Spielschule') || x.quelle.startsWith('Préscolaire'))
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Kopf d={d} />
      {d.ziele.length ? (
        <View style={{ backgroundColor: P.zart, borderRadius: 9, padding: 9, marginBottom: m.abstand }}>
          {d.ziele.map((z) => (
            <View key={z.code} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, marginRight: 6, alignSelf: 'flex-start' }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: '#FFFFFF' }}>{z.code}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <LText m={m}>{ty(z.text, sp)}</LText>
              </View>
            </View>
          ))}
        </View>
      ) : null}
      {d.hinweise.length ? (
        <View style={{ borderLeftWidth: 3, borderLeftColor: '#8A6414', backgroundColor: '#F8F2E2', borderRadius: 6, padding: 7, marginBottom: m.abstand }}>
          {d.hinweise.map((h, k) => (
            <LText key={k} klein m={m}>
              {ty(h, sp)}
            </LText>
          ))}
        </View>
      ) : null}
      {/* Vorher und nachher oben in einem Kasten (Testlauf 9.10.: unten brach der Block allein auf eine zweite Seite um):
          links Material, Vorbereitung, Elternbrief – rechts die Notiz nach der Stunde. Danach nur noch der Ablauf. */}
      <View wrap={false} style={{ flexDirection: 'row', borderWidth: 0.7, borderColor: NEUTRAL.haarlinie, borderRadius: 7, paddingHorizontal: 9, paddingTop: 7, paddingBottom: 4, marginBottom: m.abstand }}>
        <View style={{ flex: 1.45, paddingRight: 12 }}>
          <Absatz titel={tx.material} abstand={m.abstand}>
            {d.material.length ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {d.material.map((m, k) => (
                  <View key={k} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 9, marginBottom: 2.5 }}>
                    <Kaestchen g={7.5} />
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.text, marginLeft: 4 }}>{ty(m, sp)}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <LText klein farbe={NEUTRAL.leise} m={m}>
                {sp === 'fr' ? 'rien de particulier' : 'nichts Besonderes'}
              </LText>
            )}
          </Absatz>
          {d.vorbereitung.length ? (
            <Absatz titel={tx.vorbereitung} abstand={m.abstand}>
              {d.vorbereitung.slice(0, 3).map((v, k) => (
                <LText key={k} klein m={m}>
                  {ty(v, sp)}
                </LText>
              ))}
            </Absatz>
          ) : null}
          {d.elternbrief ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
              <Kaestchen />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.text, marginLeft: 5 }}>{tx.eltern}</Text>
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1, borderLeftWidth: 0.6, borderLeftColor: NEUTRAL.haarlinie, paddingLeft: 10 }}>
          <Absatz titel={tx.notiz} abstand={m.abstand}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 2 }}>
              {/* Krisentag und Weg 3 (P10): nie „hat nicht geklappt“ */}
              {(d.krisentag ? [tx.beruhigt, tx.dabei, tx.nurDa, tx.abgebrochen] : [tx.geklappt, tx.teils, tx.nicht]).map((w) => (
                <View key={w} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 9, marginBottom: 3 }}>
                  <Kaestchen g={7.5} />
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, color: NEUTRAL.text, marginLeft: 4 }}>{w}</Text>
                </View>
              ))}
            </View>
            {Array.from({ length: m.notiz }, (_, k) => (
              <View key={k} style={{ height: 15, borderBottomWidth: 0.7, borderBottomColor: NEUTRAL.linie }} />
            ))}
          </Absatz>
        </View>
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 2 }}>{tx.ablauf}</Text>
      {d.schritte.map((x, i) => (
        <SchrittZeile key={i} x={x} i={i} d={d} m={m} vorAus={i === d.schritte.length - 2 ? schrittHoehe(d.schritte[i + 1], d, m) : 0} />
      ))}
      <Fuss sprache={sp} spielschule={spielschule} />
    </Page>
  )
}

/** Plan + Blatt des Kindes + Karten einer Sitzung. */
export function SitzungSeiten({ d }: { d: DruckSitzung }) {
  return (
    <>
      <PlanSeite d={d} />
      {d.kinderblatt ? <BlattSeiten blatt={d.kinderblatt} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      {(d.weitereBlaetter ?? []).map((x, i) => (
        <BlattSeiten key={'gb' + i} blatt={x.blatt} opt={{ sprache: x.sprache, lehrer: false }} />
      ))}
      {d.karten ? <BlattSeiten blatt={d.karten} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      {d.materialSeite ? <BlattSeiten blatt={d.materialSeite} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
    </>
  )
}

export function SitzungDokument({ d, onRender }: { d: DruckSitzung; onRender?: (x: unknown) => void }) {
  return (
    <Document title={`Passgenau – ${d.titel}`} author={urheberschaft(undefined).name} creator="CDSE Toolbox" producer="CDSE Toolbox" language={d.sprache} onRender={onRender as never}>
      <SitzungSeiten d={d} />
    </Document>
  )
}

function Deckblatt({ f }: { f: DruckFolge }) {
  const tx = T[f.sprache]
  const sp = f.sprache
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
        <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{tx.reiter.toUpperCase()}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginLeft: 8 }}>{`${tx.deckblatt} · ${f.sitzungen.length} ${sp === 'fr' ? 'séances' : 'Sitzungen'}`}</Text>
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 24, color: NEUTRAL.text, letterSpacing: -0.3, marginBottom: 6 }}>{ty(f.titel, sp)}</Text>
      {f.sitzungen[0]?.ziele.length ? (
        <View style={{ marginBottom: 14 }}>
          {f.sitzungen[0].ziele.map((z) => (
            <LText key={z.code}>{ty(`${z.code}  ${z.text}`, sp)}</LText>
          ))}
        </View>
      ) : null}
      <View style={{ borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie }}>
        {f.bogen.map((b) => (
          <View key={b.nr} style={{ flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, paddingVertical: 6, alignItems: 'center' }}>
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: P.zart, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: P.tief }}>{String(b.nr)}</Text>
            </View>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: P.tief, width: 110 }}>{ty(b.phase, sp)}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.text, flex: 1 }}>{ty(b.kern, sp)}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 16 }}>
        <Absatz titel={tx.alleMaterial}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {f.material.map((m, k) => (
              <View key={k} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                <Kaestchen />
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, marginLeft: 5 }}>{ty(m, sp)}</Text>
              </View>
            ))}
          </View>
        </Absatz>
      </View>
      <Fuss sprache={sp} spielschule={false} />
    </Page>
  )
}

/** Mappe einer Folge: Deckblatt mit Bogen und Material, dann je Sitzung Planblatt und Blatt. */
export function FolgeDokument({ f }: { f: DruckFolge }) {
  return (
    <Document title={`Passgenau – ${f.titel}`} author={urheberschaft(undefined).name} creator="CDSE Toolbox" producer="CDSE Toolbox" language={f.sprache}>
      <Deckblatt f={f} />
      {f.sitzungen.map((d) => (
        <SitzungSeiten key={d.nr} d={d} />
      ))}
    </Document>
  )
}

/** Teile (Plan-Zeilen, Blatt-Teile) mit Seite und Rechteck aus den Layoutdaten von react-pdf (T-M8). */
export interface TeilPosition {
  id: string
  seite: number
  x: number
  y: number
  b: number
  h: number
  /** Seitengröße in pt */
  seiteB: number
  seiteH: number
}

interface LayoutKnoten {
  type?: string
  box?: { top: number; left: number; width: number; height: number }
  props?: { id?: string }
  children?: LayoutKnoten[]
}

export function teilPositionen(layout: unknown): TeilPosition[] {
  const out: TeilPosition[] = []
  const wurzel = layout as LayoutKnoten
  const seiten = (wurzel?.children ?? []).filter((k) => k.type === 'PAGE')
  seiten.forEach((seite, i) => {
    const sb = seite.box?.width ?? 595.28
    const sh = seite.box?.height ?? 841.89
    // box.left/top sind relativ zum Elternknoten (Yoga) – für die Seite aufsummieren
    const gehe = (k: LayoutKnoten, ox: number, oy: number) => {
      const x = ox + (k.box?.left ?? 0)
      const y = oy + (k.box?.top ?? 0)
      const id = k.props?.id
      if (id && id.startsWith('pg-teil:') && k.box) out.push({ id, seite: i + 1, x, y, b: k.box.width, h: k.box.height, seiteB: sb, seiteH: sh })
      for (const c of k.children ?? []) gehe(c, x, y)
    }
    for (const c of seite.children ?? []) gehe(c, 0, 0)
  })
  return out
}

export { BREITE }
