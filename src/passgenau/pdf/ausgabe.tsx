// Passgenau – PDF im Browser (wird über src/lib/pdf.tsx mit dem PDF-Modul nachgeladen, nie im Hauptbündel).
import { pdf } from '@react-pdf/renderer'
import { registriereSchriften } from '../../blatt/pdf/stil'
import kinderRegular from '../../assets/fonts/pdf/Kinderschrift-Regular.ttf?url'
import kinderBold from '../../assets/fonts/pdf/Kinderschrift-Bold.ttf?url'
import interRegular from '../../assets/fonts/pdf/Inter-Regular.ttf?url'
import interSemiBold from '../../assets/fonts/pdf/Inter-SemiBold.ttf?url'
import manropeBold from '../../assets/fonts/pdf/Manrope-Bold.ttf?url'
import manropeExtraBold from '../../assets/fonts/pdf/Manrope-ExtraBold.ttf?url'
import type { DruckFolge, DruckSitzung } from '../kern/druck'
import { FolgeDokument, SitzungDokument, teilPositionen, type TeilPosition } from './PlanDokument'

const SCHRIFTEN: Record<string, string> = {
  'Kinderschrift-Regular.ttf': kinderRegular,
  'Kinderschrift-Bold.ttf': kinderBold,
  'Inter-Regular.ttf': interRegular,
  'Inter-SemiBold.ttf': interSemiBold,
  'Manrope-Bold.ttf': manropeBold,
  'Manrope-ExtraBold.ttf': manropeExtraBold,
}

export interface PassgenauDruck {
  sitzung?: DruckSitzung
  folge?: DruckFolge
}

/** PDF einer Sitzung oder einer Folge; dazu die Lage der Teile (Plan-Zeilen, Blatt-Teile) für die antippbare Vorschau. */
export async function passgenauPdf(daten: PassgenauDruck): Promise<{ blob: Blob; teile: TeilPosition[] }> {
  registriereSchriften((d) => SCHRIFTEN[d])
  let teile: TeilPosition[] = []
  const merke = (x: unknown) => {
    const l = (x as { _INTERNAL__LAYOUT__DATA_?: unknown })?._INTERNAL__LAYOUT__DATA_
    if (l) teile = teilPositionen(l)
  }
  const doc = daten.folge ? <FolgeDokument f={daten.folge} /> : <SitzungDokument d={daten.sitzung!} onRender={merke} />
  const blob = await pdf(doc).toBlob()
  return { blob, teile }
}
