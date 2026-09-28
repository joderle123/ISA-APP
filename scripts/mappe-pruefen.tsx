// Mappen-Prüfung: Jedes Blatt muss in einer Mappe (mehrere Blätter in einer PDF, z. B. „Alle
// Blätter“ einer Kurs-Einheit) genauso aussehen wie als einzelne PDF – gleiche Seiten, gleicher
// Text auf jeder Seite. Früher stand der kleine Folgekopf auch auf der ersten Seite jedes
// weiteren Blatts und schob Inhalt auf eine neue Seite.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/mappe-pruefen.tsx [einheit-id …]
// Ohne Auswahl: alle Kurs-Einheiten mit mindestens zwei Blättern, mit Lehrerseiten.
// Braucht python3 mit PyMuPDF. Fehler → Exit-Code 1.
import { renderToBuffer } from '@react-pdf/renderer'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { BlattDokument, MappeDokument } from '../src/blatt/pdf/BlattDokument'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import type { Blatt } from '../src/blatt/typen'
import { nummerieren } from '../src/blatt/nummern'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const auswahl = process.argv.slice(2).filter((a) => !a.startsWith('--'))

const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
const blattById = new Map(nummerieren(dateien).map((b) => [b.id, b]))

type Einheit = { id: string; blaetter?: string[] }
const kursOrdner = join(ROOT, 'src/data/kurs')
const einheiten: Einheit[] = readdirSync(kursOrdner)
  .filter((d) => d.endsWith('.json'))
  .flatMap((d) => (JSON.parse(readFileSync(join(kursOrdner, d), 'utf8')).einheiten ?? []) as Einheit[])
  .filter((e) => (e.blaetter ?? []).length >= 2 && (!auswahl.length || auswahl.includes(e.id)))

const tmp = mkdtempSync(join(tmpdir(), 'mappe-pruefen-'))
const einzeln = new Map<string, string>()
const mappen: { id: string; datei: string; blaetter: string[] }[] = []
for (const e of einheiten) {
  const liste = (e.blaetter ?? []).map((id) => blattById.get(id)).filter((b): b is Blatt & { nr: string } => !!b)
  for (const b of liste) {
    if (einzeln.has(b.id)) continue
    const datei = join(tmp, `einzeln_${b.id}.pdf`)
    writeFileSync(datei, await renderToBuffer(<BlattDokument blatt={b} opt={{ nr: b.nr }} />))
    einzeln.set(b.id, datei)
  }
  const datei = join(tmp, `mappe_${e.id}.pdf`)
  writeFileSync(datei, await renderToBuffer(<MappeDokument blaetter={liste.map((b) => ({ blatt: b, nr: b.nr }))} titel={e.id} opt={{ lehrer: true }} />))
  mappen.push({ id: e.id, datei, blaetter: liste.map((b) => b.id) })
}

const py = `
import json, sys, pymupdf
auftrag = json.load(open(sys.argv[1]))
def seiten(f):
    return [p.get_text() for p in pymupdf.open(f)]
einzeln = {k: seiten(v) for k, v in auftrag['einzeln'].items()}
out = []
for m in auftrag['mappen']:
    ist = seiten(m['datei'])
    soll = [s for b in m['blaetter'] for s in einzeln[b]]
    fehler = []
    if len(ist) != len(soll):
        fehler.append(f"{len(ist)} Seiten statt {len(soll)}")
    for i, (a, b) in enumerate(zip(ist, soll)):
        if a != b:
            fehler.append(f"Seite {i + 1} weicht vom einzelnen Blatt ab")
            break
    out.append({'id': m['id'], 'fehler': fehler})
print(json.dumps(out))
`
const auftragDatei = join(tmp, 'auftrag.json')
writeFileSync(auftragDatei, JSON.stringify({ einzeln: Object.fromEntries(einzeln), mappen }))
const ergebnis = JSON.parse(execFileSync('python3', ['-c', py, auftragDatei], { maxBuffer: 64 * 1024 * 1024 }).toString()) as { id: string; fehler: string[] }[]
rmSync(tmp, { recursive: true, force: true })

let fehler = 0
for (const r of ergebnis) {
  if (!r.fehler.length) continue
  fehler++
  console.log(`✗ Einheit ${r.id}: ${r.fehler.join(' · ')}`)
}
console.log(`\n${ergebnis.length} Mappen mit ${einzeln.size} Blättern geprüft – ${fehler} mit Abweichungen`)
process.exit(fehler ? 1 : 0)
