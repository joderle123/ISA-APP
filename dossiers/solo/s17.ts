// SOLO #17 · KÖRPER – Aussehen und Körperbild in der Einzelarbeit. Ohne Zahlen (Gewicht, Kalorien, Größen).
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's17', nr: '17', datei: 'Solo-17-Koerper', reihe: 'Thema',
  thema: 'Körper', headline: 'Niemand schaut so genau hin wie du.', farbe: '#FFD60A', stand: 'November 2026',
  bild: 'peep:sami:verlegen', sticker: 'Können zählt',
  seiten: [
    {
      titel: 'Körper', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Du bist schön, so wie du bist.“ Wer das sagt, sieht nicht, was du im Spiegel siehst.',
          'In diesem Heft sagt dir niemand, wie du aussiehst oder aussehen solltest. **Es kommt keine einzige Zahl vor** – kein Gewicht, keine Größe, keine Kalorien. Es geht darum, warum du dich selbst so anders siehst als alle anderen, und was dein Körper kann, während du dich über ihn ärgerst.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Du bist schön, so wie du bist.“', '„Auf die inneren Werte kommt es an.“', '„Das wächst sich aus.“', '„Iss doch mal was Richtiges.“', '„Andere wären froh über deine Figur.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So oft denke ich an mein Aussehen', 'So sehr bestimmt es, was ich mache oder lasse'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Warum du dich anders siehst als alle anderen', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:sami:verlegen', name: 'Sami, 14',
          text: 'Im Schwimmbad behält Sami das T-Shirt an. „Sonnenbrand“, sagt er. Zu Hause macht er Liegestütze vor dem Spiegel, schaut Videos von Typen mit Bauchmuskeln und rechnet aus, wie lange es dauert, bis er auch so aussieht. Beim Essen lässt er die Hälfte stehen. Seine Schwester sagt: „Du spinnst, du bist doch ganz normal.“ Normal ist genau das Wort, das Sami am meisten hasst.',
          frage: 'Was würde sich für Sami wirklich ändern, wenn er aussähe wie die im Video?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Der Scheinwerfer', x: 'Du suchst im Spiegel die Stellen, die du nicht magst. Andere sehen einen Menschen in Bewegung. **Niemand schaut so genau hin wie du selbst.**' },
          { t: 'Der Vergleich ist gezinkt', x: 'Licht, Winkel, Filter, Auswahl aus hundert Fotos. **Es wirkt trotzdem – auch wenn du es weißt.** Wissen schützt hier nicht.' },
          { t: 'Können statt aussehen', x: 'Wer darauf achtet, was sein Körper **kann**, ist zufriedener als jemand, der nur darauf achtet, wie er aussieht.' },
        ] },
        { art: 'clip', clip: { titel: 'Schönheitswahn im Netz: Schlechter Einfluss durch Influencer?', kanal: 'ARD GESUND', url: YT + 'S-i0TGztH0Y', dauer: 'die ersten 6 Min.', frage: 'Welche Accounts in deinem Feed machen mit dir, was hier beschrieben wird?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was würdest du ==machen==, wenn dir dein Aussehen einen Tag lang egal wäre?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Was dein Körper kann – und was dein Feed mit dir macht', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Was mein Körper kann', wie: 'allein', zeit: '5 Min.',
          fragen: [{ f: 'Nichts über Aussehen:', satz: ['Das kann mein Körper gut:', 'Das hat er schon ausgehalten:', 'Dabei fühle ich mich in ihm wohl:'] }] },
        { art: 'fragen', titel: 'Der Feed-Check', wie: 'allein', zeit: '6 Min.',
          kontext: 'Schau die letzten 20 Beiträge in deinem Feed an. Zähl mit.',
          fragen: [
            { f: 'Meine Strichliste:', satz: ['So viele zeigen Körper oder Gesichter:', 'So viele davon sehen aus wie Leute, die ich kenne:'] },
            { f: 'Das mache ich wegen meines Aussehens **nicht**:', kreuz: ['schwimmen gehen', 'Fotos von mir zulassen', 'vor anderen essen', 'bestimmte Sachen anziehen', 'Sport mit anderen', 'jemanden ansprechen'] },
          ] },
        { art: 'fragen', titel: 'Mit 15', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '4 Min.',
          kontext: 'Dein Gegenüber antwortet für die Zeit, als es selbst 15 war.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Das mag ich an mir gar nicht – oder mochte ich nicht', 'Ein Kommentar über meinen Körper, den ich nicht vergesse'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Drei weg', x: 'Entfolge **drei Accounts**, nach denen du dich schlechter fühlst – nur für eine Woche. Danach kannst du ihnen wieder folgen. Wette vorher: Merkst du einen Unterschied – und wenn ja, wann?' },
        { art: 'karten', karten: [
          { titel: 'Können statt aussehen', icon: 'run', zeilen: ['Was hat mein Körper heute für mich gemacht?', 'Getragen, geatmet, gelacht, geschlafen.', 'Er muss mich tragen, nicht gefallen.'] },
          { titel: 'Spiegel-Regel', icon: 'eye', zeilen: ['Ein kurzer Blick reicht.', 'Keine Suche nach Fehlern.', 'Niemand schaut so genau hin wie ich.'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Wobei vergisst du völlig, wie du aussiehst?', 'Wessen Stil gefällt dir?'],
          ['Welcher Kommentar über deinen Körper sitzt bis heute?', 'Wann fühlst du dich in deinem Körper wohl?'],
          ['Was tust du deinem Körper an, wenn du ihn nicht leiden kannst?', 'Was müsste passieren, damit du Frieden mit ihm schließt?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Wer achtet am genauesten auf dein Aussehen?', o: ['alle anderen', 'du selbst', 'deine Lehrer', 'Fremde im Bus'], r: 1, warum: 'Andere bemerken viel weniger, als man glaubt.' },
    { f: 'Du weißt, dass ein Foto bearbeitet ist. Wirkt der Vergleich trotzdem?', o: ['nein', 'ja, oft', 'nur bei Kindern', 'nur bei Mädchen'], r: 1, warum: 'Das Gefühl kommt schneller als das Wissen.' },
    { f: 'Wer ist mit seinem Körper zufriedener?', o: ['wer ihn oft im Spiegel prüft', 'wer darauf achtet, was er kann', 'wer viele Fotos macht', 'wer ihn versteckt'], r: 1, warum: 'Funktion schlägt Aussehen.' },
    { f: 'Betrifft Unzufriedenheit mit dem Körper nur Mädchen?', o: ['ja', 'nein, Jungen genauso', 'nur Erwachsene', 'nur Sportler'], r: 1, warum: 'Bei Jungen geht es oft um Muskeln statt um Dünnsein.' },
    { f: 'Was zeigen Bilder von Influencern meistens?', o: ['den Alltag', 'das beste von sehr vielen Fotos', 'die Wahrheit', 'nichts Besonderes'], r: 1, warum: 'Licht, Winkel, Filter, Auswahl.' },
    { f: 'Was hilft dem eigenen Körperbild am ehesten?', o: ['mehr Vergleiche', 'Accounts entfolgen, die runterziehen', 'strengere Regeln beim Essen', 'öfter wiegen'], r: 1, warum: 'Weniger gezinkte Vergleiche, weniger Druck.' },
    { f: 'Jemand isst kaum noch und redet nur über sein Aussehen. Was tun?', o: ['nichts, ist seine Sache', 'einem Erwachsenen sagen, dem man traut', 'ihn auslachen', 'Diät-Tipps geben'], r: 1, warum: 'Das kann ernst werden und braucht Hilfe.' },
    { f: 'Wozu ist ein Körper zuerst da?', o: ['um anderen zu gefallen', 'um dich durchs Leben zu tragen', 'für Fotos', 'für Vergleiche'], r: 1, warum: 'Er muss dich tragen, nicht gefallen.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Handy, Gerät fürs Video'], ['Regel', 'keine Zahlen']],
    wann: ['Versteckt den Körper, meidet Schwimmen, Sport, Fotos.', 'Ständige Vergleiche; viel Zeit vor dem Spiegel oder mit Fitness- und Schönheitsinhalten.', 'Abwertende Kommentare über den eigenen Körper.', 'Als „brennt“ auf der Landkarte angekreuzt.'],
    ziel: 'Der Jugendliche versteht, warum sein Blick auf sich selbst strenger ist als der aller anderen, und richtet die Aufmerksamkeit einmal darauf, was sein Körper kann.',
    anschluss: 'Vergleiche im Netz: SOLO #03 Scrollen. Die abwertende Stimme: SOLO #07.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1 – die Sprüche. Die Regel „keine Zahlen“ laut wiederholen; sie gilt auch für Sie.'],
      ['5–20', 'Der Fall, die Kästen, das Video. Die unbequeme Frage stellen.'],
      ['20–40', '„Was mein Körper kann“ allein. „Der Feed-Check“ mit dem eigenen Handy – nicht mitschauen. Dann das Duell: Ihr 15-jähriges Ich.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Den Körper des Jugendlichen nie kommentieren – auch nicht mit Lob. Jedes Urteil bestätigt, dass er begutachtet wird.', 'Keine Tipps zu Essen, Sport oder Gewicht.', 'Jungen sind genauso betroffen; bei ihnen geht es häufig um Muskeln und Größe.', 'Im Duell die eigene Unsicherheit von damals ehrlich nennen.'],
    hinweise: ['Seite 3: Die angekreuzten „Mache ich nicht“ zeigen, wie sehr das Thema den Alltag einschränkt – ein guter Maßstab für den Verlauf.', 'Seite 4: „Drei weg“ ist befristet. Wer danach wieder folgt, hat trotzdem etwas herausgefunden.', 'Unwohlsein mit dem Körper kann mit Fragen der Geschlechtsidentität zu tun haben. Respektvoll zuhören und bei Bedarf an eine Fachstelle vermitteln.'],
    achtung: 'Warnzeichen für eine Essstörung ernst nehmen: deutliche Gewichtsveränderung, starre Essensregeln, Auslassen von Mahlzeiten, Erbrechen, übermäßiger Sport, Rückzug beim Essen. Dann zeitnah ärztliche und kinder- und jugendpsychiatrische Abklärung veranlassen – Essstörungen können lebensbedrohlich werden. Die Antwort auf die Frage „Was tust du deinem Körper an?“ (Stufe 3) kann Selbstverletzung betreffen: ruhig nachfragen und nach dem Verfahren der Einrichtung handeln. Abwertung des Körpers kann auch Folge von Übergriffen sein.',
    hintergrund: 'Menschen überschätzen deutlich, wie sehr andere auf ihr Aussehen achten (Gilovich et al.). Vergleiche mit idealisierten und bearbeiteten Bildern verschlechtern das Körperbild, auch wenn die Bearbeitung bekannt ist (Fardouly et al.; Kleemans et al.). Die Aufmerksamkeit auf die Funktionen des Körpers zu richten, verbessert die Zufriedenheit mit ihm (Alleva et al.). Gespräche über Gewicht und Diäten erhöhen bei Jugendlichen das Risiko für gestörtes Essverhalten (Neumark-Sztainer).',
    quellen: 'Gilovich, Medvec & Savitsky (2000) · Fardouly et al. (2015) · Kleemans et al. (2018) · Alleva et al. (2015) · Neumark-Sztainer (2005).',
  },
}
export default d
