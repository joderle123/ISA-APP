// Luxemburger Standard (22.10.2026): Bezug jeder Stunde zu den Handlungsfeldern des Nationalen Rahmenplans zur
// non-formalen Bildung (Cadre de référence national, für staatlich geförderte Dienste verbindlich; RGD vom 17. Juni 2024).
// Zugeordnet wird aus Format, Kompetenz und Thema der Schritte – ein Hinweis für Nachweis und Planung, keine Bewertung.
import type { KatalogEintrag, Plan, Sprache } from '../typen'
import { textVon, type Katalog } from './katalog'
import type { FeldId } from './formen'
import { formVon } from './formen'

export const FELDER: { id: FeldId; de: string; fr: string; kurz: string; farbe: [string, string] }[] = [
  { id: 'emotionen', de: 'Emotionen und soziale Beziehungen', fr: 'Émotions et relations sociales', kurz: 'Emotionen & Beziehungen', farbe: ['#B83A5E', '#FBE8EE'] },
  { id: 'werte', de: 'Werteorientierung, Partizipation und Demokratie', fr: 'Valeurs, participation et démocratie', kurz: 'Werte & Mitbestimmung', farbe: ['#1D5C8C', '#E4EEF7'] },
  { id: 'sprache', de: 'Sprache, Kommunikation und Medien', fr: 'Langue, communication et médias', kurz: 'Sprache & Medien', farbe: ['#5B4BA8', '#ECE9F8'] },
  { id: 'kreativ', de: 'Ästhetik, Kreativität und Kunst', fr: 'Esthétique, créativité et art', kurz: 'Kreativität & Kunst', farbe: ['#C0392B', '#FBE9E7'] },
  { id: 'bewegung', de: 'Bewegung, Körperbewusstsein und Gesundheit', fr: 'Mouvement, conscience corporelle et santé', kurz: 'Bewegung & Gesundheit', farbe: ['#B5541C', '#FBEDE3'] },
  { id: 'natur', de: 'Naturwissenschaften und Technik', fr: 'Sciences naturelles et techniques', kurz: 'Natur & Technik', farbe: ['#2E7D5B', '#E4F3EC'] },
  { id: 'uebergaenge', de: 'Übergänge', fr: 'Transitions', kurz: 'Übergänge', farbe: ['#6B5B1E', '#F5F0DD'] },
]

const FORMAT_FELD: Record<string, FeldId> = {
  bewegung: 'bewegung', ballspiel: 'bewegung', wurfspiel: 'bewegung', atmen: 'bewegung', sinne: 'bewegung',
  malen: 'kreativ', basteln: 'kreativ', musik: 'kreativ', comic: 'kreativ', figuren: 'kreativ', rollenspiel: 'kreativ', pantomime: 'kreativ', statuen: 'kreativ',
  gespraech: 'sprache', geschichte: 'sprache', lesen: 'sprache', schreiben: 'sprache', digital: 'sprache', interview: 'sprache',
  experiment: 'natur', bauen: 'natur',
}
const KOMPETENZ_FELD: Record<string, FeldId> = {
  'gefuehle-erkennen': 'emotionen', 'gefuehle-ausdruecken': 'emotionen', selbstregulation: 'emotionen', impulskontrolle: 'emotionen',
  kooperation: 'emotionen', konflikte: 'emotionen', selbstbild: 'emotionen', kommunikation: 'sprache',
}
const THEMA_FELD: Record<string, FeldId> = {
  regeln: 'werte', mobbing: 'werte', medien: 'sprache', koerper: 'bewegung', schlaf: 'bewegung', veraenderung: 'uebergaenge', ankommen: 'uebergaenge',
}

/** Handlungsfelder eines Schritts (bis zu drei, das wichtigste zuerst) */
export function felderVon(e: KatalogEintrag | undefined): FeldId[] {
  if (!e || e.typ !== 'schritt') return []
  const f: FeldId[] = []
  const add = (x: FeldId | undefined) => x && !f.includes(x) && f.push(x)
  for (const k of e.kompetenz) add(KOMPETENZ_FELD[k])
  for (const t of e.thema) add(THEMA_FELD[t])
  for (const x of e.format.slice(0, 2)) add(FORMAT_FELD[x])
  for (const fo of e.formen ?? []) for (const x of formVon(fo)?.felder ?? []) add(x)
  if (e.ort === 'draussen') add('natur')
  return f.slice(0, 3)
}

/** Handlungsfelder einer Stunde aus ihren Schritten, nach Häufigkeit (Rituale zählen nicht) */
export function felderStunde(eintraege: (KatalogEintrag | undefined)[], form?: string, ziele: string[] = []): FeldId[] {
  const n = new Map<FeldId, number>()
  // sozial-emotionale ELDiB-Ziele (Verhalten, Kommunikation/Kontakt, Sozialverhalten) tragen immer das erste Handlungsfeld
  if (ziele.some((z) => /^(V|K|SOZ)-\d+$/.test(z))) n.set('emotionen', 3)
  for (const e of eintraege) for (const [i, x] of felderVon(e).entries()) n.set(x, (n.get(x) ?? 0) + (i === 0 ? 2 : 1))
  for (const x of formVon(form)?.felder ?? []) n.set(x, (n.get(x) ?? 0) + 2)
  return [...n.entries()].sort((a, b) => b[1] - a[1]).map(([x]) => x)
}

// ---------------------------------------------------------------------------------------------------------------------
// Nachweis (23.10.2026): Dienste der non-formalen Bildung führen ein Journal de bord, das die Umsetzung ihres
// Concept d'action général belegt (Kontrolle durch die Regionalagent·innen des SNJ). Aus den gehaltenen Stunden entsteht
// eine Liste ohne Namen: Datum, Aktivität, Minuten, Sozialform, Handlungsfelder – und je Feld die Zahl der Stunden.

export interface NachweisZeile {
  datum: string
  aktivitaet: string
  min: number
  sozialform: string
  felder: FeldId[]
}
export interface DruckNachweis {
  sprache: Sprache
  titel: string
  /** Vorname nur, wenn „Vorname einsetzen“ an ist */
  vorname?: string
  von: string | null
  bis: string | null
  zeilen: NachweisZeile[]
  /** je Handlungsfeld die Zahl der Stunden, die es berühren (erstes Feld einer Stunde zählt voll, weitere auch) */
  jeFeld: { id: FeldId; name: string; n: number; farbe: [string, string] }[]
  minuten: number
  datei: string
}

const SOZIAL: Record<string, { de: string; fr: string }> = {
  einzeln: { de: 'Einzel', fr: 'individuel' },
  'zu-zweit': { de: 'zu zweit', fr: 'à deux' },
  kleingruppe: { de: 'Kleingruppe', fr: 'petit groupe' },
}

/** Gehaltene Stunden aller Pläne (ohne Doppel), nach Datum */
export function rahmenplanNachweis(k: Katalog, plaene: Plan[], opt: { sprache: Sprache; vorname?: string }): DruckNachweis {
  const sp = opt.sprache
  const gesehen = new Set<string>()
  const zeilen: NachweisZeile[] = []
  for (const plan of plaene) {
    for (const s of plan.sitzungen) {
      if (s.status !== 'gehalten' || !s.datum) continue
      const schluessel = `${plan.id}|${s.nr}`
      if (gesehen.has(schluessel)) continue
      gesehen.add(schluessel)
      const schritte = s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss')
      const kern = s.schritte.find((x) => x.rolle === 'kern')
      const ke = kern ? k.eintraege.get(kern.ref) : undefined
      const eigen = kern?.ueber ? (sp === 'fr' ? kern.ueber['fr.titel'] : undefined) ?? kern.ueber.titel : undefined
      const kernTitel = (eigen ?? (ke ? textVon(ke, sp).titel : kern?.t ?? '')).trim()
      // ohne Plan-Titel: er nennt oft das Förderziel des Kindes („Ich kann …“) und steht in der Sprache der Planung
      const aktivitaet = (kernTitel || (sp === 'fr' ? 'Séance' : 'Stunde')) + (plan.n > 1 ? ` (${sp === 'fr' ? 'séance' : 'Sitzung'} ${s.nr}/${plan.n})` : '')
      zeilen.push({
        datum: s.datum.slice(0, 10),
        aktivitaet,
        min: s.schritte.reduce((n, x) => n + x.min, 0),
        sozialform: SOZIAL[plan.auftrag?.sozialform ?? 'einzeln']?.[sp] ?? '',
        // beim Halten gespeichert (gleich wie im Hub), sonst jetzt berechnet
        felder: s.felder?.length ? s.felder : felderStunde(schritte.map((x) => k.eintraege.get(x.ref)), plan.auftrag?.form, plan.ziele).slice(0, 3),
      })
    }
  }
  zeilen.sort((a, b) => a.datum.localeCompare(b.datum))
  const jeFeld = FELDER.map((f) => ({ id: f.id, name: sp === 'fr' ? f.fr : f.de, n: zeilen.filter((z) => z.felder.includes(f.id)).length, farbe: f.farbe }))
  return {
    sprache: sp,
    titel: sp === 'fr' ? 'Relevé des séances – cadre de référence national' : 'Nachweis der Stunden – Nationaler Rahmenplan',
    ...(opt.vorname ? { vorname: opt.vorname } : {}),
    von: zeilen[0]?.datum ?? null,
    bis: zeilen[zeilen.length - 1]?.datum ?? null,
    zeilen,
    jeFeld,
    minuten: zeilen.reduce((n, z) => n + z.min, 0),
    datei: sp === 'fr' ? 'Passgenau-Releve-cadre-de-reference.pdf' : 'Passgenau-Rahmenplan-Nachweis.pdf',
  }
}
