// SOLO AKTION #02 · GRENZEN – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s02'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a02', nr: '02', datei: 'Solo-02-Grenzen-Aktion', thema: 'Grenzen', headline: 'Acht Aktionen. Wenig lesen. Viel machen.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:chloe:neutral', sticker: 'Zum Machen',
  start: ['Wo ist deine Grenze? **Das findest du hier heraus – mit den Füßen, nicht mit Reden.**', 'Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.'],
  aktionen: [
    {
      titel: 'Die Linie', bild: 'peep:chloe:neutral', icon: 'ruler-measure', zeit: '10 Min.', wer: 'beide', material: 'Klebeband oder Schnur',
      schritte: [
        'Dein Gegenüber bleibt stehen. Du stellst dich weit weg.',
        'Geh langsam hin. **Bleib stehen, wo es sich richtig anfühlt.**',
        'Kleb dort eine Linie auf den Boden. Zähl die Fußlängen dazwischen.',
        'Tauschen – nur wenn du willst: Dein Gegenüber kommt, du sagst **„Stopp“.**',
        'Vergleicht die zwei Linien.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['Abstand in Fußlängen', 'ich gehe hin', 'ich sage Stopp'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Was hat dein Körper kurz vor der Linie gemacht?', kreis: ['nichts', 'Bauch', 'Schultern hoch', 'Blick weg', 'Schritt zurück', 'gelacht'] }] },
      ],
      aha: 'Dein Körper weiß, wo deine Grenze ist. **Du musst nur hinhören.**',
      ziel: 'Die eigene Distanz spüren, bevor darüber geredet wird.',
      tipp: 'Zuerst geht der Jugendliche auf Sie zu. Nie über seine Linie treten, den Abstand nicht kommentieren. Wer nicht tauschen will, tauscht nicht.',
    },
    {
      titel: 'Körper-Check', icon: 'body-scan', zeit: '10 Min.', wer: 'beide', material: 'zwei dicke Stifte',
      schritte: [
        'Denk an einen Moment, in dem dir jemand zu nah kam. Oder zu viel wollte.',
        'Mal in die Figur: **Wo** hast du es gemerkt?',
        'Kreuz an, was dazu passt.',
        'Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur.',
      ],
      zonen: [{ art: 'koerper', woerter: ['Bauch zieht sich zusammen', 'Kiefer wird fest', 'Schritt zurück', 'Ich lächle – und meine es nicht', 'Ich werde still', 'Ich schaue weg', 'Mir wird heiß', 'Hände in die Taschen'] }],
      aha: 'Dein Nein ist da, **bevor du es denkst.** Der Körper sagt es zuerst.',
      ziel: 'Das eigene Körpersignal für „zu viel“ kennen.',
      tipp: 'Nicht fragen, an welchen Moment er denkt. Ihr eigenes Signal zeigen.',
    },
    {
      titel: 'Mauer oder Tor', bild: 'peep:chloe:besorgt', icon: 'door', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        '**Mauer** heißt: Keiner kommt an mich ran. **Tor** heißt: Alle kommen rein.',
        'Mach in jeder Zeile ein Kreuz.',
        'Dein Gegenüber kreuzt in einer anderen Farbe an.',
        'Schaut hin: Wo ist deine Mauer am höchsten?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Wie ist deine Grenze bei …', raster: { spalten: ['Mauer', 'passt', 'Tor'], zeilen: ['Familie', 'Freunden', 'Leuten, in die ich verknallt bin', 'Erwachsenen hier', 'Lehrern und Polizei', 'Fremden im Netz'] } }] }],
      aha: 'Mauer und offenes Tor schützen beide. **Und beide kosten etwas.**',
      ziel: 'Sehen, dass die eigene Grenze je nach Mensch anders ist.',
      tipp: 'Eine Mauer nicht „aufweichen“ wollen. Sie hatte einen Grund.',
    },
    {
      titel: 'Auf drei!', icon: 'numbers', zeit: '10 Min.', wer: 'beide', material: 'zwei Zettel zum Abdecken',
      schritte: [
        'Dein Gegenüber liest einen Satz vor.',
        'Beide schreiben **verdeckt** eine Zahl: **0** kein Problem. **10** geht gar nicht.',
        'Auf drei: aufdecken.',
        'Bei großem Unterschied sagt jeder **einen Satz** dazu. Mehr nicht.',
      ],
      zonen: [{ art: 'werte', kopf: ['du', 'Gegenüber'], von: 'kein Problem', bis: 'geht gar nicht', zeilen: [
        'liest meine Nachrichten mit', 'umarmt mich, ohne zu fragen', 'kommt ohne Klopfen in mein Zimmer', 'postet ein Foto von mir',
        'nimmt mein Handy in die Hand', 'setzt sich ganz dicht neben mich', 'leiht sich etwas, ohne zu fragen', 'fragt mich nach Geld',
      ] }],
      aha: 'Grenzen sind bei jedem anders. **Darum muss man sie sagen.**',
      ziel: 'Erleben, dass auch Erwachsene Grenzen haben – und andere.',
      tipp: 'Ehrliche eigene Zahlen. Bei „ohne Klopfen ins Zimmer“ Farbe bekennen, wenn das im Haus vorkommt.',
    },
    {
      titel: 'Chloé sagt „Klar“', bild: 'peep:chloe:verlegen', icon: 'coins', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Chloés Freitag an.', 'Kreuz an: Welchen Satz hätte Chloé sagen können?', 'Sag den Satz einmal **laut** – so, wie Chloé ihn sagen müsste.'],
      zonen: [
        { art: 'comic', bilder: [['gift', 'Chloé leiht alles her. Alle sagen: „Chloé ist die Netteste.“'], ['coins', 'Mila fragt zum dritten Mal nach 20 Euro. Chloé hat selbst nur 25.'], ['message-circle', 'Chloé sagt: „Klar.“'], ['door', 'Zu Hause tritt sie gegen die Schranktür.']] },
        { art: 'fragen', fragen: [{ f: 'Das hätte Chloé sagen können:', unter: true, kreuz: ['„Nein.“', '„Diesmal nicht.“', '„Ich überleg’s mir und sag dir Bescheid.“', '„Zehn kann ich dir geben. Mehr nicht.“'] }, { f: 'Auf wen ist Chloé sauer?', kreis: ['auf Mila', 'auf sich selbst', 'auf alle'] }] },
      ],
      aha: 'Wer immer Ja sagt, **zahlt selbst.**',
      ziel: 'Den Preis eines falschen Ja sehen – erst bei Chloé.',
      tipp: 'Den Satz wirklich laut sagen lassen, nicht nur ankreuzen. Sie sagen ihn auch.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 5 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Woran sieht man, dass es jemandem zu nah wird?') },
        { art: 'daumen', saetze: ['Ich merke sofort, wenn mir jemand zu nah kommt.', 'Ich sage es dann auch.', 'Bei Freunden ist mir Nähe egal.', 'Manche merken nicht, dass sie zu nah sind.'] },
      ],
      aha: 'Zu nah merkt man am Körper. **Bei sich – und bei anderen.**',
      ziel: 'Körpersignale bei anderen erkennen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Ohne Netz: Aktion auslassen.',
    },
    {
      titel: 'Nein-Training', bild: 'peep:chloe:neutral', icon: 'hand-stop', zeit: '12 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber bittet dich um etwas aus der Liste.',
        'Du sagst **„Nein.“** oder **„Diesmal nicht.“** Ohne Grund. Ohne Entschuldigung.',
        'Kreuz an: War es leicht oder schwer?',
        'Tauschen: Du fragst. Dein Gegenüber sagt Nein. Du sagst nur: **„Okay.“**',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: '„Gibst du mir …“', raster: { spalten: ['leicht', 'schwer'], zeilen: ['… ein Kaugummi?', '… deinen Stift?', '… deinen Platz?', '… kurz dein Handy?', '… fünf Euro?', '… deine Hausaufgaben?'] } }, { f: 'Ein Nein hören war für mich:', kreis: ['leicht', 'geht so', 'schwer'] }] }],
      aha: 'Ein Nein braucht keinen Grund. **Üben macht es leichter.**',
      ziel: 'Nein sagen und ein Nein annehmen – einmal gemacht, nicht nur besprochen.',
      tipp: 'Ein bisschen betteln ist erlaubt, Druck nicht. Das „Okay“ beim Tauschen ist die schwerere Hälfte.',
    },
    {
      titel: 'Meine Regeln', icon: 'list-check', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Hier geht es um die Zeit mit deinem Gegenüber.',
        'Kreuz an: Welche **drei** Regeln sind dir wichtig?',
        'Dein Gegenüber sagt seine drei.',
        'Gebt euch die Hand drauf. Oder nickt. **Ab jetzt gilt es.**',
      ],
      zonen: [
        { art: 'wahl', punkte: [['door', 'erst klopfen'], ['hand-off', 'mich nicht anfassen'], ['device-mobile', 'mein Handy ist meins'], ['clock', 'pünktlich anfangen'], ['ear', 'ausreden lassen'], ['message-off', 'nicht über mich reden, ohne dass ich es weiß'], ['arrows-horizontal', 'Abstand am Tisch'], ['player-pause', 'Pause, wenn ich sie brauche']] },
        { art: 'fragen', fragen: [{ f: 'Meine eigene Regel:', linien: 1 }] },
      ],
      aha: 'Wer seine Regeln sagt, **muss sie seltener verteidigen.**',
      ziel: 'Echte Absprachen für die Bezugszeit – sie gelten ab sofort.',
      tipp: 'Nur zusagen, was Sie halten können. Die Regeln beim nächsten Mal von sich aus einhalten und benennen.',
    },
  ],
  woche: {
    titel: 'Das kleinste Nein', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Sag diese Woche einmal Nein zu etwas fast Egalem – bei jemandem in deinem Alter.', '**Ohne Grund, ohne Entschuldigung.**', 'Mach jeden Abend einen Strich, wo er passt.'],
    zonen: [
      { art: 'woche', zeilen: ['Ich habe Nein gesagt', 'Ja gesagt – Nein gemeint', 'Jemand hat mein Nein gehalten', 'Ich habe ein Nein gehört'] },
      { art: 'karten', karten: [
        { titel: 'Körper-Check', icon: 'activity', zeilen: ['Bauch zieht sich zusammen?', 'Kiefer fest? Schritt zurück?', 'Dann ist es ein Nein.'] },
        { titel: 'Drei Sätze', icon: 'hand-stop', zeilen: ['„Nein.“', '„Diesmal nicht.“', '„Ich überleg’s mir.“'] },
      ] },
    ],
    aha: 'Ein kleines Nein ist Training für das große.',
    ziel: 'Eine Woche lang Ja und Nein zählen.',
    tipp: 'Beim nächsten Mal zuerst die Liste ansehen. Die Zeile „Ja gesagt – Nein gemeint“ ist die wichtigste.',
  },
  begleitung: { material: 'Klebeband, Stifte, Handy', achtung: s.begleitung.achtung + ' Bei „Die Linie“ gilt: Der Jugendliche bestimmt den Abstand, Berührung gehört nicht zur Übung.', mehr: MEHR(s) },
}
export default d
