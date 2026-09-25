// ---------------------------------------------------------------------------
// Bereiche und Themen der Arbeitsblätter. Die Farben folgen dem CDSE-
// Farbcode (ELDiB: Verhalten = Terrakotta, Sozialisation = Petrol,
// Kognition = Ocker) und bleiben auch in Schwarz-Weiß-Kopien ruhig.
// ---------------------------------------------------------------------------

import type { Bereich, Layout, Sprache, Stufe } from './typen'

export interface Farben {
  /** Kräftige Farbe: Nummern, Akzente, Linien in Grafiken. */
  tief: string
  /** Mittlerer Ton: Flächen in Grafiken. */
  mittel: string
  /** Sehr heller Ton: Hinterlegungen. */
  zart: string
}

export interface BereichDef {
  id: Bereich
  kuerzel: string
  de: string
  fr: string
  icon: string
  farben: Farben
  beschreibung: string
}

export const BEREICHE: BereichDef[] = [
  {
    id: 'gefuehle',
    kuerzel: 'G',
    de: 'Gefühle',
    fr: 'Émotions',
    icon: 'heart',
    farben: { tief: '#A33B5B', mittel: '#E3B3C3', zart: '#F8EBF0' },
    beschreibung: 'Gefühle erkennen, benennen und steuern: Wut, Angst, Traurigkeit, Freude, Ruhe.',
  },
  {
    id: 'verhalten',
    kuerzel: 'V',
    de: 'Verhalten',
    fr: 'Comportement',
    icon: 'traffic-lights',
    farben: { tief: '#B4533A', mittel: '#E8BFB2', zart: '#FAEEE9' },
    beschreibung: 'Impulse steuern, Regeln verstehen, sich selbst beobachten, Ziele setzen, Verantwortung übernehmen.',
  },
  {
    id: 'miteinander',
    kuerzel: 'M',
    de: 'Miteinander',
    fr: 'Vivre ensemble',
    icon: 'friends',
    farben: { tief: '#1F6B6F', mittel: '#AFD3D1', zart: '#E6F2F1' },
    beschreibung: 'Freundschaft, Konflikte lösen, Gefühle mitteilen, Grenzen, Mobbing, Hilfe holen.',
  },
  {
    id: 'lernen',
    kuerzel: 'L',
    de: 'Lernen & Selbstorganisation',
    fr: 'Apprendre et s’organiser',
    icon: 'bulb',
    farben: { tief: '#8A6414', mittel: '#E0CB98', zart: '#F8F2E2' },
    beschreibung: 'Aufmerksamkeit, Ordnung, Planung, Motivation, Umgang mit Fehlern und Prüfungen.',
  },
  {
    id: 'alltag',
    kuerzel: 'A',
    de: 'Alltag',
    fr: 'Quotidien',
    icon: 'sun',
    farben: { tief: '#3F6E3A', mittel: '#BBD4B4', zart: '#EAF2E7' },
    beschreibung: 'Übergänge, Tagesablauf und Schlaf, Medien, Körper und Pubertät, Stärken, Wohlbefinden.',
  },
  {
    id: 'werkzeuge',
    kuerzel: 'W',
    de: 'Werkzeuge für Fachkräfte',
    fr: 'Outils pour professionnels',
    icon: 'tools',
    farben: { tief: '#2E3A9C', mittel: '#C8CDF0', zart: '#EEF0FB' },
    beschreibung: 'Vorlagen für die Arbeit: Verstärkerpläne, Beobachtung, Gespräche, visuelle Hilfen, Krisenplan.',
  },
  {
    id: 'skills',
    kuerzel: 'S',
    de: 'Skills-Kurs',
    fr: 'Cours de compétences',
    icon: 'stairs',
    farben: { tief: '#6E4A7E', mittel: '#D6C6DE', zart: '#F4EFF7' },
    beschreibung: 'Schülerblätter zum Skills-Kurs für Jugendliche: Gruppe, Ich, Gefühle, Skills, Gedanken, Kommunikation, schwierige Situationen, digitale Welt, Gesundheit.',
  },
]

export const bereichById = new Map(BEREICHE.map((b) => [b.id, b]))

export interface ThemaDef {
  id: string
  bereich: Bereich
  de: string
  fr: string
}

const T = (bereich: Bereich, id: string, de: string, fr: string): ThemaDef => ({ id, bereich, de, fr })

export const THEMEN: ThemaDef[] = [
  T('gefuehle', 'erkennen', 'Gefühle erkennen', 'Reconnaître les émotions'),
  T('gefuehle', 'stimmung', 'Stimmung & Check-in', 'Humeur du jour'),
  T('gefuehle', 'wut', 'Wut', 'La colère'),
  T('gefuehle', 'angst', 'Angst & Sorgen', 'Peurs et soucis'),
  T('gefuehle', 'trauer', 'Traurigkeit & Trost', 'Tristesse et réconfort'),
  T('gefuehle', 'beruhigen', 'Ruhig werden', 'Se calmer'),
  T('gefuehle', 'freude', 'Freude & Stolz', 'Joie et fierté'),

  T('verhalten', 'impulse', 'Stopp – Denken – Handeln', 'Stop – réfléchir – agir'),
  T('verhalten', 'regeln', 'Regeln & Absprachen', 'Règles et accords'),
  T('verhalten', 'selbstbeobachtung', 'Sich selbst beobachten', 'S’observer soi-même'),
  T('verhalten', 'wiedergutmachung', 'Verantwortung & Wiedergutmachung', 'Responsabilité et réparation'),
  T('verhalten', 'ziele', 'Ziele & Veränderung', 'Objectifs et changement'),
  T('verhalten', 'pausen', 'Pausen & Signale', 'Pauses et signaux'),

  T('miteinander', 'freundschaft', 'Freundschaft', 'L’amitié'),
  T('miteinander', 'konflikte', 'Konflikte lösen', 'Résoudre les conflits'),
  T('miteinander', 'mitteilen', 'Gefühle mitteilen', 'Dire ce que je ressens'),
  T('miteinander', 'grenzen', 'Grenzen & Nein sagen', 'Limites et savoir dire non'),
  T('miteinander', 'mobbing', 'Mobbing', 'Le harcèlement'),
  T('miteinander', 'empathie', 'Sich einfühlen', 'Se mettre à la place de l’autre'),
  T('miteinander', 'zusammenarbeit', 'Zusammenarbeiten', 'Coopérer'),
  T('miteinander', 'hilfe', 'Hilfe holen', 'Demander de l’aide'),

  T('lernen', 'aufmerksamkeit', 'Aufmerksamkeit', 'L’attention'),
  T('lernen', 'ordnung', 'Arbeitsplatz & Material', 'Espace de travail et matériel'),
  T('lernen', 'planen', 'Planen & Zeit', 'Planifier et gérer son temps'),
  T('lernen', 'motivation', 'Motivation & Durchhalten', 'Motivation et persévérance'),
  T('lernen', 'fehler', 'Fehler & Lernhaltung', 'Erreurs et état d’esprit'),
  T('lernen', 'pruefungen', 'Prüfungen & Lernstress', 'Examens et stress'),
  T('lernen', 'strategien', 'Lernstrategien', 'Stratégies d’apprentissage'),

  T('alltag', 'uebergaenge', 'Übergänge & Neues', 'Transitions et nouveautés'),
  T('alltag', 'tagesablauf', 'Tagesablauf & Schlaf', 'Journée et sommeil'),
  T('alltag', 'medien', 'Medien & Handy', 'Écrans et smartphone'),
  T('alltag', 'koerper', 'Körper & Pubertät', 'Corps et puberté'),
  T('alltag', 'staerken', 'Stärken & Selbstwert', 'Forces et estime de soi'),
  T('alltag', 'wohlbefinden', 'Energie & Wohlbefinden', 'Énergie et bien-être'),

  T('werkzeuge', 'verstaerker', 'Verstärkerpläne', 'Systèmes de renforcement'),
  T('werkzeuge', 'beobachtung', 'Beobachtung', 'Observation'),
  T('werkzeuge', 'gespraech', 'Gespräche führen', 'Mener un entretien'),
  T('werkzeuge', 'visuell', 'Visuelle Hilfen', 'Supports visuels'),
  T('werkzeuge', 'krise', 'Krise & Sicherheit', 'Crise et sécurité'),
  T('werkzeuge', 'gruppe', 'Klassenrat & Gruppe', 'Conseil de classe et groupe'),

  T('skills', 'ankommen', 'Ankommen & Gruppe', 'Arriver et former le groupe'),
  T('skills', 'ich', 'Wer bin ich?', 'Qui suis-je ?'),
  T('skills', 'gefuehle', 'Gefühle verstehen', 'Comprendre les émotions'),
  T('skills', 'regulieren', 'Gefühle regulieren', 'Réguler ses émotions'),
  T('skills', 'gedanken', 'Meine Gedanken', 'Mes pensées'),
  T('skills', 'kommunikation', 'Kommunikation & Grenzen', 'Communication et limites'),
  T('skills', 'schwierig', 'Wenn es schwierig wird', 'Quand c’est difficile'),
  T('skills', 'digital', 'Digitale Welt', 'Monde numérique'),
  T('skills', 'gesund', 'Gesund & stark', 'En bonne santé'),
  T('skills', 'selbstwert', 'Selbstwert & Körper', 'Estime de soi et corps'),
  T('skills', 'schule', 'Stress & Schule', 'Stress et école'),
  T('skills', 'wut', 'Wut & Impulse', 'Colère et impulsions'),
  T('skills', 'freundschaft', 'Freundschaft, Familie & Beziehungen', 'Amitié, famille et relations'),
  T('skills', 'vielfalt', 'Vielfalt & Respekt', 'Diversité et respect'),
  T('skills', 'werte', 'Werte & Entscheidungen', 'Valeurs et décisions'),
  T('skills', 'zukunft', 'Zukunft & Selbstständigkeit', 'Avenir et autonomie'),
  T('skills', 'resilienz', 'Schwere Gefühle & Resilienz', 'Émotions difficiles et résilience'),
  T('skills', 'mitbestimmung', 'Meinung & Mitbestimmung', 'Opinion et participation'),
  T('skills', 'abschluss', 'Rückblick & Abschluss', 'Bilan et clôture'),
]

export const themaById = new Map(THEMEN.map((t) => [t.bereich + '/' + t.id, t]))

export function themaLabel(bereich: Bereich, thema: string, sprache: Sprache = 'de'): string {
  const t = themaById.get(bereich + '/' + thema)
  return t ? t[sprache] : thema
}

export const STUFEN_REIHE: Stufe[] = ['C1', 'C2', 'C3', 'C4', 'ES']

/** 'C3–C4', 'C1', 'ES' … */
export function stufenText(stufen: Stufe[]): string {
  const s = [...stufen].sort((a, b) => STUFEN_REIHE.indexOf(a) - STUFEN_REIHE.indexOf(b))
  if (!s.length) return ''
  if (s.length === 1) return s[0]
  return s[0] + '–' + s[s.length - 1]
}

export function layoutFuer(stufen: Stufe[], layout?: Layout): Layout {
  if (layout) return layout
  const s = [...stufen].sort((a, b) => STUFEN_REIHE.indexOf(a) - STUFEN_REIHE.indexOf(b))[0]
  if (s === 'C1') return 'bild'
  if (s === 'C2') return 'gross'
  if (s === 'ES') return 'jugend'
  return 'mittel'
}
