// ---------------------------------------------------------------------------------------------------------------
// Passgenau – ATTRAPPE des Kerns (nur bis der echte Kern `src/passgenau/kern` da ist).
//
// Exportiert genau die Schnittstelle aus dem Bauplan (Kern → Oberfläche). Rechnet mit einer verkleinerten Fassung
// von Konzept 5–6 auf einem kleinen, erfundenen Katalog (≈ 60 Stundenschritte, ≈ 35 Blatt-Bausteine), der zu drei
// erfundenen Kindern passt (9 J. C3, 5 J. C1, 14 J. ES). Deterministisch: gleiche Eingabe → gleicher Plan.
// Beim Zusammenführen wird diese Datei durch den echten Kern ersetzt (`./kern.ts` zeigt dann auf ../kern).
// ---------------------------------------------------------------------------------------------------------------
import type {
  Alternative, Auftrag, Bogen, DaumenGrund, Ereignis, KatalogEintrag, MikroBaustein, Plan, PlanSchritt, PraxisVorlage,
  Profil, Rolle, Sitzung, Sprache, Stundenschritt, Stufe, Tagesform, VorliebenFachkraft, VorliebenKind, VorliebenTeam, Zaehler,
  Layout, SchrittQuelle, BlattTeil, VorlagenInhalt,
} from '../typen'
import type { Baustein, Blatt, Bereich, Symbol as BlattSymbol } from '../../blatt/typen'
import { loadPdfModule } from '../../lib/loadPdf'

export interface Katalog { eintraege: Map<string, KatalogEintrag>; nachRolle: Map<Rolle, KatalogEintrag[]>; stand: string }
export interface Vorlieben { kind: VorliebenKind | null; ich: VorliebenFachkraft; team: VorliebenTeam | null }
export interface Verlauf { plaene: Plan[]; ereignisse: Ereignis[] }

export const GEWICHTE_V1: Record<string, number> = {
  ziel: 0.35, phase: 0.15, zugang: 0.15, thema: 0.12, tagesform: 0.1, abwechslung: 0.05, qualitaet: 0.05, interesse: 0.03,
}

// ---------------------------------------------------------------------------------------------------------------
// Katalog (erfunden; Titel teils wie in der Toolbox)
// ---------------------------------------------------------------------------------------------------------------

interface SchrittRoh {
  id: string; titel: string; text: string; sagen?: string; kippt?: string; rolle: Rolle[]; bogen?: Bogen; ziele?: string[]; thema?: string[]
  alter: [number, number]; dauer: number; energie: 1 | 2 | 3; format: string[]; q: SchrittQuelle; qt: string; material?: string
  ohneZiel?: boolean; interesse?: string; tf?: Tagesform[]; bruecke?: boolean; belastung?: 0 | 1 | 2
  anspruch?: 0 | 1 | 2; wettbewerb?: boolean; achtung?: string; vorbereitung?: string; elternbrief?: string; druck?: string[]
}

const S: SchrittRoh[] = [
  // Rituale (Ankommen, Abschluss)
  { id: 'r:wetterbericht', anspruch: 2, titel: 'Innerer Wetterbericht', rolle: ['ankommen'], alter: [6, 12], dauer: 4, energie: 1, format: ['gespraech', 'karten'], ohneZiel: true, q: 'ritual', qt: 'Ankommen', material: 'Wetterkarten (Sonne, Wolken, Regen, Gewitter)',
    text: 'Das Kind legt die Wetterkarte, die zu heute passt – Sonne, Wolken, Gewitter. Die Fachkraft legt auch eine und sagt einen Satz dazu.', sagen: 'Welches Wetter ist heute in dir?' },
  { id: 'r:handschlag', anspruch: 1, titel: 'Begrüßung mit eigenem Handschlag', rolle: ['ankommen'], alter: [6, 11], dauer: 2, energie: 2, format: ['bewegung', 'spiel'], ohneZiel: true, q: 'ritual', qt: 'Ankommen',
    text: 'Der Handschlag, den ihr euch in der ersten Stunde ausgedacht habt. Danach ein Satz: „Heute bin ich …“' },
  { id: 'r:lumi-hallo', anspruch: 1, titel: 'Handpuppe Lumi sagt Hallo', rolle: ['ankommen'], alter: [3, 6], dauer: 3, energie: 1, format: ['spiel', 'gespraech'], ohneZiel: true, q: 'ritual', qt: 'Ankommen', material: 'Handpuppe, drei Gesichter-Karten',
    text: 'Lumi begrüßt das Kind, zeigt auf drei Gesichter und fragt, welches heute passt. Das Kind darf Lumi streicheln oder abklatschen.' },
  { id: 'k:j1-e01:1', anspruch: 2, titel: 'Zahl des Tages 0–10', rolle: ['ankommen'], alter: [11, 17], dauer: 3, energie: 1, format: ['gespraech'], ohneZiel: true, q: 'kurs', qt: 'Check-in',
    text: 'Beide nennen eine Zahl von 0 bis 10 für den Tag, wer mag, sagt einen Satz dazu. Zahlen nicht kommentieren.' },
  { id: 'r:daumen-stern', anspruch: 2, titel: 'Daumen-Rückblick und Stern', rolle: ['abschluss'], alter: [6, 12], dauer: 4, energie: 1, format: ['gespraech'], ohneZiel: true, q: 'ritual', qt: 'Abschluss', material: 'Stundenpass, Sternstempel',
    text: 'Daumen hoch, Mitte oder runter für die Stunde. Was war heute gut? Ein Stern in den Stundenpass.', sagen: 'Was nimmst du heute mit?' },
  { id: 'r:abschiedsreim', anspruch: 0, titel: 'Abschiedsreim mit Klatschen', rolle: ['abschluss'], alter: [3, 6], dauer: 3, energie: 2, format: ['musik', 'bewegung'], ohneZiel: true, q: 'ritual', qt: 'Abschluss',
    text: 'Der kurze Reim zum Klatschen, dann winkt Lumi zum Abschied. Ein Sticker auf die Karte.' },
  { id: 'k:j1-e01:7', anspruch: 2, titel: 'Ein Satz für morgen', rolle: ['abschluss'], alter: [12, 17], dauer: 3, energie: 1, format: ['gespraech'], ohneZiel: true, q: 'kurs', qt: 'Abschluss',
    text: 'Ein Satz: Was nehme ich mit, was probiere ich bis zum nächsten Mal aus? Die Fachkraft schreibt ihn auf die Karte.' },
  { id: 'r:platz-und-getraenk', anspruch: 0, titel: 'Ankommen mit Getränk', rolle: ['ankommen'], alter: [4, 17], dauer: 2, energie: 1, format: ['sinne'], ohneZiel: true, q: 'ritual', qt: 'Ankommen', material: 'Glas Wasser',
    text: 'Das Kind sucht sich einen Platz aus, die Fachkraft stellt ein Glas Wasser hin. Kein Gespräch nötig – erst einmal ankommen.' },
  { id: 'r:sticker-tschuess', anspruch: 0, titel: 'Sticker und Tschüss', rolle: ['abschluss'], alter: [4, 11], dauer: 2, energie: 1, format: ['karten'], ohneZiel: true, q: 'ritual', qt: 'Abschluss', material: 'Sticker',
    text: 'Das Kind wählt einen Sticker für die Karte. Tschüss – bis zum nächsten Mal.' },
  { id: 'r:ruhiger-ausklang', anspruch: 0, titel: 'Ruhiger Ausklang mit Musik', rolle: ['abschluss'], alter: [10, 17], dauer: 2, energie: 1, format: ['musik'], ohneZiel: true, q: 'ritual', qt: 'Abschluss',
    text: 'Eine Minute ein ruhiges Stück hören, dann verabschieden. Nichts muss gesagt werden.' },
  { id: 'r:wochenziel-karte', titel: 'Wochenziel-Karte mitnehmen', rolle: ['abschluss', 'transfer'], alter: [7, 14], dauer: 3, energie: 1, format: ['gespraech', 'plan'], ziele: ['SOZ-14', 'V-21'], q: 'ritual', qt: 'Wochenziele · Transfer-Karte',
    text: 'Die Karte mit dem Wochenziel ausfüllen: Wo übe ich das morgen? Karte in die Federmappe.' },
  // Einstieg
  { id: 'm:mein-wutvulkan:1', titel: 'Comic: Luca kurz vor dem Ausbruch', rolle: ['einstieg'], bogen: 'wahrnehmen', ziele: ['V-21', 'K-26'], thema: ['wut'], alter: [6, 11], dauer: 5, energie: 1, format: ['geschichte', 'comic', 'gespraech'], q: 'material', qt: 'Toolbox · G-01 Geschichte',
    text: 'Die Geschichte aus „Mein Wutvulkan“ vorlesen, dazu die drei Bilder. Gemeinsam suchen: Woran merkt Luca, dass die Wut steigt?', sagen: 'Wo im Körper spürt Luca die Wut zuerst?' },
  { id: 'm:thermometer:1', titel: 'Wut-Thermometer: Wie heiß war diese Woche?', rolle: ['einstieg'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['wut'], alter: [7, 14], dauer: 4, energie: 1, format: ['denkmodell', 'gespraech'], q: 'material', qt: 'Toolbox · Denkmodell Thermometer',
    text: 'Auf dem großen Thermometer zeigt das Kind, wie heiß es diese Woche wurde. Eine Situation kurz erzählen lassen.', sagen: 'Wann war es diese Woche am heißesten?' },
  { id: 'fb:bruecke-rueckblick', bruecke: true, titel: 'Rückblick: Was war seit letzter Woche anders?', rolle: ['einstieg'], bogen: 'ueben', ziele: ['V-21', 'V-22'], thema: ['wut'], alter: [8, 16], dauer: 4, energie: 1, format: ['gespraech'], q: 'freude', qt: 'Brücke zur letzten Stunde',
    text: 'An die Stopp-Karten der letzten Stunde anknüpfen: Wann hast du eine benutzt? Was ist dann passiert?', sagen: 'Erzähl mir von einem Moment, in dem du gestoppt hast.' },
  { id: 's:sp-warten:k1', titel: 'Bildkarten: Wann ist Warten schwer?', rolle: ['einstieg'], bogen: 'wahrnehmen', ziele: ['SOZ-14', 'V-10'], alter: [4, 9], dauer: 5, energie: 1, format: ['karten', 'gespraech'], q: 'spielschule', qt: 'Kreis (Einzelvariante)',
    text: 'Sechs Bildkarten (Rutsche, Essen, Spiel, Bus …): Das Kind legt sie auf „leicht“ oder „schwer“.' },
  { id: 'm:stopp-ampel-bild:1', titel: 'Ampel-Bild: Was bedeuten die Farben für mich?', rolle: ['einstieg'], bogen: 'verstehen', ziele: ['V-21'], thema: ['wut'], alter: [7, 12], dauer: 4, energie: 1, format: ['denkmodell', 'gespraech'], q: 'material', qt: 'Toolbox · Die Stopp-Ampel (Bild)',
    text: 'Die große Ampel zeigen. Das Kind legt zu jeder Farbe eine Karte: Was tue ich bei Rot, bei Gelb, bei Grün?', sagen: 'Was machst du, wenn deine Ampel auf Rot springt?' },
  { id: 'm:konflikt-bruecke:1', titel: 'Kurze Szene: Wer darf zuerst?', rolle: ['einstieg'], bogen: 'ueben', ziele: ['V-21', 'SOZ-14'], thema: ['freundschaft', 'wut'], alter: [7, 12], dauer: 4, energie: 1, format: ['geschichte', 'gespraech'], interesse: 'fussball', q: 'material', qt: 'Toolbox · Die Konflikt-Brücke (Geschichte)',
    text: 'Eine kurze Szene vom Pausenhof vorlesen: ein Ball, zwei Gruppen. Was würde die Ampel jetzt sagen?' },
  { id: 'fb:karten-check', bruecke: true, titel: 'Stopp-Karten-Check: Welche hast du benutzt?', rolle: ['einstieg'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [7, 13], dauer: 4, energie: 1, format: ['karten', 'gespraech'], q: 'freude', qt: 'Brücke zur letzten Stunde',
    text: 'Die Stopp-Karten aus der Federmappe holen. Welche hat geholfen, welche nicht? Eine Karte bekommt einen Stern.' },
  { id: 'm:gefuehle-memory:1', titel: 'Gefühle-Memory: Welches Gesicht passt?', rolle: ['einstieg'], bogen: 'wahrnehmen', ziele: ['K-26'], alter: [6, 11], dauer: 5, energie: 1, format: ['spiel', 'karten'], q: 'material', qt: 'Toolbox · Gefühle-Memory',
    text: 'Sechs Gesichter-Paare aufdecken. Bei jedem Paar sagt das Kind, wann es sich so gefühlt hat – wenn es mag.' },
  { id: 'k:j1-e12:1', titel: 'Pausen-Foto: Wo wird es eng?', rolle: ['einstieg'], bogen: 'verstehen', ziele: ['V-21'], thema: ['wut'], alter: [8, 13], dauer: 4, energie: 1, format: ['karten', 'gespraech'], q: 'kurs', qt: 'Pausen-Fotos (Einzelvariante)',
    text: 'Drei Fotos vom Pausenhof zeigen. Das Kind legt einen Stein auf die Stelle, an der es am schnellsten eng wird.', sagen: 'Was passiert dort meistens kurz vorher?' },
  // Kern
  { id: 'f:ff4-e05:2', titel: 'Gelb-Phase üben: drei Sekunden denken', rolle: ['kern'], bogen: 'ueben', ziele: ['V-21'], thema: ['wut'], alter: [8, 13], dauer: 10, energie: 1, format: ['spiel', 'gespraech'], q: 'foerderfach', qt: 'Erst denken (Einzelvariante)',
    text: 'Die Fachkraft liest kleine Ärger-Situationen vor. Das Kind hebt die gelbe Karte, zählt bis drei und sagt dann, was es tun will.' },
  { id: 'm:stopp-signal:1', titel: 'Mein Stopp-Signal finden', rolle: ['kern'], bogen: 'verstehen', ziele: ['V-21', 'K-26'], thema: ['wut'], alter: [7, 12], dauer: 10, energie: 1, format: ['denkmodell', 'malen'], q: 'material', qt: 'Toolbox · Mein Stopp-Signal',
    text: 'Das Kind sucht sich ein Zeichen für „Stopp“ aus (Hand, Wort, Bild) und malt es auf eine Karte für die Federmappe.' },
  { id: 'fb:statuen-spiel', titel: 'Statuen-Spiel', rolle: ['bewegung'], bogen: 'ueben', ziele: ['SOZ-14', 'V-21'], alter: [5, 12], dauer: 4, energie: 3, format: ['bewegung', 'spiel'], q: 'freude', qt: 'Freude & Beziehung', tf: ['aufgedreht'],
    text: 'Herumgehen, bis die Fachkraft „Statue“ sagt. Dann ganz still stehen und bis fünf zählen.' },
  { id: 'fb:stopp-diplom', titel: 'Mein Stopp-Diplom: Was ich geschafft habe', rolle: ['kern'], bogen: 'reflektieren', ziele: ['V-22', 'V-21'], alter: [7, 13], dauer: 10, energie: 1, format: ['gespraech', 'malen'], q: 'freude', qt: 'Abschluss einer Folge',
    text: 'Die Blätter der Folge nebeneinanderlegen. Was klappt schon? Das Kind malt seinen besten Stopp-Moment, die Fachkraft schreibt das Diplom.', sagen: 'Was kannst du heute, was im September noch schwer war?' },
  { id: 'm:wenn-dann:2', titel: 'Stopp-Plan für die Woche: Wo übe ich?', rolle: ['kern'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [8, 13], dauer: 10, energie: 1, format: ['plan', 'gespraech'], q: 'material', qt: 'Toolbox · Wenn-dann-Pläne',
    text: 'Drei Orte der Woche – Pause, Kantine, Sport: Was ist dort mein Rot, mein Grün? Die Karten an den Wochenplan stecken.' },
  { id: 'k:j1-e11:4', titel: 'Stopp-Ampel: Rot – Gelb – Grün', rolle: ['kern'], bogen: 'verstehen', ziele: ['V-21', 'V-18'], thema: ['wut'], alter: [8, 16], dauer: 10, energie: 1, format: ['denkmodell', 'gespraech'], q: 'kurs', qt: 'Die Stopp-Ampel (Einzelvariante)', material: 'Ampel aus Pappe',
    text: 'Ampel auf den Tisch. Rot: Hände weg, Mund zu, Schritt zurück. Gelb: Was will ich eigentlich? Grün: einen klugen Satz sagen. An einer Pausen-Szene durchspielen.', sagen: 'Was ist dein Rot – woran merkst du, dass du stoppen musst?', kippt: 'Nicht diskutieren: kurz auf Rot bleiben, gemeinsam atmen, dann weiter.' },
  { id: 'm:rollenspiel-kiste:1', titel: 'Ampel-Rollenspiel mit Handpuppen', rolle: ['kern'], bogen: 'ueben', ziele: ['V-21', 'SOZ-14'], thema: ['wut'], alter: [6, 11], dauer: 10, energie: 2, format: ['rollenspiel', 'spiel'], q: 'material', qt: 'Rollenspiel-Kiste', material: '2 Handpuppen, Ball, Ampel',
    text: 'Zwei Handpuppen streiten um einen Ball. Das Kind führt eine Puppe und hält an der Ampel: Rot – Gelb – Grün. Danach Rollen tauschen.' },
  { id: 'm:gefuehle-namen:2', titel: 'Wut-Detektiv: Körper-Zeichen finden', rolle: ['kern'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['wut'], alter: [7, 11], dauer: 8, energie: 1, format: ['malen', 'gespraech'], q: 'material', qt: 'Toolbox · Gefühle haben viele Namen',
    text: 'Auf dem Körperumriss malt das Kind an, wo es Wut spürt: rot für heiß, blau für kalt. Dazu zwei Wörter suchen.' },
  { id: 'm:gefuehle-theater:1', titel: 'Gefühle-Pantomime raten', rolle: ['kern'], bogen: 'verstehen', ziele: ['K-26'], alter: [6, 12], dauer: 8, energie: 2, format: ['spiel', 'bewegung'], q: 'material', qt: 'Gefühle-Theater',
    text: 'Abwechselnd ein Gefühl vorspielen, das andere rät. Nach jedem Gefühl: Wann hattest du das zuletzt?' },
  { id: 'k:j1-e12:3', titel: 'Stopp-Plan an drei Pausen-Szenen üben', rolle: ['kern'], bogen: 'ueben', ziele: ['V-21'], thema: ['wut', 'freundschaft'], alter: [8, 13], dauer: 12, energie: 2, format: ['rollenspiel', 'gespraech'], interesse: 'fussball', q: 'kurs', qt: 'Szenen-Karten (Einzelvariante)', druck: ['b:stopp-ampel:3'],
    achtung: 'Szenen mit Auslachen können an eigene Erlebnisse rühren: nicht nachbohren, bei Tränen die Szene wechseln.', vorbereitung: 'Szenen-Karten ausdrucken und ausschneiden (liegen dem Blatt bei).',
    text: 'Drei Szenen-Karten aus der Pause (Fußball, Schlange an der Kantine, jemand lacht). Je Szene: Was ist mein Rot, mein Gelb, mein Grün? Eine Szene kurz spielen.', sagen: 'Was sagst du als Erstes, wenn du auf Grün bist?', kippt: 'Szene abbrechen, Rollen tauschen: Jetzt spielt die Fachkraft das Kind.' },
  { id: 's:sp-warten:s2', titel: 'Warte-Turm: Nur wer dran ist, baut', rolle: ['kern'], bogen: 'ueben', ziele: ['SOZ-14', 'V-10', 'V-21'], alter: [4, 10], dauer: 8, energie: 2, format: ['spiel'], q: 'spielschule', qt: 'Spiel (Einzelvariante)', material: 'Bauklötze',
    text: 'Abwechselnd einen Klotz setzen. Wer nicht dran ist, legt die Hände auf die Knie. Fällt der Turm, lachen beide – und bauen neu.' },
  { id: 'm:konflikt-bruecke:2', titel: 'Konflikt-Brücke mit Spielfiguren', rolle: ['kern'], bogen: 'uebertragen', ziele: ['V-18'], thema: ['freundschaft'], alter: [8, 11], dauer: 12, energie: 1, format: ['spiel', 'gespraech'], q: 'material', qt: 'Toolbox · Die Konflikt-Brücke',
    text: 'Zwei Figuren stehen auf beiden Seiten. Das Kind baut mit Karten eine Brücke: Welche Lösung ist fair für beide?' },
  { id: 'f:ff4-e07:3', titel: 'Ich-Botschaft: Ich bin wütend, weil …', rolle: ['kern'], bogen: 'ueben', ziele: ['K-26'], thema: ['wut', 'freundschaft'], alter: [8, 12], dauer: 8, energie: 1, format: ['gespraech', 'schreiben'], q: 'foerderfach', qt: 'Ich-Botschaften in drei Teilen',
    text: 'Drei Teile üben: Ich bin … – weil … – ich wünsche mir … Auf Karten legen, dann laut sagen.' },
  // Bewegung, Regulation
  { id: 'fb:ampel-lauf', titel: 'Ampel-Lauf', rolle: ['bewegung'], bogen: 'ueben', ziele: ['SOZ-14', 'V-21'], alter: [5, 11], dauer: 5, energie: 3, format: ['bewegung', 'spiel'], q: 'freude', qt: 'Freude & Beziehung', tf: ['aufgedreht'],
    text: 'Rot: stehen wie eine Statue. Gelb: auf Zehenspitzen schleichen. Grün: laufen. Die Fachkraft ruft, dann das Kind.' },
  { id: 'fb:zeitungsball', titel: 'Zeitungsball', rolle: ['bewegung'], thema: ['wut'], alter: [6, 14], dauer: 4, energie: 3, format: ['bewegung'], ohneZiel: true, q: 'freude', qt: 'Freude & Beziehung', material: 'alte Zeitungen, Papierkorb', tf: ['wuetend', 'aufgedreht'],
    text: 'Zeitungsseiten fest zusammenknüllen und in den Korb werfen. Danach still sitzen: Wie fühlen sich die Hände jetzt an?' },
  { id: 'fb:wand-schieben', titel: 'Wand schieben, dann locker', rolle: ['regulation', 'bewegung'], thema: ['wut'], alter: [6, 17], dauer: 3, energie: 2, format: ['bewegung', 'atmen'], ohneZiel: true, q: 'freude', qt: 'Freude & Beziehung', tf: ['wuetend'],
    text: 'Mit beiden Händen gegen die Wand drücken, zehn Sekunden, so fest es geht. Loslassen, ausschütteln, nachspüren. Dreimal.' },
  { id: 'm:atmen-ballon:1', titel: 'Ballon-Atmen', rolle: ['regulation'], alter: [5, 12], dauer: 3, energie: 1, format: ['atmen'], ohneZiel: true, q: 'material', qt: 'Toolbox · Atmen: Ballon', tf: ['aengstlich', 'aufgedreht'],
    text: 'Hände auf den Bauch: Beim Einatmen bläst sich der Ballon auf, beim Ausatmen wird er langsam kleiner. Fünf Atemzüge.' },
  { id: 's:sp-musik:b1', titel: 'Stopptanz mit Musik', rolle: ['bewegung'], ziele: ['SOZ-14', 'V-10'], alter: [3, 8], dauer: 5, energie: 3, format: ['bewegung', 'musik'], q: 'spielschule', qt: 'Bewegung (Einzelvariante)', tf: ['aufgedreht'],
    text: 'Musik an: tanzen. Musik aus: einfrieren. Wer friert, wartet, bis die Musik wiederkommt.' },
  // Freude & Beziehung (ohne Ziel)
  { id: 'fb:tier-pantomime', titel: 'Tier-Pantomime raten', rolle: ['spiel'], alter: [4, 11], dauer: 8, energie: 2, format: ['spiel', 'bewegung'], ohneZiel: true, interesse: 'tiere', q: 'freude', qt: 'Freude & Beziehung', tf: ['aufgedreht', 'traurig'],
    text: 'Abwechselnd ein Tier vorspielen – ohne Geräusch. Das andere rät. Zum Schluss ein Fantasietier aus zwei Tieren.' },
  { id: 'fb:papier-kicker', wettbewerb: true, titel: 'Fußball-Tischkicker aus Papier', rolle: ['spiel'], alter: [7, 12], dauer: 10, energie: 2, format: ['basteln', 'spiel'], ohneZiel: true, interesse: 'fussball', q: 'freude', qt: 'Freude & Beziehung', material: 'Papier, 4 Büroklammern', tf: ['aufgedreht', 'will-nicht'],
    text: 'Ein Papierkügelchen, zwei Tore aus Büroklammern, mit dem Finger schnipsen. Wer zuerst drei Tore hat, wählt das nächste Spiel.' },
  { id: 'fb:nebeneinander-zeichnen', titel: 'Nebeneinander zeichnen', rolle: ['spiel'], alter: [5, 17], dauer: 10, energie: 1, format: ['malen'], ohneZiel: true, interesse: 'zeichnen', q: 'freude', qt: 'Freude & Beziehung', tf: ['muede', 'rueckzug', 'traurig'],
    text: 'Beide zeichnen dasselbe Motiv, das das Kind aussucht. Nicht bewerten, nur zeigen und eine Sache am Bild des anderen mögen.' },
  { id: 'fb:knete-tiere', titel: 'Knete-Tiere', rolle: ['spiel'], alter: [3, 9], dauer: 10, energie: 1, format: ['basteln', 'sinne'], ohneZiel: true, interesse: 'tiere', q: 'freude', qt: 'Freude & Beziehung', material: 'Knete', tf: ['rueckzug', 'aengstlich', 'muede'],
    text: 'Jede Person knetet ein Tier. Dann bekommen die Tiere Namen und besuchen sich.' },
  { id: 'fb:seifenblasen', titel: 'Seifenblasen fangen', rolle: ['bewegung'], alter: [3, 7], dauer: 5, energie: 3, format: ['bewegung', 'sinne'], ohneZiel: true, q: 'freude', qt: 'Freude & Beziehung', tf: ['aufgedreht', 'traurig'],
    text: 'Die Fachkraft pustet, das Kind fängt – erst mit beiden Händen, dann nur mit einem Finger, dann ganz langsam.' },
  { id: 'fb:rhythmus-echo', titel: 'Rhythmus-Echo mit Klatschen', rolle: ['spiel'], alter: [5, 12], dauer: 5, energie: 2, format: ['musik', 'bewegung'], ohneZiel: true, q: 'freude', qt: 'Freude & Beziehung', tf: ['wuetend', 'muede'],
    text: 'Einer klatscht einen kurzen Rhythmus, das andere klatscht ihn nach. Dann mit Füßen, Knien, Tisch.' },
  { id: 'fb:papierkorb-basketball', wettbewerb: true, titel: 'Papierkorb-Basketball', rolle: ['bewegung', 'spiel'], alter: [9, 17], dauer: 6, energie: 3, format: ['bewegung', 'spiel'], ohneZiel: true, interesse: 'basketball', q: 'freude', qt: 'Freude & Beziehung', tf: ['aufgedreht', 'will-nicht'],
    text: 'Drei Wurflinien, je drei Würfe. Wer trifft, stellt eine leichte Frage (Lieblingsessen, bester Film).' },
  { id: 'fb:lieblingssong', titel: 'Lieblingssong erklären', rolle: ['spiel'], alter: [11, 17], dauer: 8, energie: 1, format: ['musik', 'gespraech'], ohneZiel: true, interesse: 'musik', q: 'freude', qt: 'Freude & Beziehung', tf: ['muede', 'traurig', 'rueckzug'],
    text: 'Der Jugendliche spielt 30 Sekunden eines Lieblingssongs vor und erklärt, wann er ihn hört. Die Fachkraft hört zu, ohne zu bewerten.' },
  { id: 'c:raetsel-zu-zweit', titel: 'Gemeinsam ein Rätsel lösen', rolle: ['spiel'], alter: [9, 17], dauer: 8, energie: 1, format: ['spiel'], ohneZiel: true, q: 'crew', qt: 'leichtes Rätsel (Einzel)', tf: ['aengstlich', 'will-nicht', 'muede'],
    text: 'Ein Bilderrätsel oder Streichholzrätsel zu zweit. Wer eine Idee hat, sagt sie laut – falsche Ideen zählen auch.' },
  { id: 'fb:kissen-burg', titel: 'Kissen-Burg bauen', rolle: ['spiel'], alter: [3, 8], dauer: 10, energie: 2, format: ['spiel', 'bewegung'], ohneZiel: true, q: 'freude', qt: 'Freude & Beziehung', material: 'Kissen, Decke', tf: ['aengstlich', 'rueckzug', 'will-nicht'],
    text: 'Aus Kissen und einer Decke eine Burg bauen. Drinnen darf das Kind bestimmen, was als Nächstes passiert.' },
  { id: 'fb:wahlkarte', titel: 'Wahlkarte: Was machen wir zuerst?', rolle: ['einstieg'], alter: [4, 17], dauer: 2, energie: 1, format: ['karten'], ohneZiel: true, q: 'freude', qt: 'Wahlkarte',
    text: 'Das Kind wählt aus zwei oder drei vorbereiteten Aktivitäten. Auch „einfach da sein“ ist eine Wahl.' },
  // Jugend
  { id: 'k:j2-e04:3', titel: 'Anspannungsskala 0–100', rolle: ['kern'], bogen: 'wahrnehmen', ziele: ['K-26', 'V-22'], thema: ['angst', 'pruefung'], alter: [12, 17], dauer: 10, energie: 1, format: ['denkmodell', 'gespraech'], q: 'kurs', qt: 'Anspannungsskala (Einzelvariante)',
    achtung: 'Nennt der Jugendliche Gedanken an Selbstverletzung, das Thema nicht vertiefen und am selben Tag die Responsable informieren.', elternbrief: 'Kurzer Brief an die Eltern: Was die Anspannungsskala ist (Vorlage in der Einheit).',
    text: 'Die Skala von 0 bis 100 erklären: Ab wann kippt Denken? Drei Situationen der letzten Woche eintragen.', sagen: 'Wo lag deine Zahl vor der letzten Probe?', kippt: 'Nicht weiterfragen; die Zahl stehen lassen und zum Skill wechseln.' },
  { id: 'k:j2-e05:5', titel: 'Skill 5-4-3-2-1', rolle: ['regulation'], bogen: 'ueben', ziele: ['K-26'], thema: ['angst'], alter: [10, 17], dauer: 4, energie: 1, format: ['atmen', 'sinne'], q: 'kurs', qt: 'Skill 5-4-3-2-1', tf: ['aengstlich'],
    text: '5 Dinge sehen, 4 hören, 3 spüren, 2 riechen, 1 schmecken. Danach die Zahl auf der Skala neu schätzen.' },
  { id: 'm:pruefungsplan:1', titel: 'Prüfungsplan: Was kann ich vorher tun?', rolle: ['kern'], bogen: 'uebertragen', ziele: ['V-22'], thema: ['angst', 'pruefung'], alter: [12, 17], dauer: 12, energie: 1, format: ['plan', 'gespraech'], q: 'material', qt: 'Toolbox · Mein Prüfungsplan',
    text: 'Die nächste Probe nehmen: drei Tage vorher, am Abend davor, in der Stunde. Je ein Schritt, der hilft.' },
  { id: 'f:ff7-e03:4', titel: 'Gedanken-Check: hilfreich oder nicht?', rolle: ['kern'], bogen: 'verstehen', ziele: ['K-26'], thema: ['angst'], alter: [12, 17], dauer: 10, energie: 1, format: ['karten', 'gespraech'], q: 'foerderfach', qt: 'Gedanken prüfen (Einzelvariante)',
    text: 'Gedanken-Karten („Ich schaffe das nie“, „Ich habe geübt“) auf zwei Stapel legen. Einen Gedanken umformulieren.' },
  { id: 'k:j2-e09:2', titel: 'Respekt-Szenen: Was würdest du sagen?', rolle: ['kern'], bogen: 'ueben', ziele: ['SOZ-32'], alter: [12, 17], dauer: 10, energie: 1, format: ['rollenspiel', 'gespraech'], q: 'kurs', qt: 'Szenen (Einzelvariante)',
    text: 'Zwei Szenen aus dem Schulalltag lesen. Der Jugendliche wählt, wie er antwortet, und spielt die Antwort einmal laut.' },
  { id: 'k:j2-e04:6', titel: 'Stress-Kurve der Woche', rolle: ['kern'], bogen: 'ueben', ziele: ['V-22', 'K-26'], thema: ['angst'], alter: [12, 17], dauer: 10, energie: 1, format: ['denkmodell', 'schreiben'], q: 'kurs', qt: 'Meine Woche als Kurve (Einzelvariante)',
    text: 'Die Woche als Kurve einzeichnen: Wo stieg die Anspannung, was hat sie gesenkt? Zwei Stellen beschriften.' },
  { id: 'fb:bruecke-september', bruecke: true, titel: 'Was hat sich seit September verändert?', rolle: ['einstieg'], bogen: 'uebertragen', ziele: ['V-22'], alter: [12, 17], dauer: 5, energie: 1, format: ['gespraech'], q: 'freude', qt: 'Brücke zur letzten Stunde',
    text: 'Die Zahlen der letzten Wochen nebeneinanderlegen. Was ist leichter geworden?' },
  { id: 'k:j2-e04:1', titel: 'Was macht Anspannung im Körper?', rolle: ['einstieg'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['angst'], alter: [11, 17], dauer: 5, energie: 1, format: ['gespraech', 'denkmodell'], q: 'kurs', qt: 'Körpersignale (Einzelvariante)',
    text: 'Drei Körpersignale sammeln: Herz, Hände, Bauch. Welches kommt zuerst, wenn eine Probe naht?' },
  { id: 'm:bewegungs-experiment:1', titel: 'Treppen-Experiment: 3 Minuten Bewegung', rolle: ['bewegung'], thema: ['angst'], alter: [11, 17], dauer: 4, energie: 3, format: ['bewegung'], ohneZiel: true, q: 'material', qt: 'Toolbox · Mein Bewegungs-Experiment', tf: ['aufgedreht', 'wuetend'],
    text: 'Drei Minuten Treppe hoch und runter. Vorher und nachher die Zahl auf der Skala schätzen.' },
  // Spielschule
  { id: 's:sp-igel:k1', titel: 'Bilderbuch-Moment: Der Igel muss warten', rolle: ['einstieg'], bogen: 'verstehen', ziele: ['SOZ-14', 'V-10'], thema: ['wut'], alter: [3, 6], dauer: 5, energie: 1, format: ['geschichte'], q: 'spielschule', qt: 'Kreis (Einzelvariante)',
    text: 'Kurze Bildgeschichte: Der Igel will als Erster rutschen. Was kann er tun, statt zu schubsen? Das Kind zeigt auf die Bilder.' },
  { id: 's:sp-tiere:s1', titel: 'Tier-Warteschlange spielen', rolle: ['kern'], bogen: 'ueben', ziele: ['SOZ-14'], alter: [3, 6], dauer: 8, energie: 2, format: ['spiel', 'rollenspiel'], interesse: 'tiere', q: 'spielschule', qt: 'Spiel (Einzelvariante)', material: 'Spieltiere, Rutsche aus Bauklötzen',
    text: 'Spieltiere stehen an der Rutsche an. Das Kind hilft jedem Tier zu warten: „Du bist gleich dran.“ Dann ist das Kind selbst ein Tier.' },
  { id: 's:sp-warten:k3', titel: 'Wartelied mit Sanduhr', rolle: ['kern'], bogen: 'wahrnehmen', ziele: ['SOZ-14', 'V-10'], alter: [3, 6], dauer: 6, energie: 1, format: ['musik', 'spiel'], q: 'spielschule', qt: 'Kreis (Einzelvariante)', material: 'Sanduhr',
    text: 'Die Sanduhr läuft, das Kind summt das Wartelied mit. Ist der Sand unten, ist das Kind dran – erst kurz, dann länger.' },
  { id: 's:sp-autos:s2', titel: 'Auto-Ampel: Warten an der Kreuzung', rolle: ['kern'], bogen: 'uebertragen', ziele: ['SOZ-14', 'V-10'], alter: [3, 7], dauer: 8, energie: 2, format: ['spiel', 'rollenspiel'], interesse: 'autos', q: 'spielschule', qt: 'Spiel (Einzelvariante)', material: 'Spielautos, Ampel-Karte',
    text: 'Spielautos fahren zur Kreuzung. Die Fachkraft zeigt Rot oder Grün – das Kind wartet mit seinem Auto und fährt erst bei Grün.' },
]

/** Mikro-Bausteine: Metadaten + Inhalt (Bausteine des Quellblatts). Höhe in mm für „mittel“. */
interface MikroRoh {
  id: string; blatt: string; nr: string; blattTitel: string; bogen: Bogen; ziele: string[]; thema?: string[]; alter: [number, number]
  stufen: Stufe[]; lesen: 0 | 1 | 2 | 3; schreiben: 0 | 1 | 2 | 3; bild: 0 | 1 | 2 | 3; hoehe: number; format: string[]; art: string[]
  inhalt: Baustein[]; platzhalter?: ('NAME' | 'INTERESSE' | 'WOCHENZIEL')[]; leicht?: boolean; braucht?: string[]; bereich?: Bereich
}

const auf = (text: string, symbole: BlattSymbol[] = []): Baustein => ({ art: 'aufgabe', text, symbole })
const M: MikroRoh[] = [
  { id: 'b:gefuehle-namen:1', blatt: 'gefuehle-haben-viele-namen', nr: 'G-04', blattTitel: 'Gefühle haben viele Namen', art: ['aufgabe', 'skala'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['wut'], alter: [6, 12], stufen: ['C2', 'C3', 'C4'], lesen: 1, schreiben: 1, bild: 2, hoehe: 34, format: ['ankreuzen', 'skala'],
    inhalt: [auf('Wie stark war deine Wut heute? Kreuze an.', ['ankreuzen']), { art: 'skala', von: 'ganz ruhig', bis: 'sehr wütend', stufen: 5, gesichter: true }] },
  { id: 'b:gefuehlswoche:1', blatt: 'meine-gefuehlswoche', nr: 'G-02', blattTitel: 'Meine Gefühlswoche', art: ['aufgabe', 'gefuehle'], bogen: 'wahrnehmen', ziele: ['K-26'], alter: [5, 11], stufen: ['C2', 'C3'], lesen: 0, schreiben: 1, bild: 3, hoehe: 40, format: ['ankreuzen'],
    inhalt: [auf('Wie fühlst du dich gerade? Kreise ein.', ['einkreisen']), { art: 'gefuehle', gefuehle: ['froh', 'ruhig', 'wuetend', 'traurig', 'aengstlich'], modus: 'einkreisen' }] },
  { id: 'b:erst-stopp:2', blatt: 'erst-stopp-dann-denken', nr: 'V-07', blattTitel: 'Erst stopp, dann denken', art: ['aufgabe', 'comic'], bogen: 'verstehen', ziele: ['V-21', 'K-26'], thema: ['wut'], alter: [7, 12], stufen: ['C3', 'C4'], lesen: 1, schreiben: 1, bild: 3, hoehe: 62, format: ['comic'],
    inhalt: [auf('Was kann Luca sagen? Schreibe in die leere Blase.', ['lesen', 'schreiben']), { art: 'comic', felder: [
      { figuren: ['figur:noah:wuetend', 'figur:tom:froh'], text: 'Ben lacht über mein Tor!', sprecher: 0 },
      { figuren: ['figur:noah:ruhig'], text: 'Stopp. Erst atmen.' },
      { figuren: ['figur:noah:ruhig', 'figur:tom:neutral'], text: '', blase: 'sprechen' }] }] },
  { id: 'b:stopp-ampel:1', blatt: 'die-stopp-ampel', nr: 'S-18', blattTitel: 'Die Stopp-Ampel', art: ['aufgabe', 'ampel'], bogen: 'ueben', ziele: ['V-21', 'V-18'], thema: ['wut'], alter: [8, 16], stufen: ['C3', 'C4', 'ES'], lesen: 1, schreiben: 1, bild: 2, hoehe: 70, format: ['denkmodell', 'ankreuzen'],
    inhalt: [auf('Deine Stopp-Ampel: Was tust du bei Rot, Gelb und Grün?', ['schreiben']), { art: 'ampel', stufen: [{ titel: 'Rot: Stopp', text: 'Hände weg · Schritt zurück · Mund zu' }, { titel: 'Gelb: Denken', text: 'Was will ich? Was passiert dann?' }, { titel: 'Grün: Handeln', text: '„Stopp, ich brauche eine Pause.“ · Hilfe holen' }] }] },
  { id: 'b:brodelt:2', blatt: 'wenn-es-in-mir-brodelt', nr: 'V-03', blattTitel: 'Wenn es in mir brodelt', art: ['aufgabe', 'ankreuzen'], bogen: 'ueben', ziele: ['V-21'], thema: ['wut'], alter: [7, 12], stufen: ['C3', 'C4'], lesen: 2, schreiben: 1, bild: 1, hoehe: 40, format: ['ankreuzen'],
    inhalt: [auf('Was hilft dir, wenn es brodelt? Kreuze zwei an.', ['ankreuzen']), { art: 'ankreuzen', spalten: 2, items: ['Ich zähle langsam bis zehn.', 'Ich atme dreimal tief in den Bauch.', 'Ich gehe kurz aus der Situation.', 'Ich drücke meine Hände fest zusammen.', 'Ich sage: „Stopp, ich brauche eine Pause.“', 'Ich trinke ein Glas Wasser.'] }] },
  { id: 'b:stopp-plan-pause:3', blatt: 'mein-stopp-plan-fuer-die-pause', nr: 'V-11', blattTitel: 'Mein Stopp-Plan für die Pause', art: ['aufgabe', 'wennDann'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [8, 14], stufen: ['C3', 'C4', 'ES'], lesen: 1, schreiben: 2, bild: 0, hoehe: 40, format: ['plan', 'schreiben'],
    inhalt: [auf('Dein Plan für die Pause.', ['schreiben']), { art: 'wennDann', zeilen: 1, beispiele: [{ wenn: 'Wenn jemand über mich lacht,', dann: 'gehe ich zwei Schritte weg und atme.' }] }] },
  { id: 'b:ruhig-werden:3', blatt: 'ruhig-werden-drei-uebungen', nr: 'W-05', blattTitel: 'Ruhig werden: drei Übungen', art: ['aufgabe', 'wennDann'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [8, 11], stufen: ['C3', 'C4'], lesen: 1, schreiben: 2, bild: 0, hoehe: 40, format: ['plan', 'schreiben'],
    inhalt: [auf('Dein Plan: Wann setzt du deine beste Übung ein?', ['schreiben']), { art: 'wennDann', zeilen: 1, beispiele: [{ wenn: 'Wenn ich vor dem Diktat nervös bin,', dann: 'mache ich zwei Runden Quadrat-Atmung.' }] }] },
  { id: 'b:ich-botschaften:2', blatt: 'ich-botschaften-in-drei-teilen', nr: 'M-06', blattTitel: 'Ich-Botschaften in drei Teilen', art: ['aufgabe', 'satzanfaenge'], bogen: 'verstehen', ziele: ['K-26'], thema: ['wut', 'freundschaft'], alter: [8, 12], stufen: ['C3', 'C4'], lesen: 1, schreiben: 2, bild: 0, hoehe: 40, format: ['schreiben'],
    inhalt: [auf('Vervollständige die Sätze.', ['schreiben']), { art: 'satzanfaenge', items: ['Ich merke meine Wut an …', 'Dann sage ich: …'] }] },
  { id: 'b:wutvulkan:2', blatt: 'wutvulkan', nr: 'G-01', blattTitel: 'Mein Wutvulkan', art: ['aufgabe', 'vulkan'], bogen: 'ueben', ziele: ['V-21', 'K-26'], thema: ['wut'], alter: [8, 11], stufen: ['C3', 'C4'], lesen: 1, schreiben: 2, bild: 2, hoehe: 90, format: ['denkmodell', 'schreiben'],
    inhalt: [auf('Fülle deinen eigenen Wutvulkan aus. Beginne unten.', ['schreiben']), { art: 'vulkan' }] },
  { id: 'b:wut-tagebuch:1', blatt: 'mein-wut-tagebuch', nr: 'G-09', blattTitel: 'Mein Wut-Tagebuch', art: ['aufgabe', 'tabelle'], bogen: 'uebertragen', ziele: ['V-21', 'K-26'], thema: ['wut'], alter: [9, 14], stufen: ['C4', 'ES'], lesen: 2, schreiben: 3, bild: 0, hoehe: 54, format: ['schreiben', 'plan'],
    inhalt: [auf('Schreibe drei Situationen dieser Woche auf.', ['schreiben']), { art: 'tabelle', spalten: ['Was ist passiert?', 'Was habe ich getan?', 'Wie ging es aus?'], zeilen: 3, beispiel: ['Ben hat gelacht.', 'Ich bin weggegangen.', 'Gut, ich war stolz.'] }] },
  { id: 'b:stopp-ampel:3', blatt: 'die-stopp-ampel', nr: 'S-18', blattTitel: 'Die Stopp-Ampel', art: ['aufgabe', 'karten'], bogen: 'ueben', ziele: ['V-21'], thema: ['wut'], alter: [7, 14], stufen: ['C3', 'C4', 'ES'], lesen: 1, schreiben: 0, bild: 2, hoehe: 40, format: ['karten', 'basteln'],
    inhalt: [auf('Schneide deine Stopp-Karten aus. Eine kommt in die Federmappe.', ['schneiden']), { art: 'karten', spalten: 3, karten: [{ bild: 'icon:hand-stop', text: 'Stopp, ich brauche eine Pause.' }, { bild: 'icon:wind', text: 'Ich atme dreimal tief.' }, { bild: 'icon:door-exit', text: 'Ich gehe kurz raus.' }] }] },
  { id: 'b:gefuehle-namen:3', blatt: 'gefuehle-haben-viele-namen', nr: 'G-04', blattTitel: 'Gefühle haben viele Namen', art: ['aufgabe', 'wortspeicher'], bogen: 'verstehen', ziele: ['K-26'], thema: ['wut'], alter: [7, 12], stufen: ['C3', 'C4'], lesen: 1, schreiben: 0, bild: 0, hoehe: 22, format: ['karten'],
    inhalt: [auf('Wörter für Wut – auch in deiner Sprache.', ['lesen']), { art: 'wortspeicher', items: ['wütend · zangado/a', 'sauer · chateado/a', 'genervt · irritado/a', 'kochen vor Wut · furioso/a'] }] },
  { id: 'b:warten-ist-schwer:1', blatt: 'warten-ist-schwer', nr: 'M-02', blattTitel: 'Warten ist schwer', art: ['aufgabe', 'comic'], bogen: 'verstehen', ziele: ['SOZ-14'], alter: [6, 10], stufen: ['C2', 'C3'], lesen: 1, schreiben: 1, bild: 3, hoehe: 62, format: ['comic'],
    inhalt: [auf('Was kann Nora tun, während sie wartet? Schreibe oder male.', ['lesen', 'malen']), { art: 'comic', felder: [
      { figuren: ['figur:lea:wuetend'], text: 'Ich will jetzt rutschen!' }, { figuren: ['figur:lea:ruhig', 'figur:sami:froh'], text: 'Gleich bin ich dran.' }, { figuren: ['figur:lea:froh'], text: '', blase: 'sprechen' }] }] },
  { id: 'b:frage-heute:1', blatt: 'passgenau-rueckblick', nr: 'W-01', blattTitel: 'Rückblick', art: ['frage'], bogen: 'reflektieren', ziele: [], alter: [8, 17], stufen: ['C3', 'C4', 'ES'], lesen: 1, schreiben: 2, bild: 0, hoehe: 24, format: ['schreiben'],
    inhalt: [{ art: 'frage', text: 'Was hat dir heute am meisten geholfen?', linien: 2 }] },
  { id: 'b:malfeld-gruen:1', blatt: 'die-stopp-ampel', nr: 'S-18', blattTitel: 'Die Stopp-Ampel', art: ['aufgabe', 'feld'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [5, 11], stufen: ['C2', 'C3'], lesen: 0, schreiben: 0, bild: 3, hoehe: 58, format: ['malen'],
    inhalt: [auf('Male dich, wenn du auf Grün bist.', ['malen']), { art: 'feld', zeichnen: true, hoehe: 46, label: 'Platz zum Malen' }] },
  { id: 'b:haende-helfen:2', blatt: 'haende-sind-zum-helfen-da', nr: 'V-02', blattTitel: 'Hände sind zum Helfen da', art: ['aufgabe', 'bilder'], bogen: 'ueben', ziele: ['V-21', 'V-18'], thema: ['wut'], alter: [5, 9], stufen: ['C1', 'C2', 'C3'], lesen: 0, schreiben: 0, bild: 3, hoehe: 46, format: ['ankreuzen'],
    inhalt: [auf('Was kannst du tun, statt zu hauen? Kreise ein.', ['einkreisen']), { art: 'bilder', spalten: 3, modus: 'einkreisen', bilder: [{ bild: 'icon:wind', text: 'atmen' }, { bild: 'icon:door-exit', text: 'weggehen' }, { bild: 'icon:message', text: 'Stopp sagen' }] }] },
  { id: 'b:rueckblick:1', blatt: 'passgenau-rueckblick', nr: 'W-01', blattTitel: 'Rückblick', art: ['rueckblick'], bogen: 'reflektieren', ziele: [], alter: [5, 14], stufen: ['C2', 'C3', 'C4', 'ES'], lesen: 0, schreiben: 1, bild: 2, hoehe: 18, format: ['ankreuzen'],
    inhalt: [{ art: 'rueckblick', frage: 'So war die Stunde für mich:' }] },
  { id: 'b:koerper-wut:1', blatt: 'wo-wohnt-die-wut', nr: 'G-05', blattTitel: 'Wo wohnt die Wut?', art: ['aufgabe', 'koerper'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['wut'], alter: [7, 11], stufen: ['C3', 'C4'], lesen: 1, schreiben: 0, bild: 3, hoehe: 84, format: ['malen'],
    inhalt: [auf('Wo spürst du Wut im Körper? Male an.', ['malen']), { art: 'koerper', legende: [{ farbe: 'rot', text: 'heiß' }, { farbe: 'blau', text: 'kalt' }] }] },
  { id: 'b:wut-thermometer:1', blatt: 'mein-wut-thermometer', nr: 'G-06', blattTitel: 'Mein Wut-Thermometer', art: ['aufgabe', 'thermometer'], bogen: 'wahrnehmen', ziele: ['K-26', 'V-21'], thema: ['wut'], alter: [7, 12], stufen: ['C3', 'C4'], lesen: 1, schreiben: 1, bild: 2, hoehe: 66, format: ['denkmodell'],
    inhalt: [auf('Wie heiß wird deine Wut? Schreibe zu jeder Stufe ein Beispiel.', ['schreiben']), { art: 'thermometer', stufen: [{ titel: 'kochend' }, { titel: 'heiß' }, { titel: 'warm' }, { titel: 'ruhig' }] }] },
  { id: 'b:interesse-szene:1', blatt: 'passgenau-szene', nr: 'V-12', blattTitel: 'Stopp in meinem Lieblingsspiel', art: ['aufgabe', 'frage'], bogen: 'uebertragen', ziele: ['V-21'], thema: ['wut'], alter: [7, 13], stufen: ['C3', 'C4'], lesen: 1, schreiben: 1, bild: 0, hoehe: 28, format: ['schreiben'], platzhalter: ['INTERESSE'],
    inhalt: [auf('Denk an {INTERESSE}: Wann brauchst du dort deine Stopp-Ampel?', ['nachdenken']), { art: 'frage', text: 'Dort sage ich zu mir:', linien: 1 }] },
  // Spielschule (Bildblatt)
  { id: 'b:ich-kann-warten:1', blatt: 'ich-kann-warten', nr: 'SP-31', blattTitel: 'Ich kann warten', art: ['aufgabe', 'bilder'], bogen: 'verstehen', ziele: ['SOZ-14', 'V-10'], alter: [3, 6], stufen: ['C1'], lesen: 0, schreiben: 0, bild: 3, hoehe: 62, format: ['ankreuzen'], bereich: 'miteinander',
    inhalt: [auf('Wer wartet gut? Kreise ein.', ['einkreisen', 'zeigen']), { art: 'bilder', spalten: 3, modus: 'einkreisen', bilder: [{ bild: 'figur:lea:ruhig' }, { bild: 'figur:sami:wuetend' }, { bild: 'figur:mia:froh' }] }] },
  { id: 'b:wie-geht-es-mir:1', blatt: 'wie-geht-es-mir', nr: 'SP-04', blattTitel: 'Wie geht es mir?', art: ['aufgabe', 'gefuehle'], bogen: 'wahrnehmen', ziele: ['K-26', 'SOZ-14'], alter: [3, 7], stufen: ['C1', 'C2'], lesen: 0, schreiben: 0, bild: 3, hoehe: 44, format: ['ankreuzen'], bereich: 'miteinander',
    inhalt: [auf('Wie geht es dir? Zeige.', ['zeigen']), { art: 'gefuehle', gefuehle: ['froh', 'wuetend', 'traurig'], modus: 'nur' }] },
  { id: 'b:warte-ampel:2', blatt: 'die-warte-ampel', nr: 'SP-32', blattTitel: 'Die Warte-Ampel', art: ['aufgabe', 'bild'], bogen: 'ueben', ziele: ['SOZ-14', 'V-10'], alter: [3, 6], stufen: ['C1'], lesen: 0, schreiben: 0, bild: 3, hoehe: 64, format: ['malen'], bereich: 'miteinander',
    inhalt: [auf('Male die Ampel an: {rot} stopp, {gruen} los.', ['malen']), { art: 'bild', bild: 'icon:traffic-lights', groesse: 'xl' }] },
  { id: 'b:warte-turm:1', blatt: 'ich-kann-warten', nr: 'SP-31', blattTitel: 'Ich kann warten', art: ['aufgabe', 'feld'], bogen: 'uebertragen', ziele: ['SOZ-14'], alter: [3, 7], stufen: ['C1', 'C2'], lesen: 0, schreiben: 0, bild: 3, hoehe: 60, format: ['malen'], bereich: 'miteinander',
    inhalt: [auf('Male den Turm, den ihr gebaut habt.', ['malen']), { art: 'feld', zeichnen: true, hoehe: 48 }] },
  { id: 'b:rueckblick-klein:1', blatt: 'passgenau-rueckblick', nr: 'W-01', blattTitel: 'Rückblick', art: ['rueckblick'], bogen: 'reflektieren', ziele: [], alter: [3, 7], stufen: ['C1', 'C2'], lesen: 0, schreiben: 0, bild: 3, hoehe: 18, format: ['ankreuzen'],
    inhalt: [{ art: 'rueckblick' }] },
  // Jugend
  { id: 'b:stress-barometer:1', blatt: 'mein-stress-barometer', nr: 'S-41', blattTitel: 'Mein Stress-Barometer', art: ['aufgabe', 'thermometer'], bogen: 'wahrnehmen', ziele: ['K-26'], thema: ['angst', 'pruefung'], alter: [11, 17], stufen: ['ES'], lesen: 1, schreiben: 1, bild: 1, hoehe: 66, format: ['denkmodell'], bereich: 'skills',
    inhalt: [auf('Trage ein: Was bringt deine Anspannung auf welche Höhe?', ['schreiben']), { art: 'thermometer', stufen: [{ titel: '70–100', text: 'Denken geht kaum.' }, { titel: '30–70', text: 'Es wird eng.' }, { titel: '0–30', text: 'Ich kann klar denken.' }] }] },
  { id: 'b:stress-barometer:2', blatt: 'mein-stress-barometer', nr: 'S-41', blattTitel: 'Mein Stress-Barometer', art: ['aufgabe', 'einschaetzung'], bogen: 'ueben', ziele: ['K-26', 'V-22'], thema: ['angst'], alter: [11, 17], stufen: ['ES'], lesen: 1, schreiben: 1, bild: 0, hoehe: 36, format: ['ankreuzen'], bereich: 'skills',
    inhalt: [auf('Welche Skills helfen dir?', ['ankreuzen']), { art: 'einschaetzung', items: ['5-4-3-2-1', 'Treppe / Bewegung', 'Musik hören', 'Mit jemandem reden'], optionen: ['hilft gut', 'hilft etwas', 'hilft kaum'] }] },
  { id: 'b:vor-der-probe:2', blatt: 'vor-der-probe-mein-plan', nr: 'S-44', blattTitel: 'Vor der Probe: mein Plan', art: ['aufgabe', 'wennDann'], bogen: 'uebertragen', ziele: ['V-22'], thema: ['angst', 'pruefung'], alter: [11, 17], stufen: ['ES'], lesen: 1, schreiben: 2, bild: 0, hoehe: 40, format: ['plan', 'schreiben'], bereich: 'skills',
    inhalt: [auf('Dein Plan für die nächste Probe.', ['schreiben']), { art: 'wennDann', zeilen: 1, beispiele: [{ wenn: 'Wenn meine Zahl über 70 steigt,', dann: 'mache ich 5-4-3-2-1 unter dem Tisch.' }] }] },
  { id: 'b:wozu-gefuehle:1', blatt: 'wozu-sind-gefuehle-gut', nr: 'S-12', blattTitel: 'Wozu sind Gefühle gut?', art: ['info'], bogen: 'verstehen', ziele: ['K-26'], thema: ['angst'], alter: [12, 17], stufen: ['ES'], lesen: 2, schreiben: 0, bild: 0, hoehe: 24, format: ['geschichte'], bereich: 'skills',
    inhalt: [{ art: 'info', titel: 'Gut zu wissen', symbol: 'wissen', text: 'Etwas Anspannung hilft vor einer Probe – sie macht wach. Erst ab etwa 70 wird Denken schwer. Ziel ist nicht null, sondern die Zone, in der du denken kannst.' }] },
  { id: 'b:woche-kurve:3', blatt: 'meine-woche-als-kurve', nr: 'S-47', blattTitel: 'Meine Woche als Kurve', art: ['aufgabe', 'satzanfaenge'], bogen: 'reflektieren', ziele: ['V-22'], alter: [11, 17], stufen: ['ES'], lesen: 1, schreiben: 2, bild: 0, hoehe: 30, format: ['schreiben'], bereich: 'skills',
    inhalt: [auf('Halte fest, was du gemerkt hast.', ['schreiben']), { art: 'satzanfaenge', items: ['Leichter geworden ist …', 'Als Nächstes probiere ich …'] }] },
  { id: 'b:skills-woche:1', blatt: 'meine-skills-woche', nr: 'S-45', blattTitel: 'Meine Skills-Woche', art: ['aufgabe', 'ankreuzen'], bogen: 'ueben', ziele: ['K-26'], thema: ['angst'], alter: [12, 17], stufen: ['ES'], lesen: 1, schreiben: 1, bild: 0, hoehe: 34, format: ['ankreuzen'], bereich: 'skills',
    inhalt: [auf('Was hast du diese Woche ausprobiert? Kreuze an.', ['ankreuzen']), { art: 'ankreuzen', spalten: 2, items: ['5-4-3-2-1', 'kaltes Wasser', 'Treppe laufen', 'Musik', 'Pause machen', 'jemandem schreiben'] }] },
  // Heute geht nicht viel: Mitmach-Seite
  { id: 'b:pg-wahlkarte:1', blatt: 'passgenau-mitmachen', nr: 'P-01', blattTitel: 'Passgenau · Mitmach-Seite', art: ['aufgabe', 'bilder'], bogen: 'wahrnehmen', ziele: [], alter: [4, 17], stufen: ['C1', 'C2', 'C3', 'C4', 'ES'], lesen: 0, schreiben: 0, bild: 3, hoehe: 46, format: ['karten'], leicht: true,
    inhalt: [auf('Heute möchte ich zuerst …', ['zeigen']), { art: 'bilder', bilder: [], spalten: 3, modus: 'einkreisen' }] },
  { id: 'b:pg-stundenleiste:1', blatt: 'passgenau-mitmachen', nr: 'P-01', blattTitel: 'Passgenau · Mitmach-Seite', art: ['bilder'], bogen: 'wahrnehmen', ziele: [], alter: [4, 14], stufen: ['C1', 'C2', 'C3', 'C4'], lesen: 0, schreiben: 0, bild: 3, hoehe: 20, format: ['plan'], leicht: true,
    inhalt: [{ art: 'bilder', bilder: [], klein: true, modus: 'nur' }] },
  { id: 'b:mitmach-fantasietier:1', blatt: 'freude-mitmach-seite', nr: 'F-03', blattTitel: 'Freude & Beziehung · Mitmach-Seite', art: ['aufgabe', 'feld'], bogen: 'uebertragen', ziele: [], alter: [4, 14], stufen: ['C1', 'C2', 'C3', 'C4'], lesen: 0, schreiben: 0, bild: 3, hoehe: 96, format: ['malen'], leicht: true,
    inhalt: [auf('Wir malen zusammen: ein Fantasietier aus zwei Tieren.', ['malen', 'partner']), { art: 'feld', zeichnen: true, hoehe: 84 }] },
  { id: 'b:mitmach-comic:1', blatt: 'freude-mitmach-seite', nr: 'F-03', blattTitel: 'Freude & Beziehung · Mitmach-Seite', art: ['aufgabe', 'comic'], bogen: 'uebertragen', ziele: [], alter: [10, 17], stufen: ['C4', 'ES'], lesen: 0, schreiben: 1, bild: 2, hoehe: 62, format: ['comic'], leicht: true,
    inhalt: [auf('Zeichnet abwechselnd: Jede Person malt ein Feld, das andere erzählt weiter.', ['malen', 'partner']), { art: 'comic', felder: [{ leer: true }, { leer: true }, { leer: true }] }] },
]

// ---------------------------------------------------------------------------------------------------------------
// Katalog bauen
// ---------------------------------------------------------------------------------------------------------------

function kurz(t: string): string { return t.length > 60 ? t.slice(0, 59) + '…' : t }
function hashHex(s: string): string {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return (h >>> 0).toString(16).padStart(8, '0')
}
function hash01(s: string): number { return parseInt(hashHex(s), 16) / 4294967296 }
function stufenAus(alter: [number, number]): Stufe[] {
  const r: Stufe[] = []
  if (alter[0] <= 5) r.push('C1')
  if (alter[0] <= 7 && alter[1] >= 6) r.push('C2')
  if (alter[0] <= 9 && alter[1] >= 8) r.push('C3')
  if (alter[0] <= 11 && alter[1] >= 10) r.push('C4')
  if (alter[1] >= 12) r.push('ES')
  return r
}
const BLATT_TITEL = new Map<string, string>()
const INHALT = new Map<string, Baustein[]>()
const MIKRO_ROH = new Map<string, MikroRoh>()
const SCHRITT_ROH = new Map<string, SchrittRoh>()

/** Textfelder, die der Editor ändern darf: Pfad relativ zum Paket (Index des Bausteins, dann Feld) */
function autoTextfelder(inhalt: Baustein[]): { pfad: string; max: number }[] {
  const r: { pfad: string; max: number }[] = []
  inhalt.forEach((b, i) => {
    const x = b as unknown as Record<string, unknown>
    switch (b.art) {
      case 'aufgabe': case 'frage': r.push({ pfad: `${i}.text`, max: 110 }); break
      case 'info': r.push({ pfad: `${i}.text`, max: 240 }); break
      case 'comic': b.felder.forEach((f, j) => { if (f.text !== undefined) r.push({ pfad: `${i}.felder.${j}.text`, max: 40 }) }); break
      case 'ankreuzen': case 'satzanfaenge': case 'wortspeicher': case 'einschaetzung':
        (x.items as string[]).forEach((_, j) => r.push({ pfad: `${i}.items.${j}`, max: b.art === 'satzanfaenge' ? 50 : 60 })); break
      case 'wennDann': (b.beispiele ?? []).forEach((_, j) => { r.push({ pfad: `${i}.beispiele.${j}.wenn`, max: 60 }); r.push({ pfad: `${i}.beispiele.${j}.dann`, max: 60 }) }); break
      case 'karten': b.karten.forEach((_, j) => r.push({ pfad: `${i}.karten.${j}.text`, max: 40 })); break
      case 'bilder': b.bilder.forEach((bb, j) => { if (bb.text !== undefined) r.push({ pfad: `${i}.bilder.${j}.text`, max: 20 }) }); break
      case 'skala': r.push({ pfad: `${i}.von`, max: 20 }, { pfad: `${i}.bis`, max: 20 }); break
      case 'ampel': case 'thermometer': b.stufen.forEach((s, j) => { r.push({ pfad: `${i}.stufen.${j}.titel`, max: 24 }); if (s.text !== undefined) r.push({ pfad: `${i}.stufen.${j}.text`, max: 60 }) }); break
      case 'rueckblick': if (b.frage) r.push({ pfad: `${i}.frage`, max: 40 }); break
      default: if (typeof x.text === 'string') r.push({ pfad: `${i}.text`, max: 80 })
    }
  })
  return r
}

const HOEHE_FAKTOR: Record<Layout, number> = { bild: 1.35, gross: 1.2, mittel: 1, jugend: 0.9 }

function katalogBauen(): Katalog {
  const eintraege = new Map<string, KatalogEintrag>()
  for (const s of S) {
    SCHRITT_ROH.set(s.id, s)
    const e: Stundenschritt = {
      id: s.id, h: hashHex(s.id + s.text), quelle: { art: s.q, titel: s.qt }, titel: s.titel, text: s.text,
      sagen: s.sagen ? [s.sagen] : undefined, wennEsKippt: s.kippt, rolle: s.rolle, bogen: s.bogen, thema: s.thema ?? [],
      eldib: (s.ziele ?? []).map((code, i) => ({ code, gewicht: i === 0 ? 1 : 0.5 })), kompetenz: [],
      alter: { von: s.alter[0], bis: s.alter[1] }, stufen: stufenAus(s.alter),
      dauer: { min: Math.max(1, Math.round(s.dauer * 0.6)), typ: s.dauer, max: Math.round(s.dauer * 1.5) },
      sozialform: ['einzeln'], einzeltauglich: s.q === 'kurs' || s.q === 'spielschule' || s.q === 'foerderfach' ? 'angepasst' : 'ja',
      einzelvariante: s.q === 'kurs' || s.q === 'spielschule' || s.q === 'foerderfach' ? { text: s.text } : undefined,
      energie: s.energie, belastung: s.belastung ?? 0, reiz: s.energie === 3 ? 2 : 1, format: s.format,
      material: s.material ? [s.material] : [], sprache: { de: true, fr: false }, ohneZiel: s.ohneZiel, tagesform: s.tf,
      qualitaet: s.q === 'freude' ? 'entwurf' : 'geprueft', sicher: {},
      anspruch: s.anspruch, merkmale: s.wettbewerb ? { wettbewerb: true } : undefined, achtung: s.achtung, vorbereitung: s.vorbereitung, elternbrief: s.elternbrief,
      blatt: s.druck, zielgruppe: 'kind',
    }
    eintraege.set(s.id, { typ: 'schritt', ...e })
  }
  for (const m of M) {
    MIKRO_ROH.set(m.id, m)
    INHALT.set(m.id, m.inhalt)
    BLATT_TITEL.set(m.blatt, m.blattTitel)
    const hoehe: Partial<Record<Layout, number>> = {}
    for (const l of ['bild', 'gross', 'mittel', 'jugend'] as Layout[]) hoehe[l] = Math.round(m.hoehe * HOEHE_FAKTOR[l])
    const e: MikroBaustein = {
      id: m.id, h: hashHex(JSON.stringify(m.inhalt)), quelle: { blatt: m.blatt, nr: m.nr, pfad: m.inhalt.map((_, i) => i) },
      art: m.art, bogen: m.bogen, rolle: m.bogen === 'reflektieren' ? ['reflexion', 'abschluss'] : ['uebung'], thema: m.thema ?? [],
      eldib: m.ziele.map((code, i) => ({ code, gewicht: i === 0 ? 1 : 0.5 })), kompetenz: [], alter: { von: m.alter[0], bis: m.alter[1] },
      stufen: m.stufen, lesemenge: m.lesen, schreibmenge: m.schreiben, bildanteil: m.bild, format: m.format,
      dauer: { min: 2, typ: Math.max(3, Math.round(m.hoehe / 9)), max: 15 },
      sozialform: ['einzeln'], einzeltauglich: 'ja', energie: 1, belastung: 0, material: m.format.includes('basteln') ? ['schere'] : [],
      hoehe, braucht: m.braucht, platzhalter: m.platzhalter, textfelder: autoTextfelder(m.inhalt), qualitaet: 'geprueft', sicher: {},
      ohneZiel: m.leicht, zielgruppe: 'kind', sprache: { de: true, fr: m.lesen === 0 },
    }
    eintraege.set(m.id, { typ: 'baustein', ...e })
  }
  const nachRolle = new Map<Rolle, KatalogEintrag[]>()
  for (const e of eintraege.values()) for (const r of e.rolle) nachRolle.set(r, [...(nachRolle.get(r) ?? []), e])
  return { eintraege, nachRolle, stand: '2026-10-09 · Attrappe' }
}

let KATALOG: Katalog | null = null
export function ladeKatalog(): Promise<Katalog> {
  if (!KATALOG) KATALOG = katalogBauen()
  const k = KATALOG
  return new Promise((r) => setTimeout(() => r(k), 30))
}
function kat(): Katalog { return KATALOG ?? (KATALOG = katalogBauen()) }

export function eintrag(k: Katalog, ref: string): KatalogEintrag | undefined { return k.eintraege.get(ref) }

// ---------------------------------------------------------------------------------------------------------------
// Profil ohne Kind
// ---------------------------------------------------------------------------------------------------------------

const ICH_SATZ: Record<string, string> = {
  'V-10': 'Ich warte, bis ich drankomme.', 'V-15': 'Ich beende, was ich angefangen habe.', 'V-18': 'Ich finde andere Wege, wenn etwas nicht klappt.',
  'V-21': 'Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.', 'V-22': 'Ich erkenne, wenn ich mich verbessert habe.',
  'K-12': 'Ich erzähle Erwachsenen, was ich erlebt habe.', 'K-17': 'Ich führe ein Gespräch mit anderen.', 'K-26': 'Ich drücke meine Gefühle mit passenden Worten aus.',
  'K-31': 'Ich finde einen Ausgleich, wenn wir verschiedener Meinung sind.', 'SOZ-14': 'Ich warte, bis ich an der Reihe bin.', 'SOZ-19': 'Ich wechsle mich mit anderen ab.',
  'SOZ-32': 'Ich höre anderen zu und respektiere ihre Meinung.', 'SOZ-34': 'Ich mache Vorschläge, wie wir einen Streit lösen.', 'SOZ-37': 'Ich fühle mit anderen mit.',
}
function stufeAusAlter(a: number): Stufe { return a <= 5 ? 'C1' : a <= 7 ? 'C2' : a <= 9 ? 'C3' : a <= 11 ? 'C4' : 'ES' }
const LAYOUT: Record<Stufe, Layout> = { C1: 'bild', C2: 'gross', C3: 'mittel', C4: 'mittel', ES: 'jugend' }

export function ohneKindProfil(wahl: { alterJahre: number; sprache: Sprache; ziele: string[] }): Profil {
  const st = stufeAusAlter(wahl.alterJahre)
  const lesen = ({ C1: 0, C2: 1, C3: 2, C4: 2, ES: 3 } as const)[st]
  return {
    v: 1, ref: 'ohne-kind', erstellt: new Date().toISOString().slice(0, 19), anrede: null, alterJahre: wahl.alterJahre, stufen: [st], layout: LAYOUT[st],
    sprache: { blatt: wahl.sprache, woerter: [] },
    zugang: { lesen, schreiben: lesen, bild: st === 'C1' ? 3 : 1, tempo: 'normal', struktur: 'normal', quelle: ['alter'] },
    ziele: wahl.ziele.map((code, i) => ({ code, ich: ICH_SATZ[code] ?? 'Ich übe das jeden Tag ein bisschen.', quelle: 'andere', prio: i + 1 })),
    erreicht: [], themen: [], vorsicht: [], interessen: [], wochenziel: null, gemacht: [], folge: null, vorlieben: null,
    rechte: { speichern: false, rueckmelden: false },
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Vorlieben (6.3–6.5)
// ---------------------------------------------------------------------------------------------------------------

const HALBWERT = { kind: 120, ich: 180, team: 365 }
function tage(a: string, b: string): number { return Math.round((Date.parse(b.slice(0, 10)) - Date.parse(a.slice(0, 10))) / 86400000) || 0 }
function heute(): string { return new Date().toISOString().slice(0, 10) }
function verblasst(z: Zaehler | undefined, H: number): { a: number; b: number } {
  if (!z) return { a: 0, b: 0 }
  const f = Math.pow(0.5, Math.max(0, tage(z.t, heute())) / H)
  return { a: z.a * f, b: z.b * f }
}
function pWert(z: { a: number; b: number }, prior: [number, number] = [1, 1]): number {
  const m = (prior[0] + z.a) / (prior[0] + prior[1] + z.a + z.b)
  const c = (z.a + z.b) / (z.a + z.b + 4)
  return (2 * m - 1) * c
}
function vorliebe(v: Vorlieben, ebene: 'kind' | 'ich' | 'team', key: string): number {
  if (ebene === 'team') {
    const t = v.team?.z[key]
    if (!t || !v.team || v.team.personen < 3 || t.n < 3) return 0
    return pWert({ a: t.geklappt + t.hoch * 0.5, b: t.nicht + t.runter })
  }
  if (ebene === 'kind') return v.kind ? pWert(verblasst(v.kind.z[key], HALBWERT.kind), v.kind.prior?.[key]) : 0
  return pWert(verblasst(v.ich.z[key], HALBWERT.ich))
}
function laenge(e: KatalogEintrag): 'kurz' | 'mittel' | 'lang' {
  if (e.typ === 'baustein') return e.schreibmenge >= 2 || (e.hoehe.mittel ?? 0) > 60 ? 'lang' : 'kurz'
  return e.dauer.typ >= 10 ? 'lang' : e.dauer.typ >= 6 ? 'mittel' : 'kurz'
}
function schluessel(e: KatalogEintrag): [string, number][] {
  const l: [string, number][] = [['baustein:' + e.id, 1]]
  for (const f of e.format) l.push(['format:' + f, 0.6])
  l.push(['laenge:' + laenge(e), 0.3])
  if (e.typ === 'baustein') { l.push(['art:' + e.art[e.art.length - 1], 0.4]); l.push(['schreiben:' + e.schreibmenge, 0.3]) }
  else l.push(['quelle:' + e.quelle.art, 0.2])
  for (const t of e.thema) l.push(['thema:' + t, 0.3])
  return l
}
function V(e: KatalogEintrag, v: Vorlieben, deckel = 1): number {
  let s = 0, g = 0
  for (const [k, w] of schluessel(e)) { s += w * (0.5 * vorliebe(v, 'kind', k) + 0.3 * vorliebe(v, 'ich', k) + 0.2 * vorliebe(v, 'team', k)); g += w }
  return g ? Math.max(-deckel, Math.min(deckel, s / g)) : 0
}

// ---------------------------------------------------------------------------------------------------------------
// Planer
// ---------------------------------------------------------------------------------------------------------------

const BOGEN_N: Record<number, Bogen[]> = {
  1: ['ueben'], 3: ['verstehen', 'ueben', 'uebertragen'], 4: ['verstehen', 'ueben', 'uebertragen', 'reflektieren'],
  6: ['wahrnehmen', 'verstehen', 'ueben', 'ueben', 'uebertragen', 'reflektieren'],
  8: ['wahrnehmen', 'verstehen', 'ueben', 'ueben', 'ueben', 'uebertragen', 'uebertragen', 'reflektieren'],
  10: ['wahrnehmen', 'verstehen', 'verstehen', 'ueben', 'ueben', 'ueben', 'uebertragen', 'uebertragen', 'uebertragen', 'reflektieren'],
}
const NACHBAR: Record<Bogen, Bogen[]> = {
  wahrnehmen: ['verstehen'], verstehen: ['wahrnehmen', 'ueben'], ueben: ['verstehen', 'uebertragen'], uebertragen: ['ueben', 'reflektieren'], reflektieren: ['uebertragen'],
}
const BLATT_BOGEN: Record<Bogen | 'leicht', Bogen[]> = {
  wahrnehmen: ['wahrnehmen', 'wahrnehmen', 'verstehen', 'reflektieren'],
  verstehen: ['wahrnehmen', 'verstehen', 'ueben', 'reflektieren'],
  ueben: ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen', 'reflektieren'],
  uebertragen: ['ueben', 'uebertragen', 'uebertragen', 'reflektieren'],
  reflektieren: ['wahrnehmen', 'uebertragen', 'reflektieren'],
  leicht: ['wahrnehmen', 'wahrnehmen', 'uebertragen'],
}
const TITEL: Record<string, [string, string, string]> = {
  'V-21': ['Mein Stopp-Plan', 'Erst stoppen, dann denken, dann handeln.', 'Wut erkennen und stoppen'],
  'K-26': ['Meine Gefühle zeigen', 'Gefühle haben Namen. Wer sie sagen kann, wird besser verstanden.', 'Gefühle zeigen und benennen'],
  'SOZ-14': ['Ich kann warten', 'Warten ist schwer. Mit einem Trick wird es leichter.', 'Warten lernen'],
  'V-10': ['Ich kann warten', 'Gleich bin ich dran.', 'Warten lernen'],
  'V-22': ['Mein Fortschritt', 'Was du schon geschafft hast – und was als Nächstes kommt.', 'Fortschritt sehen'],
  'SOZ-32': ['Respekt im Alltag', 'Zuhören heißt nicht zustimmen.', 'Respekt im Alltag'],
  'V-18': ['Andere Wege finden', 'Wenn etwas nicht klappt, gibt es einen zweiten Weg.', 'Andere Wege finden'],
}
const TF_FORMATE: Record<Tagesform, string[]> = {
  aufgedreht: ['bewegung', 'spiel'], muede: ['malen', 'musik', 'sinne'], traurig: ['malen', 'spiel', 'sinne'], wuetend: ['bewegung', 'musik', 'atmen'],
  aengstlich: ['spiel', 'sinne', 'karten'], rueckzug: ['malen', 'basteln'], 'will-nicht': ['karten', 'malen', 'spiel'], aufgewuehlt: ['bewegung', 'musik', 'atmen', 'sinne'],
}
const TF_HEUTE: Record<Tagesform, [number, number, number]> = {
  aufgedreht: [7, 3, 4], muede: [2, 3, 4], traurig: [3, 3, 2], wuetend: [6, 2, 2], aengstlich: [3, 3, 3], rueckzug: [3, 4, 3], 'will-nicht': [3, 2, 3], aufgewuehlt: [6, 2, 2],
}

type Slot = { rolle: Rolle | 'blatt'; min: number }
function vorlage(dauer: number, h?: { energie: number; konzentration: number; stimmung: number }, leicht = false, ohneBlatt = false): Slot[] {
  let v: Slot[]
  if (leicht) {
    v = dauer <= 10 ? [{ rolle: 'ankommen', min: 2 }, { rolle: 'einstieg', min: 2 }, { rolle: 'spiel', min: 5 }, { rolle: 'abschluss', min: 1 }]
      : dauer <= 20 ? [{ rolle: 'ankommen', min: 3 }, { rolle: 'einstieg', min: 2 }, { rolle: 'bewegung', min: 5 }, { rolle: 'spiel', min: 7 }, { rolle: 'abschluss', min: 3 }]
        : [{ rolle: 'ankommen', min: 4 }, { rolle: 'einstieg', min: 2 }, { rolle: 'bewegung', min: 6 }, { rolle: 'spiel', min: 10 }, { rolle: 'blatt', min: 5 }, { rolle: 'abschluss', min: 3 }]
    return v
  }
  if (dauer <= 10) v = [{ rolle: 'ankommen', min: 2 }, { rolle: 'kern', min: 6 }, { rolle: 'abschluss', min: 2 }]
  else if (dauer <= 15) v = [{ rolle: 'ankommen', min: 3 }, { rolle: 'kern', min: 9 }, { rolle: 'abschluss', min: 3 }]
  else if (dauer <= 20) v = [{ rolle: 'ankommen', min: 3 }, { rolle: 'kern', min: 10 }, { rolle: 'blatt', min: 4 }, { rolle: 'abschluss', min: 3 }]
  else if (dauer <= 30) v = [{ rolle: 'ankommen', min: 4 }, { rolle: 'einstieg', min: 3 }, { rolle: 'kern', min: 10 }, { rolle: 'blatt', min: 9 }, { rolle: 'abschluss', min: 4 }]
  else if (dauer <= 45) v = [{ rolle: 'ankommen', min: 5 }, { rolle: 'einstieg', min: 5 }, { rolle: 'kern', min: 12 }, { rolle: 'bewegung', min: 5 }, { rolle: 'blatt', min: 13 }, { rolle: 'abschluss', min: 5 }]
  else v = [{ rolle: 'ankommen', min: 5 }, { rolle: 'einstieg', min: 5 }, { rolle: 'kern', min: 15 }, { rolle: 'bewegung', min: 8 }, { rolle: 'blatt', min: 15 }, { rolle: 'reflexion', min: 5 }, { rolle: 'abschluss', min: 7 }]
  if (ohneBlatt) v = v.map((s) => (s.rolle === 'blatt' ? { rolle: dauer >= 45 ? 'spiel' : 'bewegung', min: s.min } : s))
  if (h && h.energie >= 6 && dauer >= 20 && !v.some((s) => s.rolle === 'bewegung')) {
    // Bewegung direkt nach dem Ankommen, Einstieg kürzer
    const e = v.find((s) => s.rolle === 'einstieg' || s.rolle === 'kern')!
    const bw = Math.min(5, Math.max(3, e.min - 3))
    e.min -= Math.max(1, bw - 1); const bl = v.find((s) => s.rolle === 'blatt'); if (bl) bl.min -= 1; else e.min -= 1
    v.splice(1, 0, { rolle: 'bewegung', min: bw })
  } else if (h && h.energie >= 6) {
    const i = v.findIndex((s) => s.rolle === 'bewegung'); const [b] = v.splice(i, 1); v.splice(1, 0, b)
  }
  if (h && h.konzentration <= 3) { const k = v.find((s) => s.rolle === 'kern')!; const d = k.min - 8; if (d > 0) { k.min = 8; v[v.length - 1].min += d } }
  if (h && h.stimmung <= 2 && dauer >= 20) { v[0].min += 2; v[v.length - 1].min -= 1; const bl = v.find((s) => s.rolle === 'blatt') ?? v.find((s) => s.rolle === 'kern')!; bl.min -= 1 }
  return v
}

interface Ctx { p: Profil; a: Auftrag; v: Vorlieben; phase: Bogen | 'leicht'; nr: number; gesperrt: Set<string>; heute?: Auftrag['heute']; vorher: boolean; formate: string[]; salz?: string }

function zielWert(e: KatalogEintrag, ziele: string[]): number {
  let w = 0
  for (const z of e.eldib) { const i = ziele.indexOf(z.code); if (i >= 0) w = Math.max(w, [1, 0.8, 0.6][i] ?? 0.5) * (z.gewicht === 1 ? 1 : 0.5) }
  return w
}
function themaWert(e: KatalogEintrag, p: Profil, datum: string, auftragThema: string[] = []): number {
  let w = 0
  for (const t of auftragThema) if (e.thema.includes(t) || e.kompetenz.includes(t.replace(/^kompetenz:/, ''))) w = 1
  for (const t of p.themen) if (e.thema.includes(t.key)) { const d = tage(t.datum, datum); w = Math.max(w, d <= 14 ? 1 : d <= 30 ? 0.7 : d <= 60 ? 0.4 : 0) }
  return w
}
function interesseWert(e: KatalogEintrag, p: Profil): number {
  const i = SCHRITT_ROH.get(e.id)?.interesse
  if (i && p.interessen.includes(i)) return 1
  return e.typ === 'baustein' && e.platzhalter?.includes('INTERESSE') && p.interessen.length ? 1 : 0
}
function passt(e: KatalogEintrag, c: Ctx): boolean {
  const a = c.p.alterJahre
  if (a < e.alter.von - 1 || a > e.alter.bis + 1) return false
  if (c.gesperrt.has(e.id)) return false
  if (e.typ === 'schritt') {
    if (e.einzeltauglich === 'nein') return false
    if (SCHRITT_ROH.get(e.id)?.bruecke && !c.vorher) return false
    if (c.phase === 'leicht' && !e.ohneZiel) return false
    if (c.phase !== 'leicht' && e.ohneZiel && e.rolle.some((r) => r === 'einstieg' || r === 'kern')) return false
    if (c.heute && c.heute.stimmung <= 2 && e.belastung >= 2) return false
    if (c.heute && c.heute.energie <= 2 && e.energie === 3 && e.dauer.typ > 3) return false
    const tfs = c.a.tagesformen ?? (c.a.tagesform ? [c.a.tagesform] : [])
    if (e.merkmale?.wettbewerb && (tfs.some((t) => ['wuetend', 'aufgewuehlt', 'aufgedreht', 'aengstlich'].includes(t)) || (c.heute && c.heute.stimmung <= 2) || c.p.vorsicht.includes('trauma'))) return false
    if (c.p.vorsicht.includes('reiz') && e.reiz >= 2) return false
    if (c.phase === 'leicht' && (e.rolle.includes('ankommen') || e.rolle.includes('abschluss'))) {
      const streng = tfs.some((t) => ['traurig', 'aengstlich', 'rueckzug', 'will-nicht', 'aufgewuehlt'].includes(t))
      if ((e.anspruch ?? 1) > (streng ? 0 : 1)) return false
    }
  } else {
    if (!!MIKRO_ROH.get(e.id)?.leicht !== (c.phase === 'leicht')) return false
    if (e.lesemenge > c.p.zugang.lesen + 1 || e.schreibmenge > c.p.zugang.schreiben + 1) return false
    if (c.p.gemacht.some((g) => g.id === 'blatt:' + e.quelle.blatt && tage(g.am, c.a.datum) < 42)) return false
    if (c.p.alterJahre >= 12 && !e.stufen.includes('ES')) return false
  }
  return true
}
function wert(e: KatalogEintrag, c: Ctx, inStunde: KatalogEintrag[]): { s: number; gruende: [string, number][] } {
  const leicht = c.phase === 'leicht'
  const ziele = leicht ? [] : c.a.ziele
  const f: [string, number][] = []
  const zw = zielWert(e, ziele); f.push(['ziel', (leicht ? 0 : 0.35) * zw])
  const ph = c.phase === 'leicht' ? 0.5 : e.bogen === c.phase ? 1 : e.bogen && NACHBAR[c.phase].includes(e.bogen) ? 0.35 : e.bogen ? 0 : 0.5
  f.push(['phase', (leicht ? 0 : 0.15) * ph])
  let zg = 1
  if (e.typ === 'baustein') zg = 1 - (Math.abs(e.lesemenge - c.p.zugang.lesen) + Math.abs(e.schreibmenge - c.p.zugang.schreiben) + Math.max(0, c.p.zugang.bild - e.bildanteil)) / 6
  f.push(['zugang', 0.15 * zg])
  f.push(['thema', (leicht ? 0 : c.a.ziele.length ? 0.12 : 0.35) * themaWert(e, c.p, c.a.datum, c.a.thema)])
  let tf = 0.5
  const tfs = c.a.tagesformen?.length ? c.a.tagesformen : c.a.tagesform ? [c.a.tagesform] : []
  if (leicht && tfs.length) tf = e.typ === 'schritt' && e.tagesform?.some((t) => tfs.includes(t)) ? 1 : e.format.some((x) => tfs.some((t) => TF_FORMATE[t].includes(x))) ? 0.7 : 0.2
  else if (c.heute) {
    const en = c.heute.energie
    tf = en >= 6 ? (e.energie === 3 ? 1 : e.energie === 2 ? 0.7 : 0.4) : en <= 2 ? (e.energie === 1 ? 1 : 0.3) : 0.6
    if (c.heute.konzentration <= 3 && e.typ === 'schritt' && e.dauer.typ > 10) tf *= 0.6
  }
  f.push(['tagesform', (leicht ? 0.35 : 0.1) * tf])
  const schon = inStunde.flatMap((x) => x.format)
  f.push(['abwechslung', (leicht ? 0.2 : 0.05) * (e.format.some((x) => schon.includes(x)) ? 0.4 : 1)])
  f.push(['qualitaet', 0.05 * (e.qualitaet === 'geprueft' ? 1 : 0.5)])
  f.push(['interesse', (leicht ? 0.25 : 0.03) * interesseWert(e, c.p)])
  let wunsch = 0
  for (const w of c.formate) if (e.format.includes(w)) wunsch = 0.06
  if (c.formate.includes('schreiben-weg') && e.format.includes('schreiben')) wunsch -= 0.08
  const g = f.reduce((s, x) => s + x[1], 0) + wunsch
  const vv = V(e, c.v, leicht ? 1 : 1)
  const deckel = leicht ? 0.4 : 0.3
  return { s: g * (1 + deckel * vv), gruende: [...f, ['vorliebe', g * deckel * vv]] }
}
function warumKeys(e: KatalogEintrag, c: Ctx, gruende: [string, number][], rolle: Rolle | 'blatt'): string[] {
  if (rolle === 'ankommen' || rolle === 'abschluss') if (e.typ === 'schritt' && (e.quelle.art === 'ritual' || e.ohneZiel)) return ['ritual']
  const r: string[] = []
  const sorted = [...gruende].sort((a, b) => b[1] - a[1])
  for (const [g, w] of sorted) {
    if (r.length >= 2 || w <= 0.01) break
    if (g === 'ziel') { const z = e.eldib.find((x) => c.a.ziele.includes(x.code)); if (z) r.push('ziel:' + z.code) }
    else if (g === 'thema') {
      const t = c.p.themen.find((x) => e.thema.includes(x.key))
      if (t) r.push('thema:' + t.key + ':' + t.art + ':' + t.datum)
      else if (!c.a.ziele.length && c.a.thema?.length) r.push('schwerpunkt:' + c.a.thema[0])
    }
    else if (g === 'phase' && c.phase !== 'leicht') r.push('phase:' + c.phase + ':' + c.nr)
    else if (g === 'zugang' && e.typ === 'baustein' && w > 0.12) r.push('zugang')
    else if (g === 'tagesform' && (c.heute || c.a.tagesform)) r.push(c.phase === 'leicht' && c.a.tagesform ? 'tagesform:' + (c.a.tagesformen ?? [c.a.tagesform]).join('+') : 'heute:energie:' + (c.heute?.energie ?? 4))
    else if (g === 'interesse') { const i = SCHRITT_ROH.get(e.id)?.interesse ?? c.p.interessen[0]; if (i) r.push('interesse:' + i) }
    else if (g === 'vorliebe') {
      const f = e.format.find((x) => vorliebe(c.v, 'kind', 'format:' + x) > 0.15)
      if (f) { const z = verblasst(c.v.kind?.z['format:' + f], HALBWERT.kind); r.push(`kind:format:${f}:${Math.round(z.a)}:${Math.round(z.a + z.b)}`) }
      else { const fi = e.format.find((x) => vorliebe(c.v, 'ich', 'format:' + x) > 0.15); if (fi) r.push('ich:format:' + fi) }
    }
  }
  const t = c.v.team?.z['baustein:' + e.id]
  if (t && c.v.team && c.v.team.personen >= 3 && t.n >= 5 && r.length < 2) r.push(`team:${t.n}:${Math.round((100 * t.geklappt) / Math.max(1, t.geklappt + t.teils + t.nicht))}`)
  if (!r.length && c.phase === 'leicht') r.push('leicht')
  return r
}
function waehle(l: { e: KatalogEintrag; s: number }[], salz: string): { e: KatalogEintrag; s: number } | undefined {
  return [...l].sort((a, b) => b.s - a.s || hash01(a.e.id + salz) - hash01(b.e.id + salz))[0]
}
type SchrittEintrag = Extract<KatalogEintrag, { typ: 'schritt' }>
function kandidaten(rolle: Rolle, c: Ctx): SchrittEintrag[] {
  const rollen: Rolle[] = rolle === 'bewegung' ? ['bewegung', 'regulation'] : rolle === 'spiel' ? ['spiel', 'bewegung'] : rolle === 'reflexion' ? ['reflexion', 'abschluss'] : [rolle]
  return [...kat().eintraege.values()].filter((e): e is SchrittEintrag => e.typ === 'schritt' && e.rolle.some((r) => rollen.includes(r)) && passt(e, c))
}

function ritualWahl(rolle: 'ankommen' | 'abschluss', c: Ctx, gewuenscht?: string): string | undefined {
  const g = gewuenscht ? kat().eintraege.get(gewuenscht) : undefined
  if (g && (c.phase !== 'leicht' || passt(g, { ...c, gesperrt: new Set() }))) return g.id
  const l = kandidaten(rolle, { ...c, gesperrt: new Set() }).filter((e) => e.typ === 'schritt' && e.ohneZiel)
  return waehle(l.map((e) => ({ e, s: wert(e, c, []).s })), c.p.ref)?.e.id
}

function blattBauen(c: Ctx, schritte: KatalogEintrag[]): { titel: string; bausteine: BlattTeil[] } {
  const ph = c.phase
  const plaetze = [...BLATT_BOGEN[ph]]
  if (c.heute && c.heute.konzentration <= 3) plaetze.splice(1, plaetze.length - 3)
  const gewaehlt: KatalogEintrag[] = []
  const zahlBlatt = new Map<string, number>()
  const layout = c.p.layout
  const seiten = layout === 'bild' || layout === 'gross' ? 1 : c.a.dauer >= 45 ? 2 : 1
  const budget = seiten * 268 - 64 - (ph === 'leicht' ? 0 : 20)
  let hoehe = 0
  for (const b of plaetze) {
    const l = [...kat().eintraege.values()].filter((e): e is Extract<KatalogEintrag, { typ: 'baustein' }> =>
      e.typ === 'baustein' && passt(e, c) && !gewaehlt.includes(e) && (zahlBlatt.get(e.quelle.blatt) ?? 0) < 2 &&
      (e.bogen === b || (b !== 'reflektieren' && NACHBAR[b].includes(e.bogen) && e.bogen !== 'reflektieren')) &&
      hoehe + (e.hoehe[layout] ?? 40) + 5 <= budget)
    const w = waehle(l.map((e) => ({ e, s: wert(e, c, gewaehlt).s + (e.bogen === b ? 0.1 : 0) })), (c.salz ?? c.p.seed ?? c.p.ref) + c.nr + b)
    if (!w || w.e.typ !== 'baustein') continue
    gewaehlt.push(w.e); zahlBlatt.set(w.e.quelle.blatt, (zahlBlatt.get(w.e.quelle.blatt) ?? 0) + 1)
    hoehe += (w.e.hoehe[layout] ?? 40) + 5
  }
  void schritte
  const t = TITEL[c.a.ziele[0]]
  return {
    titel: ph === 'leicht' ? 'Heute machen wir es uns leicht' : t ? t[0] : 'Mein Blatt für heute',
    bausteine: gewaehlt.map((e) => ({ ref: e.id, h: e.h, t: kurz(textVon(e, 'de').titel) })),
  }
}

function stundePlanen(c: Ctx, rituale: { ankommen?: string; abschluss?: string }): Sitzung {
  const ohne = c.a.blatt === 'ohne' || (c.a.blatt === undefined && c.p.alterJahre <= 5 && c.phase !== 'leicht')
  const slots = vorlage(c.a.dauer, c.heute, c.phase === 'leicht', ohne)
  const schritte: PlanSchritt[] = []
  const inStunde: KatalogEintrag[] = []
  const gesperrt = new Set(c.gesperrt)
  for (const sl of slots) {
    if (sl.rolle === 'blatt') { schritte.push({ ref: 'blatt:' + c.nr, h: '', rolle: 'uebung', min: sl.min }); continue }
    if (sl.rolle === 'ankommen' || sl.rolle === 'abschluss') {
      const id = rituale[sl.rolle] ?? ritualWahl(sl.rolle, c)
      const e = id ? kat().eintraege.get(id) : undefined
      if (e) { schritte.push({ ref: e.id, h: e.h, rolle: sl.rolle, min: sl.min, warum: ['ritual'], t: kurz(textVon(e, 'de').titel) }); inStunde.push(e) }
      continue
    }
    if (c.phase === 'leicht' && sl.rolle === 'einstieg') {
      const e = kat().eintraege.get('fb:wahlkarte')!
      schritte.push({ ref: e.id, h: e.h, rolle: 'einstieg', min: sl.min, warum: ['wahl'] }); inStunde.push(e); continue
    }
    const l = kandidaten(sl.rolle, { ...c, gesperrt }).map((e) => ({ e, ...wert(e, c, inStunde) }))
    const w = waehle(l, (c.salz ?? c.p.seed ?? c.p.ref) + c.nr + sl.rolle)
    if (!w) continue
    gesperrt.add(w.e.id); inStunde.push(w.e)
    const g = l.find((x) => x.e === w.e)!.gruende
    const min = Math.max(w.e.dauer.min, Math.min(w.e.dauer.max, sl.min))
    schritte.push({ ref: w.e.id, h: w.e.h, rolle: sl.rolle, min, warum: warumKeys(w.e, c, g, sl.rolle), t: kurz(textVon(w.e, 'de').titel) })
  }
  // Erkundung (6.6): neben dem Kern, reproduzierbar
  const rate = c.v.ich.erkundung ?? 0.2
  const frei = schritte.map((s, i) => [s, i] as const).filter(([s]) => ['einstieg', 'bewegung', 'spiel', 'regulation'].includes(s.rolle) && !s.warum?.includes('wahl'))
  const zufall = hash01((c.salz ?? c.p.seed ?? c.p.ref) + 'erk' + c.nr)
  if (frei.length && zufall < Math.min(1, rate * (frei.length + 1))) {
    const [s, i] = frei[Math.floor(hash01(c.p.ref + c.nr + 'slot') * frei.length)]
    const alt = kat().eintraege.get(s.ref)!
    const l = kandidaten(s.rolle, { ...c, gesperrt: new Set([...gesperrt, ...inStunde.map((x) => x.id)]) })
      .filter((e) => !e.format.some((f) => alt.format.includes(f)) && vorliebe(c.v, 'kind', 'baustein:' + e.id) > -0.3)
      .map((e) => ({ e, s: wert(e, c, inStunde).s }))
    const best = waehle(l, 'erk' + c.nr)
    const gAlt = wert(alt, c, inStunde).s
    if (best && best.s >= 0.85 * gAlt) {
      schritte[i] = { ...s, ref: best.e.id, h: best.e.h, erkundung: true, min: Math.max(best.e.dauer.min, Math.min(best.e.dauer.max, s.min)),
        warum: ['erkundung', ...warumKeys(best.e, c, wert(best.e, c, inStunde).gruende, s.rolle).slice(0, 1)] }
    }
  }
  minutenAusgleichen(schritte, c.a.dauer)
  const blattSlot = slots.some((x) => x.rolle === 'blatt')
  const blatt = (ohne || !blattSlot) && c.phase !== 'leicht' ? { titel: '', bausteine: [] } : blattBauen(c, inStunde)
  const hinweise: string[] = []
  if (!ohne && blattSlot && c.phase !== 'leicht' && blatt.bausteine.length < 2) hinweise.push('Wenig passendes Material fürs Blatt – ohne Blatt planen oder im Baukasten suchen.')
  return { nr: c.nr, phase: c.phase, status: 'geplant', datum: null, schritte, blatt: blatt.bausteine.length ? blatt : null, rueckmeldung: null, ...(hinweise.length ? { hinweise } : {}) }
}

function minutenAusgleichen(schritte: PlanSchritt[], dauer: number): void {
  const summe = schritte.reduce((s, x) => s + x.min, 0)
  let d = dauer - summe
  const reihen = ['uebung', 'kern', 'spiel', 'einstieg', 'bewegung']
  for (const r of reihen) {
    if (!d) break
    const s = schritte.find((x) => x.rolle === r)
    if (!s) continue
    const e = s.ref.startsWith('blatt') ? null : kat().eintraege.get(s.ref)
    const max = e ? e.dauer.max : 30, min = e ? e.dauer.min : 3
    const neu = Math.max(min, Math.min(max, s.min + d))
    d -= neu - s.min; s.min = neu
  }
}

function auftragZiele(p: Profil, a: Auftrag): string[] {
  return a.ziele.length ? a.ziele : [...p.ziele].sort((x, y) => x.prio - y.prio).slice(0, 2).map((z) => z.code)
}

function planId(p: Profil, a: Auftrag, n: number): string { return 'pl-' + hashHex(p.ref + a.datum + a.weg + n + a.ziele.join()).slice(0, 6) }

function folgePlanen(k: Katalog, p: Profil, a: Auftrag, v: Vorlieben, opt: { id?: string; titel?: string; gehalten?: number } = {}): Plan {
  void k
  const ziele = auftragZiele(p, a)
  const aa: Auftrag = { ...a, ziele }
  const n = a.n
  const bogen = BOGEN_N[n] ?? BOGEN_N[6]
  const id = opt.id ?? planId(p, aa, n)
  const c0: Ctx = { p, a: aa, v, phase: bogen[0], nr: 1, gesperrt: new Set(), vorher: false, formate: formateAus(a), salz: (p.seed ?? p.ref) + id }
  const rituale = { ankommen: ritualWahl('ankommen', c0, p.rituale?.ankommen), abschluss: ritualWahl('abschluss', c0, p.rituale?.abschluss) }
  const gesperrt = new Set<string>()
  const sitzungen: Sitzung[] = []
  for (let i = 0; i < n; i++) {
    const c: Ctx = { ...c0, phase: bogen[i], nr: i + 1, gesperrt: new Set(gesperrt), vorher: i > 0 || !!p.folge, heute: i === 0 || i === (opt.gehalten ?? -1) ? a.heute : undefined }
    const s = stundePlanen(c, rituale)
    s.schritte.forEach((x) => { if (x.rolle !== 'ankommen' && x.rolle !== 'abschluss') gesperrt.add(x.ref) })
    s.blatt?.bausteine.forEach((x) => gesperrt.add(x.ref))
    sitzungen.push(s)
  }
  const t = TITEL[ziele[0]]
  return {
    id, erstellt: new Date().toISOString().slice(0, 16), weg: a.weg, gewichte: 'V1',
    titel: opt.titel ?? (n > 1 ? (t ? t[2] : 'Folge' + schwerpunktText(a)) : 'Einzelstunde' + schwerpunktText(a)), ziele, n, dauer: a.dauer, vorlage: null, kinder: ['self'], auftrag: aa, sitzungen,
    variante: 0, katalogStand: kat().stand,
  }
}
function schwerpunktText(a: Auftrag): string {
  const t = a.thema?.[0]
  if (!t) return ''
  const k = t.replace(/^kompetenz:/, '')
  return ': ' + (({ wut: 'Wut & Impulse', angst: 'Angst & Sorgen', freundschaft: 'Freundschaft & Streit', trauer: 'Trauer & Trost' } as Record<string, string>)[k] ?? k)
}
function formateAus(a: Auftrag): string[] {
  const r: string[] = []
  for (const f of a.formate ?? []) {
    if (f === 'bewegung') r.push('bewegung')
    if (f === 'kreativ') r.push('malen', 'basteln', 'comic')
    if (f === 'gespraech') r.push('gespraech')
    if (f === 'spiel') r.push('spiel', 'rollenspiel')
    if (f === 'wenig-schreiben') r.push('schreiben-weg')
  }
  return r
}

export function planen(k: Katalog, p: Profil, a: Auftrag, v: Vorlieben, verlauf: Verlauf): Plan {
  if (a.weg === 'leicht') {
    const tfs = (a.tagesformen?.length ? a.tagesformen : [a.tagesform ?? 'muede']).slice(0, 2)
    const hs = tfs.map((t) => TF_HEUTE[t])
    const h = [0, 1, 2].map((i) => Math.round(hs.reduce((x, y) => x + y[i], 0) / hs.length))
    const aa: Auftrag = { ...a, ziele: [], n: 1, tagesform: tfs[0], tagesformen: tfs, heute: { energie: h[0], konzentration: h[1], stimmung: h[2] } }
    const c: Ctx = { p, a: aa, v, phase: 'leicht', nr: 1, gesperrt: new Set(), vorher: false, heute: aa.heute, formate: [], salz: (p.seed ?? p.ref) + tfs.join() + a.dauer }
    const rituale = { ankommen: ritualWahl('ankommen', c, p.rituale?.ankommen), abschluss: ritualWahl('abschluss', c, p.rituale?.abschluss) }
    const s = stundePlanen(c, rituale)
    return { id: planId(p, aa, 1), erstellt: new Date().toISOString().slice(0, 16), weg: 'leicht', gewichte: 'V1', titel: 'Heute geht nicht viel', ziele: [], n: 1, dauer: a.dauer, vorlage: null, kinder: ['self'], auftrag: aa, sitzungen: [s] }
  }
  if (a.weg === 'schnell' && p.folge) {
    // Weiter mit der laufenden Folge: nächste Sitzung an die Tagesform angepasst
    const f = p.folge
    let plan = verlauf.plaene.find((x) => x.id === f.id)
    if (!plan) {
      plan = folgePlanen(k, p, { ...a, weg: 'gruendlich', n: f.n, ziele: auftragZiele(p, a), datum: tageVor(a.datum, 7 * (f.gehalten + 1)), heute: undefined }, v, { id: f.id, titel: f.titel })
      plan.sitzungen.forEach((s, i) => {
        if (i < f.gehalten) {
          s.status = 'gehalten'; s.datum = tageVor(a.datum, 7 * (f.gehalten - i))
          s.rueckmeldung = { ergebnis: i === f.gehalten - 1 && f.gehalten > 1 ? 'teils' : 'geklappt', chips: i === f.gehalten - 1 && f.gehalten > 1 ? ['brauchte eine Pause'] : ['hat mitgemacht'], am: s.datum }
        }
      })
    }
    const i = plan.sitzungen.findIndex((s) => s.status !== 'gehalten')
    if (i < 0) return plan
    const gesperrt = new Set<string>()
    plan.sitzungen.forEach((s, j) => { if (j !== i) { s.schritte.forEach((x) => { if (x.rolle !== 'ankommen' && x.rolle !== 'abschluss') gesperrt.add(x.ref) }); s.blatt?.bausteine.forEach((b) => gesperrt.add(b.ref)) } })
    const aa: Auftrag = { ...a, ziele: plan.ziele }
    const c: Ctx = { p, a: aa, v, phase: plan.sitzungen[i].phase as Bogen, nr: i + 1, gesperrt, vorher: true, heute: a.heute, formate: [] }
    const erste = plan.sitzungen[0].schritte
    const rituale = { ankommen: erste.find((x) => x.rolle === 'ankommen')?.ref, abschluss: erste.find((x) => x.rolle === 'abschluss')?.ref }
    const s = stundePlanen(c, rituale)
    const sitzungen = plan.sitzungen.map((x, j) => (j === i ? s : x))
    return { ...plan, dauer: a.dauer, sitzungen }
  }
  const n = a.weg === 'schnell' ? 1 : a.n
  return folgePlanen(k, p, { ...a, n }, v)
}
function tageVor(iso: string, n: number): string {
  const d = new Date(iso.slice(0, 10) + 'T12:00:00'); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10)
}

function ctxFuer(p: Profil, plan: Plan, nr: number, v: Vorlieben, gesperrtExtra: string[] = []): Ctx {
  const a: Auftrag = plan.auftrag ?? { weg: plan.weg, ziele: plan.ziele, n: plan.n, dauer: (plan.dauer as Auftrag['dauer']) || 30, sozialform: 'einzeln', sprache: p.sprache.blatt, datum: plan.erstellt.slice(0, 10) }
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const gesperrt = new Set<string>(gesperrtExtra)
  plan.sitzungen.forEach((x) => { if (x.nr !== nr) { x.schritte.forEach((y) => { if (y.rolle !== 'ankommen' && y.rolle !== 'abschluss') gesperrt.add(y.ref) }); x.blatt?.bausteine.forEach((b) => gesperrt.add(b.ref)) } })
  return { p, a: { ...a, ziele: plan.ziele }, v, phase: s.phase, nr, gesperrt, vorher: nr > 1, heute: nr === 1 ? a.heute : undefined, formate: formateAus(a), salz: (p.seed ?? p.ref) + plan.id + (plan.variante ?? 0) }
}

export function sitzungNeu(k: Katalog, p: Profil, plan: Plan, nr: number, v: Vorlieben): Plan {
  void k
  const alt = plan.sitzungen.find((x) => x.nr === nr)!
  const sperre = [...alt.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss').map((x) => x.ref), ...(alt.blatt?.bausteine.map((b) => b.ref) ?? [])]
  const c = ctxFuer(p, plan, nr, v, sperre)
  c.salz = (c.salz ?? '') + '+' + hashHex(sperre.join())
  const rituale = { ankommen: alt.schritte.find((x) => x.rolle === 'ankommen')?.ref, abschluss: alt.schritte.find((x) => x.rolle === 'abschluss')?.ref }
  const s = stundePlanen(c, rituale)
  return { ...plan, variante: (plan.variante ?? 0) + 1, sitzungen: plan.sitzungen.map((x) => (x.nr === nr ? { ...s, status: x.status === 'gehalten' ? 'geplant' : x.status } : x)) }
}

function mmr<T extends { e: KatalogEintrag; s: number }>(l: T[], anzahl: number): T[] {
  const r: T[] = []
  const rest = [...l]
  while (r.length < anzahl && rest.length) {
    let bi = 0, bw = -Infinity
    rest.forEach((x, i) => {
      const sim = r.some((y) => y.e.format[0] === x.e.format[0]) ? 1 : 0
      const w = 0.7 * x.s - 0.3 * sim * 0.3
      if (w > bw) { bw = w; bi = i }
    })
    r.push(rest.splice(bi, 1)[0])
  }
  return r
}

export function alternativen(k: Katalog, p: Profil, plan: Plan, ort: { sitzung: number; schritt?: number; blatt?: number }, v: Vorlieben, anzahl = 5): Alternative[] {
  void k
  const s = plan.sitzungen.find((x) => x.nr === ort.sitzung)
  if (!s) return []
  const c = ctxFuer(p, plan, ort.sitzung, v)
  const inStunde = s.schritte.map((x) => kat().eintraege.get(x.ref)).filter((x): x is KatalogEintrag => !!x)
  if (ort.schritt !== undefined) {
    const ps = s.schritte[ort.schritt]
    const cur = kat().eintraege.get(ps?.ref ?? '')
    if (!ps || !cur || cur.typ !== 'schritt') return []
    const ritual = ps.rolle === 'ankommen' || ps.rolle === 'abschluss'
    const curZiele = cur.eldib.map((z) => z.code)
    const l = kandidaten(ps.rolle, { ...c, gesperrt: new Set([...c.gesperrt, ...s.schritte.map((x) => x.ref)]) })
      .filter((e) => {
        if (e.id === cur.id) return false
        if (ritual) return !!e.ohneZiel || e.quelle.art === 'ritual'
        const zielOk = e.eldib.some((z) => curZiele.includes(z.code) || plan.ziele.includes(z.code)) || e.thema.some((t) => cur.thema.includes(t)) || (!!e.ohneZiel && (!!cur.ohneZiel || s.phase === 'leicht'))
        const dauerOk = e.dauer.typ >= 0.6 * cur.dauer.typ && e.dauer.typ <= 1.4 * cur.dauer.typ + 2
        return zielOk && dauerOk
      })
      .map((e) => { const w = wert(e, c, inStunde.filter((x) => x !== cur)); return { e, s: w.s, g: w.gruende } })
    return mmr(l, anzahl).map((x) => ({ eintrag: x.e, wert: Math.round(x.s * 100) / 100, warum: ritual ? ['ritual-neu'] : warumKeys(x.e, c, x.g, ps.rolle) }))
  }
  if (ort.blatt !== undefined && s.blatt) {
    const teil = s.blatt.bausteine[ort.blatt]
    const cur = kat().eintraege.get(teil?.ref ?? '')
    if (!cur || cur.typ !== 'baustein') return []
    const layout = p.layout
    const frei = (seitenFuellung(k, p, plan, ort.sitzung).length) * 268 - 64 - belegt(p, s.blatt.bausteine.map((b) => b.ref))
    const imBlatt = new Set(s.blatt.bausteine.map((b) => b.ref))
    const l = [...kat().eintraege.values()]
      .filter((e): e is Extract<KatalogEintrag, { typ: 'baustein' }> => e.typ === 'baustein' && e.id !== cur.id && !imBlatt.has(e.id) && passt(e, { ...c, gesperrt: new Set() }))
      .filter((e) => (e.bogen === cur.bogen || NACHBAR[cur.bogen].includes(e.bogen)) && (e.eldib.some((z) => cur.eldib.some((y) => y.code === z.code) || plan.ziele.includes(z.code)) || e.thema.some((t) => cur.thema.includes(t)) || (!cur.eldib.length && !e.eldib.length)))
      .filter((e) => (e.hoehe[layout] ?? 40) <= frei + (cur.hoehe[layout] ?? 40))
      .map((e) => ({ e, s: wert(e, c, []).s + (e.bogen === cur.bogen ? 0.1 : 0), g: wert(e, c, []).gruende }))
    return mmr(l, anzahl).map((x) => ({ eintrag: x.e, wert: Math.round(x.s * 100) / 100, warum: warumKeys(x.e, c, x.g, 'blatt') }))
  }
  return []
}

export function ersetzen(plan: Plan, ort: { sitzung: number; schritt?: number; blatt?: number }, neu: KatalogEintrag): Plan {
  const sitzungen = plan.sitzungen.map((s) => {
    if (ort.schritt !== undefined) {
      const alt = plan.sitzungen.find((x) => x.nr === ort.sitzung)!.schritte[ort.schritt]
      const ritual = alt.rolle === 'ankommen' || alt.rolle === 'abschluss'
      if (s.nr !== ort.sitzung && !(ritual && s.status !== 'gehalten')) return s
      const schritte = s.schritte.map((x, i) => {
        const treffer = s.nr === ort.sitzung ? i === ort.schritt : ritual && x.ref === alt.ref
        if (!treffer) return x
        const min = Math.max(neu.dauer.min, Math.min(neu.dauer.max, x.min))
        return { ...x, ref: neu.id, h: neu.h, min, erkundung: false, warum: ritual ? ['ritual'] : x.warum?.filter((w) => w.startsWith('ziel:') || w.startsWith('thema:')), ueber: undefined, ueberHerkunft: undefined, t: kurz(textVon(neu, 'de').titel) }
      })
      minutenAusgleichen(schritte, plan.dauer || 30)
      return { ...s, schritte }
    }
    if (ort.blatt !== undefined && s.nr === ort.sitzung && s.blatt) {
      return { ...s, blatt: { ...s.blatt, bausteine: s.blatt.bausteine.map((b, i) => (i === ort.blatt ? { ref: neu.id, h: neu.h, t: kurz(textVon(neu, 'de').titel) } : b)) } }
    }
    return s
  })
  return { ...plan, sitzungen }
}

export function suchen(k: Katalog, p: Profil, filter: { rolle?: Rolle; bogen?: string; ziel?: string; thema?: string; format?: string; art?: string; quelle?: string; text?: string; passtHoehe?: number }, anzahl = 30): Alternative[] {
  void k
  const a: Auftrag = { weg: 'gruendlich', ziele: p.ziele.map((z) => z.code).slice(0, 3), n: 1, dauer: 30, sozialform: 'einzeln', sprache: p.sprache.blatt, datum: heute() }
  const c: Ctx = { p, a, v: { kind: null, ich: { v: 1, erkundung: 0.2, z: {} }, team: null }, phase: 'ueben', nr: 1, gesperrt: new Set(), vorher: true, formate: [] }
  const q = (filter.text ?? '').toLowerCase().trim()
  const l = [...kat().eintraege.values()].filter((e) => {
    if (filter.rolle && !(e.typ === 'schritt' && e.rolle.includes(filter.rolle))) return false
    if (filter.bogen !== undefined && !(e.typ === 'baustein' && (filter.bogen === '' || e.bogen === filter.bogen))) return false
    if (!filter.rolle && filter.bogen === undefined && e.typ !== 'baustein') return false
    if (filter.ziel && !e.eldib.some((z) => z.code === filter.ziel)) return false
    if (filter.thema && !e.thema.includes(filter.thema)) return false
    if (filter.format && !e.format.includes(filter.format)) return false
    if (filter.art && !(e.typ === 'baustein' && e.art.includes(filter.art))) return false
    if (filter.quelle && !(e.typ === 'schritt' ? e.quelle.art === filter.quelle : filter.quelle === 'blatt')) return false
    if (filter.passtHoehe !== undefined && e.typ === 'baustein' && (e.hoehe[p.layout] ?? 40) > filter.passtHoehe) return false
    if (q) { const t = textVon(e, 'de'); if (!(t.titel + ' ' + t.text + ' ' + t.quelle).toLowerCase().includes(q)) return false }
    const alterOk = p.alterJahre >= e.alter.von - 1 && p.alterJahre <= e.alter.bis + 1
    return alterOk
  })
  return l.map((e) => { const w = wert(e, c, []); return { eintrag: e, wert: Math.round(w.s * 100) / 100, warum: warumKeys(e, c, w.gruende, 'blatt') } })
    .sort((x, y) => y.wert - x.wert).slice(0, anzahl)
}

// ---------------------------------------------------------------------------------------------------------------
// Texte, Kinderblatt, Seiten
// ---------------------------------------------------------------------------------------------------------------

const QUELLE_NAME: Record<SchrittQuelle, string> = {
  kurs: 'Skills', foerderfach: 'Förderfach', material: 'Material', spielschule: 'Spielschule', crew: 'CREW', freude: 'Freude & Beziehung', ritual: 'Rituale', praxis: 'Aus der Praxis',
}
const ART_NAME: Record<string, string> = {
  skala: 'Skala', gefuehle: 'Gefühle', comic: 'Comic', ampel: 'Ampel', ankreuzen: 'Ankreuzen', wennDann: 'Wenn-dann', satzanfaenge: 'Satzanfänge',
  vulkan: 'Vulkan', tabelle: 'Tabelle', karten: 'Karten', wortspeicher: 'Wortspeicher', frage: 'Frage', feld: 'Malfeld', bilder: 'Bilder', rueckblick: 'Rückblick',
  koerper: 'Körper', thermometer: 'Thermometer', bild: 'Ausmalen', einschaetzung: 'Einschätzung', info: 'Info', wahlkarte: 'Wahlkarte', stundenleiste: 'Stundenleiste',
}

export function textVon(e: KatalogEintrag, sprache: Sprache): { titel: string; text: string; sagen?: string[]; wennEsKippt?: string; quelle: string } {
  if (e.typ === 'schritt') {
    const fr = sprache === 'fr' ? e.fr : undefined
    const q = e.quelle.art === 'material' && e.quelle.titel.startsWith('Toolbox') ? e.quelle.titel : `${QUELLE_NAME[e.quelle.art]} · ${e.quelle.titel}`
    return { titel: fr?.titel ?? e.titel, text: fr?.einzelvariante?.text ?? fr?.text ?? e.einzelvariante?.text ?? e.text, sagen: fr?.sagen ?? e.sagen, wennEsKippt: fr?.wennEsKippt ?? e.wennEsKippt, quelle: q }
  }
  const inhalt = INHALT.get(e.id) ?? []
  const a = inhalt.find((b) => b.art === 'aufgabe') as { text: string } | undefined
  const f = inhalt.find((b) => b.art === 'frage') as { text: string } | undefined
  const art = e.art[e.art.length - 1]
  const name = ART_NAME[art] ?? art
  return { titel: a?.text ?? f?.text ?? (inhalt[0] as { titel?: string })?.titel ?? name, text: name, quelle: `${e.quelle.nr} ${BLATT_TITEL.get(e.quelle.blatt) ?? e.quelle.blatt}` }
}

function setzePfad(o: unknown, pfad: string[], wert: string): void {
  let x = o as Record<string, unknown>
  for (let i = 0; i < pfad.length - 1; i++) { x = x?.[pfad[i]] as Record<string, unknown>; if (!x) return }
  if (x) x[pfad[pfad.length - 1]] = wert
}
function platzhalterFuellen(o: unknown, p: Profil): unknown {
  const name = p.anrede ?? ''
  const interesse = p.interessen[0] ? interesseText(p.interessen[0]) : 'dein Lieblingsspiel'
  const wz = p.wochenziel ?? ''
  const f = (s: string) => s.replace(/\{NAME\}/g, name || '…').replace(/\{INTERESSE\}/g, interesse).replace(/\{WOCHENZIEL\}/g, wz || '…')
  const geh = (x: unknown): unknown => (typeof x === 'string' ? f(x) : Array.isArray(x) ? x.map(geh) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, geh(v)])) : x)
  return geh(o)
}
function interesseText(k: string): string {
  return ({ fussball: 'Fußball', basketball: 'Basketball', tiere: 'Tiere', zeichnen: 'Zeichnen', musik: 'Musik', gaming: 'Gaming', autos: 'Autos', bauen: 'Bauen' } as Record<string, string>)[k] ?? k
}
const BEREICH_ZIEL: Record<string, Bereich> = { V: 'verhalten', K: 'gefuehle', SOZ: 'miteinander', KOG: 'lernen' }

export function kinderblatt(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): Blatt {
  void k
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const leicht = s?.phase === 'leicht'
  const bausteine: Baustein[] = []
  const hauptziel = p.ziele.find((z) => z.code === plan.ziele[0])
  const quellen: string[] = []
  const aktiv = (s?.schritte ?? []).filter((y) => ['spiel', 'bewegung'].includes(y.rolle)).map((y) => kat().eintraege.get(y.ref)).filter((e): e is KatalogEintrag => !!e)
  for (const t of s?.blatt?.bausteine ?? []) {
    const inhalt = structuredClone(INHALT.get(t.ref) ?? []) as Baustein[]
    const e = kat().eintraege.get(t.ref)
    if (e?.typ === 'baustein' && !/^[PWF]-/.test(e.quelle.nr) && !quellen.includes(e.quelle.nr)) quellen.push(e.quelle.nr)
    for (const [pfad, wert] of Object.entries(t.ueber ?? {})) setzePfad(inhalt, pfad.split('.'), wert)
    if (t.ref === 'b:pg-wahlkarte:1') {
      const b = inhalt[1] as Extract<Baustein, { art: 'bilder' }>
      b.bilder = [...aktiv.map((x) => ({ bild: x.format.includes('bewegung') ? 'icon:run' : x.format.includes('malen') ? 'icon:palette' : 'icon:puzzle', text: textVon(x, sprache).titel })), { bild: 'icon:armchair', text: 'einfach zusammen da sein' }].slice(0, 3)
    }
    if (t.ref === 'b:pg-stundenleiste:1') {
      const b = inhalt[0] as Extract<Baustein, { art: 'bilder' }>
      const BILD: Record<string, [string, string]> = { ankommen: ['icon:sun', 'Ankommen'], einstieg: ['icon:hand-click', 'Wählen'], bewegung: ['icon:run', 'Bewegen'], spiel: ['icon:puzzle', 'Spielen'], abschluss: ['icon:star', 'Tschüss'], kern: ['icon:target', 'Üben'], uebung: ['icon:pencil', 'Blatt'] }
      b.bilder = (s?.schritte ?? []).map((y) => ({ bild: BILD[y.rolle]?.[0] ?? 'icon:circle', text: BILD[y.rolle]?.[1] ?? '' }))
      b.spalten = Math.min(4, Math.max(2, b.bilder.length)) as 2 | 3 | 4
    }
    for (const b of inhalt) bausteine.push(platzhalterFuellen(b, p) as Baustein)
  }
  const t = TITEL[plan.ziele[0]]
  const bereich: Bereich = leicht ? 'alltag' : (MIKRO_ROH.get(s?.blatt?.bausteine[0]?.ref ?? '')?.bereich ?? BEREICH_ZIEL[(plan.ziele[0] ?? 'V').split('-')[0]] ?? 'verhalten')
  const min = s?.schritte.reduce((x, y) => x + y.min, 0) ?? plan.dauer
  const blatt: Blatt & { passgenau?: { ziel?: Partial<Record<Sprache, string>>; herkunft?: string } } = {
    id: 'pg-' + hashHex(plan.id + nr + JSON.stringify(s?.blatt)), bereich, thema: 'passgenau', stufen: p.stufen, layout: p.layout, sozialform: ['einzeln'],
    dauer: `${min} Min.`, eldib: plan.ziele, schlagworte: ['passgenau', ...quellen],
    passgenau: { ...(!leicht && hauptziel ? { ziel: { de: hauptziel.ich } } : {}), herkunft: quellen.join(', ') },
    de: {
      titel: s?.blatt?.titel ?? 'Mein Blatt', untertitel: leicht ? 'Wir spielen, malen und haben Zeit füreinander.' : t?.[1],
      bausteine,
      lehrer: {
        ziel: `Passgenau · ${plan.n > 1 ? `Sitzung ${nr} von ${plan.n}` : 'Einzelstunde'} · ${min} Min.`,
        ablauf: (s?.schritte ?? []).map((x) => { const e = kat().eintraege.get(x.ref); return `${x.min} Min. – ${e ? textVon(e, sprache).titel : 'Blatt'}` }),
        hintergrund: `Zusammengesetzt aus Bausteinen der Toolbox (${quellen.join(', ') || 'Passgenau'}). Gewichte V1.`,
      },
    },
  }
  return blatt
}

function belegt(p: Profil, refs: string[]): number {
  return refs.reduce((s, r) => { const e = kat().eintraege.get(r); return s + (e?.typ === 'baustein' ? (e.hoehe[p.layout] ?? 40) + 5 : 0) }, 0)
}
export function seitenFuellung(k: Katalog, p: Profil, plan: Plan, nr: number): number[] {
  void k
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const kopf = 64 + (s?.phase === 'leicht' ? 0 : 20)
  const cap1 = 268 - kopf, capN = 268 - 18
  const seiten = [0]
  for (const t of s?.blatt?.bausteine ?? []) {
    const e = kat().eintraege.get(t.ref)
    let h = e?.typ === 'baustein' ? e.hoehe[p.layout] ?? 40 : 40
    const extra = Object.values(t.ueber ?? {}).reduce((x, v) => x + Math.max(0, v.length - 40) / 60 * 5, 0)
    h += extra
    const i = seiten.length - 1, cap = i === 0 ? cap1 : capN
    if (seiten[i] + h + 5 > cap && seiten[i] > 0) seiten.push(h)
    else seiten[i] += h + (seiten[i] ? 5 : 0)
  }
  return seiten.map((x, i) => Math.round((x / (i === 0 ? cap1 : capN)) * 100) / 100)
}

// ---------------------------------------------------------------------------------------------------------------
// Ereignisse, Rückmeldung, Gelernt
// ---------------------------------------------------------------------------------------------------------------

const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
function ulid(): string {
  let t = Date.now(), s = ''
  for (let i = 0; i < 10; i++) { s = B32[t % 32] + s; t = Math.floor(t / 32) }
  for (let i = 0; i < 6; i++) s += B32[Math.floor(Math.random() * 32)]
  return s
}
export function ereignis(art: Ereignis['art'], daten: Partial<Ereignis>): Ereignis {
  return {
    id: 'ev-' + ulid(), v: 1, t: new Date().toISOString().slice(0, 19), art, kind: null, fachkraft: null, kinder: 1, plan: null, sitzung: null, weg: null,
    baustein: null, h: null, vorlage: null, tags: {}, ziel: null, richtung: null, wert: 0, grund: null, ersatz: null, tagesform: null, altersband: null, ...daten,
  }
}

function aufaddieren(z: Record<string, Zaehler>, key: string, w: number, H: number): Record<string, Zaehler> {
  const alt = verblasst(z[key], H)
  const neu = { a: alt.a + (w > 0 ? w : 0), b: alt.b + (w < 0 ? -w : 0), t: heute() }
  return { ...z, [key]: { a: Math.round(neu.a * 100) / 100, b: Math.round(neu.b * 100) / 100, t: neu.t } }
}
export function rueckmelden(v: Vorlieben, e: Ereignis, eintragRef?: KatalogEintrag): Vorlieben {
  const ek = eintragRef ?? (e.baustein ? kat().eintraege.get(e.baustein) : undefined)
  let w = e.wert
  if (e.vorlage === 'erkundung') w *= 2
  let kindZ = v.kind?.z ?? {}
  let ichZ = v.ich.z
  const auf = (ebene: 'kind' | 'ich', l: [string, number][], faktor = 1) => {
    for (const [key, g] of l) {
      if (ebene === 'kind') kindZ = aufaddieren(kindZ, key, w * g * faktor, HALBWERT.kind)
      else ichZ = aufaddieren(ichZ, key, w * g * faktor, HALBWERT.ich)
    }
  }
  const alle = ek ? schluessel(ek) : e.baustein ? [['baustein:' + e.baustein, 1] as [string, number]] : []
  const bau: [string, number] = ['baustein:' + (ek?.id ?? e.baustein), 1]
  const g = e.grund as DaumenGrund | null
  if (e.krisentag && w < 0) w = 0
  switch (e.art) {
    case 'geklappt': case 'nicht': if (w) { auf('kind', alle); auf('ich', alle, 1 / 3) } break
    case 'beruhigt': case 'dabei': w = 1; auf('kind', alle); break
    case 'nur-da': case 'abgebrochen': break
    case 'kind_wahl': w = 1.5; auf('kind', alle); w = 0.5; auf('ich', alle); break
    case 'kind_daumen': w = Math.sign(e.wert || 1) * 1.5; auf('kind', alle); break
    case 'teils': w = 1; auf('kind', alle); w = -1; auf('kind', alle); break
    case 'ziel_richtung': auf('kind', [bau]); break
    case 'daumen_hoch': auf('ich', alle); if (g === 'passt-gut') auf('kind', alle); break
    case 'daumen_runter':
      if (g === 'zu-lang') auf('kind', [['laenge:' + (ek ? laenge(ek) : 'lang'), 1], [bau[0], 0.3]])
      else if (g === 'zu-kindlich') auf('kind', [['stil:juenger', 1], [bau[0], 0.3]])
      else if (g === 'zu-schwer') auf('kind', [['schreiben:' + (ek?.typ === 'baustein' ? ek.schreibmenge : 2), 1], [bau[0], 0.3]])
      else if (g === 'zu-leicht') { w = Math.abs(w); auf('kind', [['schreiben:' + Math.min(3, (ek?.typ === 'baustein' ? ek.schreibmenge : 1) + 1), 1], ['stil:aelter', 0.5]]) }
      else if (g === 'passt-nicht') auf('kind', [bau, ...(ek?.thema ?? []).map((t) => ['thema:' + t, 0.3] as [string, number])])
      else if (g === 'mag-nicht') auf('ich', [bau, ['format:' + (ek?.format[0] ?? ''), 0.5]])
      else auf('ich', alle)
      break
    case 'ersetzt': case 'geloescht': case 'gedruckt': auf('ich', alle); break
  }
  return {
    ...v,
    kind: v.kind || Object.keys(kindZ).length ? { v: 1, prior: v.kind?.prior, z: kindZ, zurueckgesetzt: v.kind?.zurueckgesetzt ?? null } : null,
    ich: { ...v.ich, z: ichZ },
  }
}

function schluesselName(key: string): string {
  const [a, ...rest] = key.split(':'); const b = rest.join(':')
  if (a === 'format') return ({ bewegung: 'Bewegung', comic: 'Comics', schreiben: 'Schreibaufgaben', rollenspiel: 'Rollenspiel', atmen: 'Atmen & Ruhe', gespraech: 'Gespräch', malen: 'Malen', basteln: 'Basteln', spiel: 'Spiele', denkmodell: 'Denkmodelle', karten: 'Bildkarten', musik: 'Musik', ankreuzen: 'Ankreuzen', plan: 'Pläne', geschichte: 'Geschichten', sinne: 'Sinne' } as Record<string, string>)[b] ?? b
  if (a === 'laenge') return b === 'lang' ? 'lange Schritte (ab 10 Min.)' : b === 'mittel' ? 'mittellange Schritte' : 'kurze Schritte'
  if (a === 'quelle') return ({ kurs: 'Skills-Bausteine', material: 'Toolbox-Material', freude: 'Freude & Beziehung', ritual: 'Rituale', spielschule: 'Spielschule', foerderfach: 'Förderfach', crew: 'CREW' } as Record<string, string>)[b] ?? b
  if (a === 'baustein') { const e = kat().eintraege.get(b); return e ? '„' + textVon(e, 'de').titel + '“' : b }
  if (a === 'stil') return b === 'aelter' ? 'älter gestaltete Blätter' : 'jünger gestaltete Blätter'
  if (a === 'art') return 'Bausteinart ' + (ART_NAME[b] ?? b)
  if (a === 'thema') return 'Thema ' + b
  if (a === 'schreiben') return ['ohne Schreiben', 'Wörter schreiben', 'kurze Sätze schreiben', 'Sätze schreiben'][+b] ?? key
  return key
}
export function gelernt(v: Vorlieben, ebene: 'kind' | 'ich' | 'team', k: Katalog): { text: string; wert: number; n: number }[] {
  void k
  if (ebene === 'team') {
    if (!v.team || v.team.personen < 3) return []
    return Object.entries(v.team.z).sort((a, b) => b[1].n - a[1].n).slice(0, 8).map(([key, t]) => {
      const q = Math.round((100 * t.geklappt) / Math.max(1, t.geklappt + t.teils + t.nicht))
      return { text: `${schluesselName(key)}: ${t.n}× genutzt, ${q} % hat geklappt`, wert: vorliebe(v, 'team', key), n: t.n, schluessel: key } as { text: string; wert: number; n: number }
    })
  }
  const z = ebene === 'kind' ? v.kind?.z ?? {} : v.ich.z
  const H = ebene === 'kind' ? HALBWERT.kind : HALBWERT.ich
  const l = Object.keys(z).map((key) => { const zz = verblasst(z[key], H); const p = pWert(zz, ebene === 'kind' ? v.kind?.prior?.[key] : undefined); return { key, p, a: zz.a, n: zz.a + zz.b } })
    .filter((x) => x.n >= 0.5)
  const pos = l.filter((x) => x.p > 0).sort((a, b) => b.p - a.p).slice(0, 5)
  const neg = l.filter((x) => x.p <= 0).sort((a, b) => a.p - b.p).slice(0, 5)
  return [...pos, ...neg.reverse()].map((x) => ({
    text: `${schluesselName(x.key)}: ${x.n < 5 ? 'noch unklar' : x.p > 0.1 ? 'klappt meistens' : x.p < -0.1 ? (ebene === 'kind' ? 'braucht Unterstützung' : 'eher nicht') : 'noch unklar'} – ${Math.round(x.a)} von ${Math.max(1, Math.round(x.n))}`,
    wert: Math.round(x.p * 100) / 100, n: Math.round(x.n), schluessel: x.key,
  }))
}

export function zuruecksetzen(v: Vorlieben, ebene: 'kind' | 'ich', schluessel?: string): Vorlieben {
  if (ebene === 'kind') {
    if (!v.kind) return v
    if (schluessel) { const z = { ...v.kind.z }; delete z[schluessel]; return { ...v, kind: { ...v.kind, z } } }
    return { ...v, kind: { v: 1, prior: v.kind.prior, z: {}, zurueckgesetzt: heute() } }
  }
  if (schluessel) { const z = { ...v.ich.z }; delete z[schluessel]; return { ...v, ich: { ...v.ich, z } } }
  return { ...v, ich: { ...v.ich, z: {}, zurueckgesetzt: heute() } }
}

const RICHTUNG: Record<string, string> = { gelingt: 'gelingt', 'mit-hilfe': 'gelingt mit Unterstützung', 'noch-nicht': 'gelingt noch nicht' }
export function notizText(p: Profil, plan: Plan, nr: number, r: Plan['sitzungen'][number]['rueckmeldung']): string {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  if (!s) return ''
  const leicht = s.phase === 'leicht'
  const min = s.schritte.reduce((a, b) => a + b.min, 0)
  const titel = s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss' && !x.ref.startsWith('blatt')).map((x) => { const e = kat().eintraege.get(x.ref); return e ? textVon(e, 'de').titel : '' }).filter(Boolean).slice(0, 3) as string[]
  const kopf = leicht ? `Beziehungszeit (Passgenau, ${min} Min.): ` : `Passgenau ${plan.n > 1 ? `${nr}/${plan.n} ` : ''}(${min} Min.): `
  const teile = [kopf + titel.join(', ') + (s.blatt ? `, Blatt „${s.blatt.titel}“` : '') + '.']
  if (r) teile.push(({ geklappt: 'Hat geklappt.', teils: 'Hat teilweise geklappt.', nicht: 'Hat nicht geklappt.', beruhigt: 'Hat sich beruhigt.', dabei: 'War dabei.', 'nur-da': 'Wollte nur da sein.', abgebrochen: 'Abgebrochen.' } as Record<string, string>)[r.ergebnis])
  if (r?.kind?.wahl) teile.push(`Hat gewählt: ${r.kind.wahl}.`)
  if (r?.kind?.daumen) teile.push(`Daumen am Schluss: ${r.kind.daumen === 'hoch' ? 'hoch' : 'runter'}.`)
  if (r && !leicht) for (const z of r.ziele ?? []) { const pz = p.ziele.find((x) => x.code === z.code); teile.push(`${z.code}${pz ? ' ' + kurzZiel(z.code) : ''}: ${RICHTUNG[z.richtung]}.`) }
  if (r?.chips?.length) teile.push(r.chips.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join('. ') + '.')
  return teile.join(' ')
}
function kurzZiel(code: string): string {
  return ({ 'V-21': 'Kontrolle in der Gruppe', 'K-26': 'Gefühle ausdrücken', 'SOZ-14': 'Warten', 'V-10': 'Warten', 'V-22': 'Fortschritt erkennen', 'SOZ-32': 'Respekt' } as Record<string, string>)[code] ?? ''
}

// ---------------------------------------------------------------------------------------------------------------
// Aus der Praxis
// ---------------------------------------------------------------------------------------------------------------

const BAENDER: [number, number, string][] = [[3, 5, '3-5'], [6, 8, '6-8'], [9, 11, '9-11'], [12, 14, '12-14'], [15, 99, '15+']]
export function fuerTeam(plan: Plan, p: Profil): { vorlage: Omit<PraxisVorlage, 'id' | 'version' | 'status' | 'erstellt'>; eigeneTexte: { pfad: string; text: string }[] } {
  void p
  const eigeneTexte: { pfad: string; text: string }[] = []
  const inhalt: VorlagenInhalt = {
    weg: plan.weg, n: plan.n, dauer: plan.dauer,
    sitzungen: plan.sitzungen.map((s) => ({
      phase: s.phase,
      schritte: s.schritte.map((x, i) => {
        if (x.ueber) for (const [k, v] of Object.entries(x.ueber)) eigeneTexte.push({ pfad: `s${s.nr}.schritt${i}.${k}`, text: v })
        return { ref: x.ref, h: x.h, rolle: x.rolle, min: x.min, ...(x.ueber ? { ueber: x.ueber, ueberHerkunft: x.ueberHerkunft } : {}) }
      }),
      ...(s.blatt ? { blatt: { titel: s.blatt.titel, bausteine: s.blatt.bausteine.map((b, i) => {
        if (b.ueber) for (const [k, v] of Object.entries(b.ueber)) eigeneTexte.push({ pfad: `s${s.nr}.b${i}.${k}`, text: v })
        return { ref: b.ref, h: b.h, ...(b.ueber ? { ueber: b.ueber, ueberHerkunft: b.ueberHerkunft } : {}), ...(b.ausgeblendet ? { ausgeblendet: b.ausgeblendet } : {}) }
      }) } } : {}),
    })),
  }
  // Abgeleitetes nur aus den Katalog-Metadaten der enthaltenen Bausteine (E-M5)
  const eintraege = inhalt.sitzungen.flatMap((s) => [...s.schritte.map((x) => x.ref), ...(s.blatt?.bausteine.map((b) => b.ref) ?? [])]).map((r) => kat().eintraege.get(r)).filter((x): x is KatalogEintrag => !!x)
  const von = Math.max(3, ...eintraege.map((e) => e.alter.von)), bis = Math.min(99, ...eintraege.map((e) => e.alter.bis))
  const mitte = (von + Math.min(bis, von + 4)) / 2
  const band = BAENDER.find(([a, b]) => mitte >= a && mitte <= b)?.[2] ?? '9-11'
  const ziele = [...new Set(eintraege.flatMap((e) => e.eldib.filter((z) => z.gewicht === 1).map((z) => z.code)))].slice(0, 3)
  return {
    vorlage: {
      titel: '', von: null, altersband: band, ziele, themen: [...new Set(eintraege.flatMap((e) => e.thema))].slice(0, 3),
      formate: [...new Set(eintraege.flatMap((e) => e.format))].slice(0, 5), dauer: plan.dauer, n: plan.n,
      sprachen: eintraege.every((e) => e.sprache.fr) ? ['de', 'fr'] : ['de'], inhalt,
    },
    eigeneTexte,
  }
}

export function uebernehmen(k: Katalog, p: Profil, vorlage: PraxisVorlage, v: Vorlieben): { plan: Plan; angepasst: string[] } {
  const angepasst: string[] = []
  const layoutName = { bild: 'Bildblatt', gross: 'groß', mittel: 'mittel', jugend: 'jugendgerecht' }[p.layout]
  angepasst.push(`Gestaltung für ${p.alterJahre} Jahre: ${p.stufen.join(', ')} („${layoutName}“)`)
  angepasst.push(`Sprache: ${p.sprache.blatt === 'fr' ? 'Französisch' : 'Deutsch'}${p.sprache.woerter.length ? ', Wörterstreifen ' + p.sprache.woerter.map((w) => w.toUpperCase()).join(', ') : ''}`)
  const vi = vorlage.inhalt
  const ziele = vorlage.ziele.filter((z) => p.ziele.some((x) => x.code === z)).concat(p.ziele.map((z) => z.code).filter((z) => !vorlage.ziele.includes(z))).slice(0, 3)
  let plan: Plan
  if (!vi?.sitzungen?.length) {
    plan = { ...planen(k, p, { weg: vorlage.n > 1 ? 'gruendlich' : 'schnell', ziele, n: vorlage.n, dauer: ([10, 15, 20, 30, 45, 60].includes(vorlage.dauer) ? vorlage.dauer : 30) as Auftrag['dauer'], sozialform: 'einzeln', sprache: p.sprache.blatt, datum: heute() }, v, { plaene: [], ereignisse: [] }), titel: vorlage.titel, vorlage: `${vorlage.id}@${vorlage.version}` }
    angepasst.push('Sitzungen aus den Bausteinen der Vorlage neu zusammengestellt')
  } else {
    plan = {
      id: 'pl-' + hashHex(vorlage.id + (p.seed ?? p.ref) + heute()).slice(0, 6), erstellt: new Date().toISOString().slice(0, 16), weg: vi.weg, gewichte: 'V1', titel: vorlage.titel,
      ziele, n: vi.n, dauer: vi.dauer, vorlage: `${vorlage.id}@${vorlage.version}`, kinder: ['self'], variante: 0, katalogStand: kat().stand,
      sitzungen: vi.sitzungen.map((s, i) => ({
        nr: i + 1, phase: s.phase, status: 'geplant', datum: null, rueckmeldung: null,
        schritte: s.schritte.map((x) => { const e = kat().eintraege.get(x.ref); return { ...x, t: e ? kurz(textVon(e, 'de').titel) : undefined } }),
        blatt: s.blatt ? { titel: s.blatt.titel, bausteine: s.blatt.bausteine.map((b) => { const e = kat().eintraege.get(b.ref); return { ...b, t: e ? kurz(textVon(e, 'de').titel) : undefined } }) } : null,
      })),
    }
  }
  let getauscht = 0
  for (const s of plan.sitzungen) {
    if (!s.blatt) continue
    for (let i = 0; i < s.blatt.bausteine.length; i++) {
      const e = kat().eintraege.get(s.blatt.bausteine[i].ref)
      if (e?.typ === 'baustein' && (e.lesemenge > p.zugang.lesen + 1 || e.schreibmenge > p.zugang.schreiben + 1 || p.gemacht.some((g) => g.id === 'blatt:' + e.quelle.blatt))) {
        const alt = alternativen(k, p, plan, { sitzung: s.nr, blatt: i }, v, 1)[0]
        if (alt) { plan = ersetzen(plan, { sitzung: s.nr, blatt: i }, alt.eintrag); getauscht++ }
      }
    }
  }
  angepasst.push(getauscht ? `${getauscht} Baustein${getauscht > 1 ? 'e' : ''} getauscht: passend zu Lesen und Schreiben bzw. schon gemacht` : 'Bausteine passen zum Zugang – nichts getauscht')
  if (p.interessen[0]) angepasst.push(`{INTERESSE} → ${interesseText(p.interessen[0])}`)
  const rit = p.rituale
  if (rit?.ankommen || rit?.abschluss) {
    plan = { ...plan, sitzungen: plan.sitzungen.map((s) => ({ ...s, schritte: s.schritte.map((x) => {
      const neu = x.rolle === 'ankommen' ? rit.ankommen : x.rolle === 'abschluss' ? rit.abschluss : undefined
      const e = neu ? kat().eintraege.get(neu) : undefined
      return e ? { ...x, ref: e.id, h: e.h, t: kurz(textVon(e, 'de').titel) } : x
    }) })) }
    const a = rit.ankommen ? kat().eintraege.get(rit.ankommen) : undefined
    const b = rit.abschluss ? kat().eintraege.get(rit.abschluss) : undefined
    angepasst.push(`Rituale wie immer: ${[a ? textVon(a, 'de').titel : '', b ? textVon(b, 'de').titel : ''].filter(Boolean).join(' / ')}`)
  }
  return { plan, angepasst }
}

// ---------------------------------------------------------------------------------------------------------------
// PDF (Attrappe: Blatt mit Lehrerseite über den vorhandenen Renderer)
// ---------------------------------------------------------------------------------------------------------------

/** opt darf zusätzlich `ziel` („Mein Ziel“ aufs Blatt, Vorgabe aus) und `vorname` tragen. */
export async function pdfSitzung(k: Katalog, p: Profil, plan: Plan, nr: number, opt: { sprache: Sprache; warum: boolean; karten: boolean }): Promise<Blob> {
  const m = await loadPdfModule()
  const b = kinderblatt(k, p, plan, nr, opt.sprache) as Blatt & { passgenau?: { ziel?: unknown } }
  if (!(opt as { ziel?: boolean }).ziel && b.passgenau) delete b.passgenau.ziel
  return m.blattBlob(b, { sprache: 'de', lehrer: true })
}
export async function pdfFolge(k: Katalog, p: Profil, plan: Plan, opt: { sprache: Sprache; warum: boolean }): Promise<Blob> {
  const m = await loadPdfModule()
  const blaetter = plan.sitzungen.map((s) => kinderblatt(k, p, plan, s.nr, opt.sprache))
  const erste = blaetter[0]
  const zusammen: Blatt = { ...erste, de: { ...erste.de, titel: plan.titel, bausteine: blaetter.flatMap((b, i) => (i ? [{ art: 'seitenumbruch' } as Baustein, ...b.de.bausteine] : b.de.bausteine)) } }
  return m.blattBlob(zusammen, { sprache: 'de', lehrer: false })
}
