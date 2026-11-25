// REAL TALK #07 „Netz“ – drei Missionen (Format: kursmission.js). Skills der Stunden: Gratis-Apps verdienen an deiner Zeit;
// drei Tricks (Clip startet von selbst, Ping, Flamme/Streak) und ein Wenn-dann-Plan · Was du schickst, bleibt; Druck von einer
// Bitte unterscheiden; wenn es schiefgeht: jemandem sagen, Beweise sichern, melden, blockieren · Fakes: sechs Warnzeichen
// und zwei Fragen (Wer sagt das? Wer berichtet noch darüber?). Alle Personen und Konten erfunden. Hilfe: BEE SECURE 8002 1234.
export default {
  // ---------- Stunde 1 · Wer scrollt wen? ----------
  'SCROLL-1': {
    start: [
      ['e', 'annexe.cam ist gratis. Trotzdem verdient die App jeden Tag Geld – mit Werbung zwischen den Clips. Je länger du schaust, desto mehr. Die App verkauft deine Zeit an die Werbung.'],
      ['e', 'Heute versucht die App dreimal, dich festzuhalten. Finde die drei Tricks.'],
    ],
    schritte: [
      {
        ziel: 'Zur Bushaltestelle. Der Bus kommt in fünf Minuten.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: {},
        zeilen: [
          ['e', 'Du öffnest annexe.cam. Nur kurz. Ein Clip: ein Hund auf einem Skateboard. Er ist zu Ende – und der nächste startet von selbst. Dann der nächste.'],
          ['nik', 'Na, der Bus …'],
          { wahl: [
            { t: 'Noch einen. Nur noch einen.', log: 'Weitergescrollt – der nächste Clip lief von selbst', folge: 'Als du hochschaust, fährt der Bus gerade ab. Zwanzig Minuten bis zum nächsten.', skill: false, setze: { bus: true } },
            { t: 'Handy weg. Kopf hoch.', log: 'Den ersten Trick bemerkt und das Handy weggesteckt', folge: 'Der Bus hält. Du steigst ein.', skill: true },
          ] },
          { wahl: [
            { t: 'Der nächste Clip startet von selbst – es gibt kein Ende.', log: 'Trick 1 erkannt: Der nächste Clip startet von selbst', skill: true },
            { t: 'Hunde sind halt süß.', log: 'Trick 1 nicht erkannt', skill: false },
          ], frage: 'Trick 1: Was hat dich festgehalten?' },
          { wenn: (f) => f.bus, dann: [['nik', 'Zu meiner Zeit gab’s nur ein Programm. Und das hat um Mitternacht aufgehört.']] },
        ],
      },
      {
        ziel: 'Nach der Schule: Korbfeld. Lio wartet zum Eins-gegen-eins.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.2, 21.4, null, 'redet'] },
        zeilen: [
          ['lio', 'Bis elf. Verlierer holt Wasser.'],
          ['e', 'Es steht 6:6. Dein Handy vibriert. „Malik hat etwas Neues gepostet.“ Dann noch mal: „3 Leute haben deinen Clip geliked.“'],
          { wahl: [
            { t: 'Kurz nachschauen. Nur kurz.', log: 'Mitten im Spiel aufs Handy geschaut', folge: 'Aus kurz werden vier Minuten. Lio wirft allein auf den Korb. „Schon gut.“', skill: false },
            { t: 'Weiterspielen. Das Handy kann warten.', log: 'Die Pings ignoriert und weitergespielt', folge: 'Du verlierst 9:11. Aber es war ein richtig gutes Spiel.', skill: true },
          ] },
          { wahl: [
            { t: 'Pings: Die App ruft mich zurück, wenn ich gerade woanders bin.', log: 'Trick 2 erkannt: Pings holen dich zurück', skill: true },
            { t: 'Das waren wichtige Nachrichten.', log: 'Trick 2 nicht erkannt', skill: false },
          ], frage: 'Trick 2: Was ist da passiert?' },
          ['lio', 'Ich hab alle Pings aus. Bis auf Anrufe. Seitdem merk ich erst, wie oft das vorher war.'],
          { wahl: [
            { t: 'Gleich jetzt: Pings von annexe.cam ausschalten.', log: 'Die Pings von annexe.cam ausgeschaltet', folge: 'Drei Schalter. Zehn Sekunden.', skill: true, setze: { pingAus: true } },
            { t: 'Lieber nicht. Ich könnte was verpassen.', log: 'Die Pings angelassen', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Abends, zu Hause im Bett. 22:47.', ort: 'Zu Hause', p: null, leute: {},
        zeilen: [
          ['h:annexe.cam', '🔥 Deine 112-Tage-Flamme mit Malik erlischt in 1 Stunde! Schick jetzt ein Bild!'],
          ['e', 'Du bist müde. Morgen ist Mathe-Test. Aber 112 Tage …'],
          { wahl: [
            { t: 'Schnell ein schwarzes Bild schicken. Dann noch ein bisschen scrollen.', log: 'Für die Flamme ein Bild geschickt und weitergescrollt', folge: 'Es ist 0:20, als du das Handy weglegst.', skill: false, setze: { spaet: true } },
            { t: 'Die Flamme ausgehen lassen. Handy auf den Schreibtisch.', log: 'Die Flamme ausgehen lassen und das Handy weggelegt', folge: 'Komisch, aber du schläfst nach zehn Minuten.', skill: true },
            { t: 'Malik schreiben: „Lass die Flamme ausgehen? Wir sehen uns eh jeden Tag.“', log: 'Mit Malik über die Flamme geredet', folge: 'Malik: „Ehrlich? Ja. Ich mach das nur noch für die Zahl.“', skill: true, dann: [{ moment: 'Wendung: Malik hat die Flamme auch nur noch für die Zahl gemacht. Keiner von beiden wollte sie wirklich.' }] },
          ] },
          { wahl: [
            { t: 'Flamme: Die App macht mir Angst, etwas zu verlieren.', log: 'Trick 3 erkannt: Die Flamme macht Angst vor Verlust', skill: true },
            { t: 'Das ist halt Freundschaft.', log: 'Trick 3 nicht erkannt', skill: false },
          ], frage: 'Trick 3: Wie hält dich die App fest?' },
          ['e', 'Jetzt dein Plan. Ein Wenn-dann für deinen schwierigsten Moment am Handy.'],
          { wahl: [
            { t: 'Wenn ich ins Bett gehe, dann liegt das Handy auf dem Schreibtisch.', log: 'Wenn-dann-Plan: Handy abends auf den Schreibtisch' },
            { t: 'Wenn ich auf den Bus warte, dann ist das Handy in der Tasche, bis er da ist.', log: 'Wenn-dann-Plan: an der Haltestelle Handy in der Tasche' },
            { t: 'Wenn ich mit Leuten zusammen bin, dann bleibt das Handy umgedreht.', log: 'Wenn-dann-Plan: mit Leuten Handy umgedreht' },
          ], frage: 'Welcher Plan passt zu dir?' },
          { notiz: 'Oder dein eigener Wenn-dann-Plan:', platz: 'Wenn …, dann …' },
        ],
      },
      {
        ziel: 'Am nächsten Morgen: Bäckerei.', ort: 'Bäckerei', p: [0.4, 54.2], leute: { malik: [2.0, 54.6] },
        zeilen: [
          { wenn: (f) => f.spaet, dann: [['malik', 'Du siehst aus wie ich nach einer Flammen-Nacht. Also: richtig kaputt.']], sonst: [['malik', 'Ausgeschlafen? Ich auch. Zum ersten Mal seit Wochen.']] },
          ['rosa', 'Was ist das eigentlich, eine Flamme? Bei mir brennt nur der Ofen.'],
          { skala: 'Wer hat gestern öfter entschieden – du oder die App?', links: 'die App', rechts: 'ich' },
        ],
      },
    ],
    ende: [['e', 'Im Schuhregal der Annexe steht ein Paar mintgrüne Sneaker. Auf dem Zettel: „Offline. Für Leute, die ihren Bus noch kriegen.“']],
    resuemee: { frage: 'Welcher der drei Tricks erwischt euch am meisten – und welcher Wenn-dann-Plan hilft wirklich?', satz: 'Mein Wenn-dann für diese Woche: Wenn …, dann …' },
  },

  // ---------- Stunde 2 · Für immer online → Gelesen um 23:14 ----------
  'ONLINE-2': {
    start: [
      ['h:Amira', 'bist du wach?'],
      ['h:Amira', 'hallo??'],
      ['h:Amira', 'ich seh dass du online bist'],
      ['h:Amira', 'GELESEN UM 23:14 und keine antwort?!'],
      ['e', 'Was du schickst, bleibt. Und wer immer sofort antworten muss, ist nie offline. Heute ziehst du online eine Grenze, die hält.'],
    ],
    schritte: [
      {
        ziel: 'Zu Hause, 23:16. Amira wartet auf eine Antwort.', ort: 'Zu Hause', p: null, leute: {},
        zeilen: [
          { wahl: [
            { t: 'Antworten. Und weiterschreiben, bis sie zufrieden ist.', log: 'Bis spät in die Nacht geantwortet', folge: 'Um 1:05 schreibt sie noch. Du auch.', skill: false, setze: { nacht: true } },
            { t: 'Gar nicht antworten. Handy umdrehen.', log: 'Nicht geantwortet, ohne etwas zu sagen', folge: 'Am Morgen: 14 Nachrichten.', skill: null },
            { t: '„Bin müde, ich geh jetzt offline. Ab morgen bin ich ab 22 Uhr weg. In der Pause gern. 💛“', log: 'Freundlich eine Grenze gesetzt und ein Angebot gemacht', folge: 'Amira: „ok“', skill: true },
          ] },
          ['h:Amira', 'Wenn du mich wirklich magst, antwortest du sofort.'],
          { wahl: [
            { t: 'Eine normale Bitte.', log: '„Wenn du mich magst …“ als Bitte eingeschätzt', skill: false },
            { t: 'Druck. Mögen hängt nicht an Antwortzeiten.', log: '„Wenn du mich magst …“ als Druck erkannt', skill: true },
          ], frage: 'Bitte oder Druck?' },
          ['h:Amira', 'Sorry. Ich bin nur so … Findest du Jade eigentlich auch manchmal nervig?'],
          { wahl: [
            { t: '„Manchmal schon 🙄 Vor allem, wenn sie immer alles besser weiß.“', log: 'Im Chat über Jade gelästert', folge: 'Amira: „SAG ICH DOCH 😂“', skill: false, setze: { gelaestert: true } },
            { t: '„Über Jade schreib ich nichts. Wenn was ist, red ich mit ihr.“', log: 'Nicht über Jade geschrieben', folge: 'Amira: „Okay, okay.“', skill: true },
          ] },
          ['h:Amira', 'Schick mir mal die Sprachnachricht, die Jade dir heute geschickt hat. Nur für mich.'],
          { wahl: [
            { t: '„Nein. Die ist von Jade, nicht von mir.“', log: 'Fremde Nachricht nicht weitergegeben', skill: true },
            { t: 'Weiterleiten. Ist ja nur Amira.', log: 'Jades Sprachnachricht weitergeleitet', folge: '„Nur für mich“ – das hat Jade auch gedacht.', skill: false, setze: { weiter: true } },
          ] },
        ],
      },
      {
        ziel: 'Am Morgen: zum Brunnen. Amira sitzt dort.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { amira: [-6.4, 22.9] },
        zeilen: [
          { wenn: (f) => f.nacht, dann: [['amira', '(gähnt) Wir sind beide kaputt, oder?']], sonst: [['amira', 'Sorry wegen gestern. Das war viel.']] },
          ['amira', 'Wenn keiner antwortet, denk ich sofort: Alle sind sauer auf mich. Dann schreib ich und schreib ich.'],
          { wahl: [
            { t: '„Wenn ich nicht antworte, heißt das: Ich schlafe. Nicht: Ich bin sauer. Abgemacht?“', log: 'Mit Amira abgemacht, was keine Antwort bedeutet', folge: 'Amira atmet aus. „Abgemacht.“', skill: true, setze: { abgemacht: true } },
            { t: '„Ab jetzt antworte ich immer sofort. Versprochen.“', log: 'Versprochen, immer sofort zu antworten', folge: 'Amira lächelt. Aber du weißt: Das hältst du nicht durch.', skill: false },
            { t: '„Ach, ist doch nicht so schlimm.“', log: 'Amiras Sorge kleingeredet', folge: 'Amira nickt. Aber sie fühlt sich nicht verstanden.', skill: false },
          ] },
          { wenn: (f) => f.abgemacht, dann: [
            ['amira', 'Das mit dem „Alle sind sauer“-Gefühl hab ich echt oft.'],
            { wahl: [
              { t: '„Willst du das mal Herrn Kuedes erzählen? Ich komm mit bis zur Tür.“', log: 'Amira einen Erwachsenen für ihre Sorge angeboten', folge: 'Amira: „Vielleicht. Nächste Woche.“', skill: true },
              { t: '„Geht bestimmt weg.“', log: 'Amiras Sorge kleingeredet', skill: null },
            ] },
          ] },
        ],
      },
      {
        ziel: 'In der Pause: Kantine. Irgendwas ist los.', ort: 'Kantine', p: [17.2, -6.6], leute: { sara: [18.8, -6.0, null, 'handy'], jade: [15.8, -7.6] },
        zeilen: [
          { wenn: (f) => f.gelaestert, dann: [
            ['sara', 'Oh nein. Guck mal, was rumgeht.'],
            ['e', 'Ein Screenshot. Dein Satz: „Manchmal schon 🙄 Vor allem, wenn sie immer alles besser weiß.“ Amira hat ihn im Streit weitergeschickt. Jade hat ihn gesehen.'],
            { moment: 'Wendung: Dein Satz von 23:20 war am nächsten Mittag bei der halben Klasse. Privat gibt es im Netz nicht.' },
          ], sonst: [
            ['sara', 'Krass. Guck mal, was rumgeht.'],
            { wenn: (f) => f.weiter, dann: [['e', 'Jades Sprachnachricht. Die, die du Amira geschickt hast. Jetzt hat sie die halbe Klasse. Jade sitzt allein am Tisch.'], { moment: 'Wendung: „Nur für mich“ hat bis zum Mittag gehalten. Privat gibt es im Netz nicht.' }],
              sonst: [['e', 'Ein Screenshot von Amira. Sie hat nachts in die Gruppe geschrieben: „Keiner mag mich.“ Jemand hat ihn rumgeschickt. Mit Lachsmiley.'], { wahl: [
                { t: 'Nicht weiterleiten. Sara sagen: „Lösch das bitte.“', log: 'Einen fremden Screenshot gestoppt', folge: 'Sara: „Ja … ist eigentlich mies.“ Sie löscht ihn.', skill: true },
                { t: 'Weiterleiten.', log: 'Einen fremden Screenshot weitergeleitet', folge: 'Jetzt hat ihn eine Gruppe mehr.', skill: false },
              ] },
              ['e', '„Keiner mag mich“ – wer so etwas nachts schreibt, dem geht es vielleicht richtig schlecht.'],
              { wahl: [
                { t: 'Amira privat schreiben: „Ich mag dich. Wie geht’s dir?“ – und Herrn Kuedes Bescheid sagen.', log: 'Amiras Satz ernst genommen: ihr geschrieben und einen Erwachsenen eingeschaltet', folge: 'Amira antwortet erst am Abend: „Danke. Herr Kuedes hat mit mir geredet.“', skill: true },
                { t: 'Amira privat schreiben: „Ich mag dich. Wie geht’s dir?“', log: 'Amira privat geschrieben', folge: 'Amira: „Geht so.“ Mehr schreibt sie nicht.', skill: null },
                { t: 'Nichts tun. Ist bestimmt nur Drama.', log: 'Amiras Satz als Drama abgetan', folge: 'Am nächsten Tag fehlt Amira. Herr Kuedes fragt in der Klasse, ob jemand etwas weiß. Du weißt etwas.', skill: false },
              ], frage: 'Was machst du mit dem, was Amira geschrieben hat?' },
              ['e', 'Wenn jemand schreibt, dass er nicht mehr kann: Erwachsene einschalten. Ist jemand in Gefahr: 112. Und es gibt das Kanner-Jugendtelefon: 116 111, kostenlos und anonym.'],
            ] },
          ] },
          ['e', 'Wenn im Netz etwas schiefgeht, gibt es vier Schritte. Welcher kommt zuerst?'],
          { wahl: [
            { t: 'Einer Person sagen, der ich vertraue.', log: 'Zuerst: einer Vertrauensperson sagen', skill: true },
            { t: 'Beweise sichern (Screenshots mit Datum).', log: 'Zuerst: Beweise sichern', skill: null },
            { t: 'Melden und löschen lassen.', log: 'Zuerst: melden', skill: null },
            { t: 'Blockieren.', log: 'Zuerst: blockieren', skill: null },
            { t: 'Ganz schnell löschen und so tun, als wär nix.', log: 'Alles löschen und so tun, als wäre nichts', folge: 'Dann gibt es auch keine Beweise mehr.', skill: false },
          ], frage: 'Wenn es passiert ist – was zuerst?' },
        ],
      },
      {
        ziel: 'Zum Innenhof. Jade sitzt auf den Stufen.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { jade: [-22.6, -39.4] },
        zeilen: [
          { wenn: (f) => f.gelaestert || f.weiter, dann: [
            ['jade', 'Ich hab’s gesehen.'],
            { wahl: [
              { wenn: (f) => f.gelaestert, t: '„Ja, das war von mir. Es war unfair. Es tut mir leid. Sag mir lieber direkt, wenn ich nerve – und ich dir.“', log: 'Bei Jade ehrlich entschuldigt, ohne Ausrede', folge: 'Jade schweigt lange. Dann: „Okay. Danke, dass du’s nicht abstreitest.“', skill: true },
              { wenn: (f) => f.weiter, t: '„Ich hab deine Sprachnachricht an Amira geschickt. Das war nicht okay. Es tut mir leid.“', log: 'Bei Jade für die weitergeleitete Sprachnachricht entschuldigt', folge: 'Jade: „Das war privat. … Danke, dass du’s sagst.“', skill: true },
              { t: '„Das war nicht so gemeint.“', log: 'Sich bei Jade herausgeredet', folge: 'Jade: „Es ist aber so angekommen.“', skill: false },
            ] },
          ], sonst: [
            ['jade', 'Danke, dass du die Sprachnachricht nicht weitergegeben hast. Amira hat mir erzählt, dass sie gefragt hat.'],
          ] },
          ['e', 'Bevor du sendest, eine Frage: Wäre es okay, wenn das morgen die ganze Klasse sieht?'],
          { skala: 'Wie oft denkst du das, bevor du sendest?', links: 'nie', rechts: 'immer' },
          { notiz: 'Meine Offline-Zeit (ab wann, bis wann?) und wem ich sie sage:', platz: 'Ab … Uhr bin ich offline. Ich sage es …' },
        ],
      },
    ],
    ende: [['amira', '(gibt dir eine dunkelblaue Mütze mit einem Mond) Für ab 22 Uhr. Ich hab auch eine. Wir sind dann beide offline.']],
    resuemee: { frage: 'Woran merkt man, ob eine Nachricht eine Bitte ist oder Druck – und was hilft, wenn etwas schon rumgeht?', satz: 'Bevor ich etwas schicke, frage ich mich: …' },
  },

  // ---------- Stunde 3 · Echt oder fake? → Die Schlagzeile ----------
  'FAKE-3': {
    start: [
      ['h:Klassen-Chat', 'Finn: TEILT DAS!!! 😱'],
      ['h:annexe.cam', '@kantine_insider: „SKANDAL!!! Würmer im Kantinen-Essen der Annexe!! Ein Insider aus der Küche verrät alles. Nur heute online – TEILT ES, BEVOR ES GELÖSCHT WIRD!!!“ (dazu ein Foto: ein Teller mit Nudeln, darin etwas Weißes, das sich windet)'],
      { wahl: [
        { t: 'Sofort teilen. Alle müssen das wissen!', log: 'Die Meldung sofort geteilt, ohne zu prüfen', folge: 'In zehn Minuten haben sie 40 Leute mehr.', skill: false, setze: { geteilt: true } },
        { t: 'Erst bremsen. Dann prüfen.', log: 'Erst gebremst, statt zu teilen', skill: true },
      ], frage: 'Dein Daumen ist schon über „Teilen“.' },
      ['e', 'Drei Spuren, ein Urteil. Fakes sind schneller als die Wahrheit, weil sie ein starkes Gefühl machen. Du bist langsamer – und dafür richtig.'],
    ],
    schritte: [
      {
        ziel: 'Spur 1: Wer sagt das? Frag Zoé in der Eingangshalle.', ort: 'Halle', p: [-3.0, -5.6], leute: {},
        zeilen: [
          ['zoe', 'Zeig mal. … Okay, Annexe-News-Regel Nummer eins: Wer sagt das? Tipp auf das Konto.'],
          ['e', '@kantine_insider: erstellt gestern. Ein einziger Beitrag. Kein Name, kein Gesicht, kein Ort.'],
          { wahl: [
            { t: 'Großbuchstaben und !!!', log: 'Warnzeichen gefunden: Großbuchstaben und !!!', skill: true },
            { t: 'Macht Ekel und Wut', log: 'Warnzeichen gefunden: macht starke Gefühle', skill: true },
            { t: '„Nur heute“ – Zeitdruck', log: 'Warnzeichen gefunden: Zeitdruck', skill: true },
            { t: 'Ein Insider, aber keine echte Quelle', log: 'Warnzeichen gefunden: keine echte Quelle', skill: true },
            { t: 'Keins – sieht seriös aus', log: 'Kein Warnzeichen gesehen', skill: false },
          ], frage: 'Welches Warnzeichen siehst du zuerst?' },
          ['zoe', 'Alle sechs sind drin. Großbuchstaben, Gefühl, keine Quelle, „teilt das“, Zeitdruck, und es klingt zu krass. Das allein heißt noch nicht „fake“. Aber: Ab jetzt wird geprüft.'],
        ],
      },
      {
        ziel: 'Spur 2: Das Foto. Zum Lesesaal – an einen großen Bildschirm.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { chloe: [15.4, -58.4] },
        zeilen: [
          ['chloe', 'Lass mal groß machen. Ich hab in Informatik was über KI-Bilder gelernt.'],
          ['e', 'Vergrößert: Die Spitzen der Gabel laufen ineinander. Auf dem Tablett steht ein Logo – aber die Buchstaben ergeben keinen Sinn. Und die Teller in der Annexe sind blau, nicht weiß.'],
          { wahl: [
            { t: 'Wahrscheinlich KI-gemacht. Zu viele Fehler, und es passt nicht zu unserer Kantine.', log: 'Das Foto als wahrscheinlich KI-gemacht eingeschätzt – mit Gründen', skill: true },
            { t: 'Ein Foto lügt nicht.', log: 'Dem Foto geglaubt', folge: 'Chloé: „Früher vielleicht.“', skill: false },
          ] },
          ['chloe', 'Aber Achtung: Gute KI-Bilder haben oft gar keine Fehler mehr. Darum zählt die Quelle mehr als das Bild.'],
          ['chloe', 'Die Bild-Rückwärtssuche findet nichts. Das beweist allein noch nichts – auch neue echte Fotos findet sie nicht.'],
        ],
      },
      {
        ziel: 'Spur 3: Wer berichtet noch darüber? Frag dort, wo es passiert sein soll – hinter der Kantine.', ort: 'Hinterhof der Kantine', p: [30.2, -11.4], leute: {},
        zeilen: [
          ['paulo', 'Würmer? In meinem Gemüse? Ich bring jeden Morgen um sieben. Die Köchin kontrolliert jede Kiste. Letzte Woche war die Lebensmittelkontrolle hier. Alles in Ordnung.'],
          ['e', 'Du schaust nach: Auf der Seite der Gemeinde steht kein Wort. In den Nachrichten: nichts. Kein anderer berichtet darüber.'],
          ['paulo', '(leiser) Die Köchin hat heute geweint. Ein Kind hat zu ihr gesagt: „Igitt, Wurm-Frau.“'],
          { moment: 'Wendung: Hinter dem Fake stand ein echter Mensch, der verletzt wurde – die Köchin.' },
        ],
      },
      {
        ziel: 'Dein Urteil. Zurück in die Halle zu Zoé.', ort: 'Halle', p: [-3.0, -5.6], leute: { finn: [-1.6, -6.8] },
        zeilen: [
          { wahl: [
            { t: 'Fake.', log: 'Urteil: Fake' },
            { t: 'Wahrscheinlich fake – aber ich sage, was ich geprüft habe.', log: 'Urteil: wahrscheinlich fake, mit drei Spuren begründet', skill: true },
            { t: 'Echt.', log: 'Urteil: echt', skill: false },
          ], frage: 'Echt oder fake?' },
          ['finn', '(kleinlaut) Okay. Ich sag’s euch. Das Konto war von mir. Das Bild hab ich mit einer KI-App gemacht. Ich wollte nur sehen, ob’s jemand glaubt.'],
          { wahl: [
            { t: '„Es haben 300 Leute geglaubt. Und die Köchin hat geweint. Lösch es und sag ihr sorry.“', log: 'Finn die Folgen gezeigt und eine Wiedergutmachung vorgeschlagen', folge: 'Finn wird rot. „Kommst du mit zu ihr?“', skill: true },
            { t: '„Ist doch nur ein Witz. Lösch es halt.“', log: 'Den Fake kleingeredet', folge: 'Finn löscht es. Bei der Köchin entschuldigt sich keiner.', skill: false },
          ] },
          { wenn: (f) => f.geteilt, dann: [
            ['zoe', 'Du hattest es übrigens auch geteilt. Heute früh.'],
            { wahl: [
              { t: 'Löschen und darunter schreiben: „Hab’s geprüft: Das ist ein Fake. Sorry fürs Teilen.“', log: 'Den eigenen geteilten Fake gelöscht und korrigiert', folge: 'Drei Leute löschen es danach auch.', skill: true },
              { t: 'Still löschen.', log: 'Den eigenen geteilten Fake still gelöscht', folge: 'Die 40, die es von dir haben, wissen nichts davon.', skill: null },
            ] },
          ] },
          ['zoe', 'Ich schreib morgen in Annexe News: „Wie ein Fake in 3 Stunden 300 Leute erreicht.“ Darf ich deine drei Spuren nehmen?'],
          { skala: 'Wie sicher fühlst du dich jetzt, ein Fake zu erkennen?', links: 'gar nicht', rechts: 'sehr' },
          { notiz: 'Meine zwei Fragen, bevor ich etwas teile:', platz: 'Wer sagt das? Wer berichtet noch darüber?' },
        ],
      },
    ],
    ende: [['zoe', '(gibt dir eine goldene Brille) Die Annexe-News-Brille. Für Leute, die zweimal hinschauen.']],
    resuemee: { frage: 'Warum sind Fakes schneller als die Wahrheit – und was bremst euch, bevor ihr teilt?', satz: 'Bevor ich etwas teile, prüfe ich: …' },
  },
};
