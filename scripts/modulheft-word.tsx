// Modulheft als Word-Datei (zum Bearbeiten durch die Lehrperson): Heft und Lösungsheft.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/modulheft-word.tsx <ausgabeordner> --nur=mathe-m3
// Rückmeldung 26.11.2026: „wirkt wie aus einem PDF kopiert, schlecht bearbeitbar“. Deshalb jetzt echtes Word:
// - Formatvorlagen (Überschrift 1 = Lektion, Überschrift 2 = Teil, Überschrift 3 = Aufgabe, Standard 12 pt) – im
//   Navigationsbereich sichtbar, mit einem Klick änderbar; Aufgaben mit Word-Nummerierung (neue Aufgabe → zählt weiter)
// - Merksatz- und Regelkästen als schattierte Absätze, keine Layout-Tabellen; nebeneinanderstehende Teile untereinander
// - Stellentafel, Umwandlungstabelle, Rechenkästchen, Päckchen und Tabellen als echte Word-Tabellen (Zellen zum Eintragen)
// - nur echte Zeichnungen (Zahlenstrahl, Thermometer, Diagramm, Strichliste, Fläche, Treppe, Kommasprung) bleiben Bilder
import { zerlegePaeckchen, eintragen, ABAKUS } from '../src/blatt/umwandlung.js'
import { renderToBuffer, Document as PdfDocument, Page } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
// „docx“ (npm) ist kein Paket der App – nur dieses Skript braucht es (npm install docx, oder global vorhanden)
const {
  AlignmentType, BorderStyle, Document, Footer, HeadingLevel, ImageRun, LevelFormat, Packer, PageBreak, Paragraph, ShadingType, VerticalAlign,
  Table, TableCell, TableRow, TextRun, WidthType, Math: WordMath, MathFraction, MathRun,
} = createRequire(import.meta.url)('docx')
type Paragraph = InstanceType<typeof Paragraph>
type Table = InstanceType<typeof Table>
type TableCell = InstanceType<typeof TableCell>
type IBorderOptions = { style: unknown; size: number; color: string }
import { Bausteine, type Ctx } from '../src/blatt/pdf/bausteine'
import { MASSE, SEITE, registriereSchriften } from '../src/blatt/pdf/stil'
import { palette } from '../src/blatt/zeichnung'
import { bereichById } from '../src/blatt/katalog'
import { MODULE, type Modul } from '../src/blatt/module'
import { modulLektionen } from '../src/blatt/pdf/Modulheft'
import { URHEBER } from '../src/lib/urheber'
import type { Baustein, Blatt } from '../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/modulheft-word')
const nur = args.find((a) => a.startsWith('--nur='))?.slice(6)
mkdirSync(ziel, { recursive: true })

const blaetter = new Map<string, Blatt>()
for (const d of readdirSync(join(ROOT, 'src/data/blaetter'))) if (d.endsWith('.json')) for (const b of JSON.parse(readFileSync(join(ROOT, 'src/data/blaetter', d), 'utf8')) as Blatt[]) blaetter.set(b.id, b)

// ---- Seite: A4, Ränder 1,8 cm (DXA: 1 cm = 567)
const RAND = 1020, BREITE = 11906 - 2 * RAND           // Inhaltsbreite in DXA
const PX = (dxa: number) => Math.round((dxa / 1440) * 96)
const SCHRIFT = 'Arial'
const PDF_BREITE = 595.28 - SEITE.rand * 2              // Inhaltsbreite im PDF (pt)

// ---- Grafiken: jede auf eine eigene PDF-Seite in ihrer Spaltenbreite, dann als PNG zugeschnitten
// (dazu die Bilder der neuen Mathe-Hefte: Geometrie in Originalgröße, Bruchbilder, Hunderterfelder, Waage, Kassenbon, schriftliche Rechnungen)
const GRAFIK = new Set(['zahlenstrahl', 'kommasprung', 'flaeche', 'treppe', 'temperatur', 'diagramm', 'strichliste', 'geo', 'bruchbilder', 'hunderterfeld', 'waage', 'bon', 'rechnungen'])
const istGrafik = (b: Baustein) => GRAFIK.has(b.art)
type Grafik = { b: Baustein; breitePt: number; png?: Buffer; w?: number; h?: number }
const grafiken: Grafik[] = []
const grafikVon = new Map<Baustein, Grafik>()
function sammle(liste: Baustein[], breitePt: number) {
  for (const b of liste) {
    if (b.art === 'spalten') {
      const [l, r] = b.verhaeltnis === '2:1' ? [2, 1] : b.verhaeltnis === '1:2' ? [1, 2] : [1, 1]
      const bl = ((breitePt - 16) * l) / (l + r)
      sammle(b.links, bl)
      sammle(b.rechts, breitePt - 16 - bl)
    } else if (istGrafik(b) && !grafikVon.has(b)) {
      const g = { b, breitePt }
      grafiken.push(g)
      grafikVon.set(b, g)
    }
  }
}

async function grafikenRendern(farben: Parameters<typeof palette>[0]) {
  if (!grafiken.length) return
  const p = palette(farben)
  const seiten = grafiken.map((g, i) => {
    const c = { m: MASSE.jugend, p, sprache: 'de', nummern: new Map(), breite: g.breitePt } as unknown as Ctx
    return (
      <Page key={i} size={[g.breitePt + 24, 700]} style={{ padding: 12 }}>
        <Bausteine c={c} liste={[g.b]} />
      </Page>
    )
  })
  const pdf = await renderToBuffer(<PdfDocument>{seiten}</PdfDocument>)
  const ord = join(tmpdir(), 'modulheft-word-' + process.pid)
  mkdirSync(ord, { recursive: true })
  writeFileSync(join(ord, 'g.pdf'), pdf)
  // jede Seite mit 200 dpi rendern und auf den Inhalt zuschneiden
  execFileSync('python3', ['-c', `
import pymupdf, sys
d = pymupdf.open(sys.argv[1] + '/g.pdf')
for i, s in enumerate(d):
    r = pymupdf.Rect()
    for art, box in s.get_bboxlog():
        b = pymupdf.Rect(box)
        if b.is_valid and not b.is_empty and b.width < s.rect.width * 0.99: r |= b
    if r.is_empty: r = pymupdf.Rect(0, 0, 50, 20)
    r = (r + (-4, -4, 4, 4)) & s.rect
    s.get_pixmap(dpi=200, clip=r).save(sys.argv[1] + '/g%03d.png' % i)
`, ord])
  grafiken.forEach((g, i) => {
    g.png = readFileSync(join(ord, `g${String(i).padStart(3, '0')}.png`))
    g.w = g.png.readUInt32BE(16); g.h = g.png.readUInt32BE(20)   // Breite und Höhe aus dem PNG-Kopf
  })
  rmSync(ord, { recursive: true, force: true })
}

// ---- Text-Helfer
const ohneRaum = { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } }
const duenn: IBorderOptions = { style: BorderStyle.SINGLE, size: 4, color: 'B8BCC8' }
const rahmen = { top: duenn, bottom: duenn, left: duenn, right: duenn }
const luecke = (s: string) => s.replace(/_{3,}/g, '__________').replace(/\[\]/g, '☐').replace(/\t/g, '   ').replace(/\{([^{}]*)\}/g, '$1')   // {…} = vorgemachtes Beispiel im PDF
const run = (text: string, o: { bold?: boolean; size?: number; color?: string; italics?: boolean } = {}) => new TextRun({ text, size: o.size, bold: o.bold, italics: o.italics, color: o.color })
// #z/n# = Bruch übereinander (wie im PDF): in Word als Formel-Bruch
const mitBruch = (text: string, o: { bold?: boolean; size?: number; color?: string; italics?: boolean } = {}) => {
  const teile: unknown[] = []; let last = 0
  for (const m of text.matchAll(/#([^#/]*)\/([^#]*)#/g)) {
    if ((m.index ?? 0) > last) teile.push(run(luecke(text.slice(last, m.index)), o))
    teile.push(new WordMath({ children: [new MathFraction({ numerator: [new MathRun(m[1])], denominator: [new MathRun(m[2])] })] }))
    last = (m.index ?? 0) + m[0].length
  }
  if (last < text.length) teile.push(run(luecke(text.slice(last)), o))
  return teile.length ? teile : [run('', o)]
}
const absatz = (text: string, o: { bold?: boolean; size?: number; color?: string; italics?: boolean; nach?: number; vor?: number; keepNext?: boolean } = {}) =>
  new Paragraph({ children: mitBruch(text, o), spacing: { before: o.vor ?? 0, after: o.nach ?? 80 }, keepNext: o.keepNext })
const linie = () => new Paragraph({ children: [run(' ')], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '9AA0AC', space: 1 } }, spacing: { after: 160 } })
const BUCHST = 'abcdefghijklmnopqrstuvwxyz'
const h2 = (text: string) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run(text)] })
const zelle = (kinder: (Paragraph | Table)[], breite: number, o: { schatten?: string; rand?: boolean } = {}) =>
  new TableCell({ children: kinder.length ? kinder : [new Paragraph('')], width: { size: breite, type: WidthType.DXA }, borders: o.rand ? rahmen : ohneRaum, shading: o.schatten ? { type: ShadingType.CLEAR, color: 'auto', fill: o.schatten } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 } })
const tabelle = (zeilen: TableCell[][], breiten: number[]) => new Table({ width: { size: breiten.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: breiten, rows: zeilen.map((z) => new TableRow({ children: z })) })

let FARBE = '2E9E5B', ZART = 'EEF7F2'
let aufgabeNr = 0, lektionNr = 0

// Kasten (Merksatz, Regel, Tipp): schattierte Absätze mit farbigem Strich links – keine Tabelle, frei bearbeitbar
const kasten = (p: { children: unknown[]; numbering?: unknown; spacing?: unknown; keepNext?: boolean }) => new Paragraph({
  ...p, shading: { type: ShadingType.CLEAR, color: 'auto', fill: ZART },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: FARBE, space: 6 } }, indent: p.numbering ? { left: 560, hanging: 280, right: 120 } : { left: 160, right: 120 },
})
const rand = (style: unknown, size: number, color: string): IBorderOptions => ({ style, size, color })
const KEIN = rand(BorderStyle.NONE, 0, 'FFFFFF')
// Tabellenzelle mit eigenen Rändern (für Stellentafel und Umwandlungstabelle)
const tz = (kinder: unknown[], breite: number, o: { fill?: string; links?: IBorderOptions; rechts?: IBorderOptions; oben?: IBorderOptions; unten?: IBorderOptions; span?: number } = {}) => new TableCell({
  children: kinder.length ? kinder : [new Paragraph('')], width: { size: breite, type: WidthType.DXA }, columnSpan: o.span, verticalAlign: VerticalAlign.CENTER,
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined, margins: { top: 40, bottom: 40, left: 40, right: 40 },
  borders: { left: o.links ?? duenn, right: o.rechts ?? duenn, top: o.oben ?? duenn, bottom: o.unten ?? duenn },
})
const mitte = (children: unknown[]) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children })
const DICK = rand(BorderStyle.SINGLE, 12, '1F2A44'), STRICH = rand(BorderStyle.DASHED, 4, '9AA3B5')
const GELB = 'FBF7DC', GRAU = 'E3E7EE', ROT = 'D62828'

// Umwandlungstabelle (abaque) als Word-Tabelle: Einheiten oben (über ihre Unterspalten), gestrichelte Unterspalten,
// Beispielzeilen mit Ziffern, ergänzten Nullen (grau) und rotem Komma; Aufgabenzeilen leer zum Eintragen.
function umwandlungsTabelle(art: string, zeilen: { text: string; marke?: string }[], breite: number): (Paragraph | Table)[] {
  const d = (ABAKUS as Record<string, { einheiten: string[]; spalten: number; titel: string; neben?: Record<string, string> }>)[art]
  const sp = d.spalten, n = d.einheiten.length * sp
  const labelB = Math.round(breite * 0.32), zb = Math.floor((breite - labelB) / n), rest = breite - labelB - zb * n
  const breiten = [labelB + rest, ...Array(n).fill(zb)]
  const kopf = [tz([new Paragraph({ spacing: { after: 0 }, children: [run('Aufgabe', { size: 18, color: '5A6170' })] })], breiten[0], { links: KEIN, oben: KEIN, rechts: DICK }),
    ...d.einheiten.map((u) => tz([mitte([run(u, { bold: true }), ...(d.neben?.[u] ? [run(' = ' + d.neben[u], { size: 16, color: '5A6170' })] : [])])], zb * sp, { fill: GRAU, span: sp, links: DICK, rechts: DICK }))]
  const reihen = zeilen.map((z) => {
    const beispiel = /\{[^}]*\}/.test(z.text), e = eintragen(z.text.replace(/\{[^}]*\}/, '___'), art)
    // Aufgabe in einer Zeile: die Lücke ist ein kurzer unterstrichener Platz (zum Hineinschreiben oder Tippen)
    const teile = z.text.replace(/\s*\?\s*$/, '').replace(/\{([^}]*)\}/, '⟨$1⟩').split(/_{3,}/)
    const label = teile.flatMap((t, i) => [...(i ? [new TextRun({ text: '\u00a0'.repeat(9), underline: {}, size: 22 })] : []), ...t.split(/⟨|⟩/).map((x, j) => run(x, j % 2 ? { size: 22, bold: true, color: FARBE } : { size: 22 }))])
    const zellen = [tz([new Paragraph({ spacing: { after: 0 }, children: [...(z.marke ? [run(z.marke + ')  ', { color: '5A6170', size: 22 })] : []), ...label] })], breiten[0], { rechts: DICK })]
    for (let i = 0; i < n; i++) {
      const ch = beispiel && e ? e.ziffern[i] : undefined, null0 = !!(e && e.nullen.includes(i))
      const komma = beispiel && e && e.kommaNach === i && i < n - 1 && Object.keys(e.ziffern).some((x) => +x > i)
      zellen.push(tz(ch !== undefined ? [mitte([run(ch, { bold: !null0, color: null0 ? '8A93A3' : FARBE, size: 26 }), ...(komma ? [run(',', { bold: true, color: ROT, size: 32 })] : [])])] : [mitte([run(' ')])], zb,
        { fill: GELB, links: i % sp === 0 ? DICK : STRICH, rechts: (i + 1) % sp === 0 ? DICK : STRICH }))
    }
    return zellen
  })
  return [
    new Paragraph({ spacing: { after: 40 }, children: [run('Umwandlungstabelle (' + d.titel + '): ', { bold: true, size: 18, color: FARBE }), run('Letzte Ziffer vor dem Komma in die ' + (sp > 1 ? 'letzte Spalte' : 'Spalte') + ' ihrer Einheit · mit Nullen auffüllen · Komma hinter die neue Einheit · ablesen.', { size: 18, color: '5A6170' })] }),
    new Table({ width: { size: breite, type: WidthType.DXA }, columnWidths: breiten, rows: [kopf, ...reihen].map((z, i) => new TableRow({ children: z, tableHeader: false })) }),
    absatz('', { nach: 60 }),
  ]
}

// Stellentafel als Word-Tabelle (Gruppen oben, Kürzel, ausgeschriebene Namen, dicker Strich = Komma)
function stellenTafel(b: Extract<Baustein, { art: 'stellentafel' }>, breite: number): (Paragraph | Table)[] {
  const n = b.stellen.length, k = b.komma, hatLabel = b.zeilen.some((z) => z.label)
  const labelB = hatLabel ? Math.round(breite * 0.26) : 0, zb = Math.min(900, Math.floor((breite - labelB) / n))
  const breiten = [...(hatLabel ? [labelB] : []), ...Array(n).fill(zb)]
  const grenze = new Set<number>(); if (b.gruppen?.length) { let a = 0; for (const g of b.gruppen) { if (a > 0) grenze.add(a); a += g.spalten } }
  const li = (i: number) => (i === k || (k < 0 && grenze.has(i)) ? DICK : duenn)
  const reihen: TableCell[][] = []
  const lab = (inhalt: unknown[]) => (hatLabel ? [tz(inhalt, labelB, { rechts: DICK })] : [])
  if (b.gruppen?.length) { let a = 0; reihen.push([...lab([new Paragraph('')]), ...b.gruppen.map((g) => { const z = tz([mitte([run(g.titel, { bold: true, size: 18 })])], zb * g.spalten, { span: g.spalten, fill: GRAU, links: li(a) }); a += g.spalten; return z })]) }
  reihen.push([...lab([new Paragraph('')]), ...b.stellen.map((st, i) => tz([mitte([run(st, { bold: true, color: FARBE })])], zb, { fill: ZART, links: li(i) }))])
  if (b.namen?.length === n) reihen.push([...lab([new Paragraph('')]), ...b.namen.map((nm, i) => tz([mitte([run(nm.replace(/-\n/g, ''), { size: 14, color: '5A6170' })])], zb, { links: li(i) }))])
  for (const z of b.zeilen) {
    const [g, nk] = z.zahl ? (z.zahl.includes(',') ? z.zahl.split(',') : [z.zahl, '']) : ['', '']
    reihen.push([...lab([new Paragraph({ spacing: { after: 0 }, children: mitBruch(z.label ?? '') })]), ...b.stellen.map((_, i) => {
      let ch: string | undefined
      if (z.zahl && z.bis !== undefined) { const zf = z.zahl.replace(/[^0-9]/g, ''), j = zf.length - 1 - (z.bis - i); if (j >= 0 && i <= z.bis) ch = zf[j] }
      else if (z.zahl && k >= 0) ch = i >= k ? nk[i - k] : g[g.length - (k - i)]
      return tz([mitte([run(ch ?? ' ', { bold: true, color: FARBE, size: 26 })])], zb, { links: li(i) })
    })])
  }
  const out: (Paragraph | Table)[] = []
  if (b.titel) out.push(kasten({ children: [run(b.titel, { bold: true, color: FARBE })] }))
  for (const pk of b.punkte ?? []) out.push(kasten({ numbering: { reference: 'punkte', level: 0 }, children: mitBruch(pk) }))
  out.push(new Table({ width: { size: breiten.reduce((a, c) => a + c, 0), type: WidthType.DXA }, columnWidths: breiten, rows: reihen.map((z) => new TableRow({ children: z })) }), absatz('', { nach: 60 }))
  return out
}

function wandle(liste: Baustein[], breite: number): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = []
  for (const b of liste) out.push(...einBaustein(b, breite))
  return out
}

function einBaustein(b: Baustein, breite: number): (Paragraph | Table)[] {
  const g = grafikVon.get(b)
  if (g?.png) {
    const maxPx = PX(breite) - 8
    const natPx = (g.w! / 200) * 96   // bei 200 dpi gerendert
    let w = Math.min(maxPx, natPx), h = (g.h! / g.w!) * w
    const maxH = 340   // ≈ 9 cm
    if (h > maxH) { w = w * (maxH / h); h = maxH }
    return [new Paragraph({ children: [new ImageRun({ type: 'png', data: g.png, transformation: { width: Math.round(w), height: Math.round(h) } })], spacing: { after: 100 } })]
  }
  switch (b.art) {
    case 'aufgabe': {
      aufgabeNr++
      const punkte = '●'.repeat(b.stufe ?? 1) + '○'.repeat(3 - (b.stufe ?? 1))
      const p = [new Paragraph({ heading: HeadingLevel.HEADING_3, numbering: { reference: 'aufgaben', level: 0, instance: lektionNr }, children: [run(punkte + '  ', { color: FARBE, size: 18 }), ...mitBruch(b.text)] })]
      if (b.hinweis) p.push(absatz(b.hinweis, { italics: true, size: 20, color: '5A6170' }))
      return p
    }
    case 'text':
      return [absatz(b.text, { size: b.klein ? 18 : undefined, color: b.klein ? '5A6170' : undefined })]
    case 'info': {
      const inhalt: Paragraph[] = []
      if (b.titel) inhalt.push(kasten({ spacing: { before: 120, after: 40 }, children: [run(b.titel, { bold: true, color: FARBE })] }))
      if (b.text) inhalt.push(kasten({ spacing: { after: 40 }, children: mitBruch(b.text) }))
      for (const pkt of b.punkte ?? []) inhalt.push(kasten({ numbering: { reference: 'punkte', level: 0 }, spacing: { after: 30 }, children: mitBruch(pkt) }))
      return [...inhalt, absatz('', { nach: 60 })]
    }
    case 'schritte':
      return b.items.flatMap((s, i) => [
        new Paragraph({ spacing: { before: 60, after: 20 }, children: [run(`${i + 1}  `, { bold: true, color: FARBE }), run(s.titel, { bold: true })] }),
        ...(s.text ? [absatz(s.text, { size: 20, color: '3A404C' })] : []),
      ])
    case 'paeckchen': {
      // Umwandlungen kommen in die Umwandlungstabelle (wie im PDF), der Rest bleibt ein Päckchen
      const zp = zerlegePaeckchen(b.items)
      if (zp.gruppen.length) {
        const out: (Paragraph | Table)[] = []
        if (zp.rest.length) out.push(...einBaustein({ ...b, buchstaben: false, items: zp.rest.map((r) => (b.buchstaben ? BUCHST[r.nr] + ')  ' : '') + r.text) }, breite))
        for (const g of zp.gruppen) out.push(...umwandlungsTabelle(g.art, g.zeilen.map((x) => ({ text: x.text, marke: b.buchstaben ? BUCHST[x.nr] : undefined })), breite))
        return out
      }
      const n = b.spalten ?? 2
      const breiten = Array(n).fill(Math.floor(breite / n))
      breiten[n - 1] = breite - breiten.slice(0, -1).reduce((a, c) => a + c, 0)
      const zeilen: TableCell[][] = []
      b.items.forEach((it, i) => {
        if (i % n === 0) zeilen.push([])
        zeilen[zeilen.length - 1].push(zelle([absatz((b.buchstaben ? BUCHST[i] + ')  ' : '') + it, { nach: 40 })], breiten[i % n]))
      })
      const letzte = zeilen[zeilen.length - 1]
      while (letzte && letzte.length < n) letzte.push(zelle([], breiten[letzte.length]))
      return zeilen.length ? [tabelle(zeilen, breiten)] : []
    }
    case 'tabelle': {
      const n = b.spalten.length, gew = b.breiten ?? b.spalten.map(() => 1), summe = gew.reduce((a, c) => a + c, 0)
      const breiten = gew.map((w) => Math.floor((w / summe) * breite))
      breiten[n - 1] = breite - breiten.slice(0, -1).reduce((a, c) => a + c, 0)
      const kopf = b.spalten.map((s, i) => zelle([absatz(s, { bold: true, color: FARBE, nach: 0 })], breiten[i], { rand: true, schatten: ZART }))
      const reihen = [...(b.beispiel ? [b.beispiel] : []), ...(b.werte ?? []), ...Array(b.zeilen).fill(null).map(() => b.spalten.map(() => ''))]
      return [tabelle([kopf, ...reihen.map((r) => r.map((c, i) => zelle([absatz(c || ' ', { nach: 0 })], breiten[i], { rand: true })))], breiten), absatz('', { nach: 40 })]
    }
    case 'einschaetzung': {
      const optB = 1300, ersteB = breite - optB * b.optionen.length
      const breiten = [ersteB, ...b.optionen.map(() => optB)]
      const kopf = [zelle([absatz(b.titel ?? '', { bold: true, color: FARBE, nach: 0, size: 20 })], ersteB, { rand: true, schatten: ZART }), ...b.optionen.map((o) => zelle([new Paragraph({ alignment: AlignmentType.CENTER, children: [run(o, { bold: true, size: 18 })] })], optB, { rand: true, schatten: ZART }))]
      return [tabelle([kopf, ...b.items.map((it) => [zelle([absatz(it, { nach: 0 })], ersteB, { rand: true }), ...b.optionen.map(() => zelle([new Paragraph({ alignment: AlignmentType.CENTER, children: [run('○')] })], optB, { rand: true }))])], breiten)]
    }
    case 'satzanfaenge':
      return b.items.flatMap((s) => [absatz(s, { nach: 20 }), ...Array(b.linien ?? 1).fill(0).map(linie)])
    case 'linien':
      return Array(b.anzahl).fill(0).map(linie)
    case 'dialog': {
      const wb = 1700
      return [tabelle(b.zeilen.map((z) => [zelle([absatz(z.wer, { bold: true, color: FARBE, nach: 0 })], wb), zelle([absatz(z.text ?? '', { nach: 0 })], breite - wb)]), [wb, breite - wb]), absatz('', { nach: 40 })]
    }
    case 'bilder':
      return [absatz(b.bilder.map((x) => x.text).filter(Boolean).join('   ·   '), { bold: true, size: 20, color: '3A404C', nach: 120 })]
    case 'zuordnen': {
      const lb = Math.floor(breite * 0.45), mb = breite - 2 * lb
      const n = Math.max(b.links.length, b.rechts.length)
      const kopf = b.titel ? [[zelle([absatz(b.titel[0], { bold: true, color: FARBE })], lb), zelle([], mb), zelle([absatz(b.titel[1], { bold: true, color: FARBE })], lb)]] : []
      return [tabelle([...kopf, ...Array(n).fill(0).map((_, i) => [zelle([absatz((b.links[i] ?? '') + '   ●', { nach: 40 })], lb, { rand: !!b.links[i] }), zelle([], mb), zelle([absatz('●   ' + (b.rechts[i] ?? ''), { nach: 40 })], lb, { rand: !!b.rechts[i] })])], [lb, mb, lb])]
    }
    case 'spalten':
      // im Word untereinander (keine Layout-Tabelle): einfacher zu bearbeiten, nichts verrutscht
      return [...wandle(b.links, breite), ...wandle(b.rechts, breite)]
    case 'umwandlung':
      return umwandlungsTabelle(b.tabelle ?? eintragen(b.zeilen[0].replace(/\{[^}]*\}/, '___'))?.art ?? 'laenge', b.zeilen.map((t, i) => ({ text: t, marke: b.buchstaben ? BUCHST[i] : undefined })), breite)
    case 'stellentafel':
      return stellenTafel(b, breite)
    case 'kaestchen': {
      // Rechenkästchen als Tabelle mit 0,5-cm-Zellen – man kann hineinschreiben oder Zeilen ergänzen
      const zb = 284, n = Math.floor(breite / zb), gitter = rand(BorderStyle.SINGLE, 2, 'C9D3E0')
      const out: (Paragraph | Table)[] = []
      if (b.label) out.push(absatz(b.label, { size: 20, color: '5A6170' }))
      out.push(new Table({ width: { size: zb * n, type: WidthType.DXA }, columnWidths: Array(n).fill(zb), rows: Array(Math.max(1, b.zeilen)).fill(0).map(() => new TableRow({ height: { value: zb, rule: 'exact' }, children: Array(n).fill(0).map(() => new TableCell({ children: [new Paragraph('')], width: { size: zb, type: WidthType.DXA }, borders: { top: gitter, bottom: gitter, left: gitter, right: gitter } })) })) }), absatz('', { nach: 60 }))
      return out
    }
    case 'seitenumbruch':
      return []   // im PDF gesetzt, damit eine Seite voll wird – im Word fließt der Text, ein fester Umbruch gäbe fast leere Seiten
    default:
      return [absatz(`[${b.art}]`, { italics: true, color: '9AA0AC' })]
  }
}

const fuss = (titel: string) => new Footer({ children: [new Paragraph({ children: [run(titel + '   ·   ', { size: 16, color: '7A8090' }), run(URHEBER.de, { size: 14, color: '9AA0AC' })] })] })
const numbering = { config: [
  { reference: 'punkte', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 260 } } } }] },
  { reference: 'zahlen', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] },
  // Aufgaben: Word zählt selbst (neue Aufgabe einfügen → die folgenden zählen weiter); je Lektion neu ab 1
  { reference: 'aufgaben', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 440 } }, run: { bold: true } } }] },
] }
// Formatvorlagen: Standard 12 pt; Überschrift 1 = Lektion, 2 = Teil des Hefts, 3 = Aufgabe (erscheinen im Navigationsbereich)
const stile = () => ({
  default: {
    document: { run: { font: SCHRIFT, size: 24 }, paragraph: { spacing: { after: 100, line: 276 } } },
    title: { run: { font: SCHRIFT, size: 52, bold: true }, paragraph: { spacing: { after: 160 } } },
    heading1: { run: { font: SCHRIFT, size: 40, bold: true, color: '1F2A44' }, paragraph: { spacing: { before: 0, after: 120 }, keepNext: true } },
    heading2: { run: { font: SCHRIFT, size: 28, bold: true, color: FARBE }, paragraph: { spacing: { before: 280, after: 100 }, keepNext: true } },
    heading3: { run: { font: SCHRIFT, size: 24, bold: true, color: '1F2A44' }, paragraph: { spacing: { before: 240, after: 80 }, keepNext: true } },
  },
})
const seite = { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, bottom: 900, left: RAND, right: RAND } } }

function lektionKopf(modul: Modul, l: { id: string; nr: number; thema: number }, b: Blatt, zusatz = ''): Paragraph[] {
  lektionNr++
  return [
    new Paragraph({ pageBreakBefore: true, keepNext: true, spacing: { after: 60 }, children: [run(`LEKTION ${l.nr}${zusatz}   ·   Mathe · Modul ${modul.nr} · ${modul.themen[l.thema].titel.de}`, { size: 16, bold: true, color: FARBE })] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [run(b.de.titel)] }),
    ...(modul.lernziele[l.id]?.de ? [new Paragraph({ spacing: { after: 160 }, children: [run('Mein Ziel: ', { bold: true, color: FARBE }), run(modul.lernziele[l.id].de)] })] : []),
  ]
}

async function heft(modul: Modul) {
  const lektionen = modulLektionen(modul)
  const erstes = blaetter.get(lektionen[0].id)!
  const farben = (bereichById.get(erstes.bereich) ?? bereichById.get('mathe')!).farben
  FARBE = farben.tief.replace('#', ''); ZART = farben.zart.replace('#', '')
  for (const l of lektionen) sammle(blaetter.get(l.id)!.de.bausteine, PDF_BREITE)
  await grafikenRendern(farben)
  const titel = `${modul.fach.de} – Modul ${modul.nr}: ${modul.titel.de}`

  // Heft
  const kinder: (Paragraph | Table)[] = [
    new Paragraph({ spacing: { after: 120 }, children: [run(`${modul.fach.de.toUpperCase()} · MODUL ${modul.nr}`, { bold: true, color: FARBE, size: 20 })] }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [run(modul.titel.de)] }),
    absatz(modul.untertitel.de, { nach: 240 }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run('Inhalt')] }),
    ...modul.themen.flatMap((th) => [absatz(th.titel.de, { bold: true, vor: 120 }), ...lektionen.filter((l) => modul.themen[l.thema] === th).map((l) => absatz(`Lektion ${l.nr}: ${blaetter.get(l.id)!.de.titel} – ${modul.lernziele[l.id]?.de ?? ''}`, { size: 20 }))]),
    absatz('', { nach: 200 }),
    absatz('Name: ______________________     Klasse: ________     Schuljahr: ________', { vor: 400 }),
  ]
  for (const l of lektionen) {
    const b = blaetter.get(l.id)!
    aufgabeNr = 0
    kinder.push(...lektionKopf(modul, l, b), ...wandle(b.de.bausteine, BREITE))
  }
  // Anhang: Wortschatz
  kinder.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [run('Wortschatz · Vocabulaire')] }))
  const wb = Math.floor(BREITE / 2)
  modul.themen.forEach((th, ti) => {
    const w = modul.wortschatz.filter((x) => x.thema === ti)
    if (!w.length) return
    kinder.push(absatz(th.titel.de, { bold: true, color: FARBE, vor: 120 }), tabelle(w.map((x) => [zelle([absatz(x.de, { nach: 0 })], wb, { rand: true }), zelle([absatz(x.fr, { nach: 0, color: '5A6170' })], BREITE - wb, { rand: true })]), [wb, BREITE - wb]))
  })
  const doc = new Document({ creator: 'CDSE Toolbox', title: titel, styles: stile(), numbering, sections: [{ properties: seite, footers: { default: fuss(titel) }, children: kinder }] })
  const datei = join(ziel, `${modul.fach.de}_Modul-${modul.nr}_Heft.docx`)
  writeFileSync(datei, await Packer.toBuffer(doc))
  console.log('✓', datei)

  // Lösungsheft
  const lk: (Paragraph | Table)[] = [new Paragraph({ spacing: { after: 160 }, children: [run(`${titel} – Lösungen und Hinweise`, { bold: true, size: 40 })] })]
  for (const l of lektionen) {
    const b = blaetter.get(l.id)!, L = b.de.lehrer
    lk.push(...lektionKopf(modul, l, b, ' · FÜR DIE LEHRPERSON'))
    if (L.ziel) lk.push(h2('Ziel'), absatz(L.ziel))
    if (L.ablauf?.length) lk.push(h2('Ablauf'), ...L.ablauf.map((a) => new Paragraph({ numbering: { reference: 'zahlen', level: 0 }, children: [run(a)], spacing: { after: 40 } })))
    if (L.loesungen?.length) lk.push(h2('Lösungen'), ...L.loesungen.map((s) => absatz(s, { size: 20, nach: 40 })))
    if (L.differenzierung) lk.push(h2('Differenzierung'), ...Object.entries(L.differenzierung).map(([k, v]) => new Paragraph({ spacing: { after: 40 }, children: [run((k === 'leichter' ? 'Leichter: ' : k === 'schwerer' ? 'Anspruchsvoller: ' : k + ': '), { bold: true }), run(String(v))] })))
    if (L.material?.length) lk.push(h2('Material'), absatz(([] as string[]).concat(L.material).join(' · ')))
    if (L.impulse?.length) lk.push(h2('Gesprächsimpulse'), ...([] as string[]).concat(L.impulse).map((s) => new Paragraph({ numbering: { reference: 'punkte', level: 0 }, children: [run(s)] })))
    if (L.tipps?.length) lk.push(h2('Aus der Praxis'), ...([] as string[]).concat(L.tipps).map((s) => new Paragraph({ numbering: { reference: 'punkte', level: 0 }, children: [run(s)] })))
    if (L.hintergrund) lk.push(h2('Fachlicher Hintergrund'), absatz(L.hintergrund, { size: 20 }))
  }
  const doc2 = new Document({ creator: 'CDSE Toolbox', title: titel + ' – Lösungen', styles: stile(), numbering, sections: [{ properties: seite, footers: { default: fuss(titel + ' – Lösungen') }, children: lk }] })
  const datei2 = join(ziel, `${modul.fach.de}_Modul-${modul.nr}_Loesungen.docx`)
  writeFileSync(datei2, await Packer.toBuffer(doc2))
  console.log('✓', datei2)
}

for (const modul of MODULE.filter((m) => !nur || m.id === nur)) await heft(modul)
