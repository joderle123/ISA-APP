// ---------------------------------------------------------------------------
// Offline "chatbot" brain: turn a free-text German description of a pupil /
// situation into structured signals, then rank the library by fit.
// Fully client-side & deterministic — no network, no LLM at runtime.
// ---------------------------------------------------------------------------
import type { AgeLevel, Material, MaterialType, ParticipantMode } from '../types/material'
import { emptyFilter, type FilterState } from './filter'
import { themeLabel } from '../data/taxonomy'

export interface Signals {
  themes: string[]
  ages: AgeLevel[]
  types: MaterialType[]
  participants: ParticipantMode[]
  wantWorksheet: boolean | null
  keywords: string[]
}

export const emptySignals: Signals = {
  themes: [], ages: [], types: [], participants: [], wantWorksheet: null, keywords: [],
}

// --- theme lexicon: word/stem regex → theme id(s) ---------------------------
const THEME_WORDS: [RegExp, string[]][] = [
  [/w(u|ü)t|aggress|ausrast|zorn|reizbar|explod|jähzorn|tobsucht/, ['emotionen', 'impulskontrolle']],
  [/impuls|selbstkontroll|beherrsch|durchdreh|innehalten|stopp.?denk/, ['impulskontrolle']],
  [/gef(ü|ue)hl|emotion|traurig|weinen|angst\b|freude|w(ü|ue)tend|stimmung/, ['emotionen']],
  [/streit|konflikt|zank|auseinandersetz|vers(ö|oe)hn|schlicht|zoff/, ['konfliktloesung']],
  [/mobbing|ausgrenz|geh(ä|ae)nselt|schikan|(aus)?lachen.*(kind|sch(ü|ue)ler)|cybermobbing/, ['mobbing']],
  [/selbstvertrauen|selbstwert|minderwert|selbstbewuss|selbstzweifel|traut sich (nichts|nicht)/, ['selbstwertgefuehl']],
  [/selbstwahrnehm|(meine|eigene) st(ä|ae)rk|schw(ä|ae)ch|wer bin ich|(ü|ue)ber sich|selbstreflex/, ['selbstwahrnehmung']],
  [/identit(ä|ae)t|herkunft|zugeh(ö|oe)r|wurzeln|ich-?bild/, ['identitaet']],
  [/kommunik|zuh(ö|oe)r|gespr(ä|ae)ch|ich-?botschaft|miteinander reden|sich mitteilen/, ['kommunikation']],
  [/kooperat|zusammenarbeit|teamwork|team\b|gemeinsam.*(l(ö|oe)s|aufgabe)|an einem strang/, ['kooperation']],
  [/freundschaft|freunde find|kennenlern|kontakt.*(kn(ü|ue)pf|aufbau)|neu in der (klasse|gruppe)/, ['beziehungsaufbau']],
  [/perspektiv|fremdwahrnehm|andere.*(sicht|augen)|einf(ü|ue)hl|empathie|mitgef(ü|ue)hl/, ['fremdwahrnehmung']],
  [/achtsam|entspann|ruhe\b|atem|meditat|stille|zur ruhe/, ['achtsamkeit']],
  [/beweg|sport|toben|motorik|k(ö|oe)rperspiel|auspowern/, ['bewegung']],
  [/spielerisch|spa(ß|ss)|kennenlernspiel|energizer|auflocker/, ['spiel-spass']],
  [/resilien|widerstand|krise|r(ü|ue)ckschlag|durchhalt|nicht aufgeben|scheitern/, ['resilienz']],
  [/stress|(ü|ue)berforder|(unter )?druck|pr(ü|ue)fungsangst|zeitdruck|(zu )?viel los/, ['stressbewaeltigung']],
  [/ressource|kraftquelle|kraft tank|energie.*(quelle|tank)/, ['ressourcen']],
  [/kreativ|basteln|malen|erfinden|fantasie|gestalten/, ['kreativitaet']],
  [/grenze|nein ?sagen|konsens|(ü|ue)bergriff|pers(ö|oe)nlicher raum/, ['grenzen']],
  [/diszipl|konzentr|aufmerksam(keit)?|dranbleib|hausaufgab|lernorganis|abschweif/, ['disziplin']],
  [/motivation|antrieb|ziel(e)? (setzen|erreichen)|lernlust|keine lust|aufraffen/, ['motivation']],
  [/gerecht|\bfair(ness)?\b|unfair|regeln.*(gemeinsam|klasse)/, ['gerechtigkeit']],
  [/gewalt|schlagen|pr(ü|ue)geln|hauen|k(ö|oe)rperlich.*(aggress|angriff)/, ['gewalt']],
  [/medien|handy|smartphone|social ?media|tiktok|insta|snap|bildschirm|internet|online|gaming|zocken|computer|youtube/, ['medien']],
  [/sexual|aufkl(ä|ae)rung|k(ö|oe)rperwissen|schamgef/, ['sexualitaet']],
  [/liebe|verliebt|dating|(erste )?beziehung|schwarm|herzschmerz|liebeskummer|eifersucht|schluss gemacht/, ['liebe-beziehungen']],
  [/k(ö|oe)rperbild|selbstbild|aussehen|essst(ö|oe)r|magersucht|pubert(ä|ae)t|body/, ['koerper-selbstbild']],
  [/depress|psychisch|seelisch|panik|suizid|selbstverletz|ritzen|niedergeschlagen|dunkle gedanken/, ['psychische-gesundheit']],
  [/sucht|alkohol|drogen|cannabis|kiff|\bvap|dampfen|rauchen|nikotin|abh(ä|ae)ngig|gl(ü|ue)cksspiel/, ['sucht-praevention']],
  [/gruppendruck|peer.?druck|mitl(ä|ae)ufer|dazugeh(ö|oe)ren.*(druck|m(ü|ue)ssen)|weil alle/, ['gruppendruck']],
  [/diskrimin|rassism|vorurteil|vielfalt|inklusion|lgbt|queer|toleranz|anders ?sein/, ['diskriminierung-vielfalt']],
  [/demokrat|mitbestimm|zivilcourage|engagement|w(ä|ae)hl|politik|\bwerte\b|verantwortung.*gesellschaft/, ['demokratie-engagement']],
  [/\bberuf|zukunft|berufswahl|(ü|ue)bergang.*(schule|arbeit)|praktikum|karriere|was werden/, ['zukunft-beruf']],
  [/\bgeld\b|finanz|konsum|werbung|taschengeld|sparen|schulden|kaufen/, ['geld-konsum']],
]

const AGE_MAP: Record<string, AgeLevel> = { c1: 'C1', c2: 'C2', c3: 'C3', c4: 'C4', es: 'ES' }
const yearsToAge = (y: number): AgeLevel =>
  y <= 5 ? 'C1' : y <= 7 ? 'C2' : y <= 9 ? 'C3' : y <= 11 ? 'C4' : 'ES'
const klasseToAge = (k: number): AgeLevel =>
  k <= 0 ? 'C1' : k <= 2 ? 'C2' : k <= 4 ? 'C3' : k <= 6 ? 'C4' : 'ES'

const STOP = new Set(
  'ich habe einen eine der die das den dem und oder aber mit für fuer auf in im an am zu zur zum von vom bei ist sind war wird man wir ihr sie du es als wie wenn dann auch nur noch schon sehr ganz alle alles mein meine meinen schüler schülerin schueler schuelerin schülern kind kinder klasse klassen jahre jahr alt arbeiten will möchte moechte suche brauche etwas passendes passende material materialien thema themen gruppe gruppen gerne eher lieber viel gut sich sein seine ihre einer eines diese dieser jeder jede jungen mädchen maedchen ganze ganzen ganzer neue neuer neues neuen schuljahr schulstufe kleingruppe kleingruppen gruppenarbeit einzelarbeit sozialform plenum arbeitsblatt arbeitsblätter arbeitsblaetter aktivität aktivitaet stunde stunden projekt projekte üben ueben'.split(
    /\s+/,
  ),
)

function detectAges(t: string): AgeLevel[] {
  const set = new Set<AgeLevel>()
  for (const m of t.matchAll(/\bc\s?-?([1-4])\b/g)) set.add(AGE_MAP['c' + m[1]])
  if (/\bes\b|sekundar|secondaire|lyc(é|e)e|gymnasium|oberstufe|teenager|jugendlich/.test(t)) set.add('ES')
  if (/pr(é|e)coce|spillschoul|kindergarten|vorschul|kita/.test(t)) set.add('C1')
  for (const m of t.matchAll(/(\d{1,2})\s*(?:\.|-)?\s*(?:klasse|schuljahr|schulstufe)/g)) set.add(klasseToAge(+m[1]))
  for (const m of t.matchAll(/(\d{1,2})\s*(?:-|bis)\s*(\d{1,2})\s*(?:jahre|j\b)/g)) {
    set.add(yearsToAge(+m[1])); set.add(yearsToAge(+m[2]))
  }
  for (const m of t.matchAll(/(\d{1,2})[\s-]*(?:jahre|j(ä|ae)hrig|jahr\b)/g)) set.add(yearsToAge(+m[1]))
  return [...set]
}

function detectParticipants(t: string): ParticipantMode[] {
  const set = new Set<ParticipantMode>()
  if (/grupp|zu (zweit|dritt|viert)|partner|team/.test(t)) set.add('Grupp')
  if (/plenum|ganze klasse|gesamte klasse|im klassenverband|alle zusammen|mit der klasse|klassenweit/.test(t)) set.add('Klass')
  if (/einzeln|allein|individuell|1:1|einzelarbeit|f(ü|ue)r sich|alleine/.test(t)) set.add('Individuel')
  return [...set]
}

function detectTypes(t: string): MaterialType[] {
  const set = new Set<MaterialType>()
  if (/kurz|schnell|aktivit(ä|ae)t|(kleine )?(ü|ue)bung|energizer|\d+ ?min|zwischendurch/.test(t)) set.add('Aktivitéit')
  if (/stunde|lektion|kursstunde|doppelstunde|unterrichtsstunde|ganze stunde/.test(t)) set.add('ganz Stonn')
  if (/projekt|(ü|ue)ber (mehrere )?wochen|langfristig|projektwoche/.test(t)) set.add('Projet')
  return [...set]
}

function detectWorksheet(t: string): boolean | null {
  if (/ohne arbeitsblatt|kein(e)? arbeitsblatt|keine? schreib|nur (eine )?aktivit(ä|ae)t|nichts zum ausf(ü|ue)llen/.test(t)) return false
  if (/arbeitsblatt|ausdruck|schriftlich|zum ausf(ü|ue)llen|ausf(ü|ue)llen|handout|zum schreiben|blatt\b|dokument/.test(t)) return true
  return null
}

export function parse(text: string): Signals {
  const t = ' ' + text.toLowerCase().replace(/[\n\r]+/g, ' ') + ' '
  const themes = new Set<string>()
  for (const [re, ids] of THEME_WORDS) if (re.test(t)) ids.forEach((id) => themes.add(id))
  const ages = detectAges(t)
  const participants = detectParticipants(t)
  const types = detectTypes(t)
  const wantWorksheet = detectWorksheet(t)
  // free interest keywords: explicit "interessiert sich für X / mag X / Fan von X / Thema X"
  const keywords = new Set<string>()
  for (const m of text.matchAll(/(?:interessiert sich f(?:ü|ue)r|interesse an|mag|fan von|liebt|thema|rund um|geht um)\s+([a-zä-üA-ZÄ-Ü][\wäöüß-]{2,})/gi))
    keywords.add(m[1].toLowerCase())
  // plus any remaining capitalised nouns (likely interests / topics) not consumed
  for (const w of text.split(/[^A-Za-zÄÖÜäöüß-]+/)) {
    const lw = w.toLowerCase()
    if (w.length >= 4 && /^[A-ZÄÖÜ]/.test(w) && !STOP.has(lw)) keywords.add(lw)
  }
  return { themes: [...themes], ages, participants, types, wantWorksheet, keywords: [...keywords].slice(0, 8) }
}

/** Refine accumulated signals with a new message (topics accumulate, the
 *  rest override when the new message specifies them). */
export function mergeSignals(base: Signals, add: Signals): Signals {
  return {
    themes: [...new Set([...base.themes, ...add.themes])],
    ages: add.ages.length ? add.ages : base.ages,
    participants: add.participants.length ? add.participants : base.participants,
    types: add.types.length ? add.types : base.types,
    wantWorksheet: add.wantWorksheet !== null ? add.wantWorksheet : base.wantWorksheet,
    keywords: [...new Set([...base.keywords, ...add.keywords])].slice(0, 10),
  }
}

export interface Ranked {
  material: Material
  score: number
  percent: number
  reasons: string[]
}

export function hasAnySignal(s: Signals): boolean {
  return !!(s.themes.length || s.ages.length || s.participants.length || s.types.length || s.wantWorksheet !== null || s.keywords.length)
}

export function rank(materials: Material[], s: Signals, ratings: Record<string, number>): Ranked[] {
  if (!hasAnySignal(s)) return []
  const MAX = s.themes.length * 10 + 6 + 4 + 3 + 4 + s.keywords.length * 3 || 1
  const out: Ranked[] = []
  for (const m of materials) {
    let score = 0
    const reasons: string[] = []
    const tHit = s.themes.filter((t) => m.themes.includes(t))
    if (tHit.length) { score += tHit.length * 10; reasons.push('Thema ' + tHit.map(themeLabel).join(', ')) }
    if (s.ages.length) {
      if (s.ages.some((a) => m.ageLevels.includes(a))) { score += 6; reasons.push('Alter ' + m.ageLevels.join('/')) }
      else score -= 6
    }
    if (s.participants.length && s.participants.some((p) => m.participants.some((mp) => mp.mode === p))) {
      score += 4; reasons.push('Sozialform passt')
    }
    if (s.types.length && s.types.some((ty) => m.type.includes(ty))) { score += 3; reasons.push('Format passt') }
    if (s.wantWorksheet === true) { if (m.worksheet) { score += 4; reasons.push('mit Arbeitsblatt') } else score -= 7 }
    if (s.wantWorksheet === false && m.worksheet) score -= 1
    if (s.keywords.length) {
      const hay = (m.title + ' ' + m.shortDescription + ' ' + m.tags.join(' ') + ' ' + m.themes.map(themeLabel).join(' ')).toLowerCase()
      const kw = s.keywords.filter((k) => hay.includes(k))
      if (kw.length) { score += kw.length * 3; reasons.push('Interesse: ' + kw.join(', ')) }
    }
    if (score > 0) {
      score += (ratings[m.id] || 0) * 0.4
      out.push({ material: m, score, percent: Math.max(8, Math.min(100, Math.round((score / MAX) * 100))), reasons })
    }
  }
  return out.sort((a, b) => b.score - a.score || (ratings[b.material.id] || 0) - (ratings[a.material.id] || 0))
}

/** Human-readable chips describing what the bot understood. */
export function describe(s: Signals): string[] {
  const out: string[] = []
  if (s.ages.length) out.push('Alter: ' + s.ages.join('/'))
  if (s.themes.length) out.push('Thema: ' + s.themes.map(themeLabel).join(', '))
  if (s.participants.length) {
    const map: Record<ParticipantMode, string> = { Individuel: 'Einzeln', Grupp: 'Gruppe', Klass: 'Klasse' }
    out.push('Sozialform: ' + s.participants.map((p) => map[p]).join('/'))
  }
  if (s.types.length) {
    const map: Record<MaterialType, string> = { 'Aktivitéit': 'Aktivität', 'ganz Stonn': 'Stunde', Projet: 'Projekt', Hospi: 'Hospitation' }
    out.push('Format: ' + s.types.map((t) => map[t]).join('/'))
  }
  if (s.wantWorksheet === true) out.push('mit Arbeitsblatt')
  if (s.wantWorksheet === false) out.push('ohne Arbeitsblatt')
  if (s.keywords.length) out.push('Interesse: ' + s.keywords.join(', '))
  return out
}

export function signalsToFilter(s: Signals): FilterState {
  return {
    ...emptyFilter,
    themes: s.themes,
    ageLevels: s.ages,
    types: s.types,
    participantModes: s.participants,
    hasWorksheet: s.wantWorksheet === true,
  }
}
