// Gemeinsames der Förderfach-Skripte: die Ausgabe wählen und ihre Daten laden.
//   --ausgabe=annexe   Skills-Kurs der Annexe (Leitungsheft, nur Deutsch): Die Daten kommen aus
//                      src/data/foerderfach/annexe (Pläne, Einheiten, Blätter, Handbuchtexte, Skill-Karten,
//                      Entwürfe in annexe/entwurf), fehlende Dateien gelten als leer, fehlt „fr“, ist fr = de.
//                      Die Werkzeug-Blätter (src/data/foerderfach/blaetter.json) sind für beide Ausgaben gleich.
//   --daten=<ordner>   nur mit annexe: anderer Datenordner, z. B. zum Testen unter tmp/
// Ohne Option bleibt alles wie bisher (Förderfach für Klassen, Daten aus src/foerderfach/daten.ts).
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as klassen from '../src/foerderfach/daten'
import { KLASSEN, waehleAusgabe } from '../src/foerderfach/fach'
import type { Ausgabe } from '../src/foerderfach/fach'
import type { Blatt } from '../src/blatt/typen'
import type { Einheit, EinheitenDatei, HandbuchDatei, Jahresplan, Klasse, SkillKartenDatei } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATEN = join(ROOT, 'src/data/foerderfach')

export interface AusgabeWahl {
  ausgabe: Ausgabe
  annexe: boolean
  /** Datenordner der Ausgabe (Pläne, Einheiten, Blätter, Handbuch) */
  ordner: string
  /** Entwürfe der Ausgabe */
  entwurf: string
}

/** Liest --ausgabe= und --daten= (Standard: Förderfach für Klassen) und stellt Namen und Titel der PDFs darauf ein. */
export function waehleAusgabeAus(args: string[]): AusgabeWahl {
  const art = args.find((a) => a.startsWith('--ausgabe='))?.slice(10) ?? 'klassen'
  const daten = args.find((a) => a.startsWith('--daten='))?.slice(8)
  if (art !== 'klassen' && art !== 'annexe') {
    console.error(`Unbekannte Ausgabe „${art}“ – klassen oder annexe`)
    process.exit(1)
  }
  if (daten && art !== 'annexe') {
    console.error('--daten gibt es nur mit --ausgabe=annexe')
    process.exit(1)
  }
  waehleAusgabe(art)
  const ordner = art === 'annexe' ? (daten ? resolve(daten) : join(DATEN, 'annexe')) : DATEN
  return { ausgabe: art, annexe: art === 'annexe', ordner, entwurf: join(ordner, 'entwurf') }
}

/** Anfang der Ids einer Klassenstufe: ff7 (Förderfach für Klassen), a7 (Annexe) */
export const idPraefix = (wahl: AusgabeWahl, klasse: Klasse) => `${wahl.annexe ? 'a' : 'ff'}${klasse[0]}`

/** Klassenstufe nach der Id einer Einheit, eines Blatts oder eines Entwurfs: „a7-e01“ → 7e */
export const klasseVonId = (wahl: AusgabeWahl, id: string): Klasse | undefined => KLASSEN.find((k) => id.startsWith(idPraefix(wahl, k)))

/** Nur Deutsch: Wo ein Objekt „de“ hat, aber „fr“ fehlt (Einheit, Blatt, Wortpaar, Plantext, Handbuch, Skill-Karte), wird fr = de gesetzt. */
function frGleichDe<T>(x: T): T {
  if (Array.isArray(x)) x.forEach((y) => frGleichDe(y))
  else if (x && typeof x === 'object') {
    const o = x as Record<string, unknown>
    if (o.de !== undefined && o.fr === undefined) o.fr = o.de
    Object.values(o).forEach((y) => frGleichDe(y))
  }
  return x
}

/** Datei der Ausgabe annexe: Fehlt sie, gilt sie als leer; fehlt „fr“, ist fr = de. */
function liesAnnexe<T>(datei: string, leer: T): T {
  if (!existsSync(datei)) return leer
  try {
    return frGleichDe(JSON.parse(readFileSync(datei, 'utf8')) as T)
  } catch (e) {
    throw new Error(`${datei}: ${(e as Error).message}`)
  }
}

/** Ein Entwurf (<entwurf-ordner>/<id>.json mit { einheiten, blaetter }); in der Ausgabe annexe mit fr = de. Wirft bei ungültigem JSON. */
export function ladeEntwurf(datei: string, wahl: AusgabeWahl): EinheitenDatei {
  const x = JSON.parse(readFileSync(datei, 'utf8')) as EinheitenDatei
  return wahl.annexe ? frGleichDe(x) : x
}

/** Dieselben Angaben wie src/foerderfach/daten.ts – dort fest eingebunden, hier je Ausgabe geladen. */
export interface FachDaten {
  PLAENE: Jahresplan[]
  planVon: (k: Klasse) => Jahresplan | undefined
  EINHEITEN: Einheit[]
  HANDBUCH: HandbuchDatei
  SKILLKARTEN: SkillKartenDatei
  BLAETTER: Blatt[]
  blattById: Map<string, Blatt>
  WERKZEUGE: Record<Klasse, string[]>
  HEFT_VORN: Record<Klasse, string[]>
  VORLAGEN: string[]
}

export function ladeDaten(wahl: AusgabeWahl): FachDaten {
  if (!wahl.annexe) return klassen
  const datei = (name: string) => join(wahl.ordner, name)
  // Pläne gibt es nur für Klassenstufen mit Plandatei; ohne Plan wird die Stufe nicht gesetzt
  const PLAENE = KLASSEN.map((k) => liesAnnexe<Jahresplan | undefined>(datei(`plan-${k}.json`), undefined)).filter((p): p is Jahresplan => !!p)
  const karten = liesAnnexe<Partial<SkillKartenDatei>>(datei('skillkarten.json'), {})
  // Werkzeug-Blätter (für jede Stunde) gelten für beide Ausgaben; dazu kommen die Blätter der Einheiten
  const BLAETTER = [liesAnnexe<Blatt[]>(join(DATEN, 'blaetter.json'), []), ...KLASSEN.map((k) => liesAnnexe<Blatt[]>(datei(`blaetter-${k}.json`), []))].flat()
  return {
    PLAENE,
    planVon: (k) => PLAENE.find((p) => p.klasse === k),
    EINHEITEN: KLASSEN.flatMap((k) => liesAnnexe<EinheitenDatei>(datei(`einheiten-${k}.json`), { einheiten: [] }).einheiten),
    HANDBUCH: liesAnnexe<HandbuchDatei>(datei('handbuch.json'), { de: {}, fr: {} } as HandbuchDatei),
    SKILLKARTEN: { '7e': karten['7e'] ?? [], '6e': karten['6e'] ?? [], '5e': karten['5e'] ?? [] },
    BLAETTER,
    blattById: new Map(BLAETTER.map((b) => [b.id, b])),
    WERKZEUGE: klassen.WERKZEUGE,
    HEFT_VORN: klassen.HEFT_VORN,
    VORLAGEN: klassen.VORLAGEN,
  }
}
