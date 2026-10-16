// Passgenau – Druckdaten (7.5): alles, was das PDF braucht, als reine Daten. Der PDF-Teil (src/passgenau/pdf) kennt
// keinen Katalog – so landen Blätter und Metadaten nicht ein zweites Mal im PDF-Modul. Datenschutz (9.6 Punkt 3, E-M13):
// auf dem Planblatt Vorname, Codes und Quelle-Art, aber keine Daten von Vorfällen oder Notizen; Begründungen nur auf Wunsch.
import type { Baustein, Blatt } from '../../blatt/typen'
import HINTERGRUND from '../../data/passgenau/kurs-hintergrund.json'
import type { KatalogEintrag, MikroBaustein, Plan, PlanSchritt, Profil, Rolle, Sprache } from '../typen'
import { bausteinInhalt, eldibKurz, intern, istGruppenText, kindSatz, merkmaleVon, quelleText, setzeTextModus, staemme, textVon, zielSatz, type Katalog } from './katalog'
import { textMerkmale } from './einzel'
import { kinderblatt, quellenDerUebertragung, werkzeugName } from './blatt'
import { gruppenRollen, mitgliedProfil } from './gruppe'
import { BOGEN_NAME, KURSVERWEIS_RE, NUR_DEUTSCH, ROLLE_NAME, kompetenzAusCode } from './vokabular'
import { hash8, SATZ_GRENZE_GROSS, stufeAusAlter, ohneEigenenNamen } from './hilfen'
import { BLATT_SYSTEM } from './system'

export interface DruckSchritt {
  min: number
  rolle: string
  titel: string
  /** eine Zeile für „Auf einen Blick“ (Spickzettel) */
  kurz?: string
  text: string
  sagen: string[]
  wennEsKippt?: string
  /** Im Spiel üben (Rahmen-Schritt 16.10.): wie das Werkzeug der Kern-Übung ein-, zweimal in diesen Bewegungs- oder Spielblock kommt */
  imSpiel?: string
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
  /** „Auf einen Blick“ (Rückmeldung einer Fachkraft 10.10.: „zu viel Text“): Ziel in einem Satz, Werkzeug der Übung und ein
   *  fertiger erster Satz für den Einstieg */
  ziel?: string
  werkzeug?: string
  einstieg?: string
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
  /** alle Ziele, die eine Sitzung der Folge übt (Blind-Bewertung 9: „das Titelblatt nennt nur ein Ziel“) */
  ziele: { code: string; text: string }[]
  /** Lernpfad (Stufe 4): worauf die Kerne der Folge hinauslaufen – nur, wenn mindestens zwei aus derselben Reihe kommen */
  faden?: string
  /** Einzelkurs: Hintergrund für die Fachkraft – warum es wirkt, worauf achten, Quellen (Referenzmessung 16.10.: „Hintergrund,
   *  Quellen und Achtung-Hinweise fehlen im Vergleich zum Skills-Kurs“) */
  hintergrund?: { warum: string; achtung: string[]; quellen: string[] }
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
  [/(?<!\p{L})(Ball|Bälle|balle)(?!\p{L})/iu, 'ball'],
  [/(?<!\p{L})(Tücher|Tuch)(?!\p{L})|foulard/iu, 'tuecher'],
  [/Knete|pâte à modeler/i, 'knete'],
  [/Klangschale|bol chantant/i, 'klangschale'],
  [/Sanduhr|Timer|sablier|minuteur/i, 'sanduhr'],
  [/(?<!\p{L})(Spiegel|miroir)(?!\p{L})/iu, 'spiegel'],
  [/etwas zu trinken|Getränk|à boire|boisson/i, { de: 'etwas zu trinken', fr: 'de quoi boire' }],
  [/Knetball|balle anti-stress|balle à malaxer/i, { de: 'Knetball', fr: 'balle anti-stress' }],
  [/\bLineal\b|\bune règle pour tracer\b/i, { de: 'Lineal', fr: 'règle' }],
  [/Bauklötze|Bausteine aus Holz|cubes/i, 'bausteine'],
  [/Wetterkarte|carte météo/i, { de: 'Wetterkarte (Sonne, Wolke, Regen, Gewitter)', fr: 'carte météo (soleil, nuage, pluie, orage)' }],
  [/Sticker|Aufkleber|autocollant/i, { de: 'Sticker', fr: 'autocollants' }],
  [/(?<!\p{L})Decke(?!\p{L})|couverture/iu, { de: 'Decke', fr: 'couverture' }],
  [/Kreppband|Klebeband|ruban adhésif/i, { de: 'Kreppband', fr: 'ruban adhésif' }],
  [/Schachtel|(?<!\p{L})Karton(?!\p{L})|(?<!\p{L})boîte(?!\p{L})/iu, { de: 'Schachtel', fr: 'boîte' }],
  [/Stofftier|peluche/i, { de: 'Stofftier', fr: 'peluche' }],
  [/(?<!\p{L})(Glas|Gläser|bocal)(?!\p{L})/iu, { de: 'Glas', fr: 'bocal' }],
  // nicht „Bausteine“, „Meilensteine“, „Fußball“ (Blind-Bewertung 9: „kleine Steine“ bei 3-Jährigen, nie gebraucht)
  // … und nicht „Dran-Stein“, „Stärken-Stein“ (Wortteil nach Bindestrich), nicht „Pierre“ als Name
  [/(?<![\p{L}-])(Steine?|pierres)(?![\p{L}-])|(?<![\p{L}-])(une|la|des|les|petites?) pierres?(?![\p{L}-])/u, { de: 'kleine Steine', fr: 'petites pierres' }],
  [/Seifenblasen|bulles de savon/i, { de: 'Seifenblasen', fr: 'bulles de savon' }],
  [/Luftballon|ballon de baudruche/i, { de: 'Luftballon', fr: 'ballon de baudruche' }],
  [/Strohhalm|paille/i, { de: 'Strohhalme', fr: 'pailles' }],
  [/Wäscheklammer|pince à linge/i, { de: 'Wäscheklammern', fr: 'pinces à linge' }],
  // Rahmen-Schritt 16.10. (Messung 5: „Topfdeckel, Taschenlampe, Gehörschutz fehlen im Material“, „drei Figuren-Karten, aber
  // nichts vorzubereiten“, „der Becher fehlt“, „Büroklammern in keiner Liste“): Gegenstände ganzer Wörter, keine Möbel; nicht
  // „murmelt“, „klingelt“, „Papierstreifen“ (Reifen), „Trommelwirbel“ auf dem Tisch, „Lichtkegel“, „ohne Musik“
  [/[Dd]eckeln?(?!\p{L})|couvercles?/u, { de: 'Topfdeckel', fr: 'couvercles' }],
  [/Taschenlampe|lampe de poche/i, { de: 'Taschenlampe', fr: 'lampe de poche' }],
  [/Gehörschutz|protections? auditives?|casque anti-bruit/i, { de: 'Gehörschutz', fr: 'protections auditives' }],
  [/Figuren-?[Kk]arten|Bildkarten|cartes?[- ]images?|cartes?[- ]personnages?/u, { de: 'Bildkarten', fr: 'cartes-images' }],
  [/(?<![\p{L}-])(Karten|Karte|Kärtchen|Karteikarten|cartes?)(?![\p{L}-])/u, 'karten'],
  [/(?<!\p{L})(Becher|gobelets?)(?!\p{L})/u, { de: 'Becher', fr: 'gobelets' }],
  [/(?<!\p{L})(Zettel|Klebezettel|post-it|petits papiers)(?!\p{L})/iu, { de: 'Zettel', fr: 'petits papiers' }],
  [/(?<!\p{L})(Kegel|Hütchen|quilles?|plots?)(?!\p{L})/u, { de: 'Kegel oder Hütchen', fr: 'quilles ou plots' }],
  [/(?<!\p{L})Trommel(n)?(?!\p{L})|(?<!roulement de )tambour(?!\p{L})/u, { de: 'Trommel (oder ein Topf)', fr: 'tambour (ou une casserole)' }],
  [/(?<!\p{L})(Korb|Körbchen|panier)(?!\p{L})/u, { de: 'Korb', fr: 'panier' }],
  [/(?<!(ohne|sans|sans la) )(?<!\p{L})(Musik|musique)(?!\p{L})/u, 'musik'],
  [/(?<!\p{L})(Reifen|cerceaux?)(?!\p{L})/u, { de: 'Reifen', fr: 'cerceaux' }],
  [/(?<!\p{L})(Spielfiguren?|Holzfiguren?|Figuren)(?![\p{L}-])|figurines?/u, { de: 'kleine Figuren', fr: 'petites figurines' }],
  [/(?<!\p{L})(Kissen|coussins?)(?!\p{L})/u, { de: 'Kissen', fr: 'coussin' }],
  [/(?<!\p{L})(Glocke|Glöckchen|Klingel|clochette|grelot)(?!\p{L})/u, { de: 'Glöckchen', fr: 'clochette' }],
  [/(?<!\p{L})(Murmeln|billes)(?!\p{L})/u, { de: 'Murmeln', fr: 'billes' }],
  [/(?<!\p{L})(Löffel|cuillères?)(?!\p{L})/u, { de: 'Löffel', fr: 'cuillère' }],
  [/Büroklammer|trombones?/u, { de: 'Büroklammern', fr: 'trombones' }],
  [/(?<!\p{L})(Seil|Springseil|corde)(?!\p{L})/u, 'seil'],
  [/(?<!\p{L})(Schere|ciseaux)(?!\p{L})/u, 'schere'],
  [/(?<!\p{L})(Papier\p{L}*|feuilles? de papier|papier)(?!\p{L})/u, 'papier'],
]

export function materialName(k: Katalog, m: string, sprache: Sprache): string {
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

/** „Der oder die Jugendliche“, „er oder sie“ → Name (Planblatt für eine Person). „Die Person“ / « la personne » nicht:
 *  in den Inhalten meint es inzwischen fast nur andere oder erfundene Personen („Die Fachkraft spielt die Person“). */
function mitName(t: string, name: string, sp: Sprache): string {
  if (sp === 'fr') {
    const de = /^[aeiouyéèêàâîôûh]/i.test(name) ? `d’${name}` : `de ${name}`
    const vokal = /^[aeiouyéèêàâîôûh]/i.test(name)
    return t
      // „ce qu’il ou elle voit“ → „ce que Dario voit“ (Blind-Bewertung 13: „ce qu’Dario“)
      .replace(/\b(qu|lorsqu|puisqu)['’](il ou elle|le ou la jeune)\b/g, (_m, q: string) => (vokal ? `${q}’${name}` : `${q}e ${name}`))
      .replace(/\bdu ou de la jeune\b/g, de)
      .replace(/\bau ou à la jeune\b/g, `à ${name}`)
      .replace(/\b([Ss])['’]il ou elle\b/g, (_m, s: string) => `${s}i ${name}`)
      .replace(/\b[Ll]e ou la jeune\b/g, name)
      .replace(/\b[Ii]l ou elle\b/g, name)
  }
  return t
    .replace(/\b[Dd](er oder die|en oder die) Jugendliche\b/g, name)
    .replace(/\b[Dd]em oder der Jugendlichen\b/g, name)
    .replace(/\b[Ee]r oder sie\b/g, name)
    .replace(/\b[Ii]hm oder ihr\b/g, name)
}

/** Der eigene Themensatz eines Rahmenteils („Heute geht es ums Dranbleiben.“, „Zum Schluss etwas zu Konflikten:“) – fällt im
 *  Stunden-Faden weg, der Rest bleibt. null: kein Themensatz. */
const THEMA_SATZ_RE = /^(Heute (geht|ging) es (um|ums|darum)\b[^.!?:]*[.!?:]|Heute üben wir\b[^.!?:]*[.!?:]|Aujourd’hui, on (parle|s’intéresse|a parlé|apprend|voit|fait|va)\b[^.!?:]*[.!?:])\s*/
const RAHMEN_PRAEFIX_RE = /^(Zum (Anfang|Ankommen|Start|Schluss|Abschluss)) (noch )?(etwas|ein(en|e)? [\wäöüß-]+) (zu|zum|zur|für|über) [^:]+:\s*/
const RAHMEN_PRAEFIX_FR_RE = /^(Pour (commencer|finir|terminer)),? (encore )?quelque chose (sur|pour|autour de) [^:]+ :\s*/
function ohneThemensatz(t: string): string | null {
  if (!THEMA_SATZ_RE.test(t) && !RAHMEN_PRAEFIX_RE.test(t) && !RAHMEN_PRAEFIX_FR_RE.test(t)) return null
  const r = t.replace(THEMA_SATZ_RE, '').replace(RAHMEN_PRAEFIX_RE, (_m, a: string) => `${a}: `).replace(RAHMEN_PRAEFIX_FR_RE, (_m, a: string) => `${a} : `).trim()
  return r ? r.charAt(0).toUpperCase() + r.slice(1) : ''
}

/** Sätze mit einer Diagnose als Beispiel weglassen (Blind-Bewertung 8: „im Autismus-Spektrum“ ohne Anlass im Planblatt). */
function ohneDiagnose(t: string | undefined): string | undefined {
  if (!t || !textMerkmale(t).has('diagnose')) return t
  const rest = t.split(/(?<=[.!?])\s+/).filter((x) => !textMerkmale(x).has('diagnose')).join(' ').trim()
  return rest || undefined
}

/** Kurzzeilen der eigenen Schritte (Spickzettel) */
const PG_KURZ: Record<string, Record<Sprache, string>> = {
  'pg:einstieg': { de: 'Den Satz oben sagen · ein Beispiel aus dem Alltag', fr: 'Dire la phrase ci-dessus · un exemple du quotidien' },
  'pg:blatt': { de: 'Blatt zur Übung · allein, mit Hilfe auf Nachfrage', fr: 'Fiche de l’exercice · seul, aide sur demande' },
  'pg:pause': { de: 'Kurz aufstehen und bewegen', fr: 'Se lever et bouger un peu' },
  'pg:uebertragen': { de: 'Geübtes auf eine kommende Situation übertragen', fr: 'Transférer à une situation qui arrive' },
  'pg:folge-transfer': { de: 'Rückblick auf die Folge · mitnehmen, was hilft', fr: 'Retour sur la série · garder ce qui aide' },
}
/** erster Satz, höchstens n Zeichen (an einer Wortgrenze gekürzt) */
function ersterSatz(t: string, n: number): string | undefined {
  const s = (t || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+(?=[A-ZÄÖÜÀ-Ý„«])/)[0] ?? ''
  if (!s) return undefined
  if (s.length <= n) return s.replace(/[.]$/, '')
  // lieber an einer Satzteilgrenze (Komma, Doppelpunkt, Gedankenstrich) als mitten in einer Klammer oder Aufzählung
  const teil = Math.max(s.lastIndexOf(', ', n - 2), s.lastIndexOf(': ', n - 2), s.lastIndexOf(' – ', n - 2), s.lastIndexOf('; ', n - 2))
  const ende = teil > n * 0.55 ? teil : s.lastIndexOf(' ', n - 1)
  return s.slice(0, ende).replace(/[,;:–-]+$/, '').trim() + ' …'
}
/** Ziel der Stunde je Kompetenz: kurz (für die Fachkraft) und als Satzteil „Heute geht es darum, …“ (fürs Kind) */
const ZIEL_FELD: Record<string, { de: string; fr: string; satz: { de: string; fr: string } }> = {
  'gefuehle-erkennen': { de: 'Gefühle bei sich und anderen erkennen', fr: 'Reconnaître les émotions chez soi et chez les autres', satz: { de: 'Gefühle zu erkennen – bei dir und bei anderen', fr: 'reconnaître les émotions – chez toi et chez les autres' } },
  'gefuehle-ausdruecken': { de: 'Gefühle in Worte fassen', fr: 'Mettre des mots sur ses émotions', satz: { de: 'Gefühle in Worte zu fassen', fr: 'mettre des mots sur ce que tu ressens' } },
  selbstregulation: { de: 'Merken, wenn es zu viel wird, und wieder ruhig werden', fr: 'Remarquer quand c’est trop et retrouver le calme', satz: { de: 'zu merken, wenn es zu viel wird, und wieder ruhig zu werden', fr: 'remarquer quand c’est trop et retrouver le calme' } },
  impulskontrolle: { de: 'Kurz stoppen, bevor man handelt', fr: 'S’arrêter un instant avant d’agir', satz: { de: 'kurz zu stoppen, bevor du handelst', fr: 't’arrêter un instant avant d’agir' } },
  aufmerksamkeit: { de: 'Genau hinschauen und bei einer Sache bleiben', fr: 'Bien regarder et rester sur une chose', satz: { de: 'genau hinzuschauen und bei einer Sache zu bleiben', fr: 'bien regarder et rester sur une chose' } },
  ausdauer: { de: 'Dranbleiben, auch wenn es schwer wird', fr: 'Tenir bon, même quand c’est difficile', satz: { de: 'dranzubleiben, auch wenn es schwer wird', fr: 'tenir bon, même quand c’est difficile' } },
  kooperation: { de: 'Mit anderen zusammenarbeiten und sich absprechen', fr: 'Coopérer et se mettre d’accord', satz: { de: 'gut mit anderen zusammenzuarbeiten', fr: 'bien faire les choses ensemble' } },
  konflikte: { de: 'Streit erkennen und fair lösen', fr: 'Reconnaître un conflit et le régler de façon juste', satz: { de: 'Streit fair zu lösen', fr: 'régler un conflit de façon juste' } },
  kommunikation: { de: 'Ins Gespräch kommen, zuhören und sich verständlich machen', fr: 'Entrer en conversation, écouter et se faire comprendre', satz: { de: 'gut ins Gespräch zu kommen und zuzuhören', fr: 'bien entrer en conversation et écouter' } },
  selbstbild: { de: 'Eigene Stärken kennen und benennen', fr: 'Connaître et nommer ses forces', satz: { de: 'zu sehen, was du schon gut kannst', fr: 'voir ce que tu sais déjà bien faire' } },
  lernstrategien: { de: 'Wege finden, wie Lernen besser klappt', fr: 'Trouver comment mieux apprendre', satz: { de: 'Wege zu finden, wie Lernen besser klappt', fr: 'trouver comment mieux apprendre' } },
  alltag: { de: 'Alltagsabläufe selbstständiger schaffen', fr: 'Réussir seul des gestes du quotidien', satz: { de: 'Dinge im Alltag selbst zu schaffen', fr: 'réussir seul des choses du quotidien' } },
}
/** Kompetenz der Stunde: gewählter Schwerpunkt („kompetenz:Kommunikation“), sonst das Feld des ersten Ziels, sonst des Kerns */
function feldDerStunde(plan: Plan, kern: KatalogEintrag | undefined): string | undefined {
  for (const c of [...plan.ziele, ...(plan.auftrag?.thema ?? [])]) {
    if (c.startsWith('kompetenz:')) {
      const n = c.slice(10).toLowerCase().split('/')[0].trim().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/\s+/g, '-')
      if (ZIEL_FELD[n]) return n
    } else if (/^[A-Z]+-\d+$/.test(c)) {
      const f = kompetenzAusCode(c)
      if (ZIEL_FELD[f]) return f
    }
  }
  return kern?.kompetenz.find((x) => ZIEL_FELD[x])
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
  // Grundgerüst: jeder Kern endet damit, dass das Werkzeug einen Namen bekommt – Übertragen, Blatt und Rückblick nennen ihn
  // später (Blind-Bewertung 13: „Anderes-Ende-Trick“ stand im Übertragen und auf dem Blatt, das Kind hatte ihn nie gehört)
  const w = x.rolle === 'kern' && e.typ === 'schritt' ? e.werkzeug?.[sprache] : undefined
  if (w && !x.ref.startsWith('pg:')) {
    const name = w.split(/\s*[:(–]\s*/)[0].replace(/^[„“"«»\s]+|[„“"«»\s]+$/g, '').toLowerCase()
    const schon = name.length > 2 && `${d.text} ${d.sagen.join(' ')}`.toLowerCase().includes(name)
    const zit = /[„“«»]/.test(w) ? w : sprache === 'fr' ? `« ${w} »` : `„${w}“`
    // Übungen für die Kleinsten (bis 6): nachsprechen oder zeigen statt „mit eigenen Worten“ (Blind-Bewertung 13)
    const klein = e.alter.bis <= 6
    // nicht zweimal „Zum Schluss“ (Messung 4)
    const auch = /\b(Zum Schluss|Pour finir)\b/.test(d.text)
    if (!schon)
      d.text += sprache === 'fr'
        ? ` ${auch ? 'Tout à la fin' : 'Pour finir'}, l’adulte donne un nom à ce qu’on vient de faire : ${zit}${jugend ? '.' : klein ? ' – l’enfant peut le répéter ou le montrer.' : ' – et l’enfant le redit avec ses mots.'}`
        : ` ${auch ? 'Ganz am Ende' : 'Zum Schluss'} gibt die Fachkraft dem Geübten einen Namen: ${zit}${jugend ? '.' : klein ? ' – das Kind darf es nachsprechen oder zeigen.' : ' – und das Kind sagt es mit eigenen Worten nach.'}`
  }
  // Zeit (Blind-Bewertung 13: „drei Balance-Posen erfinden, benennen, halten, wechseln – in 2 Minuten“): hat der Schritt deutlich
  // weniger Minuten, als die Übung braucht, darf die Fachkraft kürzen – das steht dabei
  if (e.typ === 'schritt' && !x.ref.startsWith('pg:') && x.rolle !== 'ankommen' && x.rolle !== 'abschluss' && !x.wahl?.length && x.min > 0 && x.min < e.dauer.typ - 1)
    d.text += sprache === 'fr' ? ` Aujourd’hui en bref (${x.min} min) : la première partie suffit.` : ` Heute knapp (${x.min} Min.): Der erste Teil reicht.`
  // eigene Schritte haben eine feste Zeile (auch mit eingesetztem Text); ein überschriebener Text verdrängt die Zeile des Bausteins
  // Themen-Einstieg mit Anknüpfen: die Spickzettel-Zeile der Übung, nicht der Anknüpf-Satz (Blind-Bewertung 13)
  const kz = PG_KURZ[x.ref]?.[sprache] ?? ((ueberText && !x.ref.startsWith('th:')) || x.wahl?.length ? undefined : e.typ === 'schritt' ? (sprache === 'fr' ? e.fr?.kurz : e.kurz) : undefined)
  // Einzelkurs: die Werkzeug-Zeile der Sitzung ist schon ein Einzeiler (Referenzmessung 16.10.: „Auf einen Blick“ brach den
  // ersten Satz mitten im Satzteil ab)
  const kursZeile = e.typ === 'schritt' && e.linie?.id.startsWith('kurs-') && x.rolle === 'kern' ? e.werkzeug?.[sprache] : undefined
  d.kurz = kz ?? kursZeile ?? ersterSatz(d.text, 80)
  // Blind-Bewertung 9.10.: Optionen ohne Anleitung („Carte au trésor“ – und dann?) – jede Option mit einem Satz
  // Blind-Bewertung 8: die Beschreibung der ersten Option stand unter den anderen – jede Option trägt ihren Satz selbst,
  // der Schritt heißt neutral „Zur Wahl“
  if (x.wahl?.length) {
    d.titel = sprache === 'fr' ? 'Une activité au choix' : 'Eine Aktivität zur Wahl'
    d.text = ''
    // Sagen und „Wenn es kippt“ gelten für die Wahl, nicht nur für die erste Option (Blind-Bewertung 9: „nur die erste
    // Option hat Sagen- und Wenn-es-kippt-Zeilen“)
    d.sagen = [sprache === 'fr' ? 'Aujourd’hui, tu choisis. Qu’est-ce qui te fait envie ?' : 'Heute wählst du. Worauf hast du Lust?']
    d.wennEsKippt = sprache === 'fr' ? 'Si le choix est difficile, l’adulte en propose une ; « simplement être là » est toujours permis.' : 'Fällt die Wahl schwer, schlägt die Fachkraft eine vor; „einfach da sein“ ist immer erlaubt.'
  }
  if (x.wahl?.length)
    d.wahl = [
      { titel: t.titel, min: x.min, ...(kuerzen(textVon(e, sprache).text.replace(/\n+/g, ' '), 170) ? { kurz: kuerzen(textVon(e, sprache).text.replace(/\n+/g, ' '), 170)! } : {}) },
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

/** Im Spiel üben (Rahmen-Schritt 16.10.): der erste Bewegungs- oder Spielblock ab 3 Minuten nimmt das Werkzeug der Kern-Übung
 *  ein-, zweimal mit – beim Übertragen das der übertragenen Übung, im Rückblick das der zuletzt geübten; nur in der
 *  Einzelstunde (der Satz spricht von einem Kind), nicht in Atem- und Ruheübungen (die bleiben ruhig) und nicht, wenn der
 *  Block selbst schon dieses Ziel übt. */
export function imSpielStelle(k: Katalog, plan: Plan, nr: number): { i: number; text: { de: string; fr: string } } | null {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const kernX = s?.schritte.find((x) => x.rolle === 'kern')
  if (!s || !kernX || (plan.auftrag?.sozialform ?? 'einzeln') !== 'einzeln') return null
  const quelle = kernX.ref === 'pg:uebertragen' ? quellenDerUebertragung(k, plan, kernX)[0]
    : kernX.ref === 'pg:folge-transfer'
      ? plan.sitzungen.filter((y) => y.nr < nr).flatMap((y) => y.schritte.filter((z) => z.rolle === 'kern').map((z) => k.eintraege.get(z.ref))).reverse().find((e) => e?.typ === 'schritt' && !!e.imSpiel)
      : k.eintraege.get(kernX.ref)
  if (quelle?.typ !== 'schritt' || !quelle.imSpiel?.de || !quelle.imSpiel.fr) return null
  const codes = new Set(quelle.eldib.filter((x) => x.gewicht === 1).map((x) => x.code))
  const i = s.schritte.findIndex((x) => (x.rolle === 'bewegung' || x.rolle === 'spiel') && x.min >= 3 && x.ref !== 'pg:blatt' && x.ref !== 'pg:da-sein' && !(k.eintraege.get(x.ref)?.format ?? []).includes('atmen') && !(k.eintraege.get(x.ref)?.eldib ?? []).some((z) => codes.has(z.code)))
  return i >= 0 ? { i, text: { de: quelle.imSpiel.de.trim(), fr: quelle.imSpiel.fr.trim() } } : null
}

/** Druckdaten einer Sitzung. */
export function druckSitzung(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten?: boolean }): DruckSitzung {
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const sp = opt.sprache
  setzeTextModus((plan.auftrag?.sozialform ?? 'einzeln') !== 'einzeln')
  // Figuren mit dem Vornamen des Kindes heißen anders (Blind-Bewertung 9: „Mia ist ärgerlich“ für Mia) – vor mitName
  const schritte = s.schritte.map((x) => ohneEigenenNamen(druckSchritt(k, x, sp, opt.warum, s.blatt?.titel, p.alterJahre >= 12), p.gruppe?.length ? null : p.vorname))
  // mit Namen (Blind-Bewertung 8: „‚der oder die Jugendliche‘ statt Elif“, „‚le ou la jeune / il ou elle‘ für einen
  // namentlich bekannten Jungen“, „la personne“ bei einem Elfjährigen) – nur für eine Person, nicht in der Gruppe
  const name = !p.gruppe?.length ? (p.anrede ?? p.vorname ?? '').trim() : ''
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
    // Ritual einer Folge ab Sitzung 2: sein Material „von Sitzung 1“ (Messung 6: „S2–S4 ‚nichts vorzubereiten‘, obwohl das
    // Ankommen die Tierkarten aus S1 braucht“)
    if ((x.rolle === 'ankommen' || x.rolle === 'abschluss') && nr > 1 && plan.n > 1) {
      const rtx = e.typ === 'schritt' ? (e.einzelvariante?.text ?? e.text) : ''
      const rm = new Set(e.material.map((m) => materialName(k, m, sp)))
      for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(rtx)) rm.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
      for (const m of rm) mat.add(sp === 'fr' ? `${m} (de la séance 1)` : `${m} (von Sitzung 1)`)
      continue
    }
    for (const m of e.material) mat.add(materialName(k, m, sp))
    // was der Text nennt, kommt dazu (Ritual-Material einer Folge nur in Sitzung 1, wie oben); nur der Text, nicht der Titel
    // („Miroir d’improvisation“ braucht keinen Spiegel), und nicht bei Übertragen/Rückblick – dort stehen nur die Titel
    // anderer Übungen („Übertragen: Der Würfel schlägt vor“ braucht keinen Würfel; Blind-Bewertung 7)
    const tx = e.typ === 'schritt' && x.ref !== 'pg:uebertragen' && x.ref !== 'pg:folge-transfer' ? (x.ueber?.text ?? e.einzelvariante?.text ?? e.text) : ''
    for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(tx)) mat.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
    // Übertragen und Rückblick bringen ihr Material selbst mit (Blind-Bewertung 9: „Figur und Bilder stehen nicht im Material“,
    // „der Rückblick lässt Übungen wiederholen, deren Material fehlt“, „Feier ohne Sticker“)
    // ab 10 ohne Figur (Blind-Bewertung 10: „Spiel mit Stofftier/Figur kindlich“ bei 11 Jahren)
    if (x.ref === 'pg:uebertragen' && p.alterJahre < 10) mat.add(sp === 'fr' ? 'une petite figurine ou une peluche' : 'eine kleine Figur oder ein Stofftier')
    if (x.ref === 'pg:folge-transfer') {
      if (p.alterJahre < 12) {
        // das Material der früheren Kerne beim Namen (Blind-Bewertung 10: „Material der gewählten Übung“ als Platzhalter)
        const frueher = plan.sitzungen.filter((y) => y.nr < nr).flatMap((y) => y.schritte.filter((z) => z.rolle === 'kern' && !z.ref.startsWith('pg:')).map((z) => k.eintraege.get(z.ref)))
        const zeug = [...new Set(frueher.flatMap((y) => (y ? y.material.map((m) => materialName(k, m, sp)) : [])))].filter((m) => !/^(Stifte|crayons|Papier|papier)$/.test(m)).slice(0, 6)
        if (zeug.length) mat.add(sp === 'fr' ? `pour refaire une activité, au choix : ${zeug.join(', ')}` : `zum Wiederholen, je nach Wahl: ${zeug.join(', ')}`)
        mat.add(sp === 'fr' ? 'autocollants ou étoiles, une petite carte' : 'Sticker oder Sterne, eine kleine Karte')
      } else mat.add(sp === 'fr' ? 'petits papiers pour les titres (ou les fiches de la série)' : 'Zettel für die Titel (oder die Blätter der Folge)')
      // (Blind-Bewertung 13: „Zettel mit dem Titel“ im Text, „nichts vorzubereiten“ im Kasten)
      vorbereitung.add(p.alterJahre < 6
        ? sp === 'fr' ? 'Poser un objet de chaque activité de la série ; garder le matériel à portée.' : 'Je ein Ding aus jeder Übung der Folge hinlegen; das Material griffbereit halten.'
        : sp === 'fr' ? 'Écrire le titre de chaque activité de la série sur un papier (ou reprendre les fiches) ; garder à portée le matériel des activités.' : 'Den Titel jeder Übung der Folge auf einen Zettel schreiben (oder die Blätter der Folge nehmen); das Material der Übungen griffbereit legen.')
    }
    // Optionen einer Wahl bringen ihr Material mit („Einfach da sein“: Getränk, Knetball, Tuch)
    for (const w of x.wahl ?? []) {
      const we = k.eintraege.get(w.ref)
      if (!we || we.typ !== 'schritt') continue
      for (const m of we.material) mat.add(materialName(k, m, sp))
      for (const [re, wer] of MATERIAL_IM_TEXT) if (re.test(we.text)) mat.add(typeof wer === 'string' ? materialName(k, wer, sp) : wer[sp])
    }
    if (e.typ === 'schritt' && !e.id.startsWith('s:')) {
      // Förderfach auf Französisch: die französische Vorbereitung der Einheit (deutsche nur, wo es keine Fassung gibt)
      // … und ebenso jede übersetzte Übung (Jugend, Kinder, fr-kern; R9: „fr.vorbereitung wird nicht gelesen“)
      const v = sp === 'fr' && e.fr?.vorbereitung ? e.fr.vorbereitung : e.vorbereitung
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
    // was der Text nennt, steht oft schon genauer da („Karten“ neben „Bildkarten“, „Ball“ neben „weicher Ball“)
    const liste = [...mat]
    for (const m of liste) {
      const kurz = m.trim().toLowerCase()
      if (kurz.length >= 4 && liste.some((n) => n !== m && mat.has(n) && n.toLowerCase().includes(kurz))) mat.delete(m)
    }
  }
  const matSeite = materialSeite(k, p, plan, nr, sp)
  // C1/C2: höchstens eine Seite fürs Kind (A11) – gibt es ein Blatt, keine zusätzliche Kartenseite (die Stundenleiste
  // steht oben auf dem Blatt, die Wahl im Planblatt)
  const kartenSeite = opt.karten && !(s.blatt && ['C1', 'C2'].includes(stufeAusAlter(p.alterJahre))) ? karten(k, p, plan, nr, sp) : null
  // die Karten stehen im Material und sagen, wann sie dran sind (Blind-Bewertung 8: „Karten-Seite im Ablauf nicht erwähnt“)
  if (kartenSeite) mat.add(sp === 'fr' ? 'les cartes de la séance (imprimées) – montrer la frise au début' : 'die Karten zur Stunde (gedruckt) – die Stundenleiste zu Beginn zeigen')
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
      // … mit dem Hinweis, dass der Teil schon auf dem Blatt steht (Blind-Bewertung 10: „verweist auf ein Blatt, das nicht zur Stunde
      // gehört“)
      return { titel: textVon(e, sp).titel, quelle: sp === 'fr' ? `extrait de la fiche Toolbox « ${qTitel} », déjà sur la fiche` : `Teil aus dem Toolbox-Blatt „${qTitel}“, schon auf dem Blatt`, tipp }
    })
  // Jugend-Folge (Blind-Bewertung 7: „K-34 steht im Kopf, wird in der Sitzung aber nicht bearbeitet“): nur die Ziele, die der
  // Kern dieser Sitzung übt
  // … für alle Alter (Blind-Bewertung 13: „kommen“ im Kopf, geübt wurde „antworten“ – bei einem Vierjährigen)
  const geuebt = plan.n > 1 ? geuebteZiele(k, plan, s) : null
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
        // ohne Verweis auf eine Unterlage außerhalb der Stunde (Blind-Bewertung 9: „‚voir le dossier‘ verweist auf etwas,
        // das nicht beiliegt“) – was zu tun ist, steht im Satz
        ? sp === 'fr' ? 'Un thème sensible est ouvert. Passgenau ne remplace pas une évaluation : en cas de signes de détresse, suivre ce qui a été convenu en équipe.' : 'Ein heikles Thema ist offen. Passgenau ersetzt keine Abklärung: Bei Anzeichen von Belastung gilt, was im Team vereinbart ist.'
        : sp === 'fr' ? 'Un thème sensible est ouvert pour cet enfant. Passgenau ne remplace pas une évaluation : en cas de signes de détresse, suivre ce qui a été convenu en équipe.' : 'Zu diesem Kind ist ein heikles Thema offen. Passgenau ersetzt keine Abklärung: Bei Anzeichen von Belastung gilt, was im Team vereinbart ist.',
    )
  // Auf einen Blick: Ziel der Stunde, Werkzeug der Übung, erster Satz
  const kernX = s.schritte.find((x) => x.rolle === 'kern')
  const kernE = kernX ? k.eintraege.get(kernX.ref) : undefined
  // das Feld des Ziels, das der Kern dieser Sitzung übt (Testlauf 16.10.: Sitzung 4 übte „Gefühle anderer erkennen“, der erste
  // Satz sagte „Gefühle in Worte fassen“ – das Feld des ersten Ziels der Folge)
  const kernZiel = kernE ? plan.ziele.find((c) => kernE.eldib.some((x) => x.code === c)) : undefined
  const feld = (kernZiel && ZIEL_FELD[kompetenzAusCode(kernZiel)] ? kompetenzAusCode(kernZiel) : undefined) ?? feldDerStunde(plan, kernE)
  const zf = feld ? ZIEL_FELD[feld] : undefined
  const werkzeug = kernE?.typ === 'schritt' ? kernE.werkzeug?.[sp] : undefined
  // … und je Sitzung ein anderer, konkreter Satz mit dem Titel der Übung (vorher in jeder Sitzung derselbe „kleine Trick“)
  const kernTitel = kernE && !kernX!.ref.startsWith('pg:') ? textVon(kernE, sp).titel.replace(/[.!?]$/, '') : undefined
  const kursNr = kernE?.typ === 'schritt' && kernE.linie?.id.startsWith('kurs-') && !kernX!.ref.startsWith('pg:') ? kernE.linie.nr : 0
  // der genaue Ich-Satz des Ziels, das der Kern übt, statt des Felds (Blind-Bewertung 13: „Ich komme, wenn man mich ruft“
  // lief als „gut mit anderen zusammenarbeiten“, „Ich rechne mit Geld bis 10 Euro“ als „Dinge im Alltag selbst schaffen“)
  // Übertragen: das Ziel der übertragenen Übung; Rückblick: das erste Ziel der Folge
  const uebQuelle = kernX?.ref === 'pg:uebertragen' ? quellenDerUebertragung(k, plan, kernX)[0] : undefined
  // Rückblick: die Ziele, die die Kerne der Folge wirklich geübt haben (Messung 4: Rückblick auf „Wenn die Fachkraft mich ruft“,
  // geübt wurde „Wenn ich etwas gefragt werde, antworte ich“)
  // … und ein zweites Ziel nur, wenn es mindestens zweimal dran war (Kern oder Übertragen; Messung 6: „Sitzung 6 beansprucht
  // K-26, geübt wurde es einmal“)
  const geuebtZahl = (c: string) => plan.sitzungen.filter((x) => x.schritte.some((y) => y.rolle === 'kern' && (y.ref === 'pg:uebertragen' ? quellenDerUebertragung(k, plan, y).some((q) => q.eldib.some((z) => z.code === c)) : !y.ref.startsWith('pg:') && !!k.eintraege.get(y.ref)?.eldib.some((z) => z.code === c)))).length
  const zieleGeuebt = plan.ziele.filter((c) => /^[A-Z]+-\d+$/.test(c) && geuebtZahl(c) >= 1)
  const ichCode = kernX?.ref === 'pg:folge-transfer'
    ? zieleGeuebt[0] ?? plan.ziele.find((c) => /^[A-Z]+-\d+$/.test(c))
    : uebQuelle ? plan.ziele.find((c) => uebQuelle.eldib.some((x) => x.code === c)) : kernX && !kernX.ref.startsWith('pg:') ? kernZiel : undefined
  const ich = ichCode ? zielSatz(k, p, ichCode, sp)?.trim() : undefined
  // Rückblick einer Folge mit zwei Zielen: beide, wenn die Folge beide geübt hat (Messung 4: „K-26 kommt im Rückblick nicht vor“)
  const zweitesZiel = kernX?.ref === 'pg:folge-transfer' ? zieleGeuebt.slice(1).find((c) => geuebtZahl(c) >= 2) : undefined
  // gesagt wird dem Kind der kindgerechte Satz (die Fachkraft sieht oben den Satz des Förderplans)
  const ichS = ichCode ? kindSatz(k, p, ichCode, sp)?.trim() : undefined
  const ich2S = zweitesZiel ? kindSatz(k, p, zweitesZiel, sp)?.trim() : undefined
  const ichZit = ichS ? (sp === 'fr' ? `« ${ichS} »${ich2S ? ` et « ${ich2S} »` : ''}` : `„${ichS}“${ich2S ? ` und „${ich2S}“` : ''}`) : undefined
  const einstiegSatz = ichZit && kernX?.ref === 'pg:uebertragen' && p.alterJahre < 8
    ? sp === 'fr' ? `Aujourd’hui, on joue ${ichZit} dans de petites scènes de tous les jours.` : `Heute spielen wir ${ichZit} in kleinen Szenen aus dem Alltag.`
    : ichZit && kernX?.ref === 'pg:uebertragen'
    ? sp === 'fr' ? `Aujourd’hui, on emmène ${ichZit} dans ton quotidien : où est-ce que ça peut te servir ces prochains jours ?` : `Heute bringen wir ${ichZit} in deinen Alltag: Wo kannst du das in den nächsten Tagen brauchen?`
    : kernX?.ref === 'pg:folge-transfer' && p.alterJahre < 6
    ? sp === 'fr' ? 'Aujourd’hui, on regarde en arrière : quel jeu on refait ? Tu peux montrer.' : 'Heute schauen wir zurück: Welches Spiel machen wir noch einmal? Du darfst zeigen.'
    : ichZit && kernX?.ref === 'pg:folge-transfer'
    ? sp === 'fr' ? `Aujourd’hui, on regarde en arrière : ${ichZit} – qu’est-ce qui t’a aidé ?` : `Heute schauen wir zurück auf ${ichZit} – was hat dir geholfen?`
    // Einzelkurs: die Sitzung beim Namen statt des Förderplan-Satzes (Referenzmessung 16.10.: „Dafür probieren wir ‚…‘ aus“
    // klang mechanisch, und der Ich-Satz des Ziels passte nicht immer zu dem, was die Sitzung übt)
    : kursNr && kernTitel
    ? kursNr === 1
      ? sp === 'fr' ? `Aujourd’hui, on commence quelque chose de nouveau : « ${kernTitel} ».` : `Heute fangen wir etwas Neues an: „${kernTitel}“.`
      : sp === 'fr' ? `Aujourd’hui, on continue : « ${kernTitel} ».` : `Heute geht es weiter: „${kernTitel}“.`
    : ichZit
    ? sp === 'fr'
      ? `Aujourd’hui, on s’entraîne : ${ichZit}${kernTitel ? ` Pour ça, on essaie « ${kernTitel} ».` : ''}`
      : `Heute üben wir: ${ichZit}${kernTitel ? ` Dafür probieren wir „${kernTitel}“ aus.` : ''}`
    : zf
    ? kernX?.ref === 'pg:uebertragen'
      ? sp === 'fr' ? `Aujourd’hui, on va ${zf.satz.fr} – et chercher où tu pourras t’en servir ces prochains jours.` : `Heute geht es darum, ${zf.satz.de} – und wo du das in den nächsten Tagen brauchen kannst.`
      : kernX?.ref === 'pg:folge-transfer'
        ? sp === 'fr' ? `Aujourd’hui, on regarde en arrière : qu’est-ce qui t’a aidé à ${zf.satz.fr} ?` : `Heute schauen wir zurück: Was hat dir geholfen, ${zf.satz.de}?`
        : sp === 'fr'
          ? `Aujourd’hui, on va ${zf.satz.fr}.${kernTitel ? ` Pour ça, on essaie « ${kernTitel} ».` : ''}`
          : `Heute geht es darum, ${zf.satz.de}.${kernTitel ? ` Dafür probieren wir „${kernTitel}“ aus.` : ''}`
    : undefined
  // ein Themen-Einstieg bringt seinen eigenen ersten Satz mit – nicht zwei verschiedene Anfänge
  const thEinstieg = s.schritte.map((x) => k.eintraege.get(x.ref)).find((e) => e?.id.startsWith('th:') && e.rolle.includes('einstieg'))
  const thSatz = thEinstieg && s.schritte.some((x) => x.ref === thEinstieg.id && x.rolle === 'einstieg') ? textVon(thEinstieg, sp).sagen?.[0] : undefined
  // Lernpfad (Stufe 4): die Übung ist der nächste Schritt der Reihe von letzter Sitzung – der erste Satz ist die Brücke, mit
  // dem Ziel dahinter (auch ohne eigenen Einstieg in kurzen Stunden)
  const vorKern = [...(plan.sitzungen.find((x) => x.nr === s.nr - 1)?.schritte ?? [])].reverse().find((x) => x.rolle === 'kern')
  const vorE = vorKern ? k.eintraege.get(vorKern.ref) : undefined
  const bruecke = kernE?.typ === 'schritt' && kernE.linie?.bruecke && vorE?.typ === 'schritt' && vorE.linie?.id === kernE.linie.id && vorE.linie.nr + 1 === kernE.linie.nr ? kernE.linie.bruecke[sp] : undefined
  const brueckeSatz = bruecke ? `${bruecke.trim()}${ichZit ? (sp === 'fr' ? ` Notre but : ${ichZit}` : ` Unser Ziel: ${ichZit}`) : ''}` : undefined
  const ersterSatz = brueckeSatz ?? thSatz ?? einstiegSatz
  // innen einfache Anführungszeichen (Blind-Bewertung 13: „Heute üben wir: „Ich …“ …“)
  const innen = (t: string) => (sp === 'fr' ? t.replace(/«\s*/g, '“').replace(/\s*»/g, '”') : t.replace(/„/g, '‚').replace(/“/g, '‘'))
  const einstieg = ersterSatz ? (sp === 'fr' ? `« ${innen(ersterSatz.replace(/^«\s*|\s*»$/g, ''))} »` : `„${innen(ersterSatz.replace(/^„|“$/g, ''))}“`) : undefined
  // der Schritt „Worum es heute geht“ sagt denselben fertigen Satz (statt „sagt in einem Satz, worum es geht“)
  if (einstiegSatz) s.schritte.forEach((x, i) => {
    if (x.ref === 'pg:einstieg' && schritte[i]) schritte[i].sagen = [einstiegSatz, ...schritte[i].sagen.filter((t) => t !== einstiegSatz)].slice(0, 3)
  })
  // Stunden-Faden (Blind-Bewertung 13: „Heute geht es ums Stoppen“ im Ankommen, „um Gefühle“ im Einstieg, „ums Aufräumen“ im
  // Abschluss – drei Themen in einer Stunde): Rahmenteile bringen keinen eigenen Themensatz mehr mit. Ankommen und Pausen
  // lassen ihn weg, Abschluss und Reflexion sagen, worum es in dieser Sitzung ging – mit dem Werkzeug beim Namen.
  if (zf) {
    // beim Übertragen das Werkzeug der übertragenen Übung
    const wQuelle = kernX?.ref === 'pg:uebertragen' ? quellenDerUebertragung(k, plan, kernX)[0] : kernX && !kernX.ref.startsWith('pg:') ? kernE : undefined
    const wName = wQuelle && wQuelle.typ === 'schritt' && wQuelle.werkzeug ? werkzeugName(wQuelle.werkzeug[sp], textVon(wQuelle, sp).titel) : undefined
    // (mit Ich-Satz, wenn der Kern ein Ziel übt; Werkzeug als eigener Satz – „mit „Zehn-Euro-Plan““ ohne Artikel klang schief)
    const werkzeugSatz = wName ? (sp === 'fr' ? ` L’outil : « ${wName} ».` : ` Das Werkzeug dazu: „${wName}“.`) : ''
    const rueck = ichZit
      ? kernX?.ref === 'pg:folge-transfer'
        ? sp === 'fr' ? `Aujourd’hui, on a regardé en arrière : ${ichZit}` : `Heute haben wir zurückgeschaut: ${ichZit}`
        : sp === 'fr' ? `Aujourd’hui, on s’est entraînés : ${ichZit}${werkzeugSatz}` : `Heute haben wir geübt: ${ichZit}${werkzeugSatz}`
      : sp === 'fr'
        ? `Aujourd’hui, on a travaillé ceci : ${zf.fr.charAt(0).toLowerCase()}${zf.fr.slice(1)}.${werkzeugSatz}`
        : `Heute ging es darum, ${zf.satz.de}.${werkzeugSatz}`
    s.schritte.forEach((x, i) => {
      const d = schritte[i]
      if (!d || x.ref.startsWith('pg:') || x.rolle === 'kern' || x.rolle === 'einstieg' || x.rolle === 'uebung') return
      const zurueck = x.rolle === 'abschluss' || x.rolle === 'reflexion'
      let ersetzt = false
      d.sagen = d.sagen
        .map((t) => {
          const ohne = ohneThemensatz(t)
          if (ohne === null) return t
          if (zurueck && !ersetzt) {
            ersetzt = true
            return `${rueck}${ohne ? ` ${ohne}` : ''}`
          }
          return ohne
        })
        .filter((t) => t.trim())
      // der Abschluss nennt immer, worum es heute ging – auch bei einem Ritual ohne Thema (roter Faden bis zum Schluss)
      if (x.rolle === 'abschluss' && !ersetzt) d.sagen = [rueck, ...d.sagen].slice(0, 3)
    })
  }
  // Im Spiel üben (Messung 5: „Bewegung und Spiel ohne Bezug zum Ziel“, „Füllblöcke beliebig“, „ruf-nahe Spiele“)
  // Blatt-Schritt einer Kurs-Sitzung: die Anleitung zu genau diesem Blatt (welche Aufgabe gemeinsam, welche allein)
  const anl = kernE?.typ === 'schritt' ? kernE.uebungsblatt?.anleitung?.[sp] : undefined
  if (anl) s.schritte.forEach((x, i) => {
    if (x.ref !== 'pg:blatt' || !schritte[i]) return
    schritte[i].text = name ? mitName(anl.text, name, sp) : anl.text
    if (anl.sagen?.length) schritte[i].sagen = anl.sagen
    if (anl.wennEsKippt) schritte[i].wennEsKippt = name ? mitName(anl.wennEsKippt, name, sp) : anl.wennEsKippt
  })
  const ims = imSpielStelle(k, plan, nr)
  if (ims && schritte[ims.i]) schritte[ims.i].imSpiel = name ? mitName(ims.text[sp], name, sp) : ims.text[sp]
  return {
    titel: plan.titel,
    zeile,
    ...(ich ? { ziel: ich } : zf ? { ziel: zf[sp] } : {}),
    ...(werkzeug ? { werkzeug } : {}),
    ...(einstieg ? { einstieg } : {}),
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
    karten: kartenSeite,
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
    : x.ref === 'pg:folge-transfer' ? WORT.reflexion
    : x.ref === 'pg:uebertragen' ? WORT.transfer
    : WORT[x.rolle]
  const leiste = s.schritte.filter((x) => x.min > 0).slice(0, 7).map((x) => ({ text: wort(x)[sprache], bild: wort(x).bild, min: x.min }))
  // nicht doppelt: steht die Leiste schon auf dem Blatt des Kindes, fehlt sie hier (Blind-Bewertung 10: „doppelte Stundenleiste“)
  const leisteAufBlatt = (s.blatt?.bausteine ?? []).some((b) => b.ref === BLATT_SYSTEM.stundenleiste)
  if (leiste.length >= 2 && !leisteAufBlatt) bausteine.push({ art: 'stundenleiste', schritte: leiste })
  // keine zweite Befindlichkeits-Abfrage auf der Karte (Blind-Bewertung 8: „Skala 0–10 ohne Ankerwerte, im Ablauf nicht
  // erwähnt“, „Wetter-Karte, die Stunde nutzt den Akku“): das Ankommens-Ritual fragt schon, wie es geht
  const wahl = s.schritte.find((x) => x.wahl?.length)
  if (wahl) {
    const optionen = [wahl, ...(wahl.wahl ?? [])].slice(0, 3).map((w) => {
      const e = k.eintraege.get(w.ref)
      const t = w.ref === 'pg:blatt' ? (sprache === 'fr' ? 'Page à colorier' : 'Mitmach-Seite') : e ? textVon(e, sprache).titel : (('t' in w && w.t) || w.ref)
      const f = e?.format[0]
      // unterscheidbar für Kinder, die nicht lesen (Blind-Bewertung 10: „zwei Optionen mit demselben Blatt-Symbol“)
      const bild = w.ref === 'pg:blatt' ? 'icon:pencil' : w.ref === 'pg:da-sein' ? 'icon:armchair'
        : /\b(Ball|Tor|balle|ballon|but)\b/i.test(t) ? 'icon:ball-football'
        : /\b(hör\w*|Geräusch\w*|Klang|Klänge|bruit\w*|écout\w*|son)\b/i.test(t) ? 'icon:ear'
        : f === 'bewegung' ? 'icon:run' : f === 'malen' ? 'icon:palette' : f === 'musik' ? 'icon:music' : f === 'spiel' ? 'icon:dice-5' : f === 'basteln' ? 'icon:puzzle' : f === 'geschichte' ? 'icon:cloud' : f === 'sinne' || f === 'atmen' ? 'icon:leaf' : 'icon:armchair'
      return { text: kurzLabel(t), bild, min: w.min }
    })
    // „Heute möchte ich zuerst …“ deutete eine Reihenfolge an – gewählt wird eines (Blind-Bewertung 7)
    bausteine.push({ art: 'wahlkarte', frage: sprache === 'fr' ? 'Aujourd’hui, je choisis :' : 'Heute wähle ich:', optionen })
    // freier Platz statt zwei leerer Drittel (Blind-Bewertung 9: „Blatt zu zwei Dritteln leer, nichts zum Mitmachen“) –
    // ohne Auftrag, ohne Bewertung
    bausteine.push(
      { art: 'aufgabe', text: jugend ? (sprache === 'fr' ? 'Place libre : noter, griffonner – ou laisser vide.' : 'Freier Platz: notieren, kritzeln – oder leer lassen.') : sprache === 'fr' ? 'Ici, tu peux dessiner ce que tu veux.' : 'Hier darfst du malen, was du magst.' },
      { art: 'feld', hoehe: 8, zeichnen: true },
    )
  }
  // keine Wochenziel-Karte mehr (Blind-Bewertung 9.10., A9): der Ich-Satz des Förderziels gehört nicht aufs Papier des Kindes
  // nur die Stundenleiste: lohnt eine eigene Seite nur, wenn sie dem Kind hilft (Struktur, Bildplan)
  const hilftLeiste = (p.hilft ?? []).some((h) => h === 'stundenleiste' || h === 'bildplan') || p.zugang.struktur === 'hoch'
  if (bausteine.length < 2 && !(hilftLeiste && bausteine.length === 1 && !s.blatt)) return null
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

/** Hintergrund eines Einzelkurses (src/data/passgenau/kurs-hintergrund.json) */
export interface KursHintergrund {
  de: { warum: string; achtung: string[] }
  fr: { warum: string; achtung: string[] }
  quellen: string[]
}

export function druckFolge(k: Katalog, p: Profil, plan: Plan, opt: { sprache: Sprache; warum: boolean }): DruckFolge {
  const sitzungen = plan.sitzungen.map((s) => druckSitzung(k, p, plan, s.nr, { ...opt, karten: false }))
  // „Mappe (von Sitzung 1)“ nicht neben „Mappe“: in der Liste für die ganze Folge genügt das Ding einmal
  const alleMat = [...new Set(sitzungen.flatMap((s) => s.material))]
  const material = alleMat.filter((m) => { const b = /^(.+) \((von Sitzung|de la séance) \d+\)$/.exec(m); return !b || !alleMat.includes(b[1]) })
  const linien = plan.sitzungen.flatMap((s) => s.schritte.filter((x) => x.rolle === 'kern').map((x) => k.eintraege.get(x.ref))).flatMap((e) => (e?.typ === 'schritt' && e.linie ? [e.linie] : []))
  const reihe = linien.find((l) => linien.filter((x) => x.id === l.id).length >= 2)
  const faden = reihe?.faden[opt.sprache]
  const h = reihe ? (HINTERGRUND as Record<string, KursHintergrund>)[reihe.id] : undefined
  const hintergrund = h?.[opt.sprache]?.warum ? { warum: h[opt.sprache].warum, achtung: h[opt.sprache].achtung ?? [], quellen: h.quellen ?? [] } : undefined
  return {
    titel: plan.titel,
    ...(faden ? { faden } : {}),
    ...(hintergrund ? { hintergrund } : {}),
    sitzungen,
    bogen: plan.sitzungen.map((s) => {
      const kern = s.schritte.find((x) => x.rolle === 'kern')
      const e = kern ? k.eintraege.get(kern.ref) : undefined
      // Übertragen und Rückblick mit ihrem eigenen Titel („Übertragen: Rot klatscht …“), nicht dem Katalog-Titel
      const eigen = kern?.ueber ? (opt.sprache === 'fr' ? kern.ueber['fr.titel'] : undefined) ?? kern.ueber.titel : undefined
      return { nr: s.nr, phase: phasenName(s.phase, opt.sprache, p.alterJahre), kern: eigen ?? (e ? textVon(e, opt.sprache).titel : (kern?.t ?? '')) }
    }),
    ziele: [...new Map(sitzungen.flatMap((s) => s.ziele).map((z) => [z.code, z])).values()],
    material,
    datei: `Passgenau-Folge${opt.sprache === 'fr' ? '_FR' : ''}.pdf`,
    sprache: opt.sprache,
  }
}
