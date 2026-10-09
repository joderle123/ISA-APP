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

/** Alle Quellen (einmal geladen, danach aus dem Speicher). */
export function ladeQuellen(): Promise<Quellen> {
  laden ??= (async () => {
    // die Globs stehen hier (nicht oben im Modul), damit Node-Skripte die Typen und quellenAus nutzen können
    const BLATT_DATEIEN = import.meta.glob<Blatt[]>('../data/blaetter/*.json', { import: 'default' })
    const KURS_DATEIEN = import.meta.glob<{ einheiten?: KursEinheit[] }>('../data/kurs/*.json', { import: 'default' })
    const INHALT_DATEIEN = import.meta.glob<unknown>('../data/passgenau/inhalte/*.json', { import: 'default' })
    const name = (pfad: string) => pfad.split('/').pop() ?? pfad
    const [blattDateien, kursDateien, inhalte, ff, ffAnnexe, materialien, crew] = await Promise.all([
      Promise.all(Object.entries(BLATT_DATEIEN).map(async ([p, lade]) => [name(p), await lade()] as const)).then((l) => Object.fromEntries(l)),
      Promise.all(Object.values(KURS_DATEIEN).map((lade) => lade())),
      Promise.all(Object.entries(INHALT_DATEIEN).map(async ([p, lade]) => ({ datei: name(p), daten: await lade() }))),
      import('../data/foerderfach/einheiten-7e.json').then((m) => (m.default as unknown as { einheiten: FfEinheit[] }).einheiten),
      import('../data/foerderfach/annexe/einheiten-7e.json').then((m) => (m.default as unknown as { einheiten: FfEinheit[] }).einheiten),
      import('../data/materials').then((m) => m.allMaterials),
      import('../data/passgenau/crew.json').then((m) => m.default as unknown as CrewKatalog),
    ])
    return quellenAus({
      blattDateien,
      kurs: kursDateien.flatMap((d) => d.einheiten ?? []),
      foerderfach: [...ff, ...ffAnnexe.map((e) => ({ ...e, annexe: true }))],
      materialien,
      crew,
      inhalte: inhalte.sort((a, b) => a.datei.localeCompare(b.datei)),
    })
  })()
  laden.catch(() => {
    laden = null
  })
  return laden
}
