// Passgenau – Prüfskript (4.6 Phase 2; Kritik vom 9.10.: T-M2/M3/M10/M12, E-M3/M4/M16, S13). Prüft Katalog,
// neue Inhalte, Register und Abdeckung. Fehler → Exit 1, Hinweise werden nur gezählt.
// Aufruf: npm run passgenau:pruefen [-- --alle]   (--alle: alle Treffer statt der ersten 8 je Regel)
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { KatalogEintrag, Plan, Stufe } from '../src/passgenau/typen'
import type { BausteineDatei } from '../src/passgenau/kern/format'
import { aufloesen, bausteinInhalt, intern, ohneVorlaufText, quelleText, textVon } from '../src/passgenau/kern/katalog'
import { texte } from '../src/passgenau/kern/inhalt'
import { layoutAusStufe, STUFE_ALTER, STUFEN } from '../src/passgenau/kern/hilfen'
import { KATHARSIS_RE, KURSVERWEIS_RE, VORLAUF_RE } from '../src/passgenau/kern/vokabular'
import { SYSTEM_BY_ID } from '../src/passgenau/kern/system'
import { ladeKatalogNode, ROOT, stilHash } from './passgenau-quellen'
import { abdeckung, haeufigsteZiele } from './passgenau-abdeckung'
import { AKUT_RE, MERKMALE, SCHUTZ_RE, schrittTextPfade, type Beschriftung } from '../src/passgenau/kern/beschriftung'
import { pruefeBeschriftungen } from './passgenau-beschriftung'

const ALLE = process.argv.includes('--alle')
const D = join(ROOT, 'src/data/passgenau')
const json = <T>(p: string): T => JSON.parse(readFileSync(p, 'utf8')) as T

type Art = 'fehler' | 'hinweis'
const ergebnis: { nr: number; name: string; art: Art; treffer: string[] }[] = []
function regel(nr: number, name: string, art: Art, treffer: string[]) {
  ergebnis.push({ nr, name, art, treffer })
}

const t0 = Date.now()
const k = await ladeKatalogNode()
const ki = intern(k)
const alle = [...k.eintraege.values()]
const schritte = alle.filter((e): e is Extract<KatalogEintrag, { typ: 'schritt' }> => e.typ === 'schritt')
const bausteine = alle.filter((e): e is Extract<KatalogEintrag, { typ: 'baustein' }> => e.typ === 'baustein')
const bank = ki.eldib.items
/** Was im Schritt geschieht und gesagt wird (ohne „wenn es kippt“: das sind Hinweise für die Fachkraft) */
const textVonSchritt = (e: (typeof schritte)[number]) => [e.titel, e.text, ...(e.sagen ?? []), e.einzelvariante?.text ?? ''].join(' ')

// 1 Ankommen dauert höchstens 12 Minuten
regel(1, 'Rolle „ankommen“ mit Dauer > 12 Min.', 'fehler', schritte.filter((e) => e.rolle.includes('ankommen') && e.dauer.typ > 12).map((e) => `${e.id} (${e.dauer.typ} Min.)`))

// 2 Energie 3 am Schreibtisch
regel(2, 'Energie 3 und Material „Schreibtisch“', 'hinweis', alle.filter((e) => e.energie === 3 && e.material.some((m) => /tisch|schreib/i.test(m))).map((e) => e.id))

// 3 Gruppenschritt „angepasst“ ohne Einzelvariante (fällt in Weg 1–3 heraus, außer Lockerung 4 mit Hinweis)
regel(3, '„angepasst“ ohne Einzelvariante', 'hinweis', schritte.filter((e) => e.einzeltauglich === 'angepasst' && !e.einzelvariante).map((e) => e.id))

// 4 ES-Baustein mit Bild-Gestaltung oder ohne Text
regel(4, 'ES-Baustein mit Layout „bild“ bzw. Lesemenge 0 und Bildgestaltung', 'fehler', bausteine.filter((e) => e.stufen.every((s) => s === 'ES') && (e.hoehe.bild !== undefined || (e.lesemenge === 0 && e.hoehe.gross !== undefined))).map((e) => e.id))

// 5 ELDiB-Code nicht in der Bank
regel(5, 'ELDiB-Code nicht in der ELDiB-Bank', 'fehler', alle.flatMap((e) => e.eldib.filter((z) => !bank[z.code]).map((z) => `${e.id}: ${z.code}`)))

// 6 Höhe fehlt (je Gestaltung der eigenen Stufen)
regel(6, 'Höhe fehlt', 'fehler', bausteine.flatMap((e) => [...new Set(e.stufen.map(layoutAusStufe))].filter((l) => !(e.hoehe[l]! > 0)).map((l) => `${e.id} (${l})`)))

// 7 braucht zeigt ins Leere oder auf ein anderes Blatt
regel(7, '„braucht“ zeigt ins Leere', 'fehler', bausteine.flatMap((e) => (e.braucht ?? []).filter((r) => { const x = k.eintraege.get(r); return !x || x.typ !== 'baustein' || x.quelle.blatt !== e.quelle.blatt }).map((r) => `${e.id} → ${r}`)))

// 8 Dauer stimmig (Pflichtfeld, T-M2)
regel(8, 'Dauer fehlt oder min ≤ typ ≤ max verletzt', 'fehler', alle.filter((e) => !(e.dauer?.typ > 0) || e.dauer.min > e.dauer.typ || e.dauer.typ > e.dauer.max).map((e) => `${e.id} ${JSON.stringify(e.dauer)}`))

// 9 Höhen zur aktuellen Gestaltung gemessen (S13)
{
  const b = json<BausteineDatei>(join(D, 'bausteine.json'))
  const jetzt = stilHash()
  regel(9, 'Höhen veraltet (stil.ts/BLATT-STIL.md geändert) – npm run passgenau:katalog', 'fehler', b.stilHash === jetzt ? [] : [`Katalog ${b.stilHash ?? '–'} ≠ Gestaltung ${jetzt}`])
}

// 10 Katharsis (E-M16): neue Inhalte frei davon; im übrigen Katalog markiert (fällt heraus)
{
  const roh: string[] = []
  for (const d of readdirSync(join(D, 'inhalte')).filter((x) => x.endsWith('.json'))) {
    const daten = json<unknown>(join(D, 'inhalte', d))
    for (const x of Array.isArray(daten) ? daten : []) if (KATHARSIS_RE.test(JSON.stringify(x))) roh.push(`${d}: ${(x as { id: string }).id}`)
  }
  regel(10, 'Katharsis-Wortliste in neuen Inhalten', 'fehler', roh)
  regel(10, 'Katharsis im Katalog (markiert, wird nie vorgeschlagen)', 'hinweis', alle.filter((e) => e.merkmale?.katharsis).map((e) => e.id))
  regel(10, 'Katharsis-Text ohne Markierung', 'fehler', schritte.filter((e) => KATHARSIS_RE.test(textVonSchritt(e)) && !e.merkmale?.katharsis).map((e) => e.id))
}

// 11 Druckmaterial (T-M12): Schritt mit Karten/Ausschneiden/Memory ohne verknüpftes Blatt
{
  const RE = /(bildkarten|kärtchen|memory|ausschneiden|karten (aus|zum|ausdrucken)|kopiervorlage|arbeitsblatt)/i
  const ohne = schritte.filter((e) => !e.blatt?.length && RE.test([e.text, e.einzelvariante?.text ?? '', ...e.material].join(' ')))
  // Spielschule, Kurs, Förderfach: Druckseiten gehören zur Einheit → Fehler; Materialien bringen eigene Anhänge mit, neue Inhalte sind Alltagsgegenstände → Hinweis
  regel(11, 'Schritt mit Karten/Ausschneiden ohne verknüpftes Blatt (Spielschule)', 'fehler', ohne.filter((e) => e.id.startsWith('s:')).map((e) => e.id))
  regel(11, 'Schritt mit Karten/Ausschneiden ohne verknüpftes Blatt (Kurs, Förderfach, Material, neue Inhalte)', 'hinweis', ohne.filter((e) => !e.id.startsWith('s:')).map((e) => e.id))
}

// 12 Achtung aus der Quelle übernommen (E-M4)
{
  const kurs = new Map(ki.q.kurs.map((e) => [e.id, e]))
  const ff = new Map(ki.q.foerderfach.map((e) => [e.id, e]))
  regel(12, 'Kurs-/Förderfach-Schritt ohne „achtung“ der Einheit', 'fehler', schritte.filter((e) => {
    const [p, u] = e.id.split(':')
    const quelle = p === 'k' ? kurs.get(u)?.achtung : p === 'f' ? ff.get(u)?.de.achtung : undefined
    // eine Fassung ohne Kursverweis (Beschriftung `allgemein`) zählt als übernommen
    return !!quelle && e.achtung !== quelle && !(KURSVERWEIS_RE.test(quelle) && !!e.achtung && !KURSVERWEIS_RE.test(e.achtung))
  }).map((e) => e.id))
  regel(12, 'Baustein ohne „achtung“ des Blatts', 'fehler', bausteine.filter((e) => { const a = ki.q.blatt.get(e.quelle.blatt)?.de.lehrer.achtung; return !!a && e.achtung !== a }).map((e) => e.id))
}

// 13 Werkzeuge für Fachkräfte nie fürs Kind (P1)
regel(13, 'Werkzeug für Fachkräfte ohne zielgruppe „fachkraft“', 'fehler', bausteine.filter((e) => ki.q.blatt.get(e.quelle.blatt)?.bereich === 'werkzeuge' && e.zielgruppe !== 'fachkraft' && !['ruhe-ecke-karten', 'tagesplan-bildkarten', 'belohnungs-menue'].includes(e.quelle.blatt)).map((e) => e.id))

// 14 mehrtägig nie im Kern
regel(14, 'mehrtägig mit Rolle „kern“', 'fehler', schritte.filter((e) => e.mehrtaegig && e.rolle.includes('kern')).map((e) => e.id))

// 15 Französisch: Kennzeichen und Text passen zusammen
regel(15, 'sprache.fr ohne französischen Text', 'fehler', [
  ...schritte.filter((e) => e.sprache.fr && !e.fr && !SYSTEM_BY_ID.has(e.id)).map((e) => e.id),
  ...bausteine.filter((e) => e.sprache.fr && !ki.q.blatt.get(e.quelle.blatt)?.fr).map((e) => e.id),
])

// 16 heikle Inhalte gekennzeichnet (T-M1): Suizid/Selbstverletzung → akut, Missbrauch/Übergriffe → kinderschutz
{
  const AKUT = AKUT_RE
  const SCHUTZ = SCHUTZ_RE
  const text = (e: KatalogEintrag) => (e.typ === 'schritt' ? textVonSchritt(e) : JSON.stringify(bausteinInhalt(k, e, 'de')))
  regel(16, 'Text zu Suizid/Selbstverletzung ohne sensibel „akut“', 'fehler', alle.filter((e) => AKUT.test(text(e)) && e.sensibel !== 'akut').map((e) => e.id))
  regel(16, 'Text zu Übergriffen ohne sensibel „kinderschutz“/„akut“', 'fehler', alle.filter((e) => SCHUTZ.test(text(e)) && e.sensibel !== 'kinderschutz' && e.sensibel !== 'akut').map((e) => e.id))
}

// 17 neue Inhalte: Form, Altersband, Wahlkarten-Optionen, Material-Schlüssel
{
  const f: string[] = []
  const ids = new Set<string>()
  const material = json<Record<string, unknown>>(join(D, 'inhalte/material.json'))
  for (const d of readdirSync(join(D, 'inhalte')).filter((x) => x.endsWith('.json') && x !== 'material.json')) {
    const daten = json<unknown>(join(D, 'inhalte', d))
    if (!Array.isArray(daten)) {
      f.push(`${d}: keine Liste`)
      continue
    }
    for (const x of daten as Record<string, unknown>[]) {
      const id = String(x.id ?? '')
      if (ids.has(id)) f.push(`${d}: ${id} doppelt`)
      ids.add(id)
      if (Array.isArray(x.optionen)) {
        const opt = x.optionen as { ref: string | null; art?: string }[]
        if (!opt.some((o) => o.ref === null && o.art === 'da-sein')) f.push(`${id}: ohne „einfach da sein“`)
        for (const o of opt) if (o.ref && !k.eintraege.has(o.ref)) f.push(`${id}: Option ${o.ref} fehlt im Katalog`)
        continue
      }
      if (!/^(fb|r|pa):[a-z0-9-]+$/.test(id)) f.push(`${d}: Id „${id}“`)
      if (!x.titel || !x.text || !Array.isArray(x.rolle) || !(x.rolle as unknown[]).length) f.push(`${id}: titel/text/rolle fehlt`)
      const a = x.alter as { von: number; bis: number } | undefined
      if (!a || a.von > a.bis || a.von < 3) f.push(`${id}: Altersband`)
      for (const m of (x.material as string[] | undefined) ?? []) if (!(m in material)) f.push(`${id}: Material „${m}“ ohne Bezeichnung`)
      if (!k.eintraege.has(id)) f.push(`${id}: nicht im Katalog angekommen`)
    }
  }
  regel(17, 'Neue Inhalte: Form, Wahlkarten, Material', 'fehler', f)
}

// 18 Register stabiler Ids (T-M10): jede Id registriert, keine doppelt, Prüfsumme stimmt
{
  const reg = json<{ v: 1; gruppen: Record<string, { n: number; e: { id: string; h: string; x?: unknown }[] }> }>(join(D, 'register.json'))
  const r = new Map<string, { h: string; x?: unknown }>()
  const f: string[] = []
  for (const g of Object.values(reg.gruppen))
    for (const e of g.e) {
      if (r.has(e.id)) f.push(`${e.id} doppelt im Register`)
      r.set(e.id, e)
    }
  for (const e of alle) {
    // nummerierte Ids brauchen das Register; benannte (CREW-Spiel, Reim der Woche) sind über die Quelle stabil
    if (!/^[bkfms]:/.test(e.id) || e.id.endsWith(':reim')) continue
    const x = r.get(e.id)
    if (!x) f.push(`${e.id} nicht im Register`)
    else if (x.x) f.push(`${e.id} im Register als entfernt markiert`)
    else if (x.h !== e.h) f.push(`${e.id}: Prüfsumme im Register veraltet`)
  }
  regel(18, 'Register stabiler Ids', 'fehler', f)
}

// 19 Vorlagen „Aus der Praxis“ und Beispiel-Pläne lösen zu 100 % auf (T-M10)
{
  const f: string[] = []
  const ordner = [join(D, 'praxis'), join(ROOT, 'tests/passgenau-plaene')]
  let n = 0
  for (const o of ordner) {
    if (!existsSync(o)) continue
    for (const d of readdirSync(o).filter((x) => x.endsWith('.json'))) {
      const p = json<Plan | { inhalt: { sitzungen: Plan['sitzungen'] } }>(join(o, d))
      const sitzungen = 'sitzungen' in p ? p.sitzungen : p.inhalt.sitzungen
      for (const s of sitzungen)
        for (const t of [...s.schritte, ...(s.blatt?.bausteine ?? [])]) {
          n++
          if (t.ref.startsWith('pg:')) continue
          const a = aufloesen(k, t.ref, t.h)
          if (a.status === 'fehlt') f.push(`${d}: ${t.ref} fehlt`)
        }
    }
  }
  regel(19, `Vorlagen und Beispiel-Pläne lösen auf (${n} Teile)`, 'fehler', f)
}

// 20 Kinderblatt: keine Codes, Testkürzel oder Etiketten im Text der Bausteine (9.6, Positivliste)
{
  const RE = /\b(?:(?:K|V|SOZ|KOG)-\d{1,2}\b|PEI\b|ELDiB|WISC|GIQ\b|QIT\b)/
  regel(20, 'Kinderblatt-Text mit Code, Testkürzel oder Etikett', 'fehler', bausteine.filter((e) => e.zielgruppe !== 'fachkraft' && (['de', 'fr'] as const).some((sp) => RE.test(JSON.stringify(bausteinInhalt(k, e, sp))))).map((e) => e.id))
}

// 21 Abdeckung (T-M3): Kern und Blatt der 30 häufigsten Ziele in ihrer typischen Stufe (DE) ≥ 3; FR nur Hinweis (T-M4)
{
  const zeilen = abdeckung(k)
  const top = new Set(haeufigsteZiele(k))
  const typisch = (code: string, st: Stufe) => {
    const [von, bis] = ki.eldib.stufen[String(bank[code]?.s)] ?? [0, 0]
    const [a, b] = STUFE_ALTER[st]
    return (bank[code]?.s ?? 0) <= 1 ? st === 'C1' : a <= bis && b >= von
  }
  const luecke = zeilen.filter((z) => top.has(z.code) && (z.rolle === 'kern' || z.rolle === 'blatt') && z.n < 3 && typisch(z.code, z.stufe))
  regel(21, 'Abdeckung: Kern/Blatt eines der 30 häufigsten Ziele < 3 (DE, typische Stufe)', 'fehler', luecke.filter((z) => z.sprache === 'de').map((z) => `${z.code} ${z.stufe} ${z.rolle}: ${z.n}`))
  regel(21, 'Abdeckung: dasselbe auf Französisch (Planer nimmt DE mit Hinweis)', 'hinweis', luecke.filter((z) => z.sprache === 'fr').map((z) => `${z.code} ${z.stufe} ${z.rolle}: ${z.n}`))
  regel(21, 'Abdeckung: Zellen mit < 3 Kandidaten insgesamt (Bericht: npm run passgenau:abdeckung)', 'hinweis', zeilen.filter((z) => z.n < 3).map((z) => `${z.code} ${z.stufe} ${z.sprache} ${z.rolle}`))
}

// 22 Rituale: Anspruch gesetzt (Weg 3 nimmt nur 0/1)
regel(22, 'Ritual ohne „anspruch“', 'hinweis', schritte.filter((e) => e.quelle.art === 'ritual' && e.anspruch === undefined).map((e) => e.id))

// 23 Stufen und Alter passen zusammen
regel(23, 'Altersband ohne Überschneidung mit den Stufen', 'fehler', alle.filter((e) => !e.stufen.some((s) => STUFE_ALTER[s][0] <= e.alter.bis + 1 && STUFE_ALTER[s][1] >= e.alter.von - 1) || !e.stufen.every((s) => STUFEN.includes(s))).map((e) => `${e.id} ${e.alter.von}–${e.alter.bis} ${e.stufen.join(',')}`))

// 24 Beschriftungen (4.6 Phase 1/2): Schema, Codes, Vokabular, Längen, Sicherheitsregeln; 25: im Katalog angekommen
{
  const r = pruefeBeschriftungen(k)
  regel(24, `Beschriftung ungültig (${r.dateien.length} Dateien, ${r.gueltig.size} gültige Einträge)`, 'fehler', [...r.fehler, ...r.doppelt.map((d) => `doppelt: ${d}`)])
  regel(24, 'Beschriftung zu älterer Fassung (Inhalt seither geändert – neu beschriften)', 'hinweis', r.veraltet)
  const gleich = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)
  const abweichung = (e: KatalogEintrag, b: Beschriftung): string | null => {
    if (b.rolle && !gleich(e.rolle, b.rolle)) return 'rolle'
    if (b.bogen && e.bogen !== b.bogen) return 'bogen'
    if (b.eldib && !gleich(e.eldib, [...b.eldib.primaer.map((code) => ({ code, gewicht: 1 })), ...(b.eldib.sekundaer ?? []).map((code) => ({ code, gewicht: 0.5 }))])) return 'eldib'
    if (b.kompetenz && !gleich(e.kompetenz, b.kompetenz)) return 'kompetenz'
    if (b.alter && !gleich(e.alter, b.alter)) return 'alter'
    if (b.energie && e.energie !== b.energie) return 'energie'
    if (b.belastung !== undefined && e.belastung !== b.belastung) return 'belastung'
    if (b.einzeltauglich && e.einzeltauglich !== b.einzeltauglich) return 'einzeltauglich'
    // Sätze mit Bezug auf eine frühere Kursstunde streicht der Katalog beim Laden (ohneVorlaufText)
    if (b.einzelvariante && (e.typ !== 'schritt' || e.einzelvariante?.text !== ohneVorlaufText(b.einzelvariante.text) || (b.einzelvariante.fr && e.fr?.einzelvariante?.text !== ohneVorlaufText(b.einzelvariante.fr.text)))) return 'einzelvariante'
    if (b.allgemein && e.typ === 'baustein' && !gleich(e.allgemein, b.allgemein)) return 'allgemein'
    // Schritte: die Fassung ohne Kursverweis steht im Text des Katalogeintrags („“ = entfallen)
    if (b.allgemein && e.typ === 'schritt') {
      const da = new Set(schrittTextPfade(e).values())
      // die Vorbereitung schneidet der Katalog auf den Schritt zu, Sätze mit Bezug auf eine frühere Stunde fallen weg
      if (Object.entries(b.allgemein).some(([pfad, t]) => t && pfad !== 'vorbereitung' && !VORLAUF_RE.test(t) && !da.has(t))) return 'allgemein'
    }
    if (b.zielgruppe && (e.zielgruppe ?? 'kind') !== b.zielgruppe) return 'zielgruppe'
    // Katharsis, „akut“ und „kinderschutz“ senkt nur eine Fachkraft (Sicherung im Katalog-Skript)
    if (b.merkmale && MERKMALE.some((m) => m !== 'katharsis' && !!e.merkmale?.[m] !== !!b.merkmale![m])) return 'merkmale'
    const hart = (x: unknown) => x === 'akut' || x === 'kinderschutz'
    if ('sensibel' in b && (e.sensibel ?? null) !== (b.sensibel ?? null) && !(b.von !== 'fachkraft' && hart(e.sensibel))) return 'sensibel'
    if (typeof b.mehrtaegig === 'boolean' && !!e.mehrtaegig !== b.mehrtaegig) return 'mehrtaegig'
    if (b.braucht && (e.typ !== 'baustein' || !gleich(e.braucht ?? [], b.braucht))) return 'braucht'
    return null
  }
  const nicht: string[] = []
  for (const [id, b] of r.gueltig) {
    const e = k.eintraege.get(id)
    const ab = e ? abweichung(e, b) : 'fehlt'
    if (ab) nicht.push(`${id}: ${ab} (${b.datei})`)
  }
  regel(25, 'Beschriftung nicht im Katalog – npm run passgenau:katalog -- --ohne-hoehen', 'fehler', nicht)
}

// 26 Kursstruktur: Passgenau nimmt einzelne Teile – kein „aus Einheit 20“, „Einheiten 12 und 13“, „Modul 3“, „Kursjahr“,
// „letzte Woche ging es um …“ in Texten, die Planblatt, Kinderblatt oder Oberfläche zeigen (DE und FR). Abhilfe: eine
// Fassung ohne Verweis in der Beschriftung (`allgemein`, Schritte auch die Einzelvariante); src/passgenau/kern/vokabular.ts
{
  const treffer: string[] = []
  const pr = (id: string, wo: string, t: string | undefined) => {
    const m = t ? KURSVERWEIS_RE.exec(t) : null
    if (m && t) treffer.push(`${id} ${wo}: …${t.slice(Math.max(0, m.index - 30), m.index + m[0].length + 20).replace(/\s+/g, ' ')}…`)
  }
  for (const sp of ['de', 'fr'] as const) {
    for (const e of schritte) {
      if (sp === 'fr' && !e.fr) continue
      const t = textVon(e, sp)
      pr(e.id, `${sp}:titel`, t.titel)
      pr(e.id, `${sp}:text`, t.text)
      ;(t.sagen ?? []).forEach((x, i) => pr(e.id, `${sp}:sagen.${i}`, x))
      pr(e.id, `${sp}:wennEsKippt`, t.wennEsKippt)
      pr(e.id, `${sp}:quelle`, quelleText(e, sp))
      if (sp === 'de') for (const f of ['achtung', 'vorbereitung', 'elternbrief'] as const) pr(e.id, f, e[f])
    }
    for (const e of bausteine) {
      if (sp === 'fr' && !e.sprache.fr) continue
      pr(e.id, `${sp}:titel`, textVon(e, sp).titel)
      for (const t of texte(bausteinInhalt(k, e, sp))) pr(e.id, `${sp}:${t.pfad}`, t.text)
    }
  }
  regel(26, 'Verweis auf die Kursstruktur in einem Text für Plan, Blatt oder Oberfläche („Einheit 20“, „Modul 3“, „Kursjahr“) – Beschriftung `allgemein`', 'fehler', treffer)
}

// Ausgabe
let fehler = 0
for (const r of ergebnis.sort((a, b) => a.nr - b.nr)) {
  const zeichen = r.treffer.length === 0 ? 'ok ' : r.art === 'fehler' ? 'FEHLER' : 'Hinweis'
  if (r.art === 'fehler') fehler += r.treffer.length
  console.log(`${String(r.nr).padStart(2)} ${zeichen.padEnd(7)} ${r.name}${r.treffer.length ? `: ${r.treffer.length}` : ''}`)
  if (r.treffer.length && (r.art === 'fehler' || ALLE)) for (const t of r.treffer.slice(0, ALLE ? undefined : 8)) console.log(`        · ${t}`)
}
console.log(`\n${alle.length} Einträge geprüft (${bausteine.length} Bausteine, ${schritte.length} Schritte) · ${fehler} Fehler · ${Math.round((Date.now() - t0) / 100) / 10} s`)
process.exit(fehler ? 1 : 0)
