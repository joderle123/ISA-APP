// Passgenau für eine Kleingruppe (Aufgabe 151, Idee 1): die Profile der Kinder übereinanderlegen. Geplant wird ein
// gemeinsamer Kern für alle; was die Sicherheit betrifft, gilt das Vorsichtigste (Vorsicht, Achtung, Tempo, Lesen,
// Schreiben), die Ziele, die mehrere Kinder teilen, kommen zuerst. Jedes Kind bekommt sein Blatt in seiner Stufe, seiner
// Gestaltung und seiner Sprache (drei Niveaus aus denselben Teilen), dazu Rollen, die jede Sitzung wechseln.
import type { Profil, ProfilZiel, Sprache, Stufe03 } from '../typen'

export interface GruppenMitglied {
  ref: string
  vorname?: string
  anrede: string | null
  alterJahre: number
  stufen: Profil['stufen']
  layout: Profil['layout']
  sprache: Profil['sprache']
  zugang: Profil['zugang']
  /** eigene Ziel-Codes (Rückmeldung nur zu diesen) */
  ziele?: string[]
}

const min = (l: number[]) => Math.min(...l)
const max = (l: number[]) => Math.max(...l)

function namenListe(l: string[], sp: Sprache): string {
  if (l.length <= 1) return l[0] ?? ''
  return `${l.slice(0, -1).join(', ')} ${sp === 'fr' ? 'et' : 'und'} ${l[l.length - 1]}`
}

/** Ein Profil für die ganze Gruppe (2–6 Kinder); `gruppe` trägt je Kind, was sein Blatt braucht. */
export function gruppenProfil(liste: Profil[]): Profil {
  if (liste.length < 2) return liste[0]
  const jung = [...liste].sort((a, b) => a.alterJahre - b.alterJahre)[0]
  // Sprache der Gruppe: die der meisten Kinder (bei Gleichstand Deutsch); jedes Blatt kommt in der Sprache des Kindes
  const fr = liste.filter((p) => p.sprache.blatt === 'fr').length
  const sprache: Sprache = fr > liste.length / 2 ? 'fr' : 'de'
  // Ziele: die, die mehrere Kinder teilen, zuerst; danach nach Priorität
  const zaehl = new Map<string, { z: ProfilZiel; n: number; prio: number }>()
  for (const p of liste)
    for (const z of p.ziele ?? []) {
      const x = zaehl.get(z.code)
      if (x) {
        x.n++
        x.prio = Math.min(x.prio, z.prio)
      } else zaehl.set(z.code, { z, n: 1, prio: z.prio })
    }
  const ziele = [...zaehl.values()]
    .sort((a, b) => b.n - a.n || a.prio - b.prio)
    .slice(0, 4)
    .map((x, i) => ({ ...x.z, prio: i + 1 }))
  const interessen = new Map<string, number>()
  for (const p of liste) for (const k of p.interessen ?? []) interessen.set(k, (interessen.get(k) ?? 0) + 1)
  const union = <T,>(f: (p: Profil) => T[] | undefined) => [...new Set(liste.flatMap((p) => f(p) ?? []))]
  const vornamen = liste.map((p, i) => p.vorname || `Kind ${i + 1}`)
  return {
    ...jung,
    ref: liste[0].ref,
    anrede: null,
    vorname: namenListe(vornamen, sprache),
    alterJahre: jung.alterJahre,
    stufen: union((p) => p.stufen),
    sprache: { blatt: sprache, woerter: union((p) => p.sprache?.woerter) },
    zugang: {
      lesen: min(liste.map((p) => p.zugang.lesen)) as Stufe03,
      schreiben: min(liste.map((p) => p.zugang.schreiben)) as Stufe03,
      bild: max(liste.map((p) => p.zugang.bild)) as 1 | 2 | 3,
      tempo: liste.some((p) => p.zugang.tempo === 'ruhig') ? 'ruhig' : 'normal',
      struktur: liste.some((p) => p.zugang.struktur === 'hoch') ? 'hoch' : 'normal',
      quelle: [],
    },
    ziele,
    erreicht: (jung.erreicht ?? []).filter((c) => liste.every((p) => (p.erreicht ?? []).includes(c))),
    themen: liste.flatMap((p) => p.themen ?? []),
    vorsicht: union((p) => p.vorsicht),
    achtung: union((p) => p.achtung),
    hilft: union((p) => p.hilft),
    interessen: [...interessen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k]) => k),
    wochenziel: null,
    gemacht: liste.flatMap((p) => p.gemacht ?? []),
    folge: null,
    vorlieben: null,
    rituale: undefined,
    wissen: undefined,
    rechte: { speichern: liste.every((p) => p.rechte.speichern), rueckmelden: liste.every((p) => p.rechte.rueckmelden) },
    // in der Gruppe lernt Passgenau nicht je Kind mit (wer was gemacht hat, lässt sich nicht trennen)
    lernen: false,
    zugangBestaetigt: liste.every((p) => p.zugangBestaetigt !== false),
    seed: liste.map((p) => p.seed ?? p.ref).join('+'),
    dichte: liste.some((p) => p.dichte === 'reich') ? 'reich' : liste.some((p) => p.dichte === 'mittel') ? 'mittel' : 'duenn',
    gruppe: liste.map((p) => ({ ref: p.ref, vorname: p.vorname, anrede: p.anrede, alterJahre: p.alterJahre, stufen: p.stufen, layout: p.layout, sprache: p.sprache, zugang: p.zugang, ziele: (p.ziele ?? []).map((z) => z.code) })),
  }
}

/** Profil für das Blatt eines Kindes der Gruppe: gemeinsame Vorsicht, eigene Stufe, Gestaltung, Sprache und Zugang. */
export function mitgliedProfil(p: Profil, m: GruppenMitglied): Profil {
  return { ...p, ref: m.ref, vorname: m.vorname, anrede: m.anrede, alterJahre: m.alterJahre, stufen: m.stufen, layout: m.layout, sprache: m.sprache, zugang: m.zugang }
}

const ROLLEN: Record<Sprache, string[]> = {
  de: ['Zeit im Blick', 'Material', 'Sprecher/in', 'Mutmacher/in', 'Fragen-Profi', 'Ordnung'],
  fr: ['gardien·ne du temps', 'matériel', 'porte-parole', 'encourageur·se', 'pro des questions', 'rangement'],
}

/** Rollen der Sitzung: jedes Kind eine Rolle, jede Sitzung eine Stelle weiter (Vornamen nur auf dem Planblatt). */
export function gruppenRollen(p: Profil, nr: number, sp: Sprache): string | null {
  const g = p.gruppe ?? []
  if (g.length < 2) return null
  const r = ROLLEN[sp]
  const teile = g.map((m, i) => `${r[(i + nr - 1) % r.length]} – ${m.vorname || (sp === 'fr' ? `enfant ${i + 1}` : `Kind ${i + 1}`)}`)
  return sp === 'fr' ? `Rôles du jour (changent à chaque séance) : ${teile.join(' · ')}` : `Rollen heute (wechseln jede Sitzung): ${teile.join(' · ')}`
}
