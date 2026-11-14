// SOLO AKTION #03 · SCROLLEN – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s03'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a03', nr: '03', datei: 'Solo-03-Scrollen-Aktion', thema: 'Scrollen', headline: 'Acht Aktionen. Handy bleibt an.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:mia:muede:handy', sticker: 'Zum Machen',
  start: ['Keiner nimmt dir hier das Handy weg. **Wir schauen nach, was es mit dir macht** – und mit deinem Gegenüber.', 'Jede Aktion dauert 10 bis 15 Minuten.'],
  aktionen: [
    {
      titel: 'Die Daten', bild: 'peep:mia:muede:handy', icon: 'chart-bar', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Erst **schätzen**: Wie lange warst du gestern am Handy?',
        'Dann nachschauen: Einstellungen → „Bildschirmzeit“ oder „Digitales Wohlbefinden“.',
        'Zeigen muss keiner. **Sagen reicht.**',
        'Gewonnen hat, wer näher an seiner Schätzung liegt.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['Gestern', 'geschätzt', 'gemessen', 'so oft entsperrt'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Wer kennt sich selbst besser?', kreis: ['ich', 'mein Gegenüber', 'beide gleich'] }] },
      ],
      aha: 'Es zählt nicht, wer weniger scrollt. **Es zählt, wer sich kennt.**',
      ziel: 'Eigene Nutzung ehrlich ansehen – ohne Bewertung.',
      tipp: 'Die eigene Zahl zuerst nennen. Keine Zahl kommentieren, auch nicht mit dem Gesicht.',
    },
    {
      titel: 'Fünf Minuten Feed', icon: 'device-mobile', zeit: '10 Min.', wer: 'beide', material: 'beide Handys, Timer',
      schritte: [
        'Kreis ein: deine Laune **jetzt**.',
        'Timer auf **5 Minuten**. Beide scrollen.',
        'Stopp. Handy umdrehen. Kreis ein: deine Laune **danach**.',
        'Nenn drei Dinge, die du gerade gesehen hast.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Meine Laune (0 mies – 10 super):', regler: ['vorher', 'nachher'] }, { f: 'So viele Dinge wusste ich noch:', kreis: ['0', '1', '2', '3'] }, { f: 'Laune von meinem Gegenüber:', kreis: ['besser', 'gleich', 'schlechter'] }] }],
      aha: 'Fünf Minuten Feed – und oft bleibt **fast nichts** hängen. Außer der Laune.',
      ziel: 'Die Wirkung direkt messen statt darüber zu reden.',
      tipp: 'Selbst mitscrollen und die eigene Zahl ehrlich sagen.',
    },
    {
      titel: 'Hand-Zähler', bild: 'peep:mia:nervoes', icon: 'hand-finger', zeit: '12 Min.', wer: 'beide', material: 'beide Handys, ein Spiel oder Würfel',
      schritte: [
        'Beide Handys liegen in der Mitte. Bildschirm nach unten. Ton an.',
        'Spielt zehn Minuten etwas: Karten, Würfel, Tic-Tac-Toe.',
        'Jedes Mal, wenn deine Hand zum Handy **will**: ein Strich.',
        'Anfassen gilt als fünf Striche.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['Striche', 'Meine Hand wollte hin', 'Angefasst'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Die Hand ist schneller als der Kopf. **Das ist Gewohnheit – kein schwacher Wille.**',
      ziel: 'Den Griff zum Handy als Reflex bemerken.',
      tipp: 'Das eigene Handy wirklich dazulegen. Wer mehr Striche hat, hat nicht verloren – er hat genauer gezählt.',
    },
    {
      titel: 'Wofür eigentlich?', icon: 'help-circle', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Kreuz an: **Wofür** nimmst du das Handy?',
        'Streich durch, wobei es **nicht** hilft.',
        'Dein Gegenüber macht es mit einer anderen Farbe.',
      ],
      zonen: [{ art: 'wahl', punkte: [['mood-empty', 'Langeweile'], ['users', 'nicht allein sein'], ['wind', 'runterkommen'], ['bell', 'nichts verpassen'], ['moon', 'einschlafen'], ['bolt', 'Stress vergessen'], ['message-circle', 'mit Leuten reden'], ['search', 'etwas wissen wollen']] }],
      aha: 'Oft geht es nicht ums Handy. **Es geht um das Gefühl davor.**',
      ziel: 'Die Funktion des Handys erkennen.',
      tipp: 'Auch selbst durchstreichen. „Einschlafen“ ist bei den meisten Erwachsenen durchgestrichen.',
    },
    {
      titel: 'Mia, 1:20 Uhr', bild: 'peep:mia:traurig', icon: 'moon', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Mias Nacht an.', 'Kreuz an: Warum hilft Mia ihr Wissen nicht?', 'Kreis ein: Kennst du das?'],
      zonen: [
        { art: 'comic', bilder: [['clock', '23 Uhr. Mia will nur kurz schauen.'], ['photo', '300 Leute. Alle schöner. Alle mit mehr Freunden.'], ['bulb', 'Mia weiß: Das ist alles gestellt.'], ['mood-sad', '1:20 Uhr. Sie fühlt sich trotzdem mies.']] },
        { art: 'fragen', fragen: [{ f: 'Warum hilft das Wissen nicht?', unter: true, kreuz: ['Das Gefühl ist schneller als der Gedanke.', 'Mia ist zu dumm.', 'Die Bilder sind doch echt.'] }, { f: 'Kennst du das?', kreis: ['ja', 'manchmal', 'nein'] }] },
      ],
      aha: '„Ist gestellt“ kommt eine Sekunde zu spät. **Das Gefühl ist schon da.**',
      ziel: 'Verstehen, warum Vergleiche wirken, obwohl man es besser weiß.',
      tipp: 'Nicht trösten („Du bist doch auch hübsch“). Nur fragen: Bei welchen Accounts passiert das?',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 5 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Welcher Trick wirkt bei dir am besten?') },
        { art: 'daumen', saetze: ['Ich höre auf, wann ich will.', 'Apps sind gebaut, damit ich bleibe.', 'Mich nervt mein Scrollen selbst.', 'Erwachsene scrollen genauso viel.'] },
      ],
      aha: 'Die App ist gebaut, damit du bleibst. **Das ist ihr Job.**',
      ziel: 'Die Bauweise der Apps kennen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Grau stellen', icon: 'contrast', zeit: '10 Min.', wer: 'beide', material: 'beide Handys',
      schritte: [
        'Öffnet die Einstellungen. Sucht nach **„Graustufen“**.',
        'Schaltet das Handy auf Schwarz-Weiß.',
        'Zwei Minuten scrollen – in Grau.',
        'Kreis ein: Wie spannend war es?',
        'Entscheide: Wie lange bleibt es grau?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So spannend ist mein Feed (0–10):', regler: ['in Farbe', 'in Grau'] }, { f: 'Es bleibt grau:', kreis: ['bis heute Abend', 'bis morgen', 'drei Tage', 'gar nicht'] }] }],
      aha: 'Farbe ist ein Köder. **Ohne Farbe zieht es weniger.**',
      ziel: 'Einen Köder selbst ausschalten und den Unterschied sehen.',
      tipp: 'Vorher am eigenen Handy ausprobieren, wo die Einstellung ist. Geht es nicht: Lieblings-App vom Startbildschirm nehmen.',
    },
    {
      titel: 'Mein Ende', icon: 'flag', zeit: '10 Min.', wer: 'beide', material: 'Handy',
      schritte: [
        'Ein Buch hat eine letzte Seite. Der Feed nicht.',
        'Kreuz an: Welches **Ende** baust du dir?',
        'Mach es **jetzt**: Wecker stellen, App verschieben, Kabel umstecken.',
        'Dein Gegenüber baut sich auch eins.',
      ],
      zonen: [{ art: 'wahl', punkte: [['alarm', 'Wecker: nach 20 Minuten Schluss'], ['music', 'drei Lieder lang – dann weg'], ['home', 'App runter vom Startbildschirm'], ['plug', 'Ladekabel weit weg vom Bett'], ['door', 'Handy nachts in ein anderes Zimmer'], ['bell-off', 'Mitteilungen aus']] }, { art: 'fragen', fragen: [{ f: 'Gemacht – und zwar das:', linien: 1 }] }],
      aha: 'Der Feed hört nicht auf. **Also baust du das Ende selbst.**',
      ziel: 'Eine konkrete Stopp-Stelle einrichten – sofort, nicht „irgendwann“.',
      tipp: 'Regeln der Einrichtung (Handy abgeben) nicht als eigene Idee des Jugendlichen verkaufen. Er wählt selbst.',
    },
  ],
  woche: {
    titel: 'Die Sekunde davor', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Wenn du zum Handy greifst: kurz stoppen.', 'Was war gerade los? Mach **danach** einen Strich.', 'Fünf Striche am Tag reichen.'],
    zonen: [
      { art: 'woche', zeilen: ['leer oder langweilig', 'allein', 'gestresst', 'ich wollte wirklich etwas'] },
      { art: 'karten', karten: [
        { titel: 'Die Sekunde davor', icon: 'player-pause', zeilen: ['Die Hand geht zum Handy.', 'Kurz stoppen: Was fühle ich?', 'Leer, allein, gestresst – oder will ich etwas?'] },
        { titel: 'Mein Ende', icon: 'flag', zeilen: ['Der Feed hat kein Ende. Ich baue eins:', '_Schluss bei', '_Danach'] },
      ] },
    ],
    aha: 'Die Zeile mit den meisten Strichen zeigt, **was dir wirklich fehlt.**',
    ziel: 'Das Gefühl vor dem Griff zum Handy zählen.',
    tipp: 'Selbst mitzählen und die eigene Liste mitbringen.',
  },
  begleitung: { material: 'beide Handys, Timer, Würfel oder Karten', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
