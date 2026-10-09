// Passgenau – Seitenkontrolle (7.4): gemessene Höhe je Baustein und Gestaltung (Katalog Phase 0) + Abstände, auf A4
// verteilt wie der Renderer (Pakete brechen nicht um). Ergebnis je Seite 0..1+ (über 1 = läuft über).
import type { Layout, Plan, Profil } from '../typen'
import { intern, type Katalog } from './katalog'
import { BLATT_SYSTEM } from './system'
import { LAYOUTS } from './format'

/** Feste Teile ohne Katalogeintrag (mm, je Gestaltung ähnlich): Hilfe-Zeile, Stundenleiste. */
const FEST_MM: Record<string, Record<Layout, number>> = {
  [BLATT_SYSTEM.notfall]: { bild: 44, gross: 42, mittel: 40, jugend: 38 },
  [BLATT_SYSTEM.stundenleiste]: { bild: 36, gross: 33, mittel: 30, jugend: 24 },
}

/** Seitenmaße je Gestaltung (mm); Rückfall, wenn der Katalog noch nicht gemessen ist. */
export function seitenMasse(k: Katalog, layout: Layout): { erste: number; folge: number; abstand: number } {
  return intern(k).seite[layout] ?? { erste: 228, folge: 250, abstand: 3.5 }
}

/** Höhe eines Blatt-Teils in mm (gemessen; sonst Nachbargestaltung; sonst geschätzt). */
export function teilHoehe(k: Katalog, ref: string, layout: Layout): number {
  if (FEST_MM[ref]) return FEST_MM[ref][layout]
  const e = k.eintraege.get(ref)
  if (!e || e.typ !== 'baustein') return 60
  const h = e.hoehe[layout]
  if (h !== undefined) return h
  const i = LAYOUTS.indexOf(layout)
  for (const d of [1, -1, 2, -2, 3, -3]) {
    const x = e.hoehe[LAYOUTS[i + d]]
    if (x !== undefined) return x * (d > 0 ? 1.1 : 1)
  }
  return 70
}

/** Fängt ein Teil mit einer Aufgabe an? Dann bringt die Aufgabe ihren Abstand selbst mit. */
function mitAufgabe(k: Katalog, ref: string): boolean {
  const e = k.eintraege.get(ref)
  return !!e && e.typ === 'baustein' && e.art[0] === 'aufgabe'
}

/** Pakete auf Seiten verteilen; Rückgabe: Füllung je Seite (0..1+). */
export function verteile(k: Katalog, refs: string[], layout: Layout): number[] {
  const m = seitenMasse(k, layout)
  const benutzt = [0]
  const anzahl = [0]
  for (const ref of refs) {
    const h = teilHoehe(k, ref, layout)
    const i = benutzt.length - 1
    const cap = i ? m.folge : m.erste
    const gap = anzahl[i] && !mitAufgabe(k, ref) ? m.abstand : anzahl[i] ? m.abstand * 0.4 : 0
    if (anzahl[i] && benutzt[i] + gap + h > cap) {
      benutzt.push(h)
      anzahl.push(1)
    } else {
      benutzt[i] += gap + h
      anzahl[i]++
    }
  }
  return benutzt.map((x, i) => Math.round((x / (i ? m.folge : m.erste)) * 100) / 100)
}

export function seitenFuellung(k: Katalog, p: Profil, plan: Plan, nr: number): number[] {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s?.blatt?.bausteine.length) return []
  let layout: Layout = p.layout
  if (p.alterJahre >= 12 && (layout === 'bild' || layout === 'gross')) layout = 'jugend'
  return verteile(
    k,
    s.blatt.bausteine.map((b) => b.ref),
    layout,
  )
}
