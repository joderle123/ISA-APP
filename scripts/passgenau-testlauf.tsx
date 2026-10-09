// Passgenau – Testlauf für die Blind-Bewertung (Konzept 11.3): die 20 erfundenen Testkinder (tests/passgenau/kinder.json)
// × 3 Wege (tests/passgenau/auftraege.json) mit dem echten Kern planen und je Auftrag das PDF schreiben – Weg 1 als Mappe der
// Folge (Deckblatt, je Sitzung Planblatt und Blatt), Weg 2 und 3 als Sitzung (Planblatt, Blatt, Karten). Gleiches Druckbild
// für alle, ohne Begründungen. Dazu index.json (Kind, Weg, Datei, Seiten, Hinweise wie „gelockert“).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/passgenau-testlauf.tsx <Zielordner>
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { renderToBuffer } from '@react-pdf/renderer'
import type { Auftrag, Plan, Profil } from '../src/passgenau/typen'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { FolgeDokument, SitzungDokument } from '../src/passgenau/pdf/PlanDokument'
import { planen } from '../src/passgenau/kern/planer'
import { druckFolge, druckSitzung } from '../src/passgenau/kern/druck'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'

const ZIEL = process.argv[2] ?? join(ROOT, 'tmp', 'passgenau-testlauf')
mkdirSync(ZIEL, { recursive: true })
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))

const kinder = JSON.parse(readFileSync(join(ROOT, 'tests/passgenau/kinder.json'), 'utf8')) as Profil[]
const auftraege = JSON.parse(readFileSync(join(ROOT, 'tests/passgenau/auftraege.json'), 'utf8')) as Record<string, Auftrag[]>
const k = await ladeKatalogNode()
const leer = () => ({ kind: { v: 1 as const, z: {}, zurueckgesetzt: null }, ich: { v: 1 as const, erkundung: 0.2, z: {} }, team: null })

/** Seitenzahl eines PDFs (Zählung der /Type /Page-Objekte) */
const seitenVon = (b: Buffer) => (b.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length

interface Zeile {
  kind: string
  vorname: string
  alter: number
  weg: Auftrag['weg']
  datei: string
  seiten: number
  sitzungen: number
  minuten: number[]
  blatt: number
  hinweise: string[]
  gelockert: string[]
  ms: number
}
const index: Zeile[] = []
const t0 = Date.now()
for (const p of kinder) {
  for (const a of auftraege[p.ref] ?? []) {
    const s0 = Date.now()
    const plan: Plan = planen(k, p, a, leer(), { plaene: [], ereignisse: [] })
    const ms = Date.now() - s0
    const opt = { sprache: a.sprache ?? p.sprache.blatt, warum: false }
    const doc = a.weg === 'gruendlich' && plan.n > 1 ? <FolgeDokument f={druckFolge(k, p, plan, opt)} /> : <SitzungDokument d={druckSitzung(k, p, plan, plan.sitzungen[0].nr, { ...opt, karten: true })} />
    const buf = await renderToBuffer(doc)
    const datei = `${p.ref}-${a.weg}.pdf`
    writeFileSync(join(ZIEL, datei), buf)
    const hinweise = [...new Set(plan.sitzungen.flatMap((s) => (s.hinweise ?? []).map((h) => (plan.n > 1 ? `S${s.nr}: ` : '') + h)))]
    const gelockert = plan.sitzungen.flatMap((s) => s.schritte.filter((x) => x.gelockert).map((x) => `${plan.n > 1 ? `S${s.nr}: ` : ''}${x.t ?? x.ref} – gelockert: ${x.hinweis ?? ''}`))
    index.push({
      kind: p.ref, vorname: p.vorname ?? '', alter: p.alterJahre, weg: a.weg, datei, seiten: seitenVon(buf), sitzungen: plan.sitzungen.length,
      minuten: plan.sitzungen.map((s) => s.schritte.reduce((x, y) => x + y.min, 0)), blatt: plan.sitzungen.filter((s) => s.blatt).length,
      hinweise, gelockert, ms,
    })
    process.stdout.write(`${datei}  ${seitenVon(buf)} S.  ${plan.sitzungen.length} Sitz.  ${hinweise.length + gelockert.length} Hinweise\n`)
  }
}
writeFileSync(join(ZIEL, 'index.json'), JSON.stringify({ stand: new Date().toISOString().slice(0, 10), katalog: k.stand, auftraege: index.length, eintraege: index }, null, 1))
console.log(`\n${index.length} PDFs in ${ZIEL} (${Math.round((Date.now() - t0) / 1000)} s)`)
