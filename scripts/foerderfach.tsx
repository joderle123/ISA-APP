// Förderfach „Skills fir d’Liewen“ als PDF, jeweils Deutsch und Französisch:
//  - drei Booklets, eines je Klassenstufe (Lehrerhandbuch 7e, 6e, 5e: Grundlagen, Jahresplan,
//    ausgearbeitete Einheiten, Kopiervorlagen, Rückseite – Seitenzahl ein Vielfaches von 4,
//    damit es sich als Broschüre drucken lässt)
//  - das Schülerheft 7e
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach.tsx [ausgabeordner] [--png]
// Ohne Ordner landen die PDFs in tmp/foerderfach (nicht im Repo). Mit --png zusätzlich jede
// Seite als Bild (PyMuPDF), zum Ansehen.
// Jedes Booklet wird zweimal gesetzt: Der erste Durchlauf sammelt die Seitenzahlen (Inhalt,
// Verweise auf die Kopiervorlagen) und die Seitenzahl insgesamt, der zweite setzt sie ein und
// füllt mit Notizseiten auf.
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { BookletDokument, type HandbuchDaten } from '../src/foerderfach/pdf/Handbuch'
import { SchuelerheftDokument } from '../src/foerderfach/pdf/Schuelerheft'
import { EINHEITEN, HANDBUCH, PLAENE, VORLAGEN, blattById, planVon } from '../src/foerderfach/daten'
import { KLASSEN } from '../src/foerderfach/fach'
import type { Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/foerderfach')
mkdirSync(ziel, { recursive: true })
const sprachen: Sprache[] = ['de', 'fr']

const NAME: Record<Sprache, { booklet: string; heft: string }> = {
  de: { booklet: 'Booklet', heft: 'Schuelerheft' },
  fr: { booklet: 'Livret', heft: 'Cahier-eleve' },
}

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

function bilder(datei: string) {
  if (!args.includes('--png')) return
  execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, '80'])
}

/** „September 2026“ / « septembre 2026 » */
const stand = (sprache: Sprache) => new Intl.DateTimeFormat(sprache === 'fr' ? 'fr-LU' : 'de-LU', { month: 'long', year: 'numeric' }).format(new Date())

// --- Booklets -------------------------------------------------------------------------------
const daten: HandbuchDaten = { plaene: PLAENE, einheiten: EINHEITEN, text: HANDBUCH, blaetter: blattById, vorlagen: VORLAGEN }
for (const klasse of KLASSEN) {
  for (const sprache of sprachen) {
    const datei = join(ziel, `Skills-fir-d-Liewen_${NAME[sprache].booklet}-${klasse}_${sprache.toUpperCase()}.pdf`)
    const marken = new Map<string, number>()
    await renderToFile(<BookletDokument daten={daten} klasse={klasse} sprache={sprache} marken={marken} stand={stand(sprache)} />, datei)
    const notizen = (4 - (seitenzahl(datei) % 4)) % 4
    const kontrolle = new Map<string, number>()
    await renderToFile(<BookletDokument daten={daten} klasse={klasse} sprache={sprache} marken={kontrolle} seiten={marken} notizen={notizen} stand={stand(sprache)} />, datei)
    for (const [id, s] of marken) {
      if (kontrolle.get(id) !== s) {
        console.error(`✗ ${datei}: ${id} steht auf Seite ${kontrolle.get(id)}, im Inhalt ${s}`)
        process.exitCode = 1
      }
    }
    const n = seitenzahl(datei)
    if (n % 4) {
      console.error(`✗ ${datei}: ${n} Seiten – kein Vielfaches von 4`)
      process.exitCode = 1
    }
    console.log('✓', datei, `(${n} Seiten, ${notizen} Notizseiten)`, [...kontrolle].map(([id, s]) => `${id} S. ${s}`).join(', '))
    bilder(datei)
  }
}

// --- Schülerheft 7e -------------------------------------------------------------------------
const plan7 = planVon('7e')
const einheiten7 = EINHEITEN.filter((e) => e.klasse === '7e')
for (const sprache of sprachen) {
  const datei = join(ziel, `Skills-fir-d-Liewen_7e_${NAME[sprache].heft}_${sprache.toUpperCase()}.pdf`)
  const seiten = new Map<string, number>()
  await renderToFile(<SchuelerheftDokument plan={plan7} einheiten={einheiten7} blaetter={blattById} sprache={sprache} seiten={seiten} />, datei)
  console.log('✓', datei, `(${seitenzahl(datei)} Seiten)`)
  bilder(datei)
}
