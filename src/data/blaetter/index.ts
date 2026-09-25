// Alle Arbeitsblätter (src/data/blaetter/*.json), nummeriert.
import type { Blatt, NummeriertesBlatt } from '../../blatt/typen'
import { nummerieren } from '../../blatt/nummern'

const dateien = import.meta.glob<Blatt[]>('./*.json', { eager: true, import: 'default' })

export const alleBlaetter: NummeriertesBlatt[] = nummerieren(dateien)
export const blattById = new Map(alleBlaetter.map((b) => [b.id, b]))
