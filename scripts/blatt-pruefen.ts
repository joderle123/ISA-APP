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
import { flaecheGroesse, geoPunkte, kommaSprung, MM, stuecke, temperaturSkala, wert } from '../src/blatt/pdf/mathe'
import { SEITE } from '../src/blatt/pdf/stil'

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
  'karten', 'rueckblick', 'notfall', 'gefuehlsrad', 'glaeser', 'netz', 'kurve', 'tageskreis', 'farbkalender', 'rechnungen', 'kaestchen', 'bon',
  'paeckchen', 'stellentafel', 'hunderterfeld', 'zahlenstrahl', 'bruchbilder', 'treppe', 'kommasprung', 'geo',
  'flaeche', 'temperatur',
  'diagramm', 'strichliste',
])

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

/** verfügbare Breite in pt (wie in BlattDokument/Spalten) */
const BREITE = 595.28 - SEITE.rand * 2

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
        {
          const [l, r] = b.verhaeltnis === '2:1' ? [2, 1] : b.verhaeltnis === '1:2' ? [1, 2] : [1, 1]
          const bl = ((breite - 16) * l) / (l + r)
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
  if (!(L.quellen ?? []).length && blatt.bereich !== 'mathe') melde('H', wo, 'Lehrerseite ohne Quelle')
  const alle = [L.ziel, ...(L.ablauf ?? []), L.hintergrund, ...(L.impulse ?? []), ...(L.tipps ?? []), L.achtung ?? '', L.material ?? '', L.differenzierung?.leichter ?? '', L.differenzierung?.schwerer ?? '', ...(L.loesungen ?? [])]
  if (blatt.bereich === 'mathe' && !(L.loesungen ?? []).length) melde('F', wo, 'Mathe-Blatt: Lösungen für die Lehrperson fehlen')
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
  })
  console.log(`${name}: ${blaetter.length} Blätter geprüft`)
}
console.log(`\n${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
