// Vie et société · Modul 3 (7P) „Natur, Medien und große Fragen“ – nach dem MENJE-Rahmenlehrplan „Leben und
// Gesellschaft“, 7. Klasse: Lernfeld „Mensch, Natur und Technik“ (Tierschutz und Tierrechte; Bewahrung der natürlichen
// Ressourcen), „Kultur und Kommunikation“ (soziale Netzwerke und neue Medien; Mythen und Vernunft: Selbst- und
// Weltdeutungen), „Große Fragen“ (Was ist Religion? Wozu kann Religion dienen?). Viele Karten zum Ausschneiden.
// Religionen und Weltanschauungen sachlich und gleichwertig, auch nichtreligiöse Sichtweisen; Persönliches nur freiwillig.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 3, {
  titel: 'Natur, Medien und große Fragen',
  titelFr: 'Nature, médias et grandes questions',
  unter: 'Tiere schützen, die Erde bewahren, sich im Netz zeigen und respektvoll bleiben, Schöpfungsmythen und Wissenschaft – und die Frage: Was ist Religion, und wozu kann sie dienen? Mit vielen Karten.',
  unterFr: 'Protéger les animaux et la Terre, se montrer en ligne avec respect, mythes et science – et la question : qu’est-ce que la religion ?',
  farbe: '#2f7a8a',
  deckbild: ['chloe:froh:stehen', 'lio:froh:handy', 'amira:ruhig:stehen'],
  blasen: [{ t: 'Haben Tiere Rechte?', x: 10, y: 110 }, { t: '#nofilter', x: 132, y: 96 }, { t: 'Woher kommt alles?', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Natur', fr: 'Nature' }, icon: 'leaf', lektionen: 2 },
    { titel: { de: 'Medien', fr: 'Médias' }, icon: 'device-mobile', lektionen: 2 },
    { titel: { de: 'Mythen und Religion', fr: 'Mythes et religion' }, icon: 'sparkles', lektionen: 4 },
  ],
})

const FRAGE = '#2f7a8a', DILEMMA = '#6d4bc4', NATUR = '#2f8a6b', NETZ = '#d0577b', GLAUBE = '#b5651d'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Tierschutz · Tierrechte', titel: 'Haben Tiere Rechte?', untertitel: 'Haustier, Nutztier, Wildtier: Du liest, wie Tiere geschützt werden, hörst einen Besuch auf einem Bauernhof und entscheidest in schwierigen Tier-Situationen.',
    ziel: { de: 'Ich erkläre, warum Tiere geschützt werden, und begründe meine Meinung zum Umgang mit Tieren.', fr: 'J’explique pourquoi les animaux sont protégés et je justifie mon opinion sur notre façon de les traiter.' },
    bild: ['chloe:froh:stehen', 'ben:froh:stehen'],
    start: {
      was: 'Tiere in meinem Leben',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ordne die Tiere zu: Haustier, Nutztier oder Wildtier? Kreuze an.', stufe: 1, kopf: ['Tier', 'Haustier', 'Nutztier', 'Wildtier'], breiten: [40, 20, 20, 20], zeilen: [['Katze', '[x]', '', ''], ['Kuh', '', '[x]', ''], ['Fuchs', '', '', '[x]'], ['Huhn', '', '[x]', ''], ['Hamster', '[x]', '', ''], ['Reh', '', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Tiere fühlen',
      absaetze: [
        'Tiere können **Schmerz**, **Angst** und **Freude** empfinden. Darum gibt es in vielen Ländern Gesetze zum **Tierschutz**. Im luxemburgischen Tierschutzgesetz von 2018 steht: Tiere sind Lebewesen mit Gefühlen, und ihre **Würde** muss geschützt werden. Niemand darf ein Tier ohne vernünftigen Grund quälen, verletzen oder töten.',
        '### Haustiere',
        'Ein Haustier ist kein Spielzeug. Es braucht jeden Tag Futter, Wasser, Bewegung und Zuwendung, oft viele Jahre lang. Wer ein Tier aussetzt, macht sich strafbar. Vor dem Kauf sollte man sich gut überlegen: Habe ich genug **Zeit**, **Platz** und **Geld**?',
        '### Nutztiere',
        'Viele Tiere leben, damit wir Fleisch, Milch oder Eier bekommen. Wie gut es ihnen geht, ist sehr unterschiedlich. Auf Eiern steht eine Zahl: **0** heißt Bio, **1** Freilandhaltung, **2** Bodenhaltung, **3** Käfighaltung. Manche Menschen essen weniger Fleisch oder gar keins, weil sie Tiere schützen wollen.',
        '### Eine große Frage',
        'Manche sagen: Tiere sollten ähnliche **Rechte** haben wie Menschen. Andere sagen: Menschen dürfen Tiere nutzen, aber sie müssen sie **gut behandeln**. Was denkst du?',
      ],
      woerter: [['der Tierschutz', 'la protection animale'], ['empfinden', 'ressentir'], ['quälen', 'maltraiter'], ['das Haustier', 'l’animal domestique'], ['das Nutztier', 'l’animal d’élevage'], ['aussetzen', 'abandonner'], ['die Haltung', 'l’élevage, la façon d’élever'], ['die Zuwendung', 'l’attention, l’affection']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Tiere können Angst und Schmerz empfinden.', true], ['Ein Haustier auszusetzen ist erlaubt.', false], ['Die Zahl 0 auf dem Ei bedeutet Käfighaltung.', false], ['Vor dem Kauf eines Haustiers sollte man an Zeit, Platz und Geld denken.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Bauernhof · Klassenausflug', titel: 'Bei den Kühen',
      situation: 'Die Klasse besucht einen Bauernhof. Die Bäuerin erklärt, wie sie ihre Tiere hält.',
      bild: ['oma:froh:stehen', 'chloe:froh:stehen'], sprecher: { Bäuerin: 'w1', Chloé: 'w3', Ben: 'm3' },
      text: [
        ['Bäuerin', 'Unsere Kühe sind von Frühling bis Herbst auf der Weide. Im Winter sind sie im Stall, aber sie können sich frei bewegen.'],
        ['Chloé', 'Haben die Kühe Namen?'],
        ['Bäuerin', 'Ja, alle sechzig! Das hier ist Bella. Sie ist schon zehn Jahre alt. Kühe sind neugierig und haben Freundinnen in der Herde.'],
        ['Ben', 'Ist es nicht traurig, wenn eine Kuh geschlachtet wird?'],
        ['Bäuerin', 'Ehrlich gesagt, ja. Das gehört zu unserer Arbeit, aber es fällt mir nicht leicht. Darum ist mir wichtig, dass die Tiere ein gutes Leben haben, solange sie bei uns sind.'],
        ['Chloé', 'Warum ist das Fleisch von Ihrem Hof teurer als im Supermarkt?'],
        ['Bäuerin', 'Weil mehr Platz, Weide und Zeit mehr kosten. Billiges Fleisch kommt oft von Tieren, die sehr eng leben. Jeder kann selbst entscheiden, was er kauft – aber man sollte wissen, was dahintersteckt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Weide? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Wiese, auf der Tiere grasen', 'ein Stall'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wo sind die Kühe von Frühling bis Herbst?', l: 'auf der Weide' }, { f: 'Wie fühlt sich die Bäuerin, wenn eine Kuh geschlachtet wird?', l: 'Es fällt ihr nicht leicht; es ist traurig.' }, { f: 'Warum ist ihr Fleisch teurer?', zeilen: 2, l: 'Mehr Platz, Weide und Zeit kosten mehr.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was ist euch beim Einkaufen wichtig, wenn es um Tiere geht? Sprecht darüber (ohne über das Geld eurer Familie zu reden).', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir ist wichtig, dass …', 'Ich finde schwierig, dass …', 'Ein Kompromiss wäre …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Tierschutz', punkte: ['Tiere **fühlen** Schmerz, Angst, Freude.', 'Gesetz: Tiere nicht **quälen**, nicht **aussetzen**', 'Haustier = **Verantwortung** für Jahre'] },
         { titel: 'Eier-Code', punkte: ['**0** = Bio', '**1** = Freiland', '**2** = Bodenhaltung', '**3** = Käfighaltung'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Tier-Dilemmas: Zieht eine Karte. Was würdet ihr tun? Begründet. Es gibt oft mehrere gute Antworten.', stufe: 3, neueSeite: true, titel: 'Was tust du?', icon: 'paw', farbe: DILEMMA, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Eine Familie aus deiner Straße zieht um. In der neuen Wohnung sind Hunde verboten.', frage: 'Was passiert mit dem Hund?' },
          { text: 'Ein neues Medikament gegen eine schwere Krankheit wird an Mäusen getestet.', frage: 'Ist das in Ordnung?' },
          { text: 'Du findest im Wald ein junges Reh, allein. Es sieht verlassen aus.', frage: 'Mitnehmen oder liegen lassen?' },
          { text: 'Dein Freund möchte seiner Schwester zum Geburtstag einen Welpen schenken – als Überraschung.', frage: 'Gute Idee?' },
          { text: 'Im Urlaub im Ausland zeigt ein Zirkus Elefanten. Ein jüngeres Kind, auf das du aufpasst, möchte unbedingt hin.', frage: 'Was sagst du?' },
          { text: 'Billiges Hähnchen im Angebot – das teurere kommt aus besserer Haltung.', frage: 'Welches kaufst du?' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Tiere sollten ähnliche Rechte haben wie Menschen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Karte aus den Tier-Dilemmas. Schreibe deine Entscheidung mit zwei Gründen auf.', stufe: 2,
        anfaenge: ['Ich habe die Karte gewählt: …', 'Ich würde …', 'Erstens …', 'Zweitens …'], zeilen: 7,
        beispiel: 'Ich habe die Karte mit dem jungen Reh gewählt. Ich würde es liegen lassen und Abstand halten. Erstens kommt die Mutter oft zurück, sie lässt das Kitz nur kurz allein. Zweitens nimmt das Reh sonst unseren Geruch an, und die Mutter erkennt es vielleicht nicht mehr. Wenn es verletzt ist, rufe ich die Polizei oder den Förster an.' },
    ],
    check: ['Ich erkläre, warum Tiere geschützt werden.', 'Ich kenne Pflichten von Haustierbesitzern.', 'Ich begründe meine Meinung in Tier-Dilemmas.'],
  },
  // ================================================================ 2
  {
    thema: 'Natur bewahren · Ressourcen · Generationen', titel: 'Die Erde nur geliehen', untertitel: 'Wasser, Wald, Boden, Rohstoffe: Du lernst den Erdüberlastungstag kennen, hörst ein Gespräch zwischen Großvater und Enkelin und denkst über Verantwortung für die Zukunft nach.',
    ziel: { de: 'Ich erkläre, warum natürliche Ressourcen begrenzt sind, und begründe, welche Verantwortung wir für spätere Generationen haben.', fr: 'J’explique pourquoi les ressources naturelles sont limitées et quelle responsabilité nous avons envers les générations futures.' },
    bild: ['opa:froh:stehen', 'mia:froh:stehen'],
    start: {
      was: 'Ein Sprichwort',
      aufgaben: [
        { art: 'fragen', auftrag: 'Ein Sprichwort sagt: „Wir haben die Erde nicht von unseren Eltern geerbt, wir haben sie von unseren Kindern geliehen.“ Was könnte es bedeuten?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die Erde gehört nicht nur uns; wir müssen sie für die Menschen nach uns gut erhalten.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Wenn das Konto leer ist',
      absaetze: [
        'Die Erde schenkt uns jedes Jahr viel: frisches Wasser, Holz, Fische, Früchte, saubere Luft. Diese Dinge nennt man **natürliche Ressourcen**. Manche wachsen nach, zum Beispiel Wälder – aber nur, wenn wir nicht zu viel nehmen. Andere, wie Erdöl, wachsen gar nicht nach.',
        '### Der Erdüberlastungstag',
        'Umweltforscher berechnen jedes Jahr, an welchem Tag die Menschheit alles verbraucht hat, was die Erde in einem Jahr erneuern kann. Das ist der **Erdüberlastungstag**. In den letzten Jahren lag er weltweit Ende Juli oder Anfang August. Den Rest des Jahres leben wir sozusagen „auf Pump“ – wie mit einem Bankkonto, das im Minus ist.',
        'Für einzelne Länder sieht es sehr unterschiedlich aus. Würden alle Menschen so leben wie in Luxemburg, wäre das Konto schon im **Februar** leer. Ein Grund: Wir verbrauchen viel Energie, fahren viel Auto und kaufen viel. (In Luxemburg tanken auch viele Menschen aus den Nachbarländern – das zählt mit.)',
        '### Nachhaltig leben',
        '**Nachhaltig** heißt: so leben, dass die Menschen nach uns auch noch gut leben können. Das Wort kommt aus der Forstwirtschaft: Man soll nur so viele Bäume fällen, wie wieder nachwachsen.',
      ],
      woerter: [['die Ressource', 'la ressource'], ['nachwachsen', 'repousser, se renouveler'], ['der Erdüberlastungstag', 'le jour du dépassement'], ['auf Pump leben', 'vivre à crédit'], ['nachhaltig', 'durable'], ['die Generation', 'la génération'], ['erben', 'hériter'], ['leihen', 'emprunter']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was ist der Erdüberlastungstag?', zeilen: 2, l: 'der Tag, an dem die Menschheit alles verbraucht hat, was die Erde in einem Jahr erneuern kann' }, { f: 'Woher kommt das Wort „nachhaltig“?', l: 'aus der Forstwirtschaft: nur so viele Bäume fällen, wie nachwachsen' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Spaziergang im Wald', titel: 'Opa und der Baum',
      situation: 'Mia geht mit ihrem Opa im Wald spazieren. Er pflanzt einen kleinen Baum.',
      bild: ['opa:froh:stehen', 'mia:verwirrt:stehen'], sprecher: { Opa: 'm1', Mia: 'w3' },
      text: [
        ['Mia', 'Opa, warum pflanzt du eine Eiche? Bis die groß ist, dauert es doch hundert Jahre!'],
        ['Opa', 'Genau deshalb. Ich werde sie nicht groß sehen. Aber deine Kinder vielleicht. Und deren Kinder.'],
        ['Mia', 'Aber was hast du dann davon?'],
        ['Opa', 'Die alten Buchen hier hat auch jemand gepflanzt, den ich nie gekannt habe. Ich habe mein ganzes Leben von ihrem Schatten profitiert. Jetzt gebe ich etwas zurück.'],
        ['Mia', 'Wie eine Kette, die man weitergibt.'],
        ['Opa', 'Schön gesagt. Viele Dinge, die wir heute tun – wie viel Energie wir verbrauchen, wie viel Müll wir machen – merken erst die Menschen in fünfzig Jahren.'],
        ['Mia', 'Dann pflanze ich nächstes Jahr auch einen Baum. Für meine Enkel.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie lange braucht eine Eiche ungefähr, bis sie groß ist? Rate!', stufe: 1, fragen: [{ f: '', o: ['etwa 5 Jahre', 'etwa 100 Jahre', 'etwa 1000 Jahre'], r: 1 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Opa pflanzt eine Buche.', false], ['Opa wird die Eiche nicht groß sehen.', true], ['Opa hat von Bäumen profitiert, die andere gepflanzt haben.', true], ['Mia will nie einen Baum pflanzen.', false]] },
        { art: 'fragen', auftrag: 'Was meint Mia mit „wie eine Kette, die man weitergibt“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Jede Generation bekommt etwas von den Früheren und gibt etwas an die Späteren weiter.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was möchtet ihr den Menschen in fünfzig Jahren hinterlassen? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich möchte, dass es in 50 Jahren noch … gibt.', 'Dafür können wir heute …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ressourcen', punkte: ['**nachwachsend**: Wald, Fische – wenn wir nicht zu viel nehmen', '**nicht nachwachsend**: Erdöl, Kohle, Metalle', '**Erdüberlastungstag**: weltweit Ende Juli/Anfang August'] },
         { titel: 'Nachhaltigkeit', punkte: ['so leben, dass auch **später** gut gelebt werden kann', 'Verantwortung für **künftige Generationen**', 'Ursprung: **Forstwirtschaft**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Zukunfts-Karten: Schneidet die Karten aus. Sortiert: Was macht ihr schon? Was könntet ihr ab morgen tun? Was ist (noch) schwierig? Ergänzt eigene Ideen.', stufe: 2, neueSeite: true, titel: 'Für morgen', icon: 'leaf', farbe: NATUR, spalten: 3,
        karten: [
          { text: 'Licht ausmachen, wenn ich gehe' }, { text: 'kurz duschen' }, { text: 'Fahrrad, Bus oder zu Fuß' },
          { text: 'Trinkflasche statt Plastikflasche' }, { text: 'Reste aufessen statt wegwerfen' }, { text: 'Kleidung tauschen oder gebraucht kaufen' },
          { text: 'einen Baum oder Blumen pflanzen' }, { text: ' ', linien: 2 }, { text: ' ', linien: 2 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Wir haben eine Pflicht gegenüber Menschen, die noch gar nicht geboren sind.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an einen jungen Menschen im Jahr 2076. Was wünschst du ihm? Was hast du getan, damit die Erde gut für ihn ist?', stufe: 2,
        anfaenge: ['Lieber Mensch im Jahr 2076,', 'ich lebe im Jahr …', 'Ich hoffe, dass …', 'Ich habe versucht, …'], zeilen: 8,
        beispiel: 'Lieber Mensch im Jahr 2076, ich lebe im Jahr 2026 in Luxemburg. Ich hoffe, dass es bei dir noch Wälder, Bienen und Schnee im Winter gibt. Ich habe versucht, weniger wegzuwerfen, mit dem Fahrrad zu fahren und mit meiner Klasse Bäume zu pflanzen. Vielleicht steht einer davon noch. Setz dich in seinen Schatten und denk an uns!' },
    ],
    check: ['Ich unterscheide nachwachsende und nicht nachwachsende Ressourcen.', 'Ich erkläre den Erdüberlastungstag.', 'Ich begründe unsere Verantwortung für die Zukunft.'],
  },
  // ================================================================ 3
  {
    thema: 'Soziale Netzwerke · Selbstdarstellung', titel: 'Echt oder gefiltert?', untertitel: 'Likes, Filter, perfekte Bilder: Du liest, wie soziale Netzwerke funktionieren, hörst ein Gespräch über ein bearbeitetes Foto und philosophierst über „echt sein“ im Netz.',
    ziel: { de: 'Ich erkläre, wie Selbstdarstellung in sozialen Netzwerken funktioniert, und denke kritisch darüber nach.', fr: 'J’explique comment fonctionne l’image de soi sur les réseaux sociaux et j’y réfléchis de façon critique.' },
    bild: ['jana:froh:handy', 'lea:froh:handy'],
    start: {
      was: 'Was zeigt man?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was posten viele Menschen in sozialen Netzwerken? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['schöne Urlaubsfotos', 'gutes Essen', 'Erfolge', 'langweilige Tage', 'Streit mit Freunden'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die Bühne in der Hosentasche',
      absaetze: [
        'In sozialen Netzwerken zeigen Menschen Ausschnitte aus ihrem Leben: Fotos, Videos, Gedanken. Meistens zeigen sie die **schönsten Momente** – den Sonnenuntergang am Strand, nicht den Regentag im Bett. Viele Bilder sind mit **Filtern** bearbeitet: Die Haut ist glatter, die Augen größer, der Himmel blauer.',
        '### Likes',
        'Für ein Like bekommt das Gehirn eine kleine Belohnung, ein gutes Gefühl. Darum wollen viele immer mehr Likes. Wer wenige bekommt, fühlt sich manchmal schlecht oder fragt sich: „Bin ich nicht gut genug?“',
        '### Vergleichen',
        'Wer immer die perfekten Bilder der anderen sieht, vergleicht sich schnell. Dabei vergisst man: Das ist nur die **Schokoladenseite**. Niemand zeigt jeden Tag alles. Studien zeigen, dass viel Vergleichen unzufrieden machen kann.',
        '### Was hilft?',
        'Sich bewusst machen, dass Bilder bearbeitet sind. Accounts folgen, die gute Laune machen und echt sind. Pausen vom Handy machen. Und sich fragen: **Warum poste ich das – für mich oder für die Likes?**',
      ],
      woerter: [['das soziale Netzwerk', 'le réseau social'], ['posten', 'publier'], ['der Filter', 'le filtre'], ['bearbeiten', 'retoucher'], ['die Belohnung', 'la récompense'], ['sich vergleichen', 'se comparer'], ['die Schokoladenseite', 'le meilleur côté'], ['unzufrieden', 'insatisfait']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was machen Filter mit Bildern?', l: 'Sie verändern sie: glattere Haut, größere Augen, blauerer Himmel.' }, { f: 'Warum wollen viele immer mehr Likes?', l: 'Das Gehirn bekommt für ein Like eine kleine Belohnung, ein gutes Gefühl.' }, { f: 'Was bedeutet „Schokoladenseite“?', l: 'die schönste Seite, die man zeigt' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Jugendhaus · Sofaecke', titel: 'Das perfekte Foto',
      situation: 'Jana zeigt Lea ein Foto, das sie posten will. Sie hat es stark bearbeitet.',
      bild: ['jana:verlegen:handy', 'lea:froh:stehen'], sprecher: { Jana: 'w2', Lea: 'w3' },
      text: [
        ['Jana', 'Schau mal, ist das Foto gut so? Ich habe einen Filter benutzt und die Pickel weggemacht.'],
        ['Lea', 'Hm. Sieht schön aus. Aber ehrlich – das bist nicht ganz du. Deine Augen sind viel größer und deine Nase ist ganz anders.'],
        ['Jana', 'Alle machen das! Wenn ich ein normales Foto poste, bekommt es keine Likes.'],
        ['Lea', 'Und wie fühlst du dich, wenn das gefilterte Foto hundert Likes bekommt?'],
        ['Jana', 'Erst gut. Und dann … komisch. Als ob die Leute jemand anderen mögen.'],
        ['Lea', 'Ich habe letzte Woche ein Foto ohne Filter gepostet, nach dem Sport, total verschwitzt. Das hat sogar mehr Kommentare bekommen. Die Leute fanden es lustig und echt.'],
        ['Jana', 'Vielleicht probiere ich das auch mal. Aber nur, wenn du mich nicht auslachst!'],
        ['Lea', 'Versprochen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „gefiltert“ bei einem Foto? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit einer App verändert', 'ohne Farbe'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Jana hat das Foto mit einem Filter bearbeitet.', true], ['Lea findet, dass das Foto genau wie Jana aussieht.', false], ['Jana fühlt sich mit vielen Likes nur gut.', false], ['Leas Foto ohne Filter bekam sogar mehr Kommentare.', true]] },
        { art: 'fragen', auftrag: 'Warum fühlt sich Jana „komisch“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil die Likes für ein verändertes Bild sind – als ob die Leute jemand anderen mögen und nicht sie selbst.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ist es in Ordnung, Fotos zu bearbeiten? Wo ist für euch die Grenze?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ein bisschen bearbeiten finde ich …', 'Es wird schwierig, wenn …', 'Ehrlich wäre, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Soziale Netzwerke', punkte: ['zeigen meist die **Schokoladenseite**', 'viele Bilder sind **gefiltert**', '**Likes** belohnen das Gehirn', 'Vergleichen kann **unzufrieden** machen'] },
         { titel: 'Gut damit umgehen', punkte: ['Bilder **kritisch** anschauen', 'Accounts folgen, die **guttun**', '**Pausen** machen', 'fragen: **für wen** poste ich das?'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gesprächskarten „Ich im Netz“: Zieht eine Karte und sprecht darüber. Ihr müsst nichts Persönliches erzählen.', stufe: 2, neueSeite: true, titel: 'Ich im Netz', icon: 'device-mobile', farbe: NETZ, spalten: 2,
        karten: [
          { text: 'Ist ein Mensch mit vielen Followern wichtiger als einer mit wenigen?' },
          { text: 'Sind Likes echte Anerkennung?' },
          { text: 'Darf man im Netz jemand anderes sein als im echten Leben?' },
          { text: 'Würdest du ein Jahr ohne soziale Netzwerke leben wollen?' },
          { text: 'Warum zeigen fast alle nur ihre schönen Momente?' },
          { text: 'Was würdest du nie posten – und warum?' },
          { text: 'Kann man im Internet echte Freunde finden?' },
          { text: 'Wer hat mehr Einfluss: Influencer oder deine Freunde?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Post (ohne Filter!) über einen ganz normalen Tag – von dir oder einer ausgedachten Person. Was ist schön daran, obwohl er nicht perfekt ist?', stufe: 2,
        anfaenge: ['Heute war ein ganz normaler Tag.', 'Nicht perfekt war …', 'Aber schön war …', '#nofilter'], zeilen: 6,
        beispiel: 'Heute war ein ganz normaler Tag. Nicht perfekt war, dass es geregnet hat und ich meinen Bus verpasst habe. Aber schön war, dass mein Freund mit mir gewartet hat und wir die ganze Zeit gelacht haben. Abends gab es meine Lieblingssuppe. #nofilter' },
    ],
    check: ['Ich erkläre, wie Filter und Likes wirken.', 'Ich erkenne die „Schokoladenseite“ in Posts.', 'Ich denke darüber nach, was „echt sein“ im Netz bedeutet.'],
  },
  // ================================================================ 4
  {
    thema: 'Kommunikation im Netz · Respekt · Hassrede', titel: 'Hinter jedem Profil ein Mensch', untertitel: 'Kommentare, Memes, Hassnachrichten: Du lernst, warum Menschen online gemeiner sind, hörst, wie eine Klasse auf Hass reagiert, und schreibst eure Netz-Regeln.',
    ziel: { de: 'Ich erkenne Hassrede und reagiere respektvoll und mutig im Netz.', fr: 'Je reconnais les discours de haine et je réagis avec respect et courage en ligne.' },
    bild: ['yusuf:besorgt:handy', 'noah:froh:stehen'],
    start: {
      was: 'Kommentare',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ein Video zeigt jemanden beim Singen. Welche Kommentare sind respektvoll? Kreuze an.', stufe: 1, kopf: ['Kommentar', 'respektvoll', 'verletzend'], breiten: [60, 20, 20], zeilen: [['„Mutig, dass du das zeigst!“', '[x]', ''], ['„Hör auf, du nervst. 🤮“', '', '[x]'], ['„Der Anfang war super, am Ende etwas zu hoch.“', '[x]', ''], ['„Niemand will dich hören, lösch dich.“', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Online ist auch echt',
      absaetze: [
        'Im Netz schreiben manche Menschen Dinge, die sie nie jemandem ins Gesicht sagen würden. Warum? Man sieht die andere Person nicht, man sieht nicht, wie sie traurig wird. Man fühlt sich **anonym**. Und wenn viele gemein sind, macht man leichter mit.',
        '### Was ist Hassrede?',
        '**Hassrede** sind Beiträge, die Menschen beleidigen, bedrohen oder herabsetzen – oft wegen ihrer Herkunft, Religion, Hautfarbe, Behinderung, ihres Aussehens oder weil sie jemanden vom gleichen Geschlecht lieben. Manche Hassrede ist auch **strafbar**, zum Beispiel Drohungen oder Aufrufe zu Gewalt.',
        '### Was kann ich tun?',
        '**Nicht mitmachen:** nicht liken, nicht teilen. **Gegenrede:** freundlich, aber klar widersprechen, zum Beispiel: „Das ist nicht okay.“ **Unterstützen:** Der betroffenen Person schreiben: „Ich stehe zu dir.“ **Melden:** Beiträge auf der Plattform melden. In Luxemburg kann man illegale Inhalte bei der **BEE SECURE Stopline** melden. **Hilfe holen:** bei Vertrauenspersonen, der BEE SECURE Helpline (8002 1234) oder bei 116 111.',
        'Wichtig: Hinter jedem Profil steckt ein **echter Mensch** mit Gefühlen.',
      ],
      woerter: [['der Kommentar', 'le commentaire'], ['anonym', 'anonyme'], ['die Hassrede', 'le discours de haine'], ['beleidigen', 'insulter'], ['bedrohen', 'menacer'], ['herabsetzen', 'rabaisser'], ['melden', 'signaler'], ['die Gegenrede', 'le contre-discours']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was kann man gegen Hass im Netz tun? Ordne von „sofort und leicht“ bis „mit Hilfe“.', stufe: 2, teile: ['nicht liken und nicht teilen', 'freundlich, aber klar widersprechen', 'der betroffenen Person Unterstützung schreiben', 'den Beitrag melden', 'eine Vertrauensperson oder Helpline einschalten'], ordnung: [3, 0, 4, 2, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klassenchat und Pause', titel: 'Die Kommentare unter Yusufs Video',
      situation: 'Yusuf hat ein Video von sich beim Tanzen gepostet. Darunter stehen gemeine Kommentare.',
      bild: ['yusuf:traurig:handy', 'noah:froh:stehen'], sprecher: { Noah: 'm3', Yusuf: 'm2', Amira: 'w2' },
      text: [
        ['Noah', 'Yusuf, ich habe die Kommentare unter deinem Video gesehen. Geht’s dir gut?'],
        ['Yusuf', 'Nicht so. Jemand schreibt, ich soll in mein Land zurückgehen. Dabei bin ich hier geboren. Und andere haben das geliked.'],
        ['Amira', 'Das ist richtig gemein. Und das mit dem Land ist rassistisch. Das muss man melden.'],
        ['Noah', 'Ich habe drunter geschrieben: „Yusuf tanzt besser als wir alle. Hass ist nicht cool.“ Jetzt haben schon zwanzig Leute meinen Kommentar geliked.'],
        ['Yusuf', 'Echt? Danke, Mann.'],
        ['Amira', 'Wir können zusammen die Kommentare melden. Und wenn es nicht aufhört, sagen wir es Frau Kremer.'],
        ['Yusuf', 'Okay. Ich lösche das Video aber nicht. Ich tanze gern.'],
        ['Noah', 'Genau. Lass dir das nicht wegnehmen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „rassistisch“? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['Menschen wegen Herkunft oder Hautfarbe abwerten', 'Sport machen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer tut was?', stufe: 1, kopf: ['Wer?', 'Was tut sie / er?'], breiten: [20, 80], zeilen: [['Noah', '[schreibt eine Gegenrede: „Hass ist nicht cool“, fragt Yusuf, wie es ihm geht]'], ['Amira', '[nennt den Kommentar rassistisch, will melden und Frau Kremer Bescheid sagen]'], ['Yusuf', '[löscht das Video nicht, weil er gern tanzt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat Yusuf geholfen? Was hättet ihr noch tun können?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Geholfen hat …', 'Ich hätte noch …', 'Wichtig ist, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Hassrede', punkte: ['**beleidigt**, **bedroht**, **setzt herab**', 'oft wegen Herkunft, Religion, Aussehen …', 'manchmal **strafbar**'] },
         { titel: 'Was ich tun kann', nummern: true, punkte: ['**nicht mitmachen**', '**Gegenrede** und **Unterstützung**', '**melden** (Plattform, BEE SECURE Stopline)', '**Hilfe holen**: 8002 1234, 116 111'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gegenrede-Karten: Schneidet die Karten aus. Lest einen gemeinen Kommentar und sucht gemeinsam eine gute, ruhige Antwort. Schreibt sie auf die leeren Karten.', stufe: 3, neueSeite: true, titel: 'Was antwortest du?', icon: 'message-circle', farbe: NETZ, spalten: 2,
        karten: [
          { text: '„Mit der Figur sollte die nicht ins Schwimmbad.“', linien: 2 },
          { text: '„Typisch Mädchen, keine Ahnung von Fußball.“', linien: 2 },
          { text: '„Wer so redet, gehört nicht hierher.“', linien: 2 },
          { text: '„Alle aus der 7P2 sind dumm.“', linien: 2 },
          { text: '„Lol, der hat ja nicht mal ein richtiges Handy.“', linien: 2 },
          { text: '„Sag mal, bist du behindert oder was?“', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibt fünf Netz-Regeln für euren Klassenchat. Begründet die wichtigste.', stufe: 2,
        zeilenAnfaenge: ['1. …', '2. …', '3. …', '4. …', '5. …', 'Am wichtigsten ist Regel …, weil …'], zeilen: 7,
        beispiel: '1. Wir schreiben nichts, was wir nicht auch ins Gesicht sagen würden. 2. Keine Fotos ohne Erlaubnis. 3. Wir lachen niemanden aus. 4. Wer Hass sieht, macht nicht mit und sagt Bescheid. 5. Nach 21 Uhr schreiben wir nur, wenn es wichtig ist. Am wichtigsten ist Regel 1, weil man online schnell vergisst, dass ein echter Mensch liest.' },
    ],
    check: ['Ich erkenne Hassrede.', 'Ich kenne Wege, darauf zu reagieren.', 'Ich weiß, wo ich Hilfe bekomme.'],
  },
  // ================================================================ 5
  {
    thema: 'Mythen · Schöpfungsgeschichten', titel: 'Wie die Welt entstand', untertitel: 'Ein Riese aus Eis, ein Ei im Chaos, sieben Tage: Du liest Schöpfungsgeschichten aus verschiedenen Kulturen, hörst einen Mythos und vergleichst sie.',
    ziel: { de: 'Ich vergleiche Schöpfungsmythen und erkläre, warum Menschen solche Geschichten erzählen.', fr: 'Je compare des mythes de création et j’explique pourquoi les hommes racontent de telles histoires.' },
    bild: ['amira:ruhig:stehen', 'finn:ueberrascht:stehen'],
    start: {
      was: 'Große Fragen',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Welche großen Fragen haben sich Menschen schon immer gestellt? Ergänze.', stufe: 1, mitte: 'Große Fragen', aeste: ['Woher kommt die Welt?', { l: 'Warum gibt es Menschen?' }, { l: 'Was passiert nach dem Tod?' }, { l: 'Warum gibt es Gutes und Böses?' }, { l: 'Gibt es einen Gott?' }, { l: 'Was ist der Sinn des Lebens?' }] },
      ],
    },
    lesen: {
      was: 'Drei Schöpfungsgeschichten', art: 'dokumente', stimme: 'w1',
      quelle: 'Nacherzählt und stark vereinfacht', titel: 'Am Anfang …',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**China: Pangu und das Ei**', text: ['Am Anfang war alles ein dunkles Durcheinander, wie in einem riesigen Ei. Darin schlief der Riese **Pangu**. Als er erwachte, zerbrach er das Ei. Das Leichte stieg nach oben und wurde der Himmel, das Schwere sank nach unten und wurde die Erde. Pangu stemmte sie 18 000 Jahre lang auseinander. Als er starb, wurde sein Atem zum Wind, seine Augen zu Sonne und Mond, sein Körper zu Bergen und Flüssen.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Nordeuropa: Feuer und Eis**', text: ['Ganz am Anfang gab es nur eine riesige Leere. Im Norden war eisige Kälte, im Süden loderndes Feuer. Wo sich Eis und Feuer trafen, schmolz das Eis, und aus den Tropfen entstand der Riese **Ymir**. Später formten die Götter aus seinem Körper die Welt: aus seinem Fleisch die Erde, aus seinem Blut das Meer, aus seinem Schädel den Himmel.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Bibel: Die Schöpfung in sieben Tagen**', text: ['Im ersten Buch der Bibel, das für Juden und Christen heilig ist, erschafft **Gott** die Welt durch sein Wort. Am Anfang ist die Erde wüst und leer, und es ist dunkel. „Es werde Licht“, sagt er, und es wird Licht. An sechs Tagen erschafft er Himmel und Erde, Meere, Pflanzen, Sonne, Mond und Sterne, Tiere und zuletzt den Menschen. Am siebten Tag ruht Gott. Er sieht alles an, „und siehe, es war sehr gut“.'] },
      ],
      woerter: [['der Mythos', 'le mythe'], ['die Schöpfung', 'la création'], ['erschaffen', 'créer'], ['der Riese', 'le géant'], ['das Durcheinander', 'le chaos'], ['stemmen', 'soulever, pousser'], ['die Leere', 'le vide'], ['heilig', 'sacré']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche die drei Geschichten.', stufe: 2, kopf: ['', 'Pangu (China)', 'Ymir (Nordeuropa)', 'Bibel'], breiten: [22, 26, 26, 26], zeilen: [['Am Anfang war …', '[ein dunkles Durcheinander wie ein Ei]', '[eine riesige Leere, Eis und Feuer]', '[Gott (und Dunkelheit)]'], ['Wer erschafft?', '[der Riese Pangu]', '[die Götter aus dem Riesen Ymir]', '[Gott durch sein Wort]'], ['Woraus wird die Welt?', '[aus Pangus Körper]', '[aus Ymirs Körper]', '[durch Gottes Wort]']] },
        { art: 'fragen', auftrag: 'Was haben die Geschichten gemeinsam?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'z. B. Am Anfang ist Chaos oder Leere; dann entsteht Ordnung: Himmel und Erde werden getrennt; eine besondere Kraft erschafft die Welt.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Bibliothek · Lesecke', titel: 'Stimmt das denn?',
      situation: 'Finn und Amira haben die Schöpfungsgeschichten gelesen. Die Bibliothekarin hört zu.',
      bild: ['finn:verwirrt:stehen', 'lehrerin:ruhig:erklaeren'], sprecher: { Finn: 'm3', Amira: 'w2', Bibliothekarin: 'w1' },
      text: [
        ['Finn', 'Ein Riese, aus dessen Blut das Meer wird? Das ist doch Quatsch. Wir wissen doch, dass es den Urknall gab.'],
        ['Bibliothekarin', 'Die Menschen, die diese Geschichten erzählt haben, waren nicht dumm. Sie wollten vielleicht gar nicht genau erklären, wie die Welt entstanden ist – sondern etwas anderes sagen.'],
        ['Amira', 'Was denn?'],
        ['Bibliothekarin', 'Zum Beispiel, dass die Welt geordnet ist und dass der Mensch einen Platz darin hat. Oder in der Bibel: dass die Welt gut ist, und dass es einen Ruhetag braucht.'],
        ['Finn', 'Also eher wie ein Bild, nicht wie ein Bericht?'],
        ['Bibliothekarin', 'Genau. Mythen antworten oft auf die Frage „Warum?“ oder „Was bedeutet das?“. Die Wissenschaft antwortet eher auf die Frage „Wie?“.'],
        ['Amira', 'Dann können beide wichtig sein.'],
        ['Bibliothekarin', 'Das sehen viele Menschen so. Manche sehen es auch anders. Darüber kann man gut nachdenken.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist der „Urknall“? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['die wissenschaftliche Erklärung für den Anfang des Weltalls', 'ein Feuerwerk'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was findet Finn am Anfang?', l: 'Dass die Geschichten Quatsch sind, weil es den Urknall gab.' }, { f: 'Auf welche Frage antworten Mythen oft, auf welche die Wissenschaft?', zeilen: 2, l: 'Mythen: „Warum?“ / „Was bedeutet das?“; Wissenschaft: „Wie?“' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Seid ihr einverstanden mit Amira, dass beide wichtig sein können? Sprecht nach den Regeln zum Philosophieren.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich denke, …, weil …', 'Ein Beispiel ist …', 'Da bin ich anderer Meinung: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Mythen', punkte: ['alte **Geschichten** über Anfang und Sinn der Welt', 'in **allen Kulturen**', 'antworten auf **„Warum?“**', 'sprechen in **Bildern**'] },
         { titel: 'Gemeinsamkeiten', punkte: ['am Anfang **Chaos** oder **Leere**', 'dann **Ordnung**: Himmel und Erde', 'der **Mensch** bekommt einen Platz'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Mythen-Karten: Schneidet die Karten aus. Jede Gruppe zieht eine Karte und erfindet einen kurzen Mythos dazu, mit Bildern statt Erklärungen. Erzählt ihn der Klasse.', stufe: 2, neueSeite: true, titel: 'Erfinde einen Mythos', icon: 'sparkles', farbe: GLAUBE, spalten: 2,
        karten: [
          { text: 'Warum ist der Himmel blau?' }, { text: 'Woher kommen die Sterne?' },
          { text: 'Warum gibt es Tag und Nacht?' }, { text: 'Warum lachen Menschen?' },
          { text: 'Woher kommt der Regenbogen?' }, { text: 'Warum gibt es Freundschaft?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe deinen eigenen Mythos zu einer Karte. Beginne mit „Am Anfang …“.', stufe: 2,
        anfaenge: ['Am Anfang …', 'Da geschah es, dass …', 'Seitdem …'], zeilen: 8,
        beispiel: 'Am Anfang war der Himmel schwarz und leer. Da lebte ein kleiner Vogel, der traurig war, weil er sich im Dunkeln nicht zurechtfand. Er flog immer höher und pickte Löcher in die Dunkelheit. Durch jedes Loch fiel ein bisschen Licht von der anderen Seite. Seitdem leuchten nachts die Sterne, damit niemand allein im Dunkeln ist.' },
    ],
    check: ['Ich erzähle eine Schöpfungsgeschichte nach.', 'Ich vergleiche Mythen aus verschiedenen Kulturen.', 'Ich erkläre den Unterschied zwischen „Warum?“ und „Wie?“.'],
  },
  // ================================================================ 6
  {
    thema: 'Mythos und Vernunft · Erklärungen der Welt', titel: 'Donnergott oder Elektrizität?', untertitel: 'Früher erklärten Menschen Gewitter mit Göttern, heute mit Physik: Du vergleichst Erklärungen, hörst ein Gespräch über Aberglauben und philosophierst: Kann man alles erklären?',
    ziel: { de: 'Ich unterscheide mythische und wissenschaftliche Erklärungen und denke über die Grenzen des Wissens nach.', fr: 'Je distingue explications mythiques et scientifiques et je réfléchis aux limites du savoir.' },
    bild: ['ben:froh:stehen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Aberglaube?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche dieser Dinge sind Aberglaube? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Eine schwarze Katze bringt Unglück.', 'Freitag, der 13., ist ein Unglückstag.', 'Ein Glücksbringer bringt Glück bei der Prüfung.', 'Wasser kocht bei 100 Grad.'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Zwei Arten zu erklären',
      absaetze: [
        'Vor langer Zeit glaubten die Menschen im Norden Europas: Wenn es donnert, schlägt der Gott **Thor** mit seinem Hammer. Die alten Griechen dachten, der Göttervater **Zeus** schleudere Blitze. So erklärten sie sich, was sie sahen und was ihnen Angst machte.',
        '### Die Wissenschaft',
        'Heute weiß man: In Gewitterwolken reiben Eiskristalle und Wassertropfen aneinander. Dadurch lädt sich die Wolke **elektrisch** auf. Ein Blitz ist eine riesige elektrische Entladung. Der Donner ist der Knall, weil die Luft um den Blitz plötzlich sehr heiß wird und sich ausdehnt.',
        'Die Wissenschaft geht so vor: **beobachten**, eine **Vermutung** aufstellen, **überprüfen** (zum Beispiel mit Versuchen), und wenn nötig die Erklärung **ändern**. Diese Art zu denken nennt man **Vernunft** oder rationales Denken.',
        '### Kann man alles erklären?',
        'Vieles kann die Wissenschaft heute erklären. Andere Fragen beantwortet sie nicht: Was ist gut und böse? Was ist der Sinn meines Lebens? Warum gibt es überhaupt etwas und nicht nichts? Darüber denken Philosophie und Religionen nach – und jeder Mensch für sich.',
      ],
      woerter: [['erklären', 'expliquer'], ['der Aberglaube', 'la superstition'], ['das Gewitter', 'l’orage'], ['die Entladung', 'la décharge'], ['die Vermutung', 'l’hypothèse'], ['überprüfen', 'vérifier'], ['die Vernunft', 'la raison'], ['der Sinn', 'le sens']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'So arbeitet die Wissenschaft: Ordne.', stufe: 1, teile: ['beobachten', 'eine Vermutung aufstellen', 'überprüfen, zum Beispiel mit einem Versuch', 'die Erklärung bestätigen oder ändern'], ordnung: [2, 0, 3, 1] },
        { art: 'tabelle', auftrag: 'Mythisch oder wissenschaftlich? Kreuze an.', stufe: 2, kopf: ['Erklärung', 'mythisch', 'wissen­schaftlich'], breiten: [64, 18, 18], zeilen: [['Thor schlägt mit dem Hammer.', '[x]', ''], ['Die Wolke lädt sich elektrisch auf.', '', '[x]'], ['Die Sonne fährt mit einem Wagen über den Himmel.', '[x]', ''], ['Die Erde dreht sich um sich selbst, darum gibt es Tag und Nacht.', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Vor der Mathe-Prüfung', titel: 'Der Glücksstift',
      situation: 'Vor einer Prüfung reden Ben und Nele über Glücksbringer.',
      bild: ['ben:nervoes:stehen', 'nele:froh:rollstuhl'], sprecher: { Ben: 'm3', Nele: 'w3' },
      text: [
        ['Ben', 'Hast du meinen grünen Stift gesehen? Ohne den Glücksstift schreibe ich keine gute Note!'],
        ['Nele', 'Ben, du glaubst doch nicht wirklich, dass ein Stift Mathe kann?'],
        ['Ben', 'Na ja … Letztes Mal hatte ich ihn und habe eine gute Note geschrieben.'],
        ['Nele', 'Und hast du vorher gelernt?'],
        ['Ben', 'Ja, drei Tage lang.'],
        ['Nele', 'Siehst du. Vielleicht war es das Lernen, nicht der Stift. Das müsste man überprüfen: einmal mit Stift ohne Lernen, einmal ohne Stift mit Lernen.'],
        ['Ben', 'Haha, das Experiment mache ich lieber nicht. Aber ehrlich: Der Stift beruhigt mich. Dann bin ich weniger nervös.'],
        ['Nele', 'Okay, das verstehe ich. Dann hilft er dir vielleicht doch – nur anders, als du dachtest.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Glücksbringer? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Gegenstand, der Glück bringen soll', 'ein Briefträger'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Ben hat vor der letzten Prüfung drei Tage gelernt.', true], ['Nele glaubt, dass der Stift Mathe kann.', false], ['Nele schlägt ein Experiment vor.', true], ['Der Stift hilft Ben, weniger nervös zu sein.', true]] },
        { art: 'fragen', auftrag: 'Wie hilft der Stift Ben „anders, als er dachte“?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Er bringt kein Glück, aber er beruhigt Ben; ruhiger kann er besser denken.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Habt ihr Rituale oder Glücksbringer vor wichtigen Momenten? Was bewirken sie wirklich? (Nur erzählen, wenn ihr wollt.)', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Manche Menschen …', 'Ich glaube, es hilft, weil …', 'Eigentlich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Mythische Erklärung', punkte: ['**Götter** oder Wesen bewirken etwas', 'erzählt in **Geschichten**', 'nicht **überprüfbar**'] },
         { titel: 'Wissenschaftliche Erklärung', nummern: true, punkte: ['**beobachten**', '**vermuten**', '**überprüfen**', '**bestätigen** oder **ändern**'] }],
        [{ art: 'tipp', titel: 'Grenzen', text: 'Die Wissenschaft erklärt, **wie** etwas geschieht. Fragen nach **Sinn**, **Gut und Böse** oder **Gott** beantwortet sie nicht. Darüber denken Philosophie, Religionen und jeder Mensch selbst nach.' }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Philosophie-Karten: Zieht eine Karte und philosophiert in der Gruppe. Gibt es eine Antwort? Kann die Wissenschaft sie geben?', stufe: 3, neueSeite: true, titel: 'Große Frage', icon: 'help-circle', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Warum gibt es überhaupt etwas und nicht nichts?' }, { text: 'Kann ein Computer eines Tages fühlen?' },
          { text: 'Gibt es Dinge, die man nie wissen kann?' }, { text: 'Ist etwas wahr, wenn viele Menschen es glauben?' },
          { text: 'Woher weißt du, dass du nicht träumst?' }, { text: 'Kann man beweisen, dass jemand dich mag?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Philosophie-Karte. Schreibe deine Gedanken auf: Was denkst du? Welche Gründe hast du? Was bleibt offen?', stufe: 3,
        anfaenge: ['Meine Frage: …', 'Ich denke, …', 'Ein Grund ist …', 'Offen bleibt …'], zeilen: 8,
        beispiel: 'Meine Frage: Ist etwas wahr, wenn viele Menschen es glauben? Ich denke, nein. Ein Grund ist, dass früher fast alle glaubten, die Sonne drehe sich um die Erde – und es war trotzdem falsch. Aber wenn viele etwas glauben, sollte man gut zuhören und prüfen. Offen bleibt, wie man bei Fragen ohne Beweis entscheiden soll, was wahr ist.' },
    ],
    check: ['Ich unterscheide mythische und wissenschaftliche Erklärungen.', 'Ich beschreibe, wie die Wissenschaft vorgeht.', 'Ich erkenne Fragen, die die Wissenschaft nicht beantwortet.'],
  },
  // ================================================================ 7
  {
    thema: 'Was ist Religion? · Weltreligionen', titel: 'Was ist Religion?', untertitel: 'Glaube, heilige Schriften, Rituale, Gemeinschaft: Du lernst Merkmale von Religionen kennen, ordnest Symbole den großen Weltreligionen zu und hörst, wie verschieden Menschen glauben – oder nicht glauben.',
    ziel: { de: 'Ich nenne Merkmale von Religionen und ordne Symbole und Begriffe den Weltreligionen zu.', fr: 'Je cite des caractéristiques des religions et j’associe symboles et notions aux grandes religions.' },
    bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:stehen'],
    start: {
      was: 'Symbole',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche religiösen Symbole kennst du? Beschreibe oder zeichne eines.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Kreuz, Halbmond, Davidstern, Om-Zeichen, Rad mit acht Speichen' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen grob gerundet', titel: 'Viele Wege',
      absaetze: [
        'Auf der Welt gibt es sehr viele Religionen. Trotz aller Unterschiede haben sie oft **ähnliche Merkmale**: einen **Glauben** an Gott, an Götter oder an eine höhere Wirklichkeit; **heilige Schriften**; **Rituale** wie Beten, Feste oder Pilgern; **heilige Orte** wie Kirche, Moschee, Synagoge oder Tempel; eine **Gemeinschaft**; und **Regeln** für ein gutes Leben.',
        '### Die großen Weltreligionen',
        '**Christentum** (über 2 Milliarden Menschen): Glaube an Gott und an **Jesus Christus**; Schrift: die **Bibel**; Symbol: das **Kreuz**. **Islam** (fast 2 Milliarden): Glaube an **Allah**, den einen Gott, und an den Propheten **Mohammed**; Schrift: der **Koran**; Symbol oft: **Halbmond und Stern**. **Hinduismus** (über 1 Milliarde): viele Götter, die oft als Formen des einen Göttlichen gesehen werden; Schriften: z. B. die **Veden**; Symbol: **Om**. **Buddhismus** (mehrere hundert Millionen): Lehre des **Buddha**, Weg zur Befreiung vom Leid; Symbol: **Rad der Lehre**. **Judentum** (etwa 15 Millionen): Glaube an einen Gott; Schrift: die **Tora**; Symbol: **Davidstern**.',
        '### Nicht glauben',
        'Viele Menschen gehören keiner Religion an. Manche glauben nicht an einen Gott (**Atheisten**). Andere sagen: Das kann man nicht wissen (**Agnostiker**). Auch sie haben Werte und fragen nach dem Sinn. In Luxemburg gilt **Religionsfreiheit**: Jeder darf glauben – oder nicht glauben.',
      ],
      woerter: [['der Glaube', 'la foi, la croyance'], ['die heilige Schrift', 'le texte sacré'], ['das Ritual', 'le rite'], ['beten', 'prier'], ['pilgern', 'faire un pèlerinage'], ['der Prophet', 'le prophète'], ['der Atheist / die Atheistin', 'l’athée'], ['die Religionsfreiheit', 'la liberté religieuse']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Religion', 'Schrift', 'Symbol'], breiten: [30, 35, 35], zeilen: [['Christentum', '[Bibel]', '[Kreuz]'], ['Islam', '[Koran]', '[Halbmond und Stern]'], ['Judentum', '[Tora]', '[Davidstern]'], ['Hinduismus', '[z. B. Veden]', '[Om]'], ['Buddhismus', '[Lehre des Buddha]', '[Rad der Lehre]']] },
        { art: 'mindmap', auftrag: 'Merkmale von Religionen: Ergänze die Mindmap.', stufe: 2, mitte: 'Religion', hoehe: 76, aeste: ['Glaube', { l: 'heilige Schriften' }, { l: 'Rituale' }, { l: 'heilige Orte' }, { l: 'Gemeinschaft' }, { l: 'Regeln für das Leben' }] },
      ],
    },
    hoeren: {
      was: 'Drei Stimmen', wo: 'Projekt „Woran glaubst du?“', titel: 'Woran glaubst du?',
      situation: 'Für ein Klassenprojekt erzählen drei junge Erwachsene, welche Rolle Glaube in ihrem Leben spielt.',
      bild: ['yusuf:ruhig:stehen', 'lea:froh:stehen'], sprecher: { Sarah: 'w2', Karim: 'm1', Lukas: 'm2' },
      text: [
        ['Sarah', 'Ich bin Christin. Am Sonntag gehe ich manchmal in die Kirche, nicht immer. Am wichtigsten ist mir das Gebet am Abend. Da sage ich Danke für den Tag. Das beruhigt mich.'],
        ['Karim', 'Ich bin Muslim. Ich bete fünfmal am Tag, wenn es geht, auch kurz in der Arbeitspause. Im Ramadan faste ich. Mein Glaube gibt mir Halt und erinnert mich daran, anderen zu helfen.'],
        ['Lukas', 'Ich glaube nicht an Gott. Trotzdem stelle ich mir die großen Fragen: Was ist ein gutes Leben? Für mich sind Freundschaft, Ehrlichkeit und Natur wichtig. Ich brauche dafür keine Religion – aber ich respektiere Menschen, die glauben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Halt geben“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sicherheit und Stütze geben', 'jemanden anhalten'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Wer?', 'glaubt / glaubt nicht', 'Was ist ihr / ihm wichtig?'], breiten: [16, 30, 54], zeilen: [['Sarah', '[Christin]', '[Abendgebet, Danke sagen; das beruhigt sie]'], ['Karim', '[Muslim]', '[fünfmal am Tag beten, Fasten im Ramadan, Halt, anderen helfen]'], ['Lukas', '[glaubt nicht an Gott]', '[Freundschaft, Ehrlichkeit, Natur; Respekt vor Glaubenden]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was haben Sarah, Karim und Lukas gemeinsam – obwohl sie Verschiedenes glauben?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Alle drei …', 'Ein Unterschied ist …', 'Mir fällt auf, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Merkmale von Religionen', punkte: ['**Glaube** an Gott, Götter oder eine höhere Wirklichkeit', '**heilige Schriften** und **Orte**', '**Rituale** und **Feste**', '**Gemeinschaft** und **Regeln**'] },
         { titel: 'Weltreligionen', punkte: ['**Christentum**: Bibel, Kreuz', '**Islam**: Koran, Halbmond', '**Judentum**: Tora, Davidstern', '**Hinduismus**: Om', '**Buddhismus**: Rad der Lehre'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Religions-Memory: Schneidet die Karten aus. Zu jeder Religion gehören drei Karten (Schrift, Gotteshaus, Fest). Legt sie richtig zusammen.', stufe: 2, neueSeite: true, titel: 'Was gehört zusammen?', icon: 'sparkles', farbe: GLAUBE, spalten: 4,
        karten: [
          { text: '**Christentum**' }, { text: 'Bibel' }, { text: 'Kirche' }, { text: 'Ostern' },
          { text: '**Islam**' }, { text: 'Koran' }, { text: 'Moschee' }, { text: 'Zuckerfest' },
          { text: '**Judentum**' }, { text: 'Tora' }, { text: 'Synagoge' }, { text: 'Pessach' },
          { text: '**Hinduismus**' }, { text: 'Veden' }, { text: 'Tempel (Mandir)' }, { text: 'Diwali' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Weltreligion und schreibe einen kurzen Steckbrief für ein Klassenplakat.', stufe: 2,
        anfaenge: ['Religion: …', 'Glaube: …', 'Heilige Schrift: …', 'Gotteshaus: …', 'Wichtige Feste: …', 'Symbol: …'], zeilen: 7,
        beispiel: 'Religion: Buddhismus. Glaube: Man folgt der Lehre des Buddha, um frei vom Leid zu werden. Es gibt keinen Schöpfergott wie im Christentum. Heilige Schrift: Lehrreden des Buddha. Gotteshaus: Tempel oder Kloster. Wichtige Feste: Vesakh, Geburt und Erleuchtung des Buddha. Symbol: Rad der Lehre mit acht Speichen.' },
    ],
    check: ['Ich nenne Merkmale von Religionen.', 'Ich ordne Schriften, Symbole und Feste den Weltreligionen zu.', 'Ich weiß, dass auch Nichtglauben respektiert wird.'],
  },
  // ================================================================ 8
  {
    thema: 'Wozu kann Religion dienen? · Rituale im Leben', titel: 'Wozu glauben Menschen?', untertitel: 'Halt in schweren Zeiten, Gemeinschaft, Rituale bei Geburt und Abschied – und auch Streit: Du denkst darüber nach, was Religion für Menschen bedeuten kann, und gestaltest Karten für Lebens-Stationen.',
    ziel: { de: 'Ich erkläre, welche Bedeutung Religion und Rituale für Menschen haben können, und diskutiere respektvoll darüber.', fr: 'J’explique quel sens la religion et les rites peuvent avoir pour les gens et j’en discute avec respect.' },
    bild: ['nele:ruhig:rollstuhl', 'opa:froh:sitzen'],
    start: {
      was: 'Wichtige Momente',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Welche Momente im Leben werden oft gefeiert oder begangen? Ordne nach dem Lebenslauf.', stufe: 1, teile: ['Geburt', 'Schulanfang', 'Erwachsenwerden', 'Hochzeit', 'Abschied (Tod)'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Was Religion bedeuten kann',
      absaetze: [
        'Warum glauben Menschen? Darauf gibt es viele Antworten. Für viele Gläubige ist ihr Glaube vor allem eine **Beziehung zu Gott**. Daneben kann Religion im Leben ganz verschiedene Rollen spielen.',
        '### Halt und Trost',
        'In schweren Zeiten, zum Beispiel bei Krankheit oder wenn jemand stirbt, finden viele Menschen im Gebet oder im Glauben **Trost** und **Hoffnung**.',
        '### Gemeinschaft',
        'In einer Gemeinde trifft man sich, feiert, hilft sich gegenseitig. Viele Hilfsorganisationen wurden von religiösen Gemeinschaften gegründet.',
        '### Orientierung und Rituale',
        'Religionen geben **Regeln** für das Zusammenleben, zum Beispiel: andere so behandeln, wie man selbst behandelt werden will. Diese „**Goldene Regel**“ gibt es in fast allen Religionen. **Rituale** begleiten wichtige Lebensstationen: die Taufe, die Bar Mizwa, die Hochzeit, die Beerdigung.',
        '### Auch Streit',
        'Leider wurde und wird Religion auch benutzt, um Gewalt oder Ausgrenzung zu rechtfertigen. Die meisten Gläubigen lehnen das ab. Darum ist es wichtig, **respektvoll** über Religion zu sprechen – und nachzufragen, statt zu urteilen.',
      ],
      woerter: [['der Trost', 'la consolation'], ['die Hoffnung', 'l’espoir'], ['die Gemeinde', 'la communauté (religieuse)'], ['die Orientierung', 'l’orientation, les repères'], ['die Taufe', 'le baptême'], ['die Hochzeit', 'le mariage'], ['die Beerdigung', 'l’enterrement'], ['rechtfertigen', 'justifier']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was kann Religion bedeuten? Verbinde.', stufe: 1, links: ['Halt und Trost', 'Gemeinschaft', 'Orientierung', 'Rituale'], rechts: ['Hoffnung bei Krankheit oder Tod', 'zusammen feiern und sich helfen', 'Regeln wie die Goldene Regel', 'Taufe, Hochzeit, Beerdigung'] },
        { art: 'fragen', auftrag: 'Wie heißt die Goldene Regel? Schreibe sie mit eigenen Worten.', stufe: 2, fragen: [{ f: '', l: 'Behandle andere so, wie du selbst behandelt werden willst.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Seniorenheim · Projekt „Jung und Alt“', titel: 'Was mir Kraft gegeben hat',
      situation: 'Nele besucht Herrn Thill im Seniorenheim. Sie sprechen über schwere Zeiten.',
      bild: ['opa:ruhig:sitzen', 'nele:ruhig:rollstuhl'], sprecher: { Nele: 'w3', 'Herr Thill': 'm1' },
      text: [
        ['Nele', 'Herr Thill, Sie haben so viel erlebt. Was hat Ihnen in schweren Zeiten geholfen?'],
        ['Herr Thill', 'Als meine Frau gestorben ist, war das die schwerste Zeit. Mir hat mein Glaube geholfen. Ich bin jeden Abend in die kleine Kapelle gegangen und habe eine Kerze angezündet.'],
        ['Nele', 'Hat das die Trauer weggemacht?'],
        ['Herr Thill', 'Nein, die Trauer bleibt. Aber ich hatte einen Ort, wo ich mit ihr sein konnte. Und die Leute aus der Gemeinde haben mich nicht allein gelassen. Sie haben mir Suppe gebracht und mit mir geredet.'],
        ['Nele', 'Meine Nachbarin glaubt nicht an Gott. Als ihr Hund gestorben ist, hat sie im Garten einen Baum gepflanzt.'],
        ['Herr Thill', 'Das ist auch ein Ritual. Ob mit oder ohne Gott – Menschen brauchen Wege, um Abschied zu nehmen und weiterzuleben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Ritual? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine feste Handlung, die eine besondere Bedeutung hat', 'ein Zufall'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hat Herr Thill nach dem Tod seiner Frau jeden Abend gemacht?', l: 'Er ist in die Kapelle gegangen und hat eine Kerze angezündet.' }, { f: 'Wie hat ihm die Gemeinde geholfen?', l: 'Sie haben ihn nicht allein gelassen, Suppe gebracht und mit ihm geredet.' }, { f: 'Welches Ritual hatte Neles Nachbarin?', l: 'Sie hat einen Baum gepflanzt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Rituale kennt ihr, um Abschied zu nehmen oder etwas Neues zu beginnen – religiöse und nicht religiöse? (Nur erzählen, wenn ihr wollt.)', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Kerze anzünden', 'Brief schreiben', 'Baum pflanzen', 'Abschiedsfeier', 'Fotoalbum'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Religion kann …', punkte: ['**Halt** und **Trost** geben', '**Gemeinschaft** stiften', '**Orientierung** geben (Goldene Regel)', '**Lebensstationen** begleiten'] },
         { titel: 'Respektvoll sprechen', punkte: ['**nachfragen** statt urteilen', 'niemanden wegen seines Glaubens oder Nichtglaubens **auslachen**', 'Religion darf **nie** Gewalt rechtfertigen'] }],
        [{ art: 'tipp', titel: 'Wenn jemand trauert', text: 'Da sein, zuhören, etwas Kleines tun – das hilft oft mehr als viele Worte. Wenn dich selbst etwas sehr belastet: Sprich mit einer Vertrauensperson oder ruf **116 111** an.' }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Lebens-Stationen-Karten: Schneidet die Karten aus. Schreibt auf jede Karte ein Ritual oder eine Idee, wie man diesen Moment begehen kann – religiös oder nicht religiös.', stufe: 2, neueSeite: true, titel: 'Lebens-Station', icon: 'route', farbe: GLAUBE, spalten: 3,
        karten: [
          { text: '**Ein Baby wird geboren.**', linien: 3 }, { text: '**Der erste Schultag**', linien: 3 }, { text: '**Erwachsen werden**', linien: 3 },
          { text: '**Zwei Menschen heiraten.**', linien: 3 }, { text: '**Umzug in ein neues Land**', linien: 3 }, { text: '**Abschied von einem Menschen**', linien: 3 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Jeder Mensch braucht Rituale – mit oder ohne Religion.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was gibt dir Kraft, wenn es dir nicht gut geht? Oder: Was könnte einer ausgedachten Person Kraft geben? Schreibe darüber.', stufe: 2,
        anfaenge: ['Wenn es mir / ihr / ihm nicht gut geht, …', 'Dann hilft …', 'Manchmal auch …', 'Wichtig ist …'], zeilen: 7,
        beispiel: 'Wenn es Leo nicht gut geht, geht er mit seinem Hund spazieren. Dann hilft ihm die frische Luft, und er kann seine Gedanken ordnen. Manchmal ruft er auch seine beste Freundin an oder hört ein bestimmtes Lied. Wichtig ist für ihn, dass er weiß: Er ist nicht allein.' },
    ],
    check: ['Ich nenne, was Religion für Menschen bedeuten kann.', 'Ich erkläre die Goldene Regel.', 'Ich spreche respektvoll über Glauben und Nichtglauben.'],
  },
]
