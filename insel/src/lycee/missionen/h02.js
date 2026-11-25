// REAL TALK #02 „Gefühle“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Gefühle genau benennen und ihre
// Botschaft hören · Wer sitzt am Steuer? · Körpersignale früh merken · Gefühle mischen (mehrere gleichzeitig). Alle Personen erfunden.
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
            { t: '„Scheiße wie wütend, wie traurig – oder wie enttäuscht?“', log: 'Lio genaue Wörter angeboten', folge: 'Lio denkt nach: „Enttäuscht. Eher enttäuscht.“', skill: true },
          ] },
          ['lio', 'Enttäuscht. Ich bin nicht in die Schulmannschaft gekommen. Dabei hab ich jeden Tag trainiert.'],
          { wahl: [
            { t: 'Enttäuschung meldet: „Das war mir wichtig.“', log: 'Die Botschaft erkannt: Enttäuschung = es war wichtig', skill: true },
            { t: 'Enttäuschung meldet: „Hör auf damit.“', log: 'Enttäuschung als „aufhören“ gelesen', folge: 'Lio: „Aufhören? Nee. Es war mir halt wichtig.“', skill: false },
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
            { t: 'Erleichterung meldet: „Der Druck ist weg.“', log: 'Die Botschaft erkannt: Erleichterung = der Druck ist weg', skill: true },
            { t: 'Erleichterung meldet: „Die Arbeit lief gut.“', log: 'Erleichterung mit Erfolg verwechselt', folge: 'Sara: „Keine Ahnung, wie sie lief. Hauptsache vorbei.“', skill: false },
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
          ['finn', 'Morgen hab ich ein Vorstellungsgespräch. Praktikum in der Werkstatt. Ich weiß nicht, was ich sagen soll.'],
          { wahl: [
            { t: 'Nervosität meldet: „Da kommt was Wichtiges. Bereite dich vor.“', log: 'Die Botschaft erkannt: Nervosität = vorbereiten', skill: true },
            { t: 'Nervosität meldet: „Sag lieber ab.“', log: 'Nervosität als „absagen“ gelesen', folge: 'Finn: „Absagen? Dann bin ich morgen erleichtert und übermorgen sauer auf mich.“', skill: false },
          ], frage: 'Was meldet Finns Nervosität?' },
          { wahl: [
            { t: '„Lass uns drei Sätze üben. Jetzt.“', log: 'Mit Finn drei Sätze fürs Gespräch geübt', folge: 'Finn übt dreimal. Beim dritten Mal wirft er einen Korb.', skill: true, setze: { finnGeuebt: true } },
            { t: '„Du schaffst das schon.“', log: 'Finn Mut zugesprochen', folge: 'Finn: „Mhm.“ Er glaubt es nicht ganz.', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Chloé sitzt da.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { chloe: [-18.2, 43.6] },
        zeilen: [
          ['du', 'Hey. Wie geht’s?'],
          ['chloe', 'Passt.'],
          ['e', 'Chloé schaut auf ihr Handy. Da steht: „Heute 15“ – ein Geburtstag. Keine einzige Nachricht.'],
          { wahl: [
            { t: '„Du hast Geburtstag, oder? Und keiner hat geschrieben?“', log: 'Hingesehen und vorsichtig angesprochen', folge: 'Chloé schluckt. „Gekränkt. So heißt das wohl.“', skill: true },
            { t: '„Passt? Dann ist ja gut.“', log: 'Chloés „passt“ geglaubt', folge: 'Chloé nickt. Sie steigt in den Bus. Allein.', skill: false, setze: { chloeAllein: true } },
          ] },
          { wenn: (f) => !f.chloeAllein, dann: [
            ['chloe', 'Gekränkt. Und ein bisschen einsam. Zwei Wörter, oder? Mehr als zwei.'],
            { wahl: [
              { t: 'Kränkung meldet: „Ich bin wichtig. Behandle mich so.“', log: 'Die Botschaft erkannt: Kränkung = ich bin wichtig', skill: true },
              { t: 'Kränkung meldet: „Sei nicht so empfindlich.“', log: 'Kränkung als „empfindlich“ abgetan', folge: 'Chloé: „Toll. Danke.“', skill: false },
            ], frage: 'Was meldet Chloés Kränkung?' },
            { wahl: [
              { t: '„Alles Gute! Komm mit, wir holen uns was an der Bäckerei.“', log: 'Chloé gratuliert und eingeladen', folge: 'Chloé lacht zum ersten Mal heute.', skill: null, setze: { chloeGeburtstag: true } },
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
          { wenn: (f) => f.finnGeuebt, dann: [['h:Finn', 'Hab die drei Sätze noch mal vorm Spiegel geübt. Morgen 9 Uhr. Daumen drücken.']] },
          ['lio', 'Okay, verloren. Aber jetzt du: Wie geht’s dir? Mehr als zwei Wörter.'],
          { wahl: [
            { t: 'Zwei genaue Wörter sagen.', log: 'Die eigene Lage mit genauen Wörtern beschrieben', dann: [{ notiz: 'Deine zwei Wörter für heute:', platz: 'zum Beispiel: müde und stolz' }] },
            { t: '„Gut.“ (grinsen)', log: 'Bei sich selbst bei „gut“ geblieben', folge: 'Lio: „Ha! Jetzt hab ich gewonnen.“', setze: { lioGewonnen: true } },
          ] },
        ],
      },
    ],
    ende: [{ wenn: (f) => f.lioGewonnen, dann: [['lio', 'Unentschieden. Hier, trotzdem die Sticker. Für jedes Wort einen.']],
      sonst: [['lio', 'Ich nehm meine Wette zurück. Hier, die Sticker. Für jedes Wort einen.']] }],
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
            { t: 'Nur Wut – der ist halt sauer.', log: 'Bei Finn nur die Wut gesehen', folge: 'Die Wut ist echt. Aber darunter sitzt noch etwas.', skill: false },
            { t: 'Wut – und darunter Scham, weil er vor allen gestürzt ist.', log: 'Bei Finn die Wut und die Scham darunter erkannt', folge: 'Genau: Er ist vor allen gestürzt.', skill: true },
          ], frage: 'Wer sitzt bei Finn am Steuer?' },
          { wahl: [
            { t: 'Zuerst Jade: „Mach das Handy weg. Das macht es schlimmer.“', log: 'Zuerst dem Streit das Publikum genommen', folge: 'Jade zögert – und steckt das Handy ein.', skill: true, setze: { gefilmt: false } },
            { t: 'Zuerst Finn: „Beruhig dich mal!“', log: 'Finn gesagt: „Beruhig dich!“', folge: 'Finn wird lauter: „Ich bin ruhig!“', skill: false, setze: { gefilmt: true } },
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
            { t: '„Nö. Vor allen hinfallen ist mies. Mir wär das peinlich.“', log: 'Die Scham ausgesprochen, ohne Finn bloßzustellen', folge: 'Finn: „… Ja. Voll peinlich.“ Seine Schultern gehen runter.', skill: true, setze: { finnRuhig: true } },
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
            { t: 'Bei Malik sitzt Wut am Steuer. Sie meldet: „Das war unfair.“', log: 'Maliks Wut und ihre Botschaft erkannt: unfair behandelt', skill: true },
            { t: '„Malik regt sich halt über alles auf.“', log: 'Malik ein Etikett gegeben', folge: 'Malik: „Toll. Ich bin also das Problem.“', skill: false },
          ], frage: 'Was sitzt bei Malik am Steuer?' },
          { wahl: [
            { t: '„Er war vor allen hingefallen. Dein Lachen kam als Auslachen an.“', log: 'Malik erklärt, wie sein Lachen ankam', folge: 'Malik: „Ich hab doch nicht ihn ausgelacht. Nur den Sturz … oh.“', skill: true, setze: { malikVersteht: true } },
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
            { moment: 'Finn und Malik haben sich entschuldigt – weil beide wussten, welches Gefühl am Steuer saß.' },
          ], sonst: [
            ['finn', '(zu Malik) Lach noch mal und …'],
            ['malik', 'Und was?'],
            ['e', 'Herr Lenz kommt vom Hof herüber. Beide gehen in verschiedene Richtungen.'],
            { moment: 'Der Streit ist nicht gekracht, aber auch nicht vorbei.' },
          ] },
          { wenn: (f) => f.gefilmt, dann: [
            ['jade', 'Das Video ist schon in einer Gruppe. Soll ich’s löschen lassen?'],
            { wahl: [
              { t: '„Ja. Und schreib dazu: Bitte löschen, war nicht okay.“', log: 'Jade geraten, das Video löschen zu lassen', folge: 'Jade schreibt es. Zwei löschen. Einer nicht.', skill: true },
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
            { t: 'Einmal lang ausatmen, Füße fest auf den Boden.', log: 'Vor dem Schuss das eigene Signal genutzt: ausgeatmet', folge: 'Dein Schuss geht ins Eck.', skill: true },
            { t: 'Schnell schießen, damit es vorbei ist.', log: 'Schnell geschossen, um es loszuwerden', folge: 'Der Schuss geht drüber.', skill: false },
          ] },
          ['e', 'Lio schießt. Mia hält. Lio bleibt stehen.'],
          ['e', 'Sein Kiefer ist fest. Die Hände sind Fäuste. Er atmet schnell durch die Nase.'],
          { wahl: [
            { t: 'Jetzt zu Lio: „Kurz rüberkommen? Trink was.“', log: 'Lios erstes Signal bemerkt und früh reagiert', folge: 'Lio kommt mit. Sein Atem wird langsamer.', skill: true, setze: { lioFrueh: true } },
            { t: 'Abwarten. Er sagt ja noch nichts.', log: 'Lios Signale gesehen, aber gewartet', folge: 'Lio dreht sich zu Mia: „Das war Glück!“', skill: false, setze: { lioFrueh: false } },
            { t: '„Lio, chill, ist nur ein Spiel!“ – laut über den Platz.', log: 'Lio laut vor allen beruhigen wollen', folge: 'Alle schauen Lio an. Er wird rot – und lauter.', skill: false, setze: { lioFrueh: false } },
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
              { t: 'Zu Lio: „Was hat dein Körper gemacht, kurz bevor du geschrien hast?“', log: 'Mit Lio nachträglich die Signale gesucht', folge: 'Lio: „Kiefer … fest. Und ich hab nur noch rot gesehen.“', skill: true },
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
          ['e', 'Finale: Lio gegen Mia. Lio schießt. Mia hält – aber war sie zu früh von der Linie? Frau Brandt pfeift: „Wiederholen.“'],
          ['e', 'Lio und Mia schauen sich an. Beide sind kurz davor.'],
          { wahl: [
            { t: 'Laut: „Stopp. Zehn Sekunden Pause für alle.“', log: 'Im Finale eine Pause für alle angeregt', folge: 'Frau Brandt nickt: „Gute Idee. Zehn Sekunden.“', skill: true, setze: { finaleRuhig: true } },
            { t: 'Zu Lio: „Kiefer?“ – nur ein Wort, leise.', log: 'Lio leise an sein Signal erinnert', folge: 'Lio lacht kurz. Sein Kiefer wird locker.', skill: true, setze: { finaleRuhig: true } },
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
    ende: [['brandt', 'Die Pulsuhr ist für dich. Nicht zum Messen. Zum Erinnern: Erst spüren, dann handeln.']],
    resuemee: { frage: 'Woran merken andere bei euch, dass ihr gleich hochgeht – noch bevor ihr etwas sagt?', satz: 'Mein erstes Signal ist … Dann mache ich …' },
  },

  // ---------- Stunde 4 · Alles gleichzeitig → Das Mischpult ----------
  'MISCH-10': {
    start: [
      ['h:Amira', 'Probe in der Aula. Ich soll beim Sommerfest singen. Kommst du? Ich glaub, ich dreh durch.'],
      ['e', 'Manchmal sind vier Gefühle gleichzeitig da. Keins ist falsch. Es geht nur darum, wer gerade wie laut ist.'],
    ],
    schritte: [
      {
        ziel: 'Zur Aula. Amira wartet an der Bühne.', ort: 'Aula', p: [-14.0, -57.0], leute: { amira: [-12.4, -57.8] },
        zeilen: [
          ['amira', 'Ich freu mich. Und ich hab Angst. Und ich bin traurig. Alles gleichzeitig. Das ist doch krank.'],
          { wahl: [
            { t: '„Das ist nicht krank. Das ist ein Mischpult. Lass uns schauen, was wie laut ist.“', log: 'Amira das Mischpult angeboten: mehrere Gefühle dürfen gleichzeitig da sein', folge: 'Amira: „Okay. Mischpult. Klingt besser als krank.“', skill: true },
            { t: '„Entscheid dich halt für eins.“', log: 'Amira geraten, sich für ein Gefühl zu entscheiden', folge: 'Amira: „Geht aber nicht.“ Sie wird hektischer.', skill: false },
          ] },
          ['amira', 'Okay. Angst. Wie laut?'],
          { skala: 'Wie laut ist Amiras Angst, was schätzt du?', links: 'leise', rechts: 'voll aufgedreht' },
          ['amira', 'Acht von zehn. Mindestens. Und die Trauer?'],
          { wahl: [
            { t: '„Warum bist du traurig?“', log: 'Nach der Trauer gefragt', folge: 'Amira: „Sara wechselt nach den Ferien in die Sportklasse. Das Fest ist das letzte Mal, dass wir in einer Klasse sind.“', skill: true, dann: [['amira', 'Sara wechselt nach den Ferien in die Sportklasse. Andere Klasse, anderer Stundenplan. Das Fest ist das letzte Mal zusammen.']] },
            { t: '„Trauer passt nicht zu einem Fest. Weg damit.“', log: 'Die Trauer weggeschoben', folge: 'Amira schweigt. Die Trauer bleibt trotzdem.', skill: false, dann: [['amira', '(leise) Geht nicht weg. Sara wechselt nach den Ferien die Klasse.']] },
          ] },
          { moment: 'Hinter Amiras Chaos steckte auch ein Abschied: Sara wechselt die Klasse.' },
        ],
      },
      {
        ziel: 'Zum Lesesaal. Sara lernt dort.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { sara: [15.6, -59.6] },
        zeilen: [
          ['sara', '(packt Bücher ein) Amira hat’s dir erzählt, oder? Dass ich in die Sportklasse wechsle.'],
          ['sara', 'Ich freu mich riesig. Ich hab den Platz bekommen. Und gleichzeitig …'],
          { wahl: [
            { t: '„Und gleichzeitig bist du traurig, oder? Geht ja beides.“', log: 'Saras gemischte Gefühle ausgesprochen', folge: 'Sara nickt. „Ich trau mich nicht, mich vor Amira zu freuen.“', skill: true },
            { t: '„Freu dich doch einfach!“', log: 'Sara geraten, sich nur zu freuen', folge: 'Sara: „Sag das mal meinem Bauch.“', skill: false },
          ] },
          ['sara', 'Amira denkt bestimmt, ich freu mich, dass ich weg bin. Wir reden kaum noch.'],
          { wahl: [
            { t: '„Sagt es euch. Beide Gefühle. Ich komm mit, wenn ihr wollt.“', log: 'Angeboten, ein Gespräch zwischen Sara und Amira zu begleiten', folge: 'Sara: „Innenhof, in zehn Minuten?“', skill: true, setze: { treffen: true } },
            { t: '„Ich sag Amira, dass du traurig bist.“', log: 'Angeboten, Saras Gefühle für sie weiterzusagen', folge: 'Sara: „Ähm … okay.“ Es fühlt sich falsch an.', skill: false, setze: { treffen: false } },
          ] },
        ],
      },
      {
        ziel: 'Zum Innenhof. Amira und Sara treffen sich.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { amira: [-22.6, -39.0], sara: [-25.4, -38.8] },
        zeilen: [
          { wenn: (f) => f.treffen, dann: [
            ['amira', 'Du freust dich, oder? Auf die Sportklasse.'],
            ['sara', 'Ja. Und ich bin traurig. Beides. Ich hab mich nicht getraut, es dir zu sagen.'],
            ['amira', '(lange still) Ich auch. Ich freu mich für dich. Und ich hasse es.'],
            { moment: 'Sara und Amira haben sich beide Gefühle gesagt – Freude und Trauer gleichzeitig.' },
          ], sonst: [
            ['amira', 'Du hast gesagt, Sara ist traurig. Sie selbst sagt nichts.'],
            ['sara', '(zu dir) Danke … glaub ich.'],
            ['e', 'Es bleibt still. Keine sagt, was sie fühlt.'],
            { moment: 'Weil du für Sara gesprochen hast, haben die beiden nichts selbst gesagt.' },
          ] },
          { wahl: [
            { t: 'Still bleiben und die beiden reden lassen.', log: 'Den beiden Raum gelassen', folge: 'Nach einer Weile lachen beide. Über irgendwas von früher.', skill: true },
            { t: 'Die Stille mit einem Witz füllen.', log: 'Die Stille mit einem Witz gefüllt', folge: 'Alle lachen kurz. Das Gespräch ist vorbei.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zurück zur Aula. Generalprobe.', ort: 'Aula', p: [-14.0, -57.0], leute: { amira: [-12.4, -57.8], sara: [-15.6, -58.6] },
        zeilen: [
          ['amira', 'Mischpult, letzter Check. Angst?'],
          { wahl: [
            { t: '„Runter auf drei. Ganz weg muss sie nicht.“', log: 'Angst dazu genommen statt weggeschickt', folge: 'Amira grinst.', skill: true },
            { t: '„Ganz runterdrehen!“', log: 'Angst ganz wegdrehen wollen', folge: 'Amira: „Geht nicht. Aber leiser geht.“', skill: false },
          ] },
          { wenn: (f) => f.treffen, dann: [['amira', 'Und die Trauer singt mit. Der Song ist für Sara.'], ['e', 'Amira singt. Die Stimme wackelt am Anfang. Dann nicht mehr. Sara steht in der ersten Reihe.']],
            sonst: [['e', 'Amira singt. Die Stimme wackelt. Sara steht hinten an der Tür.']] },
          { notiz: 'Wann hattest du zuletzt zwei Gefühle gleichzeitig?', platz: 'zum Beispiel: froh und traurig, als …' },
        ],
      },
    ],
    ende: [['amira', 'Die DJ-Mütze ist für dich. Du hast heute das Mischpult bedient.']],
    resuemee: { frage: 'Wann hattet ihr zuletzt zwei Gefühle gleichzeitig – und welches war lauter?', satz: 'Zwei Gefühle, die bei mir oft zusammen kommen: …' },
  },
};
