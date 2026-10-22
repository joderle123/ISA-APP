// Unterrichtsformen (Planen nach Aktivität, 22.10.2026): „Ich will mit den Kindern ein Experiment machen – zum Thema Wut,
// bereite mir das vor.“ Die Form bestimmt den Ablauf der Stunde (Bogen), der Kern kommt aus Schritten dieser Form, das
// Thema bleibt das sozio-emotionale Ziel. Fertige Form-Stunden (Ids „fo:<paket>:<n>“) halten Einstieg, Kern und Auswertung
// über die Einheit zusammen (quelleEinheit); ohne sie nimmt der Planer Schritte, deren Format zur Form passt.
import type { KatalogEintrag } from '../typen'
import type { SlotRolle } from './planer'

export type FormId =
  | 'experiment' | 'rollenspiel' | 'bewegung' | 'spiel' | 'kreativ' | 'geschichte' | 'musik' | 'kochen'
  | 'draussen' | 'projekt' | 'stationen' | 'kreis' | 'ruhe' | 'bauen' | 'philosophieren' | 'medien'

/** Handlungsfelder des Nationalen Rahmenplans zur non-formalen Bildung (Cadre de référence national, RGD 2024) */
export type FeldId = 'emotionen' | 'werte' | 'sprache' | 'kreativ' | 'bewegung' | 'natur' | 'uebergaenge'

type Zwei = { de: string; fr: string }

/** Ein Abschnitt im Bogen der Form: Rolle im Planer, Name in der Stunde, Anteil an der Zeit zwischen Ankommen und Abschluss */
export interface FormPhase { rolle: SlotRolle; name: Zwei; anteil: number }

export interface Unterrichtsform {
  id: FormId
  name: Zwei
  /** eine Zeile für die Kachel */
  satz: Zwei
  /** Bild der Kachel (Motiv aus blatt/motive) */
  motiv: string
  /** Farbe der Kachel (tief, zart) */
  farbe: [string, string]
  /** Formate der Schritte, die zu dieser Form gehören (das erste Format zählt voll, weitere halb) */
  formate: string[]
  /** Material, an dem man die Form erkennt (Kochen: Küche, Bauen: Bausteine) */
  erkennen?: string[]
  /** Ort, den die Form mitbringt */
  ort?: 'draussen' | 'turnhalle' | 'kueche'
  /** Material außerhalb der Grundausstattung, das mit dieser Form erlaubt ist */
  material?: string[]
  /** Blatt in der Regel dabei? (Experiment: Forscherprotokoll; Bewegung: ohne) */
  blatt: 'mit' | 'ohne'
  /** Ablauf zwischen Ankommen und Abschluss */
  bogen: FormPhase[]
  /** Handlungsfelder des Rahmenplans, die die Form selbst anspricht (das Thema bringt seine dazu) */
  felder: FeldId[]
  /** ab welchem Alter sinnvoll (Philosophieren, Projekt: ab 6) */
  ab?: number
  /** ein Hinweis, der vor jeder Stunde dieser Form steht (Allergien beim Kochen, Regeln draußen) */
  vorher?: Zwei
}

const p = (rolle: SlotRolle, de: string, fr: string, anteil: number): FormPhase => ({ rolle, name: { de, fr }, anteil })

export const FORMEN: Unterrichtsform[] = [
  {
    id: 'experiment', name: { de: 'Experiment', fr: 'Expérience' }, satz: { de: 'fragen, vermuten, ausprobieren, staunen', fr: 'se demander, deviner, essayer, s’étonner' },
    motiv: 'lupe', farbe: ['#1F6E8C', '#E3F2F7'], formate: ['experiment'], blatt: 'mit', felder: ['natur'],
    bogen: [p('einstieg', 'Forscherfrage', 'La question', 0.22), p('kern', 'Versuch', 'L’expérience', 0.5), p('reflexion', 'Was heißt das für uns?', 'Et pour nous ?', 0.28)],
  },
  {
    id: 'rollenspiel', name: { de: 'Rollenspiel & Theater', fr: 'Jeu de rôle et théâtre' }, satz: { de: 'Szenen spielen, in Rollen schlüpfen', fr: 'jouer des scènes, entrer dans un rôle' },
    motiv: 'theatermasken', farbe: ['#8E3B6E', '#F6E7F0'], formate: ['rollenspiel', 'pantomime', 'statuen', 'figuren'], blatt: 'ohne', felder: ['kreativ', 'sprache'],
    bogen: [p('einstieg', 'Aufwärmen', 'Échauffement', 0.22), p('kern', 'Spielen', 'Jouer', 0.53), p('reflexion', 'Aus der Rolle', 'Sortir du rôle', 0.25)],
  },
  {
    id: 'bewegung', name: { de: 'Bewegung & Sport', fr: 'Mouvement et sport' }, satz: { de: 'rennen, balancieren, toben – mit Ziel', fr: 'courir, équilibrer, se défouler – avec un but' },
    motiv: 'laufen', farbe: ['#B5541C', '#FBEDE3'], formate: ['bewegung', 'ballspiel', 'wurfspiel'], material: ['matten', 'schwungtuch'], blatt: 'ohne', felder: ['bewegung'],
    bogen: [p('bewegung', 'Aufwärmen', 'Échauffement', 0.22), p('kern', 'Bewegungsspiel', 'Jeu en mouvement', 0.5), p('regulation', 'Runterkommen', 'Retour au calme', 0.28)],
  },
  {
    id: 'spiel', name: { de: 'Spielen', fr: 'Jouer' }, satz: { de: 'Brett-, Karten- und Gruppenspiele', fr: 'jeux de société, de cartes et de groupe' },
    motiv: 'wuerfel', farbe: ['#5B4BA8', '#ECE9F8'], formate: ['spiel', 'wuerfelspiel', 'wuerfel', 'quiz', 'suchen', 'geschicklichkeit', 'wettspiel'], blatt: 'ohne', felder: ['werte'],
    bogen: [p('einstieg', 'Spiel erklären', 'Expliquer le jeu', 0.18), p('kern', 'Spielen', 'Jouer', 0.57), p('reflexion', 'Was hat geholfen?', 'Qu’est-ce qui a aidé ?', 0.25)],
  },
  {
    id: 'kreativ', name: { de: 'Kreativ & Kunst', fr: 'Création et art' }, satz: { de: 'malen, basteln, gestalten', fr: 'peindre, bricoler, créer' },
    motiv: 'palette', farbe: ['#C0392B', '#FBE9E7'], formate: ['malen', 'basteln', 'comic'], blatt: 'ohne', felder: ['kreativ'],
    bogen: [p('einstieg', 'Idee', 'L’idée', 0.2), p('kern', 'Gestalten', 'Créer', 0.55), p('reflexion', 'Galerie', 'La galerie', 0.25)],
  },
  {
    id: 'geschichte', name: { de: 'Geschichte & Bilderbuch', fr: 'Histoire et album' }, satz: { de: 'vorlesen, erzählen, weiterspinnen', fr: 'lire, raconter, imaginer la suite' },
    motiv: 'buch', farbe: ['#2E6B3F', '#E6F2E9'], formate: ['geschichte', 'lesen'], blatt: 'mit', felder: ['sprache'],
    bogen: [p('einstieg', 'Neugierig machen', 'Éveiller la curiosité', 0.2), p('kern', 'Geschichte erleben', 'Vivre l’histoire', 0.5), p('reflexion', 'Nachdenken', 'Réfléchir', 0.3)],
  },
  {
    id: 'musik', name: { de: 'Musik & Rhythmus', fr: 'Musique et rythme' }, satz: { de: 'singen, trommeln, Klänge hören', fr: 'chanter, taper le rythme, écouter' },
    motiv: 'trommel', farbe: ['#A0441F', '#FCEEE6'], formate: ['musik'], material: ['klangschale'], blatt: 'ohne', felder: ['kreativ', 'bewegung'],
    bogen: [p('einstieg', 'Einstimmen', 'Se mettre dans le ton', 0.2), p('kern', 'Musizieren', 'Faire de la musique', 0.55), p('regulation', 'Leise werden', 'Faire silence', 0.25)],
  },
  {
    id: 'kochen', name: { de: 'Kochen & Alltag', fr: 'Cuisine et quotidien' }, satz: { de: 'zusammen zubereiten und genießen', fr: 'préparer et savourer ensemble' },
    motiv: 'topf', farbe: ['#9A6A12', '#FBF2DE'], formate: ['kochen'], erkennen: ['kueche'], ort: 'kueche', material: ['kueche'], blatt: 'ohne', felder: ['bewegung'],
    bogen: [p('einstieg', 'Rezept & Hände waschen', 'Recette et mains propres', 0.2), p('kern', 'Zubereiten', 'Préparer', 0.55), p('reflexion', 'Essen & erzählen', 'Manger et raconter', 0.25)],
    vorher: { de: 'Vorher klären: Allergien und was die Kinder nicht essen dürfen. Hände waschen, Haare zusammen, scharfe Messer bleiben bei Erwachsenen.', fr: 'À vérifier avant : allergies et ce que les enfants ne peuvent pas manger. Mains lavées, cheveux attachés, les couteaux pointus restent chez l’adulte.' },
  },
  {
    id: 'draussen', name: { de: 'Draußen & Natur', fr: 'Dehors et nature' }, satz: { de: 'Hof, Wald, Park – mit allen Sinnen', fr: 'cour, forêt, parc – avec tous les sens' },
    motiv: 'baum', farbe: ['#3F6E3A', '#EAF2E7'], formate: [], ort: 'draussen', blatt: 'ohne', felder: ['natur', 'bewegung'],
    bogen: [p('einstieg', 'Raus & Regeln', 'Sortir et règles', 0.18), p('kern', 'Draußen erleben', 'Vivre dehors', 0.57), p('reflexion', 'Fundstücke', 'Nos trouvailles', 0.25)],
    vorher: { de: 'Vorher klären: Wetter und Kleidung, Treffpunkt und Grenze des Geländes, ein Signal zum Sammeln.', fr: 'À vérifier avant : météo et vêtements, point de rencontre et limites du terrain, un signal pour se rassembler.' },
  },
  {
    id: 'projekt', name: { de: 'Projekt', fr: 'Projet' }, satz: { de: 'gemeinsam etwas schaffen, das bleibt', fr: 'créer ensemble quelque chose qui reste' },
    motiv: 'rakete', farbe: ['#2E3A9C', '#ECEEFA'], formate: ['projekt'], blatt: 'ohne', felder: ['werte'], ab: 6,
    bogen: [p('einstieg', 'Ziel & Aufgaben', 'But et tâches', 0.22), p('kern', 'Am Projekt arbeiten', 'Travailler au projet', 0.53), p('reflexion', 'Stand & nächster Schritt', 'Où on en est', 0.25)],
  },
  {
    id: 'stationen', name: { de: 'Stationen', fr: 'Ateliers tournants' }, satz: { de: 'drei Stationen zu einem Thema', fr: 'trois ateliers sur un thème' },
    motiv: 'fussspuren', farbe: ['#6B5B1E', '#F5F0DD'], formate: ['stationen'], blatt: 'ohne', felder: [], ab: 5,
    bogen: [p('einstieg', 'Stationen erklären', 'Présenter les ateliers', 0.14), p('kern', 'Station 1', 'Atelier 1', 0.24), p('vertiefung', 'Station 2', 'Atelier 2', 0.24), p('spiel', 'Station 3', 'Atelier 3', 0.24), p('reflexion', 'Was war wo?', 'Bilan', 0.14)],
  },
  {
    id: 'kreis', name: { de: 'Gespräch & Kreis', fr: 'Discussion en cercle' }, satz: { de: 'erzählen, zuhören, gemeinsam entscheiden', fr: 'raconter, écouter, décider ensemble' },
    motiv: 'sprechblasen', farbe: ['#1D5C8C', '#E4EEF7'], formate: ['gespraech'], blatt: 'ohne', felder: ['sprache', 'werte'],
    bogen: [p('einstieg', 'Impuls in die Mitte', 'Un objet au centre', 0.2), p('kern', 'Gespräch', 'Discussion', 0.55), p('reflexion', 'Jede und jeder ein Satz', 'Une phrase chacun', 0.25)],
  },
  {
    id: 'ruhe', name: { de: 'Ruhe & Achtsamkeit', fr: 'Calme et pleine conscience' }, satz: { de: 'atmen, spüren, zur Ruhe kommen', fr: 'respirer, ressentir, se calmer' },
    motiv: 'klangschale', farbe: ['#4A6B8A', '#E8EFF6'], formate: ['atmen', 'sinne'], material: ['klangschale', 'matten'], blatt: 'ohne', felder: ['bewegung'],
    bogen: [p('regulation', 'Im Körper ankommen', 'Arriver dans son corps', 0.25), p('kern', 'Achtsamkeitsübung', 'Exercice de pleine conscience', 0.5), p('reflexion', 'Nachspüren', 'Ressentir', 0.25)],
  },
  {
    id: 'bauen', name: { de: 'Bauen & Tüfteln', fr: 'Construire et bricoler' }, satz: { de: 'Türme, Brücken, Erfindungen', fr: 'tours, ponts, inventions' },
    motiv: 'bauklotz', farbe: ['#7A4E1F', '#F6EDE2'], formate: ['bauen'], erkennen: ['bausteine'], blatt: 'ohne', felder: ['natur', 'kreativ'],
    bogen: [p('einstieg', 'Bauauftrag', 'La mission', 0.2), p('kern', 'Bauen', 'Construire', 0.55), p('reflexion', 'Bauwerk vorstellen', 'Présenter l’œuvre', 0.25)],
  },
  {
    id: 'philosophieren', name: { de: 'Philosophieren', fr: 'Philosopher' }, satz: { de: 'große Fragen gemeinsam denken', fr: 'penser ensemble les grandes questions' },
    motiv: 'gedanken-kopf', farbe: ['#5A3E8C', '#EEE8F7'], formate: ['philosophieren'], blatt: 'ohne', felder: ['werte', 'sprache'], ab: 6,
    bogen: [p('einstieg', 'Denkanstoß', 'Le déclic', 0.22), p('kern', 'Gemeinsam nachdenken', 'Penser ensemble', 0.53), p('reflexion', 'Mein Gedanke heute', 'Ma pensée du jour', 0.25)],
  },
  {
    id: 'medien', name: { de: 'Medien & Foto', fr: 'Médias et photo' }, satz: { de: 'Fotostory, Hörspiel, Trickfilm', fr: 'roman-photo, pièce audio, film d’animation' },
    motiv: 'kamera', farbe: ['#33465F', '#E7ECF3'], formate: ['digital', 'interview'], material: ['ipad', 'beamer'], blatt: 'ohne', felder: ['sprache'], ab: 6,
    bogen: [p('einstieg', 'Idee & Rollen', 'Idée et rôles', 0.2), p('kern', 'Aufnehmen', 'Enregistrer', 0.55), p('reflexion', 'Anschauen & Rückmeldung', 'Regarder et en parler', 0.25)],
  },
]

export const FORM_BY_ID = new Map(FORMEN.map((f) => [f.id, f]))

export function formVon(id: string | undefined): Unterrichtsform | undefined {
  return id ? FORM_BY_ID.get(id as FormId) : undefined
}

/** Wie gut passt ein Schritt zur Form? 1 ausdrücklich oder erstes Format, 0.5 ein weiteres Format oder Ort/Material, sonst 0 */
export function formTreffer(e: KatalogEintrag, f: Unterrichtsform): number {
  if (e.typ !== 'schritt') return 0
  if (e.id.startsWith('fo:') && e.formen?.includes(f.id)) return 1
  if (e.formen?.includes(f.id)) return 1
  if (e.format[0] && f.formate.includes(e.format[0])) return 1
  if (f.ort && f.ort !== 'kueche' && e.ort === f.ort) return 1
  if (f.erkennen && e.material.some((m) => f.erkennen!.includes(m))) return f.id === 'kochen' ? 1 : 0.5
  if (e.format.some((x) => f.formate.includes(x))) return 0.5
  return 0
}

/** Slots einer Stunde in dieser Form: Ankommen und Abschluss wie immer, dazwischen der Bogen der Form (kurze Stunden: nur der
 *  Kern bzw. Einstieg und Kern), mit Blatt am Ende des Bogens. Summe = Dauer. */
export function formSlots(f: Unterrichtsform, dauer: number, ankommen: number, abschluss: number, blatt: boolean): { rolle: SlotRolle; min: number; name: Zwei }[] {
  const mitte = dauer - ankommen - abschluss
  let bogen = f.bogen
  if (dauer <= 15) bogen = bogen.filter((x) => x.rolle === 'kern')
  else if (dauer <= 20) bogen = bogen.filter((x, i) => x.rolle === 'kern' || i === 0).slice(0, 2)
  const blattMin = blatt && dauer >= 20 ? (dauer >= 45 ? 8 : dauer >= 30 ? 6 : 4) : 0
  const rest = mitte - blattMin
  const summe = bogen.reduce((s, x) => s + x.anteil, 0)
  const teile = bogen.map((x) => ({ rolle: x.rolle, name: x.name, min: Math.max(2, Math.round((rest * x.anteil) / summe)) }))
  // Rundung: der Kern gleicht aus
  const diff = rest - teile.reduce((s, x) => s + x.min, 0)
  const k = teile.find((x) => x.rolle === 'kern') ?? teile[0]
  k.min += diff
  const raus: { rolle: SlotRolle; min: number; name: Zwei }[] = [{ rolle: 'ankommen', min: ankommen, name: { de: 'Ankommen', fr: 'Arriver' } }, ...teile]
  if (blattMin) raus.splice(raus.findIndex((x) => x.rolle === 'kern') + 1 + (f.id === 'experiment' ? 1 : 0), 0, { rolle: 'uebung', min: blattMin, name: f.id === 'experiment' ? { de: 'Forscherprotokoll', fr: 'Carnet du chercheur' } : { de: 'Blatt', fr: 'Fiche' } })
  raus.push({ rolle: 'abschluss', min: abschluss, name: { de: 'Abschluss', fr: 'Clôture' } })
  return raus
}
