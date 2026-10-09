// Passgenau – automatische Prüfungen des Kerns (Konzept 11.2, 11.5; Kritik vom 9.10.: ethik.md §5, technik.md §7).
// Nur erfundene Kinder. Braucht python3 mit PyMuPDF (Seiten zählen, PDF-Text). Fehler → Exit 1.
//   npm run passgenau:test            alles
//   npm run passgenau:test -- --schnell   ohne PDF-Prüfungen
import { renderToBuffer, Document } from '@react-pdf/renderer'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import type { Blatt } from '../src/blatt/typen'
import type { Auftrag, Ereignis, KatalogEintrag, Plan, PraxisVorlage, Profil, Rueckmeldung, Tagesform } from '../src/passgenau/typen'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { BlattDokument } from '../src/blatt/pdf/BlattDokument'
import { PlanSeite, SitzungDokument, teilPositionen } from '../src/passgenau/pdf/PlanDokument'
import { aufloesen, intern, textVon, zielSatz, type Katalog } from '../src/passgenau/kern/katalog'
import { erkundbar, planen, sitzungNeu, type Verlauf } from '../src/passgenau/kern/planer'
import { alternativen, ersetzen } from '../src/passgenau/kern/alternativen'
import { kinderblatt } from '../src/passgenau/kern/blatt'
import { seitenFuellung } from '../src/passgenau/kern/seiten'
import { druckSitzung, druckPakete } from '../src/passgenau/kern/druck'
import { ereignis } from '../src/passgenau/kern/ereignis'
import { notizText } from '../src/passgenau/kern/notiz'
import { fuerTeam, uebernehmen, vorlageZurueckgezogen } from '../src/passgenau/kern/team'
import { rueckmelden, zuruecksetzen, gelernt, type Vorlieben } from '../src/passgenau/kern/vorlieben'
import { bewerte, kontext, pruefe, rang } from '../src/passgenau/kern/regeln'
import { layoutAusStufe, stufeAusAlter, stufenAbstand } from '../src/passgenau/kern/hilfen'
import { KATHARSIS_RE } from '../src/passgenau/kern/vokabular'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'
import { pruefeBeschriftung, wendeBeschriftungAn, type Beschriftung, type EintragKontext } from '../src/passgenau/kern/beschriftung'
import type { SchrittMeta } from '../src/passgenau/kern/format'

const SCHNELL = process.argv.includes('--schnell')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))

// --- kleiner Prüfrahmen ------------------------------------------------------------------------------------------------
type Ergebnis = { name: string; ok: boolean; info: string[] }
const ergebnisse: Ergebnis[] = []
let aktuell: Ergebnis | null = null
function pruefung(name: string, f: () => void | Promise<void>) {
  return (async () => {
    aktuell = { name, ok: true, info: [] }
    const t = Date.now()
    try {
      await f()
    } catch (e) {
      aktuell.ok = false
      aktuell.info.push(`Ausnahme: ${(e as Error).stack?.split('\n').slice(0, 3).join(' | ')}`)
    }
    aktuell.info.unshift(`${Date.now() - t} ms`)
    ergebnisse.push(aktuell)
    console.log(`${aktuell.ok ? 'ok    ' : 'FEHLER'} ${name}  (${aktuell.info.join(' · ')})`)
    aktuell = null
  })()
}
function soll(bed: boolean, text: string): boolean {
  if (!bed && aktuell) {
    aktuell.ok = false
    if (aktuell.info.length < 12) aktuell.info.push(text)
  }
  return bed
}
function info(text: string) {
  aktuell?.info.push(text)
}

// --- erfundene Kinder ----------------------------------------------------------------------------------------------------
function kind(x: Partial<Profil> & { ref: string; alterJahre: number }): Profil {
  const stufe = stufeAusAlter(x.alterJahre)
  const lesen = stufe === 'C1' ? 0 : stufe === 'C2' ? 1 : stufe === 'ES' ? 2 : 2
  const schreiben = stufe === 'C1' ? 0 : stufe === 'C2' ? 1 : 2
  return {
    v: 1, erstellt: '2026-10-09T09:00', anrede: null, stufen: [stufe], layout: layoutAusStufe(stufe), sprache: { blatt: 'de', woerter: [] },
    zugang: { lesen: lesen as 0, schreiben: schreiben as 0, bild: stufe === 'C1' ? 3 : stufe === 'C2' ? 2 : 1, tempo: 'normal', struktur: 'normal', quelle: ['alter'] },
    ziele: [], erreicht: [], themen: [], vorsicht: [], interessen: [], wochenziel: null, gemacht: [], folge: null, vorlieben: null,
    rechte: { speichern: true, rueckmelden: true }, seed: `kind-${x.ref}`, ...x,
  }
}
const z = (code: string, ich: string, prio: number) => ({ code, ich, quelle: 'pei' as const, seit: '2026-09-15', prio })
const KINDER = {
  noe: kind({ ref: 't-noe', vorname: 'Noé', alterJahre: 5, sprache: { blatt: 'de', woerter: ['lb'] }, ziele: [z('SOZ-14', 'Ich warte, bis ich an der Reihe bin.', 1), z('V-10', 'Ich warte, bis ich drankomme.', 2)], themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-03' }], interessen: ['autos', 'bauen', 'tiere'], wochenziel: 'Ich warte in der Reihe.' }),
  mia: kind({ ref: 't-mia', vorname: 'Mia', alterJahre: 9, zugang: { lesen: 1, schreiben: 1, bild: 2, tempo: 'normal', struktur: 'normal', quelle: ['korrektur:2026-10-01'] }, ziele: [z('V-21', 'Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.', 1), z('K-26', 'Ich drücke meine Gefühle mit passenden Worten aus.', 2)], themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-02' }, { key: 'freundschaft', art: 'reunion', datum: '2026-09-29' }], vorsicht: ['familie'], interessen: ['fussball', 'tiere'], wochenziel: 'Ich warte, bis ich drankomme.', gemacht: [{ id: 'blatt:wutvulkan', am: '2026-09-24' }] }),
  ilyas: kind({ ref: 't-ilyas', vorname: 'Ilyas', alterJahre: 14, zugang: { lesen: 2, schreiben: 1, bild: 1, tempo: 'normal', struktur: 'normal', quelle: ['test:2025-05'] }, ziele: [z('K-26', 'Ich drücke meine Gefühle mit passenden Worten aus.', 1), z('V-22', 'Ich erkenne, wenn ich mich verbessert habe.', 2)], erreicht: ['V-13', 'V-15'], themen: [{ key: 'angst', art: 'reunion', datum: '2026-10-03' }, { key: 'lernen', art: 'notiz', datum: '2026-10-05' }], interessen: ['basketball', 'musik', 'gaming'], wochenziel: 'Vor der Probe mache ich meinen Skill.' }),
}
type KindName = keyof typeof KINDER
const HEUTE = '2026-10-09'
const auftrag = (p: Profil, weg: Auftrag['weg'], x: Partial<Auftrag> = {}): Auftrag => ({ weg, ziele: [], n: weg === 'gruendlich' ? 4 : 1, dauer: weg === 'leicht' ? 20 : 30, sozialform: 'einzeln', sprache: p.sprache.blatt, datum: HEUTE, heute: { energie: 4, konzentration: 4, stimmung: 4 }, ...x })
const leer = (): Vorlieben => ({ kind: { v: 1, z: {}, zurueckgesetzt: null }, ich: { v: 1, erkundung: 0.2, z: {} }, team: null })
const VERLAUF: Verlauf = { plaene: [], ereignisse: [] }
const alleTeile = (plan: Plan) => plan.sitzungen.flatMap((s) => [...s.schritte.flatMap((x) => [x.ref, ...(x.wahl ?? []).map((w) => w.ref)]), ...(s.blatt?.bausteine ?? []).map((b) => b.ref)])
const ohneDatum = (plan: Plan) => JSON.stringify({ ...plan, erstellt: '', auftrag: plan.auftrag ? { ...plan.auftrag, datum: '' } : undefined })

const SZENARIEN: { kind: KindName; weg: Auftrag['weg']; x?: Partial<Auftrag> }[] = [
  { kind: 'noe', weg: 'gruendlich', x: { n: 4, dauer: 30 } },
  { kind: 'noe', weg: 'schnell', x: { dauer: 20 } },
  { kind: 'noe', weg: 'leicht', x: { dauer: 15, tagesformen: ['aufgedreht'] } },
  { kind: 'mia', weg: 'gruendlich', x: { n: 4, dauer: 45 } },
  { kind: 'mia', weg: 'schnell', x: { dauer: 30 } },
  { kind: 'mia', weg: 'leicht', x: { dauer: 20, tagesformen: ['wuetend', 'aengstlich'] } },
  { kind: 'ilyas', weg: 'gruendlich', x: { n: 4, dauer: 45 } },
  { kind: 'ilyas', weg: 'schnell', x: { dauer: 45 } },
  { kind: 'ilyas', weg: 'leicht', x: { dauer: 20, tagesformen: ['traurig'] } },
]

// --- PDF: Seiten, Datenschutz, Lage der Teile ------------------------------------------------------------------------------
const TMP = mkdtempSync(join(tmpdir(), 'pg-test-'))
let pdfNr = 0
async function pdfDatei(doc: Parameters<typeof renderToBuffer>[0]): Promise<string> {
  const datei = join(TMP, `d${pdfNr++}.pdf`)
  writeFileSync(datei, await renderToBuffer(doc))
  return datei
}
function pdfInfo(dateien: string[]): { seiten: number; text: string[] }[] {
  const py = `import json, sys, pymupdf\nout = []\nfor f in json.loads(sys.argv[1]):\n    d = pymupdf.open(f)\n    out.append({'seiten': len(d), 'text': [p.get_text() for p in d]})\nprint(json.dumps(out))`
  return JSON.parse(execFileSync('python3', ['-c', py, JSON.stringify(dateien)], { maxBuffer: 256 * 1024 * 1024 }).toString())
}
async function pdfText(doc: Parameters<typeof renderToBuffer>[0]): Promise<string> {
  return pdfInfo([await pdfDatei(doc)])[0].text.join('\n')
}

const t0 = Date.now()
const k: Katalog = await ladeKatalogNode()
console.log(`Katalog: ${k.eintraege.size} Einträge in ${Date.now() - t0} ms\n`)
const PLAENE = SZENARIEN.map((sz) => ({ ...sz, p: KINDER[sz.kind], a: auftrag(KINDER[sz.kind], sz.weg, sz.x), plan: planen(k, KINDER[sz.kind], auftrag(KINDER[sz.kind], sz.weg, sz.x), leer(), VERLAUF) }))

/** Harte Regeln unabhängig vom Planer nachrechnen (11.2): Alter/Stufe, Sozialform, Zugang, heikel, Vorsicht, Gemachtes … */
function verstoesse(p: Profil, a: Auftrag, plan: Plan): string[] {
  const c = kontext(k, p, a, leer())
  const out: string[] = []
  for (const s of plan.sitzungen) {
    // Brücken zur letzten Stunde sind erlaubt, wenn ihre Voraussetzung vorher vorkam: in einer gehaltenen Sitzung des
    // Verlaufs oder einer früheren Sitzung dieser Folge (wie der Planer)
    const vorher = new Set([
      ...VERLAUF.plaene.flatMap((pl) => pl.sitzungen.filter((x) => x.status === 'gehalten').flatMap((x) => x.schritte.map((y) => y.ref))),
      ...plan.sitzungen.filter((x) => x.nr < s.nr).flatMap((x) => x.schritte.map((y) => y.ref)),
    ])
    const teile: { ref: string; blatt: boolean; ritual: boolean; locker: boolean }[] = [
      ...s.schritte.flatMap((x) => [{ ref: x.ref, blatt: false, ritual: x.rolle === 'ankommen' || x.rolle === 'abschluss', locker: !!x.hinweis }, ...(x.wahl ?? []).map((w) => ({ ref: w.ref, blatt: false, ritual: false, locker: false }))]),
      ...(s.blatt?.bausteine ?? []).map((b) => ({ ref: b.ref, blatt: true, ritual: false, locker: false })),
    ]
    for (const t of teile) {
      if (t.ref.startsWith('pg:')) continue
      const e = k.eintraege.get(t.ref)
      if (!e) {
        out.push(`${t.ref} fehlt`)
        continue
      }
      const w = (g: string) => out.push(`S${s.nr} ${e.id}: ${g}`)
      if (stufenAbstand(c.stufe, e.stufen) >= 2) w('Stufe')
      if (p.alterJahre < e.alter.von - 1 || p.alterJahre > e.alter.bis + 1) w('Alter')
      if (p.alterJahre >= 12 && e.stufen.every((x) => x === 'C1' || x === 'C2')) w('für Jüngere')
      if (e.einzeltauglich === 'nein' && (a.sozialform ?? 'einzeln') === 'einzeln') w('nur Gruppe')
      if (e.zielgruppe === 'fachkraft') w('Werkzeug für Fachkräfte')
      if (e.sensibel === 'akut' || (e.sensibel === 'kinderschutz' && !(a.heikel ?? []).length)) w('heikel')
      if (e.sensibel === 'familie' && p.vorsicht.includes('familie')) w('Vorsicht Familie')
      if (e.merkmale?.katharsis) w('Katharsis')
      if (e.typ === 'baustein') {
        const vorlesbar = intern(k).vorlesbar.has(e.id) ? 1 : 0
        if (e.lesemenge > p.zugang.lesen + vorlesbar) w('zu viel Text')
        if (e.schreibmenge > p.zugang.schreiben) w('zu viel Schreiben')
        if (p.gemacht.some((g) => g.id === `blatt:${e.quelle.blatt}` && (Date.parse(a.datum) - Date.parse(g.am)) / 86400000 < 42)) w('Blatt schon gemacht (< 42 Tage)')
      }
      if (plan.weg === 'leicht' && !e.ohneZiel) w('Weg 3 mit Förderziel')
      if (plan.weg === 'leicht' && e.format[0] === 'gespraech' && (a.tagesformen ?? []).some((x) => x === 'traurig' || x === 'rueckzug')) w('Gespräch bei traurig')
      if (e.typ === 'schritt' && e.mehrtaegig && !t.blatt && (s.schritte.find((x) => x.ref === e.id)?.rolle ?? 'transfer') !== 'transfer') w('mehrtägig')
      // und der Planer selbst stimmt zu (gleiche Regeln, ohne Lockerung 4)
      if (!t.locker) {
        const g = pruefe(e, c, { blatt: t.blatt, ritual: t.ritual, vorher })
        if (g && g !== 'schon in der Folge') w(`pruefe: ${g}`)
      }
    }
  }
  return out
}

// =======================================================================================================================
await pruefung('Wiederholbarkeit: gleicher Auftrag → byte-gleicher Plan (je Szenario 10 Läufe, Folgetag, neu geladener Katalog)', async () => {
  for (const sz of PLAENE) {
    const ref = JSON.stringify(sz.plan)
    for (let i = 0; i < 10; i++) soll(JSON.stringify(planen(k, sz.p, sz.a, leer(), VERLAUF)) === ref, `${sz.kind}/${sz.weg}: Lauf ${i} weicht ab`)
    const morgen = planen(k, sz.p, { ...sz.a, datum: '2026-10-10' }, leer(), VERLAUF)
    soll(ohneDatum(morgen) === ohneDatum(sz.plan), `${sz.kind}/${sz.weg}: am Folgetag anders`)
  }
  // zweite „Hub-Sitzung“: Katalog neu aufgebaut
  const k2 = await ladeKatalogNode()
  for (const sz of PLAENE.slice(0, 3)) soll(JSON.stringify(planen(k2, sz.p, sz.a, leer(), VERLAUF)) === JSON.stringify(sz.plan), `${sz.kind}/${sz.weg}: mit neu geladenem Katalog anders`)
  // derselbe Katalog wieder als aktueller (textVon, fuerTeam lesen den zuletzt geladenen)
  await ladeKatalogNode().then(() => undefined)
})

await pruefung('Harte Regeln: Alter, Stufe, Sozialform, Zugang, heikel, Vorsicht, Gemachtes, Weg 3 ohne Ziel', () => {
  let n = 0
  for (const sz of PLAENE) {
    const v = verstoesse(sz.p, sz.a, sz.plan)
    n += alleTeile(sz.plan).length
    for (const x of v) soll(false, `${sz.kind}/${sz.weg}: ${x}`)
  }
  // Vorsicht Familie/Trauer und heikel mit weiteren Kindern
  const tomas = kind({ ref: 't-tomas', alterJahre: 8, ziele: [z('K-26', 'Ich drücke meine Gefühle mit passenden Worten aus.', 1)], themen: [{ key: 'trauer', art: 'gespraech', datum: '2026-10-01' }], vorsicht: ['familie', 'trauer'] })
  for (const weg of ['gruendlich', 'schnell', 'leicht'] as const) {
    const a = auftrag(tomas, weg, weg === 'leicht' ? { tagesformen: ['traurig'] } : {})
    const plan = planen(k, tomas, a, leer(), VERLAUF)
    for (const x of verstoesse(tomas, a, plan)) soll(false, `Tomás/${weg}: ${x}`)
    for (const r of alleTeile(plan)) {
      const e = k.eintraege.get(r)
      if (e && e.belastung >= 2 && (e.thema.includes('familie') || e.thema.includes('traurig'))) soll(false, `Tomás/${weg}: ${r} Belastung 2 zu Familie/Trauer`)
    }
  }
  info(`${n} Teile geprüft`)
})

await pruefung('Weg 1/2/3 für 5, 9 und 14 Jahre: Minuten, Bogen, Kern, Blatt, Rituale, Wahl', () => {
  const REIHE = ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen', 'reflektieren']
  for (const sz of PLAENE) {
    const { plan, a, p } = sz
    const name = `${sz.kind}/${sz.weg}`
    soll(plan.sitzungen.length === (sz.weg === 'gruendlich' ? a.n : 1), `${name}: ${plan.sitzungen.length} Sitzungen`)
    soll(!!plan.titel && plan.titel !== 'Einzelstunde', `${name}: Titel „${plan.titel}“`)
    for (const s of plan.sitzungen) {
      const summe = s.schritte.reduce((x, y) => x + y.min, 0)
      soll(Math.abs(summe - a.dauer) <= 2, `${name} S${s.nr}: ${summe} statt ${a.dauer} Min.`)
      soll(s.schritte[0]?.rolle === 'ankommen' && s.schritte[s.schritte.length - 1]?.rolle === 'abschluss', `${name} S${s.nr}: kein Ankommen/Abschluss`)
      soll(s.schritte.every((x) => x.min >= 1), `${name} S${s.nr}: Schritt ohne Minuten`)
      if (sz.weg !== 'leicht') {
        soll(s.schritte.some((x) => x.rolle === 'kern'), `${name} S${s.nr}: kein Kern`)
        soll(s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss').every((x) => (x.warum ?? []).length >= 1), `${name} S${s.nr}: Schritt ohne Warum`)
      } else {
        const w = s.schritte.find((x) => x.wahl?.length)
        soll(!!w, `${name}: keine Wahl`)
        soll(!!w?.wahl?.some((o) => o.ref === 'pg:da-sein'), `${name}: Wahl ohne „einfach da sein“`)
        soll((w?.wahl?.length ?? 0) + 1 <= 3, `${name}: mehr als drei Optionen`)
        soll(!s.schritte.some((x) => x.rolle === 'kern'), `${name}: Kern in Weg 3`)
      }
      // Blatt: bis 5 Jahre ohne (Vorgabe), sonst mit; Weg 3 ohne
      if (sz.weg === 'leicht' || p.alterJahre <= 5) soll(!s.blatt, `${name} S${s.nr}: Blatt, obwohl ohne vorgesehen`)
      else soll(!!s.blatt && s.blatt.bausteine.filter((b) => !b.ref.startsWith('pg:')).length >= 2, `${name} S${s.nr}: Blatt fehlt oder zu dünn`)
    }
    // Folge: Bogen monoton, kein Teil doppelt (außer Rituale), Rituale konstant
    if (plan.sitzungen.length > 1) {
      const ph = plan.sitzungen.map((s) => REIHE.indexOf(s.phase as string))
      soll(ph.every((x, i) => i === 0 || x >= ph[i - 1]), `${name}: Bogen nicht monoton ${plan.sitzungen.map((s) => s.phase).join(',')}`)
      const teile = plan.sitzungen.flatMap((s) => [...s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss' && !x.ref.startsWith('pg:')).map((x) => x.ref), ...(s.blatt?.bausteine ?? []).filter((b) => !b.ref.startsWith('pg:')).map((b) => b.ref)])
      soll(new Set(teile).size === teile.length, `${name}: Teil doppelt in der Folge`)
      const abschluss = new Set(plan.sitzungen.map((s) => s.schritte[s.schritte.length - 1].ref))
      soll(abschluss.size === 1, `${name}: Abschluss-Ritual wechselt`)
      if (p.alterJahre < 12) soll(new Set(plan.sitzungen.map((s) => s.schritte[0].ref)).size === 1, `${name}: Ankommens-Ritual wechselt`)
    }
  }
  // Weg 3: Tagesform „aufgewühlt“ (P8) und 10 Minuten
  const p = KINDER.mia
  for (const [tf, dauer] of [[['aufgewuehlt'], 10], [['rueckzug'], 15], [['will-nicht', 'muede'], 30]] as [Tagesform[], Auftrag['dauer']][]) {
    const plan = planen(k, p, auftrag(p, 'leicht', { tagesformen: tf, dauer }), leer(), VERLAUF)
    const s = plan.sitzungen[0]
    soll(Math.abs(s.schritte.reduce((x, y) => x + y.min, 0) - dauer) <= 2, `Weg 3 ${tf}/${dauer}: Minuten`)
    soll(s.schritte.some((x) => x.wahl?.some((o) => o.ref === 'pg:da-sein')), `Weg 3 ${tf}/${dauer}: Wahl mit „da sein“ fehlt`)
    for (const x of verstoesse(p, auftrag(p, 'leicht', { tagesformen: tf, dauer }), plan)) soll(false, `Weg 3 ${tf}: ${x}`)
  }
})

await pruefung('Blatt: Zeitbudget Σ dauer.typ ≤ 1,25 × Slot, „ruhig“ ≤ 3 Aufgabenpakete, C1/C2 eine Seite (Vorhersage)', () => {
  const ruhig = { ...KINDER.mia, ref: 't-mia-ruhig', zugang: { ...KINDER.mia.zugang, tempo: 'ruhig' as const } }
  const noeMit = planen(k, KINDER.noe, auftrag(KINDER.noe, 'schnell', { blatt: 'mit', dauer: 30 }), leer(), VERLAUF)
  const extra = [
    { p: ruhig, plan: planen(k, ruhig, auftrag(ruhig, 'gruendlich', { n: 3, dauer: 45 }), leer(), VERLAUF) },
    { p: KINDER.noe, plan: noeMit },
  ]
  for (const { p, plan } of [...PLAENE.map((x) => ({ p: x.p, plan: x.plan })), ...extra])
    for (const s of plan.sitzungen) {
      if (!s.blatt) continue
      const slot = s.schritte.find((x) => x.rolle === 'uebung')?.min ?? 0
      const pakete = s.blatt.bausteine.map((b) => k.eintraege.get(b.ref)).filter((e): e is KatalogEintrag => !!e && e.typ === 'baustein')
      const summe = pakete.reduce((x, e) => x + e.dauer.typ, 0)
      soll(summe <= 1.25 * slot + 0.01, `${p.ref} S${s.nr}: Σ ${summe} Min. > 1,25 × ${slot}`)
      if (p.zugang.tempo === 'ruhig') soll(pakete.filter((e) => e.typ === 'baustein' && e.art.includes('aufgabe')).length <= 3, `${p.ref} S${s.nr}: ruhig mit > 3 Aufgaben`)
      const seiten = seitenFuellung(k, p, plan, s.nr)
      const kurz = ['C1', 'C2'].includes(stufeAusAlter(p.alterJahre))
      soll(seiten.length <= (kurz ? 1 : 2), `${p.ref} S${s.nr}: ${seiten.length} Seiten vorhergesagt`)
    }
  soll(!!noeMit.sitzungen[0].blatt, 'Noé mit Blatt: kein Blatt')
})

await pruefung('Alternativen: ≥ 3 gültige in ≥ 95 % der Slots, nie aus einer anderen Sitzung der Folge', () => {
  let slots = 0
  let genug = 0
  const zuWenig: string[] = []
  for (const sz of PLAENE) {
    const folge = new Set<string>()
    for (const s of sz.plan.sitzungen) {
      for (const x of s.schritte) if (x.rolle !== 'ankommen' && x.rolle !== 'abschluss') folge.add(x.ref)
      for (const b of s.blatt?.bausteine ?? []) folge.add(b.ref)
    }
    const c = kontext(k, sz.p, sz.a, leer())
    for (const s of sz.plan.sitzungen) {
      const orte = [...s.schritte.map((x, i) => ({ ort: { sitzung: s.nr, schritt: i }, ref: x.ref })), ...(s.blatt?.bausteine ?? []).map((b, i) => ({ ort: { sitzung: s.nr, blatt: i }, ref: b.ref }))].filter((o) => !o.ref.startsWith('pg:'))
      for (const o of orte) {
        const alt = alternativen(k, sz.p, sz.plan, o.ort, leer(), 5)
        slots++
        if (alt.length >= 3) genug++
        else zuWenig.push(`${sz.kind}/${sz.weg} S${s.nr} ${o.ref}: ${alt.length}`)
        for (const x of alt) {
          soll(!folge.has(x.eintrag.id), `${sz.kind}/${sz.weg}: Alternative ${x.eintrag.id} steht schon in der Folge`)
          const g = pruefe(x.eintrag, c, { blatt: o.ort.blatt !== undefined, ritual: true })
          soll(!g || g === 'schon gemacht', `${sz.kind}/${sz.weg}: Alternative ${x.eintrag.id} verletzt „${g}“`)
        }
      }
    }
  }
  info(`${genug}/${slots} Slots mit ≥ 3 (${Math.round((100 * genug) / slots)} %)`)
  soll(genug / slots >= 0.95, `nur ${genug}/${slots}: ${zuWenig.slice(0, 6).join('; ')}`)
})

await pruefung('Alternativen auf einer zufälligen Ziel-Stichprobe (20 Codes, Alter passend zur ELDiB-Stufe)', () => {
  const bank = intern(k).eldib
  const codes = Object.keys(bank.items).filter((c) => bank.items[c].s >= 2).sort()
  let slots = 0
  let genug = 0
  for (let i = 0; i < 20; i++) {
    const code = codes[(i * 37 + 11) % codes.length]
    const [von, bis] = bank.stufen[String(bank.items[code].s)]
    const alter = Math.min(15, Math.max(5, Math.round((von + bis) / 2) + (bank.items[code].s <= 2 ? 3 : 0)))
    const p = kind({ ref: `t-stich-${i}`, alterJahre: alter, ziele: [z(code, bank.items[code].ich[0] ?? '', 1)] })
    const a = auftrag(p, 'schnell', { dauer: 30 })
    const plan = planen(k, p, a, leer(), VERLAUF)
    for (const x of verstoesse(p, a, plan)) soll(false, `${code}/${alter}: ${x}`)
    const s = plan.sitzungen[0]
    for (const [j, x] of s.schritte.entries()) {
      if (x.ref.startsWith('pg:')) continue
      slots++
      if (alternativen(k, p, plan, { sitzung: 1, schritt: j }, leer(), 5).length >= 3) genug++
    }
  }
  info(`${genug}/${slots} Slots mit ≥ 3 (${Math.round((100 * genug) / slots)} %)`)
  soll(genug / slots >= 0.95, `nur ${genug}/${slots}`)
})

await pruefung('Ersetzen: unveränderlich, Abhängigkeiten werden mitgenommen, Status „angepasst“', () => {
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'schnell')!
  const vorher = JSON.stringify(sz.plan)
  const s = sz.plan.sitzungen[0]
  const i = s.schritte.findIndex((x) => x.rolle === 'kern')
  const alt = alternativen(k, sz.p, sz.plan, { sitzung: 1, schritt: i }, leer(), 3)
  const neu = ersetzen(sz.plan, { sitzung: 1, schritt: i }, alt[0].eintrag)
  soll(JSON.stringify(sz.plan) === vorher, 'alter Plan verändert')
  soll(neu.sitzungen[0].schritte[i].ref === alt[0].eintrag.id && neu.sitzungen[0].status === 'angepasst', 'Ersetzen ohne Wirkung')
  // Blatt-Teil mit „braucht“
  const mitBraucht = [...k.eintraege.values()].find((e) => e.typ === 'baustein' && (e.braucht ?? []).length && e.stufen.includes('C3'))
  if (mitBraucht && s.blatt) {
    const n2 = ersetzen(sz.plan, { sitzung: 1, blatt: 0 }, mitBraucht)
    soll((mitBraucht.typ === 'baustein' ? mitBraucht.braucht ?? [] : []).every((d) => n2.sitzungen[0].blatt!.bausteine.some((b) => b.ref === d)), 'Abhängigkeit fehlt nach Ersetzen')
  }
  // sitzungNeu: andere Teile, gleiche Phase, Rituale bleiben
  const g = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'gruendlich')!
  const n3 = sitzungNeu(k, g.p, g.plan, 2, leer())
  const a2 = g.plan.sitzungen[1]
  const b2 = n3.sitzungen[1]
  soll(a2.phase === b2.phase && a2.schritte[0].ref === b2.schritte[0].ref, 'Neu vorschlagen: Phase oder Ritual geändert')
  soll(b2.schritte.filter((x) => x.rolle === 'kern').every((x) => !a2.schritte.some((y) => y.ref === x.ref)), 'Neu vorschlagen: gleicher Kern')
  soll((n3.variante ?? 0) === 1, 'Neu vorschlagen: Variante zählt nicht hoch')
})

await pruefung('Folge-Konsistenz: Weg 2 mit laufender Folge liefert die gespeicherte Sitzung (byte-gleich), Rückmeldung passt an', () => {
  const g = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'gruendlich')!
  const gehalten: Plan = { ...g.plan, sitzungen: g.plan.sitzungen.map((s) => (s.nr === 1 ? { ...s, status: 'gehalten', datum: '2026-10-06', rueckmeldung: { ergebnis: 'geklappt', am: '2026-10-06' } } : s)) }
  const p: Profil = { ...g.p, folge: { id: g.plan.id, titel: g.plan.titel, n: 4, gehalten: 1 } }
  const verlauf: Verlauf = { plaene: [gehalten], ereignisse: [] }
  const a = auftrag(p, 'schnell', { dauer: 45 })
  const r1 = planen(k, p, a, leer(), verlauf)
  const r2 = planen(k, p, { ...a, datum: '2026-10-10' }, leer(), verlauf)
  soll(JSON.stringify(r1.sitzungen[1]) === JSON.stringify(gehalten.sitzungen[1]), 'nächste Sitzung nicht wie gespeichert')
  soll(JSON.stringify(r1) === JSON.stringify(r2), 'am Folgetag anders')
  // „nicht geklappt“ → eine Stufe zurück, mit Hinweis
  const nicht: Plan = { ...gehalten, sitzungen: gehalten.sitzungen.map((s) => (s.nr === 1 ? { ...s, rueckmeldung: { ergebnis: 'nicht', am: '2026-10-06' } } : s)) }
  const r3 = planen(k, p, a, leer(), { plaene: [nicht], ereignisse: [] })
  soll(!!r3.sitzungen[1].hinweise?.some((h) => h.includes('nicht geklappt')), 'kein Hinweis nach „nicht geklappt“')
})

await pruefung('Vorlieben (11.5): 10 Rückmeldungen kippen ein knappes Ranking, nie eine harte Regel; zurücksetzen = Kaltstart', () => {
  const p = KINDER.mia
  const a = auftrag(p, 'schnell')
  const c0 = kontext(k, p, a, leer())
  const liste = (k.nachRolle.get('spiel') ?? []).filter((e) => !e.id.startsWith('pg:') && pruefe(e, c0, {}) === null).map((e) => bewerte(e, c0, { phase: 'ueben' }))
  liste.sort((x, y) => rang(x, y, 'sim'))
  // knappes Paar mit verschiedenem Hauptformat
  let paar: [(typeof liste)[number], (typeof liste)[number]] | null = null
  for (let i = 0; i + 1 < liste.length && !paar; i++)
    for (let j = i + 1; j < Math.min(liste.length, i + 4); j++)
      if (liste[i].s - liste[j].s < 0.02 && liste[i].e.format[0] && liste[j].e.format[0] && liste[i].e.format[0] !== liste[j].e.format[0]) {
        paar = [liste[i], liste[j]]
        break
      }
  if (!soll(!!paar, 'kein knappes Paar gefunden')) return
  const [oben, unten] = paar!
  const fmt = unten.e.format[0]
  const andere = liste.filter((b) => b.e.format[0] === fmt && b.e.id !== unten.e.id).slice(0, 10)
  let v = leer()
  for (const [i, b] of andere.entries()) v = rueckmelden(v, ereignis(i % 2 ? 'daumen_hoch' : 'geklappt', { t: `2026-10-0${1 + (i % 8)}T10:00`, baustein: b.e.id, grund: i % 2 ? 'passt-gut' : null, tags: { rolle: 'spiel' } }), b.e)
  const c1 = kontext(k, p, a, v)
  const o2 = bewerte(oben.e, c1, { phase: 'ueben' })
  const u2 = bewerte(unten.e, c1, { phase: 'ueben' })
  info(`Format „${fmt}“: vorher ${oben.s.toFixed(3)} > ${unten.s.toFixed(3)}, nachher ${o2.s.toFixed(3)} / ${u2.s.toFixed(3)}`)
  soll(u2.s > o2.s, 'Ranking kippt nicht nach 10 Rückmeldungen')
  soll(Math.abs(u2.s / u2.g - 1) <= 0.3 + 1e-9, 'Deckel ±30 % überschritten')
  // harte Regel: ein Eintrag für Jüngere bleibt draußen, egal wie beliebt
  const klein = [...k.eintraege.values()].find((e) => e.stufen.length === 1 && e.stufen[0] === 'C1' && e.format.length)!
  let vv = leer()
  for (let i = 0; i < 30; i++) vv = rueckmelden(vv, ereignis('geklappt', { t: '2026-10-05T10:00', baustein: klein.id, tags: { rolle: 'kern' } }), klein)
  const ilyas = KINDER.ilyas
  const cI = kontext(k, ilyas, auftrag(ilyas, 'schnell'), vv)
  soll(pruefe(klein, cI, {}) !== null, 'Vorliebe öffnet eine harte Regel')
  const planI = planen(k, ilyas, auftrag(ilyas, 'schnell', { dauer: 45 }), vv, VERLAUF)
  soll(verstoesse(ilyas, auftrag(ilyas, 'schnell', { dauer: 45 }), planI).length === 0, 'Plan mit Vorlieben verletzt harte Regeln')
  // zurücksetzen → wieder Kaltstart
  const r = zuruecksetzen(v, 'kind')
  soll(Object.keys(r.kind?.z ?? {}).length === 0, 'Zurücksetzen lässt Zähler stehen')
  soll(Math.abs(bewerte(unten.e, kontext(k, p, a, { ...r, ich: leer().ich }), { phase: 'ueben' }).s - unten.s) < 1e-9, 'nach Zurücksetzen nicht wie Kaltstart')
  // „noch unklar“ unter 5 Rückmeldungen
  const g = gelernt(rueckmelden(leer(), ereignis('geklappt', { t: '2026-10-05T10:00', baustein: andere[0].e.id, tags: { rolle: 'spiel' } }), andere[0].e), 'kind', k)
  soll(g.every((x) => x.n >= 5 || /unklar/.test(x.text)), 'unter 5 Rückmeldungen nicht „noch unklar“')
})

await pruefung('Lern-Simulation: Kind „liebt Bewegung, schreibt ungern“ über 12 Stunden; Erkundung 15–25 %', () => {
  const p = kind({ ref: 't-sim', alterJahre: 9, ziele: [z('V-21', 'Ich behalte die Kontrolle über mein Verhalten.', 1)], themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-01' }] })
  let v = leer()
  const gemacht: Profil['gemacht'] = []
  const anteil: number[] = []
  const formate = new Set<string>()
  let frei = 0
  let erk = 0
  for (let woche = 0; woche < 12; woche++) {
    const tag = `2026-${String(10 + Math.floor(woche / 4)).padStart(2, '0')}-${String(1 + (woche % 4) * 7).padStart(2, '0')}`
    const pp = { ...p, gemacht }
    const plan = planen(k, pp, auftrag(pp, 'schnell', { datum: tag, dauer: 30 }), v, VERLAUF)
    const s = plan.sitzungen[0]
    let passend = 0
    let gezaehlt = 0
    const kernRef = s.schritte.find((x) => x.rolle === 'kern')?.ref
    for (const x of s.schritte) {
      if (x.rolle === 'ankommen' || x.rolle === 'abschluss' || x.ref.startsWith('pg:')) continue
      const e = k.eintraege.get(x.ref)!
      if (erkundbar(x.rolle, x.ref, kernRef)) {
        frei++
        if (x.erkundung) erk++
      }
      e.format.forEach((f) => formate.add(f))
      gezaehlt++
      const mag = e.format.includes('bewegung') || e.format.includes('spiel')
      const mussSchreiben = e.format.includes('schreiben')
      if (!mussSchreiben) passend++
      const art = mussSchreiben ? 'daumen_runter' : mag ? 'daumen_hoch' : null
      if (art) v = rueckmelden(v, ereignis(art, { t: `${tag}T11:00`, baustein: e.id, grund: art === 'daumen_runter' ? 'mag-nicht' : 'passt-gut', tags: { rolle: x.rolle }, erkundung: x.erkundung }), e)
      gemacht.push({ id: e.id, am: tag })
    }
    anteil.push(gezaehlt ? passend / gezaehlt : 1)
  }
  const spaet = anteil.slice(5)
  const mittel = spaet.reduce((a, b) => a + b, 0) / spaet.length
  info(`passende Schritte ab Stunde 6: ${Math.round(100 * mittel)} %, Erkundung ${erk}/${frei} freie Slots, Formate ${formate.size}`)
  soll(mittel >= 0.7, `nur ${Math.round(100 * mittel)} % passende Schritte`)
  soll(formate.size >= 4, 'Formate verschwinden')
  // Erkundung über viele Pläne (Varianten) messen
  let f2 = 0
  let e2 = 0
  for (let i = 0; i < 200; i++) {
    const q = kind({ ref: `t-erk-${i}`, alterJahre: 6 + (i % 9), ziele: [z(['V-21', 'K-26', 'SOZ-32', 'V-18', 'K-17', 'V-24'][i % 6], '', 1)] })
    const plan = planen(k, q, auftrag(q, 'schnell', { dauer: ([30, 45] as const)[i % 2] }), leer(), VERLAUF)
    const kernRef = plan.sitzungen[0].schritte.find((x) => x.rolle === 'kern')?.ref
    for (const x of plan.sitzungen[0].schritte)
      if (erkundbar(x.rolle, x.ref, kernRef)) {
        f2++
        if (x.erkundung) e2++
      }
  }
  info(`Erkundung über 200 Pläne: ${e2}/${f2} = ${Math.round((100 * e2) / f2)} %`)
  soll(e2 / f2 >= 0.15 && e2 / f2 <= 0.25, `Erkundung ${Math.round((100 * e2) / f2)} % außerhalb 15–25 %`)
})

await pruefung('Ethik 9: Angst-Kind (5 × „nicht geklappt“ bei der Mut-Leiter) und Fachkraft, die nur „hoch“ gibt (≤ ±6 %)', () => {
  const p = kind({ ref: 't-nelia', alterJahre: 10, ziele: [z('V-24', 'Ich traue mich, Neues auszuprobieren.', 1)], themen: [{ key: 'angst', art: 'reunion', datum: '2026-10-02' }] })
  const a = auftrag(p, 'schnell')
  const leiter = [...k.eintraege.values()].find((e) => e.typ === 'baustein' && e.art.includes('leiter') && e.thema.includes('angst') && pruefe(e, kontext(k, p, a, leer()), { blatt: true }) === null) ?? [...k.eintraege.values()].find((e) => e.belastung >= 1 && e.thema.includes('angst'))!
  let v = leer()
  for (let i = 0; i < 5; i++) v = rueckmelden(v, ereignis('nicht', { t: `2026-10-0${i + 1}T10:00`, baustein: leiter.id, tags: { rolle: 'kern' } }), leiter)
  const schluessel = Object.keys(v.kind!.z).concat(Object.keys(v.ich.z))
  soll(schluessel.every((s) => s.startsWith('baustein:')), `Negatives wirkt über den Baustein hinaus: ${schluessel.filter((s) => !s.startsWith('baustein:')).join(', ')}`)
  const plan = planen(k, p, a, v, VERLAUF)
  const angst = alleTeile(plan).filter((r) => k.eintraege.get(r)?.thema.includes('angst'))
  soll(angst.length >= 1, 'nach „nicht geklappt“ keine Angst-Übung mehr')
  // Fachkraft: 18 × Daumen hoch auf Spiel/Bewegung, 3 Stunden „geklappt“ (je zwei Spielschritte)
  const spiele = (k.nachRolle.get('spiel') ?? []).filter((e) => e.format.includes('spiel') && !e.id.startsWith('pg:'))
  let f = leer()
  for (let i = 0; i < 18; i++) f = rueckmelden(f, ereignis('daumen_hoch', { t: '2026-10-05T10:00', baustein: spiele[i * 3].id, tags: { rolle: 'spiel' } }), spiele[i * 3])
  for (let i = 0; i < 6; i++) f = rueckmelden(f, ereignis('geklappt', { t: '2026-10-06T10:00', baustein: spiele[i * 5 + 1].id, tags: { rolle: 'spiel' } }), spiele[i * 5 + 1])
  const mia = KINDER.mia
  const am = auftrag(mia, 'schnell')
  const neu = spiele.find((e, i) => i % 3 !== 0 && i % 5 !== 1 && pruefe(e, kontext(k, mia, am, leer()), {}) === null)!
  const vorher = bewerte(neu, kontext(k, mia, am, leer()), {})
  const nachher = bewerte(neu, kontext(k, mia, am, f), {})
  const wirkung = nachher.s / vorher.s - 1
  info(`Wirkung auf ein neues Spiel: ${(100 * wirkung).toFixed(1)} %`)
  soll(Math.abs(wirkung) <= 0.06, `Wirkung ${(100 * wirkung).toFixed(1)} % > 6 %`)
})

await pruefung('Ethik 1/E-M1: Notiz enthält nur Angeklicktes; ohne Ziel-Richtung kein „gelingt“', () => {
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'schnell')!
  const r: Rueckmeldung = { ergebnis: 'geklappt', am: '2026-10-09' }
  const t = notizText(sz.p, sz.plan, 1, r)
  soll(!/gelingt|Unterstützung/.test(t), `„gelingt“ ohne Klick: ${t}`)
  soll(!/,\s*\./.test(t) && t.includes('Hat geklappt.'), `Notiz: ${t}`)
  const t2 = notizText(sz.p, sz.plan, 1, { ...r, ziele: [{ code: 'V-21', richtung: 'mit-hilfe' }], chips: ['war müde'] })
  soll(t2.includes('V-21') && t2.includes('gelingt mit Unterstützung') && t2.includes('War müde'), `Notiz mit Klicks: ${t2}`)
  const t3 = notizText(sz.p, PLAENE.find((x) => x.kind === 'mia' && x.weg === 'leicht')!.plan, 1, { ergebnis: 'beruhigt', am: '2026-10-09', ziele: [{ code: 'V-21', richtung: 'gelingt' }] })
  soll(t3.startsWith('Passgenau – Beziehungszeit') && !t3.includes('gelingt'), `Weg 3: ${t3}`)
  soll(!/2026|Mia/.test(t + t2 + t3), 'Notiz mit Datum oder Namen')
})

await pruefung('Ethik 2/E-M2/E-M3: Kind 15 mit heiklem Thema – nichts Heikles, Blatt mit Hilfe-Zeile', () => {
  const p = kind({ ref: 't-sienna', alterJahre: 15, ziele: [z('K-26', 'Ich drücke meine Gefühle mit passenden Worten aus.', 1)], vorsicht: ['heikel'], achtung: ['krise'] })
  for (const weg of ['schnell', 'gruendlich', 'leicht'] as const) {
    const a = auftrag(p, weg, weg === 'leicht' ? { tagesformen: ['traurig'] } : { heute: { energie: 3, konzentration: 3, stimmung: 1 } })
    const plan = planen(k, p, a, leer(), VERLAUF)
    soll(!JSON.stringify(plan).includes('suizid'), `${weg}: Themenschlüssel im Plan`)
    for (const r of alleTeile(plan)) {
      const e = k.eintraege.get(r)
      if (e && (e.sensibel || e.belastung >= 1)) soll(false, `${weg}: ${r} sensibel/Belastung`)
    }
    for (const s of plan.sitzungen) if (s.blatt) soll(s.blatt.bausteine.some((b) => b.ref === 'pg:notfall'), `${weg} S${s.nr}: Blatt ohne Hilfe-Zeile`)
    const d = druckSitzung(k, p, plan, 1, { sprache: 'de', warum: true })
    soll(d.hinweise.some((h) => h.includes('heikles Thema')), `${weg}: Planblatt ohne Hinweis`)
  }
  // Ein Quellblatt mit Hilfe-Zeile behält sie auf dem Kinderblatt (E-M3)
  const mitNotfall = [...intern(k).notfallBlatt][0]
  const b = [...k.eintraege.values()].find((e) => e.typ === 'baustein' && e.quelle.blatt === mitNotfall && !e.sensibel)
  if (b) {
    const sz = PLAENE.find((x) => x.kind === 'ilyas' && x.weg === 'schnell')!
    const plan = ersetzen(sz.plan, { sitzung: 1, blatt: 0 }, b)
    const kb = kinderblatt(k, sz.p, plan, 1, 'de')
    info(`Quellblatt ${mitNotfall}`)
    soll((kb.de.bausteine as { art: string }[]).some((x) => x.art === 'notfall') || plan.sitzungen[0].blatt!.bausteine.some((t) => t.ref === 'pg:notfall'), 'Hilfe-Zeile weggeschnitten')
  }
})

await pruefung('Ethik 3/E-M4: Planblatt zeigt „achtung“ der Einheit (j2-e33); jeder Kurs-/FF-Schritt trägt sie', async () => {
  const sz = PLAENE.find((x) => x.kind === 'ilyas' && x.weg === 'schnell')!
  const schritt = [...k.eintraege.values()].find((e) => e.id.startsWith('k:j2-e33:') && !e.sensibel)!
  const i = sz.plan.sitzungen[0].schritte.findIndex((x) => x.rolle === 'kern')
  const plan = ersetzen(sz.plan, { sitzung: 1, schritt: i }, schritt)
  const d = druckSitzung(k, sz.p, plan, 1, { sprache: 'de', warum: false })
  const achtung = intern(k).q.kurs.find((e) => e.id === 'j2-e33')!.achtung!
  soll(!!d.schritte[i].achtung && achtung.startsWith(d.schritte[i].achtung!.replace(/ …$/, '').slice(0, 60)), 'achtung fehlt im Druck')
  if (!SCHNELL) {
    const text = await pdfText(<Document><PlanSeite d={d} /></Document>)
    soll(text.replace(/\s+/g, ' ').includes(achtung.slice(0, 40)), 'achtung nicht im PDF-Text')
  }
  for (const e of k.eintraege.values()) {
    const [pre, u] = e.id.split(':')
    const quelle = pre === 'k' ? intern(k).q.kurs.find((x) => x.id === u)?.achtung : pre === 'f' ? intern(k).q.foerderfach.find((x) => x.id === u)?.de.achtung : undefined
    if (quelle) soll(e.achtung === quelle, `${e.id}: achtung fehlt`)
  }
})

await pruefung('Ethik 4/E-M5: Vorlage = Whitelist (Schema ohne Zusatzfelder), ohne Kind-Themen, ohne exaktes Alter', () => {
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'gruendlich')!
  const p: Profil = { ...sz.p, themen: [...sz.p.themen, { key: 'trauer', art: 'notiz', datum: '2026-10-01' }] }
  const plan: Plan = { ...sz.plan, von: 'fk-erfunden', sitzungen: sz.plan.sitzungen.map((s, i) => (i === 0 ? { ...s, status: 'gehalten', datum: '2026-10-06', rueckmeldung: { ergebnis: 'geklappt', am: '2026-10-06', chips: ['war müde'] } } : s)) }
  const { vorlage } = fuerTeam(plan, p)
  const erlaubt = (o: unknown, schema: unknown, pfad: string): void => {
    if (Array.isArray(schema)) {
      if (!soll(Array.isArray(o), `${pfad}: keine Liste`)) return
      for (const [i, x] of (o as unknown[]).entries()) erlaubt(x, schema[0], `${pfad}.${i}`)
      return
    }
    if (schema && typeof schema === 'object') {
      if (!soll(!!o && typeof o === 'object', `${pfad}: kein Objekt`)) return
      for (const key of Object.keys(o as object)) soll(key in (schema as object), `${pfad}.${key}: Feld nicht erlaubt`)
      for (const [key, s] of Object.entries(schema as object)) if ((o as Record<string, unknown>)[key] !== undefined) erlaubt((o as Record<string, unknown>)[key], s, `${pfad}.${key}`)
    }
  }
  const TEXTE = 'texte'
  const SCHEMA = { weg: 1, n: 1, dauer: 1, sitzungen: [{ phase: 1, schritte: [{ ref: 1, h: 1, rolle: 1, min: 1, ueber: TEXTE, ueberHerkunft: TEXTE }], blatt: { titel: 1, bausteine: [{ ref: 1, h: 1, ueber: TEXTE, ausgeblendet: TEXTE, ueberHerkunft: TEXTE }] } }] }
  erlaubt(vorlage.inhalt, SCHEMA, 'inhalt')
  const json = JSON.stringify(vorlage)
  for (const verboten of ['Mia', p.ref, plan.id, '2026-10-06', 'war müde', 'fk-erfunden', p.wochenziel!, 'geklappt', 'warum']) soll(!json.includes(verboten), `Vorlage enthält „${verboten}“`)
  soll(!vorlage.themen.includes('trauer'), 'Kind-Thema in der Vorlage')
  soll(['3–5', '6–8', '9–11', '12–14', '15+'].some((b) => vorlage.altersband.includes(b.split('–')[0])) && !/\bJ\b|Jahre|\d+;\d+/.test(vorlage.altersband), `Altersband „${vorlage.altersband}“`)
  soll(vorlage.von === null, 'Urheberin in der Vorlage')
})

await pruefung('Ethik 5/E-M6: Namen in eigenen Texten erkannt (50 Texte, ≥ 95 %)', () => {
  const p = kind({ ref: 't-jovana', vorname: 'Jovana', anrede: null, alterJahre: 9, interessen: ['fussball'] })
  const VARIANTEN = ['Jovana', 'Jovanas', 'jovana', 'JOVANA', 'Jovana’s', "Jovana's", 'Jovanna', 'Jovan', 'Jowana', 'Jovanachen']
  const SAETZE = ['Heute malt {} ein Bild.', 'Frag {}, was hilft.', 'Das ist {} Lieblingsspiel.', '{} darf zuerst würfeln.', 'Wenn {} müde ist, Pause machen.']
  let treffer = 0
  let n = 0
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'schnell')!
  for (const vname of VARIANTEN)
    for (const satz of SAETZE) {
      n++
      const text = satz.replace('{}', vname)
      const plan: Plan = { ...sz.plan, sitzungen: sz.plan.sitzungen.map((s) => ({ ...s, schritte: s.schritte.map((x, i) => (i === 1 ? { ...x, ueber: { text }, ueberHerkunft: { text: 'eigen' as const } } : x)) })) }
      const out = fuerTeam(plan, p).vorlage.inhalt.sitzungen[0].schritte[1].ueber?.text ?? ''
      if (!out.toLowerCase().includes('jovan') && !out.toLowerCase().includes('jowan')) treffer++
    }
  info(`${treffer}/${n} erkannt`)
  soll(treffer / n >= 0.95, `nur ${treffer}/${n}`)
})

await pruefung('Ethik 6/E-M7: Übernehmen – Texte der Autorin kommen mit; bei Vorsicht gesperrt (Original)', () => {
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'schnell')!
  const plan: Plan = { ...sz.plan, sitzungen: sz.plan.sitzungen.map((s) => ({ ...s, schritte: s.schritte.map((x, i) => (i === 1 ? { ...x, ueber: { text: 'Eigene Anleitung der Autorin.' }, ueberHerkunft: { text: 'eigen' as const } } : x)) })) }
  const roh = fuerTeam(plan, { ...sz.p, vorsicht: [] }).vorlage
  const vorlage: PraxisVorlage = { ...roh, id: 'pv-test', version: 1, status: 'sichtbar', erstellt: '2026-10-09' }
  const ohne = kind({ ref: 't-ohne', alterJahre: 9, ziele: sz.p.ziele })
  const u1 = uebernehmen(k, ohne, vorlage, leer())
  soll(u1.plan.sitzungen[0].schritte.some((x) => x.ueber?.text === 'Eigene Anleitung der Autorin.' && x.ueberHerkunft?.text === 'vorlage'), 'Text der Autorin fehlt')
  const trauer = { ...ohne, ref: 't-trauer', vorsicht: ['trauer' as const] }
  const u2 = uebernehmen(k, trauer, vorlage, leer())
  soll(!JSON.stringify(u2.plan).includes('Eigene Anleitung der Autorin.'), 'Text trotz Vorsicht übernommen')
  soll(u2.angepasst.some((x) => x.includes('Texte der Autorin nicht übernommen')), 'kein Hinweis auf gesperrte Texte')
  // Ethik 7/E-M9: Rückruf
  const r = vorlageZurueckgezogen(u1.plan, ['pv-test'])
  soll(r.geaendert && !JSON.stringify(r.plan).includes('Eigene Anleitung der Autorin.'), 'Rückruf entfernt den Text nicht')
  soll(r.plan.sitzungen[0].hinweise?.some((h) => h.includes('zurückgezogener Vorlage')) ?? false, 'Rückruf ohne Hinweis')
  soll(!vorlageZurueckgezogen(u1.plan, ['pv-anders']).geaendert, 'Rückruf trifft fremde Vorlage')
})

await pruefung('Ethik 8/E-M10: Ereignisse ohne Kind-Pseudonym und ohne Fachkraft; Krisentag nie negativ', () => {
  const e1 = ereignis('daumen_runter', { kind: 'kp-12345', fachkraft: 'fp-999', baustein: 'b:wutvulkan:1', grund: 'mag-nicht' } as Partial<Ereignis>)
  soll(e1.kind === null && e1.fachkraft === null && !/kp-|fp-/.test(JSON.stringify(e1)), 'Pseudonym im Ereignis')
  const e2 = ereignis('nicht', { weg: 'leicht', baustein: 'fb:reissbild' })
  soll(e2.wert >= 0 && e2.krisentag === true, 'Krisentag negativ')
  const v = rueckmelden(leer(), ereignis('nicht', { t: '2026-10-05T10:00', tagesform: { e: 3, k: 3, s: 1 }, baustein: 'fb:reissbild', tags: { rolle: 'kern' } }))
  soll(Object.values(v.kind!.z).every((x) => x.b === 0) && Object.values(v.ich.z).every((x) => x.b === 0), 'Krisentag schreibt Negatives')
  const id = new Set(Array.from({ length: 200 }, () => ereignis('gedruckt', {}).id))
  soll(id.size === 200, 'Ereignis-Ids nicht eindeutig')
})

await pruefung('Ethik 10/E-M16: keine Katharsis in neuen Inhalten und in keinem Plan', () => {
  for (const { daten } of intern(k).q.inhalte) for (const x of Array.isArray(daten) ? daten : []) soll(!KATHARSIS_RE.test(JSON.stringify(x)), `${(x as { id: string }).id}: Katharsis-Wort`)
  for (const sz of PLAENE) for (const r of alleTeile(sz.plan)) soll(!k.eintraege.get(r)?.merkmale?.katharsis, `${r} mit Katharsis im Plan`)
})

await pruefung('Dünne Daten (T-M5): Kind ohne Ziele und Themen – je Schritt ein Warum, Blatt ≥ 3 Pakete (≥ 2 immer), keine leere Zielkarte', () => {
  const p = kind({ ref: 't-anouk', alterJahre: 6, dichte: 'duenn' })
  let blaetter = 0
  let dreier = 0
  for (const a of [auftrag(p, 'schnell', { dauer: 45 }), auftrag(p, 'schnell', { dauer: 45, thema: ['kompetenz:gefuehle-erkennen'] }), auftrag(p, 'gruendlich', { n: 3, dauer: 45, thema: ['freundschaft'] })]) {
    const plan = planen(k, p, a, leer(), VERLAUF)
    const name = a.thema?.join(',') || 'ohne Thema'
    soll(plan.titel !== 'Einzelstunde', `${name}: Titel ohne Zusatz`)
    for (const s of plan.sitzungen) {
      soll(s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss').every((x) => (x.warum ?? []).length >= 1), `${name} S${s.nr}: Schritt ohne Warum`)
      const n = s.blatt?.bausteine.filter((b) => !b.ref.startsWith('pg:')).length ?? 0
      soll(n >= 2, `${name} S${s.nr}: Blatt mit ${n} Paketen`)
      blaetter++
      if (n >= 3) dreier++
      soll(!!s.hinweise?.some((h) => h.includes('ELDiB')), `${name} S${s.nr}: kein Hinweis „ELDiB-Einschätzung fehlt“`)
      const kb = kinderblatt(k, p, plan, s.nr, 'de')
      soll(!kb.passgenau?.ziel, `${name}: „Mein Ziel“ ohne Ziel`)
      const d = druckSitzung(k, p, plan, s.nr, { sprache: 'de', warum: true, karten: true })
      soll(!(d.karten?.de.bausteine ?? []).some((b) => b.art === 'zielkarte'), `${name}: leere Zielkarte`)
    }
    for (const x of verstoesse(p, a, plan)) soll(false, `${name}: ${x}`)
  }
  info(`Blätter mit ≥ 3 Paketen: ${dreier}/${blaetter}`)
  soll(dreier / blaetter >= 0.75, `nur ${dreier}/${blaetter} Blätter mit ≥ 3 Paketen`)
})

await pruefung('Französisch (T-M4): FR-Kinder bekommen ≥ 5 Pakete, Banner „nur auf Deutsch“ stimmt', () => {
  const kinder = [
    kind({ ref: 't-kofi', alterJahre: 11, sprache: { blatt: 'fr', woerter: [] }, ziele: [z('SOZ-32', 'Je respecte les autres.', 1)], themen: [{ key: 'ausgrenzung', art: 'notiz', datum: '2026-10-01' }] }),
    kind({ ref: 't-ilyas-fr', alterJahre: 14, sprache: { blatt: 'fr', woerter: [] }, ziele: [z('SOZ-32', '', 1), z('V-22', '', 2)], themen: [{ key: 'angst', art: 'reunion', datum: '2026-10-03' }] }),
    kind({ ref: 't-dario', alterJahre: 15, sprache: { blatt: 'fr', woerter: [] }, ziele: [z('K-31', '', 1)] }),
  ]
  for (const p of kinder) {
    const a = auftrag(p, 'gruendlich', { n: 3, dauer: 45 })
    const plan = planen(k, p, a, leer(), VERLAUF)
    const pakete = plan.sitzungen.flatMap((s) => (s.blatt?.bausteine ?? []).filter((b) => !b.ref.startsWith('pg:')))
    info(`${p.ref}: ${pakete.length} Pakete`)
    soll(pakete.length >= 5, `${p.ref}: nur ${pakete.length} Pakete`)
    for (const s of plan.sitzungen) {
      const teile = [...s.schritte.map((x) => x.ref), ...(s.blatt?.bausteine ?? []).map((b) => b.ref)].filter((r) => !r.startsWith('pg:')).map((r) => k.eintraege.get(r)!)
      const nurDe = teile.filter((e) => (e.typ === 'schritt' ? !e.fr : !e.sprache.fr)).length
      const banner = s.hinweise?.find((h) => h.includes('nur auf Deutsch'))
      soll(nurDe ? banner === `${nurDe} von ${teile.length} Teilen nur auf Deutsch.` : !banner, `${p.ref} S${s.nr}: Banner „${banner}“ statt ${nurDe}/${teile.length}`)
    }
    for (const x of verstoesse(p, a, plan)) soll(false, `${p.ref}: ${x}`)
  }
})

await pruefung('20 erfundene Testkinder × 3 Wege (tests/passgenau): harte Regeln, Minuten, Blatt oder Begründung, Ziel-Satz in der Blattsprache', () => {
  const kinder: Profil[] = JSON.parse(readFileSync(join(ROOT, 'tests/passgenau/kinder.json'), 'utf8'))
  const auftraege: Record<string, Auftrag[]> = JSON.parse(readFileSync(join(ROOT, 'tests/passgenau/auftraege.json'), 'utf8'))
  let n = 0
  let sitzungen = 0
  let mitBlatt = 0
  const zeiten: number[] = []
  for (const p of kinder)
    for (const a of auftraege[p.ref] ?? []) {
      n++
      const t = Date.now()
      const plan = planen(k, p, a, leer(), VERLAUF)
      zeiten.push(Date.now() - t)
      const name = `${p.ref}/${a.weg}`
      for (const x of verstoesse(p, a, plan)) soll(false, `${name}: ${x}`)
      for (const s of plan.sitzungen) {
        sitzungen++
        const summe = s.schritte.reduce((x, y) => x + y.min, 0)
        soll(Math.abs(summe - a.dauer) <= 2, `${name} S${s.nr}: ${summe} statt ${a.dauer} Min.`)
        // Blatt gewünscht (ausdrücklich oder als Vorgabe): Blatt da – oder ein klarer Grund im Plan
        const gewuenscht = a.blatt ?? (p.alterJahre <= 5 || a.weg === 'leicht' ? 'ohne' : 'mit')
        if (gewuenscht === 'mit' && !(a.weg !== 'leicht' && a.dauer <= 10)) {
          if (s.blatt) mitBlatt++
          else soll(!!s.hinweise?.some((h) => /ohne Blatt geplant/.test(h)), `${name} S${s.nr}: kein Blatt und kein Grund`)
        }
        if (gewuenscht === 'ohne') soll(!s.blatt, `${name} S${s.nr}: Blatt, obwohl ohne gewünscht`)
        // „Mein Ziel“ nur in der Sprache des Blatts
        if (s.blatt && plan.ziele[0]) {
          const satz = zielSatz(k, p, plan.ziele[0], a.sprache)
          if (a.sprache === 'fr') soll(!satz || /^(je|j['’]|moi)\b/i.test(satz), `${name}: deutscher Ziel-Satz auf französischem Blatt`)
          const kb = kinderblatt(k, p, { ...plan, sitzungen: plan.sitzungen.map((x) => (x.nr === s.nr && x.blatt ? { ...x, blatt: { ...x.blatt, ziel: true } } : x)) }, s.nr, a.sprache)
          const z = kb.passgenau?.ziel?.[a.sprache]
          if (a.sprache === 'fr' && z) soll(/^(je|j['’]|moi)\b/i.test(z), `${name}: „Mein Ziel“ auf Deutsch`)
        }
      }
    }
  zeiten.sort((x, y) => x - y)
  info(`${n} Aufträge, ${sitzungen} Sitzungen, ${mitBlatt} Blätter; planen Median ${zeiten[Math.floor(zeiten.length / 2)]} ms, max ${zeiten[zeiten.length - 1]} ms`)
})

await pruefung('Beschriftung (4.6): Overlay-Prüfung, Sicherungen (Katharsis, akut), ältere Fassung, Einzelvariante im Text', () => {
  const bank = intern(k).eldib.items
  const schritt: EintragKontext = { typ: 'schritt', h: 'aaaaaaaa', fr: false, text: 'Alle stehen im Kreis und werfen einen Ball.', dauerTyp: 10 }
  const gut: Beschriftung = { rolle: ['spiel'], eldib: { primaer: ['SOZ-18'], sekundaer: ['K-21'] }, einzeltauglich: 'angepasst', einzelvariante: { text: 'Die Fachkraft und das Kind werfen sich den Ball zu und sagen dabei ein Wort zum Thema.', sagen: ['Fang!'] }, begruendung: 'Kreis entfällt.', von: 'agent', sicher: 0.9 }
  soll(pruefeBeschriftung('k:x:1', gut, schritt, bank).length === 0, `gültiges Overlay abgelehnt: ${pruefeBeschriftung('k:x:1', gut, schritt, bank).join(' | ')}`)
  const falsch: [string, unknown, EintragKontext][] = [
    ['unbekanntes Feld', { ...gut, reiz: 2 }, schritt],
    ['Code nicht in der Bank', { ...gut, eldib: { primaer: ['V-99'] } }, schritt],
    ['angepasst ohne Variante', { ...gut, einzelvariante: undefined }, schritt],
    ['Variante bei „ja“', { ...gut, einzeltauglich: 'ja' }, schritt],
    ['Variante zu lang', { ...gut, einzelvariante: { text: 'x'.repeat(301) } }, schritt],
    ['FR fehlt, obwohl die Quelle FR hat', gut, { ...schritt, fr: true }],
    ['allgemein am Schritt', { ...gut, allgemein: { '0.text': 'Text' } }, schritt],
    ['Begründung zu lang', { ...gut, begruendung: 'x'.repeat(121) }, schritt],
    ['Agent senkt Katharsis', { ...gut, merkmale: {} }, { ...schritt, text: 'Wir lassen die Wut raus und hauen auf ein Kissen.' }],
    ['Agent senkt „akut“', { ...gut, sensibel: null }, { ...schritt, text: 'Gespräch über Selbstverletzung.' }],
    ['Werkzeug fürs Kind', { rolle: ['uebung'], zielgruppe: 'kind', begruendung: 'x', von: 'agent', sicher: 0.9 }, { typ: 'baustein', werkzeug: true }],
    ['Baustein angepasst', { einzeltauglich: 'angepasst', begruendung: 'x', von: 'agent', sicher: 0.9 }, { typ: 'baustein' }],
    ['Alter ohne Stufe des Blatts', { alter: { von: 3, bis: 5 }, begruendung: 'x', von: 'agent', sicher: 0.9 }, { typ: 'baustein', stufen: ['ES'] }],
    ['neue Inhalte', gut, schritt],
  ]
  for (const [name, b, ctx] of falsch) soll(pruefeBeschriftung(name === 'neue Inhalte' ? 'fb:x' : 'k:x:1', b, ctx, bank).length > 0, `nicht abgelehnt: ${name}`)
  // Anwenden: Overlay gewinnt, sicher aus dem Overlay; Agent senkt weder Katharsis noch „akut“, Fachkraft schon; ältere Fassung ≤ 0,6
  const meta = (): SchrittMeta => ({ id: 'k:x:1', h: 'aaaaaaaa', rolle: ['kern'], thema: [], eldib: [], kompetenz: [], alter: { von: 12, bis: 17 }, stufen: ['ES'], dauer: { min: 4, typ: 10, max: 12 }, sozialform: ['gruppe'], einzeltauglich: 'nein', energie: 3, belastung: 0, reiz: 2, format: [], material: [], sprache: { de: true, fr: false }, qualitaet: 'geprueft', sicher: { rolle: 0.5 }, merkmale: { katharsis: true }, sensibel: 'akut' })
  const m1 = meta()
  wendeBeschriftungAn(m1, { ...gut, merkmale: {}, sensibel: null, h: 'aaaaaaaa' }, { baustein: false })
  soll(m1.rolle[0] === 'spiel' && m1.einzeltauglich === 'angepasst' && m1.einzelvariante?.text === gut.einzelvariante!.text && m1.sicher.rolle === 0.9 && m1.sicher.einzelvariante === 0.9, 'Overlay nicht angewandt')
  soll(!!m1.merkmale?.katharsis && m1.sensibel === 'akut', 'Agent hat Katharsis oder „akut“ gesenkt')
  const m2 = meta()
  wendeBeschriftungAn(m2, { ...gut, merkmale: {}, sensibel: null, von: 'fachkraft' }, { baustein: false })
  soll(!m2.merkmale && m2.sensibel === undefined, 'Fachkraft darf Katharsis/„akut“ senken')
  const m3 = meta()
  soll(wendeBeschriftungAn(m3, { ...gut, h: 'bbbbbbbb' }, { baustein: false }).veraltet && m3.sicher.rolle === 0.6, 'ältere Fassung nicht erkannt')
  // im Katalog: eine beschriftete Einzelvariante ersetzt den Gruppentext (DE und, wo vorhanden, FR)
  const mitVariante = [...k.eintraege.values()].filter((e): e is Extract<KatalogEintrag, { typ: 'schritt' }> => e.typ === 'schritt' && !!e.einzelvariante && /^[kfms]:/.test(e.id))
  for (const e of mitVariante.slice(0, 20)) {
    soll(textVon(e, 'de').text === e.einzelvariante!.text, `${e.id}: textVon zeigt nicht die Einzelvariante`)
    if (e.fr?.einzelvariante) soll(textVon(e, 'fr').text === e.fr.einzelvariante.text, `${e.id}: FR-Einzelvariante fehlt im Text`)
  }
  info(`${falsch.length} Fehlerfälle abgelehnt · ${mitVariante.length} Schritte mit beschrifteter Einzelvariante, ${mitVariante.filter((e) => e.fr?.einzelvariante).length} mit FR`)
})

await pruefung('Ids (T-M10): auflösen ok / umgezogen / überarbeitet / fehlt – nie ein falscher Baustein', () => {
  const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'gruendlich')!
  for (const s of sz.plan.sitzungen) for (const x of [...s.schritte, ...(s.blatt?.bausteine ?? [])]) soll(aufloesen(k, x.ref, x.h).status === 'ok', `${x.ref} löst nicht auf`)
  const b = [...k.eintraege.values()].find((e) => e.typ === 'baustein')!
  soll(aufloesen(k, b.id, 'deadbeef').status === 'ueberarbeitet', 'neue Fassung nicht erkannt')
  soll(aufloesen(k, 'b:umgebaut:9', b.h).eintrag?.id === b.id, 'umgezogen nicht gefunden')
  const f = aufloesen(k, 'b:gibtsnicht:1', 'deadbeef')
  soll(f.status === 'fehlt' && f.eintrag === null, 'fehlt nicht erkannt')
})

await pruefung('Druckmaterial (T-M12): Schritt mit Bildkarten bringt sein Paket mit; Materialseite im Druck', () => {
  const p = KINDER.noe
  const s = [...k.eintraege.values()].find((e) => e.typ === 'schritt' && e.id.startsWith('s:') && (e.blatt ?? []).length && /bildkarte|karten/i.test(e.text) && e.einzeltauglich !== 'nein')!
  const plan0 = planen(k, p, auftrag(p, 'schnell', { dauer: 30 }), leer(), VERLAUF)
  const i = plan0.sitzungen[0].schritte.findIndex((x) => x.rolle === 'kern')
  const plan = ersetzen(plan0, { sitzung: 1, schritt: i }, s)
  const pakete = druckPakete(k, plan, 1)
  soll(pakete.length >= 1, `${s.id}: kein Druckpaket`)
  const d = druckSitzung(k, p, plan, 1, { sprache: 'de', warum: false })
  soll(!!d.materialSeite && d.material.some((m) => m.includes('Materialseite')), 'Materialseite fehlt')
  info(`${s.id} → ${pakete.map((b) => b.id).join(', ')}`)
})

if (!SCHNELL) {
  await pruefung('Seiten (echtes Rendern): Kinderblatt C1/C2 eine Seite, sonst ≤ 2; Vorhersage = PDF', async () => {
    const faelle: { name: string; p: Profil; plan: Plan; nr: number; blatt: Blatt }[] = []
    const noeMit = planen(k, KINDER.noe, auftrag(KINDER.noe, 'gruendlich', { blatt: 'mit', n: 2, dauer: 30 }), leer(), VERLAUF)
    const c2 = kind({ ref: 't-lucie', alterJahre: 7, ziele: [z('V-15', 'Ich bleibe bei einer Aufgabe.', 1)] })
    const lucie = planen(k, c2, auftrag(c2, 'gruendlich', { n: 2, dauer: 30 }), leer(), VERLAUF)
    for (const { p, plan, name } of [...PLAENE.map((x) => ({ p: x.p, plan: x.plan, name: `${x.kind}/${x.weg}` })), { p: KINDER.noe, plan: noeMit, name: 'noe/mit' }, { p: c2, plan: lucie, name: 'lucie' }])
      for (const s of plan.sitzungen) if (s.blatt) faelle.push({ name: `${name} S${s.nr}`, p, plan, nr: s.nr, blatt: kinderblatt(k, p, plan, s.nr, p.sprache.blatt) })
    const dateien: string[] = []
    for (const f of faelle) dateien.push(await pdfDatei(<BlattDokument blatt={f.blatt} opt={{ sprache: f.p.sprache.blatt, lehrer: false }} />))
    const infos = pdfInfo(dateien)
    let gleich = 0
    faelle.forEach((f, i) => {
      const kurz = ['C1', 'C2'].includes(f.blatt.stufen[0])
      soll(infos[i].seiten <= (kurz ? 1 : 2), `${f.name}: ${infos[i].seiten} Seiten (${f.blatt.stufen[0]})`)
      if (seitenFuellung(k, f.p, f.plan, f.nr).length === infos[i].seiten) gleich++
      else info(`${f.name}: Vorhersage ${seitenFuellung(k, f.p, f.plan, f.nr).length}, PDF ${infos[i].seiten}`)
    })
    info(`${faelle.length} Kinderblätter, Vorhersage = PDF in ${gleich}`)
    soll(gleich === faelle.length, 'Seitenzahl Vorschau ≠ PDF')
  })

  await pruefung('Datenschutz (9.6): PDF-Text des Kinderblatts gegen die Sperrliste, Planblatt ohne Testwerte/Diagnosen/Notizdaten', async () => {
    const p = kind({
      ref: 't-jovana', vorname: 'Jovana', anrede: null, alterJahre: 9, ziele: [z('V-21', 'Ich behalte die Kontrolle über mein Verhalten.', 1), z('K-26', 'Ich drücke meine Gefühle mit passenden Worten aus.', 2)],
      themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-02' }, { key: 'freundschaft', art: 'notiz', datum: '2026-09-28' }], interessen: ['fussball'], wochenziel: 'Ich warte, bis ich drankomme.',
      zugang: { lesen: 1, schreiben: 1, bild: 2, tempo: 'normal', struktur: 'normal', quelle: ['test:2025-05'] },
      wissen: [{ gruppe: 'zugang', text: 'GIQ 85, SV niedrig – ADHS (F90.0)', quelle: 'test', datum: '2025-05-01' }],
    })
    const SPERRE: [RegExp, string][] = [
      [/Jovana/i, 'Vorname ohne Haken'], [/Kerschbaumer/i, 'Nachname'], [/(?:^|[^A-Za-z0-9])(?:[FZ]\d{2}(?:\.\d{1,2})?|6[A-E]\d{2})(?![0-9])/, 'ICD-Code'],
      [/\b(ADHS|Autismus|Asperger|Legasthenie|Dyskalkulie|LRS|Depression|Angststörung)\b/i, 'Diagnose'], [/\b(SV|VR|AG|VG|GIQ|QIT)\b/, 'Testkürzel'],
      [/\b(K|V|SOZ|KOG)-\d{1,2}\b/, 'ELDiB-Code'], [/\bPEI\b/, 'PEI'], [/\bDS\b/, 'DS'], [/\b2\.10\.|\b28\.9\./, 'Datum aus dem Dossier'],
    ]
    const dateienKind: string[] = []
    const dateienPlan: string[] = []
    for (const weg of ['gruendlich', 'schnell', 'leicht'] as const) {
      const plan = planen(k, p, auftrag(p, weg, weg === 'gruendlich' ? { n: 2, dauer: 45 } : weg === 'leicht' ? { tagesformen: ['wuetend'] } : {}), leer(), VERLAUF)
      for (const s of plan.sitzungen) {
        const ziel: Plan = { ...plan, sitzungen: plan.sitzungen.map((x) => (x.nr === s.nr && x.blatt ? { ...x, blatt: { ...x.blatt, ziel: true } } : x)) }
        const d = druckSitzung(k, p, ziel, s.nr, { sprache: 'de', warum: true, karten: true })
        for (const b of [d.kinderblatt, d.karten, d.materialSeite]) if (b) dateienKind.push(await pdfDatei(<BlattDokument blatt={b} opt={{ sprache: 'de', lehrer: false }} />))
        dateienPlan.push(await pdfDatei(<Document><PlanSeite d={d} /></Document>))
      }
    }
    const kindT = pdfInfo(dateienKind)
    const planT = pdfInfo(dateienPlan)
    for (const [i, x] of kindT.entries()) for (const [re, was] of SPERRE) soll(!re.test(x.text.join('\n')), `Kinderblatt/Karte ${i}: ${was} („${re.exec(x.text.join('\n'))?.[0]}“)`)
    for (const [i, x] of planT.entries())
      for (const [re, was] of SPERRE.filter(([, w]) => ['Nachname', 'ICD-Code', 'Diagnose', 'Testkürzel', 'DS', 'Datum aus dem Dossier'].includes(w))) soll(!re.test(x.text.join('\n')), `Planblatt ${i}: ${was} („${re.exec(x.text.join('\n'))?.[0]}“)`)
    info(`${kindT.length} Kinder-PDFs, ${planT.length} Planblätter`)
  })

  await pruefung('Vorschau (T-M8): Lage jedes Teils aus den react-pdf-Layoutdaten', async () => {
    const sz = PLAENE.find((x) => x.kind === 'mia' && x.weg === 'schnell')!
    const d = druckSitzung(k, sz.p, sz.plan, 1, { sprache: 'de', warum: true, karten: true })
    let teile: ReturnType<typeof teilPositionen> = []
    await renderToBuffer(<SitzungDokument d={d} onRender={(x) => { const l = (x as { _INTERNAL__LAYOUT__DATA_?: unknown })._INTERNAL__LAYOUT__DATA_; if (l) teile = teilPositionen(l) }} />)
    const s = sz.plan.sitzungen[0]
    for (let i = 0; i < s.schritte.length; i++) soll(teile.some((t) => t.id === `pg-teil:1:schritt:${i}`), `Schritt ${i} ohne Lage`)
    for (let i = 0; i < (s.blatt?.bausteine.length ?? 0); i++) if (!s.blatt!.bausteine[i].ref.startsWith('pg:stundenleiste')) soll(teile.some((t) => t.id === `pg-teil:1:blatt:${i}`), `Blatt-Teil ${i} ohne Lage`)
    soll(teile.every((t) => t.b > 0 && t.h > 0 && t.seite >= 1), 'Lage ohne Größe')
    info(`${teile.length} Teile mit Lage`)
  })
}

await pruefung('Tempo: planen < 200 ms nach geladenem Katalog (Median je Szenario)', () => {
  const zeiten: string[] = []
  let schlecht = 0
  for (const sz of PLAENE) {
    const t: number[] = []
    for (let i = 0; i < 5; i++) {
      const a = Date.now()
      planen(k, sz.p, { ...sz.a, heute: { energie: 4 + (i % 2), konzentration: 4, stimmung: 4 } }, leer(), VERLAUF)
      t.push(Date.now() - a)
    }
    t.sort((x, y) => x - y)
    zeiten.push(`${sz.kind}/${sz.weg} ${t[2]}`)
    if (t[2] >= 200) schlecht++
  }
  info(zeiten.join(', '))
  soll(schlecht === 0, `${schlecht} Szenarien ≥ 200 ms`)
})

rmSync(TMP, { recursive: true, force: true })
const fehler = ergebnisse.filter((e) => !e.ok)
console.log(`\n${ergebnisse.length - fehler.length}/${ergebnisse.length} Prüfungen bestanden · ${Math.round((Date.now() - t0) / 1000)} s`)
for (const f of fehler) console.log(`\nFEHLER ${f.name}\n  ${f.info.slice(1).join('\n  ')}`)
process.exit(fehler.length ? 1 : 0)
