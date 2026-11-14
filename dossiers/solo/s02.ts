// SOLO #02 · GRENZEN – Mauer oder offenes Tor: Nein sagen, Nein hören, Nähe und Abstand. Anschluss an REAL TALK #05.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's02', nr: '02', datei: 'Solo-02-Grenzen', reihe: 'Thema',
  thema: 'Grenzen', headline: 'Mauer oder offenes Tor?', farbe: '#FF5A36', stand: 'November 2026',
  bild: 'peep:chloe:besorgt', sticker: 'Deine Regeln',
  seiten: [
    {
      titel: 'Grenzen', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Du musst lernen, Nein zu sagen.“ Hast du gehört. Mehrmals. Geholfen hat es ungefähr so viel wie „Reiß dich zusammen“.',
          'Hier geht es nicht darum, wie man Nein sagt. Das weißt du. Es geht darum, **warum es bei manchen Leuten nicht rauskommt** – und bei anderen viel zu hart.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Du musst lernen, Nein zu sagen.“', '„Setz doch einfach Grenzen.“', '„Sag Stopp, wenn es dir zu viel wird.“', '„Respektier die Grenzen der anderen.“', '„Das darfst du dir nicht gefallen lassen.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = leicht, 10 = fast unmöglich. Kreise ein:', regler: ['Nein sagen', 'Ein Nein hören'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Was dir zu Grenzen wahrscheinlich noch keiner gesagt hat', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:chloe:besorgt', name: 'Chloé, 16',
          text: 'Chloé leiht alles her: Ladekabel, Hausaufgaben, ihr Bett, wenn eine Freundin Stress zu Hause hat. Alle sagen: „Chloé ist die Netteste.“ Am Freitag fragt Mila zum dritten Mal nach 20 Euro. Chloé hat selbst nur 25. Sie sagt: „Klar.“ Zu Hause tritt sie gegen die Schranktür. Auf Mila ist sie nicht sauer. Auf sich schon.',
          frage: 'Was kostet Chloé ein Ja – und was würde ein Nein kosten?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Zwei Arten kaputt', x: 'Eine Grenze kann zu weich sein: Alle kommen rein. Oder zu hart: Keiner kommt ran. **Beides schützt. Beides kostet.**' },
          { t: 'Der Körper zuerst', x: 'Bauch zieht sich zusammen, Kiefer wird fest, ein halber Schritt zurück. **Dein Nein ist da, bevor du es denkst.**' },
          { t: 'Gelernt, nicht angeboren', x: 'Wer als Kind kein Nein haben durfte, hat es nicht verlernt. **Er hat es nie geübt.** Das lässt sich nachholen.' },
        ] },
        { art: 'clip', clip: { titel: 'Sozialexperiment: Wie viel Nähe verträgt der Mensch?', kanal: 'Quarks', url: YT + 'wEALzPr7hBo', dauer: 'die ersten 5 Min.', frage: 'Woran sieht man, dass es jemandem zu nah wird – bevor er etwas sagt?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Bei wem ist deine Grenze ==eine Mauer== – und bei wem ==ein offenes Tor==?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Zwei Aufgaben für dich. Die dritte machen beide', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Mauer oder Tor', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Wie ist deine Grenze bei …', raster: { spalten: ['Mauer', 'eher Mauer', 'passt', 'eher Tor', 'Tor'], zeilen: ['Familie', 'Freunden', 'Leuten, in die ich verknallt bin', 'Erwachsenen mit Macht (Lehrer, Betreuer, Polizei)', 'Fremden im Netz'] } },
            { f: 'Beides hat einen Grund:', satz: ['Meine Mauer schützt mich vor:', 'Mein offenes Tor bringt mir:'] },
          ] },
        { art: 'fragen', titel: 'Chloés Rechnung', wie: 'zusammen', zeit: '6 Min.',
          fragen: [{ f: 'Mila fragt nach 20 Euro. Rechne durch:', preis: { erste: 'Chloé …', kopf: ['kostet sie', 'bringt ihr'], optionen: ['sagt wieder „Klar“', 'sagt: „Diesmal nicht.“', 'sagt: „Ich überleg’s mir.“'] } }] },
        { art: 'fragen', titel: 'Wo ist deine Linie?', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '6 Min.',
          kontext: 'Beide schreiben verdeckt eine Zahl von **0** (kein Problem) bis **10** (geht gar nicht). Dann aufdecken.',
          fragen: [{ f: 'Jemand …', preis: { erste: 'Situation', kopf: ['du', 'Gegenüber'], optionen: ['liest über deine Schulter deine Nachrichten mit', 'umarmt dich zur Begrüßung, ohne zu fragen', 'kommt in dein Zimmer, ohne zu klopfen', 'postet ein Foto von dir, ohne zu fragen'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Das kleinste Nein', x: 'Sag diese Woche einmal Nein zu etwas, das fast egal ist: zu einem Kaugummi, einem Sitzplatz, einem Lied. **Ohne Grund, ohne Entschuldigung, ohne Lächeln.** Beobachte: Was macht dein Körper – und was macht der andere?' },
        { art: 'karten', karten: [
          { titel: 'Körper-Check', icon: 'activity', zeilen: ['Bauch zieht sich zusammen?', 'Kiefer fest? Schritt zurück?', 'Dann ist es ein Nein – auch wenn der Mund Ja sagt.'] },
          { titel: 'Drei Sätze reichen', icon: 'hand-stop', zeilen: ['„Nein.“', '„Diesmal nicht.“', '„Ich überleg’s mir und sag dir Bescheid.“'], eigen: 'Meiner:' },
        ] },
        { art: 'tiefe', fragen: [
          ['Wem kannst du am leichtesten Nein sagen?', 'Welches Nein von jemand anderem hat dich zuletzt genervt?'],
          ['Wann hast du zuletzt Ja gesagt und Nein gemeint?', 'Wer hält deine Grenzen ein, ohne dass du sie sagen musst?'],
          ['Wessen Nein hast du schon mal übergangen?', 'Gibt es eine Grenze, die früher jemand bei dir übergangen hat – und die du heute verteidigen würdest? Du musst nicht sagen, welche.'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was ist eine Grenze?', o: ['eine Regel für andere', 'der Punkt, an dem es für mich nicht mehr okay ist', 'ein Zeichen von Schwäche', 'etwas, das nur Erwachsene haben'], r: 1, warum: 'Sie gehört zu einer Person, nicht zu einer Hausordnung.' },
    { f: 'Woran merkt man die eigene Grenze meistens zuerst?', o: ['am Körper', 'an den Worten', 'an der Uhrzeit', 'gar nicht'], r: 0, warum: 'Bauch, Kiefer, Schritt zurück – vor dem Gedanken.' },
    { f: '„Ich überleg’s mir“ ist …', o: ['feige', 'unhöflich', 'eine erlaubte Antwort', 'dasselbe wie Ja'], r: 2, warum: 'Zeit kaufen ist eine Grenze.' },
    { f: 'Muss man ein Nein begründen?', o: ['ja, immer', 'nur bei Erwachsenen', 'nein', 'nur schriftlich'], r: 2, warum: 'Erklären darf man. Müssen nicht.' },
    { f: 'Jemand sagt Ja, schaut weg und wird still. Das ist …', o: ['ein klares Ja', 'wahrscheinlich kein echtes Ja', 'egal', 'ein Kompliment'], r: 1, warum: 'Worte und Körper passen nicht zusammen – nachfragen.' },
    { f: 'Wer immer Ja sagt, …', o: ['hat keine Probleme', 'ist bei allen beliebt', 'zahlt oft selbst den Preis', 'braucht keine Grenzen'], r: 2, warum: 'Siehe Chloé und die Schranktür.' },
    { f: 'Eine Mauer um sich herum …', o: ['schützt – und hält auch die Guten draußen', 'ist immer die beste Lösung', 'kostet nichts', 'haben nur Schwache'], r: 0, warum: 'Beides stimmt gleichzeitig.' },
    { f: 'Du hörst ein Nein. Was jetzt?', o: ['weiterfragen, bis es ein Ja wird', 'beleidigt sein', '„Okay“ sagen', 'so tun, als hättest du nichts gehört'], r: 2, warum: 'Der schwerste und kürzeste Satz.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #05']],
    wann: ['Sagt zu allem Ja und explodiert später – oder zieht sich zurück.', 'Lässt niemanden an sich heran; jede Nähe wird abgewehrt.', 'Überschreitet selbst Grenzen: Nähe, Sachen, Sprüche.', 'Nach einem Vorfall, bei dem ein Nein überhört wurde.'],
    ziel: 'Der Jugendliche erkennt sein eigenes Muster (zu weich, zu hart, je nach Person) als sinnvolle Schutzlösung – und probiert ein kleines Nein aus, das nichts kostet.',
    anschluss: 'Im Skills-Kurs vertieft REAL TALK #05 die Sätze dazu (Ich-Satz, Stopp).',
    ablauf: [
      ['0–5', 'Logbuch: Akku und letztes Experiment. Dann Seite 1 – „Schon mal gehört?“ ohne Kommentar ankreuzen lassen.'],
      ['5–20', 'Der Fall und die drei Kästen. Video gemeinsam schauen. Die unbequeme Frage stellen und Stille aushalten.'],
      ['20–40', '„Mauer oder Tor“ allein, „Chloés Rechnung“ gemeinsam, dann das Duell: Sie schreiben Ihre Zahlen wirklich auf.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden. Wenn Zeit ist: Der Jugendliche wählt eine Stufe und stellt Ihnen zuerst eine Frage.'],
    ],
    haltung: ['Mauer und Tor sind beides Lösungen, die einmal nötig waren. Erst würdigen, dann fragen, was sie heute kosten.', 'Im Duell eigene Zahlen nicht anpassen. Unterschiede sind der Inhalt.', 'Kein Rollenspiel erzwingen. Das Experiment draußen ist die Übung.', 'Wenn der Jugendliche Ihnen gegenüber Nein sagt: Das ist der Erfolg der Stunde.'],
    hinweise: ['Seite 2: Die Lösung zur Szene ist die Rechnung auf Seite 3 – nicht vorwegnehmen.', 'Seite 3: „Ich überleg’s mir“ ist für viele die Entdeckung: Zwischen Ja und Nein gibt es Zeit.', 'Seite 4: Stufe 3 wählt nur der Jugendliche. Die letzte Frage verlangt keine Einzelheiten.'],
    achtung: 'Das Thema kann Übergriffe berühren – eigene erlittene und eigene begangene. Nicht ausfragen, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt oder eine aktuelle Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Über eigene Grenzverletzungen ohne Beschämung sprechen: Es geht um den nächsten Moment.',
    extra: [{ titel: 'Einverständnis – so einfach wie Tee', kanal: 'GONEASTRAYfilms', url: YT + '2ovcQgIN5G4', dauer: 'ca. 3 Min.', frage: 'Handelt von sexuellem Einverständnis; passt, wenn das Thema von selbst aufkommt.' }],
    hintergrund: 'Menschen halten je nach Beziehung unterschiedliche Abstände ein und reagieren körperlich, wenn sie unterschritten werden (Hall). Die Fertigkeit, ein Anliegen oder ein Nein zu vertreten, ohne die Beziehung oder die Selbstachtung zu opfern, ist ein Kernstück des DBT-Skillstrainings, auch für Jugendliche (Linehan; Rathus & Miller). Wer früh erlebt hat, dass eigene Grenzen nicht zählen, entwickelt häufig überangepasstes oder stark abwehrendes Verhalten; beides lässt sich als Schutz verstehen (van der Kolk).',
    quellen: 'Hall (1966) · Linehan (2015) · Rathus & Miller (2015) · van der Kolk (2014).',
  },
}
export default d
