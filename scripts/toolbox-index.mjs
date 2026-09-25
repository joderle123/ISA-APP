// Schreibt offline/toolbox-index.js – eine kompakte Liste aller Materialien der
// Toolbox für den CDSE Hub (zeigt damit „passende Materialien“ zu den ELDiB-Zielen
// eines Kindes an und verlinkt per ISA-App.html#material=<id>).
//
// Aufruf: npm run index   (läuft am Ende von `npm run build` automatisch mit)
//
// Format (siehe offline/README.md):
//   window.CDSE_TOOLBOX_INDEX = { stand: 'YYYY-MM-DD', materialien: [
//     { id, titel, typ, alter, themen, eldib, kurz, ab?, ki? }, … ],
//     blaetter: [ { id, nr, titel, bereich, thema, stufen, eldib, kurz, fr? }, … ] };
// Arbeitsblätter werden per ISA-App.html#blatt=<id> verlinkt.
import { writeFileSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { allMaterials } from '../src/data/materials/index.ts'
import { materialTypeById, themeLabel } from '../src/data/taxonomy.ts'
import { firstSentence } from '../src/lib/text.ts'
import { nummerieren } from '../src/blatt/nummern.ts'
import { bereichById, themaLabel } from '../src/blatt/katalog.ts'

const OUT = fileURLToPath(new URL('../offline/toolbox-index.js', import.meta.url))

const d = new Date()
const pad = (n) => String(n).padStart(2, '0')
const stand = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const materialien = allMaterials.map((m) => {
  const e = {
    id: m.id,
    titel: m.title,
    typ: m.type.map((t) => materialTypeById.get(t)?.labelDe ?? t),
    alter: m.ageLevels,
    themen: m.themes.map(themeLabel),
    eldib: m.eldibGoals,
    kurz: firstSentence(m.shortDescription, 160),
  }
  if (m.worksheet) e.ab = 1 // hat ein druckbares Arbeitsblatt
  if (m.source === 'generated') e.ki = 1 // KI-Entwurf – vor dem Einsatz prüfen
  return e
})

const ids = new Set(materialien.map((m) => m.id))
if (ids.size !== materialien.length) throw new Error('Doppelte Material-IDs im Index')

// Arbeitsblätter (Toolbox v2)
const ORDNER = fileURLToPath(new URL('../src/data/blaetter/', import.meta.url))
const dateien = {}
for (const d of readdirSync(ORDNER).sort()) if (d.endsWith('.json')) dateien['./' + d] = JSON.parse(readFileSync(ORDNER + d, 'utf8'))
const blaetter = nummerieren(dateien).map((b) => {
  const e = {
    id: b.id,
    nr: b.nr,
    titel: b.de.titel,
    bereich: bereichById.get(b.bereich)?.de ?? b.bereich,
    thema: themaLabel(b.bereich, b.thema),
    stufen: b.stufen,
    eldib: b.eldib,
    kurz: firstSentence(b.de.untertitel || b.de.lehrer.ziel, 160),
  }
  if (b.fr) e.fr = 1
  return e
})

const js =
  '/* Toolbox-Index für den CDSE Hub – automatisch erzeugt von scripts/toolbox-index.mjs\n' +
  '   (npm run build / npm run index). Nicht von Hand bearbeiten. Format: offline/README.md */\n' +
  `window.CDSE_TOOLBOX_INDEX = {"stand":${JSON.stringify(stand)},"materialien":[\n` +
  materialien.map((m) => JSON.stringify(m)).join(',\n') +
  '\n],"blaetter":[\n' +
  blaetter.map((m) => JSON.stringify(m)).join(',\n') +
  '\n]};\n'

writeFileSync(OUT, js)
console.log(`offline/toolbox-index.js: ${materialien.length} Materialien, ${blaetter.length} Arbeitsblätter, ${(js.length / 1024).toFixed(0)} KB, Stand ${stand}`)
