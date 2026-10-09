// Passgenau – lernende Vorlieben (Konzept 6.3–6.8, Kritik P10, E-M12, E-M14, E-M15, T-S3): Beta-Zähler je Merkmal mit
// Halbwertszeit auf drei Ebenen (Kind, Fachkraft, Team). Erklärbar, zurücksetzbar, nie stärker als ±30 % (Weg 3 ±40 %).
import type { Ereignis, KatalogEintrag, Profil, Sprache, TeamZaehler, VorliebenFachkraft, VorliebenKind, VorliebenTeam, Zaehler } from '../typen'
import { tageZwischen, runde } from './hilfen'
import { FORMAT_NAME, themaByKey } from './vokabular'
import { aktuellerKatalog, artName, textVon, type Katalog } from './katalog'

export interface Vorlieben {
  kind: VorliebenKind | null
  ich: VorliebenFachkraft
  team: VorliebenTeam | null
}

export const HALBWERT = { kind: 120, ich: 180, team: 365 } as const
/** Gewicht der Ebenen in V (6.5) */
const EBENE_GEWICHT = { kind: 0.5, ich: 0.3, team: 0.2 } as const

export function laenge(typ: number): 'kurz' | 'mittel' | 'lang' {
  return typ <= 5 ? 'kurz' : typ <= 12 ? 'mittel' : 'lang'
}

/** Schlüssel eines Katalogeintrags mit Anteil g (6.3). */
export function schluessel(e: KatalogEintrag): [string, number][] {
  const out: [string, number][] = [[`baustein:${e.id}`, 1]]
  e.format.forEach((f, i) => out.push([`format:${f}`, i === 0 ? 0.6 : 0.3]))
  if (e.typ === 'baustein') {
    const art = e.art.find((a) => a !== 'aufgabe' && a !== 'spalten') ?? 'aufgabe'
    out.push([`art:${art}`, 0.4])
    out.push([`lesen:${e.lesemenge}`, 0.3], [`schreiben:${e.schreibmenge}`, 0.3])
    out.push(['quelle:blatt', 0.2])
  } else {
    out.push([`quelle:${e.quelle.art}`, 0.2])
  }
  if (e.thema[0]) out.push([`thema:${e.thema[0]}`, 0.3])
  out.push([`laenge:${laenge(e.dauer.typ)}`, 0.3])
  return out
}

function verblasst(z: Zaehler | undefined, H: number, heute: string): { a: number; b: number } {
  if (!z) return { a: 0, b: 0 }
  const f = Math.pow(0.5, Math.max(0, tageZwischen(z.t, heute)) / H)
  return { a: z.a * f, b: z.b * f }
}

export interface Vorliebe {
  /** Richtung (2m − 1) ohne Vertrauen */
  roh: number
  /** Vertrauen c = (a + b) / (a + b + 4) */
  c: number
  /** p = roh · c ∈ [−1, 1] (6.3) */
  p: number
  a: number
  b: number
}

/** Vorliebe einer Ebene für einen Schlüssel (Prior a₀ = b₀ = 1, Kaltstart verschiebt ihn). */
export function vorliebe(v: Vorlieben, ebene: 'kind' | 'ich' | 'team', key: string, heute: string, prior?: Record<string, [number, number]>): Vorliebe {
  let a = 0
  let b = 0
  if (ebene === 'team') {
    if (!v.team || v.team.personen < 3) return { roh: 0, c: 0, p: 0, a: 0, b: 0 }
    const t = v.team.z[key]
    if (!t) return { roh: 0, c: 0, p: 0, a: 0, b: 0 }
    a = t.geklappt + 0.5 * t.teils + 0.5 * t.hoch
    b = t.nicht + 0.5 * t.teils + 0.5 * t.runter
  } else {
    const ebeneDaten = ebene === 'kind' ? v.kind : v.ich
    if (!ebeneDaten) return { roh: 0, c: 0, p: 0, a: 0, b: 0 }
    const z = verblasst(ebeneDaten.z[key], HALBWERT[ebene], heute)
    a = z.a
    b = z.b
  }
  const [a0, b0] = (ebene === 'kind' ? (prior?.[key] ?? v.kind?.prior?.[key]) : undefined) ?? [1, 1]
  const m = (a0 + a) / (a0 + b0 + a + b)
  // Kaltstart: der Prior zählt mit kleinem Vertrauen, auch ohne Ereignisse
  const extra = a0 + b0 - 2
  const c = (a + b + extra) / (a + b + extra + 4)
  const roh = 2 * m - 1
  return { roh, c, p: roh * c, a, b }
}

/** Vorliebenwert V(b) ∈ [−1, 1] (6.5 mit Vertrauensgewichtung nach T-S3: ohne Daten wandert das Gewicht weiter). */
export function V(e: KatalogEintrag, v: Vorlieben, heute: string, prior?: Record<string, [number, number]>, ohneKind = false): number {
  let summe = 0
  let gewicht = 0
  for (const [key, g] of schluessel(e)) {
    const k = ohneKind ? null : vorliebe(v, 'kind', key, heute, prior)
    const i = vorliebe(v, 'ich', key, heute)
    // Team nur für Bausteine und Vorlagen (6.9 speichert nur diese Zähler)
    const t = key.startsWith('baustein:') ? vorliebe(v, 'team', key, heute) : null
    const zaehler = EBENE_GEWICHT.kind * (k?.c ?? 0) * (k?.roh ?? 0) + EBENE_GEWICHT.ich * i.c * i.roh + EBENE_GEWICHT.team * (t?.c ?? 0) * (t?.roh ?? 0)
    const nenner = EBENE_GEWICHT.kind * (k?.c ?? 0) + EBENE_GEWICHT.ich * i.c + EBENE_GEWICHT.team * (t?.c ?? 0) + 0.1
    summe += g * (zaehler / nenner)
    gewicht += g
  }
  return gewicht ? Math.max(-1, Math.min(1, summe / gewicht)) : 0
}

/** Vertrauen der Kind-Ebene in die Formate eines Eintrags (für die Erkundung: am wenigsten Bekanntes zuerst). */
export function vertrauenKind(e: KatalogEintrag, v: Vorlieben, heute: string): number {
  if (!v.kind || !e.format.length) return 0
  return e.format.reduce((s, f) => s + vorliebe(v, 'kind', `format:${f}`, heute).c, 0) / e.format.length
}

/** Kaltstart der Kind-Ebene aus dem Profil (6.4): Interessen, Zugang, Alter. */
export function kaltstart(p: Profil): Record<string, [number, number]> {
  const pr: Record<string, [number, number]> = {}
  const plus = (k: string, a: number, b: number) => {
    const x = pr[k] ?? [1, 1]
    pr[k] = [x[0] + a, x[1] + b]
  }
  const I: Record<string, string> = { zeichnen: 'malen', musik: 'musik', tanzen: 'bewegung', fussball: 'bewegung', basketball: 'bewegung', bauen: 'basteln', basteln: 'basteln', gaming: 'spiel', lesen: 'geschichte', natur: 'sinne', tiere: 'karten' }
  for (const i of p.interessen) if (I[i]) plus(`format:${I[i]}`, 1, 0)
  if (p.zugang.schreiben <= 1) plus('format:schreiben', 0, 1)
  if (p.alterJahre <= 7) {
    plus('format:bewegung', 0.5, 0)
    plus('format:spiel', 0.5, 0)
  }
  for (const [k, ab] of Object.entries(p.vorlieben?.prior ?? {})) pr[k] = ab
  return pr
}

// --- Rückmelden (6.3, 6.8) ------------------------------------------------------------------------------------------------

function tagesDatum(t: string): string {
  return t.slice(0, 10)
}

function schreibe(ebene: VorliebenKind | VorliebenFachkraft, key: string, w: number, g: number, H: number, heute: string): void {
  if (!w || !g) return
  const z = verblasst(ebene.z[key], H, heute)
  if (w > 0) z.a += w * g
  else z.b += -w * g
  ebene.z[key] = { a: runde(z.a, 3), b: runde(z.b, 3), t: heute }
}

function tags(e: Ereignis, eintragRef?: KatalogEintrag): [string, number][] {
  if (eintragRef) return schluessel(eintragRef)
  const out: [string, number][] = []
  if (e.baustein) out.push([`baustein:${e.baustein}`, 1])
  ;(e.tags.format ?? []).forEach((f, i) => out.push([`format:${f}`, i === 0 ? 0.6 : 0.3]))
  if (e.tags.thema?.[0]) out.push([`thema:${e.tags.thema[0]}`, 0.3])
  if (e.tags.laenge) out.push([`laenge:${e.tags.laenge}`, 0.3])
  if (e.tags.lesen !== undefined) out.push([`lesen:${e.tags.lesen}`, 0.3])
  if (e.tags.schreiben !== undefined) out.push([`schreiben:${e.tags.schreiben}`, 0.3])
  if (e.tags.quelle) out.push([`quelle:${e.tags.quelle}`, 0.2])
  return out
}

/** Belastende Bausteine (Belastung ≥ 1, Mut-Leiter …): Negatives wirkt nur auf den Baustein selbst (E-M14). */
function belastend(e?: KatalogEintrag): boolean {
  return !!e && (e.belastung >= 1 || (e.typ === 'baustein' && e.art.includes('leiter')))
}

function kopie(v: Vorlieben): Vorlieben {
  return JSON.parse(JSON.stringify(v)) as Vorlieben
}

function teamZaehlen(team: VorliebenTeam | null, key: string, art: Ereignis['art']): void {
  if (!team) return
  const t: TeamZaehler = team.z[key] ?? { n: 0, hoch: 0, runter: 0, geklappt: 0, teils: 0, nicht: 0 }
  t.n++
  if (art === 'daumen_hoch') t.hoch++
  else if (art === 'daumen_runter') t.runter++
  else if (art === 'geklappt' || art === 'beruhigt' || art === 'dabei') t.geklappt++
  else if (art === 'teils') t.teils++
  else if (art === 'nicht') t.nicht++
  team.z[key] = t
}

/** Ein Ereignis in die Zwischenspeicher der Vorlieben übernehmen. Ereignisse bleiben die Quelle der Wahrheit (6.9). */
export function rueckmelden(v: Vorlieben, e: Ereignis, eintragRef?: KatalogEintrag): Vorlieben {
  const n = kopie(v)
  const heute = tagesDatum(e.t)
  const keys = tags(e, eintragRef)
  const nurBaustein = keys.filter(([k]) => k.startsWith('baustein:'))
  const kind = n.kind
  const ich = n.ich
  // Krisentag oder Weg 3: nie negativ, und an der Kind-Ebene nur der Baustein und weg:leicht (P10, E-S3a)
  const krise = !!e.krisentag || e.weg === 'leicht'
  const doppel = e.erkundung ? 2 : 1
  const ritual = e.tags.rolle === 'ankommen' || e.tags.rolle === 'abschluss'
  const anteil = e.tags.rolle === 'kern' || e.tags.rolle === 'uebung' || !e.tags.rolle ? 1 : 0.5
  const anKind = (w: number, liste: [string, number][]) => {
    if (!kind) return
    if (krise && w < 0) return
    const l = krise ? [...nurBaustein, ['weg:leicht', 1] as [string, number]] : w < 0 && belastend(eintragRef) ? nurBaustein : liste
    for (const [k, g] of l) schreibe(kind, k, w * doppel, g, HALBWERT.kind, heute)
  }
  const anIch = (w: number, liste: [string, number][]) => {
    if (krise && w < 0) return
    const l = w < 0 && belastend(eintragRef) ? nurBaustein : liste
    for (const [k, g] of l) schreibe(ich, k, w * doppel, g, HALBWERT.ich, heute)
  }
  switch (e.art) {
    case 'geklappt':
    case 'nicht':
    case 'teils': {
      if (ritual) break
      if (e.art === 'teils') {
        // ±0: a und b je +1
        if (kind && !krise) for (const [k, g] of keys) {
          schreibe(kind, k, 1 * anteil, g, HALBWERT.kind, heute)
          schreibe(kind, k, -1 * anteil, g, HALBWERT.kind, heute)
        }
      } else {
        const w = (e.art === 'geklappt' ? 3 : -3) * anteil
        anKind(w, keys)
        anIch(w / 3, keys)
      }
      if (e.baustein) teamZaehlen(n.team, `baustein:${e.baustein}`, e.art)
      if (e.vorlage) teamZaehlen(n.team, `vorlage:${e.vorlage}`, e.art)
      break
    }
    case 'beruhigt':
    case 'dabei':
      if (!ritual) anKind(1, keys)
      if (e.baustein) teamZaehlen(n.team, `baustein:${e.baustein}`, e.art)
      break
    case 'nur-da':
    case 'abgebrochen':
    case 'gedruckt':
      break
    case 'ziel_richtung': {
      const w = e.richtung === 'gelingt' ? 1 : e.richtung === 'mit-hilfe' ? 0.5 : e.richtung === 'noch-nicht' ? -0.5 : 0
      anKind(w, keys)
      break
    }
    case 'daumen_hoch':
      anIch(1, keys)
      if (e.grund === 'passt-gut') anKind(1, keys)
      if (e.baustein) teamZaehlen(n.team, `baustein:${e.baustein}`, e.art)
      break
    case 'daumen_runter': {
      const b = e.baustein ? `baustein:${e.baustein}` : null
      const l = eintragRef ? laenge(eintragRef.dauer.typ) : e.tags.laenge
      const lesen = eintragRef?.typ === 'baustein' ? eintragRef.lesemenge : e.tags.lesen
      const schreiben = eintragRef?.typ === 'baustein' ? eintragRef.schreibmenge : e.tags.schreiben
      switch (e.grund) {
        case 'zu-lang':
          if (l) anIch(-1, [[`laenge:${l}`, 1]])
          if (b) anIch(-1, [[b, 0.3]])
          break
        case 'zu-kindlich':
          anKind(-1, [['stil:juenger', 1]])
          if (b) anIch(-1, [[b, 0.3]])
          break
        case 'zu-schwer':
          if (lesen !== undefined) anKind(-1, [[`lesen:${lesen}`, 1]])
          if (schreiben !== undefined) anKind(-1, [[`schreiben:${schreiben}`, 1]])
          break
        case 'zu-leicht':
          // E-M14: eine Stufe mehr zutrauen
          if (lesen !== undefined) anKind(1, [[`lesen:${Math.min(3, lesen + 1)}`, 1]])
          if (schreiben !== undefined) anKind(1, [[`schreiben:${Math.min(3, schreiben + 1)}`, 1]])
          anKind(1, [['stil:aelter', 1]])
          break
        case 'passt-nicht':
          if (b) anKind(-1, [[b, 1], ...(e.tags.thema?.[0] ? [[`thema:${e.tags.thema[0]}`, 0.3] as [string, number]] : [])])
          break
        case 'mag-nicht':
        default:
          if (b) anIch(-1, [[b, 1], ...(e.tags.format?.[0] ? [[`format:${e.tags.format[0]}`, 0.5] as [string, number]] : [])])
      }
      if (e.baustein) teamZaehlen(n.team, `baustein:${e.baustein}`, e.art)
      break
    }
    case 'ersetzt': {
      if (e.baustein) anIch(-0.3, [[`baustein:${e.baustein}`, 1]])
      if (e.ersatz) {
        const k = aktuellerKatalog()
        const neu = k?.eintraege.get(e.ersatz)
        anIch(0.3, neu ? schluessel(neu) : [[`baustein:${e.ersatz}`, 1]])
      }
      break
    }
    case 'geloescht':
      anIch(-0.5, keys)
      break
    case 'kind_wahl':
      // Stimme des Kindes (E-M15): 1,5 auf die Kind-Ebene, die Hälfte auf die Fachkraft
      anKind(1.5, keys)
      anIch(0.75, keys)
      break
    case 'kind_daumen': {
      const w = e.wert >= 0 ? 1.5 : -1.5
      anKind(w, keys)
      anIch(w / 2, keys)
      break
    }
  }
  return n
}

// --- Was Passgenau gelernt hat (6.7) -------------------------------------------------------------------------------------

function schluesselText(k: Katalog, key: string, sprache: Sprache = 'de'): string {
  const [art, ...rest] = key.split(':')
  const wert = rest.join(':')
  switch (art) {
    case 'format':
      return FORMAT_NAME[wert] ?? wert
    case 'thema':
      return themaByKey.get(wert)?.name ?? wert
    case 'art':
      return artName(wert)
    case 'laenge':
      return wert === 'kurz' ? 'kurze Teile' : wert === 'mittel' ? 'mittellange Teile' : 'lange Teile'
    case 'lesen':
      return ['Teile ohne Text', 'wenig Text', 'mittlere Textmenge', 'viel Text'][Number(wert)] ?? key
    case 'schreiben':
      return ['nichts schreiben', 'Ankreuzen und Wörter', 'kurze Sätze schreiben', 'längere Schreibaufgaben'][Number(wert)] ?? key
    case 'quelle':
      return { blatt: 'Arbeitsblätter', kurs: 'Skills-Schritte', foerderfach: 'Förderfach', material: 'Materialien', spielschule: 'Spielschule', crew: 'CREW-Spiele', freude: 'Freude & Beziehung', ritual: 'Rituale', praxis: 'Aus der Praxis' }[wert] ?? wert
    case 'stil':
      return wert === 'juenger' ? 'jüngere Gestaltung' : wert === 'aelter' ? 'etwas mehr zutrauen' : wert
    case 'weg':
      return 'leichte Stunden'
    case 'baustein': {
      const e = k.eintraege.get(wert)
      return e ? textVon(e, sprache).titel : wert
    }
    default:
      return key
  }
}

/** Die stärksten Merkmale einer Ebene in Alltagssprache (fünf positive, fünf negative). Unter fünf Rückmeldungen
 *  „noch unklar“, nie „eher nicht“, sondern „braucht Unterstützung“ (P10, T-S3f). */
export function gelernt(v: Vorlieben, ebene: 'kind' | 'ich' | 'team', k: Katalog): { text: string; wert: number; n: number }[] {
  const heute = new Date().toISOString().slice(0, 10)
  const daten: Record<string, unknown> = ebene === 'kind' ? (v.kind?.z ?? {}) : ebene === 'ich' ? v.ich.z : (v.team?.z ?? {})
  const liste = Object.keys(daten).map((key) => {
    const x = vorliebe(v, ebene, key, heute)
    return { key, p: x.p, a: x.a, b: x.b }
  })
  const pos = liste.filter((x) => x.p > 0.05).sort((a, b) => b.p - a.p).slice(0, 5)
  const neg = liste.filter((x) => x.p < -0.05).sort((a, b) => a.p - b.p).slice(0, 5)
  return [...pos, ...neg].map((x) => {
    const n = Math.round(x.a + x.b)
    const gut = Math.round(x.a)
    const urteil = n < 5 ? 'noch unklar' : x.p > 0 ? 'klappt meistens' : 'braucht Unterstützung'
    const text = ebene === 'ich' ? `${schluesselText(k, x.key)}: ${x.p > 0 ? 'nimmst du oft' : 'nimmst du selten'}` : `${schluesselText(k, x.key)}: ${urteil}${n >= 5 ? ` – ${gut} von ${n}` : ''}`
    return { text, wert: runde(x.p, 2), n }
  })
}

/** Zurücksetzen je Merkmal oder ganz (6.7). Die Kind-Ebene behält ihren Kaltstart (Prior). */
export function zuruecksetzen(v: Vorlieben, ebene: 'kind' | 'ich', schluessel?: string): Vorlieben {
  const n = kopie(v)
  const heute = new Date().toISOString().slice(0, 10)
  const e = ebene === 'kind' ? n.kind : n.ich
  if (!e) return n
  if (schluessel) delete e.z[schluessel]
  else {
    e.z = {}
    e.zurueckgesetzt = heute
  }
  return n
}
