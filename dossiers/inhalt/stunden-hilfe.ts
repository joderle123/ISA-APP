// REAL TALK – Bausteine für Hefte mit Stunden (seit 16.11.2026). Kurzschreibweisen, damit jede Ausgabe ihre Stunden knapp
// beschreibt und dabei die Regeln aus der Praxis einhält (siehe dossiers/README.md, „Hefte mit Stunden“):
//   1. Roter Faden: „Ankommen“ fragt etwas, das am Ende wieder gebraucht wird; der Fall kommt bei Clip und Schluss wieder vor.
//   2. Einfach zu verstehen: zuerst ankreuzen, dann ein Satzanfang, höchstens eine freie Zeile. Kurze Sätze.
//   3. Kein Vorspielen: lesen, gleichzeitig zeigen, legen, bauen, ankreuzen – nie allein vor der Gruppe etwas darstellen.
//   4. Clip nur, wenn er zum Fall passt – immer mit Aufträgen für vorher, beim Schauen, danach.
//   5. Eine große Runde je Stunde (20–30 Minuten), das Material steht im Heft.
//   6. Jede Stunde einer Ausgabe ist anders gebaut.
import type { Baustein, Frage, Heft, Station, Stunde, Track } from '../typen'

type Aktion = Omit<Extract<Baustein, { art: 'aktion' }>, 'art'>
type Karte = { t: string; x?: string; marke?: string }

/* ---------- Fragen ---------- */
export const kreuz = (f: string, ...o: string[]): Frage => ({ f, kreuz: o })
/** Kästchen untereinander (lange Antworten) */
export const kreuzU = (f: string, ...o: string[]): Frage => ({ f, kreuz: o, unter: true })
export const zeile = (f: string, n = 1): Frage => ({ f, linien: n })
export const satz = (f: string, ...anfaenge: string[]): Frage => ({ f, satz: anfaenge })
export const strich = (f: string, von: string, bis: string): Frage => ({ f, strich: [von, bis] })
/** Stimmt / stimmt nicht – für Aussagen zum Ankreuzen */
export const stimmt = (f: string, ...aussagen: string[]): Frage => ({ f, raster: { spalten: ['stimmt', 'stimmt nicht'], zeilen: aussagen } })
/** Aufgaben leichter machen: höchstens eine freie Zeile je Frage */
export const leicht = (l: Frage[]): Frage[] => l.map((f) => (f.linien && f.linien > 1 ? { ...f, linien: 1 } : f))

/** Vertiefung (24.11.2026): Kette ordnen, Theorien prüfen, Verantwortung verteilen, Wörter zuordnen */
export const kette = (f: string, n: number, ende: string): Frage => ({ f, kette: [...Array.from({ length: n }, () => ''), ende] })
export const theorien = (f: string, ...t: string[]): Frage => ({ f, preis: { erste: 'Theorie aus der Klasse', kopf: ['ja · halb · nein', 'Beweis: Spur …'], optionen: t } })
export const verteilen = (f: string, ...namen: string[]): Frage => ({ f, zahl: namen })
export const wortkasten = (f: string, ...w: string[]): Frage => ({ f, wortkasten: w })
export const raster = (f: string, spalten: string[], ...zeilen: string[]): Frage => ({ f, raster: { spalten, zeilen } })
/** Abwägen: je Möglichkeit zwei leere Spalten */
export const abwaegen = (f: string, kopf: [string, string], ...optionen: string[]): Frage => ({ f, preis: { kopf, optionen } })

/** Sweet Spot (24.11.2026): „Kennst du das?“ – Sätze zum Wiedererkennen, drei Spalten zum Ankreuzen */
export const kennstDu = (f: string, ...saetze: string[]): Frage => ({ f, raster: { spalten: ['kenn ich', 'ein bisschen', 'kenn ich nicht'], zeilen: saetze } })
export const verbinden = (f: string, links: string[], rechts: string[]): Frage => ({ f, verbinden: [links, rechts] })
export const akku = (f: string): Frage => ({ f, akku: 'leer' })

/* ---------- Bausteine ---------- */
export const text = (...x: string[]): Baustein => ({ art: 'text', x })
export const fragen = (kontext: string | null, ...l: Frage[]): Baustein => ({ art: 'fragen', ...(kontext ? { kontext } : {}), fragen: l })
export const karten = (spalten: number, hoehe: number, hinweis: string, l: Karte[], wort = false): Baustein => ({ art: 'karten', spalten, hoehe, hinweis, karten: l, ...(wort ? { wort: true } : {}) })
export const tabelle = (breiten: string, kopf: string[], zeilen: string[][], hoehe?: number): Baustein => ({ art: 'tabelle', breiten, kopf, zeilen, ...(hoehe ? { hoehe } : {}) })
export const merk = (x: string): Baustein => ({ art: 'merk', x })
/** Gesprächsanstoß „Redet darüber“ – freiwillig, ohne Schreiben */
export const reden = (...x: string[]): Baustein => ({ art: 'reden', x })
export const redenT = (titel: string, ...x: string[]): Baustein => ({ art: 'reden', titel, x })
/** Beispiel „So sieht eine Runde aus“: [wer, was] – wer '' = Erzählsatz */
export const beispiel = (titel: string, ...z: [string, string][]): Baustein => ({ art: 'chat', titel, zeilen: z.map(([wer, x]) => (wer === '' ? { wer: '', x, art: 'tut' as const } : { wer, x })) })
/** Sprechblasen: [wer, was] sagt · ['~wer', was] denkt · ['', was] Erzählsatz */
export const blasen = (...z: [string, string][]): Baustein => ({ art: 'chat', zeilen: z.map(([wer, x]) => (wer === '' ? { wer: '', x, art: 'tut' as const } : wer.startsWith('~') ? { wer: wer.slice(1), x, art: 'denkt' as const } : { wer, x })) })

/* ---------- Stationen ---------- */
/** Spuren (Beweisstücke) zu einem Fall: [Buchstabe, Icon, Quelle, Text] */
export const spuren = (l: [string, string, string, string][], ...f: Frage[]): Baustein => ({ art: 'spuren', spuren: l.map(([k, icon, quelle, x]) => ({ k, icon, quelle, x })), ...(f.length ? { fragen: f } : {}) })


export const st = (titel: string, zeit: string, wie: string, icon: string, leitung: string, ...bausteine: Baustein[]): Station => ({ titel, zeit, wie, icon, leitung, bausteine })
/** Ankommen: zwei Fragen nur für dich – die zweite wird am Ende der Stunde wieder gebraucht */
export const ankommen = (untertitel: string, ...l: Frage[]): Station =>
  st(`Ankommen: ${untertitel}`, '5 Min.', 'allein', 'door-enter', 'Still. Die Antwort wird am Ende wieder gebraucht.',
    fragen('Bevor es losgeht – nur für dich. Du brauchst es am Ende der Stunde noch einmal.', ...l))
/** Fall aus der Szene des Tracks (Bild, Name, Text) mit Fragen – erst ankreuzen, dann höchstens eine Zeile */
export const fall = (e: Track, titel: string, l: Frage[], opt: { zeit?: string; text?: string; zeitleiste?: [string, string][]; leitung?: string } = {}): Station =>
  st(`Der Fall: ${titel}`, opt.zeit ?? '10 Min.', 'lesen · zu zweit', 'search', opt.leitung ?? 'Vorlesen. Fragen zu zweit (bei 3 oder 5: ein Dreier), dann zwei Antworten hören.',
    { art: 'fall', bild: e.szene.bild, name: e.szene.name, text: opt.text ?? e.szene.text, ...(opt.zeitleiste ? { zeitleiste: opt.zeitleiste } : {}), fragen: leicht(l) })
/** Ermittlungsfall (24.11.2026): Person und kurze Geschichte, dazu Spuren – das Wichtigste steht nirgends direkt.
 *  `l` steht direkt unter den Spuren; weitere Fragen auf der nächsten Seite mit `fallWeiter`. */
export const ermittlung = (e: Track, titel: string, text: string, sp: [string, string, string, string][], l: Frage[], opt: { zeit?: string; leitung?: string; bild?: string } = {}): Station =>
  st(`Der Fall: ${titel}`, opt.zeit ?? '15 Min.', 'lesen · zu zweit ermitteln', 'search', opt.leitung ?? 'Zu zweit ermitteln lassen, nicht vorsagen. Jede Antwort mit einer Spur begründen lassen.',
    { art: 'fall', bild: opt.bild ?? e.szene.bild, name: e.szene.name, text }, spuren(sp, ...l))
/** Fortsetzung einer Station (zählt nicht als neue Station) – z. B. eine Sprechblase nach dem Fall */
export const weiter = (titel: string, nr: number, icon: string, ...bausteine: Baustein[]): Station => ({ titel, zeit: '', wie: `zu Station ${nr}`, icon, fort: true, bausteine })
/** Fortsetzung eines Falls auf der nächsten Seite (zählt nicht als neue Station) */
export const fallWeiter = (titel: string, nr: number, kontext: string | null, ...l: Frage[]): Station =>
  ({ titel: `Der Fall: ${titel}`, zeit: '', wie: `zu Station ${nr}`, icon: 'search', fort: true, bausteine: [fragen(kontext, ...l)] })
/** Clip des Tracks mit Aufträgen: vorher (Tipp), beim Schauen (zwei Stichwörter), danach (zurück zum Fall) */
export const clip = (e: Track, titel: string, vorher: Frage[], dabei: string[], nachher: Frage[], zeit = '12 Min.', leitung?: string): Station => {
  if (!e.clip) throw new Error(`Track ${e.nr} „${e.titel}“ hat keinen Clip`)
  return st(`Clip: ${titel}`, zeit, 'alle', 'player-play', leitung ?? 'Ausschnitt vorher wählen. Erst „Vorher“ ankreuzen.',
    { art: 'clip', clip: e.clip, vorher, dabei, nachher: leicht(nachher) })
}
/** Modell aus den Fakten des Tracks: je Punkt ein Symbol, auf Wunsch ein Warnzeichen */
export const modell = (e: Track, titel: string, icons: string[], opt: { zeit?: string; intro?: string; warn?: string[]; warnTitel?: string; fragen?: Frage[]; leitung?: string; wie?: string; luecke?: boolean; anzeige?: string; beweis?: string; danach?: Baustein[] } = {}): Station =>
  st(`Das Modell: ${titel}`, opt.zeit ?? '10 Min.', opt.wie ?? 'alle', 'bulb', opt.leitung ?? 'Vorlesen. Zu jedem Punkt ein Beispiel sammeln.',
    ...(opt.intro ? [text(opt.intro)] : []),
    { art: 'modell', ...(opt.warnTitel ? { warnTitel: opt.warnTitel } : {}), ...(opt.anzeige ? { anzeige: opt.anzeige } : {}), ...(opt.beweis ? { beweis: opt.beweis } : {}),
      punkte: e.fakten.map((f, i) => ({ icon: icons[i] ?? 'point', t: f.t, x: f.x, ...(opt.warn?.[i] ? { warn: opt.warn[i] } : {}), ...(opt.luecke ? { luecke: true } : {}) })) },
    ...(opt.fragen ? [fragen(null, ...leicht(opt.fragen))] : []), ...(opt.danach ?? []))
/** „Stimmt das?“ – die Mythen des Tracks zum Ankreuzen; die Auflösung steht bei den Lösungen der Leitung */
export const stimmtDas = (e: Track, zeit = '8 Min.'): Station =>
  st('Stimmt das?', zeit, 'allein · dann alle', 'help-circle', 'Erst still ankreuzen, dann auflösen (siehe Lösungen).',
    fragen('Drei Sätze, die man oft hört. Kreuz an – danach wird aufgelöst.', stimmt('Was denkst du?', ...e.mythen.map((m) => m[0]))))
/** Die große Runde: Aktion für alle mit Material, Schritten, Runden, Variante zu dritt, Punkten und Auswertung */
export const runde = (titel: string, zeit: string, wie: string, icon: string, a: Aktion, opt: { davor?: Baustein[]; danach?: Baustein[]; leitung?: string } = {}): Station =>
  st(`Die große Runde: ${titel}`, zeit, wie, icon, opt.leitung ?? 'Material bereitlegen. Fünf Minuten für die Auswertung.',
    ...(opt.davor ?? []), { art: 'aktion', ...a }, ...(opt.danach ?? []))
/** Material-Seite zu einer Station (Karten zum Ausschneiden, Plan) */
export const material = (titel: string, zuStation: number, ...bausteine: Baustein[]): Station => ({ titel: `Material: ${titel}`, zeit: '', wie: `zu Station ${zuStation}`, icon: 'scissors', fort: true, bausteine })
export const fuerDich = (titel: string, zeit: string, ...bausteine: Baustein[]): Station =>
  st(`Für dich: ${titel}`, zeit, 'allein', 'user', 'Stille Arbeit. Niemand muss etwas zeigen.', ...bausteine)
/** Schluss: eine Frage, die zum Anfang zurückführt, der Merksatz und die Aufgabe für die Woche (beides aus dem Track) */
export const schluss = (e: Track, titel: string, l: Frage[], kaestchen: string[] = ['gemacht']): Station =>
  st(`Schluss: ${titel}`, '5 Min.', 'alle', 'flag', 'Wer mag, liest vor. Wochenaufgabe ansagen.',
    fragen(null, ...leicht(l)), merk(e.merk), { art: 'woche', x: e.woche, kaestchen })
export const seite = (...stationen: Station[]): { stationen: Station[] } => ({ stationen })
export const stunde = (frage: string, kannst: string[], ...seiten: { stationen: Station[] }[]): Stunde => ({ frage, dauer: 'etwa 90 Minuten', kannst, seiten })

/* ---------- Eine Ausgabe auf Stunden umstellen ---------- */
const WOERTER: [RegExp, string][] = [
  [/Tracklist und Soundcheck/g, '„Das kommt“ und die Fragen zum Aufwärmen'], [/Tracklist/g, '„Das kommt“'], [/Soundcheck/g, 'Aufwärmen'], [/Hot Takes/g, 'Streitfragen'], [/Hot Take/g, 'Satz'], [/\bTake\b/g, 'Satz'],
  [/im Abspann/g, 'auf der Seite „Zum Schluss“'], [/Abspann in der/g, '„Zum Schluss“ in der'], [/Abspann/g, '„Zum Schluss“'], [/Zusatz-Tracks/g, 'Zusatz-Stunden'], [/Tracks/g, 'Stunden'], [/Track/g, 'Stunde'],
  [/Sessions/g, 'große Runden'], [/Session/g, 'große Runde'], [/Challenge/g, 'Aktion'], [/„Dein Move“/g, '„Für dich“'], [/Move A/g, 'Aufgabe A'], [/Move B/g, 'Aufgabe B'],
]
const neu = (x: string) => WOERTER.reduce((s, [a, b]) => s.replace(a, b), x)
/** Setzt die Stunden ein und passt Wörter und Leitungsangaben der Ausgabe an (Aufruf am Ende von inhalt/mN.ts). */
export function aufStunden(d: Heft, stunden: Stunde[], opt: { wozu?: string; geprueft?: string; loesungen?: string[][] } = {}): Heft {
  if (stunden.length !== d.tracks.length) throw new Error(`#${d.nr}: ${d.tracks.length} Tracks, aber ${stunden.length} Stunden`)
  d.tracks.forEach((e, i) => {
    e.stunde = stunden[i]
    const stationen = stunden[i].seiten.flatMap((p) => p.stationen).filter((s) => !s.fort)
    const aktionen = stunden[i].seiten.flatMap((p) => p.stationen).flatMap((s) => s.bausteine).flatMap((b) => (b.art === 'aktion' ? [b] : []))
    e.titel = neu(e.titel); e.kurz = neu(e.kurz)
    e.leitung = {
      ...e.leitung,
      einsatz: `Ablauf: ${stationen.map((s) => s.titel.split(':')[0]).join(' → ')}. Die große Runde hat ihr Material im Heft. Niemand muss etwas vorspielen.`,
      loesungen: [...(opt.loesungen?.[i] ?? e.leitung.loesungen.map(neu)), ...(!opt.loesungen?.[i] || stationen.some((s) => s.titel === 'Stimmt das?') ? [`„Stimmt das?“ und Gespräch: ${e.mythen.map((m) => `„${m[0]}“ – ${m[1]}`).join(' · ')}`] : [])],
      impulse: e.leitung.impulse.map(neu),
      material: [...new Set(aktionen.map((a) => a.material))].join('; ') + (e.clip ? '; Gerät für den Clip' : '') + '; Schere',
      blaetter: neu(e.leitung.blaetter),
    }
  })
  d.warm.titel = 'Zum Aufwärmen'
  d.ansage.so = [
    ['Stationen', 'Jede Stunde läuft von Station 1 bis zum Schluss. Oben auf der Seite siehst du, wo ihr gerade seid.'],
    ['Fall', 'Eine erfundene Person, der etwas passiert. Sie kommt in der Stunde wieder vor.'],
    ['Clip', 'Ein Video per QR-Code – mit Aufträgen für vorher, beim Schauen und danach.'],
    ['Große Runde', 'Eine Aktion für alle. Die Karten dafür stehen im Heft. Niemand muss etwas vorspielen.'],
  ]
  d.ansage.text = d.ansage.text.map(neu); d.ansage.regeln = d.ansage.regeln.map(neu)
  d.cover.zeilen = d.cover.zeilen.map(neu)
  d.abspann.saetze = d.abspann.saetze.map(neu); d.abspann.posten = d.abspann.posten.map(neu); if (d.abspann.schluss) d.abspann.schluss = neu(d.abspann.schluss)
  d.hot.unter = neu(d.hot.unter); d.hot.regeln = neu(d.hot.regeln)
  d.quiz.unter = neu(d.quiz.unter); d.quiz.fragen.forEach((q) => { q.f = neu(q.f); q.o = q.o.map(neu) })
  d.karten.forEach((k) => { k.titel = neu(k.titel); k.zeilen = k.zeilen.map(neu) })
  const lt = d.leitung
  lt.wozu = opt.wozu ?? `REAL TALK ist das Heft der Jugendlichen zu diesem Modul. Jede Einheit ist eine **zusammenhängende Stunde** mit Stationen: Der Fall vom Anfang kommt bei Clip und Schluss wieder vor, die große Runde (20–30 Minuten) hat ihre Karten im Heft, und jede Stunde ist anders gebaut. **Niemand muss etwas vorspielen:** Es wird gelesen, gezeigt, gelegt, gebaut und angekreuzt. Die Sprache ist einfach gehalten – erst ankreuzen, dann höchstens eine Zeile schreiben.`
  lt.start = neu(lt.start); lt.schluss = neu(lt.schluss); lt.hot = neu(lt.hot); lt.achtung = neu(lt.achtung); lt.gespraech = neu(lt.gespraech); lt.hintergrund = neu(lt.hintergrund)
  lt.hilfe = lt.hilfe.map(neu); lt.forder = lt.forder.map(neu); lt.druck = lt.druck.map(neu); lt.lernziele = lt.lernziele.map(neu)
  lt.fakten = lt.fakten.map((x) => (x[0] === 'Dauer' ? [x[0], x[1].replace(/Einheiten à 100 Min\./, 'Stunden à etwa 90 Min.')] : x[0] === 'Material' ? [x[0], 'Schere, Stifte, Material der großen Runden'] : x)) as [string, string][]
  if (opt.geprueft) d.geprueft = opt.geprueft
  return d
}
