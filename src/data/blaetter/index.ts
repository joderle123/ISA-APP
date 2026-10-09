// Alle Arbeitsblätter (src/data/blaetter/*.json), nummeriert.
import type { NummeriertesBlatt } from '../../blatt/typen'
import { nummerieren } from '../../blatt/nummern'
import { kursFrei } from '../../lib/nutzer'
import { blattDateien } from './dateien'

// Die Blätter des Skills-Kurses (Bereich skills) nur für die Konten, die den Kurs sehen (kursFrei). Nummern bleiben gleich.
export const alleBlaetter: NummeriertesBlatt[] = nummerieren(blattDateien).filter((b) => kursFrei() || b.bereich !== 'skills')
export const blattById = new Map(alleBlaetter.map((b) => [b.id, b]))
