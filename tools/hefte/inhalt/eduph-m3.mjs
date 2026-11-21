// Sport · Modul 3 (7P) „Turnen und Balance“ – Éducation physique et sportive, Voie de préparation.
// Geräte sicher auf- und abbauen, Helfen und Sichern, Gleichgewicht, Rolle vorwärts (Phasenbild), Springen und Landen,
// Partner-Akrobatik mit Figurenkarten, eigene Turnfolge gestalten. Nele (Rollstuhl) übt Gleichgewicht und Kraft im Sitzen,
// ist Teil von Akrobatik-Figuren und übernimmt auch Rollen wie Beobachterin – immer freiwillig und gleichwertig.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { rolleVorwaerts } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 3, {
  titel: 'Turnen und Balance',
  titelFr: 'Gymnastique et équilibre',
  unter: 'Geräte sicher aufbauen, einander helfen und sichern, das Gleichgewicht trainieren, rollen, springen und landen – und eine eigene Turnfolge zeigen.',
  unterFr: 'Installer le matériel, aider et parer, équilibre, roulade, sauts, acrobaties et enchaînement.',
  farbe: '#7a4fa0',
  deckbild: ['mia:froh:tanzen', 'nele:froh:rollstuhl', 'tom:froh:stehen-zeigen'],
  blasen: [{ t: 'Kinn auf die Brust!', x: 8, y: 104 }, { t: 'Ich sichere dich.', x: 116, y: 92 }, { t: 'Landung!', x: 180, y: 150 }],
  aussprache: {},
  themen: [
    { titel: { de: 'Sicher turnen', fr: 'Gym en sécurité' }, icon: 'shield-check', lektionen: 3 },
    { titel: { de: 'Springen und gestalten', fr: 'Sauter et créer' }, icon: 'stars', lektionen: 3 },
  ],
})

const TURN = '#7a4fa0', AKRO = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Geräte aufbauen · helfen und sichern', titel: 'Sicher ist sicher', untertitel: 'Beim Turnen passt man aufeinander auf. Du lernst, wie man Matten und Geräte sicher trägt und aufbaut, die wichtigsten Turnregeln und wie man einem anderen hilft und ihn sichert.',
    ziel: { de: 'Ich baue Geräte sicher auf und helfe und sichere andere.', fr: 'J’installe le matériel en toute sécurité, j’aide et je pare les autres.' },
    bild: ['lehrerin:froh:erklaeren', 'tom:froh:stehen-zeigen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Personen tragen eine große Weichbodenmatte? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mindestens vier', 'eine Person allein', 'zwei Personen ziehen sie über den Boden'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Turnregeln der Sporthalle', titel: 'Regeln für sicheres Turnen',
      absaetze: [
        '### Vor dem Turnen',
        '**Schmuck ab**, Uhren und Ketten weg, lange Haare zusammenbinden, **kein Kaugummi**. Man turnt in Turnschuhen oder barfuß – nicht in Socken, da rutscht man.',
        '### Geräte tragen und aufbauen',
        'Matten werden **getragen**, nicht gezogen. An jeder Ecke fasst eine Person an. Einer gibt das Kommando: „Achtung – hoch!“ Langbänke tragen zwei Personen. Große Geräte wie Kästen und Barren baut ihr nur mit der Lehrperson auf. Um jedes Gerät liegen **Matten** ohne Lücken.',
        '### Helfen und sichern',
        'Beim **Helfen** unterstützt du jemanden bei einer Bewegung, zum Beispiel mit einer Hand am Oberarm. Beim **Sichern** stehst du bereit, um jemanden aufzufangen, falls er fällt. Man greift mit dem **Klammergriff**: beide Hände umfassen den Oberarm – eine Hand nah an der Schulter, eine nah am Ellenbogen.',
        'Wer hilft, schaut **immer** auf die turnende Person und redet mit ihr: „Bereit? Ich bin da.“ Und: Jeder darf sagen, wenn er etwas noch **nicht** probieren will.',
      ],
      woerter: [['turnen', 'faire de la gymnastique'], ['das Gerät', 'l’agrès'], ['die Matte', 'le tapis'], ['tragen', 'porter'], ['das Kommando', 'le signal'], ['helfen', 'aider'], ['sichern', 'parer'], ['der Klammergriff', 'la prise en pince']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Beim Turnen behält man die Kette an.', false], ['Matten werden über den Boden gezogen.', false], ['Wer sichert, schaut immer auf die turnende Person.', true], ['Man darf sagen, wenn man etwas noch nicht probieren will.', true], ['In Socken turnt man am sichersten.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Geräteraum', titel: 'Mattentransport',
      situation: 'Frau Diallo erklärt, wie vier Jugendliche eine große Matte tragen. Hör genau auf die Kommandos.',
      bild: ['lehrerin:froh:erklaeren', 'tom:froh:stehen-zeigen'], sprecher: { 'Frau Diallo': 'w1', Tom: 'm3' },
      text: [
        ['Frau Diallo', 'Wir holen die große Matte. Tom, Mia, Sami und Yusuf: Jeder stellt sich an eine Ecke.'],
        ['Frau Diallo', 'Greift die Schlaufe an eurer Ecke. Geht in die Knie, der Rücken bleibt gerade.'],
        ['Frau Diallo', 'Tom, du gibst das Kommando.'],
        ['Tom', 'Achtung – und – hoch!'],
        ['Frau Diallo', 'Gut. Jetzt geht ihr langsam los. Tom sagt, wohin. Nicht rennen.'],
        ['Tom', 'Wir gehen nach links, zum Barren. … Langsam. … Stopp!'],
        ['Frau Diallo', 'Jetzt legt ihr die Matte genau hier ab, ohne Lücke zur anderen Matte.'],
        ['Tom', 'Achtung – und – ab!'],
        ['Frau Diallo', 'Perfekt. Nele, du kontrollierst bitte, ob die Matten ohne Lücken liegen und nicht verrutschen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Lücke? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein leerer Platz zwischen zwei Dingen', 'eine sehr dicke Matte'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Schritte beim Mattentransport.', stufe: 1, teile: ['Jeder stellt sich an eine Ecke.', 'Schlaufe greifen, in die Knie gehen, Rücken gerade.', 'Kommando: „Achtung – und – hoch!“', 'langsam gehen, einer sagt die Richtung', 'Kommando: „Achtung – und – ab!“', 'kontrollieren: keine Lücken'], ordnung: [2, 5, 0, 3, 1, 4] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum braucht man beim Tragen ein Kommando? Was könnte ohne passieren?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ohne Kommando …', 'Mit Kommando …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Turnregeln', punkte: ['**Schmuck ab**, Haare zusammen', '**kein Kaugummi**', 'Turnschuhe oder **barfuß**', 'Matten **tragen**, nicht ziehen', 'Matten **ohne Lücken**'] },
         { titel: 'Helfen und sichern', punkte: ['**Klammergriff** am Oberarm', '**immer hinschauen**', '**reden**: „Bereit? Ich bin da.“', '**Nein** sagen ist erlaubt'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Geräte-Check vor der Stunde: Prüft zu zweit und hakt ab.', stufe: 1, kopf: ['Prüfpunkt', 'ok', 'Problem'], breiten: [64, 14, 22], zeilen: [['Alle Matten liegen ohne Lücken.', '', ''], ['Die Matten rutschen nicht.', '', ''], ['Um jedes Gerät liegen Matten.', '', ''], ['Niemand trägt Schmuck, niemand kaut Kaugummi.', '', ''], ['Der Weg zwischen den Stationen ist frei.', '', '']] },
      { art: 'tabelle', auftrag: 'Helfen oder sichern? Kreuze an.', stufe: 2, kopf: ['', 'helfen', 'sichern'], breiten: [64, 18, 18], zeilen: [['Ich halte Mias Hand, während sie über die Bank balanciert.', '[x]', ''], ['Ich stehe neben dem Kasten bereit, falls Tom fällt.', '', '[x]'], ['Ich schiebe Sami bei der Rolle leicht am Rücken, damit er herumkommt.', '[x]', ''], ['Ich stehe neben dem Minitrampolin und kann jemanden auffangen.', '', '[x]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie fühlt es sich an, wenn dich jemand sichert? Wie fühlt es sich an, selbst zu sichern?', stufe: 2,
        anfaenge: ['Wenn mich jemand sichert, …', 'Wenn ich sichere, …', 'Wichtig ist mir, dass …'], zeilen: 5,
        beispiel: 'Wenn mich jemand sichert, traue ich mich mehr, weil ich weiß, dass ich nicht falle. Wenn ich sichere, bin ich ganz konzentriert und fühle mich verantwortlich. Wichtig ist mir, dass mein Partner mir sagt, wann er bereit ist.' },
    ],
    check: ['Ich kenne die Turnregeln.', 'Ich trage Matten richtig mit Kommando.', 'Ich weiß, wie man hilft und sichert.'],
  },
  // ================================================================ 2
  {
    thema: 'Gleichgewicht', titel: 'Wackel nicht!', untertitel: 'Gleichgewicht brauchst du überall: beim Radfahren, auf einer Leiter, beim Skaten. Du erfährst, wie der Körper das Gleichgewicht hält, und trainierst es mit einer Balance-Challenge.',
    ziel: { de: 'Ich weiß, wie der Körper das Gleichgewicht hält, und trainiere es.', fr: 'Je sais comment le corps garde l’équilibre et je l’entraîne.' },
    bild: ['mia:froh:tanzen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Probier mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Stell dich auf ein Bein. Wie lange schaffst du es? Und mit geschlossenen Augen? Was ändert sich?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Mit geschlossenen Augen ist es viel schwerer; man wackelt mehr.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'Wie hält der Körper das Gleichgewicht?',
      absaetze: [
        'Damit du nicht umfällst, arbeiten drei „Helfer“ zusammen.',
        'Die **Augen** sehen, wo oben und unten ist. Darum ist es mit geschlossenen Augen schwerer.',
        'Im **Innenohr** gibt es ein kleines **Gleichgewichtsorgan**. Darin ist Flüssigkeit. Wenn du den Kopf bewegst, bewegt sich die Flüssigkeit, und das Gehirn merkt: Ich drehe mich oder kippe.',
        'Die **Muskeln** und **Gelenke** melden dem Gehirn ständig, wie dein Körper steht. Das Gehirn schickt blitzschnell Befehle zurück: ein bisschen nach links, Bauch fest!',
        'Gleichgewicht kann man **trainieren** – in jedem Alter. Je öfter du übst, desto schneller reagieren deine Muskeln. Ein guter Trick: Such dir einen **festen Punkt** und schau ihn an. Und spann den **Bauch** an.',
      ],
      woerter: [['das Gleichgewicht', 'l’équilibre'], ['umfallen', 'tomber'], ['das Innenohr', 'l’oreille interne'], ['das Organ', 'l’organe'], ['die Flüssigkeit', 'le liquide'], ['kippen', 'basculer'], ['das Gehirn', 'le cerveau'], ['anspannen', 'contracter']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Welche drei Helfer halten das Gleichgewicht?', zeilen: 2, l: 'die Augen, das Gleichgewichtsorgan im Innenohr, Muskeln und Gelenke' }, { f: 'Warum ist es mit geschlossenen Augen schwerer?', zeilen: 2, l: 'Die Augen helfen zu sehen, wo oben und unten ist; ein Helfer fehlt.' }, { f: 'Nenne zwei Tricks für ein besseres Gleichgewicht.', zeilen: 2, l: 'einen festen Punkt anschauen, den Bauch anspannen' }] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle', titel: 'Die Balance-Challenge',
      situation: 'Frau Diallo leitet eine Balance-Challenge mit fünf Stufen. Mach mit, wo du gerade bist!',
      bild: ['lehrerin:froh:zeigen', 'nele:froh:rollstuhl'], sprecher: { 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Die Balance-Challenge! Stufe eins: Stellt euch auf ein Bein. Sucht euch einen festen Punkt an der Wand und schaut ihn an. Zehn Sekunden. … Und Bein wechseln.'],
        ['Frau Diallo', 'Stufe zwei: Auf einem Bein, und die Arme langsam über den Kopf strecken. Bauch fest! Zehn Sekunden.'],
        ['Frau Diallo', 'Stufe drei: Standwaage. Oberkörper nach vorn, ein Bein nach hinten, bis ihr aussieht wie ein T. Fünf Sekunden halten.'],
        ['Frau Diallo', 'Stufe vier: auf einem Bein stehen – und die Augen schließen. Wer wackelt, macht die Augen einfach wieder auf. Zehn Sekunden.'],
        ['Frau Diallo', 'Wer im Rollstuhl sitzt: Bremsen fest. Wenn es geht, hebt die Füße von der Fußstütze. Arme zur Seite, und lehnt den Oberkörper langsam nach links und rechts – nur so weit, wie es sicher ist. Nele, super gemacht!'],
        ['Frau Diallo', 'Stufe fünf, die Profistufe: zu zweit. Ihr steht auf einem Bein, gebt euch beide Hände und lehnt euch ganz leicht nach hinten. Haltet euch gegenseitig im Gleichgewicht!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Challenge? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Herausforderung, eine Aufgabe zum Ausprobieren', 'eine Pause'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was ist die Aufgabe bei jeder Stufe?', stufe: 1, kopf: ['Stufe', 'Aufgabe'], breiten: [16, 84], zeilen: [['1', '[auf einem Bein stehen, festen Punkt anschauen, 10 s]'], ['2', '[auf einem Bein, Arme über den Kopf, Bauch fest]'], ['3', '[Standwaage wie ein T, 5 s halten]'], ['4', '[auf einem Bein mit geschlossenen Augen]'], ['5', '[zu zweit auf einem Bein, Hände geben, leicht nach hinten lehnen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Stufe war für dich am schwersten? Was hat geholfen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am schwersten war Stufe …', 'Geholfen hat …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Drei Helfer', punkte: ['**Augen**', '**Gleichgewichtsorgan** im Innenohr', '**Muskeln** und Gelenke'] },
         { titel: 'Tricks', punkte: ['**festen Punkt** anschauen', '**Bauch** anspannen', 'Arme zur **Seite**', 'oft **üben**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Balance-Stationen: Schneidet die Karten aus und baut die Stationen auf. Haltet bei jeder Station fest, wie lange ihr es schafft.', stufe: 2, neueSeite: true, titel: 'Balance', icon: 'scale', farbe: TURN, spalten: 2,
        karten: [
          { text: '**Langbank**\nVorwärts über die umgedrehte Bank balancieren. Partner hilft an der Hand.' }, { text: '**Seil**\nÜber ein Seil am Boden gehen, Arme zur Seite, Blick nach vorn.' },
          { text: '**Kissen**\nAuf einem Wackelkissen auf einem Bein stehen. 20 Sekunden.' }, { text: '**Ball**\nAuf einem Bein stehen und einem Partner einen Ball zuwerfen.' },
          { text: '**Im Sitzen**\nAuf dem Pezziball oder im Rollstuhl sitzen, Bremsen fest. Füße hoch, wenn es geht, Arme zur Seite. 20 Sekunden.' }, { text: '**Profi**\nAuf der Bank balancieren und dabei eine halbe Drehung machen.' },
        ] },
      { art: 'tabelle', auftrag: 'Mein Balance-Protokoll: Miss deine Zeit am Anfang und nach zwei Wochen Training.', stufe: 1, kopf: ['Übung', 'Zeit am Anfang', 'Zeit nach 2 Wochen'], breiten: [44, 28, 28], zeilen: [['auf einem Bein (Augen offen)', '', ''], ['auf einem Bein (Augen zu)', '', ''], ['Standwaage', '', ''], ['Wackelkissen', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wo brauchst du im Alltag Gleichgewicht? Schreibe drei Beispiele.', stufe: 1,
        anfaenge: ['Im Alltag brauche ich Gleichgewicht, wenn …', 'Außerdem …', 'Am schwierigsten ist es, wenn …'], zeilen: 5,
        beispiel: 'Im Alltag brauche ich Gleichgewicht, wenn ich Fahrrad fahre. Außerdem im Bus, wenn er plötzlich bremst, und wenn ich auf eine Leiter steige. Am schwierigsten ist es, wenn es glatt ist, zum Beispiel im Winter auf Eis.' },
    ],
    check: ['Ich weiß, wie der Körper das Gleichgewicht hält.', 'Ich kenne Tricks für besseres Gleichgewicht.', 'Ich trainiere mein Gleichgewicht.'],
  },
  // ================================================================ 3
  {
    thema: 'Rolle vorwärts', titel: 'Rund wie ein Ball', untertitel: 'Die Rolle vorwärts ist eine Grundbewegung im Turnen – und sie hilft, bei einem Sturz weich zu fallen. Du lernst die vier Phasen, übst in kleinen Schritten und beobachtest andere.',
    ziel: { de: 'Ich kenne die Phasen der Rolle vorwärts und übe sie sicher.', fr: 'Je connais les phases de la roulade avant et je m’entraîne en sécurité.' },
    bild: ['sami:froh:hocken', 'lehrerin:froh:zeigen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wohin kommt das Kinn bei der Rolle vorwärts? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['auf die Brust', 'nach oben', 'auf die Matte'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Turn-Anleitung', titel: 'Die Rolle vorwärts in vier Phasen',
      material: ['eine Turnmatte', 'eventuell eine schräge Matte (Keil)'],
      schritte: [
        { icon: 'chevrons-down', text: '**Hocke:** Geh in die Hocke, die Arme zeigen nach vorn.' },
        { icon: 'hand-stop', text: '**Hände und Kinn:** Setz die Hände **schulterbreit** vor die Füße auf die Matte. Nimm das **Kinn auf die Brust** und schau zum Bauch. Der Po geht nach oben.' },
        { icon: 'rotate-clockwise', text: '**Rollen:** Stoß dich mit den Beinen ab und roll über den **runden Rücken** – erst der Nacken, dann der Rücken, dann der Po. **Nie** auf den Kopf rollen.' },
        { icon: 'arrow-up', text: '**Aufstehen:** Zieh die Knie an, greif nach vorn und steh ohne Hände auf.' },
      ],
      danach: ['Rollen nur auf der **Matte** und nur, wenn die Lehrperson es erlaubt. Leichter geht es auf einer **schrägen Matte**: Man rollt bergab. Wer Probleme mit Nacken oder Rücken hat, sagt es vorher – dann gibt es eine andere Übung.'],
      woerter: [['die Rolle', 'la roulade'], ['die Hocke', 'la position accroupie'], ['schulterbreit', 'à largeur d’épaules'], ['das Kinn', 'le menton'], ['der Nacken', 'la nuque'], ['rund', 'rond'], ['abstoßen', 'pousser'], ['schräg', 'incliné']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Was passiert in jeder Phase? Schreibe kurz.', stufe: 1, html: '<div class="voll">' + rolleVorwaerts() + '</div>', liste: [['1', 'Hocke, Arme nach vorn'], ['2', 'Hände schulterbreit auf die Matte, Kinn auf die Brust, Po hoch'], ['3', 'über den runden Rücken rollen'], ['4', 'Knie anziehen, ohne Hände aufstehen']], spalten: 1 },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · an der schrägen Matte', titel: 'Sami traut sich',
      situation: 'Sami hat Angst vor der Rolle. Frau Diallo übt mit ihm in kleinen Schritten.',
      bild: ['sami:aengstlich:hocken', 'lehrerin:froh:zeigen'], sprecher: { Sami: 'm2', 'Frau Diallo': 'w1' },
      text: [
        ['Sami', 'Ich mache das nicht. Ich habe Angst, dass ich mir den Hals verdrehe.'],
        ['Frau Diallo', 'Das verstehe ich. Wir machen es ganz langsam, und du entscheidest, wann du weitermachst. Einverstanden?'],
        ['Sami', 'Okay.'],
        ['Frau Diallo', 'Erst ohne Rolle: Setz dich in die Hocke auf die schräge Matte. Jetzt mach dich ganz rund, Kinn auf die Brust, Arme um die Knie. Und schaukel ein bisschen vor und zurück. Wie ein Schaukelstuhl.'],
        ['Sami', 'Das geht.'],
        ['Frau Diallo', 'Super. Jetzt die Hände vor die Füße auf die Matte. Kinn auf die Brust. Ich lege eine Hand an deinen Nacken und eine an deinen Oberschenkel. Ich helfe dir herum. Bereit?'],
        ['Sami', 'Bereit … Oh! Ich bin herumgerollt!'],
        ['Frau Diallo', 'Und du hast das Kinn die ganze Zeit auf der Brust gehabt. Genau richtig. Noch einmal?'],
        ['Sami', 'Ja. Und dann vielleicht ohne Hilfe.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „sich trauen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Mut haben, etwas zu tun', 'jemandem etwas schenken'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. In welchen kleinen Schritten übt Sami?', stufe: 1, teile: ['in der Hocke rund machen und schaukeln', 'Hände vor die Füße, Kinn auf die Brust', 'Frau Diallo hilft an Nacken und Oberschenkel', 'Sami rollt herum', 'noch einmal – vielleicht ohne Hilfe'], ordnung: [2, 0, 4, 1, 3] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hilft, wenn man vor einer Übung Angst hat? Was hat Frau Diallo gut gemacht?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir hilft, wenn …', 'Frau Diallo hat …', 'Kleine Schritte sind gut, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rolle vorwärts', nummern: true, punkte: ['**Hocke**, Arme vor', 'Hände **schulterbreit**, **Kinn auf die Brust**', 'über den **runden Rücken** rollen', 'Knie an, **aufstehen**'] },
         { titel: 'Sicherheit', punkte: ['nur auf der **Matte**', '**nie** auf den Kopf rollen', 'leichter: **schräge Matte**', 'Angst? **kleine Schritte**, Hilfe'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Beobachtungsbogen: Beobachte eine Rolle deines Partners. Was klappt schon?', stufe: 2, kopf: ['Merkmal', 'ja', 'noch nicht'], breiten: [64, 18, 18], zeilen: [['Hände schulterbreit vor den Füßen', '', ''], ['Kinn auf der Brust', '', ''], ['Rücken rund', '', ''], ['gerade gerollt, nicht zur Seite', '', ''], ['ohne Hände aufgestanden', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Gibt es eine Bewegung, vor der du Respekt oder Angst hattest? Wie bist du damit umgegangen? (Du kannst auch über eine ausgedachte Person schreiben.)', stufe: 2,
        anfaenge: ['Respekt hatte ich vor …', 'Ich habe …', 'Geholfen hat …', 'Jetzt …'], zeilen: 5,
        beispiel: 'Respekt hatte ich vor dem Sprung vom Kasten. Ich habe zuerst von einer niedrigen Stufe geübt und dann den Kasten höher gemacht. Geholfen hat, dass meine Freundin gesichert hat. Jetzt springe ich ohne Angst.' },
    ],
    check: ['Ich kenne die vier Phasen der Rolle vorwärts.', 'Ich achte auf Kinn und runden Rücken.', 'Ich beobachte andere und gebe Tipps.'],
  },
  // ================================================================ 4
  {
    thema: 'Springen und Landen', titel: 'Abheben – und sicher landen', untertitel: 'Jeder Sprung hat vier Phasen. Am wichtigsten für die Sicherheit ist die Landung. Du lernst, wie man weich landet, und springst vom Minitrampolin oder von der Bank.',
    ziel: { de: 'Ich kenne die Phasen eines Sprungs und lande sicher.', fr: 'Je connais les phases d’un saut et je me réceptionne en toute sécurité.' },
    bild: ['tom:froh:stehen-zeigen', 'chloe:aufgeregt:gehen'],
    start: {
      was: 'Probier mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Spring auf der Stelle hoch. Wie landest du am leisesten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['auf den Fußballen, Knie beugen', 'mit geraden Beinen auf den Fersen', 'auf einem Bein'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'Die vier Phasen eines Sprungs',
      absaetze: [
        '**Anlauf:** Man läuft schnell, aber kontrolliert auf das Sprunggerät zu. Die letzten Schritte werden kürzer.',
        '**Absprung:** Beim Turnen springt man mit **beiden Beinen** gleichzeitig ab, zum Beispiel vom Minitrampolin oder vom Sprungbrett. Die Arme schwingen kräftig nach oben.',
        '**Flug:** In der Luft macht man eine Figur: Strecksprung (ganz gerade), Hocksprung (Knie an die Brust) oder Grätschsprung (Beine auseinander). Der Körper ist **fest**, Bauch angespannt.',
        '**Landung:** Man landet auf beiden **Fußballen**, die **Knie beugen** sich wie Federn, die Arme gehen nach vorn. Dann steht man still – „Landung stehen“ – und zeigt mit den Armen: Fertig!',
        'Eine gute Landung schützt **Knie** und **Rücken**. Wer mit geraden Beinen landet, bekommt einen harten Stoß. Darum übt man die Landung auch einzeln, ohne Anlauf – zum Beispiel mit einem Sprung von einer Bank. Am **Minitrampolin** steht immer eine Person zum **Sichern** neben der Landestelle.',
      ],
      woerter: [['der Sprung', 'le saut'], ['der Anlauf', 'l’élan'], ['der Absprung', 'l’appel'], ['der Flug', 'la phase aérienne'], ['die Landung', 'la réception'], ['der Fußballen', 'l’avant-pied'], ['beugen', 'fléchir'], ['das Minitrampolin', 'le mini-trampoline']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Phasen eines Sprungs.', stufe: 1, teile: ['Anlauf', 'Absprung', 'Flug', 'Landung'], ordnung: [2, 0, 3, 1] },
        { art: 'zuordnen', auftrag: 'Welcher Sprung ist das? Verbinde.', stufe: 1, links: ['Der Körper ist ganz gerade.', 'Die Knie gehen an die Brust.', 'Die Beine gehen auseinander.'], rechts: ['Strecksprung', 'Hocksprung', 'Grätschsprung'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · am Minitrampolin', titel: 'Landung stehen!',
      situation: 'Chloé springt vom Minitrampolin. Tom gibt ihr als Beobachter Rückmeldung.',
      bild: ['chloe:aufgeregt:gehen', 'tom:froh:stehen-zeigen'], sprecher: { Chloé: 'w3', Tom: 'm3' },
      text: [
        ['Chloé', 'So, mein Strecksprung. Wie war es?'],
        ['Tom', 'Der Anlauf war gut. Aber du bist mit einem Bein zuerst abgesprungen.'],
        ['Chloé', 'Ach ja? Hab ich gar nicht gemerkt.'],
        ['Tom', 'Und bei der Landung bist du ganz steif gelandet und dann nach vorn gestolpert.'],
        ['Chloé', 'Stimmt, das hat ein bisschen in den Knien gezogen.'],
        ['Tom', 'Frau Diallo hat gesagt: Knie beugen wie Federn, Arme nach vorn, und dann stehen bleiben wie eine Statue.'],
        ['Chloé', 'Okay, noch einmal. Beide Beine, Knie beugen, stehen bleiben.'],
        ['Tom', 'Jetzt war es super! Du bist ganz leise gelandet und stehen geblieben.'],
        ['Chloé', 'Und es hat gar nicht mehr in den Knien gezogen. Jetzt probiere ich den Hocksprung.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „steif“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nicht beweglich, hart', 'weich und locker'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sagt Tom zu jeder Phase?', stufe: 1, kopf: ['Phase', '1. Sprung', '2. Sprung'], breiten: [20, 40, 40], zeilen: [['Anlauf', '[gut]', '[–]'], ['Absprung', '[mit einem Bein zuerst]', '[mit beiden Beinen]'], ['Landung', '[steif, nach vorn gestolpert]', '[leise, Knie gebeugt, stehen geblieben]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Seid zu zweit abwechselnd Springer und Beobachter. Der Beobachter sagt zu jeder Phase etwas.', stufe: 2, karten: [
        { titel: 'Beobachten', text: ['Dein Anlauf war …', 'Beim Absprung …', 'Bei der Landung …', 'Probier mal …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vier Phasen', nummern: true, punkte: ['**Anlauf**: schnell, kontrolliert', '**Absprung**: beidbeinig, Arme hoch', '**Flug**: Körper fest', '**Landung**: Ballen, Knie beugen'] },
         { titel: 'Sichere Landung', punkte: ['auf **beiden Fußballen**', 'Knie beugen wie **Federn**', 'Arme nach **vorn**', '**stehen bleiben**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Sprung-Beobachtungsbogen: Beobachte deinen Partner bei drei Sprüngen.', stufe: 2, kopf: ['', 'Sprung 1', 'Sprung 2', 'Sprung 3'], breiten: [40, 20, 20, 20], zeilen: [['beidbeinig abgesprungen', '', '', ''], ['Körper in der Luft fest', '', '', ''], ['Knie bei der Landung gebeugt', '', '', ''], ['Landung gestanden', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welcher Sprung hat dir am meisten Spaß gemacht? Wie war deine Landung?', stufe: 1,
        anfaenge: ['Am meisten Spaß gemacht hat …', 'Meine Landung …', 'Nächstes Mal …'], zeilen: 5,
        beispiel: 'Am meisten Spaß gemacht hat der Grätschsprung, weil man sich in der Luft ganz groß macht. Beim dritten Mal habe ich die Landung gestanden. Nächstes Mal möchte ich den Hocksprung höher springen.' },
    ],
    check: ['Ich kenne die vier Phasen eines Sprungs.', 'Ich lande sicher auf beiden Fußballen.', 'Ich beobachte und gebe Rückmeldung.'],
  },
  // ================================================================ 5
  {
    thema: 'Partner-Akrobatik', titel: 'Zusammen sind wir stark', untertitel: 'Bei der Akrobatik bauen mehrere Personen zusammen Figuren. Das geht nur mit Vertrauen, klaren Kommandos und sicheren Regeln. Du lernst die Regeln und baust Figuren mit Figurenkarten.',
    ziel: { de: 'Ich baue mit anderen sichere Akrobatik-Figuren.', fr: 'Je construis avec d’autres des figures acrobatiques en toute sécurité.' },
    bild: ['amira:froh:stehen-zeigen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist bei Akrobatik am wichtigsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Vertrauen und klare Absprachen', 'möglichst schnell eine hohe Pyramide', 'dass einer allein bestimmt'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Regeln für Akrobatik',
      absaetze: [
        'Bei der Akrobatik gibt es **Unten-Personen**, die tragen, **Oben-Personen**, die auf ihnen stehen oder knien, und **Helfer**, die sichern.',
        '**Stabil stehen:** Die Unten-Person macht einen festen „**Tisch**“: Hände unter den Schultern, Knie unter der Hüfte, Rücken gerade, Bauch fest.',
        '**Richtig belasten:** Die Oben-Person stellt Hände oder Knie nur auf die **Schultern** und die **Hüfte** der Unten-Person – **nie** auf die Mitte des Rückens. Da ist der Rücken weich.',
        '**Kommandos:** Vor jeder Figur ruft jemand: „Achtung – und – **hopp**!“ zum Aufbauen und „Achtung – und – **ab**!“ zum Abbauen. Man klettert **langsam** herunter, man springt nicht.',
        '**Zeigen:** Steht die Figur, halten alle sie drei Sekunden und strecken die freien Arme zur Seite. Dann wird kontrolliert abgebaut.',
        'Jeder darf sagen: „**Stopp!**“ Dann wird sofort abgebaut. Und: Jede Rolle ist wichtig – auch wer im Rollstuhl sitzt, kann Teil einer Figur sein, zum Beispiel als Mitte, die die Arme der anderen hält.',
      ],
      woerter: [['die Akrobatik', 'l’acrobatie'], ['die Figur', 'la figure'], ['tragen', 'porter'], ['stabil', 'stable'], ['belasten', 'charger'], ['die Schulter', 'l’épaule'], ['das Vertrauen', 'la confiance'], ['abbauen', 'démonter']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Oben-Person stellt sich auf die Mitte des Rückens.', false], ['Man belastet Schultern und Hüfte.', true], ['Zum Abbauen springt man schnell herunter.', false], ['Jeder darf „Stopp!“ rufen.', true], ['Man hält die fertige Figur drei Sekunden.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · Akrobatik-Gruppe', titel: 'Achtung – und – hopp!',
      situation: 'Amira, Yusuf, Mia und Nele bauen eine Figur. Amira gibt die Kommandos.',
      bild: ['amira:froh:stehen-zeigen', 'nele:froh:rollstuhl'], sprecher: { Amira: 'w2', Yusuf: 'm3', Mia: 'w3', Nele: 'w1' },
      text: [
        ['Amira', 'Wir bauen die Figur „Brücke mit Mitte“. Yusuf und ich sind unten im Tisch, Mia kniet oben, und Nele ist in der Mitte vor uns.'],
        ['Yusuf', 'Tisch steht. Hände unter den Schultern, Bauch fest.'],
        ['Amira', 'Mia, Knie nur auf unsere Hüften, Hände auf unsere Schultern. Achtung – und – hopp!'],
        ['Mia', 'Ich bin oben. Alles stabil. Jetzt nehme ich die Hände hoch.'],
        ['Nele', 'Und ich strecke die Arme hoch und halte Mias Hände. So steht sie noch sicherer.'],
        ['Amira', 'Super. Drei Sekunden halten: eins – zwei – drei!'],
        ['Yusuf', 'Ah, mein Arm zittert!'],
        ['Amira', 'Dann bauen wir sofort ab. Achtung – und – ab! Mia, langsam herunter.'],
        ['Mia', 'Bin unten. Alles gut, Yusuf?'],
        ['Yusuf', 'Ja. Nächstes Mal tausche ich mit dir, dann bin ich oben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „zittern“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sich schnell und klein hin und her bewegen, weil die Kraft nachlässt', 'ganz ruhig sein'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer hat welche Rolle?', stufe: 1, kopf: ['Person', 'Rolle in der Figur'], breiten: [30, 70], zeilen: [['Amira', '[unten im Tisch, gibt die Kommandos]'], ['Yusuf', '[unten im Tisch]'], ['Mia', '[oben, kniet auf den Hüften]'], ['Nele', '[in der Mitte, hält Mias Hände]']] },
        { art: 'fragen', auftrag: 'Warum wird die Figur sofort abgebaut?', stufe: 1, fragen: [{ f: '', l: 'weil Yusufs Arm zittert' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum ist Vertrauen bei der Akrobatik so wichtig? Wem vertraust du im Sport?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Vertrauen ist wichtig, weil …', 'Ich vertraue jemandem, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rollen', punkte: ['**Unten**: stabiler Tisch', '**Oben**: auf Schultern und Hüfte', '**Helfer**: sichern', '**alle** können mitmachen'] },
         { titel: 'Regeln', nummern: true, punkte: ['„Achtung – und – **hopp**!“', '**nie** auf die Rückenmitte', '**3 Sekunden** halten', '„Achtung – und – **ab**!“, langsam', '„**Stopp!**“ = sofort abbauen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Figuren-Karten: Zieht eine Karte und baut die Figur. Beginnt mit Stufe 1. Zeichnet eure eigene Figur auf die leere Karte.', stufe: 2, neueSeite: true, titel: 'Figur', icon: 'users', farbe: AKRO, spalten: 2,
        karten: [
          { text: '**Stufe 1 · zu zweit**\nRücken an Rücken sitzen, Arme einhaken und gemeinsam aufstehen.' }, { text: '**Stufe 1 · zu zweit**\nBeide im Tisch nebeneinander, die inneren Arme fassen sich an den Schultern.' },
          { text: '**Stufe 2 · zu dritt**\nZwei Tische nebeneinander, eine Person kniet oben auf beiden Hüften.' }, { text: '**Stufe 2 · zu dritt**\nZwei stehen, eine sitzt in der Mitte und hält beide Hände – alle lehnen sich leicht nach außen.' },
          { text: '**Stufe 3 · zu viert**\nZwei Tische, eine Oben-Person, eine Person vorn hält die Hände der Oben-Person.' }, { text: '**Unsere eigene Figur:**', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Rolle hattest du in der Figur? Wie hast du dich gefühlt?', stufe: 1,
        anfaenge: ['Ich war …', 'Ich habe mich … gefühlt, weil …', 'Nächstes Mal möchte ich …'], zeilen: 5,
        beispiel: 'Ich war unten im Tisch. Ich habe mich wichtig gefühlt, weil die anderen sich auf mich verlassen haben. Nächstes Mal möchte ich die Kommandos geben.' },
    ],
    check: ['Ich kenne die Rollen in der Akrobatik.', 'Ich belaste nur Schultern und Hüfte.', 'Ich baue mit Kommando auf und ab.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Eine Turnfolge gestalten', titel: 'Unsere Kür', untertitel: 'Zum Abschluss gestaltet ihr in der Gruppe eine eigene Turnfolge mit Musik: Anfang, Balance, Rolle, Sprung, Figur und Schluss. Ihr übt, zeigt sie der Klasse und bekommt Rückmeldung.',
    ziel: { de: 'Ich gestalte mit meiner Gruppe eine Turnfolge und präsentiere sie.', fr: 'Avec mon groupe, je crée un enchaînement et je le présente.' },
    bild: ['mia:froh:tanzen', 'tom:froh:stehen-zeigen'],
    start: {
      was: 'Ideen',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche Bewegungen aus diesem Modul kannst du gut? Schreibe drei auf.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Standwaage, Rolle vorwärts, Strecksprung, Akrobatik-Figur …' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Projekt-Anleitung', titel: 'So gestaltet ihr eine Kür',
      material: ['Matten, Bank, Minitrampolin', 'Musik (etwa eine Minute)', 'Kür-Karte zum Ausfüllen'],
      schritte: [
        { icon: 'list-numbers', text: '**Elemente wählen:** Wählt **fünf bis sechs** Elemente: zum Beispiel eine Balance, eine Rolle, einen Sprung, eine Akrobatik-Figur. Jeder macht, was er sicher kann.' },
        { icon: 'arrows-right', text: '**Verbinden:** Überlegt, wie ihr von einem Element zum nächsten kommt: gehen, drehen, gleiten. So wird es eine Folge.' },
        { icon: 'flag', text: '**Anfang und Schluss:** Beginnt und endet mit einer **festen Pose**, die alle gleichzeitig zeigen.' },
        { icon: 'music', text: '**Musik:** Passt die Bewegungen an die Musik an. Zählt mit: Acht Schläge pro Element.' },
        { icon: 'repeat', text: '**Üben:** Übt die Folge mindestens fünfmal. Helfer sichern dort, wo es nötig ist.' },
      ],
      danach: ['Bei der Präsentation achtet die Jury auf: **Sicherheit**, **saubere** Bewegungen, gute **Verbindungen**, **gemeinsam** im Takt und **Ausdruck**. Es zählt nicht, wer am höchsten springt – sondern wie gut ihr zusammen eine schöne Folge zeigt.'],
      woerter: [['die Kür', 'l’enchaînement libre'], ['das Element', 'l’élément'], ['verbinden', 'enchaîner'], ['die Pose', 'la pose'], ['gleichzeitig', 'en même temps'], ['der Takt', 'la mesure'], ['die Jury', 'le jury'], ['der Ausdruck', 'l’expression']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit der Anleitung.', stufe: 1, fragen: [{ f: 'Wie viele Elemente soll die Kür haben?', l: 'fünf bis sechs' }, { f: 'Womit beginnt und endet die Kür?', l: 'mit einer festen Pose, die alle gleichzeitig zeigen' }, { f: 'Worauf achtet die Jury? Nenne drei Punkte.', zeilen: 2, l: 'Sicherheit, saubere Bewegungen, Verbindungen, gemeinsam im Takt, Ausdruck' }] },
      ],
    },
    hoeren: {
      was: 'Eine Jury-Rückmeldung', wo: 'Sporthalle · Präsentation', titel: 'Die Jury sagt …',
      situation: 'Die Gruppe von Mia und Tom hat ihre Kür gezeigt. Lea und Ben sind die Jury.',
      bild: ['mia:froh:tanzen', 'tom:froh:stehen-zeigen'], sprecher: { Lea: 'w2', Ben: 'm2', Mia: 'w3' },
      text: [
        ['Lea', 'Wir sind die Jury. Zuerst: Das war richtig schön! Der Anfang war super, alle standen gleichzeitig in der Pose.'],
        ['Ben', 'Die Rollen waren sauber, und die Akrobatik-Figur war stabil. Ihr habt sie drei Sekunden gehalten und kontrolliert abgebaut.'],
        ['Lea', 'Was wir verbessern würden: Zwischen dem Sprung und der Figur gab es eine lange Pause. Da wusste man nicht, ob es weitergeht.'],
        ['Ben', 'Und am Ende wart ihr nicht ganz im Takt. Die Musik war schon aus, und ihr habt noch gedreht.'],
        ['Mia', 'Stimmt, die Pause war, weil wir die Matte holen mussten. Wir könnten sie vorher schon hinlegen.'],
        ['Lea', 'Gute Idee. Und ein Tipp: Zählt beim Üben laut mit. Dann seid ihr am Ende zusammen.'],
        ['Ben', 'Insgesamt: Sicherheit und Figur – sehr gut. Verbindung und Takt – noch üben. Applaus!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Jury? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie schaut zu und bewertet.', 'Sie turnt mit.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sagt die Jury?', stufe: 1, kopf: ['Punkt', 'Rückmeldung'], breiten: [30, 70], zeilen: [['Anfang', '[super, alle gleichzeitig in der Pose]'], ['Rollen und Figur', '[sauber, stabil, 3 Sekunden gehalten, kontrolliert abgebaut]'], ['Verbindung', '[lange Pause zwischen Sprung und Figur]'], ['Takt', '[am Ende nicht im Takt]'], ['Tipp', '[Matte vorher hinlegen; beim Üben laut mitzählen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Seid selbst Jury für eine andere Gruppe. Sagt zuerst, was gut war, dann einen Tipp.', stufe: 2, karten: [
        { titel: 'Jury', text: ['Toll war …', 'Sicher war …', 'Verbessern könntet ihr …', 'Unser Tipp: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Kür gestalten', nummern: true, punkte: ['**5–6 Elemente** wählen', 'Elemente **verbinden**', '**Anfang** und **Schluss**: feste Pose', 'an die **Musik** anpassen', 'oft **üben**, sichern'] },
         { titel: 'Jury achtet auf', punkte: ['**Sicherheit**', '**saubere** Bewegungen', '**Verbindungen**', '**Takt**, gemeinsam', '**Ausdruck**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Unsere Kür-Karte: Tragt eure Elemente in der richtigen Reihenfolge ein.', stufe: 2, kopf: ['Nr.', 'Element', 'Wer?', 'Schläge'], breiten: [10, 46, 28, 16], zeilen: [['1', 'Anfangspose', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', ''], ['5', '', '', ''], ['6', 'Schlusspose', '', '']] },
      { art: 'tabelle', auftrag: 'Jury-Bogen: Bewertet eine andere Gruppe mit 1 bis 3 Sternen.', stufe: 2, kopf: ['Kriterium', '★', '★★', '★★★'], breiten: [46, 18, 18, 18], zeilen: [['Sicherheit', '', '', ''], ['saubere Bewegungen', '', '', ''], ['Verbindungen', '', '', ''], ['gemeinsam im Takt', '', '', ''], ['Ausdruck', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief eure Kür? Worauf bist du stolz? Was hast du in diesem Modul gelernt?', stufe: 2,
        anfaenge: ['Unsere Kür …', 'Stolz bin ich auf …', 'In diesem Modul habe ich gelernt, …'], zeilen: 6,
        beispiel: 'Unsere Kür hat gut geklappt, nur am Ende waren wir etwas zu schnell. Stolz bin ich auf meine Rolle vorwärts, weil ich am Anfang Angst davor hatte. In diesem Modul habe ich gelernt, dass man sich mit Vertrauen und klaren Kommandos viel mehr traut.' },
    ],
    check: ['Ich gestalte mit anderen eine Turnfolge.', 'Ich zeige meine Elemente sicher und sauber.', 'Ich gebe als Jury faire Rückmeldung.'],
  },
]
