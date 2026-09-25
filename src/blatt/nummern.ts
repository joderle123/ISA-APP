// Blätter nummerieren: Bereichskürzel + laufende Nummer in Dateireihenfolge
// (gefuehle.json, dann gefuehle-2.json …). Neue Blätter immer hinten anfügen,
// damit gedruckte Nummern gültig bleiben.
import type { Blatt, NummeriertesBlatt } from './typen'
import { BEREICHE } from './katalog'

function teil(datei: string): { name: string; folge: number } {
  const name = datei.split('/').pop()!.replace(/\.json$/, '')
  const m = /^(.*?)-(\d+)$/.exec(name)
  return m ? { name: m[1], folge: Number(m[2]) } : { name, folge: 1 }
}

export function nummerieren(dateien: Record<string, Blatt[]>): NummeriertesBlatt[] {
  const out: NummeriertesBlatt[] = []
  for (const b of BEREICHE) {
    const namen = Object.keys(dateien)
      .filter((d) => teil(d).name === b.id)
      .sort((x, y) => teil(x).folge - teil(y).folge)
    let i = 0
    for (const d of namen) for (const blatt of dateien[d] ?? []) out.push({ ...blatt, nr: `${b.kuerzel}-${String(++i).padStart(2, '0')}` })
  }
  return out
}

export function bereichAusDatei(datei: string): string {
  return teil(datei).name
}
