// REAL TALK #04 „Gedanken“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Situation – Gedanke – Gefühl
// (zwei Filme, wie wahrscheinlich?) · alte Sätze erkennen und umbauen · Wiegt das was? (Beweis oder Lautsprecher) · Mut-Leiter. Alle Personen erfunden.
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
          { skala: 'Wie wahrscheinlich stimmt dein Gedanke?', links: '0 %', rechts: '100 %' },
          { wenn: (f) => f.film1 === 'dunkel', dann: [
            ['e', 'Film 1: Dein Gesicht wird heiß. Du nimmst das Tablett wieder. Du setzt dich allein ans Fenster. Sara winkt dir. Du siehst es nicht – oder willst es nicht sehen.'],
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
              { t: '„Was ist so lustig?“', log: 'Film 2: trotz Zweifel gefragt', folge: 'Malik zeigt dir ein Video: eine Taube klaut einem Typen die Pommes.', skill: true },
              { t: 'Trotzdem allein ans Fenster.', log: 'Film 2: trotzdem allein gesetzt', folge: 'Der dunkle Gedanke war schneller als der neue.', skill: false },
            ] },
          ], sonst: [
            ['e', 'Diesmal denkst du: „Die lachen über mich.“ Dein Gesicht wird heiß.'],
            { wahl: [
              { t: 'Prüfen: Was weiß ich sicher?', log: 'Film 2: den dunklen Gedanken geprüft und gefragt', folge: 'Malik zeigt dir ein Video: eine Taube klaut einem Typen die Pommes.', skill: true },
              { t: 'Weggehen.', log: 'Film 2: weggegangen', folge: 'Du isst allein. Der Gedanke hat gewonnen.', skill: false },
            ] },
          ] },
          { moment: 'In Wirklichkeit: Sara und Malik lachten über ein Video – eine Taube, die Pommes klaut.' },
          ['sara', '(lacht) Gerd! Die Taube von der Bushaltestelle! Die klaut jetzt auch in der Kantine.'],
          ['sara', '(grinst) Und ein bisschen über dich. Du hast Soße am Kinn.'],
          { wahl: [
            { t: '„Echt? Danke.“', log: 'Den kleinen wahren Teil mit Humor genommen', folge: 'Du wischst. Sara grinst. Malik: „Jetzt ist gut.“', skill: true },
            { t: 'Wieder heiß werden.', log: 'Beim kleinen wahren Teil wieder heiß geworden', folge: 'Dein Gesicht glüht. Malik: „Ey. War nur Soße.“', skill: null },
          ] },
          { moment: 'Der dunkle Film war zu zehn Prozent wahr – und trotzdem harmlos.' },
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
              { t: 'Zweiter Film: „Akku leer?“', log: 'Zum dunklen Gedanken einen zweiten gesucht', folge: 'Das Gefühl wird leiser. Du wartest.', skill: true },
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
            { t: '„Mein Kopf war schneller als die Wahrheit.“', log: 'Lio den eigenen Film ehrlich erklärt', folge: 'Lio: „Kenn ich. Passiert mir dauernd.“', skill: true },
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
            { t: '„Ah. Der alte Satz.“', log: 'Den alten Satz bemerkt und benannt', folge: 'Er wird nicht leiser. Aber du weißt jetzt, wer da redet.', skill: true },
            { t: '„Malik, mach du lieber.“', log: 'Dem alten Satz geglaubt und abgegeben', folge: 'Malik: „Ich kann aber nicht sägen. Das weißt du.“ Der alte Satz kostet dich gerade deine Chance.', skill: false, setze: { abgegeben: true } },
          ] },
          ['malik', 'Woher kommt eigentlich so ein Satz? Meiner heißt: „Ich bin zu blöd.“ Den hab ich aus der Grundschule.'],
          { wahl: [
            { t: 'Aus der Schule.', log: 'Herkunft des alten Satzes: Schule', privat: true },
            { t: 'Aus dem Sport.', log: 'Herkunft des alten Satzes: Sport', privat: true },
            { t: 'Aus dem Netz.', log: 'Herkunft des alten Satzes: Netz', privat: true },
            { t: 'Möchte ich nicht sagen.', log: 'Herkunft für sich behalten', privat: true },
          ], frage: 'Woher kommt dein alter Satz? (Nur für dich.)' },
          ['malik', 'Egal woher. Der ist halt hängen geblieben. Kriegt man aber auch wieder weg.'],
        ],
      },
      {
        ziel: 'In der Werkstatt: Das erste Brett ist zu kurz.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2] },
        zeilen: [
          ['e', 'Du hast falsch gemessen. Zwei Zentimeter zu kurz. (Der alte Satz, laut:) „Siehst du. Wusste ich’s doch.“'],
          { wahl: [
            { t: 'Nachmessen. Neues Brett.', log: 'Gegen-Beweis 1: Den Fehler gefunden und behoben', folge: 'Das neue Brett passt. Gegen-Beweis Nummer eins.', skill: true, setze: { beweis1: true } },
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
            { t: '„Ja. Zeigst du mir Ecken?“', log: 'Gegen-Beweis 2: Um Hilfe gebeten', folge: 'Sara zeigt dir eine Zeichnung. Zwei Dübel, Leim, fertig.', skill: true, setze: { beweis2: true } },
            { t: '„Nee, geht schon.“', log: 'Hilfe abgelehnt', folge: 'Du suchst allein. Zwanzig Minuten.', skill: false },
          ] },
          { wenn: (f) => f.beweis2, dann: [{ moment: 'Gegen-Beweis 2: Du konntest es nicht allein – und hast dir Hilfe geholt. Auch das ist Können.' }] },
          ['sara', 'Hast du auch so einen Satz? Meiner ist: „Ich muss es allen recht machen.“'],
          ['sara', 'Was würdest du mir sagen – als Freund?'],
          { wahl: [
            { t: '„Du musst nicht allen gefallen.“', log: 'Freundes-Satz für Sara gefunden: „Du musst nicht allen gefallen.“', folge: 'Sara: „Hm. Klingt netter als in meinem Kopf.“ Sie schreibt ihn über den alten.', skill: true },
            { t: '„Du bist perfekt.“', log: 'Sara einen zu groben Satz angeboten', folge: 'Sara: „Glaub ich nicht mal heute.“', skill: false },
            { t: '„Stimmt, ist anstrengend.“', log: 'Saras alten Satz bestätigt', folge: 'Sara: „Ja. Und jetzt?“', skill: null },
          ] },
          { moment: 'Für Sara fand sich ein Freundes-Satz leicht. Für sich selbst ist es schwerer.' },
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Das Regal wird gebraucht.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4], lenz: [27.2, 119.0, null, 'redet'], jade: [24.4, 120.8] },
        zeilen: [
          { wenn: (f) => f.wackelt, dann: [['lenz', 'Hm. Es wackelt. Was ist passiert?'], { wahl: [
            { t: '„Falsch gemessen. Ich mach’s neu.“', log: 'Den versteckten Fehler zugegeben', folge: 'Herr Lenz: „Das ist mehr wert als ein gerades Regal.“', skill: true, setze: { beweis1: true } },
            { t: '„Das Holz ist schlecht.“', log: 'Die Schuld aufs Holz geschoben', folge: 'Herr Lenz schaut das Holz an. Das Holz ist gut.', skill: false },
          ] }], sonst: [{ wenn: (f) => f.hingeworfen && !f.beweis1, dann: [['lenz', 'Das Regal steht. Malik hat das letzte Brett zugeschnitten. Willst du das nächste Mal selbst?']], sonst: [['lenz', 'Gerade. Stabil. Wer hat das gebaut?']] }] },
          ['jade', '(legt Decken rein) Passt alles. Endlich liegt das Zeug nicht mehr auf dem Boden.'],
          { moment: 'Gegen-Beweis 3: Das Regal wird benutzt. Jeden Kino-Abend.' },
          ['malik', 'Und? Was sagt dein alter Satz jetzt?'],
          { wahl: [
            { wenn: (f) => f.beweis1 && f.beweis2, t: '„Leiser. Drei Beweise dagegen.“', log: 'Den alten Satz mit Gegen-Beweisen geprüft', skill: true },
            { wenn: (f) => !(f.beweis1 && f.beweis2), t: '„Etwas leiser. Ein, zwei Beweise.“', log: 'Den alten Satz mit ersten Gegen-Beweisen geprüft', skill: true },
            { t: '„Er sagt: Glück gehabt.“', log: 'Die Beweise als Glück abgetan', folge: 'Malik: „Glück? Du hast gemessen, gefragt, gebaut.“', skill: false },
          ] },
          { notiz: 'Dein neuer Satz – wahr, mit etwas, das du tust:', platz: 'zum Beispiel: Ich mache Fehler und repariere sie.' },
        ],
      },
    ],
    ende: [['lenz', 'Für Leute, die bauen, obwohl ein Satz dagegen flüstert: die Werkstatt-Weste.']],
    resuemee: { frage: 'Welche alten Sätze kennen fast alle – und welche Beweise sprechen dagegen?', satz: 'Mein alter Satz flüstert … Mein Gegen-Beweis: …' },
  },

  // ---------- Stunde 3 · Beweise, bitte → Wiegt das was? (Lineal-Wippe, neu 27.11.2026) ----------
  'BEWEIS-3': {
    start: [
      ['h:Lio', 'Hab die Mathe zurück. 22 von 60. Ich bin einfach dumm. Ist so.'],
      ['e', 'Lios Satz „Ich bin dumm“ kommt auf die Wippe. Nur Beweise wiegen. Gefühle und Meinungen sind Lautsprecher: laut, aber leicht.'],
    ],
    schritte: [
      {
        ziel: 'Zum Lesesaal. Lio sitzt mit der Mathearbeit da.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { lio: [15.6, -59.6] },
        zeilen: [
          ['lio', '22 von 60. Da steht’s schwarz auf weiß.'],
          { wahl: [
            { t: 'Münze auf „dumm“', log: 'Die 22 Punkte ehrlich als Beweis gezählt – aber nur für Mathe', folge: 'Ehrlich: Das wiegt. Aber nur für Mathe – nicht für alles.', skill: true },
            { t: 'Münze auf „nicht dumm“', log: 'Die 22 Punkte schöngeredet', folge: 'Doch, sie wiegen – für Mathe. Ehrlich bleiben.', skill: false },
            { t: 'Lautsprecher', log: 'Die 22 Punkte als bloßes Gefühl abgetan', folge: 'Ein Test ist kein Gefühl. Er wiegt – für Mathe.', skill: false },
          ], frage: 'Die Mathearbeit: Wohin kommt sie?' },
          ['lio', '(leise) Letztes Mal hatte ich 15.'],
          { wahl: [
            { t: 'Münze auf „nicht dumm“', log: 'Sieben Punkte mehr als letztes Mal als Beweis gezählt', folge: 'Sieben Punkte mehr. Das wiegt – Lios Kopf lässt es nur nicht rein.', skill: true },
            { t: 'Münze auf „dumm“', log: 'Die Verbesserung gegen Lio gezählt', folge: 'Besser geworden ist kein Beweis für dumm.', skill: false },
            { t: 'Lautsprecher', log: 'Die Verbesserung als Gefühl abgetan', folge: 'Sieben Punkte sind eine Zahl, kein Gefühl.', skill: false },
          ], frage: 'Sieben Punkte mehr: Wohin?' },
          ['lio', 'Und ich fühl mich dumm. Jeden Tag.'],
          { wahl: [
            { t: 'Lautsprecher', log: '„Ich fühle mich dumm“ als Gefühl eingeordnet, nicht als Beweis', folge: 'Ein Gefühl ist echt. Aber es wiegt nichts auf der Wippe.', skill: true },
            { t: 'Münze auf „dumm“', log: 'Das Gefühl als Beweis genommen', folge: 'Dann wäre jeder dumm, der sich mal so fühlt.', skill: false },
          ], frage: 'Das Gefühl: Wohin?' },
        ],
      },
      {
        ziel: 'Zur Werkstatt. Malik kennt Lio vom Fahrradständer.', ort: 'Werkstatt', p: [-45.6, -4.6], leute: { malik: [-46.8, -3.2] },
        zeilen: [
          ['malik', 'Lio? Der repariert jedes Fahrrad im Viertel. Ohne Anleitung. Ich hab danebengestanden.'],
          { wahl: [
            { t: 'Münze auf „nicht dumm“', log: 'Die Fahrräder als Beweis gegen „dumm“ gezählt', folge: 'Das kann man sehen. Das wiegt.', skill: true, setze: { mopeds: true } },
            { t: 'Lautsprecher', log: 'Die Fahrräder als bloße Meinung abgetan', folge: 'Malik: „Ich hab danebengestanden. Das ist keine Meinung.“', skill: false },
            { t: 'Zählt nicht, kein Schulfach.', log: 'Die Fahrräder nicht gezählt', folge: 'Malik: „Ach so. Nur Schule zählt? Dann bin ich auch dumm.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zur Kantine. Frau Kremer hat beim Schulfest die Kasse geplant.', ort: 'Kantine', p: [17.2, -6.6], leute: {},
        zeilen: [
          ['kremer', 'Lio? Der durfte beim Schulfest allein an die Kasse. Drei Stunden. Kein Cent daneben. Kopfrechnen wie ein Profi.'],
          { wahl: [
            { t: 'Münze auf „nicht dumm“', log: 'Die Kasse als Beweis gegen „dumm“ – sogar fürs Rechnen – gezählt', folge: 'Sogar Rechnen. Das wiegt schwer.', skill: true, setze: { kasse: true } },
            { t: 'Lautsprecher', log: 'Die Kasse als Zufall abgetan', folge: 'Drei Stunden Zufall? Unwahrscheinlich.', skill: false },
          ] },
          { moment: 'Wendung: Lio rechnet im echten Leben fehlerfrei – nur in der Mathearbeit nicht.' },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Lios Cousin schreibt ihm gerade.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { lio: [-18.2, 43.6, null, 'handy'] },
        zeilen: [
          ['lio', '(zeigt dir das Handy) Mein Cousin: „Du checkst halt nix. War schon immer so.“'],
          { wahl: [
            { t: 'Lautsprecher', log: 'Den Spruch des Cousins als Meinung eingeordnet', folge: 'Laut. Aber leicht.', skill: true },
            { t: 'Münze auf „dumm“', log: 'Den Spruch als Beweis genommen', folge: 'Lange kennen ist kein Beweis. Es ist eine Meinung, die laut ist.', skill: false },
          ], frage: 'Der Spruch vom Cousin: Wohin?' },
          ['lio', 'Er sagt das seit ich sechs bin.'],
          { wahl: [
            { t: '„Oft gehört ist nicht wahr.“', log: 'Erklärt: oft gehört ist nicht wahr', folge: 'Lio ist still. Dann: „Krass. Stimmt.“', skill: true },
            { t: '„Dann wird schon was dran sein.“', log: 'Dem Spruch recht gegeben', folge: 'Lio steckt das Handy weg. Ganz klein.', skill: false },
          ] },
          { wahl: [
            { t: '„Mit Herrn Lenz reden? Ich komm mit.“', log: 'Lio einen Erwachsenen angeboten', folge: 'Lio: „Vielleicht. Wenn du mitkommst.“', skill: true },
            { t: 'Das Thema wechseln.', log: 'Das Thema gewechselt', skill: null },
          ], frage: 'Sowas jahrelang zu hören, tut weh. Und jetzt?' },
        ],
      },
      {
        ziel: 'Zurück zum Lesesaal: Wohin kippt die Wippe?', ort: 'Lesesaal', p: [14.0, -59.0], leute: { lio: [15.6, -59.6] },
        zeilen: [
          { moment: 'Auf der Wippe: eine Münze auf „dumm“ (Mathe), drei auf „nicht dumm“ – und zwei Lautsprecher, die nichts wiegen.' },
          ['lio', 'Und? Wohin kippt sie?'],
          { wahl: [
            { t: '„Mathe ist schwer. Dumm bist du nicht.“', log: 'Urteil: Der Satz „Ich bin dumm“ ist zu grob', skill: true },
            { t: '„Stimmt leider.“', log: 'Urteil: Der Satz stimmt', folge: 'Die Beweise sagen etwas anderes.', skill: false },
            { t: '„Stimmt nicht. Du bist ein Genie.“', log: 'Urteil: Lio ist ein Genie', folge: 'Lio: „Na ja. Das glaub ich auch nicht.“ Zu grob in die andere Richtung.', skill: false },
          ] },
          ['lio', 'Und was sag ich mir stattdessen?'],
          { wahl: [
            { t: '„Mathe fällt mir schwer. Fahrräder kann ich.“', log: 'Einen neuen Satz gebaut: wahr, aktiv, jetzt', folge: 'Lio schreibt ihn auf die Mathearbeit. Ganz oben.', skill: true },
            { t: '„Ich bin der Beste.“', log: 'Einen zu groben Satz gebaut', folge: 'Lio: „Den glaub ich mir nicht mal heute.“', skill: false },
            { t: '„Irgendwann wird’s schon.“', log: 'Einen passiven Satz gebaut', folge: 'Lio: „Und was mach ich bis irgendwann?“', skill: false },
          ] },
          ['lio', 'Darf ich dich mal was fragen? Hast du auch einen Satz, der auf die Wippe müsste?'],
          { notiz: 'Ein Gedanke über dich, den du gern mal prüfen würdest:', platz: 'zum Beispiel: Ich bin nicht gut im …', privat: true },
        ],
      },
    ],
    ende: [['lio', 'Für dich. Die Brille. Damit du immer erst die Beweise siehst.']],
    resuemee: { frage: 'Welche Sprüche fühlen sich an wie ein Beweis – sind aber nur eine Meinung?', satz: 'Ein Beweis gegen einen alten Satz von mir: …' },
  },

  // ---------- Stunde 4 · Neuer Satz, neuer Tag → Mut-Leiter (ein leichter Schritt, frei gewählt) ----------
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
          ['mia', 'Gut. Und von deiner Mut-Leiter: Welche Stufe nimmst du heute? Eine leichte.'],
          { wahl: [
            { t: 'jemanden grüßen', log: 'Stufe von der Mut-Leiter gewählt: jemanden grüßen', skill: null, setze: { schritt: 'gruessen' } },
            { t: 'etwas fragen', log: 'Stufe von der Mut-Leiter gewählt: etwas fragen', skill: null, setze: { schritt: 'fragen' } },
            { t: 'Nein sagen', log: 'Stufe von der Mut-Leiter gewählt: Nein sagen', skill: null, setze: { schritt: 'nein' } },
            { t: 'eine Idee sagen', log: 'Stufe von der Mut-Leiter gewählt: eine Idee sagen', skill: null, setze: { schritt: 'idee' } },
          ], frage: 'Deine Stufe für heute – niemand drängt dich:' },
          ['mia', 'Der Trick: Denken reicht nicht. Du musst ihn erleben.'],
          ['e', 'Dein Satz: „{f:satzText}“ Der Bus kommt nicht. Auf der Tafel steht nichts.'],
          { wahl: [
            { t: '„Fährt die 12 heute?“', log: 'Situation 1: einen Fremden gefragt', folge: '„Umleitung, zehn Minuten.“ Ein kleiner Beweis.', skill: true, setze: { gefragt: true } },
            { t: 'Still warten und hoffen.', log: 'Situation 1: still gewartet', folge: 'Zwanzig Minuten Unsicherheit.', skill: null },
          ] },
          { wenn: (f) => f.schritt === 'fragen' && f.gefragt, dann: [{ moment: 'Deine Stufe von der Mut-Leiter: gefragt. Geschafft.' }] },
        ],
      },
      {
        ziel: 'Zur Bäckerei. Rosa braucht einen Boten.', ort: 'Bäckerei', p: [0.4, 54.2], leute: {},
        zeilen: [
          { wenn: (f) => f.schritt === 'gruessen', dann: [['du', 'Morgen, Rosa!'], ['rosa', 'Oh! Morgen! Endlich mal jemand, der grüßt.'], { moment: 'Deine Stufe von der Mut-Leiter: gegrüßt. Geschafft.' }] },
          ['rosa', 'Gut, dass du da bist! Sag Frau Kremer: Lieferung Donnerstag statt Mittwoch.'],
          ['rosa', 'Grüne Kisten zurück, blaue nicht – außer die mit Aufkleber. Danke!'],
          ['e', 'Du hast die Hälfte verstanden. Hinter dir warten fünf Leute. (Der alte Satz:) „Lass. Ist doch peinlich.“ – (Dein neuer Satz:) „{f:satzText}“'],
          { wahl: [
            { t: '„Noch mal langsam, bitte?“', log: 'Situation 2: gesagt, dass ich es nicht verstanden habe', folge: 'Rosa: „Klar! Zu schnell, was?“ Sie schreibt es dir auf einen Zettel. Niemand hinter dir hat gelacht.', skill: true },
            { t: 'Nicken und gehen.', log: 'Situation 2: genickt, obwohl ich es nicht verstanden habe', folge: 'Frau Kremer bekommt die halbe Nachricht. Am Donnerstag fehlen die Kisten. Und der alte Satz hat recht behalten – scheinbar.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Zum Jugendhaus. Planung fürs Turnier.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { malik: [23.9, 119.4, null, 'redet'], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          ['e', 'Dein Satz: „{f:satzText}“'],
          ['lenz', 'Ideen fürs Turnier? Malik hat schon zehn.'],
          { wahl: [
            { t: '„Eine Runde für Anfänger!“', log: 'Situation 3: die eigene Idee gesagt', folge: 'Malik: „Nee, dauert zu lange.“ Die Idee kommt nicht durch.', skill: true, setze: { abgelehnt: true } },
            { t: 'Nichts sagen. Malik hat ja genug.', log: 'Situation 3: die Idee für sich behalten', folge: 'Niemand erfährt deine Idee.', skill: null },
          ] },
          { wenn: (f) => f.abgelehnt, dann: [
            { wenn: (f) => f.schritt === 'idee', dann: [{ moment: 'Deine Stufe von der Mut-Leiter: Idee gesagt. Geschafft – auch wenn sie abgelehnt wurde.' }] },
            { moment: 'Wendung: Deine Idee wurde abgelehnt.' },
            ['e', '(Der alte Satz, triumphierend:) „Siehst du. Hättest du mal geschwiegen.“'],
            { wahl: [
              { t: '„Abgelehnt heißt nicht falsch.“', log: 'Die Ablehnung nicht als Beweis für den alten Satz genommen', folge: 'Nach der Runde kommt Jade: „Die Runde für Neue fand ich gut. Ich wär dabei gewesen.“', skill: true },
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
            { t: '„Nee. Den ess ich selbst.“', log: 'Situation 4: freundlich Nein gesagt', folge: 'Finn: „Okay, okay.“ Kein Drama.', skill: true, setze: { neinGesagt: true } },
            { t: '„Na gut …“', log: 'Situation 4: Ja gesagt, Nein gemeint', folge: 'Finn freut sich. Du guckst ihm beim Essen zu.', skill: false },
          ] },
          { wenn: (f) => f.schritt === 'nein' && f.neinGesagt, dann: [{ moment: 'Deine Stufe von der Mut-Leiter: Nein gesagt. Geschafft.' }] },
          ['e', 'Beim Abräumen rutscht dir das Glas vom Tablett. Es zerspringt. Alle schauen.'],
          { wahl: [
            { t: '„Ups. Passiert.“ Besen holen.', log: 'Situation 5: Einen Fehler ruhig wiedergutgemacht', folge: 'Nach zehn Sekunden schaut keiner mehr. Die Frau an der Ausgabe nickt dir zu.', skill: true },
            { t: 'Rot werden, rausgehen.', log: 'Situation 5: Vor dem Fehler weggelaufen', folge: 'Draußen pocht dein Herz. Drinnen hat es längst keiner mehr im Kopf.', skill: false },
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
