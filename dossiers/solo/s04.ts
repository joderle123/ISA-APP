// SOLO #04 · ZOCKEN – Gaming in der Einzelarbeit: erst würdigen, was das Spiel gibt, dann ehrlich hinschauen.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's04', nr: '04', datei: 'Solo-04-Zocken', reihe: 'Thema',
  thema: 'Zocken', headline: 'Was gibt dir das Spiel, das sonst keiner gibt?', farbe: '#B79CFF', stand: 'November 2026',
  bild: 'peep:noah:ruhig:zocken', sticker: 'Du erklärst',
  seiten: [
    {
      titel: 'Zocken', unter: '',
      bloecke: [
        { art: 'text', x: [
          'Die meisten Erwachsenen, die über Gaming reden, haben dein Spiel nie gespielt. Sie zählen Stunden. Das ist ungefähr so klug, wie ein Buch nach seinem Gewicht zu beurteilen.',
          'Deshalb fängst du an: **Du erklärst dein Spiel.** Danach schauen wir uns an, was es dir gibt – und was es sich von dir holt.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Das ist doch nicht das echte Leben.“', '„Geh mal raus an die frische Luft.“', '„Davon wird man aggressiv.“', '„Du verschwendest deine Zeit.“', '„Such dir ein richtiges Hobby.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So wichtig ist mir Zocken', 'So viel Ärger habe ich deswegen'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Warum Spiele so gut funktionieren – und wann es kippt', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:noah:ruhig:zocken', name: 'Noah, 15',
          text: 'Im Clan ist Noah der, auf den man sich verlässt. 400 Stunden, hoher Rang, sein Call entscheidet die Runde. In der Schule ist er der, der fehlt. Am Dienstag sagt die Lehrerin: „Du könntest so viel, wenn du wolltest.“ Noah denkt: Ich will ja. Nur nicht hier. Um vier loggt er sich ein. Drei Leute schreiben: „Endlich.“',
          frage: 'Was bekommt Noah im Spiel, das er in der Schule nicht bekommt?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Drei Dinge auf einmal', x: 'Im Spiel wirst du besser, du entscheidest selbst, und Leute brauchen dich. **Genau das fehlt im Alltag oft.** Kein Wunder, dass es zieht.' },
          { t: 'Gebaut zum Bleiben', x: 'Tägliche Belohnung, Serie, Battle Pass mit Ablaufdatum, Kisten mit Zufall. **Das ist kein Zufall, sondern ein Geschäft.**' },
          { t: 'Viel ist nicht gleich Sucht', x: 'Entscheidend sind nicht die Stunden, sondern: **Kannst du aufhören? Was fällt hinten runter? Machst du weiter, obwohl es dir schadet?**' },
        ] },
        { art: 'clip', clip: { titel: 'Gaming & Psyche: Darum kann Spielen heilsam für dich sein', kanal: 'Terra Xplore', url: YT + '6vGY6Oyxb8c', dauer: 'die ersten 6 Min.', frage: 'Was davon stimmt für dich – und was ist schöngeredet?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was würde dir fehlen, wenn das Spiel morgen ==abgeschaltet== wird – außer dem Spiel?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Du bist der Coach. Dein Gegenüber ist der Anfänger', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Mein Spiel erklärt', wie: 'du erklärst', zeit: '8 Min.',
          kontext: 'Erklär dein Spiel in drei Minuten. Danach muss dein Gegenüber drei Fragen von dir beantworten können.',
          fragen: [
            { f: 'Stichworte:', satz: ['Mein Spiel:', 'Darin bin ich gut:', 'Dafür brauchen mich die anderen:'] },
            { f: 'Mit welchen Tricks hält dich das Spiel? Kreuze an:', kreuz: ['tägliche Belohnung', 'Serie, die reißt, wenn ich fehle', 'Battle Pass mit Ablaufdatum', 'Rangliste', 'Kisten mit Zufall', 'Leute, die auf mich warten', 'kein Ende'] },
          ] },
        { art: 'fragen', titel: 'Der ehrliche Check', wie: 'allein', zeit: '4 Min.',
          kontext: 'Kein Test, keine Diagnose. Nur du und sechs Sätze.',
          fragen: [
            { f: 'Kreuze an:', raster: { spalten: ['nie', 'manchmal', 'oft'], zeilen: ['Ich spiele länger, als ich wollte.', 'Ich lasse anderes fallen: Schlaf, Leute, Schule.', 'Ich spiele weiter, obwohl ich deswegen Ärger habe.', 'Ich spiele, um etwas nicht zu fühlen.', 'Ohne Spiel bin ich gereizt oder leer.', 'Ich sage nicht ehrlich, wie viel ich spiele.'] } },
            { f: 'Wenn überhaupt:', satz: ['Das würde ich selbst gern ändern:'] },
          ] },
        { art: 'fragen', titel: 'Jeder hat sein Ding', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          kontext: 'Bei dir ist es das Spiel. Bei deinem Gegenüber vielleicht Serien, das Handy oder die Arbeit.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Dabei vergesse ich die Zeit', 'Das bekomme ich dort', 'Das lasse ich dafür liegen'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Der Stopp-Test', x: 'Leg dreimal diese Woche **vor dem Einloggen** fest, wann Schluss ist – eine Runde oder eine Uhrzeit – und sag es jemandem im Team. Zähle: Wie oft hat es geklappt? Und was war der Moment, in dem es gekippt ist?' },
        { art: 'karten', karten: [
          { titel: 'Vor dem Einloggen', icon: 'device-gamepad-2', zeilen: ['Wie voll ist mein Akku? (0–10)', 'Wann ist Schluss? Laut sagen.', 'Was mache ich direkt danach?'] },
          { titel: 'Drei Fragen', icon: 'help-circle', zeilen: ['Kann ich aufhören, wenn ich will?', 'Was fällt gerade hinten runter?', 'Spiele ich **für** etwas – oder **gegen** etwas?'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Was war dein bester Moment in einem Spiel?', 'Welches Spiel hast du geliebt und dann nie wieder angefasst?'],
          ['Wer aus dem Spiel kennt dich besser als die Leute hier?', 'Wann hast du zuletzt gespielt, obwohl du eigentlich nicht wolltest?'],
          ['Was kannst du im Spiel, das du dir draußen nicht zutraust?', 'Wovor hast du Ruhe, solange du spielst?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Warum fühlen sich gute Spiele so gut an?', o: ['Man wird besser, entscheidet selbst und gehört dazu.', 'Sie sind bunt.', 'Sie sind laut.', 'Sie dauern lange.'], r: 0, warum: 'Können, Selbstbestimmung, Zugehörigkeit – drei Grundbedürfnisse.' },
    { f: 'Wozu gibt es tägliche Login-Belohnungen?', o: ['als Geschenk', 'damit du jeden Tag wiederkommst', 'aus Versehen', 'für die Grafik'], r: 1, warum: 'Wer eine Serie hat, will sie nicht reißen lassen.' },
    { f: 'Kisten mit Zufallsinhalt funktionieren wie …', o: ['ein Sparbuch', 'Glücksspiel', 'ein Lexikon', 'eine Schulnote'], r: 1, warum: 'Unregelmäßige Belohnung gegen Geld.' },
    { f: 'Ist jemand süchtig, weil er viele Stunden spielt?', o: ['ja, ab drei Stunden', 'ja, ab fünf Stunden', 'nein – die Stunden allein sagen es nicht', 'ja, immer'], r: 2, warum: 'Es zählt, ob man die Kontrolle verliert und anderes aufgibt.' },
    { f: 'Was gehört zu einer Computerspielstörung?', o: ['ein hoher Rang', 'Weiterspielen trotz deutlicher Schäden', 'ein teurer PC', 'viele Freunde im Spiel'], r: 1, warum: 'Dazu: Kontrollverlust und Vorrang vor allem anderen – über Monate.' },
    { f: 'Führt die Weltgesundheitsorganisation die Computerspielstörung als Diagnose?', o: ['nein', 'ja', 'nur für Kinder', 'nur in den USA'], r: 1, warum: 'In der ICD-11 als „Gaming Disorder“.' },
    { f: 'Was hilft am ehesten, rechtzeitig aufzuhören?', o: ['auf Müdigkeit warten', 'vorher festlegen, wann Schluss ist', 'schneller spielen', 'gar nichts'], r: 1, warum: 'Die Entscheidung fällt vor dem Einloggen, nicht mittendrin.' },
    { f: 'Jemand spielt, um etwas nicht zu fühlen. Was ist das Spiel dann?', o: ['Sport', 'eine Betäubung', 'ein Beruf', 'Zufall'], r: 1, warum: 'Dann lohnt die Frage: Wovor ist dort Ruhe?' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, wenn möglich das Spiel'], ['Passt zu', 'SOLO #03 Scrollen']],
    wann: ['Zocken ist das Hauptthema im Leben des Jugendlichen – als Stärke oder als Streitpunkt.', 'Schlaf, Schule oder Kontakte bleiben wegen des Spiels liegen.', 'Dauerstreit um Spielzeiten; der Jugendliche fühlt sich nur kontrolliert.', 'Auch ohne Problem: als Zugang zu einem Jugendlichen, der sonst wenig erzählt.'],
    ziel: 'Der Jugendliche erlebt, dass sein Spiel ernst genommen wird, benennt selbst, was es ihm gibt – und prüft ehrlich, ob er noch entscheidet, wann Schluss ist.',
    anschluss: 'Wenn es um Geld im Spiel oder um Kontakte im Netz geht: REAL TALK #07.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1: die Sprüche ankreuzen lassen und sich für keinen davon rechtfertigen.'],
      ['5–20', '„Mein Spiel erklärt“ vorziehen: Der Jugendliche erklärt, Sie fragen nach wie ein Anfänger. Wenn es geht, zehn Minuten wirklich spielen oder zuschauen.'],
      ['20–32', 'Der Fall, die drei Kästen, das Video. Die unbequeme Frage stellen.'],
      ['32–42', 'Der ehrliche Check – allein, ohne Mitlesen. Dann das Duell mit Ihrem eigenen „Ding“.'],
      ['42–50', 'Stopp-Test vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Erst würdigen, dann fragen. Wer mit der Stundenzahl anfängt, bekommt keine ehrliche Antwort mehr.', 'Sie sind der Anfänger. Echte Neugier auf das Spiel ist die Methode.', 'Der Check gehört dem Jugendlichen. Kein Kreuz kommentieren, nur fragen: „Welche Zeile würdest du gern ändern?“', 'Kein Entzug als Ziel. Das Ziel heißt: selbst bestimmen, wann Schluss ist.'],
    hinweise: ['Seite 3: Die sechs Sätze sind an die Merkmale der Computerspielstörung angelehnt, aber kein Fragebogen.', 'Seite 4: Der Stopp-Test braucht eine zweite Person, die den Zeitpunkt kennt – am besten wählt der Jugendliche sie selbst.', 'Für Jugendliche, die nicht spielen: Das Heft funktioniert auch mit Serien oder Kurzvideos.'],
    achtung: 'Bei mehreren „oft“ über viele Monate, Schulabbruch oder völligem Rückzug: fachliche Abklärung anregen (Kinder- und Jugendpsychiatrie, Suchtberatung). Auf Geld achten (Käufe im Spiel, Schulden, fremde Karten) und auf Kontakte: Erwachsene, die Geschenke machen oder in private Chats wechseln wollen, sind ein Grund, sofort die zuständige Leitung (Responsable) einzubeziehen. Spielen als Flucht vor einer unerträglichen Lage zu Hause ist kein Spielproblem.',
    extra: [{ titel: 'Computerspiele-Sucht und die Verkaufs-Tricks der Hersteller', kanal: 'ZDFheute Nachrichten (ZDFzoom)', url: YT + 'UdUxH-7Dtds', dauer: 'Doku', frage: 'Hintergrund zu den Bindungs- und Verkaufstricks.' }],
    hintergrund: 'Spiele befriedigen die Bedürfnisse nach Können, Selbstbestimmung und Zugehörigkeit; das erklärt ihre Anziehung besser als die Spielzeit (Przybylski, Rigby & Ryan). Die ICD-11 beschreibt die Computerspielstörung über drei Merkmale – eingeschränkte Kontrolle, wachsender Vorrang vor anderen Lebensbereichen, Fortsetzen trotz negativer Folgen – in der Regel über mindestens zwölf Monate und mit deutlicher Beeinträchtigung. Ausgaben für Lootboxen hängen mit problematischem Glücksspiel zusammen (Zendle & Cairns). Wirksam sind vor allem Ansätze, die an den Gründen des Spielens ansetzen und Selbstkontrolle stärken, statt nur Zeiten zu begrenzen (King & Delfabbro).',
    quellen: 'Przybylski, Rigby & Ryan (2010) · WHO, ICD-11 (6C51) · Zendle & Cairns (2018) · King & Delfabbro (2018).',
  },
}
export default d
