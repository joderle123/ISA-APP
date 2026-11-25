// REAL TALK #08 „Akku“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Schlaf (innere Uhr geht in der Pubertät
// später, acht bis zehn Stunden, Mythen und echte Tipps) · Tank (leerer Tank macht gereizt, Wasser, Essen, kurz raus) ·
// Rückblick (Veränderung ist leise, Rückschläge gehören dazu, stark heißt nicht hart) · Abschied (darf wehtun, Stärken-Post
// annehmen, Brief an mich). Kein Essen wird schlechtgeredet, kein Körper bewertet. Alle Personen erfunden. Hilfe: 116 111.
export default {
  // ---------- Stunde 1 · Nachtmodus → Acht Stunden ----------
  'NACHT-8': {
    start: [
      ['e', 'Eine Woche, vier Abende. Am Freitag schreibst du einen Test bei Frau Hoss. Dein Ziel: an dem Morgen wach sein.'],
      ['e', 'In deinem Alter geht die innere Uhr später. Abends bist du länger wach, morgens länger müde. Das ist Biologie – keine Faulheit. Aber du kannst ihr helfen.'],
      { setze: { akku: 55 } },
      { thermo: 'akku', text: 'Dein Schlaf-Akku', voll: true },
    ],
    schritte: [
      {
        ziel: 'Montag, 22:30. Zu Hause im Bett.', ort: 'Zu Hause', p: null, leute: {},
        zeilen: [
          ['e', 'Licht aus. Du bist hellwach. Das Handy liegt neben dem Kissen.'],
          { wahl: [
            { t: 'Ein bisschen scrollen. Das macht müde.', log: 'Mythos geglaubt: Handy im Bett macht müde', folge: 'Um 0:40 schaust du noch Clips. Das Licht und die Clips halten den Kopf wach.', skill: false, plus: { akku: -20 } },
            { t: 'Handy auf den Schreibtisch. Ein Hörbuch, leise.', log: 'Handy weggelegt, ruhiges Hörbuch', folge: 'Nach einer halben Stunde bist du weg.', skill: true, plus: { akku: 10 } },
            { t: 'Auf die Uhr schauen und rechnen: „Noch sieben Stunden … noch sechs …“', log: 'Mythos: auf die Uhr schauen und rechnen', folge: 'Mit jeder Rechnung wirst du wacher.', skill: false, plus: { akku: -10 } },
          ], frage: 'Was machst du?' },
          ['h:Amira', 'kannst du auch nicht schlafen? 😩 (1:50)'],
          { wenn: (f) => (f.akku || 0) >= 50, dann: [['e', 'Du schläfst schon. Die Nachricht liest du erst morgens.']], sonst: [
            { wahl: [
              { t: 'Zurückschreiben. Eine Stunde lang.', log: 'Nachts eine Stunde mit Amira geschrieben', folge: 'Ihr seid beide um drei noch wach.', skill: false, plus: { akku: -15 } },
              { t: '„Gute Nacht 🌙 Morgen reden.“ – Handy weg.', log: 'Nachts kurz geantwortet und das Handy weggelegt', folge: 'Amira schickt ein Herz.', skill: true },
            ] },
          ] },
          { thermo: 'akku', text: 'Dein Schlaf-Akku', voll: true },
        ],
      },
      {
        ziel: 'Dienstag, 7:40. Zur Bushaltestelle.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { amira: [-18.2, 43.4], malik: [-21.0, 42.2, null, 'redet'] },
        zeilen: [
          ['amira', 'Ich lag um zehn im Bett. Eingeschlafen bin ich um zwei. Ich bin so kaputt.'],
          ['malik', '(hält zwei Dosen hoch) Energy! Macht wach. Eine für dich?'],
          { wahl: [
            { t: 'Nehmen. Ich brauch das heute.', log: 'Energy-Drink statt Schlaf: hilft kurz, kostet die nächste Nacht', folge: 'Um neun Rakete. Um elf zittrig. Abends bist du wieder hellwach.', skill: false, plus: { akku: -15 } },
            { t: '„Nee. Ich geh lieber ein Stück draußen bis zur Schule.“', log: 'Morgenlicht statt Energy-Drink', folge: 'Das Licht draußen stellt die innere Uhr ein Stück nach vorn. Abends wirst du früher müde.', skill: true, plus: { akku: 10 } },
          ] },
          ['nik', 'Ich geh jeden Morgen eine Runde. Siebzig Jahre lang. Das Licht weckt besser als jede Dose.'],
          { wahl: [
            { t: 'Licht am Morgen, draußen.', log: 'Gewusst: Morgenlicht stellt die innere Uhr vor', skill: true },
            { t: 'Ein Energy-Drink am Nachmittag.', log: 'Gedacht: Energy-Drink stellt die Uhr vor', skill: false },
            { t: 'Am Wochenende bis mittags schlafen.', log: 'Gedacht: Ausschlafen stellt die Uhr vor', skill: false },
          ], frage: 'Was hilft deiner inneren Uhr wirklich?' },
          ['amira', 'Was soll ich heute Abend anders machen?'],
          { wahl: [
            { t: '„Handy raus aus dem Bett. Und ab einer Stunde vorher kein Bildschirm.“', log: 'Amira einen echten Schlaf-Tipp gegeben', folge: 'Amira: „Probier ich. Schreibst du mir dann nicht nach zehn?“', skill: true },
            { t: '„Nimm halt auch einen Energy.“', log: 'Amira einen Mythos empfohlen', folge: 'Amira nimmt Maliks zweite Dose.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Mittwoch, 16:00. Korbfeld mit Lio.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.2, 21.4, null, 'redet'] },
        zeilen: [
          ['e', 'Eine Stunde Basketball. Bewegung am Nachmittag macht abends müde – im guten Sinn.'],
          { plus: { akku: 10 } },
          ['lio', 'Heute Abend Online-Turnier. Bis Mitternacht oder so. Bist du dabei?'],
          { wahl: [
            { t: '„Bis halb zehn. Dann bin ich raus – egal wie es steht.“', log: 'Zusage mit fester Grenze: bis 21:30', folge: 'Lio: „Deal. Ich sag den anderen, dass du um halb zehn gehst.“', skill: true },
            { t: '„Klar, bis zum Ende!“', log: 'Bis Mitternacht gezockt', folge: 'Ihr gewinnt um 0:15. Einschlafen kannst du erst um eins.', skill: false, plus: { akku: -25 } },
            { t: '„Heute nicht.“', log: 'Das Turnier abgesagt', folge: 'Lio: „Schade. Nächstes Mal.“', skill: null },
          ] },
          { thermo: 'akku', text: 'Dein Schlaf-Akku', voll: true },
        ],
      },
      {
        ziel: 'Donnerstag. Zum Lesesaal.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { sara: [15.4, -58.4], chloe: [12.6, -58.0] },
        zeilen: [
          ['e', 'Sara liegt mit dem Kopf auf dem Tisch. Chloé fragt sie nach einem Stift. Sara fährt sie an: „Lass mich!“'],
          ['sara', '(später) Sorry. Ich brauch eigentlich nur fünf Stunden Schlaf. Echt.'],
          { wahl: [
            { t: '„Ich hab gelernt: In unserem Alter braucht man eher neun Stunden. Mit wenig Schlaf ist man schneller gereizt – geht mir auch so.“', log: 'Sara den Mythos „fünf Stunden reichen“ erklärt', folge: 'Sara: „… Okay. Das mit Chloé war echt nicht nötig.“', skill: true },
            { t: '„Dann ist ja gut.“', log: 'Den Mythos „fünf Stunden reichen“ stehen lassen', skill: null },
          ] },
          ['sara', 'Ich kann nicht schlafen, weil mein Kopf nicht aufhört. Alles für morgen. Alles von heute.'],
          { wahl: [
            { t: '„Schreib vor dem Schlafen alles auf einen Zettel. Dann muss der Kopf es nicht festhalten.“', log: 'Sara den Kopf-leeren-Zettel vorgeschlagen', folge: 'Sara reißt schon ein Blatt aus dem Heft.', skill: true },
            { t: '„Denk einfach nicht dran.“', log: '„Denk nicht dran“ geraten', folge: 'Sara: „Wenn das so einfach wär.“', skill: false },
          ] },
          { wahl: [
            { t: 'Stimmt nicht. Danach bist du Sonntagabend nicht müde – und Montag kaputt.', log: 'Mythos erkannt: Wochenende holt nicht alles nach', skill: true },
            { t: 'Stimmt. Danach ist alles wieder voll.', log: 'Mythos geglaubt: Wochenende holt alles nach', skill: false },
          ], frage: 'Chloé sagt: „Am Wochenende bis 13 Uhr schlafen holt alles nach.“ Stimmt das?' },
        ],
      },
      {
        ziel: 'Freitag. Test bei Frau Hoss in der Aula.', ort: 'Aula', p: [-14.0, -57.0], leute: { amira: [-12.6, -56.4] },
        zeilen: [
          ['e', 'Freitagmorgen.'],
          { thermo: 'akku', text: 'Dein Schlaf-Akku', voll: true },
          { wenn: (f) => (f.akku || 0) >= 50, dann: [
            ['e', 'Du liest die erste Aufgabe. Und weißt, was zu tun ist. Bei der dritten stockst du – aber du kommst drauf.'],
            { moment: 'Am Freitag war dein Kopf wach. Die Woche hat sich ausgezahlt.' },
          ], sonst: [
            ['e', 'Du liest die erste Aufgabe dreimal. Die Zahlen verschwimmen. Was du am Mittwoch noch konntest, ist weg.'],
            { moment: 'Am Freitag war der Akku leer. Gelernt hattest du – aber der Kopf kam nicht dran.' },
          ] },
          ['amira', '(nach dem Test) Ich hab’s mit dem Handy auf dem Schreibtisch probiert. Drei Nächte. Ich war um elf weg. Echt jetzt.'],
          { skala: 'Wie viele Stunden schläfst du in einer normalen Schulnacht – ungefähr?', links: '0', rechts: '10' },
          { notiz: 'Ein Schritt für deinen Abend, ab heute:', platz: 'Ab … Uhr liegt mein Handy …' },
        ],
      },
    ],
    ende: [['e', 'Auf deinem Platz in der Aula liegt eine lila Beanie. Auf dem Zettel: „Nachtmodus an. – Frau Hoss“']],
    resuemee: { frage: 'Welcher Schlaf-Mythos hält sich bei euch am hartnäckigsten – und welcher Tipp war für euch neu?', satz: 'Mein Schritt für den Abend: …' },
  },

  // ---------- Stunde 2 · Treibstoff ----------
  'FUTTER-2': {
    start: [
      ['h:Frau Brandt', 'Samstag: Turniertag! Erstes Spiel 10 Uhr, Finale 15 Uhr. Kommt mit vollem Tank.'],
      ['e', 'Dein Tank steht für Energie: Essen, Trinken, Pausen. Ist er leer, wirst du schneller gereizt – auch wenn du es selbst nicht merkst.'],
      { setze: { tank: 40 } },
      { thermo: 'tank', text: 'Dein Tank', voll: true },
    ],
    schritte: [
      {
        ziel: 'Morgens zur Bäckerei.', ort: 'Bäckerei', p: [0.4, 54.2], leute: {},
        zeilen: [
          ['rosa', 'Turniertag? Dann nimm was, das lange hält.'],
          { wahl: [
            { t: 'Ein Käsebrot, einen Apfel und Wasser.', log: 'Frühstück, das lange hält: Brot, Obst, Wasser', folge: 'Satt, aber nicht schwer.', skill: true, plus: { tank: 35 } },
            { t: 'Ein Croissant und einen Kakao.', log: 'Croissant und Kakao', folge: 'Lecker. Hält bis zum ersten Spiel.', skill: null, plus: { tank: 20 } },
            { t: 'Zwei Energy-Drinks.', log: 'Zwei Energy-Drinks statt Frühstück', folge: 'Erst Rakete. Um zehn der Absturz.', skill: false, plus: { tank: 5 }, setze: { energy: true } },
            { t: 'Nichts. Keine Zeit.', log: 'Ohne Frühstück los', folge: 'Der Magen knurrt schon an der Ecke.', skill: false },
          ], frage: 'Dein Frühstück?' },
          { thermo: 'tank', text: 'Dein Tank', voll: true },
        ],
      },
      {
        ziel: 'Zum Brunnen auf dem Schulhof. Flasche auffüllen?', ort: 'Brunnen', p: [-8.0, 22.6], leute: { finn: [-6.6, 23.2] },
        zeilen: [
          ['finn', 'Wasser? Brauch ich nicht. Ich hab drei Energy dabei.'],
          ['e', 'Beim Sport schwitzt du Wasser aus. Wer trinkt, bleibt länger klar im Kopf.'],
          { wahl: [
            { t: 'Flasche voll machen.', log: 'Die Wasserflasche aufgefüllt', folge: 'Ein Liter dabei.', skill: true, plus: { tank: 10 }, setze: { wasser: true } },
            { t: 'Lass mal. Gibt sicher was am Platz.', log: 'Kein Wasser mitgenommen', folge: 'Am Platz gibt es nur einen Automaten. Kaputt.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Erstes Spiel: zum Stade.', ort: 'Stade', p: [-77.6, -6.0], leute: { brandt: [-76.0, -5.0, null, 'redet'], malik: [-79.0, -4.6, null, 'redet'], finn: [-78.6, -7.6] },
        zeilen: [
          ['e', 'Zwanzig Minuten volle Pulle. Ihr gewinnt 2:1.'],
          { plus: { tank: -35 } },
          { thermo: 'tank', text: 'Dein Tank', voll: true },
          { wenn: (f) => (f.tank || 0) < 30, dann: [
            ['malik', 'Na, Schlafmütze? Du warst ja heute nur Deko.'],
            ['e', 'Etwas in dir kocht hoch. Wegen einem Witz, über den du sonst lachst.'],
            { wahl: [
              { t: '„Halt die Klappe!“', log: 'Mit leerem Tank Malik angefahren', folge: 'Malik: „Wow. Chill.“ Die anderen schauen.', skill: false },
              { t: 'Kurz stoppen: „Sorry. Ich bin nicht sauer. Ich hab Hunger.“', log: 'Gemerkt: Ich bin nicht sauer, ich bin leer (Hangry)', folge: 'Frau Brandt wirft dir eine Banane zu. Malik grinst: „Hangry. Kenn ich.“', skill: true, plus: { tank: 20 } },
            ] },
          ], sonst: [
            ['finn', '(blass, setzt sich auf den Rasen) Mein Herz rast. Alles dreht sich.'],
            { moment: 'Finn hatte drei Energy-Drinks und nichts gegessen. Drei Dosen sind für Jugendliche viel zu viel Koffein. Schwindel und Herzrasen heißen: sofort Erwachsene holen. Bei Ohnmacht oder Schmerz in der Brust: 112.' },
            { wahl: [
              { t: 'Sofort Frau Brandt rufen und bei Finn bleiben.', log: 'Bei Schwindel und Herzrasen sofort eine Erwachsene geholt und bei Finn geblieben', folge: 'Frau Brandt setzt Finn in den Schatten und ruft seine Eltern an. Nach einer Weile geht es ihm besser.', skill: true },
              { t: '„Trink halt noch einen, dann geht’s wieder.“', log: 'Finn noch einen Energy-Drink empfohlen', folge: 'Finns Hände zittern. Frau Brandt sieht es und kommt sofort.', skill: false },
            ] },
          ] },
        ],
      },
      {
        ziel: 'Mittagspause: Kantine.', ort: 'Kantine', p: [17.2, -6.6], leute: { chloe: [18.8, -6.0], malik: [15.8, -7.4] },
        zeilen: [
          ['e', 'Die Kantine hat am Turniertag offen. Du stellst deinen Teller zusammen.'],
          { wahl: [
            { t: 'Nudeln mit Soße, etwas Gemüse, Wasser.', log: 'Mittag: etwas Warmes, das lange hält', folge: 'Warm, satt, nicht schwer.', skill: true, plus: { tank: 35 } },
            { t: 'Pommes und eine Cola.', log: 'Mittag: Pommes und Cola', folge: 'Schmeckt. Hält ungefähr bis drei.', skill: null, plus: { tank: 20 } },
            { t: 'Nur Chips aus dem Automaten.', log: 'Mittag: nur Chips', folge: 'Nach einer Stunde ist der Hunger zurück.', skill: false, plus: { tank: 8 } },
          ], frage: 'Dein Mittagessen?' },
          ['chloe', 'Ich krieg nichts runter. Ich bin zu nervös wegen dem Finale.'],
          { wahl: [
            { t: '„Musst du nicht viel. Willst du ein paar Bissen von meinem Teller? Und trink was.“', log: 'Chloé etwas angeboten – ohne Druck', folge: 'Chloé isst ein paar Gabeln. „Hilft echt.“', skill: true },
            { t: '„Du musst jetzt essen! Sonst verlieren wir.“', log: 'Chloé unter Druck gesetzt', folge: 'Chloé schiebt den Teller weg.', skill: false },
          ] },
          { thermo: 'tank', text: 'Dein Tank', voll: true },
        ],
      },
      {
        ziel: '14:45 Uhr. Das Tief kommt. Raus in den Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { malik: [-22.6, -39.4, null, 'handy'] },
        zeilen: [
          ['e', 'Um diese Zeit sacken viele ab. Die Beine sind schwer, der Kopf ist Watte.'],
          { wahl: [
            { t: 'Fünf Minuten raus, Treppe hoch und runter, Wasser trinken.', log: 'Gegen das Tief: kurz bewegen und trinken', folge: 'Zehn Minuten reichen. Der Kopf wird klarer.', skill: true, plus: { tank: 15 } },
            { t: 'Noch ein Energy-Drink.', log: 'Gegen das Tief: noch ein Energy-Drink', folge: 'Kurz hoch. Im Finale wieder unten.', skill: false, plus: { tank: 5 } },
            { t: 'Hinsetzen und am Handy scrollen.', log: 'Gegen das Tief: am Handy gescrollt', folge: 'Der Kopf bleibt Watte.', skill: false },
          ] },
          ['malik', 'Was lädt dich eigentlich auf? Außer Essen.'],
          { wahl: [
            { t: 'Musik', log: 'Lädt auf: Musik' },
            { t: 'Draußen sein', log: 'Lädt auf: draußen sein' },
            { t: 'Mit Leuten lachen', log: 'Lädt auf: mit Leuten lachen' },
            { t: 'Allein Ruhe haben', log: 'Lädt auf: Ruhe' },
          ] },
        ],
      },
      {
        ziel: 'Finale: zum Stade.', ort: 'Stade', p: [-77.6, -6.0], leute: { brandt: [-76.0, -5.0, null, 'redet'], lio: [-79.0, -4.6], finn: [-78.6, -7.6] },
        zeilen: [
          { plus: { tank: -30 } },
          { thermo: 'tank', text: 'Dein Tank im Finale', voll: true },
          { wenn: (f) => (f.tank || 0) >= 40, dann: [
            ['e', 'In der letzten Minute bist du noch schnell. Du legst Lio den Ball zum 2:2 auf. Ihr verliert im Elfmeterschießen – aber du warst bis zum Schluss da.'],
          ], sonst: [
            ['e', 'In der zweiten Halbzeit sind deine Beine aus Blei. Den Ball zum 2:2 erreichst du einen Schritt zu spät.'],
          ] },
          ['brandt', 'Wer heute vorher getankt hat, war in der letzten Minute noch da. Das ist kein Talent. Das ist Planung.'],
          { skala: 'Wie voll ist dein Tank an einem normalen Schultag um 15 Uhr?', links: 'leer', rechts: 'voll' },
          { notiz: 'Ein Mini-Schritt für die nächsten vier Tage:', platz: 'z. B. Wasserflasche in den Rucksack …' },
        ],
      },
    ],
    ende: [['brandt', 'Der Sportrucksack mit Flasche ist vom Verein. Für alle, die verstanden haben, dass Tanken zum Training gehört.']],
    resuemee: { frage: 'Woran merkt ihr, dass euer Tank leer ist – bevor es knallt?', satz: 'Mein Mini-Schritt für vier Tage: …' },
  },

  // ---------- Stunde 3 · Was bleibt → Das Jahr in Bildern ----------
  'BLEIBT-3': {
    start: [
      ['h:Herr Lenz', 'Für das Jahres-Album: Geh zu zehn Orten, an denen dieses Jahr etwas passiert ist. Mach an jedem ein Bild im Kopf.'],
      ['e', 'Veränderung ist leise. Man merkt sie selbst am wenigsten – weil sie in kleinen Schritten kommt.'],
      { skala: 'Wie sicher hast du dich am Anfang des Jahres hier gefühlt?', links: 'gar nicht', rechts: 'sehr' },
    ],
    schritte: [
      {
        ziel: 'Bild 1: die Bushaltestelle.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: {},
        zeilen: [
          { erinnerung: 'BUS-12', sonst: 'Hier hast du am ersten Tag gewartet. Neu. Und nicht sicher, ob du hierher passt.' },
          ['e', 'Heute steht dort jemand aus der 7ème. Allein, die Kapuze tief, schaut aufs Handy, ohne zu tippen.'],
          { wahl: [
            { t: 'Hingehen: „Neu hier? Der Bus kommt meistens zu spät. Ich zeig dir, wo man wartet.“', log: 'Einen Neuen angesprochen – so, wie ich es mir am ersten Tag gewünscht habe', folge: 'Die Kapuze geht ein Stück hoch.', skill: true },
            { t: 'Vorbeigehen.', log: 'Am Neuen vorbeigegangen', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Bild 2: der Brunnen.', ort: 'Brunnen', p: [-8.0, 22.6], leute: {},
        zeilen: [
          { erinnerung: 'WORT-6', sonst: 'Am Brunnen hast du gelernt, dass es mehr Wörter für Gefühle gibt als „gut“ und „schlecht“.' },
        ],
      },
      {
        ziel: 'Bild 3: die Halle.', ort: 'Halle', p: [0.0, -4.0], leute: {},
        zeilen: [
          { erinnerung: 'ZAHL-100', sonst: 'In der Halle hat dein Thermometer zum ersten Mal Rot gezeigt. Und du hast gemerkt: Druck kann man messen.' },
        ],
      },
      {
        ziel: 'Bild 4: der Lesesaal.', ort: 'Lesesaal', p: [14.0, -59.0], leute: {},
        zeilen: [
          { erinnerung: 'BEWEIS-3', sonst: 'Im Lesesaal hast du einen Gedanken vor Gericht gestellt – und er hat nicht gewonnen.' },
        ],
      },
      {
        ziel: 'Bild 5: das Jugendhaus.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          { erinnerung: 'ICH-2', sonst: 'Am Billardtisch hängt die Regeltafel. Ein Streit, der mit einem Ich-Satz kleiner wurde.' },
          ['lenz', 'Weißt du, was ich an dir gemerkt hab? Du sagst öfter, was in dir los ist. Am Anfang kam da meistens nur „passt schon“.'],
          { wahl: [
            { t: '„Echt? Hab ich gar nicht gemerkt.“', log: 'Eine eigene Veränderung von außen gehört', folge: 'Herr Lenz: „Merkt man nie selbst. Darum sag ich’s.“', skill: true },
            { t: '„Ach, stimmt doch nicht.“', log: 'Ein Lob abgewehrt', folge: 'Herr Lenz lächelt: „Doch.“', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Bild 6: die Lichtung.', ort: 'Lichtung', p: [-57.8, -97.4], leute: { amira: [-56.2, -96.6] },
        zeilen: [
          { erinnerung: 'GRENZE-3', sonst: 'Auf der Lichtung hast du gemerkt, wo deine Grenze liegt – zuerst im Bauch, dann im Kopf.' },
          ['amira', 'Ich hab letzte Woche vor meiner Cousine geweint. Wegen nichts eigentlich. Total peinlich. Ich dachte, ich bin stärker geworden.'],
          { wahl: [
            { t: '„Weinen ist nicht peinlich. Ich find’s eher stark, dass du’s jemandem gezeigt hast.“', log: 'Amira gesagt: Stark heißt nicht hart', folge: 'Amira wischt sich übers Gesicht. „So hab ich das noch nie gesehen.“', skill: true },
            { t: '„Ja, das war schon peinlich.“', log: 'Amira beim Peinlich-Gefühl zugestimmt', folge: 'Amira wird still.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Bild 7: der Sportplatz.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { finn: [-62.8, -2.6] },
        zeilen: [
          { erinnerung: 'EULE-1', sonst: 'Auf dem Sportplatz hast du die Treppe aus einem Streit gefunden. Stufe für Stufe.' },
          ['finn', 'Ich bin gestern wieder voll ausgerastet. Beim Kicken. Alles umsonst, oder?'],
          { wahl: [
            { t: '„Nee. Rückschläge gehören dazu. Früher warst du drei Tage sauer. Gestern zehn Minuten.“', log: 'Finn gezeigt: Ein Rückschlag ist kein Neuanfang bei null', folge: 'Finn: „Zehn Minuten. Stimmt eigentlich.“', skill: true },
            { t: '„Ja, du änderst dich halt nie.“', log: 'Finns Rückschlag als Beweis gegen ihn genommen', folge: 'Finn kickt den Ball weit weg.', skill: false },
          ] },
          { moment: 'Wendung: Finn hielt einen Rückschlag für das Ende. Von außen sah man, wie weit er schon war.' },
        ],
      },
      {
        ziel: 'Bild 8: das Bushäuschen in der Rue du Moulin.', ort: 'Bushäuschen', p: [4.7, 85.0], leute: {},
        zeilen: [
          { erinnerung: 'BUEHNE-3', sonst: 'Am Bushäuschen war einmal eine Show. Und du hast entschieden, wie groß die Bühne wird.' },
        ],
      },
      {
        ziel: 'Bild 9: die Kantine.', ort: 'Kantine', p: [17.2, -6.6], leute: {},
        zeilen: [
          { erinnerung: 'ONLINE-2', sonst: 'In der Kantine hast du gelernt: Was du schickst, bleibt.' },
          ['e', 'Welche Karte aus diesem Jahr soll ganz vorne ins Album?'],
          { wahl: [
            { t: 'Zahl – Druck messen', log: 'Album-Karte vorne: Zahl – Druck messen' },
            { t: 'Hai und Eule – Streit-Typen', log: 'Album-Karte vorne: Hai und Eule' },
            { t: 'Stopp – Grenze', log: 'Album-Karte vorne: Stopp – Grenze' },
            { t: 'Bühne – Zuschauer', log: 'Album-Karte vorne: Bühne – Zuschauer' },
            { t: 'Mut-Leiter – kleine Schritte', log: 'Album-Karte vorne: Mut-Leiter' },
            { t: '4–8 – Atmen', log: 'Album-Karte vorne: 4–8 – Atmen' },
          ] },
        ],
      },
      {
        ziel: 'Bild 10: der Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { mia: [-22.6, -39.4, null, 'redet'], malik: [-25.6, -41.0] },
        zeilen: [
          ['e', 'Mia sitzt neben jemandem aus der 7ème und erklärt gerade, wie man bis zehn atmet, bevor man zurückschreibt. Ohne Kapuze. Sie lacht sogar.'],
          ['malik', 'Guck dir Mia an. Im Herbst saß die nur mit Kapuze am Brunnen.'],
          { wahl: [
            { t: 'Hingehen und es Mia sagen.', log: 'Mia ihre Veränderung gezeigt', folge: 'Mia: „Echt? Ich dachte, ich bin noch genauso.“', skill: true },
            { t: 'Nichts sagen. Merkt sie ja selbst.', log: 'Mia ihre Veränderung nicht gesagt', folge: 'Mia merkt es nicht. So wie fast niemand.', skill: null },
          ] },
          ['malik', 'Und du übrigens auch. Du bist anders als im September. Ruhiger irgendwie. Und du sagst öfter „Stopp“.'],
          { moment: 'Am Ende hat Malik dir gesagt, wie du dich verändert hast – du selbst hattest es nicht gemerkt.' },
          { skala: 'Wie sicher fühlst du dich jetzt hier?', links: 'gar nicht', rechts: 'sehr' },
          { notiz: 'Drei Skills, die bleiben – egal was kommt:', platz: '1. … 2. … 3. …' },
        ],
      },
    ],
    ende: [['lenz', '(gibt dir eine lila Jacke) Die „Erinnerung“. Für Leute, die zurückschauen können, ohne stehen zu bleiben.']],
    resuemee: { frage: 'Was hat sich bei euch verändert, das ihr selbst gar nicht gemerkt habt – aber andere?', satz: 'Ein Skill aus diesem Jahr, den ich behalte: …' },
  },

  // ---------- Stunde 4 · Letzte Stunde → Stärken-Post zum Abschied ----------
  'ENDE-4': {
    start: [
      ['h:Herr Lenz', 'Letzter Tag. Im Innenhof liegen Stärken-Post-Karten. Eine für jede Person, die dir dieses Jahr wichtig war.'],
      ['e', 'Ein Abschied darf wehtun. Wer ohne Tschüss geht, bereut es oft später.'],
    ],
    schritte: [
      {
        ziel: 'Zum Innenhof: Stärken-Post holen.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { lenz: [-22.6, -39.4, null, 'redet'] },
        zeilen: [
          ['lenz', 'Eine Regel: Schreib nichts Allgemeines. Nicht „Du bist nett“. Schreib, was du gesehen hast.'],
          { wahl: [
            { t: '„Du bist nett.“', log: 'Probekarte: allgemein („Du bist nett“)', folge: 'Herr Lenz: „Stimmt sicher. Aber woran hast du das gemerkt?“', skill: false },
            { t: '„Du hast im Oktober gewartet, bis ich fertig erzählt hatte. Das hat noch keiner gemacht.“', log: 'Probekarte: genau beschrieben, was man gesehen hat', folge: 'Herr Lenz: „So. Genau so.“', skill: true },
          ], frage: 'Probekarte für Herrn Lenz. Welche ist Stärken-Post?' },
        ],
      },
      {
        ziel: 'Post für Malik: zur Skate-Ecke.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6, null, 'redet'] },
        zeilen: [
          { wahl: [
            { wenn: (f) => f.malikNoor, t: '„Du hast das Video gelöscht und bist zu Noor gegangen. Das braucht mehr Mut als jeder Trick.“', log: 'Stärken-Post an Malik: Mut, sich zu entschuldigen', skill: true },
            { wenn: (f) => !f.malikNoor && f.malikGeloescht, t: '„Du hast das Video von Noor gelöscht, obwohl alle gelacht haben. Das war nicht leicht.“', log: 'Stärken-Post an Malik: einen Fehler zurückgenommen', skill: true },
            { wenn: (f) => !f.malikNoor && !f.malikGeloescht, t: '„Du bringst Leute zum Lachen. Und du merkst, wann du mal leise sein willst.“', log: 'Stärken-Post an Malik: genau beschrieben', skill: true },
            { t: '„Du bist witzig.“', log: 'Stärken-Post an Malik: allgemein', skill: null },
          ], frage: 'Was schreibst du Malik?' },
          ['malik', '(liest, schaut weg, grinst) … Okay. Hier. Deine.'],
          { wenn: (f) => f.anfang, dann: [['e', 'Auf Maliks Karte steht: „Wenn alle lachen und du nicht, merkt man das. Danke dafür.“']],
            sonst: [['e', 'Auf Maliks Karte steht: „Mit dir kann man auch mal ernst reden. Das können nicht viele.“']] },
          { wahl: [
            { t: '„Danke.“ – und die Karte einstecken.', log: 'Eine Stärke angenommen, einfach mit „Danke“', folge: 'Malik nickt. Fertig. Mehr braucht es nicht.', skill: true },
            { t: '„Ach, Quatsch, stimmt doch gar nicht.“', log: 'Eine Stärke abgewehrt', folge: 'Malik: „Doch. Lies sie später noch mal.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Post für Mia: zum Brunnen.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { mia: [-6.4, 22.9] },
        zeilen: [
          { wahl: [
            { t: '„Du merkst, wenn es jemandem schlecht geht – bevor er es sagt.“', log: 'Stärken-Post an Mia: merkt, wie es anderen geht', skill: true },
            { t: '„Du bist ruhig.“', log: 'Stärken-Post an Mia: allgemein', skill: null },
          ], frage: 'Was schreibst du Mia?' },
          ['mia', '(liest sie zweimal) Das hat mir noch nie jemand gesagt.'],
          { wenn: (f) => f.miaRuhe, dann: [['e', 'Auf Mias Karte für dich: „Du hast dich im Herbst zu mir gesetzt und nichts gefragt. Das war genau richtig.“']],
            sonst: [['e', 'Auf Mias Karte für dich: „Mit dir ist es leicht, still zu sein. Das mag ich.“']] },
        ],
      },
      {
        ziel: 'Chloé ist nicht im Innenhof. Jemand hat sie zur Bushaltestelle gehen sehen.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { chloe: [-18.2, 43.6] },
        zeilen: [
          ['chloe', '(Rucksack auf) Ich hau einfach ab. Abschiede sind nichts für mich. Nach dem Sommer bin ich eh in einer anderen Schule.'],
          { wahl: [
            { t: '„Okay. Dann tschüss.“', log: 'Chloé ohne Abschied gehen lassen', folge: 'Der Bus fährt. Deine Karte für Chloé ist noch in deiner Tasche.', skill: false, setze: { chloeWeg: true } },
            { t: '„Warte. Nur zwei Minuten? Die anderen haben was für dich.“', log: 'Chloé zu einem Abschied eingeladen – zwei Minuten', folge: 'Chloé bleibt stehen. Lange. Dann nickt sie.', skill: true },
          ] },
          { wenn: (f) => f.chloeWeg, dann: [
            ['e', 'Abends. Die Karte liegt auf deinem Tisch.'],
            { wahl: [
              { t: 'Ein Foto von der Karte an Chloé schicken.', log: 'Den Abschied mit Chloé später nachgeholt', folge: 'Chloé schreibt nach einer Stunde: „Ich hab geheult. Danke. Hätte ich nicht abhauen sollen.“', skill: true },
              { t: 'Liegen lassen.', log: 'Den Abschied mit Chloé offen gelassen', folge: 'Die Karte liegt da noch lange.', skill: false },
            ] },
          ], sonst: [
            ['e', 'Im Innenhof bekommt Chloé fünf Karten. Sie liest sie nicht vor. Aber sie steckt alle in die Innentasche ihrer Jacke.'],
            ['chloe', 'Beim letzten Schulwechsel bin ich einfach gegangen. Drei Monate hab ich gedacht, keiner hat mich vermisst. Das hier ist besser.'],
            { moment: 'Chloé wollte ohne Tschüss gehen. Zwei Minuten haben geändert, was sie mitnimmt.' },
          ] },
        ],
      },
      {
        ziel: 'Zum Schluss: zurück in den Innenhof. Ein Brief an dich selbst.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { lenz: [-22.6, -39.4] },
        zeilen: [
          ['lenz', 'Letzte Aufgabe. Schreib einen Brief an dich – an dich in sechs Monaten. Ich lese ihn nicht, und er kommt in kein Resümee.'],
          ['e', 'Der Brief bleibt auf diesem Gerät. Wenn ihr Geräte teilt, kann ihn jemand anderes öffnen. Dann schreib nur, was andere lesen dürfen.'],
          { notiz: 'Brief an mich (in sechs Monaten):', platz: 'Hallo ich. Gerade ist … Ich hoffe, du …', privat: true },
          ['e', 'Du findest den Brief im Missionen-Fenster unter „✉️ Brief an mich“. Dort kannst du ihn auch löschen.'],
          { skala: 'Wie schwer fällt dir der Abschied von diesem Jahr?', links: 'leicht', rechts: 'sehr schwer' },
        ],
      },
    ],
    ende: [['lenz', '(hält dir eine gelbe Jacke hin) Die Jahrgangs-Jacke. Auf dem Rücken stehen alle Namen. Deiner auch.']],
    resuemee: { frage: 'Welche Stärken-Post hat euch am meisten überrascht – und warum fällt es so schwer, ein Lob einfach anzunehmen?', satz: 'Eine Stärke, die mir jemand gesagt hat und die ich behalte: …' },
  },
};
