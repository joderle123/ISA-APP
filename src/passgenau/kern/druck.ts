// Passgenau – Druckdaten (7.5): alles, was das PDF braucht, als reine Daten. Der PDF-Teil (src/passgenau/pdf) kennt
// keinen Katalog – so landen Blätter und Metadaten nicht ein zweites Mal im PDF-Modul. Datenschutz (9.6 Punkt 3, E-M13):
// auf dem Planblatt Vorname, Codes und Quelle-Art, aber keine Daten von Vorfällen oder Notizen; Begründungen nur auf Wunsch.
import type { Baustein, Blatt } from '../../blatt/typen'
import type { MikroBaustein, Plan, PlanSchritt, Profil, Rolle, Sprache } from '../typen'
import { bausteinInhalt, eldibKurz, intern, ichSatz, quelleText, textVon, type Katalog } from './katalog'
import { kinderblatt } from './blatt'
import { BOGEN_NAME, ROLLE_NAME } from './vokabular'
import { hash8 } from './hilfen'

export interface DruckSchritt {
  min: number
  rolle: string
  titel: string
  text: string
  sagen: string[]
  wennEsKippt?: string
  quelle: string
  warum: string[]
  achtung?: string
  hinweis?: string
  wahl?: { titel: string; min: number }[]
  /** der Slot „Übung/Blatt“ */
  blatt?: boolean
  erkundung?: boolean
}

export interface DruckSitzung {
  titel: string
  zeile: string
  vorname?: string
  ziele: { code: string; text: string }[]
  schritte: DruckSchritt[]
  material: string[]
  vorbereitung: string[]
  elternbrief?: string
  hinweise: string[]
  blattTeile: { titel: string; quelle: string; tipp?: string }[]
  kinderblatt: Blatt | null
  karten: Blatt | null
  /** Druckmaterial der Schritte (T-M12): Bildkarten, Memory, Bastelbogen … aus dem verknüpften Blatt */
  materialSeite: Blatt | null
  sprache: Sprache
  warum: boolean
  /** Seitenkopf: „Sitzung 3 von 6“ */
  nr: number
  n: number
  /** Dateiname ohne Namen (E-M13) */
  datei: string
}

export interface DruckFolge {
  titel: string
  sitzungen: DruckSitzung[]
  bogen: { nr: number; phase: string; kern: string }[]
  material: string[]
  datei: string
  sprache: Sprache
}

const KURZ = 240

function kuerzen(s: string | undefined, n = KURZ): string | undefined {
  if (!s) return undefined
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + ' …'
}

/** Begründung ohne Datum für den Druck (E-M13: kein Vorfall- oder Notizdatum auf Papier). */
export function warumOhneDatum(s: string): string {
  return s
    .replace(/\s*\(\d{1,2}\.\d{1,2}\.\)/g, '')
    .replace(/\s+–\s+(Vorfall am|Notiz vom|Beobachtung vom|Gespräch am|Réunion am|Screening vom|Klassenbuch,)\s+\d{1,2}\.\d{1,2}\./g, ' – aus dem Dossier')
    .replace(/\s+\d{1,2}\.\d{1,2}\./g, '')
    .trim()
}

const MATERIAL_STANDARD: Record<string, { de: string; fr: string }> = {
  papier: { de: 'Papier', fr: 'papier' }, buntstifte: { de: 'Buntstifte', fr: 'crayons de couleur' }, schere: { de: 'Schere', fr: 'ciseaux' },
  kleber: { de: 'Klebestift', fr: 'colle' }, karten: { de: 'Karten', fr: 'cartes' }, ball: { de: 'weicher Ball', fr: 'balle souple' },
  plakat: { de: 'Plakat oder Tafel', fr: 'affiche ou tableau' }, wuerfel: { de: 'Würfel', fr: 'dé' }, ipad: { de: 'iPad mit CREW-App', fr: 'iPad avec l’app CREW' },
  beamer: { de: 'Beamer', fr: 'projecteur' }, musik: { de: 'Musik (Lautsprecher)', fr: 'musique (haut-parleur)' }, matten: { de: 'Matten', fr: 'tapis' },
  seil: { de: 'Seil', fr: 'corde' }, tuecher: { de: 'Tücher', fr: 'foulards' }, knete: { de: 'Knete', fr: 'pâte à modeler' }, klangschale: { de: 'Klangschale', fr: 'bol chantant' },
  zeitungen: { de: 'Zeitungen', fr: 'journaux' }, handpuppe: { de: 'Handpuppe', fr: 'marionnette' }, bausteine: { de: 'Bauklötze', fr: 'cubes' },
  spiegel: { de: 'Spiegel', fr: 'miroir' }, kueche: { de: 'Kochplatte', fr: 'plaque de cuisson' }, schwungtuch: { de: 'Schwungtuch', fr: 'parachute' },
  sanduhr: { de: 'Sanduhr oder Timer', fr: 'sablier ou minuteur' }, lochzange: { de: 'Lochzange', fr: 'perforatrice' }, wolle: { de: 'Wollfaden', fr: 'fil de laine' },
}

function materialName(k: Katalog, m: string, sprache: Sprache): string {
  return intern(k).materialName[m]?.[sprache] ?? MATERIAL_STANDARD[m]?.[sprache] ?? m
}

function druckSchritt(k: Katalog, x: PlanSchritt, sprache: Sprache, warum: boolean, blattTitel?: string): DruckSchritt {
  const e = k.eintraege.get(x.ref)
  const rolle = ROLLE_NAME[x.rolle]?.[sprache] ?? x.rolle
  if (!e) return { min: x.min, rolle, titel: x.t ?? x.ref, text: sprache === 'fr' ? 'Plus dans le catalogue – à remplacer.' : 'Nicht mehr im Katalog – bitte ersetzen.', sagen: [], quelle: '', warum: [] }
  const t = textVon(e, sprache)
  const ueberText = x.ueber?.text
  const d: DruckSchritt = {
    min: x.min,
    rolle,
    titel: x.ref === 'pg:blatt' ? `${sprache === 'fr' ? 'Fiche' : 'Blatt'}: ${blattTitel ?? ''}` : (x.ueber?.titel ?? t.titel),
    text: ueberText ?? t.text,
    sagen: t.sagen ?? [],
    wennEsKippt: t.wennEsKippt,
    quelle: x.ref.startsWith('pg:') ? '' : t.quelle,
    warum: warum ? (x.warum ?? []).map(warumOhneDatum) : [],
    achtung: kuerzen(e.achtung),
    hinweis: x.hinweis,
    blatt: x.ref === 'pg:blatt',
    erkundung: x.erkundung,
  }
  if (x.wahl?.length) d.wahl = [{ titel: t.titel, min: x.min }, ...x.wahl.map((w) => ({ titel: (k.eintraege.get(w.ref) ? textVon(k.eintraege.get(w.ref)!, sprache).titel : w.t) ?? w.ref, min: w.min }))]
  return d
}

/** Druckdaten einer Sitzung. */
export function druckSitzung(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten?: boolean }): DruckSitzung {
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const sp = opt.sprache
  const schritte = s.schritte.map((x) => druckSchritt(k, x, sp, opt.warum, s.blatt?.titel))
  // Material: aus allen Schritten und Blatt-Teilen; Ritual-Material nur in Sitzung 1 einer Folge
  const mat = new Set<string>()
  const vorbereitung = new Set<string>()
  let elternbrief: string | undefined
  for (const x of s.schritte) {
    const e = k.eintraege.get(x.ref)
    if (!e) continue
    if ((x.rolle === 'ankommen' || x.rolle === 'abschluss') && nr > 1 && plan.n > 1) continue
    for (const m of e.material) mat.add(materialName(k, m, sp))
    if (e.typ === 'schritt' && e.vorbereitung && !e.id.startsWith('s:')) vorbereitung.add(kuerzen(e.vorbereitung, 200)!)
    if (e.elternbrief) elternbrief = kuerzen(e.elternbrief, 200)
  }
  for (const b of s.blatt?.bausteine ?? []) {
    const e = k.eintraege.get(b.ref)
    if (e) for (const m of e.material) mat.add(materialName(k, m, sp))
  }
  if (s.blatt) mat.add(sp === 'fr' ? 'la fiche (imprimée)' : 'das Blatt (gedruckt)')
  const matSeite = materialSeite(k, p, plan, nr, sp)
  if (matSeite) mat.add(sp === 'fr' ? 'la page de matériel (imprimée, à découper)' : 'die Materialseite (gedruckt, ausschneiden)')
  const blattTeile = (s.blatt?.bausteine ?? [])
    .filter((b) => !b.ref.startsWith('pg:'))
    .map((b) => {
      const e = k.eintraege.get(b.ref) as (MikroBaustein & { typ: 'baustein' }) | undefined
      if (!e) return { titel: b.t ?? b.ref, quelle: '' }
      const quelle = intern(k).q.blatt.get(e.quelle.blatt)
      const leichter = quelle ? ((sp === 'fr' && quelle.fr) || quelle.de).lehrer.differenzierung?.leichter : undefined
      return { titel: textVon(e, sp).titel, quelle: quelleText(e, sp), tipp: kuerzen(leichter, 160) }
    })
  const ziele = plan.ziele.map((code) => ({ code, text: `${eldibKurz(k, code)} – ${p.ziele.find((z) => z.code === code)?.ich ?? ichSatz(k, code) ?? ''}` }))
  const phase = BOGEN_NAME[s.phase]?.[sp] ?? s.phase
  const zeile =
    sp === 'fr'
      ? `Passgenau · ${plan.n > 1 ? `séance ${nr} sur ${plan.n} · ` : ''}${plan.dauer} min · ${phase}`
      : `Passgenau · ${plan.n > 1 ? `Sitzung ${nr} von ${plan.n} · ` : ''}${plan.dauer} Min. · ${phase}`
  const hinweise = [...(s.hinweise ?? [])]
  if (p.vorsicht.includes('heikel') || (p.achtung ?? []).length)
    hinweise.unshift(sp === 'fr' ? 'Un thème sensible est ouvert pour cet enfant. Passgenau ne remplace pas une évaluation – voir le dossier.' : 'Zu diesem Kind ist ein heikles Thema offen. Passgenau ersetzt keine Abklärung – Hinweise im Dossier.')
  return {
    titel: plan.titel,
    zeile,
    vorname: p.vorname,
    ziele,
    schritte,
    material: [...mat],
    vorbereitung: [...vorbereitung],
    elternbrief,
    hinweise,
    blattTeile,
    kinderblatt: s.blatt ? kinderblatt(k, p, plan, nr, sp) : null,
    karten: opt.karten ? karten(k, p, plan, nr, sp) : null,
    materialSeite: matSeite,
    sprache: sp,
    warum: opt.warum,
    nr,
    n: plan.n,
    datei: `Passgenau-Sitzung-${nr}${sp === 'fr' ? '_FR' : ''}.pdf`,
  }
}

/** Bausteinarten, die Druckmaterial sind (ausschneiden, legen, spielen) – nicht Aufgaben zum Ausfüllen */
const DRUCK_ARTEN = new Set(['karten', 'memory', 'suchbild', 'schneiden_kleben', 'bastelbogen', 'minibuch', 'faedelkarte', 'klappbild', 'anziehpuppe', 'laufweg', 'bilder'])

/** Pakete, die ein Schritt der Sitzung als Druckmaterial braucht (verknüpftes Blatt, T-M12) – ohne die, die schon auf dem
 *  Blatt des Kindes stehen; je Schritt höchstens zwei. */
export function druckPakete(k: Katalog, plan: Plan, nr: number): MikroBaustein[] {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return []
  const aufDemBlatt = new Set((s.blatt?.bausteine ?? []).map((b) => b.ref))
  const out = new Map<string, MikroBaustein>()
  for (const x of s.schritte)
    for (const ref of [x.ref, ...(x.wahl ?? []).map((w) => w.ref)]) {
      const e = k.eintraege.get(ref)
      if (!e || e.typ !== 'schritt' || !e.blatt?.length) continue
      let n = 0
      for (const id of e.blatt) {
        const b = k.eintraege.get(id)
        if (!b || b.typ !== 'baustein' || aufDemBlatt.has(id) || out.has(id) || !b.art.some((a) => DRUCK_ARTEN.has(a))) continue
        out.set(id, b)
        if (++n >= 2) break
      }
    }
  return [...out.values()]
}

/** Materialseite zur Stunde: die Druckpakete als eigenes Blatt (gleiche Gestaltung wie ihr Quellblatt). */
export function materialSeite(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): Blatt | null {
  const pakete = druckPakete(k, plan, nr)
  if (!pakete.length) return null
  const quelle = intern(k).q.blatt.get(pakete[0].quelle.blatt)
  const fr = sprache === 'fr' && pakete.every((b) => b.sprache.fr)
  const bausteine = pakete.flatMap((b) => bausteinInhalt(k, b, fr ? 'fr' : 'de'))
  const inhalt = { titel: fr ? 'Matériel pour la séance' : 'Material zur Stunde', bausteine, lehrer: { ziel: '', ablauf: [], hintergrund: '' } }
  return {
    id: `pg-material-${hash8(plan.id + '|' + nr + '|' + pakete.map((b) => b.id).join(','))}`,
    bereich: quelle?.bereich ?? 'gefuehle',
    thema: quelle?.thema ?? 'erkennen',
    stufen: quelle?.stufen ?? [p.stufen[0] ?? 'C3'],
    layout: quelle?.layout ?? p.layout,
    sozialform: ['einzeln'],
    dauer: `${plan.dauer} Min.`,
    eldib: [],
    schlagworte: [],
    passgenau: { herkunft: fr ? 'Passgenau · matériel de la Toolbox' : 'Passgenau · Material aus der Toolbox' },
    de: inhalt,
    ...(fr ? { fr: inhalt } : {}),
  }
}

/** Karten zur Stunde (7.5): Stundenleiste, Check-in, Wahlkarte (Weg 3), Wochenziel-Karte – als synthetisches Blatt. */
export function karten(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): Blatt | null {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return null
  const alter = p.alterJahre
  const jugend = alter >= 12
  const bausteine: Baustein[] = []
  const WORT: Record<Rolle, { de: string; fr: string; bild: string }> = {
    ankommen: { de: 'Ankommen', fr: 'Arriver', bild: 'icon:door-enter' }, einstieg: { de: 'Anfangen', fr: 'Commencer', bild: 'icon:bulb' },
    kern: { de: 'Üben', fr: 'S’entraîner', bild: 'icon:target' }, uebung: { de: 'Blatt', fr: 'Fiche', bild: 'icon:pencil' },
    bewegung: { de: 'Bewegen', fr: 'Bouger', bild: 'icon:run' }, spiel: { de: 'Spielen', fr: 'Jouer', bild: 'icon:dice-5' },
    regulation: { de: 'Ruhe', fr: 'Calme', bild: 'icon:leaf' }, reflexion: { de: 'Zurückschauen', fr: 'Revenir', bild: 'icon:eye' },
    abschluss: { de: 'Tschüss', fr: 'Au revoir', bild: 'icon:door-exit' }, transfer: { de: 'Mitnehmen', fr: 'Emporter', bild: 'icon:star' },
  }
  const leiste = s.schritte.slice(0, 7).map((x) => ({ text: WORT[x.rolle][sprache], bild: WORT[x.rolle].bild, min: x.min }))
  if (leiste.length >= 2) bausteine.push({ art: 'stundenleiste', schritte: leiste })
  const ritual = k.eintraege.get(s.schritte.find((x) => x.rolle === 'ankommen')?.ref ?? '')
  const anspruch = ritual?.anspruch ?? 1
  // ist das Ankommens-Ritual selbst schon ein Check-in (Gefühlstiere, Wetter, Zahl), keine zweite Karte dafür
  const ritualText = ritual ? textVon(ritual, 'de').titel + ' ' + textVon(ritual, 'de').text : ''
  const selbstCheckin = /(gefühl|wie geht|stimmung|wetter|heute zu (ihm|ihr|dir) passt|zahl von|skala|daumen)/i.test(ritualText)
  if (anspruch >= 1 && !selbstCheckin) bausteine.push({ art: 'checkin', modus: jugend ? 'zahl' : alter <= 7 ? 'gesichter' : 'wetter' })
  const wahl = s.schritte.find((x) => x.wahl?.length)
  if (wahl) {
    const optionen = [wahl, ...(wahl.wahl ?? [])].slice(0, 3).map((w) => {
      const e = k.eintraege.get(w.ref)
      const t = e ? textVon(e, sprache).titel : (('t' in w && w.t) || w.ref)
      const f = e?.format[0]
      const bild = f === 'bewegung' ? 'icon:run' : f === 'malen' ? 'icon:palette' : f === 'musik' ? 'icon:music' : f === 'spiel' ? 'icon:dice-5' : f === 'basteln' ? 'icon:puzzle' : f === 'sinne' || f === 'atmen' ? 'icon:leaf' : 'icon:armchair'
      return { text: t.length > 38 ? t.slice(0, 37) + '…' : t, bild, min: w.min }
    })
    const karte = wahl.wahlkarte ? intern(k).wahlkarten.find((w) => w.id === wahl.wahlkarte) : undefined
    bausteine.push({ art: 'wahlkarte', frage: karte?.kopf[sprache], optionen })
  }
  if (p.wochenziel && plan.weg !== 'leicht') bausteine.push({ art: 'zielkarte', titel: sprache === 'fr' ? 'Mon objectif de la semaine' : 'Mein Wochenziel', text: p.wochenziel, tage: sprache === 'fr' ? ['lun', 'mar', 'mer', 'jeu', 'ven'] : ['Mo', 'Di', 'Mi', 'Do', 'Fr'] })
  if (bausteine.length < 2) return null
  const kb = s.blatt ? kinderblatt(k, p, plan, nr, sprache) : null
  const titel = sprache === 'fr' ? 'Cartes pour la séance' : 'Karten zur Stunde'
  const inhalt = { titel, ...(p.layout === 'bild' && !jugend ? { anleitung: sprache === 'fr' ? 'Découper les cartes et les poser sur la table.' : 'Karten ausschneiden und auf den Tisch legen.' } : {}), bausteine, lehrer: { ziel: '', ablauf: [], hintergrund: '' } }
  return {
    id: `pg-karten-${hash8(plan.id + nr)}`,
    bereich: kb?.bereich ?? 'gefuehle',
    thema: kb?.thema ?? 'erkennen',
    stufen: kb?.stufen ?? [p.stufen[0] ?? 'C3'],
    layout: kb?.layout ?? (jugend ? 'jugend' : p.layout),
    sozialform: ['einzeln'],
    dauer: `${plan.dauer} Min.`,
    eldib: [],
    schlagworte: [],
    passgenau: {},
    de: inhalt,
    ...(sprache === 'fr' ? { fr: inhalt } : {}),
  }
}

export function druckFolge(k: Katalog, p: Profil, plan: Plan, opt: { sprache: Sprache; warum: boolean }): DruckFolge {
  const sitzungen = plan.sitzungen.map((s) => druckSitzung(k, p, plan, s.nr, { ...opt, karten: false }))
  const material = [...new Set(sitzungen.flatMap((s) => s.material))]
  return {
    titel: plan.titel,
    sitzungen,
    bogen: plan.sitzungen.map((s) => {
      const kern = s.schritte.find((x) => x.rolle === 'kern')
      const e = kern ? k.eintraege.get(kern.ref) : undefined
      return { nr: s.nr, phase: BOGEN_NAME[s.phase]?.[opt.sprache] ?? s.phase, kern: e ? textVon(e, opt.sprache).titel : (kern?.t ?? '') }
    }),
    material,
    datei: `Passgenau-Folge${opt.sprache === 'fr' ? '_FR' : ''}.pdf`,
    sprache: opt.sprache,
  }
}
