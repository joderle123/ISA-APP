// Förderfach „Skills fir d’Liewen“ als PDF, je Klassenstufe (7e, 6e, 5e) und Sprache (DE, FR):
//  - das Schülerheft (Deckblatt, Inhalt, alle Blätter, Meine Wörter, Rückseite mit Hilfe)
//  - das Lehrerhandbuch als Booklet (Teil A–D, Glossar, Rückseite)
// Beide haben eine durch 4 teilbare Seitenzahl (Druck als Broschüre, A3 gefaltet zu A4).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach.tsx [ausgabeordner] [--png] [--entwurf] [--nur=7e] [--sprache=de]
// Ohne Ordner landen die PDFs in tmp/foerderfach (nicht im Repo). --png: jede Seite als Bild
// (PyMuPDF). --entwurf: die Entwürfe aus src/data/foerderfach/entwurf mitnehmen (zum Ansehen,
// bevor sie übernommen sind).
// Jedes Heft wird zweimal gesetzt: Der erste Durchlauf sammelt die Seitenzahlen, der zweite setzt
// sie ein (Inhalt, Jahresplan, Verweise) und füllt mit Notizseiten auf. Das Schülerheft kommt
// zuerst – das Handbuch verweist auf seine Seiten.
import { renderToFile } from '@react-pdf/renderer'
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { BookletDokument, type HandbuchDaten } from '../src/foerderfach/pdf/Handbuch'
import { SchuelerheftDokument } from '../src/foerderfach/pdf/Schuelerheft'
import { EINHEITEN, HANDBUCH, HEFT_VORN, PLAENE, WERKZEUGE, blattById, planVon } from '../src/foerderfach/daten'
import { KLASSEN } from '../src/foerderfach/fach'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/foerderfach')
mkdirSync(ziel, { recursive: true })
const nur = args.find((a) => a.startsWith('--nur='))?.slice(6)
const nurSprache = args.find((a) => a.startsWith('--sprache='))?.slice(10) as Sprache | undefined
const sprachen: Sprache[] = nurSprache ? [nurSprache] : ['de', 'fr']

const NAME: Record<Sprache, { booklet: string; heft: string }> = {
  de: { booklet: 'Lehrerhandbuch', heft: 'Schuelerheft' },
  fr: { booklet: 'Guide-enseignant', heft: 'Cahier-eleve' },
}

// --- Daten, auf Wunsch mit Entwürfen ------------------------------------------------------------
let einheiten: Einheit[] = [...EINHEITEN]
const blaetter = new Map<string, Blatt>(blattById)
if (args.includes('--entwurf')) {
  const ordner = join(ROOT, 'src/data/foerderfach/entwurf')
  const dateien = existsSync(ordner) ? readdirSync(ordner).filter((d) => d.endsWith('.json')) : []
  for (const d of dateien) {
    const x = JSON.parse(readFileSync(join(ordner, d), 'utf8')) as EinheitenDatei
    for (const e of x.einheiten) einheiten = [...einheiten.filter((y) => y.id !== e.id), e]
    for (const b of x.blaetter ?? []) blaetter.set(b.id, b)
  }
  console.log(`Entwürfe: ${dateien.length} Datei(en)`)
}

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

function bilder(datei: string) {
  if (!args.includes('--png')) return
  execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%03d.png'%(i+1))`, datei, '70'])
}

/** Marken aus beiden Durchläufen vergleichen: Hat sich etwas verschoben, stimmen Inhalt und Verweise nicht. */
function vergleiche(datei: string, a: Map<string, number>, b: Map<string, number>) {
  for (const [id, s] of a) {
    if (b.get(id) !== s) {
      console.error(`✗ ${datei}: ${id} steht auf Seite ${b.get(id)}, im ersten Durchlauf ${s}`)
      process.exitCode = 1
    }
  }
}

/** „September 2026“ / « septembre 2026 » */
const stand = (sprache: Sprache) => new Intl.DateTimeFormat(sprache === 'fr' ? 'fr-LU' : 'de-LU', { month: 'long', year: 'numeric' }).format(new Date())
const auffuellen = (n: number) => (4 - (n % 4)) % 4

const daten: HandbuchDaten = { plaene: PLAENE, einheiten, text: HANDBUCH, blaetter, werkzeuge: WERKZEUGE }

for (const klasse of KLASSEN.filter((k) => !nur || k === nur)) {
  const plan = planVon(klasse)
  const eigene = einheiten.filter((e) => e.klasse === klasse)
  for (const sprache of sprachen) {
    const text = HANDBUCH[sprache]
    // --- Schülerheft ---------------------------------------------------------------------------
    const heftDatei = join(ziel, `Skills-fir-d-Liewen_${klasse}_${NAME[sprache].heft}_${sprache.toUpperCase()}.pdf`)
    const h1 = new Map<string, number>()
    await renderToFile(<SchuelerheftDokument plan={plan} einheiten={eigene} blaetter={blaetter} text={text} sprache={sprache} vorn={HEFT_VORN[klasse]} marken={h1} />, heftDatei)
    const heftNotizen = auffuellen(seitenzahl(heftDatei))
    const heft = new Map<string, number>()
    await renderToFile(<SchuelerheftDokument plan={plan} einheiten={eigene} blaetter={blaetter} text={text} sprache={sprache} vorn={HEFT_VORN[klasse]} marken={heft} seiten={h1} notizen={heftNotizen} />, heftDatei)
    vergleiche(heftDatei, h1, heft)
    const nh = seitenzahl(heftDatei)
    if (nh % 4) {
      console.error(`✗ ${heftDatei}: ${nh} Seiten – kein Vielfaches von 4`)
      process.exitCode = 1
    }
    console.log('✓', heftDatei, `(${nh} Seiten, ${heftNotizen} Notizseiten, ${[...heft.keys()].filter((k) => k !== 'w').length} Blätter)`)
    bilder(heftDatei)

    // --- Lehrerhandbuch ------------------------------------------------------------------------
    const datei = join(ziel, `Skills-fir-d-Liewen_${klasse}_${NAME[sprache].booklet}_${sprache.toUpperCase()}.pdf`)
    const m1 = new Map<string, number>()
    await renderToFile(<BookletDokument daten={daten} klasse={klasse} sprache={sprache} marken={m1} heft={heft} stand={stand(sprache)} />, datei)
    // Passt die Übersicht einer Einheit nicht auf eine Seite, folgen ihre Schritte direkt (sonst bliebe eine Seite fast leer)
    const fliessen = new Set(eigene.filter((e) => (m1.get(`s-${e.id}`) ?? 0) - (m1.get(`c-${e.id}`) ?? 0) > 1).map((e) => e.id))
    let seiten = m1
    if (fliessen.size) {
      seiten = new Map<string, number>()
      await renderToFile(<BookletDokument daten={daten} klasse={klasse} sprache={sprache} marken={seiten} heft={heft} stand={stand(sprache)} fliessen={fliessen} />, datei)
      console.log(`  Übersicht länger als eine Seite: ${[...fliessen].join(', ')}`)
    }
    const notizen = auffuellen(seitenzahl(datei))
    const m2 = new Map<string, number>()
    await renderToFile(<BookletDokument daten={daten} klasse={klasse} sprache={sprache} marken={m2} seiten={seiten} heft={heft} notizen={notizen} stand={stand(sprache)} fliessen={fliessen} />, datei)
    vergleiche(datei, seiten, m2)
    const n = seitenzahl(datei)
    if (n % 4) {
      console.error(`✗ ${datei}: ${n} Seiten – kein Vielfaches von 4`)
      process.exitCode = 1
    }
    console.log('✓', datei, `(${n} Seiten, ${notizen} Notizseiten, ${eigene.length} Einheiten)`)
    if (args.includes('--marken')) console.log([...m2].sort((a, b) => a[1] - b[1]).map(([id, s]) => `${s}:${id}`).join('  '))
    bilder(datei)
  }
}
