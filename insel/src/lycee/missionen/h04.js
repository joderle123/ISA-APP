// REAL TALK #04 „Gedanken“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Situation – Gedanke – Gefühl
// (zwei Filme) · alte Sätze erkennen und prüfen · Beweis, Gefühl oder Meinung · neuer Satz + kleiner Schritt. Alle Personen erfunden.
export default {
  // ---------- Stunde 1 · Film im Kopf → Zwei Filme ----------
  'FILM-1': {
    start: [
      ['e', 'Gleiche Situation, zwei Gedanken, zwei Filme. Heute spielst du beide. Dann zeigt sich, was wirklich war.'],
    ],
    schritte: [
      {
        ziel: 'Zur Kantine. Du hast dein Tablett.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -7.4, null, 'redet'], malik: [18.4, -5.4, null, 'handy'] },
        zeilen: [
          ['e', 'Du stellst dein Tablett ab. Am Tisch lachen Sara und Malik. Laut.'],
          { wahl: [
            { t: '„Die lachen über mich.“', log: 'Film 1 – Gedanke: „Die lachen über mich.“', setze: { film1: 'dunkel' } },
            { t: '„Da war gerade ein Witz.“', log: 'Film 1 – Gedanke: „Da war ein Witz.“', setze: { film1: 'hell' } },
          ], frage: 'Dein erster Gedanke:' },
          { wenn: (f) => f.film1 === 'dunkel', dann: [
            ['e', 'Film 1: Dein Gesicht wird heiß. Du nimmst das Tablett wieder. Du setzt dich allein ans Fenster.'],
            ['e', 'Sara winkt dir. Du siehst es nicht – oder willst es nicht sehen.'],
            { moment: 'Film 1: Mit dem Gedanken „Die lachen über mich“ hast du allein gegessen.' },
          ], sonst: [
            ['e', 'Film 1: Du setzt dich dazu. „Was ist so lustig?“ Malik zeigt dir sein Handy.'],
            { moment: 'Film 1: Mit dem Gedanken „Da war ein Witz“ hast du dich dazugesetzt.' },
          ] },
          { blende: '⏪ Zurückspulen. Gleiche Szene, anderer Gedanke.' },
          ['e', 'Film 2: Du stellst dein Tablett ab. Sara und Malik lachen.'],
          { wenn: (f) => f.film1 === 'dunkel', dann: [
            ['e', 'Diesmal denkst du: „Vielleicht lachen die über was anderes.“'],
            { wahl: [
              { t: 'Hinsetzen und fragen: „Was ist so lustig?“', log: 'Film 2: trotz Zweifel gefragt', folge: 'Malik zeigt dir ein Video: eine Taube klaut einem Typen die Pommes.', skill: true },
              { t: 'Trotzdem allein ans Fenster.', log: 'Film 2: trotzdem allein gesetzt', folge: 'Der dunkle Gedanke war schneller als der neue.', skill: false },
            ] },
          ], sonst: [
            ['e', 'Diesmal denkst du: „Die lachen über mich.“ Dein Gesicht wird heiß.'],
            { wahl: [
              { t: 'Den Gedanken prüfen: Was weiß ich sicher? Dann fragen.', log: 'Film 2: den dunklen Gedanken geprüft und gefragt', folge: 'Malik zeigt dir ein Video: eine Taube klaut einem Typen die Pommes.', skill: true },
              { t: 'Weggehen.', log: 'Film 2: weggegangen', folge: 'Du isst allein. Der Gedanke hat gewonnen.', skill: false },
            ] },
          ] },
          { moment: 'In Wirklichkeit: Sara und Malik lachten über ein Video – eine Taube, die Pommes klaut.' },
          ['sara', '(lacht) Gerd! Die Taube von der Bushaltestelle! Die klaut jetzt auch in der Kantine.'],
        ],
      },
      {
        ziel: 'Nachmittag auf dem Schulhof. Dein Handy zeigt zwei blaue Haken.', ort: 'Brunnen', p: [-8.0, 22.6], leute: {},
        zeilen: [
          ['e', 'Du hast Lio gefragt: „Kommst du nachher mit zum Skatepark?“ Zwei blaue Haken. Keine Antwort. Seit 40 Minuten.'],
          { wahl: [
            { t: '„Er hat keinen Bock auf mich.“', log: 'Chat – erster Gedanke: „Er hat keinen Bock auf mich.“', folge: 'Gefühl: traurig. Du willst den Chat löschen.', setze: { chat: 'dunkel' } },
            { t: '„Er hat gerade keine Zeit.“', log: 'Chat – erster Gedanke: „Er hat gerade keine Zeit.“', folge: 'Gefühl: ruhig. Du wartest ab.', setze: { chat: 'hell' } },
            { t: '„Der ist sauer wegen gestern.“', log: 'Chat – erster Gedanke: „Er ist sauer.“', folge: 'Gefühl: nervös. Du überlegst, was du falsch gemacht hast.', setze: { chat: 'dunkel' } },
          ], frage: 'Dein erster Gedanke:' },
          { wenn: (f) => f.chat === 'dunkel', dann: [
            { wahl: [
              { t: 'Einen zweiten Film suchen: „Akku leer? Training?“', log: 'Zum dunklen Gedanken einen zweiten gesucht', folge: 'Das Gefühl wird leiser. Du wartest.', skill: true },
              { t: 'Den Chat löschen.', log: 'Den Chat gelöscht', folge: 'Weg ist er. Das Gefühl nicht.', skill: false, setze: { geloescht: true } },
              { t: 'Fünf Nachrichten hinterher: „???“', log: 'Fünfmal nachgeschrieben', folge: 'Immer noch zwei blaue Haken.', skill: false },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Lio steigt aus dem Bus.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { lio: [-18.2, 43.6] },
        zeilen: [
          ['lio', 'Hey! Sorry, Handy war leer. Ich hab’s gelesen und dann – zack, schwarz. Klar komm ich mit!'],
          { moment: 'Lios Handy war einfach leer.' },
          { wenn: (f) => f.geloescht, dann: [['lio', 'Warte … du hast den Chat gelöscht? Warum?'], { wahl: [
            { t: '„Ich dachte, du hast keinen Bock auf mich. Mein Kopf war schneller als die Wahrheit.“', log: 'Lio den eigenen Film ehrlich erklärt', folge: 'Lio: „Kenn ich. Passiert mir dauernd.“', skill: true },
            { t: '„Aus Versehen.“', log: 'Den Film verschwiegen', folge: 'Lio zuckt mit den Schultern.', skill: null },
          ] }] },
          ['lio', 'Welcher Film läuft bei dir eigentlich öfter? Der dunkle oder der helle?'],
          { wahl: [
            { t: 'Der dunkle.', log: 'Eigener Film: meistens der dunkle', privat: true },
            { t: 'Der helle.', log: 'Eigener Film: meistens der helle', privat: true },
            { t: 'Kommt drauf an.', log: 'Eigener Film: kommt darauf an', privat: true },
          ], frage: 'Ehrlich (nur für dich):' },
        ],
      },
    ],
    ende: [['lio', 'Hier, die Regie-Kappe. Wer zwei Filme drehen kann, darf Regie führen.']],
    resuemee: { frage: 'Bei welcher Situation läuft bei euch sofort der dunkle Film – und welcher zweite Film könnte auch stimmen?', satz: 'Wenn mein dunkler Film startet, frage ich mich: …' },
  },

  // ---------- Stunde 2 · Alte Sätze → Der alte Satz ----------
  'SATZ-2': {
    start: [
      ['h:Herr Lenz', 'Das Kino im Jugendhaus braucht noch ein Regal für die Decken. Malik hat einen Plan gezeichnet. Baust du es in der Werkstatt?'],
      ['e', 'Kaum hast du Ja gesagt, flüstert ein alter Satz: „Das kannst du eh nicht.“'],
    ],
    schritte: [
      {
        ziel: 'Zur Werkstatt. Maliks Plan liegt bereit.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2] },
        zeilen: [
          ['malik', 'Hier, mein Plan. Mit Maßen. Ich kann planen, du kannst bauen. Deal?'],
          ['e', '(Der alte Satz, leise:) „Das kannst du eh nicht. Das wird schief. Wie immer.“'],
          { wahl: [
            { t: 'Den Satz bemerken: „Ah. Der alte Satz ist wieder da.“', log: 'Den alten Satz bemerkt und benannt', folge: 'Er wird nicht leiser. Aber du weißt jetzt, wer da redet.', skill: true },
            { t: 'Ihm glauben: „Malik, mach du lieber.“', log: 'Dem alten Satz geglaubt und abgegeben', folge: 'Malik: „Ich kann aber nicht sägen. Das weißt du.“', skill: false, setze: { abgegeben: true } },
          ] },
          ['malik', 'Woher kommt eigentlich so ein Satz? Meiner heißt: „Ich bin zu blöd.“ Den hab ich aus der Grundschule.'],
          { wahl: [
            { t: 'Aus der Schule.', log: 'Herkunft des alten Satzes: Schule', privat: true },
            { t: 'Aus dem Sport.', log: 'Herkunft des alten Satzes: Sport', privat: true },
            { t: 'Aus dem Netz.', log: 'Herkunft des alten Satzes: Netz', privat: true },
            { t: 'Weiß ich nicht.', log: 'Herkunft des alten Satzes: unbekannt', privat: true },
            { t: 'Möchte ich nicht sagen.', log: 'Herkunft für sich behalten', privat: true },
          ], frage: 'Woher kommt dein alter Satz? (Nur für dich.)' },
          ['malik', 'Egal woher. Der ist halt hängen geblieben. Kriegt man aber auch wieder weg.'],
        ],
      },
      {
        ziel: 'In der Werkstatt: Das erste Brett ist zu kurz.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2] },
        zeilen: [
          ['e', 'Du hast falsch gemessen. Zwei Zentimeter zu kurz.'],
          ['e', '(Der alte Satz, laut:) „Siehst du. Wusste ich’s doch.“'],
          { wahl: [
            { t: 'Nachmessen, Fehler finden, ein neues Brett zuschneiden.', log: 'Gegen-Beweis 1: Den Fehler gefunden und behoben', folge: 'Das neue Brett passt. Gegen-Beweis Nummer eins.', skill: true, setze: { beweis1: true } },
            { t: 'Das Brett in die Ecke werfen.', log: 'Nach dem Fehler aufgegeben', folge: 'Der alte Satz hat einen Beweis mehr bekommen.', skill: false, setze: { hingeworfen: true } },
            { t: 'Schief zusammenschrauben. Merkt eh keiner.', log: 'Den Fehler versteckt', folge: 'Das Regal wackelt.', skill: false, setze: { wackelt: true } },
          ] },
          { wenn: (f) => f.beweis1, dann: [{ moment: 'Gegen-Beweis 1: Ein Fehler ist passiert – und du hast ihn repariert.' }] },
        ],
      },
      {
        ziel: 'Zum Lesesaal. Wie macht man eine stabile Ecke?', ort: 'Lesesaal', p: [14.0, -59.0], leute: { sara: [15.6, -59.6] },
        zeilen: [
          ['e', 'Die Ecke hält nicht. Du weißt nicht, wie man sie verbindet.'],
          ['sara', 'Suchst du was? Ich kenn das Werkzeugbuch hier. Mein Onkel ist Schreiner.'],
          { wahl: [
            { t: '„Ja. Zeigst du mir, wie man Ecken verbindet?“', log: 'Gegen-Beweis 2: Um Hilfe gebeten', folge: 'Sara zeigt dir eine Zeichnung. Zwei Dübel, Leim, fertig.', skill: true, setze: { beweis2: true } },
            { t: '„Nee, geht schon.“', log: 'Hilfe abgelehnt', folge: 'Du suchst allein. Zwanzig Minuten.', skill: false },
          ] },
          { wenn: (f) => f.beweis2, dann: [{ moment: 'Gegen-Beweis 2: Du konntest es nicht allein – und hast dir Hilfe geholt. Auch das ist Können.' }] },
          ['sara', 'Hast du auch so einen Satz? Meiner ist: „Ich muss es allen recht machen.“'],
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Das Regal wird gebraucht.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4], lenz: [27.2, 119.0, null, 'redet'], jade: [24.4, 120.8] },
        zeilen: [
          { wenn: (f) => f.wackelt, dann: [['lenz', 'Hm. Es wackelt. Was ist passiert?'], { wahl: [
            { t: '„Ich hab falsch gemessen und es versteckt. Ich mach’s neu.“', log: 'Den versteckten Fehler zugegeben', folge: 'Herr Lenz: „Das ist mehr wert als ein gerades Regal.“', skill: true, setze: { beweis1: true } },
            { t: '„Das Holz ist schlecht.“', log: 'Die Schuld aufs Holz geschoben', folge: 'Herr Lenz schaut das Holz an. Das Holz ist gut.', skill: false },
          ] }], sonst: [{ wenn: (f) => f.hingeworfen && !f.beweis1, dann: [['lenz', 'Das Regal steht. Malik hat das letzte Brett zugeschnitten. Willst du das nächste Mal selbst?']], sonst: [['lenz', 'Gerade. Stabil. Wer hat das gebaut?']] }] },
          ['jade', '(legt Decken rein) Passt alles. Endlich liegt das Zeug nicht mehr auf dem Boden.'],
          { moment: 'Gegen-Beweis 3: Das Regal wird benutzt. Jeden Kino-Abend.' },
          ['malik', 'Und? Was sagt dein alter Satz jetzt?'],
          { wahl: [
            { wenn: (f) => f.beweis1 && f.beweis2, t: '„Er ist leiser. Ich hab drei Beweise dagegen.“', log: 'Den alten Satz mit Gegen-Beweisen geprüft', skill: true },
            { wenn: (f) => !(f.beweis1 && f.beweis2), t: '„Ein bisschen leiser. Ein, zwei Beweise hab ich schon.“', log: 'Den alten Satz mit ersten Gegen-Beweisen geprüft', skill: true },
            { t: '„Er sagt: Glück gehabt.“', log: 'Die Beweise als Glück abgetan', folge: 'Malik: „Glück? Du hast gemessen, gefragt, gebaut.“', skill: false },
          ] },
          { notiz: 'Dein neuer Satz – wahr, mit etwas, das du tust:', platz: 'zum Beispiel: Ich mache Fehler und repariere sie.' },
        ],
      },
    ],
    ende: [['lenz', 'Für Leute, die bauen, obwohl ein Satz dagegen flüstert: die Werkstatt-Weste.']],
    resuemee: { frage: 'Welche alten Sätze kennen fast alle – und welche Beweise sprechen dagegen?', satz: 'Mein alter Satz flüstert … Mein Gegen-Beweis: …' },
  },

  // ---------- Stunde 3 · Beweise, bitte → Gericht im Kopf ----------
  'BEWEIS-3': {
    start: [
      ['h:Lio', 'Hab die Mathe zurück. 22 von 60. Ich bin einfach dumm. Ist so.'],
      ['e', 'Ein Gedanke steht vor Gericht: „Lio ist dumm.“ Du bist die Richterin oder der Richter. Erst Beweise, dann Urteil.'],
    ],
    schritte: [
      {
        ziel: 'Zum Lesesaal. Lio sitzt mit der Mathearbeit da.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { lio: [15.6, -59.6] },
        zeilen: [
          ['lio', '22 von 60. Da steht’s schwarz auf weiß.'],
          { wahl: [
            { t: 'Ein echter Beweis – aber nur dafür, dass Mathe gerade schwer ist.', log: 'Die 22 Punkte als echten Beweis eingeordnet – aber nur für Mathe', skill: true },
            { t: 'Beweis, dass Lio überhaupt dumm ist.', log: 'Die 22 Punkte als Beweis für „dumm in allem“ genommen', folge: 'Zu groß: Eine Mathearbeit sagt etwas über Mathe. Nicht über alles.', skill: false },
            { t: 'Kein Beweis.', log: 'Die 22 Punkte gar nicht gezählt', folge: 'Doch, sie zählen – für Mathe. Ehrlich bleiben.', skill: false },
          ], frage: 'Was ist die Mathearbeit vor Gericht?' },
          ['lio', 'Und ich fühl mich dumm. Jeden Tag.'],
          { wahl: [
            { t: 'Ein Gefühl. Kein Beweis.', log: '„Ich fühle mich dumm“ als Gefühl eingeordnet, nicht als Beweis', skill: true },
            { t: 'Ein Beweis. Wer sich dumm fühlt, ist es.', log: 'Das Gefühl als Beweis genommen', folge: 'Dann wäre jeder dumm, der sich mal so fühlt.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zur Werkstatt. Malik kennt Lio vom Mopedschrauben.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2] },
        zeilen: [
          ['malik', 'Lio? Der hat zwei Mopeds wieder zum Laufen gebracht. Ohne Anleitung. Ich hab danebengestanden.'],
          { wahl: [
            { t: 'Beweis dagegen. Man kann es sehen.', log: 'Die Mopeds als Beweis gegen „dumm“ eingeordnet', skill: true, setze: { mopeds: true } },
            { t: 'Zählt nicht, ist ja kein Schulfach.', log: 'Die Mopeds nicht gezählt', folge: 'Malik: „Ach so. Nur Schule zählt? Dann bin ich auch dumm.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zur Kantine. Frau Kremer hatte Lio im Praktikum.', ort: 'Kantine', p: [17.2, -6.6], leute: {},
        zeilen: [
          ['kremer', 'Lio? Der hat zwei Wochen die Kasse gemacht. Kein Cent daneben. Kopfrechnen wie ein Profi.'],
          { wahl: [
            { t: 'Beweis dagegen – sogar beim Rechnen.', log: 'Die Kasse als Beweis gegen „dumm“ – und sogar fürs Rechnen – eingeordnet', skill: true, setze: { kasse: true } },
            { t: 'Zufall.', log: 'Die Kasse als Zufall abgetan', folge: 'Zwei Wochen Zufall? Unwahrscheinlich.', skill: false },
          ] },
          { moment: 'Wendung: Lio rechnet im echten Leben fehlerfrei – nur in der Mathearbeit nicht.' },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Lios Cousin schreibt ihm gerade.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { lio: [-18.2, 43.6, null, 'handy'] },
        zeilen: [
          ['lio', '(zeigt dir das Handy) Mein Cousin: „Du checkst halt nix. War schon immer so.“'],
          { wahl: [
            { t: 'Eine Meinung. Kein Beweis.', log: 'Den Spruch des Cousins als Meinung eingeordnet', skill: true },
            { t: 'Ein Beweis. Der kennt Lio ja lange.', log: 'Den Spruch als Beweis genommen', folge: 'Lange kennen ist kein Beweis. Es ist eine Meinung, die laut ist.', skill: false },
          ] },
          ['lio', 'Er sagt das seit ich sechs bin.'],
          { wahl: [
            { t: '„Darum klingt es so wahr. Weil du es so oft gehört hast.“', log: 'Erklärt: oft gehört ist nicht wahr', folge: 'Lio ist still. Dann: „Krass. Stimmt.“', skill: true },
            { t: '„Dann wird schon was dran sein.“', log: 'Dem Spruch recht gegeben', folge: 'Lio steckt das Handy weg. Ganz klein.', skill: false },
          ] },
          { wahl: [
            { t: '„Willst du mal mit Herrn Lenz darüber reden? Ich komm mit.“', log: 'Lio einen Erwachsenen angeboten', folge: 'Lio: „Vielleicht. Wenn du mitkommst.“', skill: true },
            { t: 'Das Thema wechseln.', log: 'Das Thema gewechselt', skill: null },
          ], frage: 'Sowas jahrelang zu hören, tut weh. Und jetzt?' },
        ],
      },
      {
        ziel: 'Zurück zum Lesesaal: das Urteil.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { lio: [15.6, -59.6] },
        zeilen: [
          ['lio', 'Und? Wie lautet das Urteil?'],
          { wahl: [
            { t: '„Zu groß. Mathe ist gerade schwer – aber dumm bist du nicht.“', log: 'Urteil: Der Satz „Ich bin dumm“ ist zu groß', skill: true },
            { t: '„Stimmt leider.“', log: 'Urteil: Der Satz stimmt', folge: 'Die Beweise sagen etwas anderes.', skill: false },
            { t: '„Stimmt nicht. Du bist ein Genie.“', log: 'Urteil: Lio ist ein Genie', folge: 'Lio: „Na ja. Das glaub ich auch nicht.“ Zu groß in die andere Richtung.', skill: false },
          ] },
          ['lio', 'Und was sag ich mir stattdessen?'],
          { wahl: [
            { t: '„Mathe fällt mir schwer. Ich bleibe dran. Rechnen kann ich – an der Kasse.“', log: 'Einen neuen Satz gebaut: wahr, aktiv, jetzt', folge: 'Lio schreibt ihn auf die Mathearbeit. Ganz oben.', skill: true },
            { t: '„Ich bin der Beste.“', log: 'Einen zu großen Satz gebaut', folge: 'Lio: „Den glaub ich mir nicht mal heute.“', skill: false },
            { t: '„Irgendwann wird’s schon.“', log: 'Einen passiven Satz gebaut', folge: 'Lio: „Und was mach ich bis irgendwann?“', skill: false },
          ] },
          ['lio', 'Darf ich dich mal was fragen? Hast du auch einen Satz, der vor Gericht müsste?'],
          { notiz: 'Ein Gedanke über dich, den du gern mal prüfen würdest:', platz: 'zum Beispiel: Ich bin nicht gut im …', privat: true },
        ],
      },
    ],
    ende: [['lio', 'Für dich. Die Brille. Damit du immer erst die Beweise siehst.']],
    resuemee: { frage: 'Welche Sprüche fühlen sich an wie ein Beweis – sind aber nur eine Meinung?', satz: 'Ein Beweis gegen einen alten Satz von mir: …' },
  },

  // ---------- Stunde 4 · Neuer Satz, neuer Tag → Neuer Satz, neuer Tag ----------
  'NEU-4': {
    start: [
      ['e', 'Montagmorgen. Neue Woche. Du nimmst einen neuen Satz mit – und probierst ihn viermal aus.'],
    ],
    schritte: [
      {
        ziel: 'Zur Bushaltestelle. Wähl deinen Satz für heute.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { mia: [-18.2, 43.6] },
        zeilen: [
          ['mia', 'Ich hab einen neuen Satz. „Meine Idee zählt genauso.“ Hast du auch einen?'],
          { wahl: [
            { t: '„Ich darf fragen.“', log: 'Satz des Tages: „Ich darf fragen.“', setze: { satz: 'fragen', satzText: 'Ich darf fragen.' } },
            { t: '„Fehler sind Übung.“', log: 'Satz des Tages: „Fehler sind Übung.“', setze: { satz: 'fehler', satzText: 'Fehler sind Übung.' } },
            { t: '„Ich darf Nein sagen.“', log: 'Satz des Tages: „Ich darf Nein sagen.“', setze: { satz: 'nein', satzText: 'Ich darf Nein sagen.' } },
            { t: '„Meine Idee zählt auch.“', log: 'Satz des Tages: „Meine Idee zählt auch.“', setze: { satz: 'idee', satzText: 'Meine Idee zählt auch.' } },
          ], frage: 'Dein neuer Satz:' },
          ['mia', 'Gut. Jetzt der Trick: Denken reicht nicht. Du musst ihn erleben. Ein Beweis pro Situation.'],
          ['e', 'Dein Satz: „{f:satzText}“'],
          ['e', 'Der Bus kommt nicht. Auf der Tafel steht nichts.'],
          { wahl: [
            { t: 'Den Busfahrer gegenüber fragen: „Fährt die 12 heute?“', log: 'Situation 1: einen Fremden gefragt', folge: '„Umleitung, zehn Minuten.“ Ein kleiner Beweis.', skill: true },
            { t: 'Still warten und hoffen.', log: 'Situation 1: still gewartet', folge: 'Zwanzig Minuten Unsicherheit.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zur Bäckerei. Rosa hat sich verrechnet.', ort: 'Bäckerei', p: [0.4, 54.2], leute: {},
        zeilen: [
          ['rosa', 'Zwei Euro zurück. Schönen Tag!'],
          ['e', 'Es hätten drei sein müssen. Hinter dir warten fünf Leute.'],
          ['e', '(Der alte Satz:) „Lass. Ist doch peinlich.“ – (Dein neuer Satz:) „{f:satzText}“'],
          { wahl: [
            { t: '„Entschuldigung, ich bekomme noch einen Euro.“', log: 'Situation 2: freundlich und klar etwas gesagt', folge: 'Rosa: „Oh! Danke, gut aufgepasst.“ Niemand hinter dir hat gelacht.', skill: true },
            { t: 'Nichts sagen und gehen.', log: 'Situation 2: nichts gesagt', folge: 'Ein Euro weg. Und der alte Satz hat recht behalten – scheinbar.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Planung fürs Turnier.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          ['e', 'Dein Satz: „{f:satzText}“'],
          ['lenz', 'Ideen fürs Turnier? Malik hat schon zehn.'],
          { wahl: [
            { t: 'Die eigene Idee sagen: „Eine Runde für Leute, die noch nie gespielt haben.“', log: 'Situation 3: die eigene Idee gesagt', folge: 'Malik: „Nee, dauert zu lange.“ Die Idee kommt nicht durch.', skill: true, setze: { abgelehnt: true } },
            { t: 'Nichts sagen. Malik hat ja genug.', log: 'Situation 3: die Idee für sich behalten', folge: 'Niemand erfährt deine Idee.', skill: false },
          ] },
          { wenn: (f) => f.abgelehnt, dann: [
            { moment: 'Wendung: Deine Idee wurde abgelehnt.' },
            ['e', '(Der alte Satz, triumphierend:) „Siehst du. Hättest du mal geschwiegen.“'],
            { wahl: [
              { t: '„Abgelehnt heißt nicht falsch. Ich hab’s gesagt – das ist der Beweis.“', log: 'Die Ablehnung nicht als Beweis für den alten Satz genommen', folge: 'Nach der Runde kommt Jade: „Die Runde für Neue fand ich gut. Ich wär dabei gewesen.“', skill: true },
              { t: '„Nie wieder sag ich was.“', log: 'Die Ablehnung dem alten Satz geglaubt', folge: 'Der alte Satz ist zufrieden. Du nicht.', skill: false },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Zur Kantine. Finn will deinen Nachtisch.', ort: 'Kantine', p: [17.2, -6.6], leute: { finn: [18.8, -7.4, null, 'redet'] },
        zeilen: [
          ['finn', 'Gibst du mir deinen Pudding? Du magst den doch eh nicht. Oder?'],
          ['e', 'Du magst den Pudding. Sehr sogar.'],
          { wahl: [
            { t: '„Nee. Den ess ich selbst.“ (lächeln)', log: 'Situation 4: freundlich Nein gesagt', folge: 'Finn: „Okay, okay.“ Kein Drama.', skill: true },
            { t: '„Na gut …“', log: 'Situation 4: Ja gesagt, Nein gemeint', folge: 'Finn freut sich. Du guckst ihm beim Essen zu.', skill: false },
          ] },
          ['e', 'Beim Abräumen rutscht dir das Glas vom Tablett. Es zerspringt. Alle schauen.'],
          { wahl: [
            { t: '„Ups. Passiert.“ – und einen Besen holen.', log: 'Situation 5: Einen Fehler ruhig wiedergutgemacht', folge: 'Nach zehn Sekunden schaut keiner mehr. Die Frau an der Ausgabe nickt dir zu.', skill: true },
            { t: 'Rot werden und schnell rausgehen.', log: 'Situation 5: Vor dem Fehler weggelaufen', folge: 'Draußen pocht dein Herz. Drinnen hat es längst keiner mehr im Kopf.', skill: false },
          ], frage: 'Und jetzt?' },
          ['mia', '(setzt sich dazu) Und? Wie viele Beweise?'],
          { skala: 'Wie sehr glaubst du deinem neuen Satz jetzt?', links: 'gar nicht', rechts: 'total' },
          { notiz: 'Dein Wenn-dann für morgen:', platz: 'Wenn …, dann sage ich mir … und mache …' },
        ],
      },
    ],
    ende: [['mia', 'Ein Satz wird nicht durch Denken wahr. Sondern durch Tage wie heute. Hier, das Sonnenaufgang-Shirt. Für den nächsten Morgen.']],
    resuemee: { frage: 'Welcher kleine Schritt war heute ein Beweis für euren neuen Satz – auch wenn etwas schiefging?', satz: 'Mein neuer Satz ist … Mein nächster kleiner Schritt: …' },
  },
};
