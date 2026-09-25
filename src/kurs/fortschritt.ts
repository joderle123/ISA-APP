// ---------------------------------------------------------------------------
// Skills-Kurs: Fortschritt je Gruppe (welche Einheiten gehalten wurden, Material
// abgehakt, Notizen). Liegt nur in diesem Browser (localStorage), getrennt nach
// Person (Hub-Konto oder Gerät). Keine Namen von Jugendlichen – eine Gruppe
// heißt z. B. „Montag 14 Uhr“.
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useState } from 'react'
import { aktuellerNutzer } from '../lib/nutzer'

export interface Gruppe {
  id: string
  name: string
  jahr: number
  /** Einheit-Id → Datum (JJJJ-MM-TT), an dem sie gehalten wurde */
  erledigt: Record<string, string>
  /** Einheit-Id → Notiz der Leitung */
  notizen: Record<string, string>
  /** Einheit-Id → abgehakte Materialzeilen (Index) */
  material: Record<string, number[]>
  angelegt: string
}

export interface KursStand {
  v: 1
  gruppen: Gruppe[]
  aktiv: string | null
}

const PREFIX = 'cdse-kurs-v1:'
const EREIGNIS = 'cdse-kurs-geaendert'

function schluessel(): string {
  return PREFIX + aktuellerNutzer().id
}

export function heute(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function neueId(): string {
  return 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function neueGruppe(name: string, jahr = 1): Gruppe {
  return { id: neueId(), name: name.trim() || 'Meine Gruppe', jahr, erledigt: {}, notizen: {}, material: {}, angelegt: heute() }
}

function lesen(): KursStand {
  try {
    const roh = localStorage.getItem(schluessel())
    if (roh) {
      const s = JSON.parse(roh) as KursStand
      if (s && s.v === 1 && Array.isArray(s.gruppen)) {
        // Ältere oder unvollständige Einträge ergänzen
        s.gruppen = s.gruppen.map((g) => ({
          ...g,
          erledigt: g.erledigt ?? {},
          notizen: g.notizen ?? {},
          material: g.material ?? {},
          jahr: g.jahr ?? 1,
          angelegt: g.angelegt ?? heute(),
        }))
        return s
      }
    }
  } catch {
    /* beschädigt oder gesperrt – neu beginnen */
  }
  // Erster Besuch: eine Gruppe anlegen und gleich speichern, damit die Id stabil bleibt.
  const g = neueGruppe('Meine Gruppe')
  const s: KursStand = { v: 1, gruppen: [g], aktiv: g.id }
  schreiben(s)
  return s
}

function schreiben(s: KursStand): boolean {
  try {
    localStorage.setItem(schluessel(), JSON.stringify(s))
    return true
  } catch {
    return false
  }
}

/** Stand lesen und ändern; Änderungen aus anderen Tabs werden übernommen. */
export function useKursStand() {
  const [stand, setStand] = useState<KursStand>(lesen)
  const [gespeichert, setGespeichert] = useState(true)

  useEffect(() => {
    const neu = () => setStand(lesen())
    const beiSpeicher = (e: StorageEvent) => {
      if (e.key === schluessel()) neu()
    }
    window.addEventListener('storage', beiSpeicher)
    window.addEventListener(EREIGNIS, neu)
    return () => {
      window.removeEventListener('storage', beiSpeicher)
      window.removeEventListener(EREIGNIS, neu)
    }
  }, [])

  const aendern = useCallback((fn: (s: KursStand) => KursStand) => {
    const neu = fn(lesen())
    setGespeichert(schreiben(neu))
    setStand(neu)
    window.dispatchEvent(new Event(EREIGNIS))
  }, [])

  const gruppe = stand.gruppen.find((g) => g.id === stand.aktiv) ?? stand.gruppen[0] ?? null

  const gruppeAendern = useCallback(
    (fn: (g: Gruppe) => Gruppe) => {
      aendern((s) => {
        const id = s.gruppen.find((g) => g.id === s.aktiv)?.id ?? s.gruppen[0]?.id
        return { ...s, gruppen: s.gruppen.map((g) => (g.id === id ? fn(g) : g)) }
      })
    },
    [aendern],
  )

  return { stand, gruppe, aendern, gruppeAendern, gespeichert }
}
