// SOLO #05 · WUT – Ausrasten in der Einzelarbeit: Was liegt unter der Wut? Anschluss an REAL TALK #03.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's05', nr: '05', datei: 'Solo-05-Wut', reihe: 'Thema',
  thema: 'Wut', headline: 'Worauf warst du wirklich wütend?', farbe: '#C6F02C', stand: 'November 2026',
  bild: 'peep:finn:wuetend:verschraenkt', sticker: 'Nach dem Knall',
  seiten: [
    {
      titel: 'Wut', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Zähl bis zehn.“ „Atme tief durch.“ „Gewalt ist keine Lösung.“ Du kannst das alles aufsagen. Und wenn es knallt, ist nichts davon da.',
          'Hier geht es nicht darum, wie du dich besser beherrschst. Es geht darum, **was unter der Wut liegt** – denn das ist fast nie der Teller, der gerade fliegt.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Zähl bis zehn.“', '„Atme tief durch.“', '„Du musst dich besser kontrollieren.“', '„Gewalt ist keine Lösung.“', '„Schlag doch in ein Kissen.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So schnell bin ich oben', 'So lange brauche ich, bis ich wieder unten bin'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Drei Dinge über Wut, die im Anti-Aggressions-Training selten vorkommen', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:finn:wuetend', name: 'Finn, 15',
          text: 'Der Erzieher sagt: „Handy weg, wir essen.“ Ganz normaler Ton. Finn schmeißt den Teller an die Wand. Zehn Minuten später sitzt er auf dem Bett und versteht es selbst nicht. Den ganzen Tag hatte er die Nachricht seiner Mutter im Kopf: „Dieses Wochenende klappt es nicht.“ Darüber hat er mit keinem geredet. Über den Teller reden jetzt alle.',
          frage: 'Worauf war Finn wirklich wütend?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Selten das erste Gefühl', x: 'Unter der Wut liegt oft etwas anderes: Scham, Angst, Ohnmacht, Enttäuschung. **Wut fühlt sich nur weniger schwach an.**' },
          { t: '20 Minuten', x: 'So lange braucht der Körper ungefähr, bis der Alarm abklingt. **Vorher ist jedes Gespräch verloren** – deins und das der Erwachsenen.' },
          { t: 'Rauslassen übt', x: 'Auf ein Kissen einschlagen macht nicht ruhiger. In Versuchen waren die Leute danach **wütender als vorher**.' },
        ] },
        { art: 'clip', clip: { titel: 'Aggressiv: Woher kommt deine Wut?', kanal: 'Terra Xplore', url: YT + 'ytcdqLNedrg', dauer: 'die ersten 6 Min.', frage: 'Wen aus dem Video verstehst du am besten – und warum?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Welches Gefühl wäre da, wenn die Wut ==nicht== da wäre?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Keine Schuldfrage. Nur: Was war darunter?', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Die letzten drei', wie: 'allein', zeit: '6 Min.',
          kontext: 'Drei Mal, als es geknallt hat. Links, was alle gesehen haben. Rechts, was keiner gesehen hat.',
          fragen: [{ f: 'Stichworte reichen:', preis: { erste: 'Wann', kopf: ['Auslöser, den alle sahen', 'was darunter lag'], optionen: ['das letzte Mal', 'das Mal davor', 'eines, das ich bereue'] } }] },
        { art: 'fragen', titel: 'Die ehrliche Rechnung', wie: 'zusammen', zeit: '6 Min.',
          kontext: 'Wut bringt auch etwas. Sonst würde sie niemand benutzen.',
          fragen: [{ f: 'Rechne durch:', preis: { erste: 'Wut …', kopf: ['bringt mir', 'kostet mich'], optionen: ['rauslassen', 'runterschlucken', 'später sagen, was los war'] } }] },
        { art: 'fragen', titel: 'Meine Zündschnur', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Das bringt mich am schnellsten hoch', 'Daran sieht man es mir an', 'Das bereue ich danach'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Ein Wort danach', x: 'Wenn du diese Woche hochgehst: Schreib **danach** ein einziges Wort auf – das Gefühl darunter. Scham, Angst, Ohnmacht, Enttäuschung, Einsamkeit. Mehr nicht. Wette vorher: Welches Wort steht am öftesten da?' },
        { art: 'karten', karten: [
          { titel: '20 Minuten', icon: 'clock', zeilen: ['Ganz oben? **Jetzt nicht reden.**', 'Raus. Bewegen. Kaltes Wasser.', 'Nach 20 Minuten ist der Kopf wieder da.'] },
          { titel: 'Der Satz danach', icon: 'message-circle', zeilen: ['„Vorhin ging es eigentlich nicht um …“', '„Eigentlich war ich …“', '„Ich brauche gerade …“'], eigen: 'Zu wem:' },
        ] },
        { art: 'tiefe', fragen: [
          ['Was bringt dich zuverlässig auf die Palme?', 'Wer kann wütend sein, ohne dass etwas kaputtgeht?'],
          ['Wann hat dir Wut zuletzt wirklich geholfen?', 'Wovor haben andere Angst, wenn du wütend bist?'],
          ['Auf wen bist du wütend, dem du es nie gesagt hast?', 'Wie war Wut bei euch zu Hause – wer durfte sie haben?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was liegt oft unter der Wut?', o: ['gar nichts', 'ein anderes Gefühl wie Scham oder Angst', 'Hunger', 'Langeweile'], r: 1, warum: 'Wut fühlt sich stärker an als das Gefühl darunter.' },
    { f: 'Wie lange braucht der Körper ungefähr, bis der Alarm abklingt?', o: ['10 Sekunden', '1 Minute', '20 Minuten', '2 Tage'], r: 2, warum: 'Vorher bringt Reden wenig.' },
    { f: 'Auf ein Kissen einschlagen macht …', o: ['ruhiger', 'eher wütender', 'müde und glücklich', 'gar nichts'], r: 1, warum: 'Es übt die Wut ein, statt sie abzubauen.' },
    { f: 'Was hilft bei voller Wut am ehesten?', o: ['diskutieren', 'eine Erklärung verlangen', 'Abstand und Bewegung', 'eine Nachricht schreiben'], r: 2, warum: 'Erst der Körper, dann das Gespräch.' },
    { f: 'Ist Wut ein schlechtes Gefühl?', o: ['ja, immer', 'nein – sie zeigt, dass etwas nicht stimmt', 'nur bei Jungen', 'nur bei Erwachsenen'], r: 1, warum: 'Das Gefühl ist ein Signal. Was man damit macht, ist die Frage.' },
    { f: 'Wut runterschlucken ist …', o: ['immer die beste Lösung', 'auf Dauer auch teuer', 'unmöglich', 'ein Zeichen von Stärke'], r: 1, warum: 'Sie kommt später wieder – oft an der falschen Stelle.' },
    { f: 'Wann redet man am besten über einen Ausraster?', o: ['mittendrin', 'sofort danach', 'wenn der Körper wieder ruhig ist', 'nie'], r: 2, warum: 'Erst dann ist das Denken wieder da.' },
    { f: 'Jemand rastet wegen einer Kleinigkeit aus. Meistens …', o: ['ging es wirklich um die Kleinigkeit', 'war das Fass schon vorher voll', 'ist er einfach so', 'hat er schlecht gegessen'], r: 1, warum: 'Der Auslöser ist selten der Grund.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #03']],
    wann: ['Häufige Ausraster, die der Jugendliche hinterher selbst nicht versteht.', 'Nach einem Vorfall – aber erst, wenn er wirklich wieder ruhig ist, frühestens am nächsten Tag.', 'Wut als einziges Gefühl, das gezeigt wird.', 'Auch bei Jugendlichen, die alles schlucken und nie laut werden.'],
    ziel: 'Der Jugendliche entdeckt an eigenen Beispielen, welches Gefühl unter seiner Wut liegt – und dass darüber zu reden mehr verändert als jede Beherrschungstechnik.',
    anschluss: 'Techniken zum Runterkommen (Zahl 0–100, Atmung, Kälte) stehen in REAL TALK #03.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1: Die Sprüche ankreuzen lassen. Wenn „Kissen“ angekreuzt ist – der dritte Kasten auf Seite 2 gehört ihm.'],
      ['5–20', 'Der Fall. Die Frage offen lassen, bis er selbst auf die Nachricht der Mutter kommt. Dann die Kästen und das Video.'],
      ['20–40', '„Die letzten drei“ allein – nicht mitlesen. „Die ehrliche Rechnung“ gemeinsam: den Gewinn der Wut ernsthaft aufschreiben. Dann das Duell mit Ihren Antworten.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Die Stunde ist keine Aufarbeitung und keine Konsequenz. Wer sie so benutzt, bekommt nur die Sätze zu hören, die er hören will.', 'Den Gewinn der Wut anerkennen: Respekt, Abstand, Ruhe vor Fragen. Erst dann wird über den Preis geredet.', 'Im Duell eigene Wut nicht kleinreden. „Ich werde nie laut“ glaubt niemand.', 'Fällt das Wort für das Gefühl darunter, nicht nachsetzen. Es reicht, dass es gesagt ist.'],
    hinweise: ['Seite 3: In der rechten Spalte von „Die letzten drei“ steht oft dreimal dasselbe Wort. Das ist das Thema der nächsten Wochen.', 'Seite 4: „Der Satz danach“ ist für viele das Schwerste im ganzen Heft. Anbieten, ihn gemeinsam für eine echte Situation vorzubereiten.', 'Die 20 Minuten gelten auch für Sie und das Team: Konsequenzen und Gespräche erst danach.'],
    achtung: 'Die Frage nach der Wut zu Hause (Stufe 3) kann erlebte Gewalt berühren. Zuhören, nicht ausfragen; bei aktueller Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Bei Ankündigungen, jemandem etwas anzutun, oder bei Selbstverletzung nach Ausrastern direkt nachfragen und nicht allein entscheiden. Das Heft ersetzt keine Vereinbarungen zur Sicherheit in der Gruppe.',
    hintergrund: 'Wut tritt häufig als Reaktion auf verletzlichere Gefühle wie Scham, Angst oder Ohnmacht auf (Novaco). Das „Dampfablassen“ durch Schlagen auf Gegenstände senkt Ärger nicht, sondern verstärkt ihn (Bushman). Körperliche Erregung klingt nur langsam ab und überträgt sich auf die nächste Situation (Zillmann). Ausraster lassen sich besser als fehlende Fertigkeit unter Belastung verstehen denn als fehlender Wille; gemeinsames Problemlösen in ruhigen Momenten wirkt besser als Strafen (Greene).',
    quellen: 'Novaco (1975) · Bushman (2002) · Zillmann (1971) · Greene (2014) · Linehan (2015).',
  },
}
export default d
