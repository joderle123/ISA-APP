// SOLO #06 · NACHTS – Schlaf in der Einzelarbeit: Was hält nachts wach, das tagsüber keinen Platz hat?
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's06', nr: '06', datei: 'Solo-06-Nachts', reihe: 'Thema',
  thema: 'Nachts', headline: 'Um halb drei lügt dein Kopf.', farbe: '#4D94FF', stand: 'November 2026',
  bild: 'peep:nele:muede', sticker: 'Nachtschicht',
  seiten: [
    {
      titel: 'Nachts', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Geh halt früher ins Bett.“ Als wäre das Problem, dass du die Uhr nicht lesen kannst.',
          'Wer nachts wach liegt, hat selten ein Problem mit dem Bett. Meistens hat er einen Kopf, der erst dann loslegt, **wenn endlich Ruhe ist**. Darum geht es hier – und um drei Dinge, die wirklich etwas ändern.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Geh halt früher ins Bett.“', '„Kein Handy vor dem Schlafen.“', '„Trink einen Tee.“', '„Du musst dich nur entspannen.“', '„Zähl Schafe.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So schlecht schlafe ich', 'So sehr glaube ich, dass sich das ändern lässt'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Drei Dinge über Schlaf, die nicht auf dem Gesundheits-Flyer stehen', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:nele:muede', name: 'Nele, 15',
          text: 'Nele liegt seit halb zwölf im Bett. Um eins rechnet sie: noch fünfeinhalb Stunden. Um zwei: noch viereinhalb. Um halb drei ist sie sicher, dass sie die Ausbildung nie schafft, dass ihre beste Freundin sie eigentlich nicht mag und dass mit ihr etwas grundsätzlich nicht stimmt. Um zehn Uhr morgens kommt ihr das alles übertrieben vor. Um halb drei war es die Wahrheit.',
          frage: 'Welche Nele hat recht – die von halb drei oder die von zehn?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Wach liegen übt wach liegen', x: 'Wer im Bett grübelt, scrollt und auf die Uhr schaut, bringt dem Gehirn bei: **Bett heißt wach.** Das lässt sich wieder umlernen.' },
          { t: 'Nachts lügt der Kopf', x: 'Nach Mitternacht ist der Teil des Gehirns müde, der Gedanken prüft. **Sorgen klingen dann wie Tatsachen.**' },
          { t: 'Aufstehen schlägt Hinlegen', x: 'Wann du ins Bett gehst, kannst du schlecht steuern. **Wann du aufstehst, schon.** Eine feste Zeit zieht den Rest mit.' },
        ] },
        { art: 'clip', clip: { titel: '6 oder 9 Uhr? Warum wir zur falschen Zeit aufstehen!', kanal: 'Quarks', url: YT + 'kY5rFRU8A1c', dauer: 'die ersten 6 Min.', frage: 'Bist du eher früh oder spät gebaut – und passt dein Alltag dazu?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was hält dich nachts wach, das ==tagsüber keinen Platz== hat?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Erst Zahlen, dann Gedanken, dann der Vergleich', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Meine Nacht', wie: 'allein', zeit: '4 Min.',
          fragen: [
            { f: 'Die letzte Nacht, ungefähr:', satz: ['Ins Bett um:', 'Eingeschlafen um:', 'Aufgestanden um:'] },
            { f: 'Was machst du, wenn du wach liegst? Kreise ein:', kreis: ['Handy', 'grübeln', 'auf die Uhr schauen', 'Musik', 'aufstehen', 'essen', 'nichts'] },
          ] },
        { art: 'fragen', titel: 'Halb-drei-Gedanken', wie: 'zusammen', zeit: '8 Min.',
          kontext: 'Schreib links einen Gedanken auf, der nachts kommt. Rechts denselben Gedanken, wie er am Vormittag klingt.',
          fragen: [{ f: 'Derselbe Kopf, andere Uhrzeit:', preis: { erste: 'Gedanke über …', kopf: ['um halb drei', 'um zehn Uhr morgens'], optionen: ['mich', 'andere Leute', 'morgen'] } }] },
        { art: 'fragen', titel: 'Schlaf-Vergleich', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Stunden Schlaf letzte Nacht', 'Das Letzte, was ich vor dem Schlafen mache', 'Mein schlechtester Einschlaf-Trick'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Raus aus dem Bett', x: 'Liegst du ungefähr **20 Minuten** wach: Steh auf. Setz dich woanders hin, wenig Licht, etwas Langweiliges – kein Handy. Erst zurück, wenn du müde wirst. Drei Nächte lang. Wette vorher: Schläfst du am dritten Abend schneller ein oder langsamer?' },
        { art: 'karten', karten: [
          { titel: 'Nachts gilt', icon: 'moon', zeilen: ['Nach Mitternacht nichts entscheiden.', 'Nichts glauben, was ich nachts über mich denke.', 'Um zehn Uhr noch mal prüfen.'] },
          { titel: 'Mein Anker', icon: 'sunrise', zeilen: ['Jeden Tag ungefähr gleich aufstehen:', '_Um', 'Danach zehn Minuten ans Tageslicht.'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Wo hast du in deinem Leben am besten geschlafen?', 'Was ist dein Trick, wenn gar nichts mehr geht?'],
          ['Was magst du an der Nacht, wenn alle anderen schlafen?', 'Welcher Gedanke kommt nachts immer wieder?'],
          ['Gab es eine Zeit, in der Schlafen nicht sicher war?', 'Was träumst du, das du keinem erzählst? Nur, wenn du willst.'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was lernt das Gehirn, wenn man stundenlang wach im Bett liegt?', o: ['Bett heißt schlafen', 'Bett heißt wach', 'gar nichts', 'Mathe'], r: 1, warum: 'Deshalb hilft es, bei langem Wachliegen aufzustehen.' },
    { f: 'Warum wirken Sorgen nachts größer?', o: ['weil sie dann stimmen', 'weil der prüfende Teil des Gehirns müde ist', 'wegen des Mondes', 'weil es dunkel ist'], r: 1, warum: 'Nachts fehlt die Gegenstimme.' },
    { f: 'Was stabilisiert den Schlaf am meisten?', o: ['früh ins Bett gehen', 'jeden Tag ungefähr gleich aufstehen', 'am Wochenende bis mittags schlafen', 'ein Nickerchen am Abend'], r: 1, warum: 'Die Aufstehzeit ist der Anker der inneren Uhr.' },
    { f: 'Warum werden Jugendliche abends später müde?', o: ['aus Faulheit', 'die innere Uhr verschiebt sich in der Pubertät', 'wegen der Schule', 'das stimmt gar nicht'], r: 1, warum: 'Biologie, kein Charakterfehler.' },
    { f: 'Was hilft morgens beim Wachwerden am meisten?', o: ['Tageslicht', 'die Schlummertaste', 'ein dunkles Zimmer', 'liegen bleiben'], r: 0, warum: 'Licht stellt die innere Uhr.' },
    { f: 'Du liegst seit 20 Minuten wach. Was ist am klügsten?', o: ['auf die Uhr schauen', 'liegen bleiben und nachrechnen', 'aufstehen und etwas Langweiliges tun', 'das Handy holen'], r: 2, warum: 'Zurück ins Bett erst, wenn Müdigkeit kommt.' },
    { f: 'Was macht zu wenig Schlaf am nächsten Tag?', o: ['bessere Laune', 'eine kürzere Zündschnur', 'mehr Geduld', 'nichts'], r: 1, warum: 'Müde Menschen rasten schneller aus.' },
    { f: 'Eine Entscheidung um drei Uhr nachts ist meistens …', o: ['besonders klug', 'besonders ehrlich', 'schlechter als dieselbe am Vormittag', 'egal'], r: 2, warum: 'Darum: nachts nichts entscheiden.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #08']],
    wann: ['Dauermüde, verschläft, schläft im Unterricht ein.', 'Grübelt nachts; morgens gereizt oder niedergeschlagen.', 'Tag-Nacht-Rhythmus verschoben (Ferien, Zocken, Schichtwechsel in der Wohngruppe).', 'Ausraster häufen sich nach schlechten Nächten.'],
    ziel: 'Der Jugendliche unterscheidet zwischen „nicht schlafen können“ und „nachts denken müssen“ – und testet eine einzige Veränderung, die er selbst in der Hand hat.',
    anschluss: 'Grundlagen zu Schlaf und Energie stehen in REAL TALK #08.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1: Zweite Zahl beachten – wer nicht glaubt, dass sich etwas ändern lässt, braucht zuerst ein kleines Erfolgserlebnis.'],
      ['5–20', 'Der Fall. Die Frage ernst nehmen: Beide Neles haben einen Punkt. Dann die Kästen und das Video.'],
      ['20–40', '„Meine Nacht“ allein. „Halb-drei-Gedanken“ gemeinsam – die rechte Spalte formuliert der Jugendliche. Dann das Duell mit Ihrer eigenen Nacht.'],
      ['40–50', 'Experiment besprechen (siehe Hinweise), Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Schlaf lässt sich nicht befehlen. Jede Form von Druck („du musst“) macht ihn schlechter.', 'Die Nacht hat für viele auch etwas Gutes: endlich Ruhe, niemand will etwas. Das zuerst würdigen.', 'Nächtliche Gedanken nicht widerlegen. Die Uhrzeit ist das Argument.', 'Ihre eigene schlechte Nacht im Duell ist glaubwürdiger als jeder Tipp.'],
    hinweise: ['Seite 4: Das Experiment vorher mit der Wohngruppe oder der Familie abklären – nachts aufstehen ist nicht überall erlaubt. Ersatz: im Bett aufsetzen, Licht aus, ein Hörbuch ohne Bildschirm.', 'Seite 3: Die Antwort auf die unbequeme Frage gehört oft in ein anderes Heft (Zuhause, Stimme im Kopf, Angst).', 'Medikamente, Koffein und Energy-Drinks am Nachmittag mitdenken und ohne Vorwurf erfragen.'],
    achtung: 'Schlaflosigkeit ist bei belasteten Jugendlichen häufig mit Albträumen, nächtlicher Angst oder früheren Erfahrungen verbunden, bei denen die Nacht nicht sicher war (Stufe 3). Nicht ausfragen. Bei anhaltender Schlaflosigkeit, Albträumen oder nächtlichen Suizidgedanken ärztliche oder therapeutische Abklärung veranlassen und die zuständige Leitung (Responsable) einbeziehen. Schlafmittel sind kein Thema dieser Stunde.',
    hintergrund: 'In der Pubertät verschiebt sich die innere Uhr nach hinten; empfohlen sind acht bis zehn Stunden Schlaf (Carskadon; Paruthi et al.). Das Bett nur zum Schlafen zu nutzen und bei längerem Wachliegen aufzustehen, ist ein Kernbaustein der wirksamsten Behandlung von Schlaflosigkeit (Bootzin). Nach Mitternacht sind Stimmung und Selbstkontrolle messbar schlechter, Grübeln und riskante Entscheidungen häufiger (Tubbs et al.). Feste Aufstehzeiten und Morgenlicht verschieben den Rhythmus von Jugendlichen wirksam nach vorn (Gradisar et al.).',
    quellen: 'Carskadon (2011) · Paruthi et al. (2016) · Bootzin (1972) · Tubbs et al. (2022) · Gradisar et al. (2011).',
  },
}
export default d
