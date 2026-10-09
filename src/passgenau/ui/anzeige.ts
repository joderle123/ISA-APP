// Passgenau – Anzeige-Hilfen: Warum-Texte (Konzept 5.9), Ereignis-Merkmale, Zahlen.
import type { Ereignis, KatalogEintrag, Plan, PlanSchritt, Profil, Rolle, Sprache } from '../typen'
import * as K from './kern'

export interface WarumKontext {
  profil: Profil
  vorname: string
  plan?: Plan | null
}

/** Warum eines Schritts (5.9): der Kern liefert fertige Sätze (PROTOKOLL.md). Für den Druck ohne Datum (E-M13). */
export function warumText(w: string, c: WarumKontext, druck = false): string {
  void c
  return druck ? warumOhneDatum(w) : w
}

/** wie kern/druck.ts warumOhneDatum: kein Vorfall- oder Notizdatum auf Papier */
function warumOhneDatum(s: string): string {
  return s
    .replace(/\s*\(\d{1,2}\.\d{1,2}\.\)/g, '')
    .replace(/\s+–\s+(Vorfall am|Notiz vom|Beobachtung vom|Gespräch am|Réunion am|Screening vom|Klassenbuch,)\s+\d{1,2}\.\d{1,2}\./g, ' – aus dem Dossier')
    .replace(/\s+\d{1,2}\.\d{1,2}\./g, '')
    .trim()
}

export function warumListe(l: string[] | undefined, c: WarumKontext, druck = false): string[] {
  return (l ?? []).map((w) => warumText(w, c, druck)).filter(Boolean)
}

/** Der Platz des Blatts in der Stunde – im Kern der Schritt `pg:blatt` (PROTOKOLL.md, Konventionen) */
export function istBlattSchritt(s: PlanSchritt): boolean {
  return s.ref === 'pg:blatt'
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

/** Eigene Blatt-Teile des Kerns (PROTOKOLL.md, Konventionen) – sie stehen nicht im Katalog */
const SYSTEM_TEIL: Record<string, { titel: string; art: string; text: string }> = {
  'pg:stundenleiste': { titel: 'Stundenleiste', art: 'Ablauf', text: 'Ablauf der Stunde als Bilder für das Kind' },
  'pg:notfall': { titel: 'Hilfe-Zeile', art: 'Hilfe', text: 'Wer hilft, wenn es mir nicht gut geht – bleibt immer auf dem Blatt' },
}

/** Titel, Art, Text und Quelle eines Blatt-Teils oder Schritts – auch für die eigenen Teile des Kerns (pg:…) */
export function teilText(k: K.Katalog | null, ref: string, sprache: Sprache, t?: string): { titel: string; art: string; text: string; quelle: string } {
  const sys = SYSTEM_TEIL[ref]
  if (sys) return { ...sys, quelle: 'Passgenau' }
  const e = k ? K.eintrag(k, ref) : undefined
  if (!e) return { titel: t ?? 'nicht mehr im Katalog', art: '', text: '', quelle: '' }
  const tx = K.textVon(e, sprache)
  const art = e.typ === 'baustein' ? K.artName(e.art.find((a) => a !== 'aufgabe') ?? e.art[0] ?? '') : ''
  return { titel: tx.titel, art, text: tx.text, quelle: tx.quelle }
}
