// SOLO AKTION #06 · NACHTS – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s06'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a06', nr: '06', datei: 'Solo-06-Nachts-Aktion', thema: 'Nachts', headline: 'Acht Aktionen für bessere Nächte.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:nele:muede', sticker: 'Zum Machen',
  start: ['„Geh halt früher ins Bett“ hilft keinem. **Hier probierst du aus, was wirklich etwas ändert.**', 'Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.'],
  aktionen: [
    {
      titel: 'Meine Nacht', bild: 'peep:nele:muede', icon: 'moon', zeit: '10 Min.', wer: 'beide', material: 'Stift',
      schritte: [
        'Jedes Kästchen ist eine Stunde der letzten Nacht.',
        '**Mal aus**, wann du geschlafen hast.',
        'Schreib **H**, wo du am Handy warst. Schreib **W**, wo du wach im Bett lagst.',
        'Dein Gegenüber füllt seine Zeile aus.',
        'Zählt die ausgemalten Kästchen.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['Uhr', '21', '22', '23', '0', '1', '2', '3', '4', '5', '6', '7', '8'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Wer hat mehr geschlafen?', kreis: ['ich', 'mein Gegenüber', 'beide gleich'] }, { f: 'Wo sind bei mir die meisten W und H?', kreis: ['am Anfang', 'mitten in der Nacht', 'am Morgen', 'nirgends'] }] },
      ],
      aha: 'Im Bett sein und schlafen sind **zwei verschiedene Dinge.**',
      ziel: 'Die eigene Nacht sichtbar machen – ohne Bewertung.',
      tipp: 'Die eigene Nacht ehrlich eintragen, auch das Handy. Keine Zahl kommentieren.',
    },
    {
      titel: 'Halb-drei-Gedanken', icon: 'clock-2', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber liest einen Gedanken vor.',
        'Erstes Kästchen: Wie wahr fühlt er sich **nachts** an? 0 bis 10.',
        'Zweites Kästchen: Wie wahr fühlt er sich **um zehn Uhr morgens** an?',
        'Schaut auf den Unterschied.',
      ],
      zonen: [{ art: 'werte', kopf: ['nachts', 'um zehn Uhr'], von: 'stimmt nicht', bis: 'stimmt total', zeilen: ['„Ich schaffe das nie.“', '„Keiner mag mich wirklich.“', '„Mit mir stimmt etwas nicht.“', '„Morgen wird schlimm.“', '„Ich habe alles falsch gemacht.“', '„Das wird nie besser.“'] }],
      aha: 'Nachts ist das Thema echt. **Die Größe stimmt nicht.**',
      ziel: 'Erleben: Derselbe Gedanke wiegt nachts mehr.',
      tipp: 'Nicht fragen, worum es bei den Gedanken geht. Hohe Zahlen auch am Vormittag: siehe Achtung.',
    },
    {
      titel: 'Nele rechnet', bild: 'peep:nele:verwirrt', icon: 'calculator', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Neles Nacht an.', 'Kreuz an: Was hält Nele wach?', 'Kreis ein: Welche Nele hat recht?'],
      zonen: [
        { art: 'comic', bilder: [['bed', '23:30 Uhr. Nele liegt im Bett.'], ['calculator', '1 Uhr. Sie rechnet: noch fünfeinhalb Stunden.'], ['cloud-storm', '2:30 Uhr. „Den Abschluss schaffe ich nie.“'], ['sun', '10 Uhr. „Das war übertrieben.“']] },
        { art: 'fragen', fragen: [{ f: 'Das hält Nele wach:', kreuz: ['auf die Uhr schauen', 'rechnen', 'grübeln', 'das Bett'] }, { f: 'Welche Nele hat recht?', kreis: ['die von halb drei', 'die von zehn Uhr', 'beide ein bisschen'] }] },
      ],
      aha: 'Wer nachts rechnet, bleibt wach. **Dreh die Uhr um.**',
      ziel: 'An Nele sehen, wie Grübeln und Rechnen wach halten.',
      tipp: '„Beide ein bisschen“ ist die beste Antwort – das Thema kann echt sein.',
    },
    {
      titel: 'Wachmacher', icon: 'bolt', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Denk an die **letzte Stunde** vor dem Schlafen.',
        'Kreuz an, was bei dir vorkommt.',
        'Dein Gegenüber kreuzt in einer anderen Farbe an.',
        'Jeder kreist **eine** Sache ein, die er heute Abend weglässt.',
      ],
      zonen: [{ art: 'wahl', punkte: [['device-mobile', 'Handy im Bett'], ['bottle', 'Energy oder Cola'], ['device-gamepad-2', 'zocken'], ['message-2', 'Streit oder Stress im Chat'], ['bulb', 'helles Licht'], ['tools-kitchen-2', 'spät und viel essen'], ['book', 'lernen im Bett'], ['zzz', 'langer Mittagsschlaf']] }],
      aha: 'Du musst nicht alles ändern. **Eine Sache reicht für den Anfang.**',
      ziel: 'Einen eigenen Wachmacher finden und einen Abend weglassen.',
      tipp: 'Selbst etwas einkreisen und nächstes Mal ehrlich berichten.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Bist du eher früh oder spät gebaut?') },
        { art: 'daumen', saetze: ['Ich bin ein Nachtmensch.', 'Morgens bin ich zu nichts zu gebrauchen.', 'Am Wochenende schlafe ich ganz anders.', 'Mein Alltag passt zu meiner inneren Uhr.'] },
      ],
      aha: 'Dass du abends spät müde wirst, ist Biologie. **Kein Charakterfehler.**',
      ziel: 'Die innere Uhr kennen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Licht-Test', icon: 'sun', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Kreis ein: Wie wach bist du **jetzt**?',
        'Geht zusammen **fünf Minuten raus** ans Tageslicht. Ohne Handy.',
        'Zurück. Kreis ein: Wie wach bist du **danach**?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So wach bin ich (0 schlafe gleich ein – 10 hellwach):', regler: ['vorher', 'nachher'] }, { f: 'Mein Gegenüber ist danach:', kreis: ['wacher', 'gleich', 'müder'] }] }],
      aha: 'Tageslicht stellt deine innere Uhr. **Zehn Minuten am Morgen wirken wie ein Wecker von innen.**',
      ziel: 'Die Wirkung von Tageslicht selbst spüren.',
      tipp: 'Wirklich rausgehen, auch bei Regen. Fenster reicht nicht.',
    },
    {
      titel: 'Bremse finden', icon: 'heartbeat', zeit: '10 Min.', wer: 'beide', material: 'Uhr mit Sekunden',
      schritte: [
        'Zähl deinen Puls: **15 Sekunden.** Zwei Finger an den Hals.',
        'Zwei Minuten atmen: **4 Sekunden ein, 6 Sekunden aus.** Dein Gegenüber zählt laut.',
        'Zähl den Puls noch einmal.',
        'Tauschen.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['Schläge in 15 Sek.', 'vorher', 'nach 2 Min. Atmen'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Lang ausatmen bremst den Körper. **Das kannst du messen.**',
      ziel: 'Eine Bremse kennen, die man im Bett benutzen kann.',
      tipp: 'Ruhig und gleichmäßig zählen. Wem schwindlig wird: normal weiteratmen.',
    },
    {
      titel: 'Mein 20-Minuten-Plan', bild: 'peep:nele:muede', icon: 'list-check', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Die Regel: Wer **20 Minuten** wach liegt, steht auf. Oder setzt sich im Bett auf.',
        'Kreuz an: Was Langweiliges machst du dann? Kein Handy.',
        'Leg es heute Abend **neben dein Bett.**',
        'Schreib deine Aufstehzeit auf. Jeden Tag ungefähr gleich.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['headphones', 'Hörbuch ohne Bildschirm'], ['book', 'ein langweiliges Buch'], ['puzzle', 'Rätselheft'], ['pencil', 'kritzeln'], ['glass', 'Wasser trinken'], ['window', 'aus dem Fenster schauen']] },
        { art: 'fragen', fragen: [{ f: 'Ich stehe jeden Tag auf um:', linien: 1 }] },
      ],
      aha: 'Wann du einschläfst, kannst du nicht steuern. **Wann du aufstehst, schon.**',
      ziel: 'Ein fertiger Plan für wache Nächte und eine feste Aufstehzeit.',
      tipp: 'Vorher mit der Wohngruppe oder Familie klären, ob nachts aufstehen erlaubt ist. Sonst: im Bett aufsetzen.',
    },
  ],
  woche: {
    titel: 'Sieben Nächte', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Mach jeden Morgen deine Kreuze.', 'Nur ankreuzen, was stimmt. **Leere Kästchen sind okay.**', 'Wette vorher: An wie vielen Tagen schläfst du „okay“?'],
    zonen: [
      { art: 'woche', zeilen: ['zur gleichen Zeit aufgestanden', '10 Minuten Tageslicht am Morgen', 'Wachmacher weggelassen', '20-Minuten-Plan benutzt', 'okay geschlafen'] },
      { art: 'karten', karten: [
        { titel: 'Nachts gilt', icon: 'moon', zeilen: ['Nach Mitternacht nichts entscheiden.', 'Das Thema ist echt, die Größe nicht.', 'Um zehn Uhr noch mal prüfen.'] },
        { titel: 'Mein Anker', icon: 'sunrise', zeilen: ['Jeden Tag gleich aufstehen:', '_Um', 'Danach zehn Minuten ans Licht.'] },
      ] },
    ],
    aha: 'Schlaf ändert sich langsam. **Zähl die Woche, nicht die Nacht.**',
    ziel: 'Eine Woche lang die eigenen Stellschrauben zählen.',
    tipp: 'Beim nächsten Mal nur fragen: Welche Zeile war am leichtesten?',
  },
  begleitung: { material: 'Uhr, Stifte, Handy', achtung: 'Schlaflosigkeit ist bei belasteten Jugendlichen häufig mit Albträumen, nächtlicher Angst oder früheren Erfahrungen verbunden, bei denen die Nacht nicht sicher war. Nicht ausfragen. Bei anhaltender Schlaflosigkeit, Albträumen oder nächtlichen Suizidgedanken ärztliche oder therapeutische Abklärung veranlassen und die zuständige Leitung (Responsable) einbeziehen. Schlafmittel sind kein Thema dieser Aktionen.', mehr: MEHR(s) },
}
export default d
