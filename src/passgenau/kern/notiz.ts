// Passgenau – Notiz nach der Stunde (2.7, P6/E-M1/T-M6): nur, was geklickt wurde. Ohne Ziel-Richtung kein
// „gelingt/mit Unterstützung“-Satz (sonst liest beobachtung.js ihn als PEI-Richtung). Keine Werte, keine Diagnosen.
import type { Plan, Profil, Rueckmeldung } from '../typen'
import { aktuellerKatalog, eldibKurz, textVon } from './katalog'

const ERGEBNIS: Record<Rueckmeldung['ergebnis'], string> = {
  geklappt: 'Hat geklappt.',
  teils: 'Hat teils geklappt.',
  nicht: 'Hat nicht geklappt.',
  beruhigt: 'Hat sich beruhigt.',
  dabei: 'War dabei.',
  'nur-da': 'Wollte nur da sein.',
  abgebrochen: 'Stunde abgebrochen.',
}

const RICHTUNG: Record<string, string> = { gelingt: 'gelingt', 'mit-hilfe': 'gelingt mit Unterstützung', 'noch-nicht': 'gelingt noch nicht' }

export function notizText(p: Profil, plan: Plan, nr: number, r: Plan['sitzungen'][number]['rueckmeldung']): string {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return ''
  const k = aktuellerKatalog()
  const titel = (ref: string, t?: string) => {
    const e = k?.eintraege.get(ref)
    return e ? textVon(e, 'de').titel : (t ?? '')
  }
  const leicht = plan.weg === 'leicht' || s.phase === 'leicht'
  const kopf = leicht ? `Passgenau – Beziehungszeit (${plan.dauer} Min.)` : `Passgenau ${plan.n > 1 ? `${nr}/${plan.n} ` : ''}(${plan.dauer} Min.)`
  const teile = s.schritte
    .filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss' && !x.ref.startsWith('pg:pause'))
    .map((x) => (x.ref === 'pg:blatt' ? `Blatt ‚${s.blatt?.titel ?? x.t ?? 'Blatt'}‘` : titel(x.ref, x.t)))
    .filter(Boolean)
  const saetze: string[] = [`${kopf}: ${teile.join(', ')}.`]
  if (r) {
    saetze.push(ERGEBNIS[r.ergebnis])
    if (!leicht)
      for (const z of r.ziele ?? []) {
        if (!z.richtung || !RICHTUNG[z.richtung]) continue
        const kurz = k ? eldibKurz(k, z.code) : ''
        saetze.push(`${z.code}${kurz && kurz !== z.code ? ' ' + kurz : ''}: ${RICHTUNG[z.richtung]}.`)
      }
    if (r.kind?.wahl) saetze.push(`Hat gewählt: ${titel(r.kind.wahl, r.kind.wahl)}.`)
    if (r.kind?.daumen) saetze.push(`Daumen am Schluss: ${r.kind.daumen === 'hoch' ? 'hoch' : 'runter'}.`)
    const chips = (r.chips ?? []).map((c) => c.trim()).filter(Boolean)
    if (chips.length) saetze.push(chips.map((c, i) => (i === 0 ? c.charAt(0).toUpperCase() + c.slice(1) : c)).join(', ') + '.')
  }
  void p
  return saetze.join(' ')
}
