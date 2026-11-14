// SOLO AKTION #10 · NULL BOCK – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s10'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a10', nr: '10', datei: 'Solo-10-Null-Bock-Aktion', thema: 'Null Bock', headline: 'Acht Aktionen. Jede fängt klein an.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:lio:gelangweilt:egal', sticker: 'Fünf Minuten',
  start: ['„Du könntest, wenn du wolltest“ hat noch keinem geholfen. **Hier probierst du aus, wie Anfangen geht.**', 'Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.'],
  aktionen: [
    {
      titel: 'Fünf Minuten', bild: 'peep:lio:gelangweilt', icon: 'alarm', zeit: '10 Min.', wer: 'beide', material: 'Timer, eine echte Aufgabe',
      schritte: [
        'Nimm **eine echte Sache**, die du schiebst. Dein Gegenüber nimmt auch eine.',
        'Wette: Wie schlimm wird es? Kreis ein.',
        'Timer auf **5 Minuten.** Nur anfangen. Nicht fertig werden.',
        'Der Timer klingelt: **Aufhören ist erlaubt.**',
        'Kreis ein: Wie schlimm war es wirklich?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So schlimm (0 gar nicht – 10 furchtbar):', regler: ['meine Wette', 'so war es'] }, { f: 'Nach fünf Minuten habe ich:', kreis: ['aufgehört', 'weitergemacht'] }] }],
      aha: 'Lust kommt nicht vorher. **Sie kommt, wenn du schon dran bist.**',
      ziel: 'Erleben, dass Anfangen weniger schlimm ist als die Vorstellung davon.',
      tipp: 'Selbst eine echte Schiebe-Sache mitbringen. Aufhören nach fünf Minuten ist bestanden – nicht überreden.',
    },
    {
      titel: 'Drei Sorten Nein', icon: 'arrows-split', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Von außen sieht es gleich aus: Er macht es nicht.',
        'Von innen sind es **drei verschiedene Dinge.**',
        'Mach in jeder Zeile ein Kreuz. Oder keins, wenn es läuft.',
        'Dein Gegenüber kreuzt in einer anderen Farbe an.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Bei mir ist es:', raster: { spalten: ['kann ich nicht', 'will ich nicht', 'trau mich nicht'], zeilen: ['pünktlich da sein', 'nachfragen, wenn ich etwas nicht verstehe', 'mit einer Aufgabe anfangen', 'vor anderen etwas sagen', 'für eine Arbeit lernen', 'um Hilfe bitten'] } }] }],
      aha: 'Drei Sorten Nein brauchen **drei verschiedene Lösungen.**',
      ziel: 'Können, Wollen und Trauen unterscheiden.',
      tipp: '„Will ich nicht“ ist erlaubt. Fragen: „Was willst du stattdessen?“',
    },
    {
      titel: 'Lio und das Referat', bild: 'peep:lio:traurig', icon: 'presentation', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Lios drei Wochen an.', 'Die Lehrerin schreibt: „Kein Interesse.“ Kreis ein: Stimmt das?', 'Kreuz an: Was steckt hinter „egal“?'],
      zonen: [
        { art: 'comic', bilder: [['presentation', 'Lio hat drei Wochen Zeit für ein Referat.'], ['hourglass', 'Jeden Abend: erst essen, erst das Video, erst aufräumen.'], ['message-circle', 'Am Abend davor: „Ist mir eh egal. Ich bin halt dumm.“'], ['bed', 'Am Morgen ist ihm schlecht. Er bleibt zu Hause.']] },
        { art: 'fragen', fragen: [{ f: '„Kein Interesse.“ Stimmt das?', kreis: ['ja', 'nein', 'weiß nicht'] }, { f: 'Hinter „egal“ steckt:', unter: true, kreuz: ['Angst, es nicht zu schaffen', 'Faulheit', 'zu wenig Zeit'] }] },
      ],
      aha: 'Wer es nicht versucht, kann nicht scheitern. **„Egal“ ist ein Schutz.**',
      ziel: 'Hinter „egal“ die Angst vor dem Versagen sehen – erst bei Lio.',
      tipp: 'Den Satz „Du könntest, wenn du wolltest“ in keiner Form sagen.',
    },
    {
      titel: 'Der Stapel', icon: 'stack-2', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Kreuz an: Was schiebst du gerade?',
        'Dein Gegenüber kreuzt seinen Stapel an.',
        'Kreis **die kleinste** Sache ein.',
        'Schreib auf: Was ist der **allererste Handgriff**? Zum Beispiel: Heft aufschlagen.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['book', 'Hausaufgabe oder Lernen'], ['home', 'Zimmer'], ['message-circle', 'eine Nachricht beantworten'], ['calendar', 'einen Termin machen'], ['file-text', 'ein Formular'], ['user', 'jemandem etwas sagen'], ['arrow-back-up', 'etwas zurückgeben'], ['briefcase', 'Praktikum oder Bewerbung']] },
        { art: 'fragen', fragen: [{ f: 'Der allererste Handgriff:', linien: 1 }] },
      ],
      aha: 'Nicht „das Referat“. **Nur: Heft aufschlagen.**',
      ziel: 'Eine geschobene Sache auf den ersten Handgriff verkleinern.',
      tipp: 'Den eigenen Stapel ehrlich zeigen. Der Handgriff muss in einer Minute machbar sein.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 5 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Welcher Grund aus dem Video ist deiner?') },
        { art: 'daumen', saetze: ['Ich schiebe auch Sachen, die mir wichtig sind.', 'Unter Druck bin ich am besten.', 'Aufschieben fühlt sich kurz gut an.', 'Erwachsene schieben genauso.'] },
      ],
      aha: 'Du schiebst nicht die Aufgabe weg. **Du schiebst das miese Gefühl weg.**',
      ziel: 'Aufschieben als Umgang mit Gefühlen verstehen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Zerlegen', bild: 'peep:lio:gelangweilt', icon: 'cut', zeit: '10 Min.', wer: 'zusammen', material: 'Stift',
      schritte: [
        'Lios Referat ist ein Berg. Hier sind seine **sechs kleinen Schritte.**',
        'Schreib Zahlen in die Kästchen: Was kommt zuerst?',
        'Kreis ein: Welcher Schritt dauert **unter fünf Minuten**?',
        'Dann: Zerleg deine eigene Sache in drei Schritte – mündlich.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Lios Schritte – in welcher Reihenfolge?', zahl: ['Thema aussuchen', 'die Lehrerin fragen, wie lang es sein soll', 'drei Sätze dazu suchen', 'ein Bild suchen', 'Stichworte auf einen Zettel', 'einmal laut üben'] }] }],
      aha: 'Ein Berg ist nur **viele kleine Schritte hintereinander.**',
      ziel: 'Große Aufgaben in machbare Schritte teilen.',
      tipp: 'Es gibt mehrere richtige Reihenfolgen. Wichtig ist nur: Der erste Schritt ist klein.',
    },
    {
      titel: 'Der teure Satz', icon: 'message-circle', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Manchmal ist die Lösung ein Satz – der schwer zu sagen ist.',
        'Kreuz an, welchen du am ehesten sagen würdest.',
        'Probe: Dein Gegenüber spielt die Lehrerin oder den Meister. Sag den Satz. **Laut.**',
        'Tauschen: Dein Gegenüber sagt seinen Satz zu dir.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Satz:', unter: true, kreuz: ['„Ich kriege es nicht hin.“', '„Ich weiß nicht, wie ich anfangen soll.“', '„Können Sie es mir noch mal erklären?“', '„Kann ich einen Teil später abgeben?“'] }, { f: 'Den Satz zu sagen war:', kreis: ['leicht', 'geht so', 'schwer'] }] }],
      aha: 'Der teuerste Satz im Moment. **Der billigste auf Dauer.**',
      ziel: 'Um Hilfe bitten – einmal laut geübt.',
      tipp: 'Als Lehrerin freundlich und kurz antworten. Den eigenen teuren Satz wirklich sagen.',
    },
    {
      titel: 'Mein Start-Platz', bild: 'peep:lio:stolz', icon: 'rocket', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Anfangen ist leichter, wenn nichts im Weg liegt.',
        'Kreuz an: Was hilft **dir** beim Anfangen? Höchstens drei.',
        'Richte **eine** Sache jetzt gleich ein.',
        'Dein Gegenüber sagt, was ihm hilft.',
      ],
      zonen: [{ art: 'wahl', punkte: [['device-mobile-off', 'Handy in einem anderen Zimmer'], ['table', 'Tisch leer'], ['headphones', 'Musik ohne Text'], ['users', 'jemand sitzt dabei'], ['clock', 'immer zur gleichen Uhrzeit'], ['glass', 'erst trinken, dann los'], ['alarm', 'Timer auf fünf Minuten'], ['list-check', 'nur ein Schritt auf dem Zettel']] }],
      aha: 'Du brauchst keinen starken Willen. **Du brauchst einen guten Start-Platz.**',
      ziel: 'Eigene Start-Hilfen kennen und eine davon sofort einrichten.',
      tipp: '„Jemand sitzt dabei“ ist für viele das Wirksamste – anbieten, wenn es geht.',
    },
  ],
  woche: {
    titel: 'Dreimal fünf', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt, Timer',
    schritte: ['Nimm die Sache, die du am meisten schiebst.', 'Dreimal diese Woche: **genau fünf Minuten** – mit Timer.', 'Danach darfst du aufhören. Mach ein Kreuz.'],
    zonen: [
      { art: 'woche', zeilen: ['Fünf Minuten gemacht', 'danach aufgehört', 'danach weitergemacht', 'um Hilfe gebeten'] },
      { art: 'karten', karten: [
        { titel: 'Fünf-Minuten-Deal', icon: 'alarm', zeilen: ['Timer auf fünf Minuten.', 'Nur anfangen. Nicht fertig werden.', 'Klingelt es: Aufhören ist erlaubt.'] },
        { titel: 'Kann, will, trau', icon: 'list-check', zeilen: ['Kann ich es nicht? **Hilfe holen.**', 'Will ich es nicht? **Was will ich stattdessen?**', 'Trau ich mich nicht? **Was wäre das Schlimmste?**'] },
      ] },
    ],
    aha: 'Wer nach fünf Minuten aufhört, **hat bestanden.**',
    ziel: 'Drei kurze Starts in einer Woche.',
    tipp: 'Nicht zählen, wie viel geschafft wurde. Nur: Wie oft angefangen?',
  },
  begleitung: { material: 'Timer, Stifte, Handy, eine echte Aufgabe', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
