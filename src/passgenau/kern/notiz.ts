// Passgenau – Notiz nach der Stunde (2.7, P6/E-M1/T-M6): nur, was geklickt wurde. Ohne Ziel-Richtung kein
// „gelingt/mit Unterstützung“-Satz (sonst liest beobachtung.js ihn als PEI-Richtung). Keine Werte, keine Diagnosen.
// Den Text ins Dossier schreibt der HUB (hub-quellen/passgenau.js, notizText) – diese Fassung ist die Vorschau in der
// Toolbox und muss gleich aufgebaut sein (src/passgenau/PROTOKOLL.md, „rueckmeldung“).
import type { Plan, Profil, Rueckmeldung } from '../typen'
import { aktuellerKatalog, eldibKurz, textVon } from './katalog'

const ERGEBNIS: Record<Rueckmeldung['ergebnis'], string> = {
  geklappt: 'Hat geklappt',
  teils: 'Hat teils geklappt',
  nicht: 'Hat nicht geklappt',
  beruhigt: 'Hat sich beruhigt',
  dabei: 'War dabei',
  'nur-da': 'Wollte nur da sein',
  abgebrochen: 'Abgebrochen',
}

const RICHTUNG: Record<string, string> = { gelingt: 'gelingt', 'mit-hilfe': 'gelingt mit Unterstützung', 'noch-nicht': 'gelingt noch nicht' }

/** Beobachtungs-Chips nach der Stunde (2.7) – Schlüssel verbindlich, wie CHIPS im Hub (`hallo.chips`). Nichts vorbelegt. */
export const BEOBACHTUNG_CHIPS: [string, string][] = [
  ['mitgemacht', 'Hat mitgemacht'], ['pause', 'Brauchte eine Pause'], ['unruhig', 'War unruhig'], ['erzaehlt', 'Hat von sich erzählt'],
  ['neues', 'Hat etwas Neues ausprobiert'], ['hilfe', 'Hat Hilfe angenommen'], ['freude', 'Hatte sichtlich Freude'], ['konzentriert', 'War konzentriert dabei'],
  ['muede', 'War müde'], ['abgebrochen', 'Hat eine Aufgabe abgebrochen'], ['rueckzug', 'Hat sich zurückgezogen'], ['streit', 'Hatte Streit mit anderen'],
]
const CHIP = new Map(BEOBACHTUNG_CHIPS)

/** Titel eines Schritts (auch einer Wahl-Option) für Notiz und Anzeige: zuerst der gespeicherte Titel `t`, sonst der Katalog. */
export function schrittTitel(plan: Plan, nr: number, ref: string): string {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  for (const x of s?.schritte ?? []) {
    if (x.ref === ref && x.t) return x.t
    for (const w of x.wahl ?? []) if (w.ref === ref && w.t) return w.t
  }
  if (ref === 'pg:da-sein') return 'einfach da sein'
  const e = aktuellerKatalog()?.eintraege.get(ref)
  return e ? textVon(e, 'de').titel : ''
}

export function notizText(p: Profil, plan: Plan, nr: number, r: Plan['sitzungen'][number]['rueckmeldung']): string {
  void p
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return ''
  const k = aktuellerKatalog()
  const leicht = plan.weg === 'leicht'
  const kopf = `Passgenau${plan.n > 1 ? ` ${s.nr}/${plan.n}` : ''} (${plan.dauer} Min.)${leicht ? ' – Beziehungszeit' : ''}`
  // Titel der Schritte ohne Rituale, Pausen und „einfach da sein“; das Blatt an seinem Platz (pg:blatt), sonst am Ende
  const teile: string[] = []
  const blatt = s.blatt?.titel ? `Blatt „${s.blatt.titel}“` : ''
  let blattDa = false
  for (const x of s.schritte) {
    if (x.rolle === 'ankommen' || x.rolle === 'abschluss' || x.ref === 'pg:pause' || x.ref === 'pg:da-sein') continue
    if (x.ref === 'pg:blatt') {
      if (blatt && !blattDa) teile.push(blatt)
      blattDa = true
      continue
    }
    const t = x.t || schrittTitel(plan, nr, x.ref)
    if (t && !teile.includes(t) && teile.length < 6) teile.push(t)
  }
  if (blatt && !blattDa) teile.push(blatt)
  let text = `${kopf}${teile.length ? ': ' + teile.join(', ') : ''}.`
  if (!r) return text
  text += ` ${ERGEBNIS[r.ergebnis]}.`
  if (!leicht)
    for (const z of r.ziele ?? []) {
      if (!RICHTUNG[z.richtung]) continue
      const kurz = k ? eldibKurz(k, z.code) : ''
      text += ` ${z.code}${kurz && kurz !== z.code ? ' ' + kurz : ''}: ${RICHTUNG[z.richtung]}.`
    }
  const chips = (r.chips ?? []).map((c) => CHIP.get(c)).filter((c): c is string => !!c)
  if (chips.length) text += ` ${chips.join(', ')}.`
  if (r.kind?.wahl) text += ` Hat gewählt: ${schrittTitel(plan, nr, r.kind.wahl) || r.kind.wahl}.`
  if (r.kind?.daumen) text += ` Daumen am Schluss: ${r.kind.daumen === 'hoch' ? 'hoch' : 'runter'}.`
  return text
}
