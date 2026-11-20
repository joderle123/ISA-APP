// Atelier · Modul 7 (5P) „Im Team arbeiten“ – Enseignement pratique, Voie de préparation.
// Transversale Kompetenzen (Leitfaden VP): im Team arbeiten, Absprachen einhalten, Qualität kontrollieren, Arbeit präsentieren.
// Multimodal: Rollen-Karten, Serienfertigung mit Rechnen, Werkstatt-Kommunikation (Hörtext Missverständnis), Toleranz-Skala,
// Feedback-Karten, Projekt Schulfest-Stand mit Kalkulation und Verkaufsgespräch.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { toleranz } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 7, {
  titel: 'Im Team arbeiten',
  titelFr: 'Travailler en équipe',
  unter: 'Rollen verteilen, in Serie produzieren, klar miteinander reden, Qualität prüfen, Feedback geben – und gemeinsam einen Stand für das Schulfest planen.',
  unterFr: 'Rôles, production en série, communication, contrôle qualité, feedback et projet de stand pour la fête de l’école.',
  farbe: '#7a4fa0',
  deckbild: ['yusuf:froh:stehen-zeigen', 'nele:froh:rollstuhl', 'ben:froh:blatt'],
  blasen: [{ t: 'Wer macht was?', x: 8, y: 104 }, { t: 'Passt das Maß?', x: 120, y: 92 }, { t: 'Gute Idee!', x: 178, y: 150 }],
  aussprache: { '±': 'plus minus' },
  themen: [
    { titel: { de: 'Zusammen arbeiten', fr: 'Collaborer' }, icon: 'users-group', lektionen: 3 },
    { titel: { de: 'Prüfen und zeigen', fr: 'Contrôler et présenter' }, icon: 'presentation', lektionen: 3 },
  ],
})

const TEAM = '#7a4fa0', FEED = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Rollen im Team', titel: 'Wer macht was?', untertitel: 'In einem guten Team weiß jede Person, was ihre Aufgabe ist. Du lernst typische Rollen in der Werkstatt kennen, hörst ein Team, das sich erst streitet, und verteilst die Rollen in deiner Gruppe.',
    ziel: { de: 'Ich kenne Rollen im Team und übernehme eine Rolle verantwortungsvoll.', fr: 'Je connais les rôles dans une équipe et j’assume un rôle de manière responsable.' },
    bild: ['yusuf:wuetend:stehen', 'nele:enttaeuscht:rollstuhl'],
    start: {
      was: 'Erinnere dich',
      aufgaben: [
        { art: 'fragen', auftrag: 'Denk an eine Gruppenarbeit, die schiefging. Was war das Problem? (Du musst keine Namen nennen.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Niemand wusste, was er tun soll; einer hat alles gemacht; Streit; keine Zeit mehr.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext', titel: 'Rollen in der Werkstatt',
      absaetze: [
        'In Betrieben arbeiten Menschen fast immer im **Team**. Damit nichts doppelt gemacht oder vergessen wird, hat jede Person eine **Rolle**. Rollen können bei jedem Projekt **wechseln** – so lernt jeder alles.',
        '**Teamleitung:** Sie hat den Überblick über den Plan und fragt: Was ist der nächste Schritt? Sie entscheidet nicht allein, sondern achtet darauf, dass alle mitreden.',
        '**Materialwart:** Er oder sie holt Material und Werkzeug, achtet darauf, dass nichts fehlt, und bringt am Ende alles zurück.',
        '**Zeitwächter:** Er oder sie schaut auf die Uhr und sagt Bescheid: Noch zehn Minuten! Dann bleibt genug Zeit zum Aufräumen.',
        '**Qualitätsprüfer:** Er oder sie prüft die Teile mit Lineal und Winkel. Stimmt das Maß? Ist die Kante sauber?',
        '**Sprecher:** Er oder sie stellt am Ende die Arbeit vor und fragt die Lehrperson, wenn das Team nicht weiterkommt.',
        'Wichtig: **Alle arbeiten mit.** Die Rolle ist eine Aufgabe zusätzlich, keine Ausrede, um nichts zu tun.',
      ],
      woerter: [['das Team', 'l’équipe'], ['die Rolle', 'le rôle'], ['die Teamleitung', 'le chef d’équipe'], ['der Überblick', 'la vue d’ensemble'], ['der Materialwart', 'le responsable du matériel'], ['der Zeitwächter', 'le gardien du temps'], ['der Qualitätsprüfer', 'le contrôleur qualité'], ['der Sprecher', 'le porte-parole']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer sagt das? Verbinde.', stufe: 1, links: ['„Noch zehn Minuten, dann aufräumen!“', '„Das Brett ist 2 mm zu kurz.“', '„Uns fehlen noch vier Schrauben. Ich hole sie.“', '„Was ist unser nächster Schritt?“', '„Ich stelle unser Werkstück vor.“'], rechts: ['Zeitwächter', 'Qualitätsprüfer', 'Materialwart', 'Teamleitung', 'Sprecher'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Gruppentisch', titel: 'Chaos am Gruppentisch',
      situation: 'Yusuf, Nele, Ben und Amira sollen zusammen ein Regal bauen. Nach zehn Minuten ist noch nichts passiert.',
      bild: ['yusuf:wuetend:stehen', 'nele:enttaeuscht:rollstuhl'], sprecher: { Yusuf: 'm3', Nele: 'w3', Ben: 'm2', Amira: 'w2' },
      text: [
        ['Yusuf', 'Ich wollte doch die Bretter holen! Warum hast du sie schon geholt?'],
        ['Nele', 'Weil keiner etwas gemacht hat. Und jetzt fehlen trotzdem die Schrauben.'],
        ['Ben', 'Wie lange haben wir überhaupt noch? Ich habe nicht auf die Uhr geschaut.'],
        ['Amira', 'Stopp. So geht das nicht. Wir verteilen jetzt Rollen. Wer will Materialwart sein?'],
        ['Yusuf', 'Ich. Dann hole ich jetzt die Schrauben – und nur ich hole Material.'],
        ['Ben', 'Ich nehme die Uhr. Wir haben noch fünfunddreißig Minuten.'],
        ['Nele', 'Dann prüfe ich die Maße. Ich bin genau.'],
        ['Amira', 'Und ich behalte den Plan im Blick. Ben, sag uns bitte Bescheid, wenn noch zehn Minuten übrig sind.'],
        ['Ben', 'Mach ich. Und wer stellt das Regal am Ende vor?'],
        ['Nele', 'Das machen wir zu zweit, Yusuf und ich. Okay?'],
        ['Yusuf', 'Okay. Jetzt geht es endlich los.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Chaos“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['großes Durcheinander', 'große Ruhe'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer übernimmt welche Rolle?', stufe: 1, kopf: ['Person', 'Rolle'], breiten: [30, 70], zeilen: [['Yusuf', '[Materialwart (und Sprecher, zusammen mit Nele)]'], ['Ben', '[Zeitwächter]'], ['Nele', '[Qualitätsprüferin (und Sprecherin, zusammen mit Yusuf)]'], ['Amira', '[Teamleitung (behält den Plan im Blick)]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat Amira gut gemacht? Was hätte das Team schon am Anfang anders machen können?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Amira hat …', 'Am Anfang hätten sie …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fünf Rollen', punkte: ['**Teamleitung**: Überblick, alle reden mit', '**Materialwart**: Material holen und zurückbringen', '**Zeitwächter**: Zeit im Blick', '**Qualitätsprüfer**: Maße und Kanten prüfen', '**Sprecher**: vorstellen, nachfragen'] },
         { titel: 'Team-Regeln', punkte: ['Rollen **am Anfang** verteilen', 'Rollen **wechseln** bei jedem Projekt', '**alle** arbeiten mit', 'Probleme **früh** ansprechen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Rollen-Karten: Schneidet die Karten aus. Jede Person zieht eine Rolle für das nächste Projekt und legt die Karte vor sich auf den Tisch.', stufe: 1, neueSeite: true, titel: 'Meine Rolle', icon: 'id-badge-2', farbe: TEAM, spalten: 2,
        karten: [
          { text: '**Teamleitung**\nIch habe den Plan im Blick. Ich frage: Was ist der nächste Schritt? Alle dürfen mitreden.', linien: 1 },
          { text: '**Materialwart**\nIch hole Material und Werkzeug. Ich bringe am Ende alles zurück.', linien: 1 },
          { text: '**Zeitwächter**\nIch schaue auf die Uhr. Ich sage: Noch 10 Minuten!', linien: 1 },
          { text: '**Qualitätsprüfer**\nIch prüfe Maße und Kanten mit Lineal und Winkel.', linien: 1 },
          { text: '**Sprecher**\nIch stelle unsere Arbeit vor. Ich frage die Lehrperson, wenn wir nicht weiterkommen.', linien: 1 },
          { text: '**Joker** (bei 6 Personen)\nIch helfe dort, wo gerade am meisten Arbeit ist.', linien: 1 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Welche Rolle passt gut zu dir? Welche wäre eine Herausforderung? Begründe.', stufe: 2,
        anfaenge: ['Gut zu mir passt die Rolle …, weil …', 'Eine Herausforderung wäre …, weil …', 'Ich möchte üben, …'], zeilen: 6,
        beispiel: 'Gut zu mir passt die Rolle Qualitätsprüfer, weil ich sehr genau bin und Fehler schnell sehe. Eine Herausforderung wäre Sprecher, weil ich nicht gern vor vielen Leuten rede. Ich möchte üben, kurz und klar vor der Klasse zu sprechen.' },
    ],
    check: ['Ich kenne fünf Rollen im Team.', 'Ich übernehme eine Rolle und halte mich daran.', 'Ich weiß, warum Rollen helfen.'],
  },
  // ================================================================ 2
  {
    thema: 'Serienfertigung · Arbeitsteilung', titel: 'Wir produzieren in Serie', untertitel: 'Eine Person baut ein ganzes Teil – oder jede Person macht immer denselben Schritt? Du lernst Einzelfertigung und Serienfertigung kennen und rechnest, was schneller geht.',
    ziel: { de: 'Ich unterscheide Einzel- und Serienfertigung und arbeite an einer Station.', fr: 'Je distingue la production unitaire de la production en série et je travaille à un poste.' },
    bild: ['ben:froh:blatt', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Was denkst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Ihr sollt 30 gleiche Schlüsselanhänger bauen. Was geht wohl schneller? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Jede Person baut ihre Anhänger ganz allein.', 'Jede Person macht immer nur einen Arbeitsschritt.'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext', titel: 'Einzeln oder in Serie?',
      absaetze: [
        '### Einzelfertigung',
        'Bei der **Einzelfertigung** baut man ein Stück von Anfang bis Ende – zum Beispiel einen Schrank genau nach Maß für eine Küche. Das braucht viel Können und Zeit. Dafür ist jedes Stück **einzigartig**.',
        '### Serienfertigung',
        'Bei der **Serienfertigung** stellt man viele **gleiche** Teile her. Die Arbeit wird geteilt: An jeder **Station** macht eine Person immer denselben Schritt. Das Werkstück wandert von Station zu Station. Man nennt das **Arbeitsteilung**.',
        'Damit alle Teile gleich werden, benutzt man **Schablonen** und **Anschläge**: Man muss nicht jedes Mal neu messen. Weil jeder seinen Schritt immer wieder macht, wird er schnell und sicher.',
        '### Vorteile und Nachteile',
        'Serienfertigung ist **schneller** und **billiger** pro Stück. Aber die Arbeit kann **langweilig** werden. Und wenn an einer Station etwas klemmt, stehen alle anderen still. Darum wechseln die Stationen oft nach einer Weile.',
      ],
      woerter: [['die Einzelfertigung', 'la production unitaire'], ['die Serienfertigung', 'la production en série'], ['die Station', 'le poste de travail'], ['die Arbeitsteilung', 'la division du travail'], ['die Schablone', 'le gabarit'], ['der Anschlag', 'la butée'], ['einzigartig', 'unique'], ['der Nachteil', 'l’inconvénient']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Einzel- oder Serienfertigung? Kreuze an.', stufe: 1, kopf: ['', 'Einzelfertigung', 'Serienfertigung'], breiten: [52, 24, 24], zeilen: [['ein Brautkleid nach Maß', '[x]', ''], ['10 000 gleiche Stühle für Schulen', '', '[x]'], ['eine Treppe für ein altes Haus', '[x]', ''], ['Handyhüllen in einer Fabrik', '', '[x]'], ['30 Schlüsselanhänger für das Schulfest', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Bericht', wo: 'Werkstatt · nach dem Experiment', titel: 'Das Anhänger-Rennen',
      situation: 'Die Klasse hat ein Experiment gemacht: Gruppe A hat Schlüsselanhänger einzeln gebaut, Gruppe B in Serie mit vier Stationen. Ben berichtet für Gruppe B.',
      bild: ['ben:froh:blatt', 'lehrer:froh:erklaeren'], sprecher: { Ben: 'm2', 'Herr Steffen': 'm1' },
      text: [
        ['Herr Steffen', 'Ben, wie ist es in eurer Gruppe gelaufen?'],
        ['Ben', 'Wir hatten vier Stationen: Anzeichnen mit der Schablone, Sägen, Bohren und Schleifen. Am Anfang waren wir langsam, weil das Sägen am längsten gedauert hat. Die Bohr-Station musste warten.'],
        ['Herr Steffen', 'Was habt ihr gemacht?'],
        ['Ben', 'Wer an der Bohr-Station warten musste, hat zwischendurch mitgesägt. Danach lief es viel besser.'],
        ['Herr Steffen', 'Und das Ergebnis?'],
        ['Ben', 'In vierzig Minuten haben wir mit vier Leuten vierundzwanzig Anhänger geschafft. Gruppe A hatte auch vier Leute und hat sechzehn geschafft.'],
        ['Herr Steffen', 'Wie war die Qualität?'],
        ['Ben', 'Bei uns waren fast alle gleich, wegen der Schablone. Nur zwei waren schief gebohrt. Aber ehrlich gesagt: Immer nur schleifen war am Ende ziemlich langweilig.'],
        ['Herr Steffen', 'Darum wechseln Betriebe oft die Stationen. Gut beobachtet!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Schablone? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Vorlage, mit der man immer die gleiche Form anzeichnet', 'ein Werkzeug zum Sägen'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welche vier Stationen hatte Gruppe B?', zeilen: 2, l: 'Anzeichnen mit Schablone, Sägen, Bohren, Schleifen' }, { f: 'Wo gab es einen Stau? Was hat die Gruppe gemacht?', zeilen: 2, l: 'beim Sägen; die Person von der Bohr-Station hat mitgesägt' }, { f: 'Wie viele Anhänger haben Gruppe A und Gruppe B geschafft?', l: 'A: 16, B: 24' }, { f: 'Welchen Nachteil nennt Ben?', l: 'Immer dasselbe (schleifen) wird langweilig.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Würdest du lieber in Einzelfertigung oder in Serienfertigung arbeiten? Warum?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde lieber …, weil …', 'Ein Nachteil ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Einzelfertigung', punkte: ['ein Stück von **Anfang bis Ende**', '**einzigartig**, nach Maß', 'braucht viel **Können und Zeit**'] },
         { titel: 'Serienfertigung', punkte: ['viele **gleiche** Teile', '**Stationen**, Arbeitsteilung', '**Schablonen** und Anschläge', 'schnell, billig – aber oft **eintönig**'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Rechne mit den Zahlen aus dem Hörtext.', stufe: 2, spalten: 2, items: [{ a: 'Gruppe B: 24 Anhänger in 40 Minuten. Wie viele Minuten pro Anhänger?', l: '40 ÷ 24 ≈ 1,7 Minuten' }, { a: 'Gruppe A: 16 Anhänger in 40 Minuten. Wie viele Minuten pro Anhänger?', l: '40 ÷ 16 = 2,5 Minuten' }, { a: 'Wie viele Anhänger mehr hat Gruppe B geschafft? Wie viel Prozent mehr?', l: '8 mehr; 8 von 16 = 50 % mehr' }, { a: 'Die Klasse braucht 60 Anhänger. Wie lange braucht Gruppe B dafür ungefähr?', l: '60 ÷ 24 × 40 = 100 Minuten' }] },
      { art: 'ordnen', auftrag: 'Plane eine Serienfertigung für Holz-Untersetzer. Ordne die Stationen.', stufe: 2, teile: ['Station 1: mit der Schablone anzeichnen', 'Station 2: sägen', 'Station 3: Kanten schleifen', 'Station 4: Fläche schleifen und ölen', 'Station 5: Qualität prüfen und verpacken'], ordnung: [3, 0, 4, 2, 1] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: An welcher Station hast du gearbeitet? Was lief gut, was nicht? Was würdest du verbessern?', stufe: 2,
        anfaenge: ['Ich war an der Station …', 'Gut lief …', 'Ein Problem war …', 'Verbessern würde ich …'], zeilen: 6,
        beispiel: 'Ich war an der Station Bohren. Gut lief, dass ich nach ein paar Stücken sehr schnell war. Ein Problem war, dass ich am Anfang warten musste, weil das Sägen so lange dauerte. Verbessern würde ich, dass zwei Leute sägen und wir nach zwanzig Minuten die Stationen wechseln.' },
    ],
    check: ['Ich erkläre Einzel- und Serienfertigung.', 'Ich arbeite zuverlässig an einer Station.', 'Ich erkenne Vorteile und Nachteile.'],
  },
  // ================================================================ 3
  {
    thema: 'Klar kommunizieren · Missverständnisse', titel: 'Wie bitte? Klar reden in der Werkstatt', untertitel: 'Ein falsches Wort, und schon ist das Brett zehnmal zu kurz. Du lernst, wie man in der Werkstatt klar spricht, nachfragt und Konflikte mit Ich-Botschaften löst.',
    ziel: { de: 'Ich spreche klar, frage nach und löse Konflikte mit Ich-Botschaften.', fr: 'Je parle clairement, je pose des questions et je résous les conflits avec des messages en « je ».' },
    bild: ['finn:verwirrt:stehen', 'amira:wuetend:stehen'],
    start: {
      was: 'Schätze',
      aufgaben: [
        { art: 'mc', auftrag: 'Jemand sagt: „Schneid mir mal ein Stück ab, so 40.“ Was ist das Problem? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man weiß nicht, ob 40 mm oder 40 cm gemeint sind.', 'Es gibt kein Problem.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext', titel: 'Fünf Regeln für klare Absprachen',
      absaetze: [
        '**Genau sagen, was gemeint ist.** Immer mit **Einheit**: „40 Millimeter“, nicht „so 40“. Immer mit **Namen**: „Ben, gib mir bitte den Winkel“, nicht „Kann mir mal jemand …“.',
        '**Nachfragen, wenn etwas unklar ist.** Nachfragen ist kein Zeichen von Schwäche. Es spart Zeit und Material.',
        '**Wiederholen, was man verstanden hat.** „Also: 40 Millimeter lang, 20 breit. Richtig?“ So merkt man Fehler sofort.',
        '**Warnen, bevor es laut oder gefährlich wird.** „Achtung, ich schalte die Maschine ein!“',
        '**Bei Ärger: Ich-Botschaften.** Statt „Du machst immer alles kaputt!“ sagt man: „**Ich** ärgere mich, weil das Teil jetzt zu kurz ist. **Ich** wünsche mir, dass wir die Maße zusammen prüfen.“ Eine Ich-Botschaft beschreibt das Problem und das eigene Gefühl – ohne den anderen anzugreifen.',
      ],
      woerter: [['die Absprache', 'l’accord'], ['die Einheit', 'l’unité'], ['nachfragen', 'demander des précisions'], ['wiederholen', 'répéter'], ['warnen', 'avertir'], ['der Ärger', 'la colère'], ['die Ich-Botschaft', 'le message en « je »'], ['angreifen', 'attaquer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Klar oder unklar? Kreuze an.', stufe: 1, kopf: ['Satz', 'klar', 'unklar'], breiten: [64, 18, 18], zeilen: [['„Gib mir mal das Ding da.“', '', '[x]'], ['„Lea, gib mir bitte die Feinsäge.“', '[x]', ''], ['„Sägt das so ungefähr ab.“', '', '[x]'], ['„Also: 120 mm lang, an der markierten Linie. Richtig?“', '[x]', ''], ['„Achtung, ich bohre jetzt!“', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt', titel: 'Vierzig was?',
      situation: 'Amira braucht für das Regal eine Leiste. Sie bittet Finn, sie abzusägen. Dann kommt Finn mit der Leiste zurück.',
      bild: ['amira:wuetend:stehen', 'finn:verwirrt:stehen'], sprecher: { Amira: 'w2', Finn: 'm3' },
      text: [
        ['Amira', 'Finn, kannst du mir die Leiste auf vierzig absägen?'],
        ['Finn', 'Klar.'],
        ['Finn', 'Hier, fertig.'],
        ['Amira', 'Was ist das denn? Die ist ja winzig! Du machst immer alles falsch!'],
        ['Finn', 'Du hast doch vierzig gesagt! Vierzig Millimeter.'],
        ['Amira', 'Ich meinte vierzig Zentimeter! Jetzt ist die ganze Leiste kaputt.'],
        ['Finn', 'Das ist nicht meine Schuld.'],
        ['Amira', '… Okay, Moment. Ich fange neu an. Ich ärgere mich, weil wir jetzt eine neue Leiste brauchen. Ich habe aber auch keine Einheit gesagt.'],
        ['Finn', 'Und ich hätte nachfragen können. Nächstes Mal sage ich: Also vierzig Millimeter, richtig?'],
        ['Amira', 'Abgemacht. Und ich sage immer die Einheit dazu. Holen wir eine neue Leiste?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Missverständnis? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Zwei Personen verstehen etwas verschieden.', 'Zwei Personen sind sich einig.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Amira hat keine Einheit genannt.', true], ['Finn hat nachgefragt.', false], ['Amira meinte 40 Millimeter.', false], ['Zuerst macht Amira Finn einen Vorwurf.', true], ['Am Ende benutzt Amira eine Ich-Botschaft.', true]] },
        { art: 'fragen', auftrag: 'Was nehmen sich Amira und Finn für das nächste Mal vor?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Finn wiederholt und fragt nach („Also 40 Millimeter, richtig?“); Amira sagt immer die Einheit dazu.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt die Szene nach – aber diesmal ohne Missverständnis.', stufe: 2, karten: [
        { titel: 'Hilfen', text: ['Kannst du mir bitte … auf … Zentimeter …?', 'Also: …, richtig?', 'Genau, danke!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Klar reden', nummern: true, punkte: ['**genau** sagen – mit Einheit und Namen', '**nachfragen**', '**wiederholen**: „Also …, richtig?“', '**warnen**: „Achtung, …!“'] },
         { titel: 'Ich-Botschaft', punkte: ['**Ich** fühle / ärgere mich …', '**weil** … (das Problem)', '**Ich wünsche mir** …', 'kein „**Du** immer …“'] }],
      ],
    },
    ueben: [
      { art: 'fragen', auftrag: 'Mach aus den Du-Vorwürfen Ich-Botschaften.', stufe: 2, fragen: [{ f: '„Du räumst nie dein Werkzeug weg!“', zeilen: 2, l: 'z. B. Ich ärgere mich, weil ich den Hammer suchen muss. Ich wünsche mir, dass wir das Werkzeug gleich zurückhängen.' }, { f: '„Du lässt mich nie an die Bohrmaschine!“', zeilen: 2, l: 'z. B. Ich bin enttäuscht, weil ich auch bohren üben möchte. Ich wünsche mir, dass wir abwechseln.' }, { f: '„Du bist so langsam!“', zeilen: 2, l: 'z. B. Ich mache mir Sorgen, weil wir nur noch zehn Minuten haben. Ich wünsche mir, dass wir zusammen schauen, wie wir schneller werden.' }] },
      { art: 'schneidekarten', auftrag: 'Konflikt-Karten: Zieht eine Karte. Spielt die Situation zu zweit. Löst sie mit klarer Sprache und Ich-Botschaften.', stufe: 3, neueSeite: true, titel: 'Konflikt', icon: 'messages', farbe: TEAM, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Dein Partner hat deine Linie weggeschliffen. Jetzt musst du neu anzeichnen.', frage: 'Was sagst du?' },
          { text: 'Jemand aus deinem Team macht seit 20 Minuten nichts und schaut aufs Handy.', frage: 'Was sagst du?' },
          { text: 'Du hast ein Maß falsch verstanden und ein Teil ist zu kurz.', frage: 'Was sagst du?' },
          { text: 'Zwei Leute wollen beide an die Bohrmaschine. Es gibt nur eine.', frage: 'Wie löst ihr das?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe ein Missverständnis (aus der Schule, vom Sport oder ausgedacht). Wie hätte man es vermeiden können?', stufe: 2,
        anfaenge: ['Einmal …', 'Das Missverständnis war …', 'Vermeiden hätte man es, wenn …'], zeilen: 6,
        beispiel: 'Einmal hat unser Trainer gesagt: „Wir treffen uns um halb.“ Die Hälfte der Mannschaft kam um halb fünf, die andere um halb sechs. Das Missverständnis war, dass er keine Uhrzeit genannt hat. Vermeiden hätte man es, wenn er „um 17:30 Uhr“ gesagt oder jemand nachgefragt hätte.' },
    ],
    check: ['Ich spreche mit Einheit und Namen.', 'Ich frage nach und wiederhole.', 'Ich formuliere Ich-Botschaften.'],
  },
  // ================================================================ 4
  {
    thema: 'Qualität prüfen · Toleranz', titel: 'Gut oder Ausschuss?', untertitel: 'Kein Teil ist ganz genau. Aber es muss genau genug sein. Du lernst, was Toleranz bedeutet, prüfst Teile und suchst die Ursache, wenn Fehler auftreten.',
    ziel: { de: 'Ich prüfe Teile mit Sollmaß und Toleranz und suche Fehlerursachen.', fr: 'Je contrôle des pièces avec la cote nominale et la tolérance et je cherche les causes des défauts.' },
    bild: ['nele:froh:rollstuhl', 'yusuf:besorgt:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Ein Brett soll 120 mm lang sein. Es ist 120,5 mm lang. Ist es gut? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ja, wenn die erlaubte Abweichung groß genug ist.', 'Nein, es muss genau 120,0 mm sein.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext', titel: 'Sollmaß, Istmaß und Toleranz',
      absaetze: [
        'Das **Sollmaß** ist das Maß auf der Zeichnung, zum Beispiel 120 mm. Das **Istmaß** ist das, was man am fertigen Teil misst, zum Beispiel 120,5 mm.',
        'Kein Mensch und keine Maschine arbeitet ganz genau. Darum gibt es die **Toleranz**: Sie sagt, wie viel ein Teil abweichen darf. Steht auf der Zeichnung **120 ± 1**, dann darf das Teil zwischen **119 und 121 mm** lang sein.',
        'Liegt das Istmaß in der Toleranz, ist das Teil **gut**. Liegt es außerhalb, ist es **Ausschuss**. Manchmal kann man Ausschuss **nacharbeiten** – zum Beispiel ein zu langes Teil kürzen. Ein zu kurzes Teil kann man meist nicht mehr retten.',
        '### Ursachen suchen',
        'Wenn mehrere Teile denselben Fehler haben, sucht man die **Ursache**: Ist der Anschlag verrutscht? Ist die Schablone kaputt? Ist das Werkzeug stumpf? Erst wenn die Ursache behoben ist, arbeitet man weiter. Sonst produziert man immer mehr Ausschuss.',
      ],
      woerter: [['die Qualität', 'la qualité'], ['das Sollmaß', 'la cote nominale'], ['das Istmaß', 'la cote réelle'], ['die Toleranz', 'la tolérance'], ['abweichen', 'dévier'], ['der Ausschuss', 'le rebut'], ['nacharbeiten', 'retoucher'], ['die Ursache', 'la cause']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Das Maß auf der Zeichnung heißt [Sollmaß].', 'Das gemessene Maß heißt [Istmaß].', 'Die erlaubte Abweichung heißt [Toleranz].', 'Ein Teil außerhalb der Toleranz ist [Ausschuss].', 'Ein zu langes Teil kann man oft [nacharbeiten].'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Prüfstation', titel: 'Stopp! Alle zu kurz',
      situation: 'Die Klasse fertigt Untersetzer in Serie. Nele ist an der Prüfstation. Plötzlich merkt sie etwas.',
      bild: ['nele:besorgt:rollstuhl', 'yusuf:verwirrt:stehen'], sprecher: { Nele: 'w3', Yusuf: 'm3', 'Herr Steffen': 'm1' },
      text: [
        ['Nele', 'Stopp! Bitte alle kurz aufhören. Die letzten vier Untersetzer sind zu kurz. Sie sollen 120 Millimeter sein, plus minus eins. Die hier haben nur 117.'],
        ['Yusuf', 'Bei mir an der Säge ist alles wie vorher. Ich säge immer am Anschlag.'],
        ['Herr Steffen', 'Gut, dass du gestoppt hast, Nele. Schauen wir uns den Anschlag an.'],
        ['Yusuf', 'Oh. Die Schraube vom Anschlag ist locker. Er ist ein Stück nach vorn gerutscht.'],
        ['Herr Steffen', 'Da haben wir die Ursache. Stell den Anschlag neu ein und zieh die Schraube richtig fest. Dann säg ein Probestück.'],
        ['Yusuf', 'Probestück … 120 Millimeter. Passt.'],
        ['Nele', 'Und die vier kurzen? Die sind Ausschuss, oder?'],
        ['Herr Steffen', 'Für das Schulfest ja. Aber wir werfen sie nicht weg – daraus machen wir kleine Untersetzer für Gläser.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Probestück? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein erstes Teil, mit dem man testet, ob alles richtig eingestellt ist', 'ein Stück Kuchen zum Probieren'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne, was passiert.', stufe: 1, teile: ['Nele misst: Die Teile haben nur 117 statt 120 mm.', 'Nele stoppt die Arbeit.', 'Sie finden die Ursache: Der Anschlag ist gerutscht.', 'Yusuf stellt den Anschlag neu ein.', 'Er sägt ein Probestück: 120 mm.', 'Aus dem Ausschuss werden kleine Untersetzer.'], ordnung: [2, 5, 0, 4, 1, 3] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Nele hat die ganze Klasse gestoppt. War das mutig? Was hätte passieren können, wenn sie nichts gesagt hätte?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, Nele …', 'Wenn sie nichts gesagt hätte, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Maße', punkte: ['**Sollmaß**: auf der Zeichnung', '**Istmaß**: gemessen', '**Toleranz**: erlaubte Abweichung', '**120 ± 1** = 119 bis 121 mm'] },
         { titel: 'Bei Fehlern', nummern: true, punkte: ['**stoppen**', '**Ursache** suchen', 'Ursache **beheben**', '**Probestück** prüfen', 'weiterarbeiten'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Sollmaß 120 ± 1 mm. Die Prüfstation hat fünf Teile gemessen. Welche sind gut, welche Ausschuss? Was kann man nacharbeiten?', stufe: 2, html: '<div class="voll">' + toleranz({ soll: 120, tol: 1, werte: [['A', 119.5], ['B', 121.5], ['C', 120], ['D', 118], ['E', 120.5]] }) + '</div>',
        liste: [['A (119,5 mm)', 'gut'], ['B (121,5 mm)', 'Ausschuss – zu lang, kann man nacharbeiten'], ['C (120 mm)', 'gut'], ['D (118 mm)', 'Ausschuss – zu kurz'], ['E (120,5 mm)', 'gut']], spalten: 1 },
      { art: 'tabelle', auftrag: 'Prüfprotokoll: Ein Brett soll 80 ± 0,5 mm breit sein. Trage ein: gut oder Ausschuss?', stufe: 3, kopf: ['Teil', 'Istmaß', 'gut', 'Ausschuss'], breiten: [16, 28, 28, 28], zeilen: [['1', '80,2 mm', '[x]', ''], ['2', '79,4 mm', '', '[x]'], ['3', '80,5 mm', '[x]', ''], ['4', '81,0 mm', '', '[x]'], ['5', '79,8 mm', '[x]', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Warum ist Qualität so wichtig – für die Firma und für die Kunden? Schreibe mit einem Beispiel.', stufe: 3,
        anfaenge: ['Qualität ist wichtig, weil …', 'Für die Kunden …', 'Für die Firma …', 'Ein Beispiel: …'], zeilen: 6,
        beispiel: 'Qualität ist wichtig, weil Teile sonst nicht passen oder kaputtgehen. Für die Kunden heißt gute Qualität, dass sie sich auf das Produkt verlassen können. Für die Firma heißt es weniger Ausschuss und zufriedene Kunden, die wiederkommen. Ein Beispiel: Wenn bei einem Stuhl ein Bein zu kurz ist, wackelt er und niemand kauft ihn.' },
    ],
    check: ['Ich erkläre Sollmaß, Istmaß und Toleranz.', 'Ich entscheide: gut oder Ausschuss.', 'Ich suche bei Fehlern die Ursache.'],
  },
  // ================================================================ 5
  {
    thema: 'Feedback geben und annehmen', titel: 'Feedback, das hilft', untertitel: 'Rückmeldungen helfen, besser zu werden – wenn sie fair sind. Du lernst Feedback-Regeln, hörst zwei sehr verschiedene Rückmeldungen und übst, Feedback zu geben und anzunehmen.',
    ziel: { de: 'Ich gebe faires Feedback und nehme Feedback an.', fr: 'Je donne un feedback juste et j’accepte les retours.' },
    bild: ['chloe:froh:stehen', 'tom:verlegen:stehen'],
    start: {
      was: 'Wie fühlt sich das an?',
      aufgaben: [
        { art: 'mc', auftrag: 'Jemand sagt zu deinem Werkstück: „Sieht schlecht aus.“ Wie hilfreich ist das? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['gar nicht hilfreich – ich weiß nicht, was ich ändern soll', 'sehr hilfreich'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext', titel: 'Regeln für gutes Feedback',
      absaetze: [
        '**Feedback** heißt Rückmeldung. Gutes Feedback hilft dem anderen, besser zu werden. Es hat drei Teile:',
        '**Was ist gut?** Zuerst sagt man, was gelungen ist – ehrlich und genau. „Die Kanten sind ganz glatt.“',
        '**Was kann besser werden?** Dann sagt man, was man ändern könnte – **konkret** und **freundlich**. Nicht „Das ist schlecht“, sondern „Die Biegung ist etwas schief. Vielleicht hilft es, mit dem Winkel zu prüfen.“',
        '**Ein Tipp oder eine Frage.** Zum Schluss ein Vorschlag oder eine Frage. „Wie hast du die Oberfläche so glatt bekommen?“',
        '### Feedback annehmen',
        'Feedback anzunehmen ist manchmal schwer. Hilfreich ist: **zuhören**, nicht sofort verteidigen. **Nachfragen**, wenn etwas unklar ist. Und **danke** sagen. Danach entscheidest du selbst, was du davon umsetzt.',
      ],
      woerter: [['das Feedback', 'le retour, le feedback'], ['gelungen', 'réussi'], ['konkret', 'concret'], ['freundlich', 'aimable'], ['der Vorschlag', 'la proposition'], ['annehmen', 'accepter'], ['verteidigen', 'défendre'], ['umsetzen', 'mettre en œuvre']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge gibt man gutes Feedback? Ordne.', stufe: 1, teile: ['Was ist gut?', 'Was kann besser werden?', 'Ein Tipp oder eine Frage'], ordnung: [1, 2, 0] },
      ],
    },
    hoeren: {
      was: 'Zwei Rückmeldungen', wo: 'Werkstatt · Abschlussrunde', titel: 'Zweimal Feedback für Tom',
      situation: 'Tom zeigt sein Schlüsselbrett. Zwei Mitschülerinnen geben ihm eine Rückmeldung. Hör genau: Was ist der Unterschied?',
      bild: ['tom:verlegen:stehen', 'chloe:froh:stehen'], sprecher: { Tom: 'm3', Jana: 'w2', Chloé: 'w3' },
      text: [
        ['Tom', 'Das ist mein Schlüsselbrett. Es hat fünf Haken.'],
        ['Jana', 'Hm. Die Haken sind schief. Und die Farbe ist irgendwie hässlich. Meins ist besser.'],
        ['Tom', '… Okay.'],
        ['Chloé', 'Darf ich auch? Mir gefällt, dass die Kanten so schön rund geschliffen sind. Und die Idee mit dem kleinen Ablagebrett oben finde ich super – da kann man Post hinlegen.'],
        ['Chloé', 'Was mir aufgefallen ist: Die Haken haben nicht ganz den gleichen Abstand. Vielleicht hilft es, die Löcher mit dem Lineal anzuzeichnen, bevor du bohrst.'],
        ['Chloé', 'Und eine Frage: Womit hast du das Holz gefärbt? Das sieht interessant aus.'],
        ['Tom', 'Mit Tee! Danke, Chloé. Das mit dem Lineal mache ich beim nächsten Mal.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Schlüsselbrett? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Brett mit Haken an der Wand, für Schlüssel', 'ein Spiel mit Schlüsseln'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Vergleiche die beiden Rückmeldungen.', stufe: 2, kopf: ['', 'Jana', 'Chloé'], breiten: [30, 35, 35], zeilen: [['Was ist gut?', '[nichts]', '[runde Kanten, Ablagebrett]'], ['Was kann besser werden?', '[„schief“, „hässlich“ – nicht konkret]', '[Abstand der Haken ungleich]'], ['Tipp oder Frage', '[keiner; „Meins ist besser“]', '[mit Lineal anzeichnen; Frage nach der Farbe]'], ['Wie reagiert Tom?', '[still, „Okay“]', '[bedankt sich, will es umsetzen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum hilft Chloés Feedback mehr als Janas? Wie hätte Jana es besser sagen können?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Chloés Feedback hilft, weil …', 'Jana hätte sagen können: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Feedback geben', nummern: true, punkte: ['**Was ist gut?** – ehrlich, genau', '**Was kann besser werden?** – konkret, freundlich', '**Tipp oder Frage**'] },
         { titel: 'Feedback annehmen', punkte: ['**zuhören**, nicht sofort verteidigen', '**nachfragen**', '**danke** sagen', 'selbst entscheiden, was du **umsetzt**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Feedback-Karten: Legt eine Karte neben jedes Werkstück. Jede Person schreibt auf mindestens zwei Karten eine Rückmeldung.', stufe: 2, neueSeite: true, titel: 'Feedback', icon: 'message-heart', farbe: FEED, spalten: 2,
        karten: [
          { text: '**Gut gelungen ist …**', linien: 2 }, { text: '**Gut gelungen ist …**', linien: 2 },
          { text: '**Besser werden kann …**', linien: 2 }, { text: '**Besser werden kann …**', linien: 2 },
          { text: '**Mein Tipp / meine Frage: …**', linien: 2 }, { text: '**Mein Tipp / meine Frage: …**', linien: 2 },
        ] },
      { art: 'fragen', auftrag: 'Verbessere das Feedback. Schreibe es nach den drei Regeln neu.', stufe: 3, fragen: [{ f: '„Dein Vogelhaus ist total schief. Das kann ja jeder.“', zeilen: 3, l: 'z. B. Mir gefällt die Farbe vom Dach. Das Haus steht etwas schief – vielleicht sind die Seitenwände nicht gleich lang? Hast du sie vor dem Leimen nachgemessen?' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Denk an ein Feedback, das du bekommen hast (in der Schule, im Sport, im Praktikum – oder ausgedacht). Was hat dir geholfen? Was nicht?', stufe: 2,
        anfaenge: ['Ich habe einmal Feedback bekommen zu …', 'Geholfen hat mir …', 'Nicht geholfen hat …', 'Ich habe daraus gelernt …'], zeilen: 6,
        beispiel: 'Ich habe einmal Feedback zu meinem Referat bekommen. Geholfen hat mir, dass meine Lehrerin genau gesagt hat, dass ich zu schnell spreche. Nicht geholfen hat ein Mitschüler, der nur „langweilig“ gesagt hat. Ich habe daraus gelernt, langsamer zu sprechen und Pausen zu machen.' },
    ],
    check: ['Ich gebe Feedback in drei Schritten.', 'Ich bleibe dabei konkret und freundlich.', 'Ich nehme Feedback an und frage nach.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Unser Stand beim Schulfest', titel: 'Unser Stand beim Schulfest', untertitel: 'Zum Schluss arbeitet die ganze Klasse zusammen: Ihr verkauft eure Werkstücke beim Schulfest. Ihr plant den Stand, rechnet Preise aus, übt das Verkaufsgespräch und stellt euer Projekt vor.',
    ziel: { de: 'Ich plane mit dem Team einen Verkaufsstand, rechne Preise und präsentiere unser Projekt.', fr: 'Avec l’équipe, je planifie un stand de vente, je calcule les prix et je présente notre projet.' },
    bild: ['amira:froh:stehen-zeigen', 'ben:froh:blatt'],
    start: {
      was: 'Ideen sammeln',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was braucht ein guter Verkaufsstand? Sammelt Ideen.', stufe: 1, mitte: 'Unser Stand', aeste: ['Produkte', { l: 'Preisschilder' }, { l: 'Plakat' }, { l: 'Wechselgeld' }, { l: 'Dienstplan' }, { l: 'Deko' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Projekt-Anleitung', titel: 'Den richtigen Preis finden',
      absaetze: [
        'Bevor ihr verkauft, müsst ihr wissen: **Was kostet uns ein Stück?** Dazu rechnet ihr alle **Materialkosten** zusammen: Holz, Schrauben, Lack, Schleifpapier. Dann teilt ihr durch die Anzahl der Stücke.',
        '**Beispiel:** Für 20 Untersetzer kostet das Holz 12 €, das Öl 4 € und das Schleifpapier 2 €. Das sind zusammen **18 €**. Ein Untersetzer kostet also 18 € geteilt durch 20, das sind **90 Cent**.',
        'Der **Verkaufspreis** muss **höher** sein als die Kosten. Sonst macht ihr Verlust. Er darf aber auch nicht zu hoch sein, sonst kauft niemand. Schaut, was ähnliche Dinge im Geschäft kosten.',
        'Der **Gewinn** ist: Einnahmen minus Kosten. Verkauft ihr die 20 Untersetzer für je 3 €, nehmt ihr 60 € ein. Der Gewinn ist 60 € minus 18 €, also **42 €**. Überlegt vorher gemeinsam, was mit dem Gewinn passiert: zum Beispiel neues Material, ein Klassenausflug oder eine Spende.',
      ],
      woerter: [['der Verkaufsstand', 'le stand de vente'], ['die Kosten', 'les coûts'], ['der Verkaufspreis', 'le prix de vente'], ['die Einnahmen', 'les recettes'], ['der Gewinn', 'le bénéfice'], ['der Verlust', 'la perte'], ['das Wechselgeld', 'la monnaie'], ['die Spende', 'le don']],
      aufgaben: [
        { art: 'rechnen', auftrag: 'Rechne wie im Beispiel.', stufe: 2, spalten: 2, items: [{ a: '15 Schlüsselanhänger: Material kostet zusammen 7,50 €. Was kostet ein Anhänger?', l: '7,50 € ÷ 15 = 0,50 €' }, { a: 'Ihr verkauft jeden Anhänger für 2 €. Wie viel nehmt ihr ein, wenn alle verkauft werden?', l: '15 × 2 € = 30 €' }, { a: 'Wie hoch ist der Gewinn?', l: '30 € − 7,50 € = 22,50 €' }, { a: 'Nur 10 Anhänger werden verkauft. Wie hoch ist der Gewinn jetzt?', l: '20 € − 7,50 € = 12,50 €' }] },
      ],
    },
    hoeren: {
      was: 'Ein Verkaufsgespräch', wo: 'Schulfest · am Stand', titel: 'Darf ich Ihnen etwas zeigen?',
      situation: 'Am Stand der Klasse bleibt eine Frau stehen. Amira verkauft. Achte darauf, wie sie mit der Kundin spricht.',
      bild: ['amira:froh:stehen-zeigen', 'oma:froh:stehen'], sprecher: { Amira: 'w2', Kundin: 'w1' },
      text: [
        ['Amira', 'Guten Tag! Darf ich Ihnen etwas zeigen? Das alles haben wir selbst in der Werkstatt gebaut.'],
        ['Kundin', 'Oh, schön. Was ist das hier?'],
        ['Amira', 'Das ist ein Handyständer aus Aluminium. Wir haben ihn selbst gebogen und geschliffen. Er kostet 4 Euro.'],
        ['Kundin', 'Und die Untersetzer aus Holz?'],
        ['Amira', 'Die sind aus Buche und mit Öl behandelt, so sind sie vor Wasser geschützt. Man kann auch eine heiße Tasse daraufstellen. Einer kostet 3 Euro, vier zusammen 10 Euro.'],
        ['Kundin', 'Dann nehme ich vier Untersetzer. Ich habe nur einen Zwanzig-Euro-Schein.'],
        ['Amira', 'Kein Problem. Das macht 10 Euro. Sie bekommen 10 Euro zurück. Möchten Sie eine Tüte?'],
        ['Kundin', 'Nein danke, das passt in meine Tasche. Und wofür ist das Geld?'],
        ['Amira', 'Wir kaufen davon neues Material für die Werkstatt. Vielen Dank und noch einen schönen Tag!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Kundin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Person, die etwas kauft', 'eine Person, die etwas verkauft'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was kostet ein Handyständer?', l: '4 Euro' }, { f: 'Was kostet ein Untersetzer? Was kosten vier?', l: '3 Euro; vier zusammen 10 Euro' }, { f: 'Wie viel Wechselgeld bekommt die Kundin?', l: '10 Euro' }, { f: 'Wofür ist das Geld?', l: 'für neues Material für die Werkstatt' }] },
        { art: 'mc', auftrag: 'Was macht Amira gut? Kreuze alles Richtige an.', stufe: 2, fragen: [{ f: '', o: ['Sie grüßt freundlich.', 'Sie erklärt, wie die Produkte gemacht sind.', 'Sie nennt klare Preise.', 'Sie drängt die Kundin, mehr zu kaufen.'], r: [0, 1, 2] }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt Verkaufsgespräche zu zweit: Einer verkauft, einer kauft. Dann tauschen.', stufe: 2, karten: [
        { titel: 'Verkaufen', text: ['Guten Tag! Darf ich Ihnen … zeigen?', 'Das ist … Es kostet …', 'Das macht … Sie bekommen … zurück.', 'Vielen Dank, einen schönen Tag!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Preis rechnen', nummern: true, punkte: ['**Materialkosten** addieren', 'durch **Anzahl** teilen = Kosten pro Stück', '**Verkaufspreis** höher als die Kosten', '**Gewinn** = Einnahmen − Kosten'] },
         { titel: 'Am Stand', punkte: ['freundlich **grüßen**', 'Produkt **erklären**', 'klare **Preise**, Wechselgeld prüfen', '**danke** sagen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Unser Dienstplan für das Schulfest: Wer macht wann was? Tragt Namen ein.', stufe: 1, kopf: ['Uhrzeit', 'Verkauf', 'Kasse', 'Auffüllen und Ordnung'], breiten: [19, 27, 27, 27], zeilen: [['14:00–14:30', '', '', ''], ['14:30–15:00', '', '', ''], ['15:00–15:30', '', '', ''], ['15:30–16:00', '', '', ''], ['Abbau', '', '', '']] },
      { art: 'fragen', auftrag: 'Projekt-Präsentation: Bereitet eine kurze Vorstellung eures Projekts für die Klasse oder die Eltern vor.', stufe: 3, fragen: [{ f: 'Was haben wir gemacht? (Produkte, Stationen, Rollen)', zeilen: 2, l: 'Individuell' }, { f: 'Was hat gut geklappt?', zeilen: 2, l: 'Individuell' }, { f: 'Was war schwierig, und wie haben wir es gelöst?', zeilen: 2, l: 'Individuell' }, { f: 'Was haben wir verkauft und eingenommen? Was passiert mit dem Gewinn?', zeilen: 2, l: 'Individuell' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Was war deine Rolle beim Schulfest-Projekt? Was hast du über Teamarbeit gelernt?', stufe: 2,
        anfaenge: ['Meine Rolle war …', 'Am besten hat geklappt …', 'Schwierig war …', 'Über Teamarbeit habe ich gelernt, …'], zeilen: 7,
        beispiel: 'Meine Rolle war Kasse. Am besten hat geklappt, dass wir einen klaren Dienstplan hatten und niemand zu lange stehen musste. Schwierig war das Wechselgeld, wenn viele Leute gleichzeitig kamen. Über Teamarbeit habe ich gelernt, dass es leichter geht, wenn jeder seine Aufgabe kennt und man sich gegenseitig hilft.' },
    ],
    check: ['Ich rechne Kosten, Preis und Gewinn.', 'Ich führe ein freundliches Verkaufsgespräch.', 'Ich stelle ein Teamprojekt vor.'],
  },
]
