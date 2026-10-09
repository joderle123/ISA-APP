// ---------------------------------------------------------------------------
// Spielschule: Seite „Beobachten & Begleiten“ (dritte Seite für die Lehrperson)
// und die Zusatzseiten Klassenraster, Portfolio-Blatt und Elternbrief.
// Kopf- und Fußzeile kommen fertig aus BlattDokument (gleiches Aussehen wie alle
// anderen Seiten); die Daten stehen in Spielideen (je Sprache) und Blatt.woche.
// ---------------------------------------------------------------------------

import { Page, View, Text } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Beobachtungspunkt, Blatt, BlattInhalt, Brieftext, Sprache, WochenWort } from '../typen'
import { NEUTRAL, type Palette } from '../zeichnung'
import { eldibDomainById, eldibGoalById } from '../../data/taxonomy'
import { ELDIB_FR } from '../eldib-fr'
import { Plakette, type Ctx } from './bausteine'
import { LEHRER_MASSE, MASSE, SCHRIFT, SEITE, typo } from './stil'
import { BEOBACHTUNG_STUFEN, BRIEF_TEXT, domaeneById, FREITAG_TEXT, JAHRGAENGE, sicherheitText, wortBild } from '../spielschule'

const HOCH = { breite: 595.28, hoehe: 841.89 }
const BREITE = HOCH.breite - SEITE.rand * 2
const QUER = HOCH.hoehe - SEITE.rand * 2
const ROT = { linie: '#B4533A', flaeche: '#FBF1EC', text: '#8A3A24' }
const STUFEN_ICONS = ['icon:heart-handshake', 'icon:user', 'icon:users']

const TEXT: Record<
  Sprache,
  {
    titel: string; plan: string; fenster: string; ichKann: string; fensterHinweis: string; stufen: string; zugang: string; mehrsprachig: string
    entscheiden: string; frage: string; woerter: string; satz: string; freitag: string; planB: string; sicherheit: string
    raster: string; rasterHinweis: string; name: string; notiz: string; wocheVom: string
    portfolio: string; bild: string; kann: string; sage: string; sageHinweis: string; datum: string
    familien: string; themenwoche: string
  }
> = {
  de: {
    titel: 'Beobachten & Begleiten', plan: 'Plan d’études', fenster: 'Beobachtungsfenster', ichKann: 'Ich kann …',
    fensterHinweis: 'Täglich 2–3 Kinder gezielt beobachten, Datum im Klassenraster eintragen; Belege (Bild, Foto, Satz des Kindes) ins Portfolio.',
    stufen: 'Drei Jahrgänge', zugang: 'Zugang für alle', mehrsprachig: 'Mehrsprachig', entscheiden: 'Das entscheiden die Kinder', frage: 'Fragenplakat am Montag',
    woerter: 'Wörter der Woche in vier Sprachen', satz: 'Satz der Woche', freitag: 'Freitags-Karte', planB: 'Plan B', sicherheit: 'Sicherheit – die 3 wichtigsten Punkte',
    raster: 'Klassenraster', rasterHinweis: 'Das Datum in das Feld der beobachteten Stufe schreiben. Täglich 2–3 Kinder gezielt beobachten; ein Kind darf mehrere Einträge haben.', name: 'Name', notiz: 'Notizen', wocheVom: 'Woche vom',
    portfolio: 'Mein Portfolio', bild: 'Mein Bild oder Foto', kann: 'Das kann ich jetzt:', sage: 'Das sage ich dazu:', sageHinweis: 'Ein Erwachsener schreibt die Worte des Kindes genau auf.', datum: 'Datum',
    familien: 'Für die Familien', themenwoche: 'Spielschule · Themenwoche',
  },
  fr: {
    titel: 'Observer et accompagner', plan: 'Plan d’études', fenster: 'Fenêtre d’observation', ichKann: 'Je sais …',
    fensterHinweis: 'Observer 2 ou 3 enfants par jour, noter la date dans la grille de classe ; les traces (dessin, photo, mots de l’enfant) au portfolio.',
    stufen: 'Selon l’âge', zugang: 'Accès pour tous', mehrsprachig: 'Plusieurs langues', entscheiden: 'Les enfants décident', frage: 'L’affiche à questions du lundi',
    woerter: 'Les mots de la semaine en quatre langues', satz: 'La phrase de la semaine', freitag: 'Fiche du vendredi', planB: 'Plan B', sicherheit: 'Sécurité – les 3 points essentiels',
    raster: 'Grille de classe', rasterHinweis: 'Noter la date dans la case du niveau observé. Observer chaque jour 2 ou 3 enfants de façon ciblée ; un enfant peut avoir plusieurs dates.', name: 'Prénom', notiz: 'Notes', wocheVom: 'Semaine du',
    portfolio: 'Mon portfolio', bild: 'Mon dessin ou ma photo', kann: 'Maintenant, je sais :', sage: 'Ce que j’en dis :', sageHinweis: 'Un adulte écrit les mots de l’enfant tels quels.', datum: 'Date',
    familien: 'Pour les familles', themenwoche: 'Préscolaire · semaine à thème',
  },
}

const ctx = (p: Palette, sprache: Sprache): Ctx => ({ m: LEHRER_MASSE, p, sprache, nummern: new Map(), breite: BREITE })

function T({ children, groesse = 8.5, farbe, fett, lh = 1.42, style }: { children: ReactNode; groesse?: number; farbe?: string; fett?: boolean; lh?: number; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: lh, color: farbe ?? NEUTRAL.text, fontWeight: fett ? 600 : 400, ...style }}>{children}</Text>
}

/** Kleine Überschrift in Versalien (wie „Wörter der Woche“ auf „Aktivitäten & Ideen“). */
function Marke({ children, farbe, style }: { children: string; farbe: string; style?: Record<string, unknown> }) {
  return <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.8, color: farbe, marginBottom: 4, ...style }}>{children.toUpperCase()}</Text>
}

function Ueberschrift({ children, farbe }: { children: string; farbe?: string }) {
  return <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: farbe ?? NEUTRAL.text, marginBottom: 4, letterSpacing: 0.1 }}>{children}</Text>
}

function Seitentitel({ titel, unter }: { titel: string; unter: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, letterSpacing: -0.2 }}>{titel}</Text>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.5, color: NEUTRAL.leise, marginLeft: 8, marginBottom: 2.5, flex: 1 }}>{unter}</Text>
    </View>
  )
}

function EldibChip({ code, sprache, mitText = true }: { code: string; sprache: Sprache; mitText?: boolean }) {
  const g = eldibGoalById.get(code)
  const farbe = g ? (eldibDomainById.get(g.domain)?.color ?? NEUTRAL.tinte) : NEUTRAL.tinte
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ borderRadius: 4, backgroundColor: farbe, paddingHorizontal: 4, paddingVertical: 1 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, color: '#FFFFFF' }}>{code}</Text>
      </View>
      {mitText ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginLeft: 4 }}>{(sprache === 'fr' ? ELDIB_FR[code] : null) ?? g?.label ?? ''}</Text> : null}
    </View>
  )
}

function Kreis({ d = 11, farbe }: { d?: number; farbe?: string }) {
  return <View style={{ width: d, height: d, borderRadius: d / 2, borderWidth: 0.9, borderColor: farbe ?? NEUTRAL.linie, backgroundColor: '#FFFFFF' }} />
}

function Punkt({ farbe }: { farbe: string }) {
  return <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: farbe, marginTop: 4.6, marginRight: 7, marginLeft: 2 }} />
}

function Nr({ n, p, d = 15 }: { n: number; p: Palette; d?: number }) {
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: p.zart, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: d * 0.5, color: p.tief }}>{String(n)}</Text>
    </View>
  )
}

/** Lernbereiche des Plan d'études als kleine Chips. */
function Domaenen({ blatt, sprache }: { blatt: Blatt; sprache: Sprache }) {
  const liste = (blatt.woche?.domaenen ?? []).map((id) => domaeneById.get(id)).filter((d) => !!d)
  if (!liste.length) return null
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 7 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.8, color: NEUTRAL.leise, marginRight: 6, marginBottom: 3 }}>{TEXT[sprache].plan.toUpperCase()}</Text>
      {liste.map((d) => (
        <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: NEUTRAL.rahmen, borderRadius: 9, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 3 }}>
          <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: d.farbe, marginRight: 4 }} />
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.2, color: NEUTRAL.text }}>{typo(d[sprache], sprache)}</Text>
        </View>
      ))}
    </View>
  )
}

/** Kopf der drei Stufen: Piktogramm und Wort. */
function StufenKopf({ sprache, p, i, groesse = 7.4 }: { sprache: Sprache; p: Palette; i: number; groesse?: number }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Plakette c={ctx(p, sprache)} id={STUFEN_ICONS[i]} d={16} />
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: groesse, color: p.tief, marginTop: 2, textAlign: 'center' }}>{BEOBACHTUNG_STUFEN[sprache][i]}</Text>
    </View>
  )
}

function Fenster({ punkte, sprache, p }: { punkte: Beobachtungspunkt[]; sprache: Sprache; p: Palette }) {
  const t = TEXT[sprache]
  const stufe = 66
  return (
    <View wrap={false} style={{ borderWidth: 0.8, borderColor: p.mittel, borderRadius: 9, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: p.zart, borderTopLeftRadius: 9, borderTopRightRadius: 9, paddingHorizontal: 9, paddingTop: 6, paddingBottom: 5 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: p.tief }}>{t.fenster}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginTop: 1 }}>{t.ichKann}</Text>
        </View>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ width: stufe }}>
            <StufenKopf sprache={sprache} p={p} i={i} />
          </View>
        ))}
      </View>
      {punkte.map((x, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 5, borderTopWidth: i ? 0.6 : 0, borderTopColor: NEUTRAL.haarlinie }}>
          <Nr n={i + 1} p={p} />
          <View style={{ flex: 1, marginLeft: 7, paddingRight: 6 }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, lineHeight: 1.3, color: NEUTRAL.text, marginBottom: 2 }}>{typo(x.text, sprache)}</Text>
            <EldibChip code={x.eldib} sprache={sprache} />
          </View>
          {[0, 1, 2].map((s) => (
            <View key={s} style={{ width: stufe, alignItems: 'center' }}>
              <Kreis d={12} />
            </View>
          ))}
        </View>
      ))}
      <View style={{ borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingHorizontal: 9, paddingVertical: 5 }}>
        <T groesse={7.6} farbe={NEUTRAL.leise} lh={1.35}>
          {typo(t.fensterHinweis, sprache)}
        </T>
      </View>
    </View>
  )
}

function Woerter({ blatt, sprache, p, mehrsprachig }: { blatt: Blatt; sprache: Sprache; p: Palette; mehrsprachig?: string }) {
  const s = blatt.woche?.sprachen
  if (!s?.woerter?.length) return null
  const t = TEXT[sprache]
  // Reihenfolge: zuerst die Sprache des Blatts, dann die andere, dann Luxemburgisch und Portugiesisch
  const de = { tag: 'DE', sp: 'de' as Sprache, wort: (w: WochenWort) => w.de }
  const fr = { tag: 'FR', sp: 'fr' as Sprache, wort: (w: WochenWort) => w.fr }
  const reihen: { tag: string; sp: Sprache; wort: (w: WochenWort) => string | undefined }[] = [
    ...(sprache === 'fr' ? [fr, de] : [de, fr]),
    { tag: 'LB', sp: 'de', wort: (w) => w.lb },
    ...(s.woerter.some((w) => w.pt) ? [{ tag: 'PT', sp: 'de' as Sprache, wort: (w: WochenWort) => w.pt }] : []),
  ]
  const tag = 16
  const spalte = (BREITE - tag) / s.woerter.length
  return (
    <View wrap={false} style={{ marginBottom: 8 }}>
      <Ueberschrift>{t.woerter}</Ueberschrift>
      <View style={{ borderWidth: 0.7, borderColor: NEUTRAL.rahmen, borderRadius: 8, paddingTop: 5, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
          <View style={{ width: tag }} />
          {s.woerter.map((w, i) => {
            const bild = wortBild(blatt, w)
            return (
              <View key={i} style={{ width: spalte, alignItems: 'center', height: 24, justifyContent: 'center' }}>
                {bild ? <Plakette c={ctx(p, sprache)} id={bild} d={22} /> : null}
              </View>
            )
          })}
        </View>
        {reihen.map((r, z) => (
          <View key={r.tag} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 1.6, borderTopWidth: z ? 0.5 : 0, borderTopColor: NEUTRAL.haarlinie }}>
            <Text style={{ width: tag, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.8, color: z ? NEUTRAL.sehrLeise : p.tief, letterSpacing: 0.3, textAlign: 'right', paddingRight: 3 }}>{r.tag}</Text>
            {s.woerter.map((w, i) => (
              <Text key={i} style={{ width: spalte, paddingHorizontal: 2, fontFamily: SCHRIFT.jugend, fontWeight: z ? 400 : 600, fontSize: 7.8, lineHeight: 1.25, color: NEUTRAL.text, textAlign: 'center' }}>
                {typo(r.wort(w) ?? '', r.sp)}
              </Text>
            ))}
          </View>
        ))}
        {mehrsprachig ? (
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.38, color: NEUTRAL.text, paddingHorizontal: 8, paddingTop: 4, borderTopWidth: 0.5, borderTopColor: NEUTRAL.haarlinie }}>
            <Text style={{ fontWeight: 600, color: p.tief }}>{t.mehrsprachig + (sprache === 'fr' ? ' : ' : ': ')}</Text>
            {typo(mehrsprachig, sprache)}
          </Text>
        ) : null}
        <View style={{ height: 4 }} />
        <Satz blatt={blatt} sprache={sprache} p={p} />
      </View>
    </View>
  )
}

/** Satz der Woche – im Kasten der Wörter (oder allein, wenn es keine Wörter gibt). */
function Satz({ blatt, sprache, p }: { blatt: Blatt; sprache: Sprache; p: Palette }) {
  const s = blatt.woche?.sprachen?.satz
  if (!s) return null
  const zeilen: [string, string | undefined][] = sprache === 'fr' ? [['FR', s.fr], ['DE', s.de], ['LB', s.lb], ['PT', s.pt]] : [['DE', s.de], ['FR', s.fr], ['LB', s.lb], ['PT', s.pt]]
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: p.zart, paddingVertical: 5, paddingHorizontal: 8 }}>
      <Text style={{ width: 74, paddingRight: 8, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, lineHeight: 1.3, letterSpacing: 0.5, color: p.tief, marginTop: 1.5 }}>{TEXT[sprache].satz.toUpperCase()}</Text>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {zeilen
          .filter(([, x]) => !!x)
          .map(([tag, x], i) => (
            <View key={tag} style={{ width: '50%', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 1.5, paddingRight: 6 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.8, color: i ? NEUTRAL.sehrLeise : p.tief, width: 13, marginTop: 2, letterSpacing: 0.3 }}>{tag}</Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: i === 0 ? 600 : 400, fontSize: 8.4, lineHeight: 1.3, color: NEUTRAL.text, flex: 1 }}>{typo(x!, tag === 'FR' ? 'fr' : 'de')}</Text>
            </View>
          ))}
      </View>
    </View>
  )
}

/** Freitags-Karte als schmale Spalte: Symbolzeile (Vorlauf, Küche, Ausflug, Besuch, Material), Plan B, Sicherheit. */
function Freitag({ inhalt, sprache, p }: { inhalt: BlattInhalt; sprache: Sprache; p: Palette }) {
  const f = inhalt.lehrer.spielschule?.freitag
  if (!f) return null
  const t = TEXT[sprache]
  const ft = FREITAG_TEXT[sprache]
  const ampel = { standard: '#3F8A4A', besorgen: '#D29A1E', selten: '#B4533A' }[f.material] ?? NEUTRAL.leise
  const feld = (icon: string, text: string, an: boolean, punkt?: string) => (
    <View key={icon} style={{ flex: 1, alignItems: 'center', backgroundColor: an ? p.zart : NEUTRAL.flaeche, borderRadius: 7, paddingTop: 4, paddingBottom: 3, paddingHorizontal: 2, marginRight: icon === 'icon:package' ? 0 : 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Plakette c={ctx(p, sprache)} id={icon} d={16} ton="#FFFFFF" />
        {punkt ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: punkt, marginLeft: 3 }} /> : null}
      </View>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: an ? 600 : 400, fontSize: 6.6, lineHeight: 1.2, color: an ? NEUTRAL.text : NEUTRAL.sehrLeise, marginTop: 2, textAlign: 'center' }}>{typo(text, sprache)}</Text>
    </View>
  )
  const sicher = (f.sicherheit ?? []).map((x) => sicherheitText(x, sprache))
  return (
    <View wrap={false}>
      <Ueberschrift>{t.freitag}</Ueberschrift>
      <View style={{ flexDirection: 'row', alignItems: 'stretch', marginBottom: 6 }}>
        {feld('icon:hourglass', ft.vorlauf[f.vorlauf] ?? '', f.vorlauf > 0)}
        {feld('icon:chef-hat', ft.kueche[f.kueche ? 0 : 1], !!f.kueche)}
        {feld('icon:walk', ft.ausflug[f.ausflug ? 0 : 1], !!f.ausflug)}
        {feld('icon:door-enter', ft.besuch[f.besuch ? 0 : 1], !!f.besuch)}
        {feld('icon:package', ft.material[f.material] ?? '', f.material !== 'standard', ampel)}
      </View>
      {f.planB ? (
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.5, lineHeight: 1.42, color: NEUTRAL.text, marginBottom: 6 }}>
          <Text style={{ fontWeight: 600, color: p.tief }}>{t.planB + (sprache === 'fr' ? ' : ' : ': ')}</Text>
          {typo(f.planB, sprache)}
        </Text>
      ) : null}
      {sicher.length ? (
        <View style={{ borderLeftWidth: 3, borderLeftColor: ROT.linie, backgroundColor: ROT.flaeche, borderRadius: 6, padding: 8 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.8, color: ROT.text, marginBottom: 3 }}>{t.sicherheit}</Text>
          {sicher.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: ROT.text, width: 10 }}>{String(i + 1)}</Text>
              <View style={{ flex: 1 }}>
                <T groesse={8.2} lh={1.36}>
                  {typo(x, sprache)}
                </T>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  )
}

/** Dritte Seite für die Lehrperson: Beobachtungsfenster, Jahrgänge, Zugang, Mitbestimmung, Freitags-Karte, Sprachen. */
export function BegleitenSeite({ blatt, inhalt, sprache, p, kopf, fuss }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; kopf: ReactNode; fuss: ReactNode }) {
  const sp = inhalt.lehrer.spielschule
  if (!sp) return null
  const t = TEXT[sprache]
  const ty = (x: string) => typo(x, sprache)
  // „Mehrsprachig“ steht beim Wörterstreifen, wenn es einen gibt
  const woerter = !!blatt.woche?.sprachen?.woerter?.length
  const mehrsprachigLinks = !woerter && sp.mehrsprachig
  const links = !!(sp.zugang?.length || mehrsprachigLinks || sp.entscheiden)
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      {kopf}
      <Seitentitel titel={t.titel} unter={ty(inhalt.titel)} />
      <Domaenen blatt={blatt} sprache={sprache} />
      {sp.beobachtung?.length ? <Fenster punkte={sp.beobachtung} sprache={sprache} p={p} /> : null}
      {sp.stufen ? (
        <View wrap={false} style={{ marginBottom: 10 }}>
          <Ueberschrift>{t.stufen}</Ueberschrift>
          <View style={{ flexDirection: 'row' }}>
            {JAHRGAENGE.map((j, i) => (
              <View key={j.key} style={{ flex: 1, marginRight: i < 2 ? 7 : 0, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8, padding: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 2 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.2, color: p.tief }}>{j.name}</Text>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginLeft: 4 }}>{j[sprache]}</Text>
                </View>
                <T groesse={8.3} lh={1.36}>
                  {ty(sp.stufen![j.key] ?? '')}
                </T>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      {links || sp.freitag ? (
        <View wrap={false} style={{ flexDirection: 'row', marginBottom: 10 }}>
          {links ? (
            <View style={{ flex: 1, marginRight: sp.freitag ? 16 : 0 }}>
              {sp.zugang?.length ? (
                <View style={{ marginBottom: 7 }}>
                  <Ueberschrift>{t.zugang}</Ueberschrift>
                  {sp.zugang.map((x, i) => (
                    <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                      <Punkt farbe={p.tief} />
                      <View style={{ flex: 1 }}>
                        <T>{ty(x)}</T>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
              {mehrsprachigLinks ? (
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.5, lineHeight: 1.42, color: NEUTRAL.text, marginBottom: 8 }}>
                  <Text style={{ fontWeight: 600, color: p.tief }}>{t.mehrsprachig + (sprache === 'fr' ? ' : ' : ': ')}</Text>
                  {ty(sp.mehrsprachig!)}
                </Text>
              ) : null}
              {sp.entscheiden ? (
                <View style={{ borderLeftWidth: 3, borderLeftColor: p.tief, backgroundColor: p.zart, borderRadius: 6, padding: 8 }}>
                  <Ueberschrift farbe={p.tief}>{t.entscheiden}</Ueberschrift>
                  <T>{ty(sp.entscheiden.text)}</T>
                  {sp.entscheiden.frage ? (
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <Plakette c={ctx(p, sprache)} id="icon:help-circle" d={16} ton="#FFFFFF" />
                      <View style={{ flex: 1, marginLeft: 5 }}>
                        <T groesse={7.4} farbe={NEUTRAL.leise} lh={1.2}>
                          {t.frage}
                        </T>
                        <T fett groesse={8.6} lh={1.3}>
                          {ty(sp.entscheiden.frage)}
                        </T>
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
          {sp.freitag ? (
            <View style={{ flex: 1 }}>
              <Freitag inhalt={inhalt} sprache={sprache} p={p} />
            </View>
          ) : null}
        </View>
      ) : null}
      <Woerter blatt={blatt} sprache={sprache} p={p} mehrsprachig={sp.mehrsprachig} />
      {!woerter ? <Satz blatt={blatt} sprache={sprache} p={p} /> : null}
      {fuss}
    </Page>
  )
}

// --- Zusatzseiten ----------------------------------------------------------------------------------

/** Klassenraster (quer): 14 Zeilen für Namen × 3 Beobachtungspunkte × 3 Stufen, Datum eintragen. */
export function KlassenrasterSeite({ inhalt, sprache, p, kopf, fuss }: { inhalt: BlattInhalt; sprache: Sprache; p: Palette; kopf: ReactNode; fuss: ReactNode }) {
  const punkte = inhalt.lehrer.spielschule?.beobachtung ?? []
  if (!punkte.length) return null
  const t = TEXT[sprache]
  const name = 118
  const notiz = 104
  const stufe = (QUER - name - notiz) / (punkte.length * 3)
  const zeilen = 14
  const rand = { borderRightWidth: 0.6, borderRightColor: NEUTRAL.rahmen }
  return (
    <Page size="A4" orientation="landscape" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      {kopf}
      <Seitentitel titel={t.raster} unter={typo(inhalt.titel, sprache)} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 7 }}>
        <T groesse={8} farbe={NEUTRAL.leise} style={{ flex: 1 }}>
          {typo(t.rasterHinweis, sprache)}
        </T>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.leise, marginLeft: 12, marginRight: 5 }}>{t.wocheVom}</Text>
        <View style={{ width: 110, height: 11, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
      </View>
      <View style={{ borderWidth: 0.8, borderColor: NEUTRAL.linie, borderRadius: 6 }}>
        {/* Kopf: Punkte */}
        <View style={{ flexDirection: 'row', backgroundColor: p.zart, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.rahmen }}>
          <View style={{ width: name, ...rand, padding: 6, justifyContent: 'flex-end' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.6, color: NEUTRAL.text }}>{t.name}</Text>
          </View>
          {punkte.map((x, i) => (
            <View key={i} style={{ width: stufe * 3, ...rand, padding: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Nr n={i + 1} p={{ ...p, zart: '#FFFFFF' }} d={14} />
                <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8, lineHeight: 1.28, color: NEUTRAL.text, marginLeft: 5, flex: 1 }}>{typo(x.text, sprache)}</Text>
              </View>
              <View style={{ marginTop: 3, marginLeft: 19 }}>
                <EldibChip code={x.eldib} sprache={sprache} />
              </View>
            </View>
          ))}
          <View style={{ width: notiz, padding: 6, justifyContent: 'flex-end' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.6, color: NEUTRAL.text }}>{t.notiz}</Text>
          </View>
        </View>
        {/* Kopf: Stufen */}
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }}>
          <View style={{ width: name, ...rand }} />
          {punkte.map((_, i) =>
            [0, 1, 2].map((s) => (
              <View key={`${i}-${s}`} style={{ width: stufe, paddingVertical: 4, paddingHorizontal: 2, ...(s === 2 ? rand : { borderRightWidth: 0.4, borderRightColor: NEUTRAL.haarlinie }) }}>
                <StufenKopf sprache={sprache} p={p} i={s} groesse={6.6} />
              </View>
            )),
          )}
          <View style={{ width: notiz }} />
        </View>
        {Array.from({ length: zeilen }, (_, z) => (
          <View key={z} style={{ flexDirection: 'row', height: 23, borderBottomWidth: z < zeilen - 1 ? 0.5 : 0, borderBottomColor: NEUTRAL.haarlinie, backgroundColor: z % 2 ? '#FAFBFC' : '#FFFFFF' }}>
            <View style={{ width: name, ...rand }} />
            {punkte.map((_, i) => [0, 1, 2].map((s) => <View key={`${i}-${s}`} style={{ width: stufe, ...(s === 2 ? rand : { borderRightWidth: 0.4, borderRightColor: NEUTRAL.haarlinie }) }} />))}
            <View style={{ width: notiz }} />
          </View>
        ))}
      </View>
      {fuss}
    </Page>
  )
}

/** Portfolio-Blatt für das Kind: Bild/Foto, „Das kann ich jetzt“ mit den drei Stufen, die Worte des Kindes, Datum. */
export function PortfolioSeite({ blatt, inhalt, sprache, p, kopf, fuss }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; kopf: ReactNode; fuss: ReactNode }) {
  const punkte = inhalt.lehrer.spielschule?.beobachtung ?? []
  const t = TEXT[sprache]
  const m = MASSE.bild
  const c: Ctx = { m, p, sprache, nummern: new Map(), breite: BREITE }
  const kind = (x: string, groesse: number, fett?: boolean, farbe?: string) => (
    <Text style={{ fontFamily: m.schrift, fontSize: groesse, fontWeight: fett ? m.fett : 400, lineHeight: 1.25, color: farbe ?? NEUTRAL.text }}>{typo(x, sprache)}</Text>
  )
  const stufen = (
    <View style={{ flexDirection: 'row' }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ width: 62, alignItems: 'center' }}>
          <Plakette c={c} id={STUFEN_ICONS[i]} d={22} ton="#FFFFFF" />
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.6, color: NEUTRAL.leise, marginTop: 1.5, textAlign: 'center' }}>{BEOBACHTUNG_STUFEN[sprache][i]}</Text>
        </View>
      ))}
    </View>
  )
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      {kopf}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 0.9, color: p.tief, marginBottom: 2 }}>{t.portfolio.toUpperCase()}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 25, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3 }}>{typo(inhalt.titel, sprache)}</Text>
        </View>
        <Plakette c={c} id={blatt.bild ?? 'icon:sandbox'} d={70} />
      </View>
      <View style={{ height: 300, borderWidth: 1.4, borderStyle: 'dashed', borderColor: p.mittel, borderRadius: 14, marginBottom: 14, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Plakette c={c} id="icon:brush" d={20} />
          <View style={{ width: 4 }} />
          <Plakette c={c} id="icon:camera" d={20} />
          <Text style={{ fontFamily: m.schrift, fontSize: 10, color: NEUTRAL.leise, marginLeft: 6 }}>{t.bild}</Text>
        </View>
      </View>
      <View wrap={false} style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4 }}>
          <View style={{ flex: 1 }}>{kind(t.kann, 15, true, p.tief)}</View>
          {stufen}
        </View>
        {punkte.map((x, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderTopWidth: 0.7, borderTopColor: NEUTRAL.haarlinie }}>
            <View style={{ flex: 1, paddingRight: 8 }}>{kind(x.text, 12.5)}</View>
            {[0, 1, 2].map((s) => (
              <View key={s} style={{ width: 62, alignItems: 'center' }}>
                <Kreis d={15} />
              </View>
            ))}
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, borderTopWidth: 0.7, borderTopColor: NEUTRAL.haarlinie }}>
          <View style={{ flex: 1, height: 18, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie, marginRight: 8 }} />
          {[0, 1, 2].map((s) => (
            <View key={s} style={{ width: 62, alignItems: 'center' }}>
              <Kreis d={15} />
            </View>
          ))}
        </View>
      </View>
      <View wrap={false}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          {kind(t.sage, 15, true, p.tief)}
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginLeft: 8 }}>{typo(t.sageHinweis, sprache)}</Text>
        </View>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ height: 30, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 12 }}>
          <Text style={{ fontFamily: m.schrift, fontSize: 11, color: NEUTRAL.leise, marginRight: 6 }}>{t.datum}</Text>
          <View style={{ width: 120, height: 14, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
        </View>
      </View>
      {fuss}
    </Page>
  )
}

/** Elternbrief: DE und FR nebeneinander (Sprache des Blatts zuerst), darunter PT und LB, dazu die Wörter der Woche. */
export function ElternbriefSeite({ blatt, sprache, p, fuss }: { blatt: Blatt; sprache: Sprache; p: Palette; fuss: ReactNode }) {
  const brief = blatt.woche?.elternbrief
  if (!brief) return null
  const c = ctx(p, sprache)
  const andere: Sprache = sprache === 'fr' ? 'de' : 'fr'
  const titel = { de: blatt.de.titel, fr: blatt.fr?.titel ?? blatt.de.titel }
  const karte = (sp: 'de' | 'fr' | 'pt' | 'lb', b: Brieftext, voll: boolean) => {
    const L = BRIEF_TEXT[sp]
    const ty = (x: string) => typo(x, sp === 'fr' ? 'fr' : 'de')
    const teil = (label: string, text: string, icon: string) => (
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <View style={{ marginRight: 6, marginTop: 1 }}>
          <Plakette c={c} id={icon} d={15} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, color: p.tief, marginBottom: 1 }}>{ty(label)}</Text>
          <T groesse={voll ? 9 : 8.4} lh={1.4}>
            {ty(text)}
          </T>
        </View>
      </View>
    )
    return (
      <View key={sp} wrap={false} style={{ flex: 1, borderWidth: 0.8, borderColor: voll ? p.mittel : NEUTRAL.rahmen, borderRadius: 10, padding: 9, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <View style={{ backgroundColor: voll ? p.tief : NEUTRAL.leise, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1.5, marginRight: 6 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, letterSpacing: 0.6, color: '#FFFFFF' }}>{sp.toUpperCase()}</Text>
          </View>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise }}>{L.sprache}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: voll ? 10.5 : 9.6, color: NEUTRAL.text, marginTop: 3 }}>{ty(L.anrede)}</Text>
        {teil(L.woche, b.woche, 'icon:calendar-event')}
        {teil(L.idee, b.idee, 'icon:home')}
        {teil(L.bitte, b.bitte, 'icon:gift')}
      </View>
    )
  }
  const unten = (['pt', 'lb'] as const).filter((x) => brief[x])
  const s = blatt.woche?.sprachen
  const woerter = s?.woerter ?? []
  const satzZeilen: [string, Sprache, string | undefined][] = s?.satz
    ? [[sprache.toUpperCase(), sprache, s.satz[sprache]], [andere.toUpperCase(), andere, s.satz[andere]], ['LB', 'de', s.satz.lb], ['PT', 'de', s.satz.pt]]
    : []
  const satz = (breit: boolean) =>
    satzZeilen.length ? (
      <View style={{ marginTop: 4 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.6, color: p.tief, marginBottom: 2 }}>{`${BRIEF_TEXT[sprache].satz} · ${BRIEF_TEXT[andere].satz}`.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {satzZeilen
            .filter(([, , x]) => !!x)
            .map(([tag, sp, x], i) => (
              <View key={tag} style={{ width: breit ? '50%' : '100%', flexDirection: 'row', paddingRight: 6, marginBottom: 1 }}>
                <Text style={{ width: 14, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.8, color: i ? NEUTRAL.sehrLeise : p.tief, marginTop: 2, letterSpacing: 0.3 }}>{tag}</Text>
                <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontWeight: i ? 400 : 600, fontSize: 8.2, lineHeight: 1.35, color: NEUTRAL.text }}>{typo(x!, sp)}</Text>
              </View>
            ))}
        </View>
      </View>
    ) : null
  const woerterTitel = <Marke farbe={p.tief}>{`${BRIEF_TEXT[sprache].woerter} · ${BRIEF_TEXT[andere].woerter}`}</Marke>
  const erstes = (w: WochenWort) => (sprache === 'fr' ? w.fr : w.de)
  const zweites = (w: WochenWort) => (sprache === 'fr' ? w.de : w.fr)
  const woerterReihe = woerter.length ? (
    <View wrap={false} style={{ backgroundColor: p.zart, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 7 }}>
      {woerterTitel}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {woerter.map((w, i) => {
          const bild = wortBild(blatt, w)
          return (
            <View key={i} style={{ width: `${100 / Math.min(8, Math.max(4, woerter.length))}%`, alignItems: 'center', paddingHorizontal: 2, marginBottom: 3 }}>
              {bild ? <Plakette c={c} id={bild} d={22} ton="#FFFFFF" /> : null}
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.4, color: NEUTRAL.text, marginTop: 1.5, textAlign: 'center' }}>{typo(erstes(w), sprache)}</Text>
              {[zweites(w), w.lb, w.pt].filter(Boolean).map((x, j) => (
                <Text key={j} style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.leise, textAlign: 'center' }}>
                  {typo(x!, j === 0 ? andere : 'de')}
                </Text>
              ))}
            </View>
          )
        })}
      </View>
      {unten.length < 2 ? satz(true) : null}
    </View>
  ) : null
  const woerterListe = woerter.length ? (
    <View wrap={false} style={{ flex: 1, backgroundColor: p.zart, borderRadius: 10, padding: 10 }}>
      {woerterTitel}
      {woerter.map((w, i) => {
        const bild = wortBild(blatt, w)
        return (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2.5, borderTopWidth: i ? 0.5 : 0, borderTopColor: p.mittel }}>
            <View style={{ width: 24, marginRight: 6 }}>{bild ? <Plakette c={c} id={bild} d={22} ton="#FFFFFF" /> : null}</View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.text }}>
                <Text style={{ fontWeight: 600 }}>{typo(erstes(w), sprache)}</Text>
                {'  ·  ' + typo(zweites(w), andere)}
              </Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise }}>{[w.lb, w.pt].filter(Boolean).join('  ·  ')}</Text>
            </View>
          </View>
        )
      })}
      {satz(false)}
    </View>
  ) : null
  return (
    <Page size="A4" style={{ paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{`${TEXT[sprache].familien} · ${TEXT[andere].familien}`.toUpperCase()}</Text>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, marginLeft: 8 }}>{TEXT[sprache].themenwoche}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 23, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3 }}>{typo(titel[sprache], sprache)}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 700, fontSize: 12.5, color: NEUTRAL.leise, marginTop: 2 }}>{typo(titel[andere], andere)}</Text>
        </View>
        <Plakette c={c} id={blatt.bild ?? 'icon:sandbox'} d={66} />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        {karte(sprache, brief[sprache], true)}
        <View style={{ width: 10 }} />
        {karte(andere, brief[andere], true)}
      </View>
      {unten.length === 2 ? (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {karte(unten[0], brief[unten[0]]!, false)}
          <View style={{ width: 10 }} />
          {karte(unten[1], brief[unten[1]]!, false)}
        </View>
      ) : null}
      {unten.length === 1 ? (
        // eine weitere Sprache: daneben die Wörter der Woche als Liste
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {karte(unten[0], brief[unten[0]]!, false)}
          <View style={{ width: 10 }} />
          {woerterListe ?? <View style={{ flex: 1 }} />}
        </View>
      ) : null}
      {unten.length !== 1 ? woerterReihe : null}
      {fuss}
    </Page>
  )
}
