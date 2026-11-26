// Deutsch · Modul 6 „Arbeit, Beruf und Jugendsprache“ (Voie de préparation, B1) – multimodales Heft.
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 6: Arbeit und Beruf, Lebenslauf, Sprache von Jugendlichen; Berufsprofile, Praktikumsangebote,
// Sicherheitshinweise, Anweisungen, Betrieb vorstellen, Erfahrungsberichte, Brieffreundschaft, Praktikumsbericht,
// Interview mit Fragebogen, Betriebsbesichtigung organisieren, Lernjournal; Passiv mit werden und man, weil- und
// da-Sätze, deshalb/daher, wenn–dann; Definitionen, Ober- und Unterbegriffe, Organigramm.
// Alle Texte selbst geschrieben; Personen und Betriebe ausgedacht. Fakten (DAP/CCP, Sicherheit) bewusst einfach gehalten.

export const MODUL = {
  id: 'deutsch-m6', kuerzel: 'de6', nr: 6, sprache: 'de', niveau: 'B1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-6',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Arbeit, Beruf und Jugendsprache', fr: 'Travail, métiers et langage des jeunes' },
  untertitel: { de: 'Berufe entdecken, einen Betrieb kennenlernen, sicher arbeiten, ein Praktikum finden, einen Lebenslauf schreiben – und über Jugendsprache nachdenken.', fr: 'Découvrir des métiers, connaître une entreprise, travailler en sécurité, trouver un stage, écrire un CV – et réfléchir au langage des jeunes.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['amira:froh:stehen-zeigen', 'chef:froh:stehen', 'sami:froh:laessig'],
  blasen: [{ t: 'Mein Traumjob?', x: 12, y: 112 }, { t: 'Willkommen!', x: 126, y: 100 }, { t: 'Krass!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Berufe und Betriebe', fr: 'Métiers et entreprises' }, icon: 'briefcase', lektionen: 3 },
    { titel: { de: 'Praktikum und Lebenslauf', fr: 'Stage et CV' }, icon: 'file-cv', lektionen: 3 },
    { titel: { de: 'Jugendsprache und Zukunft', fr: 'Langage des jeunes et avenir' }, icon: 'messages', lektionen: 2 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'Modul 6 ist ein Schritt in Richtung Beruf. Viele Aufgaben helfen dir, ein Praktikum zu finden. Persönliches schreibst du nur, wenn du willst – eine ausgedachte Person ist immer erlaubt.',
  ],
  // nur für die Vorlese-Stimme (Python-Regex)
  aussprache: {
    '(\\w+)/in\\b': '\\1 oder \\1in', '\\bJob\\b': 'Dschopp', '\\bJobs\\b': 'Dschopps', '(?i)\\bcringe\\b': 'krindsch', '\\bchill': 'tschill',
    '\\bHip-Hop\\b': 'Hipp-Hopp', '\\bKickflips\\b': 'Kickflipps', '\\bKickflip\\b': 'Kickflipp', '\\bGrinds\\b': 'Graindz', '\\bsafe\\b': 'seif',
    '\\bStd\\.(?=\\s+[A-ZÄÖÜ]|$)': 'Stunden.', '\\bWo\\.(?=\\s+[A-ZÄÖÜ]|$)': 'Wochen.', '\\bsof\\.(?=\\s+[A-ZÄÖÜ]|$)': 'sofort.',
    '\\bStd\\.': 'Stunden', '\\bWo\\.': 'Wochen', '\\bMo\\.': 'Montag', '\\bFr\\.': 'Freitag', '\\bsof\\.': 'sofort', '\\bca\\.': 'circa',
    '\\bTel\\.': 'Telefon', ' ?\\(m/w/d\\)': '', '\\bDAP\\b': 'De A Pe', '\\bCCP\\b': 'Ze Ze Pe', '\\bDr\\.': 'Doktor',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Berufe · weil, da, deshalb', titel: 'Was willst du werden?', untertitel: 'Drei Berufe, ein Gespräch bei der Berufsberatung und viele Gründe: Du sagst, was du werden möchtest – und warum.',
    ziel: { de: 'Ich verstehe Berufsprofile und begründe meinen Berufswunsch.', fr: 'Je comprends des profils de métiers et je justifie mon choix.' },
    bild: ['tom:froh:blatt', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Berufe',
      aufgaben: [
        { art: 'symbole', auftrag: 'Welcher Beruf ist das? Schreib das Wort.', stufe: 1, woerter: ['Koch / Köchin', 'Elektriker/in', 'Mechatroniker/in', 'Friseur/in', 'Pflegehelfer/in', 'Bäcker/in', 'Gärtner/in', 'Informatiker/in'],
          symbole: [['chef-hat', 'Koch / Köchin'], ['bolt', 'Elektriker/in'], ['car', 'Mechatroniker/in'], ['scissors', 'Friseur/in'], ['stethoscope', 'Pflegehelfer/in'], ['bread', 'Bäcker/in'], ['plant', 'Gärtner/in'], ['device-laptop', 'Informatiker/in']] },
      ],
    },
    lesen: {
      was: 'Drei Berufsprofile', art: 'profile', stimme: 'w1',
      quelle: 'Berufe-Heft für Jugendliche', titel: 'Drei Berufe im Porträt',
      profile: [
        { name: 'Mechatroniker/in für Autos', bild: 'sami:froh:stehen', stimme: 'm1', text: 'Du reparierst Autos und Motorräder und suchst Fehler mit dem Computer. Du arbeitest in einer Werkstatt, oft mit den Händen. **Wichtig:** Interesse an Technik, gute Augen, Geduld. **Ausbildung:** 3 Jahre (DAP), in der Schule und im Betrieb.' },
        { name: 'Koch / Köchin', bild: 'amira:froh:stehen', stimme: 'w2', text: 'Du bereitest Speisen zu – im Restaurant, im Hotel oder in einer Kantine. Oft arbeitest du abends und am Wochenende. **Wichtig:** Teamgeist, Sauberkeit, du kannst schnell arbeiten. **Ausbildung:** 3 Jahre (DAP oder CCP).' },
        { name: 'Pflegehelfer/in', bild: 'lea:froh:stehen', stimme: 'w1', text: 'Du hilfst kranken oder alten Menschen, zum Beispiel beim Essen oder beim Waschen. Du arbeitest im Altersheim, im Krankenhaus oder bei den Leuten zu Hause. **Wichtig:** Geduld, Freundlichkeit, du hörst gut zu. **Ausbildung:** 3 Jahre (DAP).' },
      ],
      woerter: [['der Beruf', 'le métier'], ['reparieren', 'réparer'], ['die Werkstatt', 'l’atelier'], ['die Geduld', 'la patience'], ['die Ausbildung', 'la formation'], ['der Betrieb', 'l’entreprise'], ['zubereiten', 'préparer'], ['das Altersheim', 'la maison de retraite']],
      aufgaben: [
        { art: 'wer', auftrag: 'Welcher Beruf passt? Kreuze an (manchmal mehrere).', stufe: 1, personen: ['Mechatronik', 'Koch', 'Pflege'], saetze: [['Man arbeitet oft abends und am Wochenende.', 'Koch'], ['Man sucht Fehler mit dem Computer.', 'Mechatronik'], ['Man hilft beim Essen und Waschen.', 'Pflege'], ['Man braucht Geduld.', ['Mechatronik', 'Pflege']], ['Die Ausbildung dauert 3 Jahre.', ['Mechatronik', 'Koch', 'Pflege']]] },
        { art: 'fragen', auftrag: 'Welcher der drei Berufe passt am besten zu dir? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Koch passt am besten zu mir, weil ich gern koche und gut im Team arbeite.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch bei der Berufsberatung', wo: 'Berufsberatung', titel: 'Was passt zu mir?',
      situation: 'Tom hat einen Termin bei der Berufsberatung. Frau Kremer fragt ihn nach seinen Stärken und Wünschen.',
      bild: ['lehrerin:froh:erklaeren', 'tom:verwirrt'], sprecher: { 'Frau Kremer': 'w1', Tom: 'm3' },
      text: [
        ['Frau Kremer', 'Hallo Tom, setz dich. Hast du schon eine Idee, was du später machen möchtest?'],
        ['Tom', 'Ehrlich gesagt, nicht so richtig. Ich weiß nur, dass ich nicht den ganzen Tag im Büro sitzen will.'],
        ['Frau Kremer', 'Das ist schon ein wichtiger Hinweis. Was machst du in deiner Freizeit gern?'],
        ['Tom', 'Ich repariere oft Fahrräder, für mich und für meine Freunde. Da ich gern mit den Händen arbeite, macht mir das Spaß.'],
        ['Frau Kremer', 'Sehr gut. Und in der Schule? Welche Fächer magst du?'],
        ['Tom', 'Mathe ist okay. Deutsch finde ich schwer, deshalb übe ich viel.'],
        ['Frau Kremer', 'Hast du schon einmal an Mechatroniker gedacht? Da repariert man Autos und Motorräder.'],
        ['Tom', 'Nein, aber das klingt interessant! Kann ich das mal ausprobieren?'],
        ['Frau Kremer', 'Ja, mit einem Praktikum. Wenn du willst, suchen wir zusammen einen Betrieb.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was fragt man bei der Berufsberatung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Was machst du gern?', 'Welche Fächer magst du?', 'Was ist deine Lieblingsfarbe?'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Tom weiß schon genau, was er werden will.', false], ['Tom will nicht den ganzen Tag im Büro sitzen.', true], ['Tom repariert in seiner Freizeit Fahrräder.', true], ['Deutsch findet Tom leicht.', false], ['Tom kann den Beruf in einem Praktikum ausprobieren.', true]] },
        { art: 'fragen', auftrag: 'Warum macht Tom das Reparieren Spaß?', stufe: 2, fragen: [{ f: '', l: 'Weil er gern mit den Händen arbeitet.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt ein Gespräch bei der Berufsberatung. Tauscht danach die Rollen.', stufe: 3, karten: [
        { titel: 'Berater/in', text: ['Was machst du gern?', 'Was kannst du gut?', 'Hast du schon an … gedacht?'] },
        { titel: 'Jugendliche/r', text: ['Ich möchte … werden, weil …', 'Da ich gern …, …', 'Ich kann gut …, deshalb …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gründe nennen: weil und da', punkte: ['Ich möchte Koch werden, **weil** ich gern **koche**.', '**Da** ich gern mit den Händen **arbeite**, macht mir das Spaß.', 'Nach **weil** und **da**: Verb **am Ende**.', '**Da** steht oft am Satzanfang.'] },
         { titel: 'Folgen nennen: deshalb, daher', punkte: ['Deutsch ist schwer. **Deshalb übe** ich viel.', 'Ich mag Technik. **Daher interessiere** ich mich für Autos.', 'Nach **deshalb** und **daher**: Verb an **Position 2**.'] }],
        [{ art: 'tipp', titel: 'Ausbildung in Luxemburg', text: '**DAP**: Berufsdiplom, meist 3 Jahre. **CCP**: Berufsabschluss mit mehr Praxis, auch 3 Jahre. Du lernst in der **Schule** und im **Betrieb**.' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 4)', text: 'weil-Sätze kennst du schon: Ich bleibe zu Hause, **weil** ich krank **bin**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze weil, da oder deshalb.', stufe: 1, woerter: ['weil', 'Da', 'deshalb', 'Deshalb'], saetze: ['Ich möchte Gärtnerin werden, [weil] ich gern draußen bin.', '[Da] Sami gut mit Computern ist, will er Informatiker werden.', 'Lea ist sehr geduldig, [deshalb] passt die Pflege gut zu ihr.', 'Ich koche gern. [Deshalb] mache ich ein Praktikum in einer Küche.'] },
      { art: 'abschreiben', auftrag: 'Verbinde die Sätze. Benutze das Wort in Klammern.', stufe: 2, kopf: ['zwei Sätze', 'ein Satz'], saetze: [['Ich arbeite gern mit Menschen. Ich will Pflegehelfer werden. (weil)', 'Ich will Pflegehelfer werden, weil ich gern mit Menschen arbeite.'], ['Ich bin oft müde. Ich gehe früh ins Bett. (deshalb)', 'Ich bin oft müde. Deshalb gehe ich früh ins Bett.'], ['Ich mag Tiere. Ich mache ein Praktikum im Tierheim. (da)', 'Da ich Tiere mag, mache ich ein Praktikum im Tierheim.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreib einen Beruf, der dich interessiert, und begründe deine Wahl. Es darf auch ein Beruf sein, den du einfach spannend findest.', stufe: 2,
        anfaenge: ['Ich interessiere mich für den Beruf …', 'In diesem Beruf …', 'Ich glaube, er passt zu mir, weil …', 'Ich kann gut …, deshalb …', 'Zuerst möchte ich …'], zeilen: 10,
        beispiel: 'Ich interessiere mich für den Beruf Gärtnerin. In diesem Beruf pflanzt man Blumen und Bäume und pflegt Gärten. Ich glaube, er passt zu mir, weil ich gern draußen bin. Ich kann gut mit Pflanzen umgehen, deshalb helfe ich oft im Schulgarten. Zuerst möchte ich ein Praktikum machen.' },
    ],
    check: ['Ich verstehe Berufsprofile.', 'Ich verstehe ein Gespräch bei der Berufsberatung.', 'Ich nenne Gründe mit weil und da.', 'Ich nenne Folgen mit deshalb und daher.', 'Ich beschreibe einen Beruf, der mich interessiert.'],
  },
  // ================================================================ 2
  {
    thema: 'Ein Betrieb · Passiv', titel: 'Hier wird gebacken!', untertitel: 'Eine Bäckerei stellt sich vor: Du liest, wie dort gearbeitet wird, liest ein Organigramm, hörst eine Führung – und lernst das Passiv.',
    ziel: { de: 'Ich verstehe, wie ein Betrieb arbeitet, und beschreibe Abläufe im Passiv.', fr: 'Je comprends le fonctionnement d’une entreprise et je décris des étapes au passif.' },
    bild: ['chef:froh:erklaeren', 'nele:ueberrascht'],
    start: {
      was: 'Im Betrieb',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer oder was ist das? Verbinde.', stufe: 1, links: ['der Chef / die Chefin', 'der Lehrling', 'die Kundin', 'der Kollege', 'die Abteilung'], rechts: ['leitet den Betrieb', 'lernt einen Beruf im Betrieb', 'kauft etwas', 'arbeitet mit mir zusammen', 'ein Teil vom Betrieb, z. B. der Verkauf'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Betrieb stellt sich vor', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Infoblatt für Praktikantinnen und Praktikanten', titel: 'Bäckerei Weber – seit 1952 in Mersch',
      absaetze: [
        'Die **Bäckerei Weber** ist ein Familienbetrieb. Hier arbeiten 18 Menschen in drei Abteilungen: in der **Backstube**, in der **Konditorei** und im **Verkauf**. Dazu kommt ein kleines Büro.',
        'In der Backstube beginnt die Arbeit schon um **3 Uhr** in der Nacht. Zuerst **wird** der Teig **geknetet**. Dann **werden** die Brote **geformt**. Um 5 Uhr **werden** sie in den Ofen **geschoben**.',
        'In der Konditorei **werden** Kuchen und Torten **gemacht**. Für Geburtstage und Hochzeiten **werden** Torten auch nach Wunsch **dekoriert**.',
        'Ab 6 Uhr **wird** im Laden **verkauft**. Am Mittag **werden** auch Sandwiches **angeboten**. Abends **wird** alles gründlich **geputzt**.',
        'Jedes Jahr **werden** bei uns zwei **Lehrlinge** ausgebildet. Interesse? Melde dich für ein Praktikum!',
      ],
      woerter: [['der Familienbetrieb', 'l’entreprise familiale'], ['die Abteilung', 'le service'], ['die Backstube', 'le fournil'], ['der Teig', 'la pâte'], ['kneten', 'pétrir'], ['der Ofen', 'le four'], ['dekorieren', 'décorer'], ['ausbilden', 'former']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Arbeit in der Backstube beginnt um 3 Uhr.', true], ['Die Brote werden um 7 Uhr in den Ofen geschoben.', false], ['Torten werden auch nach Wunsch dekoriert.', true], ['Die Bäckerei bildet keine Lehrlinge aus.', false]] },
        { art: 'frei', auftrag: 'Das ist das Organigramm der Bäckerei. Lies es genau.', stufe: 2, html: '<div style="display:grid;gap:0;font-size:11.5pt;line-height:1.35;text-align:center"><div style="justify-self:center;border:0.5mm solid var(--f);border-radius:3mm;padding:2mm 7mm;background:var(--f-zart)"><b>Chefin</b><br>Frau Weber</div><div style="justify-self:center;width:0.5mm;height:5mm;background:var(--f)"></div><div style="margin:0 12%;height:5mm;border:0.5mm solid var(--f);border-bottom:0;border-radius:2mm 2mm 0 0"></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3mm">' +
          [['Backstube', 'Bäckermeister Herr Laurent<br>3 Bäcker<br>1 Lehrling'], ['Konditorei', 'Konditorin Frau Sommer<br>1 Lehrling'], ['Verkauf', 'Filialleiterin<br>8 Verkäuferinnen und Verkäufer'], ['Büro', 'Frau Becker<br>Bestellungen und Rechnungen']]
            .map(([t, x]) => `<div style="border:0.35mm solid var(--rahmen);border-radius:3mm;padding:2.5mm 2mm;background:#fff"><b style="color:var(--f)">${t}</b><br>${x}</div>`).join('') + '</div></div>' },
        { art: 'fragen', auftrag: 'Beantworte die Fragen zum Organigramm.', stufe: 2, fragen: [{ f: 'Wer leitet die Backstube?', l: 'Herr Laurent, der Bäckermeister' }, { f: 'In welchen Abteilungen gibt es Lehrlinge?', l: 'in der Backstube und in der Konditorei' }, { f: 'Wer schreibt die Rechnungen?', l: 'Frau Becker im Büro' }] },
      ],
    },
    hoeren: {
      was: 'Eine Führung durch den Betrieb', wo: 'Bäckerei Weber · Führung', titel: 'Willkommen in der Backstube!',
      situation: 'Nele und ihre Klasse besichtigen die Bäckerei. Herr Laurent zeigt die Backstube und erklärt die Arbeit.',
      bild: ['chef:froh:erklaeren', 'nele:ueberrascht'], sprecher: { 'Herr Laurent': 'm2', Nele: 'w2', Yusuf: 'm3' },
      text: [
        ['Herr Laurent', 'Guten Morgen und willkommen in der Backstube! Bevor wir anfangen: Hier werden Haare zusammengebunden und Hände gewaschen. Das ist Pflicht.'],
        ['Herr Laurent', 'Hier seht ihr unsere Knetmaschine. Der Teig wird zehn Minuten geknetet. Dann muss er ruhen.'],
        ['Nele', 'Entschuldigung, wie lange muss der Teig ruhen?'],
        ['Herr Laurent', 'Etwa eine Stunde. In dieser Zeit wird er größer.'],
        ['Yusuf', 'Und wie viele Brote werden jeden Tag gebacken?'],
        ['Herr Laurent', 'Ungefähr achthundert Brote und zweitausend Brötchen. Am Samstag sind es noch mehr.'],
        ['Nele', 'Wow! Ist die Arbeit in der Nacht nicht anstrengend?'],
        ['Herr Laurent', 'Am Anfang schon. Aber man gewöhnt sich daran. Und dafür habe ich am Nachmittag frei.'],
        ['Herr Laurent', 'So, jetzt dürft ihr selbst ein Brötchen formen. Wer will anfangen?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was muss man in einer Backstube machen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Hände waschen', 'die Haare zusammenbinden', 'laut Musik hören'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Informationen.', stufe: 1, kopf: ['', 'Info'], breiten: [50, 50], zeilen: [['Der Teig wird … geknetet.', '[zehn Minuten]'], ['Der Teig ruht …', '[etwa eine Stunde]'], ['Brote pro Tag', '[ungefähr 800]'], ['Brötchen pro Tag', '[ungefähr 2000]'], ['Herr Laurent hat frei …', '[am Nachmittag]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt einen Betrieb vor, den ihr kennt (Supermarkt, Garage, Restaurant …). Beschreibt die Arbeit im Passiv.', stufe: 3, karten: [
        { titel: 'Betrieb vorstellen', text: ['Das ist …', 'Es gibt … Abteilungen.', 'Hier wird … gemacht.', 'Am Morgen werden …'] },
        { titel: 'Nachfragen', text: ['Wie lange …?', 'Wie viele … werden …?', 'Wer ist für … zuständig?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Passiv: Was wird gemacht?', punkte: ['**Aktiv:** Der Bäcker **knetet** den Teig. (Wer? ist wichtig.)', '**Passiv:** Der Teig **wird geknetet**. (Was passiert? ist wichtig.)', 'Passiv = **werden** + **Partizip II** am Ende.', 'Plural: Die Brote **werden** gebacken.'] }],
        [{ titel: 'werden im Präsens', tabelle: { kopf: ['', 'werden', 'Beispiel'], zeilen: [['er / sie / es', '**wird**', 'Der Kuchen **wird** dekoriert.'], ['sie (Plural)', '**werden**', 'Die Brote **werden** geformt.'], ['statt Passiv', '**man** + Aktiv', '**Man** formt die Brote.']] } }],
        [{ art: 'tipp', titel: 'Passiv oder man?', text: 'Beide sagen dasselbe: Die Brote **werden** gebacken. = **Man** backt die Brote. Im Gespräch hört man oft **man**.' },
         { art: 'achtung', titel: 'werden hat drei Aufgaben', text: 'Ich **werde** Koch. (Beruf) · Morgen **wird** es warm. (Zukunft) · Das Brot **wird** gebacken. (Passiv)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze wird oder werden.', stufe: 1, saetze: ['Der Teig [wird] geknetet.', 'Die Brötchen [werden] geformt.', 'Im Laden [wird] verkauft.', 'Die Torten [werden] dekoriert.', 'Abends [wird] alles geputzt.'] },
      { art: 'abschreiben', auftrag: 'Schreib im Passiv.', stufe: 2, kopf: ['Aktiv mit man', 'Passiv'], saetze: [['Man wäscht die Hände.', 'Die Hände werden gewaschen.'], ['Man schneidet das Brot.', 'Das Brot wird geschnitten.'], ['Man putzt die Backstube.', 'Die Backstube wird geputzt.'], ['Man verkauft die Kuchen.', 'Die Kuchen werden verkauft.']] },
      { art: 'ordnen', auftrag: 'So wird Brot gemacht. Nummeriere die Schritte.', stufe: 2, teile: ['Das Mehl wird abgewogen.', 'Der Teig wird geknetet.', 'Der Teig ruht eine Stunde.', 'Die Brote werden geformt.', 'Die Brote werden gebacken.', 'Die Brote werden verkauft.'], ordnung: [2, 5, 0, 3, 1, 4] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle einen Betrieb (Restaurant, Garage, Supermarkt, Friseursalon …). Beschreib, was dort gemacht wird. Benutze das Passiv.', stufe: 2,
        anfaenge: ['In einem / einer … wird …', 'Zuerst wird …', 'Dann werden …', 'Am Abend …', 'Besonders wichtig ist …'], zeilen: 9,
        beispiel: 'In einer Autowerkstatt werden Autos repariert. Zuerst wird mit dem Kunden gesprochen. Dann wird der Fehler mit dem Computer gesucht. Danach werden die Teile gewechselt. Am Abend wird die Werkstatt aufgeräumt. Besonders wichtig ist die Sicherheit.' },
    ],
    check: ['Ich verstehe, wie sich ein Betrieb vorstellt.', 'Ich lese ein Organigramm.', 'Ich verstehe eine Führung durch einen Betrieb.', 'Ich bilde das Passiv mit wird und werden.', 'Ich beschreibe Abläufe in einem Betrieb.'],
  },
  // ================================================================ 3
  {
    thema: 'Sicherheit · wenn – dann', titel: 'Sicherheit geht vor!', untertitel: 'Schutzbrille, Schraubstock, Not-Aus: Du liest Sicherheitshinweise, hörst die Anweisungen in der Werkstatt – und sagst, was man tut, wenn …',
    ziel: { de: 'Ich verstehe Sicherheitshinweise und Anweisungen und bilde wenn-Sätze.', fr: 'Je comprends des consignes de sécurité et je forme des phrases avec « wenn ».' },
    bild: ['lehrer:froh:erklaeren', 'finn:verwirrt'],
    start: {
      was: 'Schutz und Sicherheit',
      aufgaben: [
        { art: 'symbole', auftrag: 'Was zeigt das Symbol? Schreib das Wort.', stufe: 1, woerter: ['Schutzhelm', 'Schutzbrille', 'Gehörschutz', 'Sicherheitsschuhe', 'Feuerlöscher', 'Erste Hilfe', 'Achtung, Strom!', 'Feuergefahr'],
          symbole: [['helmet', 'Schutzhelm'], ['eyeglass', 'Schutzbrille'], ['ear', 'Gehörschutz'], ['shoe', 'Sicherheitsschuhe'], ['fire-extinguisher', 'Feuerlöscher'], ['first-aid-kit', 'Erste Hilfe'], ['bolt', 'Achtung, Strom!'], ['flame', 'Feuergefahr']] },
      ],
    },
    lesen: {
      was: 'Eine Werkstattordnung und Sicherheitshinweise', art: 'dokumente',
      quelle: 'Aushang in der Schulwerkstatt · Gebrauchsanweisung', titel: 'Regeln für die Werkstatt',
      dokumente: [
        { stil: 'nachricht', stimme: 'm1', kopf: '**Werkstattordnung**', text: ['1. Die Werkstatt wird nur mit einer Lehrperson betreten.', '2. **Wenn** du an einer Maschine arbeitest, **trägst** du eine Schutzbrille.', '3. Lange Haare werden zusammengebunden. Schmuck wird abgelegt.', '4. **Wenn** etwas kaputt ist, **sagst** du es sofort der Lehrperson.', '5. Im Notfall: den **roten Not-Aus-Knopf** drücken!', '6. Nach der Arbeit wird der Platz aufgeräumt.'] },
        { stil: 'notiz', stimme: 'w1', kopf: '**Bohrmaschine** – Sicherheitshinweise', text: ['Lesen Sie diese Hinweise vor dem ersten Gebrauch.', '• Ziehen Sie den Stecker, **wenn** Sie den Bohrer wechseln.', '• Benutzen Sie das Gerät nicht, **wenn** das Kabel beschädigt ist.', '• Tragen Sie Schutzbrille und Gehörschutz.', '• Prüfen Sie vor dem Bohren, ob in der Wand Stromkabel sind.'] },
      ],
      woerter: [['die Werkstatt', 'l’atelier'], ['betreten', 'entrer dans'], ['der Schmuck', 'les bijoux'], ['ablegen', 'enlever'], ['der Notfall', 'l’urgence'], ['der Stecker', 'la fiche'], ['das Kabel', 'le câble'], ['beschädigt', 'endommagé']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Man darf allein in die Werkstatt gehen.', false], ['An der Maschine trägt man eine Schutzbrille.', true], ['Im Notfall drückt man den roten Knopf.', true], ['Man wechselt den Bohrer, wenn der Stecker noch in der Steckdose ist.', false], ['Mit einem kaputten Kabel darf man nicht bohren.', true]] },
        { art: 'zuordnen', auftrag: 'Was tust du, wenn …? Verbinde.', stufe: 2, links: ['Wenn das Kabel kaputt ist, …', 'Wenn sich jemand verletzt, …', 'Wenn du den Bohrer wechselst, …', 'Wenn du lange Haare hast, …'], rechts: ['… benutzt du das Gerät nicht.', '… holst du sofort Hilfe.', '… ziehst du den Stecker.', '… bindest du sie zusammen.'], ordnung: [2, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Anweisungen in der Werkstatt', wo: 'Schulwerkstatt', titel: 'Erst zuhören, dann bohren!',
      situation: 'Herr Mesenberg erklärt der Gruppe die Standbohrmaschine. Finn ist neu in der Werkstatt.',
      bild: ['lehrer:froh:erklaeren', 'finn:verwirrt'], sprecher: { 'Herr Mesenberg': 'm1', Finn: 'm3', Jana: 'w2' },
      text: [
        ['Herr Mesenberg', 'So, alle mal herhören! Heute arbeiten wir mit der Standbohrmaschine. Bevor ihr anfangt, setzt ihr eure Schutzbrille auf.'],
        ['Finn', 'Muss ich auch Handschuhe anziehen?'],
        ['Herr Mesenberg', 'Nein, an der Bohrmaschine gerade nicht! Wenn sich ein Handschuh im Bohrer verfängt, wird die Hand mitgezogen. Das ist sehr gefährlich.'],
        ['Jana', 'Und was machen wir, wenn sich das Werkstück mitdreht?'],
        ['Herr Mesenberg', 'Gute Frage. Das Werkstück wird immer im Schraubstock festgemacht. Wenn trotzdem etwas passiert, drückt ihr sofort den roten Not-Aus-Knopf.'],
        ['Finn', 'Entschuldigung, können Sie das Wort noch einmal sagen? Schraub…?'],
        ['Herr Mesenberg', 'Schraubstock. Das ist dieses Teil hier. Er hält das Holz fest, damit eure Hände frei sind.'],
        ['Herr Mesenberg', 'Gut. Wenn alle bereit sind, fangen wir an. Jana, du bist zuerst dran.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört zur Sicherheit an der Bohrmaschine? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Schutzbrille', 'der Schraubstock', 'Kopfhörer mit Musik'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was setzt man vor der Arbeit auf?', o: ['eine Mütze', 'eine Schutzbrille', 'einen Helm'], r: 1 }, { f: 'Warum trägt man an der Bohrmaschine keine Handschuhe?', o: ['Sie sind zu teuer.', 'Der Handschuh kann sich im Bohrer verfangen.', 'Man braucht keine.'], r: 1 }, { f: 'Wo wird das Werkstück festgemacht?', o: ['im Schraubstock', 'auf dem Tisch', 'in der Hand'], r: 0 }] },
        { art: 'fragen', auftrag: 'Was macht man, wenn trotzdem etwas passiert?', stufe: 2, fragen: [{ f: '', l: 'Man drückt sofort den roten Not-Aus-Knopf.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt euch gegenseitig ein Gerät (Wasserkocher, Föhn, Bohrmaschine …): Was muss man beachten?', stufe: 3, karten: [
        { titel: 'Erklären', text: ['Bevor du anfängst, …', 'Wenn …, dann …', 'Du darfst nie …', 'Pass auf, dass …'] },
        { titel: 'Nachfragen', text: ['Können Sie das Wort noch einmal sagen?', 'Was bedeutet …?', 'Habe ich das richtig verstanden: …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'wenn – dann', punkte: ['**Wenn** das Kabel kaputt **ist**, **(dann)** benutzt du das Gerät nicht.', 'Im wenn-Satz: Verb **am Ende**.', 'Danach kommt zuerst das **Verb**: …, **benutzt** du …', '**dann** kann man auch weglassen.'] },
         { titel: 'Anweisungen geben', punkte: ['**du:** Setz die Brille auf!', '**ihr:** Setzt die Brille auf!', '**Sie:** Setzen Sie die Brille auf!', 'Auf Schildern: **Brille tragen!**'] }],
        [{ art: 'tipp', titel: 'Wörter erklären', text: 'Du kennst ein Wort nicht? Frag: **Was bedeutet …?** Oder erkläre selbst: **Das ist ein Teil, das …** · **Das ist ein Gerät, mit dem man …**' },
         { art: 'achtung', titel: 'Sicherheit', text: 'Hast du dich verletzt oder ist etwas kaputt? Sag es **sofort** der Lehrperson – auch wenn es nur klein ist. Notruf: **112**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Verb am Ende des wenn-Satzes.', stufe: 1, saetze: ['(arbeiten) Wenn du an der Maschine [arbeitest], trägst du eine Brille.', '(sein) Wenn das Kabel kaputt [ist], darfst du nicht bohren.', '(wechseln) Wenn ihr den Bohrer [wechselt], zieht ihr den Stecker.', '(passieren) Wenn etwas [passiert], drückst du den Not-Aus-Knopf.'] },
      { art: 'abschreiben', auftrag: 'Mach einen wenn-Satz.', stufe: 2, kopf: ['zwei Sätze', 'mit wenn'], saetze: [['Es brennt. Du rufst die 112.', 'Wenn es brennt, rufst du die 112.'], ['Du bist fertig. Du räumst den Platz auf.', 'Wenn du fertig bist, räumst du den Platz auf.'], ['Ich verstehe etwas nicht. Ich frage nach.', 'Wenn ich etwas nicht verstehe, frage ich nach.']] },
      { art: 'tabelle', auftrag: 'Schreib die Anweisung für „ihr“ und „Sie“.', stufe: 2, kopf: ['du', 'ihr', 'Sie'], zeilen: [['Trag die Brille!', '[Tragt die Brille!]', '[Tragen Sie die Brille!]'], ['Zieh den Stecker!', '[Zieht den Stecker!]', '[Ziehen Sie den Stecker!]'], ['Räum auf!', '[Räumt auf!]', '[Räumen Sie auf!]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib fünf Sicherheitsregeln für einen Ort, den du kennst (Küche, Turnhalle, Werkstatt, Labor …). Benutze wenn-Sätze und Anweisungen.', stufe: 2,
        anfaenge: ['Regeln für …', '1. Wenn …, …', '2. …', 'Im Notfall …'], zeilen: 9,
        beispiel: 'Regeln für die Schulküche: 1. Wir waschen die Hände, bevor wir kochen. 2. Wenn du ein scharfes Messer benutzt, schneidest du vom Körper weg. 3. Wenn der Topf heiß ist, nimmst du einen Topflappen. 4. Lange Haare werden zusammengebunden. 5. Im Notfall holst du sofort die Lehrperson.' },
    ],
    check: ['Ich verstehe Sicherheitshinweise und Regeln.', 'Ich verstehe Anweisungen in der Werkstatt.', 'Ich bitte darum, ein Wort zu wiederholen.', 'Ich bilde wenn-Sätze.', 'Ich schreibe Regeln und Anweisungen.'],
  },
  // ================================================================ 4
  {
    thema: 'Anzeigen · Telefonieren', titel: 'Praktikum gesucht!', untertitel: 'Anzeigen mit Abkürzungen, ein Telefonat mit einem Betrieb und eine kurze Bewerbung: So findest du einen Praktikumsplatz.',
    ziel: { de: 'Ich verstehe Praktikumsangebote, rufe in einem Betrieb an und schreibe eine kurze Bewerbung.', fr: 'Je comprends des offres de stage, je téléphone à une entreprise et j’écris une courte candidature.' },
    bild: ['jana:froh:handy', 'chef:froh:stehen'],
    start: {
      was: 'Abkürzungen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet die Abkürzung? Verbinde.', stufe: 1, links: ['Std.', 'Mo. bis Fr.', 'ab sof.', 'ca.', 'Tel.', '(m/w/d)'], rechts: ['Stunden', 'Montag bis Freitag', 'ab sofort', 'circa, ungefähr', 'Telefon', 'männlich, weiblich, divers'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Drei Praktikumsangebote', art: 'dokumente',
      quelle: 'Pinnwand im Lycée · Praktikumsbörse', titel: 'Praktikumsplätze frei!',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: '**Praktikum in der Küche** (m/w/d)', text: ['Restaurant „Am Bach“ in Larochette sucht ab sof. Praktikant/in für 2 Wo.', 'Arbeitszeit: Mo. bis Fr., 9 bis 15 Uhr · Mittagessen gratis', 'Du bist pünktlich und arbeitest gern im Team? Ruf uns an: Tel. 12 34 56'] },
        { stil: 'notiz', stimme: 'm1', kopf: '**Autowerkstatt Becker** sucht Schnupperpraktikant (m/w/d)', text: ['1 Woche, ca. 35 Std.', 'Du interessierst dich für Autos und Technik? Arbeitskleidung und Sicherheitsschuhe bekommst du von uns.', 'Bewerbung per E-Mail: kurze Vorstellung und letztes Zeugnis'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Tierheim** – Praktikum in den Ferien', text: ['Ab 15 Jahren · 2 Wo. im Juli · halbtags (4 Std.)', 'Hunde ausführen, Futter vorbereiten, Käfige putzen', 'Wichtig: keine Angst vor Tieren, keine Allergie! Infos: Tel. 12 98 76'] },
      ],
      woerter: [['der Praktikant, die Praktikantin', 'le / la stagiaire'], ['das Schnupperpraktikum', 'le stage d’observation'], ['die Arbeitskleidung', 'les vêtements de travail'], ['die Bewerbung', 'la candidature'], ['das Zeugnis', 'le bulletin'], ['halbtags', 'à mi-temps'], ['das Futter', 'la nourriture (animaux)'], ['der Käfig', 'la cage']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche die Anzeigen.', stufe: 1, kopf: ['', 'Restaurant', 'Werkstatt', 'Tierheim'], breiten: [22, 26, 26, 26], zeilen: [['Wie lange?', '[2 Wochen]', '[1 Woche]', '[2 Wochen]'], ['Arbeitszeit', '[Mo. bis Fr., 9 bis 15 Uhr]', '[ca. 35 Stunden]', '[halbtags, 4 Stunden]'], ['Kontakt', '[anrufen]', '[per E-Mail]', '[anrufen]']] },
        { art: 'mc', auftrag: 'Welche Anzeige passt? Kreuze an.', stufe: 2, fragen: [{ f: 'Nora ist 15 und liebt Hunde.', o: ['Restaurant', 'Werkstatt', 'Tierheim'], r: 2 }, { f: 'Malik will eine Woche lang Autos reparieren.', o: ['Restaurant', 'Werkstatt', 'Tierheim'], r: 1 }, { f: 'Ella möchte kochen lernen.', o: ['Restaurant', 'Werkstatt', 'Tierheim'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Ein Telefonat mit einem Betrieb', wo: 'Telefonat', titel: 'Ich rufe wegen des Praktikums an',
      situation: 'Jana ruft beim Restaurant „Am Bach“ an. Sie interessiert sich für das Praktikum in der Küche.',
      bild: ['jana:nervoes:handy', 'chef:froh'], sprecher: { 'Herr Klein': 'm2', Jana: 'w2' },
      text: [
        ['Herr Klein', 'Restaurant Am Bach, Klein am Apparat. Guten Tag!'],
        ['Jana', 'Guten Tag, Herr Klein. Mein Name ist Jana, ich bin Schülerin in Junglinster. Ich rufe wegen des Praktikums in der Küche an. Ist der Platz noch frei?'],
        ['Herr Klein', 'Ja, der Platz ist noch frei. Wie alt bist du denn?'],
        ['Jana', 'Ich bin vierzehn. Ich möchte später vielleicht Köchin werden.'],
        ['Herr Klein', 'Sehr schön. Hast du schon Erfahrung in der Küche?'],
        ['Jana', 'Ich koche gern, und in der Schule habe ich einen Kochkurs gemacht.'],
        ['Herr Klein', 'Gut. Das Praktikum beginnt am Montag um neun Uhr. Bitte bring feste Schuhe mit. Eine Schürze bekommst du von uns.'],
        ['Jana', 'Entschuldigung, um wie viel Uhr genau?'],
        ['Herr Klein', 'Um neun Uhr. Komm bitte zum Hintereingang.'],
        ['Jana', 'Alles klar. Vielen Dank, Herr Klein! Auf Wiederhören.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie beginnst du ein Telefonat mit einem Betrieb? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Guten Tag, mein Name ist …', 'Ich rufe wegen … an.', 'Hey, was geht?'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Mach Notizen wie Jana.', stufe: 1, kopf: ['Notiz', ''], breiten: [40, 60], zeilen: [['Platz frei?', '[ja]'], ['Beginn', '[Montag, 9 Uhr]'], ['mitbringen', '[feste Schuhe]'], ['bekommt sie', '[eine Schürze]'], ['Eingang', '[Hintereingang]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ruft bei einem Betrieb aus den Anzeigen an. Eine Person spielt den Betrieb.', stufe: 3, karten: [
        { titel: 'Anrufer/in', text: ['Guten Tag, mein Name ist …', 'Ich rufe wegen … an.', 'Ist der Platz noch frei?', 'Was muss ich mitbringen?'] },
        { titel: 'Betrieb', text: ['… am Apparat.', 'Wie alt bist du?', 'Hast du schon Erfahrung?', 'Das Praktikum beginnt am …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Am Telefon', punkte: ['**Begrüßen:** Guten Tag, mein Name ist …', '**Grund:** Ich rufe **wegen** des Praktikums an.', '**Nachfragen:** Entschuldigung, um wie viel Uhr genau?', '**Ende:** Vielen Dank! Auf **Wiederhören**!'] },
         { titel: 'Abkürzungen in Anzeigen', tabelle: { kopf: ['kurz', 'lang'], zeilen: [['Std.', 'Stunden'], ['Wo.', 'Wochen'], ['Mo. bis Fr.', 'Montag bis Freitag'], ['ab sof.', 'ab sofort'], ['ca.', 'circa (ungefähr)'], ['(m/w/d)', 'männlich, weiblich, divers']] } }],
        [{ art: 'tipp', titel: 'Bewerbung per E-Mail', text: '**Betreff:** Bewerbung um ein Praktikum · **Anrede:** Sehr geehrte Damen und Herren, · **Wer bist du? Warum dieses Praktikum?** · **Gruß:** Mit freundlichen Grüßen' },
         { art: 'achtung', titel: 'Sie oder du?', text: 'Mit Betrieben sprichst und schreibst du mit **Sie**. Anzeigen sagen oft **du** – du antwortest trotzdem mit **Sie**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Telefongespräch.', stufe: 1, woerter: ['Apparat', 'wegen', 'frei', 'genau', 'Wiederhören'], saetze: ['Restaurant Am Bach, Klein am [Apparat].', 'Ich rufe [wegen] des Praktikums an.', 'Ist der Platz noch [frei]?', 'Um wie viel Uhr [genau]?', 'Vielen Dank! Auf [Wiederhören]!'] },
      { art: 'abschreiben', auftrag: 'Schreib den Satz höflich (formell).', stufe: 2, kopf: ['informell', 'formell'], saetze: [['Hey, habt ihr noch einen Platz?', 'Guten Tag, haben Sie noch einen Praktikumsplatz?'], ['Sag mal, wann geht es los?', 'Können Sie mir sagen, wann das Praktikum beginnt?'], ['Tschüss!', 'Auf Wiederhören!']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine kurze Bewerbung per E-Mail für eine der drei Anzeigen. Du darfst Angaben erfinden.', stufe: 2,
        anfaenge: ['Betreff: Bewerbung um ein Praktikum', 'Sehr geehrte Damen und Herren,', 'mein Name ist … Ich bin … Jahre alt und …', 'Ich interessiere mich für …, weil …', 'Mit freundlichen Grüßen'], zeilen: 11,
        beispiel: 'Betreff: Bewerbung um ein Praktikum. Sehr geehrte Damen und Herren, mein Name ist Malik. Ich bin 15 Jahre alt und gehe in Mersch zur Schule. Ich interessiere mich für das Praktikum in Ihrer Werkstatt, weil ich mich für Autos begeistere. Ich bin pünktlich und lerne schnell. Mit freundlichen Grüßen, Malik' },
    ],
    check: ['Ich verstehe Praktikumsangebote mit Abkürzungen.', 'Ich verstehe ein Telefonat mit einem Betrieb.', 'Ich telefoniere höflich mit „Sie“.', 'Ich frage nach, wenn ich etwas nicht verstehe.', 'Ich schreibe eine kurze Bewerbung.'],
  },
  // ================================================================ 5
  {
    thema: 'Lebenslauf · Zeitangaben', titel: 'Mein Lebenslauf', untertitel: 'Ein Lebenslauf in Stichwörtern, ein Jugendlicher erzählt seinen Weg: Du verstehst Lebensläufe, fasst sie zusammen – und schreibst einen eigenen oder erfundenen.',
    ziel: { de: 'Ich verstehe einen Lebenslauf, fasse ihn kurz zusammen und schreibe einen.', fr: 'Je comprends un CV, je le résume et j’en écris un.' },
    bild: ['yusuf:froh:laptop', 'mia:froh:blatt'],
    start: {
      was: 'Was steht im Lebenslauf?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gehört wohin? Verbinde.', stufe: 1, links: ['Persönliche Daten', 'Schule', 'Praktika', 'Sprachen', 'Hobbys'], rechts: ['Name, Wohnort, Geburtsdatum', 'Grundschule, Lycée', 'zwei Wochen im Supermarkt', 'Luxemburgisch, Französisch, Deutsch', 'Fußball, Zeichnen'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Lebenslauf', art: 'dokumente',
      quelle: 'Bewerbungsmappe (ausgedachte Person)', titel: 'Lebenslauf von Samir',
      dokumente: [
        { stil: 'nachricht', stimme: 'm1', kopf: '**Lebenslauf** – Samir Haddad', text: ['**Persönliche Daten:** geboren am 3. Mai 2011 in Luxemburg · wohnt in Ettelbrück', '**Schule:** 2017 bis 2023 Grundschule in Ettelbrück · seit 2023 Lycée, Voie de préparation', '**Praktika:** März 2025: 1 Woche Supermarkt (Regale einräumen, Kasse) · Juli 2026: 2 Wochen Gärtnerei (Pflanzen gießen, Beete anlegen)', '**Sprachen:** Arabisch (Muttersprache), Luxemburgisch, Französisch, Deutsch · Englisch (Grundkenntnisse)', '**Hobbys:** Fußball im Verein, Kochen, Videos schneiden'] },
        { stil: 'notiz', stimme: 'm3', kopf: 'Über mich', text: ['Ich bin ruhig, aber hilfsbereit. Am liebsten arbeite ich draußen. In der Gärtnerei habe ich gemerkt, dass ich gern mit Pflanzen arbeite. Deshalb suche ich jetzt einen Ausbildungsplatz als Gärtner.'] },
      ],
      woerter: [['der Lebenslauf', 'le CV'], ['das Geburtsdatum', 'la date de naissance'], ['die Grundschule', 'l’école fondamentale'], ['das Regal', 'le rayon'], ['die Gärtnerei', 'la jardinerie'], ['die Muttersprache', 'la langue maternelle'], ['die Grundkenntnisse', 'les notions de base'], ['hilfsbereit', 'serviable']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Beantworte die Fragen zum Lebenslauf.', stufe: 1, fragen: [{ f: 'Wann und wo ist Samir geboren?', l: 'am 3. Mai 2011 in Luxemburg' }, { f: 'Wo hat Samir Praktika gemacht?', l: 'in einem Supermarkt und in einer Gärtnerei' }, { f: 'Welche Sprachen spricht er?', l: 'Arabisch, Luxemburgisch, Französisch, Deutsch und ein bisschen Englisch' }, { f: 'Welchen Beruf möchte er lernen? Warum?', zeilen: 2, l: 'Gärtner, weil er gern draußen und mit Pflanzen arbeitet.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Jugendlicher erzählt seinen Lebenslauf', wo: 'Klassenzimmer · Vorstellung', titel: 'Mein Weg bis heute',
      situation: 'Ben erzählt der Klasse seinen Lebenslauf. Hör gut zu: Danach fasst du ihn kurz zusammen.',
      bild: ['ben:froh:erklaeren', 'lehrerin:froh'], sprecher: { Ben: 'm3', 'Frau Sommer': 'w1' },
      text: [
        ['Ben', 'Ich heiße Ben und bin fünfzehn Jahre alt. Geboren bin ich in Belgien, in Arlon.'],
        ['Ben', 'Als ich sechs war, sind wir nach Luxemburg gezogen. Am Anfang habe ich kein Wort Luxemburgisch verstanden. Das war schwer.'],
        ['Ben', 'In der Grundschule hatte ich eine tolle Lehrerin. Sie hat mir viel geholfen. Nach zwei Jahren konnte ich gut Luxemburgisch.'],
        ['Ben', 'Seit zwei Jahren bin ich im Lycée. Letztes Jahr habe ich ein Praktikum bei einem Elektriker gemacht. Das hat mir super gefallen.'],
        ['Ben', 'In meiner Freizeit spiele ich Basketball und baue kleine Roboter.'],
        ['Ben', 'Mein Ziel: eine Ausbildung als Elektroniker. Dafür muss ich in Mathe noch besser werden.'],
        ['Frau Sommer', 'Danke, Ben! Wer kann Bens Lebenslauf in drei Sätzen zusammenfassen?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was erzählt man, wenn man seinen Lebenslauf vorstellt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Schule und Praktika', 'Sprachen und Hobbys', 'seine Passwörter'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze Bens Lebenslauf.', stufe: 1, kopf: ['', 'Ben'], breiten: [35, 65], zeilen: [['Alter', '[15 Jahre]'], ['geboren in', '[Arlon (Belgien)]'], ['nach Luxemburg', '[mit sechs Jahren]'], ['Praktikum', '[bei einem Elektriker]'], ['Hobbys', '[Basketball, Roboter bauen]'], ['Berufsziel', '[Elektroniker]']] },
        { art: 'fragen', auftrag: 'Fasse Bens Lebenslauf in drei Sätzen zusammen.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Ben ist 15 und in Arlon geboren. Mit sechs Jahren ist er nach Luxemburg gezogen. Er hat ein Praktikum bei einem Elektriker gemacht und möchte Elektroniker werden.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stell einen Lebenslauf in einer Minute vor – deinen eigenen oder einen erfundenen.', stufe: 3, karten: [
        { titel: 'Aufbau', text: ['Ich heiße … und bin … Jahre alt.', 'Geboren bin ich in …', 'Seit … bin ich …', 'Mein Ziel: …'] },
        { titel: 'Tipps', text: ['Sprich langsam und deutlich.', 'Schau die Zuhörer an.', 'Du darfst eine ausgedachte Person vorstellen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zeitangaben im Lebenslauf', punkte: ['**seit** 2023 (bis heute): Seit 2023 bin ich im Lycée.', '**von** 2017 **bis** 2023: Grundschule', '**im** Juli 2026 · **am** 3. Mai 2011', '**als** ich sechs war, … (einmal, in der Vergangenheit)', '**letztes** Jahr · **vor** zwei Jahren'] },
         { titel: 'Stichwörter oder Text?', punkte: ['**Stichwörter:** kurz, ohne „ich“: //2025: Praktikum Supermarkt//', '**Text:** ganze Sätze: //Im März 2025 habe ich ein Praktikum gemacht.//', 'Im Lebenslauf gilt: immer **gleich** ordnen, zum Beispiel das Neueste oben.'] }],
        [{ art: 'tipp', titel: 'Deine Daten gehören dir', text: 'Im Unterricht darfst du einen **erfundenen** Lebenslauf schreiben. Für eine echte Bewerbung schreibst du nur, was du zeigen **willst**.' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 5)', text: 'Gesprochen meist Perfekt: **ich bin gezogen**. Geschrieben oft Präteritum: **er zog**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze seit, von, bis, im, am oder vor.', stufe: 1, woerter: ['seit', 'von', 'bis', 'im', 'am', 'vor'], saetze: ['[Seit] 2023 gehe ich ins Lycée.', '[Von] 2017 [bis] 2023 war ich in der Grundschule.', '[Im] Juli habe ich ein Praktikum gemacht.', 'Ich bin [am] 3. Mai 2011 geboren.', '[Vor] zwei Jahren bin ich umgezogen.'] },
      { art: 'abschreiben', auftrag: 'Mach aus Stichwörtern ganze Sätze.', stufe: 2, kopf: ['Stichwörter', 'Satz'], saetze: [['2025: Praktikum Supermarkt', 'Im Jahr 2025 habe ich ein Praktikum im Supermarkt gemacht.'], ['seit 2023: Lycée', 'Seit 2023 gehe ich ins Lycée.'], ['Hobbys: Fußball, Kochen', 'In meiner Freizeit spiele ich Fußball und koche gern.']] },
    ],
    schreiben: [
      { art: 'steckbrief', auftrag: 'Füll einen Lebenslauf aus – deinen eigenen oder einen erfundenen.', stufe: 1, bildText: 'Foto (freiwillig) oder ein Symbol', felder: ['Name', 'geboren (wann? wo?)', 'Schule', 'Praktika', 'Sprachen', 'Hobbys', 'Berufsziel'] },
      { art: 'schreiben', auftrag: 'Schreib jetzt einen kurzen Text „Über mich“ für eine Bewerbung (echt oder erfunden).', stufe: 2,
        anfaenge: ['Ich heiße … und bin …', 'Ich bin …, aber …', 'Im Praktikum habe ich gemerkt, dass …', 'Deshalb suche ich …'], zeilen: 8,
        beispiel: 'Ich heiße Lara und bin 15 Jahre alt. Ich bin ruhig, aber sehr genau. Im Praktikum in einem Blumengeschäft habe ich gemerkt, dass ich gern Kunden berate. Deshalb suche ich einen Ausbildungsplatz als Floristin.' },
    ],
    check: ['Ich verstehe einen Lebenslauf.', 'Ich verstehe, wenn jemand seinen Lebenslauf erzählt.', 'Ich fasse einen Lebenslauf kurz zusammen.', 'Ich benutze Zeitangaben (seit, von … bis, vor).', 'Ich schreibe einen Lebenslauf (echt oder erfunden).'],
  },
  // ================================================================ 6
  {
    thema: 'Praktikum · Bericht', titel: 'Mein erster Tag im Praktikum', untertitel: 'Ein Brief an eine Brieffreundin, ein Gespräch mit dem Chef und ein Bericht für die Schülerzeitung: Du erzählst von Erfahrungen.',
    ziel: { de: 'Ich verstehe Erfahrungsberichte und schreibe einen Praktikumsbericht.', fr: 'Je comprends des récits d’expérience et j’écris un rapport de stage.' },
    bild: ['chloe:froh:handy', 'sami:froh'],
    start: {
      was: 'Gefühle am ersten Tag',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt zusammen? Verbinde.', stufe: 1, links: ['nervös', 'stolz', 'müde', 'erleichtert', 'neugierig'], rechts: ['Ich habe Angst, dass ich Fehler mache.', 'Ich habe etwas Tolles geschafft.', 'Ich habe zu wenig geschlafen.', 'Puh, es ist gut gegangen!', 'Ich will alles genau wissen.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Brief an eine Brieffreundin', art: 'dokumente',
      quelle: 'Brief von Chloe an ihre Brieffreundin Paula', titel: 'Stell dir vor …',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: 'Liebe Paula,', text: ['stell dir vor: Heute war mein erster Tag im Praktikum in der Tierarztpraxis! Ich war so nervös, dass ich fast nicht frühstücken konnte.', 'Um 8 Uhr hat mich die Tierärztin, Frau Dr. Wagner, begrüßt. Zuerst wurde mir die Praxis gezeigt. Dann durfte ich bei einer Untersuchung zuschauen: Ein kleiner Hund hatte eine verletzte Pfote. Ich habe ihn gestreichelt, damit er ruhig bleibt.', 'Am Nachmittag musste ich die Käfige putzen. Das war nicht so toll, aber es gehört dazu. Alle sind sehr nett zu mir. Nur der Tag ist lang: Ich war erst um 17 Uhr fertig.', 'Jetzt bin ich müde, aber auch stolz. Wie geht es dir? Hast du schon einen Praktikumsplatz?'], gruss: 'Liebe Grüße, deine Chloe' },
      ],
      woerter: [['die Tierarztpraxis', 'le cabinet vétérinaire'], ['begrüßen', 'accueillir'], ['die Untersuchung', 'l’examen'], ['zuschauen', 'regarder'], ['die Pfote', 'la patte'], ['streicheln', 'caresser'], ['dazugehören', 'faire partie de'], ['stolz', 'fier']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was hat Chloe wann gemacht? Nummeriere.', stufe: 1, teile: ['Sie wurde von der Tierärztin begrüßt.', 'Sie hat die Praxis gesehen.', 'Sie hat bei einer Untersuchung zugeschaut.', 'Sie hat einen Hund gestreichelt.', 'Sie hat die Käfige geputzt.', 'Sie war um 17 Uhr fertig.'], ordnung: [2, 4, 0, 5, 3, 1] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Wie hat sich Chloe am Morgen gefühlt?', l: 'Sie war sehr nervös.' }, { f: 'Was hat ihr nicht so gut gefallen?', l: 'die Käfige putzen und der lange Tag' }, { f: 'Wie fühlt sie sich am Abend?', l: 'müde, aber stolz' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch mit dem Chef', wo: 'Autowerkstatt · erster Tag', titel: 'Hast du noch Fragen?',
      situation: 'Sami beginnt sein Praktikum in der Autowerkstatt Becker. Am Ende des Tages spricht er mit dem Chef.',
      bild: ['chef:froh:erklaeren', 'sami:froh'], sprecher: { 'Herr Becker': 'm2', Sami: 'm3' },
      text: [
        ['Herr Becker', 'So, Sami, der erste Tag ist geschafft. Wie war es für dich?'],
        ['Sami', 'Gut, danke! Ich habe viel gelernt. Am meisten hat mir der Reifenwechsel gefallen.'],
        ['Herr Becker', 'Das hast du gut gemacht. Gab es etwas, was schwierig war?'],
        ['Sami', 'Ja, ehrlich gesagt: die vielen Werkzeuge. Ich kenne noch nicht alle Namen.'],
        ['Herr Becker', 'Das ist normal. Morgen zeigt dir Laurent die Werkzeugwand. Da hängt jedes Werkzeug an seinem Platz.'],
        ['Sami', 'Darf ich Sie noch etwas fragen? Um wie viel Uhr soll ich morgen kommen?'],
        ['Herr Becker', 'Um halb acht, wie heute. Und denk an deine Sicherheitsschuhe.'],
        ['Sami', 'Mach ich. Kann ich morgen auch beim Ölwechsel helfen?'],
        ['Herr Becker', 'Klar, wenn du willst. Du stellst gute Fragen – das gefällt mir. Bis morgen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was kannst du den Chef am Ende des Tages fragen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Um wie viel Uhr soll ich morgen kommen?', 'Kann ich morgen auch bei … helfen?', 'Kann ich früher gehen, weil es langweilig ist?'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Sami hat der Reifenwechsel gefallen.', true], ['Sami kennt schon alle Werkzeuge.', false], ['Morgen soll Sami um halb acht kommen.', true], ['Sami braucht morgen keine Sicherheitsschuhe.', false], ['Der Chef findet Samis Fragen gut.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt ein Gespräch am Ende des ersten Praktikumstags. Die Person im Praktikum fragt nach und sagt, was gut und was schwierig war.', stufe: 3, karten: [
        { titel: 'Praktikant/in', text: ['Am meisten hat mir … gefallen.', 'Schwierig war …', 'Darf ich Sie noch etwas fragen?', 'Kann ich morgen auch …?'] },
        { titel: 'Chef/in', text: ['Wie war es für dich?', 'Gab es etwas, was schwierig war?', 'Morgen …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Einen Bericht schreiben', punkte: ['**Einleitung:** Wo? Wann? – //Vom 3. bis 14. März war ich in …//', '**Hauptteil:** Was habe ich gemacht? Der Reihe nach.', '**Schluss:** Wie war es? Was habe ich gelernt?', 'Im Bericht schreibst du **sachlich**: kein „Liebe Paula“.'] },
         { titel: 'Brief oder Bericht?', tabelle: { kopf: ['Brief', 'Bericht'], zeilen: [['Liebe Paula, …', 'Mein Praktikum bei …'], ['Gefühle, Fragen an die Person', 'Fakten: Ort, Zeit, Aufgaben'], ['Liebe Grüße', 'Fazit: …']] } }],
        [{ art: 'tipp', titel: 'Lernjournal im Praktikum', text: 'Schreib nach jedem Tag drei Sätze: **Was** habe ich gemacht? **Was** habe ich gelernt? **Was** will ich morgen fragen?' },
         { art: 'achtung', titel: 'Passiv in der Vergangenheit', text: 'Mir **wurde** die Praxis **gezeigt**. = Man hat mir die Praxis gezeigt.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Verben im Perfekt.', stufe: 1, saetze: ['(beginnen) Mein Praktikum hat am Montag [begonnen].', '(zeigen) Der Chef hat mir die Werkstatt [gezeigt].', '(helfen) Ich habe beim Reifenwechsel [geholfen].', '(gehen) Um 17 Uhr bin ich nach Hause [gegangen].', '(kennenlernen) Ich habe viele Werkzeuge [kennengelernt].'] },
      { art: 'mc', auftrag: 'Brief oder Bericht? Kreuze an.', stufe: 2, fragen: [{ f: 'Stell dir vor, was heute passiert ist!', o: ['Brief', 'Bericht'], r: 0 }, { f: 'Vom 3. bis 14. März war ich in der Bäckerei Weber.', o: ['Brief', 'Bericht'], r: 1 }, { f: 'Wie geht es dir? Schreib mir bald!', o: ['Brief', 'Bericht'], r: 0 }, { f: 'Meine Aufgaben waren: Brot verkaufen und Regale füllen.', o: ['Brief', 'Bericht'], r: 1 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Praktikumsbericht für die Schülerzeitung – über ein echtes oder ein erfundenes Praktikum.', stufe: 2,
        anfaenge: ['Vom … bis … war ich in …', 'Am ersten Tag …', 'Meine Aufgaben waren …', 'Besonders gut hat mir gefallen, dass …', 'Mein Fazit: …'], zeilen: 12,
        beispiel: 'Vom 3. bis 14. März war ich in der Bäckerei Weber in Mersch. Am ersten Tag wurde mir der Betrieb gezeigt. Meine Aufgaben waren: Brötchen formen, Brot verkaufen und die Regale füllen. Besonders gut hat mir gefallen, dass ich eine Torte dekorieren durfte. Mein Fazit: Die Arbeit beginnt sehr früh, aber sie macht Spaß.' },
    ],
    check: ['Ich verstehe einen persönlichen Brief über Erlebnisse.', 'Ich verstehe ein Gespräch mit dem Chef.', 'Ich frage nach und sage, was schwierig war.', 'Ich unterscheide Brief und Bericht.', 'Ich schreibe einen Praktikumsbericht.'],
  },
  // ================================================================ 7
  {
    thema: 'Jugendsprache · Definitionen', titel: 'Krass, oder?', untertitel: 'Wie sprechen Jugendliche – im Hip-Hop, im Skatepark, im Chat? Du liest einen Artikel, hörst ein Gespräch in der Pause und erklärst Wörter wie ein Wörterbuch.',
    ziel: { de: 'Ich verstehe Jugendsprache, erkläre Wörter und wähle die passende Sprache.', fr: 'Je comprends le langage des jeunes, j’explique des mots et je choisis le bon registre.' },
    bild: ['finn:froh:laessig', 'mia:aufgeregt:handy'],
    start: {
      was: 'Jugendwörter',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['chillen', 'krass', 'cringe', 'Digga', 'lost'], rechts: ['sich entspannen', 'sehr, extrem (gut oder schlecht)', 'peinlich, zum Fremdschämen', 'Kumpel (als Anrede)', 'verwirrt, ahnungslos'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Artikel über Jugendsprache', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Schülerzeitung · Thema Sprache', titel: 'Wie redest du denn?',
      absaetze: [
        '„Digga, das war voll krass!“ – Erwachsene verstehen solche Sätze oft nicht. Das ist kein Zufall: Jugendliche haben schon immer ihre **eigene Sprache** benutzt. Sie zeigt: Wir gehören zusammen.',
        'Viele Wörter kommen aus dem **Englischen**, zum Beispiel „chillen“ oder „cringe“. Andere kommen aus der **Musik**. Im Hip-Hop hört man viele neue Ausdrücke, die dann auf dem Schulhof landen.',
        'Auch beim **Sport** gibt es eine eigene Sprache. Skater sprechen von „Grinds“ und „Kickflips“. Wer nicht skatet, versteht nur Bahnhof.',
        'Jugendsprache ändert sich **sehr schnell**. Ein Wort, das heute cool ist, ist in zwei Jahren oft schon wieder peinlich. Manche Wörter bleiben aber: „cool“ sagten viele Großeltern schon, als sie jung waren.',
        'Wichtig ist: **Wo** spreche ich **mit wem**? Mit Freunden ist Jugendsprache okay. Im Vorstellungsgespräch oder in einer E-Mail an einen Betrieb benutzt man die **Standardsprache**.',
      ],
      woerter: [['der Ausdruck', 'l’expression'], ['der Zufall', 'le hasard'], ['zusammengehören', 'aller ensemble'], ['landen', 'atterrir, arriver'], ['nur Bahnhof verstehen', 'ne rien comprendre'], ['sich ändern', 'changer'], ['peinlich', 'gênant'], ['das Vorstellungsgespräch', 'l’entretien d’embauche']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Jugendliche haben schon immer eine eigene Sprache benutzt.', true], ['Alle neuen Wörter kommen aus dem Englischen.', false], ['Jugendsprache ändert sich langsam.', false], ['Im Vorstellungsgespräch benutzt man die Standardsprache.', true]] },
        { art: 'tabelle', auftrag: 'Sammle Beispiele aus dem Text.', stufe: 2, kopf: ['aus dem Englischen', 'aus dem Sport'], zeilen: [['[chillen]', '[Grinds]'], ['[cringe]', '[Kickflips]']] },
        { art: 'fragen', auftrag: 'Welche Wörter benutzt du mit Freunden? Was bedeuten sie?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'zum Beispiel „safe“ = ganz sicher; „wild“ = verrückt, überraschend' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch in der Pause', wo: 'Schulhof · Pause', titel: 'Hast du das gesehen?',
      situation: 'Mia, Finn und Nele sprechen in der Pause. Zuerst geht es um einen Skate-Trick, dann um ein Mädchen aus der Parallelklasse.',
      bild: ['mia:aufgeregt:handy', 'finn:froh:laessig'], sprecher: { Finn: 'm3', Mia: 'w2', Nele: 'w3' },
      text: [
        ['Finn', 'Digga, hast du das Video gesehen? Ich habe endlich den Kickflip geschafft!'],
        ['Mia', 'Krass! Wie lange hast du geübt?'],
        ['Finn', 'Drei Wochen, jeden Tag im Skatepark. Ich bin so oft hingefallen, das war echt cringe.'],
        ['Mia', 'Egal, jetzt kannst du es. Ehrlich, Respekt!'],
        ['Finn', 'Habt ihr übrigens die neue Jacke von Sophie gesehen? Die sieht voll komisch aus.'],
        ['Nele', 'Hm, ich weiß nicht. Ich finde, wir sollten nicht über sie lästern. Sie ist ja nicht da.'],
        ['Finn', 'War doch nur ein Witz.'],
        ['Nele', 'Für sie wäre es vielleicht kein Witz. Stell dir vor, jemand redet so über dich.'],
        ['Mia', 'Nele hat recht. Komm, zeig uns lieber noch mal deinen Kickflip!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „lästern“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['schlecht über jemanden reden, der nicht da ist', 'laut lachen', 'jemandem helfen'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie lange hat Finn für den Kickflip geübt?', o: ['drei Tage', 'drei Wochen', 'drei Monate'], r: 1 }, { f: 'Was findet Finn cringe?', o: ['dass er so oft hingefallen ist', 'die Jacke', 'das Video'], r: 0 }, { f: 'Was sagt Nele?', o: ['Die Jacke ist wirklich komisch.', 'Wir sollten nicht über sie lästern.'], r: 1 }] },
        { art: 'fragen', auftrag: 'Wie findest du Neles Reaktion? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ich finde sie gut, weil sie Sophie schützt und mutig ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Rollenspiel: Jemand lästert über eine andere Person. Reagiert freundlich, aber klar.', stufe: 3, karten: [
        { titel: 'Reagieren', text: ['Ich finde, wir sollten nicht über … reden.', 'Stell dir vor, jemand redet so über dich.', 'Lass uns lieber über … reden.'] },
        { titel: 'Ich-Botschaft', text: ['Mir ist das unangenehm, weil …', 'Da mache ich nicht mit.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wörter erklären (Definition)', punkte: ['Ein Skatepark ist **ein Ort, wo** man skaten kann.', '„Chillen“ **bedeutet**: sich entspannen.', 'Ein Kickflip ist **ein Trick, bei dem** sich das Brett dreht.', 'So geht es: **Oberbegriff** (ein Trick) + **Merkmal** (das Brett dreht sich).'] },
         { titel: 'Ober- und Unterbegriffe', tabelle: { kopf: ['Oberbegriff', 'Unterbegriffe'], zeilen: [['Werkzeug', 'Hammer, Säge, Bohrer'], ['Sportart', 'Skaten, Basketball, Klettern'], ['Musik', 'Hip-Hop, Pop, Rock'], ['Beruf', 'Koch, Elektrikerin, Gärtner']] } }],
        [{ art: 'tipp', titel: 'Welche Sprache passt?', text: '**Freunde, Chat:** Jugendsprache ist okay. **Lehrperson, Betrieb, Bewerbung:** Standardsprache. Frag dich: **Mit wem** spreche ich und **wo**?' },
         { art: 'achtung', titel: 'Lästern tut weh', text: 'Wird über dich gelästert oder wirst du ausgelacht? Sprich mit jemandem, dem du vertraust. Hilfe: **116 111** (gratis, anonym).' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Sag es in der Standardsprache.', stufe: 1, kopf: ['Jugendsprache', 'Standardsprache'], saetze: [['Digga, das war voll krass!', 'Mein Freund, das war wirklich toll!'], ['Ich chill heute nur.', 'Ich entspanne mich heute nur.'], ['Das ist so cringe.', 'Das ist so peinlich.'], ['Ich bin total lost.', 'Ich verstehe gar nichts.']] },
      { art: 'zuordnen', auftrag: 'Welcher Unterbegriff passt zum Oberbegriff? Verbinde.', stufe: 1, links: ['Werkzeug', 'Gefühl', 'Getränk', 'Kleidungsstück', 'Instrument'], rechts: ['die Zange', 'die Freude', 'der Saft', 'der Pullover', 'die Gitarre'], ordnung: [2, 0, 4, 1, 3] },
      { art: 'fragen', auftrag: 'Erkläre die Wörter wie ein Wörterbuch (Oberbegriff + Merkmal).', stufe: 2, fragen: [{ f: 'eine Werkstatt', l: 'Eine Werkstatt ist ein Raum, in dem man etwas repariert oder baut.' }, { f: 'ein Lehrling', l: 'Ein Lehrling ist eine Person, die im Betrieb einen Beruf lernt.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Artikel für die Schülerzeitung: Welche Wörter benutzt ihr gerade? Erkläre mindestens drei Wörter und sag, wann man sie besser nicht benutzt.', stufe: 2,
        anfaenge: ['Bei uns sagt man gerade oft …', '„…“ bedeutet …', 'Man benutzt es, wenn …', 'Aber im Vorstellungsgespräch …'], zeilen: 10,
        beispiel: 'Bei uns sagt man gerade oft „safe“. „Safe“ bedeutet: ganz sicher. Man benutzt es, wenn man zustimmt. Ein anderes Wort ist „wild“: Das bedeutet „verrückt“ oder „überraschend“. Und „lost“ heißt: Ich verstehe nichts. Aber im Vorstellungsgespräch sagt man lieber: „Das habe ich nicht verstanden.“' },
    ],
    check: ['Ich verstehe einen Artikel über Jugendsprache.', 'Ich verstehe ein Gespräch unter Jugendlichen.', 'Ich erkläre Wörter mit Oberbegriff und Merkmal.', 'Ich wähle die passende Sprache: Freunde oder Betrieb.', 'Ich reagiere freundlich, aber klar, wenn jemand lästert.'],
  },
  // ================================================================ 8
  {
    thema: 'Zukunft · Interview', titel: 'Berufe mit Zukunft', untertitel: 'Wo werden Leute gesucht? Du liest einen Infotext, hörst ein Interview mit einer Elektrikerin, planst eine Betriebsbesichtigung – und schreibst ins Lernjournal.',
    ziel: { de: 'Ich verstehe Infos über Berufschancen, führe ein Interview und plane eine Betriebsbesichtigung.', fr: 'Je comprends des infos sur l’emploi, je mène une interview et j’organise une visite d’entreprise.' },
    bild: ['amira:froh:blatt', 'mutter:stolz:stehen'],
    start: {
      was: 'Branchen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Beruf gehört zu welcher Branche? Verbinde.', stufe: 1, links: ['Handwerk', 'Gesundheit', 'Gastronomie', 'Informatik', 'Verkauf'], rechts: ['Elektriker/in', 'Pflegehelfer/in', 'Koch / Köchin', 'Informatiker/in', 'Verkäufer/in'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Infotext über Berufschancen', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Infoblatt Berufsorientierung', titel: 'Wo werden Leute gesucht?',
      absaetze: [
        'In Luxemburg und in vielen Ländern Europas fehlen **Fachkräfte**. Das sind Menschen mit einer guten Ausbildung in ihrem Beruf. Viele Betriebe suchen lange, bis sie die richtige Person finden.',
        'Besonders gesucht sind Leute im **Handwerk**: Elektrikerinnen und Elektriker, Installateure für Heizung und Sanitär, Mechatroniker. **Wenn** du gern mit den Händen arbeitest, **dann** hast du hier gute Chancen.',
        'Auch im **Gesundheitsbereich** fehlen Menschen, zum Beispiel in der Pflege. Weil die Menschen immer älter werden, braucht man immer mehr Pflegekräfte.',
        'In der **Informatik** und bei der **Energie** entstehen neue Aufgaben. Solaranlagen **werden** montiert, Wärmepumpen **werden** eingebaut, Computernetze **werden** betreut.',
        '**Unser Tipp:** Mach mehrere Praktika. So findest du heraus, was dir gefällt – und die Betriebe lernen dich kennen.',
      ],
      woerter: [['die Fachkraft', 'le professionnel qualifié'], ['fehlen', 'manquer'], ['das Handwerk', 'l’artisanat'], ['die Heizung', 'le chauffage'], ['die Pflege', 'les soins'], ['die Solaranlage', 'l’installation solaire'], ['die Wärmepumpe', 'la pompe à chaleur'], ['entstehen', 'apparaître']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'In welchen Bereichen werden Leute gesucht? Nenne je ein Beispiel.', stufe: 1, kopf: ['Bereich', 'Beispiel'], zeilen: [['[Handwerk]', '[Elektriker/in]'], ['[Gesundheit]', '[Pflege]'], ['[Informatik und Energie]', '[Solaranlagen montieren]']] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Warum braucht man immer mehr Pflegekräfte?', l: 'Weil die Menschen immer älter werden.' }, { f: 'Welchen Tipp gibt der Text?', l: 'Man soll mehrere Praktika machen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview über einen Beruf', wo: 'Interview · Projekt „Berufe live“', titel: 'Fragen an eine Elektrikerin',
      situation: 'Amira interviewt Frau Kiesser. Sie ist Elektrikermeisterin und hat einen eigenen Betrieb. Amira hat einen Fragebogen vorbereitet.',
      bild: ['amira:froh:blatt', 'mutter:stolz:erklaeren'], sprecher: { Amira: 'w2', 'Frau Kiesser': 'w1' },
      text: [
        ['Amira', 'Frau Kiesser, danke, dass Sie Zeit haben. Erste Frage: Wie sind Sie Elektrikerin geworden?'],
        ['Frau Kiesser', 'Als Kind habe ich schon alles auseinandergebaut: Radios, Lampen, Spielzeug. Nach der Schule habe ich dann eine Ausbildung gemacht.'],
        ['Amira', 'Waren Sie die einzige Frau in Ihrer Klasse?'],
        ['Frau Kiesser', 'Ja, damals schon. Am Anfang gab es ein paar dumme Sprüche. Aber wenn man gute Arbeit macht, dann zählt das am Ende.'],
        ['Amira', 'Was machen Sie an einem normalen Tag?'],
        ['Frau Kiesser', 'Heute wurden zum Beispiel in einem neuen Haus alle Leitungen verlegt. Morgen wird eine Solaranlage angeschlossen.'],
        ['Amira', 'Und was muss man für diesen Beruf können?'],
        ['Frau Kiesser', 'Genau arbeiten, Mathe ist wichtig, und man muss vorsichtig sein. Bei Strom darf man keine Fehler machen.'],
        ['Amira', 'Noch eine spontane Frage: Kann unsere Klasse Ihren Betrieb besuchen?'],
        ['Frau Kiesser', 'Sehr gern! Ruft mich an, dann finden wir einen Termin.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört zu einem guten Interview? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Fragen vorher aufschreiben', 'nachfragen, wenn etwas interessant ist', 'die Person oft unterbrechen'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Frau Kiesser hat als Kind Dinge auseinandergebaut.', true], ['In ihrer Klasse waren viele Frauen.', false], ['Morgen wird eine Solaranlage angeschlossen.', true], ['Mathe ist für den Beruf nicht wichtig.', false], ['Die Klasse darf den Betrieb besuchen.', true]] },
        { art: 'fragen', auftrag: 'Welche spontane Frage stellt Amira?', stufe: 2, fragen: [{ f: '', l: 'Kann unsere Klasse Ihren Betrieb besuchen?' }] },
      ],
      nach: [{ art: 'interview', auftrag: 'Führt ein Interview mit einer erwachsenen Person über ihren Beruf (zum Beispiel jemand aus der Schule). Ergänzt eine eigene Frage.', stufe: 3, spalten: ['Antwort'], fragen: ['Was ist Ihr Beruf?', 'Wie sind Sie zu diesem Beruf gekommen?', 'Was machen Sie an einem normalen Tag?', 'Was muss man für den Beruf können?', 'Eigene Frage: …'] }],
    },
    regel: {
      reihen: [
        [{ titel: 'wenn – dann (Wiederholung)', punkte: ['**Wenn** du gern mit den Händen **arbeitest**, **dann hast** du gute Chancen.', '**Wenn** man gute Arbeit **macht**, **dann zählt** das.', 'Der wenn-Satz kann auch hinten stehen: Du hast gute Chancen, **wenn** du …'] },
         { titel: 'Passiv: heute und gestern', tabelle: { kopf: ['Präsens', 'Präteritum'], zeilen: [['Die Anlage **wird** angeschlossen.', 'Die Anlage **wurde** angeschlossen.'], ['Die Leitungen **werden** verlegt.', 'Die Leitungen **wurden** verlegt.']] } }],
        [{ art: 'tipp', titel: 'Betriebsbesichtigung planen', text: '**Wer** ruft an? **Wann** passt es? **Wie** kommen wir hin? **Was** wollen wir fragen? **Wer** schreibt danach den Dank?' },
         { art: 'achtung', titel: 'Keine Klischees!', text: 'Es gibt keine Männer- und Frauenberufe. Jeder Mensch kann den Beruf lernen, der zu ihm passt.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Passiv im Präteritum: wurde oder wurden.', stufe: 1, saetze: ['Gestern [wurde] eine Solaranlage montiert.', 'Die Kabel [wurden] verlegt.', 'Der Betrieb [wurde] 1990 gegründet.', 'Wir [wurden] sehr freundlich begrüßt.'] },
      { art: 'sprechen', auftrag: 'Diskutiert: Welchen Betrieb besucht eure Klasse? Jede Person schlägt einen Betrieb vor und begründet.', stufe: 3, karten: [
        { titel: 'Vorschlagen', text: ['Ich schlage vor, dass wir … besuchen, weil …', 'Wenn wir … besuchen, dann können wir …'] },
        { titel: 'Reagieren und einigen', text: ['Das ist eine gute Idee, aber …', 'Da bin ich anderer Meinung, weil …', 'Also, wir einigen uns auf …'] }] },
      { art: 'tabelle', auftrag: 'Verteilt die Aufgaben für die Betriebsbesichtigung.', stufe: 2, kopf: ['Aufgabe', 'Wer?', 'Bis wann?'], breiten: [50, 25, 25], zeilen: [['im Betrieb anrufen', '', ''], ['den Termin mit der Lehrperson klären', '', ''], ['den Weg planen (Bus, Zug)', '', ''], ['Fragen vorbereiten', '', ''], ['eine Dankes-E-Mail schreiben', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Lernjournal: Was hast du in Modul 6 gelernt? Was willst du noch üben? Setz dir ein Ziel.', stufe: 2,
        anfaenge: ['In diesem Modul habe ich gelernt, …', 'Leicht war für mich …', 'Schwer war …', 'Mein Ziel für die nächsten Wochen: …', 'Dafür werde ich …'], zeilen: 10,
        beispiel: 'In diesem Modul habe ich gelernt, wie man eine Bewerbung schreibt. Leicht war für mich das Telefonieren im Rollenspiel. Schwer war das Passiv. Mein Ziel für die nächsten Wochen: Ich will einen Praktikumsplatz finden. Dafür werde ich drei Betriebe anrufen.' },
    ],
    check: ['Ich verstehe einen Infotext über Berufschancen.', 'Ich verstehe ein Interview über einen Beruf.', 'Ich führe ein Interview mit einem Fragebogen.', 'Ich vertrete in einer Diskussion meine Meinung.', 'Ich schreibe ein Lernjournal und setze mir Ziele.'],
  },
]
