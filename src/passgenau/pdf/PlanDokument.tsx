// ---------------------------------------------------------------------------
// Passgenau – Planblatt der Fachkraft (7.5), Blatt des Kindes, Karten und Mappe.
// Gleiche Schriften und Fußzeile wie die Arbeitsblätter (stil.ts, BlattDokument); die Farbe des Planblatts ist der Indigo der
// App (#2E3A9C), nicht mehr ein eigenes Stahlblau – Kinderblätter behalten ihre Bereichsfarben.
// Bekommt reine Druckdaten (kern/druck.ts) – kennt keinen Katalog.
// Datenschutz: Vorname und Ziel-Codes nur auf dem Planblatt (vertraulich, nicht fürs Kind), keine Daten von
// Vorfällen oder Notizen, Begründungen nur auf Wunsch. Das Blatt des Kindes trägt kein Etikett.
//
// Aufbau einer Sitzung (Design-Kritik 2026-10, Punkt 6): Seite 1 „Auf einen Blick“ – Ziel, Ablauf mit Zeitbalken, Vorbereiten,
// Material und die Notiz nach der Stunde, alles einmal; danach „Schritt für Schritt“ – je Schritt nummerierte Handlungen
// links, Sagen und „Wenn es kippt“ rechts (Zeilen höchstens etwa 70 Zeichen). Gezählt wird über das ganze Dokument.
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
import type { DruckNachweis } from '../kern/rahmenplan'

/** App-Akzent (index.css --accent), sein Rand und sein zarter Grund */
const P = palette({ tief: '#2E3A9C', mittel: '#C8CDF0', zart: '#ECEEFA' })
/** Leise Nebenzeilen (Quelle, Fuß): #6B7486 hat 4,7:1 auf Weiß – NEUTRAL.sehrLeise (#8A93A3) nur 3,1:1 */
const SCHWACH = '#6B7486'
/** Klammer der Folge (kern/klammer.ts): eigene Farbe, damit sie sich von Hinweisen und Einstieg abhebt */
const KLAMMER_FARBE = '#2E7D5B'
const BREITE = 595.28 - SEITE.rand * 2

/** Schriftgrößen und Abstände des Planblatts. KOMPAKT, wenn das Blatt damit eine Seite weniger braucht oder sonst nur ein
 *  einzelner Schritt auf die letzte Seite rutschte. */
export interface PlanMasse { basis: number; lh: number; titel: number; sagen: number; kippt: number; achtung: number; klein: number; pad: number; abstand: number }
export const PLAN_NORMAL: PlanMasse = { basis: LEHRER_MASSE.basis, lh: 1.42, titel: 11, sagen: 8.8, kippt: 8.6, achtung: 8.4, klein: 8.2, pad: 8, abstand: 10 }
export const PLAN_KOMPAKT: PlanMasse = { basis: 9, lh: 1.36, titel: 10.4, sagen: 8.4, kippt: 8.4, achtung: 8.1, klein: 8, pad: 5.5, abstand: 7 }

/** nutzbare Höhe einer Seite des Planblatts (pt) */
const PLAN_HOEHE = 841.89 - SEITE.oben - (SEITE.unten + 6)
/** mittlere Zeichenbreite (em) der Fließschrift – eher großzügig, damit die Schätzung nicht zu knapp ausfällt */
const ZEICHEN = 0.5
/** Schritttitel in Manrope ExtraBold sind breiter als die Fließschrift */
const ZEICHEN_TITEL = 0.58
/** Breite der Zeitspalte links im Schritt */
const ZEIT_SPALTE = 62
const SPALTE = BREITE - ZEIT_SPALTE
/** Lesebreite: höchstens ≈ 70 Zeichen je Zeile (9,6 pt Inter ≈ 4,8 pt je Zeichen) – nur die Ränder bleiben frei, nie ein langer Strich */
const LESEBREITE = 340
/** Schritte mit Sagen oder „Wenn es kippt“: links die Handlungen, rechts die Worte */
const LINKS_ANTEIL = 0.58
const SPALTENLUECKE = 14
/** Quellenangabe („Ritual“, „Übung“) steht rechts in der Titelzeile des Schritts */
const QUELLE_BREITE = 120
/** Mehr Handlungen als das lesen sich nicht mehr als Liste */
const MAX_HANDLUNGEN = 5
const zeilen = (t: string, size: number, breite: number) =>
  t
    .split('\n')
    .filter(Boolean)
    .reduce((n, a) => n + Math.max(1, Math.ceil((a.length * size * ZEICHEN) / breite)), 0)

// --- Text in Handlungen teilen --------------------------------------------------------------------------------------

/** Abkürzungen, nach denen kein neuer Satz beginnt („z. B.“, „ca.“, „Min.“) */
const KUERZEL_ENDE = /(?:^|[\s(„“"‚‘»«])(?:[A-Za-zÄÖÜäöü]|bzw|ca|etc|Nr|vgl|ggf|inkl|evtl|Min|Std|Sek|Abb|Dr|usw|bspw|min|env|cf|vs)\.$|\d+\.$/

/** Sätze eines Fließtexts. Teilt nur dort, wo ein Satzzeichen, ein Leerzeichen und ein großer Anfangsbuchstabe (oder ein
 *  Anführungszeichen) aufeinandertreffen; „z. B. so“, „Tom sagt: ‚Stopp.‘, und …“ und Ziffern bleiben zusammen. */
export function saetze(text: string): string[] {
  const t = text.replace(/\s+/g, ' ').trim()
  const out: string[] = []
  let start = 0
  const re = /[.!?…]["”“’‘»)]?\s+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(t))) {
    const ende = m.index + m[0].length
    const naechste = t.charAt(ende)
    if (!naechste || !/[A-ZÄÖÜÉÈÀÇ„"‚«0-9]/.test(naechste)) continue
    if (KUERZEL_ENDE.test(t.slice(start, m.index + 1))) continue
    out.push(t.slice(start, ende).trim())
    start = ende
  }
  const rest = t.slice(start).trim()
  if (rest) out.push(rest)
  return out
}

/** Handlungen eines Schritts: bis zu fünf, aus gleich vielen Sätzen je Handlung. Bis zwei Sätze bleiben ein Absatz (`liste` false). */
export function handlungen(text: string): { liste: boolean; teile: string[] } {
  const s = saetze(text)
  if (s.length <= 2) return { liste: false, teile: text.split('\n').filter(Boolean) }
  const g = Math.min(MAX_HANDLUNGEN, s.length)
  const basis = Math.floor(s.length / g)
  const mehr = s.length % g
  const teile: string[] = []
  let i = 0
  for (let k = 0; k < g; k++) {
    const n = basis + (k < mehr ? 1 : 0)
    teile.push(s.slice(i, i + n).join(' '))
    i += n
  }
  return { liste: true, teile }
}

// --- Höhen schätzen (Seitenumbruch) -----------------------------------------------------------------------------------

function hatRechts(x: DruckSchritt): boolean {
  return x.sagen.length > 0 || !!x.wennEsKippt
}

function schrittHoehe(x: DruckSchritt, d: DruckSitzung, m: PlanMasse): number {
  const tx = T[d.sprache]
  const qb = x.quelle ? Math.min(QUELLE_BREITE, x.quelle.length * 7.8 * ZEICHEN + 10) : 0
  const titelZeilen = Math.max(1, Math.ceil((x.titel.length * m.titel * ZEICHEN_TITEL) / (SPALTE - qb)))
  let h = titelZeilen * m.titel * 1.25 + 2
  if (x.wahl?.length) h += m.basis * m.lh + x.wahl.reduce((n, w) => n + 2 + zeilen(`${w.titel} (${w.min} ${tx.min})`, 9, SPALTE - 14) * 9 * 1.25 + (w.kurz ? zeilen(w.kurz, m.klein, SPALTE - 14) * m.klein * m.lh : 0), 0) + 3
  const zwei = hatRechts(x)
  const links = zwei ? SPALTE * LINKS_ANTEIL : Math.min(SPALTE, LESEBREITE + 20)
  const rechts = zwei ? SPALTE * (1 - LINKS_ANTEIL) - SPALTENLUECKE : 0
  const hd = handlungen(x.text)
  let l = hd.liste ? m.klein * 1.3 + 3 + hd.teile.reduce((n, a) => n + zeilen(a, m.basis, links - 16) * m.basis * m.lh + 3, 0) : zeilen(x.text, m.basis, links) * m.basis * m.lh
  if (x.imSpiel) l += 3 + zeilen(`${tx.imSpiel}${tx.dp} ${x.imSpiel}`, m.kippt, links) * m.kippt * 1.4
  let r = 0
  if (x.sagen.length) r += x.sagen.slice(0, 3).reduce((n, s, i) => n + zeilen(`${i ? '' : tx.sagen + tx.dp + ' '}„${s}“`, m.sagen, rechts - 8) * m.sagen * 1.4, 0) + 4
  if (x.wennEsKippt) r += 5 + zeilen(`${tx.kippt}${tx.dp} ${x.wennEsKippt}`, m.kippt, rechts) * m.kippt * 1.4
  h += 2 + Math.max(l, r)
  if (x.achtung) h += 4 + 10 + zeilen(`${tx.beachten}${tx.dp} ${x.achtung}`, m.achtung, SPALTE - 12.5) * m.achtung * 1.38
  if (x.hinweis) h += 3 + zeilen(x.hinweis, m.klein, SPALTE) * m.klein * 1.25
  if (x.blatt && d.blattTeile.length) h += 4 + d.blattTeile.reduce((n, b) => n + zeilen(`• ${b.titel}  (${b.quelle})${b.tipp ? `  ${tx.leichter}${tx.dp} ${b.tipp}` : ''}`, m.achtung, SPALTE) * m.achtung * 1.38, 0)
  if (d.warum && x.warum.length) h += 3 + 1.5 + zeilen(`${tx.warum}: ${x.warum.join(' · ')}`, 7.8, SPALTE) * 7.8 * 1.25
  return Math.max(h, 36) + 2 * m.pad + 0.6
}

/** Kopf der Detailseiten: Pille, Zeile, Titel, Überschrift „Schritt für Schritt“ */
function oberteilHoehe(): number {
  return 12 + 12 + 10 + 18 * 1.2 + 14
}

/** Seitenumbruch des Planblatts schätzen: Schritte je Seite (eine Zeile bricht nicht um) */
export function planUmbruch(d: DruckSitzung, m: PlanMasse): number[] {
  const seiten: number[] = [0]
  let frei = PLAN_HOEHE - oberteilHoehe()
  for (const x of d.schritte) {
    const h = schrittHoehe(x, d, m)
    if (h > frei && seiten[seiten.length - 1] > 0) {
      seiten.push(0)
      frei = PLAN_HOEHE
    }
    seiten[seiten.length - 1]++
    frei -= h
  }
  return seiten
}

/** Normal, außer kompakt spart eine Seite oder normal stünde nur ein einzelner Schritt auf der letzten Seite. */
export function planMasse(d: DruckSitzung): PlanMasse {
  const n = planUmbruch(d, PLAN_NORMAL)
  if (n.length === 1) return PLAN_NORMAL
  const k = planUmbruch(d, PLAN_KOMPAKT)
  return k.length < n.length || n[n.length - 1] === 1 ? PLAN_KOMPAKT : PLAN_NORMAL
}

const T: Record<Sprache, Record<string, string>> = {
  de: {
    reiter: 'Passgenau', fuer: 'für', ziele: 'Ziele', ablauf: 'Ablauf', min: 'Min.', sagen: 'Sagen', kippt: 'Wenn es kippt', imSpiel: 'Im Spiel üben', warum: 'Warum',
    material: 'Material', vorbereitung: 'Vorbereiten', notiz: 'Notiz nach der Stunde', datum: 'Datum', vertraulich: 'vertraulich – nicht fürs Kind',
    beachten: 'Beachten', eltern: 'Vorher: Eltern informiert (Hausregel)?', blatt: 'Das Blatt', leichter: 'leichter', wahl: 'Zur Wahl', dp: ':',
    hinweise: 'Hinweise', neu: 'neu ausprobiert', deckblatt: 'Folge', sitzung: 'Sitzung', phase: 'Phase', kern: 'Kern', alleMaterial: 'Material für die ganze Folge',
    ergebnis: 'Ergebnis', geklappt: 'hat geklappt', teils: 'teils', nicht: 'hat nicht geklappt', quelle: 'Quelle', ankreuzen: 'nach der Stunde ankreuzen',
    beruhigt: 'hat sich beruhigt', dabei: 'war dabei', nurDa: 'wollte nur da sein', abgebrochen: 'abgebrochen', halten: 'gehalten', blattKurz: 'Blatt',
    soGehts: 'So geht’s', schrittweise: 'Schritt für Schritt', seite: 'Seite', von: 'von',
  },
  fr: {
    reiter: 'Passgenau', fuer: 'pour', ziele: 'Objectifs', ablauf: 'Déroulement', min: 'min', sagen: 'Dire', kippt: 'Si ça bascule', imSpiel: 'S’exercer en jouant', warum: 'Pourquoi',
    material: 'Matériel', vorbereitung: 'À préparer', notiz: 'Note après la séance', datum: 'Date', vertraulich: 'confidentiel – pas pour l’enfant',
    beachten: 'Attention', eltern: 'Avant : parents informés (règle de la maison) ?', blatt: 'La fiche', leichter: 'plus simple', wahl: 'Au choix', dp: ' :',
    hinweise: 'Remarques', neu: 'nouvel essai', deckblatt: 'Série', sitzung: 'Séance', phase: 'Phase', kern: 'Cœur', alleMaterial: 'Matériel pour toute la série',
    ergebnis: 'Résultat', geklappt: 'réussi', teils: 'en partie', nicht: 'pas réussi', quelle: 'Source', ankreuzen: 'à cocher après la séance',
    beruhigt: 'retour au calme', dabei: 'a participé', nurDa: 'voulait juste être là', abgebrochen: 'interrompu', halten: 'faite', blattKurz: 'Fiche',
    soGehts: 'Comment faire', schrittweise: 'Pas à pas', seite: 'Page', von: 'sur',
  },
}

const ty = (s: string, sp: Sprache) => typo(s, sp)

function Kaestchen({ g = 8.5 }: { g?: number }) {
  return <View style={{ width: g, height: g, borderWidth: 0.9, borderColor: NEUTRAL.leise, borderRadius: 1.6, backgroundColor: '#FFFFFF' }} />
}

/** Fußzeile mit „Seite 3 von 12“ – gezählt über das ganze Dokument (vorher zählte jede Seite für sich: S. 1 ohne Nummer,
 *  S. 2 „1 / 2“, das Blatt wieder „1 / 2“). Die Seiten der Kinderblätter tragen ihre eigene Zählung je Blatt (src/blatt). */
function Fuss({ sprache, spielschule }: { sprache: Sprache; spielschule: boolean }) {
  const u = urheberschaft(undefined)
  const sp = urheberschaft('spielschule')
  const tx = T[sprache]
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      <Image src={CDSE_LOGO} style={{ width: 19 * CDSE_LOGO_SEITEN, height: 19, marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{u.marke[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: SCHWACH, marginLeft: 6, flex: 1 }}>{`Passgenau  ·  ${tx.vertraulich}`}</Text>
          <Text style={{ width: 70, marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: SCHWACH, textAlign: 'right' }} render={({ pageNumber, totalPages }) => `${tx.seite} ${pageNumber} ${tx.von} ${totalPages}`} />
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.6, color: SCHWACH, marginTop: 2.5, letterSpacing: 0.15 }}>{u.text[sprache] + (spielschule ? `  ·  ${sprache === 'fr' ? 'Préscolaire' : 'Spielschule'}: ${sp.text[sprache]}` : '')}</Text>
      </View>
    </View>
  )
}

/** Kopf: Pille, Zeile, Titel; das Datum nur auf der ersten Seite (`erste`), auf den Folgeseiten steht es nicht noch einmal */
function Kopf({ d, erste = true }: { d: DruckSitzung; erste?: boolean }) {
  const tx = T[d.sprache]
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{tx.reiter.toUpperCase()}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: SCHWACH, letterSpacing: 0.3, marginLeft: 8, flex: 1 }}>{d.zeile.replace(/^Passgenau · /, '')}</Text>
        {erste ? (
          <>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.6, color: SCHWACH, marginRight: 5 }}>{tx.datum}</Text>
            <View style={{ width: 70, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 12 }} />
          </>
        ) : null}
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 18, color: NEUTRAL.text, marginTop: 10, letterSpacing: -0.2 }}>{ty(d.titel, d.sprache) + (d.vorname ? `  ·  ${tx.fuer} ${d.vorname}` : '')}</Text>
    </View>
  )
}

/** Kleine Überschrift in Großbuchstaben (wie „AUF EINEN BLICK“) */
function Rubrik({ children, mt = 0 }: { children: string; mt?: number }) {
  return <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, letterSpacing: 1, color: P.tief, marginTop: mt, marginBottom: 8 }}>{children.toUpperCase()}</Text>
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
  const hd = handlungen(x.text)
  const zwei = hatRechts(x)
  const sagen = x.sagen.length ? (
    <View style={{ borderLeftWidth: 2.5, borderLeftColor: P.tief, paddingLeft: 6, marginBottom: x.wennEsKippt ? 5 : 0 }}>
      {x.sagen.slice(0, 3).map((s, k) => (
        <Text key={k} style={{ fontFamily: SCHRIFT.jugend, fontSize: m.sagen, lineHeight: 1.4, color: NEUTRAL.text }}>
          <Text style={{ fontWeight: 600, color: P.tief }}>{k === 0 ? `${tx.sagen}${tx.dp} ` : ''}</Text>
          {/* innen einfache Anführungszeichen (Messung 4: „Heute haben wir zurückgeschaut: „Ich …““) */}
          {ty(sp === 'fr' ? `« ${s.replace(/«\s*/g, '“').replace(/\s*»/g, '”')} »` : `„${s.replace(/„/g, '‚').replace(/“/g, '‘')}“`, sp)}
        </Text>
      ))}
    </View>
  ) : null
  const kippt = x.wennEsKippt ? (
    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.kippt, lineHeight: 1.4, color: NEUTRAL.leise }}>
      <Text style={{ fontWeight: 600, color: P.tief }}>{`${tx.kippt}${tx.dp} `}</Text>
      {ty(x.wennEsKippt, sp)}
    </Text>
  ) : null
  return (
    <View id={`pg-teil:${d.nr}:schritt:${i}`} wrap={false} minPresenceAhead={vorAus} style={{ flexDirection: 'row', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingVertical: m.pad }}>
      <View style={{ width: ZEIT_SPALTE, paddingRight: 6 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 15, color: P.tief }}>{`${x.min}`}<Text style={{ fontSize: 7.6, fontFamily: SCHRIFT.jugend, fontWeight: 400, color: SCHWACH }}>{` ${tx.min}`}</Text></Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, letterSpacing: 0.6, color: SCHWACH, marginTop: 2 }}>{x.rolle.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {/* Titel links, Quelle („Ritual“, „Übung“) klein rechts in derselben Zeile – spart die eigene Zeile unter dem Schritt */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: m.titel, color: NEUTRAL.text, flex: 1 }}>{ty(x.titel, sp)}</Text>
          {x.quelle ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: SCHWACH, maxWidth: QUELLE_BREITE, textAlign: 'right', marginLeft: 8, marginTop: 1.5 }}>{ty(x.quelle, sp)}</Text> : null}
        </View>
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
        {/* Links die Handlungen (nummeriert, wenn es mehr als zwei Sätze sind), rechts die Worte: Sagen und „Wenn es kippt“.
            Ohne Worte bleibt die Handlung in Lesebreite – keine Zeile länger als etwa 70 Zeichen. */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: zwei ? LINKS_ANTEIL : undefined, width: zwei ? undefined : LESEBREITE + 20, paddingRight: zwei ? SPALTENLUECKE : 0 }}>
            {hd.liste ? (
              <>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: m.klein, letterSpacing: 0.3, color: P.tief, marginBottom: 3 }}>{tx.soGehts}</Text>
                {hd.teile.map((a, k) => (
                  <View key={k} style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: P.zart, alignItems: 'center', justifyContent: 'center', marginRight: 5, marginTop: 0.8 }}>
                      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: P.tief }}>{String(k + 1)}</Text>
                    </View>
                    <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: m.basis, lineHeight: m.lh, color: NEUTRAL.text }}>{ty(a, sp)}</Text>
                  </View>
                ))}
              </>
            ) : (
              hd.teile.map((a, k) => (
                <LText key={k} m={m}>
                  {ty(a, sp)}
                </LText>
              ))
            )}
            {x.imSpiel ? (
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: m.kippt, lineHeight: 1.4, color: NEUTRAL.text, marginTop: 3 }}>
                <Text style={{ fontWeight: 600, color: P.tief }}>{`${tx.imSpiel}${tx.dp} `}</Text>
                {ty(x.imSpiel, sp)}
              </Text>
            ) : null}
          </View>
          {zwei ? (
            <View style={{ flex: 1 - LINKS_ANTEIL, paddingTop: hd.liste ? m.klein * 1.3 + 3 : 0 }}>
              {sagen}
              {kippt}
            </View>
          ) : null}
        </View>
        {x.achtung ? (
          <View style={{ borderLeftWidth: 2.5, borderLeftColor: '#B4533A', backgroundColor: '#FBF1EC', borderRadius: 4, padding: 5, marginTop: 5 }}>
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
        {d.warum && x.warum.length ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: P.tief, marginTop: 3 }}>{ty(`${tx.warum}: ${x.warum.join(' · ')}`, sp)}</Text> : null}
      </View>
    </View>
  )
}

/** „Ablauf · 30 Min.“ und daneben die Minutenleiste: ein Feld je Schritt, so breit wie seine Dauer; der längste Schritt
 *  (meist der Kern) dunkel, das Blatt in Mittelblau – in einer Sekunde sieht man, wie die Stunde verteilt ist.
 *  Steht nur auf Seite 1 („Auf einen Blick“), nicht noch einmal vor den Einzelschritten. */
function Ablaufkopf({ d, tx }: { d: DruckSitzung; tx: Record<string, string> }) {
  const summe = d.schritte.reduce((n, x) => n + x.min, 0)
  const laengster = Math.max(...d.schritte.map((x) => x.min))
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text }}>{tx.ablauf}</Text>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: SCHWACH, marginLeft: 6 }}>{`·  ${summe} ${tx.min}`}</Text>
      <View style={{ flex: 1 }} />
      <View style={{ width: 250, height: 13, flexDirection: 'row' }}>
        {d.schritte.map((x, i) => {
          const kern = x.min === laengster && d.schritte.filter((y) => y.min === laengster).length === 1
          return (
            <View key={i} style={{ flex: Math.max(x.min, 1), minWidth: 11, marginLeft: i ? 1.5 : 0, borderRadius: 3, backgroundColor: kern ? P.tief : x.blatt ? P.mittel : P.zart, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, color: kern ? '#FFFFFF' : x.blatt ? NEUTRAL.text : P.tief }}>{String(x.min)}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

/** Notiz nach der Stunde: Ankreuzzeile und Schreibzeilen – auf Seite 1, wo die Hand nach der Stunde ohnehin hinfindet. */
function Notizfeld({ d, zeilen: n = 4 }: { d: DruckSitzung; zeilen?: number }) {
  const tx = T[d.sprache]
  return (
    <View wrap={false} style={{ borderWidth: 0.7, borderColor: NEUTRAL.haarlinie, borderRadius: 7, paddingHorizontal: 9, paddingTop: 7, paddingBottom: 4 }}>
      <Absatz titel={tx.notiz} abstand={0}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 2 }}>
          {/* Krisentag und Weg 3 (P10): nie „hat nicht geklappt“ */}
          {(d.krisentag ? [tx.beruhigt, tx.dabei, tx.nurDa, tx.abgebrochen] : [tx.geklappt, tx.teils, tx.nicht]).map((w) => (
            <View key={w} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 3 }}>
              <Kaestchen g={7.5} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.text, marginLeft: 4 }}>{w}</Text>
            </View>
          ))}
        </View>
        {Array.from({ length: n }, (_, k) => (
          <View key={k} style={{ height: 17, borderBottomWidth: 0.7, borderBottomColor: NEUTRAL.linie }} />
        ))}
      </Absatz>
    </View>
  )
}

/** Die Einzelschritte einer Sitzung („Schritt für Schritt“): ein oder zwei Seiten hinter „Auf einen Blick“. */
export function PlanSeite({ d, zusatz = false }: { d: DruckSitzung; zusatz?: boolean }) {
  const tx = T[d.sprache]
  const sp = d.sprache
  const m = planMasse(d)
  const spielschule = d.schritte.some((x) => x.quelle.startsWith('Spielschule') || x.quelle.startsWith('Préscolaire'))
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Kopf d={d} erste={false} />
      <Rubrik>{zusatz ? `${sp === 'fr' ? 'Infos complémentaires' : 'Zusatzinfo'} · ${tx.schrittweise}` : tx.schrittweise}</Rubrik>
      {/* der fertige erste Satz steht seit 23.10.2026 nicht mehr auf der Startseite („kein Vorsagen – geschulte Fachkräfte“) */}
      {d.einstieg ? (
        <View style={{ borderLeftWidth: 3, borderLeftColor: P.tief, paddingLeft: 9, marginBottom: 10 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: P.tief, marginBottom: 2 }}>{sp === 'fr' ? 'Pour commencer, par exemple' : 'Zum Beispiel so anfangen'}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.6, lineHeight: 1.4, color: NEUTRAL.text }}>{ty(d.einstieg, sp)}</Text>
        </View>
      ) : null}
      <View style={{ borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
        {d.schritte.map((x, i) => (
          <SchrittZeile key={i} x={x} i={i} d={d} m={m} vorAus={i === d.schritte.length - 2 ? schrittHoehe(d.schritte[i + 1], d, m) : 0} />
        ))}
      </View>
      {/* Folgeseite: Titel und Sitzung oben, damit ein loses Blatt zuzuordnen ist */}
      <Text
        fixed
        render={({ subPageNumber }) => (subPageNumber > 1 ? `${ty(d.titel, sp)}  ·  ${tx.sitzung} ${d.nr}${d.n > 1 ? ` / ${d.n}` : ''}${d.vorname ? `  ·  ${d.vorname}` : ''}  ·  ${sp === 'fr' ? 'suite' : 'Fortsetzung'}` : '')}
        style={{ position: 'absolute', top: 14, left: SEITE.rand, right: SEITE.rand, fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: SCHWACH }}
      />
      <Fuss sprache={sp} spielschule={spielschule} />
    </Page>
  )
}

/** „Auf einen Blick“ (Rückmeldung einer Fachkraft 10.10.: „zu viel Text“ – in der Stunde braucht man eine Zeile je Schritt,
 *  die Beschreibung nur zum Nachlesen): Ziele, erster Satz, Ablauf mit Zeitbalken und einer Zeile je Schritt, Vorbereiten und
 *  Material zum Abhaken, am Ende die Notiz nach der Stunde. Leere Felder („nichts vorzubereiten“) fehlen. Die ausführliche
 *  Fassung (nummerierte Handlungen, Sagen, Wenn es kippt) folgt auf den nächsten Seiten. */
export function SpickzettelSeite({ d, anhang = false }: { d: DruckSitzung; anhang?: boolean }) {
  const sp = d.sprache
  const fr = sp === 'fr'
  const tx = T[sp]
  const m = PLAN_NORMAL
  const W = {
    blick: fr ? 'En un coup d’œil' : 'Auf einen Blick',
    ziel: fr ? 'But de la séance' : 'Ziel der Stunde',
    werkzeug: fr ? 'Outil' : 'Werkzeug',
    mehr: anhang
      ? fr ? 'Détails (phrases possibles, « si ça bascule », contexte) : informations complémentaires en fin de dossier.' : 'Details (Sätze, „Wenn es kippt“, Hintergrund): Zusatzinfo am Ende der Mappe.'
      : fr ? 'Détails (phrases possibles, « si ça bascule ») : dernières pages.' : 'Details (Sätze, „Wenn es kippt“): auf den letzten Seiten.',
  }
  const spickSpielschule = d.schritte.some((x) => x.quelle.startsWith('Spielschule') || x.quelle.startsWith('Préscolaire'))
  const zielText = d.ziele.length ? '' : d.ziel
  const hatBlock = d.vorbereitung.length > 0 || d.material.length > 0 || !!d.elternbrief
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Kopf d={d} />
      <Rubrik>{W.blick}</Rubrik>
      {/* Ziele einmal, hier: mit Code-Pillen, Werkzeug darunter */}
      {d.ziele.length || zielText || d.werkzeug ? (
        <View style={{ backgroundColor: P.zart, borderRadius: 9, paddingHorizontal: 11, paddingVertical: 9, marginBottom: 10 }}>
          {d.ziele.length || zielText ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: P.tief, marginBottom: 3 }}>{W.ziel}</Text> : null}
          {d.ziele.map((z, k) => (
            <View key={z.code} style={{ flexDirection: 'row', marginTop: k ? 3 : 0 }}>
              <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, marginRight: 6, marginTop: 1.2, alignSelf: 'flex-start' }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: '#FFFFFF' }}>{z.code}</Text>
              </View>
              <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: k ? 10 : 11, fontWeight: k ? 400 : 600, lineHeight: 1.35, color: NEUTRAL.text }}>{ty(z.text, sp)}</Text>
            </View>
          ))}
          {zielText ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 11, fontWeight: 600, lineHeight: 1.35, color: NEUTRAL.text }}>{ty(zielText, sp)}</Text> : null}
          {d.werkzeug ? (
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.text, marginTop: d.ziele.length || zielText ? 6 : 0 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, color: P.tief }}>{W.werkzeug}: </Text>
              {ty(d.werkzeug, sp)}
            </Text>
          ) : null}
        </View>
      ) : null}
      {d.hinweise.length ? (
        <View style={{ borderLeftWidth: 3, borderLeftColor: '#8A6414', backgroundColor: '#F8F2E2', borderRadius: 6, padding: 7, marginBottom: 10 }}>
          {d.hinweise.map((h, k) => (
            <LText key={k} klein m={m}>
              {ty(h, sp)}
            </LText>
          ))}
        </View>
      ) : null}
      {/* Klammer der Folge (kern/klammer.ts): Station, Satz am Anfang, Eintrag am Schluss */}
      {d.klammer ? (
        <View wrap={false} style={{ borderLeftWidth: 3, borderLeftColor: KLAMMER_FARBE, backgroundColor: '#EEF6F1', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 7, marginBottom: 10 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: KLAMMER_FARBE, marginBottom: 2 }}>{`${d.klammer.name} · ${d.klammer.kopf}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, lineHeight: 1.4, color: NEUTRAL.text }}>{ty(d.klammer.start, sp)}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, lineHeight: 1.35, color: '#4A5263', marginTop: 2 }}>{ty(d.klammer.schluss, sp)}</Text>
        </View>
      ) : null}
      <Ablaufkopf d={d} tx={tx} />
      <View style={{ borderTopWidth: 0.7, borderTopColor: NEUTRAL.haarlinie, marginBottom: 12 }}>
        {d.schritte.map((x, i) => (
          <View key={i} wrap={false} style={{ flexDirection: 'row', paddingVertical: 6.5, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <View style={{ width: 34 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 12, color: P.tief }}>{x.min}</Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: SCHWACH }}>{tx.min}</Text>
            </View>
            {/* breit genug für „ENTRÉE EN MATIÈRE“; längere Namen brechen um statt in den Titel zu laufen */}
            <View style={{ width: 92, paddingTop: 2, paddingRight: 8 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.4, color: SCHWACH }}>{x.rolle.toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, fontWeight: 600, color: NEUTRAL.text }}>{ty(x.titel, sp)}</Text>
              {/* Kern mit Spickzettel: der Minutenplan der Übung statt einer Zeile (23.10.2026: „fertiger Kurs, wo man loslegen kann“) */}
              {x.ablauf ? (
                <View style={{ marginTop: 3 }}>
                  {x.ablauf.map((a, k) => (
                    <View key={k} style={{ flexDirection: 'row', marginBottom: 1.6 }}>
                      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.4, color: P.tief, width: 46 }}>{`${a.min} ${sp === 'fr' ? 'min' : 'Min.'}`}</Text>
                      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.2, lineHeight: 1.35, color: NEUTRAL.text, flex: 1 }}>{ty(a.was, sp)}</Text>
                    </View>
                  ))}
                  {x.ablaufRest ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, lineHeight: 1.35, color: '#4A5263', marginTop: 2 }}>{ty(x.ablaufRest, sp)}</Text> : null}
                </View>
              ) : x.text && x.kern && !x.blatt ? (
                // ohne Spickzettel (ältere Kurse, Übungen außerhalb der Kurse): die Handlungen des Kerns, nummeriert – die Anleitung
                // gehört auf die Startseite, nicht in die Zusatzinfo
                <View style={{ marginTop: 3 }}>
                  {handlungen(x.text).teile.map((t, k, alle) => (
                    <View key={k} style={{ flexDirection: 'row', marginBottom: 1.6 }}>
                      {alle.length > 1 ? <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.4, color: P.tief, width: 14 }}>{`${k + 1}`}</Text> : null}
                      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9, lineHeight: 1.35, color: NEUTRAL.text, flex: 1 }}>{ty(t, sp)}</Text>
                    </View>
                  ))}
                </View>
              ) : x.kurz ? (
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, lineHeight: 1.35, color: '#4A5263', marginTop: 1 }}>{ty(x.kurz, sp)}</Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>
      {/* Vorbereiten und Material zum Abhaken – nur, was es gibt; ohne eines von beiden nimmt das andere die ganze Breite */}
      {hatBlock ? (
        <View wrap={false} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: 'row' }}>
            {d.vorbereitung.length ? (
              <View style={{ flex: 1.3, paddingRight: 12 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 4 }}>{tx.vorbereitung}</Text>
                {d.vorbereitung.slice(0, 3).map((v, k) => (
                  <View key={k} style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <View style={{ marginTop: 1.5 }}>
                      <Kaestchen g={7.5} />
                    </View>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, lineHeight: 1.35, color: NEUTRAL.text, marginLeft: 5, flex: 1 }}>{ty(v, sp)}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            {d.material.length ? (
              <View style={{ flex: 1, ...(d.vorbereitung.length ? { borderLeftWidth: 0.6, borderLeftColor: NEUTRAL.haarlinie, paddingLeft: 10 } : {}) }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 4 }}>{tx.material}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {d.material.map((mat, k) => (
                    <View key={k} style={{ width: d.vorbereitung.length ? '100%' : '33%', flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                      <Kaestchen g={7.5} />
                      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, marginLeft: 5 }}>{ty(mat, sp)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
          {d.elternbrief ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Kaestchen />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, marginLeft: 5 }}>{tx.eltern}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      <Notizfeld d={d} />
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: SCHWACH, marginTop: 10 }}>{W.mehr}</Text>
      <Fuss sprache={sp} spielschule={spickSpielschule} />
    </Page>
  )
}

/** Plan + Blatt des Kindes + Karten einer Sitzung. */
/** Karten zum Ausdrucken aus den Hilfen (22.10.2026): je Satz Titel und Karten in zwei Spalten mit Schnittlinien; Karten nur
 *  für die Fachkraft (Lösungen, Spickzettel) auf eigener Seite mit „nicht austeilen“ */
function KartenSeiten({ d }: { d: DruckSitzung }) {
  const saetze = d.hilfenKarten ?? []
  if (!saetze.length) return null
  const fr = d.sprache === 'fr'
  const seite = (liste: typeof saetze, fachkraft: boolean, key: string) =>
    liste.length ? (
      <Page key={key} size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
        <Kopf d={d} erste={false} />
        <Rubrik>{fachkraft ? (fr ? 'Pour l’adulte – ne pas distribuer' : 'Nur für dich – nicht austeilen') : fr ? 'Cartes à découper' : 'Karten zum Ausschneiden'}</Rubrik>
        {liste.map((satz, si) => (
          <View key={si} style={{ marginBottom: 12 }} wrap={false}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: NEUTRAL.text, marginBottom: 2 }}>{ty(satz.titel, d.sprache)}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: SCHWACH, marginBottom: 6 }}>{ty(satz.schritt, d.sprache)}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {satz.karten.map((karte, ki) => (
                <View key={ki} style={{ width: '50%', padding: 3 }}>
                  <View style={{ minHeight: 62, borderWidth: 0.9, borderStyle: fachkraft ? 'solid' : 'dashed', borderColor: fachkraft ? P.tief : NEUTRAL.leise, borderRadius: 4, padding: 8, justifyContent: 'center', backgroundColor: fachkraft ? '#F7F8FD' : '#FFFFFF' }}>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.5, lineHeight: 1.35, color: NEUTRAL.text }}>{ty(karte, d.sprache)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
        <Fuss sprache={d.sprache} spielschule={false} />
      </Page>
    ) : null
  return (
    <>
      {seite(saetze.filter((x) => !x.nurFachkraft), false, 'k')}
      {seite(saetze.filter((x) => x.nurFachkraft), true, 'f')}
    </>
  )
}

export function SitzungSeiten({ d, anhang = false }: { d: DruckSitzung; anhang?: boolean }) {
  return (
    <>
      <SpickzettelSeite d={d} anhang={anhang} />
      {d.kinderblatt ? <BlattSeiten blatt={d.kinderblatt} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      {d.sammelblatt ? <BlattSeiten blatt={d.sammelblatt} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      {(d.weitereBlaetter ?? []).map((x, i) => (
        <BlattSeiten key={'gb' + i} blatt={x.blatt} opt={{ sprache: x.sprache, lehrer: false }} />
      ))}
      {d.karten ? <BlattSeiten blatt={d.karten} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      {d.materialSeite ? <BlattSeiten blatt={d.materialSeite} opt={{ sprache: d.sprache, lehrer: false }} /> : null}
      <KartenSeiten d={d} />
      {anhang ? null : <PlanSeite d={d} zusatz />}
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
  const vorname = f.sitzungen[0]?.vorname
  const spalte = { fontFamily: SCHRIFT.titel, fontWeight: 800 as const, fontSize: 7.2, letterSpacing: 0.5, color: SCHWACH }
  // langer Hintergrund (Sichtprüfung 16.10.: bei vier Achtung-Punkten oder fünf Quellen lief die Quellenzeile unter den Fuß):
  // Bogen und Material rücken enger zusammen, damit das Deckblatt eine Seite bleibt
  const h = f.hintergrund
  const lang = h ? 12 * f.material.length : 0
  const eng = lang > 1150
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
        <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{tx.reiter.toUpperCase()}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginLeft: 8 }}>{`${tx.deckblatt} · ${f.sitzungen.length} ${sp === 'fr' ? 'séances' : 'Sitzungen'}`}</Text>
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 24, color: NEUTRAL.text, letterSpacing: -0.3, marginBottom: 8 }}>{ty(f.titel, sp) + (vorname ? `  ·  ${tx.fuer} ${vorname}` : '')}</Text>
      {f.ziele.length ? (
        <View style={{ backgroundColor: P.zart, borderRadius: 9, padding: 9, marginBottom: 16 }}>
          {f.ziele.map((z) => (
            <View key={z.code} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, marginRight: 6, alignSelf: 'flex-start' }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: '#FFFFFF' }}>{z.code}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <LText>{ty(z.text, sp)}</LText>
              </View>
            </View>
          ))}
          {f.faden ? <View style={{ marginTop: 3 }}><LText klein farbe={NEUTRAL.leise}>{`${sp === 'fr' ? 'Fil rouge : ' : 'Roter Faden: '}${f.faden}`}</LText></View> : null}
        </View>
      ) : null}
      {f.klammer ? (
        <View style={{ borderLeftWidth: 3, borderLeftColor: KLAMMER_FARBE, backgroundColor: '#EEF6F1', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 6, marginTop: -6, marginBottom: 14 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: KLAMMER_FARBE, marginBottom: 1 }}>{`${sp === 'fr' ? 'Le cadre de la série' : 'Rahmen der Folge'}: ${f.klammer.name}`}</Text>
          <LText klein>{`${f.klammer.idee} ${sp === 'fr' ? 'La fiche à collectionner est jointe à la séance 1.' : 'Das Sammelblatt liegt bei Sitzung 1.'}`}</LText>
        </View>
      ) : null}
      {/* Übersicht der Folge zum Abhaken: Phase, Kern, Minuten, Blatt, Datum, gehalten */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 3 }}>
        <View style={{ width: 32 }} />
        <Text style={{ ...spalte, width: 96 }}>{tx.phase.toUpperCase()}</Text>
        <Text style={{ ...spalte, flex: 1 }}>{tx.kern.toUpperCase()}</Text>
        <Text style={{ ...spalte, width: 34, textAlign: 'right' }}>{tx.min.toUpperCase()}</Text>
        <Text style={{ ...spalte, width: 38, textAlign: 'center' }}>{tx.blattKurz.toUpperCase()}</Text>
        <Text style={{ ...spalte, width: 66 }}>{tx.datum.toUpperCase()}</Text>
        <Text style={{ ...spalte, width: 42, textAlign: 'center' }}>{tx.halten.toUpperCase()}</Text>
      </View>
      <View style={{ borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie }}>
        {f.bogen.map((b) => {
          const sitzung = f.sitzungen.find((x) => x.nr === b.nr)
          const minuten = sitzung ? sitzung.schritte.reduce((n, x) => n + x.min, 0) : 0
          return (
            <View key={b.nr} style={{ flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, paddingVertical: eng ? 5 : 9, alignItems: 'center' }}>
              <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: P.zart, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: P.tief }}>{String(b.nr)}</Text>
              </View>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: P.tief, width: 96, paddingRight: 6 }}>{ty(b.phase, sp)}</Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.text, flex: 1, paddingRight: 8 }}>{ty(b.kern, sp)}</Text>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, width: 34, textAlign: 'right' }}>{minuten ? String(minuten) : ''}</Text>
              <View style={{ width: 38, alignItems: 'center' }}>{sitzung?.kinderblatt ? <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: P.tief }} /> : null}</View>
              <View style={{ width: 66, paddingRight: 8 }}>
                <View style={{ borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 12 }} />
              </View>
              <View style={{ width: 42, alignItems: 'center' }}>
                <Kaestchen g={9} />
              </View>
            </View>
          )
        })}
      </View>
      <View style={{ marginTop: eng ? 10 : 18 }}>
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

/** Zusatzinfo am Ende der Mappe (23.10.2026): warum der Kurs wirkt, worauf achten, Quellen – nicht mehr auf dem Deckblatt */
function HintergrundSeite({ f }: { f: DruckFolge }) {
  if (!f.hintergrund) return null
  const sp = f.sprache
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.9, color: SCHWACH, marginBottom: 4 }}>{(sp === 'fr' ? 'Informations complémentaires' : 'Zusatzinfo').toUpperCase()}</Text>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 18, color: NEUTRAL.text, marginBottom: 12 }}>{ty(f.titel, sp)}</Text>
      {f.hintergrund ? (
        <View style={{ marginTop: 0, borderLeftWidth: 2.5, borderLeftColor: P.tief, paddingLeft: 9 }}>
          <Absatz titel={sp === 'fr' ? 'Pour l’adulte : pourquoi ça marche' : 'Für die Fachkraft: warum das wirkt'} abstand={6}>
            <LText>{f.hintergrund.warum}</LText>
          </Absatz>
          {f.hintergrund.achtung.length ? (
            <Absatz titel={sp === 'fr' ? 'Attention' : 'Achtung'} farbe={P.tief} abstand={6}>
              {f.hintergrund.achtung.map((a, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 1.5 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9, color: P.tief, width: 9 }}>•</Text>
                  <View style={{ flex: 1 }}><LText>{a}</LText></View>
                </View>
              ))}
            </Absatz>
          ) : null}
          {f.hintergrund.quellen.length ? (
            <View>
              <LText klein farbe={NEUTRAL.leise}>{`${sp === 'fr' ? 'Sources' : 'Quellen'}: ${f.hintergrund.quellen.join(' · ')}`}</LText>
            </View>
          ) : null}
        </View>
      ) : null}
      <Fuss sprache={sp} spielschule={false} />
    </Page>
  )
}

/** „Brücke in die Klasse“: eine Seite für die Lehrkraft – Ziel, Stichwort, je Woche, erinnern und loben, beobachten. Ohne
 *  Diagnosen und ohne Dossier; der Vorname nur, wenn „Vorname einsetzen“ an ist (sonst eine Linie zum Eintragen). */
function KlassenKarteSeite({ f }: { f: DruckFolge }) {
  const k = f.klasse
  if (!k) return null
  const sp = f.sprache
  const fr = sp === 'fr'
  const vorname = f.sitzungen[0]?.vorname
  const punkt = (t: string, i: number) => (
    <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, color: P.tief, width: 11 }}>•</Text>
      <View style={{ flex: 1 }}><LText>{ty(t, sp)}</LText></View>
    </View>
  )
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{fr ? 'POUR L’ENSEIGNANT·E' : 'FÜR DIE LEHRKRAFT'}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginLeft: 8 }}>{fr ? 'Le pont vers la classe · 6 semaines' : 'Brücke in die Klasse · 6 Wochen'}</Text>
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 21, color: NEUTRAL.text, marginBottom: 4 }}>{ty(f.titel, sp)}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 }}>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.leise }}>{fr ? 'Pour : ' : 'Für: '}</Text>
        {vorname ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: NEUTRAL.text }}>{vorname}</Text> : <View style={{ width: 150, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 11 }} />}
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.leise, marginLeft: 18 }}>{fr ? 'Contact : ' : 'Ansprechperson: '}</Text>
        <View style={{ width: 150, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, height: 11 }} />
      </View>
      <View style={{ backgroundColor: P.zart, borderRadius: 9, padding: 10, marginBottom: 12 }}>
        <LText>{ty(k.ziel, sp)}</LText>
        <View style={{ marginTop: 6 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.6, color: P.tief, marginBottom: 1 }}>{fr ? 'MOT-CLÉ POUR RAPPELER' : 'STICHWORT ZUM ERINNERN'}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: k.stichwort.length > 60 ? 11 : 13, color: NEUTRAL.text }}>{ty(k.stichwort, sp)}</Text>
        </View>
      </View>
      <Absatz titel={fr ? 'Semaine par semaine' : 'Woche für Woche'} abstand={8}>
        {k.sitzungen.slice(0, 6).map((t, i) => (
          <View key={i} style={{ flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, paddingVertical: 4, alignItems: 'center' }}>
            <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: P.zart, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: P.tief }}>{String(i + 1)}</Text>
            </View>
            <View style={{ flex: 1 }}><LText>{ty(t.replace(/^(Woche|Semaine)\s*\d+\s*:\s*/i, ''), sp)}</LText></View>
          </View>
        ))}
      </Absatz>
      <Absatz titel={fr ? 'Comment aider' : 'So helfen Sie'} abstand={8}>{k.helfen.map(punkt)}</Absatz>
      <Absatz titel={fr ? 'À observer (volontiers noté dans le Klassenbuch)' : 'Bitte beobachten (gern im Klassenbuch notieren)'} abstand={8}>{k.beobachten.map(punkt)}</Absatz>
      {k.nicht ? (
        <View style={{ borderLeftWidth: 2.5, borderLeftColor: P.tief, paddingLeft: 9, marginTop: 2, marginBottom: 10 }}>
          <Absatz titel={fr ? 'À éviter pendant ces semaines' : 'In diesen Wochen besser nicht'} farbe={P.tief} abstand={4}>
            <LText>{ty(k.nicht, sp)}</LText>
          </Absatz>
        </View>
      ) : null}
      {/* Rückmeldung der Lehrkraft je Woche (ankreuzen, zurückgeben): die Beobachtung aus der Klasse kommt so zur Fachkraft – sie
          trägt sie als Beobachtung mit Ziel ein, „Wirkt es?“ im Hub zeigt sie */}
      {k.beobachten[0] ? (
        <View wrap={false}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text, marginBottom: 2 }}>{fr ? 'Votre retour chaque semaine (à cocher et à rendre)' : 'Ihre Rückmeldung je Woche (ankreuzen und zurückgeben)'}</Text>
          <LText klein farbe={NEUTRAL.leise}>{`${fr ? 'Observé :' : 'Beobachtet:'} ${ty(k.beobachten[0], sp)}`}</LText>
          <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, paddingBottom: 2 }}>
            <View style={{ width: 60 }} />
            {(fr ? ['souvent', 'parfois', 'pas encore', 'pas vu'] : ['oft', 'manchmal', 'noch nicht', 'nicht gesehen']).map((t) => (
              <Text key={t} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, color: SCHWACH, width: 74, textAlign: 'center' }}>{t.toUpperCase()}</Text>
            ))}
          </View>
          {[1, 2, 3, 4, 5, 6].map((w) => (
            <View key={w} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, paddingVertical: 3 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, width: 60 }}>{`${fr ? 'Semaine' : 'Woche'} ${w}`}</Text>
              {[0, 1, 2, 3].map((i) => (
                <View key={i} style={{ width: 74, alignItems: 'center' }}><Kaestchen g={9} /></View>
              ))}
            </View>
          ))}
        </View>
      ) : null}
      <Fuss sprache={sp} spielschule={false} />
    </Page>
  )
}

/** Mappe einer Folge: Deckblatt mit Bogen und Material, dann (Einzelkurs) die Seite für die Lehrkraft, dann je Sitzung Planblatt und Blatt. */
export function FolgeDokument({ f }: { f: DruckFolge }) {
  return (
    <Document title={`Passgenau – ${f.titel}`} author={urheberschaft(undefined).name} creator="CDSE Toolbox" producer="CDSE Toolbox" language={f.sprache}>
      <Deckblatt f={f} />
      {f.sitzungen.map((d) => (
        <SitzungSeiten key={d.nr} d={d} anhang />
      ))}
      {/* Zusatzinfo (23.10.2026: „zu viele Erklärungen – man weiß nicht, wo anfangen“): Hintergrund, Blatt für die Lehrkraft
          und die ausführlichen Schritte mit Sätzen und „Wenn es kippt“ am Ende */}
      <HintergrundSeite f={f} />
      <KlassenKarteSeite f={f} />
      {f.sitzungen.map((d) => (
        <PlanSeite key={'z' + d.nr} d={d} zusatz />
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

/** Rahmenplan-Nachweis (23.10.2026): gehaltene Stunden mit Handlungsfeldern – für das Journal de bord des Dienstes. Ohne
 *  Ziel-Codes, ohne Notizen; der Vorname nur, wenn „Vorname einsetzen“ an ist. */
export function NachweisDokument({ n }: { n: DruckNachweis }) {
  const sp = n.sprache
  const fr = sp === 'fr'
  const datum = (d: string | null) => (d ? d.split('-').reverse().join('.') : '–')
  const max = Math.max(1, ...n.jeFeld.map((f) => f.n))
  const kopf = { fontFamily: SCHRIFT.titel, fontWeight: 800 as const, fontSize: 7.2, letterSpacing: 0.5, color: SCHWACH }
  const kurz = (id: string) => n.jeFeld.find((f) => f.id === id)!
  return (
    <Document title={`Passgenau – ${n.titel}`} author={urheberschaft(undefined).name} creator="CDSE Toolbox" producer="CDSE Toolbox" language={sp}>
      <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ backgroundColor: P.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{'JOURNAL DE BORD'}</Text>
          </View>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: SCHWACH, letterSpacing: 0.3, marginLeft: 8 }}>{fr ? 'Cadre de référence national de l’éducation non formelle' : 'Nationaler Rahmenplan zur non-formalen Bildung'}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, marginBottom: 4 }}>{n.titel}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: SCHWACH, marginBottom: 12 }}>
          {`${n.vorname ? `${fr ? 'Pour' : 'Für'} ${n.vorname}  ·  ` : ''}${datum(n.von)} – ${datum(n.bis)}  ·  ${n.zeilen.length} ${fr ? 'séances' : 'Stunden'}  ·  ${n.minuten} min`}
        </Text>
        {/* je Handlungsfeld: Zahl der Stunden als Balken */}
        <View style={{ backgroundColor: P.zart, borderRadius: 9, padding: 10, marginBottom: 14 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: P.tief, marginBottom: 6 }}>{fr ? 'Champs d’action touchés (nombre de séances)' : 'Berührte Handlungsfelder (Zahl der Stunden)'}</Text>
          {n.jeFeld.map((f) => (
            <View key={f.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, width: 230 }}>{f.name}</Text>
              <View style={{ flex: 1, height: 9, backgroundColor: '#FFFFFF', borderRadius: 3 }}>
                <View style={{ width: `${(100 * f.n) / max}%`, height: 9, backgroundColor: f.farbe[0], borderRadius: 3 }} />
              </View>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text, width: 26, textAlign: 'right' }}>{String(f.n)}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }} fixed>
          <Text style={{ ...kopf, width: 58 }}>{fr ? 'DATE' : 'DATUM'}</Text>
          <Text style={{ ...kopf, flex: 1 }}>{fr ? 'ACTIVITÉ' : 'AKTIVITÄT'}</Text>
          <Text style={{ ...kopf, width: 30, textAlign: 'right' }}>MIN.</Text>
          <Text style={{ ...kopf, width: 70, paddingLeft: 8 }}>{fr ? 'FORME' : 'SOZIALFORM'}</Text>
          <Text style={{ ...kopf, width: 150 }}>{fr ? 'CHAMPS D’ACTION' : 'HANDLUNGSFELDER'}</Text>
        </View>
        {n.zeilen.map((z, i) => (
          <View key={i} wrap={false} style={{ flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, width: 58 }}>{datum(z.datum)}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, flex: 1, paddingRight: 6 }}>{ty(z.aktivitaet, sp)}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, width: 30, textAlign: 'right' }}>{String(z.min)}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.8, color: NEUTRAL.text, width: 70, paddingLeft: 8 }}>{z.sozialform}</Text>
            <View style={{ width: 150, flexDirection: 'row', flexWrap: 'wrap' }}>
              {z.felder.map((id) => (
                <View key={id} style={{ backgroundColor: kurz(id).farbe[1], borderRadius: 3, paddingHorizontal: 3, paddingVertical: 1, marginRight: 3, marginBottom: 2 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: kurz(id).farbe[0] }}>{kurz(id).name.split(/,| et | und /)[0]}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        {!n.zeilen.length ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: SCHWACH, marginTop: 8 }}>{fr ? 'Pas encore de séance marquée « séance tenue ».' : 'Noch keine Stunde als „gehalten“ markiert.'}</Text> : null}
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, lineHeight: 1.4, color: SCHWACH, marginTop: 12 }}>
          {fr
            ? 'Attribution automatique à partir du format, du thème et de la compétence des activités : une indication pour le journal de bord et la planification, pas une évaluation. Sans codes d’objectifs ni notes. À compléter par l’équipe (contexte, observations du groupe).'
            : 'Zuordnung automatisch aus Format, Thema und Kompetenz der Übungen: ein Hinweis für Journal de bord und Planung, keine Bewertung. Ohne Ziel-Codes und Notizen. Vom Team zu ergänzen (Rahmen, Beobachtungen in der Gruppe).'}
        </Text>
        <Fuss sprache={sp} spielschule={false} />
      </Page>
    </Document>
  )
}
