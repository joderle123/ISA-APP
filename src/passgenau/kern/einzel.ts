// Passgenau – Textmerkmale je Katalogeintrag (Blind-Bewertung 9.10.): Was im gedruckten Text steht, entscheidet, ob ein Teil
// in eine Einzelstunde für dieses Kind passt. Die Beschriftung hatte viele Gruppen-Schritte als „einzeltauglich“ markiert; die
// Kritiker fanden in fast jeder Stunde Gruppen- oder Klassenanweisungen, Film, Ausflug, Küche, Verweise auf Arbeitsblätter
// der Quelle, Jugendtexte für Kinder und Inhalte, die Vorsicht-Flags verletzen. Geprüft wird der Text, der gedruckt wird
// (DE und, wo vorhanden, FR – bei einem Schritt mit Einzelvariante deren Text).

/** Name des Merkmals → Muster (DE und FR in einem). */
export const TEXT_MERKMALE: Record<string, RegExp> = {
  // Gruppe oder Klasse: in einer Einzelstunde nicht machbar
  gruppe: new RegExp(
    [
      String.raw`\b(Dreier|Zweier|Vierer|Klein|Tisch|Arbeits)gruppen?\b|\bPlenum\b|\bLossystem\b|\b(Sitz|Stuhl|Steh)kreis\b|\bim Kreis\b`,
      String.raw`\b(die|der|eine|jede|in der|in die|ganze[nr]?) Gruppe\b|\bGruppen\b|\b[Tt]eams?\b|\bMannschaft(en)?\b`,
      String.raw`\b(die|der|in der|mit der|vor der|ganze[nr]?) Klasse\b|\balle Kinder\b|\balle Schüler\w*|\bjede:r\b|\bjede\*r\b|\bJede/r\b|\bjedes Kind\b|\bjede Person\b`,
      String.raw`\breihum\b|\bder Reihe nach\b|\bMitschüler\w*|\bKlassenkamerad\w*|\bdie anderen Kinder\b|\bein anderes Kind\b|\bPartnerkind\b|\bin Paaren\b|\bpaarweise\b`,
      String.raw`\ben (petits )?groupes?\b|\bla classe\b|\bles élèves\b|\bchaque élève\b|\bchacun(e)?\b|\bà tour de rôle\b|\ben binômes?\b|\béquipes?\b`,
      // „Alle stehen hinter ihrem Stuhl“, „eine freiwillige Person“, „Die Kinder …“, „tous les enfants“
      String.raw`\balle (stehen|sitzen|gehen|laufen|machen|bewegen|setzen|legen|zeigen|rufen|schreiben|malen|bekommen|ziehen)\b|\bfreiwillige Person\b|\bdie Kinder (sitzen|stehen|gehen|bilden|bekommen|ziehen|tauschen|stellen)\b|\btous les enfants\b|\btout le monde\b`,
    ].join('|'),
    'i',
  ),
  // Anrede einer Gruppe
  ihr: /\b(euch|eure[nmrs]?)\b|\b[Ii]hr (seid|habt|könnt|dürft|macht|sucht|geht|bekommt|werdet|sollt|wollt|dürft)\b|\b(Setzt|Stellt|Schaut|Nehmt|Macht|Sucht|Geht|Schreibt|Malt|Überlegt|Erzählt) (euch|ihr)\b|\bvous (allez|êtes|avez|pouvez)\b/,
  // für Jugendliche geschrieben
  jugend: /\b(der oder die Jugendliche|die Jugendlichen|Jugendliche[nr]?)\b|\b(le ou la jeune|les jeunes|l['’]adolescent(e)?)\b/,
  film: /\b(Film|Filme[ns]?|Filmausschnitt|Kurzfilm|Clip|Video|YouTube|Doku|Dokumentation|Trailer)\b|\b(film|extrait vidéo|vidéo|clip)\b/,
  draussen: /\b(Ausflug|Exkursion|Elterneinverständnis|Wiese|Wald|Park|Spaziergang|draußen|im Freien|Schulhof|Pausenhof|Naturtag|Spielplatz)\b|\b(sortie|en plein air|dehors|forêt|cour de récréation)\b/,
  kueche: /\b(Küche|kochen|kocht|backen|backt|Backofen|Teig|Rezept)\b|\b(cuisine|cuisiner|four|recette|pâte)\b/,
  gaeste: /\b(Gäste|Gast|Betriebsbesuch|Besuch(er)?|Bühne|Publikum|Aufführung|filmen|aufnehmen mit dem Handy)\b|\b(invités?|spectateurs|public|scène)\b/,
  // Verweis auf ein Arbeitsblatt der Quelle, das in Passgenau nicht gedruckt wird
  blattverweis: /\b(Aufgabe|Seite|Teil) \d\b|\b(Arbeitsblatt|Arbeitsblattes|Schülerblatt|Kopiervorlage|Vorlage|Koffer-Arbeitsblatt|Rückenwind-Blatt|Detektivblatt|Etappen-Karte|Ziel-Kompass|Motivations-Motor|Belohnungs-Baum|Tank-Tabelle)\b|\b(exercice|page|partie) \d\b|\bfiche (de travail|élève)\b/,
  // läuft über Tage oder findet zu Hause statt
  mehrtag: /\b(eine Woche lang|die ganze Woche|während der Woche|die Woche über|jeden Abend|jeden Tag|täglich|Wochen-?[Tt]racker|Wochenprotokoll|Punkteplan|Punkte-?[Mm]enü|heute Abend|zu Hause ausprobieren|bis zur nächsten Stunde)\b|\b(toute la semaine|chaque soir|chaque jour|ce soir|à la maison)\b/,
  // Wochentabelle (Mo–Fr) auf dem Blatt: ein Tracker über Tage
  wochentage: /Montag[\s\S]{0,300}Freitag|\bMo\b[\s\S]{0,40}\bDi\b[\s\S]{0,40}\bMi\b|\blundi\b[\s\S]{0,300}\bvendredi\b|\blun\b[\s\S]{0,40}\bmar\b[\s\S]{0,40}\bmer\b/,
  // Vorsicht trauer
  trauer: /\b(Tod|tot|gestorben|sterben|stirbt|Verlust|verloren|vermiss\w*|Abschied\w*|Trauer|trauer\w*|Friedhof|Beerdigung|Oma|Opa|Großmutter|Großvater|Trennung|Scheidung|traurig, weil)\b|\b(décès|mort|morte|deuil|perdu|manque|grand-mère|grand-père|séparation|divorce)\b/,
  // Vorsicht familie (und Kinderschutz): Fragen zu Familie oder Zuhause
  familie: /\b(Familie\w*|Zuhause|zu Hause|daheim|Eltern\w*|Mutter|Vater|Mama|Papa|Geschwister|Bruder|Schwester|Herkunft|Heimat\w*)\b|\b(famille|maison|parents|mère|père|maman|papa|frère|sœur|origine)\b/,
  // Vorsicht koerper
  koerper: /\b(Aussehen|Körperbild|Strand\w*|Bikini|Badeanzug|Gewicht|Figur|dick|dünn|Spiegel\w*|Diät|Kalorien|Körper-Chip|mein Körper verändert)\b|\b(apparence|poids|maillot|plage|régime|miroir)\b/,
  // belastende Sätze (nur mit Hilfe-Zeile; bei offener Krise nie)
  belastend: /\b(hilft (mir )?(sowieso )?keiner|alles egal|hoffnungslos|wertlos|niemand mag mich|ich hasse mich|nicht mehr leben|sinnlos|am liebsten weg)\b|\b(personne ne m['’]aide|je m['’]en fiche de tout|sans espoir|je ne vaux rien)\b/i,
  // heikel ohne Freischaltung (T-M1 – auch ohne Beschriftung „sensibel“)
  heikel: /\b(Körpergrenze\w*|Körper-Grenze\w*|zu nah|Nähe und Distanz|Grenzen spüren|Körperabstand|Grenzverletzung\w*|Übergriff\w*|Garten-Übung|Selbstverletzung|selbstverletz\w*|Suizid\w*|ritzen|sexuell\w*|Missbrauch|Gewalt zu Hause)\b|\b(automutilation|suicide|abus|agression sexuelle)\b/i,
  // Belastendes direkt bearbeiten (bei Vorsicht Trauma nicht)
  mobbing: /\b(Mobbing|gemobbt|Diskriminierung|diskriminier\w*|Rassismus|rassistisch\w*|Forumtheater|Ausgrenzung erleben)\b|\b(harcèlement|discrimination|racisme)\b/i,
  // Notiz für Erwachsene im Text des Kindes (A3)
  fuerleitung: /\b(Für die Leitung|Für die Lehrkraft|Für Lehrpersonen|Hinweis für (die )?(Leitung|Lehrkraft|Fachkraft)|Lehrperson trägt ein|Eltern unterschreiben)\b|\b(pour l['’]enseignant|pour l['’]animateur|à l['’]attention de l['’]enseignant)\b/i,
  // Gefühle abfragen (in Krisenlage nicht, A12)
  gefuehlfrage: /\b(Wie fühlst du dich|Wie geht es dir|Was macht dich (traurig|wütend|Angst)|ich bin traurig, weil|Ich fühle mich|Daumen (hoch|runter|hoch oder runter)|wie (traurig|wütend) bist du|Gefühl(e)? (benennen|zeigen|abfragen|erzählen)|Welches Tier bist du|Wie ist das Wetter bei dir|wie es (dir|dem Kind) (heute )?geht|wie (es|er|sie) sich (heute )?fühlt|innen heute anfühlt|eigenen Gefühl\w*|persönlichen Beispiel\w*)\b|\b(Comment te sens-tu|Comment ça va|pouce en (haut|bas)|Je me sens|Quel animal es-tu)\b/i,
  // Wut ausleben (A4, Ergänzung zu KATHARSIS_RE): stampfen, reißen, schlagen, schreien MIT Wut
  wutausleben: /\b(Wut|wütend|Ärger|Zorn)\b[^.!?]{0,80}\b(stampf\w*|zerreiß\w*|reiß\w*|zerknüll\w*|schlag\w*|box\w*|tret\w*|schrei\w*|werf\w*)|\b(stampf\w*|zerreiß\w*|reiß\w*|zerknüll\w*|box\w*|tret\w*|schrei\w*)\b[^.!?]{0,60}\b(Wut|wütend|Ärger|Zorn)\b/i,
}

// \b in JavaScript kennt nur ASCII: „Übergriff“, „Ärger“, „élèves“ hätten keine Wortgrenze. Darum \b durch eine Grenze
// für lateinische Buchstaben samt Umlauten und Akzenten ersetzen.
const L = 'A-Za-zÀ-ÖØ-öø-ÿ'
const GRENZE = `(?:(?<![${L}])(?=[${L}])|(?<=[${L}])(?![${L}]))`
const MIT_GRENZE: Record<string, RegExp> = Object.fromEntries(
  Object.entries(TEXT_MERKMALE).map(([n, re]) => [n, new RegExp(re.source.replace(/\\b/g, GRENZE), re.flags)]),
)

/** Merkmale eines Texts (DE und FR zusammen). */
export function textMerkmale(text: string): Set<string> {
  const s = new Set<string>()
  for (const [name, re] of Object.entries(MIT_GRENZE)) if (re.test(text)) s.add(name)
  return s
}

/** Erster Treffer eines Merkmals (für Prüfskript und Tests). */
export function merkmalTreffer(name: string, text: string): string | null {
  const m = MIT_GRENZE[name]?.exec(text)
  return m ? m[0] : null
}
