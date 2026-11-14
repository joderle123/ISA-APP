// SOLO AKTION #08 · ALLEIN – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s08'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a08', nr: '08', datei: 'Solo-08-Allein-Aktion', thema: 'Allein', headline: 'Acht Aktionen. Eine Person reicht.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:amira:neutral', sticker: 'Zum Machen',
  start: ['Viele Leute um sich haben und trotzdem allein sein – das kennen mehr, als du denkst.', '**Hier übst du die kleinen Schritte.** Jede Aktion dauert 10 bis 15 Minuten.'],
  aktionen: [
    {
      titel: 'Mein Kreis', icon: 'target', zeit: '10 Min.', wer: 'beide', material: 'Stift',
      schritte: [
        'Der Punkt in der Mitte bist du.',
        'Schreib **Anfangsbuchstaben** in die Ringe. Tiere und Leute aus dem Netz zählen.',
        'Mach einen **Pfeil** an jemanden, den du gern näher hättest.',
        'Dein Gegenüber zeichnet seinen Kreis auf ein eigenes Blatt.',
      ],
      zonen: [{ art: 'ringe', ringe: ['Darf fast alles wissen.', 'Mit denen ist es gut.', 'Sind einfach da.'] }],
      aha: 'Ein Mensch im inneren Ring ist mehr wert als zwanzig außen.',
      ziel: 'Das eigene Netz sehen – und einen Wunsch markieren.',
      tipp: 'Wenige Buchstaben nicht bedauern. Fragen: „Wer davon weiß, dass er drinsteht?“',
    },
    {
      titel: 'Kontakte-Check', bild: 'peep:amira:neutral', icon: 'address-book', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Öffne deine Kontakte oder Chats. Kein Handy? Schätz aus dem Kopf.',
        'Zähl: Wie viele **Kontakte** hast du?',
        'Wie vielen hast du **diese Woche** geschrieben?',
        'Bei wie vielen ging es um **etwas Echtes**?',
      ],
      zonen: [{ art: 'tabelle', kopf: ['', 'Kontakte', 'diese Woche geschrieben', 'etwas Echtes'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Viele Kontakte sind nicht dasselbe wie **nah.**',
      ziel: 'Den Unterschied zwischen Kontakt und Nähe in Zahlen sehen.',
      tipp: 'Die eigenen Zahlen zuerst nennen. Die letzte Spalte ist auch bei Erwachsenen klein.',
    },
    {
      titel: 'Amira sagt „Mal sehen“', bild: 'peep:amira:traurig', icon: 'message-question', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Amiras Woche an.', 'Kreuz an: Wovor schützt sich Amira?', 'Kreuz an: Was könnte sie Sara schreiben?'],
      zonen: [
        { art: 'comic', bilder: [['address-book', 'Amira hat 212 Kontakte.'], ['mood-smile', 'In der Pause lacht sie an den richtigen Stellen.'], ['message-circle', 'Sara fragt: „Kommst du Samstag mit?“'], ['message-question', 'Amira sagt: „Mal sehen.“ Sie will. Aber was, wenn es komisch wird?']] },
        { art: 'fragen', fragen: [{ f: 'Davor schützt sich Amira:', kreuz: ['dass es komisch wird', 'vor Sara', 'vor Langeweile'] }, { f: 'Das könnte sie schreiben:', unter: true, kreuz: ['„Bin dabei. Wer kommt noch?“', '„Mal sehen.“', '„Ich komme eine Stunde.“'] }] },
      ],
      aha: 'Wer nicht hingeht, kann nicht abgelehnt werden. **Und auch nicht dazugehören.**',
      ziel: 'Rückzug als Schutz verstehen – erst bei Amira.',
      tipp: 'Nicht drängen („Du musst halt hingehen“). „Eine Stunde“ ist die brauchbarste Antwort.',
    },
    {
      titel: 'Gesichter raten', icon: 'mood-neutral', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber sucht sich heimlich ein Wort aus der Liste aus.',
        'Es macht **das Gesicht** dazu. Ohne Worte.',
        'Du rätst. Richtig? Ein Strich.',
        'Fünf Gesichter. Dann tauschen.',
      ],
      zonen: [
        { art: 'fragen', fragen: [{ f: 'Die Liste:', kreis: ['müde', 'genervt', 'konzentriert', 'freundlich', 'gelangweilt', 'unsicher', 'ganz normal'] }] },
        { art: 'tabelle', kopf: ['', 'richtig geraten von 5'], zeilen: ['Du', 'Dein Gegenüber'] },
      ],
      aha: 'Ein normales Gesicht ist kein Nein. **Dein Kopf rät – und rät oft falsch.**',
      ziel: 'Erleben, wie leicht man Gesichter falsch liest.',
      tipp: '„Ganz normal“ und „konzentriert“ unbedingt drannehmen – die werden am häufigsten als „genervt“ gelesen.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Wo in der Spirale stehst du gerade – wenn überhaupt?') },
        { art: 'daumen', saetze: ['Man kann unter vielen Leuten allein sein.', 'Ich kenne das Gefühl.', 'Einsam sein ist peinlich.', 'Eine Person reicht.'] },
      ],
      aha: 'Einsamkeit ist kein Fehler. **Sie ist ein Alarm – wie Hunger.**',
      ziel: 'Einsamkeit als Signal verstehen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Eine Frage zurück', bild: 'peep:amira:ruhig', icon: 'messages', zeit: '10 Min.', wer: 'beide', material: 'Uhr mit Sekunden',
      schritte: [
        'Dein Gegenüber fragt dich etwas zum Thema.',
        '**Runde 1:** Du antwortest so kurz wie möglich. Stoppt die Zeit, bis es still wird.',
        '**Runde 2:** Du antwortest – und stellst **eine Frage zurück.** Stoppt wieder.',
        'Vergleicht die Sekunden.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['Sekunden', 'Essen', 'Musik', 'Wochenende'], zeilen: ['nur antworten', 'antworten + Frage zurück'] }],
      aha: 'Eine Frage zurück – **und das Gespräch lebt.** Mehr braucht es nicht.',
      ziel: 'Die einfachste Gesprächstechnik üben und ihre Wirkung messen.',
      tipp: 'In Runde 1 nichts retten – die Stille gehört dazu. In Runde 2 ehrlich antworten.',
    },
    {
      titel: 'Eine Nachricht', icon: 'send', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Such dir **einen Menschen** aus, bei dem es länger her ist.',
        'Kreuz an, womit du anfängst. Oder schreib deinen eigenen Satz.',
        'Schreib die Nachricht. **Abschicken oder nur speichern** – du entscheidest.',
        'Dein Gegenüber schreibt auch jemandem.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Anfang:', unter: true, kreuz: ['„Hey, wie läuft’s bei dir?“', '„Hab gerade an dich gedacht.“', '„Das hier hat mich an dich erinnert.“ (mit Bild)', '„Lust, mal wieder …?“'] }, { f: 'Meine Nachricht ist:', kreis: ['abgeschickt', 'gespeichert', 'heute nicht'] }] }],
      aha: 'Der erste Schritt kostet **zehn Sekunden Mut.**',
      ziel: 'Einen echten Kontaktversuch machen – jetzt, nicht „irgendwann“.',
      tipp: 'Selbst wirklich eine Nachricht schicken. Nicht mitlesen, nicht nach dem Namen fragen. Auf Antworten nicht warten lassen: weitermachen.',
    },
    {
      titel: 'Sicher oder vermutet?', icon: 'zoom-question', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber liest einen Gedanken vor.',
        'Kreuz an: **Weiß** man das sicher? Oder **vermutet** man es nur?',
        'Kreis ein: Wie findet man es heraus?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Der Gedanke:', raster: { spalten: ['sicher', 'nur vermutet'], zeilen: ['„Die wollen mich nicht dabeihaben.“', '„Sie antwortet nicht. Sie mag mich nicht.“', '„Wenn ich hingehe, wird es komisch.“', '„Keiner würde merken, wenn ich fehle.“', '„Die lachen über mich.“'] } }, { f: 'So findet man es heraus:', kreis: ['nachfragen', 'hingehen', 'abwarten'] }] }],
      aha: 'Weißt du es von **diesen** Leuten – oder von früher? Nachfragen kostet weniger als ein Abend grübeln.',
      ziel: 'Vermutung und Wissen trennen.',
      tipp: 'Misstrauen ist oft eine vernünftige Erfahrung. Nicht sagen „Das bildest du dir ein“.',
    },
  ],
  woche: {
    titel: 'Zehn Sekunden mehr', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Bleib dreimal diese Woche **zehn Sekunden länger** in einem Kontakt.', 'Eine Frage mehr. Eine Nachricht mehr. Einmal nicht als Erster gehen.', 'Mach danach einen Strich.'],
    zonen: [
      { art: 'woche', zeilen: ['eine Frage mehr gestellt', 'eine Nachricht mehr geschrieben', 'nicht als Erster gegangen', 'jemand kam auf mich zu'] },
      { art: 'karten', karten: [
        { titel: 'Heute oder früher?', icon: 'eye', zeilen: ['Ich denke: „Die wollen mich nicht.“', 'Weiß ich das von diesen Leuten?', 'Einmal nachfragen.'] },
        { titel: 'Kleine Schritte', icon: 'stairs-up', zeilen: ['eine Frage zurück stellen', 'etwas Kleines von mir erzählen', 'einmal Ja sagen und eine Stunde bleiben'] },
      ] },
    ],
    aha: 'Nähe entsteht nicht auf einmal. **Sie entsteht in Zehn-Sekunden-Stücken.**',
    ziel: 'Drei kleine Kontakt-Schritte in einer Woche.',
    tipp: 'Die letzte Zeile ist die wichtigste: Sie zeigt, dass andere reagieren.',
  },
  begleitung: { material: 'beide Handys, Uhr, Stifte', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
