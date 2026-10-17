// Vorschläge aus dem Steckbrief (Profil.vorschlaege und Ziele mit quelle 'steckbrief', vom Hub): was davon noch offen ist und
// wie „Übernehmen“ und „Passt nicht“ die Korrekturen ändern. Fürs Planen gilt ein Vorschlag erst nach „Übernehmen“.
import type { Profil } from '../typen'
import type { Korrekturen } from './zustand'
import { INTERESSE_NAME, zielKurz } from './texte'

export type VorschlagArt = 'zugang' | 'hilft' | 'vorsicht' | 'interesse' | 'woerter' | 'ziel'
export interface Vorschlag {
  /** Schlüssel für „passt nicht“ (korrekturen.vorschlagAus): 'schreiben', 'hilft:reizarm', 'ziel:V-26' … */
  key: string
  art: VorschlagArt
  titel: string
  unter: string
  uebernehmen: (k: Korrekturen) => Korrekturen
}

const LESEN = ['kaum Text', 'wenig Text', 'mittlere Textmenge', 'viel Text']
const SCHREIBEN = ['nichts schreiben', 'ankreuzen und einzelne Wörter', 'kurze Sätze', 'ganze Sätze']
const HILFT: Record<string, [string, string]> = {
  stundenleiste: ['Stundenleiste', 'Ablauf als Bilder fürs Kind, oben auf dem Blatt'],
  bewegungspausen: ['Bewegungspausen', 'nach jedem Block über 8 Min. eine kurze Pause'],
  reizarm: ['leise/reizarm', 'keine lauten Spiele, ruhiger Raum'],
  bildplan: ['Bildplan', 'Plan mit Piktogrammen für das Kind'],
}
const VORSICHT: Record<string, [string, string]> = {
  reiz: ['Vorsicht: Reize', 'leise, ohne Wettkampf und Berührung'],
  familie: ['Vorsicht: Familie', 'Fragen nur „wenn du magst“, Familiengeschichten behutsam'],
  trauma: ['Vorsicht: belastende Erfahrungen', 'keine Gewaltbilder, keine Überraschungen'],
  trauer: ['Vorsicht: Trauer', 'keine Geschichten über Tod und Verlust'],
  koerper: ['Vorsicht: Körper und Essen', 'behutsam'],
}

/** Offene Vorschläge: nicht schon gesetzt, nicht als „passt nicht“ markiert. `p` ist das Profil mit den Korrekturen. */
export function offeneVorschlaege(roh: Profil, p: Profil, k: Korrekturen): Vorschlag[] {
  const v = roh.vorschlaege ?? {}
  const weg = new Set(k.vorschlagAus ?? [])
  const l: Vorschlag[] = []
  for (const z of roh.ziele.filter((x) => x.quelle === 'steckbrief')) {
    if (k.ziele?.[z.code] !== undefined || weg.has(`ziel:${z.code}`)) continue
    l.push({ key: `ziel:${z.code}`, art: 'ziel', titel: `${z.code} ${zielKurz(z.code)}`, unter: z.ich ? `„${z.ich}“` : 'Förderziel', uebernehmen: (x) => ({ ...x, ziele: { ...x.ziele, [z.code]: true } }) })
  }
  const zg = v.zugang ?? {}
  if (zg.schreiben !== undefined && p.zugang.schreiben > zg.schreiben && !weg.has('schreiben'))
    l.push({ key: 'schreiben', art: 'zugang', titel: `Schreiben: ${SCHREIBEN[zg.schreiben]}`, unter: 'statt „' + SCHREIBEN[p.zugang.schreiben] + '“', uebernehmen: (x) => ({ ...x, zugang: { ...x.zugang, schreiben: zg.schreiben } }) })
  if (zg.lesen !== undefined && p.zugang.lesen > zg.lesen && !weg.has('lesen'))
    l.push({ key: 'lesen', art: 'zugang', titel: `Lesen: ${LESEN[zg.lesen]}`, unter: 'statt „' + LESEN[p.zugang.lesen] + '“', uebernehmen: (x) => ({ ...x, zugang: { ...x.zugang, lesen: zg.lesen } }) })
  if (zg.tempo === 'ruhig' && p.zugang.tempo !== 'ruhig' && !weg.has('tempo'))
    l.push({ key: 'tempo', art: 'zugang', titel: 'Ruhiges Tempo', unter: 'kürzere Schritte, Beispiele Pflicht', uebernehmen: (x) => ({ ...x, zugang: { ...x.zugang, tempo: 'ruhig' } }) })
  for (const h of v.hilft ?? []) {
    if ((p.hilft ?? []).includes(h) || weg.has(`hilft:${h}`) || !HILFT[h]) continue
    l.push({ key: `hilft:${h}`, art: 'hilft', titel: HILFT[h][0], unter: HILFT[h][1], uebernehmen: (x) => ({ ...x, hilft: { ...x.hilft, [h]: true } }) })
  }
  for (const s of v.vorsicht ?? []) {
    if (p.vorsicht.includes(s) || weg.has(`vorsicht:${s}`) || !VORSICHT[s]) continue
    l.push({ key: `vorsicht:${s}`, art: 'vorsicht', titel: VORSICHT[s][0], unter: VORSICHT[s][1], uebernehmen: (x) => ({ ...x, vorsicht: { ...x.vorsicht, [s]: true } }) })
  }
  for (const w of v.woerter ?? []) {
    if (p.sprache.woerter.includes(w) || weg.has(`woerter:${w}`)) continue
    l.push({ key: `woerter:${w}`, art: 'woerter', titel: `Wörterstreifen auch ${w === 'pt' ? 'Portugiesisch' : 'Luxemburgisch'}`, unter: 'Erstsprache laut Steckbrief', uebernehmen: (x) => ({ ...x, woerter: undefined, woerterAn: [...new Set([...(x.woerterAn ?? []), w])] }) })
  }
  // Interessen: der Hub schickt sie nur, solange die Fachkraft keine gesetzt hat; ein Klick übernimmt eines, die übrigen bleiben
  for (const i of v.interessen ?? []) {
    if (p.interessen.includes(i) || weg.has(`interesse:${i}`)) continue
    l.push({ key: `interesse:${i}`, art: 'interesse', titel: INTERESSE_NAME[i] ?? i, unter: 'Interesse', uebernehmen: (x) => ({ ...x, interessen: [...new Set([...(x.interessen ?? p.interessen), i])] }) })
  }
  return l
}

export function passtNicht(k: Korrekturen, key: string): Korrekturen {
  return { ...k, vorschlagAus: [...new Set([...(k.vorschlagAus ?? []), key])] }
}
