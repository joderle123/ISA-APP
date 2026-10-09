// ---------------------------------------------------------------------------
// Passgenau – eigene, UNGEFILTERTE Quellen (Konzept 4.1/4.2).
//
// Passgenau nutzt die Teile des Skills-Kurses für alle Fachkräfte – als einzelne Bausteine, ohne Kursstruktur.
// Deshalb liest es die Blätter selbst (import.meta.glob + nummerieren) und NIE über alleBlaetter/blattById
// (die blenden für Konten ohne kursFrei() die Skills-Blätter aus). Die Nummern (S-xx …) bleiben dieselben.
//
// Alles wird erst beim ersten Planen geladen (dynamische Importe). Für Node-Skripte gibt es dieselbe Struktur aus
// den JSON-Dateien: scripts/passgenau-quellen.ts.
// ---------------------------------------------------------------------------

import type { Blatt, NummeriertesBlatt } from '../blatt/typen'
import { nummerieren } from '../blatt/nummern'
import type { Einheit as KursEinheit } from '../kurs/typen'
import type { EinheitText } from '../foerderfach/typen'
import type { Material } from '../types/material'

/** Einheit des Förderfachs (7e) oder der Annexe-Ausgabe (nur Deutsch). */
export interface FfEinheit {
  id: string
  klasse: string
  dauer: number
  blaetter: string[]
  de: EinheitText
  fr?: EinheitText
  annexe?: boolean
}

/** Ein Spiel aus dem CREW-Spielekatalog (isa-crew, docs/spielekatalog.json). */
export interface CrewSpiel {
  id: string
  name: string
  format: string
  dauer: string
  text: string
  foerdert: string
  einheiten?: string[]
  abschluss?: boolean
  top?: boolean
  aufwand?: string
}

export interface CrewKatalog {
  stand: string
  themen: { name: string; spiele: CrewSpiel[] }[]
}

/** Alles, woraus Passgenau Bausteine und Stundenschritte macht. */
export interface Quellen {
  /** alle Blätter (auch Skills, Spielschule, Mathe), nummeriert wie in der Toolbox */
  blaetter: NummeriertesBlatt[]
  blatt: Map<string, NummeriertesBlatt>
  /** Einheiten des Skills-Kurses – nur als Lieferant einzelner Schritte */
  kurs: KursEinheit[]
  foerderfach: FfEinheit[]
  materialien: Material[]
  crew: CrewKatalog
  /** neue Inhalte (Freude & Beziehung, Rituale …) aus src/data/passgenau/inhalte/*.json – Rohdaten */
  inhalte: { datei: string; daten: unknown }[]
}

/** Aus den Rohdaten die Quellen bauen (gemeinsam für Browser und Node). */
export function quellenAus(roh: {
  blattDateien: Record<string, Blatt[]>
  kurs: KursEinheit[]
  foerderfach: FfEinheit[]
  materialien: Material[]
  crew: CrewKatalog
  inhalte: { datei: string; daten: unknown }[]
}): Quellen {
  const blaetter = nummerieren(roh.blattDateien)
  return {
    blaetter,
    blatt: new Map(blaetter.map((b) => [b.id, b])),
    kurs: roh.kurs,
    foerderfach: roh.foerderfach,
    materialien: roh.materialien,
    crew: roh.crew,
    inhalte: roh.inhalte,
  }
}

// --- Browser: alles lazy, einmal geladen ------------------------------------------------------------------------

let laden: Promise<Quellen> | null = null

/** Alle Quellen (einmal geladen, danach aus dem Speicher). Die Blätter kommen ungefiltert aus src/data/blaetter/dateien.ts
 *  (dieselben Rohdaten, die die Toolbox ohnehin entpackt), die übrigen Passgenau-Daten aus ./daten (komprimiert, erst jetzt). */
export function ladeQuellen(): Promise<Quellen> {
  laden ??= (async () => {
    // die Globs stehen hier (nicht oben im Modul), damit Node-Skripte die Typen und quellenAus nutzen können
    const KURS_DATEIEN = import.meta.glob<{ einheiten?: KursEinheit[] }>('../data/kurs/*.json', { import: 'default' })
    const [blattDateien, kursDateien, daten, materialien] = await Promise.all([
      import('../data/blaetter/dateien').then((m) => m.blattDateien),
      Promise.all(Object.values(KURS_DATEIEN).map((lade) => lade())),
      import('./daten').then((m) => m.ladeDaten()),
      import('../data/materials').then((m) => m.allMaterials),
    ])
    const ff = (daten.ff as { einheiten: FfEinheit[] }).einheiten
    const ffAnnexe = (daten.ffAnnexe as { einheiten: FfEinheit[] }).einheiten
    return quellenAus({
      blattDateien,
      kurs: kursDateien.flatMap((d) => d.einheiten ?? []),
      foerderfach: [...ff, ...ffAnnexe.map((e) => ({ ...e, annexe: true }))],
      materialien,
      crew: daten.crew as CrewKatalog,
      inhalte: daten.inhalte,
    })
  })()
  laden.catch(() => {
    laden = null
  })
  return laden
}
