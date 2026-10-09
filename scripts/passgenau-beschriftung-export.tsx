// Passgenau – Export für die Beschrifter (Konzept 4.6, Phase 1): der automatische Katalog in Stapeln zu 30 Einträgen,
// je Eintrag mit vollem Kontext (Quelle, ganzer Text, Nachbarn, aktuelle Werte, unsichere Felder).
//
//   npm run passgenau:beschriftung-export -- --ordner=<ordner> [--groesse=30] [--alle]
//
//   <ordner>/stapel/<quelle>-<nnn>.json   Stapel (Namen stabil: Nummer aus der vollen, festen Reihenfolge)
//   <ordner>/stapel/index.json            Datei, Quelle, Anzahl, Priorität – in der Reihenfolge der Bearbeitung
//   <ordner>/ELDIB.md                      alle Codes der ELDiB-Bank (für die Anleitung)
//
// Priorität: (a) Gruppenschritte aus Kurs, Förderfach, Spielschule, Material, die in einer Einzelstunde vorkommen
// könnten (einzeltauglich + Einzelvariante); (b) Blatt-Bausteine (ELDiB primär/sekundär, Rolle, Bogen, Alter);
// (c) alle übrigen. Schon beschriftete Einträge (gültiges Overlay zur aktuellen Fassung) fallen ohne --alle heraus;
// Stapel ohne offene Einträge werden nicht geschrieben. Ohne --ordner: tmp/passgenau-beschriftung.
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { KatalogEintrag, Stundenschritt } from '../src/passgenau/typen'
import { bausteinInhalt, intern, textVon } from '../src/passgenau/kern/katalog'
import { texte } from '../src/passgenau/kern/inhalt'
import { STUFE_ALTER } from '../src/passgenau/kern/hilfen'
import { KOMPETENZ_NAME, kompetenzAusCode } from '../src/passgenau/kern/vokabular'
import { BESCHRIFTUNG_FELDER, MERKMALE, type BeschriftungFeld } from '../src/passgenau/kern/beschriftung'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'
import { phaseAusQuelle, pruefeBeschriftungen, stellenAusKatalog } from './passgenau-beschriftung'

const args = process.argv.slice(2)
const arg = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3)
const ORDNER = resolve(arg('ordner') ?? join(ROOT, 'tmp/passgenau-beschriftung'))
const GROESSE = Number(arg('groesse') ?? 30)
const ALLE = args.includes('--alle')
const STAPEL = join(ORDNER, 'stapel')

const t0 = Date.now()
const k = await ladeKatalogNode()
const ki = intern(k)
const q = ki.q
const bank = ki.eldib.items
const { gueltig, veraltet } = pruefeBeschriftungen(k)
const veralteteIds = new Set(veraltet.map((v) => v.split(' ')[0]))
const erledigt = (id: string) => gueltig.has(id) && !veralteteIds.has(id)

// --- Quelle, Reihenfolge, Priorität ---------------------------------------------------------------------------------

type Quelle = 'kurs' | 'foerderfach' | 'spielschule' | 'material' | 'blatt' | 'crew'
const PRAEFIX: Record<string, Quelle> = { k: 'kurs', f: 'foerderfach', s: 'spielschule', m: 'material', b: 'blatt', c: 'crew' }
const quelleVon = (id: string): Quelle => PRAEFIX[id.split(':')[0]]

// Stelle eines Schritts in seiner Quelle (stabile Ids: steht als `p` in schritte.json, wenn sie von der Nummer abweicht)
const stelleVon = stellenAusKatalog()
const ordnung = {
  // Kurs: Jahr, reguläre Einheiten vor den Jokern, Nummer
  kurs: new Map([...q.kurs].sort((a, b) => a.jahr - b.jahr || Number(!!a.joker) - Number(!!b.joker) || a.nr - b.nr).map((e, i) => [e.id, i])),
  foerderfach: new Map(q.foerderfach.map((e, i) => [e.id, i])),
  material: new Map(q.materialien.map((m, i) => [m.id, i])),
  blatt: new Map(q.blaetter.map((b, i) => [b.id, i])),
  crew: new Map(q.crew.themen.flatMap((t) => t.spiele.map((s) => s.id)).map((id, i) => [id, i])),
}
/** Einheit (Blatt, Kurseinheit, Material, Themenwoche) und Stelle darin. */
function ort(e: KatalogEintrag): { einheit: string; nr: number; stelle: number } {
  const [p, u] = e.id.split(':')
  if (e.typ === 'baustein') return { einheit: e.quelle.blatt, nr: ordnung.blatt.get(e.quelle.blatt) ?? 9999, stelle: e.quelle.pfad[0] }
  const st = stelleVon.get(e.id) ?? 0
  if (p === 'k') return { einheit: u, nr: ordnung.kurs.get(u) ?? 9999, stelle: st }
  if (p === 'f') return { einheit: u, nr: ordnung.foerderfach.get(u) ?? 9999, stelle: st }
  if (p === 'm') return { einheit: u, nr: ordnung.material.get(u) ?? 9999, stelle: st }
  if (p === 's') return { einheit: u, nr: ordnung.blatt.get(u) ?? 9999, stelle: st }
  return { einheit: 'crew', nr: 0, stelle: ordnung.crew.get(u) ?? 9999 }
}

type Prio = 'a' | 'b' | 'c'
/** (a) Gruppenschritt, der in einer Einzelstunde vorkommen könnte: Kurs, Förderfach, Spielschule (ohne Reim), Material
 *  mit Gruppe/Klasse – nicht, was ohnehin nie vorgeschlagen wird (Katharsis, „akut“, für Erwachsene) oder nur über Tage
 *  läuft (mehrtägig, nur Transfer). (b) Blatt-Baustein fürs Kind. (c) alles andere. */
function prioritaet(e: KatalogEintrag): Prio {
  const qu = quelleVon(e.id)
  const nie = !!e.merkmale?.katharsis || e.sensibel === 'akut' || (e.zielgruppe !== undefined && e.zielgruppe !== 'kind')
  if (e.typ === 'baustein') return nie ? 'c' : 'b'
  if (qu === 'crew' || nie || e.id.endsWith(':reim') || e.mehrtaegig) return 'c'
  if (e.rolle.length === 1 && e.rolle[0] === 'transfer') return 'c'
  if (e.sozialform.length === 1 && e.sozialform[0] === 'einzeln') return 'c'
  return 'a'
}
const QUELLEN_REIHE: Record<Prio, Quelle[]> = {
  a: ['kurs', 'foerderfach', 'spielschule', 'material'],
  b: ['blatt'],
  c: ['crew', 'material', 'spielschule', 'blatt', 'kurs', 'foerderfach'],
}

// --- Felder: Pflicht je Priorität, unsicher aus `sicher` ------------------------------------------------------------

const PFLICHT: BeschriftungFeld[] = ['rolle', 'alter', 'eldib', 'energie', 'einzeltauglich', 'belastung']
function pruefen(e: KatalogEintrag, p: Prio): BeschriftungFeld[] {
  const f = new Set<BeschriftungFeld>(PFLICHT)
  if (e.typ === 'schritt') {
    if (p === 'a' || e.einzeltauglich !== 'ja') f.add('einzelvariante')
    f.add('merkmale')
  } else {
    f.add('bogen').add('kompetenz').add('sensibel')
    if (e.braucht?.length) f.add('allgemein').add('braucht')
  }
  if (p === 'c') f.add('zielgruppe')
  return BESCHRIFTUNG_FELDER.filter((x) => f.has(x))
}
function unsicher(e: KatalogEintrag): BeschriftungFeld[] {
  return BESCHRIFTUNG_FELDER.filter((x) => {
    if (x === 'einzelvariante') return e.typ === 'schritt' && e.einzeltauglich === 'angepasst' && !e.einzelvariante
    if (x === 'allgemein') return e.typ === 'baustein' && !!e.braucht?.length && !e.allgemein
    if (x === 'braucht') return e.typ === 'baustein' && !!e.braucht?.length && (e.sicher.braucht ?? 0) < 0.7
    if (x === 'mehrtaegig') return !!e.mehrtaegig && (e.sicher.mehrtaegig ?? 0) < 0.7
    const s = e.sicher[x]
    if (s === undefined) return PFLICHT.includes(x)
    return s < 0.7
  })
}

// --- Werte und Texte ------------------------------------------------------------------------------------------------

function werte(e: KatalogEintrag) {
  return {
    rolle: e.rolle,
    bogen: e.bogen ?? null,
    eldib: { primaer: e.eldib.filter((x) => x.gewicht === 1).map((x) => x.code), sekundaer: e.eldib.filter((x) => x.gewicht !== 1).map((x) => x.code) },
    kompetenz: e.kompetenz,
    alter: e.alter,
    energie: e.energie,
    belastung: e.belastung,
    einzeltauglich: e.einzeltauglich,
    ...(e.typ === 'schritt' && e.einzelvariante ? { einzelvariante: { ...e.einzelvariante, ...(e.fr?.einzelvariante ? { fr: e.fr.einzelvariante } : {}) } } : {}),
    ...(e.typ === 'baustein' && e.allgemein ? { allgemein: e.allgemein } : {}),
    zielgruppe: e.zielgruppe ?? 'kind',
    merkmale: Object.fromEntries(MERKMALE.map((m) => [m, !!e.merkmale?.[m]])),
    sensibel: e.sensibel ?? null,
    mehrtaegig: !!e.mehrtaegig,
    ...(e.typ === 'baustein' ? { braucht: e.braucht ?? [] } : {}),
  }
}

/** Werte zur Information (nicht Teil der Beschriftung). */
function info(e: KatalogEintrag) {
  const gemeinsam = { stufen: e.stufen, dauer: e.dauer, sozialform: e.sozialform, format: e.format, thema: e.thema, material: e.material }
  if (e.typ === 'baustein') return { ...gemeinsam, lesemenge: e.lesemenge, schreibmenge: e.schreibmenge, bildanteil: e.bildanteil, ...(e.ohneZiel ? { ohneZiel: true } : {}) }
  return { ...gemeinsam, phase: phaseAusQuelle(k, e.id, stelleVon), reiz: e.reiz, ...(e.ort ? { ort: e.ort } : {}), ...(e.ohneZiel ? { ohneZiel: true } : {}), ...(e.blatt?.length ? { blatt: e.blatt } : {}) }
}

const kurz = (s: string, n: number) => {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + ' …'
}

function codeText(c: string): string {
  const x = bank[c]
  if (!x) return `${c}: (nicht in der Bank)`
  const [von, bis] = ki.eldib.stufen[String(x.s)] ?? [0, 0]
  return `${x.k} (Stufe ${x.s}, ${von}–${bis} J., ${KOMPETENZ_NAME[kompetenzAusCode(c)].de}): ${x.b}`
}

/** Herkunft mit dem, was ein Beschrifter über die Einheit wissen muss. */
function quelleInfo(e: KatalogEintrag): { info: Record<string, unknown>; codes: string[] } {
  const [p, u] = e.id.split(':')
  if (e.typ === 'baustein') {
    const b = q.blatt.get(e.quelle.blatt)!
    return {
      info: { art: 'blatt', blatt: b.id, nr: b.nr, titel: b.de.titel, untertitel: b.de.untertitel, bereich: b.bereich, thema: b.thema, stufen: b.stufen, sozialform: b.sozialform, dauer: b.dauer, ziel: b.de.lehrer.ziel || undefined, achtung: b.de.lehrer.achtung, fr: !!b.fr },
      codes: b.eldib,
    }
  }
  if (p === 'k') {
    const x = q.kurs.find((y) => y.id === u)!
    return { info: { art: 'kurs', einheit: x.id, titel: x.titel, kurz: x.kurz, ziele: x.ziele, alter: '12–16 J., Kleingruppe', achtung: x.achtung, vorbereitung: x.vorbereitung }, codes: x.blaetter.flatMap((b) => q.blatt.get(b)?.eldib ?? []) }
  }
  if (p === 'f') {
    const x = q.foerderfach.find((y) => y.id === u)!
    return { info: { art: 'foerderfach', einheit: x.id, titel: x.de.titel, kurz: x.de.kurz, ziele: x.de.ziele, klasse: x.klasse, annexe: x.annexe, achtung: x.de.achtung, vorbereitung: x.de.vorbereitung, fr: !!x.fr }, codes: x.blaetter.flatMap((b) => q.blatt.get(b)?.eldib ?? []) }
  }
  if (p === 'm') {
    const x = q.materialien.find((y) => y.id === u)!
    return { info: { art: 'material', material: x.id, titel: x.title, kurz: x.shortDescription, stufen: x.ageLevels, teilnehmer: x.participants.map((t) => t.mode), dauer: x.duration, materialien: x.materialsNeeded, hinweis: x.remark, phasen: x.ablauf.length }, codes: x.eldibGoals }
  }
  if (p === 's') {
    const b = q.blatt.get(u)!
    const sp = b.de.lehrer.spielschule
    return { info: { art: 'spielschule', themenwoche: b.id, titel: b.de.titel, alter: '3–5 J. (Cycle 1), Gruppe', beobachtung: sp?.beobachtung?.map((x) => x.text), zugang: sp?.zugang, fr: !!b.fr }, codes: [...b.eldib, ...(sp?.beobachtung ?? []).map((x) => x.eldib)] }
  }
  const thema = q.crew.themen.find((t) => t.spiele.some((s) => s.id === u))
  const s = thema?.spiele.find((x) => x.id === u)
  return { info: { art: 'crew', thema: thema?.name, spiel: s?.name, format: s?.format, dauer: s?.dauer, foerdert: s?.foerdert, alter: '12–17 J., iPad/Beamer' }, codes: [...(s?.foerdert ?? '').matchAll(/(V|K|SOZ|KOG)-\d+/g)].map((m) => m[0]) }
}

function inhalt(e: KatalogEintrag) {
  if (e.typ === 'baustein') {
    const de = bausteinInhalt(k, e, 'de')
    const fr = e.sprache.fr ? bausteinInhalt(k, e, 'fr') : []
    return {
      arten: e.art,
      // Kindtext mit Pfaden (für `allgemein`: Pfad → neuer Text)
      texte: texte(de),
      ...(fr.length ? { textFr: texte(fr).map((t) => t.text).join(' · ') } : {}),
    }
  }
  const s = e as Stundenschritt
  return {
    titel: s.titel,
    text: s.text,
    ...(s.sagen?.length ? { sagen: s.sagen } : {}),
    ...(s.wennEsKippt ? { wennEsKippt: s.wennEsKippt } : {}),
    ...(s.tipp ? { tipp: s.tipp } : {}),
    ...(s.vorbereitung && s.id.startsWith('s:') ? { material: s.vorbereitung } : {}),
    ...(s.fr ? { fr: { titel: s.fr.titel, text: s.fr.text, ...(s.fr.sagen?.length ? { sagen: s.fr.sagen } : {}) } } : {}),
  }
}

/** Nachbar in der Quelle: steht er im selben Stapel, genügt die Id. */
function nachbar(e: KatalogEintrag | undefined, imStapel: Set<string>) {
  if (!e) return null
  if (imStapel.has(e.id)) return { id: e.id, imStapel: true }
  const t = textVon(e, 'de')
  return { id: e.id, titel: kurz(t.titel, 80), text: kurz(t.text, 220), ...(e.typ === 'baustein' ? { arten: e.art } : { phase: phaseAusQuelle(k, e.id, stelleVon) }) }
}

// --- Reihenfolge, Stapel ----------------------------------------------------------------------------------------------

const alle = [...k.eintraege.values()].filter((e) => /^[bkfmsc]:/.test(e.id))
const mitOrt = alle.map((e) => ({ e, p: prioritaet(e), q: quelleVon(e.id), o: ort(e) }))
mitOrt.sort((a, b) => a.p.localeCompare(b.p) || QUELLEN_REIHE[a.p].indexOf(a.q) - QUELLEN_REIHE[b.p].indexOf(b.q) || a.o.nr - b.o.nr || a.o.stelle - b.o.stelle || (a.e.id < b.e.id ? -1 : 1))

// Nachbarn: in der Reihenfolge der Quelle, innerhalb derselben Einheit
const nachEinheit = new Map<string, KatalogEintrag[]>()
for (const x of [...mitOrt].sort((a, b) => a.o.nr - b.o.nr || a.o.stelle - b.o.stelle)) {
  const key = `${x.q}|${x.o.einheit}`
  nachEinheit.set(key, [...(nachEinheit.get(key) ?? []), x.e])
}

interface Stapel { datei: string; quelle: Quelle; prioritaet: Prio; liste: typeof mitOrt }
const stapel: Stapel[] = []
const zaehler = new Map<Quelle, number>()
for (let i = 0; i < mitOrt.length; ) {
  const { p, q: qu } = mitOrt[i]
  let j = i
  while (j < mitOrt.length && j - i < GROESSE && mitOrt[j].p === p && mitOrt[j].q === qu) j++
  const n = (zaehler.get(qu) ?? 0) + 1
  zaehler.set(qu, n)
  stapel.push({ datei: `${qu}-${String(n).padStart(3, '0')}.json`, quelle: qu, prioritaet: p, liste: mitOrt.slice(i, j) })
  i = j
}

const AUFGABE: Record<Prio, string> = {
  a: 'Gruppenschritte: Geht das mit EINEM Kind (einzeltauglich ja/angepasst/nein)? Bei „angepasst“ eine Einzelvariante schreiben. Dazu die Pflichtfelder prüfen.',
  b: 'Blatt-Bausteine: ELDiB primär/sekundär, Rolle, Bogen, Alter (Feinband), Kompetenz, Belastung, sensibel; bei „braucht“ eine allgemeine Variante ohne Figurenbezug.',
  c: 'Übrige Einträge: Pflichtfelder und die als unsicher markierten Felder prüfen; Zielgruppe (Erwachsenen-Material = fachkraft).',
}

mkdirSync(STAPEL, { recursive: true })
for (const d of readdirSync(STAPEL)) if (d.endsWith('.json')) rmSync(join(STAPEL, d))
const index: { datei: string; quelle: Quelle; prioritaet: Prio; anzahl: number; erledigt: number }[] = []
let geschrieben = 0
for (const s of stapel) {
  const offen = s.liste.filter((x) => ALLE || !erledigt(x.e.id))
  index.push({ datei: s.datei, quelle: s.quelle, prioritaet: s.prioritaet, anzahl: offen.length, erledigt: s.liste.length - offen.length })
  if (!offen.length) continue
  const imStapel = new Set(offen.map((x) => x.e.id))
  // Einheit (Blatt, Kurseinheit, Material, Themenwoche) und Code-Texte stehen einmal je Stapel
  const einheiten: Record<string, Record<string, unknown>> = {}
  const codes = new Set<string>()
  const eintraege = offen.map(({ e, p, o }) => {
    const qi = quelleInfo(e)
    const einheit = `${quelleVon(e.id)}:${o.einheit}`
    einheiten[einheit] ??= qi.info
    const nachbarn = nachEinheit.get(`${quelleVon(e.id)}|${o.einheit}`) ?? []
    const i = nachbarn.indexOf(e)
    const w = werte(e)
    for (const c of [...w.eldib.primaer, ...w.eldib.sekundaer, ...qi.codes]) if (bank[c]) codes.add(c)
    return {
      id: e.id,
      typ: e.typ,
      einheit,
      ...inhalt(e),
      vorher: nachbar(nachbarn[i - 1], imStapel),
      nachher: nachbar(nachbarn[i + 1], imStapel),
      werte: w,
      info: info(e),
      codesDerEinheit: [...new Set(qi.codes)],
      pruefen: pruefen(e, p),
      unsicher: unsicher(e),
      ...(e.typ === 'schritt' && e.fr ? { frNoetig: true } : {}),
      ...(gueltig.has(e.id) ? { bisher: gueltig.get(e.id) } : {}),
    }
  })
  const datei = {
    stapel: s.datei.replace(/\.json$/, ''),
    prioritaet: s.prioritaet,
    quelle: s.quelle,
    aufgabe: AUFGABE[s.prioritaet],
    anleitung: 'ANLEITUNG.md (Ordner darüber): Vokabular, Regeln, Musterlösungen, Ausgabeformat',
    ergebnis: `ergebnis/${s.datei}`,
    stand: k.stand,
    einheiten,
    codes: Object.fromEntries([...codes].sort().map((c) => [c, codeText(c)])),
    eintraege,
  }
  // lesbar und knapp: Kopf eingerückt, je Eintrag eine Zeile
  const kopf = JSON.stringify({ ...datei, eintraege: [] }, null, 1).replace(/\n "eintraege": \[\]\n\}$/, '')
  writeFileSync(join(STAPEL, s.datei), `${kopf}\n "eintraege": [\n${eintraege.map((x) => '  ' + JSON.stringify(x)).join(',\n')}\n ]\n}\n`)
  geschrieben++
}
const summe = (p: Prio) => ({ stapel: index.filter((x) => x.prioritaet === p && x.anzahl).length, eintraege: index.filter((x) => x.prioritaet === p).reduce((n, x) => n + x.anzahl, 0), erledigt: index.filter((x) => x.prioritaet === p).reduce((n, x) => n + x.erledigt, 0) })
writeFileSync(
  join(STAPEL, 'index.json'),
  JSON.stringify({ stand: k.stand, groesse: GROESSE, summe: { a: summe('a'), b: summe('b'), c: summe('c') }, stapel: index.filter((x) => x.anzahl), fertig: index.filter((x) => !x.anzahl).map((x) => x.datei) }, null, 1),
)

// ELDiB-Bank als Liste für die Anleitung
{
  const zeilen = ['# ELDiB-Codes (aus src/data/passgenau/eldib.json)', '', 'Stufe → Alter: ' + Object.entries(ki.eldib.stufen).map(([s, [a, b]]) => `${s}: ${a}–${b} J.`).join(' · '), '', '| Code | Stufe | Kurz | Kompetenzfeld | Beschreibung |', '|---|---|---|---|---|']
  for (const [c, x] of Object.entries(bank)) zeilen.push(`| ${c} | ${x.s} | ${x.k} | ${KOMPETENZ_NAME[kompetenzAusCode(c)].de} | ${x.b.replace(/\|/g, '/')} |`)
  writeFileSync(join(ORDNER, 'ELDIB.md'), zeilen.join('\n') + '\n')
}

const s = { a: summe('a'), b: summe('b'), c: summe('c') }
console.log(`Stapel nach ${STAPEL}: ${geschrieben} geschrieben (je ≤ ${GROESSE})`)
for (const p of ['a', 'b', 'c'] as Prio[]) console.log(`  (${p}) ${s[p].stapel} Stapel, ${s[p].eintraege} offene Einträge${s[p].erledigt ? `, ${s[p].erledigt} schon beschriftet` : ''}`)
console.log(`  Stufen-Alter: ${Object.entries(STUFE_ALTER).map(([st, [a, b]]) => `${st} ${a}–${b}`).join(', ')} · ${Math.round((Date.now() - t0) / 100) / 10} s`)
if (!existsSync(join(ORDNER, 'ANLEITUNG.md'))) console.log(`Hinweis: ${join(ORDNER, 'ANLEITUNG.md')} fehlt noch.`)
