// Die Mappe: Arbeitsblätter, die man für ein Heft sammelt – mit Titel, Untertitel,
// Reihenfolge und Druck-Optionen. Bleibt nach dem Neuladen (eigener Schlüssel im
// localStorage, Muster wie sprache.ts); ohne Zugriff (gesperrt, privates Fenster)
// gilt sie nur für diese Sitzung. Gespeichert wird nur in diesem Browser; Titel und
// Untertitel sind freie Texte der Fachkraft (der Dialog bittet um keine Namen von Kindern).
import { useSyncExternalStore } from 'react'
import type { Sprache } from '../blatt/typen'
import { istFassung, type Fassung } from '../blatt/variante'

const KEY = 'cdse-toolbox-mappe-v1'

/** Wohin die Seiten für die Lehrperson kommen: gar nicht, gesammelt hinten oder nach jedem Blatt. */
export type LehrerSeiten = 'keine' | 'hinten' | 'nach'

export interface MappeEintrag {
  id: string
  sprache: Sprache
  fassung: Fassung
}

export interface MappeStand {
  titel: string
  /** „Für wen“, frei (z. B. „Gruppe Mittwoch“) */
  untertitel: string
  eintraege: MappeEintrag[]
  lehrer: LehrerSeiten
  /** Deckblatt und Inhaltsverzeichnis voranstellen */
  deckblatt: boolean
}

export const STANDARD_TITEL = 'Meine Mappe'
export const TITEL_MAX = 80
export const UNTERTITEL_MAX = 100
/** Mehr Blätter passen in kein Heft, das man ausdruckt – und der Browser braucht für das PDF sonst sehr lange. */
export const MAPPE_MAX = 100

const LEER: MappeStand = { titel: STANDARD_TITEL, untertitel: '', eintraege: [], lehrer: 'keine', deckblatt: true }

function text(x: unknown, max: number): string | null {
  return typeof x === 'string' ? x.slice(0, max) : null
}

/** Gespeicherten Stand prüfen: nur Bekanntes übernehmen, alles andere weglassen. */
function lesen(): MappeStand {
  try {
    const roh: unknown = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (!roh || typeof roh !== 'object') return LEER
    const r = roh as Record<string, unknown>
    const gesehen = new Set<string>()
    const eintraege: MappeEintrag[] = []
    for (const e of Array.isArray(r.eintraege) ? r.eintraege : []) {
      if (!e || typeof e !== 'object') continue
      const { id, sprache, fassung } = e as Record<string, unknown>
      if (typeof id !== 'string' || !id || gesehen.has(id) || eintraege.length >= MAPPE_MAX) continue
      gesehen.add(id)
      eintraege.push({ id, sprache: sprache === 'fr' ? 'fr' : 'de', fassung: istFassung(fassung) ? fassung : 'standard' })
    }
    return {
      titel: text(r.titel, TITEL_MAX) ?? LEER.titel,
      untertitel: text(r.untertitel, UNTERTITEL_MAX) ?? '',
      eintraege,
      lehrer: r.lehrer === 'hinten' || r.lehrer === 'nach' ? r.lehrer : 'keine',
      deckblatt: r.deckblatt !== false,
    }
  } catch {
    return LEER
  }
}

let aktuell: MappeStand = lesen()
const hoerer = new Set<() => void>()

function aendern(neu: MappeStand): void {
  aktuell = neu
  try {
    // ganz leer und unverändert: nichts aufbewahren
    if (!neu.eintraege.length && neu.titel === LEER.titel && !neu.untertitel && neu.lehrer === LEER.lehrer && neu.deckblatt === LEER.deckblatt) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, JSON.stringify(neu))
  } catch {
    /* nicht speicherbar – gilt dann nur bis zum Neuladen */
  }
  for (const h of hoerer) h()
}

/** Die Mappe; ändert sich nur durch die Funktionen unten (Snapshot bleibt zwischen Änderungen derselbe). */
export function useMappe(): MappeStand {
  return useSyncExternalStore(
    (cb) => {
      hoerer.add(cb)
      // zweiter Tab: Stand von dort übernehmen, damit sich die Tabs nicht gegenseitig überschreiben
      const von = (e: StorageEvent) => {
        if (e.key !== KEY && e.key !== null) return
        aktuell = lesen()
        cb()
      }
      try {
        window.addEventListener('storage', von)
      } catch {
        /* kein window – nichts zu beobachten */
      }
      return () => {
        hoerer.delete(cb)
        try {
          window.removeEventListener('storage', von)
        } catch {
          /* s. o. */
        }
      }
    },
    () => aktuell,
  )
}

export function mappeSetzen(teil: Partial<Pick<MappeStand, 'titel' | 'untertitel' | 'lehrer' | 'deckblatt'>>): void {
  aendern({
    ...aktuell,
    ...teil,
    titel: teil.titel !== undefined ? teil.titel.slice(0, TITEL_MAX) : aktuell.titel,
    untertitel: teil.untertitel !== undefined ? teil.untertitel.slice(0, UNTERTITEL_MAX) : aktuell.untertitel,
  })
}

/** Blätter hinten anhängen; was schon drin ist (oder über die Obergrenze hinausgeht), bleibt draußen. Gibt zurück, wie viele neu sind. */
export function mappeHinzufuegen(liste: { id: string; sprache?: Sprache; fassung?: Fassung }[]): number {
  const da = new Set(aktuell.eintraege.map((e) => e.id))
  const neu: MappeEintrag[] = []
  for (const { id, sprache, fassung } of liste) {
    if (da.has(id) || aktuell.eintraege.length + neu.length >= MAPPE_MAX) continue
    da.add(id)
    neu.push({ id, sprache: sprache ?? 'de', fassung: fassung ?? 'standard' })
  }
  if (neu.length) aendern({ ...aktuell, eintraege: [...aktuell.eintraege, ...neu] })
  return neu.length
}

/** In die Mappe legen bzw. wieder herausnehmen. Gibt zurück, ob das Blatt jetzt in der Mappe ist (false: voll oder herausgenommen). */
export function mappeUmschalten(id: string, sprache: Sprache, fassung: Fassung = 'standard'): boolean {
  if (aktuell.eintraege.some((e) => e.id === id)) {
    mappeEntfernen(id)
    return false
  }
  return mappeHinzufuegen([{ id, sprache, fassung }]) > 0
}

export function mappeEntfernen(id: string): void {
  aendern({ ...aktuell, eintraege: aktuell.eintraege.filter((e) => e.id !== id) })
}

/** Ein Blatt um eine Stelle nach oben (-1) oder unten (+1). */
export function mappeVerschieben(id: string, richtung: -1 | 1): void {
  const i = aktuell.eintraege.findIndex((e) => e.id === id)
  const j = i + richtung
  if (i < 0 || j < 0 || j >= aktuell.eintraege.length) return
  const liste = [...aktuell.eintraege]
  ;[liste[i], liste[j]] = [liste[j], liste[i]]
  aendern({ ...aktuell, eintraege: liste })
}

export function mappeFassung(id: string, fassung: Fassung): void {
  if (aktuell.eintraege.some((e) => e.id === id && e.fassung !== fassung)) aendern({ ...aktuell, eintraege: aktuell.eintraege.map((e) => (e.id === id ? { ...e, fassung } : e)) })
}

/** Leert die Mappe und setzt Titel und Untertitel zurück (sonst stünde „Gruppe Mittwoch“ später auf einem fremden Heft); die Druck-Optionen bleiben. */
export function mappeLeeren(): void {
  aendern({ ...LEER, lehrer: aktuell.lehrer, deckblatt: aktuell.deckblatt })
}

/** Blätter entfernen, die es nicht mehr gibt (z. B. nach einer neuen Fassung der Sammlung). */
export function mappeBereinigen(gueltig: (id: string) => boolean): void {
  if (aktuell.eintraege.some((e) => !gueltig(e.id))) aendern({ ...aktuell, eintraege: aktuell.eintraege.filter((e) => gueltig(e.id)) })
}
