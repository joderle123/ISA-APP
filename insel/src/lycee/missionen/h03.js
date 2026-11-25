// REAL TALK #03 „Druck“ – fünf Missionen (Format: kursmission.js). Skills der Stunden: Druck als Zahl messen (Thermometer,
// Grün/Gelb/Rot) · Bremse im Körper (lang ausatmen) · starke, harmlose Reize · Kopfkino: beschäftigen, beobachten,
// umschalten · Ampelplan. Der Druck steigt und fällt in den Missionen wirklich (plus/thermo). Alle Personen erfunden.
export default {
  // ---------- Stunde 1 · Die Zahl → Das Thermometer ----------
  'ZAHL-100': {
    start: [
      ['e', 'Ein ganzer Schultag. Dein Thermometer läuft mit. Bei 70 beginnt Rot – da denkt der Kopf kaum noch mit.'],
      ['e', 'Du hast schlecht geschlafen. Das Thermometer startet nicht bei 0.'],
      { setze: { druck: 30 } },
      { thermo: 'druck' },
    ],
    schritte: [
      {
        ziel: 'Morgens: zur Bäckerei. Noch zehn Minuten bis zum Bus.', ort: 'Bäckerei', p: [0.4, 54.2], leute: {},
        zeilen: [
          ['rosa', 'Guten Morgen! Ein Croissant? Du siehst aus, als bräuchtest du eins.'],
          { wahl: [
            { t: 'Etwas essen und kurz sitzen bleiben.', log: 'Morgens getankt: gegessen, kurz gesessen', folge: 'Druck sinkt um 10.', skill: true, plus: { druck: -10 } },
            { t: 'Nur schnell einen Energy-Drink.', log: 'Morgens nur einen Energy-Drink', folge: 'Kurz wach, dann zittrig: Druck steigt um 10.', skill: false, plus: { druck: 10 } },
            { t: 'Nichts. Keine Zeit.', log: 'Morgens nichts gegessen', folge: 'Der Magen knurrt bis mittags.', skill: false, plus: { druck: 5 } },
          ] },
          { thermo: 'druck' },
        ],
      },
      {
        ziel: 'Erste Stunde vorbei: Ab in die Halle.', ort: 'Halle', p: [0.0, -4.0], leute: { finn: [1.6, -4.8, null, 'redet'] },
        zeilen: [
          ['finn', 'Ey, du hast doch gestern mein Ladekabel gehabt. Wo ist es?'],
          ['e', 'Du hattest es nicht. Finn glaubt dir nicht. Zwei Leute schauen.'],
          { plus: { druck: 20 } },
          { thermo: 'druck' },
          { wahl: [
            { t: '„Ich hatte es nicht. Lass uns zusammen in der Fundkiste schauen.“', log: 'Ruhig geblieben und eine Lösung angeboten', folge: 'In der Fundkiste liegt das Kabel. Finn: „Sorry.“ Druck sinkt um 15.', skill: true, plus: { druck: -15 } },
            { t: '„Spinnst du? Ich klau nix!“', log: 'Laut zurückgeschossen', folge: 'Finn wird auch laut. Druck steigt um 15.', skill: false, plus: { druck: 15 } },
            { t: 'Wortlos weggehen.', log: 'Wortlos gegangen', folge: 'Es bleibt in dir hängen. Druck bleibt.', skill: null },
          ] },
          { thermo: 'druck' },
        ],
      },
      {
        ziel: 'Mittags: zur Kantine.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -7.4, null, 'redet'] },
        zeilen: [
          ['e', 'Lange Schlange. Sara drängelt sich vor dich. Laut, mit Tablett.'],
          { plus: { druck: 15 } },
          { thermo: 'druck' },
          { wenn: (f) => (f.druck || 0) >= 70, dann: [
            ['e', 'Du bist im Rot. Deine Hände sind Fäuste. Du merkst es fast nicht.'],
            { wahl: [
              { t: 'Erst raus aus der Schlange. Ans Fenster. Lang ausatmen.', log: 'Im Rot zuerst raus aus der Situation, dann geatmet', folge: 'Nach einer Minute bist du wieder bei Gelb. Druck sinkt um 25.', skill: true, plus: { druck: -25 } },
              { t: 'Sara das Tablett aus der Hand schlagen.', log: 'Im Rot zugeschlagen: Tablett weggeschlagen', folge: 'Nudeln auf dem Boden. Frau Kremer holt dich raus. Ein Gespräch im Sekretariat.', skill: false, setze: { ausraster: true } },
            ] },
          ], sonst: [
            { wahl: [
              { t: '„Sara, hinten ist das Ende. Ich warte auch.“ – ruhig, klar.', log: 'Bei Gelb klar und ruhig etwas gesagt', folge: 'Sara grinst schief und stellt sich hinten an. Druck sinkt um 10.', skill: true, plus: { druck: -10 } },
              { t: 'Nichts sagen, innerlich kochen.', log: 'Bei Gelb geschluckt', folge: 'Druck steigt um 10.', skill: false, plus: { druck: 10 } },
            ] },
          ] },
          { thermo: 'druck' },
        ],
      },
      {
        ziel: 'Nachmittag: Pause am Brunnen.', ort: 'Brunnen', p: [-8.0, 22.6], leute: {},
        zeilen: [
          ['e', 'Zehn Minuten Pause. Danach noch zwei Stunden.'],
          { wahl: [
            { t: 'Wasser trinken, Gesicht nass machen, einmal um den Hof gehen.', log: 'Die Pause genutzt: Wasser, Bewegung', folge: 'Druck sinkt um 15.', skill: true, plus: { druck: -15 } },
            { t: 'Zehn Minuten Streit im Chat lesen.', log: 'Die Pause mit Streit im Chat verbracht', folge: 'Druck steigt um 10.', skill: false, plus: { druck: 10 } },
            { t: 'Sich hinsetzen, Augen zu, Musik.', log: 'Die Pause mit Musik verbracht', folge: 'Druck sinkt um 10.', skill: true, plus: { druck: -10 } },
          ] },
          { thermo: 'druck' },
        ],
      },
      {
        ziel: 'Letzte Stunde: Herr Lenz will dich am Sekretariat sprechen.', ort: 'Sekretariat', p: [-21.0, -10.2], leute: { lenz: [-19.6, -10.8, null, 'redet'] },
        zeilen: [
          { wenn: (f) => f.ausraster, dann: [
            ['lenz', 'Frau Kremer hat erzählt, was in der Kantine war. Erzähl mal von deinem Tag.'],
            { moment: 'In der Kantine war dein Druck im Rot – und es ist gekracht.' },
            { wahl: [
              { t: 'Den Tag von vorn erzählen: Schlaf, Frühstück, Kabel, Schlange.', log: 'Den Tag als Kette erzählt', folge: 'Herr Lenz: „Die Schlange war nur das Letzte. Dein Druck war schon vorher hoch.“', skill: true },
              { t: '„Sara ist schuld. Punkt.“', log: 'Nur den letzten Tropfen gesehen', folge: 'Herr Lenz: „Und was war vorher?“', skill: false },
            ] },
          ], sonst: [
            ['lenz', 'Kurze Frage: Hilfst du morgen beim Aufbau fürs Turnier?'],
            { moment: 'Der Termin im Sekretariat war gar kein Ärger – nur eine Frage.' },
            ['lenz', 'Wie war dein Tag? Als Zahl.'],
          ] },
          { thermo: 'druck', text: 'Dein Druck jetzt' },
          ['lenz', 'Wo hättest du heute früher bremsen können?'],
          { wahl: [
            { t: 'Morgens: essen und schlafen.', log: 'Bremspunkt erkannt: morgens' },
            { t: 'In der Halle: beim Kabel.', log: 'Bremspunkt erkannt: Halle' },
            { t: 'In der Pause: anders nutzen.', log: 'Bremspunkt erkannt: Pause' },
            { t: 'Nirgends. Lief gut.', log: 'Den Tag als gut gebremst gesehen' },
          ] },
        ],
      },
    ],
    ende: [['lenz', 'Wer seine Zahl kennt, merkt früher, wann es Zeit zum Bremsen ist. Hier, die Sneaker – für den nächsten langen Tag.']],
    resuemee: { frage: 'Was treibt bei euch an einem normalen Tag die Zahl am meisten hoch – und wo ist die beste Pause?', satz: 'Meine Zahl steigt vor allem, wenn … Dann mache ich …' },
  },

  // ---------- Stunde 2 · Körper zuerst → Vier ein, acht aus ----------
  'ATEM-48': {
    start: [
      ['h:Sekretariat', 'Bitte heute in der Pause im Sekretariat melden. Mme Weber.'],
      ['e', 'Kein Grund. Kein Hinweis. Nur: melden.'],
      { setze: { druck: 45 } },
      { thermo: 'druck' },
    ],
    schritte: [
      {
        ziel: 'Zum Sekretariat. Davor stehen Stühle zum Warten.', ort: 'Sekretariat', p: [-21.0, -10.2], leute: { malik: [-19.6, -11.0, null, 'handy'] },
        zeilen: [
          ['e', 'Malik wartet auch. Sein Bein wippt. Dein Bein wippt auch.'],
          ['malik', 'Du auch hier? Was hast du gemacht?'],
          ['du', 'Keine Ahnung.'],
          ['malik', 'Ich auch nicht. Das ist das Schlimmste.'],
          { wahl: [
            { t: 'Im Kopf alle schlimmen Gründe durchgehen.', log: 'Im Kopf das Schlimmste ausgemalt', folge: 'Druck steigt um 20.', skill: false, plus: { druck: 20 } },
            { t: 'Am Handy scrollen, um nicht dran zu denken.', log: 'Mit dem Handy abgelenkt', folge: 'Das Bein wippt weiter. Druck bleibt.', skill: null },
            { t: 'Vier ein, acht aus. Dreimal. Mit dem Atem-Kreis.', log: 'Mit langem Ausatmen gebremst', folge: 'Das Bein wird ruhig. Druck sinkt um 20.', skill: true, plus: { druck: -20 }, setze: { geatmet: true }, dann: [{ atem: true }] },
          ], frage: 'Was machst du beim Warten?' },
          { thermo: 'druck' },
          ['malik', '(schaut auf dein Bein) Wie hast du das gemacht? Meins hört nicht auf.'],
          { wahl: [
            { t: 'Es ihm zeigen: „Vier ein, acht aus. Die Ausatmung ist doppelt so lang.“', log: 'Malik die Atem-Bremse gezeigt', folge: 'Malik atmet mit. Nach der dritten Runde lacht er kurz.', skill: true, setze: { malikAtmet: true } },
            { t: '„Musst du halt chillen.“', log: 'Malik „chill“ gesagt', folge: 'Malik: „Danke. Sehr hilfreich.“', skill: false },
          ] },
          ['weber', 'Malik? Du zuerst, bitte.'],
        ],
      },
      {
        ziel: 'Warte in der Halle, bis Malik rauskommt.', ort: 'Halle', p: [0.0, -4.0], leute: { malik: [1.6, -4.8] },
        zeilen: [
          ['malik', '(kommt raus, blass) Ich hab einen Verweis. Wegen dem Handy im Unterricht. Meine Eltern müssen unterschreiben.'],
          { moment: 'Malik kam mit einem Verweis raus – sein Druck war plötzlich bei Rot.' },
          { wenn: (f) => f.malikAtmet, dann: [['malik', '(atmet lang aus) Okay. Vier ein, acht aus. Geht schon.']], sonst: [['malik', '(schlägt gegen den Spind) Toll. Echt toll.']] },
          { wahl: [
            { t: '„Willst du kurz raus an die Luft? Ich komm mit.“', log: 'Malik angeboten, mit rauszugehen', folge: 'Malik nickt. Draußen redet er weiter.', skill: true },
            { t: '„Ach, ein Verweis ist doch nicht schlimm.“', log: 'Maliks Sorge kleingeredet', folge: 'Malik: „Für dich vielleicht nicht.“ Er dreht sich weg.', skill: false },
            { t: '„Und was passiert jetzt?“', log: 'Malik gefragt, was jetzt passiert', folge: 'Malik erklärt. Beim Erklären wird er ruhiger.', skill: null },
          ] },
          ['weber', '(von der Tür) Und jetzt du, bitte.'],
          { plus: { druck: 15 } },
          { thermo: 'druck' },
        ],
      },
      {
        ziel: 'Ins Sekretariat. Jetzt bist du dran.', ort: 'Sekretariat', p: [-21.0, -10.2], leute: {},
        zeilen: [
          ['weber', 'Setz dich. Keine Sorge. Herr Lenz hat dich vorgeschlagen.'],
          ['weber', 'Ab Montag wechselt Lio aus der Parallelklasse in eure Klasse. Du sollst ihn die erste Woche begleiten. Patenschaft.'],
          { moment: 'Die Überraschung: Du warst nicht in Ärger – du wurdest als Pate oder Patin vorgeschlagen.' },
          { wahl: [
            { t: '„Echt? Ich? Okay. Ja.“', log: 'Die Patenschaft angenommen', folge: 'Mme Weber gibt dir einen Zettel mit Lios Stundenplan.', skill: null, setze: { pate: true } },
            { t: '„Ich weiß nicht, ob ich das kann.“', log: 'Ehrlich gezögert', folge: 'Mme Weber: „Darum fragen wir dich. Du merkst, wenn es jemandem nicht gut geht.“', skill: null, setze: { pate: true } },
          ] },
          { thermo: 'druck', text: 'Dein Druck jetzt' },
          ['e', 'Falls dein Kopf vorhin schlimme Gründe gesucht hat: Keiner davon stimmte.'],
        ],
      },
      {
        ziel: 'Montag: Lio wartet in der Halle. Er ist nervös.', ort: 'Halle', p: [0.0, -4.0], leute: { lio: [1.6, -4.8, null, 'handy'] },
        zeilen: [
          ['lio', 'Hi. Du bist die Person, die mich begleitet? Ich muss gleich ins Sekretariat. Neue Klasse, neuer Plan. Mein Bein hört nicht auf.'],
          { wahl: [
            { t: '„Kenn ich. Komm, wir machen vier ein, acht aus. Zusammen.“', log: 'Lio die Atem-Bremse beigebracht', folge: 'Lio atmet mit. Nach drei Runden steht er ruhiger.', skill: true, dann: [{ atem: true }] },
            { t: '„Ist nicht schlimm da drin.“', log: 'Lio beruhigt: „nicht schlimm“', folge: 'Lio: „Sagst du so.“ Das Bein wippt weiter.', skill: false, setze: { lioOhneAtem: true } },
          ] },
          ['lio', 'Und wenn sie mich was fragen und ich weiß es nicht?'],
          { wahl: [
            { t: '„Dann sagst du: Weiß ich nicht. Kann ich nachfragen?“', log: 'Lio einen Satz für den Notfall gegeben', folge: 'Lio wiederholt den Satz zweimal.', skill: true },
            { t: '„Dann denkst du dir was aus.“', log: 'Lio geraten, sich etwas auszudenken', folge: 'Lio: „Ich kann nicht gut lügen.“', skill: false },
          ] },
        ],
      },
    ],
    ende: [{ wenn: (f) => f.lioOhneAtem, dann: [['lio', '(kommt aus dem Sekretariat) War okay. Irgendwie. (zeigt dir ein Armband) Das hab ich am Automaten gezogen. Für dich. Danke fürs Begleiten.']],
      sonst: [['lio', '(kommt aus dem Sekretariat) War okay. Ich hab geatmet. (zeigt dir ein Armband) Das hab ich am Automaten gezogen. Für dich. Danke fürs Begleiten.']] }],
    resuemee: { frage: 'Wo wartet ihr ungern – und was macht euer Körper dann?', satz: 'Wenn ich warten muss und mein Kopf das Schlimmste malt, dann …' },
  },

  // ---------- Stunde 3 · Reiz gegen Reiz → Das Notfall-Set ----------
  'KALT-30': {
    start: [
      ['h:Amira', 'Weißt du noch, das mit dem kalten Wasser? Ich stell mir jetzt ein Set für die Tasche zusammen. Machst du mit?'],
      ['e', 'Starke Reize holen dich ins Jetzt: kalt, sauer, ein Duft. Stark, aber nie schädlich.'],
    ],
    schritte: [
      {
        ziel: 'Zur Épicerie. Tante Lisette hat Sachen fürs Set.', ort: 'Épicerie', p: [40.0, 88.6], leute: { amira: [41.6, 89.4] },
        zeilen: [
          ['lisette', 'Ein Notfall-Set? Für die Tasche? Dann mal los. Drei Sachen.'],
          { wahl: [
            { t: 'Saure Bonbons', log: 'Ins Set: saure Bonbons', skill: true, setze: { sauer: true } },
            { t: 'Ein Kühlpack zum Knicken', log: 'Ins Set: Kühlpack', skill: true, setze: { kalt: true } },
            { t: 'Ein Energy-Drink', log: 'Ins Set: Energy-Drink', folge: 'Lisette: „Der macht dich nicht ruhig. Nur zittrig.“', skill: false },
          ], frage: 'Erste Sache fürs Set:' },
          { wahl: [
            { t: 'Ein Knetball', log: 'Ins Set: Knetball', skill: true, setze: { knete: true } },
            { t: 'Ein Duft, den du magst (Minz-Balsam)', log: 'Ins Set: Minz-Duft', skill: true, setze: { duft: true } },
            { t: 'Chips für den Frust', log: 'Ins Set: Chips', folge: 'Lisette: „Lecker. Aber die beruhigen nicht – die füllen nur.“', skill: false },
          ], frage: 'Zweite Sache:' },
          { wahl: [
            { t: 'Kopfhörer mit einem Lied, das runterbringt', log: 'Ins Set: ein ruhiges Lied', skill: true, setze: { musik: true } },
            { t: 'Das Handy zum Scrollen', log: 'Ins Set: Handy zum Scrollen', folge: 'Amira: „Das lenkt ab. Aber runter bringt es dich selten.“', skill: false },
            { t: 'Ein Zettel: „Wen kann ich anrufen?“ – mit 116 111 drauf', log: 'Ins Set: ein Zettel mit Nummern', skill: true, setze: { zettel: true } },
          ], frage: 'Dritte Sache:' },
          ['amira', 'Gut. Jetzt testen. Im echten Leben. Drei Mal.'],
        ],
      },
      {
        ziel: 'Test 1: Bushaltestelle. Dein Handy brummt.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: {},
        zeilen: [
          ['h:Unbekannt', 'du bist so peinlich lol'],
          ['e', 'Eine Nachricht von einer Nummer, die du nicht kennst. Dein Kopf rattert.'],
          { setze: { druck: 65 } },
          { thermo: 'druck' },
          { wahl: [
            { t: 'Ein saures Bonbon. Volle Konzentration auf die Säure.', log: 'Test 1: saures Bonbon gegen den Gedankenstrudel', folge: 'Zehn Sekunden nur sauer. Das reißt dich ins Jetzt – sauer macht eher wach als müde. Der Strudel ist weg. Druck sinkt um 20.', skill: true, plus: { druck: -20 }, wenn: (f) => f.sauer },
            { t: 'Den Knetball drücken, so fest es geht.', log: 'Test 1: Knetball', folge: 'Die Hände haben zu tun. Druck sinkt um 15.', skill: true, plus: { druck: -15 }, wenn: (f) => f.knete },
            { t: 'Das Lied hören, Augen zu.', log: 'Test 1: Lied', folge: 'Drei Minuten, dann ist es leiser. Druck sinkt um 15.', skill: true, plus: { druck: -15 }, wenn: (f) => f.musik },
            { t: 'Vier ein, acht aus. Dreimal.', log: 'Test 1: lang ausgeatmet', folge: 'Beim dritten Mal wird der Bauch weicher. Druck sinkt um 15.', skill: true, plus: { druck: -15 } },
            { t: 'Den Zettel rausholen und Amira schreiben.', log: 'Test 1: jemandem geschrieben', folge: 'Amira: „Blockier die Nummer. Ich bin da.“ Druck sinkt um 15.', skill: true, plus: { druck: -15 }, wenn: (f) => f.zettel },
            { t: 'Zurückschreiben: „Wer bist du überhaupt?!“', log: 'Test 1: zurückgeschrieben', folge: 'Keine Antwort. Du starrst aufs Handy. Druck steigt.', skill: false, plus: { druck: 10 } },
          ], frage: 'Was nimmst du aus dem Set?' },
          { thermo: 'druck' },
          { wahl: [
            { t: 'Die Nummer blockieren und einen Screenshot machen.', log: 'Die Nummer blockiert, Beweis gesichert', folge: 'Ruhe. Und ein Beweis. Wenn es weitergeht: einer erwachsenen Person zeigen oder BEE SECURE anrufen (8002 1234).', skill: true },
            { t: 'Die Nachricht immer wieder lesen.', log: 'Die Nachricht immer wieder gelesen', folge: 'Jedes Mal ein kleiner Stich.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Test 2: Brunnen auf dem Schulhof. Amira wartet.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { amira: [-6.4, 22.9] },
        zeilen: [
          ['amira', 'Ich zeig dir meinen. Hände unters kalte Wasser. Zählen bis zwanzig.'],
          { wahl: [
            { t: 'Mitmachen. Hände ins kalte Wasser, zählen.', log: 'Test 2: kaltes Wasser ausprobiert', folge: 'Bei zwölf ist der Kopf ganz im Jetzt.', skill: true },
            { t: '„Nee, ist mir zu kalt.“', log: 'Test 2: kaltes Wasser abgelehnt', folge: 'Amira: „Genau darum wirkt es.“', skill: null },
          ] },
          ['amira', 'Jemand hat mir mal gesagt, ich soll mir selbst wehtun, wenn es zu viel wird. Damit es aufhört.'],
          { wahl: [
            { t: '„Wehtun ist kein Trick. Kalt, sauer, ein Duft – stark, aber harmlos. Und wenn es oft zu viel ist: Sag’s einer erwachsenen Person.“', log: 'Klar gesagt: Wehtun ist keine Hilfe – Hilfe holen schon', folge: 'Amira: „Hab ich auch gedacht. Gut, dass du’s sagst.“', skill: true },
            { t: '„Wenn’s hilft …“', log: 'Sich-wehtun durchgehen lassen', folge: 'Amira schaut dich unsicher an.', skill: false, privat: true, dann: [['amira', 'Echt? … Ich weiß nicht.'], ['e', 'Sich wehtun hilft nie. Es macht alles schwerer. Hilfe gibt es: 116 111, kostenlos und anonym.']] },
          ] },
          ['e', 'Wenn du dir selbst wehtun willst: Sag es einer erwachsenen Person, der du vertraust. Oder ruf 116 111 an – kostenlos und anonym.'],
        ],
      },
      {
        ziel: 'Test 3: Kantine. Es ist laut. Sehr laut.', ort: 'Kantine', p: [17.2, -6.6], leute: { amira: [18.8, -7.4] },
        zeilen: [
          ['e', 'Tabletts knallen. Jemand schreit. Musik aus einem Handy. Alles auf einmal.'],
          { setze: { druck: 60 } },
          { thermo: 'druck', text: 'Dein Druck in der Kantine' },
          { wahl: [
            { t: '5-4-3-2-1: fünf Dinge sehen, vier spüren, drei hören …', log: 'Test 3: 5-4-3-2-1 gemacht', folge: 'Nach der Fünf bist du wieder bei dir. Druck sinkt um 20.', skill: true, plus: { druck: -20 } },
            { t: 'Den Minz-Duft riechen, langsam.', log: 'Test 3: Duft aus dem Set', folge: 'Der Duft schiebt den Lärm ein Stück weg. Druck sinkt um 15.', skill: true, plus: { druck: -15 }, wenn: (f) => f.duft },
            { t: 'Das Kühlpack knicken, in den Nacken.', log: 'Test 3: Kühlpack', folge: 'Kälte im Nacken. Der Lärm ist weiter da – aber weiter weg. Druck sinkt um 20.', skill: true, plus: { druck: -20 }, wenn: (f) => f.kalt },
            { t: 'Lauter reden als alle.', log: 'Test 3: gegen den Lärm angeschrien', folge: 'Jetzt ist es noch lauter. Druck steigt.', skill: false, plus: { druck: 10 } },
          ] },
          { thermo: 'druck' },
          ['amira', 'Und? Was kommt in dein Set für immer?'],
          { notiz: 'Was kommt in dein echtes Notfall-Set?', platz: 'zum Beispiel: saure Bonbons, Kühlpack, ein Lied …' },
        ],
      },
    ],
    ende: [['amira', 'Hier. Ein Täschchen dafür. Damit es nicht in der Hosentasche zerbröselt.']],
    resuemee: { frage: 'Was bringt euch schnell runter – und was davon ist stark, aber harmlos?', satz: 'In mein Notfall-Set kommt …' },
  },

  // ---------- Stunde 4 · Kopfkino → Gedanken-Schiffe ----------
  'SCHIFF-7': {
    start: [
      ['e', '23:40 Uhr. Dein Handy leuchtet.'],
      ['h:Mia', 'Schläfst du schon? Ich kann nicht. Morgen muss ich vor der Klasse reden. Mein Kopf hört nicht auf.'],
    ],
    schritte: [
      {
        ziel: 'Nachts am Handy: Mia antworten.', ort: 'Nachts', p: null, leute: {},
        zeilen: [
          ['h:Mia', 'Ich denk immer: Ich verhaspel mich. Alle lachen. Ich werd rot. Und dann noch mal von vorn.'],
          { wahl: [
            { t: '„Denk einfach nicht dran.“', log: 'Mia geraten, nicht dran zu denken', folge: 'Mia: „Jetzt denk ich NUR noch dran.“', skill: false },
            { t: '„Gib deinem Kopf einen Job: zu jedem Buchstaben ein Tier. A wie Affe …“', log: 'Weg 1 vorgeschlagen: den Kopf beschäftigen', folge: 'Mia: „B wie Biber … C wie … Chamäleon.“ Zehn Minuten später: „Bin müde.“', skill: true, setze: { weg: 'beschaeftigen' } },
            { t: '„Stell dir vor, jeder Gedanke ist ein Schiff. Du schaust nur zu.“', log: 'Weg 2 vorgeschlagen: Gedanken beobachten', folge: 'Mia: „Da fährt das Lach-Schiff. Ich steig nicht ein.“', skill: true, setze: { weg: 'beobachten' } },
            { t: '„Geh in Gedanken an deinen Ort. Wo ist es ruhig?“', log: 'Weg 3 vorgeschlagen: umschalten zum ruhigen Ort', folge: 'Mia: „Am Weiher. Bei den Enten.“ Dann nichts mehr. Sie schläft.', skill: true, setze: { weg: 'umschalten' } },
          ] },
          { wenn: (f) => !f.weg, dann: [['h:Mia', 'Okay vergiss es. Gute Nacht.'], { moment: 'Mia hat die halbe Nacht wachgelegen.' }, { setze: { miaWach: true } }] },
        ],
      },
      {
        ziel: 'Morgens: zum Innenhof. Mia sitzt bei der Linde.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { mia: [-22.6, -39.0] },
        zeilen: [
          { wenn: (f) => f.miaWach, dann: [['mia', '(gähnt) Drei Stunden geschlafen. Super Voraussetzung.']], sonst: [['mia', 'Hat irgendwie geklappt. Fünf Stunden Schlaf. Besser als nix.']] },
          { wenn: (f) => f.weg === 'beobachten', dann: [['mia', 'Zeig mir das mit den Schiffen noch mal. Richtig. Bevor ich reinmuss.']], sonst: [['mia', 'Kennst du noch einen Trick? Irgendwas mit Schiffen hab ich mal gehört. Zeig mal.']] },
          ['e', 'Ihr sitzt auf der Bank. Mia sagt laut, was kommt. Du sagst: „Schiff.“'],
          ['mia', 'Gedanke: „Ich verhaspel mich.“'],
          { wahl: [
            { t: '„Schiff. Lass es vorbeifahren.“', log: 'Den Gedanken vorbeifahren lassen', skill: true },
            { t: '„Stimmt doch gar nicht!“', log: 'Mit dem Gedanken diskutiert', folge: 'Mia: „Doch, kann passieren!“ Jetzt streitet ihr über den Gedanken.', skill: false },
          ] },
          ['mia', 'Gedanke: „Alle lachen.“'],
          { wahl: [
            { t: '„Schiff.“', log: 'Noch einen Gedanken vorbeifahren lassen', skill: true },
            { t: '„Und wenn schon, lach halt mit.“', log: 'Den Gedanken weggeredet', folge: 'Mia verdreht die Augen.', skill: false },
          ] },
          ['mia', '… Gedanke: „Ich schaff das vielleicht.“ Den behalt ich.'],
          { moment: 'Zwischen den Angst-Schiffen kam ein anderer Gedanke vorbei: „Ich schaff das vielleicht.“' },
        ],
      },
      {
        ziel: 'Zum Lesesaal. Mias Referat beginnt gleich.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { mia: [15.6, -59.6, null, 'redet'] },
        zeilen: [
          ['e', 'Mia steht vorn. Nach dem zweiten Satz verhaspelt sie sich. Jemand kichert.'],
          ['e', 'Sie schaut zu dir.'],
          { wahl: [
            { t: 'Ruhig nicken. Mit der Hand ein kleines Schiff machen.', log: 'Mia still an die Schiffe erinnert', folge: 'Mia lächelt kurz, atmet aus und macht weiter.', skill: true, setze: { referat: 'gut' } },
            { t: 'Zum Kichernden: „Halt die Klappe!“', log: 'Laut gegen den Kichernden geworden', folge: 'Jetzt schauen alle zu euch. Mia verliert den Faden ganz.', skill: false, setze: { referat: 'schwer' } },
            { t: 'Wegschauen, damit sie sich nicht beobachtet fühlt.', log: 'Weggeschaut', folge: 'Mia sucht deinen Blick. Findet ihn nicht. Sie liest schneller.', skill: null, setze: { referat: 'schnell' } },
          ] },
          { wenn: (f) => f.referat === 'gut', dann: [{ moment: 'Mia hat sich verhaspelt – und trotzdem zu Ende geredet.' }] },
        ],
      },
      {
        ziel: 'Abends: dein eigenes Kopfkino.', ort: 'Abends', p: null, leute: {},
        zeilen: [
          ['e', 'Abends, im Bett. Jetzt läuft dein Film. Ein Gedanke von heute kommt wieder und wieder.'],
          { wahl: [
            { t: 'Beschäftigen: ein ABC mit Tieren.', log: 'Eigenes Kopfkino: beschäftigen probiert' },
            { t: 'Beobachten: Schiffe vorbeifahren lassen.', log: 'Eigenes Kopfkino: beobachten probiert' },
            { t: 'Umschalten: an meinen ruhigen Ort.', log: 'Eigenes Kopfkino: umschalten probiert' },
            { t: 'Weiterdrehen lassen.', log: 'Eigenes Kopfkino: weiterlaufen lassen' },
          ], frage: 'Was probierst du?' },
          { notiz: 'Welcher Weg passt am besten zu dir – und warum?', platz: 'Bei mir passt … weil …' },
          ['h:Mia', 'Danke für heute. Gute Nacht. ⛵'],
        ],
      },
    ],
    ende: [['e', 'Am nächsten Morgen liegt etwas in deinem Spind: ein Hut aus Papier, gefaltet wie ein Schiff. Von Mia.']],
    resuemee: { frage: 'Was dreht bei euch nachts im Kopf – und welcher der drei Wege hilft wem?', satz: 'Wenn mein Kopfkino läuft, probiere ich …' },
  },

  // ---------- Stunde 5 · Dein Plan → Dein Ampelplan ----------
  'AMPEL-3': {
    start: [
      ['h:Finn', 'Du, ich hab jetzt einen Plan. Für wenn’s brennt. Grün, Gelb, Rot. Willst du auch einen? Wir testen drei Tage.'],
      ['e', 'Ein Plan, gemacht bei Grün. Damit er bei Rot schon da ist.'],
    ],
    schritte: [
      {
        ziel: 'Zum Jugendhaus. Finn zeigt dir seinen Plan.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { finn: [23.9, 119.4] },
        zeilen: [
          ['finn', 'Erst du. Woran merkst du, dass du bei Gelb bist?'],
          { wahl: [
            { t: 'Ich werde still.', log: 'Eigenes Gelb-Signal: still werden', setze: { gelb: 'still' } },
            { t: 'Ich werde laut und schnell.', log: 'Eigenes Gelb-Signal: laut werden', setze: { gelb: 'laut' } },
            { t: 'Mein Bauch zieht sich zusammen.', log: 'Eigenes Gelb-Signal: Bauch', setze: { gelb: 'bauch' } },
            { t: 'Ich will nur noch weg.', log: 'Eigenes Gelb-Signal: weg wollen', setze: { gelb: 'weg' } },
          ], frage: 'Dein Gelb-Signal:' },
          { wahl: [
            { t: 'Vier ein, acht aus.', log: 'Gelb-Skill gewählt: Atmen', setze: { skill: 'atmen' } },
            { t: 'Etwas Saures oder Kaltes.', log: 'Gelb-Skill gewählt: starker Reiz', setze: { skill: 'reiz' } },
            { t: 'Fünf Minuten raus.', log: 'Gelb-Skill gewählt: rausgehen', setze: { skill: 'raus' } },
            { t: 'Fäuste ballen, loslassen.', log: 'Gelb-Skill gewählt: anspannen und loslassen', setze: { skill: 'anspannen' } },
          ], frage: 'Dein Skill bei Gelb:' },
          { wahl: [
            { t: 'Herr Lenz', log: 'Rot-Person: Herr Lenz', setze: { rotPerson: 'Herrn Lenz' } },
            { t: 'Herr Kuedes (SePAS)', log: 'Rot-Person: Herr Kuedes', setze: { rotPerson: 'Herrn Kuedes' } },
            { t: 'Ein Freund oder eine Freundin', log: 'Rot-Person: Freund oder Freundin', setze: { rotPerson: 'meinem Freund oder meiner Freundin' } },
            { t: 'Telefon 116 111 (kostenlos, anonym)', log: 'Rot-Person: Telefon 116 111', setze: { rotPerson: 'Herrn Lenz, und ich ruf später 116 111 an' } },
            { t: 'Jemand anderes', log: 'Rot-Person: jemand anderes', setze: { rotPerson: 'jemandem, dem ich vertraue' } },
          ], frage: 'Bei Rot gehst du zu:' },
          ['finn', 'Gut. Und bei Grün? Was füllt dich auf?'],
          { notiz: 'Was füllt dich bei Grün auf?', platz: 'zum Beispiel: Sport, Schlaf, Leute …' },
        ],
      },
      {
        ziel: 'Tag 1 (Grün): zum Skatepark im Dorf. Einfach so.', ort: 'Skatepark', p: [90.0, 80.0], leute: { finn: [91.6, 81.0] },
        zeilen: [
          ['finn', 'Grün-Tag. Nichts los. Was machen wir?'],
          { wahl: [
            { t: 'Skaten bis die Beine brennen, dann Eis.', log: 'Bei Grün aufgetankt: Bewegung und etwas Schönes', folge: 'Ein guter Tag. Der Tank ist voll.', skill: true, setze: { gruenVoll: true } },
            { t: 'Zu Hause zocken bis zwei Uhr nachts.', log: 'Bei Grün lange wach geblieben', folge: 'Spaß – und morgen wenig Schlaf.', skill: false, setze: { gruenVoll: false } },
          ] },
          ['finn', 'Grün ist langweilig. Aber Grün ist, wo man auftankt.'],
        ],
      },
      {
        ziel: 'Tag 2 (Gelb): Kantine. Jemand macht einen Spruch.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -7.4, null, 'redet'], finn: [16.2, -5.0] },
        zeilen: [
          ['sara', '(laut, zu allen) Schaut mal, wer da kommt. Mit Plan und allem.'],
          { wenn: (f) => f.gruenVoll === false, dann: [['e', 'Du hast vier Stunden geschlafen. Der Spruch trifft härter als sonst.']] },
          { wenn: (f) => f.gelb === 'still', dann: [['e', 'Du wirst still. Dein Gelb-Signal.']] },
          { wenn: (f) => f.gelb === 'laut', dann: [['e', 'Deine Stimme wird schneller. Dein Gelb-Signal.']] },
          { wenn: (f) => f.gelb === 'bauch', dann: [['e', 'Dein Bauch zieht sich zusammen. Dein Gelb-Signal.']] },
          { wenn: (f) => f.gelb === 'weg', dann: [['e', 'Du willst nur noch raus. Dein Gelb-Signal.']] },
          { wahl: [
            { t: 'Den eigenen Gelb-Skill machen – genau den aus dem Plan.', log: 'Bei Gelb den eigenen Plan benutzt', folge: 'Du bleibst bei Gelb. Sara verliert das Interesse.', skill: true },
            { t: 'Einen härteren Spruch zurück.', log: 'Bei Gelb zurückgeschossen', folge: 'Jetzt lachen alle über Sara. Sie wird rot – und wartet auf ihre Chance.', skill: false, setze: { saraSauer: true } },
            { t: 'Ignorieren und weiter essen.', log: 'Bei Gelb ignoriert', folge: 'Es geht. Diesmal.', skill: null },
          ] },
          { wenn: (f) => f.saraSauer, dann: [['finn', '(leise) Das war jetzt nicht der Plan, oder?']], sonst: [['finn', '(leise) Hab’s gesehen. Plan läuft.']] },
        ],
      },
      {
        ziel: 'Tag 3 (Rot): hinter der Turnhalle. Finn schreibt: „Komm schnell.“', ort: 'Hinter der Turnhalle', p: [60.0, -14.4], leute: { finn: [61.6, -13.4, null, 'redet'], malik: [61.2, -15.8, null, 'redet'], sara: [59.0, -15.6] },
        zeilen: [
          { moment: 'Am dritten Tag stand es auf Rot – genau dafür war der Plan.' },
          { wenn: (f) => f.saraSauer, dann: [
            ['sara', '(kommt auf dich zu) Gestern hast du mich vor allen fertiggemacht. Jetzt bin ich dran.'],
            { wahl: [
              { t: 'Rot-Plan: „Ich geh jetzt zu {f:rotPerson}. Komm mit, dann klären wir das.“', log: 'Bei Rot raus aus der Situation und zur Rot-Person', folge: 'Sara bleibt stehen. Dann kommt sie mit. Keiner schlägt.', skill: true },
              { t: '„Komm doch!“', log: 'Bei Rot zurückgedroht', folge: 'Sara schubst dich. Herr Lenz kommt von selbst.', skill: false },
              { t: 'Wortlos weggehen.', log: 'Bei Rot einfach gegangen', folge: 'Es ist vorbei – für heute. Geklärt ist nichts.', skill: null },
            ] },
          ], sonst: [
            ['malik', 'Finn hat mein Handy runtergeworfen. Display kaputt!'], ['finn', 'War keine Absicht! Ey, ich bin bei 90!'],
            { wahl: [
              { t: 'Rot-Plan: „Wir gehen jetzt. Beide. Zu {f:rotPerson}.“', log: 'Bei Rot raus aus der Situation und zur Rot-Person', folge: 'Ihr redet in Ruhe. Das Handy wird über die Versicherung geklärt. Keiner schlägt.', skill: true },
              { t: 'Zwischen die beiden stellen und laut werden.', log: 'Bei Rot dazwischen gegangen und laut geworden', folge: 'Malik schubst. Finn schubst zurück. Herr Lenz kommt von selbst.', skill: false },
              { t: 'Mit Finn reden, bis er ruhig ist.', log: 'Bei Rot mit Finn diskutiert', folge: 'Finn hört nichts. Bei Rot hört der Kopf nicht zu.', skill: false },
            ] },
          ] },
          ['finn', '(später) Bei Rot denkt keiner. Darum war der Plan vorher da.'],
          { skala: 'Wie gut passt dein Plan zu dir?', links: 'gar nicht', rechts: 'genau' },
        ],
      },
    ],
    ende: [['finn', 'Ampel-Sneaker. Für alle, die einen Plan haben. Steht dir.']],
    resuemee: { frage: 'Was steht in euren Ampelplänen bei Rot – und wer ist eure Person?', satz: 'Mein Ampelplan: Bei Gelb … Bei Rot …' },
  },
};
