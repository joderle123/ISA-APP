// Atelier · Modul 8 (5P) „Textil und Gestalten“ – Enseignement pratique, Voie de préparation.
// Transversale Kompetenzen (Leitfaden VP): Anleitungen lesen, feinmotorisch genau arbeiten, Maschinen sicher bedienen, gestalten.
// Multimodal: Pflegesymbole, Handstiche (Mitmach-Hörtext), Knopf annähen, Nähmaschine beschriften + Papier-Nähbahnen,
// Farbkreis und Entwurf, Upcycling-Projekt T-Shirt-Tasche ohne Nähen. Ergänzt Culture générale 8 („Die Reise eines T-Shirts“).
import { sachModul } from './sachfach-gemeinsam.mjs'
import { pflegeSymbole, stiche, naehmaschine, naehUebung, farbkreis } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 8, {
  titel: 'Textil und Gestalten',
  titelFr: 'Textile et création',
  unter: 'Stoffe und Pflegesymbole kennen, mit der Hand nähen, einen Knopf annähen, die Nähmaschine sicher bedienen, mit Farben gestalten und aus Altem Neues machen.',
  unterFr: 'Tissus et symboles d’entretien, couture à la main, bouton, machine à coudre, couleurs et upcycling.',
  farbe: '#c0457a',
  deckbild: ['chloe:froh:stehen-zeigen', 'lio:froh:stehen', 'lea:froh:laessig'],
  blasen: [{ t: 'Knopf ab?', x: 8, y: 104 }, { t: 'Nur 30 Grad!', x: 120, y: 92 }, { t: 'Upcycling!', x: 178, y: 150 }],
  aussprache: { '(\\d+) ?°': '\\1 Grad' },
  themen: [
    { titel: { de: 'Stoffe und Nähen', fr: 'Tissus et couture' }, icon: 'needle-thread', lektionen: 4 },
    { titel: { de: 'Gestalten', fr: 'Créer' }, icon: 'palette', lektionen: 2 },
  ],
})

const TEXTIL = '#c0457a'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Stoffe · Pflegesymbole', titel: 'Was sagt das Etikett?', untertitel: 'Baumwolle, Wolle oder Polyester? Und darf das in die Waschmaschine? Du lernst wichtige Stoffe kennen und liest die Pflegesymbole auf dem Etikett.',
    ziel: { de: 'Ich kenne wichtige Fasern und lese Pflegesymbole.', fr: 'Je connais des fibres importantes et je lis les symboles d’entretien.' },
    bild: ['lio:enttaeuscht:stehen', 'chloe:froh:stehen-zeigen'],
    start: {
      was: 'Schau nach',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schau (wenn du magst) auf das Etikett eines Kleidungsstücks, das du heute trägst, oder auf eines im Klassenzimmer. Woraus ist es?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. 100 % Baumwolle; 60 % Baumwolle, 40 % Polyester …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Textilkunde (vereinfacht)', titel: 'Fasern und Pflege',
      absaetze: [
        '### Naturfasern',
        '**Baumwolle** kommt von einer Pflanze. Sie ist angenehm auf der Haut und nimmt Schweiß gut auf, knittert aber leicht. **Wolle** kommt vom Schaf. Sie hält warm. Wird sie zu heiß gewaschen, kann sie **einlaufen** – dann ist der Pulli plötzlich viel kleiner. **Leinen** kommt aus der Flachspflanze, **Seide** von der Seidenraupe.',
        '### Kunstfasern',
        '**Polyester**, **Polyamid** und **Elastan** werden aus **Erdöl** hergestellt. Sie trocknen schnell und knittern wenig. Elastan macht Stoff dehnbar, zum Beispiel bei Sporthosen. Beim Waschen können sich winzige Plastikteilchen lösen: **Mikroplastik**.',
        '### Pflegesymbole',
        'Auf dem Etikett zeigen Symbole, wie man das Kleidungsstück pflegt. Die **Wanne** steht für Waschen; die Zahl ist die **höchste Temperatur**. Eine **Hand** in der Wanne heißt Handwäsche. Das **Dreieck** steht für Bleichen, das **Quadrat mit Kreis** für den Trockner, das **Bügeleisen** fürs Bügeln. Je mehr **Punkte**, desto heißer darf es sein. Ein **Kreuz** heißt: nicht erlaubt.',
      ],
      woerter: [['der Stoff', 'le tissu'], ['die Faser', 'la fibre'], ['die Baumwolle', 'le coton'], ['die Wolle', 'la laine'], ['einlaufen', 'rétrécir'], ['das Etikett', 'l’étiquette'], ['bügeln', 'repasser'], ['der Trockner', 'le sèche-linge']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Was bedeuten die Symbole? Schreibe.', stufe: 2, html: '<div class="voll">' + pflegeSymbole() + '</div>', liste: [['A', 'waschen bis 30 °C'], ['B', 'waschen bis 60 °C'], ['C', 'Handwäsche'], ['D', 'nicht waschen'], ['E', 'nicht bleichen'], ['F', 'Trockner, niedrige Temperatur'], ['G', 'bügeln, mittlere Temperatur'], ['H', 'nicht bügeln']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Waschküche', titel: 'Rosa statt weiß',
      situation: 'Lio hat zum ersten Mal selbst Wäsche gewaschen. Das Ergebnis ist eine Überraschung. Chloe hilft.',
      bild: ['lio:enttaeuscht:stehen', 'chloe:froh:stehen-zeigen'], sprecher: { Lio: 'm3', Chloe: 'w3' },
      text: [
        ['Lio', 'Chloe, schau dir das an. Meine weißen T-Shirts sind alle rosa!'],
        ['Chloe', 'Oh nein. Hast du etwas Rotes mitgewaschen?'],
        ['Lio', 'Nur eine rote Socke … Und mein grauer Wollpulli ist jetzt so klein, dass er meinem kleinen Bruder passt.'],
        ['Chloe', 'Bei wie viel Grad hast du gewaschen?'],
        ['Lio', 'Sechzig. Ich dachte, heiß wird alles sauberer.'],
        ['Chloe', 'Für weiße Baumwolle ist das manchmal okay. Aber schau aufs Etikett vom Pulli: Wanne mit Hand. Das heißt Handwäsche, ganz kalt. Wolle läuft bei sechzig Grad ein.'],
        ['Lio', 'Und die rosa T-Shirts?'],
        ['Chloe', 'Nächstes Mal sortierst du: Weißes zu Weißem, Dunkles zu Dunklem, Buntes extra. Die T-Shirts kannst du noch einmal mit Weißwäsche waschen. Vielleicht wird es heller.'],
        ['Lio', 'Okay. Sortieren, Etikett lesen, und nicht alles auf sechzig.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „Wäsche sortieren“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Kleidung nach Farbe und Temperatur in Haufen teilen', 'die Kleidung in den Schrank legen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Lio hat eine rote Socke mit weißen T-Shirts gewaschen.', true], ['Lio hat bei 30 Grad gewaschen.', false], ['Auf dem Wollpulli steht: Handwäsche.', true], ['Wolle verträgt 60 Grad gut.', false], ['Chloe rät: Weißes, Dunkles und Buntes getrennt waschen.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Habt ihr schon einmal ein Wäsche-Missgeschick erlebt oder davon gehört? Was hilft, damit das nicht passiert?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Einmal ist …', 'Damit das nicht passiert, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fasern', punkte: ['**Naturfasern**: Baumwolle, Wolle, Leinen, Seide', '**Kunstfasern** aus Erdöl: Polyester, Polyamid, Elastan', '**Wolle** heiß gewaschen: läuft ein'] },
         { titel: 'Pflegesymbole', punkte: ['**Wanne**: waschen (Zahl = max. Grad)', '**Hand**: Handwäsche', '**Dreieck**: bleichen', '**Quadrat mit Kreis**: Trockner', '**Bügeleisen**: Punkte = Hitze', '**Kreuz**: nicht erlaubt'] }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Woraus kommt die Faser? Verbinde.', stufe: 1, links: ['Baumwolle', 'Wolle', 'Seide', 'Leinen', 'Polyester'], rechts: ['von einer Pflanze (Baumwollpflanze)', 'vom Schaf', 'von der Seidenraupe', 'aus der Flachspflanze', 'aus Erdöl'] },
      { art: 'tabelle', auftrag: 'Wäsche sortieren: In welchen Haufen kommt das? Kreuze an.', stufe: 2, kopf: ['Kleidungsstück', 'weiß 60 °C', 'dunkel 30 °C', 'Hand-wäsche'], breiten: [46, 18, 18, 18], zeilen: [['weiße Baumwoll-Socken', '[x]', '', ''], ['schwarze Jeans', '', '[x]', ''], ['Wollpulli (Symbol: Hand)', '', '', '[x]'], ['dunkelblaues Sport-Shirt', '', '[x]', ''], ['weiße Bettwäsche', '[x]', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Anleitung „Richtig waschen“ für jemanden, der zum ersten Mal Wäsche wäscht.', stufe: 2,
        anfaenge: ['Zuerst …', 'Dann …', 'Achte auf …', 'Zum Schluss …'], zeilen: 6,
        beispiel: 'Zuerst sortierst du die Wäsche: Weißes, Dunkles und Buntes getrennt. Dann liest du die Etiketten und wählst die richtige Temperatur. Achte auf Wolle: Sie braucht Handwäsche oder ein Wollprogramm. Zum Schluss hängst du die Wäsche gleich auf, damit sie nicht knittert.' },
    ],
    check: ['Ich unterscheide Natur- und Kunstfasern.', 'Ich lese Pflegesymbole.', 'Ich sortiere Wäsche richtig.'],
  },
  // ================================================================ 2
  {
    thema: 'Handstiche', titel: 'Nadel und Faden', untertitel: 'Mit der Hand nähen ist ganz einfach – wenn man drei Stiche kennt. Du lernst einfädeln, einen Knoten machen und drei Handstiche. Herr Mensah erklärt Schritt für Schritt.',
    ziel: { de: 'Ich fädle ein, mache einen Knoten und nähe drei Handstiche.', fr: 'J’enfile l’aiguille, je fais un nœud et je couds trois points à la main.' },
    bild: ['lehrer:froh:erklaeren', 'tom:verwirrt:sitzen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Warum sollte jeder ein bisschen nähen können? Kreuze an, was du denkst.', stufe: 1, fragen: [{ f: '', o: ['um kleine Löcher selbst zu flicken', 'um Geld für neue Kleidung zu sparen', 'um eigene Sachen zu gestalten', 'Das braucht man heute nicht mehr.'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Anleitung', titel: 'Einfädeln, Knoten, drei Stiche',
      material: ['Nähnadel', 'Nähgarn', 'Stoffrest', 'Schere', 'Stecknadeln'],
      schritte: [
        { icon: 'scissors', text: '**Faden abschneiden:** etwa so lang wie dein Arm. Ist er länger, verknotet er sich leicht.' },
        { icon: 'needle-thread', text: '**Einfädeln:** Schneide das Fadenende schräg ab und schiebe es durch das **Nadelöhr**. Zieh ein Stück durch.' },
        { icon: 'circle-dot', text: '**Knoten:** Wickle das lange Ende zwei- bis dreimal um den Zeigefinger, rolle es mit dem Daumen ab und zieh fest.' },
        { icon: 'line-dashed', text: '**Vorstich:** Nadel von unten nach oben, ein Stück weiter wieder nach unten. Oben sieht man Strich – Lücke – Strich. Gut zum **Heften**.' },
        { icon: 'arrow-back', text: '**Rückstich:** Nadel ein Stück **zurück** einstechen, dann zwei Stücke weiter vorne herauskommen. Die Stiche liegen ohne Lücke nebeneinander. Er hält **fest** wie eine Maschinennaht.' },
        { icon: 'rotate-clockwise', text: '**Überwendlingsstich:** Der Faden geht immer **über die Kante**. So franst der Stoff nicht aus.' },
      ],
      danach: ['Zum Schluss machst du auf der **Rückseite** zwei kleine Stiche übereinander und schneidest den Faden ab. Stecknadeln kommen nach dem Nähen sofort zurück ins **Nadelkissen**.'],
      woerter: [['die Nadel', 'l’aiguille'], ['der Faden', 'le fil'], ['einfädeln', 'enfiler'], ['das Nadelöhr', 'le chas'], ['der Knoten', 'le nœud'], ['der Stich', 'le point'], ['heften', 'faufiler'], ['ausfransen', 's’effilocher']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Welcher Stich ist das? Schreibe den Namen und wofür man ihn braucht.', stufe: 1, html: '<div class="voll">' + stiche() + '</div>', liste: [['A', 'Vorstich – zum Heften'], ['B', 'Rückstich – hält fest wie eine Maschinennaht'], ['C', 'Überwendlingsstich – über die Kante, gegen Ausfransen']], spalten: 1 },
      ],
    },
    hoeren: {
      was: 'Eine Mitmach-Anleitung', wo: 'Textilraum', titel: 'Der Knoten-Trick',
      situation: 'Tom bekommt keinen Knoten hin. Herr Mensah erklärt den Trick langsam. Mach mit – mit einem Faden oder nur mit den Fingern.',
      bild: ['tom:verwirrt:sitzen', 'lehrer:froh:erklaeren'], sprecher: { Tom: 'm3', 'Herr Mensah': 'm2' },
      text: [
        ['Tom', 'Mein Knoten rutscht immer durch den Stoff.'],
        ['Herr Mensah', 'Dann machen wir einen dickeren. Nimm das lange Ende vom Faden. Leg es auf die Spitze deines Zeigefingers.'],
        ['Herr Mensah', 'Jetzt wickelst du den Faden zweimal um den Finger. Nicht zu fest. Hast du?'],
        ['Tom', 'Ja.'],
        ['Herr Mensah', 'Jetzt kommt der Trick: Leg den Daumen darauf. Und jetzt rollst du mit dem Daumen den Faden nach vorn, zur Fingerspitze hin. Dabei verdreht er sich.'],
        ['Herr Mensah', 'Wenn die Schlaufe von der Fingerspitze rutscht, hältst du sie mit Daumen und Zeigefinger fest und ziehst mit der anderen Hand am Faden.'],
        ['Tom', 'Da! Ein kleiner Knubbel.'],
        ['Herr Mensah', 'Genau. Das ist dein Knoten. Wenn er zu klein ist, machst du einfach noch einen darüber. Probier es noch dreimal, dann sitzt der Trick.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Schlaufe? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Faden, der einen kleinen Ring bildet', 'ein gerader Faden'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Schritte für den Knoten.', stufe: 1, teile: ['Fadenende auf die Fingerspitze legen', 'Faden zweimal um den Finger wickeln', 'mit dem Daumen nach vorn rollen', 'Schlaufe festhalten', 'am Faden ziehen'], ordnung: [2, 4, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Zeigt euch gegenseitig den Knoten-Trick und erklärt ihn dabei in Worten.', stufe: 1, karten: [
        { titel: 'Hilfen', text: ['Zuerst legst du …', 'Dann wickelst du …', 'Jetzt rollst du …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vorbereiten', nummern: true, punkte: ['Faden **armlang** abschneiden', 'schräg abschneiden, **einfädeln**', '**Knoten** am langen Ende'] },
         { titel: 'Drei Stiche', punkte: ['**Vorstich**: Strich – Lücke – Strich, zum Heften', '**Rückstich**: ohne Lücke, hält fest', '**Überwendlingsstich**: über die Kante', 'Ende: **zwei Stiche** übereinander'] }],
      ],
    },
    ueben: [
      { art: 'fragen', auftrag: 'Nähprobe: Nähe auf einem Stoffrest je eine Reihe Vorstich, Rückstich und Überwendlingsstich. Klebe die Probe hier ein oder beschreibe sie.', stufe: 2, fragen: [{ f: '', zeilen: 6, l: 'Nähprobe mit drei Stichreihen.' }] },
      { art: 'zuordnen', auftrag: 'Welcher Stich passt? Verbinde.', stufe: 2, links: ['Eine Naht an der Hose ist aufgegangen. Sie muss gut halten.', 'Die Kante eines Stoffstücks franst aus.', 'Zwei Stoffteile sollen nur kurz zusammengehalten werden, bis die Maschine näht.'], rechts: ['Rückstich', 'Überwendlingsstich', 'Vorstich (Heftstich)'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Wie ging es dir beim Nähen mit der Hand? Was war schwierig? Welcher Trick hat geholfen?', stufe: 2,
        anfaenge: ['Beim Einfädeln …', 'Der Knoten …', 'Am leichtesten war …', 'Geholfen hat …'], zeilen: 6,
        beispiel: 'Beim Einfädeln habe ich drei Versuche gebraucht. Der Knoten ist erst mit dem Trick von Herrn Mensah gelungen. Am leichtesten war der Vorstich. Geholfen hat, dass ich die Stiche vorher mit Bleistift auf den Stoff gezeichnet habe.' },
    ],
    check: ['Ich fädle ein und mache einen Knoten.', 'Ich nähe Vorstich, Rückstich und Überwendlingsstich.', 'Ich weiß, wofür man welchen Stich braucht.'],
  },
  // ================================================================ 3
  {
    thema: 'Knopf annähen · kleine Reparaturen', titel: 'Knopf ab? Kein Problem!', untertitel: 'Ein Knopf fehlt, ein kleines Loch im Ärmel: Das kannst du selbst reparieren. Du lernst, einen Knopf richtig anzunähen und ein kleines Loch zu flicken.',
    ziel: { de: 'Ich nähe einen Knopf an und flicke ein kleines Loch.', fr: 'Je couds un bouton et je raccommode un petit trou.' },
    bild: ['finn:besorgt:stehen', 'lea:froh:stehen-zeigen'],
    start: {
      was: 'Was tun?',
      aufgaben: [
        { art: 'mc', auftrag: 'Morgen ist dein erster Praktikumstag. An deiner Jacke fehlt ein Knopf. Was machst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich nähe ihn selbst wieder an.', 'Ich frage jemanden, der es mir zeigt.', 'Ich ziehe eine andere Jacke an.', 'Ich lasse es so.'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Anleitung', titel: 'Einen Knopf annähen',
      material: ['Knopf', 'Nadel und passendes Garn', 'ein Streichholz oder Zahnstocher', 'Schere'],
      schritte: [
        { icon: 'needle-thread', text: '**Doppelter Faden:** Fädle ein und lege den Faden doppelt. Mach am Ende einen Knoten. So hält es besser.' },
        { icon: 'target', text: '**Stelle finden:** Wo war der alte Knopf? Oft sieht man noch kleine Löcher. Stich dort **von hinten** nach vorn.' },
        { icon: 'circle-dot', text: '**Abstand lassen:** Leg ein Streichholz **auf** den Knopf. Nähe darüber. So bleibt Platz zwischen Knopf und Stoff.' },
        { icon: 'repeat', text: '**Annähen:** Geh fünf- bis sechsmal durch die Löcher des Knopfes und den Stoff.' },
        { icon: 'rotate', text: '**Hals wickeln:** Nimm das Streichholz weg. Zieh den Knopf etwas hoch und wickle den Faden ein paarmal **unter dem Knopf** herum. Das ist der **Knopfhals**.' },
        { icon: 'check', text: '**Vernähen:** Stich nach hinten, mach zwei kleine Stiche übereinander und schneide den Faden ab.' },
      ],
      danach: ['Der Knopfhals ist wichtig: Ohne ihn sitzt der Knopf zu eng am Stoff, und man bekommt ihn schlecht durch das Knopfloch.'],
      woerter: [['der Knopf', 'le bouton'], ['annähen', 'coudre'], ['doppelt', 'double'], ['das Streichholz', 'l’allumette'], ['der Knopfhals', 'la tige du bouton'], ['vernähen', 'arrêter le fil'], ['flicken', 'raccommoder'], ['das Knopfloch', 'la boutonnière']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Schritte.', stufe: 1, teile: ['Faden doppelt nehmen, Knoten machen', 'von hinten an der alten Stelle einstechen', 'Streichholz auf den Knopf legen', 'fünf- bis sechsmal durch Knopf und Stoff nähen', 'Faden unter dem Knopf wickeln (Knopfhals)', 'hinten vernähen und abschneiden'], ordnung: [3, 0, 5, 1, 4, 2] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Jugendhaus · am Abend', titel: 'Morgen ist Praktikum',
      situation: 'Finn hat morgen seinen ersten Praktikumstag in einem Hotel. Am Hemd fehlt ein Knopf. Lea hilft ihm.',
      bild: ['finn:besorgt:stehen', 'lea:froh:stehen-zeigen'], sprecher: { Finn: 'm3', Lea: 'w3' },
      text: [
        ['Finn', 'Lea, kannst du mir einen Knopf annähen? Morgen fange ich im Hotel an, und am Hemd fehlt der zweite Knopf.'],
        ['Lea', 'Ich mache es nicht für dich. Aber ich zeige es dir. Dann kannst du es nächstes Mal allein.'],
        ['Finn', 'Na gut. Wo ist der Knopf?'],
        ['Lea', 'Schau mal unten am Hemd, innen. Da ist oft ein Ersatzknopf angenäht.'],
        ['Finn', 'Tatsächlich! Den habe ich noch nie gesehen.'],
        ['Lea', 'Weißes Garn, doppelt, Knoten. Jetzt stichst du von hinten genau da ein, wo die alten Löcher sind.'],
        ['Finn', 'Und jetzt einfach immer durch?'],
        ['Lea', 'Fast. Leg vorher den Zahnstocher auf den Knopf und näh darüber. Sonst ist der Knopf zu eng.'],
        ['Finn', 'Okay … fünfmal, sechsmal. Jetzt Zahnstocher weg und Faden drumherum wickeln?'],
        ['Lea', 'Genau, unter dem Knopf. Dann hinten vernähen. Fertig! Und morgen sieht keiner, dass da was fehlte.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Ersatzknopf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein zusätzlicher Knopf, falls einer verloren geht', 'ein kaputter Knopf'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum braucht Finn den Knopf so dringend?', l: 'Morgen ist sein erster Praktikumstag im Hotel.' }, { f: 'Wo findet Finn einen Ersatzknopf?', l: 'unten am Hemd, innen angenäht' }, { f: 'Wofür ist der Zahnstocher?', zeilen: 2, l: 'damit der Knopf nicht zu eng sitzt (Platz für den Knopfhals)' }, { f: 'Warum näht Lea den Knopf nicht selbst an?', zeilen: 2, l: 'Finn soll es lernen und nächstes Mal allein können.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Lea sagt: „Ich zeige es dir. Dann kannst du es allein.“ Was findet ihr gut daran?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde gut, dass …', 'Selbst können ist wichtig, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Knopf annähen', nummern: true, punkte: ['Faden **doppelt**, Knoten', 'von **hinten** einstechen', '**Streichholz** auf den Knopf', '5–6-mal durchnähen', '**Knopfhals** wickeln', 'hinten **vernähen**'] },
         { titel: 'Tipps', punkte: ['**Ersatzknopf**: oft innen am Kleidungsstück', 'Garnfarbe passend wählen', 'kleine Löcher **früh** flicken – sie werden sonst größer'] }],
      ],
    },
    ueben: [
      { art: 'fragen', auftrag: 'Praxis: Nähe auf einen Stoffrest zwei Knöpfe an – einen mit zwei und einen mit vier Löchern. Lass dir von einem Mitschüler eine Rückmeldung geben.', stufe: 2, fragen: [{ f: 'Rückmeldung von:', zeilen: 2, l: 'Individuell' }, { f: 'Sitzt der Knopf fest? Hat er einen Knopfhals?', zeilen: 2, l: 'Individuell' }] },
      { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Für Knöpfe nimmt man den Faden doppelt.', true], ['Den Knopf näht man ganz eng an den Stoff.', false], ['Der Knopfhals hilft, den Knopf durch das Knopfloch zu bekommen.', true], ['Ein kleines Loch wird von allein wieder zu.', false]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Welche kleinen Reparaturen kannst du jetzt selbst machen? Welche möchtest du noch lernen?', stufe: 1,
        anfaenge: ['Ich kann jetzt …', 'Ich möchte noch lernen, …', 'Das ist nützlich, weil …'], zeilen: 5,
        beispiel: 'Ich kann jetzt einen Knopf annähen und eine aufgegangene Naht mit dem Rückstich zunähen. Ich möchte noch lernen, wie man eine Hose kürzt. Das ist nützlich, weil Hosen oft zu lang sind und das Kürzen im Geschäft Geld kostet.' },
    ],
    check: ['Ich nähe einen Knopf mit Knopfhals an.', 'Ich vernähe den Faden sicher.', 'Ich flicke kleine Schäden selbst.'],
  },
  // ================================================================ 4
  {
    thema: 'Die Nähmaschine sicher bedienen', titel: 'Die Nähmaschine', untertitel: 'Die Nähmaschine macht in einer Minute mehr Stiche als du in einer Stunde. Du lernst ihre Teile kennen, die Sicherheitsregeln und übst zuerst ohne Faden – auf Papier.',
    ziel: { de: 'Ich kenne die Teile der Nähmaschine und bediene sie sicher.', fr: 'Je connais les parties de la machine à coudre et je l’utilise en sécurité.' },
    bild: ['chloe:froh:sitzen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Schätze',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Stiche schafft eine Haushalts-Nähmaschine ungefähr in einer Minute? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 10', 'etwa 80', 'mehrere Hundert'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm2', nummern: false,
      quelle: 'Textil-Werkstatt', titel: 'Teile und Regeln',
      absaetze: [
        'Oben auf der Maschine steht die **Garnrolle**. Der Faden läuft über den **Fadengeber**, der beim Nähen auf und ab geht, bis zur **Nadel**. Der **Nähfuß** drückt den Stoff nach unten, damit er gleichmäßig weitertransportiert wird. Unter der Nadel liegt die **Spule** mit dem Unterfaden.',
        'Mit dem **Fußanlasser** gibst du Gas: Je fester du drückst, desto schneller näht die Maschine. Mit dem **Handrad** bewegst du die Nadel langsam von Hand – drehe es immer **zu dir hin**. Mit dem **Stichwahl-Rad** wählst du den Stich, zum Beispiel Geradstich oder Zickzack. Die **Rückwärtstaste** brauchst du am Anfang und Ende einer Naht, damit sie nicht aufgeht.',
        '### Sicherheitsregeln',
        '**Finger weg** vom Bereich um die Nadel. Führe den Stoff mit beiden Händen links und rechts vom Nähfuß. Beim Einfädeln und beim Nadelwechsel: **Fuß weg vom Anlasser** oder Maschine ausschalten. Stecknadeln ziehst du heraus, **bevor** die Nadel sie erreicht – sonst kann die Nadel brechen. Lange Haare zusammenbinden. Nach der Arbeit: ausschalten und den Stecker ziehen.',
      ],
      woerter: [['die Nähmaschine', 'la machine à coudre'], ['die Garnrolle', 'la bobine de fil'], ['der Fadengeber', 'le releveur de fil'], ['der Nähfuß', 'le pied presseur'], ['die Spule', 'la canette'], ['der Fußanlasser', 'la pédale'], ['das Handrad', 'le volant'], ['der Geradstich', 'le point droit']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Nähmaschine.', stufe: 1, html: '<div class="voll">' + naehmaschine() + '</div>', liste: [['1', 'Handrad'], ['2', 'Garnrolle'], ['3', 'Fadengeber'], ['4', 'Nadel'], ['5', 'Nähfuß'], ['6', 'Stichwahl-Rad'], ['7', 'Rückwärtstaste'], ['8', 'Fußanlasser']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Eine Mitmach-Anleitung', wo: 'Textilraum · an der Nähmaschine', titel: 'Nähen ohne Faden',
      situation: 'Die erste Übung an der Nähmaschine: Chloe näht ohne Faden auf Papier. Herr Mensah gibt Anweisungen.',
      bild: ['chloe:froh:sitzen', 'lehrer:froh:erklaeren'], sprecher: { 'Herr Mensah': 'm2', Chloe: 'w3' },
      text: [
        ['Herr Mensah', 'Heute nähen wir ohne Faden. Du bekommst ein Blatt mit Linien. Die Nadel macht kleine Löcher ins Papier. So siehst du genau, ob du auf der Linie bleibst.'],
        ['Herr Mensah', 'Leg das Blatt unter den Nähfuß. Die Nadel steht genau auf dem grünen Startpunkt. Senk den Nähfuß mit dem Hebel ab.'],
        ['Chloe', 'Fuß ist unten.'],
        ['Herr Mensah', 'Deine Hände liegen links und rechts vom Nähfuß. Du schiebst nicht, du führst nur. Die Maschine zieht das Papier selbst.'],
        ['Herr Mensah', 'Jetzt drück ganz leicht auf den Fußanlasser. Langsam … gut so. Schau nicht auf die Nadel, schau auf die Linie vor dem Nähfuß.'],
        ['Chloe', 'Bei der Welle komme ich raus!'],
        ['Herr Mensah', 'Dann langsamer. Bei Kurven ganz wenig Gas und den Stoff sanft drehen. Bei den Ecken bleibst du stehen, die Nadel bleibt unten im Papier, Nähfuß hoch, Blatt drehen, Nähfuß runter, weiter.'],
        ['Chloe', 'Nadel unten, Fuß hoch, drehen, Fuß runter. Das klappt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „führen“ beim Nähen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['den Stoff mit den Händen lenken, ohne zu ziehen', 'den Stoff kräftig nach vorne ziehen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Bei der ersten Übung näht Chloe ohne Faden auf Papier.', true], ['Chloe soll das Papier kräftig schieben.', false], ['Man schaut auf die Linie vor dem Nähfuß.', true], ['In Kurven gibt man mehr Gas.', false], ['An Ecken bleibt die Nadel unten im Papier.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erkläre deinem Partner, wie man an einer Ecke dreht. Er macht die Bewegungen mit den Händen nach.', stufe: 1, karten: [
        { titel: 'Ecke', text: ['Anhalten.', 'Nadel unten.', 'Nähfuß hoch.', 'Drehen.', 'Nähfuß runter.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wichtige Teile', punkte: ['**Garnrolle** → **Fadengeber** → **Nadel**', '**Nähfuß** hält den Stoff', '**Spule**: Unterfaden', '**Handrad** immer zu dir', '**Fußanlasser** = Gas'] },
         { titel: 'Sicher nähen', punkte: ['**Finger weg** von der Nadel', 'Einfädeln: **Fuß weg** vom Anlasser', 'Stecknadeln **vorher** ziehen', 'Haare zusammen', 'danach **Stecker ziehen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Näh-Führerschein: Nähe ohne Faden auf den Linien (oder lege diese Seite auf ein Blatt Papier). Bewerte dich: Wie oft bist du von der Linie abgekommen?', stufe: 2, html: '<div class="voll">' + naehUebung() + '</div>', liste: [['1 gerade', 'Individuell'], ['2 Welle', 'Individuell'], ['3 Zickzack', 'Individuell'], ['4 Ecken', 'Individuell']], spalten: 2 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Wie war dein erstes Mal an der Nähmaschine? Welche Linie war am schwierigsten?', stufe: 2,
        anfaenge: ['Am Anfang …', 'Am schwierigsten war …, weil …', 'Ich habe gelernt, …'], zeilen: 6,
        beispiel: 'Am Anfang hatte ich Angst, dass die Nadel zu schnell ist. Am schwierigsten war die Welle, weil ich zu viel Gas gegeben habe. Ich habe gelernt, langsam zu nähen und auf die Linie vor dem Nähfuß zu schauen, nicht auf die Nadel.' },
    ],
    check: ['Ich kenne acht Teile der Nähmaschine.', 'Ich halte die Sicherheitsregeln ein.', 'Ich nähe gerade Linien, Kurven und Ecken.'],
  },
  // ================================================================ 5
  {
    thema: 'Farben und Design', titel: 'Farben, die wirken', untertitel: 'Farben können ruhig oder laut, warm oder kalt wirken. Du lernst den Farbkreis kennen, mischst Farben und entwirfst ein Motiv für eine Stofftasche.',
    ziel: { de: 'Ich kenne den Farbkreis und gestalte einen Entwurf mit passenden Farben.', fr: 'Je connais le cercle chromatique et je crée un projet avec des couleurs adaptées.' },
    bild: ['lea:froh:laessig', 'sami:froh:blatt'],
    start: {
      was: 'Wie wirkt das?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Farbe passt zu welchem Gefühl? Schreibe eine Farbe in jede Zeile.', stufe: 1, kopf: ['Gefühl', 'Farbe'], breiten: [50, 50], zeilen: [['ruhig', '[z. B. Blau, Grün]'], ['fröhlich', '[z. B. Gelb, Orange]'], ['wütend, laut', '[z. B. Rot]'], ['geheimnisvoll', '[z. B. Violett, Schwarz]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Gestalten (Farbenlehre einfach)', titel: 'Der Farbkreis',
      absaetze: [
        'Im Kunstunterricht arbeitet man oft mit einem einfachen **Farbkreis**. Er hat drei **Grundfarben**: **Gelb**, **Rot** und **Blau**. Aus ihnen kann man andere Farben mischen.',
        'Mischt man zwei Grundfarben, entsteht eine **Mischfarbe**: Gelb und Rot ergeben **Orange**. Rot und Blau ergeben **Violett**. Blau und Gelb ergeben **Grün**.',
        'Farben, die im Kreis **genau gegenüber** liegen, heißen **Komplementärfarben**: Gelb und Violett, Rot und Grün, Blau und Orange. Nebeneinander leuchten sie besonders stark. Darum benutzt man sie für Plakate und Logos.',
        'Gelb, Orange und Rot wirken **warm**. Blau, Grün und Violett wirken eher **kalt** oder ruhig. Für ein Design wählt man meistens **zwei oder drei** Farben, die gut zusammenpassen – nicht alle auf einmal.',
      ],
      woerter: [['die Farbe', 'la couleur'], ['der Farbkreis', 'le cercle chromatique'], ['die Grundfarbe', 'la couleur primaire'], ['die Mischfarbe', 'la couleur secondaire'], ['mischen', 'mélanger'], ['die Komplementärfarbe', 'la couleur complémentaire'], ['warm', 'chaud'], ['der Entwurf', 'l’ébauche']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Schreibe die Farben zu den Nummern im Farbkreis. Markiere die Grundfarben mit G.', stufe: 1, html: '<div class="voll">' + farbkreis() + '</div>', liste: [['1', 'Gelb (G)'], ['2', 'Orange'], ['3', 'Rot (G)'], ['4', 'Violett'], ['5', 'Blau (G)'], ['6', 'Grün']], spalten: 3 },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Textilraum · Entwurfstisch', titel: 'Das Logo für die Tasche',
      situation: 'Lea und Sami entwerfen ein Motiv für Stofftaschen, die die Klasse beim Schulfest verkaufen will.',
      bild: ['lea:froh:laessig', 'sami:froh:blatt'], sprecher: { Lea: 'w3', Sami: 'm2' },
      text: [
        ['Sami', 'Ich will die Tasche ganz bunt machen. Rot, Gelb, Grün, Blau, Lila, alles!'],
        ['Lea', 'Hm, dann sieht man das Motiv gar nicht mehr. Herr Mensah hat gesagt: zwei oder drei Farben.'],
        ['Sami', 'Okay. Unsere Taschen sind naturfarben, so hellbeige. Was passt dazu?'],
        ['Lea', 'Ein dunkles Blau sieht man darauf gut. Und dazu ein bisschen Orange – das ist die Komplementärfarbe. Das leuchtet.'],
        ['Sami', 'Und was malen wir? Vielleicht einen Baum? Weil unser Schulgarten so schön ist.'],
        ['Lea', 'Gute Idee. Der Stamm in Blau, ein paar Blätter in Orange. Und darunter der Name von unserer Schule.'],
        ['Sami', 'Ich zeichne drei Entwürfe, dann stimmt die Klasse ab.'],
        ['Lea', 'Perfekt. Und denk dran: Mit Stoffmalfarbe malen, dann bügeln – sonst geht die Farbe in der Wäsche raus.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Motiv auf einer Tasche? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das Bild oder Zeichen, das darauf gemalt ist', 'der Grund, warum man sie kauft'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum will Lea nicht alle Farben benutzen?', zeilen: 2, l: 'Dann sieht man das Motiv nicht mehr; zwei oder drei Farben sind besser.' }, { f: 'Welche zwei Farben wählen sie? Warum passen sie gut?', zeilen: 2, l: 'Dunkelblau und Orange – Komplementärfarben, sie leuchten zusammen.' }, { f: 'Was malen sie?', l: 'einen Baum (Stamm blau, Blätter orange) und den Schulnamen' }, { f: 'Was muss man nach dem Malen mit Stoffmalfarbe machen?', l: 'bügeln, damit die Farbe in der Wäsche hält' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt eure Entwürfe in der Klasse vor. Erklärt, warum ihr diese Farben gewählt habt.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mein Motiv ist …', 'Ich habe … und … gewählt, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Farbkreis', punkte: ['**Grundfarben**: Gelb, Rot, Blau', '**Mischfarben**: Orange, Violett, Grün', '**Komplementär**: gegenüber – leuchten stark'] },
         { titel: 'Gestalten', punkte: ['**warm**: Gelb, Orange, Rot', '**kalt/ruhig**: Blau, Grün, Violett', 'nur **2–3 Farben** wählen', 'Stoffmalfarbe: **bügeln** zum Fixieren'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Welche Farben entstehen? Welche Farbe ist die Komplementärfarbe?', stufe: 2, kopf: ['Farbe', 'mischt man aus …', 'Komplementärfarbe'], breiten: [24, 40, 36], zeilen: [['Orange', '[Gelb + Rot]', '[Blau]'], ['Grün', '[Blau + Gelb]', '[Rot]'], ['Violett', '[Rot + Blau]', '[Gelb]']] },
      { art: 'fragen', auftrag: 'Mein Entwurf: Zeichne ein Motiv für eine Stofftasche. Benutze höchstens drei Farben. Schreibe dazu, welche Farben du gewählt hast und warum.', stufe: 3, fragen: [{ f: '', zeilen: 8, l: 'Individueller Entwurf mit Begründung der Farbwahl.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe ein Logo oder Plakat, das dir im Alltag auffällt. Welche Farben hat es? Wie wirkt es?', stufe: 2,
        anfaenge: ['Mir fällt … auf.', 'Es hat die Farben …', 'Es wirkt …, weil …'], zeilen: 5,
        beispiel: 'Mir fällt das Schild der Apotheke auf. Es hat die Farben Grün und Weiß. Es wirkt ruhig und sauber, weil Grün an Gesundheit und Natur erinnert. Man sieht es auch von weitem gut.' },
    ],
    check: ['Ich kenne Grund-, Misch- und Komplementärfarben.', 'Ich weiß, wie Farben wirken.', 'Ich gestalte einen Entwurf mit wenigen Farben.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Upcycling', titel: 'Aus Alt mach Neu', untertitel: 'Ein altes T-Shirt muss nicht in den Müll. Daraus wird in einer Stunde eine Tasche – ganz ohne Nähmaschine. Du lernst, was Upcycling ist, und baust selbst.',
    ziel: { de: 'Ich mache aus einem alten Kleidungsstück etwas Neues und erkläre, warum das sinnvoll ist.', fr: 'Je transforme un vieux vêtement en un nouvel objet et j’explique pourquoi c’est utile.' },
    bild: ['amira:froh:stehen-zeigen', 'jana:froh:stehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viel Wasser braucht man ungefähr, um ein einziges Baumwoll-T-Shirt herzustellen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 10 Liter', 'etwa 100 Liter', 'mehrere Tausend Liter'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Upcycling-Anleitung', titel: 'Tasche aus einem T-Shirt – ohne Nähen',
      material: ['ein altes T-Shirt (sauber)', 'Stoffschere', 'Lineal und Kreide', 'eine Schüssel als Schablone'],
      schritte: [
        { icon: 'shirt', text: '**Vorbereiten:** Lege das T-Shirt glatt auf den Tisch.' },
        { icon: 'scissors', text: '**Ärmel abschneiden:** Schneide beide Ärmel entlang der Naht ab. Das werden die **Henkel**.' },
        { icon: 'circle', text: '**Halsausschnitt:** Leg eine Schüssel oben auf den Halsausschnitt, zeichne einen Halbkreis mit Kreide und schneide ihn aus. Das ist die **Öffnung**.' },
        { icon: 'ruler-2', text: '**Fransen:** Zeichne unten eine Linie 8 cm über dem Saum. Schneide bis zu dieser Linie Streifen, etwa 2 cm breit – durch beide Stofflagen.' },
        { icon: 'link', text: '**Verknoten:** Verknote jeden vorderen Streifen mit dem hinteren Streifen darunter, zweimal. So ist der Boden geschlossen.' },
        { icon: 'shopping-bag', text: '**Wenden:** Dreh die Tasche auf links, dann sind die Knoten innen. Fertig!' },
      ],
      danach: ['**Upcycling** heißt: Aus etwas Altem wird etwas Neues mit **mehr Wert**. Das spart Rohstoffe, Wasser und Geld. Und deine Tasche gibt es nur einmal.'],
      woerter: [['das Upcycling', 'l’upcycling'], ['der Henkel', 'l’anse'], ['der Halsausschnitt', 'l’encolure'], ['der Saum', 'l’ourlet'], ['die Franse', 'la frange'], ['verknoten', 'nouer'], ['auf links drehen', 'retourner'], ['der Rohstoff', 'la matière première']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit der Anleitung.', stufe: 1, fragen: [{ f: 'Was wird aus den Ärmeln?', l: 'die Henkel' }, { f: 'Wie lang und wie breit sind die Fransen?', l: '8 cm lang, etwa 2 cm breit' }, { f: 'Warum dreht man die Tasche zum Schluss auf links?', l: 'damit die Knoten innen sind' }, { f: 'Was bedeutet Upcycling?', zeilen: 2, l: 'Aus etwas Altem wird etwas Neues mit mehr Wert.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Präsentation', wo: 'Textilraum · Ausstellung', titel: 'Unsere Upcycling-Ausstellung',
      situation: 'Die Klasse zeigt ihre Upcycling-Werkstücke. Amira und Jana stellen ihre Ideen vor.',
      bild: ['amira:stolz:stehen-zeigen', 'jana:froh:stehen'], sprecher: { Amira: 'w2', Jana: 'w3', 'Herr Mensah': 'm2' },
      text: [
        ['Amira', 'Ich habe aus einem T-Shirt von meinem Onkel eine Einkaufstasche gemacht. Das T-Shirt hatte ein Loch am Rücken. Das Loch ist jetzt weg, weil es genau da war, wo ich den Halsausschnitt geschnitten habe.'],
        ['Herr Mensah', 'Clever! Wie lange hast du gebraucht?'],
        ['Amira', 'Ungefähr eine Stunde. Am längsten hat das Verknoten gedauert.'],
        ['Jana', 'Ich habe aus einer alten Jeans ein Federmäppchen gemacht. Das Hosenbein war schon wie ein Rohr. Ich habe es abgeschnitten, unten zugenäht und oben einen Reißverschluss eingenäht.'],
        ['Herr Mensah', 'War der Reißverschluss schwer?'],
        ['Jana', 'Ja, sehr. Ich musste ihn zweimal auftrennen. Aber jetzt ist er gerade. Und die Gesäßtasche der Jeans habe ich vorne draufgenäht – da passt mein Radiergummi hinein.'],
        ['Herr Mensah', 'Zwei schöne Beispiele. Und wisst ihr, was das Beste ist? Dafür musste kein neuer Stoff hergestellt werden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „auftrennen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Naht vorsichtig wieder öffnen', 'etwas zusammenkleben'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Amira', 'Jana'], breiten: [24, 38, 38], zeilen: [['altes Teil', '[T-Shirt (vom Onkel), mit Loch]', '[alte Jeans]'], ['neues Werkstück', '[Einkaufstasche]', '[Federmäppchen]'], ['schwierig war', '[das Verknoten (dauerte am längsten)]', '[der Reißverschluss]'], ['besondere Idee', '[Loch beim Halsausschnitt weggeschnitten]', '[Gesäßtasche vorne als kleines Fach]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was könnte man noch aus alten Sachen machen? Sammelt Ideen und stellt eine vor.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Kissen aus einem Pulli', 'Stirnband aus einem Shirt-Ärmel', 'Topflappen aus Jeans', 'Schlüsselband aus Stoffresten'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Upcycling', punkte: ['aus **Altem** wird **Neues** mit mehr Wert', 'spart **Rohstoffe**, Wasser, Geld', 'jedes Stück ist **einzigartig**'] },
         { titel: 'T-Shirt-Tasche', nummern: true, punkte: ['**Ärmel** ab = Henkel', '**Halsausschnitt** = Öffnung', '**Fransen** schneiden', 'vorne und hinten **verknoten**', '**auf links** drehen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Upcycling-Steckbrief: Fülle ihn für dein Werkstück aus.', stufe: 2, kopf: ['', 'Mein Werkstück'], breiten: [32, 68], zeilen: [['altes Teil', ''], ['neues Werkstück', ''], ['Material und Werkzeug', ''], ['Zeit', ''], ['schwierig war', ''], ['darauf bin ich stolz', '']] },
      { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Upcycling heißt, Kleidung wegzuwerfen.', false], ['Beim Upcycling braucht man keinen neuen Stoff.', true], ['Für ein T-Shirt braucht man nur wenig Wasser.', false], ['Eine T-Shirt-Tasche kann man ohne Nähmaschine machen.', true]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Was hast du gemacht? Wie bist du vorgegangen? Würdest du es wieder machen?', stufe: 2,
        anfaenge: ['Ich habe aus … ein/eine … gemacht.', 'Zuerst …', 'Schwierig war …', 'Ich würde es wieder machen, weil …'], zeilen: 7,
        beispiel: 'Ich habe aus einem alten Fußballtrikot eine Tasche gemacht. Zuerst habe ich die Ärmel abgeschnitten und den Halsausschnitt größer gemacht. Schwierig war, die Fransen gleich breit zu schneiden. Ich würde es wieder machen, weil die Tasche jetzt eine Erinnerung an meinen alten Verein ist.' },
    ],
    check: ['Ich erkläre, was Upcycling ist.', 'Ich setze eine Anleitung Schritt für Schritt um.', 'Ich stelle mein Werkstück vor.'],
  },
]
