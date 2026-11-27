// REAL TALK #07 „Netz“ – drei Missionen (Format: kursmission.js). Skills der Stunden: Gratis-Apps verdienen an deiner Zeit;
// drei Tricks (Clip startet von selbst, Ping, Flamme/Streak) und ein Wenn-dann-Plan · Was du schickst, bleibt (Versteck-Kette);
// Druck klingt oft nett („Nur für mich“); Handgriffe: Screenshot, blockieren, melden, jemandem zeigen · Fakes: sechs Warnzeichen
// und zwei Fragen (Wer sagt das? Wer berichtet noch darüber?). Alle Personen und Konten erfunden. Hilfe: BEE SECURE 8002 1234.
export default {
  // ---------- Stunde 1 · Wer scrollt wen? ----------
  'SCROLL-1': {
    start: [
      ['e', 'Gratis-App, die an deiner Zeit verdient. Heute hält sie dich dreimal fest.'],
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
          ['e', 'Trick 1: Der nächste Clip startet von selbst. Es gibt kein Ende.'],
          { wenn: (f) => f.bus, dann: [['nik', 'Zu meiner Zeit gab’s nur ein Programm. Und das hat um Mitternacht aufgehört.']] },
        ],
      },
      {
        ziel: 'Nach der Schule: Korbfeld. Lio wartet zum Eins-gegen-eins.', ort: 'Korbfeld', p: [28.6, 22.4], leute: { lio: [30.2, 21.4, null, 'redet'] },
        zeilen: [
          ['lio', 'Bis elf. Verlierer holt Wasser.'],
          ['e', 'Es steht 6:6. Dein Handy vibriert. „Malik hat etwas Neues gepostet.“ Dann noch mal: „3 Leute haben deinen Clip geliked.“'],
          { wahl: [
            { t: 'Kurz nachschauen.', log: 'Mitten im Spiel aufs Handy geschaut', folge: 'Aus kurz werden vier Minuten. Lio wirft allein auf den Korb. „Schon gut.“', skill: false },
            { t: 'Weiterspielen.', log: 'Die Pings ignoriert und weitergespielt', folge: 'Du verlierst 9:11. Aber es war ein richtig gutes Spiel.', skill: true },
          ] },
          ['e', 'Trick 2: Pings holen dich zurück, wenn du gerade woanders bist.'],
          ['lio', 'Ich hab alle Pings aus. Bis auf Anrufe. Seitdem merk ich erst, wie oft das vorher war.'],
          { wahl: [
            { t: 'Pings jetzt ausschalten.', log: 'Die Pings von annexe.cam ausgeschaltet', folge: 'Drei Schalter. Zehn Sekunden.', skill: true, setze: { pingAus: true } },
            { t: 'Lieber nicht. Ich verpass was.', log: 'Die Pings angelassen', skill: null },
          ] },
        ],
      },
      {
        ziel: 'Abends, zu Hause im Bett. 22:47.', ort: 'Zu Hause', p: null, leute: {},
        zeilen: [
          ['h:annexe.cam', '🔥 Deine 112-Tage-Flamme mit Malik erlischt in 1 Stunde! Schick jetzt ein Bild!'],
          ['e', 'Du bist müde. Morgen ist Mathe-Test. Aber 112 Tage …'],
          { wahl: [
            { t: 'Schwarzes Bild. Weiterscrollen.', log: 'Für die Flamme ein Bild geschickt und weitergescrollt', folge: 'Es ist 0:20, als du das Handy weglegst.', skill: false, setze: { spaet: true } },
            { t: 'Flamme ausgehen lassen.', log: 'Die Flamme ausgehen lassen und das Handy weggelegt', folge: 'Komisch, aber du schläfst nach zehn Minuten.', skill: true },
            { t: 'Malik: „Flamme ausgehen lassen?“', log: 'Mit Malik über die Flamme geredet', folge: 'Malik: „Ehrlich? Ja. Ich mach das nur noch für die Zahl.“', skill: true, dann: [{ moment: 'Wendung: Malik hat die Flamme auch nur noch für die Zahl gemacht. Keiner von beiden wollte sie wirklich.' }] },
          ] },
          ['e', 'Trick 3: Die Flamme macht Angst, etwas zu verlieren. Jetzt dein Plan. Ein Wenn-dann für deinen schwierigsten Moment am Handy.'],
          { wahl: [
            { t: 'Bett: Handy auf den Schreibtisch.', log: 'Wenn-dann-Plan: Handy abends auf den Schreibtisch' },
            { t: 'Bus: Handy in der Tasche.', log: 'Wenn-dann-Plan: an der Haltestelle Handy in der Tasche' },
            { t: 'Mit Leuten: Handy umgedreht.', log: 'Wenn-dann-Plan: mit Leuten Handy umgedreht' },
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

  // ---------- Stunde 2 · Für immer online → Nur für mich (neu 27.11.2026: Foto-Bitte beim Zocken, Versteck-Kette) ----------
  'ONLINE-2': {
    start: [
      ['h:Jade', 'Bist du wach? Kurz Hilfe. Beim Zocken schreibt mir einer. Seit drei Wochen. Er ist echt nett.'],
      ['e', 'Druck klingt selten wie Druck. Meistens klingt er nett.'],
    ],
    schritte: [
      {
        ziel: 'Abends: Jade schreibt dir.', ort: 'Am Handy', p: null, leute: {},
        zeilen: [
          ['h:Jade', 'Er sagt, er ist 14. Er hat mir einen Skin geschenkt. Jetzt will er ein Foto. „Nur für mich.“'],
          ['h:Jade', 'Was soll ich schreiben?'],
          { wahl: [
            { t: '„Schreib: Nee.“', log: 'Jade geraten: einfach Nein schreiben', folge: 'Jade: „Einfach nee? … Okay.“', skill: true, setze: { rat: 'nee' } },
            { t: '„Frag ihn: Wozu?“', log: 'Jade geraten, nachzufragen', folge: 'Jade: „Er schreibt: Weil du hübsch bist. 🙈“', skill: null, setze: { rat: 'wozu' } },
            { t: '„Eins ohne Gesicht geht.“', log: 'Jade geraten: ein Foto ohne Gesicht', folge: 'Jade: „Stimmt. Ohne Gesicht ist ja nichts.“', skill: false, setze: { rat: 'ohneGesicht' } },
            { t: '„Schreib erst mal nichts.“', log: 'Jade geraten, erst mal nicht zu antworten', folge: 'Jade: „Er schreibt schon wieder.“', skill: null, setze: { rat: 'nichts' } },
          ], frage: 'Was rätst du Jade?' },
          ['h:Jade', 'Jetzt schreibt er: „Vertraust du mir nicht?“ Und: „Dachte, du bist anders.“'],
          { wahl: [
            { t: 'Druck.', log: 'In den netten Sätzen den Druck erkannt', folge: 'Ja. Jede Nachricht schiebt ein Stück weiter.', skill: true },
            { t: 'Er ist halt traurig.', log: 'Den Druck für Traurigkeit gehalten', folge: 'Genau so soll es klingen.', skill: false },
            { t: 'Eine normale Bitte.', log: 'Den Druck für eine Bitte gehalten', folge: 'Eine Bitte darf man ablehnen – ohne „Dachte, du bist anders“.', skill: false },
          ], frage: 'Was hörst du in diesen Sätzen?' },
          { wenn: (f) => f.rat === 'ohneGesicht', dann: [
            ['h:Jade', 'Ich hab eins geschickt. Ohne Gesicht. Jetzt schreibt er: „Noch eins. Sonst zeig ich allen das hier.“'],
            { setze: { erpressung: true } },
            { moment: 'Aus „nur für mich“ wurde eine Erpressung. Schuld ist der, der drängt – nicht Jade.' },
          ] },
          { wahl: [
            { t: 'Screenshot.', log: 'Handgriff 1: zuerst Beweise gesichert', folge: 'Beweis gesichert. Jetzt erst blockieren.', skill: true },
            { t: 'Sofort blockieren.', log: 'Sofort blockiert – vor dem Screenshot', folge: 'Blockieren ist richtig. Aber dann ist der Chat weg. Erst der Screenshot.', skill: null },
            { t: 'Ihm die Meinung sagen.', log: 'Mit ihm diskutieren wollen', folge: 'Dann hat er noch mehr von Jade. Nicht diskutieren.', skill: false },
            { t: 'Chat löschen.', log: 'Den Chat gelöscht', folge: 'Dann fehlt der Beweis.', skill: false },
          ], frage: 'Was macht Jade zuerst?' },
          ['h:Jade', 'Okay. Screenshot. Blockiert. Gemeldet. Mir ist schlecht.'],
          { wahl: [
            { t: '„Morgen zu Herrn Lenz. Ich komm mit.“', log: 'Jade angeboten, morgen zusammen zu Herrn Lenz zu gehen', folge: 'Jade: „Okay. Aber du redest zuerst.“', skill: true, setze: { zuLenz: true } },
            { t: '„Sag’s jemandem bei dir zu Hause.“', log: 'Jade geraten, es zu Hause zu erzählen', folge: 'Jade: „Mach ich. Morgen früh.“', skill: true, setze: { zuLenz: true } },
            { t: '„Vergiss es einfach.“', log: 'Jade geraten, es zu vergessen', folge: 'Jade: „Kann ich nicht.“ Sie ist offline.', skill: false },
          ] },
        ],
      },
      {
        ziel: 'Am nächsten Tag: Jugendhaus. Herr Lenz hat ein Spiel.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { lenz: [27.2, 119.0, null, 'redet'], chloe: [24.4, 120.8], malik: [23.9, 119.4, null, 'handy'] },
        zeilen: [
          ['lenz', 'Chloé malt ein Bild. Jeder versteckt eine Kopie hier im Haus. Dann suchen wir alle.'],
          ['chloe', '(hält es hoch) Eine Kartoffel mit Brille. Kunst.'],
          { wahl: [
            { t: 'Alle fünf.', log: 'Tipp zur Versteck-Kette: alle fünf Kopien finden', skill: null },
            { t: 'Vier.', log: 'Tipp zur Versteck-Kette: vier Kopien', skill: null },
            { t: 'Drei oder weniger.', log: 'Tipp zur Versteck-Kette: drei oder weniger', skill: null },
          ], frage: 'Fünf Kopien. Wie viele findet ihr?' },
          ['e', 'Zehn Minuten suchen. Ihr findet vier. Herr Lenz zieht die fünfte aus seiner Jacke.'],
          { moment: 'Versteck-Kette: Eine Kopie findet man nie. So ist es mit Bildern im Netz.' },
          ['malik', '(zeigt dir sein Handy) Guck mal: Finn pennt im Bus. Mund offen. Ich schick’s in die Gruppe, oder?'],
          { wahl: [
            { t: '„Wem gehört das Bild?“', log: 'Malik gefragt, wem das Bild gehört', folge: 'Malik: „Mir? … Nee. Finn.“ Er löscht es.', skill: true },
            { t: '„Frag Finn vorher.“', log: 'Malik geraten, Finn vorher zu fragen', folge: 'Finn schreibt zurück: „Bist du irre? Nee.“ Malik löscht es.', skill: true },
            { t: '„Haha, schick.“', log: 'Ein Bild weitergeschickt, das nicht meins war', folge: 'Nach zehn Minuten hat es die halbe Klasse. Finn sieht es nach dem Aufwachen.', skill: false, setze: { finnFoto: true } },
          ] },
          { wenn: (f) => f.finnFoto, dann: [['chloe', '(leise) Und wie viele Kopien gibt es jetzt von Finn?'], { moment: 'Du hast selbst ein Bild weitergeschickt, das nicht deins war.' }] },
        ],
      },
      {
        ziel: 'Innenhof. Jade wartet.', ort: 'Innenhof', p: [-24.0, -40.0], leute: { jade: [-22.6, -39.4], lenz: [-25.4, -40.8, null, 'redet'] },
        zeilen: [
          { wenn: (f) => f.zuLenz, dann: [['jade', 'Ich hab’s ihm gezeigt. Den ganzen Chat.']], sonst: [['e', 'Jade sitzt allein auf der Bank. Herr Lenz setzt sich dazu.']] },
          ['lenz', 'Wem zeigt man so einen Chat?'],
          { wahl: [
            { t: 'Herrn Lenz', log: 'Vertrauensperson für den Chat: Herr Lenz', skill: true },
            { t: 'Dem SePAS', log: 'Vertrauensperson für den Chat: SePAS', skill: true },
            { t: 'Freund oder Freundin', log: 'Vertrauensperson für den Chat: Freund oder Freundin', skill: true },
            { t: 'BEE SECURE 8002 1234', log: 'Hilfe für den Chat: BEE SECURE', skill: true },
          ] },
          { wenn: (f) => f.erpressung, dann: [['lenz', 'Bei „Sonst zeig ich allen …“ holen wir auch die Polizei dazu. Das ist eine Straftat. Von ihm – nicht von dir, Jade.']] },
          ['lenz', 'Merkt euch: Wer drängt, macht den Fehler. Nicht du.'],
          ['jade', '(leise) Der Knoten im Bauch war schon beim ersten „Nur für mich“ da.'],
          { notiz: 'Bevor ich etwas schicke, frage ich mich:', platz: 'Würde ich es auch der ganzen Klasse zeigen?' },
        ],
      },
    ],
    ende: [['jade', '(gibt dir eine dunkelblaue Mütze mit einem Mond) Für die Abende am Handy. Danke, dass du wach warst.']],
    resuemee: { frage: 'Wie klingt Druck, wenn er nett klingt – und was ist euer erster Handgriff?', satz: 'Bevor ich etwas schicke, frage ich mich: …' },
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
            { t: 'Keine echte Quelle', log: 'Warnzeichen gefunden: keine echte Quelle', skill: true },
            { t: 'Keins – sieht seriös aus', log: 'Kein Warnzeichen gesehen', skill: false },
          ], frage: 'Welches Warnzeichen siehst du zuerst?' },
          ['zoe', 'Alle sechs Warnzeichen sind drin. Das heißt noch nicht „fake“. Aber ab jetzt wird geprüft.'],
        ],
      },
      {
        ziel: 'Spur 2: Das Foto. Zum Lesesaal – an einen großen Bildschirm.', ort: 'Lesesaal', p: [14.0, -59.0], leute: { chloe: [15.4, -58.4] },
        zeilen: [
          ['chloe', 'Lass mal groß machen. Ich hab in Informatik was über KI-Bilder gelernt.'],
          ['e', 'Vergrößert: Die Spitzen der Gabel laufen ineinander. Auf dem Tablett steht ein Logo – aber die Buchstaben ergeben keinen Sinn. Und die Teller in der Annexe sind blau, nicht weiß.'],
          { wahl: [
            { t: 'Wahrscheinlich KI. Passt nicht.', log: 'Das Foto als wahrscheinlich KI-gemacht eingeschätzt – mit Gründen', skill: true },
            { t: 'Ein Foto lügt nicht.', log: 'Dem Foto geglaubt', folge: 'Chloé: „Früher vielleicht.“', skill: false },
          ] },
          ['chloe', 'Aber Achtung: Gute KI-Bilder haben oft gar keine Fehler mehr. Darum zählt die Quelle mehr als das Bild.'],
          ['chloe', 'Die Bild-Rückwärtssuche findet nichts. Das beweist allein noch nichts – auch neue echte Fotos findet sie nicht.'],
        ],
      },
      {
        ziel: 'Spur 3: Wer berichtet noch darüber? Frag dort, wo es passiert sein soll – hinter der Kantine.', ort: 'Hinterhof der Kantine', p: [30.2, -11.4], leute: {},
        zeilen: [
          ['paulo', 'Würmer? In meinem Gemüse? Die Köchin kontrolliert jede Kiste. Letzte Woche war die Kontrolle hier. Alles in Ordnung.'],
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
            { t: 'Wahrscheinlich fake. Mit Gründen.', log: 'Urteil: wahrscheinlich fake, mit drei Spuren begründet', skill: true },
            { t: 'Echt.', log: 'Urteil: echt', skill: false },
          ], frage: 'Echt oder fake?' },
          ['finn', '(kleinlaut) Okay. Ich sag’s euch. Das Konto war von mir. Das Bild hab ich mit einer KI-App gemacht. Ich wollte nur sehen, ob’s jemand glaubt.'],
          { wahl: [
            { t: '„Lösch es. Und sag der Köchin sorry.“', log: 'Finn die Folgen gezeigt und eine Wiedergutmachung vorgeschlagen', folge: 'Finn wird rot. „Kommst du mit zu ihr?“', skill: true },
            { t: '„Ist doch nur ein Witz. Lösch es halt.“', log: 'Den Fake kleingeredet', folge: 'Finn löscht es. Bei der Köchin entschuldigt sich keiner.', skill: false },
          ] },
          { wenn: (f) => f.geteilt, dann: [
            ['zoe', 'Du hattest es übrigens auch geteilt. Heute früh.'],
            { wahl: [
              { t: 'Löschen: „Ist ein Fake. Sorry.“', log: 'Den eigenen geteilten Fake gelöscht und korrigiert', folge: 'Drei Leute löschen es danach auch.', skill: true },
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
