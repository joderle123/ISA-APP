// SOLO #02 · Grenzen – Muster-Heft im neuen Design (Auftrag 21.11.: Themen-Mappen wie die Module gestalten, ohne Overkill).
// Inhalt aus dossiers/solo/s02.ts (von Jugendlichen gegengelesen), neu gesetzt mit dem Modul-Baukasten.
// Entscheidungen:
// · Keine Hördatei: In der Bezugszeit sitzt immer eine erwachsene Person daneben und kann vorlesen.
// · Der Fall wird ein Bildstreifen (drei Felder mit Chloé und Mila) statt eines Textblocks – weniger Lesen, mehr Bild.
// · „Mauer oder Tor“ als Bild-Skala zwischen Mauer und Tor statt Kästchen-Tabelle – dieselbe Aufgabe, sofort verständlich.
// · Standort als Zahlenstrahl 0–10 zum Einkreisen. Video bleibt (geprüfter Link) mit QR-Code.
// · Kleine Wörterliste Deutsch–Französisch (viele sprechen zu Hause Französisch), Karten für die Tasche größer.
// · Seiten für die Bezugsperson bleiben vollständig (Ablauf, Haltung, Achtung, Quiz, Hintergrund).
import { mische } from './sachfach-gemeinsam.mjs'

const tief = '#D9542F'

export const MODUL = {
  id: 'solo-02', kuerzel: 'so2', nr: 2, nrText: '#02', sprache: 'de',
  kompakt: true, ohneLoesungen: true, deckH1: 'SOLO #02', fuss: 'SOLO #02 · Grenzen', stand: 'November 2026',
  klasse: 'Einzelarbeit', niveau: '12–17 Jahre · 45–50 Minuten',
  dateiname: 'Solo-02-Grenzen',
  fach: { de: 'Bezugszeit', fr: 'Temps de référence' },
  titel: { de: 'Grenzen', fr: 'Limites' },
  untertitel: { de: 'Mauer oder offenes Tor?', fr: 'Mur ou porte ouverte ?' },
  farben: { tief, mittel: mische(tief, 255, 0.55), zart: mische(tief, 255, 0.92), dunkel: mische(tief, 0, 0.35) },
  deckbild: ['chloe:besorgt:stehen', 'jana:froh:stehen'],
  blasen: [{ t: 'Klar.', x: 64, y: 96 }, { t: 'Kannst du mir 20 Euro leihen?', x: 128, y: 86 }],
  medien: [['message-circle', 'var(--sprechen)', 'Reden', 'zu zweit, in Ruhe'], ['book', 'var(--lesen)', 'Der Fall', 'eine kurze Geschichte'],
    ['pencil', 'var(--ueben)', 'Dein Teil', 'ankreuzen, rechnen, vergleichen'], ['scissors', 'var(--regel)', 'Mitnehmen', 'Karten für die Tasche']],
  teile: {
    start: { de: 'Ankommen', icon: 'door-enter' }, lesen: { de: 'Der Fall', icon: 'book' }, regel: { de: 'Gut zu wissen', icon: 'bulb' },
    ueben: { de: 'Dein Teil', icon: 'pencil' }, sprechen: { de: 'Reden', icon: 'messages' }, schreiben: { de: 'Mitnehmen', icon: 'backpack' }, check: { de: 'Wie war es?', icon: 'mood-smile' },
  },
  checkKopf: ['Heute …', 'stimmt', 'teils', 'noch nicht'],
  namensfelder: ['Name', 'Datum', 'mit wem'],
  quiz: [
    { f: 'Wer als Kind kein Nein haben durfte, hat es …', o: ['für immer verlernt', 'gar nicht nötig', 'nie geübt', 'falsch verstanden'], r: 2, warum: 'Nie geübt heißt: Es lässt sich nachholen.' },
    { f: 'Woran merkt man die eigene Grenze meistens zuerst?', o: ['am Körper', 'an den Worten', 'am schlechten Gewissen', 'erst am nächsten Tag'], r: 0, warum: 'Bauch, Kiefer, Schritt zurück – vor dem Gedanken.' },
    { f: '„Ich überleg’s mir“ ist …', o: ['feige', 'unhöflich', 'eine erlaubte Antwort', 'dasselbe wie Ja'], r: 2, warum: 'Zeit kaufen ist eine Grenze.' },
    { f: 'Du willst dein Ladekabel nicht verleihen. Brauchst du einen Grund?', o: ['ja, einen guten', 'ja, sonst ist es unhöflich', 'nur bei Freunden', 'nein'], r: 3, warum: 'Erklären darf man. Müssen nicht.' },
    { f: 'Jemand sagt Ja, schaut weg und wird still. Das ist …', o: ['ein klares Ja', 'wahrscheinlich kein echtes Ja', 'egal', 'ein Kompliment'], r: 1, warum: 'Worte und Körper passen nicht zusammen – nachfragen.' },
    { f: 'Wer immer Ja sagt, …', o: ['hat keine Probleme', 'ist bei allen beliebt', 'zahlt oft selbst den Preis', 'braucht keine Grenzen'], r: 2, warum: 'Siehe Chloé und die Schranktür.' },
    { f: 'Eine Mauer um sich herum …', o: ['schützt – und hält auch die Guten draußen', 'ist immer die beste Lösung', 'kostet nichts', 'haben nur Schwache'], r: 0, warum: 'Beides stimmt gleichzeitig.' },
    { f: 'Chloé sagt „Klar“ und tritt zu Hause gegen die Schranktür. Auf wen ist sie sauer?', o: ['auf Mila', 'auf ihre Eltern', 'auf alle', 'auf sich selbst'], r: 3, warum: 'Das Ja hat sie selbst gegeben – gegen ihren Willen.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #05']],
    wann: [
      'Sagt zu allem Ja und explodiert später – oder zieht sich zurück.',
      'Lässt niemanden an sich heran; jede Nähe wird abgewehrt.',
      'Überschreitet selbst Grenzen: Nähe, Sachen, Sprüche.',
      'Nach einem Vorfall, bei dem ein Nein überhört wurde.',
    ],
    ziel: 'Der Jugendliche erkennt sein eigenes Muster (zu weich, zu hart, je nach Person) als sinnvolle Schutzlösung – und probiert ein kleines Nein aus, das nichts kostet.',
    anschluss: 'Im Skills-Kurs vertieft REAL TALK #05 die Sätze dazu (Ich-Satz, Stopp).',
    ablauf: [
      ['0–5', 'Logbuch: Akku und letztes Experiment. Dann „Ankommen“: „Schon mal gehört?“ ohne Kommentar ankreuzen lassen, Standort einkreisen.'],
      ['5–20', 'Der Bildstreifen mit Chloé, die Frage dazu, die drei Behauptungen. Video gemeinsam schauen.'],
      ['20–40', '„Mauer oder Tor“ allein, „Chloés Rechnung“ gemeinsam, dann das Duell: Sie schreiben Ihre Zahlen wirklich auf.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden. Wenn Zeit ist: Der Jugendliche wählt eine Stufe bei „Reden“ und stellt Ihnen zuerst eine Frage.'],
    ],
    haltung: [
      'Mauer und Tor sind beides Lösungen, die einmal nötig waren. Erst würdigen, dann fragen, was sie heute kosten.',
      'Im Duell eigene Zahlen nicht anpassen. Unterschiede sind der Inhalt.',
      'Kein Rollenspiel erzwingen. Das Experiment draußen ist die Übung.',
      'Wenn der Jugendliche Ihnen gegenüber Nein sagt: Das ist der Erfolg der Stunde.',
    ],
    hinweise: [
      'Der Fall: Die Antwort auf die Frage zu Chloé steckt in „Chloés Rechnung“ – nicht vorwegnehmen.',
      '„Ich überleg’s mir“ ist für viele die Entdeckung: Zwischen Ja und Nein gibt es Zeit.',
      'Reden: Stufe 3 wählt nur der Jugendliche. Die letzte Frage verlangt keine Einzelheiten.',
    ],
    achtung: 'Das Thema kann Übergriffe berühren – eigene erlittene und eigene begangene. Nicht ausfragen, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt oder eine aktuelle Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Über eigene Grenzverletzungen ohne Beschämung sprechen: Es geht um den nächsten Moment.',
    videos: [
      { fuer: 'die Stunde', titel: 'Sozialexperiment: Wie viel Nähe verträgt der Mensch?', kanal: 'Quarks', dauer: 'die ersten 5 Min.', url: 'https://www.youtube.com/watch?v=wEALzPr7hBo' },
      { fuer: 'Sie selbst', titel: 'Einverständnis – so einfach wie Tee', kanal: 'GONEASTRAYfilms', dauer: 'ca. 3 Min.', url: 'https://www.youtube.com/watch?v=2ovcQgIN5G4', notiz: 'Handelt von sexuellem Einverständnis; passt, wenn das Thema von selbst aufkommt. Links geprüft am 14.11.2026.' },
    ],
    hintergrund: 'Menschen halten je nach Beziehung unterschiedliche Abstände ein und reagieren körperlich, wenn sie unterschritten werden (Hall). Die Fertigkeit, ein Anliegen oder ein Nein zu vertreten, ohne die Beziehung oder die Selbstachtung zu opfern, ist ein Kernstück des DBT-Skillstrainings, auch für Jugendliche (Linehan; Rathus & Miller). Wer früh erlebt hat, dass eigene Grenzen nicht zählen, entwickelt häufig überangepasstes oder stark abwehrendes Verhalten; beides lässt sich als Schutz verstehen (van der Kolk).',
    quellen: 'Hall (1966) · Linehan (2015) · Rathus & Miller (2015) · van der Kolk (2014).',
  },
}

export const LEKTIONEN = [
  {
    thema: 'Grenzen', titel: 'Mauer oder offenes Tor?',
    untertitel: '„Du musst lernen, Nein zu sagen.“ Hast du gehört. Mehrmals. Geholfen hat es ungefähr so viel wie „Reiß dich zusammen“. Hier geht es darum, **warum** es bei manchen nicht rauskommt – und bei anderen viel zu hart.',
    ziel: { de: 'Ich erkenne mein Muster bei Grenzen und probiere ein kleines Nein aus.', fr: 'Je reconnais ma façon de poser des limites et j’essaie un petit non.' },
    bild: ['chloe:besorgt:stehen'],
    start: {
      was: 'allein · 3 Minuten',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Schon mal gehört? Kreuze an.', stufe: 1, kopf: ['', 'schon gehört', 'hat geholfen'], breiten: [60, 20, 20], zeilen: [
          ['„Du musst lernen, Nein zu sagen.“', '', ''], ['„Setz doch einfach Grenzen.“', '', ''], ['„Sag Stopp, wenn es dir zu viel wird.“', '', ''],
          ['„Respektier die Grenzen der anderen.“', '', ''], ['„Das darfst du dir nicht gefallen lassen.“', '', '']] },
        { art: 'skala', auftrag: 'Wo stehst du? Kreise eine Zahl ein.', stufe: 1, pole: ['0 = leicht', '10 = fast unmöglich'], zeilen: ['Nein sagen', 'Jemanden nah ranlassen'] },
      ],
    },
    lesen: {
      was: 'Ein Bildstreifen', art: 'bd', ohneAudio: true, spalten: 3, titel: 'Chloé, 16', nummern: false,
      cases: [
        { erz: 'Chloé leiht alles her: Ladekabel, Hausaufgaben, ihr Bett, wenn eine Freundin Stress zu Hause hat.', bild: 'chloe:froh:stehen', blasen: [['Alle', 'Chloé ist die Netteste!']] },
        { erz: 'Am Freitag fragt Mila zum dritten Mal nach 20 Euro. Chloé hat selbst nur 25.', bild: ['jana:froh:stehen', 'chloe:verlegen:stehen'], blasen: [['Mila', 'Kannst du mir noch mal 20 Euro leihen?'], ['Chloé', 'Klar.']] },
        { erz: 'Zu Hause tritt sie gegen die Schranktür. Auf Mila ist sie nicht sauer. Auf sich schon.', bild: 'chloe:wuetend:stehen', blasen: [] },
      ],
      woerter: [['leihen', 'prêter'], ['die Grenze', 'la limite'], ['sauer sein', 'être fâché·e'], ['die Mauer', 'le mur'], ['das Tor', 'le portail'], ['Nein sagen', 'dire non']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Überleg zuerst allein. Dann redet ihr.', stufe: 2, fragen: [{ f: 'Warum ist Chloé sauer auf sich – und nicht auf Mila?', zeilen: 3 }] },
        { art: 'clip', auftrag: 'Video zusammen schauen: die ersten 5 Minuten.', stufe: 1, titel: 'Sozialexperiment: Wie viel Nähe verträgt der Mensch?', kanal: 'Quarks', dauer: 'ca. 5 Min.', url: 'https://www.youtube.com/watch?v=wEALzPr7hBo', frage: 'Woran sieht man, dass es jemandem zu nah wird – bevor er oder sie etwas sagt?', zeilen: 2 },
      ],
    },
    regel: {
      was: 'Drei Behauptungen – streich durch, was du schon kanntest',
      reihen: [
        [{ titel: 'Weich oder hart', text: 'Eine Grenze kann zu weich sein: Alle kommen rein. Oder zu hart: Keiner kommt ran. **Beides schützt. Beides kostet.**' },
         { titel: 'Der Körper zuerst', text: 'Bauch zieht sich zusammen, Kiefer wird fest, ein halber Schritt zurück. **Dein Nein ist da, bevor du es denkst.**' }],
        [{ titel: 'Gelernt, nicht angeboren', text: 'Wer als Kind kein Nein haben durfte, hat es nicht verlernt, **sondern nie geübt.** Das lässt sich nachholen.' }],
      ],
    },
    ueben: [
      { art: 'pole', auftrag: 'Mauer oder Tor? Wie ist deine Grenze bei … Kreuze pro Zeile einen Kreis an.', stufe: 1, links: { icon: 'wall', t: 'Mauer' }, rechts: { icon: 'door', t: 'offenes Tor' }, mitte: ['eher Mauer', 'passt', 'eher Tor'],
        zeilen: ['Familie', 'Freunden', 'Leuten, in die ich verknallt bin', 'Erwachsenen mit Macht: Lehrer, Betreuer, Polizei', 'Fremden im Netz'] },
      { art: 'fragen', auftrag: 'Beides hat einen Grund.', stufe: 2, fragen: [{ f: 'Meine Mauer schützt mich vor …', zeilen: 2 }, { f: 'Mein offenes Tor bringt mir …', zeilen: 2 }] },
      { art: 'tabelle', auftrag: 'Chloés Rechnung – zusammen: Mila fragt nach 20 Euro. Was kostet jede Antwort, was bringt sie?', stufe: 2, hoch: true, kopf: ['Chloé …', 'Das kostet sie', 'Das bringt ihr'], breiten: [32, 34, 34], zeilen: [
        ['sagt wieder „Klar.“', '', ''], ['sagt: „Diesmal nicht.“', '', ''], ['sagt: „Ich überleg’s mir.“', '', '']] },
      { art: 'tabelle', auftrag: 'Duell – wo ist deine Linie? Beide schreiben verdeckt eine Zahl: 0 = kein Problem, 10 = geht gar nicht. Dann aufdecken.', stufe: 3, kopf: ['Jemand …', 'du', 'dein Gegenüber'], breiten: [62, 19, 19], zeilen: [
        ['liest über deine Schulter deine Nachrichten mit', '', ''], ['umarmt dich zur Begrüßung, ohne zu fragen', '', ''],
        ['kommt in dein Zimmer, ohne zu klopfen', '', ''], ['postet ein Foto von dir, ohne zu fragen', '', '']] },
    ],
    sprechen: [
      { art: 'sprechen', auftrag: 'Sechs Fragen, von leicht bis tief. Du suchst die Stufe aus. Jede Frage darfst du zurückgeben – „Weiter“ gilt immer.', stufe: 2, karten: [
        { titel: 'Stufe 1 · leicht', text: ['Wem kannst du am leichtesten Nein sagen?', 'Welches Nein von jemand anderem hat dich zuletzt genervt?'] },
        { titel: 'Stufe 2 · ehrlich', text: ['Wann hast du zuletzt Ja gesagt und Nein gemeint?', 'Wer hält deine Grenzen ein, ohne dass du sie sagen musst?'] },
        { titel: 'Stufe 3 · tief', text: ['Welches Nein hast du zu spät verstanden?', 'Gibt es eine Grenze, die früher jemand übergangen hat – und die du heute verteidigen würdest? Du musst nicht sagen, welche.'] },
      ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Experiment bis zum nächsten Mal: **Das kleinste Nein.** Sag diese Woche einmal Nein zu etwas fast Egalem – bei jemandem in deinem Alter: Kaugummi, Sitzplatz, Lied. Ohne Grund, ohne Entschuldigung, ohne Lächeln.', stufe: 2,
        zeilen: 5, zeilenAnfaenge: ['Meine Wette – was macht der andere?', 'Was macht mein Körper?', '', 'Ergebnis, nächstes Mal:', ''] },
      { art: 'schneidekarten', auftrag: 'Für die Tasche: Schneide die Karten aus.', stufe: 1, spalten: 2, farbe: tief, karten: [
        { titel: 'Körper-Check', icon: 'activity', text: 'Bauch zieht sich zusammen?\nKiefer fest? Schritt zurück?\n**Dann ist es ein Nein** – auch wenn der Mund Ja sagt.' },
        { titel: 'Drei Sätze reichen', icon: 'hand-stop', text: '„Nein.“\n„Diesmal nicht.“\n„Ich überleg’s mir und sag dir Bescheid.“\nMein eigener Satz:', linien: 1 },
      ] },
    ],
    check: ['Ich weiß, wo meine Grenze eher Mauer und wo eher Tor ist.', 'Ich kenne drei Sätze für ein Nein.', 'Ich probiere das kleinste Nein aus.'],
  },
]
