// Passgenau – Beschriftung in Node (Katalog-Skript, Prüfskript, Export, Import): Overlay-Dateien lesen und prüfen.
// Format und Regeln: src/data/passgenau/beschriftung/README.md, Prüfung: src/passgenau/kern/beschriftung.ts.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import type { SchritteDatei } from '../src/passgenau/kern/format'
import { join } from 'node:path'
import type { KatalogEintrag } from '../src/passgenau/typen'
import { intern, type Katalog } from '../src/passgenau/kern/katalog'
import { fuehreZusammen, kontextBaustein, kontextSchritt, pruefeBeschriftung, type Beschriftung, type BeschriftungDatei, type EintragKontext } from '../src/passgenau/kern/beschriftung'
import { ROOT } from './passgenau-quellen'

export const BESCHRIFTUNG_ORDNER = join(ROOT, 'src/data/passgenau/beschriftung')

export interface BeschriftungsDatei { datei: string; daten: BeschriftungDatei }

/** Alle Overlay-Dateien eines Ordners (sortiert nach Namen); kaputte Dateien landen in `fehler`. */
export function ladeBeschriftungsDateien(ordner = BESCHRIFTUNG_ORDNER): { dateien: BeschriftungsDatei[]; fehler: string[] } {
  const dateien: BeschriftungsDatei[] = []
  const fehler: string[] = []
  if (!existsSync(ordner)) return { dateien, fehler }
  for (const d of readdirSync(ordner).filter((x) => x.endsWith('.json')).sort()) {
    try {
      const daten = JSON.parse(readFileSync(join(ordner, d), 'utf8')) as unknown
      if (!daten || typeof daten !== 'object' || Array.isArray(daten)) fehler.push(`${d}: kein Objekt { "<id>": { … } }`)
      else dateien.push({ datei: d, daten: daten as BeschriftungDatei })
    } catch (e) {
      fehler.push(`${d}: kein gültiges JSON (${(e as Error).message.slice(0, 80)})`)
    }
  }
  return { dateien, fehler }
}

/** Kontext eines Katalogeintrags für die Prüfung. */
export function kontextAusKatalog(k: Katalog, e: KatalogEintrag | undefined): EintragKontext | undefined {
  if (!e) return undefined
  if (e.typ === 'baustein') {
    const blatt = intern(k).q.blatt.get(e.quelle.blatt)
    return blatt ? kontextBaustein(e, blatt, (id) => { const x = k.eintraege.get(id); return !x ? undefined : x.typ === 'baustein' ? x.quelle.blatt : 'schritt' }) : undefined
  }
  return kontextSchritt(e, e)
}

/** Alle Overlays gegen den Katalog prüfen: Fehler je Eintrag, gültige Einträge, veraltete (andere Prüfsumme), Doppelungen. */
export function pruefeBeschriftungen(k: Katalog, ordner = BESCHRIFTUNG_ORDNER) {
  const { dateien, fehler } = ladeBeschriftungsDateien(ordner)
  const { eintraege, doppelt } = fuehreZusammen(dateien)
  const bank = intern(k).eldib.items
  const gueltig = new Map<string, Beschriftung & { datei: string }>()
  const veraltet: string[] = []
  // jede Datei für sich prüfen (auch Einträge, die von einer späteren Datei überdeckt werden)
  for (const { datei, daten } of dateien)
    for (const [id, b] of Object.entries(daten)) {
      const e = k.eintraege.get(id)
      const f = pruefeBeschriftung(id, b, kontextAusKatalog(k, e), bank)
      fehler.push(...f.map((x) => `${datei}: ${x}`))
    }
  for (const [id, b] of eintraege) {
    const e = k.eintraege.get(id)
    const { datei: _d, ...roh } = b
    void _d
    if (pruefeBeschriftung(id, roh, kontextAusKatalog(k, e), bank).length) continue
    gueltig.set(id, b)
    if (b.h && e && b.h !== e.h) veraltet.push(`${id} (${b.datei})`)
  }
  return { dateien, fehler, gueltig, veraltet, doppelt }
}

/** Stelle eines Stundenschritts in seiner Quelle (stabile Ids: `p` in schritte.json, sonst die Nummer der Id). */
export function stellenAusKatalog(root = ROOT): Map<string, number> {
  const roh = JSON.parse(readFileSync(join(root, 'src/data/passgenau/schritte.json'), 'utf8')) as SchritteDatei
  return new Map(roh.schritte.map((r) => [r.id, r.p ?? (r.id.endsWith(':reim') ? 999 : Number(/(\d+)$/.exec(r.id)?.[1] ?? 0))]))
}

/** Originalphase eines Stundenschritts aus der Quelle (Kursphase, Art der Spielschul-Aktivität, Titel der Material-Phase). */
export function phaseAusQuelle(k: Katalog, id: string, stelle: Map<string, number>): string | undefined {
  const q = intern(k).q
  const [p, u] = id.split(':')
  const i = stelle.get(id) ?? 0
  if (p === 'k') return q.kurs.find((e) => e.id === u)?.schritte[i]?.phase
  if (p === 'f') return q.foerderfach.find((e) => e.id === u)?.de.schritte[i]?.phase
  if (p === 's') return id.endsWith(':reim') ? 'reim' : q.blatt.get(u)?.de.lehrer.spielschule?.aktivitaeten[i]?.art
  if (p === 'm') return (q.materialien.find((m) => m.id === u)?.ablauf[i]?.title ?? '').split(/[–:(-]/)[0].trim().slice(0, 30) || undefined
  if (p === 'c') return q.crew.themen.flatMap((t) => t.spiele).find((s) => s.id === u)?.format
  return undefined
}
