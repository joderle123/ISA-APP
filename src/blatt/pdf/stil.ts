// Maße, Schriften und feste Texte der Arbeitsblätter.
import { Font } from '@react-pdf/renderer'
import type { Layout, Sprache } from '../typen'
import { trennung } from '../../lib/trennung'

Font.registerHyphenationCallback(trennung)

export const SCHRIFT = {
  kind: 'CDSE Andika',
  jugend: 'CDSE Inter',
  titel: 'CDSE Manrope',
}

let registriert = false

/**
 * Schriften anmelden (SIL Open Font License 1.1). `quelle` liefert für einen
 * Dateinamen die Adresse: im Browser eine eingebettete data:-URL, im
 * Node-Skript den Dateipfad.
 */
export function registriereSchriften(quelle: (datei: string) => string): void {
  if (registriert) return
  registriert = true
  Font.register({
    family: SCHRIFT.kind,
    fonts: [
      { src: quelle('Andika-Regular.ttf'), fontWeight: 400 },
      { src: quelle('Andika-Bold.ttf'), fontWeight: 700 },
    ],
  })
  Font.register({
    family: SCHRIFT.jugend,
    fonts: [
      { src: quelle('Inter-Regular.ttf'), fontWeight: 400 },
      { src: quelle('Inter-SemiBold.ttf'), fontWeight: 600 },
      { src: quelle('Inter-SemiBold.ttf'), fontWeight: 700 },
    ],
  })
  Font.register({
    family: SCHRIFT.titel,
    fonts: [
      { src: quelle('Manrope-Bold.ttf'), fontWeight: 700 },
      { src: quelle('Manrope-ExtraBold.ttf'), fontWeight: 800 },
    ],
  })
}

export interface Masse {
  layout: Layout
  schrift: string
  fett: 600 | 700
  basis: number
  klein: number
  titel: number
  untertitel: number
  /** Abstand der Schreiblinien */
  zeile: number
  /** Abstand zwischen Bausteinen */
  abstand: number
  /** Durchmesser der Aufgabennummer */
  nummer: number
  lh: number
  /** Größe von Kästchen/Kreisen zum Ankreuzen */
  kaestchen: number
}

export const MASSE: Record<Layout, Masse> = {
  bild: { layout: 'bild', schrift: SCHRIFT.kind, fett: 700, basis: 15, klein: 10, titel: 27, untertitel: 13, zeile: 36, abstand: 16, nummer: 24, lh: 1.3, kaestchen: 17 },
  gross: { layout: 'gross', schrift: SCHRIFT.kind, fett: 700, basis: 14, klein: 10, titel: 25, untertitel: 13, zeile: 32, abstand: 14, nummer: 22, lh: 1.34, kaestchen: 15 },
  mittel: { layout: 'mittel', schrift: SCHRIFT.kind, fett: 700, basis: 12, klein: 9.4, titel: 22, untertitel: 11.6, zeile: 26, abstand: 12, nummer: 19, lh: 1.4, kaestchen: 12.5 },
  jugend: { layout: 'jugend', schrift: SCHRIFT.jugend, fett: 600, basis: 10.2, klein: 8.5, titel: 20, untertitel: 10.6, zeile: 23, abstand: 11, nummer: 17, lh: 1.46, kaestchen: 10.5 },
}

/** Lehrerseite: immer sachlich gesetzt. */
export const LEHRER_MASSE: Masse = { ...MASSE.jugend, basis: 9.6, klein: 8.2, titel: 18, untertitel: 10 }

export const SEITE = { rand: 40, oben: 30, unten: 46 }

type Texte = Record<
  | 'name'
  | 'datum'
  | 'arbeitsblatt'
  | 'lehrer'
  | 'ziel'
  | 'ablauf'
  | 'hintergrund'
  | 'differenzierung'
  | 'leichter'
  | 'schwerer'
  | 'impulse'
  | 'tipps'
  | 'achtung'
  | 'material'
  | 'quellen'
  | 'eldib'
  | 'stufe'
  | 'sozialform'
  | 'dauer'
  | 'einzeln'
  | 'gruppe'
  | 'klasse'
  | 'anleitung'
  | 'seite'
  | 'rueckblick'
  | 'wenn'
  | 'dann'
  | 'beispiel'
  | 'zeichnen'
  | 'datumUnterschrift'
  | 'tipp'
  | 'wissen'
  | 'merke'
  | 'hilfe'
  | 'notfall'
  | 'vertrauen'
  | 'telefon'
  | 'ich'
  | 'meinZiel'
  | 'leicht'
  | 'mittel'
  | 'schwer',
  string
>

export const TEXTE: Record<Sprache, Texte> = {
  de: {
    name: 'Name',
    datum: 'Datum',
    arbeitsblatt: 'Arbeitsblatt',
    lehrer: 'Für die Lehrperson',
    ziel: 'Ziel',
    ablauf: 'Ablauf',
    hintergrund: 'Fachlicher Hintergrund',
    differenzierung: 'Differenzierung',
    leichter: 'Leichter',
    schwerer: 'Anspruchsvoller',
    impulse: 'Gesprächsimpulse',
    tipps: 'Aus der Praxis',
    achtung: 'Achtung',
    material: 'Material',
    quellen: 'Quellen',
    eldib: 'ELDiB-Ziele',
    stufe: 'Stufe',
    sozialform: 'Sozialform',
    dauer: 'Dauer',
    einzeln: 'Einzeln',
    gruppe: 'Kleingruppe',
    klasse: 'Klasse',
    anleitung: 'Für Erwachsene',
    seite: 'Seite',
    rueckblick: 'So war das Blatt für mich:',
    wenn: 'Wenn …',
    dann: '… dann',
    beispiel: 'Beispiel',
    zeichnen: 'Zeichne hier.',
    datumUnterschrift: 'Datum',
    tipp: 'Tipp',
    wissen: 'Gut zu wissen',
    merke: 'Merke',
    hilfe: 'Hier bekommst du Hilfe',
    notfall: 'Hilfe – rund um die Uhr oder anonym',
    vertrauen: 'Meine Vertrauensperson',
    telefon: 'Telefon',
    ich: 'Ich',
    meinZiel: 'Mein Ziel',
    leicht: 'leicht',
    mittel: 'geht so',
    schwer: 'schwer',
  },
  fr: {
    name: 'Nom',
    datum: 'Date',
    arbeitsblatt: 'Fiche',
    lehrer: 'Pour l’enseignant·e',
    ziel: 'Objectif',
    ablauf: 'Déroulement',
    hintergrund: 'Repères théoriques',
    differenzierung: 'Différenciation',
    leichter: 'Plus simple',
    schwerer: 'Plus exigeant',
    impulse: 'Pistes pour l’échange',
    tipps: 'Conseils pratiques',
    achtung: 'Attention',
    material: 'Matériel',
    quellen: 'Sources',
    eldib: 'Objectifs ELDiB',
    stufe: 'Niveau',
    sozialform: 'Organisation',
    dauer: 'Durée',
    einzeln: 'Individuel',
    gruppe: 'Petit groupe',
    klasse: 'Classe',
    anleitung: 'Pour l’adulte',
    seite: 'Page',
    rueckblick: 'Cette fiche, pour moi, c’était :',
    wenn: 'Si …',
    dann: '… alors',
    beispiel: 'Exemple',
    zeichnen: 'Dessine ici.',
    datumUnterschrift: 'Date',
    tipp: 'Astuce',
    wissen: 'Bon à savoir',
    merke: 'À retenir',
    hilfe: 'Où trouver de l’aide',
    notfall: 'De l’aide – jour et nuit ou anonyme',
    vertrauen: 'Ma personne de confiance',
    telefon: 'Téléphone',
    ich: 'Moi',
    meinZiel: 'Mon objectif',
    leicht: 'facile',
    mittel: 'moyen',
    schwer: 'difficile',
  },
}

const NBSP = String.fromCharCode(160)
const NNBSP = String.fromCharCode(0x202f)

/** Feinsatz: Gedankenstriche, Auslassungspunkte; im Französischen die
 *  geschützten Leerzeichen vor : ; ! ? und in « ». */
export function typo(text: string, sprache: Sprache): string {
  let t = text.replace(/ - /g, ' – ').replace(/\.\.\./g, '…')
  if (sprache === 'fr') {
    t = t
      .replace(/\s+:/g, NBSP + ':')
      .replace(/\s+([;!?])/g, NNBSP + '$1')
      .replace(/«\s*/g, '«' + NBSP)
      .replace(/\s*»/g, NBSP + '»')
  }
  return t
}
