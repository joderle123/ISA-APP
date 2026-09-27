// Sprache der Arbeitsblätter (DE/FR), einmal gewählt für alle: Blatt-Dialog,
// PDF auf der Karte und Mappe. Bleibt nach dem Neuladen – eigener Schlüssel im
// localStorage (ohne Zugriff, z. B. gesperrt: nur für diese Sitzung).
import { useSyncExternalStore } from 'react'
import type { Sprache } from '../blatt/typen'

const KEY = 'cdse-blatt-sprache-v1'

function lesen(): Sprache {
  try {
    return localStorage.getItem(KEY) === 'fr' ? 'fr' : 'de'
  } catch {
    return 'de'
  }
}

let aktuell: Sprache = lesen()
const hoerer = new Set<() => void>()

export function setBlattSprache(s: Sprache): void {
  if (s === aktuell) return
  aktuell = s
  try {
    localStorage.setItem(KEY, s)
  } catch {
    /* nicht speicherbar – gilt dann nur bis zum Neuladen */
  }
  for (const h of hoerer) h()
}

/** Gewählte Sprache; für ein Blatt ohne Französisch gilt immer Deutsch. */
export function useBlattSprache(): Sprache {
  return useSyncExternalStore(
    (cb) => {
      hoerer.add(cb)
      return () => hoerer.delete(cb)
    },
    () => aktuell,
  )
}
