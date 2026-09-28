// Seitenprüfung aller Arbeitsblätter (Deutsch und – wo vorhanden – Französisch):
//   • die Seite „Für die Lehrperson“ ist genau EINE Seite,
//   • der Schülerteil hat höchstens 2 Seiten (Spielschule und C2: 1 Seite),
//   • keine leere Seite (nur Kopf/Fußzeile),
//   • jede Seite trägt den Urheber-Vermerk in der Sprache des Blatts (src/lib/urheber.ts).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-seiten.tsx [id|bereich …]
// Braucht python3 mit PyMuPDF für die Textprüfung. Fehler → Exit-Code 1.
import { renderToBuffer } from '@react-pdf/renderer'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { BlattDokument } from '../src/blatt/pdf/BlattDokument'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import type { Blatt, Sprache } from '../src/blatt/typen'
import { nummerieren } from '../src/blatt/nummern'
import { URHEBER } from '../src/lib/urheber'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const auswahl = process.argv.slice(2).filter((a) => !a.startsWith('--'))

const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
const alle = nummerieren(dateien)
const liste = auswahl.length ? alle.filter((b) => auswahl.some((a) => a === b.id || a === b.bereich || a === b.nr)) : alle

const tmp = mkdtempSync(join(tmpdir(), 'blatt-seiten-'))
const auftraege: { datei: string; blatt: Blatt & { nr: string }; sprache: Sprache; teil: 'schueler' | 'lehrer' }[] = []
for (const blatt of liste) {
  for (const sprache of ['de', 'fr'] as Sprache[]) {
    if (sprache === 'fr' && !blatt.fr) continue
    for (const teil of ['schueler', 'lehrer'] as const) {
      const datei = join(tmp, `${blatt.nr}_${sprache}_${teil}.pdf`)
      const buf = await renderToBuffer(<BlattDokument blatt={blatt} opt={{ sprache, nr: blatt.nr, schueler: teil === 'schueler', lehrer: teil === 'lehrer' }} />)
      writeFileSync(datei, buf)
      auftraege.push({ datei, blatt, sprache, teil })
    }
  }
}

// Seiten zählen und leere Seiten finden (Text ohne Fußzeile „CDSE Toolbox … Seite x / y“ und
// ohne Urheber-Vermerk „© …“); je Seite außerdem, welcher Vermerk darauf steht
const py = `
import json, sys, pymupdf
auftrag = json.load(open(sys.argv[1]))
out = {}
for f in auftrag['dateien']:
    d = pymupdf.open(f)
    seiten = []
    for p in d:
        t = p.get_text()
        zeilen = [z for z in t.splitlines() if z.strip() and 'CDSE Toolbox' not in z and not z.strip().startswith(('Seite ', 'Page ', '©'))]
        vermerk = [k for k, v in auftrag['vermerk'].items() if v in t]
        seiten.append({'inhalt': len(''.join(zeilen)) + len(p.get_images()) * 50 + len(p.get_drawings()), 'vermerk': vermerk[0] if vermerk else None})
    out[f] = seiten
print(json.dumps(out))
`
const listeDatei = join(tmp, 'liste.json')
writeFileSync(listeDatei, JSON.stringify({ dateien: auftraege.map((a) => a.datei), vermerk: URHEBER }))
const ergebnis = JSON.parse(execFileSync('python3', ['-c', py, listeDatei], { maxBuffer: 64 * 1024 * 1024 }).toString()) as Record<string, { inhalt: number; vermerk: Sprache | null }[]>

let fehler = 0
for (const a of auftraege) {
  const seiten = ergebnis[a.datei] ?? []
  const wo = `${a.blatt.nr} ${a.blatt.id} ${a.sprache.toUpperCase()} ${a.teil === 'lehrer' ? 'Lehrerseite' : 'Schülerteil'}`
  const max = a.teil === 'lehrer' ? 1 : a.blatt.stufen.every((s) => s === 'C1' || s === 'C2') ? 1 : 2
  const probleme: string[] = []
  if (seiten.length > max) probleme.push(`${seiten.length} Seiten (erlaubt: ${max})`)
  seiten.forEach(({ inhalt, vermerk }, i) => {
    if (inhalt < 40) probleme.push(`Seite ${i + 1} ist (fast) leer`)
    if (vermerk !== a.sprache) probleme.push(`Seite ${i + 1}: ${vermerk ? `Urheber-Vermerk ${vermerk.toUpperCase()} statt ${a.sprache.toUpperCase()}` : 'ohne Urheber-Vermerk'}`)
  })
  if (probleme.length) {
    fehler++
    console.log(`✗ ${wo}: ${probleme.join(' · ')}`)
  }
}
rmSync(tmp, { recursive: true, force: true })
console.log(`\n${liste.length} Blätter, ${auftraege.length} PDF-Teile geprüft – ${fehler} mit Problemen`)
process.exit(fehler ? 1 : 0)
