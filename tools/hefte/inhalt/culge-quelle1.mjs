// LEKTIONSQUELLE (Stand vor der Prüfung am 26.11.2026). Die Module culge-m1 … m9 setzen sich nach dem Programm CULGE VP
// (CNES, 30/06/2026) aus diesen Lektionen zusammen – siehe culge-module.mjs. Das MODUL unten wird nicht mehr benutzt.
// Culture générale · Modul 1 (7P) – Schwerpunkt Geschichte, Bürgerkunde und Berufsorientierung.
// Nach dem MENJE-Leitfaden zur Voie de préparation (Module 1, 4, 7: Geschichte, éducation à la citoyenneté,
// orientation professionnelle). Themen: Regeln und Klassenrat, Zeit und Zeitleiste, Quellen, Steinzeit,
// Römer in Luxemburg, Mittelalter und Gründung der Stadt Luxemburg, Interessen und Berufsfelder.
// Geschichtliche Angaben: nur gut belegte Eckdaten, vereinfacht. Personen der Dialoge: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { luxKarte } from './karten.mjs'

export const MODUL = sachModul('culge', 1, {
  titel: 'Zusammen leben – Spuren der Zeit',
  titelFr: 'Vivre ensemble – traces du temps',
  unter: 'Regeln und Klassenrat, Zeitleisten und Quellen, Steinzeit, Römer und Burgen in Luxemburg – und die Frage: Was kann ich gut? In acht Lektionen.',
  unterFr: 'Règles et conseil d’élèves, frise chronologique et sources, préhistoire, Romains et châteaux au Luxembourg – et : qu’est-ce que je sais bien faire ?',
  farbe: '#8a5a2b',
  deckbild: ['lina:froh:stehen-zeigen', 'opa:froh:stehen', 'finn:froh:blatt'],
  blasen: [{ t: 'Wann war das?', x: 14, y: 112 }, { t: 'Woher weiß man das?', x: 112, y: 98 }, { t: 'Abstimmen!', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'Zusammen in der Klasse', fr: 'Ensemble dans la classe' }, icon: 'users-group', lektionen: 2 },
    { titel: { de: 'Spuren der Zeit', fr: 'Les traces du temps' }, icon: 'hourglass', lektionen: 5 },
    { titel: { de: 'Mein Weg', fr: 'Mon chemin' }, icon: 'compass', lektionen: 1 },
  ],
  karten: true,
})

const zeitWoerter = [['die Zeitleiste', 'la frise chronologique'], ['das Jahrhundert', 'le siècle'], ['vor Christus (v. Chr.)', 'avant Jésus-Christ (av. J.-C.)'], ['nach Christus (n. Chr.)', 'après Jésus-Christ (apr. J.-C.)']]

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Regeln · Rechte und Pflichten', titel: 'Regeln für alle', untertitel: 'Warum braucht eine Schule Regeln? Du liest eine Hausordnung, hörst ein Gespräch im Klassenrat und unterscheidest Rechte und Pflichten.',
    ziel: { de: 'Ich erkläre, wozu Regeln gut sind, und unterscheide Rechte und Pflichten.', fr: 'J’explique à quoi servent les règles et je distingue droits et devoirs.' },
    bild: ['lehrer:froh:erklaeren', 'sami:froh:stehen'],
    start: {
      was: 'Regeln überall',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wo gilt diese Regel? Verbinde.', stufe: 1, links: ['Bei Rot bleibst du stehen.', 'Im Bus bleibst du sitzen.', 'Im Schwimmbad duschst du vor dem Baden.', 'In der Bibliothek bist du leise.', 'Beim Fußball spielt nur der Torwart mit der Hand.'], rechts: ['an der Ampel', 'im Bus', 'im Schwimmbad', 'in der Bibliothek', 'im Sport'] },
      ],
    },
    lesen: {
      was: 'Eine Hausordnung', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Hausordnung einer Schule (ausgedacht, gekürzt)', titel: 'So leben wir gut zusammen',
      absaetze: [
        'In unserer Schule lernen und arbeiten jeden Tag fast 600 Menschen. Damit sich **alle** wohlfühlen, gibt es diese Hausordnung. Sie gilt für Schülerinnen und Schüler, für Lehrkräfte und für alle anderen Erwachsenen im Haus.',
        '### Respekt',
        'Wir grüßen einander und sprechen freundlich. Niemand wird ausgelacht, beleidigt oder ausgeschlossen – auch nicht im Klassenchat. Wer Probleme hat, darf jederzeit eine Vertrauensperson ansprechen.',
        '### Pünktlichkeit und Material',
        'Der Unterricht beginnt um 8 Uhr. Wir sind pünktlich und haben unser Material dabei. Wer fehlt, bringt am nächsten Schultag eine Entschuldigung mit.',
        '### Handy',
        'Im Unterricht bleibt das Handy ausgeschaltet in der Tasche – außer die Lehrkraft erlaubt es für eine Aufgabe. In den Pausen darf man es auf dem Schulhof benutzen. Fotos und Videos von anderen machen wir **nur mit Erlaubnis**.',
        '### Sicherheit',
        'Bei Feueralarm verlassen wir ruhig das Gebäude und gehen zum Sammelplatz. Auf den Treppen rennen wir nicht.',
      ],
      info: { titel: 'Rechte und Pflichten', punkte: ['Ein **Recht** ist etwas, das du **darfst** oder **bekommst**: Du hast zum Beispiel das Recht, respektvoll behandelt zu werden.', 'Eine **Pflicht** ist etwas, das du **tun musst**: Du hast zum Beispiel die Pflicht, pünktlich zu sein.', 'Rechte und Pflichten gehören zusammen: Mein Recht auf Respekt ist die Pflicht der anderen – und umgekehrt.'] },
      woerter: [['die Hausordnung', 'le règlement intérieur'], ['die Regel', 'la règle'], ['das Recht', 'le droit'], ['die Pflicht', 'le devoir'], ['der Respekt', 'le respect'], ['die Vertrauensperson', 'la personne de confiance'], ['die Entschuldigung', 'l’excuse (le mot d’excuse)'], ['der Sammelplatz', 'le point de rassemblement']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch? Kreuze an.', stufe: 1, saetze: [['Die Hausordnung gilt nur für die Schülerinnen und Schüler.', false], ['Im Klassenchat darf man andere auslachen.', false], ['In der Pause darf man das Handy auf dem Schulhof benutzen.', true], ['Fotos von anderen macht man nur mit Erlaubnis.', true], ['Bei Feueralarm rennt man schnell die Treppe hinunter.', false]] },
        { art: 'tabelle', auftrag: 'Recht oder Pflicht? Kreuze an.', stufe: 2, kopf: ['', 'Recht', 'Pflicht'], breiten: [64, 18, 18], zeilen: [['Ich werde respektvoll behandelt.', '[x]', ''], ['Ich bin pünktlich.', '', '[x]'], ['Ich darf eine Vertrauensperson ansprechen.', '[x]', ''], ['Ich bringe eine Entschuldigung mit.', '', '[x]'], ['Ich frage, bevor ich jemanden fotografiere.', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klassenzimmer · Klassenstunde', titel: 'Wozu Regeln?',
      situation: 'Herr Kuedes spricht mit der Klasse 7P2 über Regeln. Sami findet Regeln nervig.',
      bild: ['lehrer:froh:erklaeren', 'sami:verwirrt:verschraenkt'], sprecher: { 'Herr Kuedes': 'm1', Sami: 'm3', Lina: 'w3' },
      text: [
        ['Herr Kuedes', 'Heute sprechen wir über Regeln. Sami, du schaust so skeptisch. Was denkst du?'],
        ['Sami', 'Ehrlich? Regeln nerven. Immer heißt es: Das darfst du nicht, das musst du.'],
        ['Herr Kuedes', 'Stell dir ein Fußballspiel ohne Regeln vor. Jeder darf den Ball in die Hand nehmen, es gibt keinen Schiedsrichter …'],
        ['Sami', 'Dann wäre es Chaos. Und die Stärksten würden immer gewinnen.'],
        ['Lina', 'Genau. Regeln schützen auch die Schwächeren. Zum Beispiel die Regel, dass niemand ausgelacht wird.'],
        ['Herr Kuedes', 'Sehr gut, Lina. Regeln machen das Zusammenleben fairer und sicherer. Aber: Regeln kann man auch ändern – wenn man es richtig macht.'],
        ['Sami', 'Wie denn?'],
        ['Herr Kuedes', 'Zum Beispiel im Klassenrat. Dort macht ihr Vorschläge, diskutiert und stimmt ab. Nächste Woche probieren wir das aus.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht ein Schiedsrichter? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er achtet darauf, dass alle die Regeln einhalten.', 'Er schießt die Tore.', 'Er verkauft die Eintrittskarten.'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was denkt Sami am Anfang?', o: ['Regeln nerven.', 'Regeln sind super.', 'Regeln sind egal.'], r: 0 }, { f: 'Was wäre ein Spiel ohne Regeln?', o: ['Chaos', 'langweilig', 'kürzer'], r: 0 }, { f: 'Wo kann man Regeln ändern?', o: ['im Klassenrat', 'auf dem Schulhof', 'im Klassenchat'], r: 0 }] },
        { art: 'luecken', auftrag: 'Hör noch einmal. Ergänze.', stufe: 2, saetze: ['Regeln schützen auch die [Schwächeren].', 'Regeln machen das Zusammenleben [fairer] und [sicherer].', 'Im Klassenrat macht ihr Vorschläge, [diskutiert] und [stimmt ab].'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch vor: eine Schule ohne Regeln, eine Woche lang. Was passiert? Sammelt zu zweit gute und schlechte Folgen.', stufe: 2, karten: [
        { titel: 'So kannst du sagen', text: ['Ohne Regeln würde …', 'Das wäre gut, weil …', 'Das wäre schlecht, weil …'] },
        { titel: 'Nachfragen', text: ['Wie meinst du das?', 'Hast du ein Beispiel?', 'Bist du sicher?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wozu Regeln?', punkte: ['Regeln **ordnen** das Zusammenleben.', 'Regeln **schützen** – besonders die Schwächeren.', 'Regeln machen alles **fairer**: Für alle gilt dasselbe.'] },
         { titel: 'Rechte und Pflichten', punkte: ['**Recht** = Das darf ich. Das steht mir zu.', '**Pflicht** = Das muss ich tun.', 'Mein Recht ist oft die Pflicht der anderen.'] }],
        [{ art: 'tipp', titel: 'Gute Regeln …', text: '… sind **kurz** und **klar**, gelten für **alle** und sagen, **was man tun soll** (nicht nur, was verboten ist).' },
         { art: 'achtung', titel: 'Regel gebrochen – was jetzt?', text: 'Wer eine Regel bricht, muss mit **Folgen** rechnen. Gute Folgen sind **fair** und helfen, den Schaden **wiedergutzumachen**.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Mach aus dem Verbot eine gute Regel: Sag, was man tun soll.', stufe: 2, kopf: ['Verbot', 'gute Regel'], saetze: [['Nicht schreien!', 'Wir sprechen in normaler Lautstärke.'], ['Keinen Müll auf den Boden werfen!', 'Wir werfen den Müll in den Mülleimer.'], ['Nicht dazwischenreden!', 'Wir lassen die anderen ausreden.'], ['Nicht zu spät kommen!', 'Wir sind pünktlich.']] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Kreuze an und begründe.', stufe: 3, aussagen: ['Handys sollten in der ganzen Schule verboten sein – auch in der Pause.', 'Die Klasse sollte ihre Regeln selbst bestimmen dürfen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe fünf Regeln für eure Klasse. Achte darauf: kurz, klar, für alle – und sag, was man tun soll.', stufe: 2,
        anfaenge: ['1. Wir …', '2. Wir …', '3. Wenn jemand …, dann …', '4. Im Unterricht …', '5. In der Pause …'], zeilen: 7,
        beispiel: '1. Wir grüßen einander. 2. Wir lassen die anderen ausreden. 3. Wenn jemand Hilfe braucht, dann helfen wir. 4. Im Unterricht bleibt das Handy in der Tasche. 5. In der Pause räumen wir unseren Müll weg.' },
    ],
    check: ['Ich erkläre, wozu Regeln gut sind.', 'Ich unterscheide Rechte und Pflichten.', 'Ich schreibe Regeln, die sagen, was man tun soll.'],
  },
  // ================================================================ 2
  {
    thema: 'Klassenrat · Mehrheit · abstimmen', titel: 'Der Klassenrat entscheidet', untertitel: 'Vorschlag, Diskussion, Abstimmung: Du liest, wie ein Klassenrat funktioniert, hörst eine echte Sitzung und leitest selbst eine Abstimmung.',
    ziel: { de: 'Ich erkläre, wie ein Klassenrat abläuft, und werte eine Abstimmung aus.', fr: 'J’explique comment se déroule un conseil d’élèves et j’analyse un vote.' },
    bild: ['lina:froh:melden', 'noah:froh:blatt'],
    start: {
      was: 'Gemeinsam entscheiden',
      aufgaben: [
        { art: 'mc', auftrag: 'Eure Klasse plant einen Ausflug. Wie entscheidet ihr am fairsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Die Lehrkraft entscheidet allein.', 'Der lauteste Schüler entscheidet.', 'Alle machen Vorschläge und stimmen ab.', 'Wir losen.'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Infoblatt', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infoblatt für die Klasse 7P2', titel: 'So funktioniert unser Klassenrat',
      absaetze: [
        'Der **Klassenrat** ist eine Versammlung der ganzen Klasse. Er trifft sich einmal pro Woche, zum Beispiel in der Klassenstunde. Hier besprechen wir, was uns wichtig ist: Probleme, Wünsche und Ideen.',
        '### Die Rollen',
        'Jede Woche gibt es neue Rollen: Die **Leitung** führt durch die Sitzung und gibt das Wort weiter. Das **Protokoll** schreibt die Beschlüsse auf. Die **Zeitwächterin** oder der **Zeitwächter** achtet auf die Uhr.',
        '### Der Ablauf',
        'Zuerst liest die Leitung die Themen vor. Die Themen hat die Klasse vorher auf einen Zettel an der Wand geschrieben. Dann wird jedes Thema besprochen: Wer etwas sagen will, meldet sich. Danach macht jemand einen **Vorschlag**, und die Klasse **stimmt ab**.',
        '### Die Mehrheit',
        'Ein Vorschlag ist angenommen, wenn **mehr als die Hälfte** der Anwesenden dafür ist. Das nennt man die **Mehrheit**. Wer anderer Meinung ist, akzeptiert das Ergebnis – darf aber später einen neuen Vorschlag machen.',
      ],
      woerter: [['der Klassenrat', 'le conseil d’élèves (conseil de coopération)'], ['die Leitung', 'la présidence'], ['das Protokoll', 'le procès-verbal'], ['der Vorschlag', 'la proposition'], ['abstimmen', 'voter'], ['die Mehrheit', 'la majorité'], ['der Beschluss', 'la décision'], ['anwesend', 'présent']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer macht was? Verbinde.', stufe: 1, links: ['die Leitung', 'das Protokoll', 'der Zeitwächter', 'die ganze Klasse'], rechts: ['führt durch die Sitzung und gibt das Wort weiter', 'schreibt die Beschlüsse auf', 'achtet auf die Uhr', 'diskutiert und stimmt ab'] },
        { art: 'ordnen', auftrag: 'Bring den Ablauf in die richtige Reihenfolge.', stufe: 2, teile: ['Die Leitung liest die Themen vor.', 'Die Klasse bespricht ein Thema.', 'Jemand macht einen Vorschlag.', 'Die Klasse stimmt ab.', 'Das Protokoll schreibt den Beschluss auf.'], ordnung: [3, 0, 4, 2, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Sitzung', wo: 'Klasse 7P2 · Klassenrat', titel: 'Wohin geht unser Ausflug?',
      situation: 'Im Klassenrat leitet Lina die Sitzung. Die Klasse entscheidet über das Ziel des Ausflugs. 22 Schülerinnen und Schüler sind anwesend.',
      bild: ['lina:froh:blatt', 'finn:froh:melden'], sprecher: { Lina: 'w3', Finn: 'm3', Amira: 'w2', Noah: 'm2' },
      text: [
        ['Lina', 'Willkommen zum Klassenrat. Heute haben wir ein Thema: unser Ausflug im Mai. Wer hat einen Vorschlag?'],
        ['Finn', 'Ich schlage das Römermuseum vor. Da kann man Mosaike sehen und Spiele wie die Römer spielen.'],
        ['Amira', 'Ich schlage den Kletterpark vor. Wir sitzen schon genug in der Schule!'],
        ['Noah', 'Und ich schlage eine Wanderung mit Picknick vor. Das kostet fast nichts.'],
        ['Lina', 'Danke. Gibt es Fragen oder Meinungen? … Gut, dann stimmen wir ab. Jeder hat eine Stimme. Wer ist für das Römermuseum? … Sechs Stimmen.'],
        ['Lina', 'Wer ist für den Kletterpark? … Zwölf Stimmen. Und wer ist für die Wanderung? … Vier Stimmen.'],
        ['Noah', 'Schade. Aber okay, die Mehrheit hat entschieden.'],
        ['Lina', 'Genau. Zwölf von zweiundzwanzig – das ist mehr als die Hälfte. Der Kletterpark ist angenommen. Finn, schreibst du das ins Protokoll?'],
        ['Finn', 'Klar, mach ich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Die Klasse hat 22 Anwesende. Wie viele Stimmen braucht ein Vorschlag mindestens für die Mehrheit? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['11', '12', '20'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und trage das Ergebnis ein.', stufe: 1, kopf: ['Vorschlag', 'von wem?', 'Stimmen'], breiten: [40, 30, 30], zeilen: [['Römermuseum', '[Finn]', '[6]'], ['Kletterpark', '[Amira]', '[12]'], ['Wanderung mit Picknick', '[Noah]', '[4]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Der Kletterpark hat die Mehrheit.', true], ['Noah ist sauer und geht.', false], ['Finn schreibt das Protokoll.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt einen Klassenrat: Thema „Was machen wir am letzten Schultag?“. Verteilt die Rollen, macht drei Vorschläge und stimmt ab.', stufe: 3, karten: [
        { titel: 'Leitung', text: ['Wer hat einen Vorschlag?', 'Du hast das Wort, …', 'Wer ist dafür?'] },
        { titel: 'Alle', text: ['Ich schlage vor, dass …', 'Ich bin dafür, weil …', 'Ich bin dagegen, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Mehrheit', punkte: ['**Mehrheit** = mehr als die Hälfte der Stimmen.', 'Beispiel: 22 Anwesende → Hälfte = 11 → Mehrheit ab **12** Stimmen.', 'Das Ergebnis gilt für **alle**.'] },
         { titel: 'Fair diskutieren', punkte: ['Sich **melden** und warten.', 'Andere **ausreden** lassen.', 'Die **Sache** kritisieren, nicht die Person.'] }],
        [{ art: 'tipp', titel: 'Demokratie im Kleinen', text: 'Im Klassenrat übt ihr **Demokratie**: Alle dürfen mitreden, jede Stimme zählt gleich, die Mehrheit entscheidet – und die Minderheit wird respektiert.' }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Mehrheit oder nicht? Rechne und entscheide.', stufe: 2, spalten: 2, items: [
        { a: '24 Anwesende, 13 Stimmen dafür', l: 'Hälfte = 12 → 13 ist mehr → angenommen', raum: 2 },
        { a: '20 Anwesende, 10 Stimmen dafür', l: 'Hälfte = 10 → nicht mehr → abgelehnt', raum: 2 },
        { a: '18 Anwesende, 9 dafür, 7 dagegen, 2 enthalten sich', l: 'Hälfte = 9 → 9 ist nicht mehr → abgelehnt', raum: 2 },
        { a: '15 Anwesende: Wie viele Stimmen braucht man?', l: 'Hälfte = 7,5 → mindestens 8', raum: 2 }] },
      { art: 'dilemma', auftrag: 'Was ist fair? Lies und entscheide.', stufe: 3,
        geschichte: 'Im Klassenrat stimmt die Mehrheit für einen Ausflug in den Kletterpark. Jana hat Höhenangst und kann nicht mitklettern. Sie ist traurig: „Dann sitze ich den ganzen Tag allein unten.“',
        frage: 'Was soll die Klasse tun?', optionen: ['Es bleibt beim Kletterpark. Die Mehrheit hat entschieden.', 'Die Klasse stimmt noch einmal ab und sucht ein Ziel für alle.'],
        hinweis: 'Mögliche Gedanken: Die Mehrheit entscheidet, aber sie soll die Minderheit nicht ausschließen. Vielleicht gibt es im Kletterpark auch Aufgaben am Boden (Fotos, Picknick, Spiele) – oder eine Lösung mit Jana gemeinsam.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Du schreibst das Protokoll der Sitzung aus der Hördatei. Notiere: Datum, Thema, Vorschläge, Ergebnis, Beschluss.', stufe: 2,
        anfaenge: ['Protokoll des Klassenrats vom …', 'Thema: …', 'Vorschläge: …', 'Abstimmung: …', 'Beschluss: …'], zeilen: 7,
        beispiel: 'Protokoll des Klassenrats vom 15. März. Thema: Ausflug im Mai. Vorschläge: Römermuseum (Finn), Kletterpark (Amira), Wanderung mit Picknick (Noah). Abstimmung: 6, 12 und 4 Stimmen. Beschluss: Wir fahren in den Kletterpark.' },
    ],
    check: ['Ich erkläre den Ablauf eines Klassenrats.', 'Ich weiß, was eine Mehrheit ist, und rechne sie aus.', 'Ich schreibe ein kurzes Protokoll.'],
  },
  // ================================================================ 3
  {
    thema: 'Zeit · Zeitleiste · Jahrhundert', titel: 'Reise durch die Zeit', untertitel: 'Vor Christus, nach Christus, Jahrhunderte: Du lernst, wie man Zeit ordnet, und baust eine Zeitleiste von Luxemburg.',
    ziel: { de: 'Ich lese und zeichne eine Zeitleiste und nenne das richtige Jahrhundert.', fr: 'Je lis et dessine une frise chronologique et je nomme le bon siècle.' },
    bild: ['opa:froh:stehen', 'mia:ueberrascht:stehen'],
    start: {
      was: 'Was war früher?',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was ist am längsten her? Ordne von früher bis heute.', stufe: 1, teile: ['Die Dinosaurier leben.', 'Menschen malen Tiere an Höhlenwände.', 'Die Römer bauen Straßen.', 'Ritter wohnen auf Burgen.', 'Das erste Handy kommt auf den Markt.'], ordnung: [2, 4, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Wie man Zeit ordnet',
      absaetze: [
        'Geschichte erzählt, was früher passiert ist. Damit wir nicht durcheinanderkommen, ordnen wir die Ereignisse auf einer **Zeitleiste**: Links steht, was früher war, rechts, was später kam.',
        '### Vor und nach Christus',
        'In Europa zählen wir die Jahre meistens ab der Geburt von Jesus Christus. Alles davor heißt **vor Christus** (v. Chr.), alles danach **nach Christus** (n. Chr.). Vor Christus zählt man rückwärts: Das Jahr 50 v. Chr. liegt **näher** an Christi Geburt als das Jahr 500 v. Chr. Ein Jahr 0 gibt es nicht.',
        '### Jahrhunderte',
        'Hundert Jahre sind ein **Jahrhundert**. Die Jahre 1 bis 100 sind das 1. Jahrhundert, die Jahre 1801 bis 1900 das 19. Jahrhundert. Ein Trick: Bei 1839 nimmst du die ersten zwei Ziffern (18) und zählst 1 dazu – das ist das 19. Jahrhundert.',
        '### Epochen',
        'Lange Zeitabschnitte nennt man **Epochen**: zum Beispiel die Steinzeit, die Antike mit den Römern, das Mittelalter mit den Burgen und die Neuzeit.',
      ],
      woerter: [...zeitWoerter, ['die Epoche', 'l’époque'], ['das Ereignis', 'l’événement'], ['die Steinzeit', 'la préhistoire (l’âge de pierre)'], ['das Mittelalter', 'le Moyen Âge']],
      aufgaben: [
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 1, fragen: [{ f: 'Was war früher?', o: ['500 v. Chr.', '50 v. Chr.'], r: 0 }, { f: 'Zu welchem Jahrhundert gehört das Jahr 1839?', o: ['18. Jahrhundert', '19. Jahrhundert', '20. Jahrhundert'], r: 1 }, { f: 'Zu welchem Jahrhundert gehört das Jahr 963?', o: ['9. Jahrhundert', '10. Jahrhundert'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Ergänze das Jahrhundert.', stufe: 2, kopf: ['Jahr', 'Jahrhundert'], breiten: [40, 60], zeilen: [['1957', '[20. Jahrhundert]'], ['1550', '[16. Jahrhundert]'], ['2026', '[21. Jahrhundert]'], ['1350', '[14. Jahrhundert]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Beim Opa · Fotoalbum', titel: 'Wie alt ist das?',
      situation: 'Mia schaut mit ihrem Opa alte Sachen an. Er erzählt, wie alt die Dinge sind.',
      bild: ['opa:froh:sitzen', 'mia:ueberrascht:stehen'], sprecher: { Opa: 'm1', Mia: 'w3' },
      text: [
        ['Mia', 'Opa, was ist das für eine Münze? Sie ist ganz grün.'],
        ['Opa', 'Die hat mein Großvater auf einem Feld bei Dalheim gefunden. Es ist eine römische Münze, ungefähr aus dem Jahr 250 nach Christus.'],
        ['Mia', 'Wow, das ist ja schon über 1700 Jahre her! Und das Foto hier, mit der Schulklasse?'],
        ['Opa', 'Das bin ich, 1962, in meiner ersten Klasse. Damals hatten wir noch Tafeln aus Stein und Kreide.'],
        ['Mia', 'Also im 20. Jahrhundert. Und diese Postkarte?'],
        ['Opa', 'Die zeigt die Burg in Vianden, bevor man sie wieder aufgebaut hat. Sie ist von 1950.'],
        ['Mia', 'Dann ist die Münze das Älteste, danach kommt die Postkarte und dann dein Klassenfoto.'],
        ['Opa', 'Richtig! Du bist ja eine echte Historikerin.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine Historikerin oder ein Historiker … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['erforscht die Vergangenheit.', 'baut Häuser.', 'sagt das Wetter voraus.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Gegenstand', 'Jahr', 'Jahrhundert'], breiten: [40, 30, 30], zeilen: [['römische Münze', '[ungefähr 250 n. Chr.]', '[3. Jahrhundert]'], ['Klassenfoto vom Opa', '[1962]', '[20. Jahrhundert]'], ['Postkarte der Burg Vianden', '[1950]', '[20. Jahrhundert]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Bringt (wenn ihr wollt) einen alten Gegenstand oder ein Foto mit oder sucht eines im Internet. Fragt euch gegenseitig: Wie alt ist das? Woher weißt du das?', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Wie alt ist das ungefähr?', 'Aus welchem Jahrhundert ist das?', 'Woher weißt du das?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Zeitleiste', punkte: ['**links** = früher, **rechts** = später', 'gleiche Abstände = gleiche Zeit', 'v. Chr. zählt **rückwärts**, n. Chr. **vorwärts**'] },
         { titel: 'Jahrhundert finden', nummern: true, punkte: ['Nimm die ersten zwei Ziffern: 18|39 → 18.', 'Zähle 1 dazu: 18 + 1 = 19.', '1839 gehört zum **19. Jahrhundert**.'] }],
        [{ art: 'achtung', titel: 'Volle Hunderter', text: 'Bei vollen Hunderterjahren passt der Trick nicht: **1900** gehört noch zum **19.** Jahrhundert, **1901** schon zum 20.' }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Trage die Ereignisse ein. Die Jahre stehen schon da.', stufe: 2, von: -100, bis: 2100, schritt: 200, nChr: false, hoehe: 96,
        ereignisse: [{ jahr: -50, text: 'Die Römer kommen in unsere Gegend.', leer: true }, { jahr: 963, text: 'Gründung der Stadt Luxemburg', leer: true }, { jahr: 1839, text: 'Luxemburg wird ein unabhängiger Staat.', leer: true }, { jahr: 1957, text: 'Luxemburg gründet mit fünf Ländern die EWG (heute EU).', leer: true }, { jahr: 2026, text: 'heute: ich bin in der 7P', anzeige: '2026' }],
        hilfe: 'Ereignisse: Gründung der Stadt Luxemburg · Die Römer kommen · Luxemburg wird unabhängig · Gründung der EWG (heute EU)' },
      { art: 'luecken', auftrag: 'Früher oder später? Ergänze.', stufe: 3, saetze: ['Das Jahr 300 v. Chr. ist [früher] als das Jahr 30 v. Chr.', 'Zwischen 50 v. Chr. und 50 n. Chr. liegen ungefähr [100] Jahre.', 'Die Stadt Luxemburg wurde vor über [1000] Jahren gegründet.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle ein Ereignis von der Zeitleiste. Erkläre einer jüngeren Person: Wann war das? In welchem Jahrhundert? Wie lange ist das her?', stufe: 2,
        anfaenge: ['Ich erkläre …', 'Das war im Jahr …', 'Das ist das … Jahrhundert.', 'Das ist ungefähr … Jahre her.'], zeilen: 6,
        beispiel: 'Ich erkläre die Gründung der Stadt Luxemburg. Das war im Jahr 963. Das ist das 10. Jahrhundert. Das ist ungefähr 1060 Jahre her.' },
    ],
    check: ['Ich lese eine Zeitleiste.', 'Ich unterscheide v. Chr. und n. Chr.', 'Ich nenne das Jahrhundert zu einem Jahr.'],
  },
  // ================================================================ 4
  {
    thema: 'Quellen · Woher wissen wir das?', titel: 'Detektive der Vergangenheit', untertitel: 'Gegenstände, Bilder, Texte, Erzählungen: Du lernst die Quellenarten kennen und untersuchst eine Quelle wie ein Detektiv.',
    ziel: { de: 'Ich unterscheide vier Arten von Quellen und untersuche eine Quelle mit W-Fragen.', fr: 'Je distingue quatre sortes de sources et j’analyse une source avec des questions.' },
    bild: ['lea:froh:stehen-zeigen', 'yusuf:verwirrt:blatt'],
    start: {
      was: 'Spuren',
      aufgaben: [
        { art: 'fragen', auftrag: 'In 1000 Jahren findet jemand deine Schultasche. Was verrät sie über unser Leben heute? Nenne zwei Dinge.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Wir lernen mit Büchern und Tablets; wir essen Pausenbrote aus Plastikdosen.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Quellen erzählen Geschichte',
      absaetze: [
        'Niemand von uns war bei den Römern dabei. Trotzdem wissen wir viel über sie. Das verdanken wir **Quellen**: Spuren aus der Vergangenheit, die uns etwas erzählen. Man unterscheidet vier Arten.',
        '### Sachquellen',
        'Das sind **Gegenstände**: Werkzeuge, Münzen, Schmuck, Mauerreste oder Knochen. Archäologinnen und Archäologen graben sie aus der Erde aus.',
        '### Bildquellen',
        'Das sind **Bilder** aus der Zeit: Höhlenmalereien, Mosaike, Gemälde, später auch Fotos und Filme.',
        '### Textquellen',
        'Das sind **geschriebene Texte**: Briefe, Urkunden, Inschriften auf Steinen, Tagebücher oder Zeitungen. Textquellen gibt es erst, seit die Menschen schreiben können.',
        '### Mündliche Quellen',
        'Das sind **Erzählungen** von Menschen, die etwas selbst erlebt haben. Man nennt sie **Zeitzeugen**. Zum Beispiel kann deine Oma erzählen, wie die Schule früher war.',
        'Eine Quelle muss man genau **prüfen**: Wer hat sie gemacht? Wann? Und warum? Denn auch Quellen können übertreiben oder etwas weglassen.',
      ],
      woerter: [['die Quelle', 'la source'], ['die Sachquelle', 'la source matérielle'], ['die Bildquelle', 'la source iconographique'], ['die Textquelle', 'la source écrite'], ['der Zeitzeuge', 'le témoin'], ['die Archäologin / der Archäologe', 'l’archéologue'], ['ausgraben', 'fouiller, déterrer'], ['die Urkunde', 'le document officiel']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Quellenart ist das? Kreuze an.', stufe: 1, kopf: ['', 'Sach-', 'Bild-', 'Text-', 'mündlich'], breiten: [44, 14, 14, 14, 14], zeilen: [['ein römisches Mosaik', '', '[x]', '', ''], ['ein Steinbeil', '[x]', '', '', ''], ['ein Brief von 1850', '', '', '[x]', ''], ['Oma erzählt von ihrer Schulzeit', '', '', '', '[x]'], ['eine alte Münze', '[x]', '', '', ''], ['ein Foto von 1962', '', '[x]', '', '']] },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 2, fragen: [{ f: 'Warum gibt es aus der Steinzeit keine Textquellen?', o: ['Die Menschen konnten noch nicht schreiben.', 'Die Texte sind alle verbrannt.', 'Die Menschen hatten kein Papier, aber Computer.'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio · Thema Geschichte', titel: 'Zu Gast: eine Archäologin',
      situation: 'Yusuf und Lea vom Schulradio fragen eine Archäologin, wie sie arbeitet.',
      bild: ['yusuf:froh:handy', 'aerztin:froh:erklaeren'], sprecher: { Yusuf: 'm3', Lea: 'w3', Archäologin: 'w1' },
      text: [
        ['Yusuf', 'Willkommen beim Schulradio! Heute ist eine Archäologin bei uns. Was machen Sie genau?'],
        ['Archäologin', 'Ich suche Spuren von Menschen, die vor langer Zeit gelebt haben. Meistens graben wir sehr vorsichtig, mit kleinen Schaufeln und Pinseln.'],
        ['Lea', 'Was haben Sie zuletzt gefunden?'],
        ['Archäologin', 'Bei einer Baustelle haben wir die Mauern eines römischen Hauses entdeckt. Und eine Öllampe aus Ton, fast zweitausend Jahre alt.'],
        ['Yusuf', 'Woher wissen Sie, wie alt so etwas ist?'],
        ['Archäologin', 'Wir vergleichen es mit anderen Funden. Und wir schauen, in welcher Erdschicht es lag: Je tiefer, desto älter – meistens jedenfalls.'],
        ['Lea', 'Darf man selbst nach Schätzen graben?'],
        ['Archäologin', 'Nein! Wer etwas findet, muss es melden. Wenn man einfach gräbt, zerstört man die Spuren. Dann kann niemand mehr die Geschichte lesen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Womit arbeitet eine Archäologin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit Pinseln', 'mit kleinen Schaufeln', 'mit einem Bagger für alles'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Archäologin hat Mauern eines römischen Hauses gefunden.', true], ['Die Öllampe ist aus Metall.', false], ['Was tiefer in der Erde liegt, ist meistens älter.', true], ['Jeder darf selbst nach Schätzen graben.', false]] },
        { art: 'fragen', auftrag: 'Warum darf man nicht einfach selbst graben?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Man zerstört die Spuren; dann kann niemand mehr die Geschichte erforschen. Funde muss man melden.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Bereitet zu zweit drei Fragen an eine Zeitzeugin oder einen Zeitzeugen vor, zum Beispiel: „Wie war die Schule früher?“', stufe: 2, karten: [
        { titel: 'W-Fragen', text: ['Wann …?', 'Wo …?', 'Wie war …?', 'Was hat sich verändert?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vier Quellenarten', punkte: ['**Sachquellen**: Gegenstände', '**Bildquellen**: Bilder, Fotos', '**Textquellen**: Geschriebenes', '**mündliche Quellen**: Erzählungen'] },
         { titel: 'Quellen prüfen: W-Fragen', punkte: ['**Was** ist es?', '**Wann** und **wo** entstand es?', '**Wer** hat es gemacht?', '**Warum** wurde es gemacht?'] }],
        [{ art: 'achtung', titel: 'Funde melden', text: 'Wer in Luxemburg etwas Altes in der Erde findet, darf es nicht behalten oder weitergraben, sondern **meldet** es sofort dem Nationalen Institut für archäologische Forschung (INRA) oder der Gemeinde (Stand 2026).' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Untersuche diese Quelle mit den W-Fragen.', stufe: 2,
        hilfe: 'Quelle: Auf einem Grabstein aus Stein steht auf Latein: „Hier liegt Lucius, Soldat, 40 Jahre alt. Seine Frau hat diesen Stein machen lassen.“ Der Stein wurde bei Arlon gefunden und ist etwa 1800 Jahre alt.',
        kopf: ['W-Frage', 'Antwort'], breiten: [30, 70], zeilen: [['Was ist es?', '[ein Grabstein mit Inschrift]'], ['Quellenart?', '[Sachquelle und Textquelle]'], ['Wann?', '[vor etwa 1800 Jahren (Römerzeit)]'], ['Wer hat ihn machen lassen?', '[die Frau von Lucius]'], ['Warum?', '[zur Erinnerung an ihren Mann]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle einen Gegenstand aus deinem Alltag. Beschreibe ihn als Quelle für Menschen in 500 Jahren: Was ist es? Was verrät er über unser Leben?', stufe: 2,
        anfaenge: ['Mein Gegenstand ist …', 'Das ist eine …quelle.', 'Er zeigt, dass wir heute …', 'Vielleicht denken die Menschen in 500 Jahren …'], zeilen: 7,
        beispiel: 'Mein Gegenstand ist ein Busfahrplan. Das ist eine Sachquelle und eine Textquelle. Es zeigt, dass wir heute mit dem Bus zur Schule fahren und dass der Bus in Luxemburg gratis ist. Vielleicht denken die Menschen in 500 Jahren, dass Busse etwas ganz Altes sind.' },
    ],
    check: ['Ich nenne die vier Quellenarten.', 'Ich ordne Beispiele der richtigen Quellenart zu.', 'Ich untersuche eine Quelle mit W-Fragen.'],
  },
  // ================================================================ 5
  {
    thema: 'Steinzeit · Jäger und Sammler · Bauern', titel: 'Leben in der Steinzeit', untertitel: 'Vom Jäger und Sammler zum Bauern: Du liest über den „Loschbour-Mann“, hörst eine Museumsführung und vergleichst zwei Lebensweisen.',
    ziel: { de: 'Ich beschreibe das Leben von Jägern und Sammlern und von den ersten Bauern und vergleiche es.', fr: 'Je décris la vie des chasseurs-cueilleurs et des premiers paysans et je les compare.' },
    bild: ['finn:ueberrascht:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was braucht man zum Leben?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Du lebst vor 10 000 Jahren ohne Geschäfte und Strom. Was brauchst du zum Überleben? Ergänze.', stufe: 1, mitte: 'Überleben in der Steinzeit', aeste: ['Nahrung', 'Feuer', { l: 'Kleidung aus Fell' }, { l: 'Werkzeuge aus Stein' }, { l: 'Unterschlupf' }, { l: 'die Gruppe' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Der Mann aus dem Müllerthal',
      absaetze: [
        'Im Jahr 1935 machten Forscher in Heffingen, im Müllerthal, einen besonderen Fund: Unter einem Felsvorsprung lag das Skelett eines Mannes. Man nennt ihn heute den **„Loschbour-Mann“**. Er lebte vor etwa 8000 Jahren – lange bevor es Städte, Schrift oder Metall gab.',
        '### Jäger und Sammler',
        'Der Loschbour-Mann gehörte zu den **Jägern und Sammlern**. Diese Menschen lebten in kleinen Gruppen und zogen umher. Sie jagten Hirsche und Wildschweine, fingen Fische und sammelten Beeren, Nüsse und Wurzeln. Ihre Werkzeuge machten sie aus Stein, Knochen und Holz. Sie wohnten in Zelten oder unter Felsen.',
        '### Die ersten Bauern',
        'Vor etwa 7000 Jahren kamen neue Menschen in unsere Gegend. Sie konnten etwas Neues: Sie bauten **Getreide** an und hielten **Tiere** wie Rinder, Schafe und Ziegen. Weil sie ihre Felder pflegen mussten, blieben sie an einem Ort. Sie bauten feste **Langhäuser** aus Holz und Lehm und stellten Töpfe aus Ton her. Man nennt diese Zeit die **Jungsteinzeit**.',
        'Diese Veränderung war so wichtig, dass man sie eine **Revolution** nennt: Die Menschen wurden **sesshaft**.',
      ],
      woerter: [['der Fund', 'la découverte'], ['das Skelett', 'le squelette'], ['der Jäger / der Sammler', 'le chasseur / le cueilleur'], ['umherziehen', 'se déplacer, être nomade'], ['sesshaft', 'sédentaire'], ['das Getreide', 'les céréales'], ['der Ton', 'l’argile'], ['die Jungsteinzeit', 'le néolithique']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche. Ergänze die Tabelle.', stufe: 2, kopf: ['', 'Jäger und Sammler', 'erste Bauern'], breiten: [24, 38, 38], zeilen: [['Nahrung', '[jagen, fischen, sammeln]', '[Getreide anbauen, Tiere halten]'], ['Wohnen', '[Zelte, unter Felsen; ziehen umher]', '[feste Langhäuser; bleiben an einem Ort]'], ['Neues Können', '[Werkzeuge aus Stein, Knochen, Holz]', '[Töpfe aus Ton, Felder, Tierhaltung]']] },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 1, fragen: [{ f: 'Wann lebte der Loschbour-Mann?', o: ['vor etwa 800 Jahren', 'vor etwa 8000 Jahren', 'vor etwa 80 000 Jahren'], r: 1 }, { f: 'Was heißt „sesshaft“?', o: ['an einem Ort wohnen bleiben', 'viel sitzen', 'immer umherziehen'], r: 0 }] },
      ],
      bildHtml: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Heffingen', 'Echternach'], marken: [{ ort: 'Heffingen', text: 'Fundort Loschbour', farbe: '#8a5a2b' }], breite: 70, massstab: false }),
    },
    hoeren: {
      was: 'Eine Museumsführung', wo: 'Nationalmuseum · Saal Steinzeit', titel: 'Feuer, Faustkeil und Pfeil',
      situation: 'Frau Sommer, eine Museumsführerin, zeigt der Klasse Werkzeuge aus der Steinzeit.',
      bild: ['lehrerin:froh:zeigen', 'finn:ueberrascht:stehen'], sprecher: { 'Frau Sommer': 'w1', Finn: 'm3', Amira: 'w2' },
      text: [
        ['Frau Sommer', 'Schaut mal in diese Vitrine. Was seht ihr?'],
        ['Finn', 'Steine. Aber die sehen aus wie Messer!'],
        ['Frau Sommer', 'Genau. Das ist Feuerstein. Wenn man ihn geschickt schlägt, bekommt er scharfe Kanten. Damit konnte man Fleisch schneiden und Felle bearbeiten.'],
        ['Amira', 'Und diese kleinen Spitzen hier?'],
        ['Frau Sommer', 'Das sind Pfeilspitzen. Mit Pfeil und Bogen jagten die Menschen Hirsche und Wildschweine. Sie mussten leise sein und gut zusammenarbeiten.'],
        ['Finn', 'Wie haben sie Feuer gemacht, ohne Feuerzeug?'],
        ['Frau Sommer', 'Sie schlugen Feuerstein gegen einen bestimmten Stein. Die Funken fielen auf trockenes Gras oder Pilze. Dann pusteten sie vorsichtig – und es brannte. Feuer gab Wärme, Licht und Schutz vor Tieren. Und man konnte darauf kochen.'],
        ['Amira', 'Ganz schön viel Arbeit, nur für ein Abendessen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wozu brauchten die Menschen in der Steinzeit Feuer? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wärme', 'Licht', 'Schutz vor Tieren', 'Kochen', 'Strom'], r: [0, 1, 2, 3] }] }],
      beim: [
        { art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Werkzeuge mit scharfen Kanten macht man aus [Feuerstein].', 'Mit Pfeil und [Bogen] jagten die Menschen [Hirsche] und Wildschweine.', 'Die Funken fielen auf trockenes [Gras] oder Pilze.'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ihr seid eine Steinzeitgruppe. Plant zu viert einen Tag: Wer jagt, wer sammelt, wer hütet das Feuer? Begründet eure Verteilung.', stufe: 2, karten: [
        { titel: 'Aufgaben', text: ['jagen', 'sammeln', 'Feuer hüten', 'Werkzeuge machen', 'Kinder versorgen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Jäger und Sammler', punkte: ['ziehen umher (**nomadisch**)', 'jagen, fischen, sammeln', 'Werkzeuge aus Stein, Knochen, Holz'] },
         { titel: 'Erste Bauern (Jungsteinzeit)', punkte: ['bleiben an einem Ort (**sesshaft**)', 'Ackerbau und Viehzucht', 'Häuser, Töpfe aus Ton, Vorräte'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Was gehört zu wem? Kreuze an.', stufe: 1, kopf: ['', 'Jäger und Sammler', 'erste Bauern'], breiten: [50, 25, 25], zeilen: [['Pfeil und Bogen', '[x]', ''], ['Getreidefeld', '', '[x]'], ['Zelt aus Fell', '[x]', ''], ['Langhaus aus Holz', '', '[x]'], ['Beeren sammeln', '[x]', ''], ['Tontopf mit Vorräten', '', '[x]']] },
      { art: 'fragen', auftrag: 'Denk nach und antworte.', stufe: 3, fragen: [{ f: 'Warum konnten die Bauern mehr Menschen ernähren als die Jäger und Sammler?', zeilen: 3, l: 'Sie bauten Getreide an und hielten Tiere; sie hatten Vorräte und waren nicht vom Jagdglück abhängig.' }, { f: 'Was war für die Bauern schwieriger?', zeilen: 2, l: 'z. B. viel Arbeit auf dem Feld; bei schlechtem Wetter oder Missernte drohte Hunger; Krankheiten durch enges Zusammenleben.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du lebst vor 7000 Jahren. Deine Gruppe will sesshaft werden. Schreibe auf, was sich für dich ändert – Gutes und Schweres.', stufe: 2,
        anfaenge: ['Früher sind wir …', 'Jetzt bleiben wir …', 'Gut ist, dass …', 'Schwer ist, dass …'], zeilen: 8,
        beispiel: 'Früher sind wir immer weitergezogen und haben Hirsche gejagt. Jetzt bleiben wir an einem Ort und bauen ein Langhaus. Gut ist, dass wir Vorräte haben und im Winter nicht hungern. Schwer ist, dass die Arbeit auf dem Feld jeden Tag anstrengend ist.' },
    ],
    check: ['Ich beschreibe das Leben der Jäger und Sammler.', 'Ich erkläre, was „sesshaft“ heißt.', 'Ich vergleiche zwei Lebensweisen in einer Tabelle.'],
  },
  // ================================================================ 6
  {
    thema: 'Römer · Villa · Straßen · Latein', titel: 'Die Römer in Luxemburg', untertitel: 'Villen, Straßen, Theater und Mosaike: Du entdeckst römische Spuren auf der Karte, hörst eine Führung durch eine Villa und findest Latein in unserer Sprache.',
    ziel: { de: 'Ich nenne römische Spuren in Luxemburg und zeige sie auf der Karte.', fr: 'Je nomme des traces romaines au Luxembourg et je les montre sur la carte.' },
    bild: ['finn:froh:stehen-zeigen', 'noah:ueberrascht:stehen'],
    start: {
      was: 'Latein lebt noch',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Viele Wörter kommen aus dem Latein der Römer. Verbinde.', stufe: 1, links: ['murus', 'fenestra', 'vinum', 'strata (via strata)', 'schola'], rechts: ['die Mauer', 'das Fenster', 'der Wein', 'die Straße', 'die Schule'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'm2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Als die Römer kamen',
      absaetze: [
        'Vor über 2000 Jahren lebte in unserer Gegend ein keltischer Stamm, die **Treverer**. Um das Jahr 50 v. Chr. eroberten die Römer unter Julius Cäsar ganz Gallien. Unser Land gehörte danach fast 500 Jahre lang zum **Römischen Reich**. Die nächste große Stadt war **Trier** (Augusta Treverorum).',
        '### Straßen',
        'Die Römer bauten gerade, feste **Straßen** mit Steinen, damit Soldaten und Händler schnell reisen konnten. Eine wichtige Straße führte von Metz nach Trier – an **Dalheim** vorbei. Dort entstand ein Dorf mit Geschäften, Tempeln und sogar einem **Theater** für etwa 3500 Menschen.',
        '### Villen',
        'Reiche Römer lebten auf dem Land in großen Gutshöfen, den **Villen**. In **Echternach** hat man die Reste einer der größten Villen nördlich der Alpen gefunden. Sie hatte Badezimmer mit warmem Wasser und eine Fußbodenheizung.',
        '### Mosaike',
        'Die Böden reicher Häuser waren mit **Mosaiken** geschmückt: Bilder aus Tausenden kleinen Steinchen. Ein berühmtes Mosaik wurde 1995 in **Vichten** gefunden. Es zeigt neun Musen. Heute kann man es im Nationalmuseum in Luxemburg-Stadt sehen.',
      ],
      bildHtml: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Echternach', 'Dalheim', 'Vichten', 'Mamer', 'Wasserbillig'], breite: 92 }),
      woerter: [['die Römer', 'les Romains'], ['der Stamm', 'la tribu'], ['erobern', 'conquérir'], ['das Reich', 'l’empire'], ['die Villa (der Gutshof)', 'la villa'], ['die Fußbodenheizung', 'le chauffage par le sol'], ['das Mosaik', 'la mosaïque'], ['die Händlerin / der Händler', 'la commerçante / le commerçant']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was fand man wo? Ergänze.', stufe: 1, kopf: ['Ort', 'römische Spur'], breiten: [30, 70], zeilen: [['Echternach', '[eine große Villa mit Bädern und Fußbodenheizung]'], ['Dalheim', '[ein Dorf an der Straße mit Theater und Tempeln]'], ['Vichten', '[ein Mosaik mit neun Musen]']] },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 2, fragen: [{ f: 'Welche große römische Stadt lag in der Nähe?', o: ['Trier', 'Paris', 'Brüssel'], r: 0 }, { f: 'Warum bauten die Römer Straßen?', o: ['damit Soldaten und Händler schnell reisen konnten', 'damit die Kinder dort spielen'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Römische Villa Echternach', titel: 'Warme Füße im Winter',
      situation: 'Die Klasse besucht die römische Villa in Echternach. Herr Mesenberg erklärt die Heizung.',
      bild: ['lehrer:froh:zeigen', 'noah:ueberrascht:stehen'], sprecher: { 'Herr Mesenberg': 'm1', Noah: 'm3', Jana: 'w2' },
      text: [
        ['Herr Mesenberg', 'Hier seht ihr die Reste des Bades. Unter dem Boden seht ihr viele kleine Säulen aus Ziegeln.'],
        ['Noah', 'Wozu sind die?'],
        ['Herr Mesenberg', 'Das ist die römische Fußbodenheizung. Ein Sklave machte draußen ein Feuer. Die heiße Luft strömte unter den Boden, zwischen die Säulen, und wärmte ihn von unten.'],
        ['Jana', 'Moment … ein Sklave? Mussten Menschen für die Reichen arbeiten?'],
        ['Herr Mesenberg', 'Ja, leider. Im Römischen Reich gab es viele Sklaven. Sie hatten kaum Rechte. Das gehört auch zur Geschichte – nicht nur die schönen Mosaike.'],
        ['Noah', 'Und das Wasser im Bad war auch warm?'],
        ['Herr Mesenberg', 'Ja. Es gab ein kaltes, ein lauwarmes und ein heißes Becken. Die Römer gingen jeden Tag baden. Für sie war das wie ein Treffpunkt.'],
        ['Jana', 'Also so etwas wie ein Schwimmbad mit Sauna!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie heizen wir heute? Kreuze an, was du kennst.', stufe: 1, fragen: [{ f: '', o: ['Heizkörper', 'Fußbodenheizung', 'Ofen mit Holz', 'Wärmepumpe'], r: [0, 1, 2, 3] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Wie funktioniert die römische Fußbodenheizung? Ordne.', stufe: 2, teile: ['Draußen wird ein Feuer gemacht.', 'Die heiße Luft strömt unter den Boden.', 'Die Luft zieht zwischen den kleinen Säulen durch.', 'Der Boden wird von unten warm.'], ordnung: [2, 0, 3, 1] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Sklaven hatten viele Rechte.', false], ['Das Bad hatte drei Becken.', true], ['Das Bad war auch ein Treffpunkt.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Die Römer brachten Straßen, Bäder und Heizungen – aber es gab auch Sklaverei. Sprecht darüber: Was findet ihr gut, was nicht?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde gut, dass die Römer …', 'Ich finde schlimm, dass …', 'Heute ist das anders, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Römer in Luxemburg', punkte: ['ab etwa **50 v. Chr.** Teil des Römischen Reichs', 'Spuren: **Straßen**, **Villen**, **Theater**, **Mosaike**, Münzen', 'Orte: **Echternach**, **Dalheim**, **Vichten**, Mamer'] },
         { titel: 'Karten lesen', punkte: ['**Legende**: Was bedeuten die Zeichen?', '**Norden** ist oben (Pfeil N).', 'Der **Maßstab** zeigt echte Entfernungen.'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wo liegen die römischen Fundorte? Schreibe die Ortsnamen zu den Buchstaben.', stufe: 2,
        html: luxKarte({ kantone: 'keine', orte: ['Echternach', 'Dalheim', 'Vichten', 'Mamer', 'Luxemburg'], orteArt: 'buchstaben', fluesse: false, breite: 85 }),
        liste: [['A', 'Echternach'], ['B', 'Dalheim'], ['C', 'Vichten'], ['D', 'Mamer'], ['E', 'Luxemburg']], spalten: 3,
        hilfe: 'Tipp: Echternach liegt an der Grenze im Osten, Dalheim im Süden, Vichten in der Mitte im Westen.' },
      { art: 'fragen', auftrag: 'Schau auf die Karte im Lesetext. Antworte.', stufe: 3, fragen: [{ f: 'Trier liegt östlich von Wasserbillig, in Deutschland. Welcher Ort auf der Karte liegt am nächsten an Trier?', l: 'Wasserbillig (oder Echternach)' }, { f: 'Wie weit ist es ungefähr von Luxemburg-Stadt nach Echternach? Nutze den Maßstab.', l: 'etwa 30 km (Luftlinie)' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Postkarte aus der römischen Zeit: Du bist eine junge Römerin oder ein junger Römer und besuchst das Theater in Dalheim oder die Villa in Echternach.', stufe: 2,
        anfaenge: ['Salve! (Hallo!)', 'Heute bin ich in …', 'Hier gibt es …', 'Am besten gefällt mir …', 'Vale! (Tschüss!)'], zeilen: 8,
        beispiel: 'Salve, liebe Julia! Heute bin ich in Dalheim. Hier gibt es ein riesiges Theater für 3500 Menschen. Am Morgen sind wir auf der Straße von Metz gekommen, mit vielen Händlern und Soldaten. Am besten gefällt mir das Theaterstück mit den Masken. Vale! Marcus' },
    ],
    check: ['Ich nenne drei römische Spuren in Luxemburg.', 'Ich finde Echternach, Dalheim und Vichten auf der Karte.', 'Ich erkläre die römische Fußbodenheizung.'],
  },
  // ================================================================ 7
  {
    thema: 'Mittelalter · Burg · Gründung der Stadt', titel: 'Vom Felsen zur Stadt', untertitel: '963, ein Tausch und ein Felsen: Du liest die Gründungsgeschichte der Stadt Luxemburg, hörst über das Leben auf einer Burg und beschriftest eine Burg.',
    ziel: { de: 'Ich erzähle, wie die Stadt Luxemburg entstand, und beschreibe das Leben auf einer Burg.', fr: 'Je raconte la naissance de la ville de Luxembourg et je décris la vie dans un château fort.' },
    bild: ['lio:froh:laessig', 'chloe:ueberrascht:stehen'],
    start: {
      was: 'Burgen in Luxemburg',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Burgen in Luxemburg kennst du? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Vianden', 'Bourscheid', 'Beaufort', 'Larochette', 'Clerf'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Siegfried und der Felsen',
      absaetze: [
        'Im Jahr **963** machte Graf **Siegfried** einen Tausch: Er gab dem Kloster Sankt Maximin in Trier Land und bekam dafür einen Felsen mit einer kleinen alten Befestigung. Diese hieß **„Lucilinburhuc“** – „kleine Burg“. Aus diesem Namen wurde später „Luxemburg“. Das Jahr 963 gilt deshalb als **Gründung der Stadt Luxemburg**.',
        '### Eine Burg auf dem Bock',
        'Der Felsen heißt heute der **Bock**. Er war perfekt für eine Burg: Auf drei Seiten fallen die Felsen steil zur Alzette ab. Feinde konnten kaum hinaufklettern. Siegfried baute dort eine Burg. Um die Burg herum entstanden Häuser, ein Markt und später eine Stadtmauer.',
        '### Eine Stadt wächst',
        'Händler kamen, Handwerker siedelten sich an, die Stadt wurde größer. Die Grafen von Luxemburg wurden mächtig. Im 14. Jahrhundert wurden einige von ihnen sogar **Kaiser** des Heiligen Römischen Reiches.',
      ],
      info: { titel: 'Heute', icon: 'building-castle', punkte: ['Die Reste der Burg auf dem Bock und die Felsengänge (**Kasematten**) kann man besichtigen.', 'Die Altstadt und die Festungsreste gehören seit 1994 zum **Welterbe der UNESCO**.'] },
      woerter: [['der Graf', 'le comte'], ['der Tausch', 'l’échange'], ['das Kloster', 'le monastère'], ['die Befestigung', 'la fortification'], ['steil', 'escarpé'], ['der Feind', 'l’ennemi'], ['die Stadtmauer', 'le rempart'], ['der Kaiser', 'l’empereur']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze die Gründungsgeschichte.', stufe: 1, woerter: ['963', 'Siegfried', 'Lucilinburhuc', 'Bock', 'Alzette'], saetze: ['Im Jahr [963] machte Graf [Siegfried] einen Tausch.', 'Die kleine Burg hieß [Lucilinburhuc].', 'Der Felsen heißt heute der [Bock].', 'Die Felsen fallen steil zur [Alzette] ab.'] },
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Warum war der Felsen ein guter Ort für eine Burg?', zeilen: 2, l: 'Auf drei Seiten fallen die Felsen steil ab; Feinde konnten kaum hinaufklettern.' }, { f: 'Wie viele Jahre ist die Gründung 2026 her?', l: '2026 − 963 = 1063 Jahre' }] },
      ],
    },
    hoeren: {
      was: 'Ein Hörspiel', wo: 'Burg Vianden · um 1300', titel: 'Ein Tag auf der Burg',
      situation: 'Ein kleines Hörspiel: Der Junge Jang arbeitet als Knappe auf einer Burg. Er erzählt der Küchenmagd Gréit von seinem Tag.',
      bild: ['lio:muede:stehen', 'chloe:froh:stehen'], sprecher: { Erzähler: 'm1', Jang: 'm3', 'Gréit': 'w2' },
      text: [
        ['Erzähler', 'Burg Vianden, um das Jahr 1300. Es ist Abend. Der junge Knappe Jang kommt müde in die Küche.'],
        ['Gréit', 'Jang, du siehst erschöpft aus! Setz dich, hier ist Suppe.'],
        ['Jang', 'Danke, Gréit. Ich bin seit Sonnenaufgang auf den Beinen. Zuerst habe ich das Pferd des Ritters gestriegelt, dann seine Rüstung geputzt. Die ist so schwer!'],
        ['Gréit', 'Und danach?'],
        ['Jang', 'Danach habe ich mit dem Schwert geübt, auf dem Burghof. Der Ritter sagt, in sieben Jahren kann ich selbst Ritter werden – wenn ich fleißig bin.'],
        ['Gréit', 'Du hast es gut. Ich stehe den ganzen Tag am Feuer, trage Wasser vom Brunnen und rupfe Hühner. Ritter werde ich nie.'],
        ['Jang', 'Das ist ungerecht. Ohne dich hätte der Ritter nichts zu essen.'],
        ['Erzähler', 'Auf der Burg hatte jeder seinen Platz: Ritter, Knappen, Mägde, Knechte, Handwerker. Die Bauern im Tal mussten einen Teil ihrer Ernte abgeben.'],
      ],
      vor: [{ art: 'zuordnen', auftrag: 'Wer ist wer auf der Burg? Verbinde.', stufe: 1, links: ['der Ritter', 'der Knappe', 'die Magd'], rechts: ['ein Krieger zu Pferd, oft ein Adliger', 'ein Junge, der lernt, Ritter zu werden', 'eine Frau, die im Haus oder in der Küche arbeitet'] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was machen Jang und Gréit?', stufe: 1, kopf: ['Jang (Knappe)', 'Gréit (Magd)'], breiten: [50, 50], zeilen: [['[das Pferd striegeln]', '[am Feuer kochen]'], ['[die Rüstung putzen]', '[Wasser vom Brunnen tragen]'], ['[mit dem Schwert üben]', '[Hühner rupfen]']] },
        { art: 'fragen', auftrag: 'Was findet Jang ungerecht?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Gréit arbeitet genauso hart, kann aber nie Ritter werden; ohne sie hätte der Ritter nichts zu essen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wer hatte es besser auf der Burg, wer schlechter? Ordnet die Personen und begründet.', stufe: 3, karten: [
        { titel: 'Personen', text: ['Ritter', 'Knappe', 'Magd', 'Handwerker', 'Bauer'] },
        { titel: 'Satzanfänge', text: ['… hatte es besser, weil …', '… musste mehr arbeiten als …', 'Ich finde ungerecht, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Mittelalter', punkte: ['etwa **500 bis 1500** n. Chr.', '**Burgen**, Ritter, Klöster, Städte mit Mauern', 'Die Menschen lebten in **Ständen**: Adel, Geistliche, Bauern.'] },
         { titel: 'Luxemburg', punkte: ['**963**: Siegfried tauscht den Felsen (Bock).', 'Aus „Lucilinburhuc“ wird **Luxemburg**.', 'Seit **1994**: UNESCO-Welterbe'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Beschrifte die Burg. Schreibe die Wörter zu den Nummern.', stufe: 2, html: burg(), liste: [['1', 'der Bergfried (Turm)'], ['2', 'die Burgmauer'], ['3', 'das Tor mit Zugbrücke'], ['4', 'der Burggraben'], ['5', 'der Wohnbau (Palas)'], ['6', 'der Brunnen']], spalten: 2,
        hilfe: 'Wörter: der Brunnen · der Bergfried (Turm) · der Burggraben · die Burgmauer · das Tor mit Zugbrücke · der Wohnbau (Palas)' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Jangs Tagebuch: einen Tag auf der Burg. Benutze das Präteritum (ich striegelte, ich putzte, ich übte …).', stufe: 2,
        anfaenge: ['Liebes Tagebuch,', 'heute stand ich …', 'Zuerst …', 'Danach …', 'Am Abend …'], zeilen: 8,
        beispiel: 'Liebes Tagebuch, heute stand ich vor Sonnenaufgang auf. Zuerst striegelte ich das Pferd des Ritters. Danach putzte ich die schwere Rüstung und übte mit dem Schwert. Am Abend gab mir Gréit Suppe. Ich finde, ihre Arbeit ist genauso wichtig wie meine.' },
    ],
    check: ['Ich erzähle die Gründung der Stadt Luxemburg.', 'Ich beschreibe das Leben auf einer Burg.', 'Ich beschrifte die Teile einer Burg.'],
  },
  // ================================================================ 8
  {
    thema: 'Interessen · Stärken · Berufsfelder', titel: 'Was kann ich gut?', untertitel: 'Hand, Kopf, Herz: Du entdeckst deine Stärken und Interessen, hörst zwei Jugendliche über ihre Schnuppertage und ordnest Berufe den Berufsfeldern zu.',
    ziel: { de: 'Ich beschreibe meine Stärken und Interessen und ordne Berufe Berufsfeldern zu.', fr: 'Je décris mes points forts et mes intérêts et je classe des métiers par domaines.' },
    bild: ['nele:froh:sitzen', 'tom:froh:stehen'],
    start: {
      was: 'Ich und die Arbeit',
      aufgaben: [
        { art: 'meinungslinie', auftrag: 'Was passt zu dir? Kreuze an. (Du musst das niemandem zeigen.)', stufe: 1, warum: false, pole: ['gar nicht', 'eher nicht', 'teils', 'eher ja', 'genau'], aussagen: ['Ich arbeite gern mit den Händen.', 'Ich helfe gern anderen Menschen.', 'Ich bin gern draußen in der Natur.', 'Ich tüftle gern an Technik und Computern.'], hinweis: 'Keine richtige Lösung – die Antworten helfen beim Nachdenken über Interessen.' },
      ],
    },
    lesen: {
      was: 'Profile', art: 'profile', stimme: 'w1',
      quelle: 'Schülerzeitung: „Meine Stärke“ (Jugendliche ausgedacht)', titel: 'Jede und jeder kann etwas',
      profile: [
        { name: 'Tom, 13', bild: 'tom:froh:brust', stimme: 'm3', text: 'In der Schule bin ich nicht der Schnellste. Aber zu Hause repariere ich alles: Fahrräder, die Kaffeemaschine, sogar unseren Rasenmäher. Ich brauche keine Anleitung – ich schaue, wie es funktioniert. Meine Stärke: **Ich habe geschickte Hände und bin geduldig.**' },
        { name: 'Nele, 12', bild: 'nele:froh:brust', stimme: 'w3', text: 'Ich sitze im Rollstuhl, aber das hält mich nicht auf. Ich organisiere gern: Geburtstage, Klassenfeste, den Kuchenverkauf. Ich habe immer eine Liste und denke an alles. Meine Stärke: **Ich bin ordentlich und kann gut planen.**' },
        { name: 'Yusuf, 13', bild: 'yusuf:froh:brust', stimme: 'm1', text: 'Meine kleine Cousine fragt mich immer, wenn sie etwas nicht versteht. Ich erkläre es ihr ruhig, bis sie es kann. Im Fußballverein trainiere ich manchmal die Kleinen. Meine Stärke: **Ich bin geduldig mit anderen und kann gut erklären.**' },
        { name: 'Amira, 12', bild: 'amira:froh:brust', stimme: 'w2', text: 'Ich zeichne jeden Tag: Comics, Figuren, Muster für T-Shirts. Ich habe auch schon Plakate für unsere Schule gestaltet. Meine Stärke: **Ich habe Ideen und kann gut gestalten.**' },
      ],
      woerter: [['die Stärke', 'le point fort'], ['das Interesse', 'l’intérêt'], ['geschickt', 'habile'], ['geduldig', 'patient'], ['ordentlich', 'ordonné'], ['planen', 'planifier'], ['gestalten', 'créer, concevoir'], ['das Berufsfeld', 'le domaine professionnel']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Stärke hat wer? Welcher Beruf könnte passen? Ergänze.', stufe: 2, kopf: ['Name', 'Stärke', 'ein passender Beruf'], breiten: [16, 44, 40], zeilen: [['Tom', '[geschickte Hände, geduldig]', '[z. B. Mechaniker, Elektroniker]'], ['Nele', '[ordentlich, kann gut planen]', '[z. B. Bürokauffrau, Eventplanerin]'], ['Yusuf', '[geduldig, kann gut erklären]', '[z. B. Erzieher, Trainer]'], ['Amira', '[Ideen, kann gut gestalten]', '[z. B. Grafikdesignerin, Malerin]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · nach den Schnuppertagen', titel: 'Wie war dein Schnuppertag?',
      situation: 'Tom und Nele haben einen Tag in einem Betrieb verbracht. In der Pause erzählen sie.',
      bild: ['tom:froh:stehen', 'nele:froh:rollstuhl'], sprecher: { Tom: 'm3', Nele: 'w3' },
      text: [
        ['Nele', 'Und, Tom? Wie war es in der Autowerkstatt?'],
        ['Tom', 'Super! Ich durfte Reifen wechseln und beim Ölwechsel helfen. Der Meister hat gesagt, ich habe ein gutes Gefühl für Technik.'],
        ['Nele', 'Und was war nicht so toll?'],
        ['Tom', 'Man ist den ganzen Tag auf den Beinen, und meine Hände waren voller Öl. Aber das stört mich nicht. Und du? Du warst doch in einem Büro, oder?'],
        ['Nele', 'Ja, bei einer Gemeinde, im Empfang. Ich habe Briefe sortiert, Termine eingetragen und Leuten am Telefon geholfen.'],
        ['Tom', 'Klingt langweilig.'],
        ['Nele', 'Gar nicht! Ich mag es, wenn alles ordentlich ist. Und die Leute waren so freundlich. Nur das Telefon war am Anfang stressig.'],
        ['Tom', 'Dann haben wir beide etwas gefunden, das zu uns passt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Schnuppertag? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Tag, an dem man einen Beruf ausprobiert', 'ein freier Tag', 'ein Tag mit einer Prüfung'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Tom', 'Nele'], breiten: [24, 38, 38], zeilen: [['Wo?', '[in einer Autowerkstatt]', '[bei einer Gemeinde, im Empfang]'], ['Was gemacht?', '[Reifen gewechselt, beim Ölwechsel geholfen]', '[Briefe sortiert, Termine eingetragen, am Telefon geholfen]'], ['Nicht so toll:', '[immer auf den Beinen, Hände voller Öl]', '[Telefon am Anfang stressig]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Interviewt euch gegenseitig: In welchem Betrieb würdet ihr gern einen Schnuppertag machen? Warum?', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Was machst du gern?', 'Was kannst du gut?', 'Wo möchtest du schnuppern?', 'Warum?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Berufsfelder (Auswahl)', punkte: ['**Technik und Handwerk**: Mechanikerin, Elektriker, Schreinerin', '**Gesundheit und Soziales**: Pflegehelfer, Erzieherin', '**Büro und Handel**: Verkäufer, Bürokauffrau', '**Natur**: Gärtnerin, Landwirt', '**Gestalten**: Friseurin, Malerin, Grafiker'] },
         { titel: 'Hand · Kopf · Herz', punkte: ['**Hand**: geschickt, praktisch', '**Kopf**: logisch, genau, neugierig', '**Herz**: hilfsbereit, geduldig, freundlich', 'Jeder Beruf braucht eine **Mischung**.'] }],
        [{ art: 'tipp', titel: 'Stärken entdecken', text: 'Frag dich: **Was mache ich gern – auch ohne dass mich jemand zwingt?** Frag auch andere: „Was kann ich deiner Meinung nach gut?“' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Zu welchem Berufsfeld gehört der Beruf? Kreuze an.', stufe: 2, kopf: ['Beruf', 'Technik', 'Soziales', 'Büro', 'Natur', 'Gestalten'], breiten: [25, 15, 15, 15, 15, 15], zeilen: [['Schreinerin', '[x]', '', '', '', ''], ['Pflegehelfer', '', '[x]', '', '', ''], ['Verkäuferin', '', '', '[x]', '', ''], ['Gärtner', '', '', '', '[x]', ''], ['Friseurin', '', '', '', '', '[x]'], ['Elektriker', '[x]', '', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text „Meine Stärken“. Du kannst auch über eine ausgedachte Person schreiben.', stufe: 2,
        anfaenge: ['Ich bin gut in …', 'Ich mache gern …', 'Andere sagen, dass ich …', 'Ein Beruf, der passen könnte: …, weil …'], zeilen: 8,
        beispiel: 'Ich bin gut in Sport und im Umgang mit kleinen Kindern. Ich mache gern Dinge draußen. Andere sagen, dass ich geduldig bin und gut zuhören kann. Ein Beruf, der passen könnte: Erzieher, weil ich gern mit Kindern spiele und ihnen etwas beibringe.' },
    ],
    check: ['Ich nenne meine Stärken und Interessen.', 'Ich ordne Berufe einem Berufsfeld zu.', 'Ich erkläre, was ein Schnuppertag ist.'],
  },
]

// Einfache Burg zum Beschriften (Nummern 1–6)
function burg() {
  const n = (x, y, t) => `<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#2a2f3a" stroke-width="2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="800" fill="#2a2f3a">${t}</text>`
  return `<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" style="width:150mm;max-width:100%;display:block;margin:0 auto">
  <rect x="0" y="0" width="420" height="250" fill="#eef4f8"/>
  <path d="M0,215 Q90,195 210,200 T420,210 L420,250 L0,250 Z" fill="#b9d58f"/>
  <path d="M40,212 Q210,190 380,212 L380,226 Q210,206 40,226 Z" fill="#7fb6dd"/>
  <rect x="70" y="120" width="280" height="88" fill="#d8cbb0" stroke="#7a6a4f" stroke-width="2"/>
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${70 + i * 20}" y="110" width="12" height="12" fill="#d8cbb0" stroke="#7a6a4f" stroke-width="2"/>`).join('')}
  <rect x="95" y="40" width="54" height="170" fill="#cbbd9f" stroke="#7a6a4f" stroke-width="2"/>
  ${Array.from({ length: 4 }, (_, i) => `<rect x="${95 + i * 14}" y="30" width="9" height="12" fill="#cbbd9f" stroke="#7a6a4f" stroke-width="2"/>`).join('')}
  <rect x="114" y="70" width="14" height="22" rx="7" fill="#5a4b36"/>
  <rect x="240" y="72" width="92" height="60" fill="#e7dcc6" stroke="#7a6a4f" stroke-width="2"/><path d="M234,72 L286,40 L338,72 Z" fill="#b5523b" stroke="#7a6a4f" stroke-width="2"/>
  <rect x="256" y="92" width="14" height="20" rx="7" fill="#5a4b36"/><rect x="300" y="92" width="14" height="20" rx="7" fill="#5a4b36"/>
  <path d="M188,208 L188,170 Q210,150 232,170 L232,208 Z" fill="#5a4b36"/>
  <path d="M188,208 L232,208 L246,228 L174,228 Z" fill="#a07a4a" stroke="#6b4f2e" stroke-width="2"/>
  <line x1="188" y1="170" x2="174" y2="228" stroke="#444" stroke-width="1.5"/><line x1="232" y1="170" x2="246" y2="228" stroke="#444" stroke-width="1.5"/>
  <ellipse cx="200" cy="140" rx="14" ry="5" fill="#7fb6dd" stroke="#7a6a4f" stroke-width="2"/><rect x="186" y="140" width="28" height="12" fill="#cbbd9f" stroke="#7a6a4f" stroke-width="2"/>
  <line x1="190" y1="122" x2="190" y2="140" stroke="#7a6a4f" stroke-width="2"/><line x1="210" y1="122" x2="210" y2="140" stroke="#7a6a4f" stroke-width="2"/><line x1="186" y1="122" x2="214" y2="122" stroke="#7a6a4f" stroke-width="2"/>
  ${n(165, 60, 1)}${n(60, 160, 2)}${n(255, 190, 3)}${n(395, 222, 4)}${n(350, 60, 5)}${n(225, 128, 6)}
  </svg>`
}
