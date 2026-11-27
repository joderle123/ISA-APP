// REAL TALK #06 „Ärger“ – drei Missionen (Format: kursmission.js). Skills der Stunden: fünf Arten zu streiten (Hai,
// Schildkröte, Chamäleon, Fuchs, Eule) und der Streit in Zeitlupe (je früher gestoppt, desto billiger) · Gruppendruck:
// einer reicht, Nein-Karten (kurz, mit Vorschlag, mit Ausrede, gehen) · Spaß, Streit, Mobbing; Zuschauer
// machen die Bühne größer oder kleiner. Alle Personen erfunden. Hilfe: 116 111.
export default {
  // ---------- Stunde 1 · Hai oder Eule ----------
  'EULE-1': {
    start: [
      ['h:Frau Brandt', 'Training fällt aus, aber der Platz ist frei. Kickt ihr? Ich schau später vorbei.'],
      ['e', 'In jedem Streit stecken fünf Tiere: Hai, Schildkröte, Chamäleon, Fuchs, Eule. Heute merkst du, welches in dir zuerst aufwacht.'],
      { setze: { wut: 10 } },
    ],
    schritte: [
      {
        ziel: 'Zum Sportplatz. Das Spiel läuft schon.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { finn: [-62.8, -2.6, null, 'redet'], lio: [-66.0, -2.2], malik: [-63.6, -5.4] },
        zeilen: [
          ['e', 'Du ziehst allein Richtung Tor. Finn grätscht von hinten. Du liegst. Das Knie brennt.'],
          ['finn', 'War Ball! Spiel weiter!'],
          ['malik', 'Ey, das war voll Foul!'],
          { plus: { wut: 55 } },
          { thermo: 'wut', text: 'Deine Wut' },
          { wahl: [
            { t: 'Aufspringen, schubsen.', log: 'Hai: aufgesprungen und geschubst', folge: 'Finn schubst zurück. Lio geht dazwischen. Das Spiel ist vorbei.', skill: false, plus: { wut: 20 }, setze: { hai: true } },
            { t: '„Mir egal.“ Und gehen.', log: 'Schildkröte: „Mir egal“ und gegangen', folge: 'Du sitzt am Rand. Innen kocht es weiter.', skill: null },
            { t: '„Okay … war wohl Ball.“', log: 'Chamäleon: zugestimmt, obwohl es nicht stimmte', folge: 'Es war keiner. Finn grinst. Das Knie blutet trotzdem.', skill: false },
            { t: '„Stopp. Ich brauch kurz.“', log: 'Stopp gesagt und Abstand genommen', folge: 'Alle halten an. Du gehst zum Rand.', skill: true, plus: { wut: -10 } },
          ], frage: 'Welches Tier springt zuerst raus?' },
        ],
      },
      {
        ziel: 'Zum Rand des Stade. Runterkommen.', ort: 'Stade', p: [-77.6, -6.0], leute: { lio: [-76.0, -5.0] },
        zeilen: [
          { wenn: (f) => f.hai, dann: [['lio', 'Komm mal mit. Weg von Finn. Bevor das hier richtig knallt.']] },
          ['e', 'Erst runter. Über 70 denkt der Kopf nicht mit.'],
          { atem: true },
          { plus: { wut: -25 } },
          { thermo: 'wut', text: 'Deine Wut' },
          ['lio', 'Ich hab’s gesehen. War Foul. Ich hab nur nichts gesagt, weil ich keinen Stress wollte.'],
          { wahl: [
            { t: '„Nächstes Mal sag’s bitte.“', log: 'Lio gesagt, dass ein Wort von ihm geholfen hätte', folge: 'Lio nickt: „Fair.“', skill: true },
            { t: '„Passt schon. Ist egal.“', log: 'So getan, als wäre es egal', folge: 'Lio nickt erleichtert. Der Ärger bleibt bei dir.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Sportplatz. Frau Brandt ist da – und Finn.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { finn: [-62.8, -2.6], brandt: [-65.8, -2.0, null, 'redet'], lio: [-66.4, -4.8] },
        zeilen: [
          ['brandt', 'Ich hab gehört, es hat geknallt. Ich löse das nicht für euch. Wir spulen zurück – in Zeitlupe.'],
          ['finn', 'Ich wollte den Ball. Ich war zu spät. Und … du hast mich vorhin zweimal am Trikot festgehalten. Da hat keiner was gesagt.'],
          { moment: 'Wendung: Finn hatte auch etwas abbekommen. Gebaut hatten den Streit beide.' },
          ['brandt', 'Wo hättet ihr stoppen können?'],
          { wahl: [
            { t: 'Beim ersten Trikot-Ziehen.', log: 'Die früheste Stopp-Stelle gefunden: das erste Trikot-Ziehen', folge: 'Frau Brandt: „Genau. Je früher, desto billiger.“', skill: true, plus: { wut: -10 } },
            { t: 'Bei der Grätsche.', log: 'Eine späte Stopp-Stelle genannt: die Grätsche', folge: 'Auch eine Stelle. Aber da war es schon teuer.', skill: null },
            { t: 'Gar nicht. Er fing an.', log: 'Keine eigene Stopp-Stelle gesehen', folge: 'Finn: „Ich? Du hast zuerst gezogen.“', skill: false, plus: { wut: 10 } },
          ], frage: 'Zeitlupe: Wo war der billigste Stopp?' },
          ['brandt', 'Und was hätte die Eule dort gesagt?'],
          { wahl: [
            { t: '„Was ist dir daran wichtig?“', log: 'Eulen-Satz gefunden: „Was ist dir daran wichtig?“', folge: 'Finn: „Dass ich auch mal an den Ball komm.“', skill: true },
            { t: '„Regel für beide?“', log: 'Eulen-Satz gefunden: „Regel für beide?“', folge: 'Finn: „Ja. Gilt dann aber auch fürs Ziehen.“', skill: true },
            { t: '„Hör auf, du Hai!“', log: 'Statt Eulen-Satz ein Etikett', folge: 'Finn wird lauter: „Selber!“', skill: false, plus: { wut: 10 } },
          ] },
          ['brandt', 'Dann jetzt: eine Regel, die für beide gilt.'],
          { wahl: [
            { t: 'Ziehen und Grätschen = Freistoß.', log: 'Eine Regel für beide vorgeschlagen (Eule)', folge: 'Lio: „Passt.“ Finn: „Passt.“', skill: true },
            { t: 'Finn setzt eine Runde aus.', log: 'Eine Strafe nur für Finn vorgeschlagen', folge: 'Finn: „Und du dann auch, fürs Festhalten.“ Eine Strafe allein löst den Streit nicht.', skill: null },
            { t: 'Heute Elfer ich, dann er.', log: 'Einen Tausch vorgeschlagen (Fuchs)', folge: 'Geht. Aber das Grätschen bleibt ungeklärt.', skill: null },
          ] },
          { thermo: 'wut', text: 'Deine Wut jetzt' },
        ],
      },
      {
        ziel: 'Abends: Finn schreibt.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['h:Finn', 'Sorry wegen dem Knie. Ehrlich. Morgen wieder kicken?'],
          { wahl: [
            { t: '„Ja. Und sorry fürs Festhalten.“', log: 'Die Entschuldigung angenommen und selbst eine gegeben', folge: 'Finn schickt einen Daumen.', skill: true },
            { t: '„Mal sehen.“', log: 'Die Entschuldigung offen gelassen', folge: 'Finn: „Okay.“', skill: null },
          ] },
          { skala: 'Welches Tier war heute am lautesten in dir?', links: 'Hai', rechts: 'Eule' },
          { notiz: 'Der erste Satz, den deine Eule beim nächsten Streit sagt:', platz: '„Was ist dir daran wichtig?“ oder …' },
        ],
      },
    ],
    ende: [['brandt', 'Der braune Hoodie mit der Eule? Hat der Verein übrig. Wer früh stoppt, darf ihn tragen.']],
    resuemee: { frage: 'Wo kippt ein Streit bei euch – und warum ist früh billiger?', satz: 'Wenn ich das nächste Mal wütend bin, ist mein erster Schritt: …' },
  },

  // ---------- Stunde 2 · Alle machen mit → Einer fängt an ----------
  'ANFANG-2': {
    start: [
      ['h:Klassen-Chat', 'Malik: KOMMT ZU DEN SPINDEN 😂😂 das müsst ihr sehen'],
      ['e', 'In Gruppen macht fast jeder mal mit, obwohl er nicht will. Was hilft? Eine einzige zweite Person, die etwas anderes tut.'],
    ],
    schritte: [
      {
        ziel: 'In den Gang mit den Spinden.', ort: 'Gang', p: [-3.0, -16.0], leute: { malik: [-1.6, -16.2, null, 'handy'], sara: [-2.6, -15.0, null, 'redet'], finn: [-4.4, -15.2, null, 'redet'], chloe: [-5.2, -16.4] },
        zeilen: [
          ['e', 'Auf Maliks Handy: Noor aus der 6ème, allein am Schlagzeug, durchs Türfenster gefilmt. Mit Zirkusmusik und Lach-Sounds.'],
          ['finn', '(lacht) Nochmal, nochmal!'],
          ['malik', 'Ist doch lustig, oder? Du lachst ja gar nicht.'],
          { wahl: [
            { t: 'Mitlachen. Alle schauen gerade.', log: 'Mitgelacht, obwohl es sich falsch anfühlte', folge: 'Malik: „Siehste!“ Chloé schaut auf den Boden.', skill: false, setze: { gelacht: true } },
            { t: 'Nicht lachen. Weggucken.', log: 'Nicht mitgelacht, aber geschwiegen', folge: 'Keiner merkt es. Das Video läuft zum dritten Mal.', skill: null },
            { t: '„Weiß Noor, dass das rumgeht?“', log: 'Als Erste(r) eine Frage gestellt, statt mitzulachen', folge: 'Kurz Stille. Dann sagt Chloé leise: „Ja. Ich fand’s auch nicht lustig.“', skill: true, setze: { anfang: true } },
          ], frage: 'Drei Sekunden. Was machst du?' },
          { wenn: (f) => f.anfang, dann: [{ moment: 'Du hast angefangen – und Chloé hat sich sofort angeschlossen. Sie hatte nur auf jemanden gewartet.' }] },
        ],
      },
      {
        ziel: 'Malik zieht dich in die Halle. Er hat einen Plan.', ort: 'Halle', p: [0.0, -4.0], leute: { malik: [1.6, -4.6, null, 'handy'], sara: [-1.4, -4.8] },
        zeilen: [
          ['malik', 'Du hast die meisten Kontakte. Schick’s in die große Gruppe. Dann hat’s jeder.'],
          { wahl: [
            { t: '„Nee.“', log: 'Nein-Karte gespielt: kurz, ohne Begründung', setze: { nein: 'kurz' } },
            { t: '„Ohne mich. Zeig lieber Kickflips.“', log: 'Nein-Karte gespielt: Nein plus Vorschlag', setze: { nein: 'vorschlag' } },
            { t: '„Hab gleich Training.“', log: 'Nein-Karte gespielt: Ausrede (erlaubt)', setze: { nein: 'ausrede' } },
            { t: '„Okay, gib her.“', log: 'Ja gesagt und das Video weitergeleitet', folge: 'Nach zehn Minuten hat es die ganze Stufe.', skill: false, setze: { nein: 'ja' } },
          ], frage: 'Welche Nein-Karte spielst du?' },
          { wenn: (f) => f.nein !== 'ja', dann: [
            ['sara', 'Ich dachte, wir sind Freunde. Hast du Schiss oder was?'],
            { wahl: [
              { t: 'Nein liegen lassen. Ruhig.', log: 'Bei der Drängel-Karte ruhig beim Nein geblieben', folge: 'Sara verdreht die Augen. Aber sie fragt nicht noch mal.', skill: true },
              { t: '„Ich geh jetzt.“', log: 'Bei der Drängel-Karte gegangen', folge: 'Hinter dir: „Hä?“ Nach zehn Schritten ist es egal.', skill: true },
              { t: '„Na gut, dann halt.“', log: 'Bei der Drängel-Karte eingeknickt', folge: 'Das Video geht raus. Mit deinem Namen dran.', skill: false, setze: { nein: 'ja' } },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Zum Musikraum im Neubau. Noor ist dort.', ort: 'Musikraum', p: [54.2, -59.0], leute: { chloe: [53.0, -57.8] },
        zeilen: [
          { wenn: (f) => f.anfang, dann: [['chloe', 'Ich komm mit. Allein hätt ich mich nicht getraut.']], sonst: [['chloe', '(steht schon da) Ich wollte vorhin was sagen. Aber ich hab gewartet, dass jemand anfängt.']] },
          ['noor', '(dreht sich um, die Sticks in der Hand) Ich hab’s gesehen. Alle haben es gesehen. Ich spiel nie wieder.'],
          { wahl: [
            { t: '„Nicht alle fanden’s lustig.“', log: 'Noor gezeigt, dass sie nicht allein ist', folge: 'Noor schaut hoch. „Echt?“', skill: true },
            { t: '„Vergiss es. Ist bald vorbei.“', log: 'Noors Gefühl kleingeredet', folge: 'Noor legt die Sticks weg.', skill: false },
            { wenn: (f) => f.gelacht || f.nein === 'ja', t: '„Ich hab mitgemacht. Das tut mir leid.“', log: 'Sich bei Noor fürs Mitmachen entschuldigt', folge: 'Noor schluckt. „Danke, dass du’s sagst.“', skill: true },
          ] },
          ['noor', 'Kann man das wegmachen?'],
          { wahl: [
            { t: 'Mit Noor zum SePAS.', log: 'Mit Noor Hilfe bei einem Erwachsenen geholt', folge: 'Herr Kuedes kümmert sich darum, dass es gelöscht wird.', skill: true },
            { t: 'Das Video in der App melden.', log: 'Das Video gemeldet', folge: 'Melden ist richtig – aber es dauert. Schneller hilft ein Erwachsener. Oder BEE SECURE: 8002 1234.', skill: true },
            { wenn: (f) => f.nein === 'ja', t: 'Löschen. Gruppe bitten: „Löscht das.“', log: 'Die eigene Weiterleitung gelöscht und die Gruppe gebeten, es zu löschen', folge: 'Zwei schreiben: „Gelöscht.“ Nicht alle. Aber es ist ein Anfang.', skill: true },
            { t: '„Da kann man nichts machen.“', log: 'Nichts unternommen', folge: 'Noor nickt langsam.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Am nächsten Tag: Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { chloe: [-22.6, -39.2], malik: [-25.4, -41.0] },
        zeilen: [
          ['malik', '(leise) Ich hab das Video gelöscht. Gefilmt hab ich’s nicht mal. Ich wollte nur, dass alle lachen.'],
          { setze: { malikGeloescht: true } },
          { wahl: [
            { t: '„Stark. Sag’s Noor selbst.“', log: 'Malik ermutigt, sich bei Noor zu entschuldigen', folge: 'Malik: „Kommst du mit?“ Ihr geht zusammen zu Noor.', skill: true, setze: { malikNoor: true } },
            { t: '„Zu spät.“', log: 'Malik abgewiesen', folge: 'Malik zuckt mit den Schultern.', skill: null },
          ] },
          { skala: 'Wie schwer war es heute, anders zu sein als die Gruppe?', links: 'leicht', rechts: 'sehr schwer' },
          { notiz: 'Mein Nein, das zu mir passt (welche Art, welcher Satz?):', platz: '„Nee. Mach ich nicht.“ …' },
        ],
      },
    ],
    ende: [{ wenn: (f) => !f.gelacht && f.nein !== 'ja', dann: [['noor', '(Am Freitag, in der Pause) Ich spiele in der Aula. Für alle. Kommst du? … Die Leuchtjacke ist für dich. Damit man dich sieht – so wie du mich gesehen hast.']],
      sonst: [['noor', '(Am Freitag, in der Pause) Ich spiel in der Aula. Ich hab’s mir überlegt.'], ['e', 'In deinem Spind liegt eine Leuchtjacke. Ein Zettel: „Für den nächsten ersten Schritt.“']] }],
    resuemee: { frage: 'Warum ist der erste Schritt so schwer – und warum braucht es oft nur eine zweite Person?', satz: 'Wenn alle mitmachen und ich nicht will, sage ich: …' },
  },

  // ---------- Stunde 3 · Zuschauer → Keine Bühne ----------
  'BUEHNE-3': {
    start: [
      ['h:Jade', 'Sara behauptet, ich hätte über sie gelästert. Stimmt nicht. Sie will mich am Bushäuschen „sprechen“. 😬'],
      ['e', 'Ein Streit braucht zwei. Eine Show braucht Publikum. Heute bist du Publikum – und entscheidest, wie groß die Bühne wird.'],
      { setze: { publikum: 30 } },
    ],
    schritte: [
      {
        ziel: 'Zum Bushäuschen in der Rue du Moulin.', ort: 'Bushäuschen', p: [4.7, 85.0], leute: { jade: [3.6, 84.2, null, 'redet'], sara: [5.6, 84.0, null, 'redet'], finn: [6.6, 86.2, null, 'handy'] },
        zeilen: [
          ['sara', 'Sag’s mir ins Gesicht! Du hast gesagt, ich bin fake!'],
          ['jade', 'Hab ich nicht! Wer erzählt so was?'],
          ['finn', 'Fight! Fight!'],
          ['e', 'Finn filmt. Vier aus der 6ème bleiben stehen.'],
          { plus: { publikum: 30 } },
          { thermo: 'publikum', text: 'Die Bühne' },
          { wahl: [
            { t: 'Spaß', log: 'Eingeschätzt als: Spaß' },
            { t: 'Streit – zwei auf Augenhöhe', log: 'Eingeschätzt als: Streit (zwei auf Augenhöhe)' },
            { t: 'Mobbing', log: 'Eingeschätzt als: Mobbing' },
          ], frage: 'Was ist das gerade?' },
          { wahl: [
            { t: 'Mitfilmen.', log: 'Mitgefilmt', folge: 'Jetzt filmen zwei. Sara wird lauter – für die Kamera.', skill: false, setze: { buehneGefilmt: true }, plus: { publikum: 30 } },
            { t: 'Weitergehen, nicht gucken.', log: 'Kleinste Karte: einfach nicht Publikum sein', folge: 'Ein Zuschauer weniger. Klein – aber es zählt.', skill: true, plus: { publikum: -10 } },
            { t: 'Zu Finn: „Mach aus.“', log: 'Dem Publikum die Bühne genommen: Kamera aus, Zuschauer weg', folge: 'Finn senkt das Handy. Die 6ème zieht weiter.', skill: true, plus: { publikum: -30 } },
            { t: 'Zu Jade: „Komm, dein Bus.“', log: 'Jade aus der Show geholt, ohne Szene', folge: 'Jade geht mit. Sara ruft noch was. Aber ohne Gegenüber ist die Show vorbei.', skill: true, setze: { jadeRaus: true }, plus: { publikum: -30 } },
          ], frage: 'Wie machst du die Bühne kleiner?' },
          { thermo: 'publikum', text: 'Die Bühne' },
          { wenn: (f) => f.buehneGefilmt, dann: [{ moment: 'Dein Video hat die Show doppelt so groß gemacht.' }] },
        ],
      },
      {
        ziel: 'Ein paar Straßen weiter: zur Épicerie.', ort: 'Épicerie', p: [40.0, 88.6], leute: { jade: [41.4, 89.4] },
        zeilen: [
          { wenn: (f) => f.jadeRaus, dann: [['jade', 'Danke, dass du mich da rausgeholt hast. Ohne Theater.']], sonst: [['jade', '(kommt nach) Das war so peinlich. Alle haben geguckt.']] },
          ['jade', 'Ich hab nie gelästert. Aber jetzt glaubt das jeder.'],
          { wahl: [
            { t: '„Zu Sara – ohne Publikum?“', log: 'Jade ein Gespräch ohne Bühne angeboten', folge: 'Jade: „Morgen. Nur wir drei.“', skill: true },
            { t: '„Ich regel das für dich.“', log: 'Für Jade übernehmen wollen', folge: 'Jade: „Nee! Bitte nicht. Das macht’s schlimmer.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zwei Tage später: am Handy.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['h:Klassen-Chat', '(Finns Video vom Bushäuschen, neu hochgeladen von jemand anderem) „Jade, die Drama-Queen 👑🤡“'],
          ['e', 'Darunter 28 Lachsmileys. Jeden Tag kommt ein neuer Sticker mit Jades Gesicht dazu. Jade schreibt nichts mehr im Chat.'],
          { wahl: [
            { t: 'Immer noch Streit.', log: 'Zwei Tage später eingeschätzt als: Streit', skill: false },
            { t: 'Jetzt Mobbing.', log: 'Zwei Tage später erkannt: Jetzt ist es Mobbing (wiederholt, absichtlich, ungleich, wehrlos)', folge: 'Jeden Tag, absichtlich, viele gegen eine – und Jade kann sich allein nicht wehren.', skill: true },
            { t: 'Nur Spaß.', log: 'Zwei Tage später eingeschätzt als: Spaß', skill: false },
          ], frage: 'Was ist es jetzt?' },
          { moment: 'Aus einem Streit am Bushäuschen ist im Chat Mobbing geworden. Groß gemacht haben es die Zuschauer.' },
          { wahl: [
            { t: 'Lachsmiley. Machen eh alle.', log: 'Mit einem Lachsmiley verstärkt', folge: 'Smiley Nummer 29.', skill: false },
            { t: 'Nichts tun. Nicht dein Ding.', log: 'Weggeschaut', folge: 'Am nächsten Tag kommt ein neuer Sticker.', skill: false },
            { t: 'Jade privat: „Du bist nicht allein.“', log: 'Jade privat Rückhalt gegeben', folge: 'Jade: „Danke. Echt.“', skill: true, setze: { geschrieben: true } },
            { t: 'Screenshots zum SePAS.', log: 'Beweise gesichert und einem Erwachsenen gezeigt', folge: 'Herr Kuedes spricht mit der Klasse. Die Sticker hören auf.', skill: true, setze: { erwachsen: true } },
          ] },
          { wenn: (f) => !f.geschrieben, dann: [{ wahl: [
            { t: 'Jade zusätzlich privat schreiben.', log: 'Jade außerdem privat geschrieben', folge: 'Jade: „Hätte nicht gedacht, dass das jemand merkt.“', skill: true },
            { t: 'Lassen.', log: 'Jade nicht geschrieben', skill: null },
          ], frage: 'Und Jade selbst?' }] },
        ],
      },
      {
        ziel: 'Am Tag danach: Bushaltestelle vor der Schule.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { jade: [-18.2, 43.6], sara: [-21.0, 42.0] },
        zeilen: [
          { wenn: (f) => !f.erwachsen, dann: [
            ['e', 'Die Sticker gehen weiter. Jeden Tag ein neuer. Mobbing hört selten von allein auf.'],
            { wahl: [
              { t: 'Jetzt Screenshots zum SePAS.', log: 'Doch noch einen Erwachsenen eingeschaltet', folge: 'Herr Kuedes spricht mit der Klasse. Die Sticker hören auf.', skill: true },
              { t: 'Mit Jade BEE SECURE anrufen.', log: 'Mit Jade Hilfe bei BEE SECURE geholt', folge: 'Unter 8002 1234 erklärt jemand, wie man Beweise sichert und meldet.', skill: true },
              { t: 'Warten. Hört schon auf.', log: 'Gewartet, dass es von allein aufhört', folge: 'Es hört nicht auf. Jade kommt zwei Tage nicht zur Schule.', skill: false },
            ], frage: 'Und jetzt?' },
          ] },
          ['sara', '(zu Jade, leise) Das mit den Stickern war ich nicht. Und das mit dem Lästern … war ein Screenshot ohne Zusammenhang. Sorry.'],
          ['jade', 'Okay.'],
          ['e', 'Kein Publikum. Zwei Sätze. Mehr braucht es manchmal nicht.'],
          { skala: 'Wie oft bist du Publikum, wenn es bei anderen knallt?', links: 'nie', rechts: 'oft' },
          { notiz: 'Ein Schritt, der eine Bühne kleiner macht – und den du dich wirklich traust:', platz: 'Ich kann …' },
        ],
      },
    ],
    ende: [['jade', '(gibt dir ein dunkelrotes Bandana) Mein Vorhang. Wenn die Show vorbei sein soll: Vorhang zu.']],
    resuemee: { frage: 'Welche kleinste Karte würdet ihr als Zuschauer wirklich spielen – und was kostet sie?', satz: 'Wenn ich Zuschauer bin, mache ich die Bühne kleiner, indem ich …' },
  },
};
