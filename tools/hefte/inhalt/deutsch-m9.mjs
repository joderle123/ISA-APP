// Deutsch · Modul 9 „Arbeitswelt und Jugendschutz“ (Voie de préparation, B1) – multimodales Heft.
// Themen und Grammatik nach den öffentlichen „Kompetenzorientierten Bildungsstandards Deutsch für den Modularunterricht“
// (MENFP 2009), Modul 9: Festigung der Module 6–8; Arbeitswelt, Sicherheitshinweise, Arbeits- und Jugendschutz;
// Texte überfliegen, Präsentation eines Arbeitsplatzes, Vorstellungsgespräch mit Notizen, Anleitungen (Kopierer, Webcam),
// Gefahren im Verkehr und Sicherheitsansage, Anweisungen der Ärztin nach einer Sportverletzung, Unfallbericht,
// Alkoholverkauf an Jugendliche in verschiedenen Ländern, Rechte im Ferienjob, Radio-Wettbewerb, Präsentationen;
// Adjektivattribute, Passiv (Wiederholung), Plusquamperfekt mit nachdem und bevor, Gesetzessprache entschlüsseln.
// Rechtliche Angaben bewusst vereinfacht und mit Hinweis auf die zuständigen Stellen; Personen und Betriebe ausgedacht.

export const MODUL = {
  id: 'deutsch-m9', kuerzel: 'de9', nr: 9, sprache: 'de', niveau: 'B1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-9',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Arbeitswelt und Jugendschutz', fr: 'Monde du travail et protection de la jeunesse' },
  untertitel: { de: 'Berufe und Vorstellungsgespräche, Anleitungen und Sicherheit, Unfälle, Jugendschutz und Rechte im Job – und am Ende deine eigene Präsentation.', fr: 'Métiers et entretiens d’embauche, modes d’emploi et sécurité, accidents, protection de la jeunesse et droits au travail – et pour finir, ta propre présentation.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['lina:froh:stehen-zeigen', 'chef:froh:stehen', 'sami:froh:laessig'],
  blasen: [{ t: 'Bewerbung?', x: 12, y: 112 }, { t: 'Sicher ist sicher!', x: 122, y: 100 }, { t: 'Ab 16?', x: 162, y: 150 }],
  themen: [
    { titel: { de: 'Ab in die Arbeitswelt', fr: 'En route vers le monde du travail' }, icon: 'briefcase', lektionen: 3 },
    { titel: { de: 'Sicher und geschützt', fr: 'En sécurité et protégé' }, icon: 'shield-check', lektionen: 4 },
    { titel: { de: 'Präsentieren', fr: 'Présenter' }, icon: 'presentation', lektionen: 1 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'Modul 9 wiederholt viel aus den Modulen 6 bis 8. Regeln und Gesetze sind hier vereinfacht erklärt – genaue Auskunft geben die zuständigen Stellen.',
  ],
  // nur für die Vorlese-Stimme (Python-Regex)
  aussprache: {
    '(\\w+)/in\\b': '\\1 oder \\1in', '\\bKfz\\b': 'Ka-Ef-Zett', '\\bLaptop\\b': 'Läptop', '\\bWebcam\\b': 'Webkäm', '\\bUSB\\b': 'U Es Be',
    '\\bE-Scooter': 'I-Skuter', '\\bITM\\b': 'I Te Em', '\\bOK\\b': 'okay', '(\\d+) ?%': '\\1 Prozent', '\\bDr\\.': 'Doktor',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Arbeitswelt · Adjektivendungen', titel: 'Der richtige Beruf für mich', untertitel: 'Drei kurze Texte überfliegen, die Präsentation eines Arbeitsplatzes hören und Voraussetzungen für einen Beruf erklären.',
    ziel: { de: 'Ich überfliege Texte, erkenne ihren Nutzen und beschreibe Berufe mit Adjektiven.', fr: 'Je survole des textes, je reconnais leur utilité et je décris des métiers avec des adjectifs.' },
    bild: ['amira:froh:blatt', 'chef:froh:erklaeren'],
    start: {
      was: 'Was braucht man?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was braucht man für diesen Beruf besonders? Verbinde.', stufe: 1, links: ['Kfz-Mechatroniker/in', 'Pflegehelfer/in', 'Bürokaufmann / Bürokauffrau', 'Elektriker/in', 'Koch / Köchin'], rechts: ['technisches Verständnis', 'Geduld mit Menschen', 'gute Computerkenntnisse', 'genaues Arbeiten mit Strom', 'Schnelligkeit und Teamgeist'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Drei Texte überfliegen', art: 'dokumente',
      quelle: 'Berufsinfo, Werbung und Erfahrungsbericht (ausgedacht)', titel: 'Welcher Text hilft mir?',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: '**Text A** · Berufsinfo: Kfz-Mechatroniker/in', text: ['**Aufgaben:** Fahrzeuge warten, Fehler suchen, Teile austauschen. **Ausbildung:** 3 Jahre, im Betrieb und in der Schule. **Voraussetzungen:** technisches Interesse, gute Noten in Mathe, handwerkliches Geschick. **Arbeitszeit:** meist tagsüber, manchmal samstags.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Text B** · Werbung: Autohaus Sonnenberg', text: ['Jetzt den neuen Familien-Van probefahren! Riesiger Kofferraum, sparsamer Motor. Nur dieses Wochenende: Kaffee und Kuchen für alle Besucher!'] },
        { stil: 'notiz', stimme: 'm3', kopf: '**Text C** · Erfahrungsbericht von Kevin (17)', text: ['Ich bin im zweiten Lehrjahr. Am Anfang war es hart: früh aufstehen, schwere Arbeit, kalte Werkstatt im Winter. Aber jetzt darf ich schon allein kleine Reparaturen machen. Mein Tipp: Mach vorher ein Praktikum – dann weißt du, ob der Beruf zu dir passt.'] },
      ],
      woerter: [['überfliegen', 'survoler (un texte)'], ['warten (ein Auto)', 'entretenir'], ['austauschen', 'remplacer'], ['die Voraussetzung', 'la condition requise'], ['das Geschick', 'l’habileté'], ['probefahren', 'faire un essai'], ['das Lehrjahr', 'l’année d’apprentissage'], ['der Erfahrungsbericht', 'le témoignage']],
      aufgaben: [
        { art: 'mc', auftrag: 'Überfliege die drei Texte (nur 30 Sekunden!). Welcher Text hilft dir? Kreuze an.', stufe: 1, fragen: [{ f: 'Du willst wissen, welche Noten wichtig sind.', o: ['Text A', 'Text B', 'Text C'], r: 0 }, { f: 'Du willst wissen, wie sich die Ausbildung anfühlt.', o: ['Text A', 'Text B', 'Text C'], r: 2 }, { f: 'Welcher Text hilft bei der Berufswahl nicht?', o: ['Text A', 'Text B', 'Text C'], r: 1 }] },
        { art: 'fragen', auftrag: 'Lies jetzt Text A und C genau.', stufe: 2, fragen: [{ f: 'Welche Voraussetzungen braucht man?', l: 'technisches Interesse, gute Noten in Mathe, handwerkliches Geschick' }, { f: 'Was war für Kevin am Anfang schwer?', l: 'früh aufstehen, schwere Arbeit, kalte Werkstatt im Winter' }, { f: 'Welchen Tipp gibt Kevin?', l: 'vorher ein Praktikum machen' }] },
      ],
    },
    hoeren: {
      was: 'Die Präsentation eines Arbeitsplatzes', wo: 'Berufsmesse · Präsentation', titel: 'Mein Arbeitsplatz: die Werkstatt',
      situation: 'Auf einer Berufsmesse stellt Lara ihren Arbeitsplatz vor. Sie ist Kfz-Mechatronikerin im dritten Lehrjahr.',
      bild: ['lea:froh:erklaeren', 'noah:froh'], sprecher: { Lara: 'w2', Schüler: 'm3' },
      text: [
        ['Lara', 'Hallo zusammen! Ich bin Lara, ich bin neunzehn und im dritten Lehrjahr als Kfz-Mechatronikerin. Ich zeige euch heute meinen Arbeitsplatz.'],
        ['Lara', 'Das hier ist unsere Werkstatt. Wir haben vier Hebebühnen. Damit wird das Auto hochgehoben, und wir können von unten arbeiten.'],
        ['Lara', 'Das wichtigste Werkzeug ist heute der Laptop. Mit dem Diagnosegerät lesen wir die Fehler aus dem Auto aus.'],
        ['Lara', 'Ein normaler Tag beginnt um halb acht. Zuerst besprechen wir im Team die Aufträge. Dann arbeitet jeder an seinem Auto. Um zwölf machen wir eine Stunde Mittagspause.'],
        ['Lara', 'Was ich an meinem Beruf mag? Jeder Tag ist anders. Und wenn ein Kunde mit einem kaputten Auto kommt und mit einem reparierten Auto wegfährt, bin ich stolz.'],
        ['Schüler', 'Ist die Arbeit nicht sehr schmutzig?'],
        ['Lara', 'Manchmal schon. Aber wir haben gute Arbeitskleidung, Handschuhe und am Ende eine warme Dusche. Das passt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was erwartest du in der Präsentation eines Arbeitsplatzes? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Werkzeuge und Maschinen', 'einen normalen Arbeitstag', 'das Lieblingsessen der Chefin'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Informationen.', stufe: 1, kopf: ['', 'Info'], breiten: [38, 62], zeilen: [['Alter und Lehrjahr', '[19 Jahre, drittes Lehrjahr]'], ['Zahl der Hebebühnen', '[vier]'], ['wichtigstes Werkzeug', '[der Laptop mit dem Diagnosegerät]'], ['Arbeitsbeginn', '[halb acht]'], ['Mittagspause', '[um zwölf, eine Stunde]']] },
        { art: 'fragen', auftrag: 'Wann ist Lara stolz?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wenn ein Kunde mit einem kaputten Auto kommt und mit einem reparierten Auto wegfährt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt in Gruppen: Welche Voraussetzungen braucht man für einen Beruf, den ihr kennt? Stellt euch gegenseitig Fragen.', stufe: 3, karten: [
        { titel: 'Erklären', text: ['Für diesen Beruf braucht man …', 'Man sollte … sein.', 'Wichtig ist, dass …'] },
        { titel: 'Fragen', text: ['Ist die Arbeit …?', 'Was ist schwierig an diesem Beruf?', 'Warum interessiert dich das?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Adjektive vor dem Nomen: Nominativ und Akkusativ', tabelle: { kopf: ['', 'maskulin', 'feminin', 'neutral', 'Plural'], zeilen: [['Nominativ', 'der neu**e** Laptop', 'die warm**e** Dusche', 'das kaputt**e** Auto', 'die gut**en** Noten'], ['Akkusativ', 'den neu**en** Laptop', 'die warm**e** Dusche', 'das kaputt**e** Auto', 'die gut**en** Noten'], ['mit ein', 'ein neu**er** Laptop', 'eine warm**e** Dusche', 'ein kaputt**es** Auto', 'gut**e** Noten']] } }],
        [{ titel: 'So merkst du es dir', punkte: ['Nach **der, die, das** (Nominativ): meistens **-e**.', 'Im **Plural** mit Artikel und im **Akkusativ maskulin**: **-en**.', 'Nach **ein** zeigt das Adjektiv das Genus: ein neu**er** Laptop (m), ein kaputt**es** Auto (n).'] },
         { art: 'tipp', titel: 'Texte überfliegen', text: 'Lies zuerst **Überschrift**, **fett gedruckte Wörter** und **Zahlen**. Frag dich: Hilft mir dieser Text bei **meiner** Frage? Wenn ja: genau lesen.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Adjektivendung.', stufe: 1, saetze: ['Das ist der neu[e] Laptop.', 'Lara repariert ein kaputt[es] Auto.', 'Sie trägt eine sauber[e] Arbeitshose.', 'Er braucht gut[e] Noten in Mathe.', 'Wir suchen einen freundlich[en] Mitarbeiter.'] },
      { art: 'abschreiben', auftrag: 'Beschreib genauer mit dem Adjektiv in Klammern.', stufe: 2, kopf: ['Satz', 'mit Adjektiv'], saetze: [['Ich suche eine Ausbildung. (spannend)', 'Ich suche eine spannende Ausbildung.'], ['Das ist ein Beruf. (interessant)', 'Das ist ein interessanter Beruf.'], ['Ich habe einen Termin. (wichtig)', 'Ich habe einen wichtigen Termin.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreib einen Beruf, der dich interessiert: Aufgaben, Voraussetzungen, Arbeitszeiten. Benutze Adjektive.', stufe: 2,
        anfaenge: ['Mich interessiert der Beruf …', 'Man arbeitet in einem / einer …', 'Wichtige Voraussetzungen sind …', 'Ein normaler Arbeitstag …', 'Ich finde den Beruf …, weil …'], zeilen: 10,
        beispiel: 'Mich interessiert der Beruf Elektronikerin. Man arbeitet in einer hellen Werkstatt oder auf Baustellen. Wichtige Voraussetzungen sind gute Noten in Mathe und genaues Arbeiten. Ein normaler Arbeitstag beginnt früh. Ich finde den Beruf spannend, weil man jeden Tag etwas Neues lernt.' },
    ],
    check: ['Ich überfliege Texte und erkenne, ob sie mir helfen.', 'Ich verstehe die Präsentation eines Arbeitsplatzes.', 'Ich erkläre Voraussetzungen für einen Beruf.', 'Ich benutze Adjektive mit der richtigen Endung.', 'Ich beschreibe einen Beruf.'],
  },
  // ================================================================ 2
  {
    thema: 'Vorstellungsgespräch · Plusquamperfekt', titel: 'Das Vorstellungs­gespräch', untertitel: 'Tipps für das Gespräch, ein Vorstellungsgespräch zum Mithören und Notizen: Du bereitest dich vor – und erzählst, was vorher passiert war.',
    ziel: { de: 'Ich bereite ein Vorstellungsgespräch vor, mache Notizen und benutze nachdem mit dem Plusquamperfekt.', fr: 'Je prépare un entretien d’embauche, je prends des notes et j’utilise « nachdem » avec le plus-que-parfait.' },
    bild: ['jana:nervoes:stehen', 'chef:froh:stehen'],
    start: {
      was: 'Gut oder nicht gut?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was ist im Vorstellungsgespräch gut, was nicht? Kreuze an.', stufe: 1, spalten: ['gut', 'nicht gut'], saetze: [['pünktlich kommen', true], ['das Handy während des Gesprächs benutzen', false], ['Fragen über den Betrieb stellen', true], ['schlecht über die alte Schule reden', false], ['freundlich grüßen und die Person ansehen', true]] },
      ],
    },
    lesen: {
      was: 'Tipps für das Vorstellungsgespräch', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Ratgeber Bewerbung', titel: 'Gut vorbereitet ist halb gewonnen',
      absaetze: [
        '**Vorher informieren:** Schau dir die Internetseite des Betriebs an. Was stellt die Firma her? Wie viele Leute arbeiten dort? Wer gut informiert ist, macht einen guten Eindruck.',
        '**Antworten üben:** Typische Fragen sind: „Warum möchten Sie diesen Beruf lernen?“ – „Was sind Ihre Stärken?“ – „Was machen Sie in Ihrer Freizeit?“ Übe die Antworten laut, zum Beispiel mit Freunden.',
        '**Die richtige Kleidung:** Sie muss nicht teuer sein, aber sauber und passend. Für eine Werkstatt ist ein ordentlicher Pullover besser als ein Anzug.',
        '**Im Gespräch:** Begrüße alle freundlich, setz dich erst, wenn man es dir anbietet, und hör gut zu. Wenn du eine Frage nicht verstehst, frag nach.',
        '**Am Ende:** Stell selbst eine oder zwei Fragen, zum Beispiel: „Wie sieht ein normaler Tag in der Ausbildung aus?“ Bedanke dich für das Gespräch.',
      ],
      woerter: [['der Eindruck', 'l’impression'], ['herstellen', 'fabriquer'], ['die Stärke', 'le point fort'], ['passend', 'approprié'], ['ordentlich', 'soigné'], ['der Anzug', 'le costume'], ['anbieten', 'proposer'], ['sich bedanken', 'remercier']],
      aufgaben: [
        { art: 'mc', auftrag: 'Was rät der Text? Kreuze an.', stufe: 1, fragen: [{ f: 'Vor dem Gespräch soll man …', o: ['sich über den Betrieb informieren', 'neue, teure Kleidung kaufen'], r: 0 }, { f: 'Wann setzt man sich?', o: ['sofort', 'wenn man es einem anbietet'], r: 1 }, { f: 'Am Ende soll man …', o: ['schnell gehen', 'selbst Fragen stellen und sich bedanken'], r: 1 }] },
        { art: 'fragen', auftrag: 'Wie würdest du auf die Frage „Was sind Ihre Stärken?“ antworten?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ich bin pünktlich und zuverlässig. Außerdem arbeite ich gern im Team.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Vorstellungsgespräch', wo: 'Autowerkstatt Becker · Vorstellungsgespräch', titel: 'Erzählen Sie mal …',
      situation: 'Malik hat sich um einen Ausbildungsplatz beworben. Herr Becker führt mit ihm das Vorstellungsgespräch. Mach Notizen wie Herr Becker.',
      bild: ['chef:froh:erklaeren', 'sami:nervoes'], sprecher: { 'Herr Becker': 'm2', Malik: 'm3' },
      text: [
        ['Herr Becker', 'Guten Tag, Malik. Schön, dass Sie da sind. Bitte setzen Sie sich. Erzählen Sie mal: Warum möchten Sie Kfz-Mechatroniker werden?'],
        ['Malik', 'Guten Tag. Ich interessiere mich schon lange für Autos. Nachdem ich letzten Sommer ein Praktikum bei Ihnen gemacht hatte, war ich ganz sicher: Das ist mein Beruf.'],
        ['Herr Becker', 'Was hat Ihnen im Praktikum am besten gefallen?'],
        ['Malik', 'Die Fehlersuche mit dem Computer. Und dass ich nach zwei Wochen schon allein Reifen wechseln durfte.'],
        ['Herr Becker', 'Was sind Ihre Stärken?'],
        ['Malik', 'Ich bin pünktlich und arbeite genau. In Mathe bin ich nicht der Beste, aber ich übe jede Woche mit Nachhilfe.'],
        ['Herr Becker', 'Das ist ehrlich, das gefällt mir. Haben Sie noch Fragen an uns?'],
        ['Malik', 'Ja. Wie viele Tage pro Woche bin ich in der Schule und wie viele im Betrieb?'],
        ['Herr Becker', 'Am Anfang zwei Tage Schule und drei Tage Betrieb. Wir melden uns bis Ende des Monats bei Ihnen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Fragen hört man oft im Vorstellungsgespräch? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Warum möchten Sie diesen Beruf lernen?', 'Was sind Ihre Stärken?', 'Wie heißt Ihr Lieblingsfilm?'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Mach Notizen wie Herr Becker.', stufe: 1, kopf: ['Notizen zu Malik', ''], breiten: [38, 62], zeilen: [['Warum dieser Beruf?', '[interessiert sich lange für Autos; Praktikum im Betrieb]'], ['Lieblingsaufgabe im Praktikum', '[Fehlersuche mit dem Computer]'], ['Stärken', '[pünktlich, genau, ehrlich]'], ['Schwäche', '[Mathe – übt mit Nachhilfe]'], ['seine Frage', '[Tage in Schule und Betrieb]'], ['Antwort bis', '[Ende des Monats]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Rollenspiel: Vorstellungsgespräch. Die Person für den Betrieb macht Notizen. Danach tauscht ihr.', stufe: 3, karten: [
        { titel: 'Betrieb', text: ['Warum möchten Sie … werden?', 'Was sind Ihre Stärken?', 'Haben Sie noch Fragen?'] },
        { titel: 'Bewerber/in', text: ['Nachdem ich … hatte, …', 'Ich bin … und …', 'Wie sieht ein normaler Tag aus?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Plusquamperfekt: was vorher passiert war', punkte: ['**hatte / war** + Partizip II', 'Ich **hatte** ein Praktikum **gemacht**.', 'Ich **war** nach Luxemburg **gezogen**.', 'Man benutzt es für etwas, das **vor** einem anderen Ereignis in der Vergangenheit passiert war.'] },
         { titel: 'nachdem und bevor', punkte: ['**Nachdem** ich das Praktikum gemacht **hatte**, **war** ich sicher.', 'nachdem-Satz: **Plusquamperfekt** · Hauptsatz: **Präteritum**', '**Bevor** ich mich **bewarb**, **informierte** ich mich.', 'bei bevor: **gleiche Zeitform** in beiden Sätzen'] }],
        [{ art: 'tipp', titel: 'Notizen machen', text: 'Schreib **Stichwörter**, keine ganzen Sätze. Benutze **Abkürzungen** (z. B., Std., Mo.). Ordne die Notizen nach **Fragen**.' },
         { art: 'achtung', titel: 'Sie im Gespräch', text: 'Im Vorstellungsgespräch sagt man **Sie** – auch wenn die Person jung ist. Warte, bis man dir das **du** anbietet.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze hatte oder war.', stufe: 1, saetze: ['Nachdem ich die Anzeige gelesen [hatte], rief ich an.', 'Nachdem Malik nach Hause gekommen [war], schrieb er eine E-Mail.', 'Nachdem wir den Betrieb besichtigt [hatten], wussten wir mehr.', 'Nachdem Lara die Prüfung bestanden [hatte], feierte sie.'] },
      { art: 'abschreiben', auftrag: 'Verbinde mit nachdem.', stufe: 2, kopf: ['zwei Sätze', 'mit nachdem'], saetze: [['Ich übte die Antworten. Dann ging ich zum Gespräch.', 'Nachdem ich die Antworten geübt hatte, ging ich zum Gespräch.'], ['Er schrieb die Bewerbung. Dann schickte er sie ab.', 'Nachdem er die Bewerbung geschrieben hatte, schickte er sie ab.'], ['Sie kam im Betrieb an. Dann begrüßte sie alle.', 'Nachdem sie im Betrieb angekommen war, begrüßte sie alle.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Bereite dein Vorstellungsgespräch vor: Schreib Antworten auf drei typische Fragen und zwei eigene Fragen an den Betrieb (echt oder erfunden).', stufe: 2,
        anfaenge: ['Warum dieser Beruf? – Ich möchte …, weil …', 'Meine Stärken: Ich bin …', 'Meine Freizeit: …', 'Meine Fragen: Wie …? Wann …?'], zeilen: 11,
        beispiel: 'Warum dieser Beruf? – Ich möchte Köchin werden, weil ich gern für andere koche. Nachdem ich ein Praktikum in einer Kantine gemacht hatte, wusste ich: Das passt. Meine Stärken: Ich bin schnell und arbeite sauber. Meine Freizeit: Ich backe und spiele Handball. Meine Fragen: Wie viele Lehrlinge haben Sie? Wann beginnt die Arbeit morgens?' },
    ],
    check: ['Ich verstehe Tipps für ein Vorstellungsgespräch.', 'Ich verstehe ein Vorstellungsgespräch und mache Notizen.', 'Ich beantworte typische Fragen.', 'Ich benutze nachdem mit dem Plusquamperfekt.', 'Ich bereite Fragen an den Betrieb vor.'],
  },
  // ================================================================ 3
  {
    thema: 'Anleitungen · Passiv', titel: 'Wie funktioniert das?', untertitel: 'Eine Anleitung für den Kopierer, Hilfe beim Einrichten einer Webcam und eigene Anleitungen: Du erklärst Schritt für Schritt, wie man ein Gerät bedient.',
    ziel: { de: 'Ich folge schriftlichen Anleitungen und erkläre, wie man ein Gerät bedient.', fr: 'Je suis des instructions écrites et j’explique comment utiliser un appareil.' },
    bild: ['yusuf:froh:laptop', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Wörter aus Anleitungen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['drücken', 'einlegen', 'auswählen', 'einstecken', 'bestätigen'], rechts: ['mit dem Finger auf eine Taste', 'Papier in das Fach tun', 'aus mehreren Möglichkeiten eine nehmen', 'das Kabel in die Buchse stecken', 'mit OK sagen: Ja, so ist es richtig.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Eine Bedienungsanleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Anleitung am Kopierer der Schulbibliothek', titel: 'Kopieren in drei Minuten',
      material: ['deine Schülerkarte', 'das Original', 'Papier im Fach (A4)'],
      schritte: [
        { icon: 'id-badge', text: 'Halte deine **Schülerkarte** an das Lesegerät. Auf dem Bildschirm siehst du, wie viele Kopien du noch machen darfst.' },
        { icon: 'file', text: 'Klappe den **Deckel** auf und lege das Original mit der Schrift **nach unten** auf das Glas. Die Ecke muss am Pfeil liegen.' },
        { icon: 'adjustments', text: 'Wähle auf dem Bildschirm aus: **Anzahl** der Kopien, **Farbe** oder **Schwarz-Weiß**, **einseitig** oder **beidseitig**.' },
        { icon: 'player-play', text: 'Drücke die grüne **Start-Taste**. Warte, bis alle Kopien fertig sind.' },
        { icon: 'logout', text: '**Nimm** das Original wieder **mit** und melde dich ab: Taste **„Abmelden“** drücken.' },
      ],
      danach: ['**Papierstau?** Der Bildschirm zeigt, welche Klappe man öffnen muss. Zieh das Papier **vorsichtig** heraus. Greif nie in das Gerät, wenn die Warnung **„Heiß!“** erscheint. Im Zweifel: in der Bibliothek Bescheid sagen.'],
      woerter: [['die Bedienungsanleitung', 'le mode d’emploi'], ['das Lesegerät', 'le lecteur'], ['der Deckel', 'le couvercle'], ['das Original', 'l’original'], ['beidseitig', 'recto verso'], ['die Taste', 'la touche'], ['sich abmelden', 'se déconnecter'], ['der Papierstau', 'le bourrage papier']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Das Original liegt mit der Schrift nach oben auf dem Glas.', false], ['Man kann zwischen Farbe und Schwarz-Weiß wählen.', true], ['Am Ende muss man sich abmelden.', true], ['Bei der Warnung „Heiß!“ darf man in das Gerät greifen.', false]] },
        { art: 'fragen', auftrag: 'Was machst du bei einem Papierstau?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die Klappe öffnen, die der Bildschirm zeigt, und das Papier vorsichtig herausziehen. Bei „Heiß!“ nicht hineingreifen; im Zweifel in der Bibliothek Bescheid sagen.' }] },
      ],
    },
    hoeren: {
      was: 'Anweisungen am Telefon', wo: 'Telefonat · technische Hilfe', titel: 'Kannst du mich sehen?',
      situation: 'Yusuf hat morgen ein Vorstellungsgespräch per Video. Seine Webcam funktioniert nicht. Er ruft seinen Freund Ben an, der sich gut auskennt.',
      bild: ['yusuf:verwirrt:laptop', 'ben:froh:handy'], sprecher: { Yusuf: 'm3', Ben: 'm1' },
      text: [
        ['Yusuf', 'Ben, hilf mir bitte! Morgen habe ich das Gespräch per Video, und die Webcam geht nicht. Das Bild bleibt schwarz.'],
        ['Ben', 'Keine Panik. Zuerst: Ist die Kamera mit dem Laptop verbunden? Schau, ob das Kabel richtig im USB-Anschluss steckt.'],
        ['Yusuf', 'Ja, das Kabel steckt. Das Licht an der Kamera ist aber aus.'],
        ['Ben', 'Okay. Dann zieh das Kabel noch einmal heraus, warte fünf Sekunden und steck es in einen anderen Anschluss.'],
        ['Yusuf', 'Gemacht … Jetzt leuchtet ein grünes Licht!'],
        ['Ben', 'Sehr gut. Jetzt öffnest du das Videoprogramm. Unten links ist ein Kamera-Symbol. Darauf klickst du und wählst die Webcam aus.'],
        ['Yusuf', 'Ich sehe mich! Aber das Bild ist ganz dunkel.'],
        ['Ben', 'Dann setz dich mit dem Gesicht zum Fenster, nicht mit dem Rücken. Und mach mit mir einen Test, bevor das echte Gespräch beginnt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was braucht man für ein Gespräch per Video? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Kamera', 'ein Mikrofon', 'einen Drucker'], r: [0, 1] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. In welcher Reihenfolge macht Yusuf das? Nummeriere.', stufe: 1, teile: ['prüfen, ob das Kabel steckt', 'das Kabel herausziehen und fünf Sekunden warten', 'das Kabel in einen anderen Anschluss stecken', 'das Videoprogramm öffnen', 'auf das Kamera-Symbol klicken und die Webcam auswählen', 'sich mit dem Gesicht zum Fenster setzen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt euch gegenseitig, wie man ein Gerät bedient (Handykamera, Drucker, Mikrowelle, Fahrradlicht …). Die andere Person macht mit – nur nach deinen Worten!', stufe: 3, karten: [
        { titel: 'Erklären', text: ['Zuerst … · Dann … · Danach … · Zum Schluss …', 'Drück auf … · Wähl … aus.', 'Achtung: Du darfst nicht …', 'Bevor du …, musst du …'] },
        { titel: 'Nachfragen', text: ['Wo genau ist …?', 'Meinst du die linke oder die rechte Taste?', 'Kannst du das noch einmal zeigen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'So ist eine Anleitung aufgebaut', punkte: ['**Titel:** Was kann ich damit machen?', '**Material** und **Voraussetzungen**', '**Schritte** in der richtigen Reihenfolge, oft mit **Nummern** und **Bildern**', '**Warnhinweise** und **Hilfe bei Problemen**', 'Sprache: **Imperativ** (Drücke …) oder **Infinitiv** (Taste drücken.)'] },
         { titel: 'Passiv in Anleitungen (Wiederholung)', punkte: ['Das Original **wird** auf das Glas **gelegt**.', 'Die Anzahl **wird** auf dem Bildschirm **ausgewählt**.', 'Danach **wird** die Start-Taste **gedrückt**.', 'Wer es macht, ist egal – **was** gemacht wird, ist wichtig.'] }],
        [{ art: 'tipp', titel: 'Gut erklären', text: 'Sprich **langsam**, zeig mit dem Finger, benutze **Zuerst – Dann – Danach – Zum Schluss**. Frag am Ende: **Hast du alles verstanden?**' },
         { art: 'achtung', titel: 'bevor und nachdem (Lektion 2)', text: '**Bevor** du kopierst, meldest du dich an. · **Nachdem** du kopiert **hast**, meldest du dich ab.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Schreib die Anleitung im Passiv.', stufe: 2, kopf: ['Imperativ', 'Passiv'], saetze: [['Lege das Papier ins Fach.', 'Das Papier wird ins Fach gelegt.'], ['Drücke die Start-Taste.', 'Die Start-Taste wird gedrückt.'], ['Wähle die Farbe aus.', 'Die Farbe wird ausgewählt.']] },
      { art: 'luecken', auftrag: 'Ergänze: Zuerst, Dann, Danach, Zum Schluss.', stufe: 1, woerter: ['Zuerst', 'Dann', 'Danach', 'Zum Schluss'], saetze: ['[Zuerst] hältst du die Karte an das Lesegerät.', '[Dann] legst du das Original auf das Glas.', '[Danach] drückst du die Start-Taste.', '[Zum Schluss] meldest du dich ab.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Anleitung für ein Gerät, das du gut bedienen kannst (Handykamera, Mikrowelle, Spielkonsole, Kaffeemaschine …). Mit Material, Schritten und einem Warnhinweis.', stufe: 2,
        anfaenge: ['So funktioniert …', 'Du brauchst: …', '1. Zuerst …', '2. Dann …', 'Achtung: …'], zeilen: 11,
        beispiel: 'So funktioniert die Mikrowelle in der Schulküche. Du brauchst: einen Teller ohne Metall. 1. Zuerst öffnest du die Tür und stellst den Teller hinein. 2. Dann schließt du die Tür. 3. Danach wählst du die Zeit aus, zum Beispiel zwei Minuten. 4. Zum Schluss drückst du auf Start. Achtung: Nie Metall oder Alufolie in die Mikrowelle legen!' },
    ],
    check: ['Ich folge einer schriftlichen Anleitung.', 'Ich verstehe mündliche Anweisungen genau.', 'Ich erkläre, wie man ein Gerät bedient.', 'Ich kenne den Aufbau von Anleitungen.', 'Ich schreibe eine Anleitung mit Warnhinweis.'],
  },
  // ================================================================ 4
  {
    thema: 'Sicherheit im Verkehr · Adjektive im Dativ', titel: 'Sicher unterwegs', untertitel: 'Tipps für Rad und Roller, Warnschilder und eine Sicherheitsansage im Flugzeug: Du verstehst Warnhinweise und gibst genaue Tipps.',
    ziel: { de: 'Ich verstehe Warnhinweise und Sicherheitsanweisungen und gebe anderen genaue Tipps.', fr: 'Je comprends des avertissements et des consignes de sécurité et je donne des conseils précis.' },
    bild: ['finn:froh:laessig', 'opa:besorgt'],
    start: {
      was: 'Zeichen und Schilder',
      aufgaben: [
        { art: 'symbole', auftrag: 'Was bedeutet das Zeichen? Schreib das Wort.', stufe: 1, woerter: ['Achtung!', 'Durchfahrt verboten', 'Fußgänger', 'Fahrrad', 'Ampel', 'Baustelle', 'Erste Hilfe', 'Helm'],
          symbole: [['alert-triangle', 'Achtung!'], ['ban', 'Durchfahrt verboten'], ['walk', 'Fußgänger'], ['bike', 'Fahrrad'], ['traffic-lights', 'Ampel'], ['barrier-block', 'Baustelle'], ['first-aid-kit', 'Erste Hilfe'], ['helmet', 'Helm']] },
      ],
    },
    lesen: {
      was: 'Sicherheitstipps für Jugendliche', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Broschüre Verkehrssicherheit', titel: 'Gut gesehen – gut geschützt',
      absaetze: [
        '**Der Helm:** Ein gut sitzender Helm schützt den Kopf bei einem Sturz. Er soll fest sitzen, aber nicht drücken. Nach einem schweren Sturz braucht man einen neuen Helm – auch wenn man keinen Schaden sieht.',
        '**Sehen und gesehen werden:** Im Dunkeln braucht das Fahrrad ein weißes Licht vorne und ein rotes Licht hinten. Helle Kleidung und Reflektoren helfen zusätzlich.',
        '**Der tote Winkel:** Fahrer von großen Lastwagen und Bussen können Radfahrer rechts neben dem Fahrzeug oft nicht sehen. Darum: An der Ampel **nie rechts neben** einem Lastwagen halten, sondern **dahinter** warten.',
        '**Kopfhörer und Handy:** Wer laute Musik hört oder aufs Handy schaut, bemerkt Gefahren zu spät. Das Handy bleibt beim Fahren in der Tasche!',
        '**E-Scooter:** Auch hier gilt: Helm tragen, nur eine Person pro Roller, nicht auf dem Gehweg fahren. Die genauen Regeln, zum Beispiel das Mindestalter, sind von Land zu Land verschieden.',
      ],
      woerter: [['der Sturz', 'la chute'], ['sitzen (Helm)', 'être bien ajusté'], ['der Schaden', 'le dégât'], ['der Reflektor', 'le catadioptre'], ['der tote Winkel', 'l’angle mort'], ['der Lastwagen', 'le camion'], ['bemerken', 'remarquer'], ['der Gehweg', 'le trottoir']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Nach einem schweren Sturz kann man den Helm weiter benutzen.', false], ['Vorne braucht das Fahrrad ein weißes Licht.', true], ['An der Ampel soll man rechts neben einem Lastwagen halten.', false], ['Auf einem E-Scooter fährt nur eine Person.', true]] },
        { art: 'fragen', auftrag: 'Erkläre mit eigenen Worten: Was ist der tote Winkel?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Ein Bereich neben einem großen Fahrzeug, den der Fahrer nicht sehen kann.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Sicherheitsansage im Flugzeug', wo: 'Flugzeug · vor dem Start', titel: 'Bitte schnallen Sie sich an',
      situation: 'Mia fliegt mit ihrer Klasse nach Berlin. Vor dem Start hört sie die Sicherheitsansage. Danach spricht sie mit Noah.',
      bild: ['mia:nervoes', 'noah:froh'], sprecher: { Flugbegleiterin: 'w1', Mia: 'w2', Noah: 'm1' },
      text: [
        ['Flugbegleiterin', 'Meine Damen und Herren, liebe Fluggäste, willkommen an Bord. Bitte hören Sie jetzt aufmerksam zu.'],
        ['Flugbegleiterin', 'Zum Schließen des Sicherheitsgurtes stecken Sie die Metallzunge in das Schloss. Ziehen Sie den Gurt fest. Zum Öffnen heben Sie die Lasche an.'],
        ['Flugbegleiterin', 'Die Notausgänge befinden sich vorne, in der Mitte und hinten. Bei Dunkelheit führen Sie Lichtstreifen auf dem Boden zu den Ausgängen.'],
        ['Flugbegleiterin', 'Bei Druckverlust fallen Sauerstoffmasken automatisch herunter. Ziehen Sie eine Maske zu sich und setzen Sie sie über Mund und Nase. Helfen Sie erst danach anderen Personen.'],
        ['Flugbegleiterin', 'Bitte stellen Sie Ihre elektronischen Geräte jetzt in den Flugmodus. Wir wünschen Ihnen einen angenehmen Flug.'],
        ['Mia', 'Noah, warum soll man zuerst sich selbst die Maske aufsetzen?'],
        ['Noah', 'Weil man ohne Sauerstoff schnell schwach wird. Nur wer selbst Luft bekommt, kann anderen helfen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was hört man in einer Sicherheitsansage im Flugzeug? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wie man den Gurt schließt', 'wo die Notausgänge sind', 'was es zu essen gibt'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie öffnet man den Gurt?', o: ['Man zieht fest daran.', 'Man hebt die Lasche an.'], r: 1 }, { f: 'Wo sind die Notausgänge?', o: ['nur vorne', 'vorne, in der Mitte und hinten'], r: 1 }, { f: 'Was hilft bei Dunkelheit?', o: ['Lichtstreifen auf dem Boden', 'die Handylampe'], r: 0 }, { f: 'Wem hilft man bei Druckverlust zuerst?', o: ['sich selbst', 'den Nachbarn'], r: 0 }] },
        { art: 'fragen', auftrag: 'Warum setzt man zuerst sich selbst die Maske auf?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil man ohne Sauerstoff schnell schwach wird. Nur wer selbst Luft bekommt, kann anderen helfen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Gebt einer jüngeren Person genaue Sicherheitstipps für den Schulweg mit dem Rad oder Roller.', stufe: 3, karten: [
        { titel: 'Tipps geben', text: ['Du musst immer …', 'Achte darauf, dass …', 'Halte nie …, sondern …', 'Wenn es dunkel ist, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Adjektive nach ein: Akkusativ und Dativ', tabelle: { kopf: ['', 'maskulin', 'feminin', 'neutral'], zeilen: [['Akkusativ', 'einen gut**en** Helm', 'eine hell**e** Jacke', 'ein weiß**es** Licht'], ['Dativ', 'mit einem gut**en** Helm', 'mit einer hell**en** Jacke', 'mit einem weiß**en** Licht']] } }],
        [{ titel: 'Warnhinweise verstehen', punkte: ['**Achtung!** · **Vorsicht!** = Pass auf!', '**Nicht** … · **verboten** = Das darf man nicht.', 'Oft im Infinitiv: **Nicht berühren!** · **Helm tragen!**', 'Passiv mit Modalverb: Der Gurt **muss** geschlossen **werden**.'] },
         { art: 'tipp', titel: 'Dativ: immer -en', text: 'Nach **einem**, **einer**, **dem**, **der** im Dativ hat das Adjektiv **immer -en**: mit dem neu**en** Helm, mit einer hell**en** Jacke.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Adjektivendung.', stufe: 1, saetze: ['Ich trage einen gut[en] Helm.', 'Mia hat eine hell[e] Jacke.', 'Das Rad braucht ein rot[es] Licht hinten.', 'Fahr nie mit einem kaputt[en] Licht!', 'Er wartet hinter dem groß[en] Lastwagen.'] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Warnhinweis einen ganzen Satz.', stufe: 2, kopf: ['Schild', 'ganzer Satz'], saetze: [['Helm tragen!', 'Du musst einen Helm tragen.'], ['Nicht berühren!', 'Man darf das nicht berühren.'], ['Gurt schließen!', 'Der Gurt muss geschlossen werden.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte einen Flyer mit fünf Sicherheitstipps für Jugendliche, die mit dem Rad oder E-Scooter zur Schule fahren.', stufe: 2,
        anfaenge: ['Sicher zur Schule!', '1. Trag immer …', '2. Im Dunkeln …', '3. Halte nie …', 'Achtung: …'], zeilen: 10,
        beispiel: 'Sicher zur Schule! 1. Trag immer einen gut sitzenden Helm. 2. Im Dunkeln brauchst du ein weißes Licht vorne und ein rotes Licht hinten. 3. Halte nie rechts neben einem Lastwagen. 4. Das Handy bleibt in der Tasche. 5. Fahr nicht auf dem Gehweg. Achtung: Auf einem Roller fährt nur eine Person!' },
    ],
    check: ['Ich verstehe Sicherheitstipps für den Verkehr.', 'Ich verstehe eine Sicherheitsansage.', 'Ich verstehe Warnschilder und Warnhinweise.', 'Ich benutze Adjektive nach ein und im Dativ.', 'Ich gebe anderen genaue Sicherheitstipps.'],
  },
  // ================================================================ 5
  {
    thema: 'Verletzungen · nachdem und bevor', titel: 'Was war passiert?', untertitel: 'Ein Unfallbericht aus dem Praktikum, die Anweisungen einer Ärztin nach einer Sportverletzung und dein eigener Bericht: Du erzählst genau, was vorher passiert war.',
    ziel: { de: 'Ich verstehe genaue Anweisungen und berichte über einen Unfall mit nachdem und bevor.', fr: 'Je comprends des consignes précises et je rapporte un accident avec « nachdem » et « bevor ».' },
    bild: ['ben:traurig:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Verletzungen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was ist das? Verbinde.', stufe: 1, links: ['die Verstauchung', 'die Prellung', 'die Schnittwunde', 'der Bruch', 'die Gehirnerschütterung'], rechts: ['das Gelenk ist überdehnt und dick', 'ein blauer Fleck nach einem Stoß', 'die Haut ist durch ein Messer verletzt', 'der Knochen ist kaputt', 'Kopfschmerzen und Übelkeit nach einem Schlag auf den Kopf'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Unfallbericht', art: 'dokumente',
      quelle: 'Praktikumsbetrieb (ausgedacht)', titel: 'Unfall an der Werkbank',
      dokumente: [
        { stil: 'nachricht', stimme: 'm1', kopf: '**Unfallbericht** – Schreinerei Lentz', text: ['**Name:** Ben (Praktikant, 15 Jahre) · **Datum:** Dienstag, 10.15 Uhr · **Ort:** Werkstatt, Werkbank 2', '**Was ist passiert?** Ben hatte schon eine Stunde Bretter geschliffen. Nachdem er die Schleifmaschine ausgeschaltet hatte, wollte er sofort den Staub wegwischen. Dabei berührte er die Schleifscheibe, die sich noch drehte. Er verletzte sich am Zeigefinger.', '**Erste Hilfe:** Der Meister holte sofort den Erste-Hilfe-Kasten. Die Wunde **wurde** gereinigt und verbunden. Ben **wurde** danach zur Ärztin gebracht.', '**Was lernen wir daraus?** Warten, bis die Maschine **ganz** stillsteht. Staub nur mit einem Pinsel entfernen, nie mit der Hand.'] },
      ],
      woerter: [['der Unfallbericht', 'le rapport d’accident'], ['die Schreinerei', 'la menuiserie'], ['schleifen', 'poncer'], ['ausschalten', 'éteindre'], ['der Staub', 'la poussière'], ['berühren', 'toucher'], ['die Wunde', 'la plaie'], ['verbinden', 'faire un pansement']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Beantworte die W-Fragen zum Unfall.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [25, 75], zeilen: [['Wer?', '[Ben, Praktikant, 15 Jahre]'], ['Wann?', '[Dienstag, 10.15 Uhr]'], ['Wo?', '[in der Werkstatt, an Werkbank 2]'], ['Was?', '[Er berührte die Schleifscheibe und verletzte sich am Finger.]'], ['Warum?', '[Die Scheibe drehte sich noch.]']] },
        { art: 'ordnen', auftrag: 'Was passierte zuerst? Nummeriere.', stufe: 2, teile: ['Ben schliff eine Stunde lang Bretter.', 'Er schaltete die Maschine aus.', 'Er wollte den Staub wegwischen.', 'Er berührte die Scheibe.', 'Der Meister holte den Erste-Hilfe-Kasten.', 'Ben wurde zur Ärztin gebracht.'], ordnung: [2, 4, 0, 5, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Anweisungen einer Ärztin', wo: 'Arztpraxis', titel: 'Pause, Eis, Hochlegen',
      situation: 'Lina hat sich beim Basketball den Knöchel verstaucht. Die Ärztin erklärt ihr genau, was sie tun soll.',
      bild: ['aerztin:froh:erklaeren', 'lina:traurig'], sprecher: { Ärztin: 'w1', Lina: 'w2' },
      text: [
        ['Ärztin', 'Gut, Lina. Gebrochen ist zum Glück nichts. Es ist eine Verstauchung. Jetzt hör bitte genau zu.'],
        ['Ärztin', 'In den nächsten drei Tagen: Fuß schonen, also kein Sport und nicht viel laufen.'],
        ['Ärztin', 'Kühle den Knöchel mehrmals am Tag etwa fünfzehn Minuten. Leg das Eis nie direkt auf die Haut, sondern wickle es in ein Tuch.'],
        ['Ärztin', 'Der Verband soll fest sein, aber nicht zu fest. Wenn die Zehen kalt oder blau werden, mach ihn lockerer.'],
        ['Ärztin', 'Und leg den Fuß so oft wie möglich hoch, am besten höher als das Herz.'],
        ['Lina', 'Wann darf ich wieder Basketball spielen? Am Samstag ist ein Turnier.'],
        ['Ärztin', 'Am Samstag leider noch nicht. Komm in einer Woche zur Kontrolle. Wenn der Schmerz stärker wird, komm sofort.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht man bei einer Verstauchung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['kühlen', 'den Fuß hochlegen', 'sofort weiter Sport machen'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Notiere die Anweisungen der Ärztin.', stufe: 1, kopf: ['', 'Anweisung'], breiten: [28, 72], zeilen: [['Sport', '[drei Tage kein Sport, wenig laufen]'], ['Eis', '[mehrmals am Tag etwa 15 Minuten, nie direkt auf die Haut]'], ['Verband', '[fest, aber nicht zu fest]'], ['Fuß', '[hochlegen, höher als das Herz]'], ['Kontrolle', '[in einer Woche]']] },
        { art: 'fragen', auftrag: 'Wann soll Lina sofort wiederkommen?', stufe: 2, fragen: [{ f: '', l: 'Wenn der Schmerz stärker wird.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erzähl einer Person von einem kleinen Unfall (echt oder erfunden): Was war vorher passiert? Was hast du danach gemacht?', stufe: 3, karten: [
        { titel: 'Erzählen', text: ['Ich hatte gerade …, als …', 'Nachdem ich …, …', 'Bevor ich zum Arzt ging, …'] },
        { titel: 'Nachfragen', text: ['Was ist passiert?', 'Hat es wehgetan?', 'Was hat die Ärztin gesagt?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'nachdem und bevor', punkte: ['**Nachdem** er die Maschine ausgeschaltet **hatte**, **wollte** er den Staub wegwischen.', 'Was **zuerst** passiert: **Plusquamperfekt** (hatte / war + Partizip II)', 'Was **danach** passiert: **Präteritum**', '**bevor**: **Bevor** er **ging**, **räumte** er auf. (gleiche Zeitform)'] },
         { titel: 'Erste Hilfe bei Sportverletzungen: PECH', punkte: ['**P**ause: Bewegung stoppen', '**E**is: kühlen, nie direkt auf die Haut', '**C**ompression: Verband, nicht zu fest', '**H**ochlagern: höher als das Herz'] }],
        [{ art: 'tipp', titel: 'Einen Unfallbericht schreiben', text: '**Sachlich** und **genau**: Wer? Wann? Wo? Was? Warum? In der **richtigen Reihenfolge**. Keine Vermutungen und keine Schuldzuweisungen.' },
         { art: 'achtung', titel: 'Notfall', text: 'Bei schweren Verletzungen sofort **112** anrufen. Im Betrieb: jeden Unfall der verantwortlichen Person melden.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Plusquamperfekt.', stufe: 1, saetze: ['(ausschalten) Nachdem Ben die Maschine [ausgeschaltet hatte], wischte er den Staub weg.', '(fallen) Nachdem Lina [gefallen war], konnte sie nicht mehr laufen.', '(kühlen) Nachdem sie den Fuß [gekühlt hatte], ging es besser.', '(ankommen) Nachdem wir [angekommen waren], begann das Training.'] },
      { art: 'abschreiben', auftrag: 'Verbinde mit bevor oder nachdem.', stufe: 2, kopf: ['zwei Sätze', 'ein Satz'], saetze: [['Er zog die Handschuhe an. Dann begann er mit der Arbeit. (bevor)', 'Bevor er mit der Arbeit begann, zog er die Handschuhe an.'], ['Sie hatte sich verletzt. Dann ging sie zur Ärztin. (nachdem)', 'Nachdem sie sich verletzt hatte, ging sie zur Ärztin.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Unfallbericht über einen kleinen, erfundenen Unfall (beim Sport, in der Schule, im Praktikum). Beantworte die W-Fragen.', stufe: 2,
        anfaenge: ['Name / Datum / Ort: …', 'Was ist passiert? …', 'Nachdem …', 'Erste Hilfe: …', 'Was lernen wir daraus? …'], zeilen: 11,
        beispiel: 'Name: Sami. Datum: Montag, 14 Uhr. Ort: Turnhalle. Was ist passiert? Sami war über eine Bank gesprungen. Nachdem er gelandet war, knickte er mit dem Fuß um. Erste Hilfe: Der Fuß wurde sofort gekühlt und hochgelegt. Was lernen wir daraus? Vor dem Springen immer gut aufwärmen.' },
    ],
    check: ['Ich verstehe einen Unfallbericht.', 'Ich verstehe genaue Anweisungen einer Ärztin.', 'Ich berichte, was vorher passiert war.', 'Ich benutze nachdem und bevor richtig.', 'Ich schreibe einen sachlichen Unfallbericht.'],
  },
  // ================================================================ 6
  {
    thema: 'Jugendschutz · Gesetzessprache', titel: 'Was darf ich – und was nicht?', untertitel: 'Regeln zum Alkoholverkauf in drei Ländern, eine Pro-und-Kontra-Diskussion und Gesetzessprache entschlüsseln: Du verstehst, warum es Jugendschutz gibt.',
    ziel: { de: 'Ich verstehe Regeln zum Jugendschutz, entschlüssele Gesetzessprache und nehme Stellung.', fr: 'Je comprends les règles de protection de la jeunesse, je décode le langage juridique et je prends position.' },
    bild: ['noah:verwirrt:verschraenkt', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Gesetzessprache',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das in einfachen Worten? Verbinde.', stufe: 1, links: ['ist untersagt', 'ist gestattet', 'Minderjährige', 'alkoholische Getränke', 'ausschenken'], rechts: ['ist verboten', 'ist erlaubt', 'Personen unter 18 Jahren', 'Getränke mit Alkohol', 'Getränke im Glas verkaufen'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Infoblatt zum Jugendschutz', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Infoblatt Prävention (vereinfacht – Gesetze können sich ändern)', titel: 'Alkohol: Ab wann ist er erlaubt?',
      absaetze: [
        'Alkohol ist für Jugendliche besonders gefährlich: Der Körper und das Gehirn wachsen noch. Schon kleine Mengen wirken stärker als bei Erwachsenen. Darum gibt es in vielen Ländern Gesetze zum **Jugendschutz**.',
        '**Luxemburg:** Es ist **untersagt**, alkoholische Getränke an Jugendliche **unter 16 Jahren** zu verkaufen oder auszuschenken.',
        '**Deutschland:** Bier, Wein und Sekt **dürfen** an Jugendliche ab 16 Jahren verkauft werden. Schnaps und andere starke Getränke sind erst **ab 18** erlaubt.',
        '**Frankreich:** Hier ist der Verkauf von Alkohol an **alle Minderjährigen** verboten – also an alle unter 18.',
        'Verkäuferinnen und Verkäufer dürfen nach einem **Ausweis** fragen. Wer Alkohol an zu junge Menschen verkauft, kann bestraft werden.',
      ],
      woerter: [['der Jugendschutz', 'la protection de la jeunesse'], ['die Menge', 'la quantité'], ['wirken', 'faire effet'], ['untersagt', 'interdit'], ['ausschenken', 'servir (à boire)'], ['minderjährig', 'mineur'], ['der Ausweis', 'la pièce d’identité'], ['bestrafen', 'punir']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche die drei Länder.', stufe: 1, kopf: ['Land', 'Bier und Wein ab …', 'starker Alkohol ab …'], zeilen: [['Luxemburg', '[16 Jahren]', '[16 Jahren]'], ['Deutschland', '[16 Jahren]', '[18 Jahren]'], ['Frankreich', '[18 Jahren]', '[18 Jahren]']] },
        { art: 'fragen', auftrag: 'Warum ist Alkohol für Jugendliche besonders gefährlich?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil Körper und Gehirn noch wachsen und schon kleine Mengen stärker wirken.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Pro-und-Kontra-Diskussion', wo: 'Klassenrat · Diskussion', titel: 'Alkohol erst ab 18?',
      situation: 'Im Klassenrat diskutiert die Klasse: Sollte man Alkohol überall erst ab 18 verkaufen dürfen? Frau Sommer leitet das Gespräch.',
      bild: ['lehrerin:ruhig:erklaeren', 'noah:froh:erklaeren'], sprecher: { 'Frau Sommer': 'w1', Noah: 'm1', Chloe: 'w2', Amira: 'w3' },
      text: [
        ['Frau Sommer', 'Unsere Frage heute: Sollte man Alkohol überall erst ab achtzehn verkaufen dürfen? Noah, du fängst an.'],
        ['Noah', 'Ich bin dafür. Das Gehirn entwickelt sich noch bis über zwanzig. Und eine klare Regel ist einfacher: achtzehn, Punkt. So wie in Frankreich.'],
        ['Chloe', 'Ich sehe das anders. Ein Verbot allein hilft nicht. Wer trinken will, bekommt den Alkohol von Älteren. Wichtiger ist, dass man gut informiert ist.'],
        ['Amira', 'Darf ich etwas ergänzen? Viele Jugendliche trinken gar keinen Alkohol. Das finde ich wichtig: Nein sagen ist völlig normal.'],
        ['Noah', 'Da gebe ich dir recht. Aber ein Gesetz schützt auch vor Gruppendruck. Man kann einfach sagen: Ich darf noch nicht.'],
        ['Chloe', 'Okay, das ist ein gutes Argument. Trotzdem finde ich: Aufklärung in der Schule ist genauso wichtig wie ein Gesetz.'],
        ['Frau Sommer', 'Dann halten wir fest: Gesetz und Aufklärung gehören zusammen. Und wer Hilfe braucht, kann jederzeit mit uns reden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Stellung nehmen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sagen, was man zu einer Meinung denkt, und es begründen', 'aufstehen und zur Tafel gehen'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer sagt das?', stufe: 1, personen: ['Noah', 'Chloe', 'Amira'], saetze: [['Ich bin für die Regel „ab 18“.', 'Noah'], ['Ein Verbot allein hilft nicht.', 'Chloe'], ['Nein sagen ist völlig normal.', 'Amira'], ['Ein Gesetz schützt vor Gruppendruck.', 'Noah'], ['Aufklärung ist genauso wichtig wie ein Gesetz.', 'Chloe']] },
        { art: 'fragen', auftrag: 'Welches Ergebnis hält Frau Sommer fest?', stufe: 2, fragen: [{ f: '', l: 'Gesetz und Aufklärung gehören zusammen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Diskutiert eine Regel zum Jugendschutz: Sollen Jugendliche unter 16 allein in die Disko dürfen? Nehmt Stellung zu den Argumenten der anderen.', stufe: 3, karten: [
        { titel: 'Stellung nehmen', text: ['Da gebe ich dir recht, aber …', 'Das ist ein gutes Argument. Trotzdem …', 'Ich sehe das anders, weil …'] },
        { titel: 'Ein Problem erklären', text: ['Das Problem ist, dass …', 'Das ist gefährlich, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gesetzessprache entschlüsseln', tabelle: { kopf: ['Gesetzessprache', 'einfach gesagt'], zeilen: [['Es ist **untersagt**, …', 'Es ist **verboten**, …'], ['Es ist **gestattet**, …', 'Es ist **erlaubt**, …'], ['**Minderjährige**', 'Personen unter 18'], ['… **darf nicht** verkauft **werden**.', 'Man darf … nicht verkaufen.'], ['**Wer** gegen … verstößt, **wird** bestraft.', 'Wer die Regel nicht beachtet, bekommt eine Strafe.']] } }],
        [{ titel: 'Passiv mit Modalverb (Wiederholung)', punkte: ['Alkohol **darf** nicht an Kinder verkauft **werden**.', 'Der Ausweis **kann** kontrolliert **werden**.', 'Die Regeln **müssen** beachtet **werden**.', 'Modalverb an Position 2, **Partizip II + werden** am Ende.'] },
         { art: 'achtung', titel: 'Hilfe', text: 'Du machst dir Sorgen wegen Alkohol – bei dir oder bei jemand anderem? Sprich mit einer Vertrauensperson. Kinder- und Jugendtelefon: **116 111** (gratis, anonym).' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Übersetze in einfache Sprache.', stufe: 2, kopf: ['Gesetzessprache', 'einfache Sprache'], saetze: [['Der Ausschank an Minderjährige ist untersagt.', 'Man darf Personen unter 18 keine Getränke mit Alkohol geben.'], ['Das Betreten der Baustelle ist nicht gestattet.', 'Man darf nicht auf die Baustelle gehen.'], ['Zuwiderhandlungen werden bestraft.', 'Wer die Regel nicht beachtet, bekommt eine Strafe.']] },
      { art: 'luecken', auftrag: 'Ergänze das Passiv mit Modalverb.', stufe: 1, saetze: ['(verkaufen) Alkohol darf nicht an 14-Jährige [verkauft werden].', '(kontrollieren) Der Ausweis kann an der Kasse [kontrolliert werden].', '(beachten) Die Regeln müssen von allen [beachtet werden].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib deine Meinung: Sollte man Alkohol überall erst ab 18 verkaufen? Nimm Stellung zu einem Argument aus der Diskussion.', stufe: 2,
        anfaenge: ['In der Diskussion ging es um …', 'Noah / Chloe meint, dass …', 'Da gebe ich … recht / Das sehe ich anders, weil …', 'Meiner Meinung nach …', 'Wichtig finde ich außerdem …'], zeilen: 11,
        beispiel: 'In der Diskussion ging es um die Frage, ob man Alkohol überall erst ab 18 verkaufen sollte. Chloe meint, dass ein Verbot allein nicht hilft. Da gebe ich ihr recht, weil Aufklärung sehr wichtig ist. Meiner Meinung nach braucht man aber auch klare Regeln, denn sie schützen vor Gruppendruck. Wichtig finde ich außerdem: Nein sagen ist völlig normal.' },
    ],
    check: ['Ich verstehe Regeln zum Jugendschutz.', 'Ich entschlüssele Gesetzessprache.', 'Ich verstehe eine Diskussion und nehme Stellung.', 'Ich erkläre, warum etwas ein Problem ist.', 'Ich benutze das Passiv mit Modalverb.'],
  },
  // ================================================================ 7
  {
    thema: 'Arbeitsschutz · ein Problem erklären', titel: 'Meine Rechte im Ferienjob', untertitel: 'Wie lange dürfen Jugendliche arbeiten? Ein Infotext zum Jugendarbeitsschutz, ein Telefonat über ein Problem, Notizen – und ein Blick auf Kinderarbeit in der Welt.',
    ziel: { de: 'Ich kenne wichtige Rechte junger Arbeitnehmer, mache Notizen und erkläre ein Problem.', fr: 'Je connais des droits importants des jeunes travailleurs, je prends des notes et j’explique un problème.' },
    bild: ['sami:muede:stehen', 'chloe:besorgt:handy'],
    start: {
      was: 'Rund um den Job',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['der Ferienjob', 'der Arbeitsvertrag', 'die Pause', 'die Nachtarbeit', 'die Ausbeutung'], rechts: ['Arbeit in den Schulferien', 'ein Papier mit den Regeln für die Arbeit', 'Zeit zum Ausruhen bei der Arbeit', 'Arbeit in der Nacht', 'jemand muss zu viel arbeiten und bekommt zu wenig'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Infotext zum Jugendarbeitsschutz', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Infoblatt für Ferienjobs (vereinfacht; genaue Regeln bei der Arbeitsinspektion ITM)', titel: 'Jung und im Job: Das musst du wissen',
      absaetze: [
        'In Luxemburg darf man ab **15 Jahren** einen Ferienjob machen. Dafür braucht man einen **schriftlichen Vertrag**. Er regelt, wie lange man arbeitet und wie viel man verdient.',
        'Für Jugendliche unter 18 gelten **besondere Schutzregeln**: Sie dürfen höchstens **8 Stunden am Tag** und **40 Stunden in der Woche** arbeiten.',
        '**Pausen** sind Pflicht: Wer mehr als viereinhalb Stunden arbeitet, bekommt mindestens **30 Minuten** Pause.',
        '**Nachtarbeit** ist für Jugendliche grundsätzlich verboten. Gefährliche Arbeiten, zum Beispiel mit giftigen Stoffen oder an gefährlichen Maschinen, sind ebenfalls nicht erlaubt.',
        'Wenn etwas nicht stimmt, kann man sich beraten lassen – zum Beispiel bei der **Arbeitsinspektion (ITM)** oder bei einer Gewerkschaft. Niemand muss Angst haben, nach seinen Rechten zu fragen.',
      ],
      woerter: [['der Vertrag', 'le contrat'], ['regeln', 'régler'], ['verdienen', 'gagner (de l’argent)'], ['die Schutzregel', 'la règle de protection'], ['höchstens', 'au maximum'], ['die Pflicht', 'l’obligation'], ['giftig', 'toxique'], ['die Gewerkschaft', 'le syndicat']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Die wichtigsten Regeln für Jugendliche unter 18.', stufe: 1, kopf: ['Thema', 'Regel'], breiten: [30, 70], zeilen: [['Alter für den Ferienjob', '[ab 15 Jahren]'], ['Vertrag', '[schriftlich]'], ['Arbeitszeit', '[höchstens 8 Stunden am Tag, 40 in der Woche]'], ['Pause', '[mindestens 30 Minuten bei mehr als 4,5 Stunden]'], ['Nachtarbeit', '[grundsätzlich verboten]']] },
        { art: 'fragen', auftrag: 'Wo kann man sich beraten lassen?', stufe: 2, fragen: [{ f: '', l: 'bei der Arbeitsinspektion (ITM) oder bei einer Gewerkschaft' }] },
      ],
    },
    hoeren: {
      was: 'Ein Telefonat über ein Problem', wo: 'Telefonat', titel: 'Das ist doch nicht erlaubt!',
      situation: 'Sami hat einen Ferienjob in einem Eiscafé. Er ruft Chloe an und erzählt von einem Problem. Chloe macht Notizen.',
      bild: ['sami:muede:handy', 'chloe:besorgt:handy'], sprecher: { Sami: 'm3', Chloe: 'w2' },
      text: [
        ['Sami', 'Hey Chloe, hast du kurz Zeit? Ich brauche einen Rat.'],
        ['Chloe', 'Klar. Was ist los?'],
        ['Sami', 'Ich arbeite doch im Eiscafé am See. Gestern habe ich von zehn Uhr morgens bis acht Uhr abends gearbeitet. Fast ohne Pause.'],
        ['Chloe', 'Zehn Stunden? Moment, ich schreibe mit. Du bist doch erst sechzehn, oder?'],
        ['Sami', 'Ja. Und einen Vertrag habe ich auch noch nicht bekommen. Der Chef sagt, das machen wir später.'],
        ['Chloe', 'Das ist ein Problem. Für Jugendliche sind höchstens acht Stunden am Tag erlaubt. Und ohne schriftlichen Vertrag bist du nicht gut geschützt.'],
        ['Sami', 'Aber ich will den Job nicht verlieren.'],
        ['Chloe', 'Verstehe ich. Sprich zuerst ruhig mit dem Chef und bitte um den Vertrag. Wenn sich nichts ändert, kannst du dich bei der Arbeitsinspektion beraten lassen. Und erzähl es einer erwachsenen Vertrauensperson.'],
        ['Sami', 'Okay. Danke, dass du mir zuhörst.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist bei einem Ferienjob wichtig? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein schriftlicher Vertrag', 'Pausen', 'ohne Pause arbeiten'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Mach Notizen wie Chloe.', stufe: 1, kopf: ['Notiz', ''], breiten: [32, 68], zeilen: [['Wo arbeitet Sami?', '[im Eiscafé am See]'], ['Arbeitszeit gestern', '[10 bis 20 Uhr = 10 Stunden, fast ohne Pause]'], ['Alter', '[16]'], ['Vertrag', '[noch keiner]'], ['Chloes Rat', '[mit dem Chef sprechen; Arbeitsinspektion; Vertrauensperson]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt das Gespräch zwischen Sami und dem Chef. Sami erklärt ruhig, warum es ein Problem gibt.', stufe: 3, karten: [
        { titel: 'Sami', text: ['Ich möchte gern über … sprechen.', 'Das Problem ist, dass …', 'Für Jugendliche gilt …', 'Könnte ich bitte …?'] },
        { titel: 'Chef / Chefin', text: ['Was ist denn los?', 'Ach so, das wusste ich nicht.', 'Gut, dann machen wir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ein Problem erklären', punkte: ['**Das Problem ist, dass** ich zu lange arbeite.', '**Es ist nicht erlaubt, dass** …', '**Für** Jugendliche **gilt**: …', '**Das ist schwierig, weil** …', '**Könnten Sie bitte** …?'] },
         { titel: 'Adjektive (Wiederholung)', punkte: ['ein **schriftlicher** Vertrag (m)', 'eine **kurze** Pause (f)', 'ein **gefährliches** Gerät (n)', '**gefährliche** Arbeiten (Plural ohne Artikel)'] }],
        [{ art: 'tipp', titel: 'Kinderarbeit in der Welt', text: 'Weltweit müssen nach Schätzungen der Vereinten Nationen **weit über 100 Millionen Kinder** arbeiten – oft gefährlich und ohne Schule. Fairer Handel mit Siegeln will das ändern.' },
         { art: 'achtung', titel: 'Deine Rechte', text: 'Niemand darf dich zwingen, zu lange oder gefährlich zu arbeiten. Nach deinen Rechten zu fragen ist **kein** Problem, sondern **klug**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Adjektivendung.', stufe: 1, saetze: ['Ich brauche einen schriftlich[en] Vertrag.', 'Gefährlich[e] Arbeiten sind verboten.', 'Er ist ein jung[er] Arbeitnehmer.', 'Nach viereinhalb Stunden gibt es eine kurz[e] Pause.'] },
      { art: 'abschreiben', auftrag: 'Erkläre das Problem höflich.', stufe: 2, kopf: ['Situation', 'Satz'], saetze: [['Du arbeitest 10 Stunden am Tag.', 'Das Problem ist, dass ich zehn Stunden arbeite. Für Jugendliche sind höchstens acht erlaubt.'], ['Du hast keinen Vertrag.', 'Könnten Sie mir bitte einen schriftlichen Vertrag geben?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was denkst du: Sind Ferienjobs für Jugendliche eine gute Idee? Schreib deine Meinung mit Vor- und Nachteilen.', stufe: 2,
        anfaenge: ['Viele Jugendliche machen …', 'Ein Vorteil ist, dass …', 'Ein Nachteil kann sein, dass …', 'Wichtig ist, dass …', 'Meine Meinung: …'], zeilen: 10,
        beispiel: 'Viele Jugendliche machen in den Sommerferien einen Ferienjob. Ein Vorteil ist, dass man eigenes Geld verdient und die Arbeitswelt kennenlernt. Ein Nachteil kann sein, dass man weniger Ferien hat. Wichtig ist, dass man einen schriftlichen Vertrag hat und die Arbeitszeiten stimmen. Meine Meinung: Ein kurzer Ferienjob ist eine gute Erfahrung.' },
    ],
    check: ['Ich verstehe einen Infotext zum Jugendarbeitsschutz.', 'Ich verstehe ein Telefonat über ein Problem und mache Notizen.', 'Ich erkläre, warum etwas ein Problem ist.', 'Ich benutze Adjektive mit der richtigen Endung.', 'Ich schreibe meine Meinung zu einem aktuellen Thema.'],
  },
  // ================================================================ 8
  {
    thema: 'Präsentieren · Rückblick', titel: 'Bühne frei für dich!', untertitel: 'Ein Radio-Wettbewerb, Tipps für gute Präsentationen und deine eigene Präsentation: Du zeigst, was du in den Modulen 6 bis 9 gelernt hast.',
    ziel: { de: 'Ich verstehe genaue Teilnahmeregeln, bereite eine Präsentation vor und halte sie.', fr: 'Je comprends des règles de participation précises, je prépare une présentation et je la fais.' },
    bild: ['lina:froh:stehen-zeigen', 'noah:froh'],
    start: {
      was: 'Eine Präsentation vorbereiten',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Wie bereitest du eine Präsentation vor? Nummeriere.', stufe: 1, teile: ['ein Thema wählen', 'Informationen sammeln', 'eine Gliederung machen', 'Stichwortkarten schreiben', 'laut üben', 'präsentieren'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Tipps für Präsentationen', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Lerntipps', titel: 'So wird deine Präsentation gut',
      absaetze: [
        '**Der Anfang** ist wichtig: Beginne mit einer Frage, einem Bild oder einer überraschenden Zahl. Dann sag kurz, worüber du sprichst.',
        '**Die Gliederung:** höchstens drei bis vier Teile. Zeig sie am Anfang, dann können alle besser folgen.',
        '**Stichwortkarten** statt ganzer Sätze: Schreib nur wichtige Wörter in großer Schrift. So schaust du das Publikum an und liest nicht ab.',
        '**Die Folien:** wenig Text, große Bilder, gut lesbare Schrift. Eine Folie pro Gedanke.',
        '**Sprechen:** langsam, laut und mit Pausen. Nervosität ist normal – atme vor dem Start tief durch.',
        '**Der Schluss:** Fasse das Wichtigste in einem Satz zusammen und frag: „Habt ihr Fragen?“',
      ],
      woerter: [['die Gliederung', 'le plan'], ['folgen', 'suivre'], ['die Stichwortkarte', 'la fiche aide-mémoire'], ['das Publikum', 'le public'], ['ablesen', 'lire un texte mot à mot'], ['die Folie', 'la diapositive'], ['die Nervosität', 'la nervosité'], ['zusammenfassen', 'résumer']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Am Anfang kann man mit einer Frage beginnen.', true], ['Auf Stichwortkarten schreibt man ganze Sätze.', false], ['Auf Folien soll möglichst viel Text stehen.', false], ['Nervosität ist normal.', true]] },
        { art: 'fragen', auftrag: 'Welcher Tipp ist für dich am wichtigsten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Stichwortkarten, weil ich sonst alles ablese.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Radio-Wettbewerb', wo: 'Radio · Jugendsendung', titel: 'Gewinne einen Tag im Radiostudio!',
      situation: 'Im Radio wird ein Wettbewerb angekündigt. Lina will mitmachen. Sie hört genau zu und spricht danach mit Noah.',
      bild: ['lina:aufgeregt:handy', 'noah:froh:handy'], sprecher: { Moderatorin: 'w1', Lina: 'w2', Noah: 'm1' },
      text: [
        ['Moderatorin', 'Achtung, Wettbewerb! Ihr seid zwischen vierzehn und achtzehn und wolltet schon immer wissen, wie Radio funktioniert? Dann gewinnt einen Tag bei uns im Studio!'],
        ['Moderatorin', 'So geht’s: Nehmt eine Sprachnachricht von höchstens einer Minute auf. Stellt euch vor und sagt, welchen Beruf ihr später machen wollt – und warum.'],
        ['Moderatorin', 'Schickt die Nachricht bis Freitag um achtzehn Uhr über das Formular auf unserer Internetseite. Wichtig: Ihr braucht die Erlaubnis eurer Eltern oder einer anderen erziehungsberechtigten Person.'],
        ['Moderatorin', 'Die drei besten Nachrichten spielen wir nächste Woche im Radio. Viel Glück!'],
        ['Lina', 'Noah, hast du das gehört? Da mache ich mit!'],
        ['Noah', 'Cool! Aber denk daran: höchstens eine Minute. Mach dir Stichwortkarten, sonst redest du zu lange.'],
        ['Lina', 'Gute Idee. Nachdem ich die Karten geschrieben habe, übe ich mit dir, okay?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was muss man bei einem Wettbewerb genau wissen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wer mitmachen darf', 'was man machen muss', 'bis wann', 'wie das Wetter wird'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Notiere die Teilnahmeregeln.', stufe: 1, kopf: ['', 'Regel'], breiten: [30, 70], zeilen: [['Wer?', '[Jugendliche von 14 bis 18]'], ['Was?', '[Sprachnachricht, höchstens 1 Minute: sich vorstellen, Berufswunsch und warum]'], ['Bis wann?', '[Freitag, 18 Uhr]'], ['Was braucht man noch?', '[die Erlaubnis der Eltern oder einer erziehungsberechtigten Person]'], ['Preis', '[ein Tag im Radiostudio]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Nimm deine eigene Ein-Minuten-Vorstellung auf oder trag sie vor: Wer bist du, was willst du werden und warum? (Du darfst auch eine ausgedachte Person vorstellen.)', stufe: 3, karten: [
        { titel: 'Aufbau', text: ['Hallo, ich heiße … und bin …', 'Später möchte ich … werden, weil …', 'Ich habe schon …', 'Mein Ziel: …'] },
        { titel: 'Tipps', text: ['höchstens 1 Minute', 'Stichwortkarten', 'langsam und deutlich'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Redemittel für Präsentationen', punkte: ['**Einstieg:** Wusstet ihr, dass …? · Heute stelle ich euch … vor.', '**Gliederung:** Zuerst … dann … zum Schluss …', '**Überleitung:** Kommen wir nun zu … · Ein weiterer Punkt ist …', '**Schluss:** Zusammenfassend kann man sagen, … · Habt ihr Fragen?'] },
         { titel: 'Rückblick Grammatik Modul 9', punkte: ['**Adjektive:** ein **spannender** Beruf, mit einem **guten** Helm', '**Passiv:** Der Gurt **muss** geschlossen **werden**.', '**Plusquamperfekt:** **Nachdem** ich geübt **hatte**, war ich sicher.'] }],
        [{ art: 'tipp', titel: 'Feedback geben', text: 'Erst etwas **Positives**, dann **ein** Tipp: „Dein Einstieg war super! Nächstes Mal könntest du langsamer sprechen.“' },
         { art: 'achtung', titel: 'Persönliche Daten', text: 'Bei Wettbewerben und im Internet: Gib nur so viel von dir preis wie nötig. **Adresse** und **Telefonnummer** gehören nicht in eine öffentliche Nachricht.' }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Welches Redemittel passt? Verbinde.', stufe: 1, links: ['Einstieg', 'Gliederung', 'Überleitung', 'Schluss', 'Feedback'], rechts: ['Wusstet ihr, dass …?', 'Zuerst …, dann …, zum Schluss …', 'Kommen wir nun zu …', 'Zusammenfassend kann man sagen …', 'Dein Einstieg war super!'], ordnung: [2, 0, 4, 1, 3] },
      { art: 'tabelle', auftrag: 'Plane deine Präsentation über einen Beruf.', stufe: 2, kopf: ['Teil', 'Stichwörter'], breiten: [32, 68], zeilen: [['Einstieg', ''], ['Teil 1: Aufgaben', ''], ['Teil 2: Voraussetzungen', ''], ['Teil 3: meine Meinung', ''], ['Schluss', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib deine Stichwortkarten für eine Präsentation (2 bis 3 Minuten) über einen Beruf deiner Wahl. Benutze Redemittel.', stufe: 2,
        anfaenge: ['Karte 1 – Einstieg: …', 'Karte 2 – Aufgaben: …', 'Karte 3 – Voraussetzungen: …', 'Karte 4 – Meine Meinung: …', 'Karte 5 – Schluss: …'], zeilen: 12,
        beispiel: 'Karte 1 – Einstieg: Wusstet ihr, dass ein Windrad 200 Meter hoch sein kann? Karte 2 – Aufgaben: Elektronikerin: Anlagen einbauen, prüfen, reparieren. Karte 3 – Voraussetzungen: Mathe, genaues Arbeiten, keine Höhenangst. Karte 4 – Meine Meinung: spannend und wichtig für das Klima. Karte 5 – Schluss: Zusammenfassend … Habt ihr Fragen?' },
    ],
    check: ['Ich verstehe genaue Teilnahmeregeln.', 'Ich kenne Tipps für gute Präsentationen.', 'Ich plane eine Präsentation mit Gliederung.', 'Ich benutze Redemittel für Einstieg, Überleitung und Schluss.', 'Ich halte eine kurze Präsentation.'],
  },
]
