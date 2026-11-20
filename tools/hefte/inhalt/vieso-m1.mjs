// Vie et société · Modul 1 (7P) „Wer bin ich?“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“,
// 7. Klasse: Lernfeld „Was mich ausmacht – Wer bin ich? (Identität)“: Kindheit, Jugend, Erwachsenwerden; Wünsche,
// Träume, Sehnsucht; Erfolg und Misserfolg, Umgang mit Frustration (Stärken und Talente) – und Lernfeld „Begegnung mit
// Vertrautem und Fremdem“: Freundschaft. Viele Karten zum Ausschneiden (Gesprächs-, Stärken-, Mutmach-, Dilemmakarten).
// Persönliches nur freiwillig, ausgedachte Personen erlaubt; keine Fragen zur eigenen Familie. Hilfe: 116 111.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 1, {
  titel: 'Wer bin ich?',
  titelFr: 'Qui suis-je ?',
  unter: 'Viele Seiten von mir, groß werden, Wünsche und Träume, mit Misserfolg umgehen, Stärken entdecken, Freundschaft und Streit – mit Gesprächskarten und Dilemmas. In acht Lektionen.',
  unterFr: 'Mes facettes, grandir, rêves et souhaits, échecs et réussites, points forts, amitié et disputes – avec des cartes de discussion.',
  farbe: '#3a7d6b',
  deckbild: ['amira:ruhig:stehen', 'sami:froh:laessig', 'nele:froh:sitzen'],
  blasen: [{ t: 'Wer bin ich eigentlich?', x: 10, y: 112 }, { t: 'Was ist dir wichtig?', x: 116, y: 96 }, { t: 'Noch nicht!', x: 166, y: 150 }],
  themen: [
    { titel: { de: 'Ich', fr: 'Moi' }, icon: 'fingerprint', lektionen: 3 },
    { titel: { de: 'Stark werden', fr: 'Devenir fort' }, icon: 'mountain', lektionen: 2 },
    { titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' }, icon: 'users-group', lektionen: 3 },
  ],
})

const FRAGE = '#3a7d6b', STAERKE = '#c98a06', MUT = '#d0577b', DILEMMA = '#6d4bc4'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Identität · viele Seiten', titel: 'Ich bin viele', untertitel: 'Was macht mich aus? Du liest Selbstporträts, hörst ein Gespräch über „echt sein“ und philosophierst mit Gesprächskarten.',
    ziel: { de: 'Ich beschreibe verschiedene Seiten von mir und spreche nach Gesprächsregeln über eine große Frage.', fr: 'Je décris différentes facettes de moi et je discute d’une grande question en respectant des règles.' },
    bild: ['amira:ruhig:stehen', 'lio:froh:laessig'],
    start: {
      was: 'Ich in einem Bild',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Wer bist du? Schreibe in die Kästen: was du magst, was du kannst, was dir wichtig ist. (Du kannst auch eine ausgedachte Person nehmen.)', stufe: 1, mitte: 'Ich', aeste: [{ l: '' }, { l: '' }, { l: '' }, { l: '' }, { l: '' }, { l: '' }] },
      ],
    },
    lesen: {
      was: 'Selbstporträts', art: 'profile', stimme: 'w1',
      quelle: 'Aus einer Wandzeitung der Klasse 7P2 (Jugendliche ausgedacht)', titel: 'So bin ich – und noch ganz anders',
      profile: [
        { name: 'Amira', bild: 'amira:ruhig:brust', stimme: 'w2', text: 'In der Schule bin ich still. Viele denken, ich bin schüchtern. Aber im Tanzverein bin ich laut und albern. Ich spreche vier Sprachen und denke manchmal auf Arabisch, manchmal auf Luxemburgisch. **Ich bin nicht nur eine Sache.**' },
        { name: 'Lio', bild: 'lio:froh:brust', stimme: 'm3', text: 'Ich sitze im Rollstuhl. Leute sehen oft zuerst den Rollstuhl. Dabei bin ich vor allem: Basketballfan, Witzeerzähler und der Beste in Mathe in unserer Klasse. **Der Rollstuhl gehört zu mir – aber er ist nicht alles.**' },
        { name: 'Jana', bild: 'jana:froh:brust', stimme: 'w3', text: 'Letztes Jahr wollte ich so sein wie die Influencerinnen: gleiche Kleider, gleiche Sprüche. Ich war nicht glücklich. Jetzt trage ich, was mir gefällt, auch wenn es nicht „in“ ist. **Ich will lieber echt sein als perfekt.**' },
      ],
      woerter: [['die Identität', 'l’identité'], ['schüchtern', 'timide'], ['albern', 'fou, rigolo'], ['echt', 'authentique, vrai'], ['perfekt', 'parfait'], ['die Seite (einer Person)', 'la facette']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was zeigt die Person in der Schule – und was nicht?', stufe: 1, kopf: ['Name', 'Das sehen die anderen zuerst', 'Das gehört auch zu ihr / zu ihm'], breiten: [16, 38, 46], zeilen: [['Amira', '[still, schüchtern]', '[laut und albern im Tanzverein; spricht vier Sprachen]'], ['Lio', '[den Rollstuhl]', '[Basketballfan, Witzeerzähler, gut in Mathe]'], ['Jana', '[früher: wie die Influencerinnen]', '[trägt jetzt, was ihr gefällt; will echt sein]']] },
        { art: 'fragen', auftrag: 'Was meint Jana mit „lieber echt sein als perfekt“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Sie will so sein, wie sie wirklich ist, und nicht jemanden nachmachen, nur um gut anzukommen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · auf der Treppe', titel: 'Bin ich noch ich?',
      situation: 'Sami und Nele reden über Samis neuen Look.',
      bild: ['sami:verlegen:stehen', 'nele:froh:sitzen'], sprecher: { Sami: 'm3', Nele: 'w3' },
      text: [
        ['Nele', 'Sami! Neue Frisur? Und du trägst ja gar keine Trainingshose mehr.'],
        ['Sami', 'Ja … Mein Cousin meint, ich soll erwachsener aussehen. Findest du es komisch?'],
        ['Nele', 'Nein, sieht gut aus. Aber wie fühlst du dich?'],
        ['Sami', 'Ehrlich gesagt: ein bisschen verkleidet. Als wäre ich jemand anderes.'],
        ['Nele', 'Hm. Man darf sich ja verändern. Ich habe früher nur Pink getragen, heute nie mehr.'],
        ['Sami', 'Aber bist du dann noch dieselbe Person?'],
        ['Nele', 'Gute Frage … Ich glaube schon. Mein Lachen ist gleich, meine Freunde sind gleich. Ich bin wie ein Baum: Die Blätter wechseln, die Wurzeln bleiben.'],
        ['Sami', 'Dann behalte ich die Frisur – aber die Trainingshose kommt zurück. Die bin ich!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was verändert sich, wenn man älter wird? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der Körper', 'der Geschmack (Musik, Kleider)', 'die Freunde', 'die Interessen'], r: [0, 1, 2, 3] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Samis Cousin findet, Sami soll erwachsener aussehen.', true], ['Sami fühlt sich mit dem neuen Look sofort wohl.', false], ['Nele hat früher nur Pink getragen.', true], ['Sami trägt am Ende wieder seine Trainingshose.', true]] },
        { art: 'fragen', auftrag: 'Erkläre Neles Bild vom Baum.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Äußere Dinge (Kleider, Geschmack) ändern sich wie Blätter; das Innere (Lachen, Freunde, Werte) bleibt wie die Wurzeln.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was ist bei dir eher „Blatt“ (verändert sich), was eher „Wurzel“ (bleibt)? Erzähl nur, was du möchtest.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Früher …, heute …', 'Was bleibt, ist …', 'Ich möchte mich ändern in …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Identität', punkte: ['**Identität** = das, was mich ausmacht.', 'Ich habe **viele Seiten**: in der Schule, im Verein, mit Freunden.', 'Identität **verändert sich** – und manches bleibt.'] },
         { titel: 'Regeln zum Philosophieren', nummern: true, punkte: ['Es gibt **kein Richtig oder Falsch**.', 'Ich **begründe**: „Ich denke …, weil …“', 'Ich **höre zu** und lasse ausreden.', 'Ich darf **meine Meinung ändern**.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gesprächskarten: Schneidet die Karten aus. Zieht eine Karte und sprecht darüber – nach den Regeln zum Philosophieren.', stufe: 2, neueSeite: true, titel: 'Große Frage', icon: 'help-circle', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Bist du heute noch dieselbe Person wie mit fünf Jahren?' },
          { text: 'Kann man sich selbst ganz kennen?' },
          { text: 'Wer bestimmt, wer du bist: du selbst oder die anderen?' },
          { text: 'Darf man in verschiedenen Gruppen verschieden sein – oder ist das unecht?' },
          { text: 'Was würde sich ändern, wenn du einen anderen Namen hättest?' },
          { text: 'Ist es wichtiger, beliebt zu sein oder echt zu sein?' },
          { text: 'Gibt es etwas an dir, das sich nie ändern wird?' },
          { text: 'Wenn niemand dich sieht: Bist du dann anders?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein „Ich bin …“-Gedicht. Jede Zeile beginnt mit „Ich bin …“. Zeige verschiedene Seiten. (Du kannst auch über eine ausgedachte Person schreiben.)', stufe: 2,
        zeilenAnfaenge: ['Ich bin …', 'Ich bin …', 'Ich bin …', 'Ich bin …', 'Ich bin …', 'Aber vor allem bin ich …'], zeilen: 7,
        beispiel: 'Ich bin still in der Schule. Ich bin laut beim Fußball. Ich bin die, die immer Kaugummi hat. Ich bin manchmal müde und manchmal voller Ideen. Ich bin nicht perfekt. Aber vor allem bin ich ich.' },
    ],
    check: ['Ich beschreibe verschiedene Seiten von mir.', 'Ich erkläre, was Identität ist.', 'Ich halte mich an die Regeln zum Philosophieren.'],
  },
  // ================================================================ 2
  {
    thema: 'Kindheit · Jugend · Erwachsenwerden', titel: 'Groß werden', untertitel: 'Was darf man mit 12, mit 16, mit 18? Du liest über Rechte und Pflichten in verschiedenen Lebensaltern und diskutierst: Ab wann ist man erwachsen?',
    ziel: { de: 'Ich beschreibe Veränderungen von der Kindheit bis zum Erwachsensein und begründe meine Meinung.', fr: 'Je décris les changements de l’enfance à l’âge adulte et je justifie mon opinion.' },
    bild: ['finn:froh:stehen', 'oma:froh:stehen'],
    start: {
      was: 'Lebensalter',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Lebensabschnitte von jung nach alt.', stufe: 1, teile: ['Baby', 'Kindheit', 'Jugend', 'Erwachsenenalter', 'hohes Alter'], ordnung: [3, 1, 4, 0, 2] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infotext (vereinfacht; Stand 2026 – Regeln können sich ändern)', titel: 'Schritt für Schritt erwachsen',
      absaetze: [
        'Erwachsen wird man nicht an einem einzigen Tag. Es ist ein langer Weg. Auch das Gesetz gibt jungen Menschen **Schritt für Schritt** mehr Rechte – und mehr Verantwortung.',
        '### Kindheit und Jugend',
        'In Luxemburg müssen Kinder und Jugendliche zur Schule gehen: Das ist die **Schulpflicht**. Kinder und Jugendliche haben besondere Rechte, zum Beispiel das Recht auf Schutz und auf Bildung. Diese Rechte stehen in der **UN-Kinderrechtskonvention**. Sie gilt für alle unter 18 Jahren.',
        '### Mit 16',
        'Mit 16 darf man in Luxemburg zum Beispiel einen Führerschein für ein kleines Motorrad machen. Viele Jugendliche beginnen eine Ausbildung oder machen Ferienjobs.',
        '### Mit 18',
        'Mit 18 ist man **volljährig**. Man darf wählen, Verträge unterschreiben und den Autoführerschein machen. Man ist auch selbst verantwortlich, wenn etwas schiefgeht.',
        'Viele Forscher sagen: Das Gehirn entwickelt sich bis etwa Mitte zwanzig weiter. „Erwachsen sein“ ist also mehr als ein Geburtstag. Es heißt auch: Verantwortung übernehmen, für sich und für andere.',
      ],
      woerter: [['erwachsen', 'adulte'], ['die Kindheit', 'l’enfance'], ['die Jugend', 'l’adolescence'], ['volljährig', 'majeur'], ['die Schulpflicht', 'la scolarité obligatoire'], ['die Verantwortung', 'la responsabilité'], ['der Vertrag', 'le contrat'], ['wählen', 'voter']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ab welchem Alter? Ergänze mit Hilfe des Textes.', stufe: 1, kopf: ['', 'Alter'], breiten: [70, 30], zeilen: [['Den Führerschein für ein kleines Motorrad kann man machen mit …', '[16 Jahren]'], ['Volljährig ist man mit …', '[18 Jahren]'], ['Die Kinderrechtskonvention gilt für alle unter …', '[18 Jahren]'], ['Das Gehirn entwickelt sich weiter bis etwa …', '[Mitte zwanzig]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Im Altenheim · Projekt „Jung und Alt“', titel: 'Wie war es, 13 zu sein?',
      situation: 'Finn besucht mit seiner Klasse ein Altenheim. Er spricht mit Frau Majerus, 84 Jahre alt.',
      bild: ['finn:froh:sitzen', 'oma:froh:sitzen'], sprecher: { Finn: 'm3', 'Frau Majerus': 'w1' },
      text: [
        ['Finn', 'Frau Majerus, wie war das, als Sie dreizehn waren?'],
        ['Frau Majerus', 'Oh, das ist lange her! Mit dreizehn habe ich schon auf dem Bauernhof meiner Eltern mitgearbeitet. Morgens vor der Schule die Kühe füttern.'],
        ['Finn', 'Vor der Schule? Ich schlafe da noch!'],
        ['Frau Majerus', 'Wir hatten keine Wahl. Mit vierzehn habe ich die Schule verlassen und in einem Geschäft gearbeitet. Ich hätte gern weiter gelernt.'],
        ['Finn', 'Das finde ich unfair. Heute müssen alle lange zur Schule gehen.'],
        ['Frau Majerus', 'Das ist gut so. Ihr habt mehr Zeit, herauszufinden, wer ihr seid. Aber sag mal: Was ist heute schwer, wenn man dreizehn ist?'],
        ['Finn', 'Hm … Alle schauen auf Handys und vergleichen sich. Man soll immer cool sein.'],
        ['Frau Majerus', 'Vergleichen haben wir auch – nur ohne Handy. Mein Rat: Hör auf dein Herz, nicht auf die Lautesten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie war die Jugend vor 70 Jahren wahrscheinlich? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Viele Jugendliche mussten früh arbeiten.', 'Alle hatten ein Handy.', 'Weniger Jugendliche konnten lange zur Schule gehen.'], r: [0, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Vergleiche.', stufe: 1, kopf: ['', 'Frau Majerus mit 13', 'Finn heute mit 13'], breiten: [24, 38, 38], zeilen: [['Morgens', '[Kühe füttern vor der Schule]', '[schläft noch]'], ['Schule', '[mit 14 aufgehört, dann gearbeitet]', '[muss lange zur Schule gehen]'], ['Schwierig', '[keine Wahl, viel Arbeit]', '[Vergleichen, immer cool sein müssen]']] },
        { art: 'fragen', auftrag: 'Welchen Rat gibt Frau Majerus?', stufe: 2, fragen: [{ f: '', l: 'Hör auf dein Herz, nicht auf die Lautesten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wenn ihr wollt: Fragt eine ältere Person aus eurer Umgebung (Nachbar, Trainerin …), wie ihre Jugend war. Vergleicht in der Klasse.', stufe: 3, karten: [
        { titel: 'Interviewfragen', text: ['Was haben Sie mit 13 gemacht?', 'Was war damals schwer?', 'Was war schöner als heute?', 'Welchen Rat haben Sie für mich?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Lebensalter', punkte: ['**Kindheit**: spielen, lernen, beschützt werden', '**Jugend**: sich ausprobieren, eigene Meinung, Körper verändert sich', '**Erwachsensein**: Verantwortung für sich und andere'] },
         { titel: 'Rechte wachsen mit', punkte: ['**unter 18**: Kinderrechte, besonderer Schutz', '**16**: z. B. Führerschein für ein kleines Motorrad', '**18**: volljährig – wählen, Verträge, Führerschein'] }],
        [{ art: 'achtung', titel: 'Stand der Regeln', text: 'Gesetze können sich ändern. Frag bei Fragen zu Alter und Rechten eine Lehrkraft oder schau auf offiziellen Seiten nach.' }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Kreuze an und begründe.', stufe: 2, aussagen: ['Mit 16 sollte man in Luxemburg wählen dürfen.', 'Erwachsen ist man, wenn man sein eigenes Geld verdient.', 'Jugendliche heute haben es leichter als früher.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an dich selbst mit 18. Was wünschst du dir für dein „erwachsenes Ich“? Was soll es nicht vergessen?', stufe: 2,
        anfaenge: ['Liebes Ich mit 18,', 'Jetzt bin ich 12 / 13 und …', 'Ich hoffe, dass du …', 'Vergiss nicht, …'], zeilen: 9,
        beispiel: 'Liebes Ich mit 18, jetzt bin ich 13 und spiele jeden Tag Fußball. Ich hoffe, dass du eine Ausbildung machst, die dir Spaß macht. Ich hoffe, dass du noch mit Lio befreundet bist. Vergiss nicht, wie gern du lachst, auch wenn du viel Verantwortung hast.' },
    ],
    check: ['Ich beschreibe Kindheit, Jugend und Erwachsensein.', 'Ich nenne Rechte, die mit 16 und 18 dazukommen.', 'Ich begründe meine Meinung zu einer Streitfrage.'],
  },
  // ================================================================ 3
  {
    thema: 'Wünsche · Träume · Ziele', titel: 'Wünsche, Träume, Ziele', untertitel: 'Ein Wunsch ist nicht dasselbe wie ein Ziel: Du liest eine Geschichte, hörst einen Podcast und machst aus einem Traum einen Plan.',
    ziel: { de: 'Ich unterscheide Wunsch, Traum und Ziel und plane einen kleinen Schritt zu einem Ziel.', fr: 'Je distingue souhait, rêve et but et je planifie un petit pas vers un but.' },
    bild: ['yusuf:ruhig:stehen', 'mia:froh:stehen'],
    start: {
      was: 'Mein Wunschbaum',
      aufgaben: [
        { art: 'fragen', auftrag: 'Eine gute Fee schenkt dir drei Wünsche – aber keine für Geld. Was wünschst du dir?', stufe: 1, fragen: [{ f: '1.', l: 'z. B. dass meine Freundschaften halten' }, { f: '2.', l: 'z. B. einmal das Meer sehen' }, { f: '3.', l: 'z. B. Frieden auf der Welt' }] },
      ],
    },
    lesen: {
      was: 'Eine Geschichte', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Yusufs Traum vom Fliegen',
      absaetze: [
        'Seit er klein war, schaute Yusuf jedem Flugzeug nach. „Ich werde Pilot“, sagte er. Die anderen lachten: „Mit deinen Noten in Mathe?“ Yusuf wurde jedes Mal leiser.',
        'Eines Tages besuchte eine Pilotin die Schule. Yusuf traute sich und fragte: „Kann man Pilot werden, wenn man schlecht in Mathe ist?“ Die Pilotin lächelte: „Ich war auch nicht gut. Ich habe geübt – jeden Tag ein bisschen. Ein Traum ist der Anfang. Aber ein Ziel braucht einen **Plan**.“',
        'Am Abend schrieb Yusuf auf ein Blatt: **Mein Traum:** Pilot werden. **Mein Ziel für diesen Monat:** jeden Tag zehn Minuten Mathe üben. **Mein erster Schritt:** morgen den Nachhilfe-Club fragen.',
        'Ob Yusuf einmal Pilot wird, weiß niemand. Aber seit diesem Abend wird er nicht mehr leiser, wenn jemand lacht.',
      ],
      woerter: [['der Wunsch', 'le souhait'], ['der Traum', 'le rêve'], ['das Ziel', 'le but, l’objectif'], ['der Plan', 'le plan'], ['sich trauen', 'oser'], ['der Schritt', 'le pas, l’étape']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Geschichte.', stufe: 1, teile: ['Die anderen lachen über Yusufs Traum.', 'Eine Pilotin besucht die Schule.', 'Yusuf stellt eine mutige Frage.', 'Yusuf schreibt Traum, Ziel und ersten Schritt auf.', 'Yusuf wird nicht mehr leiser, wenn jemand lacht.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Was ist der Unterschied zwischen Yusufs Traum und seinem Ziel?', zeilen: 2, l: 'Der Traum ist groß und weit weg (Pilot werden); das Ziel ist klein, konkret und machbar (jeden Tag zehn Minuten Mathe).' }, { f: 'Warum wird Yusuf am Ende nicht mehr leiser?', zeilen: 2, l: 'Er hat einen Plan und glaubt an sich; er weiß, was er tun kann.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast', wo: 'Schulpodcast „Große Fragen“', titel: 'Muss man Träume haben?',
      situation: 'Mia und Noah sprechen in ihrem Schulpodcast über Träume.',
      bild: ['mia:froh:handy', 'noah:verwirrt:handy'], sprecher: { Mia: 'w3', Noah: 'm3' },
      text: [
        ['Mia', 'Willkommen bei „Große Fragen“! Heute: Muss man einen großen Traum haben? Noah, was ist dein Traum?'],
        ['Noah', 'Ehrlich? Ich habe keinen. Alle fragen immer: Was willst du werden? Und ich weiß es nicht. Das stresst mich.'],
        ['Mia', 'Das geht vielen so. Ich habe gelesen: Viele Erwachsene haben ihren Beruf erst mit zwanzig oder dreißig gefunden.'],
        ['Noah', 'Wirklich? Dann bin ich ja nicht komisch.'],
        ['Mia', 'Gar nicht. Vielleicht muss man nicht wissen, was man werden will – sondern nur, was einem heute Freude macht.'],
        ['Noah', 'Mir macht Kochen Freude. Und Leuten helfen.'],
        ['Mia', 'Siehst du? Das sind keine kleinen Dinge. Aus so etwas wachsen manchmal Träume.'],
        ['Noah', 'Okay. Mein Ziel für diese Woche: ein neues Rezept ausprobieren. Ist das ein Anfang?'],
        ['Mia', 'Das ist ein super Anfang!'],
      ],
      vor: [{ art: 'meinungslinie', auftrag: 'Was denkst du?', stufe: 1, warum: false, aussagen: ['Jeder Mensch braucht einen großen Traum.'] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Warum ist Noah gestresst?', o: ['Er weiß nicht, was er werden will.', 'Er hat zu viele Hausaufgaben.'], r: 0 }, { f: 'Was macht Noah Freude?', o: ['Kochen und Leuten helfen', 'Fußball und Videospiele'], r: 0 }, { f: 'Was ist Noahs Ziel für diese Woche?', o: ['ein neues Rezept ausprobieren', 'einen Beruf wählen'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Nicht jeder hat einen großen Traum – und das ist okay. Sprecht zu zweit: Was macht euch heute Freude? Was könnte daraus wachsen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir macht Freude, wenn …', 'Ich bin gut darin, …', 'Daraus könnte …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wunsch · Traum · Ziel', punkte: ['**Wunsch**: Das hätte ich gern. (Ich kann es oft nicht selbst machen.)', '**Traum**: ein großes Bild von meiner Zukunft', '**Ziel**: etwas Konkretes, das ich **selbst** erreichen kann'] },
         { titel: 'Ein gutes Ziel ist …', punkte: ['**klar**: Was genau?', '**machbar**: Kann ich das schaffen?', '**mit Zeit**: Bis wann?', 'mit einem **ersten Schritt**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Wunsch, Traum oder Ziel? Kreuze an.', stufe: 2, kopf: ['', 'Wunsch', 'Traum', 'Ziel'], breiten: [52, 16, 16, 16], zeilen: [['„Ich hätte gern einen Hund.“', '[x]', '', ''], ['„Ich will einmal um die Welt reisen.“', '', '[x]', ''], ['„Bis Freitag lerne ich 20 neue Wörter.“', '', '', '[x]'], ['„Ich hoffe, dass es morgen nicht regnet.“', '[x]', '', ''], ['„Diese Woche gehe ich dreimal joggen.“', '', '', '[x]']] },
      { art: 'tabelle', auftrag: 'Mach aus einem Traum einen Plan – wie Yusuf. (Du kannst auch einen ausgedachten Traum nehmen.)', stufe: 3, kopf: ['', 'mein Plan'], breiten: [32, 68], zeilen: [['Mein Traum:', '[z. B. eine eigene Band]'], ['Mein Ziel (diesen Monat):', '[z. B. drei Akkorde auf der Gitarre lernen]'], ['Mein erster Schritt:', '[z. B. morgen ein Lernvideo anschauen]'], ['Wer kann mir helfen?', '[z. B. der Musiklehrer]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Geschichte über eine Person, die einen Traum hat und den ersten Schritt macht.', stufe: 2,
        anfaenge: ['… träumte davon, …', 'Aber …', 'Eines Tages …', 'Der erste Schritt war …'], zeilen: 9,
        beispiel: 'Lea träumte davon, Tierärztin zu werden. Aber sie hatte Angst vor großen Hunden. Eines Tages fand sie einen verletzten Vogel. Sie brachte ihn ins Tierheim und durfte zuschauen, wie man ihn verband. Der erste Schritt war gemacht: Jetzt hilft sie jeden Samstag im Tierheim.' },
    ],
    check: ['Ich unterscheide Wunsch, Traum und Ziel.', 'Ich formuliere ein klares, machbares Ziel.', 'Ich plane einen ersten Schritt.'],
  },
  // ================================================================ 4
  {
    thema: 'Erfolg · Misserfolg · Frust', titel: 'Hinfallen, aufstehen', untertitel: 'Eine schlechte Note, ein verlorenes Spiel: Du liest, wie andere mit Misserfolg umgehen, hörst ein Gespräch nach einem Spiel und bastelst Mutmach-Karten.',
    ziel: { de: 'Ich nenne gute Wege, mit Frust und Misserfolg umzugehen.', fr: 'Je cite de bonnes façons de gérer la frustration et l’échec.' },
    bild: ['ben:enttaeuscht:stehen', 'chloe:froh:erklaeren'],
    start: {
      was: 'Frust',
      aufgaben: [
        { art: 'mc', auftrag: 'Wann bist du frustriert? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['nach einer schlechten Note', 'wenn ein Spiel nicht klappt', 'wenn ich etwas nicht verstehe', 'wenn andere besser sind', 'wenn ich ungerecht behandelt werde'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Zeitschriftenartikel', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Jugendmagazin (Text vereinfacht)', titel: 'Das kleine Wort „noch“',
      absaetze: [
        'Kennst du den Satz: „Ich kann das nicht“? Eine Forscherin aus den USA hat herausgefunden, dass ein kleines Wort viel ändern kann: **„noch“**. „Ich kann das **noch** nicht“ klingt ganz anders. Es sagt: Ich bin auf dem Weg.',
        '### Fehler sind Lernchancen',
        'Unser Gehirn lernt am meisten, wenn etwas schwierig ist. Wer Fehler macht, probiert etwas Neues. Viele berühmte Erfindungen gab es nur, weil jemand nach vielen Fehlversuchen weitergemacht hat.',
        '### Was hilft bei Frust?',
        'Frust ist ein normales Gefühl. Wichtig ist, was man daraus macht. Das hilft vielen: **tief atmen** und eine kurze Pause machen; mit jemandem **darüber reden**; sich fragen: „Was kann ich beim nächsten Mal **anders** machen?“; und sich an etwas erinnern, das schon **geklappt** hat.',
        'Was nicht hilft: alles hinwerfen, sich selbst beschimpfen oder die Wut an anderen auslassen.',
      ],
      woerter: [['der Misserfolg', 'l’échec'], ['der Erfolg', 'la réussite'], ['der Frust', 'la frustration'], ['der Fehlversuch', 'l’essai raté'], ['aufgeben', 'abandonner'], ['die Lernchance', 'l’occasion d’apprendre']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Hilft das bei Frust oder nicht? Kreuze an.', stufe: 1, kopf: ['', 'hilft', 'hilft nicht'], breiten: [64, 18, 18], zeilen: [['tief atmen und Pause machen', '[x]', ''], ['alles hinwerfen', '', '[x]'], ['mit jemandem darüber reden', '[x]', ''], ['sich selbst beschimpfen', '', '[x]'], ['fragen: Was mache ich nächstes Mal anders?', '[x]', ''], ['die Wut an anderen auslassen', '', '[x]']] },
        { art: 'abschreiben', auftrag: 'Sag es mit „noch“.', stufe: 2, kopf: ['so', 'mit „noch“'], saetze: [['Ich kann das nicht.', 'Ich kann das noch nicht.'], ['Ich verstehe Brüche nicht.', 'Ich verstehe Brüche noch nicht.'], ['Ich bin nicht gut im Basketball.', 'Ich bin noch nicht gut im Basketball.']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach dem Basketballspiel · Umkleide', titel: 'Wir haben verloren',
      situation: 'Bens Mannschaft hat hoch verloren. Ben ist wütend. Chloé spricht mit ihm.',
      bild: ['ben:wuetend:stehen', 'chloe:ruhig:stehen'], sprecher: { Ben: 'm3', 'Chloé': 'w3' },
      text: [
        ['Ben', 'Das war peinlich! Vierzig zu zwölf! Ich höre auf mit Basketball.'],
        ['Chloé', 'Hey, atme erst mal durch. Du bist gerade sauer, das verstehe ich.'],
        ['Ben', 'Ich habe drei Freiwürfe verworfen. Alle haben es gesehen.'],
        ['Chloé', 'Und? Du hast auch zwei super Pässe gespielt. Die hat der Trainer gelobt.'],
        ['Ben', 'Das zählt doch nicht, wenn man verliert.'],
        ['Chloé', 'Doch. Die anderen spielen seit fünf Jahren. Wir seit fünf Monaten. Wir sind noch nicht so weit – das ist alles.'],
        ['Ben', '„Noch nicht“ … Na gut. Vielleicht übe ich mehr Freiwürfe.'],
        ['Chloé', 'Wir können zusammen üben. Mittwoch nach der Schule?'],
        ['Ben', 'Okay. Aber nur, wenn du mir nicht erzählst, wie viele du triffst.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Freiwurf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Wurf ohne Gegner nach einem Foul', 'ein Wurf aus der eigenen Hälfte'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Bens Mannschaft hat 40 zu 12 verloren.', true], ['Ben hat alle Freiwürfe getroffen.', false], ['Der Trainer hat Bens Pässe gelobt.', true], ['Chloé und Ben wollen am Mittwoch üben.', true]] },
        { art: 'fragen', auftrag: 'Was macht Chloé gut? Nenne zwei Dinge.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Sie zeigt Verständnis, beruhigt ihn, erinnert an das Positive, vergleicht fair („noch nicht“), bietet Hilfe an.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt die Szene weiter: Ben trifft am Mittwoch beim Üben immer noch nicht. Was sagt Chloé jetzt?', stufe: 3, karten: [
        { titel: 'Mutmachen', text: ['Das wird schon.', 'Weißt du noch, wie …?', 'Versuch mal …', 'Ich glaube an dich.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Mit Frust umgehen', nummern: true, punkte: ['**Stopp**: atmen, kurze Pause.', '**Reden**: mit jemandem, dem du vertraust.', '**Lernen**: Was mache ich nächstes Mal anders?', '**Erinnern**: Was hat schon geklappt?'] },
         { titel: 'Das Wort „noch“', punkte: ['„Ich kann das **noch** nicht.“', 'Fehler zeigen, **wo** ich lernen kann.', 'Fortschritt ist wichtiger als Perfektion.'] }],
        [{ art: 'tipp', titel: 'Wenn es dir länger schlecht geht', text: 'Wenn Frust und Traurigkeit nicht weggehen, sprich mit einer Vertrauensperson, der Schulpsychologin oder dem Schulpsychologen. Du kannst auch kostenlos und anonym **116 111** anrufen.' }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Mutmach-Karten: Lies die Karten. Schreibe auf die leeren Karten eigene Mutmach-Sätze. Schneidet sie aus und schenkt sie jemandem, der sie gerade braucht.', stufe: 2, neueSeite: true, titel: 'Mutmach-Karte', icon: 'heart', farbe: MUT, spalten: 3,
        karten: [
          { text: 'Fehler heißt: Du probierst etwas Neues.' },
          { text: 'Du kannst das noch nicht. **Noch.**' },
          { text: 'Ein schlechter Tag ist kein schlechtes Leben.' },
          { text: 'Weißt du noch, was du schon alles gelernt hast?' },
          { text: 'Du musst das nicht allein schaffen.' },
          { text: 'Atme. Dann der nächste kleine Schritt.' },
          { text: ' ', linien: 3 }, { text: ' ', linien: 3 }, { text: ' ', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erzähle von einem Misserfolg – deinem eigenen oder einem ausgedachten. Was ist passiert? Wie hast du (oder die Person) reagiert? Was hast du gelernt?', stufe: 2,
        anfaenge: ['Einmal …', 'Zuerst war ich …', 'Dann habe ich …', 'Gelernt habe ich, dass …'], zeilen: 9,
        beispiel: 'Einmal habe ich beim Vorlesen in der Klasse ganz oft gestottert. Zuerst war ich wütend und wollte nie mehr vorlesen. Dann habe ich zu Hause laut geübt, zuerst allein, dann vor meiner Freundin. Gelernt habe ich, dass Üben hilft und dass die anderen gar nicht so schlimm gelacht haben, wie ich dachte.' },
    ],
    check: ['Ich nenne vier gute Wege, mit Frust umzugehen.', 'Ich benutze das Wort „noch“ beim Lernen.', 'Ich weiß, wo ich Hilfe bekomme.'],
  },
  // ================================================================ 5
  {
    thema: 'Stärken · Talente · Selbstwert', titel: 'Meine Stärken – deine Stärken', untertitel: 'Jeder Mensch hat Stärken, auch wenn man sie nicht immer sieht: Du liest über verschiedene Talente, hörst eine Klassenaktion und verschenkst Stärken-Karten.',
    ziel: { de: 'Ich erkenne Stärken bei mir und bei anderen und sage sie freundlich.', fr: 'Je reconnais des points forts chez moi et chez les autres et je les dis gentiment.' },
    bild: ['nele:froh:rollstuhl', 'tom:froh:stehen'],
    start: {
      was: 'Stärken-Wörter',
      aufgaben: [
        { art: 'luecken', auftrag: 'Welche Stärke ist das? Ergänze.', stufe: 1, woerter: ['hilfsbereit', 'mutig', 'kreativ', 'geduldig', 'ehrlich', 'witzig'], saetze: ['Sie hat immer neue Ideen: Sie ist [kreativ].', 'Er bringt alle zum Lachen: Er ist [witzig].', 'Sie sagt die Wahrheit, auch wenn es schwer ist: Sie ist [ehrlich].', 'Er hilft, ohne dass man fragt: Er ist [hilfsbereit].', 'Sie erklärt etwas auch zum dritten Mal: Sie ist [geduldig].', 'Er spricht vor der ganzen Klasse, obwohl er Angst hat: Er ist [mutig].'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      titel: 'Viele Arten, klug zu sein',
      absaetze: [
        'Viele denken: Klug ist, wer gute Noten in Mathe und Sprachen hat. Doch Menschen können auf **ganz verschiedene Arten** begabt sein.',
        'Manche sind stark mit **Wörtern**: Sie erzählen spannend oder schreiben gute Texte. Andere sind stark mit **Zahlen und Logik**. Manche haben ein gutes Gefühl für **Musik** oder für **Bewegung** – sie tanzen, spielen Fußball oder bauen mit den Händen. Andere sind stark mit **Menschen**: Sie spüren, wie es anderen geht, und können Streit schlichten. Und manche kennen sich **selbst** sehr gut und wissen, was ihnen guttut.',
        '### Warum Stärken wichtig sind',
        'Wer seine Stärken kennt, traut sich mehr zu. Das nennt man **Selbstwert**. Wichtig ist: Stärken sind kein Wettbewerb. Wenn deine Freundin gut zeichnen kann, wirst du dadurch nicht schlechter. Eine Klasse ist wie ein Team: Erst alle Stärken zusammen machen es stark.',
      ],
      woerter: [['die Stärke', 'le point fort'], ['das Talent', 'le talent'], ['begabt', 'doué'], ['der Selbstwert', 'l’estime de soi'], ['sich etwas zutrauen', 'avoir confiance en soi'], ['der Wettbewerb', 'la compétition'], ['Streit schlichten', 'apaiser une dispute']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Stärke passt? Verbinde.', stufe: 1, links: ['Lina schreibt spannende Geschichten.', 'Tom repariert Fahrräder.', 'Amira merkt sofort, wenn jemand traurig ist.', 'Yusuf löst jedes Rätsel.', 'Sami spielt drei Instrumente.'], rechts: ['stark mit Wörtern', 'stark mit Händen und Bewegung', 'stark mit Menschen', 'stark mit Zahlen und Logik', 'stark mit Musik'] },
        { art: 'fragen', auftrag: 'Warum sind Stärken „kein Wettbewerb“? Erkläre mit eigenen Worten.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wenn jemand anderes etwas gut kann, bin ich nicht schlechter; in einer Gruppe ergänzen sich verschiedene Stärken.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 7P2 · Freitag', titel: 'Der heiße Stuhl',
      situation: 'Die Klasse macht ein Spiel: Eine Person sitzt auf dem „heißen Stuhl“, die anderen sagen, was sie an ihr schätzen. Heute ist Nele dran.',
      bild: ['nele:verlegen:rollstuhl', 'lehrerin:froh:stehen'], sprecher: { 'Frau Kremer': 'w1', Tom: 'm3', Amira: 'w2', Nele: 'w3' },
      text: [
        ['Frau Kremer', 'Nele sitzt heute auf dem heißen Stuhl. Die Regel: Wir sagen nur ehrliche, freundliche Dinge. Wer fängt an?'],
        ['Tom', 'Nele, du organisierst immer alles. Ohne dich hätten wir den Kuchenverkauf nie geschafft.'],
        ['Amira', 'Und du merkst, wenn es jemandem nicht gut geht. Als ich neu war, hast du dich als Erste neben mich gesetzt.'],
        ['Nele', 'Oh … das wusste ich gar nicht mehr.'],
        ['Frau Kremer', 'Wie fühlst du dich, Nele?'],
        ['Nele', 'Komisch. Aber gut komisch. Ich bin rot geworden, oder?'],
        ['Tom', 'Ein bisschen. Darf ich nächste Woche auf den Stuhl?'],
        ['Frau Kremer', 'Natürlich. Jede und jeder kommt dran – aber nur, wer möchte.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie fühlt es sich an, wenn jemand sagt, was er an dir mag? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['schön', 'peinlich', 'komisch', 'stolz machend'], r: [] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was schätzen die anderen an Nele?', stufe: 1, kopf: ['Wer?', 'Was sagt sie / er?'], breiten: [24, 76], zeilen: [['Tom', '[Nele organisiert alles, z. B. den Kuchenverkauf.]'], ['Amira', '[Nele merkt, wenn es jemandem schlecht geht; sie hat sich zu Amira gesetzt, als sie neu war.]']] },
        { art: 'fragen', auftrag: 'Was ist die wichtigste Regel beim „heißen Stuhl“?', stufe: 2, fragen: [{ f: '', l: 'Nur ehrliche, freundliche Dinge sagen – und nur, wer möchte, sitzt auf dem Stuhl.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wollt ihr den „heißen Stuhl“ ausprobieren? Nur wer möchte, setzt sich. Benutzt die Satzanfänge.', stufe: 3, karten: [
        { titel: 'Freundlich sagen', text: ['Ich schätze an dir, dass …', 'Ich finde gut, wie du …', 'Danke, dass du einmal …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Stärken entdecken', punkte: ['Was mache ich **gern**?', 'Was fällt mir **leicht**?', 'Wofür **loben** mich andere?'] },
         { titel: 'Gutes sagen – richtig', punkte: ['**ehrlich** sein, nicht übertreiben', '**konkret**: „Du hast mir gestern geholfen.“', 'ein Kompliment **annehmen**: „Danke!“'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Stärken-Karten: Schreibe für drei Personen aus deiner Klasse eine ehrliche, freundliche Stärke auf. Schneide aus und verschenke die Karten.', stufe: 2, neueSeite: true, titel: 'Deine Stärke', icon: 'star', farbe: STAERKE, spalten: 2,
        karten: [
          { text: 'Liebe / Lieber …\nIch finde, du bist … , weil …', linien: 3, frage: 'von: …' },
          { text: 'Liebe / Lieber …\nIch finde, du bist … , weil …', linien: 3, frage: 'von: …' },
          { text: 'Liebe / Lieber …\nIch finde, du bist … , weil …', linien: 3, frage: 'von: …' },
          { text: 'Liebe / Lieber …\nIch schätze an dir, dass …', linien: 3, frage: 'von: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe über drei Stärken, die du an dir magst – oder an einer ausgedachten Person. Gib zu jeder Stärke ein Beispiel.', stufe: 2,
        zeilenAnfaenge: ['Stärke 1: … Beispiel: …', '', 'Stärke 2: … Beispiel: …', '', 'Stärke 3: … Beispiel: …', ''], zeilen: 7,
        beispiel: 'Stärke 1: Ich bin geduldig. Beispiel: Ich erkläre meinem Nachbarn die Hausaufgaben, auch zweimal. Stärke 2: Ich bin kreativ. Beispiel: Ich habe das Plakat für das Schulfest gemalt. Stärke 3: Ich bin zuverlässig. Beispiel: Ich komme immer pünktlich zum Training.' },
    ],
    check: ['Ich nenne verschiedene Arten von Stärken.', 'Ich sage anderen ehrlich und konkret, was ich an ihnen schätze.', 'Ich nehme ein Kompliment an.'],
  },
  // ================================================================ 6
  {
    thema: 'Freundschaft · Werte', titel: 'Was ist ein guter Freund?', untertitel: 'Vertrauen, Spaß, Ehrlichkeit: Du liest Meinungen über Freundschaft, hörst ein Gespräch über ein Geheimnis und ordnest Wertekarten.',
    ziel: { de: 'Ich nenne, was mir in einer Freundschaft wichtig ist, und begründe es.', fr: 'Je dis ce qui est important pour moi dans une amitié et je le justifie.' },
    bild: ['lina:froh:stehen', 'mia:froh:stehen'],
    start: {
      was: 'Freundschaft ist …',
      aufgaben: [
        { art: 'fragen', auftrag: 'Vervollständige den Satz – so, wie du es denkst.', stufe: 1, fragen: [{ f: 'Ein guter Freund / eine gute Freundin ist jemand, der …', zeilen: 2, l: 'z. B. … zu mir hält, auch wenn ich Fehler mache.' }] },
      ],
    },
    lesen: {
      was: 'Ein Forum', art: 'chat', stimme: 'w1', ich: 'Lina',
      quelle: 'Jugendforum „Frag mal“ (Namen ausgedacht)', titel: 'Woran erkennt man echte Freunde?',
      stimmen: { 'Lina_13': 'w3', 'Ben.B': 'm3', 'sunny.mia': 'w2', 'Lio_ball': 'm1' },
      nachrichten: [
        ['Lina_13', 'Meine beste Freundin hat jetzt eine neue Clique und meldet sich kaum noch. Woran erkennt man echte Freunde?', 'l'],
        ['Ben.B', 'Echte Freunde reden nicht schlecht über dich, wenn du nicht da bist. Das ist für mich das Wichtigste.', 'r'],
        ['sunny.mia', 'Bei mir: Man kann zusammen lachen UND zusammen schweigen, ohne dass es komisch ist.', 'r'],
        ['Lio_ball', 'Ein Freund sagt dir auch mal die Wahrheit, wenn sie unangenehm ist. Aber freundlich.', 'r'],
        ['sunny.mia', 'Und Lina: Freundschaften verändern sich manchmal. Das tut weh. Sprich deine Freundin doch direkt an?', 'r'],
        ['Lina_13', 'Danke euch. Ich schreibe ihr heute Abend. ❤️', 'l'],
      ],
      woerter: [['die Freundschaft', 'l’amitié'], ['die Clique', 'la bande'], ['das Vertrauen', 'la confiance'], ['schweigen', 'se taire'], ['unangenehm', 'désagréable'], ['ansprechen', 'aborder, parler à']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was ist wem wichtig? Ergänze.', stufe: 1, kopf: ['Wer?', 'Das ist wichtig bei echten Freunden'], breiten: [24, 76], zeilen: [['Ben.B', '[nicht schlecht über einen reden, wenn man nicht da ist]'], ['sunny.mia', '[zusammen lachen und zusammen schweigen können]'], ['Lio_ball', '[auch unangenehme Wahrheiten sagen – aber freundlich]']] },
        { art: 'mc', auftrag: 'Welchen Rat bekommt Lina? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['ihre Freundin direkt ansprechen', 'eine neue Clique suchen', 'die Freundin blockieren'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach der Schule · an der Bushaltestelle', titel: 'Das Geheimnis',
      situation: 'Mia hat Lina ein Geheimnis erzählt. Jetzt weiß es die halbe Klasse.',
      bild: ['mia:wuetend:stehen', 'lina:verlegen:stehen'], sprecher: { Mia: 'w2', Lina: 'w3' },
      text: [
        ['Mia', 'Lina, warum wissen alle, dass ich in Noah verliebt bin? Das habe ich nur dir erzählt!'],
        ['Lina', 'Ich … Ich habe es nur Jana gesagt. Ich dachte, sie erzählt es nicht weiter.'],
        ['Mia', 'Das war mein Geheimnis! Ich schäme mich so. Noah hat heute so komisch geschaut.'],
        ['Lina', 'Es tut mir wirklich leid, Mia. Das war dumm von mir. Ich habe nicht nachgedacht.'],
        ['Mia', 'Ich weiß nicht, ob ich dir noch etwas erzählen kann.'],
        ['Lina', 'Das verstehe ich. Kann ich etwas tun, damit es besser wird?'],
        ['Mia', 'Vielleicht … Sag Jana, sie soll damit aufhören. Und gib mir ein bisschen Zeit.'],
        ['Lina', 'Mach ich. Sofort. Und ich verspreche: Deine Geheimnisse bleiben ab jetzt bei mir.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Vertrauensbruch? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Jemand verrät, was man ihm im Vertrauen gesagt hat.', 'Jemand vergisst einen Termin.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lina hat Mias Geheimnis Jana erzählt.', true], ['Lina sagt, es sei nicht so schlimm.', false], ['Lina entschuldigt sich.', true], ['Mia will sofort alles vergessen.', false]] },
        { art: 'fragen', auftrag: 'Was macht Lina richtig, nachdem sie den Fehler gemacht hat?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Sie gibt den Fehler zu, entschuldigt sich ehrlich, fragt, was sie tun kann, und verspricht etwas.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie geht es weiter? Spielt eine Szene eine Woche später.', stufe: 3, karten: [
        { titel: 'Sich entschuldigen', text: ['Es tut mir leid, dass …', 'Das war falsch, weil …', 'Was kann ich tun?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Werte in der Freundschaft', punkte: ['**Vertrauen**: Geheimnisse bleiben geheim.', '**Ehrlichkeit**: die Wahrheit sagen – freundlich.', '**Treue**: zueinander halten.', '**Respekt**: den anderen so lassen, wie er ist.'] },
         { titel: 'Sich richtig entschuldigen', nummern: true, punkte: ['Den Fehler **zugeben**.', 'Sagen, **was** falsch war.', 'Fragen: **Was kann ich tun?**', 'Es **besser machen**.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Wertekarten: Schneidet die Karten aus. Legt zu zweit die vier wichtigsten Werte für eine Freundschaft nach oben. Begründet eure Reihenfolge.', stufe: 2, neueSeite: true, titel: 'Wert', icon: 'diamond', farbe: FRAGE, spalten: 3,
        karten: [
          { text: '**Vertrauen**', frage: 'Ich kann dir alles erzählen.' }, { text: '**Ehrlichkeit**', frage: 'Du sagst mir die Wahrheit.' }, { text: '**Spaß**', frage: 'Mit dir lache ich am meisten.' },
          { text: '**Treue**', frage: 'Du hältst zu mir.' }, { text: '**Hilfe**', frage: 'Du bist da, wenn ich dich brauche.' }, { text: '**Respekt**', frage: 'Du nimmst mich, wie ich bin.' },
          { text: '**Gemeinsame Hobbys**', frage: 'Wir machen dasselbe gern.' }, { text: '**Zeit**', frage: 'Wir sehen uns oft.' }, { text: '**Verzeihen**', frage: 'Nach Streit vertragen wir uns.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Antworte Lina im Forum: Was ist für dich eine echte Freundschaft? Was rätst du ihr?', stufe: 2,
        anfaenge: ['Hallo Lina,', 'Für mich ist ein echter Freund jemand, der …', 'Am wichtigsten finde ich …, weil …', 'Ich rate dir, …'], zeilen: 8,
        beispiel: 'Hallo Lina, für mich ist ein echter Freund jemand, der auch in schlechten Zeiten da ist. Am wichtigsten finde ich Vertrauen, weil man sonst nichts Persönliches erzählen kann. Ich rate dir, deiner Freundin zu schreiben, dass du sie vermisst. Vielleicht weiß sie gar nicht, wie du dich fühlst.' },
    ],
    check: ['Ich nenne Werte, die in einer Freundschaft wichtig sind.', 'Ich begründe, welche Werte mir am wichtigsten sind.', 'Ich weiß, wie man sich richtig entschuldigt.'],
  },
  // ================================================================ 7
  {
    thema: 'Streit · Konflikte lösen · Ich-Botschaften', titel: 'Streit gehört dazu', untertitel: 'Streit ist normal – wichtig ist, wie man ihn löst: Du lernst Ich-Botschaften, hörst eine Streitschlichtung und entscheidest Dilemmas.',
    ziel: { de: 'Ich löse einen Streit mit Ich-Botschaften und suche eine Lösung, mit der beide leben können.', fr: 'Je règle une dispute avec des messages « je » et je cherche une solution pour les deux.' },
    bild: ['noah:wuetend:stehen', 'finn:wuetend:verschraenkt'],
    start: {
      was: 'Streit',
      aufgaben: [
        { art: 'mc', auftrag: 'Worüber streiten Jugendliche oft? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['über Geheimnisse', 'über das Handy oder Chats', 'über Sport und Spiele', 'über Eifersucht', 'über Gerüchte'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Ratgeber', art: 'anleitung', stimme: 'w1',
      quelle: 'Ratgeber der Streitschlichter-AG', titel: 'In fünf Schritten zur Lösung',
      material: ['zwei Personen, die sich streiten', 'eine ruhige Person, die schlichtet', 'Zeit und einen ruhigen Ort'],
      schritte: [
        { icon: 'hand-stop', text: '**Abkühlen.** Wer sehr wütend ist, macht zuerst eine Pause. Niemand redet im Zorn.' },
        { icon: 'ear', text: '**Erzählen und zuhören.** Jede Seite erzählt, was passiert ist. Die andere hört zu und unterbricht nicht.' },
        { icon: 'message-heart', text: '**Gefühle sagen – mit Ich-Botschaften.** Nicht: „Du bist so gemein!“ Sondern: „**Ich** bin traurig, **weil** du mich nicht mitspielen lässt.“' },
        { icon: 'bulb', text: '**Lösungen sammeln.** Beide schlagen Lösungen vor. Alle Ideen sind erlaubt.' },
        { icon: 'heart-handshake', text: '**Einigen.** Beide wählen eine Lösung, mit der **beide** leben können – und halten sich daran.' },
      ],
      danach: ['Ich-Botschaften wirken, weil sie den anderen nicht angreifen. Wer sich angegriffen fühlt, verteidigt sich – und der Streit wird größer.'],
      woerter: [['der Streit', 'la dispute'], ['schlichten', 'servir de médiateur'], ['abkühlen', 'se calmer'], ['unterbrechen', 'interrompre'], ['die Ich-Botschaft', 'le message « je »'], ['sich einigen', 'se mettre d’accord'], ['angreifen', 'attaquer']],
      aufgaben: [
        { art: 'abschreiben', auftrag: 'Mach aus der Du-Botschaft eine Ich-Botschaft.', stufe: 2, kopf: ['Du-Botschaft', 'Ich-Botschaft'], saetze: [['Du nimmst immer meine Sachen!', 'Ich ärgere mich, wenn du meine Sachen ohne zu fragen nimmst.'], ['Du hörst mir nie zu!', 'Ich bin traurig, weil ich das Gefühl habe, dass du mir nicht zuhörst.'], ['Du bist so peinlich!', 'Ich schäme mich, wenn du vor allen über mich lachst.']] },
      ],
    },
    hoeren: {
      was: 'Eine Streitschlichtung', wo: 'Raum der Streitschlichter · große Pause', titel: 'Der Ball',
      situation: 'Noah und Finn haben sich auf dem Fußballplatz gestritten. Amira ist Streitschlichterin.',
      bild: ['amira:ruhig:blatt', 'noah:wuetend:stehen'], sprecher: { Amira: 'w2', Noah: 'm3', Finn: 'm2' },
      text: [
        ['Amira', 'Okay. Jeder erzählt, was passiert ist. Der andere hört zu. Noah, du zuerst.'],
        ['Noah', 'Wir spielen jeden Tag Fußball. Heute hat Finn den Ball genommen und gesagt, ich darf nicht mitspielen.'],
        ['Amira', 'Danke. Finn, wie hast du es erlebt?'],
        ['Finn', 'Noah foult immer! Gestern hat er mich so getreten, dass ich geblutet habe. Darum wollte ich nicht mit ihm spielen.'],
        ['Amira', 'Wie fühlt ihr euch? Mit Ich-Botschaften, bitte.'],
        ['Noah', 'Ich bin traurig, weil ich ausgeschlossen wurde. Und … ich wusste nicht, dass ich dich verletzt habe.'],
        ['Finn', 'Ich habe Angst, wenn du so hart spielst. Ich will einfach Spaß haben.'],
        ['Amira', 'Welche Lösung könnt ihr euch vorstellen?'],
        ['Noah', 'Ich spiele fairer. Und wenn ich jemanden umrenne, entschuldige ich mich.'],
        ['Finn', 'Dann darfst du mitspielen. Und wir machen eine Regel: Wer hart foult, setzt fünf Minuten aus.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Streitschlichterin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie hilft beiden, eine Lösung zu finden.', 'Sie entscheidet, wer schuld ist.', 'Sie bestraft die Streitenden.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze.', stufe: 1, kopf: ['', 'Noah', 'Finn'], breiten: [26, 37, 37], zeilen: [['Was ist passiert?', '[durfte nicht mitspielen]', '[wurde gestern hart gefoult, hat geblutet]'], ['Ich-Botschaft', '[Ich bin traurig, weil ich ausgeschlossen wurde.]', '[Ich habe Angst, wenn du so hart spielst.]'], ['Lösung', '[fairer spielen, sich entschuldigen]', '[Noah darf mitspielen; Regel: hartes Foul = 5 Minuten aussetzen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt zu dritt eine Streitschlichtung: zwei Streitende, eine Person schlichtet. Wählt einen Streit von den Dilemmakarten.', stufe: 3, karten: [
        { titel: 'Schlichter:in', text: ['Erzähl, was passiert ist.', 'Wie fühlst du dich?', 'Welche Lösung schlägst du vor?', 'Könnt ihr beide damit leben?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ich-Botschaft', punkte: ['**Ich** fühle mich … (Gefühl)', '**wenn / weil** du … (was passiert ist)', '**Ich wünsche mir**, dass … (Bitte)'] },
         { titel: 'Gewinner-Gewinner-Lösung', punkte: ['Nicht: Einer gewinnt, einer verliert.', 'Sondern: **Beide** können mit der Lösung leben.', 'Die Lösung wird **eingehalten**.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Dilemmakarten: Schneidet die Karten aus. Zieht eine Karte, überlegt zu zweit: Was würdet ihr tun? Gibt es eine Lösung, die für alle gut ist?', stufe: 3, neueSeite: true, titel: 'Was tun?', icon: 'arrows-split-2', farbe: DILEMMA, spalten: 2,
        karten: [
          { text: 'Deine beste Freundin hat sich ein neues T-Shirt gekauft und fragt: „Wie findest du es?“ Du findest es hässlich.' },
          { text: 'Zwei Freunde von dir streiten sich. Beide wollen, dass du auf ihrer Seite bist.' },
          { text: 'Ein Freund schreibt bei einem Test von dir ab. Die Lehrerin fragt dich: „Hat er abgeschrieben?“' },
          { text: 'In der Klassengruppe macht sich jemand über einen Mitschüler lustig. Alle schicken lachende Smileys.' },
          { text: 'Du hast deinem Freund versprochen, mit ihm ins Kino zu gehen. Dann lädt dich jemand zu einer coolen Party ein.' },
          { text: 'Deine Freundin erzählt dir, dass es ihr seit Wochen sehr schlecht geht. Sie sagt: „Erzähl es niemandem!“' },
        ] },
      { art: 'dilemma', auftrag: 'Nimm die letzte Dilemmakarte. Denk gründlich nach.', stufe: 3,
        geschichte: 'Deine Freundin erzählt dir, dass es ihr seit Wochen sehr schlecht geht. Sie schläft kaum und will nicht mehr zur Schule. Sie sagt: „Erzähl es niemandem!“',
        frage: 'Was solltest du tun?', optionen: ['Das Geheimnis bewahren.', 'Mit einer erwachsenen Vertrauensperson sprechen.'],
        hinweis: 'Wichtig: Wenn jemand in Gefahr ist oder es ihm lange sehr schlecht geht, darf und soll man Hilfe holen – das ist kein Verrat, sondern Freundschaft. Man kann der Freundin vorher sagen, dass man es tun will, und sie begleiten. Hilfe: 116 111 (kostenlos, anonym).' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erinnere dich an einen Streit (deinen oder einen ausgedachten). Schreibe auf, wie er mit den fünf Schritten hätte gelöst werden können.', stufe: 2,
        anfaenge: ['Der Streit: …', 'Ich-Botschaft von A: …', 'Ich-Botschaft von B: …', 'Mögliche Lösungen: …', 'Die Lösung für beide: …'], zeilen: 9,
        beispiel: 'Der Streit: Zwei Freundinnen wollen am Nachmittag Verschiedenes machen. Ich-Botschaft von A: Ich bin enttäuscht, weil wir immer machen, was du willst. Ich-Botschaft von B: Ich fühle mich unter Druck, wenn du sofort sauer wirst. Mögliche Lösungen: abwechseln, etwas Drittes, Münze werfen. Die Lösung für beide: Diese Woche Kino, nächste Woche Schwimmbad.' },
    ],
    check: ['Ich formuliere Ich-Botschaften.', 'Ich kenne die fünf Schritte der Streitschlichtung.', 'Ich weiß: Hilfe holen ist kein Verrat, wenn jemand in Gefahr ist.'],
  },
  // ================================================================ 8
  {
    thema: 'Allein sein · einsam sein · Zugehörigkeit', titel: 'Allein oder einsam?', untertitel: 'Allein sein kann schön sein, einsam sein tut weh: Du liest ein Gedicht, hörst ein Radiogespräch und überlegst, wie man niemanden ausschließt.',
    ziel: { de: 'Ich unterscheide „allein sein“ und „einsam sein“ und nenne, was gegen Einsamkeit hilft.', fr: 'Je distingue « être seul » et « se sentir seul » et je dis ce qui aide contre la solitude.' },
    bild: ['lio:ruhig:sitzen', 'jana:froh:stehen'],
    start: {
      was: 'Allein',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wann ist allein sein schön, wann nicht? Kreuze an. (Es gibt kein Richtig oder Falsch.)', stufe: 1, kopf: ['', 'schön', 'nicht schön'], breiten: [60, 20, 20], zeilen: [['allein Musik hören', '', ''], ['allein in der Pause stehen', '', ''], ['allein ein Buch lesen', '', ''], ['allein am Geburtstag', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Gedicht', art: 'gedicht', stimme: 'w2',
      quelle: 'Gedicht einer Schülerin aus der Schreibwerkstatt (ausgedacht)', autor: 'Jana, 13', titel: 'Mitten drin',
      strophen: [
        ['In der Pause, laut und voll,', 'alle lachen, alles toll.', 'Ich steh mitten in dem Kreis –', 'und bin doch allein, wer weiß?'],
        ['Am Abend, still in meinem Zimmer,', 'leises Licht, ein warmer Schimmer.', 'Ganz allein mit meinem Lied –', 'und nicht einsam. Was ein Unterschied!'],
        ['Einsam ist man nicht vom Zählen,', 'nicht von Menschen, die nicht fehlen.', 'Einsam ist: Wenn keiner fragt.', 'Darum frag ich. Jeden Tag.'],
      ],
      woerter: [['allein', 'seul'], ['einsam', 'qui se sent seul, solitaire'], ['die Einsamkeit', 'la solitude'], ['der Unterschied', 'la différence'], ['dazugehören', 'faire partie'], ['ausschließen', 'exclure']],
      aufgaben: [
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 1, fragen: [{ f: 'Wo fühlt sich Jana in Strophe 1 allein?', o: ['in der lauten Pause, mitten unter vielen', 'abends in ihrem Zimmer'], r: 0 }, { f: 'Wie fühlt sie sich abends allein in ihrem Zimmer?', o: ['einsam', 'nicht einsam'], r: 1 }] },
        { art: 'fragen', auftrag: 'Was meint Jana mit „Einsam ist: Wenn keiner fragt. Darum frag ich. Jeden Tag.“?', stufe: 2, fragen: [{ f: '', zeilen: 3, l: 'Einsamkeit kommt nicht davon, wie viele Menschen da sind, sondern ob sich jemand für einen interessiert. Deshalb fragt Jana andere, wie es ihnen geht.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Radiogespräch', wo: 'Jugendradio · Sendung „Echt jetzt?“', titel: 'Einsam unter vielen',
      situation: 'Im Jugendradio spricht der Moderator Becker mit Lio und mit einer Psychologin über Einsamkeit.',
      bild: ['lio:ruhig:rollstuhl', 'aerztin:froh:erklaeren'], sprecher: { Becker: 'm1', Lio: 'm3', Psychologin: 'w1' },
      text: [
        ['Becker', 'Heute geht es um Einsamkeit. Lio, du hast uns geschrieben. Warum?'],
        ['Lio', 'Letztes Jahr bin ich umgezogen. In der neuen Klasse waren alle schon in Gruppen. Ich habe niemanden gekannt. In den Pausen habe ich so getan, als ob ich auf dem Handy etwas Wichtiges mache.'],
        ['Becker', 'Frau Doktor, ist das häufig?'],
        ['Psychologin', 'Sehr häufig. Viele Jugendliche fühlen sich manchmal einsam – auch solche mit vielen Followern. Einsamkeit ist ein Gefühl, kein Fehler. Man sollte sich nicht dafür schämen.'],
        ['Becker', 'Was hat dir geholfen, Lio?'],
        ['Lio', 'Ein Junge hat mich gefragt, ob ich beim Basketball mitmache. Nur eine Frage! Heute ist er mein bester Freund.'],
        ['Psychologin', 'Das zeigt: Manchmal reicht eine kleine Geste. Und wer sich lange einsam fühlt, sollte mit jemandem reden – mit Freunden, einer Lehrkraft oder bei einem Sorgentelefon.'],
        ['Becker', 'Die Nummer für Kinder und Jugendliche in Luxemburg ist 116 111. Kostenlos und anonym.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wer kann sich einsam fühlen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Jugendliche', 'Erwachsene', 'Menschen mit vielen Freunden', 'ältere Menschen'], r: [0, 1, 2, 3] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lio war neu in der Klasse.', true], ['In der Pause hat Lio viel mit anderen geredet.', false], ['Wer viele Follower hat, fühlt sich nie einsam.', false], ['Eine einzige Frage hat Lio geholfen.', true]] },
        { art: 'fragen', auftrag: 'Was rät die Psychologin, wenn man sich lange einsam fühlt?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'mit jemandem reden: mit Freunden, einer Lehrkraft oder bei einem Sorgentelefon (116 111)' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was kann eine Klasse tun, damit niemand allein in der Pause steht? Sammelt Ideen und wählt die besten drei.', stufe: 2, karten: [
        { titel: 'Ideen-Starter', text: ['Wir könnten …', 'Neue Schüler könnten …', 'Wenn jemand allein steht, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Allein oder einsam?', punkte: ['**allein**: niemand ist da – das kann schön sein.', '**einsam**: Man fühlt sich nicht verbunden – das tut weh.', 'Man kann **mitten unter vielen** einsam sein.'] },
         { titel: 'Was hilft?', punkte: ['eine **kleine Geste**: fragen, einladen, lächeln', '**reden**: mit Freunden, Lehrkraft, Schulpsychologin', 'Hilfe: **116 111** (kostenlos, anonym)'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Einladungs-Karten: Ein Satz kann viel ändern. Schneidet die Karten aus. Übt die Sätze in Rollenspielen.', stufe: 2, titel: 'Ein Satz, der hilft', icon: 'hand-click', farbe: FRAGE, spalten: 3,
        karten: [
          { text: 'Willst du mitspielen?' }, { text: 'Setz dich doch zu uns!' }, { text: 'Wie geht’s dir – wirklich?' },
          { text: 'Du bist neu, oder? Ich zeig dir die Schule.' }, { text: 'Kommst du mit in die Pause?' }, { text: 'Ich hab gesehen, du magst auch … Erzähl mal!' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Wer sich einsam fühlt, ist selbst schuld.', 'Soziale Netzwerke machen weniger einsam.'], hinweis: 'Beim ersten Satz: Einsamkeit ist ein Gefühl und keine Schuld. Beim zweiten Satz: Es gibt gute Argumente für beide Seiten (Kontakte halten – aber Vergleichen und echte Treffen fehlen).' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein eigenes kleines Gedicht oder einen kurzen Text: „Allein“ oder „Dazugehören“.', stufe: 2,
        anfaenge: ['Allein ist …', 'Einsam ist …', 'Dazugehören heißt …', 'Ich wünsche mir …'], zeilen: 9,
        beispiel: 'Allein ist, wenn ich Musik höre und die Welt draußen bleibt. Einsam ist, wenn alle lachen und keiner merkt, dass ich still bin. Dazugehören heißt, dass jemand meinen Namen ruft. Ich wünsche mir eine Klasse, in der niemand allein in der Pause steht.' },
    ],
    check: ['Ich erkläre den Unterschied zwischen allein und einsam.', 'Ich nenne kleine Gesten gegen Einsamkeit.', 'Ich weiß, wo man Hilfe bekommt (116 111).'],
  },
]
