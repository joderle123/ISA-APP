// Kurs-Bibliothek (22.10.2026): die Einzelkurse („kurs-<thema>-<von>-<bis>“) als Ganzes sehen – Rückmeldung: „Kurse zu allen
// Themen, ich habe sie nie gefunden“. Bisher kamen sie nur still über „Gründlich planen“ in eine Folge (planer.ts kursWahl).
import HINTERGRUND from '../../data/passgenau/kurs-hintergrund.json'
import type { Katalog } from './katalog'
import type { KatalogEintrag, Stundenschritt } from '../typen'
import { felderStunde } from './rahmenplan'
import type { FeldId } from './formen'

type Zwei = { de: string; fr: string }

export interface KursSitzung {
  nr: number
  titel: Zwei
  /** Titel des Blatts der Sitzung */
  blatt?: Zwei
  /** Formate der Hauptvariante (Bild der Sitzung) */
  format: string[]
  /** Varianten (am Tisch schreibend, bildgestützt …) */
  varianten: number
  /** Tausch-Übungen: dieselbe Sitzung mit einer anderen Methode */
  tausch: { titel: Zwei; format: string[] }[]
  /** kurzer Wochenplan aus dem Kurs-Hintergrund („Woche 1: …“) */
  plan?: Zwei
  minuten: number
}

export interface KursInfo {
  id: string
  thema: string
  von: number
  bis: number
  name: Zwei
  /** Was danach anders ist (Ziel des Kurses für die Klasse) */
  ziel?: Zwei
  /** Werkzeug oder Leitsatz des Kurses */
  stichwort?: Zwei
  /** Welt des Kurses: Ort, Figuren, roter Faden (Welle 3, KURSE.md Abschnitt 9) */
  welt?: Zwei
  warum?: Zwei
  achtung: { de: string[]; fr: string[] }
  quellen: string[]
  sitzungen: KursSitzung[]
  rituale: { ankommen?: Zwei; abschluss?: Zwei }
  /** ELDiB-Codes der Sitzungen (Hauptziele zuerst) */
  eldib: string[]
  material: string[]
  /** Kern-Ids der ersten Sitzung (für „starten“) */
  erste: string[]
  /** Handlungsfelder des Nationalen Rahmenplans (Luxemburg) */
  felder: FeldId[]
}

type Hintergrund = {
  name?: Zwei
  de?: { warum?: string; achtung?: string[] }
  fr?: { warum?: string; achtung?: string[] }
  quellen?: string[]
  welt?: Zwei
  klasse?: { de?: { ziel?: string; stichwort?: string; sitzungen?: string[] }; fr?: { ziel?: string; stichwort?: string; sitzungen?: string[] } }
}

const CACHE = new WeakMap<Katalog, KursInfo[]>()

/** Alle Einzelkurse des Katalogs, nach Thema und Alter sortiert */
export function kursListe(k: Katalog): KursInfo[] {
  const da = CACHE.get(k)
  if (da) return da
  const gruppen = new Map<string, Stundenschritt[]>()
  const rituale = new Map<string, Stundenschritt[]>()
  for (const e of k.eintraege.values()) {
    if (e.typ !== 'schritt') continue
    if (e.linie?.id.startsWith('kurs-')) {
      const l = gruppen.get(e.linie.id) ?? []
      l.push(e)
      gruppen.set(e.linie.id, l)
    } else if (e.kurs?.startsWith('kurs-')) {
      const l = rituale.get(e.kurs) ?? []
      l.push(e)
      rituale.set(e.kurs, l)
    }
  }
  const zwei = (de?: string, fr?: string): Zwei | undefined => (de ? { de, fr: fr || de } : undefined)
  const liste: KursInfo[] = []
  for (const [id, schritte] of gruppen) {
    const m = /^kurs-(.+)-(\d+)-(\d+)$/.exec(id)
    if (!m) continue
    const h = (HINTERGRUND as Record<string, Hintergrund>)[id] ?? {}
    const nrs = [...new Set(schritte.map((e) => e.linie!.nr))].sort((a, b) => a - b)
    const sitzungen: KursSitzung[] = nrs.map((nr) => {
      const alle = schritte.filter((e) => e.linie!.nr === nr)
      const varianten = alle.filter((e) => !e.tausch)
      const haupt = varianten[0] ?? alle[0]
      const blatt = varianten.find((e) => e.uebungsblatt?.titel)?.uebungsblatt?.titel
      const planDe = h.klasse?.de?.sitzungen?.[nr - 1]
      const planFr = h.klasse?.fr?.sitzungen?.[nr - 1]
      return {
        nr,
        titel: { de: haupt.titel, fr: haupt.fr?.titel ?? haupt.titel },
        blatt: blatt ? { de: blatt.de, fr: blatt.fr || blatt.de } : undefined,
        format: haupt.format,
        varianten: varianten.length,
        tausch: alle.filter((e) => e.tausch).map((e) => ({ titel: { de: e.titel, fr: e.fr?.titel ?? e.titel }, format: e.format })),
        plan: zwei(planDe?.replace(/^Woche \d+:\s*/, ''), planFr?.replace(/^Semaine \d+\s*:\s*/, '')),
        minuten: haupt.dauer.typ,
      }
    })
    const r = rituale.get(id) ?? []
    const ritual = (rolle: 'ankommen' | 'abschluss') => {
      const e = r.find((x) => x.rolle.includes(rolle))
      return e ? { de: e.titel, fr: e.fr?.titel ?? e.titel } : undefined
    }
    const codes = new Map<string, number>()
    for (const e of schritte) for (const x of e.eldib) codes.set(x.code, Math.max(codes.get(x.code) ?? 0, x.gewicht))
    liste.push({
      id,
      thema: m[1],
      von: +m[2],
      bis: +m[3],
      name: h.name ?? { de: id, fr: id },
      ziel: zwei(h.klasse?.de?.ziel, h.klasse?.fr?.ziel),
      stichwort: zwei(h.klasse?.de?.stichwort, h.klasse?.fr?.stichwort),
      welt: h.welt?.de ? zwei(h.welt.de, h.welt.fr) : undefined,
      warum: zwei(h.de?.warum, h.fr?.warum),
      achtung: { de: h.de?.achtung ?? [], fr: h.fr?.achtung ?? [] },
      quellen: h.quellen ?? [],
      sitzungen,
      rituale: { ankommen: ritual('ankommen'), abschluss: ritual('abschluss') },
      eldib: [...codes.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c),
      material: [...new Set(schritte.filter((e) => !e.tausch).flatMap((e) => e.material))],
      erste: schritte.filter((e) => e.linie!.nr === nrs[0] && !e.tausch).map((e) => e.id),
      felder: felderStunde(schritte.filter((e) => !e.tausch) as unknown as KatalogEintrag[], undefined, [...codes.keys()]).slice(0, 3),
    })
  }
  // Reihenfolge der Themen wie in KURS_THEMEN (Gefühle, Wut, Mut … zuerst), unbekannte dahinter
  const rang = (t: string) => { const i = Object.keys(KURS_THEMEN).indexOf(t); return i < 0 ? 99 : i }
  liste.sort((a, b) => rang(a.thema) - rang(b.thema) || a.thema.localeCompare(b.thema) || a.von - b.von)
  CACHE.set(k, liste)
  return liste
}

/** Themen der Kurse: Name, Bild und Farbe für Regal und Karte */
export const KURS_THEMEN: Record<string, { de: string; fr: string; motiv: string; farbe: [string, string] }> = {
  gefuehle: { de: 'Gefühle', fr: 'Émotions', motiv: 'herz', farbe: ['#B83A5E', '#FBE8EE'] },
  wut: { de: 'Wut', fr: 'Colère', motiv: 'vulkan', farbe: ['#B5451B', '#FCEBE3'] },
  mut: { de: 'Mut & Angst', fr: 'Courage et peur', motiv: 'loewe', farbe: ['#9A6A12', '#FBF2DE'] },
  selbstwert: { de: 'Selbstwert', fr: 'Estime de soi', motiv: 'krone', farbe: ['#7A5BB0', '#F0EAF9'] },
  freundschaft: { de: 'Freundschaft', fr: 'Amitié', motiv: 'freunde', farbe: ['#2E7D5B', '#E4F3EC'] },
  streit: { de: 'Streit lösen', fr: 'Résoudre les conflits', motiv: 'bruecke', farbe: ['#1F6E8C', '#E3F2F7'] },
  zusammen: { de: 'Zusammenarbeit', fr: 'Coopérer', motiv: 'gruppe', farbe: ['#3F6E3A', '#EAF2E7'] },
  sprechen: { de: 'Kommunikation', fr: 'Communication', motiv: 'sprechblasen', farbe: ['#1D5C8C', '#E4EEF7'] },
  grenzen: { de: 'Grenzen & Nein sagen', fr: 'Limites et dire non', motiv: 'stopp-hand', farbe: ['#A23B2A', '#FBE9E7'] },
  medien: { de: 'Handy & Medien', fr: 'Écrans et médias', motiv: 'handy', farbe: ['#33465F', '#E7ECF3'] },
  fokus: { de: 'Konzentration', fr: 'Concentration', motiv: 'zielscheibe', farbe: ['#5B4BA8', '#ECE9F8'] },
  probleme: { de: 'Probleme lösen', fr: 'Résoudre des problèmes', motiv: 'werkzeugkiste', farbe: ['#6B5B1E', '#F5F0DD'] },
  vielfalt: { de: 'Vielfalt & Respekt', fr: 'Diversité et respect', motiv: 'regenbogen', farbe: ['#8E3B6E', '#F6E7F0'] },
  alltag: { de: 'Alltag & Selbstständigkeit', fr: 'Quotidien et autonomie', motiv: 'tagesuhr-1', farbe: ['#4A6B8A', '#E8EFF6'] },
  // Welle 3 (KURSE.md Abschnitt 10)
  socialmedia: { de: 'Social Media', fr: 'Réseaux sociaux', motiv: 'handy-chat', farbe: ['#2B5DA8', '#E6EEFA'] },
  fakenews: { de: 'Fake News', fr: 'Fausses infos', motiv: 'megafon', farbe: ['#6B3FA0', '#F0E9F8'] },
  gaming: { de: 'Gaming', fr: 'Jeux vidéo', motiv: 'controller', farbe: ['#355E3B', '#E5F0E6'] },
  comeback: { de: 'Comeback in die Schule', fr: 'Retour à l’école', motiv: 'schule', farbe: ['#B5541C', '#FBEDE3'] },
  motivation: { de: 'Motivation & Ziele', fr: 'Motivation et objectifs', motiv: 'rakete', farbe: ['#2E3A9C', '#ECEEFA'] },
  stress: { de: 'Stress & Prüfungsangst', fr: 'Stress et trac', motiv: 'thermometer', farbe: ['#A23B2A', '#FBE9E7'] },
  koerper: { de: 'Körper & Gesundheit', fr: 'Corps et santé', motiv: 'apfel', farbe: ['#3F7D3A', '#EAF4E7'] },
  mobbing: { de: 'Mobbing & Zivilcourage', fr: 'Harcèlement et courage', motiv: 'schutzschild', farbe: ['#33465F', '#E7ECF3'] },
  mitbestimmen: { de: 'Mitbestimmen', fr: 'Participer', motiv: 'hand-offen', farbe: ['#1D5C8C', '#E4EEF7'] },
  identitaet: { de: 'Wer bin ich?', fr: 'Qui suis-je ?', motiv: 'spiegel', farbe: ['#8E3B6E', '#F6E7F0'] },
  familie: { de: 'Familie & Veränderung', fr: 'Famille et changements', motiv: 'familie', farbe: ['#9A6A12', '#FBF2DE'] },
  trauer: { de: 'Trauer & Abschied', fr: 'Deuil et adieu', motiv: 'kerze', farbe: ['#4A5568', '#EDEFF3'] },
  zukunft: { de: 'Zukunft & Beruf', fr: 'Avenir et métier', motiv: 'kompass', farbe: ['#1F6E8C', '#E3F2F7'] },
  geld: { de: 'Geld & Konsum', fr: 'Argent et consommation', motiv: 'muenzen', farbe: ['#7A6A12', '#F7F2DA'] },
  selbstfuersorge: { de: 'Gut für mich sorgen', fr: 'Prendre soin de soi', motiv: 'tasse', farbe: ['#5B4BA8', '#ECE9F8'] },
  deeskalation: { de: 'Ruhig bleiben, wenn es kracht', fr: 'Rester calme quand ça chauffe', motiv: 'eiswuerfel', farbe: ['#1F6E8C', '#E3F2F7'] },
  liebe: { de: 'Freundschaft, Liebe & Grenzen', fr: 'Amitié, amour et limites', motiv: 'herzklopfen', farbe: ['#B83A5E', '#FBE8EE'] },
  achtsamkeit: { de: 'Ruhe & Achtsamkeit', fr: 'Calme et pleine conscience', motiv: 'klangschale', farbe: ['#4A6B8A', '#E8EFF6'] },
}

export function kursThema(t: string): { de: string; fr: string; motiv: string; farbe: [string, string] } {
  return KURS_THEMEN[t] ?? { de: t.charAt(0).toUpperCase() + t.slice(1), fr: t, motiv: 'buch', farbe: ['#33465F', '#E7ECF3'] }
}
