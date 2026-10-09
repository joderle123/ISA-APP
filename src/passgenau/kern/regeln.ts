// Passgenau – Kontext, harte Regeln (5.2), Bewertung (5.3) und Begründungen (5.9). Deterministisch.
// Nach den Kritiken vom 9.10.: Zugang streng (P4), Fachkraft-Material nie fürs Kind (P1), Reiz/Trauma-Merkmale (P9),
// keine Katharsis (E-M16), heikel nur freigeschaltet (T-M1), Französisch als weicher Faktor (T-M4), Lockerungsleiter (T-M3).
import type { Auftrag, Bogen, Heute, KatalogEintrag, Layout, Plan, Profil, Rolle, Sprache, Stufe, Tagesform, Weg } from '../typen'
import { hash01, layoutAusStufe, norm, stufeAusAlter, stufenAbstand, tageZwischen, istEldib } from './hilfen'
import { intern, eldibKurz, eldibStufe, merkmaleVon, type Katalog } from './katalog'
import { kaltstart, V, vorliebe, type Vorlieben } from './vorlieben'
import { FORMAT_NAME, INTERESSEN, KOMPETENZ_NAME, TAGESFORM_FORMATE, TAGESFORM_NAME, kompetenzAusCode, themaByKey, type Kompetenz } from './vokabular'

/** Gewichte der Bewertung (5.3) – Version V1; eine Änderung bekommt eine neue Version. */
export const GEWICHTE_V1: Record<string, number> = {
  ziel: 0.35,
  phase: 0.15,
  zugang: 0.15,
  thema: 0.12,
  tagesform: 0.1,
  abwechslung: 0.05,
  qualitaet: 0.05,
  interesse: 0.03,
}

/** Weg 3: das Ziel entfällt, das Gewicht geht an die Tagesform (5.7). */
export const GEWICHTE_LEICHT: Record<string, number> = {
  ziel: 0,
  phase: 0,
  zugang: 0.15,
  thema: 0.02,
  tagesform: 0.45,
  abwechslung: 0.15,
  qualitaet: 0.08,
  interesse: 0.15,
}

export interface ZielKontext {
  code: string
  prio: number
  quelle?: string
  seit?: string
  ich?: string
  /** Kompetenzfeld des Ziels (bei 'kompetenz:<feld>' das Feld selbst) */
  feld: Kompetenz | null
}

export interface Kontext {
  k: Katalog
  p: Profil
  a: Auftrag
  v: Vorlieben
  weg: Weg
  alter: number
  stufe: Stufe
  layout: Layout
  sprache: Sprache
  heute: Heute
  datum: string
  ziele: ZielKontext[]
  themen: Map<string, { w: number; art?: string; datum?: string; gewaehlt?: boolean }>
  /** Id → Tage seit „gemacht“ (Blätter als 'blatt:<id>', Schritte mit ihrer Id) */
  gemacht: Map<string, number>
  vorsicht: Set<string>
  hilft: Set<string>
  heikelFrei: Set<string>
  tagesformen: Tagesform[]
  prior: Record<string, [number, number]>
  ohneKind: boolean
  seed: string
  erkundung: number
  /** Gründe mit Datum dürfen nur am Bildschirm stehen (nie im Druck) – die Texte selbst enthalten keine Werte */
  zugangText: string | null
  /** Zwischenspeicher je Planung (Prüfung, Vorliebe, Zielwert hängen nur vom Kontext ab) – für planen < 200 ms */
  cache: { pruef: Map<KatalogEintrag, (string | null | undefined)[]>; v: Map<KatalogEintrag, number>; ziel: Map<KatalogEintrag, (ReturnType<typeof zielWert> | undefined)[]> }
}

const PRIO = [1, 0.8, 0.6, 0.5, 0.4]

export function kontext(k: Katalog, p: Profil, a: Auftrag, v: Vorlieben, verlauf?: { plaene: Plan[] }): Kontext {
  const alter = p.alterJahre
  const ausAlter = stufeAusAlter(alter)
  // Stufe: aus dem Profil, aber liegt sie ≥ 2 Stufen vom Alter weg, zählt das Alter (kein Spielschulblatt für 13-Jährige)
  let stufe: Stufe = p.stufen[0] ?? ausAlter
  if (stufenAbstand(ausAlter, [stufe]) >= 2) stufe = ausAlter
  let layout: Layout = p.layout ?? layoutAusStufe(stufe)
  if (alter >= 12 && (layout === 'bild' || layout === 'gross')) layout = 'jugend'
  const datum = (a.datum || new Date().toISOString()).slice(0, 10)
  // Ziele in Reihenfolge des Auftrags; 'kompetenz:<feld>' bei dünnen Daten (T-M5)
  const codes = a.ziele.length ? a.ziele : a.weg === 'leicht' ? [] : p.ziele.slice().sort((x, y) => x.prio - y.prio).map((z) => z.code)
  const ziele: ZielKontext[] = codes.slice(0, 5).map((code, i) => {
    const pz = p.ziele.find((z) => z.code === code)
    const feld = code.startsWith('kompetenz:') ? (code.slice(10) as Kompetenz) : null
    return { code, prio: PRIO[i] ?? 0.4, quelle: pz?.quelle, seit: pz?.seit, ich: pz?.ich, feld: feld ?? (istEldib(code) ? kompetenzVonCode(code) : null) }
  })
  for (const t of a.thema ?? []) if (t.startsWith('kompetenz:') && !ziele.some((z) => z.code === t)) ziele.push({ code: t, prio: ziele.length ? 0.6 : 1, feld: t.slice(10) as Kompetenz })
  const themen = new Map<string, { w: number; art?: string; datum?: string; gewaehlt?: boolean }>()
  for (const t of p.themen) {
    const tage = tageZwischen(t.datum, datum)
    if (tage < 0 || tage > 60) continue
    const w = tage <= 14 ? 1 : tage <= 30 ? 0.7 : 0.4
    const alt = themen.get(t.key)
    if (!alt || alt.w < w || (alt.w === w && (alt.datum ?? '') < t.datum)) themen.set(t.key, { w, art: t.art, datum: t.datum })
  }
  for (const t of a.thema ?? []) if (!t.startsWith('kompetenz:')) themen.set(t, { w: 1.2, gewaehlt: true })
  // Ganz ohne Ziel und Thema (dünne Daten, keine Wahl): Stunde zum Kennenlernen – Stärken und Vorlieben (T-M5)
  if (!ziele.length && !themen.size && a.weg !== 'leicht') ziele.push({ code: 'kompetenz:selbstbild', prio: 0.6, quelle: 'kennenlernen', feld: 'selbstbild' })
  const gemacht = new Map<string, number>()
  const merke = (id: string, am: string) => {
    const d = tageZwischen(am, datum)
    if (d >= 0 && (!gemacht.has(id) || gemacht.get(id)! > d)) gemacht.set(id, d)
  }
  for (const g of p.gemacht) merke(g.id, g.am)
  for (const plan of verlauf?.plaene ?? [])
    for (const s of plan.sitzungen) {
      if (s.status !== 'gehalten' || !(s.datum || s.rueckmeldung?.am)) continue
      const am = (s.datum || s.rueckmeldung!.am).slice(0, 10)
      for (const x of s.schritte) merke(x.ref, am)
      for (const b of s.blatt?.bausteine ?? []) merke(b.ref, am)
    }
  const heute = a.heute ?? { energie: 4, konzentration: 4, stimmung: 4 }
  const tagesformen = (a.tagesformen?.length ? a.tagesformen : a.tagesform ? [a.tagesform] : []).slice(0, 2)
  const seed = p.seed ?? hash01Seed(p)
  const zq = p.zugang.quelle.find((x) => x.startsWith('test:'))
  return {
    k, p, a, v, weg: a.weg, alter, stufe, layout, sprache: a.sprache ?? p.sprache.blatt, heute, datum, ziele, themen, gemacht,
    vorsicht: new Set(p.vorsicht), hilft: new Set(p.hilft ?? []), heikelFrei: new Set(a.heikel ?? []), tagesformen,
    prior: kaltstart(p), ohneKind: p.lernen === false || !v.kind, seed, erkundung: v.ich.erkundung ?? 0.2,
    zugangText: zq ? zugangBeschreibung(p) : null,
    cache: { pruef: new Map(), v: new Map(), ziel: new Map() },
  }
}

function hash01Seed(p: Profil): string {
  // ohne Hub-Seed: aus abgeleiteten Merkmalen (stabil über Sitzungen, ohne ref und Datum – T-M7)
  return `${p.alterJahre}|${p.sprache.blatt}|${p.ziele.map((z) => z.code).join(',')}|${p.interessen.join(',')}`
}

function kompetenzVonCode(code: string): Kompetenz | null {
  return istEldib(code) ? kompetenzAusCode(code) : null
}

function zugangBeschreibung(p: Profil): string {
  const l = ['kaum Text', 'wenig Text', 'mittlere Textmenge', 'viel Text'][p.zugang.lesen]
  const b = p.zugang.bild >= 2 ? ', viele Bilder' : ''
  return `${l}${b}`
}

// ---------------------------------------------------------------------------------------------------------------------
// Harte Regeln (5.2)
// ---------------------------------------------------------------------------------------------------------------------

/** Material, das nicht jede Einrichtung hat – nur in Weg 1 (5.2, P S11). */
const NICHT_STANDARD = new Set(['beamer', 'ipad', 'matten', 'schwungtuch', 'kueche', 'lochzange', 'wolle', 'klangschale'])

export interface Pruefung {
  /** 0 streng · 1 Nachbarphase · 2 Ziel ±2 · 3 Sperrfrist halbiert · 4 wie 3 (Gruppenschritte ohne Einzelvariante sind seit der Beschriftung hart ausgeschlossen) */
  locker?: number
  /** Ids, die in dieser Folge schon vorkommen (Alternativen, Tausch) */
  gesperrt?: Set<string>
  /** Prüfung für das Blatt des Kindes */
  blatt?: boolean
  /** Ritual (Sperrfrist gilt nicht) */
  ritual?: boolean
  /** Rolle des Slots (mehrtägig nur Transfer) */
  rolle?: Rolle
  /** Ids der Schritte, die vorher in der Folge vorkamen (Voraussetzungen) */
  vorher?: Set<string>
}

/** Ist ein Eintrag für dieses Kind und diesen Auftrag erlaubt? null = ja, sonst der Grund. */
export function pruefe(e: KatalogEintrag, c: Kontext, o: Pruefung = {}): string | null {
  const locker = o.locker ?? 0
  const i = (locker >= 4 ? 2 : locker >= 3 ? 1 : 0) * 12 + (o.blatt ? 6 : 0) + (o.ritual ? 3 : 0) + (!o.rolle ? 0 : o.rolle === 'transfer' ? 1 : 2)
  let fach = c.cache.pruef.get(e)
  if (!fach) c.cache.pruef.set(e, (fach = []))
  let r = fach[i]
  if (r === undefined) r = fach[i] = pruefeBasis(e, c, o)
  if (r !== null) return r
  // was von der Folge abhängt, nicht zwischenspeichern
  const vo = e.typ === 'schritt' ? e.voraussetzungen : undefined
  if (vo?.schritt?.length && !vo.schritt.some((x) => o.vorher?.has(x))) return 'Brücke ohne letzte Stunde'
  if (o.gesperrt?.has(e.id)) return 'schon in der Folge'
  return null
}

/** Krisenlage (A12): Stimmung ≤ 2, Vorsicht Trauma oder Trauer, Weg 3 mit belastender Tagesform – keine Gefühle abfragen. */
/** Themen, die eine Übung nur trägt, wenn das Kind sie hat (nicht allgemein wie Gefühle, Selbstwert, Lernen). */
const BESONDERE_THEMEN = new Set(['angst', 'schlaf', 'medien', 'mobbing', 'traurig', 'familie', 'gewalt'])

export function krisenlage(c: Kontext): boolean {
  return c.heute.stimmung <= 2 || c.vorsicht.has('trauma') || c.vorsicht.has('trauer') ||
    (c.weg === 'leicht' && c.tagesformen.some((t) => t === 'traurig' || t === 'aengstlich' || t === 'rueckzug' || t === 'aufgewuehlt' || t === 'wuetend'))
}

function pruefeBasis(e: KatalogEintrag, c: Kontext, o: Pruefung): string | null {
  const locker = o.locker ?? 0
  // Alter und Gestaltung – nie gelockert
  if (stufenAbstand(c.stufe, e.stufen) >= 2) return 'Stufe'
  if (c.alter < e.alter.von - 1 || c.alter > e.alter.bis + 1) return 'Alter'
  if (c.alter >= 10 && e.stufen.every((s) => s === 'C1' || s === 'C2')) return 'für Jüngere'
  // Nachfahren, Punkte verbinden, Fädeln, Anziehpuppe: Vorschul-Formate, nicht ab 10 (A10: „Linien nachfahren“ mit 12)
  if (c.alter >= 10 && e.typ === 'baustein' && e.art.some((a) => a === 'laufweg' || a === 'punkte_verbinden' || a === 'faedelkarte' || a === 'anziehpuppe' || a === 'klappbild')) return 'für Jüngere'
  if (e.typ === 'baustein') {
    if (e.zielgruppe === 'fachkraft' || e.zielgruppe === 'eltern') return 'für Erwachsene'
    if (e.material.includes('film')) return 'braucht einen Film'
    if (e.material.includes('vorher')) return 'braucht eine Übung davor'
    if (c.alter >= 12 && e.art.includes('rueckblick')) return 'Smileys'
  }
  // Spielschule (Vorschule) nur für die, für die sie gemacht ist (A10: kein Spielschul-Blatt über 5 Jahren)
  if (e.typ === 'baustein' && c.alter > 5 && intern(c.k).q.blatt.get(e.quelle.blatt)?.bereich === 'spielschule') return 'Spielschule'
  if (e.typ === 'schritt' && c.alter > 6 && e.quelle.art === 'spielschule') return 'Spielschule'
  // französisches Kind: Schritte ohne französischen Text erst, wenn gar nichts anderes passt (letzte Stufe; Blind-Bewertung
  // 9.10.: deutsche Kerne auf französischen Planblättern waren der häufigste Mangel bei Jugendlichen)
  if (c.sprache === 'fr' && e.typ === 'schritt' && !e.fr && !e.id.startsWith('pg:') && locker < 4) return 'nur auf Deutsch'
  // setzt eine frühere Kursstunde voraus („der Umschlag aus der letzten Stunde“, „nach der Wochen-Mission fragen“)
  if (e.typ === 'schritt' && intern(c.k).vorlauf.has(e.id)) return 'braucht eine Stunde davor'
  // Textmerkmale (Blind-Bewertung 9.10., einzel.ts): was gedruckt wird, muss in eine Einzelstunde für dieses Kind passen
  const tm = merkmaleVon(c.k, e)
  if (tm.size) {
    const einzeln = c.a.sozialform === 'einzeln' || !c.a.sozialform
    const eigen = e.id.startsWith('pg:')
    const kinderschutz = (c.p.achtung ?? []).includes('kinderschutz')
    if (einzeln && !eigen && (tm.has('gruppe') || tm.has('ihr'))) return 'Gruppe'
    if (tm.has('jugend') && c.alter < 12) return 'für Jugendliche'
    if (tm.has('aelter') && c.alter < 13) return 'für Ältere'
    // belastende Sätze („Ich bin dumm“, „Keiner mag mich“) nicht in Krisenlage
    if (tm.has('belastend') && krisenlage(c)) return 'belastend'
    if (tm.has('film')) return 'braucht einen Film'
    if (tm.has('draussen') && !(c.a.ort ?? []).includes('draussen')) return 'Ort'
    if (tm.has('kueche')) return 'Küche'
    if (tm.has('gaeste')) return 'Gäste'
    if (tm.has('blattverweis') && e.typ === 'schritt') return 'Blatt der Quelle'
    if (tm.has('fuerleitung')) return 'für Erwachsene'
    if (tm.has('rueckbezug') && /^(k|f|m|c):/.test(e.id)) return 'braucht eine Stunde davor'
    if (tm.has('geraet') && locker < 3) return 'braucht ein Tablet'
    if (tm.has('kuerzel')) return 'Platzhalter'
    if (tm.has('aktivierend') && c.heute.energie >= 4) return 'Energie'
    if (tm.has('wochentage') && e.typ === 'baustein') return 'mehrtägig'
    if (tm.has('mehrtag') && ((o.rolle !== 'transfer' || o.blatt) || c.vorsicht.has('familie') || kinderschutz)) return 'mehrtägig'
    if (tm.has('heikel') && !c.heikelFrei.size) return 'heikel'
    if (tm.has('wutausleben')) return 'Katharsis'
    if (tm.has('trauer') && c.vorsicht.has('trauer')) return 'Vorsicht Trauer'
    if (tm.has('familie') && (c.vorsicht.has('familie') || kinderschutz)) return 'Vorsicht Familie'
    if (tm.has('koerper') && c.vorsicht.has('koerper')) return 'Vorsicht Körper'
    if (tm.has('mobbing') && (c.vorsicht.has('trauma') || c.vorsicht.has('heikel'))) return 'Vorsicht Trauma'
    if (tm.has('belastend') && (c.vorsicht.has('heikel') || c.vorsicht.has('trauma') || (c.p.achtung ?? []).length)) return 'belastend'
    if (tm.has('gefuehlfrage') && krisenlage(c)) return 'Gefühle abfragen'
    // Blind-Bewertung 5: ein Abruftest („gegenseitig abfragen“) bei Stimmung 2 und Prüfungsangst ist Leistungsmessung
    if (tm.has('leistung') && krisenlage(c)) return 'Leistungsprobe in Krisenlage'
    // … und Wachsmalkreiden, Löffel-Parcours, Flamingo-Statue, Kuscheltier wirken bei Jugendlichen kindlich
    if (!eigen && tm.has('kindlich') && c.alter >= 12) return 'kindlich'
    if (tm.has('sorgen') && krisenlage(c)) return 'Gefühle abfragen'
  }
  // Krisenlage: auf dem Blatt keine Skala, kein Check-in, kein Rückblick zu Gefühl oder Stimmung (A12)
  if (krisenlage(c) && e.typ === 'baustein' && e.art.some((a) => a === 'skala' || a === 'checkin' || a === 'rueckblick' || a === 'thermometer') && (e.kompetenz.some((x) => x.startsWith('gefuehle')) || e.thema.some((t) => t === 'gefuehle' || t === 'traurig' || t === 'angst' || t === 'wut'))) return 'Gefühle abfragen'
  // Krisenlage: kein Wut-Material, wenn Wut beim Kind gar kein Thema ist (Wutvulkan bei Trauer)
  if (krisenlage(c) && e.thema.includes('wut') && !c.themen.has('wut') && !c.ziele.some((z) => z.feld === 'impulskontrolle' || z.feld === 'selbstregulation')) return 'fremdes Thema'
  // Krisenlage: kein Gespräch über Gefühle oder Belastendes (A12) – auch ohne die Wörter oben
  if (krisenlage(c) && e.typ === 'schritt' && e.format[0] === 'gespraech' && (e.belastung >= 1 || e.kompetenz.some((x) => x.startsWith('gefuehle')))) return 'Gefühle abfragen'
  // Stimmung ≤ 2: nichts Lautes, keine Vollgas-Aktivität (A5)
  if (c.heute.stimmung <= 2 && (e.energie === 3 || e.merkmale?.laut)) return 'Stimmung'
  // heikel nur freigeschaltet; Selbstverletzung/Suizid nie als Baustein (T-M1)
  if (e.sensibel === 'akut') return 'heikel'
  if (e.sensibel === 'kinderschutz' && !c.heikelFrei.has('kinderschutz') && !c.heikelFrei.has('sexualitaet')) return 'heikel'
  // heikle Themen auch ohne `sensibel` (Beschriftung: 78 Einträge mit Thema „sexualitaet“) nur ausdrücklich freigeschaltet
  if (e.thema.includes('sexualitaet') && !c.heikelFrei.has('sexualitaet') && !c.heikelFrei.has('kinderschutz')) return 'heikel'
  if ((e.thema.includes('suizid') || e.thema.includes('kinderschutz')) && !c.heikelFrei.has('suizid') && !c.heikelFrei.has('kinderschutz')) return 'heikel'
  if (e.sensibel === 'familie' && (c.vorsicht.has('familie') || c.vorsicht.has('trauer'))) return 'Vorsicht Familie'
  if (e.sensibel === 'koerper' && (c.vorsicht.has('koerper') || c.vorsicht.has('trauma'))) return 'Vorsicht Körper'
  // Vorsicht (3.3, P9, E-M2)
  if (c.vorsicht.has('familie') && e.belastung >= 2 && e.thema.includes('familie')) return 'Vorsicht Familie'
  if (c.vorsicht.has('trauer') && e.belastung >= 2 && (e.thema.includes('familie') || e.thema.includes('traurig'))) return 'Vorsicht Trauer'
  if (c.vorsicht.has('heikel') && e.belastung >= 1) return 'Vorsicht'
  const m = e.merkmale
  if (m?.katharsis) return 'Katharsis'
  if ((c.vorsicht.has('reiz') || c.hilft.has('reizarm')) && (m?.laut || (e.typ === 'schritt' && e.reiz >= 2))) return 'zu laut'
  if (c.vorsicht.has('reiz') && m?.wettbewerb) return 'Wettbewerb'
  if (c.vorsicht.has('trauma') && (m?.gewaltbezug || m?.koerperkontakt || e.belastung >= 2)) return 'Vorsicht Trauma'
  // Tagesform (5.2, P9)
  if (c.heute.stimmung <= 2 && (e.belastung >= 2 || m?.wettbewerb)) return 'Stimmung'
  if (c.heute.energie <= 2 && e.energie === 3 && e.dauer.min > 3) return 'Energie'
  if (c.weg === 'leicht') {
    if (!e.ohneZiel) return 'mit Förderziel'
    if (m?.wettbewerb && c.tagesformen.some((t) => t === 'wuetend' || t === 'aufgewuehlt' || t === 'aufgedreht' || t === 'aengstlich')) return 'Wettbewerb'
    if (e.format[0] === 'gespraech' && c.tagesformen.some((t) => t === 'traurig' || t === 'rueckzug')) return 'kein Gespräch'
  }
  // Sozialform (Einzelstunde)
  if (c.a.sozialform === 'einzeln' || !c.a.sozialform) {
    if (e.einzeltauglich === 'nein') return 'nur Gruppe'
    // seit der Beschriftung hart: ein Gruppenschritt kommt nur mit beschriebener Einzelvariante in eine Einzelstunde
    if (e.einzeltauglich === 'angepasst' && !(e.typ === 'schritt' && e.einzelvariante)) return 'Gruppe (ohne Einzelvariante)'
  }
  // Blatt des Kindes in einer Sprache (Testlauf 9.10., A6): auf einem französischen Blatt kein Teil mit deutschem Text –
  // Schritte für die Fachkraft dürfen deutsch sein (Hinweis „nur auf Deutsch“)
  if (o.blatt && e.typ === 'baustein' && c.sprache === 'fr' && !e.sprache.fr && e.textfelder.length) return 'nur auf Deutsch'
  // Zugang (P4): Lesemenge ≤ Kind (vorlesbar: + 1), Schreibmenge ≤ Kind
  if (e.typ === 'baustein') {
    const lesen = c.p.zugang.lesen + (intern(c.k).vorlesbar.has(e.id) ? 1 : 0)
    if (e.lesemenge > lesen) return 'zu viel Text'
    if (e.schreibmenge > c.p.zugang.schreiben) return 'zu viel Schreiben'
    if (c.p.zugang.tempo === 'ruhig' && e.dauer.min > 12) return 'zu lang'
  }
  // mehrtägig nur als Transfer (P1)
  if (e.mehrtaegig && o.rolle && o.rolle !== 'transfer' && !o.blatt) return 'mehrtägig'
  // Voraussetzungen
  const vo = e.typ === 'schritt' ? e.voraussetzungen : undefined
  if (vo?.eldib?.some((x) => !c.p.erreicht.includes(x) && !c.ziele.some((z) => z.code === x))) return 'Voraussetzung'
  // Ort und Material
  if (e.typ === 'schritt' && e.ort && e.ort !== 'raum' && !(c.a.ort ?? []).includes(e.ort)) return 'Ort'
  if (c.weg !== 'gruendlich' && e.material.some((x) => NICHT_STANDARD.has(x))) return 'Material'
  // schon gemacht
  if (!o.ritual) {
    const f = locker >= 3 ? 0.5 : 1
    const tage = gemachtVor(e, c)
    if (tage !== null) {
      // Blatt-Teile 6 Wochen (auch Mitmach-Seiten aus einem gemachten Blatt), leichte Schritte 1 Woche, CREW 2, sonst 4
      const frist = e.typ === 'baustein' ? 42 : e.ohneZiel ? 7 : e.id.startsWith('c:') ? 14 : 28
      if (tage < frist * f) return 'schon gemacht'
    }
  }
  return null
}

export function gemachtVor(e: KatalogEintrag, c: Kontext): number | null {
  // eigene Schritte des Kerns (Platz des Blatts, Pause, „einfach da sein“) sind nie „schon gemacht“
  if (e.id.startsWith('pg:')) return null
  const ids = e.typ === 'baustein' ? [`blatt:${e.quelle.blatt}`, e.id] : e.id.startsWith('m:') ? [e.id, `material:${e.id.split(':')[1]}`] : e.id.startsWith('c:') ? [e.id, `crew:${e.id.slice(2)}`] : [e.id]
  let best: number | null = null
  for (const id of ids) {
    const t = c.gemacht.get(id)
    if (t !== undefined && (best === null || t < best)) best = t
  }
  return best
}

const GRUPPE_RE = /\b(jedes Kind|alle Kinder|die Kinder (bilden|stellen|sitzen|gehen|setzen)|in (Klein)?gruppen|Kleingruppen?|paarweise|Teams?|reihum|im (Sitz|Stuhl)?kreis|die Klasse|der Klasse|im Plenum|jede Gruppe|jede:r|alle Schüler(innen)?|die ganze Gruppe)\b/i
const GRUPPE = new WeakMap<KatalogEintrag, boolean>()
/** Erzählt der Text des Schritts von einer Gruppe? (zwischengespeichert) */
function gruppenSprache(e: KatalogEintrag & { typ: 'schritt' }): boolean {
  let g = GRUPPE.get(e)
  if (g === undefined) GRUPPE.set(e, (g = GRUPPE_RE.test(`${e.titel} ${e.text}`)))
  return g
}

// ---------------------------------------------------------------------------------------------------------------------
// Bewertung (5.3)
// ---------------------------------------------------------------------------------------------------------------------

export const NACHBAR: Record<Bogen, Bogen[]> = {
  wahrnehmen: ['verstehen'],
  verstehen: ['wahrnehmen', 'ueben'],
  ueben: ['verstehen', 'uebertragen'],
  uebertragen: ['ueben', 'reflektieren'],
  reflektieren: ['uebertragen'],
}

export interface Bewertet {
  e: KatalogEintrag
  f: Record<string, number>
  g: number
  vorliebe: number
  s: number
  /** Ziel, das den Zielwert trägt */
  ziel?: ZielKontext
  zielArt?: 'primaer' | 'sekundaer' | 'bereich' | 'feld'
}

export interface BewertungsOpt {
  phase?: Bogen | 'leicht'
  /** Formate, die in der Stunde schon vorkommen */
  formate?: Set<string>
  /** Format des Kerns der vorigen Sitzung */
  vorigerKern?: string
  /** Ziel-Prioritäten für diesen Slot (Fokus der Sitzung) */
  fokus?: Map<string, number>
  locker?: number
  /** Zusatz (Kohärenz Kern ↔ Blatt) */
  bonus?: number
}

const interessenCache = new WeakMap<KatalogEintrag, Set<string>>()
function interessenVon(e: KatalogEintrag): Set<string> {
  let s = interessenCache.get(e)
  if (s) return s
  s = new Set()
  if (e.typ === 'schritt') {
    const t = norm(`${e.titel} ${e.text}`)
    for (const [k, i] of Object.entries(INTERESSEN)) if (i.woerter.some((w) => t.includes(w))) s.add(k)
  }
  interessenCache.set(e, s)
  return s
}

function zielWert(e: KatalogEintrag, c: Kontext, o: BewertungsOpt): { w: number; ziel?: ZielKontext; art?: Bewertet['zielArt'] } {
  let best = { w: 0 } as { w: number; ziel?: ZielKontext; art?: Bewertet['zielArt'] }
  const weit = (o.locker ?? 0) >= 2
  for (const z of c.ziele) {
    const pr = o.fokus?.get(z.code) ?? z.prio
    if (z.code.startsWith('kompetenz:')) {
      if (z.feld && e.kompetenz.includes(z.feld) && 0.7 * pr > best.w) best = { w: 0.7 * pr, ziel: z, art: 'feld' }
      continue
    }
    const [d] = z.code.split('-')
    const sZ = eldibStufe(c.k, z.code)
    for (const eb of e.eldib) {
      if (eb.code === z.code) {
        const w = (eb.gewicht === 1 ? 1 : 0.5) * pr
        if (w > best.w) best = { w, ziel: z, art: eb.gewicht === 1 ? 'primaer' : 'sekundaer' }
      } else if (eb.code.split('-')[0] === d) {
        const ds = Math.abs(eldibStufe(c.k, eb.code) - sZ)
        const w = (ds <= 1 ? 0.25 : weit && ds <= 2 ? 0.15 : 0) * pr
        if (w > best.w) best = { w, ziel: z, art: 'bereich' }
      }
    }
    if (z.feld && e.kompetenz.includes(z.feld) && 0.2 * pr > best.w) best = { w: 0.2 * pr, ziel: z, art: 'feld' }
  }
  return best
}

function themaWert(e: KatalogEintrag, c: Kontext): number {
  let w = 0
  for (const t of e.thema) w = Math.max(w, Math.min(1, c.themen.get(t)?.w ?? 0))
  // hat das Kind Themen und der Eintrag ein ganz anderes (Trennung, Verliebtsein …), etwas weniger
  if (!w && c.themen.size && e.thema.length && !e.thema.some((t) => ALLGEMEINE_THEMEN.has(t))) w = -0.25
  return w
}

/** Themen, die zu fast allem passen – kein „fremdes Thema“ */
const ALLGEMEINE_THEMEN = new Set(['gefuehle', 'selbstwert', 'regeln'])

function tagesformWert(e: KatalogEintrag, c: Kontext): number {
  if (c.weg === 'leicht') {
    const tf = c.tagesformen
    if (!tf.length) return e.energie <= 2 ? 0.8 : 0.6
    let w = 0.3
    const eigen = e.typ === 'schritt' ? (e.tagesform ?? []) : []
    if (tf.some((t) => eigen.includes(t))) w = 1
    else if (tf.some((t) => e.format.some((f) => TAGESFORM_FORMATE[t]?.includes(f)))) w = 0.8
    if (tf.some((t) => t === 'aufgedreht' || t === 'wuetend' || t === 'aufgewuehlt') && e.energie === 3) w = Math.min(1, w + 0.2)
    if (tf.some((t) => t === 'muede' || t === 'traurig' || t === 'rueckzug') && e.energie === 3) w -= 0.3
    return Math.max(0, w)
  }
  const h = c.heute
  let w = 1
  if (h.energie >= 6) w = 1 - Math.abs(3 - e.energie) / 3
  else if (h.energie <= 2) w = 1 - Math.abs(1 - e.energie) / 2.5
  else if (e.energie === 3) w = 0.8
  if (h.konzentration <= 3 && e.dauer.typ > 8) w *= 0.5
  if (h.konzentration >= 6 && e.dauer.typ >= 10) w = Math.min(1, w + 0.1)
  if (h.stimmung <= 2) {
    if (e.belastung >= 1) w *= 0.6
    if (e.format.includes('spiel')) w = Math.min(1, w + 0.25)
  }
  return Math.max(0, w)
}

function zugangWert(e: KatalogEintrag, c: Kontext): number {
  if (e.typ !== 'baustein') return 1
  const z = c.p.zugang
  return Math.max(0, 1 - (Math.abs(e.lesemenge - z.lesen) + Math.abs(e.schreibmenge - z.schreiben) + Math.max(0, z.bild - e.bildanteil)) / 6)
}

/** Formate-Wunsch (2.3 Block 4) – zählt zum Deckel der Vorlieben (E-S3e). */
function wunschWert(e: KatalogEintrag, c: Kontext): number {
  const w = c.a.formate ?? []
  if (!w.length) return 0
  let v = 0
  const f = new Set(e.format)
  if (w.includes('bewegung') && f.has('bewegung')) v += 0.5
  if (w.includes('kreativ') && (f.has('malen') || f.has('basteln') || f.has('musik'))) v += 0.5
  if (w.includes('gespraech') && f.has('gespraech')) v += 0.5
  if (w.includes('spiel') && (f.has('spiel') || f.has('rollenspiel'))) v += 0.5
  if (w.includes('wenig-schreiben') && (f.has('schreiben') || (e.typ === 'baustein' && e.schreibmenge >= 2))) v -= 0.7
  return Math.max(-1, Math.min(1, v))
}

export function bewerte(e: KatalogEintrag, c: Kontext, o: BewertungsOpt = {}): Bewertet {
  const leicht = c.weg === 'leicht'
  const W = leicht ? GEWICHTE_LEICHT : GEWICHTE_V1
  let z: ReturnType<typeof zielWert> | undefined = { w: 0 }
  if (!leicht) {
    if (o.fokus) z = zielWert(e, c, o)
    else {
      const i = (o.locker ?? 0) >= 2 ? 1 : 0
      let fach = c.cache.ziel.get(e)
      if (!fach) c.cache.ziel.set(e, (fach = []))
      z = fach[i] ??= zielWert(e, c, o)
    }
  }
  const phase = o.phase && o.phase !== 'leicht' ? o.phase : null
  const f: Record<string, number> = {
    ziel: z.w,
    phase: !phase ? 0.5 : !e.typ || (e.typ === 'schritt' && !e.bogen) ? 0.5 : e.bogen === phase ? 1 : NACHBAR[phase].includes(e.bogen!) ? 0.35 : 0,
    zugang: zugangWert(e, c),
    thema: themaWert(e, c),
    tagesform: tagesformWert(e, c),
    abwechslung: o.formate && e.format.some((x) => o.formate!.has(x)) ? 0.4 : o.vorigerKern && e.format[0] === o.vorigerKern ? 0.6 : 1,
    qualitaet: e.qualitaet === 'geprueft' ? 1 : 0.5,
    interesse: c.p.interessen.some((i) => interessenVon(e).has(i)) || (e.typ === 'baustein' && (e.platzhalter ?? []).includes('INTERESSE')) ? 1 : 0,
  }
  let g = 0
  for (const k of Object.keys(W)) g += W[k] * (f[k] ?? 0)
  g += o.bonus ?? 0
  // Französisch: Blatt-Teile ohne FR zählen weniger (T-M4)
  if (c.sprache === 'fr' && e.typ === 'baustein' && !e.sprache.fr && e.lesemenge > 0) g *= 0.7
  // Material mit mehreren Teilen: spätere Teile setzen oft voraus, was im ersten entstand („seine Treppe“, „das Barometer“)
  // – als Kern zählt der erste Teil mehr (Blind-Bewertung 9.10.)
  if (e.typ === 'schritt' && e.id.startsWith('m:') && e.rolle.includes('kern')) {
    const t = e.id.split(':')
    const erst = intern(c.k).ersterKern.get(`${t[0]}:${t[1]}`)
    if (erst !== undefined && Number(t[2]) > erst) g *= 0.82
  }
  // Schritte für ein französisches Kind: mit französischem Text klar bevorzugt (Blind-Bewertung 9.10.: deutsche Sagen-Sätze
  // und Kerne auf französischen Planblättern); ohne FR nur, wenn nichts Französisches passt
  if (c.sprache === 'fr' && e.typ === 'schritt' && !e.fr && !e.id.startsWith('pg:')) g *= 0.15
  // braucht ein Tablet (CREW-Spiele, Laptop): nur, wenn nichts ohne Gerät gleich gut passt (dritte Blind-Bewertung)
  if (merkmaleVon(c.k, e).has('geraet')) g *= 0.5
  // Jugendliche (dritte Blind-Bewertung: 5–8 % der Jugend-Stunden „so haltbar“, fast alle Mängel in Bruchstücken aus Gruppen-
  // und Klassenstunden): die Einzelübungen für Jugendliche (j:, inhalte/jugend.json) klar zuerst; Kurs, Förderfach, Material
  // und CREW ohne Einzelvariante nur, wenn nichts anderes passt
  if (c.alter >= 12 && e.typ === 'schritt') {
    if (e.id.startsWith('j:')) {
      g *= 2.2
      // eine Übung zu einem besonderen Thema (Prüfungsangst, Schlaf, Social Media …) nur, wenn das Kind dieses Thema hat
      // (Blind-Bewertung 5: „Prüfungssorgen, die nicht im Profil stehen“)
      if (e.thema[0] && BESONDERE_THEMEN.has(e.thema[0]) && !c.themen.has(e.thema[0])) g *= 0.25
    }
    else if (/^(k|f|m|c):/.test(e.id)) g *= e.einzelvariante ? 0.5 : 0.35
  }
  // Einzelstunde: Schritte, die nur für Gruppen beschrieben sind (ohne Einzelvariante), zählen weniger – die Beschriftung
  // nennt 1290 solcher Schritte „einzeltauglich“; im Zweifel gewinnt, was für ein Kind geschrieben ist (Testlauf 9.10.)
  if ((c.a.sozialform === 'einzeln' || !c.a.sozialform) && e.typ === 'schritt' && !e.einzelvariante && !e.sozialform.some((x) => x === 'einzeln' || x === 'zu-zweit')) g *= 0.8
  // noch nicht beschriftete Schritte (Material, Phase 0), die von einer Gruppe erzählen („Jedes Kind …“, „im Sitzkreis“):
  // im Zweifel gewinnt, was für die Einzelstunde geprüft ist (Testlauf 9.10.: „Meine Sorge in die Box“ mit vier Jahren)
  if ((c.a.sozialform === 'einzeln' || !c.a.sozialform) && e.typ === 'schritt' && !e.einzelvariante && (e.sicher.einzeltauglich ?? 1) < 0.7 && gruppenSprache(e)) g *= 0.7
  const deckel = leicht ? 0.4 : 0.3
  let vRoh = c.cache.v.get(e)
  if (vRoh === undefined) {
    vRoh = V(e, c.v, c.datum, c.prior, c.ohneKind) + wunschWert(e, c)
    c.cache.v.set(e, vRoh)
  }
  const vorl = Math.max(-1, Math.min(1, vRoh))
  return { e, f, g, vorliebe: vorl, s: g * (1 + deckel * vorl), ziel: z.ziel, zielArt: z.art }
}

/** Gleichstand: fester Wert aus (Seed, Plan, Sitzung, Slot, Id) – kein Datum, kein ref (T-M7). */
export function rang(a: Bewertet, b: Bewertet, salz: string): number {
  return b.s - a.s || hash01(salz + '|' + a.e.id) - hash01(salz + '|' + b.e.id)
}

// ---------------------------------------------------------------------------------------------------------------------
// Begründungen (5.9) – höchstens zwei, ohne Testwerte
// ---------------------------------------------------------------------------------------------------------------------

function datumKurz(iso?: string): string {
  if (!iso) return ''
  const [, m, d] = iso.slice(0, 10).split('-')
  return `${Number(d)}.${Number(m)}.`
}

const ZIEL_QUELLE: Record<string, string> = { pei: 'Förderziel aus dem PEI', eldib: 'ELDiB-Förderziel', vorgemerkt: 'vorgemerkt für das nächste PEI', andere: 'weiteres Ziel' }
const THEMA_ART: Record<string, string> = { vorfall: 'Vorfall am', notiz: 'Notiz vom', beobachtung: 'Beobachtung vom', gespraech: 'Gespräch am', reunion: 'Réunion am', screening: 'Screening vom', klassenbuch: 'Klassenbuch,' }

export function zielText(c: Kontext, z: ZielKontext, vermutet: boolean): string {
  if (z.quelle === 'kennenlernen') return 'Zum Kennenlernen: was das Kind mag und gut kann (noch kein Ziel)'
  if (z.code.startsWith('kompetenz:')) return `Schwerpunkt ${KOMPETENZ_NAME[z.feld!]?.de ?? z.feld} – heute gewählt`
  const q = z.quelle ? ZIEL_QUELLE[z.quelle] : 'Ziel der Stunde'
  return `Zu ${z.code} ${eldibKurz(c.k, z.code)}${vermutet ? ' (Zuordnung vermutet)' : ''} – ${q}${z.seit ? ` (${datumKurz(z.seit)})` : ''}`
}

export interface WarumOpt {
  phase?: Bogen | 'leicht'
  nr?: number
  erkundung?: boolean
  ritual?: boolean
  locker?: string
  rolle?: Rolle
}

export function warum(b: Bewertet, c: Kontext, o: WarumOpt = {}): string[] {
  const l: { v: number; t: string }[] = []
  const e = b.e
  const W = c.weg === 'leicht' ? GEWICHTE_LEICHT : GEWICHTE_V1
  const name = c.p.vorname ?? 'dem Kind'
  if (o.ritual) l.push({ v: 9, t: c.weg === 'leicht' ? 'Ritual, das nichts verlangt – ohne Druck' : 'Ritual – bleibt in der Folge gleich (Sicherheit, Vorhersehbarkeit)' })
  if (o.erkundung) l.push({ v: 8, t: 'Neu ausprobiert – mal etwas anderes als sonst' })
  if (o.locker) l.push({ v: 7, t: o.locker })
  if (b.ziel && b.f.ziel >= 0.2) {
    const vermutet = (e.sicher.eldib ?? 1) < 0.7 || e.qualitaet === 'entwurf' || b.zielArt === 'bereich'
    const t = b.zielArt === 'bereich' ? `Ähnliches Ziel wie ${b.ziel.code} ${eldibKurz(c.k, b.ziel.code)} (gleicher Bereich)` : zielText(c, b.ziel, vermutet)
    l.push({ v: W.ziel * b.f.ziel, t })
  }
  if (b.f.thema > 0) {
    const key = e.thema.find((x) => c.themen.has(x))
    const th = key ? c.themen.get(key) : undefined
    if (key && th) {
      const name2 = themaByKey.get(key)?.name ?? key
      const herkunft = th.gewaehlt ? 'heute gewählt' : th.art ? `${THEMA_ART[th.art] ?? ''} ${datumKurz(th.datum)}`.trim() : ''
      l.push({ v: W.thema * b.f.thema + 0.02, t: `Thema ${name2}${herkunft ? ' – ' + herkunft : ''}` })
    }
  }
  if (o.phase && o.phase !== 'leicht' && b.f.phase === 1 && o.nr) {
    const P: Record<string, string> = { wahrnehmen: 'wahrnehmen', verstehen: 'verstehen', ueben: 'üben', uebertragen: 'in den Alltag übertragen', reflektieren: 'zurückschauen und feiern' }
    l.push({ v: W.phase * 0.6, t: `Sitzung ${o.nr}: ${P[o.phase]}` })
  }
  if (c.weg === 'leicht' && b.f.tagesform >= 0.8 && c.tagesformen.length) l.push({ v: 0.4, t: `passt, wenn ${name} heute ${c.tagesformen.map((t) => TAGESFORM_NAME[t]).join(' und ')} ist` })
  if (c.weg !== 'leicht') {
    if (c.heute.energie >= 6 && e.energie === 3) l.push({ v: 0.2, t: 'heute viel Energie: erst bewegen, dann denken' })
    if (c.heute.energie <= 2 && e.energie === 1) l.push({ v: 0.15, t: `heute wenig Energie: ruhig im Sitzen, ${e.dauer.typ} Minuten` })
    if (c.heute.konzentration <= 3 && e.dauer.typ <= 8) l.push({ v: 0.12, t: 'heute kurze Teile' })
  }
  if (e.typ === 'baustein' && b.f.zugang >= 0.83 && c.zugangText) l.push({ v: 0.1, t: c.zugangText })
  if (b.f.interesse) {
    const i = c.p.interessen.find((x) => interessenVon(e).has(x))
    if (i) l.push({ v: 0.12, t: `mit ${INTERESSEN[i]?.de ?? i}-Beispiel (Interesse)` })
  }
  // Vorlieben: Kind vor Fachkraft vor Team
  if (!c.ohneKind) {
    let best: { f: string; p: number; a: number; b: number } | null = null
    for (const f of e.format) {
      const x = vorliebe(c.v, 'kind', `format:${f}`, c.datum, c.prior)
      if (x.p > 0.2 && x.a + x.b >= 3 && (!best || x.p > best.p)) best = { f, p: x.p, a: x.a, b: x.b }
    }
    if (best) l.push({ v: 0.14 + best.p * 0.1, t: `${FORMAT_NAME[best.f] ?? best.f} klappt bei ${name} oft (${Math.round(best.a)} von ${Math.round(best.a + best.b)})` })
  }
  for (const f of e.format) {
    const x = vorliebe(c.v, 'ich', `format:${f}`, c.datum)
    if (x.p > 0.3) {
      l.push({ v: 0.1, t: `du nimmst oft ${FORMAT_NAME[f] ?? f}` })
      break
    }
  }
  const t = c.v.team && c.v.team.personen >= 3 ? c.v.team.z[`baustein:${e.id}`] : undefined
  if (t && t.n >= 3) {
    const r = t.geklappt + t.teils + t.nicht
    l.push({ v: 0.09, t: r >= 10 ? `im Team beliebt: ${t.n}× genutzt, ${Math.round((100 * t.geklappt) / Math.max(1, r))} % hat geklappt` : `im Team genutzt: ${t.n}×, ${t.geklappt} von ${r} als gelungen angegeben` })
  }
  if (e.typ === 'schritt' && e.einzeltauglich === 'angepasst' && !e.einzelvariante) l.push({ v: 6, t: 'Gruppenaktivität – so mit einem Kind machen' })
  if (!l.length && e.ohneZiel) l.push({ v: 0.1, t: 'leicht und ohne Förderziel – für die Beziehung' })
  if (!l.length && o.rolle === 'bewegung') l.push({ v: 0.05, t: 'Bewegung zwischendurch' })
  if (!l.length && o.rolle === 'regulation') l.push({ v: 0.05, t: 'zur Ruhe kommen' })
  if (!l.length) l.push({ v: 0.01, t: `passt zu Alter und Zugang von ${name}` })
  if (o.ritual) return [l[0].t]
  l.sort((a, b) => b.v - a.v)
  return [...new Set(l.map((x) => x.t))].slice(0, 2)
}
