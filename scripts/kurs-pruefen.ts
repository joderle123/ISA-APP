// Prüft den Skills-Kurs (src/data/kurs/*.json): Aufbau der Kursjahre, Module und
// Einheiten, lückenlose Minuten, vorhandene Schülerblätter, geprüfte Quellen und
// den Stil nach src/kurs/KURS-STIL.md.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/kurs-pruefen.ts [datei.json …] [--streng]
// Fehler → Exit-Code 1. Hinweise (Stil) werden nur gezeigt; mit --streng zählen sie als Fehler.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Einheit, KursDatei, Modul, Phase } from '../src/kurs/typen'
import type { Blatt } from '../src/blatt/typen'
import { QUELLEN_TEXTE } from '../src/blatt/quellen'

/** Übliche Kurzformen von Institutionen als Autor (im Hintergrundtext). */
const AUTOR_KURZ: Record<string, string[]> = {
  'World Health Organization': ['WHO', 'Weltgesundheitsorganisation'],
  'Council of Europe': ['Europarat'],
  'WHO Regional Office for Europe & BZgA': ['WHO', 'BZgA'],
  'EFSA Panel on Dietetic Products': ['EFSA'],
  'U.S. Department of Health and Human Services': ['Surgeon General', 'US-Gesundheitsministerium'],
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const streng = args.includes('--streng')
const kursOrdner = join(ROOT, 'src/data/kurs')
const blattOrdner = join(ROOT, 'src/data/blaetter')
// Geladen wird immer der ganze Kurs (Module und Einheiten verweisen aufeinander);
// mit Dateiangaben werden nur Meldungen zu diesen Dateien gezeigt.
const auswahl = args.filter((a) => a.endsWith('.json')).map((a) => basename(a))
const dateien = readdirSync(kursOrdner)
  .filter((d) => d.endsWith('.json'))
  .map((d) => join(kursOrdner, d))
  .filter((d) => existsSync(d))

let fehler = 0
let hinweise = 0
function melde(art: 'F' | 'H', wo: string, text: string) {
  if (auswahl.length && !auswahl.some((a) => wo.startsWith(a + ' ') || wo === a)) return
  if (art === 'F' || streng) fehler++
  else hinweise++
  console.log(`${art === 'F' ? '✗' : '·'} ${wo}: ${text}`)
}

// --- Schülerblätter -------------------------------------------------------------------
const blaetter = new Map<string, Blatt>()
for (const d of readdirSync(blattOrdner).filter((x) => x.endsWith('.json'))) {
  for (const b of JSON.parse(readFileSync(join(blattOrdner, d), 'utf8')) as Blatt[]) blaetter.set(b.id, b)
}

// --- Stil ----------------------------------------------------------------------------
const PHASEN: Phase[] = ['ankommen', 'bruecke', 'input', 'uebung', 'pause', 'aktiv', 'skill', 'abschluss']
const FLOSKELN: [RegExp, string][] = [
  [/In dieser Einheit/i, '„In dieser Einheit …“'],
  [/Heute tauchen wir|tauchen wir ein/i, '„Heute tauchen wir ein …“'],
  [/\bspannend/i, '„spannend“'],
  [/\bReise\b|Entdeckungsreise/i, '„Reise“-Metapher'],
  [/magisch|Superkraft|ganzheitlich|Zauber/i, 'Modewort'],
  [/\blass(t)? uns\b/i, '„Lass uns …“'],
  [/Viel Spa(ß|ss)/i, '„Viel Spaß“'],
  [/Wusstest du/i, '„Wusstest du …“'],
  [/Mindset/i, '„Mindset“'],
  [/Kernsatz:|^Wichtig:/, '„Kernsatz:“/„Wichtig:“'],
  [/Es ist (sehr )?wichtig,? (zu|dass)/i, '„Es ist wichtig …“'],
  [/Gefühle sind wichtig|Kommunikation ist der Schlüssel/i, 'Allgemeinplatz'],
  [/!{2,}|\?{2,}/, 'doppelte Satzzeichen'],
  [/"/, 'gerade Anführungszeichen – bitte „…“ verwenden'],
  [/ - /, 'Bindestrich statt Gedankenstrich (–)'],
  [/\.\.\./, 'drei Punkte statt …'],
  [/\bDie Jugendlichen sollen\b/, '„Die Jugendlichen sollen …“'],
]
const EMOJI = /\p{Extended_Pictographic}/u
/** Latin-1 plus die typografischen Zeichen aus dem Leitfaden. */
const ERLAUBT = /^[ -~ -ÿ–—‘’‚“”„…→­\n]*$/

function stil(wo: string, x: string | undefined) {
  if (!x) return
  if (EMOJI.test(x)) melde('F', wo, `Emoji: „${x.slice(0, 50)}“`)
  if (!ERLAUBT.test(x)) {
    const fremd = [...new Set([...x].filter((c) => !ERLAUBT.test(c)))].join(' ')
    melde('H', wo, `ungewöhnliche Zeichen ${fremd}: „${x.slice(0, 50)}“`)
  }
  for (const [re, name] of FLOSKELN) if (re.test(x)) melde('H', wo, `${name}: „${x.slice(0, 70)}“`)
}

function saetze(x: string): number {
  return (x.match(/[.!?…](\s|$)/g) ?? []).length || 1
}

/** '10–25' → [10, 25] */
function spanne(s: string): [number, number] | null {
  const m = /^(\d+)–(\d+)$/.exec(s)
  return m ? [Number(m[1]), Number(m[2])] : null
}

// --- Laden ---------------------------------------------------------------------------
const einheiten = new Map<string, { e: Einheit; datei: string }>()
const module = new Map<string, { m: Modul; datei: string }>()
const jahre: { datei: string; k: KursDatei }[] = []
for (const datei of dateien) {
  const name = basename(datei)
  let k: KursDatei
  try {
    k = JSON.parse(readFileSync(datei, 'utf8'))
  } catch (e) {
    melde('F', name, 'kein gültiges JSON: ' + (e as Error).message)
    continue
  }
  jahre.push({ datei: name, k })
  for (const m of k.module ?? []) {
    if (module.has(m.id)) melde('F', `${name} ${m.id}`, 'Modul-Id doppelt')
    module.set(m.id, { m, datei: name })
  }
  for (const e of k.einheiten ?? []) {
    if (einheiten.has(e.id)) melde('F', `${name} ${e.id}`, 'Einheit-Id doppelt')
    einheiten.set(e.id, { e, datei: name })
  }
}

// --- Grundlagen ----------------------------------------------------------------------
for (const { datei, k } of jahre) {
  for (const g of k.grundlagen ?? []) {
    const wo = `${datei} ${g.id}`
    if (!g.titel?.trim()) melde('F', wo, 'Titel fehlt')
    if (!g.abschnitte?.length) melde('F', wo, 'keine Abschnitte')
    for (const a of g.abschnitte ?? []) {
      if (!a.titel?.trim()) melde('F', wo, 'Abschnitt ohne Titel')
      if (!a.text && !a.punkte?.length && !a.tabelle) melde('F', `${wo} „${a.titel}“`, 'Abschnitt ohne Inhalt')
      for (const x of [a.titel, a.text, ...(a.punkte ?? []), ...(a.tabelle?.zeilen.flat() ?? [])]) stil(`${wo} „${a.titel}“`, x)
      if (a.tabelle) for (const z of a.tabelle.zeilen) if (z.length !== a.tabelle.spalten.length) melde('F', `${wo} „${a.titel}“`, 'Tabellenzeile passt nicht zu den Spalten')
    }
  }
}

// --- Kursjahre und Module ------------------------------------------------------------
for (const { datei, k } of jahre) {
  const j = k.jahr
  if (!j) continue
  const wo = `${datei} Jahr ${j.nr}`
  if (!j.titel || !j.untertitel || !j.faden) melde('F', wo, 'Titel, Untertitel oder roter Faden fehlt')
  stil(wo, j.faden)
  let erwartet = 1
  for (const mid of j.module) {
    const x = module.get(mid)
    if (!x) {
      melde('F', wo, `Modul ${mid} fehlt`)
      continue
    }
    const m = x.m
    const mw = `${datei} ${m.id}`
    if (m.jahr !== j.nr) melde('F', mw, `gehört zu Jahr ${m.jahr}, steht aber in Jahr ${j.nr}`)
    if (!m.titel || !m.leitfrage || !m.worum || !m.zielAmEnde) melde('F', mw, 'Titel, Leitfrage, Worum oder Ziel fehlt')
    for (const s of [m.titel, m.leitfrage, m.worum, m.zielAmEnde]) stil(mw, s)
    if (!m.einheiten.length) melde('F', mw, 'Modul ohne Einheiten')
    for (const eid of m.einheiten) {
      const ex = einheiten.get(eid)
      if (!ex) {
        melde('F', mw, `Einheit ${eid} fehlt`)
        continue
      }
      if (ex.e.modul !== m.id) melde('F', mw, `${eid} nennt Modul ${ex.e.modul}`)
      if (ex.e.joker) melde('F', mw, `${eid} ist ein Joker und gehört nicht in ein Modul`)
      if (ex.e.nr !== erwartet) melde('F', mw, `${eid} hat Nr. ${ex.e.nr}, erwartet ${erwartet}`)
      erwartet++
    }
  }
  for (const jid of j.joker ?? []) {
    const ex = einheiten.get(jid)
    if (!ex) melde('F', wo, `Joker ${jid} fehlt`)
    else if (!ex.e.joker) melde('F', wo, `${jid} steht bei den Jokern, hat aber joker: false`)
  }
  // Jede Einheit dieses Jahres muss erreichbar sein
  const inModulen = new Set(j.module.flatMap((mid) => module.get(mid)?.m.einheiten ?? []))
  for (const { e, datei: d } of einheiten.values()) {
    if (e.jahr !== j.nr) continue
    if (!e.joker && !inModulen.has(e.id)) melde('F', `${d} ${e.id}`, 'steht in keinem Modul')
    if (e.joker && !(j.joker ?? []).includes(e.id)) melde('F', `${d} ${e.id}`, 'Joker fehlt in jahr.joker')
  }
}

// --- Einheiten -----------------------------------------------------------------------
const blattNutzung = new Map<string, string[]>()
for (const { e, datei } of einheiten.values()) {
  const wo = `${datei} ${e.id}`
  if (!/^j\d+-(e\d{2}|j\d{2})$/.test(e.id)) melde('F', wo, 'Id nicht im Format j1-e07 / j1-j01')
  if (!e.titel?.trim()) melde('F', wo, 'Titel fehlt')
  else if (e.titel.length > 48) melde('H', wo, `Titel lang (${e.titel.length} Zeichen)`)
  if (e.titel?.includes(':') && !/Stopp|: /.test(e.titel)) melde('H', wo, 'Titel mit Doppelpunkt')
  if (!e.kurz?.trim()) melde('F', wo, '„kurz“ fehlt')
  else if (e.kurz.length > 220) melde('H', wo, '„kurz“ über 220 Zeichen')
  if (!e.joker && !module.has(e.modul)) melde('F', wo, `Modul ${e.modul} gibt es nicht`)
  if (!e.dauer || e.dauer < 30 || e.dauer > 240) melde('F', wo, `Dauer ${e.dauer} unplausibel`)
  if (!e.ziele || e.ziele.length < 2 || e.ziele.length > 4) melde('F', wo, '2–4 Ziele nötig')
  for (const z of e.ziele ?? []) {
    if (/^Die Jugendlichen|^Jugendliche|^Sie /.test(z)) melde('H', wo, `Ziel ohne „Die Jugendlichen“ beginnen: „${z.slice(0, 50)}“`)
    else if (/^[A-ZÄÖÜ]/.test(z)) melde('H', wo, `Ziel mit Verb (klein) beginnen: „${z.slice(0, 50)}“`)
  }
  if (!e.material?.length) melde('F', wo, 'Material fehlt')
  if (!Array.isArray(e.blaetter)) melde('F', wo, '„blaetter“ fehlt')
  for (const id of e.blaetter ?? []) {
    const b = blaetter.get(id)
    if (!b) melde('F', wo, `Schülerblatt „${id}“ gibt es nicht`)
    else {
      blattNutzung.set(id, [...(blattNutzung.get(id) ?? []), e.id])
      if (b.bereich === 'skills' && !(b.kurs ?? []).includes(e.id)) melde('H', wo, `Blatt „${id}“ nennt ${e.id} nicht in „kurs“`)
    }
  }

  // Ablauf: lückenlos von 0 bis dauer
  if (!e.ablauf?.length || e.ablauf.length < 3) melde('F', wo, 'Ablauf mit mindestens 3 Zeilen nötig')
  let bis = 0
  for (const z of e.ablauf ?? []) {
    const s = spanne(z.min)
    if (!s) {
      melde('F', wo, `Ablauf: Minuten „${z.min}“ nicht im Format 10–25`)
      continue
    }
    if (s[0] !== bis) melde('F', wo, `Ablauf: Lücke oder Überschneidung bei ${z.min} (erwartet Beginn ${bis})`)
    if (s[1] <= s[0]) melde('F', wo, `Ablauf: ${z.min} ist leer`)
    bis = s[1]
    if (!PHASEN.includes(z.phase)) melde('F', wo, `Ablauf: Phase „${z.phase}“ gibt es nicht`)
    if (!z.titel?.trim()) melde('F', wo, 'Ablauf: Titel fehlt')
    else if (z.titel.length > 60) melde('H', wo, `Ablauf-Titel über 60 Zeichen: „${z.titel}“`)
    stil(wo, z.titel)
  }
  if (e.ablauf?.length && bis !== e.dauer) melde('F', wo, `Ablauf endet bei ${bis}, Dauer ist ${e.dauer}`)

  // Schritte
  if (!e.schritte?.length || e.schritte.length < 3) melde('F', wo, 'mindestens 3 Schritte nötig')
  const summe = (e.schritte ?? []).reduce((a, s) => a + (s.dauer || 0), 0)
  if (e.schritte?.length && Math.abs(summe - e.dauer) > 5) melde('F', wo, `Schritte ergeben ${summe} Min., Dauer ist ${e.dauer}`)
  ;(e.schritte ?? []).forEach((s, i) => {
    const sw = `${wo} Schritt ${i + 1}`
    if (!s.titel?.trim()) melde('F', sw, 'Titel fehlt')
    if (!PHASEN.includes(s.phase)) melde('F', sw, `Phase „${s.phase}“ gibt es nicht`)
    if (!s.dauer || s.dauer < 1) melde('F', sw, 'Dauer fehlt')
    if (!s.text?.trim()) melde('F', sw, 'Anleitung fehlt')
    else {
      if (s.phase !== 'pause' && s.text.length < 120) melde('H', sw, `Anleitung sehr knapp (${s.text.length} Zeichen)`)
      if (saetze(s.text) > 8) melde('H', sw, `Anleitung mit ${saetze(s.text)} Sätzen – besser aufteilen`)
    }
    for (const x of s.sagen ?? []) if (/^[„“"‚]|[“"‘]$/.test(x.trim())) melde('H', sw, `„sagen“ ohne Anführungszeichen schreiben: ${x.slice(0, 40)}`)
    if (s.blatt) {
      if (!blaetter.has(s.blatt)) melde('F', sw, `Schülerblatt „${s.blatt}“ gibt es nicht`)
      if (!(e.blaetter ?? []).includes(s.blatt)) melde('F', sw, `Blatt „${s.blatt}“ fehlt in „blaetter“ der Einheit`)
    }
    if (s.tabelle) for (const z of s.tabelle.zeilen) if (z.length !== s.tabelle.spalten.length) melde('F', sw, 'Tabellenzeile passt nicht zu den Spalten')
    for (const x of [s.titel, s.text, ...(s.sagen ?? []), ...(s.punkte ?? []), s.tipp, s.wennEsKippt, ...(s.tabelle?.zeilen.flat() ?? [])]) stil(sw, x)
  })
  if (!(e.schritte ?? []).some((s) => s.wennEsKippt)) melde('H', wo, 'kein „wennEsKippt“ in der ganzen Einheit')

  // Hintergrund, Quellen, Achtung
  if (!e.hintergrund) melde('H', wo, 'fachlicher Hintergrund fehlt')
  else if (e.hintergrund.length < 300 || e.hintergrund.length > 1000) melde('H', wo, `Hintergrund ${e.hintergrund.length} Zeichen (300–900)`)
  for (const q of e.quellen ?? []) {
    if (!QUELLEN_TEXTE.has(q)) melde('F', wo, `Quelle nicht in src/blatt/quellen.ts: „${q.slice(0, 70)}“`)
    // Autor: Text vor dem Jahr – bei Personen der Nachname vor dem ersten Komma,
    // bei Institutionen (WHO, Europarat) der ganze Name oder eine übliche Kurzform
    const vorJahr = q.split(/\s\(\d{4}/)[0]
    const autor = (vorJahr.includes(',') ? vorJahr.split(',')[0] : vorJahr).replace(/^(de|von|van) /, '').trim()
    const namen = [autor, ...(AUTOR_KURZ[autor] ?? [])]
    const jahr = /\((\d{4})/.exec(q)?.[1]
    if (e.hintergrund && jahr && !(namen.some((n) => e.hintergrund!.includes(n)) && e.hintergrund.includes(jahr))) melde('H', wo, `Quelle ${autor} (${jahr}) wird im Hintergrund nicht genannt`)
  }
  if (e.hintergrund && !(e.quellen ?? []).length) melde('H', wo, 'Hintergrund ohne Quelle')
  if (!e.achtung) melde('H', wo, '„achtung“ fehlt')
  if (!e.joker && !e.bruecke) melde('H', wo, '„bruecke“ (Ausblick) fehlt')
  if (e.joker && !e.passt) melde('H', wo, 'Joker ohne „passt“ (wann einsetzen?)')
  if (!e.joker && e.passt) melde('H', wo, '„passt“ ist nur für Joker gedacht')
  for (const x of [e.titel, e.kurz, ...(e.ziele ?? []), ...(e.material ?? []), ...(e.vorbereitung ?? []), e.bruecke, e.hintergrund, e.achtung]) stil(wo, x)

  // Höchstens ein Ausrufezeichen pro Einheit (Spielanweisungen wie „Stopp!“ ausgenommen)
  const alles = JSON.stringify(e).replace(/Stopp!|Los!|Halt!|Freeze!|Achtung!/g, '')
  const ausrufe = (alles.match(/!/g) ?? []).length
  if (ausrufe > 1) melde('H', wo, `${ausrufe} Ausrufezeichen (höchstens 1)`)
}

// --- Blätter ohne Einheit --------------------------------------------------------------
for (const b of blaetter.values()) {
  if (b.bereich !== 'skills') continue
  for (const eid of b.kurs ?? []) if (!einheiten.has(eid) && !auswahl.length) melde('F', `Blatt ${b.id}`, `nennt Einheit ${eid}, die es nicht gibt`)
  if (!blattNutzung.has(b.id) && !auswahl.length) melde('H', `Blatt ${b.id}`, 'wird in keiner Einheit verwendet')
}

// --- Zusammenfassung -------------------------------------------------------------------
for (const { datei, k } of jahre) {
  if (!k.jahr) continue
  const liste = [...einheiten.values()].filter((x) => x.e.jahr === k.jahr!.nr)
  const normal = liste.filter((x) => !x.e.joker).length
  const joker = liste.length - normal
  const bl = new Set(liste.flatMap((x) => x.e.blaetter ?? []))
  console.log(`${datei}: Kursjahr ${k.jahr.nr} – ${k.jahr.module.length} Module, ${normal} Einheiten, ${joker} Joker, ${bl.size} Schülerblätter`)
}
console.log(`\n${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
