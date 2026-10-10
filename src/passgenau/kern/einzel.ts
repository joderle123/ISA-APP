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
      // Reste aus Klasse und Kurs (dritte Blind-Bewertung): Gruppentische, Freiwillige, Banknachbar, Lehrperson, Kugellager …
      String.raw`\b\w+-Gruppe\b|\bGruppenmitglied\w*|\bunserer Klasse\b|\bStaffel\w*|\bdevant les autres\b|\bconcours de cris\b|\bvote\b|\bAbstimmung\b|\bGruppentisch\w*|\bFreiwillige[n]?\b|\bBanknachbar\w*|\bLehrperson\w*|\bKlassen-\w+|\bKugellager\b|\bStammgruppe\w*|\bpro Team\b|\bLerngruppe\w*|\bExpertengruppe\w*|\bvolontaires?\b|\bvoisin(e)? de table\b`,
      // „Alle stehen hinter ihrem Stuhl“, „eine freiwillige Person“, „Die Kinder …“, „tous les enfants“
      String.raw`\balle (stehen|sitzen|gehen|laufen|machen|bewegen|setzen|legen|zeigen|rufen|schreiben|malen|bekommen|ziehen)\b|\bfreiwillige Person\b|\bdie Kinder (sitzen|stehen|gehen|bilden|bekommen|ziehen|tauschen|stellen)\b|\btous les enfants\b|\btout le monde\b`,
    ].join('|'),
    'i',
  ),
  // Anrede einer Gruppe
  ihr: /\b(euch|eure[nmrs]?)\b|\b(kennt|wisst|habt|seid|könnt|wollt|findet|seht|hört|denkt|meint|glaubt|erinnert|braucht|mögt) ihr\b|\b[Ii]hr (seid|habt|könnt|dürft|macht|sucht|geht|bekommt|werdet|sollt|wollt|dürft)\b|\b(Setzt|Stellt|Schaut|Nehmt|Macht|Sucht|Geht|Schreibt|Malt|Überlegt|Erzählt) (euch|ihr)\b|\bvous (allez|êtes|avez|pouvez)\b/,
  // für Jugendliche geschrieben
  jugend: /\b(der oder die Jugendliche|die Jugendlichen|Jugendliche[nr]?)\b|\b(le ou la jeune|les jeunes|l['’]adolescent(e)?)\b/,
  film: /\b(Film|Filme[ns]?|Filmausschnitt|Kurzfilm|Clip|Video|YouTube|Doku|Dokumentation|Trailer)\b|\b(film|extrait vidéo|vidéo|clip)\b/,
  draussen: /\b(Ausflug|Exkursion|Elterneinverständnis|Wiese|Wald|Park|Spaziergang|draußen|im Freien|Schulhof|Pausenhof|Naturtag|Spielplatz)\b|\b(sortie|en plein air|dehors|forêt|cour de récréation)\b/,
  kueche: /\b(Küche|kochen|kocht|backen|backt|Backofen|Teig|Rezept)\b|\b(cuisine|cuisiner|four|recette|pâte)\b/,
  gaeste: /\b(Gäste|Gast|Betriebsbesuch|Besuch(er)?|Bühne|Publikum|Aufführung|filmen|aufnehmen mit dem Handy)\b|\b(invités?|spectateurs|le public|devant un public|sur (la )?scène)\b/,
  // Verweis auf ein Arbeitsblatt der Quelle, das in Passgenau nicht gedruckt wird
  blattverweis: /\b(Aufgabe|Seite|Teil|Schritt|Station|Kapitel) \d\b|\b(Missionen?|Laufzettel|Fallkarten?|Fallakten?|Bodenradar|Forscher-Blatt|Akku-Blatt|Energie-Linie|Skills-Buch|Sinneskiste)\b|\b(Arbeitsblatt|Arbeitsblattes|Schülerblatt|Kopiervorlage|Vorlage|Koffer-Arbeitsblatt|Rückenwind-Blatt|Detektivblatt|Etappen-Karte|Ziel-Kompass|Motivations-Motor|Belohnungs-Baum|Tank-Tabelle)\b|\b(exercice|page|partie) \d\b|\bfiche (de travail|élève)\b/,
  // setzt eine frühere Stunde der Quelle voraus (dritte Blind-Bewertung: „Retour, mission“, „Kam dein Moment?“, Ferien-
  // Auftrag, „en cinq séances“, neues Kapitel) – nur für Einheiten aus Kurs, Förderfach, Material und CREW geprüft
  rueckbezug: /\b[Mm]issions?\b|\bWochenauftrag\w*|\bnach dem Auftrag\b|\bFerien\w*|\bvacances\b|\bletzten? (Stunde|Sitzung|Einheit)\b|\b(in|für) (vier|fünf|sechs|sieben|acht) (Stunden|Sitzungen|Einheiten)\b|\ben (quatre|cinq|six|sept|huit) séances\b|\b(neue[sn]?|diese[sn]?|des) Kapitels?\b|\b(nouveau|ce) chapitre\b|\bdernière séance\b/,
  // braucht ein Gerät (iPad mit CREW, Tablet, Laptop) – im Einzelzimmer nicht selbstverständlich
  geraet: /\b(iPads?|CREW|Tagescode|Tablets?|Laptops?|Beamer|Smartboard|tablettes?|ordinateur portable)\b/,
  // läuft über Tage oder findet zu Hause statt
  mehrtag: /\b(eine Woche lang|die ganze Woche|während der Woche|die Woche über|jeden Abend|jeden Tag|täglich|Wochen-?[Tt]racker|Wochenprotokoll|Punkteplan|Punkte-?[Mm]enü|heute Abend|zu Hause ausprobieren|bis zur nächsten Stunde)\b|\b(toute la semaine|chaque soir|chaque jour|ce soir|à la maison)\b/,
  // Wochentabelle (Mo–Fr) auf dem Blatt: ein Tracker über Tage
  wochentage: /Montag[\s\S]{0,300}Freitag|\bMo\b[\s\S]{0,40}\bDi\b[\s\S]{0,40}\bMi\b|\blundi\b[\s\S]{0,300}\bvendredi\b|\blun\b[\s\S]{0,40}\bmar\b[\s\S]{0,40}\bmer\b/,
  // Platzhalter und Kürzel statt Inhalt („A13 | A14 | A15“)
  kuerzel: /(\b[A-Z]\d{2}\b[^A-Za-z]{0,8}){3}/,
  // aktivierende Pausen „bei zu wenig Energie“ – nicht bei hoher Energie
  aktivierend: /zu wenig Energie|Aktivierende Pause|wenn (das Kind|die Klasse) müde|manque d['’]énergie/i,
  // Vorsicht trauer
  trauer: /\b(Tod|tot|gestorben|sterben|stirbt|Verlust|verloren|vermiss\w*|Abschied\w*|Trauer|trauer\w*|Friedhof|Beerdigung|Oma|Opa|Großmutter|Großvater|Trennung|Scheidung|traurig, weil)\b|\b(décès|mort|morte|deuil|perdu|manque|grand-mère|grand-père|séparation|divorce)\b/,
  // Vorsicht familie (und Kinderschutz): Fragen zu Familie oder Zuhause
  familie: /\b(Familie\w*|Zuhause|zu Hause|daheim|Eltern\w*|Mutter|Vater|Mama|Papa|Geschwister|Bruder|Schwester|Herkunft|Heimat\w*)\b|\b(famille|maison|parents|mère|père|maman|papa|frère|sœur|origine)\b/,
  // Vorsicht koerper
  koerper: /\b(eigenen? Hand|Hand (nach|um)zeichnen|Umriss (deiner|der) Hand|ta propre main|contour de (ta|la) main|Aussehen|Körperbild|Strand\w*|Bikini|Badeanzug|Gewicht|Figur|dick|dünn|Spiegel\w*|Diät|Kalorien|Körper-Chip|mein Körper verändert)\b|\b(apparence|poids|maillot|plage|régime|miroir)\b/,
  // belastende Sätze (nur mit Hilfe-Zeile; bei offener Krise nie)
  belastend: /\b(hilft (mir )?(sowieso )?keiner|alles egal|hoffnungslos|wertlos|niemand mag mich|keiner mag mich|ich hasse mich|nicht mehr leben|sinnlos|am liebsten weg|ich bin (so )?dumm|ich kann nichts|ich bin nichts wert|ich werde nie|ich bin hässlich|ich bin ein Versager|ich schaffe (das|es) nie|schaffe ich nie|alle sind gegen mich|alle sind besser als ich|keiner will mit mir|niemand will mit mir|ich mache (immer )?alles falsch)\b|\b(personne ne m['’]aide|je m['’]en fiche de tout|sans espoir|je ne vaux rien|je n['’]y arriverai jamais|tout le monde est meilleur que moi|personne ne veut jouer avec moi|je fais tout de travers)\b/i,
  // heikel ohne Freischaltung (T-M1 – auch ohne Beschriftung „sensibel“)
  heikel: /\b(Körpergrenze\w*|Körper-Grenze\w*|zu nah|Nähe und Distanz|Grenzen spüren|Körperabstand|Grenzverletzung\w*|Übergriff\w*|Garten-Übung|Selbstverletzung|selbstverletz\w*|Suizid\w*|ritzen|sexuell\w*|Missbrauch|Gewalt zu Hause)\b|\b(automutilation|suicide|abus|agression sexuelle)\b/i,
  // Themen für Ältere (A10): Dating, Party, Alkohol, Drogen
  aelter: /\b(Dating|Date|verliebt\w*|Verliebtsein|Liebeskummer|Korb bekommen|einen Korb|Party|Partys|Alkohol|betrunken|Zigarette\w*|Rauchen|Drogen|Kiffen|Joint|Konsum|Vape\w*)\b|\b(amoureux|amoureuse|soirée|alcool|drogue\w*|cigarette\w*)\b/i,
  // Belastendes direkt bearbeiten (bei Vorsicht Trauma nicht)
  mobbing: /\b(Mobbing|gemobbt|Diskriminierung|diskriminier\w*|Rassismus|rassistisch\w*|Forumtheater|Ausgrenzung erleben)\b|\b(harcèlement|discrimination|racisme)\b/i,
  // Notiz für Erwachsene im Text des Kindes (A3)
  fuerleitung: /\b((Signature|Unterschrift|signé)[^|]{0,40}(enseignant|Lehr|Leitung|parent|Eltern)|Für die Leitung|Für die Lehrkraft|Für Lehrpersonen|Hinweis für (die )?(Leitung|Lehrkraft|Fachkraft)|Lehrperson trägt ein|Eltern unterschreiben)\b|\b(pour l['’]enseignant|pour l['’]animateur|à l['’]attention de l['’]enseignant)\b/i,
  // Sorgen und Kummer hervorholen (in Krisenlage nicht, A12): Sorgen-Box, Sorgen-Stein, Trost-Koffer für traurige Tage
  sorgen: /\b(Sorge|Sorgen\w*|Kummer\w*|traurige[nr]? Tag\w*|Trost-?Koffer|Trostplan|soucis?|chagrin)\b/i,
  // Gefühle abfragen (in Krisenlage nicht, A12)
  // Blind-Bewertung 5: Abruftest, Kurztest, Quiz als Leistungsprobe (nicht in Krisenlage)
  leistung: /\b(Timer läuft|Le minuteur tourne|le minuteur tourne|gegenseitig abfragen|abfragen lassen|Abfrage\w*|Kurztest|Probetest|Probeklausur|Lücken markieren|se tester|s['’]interroger|interrogation|test blanc)\b/i,
  // kindliche Elemente (bei Jugendlichen ausgeschlossen)
  kindlich: /\b(Sticker|Stempel|Smiley\w*|Kuscheltier\w*|Handpuppe\w*|Wachsmal\w*|Löffel-Parcours|Flamingo\w*|Zauberstab|Zauberwort\w*|Ausmalbild\w*|Gummibärchen|autocollants?|peluches?|marionnettes?|craies grasses|flamant\w*|baguette magique|gestrichelten Linien nach|Spure\w* \w+ nach|nachspuren|repasse\w* les pointillés)\b/i,
  gefuehlfrage: /\b(fühle ich mich|Wie bereit fühlst du dich|wo bist du (jetzt|gerade)|Wie fühlst du dich|Wie geht es dir|Was macht dich (traurig|wütend|Angst)|ich bin traurig, weil|Ich fühle mich|Daumen (hoch|runter|hoch oder runter)|wie (traurig|wütend) bist du|Gefühl(e)? (benennen|zeigen|abfragen|erzählen)|Welches Tier bist du|Wie ist das Wetter bei dir|wie es (dir|dem Kind) (heute )?geht|wie (es|er|sie) sich (heute )?fühlt|innen heute anfühlt|eigenen Gefühl\w*|persönlichen Beispiel\w*|was (war|ist) (eigentlich |wirklich )?los in dir|was in dir (vor)?geht)\b|\b(Comment te sens-tu|Comment ça va|pouce en (haut|bas)|Je me sens|Quel animal es-tu|qu['’]est-ce qui se passait (vraiment )?en toi|ce qui se passe en toi)\b/i,
  // sich selbst einschätzen oder bewerten (Skala, Punkte, Fragebogen) – in Krisenlage nicht (Blind-Bewertung 8, A12/A7)
  selbstbewertung: /\b(auf einer Skala|Skalen? von [01]|von [01] bis (5|10)|[01] bis 10|einen Punkt (mehr|gewonnen)|Punkt gewonnen|Fragebogen|was (dir )?(noch )?schwer fällt)\b|\b(sur une échelle|échelles? de [01]|de [01] à (5|10)|gagné un point|questionnaire|ce qui est (encore )?difficile)\b/i,
  // Wettbewerb und Zeitdruck im Text (Blind-Bewertung 8: „findet zuerst“, „Rekord gegen die Uhr“, „Runde verloren“)
  wettlauf: /\b(wer zuerst|findet zuerst|als Erste[rs]? fertig|Rekord\w*|gegen die Uhr|so viele wie möglich|Runde verloren|hat verloren|wer gewinnt|qui trouve en premier|le premier qui|record|contre la montre|le plus possible|a perdu la manche)\b/i,
  // Diagnosen als Beispiel im Text (Blind-Bewertung 8: „im Autismus-Spektrum“ ohne Anlass im Planblatt)
  diagnose: /\b(Autismus\w*|autistisch\w*|ADHS|AD\(H\)S|Asperger\w*|Legasthenie|Dyskalkulie|autisme|autiste|TDAH|dyslexie|dyscalculie)\b/i,
  // Wut ausleben (A4, Ergänzung zu KATHARSIS_RE): stampfen, reißen, schlagen, schreien MIT Wut
  wutausleben: /\b(Wut|wütend|Ärger|Zorn)\b[^.!?]{0,80}\b(stampf\w*|zerreiß\w*|reiß\w*|zerknüll\w*|schlag\w*|box\w*|tret\w*|schrei\w*|werf\w*)|\b(stampf\w*|zerreiß\w*|reiß\w*|zerknüll\w*|box\w*|tret\w*|schrei\w*)\b[^.!?]{0,60}\b(Wut|wütend|Ärger|Zorn)\b/i,
}

// \b in JavaScript kennt nur ASCII: „Übergriff“, „Ärger“, „élèves“ hätten keine Wortgrenze. Darum \b durch eine Grenze
// für lateinische Buchstaben samt Umlauten und Akzenten ersetzen.
// Ziffern gehören dazu: „Aufgabe 4“, „Schritt 6“, „A13“ enden auf einer Ziffer (sonst griffe die Grenze dort nie)
const L = '0-9A-Za-zÀ-ÖØ-öø-ÿ'
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
