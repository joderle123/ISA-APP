// REAL TALK #02 „Gefühle“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Gefühle genau benennen und ihre
// Botschaft hören · Wer sitzt am Steuer? · Körpersignale früh merken · Wut ist oft ein Deckel (was liegt drunter?). Alle Personen erfunden.
export default {
  // ---------- Stunde 1 · Wozu der Mist? → Mehr als zwei Wörter ----------
  'WORT-6': {
    start: [
      ['h:Lio', 'Wette: Heute sagt jeder auf dem Hof nur „gut“ oder „scheiße“. Wetten, du findest kein einziges anderes Wort?'],
      ['e', 'Hinter „gut“ und „scheiße“ steckt fast immer ein genaueres Gefühl. Und jedes Gefühl will etwas melden.'],
    ],
    schritte: [
      {
        ziel: 'Zum Brunnen auf dem Schulhof. Lio wartet.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { lio: [-6.4, 22.9] },
        zeilen: [
          ['du', 'Wie geht’s dir?'],
          ['lio', 'Scheiße.'],
          { wahl: [
            { t: '„Okay.“ Und weiter.', log: 'Bei Lio „scheiße“ stehen gelassen', folge: 'Lio: „Siehste. Gewonnen.“', skill: false, dann: [['lio', 'Siehste. Gewonnen. (Pause) … Na gut, frag noch mal richtig.']] },
            { t: '„Wütend, traurig – oder enttäuscht?“', log: 'Lio genaue Wörter angeboten', folge: 'Lio denkt nach: „Enttäuscht. Eher enttäuscht.“', skill: true },
          ] },
          ['lio', 'Enttäuscht. Ich bin nicht in die Schulmannschaft gekommen. Dabei hab ich jeden Tag trainiert. Und sauer bin ich auch.'],
          { wahl: [
            { t: 'genervt', log: 'Wort-Leiter: Lios Ärger als „genervt“ eingeschätzt', folge: 'Lio: „Mehr als genervt.“', skill: null },
            { t: 'sauer', log: 'Wort-Leiter: Lios Ärger als „sauer“ eingeschätzt', folge: 'Lio: „Ja. So ungefähr.“', skill: null },
            { t: 'wütend', log: 'Wort-Leiter: Lios Ärger als „wütend“ eingeschätzt', folge: 'Lio: „Nee, so schlimm nicht.“', skill: null },
            { t: 'rasend', log: 'Wort-Leiter: Lios Ärger als „rasend“ eingeschätzt', folge: 'Lio lacht kurz: „Rasend? Ich steh doch ganz ruhig hier.“', skill: null },
          ], frage: 'Wort-Leiter: Wie sauer ist Lio?' },
          { wahl: [
            { t: '„Das war mir wichtig.“', log: 'Die Botschaft erkannt: Enttäuschung = es war wichtig', skill: true },
            { t: '„Jemand geht über meine Grenze.“', log: 'Enttäuschung mit der Botschaft der Wut verwechselt', folge: 'Lio: „Grenze? Nee. Keiner hat mir was getan. Es war mir halt wichtig.“', skill: false },
          ], frage: 'Was will Lios Enttäuschung melden?' },
          ['lio', 'Okay. Ein Wort. Mal sehen, ob du noch eins findest.'],
        ],
      },
      {
        ziel: 'Zur Kantine. Sara steht an der Ausgabe.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -7.4, null, 'redet'] },
        zeilen: [
          ['du', 'Na, wie geht’s?'],
          ['sara', 'Gut. (atmet laut aus) Echt gut.'],
          { wahl: [
            { t: '„Gut wie froh – oder gut wie erleichtert?“', log: 'Bei Sara nachgefragt: froh oder erleichtert?', folge: 'Sara: „Erleichtert! Die Mathearbeit ist vorbei.“', skill: true },
            { t: '„Schön.“', log: 'Saras „gut“ einfach angenommen', folge: 'Sara nickt. Du erfährst nichts.', skill: false, dann: [['e', 'Dann sagt sie von selbst:']] },
          ] },
          ['sara', 'Die Mathearbeit ist rum. Ich hab zwei Nächte schlecht geschlafen. Jetzt ist alles weg.'],
          { wahl: [
            { t: '„Die Arbeit lief gut.“', log: 'Erleichterung mit Erfolg verwechselt', folge: 'Sara: „Keine Ahnung, wie sie lief. Hauptsache vorbei.“', skill: false },
            { t: '„Der Druck ist weg.“', log: 'Die Botschaft erkannt: Erleichterung = der Druck ist weg', skill: true },
          ], frage: 'Was meldet Saras Erleichterung?' },
        ],
      },
      {
        ziel: 'Zum Korbfeld. Finn wirft allein.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { finn: [30.4, 21.2] },
        zeilen: [
          ['du', 'Und du? Wie geht’s?'],
          ['finn', 'Egal.'],
          { wahl: [
            { t: '„Egal wie müde? Oder egal wie nervös?“', log: 'Hinter Finns „egal“ nachgefragt', folge: 'Finn hält den Ball fest. „Nervös.“', skill: true },
            { t: '„Wenn’s dir egal ist, ist ja gut.“', log: 'Finns „egal“ geglaubt', folge: 'Finn wirft. Daneben. Dann noch mal. Daneben.', skill: false, dann: [['e', 'Finn wirft. Daneben. Noch mal. Daneben.'], ['finn', '… Ist nicht egal. Ich bin nervös.']] },
          ] },
          ['finn', 'Morgen hab ich ein Gespräch bei der Klassenlehrerin. Keine Ahnung, worum’s geht.'],
          { wahl: [
            { t: '„Geh da nicht hin.“', log: 'Nervosität als „wegbleiben“ gelesen', folge: 'Finn: „Schwänzen? Dann ist es übermorgen noch schlimmer.“', skill: false },
            { t: '„Da kommt was Wichtiges.“', log: 'Die Botschaft erkannt: Nervosität = da kommt was Wichtiges, vorbereiten', skill: true },
          ], frage: 'Was meldet Finns Nervosität?' },
          { wahl: [
            { t: '„Was willst du sie fragen?“', log: 'Mit Finn seine Fragen fürs Gespräch gesammelt', folge: 'Finn: „Ob ich was falsch gemacht hab.“ Er schreibt es ins Handy. Dann wirft er einen Korb.', skill: true, setze: { finnGeuebt: true } },
            { t: '„Du schaffst das schon.“', log: 'Finn Mut zugesprochen', folge: 'Finn: „Mhm.“ Er glaubt es nicht ganz.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Chloé sitzt da.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { chloe: [-18.2, 43.6] },
        zeilen: [
          ['du', 'Hey. Wie geht’s?'],
          ['chloe', 'Passt.'],
          ['e', 'Chloé schaut auf ihr Handy. Da steht: „Heute 13“ – ein Geburtstag. Keine einzige Nachricht.'],
          { wahl: [
            { t: '„Geburtstag? Und keiner schreibt?“', log: 'Hingesehen und vorsichtig angesprochen', folge: 'Chloé schluckt. „Gekränkt. So heißt das wohl.“', skill: true },
            { t: '„Passt? Dann ist ja gut.“', log: 'Chloés „passt“ geglaubt', folge: 'Chloé nickt. Sie steigt in den Bus. Allein.', skill: false, setze: { chloeAllein: true } },
          ] },
          { wenn: (f) => !f.chloeAllein, dann: [
            ['chloe', 'Gekränkt. Und ein bisschen einsam. Zwei Wörter, oder? Mehr als zwei.'],
            { wahl: [
              { t: '„Pass auf, Gefahr.“', log: 'Kränkung mit der Botschaft der Angst verwechselt', folge: 'Chloé: „Gefahr? Nee. Ich wollte nur, dass einer dran denkt.“', skill: false },
              { t: '„Ich bin wichtig.“', log: 'Die Botschaft erkannt: Kränkung = ich bin wichtig', skill: true },
            ], frage: 'Was meldet Chloés Kränkung?' },
            { wahl: [
              { t: '„Alles Gute! Komm mit zum Bäcker.“', log: 'Chloé gratuliert und eingeladen', folge: 'Chloé lacht zum ersten Mal heute.', skill: null, setze: { chloeGeburtstag: true } },
              { t: '„Alles Gute.“ Und los.', log: 'Chloé gratuliert', folge: 'Chloé: „Danke. Echt.“', skill: null },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Brunnen. Lio will das Ergebnis.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { lio: [-6.4, 22.9] },
        zeilen: [
          ['lio', 'Und? Wie viele Wörter?'],
          { wenn: (f) => f.chloeGeburtstag, dann: [{ moment: 'Hinter einem „passt“ steckte ein Geburtstag, an den keiner gedacht hatte. Chloé kam mit zur Bäckerei.' }] },
          { wenn: (f) => f.finnGeuebt, dann: [['h:Finn', 'War beim Gespräch. Es ging nur um den Ausflug. Ich hab trotzdem meine Frage gestellt. Alles gut.']] },
          ['lio', 'Okay, verloren. Aber jetzt du: Wie geht’s dir? Mehr als zwei Wörter.'],
          { wahl: [
            { t: 'Zwei genaue Wörter sagen.', log: 'Die eigene Lage mit genauen Wörtern beschrieben', dann: [{ notiz: 'Deine zwei Wörter für heute:', platz: 'zum Beispiel: müde und stolz' }] },
            { t: '„Gut.“ (grinsen)', log: 'Bei sich selbst bei „gut“ geblieben', folge: 'Lio: „Ha! Jetzt hab ich gewonnen.“', setze: { lioGewonnen: true } },
          ] },
        ],
      },
    ],
    ende: [{ wenn: (f) => f.lioGewonnen, dann: [['lio', 'Unentschieden. Die Spur „Gefühle“ kriegst du trotzdem. Für jedes Wort eine Farbe.']],
      sonst: [['lio', 'Ich nehm meine Wette zurück. Ab heute ziehst du eine Spur „Gefühle“ hinter dir her. Für jedes Wort eine Farbe.']] }],
    resuemee: { frage: 'Welches Gefühl versteckt sich bei euch am häufigsten hinter „gut“ oder „egal“?', satz: 'Ein Gefühl, das ich öfter beim Namen nennen will: …' },
  },

  // ---------- Stunde 2 · Wer sitzt am Steuer? → Wer fährt? ----------
  'STEUER-5': {
    start: [
      ['h:Jade', 'Komm zur Skate-Ecke. Schnell. Malik und Finn gleich. Ich film schon.'],
      ['e', 'In jedem Kopf sitzt gerade ein Gefühl am Steuer. Wer zuerst merkt, welches, kann bremsen.'],
    ],
    schritte: [
      {
        ziel: 'Zur Skate-Ecke. Da kippt gerade die Stimmung.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6, null, 'redet'], finn: [-35.4, 20.0, null, 'redet'], jade: [-31.6, 17.4, null, 'handy'] },
        zeilen: [
          ['e', 'Finn ist eben auf der Rampe gestürzt. Vor allen. Malik hat gelacht.'],
          ['finn', '(laut) Was lachst du so? Willst du Stress?'],
          ['malik', 'Ey, chill! Du hast mich geschubst!'],
          ['e', 'Jade filmt. Drei Leute schauen zu.'],
          { wahl: [
            { t: 'Wut', log: 'Bei Finn die Wut am Steuer gesehen', folge: 'Die Wut ist laut. Aber warum gerade jetzt?', skill: null },
            { t: 'Scham', log: 'Bei Finn die Scham am Steuer gesehen: vor allen gestürzt', folge: 'Genau: Er ist vor allen gestürzt. Die Wut ist nur laut.', skill: true },
            { t: 'Trauer', log: 'Bei Finn Trauer vermutet', folge: 'Eher nicht. Er ist nicht traurig – er ist bloßgestellt.', skill: false },
            { t: 'Angst', log: 'Bei Finn Angst vermutet', folge: 'Ein bisschen vielleicht: Angst, dass alle lachen.', skill: null },
          ], frage: 'Wer sitzt bei Finn am Steuer?' },
          { wahl: [
            { t: 'Jade: „Handy weg.“', log: 'Zuerst dem Streit das Publikum genommen', folge: 'Jade zögert – und steckt das Handy ein.', skill: true, setze: { gefilmt: false } },
            { t: 'Finn: „Beruhig dich mal!“', log: 'Finn gesagt: „Beruhig dich!“', folge: 'Finn wird lauter: „Ich bin ruhig!“', skill: false, setze: { gefilmt: true } },
            { t: 'Zuschauen, was passiert.', log: 'Zugeschaut', folge: 'Jade filmt weiter.', skill: false, setze: { gefilmt: true } },
          ], frage: 'Was machst du zuerst?' },
          ['e', 'Finn stapft weg Richtung Fahrradständer.'],
        ],
      },
      {
        ziel: 'Geh Finn nach – zu den Fahrradständern.', ort: 'Fahrradständer', p: [-37.4, 25.4], leute: { finn: [-38.8, 26.2] },
        zeilen: [
          ['finn', 'Was? Kommst du jetzt auch noch lachen?'],
          { wahl: [
            { t: '„Vor allen hinfallen? Mir wär’s peinlich.“', log: 'Die Scham ausgesprochen, ohne Finn bloßzustellen', folge: 'Finn: „… Ja. Voll peinlich.“ Seine Schultern gehen runter.', skill: true, setze: { finnRuhig: true } },
            { t: '„Du hast übertrieben. Entschuldig dich bei Malik.“', log: 'Sofort eine Entschuldigung verlangt', folge: 'Finn: „Ich? Er hat gelacht!“ Er wird wieder laut.', skill: false, setze: { finnRuhig: false } },
          ] },
          { wenn: (f) => f.finnRuhig, dann: [
            ['finn', 'Und Malik lacht auch noch. Da war ich sofort auf 100.'],
            { wahl: [
              { t: '„Was hättest du gebraucht, statt dass er lacht?“', log: 'Nach Finns Bedürfnis gefragt', folge: 'Finn: „Dass einer fragt, ob alles okay ist.“', skill: true },
              { t: '„Malik ist halt so.“', log: 'Malik entschuldigt', folge: 'Finn zuckt mit den Schultern.', skill: null },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Zum Brunnen. Malik ist dort.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { malik: [-6.4, 22.9] },
        zeilen: [
          ['malik', 'Der schubst mich und ich bin schuld? Ich bin so sauer.'],
          { wahl: [
            { t: 'Wut: „Das war unfair.“', log: 'Maliks Wut und ihre Botschaft erkannt: unfair behandelt', skill: true },
            { t: '„Du regst dich über alles auf.“', log: 'Malik ein Etikett gegeben', folge: 'Malik: „Toll. Ich bin also das Problem.“', skill: false },
          ], frage: 'Was sitzt bei Malik am Steuer?' },
          { wahl: [
            { t: '„Dein Lachen kam als Auslachen an.“', log: 'Malik erklärt, wie sein Lachen ankam', folge: 'Malik: „Ich hab doch nicht ihn ausgelacht. Nur den Sturz … oh.“', skill: true, setze: { malikVersteht: true } },
            { t: '„Du hast recht. Finn ist ein Idiot.“', log: 'Mit Malik über Finn hergezogen', folge: 'Malik fühlt sich bestätigt. Der Graben wird tiefer.', skill: false, setze: { malikVersteht: false } },
          ] },
        ],
      },
      {
        ziel: 'Zurück zur Skate-Ecke. Beide sind wieder da.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6, null, 'redet'], finn: [-35.4, 20.0], jade: [-31.6, 17.4] },
        zeilen: [
          { wenn: (f) => f.finnRuhig && f.malikVersteht, dann: [
            ['malik', 'Sorry wegen dem Lachen. Sah übel aus.'],
            ['finn', 'War’s auch. Sorry fürs Schubsen.'],
            { moment: 'Gleiche Szene, drei Fahrer: bei Finn Scham, bei Malik Wut, bei Jade Neugier. Als beide das wussten, kam die Entschuldigung.' },
          ], sonst: [
            ['finn', '(zu Malik) Lach noch mal und …'],
            ['malik', 'Und was?'],
            ['e', 'Herr Lenz kommt vom Hof herüber. Beide gehen in verschiedene Richtungen.'],
            { moment: 'Der Streit ist nicht gekracht, aber auch nicht vorbei.' },
          ] },
          { wenn: (f) => f.gefilmt, dann: [
            ['jade', 'Das Video ist schon in einer Gruppe. Soll ich’s löschen lassen?'],
            { wahl: [
              { t: '„Ja. Schreib: Bitte löschen.“', log: 'Jade geraten, das Video löschen zu lassen', folge: 'Jade schreibt es. Zwei löschen. Einer nicht.', skill: true },
              { t: '„Ist doch eh zu spät.“', log: 'Das Video laufen lassen', folge: 'Finn sieht es am Abend. Schon wieder Scham.', skill: false },
            ] },
          ] },
          ['jade', 'Und was war bei dir am Steuer, als du hergerannt bist?'],
          { wahl: [
            { t: 'Neugier', log: 'Eigenes Steuer-Gefühl: Neugier', privat: true },
            { t: 'Sorge', log: 'Eigenes Steuer-Gefühl: Sorge', privat: true },
            { t: 'Wut', log: 'Eigenes Steuer-Gefühl: Wut', privat: true },
            { t: 'Freude am Drama', log: 'Eigenes Steuer-Gefühl: Freude am Drama', privat: true },
          ], frage: 'Ehrlich – welches Gefühl saß bei dir am Steuer? (Nur für dich.)' },
        ],
      },
    ],
    ende: [['jade', '(gibt dir ein Griptape mit Lenkrad) Hab ich übrig. Passt zu dir. Du hast heute gelenkt.']],
    resuemee: { frage: 'Welches Gefühl sitzt bei euch oft heimlich am Steuer, wenn ihr laut werdet?', satz: 'Wenn ich merke, dass ein Gefühl am Steuer sitzt, dann …' },
  },

  // ---------- Stunde 3 · Körper-Alarm → Das erste Signal ----------
  'ALARM-3': {
    start: [
      ['h:Frau Brandt', 'Elfmeter-Turnier auf dem Stade, heute. Wer mitmacht, achtet auf eins: die ersten Signale. Deine und die der anderen.'],
      ['e', 'Der Körper meldet Ärger, lange bevor jemand schreit. Wer hinschaut, merkt es zuerst.'],
    ],
    schritte: [
      {
        ziel: 'Zum Stade. Das Turnier fängt an.', ort: 'Stade', p: [-77.6, -6.0], leute: { brandt: [-76.2, -4.6, null, 'redet'], lio: [-79.2, -4.8], mia: [-78.4, -8.2] },
        zeilen: [
          ['brandt', 'Du schießt als Zweites. Was merkst du gerade in deinem Körper?'],
          { wahl: [
            { t: 'Herz klopft', log: 'Eigenes Signal: Herzklopfen', privat: true },
            { t: 'Hände schwitzen', log: 'Eigenes Signal: schwitzige Hände', privat: true },
            { t: 'Bauch kribbelt', log: 'Eigenes Signal: Bauchkribbeln', privat: true },
            { t: 'Nichts', log: 'Eigenes Signal: nichts gemerkt', privat: true },
          ], frage: 'Was merkst du? (Nur für dich.)' },
          { wahl: [
            { t: 'Lang ausatmen. Füße fest.', log: 'Vor dem Schuss das eigene Signal genutzt: ausgeatmet', folge: 'Dein Schuss geht ins Eck.', skill: true },
            { t: 'Schnell schießen, damit es vorbei ist.', log: 'Schnell geschossen, um es loszuwerden', folge: 'Der Schuss geht drüber.', skill: false },
          ] },
          ['e', 'Lio schießt. Mia hält. Lio bleibt stehen. Sein Kiefer ist fest. Die Hände sind Fäuste. Er atmet schnell durch die Nase.'],
          { wahl: [
            { t: 'Lio: „Kurz rüber? Trink was.“', log: 'Lios erstes Signal bemerkt und früh reagiert', folge: 'Lio kommt mit. Sein Atem wird langsamer.', skill: true, setze: { lioFrueh: true } },
            { t: 'Abwarten. Er sagt ja noch nichts.', log: 'Lios Signale gesehen, aber gewartet', folge: 'Lio dreht sich zu Mia: „Das war Glück!“', skill: false, setze: { lioFrueh: false } },
            { t: 'Laut: „Lio, ist nur ein Spiel!“', log: 'Lio laut vor allen beruhigen wollen', folge: 'Alle schauen Lio an. Er wird rot – und lauter.', skill: false, setze: { lioFrueh: false } },
          ], frage: 'Was machst du?' },
        ],
      },
      {
        ziel: 'Zur Bank am Sportplatz. Kurze Pause.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { lio: [-62.8, -2.4], mia: [-63.2, -5.0] },
        zeilen: [
          { wenn: (f) => f.lioFrueh, dann: [
            ['lio', 'Ich war kurz davor, ihr den Ball an den Kopf zu schießen. Echt.'],
            ['lio', 'Woran hast du das gemerkt? Ich hab doch nichts gesagt.'],
            { wahl: [
              { t: '„Kiefer fest, Fäuste, schnelle Atmung. Dein Körper hat’s gesagt.“', log: 'Lio seine Körpersignale gezeigt', folge: 'Lio: „Krass. Mein Körper verrät mich.“', skill: true },
              { t: '„Intuition.“', log: 'Die Signale nicht benannt', folge: 'Lio: „Aha.“', skill: false },
            ] },
          ], sonst: [
            ['mia', 'Lio hat mich angeschrien. Vor allen. Nur wegen einem Elfmeter.'],
            ['lio', '(von weiter weg) Weil’s unfair war!'],
            { moment: 'Weil niemand früh reagiert hat, ist Lio vor allen laut geworden.' },
            { wahl: [
              { t: 'Lio: „Was hat dein Körper gemacht?“', log: 'Mit Lio nachträglich die Signale gesucht', folge: 'Lio: „Kiefer … fest. Und ich hab nur noch rot gesehen.“', skill: true },
              { t: 'Zu Mia: „Lio ist halt so.“', log: 'Lios Ausbruch entschuldigt', folge: 'Mia: „Dann will ich nicht mehr mit ihm spielen.“', skill: false },
            ] },
          ] },
          ['mia', 'Ich hatte vorhin übrigens auch was. Zitternde Hände. Ich hasse Elfmeter.'],
          { wahl: [
            { t: '„Was hilft dir dann?“', log: 'Mia nach ihrer Hilfe gefragt', folge: 'Mia: „Handschuhe festziehen. Das beruhigt.“', skill: true },
            { t: '„Sah aber nicht so aus.“', log: 'Mias Signal übergangen', folge: 'Mia: „Sieht man halt nicht immer.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Stade. Finale.', ort: 'Stade', p: [-77.6, -6.0], leute: { brandt: [-76.2, -4.6, null, 'redet'], lio: [-79.2, -4.8], mia: [-78.4, -8.2] },
        zeilen: [
          ['e', 'Finale: Lio gegen Mia. Lio schießt. Mia hält – aber war sie zu früh von der Linie? Frau Brandt pfeift: „Wiederholen.“ Lio und Mia schauen sich an. Beide sind kurz davor.'],
          { wahl: [
            { t: '„Stopp. Zehn Sekunden Pause.“', log: 'Im Finale eine Pause für alle angeregt', folge: 'Frau Brandt nickt: „Gute Idee. Zehn Sekunden.“', skill: true, setze: { finaleRuhig: true } },
            { t: 'Leise zu Lio: „Kiefer?“', log: 'Lio leise an sein Signal erinnert', folge: 'Lio lacht kurz. Sein Kiefer wird locker.', skill: true, setze: { finaleRuhig: true } },
            { t: 'Rufen: „Die war zu früh!“', log: 'Im Finale Partei ergriffen', folge: 'Jetzt diskutieren fünf Leute.', skill: false },
          ], frage: 'Was machst du?' },
          { wenn: (f) => f.finaleRuhig, dann: [{ wenn: (f) => f.lioFrueh, dann: [['e', 'Lio schießt noch mal. Mia hält. Lio klatscht ihr ab.'], { moment: 'Im Finale hat Lio verloren – und Mia abgeklatscht.' }],
            sonst: [['e', 'Lio schießt noch mal. Tor. Mia zieht die Handschuhe fest und nickt.'], { moment: 'Im Finale blieben beide ruhig – auch nach dem Streit vorher.' }] }],
            sonst: [['e', 'Lio und Mia schreien sich an. Frau Brandt beendet das Finale. Kein Sieger.'], { moment: 'Im Finale ist es gekippt – niemand hat früh genug gebremst.' }] },
          ['brandt', 'Wer hat heute das erste Signal gesehen?'],
          { notiz: 'Ein Signal deines Körpers, das du ab heute ernst nimmst:', platz: 'zum Beispiel: Kiefer fest, Hände zittern …' },
        ],
      },
    ],
    ende: [['brandt', 'Die Sportbrille mit der Puls-Anzeige ist für dich. Nicht zum Messen. Zum Erinnern: Erst spüren, dann handeln.']],
    resuemee: { frage: 'Woran merken andere bei euch, dass ihr gleich hochgeht – noch bevor ihr etwas sagt?', satz: 'Mein erstes Signal ist … Dann mache ich …' },
  },

  // ---------- Stunde 4 · Wut ist der Deckel → Der Deckel (neu 27.11.2026 nach Jugend-Kritik: Mischpult raus) ----------
  'MISCH-10': {
    start: [
      ['h:Sara', 'Kannst du in die Aula kommen? Amira ist komisch. Ich glaub, wegen mir.'],
      ['e', 'Wut ist oft laut – und liegt wie ein Deckel auf etwas anderem.'],
    ],
    schritte: [
      {
        ziel: 'Zur Aula. Sara und Amira sind an der Bühne.', ort: 'Aula', p: [-14.0, -57.0], leute: { sara: [-15.6, -56.6], amira: [-12.4, -57.8, null, 'redet'] },
        zeilen: [
          ['e', 'Sara hat es eben erzählt: Nach den Ferien wechselt sie in die Sportklasse.'],
          ['amira', '(laut, Tasche auf der Schulter) Dann geh doch! Ist mir egal.'],
          ['sara', '(leise) Okay …'],
          { wahl: [
            { t: 'Trauer', log: 'Tipp: Unter Amiras Wut liegt Trauer', skill: null, setze: { deckelTipp: 'trauer' } },
            { t: 'Eifersucht', log: 'Tipp: Unter Amiras Wut liegt Eifersucht', skill: null, setze: { deckelTipp: 'eifersucht' } },
            { t: 'Angst', log: 'Tipp: Unter Amiras Wut liegt Angst', skill: null, setze: { deckelTipp: 'angst' } },
            { t: 'Nur Wut', log: 'Tipp: Bei Amira ist nur Wut', folge: 'Kann sein. Aber warum dann so laut – und so schnell?', skill: null, setze: { deckelTipp: 'wut' } },
          ], frage: 'Dein Tipp, verdeckt: Was liegt unter „Dann geh doch!“?' },
          ['e', 'Amira geht raus. Sara bleibt auf der Bühnenkante sitzen.'],
        ],
      },
      {
        ziel: 'Sara will kurz raus. Zum Lesesaal.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { sara: [15.6, -59.6] },
        zeilen: [
          ['sara', 'Ich freu mich auf die Sportklasse. Echt. Aber ich bin auch traurig. Ist das falsch?'],
          { skala: 'Wie groß ist Saras Freude, was schätzt du?', links: 'klein', rechts: 'riesig' },
          { skala: 'Und wie groß ist ihre Trauer?', links: 'klein', rechts: 'riesig' },
          ['sara', 'Beides gleichzeitig. Wie eine Torte mit zwei großen Stücken.'],
          { wahl: [
            { t: '„Sag Amira beides.“', log: 'Sara geraten, Amira Freude und Trauer zu sagen', folge: 'Sara: „Beides? … Okay. Aber nicht allein.“', skill: true, setze: { treffen: true } },
            { t: '„Freu dich einfach.“', log: 'Sara geraten, nur die Freude zu zeigen', folge: 'Sara: „Mach ich ja. Und Amira?“', skill: false, setze: { treffen: false } },
            { t: '„Ich sag’s ihr für dich.“', log: 'Angeboten, für Sara mit Amira zu reden', folge: 'Sara: „Lieb von dir. Aber das muss ich selbst.“', skill: null, setze: { treffen: false } },
          ], frage: 'Was rätst du Sara?' },
        ],
      },
      {
        ziel: 'Amira sitzt allein im Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { amira: [-22.6, -39.4] },
        zeilen: [
          ['amira', 'Soll sie doch gehen. Ich brauch keinen.'],
          { wahl: [
            { t: '„Klingt, als würdest du sie vermissen.“', log: 'Unter Amiras Wut nachgefragt', folge: 'Amira schaut weg. Dann nickt sie.', skill: true, setze: { amiraOffen: true } },
            { t: 'Daneben sitzen. Nichts sagen.', log: 'Bei Amira geblieben, ohne zu reden', folge: 'Nach einer Minute sagt Amira leise: „Ich bin nicht sauer. Ich bin …“', skill: true, setze: { amiraOffen: true } },
            { t: '„Du übertreibst.“', log: 'Amiras Wut abgetan', folge: 'Amira: „Ach ja? Dann lass mich halt.“', skill: false },
            { t: '„Sie ist halt weg.“', log: 'Amira gesagt: Sie ist halt weg', folge: 'Amira: „Danke. Echt hilfreich.“', skill: false },
          ] },
          { wenn: (f) => f.amiraOffen, dann: [
            ['amira', 'Ich bin traurig. Und ich hab Angst, dass sie da neue Freundinnen findet. Und ich bin dann … egal.'],
            { moment: 'Unter Amiras „Dann geh doch!“ lagen Trauer und Angst.' },
            { wenn: (f) => f.deckelTipp === 'trauer' || f.deckelTipp === 'angst', dann: [['e', 'Dein Tipp aus der Aula lag richtig: Unter dem Deckel war mehr als Wut.']],
              sonst: [['e', 'In der Aula hast du etwas anderes getippt. Unter dem Deckel lagen Trauer und Angst.']] },
          ], sonst: [
            ['amira', '(steht auf) Lass mich einfach.'],
            { moment: 'Amira ist allein geblieben – mit dem Deckel drauf.' },
          ] },
        ],
      },
      {
        ziel: 'Zurück zur Aula.', ort: 'Aula', p: [-14.0, -57.0], leute: { sara: [-15.6, -56.6], amira: [-12.4, -57.8] },
        zeilen: [
          { wenn: (f) => f.treffen && f.amiraOffen, dann: [
            ['sara', 'Ich freu mich auf die Sportklasse. Und ich bin traurig wegen dir.'],
            ['amira', 'Außen hab ich „Dann geh doch“ gesagt. Innen hieß das: Ich vermiss dich jetzt schon.'],
            ['sara', '(lacht und heult gleichzeitig) Mittwochs ist Training. Danach Bäcker? Jede Woche.'],
            { moment: 'Zwei Sätze statt einem Knall: außen und innen.' },
          ], sonst: [{ wenn: (f) => f.treffen, dann: [
            ['e', 'Sara wartet an der Bühne. Amira kommt nicht. Nach zehn Minuten geht Sara.'],
            { moment: 'Sara war bereit zu reden. Amira saß noch unter ihrem Deckel.' },
          ], sonst: [
            ['e', 'Amira geht an Sara vorbei. Keine sagt etwas. Beide schauen aufs Handy.'],
            { moment: 'Zwischen Amira und Sara blieb der Deckel drauf.' },
          ] }] },
          ['e', 'Und du? Auch du hast einen Satz, der laut rausrutscht.'],
          { notiz: 'Mein Übersetzer – nur für dich:', platz: 'Außen sag ich: … Innen heißt das oft: …', privat: true },
        ],
      },
    ],
    ende: [['amira', '(setzt dir eine Mütze auf) Ein Deckel für dich. Damit du dran denkst, was drunter sein kann.']],
    resuemee: { frage: 'Welcher laute Satz rutscht euch am schnellsten raus – und was sitzt oft darunter?', satz: 'Wenn ich „…“ sage, heißt das oft: …' },
  },
};
