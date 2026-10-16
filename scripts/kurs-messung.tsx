// Passgenau – Referenzmessung der Einzelkurse: für erfundene Testkinder (je Altersstufe eines) dieselbe gründliche Folge
// einmal mit dem Kurs und einmal ohne alle Kurse (wie vor den Kursen) planen und beide als Mappe (PDF) und als Text
// schreiben – für die blinde Bewertung. Die Dateien heißen nur X und Y (Zuordnung in schluessel.json).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/kurs-messung.tsx [zielordner]
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { renderToBuffer } from '@react-pdf/renderer'
import type { Auftrag, Plan, Profil } from '../src/passgenau/typen'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { FolgeDokument } from '../src/passgenau/pdf/PlanDokument'
import { planen } from '../src/passgenau/kern/planer'
import { druckFolge } from '../src/passgenau/kern/druck'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'
import type { Katalog } from '../src/passgenau/kern/katalog'

const ZIEL = process.argv[2] ?? join(ROOT, 'tmp', 'kurs-messung')
mkdirSync(ZIEL, { recursive: true })
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))

/** Katalog ohne Einzelkurse (Sitzungen der Linien „kurs-…“ und ihre Rituale) – wie vor den Kursen */
async function ohneKurse(): Promise<Katalog> {
  const k = await ladeKatalogNode()
  const weg = (e: { typ: string; linie?: { id: string }; kurs?: string }) => e.typ === 'schritt' && (!!e.linie?.id.startsWith('kurs-') || !!e.kurs)
  for (const [id, e] of [...k.eintraege]) if (weg(e as never)) k.eintraege.delete(id)
  for (const [r, l] of k.nachRolle) k.nachRolle.set(r, l.filter((e) => !weg(e as never)))
  return k
}

interface Testkind { ref: string; vorname: string; alter: number; stufen: Profil['stufen']; layout: Profil['layout']; ziele: string[]; zugang: [number, number, number]; dauer: Auftrag['dauer'] }
const KINDER: Testkind[] = [
  { ref: 'rm-01', vorname: 'Elio', alter: 5, stufen: ['C1'], layout: 'bild', ziele: ['V-20'], zugang: [0, 0, 3], dauer: 20 },
  { ref: 'rm-02', vorname: 'Lina', alter: 8, stufen: ['C3'], layout: 'mittel', ziele: ['K-21', 'K-26'], zugang: [2, 2, 1], dauer: 30 },
  { ref: 'rm-03', vorname: 'Jonas', alter: 11, stufen: ['C4'], layout: 'mittel', ziele: ['K-27', 'K-28'], zugang: [2, 2, 1], dauer: 30 },
  { ref: 'rm-04', vorname: 'Inès', alter: 14, stufen: ['ES'], layout: 'jugend', ziele: ['SOZ-37', 'K-26'], zugang: [2, 2, 1], dauer: 30 },
]
const leer = () => ({ kind: { v: 1 as const, z: {}, zurueckgesetzt: null }, ich: { v: 1 as const, erkundung: 0.2, z: {} }, team: null })

const mit = await ladeKatalogNode()
const ohne = await ohneKurse()
const schluessel: Record<string, { X: string; Y: string }> = {}
for (const t of KINDER) {
  const p = {
    v: 1, ref: t.ref, erstellt: '2026-10-16T08:00:00', anrede: null, vorname: t.vorname, alterJahre: t.alter, stufen: t.stufen, layout: t.layout,
    sprache: { blatt: 'de', woerter: [] }, zugang: { lesen: t.zugang[0], schreiben: t.zugang[1], bild: t.zugang[2], tempo: 'normal', struktur: 'normal', quelle: ['stufe'] },
    ziele: t.ziele.map((code, i) => ({ code, ich: '', quelle: 'pei', seit: '2026-09-15', prio: i + 1 })), erreicht: [], themen: [], vorsicht: [], interessen: [],
    wochenziel: null, gemacht: [], folge: null, vorlieben: null, rechte: { speichern: true, rueckmelden: true }, seed: `messung-${t.ref}`, dichte: 'mittel', achtung: [],
  } as unknown as Profil
  const a: Auftrag = { weg: 'gruendlich', ziele: t.ziele, n: 6, dauer: t.dauer, sozialform: 'einzeln', schwerpunkt: [], formate: [], heute: { energie: 4, konzentration: 4, stimmung: 4 }, sprache: 'de', datum: '2026-10-12' }
  // fester, aber je Kind anderer Tausch: X ist mal der Kurs, mal der Plan ohne Kurs
  const kursIstX = t.ref.endsWith('1') || t.ref.endsWith('4')
  const ergebnisse: [string, Katalog][] = [['kurs', mit], ['ohne', ohne]]
  for (const [art, k] of ergebnisse) {
    const plan: Plan = planen(k, p, a, leer(), { plaene: [], ereignisse: [] })
    const buchstabe = (art === 'kurs') === kursIstX ? 'X' : 'Y'
    const datei = join(ZIEL, `${t.ref}-${buchstabe}.pdf`)
    writeFileSync(datei, await renderToBuffer(<FolgeDokument f={druckFolge(k, p, plan, { sprache: 'de', warum: false })} />))
    execFileSync('pdftotext', ['-layout', datei, datei.replace(/\.pdf$/, '.txt')])
    const ordner = datei.replace(/\.pdf$/, '')
    mkdirSync(ordner, { recursive: true })
    execFileSync('pdftoppm', ['-png', '-r', '50', datei, join(ordner, 's')])
    ;(schluessel[t.ref] ??= { X: '', Y: '' })[buchstabe] = art
    console.log(`${t.ref} ${buchstabe} (${art}): ${plan.sitzungen.map((s) => s.schritte.find((x) => x.rolle === 'kern')?.ref ?? '–').join(' · ')}`)
  }
}
writeFileSync(join(ZIEL, 'schluessel.json'), JSON.stringify(schluessel, null, 1))
console.log('→ ' + ZIEL)
