// Förderfach „Skills fir d’Liewen“ als PDF, je Klassenstufe (7e, 6e, 5e) und Sprache (DE, FR):
//  - das Schülerheft (Deckblatt, Inhalt, alle Blätter, Wochen-Missionen, Skill-Karten, Meine Wörter,
//    Rückseite mit Hilfe)
//  - das Lehrerhandbuch als Booklet (Teil A–D, Glossar, Rückseite)
// Beide haben eine durch 4 teilbare Seitenzahl (Druck als Broschüre, A3 gefaltet zu A4).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach.tsx [ausgabeordner] [--png] [--entwurf] [--nur=7e] [--sprache=de] [--ausgabe=annexe]
// Ohne Ordner landen die PDFs in tmp/foerderfach (nicht im Repo). --png: jede Seite als Bild
// (PyMuPDF). --entwurf: die Entwürfe aus src/data/foerderfach/entwurf mitnehmen (zum Ansehen,
// bevor sie übernommen sind).
// --ausgabe=annexe: der Skills-Kurs der Annexe statt des Förderfachs für Klassen – nur Deutsch, Leitungsheft
// statt Lehrerhandbuch, Daten und Entwürfe aus src/data/foerderfach/annexe (siehe scripts/foerderfach-ausgabe.ts):
// Skills-fir-d-Liewen_Annexe_7e_Leitungsheft.pdf und …_Schuelerheft.pdf. Teile ohne Texte oder Daten entfallen. Vor jeder
// Einheit steht ein Spickzettel (eine Seite für die Hand der Leitung, Texte werden gekürzt); läuft einer doch über, meldet das ✗.
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
import { ladeDaten, ladeEntwurf, waehleAusgabeAus } from './foerderfach-ausgabe'
import { KLASSEN } from '../src/foerderfach/fach'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const wahl = waehleAusgabeAus(args)
const { EINHEITEN, HANDBUCH, HEFT_VORN, PLAENE, SKILLKARTEN, WERKZEUGE, blattById, planVon } = ladeDaten(wahl)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/foerderfach')
const nur = args.find((a) => a.startsWith('--nur='))?.slice(6)
const nurSprache = args.find((a) => a.startsWith('--sprache='))?.slice(10) as Sprache | undefined
const sprachen: Sprache[] = nurSprache ? [nurSprache] : wahl.annexe ? ['de'] : ['de', 'fr']
if (wahl.annexe && sprachen.includes('fr')) {
  console.error('Die Ausgabe annexe gibt es nur auf Deutsch (--sprache=de).')
  process.exit(1)
}
mkdirSync(ziel, { recursive: true })

const NAME: Record<Sprache, { booklet: string; heft: string }> = {
  de: { booklet: 'Lehrerhandbuch', heft: 'Schuelerheft' },
  fr: { booklet: 'Guide-enseignant', heft: 'Cahier-eleve' },
}
/** Dateiname: „…_7e_Lehrerhandbuch_DE.pdf“, in der Ausgabe annexe (nur Deutsch, ohne Sprachkürzel) „…_Annexe_7e_Leitungsheft.pdf“ */
const dateiName = (klasse: string, art: 'booklet' | 'heft', sprache: Sprache) =>
  wahl.annexe ? `Skills-fir-d-Liewen_Annexe_${klasse}_${art === 'booklet' ? 'Leitungsheft' : NAME.de.heft}.pdf` : `Skills-fir-d-Liewen_${klasse}_${NAME[sprache][art]}_${sprache.toUpperCase()}.pdf`

// --- Daten, auf Wunsch mit Entwürfen ------------------------------------------------------------
if (wahl.annexe) {
  console.log(`Ausgabe annexe: Daten aus ${wahl.ordner} (${PLAENE.length} Plan/Pläne, ${EINHEITEN.length} Einheit(en))`)
  // Handbuchtexte, die es nicht gibt: Die Seiten entfallen
  const teile = ['vorwort', 'start', 'ueberblick', 'kompetenzen', 'grundlagen', 'doppelstunde', 'sicherheit', 'methoden', 'eltern', 'brief', 'material', 'messen', 'plaene', 'jahresweg', 'glossar', 'literatur', 'heft', 'rueckseite'] as const
  const unterteile = (['fragebogen', 'auswertung', 'logbuch'] as const).filter((k) => HANDBUCH.de.messen && !HANDBUCH.de.messen[k]).map((k) => `messen.${k}`)
  const fehlen = [...teile.filter((k) => !HANDBUCH.de[k]), ...unterteile]
  if (fehlen.length) console.log(`  Ohne Handbuchtext, entfällt: ${fehlen.join(', ')}`)
}
let einheiten: Einheit[] = [...EINHEITEN]
const blaetter = new Map<string, Blatt>(blattById)
if (args.includes('--entwurf')) {
  const ordner = wahl.entwurf
  const dateien = existsSync(ordner) ? readdirSync(ordner).filter((d) => d.endsWith('.json')) : []
  for (const d of dateien) {
    let x: EinheitenDatei
    try {
      x = ladeEntwurf(join(ordner, d), wahl)
    } catch {
      console.error(`  Entwurf ${d} übersprungen: kein gültiges JSON (wird vielleicht gerade geschrieben)`)
      continue
    }
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

const daten: HandbuchDaten = { plaene: PLAENE, einheiten, text: HANDBUCH, blaetter, werkzeuge: WERKZEUGE, karten: SKILLKARTEN }

for (const klasse of KLASSEN.filter((k) => !nur || k === nur)) {
  const plan = planVon(klasse)
  if (!plan) {
    console.log(`– ${klasse}: kein Plan (plan-${klasse}.json fehlt), nicht gesetzt`)
    continue
  }
  const eigene = einheiten.filter((e) => e.klasse === klasse)
  for (const sprache of sprachen) {
    const text = HANDBUCH[sprache]
    const heft = new Map<string, number>()
    // --- Schülerheft ---------------------------------------------------------------------------
    if (!text.heft) {
      console.log(`– ${klasse}: kein Schülerheft (der Handbuchtext „heft“ fehlt)`)
    } else {
      const heftDatei = join(ziel, dateiName(klasse, 'heft', sprache))
      const h1 = new Map<string, number>()
      const ersterDurchlauf = (kartenLuecke: boolean) =>
        renderToFile(
          <SchuelerheftDokument
            plan={plan}
            einheiten={eigene}
            blaetter={blaetter}
            text={text}
            sprache={sprache}
            vorn={HEFT_VORN[klasse]}
            karten={SKILLKARTEN[klasse]}
            kartenLuecke={kartenLuecke}
            marken={h1}
          />,
          heftDatei,
        )
      await ersterDurchlauf(false)
      // Die Skill-Karten beginnen auf einer Vorderseite (ungerade Seite): Ihre Rückseite wird beim Ausschneiden zerschnitten
      const kartenLuecke = h1.has('k') && h1.get('k')! % 2 === 0
      if (kartenLuecke) {
        h1.clear()
        await ersterDurchlauf(true)
      }
      const heftNotizen = auffuellen(seitenzahl(heftDatei))
      await renderToFile(
        <SchuelerheftDokument
          plan={plan}
          einheiten={eigene}
          blaetter={blaetter}
          text={text}
          sprache={sprache}
          vorn={HEFT_VORN[klasse]}
          karten={SKILLKARTEN[klasse]}
          kartenLuecke={kartenLuecke}
          marken={heft}
          seiten={h1}
          notizen={heftNotizen}
        />,
        heftDatei,
      )
      vergleiche(heftDatei, h1, heft)
      const nh = seitenzahl(heftDatei)
      if (nh % 4) {
        console.error(`✗ ${heftDatei}: ${nh} Seiten – kein Vielfaches von 4`)
        process.exitCode = 1
      }
      console.log('✓', heftDatei, `(${nh} Seiten, ${heftNotizen} Notizseiten, ${[...heft.keys()].filter((k) => !/^(w|k|m\d?|k-.+)$/.test(k)).length} Blätter)`)
      bilder(heftDatei)
    }

    // --- Lehrerhandbuch ------------------------------------------------------------------------
    const datei = join(ziel, dateiName(klasse, 'booklet', sprache))
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
    // Ausgabe annexe: Jeder Spickzettel steht auf genau einer Seite (Anfang und Ende liegen auf derselben Seite)
    const langeSpick = wahl.annexe ? eigene.filter((e) => m2.has(`sp-${e.id}`) && m2.get(`spe-${e.id}`) !== m2.get(`sp-${e.id}`)) : []
    for (const e of langeSpick) {
      console.error(`✗ ${datei}: Spickzettel von ${e.id} läuft über ${(m2.get(`spe-${e.id}`) ?? 0) - (m2.get(`sp-${e.id}`) ?? 0) + 1} Seiten`)
      process.exitCode = 1
    }
    const n = seitenzahl(datei)
    if (n % 4) {
      console.error(`✗ ${datei}: ${n} Seiten – kein Vielfaches von 4`)
      process.exitCode = 1
    }
    console.log('✓', datei, `(${n} Seiten, ${notizen} Notizseiten, ${eigene.length} Einheiten${wahl.annexe ? `, ${eigene.length} Spickzettel` : ''})`)
    if (args.includes('--marken'))
      console.log(
        [...m2]
          .sort((a, b) => a[1] - b[1])
          .map(([id, s]) => `${s}:${id}`)
          .join('  '),
      )
    bilder(datei)
  }
}
