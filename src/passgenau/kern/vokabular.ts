// Passgenau – gemeinsames Vokabular (Konzept 4.3): Themen-Schlüssel wie material.js im Hub, Kompetenzfelder,
// Formate, Rollen, Tagesform. Wird vom Katalog-Skript (Vorbefüllung) und vom Planer (Begründungen) genutzt.
import type { Bogen, Rolle, Sprache, Tagesform } from '../typen'

/** Themen wie THEMEN in hub-quellen/material.js (Schlüssel, Name, heikel, Bereich/Thema der Blätter,
 *  Themen der Materialien). `woerter`: Wortanfänge nach norm() (wie dort; „=wort“ nur ganzes Wort). */
export interface ThemaDef {
  key: string
  name: string
  fr: string
  heikel?: 'kinderschutz' | 'akut'
  blaetter: string[]
  material: string[]
  woerter: string[]
}

export const THEMEN: ThemaDef[] = [
  { key: 'sexualitaet', name: 'Sexualität & Grenzen', fr: 'Sexualité et limites', heikel: 'kinderschutz',
    blaetter: ['Skills-Kurs/Liebe, Sexualität & Einvernehmlichkeit'], material: ['Sexualität'],
    woerter: ['sexu', 'porno', 'nackt', 'sexting', 'intim', 'genital', 'masturb', 'sexuel'] },
  { key: 'kinderschutz', name: 'Gewalt oder Vernachlässigung zu Hause', fr: 'Violence ou négligence', heikel: 'kinderschutz',
    blaetter: [], material: [], woerter: ['missbrauch', 'misshandl', 'vernachlass', 'maltrait', 'abus'] },
  { key: 'suizid', name: 'Selbstverletzung & Suizidgedanken', fr: 'Automutilation et idées suicidaires', heikel: 'akut',
    blaetter: [], material: [], woerter: ['ritzt', 'ritzen', 'selbstverletz', 'suizid', 'selbstmord', 'suicid', 'scarif'] },
  { key: 'gewalt', name: 'Gewalt & Aggression', fr: 'Violence et agressivité',
    blaetter: ['Gefühle/Wut', 'Verhalten/Stopp – Denken – Handeln', 'Skills-Kurs/Wut & Impulse', 'Miteinander/Konflikte lösen', 'Verhalten/Verantwortung & Wiedergutmachung'],
    material: ['Gewalt', 'Konfliktlösung', 'Impulskontrolle'],
    woerter: ['schlag', 'geschlagen', 'prugel', 'kampf', 'schubs', 'gewalt', 'aggress', 'droh', 'bedroh', 'zerstor', 'violen', 'agress', 'bagarre'] },
  { key: 'wut', name: 'Wut & Impulse', fr: 'Colère et impulsions',
    blaetter: ['Gefühle/Wut', 'Skills-Kurs/Wut & Impulse', 'Verhalten/Stopp – Denken – Handeln', 'Gefühle/Ruhig werden', 'Verhalten/Pausen & Signale'],
    material: ['Impulskontrolle', 'Emotionen', 'Stressbewältigung'],
    woerter: ['wut', 'wutend', 'wutanfall', 'ausrast', 'explodier', 'zorn', 'impuls', 'colere', 'stopp-ampel', 'wutvulkan'] },
  { key: 'mobbing', name: 'Mobbing & Ausgrenzung', fr: 'Harcèlement et exclusion',
    blaetter: ['Miteinander/Mobbing', 'Miteinander/Hilfe holen', 'Miteinander/Freundschaft', 'Skills-Kurs/Vielfalt & Respekt'],
    material: ['Mobbing', 'Gruppendruck', 'Beziehungsaufbau'],
    woerter: ['mobb', 'ausgeschlossen', 'ausgrenz', 'ausgelach', 'beleidig', 'cyber', 'auslach', 'harcel', 'exclu'] },
  { key: 'angst', name: 'Angst & Sorgen', fr: 'Peurs et soucis',
    blaetter: ['Gefühle/Angst & Sorgen', 'Gefühle/Ruhig werden', 'Lernen & Selbstorganisation/Prüfungen & Lernstress', 'Skills-Kurs/Stress & Schule'],
    material: ['Stressbewältigung', 'Achtsamkeit', 'Emotionen'],
    woerter: ['angst', 'angstlich', 'sorge', 'panik', '=furcht', 'nervos', '=peur', 'anxi', 'inquiet', 'mut-leiter', 'mutig'] },
  { key: 'traurig', name: 'Traurigkeit & Rückzug', fr: 'Tristesse et repli',
    blaetter: ['Gefühle/Traurigkeit & Trost', 'Skills-Kurs/Schwere Gefühle & Resilienz', 'Gefühle/Stimmung & Check-in', 'Alltag/Energie & Wohlbefinden'],
    material: ['Psychische Gesundheit', 'Emotionen', 'Ressourcen'],
    woerter: ['traurig', 'weinen', 'niedergeschlagen', 'ruckzug', 'einsam', 'triste', 'trost'] },
  { key: 'aufmerksamkeit', name: 'Konzentration & Unruhe', fr: 'Concentration et agitation',
    blaetter: ['Lernen & Selbstorganisation/Aufmerksamkeit', 'Verhalten/Pausen & Signale', 'Verhalten/Sich selbst beobachten', 'Lernen & Selbstorganisation/Arbeitsplatz & Material'],
    material: ['Achtsamkeit', 'Disziplin', 'Selbstwahrnehmung'],
    woerter: ['konzentr', 'abgelenkt', 'aufmerksam', 'zappel', 'unruhig', 'concentr', 'distrait', 'agite'] },
  { key: 'lernen', name: 'Motivation & Lernen', fr: 'Motivation et apprentissage',
    blaetter: ['Lernen & Selbstorganisation/Motivation & Durchhalten', 'Lernen & Selbstorganisation/Fehler & Lernhaltung', 'Lernen & Selbstorganisation/Prüfungen & Lernstress', 'Lernen & Selbstorganisation/Lernstrategien', 'Lernen & Selbstorganisation/Planen & Zeit'],
    material: ['Motivation', 'Ressourcen'],
    woerter: ['motiv', 'hausaufgab', 'prufung', 'durchhalt', 'lernstrateg', 'aufschieb', 'devoirs'] },
  { key: 'schule', name: 'Schule meiden & Fehlzeiten', fr: 'Évitement scolaire',
    blaetter: ['Gefühle/Angst & Sorgen', 'Alltag/Übergänge & Neues', 'Lernen & Selbstorganisation/Motivation & Durchhalten'],
    material: ['Stressbewältigung', 'Resilienz', 'Motivation'],
    woerter: ['schulangst', 'schulvermeid', 'schwanz', 'absent'] },
  { key: 'medien', name: 'Handy & Medien', fr: 'Smartphone et écrans',
    blaetter: ['Alltag/Medien & Handy', 'Skills-Kurs/Digitale Welt'], material: ['Medien'],
    woerter: ['handy', 'smartphone', 'tiktok', 'instagram', 'snapchat', 'whatsapp', 'youtube', 'gaming', 'online', 'internet', 'bildschirm', 'social media', 'ecran'] },
  { key: 'freundschaft', name: 'Freundschaft & Streit', fr: 'Amitié et disputes',
    blaetter: ['Miteinander/Freundschaft', 'Miteinander/Konflikte lösen', 'Miteinander/Gefühle mitteilen', 'Miteinander/Zusammenarbeiten', 'Skills-Kurs/Freundschaft, Familie & Beziehungen'],
    material: ['Konfliktlösung', 'Beziehungsaufbau', 'Kooperation', 'Kommunikation'],
    woerter: ['streit', 'konflikt', '=freund', '=freunde', '=freundin', 'freundschaft', 'eifersucht', 'dispute', 'conflit', '=ami', '=amis'] },
  { key: 'regeln', name: 'Regeln & Respekt', fr: 'Règles et respect',
    blaetter: ['Verhalten/Regeln & Absprachen', 'Verhalten/Verantwortung & Wiedergutmachung', 'Verhalten/Ziele & Veränderung', 'Werkzeuge für Fachkräfte/Verstärkerpläne', 'Verhalten/Stopp – Denken – Handeln'],
    material: ['Disziplin', 'Gerechtigkeit', 'Impulskontrolle'],
    woerter: ['=regel', '=regeln', 'respekt', 'unterbricht', 'provoz', 'wiedergutmach', '=regle', 'regles', 'respect'] },
  { key: 'selbstwert', name: 'Selbstwert & Selbstvertrauen', fr: 'Estime de soi et confiance',
    blaetter: ['Alltag/Stärken & Selbstwert', 'Skills-Kurs/Selbstwert & Körper', 'Gefühle/Freude & Stolz', 'Skills-Kurs/Wer bin ich?'],
    material: ['Selbstwertgefühl', 'Ressourcen', 'Identität'],
    woerter: ['selbstwert', 'selbstbewus', 'selbstvertrau', 'schuchtern', 'starken', 'stolz', 'confiance', 'timide', 'estime'] },
  { key: 'koerper', name: 'Körperbild & Essen', fr: 'Image du corps et alimentation',
    blaetter: ['Alltag/Körper & Pubertät', 'Skills-Kurs/Selbstwert & Körper'], material: ['Körper & Selbstbild'],
    woerter: ['korperbild', 'essstor', '=diat', 'pubertat', 'figur', 'poids'] },
  { key: 'sucht', name: 'Alkohol, Rauchen & Drogen', fr: 'Alcool, tabac et drogues',
    blaetter: ['Skills-Kurs/Alkohol, Vapes & Cannabis'], material: ['Sucht & Prävention', 'Gruppendruck'],
    woerter: ['alkohol', 'rauch', 'zigarett', '=vape', 'shisha', 'cannabis', 'kiff', 'drogen', 'alcool', 'drogue'] },
  { key: 'schlaf', name: 'Müdigkeit & Schlaf', fr: 'Fatigue et sommeil',
    blaetter: ['Alltag/Tagesablauf & Schlaf', 'Alltag/Energie & Wohlbefinden'], material: ['Ressourcen', 'Achtsamkeit'],
    woerter: ['=mude', 'einschlaf', 'schlaf', 'erschopft', 'fatigue', 'sommeil'] },
  { key: 'familie', name: 'Familie & Veränderungen', fr: 'Famille et changements',
    blaetter: ['Alltag/Übergänge & Neues', 'Gefühle/Traurigkeit & Trost', 'Skills-Kurs/Freundschaft, Familie & Beziehungen'],
    material: ['Resilienz', 'Emotionen', 'Beziehungsaufbau'],
    woerter: ['trennung', 'scheidung', 'getrennt', 'umzug', '=tod', 'gestorben', 'verstorben', 'trauer', 'geschwister', 'divorce', 'deces', 'deuil'] },
  { key: 'vielfalt', name: 'Vielfalt & Diskriminierung', fr: 'Diversité et discrimination',
    blaetter: ['Skills-Kurs/Vielfalt & Respekt'], material: ['Vielfalt & Diskriminierung', 'Gerechtigkeit'],
    woerter: ['rassis', 'diskrimin', 'vielfalt', 'vorurteil', 'racis', 'discrimin'] },
  { key: 'gefuehle', name: 'Gefühle erkennen & zeigen', fr: 'Reconnaître et montrer ses émotions',
    blaetter: ['Gefühle/Gefühle erkennen', 'Miteinander/Gefühle mitteilen', 'Miteinander/Sich einfühlen', 'Gefühle/Stimmung & Check-in', 'Skills-Kurs/Gefühle verstehen'],
    material: ['Emotionen', 'Fremdwahrnehmung', 'Selbstwahrnehmung'],
    woerter: ['gefuhl', 'emotion', 'sentiment', 'gefuhlsrad'] },
]

export const themaByKey = new Map(THEMEN.map((t) => [t.key, t]))

/** Passt ein normierter Text auf die Wortliste eines Themas? (Wortanfang; „=wort“ ganzes Wort) */
export function themaTreffer(t: ThemaDef, textNorm: string): number {
  let n = 0
  for (const w of t.woerter) {
    const ganz = w.startsWith('=')
    const wort = ganz ? w.slice(1) : w
    const re = new RegExp('(^|[^a-z0-9])' + wort.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (ganz ? '($|[^a-z0-9])' : ''), 'g')
    const m = textNorm.match(re)
    if (m) n += m.length
  }
  return n
}

// --- Kompetenzfelder ------------------------------------------------------------------------------------------------

export type Kompetenz =
  | 'gefuehle-erkennen' | 'gefuehle-ausdruecken' | 'selbstregulation' | 'impulskontrolle' | 'aufmerksamkeit' | 'ausdauer'
  | 'kooperation' | 'konflikte' | 'kommunikation' | 'selbstbild' | 'lernstrategien' | 'alltag'

export const KOMPETENZ_NAME: Record<Kompetenz, Record<Sprache, string>> = {
  'gefuehle-erkennen': { de: 'Gefühle erkennen', fr: 'Reconnaître les émotions' },
  'gefuehle-ausdruecken': { de: 'Gefühle ausdrücken', fr: 'Exprimer ses émotions' },
  selbstregulation: { de: 'Selbstregulation', fr: 'Autorégulation' },
  impulskontrolle: { de: 'Impulskontrolle', fr: 'Contrôle des impulsions' },
  aufmerksamkeit: { de: 'Aufmerksamkeit', fr: 'Attention' },
  ausdauer: { de: 'Ausdauer & Arbeitsverhalten', fr: 'Persévérance' },
  kooperation: { de: 'Kooperation', fr: 'Coopération' },
  konflikte: { de: 'Konflikte', fr: 'Conflits' },
  kommunikation: { de: 'Kommunikation', fr: 'Communication' },
  selbstbild: { de: 'Selbstbild', fr: 'Image de soi' },
  lernstrategien: { de: 'Lernstrategien', fr: 'Stratégies d’apprentissage' },
  alltag: { de: 'Alltag & Selbstständigkeit', fr: 'Quotidien et autonomie' },
}

/** Blatt-Thema (Bereich/Thema-Id) → Kompetenzfelder. */
export const KOMPETENZ_BLATT: Record<string, Kompetenz[]> = {
  'gefuehle/erkennen': ['gefuehle-erkennen'], 'gefuehle/stimmung': ['gefuehle-erkennen'], 'gefuehle/wut': ['impulskontrolle', 'selbstregulation'],
  'gefuehle/angst': ['selbstregulation', 'gefuehle-ausdruecken'], 'gefuehle/trauer': ['gefuehle-ausdruecken'], 'gefuehle/beruhigen': ['selbstregulation'],
  'gefuehle/freude': ['selbstbild', 'gefuehle-ausdruecken'],
  'verhalten/impulse': ['impulskontrolle'], 'verhalten/regeln': ['kooperation', 'impulskontrolle'], 'verhalten/selbstbeobachtung': ['selbstregulation'],
  'verhalten/wiedergutmachung': ['konflikte'], 'verhalten/ziele': ['ausdauer'], 'verhalten/pausen': ['selbstregulation', 'aufmerksamkeit'],
  'miteinander/freundschaft': ['kooperation', 'kommunikation'], 'miteinander/konflikte': ['konflikte'], 'miteinander/mitteilen': ['gefuehle-ausdruecken', 'kommunikation'],
  'miteinander/grenzen': ['kommunikation'], 'miteinander/mobbing': ['konflikte'], 'miteinander/empathie': ['gefuehle-erkennen'],
  'miteinander/zusammenarbeit': ['kooperation'], 'miteinander/hilfe': ['kommunikation'], 'miteinander/sprechen': ['kommunikation'],
  'lernen/aufmerksamkeit': ['aufmerksamkeit'], 'lernen/ordnung': ['ausdauer'], 'lernen/planen': ['ausdauer', 'lernstrategien'], 'lernen/motivation': ['ausdauer'],
  'lernen/fehler': ['selbstbild', 'lernstrategien'], 'lernen/pruefungen': ['selbstregulation', 'lernstrategien'], 'lernen/strategien': ['lernstrategien'],
  'lernen/grundlagen': ['aufmerksamkeit'],
  'alltag/uebergaenge': ['alltag'], 'alltag/tagesablauf': ['alltag'], 'alltag/medien': ['alltag', 'selbstregulation'], 'alltag/koerper': ['selbstbild'],
  'alltag/staerken': ['selbstbild'], 'alltag/wohlbefinden': ['selbstregulation'], 'alltag/selbststaendig': ['alltag'],
  'werkzeuge/verstaerker': ['ausdauer'], 'werkzeuge/beobachtung': ['selbstregulation'], 'werkzeuge/gespraech': ['kommunikation'],
  'werkzeuge/visuell': ['alltag'], 'werkzeuge/krise': ['selbstregulation'], 'werkzeuge/gruppe': ['kooperation'],
  'skills/ankommen': ['kooperation'], 'skills/ich': ['selbstbild'], 'skills/gefuehle': ['gefuehle-erkennen'], 'skills/regulieren': ['selbstregulation'],
  'skills/gedanken': ['selbstregulation'], 'skills/kommunikation': ['kommunikation'], 'skills/schwierig': ['selbstregulation'], 'skills/digital': ['alltag'],
  'skills/gesund': ['alltag'], 'skills/selbstwert': ['selbstbild'], 'skills/schule': ['lernstrategien', 'selbstregulation'], 'skills/wut': ['impulskontrolle'],
  'skills/freundschaft': ['kooperation', 'kommunikation'], 'skills/vielfalt': ['kooperation'], 'skills/werte': ['selbstbild'], 'skills/zukunft': ['alltag'],
  'skills/resilienz': ['selbstregulation'], 'skills/mitbestimmung': ['kommunikation'], 'skills/liebe': ['kommunikation'], 'skills/risiko': ['alltag'],
  'skills/abschluss': ['selbstbild'],
  'selbstreflexion/beduerfnisse': ['selbstbild'], 'selbstreflexion/balance': ['selbstbild'], 'selbstreflexion/werte': ['selbstbild'],
  'selbstreflexion/rhythmus': ['alltag'], 'selbstreflexion/einfluss': ['selbstregulation'], 'selbstreflexion/rueckblick': ['selbstbild'],
  'spielschule/ich': ['selbstbild'], 'spielschule/gefuehle': ['gefuehle-erkennen'], 'spielschule/koerper': ['selbstbild'], 'spielschule/familie': ['kommunikation'],
}

/** Skills-Themen auf einen sichtbaren Bereich abbilden (das Kinderblatt zeigt nie „Skills-Kurs“). */
export const SKILLS_BEREICH: Record<string, [string, string]> = {
  ankommen: ['miteinander', 'zusammenarbeit'], ich: ['alltag', 'staerken'], gefuehle: ['gefuehle', 'erkennen'], regulieren: ['gefuehle', 'beruhigen'],
  gedanken: ['selbstreflexion', 'einfluss'], kommunikation: ['miteinander', 'sprechen'], schwierig: ['gefuehle', 'beruhigen'], digital: ['alltag', 'medien'],
  gesund: ['alltag', 'wohlbefinden'], selbstwert: ['alltag', 'staerken'], schule: ['lernen', 'pruefungen'], wut: ['gefuehle', 'wut'],
  freundschaft: ['miteinander', 'freundschaft'], vielfalt: ['miteinander', 'empathie'], werte: ['selbstreflexion', 'werte'], zukunft: ['alltag', 'uebergaenge'],
  resilienz: ['gefuehle', 'trauer'], mitbestimmung: ['miteinander', 'sprechen'], liebe: ['alltag', 'koerper'], risiko: ['alltag', 'wohlbefinden'],
  abschluss: ['selbstreflexion', 'rueckblick'],
}

/** ELDiB-Code → Kompetenzfeld (für Titel und Begründungen). */
export function kompetenzAusCode(code: string): Kompetenz {
  const [d, nStr] = code.split('-')
  const n = Number(nStr)
  if (d === 'V') {
    if ([10, 11, 20, 21, 26].includes(n)) return 'impulskontrolle'
    if (n <= 9) return 'aufmerksamkeit'
    if ([13, 15, 29].includes(n)) return 'ausdauer'
    if ([14, 22, 30].includes(n)) return 'selbstbild'
    if ([16, 17, 31].includes(n)) return 'kooperation'
    if ([18, 28].includes(n)) return 'konflikte'
    if (n === 12) return 'selbstregulation'
    return 'selbstregulation'
  }
  if (d === 'K') {
    if ([16, 21].includes(n)) return 'gefuehle-erkennen'
    if ([26, 15].includes(n)) return 'gefuehle-ausdruecken'
    if ([18, 19, 22, 24, 32].includes(n)) return 'selbstbild'
    if ([31, 25].includes(n)) return 'konflikte'
    return 'kommunikation'
  }
  if (d === 'SOZ') {
    if ([14, 19].includes(n)) return 'impulskontrolle'
    if ([37, 21].includes(n)) return 'gefuehle-erkennen'
    if ([34, 23].includes(n)) return 'konflikte'
    if ([9, 40, 35].includes(n)) return 'selbstbild'
    if ([12, 15, 33, 41].includes(n)) return 'kommunikation'
    return 'kooperation'
  }
  if (n <= 6) return 'aufmerksamkeit'
  return 'lernstrategien'
}

// --- Namen für Oberfläche, Plan und Begründungen ----------------------------------------------------------------------

export const ROLLE_NAME: Record<Rolle, Record<Sprache, string>> = {
  ankommen: { de: 'Ankommen', fr: 'Arrivée' },
  einstieg: { de: 'Einstieg', fr: 'Entrée en matière' },
  kern: { de: 'Kern', fr: 'Cœur de séance' },
  uebung: { de: 'Übung · Blatt', fr: 'Exercice · fiche' },
  bewegung: { de: 'Bewegung', fr: 'Mouvement' },
  spiel: { de: 'Spiel', fr: 'Jeu' },
  regulation: { de: 'Ruhe & Regulation', fr: 'Calme et régulation' },
  reflexion: { de: 'Reflexion', fr: 'Réflexion' },
  abschluss: { de: 'Abschluss', fr: 'Clôture' },
  transfer: { de: 'Transfer', fr: 'Transfert' },
}

export const BOGEN_NAME: Record<Bogen | 'leicht', Record<Sprache, string>> = {
  wahrnehmen: { de: 'Wahrnehmen', fr: 'Percevoir' },
  verstehen: { de: 'Verstehen', fr: 'Comprendre' },
  ueben: { de: 'Üben', fr: 'S’exercer' },
  uebertragen: { de: 'Übertragen', fr: 'Transférer' },
  reflektieren: { de: 'Rückblick & Feiern', fr: 'Bilan et fête' },
  leicht: { de: 'Heute leicht', fr: 'Aujourd’hui en douceur' },
}

export const FORMAT_NAME: Record<string, string> = {
  schreiben: 'Schreibaufgaben', ankreuzen: 'Ankreuzen', malen: 'Malen', basteln: 'Basteln', lesen: 'Lesen', geschichte: 'Geschichten',
  comic: 'Comics', gespraech: 'Gespräch', rollenspiel: 'Rollenspiel', bewegung: 'Bewegung', spiel: 'Spiele', musik: 'Musik', sinne: 'Sinne',
  atmen: 'Atmen & Ruhe', denkmodell: 'Denkmodelle (Ampel, Thermometer)', plan: 'Pläne', karten: 'Bildkarten', digital: 'Digitales',
}

export const TAGESFORM_NAME: Record<Tagesform, string> = {
  aufgedreht: 'aufgedreht', muede: 'müde', traurig: 'traurig', wuetend: 'wütend', aengstlich: 'ängstlich', rueckzug: 'zieht sich zurück', 'will-nicht': 'will nicht',
  aufgewuehlt: 'aufgewühlt',
}

/** Formate, die zu einer Tagesform in Weg 3 passen (5.7). */
export const TAGESFORM_FORMATE: Record<Tagesform, string[]> = {
  aufgedreht: ['bewegung', 'spiel'],
  muede: ['malen', 'musik', 'sinne', 'spiel'],
  // traurig und zieht sich zurück: kein Gespräch, nichts aufarbeiten (P8)
  traurig: ['malen', 'spiel', 'karten', 'musik'],
  wuetend: ['bewegung', 'musik'],
  aengstlich: ['sinne', 'spiel', 'karten', 'atmen'],
  rueckzug: ['malen', 'basteln', 'spiel'],
  'will-nicht': ['karten', 'malen', 'spiel'],
  // aufgewühlt: Kraft → Rhythmus → Ruhe, ohne Wettkampf (P8, P9)
  aufgewuehlt: ['bewegung', 'musik', 'sinne', 'atmen'],
}

/** Interessen (feste Chips) mit Suchwörtern für Platzhalter und Interessen-Motive. */
export const INTERESSEN: Record<string, { de: string; fr: string; woerter: string[] }> = {
  fussball: { de: 'Fußball', fr: 'le foot', woerter: ['fussball', 'fussballspiel', 'torwart'] },
  basketball: { de: 'Basketball', fr: 'le basket', woerter: ['basketball', 'korb'] },
  tiere: { de: 'Tiere', fr: 'les animaux', woerter: ['tier', 'hund', 'katze', 'pferd'] },
  pferde: { de: 'Pferde', fr: 'les chevaux', woerter: ['pferd', 'reiten'] },
  zeichnen: { de: 'Zeichnen', fr: 'le dessin', woerter: ['zeichn', 'malen', 'male '] },
  bauen: { de: 'Bauen', fr: 'les constructions', woerter: ['bauen', 'lego', 'klotz', 'turm'] },
  musik: { de: 'Musik', fr: 'la musique', woerter: ['musik', 'lied', 'sing', 'rhythmus'] },
  tanzen: { de: 'Tanzen', fr: 'la danse', woerter: ['tanz'] },
  gaming: { de: 'Gaming', fr: 'les jeux vidéo', woerter: ['gaming', 'videospiel', 'zocken', 'konsole'] },
  natur: { de: 'Natur', fr: 'la nature', woerter: ['natur', 'wald', 'baum'] },
  kochen: { de: 'Kochen', fr: 'la cuisine', woerter: ['kochen', 'backen', 'rezept'] },
  autos: { de: 'Autos', fr: 'les voitures', woerter: ['auto', 'fahrzeug'] },
  weltall: { de: 'Weltall', fr: 'l’espace', woerter: ['weltall', 'rakete', 'planet', 'stern'] },
  lesen: { de: 'Lesen', fr: 'la lecture', woerter: ['buch', 'lesen'] },
  basteln: { de: 'Basteln', fr: 'le bricolage', woerter: ['basteln', 'schneid', 'kleb'] },
  radfahren: { de: 'Radfahren', fr: 'le vélo', woerter: ['fahrrad', 'rad '] },
}

/** Name eines Interessen-Chips (unbekannte Schlüssel: der Schlüssel selbst, groß geschrieben). */
export function interesseName(key: string, sprache: Sprache = 'de'): string {
  const i = INTERESSEN[key]
  return i ? i[sprache] : key.charAt(0).toUpperCase() + key.slice(1)
}

/** Wortliste Katharsis (E-M16): „Wut rauslassen“, auf Kissen schlagen u. Ä. – solche Schritte schlägt Passgenau nie vor.
 *  Gilt für den Katalog (Phase 0), die neuen Inhalte beim Laden und das Prüfskript. */
export const KATHARSIS_RE =
  /(rauslassen|herauslassen|heraus lassen|raus lassen|abreagier|dampf ablassen|so fest wie (die|deine|eure) wut|auf ein kissen|kissen (schlagen|boxen|hauen)|boxsack|wut (an|in|auf) .{0,25}(auslassen|rauslassen)|(se )?défoul|évacuer (la|sa|ta) colère|taper (sur|dans) (un|le) coussin)/i
