// Passgenau – Katalog, Phase 0 (Konzept 4.2–4.6): Blätter in Mikro-Bausteine schneiden, Stundenschritte aus Kurs,
// Förderfach, Spielschule, Materialien und CREW, alle Felder automatisch vorbefüllen (mit `sicher` je Feld) und die
// Höhe jedes Bausteins je passender Gestaltung messen (react-pdf + PyMuPDF, inkrementell mit Cache).
//
//   npm run passgenau:katalog                     → bausteine.json + schritte.json, misst fehlende Höhen
//   npm run passgenau:katalog -- --ohne-hoehen    → nur Metadaten, Höhen aus dem Cache (schnell)
//   npm run passgenau:katalog -- --nur=<blatt-id> → nur diese Blätter messen (zum Ausprobieren)
//
// Cache der Höhen: tmp/passgenau-hoehen.json (Schlüssel: Prüfsumme h + Gestaltung). Ein späterer Lauf misst nur, was
// neu oder geändert ist. Neue Inhalte (src/data/passgenau/inhalte/*.json) liest der Planer selbst; hier werden sie
// nur gezählt und geprüft (scripts/passgenau-pruefen.ts).
import { renderToBuffer, Document, Page } from '@react-pdf/renderer'
import { existsSync, mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import type { Baustein, Blatt, NummeriertesBlatt, Sprache as BlattSprache } from '../src/blatt/typen'
import type { Bogen, EldibBezug, Einzeltauglich, Layout, Merkmale, MikroBaustein, Rolle, Sozialform, Stufe, Tagesform } from '../src/passgenau/typen'
import { BEREICHE, THEMEN as BLATT_THEMEN, bereichById } from '../src/blatt/katalog'
import { themes as MATERIAL_THEMEN } from '../src/data/taxonomy'
import { Bausteine, nummerieren as nummernVon, type Ctx } from '../src/blatt/pdf/bausteine'
import { BlattDokument } from '../src/blatt/pdf/BlattDokument'
import { MASSE, SEITE, registriereSchriften } from '../src/blatt/pdf/stil'
import { palette } from '../src/blatt/zeichnung'
import { ladeQuellenNode, ROOT, stilHash } from './passgenau-quellen'
import { frParallel, inhaltsStellen, paketBausteine, texte } from '../src/passgenau/kern/inhalt'
import { hash8, norm, woerter, STUFE_ALTER, layoutAusStufe, STUFEN } from '../src/passgenau/kern/hilfen'
import { THEMEN, themaTreffer, KOMPETENZ_BLATT, KATHARSIS_RE, kompetenzAusCode, type Kompetenz } from '../src/passgenau/kern/vokabular'
import { packeBaustein, packeSchritt, LAYOUTS, SicherTabelle, type BausteineDatei, type SchrittMeta, type SchritteDatei } from '../src/passgenau/kern/format'
import type { Schritt as KursSchritt } from '../src/kurs/typen'
import type { Material } from '../src/types/material'

const args = process.argv.slice(2)
const OHNE_HOEHEN = args.includes('--ohne-hoehen')
const NUR = args.find((a) => a.startsWith('--nur='))?.slice(6).split(',')
const STAND = new Date().toISOString().slice(0, 10)
const AUS = join(ROOT, 'src/data/passgenau')
const CACHE = join(ROOT, 'tmp/passgenau-hoehen.json')
const REGISTER = join(AUS, 'register.json')

const q = ladeQuellenNode()
const t0 = Date.now()

// ---------------------------------------------------------------------------------------------------------------
// Themen: Bereich/Thema der Blätter und Themen der Materialien → Schlüssel wie material.js
// ---------------------------------------------------------------------------------------------------------------

const bereichNachName = new Map(BEREICHE.map((b) => [b.de, b.id]))
const themenNachBlatt = new Map<string, string[]>() // 'gefuehle/wut' → ['gewalt','wut']
for (const t of THEMEN)
  for (const label of t.blaetter) {
    const [bName, tName] = label.split('/')
    const bereich = bereichNachName.get(bName)
    const thema = BLATT_THEMEN.find((x) => x.bereich === bereich && x.de === tName)
    if (!bereich || !thema) throw new Error(`Thema „${label}“ (material.js) gibt es in der Toolbox nicht`)
    const k = `${bereich}/${thema.id}`
    themenNachBlatt.set(k, [...(themenNachBlatt.get(k) ?? []), t.key])
  }
// Spielschule: wenige, klare Zuordnungen
themenNachBlatt.set('spielschule/gefuehle', ['gefuehle'])
themenNachBlatt.set('spielschule/ich', ['selbstwert'])
const materialThemaId = new Map(MATERIAL_THEMEN.map((t) => [t.label, t.id]))
const themenNachMaterial = new Map<string, string[]>()
for (const t of THEMEN)
  for (const label of t.material) {
    const id = materialThemaId.get(label)
    if (id) themenNachMaterial.set(id, [...(themenNachMaterial.get(id) ?? []), t.key])
  }

/** Themen aus festen Zuordnungen (Gewicht 1) und Textstellen (je Treffer 0,5), die stärksten drei. */
function themenAus(fest: string[], text: string, max = 3): string[] {
  const punkte = new Map<string, number>()
  fest.forEach((k, i) => punkte.set(k, (punkte.get(k) ?? 0) + 1.2 - i * 0.1))
  const n = norm(text)
  for (const t of THEMEN) {
    if (t.heikel) continue
    const tr = themaTreffer(t, n)
    if (tr) punkte.set(t.key, (punkte.get(t.key) ?? 0) + Math.min(1.5, tr * 0.5))
  }
  return [...punkte.entries()]
    .filter(([, v]) => v >= 0.5)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([k]) => k)
}

// ---------------------------------------------------------------------------------------------------------------
// Gemeinsame Erkennung aus Texten (Stundenschritte)
// ---------------------------------------------------------------------------------------------------------------

const RE = {
  bewegungStark: /\b(lauf|laufen|renn|rennt|spring|springt|hüpf|tanz|werf|wirft|fang|klatsch|stampf|balancier|rück(en)? an rücken|wand schieben|zeitungsball|schüttel|sprint|staffel|fangspiel|platzwechsel)/i,
  bewegung: /\b(beweg|aufsteh|steht auf|stehen auf|stellt sich|stellen sich|im raum|durch den raum|gehen|geht herum|ball|strecken|dehnen|positionslinie|auf der linie|ecke des raums|ecken)/i,
  spiel: /\b(spiel|würfel|raten|rät|quiz|memory|bingo|runde[n]?\b|punkte sammeln|gewinnt|wettbewerb)/i,
  gespraech: /\b(gespräch|erzähl|besprech|fragen|frage|reden|austausch|tauschen sich|berichte|sagt|sagen|nennt|nennen|diskutier|unterhalt)/i,
  rollenspiel: /\b(rollenspiel|szene|vorspielen|spielen .{0,20} nach|rolle)/i,
  schreiben: /\b(schreib|notier|ausfüllen|füllen .{0,20} aus|ergänz|aufschreiben)/i,
  malen: /\b(male|malen|malt|zeichn|ausmalen|bunt|farben\b|stifte)/i,
  basteln: /\b(bastel|schneid|kleb|falt|knete|kneten|bauen|baut|klötze)/i,
  musik: /\b(musik|lied|sing|rhythmus|trommel|reim|klangschale|klang)/i,
  sinne: /\b(sinne|riech|schmeck|tast|fühlsack|fühlen mit|lausch|geräusch|duft)/i,
  atmen: /\b(atm|atem|bauchatmung|ausatmen|einatmen)/i,
  denkmodell: /\b(ampel|thermometer|vulkan|eisberg|skala|batterie|handmodell|waage|leiter|stopp-|0[–-]100|0[–-]10)/i,
  karten: /\b(karte|karten|bildkarten|kärtchen)/i,
  plan: /\b(plan|wenn-dann|vorsatz|vertrag|ziel für|mission|bis zum nächsten mal|diese woche)/i,
  comic: /\bcomic/i,
  geschichte: /\b(geschichte|vorlesen|liest vor|fallbeispiel|bilderbuch|erzählung)/i,
  digital: /\b(ipad|beamer|handy|app\b|video|film|tablet)/i,
  /** Arbeit, die nur mit einer Gruppe geht */
  gruppeStark: /\b(kleingruppe|tischgruppe|teams?\b|mannschaft|plenum|in gruppen|gruppenarbeit|die (ganze )?klasse|ganze gruppe|hälfte der|zwei gruppen|drei gruppen|vier gruppen|stationen|abstimm|gruppenfoto|alle anderen|im stuhlkreis|innen- und außenkreis|kugellager|stille post|jede gruppe|gruppen bilden|paare bilden|partnerwechsel|im kreis herum|reihum)/gi,
  gruppeSchwach: /\b(gruppe|klasse|paar|paare|zu zweit|partner|mitschüler|die anderen|alle kinder|alle jugendlichen|jede person|jedes kind|jede[rs]? jugendliche|sitzkreis|kreis)/gi,
  kursBezug: /\b(einheit \d|letzte[nr]? (einheit|woche|stunde|mal)|vorige[nr]? (einheit|woche)|skills-pass|mission|plakat aus|aus einheit|kursjahr|wochen-mission|im heft)/i,
  vorher: /\b(letzte[nr]? (einheit|woche|stunde|mal)|vorige[nr]? (einheit|woche)|mission|seit letzter|vom letzten mal|rückblick auf)/i,
  belastung2: /\b(tod|gestorben|verstorben|trauer|trennung|scheidung|missbrauch|gewalt zu hause|selbstverletz|suizid|ritzen|trauma)/i,
  belastung1: /\b(angst|sorge|traurig|wut|scham|peinlich|einsam|ausgeschlossen|mobbing|streit)/i,
  laut: /\b(laut|schrei|ruf|trommel|klatsch|stampf|wettlauf|rennen|musik)/i,
}

function zaehle(re: RegExp, text: string): number {
  return (text.match(new RegExp(re.source, 'gi')) ?? []).length
}

function formateAusText(text: string): string[] {
  const f: string[] = []
  const t = text
  if (RE.bewegungStark.test(t) || zaehle(RE.bewegung, t) >= 2) f.push('bewegung')
  if (RE.rollenspiel.test(t)) f.push('rollenspiel')
  if (zaehle(RE.spiel, t) >= 1 && !/spielregel/i.test(t)) f.push('spiel')
  if (RE.atmen.test(t)) f.push('atmen')
  if (RE.sinne.test(t)) f.push('sinne')
  if (RE.musik.test(t)) f.push('musik')
  if (RE.malen.test(t)) f.push('malen')
  if (RE.basteln.test(t)) f.push('basteln')
  if (RE.denkmodell.test(t)) f.push('denkmodell')
  if (RE.comic.test(t)) f.push('comic')
  if (RE.geschichte.test(t)) f.push('geschichte')
  if (RE.karten.test(t)) f.push('karten')
  if (RE.plan.test(t)) f.push('plan')
  if (RE.schreiben.test(t)) f.push('schreiben')
  if (RE.digital.test(t)) f.push('digital')
  if (zaehle(RE.gespraech, t) >= 2 || !f.length) f.push('gespraech')
  return [...new Set(f)].slice(0, 4)
}

function energieAusText(text: string, formate: string[]): 1 | 2 | 3 {
  if (RE.bewegungStark.test(text)) return 3
  if (formate.includes('bewegung')) return 2
  if (formate.includes('rollenspiel') || formate.includes('basteln')) return 2
  return 1
}

/** Einzelstunde möglich? Starke Gruppenwörter → nein; viele schwache → angepasst; sonst ja (Fachkraft spielt mit). */
function einzelAusText(text: string): { wert: Einzeltauglich; sicher: number } {
  const stark = zaehle(RE.gruppeStark, text)
  const schwach = zaehle(RE.gruppeSchwach, text)
  if (stark >= 1) return { wert: 'nein', sicher: 0.6 }
  if (schwach >= 3) return { wert: 'angepasst', sicher: 0.4 }
  return { wert: 'ja', sicher: schwach ? 0.4 : 0.6 }
}

const MATERIAL_WOERTER: [RegExp, string][] = [
  [/\bball\b|bälle/i, 'ball'], [/schere/i, 'schere'], [/kleber|klebestift/i, 'kleber'], [/buntstift|stifte|wachsmal/i, 'buntstifte'],
  [/papier|a4|blatt/i, 'papier'], [/karte|kärtchen/i, 'karten'], [/plakat|flipchart|tafel/i, 'plakat'], [/würfel/i, 'wuerfel'],
  [/ipad|tablet/i, 'ipad'], [/beamer/i, 'beamer'], [/musik|lautsprecher|lied/i, 'musik'], [/matte|matten/i, 'matten'],
  [/seil|tau\b/i, 'seil'], [/tuch|tücher/i, 'tuecher'], [/knete/i, 'knete'], [/klangschale/i, 'klangschale'], [/zeitung/i, 'zeitungen'],
  [/handpuppe|puppe/i, 'handpuppe'], [/bauklötze|klötze|lego/i, 'bausteine'], [/spiegel/i, 'spiegel'], [/kochplatte|herd|ofen/i, 'kueche'],
  [/fallschirm|schwungtuch/i, 'schwungtuch'], [/sanduhr|timer|stoppuhr/i, 'sanduhr'],
]

function materialAusText(text: string): string[] {
  return [...new Set(MATERIAL_WOERTER.filter(([re]) => re.test(text)).map(([, m]) => m))].slice(0, 6)
}

function ortAusText(text: string): 'turnhalle' | 'draussen' | undefined {
  if (/\bturnhalle|sporthalle/i.test(text)) return 'turnhalle'
  if (/\b(draußen|im freien|auf dem schulhof|im hof|im wald|im park)/i.test(text)) return 'draussen'
  return undefined
}

function bogenAusText(text: string, fallback?: Bogen): Bogen | undefined {
  const t = norm(text)
  if (/(ruckblick|zuruckschau|was hat (dir|euch) geholfen|geschafft|feiern|diplom|urkunde)/.test(t)) return 'reflektieren'
  if (/(im alltag|diese woche|bis zum nachsten mal|wenn-dann|vorsatz|mein plan|ubertrag|zu hause ausprobieren|morgen)/.test(t)) return 'uebertragen'
  if (/(rollenspiel|uben|ubung|ausprobieren|trainier|durchspielen|probieren)/.test(t)) return fallback === 'verstehen' ? 'verstehen' : 'ueben'
  if (/(woran merk|spurst|spuren|wahrnehm|beobacht|wie fuhl|korpersignal|anzeichen|check-in|einschatz)/.test(t)) return 'wahrnehmen'
  if (/(erklar|verstehen|warum|geschichte|input|was bedeutet|modell)/.test(t)) return 'verstehen'
  return fallback
}

function tagesformAus(formate: string[], energie: number): Tagesform[] {
  const tf = new Set<Tagesform>()
  if (energie === 3 || formate.includes('bewegung')) tf.add('aufgedreht').add('wuetend')
  if (formate.includes('musik')) tf.add('wuetend').add('muede')
  if (energie === 1 && (formate.includes('malen') || formate.includes('basteln'))) tf.add('muede').add('rueckzug').add('traurig')
  if (formate.includes('sinne') || formate.includes('atmen')) tf.add('aengstlich').add('muede')
  if (formate.includes('spiel') && energie <= 2) tf.add('traurig').add('rueckzug').add('will-nicht')
  if (formate.includes('karten')) tf.add('will-nicht').add('aengstlich')
  return [...tf]
}

function minuten(text: string): number | null {
  const m = /(?:ca\.|etwa|dauer:?|\()?\s*(\d{1,3})(?:\s*[–-]\s*(\d{1,3}))?\s*(?:min\.?|minuten)\b/i.exec(text)
  if (!m) return null
  const a = Number(m[1])
  const b = m[2] ? Number(m[2]) : a
  return Math.round((a + b) / 2)
}

function dauer(typ: number, kuerzbar = 0.6, dehnbar = 1.4): { min: number; typ: number; max: number } {
  typ = Math.max(1, Math.round(typ))
  return { min: Math.max(1, Math.round(typ * kuerzbar)), typ, max: Math.max(typ, Math.round(typ * dehnbar)) }
}

function eldibBezug(codes: string[], erstesVoll = true): EldibBezug[] {
  return [...new Set(codes)].filter((c) => /^(V|K|SOZ|KOG)-\d+$/.test(c)).map((code, i) => ({ code, gewicht: i === 0 && erstesVoll ? 1 : 0.5 }))
}

function stufenAus(von: number, bis: number): Stufe[] {
  return STUFEN.filter((s) => STUFE_ALTER[s][0] <= bis && STUFE_ALTER[s][1] >= von)
}

// ---------------------------------------------------------------------------------------------------------------
// Merkmale (P9), Anspruch der Rituale (P8), heikel je Baustein (T-M1)
// ---------------------------------------------------------------------------------------------------------------

const MERKMAL_RE: Record<keyof Merkmale, RegExp> = {
  wettbewerb: /\b(gewinnt|gewonnen|gewinner|sieger|verliert|verlierer|wer zuerst|wer als erste|wettlauf|wettrennen|wettbewerb|wettkampf|gegeneinander|meisten punkte|team gegen|um die wette|duell)/i,
  koerperkontakt: /\b(anfass|berühr|rücken an rücken|hände halten|an den händen|massage|massier|huckepack|kitzel|umarm|auf den rücken (malen|zeichnen|schreiben)|hand in hand|kuscheln|abklatschen)/i,
  laut: /\b(schrei|brüll|trommel|stampf|kreisch|pfeif|lärm|laute musik|ganz laut|so laut wie|lautstärke|krach|jubel)/i,
  gewaltbezug: /\b(schlägt|schlagen|geschlagen|hauen|gehauen|haut (ihn|sie|den|die|mich|ihm|andere)|prügel|getreten|tritt (ihn|sie|gegen)|waffe|schlägerei|würg|schubst|geschubst|verprügel)/i,
  katharsis: KATHARSIS_RE,
}

function merkmaleAusText(t: string): Merkmale | undefined {
  const m: Merkmale = {}
  for (const k of Object.keys(MERKMAL_RE) as (keyof Merkmale)[]) if (MERKMAL_RE[k].test(t)) m[k] = true
  return Object.keys(m).length ? m : undefined
}

/** Was ein Ritual vom Kind verlangt: 2 sprechen/Gefühl benennen/bewerten, 1 zeigen/wählen, 0 nichts. */
function anspruchAusText(t: string): 0 | 1 | 2 {
  if (/(gefühl|wie geht es|wie fühlst|stimmung|bewert|daumen|zahl des tages|zahl von 0|erzähl|was war heute|was nimmst du|rückblick|benenn|in einem satz|ein satz|blitzlicht|skala|was hat (dir|euch)|wetterbericht|wie war)/i.test(t)) return 2
  if (/(zeig|wähl|leg(t|en)? (eine|die|ein)|karte|aussuchen|deute|tippt|klebt)/i.test(t)) return 1
  return 0
}

const HEIKEL = (['suizid', 'kinderschutz', 'sexualitaet'] as const).map((k) => [k, THEMEN.find((t) => t.key === k)!] as const)
/** Heikel nur, wenn der Baustein selbst darüber spricht (nicht, weil sein Thema in material.js als heikel gilt). */
function heikelAusText(t: string): 'akut' | 'kinderschutz' | undefined {
  const n = norm(t)
  for (const [k, th] of HEIKEL) if (themaTreffer(th, n)) return k === 'suizid' ? 'akut' : 'kinderschutz'
  return undefined
}

// ---------------------------------------------------------------------------------------------------------------
// Stabile Ids (T-M10): Register je Quelle (Blatt, Einheit, Material, Themenwoche). Zuordnung zuerst über die
// Prüfsumme h, dann über Textähnlichkeit ≥ 0,8 (neue Fassung), sonst neue Nummer. Nummern werden nie neu vergeben;
// verschwundene Teile bleiben mit `x` (entfernt) stehen.
// ---------------------------------------------------------------------------------------------------------------

interface RegEintrag { id: string; h: string; t: string; f?: number; x?: 1 }
interface Register { v: 1; gruppen: Record<string, { n: number; e: RegEintrag[] }> }
const register: Register = existsSync(REGISTER) ? (JSON.parse(readFileSync(REGISTER, 'utf8')) as Register) : { v: 1, gruppen: {} }

function signatur(text: string): string {
  return norm(text).replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)
}
function aehnlich(a: string, b: string): number {
  const bi = (x: string) => {
    const s = new Set<string>()
    for (let i = 0; i < x.length - 1; i++) s.add(x.slice(i, i + 2))
    return s
  }
  const A = bi(a)
  const B = bi(b)
  if (!A.size || !B.size) return a === b ? 1 : 0
  let n = 0
  for (const x of A) if (B.has(x)) n++
  return (2 * n) / (A.size + B.size)
}

/** Ids für die Teile einer Quelle in Reihenfolge; `nummer` macht aus n die Id. */
function stabileIds(gruppe: string, teile: { h: string; text: string }[], nummer: (n: number) => string): string[] {
  const g = (register.gruppen[gruppe] ??= { n: 0, e: [] })
  const frei = new Set(g.e.filter((e) => !e.x))
  const ids: (string | null)[] = teile.map(() => null)
  // 1. gleiche Prüfsumme
  teile.forEach((t, i) => {
    const e = [...frei].find((x) => x.h === t.h)
    if (e) {
      ids[i] = e.id
      frei.delete(e)
    }
  })
  // 2. ähnlicher Text (neue Fassung)
  teile.forEach((t, i) => {
    if (ids[i]) return
    const sig = signatur(t.text)
    let best: RegEintrag | null = null
    let wert = 0.8
    for (const e of frei) {
      const a = aehnlich(sig, e.t)
      if (a >= wert) {
        wert = a
        best = e
      }
    }
    if (best) {
      ids[i] = best.id
      best.h = t.h
      best.t = sig
      best.f = (best.f ?? 1) + 1
      frei.delete(best)
    }
  })
  // 3. neu
  teile.forEach((t, i) => {
    if (ids[i]) return
    const id = nummer(g.n++)
    g.e.push({ id, h: t.h, t: signatur(t.text) })
    ids[i] = id
  })
  for (const e of frei) e.x = 1
  for (const e of g.e) if (ids.includes(e.id)) delete e.x
  return ids as string[]
}

/** Werkzeuge, die doch fürs Kind sind (P1); alle anderen „Werkzeuge für Fachkräfte“ kommen nie aufs Blatt. */
const WERKZEUGE_FUERS_KIND = new Set(['ruhe-ecke-karten', 'tagesplan-bildkarten', 'belohnungs-menue'])

// ---------------------------------------------------------------------------------------------------------------
// 1. Blätter → Mikro-Bausteine (4.2)
// ---------------------------------------------------------------------------------------------------------------

/** Bausteine, die nach einem Paket einen neuen, freien Baustein beginnen. */
const FREI = new Set<string>(['info', 'text', 'geschichte', 'notfall', 'rueckblick', 'bild'])
const SPIEL_ARTEN = new Set(['schneiden_kleben', 'memory', 'labyrinth', 'laufweg', 'minibuch', 'punkte_verbinden', 'klappbild', 'faedelkarte', 'bastelbogen', 'suchbild', 'anziehpuppe', 'forscherblatt'])
const NAMEN = [
  'Lena', 'Noah', 'Inês', 'Ines', 'Tiago', 'Mila', 'Jang', 'Ben', 'Sofia', 'Yusuf', 'Amira', 'Luca', 'Emma', 'Liam', 'Chiara', 'Diogo', 'Léa', 'Lea',
  'Mathis', 'Zoé', 'Zoe', 'Elias', 'Aylin', 'Nora', 'Samuel', 'Ana', 'Rafael', 'Jil', 'Pol', 'Mia', 'Finn', 'Leonor', 'Mehmet', 'Sami', 'Tom', 'Jana',
  'Malik', 'Lina', 'Jonas', 'Leo', 'Laura', 'Max', 'Sara', 'Sarah', 'Ali', 'Omar', 'Lucas', 'Lukas', 'Nina', 'Paul', 'Marie', 'Julia', 'David', 'Hugo',
  'Elif', 'Kemal', 'Joana', 'João', 'Joao', 'Pedro', 'Rita', 'Marta', 'Kevin', 'Tim', 'Anna', 'Felix', 'Clara', 'Emil', 'Ella', 'Ida', 'Theo', 'Nils',
  'Maja', 'Selin', 'Can', 'Deniz', 'Ilyas', 'Karim', 'Yara', 'Lou', 'Jules', 'Louise', 'Chloé', 'Hannah', 'Mehdi', 'Rayan', 'Adam', 'Aya', 'Nour',
  'Fatima', 'Samira', 'Lara', 'Luis', 'Mateo', 'Carla', 'Bruno', 'Nico', 'Lia', 'Lio', 'Noé', 'Tomás', 'Arda', 'Kofi', 'Matteo', 'Dario', 'Malou',
  'Jona', 'Anouk', 'Sienna', 'Nelia', 'Saïd', 'Lucie', 'Ema', 'Ben',
]
const NAME_RE = new RegExp(`(?<![\\p{L}])(${[...new Set(NAMEN)].join('|')})(s)?(?![\\p{L}])`, 'gu')

interface Einheit0 {
  pfad: number[]
  arts: string[]
  haupt: string
  liste: Baustein[]
}

function schneide(blatt: Blatt): Einheit0[] {
  const liste = blatt.de.bausteine
  const stellen = inhaltsStellen(liste)
  const out: Einheit0[] = []
  for (let k = 0; k < stellen.length; k++) {
    const i = stellen[k]
    const b = liste[i]
    const pfad = [i]
    if (b.art === 'aufgabe') {
      // die Aufgabe gehört zum folgenden Baustein; Antwortfelder danach (Satzanfänge, Linien …) bleiben dabei
      let j = k + 1
      if (j < stellen.length && liste[stellen[j]].art !== 'aufgabe') {
        pfad.push(stellen[j])
        j++
        while (j < stellen.length) {
          const n = liste[stellen[j]]
          if (n.art === 'aufgabe' || FREI.has(n.art) || (n.art === 'skala' && n.frage) || SPIEL_ARTEN.has(n.art)) break
          pfad.push(stellen[j])
          j++
        }
      }
      k = j - 1
    }
    const teile = pfad.map((p) => liste[p])
    const arts: string[] = []
    for (const t of teile) {
      arts.push(t.art)
      if (t.art === 'spalten') for (const x of [...t.links, ...t.rechts]) arts.push(x.art)
    }
    const haupt = arts.find((a) => a !== 'aufgabe' && a !== 'spalten') ?? 'aufgabe'
    out.push({ pfad, arts: [...new Set(arts)], haupt, liste: teile })
  }
  return out
}

const BOGEN_ART: Record<string, Bogen> = {
  rueckblick: 'reflektieren',
  wennDann: 'uebertragen', plan: 'uebertragen', vertrag: 'uebertragen', tagesplan: 'uebertragen', notfall: 'uebertragen',
  geschichte: 'verstehen', info: 'verstehen', text: 'verstehen', eisberg: 'verstehen', comic: 'verstehen', zuordnen: 'verstehen', karten: 'verstehen', wortspeicher: 'verstehen',
  gefuehle: 'wahrnehmen', koerper: 'wahrnehmen', skala: 'wahrnehmen', einschaetzung: 'wahrnehmen', glaeser: 'wahrnehmen', netz: 'wahrnehmen',
  kurve: 'wahrnehmen', tageskreis: 'wahrnehmen', farbkalender: 'wahrnehmen', gefuehlsrad: 'wahrnehmen', thermometer: 'wahrnehmen', bilder: 'wahrnehmen',
}

const DAUER_ART: Record<string, number> = {
  geschichte: 3, info: 2, text: 2, ankreuzen: 3, bilder: 3, tabelle: 6, satzanfaenge: 4, linien: 4, frage: 4, feld: 6, wennDann: 6, dialog: 6,
  vertrag: 4, einschaetzung: 4, skala: 2, zuordnen: 3, gefuehle: 4, gefuehlsrad: 5, ampel: 6, thermometer: 6, vulkan: 8, eisberg: 6, koerper: 6,
  batterie: 5, waage: 5, leiter: 6, zielscheibe: 5, hand: 6, mindmap: 6, schritte: 4, plan: 5, tagesplan: 6, atmen: 4, comic: 6, karten: 5,
  rueckblick: 2, notfall: 2, glaeser: 6, netz: 6, kurve: 6, tageskreis: 6, farbkalender: 5, wortspeicher: 1, bild: 1, aufgabe: 3,
}

function blattDauer(d: string): number {
  const m = /(\d+)\s*(?:[–-]\s*(\d+))?\s*Min/.exec(d)
  if (!m) return 30
  return m[2] ? (Number(m[1]) + Number(m[2])) / 2 : Number(m[1])
}

function schreibAus(b: Baustein): number {
  switch (b.art) {
    case 'linien':
      return b.anzahl >= 4 ? 3 : 2
    case 'frage':
      return (b.linien ?? 2) >= 3 ? 3 : 2
    case 'satzanfaenge':
      return b.items.length * (b.linien ?? 1) >= 4 ? 3 : 2
    case 'tabelle':
      return b.zeilen >= 3 && b.spalten.length >= 3 ? 3 : 2
    case 'dialog':
    case 'vertrag':
      return 2
    case 'wennDann':
      return b.zeilen >= 3 ? 3 : 2
    case 'mindmap':
    case 'hand':
    case 'leiter':
    case 'zielscheibe':
    case 'batterie':
    case 'waage':
    case 'eisberg':
    case 'vulkan':
    case 'ampel':
    case 'thermometer':
    case 'plan':
      return 2
    case 'feld':
      return b.zeichnen ? 0 : 2
    case 'comic':
      return b.felder.some((f) => f.blase && f.blase !== 'keine' && !f.text) || b.felder.some((f) => f.untertitel === '') ? 2 : 0
    case 'karten':
      return b.karten.some((k) => !k.titel && !k.text) ? 1 : 0
    case 'ankreuzen':
      return b.frei ? 2 : 1
    case 'gefuehle':
      return b.modus === 'benennen' ? 1 : 1
    case 'bilder':
    case 'einschaetzung':
    case 'skala':
    case 'zuordnen':
    case 'gefuehlsrad':
    case 'kurve':
    case 'tageskreis':
    case 'farbkalender':
    case 'glaeser':
    case 'netz':
    case 'rueckblick':
      return 1
    case 'spalten':
      return Math.max(0, ...[...b.links, ...b.rechts].map(schreibAus))
    default:
      return 0
  }
}

function bildAus(b: Baustein): number {
  if (SPIEL_ARTEN.has(b.art)) return 3
  switch (b.art) {
    case 'bilder':
    case 'comic':
    case 'gefuehle':
    case 'koerper':
      return 3
    case 'karten':
      return b.karten.some((k) => k.bild) ? 3 : 1
    case 'feld':
      return b.zeichnen ? 3 : 0
    case 'geschichte':
      return b.bild ? 2 : 1
    case 'ampel':
    case 'vulkan':
    case 'thermometer':
    case 'eisberg':
    case 'batterie':
    case 'waage':
    case 'leiter':
    case 'zielscheibe':
    case 'hand':
    case 'atmen':
    case 'gefuehlsrad':
    case 'glaeser':
    case 'netz':
    case 'tageskreis':
    case 'bild':
      return 2
    case 'skala':
      return b.gesichter ? 2 : 1
    case 'schritte':
    case 'mindmap':
    case 'plan':
    case 'kurve':
    case 'farbkalender':
    case 'zuordnen':
    case 'tagesplan':
    case 'rueckblick':
      return 1
    case 'info':
      return b.symbol ? 1 : 0
    case 'spalten':
      return Math.max(0, ...[...b.links, ...b.rechts].map(bildAus))
    default:
      return 0
  }
}

function formateAus(e: Einheit0): string[] {
  const f = new Set<string>()
  const add = (b: Baustein) => {
    switch (b.art) {
      case 'linien':
      case 'frage':
      case 'satzanfaenge':
      case 'tabelle':
      case 'wennDann':
      case 'vertrag':
        f.add('schreiben')
        break
      case 'dialog':
        f.add('schreiben').add('gespraech')
        break
      case 'feld':
        f.add(b.zeichnen ? 'malen' : 'schreiben')
        break
      case 'ankreuzen':
      case 'einschaetzung':
      case 'skala':
      case 'zuordnen':
        f.add('ankreuzen')
        break
      case 'bilder':
        f.add(b.modus === 'anmalen' ? 'malen' : 'ankreuzen')
        break
      case 'koerper':
        f.add('malen')
        break
      case 'comic':
        f.add('comic')
        break
      case 'geschichte':
        f.add('geschichte')
        break
      case 'text':
      case 'info':
        f.add('lesen')
        break
      case 'ampel':
      case 'thermometer':
      case 'vulkan':
      case 'eisberg':
      case 'batterie':
      case 'waage':
      case 'leiter':
      case 'zielscheibe':
      case 'hand':
      case 'gefuehlsrad':
      case 'netz':
      case 'glaeser':
      case 'mindmap':
        f.add('denkmodell')
        break
      case 'plan':
      case 'tagesplan':
        f.add('plan')
        break
      case 'karten':
        f.add('karten')
        break
      case 'atmen':
        f.add('atmen')
        if (b.uebung === 'fuenf-sinne') f.add('sinne')
        break
      case 'laufweg':
      case 'labyrinth':
      case 'suchbild':
      case 'punkte_verbinden':
        f.add('spiel')
        break
      case 'memory':
        f.add('spiel').add('basteln')
        break
      case 'schneiden_kleben':
      case 'minibuch':
      case 'klappbild':
      case 'faedelkarte':
      case 'bastelbogen':
      case 'anziehpuppe':
        f.add('basteln')
        break
      case 'schritte':
        if (b.stil === 'kette') f.add('denkmodell')
        break
      case 'gefuehle':
        f.add(b.modus === 'benennen' ? 'schreiben' : 'ankreuzen')
        break
      case 'aufgabe':
        if (b.symbole?.some((s) => s === 'sprechen' || s === 'partner' || s === 'zuhoeren')) f.add('gespraech')
        if (b.symbole?.includes('malen')) f.add('malen')
        if (b.symbole?.includes('schneiden')) f.add('basteln')
        break
      case 'spalten':
        b.links.forEach(add)
        b.rechts.forEach(add)
        break
    }
  }
  e.liste.forEach(add)
  if (!f.size) f.add('lesen')
  return [...f]
}

function materialAus(e: Einheit0): string[] {
  const m = new Set<string>()
  const add = (b: Baustein) => {
    if (b.art === 'aufgabe') {
      if (b.symbole?.includes('schneiden')) m.add('schere')
      if (b.symbole?.includes('kleben')) m.add('kleber')
      if (b.symbole?.includes('malen')) m.add('buntstifte')
    }
    if (b.art === 'laufweg') m.add('wuerfel')
    if (b.art === 'faedelkarte') m.add('lochzange').add('wolle')
    if (b.art === 'memory' || b.art === 'schneiden_kleben' || b.art === 'minibuch' || b.art === 'klappbild' || b.art === 'anziehpuppe' || b.art === 'bastelbogen') m.add('schere')
    if (b.art === 'schneiden_kleben' || b.art === 'klappbild') m.add('kleber')
    if (b.art === 'koerper' || (b.art === 'feld' && b.zeichnen) || (b.art === 'bilder' && b.modus === 'anmalen')) m.add('buntstifte')
    if (b.art === 'spalten') [...b.links, ...b.rechts].forEach(add)
  }
  e.liste.forEach(add)
  return [...m]
}

const textVonListe = (liste: Baustein[]) =>
  texte(liste)
    .map((t) => t.text)
    .join(' ')

const bausteine: MikroBaustein[] = []
const blattEinheiten = new Map<string, { id: string; e: Einheit0 }[]>()
let nPakete = 0
let nFrei = 0

for (const blatt of q.blaetter) {
  if (blatt.bereich === 'mathe') continue
  const einheiten = schneide(blatt)
  const fr = frParallel(blatt)
  const typ = blattDauer(blatt.dauer)
  const roh = einheiten.map((e) => e.arts.filter((a) => a !== 'spalten' && a !== 'aufgabe').reduce((s, a) => s + (SPIEL_ARTEN.has(a) ? 10 : (DAUER_ART[a] ?? 4)), 0) || DAUER_ART.aufgabe)
  const summe = roh.reduce((a, b) => a + b, 0)
  // Einzelarbeit geht schneller als die Blattdauer einer Gruppenstunde: nur nach unten angleichen
  const faktor = Math.min(1, Math.max(0.6, typ / Math.max(1, summe)))
  const blattThemen = themenNachBlatt.get(`${blatt.bereich}/${blatt.thema}`) ?? []
  const blattText = [blatt.de.titel, blatt.de.untertitel ?? '', blatt.schlagworte.join(' ')].join(' ')
  const nurBild = blatt.stufen.every((s) => s === 'C1')
  const alterVon = Math.min(...blatt.stufen.map((s) => STUFE_ALTER[s][0]))
  const alterBis = Math.max(...blatt.stufen.map((s) => STUFE_ALTER[s][1]))
  const kompetenz = [...new Set<Kompetenz>([...(KOMPETENZ_BLATT[`${blatt.bereich}/${blatt.thema}`] ?? []), ...(blatt.eldib[0] ? [kompetenzAusCode(blatt.eldib[0])] : [])])].slice(0, 2)
  const geschichten: { id: string; namen: Set<string>; arten: string; idx: number }[] = []
  const liste: { id: string; e: Einheit0 }[] = []
  // Die Hilfe-Zeile (notfall) ist kein Katalog-Kandidat – das Blatt hängt sie selbst an (E-M3)
  const kandidaten = einheiten.filter((e) => e.haupt !== 'notfall' || e.liste.some((b) => b.art === 'aufgabe'))
  const hs = kandidaten.map((e) => hash8(JSON.stringify(e.liste) + '|' + JSON.stringify(fr ? paketBausteine(blatt, e.pfad, 'fr') : [])))
  const ids = stabileIds(`b:${blatt.id}`, kandidaten.map((e, i) => ({ h: hs[i], text: textVonListe(e.liste) })), (n) => `b:${blatt.id}:${n}`)
  const mehrtaegigesBlatt = blatt.bereich !== 'spielschule' && /täglich|woche/i.test(blatt.dauer)
  const zielgruppe = blatt.bereich === 'werkzeuge' && !WERKZEUGE_FUERS_KIND.has(blatt.id) ? ('fachkraft' as const) : undefined
  kandidaten.forEach((e, n) => {
    const id = ids[n]
    const deText = textVonListe(e.liste)
    const h = hs[n]
    const aufgaben = e.liste.filter((b) => b.art === 'aufgabe').map((b) => (b as Extract<Baustein, { art: 'aufgabe' }>).text).join(' ')
    // Bogen: Art, dann Hinweise im Aufgabentext, dann Stelle im Blatt
    let bogen: Bogen = BOGEN_ART[e.haupt] ?? 'ueben'
    let sicherBogen = BOGEN_ART[e.haupt] ? 0.6 : 0.4
    const ausText = aufgaben ? bogenAusText(aufgaben) : undefined
    if (ausText && e.haupt !== 'rueckblick' && (bogen === 'ueben' || ausText === 'uebertragen')) {
      bogen = ausText
      sicherBogen = 0.5
    }
    if (n === kandidaten.length - 1 && bogen === 'ueben') {
      bogen = 'uebertragen'
      sicherBogen = 0.4
    }
    if (n === 0 && bogen === 'ueben' && kandidaten.length > 2) {
      bogen = 'wahrnehmen'
      sicherBogen = 0.3
    }
    const rolle: Rolle[] =
      e.haupt === 'rueckblick' ? ['reflexion', 'abschluss'] : e.haupt === 'atmen' ? ['uebung', 'regulation'] : bogen === 'uebertragen' && /plan|wennDann|vertrag/.test(e.haupt) ? ['uebung', 'transfer'] : ['uebung']
    const woerterKind = woerter(deText)
    const lesemenge = nurBild ? 0 : woerterKind <= 3 ? 0 : woerterKind <= 25 ? 1 : woerterKind <= 80 ? 2 : 3
    const schreib = Math.min(3, Math.max(0, ...e.liste.map(schreibAus)))
    const bild = Math.min(3, Math.max(0, ...e.liste.map(bildAus)))
    const typU = Math.max(1, Math.round(roh[n] * faktor))
    const sozialform: Sozialform[] = blatt.sozialform.map((s) => (s === 'einzeln' ? 'einzeln' : s === 'gruppe' ? 'gruppe' : 'klasse'))
    const gruppenAufgabe = e.liste.some((b) => b.art === 'aufgabe' && b.symbole?.includes('gruppe'))
    const einzeln: Einzeltauglich = gruppenAufgabe ? 'angepasst' : blatt.sozialform.includes('einzeln') ? 'ja' : einzelAusText(aufgaben).wert === 'nein' ? 'nein' : 'ja'
    // heikel je Baustein (T-M1): nur, was der Baustein selbst anspricht; Krise & Sicherheit immer
    const nt = norm(deText)
    let sensibel: MikroBaustein['sensibel'] = blatt.bereich === 'werkzeuge' && blatt.thema === 'krise' ? 'akut' : heikelAusText(deText)
    if (!sensibel && (/(korper gehort mir|beruhr|gutes geheimnis|schlechtes geheimnis|intimbereich)/.test(nt) || (blatt.bereich === 'alltag' && blatt.thema === 'koerper' && /(korper|pubertat|veranderung)/.test(nt)))) sensibel = 'koerper'
    if (!sensibel && /(familie|eltern|mama|papa|mutter|vater|geschwister|zu hause|zuhause|daheim|oma|opa)/.test(norm(aufgaben))) sensibel = 'familie'
    const belastung: 0 | 1 | 2 = RE.belastung2.test(deText) ? 2 : ['angst', 'trauer'].includes(blatt.thema) || blatt.thema === 'resilienz' || RE.belastung1.test(aufgaben) ? 1 : 0
    const thema = themenAus(blattThemen, deText + ' ' + blattText)
    const formate = formateAus(e)
    const ohneZiel =
      (e.arts.some((a) => SPIEL_ARTEN.has(a) && a !== 'forscherblatt') && e.haupt !== 'forscherblatt') ||
      (blatt.bereich === 'lernen' && blatt.thema === 'grundlagen') ||
      e.haupt === 'atmen'
    // Abhängigkeiten: Figurennamen aus Geschichten, Comics, Dialogen; „die Geschichte“, „oben“
    const namen = new Set<string>([...deText.matchAll(NAME_RE)].map((m) => m[1]))
    const braucht = new Set<string>()
    if (['geschichte', 'comic', 'dialog', 'text'].includes(e.haupt)) geschichten.push({ id, namen, arten: e.haupt, idx: n })
    else {
      for (const g of geschichten) for (const name of namen) if (g.namen.has(name)) braucht.add(g.id)
      if (/\b(die|der|den|dem) (geschichte|text|comic|bildgeschichte|fallbeispiel|szene)\b|\blies\b|\boben\b|\bvon oben\b/i.test(aufgaben) && liste.length) {
        const vor = [...geschichten].reverse()[0] ?? null
        if (vor) braucht.add(vor.id)
        else if (/\boben\b/i.test(aufgaben)) braucht.add(liste[liste.length - 1].id)
      }
    }
    const b: MikroBaustein = {
      id,
      h,
      quelle: { blatt: blatt.id, nr: (blatt as NummeriertesBlatt).nr, pfad: e.pfad },
      art: e.arts,
      bogen,
      rolle,
      thema,
      eldib: eldibBezug(blatt.eldib),
      kompetenz,
      alter: { von: alterVon, bis: alterBis },
      stufen: blatt.stufen,
      lesemenge: lesemenge as MikroBaustein['lesemenge'],
      schreibmenge: schreib as MikroBaustein['schreibmenge'],
      bildanteil: bild as MikroBaustein['bildanteil'],
      format: formate,
      sprache: { de: true, fr, ...(blatt.woche?.sprachen ? { woerter: ['lb' as const, ...(blatt.woche.sprachen.woerter.some((w) => w.pt) ? ['pt' as const] : [])] } : {}) },
      dauer: dauer(typU),
      sozialform,
      einzeltauglich: einzeln,
      energie: e.arts.some((a) => SPIEL_ARTEN.has(a)) ? 2 : 1,
      belastung,
      material: materialAus(e),
      hoehe: {},
      textfelder: [],
      qualitaet: 'geprueft',
      sicher: {
        eldib: 0.5, thema: blattThemen.length ? 0.7 : 0.5, kompetenz: 0.5, rolle: 0.7, bogen: sicherBogen, alter: 0.7, lesemenge: 0.8,
        schreibmenge: 0.7, bildanteil: 0.7, format: 0.7, dauer: 0.5, sozialform: 0.8, einzeltauglich: blatt.sozialform.includes('einzeln') ? 0.8 : 0.5,
        energie: 0.7, belastung: 0.5, material: 0.7, braucht: 0.6, sensibel: 0.6, ohneZiel: 0.6,
      },
    }
    if (braucht.size) b.braucht = [...braucht]
    if (sensibel) b.sensibel = sensibel
    if (ohneZiel) b.ohneZiel = true
    if (zielgruppe) b.zielgruppe = zielgruppe
    // Blätter zu Filmen brauchen den Film (und seine Szenen) – Material „film“, nie allein aufs Blatt
    if (/\bfilm/i.test(blatt.id + ' ' + blatt.schlagworte.join(' ') + ' ' + blatt.de.titel)) b.material = [...new Set([...b.material, 'film'])]
    const merkmale = merkmaleAusText(deText)
    if (merkmale) b.merkmale = merkmale
    // mehrtägig nur die Teile, die über Tage laufen (Wochenplan, Tracker, „jeden Tag“)
    if (mehrtaegigesBlatt && (e.arts.some((a) => ['plan', 'farbkalender', 'kurve', 'tagesplan'].includes(a)) || /(jeden tag|taglich|diese woche|eine woche|morgens und abends|jeden abend|jeden morgen)/.test(norm(aufgaben)) || (e.arts.includes('tabelle') && /(montag|mo\b|tag 1)/i.test(deText)))) {
      b.mehrtaegig = true
      b.bogen = 'uebertragen'
      if (!b.rolle.includes('transfer')) b.rolle = [...b.rolle, 'transfer']
    }
    bausteine.push(b)
    liste.push({ id, e })
    if (e.liste[0].art === 'aufgabe') nPakete++
    else nFrei++
  })
  blattEinheiten.set(blatt.id, liste)
}

// ---------------------------------------------------------------------------------------------------------------
// 2. Stundenschritte (4.5)
// ---------------------------------------------------------------------------------------------------------------

const schritte: SchrittMeta[] = []
const bausteineVonBlatt = (id: string) => (blattEinheiten.get(id) ?? []).map((x) => x.id)
const blattThemenVon = (id: string): string[] => {
  const b = q.blatt.get(id)
  return b ? (themenNachBlatt.get(`${b.bereich}/${b.thema}`) ?? []) : []
}

function kursSchritt(art: 'k' | 'f', e: { id: string; blaetter: string[] }, s: KursSchritt, i: number, alter: [number, number], _vorige: null, fr: KursSchritt | null): SchrittMeta | null {
  if (s.phase === 'pause') return null
  const text = [s.titel, s.text, ...(s.sagen ?? []), ...(s.punkte ?? []), s.tipp ?? '', s.wennEsKippt ?? ''].join(' ')
  const formate = formateAusText(text)
  const energie = s.phase === 'aktiv' ? energieAusText(text, formate) : s.phase === 'skill' && formate.includes('bewegung') ? 2 : 1
  const rolle: Rolle[] = []
  switch (s.phase) {
    case 'ankommen':
      // ein Ankommen über 12 Minuten (Ausflug, langer Kreis) ist für eine Einzelstunde ein Einstieg
      rolle.push(s.dauer > 12 ? 'einstieg' : 'ankommen')
      break
    case 'bruecke':
      rolle.push('einstieg')
      break
    case 'input':
      rolle.push('einstieg', 'kern')
      break
    case 'uebung':
      rolle.push('kern')
      break
    case 'aktiv':
      if (formate.includes('bewegung')) rolle.push('bewegung')
      rolle.push('spiel')
      // Aufwärmen und reine Bewegung tragen kein Ziel – nicht als Kern
      if (s.dauer >= 10 && !/(aufwärm|warm-up|energizer|lockern|pause)/i.test(s.titel) && (formate.includes('rollenspiel') || formate.includes('gespraech') || formate.includes('denkmodell'))) rolle.push('kern')
      break
    case 'skill':
      rolle.push('regulation')
      if (energie >= 2) rolle.push('bewegung')
      break
    case 'abschluss':
      rolle.push('abschluss', 'reflexion')
      break
  }
  const einzel = einzelAusText(text)
  const blattIds = s.blatt ? [s.blatt] : []
  const themen = themenAus([...new Set((s.blatt ? [s.blatt] : e.blaetter).flatMap(blattThemenVon))].slice(0, 2), text)
  // Ziele: das Blatt dieses Schritts trägt sie (primär); sonst nur schwach die Blätter der Einheit
  const eigenesBlatt = s.blatt ? q.blatt.get(s.blatt) : undefined
  const eldib = eigenesBlatt ? eldibBezug(eigenesBlatt.eldib) : eldibBezug(e.blaetter.flatMap((b) => q.blatt.get(b)?.eldib ?? []), false)
  const kursBezug = RE.kursBezug.test(text)
  const bogen = s.phase === 'ankommen' || s.phase === 'abschluss' ? undefined : bogenAusText(text, s.phase === 'input' ? 'verstehen' : s.phase === 'bruecke' ? 'reflektieren' : 'ueben')
  const id = `${art}:${e.id}:${i}`
  const nurSchritt = [s.titel, s.text, ...(s.sagen ?? []), ...(s.punkte ?? []), ...(s.tabelle?.zeilen.flat() ?? [])].join(' ')
  const m: SchrittMeta = {
    id,
    h: hash8(JSON.stringify(s) + (fr ? JSON.stringify(fr) : '')),
    rolle,
    phase: s.phase,
    thema: themen,
    eldib,
    kompetenz: [...new Set(eldib.slice(0, 2).map((x) => kompetenzAusCode(x.code)))],
    alter: { von: alter[0], bis: alter[1] },
    stufen: stufenAus(alter[0], alter[1]),
    // mit einem Kind geht ein Gruppenschritt schneller: kürzbar bis ~40 %
    dauer: dauer(s.dauer, s.phase === 'ankommen' || s.phase === 'abschluss' ? 0.3 : 0.4, 1.2),
    sozialform: ['gruppe'],
    einzeltauglich: einzel.wert,
    energie,
    belastung: RE.belastung2.test(text) ? 2 : RE.belastung1.test(text) ? 1 : 0,
    reiz: energie === 3 || RE.laut.test(text) ? 2 : energie === 2 ? 1 : 0,
    format: formate,
    material: materialAusText(text),
    sprache: { de: true, fr: !!fr },
    qualitaet: kursBezug ? 'entwurf' : 'geprueft',
    sicher: { eldib: 0.4, thema: 0.5, kompetenz: 0.4, rolle: 0.7, bogen: 0.4, alter: 0.7, dauer: 0.6, sozialform: 0.9, einzeltauglich: einzel.sicher, energie: 0.5, belastung: 0.5, reiz: 0.4, format: 0.5, material: 0.5 },
  }
  if (bogen) m.bogen = bogen
  const ort = ortAusText(text)
  if (ort) m.ort = ort
  if (blattIds.length) m.blatt = blattIds.flatMap(bausteineVonBlatt)
  zusatzSchritt(m, nurSchritt)
  return m
}

/** Merkmale, heikel und Anspruch (Rituale) aus dem eigenen Text eines Schritts. */
function zusatzSchritt(m: SchrittMeta, text: string) {
  const mk = merkmaleAusText(text)
  if (mk) m.merkmale = mk
  const se = heikelAusText(text)
  if (se) m.sensibel = se
  if (m.rolle.includes('ankommen') || m.rolle.includes('abschluss')) m.anspruch = anspruchAusText(text)
}

/** Stabile Ids für die Schritte einer Quelle: Id-Nummer aus dem Register, Stelle in der Quelle in `stelle`. */
function schritteMitIds(gruppe: string, liste: { m: SchrittMeta; text: string; i: number }[], nummer: (n: number) => string) {
  const ids = stabileIds(gruppe, liste.map((x) => ({ h: x.m.h, text: x.text })), nummer)
  liste.forEach((x, k) => {
    x.m.id = ids[k]
    const nr = Number(/(\d+)$/.exec(ids[k])?.[1])
    if (nr !== x.i) x.m.stelle = x.i
    schritte.push(x.m)
  })
}

// Skills-Kurs (nur einzelne Schritte, keine Struktur)
const kursSchritte = new Map<string, SchrittMeta[]>()
for (const e of q.kurs) {
  const liste: { m: SchrittMeta; text: string; i: number }[] = []
  e.schritte.forEach((s, i) => {
    const m = kursSchritt('k', e, s, i, [12, 17], null, null)
    if (m) liste.push({ m, text: s.titel + ' ' + s.text, i })
  })
  // Hinweise der Einheit (achtung, vorbereitung, Elternbrief) kommen beim Laden aus der Quelle (E-M4)
  schritteMitIds(`k:${e.id}`, liste, (n) => `k:${e.id}:${n}`)
  kursSchritte.set(e.id, liste.map((x) => x.m))
}
// Brücke zur letzten Einheit: nur, wenn deren Schritte in dieser Folge vorkamen (Voraussetzung)
for (const e of q.kurs) {
  if (e.joker) continue
  const reihe = q.kurs.filter((x) => x.jahr === e.jahr && !x.joker).sort((a, b) => a.nr - b.nr)
  const vor = reihe[reihe.indexOf(e) - 1]
  if (!vor) continue
  const vorige = (kursSchritte.get(vor.id) ?? []).filter((m) => ['uebung', 'input', 'aktiv'].includes(m.phase ?? '')).map((m) => m.id)
  for (const m of kursSchritte.get(e.id) ?? []) {
    const s = e.schritte[m.stelle ?? Number(m.id.split(':')[2])]
    if (m.phase === 'bruecke' && s && RE.vorher.test(s.titel + ' ' + s.text + ' ' + (s.sagen ?? []).join(' ')) && vorige.length) m.voraussetzungen = { schritt: vorige }
  }
}

// Förderfach (7e und Annexe-Ausgabe)
for (const e of q.foerderfach) {
  const liste: { m: SchrittMeta; text: string; i: number }[] = []
  e.de.schritte.forEach((s, i) => {
    const fr = e.fr?.schritte[i] ?? null
    const m = kursSchritt('f', e, s, i, [11, 15], null, fr && fr.phase === s.phase ? fr : null)
    if (m) liste.push({ m, text: s.titel + ' ' + s.text, i })
  })
  schritteMitIds(`f:${e.id}`, liste, (n) => `f:${e.id}:${n}`)
}

// Spielschule: Aktivitäten und Reime der Themenwochen
const DRUCK_ARTEN = new Set(['karten', 'memory', 'suchbild', 'schneiden_kleben', 'bastelbogen', 'minibuch', 'faedelkarte', 'klappbild', 'anziehpuppe', 'laufweg'])
const SP_ROLLE: Record<string, Rolle[]> = {
  kreis: ['einstieg'], bewegung: ['bewegung', 'spiel'], draussen: ['bewegung', 'spiel'], spiel: ['spiel', 'kern'], gestalten: ['kern', 'spiel'],
  ruhe: ['regulation'], sinne: ['regulation', 'kern'], musik: ['spiel', 'bewegung'], sprache: ['kern', 'einstieg'], zaehlen: ['kern'],
  theater: ['kern', 'spiel'], kochen: ['kern'],
}
const SP_FORMAT: Record<string, string[]> = {
  kreis: ['gespraech', 'karten'], bewegung: ['bewegung', 'spiel'], draussen: ['bewegung'], spiel: ['spiel'], gestalten: ['malen', 'basteln'],
  ruhe: ['sinne'], sinne: ['sinne'], musik: ['musik', 'bewegung'], sprache: ['gespraech', 'karten'], zaehlen: ['spiel'], theater: ['rollenspiel'], kochen: ['sinne'],
}
for (const blatt of q.blaetter) {
  if (blatt.bereich !== 'spielschule') continue
  const sp = blatt.de.lehrer.spielschule
  const spFr = blatt.fr?.lehrer.spielschule
  if (!sp) continue
  const themen = themenNachBlatt.get(`spielschule/${blatt.thema}`) ?? []
  // Druckmaterial der Woche (T-M12): Bildkarten, Memory, Suchbild gehören zu Aktivitäten, die sie nennen
  const kartenDerWoche = (blattEinheiten.get(blatt.id) ?? []).filter((x) => x.e.arts.some((a) => ['karten', 'memory', 'suchbild'].includes(a))).map((x) => x.id)
  const spListe: { m: SchrittMeta; text: string; i: number }[] = []
  sp.aktivitaeten.forEach((a, i) => {
    const text = `${a.titel} ${a.text} ${a.material ?? ''}`
    const formate = [...new Set([...(SP_FORMAT[a.art] ?? []), ...formateAusText(text).filter((f) => f !== 'gespraech')])].slice(0, 3)
    const energie: 1 | 2 | 3 = a.art === 'bewegung' || a.art === 'draussen' ? (RE.bewegungStark.test(text) ? 3 : 2) : a.art === 'ruhe' || a.art === 'sinne' ? 1 : energieAusText(text, formate)
    const einzel = einzelAusText(text)
    const leicht = ['bewegung', 'spiel', 'musik', 'gestalten', 'sinne', 'ruhe', 'draussen', 'theater'].includes(a.art)
    const fr = spFr?.aktivitaeten[i]
    const m: SchrittMeta = {
      id: `s:${blatt.id}:a${i}`,
      h: hash8(JSON.stringify(a) + JSON.stringify(fr ?? null)),
      rolle: SP_ROLLE[a.art] ?? ['kern'],
      phase: a.art,
      bogen: a.art === 'kreis' || a.art === 'sprache' ? 'verstehen' : a.art === 'ruhe' || a.art === 'sinne' ? 'wahrnehmen' : 'ueben',
      thema: themenAus(themen, text, 2),
      eldib: eldibBezug([...blatt.eldib, ...(sp.beobachtung ?? []).map((b) => b.eldib)], false),
      kompetenz: [...new Set((KOMPETENZ_BLATT[`spielschule/${blatt.thema}`] ?? ['kooperation']) as Kompetenz[])],
      alter: { von: 3, bis: 6 },
      stufen: ['C1'],
      dauer: dauer(minuten(a.dauer ?? '') ?? 10, 0.4, 1.3),
      sozialform: ['gruppe', 'klasse'],
      einzeltauglich: einzel.wert,
      energie,
      belastung: 0,
      reiz: energie === 3 || RE.laut.test(text) ? 2 : energie === 2 ? 1 : 0,
      format: formate,
      material: [...new Set([...materialAusText(a.material ?? ''), ...(a.art === 'kochen' ? ['kueche'] : [])])],
      sprache: { de: true, fr: !!fr },
      qualitaet: 'geprueft',
      sicher: { eldib: 0.3, thema: 0.5, rolle: 0.6, bogen: 0.4, alter: 0.9, dauer: 0.7, sozialform: 0.9, einzeltauglich: einzel.sicher, energie: 0.6, reiz: 0.5, format: 0.6, material: 0.6, ohneZiel: 0.6, tagesform: 0.5 },
    }
    const ort = a.art === 'draussen' ? 'draussen' : ortAusText(text)
    if (ort) m.ort = ort
    if (leicht && einzel.wert !== 'nein') {
      m.ohneZiel = true
      m.tagesform = tagesformAus(formate, energie)
    }
    if (kartenDerWoche.length && /(bildkarte|karten|kärtchen|memory|suchbild|wimmelbild)/i.test(text)) m.blatt = kartenDerWoche
    else if (/(seite \d|ausschneid|ausdruck)/i.test(text)) {
      // „Seite 2 ausschneiden“: die Pakete dieser Seite des Wochenblatts (Druckmaterial, T-M12)
      const seite = Number(/seite (\d)/i.exec(text)?.[1] ?? 0)
      const umbrueche = blatt.de.bausteine.flatMap((b, i) => (b.art === 'seitenumbruch' ? [i] : []))
      const seiteVon = (i: number) => 1 + umbrueche.filter((u) => u < i).length
      const pakete = (blattEinheiten.get(blatt.id) ?? []).filter((x) => (seite ? seiteVon(x.e.pfad[0]) === seite : x.e.arts.some((a) => DRUCK_ARTEN.has(a))))
      if (pakete.length) m.blatt = pakete.map((x) => x.id)
    }
    zusatzSchritt(m, text)
    spListe.push({ m, text: `${a.titel} ${a.text}`, i })
  })
  schritteMitIds(`s:${blatt.id}`, spListe, (n) => `s:${blatt.id}:a${n}`)
  if (sp.reim) {
    const r = sp.reim
    const fr = spFr?.reim
    schritte.push({
      id: `s:${blatt.id}:reim`,
      h: hash8(JSON.stringify(r) + JSON.stringify(fr ?? null)),
      rolle: ['ankommen', 'abschluss', 'spiel'],
      phase: 'reim',
      thema: [],
      eldib: [],
      kompetenz: [],
      alter: { von: 3, bis: 6 },
      stufen: ['C1'],
      dauer: dauer(3, 0.7, 1.4),
      sozialform: ['einzeln', 'gruppe', 'klasse'],
      einzeltauglich: 'ja',
      energie: 2,
      belastung: 0,
      reiz: 1,
      format: ['musik', 'bewegung'],
      material: [],
      sprache: { de: true, fr: !!fr },
      ohneZiel: true,
      tagesform: ['aufgedreht', 'muede', 'aengstlich', 'will-nicht'],
      qualitaet: 'geprueft',
      anspruch: 1,
      sicher: { rolle: 0.6, alter: 0.9, dauer: 0.7, einzeltauglich: 0.7, energie: 0.6, format: 0.8, ohneZiel: 0.8, tagesform: 0.4 },
    })
  }
}

// Materialien: jede Ablaufphase ein Schritt
function materialRolle(titel: string, text: string, typ: number): Rolle[] | null {
  const t = norm(titel)
  if (/(vorbereitung|projektrahmen|material|vorab|organisation)/.test(t)) return null
  // Einstieg und Abschluss einer Material-Einheit gehören zu deren Inhalt – keine Rituale
  if (/(einstieg|auftakt|hinfuhrung|ankommen|warm|einfuhrung)/.test(t)) return ['einstieg']
  if (/(transfer)/.test(t)) return ['reflexion', 'transfer']
  if (/(abschluss|reflexion|ruckblick|feedback|auswertung|ausklang)/.test(t)) return ['reflexion']
  const r: Rolle[] = ['kern']
  if (RE.bewegungStark.test(text) && typ <= 10) r.push('bewegung')
  if (/(entspann|ruhe|atem|fantasiereise|traumreise|achtsam)/i.test(text) && typ <= 10) r.push('regulation')
  return r
}

for (const mat of q.materialien as Material[]) {
  if (mat.language !== 'de') continue
  const alterVon = Math.min(...mat.ageLevels.map((s) => STUFE_ALTER[s][0]))
  const alterBis = Math.max(...mat.ageLevels.map((s) => STUFE_ALTER[s][1]))
  const fest = [...new Set(mat.themes.flatMap((t) => themenNachMaterial.get(t) ?? []))]
  const gesamt = minuten(mat.duration ?? '') ?? 45
  const individuell = mat.participants.some((p) => p.mode === 'Individuel')
  const mListe: { m: SchrittMeta; text: string; i: number }[] = []
  mat.ablauf.forEach((a, i) => {
    const titel = a.title ?? ''
    const text = `${titel} ${a.text}`
    const typ = minuten(titel) ?? minuten(a.text) ?? Math.round(gesamt / Math.max(1, mat.ablauf.length))
    const rolle = materialRolle(titel, a.text, typ)
    if (!rolle) return
    const formate = formateAusText(text)
    const energie = energieAusText(text, formate)
    const einzel = einzelAusText(a.text)
    const ez: Einzeltauglich = einzel.wert === 'nein' ? 'nein' : individuell ? 'ja' : einzel.wert
    const m: SchrittMeta = {
      id: `m:${mat.id}:${i}`,
      h: hash8(JSON.stringify(a)),
      rolle,
      phase: titel.split(/[–:-]/)[0].trim().slice(0, 30),
      thema: themenAus(fest, text + ' ' + mat.title),
      eldib: eldibBezug(mat.eldibGoals),
      kompetenz: [...new Set(mat.eldibGoals.slice(0, 2).map(kompetenzAusCode))],
      alter: { von: alterVon, bis: alterBis },
      stufen: mat.ageLevels,
      dauer: dauer(typ, 0.5, 1.3),
      sozialform: [...new Set(mat.participants.map((p) => (p.mode === 'Individuel' ? 'einzeln' : p.mode === 'Grupp' ? 'gruppe' : 'klasse') as Sozialform))],
      einzeltauglich: ez,
      energie,
      belastung: RE.belastung2.test(text) ? 2 : RE.belastung1.test(text) ? 1 : 0,
      reiz: energie === 3 || RE.laut.test(text) ? 2 : energie === 2 ? 1 : 0,
      format: formate,
      material: materialAusText((mat.materialsNeeded ?? '') + ' ' + a.text),
      sprache: { de: true, fr: false },
      qualitaet: mat.source === 'generated' ? 'entwurf' : 'geprueft',
      sicher: { eldib: 0.4, thema: 0.5, kompetenz: 0.4, rolle: 0.5, bogen: 0.4, alter: 0.7, dauer: minuten(titel) || minuten(a.text) ? 0.7 : 0.3, sozialform: 0.6, einzeltauglich: individuell ? 0.5 : einzel.sicher, energie: 0.5, belastung: 0.5, reiz: 0.4, format: 0.5, material: 0.5 },
    }
    const bogen = bogenAusText(text, rolle.includes('einstieg') ? 'wahrnehmen' : rolle.includes('abschluss') ? 'reflektieren' : 'ueben')
    if (bogen) m.bogen = bogen
    const ort = ortAusText(a.text)
    if (ort) m.ort = ort
    zusatzSchritt(m, text)
    // leichte Aktivität ohne Förderziel (Weg 3): Spiel, Bewegung, Kreatives, Sinne – ohne Belastung, Wettbewerb, Gruppe
    const leichtesThema = mat.themes.some((x) => ['spiel-spass', 'bewegung', 'kreativitaet', 'achtsamkeit'].includes(x))
    const leichtesFormat = formate.some((f) => ['spiel', 'bewegung', 'malen', 'basteln', 'musik', 'sinne', 'atmen'].includes(f)) && !formate.includes('schreiben')
    if (leichtesThema && leichtesFormat && rolle.includes('kern') && m.belastung === 0 && ez === 'ja' && !m.merkmale?.wettbewerb && !m.merkmale?.katharsis && typ <= 20) {
      m.ohneZiel = true
      m.tagesform = tagesformAus(formate, energie)
      if (!m.rolle.includes('spiel')) m.rolle = [...m.rolle, 'spiel']
    }
    mListe.push({ m, text, i })
  })
  schritteMitIds(`m:${mat.id}`, mListe, (n) => `m:${mat.id}:${n}`)
}

// CREW-Spiele (Jugendliche, iPad/Beamer)
for (const thema of q.crew.themen) {
  for (const s of thema.spiele) {
    const text = `${s.name} ${s.text} ${s.foerdert}`
    const codes = [...s.foerdert.matchAll(/(V|K|SOZ|KOG)-\d+/g)].map((m) => m[0])
    const einzeln: Einzeltauglich = /^(Solo|Solo \+ Austausch|Zu zweit an einem iPad|Gerät weitergeben)$/.test(s.format) ? 'ja' : 'nein'
    const bewegung = s.format === 'Bewegung im Raum'
    const ankommen = thema.name.startsWith('Ankommen')
    const formate = [...new Set(['digital', 'spiel', ...(bewegung ? ['bewegung'] : []), ...formateAusText(text).filter((f) => ['gespraech', 'denkmodell', 'karten', 'rollenspiel'].includes(f))])].slice(0, 4)
    const m: SchrittMeta = {
      id: `c:${s.id}`,
      h: hash8(JSON.stringify(s)),
      rolle: ankommen ? ['spiel', 'einstieg'] : bewegung ? ['spiel', 'bewegung'] : ['spiel', 'kern'],
      phase: s.format,
      bogen: ankommen ? 'wahrnehmen' : 'ueben',
      thema: themenAus([], text, 2),
      eldib: eldibBezug(codes),
      kompetenz: [...new Set(codes.slice(0, 2).map(kompetenzAusCode))],
      alter: { von: 12, bis: 17 },
      stufen: ['ES'],
      dauer: dauer(minuten(s.dauer) ?? 6, 0.7, 1.3),
      sozialform: einzeln === 'ja' ? ['zu-zweit', 'gruppe'] : ['gruppe'],
      einzeltauglich: einzeln,
      energie: bewegung ? 2 : 1,
      belastung: RE.belastung2.test(text) ? 2 : 0,
      reiz: bewegung ? 2 : 1,
      format: formate,
      material: ['ipad'],
      sprache: { de: true, fr: false },
      qualitaet: 'entwurf',
      sicher: { eldib: 0.6, thema: 0.4, kompetenz: 0.5, rolle: 0.5, bogen: 0.4, alter: 0.8, dauer: 0.8, sozialform: 0.7, einzeltauglich: 0.6, energie: 0.6, format: 0.6, material: 0.9, ohneZiel: 0.5, tagesform: 0.4 },
    }
    if (ankommen && einzeln === 'ja') {
      m.ohneZiel = true
      m.tagesform = ['will-nicht', 'rueckzug', 'traurig', 'muede']
    }
    zusatzSchritt(m, text)
    schritte.push(m)
  }
}

// ---------------------------------------------------------------------------------------------------------------
// 3. Höhen messen (react-pdf + PyMuPDF), inkrementell mit Cache
// ---------------------------------------------------------------------------------------------------------------

registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const BREITE = 595.28 - SEITE.rand * 2
const PT_MM = 25.4 / 72
const OBEN = 20
const SEITE_UNTEN = 841.89 - (SEITE.unten + 6)

type Cache = { v: 1; hoehen: Record<string, number>; seite?: BausteineDatei['seite']; stilHash?: string }
const STIL = stilHash()
const cache: Cache = existsSync(CACHE) ? (JSON.parse(readFileSync(CACHE, 'utf8')) as Cache) : { v: 1, hoehen: {}, stilHash: STIL }
// Gestaltung geändert (S13): alte Höhen gelten nicht mehr
if (cache.stilHash && cache.stilHash !== STIL) {
  console.log('Gestaltung geändert (stil.ts/BLATT-STIL.md) – Höhen werden neu gemessen.')
  cache.hoehen = {}
  delete cache.seite
}
cache.stilHash ??= STIL
const speichereCache = () => {
  mkdirSync(join(ROOT, 'tmp'), { recursive: true })
  writeFileSync(CACHE, JSON.stringify(cache))
}

/** Gestaltungen, in denen ein Baustein vorkommen kann: die seiner Stufen und der Nachbarstufen (Abstand < 2),
 *  für Jugendliche nie bild/gross. */
function layoutsFuer(b: MikroBaustein): Layout[] {
  const l = new Set<Layout>()
  for (const s of STUFEN) {
    const naechste = Math.min(...b.stufen.map((x) => Math.abs(STUFEN.indexOf(x) - STUFEN.indexOf(s))))
    if (naechste < 2) l.add(layoutAusStufe(s))
  }
  return LAYOUTS.filter((x) => l.has(x))
}

const PY_MESSEN = `
import json, sys, pymupdf
auftrag = json.load(open(sys.argv[1]))
out = []
for f in auftrag['dateien']:
    d = pymupdf.open(f)
    for p in d:
        y = 0
        for b in p.get_text('dict')['blocks']:
            y = max(y, b['bbox'][3])
        for g in p.get_drawings():
            r = g['rect']
            if r.height < 2000:
                y = max(y, r.y1)
        for im in p.get_image_info():
            y = max(y, im['bbox'][3])
        out.append(y)
print(json.dumps(out))
`

async function messeHoehen(auftraege: { key: string; layout: Layout; liste: Baustein[]; bereich: string; sprache: BlattSprache }[]) {
  const tmp = mkdtempSync(join(tmpdir(), 'pg-hoehen-'))
  const STAPEL = 120
  let fertig = 0
  try {
    for (let i = 0; i < auftraege.length; i += STAPEL) {
      const teil = auftraege.slice(i, i + STAPEL)
      const datei = join(tmp, `s${i}.pdf`)
      const doc = (
        <Document>
          {teil.map((a, k) => {
            const p = palette((bereichById.get(a.bereich as never) ?? bereichById.get('gefuehle')!).farben)
            const c: Ctx = { m: MASSE[a.layout], p, sprache: a.sprache, nummern: nummernVon(a.liste), breite: BREITE }
            return (
              <Page key={k} size={[595.28, 3000]} style={{ paddingHorizontal: SEITE.rand, paddingTop: OBEN }}>
                <Bausteine c={c} liste={a.liste} />
              </Page>
            )
          })}
        </Document>
      )
      writeFileSync(datei, await renderToBuffer(doc))
      const liste = join(tmp, 'liste.json')
      writeFileSync(liste, JSON.stringify({ dateien: [datei] }))
      const ys = JSON.parse(execFileSync('python3', ['-c', PY_MESSEN, liste], { maxBuffer: 64 * 1024 * 1024 }).toString()) as number[]
      teil.forEach((a, k) => {
        const mm = Math.round(Math.max(0, (ys[k] ?? OBEN) - OBEN) * PT_MM * 10) / 10
        cache.hoehen[a.key] = Math.max(cache.hoehen[a.key] ?? 0, mm)
      })
      fertig += teil.length
      speichereCache()
      console.log(`  Höhen: ${fertig} / ${auftraege.length} (${Math.round((Date.now() - t0) / 1000)} s)`)
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

/** Nutzbare Höhe der Seiten eines Kinderblatts je Gestaltung: Kopf, Titel und „Mein Ziel“ auf Seite 1, kleiner
 *  Kopf auf Seite 2 (gemessen an einem Probeblatt mit Marken). */
async function messeSeiten(): Promise<BausteineDatei['seite']> {
  const tmp = mkdtempSync(join(tmpdir(), 'pg-seite-'))
  const out: BausteineDatei['seite'] = {}
  const py = `
import json, sys, pymupdf
d = pymupdf.open(sys.argv[1])
r = []
for p in d:
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            for s in l['spans']:
                if 'MESSMARKE' in s['text']:
                    r.append([p.number, l['bbox'][1]])
print(json.dumps(r))
`
  try {
    for (const layout of LAYOUTS) {
      const stufe: Stufe = layout === 'bild' ? 'C1' : layout === 'gross' ? 'C2' : layout === 'mittel' ? 'C3' : 'ES'
      const blatt: Blatt = {
        id: 'pg-messen', bereich: 'verhalten', thema: 'impulse', stufen: [stufe], layout, sozialform: ['einzeln'], dauer: '30 Min.', eldib: [], schlagworte: [],
        passgenau: { ziel: { de: 'Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten und bei Übergängen.' }, herkunft: 'Bausteine aus G-01, S-18' },
        de: {
          titel: 'Mein Stopp-Plan',
          bausteine: [{ art: 'text', text: 'MESSMARKE' }, { art: 'seitenumbruch' }, { art: 'text', text: 'MESSMARKE' }],
          lehrer: { ziel: '', ablauf: [], hintergrund: '' },
        },
      }
      const datei = join(tmp, `${layout}.pdf`)
      writeFileSync(datei, await renderToBuffer(<BlattDokument blatt={blatt} opt={{ lehrer: false }} />))
      const r = JSON.parse(execFileSync('python3', ['-c', py, datei]).toString()) as [number, number][]
      const erste = r.find((x) => x[0] === 0)?.[1] ?? 200
      const folge = r.find((x) => x[0] === 1)?.[1] ?? 80
      out[layout] = {
        erste: Math.round((SEITE_UNTEN - erste) * PT_MM * 10) / 10,
        folge: Math.round((SEITE_UNTEN - folge) * PT_MM * 10) / 10,
        abstand: Math.round(MASSE[layout].abstand * 0.75 * PT_MM * 10) / 10,
      }
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
  return out
}

const auftraege: Parameters<typeof messeHoehen>[0] = []
for (const b of bausteine) {
  const blatt = q.blatt.get(b.quelle.blatt)!
  for (const layout of layoutsFuer(b)) {
    const key = `${b.h}|${layout}`
    if (key in cache.hoehen) continue
    if (NUR && !NUR.includes(blatt.id)) continue
    auftraege.push({ key, layout, liste: paketBausteine(blatt, b.quelle.pfad, 'de'), bereich: blatt.bereich, sprache: 'de' })
    if (b.sprache.fr) auftraege.push({ key, layout, liste: paketBausteine(blatt, b.quelle.pfad, 'fr'), bereich: blatt.bereich, sprache: 'fr' })
  }
}
if (!OHNE_HOEHEN) {
  if (!cache.seite || args.includes('--seiten')) {
    cache.seite = await messeSeiten()
    speichereCache()
    console.log('Seitenmaße:', JSON.stringify(cache.seite))
  }
  if (auftraege.length) {
    console.log(`Höhen messen: ${auftraege.length} Renderläufe …`)
    await messeHoehen(auftraege)
  }
}
let mitHoehe = 0
for (const b of bausteine) {
  for (const layout of layoutsFuer(b)) {
    const h = cache.hoehen[`${b.h}|${layout}`]
    if (h !== undefined) b.hoehe[layout] = h
  }
  if (Object.keys(b.hoehe).length) {
    mitHoehe++
    b.sicher.hoehe = 1
  }
}

// ---------------------------------------------------------------------------------------------------------------
// 4. Schreiben und zählen
// ---------------------------------------------------------------------------------------------------------------

mkdirSync(AUS, { recursive: true })
const sicherB = new SicherTabelle()
const sicherS = new SicherTabelle()
const bRoh = bausteine.map((b) => packeBaustein(b, sicherB))
const sRoh = schritte.map((s) => packeSchritt(s, sicherS))
const bDatei: BausteineDatei = { v: 1, stand: STAND, stilHash: cache.stilHash, seite: cache.seite ?? {}, sicher: sicherB.muster, bausteine: bRoh }
const sDatei: SchritteDatei = { v: 1, stand: STAND, sicher: sicherS.muster, schritte: sRoh }
writeFileSync(join(AUS, 'bausteine.json'), JSON.stringify(bDatei))
writeFileSync(REGISTER, JSON.stringify(register))
writeFileSync(join(AUS, 'schritte.json'), JSON.stringify(sDatei))
speichereCache()

// Felder: automatisch sicher (1) / vorbefüllt (< 1) – je Einheit 24 Felder wie im Konzept
const FELDER_B = 24
let sicherFelder = 0
let alleFelder = 0
const zaehleSicher = (s: Record<string, number>, n: number) => {
  const unsicher = Object.values(s).filter((x) => x < 0.7).length
  sicherFelder += n - unsicher
  alleFelder += n
}
bausteine.forEach((b) => zaehleSicher(b.sicher, FELDER_B))
schritte.forEach((s) => zaehleSicher(s.sicher, FELDER_B))
const zaehl = <T,>(l: T[], f: (x: T) => string) => l.reduce<Record<string, number>>((a, x) => ((a[f(x)] = (a[f(x)] ?? 0) + 1), a), {})
console.log(`\nMikro-Bausteine: ${bausteine.length} (${nPakete} Aufgabenpakete, ${nFrei} freie), mit Höhe: ${mitHoehe}`)
console.log('Stundenschritte:', schritte.length, zaehl(schritte, (s) => s.id.split(':')[0]))
console.log('  einzeltauglich:', zaehl(schritte, (s) => s.einzeltauglich), ' ohneZiel:', schritte.filter((s) => s.ohneZiel).length + bausteine.filter((b) => b.ohneZiel).length)
console.log('  Rollen:', zaehl(schritte.flatMap((s) => s.rolle), (r) => r))
console.log(`Felder sicher (≥ 0,7): ${sicherFelder} von ${alleFelder} (${Math.round((100 * sicherFelder) / alleFelder)} %)`)
console.log(`Neue Inhalte (src/data/passgenau/inhalte): ${q.inhalte.length} Dateien`)
console.log(`Größe: bausteine.json ${Math.round(JSON.stringify(bDatei).length / 1024)} KB, schritte.json ${Math.round(JSON.stringify(sDatei).length / 1024)} KB · ${Math.round((Date.now() - t0) / 1000)} s`)
