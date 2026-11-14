// SOLO AKTION #07 · STIMME – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s07'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a07', nr: '07', datei: 'Solo-07-Stimme-Aktion', thema: 'Stimme', headline: 'Acht Aktionen gegen die fiese Stimme im Kopf.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:mia:nervoes', sticker: 'Zum Machen',
  start: ['Die Stimme im Kopf sind **deine eigenen Gedanken** – die fiesen. Sie kommentiert alles, was du tust.', 'Hier lernst du sie kennen. Jede Aktion dauert 10 bis 15 Minuten.'],
  aktionen: [
    {
      titel: 'Steckbrief', bild: 'peep:mia:nervoes', icon: 'id-badge-2', zeit: '10 Min.', wer: 'beide', material: 'Stifte',
      schritte: [
        'Stell dir die fiese Stimme als **Figur** vor.',
        'Zeichne sie. 60 Sekunden. Strichmännchen reicht.',
        'Gib ihr einen Namen.',
        'Kreis ein, wie sie klingt.',
        'Dein Gegenüber zeichnet seine daneben.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So sieht sie aus (links du, rechts dein Gegenüber):', feld: 62 }, { f: 'So klingt sie:', kreis: ['spöttisch', 'streng', 'genervt', 'enttäuscht', 'kalt', 'laut'] }, { f: 'Sie heißt:', linien: 1 }] }],
      aha: 'Du **hast** eine Stimme. Du **bist** nicht die Stimme.',
      ziel: 'Abstand zur inneren Kritik: Sie wird eine Figur.',
      tipp: 'Die eigene Stimme wirklich zeichnen. Nicht fragen, an wen die Figur erinnert.',
    },
    {
      titel: 'Wörtlich zitiert', icon: 'quote', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: ['Dein Gegenüber liest die Sätze vor.', 'Kreuz an: Welche sagt **deine** Stimme?', 'Dein Gegenüber kreuzt für seine an.', 'Kreis den Satz ein, der am häufigsten kommt.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Das sagt sie:', raster: { spalten: ['meine', 'die vom Gegenüber'], zeilen: ['„Das schaffst du eh nicht.“', '„Alle anderen sind besser.“', '„Typisch.“', '„Du nervst.“', '„Die meinen das nicht ernst.“', '„Selbst schuld.“', '„Das war peinlich.“'] } }] }],
      aha: 'Fast jeder hat so eine Stimme. **Auch dein Gegenüber.**',
      ziel: 'Die Sätze der Stimme kennen – und sehen, dass Erwachsene sie auch haben.',
      tipp: 'Ehrlich ankreuzen. Wenn Sie mehr Kreuze haben als der Jugendliche: umso besser.',
    },
    {
      titel: 'Falsche Hand', icon: 'hand-finger', zeit: '10 Min.', wer: 'beide', material: 'Papier, Stift',
      schritte: [
        'Zeichne **drei Minuten** lang das Gesicht deines Gegenübers.',
        'Mit der **falschen Hand.**',
        'Jeder fiese Gedanke über dich oder dein Bild: **ein Strich** am Rand.',
        'Dein Gegenüber zeichnet dich – und zählt auch.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['', 'Striche'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Das hat sie gesagt:', kreis: ['„hässlich“', '„peinlich“', '„kannst du nicht“', '„lass es“', 'nichts'] }] },
      ],
      aha: 'Die Stimme meldet sich, **sobald du etwas versuchst.** Wer sie bemerkt, ist schon einen Schritt weiter.',
      ziel: 'Die Stimme in Echtzeit bemerken – bei einer harmlosen Aufgabe.',
      tipp: 'Über die Bilder lachen ist erlaubt, über die Person nicht. Die eigenen Striche laut mitzählen.',
    },
    {
      titel: 'Mia, 14 von 20', bild: 'peep:mia:traurig', icon: 'file-check', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Mias Moment an.', 'Kreis ein: Würde Mia so mit einer Freundin reden?', 'Kreuz an: Was würde sie der Freundin sagen?'],
      zonen: [
        { art: 'comic', bilder: [['file-check', 'Mia bekommt die Arbeit zurück: 14 von 20.'], ['thumb-up', 'Die Lehrerin sagt: „Gut gemacht.“'], ['volume', 'Die Stimme sagt: „Sechs Fehler. Die sagt das aus Mitleid.“'], ['mood-smile', 'Mia lächelt und packt das Blatt weg.']] },
        { art: 'fragen', fragen: [{ f: 'Würde Mia so mit einer Freundin reden?', kreis: ['nie', 'vielleicht', 'ja'] }, { f: 'Das würde sie der Freundin sagen:', kreuz: ['„14 ist gut.“', '„Sechs Fehler. Peinlich.“', '„Nächstes Mal 15.“'] }] },
      ],
      aha: 'Niemand im Raum redet so mit Mia. **Nur sie selbst.**',
      ziel: 'Den Unterschied sehen: So redet man mit anderen nicht.',
      tipp: 'Nicht sagen „Du machst das auch“. Das merkt er selbst.',
    },
    {
      titel: 'Zwei Stühle', icon: 'armchair', zeit: '12 Min.', wer: 'beide', material: 'zwei Stühle',
      schritte: [
        'Stuhl 1 ist **die Stimme.** Stuhl 2 ist **jemand, der dich mag.**',
        'Dein Gegenüber liest eine Lage vor.',
        'Setz dich auf Stuhl 1: Was sagt die Stimme?',
        '**Wechsel den Stuhl:** Was sagt jemand, der dich mag?',
        'Bei der nächsten Lage ist dein Gegenüber dran.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Gesagt auf …', raster: { spalten: ['Stuhl 1', 'Stuhl 2'], zeilen: ['Ich habe etwas verhauen.', 'Jemand antwortet mir nicht.', 'Jemand lobt mich.', 'Ich habe etwas vergessen.'] } }, { f: 'Welcher Stuhl war leichter?', kreis: ['Stuhl 1', 'Stuhl 2', 'beide gleich'] }] }],
      aha: 'Gleiche Lage, zwei Stimmen. **Du kannst den Stuhl wechseln.**',
      ziel: 'Erleben, dass es eine zweite Art gibt, mit sich zu reden.',
      tipp: 'Wirklich aufstehen und wechseln – die Bewegung ist der Punkt. Fällt Stuhl 2 schwer: „Was würdest du einem sagen, den du magst?“',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 5 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Erfolgreiche Leute glauben ihr auch. Was sagt das über die Stimme?') },
        { art: 'daumen', saetze: ['Lob glaube ich meistens nicht.', 'Auch erfolgreiche Leute zweifeln an sich.', 'Wer an sich zweifelt, ist schwach.', 'Ich denke manchmal: Gleich merken alle, dass ich nichts kann.'] },
      ],
      aha: 'Die Stimme sagt wenig darüber, **was du wirklich kannst.**',
      ziel: 'Sehen, dass Selbstzweifel und Können nichts miteinander zu tun haben.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: '„Hab’s gehört.“', bild: 'peep:mia:muede', icon: 'ball-basketball', zeit: '15 Min.', wer: 'beide', material: '10 Papierkugeln, Papierkorb',
      schritte: [
        'Wirf zehn Papierkugeln in den Korb. **Runde 1:** in Ruhe.',
        '**Runde 2:** Dein Gegenüber spielt die Stimme und sagt bei jedem Wurf „Daneben.“, „Typisch.“ oder „Wird nichts.“',
        '**Runde 3:** wie Runde 2. Du sagst jedes Mal **„Hab’s gehört.“** – und wirfst weiter.',
        'Tauschen: Jetzt bist du die Stimme.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['Treffer von 10', 'in Ruhe', 'mit Stimme', 'mit „Hab’s gehört.“'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Du musst die Stimme nicht loswerden. **„Hab’s gehört.“ Und weitermachen.**',
      ziel: 'Eine Antwort auf die Stimme üben, die nicht diskutiert.',
      tipp: 'Zuerst werfen Sie, der Jugendliche ist die Stimme. Nur die drei Sätze aus dem Heft benutzen, nichts Persönliches.',
    },
    {
      titel: 'Trainer statt Richter', icon: 'speakerphone', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Ein Richter sagt: „Schuldig.“ Ein Trainer sagt: „Nächster Versuch.“',
        'Kreuz an: Welche **Trainer-Sätze** passen zu dir?',
        'Dein Gegenüber macht etwas mit Absicht falsch. Du bist der Trainer. Sag deinen Satz.',
        'Tauschen.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Meine Trainer-Sätze:', unter: true, kreuz: ['„Nächster Versuch.“', '„Das war schwer. Du hast es probiert.“', '„Ein Fehler. Kein Urteil.“', '„Was brauchst du jetzt?“', '„Weiter.“'] }, { f: 'Oder mein eigener:', linien: 1 }] }],
      aha: 'Wer fair mit sich ist, **versucht es eher noch einmal.**',
      ziel: 'Einen eigenen fairen Satz haben und einmal laut gesagt haben.',
      tipp: 'Ihr „Fehler“ darf lustig sein. Wichtig ist, dass der Jugendliche den Trainer-Satz laut sagt – zu Ihnen.',
    },
  ],
  woche: {
    titel: 'Ein Tag Strichliste', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Such dir **einen Tag** aus. Zähl mit.', 'Jeder fiese Satz gegen dich: ein Strich in der ersten Zeile.', 'An den anderen Tagen nur die Zeilen zwei und drei.'],
    zonen: [
      { art: 'woche', zeilen: ['Die Stimme hat sich gemeldet', '„Hab’s gehört.“ gesagt', 'Trainer-Satz benutzt'] },
      { art: 'karten', karten: [
        { titel: 'Wer redet da?', icon: 'volume', zeilen: ['Die Stimme meldet sich.', 'Kurz hinhören: Wie klingt sie?', '„Hab’s gehört.“ Dann weitermachen.'] },
        { titel: 'Trainer statt Richter', icon: 'heart-handshake', zeilen: ['Was ist passiert? Nur Fakten.', 'Was würde ein guter Trainer sagen?', 'Was ist der nächste Versuch?'] },
      ] },
    ],
    aha: 'Nichts ändern. Nur zählen. **Das reicht schon, damit sie leiser wird.**',
    ziel: 'Die Stimme einen Tag lang zählen.',
    tipp: 'Die Zahl nicht bewerten. Fragen: Zu welcher Tageszeit kamen die meisten Striche?',
  },
  begleitung: { material: 'Stifte, Papier, zwei Stühle, Papierkorb, Handy', achtung: s.begleitung.achtung + ' Wichtig: „Stimme im Kopf“ meint hier eigene Gedanken. Berichtet der Jugendliche von Stimmen, die er wie von außen hört, ist das ein Fall für eine ärztliche Abklärung.', mehr: MEHR(s) },
}
export default d
