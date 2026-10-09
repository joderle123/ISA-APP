// Alle Arbeitsblätter (src/data/blaetter/*.json), nummeriert.
import type { Blatt, NummeriertesBlatt } from '../../blatt/typen'
import { nummerieren } from '../../blatt/nummern'
import { kursFrei } from '../../lib/nutzer'

const dateien = import.meta.glob<Blatt[]>('./*.json', { eager: true, import: 'default' })

// Die Blätter des Skills-Kurses (Bereich skills) nur für die Konten, die den Kurs sehen (kursFrei). Nummern bleiben gleich.
export const alleBlaetter: NummeriertesBlatt[] = nummerieren(dateien).filter((b) => kursFrei() || b.bereich !== 'skills')
export const blattById = new Map(alleBlaetter.map((b) => [b.id, b]))
