// Übernimmt Entwürfe (src/data/foerderfach/entwurf/<id>.json) in die Daten des Förderfachs:
// Einheiten nach einheiten-<klasse>.json, ihre Blätter nach blaetter-<klasse>.json – vorhandene mit
// gleicher Id werden ersetzt, alles in der Reihenfolge des Jahresplans.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-uebernehmen.ts [--nur=7e] [--loeschen] [--ausgabe=annexe]
// Vorher prüfen: npm run foerderfach:pruefen. --nur=7e: nur die Entwürfe dieser Klassenstufe (ff7-…).
// Mit --loeschen werden die übernommenen Entwürfe entfernt.
// --ausgabe=annexe: Entwürfe aus src/data/foerderfach/annexe/entwurf (a7-…) in die Dateien in src/data/foerderfach/annexe;
// fehlende Dateien werden angelegt, ohne Plan bleibt die Reihenfolge der Entwürfe (siehe scripts/foerderfach-ausgabe.ts).
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { klasseVonId, waehleAusgabeAus } from './foerderfach-ausgabe'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, Jahresplan, Klasse } from '../src/foerderfach/typen'

const wahl = waehleAusgabeAus(process.argv.slice(2))
const DATEN = wahl.ordner
const ENTWURF = wahl.entwurf
const KLASSEN: Klasse[] = ['7e', '6e', '5e']

const lies = <T>(datei: string): T => JSON.parse(readFileSync(datei, 'utf8')) as T
/** Die Ausgabe annexe legt fehlende Dateien an: Sie gelten bis dahin als leer. */
const liesOder = <T>(datei: string, leer: T): T => (wahl.annexe && !existsSync(datei) ? leer : lies<T>(datei))
const schreib = (datei: string, x: unknown) => writeFileSync(datei, JSON.stringify(x, null, 2) + '\n')

const nur = process.argv.find((a) => a.startsWith('--nur='))?.slice(6) as Klasse | undefined
const dateien = existsSync(ENTWURF)
  ? readdirSync(ENTWURF)
      .filter((d) => d.endsWith('.json') && (!nur || klasseVonId(wahl, d) === nur))
      .sort()
  : []
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

for (const klasse of KLASSEN.filter((k) => !nur || k === nur)) {
  const plan = liesOder<Jahresplan | undefined>(join(DATEN, `plan-${klasse}.json`), undefined)
  const reihe = new Map((plan?.einheiten ?? []).map((e, i) => [e.id, i]))
  // Einheiten
  const einheitenDatei = join(DATEN, `einheiten-${klasse}.json`)
  const alt = liesOder<EinheitenDatei>(einheitenDatei, { einheiten: [] }).einheiten
  const neu = neueEinheiten.filter((e) => e.klasse === klasse)
  const einheiten = [...alt.filter((e) => !neu.some((n) => n.id === e.id)), ...neu].sort((a, b) => (reihe.get(a.id) ?? 99) - (reihe.get(b.id) ?? 99))
  schreib(einheitenDatei, { einheiten })
  // Blätter: in der Reihenfolge, in der sie im Jahr zuerst gebraucht werden
  const blattDatei = join(DATEN, `blaetter-${klasse}.json`)
  const altB = liesOder<Blatt[]>(blattDatei, [])
  const neuB = neueBlaetter.filter((b) => klasseVonId(wahl, b.id) === klasse)
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
