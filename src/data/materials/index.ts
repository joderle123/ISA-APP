import type { Material } from '../../types/material'
import { originals } from './originals'
import { digitized } from './digitized'
import { generated } from './generated'

/** Full library = digitised originals (seed + reference PDFs) + generated. */
export const allMaterials: Material[] = [...originals, ...digitized, ...generated]
