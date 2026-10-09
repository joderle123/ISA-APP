// Passgenau – Abdeckungsbericht (T-M3): je ELDiB-Code × Stufe × Sprache × Rolle die Zahl gültiger Kandidaten für eine
// Einzelstunde (gleiche harte Regeln wie der Planer, ohne Lockerung). Ausgabe tmp/passgenau/abdeckung.json und .md.
// „Lücke“ = weniger als 3 Kandidaten. Die 30 häufigsten Ziele (Codes, auf die die meisten Quellen – Blätter, Einheiten,
// Materialien – zielen) prüft das Prüfskript streng: Kern oder Blatt mit < 3 Kandidaten ist dort ein Fehler.
// Aufruf: npm run passgenau:abdeckung [-- --aus=<ordner>]
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { KatalogEintrag, Sprache, Stufe } from '../src/passgenau/typen'
import type { Katalog } from '../src/passgenau/kern/katalog'
import { intern } from '../src/passgenau/kern/katalog'
import { STUFE_ALTER, STUFEN, stufenAbstand } from '../src/passgenau/kern/hilfen'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'

export const ROLLEN = ['kern', 'blatt', 'einstieg', 'reflexion'] as const
export type AbdeckungRolle = (typeof ROLLEN)[number]
const SPRACHEN: Sprache[] = ['de', 'fr']

/** ELDiB-Stufen, die bei Kindern einer Schulstufe als Ziel vorkommen (mit Entwicklungsverzögerung eine darunter). */
export const ELDIB_STUFEN: Record<Stufe, number[]> = { C1: [1, 2, 3], C2: [2, 3, 4], C3: [2, 3, 4], C4: [3, 4, 5], ES: [3, 4, 5] }

export interface AbdeckungZeile { code: string; stufe: Stufe; sprache: Sprache; rolle: AbdeckungRolle; n: number; primaer: number }

/** Für eine Einzelstunde grundsätzlich gültig (Alter, Sozialform, Zielgruppe, heikel, Katharsis) – ohne Kind-Daten. */
export function gueltig(e: KatalogEintrag, stufe: Stufe): boolean {
  if (stufenAbstand(stufe, e.stufen) >= 2) return false
  const [von, bis] = STUFE_ALTER[stufe]
  if (e.alter.bis + 1 < von || e.alter.von - 1 > bis) return false
  if (stufe === 'ES' && e.stufen.every((s) => s === 'C1' || s === 'C2')) return false
  if (e.einzeltauglich === 'nein') return false
  if (e.einzeltauglich === 'angepasst' && !(e.typ === 'schritt' && e.einzelvariante)) return false
  if (e.zielgruppe === 'fachkraft' || e.zielgruppe === 'eltern') return false
  if (e.sensibel === 'akut' || e.sensibel === 'kinderschutz') return false
  if (e.merkmale?.katharsis) return false
  if (e.typ === 'baustein' && e.material.includes('film')) return false
  return true
}

function passtRolle(e: KatalogEintrag, r: AbdeckungRolle): boolean {
  if (r === 'blatt') return e.typ === 'baustein' && !e.art.every((a) => a === 'info' || a === 'text' || a === 'geschichte' || a === 'notfall')
  return e.typ === 'schritt' && e.rolle.includes(r) && !(r === 'kern' && e.mehrtaegig)
}

/** Die häufigsten Ziele: Codes, auf die die meisten Quelleinheiten (Blatt, Kurs-/Förderfach-Einheit, Material) zielen. */
export function haeufigsteZiele(k: Katalog, n = 30): string[] {
  const einheiten = new Map<string, Set<string>>()
  for (const e of k.eintraege.values()) {
    const quelle = e.typ === 'baustein' ? `b:${e.quelle.blatt}` : e.id.split(':').slice(0, 2).join(':')
    for (const z of e.eldib) {
      if (z.gewicht !== 1) continue
      let s = einheiten.get(z.code)
      if (!s) einheiten.set(z.code, (s = new Set()))
      s.add(quelle)
    }
  }
  return [...einheiten.entries()].sort((a, b) => b[1].size - a[1].size || (a[0] < b[0] ? -1 : 1)).slice(0, n).map(([c]) => c)
}

export function abdeckung(k: Katalog): AbdeckungZeile[] {
  const bank = intern(k).eldib.items
  const zeilen: AbdeckungZeile[] = []
  const nachCode = new Map<string, KatalogEintrag[]>()
  for (const e of k.eintraege.values())
    for (const z of e.eldib) {
      const l = nachCode.get(z.code)
      if (l) l.push(e)
      else nachCode.set(z.code, [e])
    }
  for (const code of Object.keys(bank).sort()) {
    const s = bank[code].s
    const liste = nachCode.get(code) ?? []
    for (const stufe of STUFEN) {
      if (!ELDIB_STUFEN[stufe].includes(s)) continue
      const ok = liste.filter((e) => gueltig(e, stufe))
      for (const sprache of SPRACHEN)
        for (const rolle of ROLLEN) {
          const m = ok.filter((e) => passtRolle(e, rolle) && (sprache === 'de' || e.sprache.fr))
          zeilen.push({ code, stufe, sprache, rolle, n: m.length, primaer: m.filter((e) => e.eldib.some((z) => z.code === code && z.gewicht === 1)).length })
        }
    }
  }
  return zeilen
}

function bericht(k: Katalog, zeilen: AbdeckungZeile[]): string {
  const top = haeufigsteZiele(k)
  const bank = intern(k).eldib.items
  const zelle = (code: string, stufe: Stufe, sprache: Sprache, rolle: AbdeckungRolle) => zeilen.find((z) => z.code === code && z.stufe === stufe && z.sprache === sprache && z.rolle === rolle)
  const out: string[] = ['# Passgenau – Abdeckung', '', `Katalog ${k.stand}. Gezählt: gültige Kandidaten für eine Einzelstunde (Alter, Stufe ± 1, einzeltauglich, ohne heikle/Katharsis/Erwachsenen-Einträge), ohne Lockerung. **fett** = Lücke (< 3).`, '']
  for (const sprache of SPRACHEN) {
    out.push(`## Die 30 häufigsten Ziele – ${sprache.toUpperCase()} (Kern / Blatt)`, '', '| Code | Kurz | ' + STUFEN.join(' | ') + ' |', '|---|---|' + STUFEN.map(() => '---').join('|') + '|')
    for (const code of top) {
      const zellen = STUFEN.map((st) => {
        const a = zelle(code, st, sprache, 'kern')
        const b = zelle(code, st, sprache, 'blatt')
        if (!a || !b) return '–'
        const f = (n: number) => (n < 3 ? `**${n}**` : String(n))
        return `${f(a.n)} / ${f(b.n)}`
      })
      out.push(`| ${code} | ${bank[code]?.k ?? ''} | ${zellen.join(' | ')} |`)
    }
    out.push('')
  }
  const luecken = zeilen.filter((z) => z.n < 3)
  out.push('## Lücken insgesamt (< 3)', '')
  for (const r of ROLLEN)
    for (const sp of SPRACHEN) {
      const alle = zeilen.filter((z) => z.rolle === r && z.sprache === sp)
      out.push(`- ${r}, ${sp.toUpperCase()}: ${luecken.filter((z) => z.rolle === r && z.sprache === sp).length} von ${alle.length} Zellen`)
    }
  return out.join('\n') + '\n'
}

if (process.argv[1]?.includes('passgenau-abdeckung')) {
  const aus = process.argv.find((a) => a.startsWith('--aus='))?.slice(6) ?? join(ROOT, 'tmp/passgenau')
  const k = await ladeKatalogNode()
  const zeilen = abdeckung(k)
  mkdirSync(aus, { recursive: true })
  writeFileSync(join(aus, 'abdeckung.json'), JSON.stringify({ stand: k.stand, top: haeufigsteZiele(k), zeilen }))
  writeFileSync(join(aus, 'abdeckung.md'), bericht(k, zeilen))
  const l = zeilen.filter((z) => z.n < 3)
  console.log(`Abdeckung: ${zeilen.length} Zellen, davon ${l.length} mit < 3 Kandidaten → ${join(aus, 'abdeckung.md')}`)
}
