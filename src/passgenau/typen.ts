// Passgenau – gemeinsame Typen (Vertrag zwischen Katalog, Planer, Oberfläche und Hub-Brücke).
// Grundlage: Konzept Passgenau, Abschnitte 3.4 (Profil), 4.3–4.5 (Katalog), 5 (Planer), 6.9 (Vorlieben, Ereignisse),
// 9.2 (Nachrichten), 9.3 (gespeicherter Plan). Änderungen hier nur abwärtsverträglich (neue Felder optional).
import type { Baustein, Blatt } from '../blatt/typen'

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
export type Tagesform = 'aufgedreht' | 'muede' | 'traurig' | 'wuetend' | 'aengstlich' | 'rueckzug' | 'will-nicht' | 'aufgewuehlt'
export type Schwerpunkt = 'verstehen' | 'ueben' | 'uebertragen' | 'selbstbild' | 'beziehung'
export type FormatWunsch = 'bewegung' | 'kreativ' | 'gespraech' | 'spiel' | 'wenig-schreiben'

export interface EldibBezug { code: string; gewicht: 1 | 0.5 }

/** Für wen ein Katalogeintrag gedacht ist (P1): 'fachkraft' (z. B. alle „Werkzeuge für Fachkräfte“) kommt nie aufs Blatt des Kindes. */
export type Zielgruppe = 'kind' | 'fachkraft' | 'eltern'

/** Reiz- und Trauma-Merkmale (P9) – Filter bei `vorsicht` 'reiz'/'trauma', in Weg 3 und bei Stimmung ≤ 2. */
export interface Merkmale { wettbewerb?: boolean; koerperkontakt?: boolean; laut?: boolean; gewaltbezug?: boolean; katharsis?: boolean }

/** Felder, die Bausteine und Stundenschritte gemeinsam haben (Kritik vom 9.10.: P1, P8, P9, E-M4). Alle optional. */
export interface KatalogZusatz {
  zielgruppe?: Zielgruppe
  /** läuft über Tage (Punkteplan, Wochen-Tracker …) – nur Rolle `transfer`, nie im Kern */
  mehrtaegig?: boolean
  merkmale?: Merkmale
  /** Rituale: 0 = verlangt nichts (Platz, Getränk, Tier), 1 = zeigen oder wählen, 2 = sprechen, Gefühl benennen, bewerten */
  anspruch?: 0 | 1 | 2
  /** aus der Quelle übernommen (E-M4): sensible Punkte, Vorbereitung, Hinweis auf einen Elternbrief */
  achtung?: string
  vorbereitung?: string
  elternbrief?: string
}
export interface Dauer { min: number; typ: number; max: number }
export interface Altersband { von: number; bis: number }

/** Texte eines Bausteins, die der Editor ändern darf (Pfad im Baustein → Text) */
export type BausteinTexte = Record<string, string>

// ---------------------------------------------------------------------------------------------------------------
// Katalog (4.4, 4.5) – Metadaten getrennt vom Inhalt; Inhalt kommt aus den Quellen (Blätter, Kurs, Förderfach …)
// ---------------------------------------------------------------------------------------------------------------

/** Mikro-Baustein eines Blatts: Aufgabenpaket (aufgabe + folgender Baustein) oder freier Baustein. Id 'b:<blatt>:<n>' */
export interface MikroBaustein extends KatalogZusatz {
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
  /** Mitmach-Seite ohne Förderziel (Malvorlage, Spielbrett, Labyrinth …): darf in Weg 3 aufs Blatt */
  ohneZiel?: boolean
}

export type SchrittQuelle = 'kurs' | 'foerderfach' | 'material' | 'spielschule' | 'crew' | 'freude' | 'ritual' | 'praxis'

/** Stundenschritt (Kurs 'k:', Förderfach 'f:', Material 'm:', Spielschule 's:', CREW 'c:', Freude 'fb:', Ritual 'r:') */
export interface Stundenschritt extends KatalogZusatz {
  id: string
  h: string
  /** Blatt zu genau dieser Übung (Jugend-Übungen): 2–4 Aufgaben, die ersten zwei mit wenig Schreiben */
  uebungsblatt?: { titel?: { de: string; fr: string }; de: Baustein[]; fr: Baustein[] }
  /** die mitnehmbare Fertigkeit als kurze Formel („Stopp – atmen – sagen“) – Übertragen und Rückblick nennen sie (Blind-Bewertung 8) */
  werkzeug?: { de: string; fr: string }
  /** false: reine Rückblick-, Einschätz- oder Erkundungsübung – wird nicht in den Alltag übertragen */
  uebertragbar?: boolean
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
  fr?: { titel: string; text: string; sagen?: string[]; wennEsKippt?: string; einzelvariante?: { text: string; sagen?: string[] }; achtung?: string; vorbereitung?: string }
  /** „Freude & Beziehung“, Rituale: darf in Weg 3 (ohne Bezug zu Förderzielen) */
  ohneZiel?: boolean
  /** Tagesform-Chips aus Weg 3, zu denen der Schritt besonders passt */
  tagesform?: Tagesform[]
  /** heikel je Schritt (T-M1): nur mit ausdrücklich freigeschaltetem Thema; familie/koerper nach `vorsicht` */
  sensibel?: 'kinderschutz' | 'akut' | 'familie' | 'koerper'
  qualitaet: 'geprueft' | 'entwurf'
  sicher: Record<string, number>
}

export type KatalogEintrag = ({ typ: 'baustein' } & MikroBaustein) | ({ typ: 'schritt' } & Stundenschritt)

/** Wahlkarte für Weg 3 (src/data/passgenau/inhalte/wahlkarten.json): drei Aktivitäten und „einfach da sein“ – das Kind
 *  wählt in der Stunde (P8). Der Planer nimmt davon die passenden Optionen (höchstens zwei plus „da sein“). */
export interface Wahlkarte {
  id: string
  titel: { de: string; fr: string }
  tagesform: Tagesform[]
  alter: Altersband
  stufen: Stufe[]
  dauer: Dauer
  kopf: { de: string; fr: string }
  optionen: ({ ref: string; label: { de: string; fr: string } } | { ref: null; art: 'da-sein'; label: { de: string; fr: string }; text?: { de: string; fr: string } })[]
  sagen?: { de: string[]; fr: string[] }
  wennEsKippt?: { de: string; fr: string }
  merkmale?: Merkmale
}

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
  vorsicht: ('familie' | 'trauer' | 'koerper' | 'heikel' | 'reiz' | 'trauma')[]
  interessen: string[]
  wochenziel: string | null
  gemacht: { id: string; am: string }[]
  folge: { id: string; titel: string; n: number; gehalten: number } | null
  vorlieben: VorliebenKind | null
  rituale?: { ankommen?: string; abschluss?: string }
  /** Quellen für „Das weiß ich schon“ (Anzeige): je Zeile Text, Quelle-Art und Datum – nie Werte oder Notiztexte */
  wissen?: { gruppe: string; text: string; quelle: string; datum?: string }[]
  rechte: { speichern: boolean; rueckmelden: boolean }
  /** „Was dem Kind hilft“ (P11) – nur die Fachkraft setzt es */
  hilft?: ('stundenleiste' | 'bewegungspausen' | 'reizarm' | 'bildplan')[]
  /** offenes heikles Thema – nur die Art, nie Text oder Themenschlüssel (E-M2) */
  achtung?: ('krise' | 'kinderschutz')[]
  /** false = „Passgenau lernt bei diesem Kind nicht“ (E-M12): keine Kind-Ereignisse, keine Kind-Vorlieben */
  lernen?: boolean
  /** Zugang aus Tests erst nach einmaliger Bestätigung durch die Fachkraft (P4, E-M14) */
  zugangBestaetigt?: boolean
  /** stabiler, nicht umkehrbarer Startwert des Kindes für den festen Zufallswert (T-M7) – vom Hub */
  seed?: string
  /** Datenlage (T-M5): dünn = keine ELDiB-Ziele und keine Themen der letzten 60 Tage */
  dichte?: 'duenn' | 'mittel' | 'reich'
  /** Kleingruppe (kern/gruppe.ts): je Kind, was sein Blatt braucht – das Profil selbst ist das der ganzen Gruppe */
  gruppe?: { ref: string; vorname?: string; anrede: string | null; alterJahre: number; stufen: Stufe[]; layout: Layout; sprache: { blatt: Sprache; woerter: ('lb' | 'pt')[] }; zugang: Profil['zugang']; ziele?: string[] }[]
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
  dauer: 10 | 15 | 20 | 30 | 45 | 60
  sozialform: 'einzeln' | 'zu-zweit' | 'kleingruppe'
  schwerpunkt?: Schwerpunkt[]
  formate?: FormatWunsch[]
  heute?: Heute
  tagesform?: Tagesform
  /** Weg 3: bis zu zwei Tagesformen (P8); `tagesform` bleibt für ältere Aufrufer */
  tagesformen?: Tagesform[]
  /** Blatt mit oder ohne (P2); ohne Angabe: bis 5 Jahre ohne, sonst mit */
  blatt?: 'mit' | 'ohne'
  sprache: Sprache
  /** Datum der Planung (ISO), Teil des festen Zufallswerts */
  datum: string
  /** Ort/Material außerhalb des Standards erlaubt */
  ort?: ('turnhalle' | 'draussen')[]
  /** „Worum soll es heute gehen?“ (T-M5, S2): Themen-Schlüssel wie material.js und/oder 'kompetenz:<Feld>' – bei dünnen
   *  Daten statt eines Ziels, sonst als Schwerpunkt für Kern und Blatt */
  thema?: string[]
  /** heikle Themen, für diese Stunde ausdrücklich freigeschaltet (T-M1) – nur damit sind Bausteine mit `sensibel` erlaubt */
  heikel?: ('kinderschutz' | 'sexualitaet' | 'suizid')[]
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
  /** Herkunft je überschriebenem Pfad (E-M7, E-M9): eigener Text oder Text aus einer Vorlage */
  ueberHerkunft?: Record<string, 'eigen' | 'vorlage'>
  /** Titel bzw. Aufgabentext (≤ 60 Zeichen), damit der Plan ohne Katalogtreffer lesbar bleibt (T-M10) */
  t?: string
  /** Wahl (Weg 3, P8): weitere Optionen, aus denen das Kind in der Stunde wählt; der Schritt selbst ist Option 1.
   *  Die Minuten gelten für die gewählte Option – die Summe der Stunde zählt nur eine. */
  wahl?: { ref: string; h: string; min: number; t?: string }[]
  /** Wahlkarte (Weg 3), aus der die Optionen stammen */
  wahlkarte?: string
  /** Lockerung (T-M3) oder Hinweis zur Einzelstunde („Gruppenaktivität, so mit einem Kind“) */
  hinweis?: string
  /** Teil wurde über die Lockerungsleiter gewählt (T-M3); der Grund steht in `hinweis` */
  gelockert?: boolean
}

export interface BlattTeil {
  ref: string
  h: string
  ueber?: BausteinTexte
  ausgeblendet?: string[]
  gesperrt?: boolean
  ueberHerkunft?: Record<string, 'eigen' | 'vorlage'>
  t?: string
}

export interface Sitzung {
  nr: number
  phase: Bogen | 'leicht'
  status: 'geplant' | 'gehalten' | 'angepasst'
  datum: string | null
  schritte: PlanSchritt[]
  /** `ziel`: „Mein Ziel“ aufs Blatt (Vorgabe aus, bei Jugendlichen immer aus – E-M13) */
  blatt: { titel: string; bausteine: BlattTeil[]; ziel?: boolean } | null
  hinweise?: string[]
  rueckmeldung: Rueckmeldung | null
  /** Zeitpunkt des Drucks (P7: gedruckt = gespeichert) */
  gedruckt?: string
  /** Änderungszähler für gleichzeitiges Speichern (T-M11, S7) */
  rev?: number
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
  /** Zeitpunkt des letzten Drucks (P7) */
  gedruckt?: string
  rev?: number
  /** „Neu vorschlagen“ zählt hoch; sonst liefert derselbe Auftrag denselben Plan (T-M7) */
  variante?: number
  /** Stand des Katalogs, mit dem der Plan entstand (T-M10/M11) */
  katalogStand?: string
}

export interface Rueckmeldung {
  /** Krisentage und Weg 3 (P10): beruhigt · dabei · nur-da · abgebrochen – nie negative Signale */
  ergebnis: 'geklappt' | 'teils' | 'nicht' | 'beruhigt' | 'dabei' | 'nur-da' | 'abgebrochen'
  ziele?: { code: string; richtung: 'gelingt' | 'mit-hilfe' | 'noch-nicht' }[]
  chips?: string[]
  am: string
  /** Stimme des Kindes (E-M15): was es gewählt hat, sein Daumen am Schluss – zwei freiwillige Klicks der Fachkraft */
  kind?: { wahl?: string; daumen?: 'hoch' | 'runter' }
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
  | 'beruhigt' | 'dabei' | 'nur-da' | 'abgebrochen' | 'kind_wahl' | 'kind_daumen'
export type DaumenGrund = 'zu-lang' | 'zu-kindlich' | 'zu-schwer' | 'passt-nicht' | 'mag-nicht' | 'passt-gut' | 'zu-leicht'

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
  /** Krisentag (Weg 3 oder Stimmung ≤ 2): Signal geht nie negativ an Kind oder Fachkraft (P10) */
  krisentag?: boolean
  /** Schritt war ein Erkundungs-Slot (6.6) */
  erkundung?: boolean
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

/** Stand eines Partners für den Versionsabgleich in `hallo` (T-M11). */
export interface PassgenauVersion { build: string; proto: number; planV: number; profilV: number }
/** `hallo`: Frage der Toolbox … */
export interface HalloArg { toolbox: PassgenauVersion }
/** … und Antwort des Hubs. `version`/`schema`: Kurzform (Hub-Build, Protokoll); gleiches `proto` → normal; Hub älter → Speichern aus. */
export interface HalloErgebnis {
  version: string
  schema: number
  hub?: PassgenauVersion
  rechte: { planen: boolean; speichern: boolean; rueckmelden: boolean }
  praxis: boolean
}
/** Aktuelle Versionen dieses Vertrags (Toolbox-Seite). */
export const PASSGENAU_PROTO = 1
export const PASSGENAU_PLAN_V = 1
export const PASSGENAU_PROFIL_V = 1

/** Inhalt einer Vorlage „Aus der Praxis“ (E-M5): Whitelist – nur Refs, Prüfsummen, Rollen, Minuten, Phasen, Blatt-Refs und
 *  geprüfte Überschreibungen. Nie Kind, Fachkraft, Daten, Rückmeldungen, Begründungen oder Plan-Id. */
export interface VorlagenInhalt {
  weg: Weg
  n: number
  dauer: number
  sitzungen: {
    phase: Bogen | 'leicht'
    schritte: { ref: string; h: string; rolle: Rolle; min: number; ueber?: BausteinTexte; ueberHerkunft?: Record<string, 'eigen' | 'vorlage'> }[]
    blatt?: { titel: string; bausteine: { ref: string; h: string; ueber?: BausteinTexte; ausgeblendet?: string[]; ueberHerkunft?: Record<string, 'eigen' | 'vorlage'> }[] }
  }[]
}

/** Vorlage „Aus der Praxis“ (8) – ein Plan ohne Kind. Altersband in festen Bändern (3–5 · 6–8 · 9–11 · 12–14 · 15+), aus den Bausteinen berechnet. */
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
  inhalt: VorlagenInhalt
  zaehler?: TeamZaehler
  erstellt: string
  /** höchste Belastung der Bausteine (0–2) und ob heikle Bausteine dabei sind – Freigabe bei 2/heikel nur Psychologin oder
   *  Responsable (E-M8); vom Kern aus dem Katalog abgeleitet */
  belastung?: 0 | 1 | 2
  sensibel?: boolean
  /** vom Hub: eigene Vorlage der angemeldeten Person; darf freigeben (Kuratorin) */
  eigen?: boolean
  darfFreigeben?: boolean
}

/** Kinderblatt, wie es der Renderer bekommt: ein synthetisches Blatt (7.5) */
export type KinderBlatt = Blatt
