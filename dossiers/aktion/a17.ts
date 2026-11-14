// SOLO AKTION #17 · KÖRPER – acht Aktionen zum Machen und ein Auftrag für die Woche. Kein Gewicht, keine Größe, keine Kalorie.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s17'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a17', nr: '17', datei: 'Solo-17-Koerper-Aktion', thema: 'Körper', headline: 'Acht Aktionen. Benutzen statt prüfen.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:sami:verlegen', sticker: 'Benutzen statt prüfen',
  start: ['Hier sagt dir niemand, wie du aussiehst. **Hier kommt kein Gewicht vor, keine Größe, keine Kalorie.**', 'Du probierst aus, wer wirklich hinschaut – und was dein Feed mit dir macht.'],
  aktionen: [
    {
      titel: 'Der Scheinwerfer', bild: 'peep:sami:nervoes', icon: 'focus-2', zeit: '15 Min.', wer: 'beide', material: 'Klebezettel',
      schritte: [
        'Kleb dir einen bunten Zettel an den Ärmel. Dein Gegenüber auch.',
        'Wette: Wie viele von **fünf Leuten** merken es?',
        'Geht zusammen durchs Haus. An fünf Leuten vorbei.',
        'Zählt: Wer hat geschaut oder etwas gesagt?',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['von 5 Leuten', 'meine Wette', 'wirklich gemerkt'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Es haben gemerkt:', kreis: ['mehr als gedacht', 'so viele wie gedacht', 'weniger als gedacht'] }] },
      ],
      aha: 'Du fühlst dich wie im Scheinwerfer. **Kaum jemand schaut so genau hin wie du selbst.**',
      ziel: 'Am eigenen Versuch erleben: Andere bemerken viel weniger.',
      tipp: 'Selbst mitmachen. Niemanden vorwarnen. Wer nicht durchs Haus will: Hosenbein hochkrempeln und in einen einzigen Raum gehen.',
    },
    {
      titel: 'Benutzen', icon: 'run', zeit: '12 Min.', wer: 'beide', material: 'Papier, Uhr, Papierkorb',
      schritte: [
        'Drei kleine Wettkämpfe. Dein Gegenüber macht mit.',
        '**Auf einem Bein stehen** – wie viele Sekunden?',
        '**Zehn Papierkugeln** in den Korb – wie viele Treffer?',
        '**Papierflieger** – wie viele Schritte weit?',
        'Danach ein Kreis: Wie oft hast du dabei an dein Aussehen gedacht?',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['', 'ein Bein (Sek.)', 'Treffer von 10', 'Flieger (Schritte)'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'An mein Aussehen habe ich gedacht:', kreis: ['gar nicht', 'kurz', 'die ganze Zeit'] }] },
      ],
      aha: 'Wer seinen Körper **benutzt**, hat weniger Zeit, ihn zu prüfen.',
      ziel: 'Den Körper als Werkzeug erleben, nicht als Bild.',
      tipp: 'Es geht um Spaß, nicht um Leistung. Verlieren Sie ruhig. Den Körper des Jugendlichen nie kommentieren – auch nicht lobend.',
    },
    {
      titel: 'Sami im Schwimmbad', bild: 'peep:sami:verlegen', icon: 'swimming', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Samis Sommer an.', 'Kreuz an: Was lässt Sami wegen seines Aussehens?', 'Kreis ein: Was würde sich ändern, wenn er aussähe wie im Video?'],
      zonen: [
        { art: 'comic', bilder: [['swimming', 'Im Schwimmbad ist Sami der Lauteste – und der Einzige im T-Shirt.'], ['device-mobile', 'Zu Hause schaut er Videos von Typen mit Bauchmuskeln.'], ['tools-kitchen-2', 'Beim Essen ist er als Erster fertig: „Kein Hunger.“'], ['message-circle', 'Seine Schwester sagt: „Du bist doch ganz normal.“ Das Wort hasst er.']] },
        { art: 'fragen', fragen: [{ f: 'Das lässt Sami:', kreuz: ['schwimmen ohne T-Shirt', 'in Ruhe essen', 'Videos schauen'] }, { f: 'Sähe er aus wie im Video, wäre:', kreis: ['alles anders', 'ein bisschen anders', 'fast nichts anders'] }] },
      ],
      aha: 'Sami glaubt, alle schauen auf seinen Bauch. **Sie schauen auf den Lautesten im Becken.**',
      ziel: 'An Sami sehen, was der eigene Blick kostet.',
      tipp: 'Nicht sagen „Sami sieht doch gut aus“ – das ist der Satz der Schwester.',
    },
    {
      titel: 'Feed zählen', icon: 'chart-dots', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Öffne deinen Feed. Kein Handy hier? Nimm das von deinem Gegenüber.',
        'Zähl die nächsten **20 Bilder mit Menschen.**',
        'Strich links: sieht aus wie Leute, die ich kenne. Strich rechts: sieht aus wie niemand, den ich kenne.',
        'Dein Gegenüber zählt in seinem Feed.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['20 Bilder', 'wie Leute, die ich kenne', 'wie niemand, den ich kenne'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Dein Feed zeigt Leute, **die es in deinem Leben nicht gibt.** Mit denen vergleichst du dich.',
      ziel: 'Sehen, wie verzerrt die Vergleichsgruppe ist.',
      tipp: 'Nicht aufs Handy schauen. Nur die Striche zählen.',
    },
    {
      titel: 'Das beste Schuh-Foto', bild: 'peep:sami:aufgeregt', icon: 'camera', zeit: '12 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Mach ein Foto von deinem Schuh. Einfach so.',
        'Jetzt mach **das beste Schuh-Foto der Welt:** Licht, Winkel, Filter. So viele Versuche, wie du willst.',
        'Legt das erste und das beste Foto nebeneinander.',
        'Dein Gegenüber macht es mit seinem Schuh.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So viele Versuche habe ich gebraucht:', kreis: ['1–3', '4–10', 'mehr als 10'] }, { f: 'Das erste und das beste Foto sind:', kreis: ['fast gleich', 'ziemlich anders', 'ein anderer Schuh'] }] }],
      aha: 'Was du im Netz siehst, ist **das beste von sehr vielen Fotos.** Bei Schuhen. Und bei Körpern.',
      ziel: 'Die Tricks selbst anwenden – an einem harmlosen Gegenstand.',
      tipp: 'Ausdrücklich kein Selfie, kein Foto vom Körper. Der Schuh reicht.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Welche Accounts machen das mit dir?') },
        { art: 'daumen', saetze: ['Bilder im Netz sind bearbeitet. Das weiß ich.', 'Sie wirken trotzdem auf mich.', 'Das betrifft nur Mädchen.', 'Ich folge Accounts, nach denen es mir schlechter geht.'] },
      ],
      aha: 'Der Vergleich ist gezinkt. **Er wirkt trotzdem – auch wenn du es weißt.**',
      ziel: 'Wissen und Wirkung auseinanderhalten.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Jungen betrifft es genauso.',
    },
    {
      titel: 'Was ich lasse', icon: 'ban', zeit: '10 Min.', wer: 'allein', material: '',
      schritte: [
        '**Keiner schaut mit.**',
        'Kreuz an: Was lässt du wegen deines Aussehens?',
        'Zweites Kreuz: Was davon würdest du gern **wieder machen**?',
        'Du entscheidest, ob du etwas davon sagst.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Wegen meines Aussehens:', raster: { spalten: ['lasse ich', 'würde ich gern wieder'], zeilen: ['schwimmen gehen', 'Fotos von mir zulassen', 'vor anderen essen', 'bestimmte Sachen anziehen', 'Sport mit anderen', 'jemanden ansprechen'] } }] }],
      aha: 'Was würdest du machen, wenn es dir einen Tag egal wäre? **Fang mit dem Kleinsten an.**',
      ziel: 'Sehen, was der Blick auf sich selbst im Alltag kostet.',
      tipp: 'Wirklich wegschauen. Ein Kreuz bei „vor anderen essen“, von dem Sie erfahren: siehe Achtung.',
    },
    {
      titel: 'Drei weg', icon: 'user-minus', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Such **drei Accounts**, nach denen du dich schlechter fühlst.',
        'Entfolge ihnen. **Nur für eine Woche.** Danach kannst du zurück.',
        'Folge einem Account, bei dem Leute etwas **machen**: Sport, Musik, Bauen, Kochen.',
        'Dein Gegenüber räumt seinen Feed auch auf.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Entfolgt habe ich:', kreis: ['0', '1', '2', '3'] }, { f: 'Neu dazu:', kreis: ['ja', 'noch nichts gefunden'] }, { f: 'Mein Gegenüber hat entfolgt:', kreis: ['0', '1', '2', '3'] }] }],
      aha: 'Dein Feed ist kein Schicksal. **Du baust ihn selbst.**',
      ziel: 'Den eigenen Feed sofort verändern.',
      tipp: 'Nicht fragen, welche Accounts es sind. Selbst wirklich drei entfolgen.',
    },
  ],
  woche: {
    titel: 'Eine Sache trotzdem', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Such dir **die kleinste Sache** aus, die du wegen deines Aussehens lässt.', 'Mach sie diese Woche einmal.', 'Mach jeden Abend deine Kreuze.'],
    zonen: [
      { art: 'woche', zeilen: ['etwas gemacht, das ich sonst lasse', 'Körper benutzt: laufen, tanzen, Sport', 'Spiegel: kurzer Blick, keine Fehlersuche'] },
      { art: 'karten', karten: [
        { titel: 'Benutzen statt prüfen', icon: 'run', zeilen: ['Was hat mein Körper heute für mich gemacht?', 'Heute hat er mich getragen. Das reicht.', 'Er muss mich tragen, nicht gefallen.'] },
        { titel: 'Spiegel-Regel', icon: 'eye', zeilen: ['Ein kurzer Blick reicht.', 'Keine Suche nach Fehlern.', 'Kaum jemand schaut so genau hin wie ich.'] },
      ] },
    ],
    aha: 'Jedes Mal, wenn du es trotzdem machst, **wird der Scheinwerfer schwächer.**',
    ziel: 'Eine vermiedene Sache einmal tun.',
    tipp: 'Nicht fragen, was es war. Fragen: „Hat es jemand gemerkt?“',
  },
  begleitung: { material: 'Klebezettel, Papier, Papierkorb, Uhr, beide Handys', achtung: 'Warnzeichen für eine Essstörung ernst nehmen: deutliche Gewichtsveränderung, starre Essensregeln, Auslassen von Mahlzeiten, Erbrechen, übermäßiger Sport, Rückzug beim Essen. Dann zeitnah ärztliche und kinder- und jugendpsychiatrische Abklärung veranlassen – Essstörungen können lebensbedrohlich werden. Hinweise auf Selbstverletzung ruhig aufgreifen und nach dem Verfahren der Einrichtung handeln. Den Körper des Jugendlichen nie kommentieren, auch nicht lobend; keine Zahlen zu Gewicht, Größe oder Essen; keine Fotos vom Körper. Unwohlsein mit dem Körper kann mit Fragen der Geschlechtsidentität zu tun haben: respektvoll zuhören und bei Bedarf an eine Fachstelle vermitteln.', mehr: MEHR(s) },
}
export default d
