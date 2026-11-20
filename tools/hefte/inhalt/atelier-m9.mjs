// Atelier · Modul 9 (5P) „Meine Stärken – mein Weg“ – Enseignement pratique, Voie de préparation.
// Abschluss der Atelier-Module: Kompetenzen erkennen (Stärken-Netz), Portfolio, Berufsfelder rund ums Atelier (CCP/DAP, Stand 2026),
// Praktikum vorbereiten (Krankmeldung am Telefon), Werkstück präsentieren, Meisterstück mit Projektvertrag.
// Personen und Betriebe ausgedacht; persönliche Angaben nur freiwillig.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { staerkenNetz } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 9, {
  titel: 'Meine Stärken – mein Weg',
  titelFr: 'Mes points forts – mon chemin',
  unter: 'Was kann ich schon? Stärken erkennen, ein Portfolio anlegen, Berufe rund ums Atelier entdecken, ein Praktikum vorbereiten und ein eigenes Meisterstück bauen und vorstellen.',
  unterFr: 'Points forts, portfolio, métiers de l’atelier, préparer un stage, présenter son chef-d’œuvre.',
  farbe: '#b8641e',
  deckbild: ['sami:stolz:stehen', 'lea:froh:blatt', 'yusuf:froh:stehen-zeigen'],
  blasen: [{ t: 'Das kann ich!', x: 8, y: 104 }, { t: 'Mein Portfolio', x: 118, y: 92 }, { t: 'Meisterstück', x: 172, y: 150 }],
  aussprache: { '\\bCCP\\b': 'Ze Ze Pe', '\\bDAP\\b': 'De A Pe' },
  themen: [
    { titel: { de: 'Stärken und Berufe', fr: 'Points forts et métiers' }, icon: 'star', lektionen: 3 },
    { titel: { de: 'Mein Weg', fr: 'Mon chemin' }, icon: 'route', lektionen: 3 },
  ],
})

const WEG = '#b8641e', STOLZ = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Kompetenzen erkennen', titel: 'Was kann ich schon?', untertitel: 'In acht Modulen hast du viel gelernt: Werkzeuge, Maschinen, planen, im Team arbeiten. Jetzt schaust du zurück und entdeckst deine Stärken – und was du noch üben möchtest.',
    ziel: { de: 'Ich schätze meine Kompetenzen ein und nenne meine Stärken.', fr: 'J’évalue mes compétences et je nomme mes points forts.' },
    bild: ['sami:verlegen:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Rückblick',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was hast du im Atelier gebaut, gekocht, gepflanzt oder genäht? Sammle alles.', stufe: 1, mitte: 'Das habe ich gemacht', aeste: ['Schlüsselanhänger', { l: 'Crêpes' }, { l: 'Handyständer' }, { l: '' }, { l: '' }, { l: '' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext', titel: 'Vier Arten von Kompetenzen',
      absaetze: [
        'Eine **Kompetenz** ist etwas, das du **kannst** – nicht nur weißt. Betriebe achten auf vier Arten von Kompetenzen.',
        '**Fachkompetenz:** Du kannst mit Werkzeugen, Maschinen und Material umgehen. Zum Beispiel: sägen, bohren, säen, einen Knopf annähen.',
        '**Methodenkompetenz:** Du kannst eine Arbeit planen und eine Anleitung lesen. Du weißt, wie man Fehler sucht und Qualität prüft.',
        '**Sozialkompetenz:** Du kannst im Team arbeiten, klar reden, Feedback geben und Konflikte lösen.',
        '**Selbstkompetenz:** Du bist pünktlich und zuverlässig. Du hältst durch, auch wenn etwas nicht sofort klappt. Du übernimmst Verantwortung für deinen Platz und deine Sicherheit.',
        'Niemand ist überall gleich stark. Das ist normal. Wichtig ist, dass du deine **Stärken kennst** – und weißt, woran du **arbeiten** willst. Das hilft bei der Berufswahl und im Bewerbungsgespräch.',
      ],
      woerter: [['die Kompetenz', 'la compétence'], ['die Stärke', 'le point fort'], ['zuverlässig', 'fiable'], ['pünktlich', 'ponctuel'], ['durchhalten', 'persévérer'], ['die Verantwortung', 'la responsabilité'], ['die Berufswahl', 'le choix d’un métier'], ['das Bewerbungsgespräch', 'l’entretien d’embauche']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Kompetenz ist das? Kreuze an.', stufe: 2, kopf: ['', 'Fach', 'Methode', 'Sozial', 'Selbst'], breiten: [48, 13, 13, 13, 13], zeilen: [['Ich bohre ein Loch genau an der richtigen Stelle.', '[x]', '', '', ''], ['Ich schreibe einen Arbeitsplan.', '', '[x]', '', ''], ['Ich helfe einem Mitschüler, ohne es selbst zu machen.', '', '', '[x]', ''], ['Ich komme jeden Tag pünktlich.', '', '', '', '[x]'], ['Ich finde heraus, warum alle Teile zu kurz sind.', '', '[x]', '', ''], ['Ich mache weiter, obwohl der erste Versuch schiefging.', '', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Einzelgespräch', titel: 'Ich kann doch nichts',
      situation: 'Sami soll seine Stärken aufschreiben. Er sagt, er hat keine. Herr Steffen spricht mit ihm.',
      bild: ['sami:verlegen:stehen', 'lehrer:froh:erklaeren'], sprecher: { Sami: 'm2', 'Herr Steffen': 'm1' },
      text: [
        ['Sami', 'Ich weiß nicht, was ich schreiben soll. Ich kann eigentlich nichts besonders gut.'],
        ['Herr Steffen', 'Darf ich dir sagen, was ich gesehen habe?'],
        ['Sami', 'Okay.'],
        ['Herr Steffen', 'Beim Holzlager hast du als Erster gemerkt, dass wir die Sägeschnitte vergessen hatten. Das ist genaues Rechnen und Mitdenken.'],
        ['Sami', 'Das war doch nur eine Kleinigkeit.'],
        ['Herr Steffen', 'Für einen Betrieb ist das keine Kleinigkeit. Und als Finn mit dem Akkuschrauber nicht weiterkam, hast du ihm geholfen – ohne es für ihn zu machen. Das ist Sozialkompetenz.'],
        ['Sami', 'Stimmt. Und ich war nie zu spät im Atelier.'],
        ['Herr Steffen', 'Siehst du. Zuverlässig. Drei Stärken in einer Minute. Und was möchtest du noch üben?'],
        ['Sami', 'Präsentieren. Wenn alle mich anschauen, werde ich rot.'],
        ['Herr Steffen', 'Dann ist das dein Ziel für die nächsten Wochen. Schreib beides auf: deine Stärken und dein Ziel.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Kleinigkeit? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas Kleines, nicht Wichtiges', 'ein kleines Werkzeug'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Stärken entdeckt Sami? Welche Kompetenz ist das?', stufe: 2, kopf: ['Was hat Sami gemacht?', 'Stärke / Kompetenz'], breiten: [60, 40], zeilen: [['[die vergessenen Sägeschnitte bemerkt]', '[genau rechnen, mitdenken – Methodenkompetenz]'], ['[Finn beim Akkuschrauber geholfen, ohne es für ihn zu machen]', '[helfen – Sozialkompetenz]'], ['[nie zu spät im Atelier]', '[zuverlässig – Selbstkompetenz]'], ['Was will Sami üben?', '[präsentieren]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Sagt euch zu zweit gegenseitig eine Stärke, die ihr beim anderen im Atelier gesehen habt. Nennt ein Beispiel.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir ist aufgefallen, dass du …', 'Zum Beispiel, als du …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vier Kompetenzen', punkte: ['**Fach**: Werkzeuge, Maschinen, Material', '**Methode**: planen, Anleitung, Fehler suchen', '**Sozial**: Team, reden, Feedback', '**Selbst**: pünktlich, zuverlässig, durchhalten'] },
         { titel: 'Stärken finden', punkte: ['an **konkrete Situationen** denken', 'andere **fragen**', 'auch **kleine Dinge** zählen', 'ein **Ziel** zum Üben wählen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Mein Stärken-Netz: Mach auf jeder Linie einen Punkt (1 = übe ich noch, 4 = kann ich sehr gut). Verbinde die Punkte. Dann schreibe deine größte Stärke und dein Übungsziel auf.', stufe: 2, html: '<div class="voll">' + staerkenNetz() + '</div>', liste: [['Meine größte Stärke:', 'Individuell'], ['Mein Übungsziel:', 'Individuell']], spalten: 1 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe über eine Situation im Atelier, in der du stolz auf dich warst. Welche Kompetenz hast du gezeigt?', stufe: 2,
        anfaenge: ['Ich war stolz, als …', 'Ich habe gezeigt, dass ich …', 'Das ist eine …kompetenz.', 'Das kann mir später helfen, weil …'], zeilen: 6,
        beispiel: 'Ich war stolz, als mein Handyständer bei der Kontrolle fast keine Fehler hatte. Ich habe gezeigt, dass ich genau arbeiten und eine Zeichnung lesen kann. Das ist Fach- und Methodenkompetenz. Das kann mir später helfen, weil man in vielen Berufen nach Plan arbeitet.' },
    ],
    check: ['Ich kenne vier Arten von Kompetenzen.', 'Ich nenne meine Stärken mit Beispielen.', 'Ich habe ein Übungsziel.'],
  },
  // ================================================================ 2
  {
    thema: 'Mein Portfolio', titel: 'Mein Portfolio', untertitel: 'Ein Portfolio ist eine Mappe mit deinen besten Arbeiten. Es zeigt, was du kannst – viel besser als jedes Zeugnis. Du lernst, was hineinkommt, und legst dein eigenes an.',
    ziel: { de: 'Ich lege ein Portfolio mit meinen besten Arbeiten an.', fr: 'Je constitue un portfolio avec mes meilleurs travaux.' },
    bild: ['lea:froh:blatt', 'chef:froh:stehen'],
    start: {
      was: 'Überlege',
      aufgaben: [
        { art: 'mc', auftrag: 'Ein Betrieb will wissen, was du kannst. Was überzeugt am meisten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Fotos von Werkstücken, die ich selbst gebaut habe, mit einer Beschreibung', 'nur der Satz „Ich bin handwerklich begabt.“'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Anleitung', titel: 'So legst du dein Portfolio an',
      material: ['eine Mappe oder ein Ordner (oder ein Ordner auf dem Tablet)', 'Fotos deiner Werkstücke', 'deine Werkstatt-Berichte'],
      schritte: [
        { icon: 'camera', text: '**Fotos machen:** Fotografiere deine Werkstücke – am besten vor einem ruhigen Hintergrund und gut beleuchtet. Auch **Zwischenschritte** sind interessant.' },
        { icon: 'star', text: '**Auswählen:** Nimm deine **besten** Arbeiten, nicht alle. Fünf bis acht Stück reichen.' },
        { icon: 'file-description', text: '**Beschreiben:** Schreibe zu jedem Werkstück einen kurzen **Steckbrief**: Was ist es? Welche Materialien und Werkzeuge? Was war schwierig? Was habe ich gelernt?' },
        { icon: 'certificate', text: '**Nachweise sammeln:** Lege deinen Maschinen-Pass, Bescheinigungen und Rückmeldungen dazu.' },
        { icon: 'sort-ascending', text: '**Ordnen:** Mit einem Deckblatt und einem Inhaltsverzeichnis. Das Neueste kommt nach vorn.' },
      ],
      danach: ['Dein Portfolio **wächst** mit dir. Nimm es zu Praktikums- und Vorstellungsgesprächen mit. Und frag vorher, ob du **Fotos** von anderen Personen machen darfst – am besten fotografierst du nur deine Werkstücke.'],
      woerter: [['das Portfolio', 'le portfolio'], ['die Mappe', 'le classeur'], ['das Werkstück', 'la pièce réalisée'], ['der Zwischenschritt', 'l’étape intermédiaire'], ['auswählen', 'sélectionner'], ['der Nachweis', 'la preuve, l’attestation'], ['das Deckblatt', 'la page de garde'], ['das Vorstellungsgespräch', 'l’entretien']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['In das Portfolio kommen alle Arbeiten, auch die misslungenen.', false], ['Zu jedem Werkstück gehört eine kurze Beschreibung.', true], ['Der Maschinen-Pass kann ein Nachweis sein.', true], ['Fotos von anderen Personen macht man nur, wenn sie es erlauben.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schreinerei · Vorstellungsgespräch für ein Praktikum', titel: 'Darf ich Ihnen etwas zeigen?',
      situation: 'Lea möchte ein Praktikum in einer Schreinerei machen. Beim Gespräch zeigt sie dem Chef ihr Portfolio.',
      bild: ['lea:froh:blatt', 'chef:froh:stehen'], sprecher: { Lea: 'w3', 'Herr Weis': 'm1' },
      text: [
        ['Herr Weis', 'Guten Tag, Lea. Setz dich. Warum möchtest du ein Praktikum bei uns machen?'],
        ['Lea', 'Weil ich gern mit Holz arbeite. Darf ich Ihnen mein Portfolio zeigen?'],
        ['Herr Weis', 'Gern.'],
        ['Lea', 'Das hier ist ein Regal mit drei Fächern. Ich habe es selbst geplant – mit Zeichnung, Stückliste und Arbeitsplan. Hier sieht man die Zeichnung.'],
        ['Herr Weis', 'Das ist ordentlich gezeichnet. Was war schwierig?'],
        ['Lea', 'Die Fächer gleich hoch zu machen. Beim ersten Versuch war eins zwei Millimeter zu niedrig. Ich habe dann einen Anschlag benutzt.'],
        ['Herr Weis', 'Das gefällt mir. Du hast den Fehler selbst gefunden und gelöst. Und das hier?'],
        ['Lea', 'Das ist mein Maschinen-Pass. Ich darf die Säulenbohrmaschine und den Akkuschrauber allein benutzen.'],
        ['Herr Weis', 'Sehr gut. Viele Bewerber erzählen mir nur, dass sie handwerklich begabt sind. Du kannst es zeigen. Wann kannst du anfangen?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Schreinerei? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Betrieb, der Möbel und andere Dinge aus Holz baut', 'ein Geschäft für Schreibwaren'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welches Werkstück zeigt Lea zuerst?', l: 'ein Regal mit drei Fächern' }, { f: 'Was war schwierig, und wie hat Lea es gelöst?', zeilen: 2, l: 'die Fächer gleich hoch zu machen; sie hat einen Anschlag benutzt' }, { f: 'Was zeigt sie noch?', l: 'ihren Maschinen-Pass' }, { f: 'Was gefällt Herrn Weis besonders?', zeilen: 2, l: 'dass sie den Fehler selbst gefunden und gelöst hat; dass sie zeigen kann, was sie kann' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt zu zweit: Einer zeigt ein Werkstück aus seinem Portfolio, der andere stellt Fragen wie Herr Weis.', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Was ist das?', 'Was war schwierig?', 'Was hast du gelernt?', 'Was würdest du anders machen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Portfolio', nummern: true, punkte: ['**Fotos** machen', 'die **besten** Arbeiten auswählen', '**Steckbrief** zu jedem Werkstück', '**Nachweise** dazulegen', '**ordnen**: Deckblatt, Inhalt'] },
         { titel: 'Im Gespräch', punkte: ['Werkstück **zeigen** und erklären', 'auch **Fehler** und Lösungen nennen', 'sagen, was du **gelernt** hast'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Portfolio-Steckbriefe: Fülle für vier Werkstücke je einen Steckbrief aus: Was ist es? Material und Werkzeug? Was war schwierig? Was habe ich gelernt? Klebe ihn neben das Foto in deine Mappe.', stufe: 2, neueSeite: true, titel: 'Steckbrief', icon: 'file-description', farbe: STOLZ, spalten: 2,
        karten: [
          { text: '**Werkstück 1:**', linien: 6 }, { text: '**Werkstück 2:**', linien: 6 },
          { text: '**Werkstück 3:**', linien: 6 }, { text: '**Werkstück 4:**', linien: 6 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe das Deckblatt für dein Portfolio: Wer bist du (nur, was du teilen möchtest)? Was findet man in der Mappe?', stufe: 1,
        anfaenge: ['Mein Portfolio – Atelier', 'Das bin ich: …', 'In dieser Mappe findest du …', 'Am meisten stolz bin ich auf …'], zeilen: 6,
        beispiel: 'Mein Portfolio – Atelier. Das bin ich: Ich arbeite gern mit den Händen, am liebsten mit Holz und Metall. In dieser Mappe findest du sechs Werkstücke mit Fotos und Steckbriefen, meinen Maschinen-Pass und meine Werkstatt-Berichte. Am meisten stolz bin ich auf meinen Handyständer aus Aluminium.' },
    ],
    check: ['Ich weiß, was in ein Portfolio gehört.', 'Ich schreibe Steckbriefe zu meinen Werkstücken.', 'Ich zeige und erkläre mein Portfolio.'],
  },
  // ================================================================ 3
  {
    thema: 'Berufe rund ums Atelier', titel: 'Welcher Beruf passt zu mir?', untertitel: 'Hinter jedem Atelier-Modul stehen echte Berufe. Du lernst Berufsfelder kennen, hörst drei Menschen von ihrer Arbeit erzählen und überlegst, was zu deinen Stärken passt.',
    ziel: { de: 'Ich kenne Berufe aus dem Handwerk und verbinde sie mit meinen Stärken.', fr: 'Je connais des métiers de l’artisanat et je les relie à mes points forts.' },
    bild: ['yusuf:froh:stehen-zeigen', 'amira:aufgeregt:stehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Atelier-Modul passt zu welchem Beruf? Verbinde.', stufe: 1, links: ['Metall und Maschinen', 'Garten und Natur', 'Textil und Gestalten', 'Kochen und Hygiene', 'Planen und zeichnen'], rechts: ['Metallbauer/in', 'Gärtner/in', 'Änderungsschneider/in', 'Koch/Köchin', 'technische/r Zeichner/in'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Berufsinformation (vereinfacht, Stand 2026)', titel: 'Berufsfelder im Handwerk',
      absaetze: [
        '**Holz:** Schreiner bauen Möbel, Türen und Treppen. **Metall:** Metallbauer und Schlosser bauen Geländer, Tore und Stahlteile. **Elektro:** Elektriker verlegen Kabel und schließen Geräte an. **Bau:** Maurer, Maler, Fliesenleger bauen und renovieren Häuser.',
        '**Garten und Natur:** Gärtner pflegen Parks und Gärten oder ziehen Pflanzen. **Küche:** Köche und Küchenhilfen arbeiten in Restaurants, Kantinen und Hotels. **Textil:** Änderungsschneider reparieren und ändern Kleidung. **Lager und Logistik:** Lageristen nehmen Waren an, ordnen sie und verschicken sie.',
        '### Wie lernt man einen Beruf?',
        'In Luxemburg lernt man viele Handwerksberufe in einer **Ausbildung**: in der **Schule** und im **Betrieb**. Zwei wichtige Abschlüsse sind das **CCP** (mit viel Praxis) und das **DAP**. Sie dauern meistens **drei Jahre**. Welche Wege für dich offenstehen, besprichst du am besten mit deiner Lehrperson und mit der Berufsberatung.',
        '### Was Betriebe sich wünschen',
        'Fast alle Betriebe sagen: Am wichtigsten sind **Zuverlässigkeit**, **Pünktlichkeit**, **Motivation** und **Freundlichkeit**. Vieles Fachliche lernt man im Betrieb.',
      ],
      woerter: [['der Beruf', 'le métier'], ['das Berufsfeld', 'le domaine professionnel'], ['der Schreiner', 'le menuisier'], ['der Metallbauer', 'le constructeur métallique'], ['der Gärtner', 'le jardinier'], ['die Ausbildung', 'la formation'], ['der Betrieb', 'l’entreprise'], ['die Berufsberatung', 'l’orientation professionnelle']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Wo lernt man in der Ausbildung?', l: 'in der Schule und im Betrieb' }, { f: 'Wie lange dauern CCP und DAP meistens?', l: 'drei Jahre' }, { f: 'Was ist Betrieben am wichtigsten?', zeilen: 2, l: 'Zuverlässigkeit, Pünktlichkeit, Motivation, Freundlichkeit' }] },
      ],
    },
    hoeren: {
      was: 'Ein Berufe-Rätsel', wo: 'Podcast der Schülerzeitung', titel: 'Wer bin ich?',
      situation: 'Drei Menschen beschreiben ihren Beruf, ohne den Namen zu sagen. Errätst du, welcher Beruf es ist?',
      bild: ['yusuf:froh:stehen-zeigen', 'amira:aufgeregt:stehen'], sprecher: { Sprecherin: 'w3', 'Person 1': 'm1', 'Person 2': 'w2', 'Person 3': 'm2' },
      text: [
        ['Sprecherin', 'Willkommen beim Berufe-Rätsel! Hört gut zu und ratet mit. Person eins, bitte.'],
        ['Person 1', 'Ich stehe früh auf und arbeite oft draußen, auch wenn es regnet. Im Frühling setze ich Blumen und Sträucher, im Sommer mähe ich und gieße, im Herbst sammle ich Laub. Ich brauche Spaten, Schubkarre und manchmal einen kleinen Bagger.'],
        ['Sprecherin', 'Danke! Person zwei.'],
        ['Person 2', 'Bei mir ist es heiß und laut. Ich arbeite viel abends und am Wochenende, weil die Leute dann essen gehen. Ich schneide Gemüse, brate Fleisch und achte sehr auf Hygiene. Wenn um zwölf Uhr fünfzig Bestellungen kommen, muss das Team perfekt zusammenarbeiten.'],
        ['Sprecherin', 'Und Person drei.'],
        ['Person 3', 'Ich lese technische Zeichnungen und baue Treppengeländer und Tore aus Stahl. Ich säge, bohre, biege und schweiße. Schutzbrille und Handschuhe sind bei mir Pflicht. Am schönsten ist es, wenn das Geländer am Ende genau passt.'],
        ['Sprecherin', 'Na, habt ihr alle drei erraten? Die Lösung steht im Heft eurer Lehrperson!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Geländer? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas zum Festhalten an der Treppe oder am Balkon', 'ein Garten'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welcher Beruf ist es? Woran hast du es erkannt?', stufe: 1, kopf: ['Person', 'Beruf', 'Hinweise'], breiten: [14, 30, 56], zeilen: [['1', '[Gärtner/in]', '[draußen, Blumen setzen, mähen, Laub, Spaten, Schubkarre]'], ['2', '[Koch/Köchin]', '[heiß, abends, Gemüse schneiden, Hygiene, Bestellungen]'], ['3', '[Metallbauer/in]', '[Zeichnungen, Geländer, Stahl, schweißen, Schutzbrille]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst ein Berufe-Rätsel: Beschreibt einen Beruf in drei Sätzen, die anderen raten.', stufe: 2, karten: [
        { titel: 'Hilfen', text: ['Ich arbeite …', 'Ich brauche …', 'Wichtig ist bei mir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Berufsfelder', punkte: ['**Holz**, **Metall**, **Elektro**, **Bau**', '**Garten**, **Küche**, **Textil**', '**Lager und Logistik**'] },
         { titel: 'Ausbildung (Stand 2026)', punkte: ['lernen in **Schule** und **Betrieb**', 'Abschlüsse z. B. **CCP** und **DAP**', 'meist **3 Jahre**', 'beraten lassen: Lehrperson, **Berufsberatung**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Meine Berufs-Ideen: Welche zwei Berufe interessieren dich? Passt das zu deinen Stärken?', stufe: 2, kopf: ['', 'Beruf 1', 'Beruf 2'], breiten: [32, 34, 34], zeilen: [['Was macht man da?', '', ''], ['Welche Stärken braucht man?', '', ''], ['Habe ich diese Stärken schon?', '', ''], ['Was möchte ich noch wissen?', '', ''], ['Wo könnte ich ein Praktikum machen?', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Welcher Beruf aus dem Handwerk interessiert dich am meisten? Begründe mit deinen Stärken und deinen Erfahrungen im Atelier.', stufe: 2,
        anfaenge: ['Mich interessiert der Beruf …', 'Im Atelier habe ich gemerkt, dass …', 'Dazu passen meine Stärken …', 'Ich möchte noch herausfinden, …'], zeilen: 6,
        beispiel: 'Mich interessiert der Beruf Gärtner. Im Atelier habe ich gemerkt, dass ich gern draußen arbeite und dass es mich freut, wenn etwas wächst. Dazu passen meine Stärken: Ich halte durch und arbeite gern mit den Händen. Ich möchte noch herausfinden, ob mir die Arbeit auch im Winter gefällt.' },
    ],
    check: ['Ich kenne Berufsfelder im Handwerk.', 'Ich weiß, wie man einen Beruf lernt.', 'Ich verbinde Berufe mit meinen Stärken.'],
  },
  // ================================================================ 4
  {
    thema: 'Praktikum vorbereiten', titel: 'Bereit fürs Praktikum', untertitel: 'Der erste Tag im Betrieb ist aufregend. Mit guter Vorbereitung klappt er. Du lernst die wichtigsten Regeln und übst ein wichtiges Telefongespräch: die Krankmeldung.',
    ziel: { de: 'Ich bereite mich auf ein Praktikum vor und melde mich richtig krank.', fr: 'Je prépare un stage et je sais signaler une absence pour maladie.' },
    bild: ['finn:nervoes:stehen', 'chef:froh:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Du bist am Praktikumstag krank. Was machst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich rufe vor Arbeitsbeginn im Betrieb an.', 'Ich schicke am Abend eine Nachricht.', 'Ich sage nichts, die merken das schon.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Praktikums-Tipps', titel: 'Zehn Regeln für ein gutes Praktikum',
      absaetze: [
        '**Vorher:** Schau dir den Weg zum Betrieb an und plane genug Zeit ein. Frag, welche **Kleidung** du brauchst – zum Beispiel Sicherheitsschuhe oder Arbeitshose. Schreib dir die **Telefonnummer** des Betriebs und den Namen deiner Ansprechperson auf.',
        '**Am ersten Tag:** Sei **pünktlich**, lieber zehn Minuten zu früh. Begrüße alle freundlich. Hör bei der **Sicherheitsunterweisung** genau zu. Schreib dir wichtige Dinge auf.',
        '**Jeden Tag:** Das **Handy** bleibt in der Pause. **Frag nach**, wenn du etwas nicht verstehst – das ist besser als ein Fehler. Wenn du fertig bist, frag: „Was kann ich jetzt machen?“ Halte deinen Arbeitsplatz **ordentlich**.',
        '**Wenn du krank bist:** Ruf **vor Arbeitsbeginn** im Betrieb **an** – eine Nachricht reicht meistens nicht. Sag deinen Namen, dass du Praktikant bist, dass du krank bist und wie lange du wahrscheinlich fehlst. Sag auch in der **Schule** Bescheid. Frag, ob du ein **ärztliches Attest** brauchst.',
        '**Und:** Wenn dir etwas komisch vorkommt oder dich jemand schlecht behandelt, sprich mit deiner Lehrperson. Du bist nicht allein.',
      ],
      woerter: [['das Praktikum', 'le stage'], ['der Praktikant', 'le stagiaire'], ['die Ansprechperson', 'la personne de contact'], ['die Sicherheitsunterweisung', 'les consignes de sécurité'], ['die Krankmeldung', 'l’avis de maladie'], ['das Attest', 'le certificat médical'], ['der Arbeitsbeginn', 'le début du travail'], ['Bescheid sagen', 'prévenir']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vorher, am ersten Tag oder jeden Tag? Kreuze an.', stufe: 1, kopf: ['', 'vorher', 'erster Tag', 'jeden Tag'], breiten: [52, 16, 16, 16], zeilen: [['den Weg zum Betrieb anschauen', '[x]', '', ''], ['bei der Sicherheitsunterweisung zuhören', '', '[x]', ''], ['nachfragen, wenn etwas unklar ist', '', '', '[x]'], ['Arbeitskleidung besorgen', '[x]', '', ''], ['Handy nur in der Pause', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Telefongespräch', wo: 'Telefon · morgens um 7:15 Uhr', titel: 'Die Krankmeldung',
      situation: 'Finn macht ein Praktikum in einem Gartenbaubetrieb. Heute Morgen hat er Fieber. Er ruft im Betrieb an.',
      bild: ['finn:muede:stehen', 'chef:froh:stehen'], sprecher: { 'Frau Reuter': 'w2', Finn: 'm3' },
      text: [
        ['Frau Reuter', 'Gartenbau Reuter, guten Morgen.'],
        ['Finn', 'Guten Morgen, hier ist Finn. Ich bin der Praktikant aus dem Lycée. Ich arbeite diese Woche im Team von Herrn Faber.'],
        ['Frau Reuter', 'Ah, guten Morgen, Finn. Was gibt es?'],
        ['Finn', 'Ich bin leider krank. Ich habe seit heute Nacht Fieber und kann heute nicht kommen.'],
        ['Frau Reuter', 'Oh, gute Besserung. Weißt du schon, wie lange du fehlst?'],
        ['Finn', 'Ich gehe heute zum Arzt. Ich rufe Sie heute Nachmittag wieder an und sage Bescheid.'],
        ['Frau Reuter', 'Gut. Und denk an das Attest, wenn du länger als einen Tag fehlst. Hast du schon in der Schule Bescheid gesagt?'],
        ['Finn', 'Noch nicht, das mache ich gleich nach diesem Anruf.'],
        ['Frau Reuter', 'Prima. Ich sage Herrn Faber Bescheid. Werd schnell gesund!'],
        ['Finn', 'Danke. Auf Wiederhören.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sagt man am Ende eines Telefongesprächs? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Auf Wiederhören.', 'Auf Wiedersehen.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sagt Finn? Hake ab und ergänze.', stufe: 1, kopf: ['Finn sagt …', 'Was genau?'], breiten: [40, 60], zeilen: [['seinen Namen', '[Finn]'], ['wer er ist', '[der Praktikant aus dem Lycée, im Team von Herrn Faber]'], ['was los ist', '[krank, Fieber seit heute Nacht]'], ['wie es weitergeht', '[geht zum Arzt, ruft am Nachmittag wieder an]'], ['wem er noch Bescheid sagt', '[der Schule]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt die Krankmeldung zu zweit am „Telefon“ (Rücken an Rücken). Einer ist der Betrieb, einer der Praktikant. Dann tauschen.', stufe: 2, karten: [
        { titel: 'Krankmeldung', text: ['Guten Morgen, hier ist …', 'Ich bin Praktikant/in bei …', 'Ich bin leider krank. Ich …', 'Ich melde mich wieder um …', 'Auf Wiederhören.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Im Praktikum', punkte: ['**pünktlich**, lieber zu früh', 'richtige **Kleidung**', '**nachfragen** statt raten', 'Handy nur in der **Pause**', '„Was kann ich jetzt machen?“'] },
         { titel: 'Krankmeldung', nummern: true, punkte: ['**vor Arbeitsbeginn anrufen**', 'Name, Praktikant/in, was los ist', 'wie lange (ungefähr)', '**Schule** informieren', 'nach **Attest** fragen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Meine Praktikums-Checkliste: Fülle sie für dein nächstes Praktikum aus (oder für ein ausgedachtes).', stufe: 2, kopf: ['', 'Meine Angaben', 'erledigt'], breiten: [36, 50, 14], zeilen: [['Betrieb und Adresse', '', ''], ['Ansprechperson und Telefon', '', ''], ['Arbeitszeit am ersten Tag', '', ''], ['Weg und Abfahrtszeit', '', ''], ['Kleidung und Schuhe', '', ''], ['Was nehme ich mit?', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was macht dir vor einem Praktikum Mut? Was macht dir vielleicht Sorgen? Was kann helfen? (Schreib nur, was du teilen möchtest.)', stufe: 2,
        anfaenge: ['Ich freue mich auf …', 'Ein bisschen Sorgen macht mir …', 'Helfen kann …'], zeilen: 5,
        beispiel: 'Ich freue mich darauf, in einem echten Betrieb mitzuarbeiten. Ein bisschen Sorgen macht mir, dass ich am Anfang niemanden kenne. Helfen kann, dass ich mir vorher den Weg anschaue und mir die Namen aufschreibe. Und ich weiß, dass ich meine Lehrperson anrufen kann.' },
    ],
    check: ['Ich bereite ein Praktikum gut vor.', 'Ich kenne die wichtigsten Regeln im Betrieb.', 'Ich melde mich am Telefon richtig krank.'],
  },
  // ================================================================ 5
  {
    thema: 'Ein Werkstück präsentieren', titel: 'Zeig, was du kannst!', untertitel: 'Ein gutes Werkstück verdient eine gute Vorstellung. Du lernst einen einfachen Aufbau für eine Präsentation, hörst ein Beispiel und übst mit Sprechkarten.',
    ziel: { de: 'Ich stelle ein Werkstück klar und sicher vor.', fr: 'Je présente une pièce réalisée de façon claire et assurée.' },
    bild: ['tom:stolz:stehen-zeigen', 'nele:froh:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was macht eine gute Präsentation aus? Kreuze alles Richtige an.', stufe: 1, fragen: [{ f: '', o: ['laut und langsam sprechen', 'das Werkstück zeigen', 'die ganze Zeit auf den Zettel schauen', 'auch Schwierigkeiten erzählen'], r: [0, 1, 3] }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Anleitung', titel: 'Werkstück-Präsentation in vier Teilen',
      material: ['dein Werkstück', 'Sprechkarten', 'eventuell Fotos von Zwischenschritten'],
      schritte: [
        { icon: 'hand-stop', text: '**Begrüßung und Thema:** „Hallo, ich stelle euch meinen … vor.“' },
        { icon: 'tool', text: '**Wie habe ich es gemacht?** Material, Werkzeuge, die wichtigsten Arbeitsschritte. Zeig dabei das Werkstück.' },
        { icon: 'alert-triangle', text: '**Was war schwierig?** Erzähl von einem Problem und wie du es gelöst hast. Das zeigt, dass du mitdenkst.' },
        { icon: 'star', text: '**Was habe ich gelernt?** Und worauf bist du stolz? Zum Schluss: „Habt ihr Fragen?“' },
      ],
      danach: ['**Tipps:** Schau die Zuhörer an, nicht nur deine Karten. Sprich **laut** und **langsam**. Stell dich gerade hin. Auf die Sprechkarten schreibst du nur **Stichwörter**, keine ganzen Sätze. Und: Ein bisschen Aufregung ist normal – sie zeigt, dass dir die Sache wichtig ist.'],
      woerter: [['präsentieren', 'présenter'], ['die Präsentation', 'la présentation'], ['die Sprechkarte', 'la fiche de présentation'], ['das Stichwort', 'le mot-clé'], ['die Zuhörer', 'le public'], ['die Begrüßung', 'la salutation'], ['die Aufregung', 'le trac'], ['stolz', 'fier']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Teile der Präsentation.', stufe: 1, teile: ['Begrüßung und Thema', 'Wie habe ich es gemacht?', 'Was war schwierig?', 'Was habe ich gelernt? Fragen?'], ordnung: [2, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Präsentation', wo: 'Werkstatt · Abschlussrunde', titel: 'Toms Vogelhaus',
      situation: 'Tom stellt sein Vogelhaus vor. Danach gibt Nele eine Rückmeldung. Achte auf die vier Teile.',
      bild: ['tom:stolz:stehen-zeigen', 'nele:froh:stehen'], sprecher: { Tom: 'm3', Nele: 'w3' },
      text: [
        ['Tom', 'Hallo zusammen. Ich stelle euch heute mein Vogelhaus vor.'],
        ['Tom', 'Es ist aus Fichtenholz, achtzehn Millimeter dick. Das Dach ist aus Sperrholz. Ich habe zuerst eine Zeichnung und eine Stückliste gemacht. Dann habe ich gesägt, das Einflugloch gebohrt, geschliffen und alles verschraubt. Das Dach kann man aufklappen, damit man das Haus im Herbst putzen kann.'],
        ['Tom', 'Schwierig war das Einflugloch. Der große Bohrer ist beim ersten Versuch ausgerissen und das Holz ist gesplittert. Herr Steffen hat mir gezeigt, dass ich ein Restholz dahinter legen muss. Beim zweiten Mal war das Loch ganz sauber.'],
        ['Tom', 'Gelernt habe ich, dass gute Planung viel Zeit spart. Und ich bin stolz, dass das Haus jetzt bei meiner Oma im Garten hängt und schon Meisen eingezogen sind. Habt ihr Fragen?'],
        ['Nele', 'Ich habe keine Frage, aber eine Rückmeldung: Du hast laut und deutlich gesprochen, und man hat alle vier Teile erkannt. Toll, dass du das Problem mit dem Bohrer erzählt hast. Mein Tipp: Zeig das Werkstück noch mehr – halt es hoch, wenn du über das Dach sprichst.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Einflugloch? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das runde Loch, durch das der Vogel in das Haus fliegt', 'ein Loch im Dach für Regen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Notiere Stichwörter zu den vier Teilen.', stufe: 1, kopf: ['Teil', 'Was sagt Tom?'], breiten: [32, 68], zeilen: [['Thema', '[sein Vogelhaus]'], ['Wie gemacht?', '[Fichtenholz 18 mm, Dach Sperrholz; Zeichnung, Stückliste, sägen, bohren, schleifen, schrauben; Dach aufklappbar]'], ['Was war schwierig?', '[Einflugloch: Holz gesplittert; Lösung: Restholz dahinter]'], ['Gelernt / stolz', '[Planung spart Zeit; Haus hängt im Garten, Meisen sind eingezogen]']] },
        { art: 'fragen', auftrag: 'Welchen Tipp gibt Nele?', stufe: 2, fragen: [{ f: '', l: 'Das Werkstück mehr zeigen und hochhalten, wenn er darüber spricht.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Präsentiere ein Werkstück aus deinem Portfolio in zwei Minuten. Die anderen geben Feedback in drei Schritten.', stufe: 3, karten: [
        { titel: 'Sprechkarte', text: ['Hallo, ich stelle … vor.', 'Material, Werkzeug, Schritte: …', 'Schwierig war … Gelöst habe ich …', 'Gelernt habe ich … Fragen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aufbau', nummern: true, punkte: ['**Begrüßung** und Thema', '**Wie** gemacht? (zeigen!)', '**Schwierigkeit** und Lösung', '**Gelernt**, stolz, Fragen'] },
         { titel: 'Auftreten', punkte: ['Zuhörer **anschauen**', '**laut** und **langsam**', 'gerade **stehen**', 'Karten nur mit **Stichwörtern**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Meine Sprechkarten: Schreibe für deine Präsentation auf jede Karte nur Stichwörter.', stufe: 2, neueSeite: true, titel: 'Sprechkarte', icon: 'presentation', farbe: WEG, spalten: 2,
        karten: [
          { text: '**1 · Begrüßung und Thema**', linien: 3 }, { text: '**2 · Wie habe ich es gemacht?**', linien: 3 },
          { text: '**3 · Was war schwierig? Lösung?**', linien: 3 }, { text: '**4 · Gelernt, stolz, Fragen?**', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Nach deiner Präsentation: Wie ist es gelaufen? Welche Rückmeldung hast du bekommen? Was machst du beim nächsten Mal anders?', stufe: 2,
        anfaenge: ['Meine Präsentation …', 'Die anderen haben gesagt, …', 'Beim nächsten Mal …'], zeilen: 5,
        beispiel: 'Meine Präsentation ging besser, als ich dachte. Die anderen haben gesagt, dass ich gut erklärt habe, aber zu schnell gesprochen habe. Beim nächsten Mal mache ich nach jedem Teil eine kleine Pause und atme durch.' },
    ],
    check: ['Ich baue eine Präsentation in vier Teilen auf.', 'Ich spreche laut, langsam und schaue die Zuhörer an.', 'Ich nehme Feedback zu meiner Präsentation an.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Mein Meisterstück', titel: 'Mein Meisterstück', untertitel: 'Zum Abschluss baust du ein eigenes Werkstück – dein Meisterstück. Du planst es selbst, schließt einen Projektvertrag, arbeitest selbstständig, prüfst die Qualität und präsentierst es.',
    ziel: { de: 'Ich plane und baue ein eigenes Meisterstück und präsentiere es.', fr: 'Je planifie, réalise et présente mon propre chef-d’œuvre.' },
    bild: ['yusuf:froh:stehen-zeigen', 'lehrer:froh:stehen'],
    start: {
      was: 'Ideen',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was möchtest du als Meisterstück bauen? Notiere zwei Ideen. Es darf aus jedem Atelier-Bereich sein: Holz, Metall, Garten, Küche, Textil.', stufe: 1, fragen: [{ f: 'Idee 1:', l: 'Individuell' }, { f: 'Idee 2:', l: 'Individuell' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Projekt-Anleitung', titel: 'Was ist ein Meisterstück?',
      absaetze: [
        'Früher mussten Handwerker ein **Meisterstück** bauen, um zu zeigen, dass sie ihren Beruf beherrschen. Dein Meisterstück zeigt, was du im Atelier gelernt hast: **planen**, **sicher arbeiten**, **genau sein** und **präsentieren**.',
        '### Der Projektvertrag',
        'Bevor du anfängst, schließt du mit deiner Lehrperson einen **Projektvertrag**. Darin steht: Was baust du? Bis wann? Welches Material und welche Maschinen brauchst du? Woran erkennt man, dass es gut ist? Beide unterschreiben. So wissen alle, was abgemacht ist.',
        '### Die Bewertung',
        'Bewertet werden nicht nur das fertige Stück, sondern auch die **Planung**, die **Arbeitsweise** (Sicherheit, Ordnung, Zeit), die **Qualität** und die **Präsentation**. Ein Meisterstück muss nicht kompliziert sein. Ein einfaches Stück, sauber gemacht, ist besser als ein großes, das nicht fertig wird.',
      ],
      woerter: [['das Meisterstück', 'le chef-d’œuvre'], ['beherrschen', 'maîtriser'], ['der Vertrag', 'le contrat'], ['unterschreiben', 'signer'], ['abmachen', 'convenir'], ['die Bewertung', 'l’évaluation'], ['die Arbeitsweise', 'la manière de travailler'], ['kompliziert', 'compliqué']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Ein Meisterstück muss besonders groß und kompliziert sein.', false], ['Im Projektvertrag steht, was bis wann fertig sein soll.', true], ['Bewertet wird nur das fertige Stück.', false], ['Lehrperson und Schüler unterschreiben den Vertrag.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Projektbesprechung', titel: 'Der Projektvertrag',
      situation: 'Yusuf möchte als Meisterstück einen Hocker bauen. Herr Steffen bespricht mit ihm den Projektvertrag.',
      bild: ['yusuf:aufgeregt:stehen-zeigen', 'lehrer:froh:stehen'], sprecher: { Yusuf: 'm3', 'Herr Steffen': 'm1' },
      text: [
        ['Yusuf', 'Ich möchte einen Hocker bauen. Mit vier Beinen, aus Eiche, und mit einer Schublade.'],
        ['Herr Steffen', 'Gute Idee. Wie viel Zeit haben wir?'],
        ['Yusuf', 'Acht Doppelstunden.'],
        ['Herr Steffen', 'Eiche ist sehr hart und teuer, und eine Schublade ist schwierig. Schaffst du das in acht Doppelstunden?'],
        ['Yusuf', 'Hm. Wahrscheinlich nicht. Was ist, wenn ich Buche nehme und statt der Schublade ein Ablagebrett unten mache?'],
        ['Herr Steffen', 'Das ist realistisch. Dann schreiben wir in den Vertrag: Hocker aus Buche, Sitzhöhe 45 Zentimeter, mit Ablagebrett. Fertig in acht Doppelstunden. Welche Maschinen brauchst du?'],
        ['Yusuf', 'Säge, Säulenbohrmaschine, Schleifmaschine. Für die Schleifmaschine habe ich noch keine Unterschrift im Maschinen-Pass.'],
        ['Herr Steffen', 'Dann machen wir das in der ersten Stunde. Und woran erkennen wir, dass der Hocker gut ist?'],
        ['Yusuf', 'Er wackelt nicht, die Kanten sind glatt, und ich kann mich draufsetzen.'],
        ['Herr Steffen', 'Perfekte Kriterien. Dann unterschreiben wir beide.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „realistisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man kann es wirklich schaffen.', 'Es ist ein Traum.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle Yusufs Projektvertrag aus.', stufe: 1, kopf: ['', 'Yusufs Vertrag'], breiten: [32, 68], zeilen: [['Werkstück', '[Hocker aus Buche, Sitzhöhe 45 cm, mit Ablagebrett]'], ['Zeit', '[8 Doppelstunden]'], ['Maschinen', '[Säge, Säulenbohrmaschine, Schleifmaschine]'], ['noch zu tun', '[Maschinen-Pass für die Schleifmaschine]'], ['gut ist es, wenn …', '[er nicht wackelt, die Kanten glatt sind, man darauf sitzen kann]']] },
        { art: 'fragen', auftrag: 'Was ändert Yusuf an seiner ersten Idee? Warum?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Buche statt Eiche und Ablagebrett statt Schublade – weil es in acht Doppelstunden sonst nicht zu schaffen ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Besprecht zu zweit eure Meisterstück-Ideen: Ist das realistisch? Was könnte man vereinfachen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde die Idee …', 'Schaffst du …?', 'Vielleicht könntest du statt … lieber …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Meisterstück', nummern: true, punkte: ['**Idee** wählen – realistisch!', '**Projektvertrag** schließen', 'planen: Zeichnung, Stückliste, Arbeitsplan', 'sicher und sauber **bauen**', '**Qualität** prüfen', '**präsentieren**'] },
         { titel: 'Bewertung', punkte: ['**Planung**', '**Arbeitsweise**: Sicherheit, Ordnung, Zeit', '**Qualität** des Stücks', '**Präsentation**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Projektvertrag: Fülle ihn aus und unterschreibe ihn mit deiner Lehrperson.', stufe: 2, kopf: ['', 'Abgemacht'], breiten: [34, 66], zeilen: [['Mein Meisterstück', ''], ['Maße und Material', ''], ['fertig bis', ''], ['Maschinen und Werkzeuge', ''], ['noch zu lernen', ''], ['gut ist es, wenn …', ''], ['Unterschrift Schüler/in', ''], ['Unterschrift Lehrperson', '']] },
      { art: 'tabelle', auftrag: 'Bewertungsbogen: Schätze dich zuerst selbst ein. Dann bewertet die Lehrperson.', stufe: 2, kopf: ['Kriterium', 'ich', 'Lehrperson'], breiten: [56, 22, 22], zeilen: [['Planung (Zeichnung, Stückliste, Arbeitsplan)', '', ''], ['Sicherheit und Ordnung', '', ''], ['Zeit eingehalten', '', ''], ['Qualität (Maße, Kanten, Funktion)', '', ''], ['Präsentation', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein letzter Werkstatt-Bericht: Schau auf alle neun Module zurück. Was hast du im Atelier gelernt? Was nimmst du mit für deinen Weg?', stufe: 3,
        anfaenge: ['Im Atelier habe ich gelernt, …', 'Am meisten Spaß gemacht hat …', 'Mein Meisterstück …', 'Für meinen Weg nehme ich mit, …'], zeilen: 8,
        beispiel: 'Im Atelier habe ich gelernt, wie man mit Werkzeugen und Maschinen sicher arbeitet und dass gute Planung die halbe Arbeit ist. Am meisten Spaß gemacht hat das Metall-Modul, weil der Handyständer richtig professionell aussieht. Mein Meisterstück ist ein Hocker aus Buche, und er wackelt nicht. Für meinen Weg nehme ich mit, dass ich mehr kann, als ich am Anfang dachte – und dass ich gern im Handwerk arbeiten möchte.' },
    ],
    check: ['Ich plane ein Meisterstück realistisch.', 'Ich halte mich an meinen Projektvertrag.', 'Ich präsentiere mein Meisterstück und bewerte mich selbst.'],
  },
]
