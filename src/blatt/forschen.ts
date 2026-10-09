// ---------------------------------------------------------------------------
// Spielschule: Experiment der Woche – feste Listen und Regeln für die Seite
// „Forschen“, das Forscherblatt der Kinder und die Forscherkartei: Phänomene
// (Register), Reihenfolge der Themen, Bilder für Material und Schritte nach
// Stichwort, Längengrenzen (damit die Seite nie überläuft) und verbotene Stoffe.
// Die Inhalte stehen in den Blättern (typen.ts: Experiment, Forscherblatt).
// ---------------------------------------------------------------------------

import type { BildId, Bildtext, Blatt, Experiment, PhaenomenId, Sprache } from './typen'
import { bildZeichnung, bildGueltig, type Zeichnung } from './zeichnung'

/** Phänomene für das Register der Forscherkartei. */
export const PHAENOMENE: { id: PhaenomenId; de: string; fr: string }[] = [
  { id: 'farben', de: 'Farben mischen', fr: 'Mélanger les couleurs' },
  { id: 'wasser-wandert', de: 'Wasser wandert (Kapillarwirkung)', fr: 'L’eau voyage (capillarité)' },
  { id: 'schwimmen', de: 'Schwimmen und Sinken', fr: 'Flotter et couler' },
  { id: 'loesen', de: 'Lösen und Vermischen', fr: 'Dissoudre et mélanger' },
  { id: 'waerme', de: 'Warm und kalt: Schmelzen und Gefrieren', fr: 'Chaud et froid : fondre et geler' },
  { id: 'verdunsten', de: 'Verdunsten und Kondensieren', fr: 'Évaporation et condensation' },
  { id: 'luft', de: 'Luft', fr: 'L’air' },
  { id: 'licht', de: 'Licht und Schatten', fr: 'Lumière et ombre' },
  { id: 'magnet', de: 'Magnetismus', fr: 'Le magnétisme' },
  { id: 'schall', de: 'Schall und Töne', fr: 'Les sons' },
  { id: 'pflanzen', de: 'Pflanzen wachsen', fr: 'Les plantes poussent' },
  { id: 'lebewesen', de: 'Tiere und Lebewesen beobachten', fr: 'Observer les êtres vivants' },
  { id: 'sinne', de: 'Körper und Sinne', fr: 'Le corps et les sens' },
  { id: 'kraefte', de: 'Kräfte und Bewegung', fr: 'Forces et mouvement' },
  { id: 'gewicht', de: 'Schwer und leicht', fr: 'Lourd et léger' },
  { id: 'stoffe', de: 'Stoffe verändern sich', fr: 'La matière se transforme' },
  { id: 'oberflaeche', de: 'Oberflächenspannung', fr: 'La tension de surface' },
  { id: 'elektrizitaet', de: 'Elektrische Ladung (Knistern, Anziehen)', fr: 'L’électricité statique' },
]
export const phaenomenById = new Map(PHAENOMENE.map((x) => [x.id, x]))

/** Forscherkartei: zuerst die Jahreszeiten (Schuljahr ab Herbst), dann die übrigen Themen. */
export const KARTEI_THEMEN: string[] = ['herbst', 'winter', 'fruehling', 'sommer', 'ich', 'gefuehle', 'koerper', 'familie', 'tiere', 'essen', 'farben', 'unterwegs', 'feste', 'fantasie']

/** Bild je Thema (Deckblatt und Inhalt der Forscherkartei). */
export const THEMA_BILD: Record<string, BildId> = {
  herbst: 'motiv:blatt-herbst',
  winter: 'icon:snowflake',
  fruehling: 'icon:flower',
  sommer: 'icon:sun',
  ich: 'icon:friends',
  gefuehle: 'icon:mood-happy',
  koerper: 'icon:hand-finger',
  familie: 'icon:home',
  tiere: 'icon:paw',
  essen: 'icon:apple',
  farben: 'icon:palette',
  unterwegs: 'icon:bus',
  feste: 'icon:confetti',
  fantasie: 'icon:wand',
}

/** Höchstlängen (Zeichen) – so passt die Seite „Forschen“ immer auf eine Seite, auch auf Französisch. */
export const GRENZEN = {
  titel: 50,
  frage: 90,
  material: { min: 3, max: 8, zeichen: 60 },
  schritte: { min: 3, max: 5, zeichen: 140 },
  vermutung: 180,
  beobachten: 180,
  warumKind: 180,
  hintergrund: 550,
  sicherheit: { min: 1, max: 3, zeichen: 120 },
  weiter: 200,
  dauer: 20,
  phaenomene: { min: 1, max: 2 },
  /** Forscherblatt (Kinderseite) */
  blattFrage: 60,
  wahl: { min: 2, max: 3, zeichen: 18 },
}

// --- Eigene Piktogramme (24er-Raster wie die Tabler-Icons) --------------------------------------

const FORSCHER_BILDER: Record<string, Zeichnung> = {
  pipette: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'path', d: 'M9.5 7.5v-3a2.5 2.5 0 0 1 5 0v3', s: 'tinte', f: 'mittel' },
      { t: 'line', x1: 8.3, y1: 7.5, x2: 15.7, y2: 7.5, s: 'tinte' },
      { t: 'path', d: 'M10.6 7.5v8.4l1.4 3l1.4 -3v-8.4', s: 'tinte', f: 'none' },
      { t: 'line', x1: 12, y1: 12.2, x2: 12, y2: 16.2, s: 'tief', w: 1.5 },
      { t: 'circle', cx: 12, cy: 22, r: 1.1, s: 'none', f: 'tief' },
    ],
  },
  wattepad: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'circle', cx: 12, cy: 12, r: 8.5, s: 'tinte', f: 'papier' },
      { t: 'circle', cx: 12, cy: 12, r: 5.4, s: 'grau', f: 'none', w: 1, dash: '1.4 1.6' },
    ],
  },
  tablett: {
    vb: [0, 0, 24, 24],
    w: 1.7,
    formen: [
      { t: 'rect', x: 2.5, y: 8, b: 19, h: 9, rx: 2, s: 'tinte', f: 'zart' },
      { t: 'rect', x: 5, y: 10.3, b: 14, h: 4.4, rx: 1, s: 'tinte', f: 'none', w: 1.1 },
    ],
  },
}

/** Bild-Verweis für Experimente: wie überall ('icon:…', 'motiv:…' …) oder 'forschen:pipette|wattepad|tablett'. */
export function forscherBildGueltig(id: string): boolean {
  if (id.startsWith('forschen:')) return !!FORSCHER_BILDER[id.slice(9)]
  return bildGueltig(id)
}

export function forscherZeichnung(id: string): Zeichnung {
  if (id.startsWith('forschen:')) return FORSCHER_BILDER[id.slice(9)] ?? bildZeichnung('icon:circle')
  return bildZeichnung(id)
}

/** Material nach Stichwort (DE/FR) – die erste passende Zeile gewinnt, also Genaueres zuerst. */
const MATERIAL_BILDER: [RegExp, string][] = [
  [/watte|coton|démaquill/i, 'forschen:wattepad'],
  [/pipette|tropfflasch|compte-gouttes/i, 'forschen:pipette'],
  [/tablett|plateau/i, 'forschen:tablett'],
  [/lupe|loupe/i, 'icon:search'],
  [/led-?kerze|bougie.{0,4}led/i, 'motiv:led-kerze'],
  [/taschenlampe|lampe de poche|lampe torche/i, 'motiv:taschenlampe'],
  [/spiegel|miroir/i, 'motiv:spiegel'],
  [/magnet|aimant/i, 'icon:magnet'],
  [/farbe|aquarell|tinte|colorant|couleur|peinture|encre|gouache/i, 'icon:palette'],
  [/stift|kreide|crayon|feutre|craie/i, 'icon:pencil'],
  [/eiswürfel|\beis\b|glaçon|\bglace\b/i, 'icon:cube'],
  [/schnee|neige/i, 'icon:snowflake'],
  [/\bei(er)?\b|eierschale|œuf|oeuf/i, 'icon:egg'],
  [/salz|\bsel\b/i, 'icon:salt'],
  [/zucker|sucre/i, 'icon:cube'],
  [/zitrone|citron/i, 'icon:lemon'],
  [/apfel|äpfel|pomme/i, 'icon:apple'],
  [/milch|\blait\b/i, 'icon:milk'],
  [/seife|spülmittel|savon|liquide vaisselle/i, 'motiv:seife'],
  [/(?<![a-zäöüß])öl(?![a-zäöüß])|huile/i, 'icon:bottle'],
  [/flasche|bouteille/i, 'icon:bottle'],
  [/messer|couteau/i, 'icon:tools-kitchen-2'],
  [/schere|ciseaux/i, 'icon:scissors'],
  [/papier|karton|zeitung|filter|carton|journal|filtre|essuie-tout/i, 'icon:file-text'],
  [/löffel|cuill(è|e)re/i, 'icon:bowl-spoon'],
  [/becher|gobelet|tasse/i, 'icon:cup'],
  [/glas|gläser|verre|bocal/i, 'icon:glass-full'],
  [/teller|assiette/i, 'motiv:teller'],
  [/schüssel|schale|schälchen|wanne|\bbol\b|saladier|coupelle|bassine|\bbac\b/i, 'icon:bowl'],
  [/kanne|krug|carafe|pichet|\bbroc\b/i, 'motiv:kanne'],
  [/topf|casserole/i, 'motiv:topf'],
  [/handtuch|tuch|lappen|serviette|torchon|chiffon/i, 'motiv:handtuch'],
  [/wasser|\beau\b/i, 'icon:droplet'],
  [/luftballon|ballon/i, 'icon:balloon'],
  [/feder|plume/i, 'icon:feather'],
  [/samen|kresse|erde\b|blumentopf|graine|cresson|terreau|pot de fleur/i, 'icon:seedling'],
  [/blätter|herbstlaub|\blaub\b|feuilles? mortes|feuilles d’arbre/i, 'motiv:blatt-herbst'],
  [/stein|kiesel|caillou|galet|pierre/i, 'icon:circle'],
  [/stoppuhr|sanduhr|minuteur|chronomètre|sablier/i, 'icon:hourglass'],
  [/foto|photo|appareil/i, 'icon:camera'],
]

/** Schritte nach Stichwort (Verben DE/FR). Es zählt das Stichwort, das im Satz zuerst steht (meist das Tun). */
const SCHRITT_BILDER: [RegExp, string][] = [
  [/tropf|träufel|pipett|goutte/i, 'forschen:pipette'],
  [/\bmesser\b|halbier|\bcoup(e|ez|er|ent)\b|couteau/i, 'icon:tools-kitchen-2'],
  [/\bschneid|découp/i, 'icon:scissors'],
  [/gieß|giess|\bfüll|einfüll|\bkipp|\bvers(e|ez|er)\b|rempli|arros/i, 'icon:droplet'],
  [/misch|\brühr|umrühr|mélang|remu|touill/i, 'icon:bowl-spoon'],
  [/lupe|loupe/i, 'icon:search'],
  [/einfrier|gefrier|tiefkühl|congel/i, 'icon:snowflake'],
  [/\bwart|abwart|attend|patient/i, 'icon:hourglass'],
  [/taschenlampe|\blicht\b|\blampe|lumière|éclair/i, 'motiv:taschenlampe'],
  [/sonne|soleil/i, 'icon:sun'],
  [/pust|\bblas|souffl/i, 'icon:wind'],
  [/einkreis|ankreuz|forscherblatt|entour|fiche du chercheur/i, 'icon:pencil'],
  [/\bmal(t|en|e)\b|zeichn|stempel|dessin|peign|tampon/i, 'icon:brush'],
  [/zähl|\bcompt/i, 'icon:abacus'],
  [/\bwieg|\bwäg|soupes|\bpès|\bpes(er|ez)\b/i, 'icon:scale'],
  [/\b(ab)?mess(en|t|e)\b|mesur/i, 'icon:ruler'],
  [/\bfoto|photo/i, 'icon:camera'],
  [/\bpflanz|\bsä(en|t)\b|\bplant|\bsem(e|ez|er)\b/i, 'icon:seedling'],
  [/beobacht|\bschau|\bsieh|\bseh(en|t)\b|\bguck|observ|regard/i, 'icon:eye'],
  [/vermut|\brat(en|et)\b|\bfrag|devin|suppos|hypoth|\bpens|demand/i, 'icon:bulb'],
  [/sprech|erzähl|\bsag(en|t)\b|racont|\bparl|\bdi(s|tes|sent)\b|nomm/i, 'icon:message-circle'],
  [/\bleg(en|t|e)\b|\bstell(en|t|e)\b|\bsetz(en|t|e)\b|\bpos(e|ez|er)\b|\bplac(e|ez|er)\b|dispos|align|\bmet(s|tez|tre)\b/i, 'icon:hand-grab'],
]

/** Bild für eine Materialzeile: eigenes `bild` oder per Stichwort – sonst keins (die Seite zeigt dann einen Punkt). */
export function materialBild(x: string | Bildtext): string | undefined {
  if (typeof x !== 'string') return x.bild
  return MATERIAL_BILDER.find(([re]) => re.test(x))?.[1]
}

/** Piktogramm für einen Schritt: eigenes `bild`, per Stichwort oder die Hand („tun“). */
export function schrittBild(x: string | Bildtext): string {
  if (typeof x !== 'string') return x.bild
  let best: { i: number; bild: string } | undefined
  for (const [re, bild] of SCHRITT_BILDER) {
    const m = re.exec(x)
    if (m && (!best || m.index < best.i)) best = { i: m.index, bild }
  }
  return best?.bild ?? 'icon:hand-finger'
}

export const textVon = (x: string | Bildtext): string => (typeof x === 'string' ? x : x.text)

// --- Verbotene Stoffe -----------------------------------------------------------------------------

/** Was in der Spielschule nicht ins Experiment gehört. `ausser`: so ist es erlaubt (LED-Kerze; heißes Wasser nur
 *  in der Hand von Erwachsenen). Verneinte Nennungen („keine Kerze“, « sans paillettes ») zählen nicht. */
export const VERBOTEN: { re: RegExp; was: string; ausser?: RegExp }[] = [
  { re: /glitzer(?!t\b|n\b|te)|glitter|paillette/i, was: 'Glitzer (Mikroplastik, gerät in Augen und Mund)' },
  {
    re: /neodym|néodyme|magnetkugel|kugelmagnet|mini-?magnet|kleine[nrs]? magnet|magnetperle|billes? magnétique|petits? aimants?|mini-?aimant/i,
    was: 'Neodym- oder kleine Magnete (beim Verschlucken lebensgefährlich)',
  },
  { re: /kerze|teelicht|bougie|chauffe-plat|streichh(o|ö)lz|feuerzeug|allumette|briquet/i, ausser: /\bled\b|led-/i, was: 'Kerze oder offene Flamme (nur LED-Kerze)' },
  { re: /alkohol|spiritus|ethanol|äthanol|isopropanol|alcool/i, was: 'Alkohol' },
  { re: /trockeneis|glace carbonique|carboglace|neige carbonique/i, was: 'Trockeneis' },
  {
    re: /hei(ß|ss)e[mns]? wasser|hei(ß|ss)wasser|kochende[mns]? wasser|wasserkocher|eau (très )?chaude|eau bouillante|bouilloire/i,
    ausser: /erwachsen|lehrperson|lehrerin|lehrer\b|adulte|enseignant/i,
    was: 'heißes Wasser für Kinder (nur Erwachsene, mit „standard:hitze“)',
  },
]
const VERNEINUNG = /\b(kein|keine|keinen|keiner|nicht|ohne|statt|anstatt|nie|pas d[e’']|sans|jamais|au lieu d)\b[^.;:]{0,24}$/i

/** Verbotene Stoffe in einem Text (Material, Schritt, Weiterforschen). */
export function verboteneStoffe(text: string): string[] {
  const out: string[] = []
  for (const v of VERBOTEN) {
    const m = v.re.exec(text)
    if (!m) continue
    if (v.ausser?.test(text)) continue
    if (VERNEINUNG.test(text.slice(0, m.index))) continue
    out.push(v.was)
  }
  return out
}

/** Heißes Wasser, das Erwachsene bedienen – dann gehört „standard:hitze“ in die Sicherheit. */
export function heissesWasser(text: string): boolean {
  return VERBOTEN[VERBOTEN.length - 1].re.test(text)
}

// --- Zugriff -------------------------------------------------------------------------------------

/** Experiment der Sprachfassung (FR ohne eigene Fassung: keins – kein Rückgriff auf Deutsch). */
export function experimentVon(blatt: Blatt, sprache: Sprache): Experiment | undefined {
  if (blatt.bereich !== 'spielschule') return undefined
  const inhalt = sprache === 'fr' ? blatt.fr : blatt.de
  return inhalt?.lehrer.spielschule?.experiment
}

/** Steht das Forscherblatt schon im Schülerteil? Dann gibt es keine eigene Zusatzseite dafür. */
export function hatForscherblattBaustein(blatt: Blatt, sprache: Sprache): boolean {
  const inhalt = (sprache === 'fr' && blatt.fr) || blatt.de
  return inhalt.bausteine.some((b) => b.art === 'forscherblatt' || (b.art === 'spalten' && [...b.links, ...b.rechts].some((x) => x.art === 'forscherblatt')))
}
