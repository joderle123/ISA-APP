// Passgenau – „Aus der Praxis“: fürs Team teilen (8.2, E-M5) und übernehmen (8.4, E-M7). Die Vorlage ist eine
// Whitelist (VorlagenInhalt): nur Verweise, Prüfsummen, Rollen, Minuten, Phasen, Blatt-Teile und geprüfte Texte.
// Alles Abgeleitete (Altersband, Ziele, Themen, Formate, Sprachen) kommt nur aus den Katalog-Metadaten.
import type { Auftrag, KatalogEintrag, Plan, PlanSchritt, PraxisVorlage, Profil, Sitzung, VorlagenInhalt } from '../typen'
import { hash8 } from './hilfen'
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

function ersetzeNamen(text: string, p: Profil): string {
  let t = text
  for (const name of [p.anrede, p.vorname].filter((x): x is string => !!x && x.length > 1)) {
    const re = new RegExp(`(?<![\\p{L}])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(s|’s|'s)?(?![\\p{L}])`, 'giu')
    t = t.replace(re, '{NAME}')
  }
  for (const i of p.interessen) {
    for (const sp of ['de', 'fr'] as const) {
      const n = interesseName(i, sp)
      if (n.length > 2) t = t.replace(new RegExp(`(?<![\\p{L}])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'giu'), '{INTERESSE}')
    }
  }
  if (p.wochenziel && p.wochenziel.length > 8) t = t.split(p.wochenziel).join('{WOCHENZIEL}')
  return t
}

/** Plan → Vorlage ohne Kind (E-M5). Eigene Texte werden gelistet (die Oberfläche lässt sie einzeln bestätigen). */
export function fuerTeam(plan: Plan, p: Profil): { vorlage: Omit<PraxisVorlage, 'id' | 'version' | 'status' | 'erstellt'>; eigeneTexte: { pfad: string; text: string }[] } {
  const eigeneTexte: { pfad: string; text: string }[] = []
  const ueber = (u: Record<string, string> | undefined, pfad: string) => {
    if (!u) return undefined
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(u)) {
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
        const u = ueber(x.ueber, `sitzungen.${si}.schritte.${xi}.ueber`)
        return { ref: x.ref, h: x.h, rolle: x.rolle, min: x.min, ...(u ? { ueber: u, ueberHerkunft: Object.fromEntries(Object.keys(u).map((k) => [k, 'eigen' as const])) } : {}) }
      }),
      ...(s.blatt
        ? {
            blatt: {
              titel: ersetzeNamen(s.blatt.titel, p),
              bausteine: s.blatt.bausteine.map((b, bi) => {
                const u = ueber(b.ueber, `sitzungen.${si}.blatt.bausteine.${bi}.ueber`)
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
  const von = Math.max(3, ...eintraege.map((e) => e.alter.von))
  const bis = Math.min(18, ...eintraege.map((e) => e.alter.bis))
  const zaehle = (l: string[]) => [...l.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]).map(([x]) => x)
  const kindText = eintraege.filter((e) => e.typ === 'baustein')
  return {
    vorlage: {
      titel: ersetzeNamen(plan.titel, p),
      von: null,
      altersband: eintraege.length && von <= bis ? band(von, bis) : '',
      ziele: zaehle(eintraege.flatMap((e) => e.eldib.filter((x) => x.gewicht === 1).map((x) => x.code))).slice(0, 4),
      themen: zaehle(eintraege.flatMap((e) => e.thema)).slice(0, 4),
      formate: zaehle(eintraege.flatMap((e) => e.format)).slice(0, 5),
      dauer: plan.dauer,
      n: inhalt.n,
      sprachen: kindText.length && kindText.every((e) => e.sprache.fr) ? ['de', 'fr'] : ['de'],
      inhalt,
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
