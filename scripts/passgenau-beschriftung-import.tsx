// Passgenau – Ergebnisse der Beschrifter übernehmen (Konzept 4.6, Phase 1/2).
//
//   npm run passgenau:beschriftung-import -- --ordner=<ordner> [--trocken]
//   npm run passgenau:beschriftung-import -- --pruefen=<ergebnis-datei>   nur diese Datei prüfen, nichts schreiben
//                                                                        (für Beschrifter: Selbstkontrolle)
//
// Liest <ordner>/ergebnis/*.json (Overlay-Format, src/data/passgenau/beschriftung/README.md), prüft jeden Eintrag
// (Schema, ELDiB-Codes, Vokabular, Längen, Sicherheitsregeln), schreibt die gültigen nach
// src/data/passgenau/beschriftung/<quelle>.json (mit der Prüfsumme h des Eintrags; eine Beschriftung durch eine
// Fachkraft überschreibt kein Agent) und meldet Zahlen. Fehlerliste: <ordner>/import-fehler.json.
// Danach: Stichproben-Kritik-Liste <ordner>/stichprobe.json – 5 % je Zelle Quelle × Art × Stufe (aufgerundet), aus
// allen Agenten-Beschriftungen. Zum Schluss den Katalog neu erzeugen:
//   npm run passgenau:katalog -- --ohne-hoehen && npm run passgenau:pruefen
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import type { KatalogEintrag } from '../src/passgenau/typen'
import { intern, textVon } from '../src/passgenau/kern/katalog'
import { hash8, stufeAusAlter } from '../src/passgenau/kern/hilfen'
import { beschriftungFelder, pruefeBeschriftung, type Beschriftung, type BeschriftungDatei } from '../src/passgenau/kern/beschriftung'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'
import { BESCHRIFTUNG_ORDNER, kontextAusKatalog, ladeBeschriftungsDateien, phaseAusQuelle, stellenAusKatalog } from './passgenau-beschriftung'

const args = process.argv.slice(2)
const ORDNER = resolve(args.find((a) => a.startsWith('--ordner='))?.slice(9) ?? join(ROOT, 'tmp/passgenau-beschriftung'))
const TROCKEN = args.includes('--trocken')
const PRUEFEN = args.find((a) => a.startsWith('--pruefen='))?.slice(10)
const ERGEBNIS = PRUEFEN ? dirname(resolve(PRUEFEN)) : join(ORDNER, 'ergebnis')
const ANTEIL = 0.05
const PFLICHT = ['rolle', 'alter', 'eldib', 'energie', 'einzeltauglich', 'belastung']

const t0 = Date.now()
const k = await ladeKatalogNode()
const bank = intern(k).eldib.items
const PRAEFIX: Record<string, string> = { k: 'kurs', f: 'foerderfach', s: 'spielschule', m: 'material', b: 'blatt', c: 'crew' }
const quelleVon = (id: string) => PRAEFIX[id.split(':')[0]] ?? 'unbekannt'

// --- 1. Ergebnisse lesen und prüfen -------------------------------------------------------------------------------------

const fehler: { datei: string; id: string | null; fehler: string }[] = []
const warnungen: string[] = []
const neu = new Map<string, Map<string, Beschriftung>>() // quelle → id → Beschriftung
let gelesen = 0
let gueltig = 0
const dateien = PRUEFEN ? [basename(PRUEFEN)] : existsSync(ERGEBNIS) ? readdirSync(ERGEBNIS).filter((d) => d.endsWith('.json')).sort() : []
const schonGesehen = new Map<string, string>()
for (const d of dateien) {
  let daten: unknown
  try {
    daten = JSON.parse(readFileSync(join(ERGEBNIS, d), 'utf8'))
  } catch (e) {
    fehler.push({ datei: d, id: null, fehler: `kein gültiges JSON: ${(e as Error).message.slice(0, 120)}` })
    continue
  }
  if (!daten || typeof daten !== 'object' || Array.isArray(daten)) {
    fehler.push({ datei: d, id: null, fehler: 'kein Objekt { "<id>": { … } }' })
    continue
  }
  // Ids des gleichnamigen Stapels (nur zur Warnung: ein Ergebnis darf auch Einträge anderer Stapel enthalten)
  const stapelDatei = join(PRUEFEN ? join(ERGEBNIS, '..') : ORDNER, 'stapel', d)
  const imStapel = existsSync(stapelDatei) ? new Set((JSON.parse(readFileSync(stapelDatei, 'utf8')) as { eintraege: { id: string }[] }).eintraege.map((x) => x.id)) : null
  for (const [id, b] of Object.entries(daten as BeschriftungDatei)) {
    gelesen++
    const e = k.eintraege.get(id)
    const f = pruefeBeschriftung(id, b, kontextAusKatalog(k, e), bank)
    if (f.length) {
      for (const x of f) fehler.push({ datei: d, id, fehler: x.replace(`${id}: `, '') })
      continue
    }
    if (imStapel && !imStapel.has(id)) warnungen.push(`${d}: ${id} steht nicht in stapel/${d}`)
    if (schonGesehen.has(id)) warnungen.push(`${id} in ${schonGesehen.get(id)} und ${d} – ${d} gilt`)
    schonGesehen.set(id, d)
    gueltig++
    const q = quelleVon(id)
    if (!neu.has(q)) neu.set(q, new Map())
    neu.get(q)!.set(id, { ...b, h: e!.h })
  }
}

// Selbstkontrolle eines Beschrifters: nur melden
if (PRUEFEN) {
  console.log(`${PRUEFEN}: ${gelesen} Einträge, ${gueltig} gültig, ${gelesen - gueltig} ungültig`)
  for (const f of fehler) console.log(`  FEHLER ${f.id ?? ''} ${f.fehler}`)
  for (const w of warnungen) console.log(`  Warnung: ${w}`)
  process.exit(fehler.length ? 1 : 0)
}

// --- 2. In die Overlays schreiben -------------------------------------------------------------------------------------

const sortiert = (o: Record<string, Beschriftung>) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b, 'de', { numeric: true })))
/** Feste Reihenfolge der Felder (lesbare Diffs): Felder wie BESCHRIFTUNG_FELDER, dann Begründung, Herkunft, Sicherheit, h. */
function geordnet(b: Beschriftung): Beschriftung {
  const o: Record<string, unknown> = {}
  for (const f of beschriftungFelder(b)) o[f] = b[f]
  o.begruendung = b.begruendung
  o.von = b.von
  o.sicher = b.sicher
  if (b.h) o.h = b.h
  return o as unknown as Beschriftung
}
const zahl = { neu: 0, geaendert: 0, gleich: 0, geschuetzt: 0 }
const jeQuelle: Record<string, number> = {}
if (!TROCKEN) mkdirSync(BESCHRIFTUNG_ORDNER, { recursive: true })
for (const [q, liste] of neu) {
  const pfad = join(BESCHRIFTUNG_ORDNER, `${q}.json`)
  const alt: BeschriftungDatei = existsSync(pfad) ? (JSON.parse(readFileSync(pfad, 'utf8')) as BeschriftungDatei) : {}
  for (const [id, b] of liste) {
    const vorher = alt[id]
    if (vorher?.von === 'fachkraft' && b.von !== 'fachkraft') {
      zahl.geschuetzt++
      continue
    }
    // Fassungen ohne Kursverweis (`allgemein`) bleiben, wenn die neue Beschriftung keine eigenen mitbringt
    const g = geordnet(vorher?.allgemein && !b.allgemein ? { ...b, allgemein: vorher.allgemein } : b)
    if (!vorher) zahl.neu++
    else if (JSON.stringify(geordnet(vorher)) === JSON.stringify(g)) zahl.gleich++
    else zahl.geaendert++
    alt[id] = g
    jeQuelle[q] = (jeQuelle[q] ?? 0) + 1
  }
  if (!TROCKEN) writeFileSync(pfad, JSON.stringify(sortiert(alt), null, 1) + '\n')
}
// Einträge, die in einer anderen Overlay-Datei als <quelle>.json stehen (z. B. fachkraft.json), bleiben unberührt.

// --- 3. Stichproben-Kritik-Liste ---------------------------------------------------------------------------------------

/** Zelle Quelle × Art × Stufe. Art: Bausteine erstes Format, Kurs/Förderfach/Spielschule Phase, Material erste Rolle. */
const stellen = stellenAusKatalog()
function zelle(id: string, e: KatalogEintrag): string {
  const q = quelleVon(id)
  const art = e.typ === 'baustein' ? (e.format[0] ?? e.art[0]) : q === 'material' ? e.rolle[0] : q === 'crew' ? 'spiel' : (phaseAusQuelle(k, id, stellen) ?? e.rolle[0])
  return `${q} × ${art} × ${stufeAusAlter(e.alter.von)}`
}
// alle Overlays auf der Platte (trocken: dazu die neuen Einträge, als wären sie geschrieben)
const overlay = new Map<string, { datei: string; b: Beschriftung }>()
for (const { datei, daten } of ladeBeschriftungsDateien().dateien) for (const [id, b] of Object.entries(daten)) overlay.set(id, { datei, b })
if (TROCKEN) for (const [q, liste] of neu) for (const [id, b] of liste) if (overlay.get(id)?.b.von !== 'fachkraft') overlay.set(id, { datei: `${q}.json`, b })
const zellen = new Map<string, { id: string; datei: string; b: Beschriftung; e: KatalogEintrag }[]>()
for (const [id, { datei, b }] of overlay) {
  const e = k.eintraege.get(id)
  if (!e || b.von !== 'agent') continue
  const z = zelle(id, e)
  if (!zellen.has(z)) zellen.set(z, [])
  zellen.get(z)!.push({ id, datei, b, e })
}
const gesamt = [...zellen.values()].reduce((a, l) => a + l.length, 0)
const stichprobe: unknown[] = []
const zellBericht: { zelle: string; n: number; gezogen: number }[] = []
for (const [z, liste] of [...zellen].sort(([a], [b]) => a.localeCompare(b))) {
  const n = Math.ceil(liste.length * ANTEIL)
  zellBericht.push({ zelle: z, n: liste.length, gezogen: n })
  for (const x of [...liste].sort((a, b) => hash8(a.id + '|stichprobe').localeCompare(hash8(b.id + '|stichprobe'))).slice(0, n)) {
    const t = textVon(x.e, 'de')
    // Originaltext (textVon zeigt bei Schritten schon die Einzelvariante)
    const original = x.e.typ === 'schritt' ? x.e.text : t.text
    const felder = beschriftungFelder(x.b)
    const werte = Object.fromEntries(felder.map((f) => [f, x.b[f]]))
    stichprobe.push({
      id: x.id, zelle: z, datei: x.datei, typ: x.e.typ, titel: t.titel, quelle: t.quelle,
      text: original.length > 600 ? original.slice(0, 599) + ' …' : original,
      ...(x.e.typ === 'schritt' && x.e.sagen?.length ? { sagen: x.e.sagen } : {}),
      werte, begruendung: x.b.begruendung, sicher: x.b.sicher,
      pflicht: felder.filter((f) => PFLICHT.includes(f)),
      urteil: Object.fromEntries(felder.map((f) => [f, null])),
      kommentar: null,
    })
  }
}
const kritik = {
  stand: k.stand,
  anteil: ANTEIL,
  regel: '5 % je Zelle Quelle × Art × Stufe, aufgerundet (jede Zelle mindestens 1); fest gezogen (Prüfsumme der Id).',
  anleitung:
    'Kritiker: je Feld in „urteil“ true (richtig) oder false (falsch); bei false in „kommentar“ den richtigen Wert und warum. Die Begründung ist sichtbar, die Beschrifter nicht. Annahme je Zelle: Pflichtfelder (rolle, alter, primärer ELDiB-Code, energie, einzeltauglich, belastung) ≥ 95 % richtig, übrige ≥ 90 %. Fällt eine Zelle durch, wird sie mit geschärfter Regel neu beschriftet.',
  n: gesamt,
  gezogen: stichprobe.length,
  zellen: zellBericht,
  eintraege: stichprobe,
}
mkdirSync(ORDNER, { recursive: true })
writeFileSync(join(ORDNER, 'stichprobe.json'), JSON.stringify(kritik, null, 1) + '\n')
writeFileSync(join(ORDNER, 'import-fehler.json'), JSON.stringify({ stand: k.stand, fehler, warnungen }, null, 1) + '\n')

// --- 4. Bericht --------------------------------------------------------------------------------------------------------

console.log(`Ergebnisse: ${dateien.length} Dateien in ${ERGEBNIS}, ${gelesen} Einträge gelesen`)
console.log(`  gültig ${gueltig} · ungültig ${gelesen - gueltig} (${fehler.length} Fehler)${warnungen.length ? ` · ${warnungen.length} Warnungen` : ''}`)
console.log(`  ${TROCKEN ? '(trocken – nichts geschrieben) ' : ''}nach ${BESCHRIFTUNG_ORDNER}: ${zahl.neu} neu, ${zahl.geaendert} geändert, ${zahl.gleich} gleich${zahl.geschuetzt ? `, ${zahl.geschuetzt} übersprungen (Fachkraft)` : ''}`)
if (Object.keys(jeQuelle).length) console.log('  je Quelle:', Object.entries(jeQuelle).map(([q, n]) => `${q} ${n}`).join(' · '))
for (const f of fehler.slice(0, 20)) console.log(`  FEHLER ${f.datei}${f.id ? ` ${f.id}` : ''}: ${f.fehler}`)
if (fehler.length > 20) console.log(`  … ${fehler.length - 20} weitere in ${join(ORDNER, 'import-fehler.json')}`)
for (const w of warnungen.slice(0, 5)) console.log(`  Warnung: ${w}`)
console.log(`Stichprobe: ${stichprobe.length} von ${gesamt} Agenten-Beschriftungen (${gesamt ? Math.round((1000 * stichprobe.length) / gesamt) / 10 : 0} %) aus ${zellBericht.length} Zellen → ${join(ORDNER, 'stichprobe.json')}`)
console.log(`Weiter: npm run passgenau:katalog -- --ohne-hoehen && npm run passgenau:pruefen  (${Math.round((Date.now() - t0) / 100) / 10} s)`)
process.exit(fehler.length ? 1 : 0)
