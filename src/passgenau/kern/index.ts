// Passgenau – Schnittstelle Kern → Oberfläche (BAUPLAN.md). Genau diese Exporte; dazu drei additive:
// `aufloesen` (stabile Ids, T-M10), `pdfSitzungMitTeilen` (Lage der Teile für die antippbare Vorschau, T-M8) und
// `vorlageZurueckgezogen` (Rückruf von Vorlagen-Texten, E-M9).
import type { Plan, Profil, Sprache } from '../typen'
import type { Katalog } from './katalog'
import { druckFolge, druckSitzung } from './druck'
import { loadPdfModule } from '../../lib/loadPdf'

export type { Katalog } from './katalog'
export type { Vorlieben } from './vorlieben'
export type { Verlauf } from './planer'

export { ladeKatalog, eintrag, textVon, aufloesen, artName, setzeTextModus } from './katalog'
export { ohneKindProfil, planen, sitzungNeu } from './planer'
export { alternativen, ersetzen, suchen } from './alternativen'
export { kinderblatt } from './blatt'
export { gruppenProfil, gruppenRollen, mitgliedProfil } from './gruppe'
export { seitenFuellung } from './seiten'
export { ereignis } from './ereignis'
export { rueckmelden, gelernt, zuruecksetzen } from './vorlieben'
export { notizText, schrittTitel, BEOBACHTUNG_CHIPS } from './notiz'
export { fuerTeam, uebernehmen, vorlageZurueckgezogen } from './team'
export { GEWICHTE_V1 } from './regeln'

/** PDF einer Sitzung: Planblatt (+ Blatt des Kindes, + Karten). Das PDF-Modul wird erst hier nachgeladen. */
export async function pdfSitzung(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten: boolean }): Promise<Blob> {
  return (await pdfSitzungMitTeilen(k, p, plan, nr, opt)).blob
}

/** Wie pdfSitzung, dazu je Teil (Plan-Zeile `pg-teil:<nr>:schritt:<i>`, Blatt-Teil `pg-teil:<nr>:blatt:<i>`) Seite und Rechteck in pt. */
export async function pdfSitzungMitTeilen(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten: boolean }) {
  const daten = druckSitzung(k, p, plan, nr, opt)
  const m = await loadPdfModule()
  return m.passgenauPdf({ sitzung: daten })
}

/** Mappe einer Folge: Deckblatt (Bogen, Material), je Sitzung Planblatt und Blatt. */
export async function pdfFolge(k: Katalog, p: Profil, plan: Plan, opt: { sprache: Sprache; warum: boolean }): Promise<Blob> {
  const daten = druckFolge(k, p, plan, opt)
  const m = await loadPdfModule()
  return (await m.passgenauPdf({ folge: daten })).blob
}
