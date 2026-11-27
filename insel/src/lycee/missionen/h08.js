// REAL TALK #08 „Akku“ – vier Missionen (Format: kursmission.js). Skills der Stunden: Schlaf (innere Uhr geht in der Pubertät
// später, acht bis zehn Stunden, Mythen und echte Tipps) · Tank (leerer Tank macht gereizt, Wasser, Essen, kurz raus) ·
// Rückblick (Veränderung ist leise, Rückschläge gehören dazu, stark heißt nicht hart) · Abschied (darf wehtun, Stärken-Post
// annehmen, Postkarte an mich). Kein Essen wird schlechtgeredet, kein Körper bewertet. Alle Personen erfunden. Hilfe: 116 111.
export default {
  // ---------- Stunde 1 · Nachtmodus → Acht Stunden ----------
  'NACHT-8': {
    start: [
      ['e', 'Eine Woche, vier Abende. Freitag: Test bei Frau Hoss. Ziel: an dem Morgen wach sein.'],
      { setze: { akku: 55 } },
      { thermo: 'akku', text: 'Dein Schlaf-Akku', voll: true },
    ],
    schritte: [
      {
        ziel: 'Montag, 22:30. Zu Hause im Bett.', ort: 'Zu Hause', p: null, leute: {},
        zeilen: [
          ['e', 'Licht aus. Du bist hellwach. Das Handy liegt neben dem Kissen.'],
          { wahl: [
            { t: 'Scrollen. Macht doch müde.', log: 'Mythos geglaubt: Handy im Bett macht müde', folge: 'Um 0:40 schaust du noch Clips. Das Licht und die Clips halten den Kopf wach.', skill: false, plus: { akku: -20 } },
            { t: 'Handy weg. Ein Buch.', log: 'Handy weggelegt, ein Buch gelesen', folge: 'Nach einer halben Stunde bist du weg.', skill: true, plus: { akku: 10 } },
            { t: 'Auf die Uhr schauen. Rechnen.', log: 'Mythos: auf die Uhr schauen und rechnen', folge: 'Mit jeder Rechnung wirst du wacher.', skill: false, plus: { akku: -10 } },
          ], frage: 'Was machst du?' },
          ['h:Amira', 'kannst du auch nicht schlafen? 😩 (1:50)'],
          { wenn: (f) => (f.akku || 0) >= 50, dann: [['e', 'Du schläfst schon. Die Nachricht liest du erst morgens.']], sonst: [
            { wahl: [
              { t: 'Zurückschreiben. Eine Stunde lang.', log: 'Nachts eine Stunde mit Amira geschrieben', folge: 'Ihr seid beide um drei noch wach.', skill: false, plus: { akku: -15 } },
              { t: '„Gute Nacht 🌙“ Handy weg.', log: 'Nachts kurz geantwortet und das Handy weggelegt', folge: 'Amira schickt ein Herz.', skill: true },
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
            { t: 'Nehmen. Brauch ich heute.', log: 'Energy-Drink statt Schlaf: hilft kurz, kostet die nächste Nacht', folge: 'Um neun Rakete. Um elf zittrig. Abends bist du wieder hellwach.', skill: false, plus: { akku: -15 } },
            { t: '„Nee. Ich lauf lieber.“', log: 'Morgenlicht statt Energy-Drink', folge: 'Das Licht draußen stellt die innere Uhr ein Stück nach vorn. Abends wirst du früher müde.', skill: true, plus: { akku: 10 } },
          ] },
          ['nik', 'Ich geh jeden Morgen eine Runde. Siebzig Jahre lang. Das Licht weckt besser als jede Dose.'],
          { wahl: [
            { t: 'Licht am Morgen, draußen.', log: 'Gewusst: Morgenlicht stellt die innere Uhr vor', skill: true },
            { t: 'Ein Energy-Drink am Nachmittag.', log: 'Gedacht: Energy-Drink stellt die Uhr vor', skill: false },
            { t: 'Am Wochenende bis mittags schlafen.', log: 'Gedacht: Ausschlafen stellt die Uhr vor', skill: false },
          ], frage: 'Was hilft deiner inneren Uhr wirklich?' },
          ['amira', '(zeigt dir ein Foto) Mein Zimmer um 1:50. Bau’s mir um. Drei Züge. Kaufen geht nicht.'],
          ['e', 'Auf dem Foto: Handy im Bett, Vorhang offen, Energy-Drink auf dem Nachttisch, Fernseher an.'],
          { wahl: [
            { wenn: (f) => !f.zugHandy, t: 'Handy auf den Schreibtisch.', log: 'Zug für Amiras Zimmer: Handy auf den Schreibtisch', skill: true, setze: { zugHandy: true } },
            { wenn: (f) => !f.zugVorhang, t: 'Vorhang zu.', log: 'Zug für Amiras Zimmer: Vorhang zu', skill: true, setze: { zugVorhang: true } },
            { wenn: (f) => !f.zugEnergy, t: 'Energy-Drink weg.', log: 'Zug für Amiras Zimmer: Energy-Drink weg', skill: true, setze: { zugEnergy: true } },
            { wenn: (f) => !f.zugTv, t: 'Fernseher aus.', log: 'Zug für Amiras Zimmer: Fernseher aus', skill: true, setze: { zugTv: true } },
          ], frage: 'Zug 1:' },
          { wahl: [
            { wenn: (f) => !f.zugHandy, t: 'Handy auf den Schreibtisch.', log: 'Zug für Amiras Zimmer: Handy auf den Schreibtisch', skill: true, setze: { zugHandy: true } },
            { wenn: (f) => !f.zugVorhang, t: 'Vorhang zu.', log: 'Zug für Amiras Zimmer: Vorhang zu', skill: true, setze: { zugVorhang: true } },
            { wenn: (f) => !f.zugEnergy, t: 'Energy-Drink weg.', log: 'Zug für Amiras Zimmer: Energy-Drink weg', skill: true, setze: { zugEnergy: true } },
            { wenn: (f) => !f.zugTv, t: 'Fernseher aus.', log: 'Zug für Amiras Zimmer: Fernseher aus', skill: true, setze: { zugTv: true } },
          ], frage: 'Zug 2:' },
          { wahl: [
            { wenn: (f) => !f.zugHandy, t: 'Handy auf den Schreibtisch.', log: 'Zug für Amiras Zimmer: Handy auf den Schreibtisch', skill: true, setze: { zugHandy: true } },
            { wenn: (f) => !f.zugVorhang, t: 'Vorhang zu.', log: 'Zug für Amiras Zimmer: Vorhang zu', skill: true, setze: { zugVorhang: true } },
            { wenn: (f) => !f.zugEnergy, t: 'Energy-Drink weg.', log: 'Zug für Amiras Zimmer: Energy-Drink weg', skill: true, setze: { zugEnergy: true } },
            { wenn: (f) => !f.zugTv, t: 'Fernseher aus.', log: 'Zug für Amiras Zimmer: Fernseher aus', skill: true, setze: { zugTv: true } },
          ], frage: 'Zug 3:' },
          { wenn: (f) => f.zugHandy, dann: [
            ['amira', 'Aber das Handy ist mein Wecker!'],
            { wahl: [
              { t: '„Nimm den Wecker aus dem Regal.“', log: 'Amiras Einwand gelöst: Wecker statt Handy', folge: 'Amira: „Den hab ich ganz vergessen.“', skill: true },
              { t: '„Stimmt. Dann bleibt’s.“', log: 'Amiras Einwand nachgegeben', folge: 'Dann liegt das Handy um 1:50 wieder im Bett.', skill: false },
            ] },
          ], sonst: [['amira', 'Und das Handy lässt du im Bett? Okay … das ist ja mein Wecker.'], { moment: 'Amiras Handy blieb im Bett – der stärkste Wachmacher im Zimmer.' }] },
        ],
      },
      {
        ziel: 'Mittwoch, 16:00. Korbfeld mit Lio.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.2, 21.4, null, 'redet'] },
        zeilen: [
          ['e', 'Eine Stunde Basketball. Bewegung am Nachmittag macht abends müde – im guten Sinn.'],
          { plus: { akku: 10 } },
          ['lio', 'Heute Abend Online-Turnier. Bis Mitternacht oder so. Bist du dabei?'],
          { wahl: [
            { t: '„Bis halb zehn. Dann raus.“', log: 'Zusage mit fester Grenze: bis 21:30', folge: 'Lio: „Deal. Ich sag den anderen, dass du um halb zehn gehst.“', skill: true },
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
            { t: '„Wir brauchen eher neun.“', log: 'Sara den Mythos „fünf Stunden reichen“ widerlegt', folge: 'Sara: „Neun? … Darum bin ich so gereizt.“', skill: true },
            { t: '„Dann ist ja gut.“', log: 'Den Mythos „fünf Stunden reichen“ stehen lassen', skill: null },
          ] },
          ['sara', 'Ich kann nicht schlafen, weil mein Kopf nicht aufhört. Alles für morgen. Alles von heute.'],
          { wahl: [
            { t: '„Alles auf einen Zettel. Dann schlafen.“', log: 'Sara den Kopf-leeren-Zettel vorgeschlagen', folge: 'Sara reißt schon ein Blatt aus dem Heft.', skill: true },
            { t: '„Denk einfach nicht dran.“', log: '„Denk nicht dran“ geraten', folge: 'Sara: „Wenn das so einfach wär.“', skill: false },
          ] },
          { wahl: [
            { t: 'Stimmt nicht.', log: 'Mythos erkannt: Wochenende holt nicht alles nach', folge: 'Danach bist du Sonntagabend nicht müde – und Montag kaputt.', skill: true },
            { t: 'Stimmt.', log: 'Mythos geglaubt: Wochenende holt alles nach', skill: false },
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
            { t: 'Lass mal. Gibt’s da sicher.', log: 'Kein Wasser mitgenommen', folge: 'Am Platz gibt es nur einen Automaten. Kaputt.', skill: false },
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
              { t: '„Sorry. Ich hab nur Hunger.“', log: 'Gemerkt: Ich bin nicht sauer, ich bin leer (Hangry)', folge: 'Frau Brandt wirft dir eine Banane zu. Malik grinst: „Hangry. Kenn ich.“', skill: true, plus: { tank: 15 } },
            ] },
          ], sonst: [
            ['finn', '(blass, setzt sich auf den Rasen) Mein Herz rast. Alles dreht sich.'],
            { moment: 'Drei Energy, nichts gegessen: Finn wurde schwindelig.' },
            { wahl: [
              { t: 'Frau Brandt rufen. Dableiben.', log: 'Bei Schwindel und Herzrasen sofort eine Erwachsene geholt und bei Finn geblieben', folge: 'Frau Brandt setzt Finn in den Schatten. Bei Ohnmacht oder Schmerz in der Brust: sofort 112.', skill: true },
              { t: '„Trink noch einen.“', log: 'Finn noch einen Energy-Drink empfohlen', folge: 'Finns Hände zittern. Frau Brandt sieht es und kommt sofort.', skill: false },
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
            { t: '„Ein paar Bissen von mir?“', log: 'Chloé etwas angeboten – ohne Druck', folge: 'Chloé isst ein paar Gabeln. Und trinkt was. „Hilft echt.“', skill: true },
            { t: '„Iss! Sonst verlieren wir.“', log: 'Chloé unter Druck gesetzt', folge: 'Chloé schiebt den Teller weg.', skill: false },
          ] },
          { thermo: 'tank', text: 'Dein Tank', voll: true },
        ],
      },
      {
        ziel: '14:45 Uhr. Das Tief kommt. Raus in den Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { malik: [-22.6, -39.4, null, 'handy'] },
        zeilen: [
          ['e', 'Um diese Zeit sacken viele ab. Die Beine sind schwer, der Kopf ist Watte.'],
          { wahl: [
            { t: 'Treppe rauf und runter. Wasser.', log: 'Gegen das Tief: kurz bewegen und trinken', folge: 'Zehn Minuten reichen. Der Kopf wird klarer.', skill: true, plus: { tank: 15 } },
            { t: 'Noch ein Energy-Drink.', log: 'Gegen das Tief: noch ein Energy-Drink', folge: 'Kurz hoch. Im Finale wieder unten.', skill: false, plus: { tank: 5 } },
            { t: 'Hinsetzen. Scrollen.', log: 'Gegen das Tief: am Handy gescrollt', folge: 'Der Kopf bleibt Watte.', skill: false },
          ] },
          ['malik', '(schaut nicht hoch) Ich bin heute auch leer. Gestern Streit zu Hause. Kaum geschlafen.'],
          { wahl: [
            { t: 'Zuhören.', log: 'Malik zugehört: Stress zählt auch zum Tank', folge: 'Malik erzählt zwei Sätze. Dann: „Tut gut, dass einer fragt.“', skill: true },
            { t: 'Banane anbieten.', log: 'Malik etwas zu essen angeboten', folge: 'Malik: „Danke. Hilft dem Magen. Der Kopf ist noch voll.“', skill: null },
            { t: '„Wird schon wieder.“', log: 'Maliks Stress kleingeredet', folge: 'Malik steckt das Handy weg. Ende Gespräch.', skill: false },
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
      ['h:Herr Lenz', 'Jahres-Museum in der Aula. Bring ein Stück aus diesem Jahr mit. Ihr seid die Profis.'],
      ['e', 'Veränderung ist leise. Man merkt sie selbst am wenigsten.'],
      { skala: 'Wie sicher hast du dich im September hier gefühlt?', links: 'gar nicht', rechts: 'sehr' },
    ],
    schritte: [
      {
        ziel: 'Zur Aula. Das Museum wird aufgebaut.', ort: 'Aula', p: [-14.0, -57.0], leute: { lenz: [-12.4, -57.8, null, 'redet'], mia: [-15.6, -56.6] },
        zeilen: [
          ['lenz', 'Jeder stellt ein Stück aus. Mit Schild: Was ist es – und wann hilft es?'],
          { wahl: [
            { t: 'ein Eiswürfel', log: 'Ausstellungsstück: ein Eiswürfel (Kälte gegen Druck)', skill: null, setze: { stueck: 'den Eiswürfel' } },
            { t: 'eine Stoppuhr', log: 'Ausstellungsstück: eine Stoppuhr (Puls messen)', skill: null, setze: { stueck: 'die Stoppuhr' } },
            { t: 'die Kreppband-Linie', log: 'Ausstellungsstück: die Kreppband-Linie (Mut-Leiter)', skill: null, setze: { stueck: 'die Kreppband-Linie' } },
            { t: 'die Weiter-Karte', log: 'Ausstellungsstück: die Weiter-Karte', skill: null, setze: { stueck: 'die Weiter-Karte' } },
          ], frage: 'Dein Stück fürs Museum:' },
          { notiz: 'Dein Museumsschild:', platz: 'Das ist … Es hilft, wenn …' },
          ['mia', '(legt ihre Taschenkarte daneben: „4 ein, 8 aus“) Meins. Hat mich durchs Referat gebracht.'],
        ],
      },
      {
        ziel: 'Herr Lenz schickt dich los: Hol einen Besucher. Zur Bushaltestelle.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: {},
        zeilen: [
          { erinnerung: 'BUS-12', sonst: 'Hier hast du im September gewartet. Neu. Und nicht sicher, ob du hierher passt.' },
          ['e', 'Heute steht dort jemand Neues aus der 7ème. Allein, Kapuze tief, schaut aufs Handy, ohne zu tippen.'],
          { wahl: [
            { t: '„Komm kurz mit. Probier mal.“', log: 'Einem Neuen einen Skill gezeigt – zum Mitmachen, nicht zum Zuhören', folge: 'Er probiert {f:stueck|dein Stück} aus. Grinst schief: „Komisch. Hilft aber.“', skill: true, setze: { besucher: true } },
            { t: '„Das ist ein Reiz-Skill.“', log: 'Einem Neuen einen Skill erklärt – mit Fachwort', folge: 'Er nickt höflich. Verstanden hat er nichts.', skill: null },
            { t: 'Vorbeigehen.', log: 'Am Neuen vorbeigegangen', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Zum Sportplatz. Finn sitzt am Rand.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { finn: [-62.8, -2.6] },
        zeilen: [
          { erinnerung: 'EULE-1', sonst: 'Auf dem Sportplatz hast du einen Streit in Zeitlupe angeschaut – und den billigsten Stopp gefunden.' },
          ['finn', 'Ich bin gestern wieder voll ausgerastet. Beim Kicken. Alles umsonst, oder?'],
          { wahl: [
            { t: '„Früher drei Tage. Gestern zehn Minuten.“', log: 'Finn gezeigt: Ein Rückschlag ist kein Neuanfang bei null', folge: 'Finn: „Zehn Minuten … stimmt eigentlich.“', skill: true },
            { t: '„Du änderst dich halt nie.“', log: 'Finns Rückschlag als Beweis gegen ihn genommen', folge: 'Finn kickt den Ball weit weg.', skill: false },
          ] },
          { moment: 'Wendung: Finn hielt einen Rückschlag für das Ende. Von außen sah man, wie weit er schon war.' },
          ['finn', '(später, in der Aula, legt drei Münzen auf dein Stück) Für {f:stueck|dein Stück}. Hat mir mehr gebracht als jeder Vortrag.'],
        ],
      },
      {
        ziel: 'Zum Schluss: Innenhof.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { mia: [-22.6, -39.4, null, 'redet'], malik: [-25.6, -41.0] },
        zeilen: [
          ['e', 'Mia sitzt neben jemandem aus der 7ème und zeigt ihre Karte: „4 ein, 8 aus.“ Ohne Kapuze. Sie lacht sogar.'],
          ['malik', 'Guck dir Mia an. Im Herbst saß die nur mit Kapuze am Brunnen.'],
          { wahl: [
            { t: 'Es Mia sagen.', log: 'Mia ihre Veränderung gezeigt', folge: 'Mia: „Echt? Ich dachte, ich bin noch genauso.“', skill: true },
            { t: 'Nichts sagen.', log: 'Mia ihre Veränderung nicht gesagt', folge: 'Mia merkt es nicht. So wie fast niemand.', skill: null },
          ] },
          ['malik', 'Und du übrigens auch. Du bist anders als im September. Ruhiger irgendwie. Und du sagst öfter „Stopp“.'],
          { moment: 'Am Ende hat Malik dir gesagt, wie du dich verändert hast – du selbst hattest es nicht gemerkt.' },
          { notiz: 'Post für die Neuen, ohne Namen:', platz: 'Das stimmt wirklich über diesen Kurs: …' },
          { skala: 'Wie sicher fühlst du dich jetzt hier?', links: 'gar nicht', rechts: 'sehr' },
        ],
      },
    ],
    ende: [['lenz', '(gibt dir eine lila Jacke) Die „Erinnerung“. Für Leute, die zurückschauen können, ohne stehen zu bleiben.']],
    resuemee: { frage: 'Welches Stück hättet ihr im September gebraucht – und warum?', satz: 'Mein Stück für die Neuen: …' },
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
            { t: '„Du hast gewartet, bis ich fertig war.“', log: 'Probekarte: genau beschrieben, was man gesehen hat', folge: 'Herr Lenz: „So. Genau so.“', skill: true },
          ], frage: 'Probekarte für Herrn Lenz. Welche ist Stärken-Post?' },
        ],
      },
      {
        ziel: 'Post für Malik: zur Skate-Ecke.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6, null, 'redet'] },
        zeilen: [
          { wahl: [
            { wenn: (f) => f.malikNoor, t: '„Du bist zu Noor gegangen. Mutig.“', log: 'Stärken-Post an Malik: Mut, sich zu entschuldigen', skill: true },
            { wenn: (f) => !f.malikNoor && f.malikGeloescht, t: '„Du hast gelöscht, obwohl alle lachten.“', log: 'Stärken-Post an Malik: einen Fehler zurückgenommen', skill: true },
            { wenn: (f) => !f.malikNoor && !f.malikGeloescht, t: '„Du merkst, wann du leise sein willst.“', log: 'Stärken-Post an Malik: genau beschrieben', skill: true },
            { t: '„Du bist witzig.“', log: 'Stärken-Post an Malik: allgemein', skill: null },
          ], frage: 'Was schreibst du Malik?' },
          ['malik', '(liest, schaut weg, grinst) … Okay. Hier. Deine.'],
          { wenn: (f) => f.anfang, dann: [['e', 'Auf Maliks Karte steht: „Wenn alle lachen und du nicht, merkt man das. Danke dafür.“']],
            sonst: [['e', 'Auf Maliks Karte steht: „Mit dir kann man auch mal ernst reden. Das können nicht viele.“']] },
          { wahl: [
            { t: '„Danke.“ Einstecken.', log: 'Eine Stärke angenommen, einfach mit „Danke“', folge: 'Malik nickt. Fertig. Mehr braucht es nicht.', skill: true },
            { t: '„Quatsch, stimmt nicht.“', log: 'Eine Stärke abgewehrt', folge: 'Malik: „Doch. Lies sie später noch mal.“', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Post für Mia: zum Brunnen.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { mia: [-6.4, 22.9] },
        zeilen: [
          { wahl: [
            { t: '„Du merkst es, bevor man’s sagt.“', log: 'Stärken-Post an Mia: merkt, wie es anderen geht', skill: true },
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
            { t: '„Warte. Nur zwei Minuten?“', log: 'Chloé zu einem Abschied eingeladen – zwei Minuten', folge: '„Die anderen haben was für dich.“ Chloé bleibt stehen. Lange. Dann nickt sie.', skill: true },
          ] },
          { wenn: (f) => f.chloeWeg, dann: [
            ['e', 'Abends. Die Karte liegt auf deinem Tisch.'],
            { wahl: [
              { t: 'Foto der Karte schicken.', log: 'Den Abschied mit Chloé später nachgeholt', folge: 'Chloé schreibt nach einer Stunde: „Ich hab geheult. Danke. Hätte ich nicht abhauen sollen.“', skill: true },
              { t: 'Liegen lassen.', log: 'Den Abschied mit Chloé offen gelassen', folge: 'Die Karte liegt da noch lange.', skill: false },
            ] },
          ], sonst: [
            ['e', 'Im Innenhof bekommt Chloé fünf Karten. Sie liest sie nicht vor. Aber sie steckt alle in die Innentasche ihrer Jacke.'],
            ['chloe', 'Am letzten Grundschultag bin ich einfach zu Hause geblieben. Den ganzen Sommer hab ich gedacht, keiner hat mich vermisst. Das hier ist besser.'],
            { moment: 'Chloé wollte ohne Tschüss gehen. Zwei Minuten haben geändert, was sie mitnimmt.' },
          ] },
        ],
      },
      {
        ziel: 'Zum Schluss: zurück in den Innenhof. Eine Postkarte an dich selbst.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { lenz: [-22.6, -39.4] },
        zeilen: [
          ['lenz', 'Erst noch eins: Wenn es nach dem Kurs mal eng wird – zu wem gehst du?'],
          { wahl: [
            { t: 'Herr Lenz', log: 'Mein Netz: Herr Lenz', skill: null },
            { t: 'der SePAS', log: 'Mein Netz: SePAS', skill: null },
            { t: 'Freund oder Freundin', log: 'Mein Netz: Freund oder Freundin', skill: null },
            { t: 'Telefon 116 111', log: 'Mein Netz: 116 111', skill: null },
          ], frage: 'Mein Netz – ohne richtig oder falsch:' },
          ['lenz', 'Letzte Aufgabe. Eine Postkarte an dich – für den Herbst, in der 6e. Hier, Karte und Umschlag. Schreib sie auf Papier. Ich lese sie nicht.'],
          ['e', 'Im Spiel bleibt nur ein Stichwort – auf diesem Gerät. Wenn ihr Geräte teilt, kann es jemand anderes sehen. Schreib nur, was andere lesen dürfen.'],
          { notiz: 'Ein Stichwort für deine Postkarte:', platz: 'zum Beispiel: stolz auf …', privat: true },
          ['e', 'Du findest sie im Missionen-Fenster unter „✉️ Postkarte an mich“. Dort kannst du sie auch löschen.'],
          { skala: 'Wie schwer fällt dir der Abschied von diesem Jahr?', links: 'leicht', rechts: 'sehr schwer' },
        ],
      },
    ],
    ende: [['e', 'Wie am ersten Tag: 5-4-3-2-1. Derselbe Innenhof. Du bist nicht mehr dieselbe Person wie im September.'], ['lenz', '(hält dir eine gelbe Jacke hin) Die Jahrgangs-Jacke. Auf dem Rücken stehen alle Namen. Deiner auch.']],
    resuemee: { frage: 'Welche Stärken-Post hat euch am meisten überrascht – und warum fällt es so schwer, ein Lob einfach anzunehmen?', satz: 'Eine Stärke, die mir jemand gesagt hat und die ich behalte: …' },
  },
};
