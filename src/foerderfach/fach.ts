// Feste Angaben des Förderfachs: Name, Farben je Klassenstufe, die fünf
// Kompetenzbereiche, Phasen einer Doppelstunde und die kurzen Texte der
// Oberfläche in beiden Sprachen. Inhalte stehen in src/data/foerderfach.

import type { Farben } from '../blatt/katalog'
import type { Klasse, Kompetenz, Phase, Sprache, Zweisprachig } from './typen'

const ARBEITSTITEL = 'Skills fir d’Liewen'

/** Arbeitstitel – an einer Stelle, damit er sich leicht ändern lässt. */
export const FACH = {
  /** Name in Kopf, Fuß und Dokumenttitel – in der Ausgabe annexe mit Zusatz („Skills fir d’Liewen · Annexe“) */
  name: ARBEITSTITEL,
  /** Name ohne Zusatz: der große Titel auf Deckblatt und Rückseite */
  titel: ARBEITSTITEL,
  /** Zusatz der Ausgabe („Annexe“), sonst leer */
  zusatz: '',
  untertitel: { de: 'Sozio-emotionales Lernen', fr: 'Apprentissage socio-émotionnel' } as Zweisprachig,
  voie: { de: 'Voie de préparation', fr: 'Voie de préparation' } as Zweisprachig,
}

/** Jede Klassenstufe hat ihre Farbe (Deckblatt, Reiter, Akzente). */
export const STUFE_FARBEN: Record<Klasse, Farben> = {
  '7e': { tief: '#B9503A', mittel: '#EDB6A6', zart: '#FBEEE9' },
  '6e': { tief: '#1D6F68', mittel: '#A6D2CC', zart: '#E6F3F1' },
  '5e': { tief: '#4F4A94', mittel: '#C4C0E6', zart: '#EFEEF9' },
}

export const KLASSEN: Klasse[] = ['7e', '6e', '5e']

export interface KompetenzDef {
  id: Kompetenz
  farbe: string
  bild: string
  name: Zweisprachig
  /** Fachbegriff nach CASEL */
  fach: Zweisprachig
}

export const KOMPETENZEN: KompetenzDef[] = [
  { id: 'kennen', farbe: '#D9962B', bild: 'icon:user', name: { de: 'Mich kennen', fr: 'Me connaître' }, fach: { de: 'Selbstwahrnehmung', fr: 'Conscience de soi' } },
  { id: 'steuern', farbe: '#CB5A45', bild: 'icon:hand-stop', name: { de: 'Mich steuern', fr: 'Me réguler' }, fach: { de: 'Selbststeuerung', fr: 'Autorégulation' } },
  { id: 'verstehen', farbe: '#2E8C7A', bild: 'icon:eye', name: { de: 'Andere verstehen', fr: 'Comprendre les autres' }, fach: { de: 'Soziale Wahrnehmung', fr: 'Conscience sociale' } },
  { id: 'miteinander', farbe: '#3A6FA8', bild: 'icon:users', name: { de: 'Miteinander', fr: 'Vivre ensemble' }, fach: { de: 'Beziehungsfähigkeit', fr: 'Compétences relationnelles' } },
  { id: 'entscheiden', farbe: '#7A569E', bild: 'icon:scale', name: { de: 'Verantwortlich entscheiden', fr: 'Décider de façon responsable' }, fach: { de: 'Verantwortliche Entscheidungen', fr: 'Prise de décision responsable' } },
]

export const kompetenzById = new Map(KOMPETENZEN.map((k) => [k.id, k]))

/** Phasen einer Doppelstunde: Farben wie im Skills-Kurs der App. */
export const PHASEN: Record<Phase, { farbe: string; name: Zweisprachig }> = {
  ankommen: { farbe: '#3E6FB0', name: { de: 'Ankommen', fr: 'Accueil' } },
  bruecke: { farbe: '#7A8396', name: { de: 'Brücke', fr: 'Lien' } },
  input: { farbe: '#2E3A9C', name: { de: 'Input', fr: 'Apport' } },
  uebung: { farbe: '#1F6B6F', name: { de: 'Übung', fr: 'Activité' } },
  pause: { farbe: '#B7791F', name: { de: 'Pause', fr: 'Pause' } },
  aktiv: { farbe: '#2F855A', name: { de: 'Bewegung', fr: 'En mouvement' } },
  skill: { farbe: '#6E4A7E', name: { de: 'Skill', fr: 'Skill' } },
  abschluss: { farbe: '#B4533A', name: { de: 'Abschluss', fr: 'Clôture' } },
}

/** Kurze Texte der Hefte. */
export const TX = {
  de: {
    lehrerhandbuch: 'Lehrerhandbuch',
    schuelerheft: 'Schülerheft',
    entwurf: 'Entwurf zur Ansicht',
    inhalt: 'Inhalt',
    teilA: 'Teil A · Das Fach',
    teilB: 'Teil B · Der Jahresplan',
    /** „Teil C · Muster-Einheit“ – der Buchstabe hängt davon ab, welche Teile das Heft hat */
    teil: (i: number, name: string) => `Teil ${'ABCDEF'[i]} · ${name}`,
    kopiervorlagen: 'Kopiervorlagen',
    kopiervorlage: 'Kopiervorlage',
    vorlageSeite: (s: number) => `Vorlage S. ${s}`,
    notizen: 'Notizen',
    stand: (monat: string) => `Entwurf zur Ansicht · Stand ${monat}`,
    jahresplan: 'Jahresplan',
    trimester: 'Trimester',
    kapitel: 'Kapitel',
    einheit: 'Einheit',
    einheiten: 'Einheiten',
    min: 'Min.',
    minuten: 'Minuten',
    doppelstunden: 'Doppelstunden',
    kapitelDerKlasse: (k: Klasse) => `Die Kapitel der ${k}`,
    wahl: 'Wahleinheit: vertieft, entfällt zuerst, wenn Stunden ausfallen',
    wahlKurz: 'Wahl',
    neu: 'neu für das Fach',
    neuKurz: 'neu',
    termine: (n: number) => `${n} Doppelstunden`,
    legende: 'Kompetenzbereiche',
    auf: 'Auf einen Blick',
    ziele: 'Ziele',
    zieleUnter: 'Die Jugendlichen …',
    zielMatrix: 'Jahresziele · Am Ende des Schuljahres: Die Jugendlichen …',
    material: 'Material',
    vorbereitung: 'Vorbereitung',
    ablauf: 'Ablauf',
    schrittFuerSchritt: 'Schritt für Schritt',
    sagen: 'So können Sie es sagen',
    tipp: 'Aus der Praxis',
    kippt: 'Wenn es kippt',
    ausblick: 'Zum Schluss',
    achtung: 'Achtung',
    hintergrund: 'Fachlicher Hintergrund',
    quellen: 'Quellen',
    heftSeite: (s: number) => `Schülerheft S. ${s}`,
    heft: 'Schülerheft',
    seite: 'Seite',
    anf: ['„', '“'] as [string, string],
    name: 'Name',
    klasse: 'Klasse',
    schuljahr: 'Schuljahr',
    jedeStunde: 'Jede Stunde',
    kompetenzen: 'Kompetenzbereiche',
    dauer: 'Dauer',
    muster: 'Muster-Einheit',
    teilC: 'Die Einheiten',
    teilD: 'Kopiervorlagen für jede Stunde',
    anhang: 'Anhang',
    wortspeicher: 'Wortspeicher',
    sprachen: ['Deutsch', 'Französisch'] as [string, string],
    differenzierung: 'Differenzierung',
    leichter: 'Einfacher',
    schwerer: 'Anspruchsvoller',
    kurzfassung: 'Wenn nur eine Stunde bleibt',
    heftKurz: (s: number) => `Heft S. ${s}`,
    mission: 'Wochen-Mission',
    wann: 'Wann?',
    karteHeft: (s?: number) => (s ? `Skill-Karte · Heft S. ${s}` : 'Skill-Karte im Heft'),
    skill: 'Skill',
    /** Hinweis neben der Wochen-Mission im Handbuch */
    missionVerweis: (s?: number) => `${s ? `Heft S. ${s}` : 'im Schülerheft'} · in der nächsten Brücke kurz nachfragen`,
    seiteKurz: (s: number) => `S. ${s}`,
    imKapitel: 'In diesem Kapitel',
    fuerLehrkraft: 'Kopiervorlage für die Lehrkraft',
    kapitelEnde: (k: string) => `Am Ende des Kapitels: ${k}`,
    /** Theoretische Grundlagen: wo die Theorie im Fach steckt */
    imFach: 'Im Fach',
    /** Fragebogen und Auswertungsbogen */
    aussage: 'Aussage',
    nr: 'Nr.',
    klasseFeld: 'Klasse',
    schuljahrFeld: 'Schuljahr',
  },
  fr: {
    lehrerhandbuch: 'Guide de l’enseignant',
    schuelerheft: 'Cahier de l’élève',
    entwurf: 'Projet pour relecture',
    inhalt: 'Sommaire',
    teilA: 'Partie A · La matière',
    teilB: 'Partie B · Le plan annuel',
    teil: (i: number, name: string) => `Partie ${'ABCDEF'[i]} · ${name}`,
    kopiervorlagen: 'Modèles à photocopier',
    kopiervorlage: 'Modèle',
    vorlageSeite: (s: number) => `Modèle p. ${s}`,
    notizen: 'Notes',
    stand: (monat: string) => `Projet pour relecture · ${monat}`,
    jahresplan: 'Plan annuel',
    trimester: 'trimestre',
    kapitel: 'Chapitre',
    einheit: 'Séance',
    einheiten: 'Séances',
    min: 'min',
    minuten: 'minutes',
    doppelstunden: 'séances doubles',
    kapitelDerKlasse: (k: Klasse) => `Les chapitres de la ${k}`,
    wahl: 'Séance au choix : approfondit, saute en premier si des heures tombent',
    wahlKurz: 'au choix',
    neu: 'nouvelle pour la matière',
    neuKurz: 'nouveau',
    termine: (n: number) => `${n} séances`,
    legende: 'Domaines de compétences',
    auf: 'En bref',
    ziele: 'Objectifs',
    zieleUnter: 'Les jeunes…',
    zielMatrix: 'Objectifs annuels · À la fin de l’année, les jeunes…',
    material: 'Matériel',
    vorbereitung: 'Préparation',
    ablauf: 'Déroulement',
    schrittFuerSchritt: 'Pas à pas',
    sagen: 'Ce que vous pouvez dire',
    tipp: 'Conseil pratique',
    kippt: 'Si ça dérape',
    ausblick: 'Pour finir',
    achtung: 'Attention',
    hintergrund: 'Repères théoriques',
    quellen: 'Sources',
    heftSeite: (s: number) => `Cahier p. ${s}`,
    heft: 'Cahier de l’élève',
    seite: 'Page',
    anf: ['«', '»'] as [string, string],
    name: 'Nom',
    klasse: 'Classe',
    schuljahr: 'Année scolaire',
    jedeStunde: 'Chaque séance',
    kompetenzen: 'Domaines de compétences',
    dauer: 'Durée',
    muster: 'Séance modèle',
    teilC: 'Les séances',
    teilD: 'Modèles pour chaque séance',
    anhang: 'Annexe',
    wortspeicher: 'Mots clés',
    sprachen: ['français', 'allemand'] as [string, string],
    differenzierung: 'Différenciation',
    leichter: 'Plus simple',
    schwerer: 'Plus exigeant',
    kurzfassung: 'S’il ne reste qu’une heure',
    heftKurz: (s: number) => `Cahier p. ${s}`,
    mission: 'Mission de la semaine',
    wann: 'Quand ?',
    karteHeft: (s?: number) => (s ? `Carte skill · cahier p. ${s}` : 'Carte skill dans le cahier'),
    skill: 'Skill',
    missionVerweis: (s?: number) => `${s ? `cahier p. ${s}` : 'dans le cahier'} · à reprendre au début de la séance suivante`,
    seiteKurz: (s: number) => `p. ${s}`,
    imKapitel: 'Dans ce chapitre',
    fuerLehrkraft: 'Modèle pour l’enseignant·e',
    kapitelEnde: (k: string) => `En fin de chapitre : ${k}`,
    imFach: 'Dans la matière',
    aussage: 'Affirmation',
    nr: 'N°',
    klasseFeld: 'Classe',
    schuljahrFeld: 'Année scolaire',
  },
} satisfies Record<Sprache, Record<string, unknown>>

export type FachTx = (typeof TX)['de']

/**
 * Zwei Ausgaben aus derselben Technik: „klassen“ = Förderfach für Klassen (Standard, Deutsch und Französisch),
 * „annexe“ = Skills-Kurs der Annexe (Leitungsheft statt Lehrerhandbuch, nur Deutsch, Daten in src/data/foerderfach/annexe).
 * Die PDF-Skripte rufen waehleAusgabe einmal auf, bevor sie setzen: Danach tragen Deckblatt, Kopf, Fuß und
 * Dokumenttitel den Zusatz, und die Hefte lassen aus, was es nur zweisprachig gibt.
 */
export type Ausgabe = 'klassen' | 'annexe'

/** Die gewählte Ausgabe. `einsprachig`: Elternbrief und Fragebogen nur in der Heftsprache, Wortspeicher ohne Übersetzung, kein Glossar. */
export const AUSGABE = { art: 'klassen' as Ausgabe, einsprachig: false }

const TX_KLASSEN = { lehrerhandbuch: TX.de.lehrerhandbuch, fuerLehrkraft: TX.de.fuerLehrkraft }
const TX_ANNEXE = { lehrerhandbuch: 'Leitungsheft', fuerLehrkraft: 'Kopiervorlage für die Leitung' }

export function waehleAusgabe(art: Ausgabe): void {
  const annexe = art === 'annexe'
  AUSGABE.art = art
  AUSGABE.einsprachig = annexe
  FACH.zusatz = annexe ? 'Annexe' : ''
  FACH.name = annexe ? `${FACH.titel} · ${FACH.zusatz}` : FACH.titel
  Object.assign(TX.de, annexe ? TX_ANNEXE : TX_KLASSEN)
}

/** „1. Trimester“ / « 1er trimestre » */
export function trimesterName(n: 1 | 2 | 3, sprache: Sprache): string {
  if (sprache === 'fr') return `${n === 1 ? '1er' : `${n}e`} trimestre`
  return `${n}. Trimester`
}
