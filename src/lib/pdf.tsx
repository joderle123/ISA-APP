import { pdf } from '@react-pdf/renderer'
import { MaterialDocument, WorksheetDocument } from '../pdf/MaterialPdf'
import type { Material } from '../types/material'
import { slug } from './slug'

/** Render a material to a PDF Blob entirely in the browser (no server, no API). */
export async function materialToBlob(material: Material): Promise<Blob> {
  return pdf(<MaterialDocument material={material} />).toBlob()
}

function saveBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Später freigeben – manche Browser lesen die Datei erst nach dem Klick.
  window.setTimeout(() => URL.revokeObjectURL(url), 30000)
}

/** Generate and download the material's PDF (Deckblatt, Ablauf, ggf. Arbeitsblatt).
 *  Returns the file name. */
export async function downloadMaterialPdf(material: Material): Promise<string> {
  const fileName = `ISA-Material_${slug(material.title)}.pdf`
  saveBlob(await materialToBlob(material), fileName)
  return fileName
}

/** Only the printable student worksheet (one page per copy — handy for
 *  printing a class set). Returns the file name. */
export async function downloadWorksheetPdf(material: Material): Promise<string> {
  if (!material.worksheet) throw new Error('Dieses Material hat kein Arbeitsblatt.')
  const fileName = `ISA-Arbeitsblatt_${slug(material.title)}.pdf`
  saveBlob(await pdf(<WorksheetDocument material={material} />).toBlob(), fileName)
  return fileName
}
