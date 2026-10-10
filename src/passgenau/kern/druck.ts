// Passgenau – Druckdaten (7.5): alles, was das PDF braucht, als reine Daten. Der PDF-Teil (src/passgenau/pdf) kennt
// keinen Katalog – so landen Blätter und Metadaten nicht ein zweites Mal im PDF-Modul. Datenschutz (9.6 Punkt 3, E-M13):
// auf dem Planblatt Vorname, Codes und Quelle-Art, aber keine Daten von Vorfällen oder Notizen; Begründungen nur auf Wunsch.
import type { Baustein, Blatt } from '../../blatt/typen'
import type { KatalogEintrag, MikroBaustein, Plan, PlanSchritt, Profil, Rolle, Sprache } from '../typen'
import { bausteinInhalt, eldibKurz, intern, istGruppenText, merkmaleVon, quelleText, setzeTextModus, staemme, textVon, zielSatz, type Katalog } from './katalog'
import { textMerkmale } from './einzel'
import { kinderblatt, quellenDerUebertragung } from './blatt'
import { gruppenRollen, mitgliedProfil } from './gruppe'
import { BOGEN_NAME, KURSVERWEIS_RE, NUR_DEUTSCH, ROLLE_NAME } from './vokabular'
import { hash8, SATZ_GRENZE_GROSS, stufeAusAlter } from './hilfen'

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
  /** Optionen der Wahl; ab der zweiten mit einer kurzen Anleitung (die erste steht im Text des Schritts) */
  wahl?: { titel: string; min: number; kurz?: string }[]
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
  /** Kleingruppe: die Blätter der übrigen Kinder, je in Stufe, Gestaltung und Sprache des Kindes */
  weitereBlaetter?: { name: string; blatt: Blatt; sprache: Sprache }[]
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
  /** Krisentag oder Weg 3 (P10): zum Ankreuzen „hat sich beruhigt · war dabei · …“ statt „hat (nicht) geklappt“ */
  krisentag?: boolean
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

/** Kurzer Titel für eine Wahlkarte ohne „…“: Teil vor „ – “ oder „:“, sonst bis zur letzten Wortgrenze. */
function kurzLabel(t: string, n = 38): string {
  if (t.length <= n) return t
  const vorne = t.split(/\s+[–-]\s+|:\s+/)[0]
  if (vorne.length <= n && vorne.length >= 8) return vorne
  return t.slice(0, n).replace(/\s+\S*$/, '').replace(/[,;:–-]$/, '')
}

/** Hinweise des Planers, die eine Handlung in der Oberfläche anbieten oder nur die Planung erklären – auf Papier sinnlos */
// (Blind-Bewertung 8: „noch kein ELDiB-Ziel – ELDiB-Einschätzung fehlt“ ist Fachjargon ohne Nutzen für die Stunde, „Fiche
// élargie“ und „Gruppenaktivität – so mit einem Kind machen“ ohne Anleitung verunsichern nur)
const NUR_OBERFLAECHE = /Leichte Stunde zeigen\.$|Mitmach-Seite auf Wunsch\.$|ohne Blatt geplant|nur auf Deutsch\.$|im Baukasten suchen\.$|Im Ergebnis anpassen\.$|ELDiB-Einschätzung fehlt\.$|^Blatt gelockert|^Gruppenaktivität – so mit einem Kind machen$/

/** Name der Phase; bei Jugendlichen ohne „Feiern“ (Blind-Bewertung 5: angekündigt, aber nie gefeiert). */
function phasenName(phase: string, sp: Sprache, alter: number): string {
  if (phase === 'reflektieren' && alter >= 12) return sp === 'fr' ? 'Bilan' : 'Rückblick'
  return BOGEN_NAME[phase as keyof typeof BOGEN_NAME]?.[sp] ?? phase
}

/** Hinweise des Planers (deutsch gespeichert) für ein französisches Planblatt. */
function hinweisFr(h: string): string {
  let m: RegExpExecArray | null
  if (h === 'Noch kein ELDiB-Ziel – Stunde zum Kennenlernen. ELDiB-Einschätzung fehlt.') return 'Pas encore d’objectif ELDiB – séance pour faire connaissance. Évaluation ELDiB à faire.'
  if ((m = /^Schwerpunkt: (.+) \(noch kein ELDiB-Ziel\) – ELDiB-Einschätzung fehlt\.$/.exec(h))) return `Thème : ${m[1]} (pas encore d’objectif ELDiB) – évaluation ELDiB à faire.`
  if ((m = /^Sitzung (\d+): Phase von Sitzung (\d+) wiederholt, mit anderen Bausteinen\.$/.exec(h))) return `Séance ${m[1]} : phase de la séance ${m[2]} répétée, avec d’autres activités.`
  if ((m = /^Sitzung (\d+) angepasst, weil Sitzung (\d+) nicht geklappt hat: eine Stufe zurück\./.exec(h))) return `Séance ${m[1]} adaptée parce que la séance ${m[2]} n’a pas marché : un pas en arrière.`
  if ((m = /^Angepasst an heute: (.+)$/.exec(h))) return `Adapté à aujourd’hui : ${m[1].replace(/ Min\./g, ' min')}`
  if (h === 'Blatt gelockert: Teile aus dem Bereich des Ziels (nächste Stufen), nicht genau zum Ziel.') return 'Fiche élargie : parties du domaine de l’objectif (étapes suivantes), pas exactement l’objectif.'
  if (h === NUR_DEUTSCH) return 'Existe seulement en allemand : pour cet objectif, il n’y a pas encore d’activité en français qui convienne. À dire avec ses propres mots.'
  if (h === 'Gruppenaktivität – so mit einem Kind machen') return 'Activité de groupe – à faire ainsi avec un seul enfant'
  if ((m = /^schon vor (\d+) Tagen gemacht – wieder vorgeschlagen, weil sonst wenig passt$/.exec(h))) return `déjà fait il y a ${m[1]} jours – reproposé parce que peu d’autres choses conviennent`
  if (h === 'Letzte Sitzung: heute gemeinsam ansehen, was über die Folge gesammelt wurde.') return 'Dernière séance : regarder ensemble ce qui a été rassemblé pendant la série.'
  if ((m = /^Nicht in dieser Folge: (.+) – dafür eine eigene Folge planen( oder 6 und mehr Sitzungen wählen)?\.$/.exec(h))) return `Pas dans cette série : ${m[1]} – prévoir une série à part${m[2] ? ' ou choisir 6 séances ou plus' : ''}.`
  return h
}

/** Schutzsätze, die auch dann bleiben, wenn sie von einer Gruppe sprechen. */
const SCHUTZ_RE = /(Missbrauch|Selbstverletz|Suizid|Gefährdung|Kinderschutz|Gewalt zu Hause|Einzelgespräch|SePAS|abus|suicide|danger)/

/** Sätze, die immer bleiben: Sicherheit, Krise, Freiwilligkeit (E-M4). */
const SICHERHEIT_RE = /(Krise|Notfall|SePAS|Hilfe holen|melden|Gefährdung|Suizid|Selbstverletz|Kinderschutz|Gewalt|vertraulich|nicht vorlesen|Stopp|freiwillig|Freiwillig|niemand muss|keiner muss|Hilfe-Zeile|Notruf|Trauma|traumat|Übergriff|danach (kurz )?(mit|nach)|crise|urgence|confidentiel|volontaire|personne n['’]est obligé)/

/** Beachten-Hinweis für diesen Schritt: Die Einheit trägt einen Hinweis für alle ihre Schritte – davon bleiben die Sätze
 *  zur Sicherheit und die, die diesen Schritt betreffen (Blind-Bewertung 9.10.: Hinweise zu Übungen, die nicht vorkamen). */
function achtungFuer(e: KatalogEintrag, schrittText: string, sicherheitImmer = true, sp: Sprache = 'de'): string | undefined {
  // auf einem französischen Planblatt der französische Hinweis, wenn die Quelle einen hat (Blind-Bewertung 9.10.)
  const achtung = sp === 'fr' && e.typ === 'schritt' && e.fr?.achtung ? e.fr.achtung : e.achtung
  if (!achtung) return undefined
  if (e.typ !== 'schritt' || !(e.id.startsWith('k:') || e.id.startsWith('f:') || e.id.startsWith('m:'))) return achtung
  const bezug = staemme(schrittText)
  const saetze = achtung.replace(/\s+/g, ' ').trim().split(SATZ_GRENZE_GROSS)
  // Sätze über die Gruppe („Für sehr lebhafte Gruppen …“) gelten in der Einzelstunde nicht; ein Schutzsatz bleibt und
  // spricht von der Stunde statt von der Gruppe („nicht in der Gruppe vertiefen, sondern im Einzelgespräch“)
  // (in der Gruppenstunde bleiben sie, Aufgabe 151)
  const gruppe = istGruppenText()
  const bleibt = saetze
    .filter((x: string) => (sicherheitImmer && SICHERHEIT_RE.test(x)) || [...staemme(x)].some((w) => bezug.has(w)))
    .filter((x: string) => gruppe || !textMerkmale(x).has('gruppe') || SCHUTZ_RE.test(x))
    .map((x: string) => (gruppe ? x : x.replace(/\b(in|vor|mit) der (ganzen )?Gruppe\b/g, '$1 der Stunde').replace(/\bdans le groupe\b/g, 'pendant la séance')))
  return bleibt.length ? bleibt.join(' ') : undefined
}

/** Kürzen nur an Satzgrenzen (Blind-Bewertung 9.10.: „…“ mitten im Satz wirkt abgeschnitten, gerade bei Sicherheits-
 *  hinweisen): ganze Sätze bis zur Länge n, mindestens der erste Satz ganz. */
function kuerzen(s: string | undefined, n = KURZ): string | undefined {
  if (!s) return undefined
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= n) return t
  const saetze = t.split(SATZ_GRENZE_GROSS)
  let r = saetze[0]
  for (const x of saetze.slice(1)) {
    if (r.length + 1 + x.length > n) break
    r += ' ' + x
  }
  return r
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

/** Material, das im Text eines Schritts vorkommt, aber nicht beschriftet ist (Blind-Bewertung 9.10.: „Handpuppe,
 *  Wetterkarte, Sticker fehlen im Material“) – Wort im Text → Schlüssel oder Bezeichnung DE/FR. */
const MATERIAL_IM_TEXT: [RegExp, string | { de: string; fr: string }][] = [
  [/Handpuppe|Fingerpuppe|marionnette/i, 'handpuppe'],
  [/Würfel|\bdé\b/i, 'wuerfel'],
  [/\bBall\b|Bälle|\bballe\b/i, 'ball'],
  [/Tücher|Tuch\b|foulard/i, 'tuecher'],
  [/Knete|pâte à modeler/i, 'knete'],
  [/Klangschale|bol chantant/i, 'klangschale'],
  [/Sanduhr|Timer|sablier|minuteur/i, 'sanduhr'],
  [/\bSpiegel\b|\bmiroir\b/i, 'spiegel'],
  [/etwas zu trinken|Getränk|à boire|boisson/i, { de: 'etwas zu trinken', fr: 'de quoi boire' }],
  [/Knetball|balle anti-stress|balle à malaxer/i, { de: 'Knetball', fr: 'balle anti-stress' }],
  [/\bLineal\b|\bune règle pour tracer\b/i, { de: 'Lineal', fr: 'règle' }],
  [/Bauklötze|Bausteine aus Holz|cubes/i, 'bausteine'],
  [/Wetterkarte|carte météo/i, { de: 'Wetterkarte (Sonne, Wolke, Regen, Gewitter)', fr: 'carte météo (soleil, nuage, pluie, orage)' }],
  [/Sticker|Aufkleber|autocollant/i, { de: 'Sticker', fr: 'autocollants' }],
  [/Decke\b|couverture/i, { de: 'Decke', fr: 'couverture' }],
  [/Kreppband|Klebeband|ruban adhésif/i, { de: 'Kreppband', fr: 'ruban adhésif' }],
  [/Schachtel|Karton\b|boîte/i, { de: 'Schachtel', fr: 'boîte' }],
  [/Stofftier|peluche/i, { de: 'Stofftier', fr: 'peluche' }],
  [/Glas\b|Gläser|bocal/i, { de: 'Glas', fr: 'bocal' }],
  [/Steine?\b|pierres?\b/i, { de: 'kleine Steine', fr: 'petites pierres' }],
  [/Seifenblasen|bulles de savon/i, { de: 'Seifenblasen', fr: 'bulles de savon' }],
  [/Luftballon|ballon de baudruche/i, { de: 'Luftballon', fr: 'ballon de baudruche' }],
  [/Strohhalm|paille/i, { de: 'Strohhalme', fr: 'pailles' }],
  [/Wäscheklammer|pince à linge/i, { de: 'Wäscheklammern', fr: 'pinces à linge' }],
]

function materialName(k: Katalog, m: string, sprache: Sprache): string {
  return intern(k).materialName[m]?.[sprache] ?? MATERIAL_STANDARD[m]?.[sprache] ?? m
}

/** Name der Rolle auf dem Planblatt: eine Atem-, Dehn- oder Bewegungsübung im Spiel-Slot heißt nicht „Spiel“, bei
 *  Jugendlichen heißt das freie Angebot „Aktivität“ (Blind-Bewertung 7: „Box-Atmung als SPIEL“, „Jouer“ bei 15 Jahren) */
function rolleName(x: PlanSchritt, e: KatalogEintrag | undefined, sprache: Sprache, jugend: boolean): string {
  if (x.rolle === 'spiel' && e) {
    if (e.format.includes('bewegung') && !e.format.includes('spiel')) return ROLLE_NAME.bewegung[sprache]
    if (e.format.some((f) => f === 'atmen' || f === 'achtsamkeit') || (e.typ === 'schritt' && e.rolle.includes('regulation') && !e.rolle.includes('spiel'))) return ROLLE_NAME.regulation[sprache]
    if (jugend) return sprache === 'fr' ? 'Activité' : 'Aktivität'
  }
  return ROLLE_NAME[x.rolle]?.[sprache] ?? x.rolle
}

/** „Der oder die Jugendliche“ → Name (Planblatt für eine Person). */
function mitName(t: string, name: string, sp: Sprache): string {
  if (sp === 'fr') {
    const de = /^[aeiouyéèêàâîôûh]/i.test(name) ? `d’${name}` : `de ${name}`
    return t
      .replace(/\bdu ou de la jeune\b/g, de)
      .replace(/\bau ou à la jeune\b/g, `à ${name}`)
      .replace(/\b[Ll]e ou la jeune\b/g, name)
      .replace(/\b[Ii]l ou elle\b/g, name)
  }
  return t
    .replace(/\b[Dd](er oder die|en oder die) Jugendliche\b/g, name)
    .replace(/\b[Dd]em oder der Jugendlichen\b/g, name)
    .replace(/\b[Ee]r oder sie\b/g, name)
    .replace(/\b[Ii]hm oder ihr\b/g, name)
}

/** Sätze mit einer Diagnose als Beispiel weglassen (Blind-Bewertung 8: „im Autismus-Spektrum“ ohne Anlass im Planblatt). */
function ohneDiagnose(t: string | undefined): string | undefined {
  if (!t || !textMerkmale(t).has('diagnose')) return t
  const rest = t.split(/(?<=[.!?])\s+/).filter((x) => !textMerkmale(x).has('diagnose')).join(' ').trim()
  return rest || undefined
}

function druckSchritt(k: Katalog, x: PlanSchritt, sprache: Sprache, warum: boolean, blattTitel?: string, jugend = false): DruckSchritt {
  const e = k.eintraege.get(x.ref)
  const rolle = rolleName(x, e, sprache, jugend)
  if (!e) return { min: x.min, rolle, titel: x.t ?? x.ref, text: sprache === 'fr' ? 'Plus dans le catalogue – à remplacer.' : 'Nicht mehr im Katalog – bitte ersetzen.', sagen: [], quelle: '', warum: [] }
  const t = textVon(e, sprache)
  const ueberText = (sprache === 'fr' ? x.ueber?.['fr.text'] : undefined) ?? x.ueber?.text
  const d: DruckSchritt = {
    min: x.min,
    rolle,
    titel: x.ref === 'pg:blatt' ? `${sprache === 'fr' ? 'Fiche' : 'Blatt'}: ${blattTitel ?? ''}` : ((sprache === 'fr' ? x.ueber?.['fr.titel'] : undefined) ?? x.ueber?.titel ?? t.titel),
    text: ohneDiagnose(ueberText ?? t.text) ?? '',
    sagen: (sprache === 'fr' ? x.ueber?.['fr.sagen'] : undefined) ?? x.ueber?.sagen ? [((sprache === 'fr' ? x.ueber?.['fr.sagen'] : undefined) ?? x.ueber!.sagen)!] : (t.sagen ?? []),
    wennEsKippt: ohneDiagnose((sprache === 'fr' ? x.ueber?.['fr.wennEsKippt'] : undefined) ?? x.ueber?.wennEsKippt ?? t.wennEsKippt),
    quelle: x.ref.startsWith('pg:') ? '' : t.quelle,
    warum: warum ? (x.warum ?? []).map(warumOhneDatum) : [],
    // Nebenschritte (Ankommen, Bewegung, Spiel, Ruhe, Abschluss) tragen den Hinweis ihrer Einheit nur, wenn er sie betrifft
    achtung: ohneDiagnose(kuerzen(achtungFuer(e, `${t.titel} ${t.text} ${(t.sagen ?? []).join(' ')}`, x.rolle === 'kern' || x.rolle === 'einstieg' || x.rolle === 'reflexion' || x.rolle === 'transfer', sprache), 320)),
    hinweis: !x.hinweis || NUR_OBERFLAECHE.test(x.hinweis) ? undefined : sprache === 'fr' ? hinweisFr(x.hinweis) : x.hinweis,
    blatt: x.ref === 'pg:blatt',
    erkundung: x.erkundung,
  }
  // Blind-Bewertung 9.10.: Optionen ohne Anleitung („Carte au trésor“ – und dann?) – jede Option mit einem Satz
  if (x.wahl?.length)
    d.wahl = [
      { titel: t.titel, min: x.min },
      ...x.wahl.map((w) => {
        const we = k.eintraege.get(w.ref)
        const titel = (w.ref === 'pg:blatt' ? (sprache === 'fr' ? 'Page à colorier / à jouer' : w.t) : we ? textVon(we, sprache).titel : w.t) ?? w.ref
        const kurzText = we && w.ref !== 'pg:blatt' ? kuerzen(textVon(we, sprache).text, 170) : undefined
        return { titel, min: w.min, ...(kurzText ? { kurz: kurzText } : {}) }
      }),
    ]
  return d
}

/** Ziel-Codes, die der Kern einer Sitzung übt (Übertragen: die der übertragenen Übung; Rückblick: alle der Folge). */
function geuebteZiele(k: Katalog, plan: Plan, s: Plan['sitzungen'][number]): Set<string> | null {
  const kern = s.schritte.find((x) => x.rolle === 'kern')
  if (!kern) return null
  const codesVon = (e: KatalogEintrag | undefined) => (e ? e.eldib.map((x) => x.code) : [])
  if (kern.ref === 'pg:folge-transfer')
    return new Set(plan.sitzungen.flatMap((y) => y.schritte.filter((z) => z.rolle === 'kern' && !z.ref.startsWith('pg:')).flatMap((z) => codesVon(k.eintraege.get(z.ref)))))
  const es = kern.ref === 'pg:uebertragen' ? quellenDerUebertragung(k, plan, kern) : [k.eintraege.get(kern.ref)].filter((x): x is KatalogEintrag => !!x)
  return es.length ? new Set(es.flatMap(codesVon)) : null
}

/** Druckdaten einer Sitzung. */
export function druckSitzung(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten?: boolean }): DruckSitzung {
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const sp = opt.sprache
  setzeTextModus((plan.auftrag?.sozialform ?? 'einzeln') !== 'einzeln')
  const schritte = s.schritte.map((x) => druckSchritt(k, x, sp, opt.warum, s.blatt?.titel, p.alterJahre >= 12))
  // Jugendliche mit Namen (Blind-Bewertung 8: „‚der oder die Jugendliche‘ statt Elif“, „‚le ou la jeune / il ou elle‘ für
  // einen namentlich bekannten Jungen“) – nur für eine Person, nicht in der Gruppe
  const name = !p.gruppe?.length && p.alterJahre >= 12 ? (p.anrede ?? p.vorname ?? '').trim() : ''
  if (name) for (const d of schritte) {
    d.text = mitName(d.text, name, sp)
    if (d.wennEsKippt) d.wennEsKippt = mitName(d.wennEsKippt, name, sp)
    if (d.achtung) d.achtung = mitName(d.achtung, name, sp)
    if (d.hinweis) d.hinweis = mitName(d.hinweis, name, sp)
  }
  // Material: aus allen Schritten und Blatt-Teilen; Ritual-Material nur in Sitzung 1 einer Folge
  const mat = new Set<string>()
  const vorbereitung = new Set<string>()
  let elternbrief: string | undefined
  for (const x of s.schritte) {
    const e = k.eintraege.get(x.ref)
    if (!e) continue
    if ((x.rolle === 'ankommen' || x.rolle === 'abschluss') && nr > 1 && plan.n > 1) continue
    for (const m of e.material) mat.add(materialName(k, m, sp))
    // was der Text nennt, kommt dazu (Ritual-Material einer Folge nur in Sitzung 1, wie oben); nur der Text, nicht der Titel
    // („Miroir d’improvisation“ braucht keinen Spiegel), und nicht bei Übertragen/Rückblick – dort stehen nur die Titel
    // anderer Übungen („Übertragen: Der Würfel schlägt vor“ braucht keinen Würfel; Blind-Bewertung 7)
    const tx = e.typ === 'schritt' && x.ref !== 'pg:uebertragen' && x.ref !== 'pg:folge-transfer' ? (x.ueber?.text ?? e.einzelvariante?.text ?? e.text) : ''
    for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(tx)) mat.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
    // Optionen einer Wahl bringen ihr Material mit („Einfach da sein“: Getränk, Knetball, Tuch)
    for (const w of x.wahl ?? []) {
      const we = k.eintraege.get(w.ref)
      if (!we || we.typ !== 'schritt') continue
      for (const m of we.material) mat.add(materialName(k, m, sp))
      for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(we.text)) mat.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
    }
    if (e.typ === 'schritt' && !e.id.startsWith('s:')) {
      // Förderfach auf Französisch: die französische Vorbereitung der Einheit (deutsche nur, wo es keine Fassung gibt)
      const v = sp === 'fr' && e.fr && e.id.startsWith('f:') ? e.fr.vorbereitung : e.vorbereitung
      if (v) vorbereitung.add(kuerzen(v, 200)!)
    }
    // Elternbrief der Einheit nur, wenn er diesen Schritt betrifft – und nie bei offenem Kinderschutz-Thema
    if (e.elternbrief && !(p.achtung ?? []).includes('kinderschutz') && e.typ === 'schritt') {
      const bezug = staemme(`${e.titel} ${e.text}`)
      if ([...staemme(e.elternbrief)].some((w) => bezug.has(w))) elternbrief = kuerzen(e.elternbrief, 200)
    }
  }
  for (const b of s.blatt?.bausteine ?? []) {
    const e = k.eintraege.get(b.ref)
    if (e) for (const m of e.material) mat.add(materialName(k, m, sp))
  }
  // was die Blatt-Teile verlangen („Verbinde mit dem Lineal“)
  for (const b of s.blatt?.bausteine ?? []) {
    const e = k.eintraege.get(b.ref)
    if (e && e.typ === 'baustein') {
      const t = textVon(e, sp)
      for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(`${t.titel} ${t.text}`)) mat.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
    }
  }
  if (s.blatt) mat.add(sp === 'fr' ? 'la fiche (imprimée)' : 'das Blatt (gedruckt)')
  // wer ein Blatt ausfüllt, braucht einen Stift (Blind-Bewertung 6: „Stifte fehlen in der Materialliste“)
  if (s.blatt) mat.add(materialName(k, 'stifte', sp))
  // aufräumen (Blind-Bewertung 7: „Minuteur steht doppelt“, „Stuhl ohne erkennbaren Zweck“): ein Zeitmesser, nichts, was
  // in jedem Raum steht
  {
    const zeit = /minuteur|Timer|Sanduhr|sablier|\bUhr\b|montre|chrono/i
    let schonZeit = false
    for (const m of [...mat]) {
      if (/^(Stuhl|Stühle|Tisch|chaise|chaises|table)$/i.test(m.trim())) mat.delete(m)
      else if (zeit.test(m)) {
        if (schonZeit) mat.delete(m)
        schonZeit = true
      }
    }
  }
  const matSeite = materialSeite(k, p, plan, nr, sp)
  if (matSeite) mat.add(sp === 'fr' ? 'la page de matériel (imprimée, à découper)' : 'die Materialseite (gedruckt, ausschneiden)')
  const tippSchon = new Set<string>()
  const imBlatt = new Set((s.blatt?.bausteine ?? []).map((b) => b.ref))
  const blattTeile = (s.blatt?.bausteine ?? [])
    .filter((b) => !b.ref.startsWith('pg:'))
    .map((b) => {
      const e = k.eintraege.get(b.ref) as (MikroBaustein & { typ: 'baustein' }) | undefined
      if (!e) return { titel: b.t ?? b.ref, quelle: '' }
      const quelle = intern(k).q.blatt.get(e.quelle.blatt)
      const leichter = quelle ? ((sp === 'fr' && quelle.fr) || quelle.de).lehrer.differenzierung?.leichter : undefined
      // der Tipp kommt aus dem Quellblatt – mit Verweis auf die Kursstruktur („pro Modul“) lieber keiner
      // Herkunft in Worten statt Katalog-Nummer („S-57 · …“ las sich wie ein Code)
      const qTitel = quelle ? ((sp === 'fr' && quelle.fr) || quelle.de).titel : quelleText(e, sp)
      // der Tipp „leichter“ gilt für das ganze Quellblatt: nur einmal je Blatt
      // … und nicht, wenn er auf Teile des Quellblatts zeigt, die hier fehlen („Aufgabe 3“, „Memory“, „Bildkarten“)
      // … und nur, wenn das ganze Quellblatt dabei ist (Blind-Bewertung 8: „Aufgaben 3 bis 5 mündlich“, „Exercices 1 et 2“,
      // „Trost-Satz“ – der Tipp sprach von Teilen, die hier fehlen)
      const ganz = (intern(k).bausteineVonBlatt.get(e.quelle.blatt) ?? []).every((x) => imBlatt.has(x.id))
      const tipp = leichter && ganz && p.alterJahre < 12 && !KURSVERWEIS_RE.test(leichter) && !textMerkmale(leichter).has('blattverweis') && !/\b(Aufgabe\w*|Karte|Karten|Memory|Bildkarten|Seite|exercices?|cartes?|page)\b/i.test(leichter) && !tippSchon.has(e.quelle.blatt) ? kuerzen(leichter.replace(/\bdie Lehrperson\b/g, 'die Fachkraft').replace(/\bLehrperson\b/g, 'Fachkraft'), 160) : undefined
      if (tipp) tippSchon.add(e.quelle.blatt)
      return { titel: textVon(e, sp).titel, quelle: sp === 'fr' ? `de la fiche « ${qTitel} »` : `aus dem Blatt „${qTitel}“`, tipp }
    })
  // Jugend-Folge (Blind-Bewertung 7: „K-34 steht im Kopf, wird in der Sitzung aber nicht bearbeitet“): nur die Ziele, die der
  // Kern dieser Sitzung übt
  const geuebt = p.alterJahre >= 12 && plan.n > 1 ? geuebteZiele(k, plan, s) : null
  const codes = geuebt ? plan.ziele.filter((c) => geuebt.has(c)) : plan.ziele
  const ziele = (codes.length ? codes : plan.ziele.slice(0, 1)).map((code) => {
    const satz = zielSatz(k, p, code, sp)
    // „Gefühle - ich – Ich drücke …“ las sich wie ein Druckrest: mit Satz nur der erste Teil des Kurznamens
    const kurzName = eldibKurz(k, code, sp)
    return { code, text: satz ? `${kurzName.split(' - ')[0]} – ${satz}` : kurzName }
  })
  const phase = phasenName(s.phase, sp, p.alterJahre)
  const zeile =
    sp === 'fr'
      ? `Passgenau · ${plan.n > 1 ? `séance ${nr} sur ${plan.n} · ` : ''}${plan.dauer} min · ${phase}`
      : `Passgenau · ${plan.n > 1 ? `Sitzung ${nr} von ${plan.n} · ` : ''}${plan.dauer} Min. · ${phase}`
  // Hinweise, die nur in der Oberfläche etwas bedeuten (Knopf „Leichte Stunde zeigen“, Wahl des Blatts), nicht drucken
  const hinweise = (s.hinweise ?? []).filter((h) => !NUR_OBERFLAECHE.test(h)).map((h) => (sp === 'fr' ? hinweisFr(h) : h))
  const rollen = gruppenRollen(p, nr, sp)
  if (rollen) hinweise.unshift(rollen)
  if (p.vorsicht.includes('heikel') || (p.achtung ?? []).length)
    hinweise.unshift(
      p.alterJahre >= 12
        ? sp === 'fr' ? 'Un thème sensible est ouvert pour cette personne. Passgenau ne remplace pas une évaluation – voir le dossier.' : 'Für diese Person ist ein heikles Thema offen. Passgenau ersetzt keine Abklärung – Hinweise im Dossier.'
        : sp === 'fr' ? 'Un thème sensible est ouvert pour cet enfant. Passgenau ne remplace pas une évaluation – voir le dossier.' : 'Zu diesem Kind ist ein heikles Thema offen. Passgenau ersetzt keine Abklärung – Hinweise im Dossier.',
    )
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
    kinderblatt: s.blatt ? (p.gruppe?.length ? kinderblatt(k, mitgliedProfil(p, p.gruppe[0]), plan, nr, p.gruppe[0].sprache.blatt) : kinderblatt(k, p, plan, nr, sp)) : null,
    ...(s.blatt && (p.gruppe?.length ?? 0) > 1
      ? { weitereBlaetter: p.gruppe!.slice(1).map((m, i) => ({ name: m.vorname || `Kind ${i + 2}`, blatt: kinderblatt(k, mitgliedProfil(p, m), plan, nr, m.sprache.blatt), sprache: m.sprache.blatt })) }
      : {}),
    // C1/C2: höchstens eine Seite fürs Kind (A11) – gibt es ein Blatt, keine zusätzliche Kartenseite (die Stundenleiste
    // steht oben auf dem Blatt, die Wahl im Planblatt)
    karten: opt.karten && !(s.blatt && ['C1', 'C2'].includes(stufeAusAlter(p.alterJahre))) ? karten(k, p, plan, nr, sp) : null,
    materialSeite: matSeite,
    sprache: sp,
    warum: opt.warum,
    nr,
    n: plan.n,
    datei: `Passgenau-Sitzung-${nr}${sp === 'fr' ? '_FR' : ''}.pdf`,
    krisentag: plan.weg === 'leicht' || s.phase === 'leicht' || (plan.auftrag?.heute?.stimmung ?? 4) <= 2,
  }
}

/** Bausteinarten, die Druckmaterial sind (ausschneiden, legen, spielen) – nicht Aufgaben zum Ausfüllen */
const DRUCK_ARTEN = new Set(['karten', 'memory', 'suchbild', 'schneiden_kleben', 'bastelbogen', 'minibuch', 'faedelkarte', 'klappbild', 'anziehpuppe', 'laufweg', 'bilder'])

/** Pakete, die ein Schritt der Sitzung als Druckmaterial braucht (verknüpftes Blatt, T-M12) – ohne die, die schon auf dem
 *  Blatt des Kindes stehen; je Schritt höchstens zwei. */
export function druckPakete(k: Katalog, plan: Plan, nr: number): MikroBaustein[] {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return []
  setzeTextModus((plan.auftrag?.sozialform ?? 'einzeln') !== 'einzeln')
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
        // Spielkarten einer Gruppe („Werft einen Ball im Kreis“) nicht als Material der Einzelstunde drucken
        const bm = merkmaleVon(k, b)
        if ((!istGruppenText() && (bm.has('gruppe') || bm.has('ihr'))) || bm.has('fuerleitung') || bm.has('heikel')) continue
        out.set(id, b)
        if (++n >= 2) break
      }
    }
  return [...out.values()]
}

/** Materialseite zur Stunde: die Druckpakete als eigenes Blatt (gleiche Gestaltung wie ihr Quellblatt). */
export function materialSeite(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): Blatt | null {
  // für ein französisches Kind nur Material mit französischem Text (A6: keine deutsche Seite fürs Kind)
  const pakete = druckPakete(k, plan, nr).filter((b) => sprache !== 'fr' || b.sprache.fr || !b.textfelder.length)
  if (!pakete.length) return null
  const quelle = intern(k).q.blatt.get(pakete[0].quelle.blatt)
  const fr = sprache === 'fr'
  const bausteine = pakete.flatMap((b) => bausteinInhalt(k, b, fr ? 'fr' : 'de'))
  // E-M3 auch hier: kommt Material aus einem Blatt mit Hilfe-Zeile (oder ist ein heikles Thema offen), steht sie darunter
  if (pakete.some((b) => intern(k).notfallBlatt.has(b.quelle.blatt)) || p.vorsicht.includes('heikel') || (p.achtung ?? []).length) bausteine.push({ art: 'notfall' } as Baustein)
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
  // Jugendliche (Blind-Bewertung 7: „Spielen/Tschüss und ein Herz wirken für 14–17 Jahre jung“; „die Leiste sagt Spielen, auch
  // wenn ‚Einfach da sein‘ gewählt wird“): neutrale Wörter, die Wahl heißt Wahl
  const wort = (x: (typeof s.schritte)[number]) =>
    x.wahl?.length ? { de: 'Wählen', fr: 'Choisir', bild: 'icon:arrow-fork' }
    : jugend && x.rolle === 'spiel' ? { de: 'Aktivität', fr: 'Activité', bild: 'icon:sparkles' }
    : jugend && x.rolle === 'abschluss' ? { de: 'Schluss', fr: 'Fin', bild: 'icon:door-exit' }
    : WORT[x.rolle]
  const leiste = s.schritte.slice(0, 7).map((x) => ({ text: wort(x)[sprache], bild: wort(x).bild, min: x.min }))
  if (leiste.length >= 2) bausteine.push({ art: 'stundenleiste', schritte: leiste })
  const ritual = k.eintraege.get(s.schritte.find((x) => x.rolle === 'ankommen')?.ref ?? '')
  const anspruch = ritual?.anspruch ?? 1
  // ist das Ankommens-Ritual selbst schon ein Check-in (Gefühlstiere, Wetter, Zahl), keine zweite Karte dafür
  const ritualText = ritual ? textVon(ritual, 'de').titel + ' ' + textVon(ritual, 'de').text : ''
  const selbstCheckin = /(gefühl|wie geht|stimmung|wetter|heute zu (ihm|ihr|dir) passt|zahl von|skala|daumen)/i.test(ritualText)
  // in Krisenlage keine Gefühle abfragen (A12): Stimmung ≤ 2, Weg 3 mit belastender Tagesform, Vorsicht Trauma/Trauer
  const krise = (plan.auftrag?.heute?.stimmung ?? 4) <= 2 || p.vorsicht.includes('trauma') || p.vorsicht.includes('trauer') ||
    (plan.weg === 'leicht' && (plan.auftrag?.tagesformen ?? []).some((t) => ['traurig', 'aengstlich', 'rueckzug', 'aufgewuehlt', 'wuetend'].includes(t)))
  if (anspruch >= 1 && !selbstCheckin && !krise) bausteine.push({ art: 'checkin', modus: jugend ? 'zahl' : alter <= 7 ? 'gesichter' : 'wetter' })
  const wahl = s.schritte.find((x) => x.wahl?.length)
  if (wahl) {
    const optionen = [wahl, ...(wahl.wahl ?? [])].slice(0, 3).map((w) => {
      const e = k.eintraege.get(w.ref)
      const t = w.ref === 'pg:blatt' ? (sprache === 'fr' ? 'Page à colorier' : 'Mitmach-Seite') : e ? textVon(e, sprache).titel : (('t' in w && w.t) || w.ref)
      const f = e?.format[0]
      const bild = w.ref === 'pg:blatt' ? 'icon:pencil' : f === 'bewegung' ? 'icon:run' : f === 'malen' ? 'icon:palette' : f === 'musik' ? 'icon:music' : f === 'spiel' ? 'icon:dice-5' : f === 'basteln' ? 'icon:puzzle' : f === 'sinne' || f === 'atmen' ? 'icon:leaf' : 'icon:armchair'
      return { text: kurzLabel(t), bild, min: w.min }
    })
    // „Heute möchte ich zuerst …“ deutete eine Reihenfolge an – gewählt wird eines (Blind-Bewertung 7)
    bausteine.push({ art: 'wahlkarte', frage: sprache === 'fr' ? 'Aujourd’hui, je choisis :' : 'Heute wähle ich:', optionen })
  }
  // keine Wochenziel-Karte mehr (Blind-Bewertung 9.10., A9): der Ich-Satz des Förderziels gehört nicht aufs Papier des Kindes
  if (bausteine.length < 2) return null
  const kb = s.blatt ? kinderblatt(k, p, plan, nr, sprache) : null
  const titel = sprache === 'fr' ? 'Cartes pour la séance' : 'Karten zur Stunde'
  // keine Anweisung für Erwachsene auf dem Papier des Kindes (A3) – „ausschneiden“ steht im Planblatt
  const inhalt = { titel, bausteine, lehrer: { ziel: '', ablauf: [], hintergrund: '' } }
  return {
    id: `pg-karten-${hash8(plan.id + nr)}`,
    // ohne Blatt: Jugendliche nicht unter dem Herz der Gefühle, sondern neutral
    bereich: kb?.bereich ?? (jugend ? 'selbstreflexion' : 'gefuehle'),
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
      return { nr: s.nr, phase: phasenName(s.phase, opt.sprache, p.alterJahre), kern: e ? textVon(e, opt.sprache).titel : (kern?.t ?? '') }
    }),
    material,
    datei: `Passgenau-Folge${opt.sprache === 'fr' ? '_FR' : ''}.pdf`,
    sprache: opt.sprache,
  }
}
