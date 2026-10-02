// Prüft das Förderfach (src/data/foerderfach): Jahrespläne, ausgearbeitete Einheiten,
// Handbuchtexte und Schülerblätter – Aufbau, Nummern, Trimester, beide Sprachen gleich
// aufgebaut, lückenlose Minuten, vorhandene Blätter, geprüfte Quellen und Stil.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-pruefen.ts [entwurf.json …] [--streng]
// Ohne Dateien: alles, dazu alle Entwürfe in src/data/foerderfach/entwurf. Mit Dateien: nur diese
// Entwürfe (je Einheit eine Datei { einheiten: [...], blaetter: [...] }, siehe EINHEITEN-STIL.md).
// Die Blätter laufen zusätzlich durch scripts/blatt-pruefen.ts (Regeln der Toolbox), ohne die
// Regeln, die im Förderfach nicht gelten (ELDiB-Ziele, Lehrerseite – sie wird nicht gedruckt).
// Fehler → Exit-Code 1. Hinweise (Stil) werden nur gezeigt; mit --streng zählen sie als Fehler.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { EINHEITEN, HANDBUCH, PLAENE, BLAETTER, VORLAGEN } from '../src/foerderfach/daten'
import { KOMPETENZEN, PHASEN } from '../src/foerderfach/fach'
import { QUELLEN_TEXTE } from '../src/blatt/quellen'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, EinheitText, Phase, Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENTWURF = join(ROOT, 'src/data/foerderfach/entwurf')
const args = process.argv.slice(2)
const streng = args.includes('--streng')
const dateien = args.filter((a) => a.endsWith('.json'))
const alles = dateien.length === 0

let fehler = 0
let hinweise = 0
function melde(art: 'F' | 'H', wo: string, text: string) {
  if (art === 'F' || streng) fehler++
  else hinweise++
  console.log(`${art === 'F' ? '✗' : '·'} ${wo}: ${text}`)
}

const SPRACHEN: Sprache[] = ['de', 'fr']
const KOMP = new Set(KOMPETENZEN.map((k) => k.id))

/** Blätter, die eine Einheit anlegt und spätere Einheiten weiterverwenden (EINHEITEN-STIL.md, Abschnitt 7). */
const GEMEINSAM: Record<string, string> = {
  'ff7-glas-der-beduerfnisse': 'ff7-e06',
  'ff7-baum-der-staerke': 'ff7-e08',
  'ff7-skills-tester': 'ff7-e14',
  'ff7-skills-koffer': 'ff7-e17',
  'ff5-skills-radar': 'ff5-e02',
  'ff5-sicherheitsplan': 'ff5-e20',
  'ff5-mein-netz': 'ff5-e22',
}

// --- Entwürfe laden --------------------------------------------------------------------------------
interface Entwurf {
  datei: string
  einheiten: Einheit[]
  blaetter: Blatt[]
}
function ladeEntwurf(datei: string): Entwurf | null {
  try {
    const d = JSON.parse(readFileSync(datei, 'utf8')) as EinheitenDatei
    if (!Array.isArray(d.einheiten)) throw new Error('„einheiten“ fehlt')
    return { datei, einheiten: d.einheiten, blaetter: d.blaetter ?? [] }
  } catch (e) {
    melde('F', basename(datei), 'kein gültiger Entwurf: ' + (e as Error).message)
    return null
  }
}
const alleEntwuerfe: Entwurf[] = existsSync(ENTWURF)
  ? readdirSync(ENTWURF)
      .filter((d) => d.endsWith('.json'))
      .sort()
      .map((d) => ladeEntwurf(join(ENTWURF, d)))
      .filter((x): x is Entwurf => !!x)
  : []
const pruefEntwuerfe: Entwurf[] = alles ? alleEntwuerfe : dateien.map((d) => ladeEntwurf(d)).filter((x): x is Entwurf => !!x)

/** Alle bekannten Blätter: Werkzeuge und fertige Blätter, dazu die Blätter aller Entwürfe */
const blattListe: Blatt[] = [...BLAETTER]
for (const x of [...alleEntwuerfe, ...pruefEntwuerfe]) for (const b of x.blaetter) if (!blattListe.some((y) => y.id === b.id)) blattListe.push(b)
const blattById = new Map(blattListe.map((b) => [b.id, b]))

// --- Stil ----------------------------------------------------------------------------------
const FLOSKELN: Record<Sprache, [RegExp, string][]> = {
  de: [
    [/(^|[.!?:] )In dieser (Einheit|Stunde)/, '„In dieser Einheit …“ als Einstieg'],
    [/tauchen wir ein/i, '„Heute tauchen wir ein …“'],
    [/\bspannend/i, '„spannend“'],
    [/\bReise\b|Entdeckungsreise/i, '„Reise“-Metapher'],
    [/magisch|Superkraft|ganzheitlich|Zauber/i, 'Modewort'],
    [/\blass(t)? uns\b/i, '„Lass uns …“'],
    [/Viel Spa(ß|ss)/i, '„Viel Spaß“'],
    [/Wusstest du/i, '„Wusstest du …“'],
    [/Mindset/i, '„Mindset“'],
    [/Es ist (sehr )?wichtig,? (zu|dass)/i, '„Es ist wichtig …“'],
    [/Gefühle sind wichtig|Kommunikation ist der Schlüssel/i, 'Allgemeinplatz'],
    [/«|»/, 'französische Anführungszeichen im deutschen Text'],
    [/\bLeitung\b/, '„Leitung“ – im Fach heißt es „Lehrkraft“'],
    [/\bImbiss\b/, 'Imbiss – im Fach gibt es keinen'],
    [/\bKlassenarbeit/, '„Klassenarbeit“ – in Luxemburg „Test“'],
  ],
  fr: [
    [/Dans cette séance/i, '« Dans cette séance… »'],
    [/voyage|aventure/i, 'métaphore du voyage'],
    [/magique|super-pouvoir|holistique/i, 'mot à la mode'],
    [/Amusez-vous bien|Bon amusement/i, '« Amusez-vous bien »'],
    [/Saviez-vous|Le saviez-vous/i, '« Le saviez-vous »'],
    [/Il est (très )?important de/i, '« Il est important de… »'],
    [/„/, 'guillemets allemands dans le texte français'],
    [/'/, 'apostrophe droite – utiliser ’'],
    [/«(?! )|(?<! )»/, 'espace manquant dans « … »'],
    [/[^\s«“(\d][;:!?](?!\/)/, 'espace manquant avant ; : ! ?'],
  ],
}
const GEMEINSAME_REGELN: [RegExp, string][] = [
  [/!{2,}|\?{2,}/, 'doppelte Satzzeichen'],
  [/"/, 'gerade Anführungszeichen'],
  [/ - /, 'Bindestrich statt Gedankenstrich (–)'],
  [/\.\.\./, 'drei Punkte statt …'],
  [/\s{2,}/, 'doppelte Leerzeichen'],
  [/ [,.]/, 'Leerzeichen vor Komma oder Punkt'],
]
/** Vor : ; ! ? steht im Französischen ein Leerzeichen (das Programm macht es geschützt), im Deutschen nie. */
const DE_VOR_ZEICHEN: [RegExp, string] = [/ [;:!?]/, 'Leerzeichen vor Satzzeichen']
const EMOJI = /\p{Extended_Pictographic}/u
/** Latin-1, typografische Zeichen, im Französischen zusätzlich œ und Œ. */
const ERLAUBT = /^[ -~ -ÿ–—‘’‚“”„…·œŒ\n]*$/

function stil(wo: string, x: string | undefined, sprache: Sprache) {
  if (!x) return
  if (EMOJI.test(x)) melde('F', wo, `Emoji: „${x.slice(0, 50)}“`)
  if (!ERLAUBT.test(x)) {
    const fremd = [...new Set([...x].filter((c) => !ERLAUBT.test(c)))].join(' ')
    melde('H', wo, `ungewöhnliche Zeichen ${fremd}: „${x.slice(0, 50)}“`)
  }
  const regeln = [...FLOSKELN[sprache], ...GEMEINSAME_REGELN, ...(sprache === 'de' ? [DE_VOR_ZEICHEN] : [])]
  for (const [re, name] of regeln) if (re.test(x)) melde('H', wo, `${name}: „${x.slice(0, 70)}“`)
}

function spanne(s: string): [number, number] | null {
  const m = /^(\d+)–(\d+)$/.exec(s)
  return m ? [Number(m[1]), Number(m[2])] : null
}

/** „Gross, J. J. (1998) …“ → „Gross“, „CASEL (2020) …“ → „CASEL“ */
const erstautor = (q: string) => (/^([^,(]+)/.exec(q)?.[1] ?? '').trim()
const jahr = (q: string) => /\((\d{4})[a-z]?[,)]/.exec(q)?.[1] ?? ''

// --- Jahrespläne -----------------------------------------------------------------------------
const planIds = new Set<string>()
if (alles) {
  for (const plan of PLAENE) {
    const wo = `plan-${plan.klasse}`
    for (const s of SPRACHEN) {
      for (const [feld, x] of [['titel', plan.titel[s]], ['untertitel', plan.untertitel[s]], ['faden', plan.faden[s]]] as const) {
        if (!x?.trim()) melde('F', wo, `${feld} (${s}) fehlt`)
        stil(`${wo} ${feld} ${s}`, x, s)
      }
      for (const k of KOMPETENZEN) {
        const z = plan.ziele[k.id]?.[s]
        if (!z?.trim()) melde('F', wo, `Jahresziel ${k.id} (${s}) fehlt`)
        else if (/^[A-ZÄÖÜÉÈ]/.test(z)) melde('H', wo, `Jahresziel ${k.id} (${s}) mit Verb (klein) beginnen`)
        stil(`${wo} Ziel ${k.id} ${s}`, z, s)
      }
    }
    // Kapitel: Nummern 1…n, Trimester steigend
    let letztesTrimester = 1
    plan.kapitel.forEach((k, i) => {
      const kw = `${wo} ${k.id}`
      if (k.nr !== i + 1) melde('F', kw, `Kapitel-Nr. ${k.nr}, erwartet ${i + 1}`)
      if (![1, 2, 3].includes(k.trimester)) melde('F', kw, 'Trimester 1–3')
      if (k.trimester < letztesTrimester) melde('F', kw, 'Trimester nicht in Reihenfolge')
      letztesTrimester = k.trimester
      if (!k.bild.startsWith('icon:')) melde('F', kw, 'Bild als icon:… angeben')
      for (const s of SPRACHEN) {
        if (!k.titel[s]?.trim() || !k.leitfrage[s]?.trim()) melde('F', kw, `Titel oder Leitfrage (${s}) fehlt`)
        if (!k.worum?.[s]?.trim()) melde('H', kw, `„worum“ (${s}) fehlt – steht auf der Kapitelseite`)
        stil(`${kw} ${s}`, k.titel[s], s)
        stil(`${kw} ${s}`, k.leitfrage[s], s)
        stil(`${kw} worum ${s}`, k.worum?.[s], s)
      }
      if (!plan.einheiten.some((e) => e.kapitel === k.id)) melde('F', kw, 'Kapitel ohne Einheiten')
    })
    // Einheiten: lückenlose Nummern bis 35, Kapitel in Reihenfolge
    let naechste = 1
    let kapIndex = 0
    for (const e of plan.einheiten) {
      const ew = `${wo} ${e.id}`
      if (planIds.has(e.id)) melde('F', ew, 'Id doppelt')
      planIds.add(e.id)
      if (!new RegExp(`^ff${plan.klasse[0]}-e\\d{2}$`).test(e.id)) melde('F', ew, `Id im Format ff${plan.klasse[0]}-e01`)
      if (e.nr !== naechste) melde('F', ew, `Nr. ${e.nr}, erwartet ${naechste}`)
      naechste += e.termine ?? 1
      const ki = plan.kapitel.findIndex((k) => k.id === e.kapitel)
      if (ki < 0) melde('F', ew, `Kapitel ${e.kapitel} gibt es nicht`)
      else if (ki < kapIndex) melde('F', ew, 'Kapitel nicht in Reihenfolge')
      else kapIndex = ki
      if (!e.kompetenzen.length || e.kompetenzen.length > 3) melde('F', ew, '1–3 Kompetenzbereiche')
      for (const k of e.kompetenzen) if (!KOMP.has(k)) melde('F', ew, `Kompetenz „${k}“ gibt es nicht`)
      if (!e.basis && !e.neu) melde('H', ew, 'weder „basis“ (Skills-Kurs) noch „neu“')
      for (const s of SPRACHEN) {
        if (!e.titel[s]?.trim() || !e.kurz[s]?.trim()) melde('F', ew, `Titel oder Kurztext (${s}) fehlt`)
        if (e.kurz[s]?.length > 115) melde('H', ew, `Kurztext (${s}) über 115 Zeichen – passt nicht in eine Zeile`)
        if (e.titel[s]?.length > 48) melde('H', ew, `Titel (${s}) lang (${e.titel[s].length} Zeichen)`)
        if (e.hinweis && !e.hinweis[s]?.trim()) melde('F', ew, `Hinweis (${s}) fehlt`)
        stil(`${ew} ${s}`, e.titel[s], s)
        stil(`${ew} ${s}`, e.kurz[s], s)
        stil(`${ew} ${s}`, e.hinweis?.[s], s)
      }
    }
    if (naechste - 1 !== 35) melde('H', wo, `${naechste - 1} Doppelstunden statt 35`)
    const jeTrimester = [1, 2, 3].map((tr) =>
      plan.einheiten.filter((e) => plan.kapitel.find((k) => k.id === e.kapitel)?.trimester === tr).reduce((n, e) => n + (e.termine ?? 1), 0),
    )
    const kompetenzZahl = Object.fromEntries(KOMPETENZEN.map((k) => [k.id, plan.einheiten.filter((e) => e.kompetenzen.includes(k.id)).length]))
    for (const [k, n] of Object.entries(kompetenzZahl)) if (n < 6) melde('H', wo, `Kompetenzbereich ${k} nur in ${n} Einheiten`)
    console.log(`${wo}: ${plan.kapitel.length} Kapitel, ${naechste - 1} Doppelstunden (Trimester ${jeTrimester.join(' / ')}), Wahl: ${plan.einheiten.filter((e) => e.wahl).length}, neu: ${plan.einheiten.filter((e) => e.neu).length}`)
  }
}

// --- Ausgearbeitete Einheiten ------------------------------------------------------------------
const PHASEN_LISTE = Object.keys(PHASEN) as Phase[]
const KLASSE_VON: Record<string, string> = { ff7: '7e', ff6: '6e', ff5: '5e' }

function pruefeEinheit(e: Einheit, wo: string) {
  const plan = PLAENE.find((p) => p.klasse === e.klasse)
  const pe = plan?.einheiten.find((u) => u.id === e.id)
  if (!pe) melde('F', wo, 'steht in keinem Jahresplan')
  if (KLASSE_VON[e.id.slice(0, 3)] !== e.klasse) melde('F', wo, `Klasse „${e.klasse}“ passt nicht zur Id`)
  if (e.dauer !== 100) melde('H', wo, `Dauer ${e.dauer} statt 100 Min.`)
  const eigene = [...(e.blaetter ?? []), ...(e.vorlagen ?? [])]
  if (!Array.isArray(e.blaetter)) melde('F', wo, '„blaetter“ fehlt (leere Liste, wenn keine)')
  for (const id of eigene) {
    if (blattById.has(id)) continue
    if (GEMEINSAM[id] && GEMEINSAM[id] !== e.id) melde('H', wo, `Blatt „${id}“ fehlt noch – es wird in ${GEMEINSAM[id]} angelegt`)
    else melde('F', wo, `Schülerblatt „${id}“ gibt es nicht`)
  }
  for (const id of e.vorlagen ?? []) if (e.blaetter?.includes(id)) melde('F', wo, `„${id}“ steht in „blaetter“ und in „vorlagen“`)
  // Wortspeicher
  if (!Array.isArray(e.woerter) || e.woerter.length < 3 || e.woerter.length > 6) melde('F', wo, 'Wortspeicher: 3–6 Wörter')
  for (const w of e.woerter ?? []) {
    for (const s of SPRACHEN) {
      if (!w[s]?.trim()) melde('F', wo, `Wortspeicher: „${w.de ?? w.fr}“ ohne ${s}`)
      else if (w[s].length > 42) melde('H', wo, `Wortspeicher: „${w[s]}“ zu lang`)
      stil(`${wo} Wortspeicher`, w[s], s)
    }
  }
  const texte: Record<Sprache, EinheitText> = { de: e.de, fr: e.fr }
  for (const s of SPRACHEN) {
    const x = texte[s]
    const sw = `${wo} ${s}`
    if (!x) {
      melde('F', sw, 'Sprachfassung fehlt')
      continue
    }
    if (pe && x.titel !== pe.titel[s]) melde('F', sw, `Titel weicht vom Jahresplan ab („${pe.titel[s]}“)`)
    if (!x.kurz?.trim()) melde('F', sw, 'Kurztext fehlt')
    else if (x.kurz.length > 240) melde('H', sw, `Kurztext ${x.kurz.length} Zeichen (höchstens 220)`)
    if (!x.ziele?.length || x.ziele.length < 2 || x.ziele.length > 4) melde('F', sw, '2–4 Ziele')
    for (const z of x.ziele ?? []) if (/^(Die Jugendlichen|Les jeunes|Sie |Ils |Elles )/.test(z)) melde('H', sw, `Ziel ohne Subjekt schreiben: „${z.slice(0, 40)}“`)
    if (!x.material?.length) melde('F', sw, 'Material fehlt')
    else if (x.material.length > 9) melde('H', sw, `${x.material.length} Punkte Material (höchstens 9) – die Übersicht passt sonst nicht auf eine Seite`)
    if ((x.vorbereitung?.length ?? 0) > 5) melde('H', sw, `${x.vorbereitung!.length} Punkte Vorbereitung (höchstens 5)`)
    for (const v of x.vorbereitung ?? []) if (v.length > 200) melde('H', sw, `Vorbereitung zu lang (${v.length} Zeichen, höchstens 180): „${v.slice(0, 40)}“`)
    const achtungMax = pe?.hinweis ? 950 : 760
    if (x.achtung && x.achtung.length > achtungMax) melde('H', sw, `„achtung“ ${x.achtung.length} Zeichen (300–${pe?.hinweis ? 900 : 700})`)
    // Ablauf lückenlos, eine Zeile je Schritt
    let bis = 0
    for (const z of x.ablauf ?? []) {
      const sp = spanne(z.min)
      if (!sp) {
        melde('F', sw, `Ablauf: „${z.min}“ nicht im Format 10–25`)
        continue
      }
      if (sp[0] !== bis) melde('F', sw, `Ablauf: Lücke oder Überschneidung bei ${z.min}`)
      bis = sp[1]
      if (!PHASEN_LISTE.includes(z.phase)) melde('F', sw, `Phase „${z.phase}“ gibt es nicht`)
      if (z.titel.length > 60) melde('H', sw, `Ablauf-Titel über 60 Zeichen: „${z.titel}“`)
      stil(sw, z.titel, s)
    }
    if (bis !== e.dauer) melde('F', sw, `Ablauf endet bei ${bis}, Dauer ${e.dauer}`)
    const summe = (x.schritte ?? []).reduce((a, st) => a + st.dauer, 0)
    if (summe !== e.dauer) melde('F', sw, `Schritte ergeben ${summe} Min., Dauer ${e.dauer}`)
    if (x.ablauf?.length !== x.schritte?.length) melde('F', sw, `Ablauf (${x.ablauf?.length}) und Schritte (${x.schritte?.length}): je Schritt eine Zeile`)
    else
      x.schritte.forEach((st, i) => {
        const sp = spanne(x.ablauf[i].min)
        if (sp && sp[1] - sp[0] !== st.dauer) melde('F', sw, `Schritt ${i + 1}: ${st.dauer} Min., in der Ablauf-Zeile ${x.ablauf[i].min}`)
        if (x.ablauf[i].phase !== st.phase) melde('F', sw, `Schritt ${i + 1}: Phase „${st.phase}“, in der Ablauf-Zeile „${x.ablauf[i].phase}“`)
      })
    if (x.ablauf?.[0]?.phase !== 'ankommen') melde('H', sw, 'erste Phase ist nicht der Check-in (ankommen)')
    if (x.ablauf?.at(-1)?.phase !== 'abschluss') melde('H', sw, 'letzte Phase ist nicht der Abschluss')
    if (!x.ablauf?.some((z) => z.phase === 'skill')) melde('H', sw, 'kein Skill (Phase skill)')
    ;(x.schritte ?? []).forEach((st, i) => {
      const stw = `${sw} Schritt ${i + 1}`
      if (st.blatt && !eigene.includes(st.blatt)) melde('F', stw, `Blatt „${st.blatt}“ fehlt in „blaetter“ oder „vorlagen“`)
      if (st.text.length < 120) melde('H', stw, 'Anleitung sehr knapp')
      for (const y of st.sagen ?? []) if (/^[„“"«]|[“"»]$/.test(y.trim())) melde('H', stw, '„sagen“ ohne Anführungszeichen schreiben')
      if (!PHASEN_LISTE.includes(st.phase)) melde('F', stw, `Phase „${st.phase}“ gibt es nicht`)
      for (const y of [st.titel, st.text, ...(st.sagen ?? []), ...(st.punkte ?? []), st.tipp, st.wennEsKippt, ...(st.tabelle?.spalten ?? []), ...(st.tabelle?.zeilen.flat() ?? [])]) stil(stw, y, s)
    })
    for (const q of x.quellen ?? []) {
      if (!QUELLEN_TEXTE.has(q)) melde('F', sw, `Quelle nicht in src/blatt/quellen.ts: „${q.slice(0, 60)}“`)
      else if (x.hintergrund && (!x.hintergrund.includes(erstautor(q)) || !x.hintergrund.includes(jahr(q)))) melde('H', sw, `Quelle im Hintergrund nicht zitiert (${erstautor(q)}, ${jahr(q)})`)
    }
    if (!x.hintergrund) melde('F', sw, 'Hintergrund fehlt')
    else if (x.hintergrund.length < 400 || x.hintergrund.length > 1000) melde('H', sw, `Hintergrund ${x.hintergrund.length} Zeichen (450–950)`)
    if (!x.quellen?.length) melde('F', sw, 'keine Quelle')
    if (!x.achtung) melde('F', sw, '„achtung“ fehlt')
    if (!x.bruecke) melde('F', sw, '„bruecke“ (Ausblick) fehlt')
    // Wochen-Mission: an die Jugendlichen, kurz; angesagt im Abschluss, nachgefragt in der Brücke der nächsten Stunde
    if (!x.mission?.trim()) melde('F', sw, 'Wochen-Mission („mission“) fehlt')
    else {
      if (x.mission.length < 50 || x.mission.length > 200) melde('H', sw, `Wochen-Mission ${x.mission.length} Zeichen (60–180)`)
      // an eine Person: „du“ oder Imperativ, nicht „ihr“ / « vous »
      const mehrzahl = s === 'de' ? /\b(ihr|euch|eure?[mnrs]?)\b/i : /(^|[^\p{L}])(vous|votre|vos)(?![\p{L}])/iu
      if (mehrzahl.test(x.mission)) melde('H', sw, 'Wochen-Mission an eine Person richten („du“ / « tu »), nicht an die Klasse')
    }
    const brueckeSchritt = (x.schritte ?? []).find((st) => st.phase === 'bruecke')
    if ((pe?.nr ?? 0) > 1 && brueckeSchritt && !/mission/i.test(brueckeSchritt.text)) melde('H', sw, 'Brücke: kurz nach der Wochen-Mission der letzten Stunde fragen')
    const letzterSchritt = (x.schritte ?? []).at(-1)
    if (letzterSchritt && !/mission/i.test(letzterSchritt.text)) melde('H', sw, 'Abschluss: die Wochen-Mission ansagen')
    if (!x.differenzierung?.leichter?.trim() || !x.differenzierung?.schwerer?.trim()) melde('F', sw, 'Differenzierung (leichter, schwerer) fehlt')
    if (!x.kurzfassung?.trim()) melde('F', sw, 'Kurzfassung fehlt')
    else {
      const minuten = [...x.kurzfassung.matchAll(/(\d+)\s*(?:Min\.|min\b)/g)].reduce((a, m) => a + Number(m[1]), 0)
      if (minuten !== 50) melde('F', sw, `Kurzfassung ergibt ${minuten} Min. statt 50`)
    }
    for (const y of [x.titel, x.kurz, ...(x.ziele ?? []), ...(x.material ?? []), ...(x.vorbereitung ?? []), x.bruecke, x.mission, x.hintergrund, x.achtung, x.differenzierung?.leichter, x.differenzierung?.schwerer, x.kurzfassung]) stil(sw, y, s)
  }
  // Beide Sprachen gleich gebaut
  const [a, b] = [e.de, e.fr]
  if (!a || !b) return
  if (a.ablauf.length !== b.ablauf.length) melde('F', wo, 'Ablauf DE/FR ungleich lang')
  a.ablauf.forEach((z, i) => {
    const y = b.ablauf[i]
    if (y && (z.min !== y.min || z.phase !== y.phase)) melde('F', wo, `Ablauf-Zeile ${i + 1}: Minuten oder Phase DE/FR verschieden`)
  })
  if (a.schritte.length !== b.schritte.length) melde('F', wo, 'Schritte DE/FR ungleich viele')
  a.schritte.forEach((st, i) => {
    const y = b.schritte[i]
    if (!y) return
    if (st.dauer !== y.dauer || st.phase !== y.phase || st.blatt !== y.blatt) melde('F', wo, `Schritt ${i + 1}: Dauer, Phase oder Blatt DE/FR verschieden`)
    if ((st.sagen?.length ?? 0) !== (y.sagen?.length ?? 0) || (st.punkte?.length ?? 0) !== (y.punkte?.length ?? 0)) melde('F', wo, `Schritt ${i + 1}: Anzahl Impulse oder Punkte DE/FR verschieden`)
    if (!!st.tipp !== !!y.tipp || !!st.wennEsKippt !== !!y.wennEsKippt || !!st.tabelle !== !!y.tabelle) melde('F', wo, `Schritt ${i + 1}: Tipp, „Wenn es kippt“ oder Tabelle nur in einer Sprache`)
    if (st.tabelle && y.tabelle && (st.tabelle.spalten.length !== y.tabelle.spalten.length || st.tabelle.zeilen.length !== y.tabelle.zeilen.length)) melde('F', wo, `Schritt ${i + 1}: Tabelle DE/FR verschieden groß`)
  })
  if (a.ziele.length !== b.ziele.length || a.material.length !== b.material.length || (a.vorbereitung?.length ?? 0) !== (b.vorbereitung?.length ?? 0)) melde('F', wo, 'Ziele, Material oder Vorbereitung DE/FR ungleich viele')
  if (JSON.stringify(a.quellen) !== JSON.stringify(b.quellen)) melde('F', wo, 'Quellen DE/FR verschieden')
}

const gepruefteEinheiten: Einheit[] = []
if (alles)
  for (const e of EINHEITEN) {
    pruefeEinheit(e, `einheiten-${e.klasse} ${e.id}`)
    gepruefteEinheiten.push(e)
  }
for (const x of pruefEntwuerfe) {
  const name = basename(x.datei, '.json')
  if (x.einheiten.length !== 1) melde('F', name, `${x.einheiten.length} Einheiten – je Datei genau eine`)
  for (const e of x.einheiten) {
    if (name !== e.id) melde('F', name, `Dateiname passt nicht zur Id ${e.id}`)
    if (EINHEITEN.some((y) => y.id === e.id)) melde('H', name, `${e.id} gibt es schon in einheiten-${e.klasse}.json`)
    pruefeEinheit(e, `entwurf ${e.id}`)
    gepruefteEinheiten.push(e)
  }
  for (const b of x.blaetter) {
    const e = x.einheiten[0]
    if (!e) continue
    if (!/^ff[765]-[a-z0-9]+(-[a-z0-9]+)*$/.test(b.id) || b.id.slice(0, 3) !== e.id.slice(0, 3)) melde('F', name, `Blatt-Id „${b.id}“: ${e.id.slice(0, 3)}-name`)
    if (!(b.kurs ?? []).includes(e.id)) melde('F', name, `Blatt „${b.id}“: „kurs“ muss ${e.id} enthalten`)
    if (![...e.blaetter, ...(e.vorlagen ?? [])].includes(b.id)) melde('F', name, `Blatt „${b.id}“ wird in der Einheit nicht verwendet`)
    if (GEMEINSAM[b.id] && GEMEINSAM[b.id] !== e.id) melde('F', name, `Blatt „${b.id}“ wird in ${GEMEINSAM[b.id]} angelegt, nicht hier`)
    if (b.bereich !== 'skills' || !b.stufen?.includes('ES') || b.layout !== 'jugend') melde('F', name, `Blatt „${b.id}“: bereich „skills“, stufen ["ES"], layout „jugend“`)
    if (!b.schlagworte?.includes('Förderfach')) melde('H', name, `Blatt „${b.id}“: Schlagwort „Förderfach“ fehlt`)
  }
}

// --- Wortspeicher: gleiche Wörter gleich übersetzen ------------------------------------------------
const uebersetzung = new Map<string, Map<string, string>>()
for (const e of gepruefteEinheiten)
  for (const w of e.woerter ?? []) {
    if (!w.de || !w.fr) continue
    const m = uebersetzung.get(w.de) ?? new Map<string, string>()
    m.set(w.fr, e.id)
    uebersetzung.set(w.de, m)
  }
for (const [de, m] of uebersetzung) if (m.size > 1) melde('H', 'Wortspeicher', `„${de}“ verschieden übersetzt: ${[...m].map(([fr, id]) => `${fr} (${id})`).join(', ')}`)

// --- Handbuch (Teil A) -----------------------------------------------------------------------------
/** Felder ohne Fließtext (Kennungen, Bilder, Farben) */
const OHNE_TEXT = new Set(['phase', 'min', 'nummer', 'zahl', 'art', 'bild', 'figuren', 'requisit', 'farbe', 'uebung', 'symbole', 'stil', 'verhaeltnis', 'modus'])
function texteIn(x: unknown, out: string[] = []): string[] {
  if (typeof x === 'string') out.push(x)
  else if (Array.isArray(x)) x.forEach((y) => texteIn(y, out))
  else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => !OHNE_TEXT.has(k) && texteIn(v, out))
  return out
}
if (alles) {
  const aufbau = (x: unknown): unknown => (Array.isArray(x) ? x.map(aufbau) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, aufbau(v)])) : typeof x)
  if (JSON.stringify(aufbau(HANDBUCH.de)) !== JSON.stringify(aufbau(HANDBUCH.fr))) melde('F', 'handbuch', 'DE und FR sind nicht gleich aufgebaut')
  for (const s of SPRACHEN) if (!HANDBUCH[s].vorwort.text.includes('{klasse}')) melde('F', `handbuch ${s}`, 'Vorwort ohne Platzhalter {klasse}')
  for (const id of VORLAGEN) if (!blattById.has(id)) melde('F', 'daten.ts', `Kopiervorlage „${id}“ gibt es nicht`)
  for (const s of SPRACHEN) for (const x of texteIn(HANDBUCH[s])) stil(`handbuch ${s}`, x, s)
}

// --- Schülerblätter ------------------------------------------------------------------------------------
const zuPruefen: Blatt[] = alles ? blattListe : pruefEntwuerfe.flatMap((x) => x.blaetter)
const vorlagenIds = new Set(gepruefteEinheiten.flatMap((e) => e.vorlagen ?? []))
for (const b of zuPruefen) {
  if (!b.fr) melde('F', `Blatt ${b.id}`, 'Französisch fehlt')
  else if (JSON.stringify(b.de.bausteine.map((x) => x.art)) !== JSON.stringify(b.fr.bausteine.map((x) => x.art))) melde('F', `Blatt ${b.id}`, 'Bausteine DE/FR verschieden')
  for (const s of SPRACHEN) {
    const inhalt = s === 'fr' ? b.fr : b.de
    if (!inhalt) continue
    for (const x of texteIn(inhalt.bausteine)) stil(`Blatt ${b.id} ${s}`, x, s)
    for (const q of inhalt.lehrer?.quellen ?? []) if (!QUELLEN_TEXTE.has(q)) melde('F', `Blatt ${b.id} ${s}`, `Quelle nicht geprüft: „${q.slice(0, 60)}“`)
  }
  if (alles) {
    const genutzt = gepruefteEinheiten.some((e) => [...e.blaetter, ...(e.vorlagen ?? [])].includes(b.id)) || VORLAGEN.includes(b.id)
    if (!genutzt) melde('H', `Blatt ${b.id}`, 'wird in keiner Einheit verwendet')
  }
}
// Regeln der Toolbox (scripts/blatt-pruefen.ts) – ohne die, die im Förderfach nicht gelten
if (zuPruefen.length) {
  const tmp = join(ROOT, 'tmp/foerderfach-pruefen')
  mkdirSync(tmp, { recursive: true })
  const datei = join(tmp, 'foerderfach-blaetter.json')
  writeFileSync(datei, JSON.stringify(zuPruefen))
  const r = spawnSync('npx', ['tsx', '--tsconfig', 'tsconfig.scripts.json', 'scripts/blatt-pruefen.ts', datei], { cwd: ROOT, encoding: 'utf8' })
  const ohneAufgabe = (zeile: string) => / (ff-[a-z0-9-]+) (DE|FR): keine einzige Aufgabe/.exec(zeile) || [...vorlagenIds].some((id) => zeile.includes(` ${id} `) && zeile.includes('keine einzige Aufgabe'))
  const giltNicht = [/1–4 ELDiB-Ziele/, /Lehrerseite: fachlicher Hintergrund zu kurz/, /Lehrerseite ohne Quelle/, /Hintergrund über 1100 Zeichen/]
  for (const zeile of (r.stdout ?? '').split('\n')) {
    const m = /^([✗·]) (.+?): (.+)$/.exec(zeile)
    if (!m) continue
    if (giltNicht.some((re) => re.test(zeile)) || ohneAufgabe(zeile)) continue
    const wo = m[2].replace(/^foerderfach-blaetter#\d+ /, 'Blatt ')
    melde(m[1] === '✗' ? 'F' : 'H', wo, m[3])
  }
  if (r.status !== 0 && r.status !== 1) melde('F', 'blatt-pruefen', `lief nicht durch: ${r.stderr?.slice(0, 300)}`)
}

console.log(`\n${gepruefteEinheiten.length} Einheit(en)${dateien.length ? ` in ${dateien.length} Entwurf/Entwürfen` : `, davon ${pruefEntwuerfe.reduce((n, x) => n + x.einheiten.length, 0)} im Entwurf`}, ${zuPruefen.length} Schülerblätter`)
console.log(`${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
