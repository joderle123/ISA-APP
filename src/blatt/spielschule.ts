// ---------------------------------------------------------------------------
// Spielschule (Cycle 1): feste Bezeichnungen für die Seite „Beobachten & Begleiten“
// und die Zusatzseiten (Klassenraster, Portfolio, Elternbrief) – Lernbereiche des
// Plan d'études, Beobachtungsstufen, Jahrgänge, Standard-Sicherheitssätze.
// Inhalte stehen in den Blättern (typen.ts: Spielideen, Themenwoche); hier nur,
// was für alle Einheiten gleich ist.
// ---------------------------------------------------------------------------

import type { Baustein, BildId, Blatt, DomaeneId, Freitagskarte, Sprache, Spielideen, WochenWort } from './typen'
import { experimentVon, hatForscherblattBaustein } from './forschen'

/** Lernbereiche des Plan d'études Cycle 1 (MENFP 2011). Die französischen Bezeichnungen sind die des Dokuments;
 *  die deutschen sind Arbeitsübersetzungen (gegen eine deutsche Fassung prüfen, falls vorhanden). */
export const DOMAENEN: { id: DomaeneId; fr: string; de: string; farbe: string }[] = [
  { id: 'logique-math', fr: 'Raisonnement logique et mathématique', de: 'Logisches Denken und Mathematik', farbe: '#3F46A8' },
  { id: 'langage', fr: 'Langage, langue luxembourgeoise et éveil aux langues', de: 'Sprache, Luxemburgisch und Öffnung für Sprachen', farbe: '#1F6B6F' },
  { id: 'monde', fr: 'Découverte du monde par tous les sens', de: 'Die Welt mit allen Sinnen entdecken', farbe: '#3F6E3A' },
  { id: 'psychomotricite', fr: 'Psychomotricité, expression corporelle et santé', de: 'Psychomotorik, Körperausdruck und Gesundheit', farbe: '#3E6A85' },
  { id: 'expression', fr: 'Expression créatrice, éveil à l’esthétique et à la culture', de: 'Kreativer Ausdruck, Ästhetik und Kultur', farbe: '#A33B5B' },
  { id: 'vivre-ensemble', fr: 'Vie en commun et valeurs', de: 'Zusammenleben und Werte', farbe: '#8A6414' },
]
export const domaeneById = new Map(DOMAENEN.map((d) => [d.id, d]))

/** Die drei festen Stufen jedes Beobachtungspunkts (FR bewusst ohne Mittelpunkt-Formen). */
export const BEOBACHTUNG_STUFEN: Record<Sprache, [string, string, string]> = {
  de: ['mit Hilfe', 'allein', 'zeigt es anderen'],
  fr: ['avec de l’aide', 'tout seul', 'le montre aux autres'],
}

/** Die drei Jahrgänge des Cycle 1 (Schlüssel wie in Altersstufen). */
export const JAHRGAENGE: { key: 'precoce' | 'p1' | 'p2'; name: string; de: string; fr: string }[] = [
  { key: 'precoce', name: 'Précoce', de: '3–4 Jahre', fr: '3–4 ans' },
  { key: 'p1', name: 'Préscolaire 1', de: '4–5 Jahre', fr: '4–5 ans' },
  { key: 'p2', name: 'Préscolaire 2', de: '5–6 Jahre', fr: '5–6 ans' },
]

/** Einheitliche Sicherheitssätze. In `freitag.sicherheit` als 'standard:<schlüssel>' verwenden – so steht derselbe
 *  Satz in jeder Einheit gleich. */
export const SICHERHEIT_STANDARD: Record<string, Record<Sprache, string>> = {
  spiesse: {
    de: 'Keine spitzen Spieße oder Zahnstocher: Obst auf dem Teller anrichten; gegessen wird im Sitzen.',
    fr: 'Pas de pics ni de cure-dents pointus : présenter les fruits sur l’assiette ; on mange assis.',
  },
  pusten: {
    de: 'Strohhalm: nur pusten, nie saugen – vorher üben; jedes Kind hat seinen eigenen Halm.',
    fr: 'Paille : on souffle, on n’aspire jamais – s’entraîner avant ; une paille par enfant.',
  },
  fotos: {
    de: 'Fotos und Aufnahmen nur mit schriftlicher Einwilligung der Familien; nur für Portfolio und Klasse, nie ins Internet.',
    fr: 'Photos et enregistrements seulement avec l’accord écrit des familles ; pour le portfolio et la classe, jamais sur Internet.',
  },
  hitze: {
    de: 'Herd, Ofen und heißes Wasser bedienen nur Erwachsene; die Kinder bleiben einen großen Schritt entfernt.',
    fr: 'Plaque, four et eau chaude : seulement les adultes ; les enfants restent à un grand pas.',
  },
  kleinteile: {
    de: 'Kleinteile (Perlen, Samen, Münzen, Magnete) nur unter Aufsicht; danach zählen und wegräumen.',
    fr: 'Petits objets (perles, graines, pièces, aimants) seulement sous surveillance ; ensuite les compter et les ranger.',
  },
  allergien: {
    de: 'Allergien und Essensregeln der Familien vorher klären; niemand muss probieren.',
    fr: 'Allergies et habitudes alimentaires des familles : vérifier avant ; personne n’est obligé de goûter.',
  },
  messer: {
    de: 'Mit dem Messer schneiden nur Erwachsene; die Kinder zupfen, reißen oder brechen.',
    fr: 'Seuls les adultes coupent au couteau ; les enfants effeuillent, déchirent ou cassent.',
  },
  wasser: {
    de: 'Am Wasser hat immer eine erwachsene Person die Kinder im Blick; Wannen danach sofort leeren.',
    fr: 'Près de l’eau, un adulte garde toujours les enfants à l’œil ; vider les bacs tout de suite après.',
  },
  draussen: {
    de: 'Draußen: die Kinder beim Losgehen und beim Zurückkommen zählen; auf der Straße Warnwesten.',
    fr: 'Dehors : compter les enfants au départ et au retour ; gilets de sécurité dans la rue.',
  },
}

/** Sicherheitszeile in der Sprache des Blatts ('standard:pusten' → Standardsatz). */
export function sicherheitText(zeile: string, sprache: Sprache): string {
  const m = /^standard:([a-z]+)$/.exec(zeile.trim())
  return m ? (SICHERHEIT_STANDARD[m[1]]?.[sprache] ?? zeile) : zeile
}

/** Freitags-Karte: Wörter für die Symbolzeile. */
export const FREITAG_TEXT: Record<
  Sprache,
  { vorlauf: Record<Freitagskarte['vorlauf'], string>; material: Record<Freitagskarte['material'], string>; kueche: [string, string]; ausflug: [string, string]; besuch: [string, string] }
> = {
  de: {
    vorlauf: { 0: 'sofort startklar', 1: '1 Woche Vorlauf', 3: '3 Wochen Vorlauf' },
    material: { standard: 'Material vorhanden', besorgen: 'Material besorgen', selten: 'Material selten' },
    kueche: ['Küche nötig', 'ohne Küche'],
    ausflug: ['Ausflug', 'kein Ausflug'],
    besuch: ['Besuch', 'kein Besuch'],
  },
  fr: {
    vorlauf: { 0: 'prêt tout de suite', 1: '1 semaine avant', 3: '3 semaines avant' },
    material: { standard: 'matériel disponible', besorgen: 'matériel à prévoir', selten: 'matériel rare' },
    kueche: ['cuisine nécessaire', 'sans cuisine'],
    ausflug: ['sortie', 'pas de sortie'],
    besuch: ['visite', 'pas de visite'],
  },
}

/** Elternbrief: feste Überschriften je Sprache. Luxemburgisch steht mit in der Prüfliste (scripts/lb-liste.ts). */
export const BRIEF_TEXT: Record<'de' | 'fr' | 'pt' | 'lb', { sprache: string; anrede: string; woche: string; idee: string; bitte: string; woerter: string; satz: string }> = {
  de: { sprache: 'Deutsch', anrede: 'Liebe Familien,', woche: 'Das machen wir', idee: 'Idee für zu Hause', bitte: 'Unsere Bitte', woerter: 'Unsere Wörter der Woche', satz: 'Satz der Woche' },
  fr: { sprache: 'Français', anrede: 'Chères familles,', woche: 'Ce que nous faisons', idee: 'Une idée pour la maison', bitte: 'Notre demande', woerter: 'Nos mots de la semaine', satz: 'La phrase de la semaine' },
  pt: { sprache: 'Português', anrede: 'Queridas famílias,', woche: 'O que fazemos', idee: 'Uma ideia para casa', bitte: 'O nosso pedido', woerter: 'As palavras da semana', satz: 'A frase da semana' },
  lb: { sprache: 'Lëtzebuergesch', anrede: 'Moien,', woche: 'Dat maache mir', idee: 'Eng Iddi fir doheem', bitte: 'Eis Bitt', woerter: 'Wierder vun der Woch', satz: 'Saz vun der Woch' },
}

/** Zusatzseiten, die es einzeln zum Herunterladen gibt (nicht im Lehrerteil). */
export type Zusatz = 'klassenraster' | 'portfolio' | 'elternbrief' | 'forscherblatt'
export const ZUSAETZE: { id: Zusatz; de: string; fr: string; knopf: string; datei: string }[] = [
  { id: 'klassenraster', de: 'Klassenraster', fr: 'Grille de classe', knopf: 'Klassenraster', datei: 'Klassenraster' },
  { id: 'portfolio', de: 'Portfolio-Blatt', fr: 'Fiche portfolio', knopf: 'Portfolio', datei: 'Portfolio' },
  { id: 'elternbrief', de: 'Elternbrief', fr: 'Lettre aux familles', knopf: 'Elternbrief', datei: 'Elternbrief' },
  { id: 'forscherblatt', de: 'Forscherblatt', fr: 'Fiche du chercheur', knopf: 'Forscherblatt', datei: 'Forscherblatt' },
]

/** Hat die Sprachfassung (oder die Woche) etwas für die Seite „Beobachten & Begleiten“? */
export function hatBegleiten(blatt: Blatt, sp: Spielideen | undefined): boolean {
  if (blatt.bereich !== 'spielschule' || !sp) return false
  const w = blatt.woche
  return !!(sp.beobachtung?.length || sp.entscheiden || sp.stufen || sp.zugang?.length || sp.mehrsprachig || sp.freitag || w?.domaenen?.length || w?.sprachen?.woerter?.length)
}

/** Welche Zusatzseiten hat dieses Blatt in dieser Sprache? Klassenraster und Portfolio brauchen das
 *  Beobachtungsfenster (3 Punkte), der Elternbrief `woche.elternbrief`, das Forscherblatt ein `experiment`
 *  (nur wenn es nicht schon im Schülerteil steht). */
export function zusaetzeVon(blatt: Blatt, sprache: Sprache): Zusatz[] {
  if (blatt.bereich !== 'spielschule') return []
  const sp = ((sprache === 'fr' && blatt.fr) || blatt.de).lehrer.spielschule
  const out: Zusatz[] = []
  if (sp?.beobachtung?.length) out.push('klassenraster', 'portfolio')
  if (blatt.woche?.elternbrief) out.push('elternbrief')
  if (experimentVon(blatt, sprache) && !hatForscherblattBaustein(blatt, sprache)) out.push('forscherblatt')
  return out
}

function kartenIn(liste: Baustein[]): { titel?: string; bild?: BildId }[] {
  return liste.flatMap((b) => (b.art === 'karten' ? b.karten : b.art === 'spalten' ? [...kartenIn(b.links), ...kartenIn(b.rechts)] : []))
}

/** Bild zu einem Wort des Wörterstreifens: eigenes `bild` oder das der Bildkarte mit demselben Titel. */
export function wortBild(blatt: Blatt, w: WochenWort): BildId | undefined {
  if (w.bild) return w.bild
  const norm = (s: string | undefined) => (s ?? '').trim().toLowerCase().replace(/’/g, "'")
  const karten = [...kartenIn(blatt.de.bausteine).map((k) => [k, w.de] as const), ...kartenIn(blatt.fr?.bausteine ?? []).map((k) => [k, w.fr] as const)]
  return karten.find(([k, wort]) => k.bild && norm(k.titel) === norm(wort))?.[0].bild
}
