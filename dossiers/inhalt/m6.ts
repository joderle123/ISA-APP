// REAL TALK #06 · ÄRGER – Modul 6 (Wenn es schwierig wird, Einheiten 24–26).
import type { Heft } from '../typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Heft = {
  id: 'm6', nr: '06', datei: 'Real-Talk-06-Aerger',
  thema: 'Ärger', headline: 'Wenn es kracht.', farbe: '#FFD60A', stand: 'November 2026',
  cover: {
    bild: 'peep:finn:wuetend:stehen-verschraenkt', sticker: 'Beide Seiten',
    zeilen: ['Hai, Teddybär, Eule: Wie streitest du?', '„Oder hast du Schiss?“ – drei Sekunden Gruppendruck', 'Einmal geklickt: Was Zuschauer anrichten', 'Vier Arten, Nein zu sagen – eine passt zu dir'],
  },
  ansage: {
    text: [
      'Streit, Druck, Mobbing. Du kennst alles davon. Wahrscheinlich von mehr als einer Seite.',
      'In diesem Heft geht es nicht darum, wer schuld ist. Es geht um die **drei Sekunden**, in denen sich entscheidet, wie eine Sache ausgeht: Schlägst du zu oder gehst du? Machst du mit oder sagst du Nein? Lachst du – oder nicht?',
      'Niemand ist nur Opfer oder nur Täter. Die meisten sind **Zuschauer**. Und genau die entscheiden, wie es weitergeht.',
    ],
    zitat: 'Drei Sekunden. ==Deine Entscheidung.==',
    so: [['Szene', 'Eine kurze Geschichte. Lies sie und sag, was du siehst.'], ['Fakten + Clip', 'Drei Dinge, die dahinterstecken. Dazu ein Video per QR-Code.'], ['Mythos / Real', 'Was alle sagen – und was stimmt.'], ['Dein Move', 'Jetzt du: entscheiden, die Rechnung aufmachen, üben.']],
    regeln: [
      '**Echte Streits aus der Gruppe werden hier nicht verhandelt.** Gespielt wird mit erfundenen Fällen.',
      '**Niemand wird nach eigenen Erlebnissen gefragt.** Weder als Opfer noch als Täter.',
      '**Stopp heißt Stopp.** In jedem Rollenspiel. Für jeden.',
    ],
  },
  cast: [
    { bild: 'peep:finn:wuetend', name: 'Finn, 15', x: 'Will jeden Streit gewinnen. Hat danach meistens einen Freund weniger.' },
    { bild: 'peep:lina:froh', name: 'Lina, 16', x: 'Gibt immer nach, damit Ruhe ist. Die Wut hebt sie für später auf.' },
    { bild: 'peep:ben:besorgt', name: 'Ben, 15', x: 'Wollte nie klauen. Wollte nur nicht der Einzige sein, der Nein sagt.' },
    { bild: 'peep:noah:neutral', name: 'Noah, 15', x: 'Hat einen Clip weitergeleitet. Fand ihn lustig. Bis er ihr Gesicht gesehen hat.' },
  ],
  warm: {
    titel: 'Soundcheck', text: 'Zwei schnelle Fragen. Kein Richtig, kein Falsch.',
    fragen: [
      { f: 'Wenn es Streit gibt, dann … (kreise ein)', kreis: ['werde ich laut', 'gehe ich weg', 'gebe ich nach', 'rede ich es aus', 'schlucke ich es runter', 'kommt drauf an, mit wem'] },
      { f: 'Wie oft machst du etwas mit, obwohl du nicht willst?', strich: ['nie', 'ständig'] },
    ],
  },
  tracks: [
    {
      nr: 24, titel: 'Hai oder Eule', unter: 'Fünf Arten zu streiten – und nur eine, bei der keiner verliert',
      kurz: 'Wie du streitest – und wie ein Streit gut ausgeht.',
      szene: {
        bild: 'peep:finn:wuetend', name: 'Finn, 15',
        text: 'Finn und Lina sollen zusammen ein Plakat machen. Finn hat eine Idee und zieht sie durch. Lina sagt dreimal: „Können wir nicht …?“ Dreimal sagt Finn: „Nee, so ist besser.“ Lina zuckt die Schultern: „Mach halt.“ Am Tag der Abgabe fehlt Linas Teil. „Hab ich vergessen“, sagt sie und lächelt. Finn tobt. Lina auch – nur leiser, und schon seit drei Wochen.',
        frage: 'Wer hat diesen Streit gebaut: der Hai oder der Teddybär?',
      },
      faktenTitel: 'Fünf Tiere',
      fakten: [
        { t: 'Hai und Schildkröte', x: 'Der **Hai** will gewinnen, egal was es kostet. Die **Schildkröte** zieht sich zurück und sagt nichts.' },
        { t: 'Teddybär und Fuchs', x: 'Der **Teddybär** gibt nach, damit Ruhe ist. Der **Fuchs** handelt: Jeder gibt ein Stück ab.' },
        { t: 'Eule', x: 'Die **Eule** fragt: Was brauchst du, was brauche ich? Sie sucht die Lösung, mit der **beide** leben können.' },
      ],
      clip: { titel: 'Die 9 Konfliktstufen nach Friedrich Glasl', kanal: 'Simon Josef Eckert', url: YT + 'Sfc9f2Ubr_E', dauer: 'die ersten 5 Min.', frage: 'Bis zu welcher Stufe können zwei einen Streit noch selbst lösen?' },
      mythen: [
        ['Der Klügere gibt nach.', 'Wer immer nachgibt, sammelt Wut. Die kommt später raus – oft an der falschen Stelle.'],
        ['Einen Streit muss man gewinnen.', 'Wer gewinnt, hat einen Verlierer. Und der merkt sich das.'],
        ['Guter Streit geht ohne Wut.', 'Wut gehört dazu. Erst runter unter 70 – dann reden.'],
      ],
      merk: 'Erst runter. ==Dann Eule.==',
      moveUnter: 'Kenn dein Streit-Tier',
      moves: [
        {
          titel: 'Wie viel Tier steckt in mir?', wie: 'allein', zeit: '5 Min.',
          kontext: 'Jeder hat alle fünf in sich. Nur verschieden viel. **0** = gar nicht, **10** = total.',
          fragen: [
            { f: 'Kreise ein:', regler: ['Hai', 'Schildkröte', 'Teddybär', 'Fuchs', 'Eule'] },
            { f: 'Es kommt darauf an, mit wem:', satz: ['Mit Freunden bin ich meistens:', 'Mit Erwachsenen bin ich meistens:'] },
          ],
        },
        {
          titel: 'Die Treppe', wie: 'zu zweit', zeit: '6 Min.',
          kontext: 'Fünf Stufen aus einem Streit heraus. Bring sie in die richtige Reihenfolge: Schreib **1 bis 5** ins Kästchen.',
          fragen: [
            { f: 'Was kommt wann?', zahl: ['Lösungen sammeln', 'Ich-Satz sagen', 'Stopp und runterkommen', 'einigen', 'zuhören und zusammenfassen'] },
            { f: 'Welche Stufe überspringst du am liebsten?', linien: 1 },
          ],
        },
      ],
      challenge: { titel: 'Streit-Arena', wie: 'zu zweit oder dritt', x: 'Zieht eine Streit-Karte. Spielt die Szene zweimal: erst so, wie so ein Streit meistens läuft – dann mit der Treppe. **Das Publikum ruft Stopp, wenn eine Stufe fehlt.**' },
      line: { titel: 'Der letzte Streit', x: 'Welches Tier warst du? Und welches wärst du gern gewesen?', linien: 1 },
      woche: 'Beobachte einen Streit – bei dir, in der Pause oder in einer Serie. **Welche Tiere siehst du? Welche Stufe fehlt?**',
      gruppe: [
        { titel: 'Über die Linie', wer: 'zu zweit', zeit: '6 Min.', material: 'eine Linie aus Kreppband', schritte: ['Stellt euch gegenüber an die Linie, jeder auf seiner Seite.', 'Auftrag: „Du gewinnst, wenn dein Gegenüber in 30 Sekunden auf deiner Seite steht.“ Los.', 'Auflösung: Wer hat gezogen, wer überredet – und wer hat einfach die Seiten getauscht?'], frage: 'Warum denken wir bei „gewinnen“ sofort an „gegeneinander“?' },
        { titel: 'Schreiduell', wer: 'zwei Teams', zeit: '6 Min.', material: 'viel Platz oder draußen', schritte: ['Aus jedem Team steht eine Person zehn Meter vom eigenen Team entfernt.', 'Beide rufen gleichzeitig ihrem Team einen Satz zu. Das Team muss ihn verstehen. 30 Sekunden.', 'Zweite Runde: Die beiden dürfen sich vorher absprechen.'], frage: 'Was passiert mit einer Botschaft, wenn beide gleichzeitig schreien?' },
      ],
      leitung: {
        einsatz: '„Über die Linie“ als Einstieg, dann Szene und Fakten zu den Tier-Ecken. Move A ersetzt „Wie viel Tier steckt in mir?“, Move B sichert „Treppe bauen“. Die Challenge ist die Streit-Arena.',
        loesungen: [
          'Szene: beide. Finn drückt durch (Hai), Lina gibt nach (Teddybär) und rächt sich still. Beide Stile haben den Streit gebaut.',
          'Move A: Kein Tier ist „falsch“. Der Hai schützt bei Gefahr, die Schildkröte bei Kleinkram. Entscheidend ist, ob man wählen kann.',
          'Move B: 1 Stopp und runterkommen · 2 Ich-Satz · 3 zuhören und zusammenfassen · 4 Lösungen sammeln · 5 einigen.',
        ],
        impulse: ['Welches Tier seid ihr zu Hause – und welches bei Freunden?', 'Wann ist Nachgeben klug – und wann feige?'],
        material: 'Kreppband, Tier-Schilder, Treppen-Karten, Streit-Karten', blaetter: 'Gefühlsrad, „Konfliktstil“, Streit-Karten, Konflikt-Treppe, Skills-Pass.',
      },
    },
    {
      nr: 25, titel: 'Alle machen mit', unter: 'Gruppendruck ist selten laut. Meistens ist er nur ein Blick',
      kurz: 'Warum man mitmacht, obwohl man nicht will – und vier Arten Nein.',
      szene: {
        bild: 'peep:ben:besorgt', name: 'Ben, 15',
        text: 'Samstag, Einkaufszentrum. Die anderen stecken Sachen ein. Einer hält Ben einen Kopfhörer hin: „Na los. Oder hast du Schiss?“ Niemand zwingt ihn. Alle schauen. Bens Herz hämmert. Er will nicht klauen. Er will aber noch weniger der sein, über den sie später lachen. Die Kopfhörer kosten 19,99. Die Anzeige kostet ihn den Praktikumsplatz.',
        frage: 'Was hätte Ben in diesen drei Sekunden gebraucht?',
      },
      fakten: [
        { t: 'Der Schwarm', x: 'Menschen machen nach, was die Gruppe macht. Oft **ohne ein Wort**. Das ist uralt und sitzt tief.' },
        { t: 'Mit Freunden riskanter', x: 'Sind Freunde dabei, gehen Jugendliche **mehr Risiko** ein als allein. Das Gehirn belohnt Dazugehören extra.' },
        { t: 'Einer reicht', x: 'Sagt **eine** Person Nein, trauen sich andere auch. Du musst nicht alle überzeugen. Nur anfangen.' },
      ],
      clip: { titel: 'Das Asch-Experiment: So manipuliert uns die Gruppe', kanal: 'Quarks', url: YT + 'I40g6U3K7hc', dauer: 'die ersten 5 Min.', frage: 'Warum sagen Leute im Experiment etwas, das sie selbst für falsch halten?' },
      mythen: [
        ['Ich mache nur, was ich will.', 'Im Experiment geben drei von vier Leuten mindestens einmal eine falsche Antwort – weil die Gruppe sie gibt.'],
        ['Ein Nein muss man begründen.', 'Musst du nicht. „Nee, mach ich nicht“ ist ein fertiger Satz.'],
        ['Wer Nein sagt, ist raus.', 'Manchmal. Aber Leute, die dich nur mit Ja mögen, mögen nicht dich.'],
      ],
      merk: 'Einer muss anfangen. ==Warum nicht du?==',
      moveUnter: 'Halt stand',
      moves: [
        {
          titel: 'Meine Zonen', wie: 'allein', zeit: '6 Min.',
          kontext: '**Komfort:** fühlt sich sicher an. **Lernen:** aufregend, aber machbar. **Panik:** zu viel.',
          fragen: [{ f: 'In welcher Zone wäre das für dich?', raster: { spalten: ['Komfort', 'Lernen', 'Panik'], zeilen: ['Eine neue Person ansprechen', 'Nein sagen, wenn alle Ja sagen', 'Im Gruppenchat schreiben: „Das finde ich nicht okay.“', 'Vor allen nachfragen, wenn du etwas nicht verstehst', 'Einem Freund sagen: „Auf deinen Plan habe ich keine Lust.“'] } }],
        },
        {
          titel: 'Bens drei Sekunden', wie: 'zu zweit', zeit: '6 Min.',
          kontext: '„Na los. Oder hast du Schiss?“ Ben hat mehr als eine Möglichkeit.',
          fragen: [{ f: 'Mach die Rechnung auf:', preis: { erste: 'Ben …', kopf: ['kostet ihn', 'bringt ihm'], optionen: ['macht mit', 'sagt: „Nee, mach ich nicht.“', 'macht einen Witz und bleibt', 'geht'] } }],
        },
      ],
      challenge: { titel: 'Druck-Duell', wie: 'Gruppe gegen Leitung', x: 'Zieht eine Karte. Die Leitung drängelt – freundlich, hartnäckig, mit allen Tricks. **Ihr haltet stand: 60 Sekunden, ohne laut zu werden.**' },
      line: { titel: 'Mein Nein-Satz', x: 'Für einen Moment, den du kennst. Kurz. Ohne Entschuldigung.', linien: 1 },
      woche: 'Sag einmal **Nein** zu etwas Kleinem, das du nicht willst. Such dir eine der vier Arten aus.',
      gruppe: [
        { titel: 'Der Schwarm', wer: 'alle', zeit: '5 Min.', material: 'freier Raum', schritte: ['Alle gehen kreuz und quer durch den Raum. Kein Wort.', 'Einzige Regel: Bleibt jemand stehen, bleiben alle stehen. Geht jemand los, gehen alle.', 'Niemand ist Chef. Trotzdem bewegt sich die Gruppe wie ein einziges Tier.'], frage: 'Wer hat den Schwarm gelenkt – und woran habt ihr es gemerkt?' },
        { titel: 'Nein-Würfel', wer: 'alle', zeit: '12 Min.', material: 'Drängel-Karten, 1 Würfel', schritte: ['Zieh eine Drängel-Karte („Komm, nur einmal“) und würfle.', 'Sag Nein, wie die Zahl es will: **1** kaputte Schallplatte · **2** Nein plus Vorschlag · **3** mit Humor · **4** einfach gehen · **5** freie Wahl · **6** zu zweit.', 'Die Gruppe zeigt mit den Fingern: Wie überzeugend war das?'], level2: 'Die Leitung drängelt nach: „Stell dich nicht so an.“', frage: 'Welche Art von Nein fällt euch am leichtesten?' },
      ],
      leitung: {
        einsatz: '„Der Schwarm“ als Einstieg, dann die Szene. Move A ersetzt die Zonen auf dem Blatt „Nein sagen“ (Zonen-Wette). Move B vor dem Nein-Würfel. Die Challenge ist das Druck-Duell; „Dein Satz“ ist der eigene Nein-Satz.',
        loesungen: [
          'Szene: Zeit, einen fertigen Satz – und eine einzige Person, die auch Nein sagt. Der Druck kam nicht aus Worten, sondern aus Blicken.',
          'Move A: offen. Wachsen findet in der Lernzone statt; die Panikzone lähmt.',
          'Move B: Mitmachen bringt kurz Zugehörigkeit und kostet die Anzeige. Ein klares Nein kostet einen peinlichen Moment und bringt Respekt – oder zeigt, wer kein Freund ist.',
        ],
        impulse: ['Wann habt ihr zuletzt mitgemacht, obwohl ihr nicht wolltet? Ein Stichwort reicht.', 'Was braucht man, um als Erster Nein zu sagen?'],
        material: 'Drängel-Karten, Würfel, drei Zonen am Boden', blaetter: 'Gefühlsrad, Drängel-Karten, „Nein sagen“, Skills-Kärtchen, Skills-Pass.',
      },
    },
    {
      nr: 26, titel: 'Zuschauer', unter: 'Mobbing braucht einen, der anfängt. Und viele, die nichts tun',
      kurz: 'Spaß, Streit oder Mobbing? Und was Zuschauer tun können.',
      szene: {
        bild: 'peep:noah:besorgt', name: 'Noah, 15',
        text: 'Lea schickt eine Sprachnachricht in den Klassenchat. Ihre Stimme zittert. Einer macht daraus einen Clip mit Quietschgeräuschen. Noah findet ihn lustig und leitet ihn weiter: zwei Gruppen, ein Klick. Am Montag sitzt Lea nicht in der Kantine. Am Dienstag auch nicht. Am Mittwoch sieht Noah sie auf der Treppe, allein, mit dem Brot in der Hand. Er hat nichts gegen Lea. Er hat nur einmal geklickt.',
        frage: 'Welche Rolle spielt Noah in dieser Geschichte?',
      },
      fakten: [
        { t: 'Vier Merkmale', x: 'Mobbing ist **wiederholt**, **absichtlich**, **ungleich** (mehrere gegen einen) – und die Person kann sich **allein nicht wehren**.' },
        { t: 'Die Bühne', x: 'Wer mobbt, braucht Publikum. Lachen, liken, weiterleiten: **Das ist der Applaus.**' },
        { t: 'Zuschauer entscheiden', x: 'Hört das Publikum auf, hört es oft auf. Die meisten finden es nicht okay – **sie warten nur auf den Ersten.**' },
      ],
      clip: { titel: 'Mobbing beobachten: Darum greifen viele nicht ein', kanal: 'Quarks', url: YT + '-DKFp6J30vo', dauer: 'die ersten 5 Min.', frage: 'Warum tun so viele nichts, obwohl sie es falsch finden?' },
      mythen: [
        ['War doch nur Spaß.', 'Spaß ist es, wenn beide lachen. Und wenn beide aufhören können.'],
        ['Ich habe ja nichts gemacht.', 'Mitlachen und weiterleiten ist machen. Nichts tun ist auch eine Entscheidung.'],
        ['Wer Hilfe holt, ist eine Petze.', 'Petzen will jemandem schaden. Hilfe holen will jemanden schützen.'],
      ],
      merk: 'Kein Publikum. ==Keine Bühne.==',
      moveUnter: 'Nimm ihnen das Publikum',
      moves: [
        {
          titel: 'Spaß, Streit oder Mobbing?', wie: 'zu zweit', zeit: '6 Min.',
          fragen: [
            { f: 'Kreuze an:', raster: { spalten: ['Spaß', 'Streit', 'Mobbing'], zeilen: ['Zwei Freunde ziehen sich mit Spitznamen auf. Beide lachen.', 'Nach einem Foul beschimpfen sich zwei. Am nächsten Tag ist es vorbei.', 'Seit Wochen macht eine Gruppe Geräusche, sobald Elias etwas sagt.', 'Über Samuels Schuhe gibt es täglich einen Witz. Er lacht mit – und geht allein.'] } },
            { f: 'Die vier Merkmale von Mobbing – kreise ein:', kreis: ['wiederholt', 'laut', 'absichtlich', 'mehrere gegen einen', 'wehrlos'] },
          ],
        },
        {
          titel: 'Die Leiter', wie: 'allein', zeit: '5 Min.',
          fragen: [{ f: 'Sechs Stufen, vom Einfachen zum Mutigen. Wo stehst du?', raster: { spalten: ['mache ich', 'will ich üben', 'noch nicht'], zeilen: ['**1** Nicht mitlachen, nichts weiterleiten', '**2** Der Person zeigen: Ich bin auf deiner Seite', '**3** Andere dazuholen', '**4** Einem Erwachsenen Bescheid sagen', '**5** Online: Beweise sichern, melden', '**6** Direkt „Stopp“ sagen – wenn es sicher ist'] } }],
        },
      ],
      challenge: { titel: 'Kipp die Bühne', wie: 'alle', x: 'Sechs Stühle, sechs Rollen – vom Anfänger bis zur Verteidigerin. **Wer nimmt dem Täter das Publikum weg – und wie?**' },
      line: { titel: 'Die Nachricht', x: 'Schreib Lea eine Nachricht. Eine, die du wirklich abschicken würdest.', linien: 1 },
      woche: 'Zeig einer Person, die oft allein steht, dass du sie siehst: **ein Hallo, ein Platz, eine Nachricht.**',
      hilfe: true,
      gruppe: [
        { titel: 'Ecken-Lauf', wer: 'alle', zeit: '12 Min.', material: 'drei Ecken: Spaß, Streit, Mobbing', schritte: ['Die Leitung liest eine Situation vor. Geh in die Ecke, die passt. Unsicher? Stell dich dazwischen.', 'Aus jeder Ecke sagt eine Person: Woran hast du es erkannt?', 'Nach jeder Situation die vier Merkmale prüfen.'], frage: 'An welchem Punkt genau kippt Spaß?' },
        { titel: 'Positiv-Kette', wer: 'alle', zeit: '7 Min.', material: 'Sitzkreis', schritte: ['Reihum sagt jeder der Person rechts neben sich etwas, das er an ihr schätzt oder im Kurs an ihr erlebt hat.', 'Die Person sagt nur: „Danke.“', 'Einmal rum – dann in die andere Richtung.'], frage: 'Wie fühlt sich ein Raum an, in dem das normal ist?' },
      ],
      leitung: {
        einsatz: 'Szene nach dem Ecken-Lauf. Move A ersetzt den „Mobbing-Check“, Move B ersetzt „Meine Stufe“ auf dem Blatt zur Zivilcourage-Leiter. Die Challenge ist „Kipp die Bühne“ – Rollen liegen auf Stühlen und werden nie mit Gruppenmitgliedern besetzt.',
        loesungen: [
          'Szene: Verstärker – einer von denen, die dem Täter die Bühne bauen. Noah ist nicht „böse“; gerade deshalb ist diese Rolle so häufig.',
          'Move A: Spitznamen – Spaß · Foul – Streit · Elias – Mobbing · Samuel – Mobbing (er lacht mit, um sich zu schützen). Merkmale: wiederholt, absichtlich, mehrere gegen einen, kann sich nicht wehren.',
          'Move B: privat. Jede Stufe zählt; Stufe 1 und 2 sind für fast alle machbar und wirken.',
        ],
        impulse: ['Warum ist es so schwer, als Erster nicht mitzulachen?', 'Was hätte Lea am Mittwoch auf der Treppe geholfen?'],
        material: 'Zivilcourage-Karten, sechs Stühle mit Rollenkarten, Leiter-Sprossen', blaetter: 'Gefühlsrad, „Mobbing erkennen“, Zivilcourage-Leiter, Skills-Pass.',
      },
    },
  ],
  kino: {
    geprueft: '14.11.2026',
    filme: [
      { titel: 'Freedom Writers', jahr: 2007, fsk: 12, laenge: '123 Min.', worum: 'Long Beach, 1994. In Raum 203 sitzen Jugendliche, die sich auf der Straße bekriegen – nach Herkunft sortiert, jeder kennt jemanden, der erschossen wurde. Die neue Lehrerin ist jung und ahnungslos. Sie gibt jedem ein leeres Heft: Schreib auf, was dir passiert. Nach einer wahren Geschichte.', achte: ['Wie sitzen die Gruppen am Anfang im Raum – und am Ende?', 'Was verändert das Spiel mit der Linie?', 'Wer sagt die Wahrheit, obwohl es sie alles kostet?'], achtung: 'Gang-Gewalt, eine Schießerei, Rassismus; der Holocaust ist Thema.' },
      { titel: 'Wunder', jahr: 2017, fsk: 0, laenge: '113 Min.', worum: 'Auggie hat ein Gesicht, das nach 27 Operationen immer noch anders aussieht. Jetzt geht er zum ersten Mal in eine Schule. Der Film erzählt dasselbe Jahr aus mehreren Blickwinkeln – auch aus dem der Zuschauer.', achte: ['Wer ist Täter, wer Mitläufer, wer Verteidiger?', 'Was kostet es Jack, zu Auggie zu halten?'], achtung: 'Eine Mobbing-Szene mit Schlägerei; ein Haustier stirbt. Die Hauptfigur ist jünger als die Gruppe.' },
    ],
    bingo: ['Gruppen sitzen getrennt', 'Jemand geht über eine Linie', 'Ein Schritt nach vorn', 'Schreiben statt schlagen', 'Das kenne ich', 'Einer sagt als Erster Nein', 'Druck von den eigenen Leuten', 'Jemand hört zum ersten Mal zu', 'Aus Gegnern wird ein Team'],
    nachher: ['Welches Streit-Tier ist die Lehrerin – bei ihren Kollegen und bei der Klasse?', 'Eva sagt die Wahrheit. Was kostet es sie – und was bringt es?', 'Was hat die Gruppen in Raum 203 zusammengebracht?'],
  },
  hot: {
    unter: 'Sechs Sätze zum Streiten – nach Regeln',
    regeln: 'Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**',
    takes: ['Wer sich nicht wehrt, ist selbst schuld.', 'Ein echter Freund macht alles mit.', 'Gegen Mobbing kann man nichts machen.', 'Wer zuschlägt, hat schon verloren.', 'Manchmal muss man jemandem zeigen, wo sein Platz ist.', 'Hilfe holen ist petzen.'],
  },
  quiz: {
    unter: 'Zehn Fragen. Zehn Buchstaben. Ein Modus.', wort: 'EULENMODUS',
    fragen: [
      { f: 'Welches Tier will gewinnen, egal was es kostet?', o: ['der Hai', 'die Eule', 'der Teddybär'], r: 0 },
      { f: 'Was macht die Eule?', o: ['zieht sich zurück', 'sucht eine Lösung für beide', 'gibt nach'], r: 1 },
      { f: 'Die erste Stufe der Treppe?', o: ['Lösungen sammeln', 'einigen', 'Stopp und runterkommen'], r: 2 },
      { f: 'Wer immer nachgibt, …', o: ['sammelt Wut', 'hat nie Streit', 'gewinnt am Ende'], r: 0 },
      { f: 'Gruppendruck ist meistens …', o: ['laut', 'leise – ein Blick reicht', 'verboten'], r: 1 },
      { f: 'Wie viele müssen Nein sagen, damit sich andere trauen?', o: ['alle', 'die Hälfte', 'einer reicht'], r: 2 },
      { f: 'Die „kaputte Schallplatte“ heißt:', o: ['denselben Satz ruhig wiederholen', 'laut Musik hören', 'weglaufen'], r: 0 },
      { f: 'Was gehört zu Mobbing?', o: ['ein einmaliger Streit', 'wiederholt, mehrere gegen einen', 'ein Foul'], r: 1 },
      { f: 'Was braucht, wer mobbt?', o: ['gute Noten', 'Ruhe', 'Publikum'], r: 2 },
      { f: 'Die erste Stufe der Zivilcourage-Leiter?', o: ['nicht mitlachen, nichts weiterleiten', 'sich prügeln', 'den Täter filmen'], r: 0 },
    ],
  },
  karten: [
    { titel: 'Konflikt-Treppe', icon: 'stairs-up', zeilen: ['**1** Stopp – runter unter 70', '**2** Ich-Satz', '**3** Zuhören, zusammenfassen', '**4** Lösungen sammeln · **5** einigen'] },
    { titel: 'Vier Arten Nein', icon: 'ban', zeilen: ['**Schallplatte:** denselben Satz wiederholen', '**Nein plus Vorschlag**', '**Mit Humor** · **Einfach gehen**'], eigen: 'Mein Nein-Satz:' },
    { titel: 'Mobbing-Check', icon: 'checklist', zeilen: ['Wiederholt?', 'Absichtlich?', 'Mehrere gegen einen?', 'Kann sich allein nicht wehren?'] },
    { titel: 'Zivilcourage', icon: 'ladder', zeilen: ['Nicht mitlachen. Nichts weiterleiten.', 'Zeigen: Ich bin auf deiner Seite.', 'Andere dazuholen. Erwachsene informieren.', 'Stopp sagen – nur, wenn es sicher ist.'] },
    { titel: 'Online', icon: 'shield-check', zeilen: ['Screenshot machen. Beweise sichern.', 'Melden und blockieren.', 'Nicht liken, nicht teilen.'] },
    { titel: 'Hilfe', icon: 'lifebuoy', zeilen: ['Hilfe holen ist kein Petzen.', 'Kanner-Jugendtelefon **116 111**', 'Notruf **112**'], eigen: 'Mein Mensch:' },
  ],
  abspann: {
    posten: ['Mein Streit-Tier kennen', 'Die Treppe gehen', 'Nein sagen', 'Mobbing erkennen', 'Nicht mitlachen'],
    saetze: ['Das mache ich beim nächsten Streit anders:', 'Das war Quatsch:', 'Das soll im Kurs anders werden:'],
  },
  leitung: {
    fakten: [['Zielgruppe', '12–16 Jahre, 4–8 Jugendliche'], ['Dauer', '3 Einheiten à 100 Min. (E24–E26)'], ['Sozialform', 'allein, zu zweit, Teams'], ['Material', 'Stifte, Würfel, Kreppband, Karten, Schere']],
    wozu: 'REAL TALK ist das Heft der Jugendlichen zu Modul 6 – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Diese Ausgabe zeigt bewusst beide Seiten: den, der durchdrückt, die, die nachgibt, den, der mitmacht, den, der weiterleitet. Viele Jugendliche der Zielgruppe kennen mehr als eine Rolle. Das Heft verurteilt nicht; es lässt die Rechnung aufmachen.',
    lernziele: [
      'Die Jugendlichen kennen fünf Konfliktstile, schätzen den eigenen ein und gehen die fünf Stufen der Konflikt-Treppe.',
      'Sie beschreiben, wie Gruppendruck wirkt, und nutzen eine von vier Arten, Nein zu sagen.',
      'Sie unterscheiden Spaß, Konflikt und Mobbing anhand von vier Merkmalen.',
      'Sie kennen die Rollen der Zuschauenden und wählen eine sichere Stufe der Zivilcourage-Leiter.',
    ],
    start: 'Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten, z. B. in der Brücke von Einheit 24.',
    schluss: 'Kino als eigener Termin. Hot Takes im Stehen (15 Min.), „Knack den Code“ als Wiederholung, Karten ausschneiden, Abspann in der Abschlussrunde von Einheit 26.',
    hilfe: ['Szene und Fakten vorlesen oder reihum lesen lassen.', 'Die fünf Tiere als Schilder im Raum lassen – zum Zeigen.', 'Bei der „Rechnung“ zu zweit arbeiten und mündlich antworten lassen.', 'Wer nicht spielen mag, ist Jury oder stoppt die Zeit.'],
    forder: ['Eine Streit-Szene aus einer Serie mit Tieren und Treppen-Stufen analysieren.', 'Eine eigene Drängel-Karte schreiben und im Nein-Würfel einsetzen.', 'Für die Geschichte von Lea ein anderes Ende schreiben – ab dem Moment des Clips.', 'Die Zivilcourage-Leiter als Plakat für den Gruppenraum gestalten.'],
    gespraech: 'Konflikte zwischen Gruppenmitgliedern werden nicht im Rollenspiel nachgespielt und nicht im Plenum verhandelt; dafür ein begleitetes Gespräch außerhalb der Einheit anbieten. Mobbing kann in der Gruppe selbst vorkommen – bei Betroffenen, Tätern und Zuschauenden. Niemanden nach eigenen Erfahrungen fragen. Erzählt jemand von aktuellem Mobbing oder von Straftaten, das Gespräch unter vier Augen führen und die zuständige Leitung (Responsable) einbeziehen.',
    druck: ['A4, doppelseitig, an der langen Seite gewendet. So liegen Szene (links) und „Dein Move“ (rechts) nebeneinander.', 'Seiten 1–{J} für die Jugendlichen, Seiten {L} nur für Sie.', 'Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.', 'Seite {K} (Karten) einzeln und einseitig drucken, am besten auf festerem Papier.'],
    hot: 'Es gibt keine richtige Position. Take 1 und 5 können Täter- und Opfererfahrungen im Raum berühren – nicht personalisieren. Bei Take 1 hilft die Forschung: Mobbing ist ein Gruppenphänomen, Betroffene können es allein nicht beenden. Bei Take 5 nach dem Preis fragen: Was kostet es den, der es tut – heute und in einem Jahr?',
    achtung: 'Karten zu Alkohol, Diebstahl oder Mutproben können eigene Erfahrungen berühren: nicht vertiefen, nicht bewerten, Einzelgespräch anbieten. Die Szene mit Ben (Ladendiebstahl) ist nah an der Lebenswelt mancher Jugendlicher – sie fragt nach den drei Sekunden davor, nicht nach Schuld. Der Hauptfilm zeigt Waffengewalt: vorher ansehen.',
    hintergrund: 'Die fünf Konfliktstile folgen dem Modell von Thomas und Kilmann; die Treppe verbindet Deeskalation (Glasl), Ich-Botschaft und aktives Zuhören (Gordon) und interessenorientiertes Verhandeln (Fisher & Ury). In Aschs Experimenten passten sich die meisten Versuchspersonen mindestens einmal einer offensichtlich falschen Mehrheit an; schon ein einzelner Abweichler senkte den Druck deutlich. In Anwesenheit Gleichaltriger gehen Jugendliche mehr Risiken ein (Gardner & Steinberg). Mobbing ist ein Gruppenprozess mit festen Rollen (Olweus; Salmivalli); Programme, die bei den Zuschauenden ansetzen, verringern es messbar (Kärnä et al.).',
    quellen: 'Thomas & Kilmann (1974) · Glasl (1980) · Gordon (1972) · Fisher & Ury (1981) · Asch (1956) · Gardner & Steinberg (2005) · Olweus (1993) · Salmivalli et al. (1996) · Kärnä et al. (2011) · Latané & Darley (1970). Angaben zu den Einheiten 24–26 in der Toolbox.',
  },
}
export default d
