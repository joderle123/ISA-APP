// Modulheft als Word-Datei (zum Bearbeiten durch die Lehrperson): Heft und Lösungsheft.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/modulheft-word.tsx <ausgabeordner> --nur=mathe-m3
// Texte, Aufgaben, Päckchen, Tabellen und Kästen werden als bearbeitbare Word-Elemente geschrieben. Grafiken (Zahlenstrahl,
// Thermometer, Diagramm, Strichliste, Fläche, Kästchen …) rendert derselbe Baukasten wie das PDF und setzt sie als Bild ein.
import { renderToBuffer, Document as PdfDocument, Page } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
// „docx“ (npm) ist kein Paket der App – nur dieses Skript braucht es (npm install docx, oder global vorhanden)
const {
  AlignmentType, BorderStyle, Document, Footer, ImageRun, LevelFormat, Packer, PageBreak, Paragraph, ShadingType,
  Table, TableCell, TableRow, TextRun, WidthType,
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
const GRAFIK = new Set(['zahlenstrahl', 'kommasprung', 'flaeche', 'treppe', 'temperatur', 'diagramm', 'strichliste', 'kaestchen'])
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
    } else if (GRAFIK.has(b.art) && !grafikVon.has(b)) {
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
const run = (text: string, o: { bold?: boolean; size?: number; color?: string; italics?: boolean } = {}) => new TextRun({ text, font: SCHRIFT, size: o.size ?? 22, bold: o.bold, italics: o.italics, color: o.color })
const absatz = (text: string, o: { bold?: boolean; size?: number; color?: string; italics?: boolean; nach?: number; vor?: number; keepNext?: boolean } = {}) =>
  new Paragraph({ children: [run(luecke(text), o)], spacing: { before: o.vor ?? 0, after: o.nach ?? 80 }, keepNext: o.keepNext })
const linie = () => new Paragraph({ children: [run(' ')], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '9AA0AC', space: 1 } }, spacing: { after: 160 } })
const BUCHST = 'abcdefghijklmnopqrstuvwxyz'
const zelle = (kinder: (Paragraph | Table)[], breite: number, o: { schatten?: string; rand?: boolean } = {}) =>
  new TableCell({ children: kinder.length ? kinder : [new Paragraph('')], width: { size: breite, type: WidthType.DXA }, borders: o.rand ? rahmen : ohneRaum, shading: o.schatten ? { type: ShadingType.CLEAR, color: 'auto', fill: o.schatten } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 } })
const tabelle = (zeilen: TableCell[][], breiten: number[]) => new Table({ width: { size: breiten.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: breiten, rows: zeilen.map((z) => new TableRow({ children: z, cantSplit: true })) })

let FARBE = '2E9E5B', ZART = 'EEF7F2'
let aufgabeNr = 0

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
    const w = Math.min(maxPx, natPx), h = (g.h! / g.w!) * w
    return [new Paragraph({ children: [new ImageRun({ type: 'png', data: g.png, transformation: { width: Math.round(w), height: Math.round(h) } })], spacing: { after: 100 } })]
  }
  switch (b.art) {
    case 'aufgabe': {
      aufgabeNr++
      const punkte = '●'.repeat(b.stufe ?? 1) + '○'.repeat(3 - (b.stufe ?? 1))
      const p = [new Paragraph({ keepNext: true, spacing: { before: 200, after: 80 }, children: [run(`${aufgabeNr}  `, { bold: true, color: FARBE, size: 24 }), run(punkte + '  ', { color: FARBE, size: 18 }), run(b.text, { bold: true })] })]
      if (b.hinweis) p.push(absatz(b.hinweis, { italics: true, size: 20, color: '5A6170', keepNext: true }))
      return p
    }
    case 'text':
      return [absatz(b.text, { size: b.klein ? 18 : 22, color: b.klein ? '5A6170' : undefined, keepNext: /:\s*$/.test(b.text) })]
    case 'info': {
      const inhalt: Paragraph[] = []
      if (b.titel) inhalt.push(absatz(b.titel, { bold: true, color: FARBE }))
      if (b.text) inhalt.push(absatz(b.text))
      for (const pkt of b.punkte ?? []) inhalt.push(new Paragraph({ numbering: { reference: 'punkte', level: 0 }, children: [run(luecke(pkt))], spacing: { after: 40 } }))
      return [tabelle([[zelle(inhalt, breite, { schatten: ZART })]], [breite]), absatz('', { nach: 60 })]
    }
    case 'schritte':
      return b.items.flatMap((s, i) => [
        new Paragraph({ keepNext: true, spacing: { before: 60, after: 20 }, children: [run(`${i + 1}  `, { bold: true, color: FARBE }), run(s.titel, { bold: true })] }),
        ...(s.text ? [absatz(s.text, { size: 20, color: '3A404C' })] : []),
      ])
    case 'paeckchen': {
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
    case 'spalten': {
      const [l, r] = b.verhaeltnis === '2:1' ? [2, 1] : b.verhaeltnis === '1:2' ? [1, 2] : [1, 1]
      const abst = 240, bl = Math.floor(((breite - abst) * l) / (l + r)), br = breite - abst - bl
      return [tabelle([[zelle(wandle(b.links, bl - 200), bl), zelle([], abst), zelle(wandle(b.rechts, br - 200), br)]], [bl, abst, br]), absatz('', { nach: 40 })]
    }
    case 'seitenumbruch':
      return [new Paragraph({ children: [new PageBreak()] })]
    default:
      return [absatz(`[${b.art}]`, { italics: true, color: '9AA0AC' })]
  }
}

const fuss = (titel: string) => new Footer({ children: [new Paragraph({ children: [run(titel + '   ·   ', { size: 16, color: '7A8090' }), run(URHEBER.de, { size: 14, color: '9AA0AC' })] })] })
const numbering = { config: [{ reference: 'punkte', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] }, { reference: 'zahlen', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] }] }
const styles = { default: { document: { run: { font: SCHRIFT, size: 22 } } } }
const seite = { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, bottom: 900, left: RAND, right: RAND } } }

function lektionKopf(modul: Modul, l: { id: string; nr: number; thema: number }, b: Blatt, zusatz = ''): Paragraph[] {
  return [
    absatz(`LEKTION ${l.nr}${zusatz}   ·   Mathe · Modul ${modul.nr} · ${modul.themen[l.thema].titel.de}`, { size: 16, bold: true, color: FARBE, nach: 60 }),
    new Paragraph({ spacing: { after: 80 }, keepNext: true, children: [run(b.de.titel, { bold: true, size: 40 })] }),
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
    new Paragraph({ spacing: { after: 160 }, children: [run(modul.titel.de, { bold: true, size: 52 })] }),
    absatz(modul.untertitel.de, { size: 24, nach: 240 }),
    absatz('Inhalt', { bold: true, size: 28, color: FARBE }),
    ...modul.themen.flatMap((th) => [absatz(th.titel.de, { bold: true, vor: 120 }), ...lektionen.filter((l) => modul.themen[l.thema] === th).map((l) => absatz(`Lektion ${l.nr}: ${blaetter.get(l.id)!.de.titel} – ${modul.lernziele[l.id]?.de ?? ''}`, { size: 20 }))]),
    absatz('', { nach: 200 }),
    absatz('Name: ______________________     Klasse: ________     Schuljahr: ________', { vor: 400 }),
  ]
  for (const l of lektionen) {
    const b = blaetter.get(l.id)!
    aufgabeNr = 0
    kinder.push(new Paragraph({ children: [new PageBreak()] }), ...lektionKopf(modul, l, b), ...wandle(b.de.bausteine, BREITE))
  }
  // Anhang: Wortschatz
  kinder.push(new Paragraph({ children: [new PageBreak()] }), absatz('Wortschatz · Vocabulaire', { bold: true, size: 36, nach: 160 }))
  const wb = Math.floor(BREITE / 2)
  modul.themen.forEach((th, ti) => {
    const w = modul.wortschatz.filter((x) => x.thema === ti)
    if (!w.length) return
    kinder.push(absatz(th.titel.de, { bold: true, color: FARBE, vor: 120 }), tabelle(w.map((x) => [zelle([absatz(x.de, { nach: 0 })], wb, { rand: true }), zelle([absatz(x.fr, { nach: 0, color: '5A6170' })], BREITE - wb, { rand: true })]), [wb, BREITE - wb]))
  })
  const doc = new Document({ creator: 'CDSE Toolbox', title: titel, styles, numbering, sections: [{ properties: seite, footers: { default: fuss(titel) }, children: kinder }] })
  const datei = join(ziel, `${modul.fach.de}_Modul-${modul.nr}_Heft.docx`)
  writeFileSync(datei, await Packer.toBuffer(doc))
  console.log('✓', datei)

  // Lösungsheft
  const lk: (Paragraph | Table)[] = [new Paragraph({ spacing: { after: 160 }, children: [run(`${titel} – Lösungen und Hinweise`, { bold: true, size: 40 })] })]
  for (const l of lektionen) {
    const b = blaetter.get(l.id)!, L = b.de.lehrer
    lk.push(new Paragraph({ children: [new PageBreak()] }), ...lektionKopf(modul, l, b, ' · FÜR DIE LEHRPERSON'))
    if (L.ziel) lk.push(absatz('Ziel', { bold: true, color: FARBE, keepNext: true }), absatz(L.ziel))
    if (L.ablauf?.length) lk.push(absatz('Ablauf', { bold: true, color: FARBE, vor: 120, keepNext: true }), ...L.ablauf.map((a) => new Paragraph({ numbering: { reference: 'zahlen', level: 0 }, children: [run(a)], spacing: { after: 40 } })))
    if (L.loesungen?.length) lk.push(absatz('Lösungen', { bold: true, color: FARBE, vor: 120, keepNext: true }), ...L.loesungen.map((s) => absatz(s, { size: 20, nach: 40 })))
    if (L.differenzierung) lk.push(absatz('Differenzierung', { bold: true, color: FARBE, vor: 120, keepNext: true }), ...Object.entries(L.differenzierung).map(([k, v]) => new Paragraph({ spacing: { after: 40 }, children: [run((k === 'leichter' ? 'Leichter: ' : k === 'schwerer' ? 'Anspruchsvoller: ' : k + ': '), { bold: true }), run(String(v))] })))
    if (L.material?.length) lk.push(absatz('Material', { bold: true, color: FARBE, vor: 120, keepNext: true }), absatz(([] as string[]).concat(L.material).join(' · ')))
    if (L.impulse?.length) lk.push(absatz('Gesprächsimpulse', { bold: true, color: FARBE, vor: 120, keepNext: true }), ...([] as string[]).concat(L.impulse).map((s) => new Paragraph({ numbering: { reference: 'punkte', level: 0 }, children: [run(s)] })))
    if (L.tipps?.length) lk.push(absatz('Aus der Praxis', { bold: true, color: FARBE, vor: 120, keepNext: true }), ...([] as string[]).concat(L.tipps).map((s) => new Paragraph({ numbering: { reference: 'punkte', level: 0 }, children: [run(s)] })))
    if (L.hintergrund) lk.push(absatz('Fachlicher Hintergrund', { bold: true, color: FARBE, vor: 120, keepNext: true }), absatz(L.hintergrund, { size: 20 }))
  }
  const doc2 = new Document({ creator: 'CDSE Toolbox', title: titel + ' – Lösungen', styles, numbering, sections: [{ properties: seite, footers: { default: fuss(titel + ' – Lösungen') }, children: lk }] })
  const datei2 = join(ziel, `${modul.fach.de}_Modul-${modul.nr}_Loesungen.docx`)
  writeFileSync(datei2, await Packer.toBuffer(doc2))
  console.log('✓', datei2)
}

for (const modul of MODULE.filter((m) => !nur || m.id === nur)) await heft(modul)
