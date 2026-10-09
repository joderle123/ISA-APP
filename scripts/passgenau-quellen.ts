// Passgenau – Quellen für Node-Skripte: dieselbe Struktur wie src/passgenau/quellen.ts, aber direkt aus den
// JSON-Dateien gelesen (kein import.meta.glob). Ungefiltert, auch die Skills-Blätter.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit as KursEinheit } from '../src/kurs/typen'
import { quellenAus, type CrewKatalog, type FfEinheit, type Quellen } from '../src/passgenau/quellen'
import { allMaterials } from '../src/data/materials'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const json = <T,>(p: string): T => JSON.parse(readFileSync(p, 'utf8')) as T

export function ladeQuellenNode(root = ROOT): Quellen {
  const blattOrdner = join(root, 'src/data/blaetter')
  const blattDateien: Record<string, Blatt[]> = {}
  for (const d of readdirSync(blattOrdner).sort()) if (d.endsWith('.json')) blattDateien[d] = json<Blatt[]>(join(blattOrdner, d))
  const kursOrdner = join(root, 'src/data/kurs')
  const kurs: KursEinheit[] = []
  for (const d of readdirSync(kursOrdner).sort()) if (d.endsWith('.json')) kurs.push(...(json<{ einheiten?: KursEinheit[] }>(join(kursOrdner, d)).einheiten ?? []))
  const ff = json<{ einheiten: FfEinheit[] }>(join(root, 'src/data/foerderfach/einheiten-7e.json')).einheiten
  const ffA = json<{ einheiten: FfEinheit[] }>(join(root, 'src/data/foerderfach/annexe/einheiten-7e.json')).einheiten
  const inhaltOrdner = join(root, 'src/data/passgenau/inhalte')
  const inhalte = existsSync(inhaltOrdner)
    ? readdirSync(inhaltOrdner)
        .filter((d) => d.endsWith('.json'))
        .sort()
        .map((d) => ({ datei: d, daten: json<unknown>(join(inhaltOrdner, d)) }))
    : []
  return quellenAus({
    blattDateien,
    kurs,
    foerderfach: [...ff, ...ffA.map((e) => ({ ...e, annexe: true }))],
    materialien: allMaterials,
    crew: json<CrewKatalog>(join(root, 'src/data/passgenau/crew.json')),
    inhalte,
  })
}
