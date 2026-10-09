// Passgenau – Katalog zur Laufzeit: Metadaten (bausteine.json, schritte.json) + Texte aus den Quellen + neue Inhalte
// (src/data/passgenau/inhalte/*.json), indiziert nach Rolle. Einmal geladen, danach aus dem Speicher.
import type { Baustein, NummeriertesBlatt, Sprache } from '../../blatt/typen'
import { ELDIB_FR } from '../../blatt/eldib-fr'
import type { Einheit as KursEinheit } from '../../kurs/typen'
import type { Material } from '../../types/material'
import type { KatalogEintrag, MikroBaustein, Rolle, Sozialform, Stufe, Stundenschritt, Wahlkarte } from '../typen'
import type { CrewSpiel, FfEinheit, Quellen } from '../quellen'
import { entpackeBaustein, entpackeSchritt, type BausteineDatei, type SchritteDatei } from './format'
import { KATHARSIS_RE, KOMPETENZ_BLATT, kompetenzAusCode } from './vokabular'
import { hash8, STUFE_ALTER, STUFEN, woerter } from './hilfen'
import { paketBausteine, texte } from './inhalt'
import { SYSTEM } from './system'

export interface Katalog {
  eintraege: Map<string, KatalogEintrag>
  nachRolle: Map<Rolle, KatalogEintrag[]>
  stand: string
}

export interface EldibBank {
  stufen: Record<string, [number, number]>
  items: Record<string, { k: string; s: number; b: string; ich: string[] }>
}

/** Was der Katalog intern noch braucht (nicht Teil der Schnittstelle). */
export interface KatalogIntern {
  q: Quellen
  seite: BausteineDatei['seite']
  eldib: EldibBank
  /** Prüfsumme → Eintrag (Auflösung umgezogener Ids, T-M10) */
  nachH: Map<string, KatalogEintrag>
  /** Pakete, die man vorlesen kann (Bild/Karte, Aufgabe ≤ 12 Wörter) – dürfen beim Lesen bis Kind + 1 (P4) */
  vorlesbar: Set<string>
  /** Blätter, die eine Hilfe-Zeile haben (E-M3) */
  notfallBlatt: Set<string>
  /** Mikro-Bausteine je Quellblatt in Blattreihenfolge */
  bausteineVonBlatt: Map<string, MikroBaustein[]>
  /** Wahlkarten für Weg 3 (neue Inhalte) */
  wahlkarten: Wahlkarte[]
  /** Material-Schlüssel → Bezeichnung DE/FR (neue Inhalte, material.json) */
  materialName: Record<string, { de: string; fr: string }>
}

const INTERN = new WeakMap<Katalog, KatalogIntern>()
export function intern(k: Katalog): KatalogIntern {
  const i = INTERN.get(k)
  if (!i) throw new Error('Passgenau: Katalog nicht geladen')
  return i
}

/** Zuletzt geladener Katalog (für Funktionen der Schnittstelle ohne Katalog-Parameter, z. B. textVon, fuerTeam). */
let aktuell: Katalog | null = null
export function aktuellerKatalog(): Katalog | null {
  return aktuell
}

// --- Texte der Stundenschritte aus den Quellen ------------------------------------------------------------------------

const QUELLE_NAME: Record<Stundenschritt['quelle']['art'], Record<Sprache, string>> = {
  kurs: { de: 'Skills', fr: 'Skills' },
  foerderfach: { de: 'Förderfach', fr: 'Cours de compétences' },
  material: { de: 'Material', fr: 'Matériel' },
  spielschule: { de: 'Spielschule', fr: 'Préscolaire' },
  crew: { de: 'CREW', fr: 'CREW' },
  freude: { de: 'Freude & Beziehung', fr: 'Plaisir et relation' },
  ritual: { de: 'Ritual', fr: 'Rituel' },
  praxis: { de: 'Passgenau', fr: 'Passgenau' },
}

type Texte = Pick<Stundenschritt, 'quelle' | 'titel' | 'text' | 'sagen' | 'wennEsKippt' | 'tipp' | 'fr' | 'achtung' | 'vorbereitung' | 'elternbrief'>

function kursText(s: { text: string; punkte?: string[]; tabelle?: { spalten: string[]; zeilen: string[][] } }): string {
  const teile = [s.text]
  if (s.punkte?.length) teile.push(s.punkte.map((p) => `• ${p}`).join('\n'))
  if (s.tabelle) teile.push(s.tabelle.zeilen.map((z) => z.join(' – ')).join('\n'))
  return teile.join('\n')
}

function satzMit(text: string | undefined, wort: RegExp): string | undefined {
  if (!text) return undefined
  const s = text.split(/(?<=[.!?])\s+/).find((x) => wort.test(x))
  return s ? s.trim() : undefined
}

function stelle(m: { id: string; stelle?: number }): number {
  return m.stelle ?? Number(/(\d+)$/.exec(m.id)?.[1] ?? 0)
}

/** Texte eines Stundenschritts aus seiner Quelle (null: Quelle fehlt – Eintrag fällt weg). */
function texteAusQuelle(m: { id: string; stelle?: number }, q: Quellen, idx: Indizes): Texte | null {
  const [art, quelle] = m.id.split(':')
  const i = stelle(m)
  if (art === 'k') {
    const e = idx.kurs.get(quelle)
    const s = e?.schritte[i]
    if (!e || !s) return null
    return {
      quelle: { art: 'kurs', einheit: e.id, titel: e.titel },
      titel: s.titel, text: kursText(s), sagen: s.sagen, wennEsKippt: s.wennEsKippt, tipp: s.tipp,
      achtung: e.achtung, vorbereitung: e.vorbereitung?.join(' · '),
      elternbrief: satzMit([...(e.vorbereitung ?? []), e.achtung ?? ''].join(' '), /elternbrief/i),
    }
  }
  if (art === 'f') {
    const e = idx.ff.get(quelle)
    const s = e?.de.schritte[i]
    if (!e || !s) return null
    const f = e.fr?.schritte[i]
    return {
      quelle: { art: 'foerderfach', einheit: e.id, titel: e.de.titel },
      titel: s.titel, text: kursText(s), sagen: s.sagen, wennEsKippt: s.wennEsKippt, tipp: s.tipp,
      fr: f && f.phase === s.phase ? { titel: f.titel, text: kursText(f), sagen: f.sagen, wennEsKippt: f.wennEsKippt } : undefined,
      achtung: e.de.achtung, vorbereitung: e.de.vorbereitung?.join(' · '),
      elternbrief: satzMit([...(e.de.vorbereitung ?? []), e.de.achtung ?? ''].join(' '), /elternbrief/i),
    }
  }
  if (art === 'm') {
    const mat = idx.material.get(quelle)
    const a = mat?.ablauf[i]
    if (!mat || !a) return null
    const roh = (a.title ?? '').replace(/\s*\((ca\.|etwa)?[^)]*Min[^)]*\)\s*$/i, '').trim()
    const nachStrich = roh.includes(' – ') ? roh.split(' – ').slice(1).join(' – ') : roh.includes(' - ') ? roh.split(' - ').slice(1).join(' - ') : roh
    // „Spielen“, „Durchführung 2“, „Hauptteil“: allein sagt das nichts – dann der Titel des Materials
    const allgemein = /^(einstieg|spielen|durchführung|üben( und vertiefen)?|übung(sphase)?|hauptteil|hauptphase|arbeitsphase|erarbeitung|aktivität|vertiefung|vertiefen|anwendung|praxis|phase|einheit|stunde|input|gestalten|auswertung|abschluss|reflexion|transfer|teil)(\s*\d+)?\s*(\(.*\))?$/i.test(nachStrich.trim())
    const titel = !nachStrich || allgemein ? mat.title : nachStrich
    return {
      quelle: { art: 'material', titel: mat.title },
      titel, text: a.text,
      achtung: mat.remark, vorbereitung: mat.materialsNeeded,
    }
  }
  if (art === 's') {
    const blatt = q.blatt.get(quelle)
    const sp = blatt?.de.lehrer.spielschule
    const spFr = blatt?.fr?.lehrer.spielschule
    if (!blatt || !sp) return null
    if (m.id.endsWith(':reim')) {
      if (!sp.reim) return null
      const r = sp.reim
      const rf = spFr?.reim
      return {
        quelle: { art: 'spielschule', titel: blatt.de.titel },
        titel: `Reim: ${r.titel}`, text: r.zeilen.join(' / ') + (r.gesten ? `\nBewegungen: ${r.gesten}` : ''),
        fr: rf ? { titel: `Comptine : ${rf.titel}`, text: rf.zeilen.join(' / ') + (rf.gesten ? `\nGestes : ${rf.gesten}` : '') } : undefined,
      }
    }
    const a = sp.aktivitaeten[i]
    if (!a) return null
    const af = spFr?.aktivitaeten[i]
    return {
      quelle: { art: 'spielschule', titel: blatt.de.titel },
      titel: a.titel, text: a.text + (a.material ? `\nMaterial: ${a.material}` : ''),
      fr: af ? { titel: af.titel, text: af.text + (af.material ? `\nMatériel : ${af.material}` : '') } : undefined,
      vorbereitung: a.material,
    }
  }
  if (art === 'c') {
    const s = idx.crew.get(quelle)
    if (!s) return null
    return {
      quelle: { art: 'crew', titel: s.name },
      titel: s.name, text: s.text,
      vorbereitung: 'CREW-App mit Tagescode auf dem iPad bereithalten.',
    }
  }
  return null
}

interface Indizes {
  kurs: Map<string, KursEinheit>
  ff: Map<string, FfEinheit>
  material: Map<string, Material>
  crew: Map<string, CrewSpiel>
}

// --- neue Inhalte (Freude & Beziehung, Rituale …) -----------------------------------------------------------------------

function stufenAus(von: number, bis: number): Stufe[] {
  return STUFEN.filter((s) => STUFE_ALTER[s][0] <= bis && STUFE_ALTER[s][1] >= von)
}

/** Ein Eintrag aus inhalte/*.json als vollständiger Stundenschritt (fehlende Felder mit vorsichtigen Standards). */
export function inhaltSchritt(roh: Partial<Stundenschritt> & { id: string }): Stundenschritt | null {
  if (!roh.id || !roh.titel || !roh.text || !Array.isArray(roh.rolle) || !roh.rolle.length) return null
  const alter = roh.alter ?? { von: 3, bis: 18 }
  const d = typeof roh.dauer === 'number' ? { min: Math.max(1, Math.round((roh.dauer as number) * 0.6)), typ: roh.dauer as number, max: Math.round((roh.dauer as number) * 1.5) } : (roh.dauer ?? { min: 3, typ: 5, max: 10 })
  const art: Stundenschritt['quelle']['art'] = roh.id.startsWith('r:') ? 'ritual' : roh.id.startsWith('fb:') ? 'freude' : 'praxis'
  const s: Stundenschritt = {
    thema: [], eldib: [], kompetenz: [], sozialform: ['einzeln'], einzeltauglich: 'ja', energie: 1, belastung: 0, reiz: 0, format: [], material: [],
    qualitaet: 'entwurf', sicher: {},
    ...roh,
    quelle: roh.quelle ?? { art, titel: art === 'ritual' ? 'Ritual' : 'Freude & Beziehung' },
    titel: roh.titel,
    text: roh.text,
    rolle: roh.rolle,
    alter,
    stufen: roh.stufen ?? stufenAus(alter.von, alter.bis),
    dauer: d,
    sprache: { de: true, fr: !!roh.fr },
    h: roh.h || hash8(JSON.stringify([roh.titel, roh.text, roh.sagen ?? null, roh.fr ?? null])),
  }
  if (s.ohneZiel === undefined && (art === 'freude' || art === 'ritual')) s.ohneZiel = true
  // Sicherung (E-M16): auch neue Inhalte mit „Wut rauslassen“ o. Ä. fallen heraus
  const alles = [s.titel, s.text, ...(s.sagen ?? []), s.wennEsKippt ?? '', s.fr?.text ?? ''].join(' ')
  if (KATHARSIS_RE.test(alles)) s.merkmale = { ...s.merkmale, katharsis: true }
  return s
}

function inhalteAus(q: Quellen): { schritte: Partial<Stundenschritt>[]; wahlkarten: Wahlkarte[]; material: Record<string, { de: string; fr: string }> } {
  const schritte: Partial<Stundenschritt>[] = []
  const wahlkarten: Wahlkarte[] = []
  let material: Record<string, { de: string; fr: string }> = {}
  for (const { datei, daten } of q.inhalte) {
    if (datei.startsWith('material') && daten && typeof daten === 'object' && !Array.isArray(daten)) {
      material = { ...material, ...(daten as Record<string, { de: string; fr: string }>) }
      continue
    }
    const liste = Array.isArray(daten) ? daten : daten && typeof daten === 'object' ? ((daten as { schritte?: unknown[]; eintraege?: unknown[] }).schritte ?? (daten as { eintraege?: unknown[] }).eintraege ?? []) : []
    for (const x of liste) {
      if (!x || typeof x !== 'object' || typeof (x as { id?: unknown }).id !== 'string') continue
      if (Array.isArray((x as { optionen?: unknown }).optionen)) wahlkarten.push(x as Wahlkarte)
      else schritte.push(x as Partial<Stundenschritt>)
    }
  }
  return { schritte, wahlkarten, material }
}

// --- Aufbau ------------------------------------------------------------------------------------------------------------------

const VORLESBAR_ARTEN = new Set(['bilder', 'karten', 'gefuehle', 'koerper', 'comic', 'schneiden_kleben', 'memory', 'labyrinth', 'laufweg', 'minibuch', 'punkte_verbinden', 'klappbild', 'faedelkarte', 'bastelbogen', 'suchbild', 'anziehpuppe', 'atmen'])

function sozialformAus(b: NummeriertesBlatt): Sozialform[] {
  return b.sozialform.map((s) => (s === 'einzeln' ? 'einzeln' : s === 'gruppe' ? 'gruppe' : 'klasse'))
}

export function baueKatalog(q: Quellen, bDatei: BausteineDatei, sDatei: SchritteDatei, eldib: EldibBank): Katalog {
  const eintraege = new Map<string, KatalogEintrag>()
  const nachRolle = new Map<Rolle, KatalogEintrag[]>()
  const nachH = new Map<string, KatalogEintrag>()
  const vorlesbar = new Set<string>()
  const notfallBlatt = new Set<string>()
  const bausteineVonBlatt = new Map<string, MikroBaustein[]>()
  const add = (e: KatalogEintrag) => {
    eintraege.set(e.id, e)
    nachH.set(e.h, e)
    for (const r of e.rolle) {
      const l = nachRolle.get(r)
      if (l) l.push(e)
      else nachRolle.set(r, [e])
    }
  }
  for (const b of q.blaetter) if (b.de.bausteine.some((x) => x.art === 'notfall')) notfallBlatt.add(b.id)

  // Mikro-Bausteine
  const angaben = new Map<string, { nr: string; stufen: Stufe[]; sozialform: Sozialform[]; kompetenz: string[] }>()
  for (const r of bDatei.bausteine) {
    const blattId = r.id.split(':')[1]
    const blatt = q.blatt.get(blattId)
    if (!blatt) continue
    let a = angaben.get(blattId)
    if (!a) {
      a = { nr: blatt.nr, stufen: blatt.stufen, sozialform: sozialformAus(blatt), kompetenz: [...new Set([...(KOMPETENZ_BLATT[`${blatt.bereich}/${blatt.thema}`] ?? []), ...(blatt.eldib[0] ? [kompetenzAusCode(blatt.eldib[0])] : [])])].slice(0, 2) }
      angaben.set(blattId, a)
    }
    const b = entpackeBaustein(r, a, bDatei.sicher)
    const liste = paketBausteine(blatt, b.quelle.pfad, 'de')
    if (!liste.length) continue
    b.textfelder = texte(liste).map((t) => ({ pfad: t.pfad, max: Math.max(40, Math.round(t.text.length * 1.3)) }))
    if (blatt.de.lehrer.achtung) b.achtung = blatt.de.lehrer.achtung
    const aufgabeWoerter = liste.filter((x): x is Extract<Baustein, { art: 'aufgabe' }> => x.art === 'aufgabe').reduce((n, x) => n + woerter(x.text), 0)
    if (b.art.some((x) => VORLESBAR_ARTEN.has(x)) && aufgabeWoerter <= 12) vorlesbar.add(b.id)
    const e = { typ: 'baustein' as const, ...b }
    add(e)
    const l = bausteineVonBlatt.get(blattId)
    if (l) l.push(e)
    else bausteineVonBlatt.set(blattId, [e])
  }

  // Stundenschritte aus den Quellen
  const idx: Indizes = {
    kurs: new Map(q.kurs.map((e) => [e.id, e])),
    ff: new Map(q.foerderfach.map((e) => [e.id, e])),
    material: new Map(q.materialien.map((m) => [m.id, m])),
    crew: new Map(q.crew.themen.flatMap((t) => t.spiele.map((s) => [s.id, s] as const))),
  }
  const kompetenz = (codes: string[]) => [...new Set(codes.map(kompetenzAusCode))]
  for (const r of sDatei.schritte) {
    const meta = entpackeSchritt(r, sDatei.sicher, kompetenz, stufenAus)
    const t = texteAusQuelle(meta, q, idx)
    if (!t) continue
    const { stelle: _s, ...rest } = meta
    void _s
    add({ typ: 'schritt', ...rest, ...t })
  }

  // neue Inhalte: neue Einträge oder Ergänzungen vorhandener (z. B. Einzelvarianten, Beschriftung)
  const inhalte = inhalteAus(q)
  for (const roh of inhalte.schritte) {
    const da = eintraege.get(roh.id!)
    if (da && da.typ === 'schritt') {
      add({ ...da, ...roh, typ: 'schritt', id: da.id, h: da.h } as KatalogEintrag)
      continue
    }
    const s = inhaltSchritt(roh as Partial<Stundenschritt> & { id: string })
    if (s) add({ typ: 'schritt', ...s })
  }
  // eigene, feste Schritte (Blatt-Slot, „einfach da sein“, stille Rituale)
  for (const s of SYSTEM) if (!eintraege.has(s.id)) add({ typ: 'schritt', ...s })
  // Beschriftung nachbessern (Testlauf 9.10.): Schritte, die eine Küche brauchen, tragen das Material „kueche“ – sonst
  // landete eine Kocheinheit in einer Einzelstunde im Büro (die Prüfregel „Material“ greift dann)
  for (const e of eintraege.values())
    if (e.typ === 'schritt' && !e.material.includes('kueche') && KUECHE_RE.test(`${e.quelle.titel} ${e.vorbereitung ?? ''}`)) e.material = [...e.material, 'kueche']
  // Rollenlisten nach Id sortieren: gleiche Reihenfolge, gleicher Plan
  for (const l of nachRolle.values()) l.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))

  const k: Katalog = { eintraege, nachRolle, stand: `${bDatei.stand}/${sDatei.stand}` }
  INTERN.set(k, { q, seite: bDatei.seite, eldib, nachH, vorlesbar, notfallBlatt, bausteineVonBlatt, wahlkarten: inhalte.wahlkarten.sort((a, b) => (a.id < b.id ? -1 : 1)), materialName: inhalte.material })
  aktuell = k
  return k
}

const KUECHE_RE = /(lehrküche|küche reservieren|kochen im team|gemeinsam kochen|backofen|kochplatte)/i

let laden: Promise<Katalog> | null = null

/** Katalog laden (einmal; danach sofort aus dem Speicher). */
export function ladeKatalog(): Promise<Katalog> {
  laden ??= (async () => {
    const [{ ladeQuellen }, { ladeDaten }] = await Promise.all([import('../quellen'), import('../daten')])
    const [q, d] = await Promise.all([ladeQuellen(), ladeDaten()])
    return baueKatalog(q, d.bausteine as BausteineDatei, d.schritte as SchritteDatei, d.eldib as EldibBank)
  })()
  laden.catch(() => {
    laden = null
  })
  return laden
}

// --- Auflösen (T-M10) und Texte -----------------------------------------------------------------------------------------

export type Aufloesung = { eintrag: KatalogEintrag; status: 'ok' | 'umgezogen' | 'ueberarbeitet' } | { eintrag: null; status: 'fehlt' }

/** Ein Teil eines gespeicherten Plans auflösen: Id + h passt · h unter anderer Id · Id mit neuer Fassung · fehlt. */
export function aufloesen(k: Katalog, ref: string, h?: string): Aufloesung {
  const e = k.eintraege.get(ref)
  if (e && (!h || e.h === h)) return { eintrag: e, status: 'ok' }
  if (h) {
    const x = intern(k).nachH.get(h)
    if (x) return { eintrag: x, status: 'umgezogen' }
  }
  if (e) return { eintrag: e, status: 'ueberarbeitet' }
  return { eintrag: null, status: 'fehlt' }
}

export function eintrag(k: Katalog, ref: string): KatalogEintrag | undefined {
  return k.eintraege.get(ref) ?? intern(k).nachH.get(ref)
}

const ART_NAME: Record<string, string> = {
  geschichte: 'Geschichte', info: 'Info', text: 'Text', ankreuzen: 'Ankreuzen', bilder: 'Bilder', tabelle: 'Tabelle', satzanfaenge: 'Satzanfänge',
  linien: 'Schreiblinien', frage: 'Frage', feld: 'Feld', wennDann: 'Wenn-dann-Plan', dialog: 'Dialog', vertrag: 'Abmachung', einschaetzung: 'Einschätzung',
  skala: 'Skala', zuordnen: 'Zuordnen', gefuehle: 'Gefühlsgesichter', gefuehlsrad: 'Gefühlsrad', ampel: 'Ampel', thermometer: 'Thermometer',
  vulkan: 'Vulkan', eisberg: 'Eisberg', koerper: 'Körperumriss', batterie: 'Batterie', waage: 'Waage', leiter: 'Leiter', zielscheibe: 'Zielscheibe',
  hand: 'Hand', mindmap: 'Mindmap', schritte: 'Schritte', plan: 'Plan', tagesplan: 'Tagesplan', atmen: 'Atemübung', comic: 'Comic', karten: 'Karten',
  rueckblick: 'Rückblick', glaeser: 'Gläser', netz: 'Netz', kurve: 'Kurve', tageskreis: 'Tageskreis', farbkalender: 'Farbkalender', wortspeicher: 'Wortspeicher',
  schneiden_kleben: 'Schneiden & Kleben', memory: 'Memory', labyrinth: 'Labyrinth', laufweg: 'Würfelspiel', minibuch: 'Mini-Buch',
  punkte_verbinden: 'Punkte verbinden', klappbild: 'Klappbild', faedelkarte: 'Fädelkarte', bastelbogen: 'Bastelbogen', suchbild: 'Suchbild',
  anziehpuppe: 'Anziehpuppe', forscherblatt: 'Forscherblatt', spalten: 'Zwei Spalten',
}

export function artName(art: string): string {
  return ART_NAME[art] ?? art
}

function kurz(s: string, n = 90): string {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + ' …'
}

/** Quelle als Text für Plan und Karte: „Skills · Die Stopp-Ampel“, „G-01 · Mein Wutvulkan“ (nie Kurs-Ids). */
export function quelleText(e: KatalogEintrag, sprache: Sprache = 'de'): string {
  if (e.typ === 'baustein') {
    const b = aktuell ? intern(aktuell).q.blatt.get(e.quelle.blatt) : undefined
    const titel = b ? (sprache === 'fr' && b.fr ? b.fr.titel : b.de.titel) : e.quelle.blatt
    return `${e.quelle.nr} · ${titel}`
  }
  const name = QUELLE_NAME[e.quelle.art]?.[sprache] ?? e.quelle.art
  if (e.quelle.art === 'freude' || e.quelle.art === 'ritual' || e.quelle.art === 'praxis') return name
  return `${name} · ${e.quelle.titel}`
}

/** Inhalt eines Bausteins (Sprache, sonst DE). */
export function bausteinInhalt(k: Katalog, b: MikroBaustein, sprache: Sprache): Baustein[] {
  const blatt = intern(k).q.blatt.get(b.quelle.blatt)
  return blatt ? paketBausteine(blatt, b.quelle.pfad, sprache === 'fr' && b.sprache.fr ? 'fr' : 'de') : []
}

export function textVon(e: KatalogEintrag, sprache: Sprache): { titel: string; text: string; sagen?: string[]; wennEsKippt?: string; quelle: string } {
  if (e.typ === 'schritt') {
    const fr = sprache === 'fr' && e.fr ? e.fr : null
    const t = fr ?? e
    const ev = fr?.einzelvariante ?? (fr ? null : e.einzelvariante)
    return { titel: t.titel, text: ev?.text ?? t.text, sagen: ev?.sagen ?? t.sagen, wennEsKippt: t.wennEsKippt, quelle: quelleText(e, sprache) }
  }
  const liste = aktuell ? bausteinInhalt(aktuell, e, sprache) : []
  const aufgaben = liste.filter((x): x is Extract<Baustein, { art: 'aufgabe' }> => x.art === 'aufgabe').map((x) => x.text)
  const haupt = liste.find((x) => x.art !== 'aufgabe')
  const titelVon = (b: Baustein | undefined): string => {
    if (!b) return ''
    if ('titel' in b && typeof b.titel === 'string' && b.titel) return b.titel
    if (b.art === 'frage') return b.text
    return artName(b.art)
  }
  const titel = aufgaben[0] ? kurz(aufgaben[0], 80) : `${artName(haupt?.art ?? '')}${titelVon(haupt) && titelVon(haupt) !== artName(haupt?.art ?? '') ? ': ' + titelVon(haupt) : ''}`
  const inhalt = texte(liste.filter((x) => x.art !== 'aufgabe'))
    .map((t) => t.text)
    .filter(Boolean)
  return { titel, text: kurz([...aufgaben.slice(1), ...inhalt].join(' · ') || artName(haupt?.art ?? ''), 220), quelle: quelleText(e, sprache) }
}

export function ichSatz(k: Katalog, code: string): string | undefined {
  return intern(k).eldib.items[code]?.ich[0]
}

export function eldibKurz(k: Katalog, code: string, sprache: Sprache = 'de'): string {
  return (sprache === 'fr' ? ELDIB_FR[code] : undefined) ?? intern(k).eldib.items[code]?.k ?? code
}

/** Ich-Satz eines Ziels in der Sprache des Blatts: der des Profils, sonst der erste der ELDiB-Bank. Auf Französisch nur ein
 *  französischer Satz (die Bank hat keine) – sonst keiner, und die Ziel-Zeile entfällt. */
export function zielSatz(k: Katalog, p: { ziele: { code: string; ich: string }[] }, code: string, sprache: Sprache): string | undefined {
  const eigen = p.ziele.find((z) => z.code === code)?.ich?.trim()
  if (sprache === 'fr') return eigen && /^(je|j['’]|moi)\b/i.test(eigen) ? eigen : undefined
  return eigen || ichSatz(k, code)
}

export function eldibStufe(k: Katalog, code: string): number {
  return intern(k).eldib.items[code]?.s ?? 0
}
