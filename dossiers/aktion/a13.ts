// SOLO AKTION #13 · ZUHAUSE – acht Aktionen zum Machen und ein Auftrag für die Woche. Nichts davon findet zu Hause statt.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s13'
import { MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a13', nr: '13', datei: 'Solo-13-Zuhause-Aktion', thema: 'Zuhause', headline: 'Acht Aktionen. Keiner ergreift Partei.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:jana:neutral:verschraenkt', sticker: 'Deine Sicht zählt',
  start: ['Hier macht keiner deine Eltern schlecht. Und keiner macht sie gut. **Du darfst beides sagen.**', 'Du entscheidest bei jeder Aktion, wie viel du zeigst.'],
  aktionen: [
    {
      titel: 'So war es bei uns', bild: 'peep:jana:neutral', icon: 'home', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Jede Linie hat zwei Enden.',
        'Mach ein **Kreuz**, wo es bei dir zu Hause eher war.',
        'Dein Gegenüber macht einen **Kreis** – für sein Zuhause als Kind.',
        'Nicht nachdenken. Schnell.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Bei uns zu Hause:', striche: [['laut', 'leise'], ['viele Leute', 'wenige Leute'], ['zusammen essen', 'jeder für sich'], ['viel reden', 'wenig reden'], ['Tür offen', 'Tür zu'], ['streng', 'locker']] }] }],
      aha: 'Jedes Zuhause hat seinen eigenen Ton. **„Normal“ gibt es nicht.**',
      ziel: 'Ein leichter Einstieg: Zuhause beschreiben, ohne zu bewerten.',
      tipp: 'Die eigenen Kreise ehrlich setzen. Nichts kommentieren, auch nicht mit „Oh“.',
    },
    {
      titel: 'Jana am Samstag', bild: 'peep:jana:traurig', icon: 'calendar-x', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Janas Samstag an.', 'Kreuz an: Was fühlt Jana? **Mehrere Kreuze sind erlaubt.**', 'Kreis ein: Wie viele Gefühle hat sie gleichzeitig?'],
      zonen: [
        { art: 'comic', bilder: [['calendar', 'Samstag ist Besuchstag. Janas Mutter hat versprochen zu kommen.'], ['message-circle', 'Um vier schreibt sie: „Schaff es heute nicht, Schatz.“'], ['milk', 'Jana schreibt: „Kein Problem.“ Dann streitet sie wegen eines Joghurts.'], ['bolt', 'Abends sagt ein Mädchen: „Deine Mutter ist das Letzte.“ Jana geht auf sie los.']] },
        { art: 'fragen', fragen: [{ f: 'Jana ist:', kreuz: ['enttäuscht', 'wütend', 'traurig', 'Sie hat ihre Mutter lieb.'] }, { f: 'Gleichzeitig hat sie:', kreis: ['ein Gefühl', 'zwei', 'alle vier'] }] },
      ],
      aha: 'Du kannst jemanden lieben **und** wütend auf ihn sein. Das ist kein Widerspruch.',
      ziel: 'Gemischte Gefühle gegenüber den Eltern als normal sehen.',
      tipp: 'Kein Wort gegen Janas Mutter. Wer sie angreift, greift auch die Eltern des Jugendlichen an.',
    },
    {
      titel: 'Zwei Hände', icon: 'hand-two-fingers', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Linke Hand heißt: **Das mag ich.** Rechte Hand heißt: **Das macht mich fertig.**',
        'Dein Gegenüber sagt ein Wort.',
        'Heb die linke Hand, die rechte – oder **beide.** Ohne ein Wort.',
        'Dann sagst du die Wörter, und dein Gegenüber hebt die Hände.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Meine Hände (dein Gegenüber kreuzt an):', raster: { spalten: ['links', 'rechts'], zeilen: ['Essen bei uns', 'Feste und Geburtstage', 'wie bei uns gestritten wird', 'meine Geschwister', 'Besuche und Anrufe', 'mein Zimmer'] } }] }],
      aha: 'Beide Hände gleichzeitig oben – **das geht. Bei Familie ist es sogar normal.**',
      ziel: 'Beides zeigen können, ohne etwas erklären zu müssen.',
      tipp: 'Nicht nachfragen. Bei „Besuche und Anrufe“ besonders ruhig bleiben. Selbst ehrlich die Hände heben.',
    },
    {
      titel: 'Koffer packen', icon: 'luggage', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Zu Hause hast du mehr gelernt als in jeder Schule.',
        'Manches nimmst du mit in dein Leben. Manches bleibt da.',
        'Mach in jeder Zeile ein Kreuz.',
        'Dein Gegenüber packt seinen Koffer in einer anderen Farbe.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Wie es bei uns läuft:', raster: { spalten: ['nehme ich mit', 'bleibt da', 'weiß nicht'], zeilen: ['wie gestritten wird', 'wie man sich entschuldigt – oder nicht', 'wie über Gefühle geredet wird', 'wie man zusammenhält', 'wie gefeiert wird', 'wie mit Geld umgegangen wird'] } }] }],
      aha: 'Du musst nicht die ganze Kiste nehmen. **Du musst nicht werden wie deine Eltern.**',
      ziel: 'Auswählen, was bleibt und was geht.',
      tipp: '„Weiß nicht“ ist oft die ehrlichste Spalte. Den eigenen Koffer zeigen.',
    },
    {
      titel: 'Der Rucksack', bild: 'peep:jana:besorgt', icon: 'backpack', zeit: '12 Min.', wer: 'beide', material: 'Rucksack, 8 Bücher',
      schritte: [
        'Kreuz an: Was hast du zu Hause übernommen?',
        'Für jedes Kreuz kommt **ein Buch** in den Rucksack.',
        'Heb ihn hoch. So schwer ist das.',
        'Nimm die Bücher raus, die eigentlich **ein Erwachsener** tragen müsste.',
        'Heb ihn noch einmal.',
      ],
      zonen: [{ art: 'wahl', punkte: [['users', 'auf Geschwister aufpassen'], ['scale', 'Streit schlichten'], ['heart', 'Eltern trösten'], ['lock', 'Geheimnisse hüten'], ['mood-smile', 'für gute Laune sorgen'], ['tools-kitchen-2', 'kochen, putzen, einkaufen'], ['message-off', 'für andere lügen'], ['circle-off', 'nichts davon']] }],
      aha: 'Nicht alles, was du trägst, **gehört dir.**',
      ziel: 'Die eigene Last spüren – und was davon Erwachsenen gehört.',
      tipp: 'Nicht loben („Du bist so stark“). Fragen: „Wer hier könnte eins von den Büchern nehmen?“ Bei Hinweisen auf Gefährdung: siehe Achtung.',
    },
    {
      titel: 'Sätze von zu Hause', icon: 'quote', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: ['Dein Gegenüber liest die Sätze vor.', 'Kreuz an: Kennst du den Satz?', 'Zweites Kreuz: Willst du ihn später **selbst sagen** – oder **nie**?', 'Dein Gegenüber kreuzt für sich an.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Der Satz:', raster: { spalten: ['kenne ich', 'sage ich später', 'sage ich nie'], zeilen: ['„Stell dich nicht so an.“', '„Ich bin stolz auf dich.“', '„Das geht keinen etwas an.“', '„Wir schaffen das.“', '„Du bist wie dein Vater.“', '„Hab dich lieb.“', '„Frag nicht so viel.“'] } }] }],
      aha: 'Du entscheidest, **welche Sätze weiterleben.**',
      ziel: 'Sprache von zu Hause bewusst auswählen.',
      tipp: 'Nicht fragen, wer den Satz gesagt hat. Eigene Kreuze ehrlich setzen.',
    },
    {
      titel: 'Einmal anders', icon: 'refresh', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Kreuz an: Was willst du **anders** machen, als du es gelernt hast?',
        'Probe – **hier, nicht zu Hause:** Dein Gegenüber hat deinen Stift verloren. Spielt es eine Minute.',
        'Mach dabei deine eine Sache anders.',
        'Kreis ein, wie es sich angefühlt hat.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['message-circle', 'sagen, was mich stört – leise'], ['ear', 'zuhören, ohne zu unterbrechen'], ['heart-handshake', 'mich entschuldigen, ohne „aber“'], ['hand-stop', 'eine Pause machen statt schreien']] },
        { art: 'fragen', fragen: [{ f: 'Es hat sich angefühlt:', kreis: ['falsch', 'fremd', 'gut'] }] },
      ],
      aha: 'Was du gelernt hast, kannst du umlernen. **Erst fühlt es sich fremd an. Dann normal.**',
      ziel: 'Ein neues Verhalten einmal ausprobieren – an einem harmlosen Beispiel.',
      tipp: 'Das Spiel bleibt beim Stift. Keine Szenen aus der Familie nachspielen.',
    },
    {
      titel: 'Mein Platz', bild: 'peep:jana:froh', icon: 'armchair', zeit: '12 Min.', wer: 'beide', material: 'Stifte',
      schritte: [
        'Zeichne einen Platz, an dem es dir **gut geht.** Echt oder ausgedacht.',
        'Strichzeichnung reicht. Drei Minuten.',
        'Kreis ein, was es dort gibt.',
        'Dein Gegenüber zeichnet seinen Platz daneben.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Platz (links du, rechts dein Gegenüber):', feld: 62 }, { f: 'Dort gibt es:', kreis: ['Ruhe', 'Musik', 'ein Tier', 'einen Menschen', 'Essen', 'meine Sachen', 'eine Tür zum Zumachen'] }] }],
      aha: 'Zuhause ist nicht nur ein Ort von früher. **Es ist auch das, was du dir baust.**',
      ziel: 'Ein Bild von einem guten Ort – als Ziel, nicht als Trost.',
      tipp: 'Nicht deuten. Fragen: „Was davon gibt es hier schon?“',
    },
  ],
  woche: {
    titel: 'Einmal anders – hier', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Nimm **eine** Sache aus dem Koffer, die „da bleibt“. Oder aus „weiß nicht“.', 'Mach sie diese Woche einmal bewusst anders. **Hier, nicht zu Hause.**', 'Mach danach ein Kreuz.'],
    zonen: [
      { art: 'woche', zeilen: ['einmal anders gemacht', 'fühlte sich fremd an', 'fühlte sich gut an'] },
      { art: 'karten', karten: [
        { titel: 'Beides stimmt', icon: 'home-heart', zeilen: ['Ich kann jemanden lieben und wütend auf ihn sein.', 'Ich kann jemanden vermissen, der mir wehgetan hat.', 'Ich muss mich nicht entscheiden.'] },
        { titel: 'Was ich trage', icon: 'backpack', zeilen: ['Nicht alles, was ich trage, gehört mir.', 'Was kann ein Erwachsener übernehmen?', 'Wer hier kann das sein?'] },
      ] },
    ],
    aha: 'Fremd heißt nicht falsch. **Fremd heißt neu.**',
    ziel: 'Ein neues Verhalten einmal im Alltag der Einrichtung.',
    tipp: 'Ausdrücklich nicht am Besuchswochenende. Nach diesen Aktionen kann die Stimmung kippen – das Team ohne Inhalte informieren.',
  },
  begleitung: { material: 'Stifte, Rucksack, Bücher', achtung: s.begleitung.achtung + ' Keine Aktion wird zu Hause oder mit der Familie durchgeführt.', mehr: MEHR(s) },
}
export default d
