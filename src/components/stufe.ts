// Stufen als Alter zeigen: „C3“ sagt nur Eingeweihten etwas, „8–9 J.“ jeder Fachkraft.
// Die Zuordnung steht einmal im Code (Passgenau-Kern, wie zyklusAusAlter im Hub): C1 3–5, C2 6–7, C3 8–9, C4 10–11, ab 12 ES.
import type { Stufe } from '../blatt/typen'
import { STUFE_ALTER } from '../passgenau/kern/hilfen'

const REIHE: Stufe[] = ['C1', 'C2', 'C3', 'C4', 'ES']

function bekannt(s: string): s is Stufe {
  return (REIHE as string[]).includes(s)
}

/** „3–5 J.“, „8–9 J.“, „ab 12 J.“ */
export function stufeAlter(s: string): string {
  if (!bekannt(s)) return ''
  const [von, bis] = STUFE_ALTER[s]
  return s === 'ES' ? `ab ${von} J.` : `${von}–${bis} J.`
}

/** „C3 · 8–9 J.“ – für Filter, Tooltips und Auswahl */
export function stufeMitAlter(s: string): string {
  const a = stufeAlter(s)
  return a ? `${s} · ${a}` : s
}

/** Alter einer Stufenliste als ein Band: [C3, C4] → „8–11 J.“, [C4, ES] → „ab 10 J.“ */
export function alterText(stufen: readonly string[]): string {
  const l = stufen.filter(bekannt).sort((a, b) => REIHE.indexOf(a) - REIHE.indexOf(b))
  if (!l.length) return ''
  const von = STUFE_ALTER[l[0]][0]
  const letzte = l[l.length - 1]
  return letzte === 'ES' ? `ab ${von} J.` : `${von}–${STUFE_ALTER[letzte][1]} J.`
}

/** „C3–C4“ (Kurzform für Tooltips) */
export function stufenKurz(stufen: readonly string[]): string {
  const l = stufen.filter(bekannt).sort((a, b) => REIHE.indexOf(a) - REIHE.indexOf(b))
  return !l.length ? '' : l.length === 1 ? l[0] : `${l[0]}–${l[l.length - 1]}`
}

/** Dauer einer Einheit für die Karte: „ca. 45-50 Minuten (eine Kursstunde)“ → „45–50 Min.“. Freitexte über mehrere
 *  Einheiten oder Wochen bleiben der Detailansicht vorbehalten (leer). */
export function dauerKurz(d?: string): string {
  if (!d || /Einheiten|Wochen|Woche\b/i.test(d)) return ''
  const m = /(\d+)\s*(?:[-–]\s*(\d+))?\s*(?:Min\.?|Minuten)/i.exec(d)
  return m ? `${m[1]}${m[2] ? '–' + m[2] : ''} Min.` : ''
}
