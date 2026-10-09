// Prüft alle Arbeitsblätter in src/data/blaetter/*.json (oder die übergebenen
// Dateien): Aufbau, gültige Bilder/ELDiB-Codes/Quellen, Stufenregeln und Stil.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-pruefen.ts [datei.json …] [--streng]
// Fehler → Exit-Code 1. Hinweise (Stil) werden nur gezeigt; mit --streng zählen sie als Fehler.
// Spielschule: Einheiten ganz ohne „Beobachten & Begleiten“ erscheinen nur in der Zusammenfassung (○, zählt nicht);
// sobald eine Einheit eines der neuen Felder hat, ist jedes fehlende ein Hinweis. Noch nicht gegengelesenes
// Luxemburgisch wird je Einheit aufgelistet (○, zählt nicht) – Prüfliste: scripts/lb-liste.ts.
// Experiment der Woche: Einheiten ohne `experiment` zählen nur in der Zusammenfassung (○); ein vorhandenes Experiment
// wird streng geprüft (Längen, damit die Seite „Forschen“ nie überläuft, Sicherheit, verbotene Stoffe).
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Baustein, Bildtext, Blatt, BlattInhalt, Brieftext, Experiment, Forscherblatt, Spielideen, Sprache } from '../src/blatt/typen'
import { BEREICHE, THEMEN, STUFEN_REIHE } from '../src/blatt/katalog'
import { hatIcon } from '../src/blatt/zeichnung'
import { GEFUEHLE, gefuehlWort } from '../src/blatt/gesichter'
import { FIGUREN, POSEN } from '../src/blatt/figuren'
import { MOTIV_NAMEN } from '../src/blatt/motive'
import { QUELLEN_TEXTE } from '../src/blatt/quellen'
import { eldibGoalById } from '../src/data/taxonomy'
import { bereichAusDatei } from '../src/blatt/nummern'
import { flaecheGroesse, geoPunkte, kommaSprung, MM, stuecke, temperaturSkala, wert } from '../src/blatt/pdf/mathe'
import { SEITE } from '../src/blatt/pdf/stil'
import { spaltenFest } from '../src/blatt/pdf/bausteine'
import { DOMAENEN, FARBWOERTER as ALLE_FARBEN, PUNKTE_FORMEN, SICHERHEIT_STANDARD, fremdeFarbtokens, hashText, labyrinth, labyrinthMasse, labyrinthWeg, MM as MM_SP, spielHoehe, suchbildLage, suchbildMasse } from '../src/blatt/spielschule'
import { KLEIDER } from '../src/blatt/kleidung'
import { GRENZEN, PHAENOMENE, forscherBildGueltig, heissesWasser, textVon, verboteneStoffe } from '../src/blatt/forschen'

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
const FARBWOERTER: string[] = ALLE_FARBEN
/** Spielschule: Bausteine zum Tun, die eine ganze Seite brauchen (nicht in Spalten). */
const SPIEL_ARTEN = ['schneiden_kleben', 'memory', 'labyrinth', 'laufweg', 'minibuch', 'punkte_verbinden', 'klappbild', 'faedelkarte', 'bastelbogen', 'suchbild', 'anziehpuppe']
/** Französisch auf Kinderblättern (C1): keine inklusiven Formen mit Mittelpunkt (« joyeux·se ») – nicht vorlesbar. */
const MITTELPUNKT = /\p{L}·\p{L}/u
const ARTEN = new Set([
  'aufgabe', 'text', 'info', 'geschichte', 'bild', 'spalten', 'abstand', 'seitenumbruch', 'linien', 'frage', 'satzanfaenge', 'feld', 'tabelle',
  'wennDann', 'dialog', 'vertrag', 'ankreuzen', 'bilder', 'wortspeicher', 'skala', 'einschaetzung', 'zuordnen', 'gefuehle', 'ampel', 'thermometer',
  'vulkan', 'eisberg', 'koerper', 'batterie', 'waage', 'leiter', 'zielscheibe', 'hand', 'mindmap', 'schritte', 'plan', 'tagesplan', 'atmen', 'comic',
  'karten', 'rueckblick', 'notfall', 'gefuehlsrad', 'glaeser', 'netz', 'kurve', 'tageskreis', 'farbkalender', 'rechnungen', 'kaestchen', 'bon',
  'paeckchen', 'stellentafel', 'hunderterfeld', 'zahlenstrahl', 'bruchbilder', 'treppe', 'kommasprung', 'geo',
  'flaeche', 'temperatur',
  'diagramm', 'strichliste',
  ...SPIEL_ARTEN,
])
/** Spielschule: Forscherblatt zum Experiment der Woche (eine ganze Seite) */
ARTEN.add('forscherblatt')
/** Passgenau: Karten und Hilfen für Einzelstunden (src/blatt/pdf/passgenau.tsx) */
for (const a of ['zielkarte', 'checkin', 'wahlkarte', 'stundenleiste', 'abhaken']) ARTEN.add(a)

/** Mathe: Dezimalzahl mit Komma („12,5“) als Zahl – oder NaN */
const ZAHL = /^\d+(,\d+)?$/
const zahl = (x: string) => (ZAHL.test(x) ? Number(x.replace(',', '.')) : NaN)
const gleich = (a: number, b: number) => Math.abs(a - b) < 1e-9
/** „0,89 €“ → 0,89 */
const PREIS = /^(\d+,\d{2}) €$/

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
  // \n Zeilenumbruch, \t Tabulator im Päckchen (rechter Teil bündig) – beide werden nicht als Zeichen gesetzt
  return [...new Set([...x].filter((ch) => ch !== '\n' && ch !== '\t' && !ZEICHEN.has(ch.codePointAt(0) ?? 0)))].join(' ')
}

/** Spielschule: Einheiten noch ohne „Beobachten & Begleiten“ und ungeprüftes Luxemburgisch (zählen nicht als Fehler) */
const ohneBegleiten: string[] = []
let lbOffen = 0
let lbEinheiten = 0
function info(wo: string, text: string) {
  console.log(`○ ${wo}: ${text}`)
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

const KEINE_TEXTE = new Set(['bild', 'art', 'figuren', 'requisit', 'farbe', 'uebung', 'symbole', 'start', 'ziel', 'klappe', 'titelbild', 'paar', 'figur', 'kleider', 'form', 'vorlage', 'ohren', 'szene', 'farben', 'modus', 'niveau'])
function texteVon(b: Baustein): string[] {
  const out: string[] = []
  const add = (x: unknown) => {
    if (typeof x === 'string') out.push(x)
    else if (Array.isArray(x)) x.forEach(add)
    else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => !KEINE_TEXTE.has(k) && add(v))
  }
  add(b)
  return out
}

/** verfügbare Breite in pt (wie in BlattDokument/Spalten) */
const BREITE = 595.28 - SEITE.rand * 2

/** Bilder je Reihe und Kartenbreite wie im Baustein „bilder“ (schmale Spalten: weniger je Reihe). */
function bilderRaster(b: Extract<Baustein, { art: 'bilder' }>, breite: number): { sp: number; kb: number } {
  const spMax = Math.max(1, Math.floor((breite + 10) / ((b.klein ? 110 : 70) + 10)))
  const sp = Math.min(b.spalten ?? (b.bilder.length <= 4 ? b.bilder.length : 3), spMax)
  return { sp, kb: (breite - 10 * (sp - 1)) / sp }
}

/** Grobe Höhe eines Bausteins in pt – nur, um zu hohe Spalten zu finden (Spalten brechen nicht um). */
function hoeheGrob(b: Baustein, breite: number, zeile: number): number {
  switch (b.art) {
    case 'aufgabe':
      return 44
    case 'bilder': {
      const { sp, kb } = bilderRaster(b, breite)
      const reihen = Math.ceil(b.bilder.length / sp)
      if (b.klein) return reihen * 52
      const bildB = Math.min(kb * 0.62, 110)
      return reihen * (bildB * 0.95 + 30 + (b.bilder.some((x) => x.text) ? 24 : 0) + (b.modus === 'ankreuzen' ? 36 : 0))
    }
    case 'feld':
      return (b.hoehe ?? 4) * zeile
    case 'bild':
      return { s: 60, m: 100, l: 160, xl: 240 }[b.groesse ?? 'm'] * 1.3
    case 'linien':
      return b.anzahl * zeile
    case 'frage':
      return (b.linien ?? 2) * zeile + 20
    default:
      return spielHoehe(b, breite) ?? 90
  }
}

function pruefeBausteine(wo: string, liste: Baustein[], blatt: Blatt, sprache: Sprache, tiefe = 0, breite = BREITE) {
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
        if (b.stufe !== undefined && ![1, 2, 3].includes(b.stufe)) melde('F', w, 'Stufe 1, 2 oder 3')
        if (b.stufe && blatt.bereich !== 'mathe') melde('H', w, 'Stufen-Punkte sind für Mathe-Blätter gedacht')
        if (b.niveau !== undefined && !['einstieg', 'stern'].includes(b.niveau)) melde('F', w, 'niveau: „einstieg“ oder „stern“')
        break
      case 'rechnungen':
        if (!b.items?.length || b.items.length > 12) melde('F', w, '1–12 Rechnungen')
        if (b.spalten && ![1, 2, 3, 4].includes(b.spalten)) melde('F', w, '1–4 Spalten')
        for (const r of b.items ?? []) {
          const wo2 = `${w} ${(r.zeilen ?? []).join(r.op === '-' ? ' - ' : ' + ')}`
          if (!r.zeilen || r.zeilen.length < 2 || r.zeilen.length > 4) { melde('F', wo2, '2–4 Zahlen je Rechnung'); continue }
          if (r.op && !['+', '-'].includes(r.op)) melde('F', wo2, 'Rechenzeichen + oder -')
          if (r.op === '-' && r.zeilen.length !== 2) melde('F', wo2, 'Minus: genau 2 Zahlen')
          const z = r.zeilen.map(zahl)
          if (z.some(Number.isNaN)) { melde('F', wo2, 'Zahlen nur mit Ziffern und Komma (z. B. 12,5)'); continue }
          if (r.ergebnis !== undefined) {
            const e = zahl(r.ergebnis), soll = r.op === '-' ? z[0] - z[1] : z.reduce((a, x) => a + x, 0)
            if (Number.isNaN(e) || !gleich(e, soll)) melde('F', wo2, `Ergebnis „${r.ergebnis}“ stimmt nicht`)
          }
          if (r.op === '-' && z[1] > z[0]) melde('F', wo2, 'Ergebnis wäre negativ')
        }
        break
      case 'kaestchen':
        if (!b.zeilen || b.zeilen < 1 || b.zeilen > 20) melde('F', w, 'Kästchen: 1–20 Zeilen')
        break
      case 'bon': {
        if (!b.posten?.length || b.posten.length > 10) melde('F', w, 'Bon: 1–10 Posten')
        let summe = 0
        for (const x of b.posten ?? []) {
          const m = PREIS.exec(x.preis ?? '')
          if (!m) melde('F', w, `Preis „${x.preis}“: bitte wie „0,89 €“`)
          else summe += zahl(m[1])
        }
        if (b.summe !== undefined) {
          const m = PREIS.exec(b.summe)
          if (!m || !gleich(zahl(m[1]), summe)) melde('F', w, `Summe „${b.summe}“ stimmt nicht (${summe.toFixed(2).replace('.', ',')} €)`)
        }
        break
      }
      case 'spalten':
        if (tiefe) melde('F', w, 'Spalten dürfen nicht verschachtelt werden')
        for (const x of [...(b.links ?? []), ...(b.rechts ?? [])]) {
          if (x.art === 'seitenumbruch') melde('F', w, 'Kein Seitenumbruch in Spalten (Spalten mit Bildern brechen als Ganzes nicht um, dort wirkt er nicht)')
          if (SPIEL_ARTEN.includes(x.art)) melde('F', w, `„${x.art}“ braucht die ganze Breite – nicht in Spalten`)
        }
        {
          const [l, r] = b.verhaeltnis === '2:1' ? [2, 1] : b.verhaeltnis === '1:2' ? [1, 2] : [1, 1]
          const bl = ((breite - 16) * l) / (l + r)
          const zeile = blatt.layout === 'bild' || blatt.stufen.includes('C1') ? 36 : 28
          const hoch = Math.max(...[b.links ?? [], b.rechts ?? []].map((seite, k) => seite.reduce((a, x) => a + hoeheGrob(x, k ? breite - 16 - bl : bl, zeile) + 12, 0)))
          if (hoch > 700 && spaltenFest(b, blatt.layout ?? (blatt.stufen.includes('C1') ? 'bild' : ''))) melde('F', w, `Spalten zu hoch für eine Seite (ca. ${Math.round(hoch)} pt) – Spalten brechen nicht um; Inhalt kürzen oder ohne Spalten setzen`)
          pruefeBausteine(w + ' links', b.links ?? [], blatt, sprache, tiefe + 1, bl)
          pruefeBausteine(w + ' rechts', b.rechts ?? [], blatt, sprache, tiefe + 1, breite - 16 - bl)
        }
        break
      case 'paeckchen':
        if (!b.items?.length || b.items.length > 16) melde('F', w, 'Päckchen: 1–16 Aufgaben')
        if (b.spalten && ![1, 2, 3, 4].includes(b.spalten)) melde('F', w, '1–4 Spalten')
        for (const x of b.items ?? []) {
          if (/_{1,2}(?!_)/.test(x.replace(/_{3,}/g, '')) && !/#[^#]*_[^#]*#/.test(x)) melde('H', w, `„${x}“: Antwortlinie mit mindestens drei _`)
          if ((x.match(/#/g) ?? []).length % 2) melde('F', w, `„${x}“: Bruch nicht geschlossen (#z/n#)`)
          if ((x.match(/\{/g) ?? []).length !== (x.match(/\}/g) ?? []).length) melde('F', w, `„${x}“: Klammer { } nicht geschlossen`)
          stuecke(x)
        }
        break
      case 'stellentafel': {
        if (b.stellen.length < 2 || b.stellen.length > 8) melde('F', w, 'Stellentafel: 2–8 Stellen')
        if (b.komma < 1 || b.komma > b.stellen.length) melde('F', w, 'Stellentafel: Komma nach Stelle 1 … Anzahl der Stellen')
        for (const z of b.zeilen) {
          if (!z.zahl) continue
          if (!/^\d+(,\d+)?$/.test(z.zahl)) { melde('F', w, `Stellentafel: „${z.zahl}“ ist keine Zahl`); continue }
          const [g, nk = ''] = z.zahl.split(',')
          if (g.length > b.komma || nk.length > b.stellen.length - b.komma) melde('F', w, `Stellentafel: „${z.zahl}“ passt nicht in die Stellen`)
        }
        break
      }
      case 'hunderterfeld':
        if (!b.felder?.length || b.felder.length > 8) melde('F', w, 'Hunderterfeld: 1–8 Felder')
        for (const f of b.felder ?? []) if (f.gefaerbt !== undefined && (f.gefaerbt < 0 || f.gefaerbt > 100 || !Number.isInteger(f.gefaerbt))) melde('F', w, 'Hunderterfeld: 0–100 gefärbte Kästchen')
        break
      case 'zahlenstrahl': {
        const von = wert(b.von), bis = wert(b.bis), schritt = wert(b.schritt), fein = b.fein ? wert(b.fein) : 0
        if ([von, bis, schritt].some(Number.isNaN) || bis <= von || schritt <= 0) { melde('F', w, 'Zahlenstrahl: von < bis, Schritt > 0'); break }
        const teilt = (a: number, d: number) => Math.abs(a / d - Math.round(a / d)) < 1e-6
        if (!teilt(bis - von, schritt) || (bis - von) / schritt > 20) melde('F', w, 'Zahlenstrahl: Schritt muss die Länge in höchstens 20 Teile teilen')
        if (fein && (!teilt(schritt, fein) || (bis - von) / fein > 100)) melde('F', w, 'Zahlenstrahl: feine Striche müssen den Schritt teilen (höchstens 100)')
        for (const z of [...(b.zahlen ?? []), ...(b.punkte ?? []).map((p) => p.wert)]) {
          const v = wert(z)
          if (Number.isNaN(v) || v < von - 1e-9 || v > bis + 1e-9) melde('F', w, `Zahlenstrahl: „${z}“ liegt nicht zwischen ${b.von} und ${b.bis}`)
          else if (fein && !teilt(v - von, fein) && (b.zahlen ?? []).includes(z)) melde('H', w, `Zahlenstrahl: „${z}“ liegt nicht auf einem Strich`)
        }
        break
      }
      case 'bruchbilder':
        if (!b.items?.length || b.items.length > 12) melde('F', w, 'Bruchbilder: 1–12 Bilder')
        for (const x of b.items ?? []) {
          const n = x.form === 'menge' ? (x.gruppen ?? 0) : x.teile ?? 1
          if (['kreis', 'rechteck', 'streifen'].includes(x.form) && (!x.teile || x.teile < 1 || x.teile > 12)) melde('F', w, 'Bruchbild: 1–12 Teile')
          if (x.ungleich && ![2, 3, 4, 5, 6].includes(x.teile ?? 0)) melde('F', w, 'Bruchbild: ungleiche Teile nur bei 2–6 Teilen')
          if ((x.gefaerbt ?? 0) > n) melde('F', w, 'Bruchbild: mehr gefärbt als Teile')
          if (x.form === 'menge') {
            if (!x.anzahl || x.anzahl > 40) melde('F', w, 'Menge: 1–40 Punkte')
            if (x.gruppen && (x.anzahl ?? 0) % x.gruppen) melde('F', w, 'Menge: Punkte lassen sich nicht in gleiche Gruppen teilen')
          }
          if (x.form === 'wand' && (!x.nenner?.length || x.nenner.some((d) => d < 1 || d > 12))) melde('F', w, 'Bruchwand: Nenner 1–12')
          if (x.bruch && !/^\d+\/\d+$/.test(x.bruch)) melde('F', w, `Bruchbild: „${x.bruch}“ – bitte wie „3/4“ (oder '' für leer)`)
        }
        break
      case 'treppe':
        if (b.stufen.length < 2 || b.stufen.length > 5) melde('F', w, 'Treppe: 2–5 Stufen')
        break
      case 'flaeche': {
        if (!b.felder?.length || b.felder.length > 8) melde('F', w, 'Fläche: 1–8 Felder')
        if (b.spalten && ![1, 2, 3, 4].includes(b.spalten)) melde('F', w, 'Fläche: 1–4 Spalten')
        const sp = b.spalten ?? Math.min(4, b.felder?.length ?? 1)
        const spalteMm = (breite - (sp - 1) * 10) / sp / MM
        for (const f of b.felder ?? []) {
          if (!(f.l >= 0 && f.b >= 0)) { melde('F', w, 'Fläche: Länge und Breite in cm angeben'); continue }
          const leer = !f.l || !f.b
          if (leer && !f.feld) melde('F', w, 'Fläche ohne Rechteck braucht ein Karo-Feld (feld)')
          if (!leer && f.kaestchen !== false && (!Number.isInteger(f.l) || !Number.isInteger(f.b))) melde('F', w, `Fläche ${f.l} × ${f.b}: Kästchen nur bei ganzen Zentimetern (sonst kaestchen: false)`)
          if (f.feld && (!f.feld.every(Number.isInteger) || f.feld[0] < f.l || f.feld[1] < f.b)) melde('F', w, 'Fläche: Karo-Feld in ganzen cm und nicht kleiner als das Rechteck')
          if (f.feld && f.masse && !leer && (f.feld[0] - f.l < 2 || f.feld[1] - f.b < 2)) melde('F', w, 'Fläche: für die Maße mindestens 1 cm Karo um das Rechteck')
          if ((f.gefaerbt ?? 0) > f.l * f.b) melde('F', w, 'Fläche: mehr Kästchen gefärbt als vorhanden')
          const g = flaecheGroesse(f)
          if (g.B > spalteMm + 0.01) melde('F', w, `Fläche: Feld ${g.B.toFixed(0)} mm breit, Platz ist nur ${spalteMm.toFixed(1)} mm`)
          if (g.H > 200) melde('F', w, 'Fläche: Feld höchstens 20 cm hoch')
        }
        break
      }
      case 'temperatur': {
        if (![b.von, b.bis].every(Number.isInteger) || b.bis <= b.von || b.bis - b.von > 60) { melde('F', w, 'Thermometer: von < bis in ganzen Grad, Spanne höchstens 60'); break }
        if (!b.items?.length || b.items.length > 8) melde('F', w, 'Thermometer: 1–8 Stück')
        const sp = b.spalten ?? Math.min(6, b.items?.length ?? 1)
        const zelle = (breite - (sp - 1) * 10) / sp
        const W = temperaturSkala(b).W
        if (zelle < W) melde('F', w, `Thermometer: ${sp} Spalten zu eng (${zelle.toFixed(0)} pt Platz, ${W.toFixed(0)} pt nötig)`)
        for (const x of b.items ?? []) {
          for (const v of [x.wert, x.ziel]) if (v !== undefined && (!Number.isInteger(v) || v < b.von || v > b.bis)) melde('F', w, `Thermometer: ${v} °C liegt nicht auf der Skala (${b.von} bis ${b.bis})`)
          if (x.pfeil && (x.wert === undefined || x.ziel === undefined)) melde('F', w, 'Thermometer: Pfeil braucht wert und ziel')
          // Änderung unter dem Pfeil nachrechnen: Text endet mit „+8 °C“ bzw. „–9 °C“
          const m = /([+–-])[  ]?(\d+)[  ]?°C\}?$/.exec(x.text ?? '')
          if (x.pfeil && m && x.wert !== undefined && x.ziel !== undefined) {
            const aenderung = (m[1] === '+' ? 1 : -1) * Number(m[2])
            if (aenderung !== x.ziel - x.wert) melde('F', w, `Thermometer: von ${x.wert} °C nach ${x.ziel} °C ist ${x.ziel - x.wert}, nicht „${x.text}“`)
          }
        }
        break
      }
      case 'kommasprung':
        if (!b.items?.length || b.items.length > 9) melde('F', w, 'Kommasprung: 1–9 Aufgaben')
        for (const x of b.items ?? []) {
          if (!/^\d+(,\d+)?$/.test(x.zahl)) { melde('F', w, `Kommasprung: „${x.zahl}“ ist keine Zahl`); continue }
          if (![10, 100, 1000].includes(x.faktor) || !['·', ':'].includes(x.op)) melde('F', w, 'Kommasprung: · oder : mit 10, 100, 1000')
          const e = kommaSprung(x.zahl, x.op, x.faktor).ergebnis
          const soll = x.op === '·' ? wert(x.zahl) * x.faktor : wert(x.zahl) / x.faktor
          if (Math.abs(wert(e) - soll) > 1e-9) melde('F', w, `Kommasprung: interne Rechnung ${x.zahl} ${x.op} ${x.faktor} ergibt ${e}`)
          if (x.ergebnis !== undefined && Math.abs(wert(x.ergebnis) - soll) > 1e-9) melde('F', w, `Kommasprung: ${x.zahl} ${x.op} ${x.faktor} ist nicht ${x.ergebnis}`)
        }
        break
      case 'geo': {
        const sp = b.spalten ?? Math.min(4, b.felder.length)
        const spalteMm = (breite - (sp - 1) * 10) / sp / MM
        for (const f of b.felder ?? []) {
          const B = f.b ?? Math.floor(spalteMm)
          if (B > spalteMm + 0.01) melde('F', w, `Geo-Feld ${B} mm breit, Platz ist nur ${spalteMm.toFixed(1)} mm`)
          if (!f.h || f.h > 200) melde('F', w, 'Geo-Feld: Höhe 1–200 mm')
          const namen = geoPunkte(f)
          const drin = (x: number, y: number) => x >= 0 && x <= B && y >= 0 && y <= f.h
          const ref = (p: unknown) => (typeof p === 'string' ? namen.has(p) : Array.isArray(p) && p.length === 2 && drin(p[0], p[1]))
          for (const e of f.elemente ?? []) {
            if (e.t === 'punkt' && !drin(e.x, e.y)) melde('F', w, `Punkt ${e.name ?? ''} liegt außerhalb des Feldes`)
            if (e.t === 'linie' && (!ref(e.von) || !ref(e.bis))) melde('F', w, `Linie: Punkt ${JSON.stringify(e.von)} oder ${JSON.stringify(e.bis)} fehlt oder liegt außerhalb`)
            if (e.t === 'vieleck') for (const q of e.punkte) if (!drin(q[0], q[1])) melde('F', w, 'Vieleck: Ecke außerhalb des Feldes')
            if (e.t === 'lineal' && (e.x0 - 4 < 0 || e.x0 + e.cm * 10 + 4 > B || e.y + 11 > f.h)) melde('F', w, 'Lineal ragt aus dem Feld')
            if (e.t === 'uhr' && (e.x - e.r < 0 || e.x + e.r > B || e.y - e.r < 0 || e.y + e.r > f.h)) melde('F', w, 'Uhr ragt aus dem Feld')
          }
        }
        break
      }
      case 'diagramm': {
        const n = b.kategorien?.length ?? 0
        if (n < 2 || n > 12) melde('F', w, 'Diagramm: 2–12 Kategorien')
        const teilt = (a: number, d: number) => Math.abs(a / d - Math.round(a / d)) < 1e-6
        if (!(b.max > 0) || !(b.schritt > 0) || !teilt(b.max, b.schritt) || b.max / b.schritt > 20) { melde('F', w, 'Diagramm: max > 0 und ein Vielfaches von schritt (höchstens 20 Schritte)'); break }
        if (b.fein !== undefined && (!(b.fein > 0) || !teilt(b.schritt, b.fein) || b.max / b.fein > 60)) melde('F', w, 'Diagramm: fein muss den Schritt teilen (höchstens 60 Linien)')
        if (b.werte && b.werte.length !== n) melde('F', w, `Diagramm: ${b.werte.length} Werte für ${n} Kategorien`)
        for (const v of b.werte ?? []) {
          if (v === null) continue
          if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > b.max) melde('F', w, `Diagramm: Wert ${v} liegt nicht zwischen 0 und ${b.max}`)
          else if (!teilt(v, b.fein ?? b.schritt)) melde('H', w, `Diagramm: Wert ${v} liegt nicht auf einer Gitterlinie – kaum genau abzulesen`)
        }
        if (b.linie && !(b.linie.wert >= 0 && b.linie.wert <= b.max)) melde('F', w, 'Diagramm: Linie außerhalb der Skala')
        if (b.einheiten && (b.max > 30 || (b.werte ?? []).some((v) => v !== null && !Number.isInteger(v)))) melde('H', w, 'Diagramm: Kästchen (einheiten) nur bei ganzen Werten bis 30')
        // Beschriftung: stehend höchstens zwei Zeilen unter der Säule, liegend links (ein Drittel der Breite)
        const zeichen = (pt: number) => Math.floor(pt / (8.5 * 0.56))
        const platz = b.liegend ? zeichen(breite * 0.34 - 12) : zeichen(Math.min(66, (breite - 40) / Math.max(1, n)) - 4)
        for (const k of b.kategorien ?? []) {
          const wortZuLang = k.split(/\s+/).some((x) => x.length > platz)
          if (wortZuLang || k.length > (b.liegend ? platz : platz * 2)) melde('H', w, `Diagramm: „${k}“ ist als Beschriftung zu lang (Platz für etwa ${platz} Zeichen je Zeile)`)
        }
        for (const a of b.achsen ?? []) if (a.length > 30) melde('H', w, `Diagramm: Achsentitel „${a}“ zu lang (max. 30 Zeichen)`)
        break
      }
      case 'strichliste': {
        const z = b.zeilen ?? []
        if (!z.length || z.length > 12) melde('F', w, 'Strichliste: 1–12 Zeilen')
        if (b.kopf && b.kopf.length !== 3) melde('F', w, 'Strichliste: kopf mit genau 3 Spaltentiteln')
        for (const x of z) {
          for (const v of [x.striche, x.anzahl]) if (v !== undefined && (!Number.isInteger(v) || v < 0 || v > 40)) melde('F', w, `Strichliste: „${x.text}“ – Striche und Häufigkeit als ganze Zahl von 0 bis 40`)
          if (x.striche !== undefined && x.anzahl !== undefined && x.striche !== x.anzahl) melde('F', w, `Strichliste: „${x.text}“ hat ${x.striche} Striche, aber die Häufigkeit ${x.anzahl}`)
        }
        const zahlen = z.map((x) => x.anzahl ?? x.striche)
        if (typeof b.summe === 'number' && zahlen.every((v) => v !== undefined)) {
          const s = zahlen.reduce((a: number, v) => a + (v ?? 0), 0)
          if (s !== b.summe) melde('F', w, `Strichliste: Gesamt ${b.summe} stimmt nicht (Summe der Häufigkeiten: ${s})`)
        }
        if (b.daten?.length) {
          // Urliste nachzählen, wenn die Zeilen die Werte der Daten tragen
          const norm = (s: string) => s.trim().toLowerCase()
          const zaehlung = new Map<string, number>()
          for (const d of b.daten) zaehlung.set(norm(d), (zaehlung.get(norm(d)) ?? 0) + 1)
          if (z.some((x) => zaehlung.has(norm(x.text)))) {
            for (const d of zaehlung.keys()) if (!z.some((x) => norm(x.text) === d)) melde('H', w, `Strichliste: „${d}“ aus den Daten hat keine Zeile`)
            for (const x of z) {
              const soll = zaehlung.get(norm(x.text)) ?? 0
              const ist = x.anzahl ?? x.striche
              if (ist !== undefined && ist !== soll) melde('F', w, `Strichliste: „${x.text}“ kommt ${soll}-mal in den Daten vor, nicht ${ist}-mal`)
            }
          }
          if (typeof b.summe === 'number' && b.summe !== b.daten.length) melde('F', w, `Strichliste: ${b.daten.length} Daten, Gesamt ist aber ${b.summe}`)
        }
        break
      }
      case 'geschichte':
        if (b.bild) bilder.push(b.bild)
        if (b.text.length > 900) melde('H', w, 'Geschichte sehr lang (> 900 Zeichen)')
        break
      case 'bild':
        bilder.push(b.bild)
        break
      case 'bilder': {
        b.bilder.forEach((x) => bilder.push(x.bild))
        if (b.bilder.length > 9) melde('H', w, 'mehr als 9 Bilder')
        // Spielschule: Wort unter dem Bild muss bei mind. 11 pt in die Karte passen (Kinderschrift ca. 0,54 em je Zeichen)
        if (!b.klein && blatt.stufen.includes('C1')) {
          const innen = bilderRaster(b, breite).kb - 12
          for (const wort of new Set(b.bilder.map((x) => (x.text ?? '').replace(/[{}]/g, '').split(/\s+/).reduce((a, y) => (y.length > a.length ? y : a), '')))) {
            if (wort.length * 11 * 0.54 > innen) melde('H', w, `„${wort}“ ist für die Karte zu lang (Platz für ca. ${Math.floor(innen / (11 * 0.54))} Zeichen) – weniger Spalten oder kürzeres Wort`)
          }
        }
        break
      }
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
        if (b.woerter && b.woerter.length > b.gefuehle.length) melde('F', w, 'gefuehle: mehr Wörter als Gesichter')
        // Französisch C1: die Standardwörter haben Mittelpunkt-Formen (« joyeux·se ») – eigene Wörter angeben
        if (sprache === 'fr' && blatt.stufen.includes('C1') && b.modus !== 'benennen') {
          const fremd = b.gefuehle.filter((g, i) => !b.woerter?.[i] && MITTELPUNKT.test(gefuehlWort(g, 'fr'))).map((g) => gefuehlWort(g, 'fr'))
          if (fremd.length) melde('F', w, `Kinderblatt (C1): inklusive Form unter dem Gesicht (${fremd.join(', ')}) – mit „woerter“ eigene Wörter angeben, z. B. « content », « surpris »`)
        }
        break
      // --- Spielschule: Bausteine zum Tun ------------------------------------------------------------------
      case 'schneiden_kleben':
        if (!b.bilder?.length || b.bilder.length < 3 || b.bilder.length > 6) melde('F', w, 'Schneiden & Kleben: 3–6 Bilder')
        b.bilder?.forEach((x) => {
          bilder.push(x.bild)
          if ((x.text ?? '').length > 16) melde('H', w, `Wort unter der Karte zu lang („${x.text}“, max. 16 Zeichen)`)
        })
        break
      case 'memory': {
        const n = b.bilder?.length ?? 0
        if (n < 4 || n > 8) melde('F', w, 'Memory: 4–8 Paare')
        if (b.rueckseite && n > 6) melde('F', w, 'Memory mit Rückseite: höchstens 6 Paare (sonst zu kleine Karten)')
        b.bilder?.forEach((x) => {
          bilder.push(x.bild)
          if (x.paar) bilder.push(x.paar)
          if ((x.text ?? '').length > 14) melde('H', w, `Wort auf der Memory-Karte zu lang („${x.text}“, max. 14 Zeichen)`)
        })
        break
      }
      case 'labyrinth': {
        bilder.push(b.start, b.ziel)
        const st = b.stufe ?? 1
        if (![1, 2, 3].includes(st)) { melde('F', w, 'Labyrinth: stufe 1, 2 oder 3'); break }
        if (b.seed !== undefined && (!Number.isInteger(b.seed) || b.seed < 0)) melde('F', w, 'Labyrinth: seed als ganze Zahl ≥ 0')
        const gang = labyrinthMasse(st, breite).zelle / MM_SP
        if (gang < 10) melde('F', w, `Labyrinth: Gänge nur ${gang.toFixed(1)} mm breit (mind. 10 mm) – kleinere Stufe oder ganze Breite`)
        // genau das Labyrinth, das gedruckt wird (gleicher Startwert wie im PDF)
        if (!labyrinthWeg(labyrinth(st, b.seed ?? hashText(b.start + '>' + b.ziel + st)))) melde('F', w, 'Labyrinth ist nicht lösbar (interner Fehler)')
        break
      }
      case 'laufweg':
        if (!b.felder?.length || b.felder.length < 10 || b.felder.length > 16) melde('F', w, 'Laufweg: 10–16 Felder')
        for (const f of b.felder ?? []) {
          if (!f.bild && !f.text) melde('F', w, 'Laufweg: Feld braucht ein Bild oder ein Wort')
          if (f.bild) bilder.push(f.bild)
          if ((f.text ?? '').length > 14) melde('H', w, `Laufweg: „${f.text}“ zu lang für ein Feld (max. 14 Zeichen)`)
        }
        for (const x of [b.start, b.ziel, ...(b.figuren ?? [])]) if (x) bilder.push(x)
        if ((b.figuren?.length ?? 0) > 6) melde('F', w, 'Laufweg: höchstens 6 Spielfiguren')
        break
      case 'minibuch':
        if (b.seiten?.length !== 6) melde('F', w, 'Mini-Buch: genau 6 Innenseiten (dazu Titel und Rückseite)')
        if (!b.titel?.trim()) melde('F', w, 'Mini-Buch: Titel fehlt')
        else if (b.titel.length > 28) melde('H', w, `Mini-Buch: Titel lang (${b.titel.length} Zeichen, max. 28)`)
        if (b.titelbild) bilder.push(b.titelbild)
        for (const x of b.seiten ?? []) {
          if (x.bild) bilder.push(x.bild)
          if ((x.text ?? '').length > 18) melde('H', w, `Mini-Buch: „${x.text}“ zu lang für eine Seite (max. 18 Zeichen)`)
        }
        break
      case 'punkte_verbinden': {
        if (!b.punkte?.length && !(b.form && PUNKTE_FORMEN[b.form])) { melde('F', w, `Punkte verbinden: form (${Object.keys(PUNKTE_FORMEN).join(', ')}) oder punkte angeben`); break }
        const pk = b.punkte?.length ? b.punkte : PUNKTE_FORMEN[b.form!].punkte
        if (pk.length < 4 || pk.length > 10) melde('F', w, `Punkte verbinden: 4–10 Punkte (jetzt ${pk.length})`)
        if (pk.some((q) => !Array.isArray(q) || q.length !== 2 || q.some((v) => typeof v !== 'number' || v < 0 || v > 100))) melde('F', w, 'Punkte verbinden: Punkte als [x, y] mit Werten von 0 bis 100')
        else
          for (let i = 0; i < pk.length; i++)
            for (let j = i + 1; j < pk.length; j++)
              if (Math.hypot(pk[i][0] - pk[j][0], pk[i][1] - pk[j][1]) < 12) melde('H', w, `Punkte verbinden: Punkt ${i + 1} und ${j + 1} liegen zu nah beieinander (Zahlen überlappen)`)
        break
      }
      case 'klappbild':
        if (!b.bilder?.length || b.bilder.length < 2 || b.bilder.length > 6) melde('F', w, 'Klappbild: 2–6 Bilder')
        b.bilder?.forEach((x) => bilder.push(x.bild))
        if (b.klappe) bilder.push(b.klappe)
        break
      case 'faedelkarte':
        if (b.form && !['kreis', 'oval', 'herz', 'stern', 'quadrat'].includes(b.form)) melde('F', w, 'Fädelkarte: form kreis, oval, herz, stern oder quadrat')
        if (b.loecher !== undefined && (!Number.isInteger(b.loecher) || b.loecher < 8 || b.loecher > 24)) melde('F', w, 'Fädelkarte: 8–24 Löcher')
        if (b.bild) bilder.push(b.bild)
        break
      case 'bastelbogen':
        if (!['maske', 'krone', 'stirnband', 'fahne'].includes(b.vorlage)) { melde('F', w, 'Bastelbogen: vorlage maske, krone, stirnband oder fahne'); break }
        if (b.ohren && !['katze', 'hase', 'baer', 'maus'].includes(b.ohren)) melde('F', w, 'Bastelbogen: ohren katze, hase, baer oder maus')
        if (b.ohren && !['maske', 'stirnband'].includes(b.vorlage)) melde('F', w, 'Bastelbogen: Ohren nur bei Maske und Stirnband')
        if (b.farben && b.vorlage !== 'fahne') melde('F', w, 'Bastelbogen: farben nur bei der Fahne')
        if (b.farben && (b.farben.length < 2 || b.farben.length > 4)) melde('F', w, 'Fahne: 2–4 Streifen')
        for (const f of b.farben ?? []) if (!FARBWOERTER.includes(f)) melde('F', w, `Farbe „${f}“ gibt es nicht (${FARBWOERTER.join(', ')})`)
        if (b.bild) bilder.push(b.bild)
        break
      case 'suchbild': {
        if (!b.suchen?.length || b.suchen.length > 4) { melde('F', w, 'Suchbild: 1–4 Bilder zum Suchen'); break }
        for (const x of b.suchen) {
          bilder.push(x.bild)
          if (!Number.isInteger(x.anzahl) || x.anzahl < 1 || x.anzahl > 6) melde('F', w, 'Suchbild: jedes Bild 1–6 Mal (Zählkästchen)')
        }
        for (const x of b.ablenker ?? []) {
          bilder.push(x.bild)
          if (x.anzahl !== undefined && (!Number.isInteger(x.anzahl) || x.anzahl < 1 || x.anzahl > 6)) melde('F', w, 'Suchbild: Ablenker 1–6 Mal')
          if (b.suchen.some((y) => y.bild === x.bild)) melde('F', w, `Suchbild: „${x.bild}“ ist gesucht und zugleich Ablenker – Zählen stimmt dann nicht`)
        }
        if (b.szene && !['wiese', 'wald', 'wasser', 'schnee', 'zimmer', 'nacht'].includes(b.szene)) melde('F', w, 'Suchbild: szene wiese, wald, wasser, schnee, zimmer oder nacht')
        const gesamt = b.suchen.reduce((a, x) => a + x.anzahl, 0) + (b.ablenker ?? []).reduce((a, x) => a + (x.anzahl ?? 2), 0)
        if (gesamt > 30) melde('F', w, `Suchbild: ${gesamt} Bilder – höchstens 30`)
        else if (!suchbildLage(b, breite, suchbildMasse(b, breite).szeneH).length) melde('F', w, 'Suchbild: Die Bilder passen nicht ohne Überlappung in die Szene – weniger Bilder')
        break
      }
      case 'anziehpuppe':
        if (b.figur && (!FIGUREN[b.figur] || FIGUREN[b.figur].alter !== 'kind')) melde('F', w, 'Anziehpuppe: figur mia, noah, lea, sami, amira oder tom')
        if (!b.kleider?.length || b.kleider.length < 2 || b.kleider.length > 8) melde('F', w, 'Anziehpuppe: 2–8 Kleidungsstücke')
        for (const k of b.kleider ?? []) if (!KLEIDER.includes(k)) melde('F', w, `Kleidungsstück „${k}“ gibt es nicht (${KLEIDER.join(', ')})`)
        if (new Set(b.kleider ?? []).size !== (b.kleider ?? []).length) melde('F', w, 'Anziehpuppe: ein Kleidungsstück doppelt')
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
      case 'forscherblatt':
        if (tiefe) melde('F', w, 'Forscherblatt braucht die ganze Breite – nicht in Spalten')
        if (blatt.bereich !== 'spielschule') melde('F', w, 'Forscherblatt gibt es nur im Bereich Spielschule')
        if (liste[i - 1]?.art !== 'seitenumbruch' || i !== liste.length - 1) melde('H', w, 'Forscherblatt steht allein auf seiner Seite: direkt nach „seitenumbruch“ und als letzter Baustein')
        pruefeForscherblatt(w, b)
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
      // --- Passgenau ---
      case 'zielkarte':
        if (!b.text?.trim()) melde('F', w, 'Zielkarte ohne Ich-Satz')
        if (b.text.length > 120) melde('H', w, `Ich-Satz zu lang (${b.text.length} Zeichen, max. 120)`)
        if ((b.kaestchen ?? b.tage?.length ?? 3) > 7) melde('F', w, 'Zielkarte: höchstens 7 Kästchen')
        break
      case 'checkin':
        if (b.modus && !['gesichter', 'wetter', 'zahl'].includes(b.modus)) melde('F', w, 'checkin: gesichter, wetter oder zahl')
        if (b.modus === 'gesichter' && blatt.stufen.includes('ES')) melde('H', w, 'Gesichter bei Jugendlichen: es wird die Zahl 0–10 gezeigt')
        break
      case 'wahlkarte':
        if (b.optionen.length < 2 || b.optionen.length > 3) melde('F', w, 'Wahlkarte: 2–3 Optionen')
        b.optionen.forEach((o) => o.text.length > 40 && melde('H', w, `Option „${o.text}“ zu lang (max. 40 Zeichen)`))
        for (const o of b.optionen) if (o.bild) bilder.push(o.bild)
        break
      case 'stundenleiste':
        if (b.schritte.length < 2 || b.schritte.length > 7) melde('F', w, 'Stundenleiste: 2–7 Teile')
        b.schritte.forEach((x) => x.text.length > 16 && melde('H', w, `„${x.text}“ ist für die Stundenleiste zu lang (max. 16 Zeichen)`))
        for (const x of b.schritte) if (x.bild) bilder.push(x.bild)
        break
      case 'abhaken':
        if (!b.items.length || b.items.length > 10) melde('F', w, 'Abhaken: 1–10 Punkte')
        break
      case 'tabelle':
        if (b.spalten.length > 5) melde('H', w, 'mehr als 5 Spalten')
        if (b.beispiel && b.beispiel.length !== b.spalten.length) melde('F', w, 'Beispielzeile passt nicht zur Spaltenzahl')
        break
      case 'wennDann':
        if (b.zeilen + (b.beispiele?.length ?? 0) > 6) melde('H', w, 'mehr als 6 Wenn-dann-Zeilen')
        break
      case 'glaeser': {
        const n = b.items.length + (b.leer ?? 0)
        if (!n || n > 30) melde('F', w, '1–30 Gläser')
        if (b.spalten && ![3, 4, 5, 6].includes(b.spalten)) melde('F', w, 'Gläser: 3–6 Spalten')
        if (b.legende && b.legende.length !== 2) melde('F', w, 'Legende: genau 2 Einträge (Strich, ausmalen)')
        const max = (b.spalten ?? 5) >= 6 ? 14 : 20
        b.items.forEach((x) => x.length > max && melde('H', w, `„${x}“ ist unter dem Glas zu lang (max. ${max} Zeichen)`))
        break
      }
      case 'netz':
        if (b.bereiche.length < 5 || b.bereiche.length > 10) melde('F', w, 'Netz: 5–10 Bereiche')
        if (b.stufen && ![5, 10].includes(b.stufen)) melde('F', w, 'Netz: 5 oder 10 Stufen')
        b.bereiche.forEach((x) => x.length > 28 && melde('H', w, `Bereich „${x}“ zu lang (max. 28 Zeichen)`))
        break
      case 'kurve':
        if (b.x.length < 2 || b.x.length > 12) melde('F', w, 'Kurve: 2–12 Punkte auf der x-Achse')
        for (const x of [b.oben, b.unten, b.mitte ?? '']) if (x.length > 22) melde('H', w, `Achsenbeschriftung „${x}“ zu lang (max. 22 Zeichen)`)
        b.x.forEach((x) => x.length > Math.max(6, Math.floor(84 / b.x.length)) && melde('H', w, `„${x}“ ist für die x-Achse zu lang`))
        break
      case 'tageskreis':
        if (!b.titel.length || b.titel.length > 2) melde('F', w, 'Tageskreis: 1 oder 2 Kreise')
        if (b.legende.length < 2 || b.legende.length > 8) melde('F', w, 'Tageskreis: 2–8 Farben in der Legende')
        for (const l of b.legende) if (!FARBWOERTER.includes(l.farbe)) melde('F', w, `Farbe „${l.farbe}“ gibt es nicht`)
        break
      case 'farbkalender':
        if (b.wochen && (b.wochen < 4 || b.wochen > 6)) melde('F', w, 'Farbkalender: 4–6 Wochen')
        if (b.legende.length < 2 || b.legende.length > 8) melde('F', w, 'Farbkalender: 2–8 Farben in der Legende')
        for (const l of b.legende) if (!FARBWOERTER.includes(l.farbe)) melde('F', w, `Farbe „${l.farbe}“ gibt es nicht`)
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
      if (blatt.stufen.includes('C1') && b.art !== 'paeckchen') for (const f of fremdeFarbtokens(x)) melde('F', w, `„{${f}}“ ist kein Farbwort (Farbpunkt: {rot}, {blau}, {gelb}, {grün}, {orange}, {lila}, {braun}, {schwarz}, {weiß}, {rosa}, {grau}, {hellblau} – auch französisch)`)
      if (sprache === 'fr' && blatt.stufen.includes('C1') && MITTELPUNKT.test(x)) melde('F', w, `Kinderblatt (C1): inklusive Form mit Mittelpunkt („${x.slice(0, 50)}“) – für Kinder nicht vorlesbar, eine einfache Form wählen`)
    }
  })
  return aufgaben
}

/** Spielschule: die Seite „Aktivitäten & Ideen“ muss auf eine Seite passen und abwechslungsreich sein. */
const AKTIVITAET_ARTEN = ['kreis', 'bewegung', 'gestalten', 'sprache', 'musik', 'sinne', 'zaehlen', 'spiel', 'draussen', 'ruhe', 'kochen', 'theater']
function pruefeSpielschule(wo: string, sp: Spielideen | undefined) {
  if (!sp) return melde('F', wo, 'Spielschule: Seite „Aktivitäten & Ideen“ (lehrer.spielschule) fehlt')
  const texte: string[] = []
  if (!Array.isArray(sp.wortschatz) || sp.wortschatz.length < 6 || sp.wortschatz.length > 10) melde('F', wo, 'Spielschule: 6–10 Wörter der Woche')
  for (const w of sp.wortschatz ?? []) {
    if (w.length > 28) melde('H', wo, `Spielschule: Wort sehr lang („${w}“)`)
    texte.push(w)
  }
  const akt = sp.aktivitaeten ?? []
  if (akt.length < 5 || akt.length > 6) melde('F', wo, `Spielschule: 5–6 Aktivitäten (jetzt ${akt.length})`)
  if (new Set(akt.map((a) => a.art)).size < 4) melde('H', wo, 'Spielschule: weniger als 4 verschiedene Arten von Aktivitäten')
  for (const a of akt) {
    if (!AKTIVITAET_ARTEN.includes(a.art)) melde('F', wo, `Spielschule: Art „${a.art}“ gibt es nicht (${AKTIVITAET_ARTEN.join(', ')})`)
    if (!a.titel?.trim() || !a.text?.trim()) melde('F', wo, 'Spielschule: Aktivität ohne Titel oder Text')
    if ((a.titel ?? '').length > 42) melde('H', wo, `Spielschule: Titel der Aktivität lang („${a.titel}“)`)
    if ((a.text ?? '').length > 360) melde('F', wo, `Spielschule: Aktivität „${a.titel}“ zu lang (${a.text.length} Zeichen, höchstens 360)`)
    else if ((a.text ?? '').length < 80) melde('H', wo, `Spielschule: Aktivität „${a.titel}“ sehr knapp`)
    if ((a.material ?? '').length > 100) melde('H', wo, `Spielschule: Material zu „${a.titel}“ lang`)
    texte.push(a.titel ?? '', a.text ?? '', a.material ?? '', a.dauer ?? '')
  }
  if (!sp.reim) melde('H', wo, 'Spielschule: kein Reim oder Fingerspiel')
  else {
    if (!Array.isArray(sp.reim.zeilen) || sp.reim.zeilen.length < 4 || sp.reim.zeilen.length > 8) melde('F', wo, 'Spielschule: Reim mit 4–8 Zeilen')
    for (const z of sp.reim.zeilen ?? []) if (z.length > 52) melde('H', wo, `Spielschule: Reimzeile lang („${z}“)`)
    if ((sp.reim.gesten ?? '').length > 220) melde('H', wo, 'Spielschule: Bewegungen zum Reim über 220 Zeichen')
    texte.push(sp.reim.titel ?? '', ...(sp.reim.zeilen ?? []), sp.reim.gesten ?? '')
  }
  if (sp.ecken && (sp.ecken.length < 2 || sp.ecken.length > 4)) melde('F', wo, 'Spielschule: 2–4 Ideen für die Spielecken')
  for (const e of sp.ecken ?? []) {
    if (e.length > 140) melde('H', wo, `Spielschule: Idee für die Spielecke lang (${e.length} Zeichen)`)
    texte.push(e)
  }
  if (sp.eltern && sp.eltern.length > 240) melde('H', wo, 'Spielschule: Tipp für zu Hause über 240 Zeichen')
  texte.push(sp.eltern ?? '')
  for (const x of texte) {
    if (EMOJI.test(x)) melde('F', wo, 'Spielschule: Emoji auf „Aktivitäten & Ideen“')
    if (fremdeZeichen(x)) melde('F', wo, `Spielschule: Zeichen fehlt in der Schrift: ${fremdeZeichen(x)}`)
  }
}

// --- Spielschule: „Beobachten & Begleiten“ (alle Felder optional, bis die Einheiten überarbeitet sind) -----------

const DOMAENEN_IDS = DOMAENEN.map((d) => d.id as string)
/** Frei formulierte Sicherheitszeile, für die es einen Standardsatz gibt */
const STANDARD_THEMEN: [RegExp, string][] = [
  [/spie(ß|ss)|zahnstocher|\bpic(s)?\b|cure-dent/i, 'spiesse'],
  [/strohhalm|paille|pusten|souffl/i, 'pusten'],
  [/\bfoto|\bphoto|aufnahme|enregistr/i, 'fotos'],
  [/\bherd\b|\bofen\b|heiß|plaque|\bfour\b|\bchaud/i, 'hitze'],
  [/kleinteil|verschluck|petits objets|avaler/i, 'kleinteile'],
  [/allergi/i, 'allergien'],
  [/messer|couteau/i, 'messer'],
]
const BEGLEITEN_FELDER = ['beobachtung', 'entscheiden', 'stufen', 'zugang', 'mehrsprachig', 'freitag'] as const

function textCheck(wo: string, x: string, max: number, was: string) {
  if (!x?.trim()) return melde('F', wo, `${was} ist leer`)
  if (x.length > max) melde('H', wo, `${was} zu lang (${x.length} Zeichen, höchstens ${max})`)
  if (EMOJI.test(x)) melde('F', wo, `${was}: Emoji`)
  if (fremdeZeichen(x)) melde('F', wo, `${was}: Zeichen fehlt in der Schrift: ${fremdeZeichen(x)}`)
  for (const [re, name] of FLOSKELN) if (re.test(x)) melde('H', wo, `${was} – ${name}: „${x.slice(0, 60)}“`)
}

/** Felder der Seite „Beobachten & Begleiten“ in einer Sprachfassung. Gibt zurück, ob die Fassung schon welche hat. */
function pruefeBegleiten(wo: string, sp: Spielideen | undefined, blatt: Blatt, sprache: Sprache): boolean {
  if (!sp) return false
  const da = BEGLEITEN_FELDER.filter((k) => sp[k] !== undefined)
  if (!da.length && !blatt.woche) return false
  for (const k of BEGLEITEN_FELDER) if (sp[k] === undefined) melde('H', wo, `Beobachten & Begleiten: „${k}“ fehlt`)
  const b = sp.beobachtung
  if (b !== undefined) {
    if (!Array.isArray(b) || b.length !== 3) melde('F', wo, 'Beobachtung: genau 3 „Ich kann …“-Punkte')
    for (const x of Array.isArray(b) ? b : []) {
      textCheck(wo, x.text, 70, 'Beobachtungspunkt')
      if (!eldibGoalById.has(x.eldib)) melde('F', wo, `Beobachtung: ELDiB-Ziel „${x.eldib}“ gibt es nicht`)
      if (sprache === 'de' && !/^Ich\b/.test(x.text ?? '')) melde('H', wo, `Beobachtung: aus Sicht des Kindes mit „Ich …“ beginnen („${x.text}“)`)
      if (sprache === 'fr' && !/^(Je\b|J[’'])/.test(x.text ?? '')) melde('H', wo, `Beobachtung : commencer par « Je … » (« ${x.text} »)`)
      if (sprache === 'fr' && MITTELPUNKT.test(x.text ?? '')) melde('F', wo, `Beobachtung (steht auf dem Portfolio-Blatt des Kindes): keine Mittelpunkt-Form („${x.text}“)`)
    }
    if (Array.isArray(b) && new Set(b.map((x) => x.eldib)).size < b.length) melde('H', wo, 'Beobachtung: dasselbe ELDiB-Ziel zweimal')
  }
  if (sp.entscheiden !== undefined) {
    textCheck(wo, sp.entscheiden?.text, 170, 'Das entscheiden die Kinder')
    if (sp.entscheiden?.frage !== undefined) {
      textCheck(wo, sp.entscheiden.frage, 80, 'Fragenplakat')
      if (!sp.entscheiden.frage.trim().endsWith('?')) melde('H', wo, 'Fragenplakat: als Frage mit „?“ schreiben')
    }
  }
  if (sp.stufen !== undefined) for (const k of ['precoce', 'p1', 'p2'] as const) textCheck(wo, sp.stufen?.[k], 110, `Stufen: ${k}`)
  if (sp.zugang !== undefined) {
    if (!Array.isArray(sp.zugang) || sp.zugang.length < 2 || sp.zugang.length > 3) melde('F', wo, 'Zugang für alle: 2–3 Zeilen')
    for (const x of sp.zugang ?? []) textCheck(wo, x, 95, 'Zugang für alle')
  }
  if (sp.mehrsprachig !== undefined) textCheck(wo, sp.mehrsprachig, 130, 'Mehrsprachig')
  const f = sp.freitag
  if (f !== undefined) {
    if (![0, 1, 3].includes(f.vorlauf)) melde('F', wo, 'Freitags-Karte: vorlauf 0, 1 oder 3 (Wochen)')
    if (!['standard', 'besorgen', 'selten'].includes(f.material)) melde('F', wo, 'Freitags-Karte: material „standard“, „besorgen“ oder „selten“')
    for (const k of ['kueche', 'ausflug', 'besuch'] as const) if (f[k] !== undefined && typeof f[k] !== 'boolean') melde('F', wo, `Freitags-Karte: ${k} true oder false`)
    if (f.planB !== undefined) textCheck(wo, f.planB, 120, 'Plan B')
    else melde('H', wo, 'Freitags-Karte: Plan B fehlt')
    if (!f.sicherheit?.length) melde('H', wo, 'Freitags-Karte: keine Sicherheitszeile')
    if ((f.sicherheit ?? []).length > 3) melde('F', wo, 'Freitags-Karte: höchstens 3 Sicherheitszeilen')
    for (const x of f.sicherheit ?? []) {
      const m = /^standard:(.*)$/.exec(x)
      if (m) {
        if (!SICHERHEIT_STANDARD[m[1]]) melde('F', wo, `Sicherheit: Standardsatz „${m[1]}“ gibt es nicht (${Object.keys(SICHERHEIT_STANDARD).join(', ')})`)
        continue
      }
      textCheck(wo, x, 120, 'Sicherheit')
      const thema = STANDARD_THEMEN.find(([re]) => re.test(x))
      if (thema) melde('H', wo, `Sicherheit: dafür gibt es den Standardsatz „standard:${thema[1]}“ („${x.slice(0, 50)}“)`)
    }
  }
  return true
}

// --- Spielschule: Experiment der Woche ---------------------------------------------------------------

/** Einheiten ohne Experiment (zählt nicht als Fehler, nur in der Zusammenfassung) */
const ohneExperiment: string[] = []
/** Was im Material oder in den Schritten vorkommt → dieser Standardsatz gehört in die Sicherheit (Hinweis) */
const EXPERIMENT_STANDARD: [RegExp, string][] = [
  [/wanne|becken|bassine|\bbac\b|baignoire/i, 'wasser'],
  [/messer|couteau|halbier|coupe en deux/i, 'messer'],
  [/perle|samen|münze|murmel|knopf|knöpfe|magnet|bohne|linse|graine|pièce|bille|bouton|aimant|haricot|lentille/i, 'kleinteile'],
  [/strohhalm|paille|\bpust|souffl/i, 'pusten'],
  [/probier|schmeck|kosten\b|goût|dégust|\bmang(e|er|ez)\b/i, 'allergien'],
]

/** Text eines Experiments: leer, zu lang (die Seite liefe über), Emoji, fremde Zeichen → Fehler; Floskeln → Hinweis. */
function expText(wo: string, x: unknown, max: number, was: string) {
  if (typeof x !== 'string' || !x.trim()) return melde('F', wo, `Experiment: ${was} fehlt`)
  if (x.length > max) melde('F', wo, `Experiment: ${was} zu lang (${x.length} Zeichen, höchstens ${max} – sonst läuft die Seite über)`)
  if (EMOJI.test(x)) melde('F', wo, `Experiment: ${was} – Emoji`)
  if (fremdeZeichen(x)) melde('F', wo, `Experiment: ${was} – Zeichen fehlt in der Schrift: ${fremdeZeichen(x)}`)
  for (const [re, name] of FLOSKELN) if (re.test(x)) melde('H', wo, `Experiment: ${was} – ${name}: „${x.slice(0, 60)}“`)
}

/** Bildauswahl des Forscherblatts (Ich vermute / So war es): 2–3 Bilder, Wort ≤ 18 Zeichen. */
function pruefeWahl(wo: string, liste: unknown, was: string) {
  if (!Array.isArray(liste) || liste.length < GRENZEN.wahl.min || liste.length > GRENZEN.wahl.max) return melde('F', wo, `Forscherblatt: ${was} mit ${GRENZEN.wahl.min}–${GRENZEN.wahl.max} Bildern`)
  for (const x of liste as { bild?: string; text?: string }[]) {
    if (!x?.bild || !forscherBildGueltig(x.bild)) melde('F', wo, `Forscherblatt: Bild „${x?.bild}“ gibt es nicht`)
    if (x?.text !== undefined) expText(wo, x.text, GRENZEN.wahl.zeichen, `Forscherblatt – Wort unter dem Bild „${x.text}“`)
  }
}

function pruefeForscherblatt(wo: string, f: Forscherblatt) {
  if (f.frage !== undefined) expText(wo, f.frage, GRENZEN.blattFrage, 'Forscherblatt – Frage')
  if (f.bild !== undefined && !forscherBildGueltig(f.bild)) melde('F', wo, `Forscherblatt: Bild „${f.bild}“ gibt es nicht`)
  if (f.vermuten !== undefined) pruefeWahl(wo, f.vermuten, '„Ich vermute“')
  if (f.ergebnis !== undefined && f.ergebnis !== 'gesichter') pruefeWahl(wo, f.ergebnis, '„So war es“')
  if (f.sehen !== undefined && f.sehen !== 'frei' && f.sehen !== 'vorher-nachher') melde('F', wo, 'Forscherblatt: sehen „frei“ oder „vorher-nachher“')
  if (f.name !== undefined && typeof f.name !== 'boolean') melde('F', wo, 'Forscherblatt: name true oder false')
}

const PHAENOMEN_IDS = PHAENOMENE.map((x) => x.id as string)

function pruefeExperiment(wo: string, e: Experiment) {
  const g = GRENZEN
  expText(wo, e.titel, g.titel, 'Titel')
  expText(wo, e.frage, g.frage, 'Forscherfrage')
  if (typeof e.frage === 'string' && !e.frage.trim().endsWith('?')) melde('H', wo, 'Experiment: Forscherfrage als Frage mit „?“ schreiben')
  const liste = (x: unknown, was: string, gr: { min: number; max: number; zeichen: number }) => {
    if (!Array.isArray(x) || x.length < gr.min || x.length > gr.max) {
      melde('F', wo, `Experiment: ${was} – ${gr.min}–${gr.max} Einträge (jetzt ${Array.isArray(x) ? x.length : 0})`)
      return [] as (string | Bildtext)[]
    }
    for (const y of x as (string | Bildtext)[]) {
      expText(wo, textVon(y ?? ''), gr.zeichen, was)
      if (typeof y !== 'string' && !forscherBildGueltig(y?.bild ?? '')) melde('F', wo, `Experiment: ${was} – Bild „${y?.bild}“ gibt es nicht`)
    }
    return x as (string | Bildtext)[]
  }
  const material = liste(e.material, 'Material', g.material)
  const schritte = liste(e.schritte, 'Schritt', g.schritte)
  expText(wo, e.vermutung, g.vermutung, 'Vermuten')
  expText(wo, e.beobachten, g.beobachten, 'Beobachten')
  expText(wo, e.warumKind, g.warumKind, 'Warum (für Kinder)')
  expText(wo, e.hintergrund, g.hintergrund, 'Hintergrund')
  expText(wo, e.weiter, g.weiter, 'Weiterforschen')
  expText(wo, e.dauer, g.dauer, 'Dauer')
  if (!Array.isArray(e.phaenomene) || e.phaenomene.length < g.phaenomene.min || e.phaenomene.length > g.phaenomene.max) melde('F', wo, `Experiment: ${g.phaenomene.min}–${g.phaenomene.max} Phänomene (${PHAENOMEN_IDS.join(', ')})`)
  for (const id of e.phaenomene ?? []) if (!PHAENOMEN_IDS.includes(id)) melde('F', wo, `Experiment: Phänomen „${id}“ gibt es nicht (${PHAENOMEN_IDS.join(', ')})`)
  // Sicherheit: 1–3 Zeilen, Standardsätze wo möglich
  const sicher = Array.isArray(e.sicherheit) ? e.sicherheit : []
  if (sicher.length < g.sicherheit.min || sicher.length > g.sicherheit.max) melde('F', wo, `Experiment: Sicherheit – ${g.sicherheit.min}–${g.sicherheit.max} Zeilen (jetzt ${sicher.length})`)
  const standard = new Set<string>()
  for (const x of sicher) {
    const m = /^standard:(.*)$/.exec(x ?? '')
    if (m) {
      if (!SICHERHEIT_STANDARD[m[1]]) melde('F', wo, `Experiment: Standardsatz „${m[1]}“ gibt es nicht (${Object.keys(SICHERHEIT_STANDARD).join(', ')})`)
      standard.add(m[1])
      continue
    }
    expText(wo, x, g.sicherheit.zeichen, 'Sicherheit')
    const thema = STANDARD_THEMEN.find(([re]) => re.test(x ?? ''))
    if (thema) melde('H', wo, `Experiment: Sicherheit – dafür gibt es den Standardsatz „standard:${thema[1]}“ („${(x ?? '').slice(0, 50)}“)`)
    if (thema) standard.add(thema[1])
  }
  // Verbotene Stoffe (Glitzer, kleine Magnete, Kerze, Alkohol, Trockeneis, heißes Wasser für Kinder)
  const tun = [...material, ...schritte].map(textVon)
  for (const x of [...tun, e.weiter ?? '', e.vermutung ?? '', e.beobachten ?? '']) for (const v of verboteneStoffe(x)) melde('F', wo, `Experiment: nicht in der Spielschule – ${v} („${x.slice(0, 50)}“)`)
  if (tun.some(heissesWasser) && !standard.has('hitze')) melde('H', wo, 'Experiment: heißes Wasser (nur Erwachsene) – „standard:hitze“ in die Sicherheit')
  for (const [re, key] of EXPERIMENT_STANDARD) if (tun.some((x) => re.test(x)) && !standard.has(key)) melde('H', wo, `Experiment: „standard:${key}“ in die Sicherheit (${SICHERHEIT_STANDARD[key]?.de.slice(0, 50)} …)`)
  if (e.forscherblatt !== undefined) pruefeForscherblatt(wo, e.forscherblatt)
}

/** DE und FR: dieselben Phänomene und Standard-Sicherheitssätze. */
function pruefeExperimentGleich(wo: string, de: Experiment, fr: Experiment) {
  if ([...(de.phaenomene ?? [])].sort().join() !== [...(fr.phaenomene ?? [])].sort().join()) melde('H', wo, 'Experiment: Phänomene in DE und FR verschieden')
  const std = (e: Experiment) => (e.sicherheit ?? []).filter((x) => x.startsWith('standard:')).sort().join()
  if (std(de) !== std(fr)) melde('H', wo, 'Experiment: Standard-Sicherheitssätze in DE und FR verschieden')
}

function pruefeBrief(wo: string, b: Brieftext | undefined, sprache: string) {
  if (!b) return melde('F', wo, `Elternbrief: Fassung ${sprache.toUpperCase()} fehlt`)
  textCheck(wo, b.woche, 280, `Elternbrief ${sprache.toUpperCase()} „Das machen wir“`)
  textCheck(wo, b.idee, 200, `Elternbrief ${sprache.toUpperCase()} Idee`)
  textCheck(wo, b.bitte, 200, `Elternbrief ${sprache.toUpperCase()} Bitte`)
  const n = (b.woche ?? '').length + (b.idee ?? '').length + (b.bitte ?? '').length
  if (n > 620) melde('H', wo, `Elternbrief ${sprache.toUpperCase()}: zusammen ${n} Zeichen (höchstens 620, sonst passt die Seite nicht)`)
}

/** Blatt.woche: Domänen, Wörterstreifen, Satz der Woche, Elternbrief (einmal je Blatt). */
function pruefeWoche(wo: string, blatt: Blatt, begonnen: boolean) {
  const w = blatt.woche
  if (!w) {
    if (begonnen) melde('H', wo, 'Beobachten & Begleiten: „woche“ (Domänen, Sprachen, Elternbrief) fehlt')
    return
  }
  for (const k of ['domaenen', 'sprachen', 'elternbrief'] as const) if (w[k] === undefined) melde('H', wo, `woche: „${k}“ fehlt`)
  if (w.domaenen !== undefined) {
    if (!Array.isArray(w.domaenen) || !w.domaenen.length || w.domaenen.length > 3) melde('F', wo, 'Domänen: 1–3 Lernbereiche des Plan d’études')
    for (const d of w.domaenen ?? []) if (!DOMAENEN_IDS.includes(d)) melde('F', wo, `Domäne „${d}“ gibt es nicht (${DOMAENEN_IDS.join(', ')})`)
    if (new Set(w.domaenen ?? []).size < (w.domaenen ?? []).length) melde('H', wo, 'Domänen: doppelt')
  }
  const s = w.sprachen
  const lb: string[] = []
  if (s !== undefined) {
    const n = s.woerter?.length ?? 0
    if (n > 8 || n < 4) melde('F', wo, `Wörterstreifen: 6–8 Wörter (jetzt ${n})`)
    else if (n < 6) melde('H', wo, `Wörterstreifen: 6–8 Wörter (jetzt ${n})`)
    for (const x of s.woerter ?? []) {
      for (const k of ['de', 'fr', 'lb'] as const) if (!x[k]?.trim()) melde('F', wo, `Wörterstreifen: ${k.toUpperCase()} fehlt bei „${x.de ?? x.fr ?? '?'}“`)
      for (const v of [x.de, x.fr, x.lb, x.pt ?? '']) {
        if (v.length > 24) melde('H', wo, `Wörterstreifen: „${v}“ ist für die Spalte lang (höchstens 24 Zeichen)`)
        if (fremdeZeichen(v)) melde('F', wo, `Wörterstreifen: Zeichen fehlt in der Schrift: ${fremdeZeichen(v)}`)
      }
      if (x.de && !/^(der|die|das) /.test(x.de)) melde('H', wo, `Wörterstreifen: „${x.de}“ ohne Artikel`)
      if (x.fr && !/^(l[’']\S|(le|la|les|un|une|des) )/.test(x.fr)) melde('H', wo, `Wörterstreifen : « ${x.fr} » sans article`)
      if (x.lb && !/^(d[’']\S|(den|de|der|dem|e|en|eng|déi|di) )/i.test(x.lb)) melde('H', wo, `Wörterstreifen: LB „${x.lb}“ ohne Artikel (den/de/d’ …)`)
      if (x.bild) {
        const fb = bildOk(x.bild)
        if (fb) melde('F', wo, 'Wörterstreifen: ' + fb)
      }
      lb.push(x.lb)
    }
    if (s.satz !== undefined) {
      textCheck(wo, s.satz?.de, 70, 'Satz der Woche DE')
      textCheck(wo, s.satz?.fr, 70, 'Satz der Woche FR')
      for (const k of ['lb', 'pt'] as const) if (s.satz?.[k] !== undefined) textCheck(wo, s.satz[k]!, 70, `Satz der Woche ${k.toUpperCase()}`)
      if (s.satz?.lb) lb.push(s.satz.lb)
    }
    if (typeof s.geprueft !== 'boolean') melde('F', wo, 'Sprachen: „geprueft“ fehlt (false, bis eine Muttersprachlerin das Luxemburgisch geprüft hat)')
    if (s.geprueft === true) lb.length = 0
  }
  const e = w.elternbrief
  if (e !== undefined) {
    pruefeBrief(wo, e.de, 'de')
    pruefeBrief(wo, e.fr, 'fr')
    if (e.pt) pruefeBrief(wo, e.pt, 'pt')
    if (e.lb) {
      pruefeBrief(wo, e.lb, 'lb')
      if (typeof e.lb.geprueft !== 'boolean') melde('F', wo, 'Elternbrief LB: „geprueft“ fehlt (false bis zur Prüfung)')
      if (e.lb.geprueft !== true) lb.push('(Elternbrief LB)')
    }
  }
  if (lb.length) {
    lbOffen += lb.length
    lbEinheiten++
    info(wo, `Luxemburgisch ungeprüft: ${lb.join(' · ')}`)
  }
}

/** DE und FR: dieselben Angaben ohne Text (Freitags-Karte, ELDiB der Beobachtungspunkte). */
function pruefeGleich(wo: string, blatt: Blatt) {
  const de = blatt.de.lehrer?.spielschule
  const fr = blatt.fr?.lehrer?.spielschule
  if (!de || !fr) return
  const k = (x?: { vorlauf?: unknown; kueche?: unknown; ausflug?: unknown; besuch?: unknown; material?: unknown }) => JSON.stringify([x?.vorlauf, !!x?.kueche, !!x?.ausflug, !!x?.besuch, x?.material])
  if (de.freitag && fr.freitag && k(de.freitag) !== k(fr.freitag)) melde('H', wo, 'Freitags-Karte: Vorlauf, Küche, Ausflug, Besuch oder Material in DE und FR verschieden')
  if (de.beobachtung && fr.beobachtung && de.beobachtung.map((x) => x.eldib).join() !== fr.beobachtung.map((x) => x.eldib).join()) melde('H', wo, 'Beobachtung: ELDiB-Ziele in DE und FR verschieden')
  if ((de.freitag?.sicherheit ?? []).filter((x) => x.startsWith('standard:')).join() !== (fr.freitag?.sicherheit ?? []).filter((x) => x.startsWith('standard:')).join()) melde('H', wo, 'Sicherheit: Standardsätze in DE und FR verschieden')
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
  if (sprache === 'fr' && blatt.stufen.includes('C1'))
    for (const x of [inh.titel, inh.untertitel ?? '']) if (MITTELPUNKT.test(x)) melde('F', wo, `Kinderblatt (C1): inklusive Form mit Mittelpunkt im Titel („${x.slice(0, 50)}“)`)
  // Spiel-Bausteine sind groß: je Seite (bis zum Seitenumbruch) grob nachrechnen, ob sie mit den Aufgaben passen
  {
    // Platz: Seite 1 hat Kopf, Titel und Anleitung (ca. 600 pt frei), Folgeseiten den kleinen Kopf mit Name (ca. 705 pt)
    let hoehe = 0
    let groesster = 0
    let platz = 600
    const seiteFertig = (i: number) => {
      if (groesster && hoehe > platz + 15) melde('F', wo, `Seite bis Baustein ${i}: Spiel-Baustein und Aufgaben brauchen ca. ${Math.round(hoehe)} pt (Platz: ca. ${platz}) – auf zwei Seiten verteilen`)
      else if (groesster && hoehe > platz - 10) melde('H', wo, `Seite bis Baustein ${i}: sehr voll (ca. ${Math.round(hoehe)} pt von ${platz})`)
      hoehe = 0
      groesster = 0
      platz = 705
    }
    inh.bausteine.forEach((x, i) => {
      if (x.art === 'seitenumbruch') return seiteFertig(i + 1)
      const h = spielHoehe(x, BREITE)
      if (h !== null) {
        groesster = Math.max(groesster, h)
        hoehe += h
      } else hoehe += x.art === 'aufgabe' ? 44 : 0
      if (h === null && x.art !== 'aufgabe' && groesster) hoehe += 150 // anderer Baustein auf derselben Seite: grob
    })
    seiteFertig(inh.bausteine.length)
  }
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
  if (!(L.quellen ?? []).length && blatt.bereich !== 'mathe') melde('H', wo, 'Lehrerseite ohne Quelle')
  const alle = [L.ziel, ...(L.ablauf ?? []), L.hintergrund, ...(L.impulse ?? []), ...(L.tipps ?? []), L.achtung ?? '', L.material ?? '', L.differenzierung?.leichter ?? '', L.differenzierung?.schwerer ?? '', ...(L.loesungen ?? [])]
  if (blatt.bereich === 'mathe' && !(L.loesungen ?? []).length) melde('F', wo, 'Mathe-Blatt: Lösungen für die Lehrperson fehlen')
  if (blatt.bereich === 'spielschule') {
    pruefeSpielschule(wo, L.spielschule)
    if (sprache === 'fr')
      for (const b of inh.bausteine)
        for (const x of texteVon(b)) if (MITTELPUNKT.test(x)) melde('F', wo, `Kinderseite: keine Mittelpunkt-Form im Französischen („${x.slice(0, 60)}“)`)
  }
  else if (L.spielschule) melde('F', wo, '„spielschule“ (Aktivitäten & Ideen) gibt es nur im Bereich Spielschule')
  for (const x of inh.bausteine) if (x.art === 'feld' && (x.hoehe ?? 4) > 20) melde('F', wo, `Feld: hoehe zählt in Zeilen (höchstens 20, jetzt ${x.hoehe})`)
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
    if (b.bereich === 'spielschule') {
      if (!b.fr) melde('F', wo, 'Spielschule: französische Fassung (fr) fehlt')
      if (b.stufen?.length !== 1 || b.stufen[0] !== 'C1') melde('F', wo, 'Spielschule: stufen ["C1"]')
      if (b.layout && b.layout !== 'bild') melde('F', wo, 'Spielschule: layout „bild“ (oder weglassen)')
    }
    if (!Array.isArray(b.sozialform) || !b.sozialform.length || b.sozialform.some((s) => !['einzeln', 'gruppe', 'klasse'].includes(s))) melde('F', wo, 'sozialform ungültig')
    if (!b.dauer) melde('F', wo, 'dauer fehlt')
    /* Mathe übt Rechnen und Messen – dafür gibt es keine ELDiB-Ziele */
    if (b.bereich === 'mathe' ? !Array.isArray(b.eldib) || b.eldib.length > 4 : !Array.isArray(b.eldib) || !b.eldib.length || b.eldib.length > 4) melde('F', wo, '1–4 ELDiB-Ziele angeben')
    for (const e of b.eldib ?? []) if (!eldibGoalById.has(e)) melde('F', wo, `ELDiB-Ziel „${e}“ gibt es nicht`)
    if (!Array.isArray(b.schlagworte) || b.schlagworte.length < 3) melde('H', wo, 'mindestens 3 Schlagworte')
    if (b.bild) {
      const f = bildOk(b.bild)
      if (f) melde('F', wo, 'Leitbild: ' + f)
    }
    pruefeInhalt(wo + ' DE', b.de, b, 'de')
    if (b.fr) pruefeInhalt(wo + ' FR', b.fr, b, 'fr')
    if (b.bereich === 'spielschule') {
      const begonnen = [pruefeBegleiten(wo + ' DE', b.de?.lehrer?.spielschule, b, 'de'), pruefeBegleiten(wo + ' FR', b.fr?.lehrer?.spielschule, b, 'fr')].some(Boolean)
      pruefeWoche(wo, b, begonnen)
      if (!begonnen && !b.woche) ohneBegleiten.push(b.id)
      else pruefeGleich(wo, b)
      // Experiment der Woche (je Sprachfassung)
      const expDe = b.de?.lehrer?.spielschule?.experiment
      const expFr = b.fr?.lehrer?.spielschule?.experiment
      if (expDe) pruefeExperiment(wo + ' DE', expDe)
      if (expFr) pruefeExperiment(wo + ' FR', expFr)
      if (!expDe && !expFr) {
        ohneExperiment.push(b.id)
        if (dateien.length) info(wo, 'noch ohne „Experiment der Woche“')
      } else if (!expDe || !expFr) melde('F', wo, `Experiment der Woche: Fassung ${expDe ? 'FR' : 'DE'} fehlt`)
      else pruefeExperimentGleich(wo, expDe, expFr)
    } else if (b.woche) melde('F', wo, '„woche“ gibt es nur im Bereich Spielschule')
  })
  console.log(`${name}: ${blaetter.length} Blätter geprüft`)
}
if (ohneBegleiten.length) console.log(`\n○ Spielschule: ${ohneBegleiten.length} Einheiten noch ohne „Beobachten & Begleiten“ (zählt nicht als Fehler)`)
if (ohneExperiment.length) console.log(`○ Spielschule: ${ohneExperiment.length} Einheiten noch ohne „Experiment der Woche“ (zählt nicht als Fehler)`)
if (lbOffen) console.log(`○ Luxemburgisch noch nicht gegengelesen: ${lbOffen} Einträge in ${lbEinheiten} Einheiten – Prüfliste: npx tsx --tsconfig tsconfig.scripts.json scripts/lb-liste.ts`)
console.log(`\n${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
