// Skills-Kurs: alle Dateien in src/data/kurs/*.json zusammenführen
// (jahr<N>.json = Kursjahr und Module, jahr<N>-m<k>.json = Einheiten eines
// Moduls, jahr<N>-joker.json = Joker, grundlagen.json = Grundlagen).
import type { Einheit, KursDatei, Kursjahr, Modul } from '../../kurs/typen'

const dateien = import.meta.glob<KursDatei>('./*.json', { eager: true, import: 'default' })
const alle = Object.values(dateien)

export const kursjahre: Kursjahr[] = alle.flatMap((d) => (d.jahr ? [d.jahr] : [])).sort((a, b) => a.nr - b.nr)
export const alleModule: Modul[] = alle.flatMap((d) => d.module ?? [])
export const alleEinheiten: Einheit[] = alle.flatMap((d) => d.einheiten ?? [])
export const grundlagen = alle.flatMap((d) => d.grundlagen ?? [])

export const modulById = new Map(alleModule.map((m) => [m.id, m]))
export const einheitById = new Map(alleEinheiten.map((e) => [e.id, e]))
export const jahrByNr = new Map(kursjahre.map((j) => [j.nr, j]))

/** Module eines Kursjahres in Kursreihenfolge. */
export function moduleVon(jahr: number): Modul[] {
  return (jahrByNr.get(jahr)?.module ?? []).map((id) => modulById.get(id)).filter((m): m is Modul => !!m)
}

/** Einheiten eines Kursjahres in Kursreihenfolge (ohne Joker). Fehlende Einheiten werden übersprungen. */
export function einheitenVon(jahr: number): Einheit[] {
  return moduleVon(jahr).flatMap((m) => m.einheiten.map((id) => einheitById.get(id)).filter((e): e is Einheit => !!e))
}

/** Geplante Anzahl Einheiten (auch solche, die noch nicht ausgearbeitet sind). */
export function geplanteEinheiten(jahr: number): number {
  return moduleVon(jahr).reduce((n, m) => n + m.einheiten.length, 0)
}

export function jokerVon(jahr: number): Einheit[] {
  return (jahrByNr.get(jahr)?.joker ?? []).map((id) => einheitById.get(id)).filter((e): e is Einheit => !!e)
}
