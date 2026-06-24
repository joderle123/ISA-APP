import type { Material } from '../../types/material'
import { originals } from './originals'
import { generated } from './generated'

/** Full library = digitised originals + generated materials. */
export const allMaterials: Material[] = [...originals, ...generated]
