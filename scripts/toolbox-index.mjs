// Schreibt offline/toolbox-index.js – eine kompakte Liste aller Materialien der
// Toolbox für den CDSE Hub (zeigt damit „passende Materialien“ zu den ELDiB-Zielen
// eines Kindes an und verlinkt per ISA-App.html#material=<id>).
//
// Aufruf: npm run index   (läuft am Ende von `npm run build` automatisch mit)
//
// Format (siehe offline/README.md):
//   window.CDSE_TOOLBOX_INDEX = { stand: 'YYYY-MM-DD', materialien: [
//     { id, titel, typ, alter, themen, eldib, kurz, ab?, ki? }, … ] };
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { allMaterials } from '../src/data/materials/index.ts'
import { materialTypeById, themeLabel } from '../src/data/taxonomy.ts'
import { firstSentence } from '../src/lib/text.ts'

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

const js =
  '/* Toolbox-Index für den CDSE Hub – automatisch erzeugt von scripts/toolbox-index.mjs\n' +
  '   (npm run build / npm run index). Nicht von Hand bearbeiten. Format: offline/README.md */\n' +
  `window.CDSE_TOOLBOX_INDEX = {"stand":${JSON.stringify(stand)},"materialien":[\n` +
  materialien.map((m) => JSON.stringify(m)).join(',\n') +
  '\n]};\n'

writeFileSync(OUT, js)
console.log(`offline/toolbox-index.js: ${materialien.length} Materialien, ${(js.length / 1024).toFixed(0)} KB, Stand ${stand}`)
