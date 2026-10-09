// Passgenau – Anzeige-Hilfen: Warum-Texte (Konzept 5.9), Ereignis-Merkmale, Zahlen.
import type { Ereignis, KatalogEintrag, Plan, PlanSchritt, Profil, Rolle } from '../typen'
import { FORMAT_NAME, PHASE_NAME, QUELLE_ZIEL, THEMA_ART, TF_NAME, datumKurz, interesseName, themaName, zielKurz } from './texte'
import type { Tagesform } from '../typen'

export interface WarumKontext {
  profil: Profil
  vorname: string
  plan?: Plan | null
}

/** Ein Warum-Schlüssel des Planers („ziel:V-21“, „thema:wut:vorfall:2026-10-02“ …) → Satz. Freitext bleibt, wie er ist. */
export function warumText(w: string, c: WarumKontext, druck = false): string {
  if (!/^[a-z-]+(:|$)/.test(w) || /\s/.test(w.split(':')[0])) return w
  const [art, ...rest] = w.split(':')
  const v = c.vorname
  switch (art) {
    case 'ritual':
      return `Ritual von ${v} – bleibt jede Stunde gleich (Sicherheit)`
    case 'ritual-neu':
      return 'anderes Ritual – gilt dann für alle Sitzungen der Folge'
    case 'wahl':
      return `${v} wählt in der Stunde – keine Befragung`
    case 'leicht':
      return 'leicht und ohne Förderziel – für die Beziehung'
    case 'gelockert':
      // Lockerungsleiter des Planers (T-M3): Alter, Layout und Vorsicht werden nie gelockert
      return 'gelockert: ' + (({ phase: 'aus der Nachbarphase', ziel: 'Ziel aus demselben Bereich', wiederholt: 'kommt in der Folge schon vor', gemacht: 'kürzlich gemacht (Sperre 21 statt 42 Tage)', gruppe: 'Gruppenaktivität, so mit einem Kind' } as Record<string, string>)[rest[0]] ?? rest[0]) + ' – zu wenig anderes Passendes'
    case 'ziel': {
      const z = c.profil.ziele.find((x) => x.code === rest[0])
      const q = z ? QUELLE_ZIEL[z.quelle] ?? '' : ''
      return `Zu ${rest[0]} ${zielKurz(rest[0])}${q ? ' – ' + q : ''}${z?.seit && !druck ? ` (${datumKurz(z.seit)})` : ''}`
    }
    case 'thema': {
      const name = themaName(rest[0])
      if (druck || !rest[1]) return `Thema ${name}`
      return `Thema ${name} – ${THEMA_ART[rest[1]] ?? rest[1]} am ${datumKurz(rest[2])}`
    }
    case 'schwerpunkt':
      return `Schwerpunkt: ${rest[0] === 'kompetenz' ? rest[1] : themaName(rest[0])}`
    case 'phase': {
      const ph = PHASE_NAME[rest[0] as keyof typeof PHASE_NAME] ?? rest[0]
      return c.plan && c.plan.n > 1 ? `Sitzung ${rest[1]} von ${c.plan.n}: ${ph.toLowerCase()}` : `passt zur Phase: ${ph}`
    }
    case 'zugang': {
      const z = c.profil.zugang
      return [z.lesen <= 1 ? 'wenig Text' : 'Text passend', z.schreiben <= 1 ? 'wenig Schreiben' : null, z.bild >= 2 ? 'viele Bilder' : null].filter(Boolean).join(', ')
    }
    case 'heute': {
      const e = +rest[1]
      return e >= 6 ? 'heute viel Energie: erst bewegen, dann denken' : e <= 2 ? 'heute wenig Energie: im Sitzen, kurz' : 'passt zur Tagesform'
    }
    case 'tagesform':
      return `passt, wenn ${v} heute ${rest[0].split('+').map((t) => TF_NAME[t as Tagesform] ?? t).join(' und ')} ist`
    case 'interesse':
      return `mit Bezug zu ${interesseName(rest[0])} (Interesse von ${v})`
    case 'kind':
      if (rest[0] === 'format') return `${FORMAT_NAME[rest[1]] ?? rest[1]} klappt bei ${v} oft${rest[3] ? ` (${rest[2]} von ${rest[3]})` : ''}`
      return `passt zu ${v}`
    case 'ich':
      if (rest[0] === 'format') return `du nimmst oft ${FORMAT_NAME[rest[1]] ?? rest[1]}`
      return 'passt zu deinen Vorlieben'
    case 'team': {
      const n = +rest[0], q = +rest[1]
      return n >= 10 ? `im Team beliebt: ${n}× genutzt, ${q} % gelungen` : `im Team genutzt (${n}×)`
    }
    case 'erkundung':
      return `Neu ausprobiert – mal etwas anderes, damit ${v} nicht immer dasselbe bekommt`
    case 'praxis':
      return 'Aus der Praxis'
    default:
      return w
  }
}

export function warumListe(l: string[] | undefined, c: WarumKontext, druck = false): string[] {
  return (l ?? []).map((w) => warumText(w, c, druck)).filter(Boolean)
}

export function istBlattSchritt(s: PlanSchritt): boolean {
  return s.ref === 'blatt' || s.ref.startsWith('blatt:')
}

export function laengeVon(e: KatalogEintrag): 'kurz' | 'mittel' | 'lang' {
  return e.dauer.typ >= 10 ? 'lang' : e.dauer.typ >= 6 ? 'mittel' : 'kurz'
}

/** Merkmale eines Bausteins für ein Ereignis (6.9) */
export function tagsVon(e: KatalogEintrag | undefined, rolle?: Rolle): Ereignis['tags'] {
  if (!e) return rolle ? { rolle } : {}
  return {
    rolle: rolle ?? e.rolle[0],
    format: e.format,
    quelle: e.typ === 'schritt' ? e.quelle.art : 'blatt',
    thema: e.thema,
    laenge: laengeVon(e),
    lesen: e.typ === 'baustein' ? e.lesemenge : undefined,
    schreiben: e.typ === 'baustein' ? e.schreibmenge : undefined,
  }
}

/** Feste Altersbänder (E-M5): 3–5 · 6–8 · 9–11 · 12–14 · 15+ */
export function altersbandFest(alter: number): string {
  return alter <= 5 ? '3-5' : alter <= 8 ? '6-8' : alter <= 11 ? '9-11' : alter <= 14 ? '12-14' : '15+'
}

export function minutenVon(s: { schritte: PlanSchritt[] }): number {
  return s.schritte.reduce((x, y) => x + y.min, 0)
}

export function uhrzeit(d = new Date()): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function dateiname(plan: Plan, nr?: number): string {
  // E-M13: neutraler Dateiname, kein Name
  return nr ? `Passgenau-Sitzung-${nr}.pdf` : `Passgenau-Folge-${plan.n}-Sitzungen.pdf`
}

export function blobSpeichern(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 30000)
}

export function textDatei(inhalt: string, name: string, typ = 'application/json'): void {
  blobSpeichern(new Blob([inhalt], { type: typ + ';charset=utf-8' }), name)
}
