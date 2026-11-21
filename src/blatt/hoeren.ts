// Vorlesen per QR-Code (Toolbox-Umbau 21.11.): Zu jeder Geschichte eines Arbeitsblatts gibt es eine Hördatei (Piper-Stimme),
// wie in den Modulheften. Der QR-Code führt auf die Abspiel-Seite h/ (GitHub Pages) mit ?<code>.
// Welche Geschichte welchen Code hat, steht in hoeren.json – erzeugt von tools/hefte/toolbox-spuren.ts, nur für Hördateien,
// die es wirklich gibt. Ein Blatt ohne Eintrag zeigt keinen QR-Code.
import type { Baustein, Sprache } from './typen'
import HOEREN from './hoeren.json'

export const HOER_BASIS = 'https://joderle123.github.io/ISA-APP/h/'

type Liste = Record<string, Partial<Record<Sprache, Record<string, string>>>>

/** Pfad eines Bausteins im Blatt: „3“ (oben), „5l1“ / „5r0“ (in Spalten links/rechts). */
export function bausteinPfade(liste: Baustein[]): [Baustein, string][] {
  const aus: [Baustein, string][] = []
  liste.forEach((b, i) => {
    aus.push([b, String(i)])
    if (b.art === 'spalten') {
      b.links.forEach((x, j) => aus.push([x, `${i}l${j}`]))
      b.rechts.forEach((x, j) => aus.push([x, `${i}r${j}`]))
    }
  })
  return aus
}

/** Hör-Codes der Bausteine eines Blatts (leer, wenn es keine Hördateien gibt). */
export function hoerCodes(blattId: string, sprache: Sprache, liste: Baustein[]): Map<Baustein, string> {
  const eintrag = (HOEREN as Liste)[blattId]?.[sprache]
  if (!eintrag) return new Map()
  return new Map(bausteinPfade(liste).flatMap(([b, p]) => (eintrag[p] ? [[b, eintrag[p]] as const] : [])))
}
