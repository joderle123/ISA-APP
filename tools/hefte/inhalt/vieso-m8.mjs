// Vie et société · Modul 8 (5P) „Mut statt Gewalt“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 9. Klasse:
// Themenfeld „Gewalt und Aggression“ (Ursachen und Formen von Gewalt; Der Gewalt begegnen – Gewaltverzicht) und
// „Leben in der globalisierten Gesellschaft“ (Politische und religiöse Diskriminierung und Verfolgung).
// Behutsam: keine Fragen nach eigenen Gewalterfahrungen oder der eigenen Familie; Hilfe 112 / 113 / 116 111 /
// BEE SECURE 8002 1234; Shoah sachlich und ohne Bilder; alle Personen außer historischen ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { eisberg, hassTreppe } from './sach-bilder.mjs'

export const MODUL = sachModul('vieso', 8, {
  titel: 'Mut statt Gewalt',
  titelFr: 'Le courage plutôt que la violence',
  unter: 'Was Gewalt ist und woher sie kommt, wie man Wut in den Griff bekommt, Zivilcourage, gewaltfreier Widerstand, Diskriminierung und Verfolgung – und was Religionen über Frieden sagen.',
  unterFr: 'Formes et causes de la violence, gérer sa colère, courage civique, non-violence, discrimination et persécution, paix.',
  farbe: '#b4432e',
  deckbild: ['finn:wuetend:stehen', 'jana:ruhig:stehen-zeigen', 'noah:froh:stehen'],
  blasen: [{ t: 'Stopp!', x: 10, y: 104 }, { t: 'Ich hole Hilfe.', x: 124, y: 92 }, { t: 'Frieden!', x: 170, y: 150 }],
  aussprache: { '\\b113\\b': 'eins eins drei', '\\bCET\\b': 'Ze E Te', 'Ahimsa': 'Ahimmsa', 'Schalom': 'Schalomm', 'Am 1\\. Dezember': 'Am ersten Dezember' },
  themen: [
    { titel: { de: 'Gewalt verstehen', fr: 'Comprendre la violence' }, icon: 'bolt', lektionen: 3 },
    { titel: { de: 'Gewalt begegnen', fr: 'Faire face' }, icon: 'shield-check', lektionen: 2 },
    { titel: { de: 'Ausgrenzung und Frieden', fr: 'Exclusion et paix' }, icon: 'peace', lektionen: 3 },
  ],
})

const FRAGE = '#b4432e', DILEMMA = '#6d4bc4', MUT = '#d0577b', IDEE = '#2f8a6b', RUHE = '#1f6aa0'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Formen von Gewalt', titel: 'Was ist Gewalt?', untertitel: 'Schlagen ist Gewalt – und Auslachen? Gerüchte? Ein Foto ohne Erlaubnis? Du lernst verschiedene Formen von Gewalt kennen und baust mit der Klasse ein Gewalt-Barometer.',
    ziel: { de: 'Ich erkenne verschiedene Formen von Gewalt und weiß, wo ich Hilfe bekomme.', fr: 'Je reconnais différentes formes de violence et je sais où trouver de l’aide.' },
    bild: ['jana:besorgt:stehen', 'noah:verwirrt:stehen'],
    start: {
      was: 'Ist das Gewalt?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ist das Gewalt? Kreuze an, was du denkst. Vergleicht danach.', stufe: 1, kopf: ['', 'ja', 'nein', 'weiß nicht'], breiten: [58, 14, 14, 14], zeilen: [['jemanden schlagen', '[x]', '', ''], ['jemanden jeden Tag auslachen', '[x]', '', ''], ['ein Gerücht über jemanden verbreiten', '[x]', '', ''], ['sich einmal laut streiten', '', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Gewalt hat viele Gesichter',
      absaetze: [
        'Von **Gewalt** spricht man, wenn jemand einem anderen Menschen **absichtlich schadet** – an Körper, Seele oder Eigentum. Gewalt hat viele Formen.',
        '### Körperliche Gewalt',
        'Schlagen, treten, schubsen, festhalten, mit einer Waffe bedrohen. Körperliche Gewalt sieht man oft, zum Beispiel an blauen Flecken.',
        '### Seelische Gewalt',
        'Auslachen, beleidigen, drohen, erpressen, ausschließen, Gerüchte verbreiten. Diese Gewalt sieht man nicht – aber sie kann genauso wehtun und lange Spuren hinterlassen.',
        '### Digitale Gewalt',
        'Gemeine Nachrichten, peinliche Fotos oder Videos teilen, jemanden aus dem Chat werfen, ein falsches Profil anlegen. Das Internet vergisst nicht, und die Gewalt geht bis ins Kinderzimmer.',
        '### Gewalt gegen Sachen',
        'Etwas absichtlich kaputt machen, zum Beispiel ein Fahrrad oder eine Bushaltestelle.',
        '### Wichtig',
        'Gewalt ist **nie in Ordnung** – egal wo, auch nicht zu Hause. Wer Gewalt erlebt, ist **nicht schuld**. Hilfe gibt es bei Vertrauenspersonen, beim SePAS, beim Kinder- und Jugendtelefon **116 111**, bei der **BEE SECURE Helpline 8002 1234** und im Notfall bei der **Polizei: 113**.',
      ],
      woerter: [['die Gewalt', 'la violence'], ['absichtlich', 'exprès'], ['schaden', 'nuire'], ['treten', 'donner un coup de pied'], ['erpressen', 'faire du chantage'], ['das Gerücht', 'la rumeur'], ['die Seele', 'l’âme, le psychisme'], ['das Eigentum', 'la propriété']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Form von Gewalt ist das? Kreuze an.', stufe: 2, kopf: ['', 'körperlich', 'seelisch', 'digital', 'gegen Sachen'], breiten: [44, 14, 14, 14, 14], zeilen: [['Jemand wird geschubst.', '[x]', '', '', ''], ['Jemand wird erpresst: „Gib mir dein Geld, sonst …“', '', '[x]', '', ''], ['Ein peinliches Video wird im Chat geteilt.', '', '', '[x]', ''], ['Ein Fahrradreifen wird zerstochen.', '', '', '', '[x]'], ['Niemand darf mit einem Mädchen reden.', '', '[x]', '', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach der Schule', titel: 'Nur Spaß?',
      situation: 'Noah erzählt Jana, was in seiner Klasse los ist. Er ist sich nicht sicher, ob das „nur Spaß“ ist.',
      bild: ['noah:verwirrt:stehen', 'jana:ruhig:stehen'], sprecher: { Noah: 'm3', Jana: 'w2' },
      text: [
        ['Noah', 'In meiner Klasse gibt es so ein Spiel. Jeden Tag nehmen ein paar Jungs Kevins Mütze und werfen sie sich zu. Er rennt hinterher, alle lachen.'],
        ['Jana', 'Lacht Kevin auch?'],
        ['Noah', 'Am Anfang schon. Jetzt nicht mehr. Gestern hat er geweint. Die anderen sagen: „Ist doch nur Spaß.“'],
        ['Jana', 'Spaß ist es, wenn alle lachen können. Wenn einer weint, ist es kein Spaß mehr.'],
        ['Noah', 'Aber sie schlagen ihn ja nicht.'],
        ['Jana', 'Gewalt ist nicht nur schlagen. Wenn jemand jeden Tag gedemütigt wird, ist das seelische Gewalt.'],
        ['Noah', 'Hm. Was soll ich machen? Ich will nicht, dass sie dann auf mich losgehen.'],
        ['Jana', 'Du musst das nicht allein lösen. Rede mit eurer Klassenlehrerin. Und frag Kevin, ob er in der Pause mit dir abhängen will.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „jemanden demütigen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemanden vor anderen klein und lächerlich machen', 'jemanden loben'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Jungs nehmen jeden Tag Kevins Mütze.', true], ['Kevin lacht immer noch mit.', false], ['Jana sagt: Gewalt ist nur schlagen.', false], ['Jana rät Noah, mit der Klassenlehrerin zu reden.', true]] },
        { art: 'fragen', auftrag: 'Wann ist Spaß kein Spaß mehr? Was sagt Jana?', stufe: 2, fragen: [{ f: '', l: 'Wenn nicht alle lachen können – wenn einer weint.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo ist für euch die Grenze zwischen Spaß und Gewalt?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Spaß ist es, wenn …', 'Es wird Gewalt, wenn …', 'Ein Zeichen ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Formen von Gewalt', punkte: ['**körperlich**: schlagen, treten, schubsen', '**seelisch**: auslachen, drohen, ausschließen', '**digital**: Nachrichten, Fotos, Videos', '**gegen Sachen**: kaputt machen'] },
         { titel: 'Hilfe', punkte: ['Gewalt ist **nie in Ordnung**', 'wer Gewalt erlebt, ist **nicht schuld**', '**116 111** · **8002 1234** (BEE SECURE)', 'Notfall: **113** (Polizei), **112** (Rettung)'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gewalt-Barometer: Schneidet die Karten aus. Legt sie auf eine Linie von „keine Gewalt“ bis „schlimme Gewalt“. Diskutiert, wo ihr nicht einer Meinung seid.', stufe: 3, neueSeite: true, titel: 'Gewalt-Barometer', icon: 'gauge', farbe: FRAGE, spalten: 3,
        karten: [
          { text: 'jemanden einmal schubsen' }, { text: 'jemanden immer wieder auslachen' }, { text: 'ein Foto ohne Erlaubnis posten' },
          { text: 'jemandem drohen: „Wart nur bis nach der Schule!“' }, { text: 'das Handy von jemandem verstecken' }, { text: 'jemanden absichtlich nie mitspielen lassen' },
          { text: 'ein Gerücht verbreiten' }, { text: 'jemanden zusammenschlagen' }, { text: 'eine Bushaltestelle beschmieren' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Noah eine Nachricht: Was rätst du ihm wegen Kevin?', stufe: 2,
        anfaenge: ['Hey Noah,', 'ich finde, das ist kein Spaß mehr, weil …', 'Du könntest …', 'Und vergiss nicht: …'], zeilen: 7,
        beispiel: 'Hey Noah, ich finde, das ist kein Spaß mehr, weil Kevin weint und es jeden Tag passiert. Das ist seelische Gewalt. Du könntest mit eurer Klassenlehrerin reden, das ist kein Petzen. Und frag Kevin, ob er in der Pause mit dir abhängen will. Und vergiss nicht: Du musst das nicht allein lösen.' },
    ],
    check: ['Ich nenne vier Formen von Gewalt.', 'Ich erkenne, wann Spaß zu Gewalt wird.', 'Ich weiß, wo ich Hilfe bekomme.'],
  },
  // ================================================================ 2
  {
    thema: 'Ursachen von Gewalt · Aggression', titel: 'Woher kommt Gewalt?', untertitel: 'Niemand wird gewalttätig geboren. Du lernst den Unterschied zwischen Aggression und Gewalt, entdeckst den Wut-Eisberg und hörst Finn, der erklärt, warum er zugeschlagen hat.',
    ziel: { de: 'Ich nenne Ursachen von Gewalt und erkenne Gefühle, die hinter Wut stecken können.', fr: 'Je cite des causes de la violence et je reconnais les sentiments qui peuvent se cacher derrière la colère.' },
    bild: ['finn:wuetend:verschraenkt', 'lehrer:ruhig:erklaeren'],
    start: {
      was: 'Wut',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist richtig? Kreuze an.', stufe: 1, fragen: [{ f: 'Wut ist …', o: ['ein normales Gefühl, das jeder Mensch kennt', 'immer schlecht und verboten'], r: 0 }, { f: 'Gewalt ist …', o: ['eine Handlung, für die man sich entscheidet', 'ein Gefühl'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Aggression ist nicht gleich Gewalt',
      absaetze: [
        '**Aggression** ist ein starkes Gefühl, ein innerer Druck: Man ist wütend, will sich wehren oder angreifen. Das kennt jeder Mensch. Aggression kann sogar nützlich sein, zum Beispiel, wenn sie uns Kraft gibt, uns gegen Unrecht zu wehren.',
        '**Gewalt** dagegen ist eine **Handlung**: Jemand tut einem anderen absichtlich weh. Zwischen Gefühl und Handlung liegt ein kleiner Moment. In diesem Moment kann man **entscheiden**.',
        '### Woher kommt Gewalt?',
        'Es gibt nie nur einen Grund. Oft kommen mehrere zusammen: **Frust** und das Gefühl, ungerecht behandelt zu werden. **Angst** oder Unsicherheit. **Gruppendruck**: Man will dazugehören oder stark wirken. **Eigene Gewalterfahrungen**: Wer selbst Gewalt erlebt hat, gibt sie manchmal weiter. **Alkohol und Drogen**, die die Kontrolle schwächen.',
        '### Der Wut-Eisberg',
        'Wut ist oft nur die **Spitze eines Eisbergs**. Unter der Wasseroberfläche liegen andere Gefühle, die man nicht sieht: Angst, Scham, Trauer, Eifersucht, Hilflosigkeit. Wer versteht, was unter seiner Wut liegt, kann besser damit umgehen.',
      ],
      woerter: [['die Aggression', 'l’agressivité'], ['der Druck', 'la pression'], ['die Handlung', 'l’action'], ['der Frust', 'la frustration'], ['der Gruppendruck', 'la pression du groupe'], ['die Erfahrung', 'l’expérience'], ['die Scham', 'la honte'], ['die Hilflosigkeit', 'l’impuissance']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Ursache steckt dahinter? Verbinde.', stufe: 2, links: ['„Die anderen haben gesagt, ich bin ein Feigling, wenn ich nicht mitmache.“', '„Ich habe schon wieder eine schlechte Note, alles ist unfair.“', '„Ich hatte Angst, dass er mich zuerst schlägt.“', '„Ich hatte drei Bier getrunken.“'], rechts: ['Gruppendruck', 'Frust', 'Angst', 'Alkohol'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Gespräch mit dem Klassenlehrer', titel: 'Was hinter der Wut lag',
      situation: 'Finn hat in der Pause einen Mitschüler geschubst. Jetzt redet er mit seinem Klassenlehrer.',
      bild: ['finn:traurig:stehen', 'lehrer:ruhig:erklaeren'], sprecher: { Lehrer: 'm1', Finn: 'm3' },
      text: [
        ['Lehrer', 'Finn, du hast Luca so geschubst, dass er hingefallen ist. Was war los?'],
        ['Finn', 'Er hat mich provoziert! Er hat gesagt, ich bin zu dumm für Mathe.'],
        ['Lehrer', 'Das war gemein von ihm. Aber schubsen ist keine Lösung. Was hast du in dem Moment gefühlt – außer Wut?'],
        ['Finn', 'Keine Ahnung … Ich hatte gerade die Mathearbeit zurückbekommen. Wieder eine Fünf. Alle haben es gesehen.'],
        ['Lehrer', 'Und wie hat sich das angefühlt?'],
        ['Finn', 'Peinlich. Ich hatte so viel gelernt. Ich dachte, ich schaffe es nie.'],
        ['Lehrer', 'Dann war unter der Wut vielleicht Scham und Enttäuschung. Das ist verständlich. Die Frage ist: Was machst du nächstes Mal mit so einem Gefühl?'],
        ['Finn', 'Vielleicht … rausgehen, bevor ich explodiere. Und ich entschuldige mich bei Luca. Aber er soll sich auch entschuldigen.'],
        ['Lehrer', 'Einverstanden. Und für Mathe suchen wir dir einen Lern-Buddy.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „provozieren“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemanden absichtlich reizen, damit er wütend wird', 'jemandem helfen'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hat Luca zu Finn gesagt?', l: 'dass er zu dumm für Mathe ist' }, { f: 'Was war kurz vorher passiert?', l: 'Finn hatte wieder eine Fünf in der Mathearbeit bekommen; alle haben es gesehen.' }, { f: 'Welche Gefühle lagen unter Finns Wut?', l: 'Scham und Enttäuschung' }, { f: 'Was will Finn nächstes Mal tun?', zeilen: 2, l: 'rausgehen, bevor er explodiert; sich bei Luca entschuldigen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'War es fair, dass der Lehrer auch nach Finns Gefühlen gefragt hat? Oder hätte er ihn einfach bestrafen sollen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde es richtig, weil …', 'Aber Gewalt muss auch Folgen haben, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aggression und Gewalt', punkte: ['**Aggression**: ein Gefühl, kennt jeder', '**Gewalt**: eine Handlung', 'dazwischen: ein Moment zum **Entscheiden**'] },
         { titel: 'Ursachen', punkte: ['**Frust**, Ungerechtigkeit', '**Angst**, Unsicherheit', '**Gruppendruck**', '**eigene Gewalterfahrungen**', '**Alkohol** und **Drogen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Der Wut-Eisberg: Welche Gefühle können unter der Wut liegen? Schreibe sechs Gefühle auf die Linien.', stufe: 2, html: eisberg() },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Dein Freund wird im Bus von einem älteren Schüler beleidigt. Dein Freund ballt die Fäuste. Die anderen rufen: „Hau ihm eine rein!“'],
        frage: 'Was tust du?',
        optionen: ['Ich feuere meinen Freund an.', 'Ich ziehe meinen Freund weg: „Komm, der ist es nicht wert.“', 'Ich sage dem Busfahrer Bescheid.'],
        hinweis: 'B und C verhindern Gewalt und schützen deinen Freund – auch vor Ärger, den er selbst bekommen würde.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe über eine ausgedachte Person, die wütend wird. Was liegt unter ihrer Wut? Was könnte ihr helfen?', stufe: 3,
        anfaenge: ['… ist wütend, weil …', 'Unter der Wut liegt vielleicht …', 'Helfen könnte …'], zeilen: 7,
        beispiel: 'Sara ist wütend, weil ihre beste Freundin in der Pause nur noch mit den anderen redet. Sie knallt die Tür und schreit. Unter der Wut liegen vielleicht Eifersucht und die Angst, ihre Freundin zu verlieren. Helfen könnte ein ruhiges Gespräch, in dem Sara sagt: „Ich habe Angst, dass du mich nicht mehr magst.“' },
    ],
    check: ['Ich erkläre den Unterschied zwischen Aggression und Gewalt.', 'Ich nenne Ursachen von Gewalt.', 'Ich erkenne Gefühle unter der Wut.'],
  },
  // ================================================================ 3
  {
    thema: 'Wut im Griff · Strategien', titel: 'Cool bleiben', untertitel: 'Wut kommt – aber du entscheidest, was du damit machst. Du lernst die Wut-Ampel, probierst Strategien aus und stellst dein persönliches Cool-down-Set zusammen.',
    ziel: { de: 'Ich kenne Strategien, um mit Wut umzugehen, ohne anderen zu schaden.', fr: 'Je connais des stratégies pour gérer ma colère sans faire de mal aux autres.' },
    bild: ['tom:ruhig:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Woran merkst du Wut?',
      aufgaben: [
        { art: 'mc', auftrag: 'Woran merkt man, dass man wütend wird? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Das Herz schlägt schneller.', 'Das Gesicht wird heiß.', 'Die Hände ballen sich zu Fäusten.', 'Man wird laut.', 'Man wird sehr müde.'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Anleitung (vereinfacht)', titel: 'Die Wut-Ampel',
      absaetze: [
        'Wut kommt oft blitzschnell. Damit sie nicht zu Gewalt wird, hilft die **Wut-Ampel**.',
        '### Rot: Stopp!',
        'Sobald du merkst, dass du wütend wirst – Herzklopfen, heißes Gesicht, Fäuste –, sagst du innerlich: **Stopp!** Nichts sagen, nichts tun. Atme tief ein und zähle bis vier, halte kurz die Luft an und atme langsam aus. Wiederhole das ein paar Mal.',
        '### Gelb: Nachdenken',
        'Frag dich: **Was fühle ich eigentlich?** Was will ich erreichen? Was passiert, wenn ich jetzt zuschlage oder schreie? Wenn es nicht geht, **geh kurz raus** – zum Beispiel mit den Worten: „Ich brauche eine Pause.“ Das ist keine Schwäche, sondern Stärke.',
        '### Grün: Handeln',
        'Jetzt, mit etwas Abstand, wählst du eine **gute Lösung**: sagen, was dich stört (mit einer Ich-Botschaft), Hilfe holen oder später darüber reden.',
        '### Wut rauslassen – ohne Schaden',
        'Manchmal hilft es, die Energie loszuwerden: rennen, auf ein Kissen boxen, laut Musik hören, Wut aufschreiben und das Blatt zerreißen. Jeder Mensch hat andere Strategien. Wichtig ist nur: **niemandem schaden** – auch nicht sich selbst.',
      ],
      woerter: [['die Ampel', 'le feu (de signalisation)'], ['blitzschnell', 'en un éclair'], ['innerlich', 'intérieurement'], ['die Luft anhalten', 'retenir son souffle'], ['der Abstand', 'la distance, le recul'], ['die Schwäche', 'la faiblesse'], ['die Stärke', 'la force'], ['zerreißen', 'déchirer']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gehört zu welcher Ampelfarbe? Verbinde.', stufe: 1, links: ['Rot', 'Gelb', 'Grün'], rechts: ['Stopp! Atmen, nichts tun.', 'Nachdenken: Was fühle ich? Was will ich?', 'Eine gute Lösung wählen.'] },
        { art: 'tabelle', auftrag: 'Gute Strategie oder schadet sie jemandem? Kreuze an.', stufe: 2, kopf: ['', 'gute Strategie', 'schadet'], breiten: [60, 20, 20], zeilen: [['eine Runde ums Haus rennen', '[x]', ''], ['die Tür eintreten', '', '[x]'], ['auf ein Kissen boxen', '[x]', ''], ['sich selbst wehtun', '', '[x]'], ['laut Musik hören', '[x]', ''], ['den kleinen Bruder anschreien', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Fußballtraining', titel: 'Die rote Karte',
      situation: 'Tom erzählt Chloé, wie er beim Fußball fast ausgerastet wäre.',
      bild: ['tom:ruhig:stehen', 'chloe:froh:stehen'], sprecher: { Tom: 'm3', Chloé: 'w3' },
      text: [
        ['Tom', 'Gestern beim Spiel hat mich einer von hinten umgetreten. Der Schiri hat nichts gepfiffen. Ich war so wütend, ich wollte auf den Typen los.'],
        ['Chloé', 'Und? Hast du?'],
        ['Tom', 'Nein. Ich hab an die Ampel gedacht, die wir in Vie et société gemacht haben. Rot: Ich bin stehen geblieben und habe dreimal tief geatmet. Das hat sich komisch angefühlt, mitten auf dem Platz.'],
        ['Chloé', 'Und dann?'],
        ['Tom', 'Gelb: Ich hab gedacht, wenn ich ihn jetzt schubse, kriege ich die rote Karte und fehle beim Finale. Das wollte der doch nur.'],
        ['Chloé', 'Und Grün?'],
        ['Tom', 'Ich bin zum Schiri gegangen und habe ganz ruhig gesagt: „Das war ein Foul.“ Er hat sich die Stelle angeschaut und dem anderen Gelb gegeben. Und wir haben gewonnen!'],
        ['Chloé', 'Respekt. Früher wärst du explodiert.'],
        ['Tom', 'Ich weiß. Ist nicht immer leicht. Aber es fühlt sich besser an, wenn ich entscheide – und nicht meine Wut.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „ausrasten“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Kontrolle verlieren und wütend werden', 'sich ausruhen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was hat Tom bei jeder Ampelfarbe gemacht?', stufe: 1, kopf: ['Farbe', 'Was Tom gemacht hat'], breiten: [20, 80], zeilen: [['Rot', '[stehen geblieben, dreimal tief geatmet]'], ['Gelb', '[nachgedacht: rote Karte, Finale verpassen; das wollte der andere nur]'], ['Grün', '[zum Schiri gegangen und ruhig „Das war ein Foul“ gesagt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was meint Tom mit „wenn ich entscheide – und nicht meine Wut“?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, er meint …', 'Bei mir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Wut-Ampel', nummern: true, punkte: ['**Rot**: Stopp! Atmen, nichts tun.', '**Gelb**: Nachdenken – was fühle ich, was will ich? Evtl. **rausgehen**.', '**Grün**: eine **gute Lösung** wählen.'] },
         { titel: 'Wut rauslassen ohne Schaden', punkte: ['**bewegen**: rennen, Kissen boxen', '**Musik** hören', '**aufschreiben** und zerreißen', 'niemandem **schaden** – auch nicht sich selbst'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Cool-down-Set: Schneide die Karten aus. Wähle die drei, die dir am meisten helfen könnten. Auf die leeren Karten schreibst du eigene Ideen. Steck dein Set ins Mäppchen.', stufe: 2, neueSeite: true, titel: 'Cool down', icon: 'snowflake', farbe: RUHE, spalten: 3,
        karten: [
          { text: '**4 Sekunden einatmen, 4 halten, 4 ausatmen**' }, { text: '**bis 10 zählen – rückwärts**' }, { text: '**kurz rausgehen: „Ich brauche eine Pause.“**' },
          { text: '**eine Runde rennen**' }, { text: '**kaltes Wasser ins Gesicht**' }, { text: '**Lieblingslied hören**' },
          { text: '**mit jemandem reden, dem ich vertraue**' }, { text: '**Meine Idee:**', linien: 2 }, { text: '**Meine Idee:**', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Geschichte (ausgedacht): Jemand wird sehr wütend und benutzt die Wut-Ampel.', stufe: 2,
        anfaenge: ['Es passierte in …', 'Rot: …', 'Gelb: …', 'Grün: …', 'Am Ende …'], zeilen: 8,
        beispiel: 'Es passierte in der Kantine. Jemand stieß gegen Lara, und ihr Teller fiel auf den Boden. Alle lachten. Rot: Lara blieb stehen und atmete dreimal tief durch. Gelb: Sie dachte: „Er hat es vielleicht nicht mit Absicht gemacht. Wenn ich jetzt schreie, lachen alle noch mehr.“ Grün: Sie sagte ruhig: „Hilfst du mir beim Aufheben?“ Am Ende entschuldigte er sich und holte ihr einen neuen Teller.' },
    ],
    check: ['Ich merke, wenn ich wütend werde.', 'Ich kenne die Wut-Ampel.', 'Ich habe mein eigenes Cool-down-Set.'],
  },
  // ================================================================ 4
  {
    thema: 'Zivilcourage · helfen ohne Gefahr', titel: 'Hinschauen statt wegschauen', untertitel: 'Je mehr Menschen zuschauen, desto weniger hilft einer. Du lernst den Zuschauereffekt kennen, die Regeln der Zivilcourage und übst, wie man hilft, ohne sich selbst in Gefahr zu bringen.',
    ziel: { de: 'Ich kenne Regeln der Zivilcourage und weiß, wie ich helfen kann, ohne mich in Gefahr zu bringen.', fr: 'Je connais les règles du courage civique et je sais aider sans me mettre en danger.' },
    bild: ['jana:froh:handy', 'ben:besorgt:stehen'],
    start: {
      was: 'Wer hilft?',
      aufgaben: [
        { art: 'mc', auftrag: 'Auf dem Bahnsteig wird jemand bedrängt. 30 Menschen sehen es. Was glaubst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Viele helfen sofort.', 'Oft hilft niemand, weil jeder denkt, ein anderer macht es.'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Mut im Alltag',
      absaetze: [
        '**Zivilcourage** heißt: im Alltag **Mut zeigen**, wenn jemand bedroht, beleidigt oder angegriffen wird – auch wenn man die Person nicht kennt.',
        '### Der Zuschauereffekt',
        'Forscher haben herausgefunden: Je **mehr** Menschen etwas beobachten, desto **seltener** hilft der Einzelne. Jeder denkt: „Ein anderer wird schon etwas tun.“ So tut am Ende niemand etwas. Wer diesen Effekt kennt, kann ihn durchbrechen.',
        '### Helfen, ohne sich in Gefahr zu bringen',
        'Zivilcourage heißt **nicht**, den Helden zu spielen. Niemand muss sich zwischen Schlägernde stellen. Diese Regeln helfen:',
        '**Hinsehen** und die Lage einschätzen. **Andere ansprechen** – ganz direkt: „Sie im roten Pulli, bitte rufen Sie die Polizei!“ Den **Notruf wählen**: **113** (Polizei) oder **112** (Rettung). **Laut sein** und Aufmerksamkeit machen. Sich um das **Opfer kümmern**. **Zeugin oder Zeuge sein**: sich merken, was passiert ist, und es später erzählen.',
        'Auch im Netz kann man Zivilcourage zeigen: Hasskommentare melden, Betroffenen schreiben, nicht weiterleiten.',
      ],
      woerter: [['die Zivilcourage', 'le courage civique'], ['bedrohen', 'menacer'], ['der Zuschauereffekt', 'l’effet du témoin'], ['durchbrechen', 'briser'], ['einschätzen', 'évaluer'], ['die Aufmerksamkeit', 'l’attention'], ['das Opfer', 'la victime'], ['der Zeuge', 'le témoin']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was ist der Zuschauereffekt?', zeilen: 2, l: 'Je mehr Menschen zuschauen, desto seltener hilft der Einzelne, weil jeder denkt, ein anderer tut etwas.' }, { f: 'Warum soll man andere direkt ansprechen („Sie im roten Pulli“)?', zeilen: 2, l: 'Weil sich dann jemand persönlich verantwortlich fühlt und der Zuschauereffekt durchbrochen wird.' }, { f: 'Welche Nummern wählt man in Luxemburg im Notfall?', l: '113 (Polizei), 112 (Rettung)' }] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Im Bus', titel: 'Sie im grünen Mantel!',
      situation: 'Jana erzählt Ben, was sie gestern im Bus erlebt hat.',
      bild: ['jana:froh:stehen', 'ben:ueberrascht:stehen'], sprecher: { Jana: 'w2', Ben: 'm3' },
      text: [
        ['Jana', 'Gestern im Bus haben zwei ältere Jungs einen Jungen mit Kippa angepöbelt. Sie haben ihm die Kippa vom Kopf gerissen und gelacht.'],
        ['Ben', 'Und keiner hat was gemacht?'],
        ['Jana', 'Erst nicht. Der Bus war voll, aber alle haben auf ihr Handy geschaut. Ich hatte voll Angst.'],
        ['Ben', 'Was hast du gemacht?'],
        ['Jana', 'Ich habe an die Regeln gedacht. Ich habe nicht die Jungs angesprochen, sondern eine Frau: „Sie im grünen Mantel, bitte sagen Sie dem Busfahrer Bescheid!“ Und ich habe laut gesagt: „Hört auf, das ist nicht okay!“'],
        ['Ben', 'Und dann?'],
        ['Jana', 'Plötzlich sind drei andere aufgestanden und haben auch was gesagt. Der Busfahrer hat angehalten. Die Jungs sind ausgestiegen. Ich habe mich dann zu dem Jungen gesetzt.'],
        ['Ben', 'Krass. Du warst mutig.'],
        ['Jana', 'Ich war nicht allein mutig. Es brauchte nur eine, die anfängt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „anpöbeln“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemanden frech und laut belästigen', 'jemanden begrüßen'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Welche Regeln der Zivilcourage hat Jana befolgt? Kreuze an (mehrere möglich).', stufe: 2, fragen: [{ f: '', o: ['andere direkt angesprochen', 'laut gewesen', 'sich zwischen die Jungs gestellt', 'sich um das Opfer gekümmert'], r: [0, 1, 3] }] },
        { art: 'fragen', auftrag: 'Was meint Jana mit „Es brauchte nur eine, die anfängt“?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Wenn eine Person anfängt zu helfen, trauen sich auch andere – der Zuschauereffekt wird durchbrochen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was macht es schwer, in so einer Situation etwas zu tun? Was macht es leichter?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Schwer ist, dass …', 'Leichter wird es, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zivilcourage', punkte: ['**Mut** im Alltag, auch für Fremde', '**Zuschauereffekt**: Je mehr zuschauen, desto weniger hilft einer.', 'kein Held spielen – **ohne Gefahr** helfen'] },
         { titel: 'Sechs Regeln', nummern: true, punkte: ['**hinsehen**', 'andere **direkt ansprechen**', 'Notruf **113** / **112**', '**laut** sein', 'um das **Opfer** kümmern', '**Zeuge** sein'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Situations-Karten: Zieht eine Karte. Was kannst du tun, ohne dich in Gefahr zu bringen? Nutzt die sechs Regeln. Spielt die Szene vielleicht nach.', stufe: 3, neueSeite: true, titel: 'Was tust du?', icon: 'shield-check', farbe: MUT, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Auf dem Schulweg schubsen drei Jugendliche ein jüngeres Kind herum.' },
          { text: 'Im Klassenchat wird ein Foto von einer Mitschülerin mit gemeinen Kommentaren geteilt.' },
          { text: 'Im Zug beleidigt ein Mann eine Frau wegen ihrer Hautfarbe.' },
          { text: 'Vor dem Jugendhaus liegt ein Mann am Boden und bewegt sich nicht.' },
          { text: 'Jemand sprüht ein Hakenkreuz an die Bushaltestelle.' },
          { text: 'Eine Freundin erzählt, dass ein Erwachsener ihr Angst macht und Fotos von ihr will.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Situations-Karte. Beschreibe Schritt für Schritt, wie du helfen würdest.', stufe: 2,
        anfaenge: ['Die Situation: …', 'Zuerst …', 'Dann …', 'Danach …', 'Wichtig ist mir, dass …'], zeilen: 8,
        beispiel: 'Die Situation: Auf dem Schulweg schubsen drei Jugendliche ein jüngeres Kind herum. Zuerst bleibe ich stehen und schaue genau hin. Dann spreche ich einen Erwachsenen direkt an: „Sie mit dem Hund, bitte helfen Sie!“ Danach rufe ich laut: „Lasst ihn in Ruhe!“ und wähle, wenn nötig, die 113. Wichtig ist mir, dass ich mich nicht selbst prügle und mich danach um das Kind kümmere.' },
    ],
    check: ['Ich erkläre den Zuschauereffekt.', 'Ich kenne die sechs Regeln der Zivilcourage.', 'Ich weiß, wie ich ohne Gefahr helfe.'],
  },
  // ================================================================ 5
  {
    thema: 'Gewaltverzicht · gewaltfreier Widerstand', titel: 'Stärker als Gewalt', untertitel: 'Ein Salzmarsch, ein Sitzplatz im Bus, ein Traum: Du lernst Menschen kennen, die ohne Gewalt die Welt verändert haben, und denkst darüber nach, warum Gewaltverzicht Mut braucht.',
    ziel: { de: 'Ich erkläre an Beispielen, wie gewaltfreier Widerstand funktioniert.', fr: 'J’explique à l’aide d’exemples comment fonctionne la résistance non violente.' },
    bild: ['lea:froh:erklaeren', 'yusuf:froh:stehen'],
    start: {
      was: 'Was ist stärker?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Kann man ohne Gewalt etwas erreichen, wenn man ungerecht behandelt wird? Was denkst du?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort, z. B.: Ja, mit Demonstrationen, Streiks oder indem viele zusammenhalten.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Drei, die Nein sagten',
      absaetze: [
        '### Mahatma Gandhi',
        '**Gandhi** wollte, dass Indien von Großbritannien unabhängig wird – aber **ohne Gewalt**. 1930 lief er mit vielen Menschen fast **400 Kilometer** zum Meer, um selbst Salz zu gewinnen. Das war verboten, denn die Briten verdienten am Salz. Tausende wurden verhaftet. **1947** wurde Indien unabhängig.',
        '### Rosa Parks',
        'In den USA mussten schwarze Menschen in Bussen hinten sitzen und weißen Fahrgästen Platz machen. Am **1. Dezember 1955** weigerte sich **Rosa Parks**, ihren Platz aufzugeben. Sie wurde verhaftet. Daraufhin mieden schwarze Menschen in ihrer Stadt über ein Jahr lang die Busse – bis die Regel fiel.',
        '### Martin Luther King',
        'Der Pfarrer **Martin Luther King** kämpfte gewaltfrei für die gleichen Rechte für Schwarze. 1963 sagte er vor über 200 000 Menschen: **„Ich habe einen Traum“** – dass seine Kinder nicht nach ihrer Hautfarbe, sondern nach ihrem Charakter beurteilt werden. 1964 bekam er den Friedensnobelpreis.',
        '### Gewaltfrei heißt nicht schwach',
        'Gewaltfreier Widerstand braucht viel **Mut** und **Ausdauer**: Man wehrt sich, ohne zurückzuschlagen. Gerade das zeigt allen, wer im Unrecht ist.',
      ],
      woerter: [['die Unabhängigkeit', 'l’indépendance'], ['verhaften', 'arrêter'], ['sich weigern', 'refuser'], ['boykottieren', 'boycotter'], ['der Widerstand', 'la résistance'], ['die Ausdauer', 'la persévérance'], ['das Unrecht', 'l’injustice']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer war das? Verbinde.', stufe: 1, links: ['Gandhi', 'Rosa Parks', 'Martin Luther King'], rechts: ['Salzmarsch 1930, Indien wird 1947 unabhängig', 'blieb 1955 im Bus sitzen', '„Ich habe einen Traum“ (1963)'] },
        { art: 'fragen', auftrag: 'Warum ist gewaltfreier Widerstand nicht schwach?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Er braucht viel Mut und Ausdauer; man wehrt sich, ohne zurückzuschlagen, und zeigt allen, wer im Unrecht ist.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · nach Vie et société', titel: 'Hätte ich zurückgeschlagen?',
      situation: 'Lea und Yusuf reden über die Geschichte von Rosa Parks.',
      bild: ['lea:froh:erklaeren', 'yusuf:verwirrt:stehen'], sprecher: { Lea: 'w3', Yusuf: 'm3' },
      text: [
        ['Yusuf', 'Ehrlich, ich verstehe das nicht ganz. Wenn mich jemand so ungerecht behandelt, will ich mich wehren.'],
        ['Lea', 'Rosa Parks hat sich doch gewehrt. Sie ist einfach sitzen geblieben.'],
        ['Yusuf', 'Ja, aber sie hätte sich auch richtig wehren können.'],
        ['Lea', 'Und dann? Dann hätten alle gesagt: „Seht ihr, die sind gewalttätig.“ Die Polizei hätte einen Grund gehabt, noch härter vorzugehen.'],
        ['Yusuf', 'Hm. So habe ich das noch nicht gesehen. Weil sie ruhig geblieben ist, haben alle gesehen, wer im Unrecht war.'],
        ['Lea', 'Genau. Und es waren Tausende, die mitgemacht haben. Ein Jahr lang zu Fuß zur Arbeit gehen, statt Bus zu fahren! Das ist hart.'],
        ['Yusuf', 'Okay. Gewaltfrei heißt also nicht: alles hinnehmen.'],
        ['Lea', 'Nein. Es heißt: sich wehren – aber klug.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „etwas hinnehmen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas akzeptieren, ohne sich zu wehren', 'etwas mitnehmen'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was wäre laut Lea passiert, wenn Rosa Parks Gewalt benutzt hätte?', zeilen: 2, l: 'Alle hätten gesagt, die Schwarzen sind gewalttätig, und die Polizei hätte noch härter vorgehen können.' }, { f: 'Was haben die Menschen beim Busboykott gemacht?', l: 'Sie sind ein Jahr lang zu Fuß zur Arbeit gegangen.' }, { f: 'Was hat Yusuf am Ende verstanden?', l: 'Gewaltfrei heißt nicht, alles hinzunehmen, sondern sich klug zu wehren.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr heute Menschen oder Bewegungen, die gewaltfrei für etwas kämpfen?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Klima-Demonstrationen', 'Petitionen', 'Streiks', 'Boykott', 'Mahnwachen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gewaltfreier Widerstand', punkte: ['sich **wehren**, ohne **zurückzuschlagen**', 'braucht **Mut** und **Ausdauer**', 'zeigt, **wer im Unrecht** ist', 'Mittel: Märsche, **Boykott**, Streiks, Demonstrationen'] },
         { titel: 'Beispiele', punkte: ['**Gandhi**: Salzmarsch 1930, Indien unabhängig 1947', '**Rosa Parks**: Busboykott 1955', '**Martin Luther King**: „Ich habe einen Traum“, Nobelpreis 1964'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Wer zurückschlägt, ist stärker als wer weggeht.', 'Man kann jeden Konflikt ohne Gewalt lösen.'] },
      { art: 'schneidekarten', auftrag: 'Gewaltfrei aktiv: Eure Schule plant, den Pausenhof zu verkleinern. Was könnt ihr gewaltfrei tun? Ordnet die Karten von „bringt wenig“ bis „bringt viel“ und ergänzt eigene Ideen.', stufe: 3, titel: 'Gewaltfrei aktiv', icon: 'speakerphone', farbe: IDEE, spalten: 3,
        karten: [
          { text: 'Unterschriften sammeln' }, { text: 'mit dem Schülerrat reden' }, { text: 'ein Plakat malen' },
          { text: 'einen Brief an die Schulleitung schreiben' }, { text: 'einen Artikel für die Schülerzeitung' }, { text: '**Eigene Idee:**', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Martin Luther King hatte einen Traum. Was ist dein Traum für eine gerechtere Welt oder Schule? Beginne mit „Ich habe einen Traum …“', stufe: 3,
        anfaenge: ['Ich habe einen Traum: …', 'In meinem Traum …', 'Damit er wahr wird, …'], zeilen: 8,
        beispiel: 'Ich habe einen Traum: dass an unserer Schule niemand mehr wegen seiner Herkunft oder seiner Kleidung ausgelacht wird. In meinem Traum sitzen in der Kantine alle gemischt, und jeder kann sagen, was er denkt, ohne Angst zu haben. Damit er wahr wird, fange ich bei mir an: Ich lache nicht mit und setze mich zu denen, die allein sind.' },
    ],
    check: ['Ich erzähle von Gandhi, Rosa Parks und Martin Luther King.', 'Ich erkläre, warum Gewaltverzicht Mut braucht.', 'Ich kenne gewaltfreie Mittel.'],
  },
  // ================================================================ 6
  {
    thema: 'Diskriminierung · Rechte · Hilfe', titel: 'Ungleich behandelt', untertitel: 'Keine Wohnung wegen des Namens, kein Job wegen des Kopftuchs, kein Einlass wegen der Hautfarbe: Du lernst, was Diskriminierung ist, welche Rechte es gibt und wo man Hilfe bekommt.',
    ziel: { de: 'Ich erkenne Diskriminierung und weiß, dass das Gesetz davor schützt.', fr: 'Je reconnais la discrimination et je sais que la loi protège contre elle.' },
    bild: ['sami:enttaeuscht:stehen', 'lea:froh:stehen'],
    start: {
      was: 'Gerecht?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ist das gerecht oder Diskriminierung? Kreuze an.', stufe: 1, kopf: ['', 'gerecht', 'Diskriminierung'], breiten: [60, 20, 20], zeilen: [['Ein Club lässt nur Menschen ab 18 Jahren hinein.', '[x]', ''], ['Ein Club lässt keine Menschen mit dunkler Hautfarbe hinein.', '', '[x]'], ['Eine Firma stellt niemanden mit Kopftuch ein.', '', '[x]'], ['Für einen Job als Busfahrer braucht man einen Führerschein.', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Gleiche Rechte für alle',
      absaetze: [
        'Von **Diskriminierung** spricht man, wenn ein Mensch **schlechter behandelt** wird, nur weil er zu einer bestimmten Gruppe gehört – ohne dass es dafür einen sachlichen Grund gibt.',
        '### Gründe für Diskriminierung',
        'Menschen werden zum Beispiel diskriminiert wegen ihrer **Herkunft** oder **Hautfarbe**, ihrer **Religion**, ihres **Geschlechts**, einer **Behinderung**, ihres **Alters** oder weil sie Menschen des gleichen Geschlechts lieben.',
        '### Wo passiert das?',
        'Bei der Suche nach einer **Wohnung** oder einer **Lehrstelle**, am Eingang einer Disco, in der Schule, im Internet. Oft ist es versteckt: Eine Wohnung ist „leider schon vergeben“, wenn ein bestimmter Name am Telefon fällt.',
        '### Das Gesetz schützt',
        'In Luxemburg und in der ganzen Europäischen Union ist Diskriminierung **verboten**. Wer diskriminiert wird, kann sich beim **Zentrum für Gleichbehandlung (CET)** beraten lassen, kostenlos. Auch die Polizei hilft, wenn Menschen beleidigt oder angegriffen werden.',
        '### Was kann ich tun?',
        'Nicht mitmachen. Betroffenen zur Seite stehen. Diskriminierung melden – in der Schule, im Netz, bei der Polizei. Und eigene Vorurteile prüfen.',
      ],
      woerter: [['die Diskriminierung', 'la discrimination'], ['sachlich', 'objectif'], ['die Herkunft', 'l’origine'], ['das Geschlecht', 'le sexe, le genre'], ['versteckt', 'caché'], ['vergeben', 'déjà pris, attribué'], ['die Gleichbehandlung', 'l’égalité de traitement'], ['zur Seite stehen', 'soutenir']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was ist Diskriminierung?', zeilen: 2, l: 'Wenn jemand schlechter behandelt wird, nur weil er zu einer bestimmten Gruppe gehört, ohne sachlichen Grund.' }, { f: 'Nenne vier Gründe, wegen derer Menschen diskriminiert werden.', zeilen: 2, l: 'Herkunft, Hautfarbe, Religion, Geschlecht, Behinderung, Alter, sexuelle Orientierung' }, { f: 'Wo kann man sich in Luxemburg beraten lassen?', l: 'beim Zentrum für Gleichbehandlung (CET)' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Telefon und danach', titel: 'Leider schon vergeben',
      situation: 'Sami sucht eine Lehrstelle als Koch. Seine Freundin Lea hört, wie er mit einem Restaurant telefoniert.',
      bild: ['sami:enttaeuscht:handy', 'lea:besorgt:stehen'], sprecher: { Sami: 'm3', Lea: 'w3', Chef: 'm1' },
      text: [
        ['Sami', 'Guten Tag, mein Name ist Sami Haddad. Ich habe Ihre Anzeige gesehen und möchte mich für die Lehrstelle als Koch bewerben.'],
        ['Chef', 'Ach so … Die Stelle ist leider schon vergeben. Tut mir leid. Auf Wiederhören.'],
        ['Sami', 'Schon wieder. Das ist das dritte Mal.'],
        ['Lea', 'Komisch. Die Anzeige ist von heute Morgen. Weißt du was? Ich rufe an.'],
        ['Chef', 'Restaurant zur Mühle, guten Tag.'],
        ['Lea', 'Guten Tag, Lea Schmit. Ist die Lehrstelle als Köchin noch frei?'],
        ['Chef', 'Ja, natürlich! Schicken Sie mir Ihre Unterlagen.'],
        ['Sami', 'Siehst du? Es liegt an meinem Namen.'],
        ['Lea', 'Das ist Diskriminierung, Sami. Das ist verboten. Lass uns morgen mit der Beraterin in der Schule reden. Und es gibt eine Stelle, die hilft: das Zentrum für Gleichbehandlung.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sind „Unterlagen“ bei einer Bewerbung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Lebenslauf, Zeugnisse, Brief', 'eine Tischdecke'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Sami bewirbt sich zum ersten Mal.', false], ['Der Chef sagt Sami, die Stelle ist vergeben.', true], ['Bei Lea sagt der Chef, die Stelle ist noch frei.', true], ['Lea findet, das ist Pech, aber keine Diskriminierung.', false]] },
        { art: 'fragen', auftrag: 'Woran merken Sami und Lea, dass es Diskriminierung ist?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Bei Sami ist die Stelle angeblich vergeben, bei Lea kurz danach noch frei – es liegt an seinem Namen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie fühlt sich Sami wohl? Was würdet ihr ihm raten?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Sami fühlt sich bestimmt …', 'Ich würde ihm raten …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Diskriminierung', punkte: ['**schlechter behandelt** wegen einer Gruppe', 'Gründe: Herkunft, Hautfarbe, **Religion**, Geschlecht, Behinderung, Alter, Liebe', 'oft **versteckt**'] },
         { titel: 'Schutz und Hilfe', punkte: ['Diskriminierung ist **verboten**', '**Zentrum für Gleichbehandlung (CET)**: kostenlose Beratung', 'nicht mitmachen, **zur Seite stehen**, **melden**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Fall-Karten: Ist das Diskriminierung? Wenn ja: aus welchem Grund? Was könnte die betroffene Person tun?', stufe: 3, neueSeite: true, titel: 'Ist das Diskriminierung?', icon: 'scale', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Ein Vermieter sagt: „An Familien mit Kindern vermiete ich nicht.“', linien: 2 },
          { text: 'Eine Disco lässt Nele mit ihrem Rollstuhl nicht hinein: „Zu gefährlich.“', linien: 2 },
          { text: 'Im Sportverein dürfen Mädchen nicht Fußball spielen.', linien: 2 },
          { text: 'Ein Lehrer gibt allen, die zu spät kommen, eine Strafarbeit.', linien: 2 },
          { text: 'Zwei Jungen werden ausgelacht, weil sie Hand in Hand gehen.', linien: 2 },
          { text: 'Eine Bewerberin wird nicht genommen, weil sie 55 Jahre alt ist.', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Sami eine Nachricht. Mach ihm Mut und gib ihm einen Rat.', stufe: 2,
        anfaenge: ['Hey Sami,', 'es tut mir leid, dass …', 'Das liegt nicht an dir, sondern …', 'Ich würde …'], zeilen: 7,
        beispiel: 'Hey Sami, es tut mir leid, dass dir das passiert ist. Das liegt nicht an dir, sondern an den Vorurteilen von diesem Chef. Du bist ein super Koch, das weiß ich vom Schulfest. Ich würde mich beim Zentrum für Gleichbehandlung beraten lassen und mich weiter bewerben. Es gibt viele Chefs, die sich über dich freuen würden.' },
    ],
    check: ['Ich erkläre, was Diskriminierung ist.', 'Ich nenne Gründe für Diskriminierung.', 'Ich weiß, wo man Hilfe bekommt.'],
  },
  // ================================================================ 7
  {
    thema: 'Verfolgung · Erinnern · Asyl', titel: 'Wenn Hass zur Verfolgung wird', untertitel: 'Hass beginnt im Kleinen und kann schrecklich enden. Du lernst die Treppe des Hasses kennen, erinnerst dich an die Verfolgung der Jüdinnen und Juden und erfährst, warum es das Recht auf Asyl gibt.',
    ziel: { de: 'Ich erkläre, wie aus Vorurteilen Verfolgung werden kann, und warum Erinnern und Asyl wichtig sind.', fr: 'J’explique comment les préjugés peuvent mener à la persécution et pourquoi la mémoire et l’asile sont importants.' },
    bild: ['lehrerin:ruhig:erklaeren', 'mia:besorgt:stehen'],
    start: {
      was: 'Kleine Schritte',
      aufgaben: [
        { art: 'fragen', auftrag: 'Ein Witz über eine Gruppe von Menschen – ist das harmlos? Was denkst du?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort. Witze können Vorurteile verstärken und Menschen verletzen.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Damit es nie wieder geschieht',
      absaetze: [
        '### Die Treppe des Hasses',
        'Verfolgung beginnt nicht von heute auf morgen. Oft steigt Hass Stufe um Stufe: Zuerst gibt es **Vorurteile**. Dann **abwertende Worte und Witze**. Dann **Diskriminierung**: Menschen werden ausgeschlossen. Dann **Gewalt**. Und am Ende kann **Verfolgung** stehen, bis hin zum **Völkermord**. Je früher Menschen sich dagegenstellen, desto leichter lässt sich der Weg nach oben stoppen.',
        '### Die Shoah',
        'Das schrecklichste Beispiel ist die **Shoah**, auch **Holocaust** genannt. Die Nationalsozialisten in Deutschland verbreiteten Hass auf Jüdinnen und Juden. Erst wurden sie beschimpft, dann aus Schulen und Berufen ausgeschlossen, dann ihrer Wohnungen beraubt. Im Zweiten Weltkrieg wurden rund **sechs Millionen** Jüdinnen und Juden ermordet, auch viele, die in Luxemburg gelebt hatten. Auch Sinti und Roma, Menschen mit Behinderung und viele andere wurden verfolgt und getötet.',
        '### Verfolgung heute',
        'Auch heute werden in manchen Ländern Menschen wegen ihrer Religion, ihrer Meinung oder ihrer Volksgruppe verfolgt.',
        '### Das Recht auf Asyl',
        'Wer verfolgt wird, darf nach den Menschenrechten in einem anderen Land **Schutz** suchen: das Recht auf **Asyl**. Die **Genfer Flüchtlingskonvention** von 1951 regelt diesen Schutz.',
      ],
      woerter: [['die Verfolgung', 'la persécution'], ['abwertend', 'dévalorisant'], ['der Völkermord', 'le génocide'], ['die Shoah', 'la Shoah'], ['berauben', 'dépouiller'], ['ermorden', 'assassiner'], ['die Volksgruppe', 'l’ethnie'], ['das Asyl', 'l’asile']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Die Treppe des Hasses: Ordne die Stufen von unten nach oben.', stufe: 1, teile: ['Vorurteile', 'abwertende Worte und Witze', 'Diskriminierung', 'Gewalt', 'Verfolgung und Völkermord'], ordnung: [3, 0, 4, 2, 1] },
        { art: 'fragen', auftrag: 'Was ist das Recht auf Asyl?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wer verfolgt wird, darf in einem anderen Land Schutz suchen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 5P1 · nach dem Besuch einer Gedenkstätte', titel: 'Warum erinnern wir uns?',
      situation: 'Die Klasse war in einer Gedenkstätte. Mia ist nachdenklich. Sie spricht mit ihrer Lehrerin.',
      bild: ['mia:traurig:stehen', 'lehrerin:ruhig:erklaeren'], sprecher: { Mia: 'w3', Lehrerin: 'w1' },
      text: [
        ['Mia', 'Ich verstehe nicht, wie Menschen so etwas tun konnten. Das waren doch ganz normale Leute.'],
        ['Lehrerin', 'Ja, das ist das Erschreckende. Viele haben mitgemacht. Noch viel mehr haben weggeschaut.'],
        ['Mia', 'Aber warum müssen wir uns heute noch daran erinnern? Das ist doch so lange her.'],
        ['Lehrerin', 'Weil es wieder passieren kann. Die Shoah hat nicht mit Lagern angefangen, sondern mit Worten, mit Witzen, mit Wegschauen. Wer das weiß, merkt früher, wenn etwas schiefläuft.'],
        ['Mia', 'Wie in der Treppe des Hasses.'],
        ['Lehrerin', 'Genau. Und noch etwas: Die Opfer hatten Namen, Familien, Träume. Wenn wir uns an sie erinnern, geben wir ihnen ein Stück ihrer Würde zurück.'],
        ['Mia', 'In der Ausstellung war ein Brief von einem Mädchen in meinem Alter. Sie wollte Tänzerin werden.'],
        ['Lehrerin', 'Siehst du. Erinnern heißt auch: Wir lassen nicht zu, dass so etwas noch einmal geschieht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Gedenkstätte? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Ort, an dem man an Opfer erinnert', 'ein Freizeitpark'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was ist für die Lehrerin das Erschreckende?', l: 'Viele ganz normale Menschen haben mitgemacht, noch mehr haben weggeschaut.' }, { f: 'Womit hat die Shoah angefangen?', l: 'mit Worten, Witzen und Wegschauen' }, { f: 'Nenne zwei Gründe, warum wir uns erinnern.', zeilen: 2, l: 'damit es nicht wieder geschieht; um den Opfern ein Stück Würde zurückzugeben' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was können wir heute tun, damit Hass nicht die Treppe hinaufsteigt?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Auf der ersten Stufe kann man …', 'Wenn jemand einen Witz macht, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Treppe des Hasses', nummern: true, punkte: ['**Vorurteile**', 'abwertende **Worte und Witze**', '**Diskriminierung**', '**Gewalt**', '**Verfolgung**, Völkermord'] },
         { titel: 'Erinnern und schützen', punkte: ['**Shoah**: rund sechs Millionen ermordete Jüdinnen und Juden', '**erinnern**, damit es nie wieder geschieht', 'Recht auf **Asyl** (Genfer Flüchtlingskonvention 1951)', 'früh **stoppen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Auf welcher Stufe der Treppe steht das? Schreibe die Nummer.', stufe: 2, html: hassTreppe(),
        liste: [['Ein Witz macht eine Religion lächerlich.', '2'], ['„Die sind alle faul.“', '1'], ['Eine Familie bekommt wegen ihrer Herkunft keine Wohnung.', '3'], ['Ein Mann wird wegen seiner Hautfarbe verprügelt.', '4'], ['Ein Staat sperrt Menschen wegen ihrer Religion ein.', '5']], spalten: 1 },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Alle Jugendlichen sollten einmal eine Gedenkstätte besuchen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du schreibst einen Text für eine Gedenktafel an deiner Schule. Was soll darauf stehen?', stufe: 3,
        anfaenge: ['Wir erinnern uns an …', 'Sie hatten …', 'Wir versprechen …'], zeilen: 7,
        beispiel: 'Wir erinnern uns an alle Menschen, die wegen ihrer Religion, ihrer Herkunft oder ihrer Meinung verfolgt und ermordet wurden. Sie hatten Namen, Familien und Träume wie wir. Wir versprechen, nicht wegzuschauen, wenn Menschen beschimpft oder ausgegrenzt werden. Nie wieder.' },
    ],
    check: ['Ich erkläre die Treppe des Hasses.', 'Ich weiß, was die Shoah war.', 'Ich erkläre das Recht auf Asyl.'],
  },
  // ================================================================ 8
  {
    thema: 'Frieden · Versöhnung · Religionen', titel: 'Schalom, Salam, Frieden', untertitel: 'Fast alle Religionen sprechen vom Frieden. Du lernst, was sie darüber sagen, was Versöhnung bedeutet, und gestaltest Friedens-Karten für deine Klasse.',
    ziel: { de: 'Ich erkläre, was Religionen und Menschen über Frieden und Versöhnung sagen, und trage selbst etwas bei.', fr: 'J’explique ce que les religions et les gens disent de la paix et de la réconciliation et j’y contribue.' },
    bild: ['amira:froh:stehen', 'ben:froh:stehen'],
    start: {
      was: 'Frieden ist …',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Frieden ist mehr als „kein Krieg“. Was gehört für dich zu Frieden?', stufe: 1, mitte: 'Frieden', aeste: ['keine Angst', { l: 'Gerechtigkeit' }, { l: 'Respekt' }, { l: 'Versöhnung' }, { l: 'Sicherheit' }, { l: 'Freundschaft' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Ein Wort in vielen Sprachen',
      absaetze: [
        'Juden grüßen sich mit **„Schalom“**, Muslime mit **„Salam“**. Beide Wörter bedeuten **Frieden**. Viele Religionen stellen den Frieden in die Mitte.',
        '### Was Religionen sagen',
        'In der Bibel sagt Jesus: **„Selig sind, die Frieden stiften.“** Im Koran heißt es, dass Gott die Menschen verschieden geschaffen hat, damit sie einander **kennenlernen**. Im Hinduismus und Buddhismus gibt es die Lehre von **Ahimsa**: keinem Lebewesen Schaden zufügen. Auch Menschen ohne Religion setzen sich für Frieden ein, zum Beispiel mit den **Menschenrechten**.',
        '### Und doch: Gewalt im Namen der Religion',
        'Leider haben Menschen auch im Namen von Religionen Kriege geführt und Gewalt ausgeübt. Viele Gläubige sagen: Damit wird die Religion **missbraucht**. Darum ist es wichtig, dass Religionen miteinander im Gespräch bleiben – auch in Luxemburg.',
        '### Versöhnung',
        'Frieden braucht oft **Versöhnung**: Wer Unrecht getan hat, sieht es ein und **entschuldigt sich**. Er versucht, es **wiedergutzumachen**. Wer verletzt wurde, kann – wenn er es möchte – **verzeihen**. Verzeihen heißt nicht vergessen. Aber es kann helfen, wieder frei zu werden.',
      ],
      woerter: [['der Frieden', 'la paix'], ['Frieden stiften', 'faire la paix'], ['das Lebewesen', 'l’être vivant'], ['missbrauchen', 'abuser de'], ['die Versöhnung', 'la réconciliation'], ['einsehen', 'reconnaître'], ['wiedergutmachen', 'réparer'], ['verzeihen', 'pardonner']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gehört zusammen? Verbinde.', stufe: 1, links: ['Schalom', 'Salam', '„Selig sind, die Frieden stiften.“', 'Ahimsa'], rechts: ['Gruß im Judentum: Frieden', 'Gruß im Islam: Frieden', 'Jesus in der Bibel', 'keinem Lebewesen schaden'] },
        { art: 'ordnen', auftrag: 'Wie gelingt Versöhnung? Ordne.', stufe: 2, teile: ['Unrecht einsehen', 'sich entschuldigen', 'wiedergutmachen', 'verzeihen (wenn man möchte)'], ordnung: [2, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach einem Streit', titel: 'Es tut mir leid',
      situation: 'Ben hat ein Video von Amira, auf dem sie stolpert, im Klassenchat geteilt. Alle haben gelacht. Jetzt will er sich entschuldigen.',
      bild: ['ben:verlegen:stehen', 'amira:enttaeuscht:verschraenkt'], sprecher: { Ben: 'm3', Amira: 'w2' },
      text: [
        ['Ben', 'Amira, hast du kurz Zeit? Ich will mich entschuldigen. Wegen des Videos.'],
        ['Amira', 'Ach so. Jetzt, wo es schon alle gesehen haben.'],
        ['Ben', 'Ich weiß. Es war dumm. Ich fand es in dem Moment lustig und habe nicht nachgedacht, wie es für dich ist. Es tut mir wirklich leid.'],
        ['Amira', 'Es war richtig peinlich. Leute, die ich gar nicht kenne, haben mich darauf angesprochen.'],
        ['Ben', 'Ich habe es gelöscht und in den Chat geschrieben, dass alle es löschen sollen. Und dass es meine Schuld war, nicht deine.'],
        ['Amira', 'Echt? Das hast du geschrieben?'],
        ['Ben', 'Ja. Und wenn noch jemand was sagt, sag mir Bescheid. Dann kläre ich das.'],
        ['Amira', 'Okay. Ich bin noch ein bisschen sauer. Aber … danke, dass du es ehrlich gesagt hast. Das ist nicht so leicht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine gute Entschuldigung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['„Es tut mir leid, dass ich … Ich mache es wieder gut, indem …“', '„Sorry, aber du hast selbst schuld.“'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Schritte der Versöhnung findest du im Gespräch?', stufe: 2, kopf: ['Schritt', 'Was Ben oder Amira sagt oder tut'], breiten: [28, 72], zeilen: [['Unrecht einsehen', '[„Es war dumm. Ich habe nicht nachgedacht, wie es für dich ist.“]'], ['sich entschuldigen', '[„Es tut mir wirklich leid.“]'], ['wiedergutmachen', '[Video gelöscht, im Chat Schuld zugegeben, Hilfe angeboten]'], ['verzeihen', '[Amira ist noch sauer, aber dankt ihm – ein erster Schritt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Muss Amira Ben sofort verzeihen? Sprecht darüber.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, sie muss nicht, weil …', 'Verzeihen braucht Zeit, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Frieden in den Religionen', punkte: ['**Schalom** / **Salam**: Frieden', 'Jesus: „Selig sind, die **Frieden stiften**.“', '**Ahimsa**: keinem Lebewesen schaden', 'Gewalt im Namen der Religion = **Missbrauch**'] },
         { titel: 'Versöhnung', nummern: true, punkte: ['Unrecht **einsehen**', 'sich **entschuldigen**', '**wiedergutmachen**', '**verzeihen** – wenn man möchte'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Friedens-Karten: Schreibt auf jede Karte einen Friedenswunsch oder ein Versprechen für eure Klasse. Hängt sie zusammen als Friedenskette im Klassenraum auf.', stufe: 2, neueSeite: true, titel: 'Friedenskette', icon: 'peace', farbe: IDEE, spalten: 3,
        karten: [
          { text: '**Ich wünsche mir …**', linien: 3 }, { text: '**Ich verspreche …**', linien: 3 }, { text: '**Frieden ist für mich …**', linien: 3 },
          { text: '**In unserer Klasse …**', linien: 3 }, { text: '**Ich verzeihe …**', linien: 3 }, { text: '**Für die Welt wünsche ich …**', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Entschuldigung für eine ausgedachte Situation. Achte auf die Schritte der Versöhnung.', stufe: 2,
        anfaenge: ['Liebe/r …,', 'ich habe …', 'Das war nicht in Ordnung, weil …', 'Es tut mir leid.', 'Ich mache es wieder gut, indem …'], zeilen: 7,
        beispiel: 'Lieber Max, ich habe in der Pause vor allen gesagt, dass du nicht Fußball spielen kannst. Das war nicht in Ordnung, weil ich dich damit lächerlich gemacht habe. Es tut mir leid. Ich mache es wieder gut, indem ich dich beim nächsten Spiel in mein Team wähle und den anderen sage, dass ich Unsinn geredet habe.' },
    ],
    check: ['Ich erkläre, was Religionen über Frieden sagen.', 'Ich nenne die Schritte der Versöhnung.', 'Ich kann mich richtig entschuldigen.'],
  },
]
