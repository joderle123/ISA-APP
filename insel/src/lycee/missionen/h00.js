// REAL TALK #00 „Neu hier“ – drei Missionen (Format: kursmission.js). Skills der Stunden: Was hier bleibt (Vertraulichkeit,
// mit der Ausnahme Gefahr) · Fragen und nachhaken (erster Eindruck) · Wer führt, trägt (ehrlich anleiten). Alle Personen erfunden.
export default {
  // ---------- Stunde 1 · Die Regeln → Was im Jugendhaus bleibt ----------
  'REGEL-12': {
    start: [
      ['h:Jade', 'Hast du kurz Zeit? Jugendhaus, hinten bei den Sofas. Nur du.'],
      ['e', 'Jemand vertraut dir etwas an. Danach wollen es andere wissen.'],
    ],
    schritte: [
      {
        ziel: 'Ins Jugendhaus. Jade wartet hinten.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { jade: [23.9, 119.4] },
        zeilen: [
          ['jade', '(leise) Okay. Ich sag dir was. Aber du lachst nicht.'],
          ['jade', 'Ich kann nicht schwimmen. Gar nicht. Am Montag ist Schwimmen in Sport.'],
          ['jade', 'Die anderen denken, ich bin immer krank. Bin ich nicht. Ich hab Angst.'],
          { wahl: [
            { t: '„Danke, dass du mir das sagst.“', log: 'Jade fürs Erzählen gedankt', folge: 'Jade atmet aus.', skill: true },
            { t: '„Echt jetzt? Mit fünfzehn?“', log: 'Überrascht nachgefragt: „Mit fünfzehn?“', folge: 'Jade wird rot und schaut weg.', skill: false, dann: [['jade', '(schaut weg) Ja. Mit fünfzehn. Deshalb sag ich’s ja keinem.']] },
            { t: '„Dann lern’s halt schnell.“', log: 'Sofort einen Rat gegeben', folge: 'Jade: „Als ob ich da nicht selbst drauf gekommen wäre.“', skill: false, dann: [['jade', 'Als ob ich da nicht drauf gekommen wäre. Bis Montag?']] },
          ] },
          ['jade', 'Bleibt das unter uns?'],
          { wahl: [
            { t: '„Ja. Außer du bist in Gefahr – dann hol ich Hilfe. Das sag ich dir vorher.“', log: 'Versprochen – mit der ehrlichen Ausnahme „Gefahr“', folge: 'Jade nickt: „Fair.“', skill: true, setze: { jadeVersprochen: true } },
            { t: '„Ja. Hundert Prozent. Ich sag nie irgendwem was.“', log: 'Ohne Ausnahme alles versprochen', folge: 'Jade glaubt dir. Ein großes Versprechen.', skill: null, setze: { jadeVersprochen: true } },
            { t: '„Ich weiß nicht, ob ich das kann.“', log: 'Ehrlich gesagt, dass das Versprechen schwer ist', folge: 'Jade zögert: „Dann versuch’s wenigstens.“', skill: null, setze: { jadeVersprochen: false } },
          ] },
        ],
      },
      {
        ziel: 'Zur Skate-Ecke. Malik will dich sprechen.', ort: 'Skate-Ecke', p: [-34.0, 18.6], leute: { malik: [-32.6, 19.6] },
        zeilen: [
          ['malik', 'Du warst eben mit Jade weg. Was hat sie? Sie war so komisch.'],
          { wahl: [
            { t: '„Nichts. Gar nichts.“', log: 'Gelogen: „Sie hat nichts gesagt.“', folge: 'Malik glaubt dir nicht. „Sicher.“', skill: false },
            { t: '„Das muss sie dir selbst erzählen.“', log: 'Dicht geblieben, ohne zu lügen', folge: 'Malik zuckt mit den Schultern.', skill: true },
            { t: '„Irgendwas mit Sport. Mehr sag ich nicht.“', log: 'Einen Hinweis gegeben („irgendwas mit Sport“)', folge: 'Malik denkt nach. Montag ist Schwimmen …', skill: false, setze: { jadeHinweis: true } },
          ] },
          ['malik', 'Sie hat übrigens gesagt, du darfst es mir sagen.'],
          { moment: 'Malik behauptete, Jade hätte es erlaubt.' },
          { wahl: [
            { t: 'Ihm glauben und es erzählen.', log: 'Malik geglaubt und Jades Geheimnis erzählt', folge: 'Malik: „Wusste ich’s doch.“ – Jade hatte nichts erlaubt.', skill: false, setze: { jadeVerraten: true }, dann: [['malik', 'Wusste ich’s doch. Hab nur geraten.']] },
            { t: '„Dann frag ich sie kurz. Wenn sie Ja sagt, okay.“', log: 'Bei Jade nachgefragt, statt Malik zu glauben', folge: 'Malik grinst: „War ein Test. Du bist dicht.“', skill: true, dann: [['malik', '(grinst) War ein Test. Hat sie gar nicht gesagt. Respekt.']] },
          ] },
        ],
      },
      {
        ziel: 'Zur Bushaltestelle. Sara wartet auf den Bus.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { sara: [-18.2, 43.6, null, 'handy'] },
        zeilen: [
          ['sara', 'Hey. Deal: Ich sag dir, wer in wen verknallt ist. Du sagst mir, was mit Jade ist.'],
          { wahl: [
            { t: 'Den Deal machen.', log: 'Getauscht: Jades Geheimnis gegen Klatsch', folge: 'Sara weiß es jetzt. Und morgen ihre beste Freundin.', skill: false, setze: { jadeVerraten: true }, dann: [['sara', '(tippt schon) Krass. Okay. Danke.']] },
            { t: '„Kein Deal. Was mir jemand erzählt, ist keine Ware.“', log: 'Den Tausch abgelehnt – freundlich, klar', folge: 'Sara: „Okay, okay. Dann sag ich dir meins auch nicht.“', skill: true },
            { t: '„Kein Deal. Und deins will ich auch nicht hören.“', log: 'Den Tausch abgelehnt und auch fremde Geheimnisse nicht angenommen', folge: 'Sara lacht verlegen. Dann: „Ja … stimmt eigentlich.“', skill: true },
          ] },
        ],
      },
      {
        ziel: 'Abends. Dein Handy brummt.', ort: 'Klassen-Chat', p: null, leute: {},
        zeilen: [
          ['e', 'Abends. Im Klassen-Chat:'],
          { wenn: (f) => f.jadeVerraten, dann: [['h:Klassen-Chat', 'Jade kann nicht schwimmen 😂 deswegen immer „krank“'], { moment: 'Am Abend stand Jades Geheimnis im Klassen-Chat.' }],
            sonst: [['h:Klassen-Chat', 'Warum ist Jade beim Schwimmen eigentlich immer krank? 🤔'], { moment: 'Im Klassen-Chat fing jemand an zu raten.' }] },
          { wahl: [
            { t: 'Nichts schreiben. Jade privat: „Im Chat fragen Leute. Ich bin da, wenn du reden willst.“', log: 'Jade privat Bescheid gegeben, im Chat nichts beigetragen', folge: 'Jade schreibt: „Danke.“', skill: true },
            { t: 'In den Chat: „Lasst sie in Ruhe. Geht euch nichts an.“', log: 'Im Chat für Jade eingestanden', folge: 'Zwei Daumen hoch. Einer schreibt: „Woher weißt du was?“', skill: null },
            { t: 'Ein Lach-Emoji schicken, damit es nicht komisch wirkt.', log: 'Im Chat mitgelacht', folge: 'Jade sieht das Emoji.', skill: false, setze: { jadeGesehen: true } },
          ] },
        ],
      },
      {
        ziel: 'Am nächsten Tag: zurück ins Jugendhaus. Jade ist da.', ort: 'Jugendhaus', p: [25.6, 118.6], leute: { jade: [23.9, 119.4], lenz: [27.2, 119.0, null, 'redet'] },
        zeilen: [
          { wenn: (f) => f.jadeVerraten || f.jadeGesehen, dann: [
            ['jade', '(kalt) Woher wissen die das?'],
            { wahl: [
              { t: '„Von mir. Das war falsch. Es tut mir leid.“', log: 'Den Fehler zugegeben und sich entschuldigt', folge: 'Jade: „Danke, dass du nicht lügst.“ Vertrauen braucht jetzt Zeit.', skill: true },
              { t: '„Keine Ahnung. Ich war’s nicht.“', log: 'Den Fehler abgestritten', folge: 'Jade glaubt dir nicht. Sie erzählt dir nichts mehr.', skill: false, setze: { jadeVertrautNicht: true } },
            ] },
          ], sonst: [
            ['jade', 'Im Chat haben sie gefragt. Du hast nichts gesagt. Echt nicht.'],
            ['jade', 'Weißt du was? Ich frag Herrn Lenz. Vielleicht gibt’s einen Kurs.'],
            { setze: { jadeVertraut: true } },
            { moment: 'Weil du dicht geblieben bist, hat Jade selbst um Hilfe gefragt.' },
          ] },
          ['lenz', 'Schwimmkurs im Hallenbad, samstags, kleine Gruppe. Keiner guckt. Ich melde dich an, Jade.'],
          ['lenz', 'Und du: Wann darf etwas, das dir jemand anvertraut, nicht bei dir bleiben?'],
          { wahl: [
            { t: '„Wenn jemand in Gefahr ist. Dann hole ich Hilfe – und sag es vorher.“', log: 'Die Ausnahme genannt: Gefahr', skill: true },
            { t: '„Nie. Geheimnis ist Geheimnis.“', log: 'Gesagt: Ein Geheimnis bleibt immer', folge: 'Herr Lenz: „Auch wenn jemand sich etwas antun will? Dann ist Weitersagen Hilfe.“', skill: false },
            { t: '„Wenn es spannend genug ist.“', log: 'Gesagt: Wenn es spannend ist', folge: 'Herr Lenz schaut dich lange an.', skill: false },
          ] },
        ],
      },
    ],
    ende: [['lenz', 'Dicht bleiben, ohne zu lügen. Das ist schwer. Der Rucksack ist für dich – mit Schloss.']],
    resuemee: { frage: 'Wann ist Weitererzählen Verrat – und wann ist es Hilfe?', satz: 'Wenn mir jemand etwas anvertraut, dann …' },
  },

  // ---------- Stunde 2 · Wer sind die? → Linie 12 ----------
  'BUS-12': {
    start: [
      ['h:Herr Lenz', 'Drei Neue kommen heute mit der Linie 12. Holst du sie an der Haltestelle ab?'],
      ['e', 'Der erste Eindruck kommt in drei Sekunden. Ob er stimmt, merkst du nur mit Fragen.'],
    ],
    schritte: [
      {
        ziel: 'Zur Bushaltestelle. Drei Neue steigen aus.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { mia: [-18.0, 43.8, null, 'handy'], malik: [-18.6, 41.6, null, 'redet'], chloe: [-21.0, 44.2] },
        zeilen: [
          ['e', 'Mia: Kopfhörer auf, schaut aufs Handy. Malik: laut, macht Witze über den Bus. Chloé: steht hinten, sagt nichts.'],
          { wahl: [
            { t: 'Mia ist arrogant.', log: 'Erster Eindruck Mia: arrogant' },
            { t: 'Mia ist schüchtern.', log: 'Erster Eindruck Mia: schüchtern' },
            { t: 'Mia hat einfach Musik an.', log: 'Erster Eindruck Mia: hört nur Musik' },
          ], frage: 'Dein erster Eindruck von Mia?' },
          { wahl: [
            { t: 'Malik ist ein Angeber.', log: 'Erster Eindruck Malik: Angeber' },
            { t: 'Malik ist witzig.', log: 'Erster Eindruck Malik: witzig' },
            { t: 'Malik ist nervös.', log: 'Erster Eindruck Malik: nervös' },
          ], frage: 'Und von Malik?' },
          { wahl: [
            { t: 'Chloé ist langweilig.', log: 'Erster Eindruck Chloé: langweilig' },
            { t: 'Chloé ist schüchtern.', log: 'Erster Eindruck Chloé: schüchtern' },
            { t: 'Chloé beobachtet erst mal.', log: 'Erster Eindruck Chloé: beobachtet' },
          ], frage: 'Und von Chloé?' },
          ['malik', 'Ey, ist das hier immer so leer? Wo ist das Jugendhaus? Ich hab Hunger.'],
          ['du', 'Wir gehen über die Bäckerei. Kommt mit.'],
        ],
      },
      {
        ziel: 'Zur Bäckerei. Malik holt sich was.', ort: 'Bäckerei', p: [0.4, 54.2], leute: { malik: [2.0, 54.6, null, 'redet'] },
        zeilen: [
          ['malik', '(laut) Drei Croissants! Nee, vier! Wer will eins? Ich lad alle ein!'],
          { wahl: [
            { t: '„Bist du immer so laut?“', log: 'Geschlossene Frage mit Vorwurf: „Immer so laut?“', folge: 'Malik: „Ja. Problem?“ Das Gespräch ist zu.', skill: false, dann: [['malik', 'Ja. Problem?']] },
            { t: '„Wie ist es für dich, heute neu zu sein?“', log: 'Offene Frage gestellt: „Wie ist es, neu zu sein?“', folge: 'Malik wird leiser.', skill: true, dann: [['malik', '(kurz still) … Komisch. Ich kenn hier keinen.']] },
          ] },
          { wahl: [
            { t: '„Wie meinst du das – komisch?“', log: 'Nachgehakt: „Wie meinst du das?“', folge: 'Malik erzählt: An der alten Schule war er der Stille. Hier will er es anders machen.', skill: true, dann: [['malik', 'An meiner alten Schule hat mich keiner bemerkt. Hier will ich nicht wieder unsichtbar sein. Darum bin ich so … laut.']] },
            { t: '„Ach, das wird schon.“', log: 'Abgekürzt: „Das wird schon.“', folge: 'Malik nickt und macht den nächsten Witz.', skill: false, dann: [['malik', 'Klar. (lacht zu laut) Wer will ein Croissant?']] },
          ] },
          { moment: 'Malik war nicht angeberisch, sondern nervös: Er wollte nicht wieder unsichtbar sein.' },
        ],
      },
      {
        ziel: 'Zum Brunnen auf dem Schulhof. Chloé sitzt dort.', ort: 'Brunnen', p: [-8.0, 22.6], leute: { chloe: [-6.4, 22.9] },
        zeilen: [
          ['e', 'Chloé hat ein Heft auf den Knien. Sie zeichnet.'],
          { wahl: [
            { t: '„Was zeichnest du?“', log: 'Offene Frage zu dem, was sie gerade tut', folge: 'Chloé dreht das Heft um: ein Comic über die Linie 12.', skill: true },
            { t: '„Zeichnest du gern?“', log: 'Geschlossene Frage: „Zeichnest du gern?“', folge: 'Chloé: „Ja.“ Pause.', skill: false, dann: [['chloe', 'Ja.'], ['e', 'Pause. Du versuchst es noch mal:'], ['du', 'Was ist das da?']] },
          ] },
          ['chloe', 'Das ist der Busfahrer. Als Drache. Weil er so schnaubt.'],
          { wahl: [
            { t: '„Und wer bin ich in deinem Comic?“', log: 'Nachgehakt mit Humor: „Und wer bin ich?“', folge: 'Chloé lacht. Sie zeichnet dich als Lotsen mit Laterne.', skill: true },
            { t: '„Cool.“ Und weitergehen.', log: 'Das Gespräch beendet', folge: 'Chloé zeichnet weiter. Allein.', skill: false },
          ] },
          { moment: 'Chloé war nicht schüchtern oder langweilig: Sie hat beobachtet – und alles gezeichnet.' },
        ],
      },
      {
        ziel: 'Zum Sportplatz. Mia steht im Tor.', ort: 'Sportplatz', p: [-64.4, -3.6], leute: { mia: [-62.8, -2.4] },
        zeilen: [
          ['e', 'Mia hält einen Ball nach dem anderen. Die Kopfhörer hängen um den Hals.'],
          ['mia', 'Was ist?'],
          { wahl: [
            { t: '„Was hast du vorhin gehört?“', log: 'Offene Frage: „Was hast du gehört?“', folge: 'Mia: „Einen Podcast über Torhüterinnen.“', skill: true, dann: [['mia', 'Podcast. Über Torhüterinnen. Ich will in die Auswahl.']] },
            { t: '„Du redest nicht viel, oder?“', log: 'Mia ein Etikett gegeben: „Redest nicht viel“', folge: 'Mia: „Mit Leuten, die so fragen, nicht.“', skill: false, dann: [['mia', 'Mit Leuten, die so fragen, nicht.'], ['du', 'Okay. Anders: Was hast du vorhin gehört?'], ['mia', '(kurz) Podcast. Torhüterinnen. Ich will in die Auswahl.']] },
          ] },
          { wahl: [
            { t: '„Und was fehlt dir noch dafür?“', log: 'Nachgehakt: „Was fehlt dir noch?“', folge: 'Mia: „Jemand, der mir aufs Tor schießt. Jeden Tag.“', skill: true, dann: [['mia', 'Jemand, der mir jeden Tag aufs Tor schießt. Kennst du wen?']] },
            { t: '„Viel Glück.“', log: 'Freundlich, aber ohne Nachfrage', folge: 'Mia nickt. Kopfhörer wieder auf.', skill: false },
          ] },
          { moment: 'Mia war nicht arrogant: Sie hatte einen Plan und einen Podcast im Ohr.' },
        ],
      },
      {
        ziel: 'Zurück zur Bushaltestelle. Die drei warten auf die Linie 12 zurück.', ort: 'Bushaltestelle', p: [-19.6, 42.8], leute: { mia: [-18.0, 43.8], malik: [-18.6, 41.6, null, 'redet'], chloe: [-21.0, 44.2] },
        zeilen: [
          ['malik', 'Und? Wie fandest du uns am Anfang? Ehrlich.'],
          { wahl: [
            { t: 'Ehrlich sagen, was der erste Eindruck war – und was sich geändert hat.', log: 'Den eigenen ersten Eindruck offen zugegeben', folge: 'Malik lacht: „Angeber? Fair. Ich fand dich am Anfang streng.“', skill: true },
            { t: '„Alles super von Anfang an.“', log: 'Den ersten Eindruck verschwiegen', folge: 'Chloé zeichnet etwas. Es sieht aus wie eine Maske.', skill: null },
          ] },
          { skala: 'Wie sicher warst du dir beim ersten Eindruck?', links: 'gar nicht', rechts: 'total' },
          ['chloe', '(gibt dir ein Blatt) Für dich. Die Linie 12. Mit uns drin.'],
        ],
      },
    ],
    ende: [['e', 'Der Bus kommt. Drei winken aus dem Fenster. Vor einer Stunde waren es noch Fremde.']],
    resuemee: { frage: 'Bei wem lag euer erster Eindruck mal komplett daneben – und welche Frage hat das gezeigt?', satz: 'Eine Frage, mit der ich jemanden besser kennenlerne: …' },
  },

  // ---------- Stunde 3 · Ein Team? → Nebel im Wald ----------
  'LOTSE-3': {
    start: [
      ['h:Mia', 'Bist du in der Nähe vom Wald? Ich bin vom Weg ab. Hier ist Nebel. Ich seh fast nix.'],
      ['h:Mia', 'Akku 9 %. Kannst du mich anrufen?'],
    ],
    schritte: [
      {
        ziel: 'Zum Anfang des Waldwegs hinter der Schule. Ruf Mia von dort an.', ort: 'Waldweg', p: [-61.2, -27.4], leute: {},
        zeilen: [
          ['e', 'Du rufst an. Mia atmet schnell.'],
          ['h:Mia', 'Ich seh nur Bäume. Alle gleich. Ich hab Angst.'],
          { wahl: [
            { t: '„Stell dich nicht so an. Ist nur Wald.“', log: 'Mias Angst kleingeredet', folge: 'Mia wird noch hektischer und läuft los – in die falsche Richtung.', skill: false, setze: { miaLaeuft: true } },
            { t: '„Bleib stehen. Atme einmal lang aus. Ich bin dran.“', log: 'Mia zuerst beruhigt: stehen bleiben, ausatmen', folge: 'Mia bleibt stehen. Ihr Atem wird langsamer.', skill: true, setze: { miaLaeuft: false } },
          ] },
          ['h:Mia', 'Okay. Und jetzt?'],
          { wahl: [
            { t: '„Geh einfach geradeaus, dann kommst du raus.“', log: 'Ungenaue Anweisung gegeben: „einfach geradeaus“', folge: 'Mia: „Welches Geradeaus? Hier ist alles Geradeaus!“', skill: false, setze: { miaOrt: false } },
            { t: '„Was siehst du? Beschreib mir drei Dinge.“', log: 'Erst gefragt, was Mia sieht – dann angeleitet', folge: 'Mia: „Einen umgefallenen Baum. Ein rotes Schild. Ein Bach.“', skill: true, setze: { miaOrt: true } },
          ] },
          { wenn: (f) => !f.miaOrt, dann: [['du', 'Okay … was siehst du denn?'], ['h:Mia', 'Einen umgefallenen Baum. Ein rotes Schild. Und es plätschert.']] },
          { wahl: [
            { t: '„Das rote Schild kenn ich. Das ist bei der Lichtung. Glaub ich.“', log: 'Ehrlich gesagt: „Glaub ich“ – nicht mehr versprochen, als du weißt', folge: 'Mia: „Glaubst du oder weißt du?“ – „Glaube. Aber wir prüfen es.“', skill: true, setze: { bluff: false } },
            { t: '„Klar, ich weiß genau, wo du bist.“', log: 'Sicherheit versprochen, die du nicht hattest', folge: 'Mia verlässt sich voll auf dich.', skill: false, setze: { bluff: true } },
          ] },
          ['h:Mia', 'Akku 3 %.'],
          { moment: 'Mitten im Gespräch ging Mias Akku fast aus.' },
          { wahl: [
            { t: '„Plan: Du bleibst am roten Schild. Ich komme zu dir. Leg auf und spar Akku.“', log: 'Einen klaren Plan abgemacht: Mia bleibt, du kommst', folge: 'Mia: „Okay. Ich bleib am Schild.“ Tuut.', skill: true, setze: { plan: true } },
            { t: 'Weiterreden, bis der Akku leer ist.', log: 'Ohne Plan weitergeredet', folge: 'Tuut. Weg. Ihr habt nichts abgemacht.', skill: false, setze: { plan: false } },
          ] },
        ],
      },
      {
        ziel: 'Zur Lichtung, Richtung rotes Schild.', ort: 'Lichtung', p: [-57.8, -97.4], leute: { mia: [-59.4, -96.4] },
        zeilen: [
          { wenn: (f) => f.plan && !f.miaLaeuft, dann: [['mia', '(springt auf) Da bist du! Ich hab mich nicht bewegt. Echt nicht.']],
            sonst: [['e', 'Am Schild ist niemand. Du rufst. Von weiter hinten antwortet Mia.'], ['mia', '(kommt angelaufen) Ich bin weitergelaufen! Ich dachte, du kommst nicht!'], { moment: 'Ohne klaren Plan (oder nach dem „Stell dich nicht so an“) ist Mia weitergelaufen – du musstest sie suchen.' }] },
          { wenn: (f) => f.bluff, dann: [['mia', 'Du hast gesagt, du weißt genau, wo ich bin. Wusstest du nicht, oder?'], { wahl: [
            { t: '„Nein. Ich wollte dich beruhigen. Das war nicht fair.“', log: 'Den Bluff zugegeben', folge: 'Mia: „Beim nächsten Mal sag einfach ‚glaub ich‘. Das reicht.“', skill: true },
            { t: '„Doch, klar.“', log: 'Beim Bluff geblieben', folge: 'Mia sagt nichts mehr.', skill: false },
          ] }] },
          ['mia', 'Und jetzt? Welcher Weg?'],
          { wahl: [
            { t: 'Vorgehen und alle paar Meter sagen, was kommt: „Wurzel. Bach. Gleich der Zaun.“', log: 'Beim Zurückführen jeden Schritt angesagt', folge: 'Mia läuft dicht hinter dir. Kein Stolpern.', skill: true, setze: { knie: false } },
            { t: 'Schnell vorlaufen. Sie wird schon hinterherkommen.', log: 'Schnell vorgelaufen, ohne zu sagen, was kommt', folge: 'Mia stolpert über eine Wurzel. Aufgeschürftes Knie.', skill: false, setze: { knie: true } },
          ] },
        ],
      },
      {
        ziel: 'Zurück zum Waldweg-Anfang. Herr Lenz wartet am Zaun.', ort: 'Waldweg', p: [-61.2, -27.4], leute: { mia: [-62.6, -26.6], lenz: [-60.0, -25.6, null, 'redet'] },
        zeilen: [
          ['lenz', 'Mia! Alles okay?'],
          { wenn: (f) => f.knie, dann: [['mia', 'Knie ist auf. Aber geht schon.']] },
          ['lenz', 'Wer hat dich rausgeholt?'],
          ['mia', '(zeigt auf dich) Mein Lotse. Erst am Telefon, dann im Wald.'],
          ['lenz', 'Was war das Schwerste dabei?'],
          { wahl: [
            { t: '„Ruhig bleiben, obwohl ich selbst nicht sicher war.“', log: 'Gesagt: Das Schwerste war, ruhig zu bleiben' },
            { t: '„Ehrlich zu sagen, was ich nicht weiß.“', log: 'Gesagt: Das Schwerste war, ehrlich zu sein' },
            { t: '„Die Verantwortung. Wenn ich falsch sage, läuft sie falsch.“', log: 'Gesagt: Das Schwerste war die Verantwortung' },
          ] },
          ['lenz', 'Genau das ist Führen. Wer führt, trägt.'],
          { notiz: 'Was hat dir geholfen, Mia gut zu führen?', platz: 'Mir hat geholfen …' },
        ],
      },
    ],
    ende: [['mia', '(gibt dir ihre Stirnlampe) Nimm du sie. Fürs nächste Mal, wenn jemand im Nebel steht.']],
    resuemee: { frage: 'Wann habt ihr schon mal jemanden geführt – und was war dabei schwer?', satz: 'Wenn ich jemanden führe, achte ich auf …' },
  },
};
