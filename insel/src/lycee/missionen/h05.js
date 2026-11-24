// REAL TALK #05 „Grenzen“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Körpersprache lesen und nachfragen
// statt raten · Ich-Botschaft statt Angriff, zuhören ist nicht zustimmen · eigene Grenzen spüren (Körper, Inneres, Digital) ·
// klares Stopp mit Körper, Stimme und Worten – und ein Nein hören. Alle Personen erfunden. Hilfe: 116 111.
export default {
  // ---------- Stunde 1 · Dein Körper redet mit → Ohne Worte ----------
  'KOERPER-1': {
    start: [
      ['h:Herr Lenz', 'Kleine Aufgabe für heute: Lies fünf Leute – ohne dass sie etwas sagen. Und dann frag nach, ob du recht hattest.'],
      ['e', 'Der Körper sendet immer. Aber was er sendet, weißt du erst sicher, wenn du fragst.'],
    ],
    schritte: [
      {
        ziel: 'Zum Brunnen. Mia sitzt dort.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { mia: [-6.4, 22.9] },
        zeilen: [
          ['e', 'Mia: Kapuze auf, Knie angezogen, Blick auf den Boden. Als du kommst, dreht sie sich ein Stück weg.'],
          { wahl: [
            { t: 'Sie will reden.', log: 'Mia gelesen: will reden' },
            { t: 'Sie will Abstand – aber vielleicht nicht ganz allein sein.', log: 'Mia gelesen: will Abstand, aber nicht ganz allein sein' },
            { t: 'Sie ist sauer auf mich.', log: 'Mia gelesen: sauer auf mich' },
          ], frage: 'Was sagt Mias Körper?' },
          { wahl: [
            { t: 'In zwei Metern hinsetzen: „Ich sitz nur hier. Du musst nichts sagen.“', log: 'Abstand gelassen und Nähe angeboten', folge: 'Nach einer Weile sagt Mia: „Danke. Ich hab einfach einen miesen Tag.“', skill: true, setze: { miaRuhe: true } },
            { t: 'Direkt neben sie: „Was ist los? Sag schon.“', log: 'Mia bedrängt: „Sag schon.“', folge: 'Mia steht auf und geht.', skill: false },
            { t: 'Weitergehen.', log: 'Mia in Ruhe gelassen', folge: 'Mia bleibt allein sitzen.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zum Korbfeld. Lio steht am Rand.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.4, 21.2] },
        zeilen: [
          ['e', 'Lio: Arme verschränkt, Schultern hoch, Gesicht starr. Er schaut zum Korb.'],
          { wahl: [
            { t: 'Er ist wütend.', log: 'Lio gelesen: wütend' },
            { t: 'Er friert.', log: 'Lio gelesen: friert' },
            { t: 'Weiß ich nicht – ich frag.', log: 'Bei Lio nicht geraten, sondern gefragt' },
          ], frage: 'Was sagt Lios Körper?' },
          { wahl: [
            { t: '„Du wirkst angespannt. Stimmt das, oder täusch ich mich?“', log: 'Die eigene Deutung als Frage gestellt', folge: 'Lio lacht: „Angespannt? Mir ist arschkalt. Jacke vergessen.“', skill: true },
            { t: '„Chill mal, warum bist du so sauer?“', log: 'Lio eine Wut unterstellt', folge: 'Lio: „Bin ich nicht! … Jetzt schon.“', skill: false },
          ] },
          { moment: 'Wendung: Lio war nicht wütend. Er hat gefroren. Der Körper gibt Hinweise – sicher wird es erst durch Fragen.' },
        ],
      },
      {
        ziel: 'Zur Skate-Ecke. Malik winkt schon.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6, null, 'redet'], chloe: [-35.6, 20.2] },
        zeilen: [
          ['e', 'Malik: offen, lacht, dreht sich zu dir. Chloé daneben: Kopfhörer auf, Rücken zur Gruppe, tippt.'],
          ['malik', 'Hey! Komm her, ich zeig dir den Trick!'],
          { wahl: [
            { t: 'Mit Malik reden – und Chloé in Ruhe lassen.', log: 'Malik als „will reden“, Chloé als „will Abstand“ gelesen und danach gehandelt', folge: 'Chloé nickt dir kurz zu. Abstand respektiert.', skill: true },
            { t: 'Chloé antippen: „Kommst du auch?“', log: 'Chloé angetippt, obwohl sie Abstand zeigte', folge: 'Chloé zuckt zusammen: „Ey! Ich telefonier gerade!“', skill: false },
          ] },
          ['malik', '(leiser) Weißt du, was komisch ist? Alle denken, ich will immer reden. Manchmal will ich das gar nicht.'],
          { wahl: [
            { t: '„Woran merke ich das bei dir?“', log: 'Malik gefragt, woran man seinen Rückzug erkennt', folge: 'Malik: „Wenn ich mehr Witze mache als sonst.“', skill: true },
            { t: '„Sieht man dir nicht an.“', log: 'Malik nicht weiter gefragt', folge: 'Malik zuckt mit den Schultern.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Abends: eine Nachricht von Jade.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['du', '(schreibst) Kommst du Samstag mit zum Turnier?'],
          ['h:Jade', 'ok.'],
          ['e', 'Zwei Buchstaben. Ein Punkt. Kein Gesicht, keine Stimme.'],
          { wahl: [
            { t: '„Ok heißt du freust dich – oder ok heißt du musst halt? 😄“', log: 'Im Chat nachgefragt, statt in „ok.“ etwas hineinzulesen', folge: 'Jade: „Haha. Freu mich. War nur im Bus.“', skill: true },
            { t: 'Sie ist sauer. Nicht mehr schreiben.', log: '„ok.“ als „sauer“ gelesen', folge: 'Samstag fragt Jade: „Warum hast du nicht mehr geschrieben?“', skill: false },
            { t: 'Eine Sprachnachricht schicken.', log: 'Eine Sprachnachricht geschickt – mit Stimme', folge: 'Jade schickt auch eine. Sie lacht darin.', skill: true },
          ] },
          ['h:Jade', 'Und du hast heute alle gelesen, oder? Malik hat’s erzählt. Wie viele lagst du richtig?'],
          { skala: 'Wie oft lag dein erster Eindruck heute richtig?', links: 'nie', rechts: 'immer' },
        ],
      },
    ],
    ende: [['e', 'Am nächsten Tag liegt eine Sonnenbrille in deinem Spind. Ein Zettel dran: „Für den Blick. Fragen nicht vergessen. – H. Lenz“']],
    resuemee: { frage: 'Bei wem habt ihr schon mal die Körpersprache falsch gelesen – und was hat die Frage geändert?', satz: 'Wenn ich unsicher bin, was jemand meint, frage ich: …' },
  },

  // ---------- Stunde 2 · Streiten ohne Krieg → Ich statt Du ----------
  'ICH-2': {
    start: [
      ['h:Malik', 'Billard im Jugendhaus. Finn spielt unfair. Komm und sag ihm das!'],
      ['e', 'Zwei Leute, eine Regel, ein Streit. Ein Angriff macht ihn größer. Eine Info macht ihn lösbar.'],
    ],
    schritte: [
      {
        ziel: 'Zum Jugendhaus. Am Billardtisch knallt es gleich.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], finn: [24.4, 120.8, null, 'redet'] },
        zeilen: [
          ['malik', 'Die schwarze Kugel zum Schluss! Das weiß jeder! Du bist so ein Betrüger!'],
          ['finn', 'Bei uns zählt das anders! Du verlierst nur nicht gern!'],
          { wahl: [
            { t: '„Malik hat recht. Finn, das ist Betrug.“', log: 'Partei ergriffen: „Betrug“', folge: 'Finn wirft den Queue auf den Tisch.', skill: false, setze: { partei: true } },
            { t: '„Stopp. Jeder sagt einmal, was los ist – ohne Schimpfwort.“', log: 'Den Streit unterbrochen und Regeln fürs Reden gesetzt', folge: 'Beide schauen dich an. Kurz ist es still.', skill: true },
            { t: 'Daneben stehen und abwarten.', log: 'Abgewartet', folge: 'Es wird lauter. Herr Lenz kommt aus dem Büro.', skill: null },
          ] },
          ['malik', '(geht raus) Ich hab keinen Bock mehr.'],
        ],
      },
      {
        ziel: 'Malik ist zum Marktplatz gegangen. Geh ihm nach.', ort: 'Marktplatz', p: [57.0, 113.2], leute: { malik: [58.6, 112.6] },
        zeilen: [
          ['malik', 'Er ist ein Betrüger. Punkt.'],
          ['du', 'Okay, er nervt dich. Aber was ist bei dir los?'],
          ['malik', '… Ich bin sauer. Ich hatte endlich mal eine Chance zu gewinnen.'],
          ['e', 'Bau mit Malik einen Satz, den Finn hören kann. Ich bin … weil … Ich will, dass …'],
          { wahl: [
            { t: '„Ich bin sauer, weil ich dachte, ich gewinne gleich.“', log: 'Ich-Satz Teil 1 gebaut: was los ist', skill: true, setze: { malikTeil1: true } },
            { t: '„Du betrügst immer.“', log: 'Mit einem Du-Satz angefangen', folge: 'Ein Angriff. Finn hört da nicht mehr zu.', skill: false },
            { t: '„Ich finde, du bist unfair.“', log: 'Ein versteckter Angriff mit „Ich finde, du bist …“', folge: 'Fängt mit „Ich“ an – ist aber ein Urteil über Finn.', skill: false },
          ], frage: 'Wie fängt Malik an?' },
          { wahl: [
            { t: '„Ich will, dass wir die Regel vorher abmachen.“', log: 'Ich-Satz Teil 2 gebaut: was er will', skill: true, setze: { malikSatz: true } },
            { t: '„Ich will, dass du zugibst, dass du betrogen hast.“', log: 'Ein Wunsch, der eine Niederlage verlangt', folge: 'Darauf lässt sich Finn nicht ein.', skill: false },
          ], frage: 'Und was will Malik?' },
        ],
      },
      {
        ziel: 'Am Handy: Finn schreibt dir.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['h:Finn', 'Du bist eh immer auf Maliks Seite. Danke für nix.'],
          { wenn: (f) => f.partei, dann: [['e', 'Du hast vorhin wirklich Partei ergriffen. Das sitzt.']] },
          { wahl: [
            { t: '„Ich bin genervt, weil ich zwischen euch stehe. Ich will, dass wir das zu dritt klären.“', log: 'Selbst angegriffen – mit einem eigenen Ich-Satz geantwortet', folge: 'Finn: „Okay. Morgen, Jugendhaus.“', skill: true },
            { t: '„Und du bist immer so empfindlich.“', log: 'Mit einem Du-Satz zurückgeschossen', folge: 'Finn liest es. Keine Antwort mehr.', skill: false, setze: { finnZu: true } },
            { t: 'Nicht antworten.', log: 'Nicht geantwortet', folge: 'Finn schreibt: „Siehste.“', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Am nächsten Tag: Jugendhaus. Malik und Finn sind beide da.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], finn: [24.4, 120.8], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          { wenn: (f) => f.finnZu, dann: [['finn', '(kommt doch, mit Händen in den Taschen) Herr Lenz hat gesagt, ich soll kommen.']] },
          { wenn: (f) => f.malikSatz && f.malikTeil1, dann: [['malik', 'Ich war sauer, weil ich dachte, ich gewinne gleich. Ich will, dass wir die Regel vorher abmachen.']], sonst: [{ wenn: (f) => f.malikTeil1, dann: [['malik', 'Ich war sauer, weil ich dachte, ich gewinne gleich.']], sonst: [['malik', 'Du hast mich abgezogen.']] }] },
          ['finn', 'Bei uns im Verein zählt die schwarze Kugel anders. Ich hab nicht betrogen.'],
          ['e', 'Jetzt der schwerste Teil: zuhören, ohne gleich zuzustimmen.'],
          { wahl: [
            { t: 'Zu Malik: „Sag mal mit deinen Worten, was Finn gerade gesagt hat.“', log: 'Malik zusammenfassen lassen, was Finn meint', folge: 'Malik: „In deinem Verein ist die Regel anders. … Okay. Wusste ich nicht.“', skill: true },
            { t: '„Also, wer hat jetzt recht?“', log: 'Nach dem Gewinner gefragt', folge: 'Beide sagen gleichzeitig: „Ich!“', skill: false },
          ] },
          ['lenz', 'Ich hab einen Vorschlag: Regeltafel an die Wand. Wer hängt sie auf?'],
          { moment: 'Am Ende hing eine Regeltafel am Billardtisch – geschrieben von Malik und Finn zusammen.' },
          { notiz: 'Ein Ich-Satz für einen Streit mit Freunden oder in der Klasse (ohne Namen):', platz: 'Ich bin …, weil … Ich will, dass …' },
        ],
      },
    ],
    ende: [['lenz', 'Der goldene Queue hängt jetzt bei den Regeln. Und der Hoodie ist für dich.']],
    resuemee: { frage: 'Welcher Satz bringt einen Streit bei euch sofort auf 100 – und wie klingt er als Ich-Satz?', satz: 'Mein Ich-Satz für den nächsten Streit: …' },
  },

  // ---------- Stunde 3 · Bis hierhin → Bauchgefühl ----------
  'GRENZE-3': {
    start: [
      ['h:Jade', 'Die Älteren chillen heute an der Lichtung. Ich wurde eingeladen. Kommst du mit? Allein ist komisch.'],
      ['e', 'Grenzen merkst du zuerst im Körper. Der Kopf kommt später.'],
    ],
    schritte: [
      {
        ziel: 'Zum Anfang des Waldwegs. Jade wartet.', ort: 'Waldweg', p: [-61.2, -27.4], leute: { jade: [-62.6, -26.6] },
        zeilen: [
          ['jade', 'Die sind älter. Sei einfach cool, okay?'],
          ['e', 'Kurz bevor ihr losgeht: Was merkst du in deinem Körper?'],
          { wahl: [
            { t: 'Nichts Besonderes.', log: 'Signal am Start: nichts', privat: true },
            { t: 'Ein Knoten im Bauch.', log: 'Signal am Start: Knoten im Bauch', privat: true },
            { t: 'Herzklopfen.', log: 'Signal am Start: Herzklopfen', privat: true },
            { t: 'Freude, Kribbeln.', log: 'Signal am Start: Vorfreude', privat: true },
          ], frage: 'Dein Signal? (Nur für dich.)' },
          { wahl: [
            { t: '„Ich komm mit. Aber wenn mir was komisch ist, geh ich. Du kannst mitkommen.“', log: 'Vorher einen Ausstieg abgemacht', folge: 'Jade: „Deal.“', skill: true, setze: { ausstieg: true } },
            { t: '„Klar, wird schon.“', log: 'Ohne Plan losgegangen', folge: 'Ihr geht los.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zur Lichtung.', ort: 'Lichtung', p: [-57.8, -97.4], leute: { jade: [-59.4, -96.4], sara: [-56.2, -99.0, null, 'redet'], malik: [-58.6, -99.6, null, 'redet'], finn: [-55.8, -97.0] },
        zeilen: [
          ['e', 'Ein paar aus der 5ème, dazu Sara, Malik und Finn. Musik aus einer Box. Sara nimmt dir dein Handy aus der Hand.'],
          ['sara', 'Zeig mal deine Fotos. Hast du was Peinliches?'],
          { wahl: [
            { t: 'Hand hin: „Das geb ich nicht her. Gib’s zurück.“', log: 'Digitale Grenze gezogen: Handy zurückgefordert', folge: 'Sara: „Uuh, okay, okay.“ Sie gibt es zurück.', skill: true },
            { t: 'Lachen und es geschehen lassen.', log: 'Digitale Grenze überschreiten lassen und mitgelacht', folge: 'Sara scrollt durch deine Fotos und zeigt eins herum.', skill: false, setze: { foto: true } },
          ] },
          ['malik', '(legt dir den Arm um die Schulter) Selfie! Alle zusammen!'],
          { wahl: [
            { t: 'Einen Schritt zur Seite: „Ohne Arm. Ich bin trotzdem drauf.“', log: 'Körperliche Grenze gezeigt – freundlich', folge: 'Malik nimmt den Arm weg. Ihr macht das Foto trotzdem.', skill: true },
            { t: 'Stillhalten, obwohl es unangenehm ist.', log: 'Den Arm geduldet, obwohl er unangenehm war', folge: 'Auf dem Foto lächelst du. Komisch.', skill: false },
            { t: 'Ist okay für mich.', log: 'Der Arm war okay', folge: 'Für dich war das in Ordnung – auch das darf sein.', skill: null },
          ] },
          ['sara', 'Und warum warst du letzte Woche zwei Tage nicht da? Erzähl mal.'],
          { wahl: [
            { t: '„Das bleibt bei mir.“', log: 'Innere Grenze gezogen: Persönliches für sich behalten', folge: 'Sara: „Na gut.“ Es geht weiter.', skill: true },
            { t: 'Irgendwas erfinden, damit Ruhe ist.', log: 'Eine Geschichte erfunden', folge: 'Sara fragt nach. Die Lüge wird größer.', skill: false },
          ] },
          ['finn', '(hält eine Vape hin) Ein Zug? Mango. Merkt keiner.'],
          { moment: 'An der Lichtung wurde dir eine Vape angeboten.' },
          { wahl: [
            { t: '„Nee.“ Und einfach dabeibleiben.', log: 'Nein gesagt und geblieben', folge: 'Finn: „Okay.“ Er fragt nicht noch mal.', skill: true },
            { wenn: (f) => f.ausstieg, t: '„Nee. Jade, wir gehen.“', log: 'Nein gesagt und den abgemachten Ausstieg genutzt', folge: 'Jade steht sofort auf. Erleichtert.', skill: true, setze: { gegangen: true } },
            { wenn: (f) => !f.ausstieg, t: '„Nee. Jade, wir gehen.“', log: 'Nein gesagt und mit Jade gegangen', folge: 'Jade steht sofort auf. Erleichtert.', skill: true, setze: { gegangen: true } },
            { t: 'Einen Zug nehmen, damit es nicht komisch wird.', log: 'Einen Zug genommen, um dazuzugehören', folge: 'Es kratzt im Hals. Dir ist kurz schlecht. Jade schaut dich an.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Waldweg. Jade will reden.', ort: 'Waldweg', p: [-61.2, -27.4], leute: { jade: [-62.6, -26.6] },
        zeilen: [
          { wenn: (f) => f.gegangen, dann: [['jade', 'Danke, dass du „wir gehen“ gesagt hast. Ich wollte schon lange weg.']], sonst: [['jade', 'Ich hab mich die ganze Zeit komisch gefühlt.']] },
          ['jade', 'Das mit dem Arm fand ich gar nicht schlimm. Aber das Handy – da wär ich ausgerastet.'],
          { wahl: [
            { t: '„Bei mir liegt die Grenze woanders. Komisch, wie verschieden das ist.“', log: 'Erkannt: Grenzen liegen bei jedem woanders', folge: 'Jade: „Darum muss man es sagen. Raten geht nicht.“', skill: true },
            { t: '„Stell dich nicht so an mit dem Handy.“', log: 'Jades Grenze kleingeredet', folge: 'Jade schweigt den Rest des Weges.', skill: false },
          ] },
          { wenn: (f) => f.foto, dann: [
            ['jade', 'Sara hat das Foto aus deinem Handy schon in ihren Status gestellt.'],
            { wahl: [
              { t: 'Sara schreiben: „Bitte nimm das sofort raus. Das war nicht okay.“', log: 'Das Foto zurückgefordert', folge: 'Nach zehn Minuten ist es weg.', skill: true },
              { t: 'Nichts tun und hoffen, dass es keiner sieht.', log: 'Das Foto stehen lassen', folge: 'Es sehen 43 Leute.', skill: false },
            ] },
          ] },
          ['jade', 'Wem würdest du es sagen, wenn es mal richtig zu weit geht?'],
          { wahl: [
            { t: 'Herrn Lenz', log: 'Vertrauensperson: Herr Lenz' },
            { t: 'Herrn Kuedes (SePAS)', log: 'Vertrauensperson: Herr Kuedes' },
            { t: 'Einem Freund oder einer Freundin', log: 'Vertrauensperson: Freund oder Freundin' },
            { t: 'Dem Kinder- und Jugendtelefon 116 111', log: 'Vertrauensperson: 116 111' },
          ] },
        ],
      },
    ],
    ende: [['jade', '(gibt dir einen alten Kompass) Den hab ich gefunden. Für wenn man den Weg raus braucht.']],
    resuemee: { frage: 'Welche Sorte Grenze wird bei Jugendlichen am häufigsten überschritten – Körper, Inneres oder Digital?', satz: 'Mein Signal für „zu viel“ ist … Dann sage ich: …' },
  },

  // ---------- Stunde 4 · Stopp. → Nein ist ein Satz ----------
  'STOPP-4': {
    start: [
      ['e', 'Heute wollen drei Leute etwas von dir. Ein Nein muss nicht laut sein. Aber klar: Körper, Stimme, Worte.'],
    ],
    schritte: [
      {
        ziel: 'Zur Bäckerei. Finn fängt dich ab.', ort: 'Bäckerei', p: [0.4, 54.2], leute: { finn: [2.0, 54.6, null, 'redet'] },
        zeilen: [
          ['finn', 'Du, wenn Frau Brandt fragt: Ich war gestern beim Arzt, okay? Sag einfach Ja. Bitte.'],
          { wahl: [
            { t: '„Nee. Für dich lüg ich nicht. Aber ich komm mit, wenn du’s ihr selbst sagst.“', log: 'Nein gesagt – mit Angebot', folge: 'Finn: „Mann … okay. Kommst du echt mit?“', skill: true },
            { t: '„Ähm … vielleicht … mal sehen.“', log: 'Unklar geantwortet: „vielleicht“', folge: 'Finn hört ein Ja.', skill: false, setze: { finnVerlass: true } },
            { t: '„Klar.“', log: 'Ja gesagt, obwohl Nein gemeint', folge: 'Finn klopft dir auf die Schulter: „Du bist der Beste.“', skill: false, setze: { finnVerlass: true } },
          ] },
          { wenn: (f) => f.finnVerlass, dann: [['e', 'Am Nachmittag beim Training kommt Frau Brandt zu dir.'], ['brandt', 'Kurze Frage: Finn sagt, du weißt, dass er gestern beim Arzt war?'], { wahl: [
            { t: '„Dazu sag ich nichts. Fragen Sie Finn bitte selbst.“', log: 'Später doch eine klare Grenze gezogen', folge: 'Frau Brandt: „Fair.“', skill: true },
            { t: '„Ja, war er.“', log: 'Für Finn gelogen', folge: 'Frau Brandt notiert es. Du fühlst dich mies.', skill: false },
          ] }] },
        ],
      },
      {
        ziel: 'Zum Skatepark im Dorf. Lio filmt.', ort: 'Skatepark', p: [90.0, 80.0], leute: { lio: [91.6, 81.0, null, 'handy'] },
        zeilen: [
          ['e', 'Du stürzt bei einem Trick. Lio hat alles gefilmt.'],
          ['lio', '(lacht) Das wird viral! Ich poste das!'],
          { wahl: [
            { t: '„Haha, lass mal …“ (lächeln)', log: 'Erstes Stopp: lächelnd und unklar', folge: 'Lio tippt weiter: „Klingt nach Ja.“', skill: false, setze: { unklar: true } },
            { t: 'Gerade hinstellen, Blick ins Gesicht: „Stopp. Das postest du nicht.“', log: 'Klares Stopp: Körper, Stimme, Worte', folge: 'Lio hält inne: „Okay. Schon gut.“', skill: true },
          ] },
          { wenn: (f) => f.unklar, dann: [
            ['lio', 'Komm, ist doch lustig. Nur in die Gruppe.'],
            { wahl: [
              { t: 'Jetzt klar: Hand hoch. „Nein. Lösch es. Jetzt.“ – ohne Lächeln.', log: 'Zweites Stopp: klar, ohne Lächeln', folge: 'Lio merkt: Das ist ernst. Er löscht es vor deinen Augen.', skill: true },
              { t: 'Aufgeben. Ist eh egal.', log: 'Das Stopp aufgegeben', folge: 'Am Abend haben es 30 Leute gesehen.', skill: false, setze: { aufgegeben: true } },
            ] },
            { moment: 'Ein „haha, lass mal“ hat Lio als Ja gehört. Erst ein klares Stopp kommt an.' },
          ] },
        ],
      },
      {
        ziel: 'Zum Marktplatz. Sara wartet mit ihrem Handy.', ort: 'Marktplatz', p: [57.0, 113.2], leute: { sara: [58.6, 112.6, null, 'handy'] },
        zeilen: [
          ['sara', 'Gib mir kurz dein Passwort für das Spiel. Ich mach dir die Daily-Quests. Dann hast du mehr Level!'],
          { wahl: [
            { t: '„Nein. Mein Passwort kriegt keiner. Auch du nicht.“', log: 'Nein zum Passwort – ohne lange Erklärung', folge: 'Sara: „Okay, war nur nett gemeint.“', skill: true },
            { t: '„Wieso willst du das?“', log: 'Erst nachgefragt', folge: 'Sara hat drei Gründe. Du wirst unsicher.', skill: null, dann: [['sara', 'Weil ich eh spiele! Weil du sonst nie aufholst! Weil Freunde das machen!'], { wahl: [
              { t: '„Trotzdem nein.“', log: 'Nach Diskussion doch beim Nein geblieben', folge: 'Sara: „Na gut.“', skill: true },
              { t: '„Na gut …“ – und das Passwort sagen.', log: 'Das Passwort herausgegeben', folge: 'Eine Woche später: Dein Konto hat neue Skins gekauft. Nicht von dir.', skill: false },
            ] }] },
          ] },
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Jetzt fragst du selbst.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { jade: [23.9, 119.4] },
        zeilen: [
          ['du', 'Jade, kommst du Samstag mit zum Turnier? Bitte!'],
          ['jade', 'Nein. Ich will am Samstag einfach mal nichts.'],
          { moment: 'Wendung: Am Ende hast du selbst ein Nein bekommen.' },
          { wahl: [
            { t: '„Okay.“', log: 'Ein Nein gehört und „Okay“ gesagt', folge: 'Jade lächelt: „Danke, dass du nicht bettelst.“', skill: true },
            { t: '„Warum nicht? Komm schon, nur kurz!“', log: 'Nach einem Nein weitergedrängt', folge: 'Jade: „Siehst du, genau das nervt.“', skill: false },
            { t: '„Dann bist du langweilig.“', log: 'Ein Nein mit einem Spruch bestraft', folge: 'Jade dreht sich weg.', skill: false },
          ] },
          { skala: 'Wie schwer fällt dir ein klares Nein?', links: 'leicht', rechts: 'sehr schwer' },
        ],
      },
    ],
    ende: [{ wenn: (f) => f.aufgegeben, dann: [['h:Lio', 'Sorry wegen dem Video. Ich hätte fragen müssen. Ich lösch es jetzt.'], ['e', 'Am nächsten Tag liegt eine rote Kappe mit einer weißen Hand in deinem Spind. Ein Zettel: „Für dein nächstes Stopp.“']],
      sonst: [['e', 'Abends liegt eine Kappe vor deiner Tür. Rot, mit einer weißen Hand darauf. Von Lio. Daneben ein Zettel: „Hab’s gelöscht.“']] }],
    resuemee: { frage: 'Wann ist euch ein Nein schwergefallen – und wie klang es, als es endlich klar war?', satz: 'Mein klares Nein klingt so: …' },
  },
};
