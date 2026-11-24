// REAL TALK #01 „Ich“ – drei Missionen (Format: kursmission.js). Skill der Stunden: Tanks und Tankstellen ·
// Alle kommen zu Wort (laut und leise) · Stärken sehen. Alle Personen erfunden.
const PI = Math.PI;
export default {
  // ---------- Stunde 1 · Leerer Tank → Tankwart ----------
  'TANK-6': {
    start: [
      ['h:Malik', 'Bist du in der Nähe vom Dorf?'],
      ['h:Malik', 'Heute ist jeder geladen. Finn hat eben Rosa angeschnauzt. Wegen einem Teilchen.'],
      ['h:Malik', 'Herr Lenz sagt: Wer heute hilft, kriegt die Kappe vom Jugendhaus. Bin dabei, wenn du dabei bist.'],
      ['e', 'Drei Leute, drei leere Tanks. Und nicht jede Tankstelle ist echt.'],
    ],
    schritte: [
      {
        ziel: 'Zur Bäckerei. Finn steht davor.', ort: 'Bäckerei', p: [0.4, 54.2], leute: { finn: [2.0, 54.6] },
        zeilen: [
          ['finn', 'Was willst du? Rosa hat dich geschickt, oder?'],
          { wahl: [
            { t: '„Du warst echt unhöflich zu ihr.“', log: 'Finn auf sein Verhalten angesprochen', folge: 'Finn macht dicht: „Super. Noch einer.“', skill: false, dann: [['finn', 'Super. Noch einer, der mir sagt, was ich falsch mache.'], ['du', 'Okay … wann hast du eigentlich was gegessen?'], ['finn', '(zuckt mit den Schultern) Gar nicht.']] },
            { t: '„Nö. Wann hast du heute was gegessen?“', log: 'Nach dem Tank gefragt statt nach der Schuld', folge: 'Finn erzählt: Bus verpasst, kein Frühstück, vier Stunden Schlaf.', skill: true, dann: [['finn', '(stutzt) Gar nicht. Bus verpasst. Und geschlafen hab ich so vier Stunden.']] },
            { t: '„Chill mal. Ist doch nur ein Teilchen.“', log: 'Finns Ärger kleingeredet', folge: 'Finn wird lauter. Rosa schaut aus dem Laden.', skill: false, dann: [['finn', 'Chill du mal! (lauter) Ich hab einfach keinen Bock mehr heute!'], ['e', 'Rosa schaut aus der Tür. Dann wieder rein.'], ['finn', '… Sorry. Ich hab nichts gegessen. Gar nichts.']] },
          ] },
          ['e', 'Welcher Tank ist bei Finn leer?'],
          { wahl: [
            { t: 'Der Körper-Tank: Essen und Schlaf.', log: 'Finns leeren Tank erkannt: Körper', skill: true },
            { t: 'Der Spaß-Tank: Ihm ist langweilig.', log: 'Bei Finn auf Langeweile getippt', folge: 'Daneben: Finn hat Hunger und ist müde.', skill: false },
            { t: 'Der Dazugehören-Tank: Keiner mag ihn.', log: 'Bei Finn auf „keiner mag ihn“ getippt', folge: 'Daneben: Finn hat Hunger und ist müde.', skill: false },
          ], frage: 'Welcher Tank ist leer?' },
          ['finn', 'Und jetzt? Machst du mir Frühstück, oder was?'],
          { wahl: [
            { t: 'Mein Brot teilen. „Setz dich kurz. Dann reden wir.“', log: 'Echte Tankstelle: Brot geteilt, kurz hingesetzt', folge: 'Nach zehn Minuten redet Finn wieder normal.', skill: true, setze: { finnGetankt: true }, dann: [['finn', '(kaut) … Okay. Das ist besser.'], ['finn', 'Ich geh gleich noch mal zu Rosa. Sag nichts.']] },
            { t: '„Hol dir ’nen Energy-Drink. Dann geht’s.“', log: 'Fake-Tankstelle empfohlen: Energy-Drink', folge: 'Eine Stunde später zittert Finn – und ist noch gereizter.', skill: false, setze: { finnGetankt: false }, dann: [['finn', 'Gute Idee. Zwei.'], ['e', 'Er verschwindet im Laden nebenan.']] },
            { t: '„Erst entschuldigst du dich bei Rosa.“', log: 'Erst Entschuldigung verlangt, dann Essen', folge: 'Finn sagt „Sorry“ – leise, ohne es zu meinen. Hunger hat er immer noch.', skill: false, setze: { finnGetankt: false }, dann: [['finn', '(geht rein, murmelt) Sorry.'], ['e', 'Rosa nickt. Finn kommt raus, die Hände in den Taschen. Der Magen knurrt.']] },
          ], frage: 'Was bietest du Finn an?' },
        ],
      },
      {
        ziel: 'Zum Spielplatz. Jade sitzt da allein.', ort: 'Spielplatz', p: [59.6, 77.6], leute: { jade: [61.3, 78.6, null, 'handy'] },
        zeilen: [
          ['e', 'Jade scrollt. Schnell. Ohne zu lachen.'],
          ['jade', 'Ist was?'],
          ['du', 'Die anderen sind am Weiher. Warum bist du hier?'],
          ['jade', 'Weil mich keiner gefragt hat. Ist aber egal. Hab eh keinen Bock.'],
          { wahl: [
            { t: '„Klingt nicht egal.“', log: 'Jades „egal“ nicht einfach geglaubt', folge: 'Jade legt das Handy weg.', skill: true, dann: [['jade', '(legt das Handy weg) … Nee. Ist es nicht. Die Gruppe ist ohne mich los. Ich hab’s auf den Fotos gesehen.']] },
            { t: '„Okay, wenn’s egal ist.“', log: 'Jades „egal“ geglaubt', folge: 'Jade scrollt weiter. Das Gespräch ist fast vorbei.', skill: false, dann: [['jade', 'Eben.'], ['e', 'Sie scrollt weiter. Dann, ohne aufzusehen:'], ['jade', 'Die sind am Weiher. Ohne mich. Steht auf den Fotos.']] },
          ] },
          { wahl: [
            { t: '„Komm mit ins Jugendhaus. Malik ist da, ich auch.“', log: 'Echte Tankstelle: Jade mitgenommen', folge: 'Jade kommt mit. Zögernd, aber sie kommt.', skill: true, setze: { jadeMit: true }, dann: [['jade', 'Echt jetzt? … Okay. Aber nur kurz.']] },
            { t: '„Die anderen sind eh doof. Lass uns über sie lästern.“', log: 'Fake-Tankstelle: zusammen gelästert', folge: 'Zehn Minuten fühlt es sich gut an. Dann fühlt sich Jade noch mehr draußen.', skill: false, setze: { jadeMit: false }, dann: [['jade', '(lacht kurz) Ja, total. Die sind so peinlich mit ihren Fotos.'], ['e', 'Ihr lacht. Dann wird Jade still.'], ['jade', 'Bringt aber nichts. Die sind trotzdem da und ich hier.']] },
            { t: 'Ihr ein lustiges Video schicken und weitergehen.', log: 'Jade ein Video geschickt', folge: 'Jade schickt ein Lach-Emoji. Allein bleibt sie trotzdem.', skill: false, setze: { jadeMit: false }, dann: [['e', 'Jades Handy brummt. Ein Lach-Emoji kommt zurück. Sie bleibt sitzen.']] },
          ], frage: 'Was bietest du Jade an?' },
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Malik wartet.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'handy'], lenz: [27.0, 121.0, null, 'redet'] },
        zeilen: [
          ['malik', 'Da bist du ja. Ich hab eine Idee. Schau mal.'],
          ['e', 'Auf seinem Handy: ein Video. Herr Lenz stolpert über ein Kabel. Kaffee überall.'],
          ['malik', 'Ich poste das. Dann reden endlich alle über mich.'],
          ['du', 'Wieso willst du, dass alle über dich reden?'],
          ['malik', 'Weil ich seit zwei Wochen sage: Wir brauchen ein Turnier hier. Und keiner hört zu.'],
          { wahl: [
            { t: '„Dann zeig mir die Turnier-Idee. Ich hör zu.“', log: 'Malik zugehört: Gehört-werden-Tank gefüllt', folge: 'Malik erklärt fünf Minuten lang sein Turnier. Er wirkt plötzlich ruhig.', skill: true, setze: { malikGehoert: true }, dann: [['malik', '(scrollt zu einer Notiz) Kicker, Billard, Tischtennis. Drei Runden. Jeder spielt mit jedem.'], ['du', 'Klingt gut. Warum hast du das nie Herrn Lenz gezeigt?'], ['malik', '… Weil ich dachte, er lacht.']] },
            { t: '„Poste es. Ist doch lustig.“', log: 'Fake-Tankstelle unterstützt: Video gepostet', folge: 'Viele Likes. Und Herr Lenz redet eine Woche nicht mehr mit Malik.', skill: false, setze: { malikGehoert: false }, dann: [['e', 'Malik tippt. Drei Sekunden später: die ersten Herzen.'], ['lenz', '(kommt rein, schaut aufs Handy, sagt nichts. Geht wieder.)'], ['malik', '… Okay. Das war’s jetzt wohl mit dem Turnier.']] },
            { t: '„Lass mich da raus.“', log: 'Sich rausgehalten', folge: 'Malik zögert. Das Video bleibt erst mal ungepostet.', skill: null, dann: [['malik', '(zögert, steckt das Handy weg) Mal sehen.']] },
          ], frage: 'Was machst du mit Maliks Idee?' },
          { wenn: (f) => f.malikGehoert, dann: [
            ['lenz', 'Was guckt ihr so verschwörerisch?'],
            { wahl: [
              { t: '„Malik hat eine Idee. Erzähl, Malik.“', log: 'Malik das Wort gegeben, nicht für ihn gesprochen', folge: 'Herr Lenz hört zu. Das Turnier kommt auf die Liste.', skill: true, dann: [['malik', '(räuspert sich) Ein Turnier. Kicker, Billard, Tischtennis.'], ['lenz', 'Warum erfahre ich das erst jetzt? Freitag. Du machst den Plan.']] },
              { t: 'Die Idee selbst erklären.', log: 'Maliks Idee selbst vorgestellt', folge: 'Herr Lenz findet die Idee gut – und bedankt sich bei dir. Malik schaut auf den Boden.', skill: false, dann: [['du', 'Wir wollen ein Turnier machen. Kicker, Billard …'], ['lenz', 'Starke Idee von dir!'], ['e', 'Malik sagt nichts mehr.']] },
            ] },
          ] },
          ['e', 'Die Tür geht auf.'],
          { wenn: (f) => f.finnGetankt, dann: [
            ['finn', 'Rosa hat Teilchen mitgegeben. Für alle. Hat gesagt, das ist wegen dir.'],
            { moment: 'Finn kam mit einer Tüte Teilchen von Rosa – weil er erst gegessen und dann mit ihr geredet hat.' },
          ], sonst: [
            ['h:Finn', 'Bin an der Bushaltestelle mit einem aneinandergeraten. Komm nicht.'],
            { moment: 'Finn ist mit leerem Tank an der Bushaltestelle in Streit geraten.' },
          ] },
          { wenn: (f) => f.jadeMit, dann: [['jade', '(setzt sich zu Malik) Turnier? Ich bin raus im Billard. Aber ich mach die Musik.'], { moment: 'Jade ist mitgekommen und macht beim Turnier die Musik.' }] },
          ['lenz', 'Und du? Wie voll ist dein eigener Tank heute?'],
          { skala: 'Wie voll ist dein Tank heute?', links: 'leer', rechts: 'voll' },
          { wahl: [
            { t: 'Körper (Essen, Schlaf)', log: 'Eigener leerster Tank: Körper', privat: true },
            { t: 'Dazugehören', log: 'Eigener leerster Tank: Dazugehören', privat: true },
            { t: 'Gehört werden', log: 'Eigener leerster Tank: Gehört werden', privat: true },
            { t: 'Selbst bestimmen', log: 'Eigener leerster Tank: Selbst bestimmen', privat: true },
            { t: 'Sicherheit', log: 'Eigener leerster Tank: Sicherheit', privat: true },
            { t: 'Möchte ich nicht sagen', log: 'Eigenen Tank für sich behalten', privat: true },
          ], frage: 'Welcher Tank ist bei dir gerade am leersten? (Nur für dich – kommt nicht ins Resümee.)' },
        ],
      },
    ],
    ende: [
      ['lenz', 'Drei Leute, drei Tanks. Du hast hingeschaut, bevor du geurteilt hast.'],
      ['lenz', 'Die Kappe gehört dir.'],
    ],
    resuemee: { frage: 'Welche Fake-Tankstelle kennt ihr – und warum ist sie so verlockend?', satz: 'Eine echte Tankstelle, die ich diese Woche nutze: …' },
  },

  // ---------- Stunde 2 · Laut oder leise → Die stille Idee ----------
  'LEISE-4': {
    start: [
      ['h:Herr Lenz', 'Sommerfest-Planung, gleich im Jugendhaus. Kommst du? Wir brauchen Ideen.'],
      ['e', 'In jeder Runde gibt es Laute und Leise. Heute zählt beides.'],
    ],
    schritte: [
      {
        ziel: 'Zum Jugendhaus. Die Planung fängt an.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], sara: [24.4, 120.8, null, 'redet'], amira: [26.8, 120.6, null, 'handy'], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          ['lenz', 'Fünf Minuten, dann schreibe ich auf. Was machen wir beim Sommerfest?'],
          ['malik', 'Turnier! Kicker, Billard, alles!'],
          ['sara', 'Und laute Musik. Richtig laut.'],
          ['malik', 'Und Wasserbomben. Und …'],
          ['e', 'Amira sitzt daneben. Sie hat einen Zettel in der Hand. Sie sagt nichts.'],
          { wahl: [
            { t: 'Auch eine Idee reinrufen.', log: 'Mitgerufen – die Runde wurde noch lauter', folge: 'Jetzt reden drei gleichzeitig. Amira faltet ihren Zettel zusammen.', skill: false, dann: [['du', 'Und ein Grill!'], ['e', 'Jetzt reden drei gleichzeitig. Amira faltet ihren Zettel klein.']] },
            { t: 'Amira anschauen und kurz warten.', log: 'Amira bemerkt und angeschaut', folge: 'Amira merkt, dass jemand sie sieht.', skill: true, dann: [['e', 'Amira schaut kurz hoch. Dann wieder auf ihren Zettel.']] },
            { t: '„Amira, sag du doch mal was!“ – laut vor allen.', log: 'Amira vor allen aufgerufen', folge: 'Alle drehen sich um. Amira wird rot: „Nee, passt schon.“', skill: false, setze: { amiraBlossgestellt: true }, dann: [['e', 'Alle drehen sich um.'], ['amira', '(wird rot) Nee … passt schon.']] },
          ], frage: 'Was machst du?' },
          ['lenz', 'Okay, ich muss kurz telefonieren. Zehn Minuten Pause.'],
        ],
      },
      {
        ziel: 'Amira ist rausgegangen. Geh ihr nach – zur Bank am Marktplatz.', ort: 'Marktplatz', p: [57.0, 113.2], leute: { amira: [58.6, 112.6, null, 'handy'] },
        zeilen: [
          ['amira', '(steckt den Zettel weg) Oh. Hi.'],
          { wenn: (f) => f.amiraBlossgestellt, dann: [['amira', 'Das vorhin war … unangenehm. Ich hasse es, wenn alle gucken.']] },
          { wahl: [
            { t: '„Was steht auf deinem Zettel?“', log: 'Nach Amiras Idee gefragt – allein, ohne Publikum', folge: 'Amira zeigt den Zettel.', skill: true, dann: [['amira', '(faltet ihn auf) Ein Kino-Abend draußen. Mit Beamer an der Wand vom Jugendhaus. Und Decken.']] },
            { t: '„Du musst halt lauter sein, sonst hört dich keiner.“', log: 'Amira geraten, lauter zu werden', folge: 'Amira: „Ich bin nicht so.“ Sie steckt den Zettel tiefer ein.', skill: false, dann: [['amira', 'Ich bin nicht so. Und ich will auch nicht so sein.'], ['du', '… Okay. Was steht denn drauf?'], ['amira', '(nach einer Weile) Kino draußen. Mit Beamer. Und Decken.']] },
          ] },
          ['amira', 'Aber gegen Wasserbomben und Turnier hat das keine Chance.'],
          { wahl: [
            { t: '„Ich sag drinnen: Amira hat eine Idee. Erzählen machst du.“', log: 'Angeboten, Amira das Wort zu geben – erzählen darf sie selbst', folge: 'Amira nickt. „Aber du fängst an.“', skill: true, setze: { amiraPlan: 'tuer' } },
            { t: '„Gib mir den Zettel, ich erzähl’s für dich.“', log: 'Angeboten, Amiras Idee selbst vorzutragen', folge: 'Amira gibt dir den Zettel. Es ist jetzt ein bisschen deine Idee.', skill: false, setze: { amiraPlan: 'fuer' } },
            { t: '„Schreib sie Herrn Lenz doch einfach.“', log: 'Amira geraten, die Idee schriftlich zu geben', folge: 'Amira tippt eine Nachricht. Ob Herr Lenz sie liest?', skill: null, setze: { amiraPlan: 'schreiben' } },
          ], frage: 'Wie soll die Idee in die Runde kommen?' },
        ],
      },
      {
        ziel: 'Zurück ins Jugendhaus. Die Runde geht weiter.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], sara: [24.4, 120.8, null, 'redet'], amira: [26.8, 120.6, null, 'redet'], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          ['lenz', 'Weiter geht’s. Malik, du warst bei Wasserbomben.'],
          ['malik', 'Genau, und dann …'],
          { wenn: (f) => f.amiraPlan === 'tuer', dann: [
            ['du', 'Kurz noch: Amira hat eine Idee. Die ist gut.'],
            ['amira', '(leise, dann fester) Ein Kino-Abend draußen. Beamer an die Wand, Decken auf den Rasen.'],
            ['sara', 'Oh. Das ist eigentlich voll schön.'],
            ['malik', 'Und davor das Turnier! Dann passt beides.'],
            ['lenz', 'Kino und Turnier. Amira, machst du die Filmliste?'],
            ['amira', '(lächelt) Ja.'],
            { moment: 'Amira hat ihre Idee selbst erzählt. Malik hat sie mit seinem Turnier verbunden.' },
          ] },
          { wenn: (f) => f.amiraPlan === 'fuer', dann: [
            ['du', 'Ich hab eine Idee: Kino-Abend draußen, mit Beamer und Decken.'],
            ['lenz', 'Gute Idee! Machst du die Filmliste?'],
            ['e', 'Amira schaut auf den Tisch.'],
            { wahl: [
              { t: '„Die Idee ist von Amira. Sie soll die Liste machen.“', log: 'Klargestellt: Die Idee ist von Amira', folge: 'Herr Lenz dreht sich zu Amira. Sie bekommt die Filmliste.', skill: true, dann: [['lenz', 'Ach so! Amira, dann bist du die Kino-Chefin.'], ['amira', '(leise) Okay. Gern.']] },
              { t: 'Die Filmliste übernehmen.', log: 'Die Filmliste selbst übernommen', folge: 'Amira geht früher. Ihre Idee läuft jetzt unter deinem Namen.', skill: false, dann: [['e', 'Amira geht früher. Ohne Tschüss.']] },
            ] },
            { moment: 'Herr Lenz hielt die Idee für deine.' },
          ] },
          { wenn: (f) => f.amiraPlan === 'schreiben', dann: [
            ['lenz', '(schaut aufs Handy) Oh – Amira, du hast mir geschrieben? Kino draußen? Warum sagst du das nicht?'],
            ['amira', '(zuckt) Weil hier immer alle so laut sind.'],
            ['malik', '… Sorry. Echt jetzt. Erzähl.'],
            { moment: 'Herr Lenz las Amiras Nachricht vor allen vor – und plötzlich wurde die Runde leise.' },
          ] },
          ['lenz', 'Letzte Frage: Wie machen wir das, dass beim nächsten Mal alle zu Wort kommen?'],
          { wahl: [
            { t: '„Eine Runde, in der jeder einmal dran ist. Wer will, darf passen.“', log: 'Regel vorgeschlagen: jeder einmal, passen erlaubt', folge: 'Die Regel kommt an die Pinnwand.', skill: true },
            { t: '„Wer was sagen will, muss sich halt durchsetzen.“', log: 'Vorgeschlagen: Wer laut ist, gewinnt', folge: 'Sara nickt, Amira nicht.', skill: false },
            { t: '„Erst zwei Minuten still aufschreiben, dann reden.“', log: 'Regel vorgeschlagen: erst still aufschreiben', folge: 'Herr Lenz schreibt es auf. Malik stöhnt – und macht mit.', skill: true },
          ] },
        ],
      },
    ],
    ende: [['lenz', 'Laut ist nicht besser. Leise ist nicht schlechter. Du hast beide reingeholt.']],
    resuemee: { frage: 'Wer ist bei uns in der Gruppe eher laut, wer eher leise – und wie kommen alle zu Wort?', satz: 'In einer Runde bin ich eher … und ich wünsche mir …' },
  },

  // ---------- Stunde 3 · Was du kannst → Stärken-Post ----------
  'STARK-24': {
    start: [
      ['h:Herr Lenz', 'Kleine Aktion: Stärken-Post. Fünf Leute auf dem Campus. Bei jedem eine echte Stärke finden – mit Beweis.'],
      ['h:Herr Lenz', 'Nicht „du bist nett“. Sondern: Was genau kann die Person? Woran hast du es gesehen?'],
    ],
    schritte: [
      {
        ziel: 'Zum Korbfeld. Lio wirft Körbe.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.4, 21.2, null, 'redet'] },
        zeilen: [
          ['e', 'Lio wirft. Daneben. Holt den Ball. Wirft wieder. Daneben. Wirft wieder.'],
          ['lio', 'Lach ruhig. Ich treff heute nix.'],
          { wahl: [
            { t: '„Du gibst nicht auf. Achtmal daneben – und du holst den Ball trotzdem.“', log: 'Stärke mit Beweis: Lio gibt nicht auf (acht Würfe)', folge: 'Lio: „So hab ich das nie gesehen.“', skill: true },
            { t: '„Du bist halt sportlich.“', log: 'Stärke ohne Beweis: „sportlich“', folge: 'Lio: „Sportlich? Ich treffe nix.“ Es kommt nicht an.', skill: false },
            { t: '„Echt schlecht heute, ja.“', log: 'Nur die Schwäche gesehen', folge: 'Lio wirft den Ball in die Ecke.', skill: false },
          ], frage: 'Welche Stärke schreibst du Lio auf die Karte?' },
        ],
      },
      {
        ziel: 'Zur Kantine. Sara hilft an der Ausgabe.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -7.4, null, 'redet'] },
        zeilen: [
          ['e', 'An der Ausgabe ist Chaos. Ein Tablett fällt. Sara räumt auf, sagt dem Kleinen: „Passiert. Nimm meins.“'],
          ['sara', 'Was ist? Willst du auch Nudeln?'],
          { wahl: [
            { t: '„Du hast eben sofort geholfen – und der Kleine musste sich nicht schämen.“', log: 'Stärke mit Beweis: Sara hilft, ohne bloßzustellen', folge: 'Sara grinst verlegen.', skill: true },
            { t: '„Du bist hilfsbereit.“', log: 'Stärke ohne Beweis: „hilfsbereit“', folge: 'Sara: „Ja, ja.“ Sie hört es öfter – und glaubt es nicht.', skill: false },
          ], frage: 'Was schreibst du Sara?' },
          ['sara', 'Und was kannst du so? Sag mal eine Stärke von dir.'],
          { wahl: [
            { t: 'Eine nennen – mit Beweis.', log: 'Eigene Stärke genannt' , dann: [{ notiz: 'Deine Stärke – und woran man sie sieht:', platz: 'Ich kann … Man sieht es, wenn …' }, ['sara', 'Siehst du. Geht doch.']] },
            { t: '„Keine Ahnung. Nichts Besonderes.“', log: 'Bei der eigenen Stärke gepasst', folge: 'Sara: „Glaub ich dir nicht. Frag mal die anderen.“', dann: [['sara', 'Glaub ich nicht. Frag nachher mal die anderen.']] },
          ] },
        ],
      },
      {
        ziel: 'Zur Werkstatt. Malik baut etwas.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2, null, 'redet'] },
        zeilen: [
          ['malik', 'Hey. Ich bau ein Regal für das Kino. Ist schief geworden.'],
          ['e', 'Malik hat alles auf ein Blatt gezeichnet. Mit Maßen. Dreimal nachgemessen.'],
          ['malik', 'Bin halt zu blöd für so was.'],
          { wahl: [
            { t: '„Zu blöd? Du hast einen Plan mit Maßen gezeichnet. Das kann nicht jeder.“', log: 'Stärke mit Beweis: Malik plant genau', folge: 'Malik schaut auf seinen Plan, als sähe er ihn zum ersten Mal.', skill: true },
            { t: '„Ach was, du bist doch nicht blöd.“', log: 'Malik nur widersprochen', folge: 'Malik: „Doch.“ Widersprechen allein reicht nicht.', skill: false },
          ] },
          ['malik', 'Okay. Und das Schiefe?'],
          { wahl: [
            { t: '„Planen ist deine Stärke. Sägen übst du noch. Beides darf sein.“', log: 'Stärke und Baustelle nebeneinander gelassen', folge: 'Malik: „Stärke und Kehrseite, wie im Kurs.“', skill: true },
            { t: '„Lass das lieber jemand anderes machen.“', log: 'Malik das Sägen abgenommen', folge: 'Malik gibt die Säge weg.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Dort sitzt Opa Nik.', ort: 'Bushaltestelle', p: [-20.2, 42.8], leute: {},
        zeilen: [
          ['nik', 'Na? Du siehst aus, als suchst du was.'],
          ['du', 'Stärken. Bei Leuten.'],
          ['nik', '(lacht) Bei mir? Ich sitz hier nur. Jeden Tag. Füttere Gerd, die Taube.'],
          { wahl: [
            { t: '„Sie kennen jeden hier mit Namen. Und jeder grüßt Sie.“', log: 'Stärke mit Beweis: Opa Nik hält das Dorf zusammen', folge: 'Opa Nik ist kurz still. Dann: „Das hat mir lange keiner gesagt.“', skill: true },
            { t: '„Sie sind geduldig.“', log: 'Stärke ohne Beweis: „geduldig“', folge: 'Opa Nik: „Geduldig? Ich hab halt Zeit.“', skill: false },
          ] },
          ['nik', 'Und wer schreibt dir eine Karte?'],
        ],
      },
      {
        ziel: 'Zurück zum Jugendhaus: die Stärken-Post verteilen.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { lio: [23.9, 119.4, null, 'redet'], sara: [24.4, 120.8, null, 'redet'], malik: [26.8, 120.6, null, 'redet'], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          ['lenz', 'Post ist da. Wer liest vor?'],
          ['e', 'Du liest deine Karten vor. Lio, Sara, Malik hören zu.'],
          ['lio', '(leise) „Du gibst nicht auf.“ … Krass.'],
          ['e', 'Dann legt Herr Lenz eine Karte vor dich. Darauf stehen drei Sätze. Von den anderen.'],
          { wenn: (f) => f.malikGehoert, dann: [['malik', 'Ich hab geschrieben: Du hörst zu, bevor du urteilst. Wie beim Turnier.']], sonst: [['malik', 'Ich hab geschrieben: Du kommst, wenn man dich fragt.']] },
          ['sara', 'Und ich: Du siehst Sachen, die andere übersehen.'],
          { moment: 'Am Ende bekamst du selbst eine Karte – mit Stärken, die die anderen bei dir gesehen haben.' },
          { wahl: [
            { t: '„Danke.“ Und es einfach stehen lassen.', log: 'Ein Kompliment angenommen, ohne es kleinzumachen', folge: 'Es fühlt sich komisch an. Und gut.', skill: true },
            { t: '„Ach, das stimmt doch gar nicht.“', log: 'Das Kompliment abgewehrt', folge: 'Sara: „Doch. Wir haben Beweise.“', skill: false },
          ] },
        ],
      },
    ],
    ende: [['lenz', 'Fünf Stärken, fünf Beweise. Und eine für dich. Die Jacke steht dir.']],
    resuemee: { frage: 'Welche Stärke habt ihr diese Woche bei jemandem gesehen – und woran genau?', satz: 'Eine Stärke von mir, mit Beweis: …' },
  },
};
