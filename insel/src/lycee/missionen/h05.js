// REAL TALK #05 „Grenzen“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Körpersprache lesen und nachfragen
// statt raten · Wort-Schere: das Gift aus einem Satz schneiden, der Kern bleibt · Nähe und Abstand, Grenzen liegen bei jedem woanders ·
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
            { t: 'Abstand – aber nicht ganz allein.', log: 'Mia gelesen: will Abstand, aber nicht ganz allein sein' },
            { t: 'Sie ist sauer auf mich.', log: 'Mia gelesen: sauer auf mich' },
          ], frage: 'Was sagt Mias Körper?' },
          { wahl: [
            { t: 'Mit Abstand hinsetzen.', log: 'Abstand gelassen und Nähe angeboten', folge: 'Du sagst: „Du musst nichts sagen.“ Nach einer Weile sagt Mia: „Danke. Ich hab einfach einen miesen Tag.“', skill: true, setze: { miaRuhe: true } },
            { t: 'Direkt daneben: „Sag schon.“', log: 'Mia bedrängt: „Sag schon.“', folge: 'Mia steht auf und geht.', skill: false },
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
            { t: '„Angespannt – oder täusch ich mich?“', log: 'Die eigene Deutung als Frage gestellt', folge: 'Lio lacht: „Angespannt? Mir ist eiskalt. Jacke vergessen.“', skill: true },
            { t: '„Warum bist du so sauer?“', log: 'Lio eine Wut unterstellt', folge: 'Lio: „Bin ich nicht! … Jetzt schon.“', skill: false },
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
            { t: 'Malik ja. Chloé in Ruhe.', log: 'Malik als „will reden“, Chloé als „will Abstand“ gelesen und danach gehandelt', folge: 'Chloé nickt dir kurz zu. Abstand respektiert.', skill: true },
            { t: 'Chloé antippen: „Kommst du auch?“', log: 'Chloé angetippt, obwohl sie Abstand zeigte', folge: 'Chloé zuckt zusammen: „Ey! Ich schreib gerade!“', skill: false },
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
            { t: '„Ok wie gern – oder wie muss? 😄“', log: 'Im Chat nachgefragt, statt in „ok.“ etwas hineinzulesen', folge: 'Jade: „Haha. Freu mich. War nur im Bus.“', skill: true },
            { t: 'Sauer. Nicht mehr schreiben.', log: '„ok.“ als „sauer“ gelesen', folge: 'Samstag fragt Jade: „Warum hast du nicht mehr geschrieben?“', skill: false },
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

  // ---------- Stunde 2 · Streiten ohne Krieg → Die Wort-Schere (neu 27.11.2026: Ich-Satz-Bauplan raus) ----------
  'ICH-2': {
    start: [
      ['h:Malik', 'Billard im Jugendhaus. Finn spielt unfair. Komm und sag ihm das!'],
      ['e', 'Ein Satz mit Gift macht jeden Streit größer. Schneid das Gift raus – der Kern darf bleiben.'],
    ],
    schritte: [
      {
        ziel: 'Zum Jugendhaus. Am Billardtisch knallt es gleich.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], finn: [24.4, 120.8, null, 'redet'] },
        zeilen: [
          ['malik', 'Die schwarze Kugel zum Schluss! Das weiß jeder! Du betrügst IMMER! Typisch du!'],
          ['finn', 'Ich betrüg nicht! Ich kenn die Regel anders!'],
          { wahl: [
            { t: '„IMMER“', log: 'Wort-Schere: „IMMER“ rausgeschnitten', folge: 'Ohne „immer“ geht es nur noch um heute.', skill: true, setze: { schere: true } },
            { t: '„Typisch du“', log: 'Wort-Schere: „typisch du“ rausgeschnitten', folge: 'Ohne „typisch du“ geht es um die Kugel – nicht um Finn.', skill: true, setze: { schere: true } },
            { t: '„Die schwarze Kugel“', log: 'Wort-Schere: den Kern rausgeschnitten', folge: 'Das ist der Kern. Der darf bleiben!', skill: false },
            { t: 'Nichts. Passt so.', log: 'Wort-Schere: nichts rausgeschnitten', folge: 'Finn wird lauter: „Ach ja? Und du?“', skill: false },
          ], frage: 'Wort-Schere: Was schneidest du aus Maliks Satz?' },
          ['finn', '(legt den Queue hin) Spielt doch allein.'],
          ['e', 'Finn geht. Malik schnaubt und geht in die andere Richtung.'],
        ],
      },
      {
        ziel: 'Malik sitzt auf der Bank am Marktplatz.', ort: 'Marktplatz', p: [57.0, 113.2], leute: { malik: [58.6, 112.6, null, 'redet'] },
        zeilen: [
          ['malik', 'Er hat doch betrogen. Was soll ich ihm denn sonst sagen?'],
          { wahl: [
            { t: '„Sag die Regel vorher.“', log: 'Was übrig bleibt: die Regel vorher klären', folge: 'Malik: „… Das klingt nicht mal nach Streit.“', skill: true, setze: { malikSatz: true } },
            { t: '„Lass mich ausreden.“', log: 'Was übrig bleibt: ausreden lassen', folge: 'Auch gut. Aber um die Kugel geht es dann noch nicht.', skill: null },
            { t: '„Gib’s zu!“', log: 'Noch ein Satz mit Gift', folge: 'Noch Gift drin. Finn macht dann nur dicht.', skill: false },
            { t: '„Ich finde, du bist unfair.“', log: 'Ein Ich-Satz mit Gift gewählt', folge: 'Fängt mit „Ich“ an. Das Gift ist trotzdem drin: „du bist unfair“.', skill: false },
          ], frage: 'Was bleibt übrig, wenn das Gift weg ist?' },
        ],
      },
      {
        ziel: 'Abends: eine Nachricht von Finn.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['h:Finn', 'Du bist IMMER auf Maliks Seite.'],
          ['e', 'Da ist es wieder: IMMER. Diesmal gegen dich.'],
          { wahl: [
            { t: '„Bin ich nicht. Morgen zu dritt?“', log: 'Ohne Gift geantwortet und ein Treffen vorgeschlagen', folge: 'Finn: „… Okay. Aber er fängt an.“', skill: true, setze: { zuDritt: true } },
            { t: '„Und du bist empfindlich.“', log: 'Mit Gift zurückgeschrieben', folge: 'Finn: „Wow. Danke.“ Er ist offline.', skill: false },
            { t: 'Nichts schreiben.', log: 'Nicht geantwortet', folge: 'Finn sieht die zwei blauen Haken. Mehr nicht.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Am nächsten Tag: Training auf dem Sportplatz.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { finn: [-62.8, -2.6], brandt: [-65.8, -2.0, null, 'redet'] },
        zeilen: [
          ['e', 'Der Bus ist ausgefallen. Finn kommt zehn Minuten zu spät. Ihr steht nebeneinander.'],
          ['brandt', '(vor allen) Schon wieder.'],
          ['finn', '(holt Luft) Sie haben doch eh was gegen …'],
          { wahl: [
            { t: '„Bus ausgefallen. Sorry.“', log: 'Finn einen Baustein ohne Gift zugeflüstert: den Grund', folge: 'Finn wiederholt es. Etwas leiser.', skill: true, setze: { ohneGift: true } },
            { t: '„Sag: Ist mir peinlich.“', log: 'Finn einen Baustein ohne Gift zugeflüstert: das Gefühl', folge: 'Finn wird rot. Und sagt es.', skill: true, setze: { ohneGift: true } },
            { t: '„Sag: Ich kann nichts dafür!“', log: 'Finn einen wahren Satz zugeflüstert, der wie ein Angriff klingt', folge: 'Stimmt sogar. Aber laut klingt es wie ein Angriff.', skill: null },
          ], frage: 'Du flüsterst Finn etwas zu:' },
          { wenn: (f) => f.ohneGift, dann: [
            ['finn', 'Der Bus ist ausgefallen. Sorry. Ist mir peinlich.'],
            ['brandt', '… Okay. Danke, dass du’s sagst. Warm machen.'],
            { moment: 'Ohne Gift kam Finns Satz an.' },
          ], sonst: [
            ['finn', 'Ich kann nichts dafür!'],
            ['brandt', 'Mit dem Ton? Bank.'],
            { moment: 'Finns Satz war wahr – aber mit Gift kam er nicht an.' },
          ] },
          { wenn: (f) => f.zuDritt, dann: [
            ['e', 'Nach dem Training: Malik, Finn und du am Billardtisch.'],
            ['malik', 'Schwarze Kugel zum Schluss. Sagen wir’s vorher. Für alle.'],
            ['finn', 'Gilt.'],
          ] },
        ],
      },
    ],
    ende: [['lenz', 'Die Regel hängt jetzt an der Wand. Und der Hoodie ist für dich – ohne Gift.']],
    resuemee: { frage: 'Welches Giftwort rutscht euch am schnellsten raus – und reicht der Rest noch?', satz: 'Mein Satz ohne Gift: …' },
  },

  // ---------- Stunde 3 · Bis hierhin → Bauchgefühl ----------
  'GRENZE-3': {
    start: [
      ['h:Jade', 'Ein paar aus der 5ème sind heute an der Lichtung. Ich wurde eingeladen. Kommst du mit? Allein ist komisch.'],
      ['e', 'Grenzen merkst du zuerst im Körper. Der Kopf kommt später.'],
    ],
    schritte: [
      {
        ziel: 'Zum Anfang des Waldwegs. Jade wartet.', ort: 'Waldweg', p: [-61.2, -27.4], leute: { jade: [-62.6, -26.6] },
        zeilen: [
          ['jade', 'Die sind älter. Sei einfach normal, okay?'],
          ['e', 'Kurz bevor ihr losgeht: Was merkst du in deinem Körper?'],
          { wahl: [
            { t: 'Nichts Besonderes.', log: 'Signal am Start: nichts', privat: true },
            { t: 'Ein Knoten im Bauch.', log: 'Signal am Start: Knoten im Bauch', privat: true },
            { t: 'Herzklopfen.', log: 'Signal am Start: Herzklopfen', privat: true },
            { t: 'Freude, Kribbeln.', log: 'Signal am Start: Vorfreude', privat: true },
          ], frage: 'Dein Signal? (Nur für dich.)' },
          { wahl: [
            { t: '„Wenn’s komisch wird, gehen wir.“', log: 'Vorher einen Ausstieg abgemacht', folge: 'Jade: „Deal.“', skill: true, setze: { ausstieg: true } },
            { t: '„Klar, wird schon.“', log: 'Ohne Plan losgegangen', folge: 'Ihr geht los.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zur Lichtung.', ort: 'Lichtung', p: [-57.8, -97.4], leute: { jade: [-59.4, -96.4], sara: [-56.2, -99.0, null, 'redet'], malik: [-58.6, -99.6, null, 'redet'], finn: [-55.8, -97.0], chloe: [-60.4, -98.6] },
        zeilen: [
          ['e', 'Ein paar aus der 5ème, dazu Sara, Malik, Finn und Chloé. Musik aus einer Box. Auf dem Baumstamm ist viel Platz. Finn setzt sich trotzdem ganz dicht neben dich. Schulter an Schulter.'],
          { wahl: [
            { t: 'Ein Stück wegrutschen.', log: 'Nähe: still Abstand geholt', folge: 'Finn merkt nichts. Du hast wieder Luft.', skill: null },
            { t: '„Rutsch mal.“', log: 'Nähe: Abstand mit Worten geholt', folge: 'Finn: „Oh. Sorry.“ Er rutscht.', skill: null },
            { t: '„Ist okay für mich.“', log: 'Nähe: für mich war es okay', folge: 'Für dich passt es – auch das darf sein.', skill: null },
          ], frage: 'Finn rückt ganz dicht ran. Und du?' },
          ['malik', 'Selfie! Alle zusammen!'],
          ['e', 'Du legst Chloé den Arm um die Schulter – wie alle. Chloé lacht. Komisch. Ihre Schultern gehen hoch.'],
          { wahl: [
            { t: '„Ist das okay?“', log: 'Bei Chloé nachgefragt, ob der Arm okay ist', folge: 'Chloé: „Lieber ohne.“ Du nimmst den Arm weg. Jetzt lacht sie echt.', skill: true },
            { t: 'Weiterlächeln.', log: 'Chloés Zeichen übersehen und weitergemacht', folge: 'Auf dem Foto lacht Chloé. Ihr Bauch zieht sich zusammen.', skill: false },
            { t: 'Arm weg, wortlos.', log: 'Chloés Zeichen bemerkt, ohne zu fragen', folge: 'Chloé atmet aus. Gefragt hast du nicht – gemerkt schon.', skill: null },
          ] },
          { moment: 'Ein Arm um die Schulter: für dich eine 1 auf der Grenz-Skala, für Chloé eine 5.' },
          ['sara', 'Und warum warst du letzte Woche zwei Tage nicht da? Erzähl mal.'],
          { wahl: [
            { t: '„Das bleibt bei mir.“', log: 'Innere Grenze gezogen: Persönliches für sich behalten', folge: 'Sara: „Na gut.“ Es geht weiter.', skill: true },
            { t: 'Irgendwas erfinden.', log: 'Eine Geschichte erfunden', folge: 'Sara fragt nach. Die Lüge wird größer.', skill: false },
          ] },
          ['finn', '(hält eine Vape hin) Ein Zug? Mango. Merkt keiner.'],
          { moment: 'An der Lichtung wurde dir eine Vape angeboten.' },
          { wahl: [
            { t: '„Nee.“ Und bleiben.', log: 'Nein gesagt und geblieben', folge: 'Finn: „Okay.“ Er fragt nicht noch mal.', skill: true },
            { wenn: (f) => f.ausstieg, t: '„Nee. Jade, wir gehen.“', log: 'Nein gesagt und den abgemachten Ausstieg genutzt', folge: 'Jade steht sofort auf. Erleichtert.', skill: true, setze: { gegangen: true } },
            { wenn: (f) => !f.ausstieg, t: '„Nee. Jade, wir gehen.“', log: 'Nein gesagt und mit Jade gegangen', folge: 'Jade steht sofort auf. Erleichtert.', skill: true, setze: { gegangen: true } },
            { t: 'Einen Zug nehmen.', log: 'Einen Zug genommen, um dazuzugehören', folge: 'Es kratzt im Hals. Dir ist kurz schlecht. Jade schaut dich an.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Waldweg. Jade will reden.', ort: 'Waldweg', p: [-61.2, -27.4], leute: { jade: [-62.6, -26.6] },
        zeilen: [
          { wenn: (f) => f.gegangen, dann: [['jade', 'Danke, dass du „wir gehen“ gesagt hast. Ich wollte schon lange weg.']], sonst: [['jade', 'Ich hab mich die ganze Zeit komisch gefühlt.']] },
          ['jade', 'Wenn einer so dicht kommt wie Finn, ist mir das egal. Aber wenn einer mein Handy nimmt – da raste ich aus.'],
          { wahl: [
            { t: '„Bei mir liegt sie woanders.“', log: 'Erkannt: Grenzen liegen bei jedem woanders', folge: 'Jade: „Darum muss man es sagen. Raten geht nicht.“', skill: true },
            { t: '„Stell dich nicht so an mit dem Handy.“', log: 'Jades Grenze kleingeredet', folge: 'Jade schweigt den Rest des Weges.', skill: false },
          ] },
          ['jade', 'Wem würdest du es sagen, wenn es mal richtig zu weit geht?'],
          { wahl: [
            { t: 'Herrn Lenz', log: 'Vertrauensperson: Herr Lenz' },
            { t: 'Herrn Kuedes (SePAS)', log: 'Vertrauensperson: Herr Kuedes' },
            { t: 'Einem Freund oder einer Freundin', log: 'Vertrauensperson: Freund oder Freundin' },
            { t: 'Dem Telefon 116 111', log: 'Vertrauensperson: 116 111' },
          ] },
        ],
      },
    ],
    ende: [['jade', '(gibt dir einen alten Kompass) Den hab ich gefunden. Für wenn man den Weg raus braucht.']],
    resuemee: { frage: 'Wo liegen eure Grenzen weit auseinander – und was fragt man dann?', satz: 'Mein Signal für „zu viel“ ist … Dann sage ich: …' },
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
            { t: '„Ich lüg nicht. Ich komm mit.“', log: 'Nein gesagt – mit Angebot', folge: 'Finn: „Mann … okay. Kommst du echt mit?“', skill: true },
            { t: '„Ähm … vielleicht … mal sehen.“', log: 'Unklar geantwortet: „vielleicht“', folge: 'Finn hört ein Ja.', skill: false, setze: { finnVerlass: true } },
            { t: '„Klar.“', log: 'Ja gesagt, obwohl Nein gemeint', folge: 'Finn klopft dir auf die Schulter: „Auf dich ist Verlass.“', skill: false, setze: { finnVerlass: true } },
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
            { t: 'Gerade: „Stopp. Das postest du nicht.“', log: 'Klares Stopp: Körper, Stimme, Worte', folge: 'Lio hält inne: „Okay. Schon gut.“', skill: true },
          ] },
          { wenn: (f) => f.unklar, dann: [
            ['lio', 'Komm, ist doch lustig. Nur in die Gruppe.'],
            { wahl: [
              { t: 'Hand hoch: „Nein. Lösch es. Jetzt.“', log: 'Zweites Stopp: klar, ohne Lächeln', folge: 'Lio merkt: Das ist ernst. Er löscht es vor deinen Augen.', skill: true },
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
              { t: '„Na gut …“ Passwort sagen.', log: 'Das Passwort herausgegeben', folge: 'Eine Woche später schreibt dein Konto Leuten, die du nicht kennst. Nicht du.', skill: false },
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
