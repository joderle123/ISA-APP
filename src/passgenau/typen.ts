// Passgenau – gemeinsame Typen (Vertrag zwischen Katalog, Planer, Oberfläche und Hub-Brücke).
// Grundlage: Konzept Passgenau, Abschnitte 3.4 (Profil), 4.3–4.5 (Katalog), 5 (Planer), 6.9 (Vorlieben, Ereignisse),
// 9.2 (Nachrichten), 9.3 (gespeicherter Plan). Änderungen hier nur abwärtsverträglich (neue Felder optional).
import type { Blatt } from '../blatt/typen'

export type Stufe = 'C1' | 'C2' | 'C3' | 'C4' | 'ES'
export type Layout = 'bild' | 'gross' | 'mittel' | 'jugend'
export type Sprache = 'de' | 'fr'

/** Rolle eines Schritts in der Stunde (4.3) */
export type Rolle =
  | 'ankommen' | 'einstieg' | 'kern' | 'uebung' | 'bewegung' | 'spiel' | 'regulation' | 'reflexion' | 'abschluss' | 'transfer'
/** Stelle im Lernbogen (Blatt und Folge) */
export type Bogen = 'wahrnehmen' | 'verstehen' | 'ueben' | 'uebertragen' | 'reflektieren'
export type Sozialform = 'einzeln' | 'zu-zweit' | 'gruppe' | 'klasse'
export type Einzeltauglich = 'ja' | 'angepasst' | 'nein'
export type Stufe03 = 0 | 1 | 2 | 3
export type Weg = 'gruendlich' | 'schnell' | 'leicht'
export type Tagesform = 'aufgedreht' | 'muede' | 'traurig' | 'wuetend' | 'aengstlich' | 'rueckzug' | 'will-nicht'
export type Schwerpunkt = 'verstehen' | 'ueben' | 'uebertragen' | 'selbstbild' | 'beziehung'
export type FormatWunsch = 'bewegung' | 'kreativ' | 'gespraech' | 'spiel' | 'wenig-schreiben'

export interface EldibBezug { code: string; gewicht: 1 | 0.5 }
export interface Dauer { min: number; typ: number; max: number }
export interface Altersband { von: number; bis: number }

/** Texte eines Bausteins, die der Editor ändern darf (Pfad im Baustein → Text) */
export type BausteinTexte = Record<string, string>

// ---------------------------------------------------------------------------------------------------------------
// Katalog (4.4, 4.5) – Metadaten getrennt vom Inhalt; Inhalt kommt aus den Quellen (Blätter, Kurs, Förderfach …)
// ---------------------------------------------------------------------------------------------------------------

/** Mikro-Baustein eines Blatts: Aufgabenpaket (aufgabe + folgender Baustein) oder freier Baustein. Id 'b:<blatt>:<n>' */
export interface MikroBaustein {
  id: string
  h: string
  quelle: { blatt: string; nr: string; pfad: number[] }
  art: string[]
  bogen: Bogen
  rolle: Rolle[]
  thema: string[]
  eldib: EldibBezug[]
  kompetenz: string[]
  alter: Altersband
  stufen: Stufe[]
  lesemenge: Stufe03
  schreibmenge: Stufe03
  bildanteil: Stufe03
  format: string[]
  sprache: { de: true; fr: boolean; woerter?: ('lb' | 'pt')[] }
  dauer: Dauer
  sozialform: Sozialform[]
  einzeltauglich: Einzeltauglich
  differenzierung?: { niveaus: 1 | 3; leichter?: BausteinTexte; schwerer?: BausteinTexte }
  energie: 1 | 2 | 3
  belastung: 0 | 1 | 2
  material: string[]
  hoehe: Partial<Record<Layout, number>>
  braucht?: string[]
  allgemein?: BausteinTexte
  platzhalter?: ('NAME' | 'INTERESSE' | 'WOCHENZIEL')[]
  textfelder: { pfad: string; max: number }[]
  sensibel?: 'kinderschutz' | 'akut' | 'familie' | 'koerper'
  qualitaet: 'geprueft' | 'entwurf'
  sicher: Record<string, number>
}

export type SchrittQuelle = 'kurs' | 'foerderfach' | 'material' | 'spielschule' | 'crew' | 'freude' | 'ritual' | 'praxis'

/** Stundenschritt (Kurs 'k:', Förderfach 'f:', Material 'm:', Spielschule 's:', CREW 'c:', Freude 'fb:', Ritual 'r:') */
export interface Stundenschritt {
  id: string
  h: string
  quelle: { art: SchrittQuelle; einheit?: string; titel: string }
  titel: string
  text: string
  sagen?: string[]
  wennEsKippt?: string
  tipp?: string
  einzelvariante?: { text: string; sagen?: string[] }
  rolle: Rolle[]
  phase?: string
  bogen?: Bogen
  thema: string[]
  eldib: EldibBezug[]
  kompetenz: string[]
  alter: Altersband
  stufen: Stufe[]
  dauer: Dauer
  sozialform: Sozialform[]
  einzeltauglich: Einzeltauglich
  gruppe?: {
    min: number; max: number; differenzierbar: boolean
    niveaus?: { leichter?: string; schwerer?: string }
    rollen?: { name: string; passt?: string[] }[]
  }
  energie: 1 | 2 | 3
  belastung: 0 | 1 | 2
  reiz: 0 | 1 | 2
  format: string[]
  material: string[]
  ort?: 'raum' | 'turnhalle' | 'draussen'
  blatt?: string[]
  voraussetzungen?: { eldib?: string[]; schritt?: string[] }
  kombinierbar?: { nicht_mit?: string[]; gut_nach?: string[] }
  sprache: { de: true; fr: boolean }
  /** Texte auf Französisch, wo vorhanden */
  fr?: { titel: string; text: string; sagen?: string[]; wennEsKippt?: string; einzelvariante?: { text: string; sagen?: string[] } }
  /** „Freude & Beziehung“, Rituale: darf in Weg 3 (ohne Bezug zu Förderzielen) */
  ohneZiel?: boolean
  /** Tagesform-Chips aus Weg 3, zu denen der Schritt besonders passt */
  tagesform?: Tagesform[]
  qualitaet: 'geprueft' | 'entwurf'
  sicher: Record<string, number>
}

export type KatalogEintrag = ({ typ: 'baustein' } & MikroBaustein) | ({ typ: 'schritt' } & Stundenschritt)

// ---------------------------------------------------------------------------------------------------------------
// Profil (3.4) – Hub → Toolbox, nur abgeleitete Merkmale
// ---------------------------------------------------------------------------------------------------------------

export interface ProfilZiel { code: string; ich: string; quelle: 'pei' | 'eldib' | 'vorgemerkt' | 'andere'; seit?: string; prio: number }
export interface ProfilThema { key: string; art: 'vorfall' | 'notiz' | 'beobachtung' | 'gespraech' | 'reunion' | 'screening' | 'klassenbuch'; datum: string }

export interface Profil {
  v: 1
  ref: string
  erstellt: string
  /** Vorname nur mit Haken „Vorname einsetzen“ – sonst null */
  anrede: string | null
  /** Vorname für die Oberfläche und das Planblatt der Fachkraft (nie aufs Kinderblatt ohne Haken) */
  vorname?: string
  alterJahre: number
  stufen: Stufe[]
  layout: Layout
  sprache: { blatt: Sprache; woerter: ('lb' | 'pt')[] }
  zugang: { lesen: Stufe03; schreiben: Stufe03; bild: 1 | 2 | 3; tempo: 'ruhig' | 'normal'; struktur: 'normal' | 'hoch'; quelle: string[] }
  ziele: ProfilZiel[]
  erreicht: string[]
  themen: ProfilThema[]
  vorsicht: ('familie' | 'trauer' | 'koerper' | 'heikel')[]
  interessen: string[]
  wochenziel: string | null
  gemacht: { id: string; am: string }[]
  folge: { id: string; titel: string; n: number; gehalten: number } | null
  vorlieben: VorliebenKind | null
  rituale?: { ankommen?: string; abschluss?: string }
  /** Quellen für „Das weiß ich schon“ (Anzeige): je Zeile Text, Quelle-Art und Datum – nie Werte oder Notiztexte */
  wissen?: { gruppe: string; text: string; quelle: string; datum?: string }[]
  rechte: { speichern: boolean; rueckmelden: boolean }
}

// ---------------------------------------------------------------------------------------------------------------
// Auftrag und Ergebnis (2.3–2.6, 5)
// ---------------------------------------------------------------------------------------------------------------

export interface Heute { energie: number; konzentration: number; stimmung: number }

export interface Auftrag {
  weg: Weg
  /** Ziel-Codes in Reihenfolge der Priorität (Weg 1/2) */
  ziele: string[]
  n: number
  dauer: 10 | 20 | 30 | 45 | 60
  sozialform: 'einzeln' | 'zu-zweit' | 'kleingruppe'
  schwerpunkt?: Schwerpunkt[]
  formate?: FormatWunsch[]
  heute?: Heute
  tagesform?: Tagesform
  sprache: Sprache
  /** Datum der Planung (ISO), Teil des festen Zufallswerts */
  datum: string
  /** Ort/Material außerhalb des Standards erlaubt */
  ort?: ('turnhalle' | 'draussen')[]
}

export interface PlanSchritt {
  ref: string
  h: string
  rolle: Rolle
  min: number
  warum?: string[]
  erkundung?: boolean
  gesperrt?: boolean
  ueber?: BausteinTexte
}

export interface BlattTeil { ref: string; h: string; ueber?: BausteinTexte; ausgeblendet?: string[]; gesperrt?: boolean }

export interface Sitzung {
  nr: number
  phase: Bogen | 'leicht'
  status: 'geplant' | 'gehalten' | 'angepasst'
  datum: string | null
  schritte: PlanSchritt[]
  blatt: { titel: string; bausteine: BlattTeil[] } | null
  hinweise?: string[]
  rueckmeldung: Rueckmeldung | null
}

export interface Plan {
  id: string
  erstellt: string
  von?: string
  weg: Weg
  gewichte: string
  titel: string
  ziele: string[]
  n: number
  dauer: number
  vorlage: string | null
  kinder: string[]
  auftrag?: Auftrag
  sitzungen: Sitzung[]
}

export interface Rueckmeldung {
  ergebnis: 'geklappt' | 'teils' | 'nicht'
  ziele?: { code: string; richtung: 'gelingt' | 'mit-hilfe' | 'noch-nicht' }[]
  chips?: string[]
  am: string
}

/** Eine Alternative beim Antippen (5.8) */
export interface Alternative { eintrag: KatalogEintrag; wert: number; warum: string[] }

// ---------------------------------------------------------------------------------------------------------------
// Vorlieben und Ereignisse (6.9)
// ---------------------------------------------------------------------------------------------------------------

export interface Zaehler { a: number; b: number; t: string }
export interface VorliebenFachkraft { v: 1; erkundung: number; zurueckgesetzt?: string | null; z: Record<string, Zaehler>; eigeneVorlagen?: { id: string; titel: string; inhalt: Plan }[] }
export interface VorliebenKind { v: 1; prior?: Record<string, [number, number]>; z: Record<string, Zaehler>; zurueckgesetzt: string | null }
export interface TeamZaehler { n: number; hoch: number; runter: number; geklappt: number; teils: number; nicht: number }
export interface VorliebenTeam { z: Record<string, TeamZaehler>; personen: number }

export type EreignisArt =
  | 'geklappt' | 'teils' | 'nicht' | 'daumen_hoch' | 'daumen_runter' | 'ersetzt' | 'geloescht' | 'gedruckt' | 'ziel_richtung'
export type DaumenGrund = 'zu-lang' | 'zu-kindlich' | 'zu-schwer' | 'passt-nicht' | 'mag-nicht' | 'passt-gut'

export interface Ereignis {
  id: string
  v: 1
  t: string
  art: EreignisArt
  kind: string | null
  fachkraft: string | null
  kinder: number
  plan: string | null
  sitzung: number | null
  weg: Weg | null
  baustein: string | null
  h: string | null
  vorlage: string | null
  tags: { rolle?: Rolle; format?: string[]; quelle?: string; thema?: string[]; laenge?: 'kurz' | 'mittel' | 'lang'; lesen?: number; schreiben?: number }
  ziel: string | null
  richtung: 'gelingt' | 'mit-hilfe' | 'noch-nicht' | null
  wert: number
  grund: DaumenGrund | null
  ersatz: string | null
  tagesform: { e: number; k: number; s: number } | null
  altersband: string | null
}

/** Was im Dossier unter d.passgenau steht (9.3) */
export interface DossierPassgenau {
  v: 1
  kind: { interessen: string[]; korrekturen: Record<string, unknown>; rituale: { ankommen?: string; abschluss?: string }; vorname: boolean }
  vorlieben: VorliebenKind | null
  ereignisse: Ereignis[]
  plaene: Plan[]
}

// ---------------------------------------------------------------------------------------------------------------
// Nachrichten Toolbox ↔ Hub (9.2)
// ---------------------------------------------------------------------------------------------------------------

export type HubOp =
  | 'hallo' | 'profil' | 'speichern' | 'rueckmeldung' | 'vorlieben'
  | 'praxis-liste' | 'praxis-pruefen' | 'praxis-teilen' | 'praxis-signal' | 'praxis-kuratieren'
export interface HubFrage { cdsePassgenau: 1; n: number; op: HubOp; arg?: unknown }
export interface HubAntwort { cdsePassgenau: 1; antwort: true; n: number; ok: boolean; erg?: unknown; grund?: string }

/** Vorlage „Aus der Praxis“ (8) – ein Plan ohne Kind */
export interface PraxisVorlage {
  id: string
  version: number
  status: 'eingereicht' | 'sichtbar' | 'freigegeben' | 'offiziell' | 'ausgeblendet'
  titel: string
  fuerWen?: string
  von: string | null
  altersband: string
  ziele: string[]
  themen: string[]
  formate: string[]
  dauer: number
  n: number
  sprachen: Sprache[]
  inhalt: Plan
  zaehler?: TeamZaehler
  erstellt: string
}

/** Kinderblatt, wie es der Renderer bekommt: ein synthetisches Blatt (7.5) */
export type KinderBlatt = Blatt
