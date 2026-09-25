// Prüft alle Arbeitsblätter in src/data/blaetter/*.json (oder die übergebenen
// Dateien): Aufbau, gültige Bilder/ELDiB-Codes/Quellen, Stufenregeln und Stil.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-pruefen.ts [datei.json …] [--streng]
// Fehler → Exit-Code 1. Hinweise (Stil) werden nur gezeigt; mit --streng zählen sie als Fehler.
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Baustein, Blatt, BlattInhalt, Sprache } from '../src/blatt/typen'
import { BEREICHE, THEMEN, STUFEN_REIHE } from '../src/blatt/katalog'
import { hatIcon } from '../src/blatt/zeichnung'
import { GEFUEHLE } from '../src/blatt/gesichter'
import { FIGUREN, POSEN } from '../src/blatt/figuren'
import { MOTIV_NAMEN } from '../src/blatt/motive'
import { QUELLEN_TEXTE } from '../src/blatt/quellen'
import { eldibGoalById } from '../src/data/taxonomy'
import { bereichAusDatei } from '../src/blatt/nummern'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const streng = args.includes('--streng')
const dateien = args.filter((a) => a.endsWith('.json'))
const ordner = join(ROOT, 'src/data/blaetter')
const liste = dateien.length ? dateien : readdirSync(ordner).filter((d) => d.endsWith('.json')).map((d) => join(ordner, d))

let fehler = 0
let hinweise = 0
const ids = new Map<string, string>()

const SYMBOLE = ['malen', 'schreiben', 'lesen', 'schneiden', 'kleben', 'ankreuzen', 'einkreisen', 'verbinden', 'sprechen', 'zuhoeren', 'nachdenken', 'zeigen', 'partner', 'gruppe']
const FARBWOERTER = ['rot', 'orange', 'gelb', 'gruen', 'blau', 'lila', 'grau', 'braun']
const ARTEN = new Set([
  'aufgabe', 'text', 'info', 'geschichte', 'bild', 'spalten', 'abstand', 'seitenumbruch', 'linien', 'frage', 'satzanfaenge', 'feld', 'tabelle',
  'wennDann', 'dialog', 'vertrag', 'ankreuzen', 'bilder', 'wortspeicher', 'skala', 'einschaetzung', 'zuordnen', 'gefuehle', 'ampel', 'thermometer',
  'vulkan', 'eisberg', 'koerper', 'batterie', 'waage', 'leiter', 'zielscheibe', 'hand', 'mindmap', 'schritte', 'plan', 'tagesplan', 'atmen', 'comic',
  'karten', 'rueckblick', 'notfall', 'gefuehlsrad',
])

/** Formulierungen, die nach Textbaukasten klingen. */
const FLOSKELN: [RegExp, string][] = [
  [/\blass(t)? uns\b/i, '„Lass uns …“'],
  [/spannende Reise|auf eine Reise|Entdeckungsreise/i, '„Reise“-Metapher'],
  [/In diesem Arbeitsblatt|Dieses Arbeitsblatt (hilft|zeigt)/i, 'Blatt kündigt sich selbst an'],
  [/Viel Spa(ß|ss)/i, '„Viel Spaß“'],
  [/Hast du dich (schon )?(ein)?mal gefragt/i, 'rhetorische Einstiegsfrage'],
  [/Wusstest du( schon)?,? dass/i, '„Wusstest du …“'],
  [/\bSuper!|\bToll!|\bPrima!|\bKlasse!/, 'Jubelwort mit Ausrufezeichen'],
  [/ganzheitlich|Superkraft|magisch|Zauber/i, 'Modewort'],
  [/Es ist (sehr )?wichtig,? (zu|dass)/i, '„Es ist wichtig …“'],
  [/\bgemeinsam (entdecken|erkunden)\b/i, '„gemeinsam entdecken“'],
  [/!{2,}|\?{2,}/, 'doppelte Satzzeichen'],
  [/"/, 'gerade Anführungszeichen – bitte „…“ bzw. « … » verwenden'],
  [/ - /, 'Bindestrich statt Gedankenstrich (–)'],
  [/\.\.\./, 'drei Punkte statt … '],
]
const EMOJI = /\p{Extended_Pictographic}/u
/** Zeichen, die ALLE eingebetteten Schriften enthalten – direkt aus den Schriftdateien gelesen
 *  (weiches Trennzeichen U+00AD wird vor dem Setzen entfernt). */
const fontkit = createRequire(import.meta.url)('fontkit') as { openSync(pfad: string): { characterSet: number[] } }
const SCHRIFTEN = join(ROOT, 'src/assets/fonts/pdf')
const ZEICHEN = readdirSync(SCHRIFTEN)
  .filter((d) => d.endsWith('.ttf'))
  .map((d) => new Set(fontkit.openSync(join(SCHRIFTEN, d)).characterSet))
  .reduce((a, b) => new Set([...a].filter((c) => b.has(c))))
ZEICHEN.add(0xad)
function fremdeZeichen(x: string): string {
  return [...new Set([...x].filter((ch) => ch !== '\n' && !ZEICHEN.has(ch.codePointAt(0) ?? 0)))].join(' ')
}

function melde(art: 'F' | 'H', wo: string, text: string) {
  if (art === 'F' || streng) fehler++
  else hinweise++
  console.log(`${art === 'F' ? '✗' : '·'} ${wo}: ${text}`)
}

function bildOk(id: string): string | null {
  const [art, a, b, c] = id.split(':')
  if (art === 'icon') return hatIcon(a ?? '') ? null : `Piktogramm „${a}“ gibt es nicht (Liste: src/blatt/bilder/icons.json)`
  if (art === 'gesicht') return (GEFUEHLE as string[]).includes(a ?? '') ? null : `Gefühl „${a}“ gibt es nicht`
  if (art === 'motiv') return MOTIV_NAMEN.includes(a ?? '') ? null : `Motiv „${a}“ gibt es nicht`
  if (art === 'figur') {
    if (!a || !FIGUREN[a]) return `Figur „${a}“ gibt es nicht`
    if (b && !(GEFUEHLE as string[]).includes(b)) return `Gefühl „${b}“ gibt es nicht`
    if (c && !(POSEN as string[]).includes(c)) return `Haltung „${c}“ gibt es nicht`
    return null
  }
  return `Unbekannter Bildtyp „${id}“`
}

function texteVon(b: Baustein): string[] {
  const out: string[] = []
  const add = (x: unknown) => {
    if (typeof x === 'string') out.push(x)
    else if (Array.isArray(x)) x.forEach(add)
    else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => k !== 'bild' && k !== 'art' && k !== 'figuren' && k !== 'requisit' && k !== 'farbe' && k !== 'uebung' && k !== 'symbole' && add(v))
  }
  add(b)
  return out
}

function pruefeBausteine(wo: string, liste: Baustein[], blatt: Blatt, sprache: Sprache, tiefe = 0) {
  let aufgaben = 0
  liste.forEach((b, i) => {
    const w = `${wo} [${i + 1}:${b?.art}]`
    if (!b || !ARTEN.has(b.art)) return melde('F', w, 'unbekannte Bausteinart')
    const bilder: string[] = []
    switch (b.art) {
      case 'aufgabe':
        aufgaben++
        if (!b.text?.trim()) melde('F', w, 'Aufgabe ohne Text')
        if (b.text.length > 150) melde('H', w, `Aufgabentext zu lang (${b.text.length} Zeichen, max. 150)`)
        for (const s of b.symbole ?? []) if (!SYMBOLE.includes(s)) melde('F', w, `Symbol „${s}“ gibt es nicht`)
        break
      case 'spalten':
        if (tiefe) melde('F', w, 'Spalten dürfen nicht verschachtelt werden')
        pruefeBausteine(w + ' links', b.links ?? [], blatt, sprache, tiefe + 1)
        pruefeBausteine(w + ' rechts', b.rechts ?? [], blatt, sprache, tiefe + 1)
        break
      case 'geschichte':
        if (b.bild) bilder.push(b.bild)
        if (b.text.length > 900) melde('H', w, 'Geschichte sehr lang (> 900 Zeichen)')
        break
      case 'bild':
        bilder.push(b.bild)
        break
      case 'bilder':
        b.bilder.forEach((x) => bilder.push(x.bild))
        if (b.bilder.length > 9) melde('H', w, 'mehr als 9 Bilder')
        break
      case 'karten':
        b.karten.forEach((k) => k.bild && bilder.push(k.bild))
        break
      case 'tagesplan':
        b.zeilen.forEach((z) => z.bild && bilder.push(z.bild))
        break
      case 'comic':
        if (!b.felder?.length || b.felder.length > 6) melde('F', w, '1–6 Bildfelder erlaubt')
        b.felder.forEach((f) => {
          ;(f.figuren ?? []).forEach((x) => bilder.push(x))
          if ((f.figuren ?? []).length > 2) melde('F', w, 'höchstens 2 Figuren pro Feld')
          if (f.requisit) bilder.push(f.requisit)
          if (f.text && f.text.length > 70) melde('H', w, `Sprechblase zu lang (${f.text.length} Zeichen, max. 70)`)
        })
        break
      case 'gefuehle':
        for (const g of b.gefuehle) if (!(GEFUEHLE as string[]).includes(g)) melde('F', w, `Gefühl „${g}“ gibt es nicht`)
        break
      case 'gefuehlsrad':
        if (b.felder) {
          if (b.felder.length < 4 || b.felder.length > 8) melde('F', w, '4–8 Grundgefühle nötig')
          for (const f of b.felder) {
            if (!FARBWOERTER.includes(f.farbe)) melde('F', w, `Farbe „${f.farbe}“ gibt es nicht`)
            if (f.aussen.length > 5) melde('F', w, `„${f.wort}“: höchstens 5 Wörter außen`)
            for (const x of [f.wort, ...f.aussen]) if (x.length > 14) melde('H', w, `„${x}“ ist für das Rad zu lang (max. 14 Zeichen)`)
          }
        }
        break
      case 'koerper':
        for (const l of b.legende ?? []) if (!FARBWOERTER.includes(l.farbe)) melde('F', w, `Farbe „${l.farbe}“ gibt es nicht`)
        break
      case 'ampel':
      case 'vulkan':
        if (b.stufen && b.stufen.length !== 3) melde('F', w, 'genau 3 Stufen nötig')
        break
      case 'thermometer':
        if (b.stufen.length < 3 || b.stufen.length > 5) melde('F', w, '3–5 Stufen nötig')
        break
      case 'schritte':
        if ((b.stil === 'kette' || b.stil === 'weg') && b.items.length > 4) melde('F', w, 'Kette: höchstens 4 Glieder')
        if (b.stil === 'kette') b.items.forEach((x) => x.titel.length > 26 && melde('H', w, `Kettenglied-Titel zu lang: „${x.titel}“ (max. 26)`))
        break
      case 'mindmap':
        if ((b.aeste?.length || b.anzahl || 6) > 6) melde('F', w, 'höchstens 6 Äste (ab 7 überlappen sich die Kästen)')
        break
      case 'hand':
        if (b.finger && b.finger.length !== 5) melde('F', w, 'genau 5 Finger')
        break
      case 'leiter':
        if (b.stufen < 3 || b.stufen > 7) melde('F', w, '3–7 Stufen')
        break
      case 'zielscheibe':
        if (b.ringe.length < 2 || b.ringe.length > 4) melde('F', w, '2–4 Ringe')
        break
      case 'skala':
        if (b.stufen && ![5, 10, 11].includes(b.stufen)) melde('F', w, 'Skala mit 5, 10 oder 11 Stufen')
        break
      case 'plan':
        if (b.zeilen.length > 6) melde('H', w, 'Plan mit mehr als 6 Zeilen wird eng')
        break
      case 'atmen':
        if (!['quadrat', 'ballon', 'blume', 'fuenf-sinne', 'finger'].includes(b.uebung)) melde('F', w, 'unbekannte Atemübung')
        break
      case 'tabelle':
        if (b.spalten.length > 5) melde('H', w, 'mehr als 5 Spalten')
        if (b.beispiel && b.beispiel.length !== b.spalten.length) melde('F', w, 'Beispielzeile passt nicht zur Spaltenzahl')
        break
      case 'wennDann':
        if (b.zeilen + (b.beispiele?.length ?? 0) > 6) melde('H', w, 'mehr als 6 Wenn-dann-Zeilen')
        break
    }
    for (const id of bilder) {
      const f = bildOk(id)
      if (f) melde('F', w, f)
    }
    for (const x of texteVon(b)) {
      if (EMOJI.test(x)) melde('F', w, `Emoji im Text: „${x.slice(0, 40)}“`)
      else if (fremdeZeichen(x)) melde('F', w, `Zeichen fehlt in der Schrift: ${fremdeZeichen(x)} – „${x.slice(0, 40)}“`)
      for (const [re, name] of FLOSKELN) if (re.test(x)) melde(sprache === 'fr' && name.startsWith('gerade') ? 'H' : 'H', w, `${name}: „${x.slice(0, 60)}“`)
      if (blatt.stufen.includes('C1') && blatt.bereich !== 'werkzeuge' && x.length > 90 && b.art !== 'text') melde('H', w, 'Spielschule: Text über 90 Zeichen')
    }
  })
  return aufgaben
}

function pruefeInhalt(wo: string, inh: BlattInhalt | undefined, blatt: Blatt, sprache: Sprache) {
  if (!inh) return melde('F', wo, `Sprachfassung ${sprache} fehlt`)
  if (!inh.titel?.trim()) melde('F', wo, 'Titel fehlt')
  else if (inh.titel.length > 48) melde('H', wo, `Titel lang (${inh.titel.length} Zeichen, ideal ≤ 40)`)
  if (inh.untertitel && inh.untertitel.length > 150) melde('H', wo, 'Untertitel über 150 Zeichen')
  if (inh.anleitung && !blatt.stufen.includes('C1') && blatt.bereich !== 'werkzeuge') melde('H', wo, '„anleitung“ ist für Spielschul-Blätter gedacht')
  if (blatt.stufen.includes('C1') && blatt.bereich !== 'werkzeuge' && !inh.anleitung) melde('F', wo, 'Spielschul-Blatt braucht eine kurze Anleitung für Erwachsene')
  if (!Array.isArray(inh.bausteine) || !inh.bausteine.length) return melde('F', wo, 'keine Bausteine')
  const n = pruefeBausteine(wo, inh.bausteine, blatt, sprache)
  if (n === 0) melde('F', wo, 'keine einzige Aufgabe')
  if (n > 6) melde('H', wo, `${n} Aufgaben – eher zu viel für ein Blatt`)
  for (const x of [inh.titel, inh.untertitel ?? '', inh.anleitung ?? '']) {
    if (EMOJI.test(x)) melde('F', wo, 'Emoji in Titel/Untertitel')
    for (const [re, name] of FLOSKELN) if (re.test(x)) melde('H', wo, `${name}: „${x.slice(0, 60)}“`)
  }
  const L = inh.lehrer
  if (!L) return melde('F', wo, 'Lehrerseite fehlt')
  if (!L.ziel?.trim()) melde('F', wo, 'Lehrerseite: Ziel fehlt')
  if (!Array.isArray(L.ablauf) || L.ablauf.length < 3) melde('F', wo, 'Lehrerseite: mindestens 3 Ablaufschritte')
  if (L.ablauf && L.ablauf.length > 8) melde('H', wo, 'Lehrerseite: mehr als 8 Ablaufschritte')
  if (!L.hintergrund || L.hintergrund.length < 250) melde('F', wo, 'Lehrerseite: fachlicher Hintergrund zu kurz (mind. 250 Zeichen)')
  if (L.hintergrund && L.hintergrund.length > 1100) melde('H', wo, 'Lehrerseite: Hintergrund über 1100 Zeichen – Seite wird voll')
  for (const q of L.quellen ?? []) if (!QUELLEN_TEXTE.has(q)) melde('F', wo, `Quelle nicht in der geprüften Liste (src/blatt/quellen.ts): „${q.slice(0, 70)}“`)
  if (!(L.quellen ?? []).length) melde('H', wo, 'Lehrerseite ohne Quelle')
  const alle = [L.ziel, ...(L.ablauf ?? []), L.hintergrund, ...(L.impulse ?? []), ...(L.tipps ?? []), L.achtung ?? '', L.material ?? '', L.differenzierung?.leichter ?? '', L.differenzierung?.schwerer ?? '']
  for (const x of [...alle, inh.titel, inh.untertitel ?? '', inh.anleitung ?? '']) {
    if (fremdeZeichen(x)) melde('F', wo, `Zeichen fehlt in der Schrift: ${fremdeZeichen(x)}`)
  }
  for (const x of alle) {
    if (EMOJI.test(x)) melde('F', wo, 'Emoji auf der Lehrerseite')
    for (const [re, name] of FLOSKELN) if (re.test(x)) melde('H', wo, `Lehrerseite – ${name}: „${x.slice(0, 60)}“`)
  }
}

for (const datei of liste) {
  const name = basename(datei, '.json')
  let blaetter: Blatt[]
  try {
    blaetter = JSON.parse(readFileSync(datei, 'utf8'))
  } catch (e) {
    melde('F', name, 'kein gültiges JSON: ' + (e as Error).message)
    continue
  }
  if (!Array.isArray(blaetter)) {
    melde('F', name, 'Datei muss eine Liste von Blättern sein')
    continue
  }
  const bereich = BEREICHE.find((b) => b.id === bereichAusDatei(name))
  blaetter.forEach((b, i) => {
    const wo = `${name}#${i + 1} ${b.id ?? '(ohne id)'}`
    if (!b.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.id)) melde('F', wo, 'id fehlt oder ungültig (nur a–z, 0–9, Bindestrich)')
    if (ids.has(b.id)) melde('F', wo, `id doppelt (auch in ${ids.get(b.id)})`)
    ids.set(b.id, name)
    if (bereich && b.bereich !== bereich.id) melde('F', wo, `bereich muss „${bereich.id}“ sein`)
    if (!THEMEN.some((t) => t.bereich === b.bereich && t.id === b.thema)) melde('F', wo, `Thema „${b.thema}“ gibt es im Bereich „${b.bereich}“ nicht`)
    if (!Array.isArray(b.stufen) || !b.stufen.length || b.stufen.some((s) => !STUFEN_REIHE.includes(s))) melde('F', wo, 'stufen ungültig')
    const werkzeug = b.bereich === 'werkzeuge'
    if (!werkzeug && b.stufen?.includes('C1') && b.stufen.some((s) => s !== 'C1' && s !== 'C2')) melde('F', wo, 'Spielschul-Blätter nur für C1 (höchstens C1–C2)')
    if (!werkzeug && b.bereich !== 'skills' && b.stufen?.includes('ES') && !b.fr) melde('F', wo, 'Sekundarschul-Blatt braucht eine französische Fassung (fr)')
    if (!Array.isArray(b.sozialform) || !b.sozialform.length || b.sozialform.some((s) => !['einzeln', 'gruppe', 'klasse'].includes(s))) melde('F', wo, 'sozialform ungültig')
    if (!b.dauer) melde('F', wo, 'dauer fehlt')
    if (!Array.isArray(b.eldib) || !b.eldib.length || b.eldib.length > 4) melde('F', wo, '1–4 ELDiB-Ziele angeben')
    for (const e of b.eldib ?? []) if (!eldibGoalById.has(e)) melde('F', wo, `ELDiB-Ziel „${e}“ gibt es nicht`)
    if (!Array.isArray(b.schlagworte) || b.schlagworte.length < 3) melde('H', wo, 'mindestens 3 Schlagworte')
    if (b.bild) {
      const f = bildOk(b.bild)
      if (f) melde('F', wo, 'Leitbild: ' + f)
    }
    pruefeInhalt(wo + ' DE', b.de, b, 'de')
    if (b.fr) pruefeInhalt(wo + ' FR', b.fr, b, 'fr')
  })
  console.log(`${name}: ${blaetter.length} Blätter geprüft`)
}
console.log(`\n${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
