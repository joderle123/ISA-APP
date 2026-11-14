// SOLO AKTION #16 · MIST GEBAUT – acht Aktionen zum Machen und ein Auftrag für die Woche. Nichts über eine Sache mit laufendem Verfahren.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s16'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a16', nr: '16', datei: 'Solo-16-Mist-gebaut-Aktion', thema: 'Mist gebaut', headline: 'Acht Aktionen. Kein Verhör.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:ben:besorgt:verschraenkt', sticker: 'Dein Anteil',
  start: ['Das hier ist keine Strafe und kein Verhör. **Fang mit Aktion 1 an – das sind die Regeln.**', 'Über eine Sache, zu der ein Verfahren läuft, sagst und schreibst du hier nichts.'],
  aktionen: [
    {
      titel: 'Erst die Regeln', bild: 'peep:ben:besorgt', icon: 'shield-check', zeit: '10 Min.', wer: 'dein Gegenüber schreibt', material: 'Stift',
      schritte: [
        '**Bevor du etwas erzählst:** Dein Gegenüber schreibt auf, was es weitersagen **muss.**',
        'Und was hier bleibt.',
        'Frag nach, bis es klar ist.',
        'Läuft ein Verfahren? Dann reden wir hier nur über **Ben.**',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Das muss mein Gegenüber weitersagen:', linien: 2 }, { f: 'Das bleibt hier:', linien: 2 }, { f: 'Für mich ist es:', kreis: ['klar', 'noch mal erklären'] }] }],
      aha: 'Erst die Regeln, dann das Reden. **Das ist dein Recht.**',
      ziel: 'Der Jugendliche weiß vor jedem Wort, was mit seinen Angaben passiert.',
      tipp: 'Vorher klären, was Sie bei neuen Straftaten melden müssen. Ehrlich aufschreiben. In laufenden Verfahren keine Einzelheiten erfragen.',
    },
    {
      titel: 'Zehn Münzen', bild: 'peep:ben:besorgt:verschraenkt', icon: 'coins', zeit: '12 Min.', wer: 'beide', material: '10 Münzen oder Büroklammern, 3 Zettel',
      schritte: [
        'Schaut euch an, was bei Ben passiert ist.',
        'Schreibt drei Zettel: **Ben – die anderen – die Umstände.**',
        'Verteil die zehn Münzen: Wer trägt wie viel?',
        'Schreib die Zahlen auf. Dann verteilt dein Gegenüber neu.',
        'Wenn du willst: dasselbe für eine eigene Sache. **Ohne zu sagen, welche.**',
      ],
      zonen: [
        { art: 'comic', bilder: [['bulb', 'Zwei andere haben die Idee: einen Roller „leihen“.'], ['scooter', 'Ben fährt.'], ['file-alert', 'Jetzt gibt es eine Anzeige. Seine Mutter redet kaum noch.'], ['mood-sad', 'Ben denkt: „Jetzt bin ich endgültig so einer.“']] },
        { art: 'tabelle', kopf: ['Münzen', 'Ben', 'die anderen', 'die Umstände'], zeilen: ['Du', 'Dein Gegenüber'] },
      ],
      aha: 'Die Idee kam von anderen. Gefahren ist er. **Beides stimmt.**',
      ziel: 'Verantwortung teilen statt alles oder nichts.',
      tipp: 'Die Zahlen des Jugendlichen nicht korrigieren, nur nachfragen. Ihre eigene Verteilung begründen.',
    },
    {
      titel: 'Getan oder bin so?', icon: 'scale', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        '**Schuld** sagt: Ich habe etwas Schlechtes **getan.**',
        '**Scham** sagt: Ich **bin** schlecht.',
        'Dein Gegenüber liest einen Satz vor. Beide zeigen: Daumen = Schuld. Faust = Scham.',
        'Kreuz an.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Der Satz:', raster: { spalten: ['Schuld', 'Scham'], zeilen: ['„Das war falsch von mir.“', '„Ich bin halt ein Krimineller.“', '„Ich will das wieder in Ordnung bringen.“', '„Aus mir wird eh nichts.“', '„Alle wissen jetzt, was ich für einer bin.“', '„Das hätte ich nicht tun sollen.“'] } }] }],
      aha: 'Mit Schuld kann man etwas machen. **Scham versteckt sich – oder schlägt zu.**',
      ziel: 'Schuld und Scham unterscheiden.',
      tipp: 'Bens Satz („so einer“) ist Scham. Darauf zurückkommen, nicht auf den Jugendlichen.',
    },
    {
      titel: 'Allein oder Gruppe?', icon: 'users-group', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: ['Es geht um Leute in deinem Alter – nicht um dich.', 'Dein Gegenüber liest vor. Kreuz an: Macht man das **auch allein**? Oder **nur in der Gruppe**?', 'Dein Gegenüber kreuzt für Erwachsene an.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Leute in meinem Alter …', raster: { spalten: ['auch allein', 'nur in der Gruppe'], zeilen: ['… gehen bei Rot über die Straße.', '… lachen jemanden aus.', '… klettern irgendwo hoch, wo es verboten ist.', '… nehmen etwas mit, das ihnen nicht gehört.', '… machen etwas kaputt.', '… helfen jemandem, der am Boden liegt.'] } }] }],
      aha: 'Mit anderen dabei geht man mehr Risiko ein. **Das erklärt es. Es entschuldigt es nicht.**',
      ziel: 'Den Einfluss der Gruppe erkennen.',
      tipp: 'Die letzte Zeile zeigt: In der Gruppe tut man auch Gutes seltener. Kein Verhör daraus machen.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 5 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Hättest du bei dem Experiment mitgemacht?') },
        { art: 'daumen', saetze: ['Ich hätte bei dem Experiment auch mitgemacht.', 'In der Gruppe mache ich Sachen, die ich allein nie machen würde.', 'Ich sage Nein, auch wenn alle Ja sagen.', 'Wer mitmacht, ist auch verantwortlich.'] },
      ],
      aha: 'Fast alle machen mit, wenn alle mitmachen. **Wer das weiß, hat drei Sekunden Vorsprung.**',
      ziel: 'Gruppendruck als normales Phänomen sehen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: '„Ich bin raus.“', bild: 'peep:ben:besorgt:gehen', icon: 'door-exit', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber spielt die Gruppe.',
        'Du sagst **„Ich bin raus.“** – und gehst **wirklich** zur Tür.',
        'Es wird in drei Stufen schwerer. Kreuz an, wie es war.',
        'Tauschen.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Die Gruppe sagt …', raster: { spalten: ['leicht', 'schwer'], zeilen: ['„Komm, mach mit.“', '„Stell dich nicht so an.“', '„Bist du feige?“'] } }, { f: 'Mein Satz zum Aussteigen:', kreis: ['„Ich bin raus.“', '„Ohne mich.“', '„Macht ihr mal.“'] }] }],
      aha: 'Aussteigen dauert **drei Sekunden.** Und spart Monate.',
      ziel: 'Aussteigen einmal mit den Füßen geübt haben.',
      tipp: 'Wirklich bis zur Tür gehen lassen – die Bewegung ist der Punkt. Nach Stufe 3 sofort aus der Rolle gehen.',
    },
    {
      titel: 'Reparieren', icon: 'tool', zeit: '12 Min.', wer: 'beide', material: '',
      schritte: [
        'Denk an **eine kleine Sache**, die du kaputtgemacht hast: ein Ding, ein Vertrauen, einen Tag.',
        '**Nicht die mit der Anzeige.**',
        'Kreuz an: Welcher Schritt würde passen?',
        'Probe: Sag den ersten Satz zu deinem Gegenüber. Es spielt die andere Person.',
        'Besprecht: Was tust du, wenn die Person nicht will?',
      ],
      zonen: [{ art: 'wahl', punkte: [['message-circle', 'sagen: „Das war falsch von mir.“'], ['coins', 'etwas ersetzen oder bezahlen'], ['tool', 'etwas reparieren oder sauber machen'], ['calendar', 'eine Woche etwas für die Person übernehmen'], ['help-circle', 'fragen: „Was brauchst du von mir?“'], ['ear', 'erst mal nur zuhören']] }],
      aha: 'Reparieren ändert, wie andere dich sehen. **Und wie du dich selbst siehst.**',
      ziel: 'Einen kleinen Schritt zur Wiedergutmachung vorbereiten.',
      tipp: 'Der Schritt wird hier besprochen, bevor er gemacht wird. Die andere Person darf ablehnen. Lebt sie im selben Haus, geht ihr Schutz vor – siehe Achtung.',
    },
    {
      titel: 'Wer bin ich noch?', bild: 'peep:ben:besorgt', icon: 'user-star', zeit: '10 Min.', wer: 'beide', material: 'Stift',
      schritte: [
        'Ben denkt: „Jetzt bin ich endgültig so einer.“ Das stimmt nicht.',
        'Kreuz an, was du **auch** bist. Mindestens drei.',
        'Dein Gegenüber schreibt **eine Sache** dazu, die es an dir sieht.',
        'Du schreibst eine für dein Gegenüber.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['users', 'ein guter Freund'], ['heart', 'großer Bruder, große Schwester'], ['check', 'zuverlässig, wenn es zählt'], ['mood-happy', 'witzig'], ['tool', 'geschickt mit den Händen'], ['run', 'sportlich'], ['paw', 'gut mit Tieren'], ['message-circle', 'ehrlich, wenn es darauf ankommt']] },
        { art: 'fragen', fragen: [{ f: 'Das sieht mein Gegenüber an mir:', linien: 1 }] },
      ],
      aha: 'Was du getan hast, **ist nicht, was du bist.**',
      ziel: 'Ein Selbstbild, das größer ist als der Vorfall.',
      tipp: 'Etwas Echtes und Konkretes aufschreiben, kein Trostpflaster. Etwas, das Sie wirklich beobachtet haben.',
    },
  ],
  woche: {
    titel: 'Ein Stück zurück', icon: 'calendar-week', zeit: '1 Woche', wer: 'du – nach Absprache', material: 'dieses Blatt',
    schritte: ['Mach diese Woche **den einen kleinen Schritt**, den ihr besprochen habt.', 'Kein großes Geständnis. Nicht die Sache mit der Anzeige.', 'Mach danach ein Kreuz.'],
    zonen: [
      { art: 'woche', zeilen: ['Schritt gemacht', 'die Person hat es angenommen', 'die Person wollte nicht (zählt auch)', '„Ich bin raus.“ gesagt'] },
      { art: 'karten', karten: [
        { titel: 'Schuld statt Scham', icon: 'scale', zeilen: ['Was ich getan habe, ist nicht, was ich bin.', 'Was davon war meins?', 'Was kann ich wieder in Ordnung bringen?'] },
        { titel: 'Bevor ich mitmache', icon: 'player-pause', zeilen: ['Würde ich das auch allein machen?', 'Wer zahlt, wenn es schiefgeht?', 'Mein Satz: „Ich bin raus.“'] },
      ] },
    ],
    aha: 'Ein kleiner Schritt zurück ist **ein großer Schritt für dich.**',
    ziel: 'Ein abgesprochener Schritt zur Wiedergutmachung.',
    tipp: 'Lehnt die andere Person ab, ist das kein Scheitern. Beim nächsten Mal fragen: „Was hast du dann gemacht?“',
  },
  begleitung: { material: 'Münzen oder Büroklammern, Zettel, Stifte, Handy', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
