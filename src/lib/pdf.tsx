import { pdf } from '@react-pdf/renderer'
import { MaterialDocument, WorksheetDocument } from '../pdf/MaterialPdf'
import type { Material } from '../types/material'
import { slug } from './slug'
import { BlattDokument, MappeDokument, type BlattOptionen } from '../blatt/pdf/BlattDokument'
import { registriereSchriften } from '../blatt/pdf/stil'
import type { Blatt, Sprache } from '../blatt/typen'
import kinderRegular from '../assets/fonts/pdf/Kinderschrift-Regular.ttf?url'
import kinderBold from '../assets/fonts/pdf/Kinderschrift-Bold.ttf?url'
import interRegular from '../assets/fonts/pdf/Inter-Regular.ttf?url'
import interSemiBold from '../assets/fonts/pdf/Inter-SemiBold.ttf?url'
import manropeBold from '../assets/fonts/pdf/Manrope-Bold.ttf?url'
import manropeExtraBold from '../assets/fonts/pdf/Manrope-ExtraBold.ttf?url'

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

// --- Arbeitsblätter (Toolbox v2) ----------------------------------------------

const SCHRIFT_DATEIEN: Record<string, string> = {
  'Kinderschrift-Regular.ttf': kinderRegular,
  'Kinderschrift-Bold.ttf': kinderBold,
  'Inter-Regular.ttf': interRegular,
  'Inter-SemiBold.ttf': interSemiBold,
  'Manrope-Bold.ttf': manropeBold,
  'Manrope-ExtraBold.ttf': manropeExtraBold,
}

function schriften() {
  registriereSchriften((d) => SCHRIFT_DATEIEN[d])
}

export function blattDateiname(blatt: Blatt, opt: BlattOptionen = {}): string {
  const teil = opt.schueler === false ? '_Lehrerseite' : opt.lehrer === false ? '' : '_mit-Lehrerseite'
  return `${opt.nr ? opt.nr + '_' : ''}${slug(blatt.de.titel)}${opt.sprache === 'fr' ? '_FR' : ''}${teil}.pdf`
}

/** Ein Arbeitsblatt als PDF-Blob (für Vorschau und Download). */
export async function blattBlob(blatt: Blatt, opt: BlattOptionen = {}): Promise<Blob> {
  schriften()
  return pdf(<BlattDokument blatt={blatt} opt={opt} />).toBlob()
}

export async function downloadBlatt(blatt: Blatt, opt: BlattOptionen = {}): Promise<string> {
  const name = blattDateiname(blatt, opt)
  saveBlob(await blattBlob(blatt, opt), name)
  return name
}

/** Mehrere Blätter als eine Mappe (Sprache je Blatt, sonst aus opt). Dateiname wie bei einem Blatt:
 *  _FR (_DE-FR, wenn gemischt) und _mit-Lehrerseiten. */
export async function downloadMappe(blaetter: { blatt: Blatt; nr?: string; sprache?: Sprache }[], titel: string, opt: BlattOptionen = {}): Promise<string> {
  schriften()
  const sprachen = new Set(blaetter.map((x) => x.sprache ?? opt.sprache ?? 'de'))
  const sp = sprachen.has('fr') ? (sprachen.size > 1 ? '_DE-FR' : '_FR') : ''
  const teil = opt.schueler === false ? '_Lehrerseiten' : opt.lehrer === false ? '' : '_mit-Lehrerseiten'
  const name = `Mappe_${slug(titel) || 'Arbeitsblaetter'}${sp}${teil}.pdf`
  saveBlob(await pdf(<MappeDokument blaetter={blaetter} titel={titel} opt={opt} />).toBlob(), name)
  return name
}
