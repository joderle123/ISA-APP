// ---------------------------------------------------------------------------
// Schülerheft des Förderfachs als PDF, je Klassenstufe: Deckblatt mit Namensfeldern,
// Inhalt, dann die Blätter in fester Reihenfolge – vorn die Seiten für jede Stunde
// (So funktioniert das Fach, Gefühlsrad, Skills-Pass …), danach die Blätter der
// Einheiten –, „Meine Wörter“ (Wortspeicher Deutsch–Französisch), Notizseiten und
// eine Rückseite mit Hilfe. Die Blätter sind normale Toolbox-Blätter (BlattSeiten im
// Heft-Modus) in der Farbe der Klassenstufe. Zwei Durchläufe wie beim Handbuch:
// Der erste sammelt die Seitenzahlen, der zweite setzt sie ins Inhaltsverzeichnis.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import type { Blatt } from '../../blatt/typen'
import { BlattSeiten, blattInhalt } from '../../blatt/pdf/BlattDokument'
import { NEUTRAL } from '../../blatt/zeichnung'
import { SCHRIFT } from '../../blatt/pdf/stil'
import { URHEBER, URHEBER_NAME } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'
import { FACH, STUFE_FARBEN, TX } from '../fach'
import type { Einheit, HandbuchText, Jahresplan, Sprache } from '../typen'
import { Absatz, Deckblatt, Fuss, Kopf, Marke, type Marken, SeitenTitel, WARM, seitenStil, stufenPalette, ty } from './teile'

const PLATZHALTER = 188

export interface HeftEintrag {
  id: string
  /** Reiter oben links */
  reiter: string
  /** Zeile neben dem Reiter */
  meta: string
  /** Kapitel-Id oder 'vorn' (Blätter für jede Stunde) */
  gruppe: string
  /** Nummer der Einheit, in der das Blatt zuerst gebraucht wird */
  einheit?: number
}

/** Reihenfolge der Blätter im Heft: vorn die Werkzeuge der Klassenstufe, dann die Blätter der Einheiten (ohne Doppelte). */
export function heftInhalt(plan: Jahresplan, einheiten: Einheit[], sprache: Sprache, vorn: string[]): HeftEintrag[] {
  const t = TX[sprache]
  const basis = `${FACH.name}  ·  ${plan.klasse}`
  const liste: HeftEintrag[] = vorn.map((id, i) => ({ id, reiter: i === 0 ? (sprache === 'fr' ? 'La matière' : 'Das Fach') : t.jedeStunde, meta: basis, gruppe: 'vorn' }))
  const schon = new Set(liste.map((x) => x.id))
  for (const pe of plan.einheiten) {
    const e = einheiten.find((x) => x.id === pe.id)
    if (!e) continue
    const kap = plan.kapitel.find((k) => k.id === pe.kapitel)
    for (const id of e.blaetter) {
      if (schon.has(id)) continue
      schon.add(id)
      liste.push({ id, reiter: `${t.einheit} ${pe.nr}`, meta: `${basis}  ·  ${t.kapitel} ${kap?.nr ?? ''} · ${kap?.titel[sprache] ?? ''}`, gruppe: pe.kapitel, einheit: pe.nr })
    }
  }
  return liste
}

export function heftTitel(plan: Jahresplan, sprache: Sprache): string {
  return `${FACH.name} – ${TX[sprache].schuelerheft} ${plan.klasse}`
}

function InhaltHeft({ plan, eintraege, blaetter, text, sprache, seiten }: { plan: Jahresplan; eintraege: HeftEintrag[]; blaetter: Map<string, Blatt>; text: HandbuchText; sprache: Sprache; seiten?: Marken }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const gruppen: { titel: string; liste: HeftEintrag[] }[] = [{ titel: text.heft.jedeStunde, liste: eintraege.filter((x) => x.gruppe === 'vorn') }]
  for (const k of plan.kapitel) {
    const liste = eintraege.filter((x) => x.gruppe === k.id)
    if (liste.length) gruppen.push({ titel: `${t.kapitel} ${k.nr} · ${k.titel[sprache]}`, liste })
  }
  const seite = (id: string) => String(seiten ? (seiten.get(id) ?? '') : PLATZHALTER)
  return (
    <Page size="A4" style={seitenStil}>
      <Kopf reiter={t.schuelerheft} meta={`${FACH.name}  ·  ${plan.klasse}`} p={p} />
      <SeitenTitel titel={text.heft.inhalt} p={p} sprache={sprache} />
      {gruppen.map((g, gi) => (
        <View key={gi} wrap={false} style={{ marginTop: gi ? 10 : 0 }}>
          <View style={{ paddingBottom: 2, borderBottomWidth: 0.8, borderBottomColor: p.mittel, marginBottom: 2 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief }}>{ty(g.titel, sprache)}</Text>
          </View>
          {g.liste.map((x) => {
            const b = blaetter.get(x.id)
            return (
              <View key={x.id} style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 3.5 }}>
                {x.einheit ? <Text style={{ width: 22, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: p.tief }}>{String(x.einheit)}</Text> : null}
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.text }}>{b ? ty(blattInhalt(b, sprache).titel, sprache) : x.id}</Text>
                <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
                <Text style={{ width: 22, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text }}>{seite(x.id)}</Text>
              </View>
            )
          })}
        </View>
      ))}
      <View wrap={false} style={{ marginTop: 12, flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief }}>{ty(text.heft.woerter, sprache)}</Text>
        <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
        <Text style={{ width: 22, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text }}>{seite('w')}</Text>
      </View>
      <Fuss links={FACH.name} titel={text.heft.inhalt} sprache={sprache} />
    </Page>
  )
}

/** „Meine Wörter“: der Wortspeicher jeder Einheit, in der Sprache des Hefts zuerst. */
function WoerterSeiten({ plan, einheiten, text, sprache, marken }: { plan: Jahresplan; einheiten: Einheit[]; text: HandbuchText; sprache: Sprache; marken?: Marken }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const andere: Sprache = sprache === 'fr' ? 'de' : 'fr'
  const liste = plan.einheiten.map((pe) => ({ pe, e: einheiten.find((x) => x.id === pe.id) })).filter((x) => x.e?.woerter?.length)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="w" marken={marken} />
      <Kopf reiter={text.heft.woerter} meta={`${FACH.name}  ·  ${plan.klasse}`} p={p} />
      <SeitenTitel titel={text.heft.woerter} unter={text.heft.woerterText} p={p} sprache={sprache} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 }}>
        {liste.map(({ pe, e }) => (
          <View key={pe.id} wrap={false} style={{ width: '50%', paddingHorizontal: 6, marginBottom: 9 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: p.mittel, paddingBottom: 2, marginBottom: 2 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: p.tief, marginRight: 5 }}>{String(pe.nr)}</Text>
              <Text style={{ flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(pe.titel[sprache], sprache)}</Text>
            </View>
            {e!.woerter.map((w, i) => (
              <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, lineHeight: 1.4, color: NEUTRAL.text }}>
                {ty(w[sprache], sprache)}
                <Text style={{ color: NEUTRAL.leise }}>{` – ${ty(w[andere], andere)}`}</Text>
              </Text>
            ))}
          </View>
        ))}
      </View>
      <Fuss links={FACH.name} titel={`${text.heft.woerter} · ${t.schuelerheft} ${plan.klasse}`} sprache={sprache} />
    </Page>
  )
}

function NotizSeite({ plan, text, sprache }: { plan: Jahresplan; text: HandbuchText; sprache: Sprache }) {
  const p = stufenPalette(plan.klasse)
  return (
    <Page size="A4" style={seitenStil}>
      <Kopf reiter={text.heft.notizen} meta={`${FACH.name}  ·  ${plan.klasse}`} p={p} />
      <SeitenTitel titel={text.heft.notizen} p={p} sprache={sprache} />
      {Array.from({ length: 26 }, (_, i) => (
        <View key={i} style={{ height: 24.5, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.rahmen }} />
      ))}
      <Fuss links={FACH.name} titel={text.heft.notizen} sprache={sprache} />
    </Page>
  )
}

/** Rückseite: wo es Hilfe gibt – groß und gut lesbar. */
function HilfeRueckseite({ plan, text, sprache }: { plan: Jahresplan; text: HandbuchText; sprache: Sprache }) {
  const p = stufenPalette(plan.klasse)
  return (
    <Page size="A4" style={{ padding: 0 }}>
      <View style={{ paddingHorizontal: 56, paddingTop: 110 }}>
        <View style={{ width: 40, height: 3, backgroundColor: WARM, marginBottom: 14 }} />
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: p.tief, letterSpacing: -0.4 }}>{ty(text.heft.hilfeTitel, sprache)}</Text>
        <Absatz groesse={12} style={{ marginTop: 10, lineHeight: 1.5 }}>
          {ty(text.heft.hilfeText, sprache)}
        </Absatz>
        <View style={{ marginTop: 18, borderRadius: 12, backgroundColor: p.zart, paddingHorizontal: 18, paddingVertical: 10 }}>
          {text.sicherheit.hilfe.nummern.map((n, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: i ? 0.8 : 0, borderTopColor: '#FFFFFF' }}>
              <Absatz groesse={11.5} style={{ flex: 1, paddingRight: 10, lineHeight: 1.3 }}>
                {ty(n.name, sprache)}
              </Absatz>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 16, color: p.tief }}>{n.nummer}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ position: 'absolute', left: 56, right: 56, bottom: 50, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 10 }}>
        <Image src={CDSE_LOGO} style={{ width: 28 * CDSE_LOGO_SEITEN, height: 28, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: NEUTRAL.marke, letterSpacing: 0.3 }}>{`${FACH.name} · ${TX[sprache].schuelerheft} ${plan.klasse}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginTop: 2 }}>{URHEBER[sprache]}</Text>
        </View>
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 20, backgroundColor: p.tief }} />
    </Page>
  )
}

/**
 * `marken` sammelt die Seiten der Blätter (erster Durchlauf, auch für die Verweise im Handbuch),
 * `seiten` setzt sie ins Inhaltsverzeichnis (zweiter Durchlauf). `notizen` füllt auf ein Vielfaches von 4 auf.
 */
export function SchuelerheftDokument({ plan, einheiten, blaetter, text, sprache, vorn, marken, seiten, notizen = 0 }: { plan: Jahresplan; einheiten: Einheit[]; blaetter: Map<string, Blatt>; text: HandbuchText; sprache: Sprache; vorn: string[]; marken?: Marken; seiten?: Marken; notizen?: number }) {
  const inhalt = heftInhalt(plan, einheiten, sprache, vorn).filter((x) => blaetter.has(x.id))
  return (
    <Document title={heftTitel(plan, sprache)} author={URHEBER_NAME} creator="CDSE" producer="CDSE" language={sprache}>
      <Deckblatt plan={plan} sprache={sprache} art="heft" felder />
      <InhaltHeft plan={plan} eintraege={inhalt} blaetter={blaetter} text={text} sprache={sprache} seiten={seiten} />
      {inhalt.map((x) => (
        <BlattSeiten
          key={x.id}
          blatt={blaetter.get(x.id)!}
          opt={{
            sprache,
            schueler: true,
            lehrer: false,
            farben: STUFE_FARBEN[plan.klasse],
            heft: { reiter: x.reiter, meta: x.meta, fuss: `${FACH.name} · ${plan.klasse}` },
            seite: marken
              ? (n) => {
                  const alt = marken.get(x.id)
                  if (alt === undefined || n < alt) marken.set(x.id, n)
                }
              : undefined,
          }}
        />
      ))}
      {einheiten.some((e) => e.woerter?.length) ? <WoerterSeiten plan={plan} einheiten={einheiten} text={text} sprache={sprache} marken={marken} /> : null}
      {Array.from({ length: notizen }, (_, i) => (
        <NotizSeite key={i} plan={plan} text={text} sprache={sprache} />
      ))}
      <HilfeRueckseite plan={plan} text={text} sprache={sprache} />
    </Document>
  )
}
