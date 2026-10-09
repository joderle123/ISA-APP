// Passgenau – Daten, die nur Passgenau braucht: Katalog (bausteine.json, schritte.json), ELDiB-Bank, CREW-Spiele, die
// neuen Inhalte (inhalte/*.json) und die Einheiten des Förderfachs (7e und Annexe) (nur als Lieferant einzelner Schritte). Geladen erst beim Öffnen von Passgenau. Im Build ersetzt vite.config.ts diese Datei
// durch EINEN gzip-komprimierten Block, der erst beim ersten Aufruf von ladeDaten() entpackt wird – die Toolbox startet
// dadurch nicht langsamer.

export interface PassgenauDaten {
  bausteine: unknown
  schritte: unknown
  eldib: unknown
  crew: unknown
  /** src/data/foerderfach/einheiten-7e.json und annexe/einheiten-7e.json */
  ff: unknown
  ffAnnexe: unknown
  /** inhalte/*.json, nach Dateiname sortiert */
  inhalte: { datei: string; daten: unknown }[]
}

let laden: Promise<PassgenauDaten> | null = null

export function ladeDaten(): Promise<PassgenauDaten> {
  laden ??= (async () => {
    const INHALT = import.meta.glob<unknown>('../data/passgenau/inhalte/*.json', { import: 'default' })
    const [b, s, e, c, ff, ffA, inhalte] = await Promise.all([
      import('../data/passgenau/bausteine.json'),
      import('../data/passgenau/schritte.json'),
      import('../data/passgenau/eldib.json'),
      import('../data/passgenau/crew.json'),
      import('../data/foerderfach/einheiten-7e.json'),
      import('../data/foerderfach/annexe/einheiten-7e.json'),
      Promise.all(Object.entries(INHALT).map(async ([p, lade]) => ({ datei: p.split('/').pop() ?? p, daten: await lade() }))),
    ])
    return { bausteine: b.default, schritte: s.default, eldib: e.default, crew: c.default, ff: ff.default, ffAnnexe: ffA.default, inhalte: inhalte.sort((x, y) => x.datei.localeCompare(y.datei)) }
  })()
  laden.catch(() => {
    laden = null
  })
  return laden
}
