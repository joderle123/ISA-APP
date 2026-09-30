// Übernimmt Entwürfe (src/data/foerderfach/entwurf/<id>.json) in die Daten des Förderfachs:
// Einheiten nach einheiten-<klasse>.json, ihre Blätter nach blaetter-<klasse>.json – vorhandene mit
// gleicher Id werden ersetzt, alles in der Reihenfolge des Jahresplans.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-uebernehmen.ts [--loeschen]
// Vorher prüfen: npm run foerderfach:pruefen. Mit --loeschen werden die übernommenen Entwürfe entfernt.
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, Jahresplan, Klasse } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATEN = join(ROOT, 'src/data/foerderfach')
const ENTWURF = join(DATEN, 'entwurf')
const KLASSEN: Klasse[] = ['7e', '6e', '5e']
const KLASSE: Record<string, Klasse> = { ff7: '7e', ff6: '6e', ff5: '5e' }

const lies = <T,>(datei: string): T => JSON.parse(readFileSync(datei, 'utf8')) as T
const schreib = (datei: string, x: unknown) => writeFileSync(datei, JSON.stringify(x, null, 2) + '\n')

const dateien = existsSync(ENTWURF) ? readdirSync(ENTWURF).filter((d) => d.endsWith('.json')).sort() : []
if (!dateien.length) {
  console.log('Keine Entwürfe.')
  process.exit(0)
}
const neueEinheiten: Einheit[] = []
const neueBlaetter: Blatt[] = []
for (const d of dateien) {
  const x = lies<EinheitenDatei>(join(ENTWURF, d))
  neueEinheiten.push(...x.einheiten)
  neueBlaetter.push(...(x.blaetter ?? []))
}

for (const klasse of KLASSEN) {
  const plan = lies<Jahresplan>(join(DATEN, `plan-${klasse}.json`))
  const reihe = new Map(plan.einheiten.map((e, i) => [e.id, i]))
  // Einheiten
  const einheitenDatei = join(DATEN, `einheiten-${klasse}.json`)
  const alt = lies<EinheitenDatei>(einheitenDatei).einheiten
  const neu = neueEinheiten.filter((e) => e.klasse === klasse)
  const einheiten = [...alt.filter((e) => !neu.some((n) => n.id === e.id)), ...neu].sort((a, b) => (reihe.get(a.id) ?? 99) - (reihe.get(b.id) ?? 99))
  schreib(einheitenDatei, { einheiten })
  // Blätter: in der Reihenfolge, in der sie im Jahr zuerst gebraucht werden
  const blattDatei = join(DATEN, `blaetter-${klasse}.json`)
  const altB = lies<Blatt[]>(blattDatei)
  const neuB = neueBlaetter.filter((b) => KLASSE[b.id.slice(0, 3)] === klasse)
  const blaetter = [...altB.filter((b) => !neuB.some((n) => n.id === b.id)), ...neuB]
  const erste = (id: string) => einheiten.findIndex((e) => e.blaetter.includes(id) || (e.vorlagen ?? []).includes(id))
  blaetter.sort((a, b) => (erste(a.id) < 0 ? 999 : erste(a.id)) - (erste(b.id) < 0 ? 999 : erste(b.id)))
  schreib(blattDatei, blaetter)
  console.log(`${klasse}: ${neu.length} Einheit(en) übernommen (jetzt ${einheiten.length}), ${neuB.length} Blatt/Blätter (jetzt ${blaetter.length})`)
}

if (process.argv.includes('--loeschen')) {
  for (const d of dateien) rmSync(join(ENTWURF, d))
  console.log(`${dateien.length} Entwurf/Entwürfe entfernt.`)
}
