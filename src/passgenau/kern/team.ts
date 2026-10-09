// Passgenau – „Aus der Praxis“: fürs Team teilen (8.2, E-M5) und übernehmen (8.4, E-M7). Die Vorlage ist eine
// Whitelist (VorlagenInhalt): nur Verweise, Prüfsummen, Rollen, Minuten, Phasen, Blatt-Teile und geprüfte Texte.
// Alles Abgeleitete (Altersband, Ziele, Themen, Formate, Sprachen) kommt nur aus den Katalog-Metadaten.
import type { Auftrag, KatalogEintrag, Plan, PlanSchritt, PraxisVorlage, Profil, Sitzung, VorlagenInhalt } from '../typen'
import { hash8, norm } from './hilfen'
import { aktuellerKatalog, textVon, type Katalog } from './katalog'
import { kontext, pruefe } from './regeln'
import { alternativen, ersetzen } from './alternativen'
import { interesseName } from './vokabular'
import type { Vorlieben } from './vorlieben'

const BAENDER: [number, number, string][] = [[3, 5, '3–5'], [6, 8, '6–8'], [9, 11, '9–11'], [12, 14, '12–14'], [15, 99, '15+']]

function band(von: number, bis: number): string {
  const treffer = BAENDER.filter(([a, b]) => a <= bis && b >= von)
  if (!treffer.length) return ''
  const erste = treffer[0]
  const letzte = treffer[treffer.length - 1]
  if (erste === letzte) return erste[2]
  return letzte[1] >= 99 ? `${erste[0]}+` : `${erste[0]}–${letzte[1]}`
}

/** Abstand ≤ 1 (eine Einfügung, Auslassung oder Vertauschung eines Zeichens). */
function fastGleich(a: string, b: string): boolean {
  if (a === b) return true
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0
  let j = 0
  let diff = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++diff > 1) return false
    if (a.length > b.length) i++
    else if (b.length > a.length) j++
    else {
      i++
      j++
    }
  }
  return diff + (a.length - i) + (b.length - j) <= 1
}

const NAME_ENDUNG = /(s|'s|’s|chen|lein|li|i|y|ie)$/

/** Ist ein Wort der Name (auch Genitiv, Kleinschreibung, Akzente, Verkleinerung, ein Tippfehler bei Namen ab 4 Buchstaben)? */
function istName(wort: string, name: string): boolean {
  const w = norm(wort).replace(/[’']/g, "'")
  const n = norm(name)
  if (w === n) return true
  const stamm = w.replace(NAME_ENDUNG, '')
  if (stamm === n || (w.startsWith(n) && NAME_ENDUNG.test(w.slice(n.length)))) return true
  if (n.length < 4) return false
  return fastGleich(w, n) || fastGleich(stamm, n)
}

function ersetzeNamen(text: string, p: Profil): string {
  const namen = [p.anrede, p.vorname].filter((x): x is string => !!x && x.length > 1)
  let t = text.replace(/[\p{L}][\p{L}'’]*/gu, (wort) => (namen.some((n) => istName(wort, n)) ? '{NAME}' : wort))
  for (const i of p.interessen) {
    for (const sp of ['de', 'fr'] as const) {
      const n = interesseName(i, sp)
      if (n.length > 2) t = t.replace(new RegExp(`(?<![\\p{L}])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'giu'), '{INTERESSE}')
    }
  }
  if (p.wochenziel && p.wochenziel.length > 8) t = t.split(p.wochenziel).join('{WOCHENZIEL}')
  return t
}

/** Plan → Vorlage ohne Kind (E-M5). Eigene Texte werden gelistet (die Oberfläche lässt sie einzeln bestätigen); ihre Pfade
 *  sind relativ zur Vorlage (`inhalt.sitzungen.<i>.schritte.<j>.ueber.<textpfad>`, PROTOKOLL.md) – wie im Hub. */
export function fuerTeam(plan: Plan, p: Profil): { vorlage: Omit<PraxisVorlage, 'id' | 'version' | 'status' | 'erstellt'>; eigeneTexte: { pfad: string; text: string }[] } {
  const eigeneTexte: { pfad: string; text: string }[] = []
  // Texte, die der Planer selbst in eigene Schritte (pg:einstieg, pg:rueckblick) schreibt, sind keine eigenen Texte der
  // Fachkraft: sie bleiben aus der Vorlage (der Schritt nimmt dann seinen festen Text)
  const ueber = (u: Record<string, string> | undefined, pfad: string, ref = '', herkunft?: Record<string, 'eigen' | 'vorlage'>) => {
    if (!u) return undefined
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(u)) {
      if (ref.startsWith('pg:') && herkunft?.[k] !== 'eigen') continue
      out[k] = ersetzeNamen(v, p)
      eigeneTexte.push({ pfad: `${pfad}.${k}`, text: out[k] })
    }
    return Object.keys(out).length ? out : undefined
  }
  const inhalt: VorlagenInhalt = {
    weg: plan.weg,
    n: plan.sitzungen.length,
    dauer: plan.dauer,
    sitzungen: plan.sitzungen.map((s, si) => ({
      phase: s.phase,
      schritte: s.schritte.map((x, xi) => {
        const u = ueber(x.ueber, `inhalt.sitzungen.${si}.schritte.${xi}.ueber`, x.ref, x.ueberHerkunft)
        return { ref: x.ref, h: x.h, rolle: x.rolle, min: x.min, ...(u ? { ueber: u, ueberHerkunft: Object.fromEntries(Object.keys(u).map((k) => [k, 'eigen' as const])) } : {}) }
      }),
      ...(s.blatt
        ? {
            blatt: {
              titel: ersetzeNamen(s.blatt.titel, p),
              bausteine: s.blatt.bausteine.map((b, bi) => {
                const u = ueber(b.ueber, `inhalt.sitzungen.${si}.blatt.bausteine.${bi}.ueber`)
                return { ref: b.ref, h: b.h, ...(u ? { ueber: u, ueberHerkunft: Object.fromEntries(Object.keys(u).map((k) => [k, 'eigen' as const])) } : {}), ...(b.ausgeblendet?.length ? { ausgeblendet: b.ausgeblendet } : {}) }
              }),
            },
          }
        : {}),
    })),
  }
  // Abgeleitetes nur aus dem Katalog (nie aus Profil, plan.ziele oder Notizthemen)
  const k = aktuellerKatalog()
  const eintraege: KatalogEintrag[] = []
  if (k)
    for (const s of inhalt.sitzungen) {
      for (const x of s.schritte) {
        const e = k.eintraege.get(x.ref)
        if (e && !e.id.startsWith('pg:')) eintraege.push(e)
      }
      for (const b of s.blatt?.bausteine ?? []) {
        const e = k.eintraege.get(b.ref)
        if (e) eintraege.push(e)
      }
    }
  // Altersband: die festen Bänder, die die meisten Teile abdecken (Rituale für alle Alter zählen nicht) – nie das Alter des Kindes
  const mitBand = eintraege.filter((e) => e.alter.bis - e.alter.von < 12)
  const deckung = BAENDER.map(([a, b]) => mitBand.filter((e) => e.alter.von <= b && e.alter.bis >= a).length)
  const best = Math.max(0, ...deckung)
  const baender = BAENDER.filter((_, i) => best > 0 && deckung[i] >= 0.8 * best)
  const von = baender.length ? baender[0][0] : 3
  const bis = baender.length ? Math.min(18, baender[baender.length - 1][1]) : 18
  const zaehle = (l: string[]) => [...l.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]).map(([x]) => x)
  const kindText = eintraege.filter((e) => e.typ === 'baustein')
  return {
    vorlage: {
      titel: ersetzeNamen(plan.titel, p),
      von: null,
      altersband: band(von, bis),
      ziele: zaehle(eintraege.flatMap((e) => e.eldib.filter((x) => x.gewicht === 1).map((x) => x.code))).slice(0, 4),
      themen: zaehle(eintraege.flatMap((e) => e.thema)).slice(0, 4),
      formate: zaehle(eintraege.flatMap((e) => e.format)).slice(0, 5),
      dauer: plan.dauer,
      n: inhalt.n,
      sprachen: kindText.length && kindText.every((e) => e.sprache.fr) ? ['de', 'fr'] : ['de'],
      inhalt,
      // Freigabe (E-M8): Belastung 2 oder heikle Bausteine → nur Psychologin oder Responsable
      belastung: eintraege.reduce<0 | 1 | 2>((m, e) => (e.belastung > m ? e.belastung : m), 0),
      sensibel: eintraege.some((e) => !!e.sensibel),
    },
    eigeneTexte,
  }
}

/** Vorlage für ein Kind übernehmen (8.4): Zugang, Sprache, Vorsicht, Gemachtes und Rituale anpassen – sichtbar als Liste. */
export function uebernehmen(k: Katalog, p: Profil, vorlage: PraxisVorlage, v: Vorlieben): { plan: Plan; angepasst: string[] } {
  const angepasst: string[] = []
  const inhalt = vorlage.inhalt
  const ziele = vorlage.ziele.filter((z) => p.ziele.some((x) => x.code === z))
  const a: Auftrag = { weg: inhalt.weg, ziele: ziele.length ? ziele : vorlage.ziele, n: inhalt.n, dauer: inhalt.dauer as Auftrag['dauer'], sozialform: 'einzeln', sprache: p.sprache.blatt, datum: new Date().toISOString().slice(0, 10) }
  const c = kontext(k, p, a, v)
  const vorsicht = p.vorsicht.length > 0
  let textGesperrt = false
  const sitzungen: Sitzung[] = inhalt.sitzungen.map((s, i) => ({
    nr: i + 1,
    phase: s.phase,
    status: 'geplant',
    datum: null,
    schritte: s.schritte.map((x) => {
      const ps: PlanSchritt = { ref: x.ref, h: x.h, rolle: x.rolle, min: x.min }
      if (x.ueber && !vorsicht) {
        ps.ueber = x.ueber
        ps.ueberHerkunft = Object.fromEntries(Object.keys(x.ueber).map((key) => [key, 'vorlage' as const]))
      } else if (x.ueber) textGesperrt = true
      return ps
    }),
    blatt: s.blatt
      ? {
          titel: s.blatt.titel,
          ziel: false,
          bausteine: s.blatt.bausteine.map((b) => {
            const t: { ref: string; h: string; ueber?: Record<string, string>; ausgeblendet?: string[]; ueberHerkunft?: Record<string, 'eigen' | 'vorlage'> } = { ref: b.ref, h: b.h }
            if (b.ausgeblendet) t.ausgeblendet = b.ausgeblendet
            if (b.ueber && !vorsicht) {
              t.ueber = b.ueber
              t.ueberHerkunft = Object.fromEntries(Object.keys(b.ueber).map((key) => [key, 'vorlage' as const]))
            } else if (b.ueber) textGesperrt = true
            return t
          }),
        }
      : null,
    rueckmeldung: null,
  }))
  if (textGesperrt) angepasst.push('Texte der Autorin nicht übernommen – sie sind nicht auf die Vorsicht bei diesem Kind geprüft (Original genommen).')
  let plan: Plan = {
    id: 'pl-' + hash8(`${vorlage.id}@${vorlage.version}|${c.seed}`),
    erstellt: a.datum,
    weg: inhalt.weg,
    gewichte: 'V1',
    titel: vorlage.titel,
    ziele: a.ziele,
    n: sitzungen.length,
    dauer: inhalt.dauer,
    vorlage: `${vorlage.id}@${vorlage.version}`,
    kinder: ['self'],
    auftrag: a,
    sitzungen,
    katalogStand: k.stand,
  }
  // Rituale des Kindes einsetzen
  for (const rolle of ['ankommen', 'abschluss'] as const) {
    const ref = p.rituale?.[rolle]
    const e = ref ? k.eintraege.get(ref) : undefined
    if (!e) continue
    let ersetzt = false
    plan = { ...plan, sitzungen: plan.sitzungen.map((s) => ({ ...s, schritte: s.schritte.map((x) => (x.rolle === rolle && x.ref !== e.id ? ((ersetzt = true), { ...x, ref: e.id, h: e.h, ueber: undefined, ueberHerkunft: undefined }) : x)) })) }
    if (ersetzt) angepasst.push(`Ritual „${textVon(e, 'de').titel}“ von ${p.vorname ?? 'dem Kind'} eingesetzt (${rolle === 'ankommen' ? 'Ankommen' : 'Abschluss'}).`)
  }
  // Teile prüfen: fehlt, Zugang, Vorsicht, schon gemacht → gleichwertige Alternative
  for (const s of plan.sitzungen) {
    s.schritte.forEach((x, xi) => {
      if (x.ref.startsWith('pg:') || x.rolle === 'ankommen' || x.rolle === 'abschluss') return
      const e = k.eintraege.get(x.ref)
      const grund = !e ? 'nicht mehr im Katalog' : pruefe(e, c, { rolle: x.rolle })
      if (!grund) {
        if (e && c.sprache === 'fr' && e.typ === 'schritt' && !e.fr) angepasst.push(`Sitzung ${s.nr}: „${textVon(e, 'de').titel}“ nur auf Deutsch.`)
        return
      }
      const alt = alternativen(k, p, plan, { sitzung: s.nr, schritt: xi }, v, 1)[0]
      if (alt) {
        plan = ersetzen(plan, { sitzung: s.nr, schritt: xi }, alt.eintrag)
        angepasst.push(`Sitzung ${s.nr}: „${e ? textVon(e, 'de').titel : x.ref}“ ersetzt durch „${textVon(alt.eintrag, 'de').titel}“ (${grund}).`)
      } else angepasst.push(`Sitzung ${s.nr}: „${e ? textVon(e, 'de').titel : x.ref}“ passt nicht (${grund}) – im Baukasten ersetzen.`)
    })
    s.blatt?.bausteine.forEach((b, bi) => {
      if (b.ref.startsWith('pg:')) return
      const e = k.eintraege.get(b.ref)
      const grund = !e ? 'nicht mehr im Katalog' : pruefe(e, c, { blatt: true })
      if (!grund) {
        if (e && c.sprache === 'fr' && !e.sprache.fr) angepasst.push(`Sitzung ${s.nr}, Blatt: „${textVon(e, 'de').titel}“ nur auf Deutsch.`)
        return
      }
      const alt = alternativen(k, p, plan, { sitzung: s.nr, blatt: bi }, v, 1)[0]
      if (alt) {
        plan = ersetzen(plan, { sitzung: s.nr, blatt: bi }, alt.eintrag)
        angepasst.push(`Sitzung ${s.nr}, Blatt: Teil ersetzt (${grund}).`)
      } else angepasst.push(`Sitzung ${s.nr}, Blatt: ein Teil passt nicht (${grund}) – im Baukasten ersetzen.`)
    })
  }
  for (const s of plan.sitzungen) s.status = 'geplant'
  if (p.anrede) angepasst.push('Vorname wird eingesetzt, wo die Vorlage {NAME} hat.')
  if (p.interessen[0]) angepasst.push(`Beispiele mit ${interesseName(p.interessen[0])} (Interesse), wo die Vorlage {INTERESSE} hat.`)
  return { plan, angepasst: [...new Set(angepasst)] }
}

/** Rückruf (E-M9): Ist die Vorlage eines Plans zurückgezogen oder ausgeblendet (`praxis-liste` → `zurueckgezogen`), gehen alle
 *  Texte mit Herkunft „vorlage“ auf das Original zurück; eigene Texte bleiben. `geaendert`: Hinweis im Plan zeigen
 *  („Text aus zurückgezogener Vorlage entfernt“). Gedrucktes lässt sich nicht zurückholen. */
export function vorlageZurueckgezogen(plan: Plan, zurueckgezogen: string[]): { plan: Plan; geaendert: boolean } {
  const v = plan.vorlage
  if (!v || !zurueckgezogen.some((id) => v === id || v.startsWith(id + '@'))) return { plan, geaendert: false }
  let geaendert = false
  let hier = false
  const ohne = <T extends { ueber?: Record<string, string>; ueberHerkunft?: Record<string, 'eigen' | 'vorlage'> }>(t: T): T => {
    if (!t.ueber || !t.ueberHerkunft || !Object.values(t.ueberHerkunft).includes('vorlage')) return t
    geaendert = hier = true
    const ueber: Record<string, string> = {}
    const herkunft: Record<string, 'eigen' | 'vorlage'> = {}
    for (const [k, text] of Object.entries(t.ueber))
      if (t.ueberHerkunft[k] !== 'vorlage') {
        ueber[k] = text
        if (t.ueberHerkunft[k]) herkunft[k] = t.ueberHerkunft[k]
      }
    const { ueber: _u, ueberHerkunft: _h, ...rest } = t
    void _u
    void _h
    return (Object.keys(ueber).length ? { ...rest, ueber, ueberHerkunft: herkunft } : rest) as T
  }
  const sitzungen = plan.sitzungen.map((s): Sitzung => {
    hier = false
    const neu: Sitzung = { ...s, schritte: s.schritte.map(ohne), blatt: s.blatt ? { ...s.blatt, bausteine: s.blatt.bausteine.map(ohne) } : null }
    return hier ? { ...neu, hinweise: [...new Set([...(s.hinweise ?? []), 'Text aus zurückgezogener Vorlage entfernt.'])] } : s
  })
  return geaendert ? { plan: { ...plan, sitzungen }, geaendert } : { plan, geaendert }
}
