// Bewertungen: eigene Sterne und Praxis-Tipps (lokal gespeichert, wie bisher
// „isa-ratings-v1“) und – sobald die Team-Ablage verbunden ist – gemeinsam mit
// allen anderen (eine Datei pro Person in bewertungen/).
import { useCallback, useEffect, useRef, useState } from 'react'
import { loadRatings, saveRatings, type RatingMap } from './ratings'
import { teamSync, type EigeneBewertung, type Gesamtbewertung } from './teamSync'
import { aktuellerNutzer } from './nutzer'

const NOTIZ_KEY = 'isa-bewertung-notizen-v1'
const ZEIT_KEY = 'isa-bewertung-zeiten-v1'

function lesen<T>(key: string): Record<string, T> {
  try {
    const j = JSON.parse(localStorage.getItem(key) || '{}')
    return j && typeof j === 'object' ? j : {}
  } catch {
    return {}
  }
}
function schreiben(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {
    /* ignorieren */
  }
}

export interface Bewertungen {
  eigene: RatingMap
  notizen: Record<string, string>
  gesamt: Map<string, Gesamtbewertung>
  verbunden: boolean
  bewerten: (id: string, sterne: number) => void
  notieren: (id: string, text: string) => void
}

export function useBewertungen(): Bewertungen {
  const [eigene, setEigene] = useState<RatingMap>(() => loadRatings())
  const [notizen, setNotizen] = useState<Record<string, string>>(() => lesen<string>(NOTIZ_KEY))
  const [gesamt, setGesamt] = useState<Map<string, Gesamtbewertung>>(new Map())
  const [verbunden, setVerbunden] = useState(teamSync.status().connected)
  const zeiten = useRef<Record<string, number>>(lesen<number>(ZEIT_KEY))
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const uebernommen = useRef(false)
  const stand = useRef({ eigene, notizen })
  stand.current = { eigene, notizen }

  const hochladen = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const n = aktuellerNutzer()
      const { eigene: e, notizen: no } = stand.current
      const werte: Record<string, EigeneBewertung> = {}
      for (const id of new Set([...Object.keys(e), ...Object.keys(no)])) {
        const s = e[id] || 0
        const notiz = (no[id] || '').trim()
        if (!s && !notiz) continue
        werte[id] = { s, t: zeiten.current[id] || Date.now(), ...(notiz ? { notiz } : {}) }
      }
      teamSync.writeOwnRatings(n.id, n.name || 'Kollegin/Kollege', werte).catch(() => {})
    }, 1200)
  }, [])

  // Gemeinsame Bewertungen abonnieren; beim ersten Verbinden die eigene Datei
  // (z. B. von einem anderen PC mit demselben Hub-Konto) übernehmen.
  useEffect(() => {
    const aus1 = teamSync.onRatings((alle) => {
      setGesamt(new Map(alle))
      if (!uebernommen.current && teamSync.status().connected) {
        uebernommen.current = true
        const n = aktuellerNutzer()
        const datei = teamSync.ownRatings(n.id)
        if (datei) {
          const e = { ...stand.current.eigene }
          const no = { ...stand.current.notizen }
          let neu = false
          for (const [id, w] of Object.entries(datei.werte)) {
            if (!e[id] && w.s) ((e[id] = w.s), (neu = true))
            if (!no[id] && w.notiz) ((no[id] = w.notiz), (neu = true))
          }
          if (neu) {
            setEigene(e)
            saveRatings(e)
            setNotizen(no)
            schreiben(NOTIZ_KEY, no)
          }
        }
        hochladen()
      }
    })
    const aus2 = teamSync.onChange(() => setVerbunden(teamSync.status().connected))
    return () => {
      aus1()
      aus2()
    }
  }, [hochladen])

  const bewerten = useCallback(
    (id: string, sterne: number) => {
      setEigene((alt) => {
        const neu = { ...alt }
        if (sterne) neu[id] = sterne
        else delete neu[id]
        saveRatings(neu)
        return neu
      })
      zeiten.current = { ...zeiten.current, [id]: Date.now() }
      schreiben(ZEIT_KEY, zeiten.current)
      hochladen()
    },
    [hochladen],
  )

  const notieren = useCallback(
    (id: string, text: string) => {
      setNotizen((alt) => {
        const neu = { ...alt }
        if (text.trim()) neu[id] = text.trim().slice(0, 400)
        else delete neu[id]
        schreiben(NOTIZ_KEY, neu)
        return neu
      })
      zeiten.current = { ...zeiten.current, [id]: Date.now() }
      schreiben(ZEIT_KEY, zeiten.current)
      hochladen()
    },
    [hochladen],
  )

  return { eigene, notizen, gesamt, verbunden, bewerten, notieren }
}
