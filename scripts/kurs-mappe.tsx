// Passgenau – einen Einzelkurs prüfen: plant mit dem echten Kern die ganze Folge des Kurses (gründlich, eine Sitzung je
// Kurs-Sitzung) für erfundene Testkinder – je Zugang einer Variante (z. B. A: liest und schreibt, B: bildgestützt) und je
// Sprache –, schreibt die Mappe als PDF (Deckblatt, Ablauf aller Sitzungen, Karten für die Fachkraft, Material, Zusatzinfo) und meldet, ob jede Sitzung die
// passende Kurs-Sitzung in der passenden Variante bekommt, ob die Kurs-Rituale dabei sind und wie viele Seiten jedes Blatt hat.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/kurs-mappe.tsx <kurs-linie> [zielordner] [--png] [--blaetter] [--nur-de] [--dauer=30]
// --blaetter: nur die Kinderblätter als Bilder (je Sitzung und Variante, zum Ansehen); die Seitenzahl je Blatt steht immer im Bericht.
// Umfang: Blatt bis 7 Jahre (C1, C2) 1 Seite, sonst höchstens 2 Seiten – mehr gilt als Fehler. Kurse ab 7: höchstens 2 Seiten,
// auch für Siebenjährige (ALTER=7; ihr Blatt hat dann nur zwei Aufgaben).
// Ohne Kurs-Linie: alle Kurse (Linien „kurs-…“), nur der Bericht ohne PDF (nur Deutsch; mit --fr auch Französisch).
// Endet mit Fehler, wenn eine Sitzung nicht die erwartete Kurs-Sitzung hat.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { Document, renderToBuffer } from '@react-pdf/renderer'
import { BlattSeiten } from '../src/blatt/pdf/BlattDokument'
import { kinderblatt } from '../src/passgenau/kern/blatt'
import { kontext, pruefe } from '../src/passgenau/kern/regeln'
import type { Auftrag, Plan, Profil } from '../src/passgenau/typen'
import type { Layout, Stufe } from '../src/blatt/typen'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { FolgeDokument } from '../src/passgenau/pdf/PlanDokument'
import { KURS_LAGE_THEMEN, planen } from '../src/passgenau/kern/planer'
import { druckFolge } from '../src/passgenau/kern/druck'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'

const args = process.argv.slice(2)
const flag = (n: string) => args.includes(n)
const wert = (n: string) => args.find((a) => a.startsWith(n + '='))?.split('=')[1]
const frei = args.filter((a) => !a.startsWith('--'))
const nurBericht = !frei[0]
const ZIEL = frei[1] ?? join(ROOT, 'tmp', 'kurs-mappe')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const k = await ladeKatalogNode()

type E = { id: string; typ: string; linie?: { id: string; nr: number }; alter?: { von: number; bis: number }; eldib?: { code: string; gewicht: number }[]; zugang?: { lesen: number; schreiben: number; bild: number }; kurs?: string; rolle?: string[]; dauer?: { typ: number }; tausch?: boolean }
const alle = [...k.eintraege.values()] as unknown as E[]
const kurse = nurBericht ? [...new Set(alle.filter((e) => e.linie?.id.startsWith('kurs-')).map((e) => e.linie!.id))].sort() : [frei[0]]

function stufeFuer(alter: number): { stufen: Stufe[]; layout: Layout } {
  if (alter < 6) return { stufen: ['C1'], layout: 'bild' }
  if (alter < 8) return { stufen: ['C2'], layout: 'gross' }
  if (alter < 10) return { stufen: ['C3'], layout: 'mittel' }
  if (alter < 12) return { stufen: ['C4'], layout: 'mittel' }
  return { stufen: ['ES'], layout: 'jugend' }
}
const leer = () => ({ kind: { v: 1 as const, z: {}, zurueckgesetzt: null }, ich: { v: 1 as const, erkundung: 0.2, z: {} }, team: null })
const seitenVon = (b: Buffer) => (b.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length

let fehler = 0
for (const kurs of kurse) {
  // Tausch-Übungen (ohne eigenes Blatt) kommen nur auf Wunsch – geprüft werden die Varianten
  const sitzungen = alle.filter((e) => e.linie?.id === kurs && !e.tausch)
  const tausch = alle.filter((e) => e.linie?.id === kurs && e.tausch)
  if (!sitzungen.length) { console.log(`✗ ${kurs}: keine Sitzungen im Katalog`); fehler++; continue }
  const n = Math.max(...sitzungen.map((e) => e.linie!.nr))
  const erste = sitzungen.filter((e) => e.linie!.nr === 1)
  const { von, bis } = erste[0].alter ?? { von: 8, bis: 9 }
  // ALTER=7: ein anderes Testalter im Band (z. B. die Jüngsten eines Kurses für 7–9)
  const alter = process.env.ALTER ? Math.min(bis, Math.max(von, +process.env.ALTER)) : Math.round((von + bis) / 2)
  const codes = [...new Set(erste.flatMap((e) => (e.eldib ?? []).filter((x) => x.gewicht === 1).map((x) => x.code)))].slice(0, 2)
  const rituale = alle.filter((e) => e.kurs === kurs)
  // Kurs zu einer Lebenslage (Schulvermeidung, Trauer, Familie): das Testkind hat das Thema (sonst nimmt der Planer den Kurs nicht)
  const lage = (k.eintraege.get(erste[0].id) as { thema?: string[] } | undefined)?.thema?.find((t) => KURS_LAGE_THEMEN.has(t)) ?? null
  const zugaenge = [...new Map(erste.map((e) => [JSON.stringify(e.zugang ?? null), e.zugang ?? null])).values()]
  console.log(`\n== ${kurs}: ${n} Sitzungen, ${sitzungen.length} Einträge, Alter ${von}–${bis} (Test: ${alter}), Ziele ${codes.join(', ')}, Rituale ${rituale.length}, Tausch-Übungen ${tausch.length}`)
  for (let nr = 1; nr <= n; nr++) if (!sitzungen.some((e) => e.linie!.nr === nr)) { console.log(`  ✗ Sitzung ${nr} fehlt`); fehler++ }
  const sprachen: ('de' | 'fr')[] = flag('--nur-de') || (nurBericht && !flag('--fr')) ? ['de'] : ['de', 'fr']
  for (const z of zugaenge) {
    const variante = erste.find((e) => JSON.stringify(e.zugang ?? null) === JSON.stringify(z))!
    const v = variante.id.match(/-([a-z])$/)?.[1] ?? '?'
    for (const sprache of sprachen) {
      const p: Profil = {
        v: 1, ref: `kt-${kurs}-${v}-${sprache}`, erstellt: '2026-10-16T08:00:00', anrede: null, vorname: v === 'a' ? 'Lina' : 'Noa', alterJahre: alter,
        ...stufeFuer(alter), sprache: { blatt: sprache, woerter: [] },
        /* Testkind zur Variante: zur schreibenden ein Kind, das gut liest und schreibt (2/2/1), sonst genau der Zugang der Variante */
        zugang: { ...((z?.schreiben ?? 2) >= 1 ? { lesen: 2, schreiben: 2, bild: 1 } : { lesen: z!.lesen, schreiben: z!.schreiben, bild: Math.max(1, z!.bild) }), tempo: 'normal', struktur: 'normal', quelle: ['stufe'] } as Profil['zugang'],
        ziele: codes.map((code, i) => ({ code, ich: '', quelle: 'pei', seit: '2026-09-15', prio: i + 1 })),
        erreicht: [], themen: lage ? [{ key: lage, art: 'reunion', datum: '2026-10-01' }] : [], vorsicht: process.env.VORSICHT ? [process.env.VORSICHT] : [], interessen: [], wochenziel: null, gemacht: [], folge: null, vorlieben: null,
        rechte: { speichern: true, rueckmelden: true }, seed: `kurs-${kurs}-${v}`, dichte: 'mittel', achtung: [],
      } as unknown as Profil
      const a: Auftrag = { weg: 'gruendlich', ziele: codes, n, dauer: Number(wert('--dauer') ?? (alter < 6 ? 20 : 30)) as 30, sozialform: 'einzeln', schwerpunkt: [], formate: [], heute: { energie: 4, konzentration: 4, stimmung: 4 } as Auftrag['heute'], sprache, datum: '2026-10-12' }
      const plan: Plan = planen(k, p, a, leer(), { plaene: [], ereignisse: [] })
      const zeilen: string[] = []
      /* Seiten je Kinderblatt (und auf Wunsch die Bilder dazu) */
      const blattSeiten: number[] = []
      for (const s of plan.sitzungen) {
        if (!s.blatt) { blattSeiten.push(0); continue }
        const kb = kinderblatt(k, p, plan, s.nr, sprache)
        const b = await renderToBuffer(<Document><BlattSeiten blatt={kb} opt={{ sprache, lehrer: false }} /></Document>)
        blattSeiten.push(seitenVon(b))
        if (flag('--blaetter')) {
          const ordner = join(ZIEL, 'blaetter')
          mkdirSync(ordner, { recursive: true })
          const f = join(ordner, `${kurs}-${v}-${sprache}-s${s.nr}.pdf`)
          writeFileSync(f, b)
          execFileSync('pdftoppm', ['-png', '-r', '60', f, f.replace(/\.pdf$/, '')])
        }
      }
      // Kurse ab 7: auch Siebenjährige höchstens 2 Seiten (ihr Blatt hat dann nur zwei Aufgaben – blatt.ts)
      const maxSeiten = alter < 8 && von < 7 ? 1 : 2
      plan.sitzungen.forEach((s, i) => {
        const kern = s.schritte.filter((x) => x.rolle === 'kern').map((x) => x.ref)
        // VORSICHT=heikel: auch die schonende Tausch-Übung (mit eigenem Blatt) ist richtig
        const erwartet = (process.env.VORSICHT ? sitzungen.concat(tausch) : sitzungen).filter((e) => e.linie!.nr === i + 1)
        const passend = erwartet.find((e) => JSON.stringify(e.zugang ?? null) === JSON.stringify(z)) ?? erwartet[0]
        const hat = kern.find((r) => erwartet.some((e) => r.endsWith(e.id) || r === e.id))
        const ok = !!hat && (!!process.env.VORSICHT || !passend || hat.endsWith(passend.id) || hat === passend.id)
        const rit = s.schritte.filter((x) => x.rolle === 'ankommen' || x.rolle === 'abschluss').map((x) => x.ref)
        const ritOk = !rituale.length || rituale.every((r) => rit.some((x) => x.endsWith(r.id) || x === r.id))
        const zuLang = blattSeiten[i] > maxSeiten
        // fehlt ein Kurs-Ritual (z. B. weil ein Wort im Ritual-Text einen Filter auslöst), ist das ein Fehler
        if (!ok || zuLang || !ritOk) fehler++
        /* warum die erwartete Sitzung nicht kam (Textmerkmal, Alter, Zugang …) */
        const grund = !ok && passend ? pruefe(k.eintraege.get(passend.id)!, kontext(k, p, a, leer() as never), { rolle: 'kern' }) : null
        zeilen.push(`  ${ok && !zuLang && ritOk ? '✓' : '✗'} S${s.nr}: ${hat ?? kern.join(', ') ?? '–'}${ok ? '' : `  (erwartet ${passend?.id ?? '?'}${grund ? ` – ausgeschlossen: ${grund}` : ''})`}${ritOk ? '' : '  · Rituale fehlen: ' + rit.join(', ')} · ${s.schritte.reduce((x, y) => x + y.min, 0)} Min.${s.blatt ? ` · Blatt ${blattSeiten[i]} S.${zuLang ? ` (höchstens ${maxSeiten})` : ''}` : ' · ohne Blatt'}`)
      })
      console.log(`  Variante ${v} (${JSON.stringify(z)}) · ${sprache}:`)
      zeilen.forEach((x) => console.log(x))
      const hinweise = [...new Set(plan.sitzungen.flatMap((s) => (s.hinweise ?? []).map((h) => `S${s.nr}: ${h}`)))]
      if (hinweise.length) console.log('    Hinweise: ' + hinweise.join(' | '))
      if (nurBericht || flag('--blaetter')) continue
      mkdirSync(ZIEL, { recursive: true })
      const buf = await renderToBuffer(<FolgeDokument f={druckFolge(k, p, plan, { sprache, warum: false })} />)
      const datei = join(ZIEL, `${kurs}-${v}-${sprache}.pdf`)
      writeFileSync(datei, buf)
      console.log(`    PDF: ${datei} (${seitenVon(buf)} Seiten)`)
      if (flag('--png')) {
        const ordner = join(ZIEL, `${kurs}-${v}-${sprache}`)
        mkdirSync(ordner, { recursive: true })
        execFileSync('pdftoppm', ['-png', '-r', '55', datei, join(ordner, 's')])
        console.log(`    Bilder: ${ordner}/s-*.png`)
      }
    }
  }
}
console.log(`\n${fehler ? '✗ ' + fehler + ' Fehler' : '✓ alles passend'}`)
process.exit(fehler ? 1 : 0)
