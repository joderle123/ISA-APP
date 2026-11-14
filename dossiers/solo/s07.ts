// SOLO #07 · STIMME – die Stimme im Kopf, die alles mies macht (Selbstwert). Anschluss an REAL TALK #04.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's07', nr: '07', datei: 'Solo-07-Stimme', reihe: 'Thema',
  thema: 'Stimme', headline: 'Wer redet da eigentlich so mit dir?', farbe: '#B79CFF', stand: 'November 2026',
  bild: 'peep:mia:traurig', sticker: 'Wörtlich zitiert',
  seiten: [
    {
      titel: 'Stimme', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Du musst an dich glauben.“ „Du bist toll, so wie du bist.“ Nett gemeint. Bringt nichts – weil die Stimme in deinem Kopf lauter ist als jeder, der das sagt.',
          'Diese Stimme kommentiert alles, was du tust. Und zwar in einem Ton, den du dir von keinem anderen gefallen lassen würdest. **Heute hören wir ihr mal genau zu.** Nicht, um sie wegzumachen. Um herauszufinden, wem sie gehört.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Du musst an dich glauben.“', '„Sei nicht so streng mit dir.“', '„Du bist toll, so wie du bist.“', '„Denk doch mal positiv.“', '„Andere haben es viel schlimmer.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So laut ist die Stimme heute', 'So sehr glaube ich ihr'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Drei Dinge über die Stimme, die sie dir selbst nie sagen würde', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:mia:traurig', name: 'Mia, 16',
          text: 'Mia bekommt die Arbeit zurück: 14 von 20. Die Lehrerin sagt: „Gut gemacht.“ Die Stimme in Mias Kopf sagt: „Sechs Fehler. Bei so einer leichten Arbeit. Die anderen hatten sicher mehr. Die sagt das nur aus Mitleid.“ Mia lächelt und packt das Blatt weg. Niemand im Raum würde so mit ihr reden. Nur sie selbst.',
          frage: 'Was würde Mia tun, wenn jemand so mit ihrer besten Freundin redet?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Die Stimme gehört jemandem', x: 'Hör auf den Tonfall, nicht auf die Wörter. **Oft klingt sie wie jemand, den du kennst.** Du hast sie gelernt, nicht erfunden.' },
          { t: 'Sie will dich schützen', x: 'Wer sich selbst zuerst fertigmacht, den kann kein anderer mehr überraschen. **Die Stimme ist ein schlechter Bodyguard – aber ein Bodyguard.**' },
          { t: 'Härte macht nicht besser', x: 'Leute, die nach einem Fehler fair mit sich umgehen, **versuchen es öfter noch einmal** als die, die sich fertigmachen.' },
        ] },
        { art: 'clip', clip: { titel: 'Impostor-Syndrom: Warum wir uns manchmal als Hochstapler fühlen', kanal: 'Quarks Dimension Ralph', url: YT + '8sPRWUwsmfk', dauer: 'die ersten 5 Min.', frage: 'Kennst du das Gefühl, dass gleich auffliegt, dass du nichts kannst?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'In wessen ==Tonfall== redet die Stimme in deinem Kopf?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Erst mitschreiben, was sie sagt. Dann prüfen, ob du das einem Freund sagen würdest', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Die Stimme zitieren', wie: 'allein', zeit: '5 Min.',
          kontext: 'Schreib sie wörtlich auf. Wie ein Protokoll – ohne zu diskutieren.',
          fragen: [{ f: 'Zitate:', satz: ['Das sagt sie am häufigsten:', 'Das sagt sie nach einem Fehler:', 'Sie klingt ein bisschen wie:'] }] },
        { art: 'fragen', titel: 'Der Freundes-Test', wie: 'zusammen', zeit: '7 Min.',
          fragen: [{ f: 'Gleiche Lage, zwei Stimmen:', preis: { erste: 'Lage', kopf: ['das sage ich zu mir', 'das würde ich einem Freund sagen'], optionen: ['Ich habe etwas verhauen.', 'Jemand antwortet mir nicht.', 'Ich sehe mich im Spiegel.'] } },
            { f: 'Warum der Unterschied?', linien: 1 }] },
        { art: 'fragen', titel: 'Auch Erwachsene haben eine', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Mein häufigster Satz gegen mich', 'Seit wann ich ihn kenne', 'Wann die Stimme leise ist'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Strichliste', x: 'Zähl **einen einzigen Tag** lang mit: Jeder Satz, mit dem du dich selbst fertigmachst, ist ein Strich – auf der Hand oder im Handy. Nichts ändern, nur zählen. Wette vorher: Wie viele werden es bis zum Abend?' },
        { art: 'karten', karten: [
          { titel: 'Wer redet da?', icon: 'volume', zeilen: ['Die Stimme meldet sich.', 'Kurz hinhören: Wessen Tonfall ist das?', '„Hab’s gehört.“ Dann weitermachen.'] },
          { titel: 'Trainer statt Richter', icon: 'heart-handshake', zeilen: ['Was ist passiert? Nur das, was man sehen kann.', 'Was würde ein guter Trainer jetzt sagen?', 'Was ist der nächste Versuch?'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Wofür würde dich dein bester Freund loben?', 'Welches Kompliment hast du zuletzt nicht geglaubt?'],
          ['Welcher Satz über dich stammt gar nicht von dir?', 'Wann ist die Stimme leise?'],
          ['Wer hat zuerst so mit dir geredet?', 'Was müsste passieren, damit du ihr nicht mehr glaubst?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Woher kommt die strenge Stimme im Kopf meistens?', o: ['Sie ist angeboren.', 'Sie wurde gelernt – oft von echten Menschen.', 'aus dem Handy', 'Niemand hat so eine.'], r: 1, warum: 'Deshalb lohnt die Frage nach dem Tonfall.' },
    { f: 'Was will die Stimme eigentlich erreichen?', o: ['dich zerstören', 'dich schützen, auf eine schlechte Art', 'gar nichts', 'dich unterhalten'], r: 1, warum: 'Wer sich zuerst kleinmacht, wird nicht überrascht.' },
    { f: 'Wer macht nach einem Fehler eher weiter?', o: ['wer sich fertigmacht', 'wer fair mit sich umgeht', 'beide gleich', 'keiner'], r: 1, warum: 'Härte lähmt, Fairness hält im Spiel.' },
    { f: 'Der Freundes-Test fragt:', o: ['Wie viele Freunde habe ich?', 'Würde ich das so einem Freund sagen?', 'Wer ist mein bester Freund?', 'Wer mag mich nicht?'], r: 1, warum: 'Meistens lautet die Antwort Nein.' },
    { f: 'Hilft „Denk doch positiv“ gegen die Stimme?', o: ['ja, sofort', 'meistens nicht', 'nur morgens', 'nur bei Erwachsenen'], r: 1, warum: 'Ein neuer Satz muss stimmen, sonst glaubt ihn der Kopf nicht.' },
    { f: 'Ein Gedanke über dich ist …', o: ['immer wahr', 'ein Gedanke – noch keine Tatsache', 'immer falsch', 'ein Befehl'], r: 1, warum: 'Man kann ihn prüfen wie eine Behauptung.' },
    { f: 'Das Hochstapler-Gefühl („gleich fliegt auf, dass ich nichts kann“) haben …', o: ['nur Schwache', 'sehr viele, auch Erfolgreiche', 'nur Kinder', 'fast niemand'], r: 1, warum: 'Es sagt wenig über das, was man wirklich kann.' },
    { f: 'Was ist der erste Schritt gegen die Stimme?', o: ['sie anschreien', 'sie bemerken', 'sie ignorieren', 'lauter Musik hören'], r: 1, warum: 'Wer sie bemerkt, ist schon nicht mehr dasselbe wie sie.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #04']],
    wann: ['Wertet sich ständig ab oder wehrt jedes Lob ab.', 'Gibt schnell auf: „Kann ich eh nicht.“', 'Perfektionismus – nichts ist gut genug.', 'Nach außen cool, nach innen gnadenlos.'],
    ziel: 'Der Jugendliche hört die abwertende Stimme zum ersten Mal als etwas, das er hat – nicht als etwas, das er ist – und erkennt, woher ihr Ton stammt.',
    anschluss: 'Das Prüfen einzelner Sätze (Beweise dafür und dagegen) steht in REAL TALK #04.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1: Wenn „Du bist toll“ als „schon gehört, hat nicht geholfen“ angekreuzt ist – in dieser Stunde kein einziges Lob aussprechen.'],
      ['5–20', 'Der Fall, die Kästen, das Video. Die unbequeme Frage stellen und warten. Kommt keine Antwort, ist „weiß ich nicht“ völlig in Ordnung.'],
      ['20–40', '„Die Stimme zitieren“ allein. „Der Freundes-Test“ gemeinsam. Dann das Duell: Ihr eigener Satz gegen sich selbst.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Nicht dagegenreden. Jedes „Das stimmt doch gar nicht“ macht die Stimme lauter.', 'Die Stimme als Schutz würdigen: Sie hat einmal einen Zweck erfüllt.', 'Ihr eigener Satz im Duell muss echt sein. Das ist für viele Jugendliche die Überraschung der Stunde.', 'Auf den Tonfall achten, den der Jugendliche beim Zitieren benutzt – er verrät oft die Herkunft.'],
    hinweise: ['Seite 3: „Ich sehe mich im Spiegel“ kann das Thema Körper öffnen. Dann SOLO „Körper“ anbieten, nicht hier vertiefen.', 'Seite 4: Die Strichliste verändert meist schon durch das Zählen etwas. Die Zahl nicht bewerten.', 'Stufe 3: „Wer hat zuerst so mit dir geredet?“ führt oft in die Familie. Nur zuhören.'],
    achtung: 'Starke Selbstabwertung kann mit Selbstverletzung oder Suizidgedanken einhergehen. Sätze wie „Ohne mich wäre es besser“ ruhig und direkt aufgreifen: „Denkst du manchmal daran, nicht mehr leben zu wollen?“ Danach nicht allein entscheiden – Verfahren der Einrichtung, zuständige Leitung (Responsable), Krisenplan. Stammt die Stimme erkennbar aus Abwertung oder Gewalt zu Hause, ist das ein Hinweis auf Belastung, der ins Team gehört.',
    hintergrund: 'Selbstkritik lässt sich als früh gelernte Sicherheitsstrategie verstehen: Wer sich selbst angreift, kommt der Zurückweisung durch andere zuvor (Gilbert). Ein freundlicher Umgang mit eigenen Fehlern geht mit mehr, nicht weniger Bereitschaft einher, es erneut zu versuchen (Breines & Chen; Neff). Gedanken als Gedanken zu bemerken, statt ihnen zu glauben, ist ein Kernprinzip kognitiver und achtsamkeitsbasierter Verfahren (Beck; Hayes et al.). Selbstbeobachtung allein verändert Verhalten bereits messbar (Korotitsch & Nelson-Gray).',
    quellen: 'Gilbert (2010) · Breines & Chen (2012) · Neff (2003) · Beck (1979) · Hayes, Strosahl & Wilson (2012) · Korotitsch & Nelson-Gray (1999).',
  },
}
export default d
