// SOLO #14 · SPÄTER – Zukunft in der Einzelarbeit: Was soll aus mir werden? Anschluss an den Bereich „Beruf“ der Toolbox.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's14', nr: '14', datei: 'Solo-14-Spaeter', reihe: 'Thema',
  thema: 'Später', headline: 'Welchen Plan sagst du keinem?', farbe: '#2EE6A8', stand: 'November 2026',
  bild: 'peep:yusuf:neutral:stehen', sticker: 'Ein Dienstag reicht',
  seiten: [
    {
      titel: 'Später', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Wo siehst du dich in fünf Jahren?“ Die ehrliche Antwort wäre: „Keine Ahnung, und Sie wussten das mit 15 auch nicht.“',
          'Niemand muss mit 15 wissen, was er wird. Aber viele haben längst einen Plan – und sagen ihn keinem, weil ihn schon einmal jemand „unrealistisch“ genannt hat. **Hier wird kein Plan kleingemacht.** Auch kein großer.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Wo siehst du dich in fünf Jahren?“', '„Du musst realistisch bleiben.“', '„Mach erst mal deinen Abschluss.“', '„Du kannst alles werden, was du willst.“', '„Mit deiner Akte wird das schwer.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So oft denke ich an später', 'So sehr glaube ich, dass es gut wird'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Warum Zukunft so schwer zu denken ist – und was dagegen spricht, dass alles feststeht', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:yusuf:neutral', name: 'Yusuf, 16',
          text: 'Der Berufsberater fragt: „Wo siehst du dich in fünf Jahren?“ Yusuf sagt: „Keine Ahnung.“ Der Berater seufzt und schreibt etwas auf. Was Yusuf nicht sagt: Er hat einen Plan. Mechatroniker, eine eigene Wohnung – und dass seine kleine Schwester bei ihm essen kann, wenn es zu Hause knallt. Er sagt es nicht, weil das letzte Mal jemand gelacht hat.',
          frage: 'Was schützt Yusuf mit „Keine Ahnung“?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Keiner weiß es mit 15', x: 'Die wenigsten Erwachsenen machen das, was sie mit 15 im Kopf hatten. **Du musst nicht wissen, was du wirst. Nur, was du als Nächstes ausprobierst.**' },
          { t: 'Du in zehn Jahren: ein Fremder', x: 'Das Gehirn behandelt dein späteres Ich wie eine fremde Person. **Deshalb fällt es so schwer, heute etwas für später zu tun.**' },
          { t: 'Eine Akte ist kein Urteil', x: 'Viele mit schwerem Start landen gut. Fast immer gab es einen Wendepunkt: **ein Mensch, eine Arbeit, ein Ort.**' },
        ] },
        { art: 'clip', clip: { titel: 'So krempelst du dein Leben um!', kanal: 'Dinge Erklärt – Kurzgesagt', url: YT + 'OSk0AUT4_8o', dauer: 'die ersten 6 Min.', frage: 'Welche sehr kleine Veränderung würdest du dir zutrauen?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Welchen Plan hast du, den du ==keinem sagst==?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Kein Lebenslauf. Nur ein Dienstag', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Ein normaler Dienstag', wie: 'allein', zeit: '8 Min.',
          kontext: 'Stell dir einen Dienstag in fünf Jahren vor, an dem es **okay** läuft. Nicht perfekt. Okay.',
          fragen: [{ f: 'So genau wie möglich:', satz: ['Ich wache auf in:', 'Tagsüber mache ich:', 'Mittags esse ich mit:', 'Am Abend:', 'Das ist anders als heute:'] }] },
        { art: 'fragen', titel: 'Der Weg dahin', wie: 'zusammen', zeit: '7 Min.',
          fragen: [{ f: 'Vom Dienstag rückwärts:', preis: { erste: 'Bis wann', kopf: ['das muss passieren', 'wer dabei helfen kann'], optionen: ['in diesem Monat', 'in diesem Jahr', 'in drei Jahren'] } }] },
        { art: 'fragen', titel: 'Mit 15', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '4 Min.',
          kontext: 'Dein Gegenüber antwortet für die Zeit, als es selbst 15 war.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Das will ich werden – oder wollte ich', 'Das hat mir jemand ausgeredet'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Wie gerade war der Weg?', x: 'Frag einen Erwachsenen, dessen Leben du okay findest: **„Was wolltest du mit 15 werden – und wie bist du da gelandet, wo du jetzt bist?“** Wette vorher: Wie viele Umwege waren es?' },
        { art: 'karten', karten: [
          { titel: 'Nächster Schritt', icon: 'road', zeilen: ['Ich muss nicht wissen, was ich werde.', 'Nur, was ich als Nächstes ausprobiere:', '_Versuch'] },
          { titel: 'An mich in fünf Jahren', icon: 'send', zeilen: ['Zwei Sätze, die ich dann lesen will:', '_Vergiss nicht', '_Ich hoffe'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Was konntest du als Kind stundenlang machen?', 'Welche Arbeit würdest du nie machen?'],
          ['Wer glaubt an dich – und woran merkst du das?', 'Wovor hast du Angst, wenn du an später denkst?'],
          ['Wessen Leben willst du auf keinen Fall?', 'Was müsste passieren, damit du sagst: Es ist gut geworden?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Muss man mit 15 wissen, was man wird?', o: ['ja, unbedingt', 'nein – nur den nächsten Versuch', 'ja, sonst ist es zu spät', 'das entscheiden andere'], r: 1, warum: 'Die meisten Wege haben Umwege.' },
    { f: 'Warum fällt es schwer, heute etwas für später zu tun?', o: ['aus Faulheit', 'das spätere Ich fühlt sich fremd an', 'weil es sinnlos ist', 'wegen der Schule'], r: 1, warum: 'Für einen Fremden strengt man sich weniger an.' },
    { f: 'Was haben viele Menschen mit schwerem Start gemeinsam, bei denen es gut ausging?', o: ['Glück im Lotto', 'einen Wendepunkt: ein Mensch, eine Arbeit, ein Ort', 'reiche Eltern', 'nichts'], r: 1, warum: 'Oft reichte eine Person, die blieb.' },
    { f: 'Ein Plan ist am stärksten, wenn er …', o: ['groß und ungenau ist', 'einen konkreten nächsten Schritt hat', 'geheim bleibt', 'von anderen stammt'], r: 1, warum: '„Diese Woche anrufen“ schlägt „irgendwann“.' },
    { f: 'Jemand nennt deinen Plan „unrealistisch“. Was sagt das?', o: ['dass er falsch ist', 'etwas über die Vorstellung dieser Person', 'dass du aufgeben sollst', 'gar nichts'], r: 1, warum: 'Prüfen kannst du ihn nur durch den nächsten Schritt.' },
    { f: 'Was hilft, sich die Zukunft vorzustellen?', o: ['ein ganzes Leben planen', 'einen einzigen normalen Tag ausmalen', 'gar nicht daran denken', 'Horoskope'], r: 1, warum: 'Ein Dienstag ist greifbarer als „die Zukunft“.' },
    { f: 'Legt deine Vergangenheit fest, was aus dir wird?', o: ['ja, vollständig', 'nein – sie macht manches schwerer, nicht unmöglich', 'ja, bis 30', 'nur bei anderen'], r: 1, warum: 'Start und Ziel sind zwei verschiedene Dinge.' },
    { f: 'Wer ist für einen Wendepunkt oft entscheidend?', o: ['ein Mensch, der an einen glaubt', 'ein Algorithmus', 'der Zufall allein', 'niemand'], r: 0, warum: 'Deshalb lohnt die Frage: Wer ist das bei dir?' },
  ],
  begleitung: {
    fakten: [['Für wen', '13–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'Toolbox → Beruf']],
    wann: ['Vor Entscheidungen: Praktikum, Lehrstelle, Schulwechsel, Auszug.', '„Mir doch egal, was wird“ – bei einem Jugendlichen, dem es nicht egal ist.', 'Nach einem Rückschlag (Absage, Abbruch, Verfahren).', 'Wenn die Erwachsenen mehr Pläne für ihn haben als er selbst.'],
    ziel: 'Der Jugendliche spricht einen eigenen Plan aus – oder malt sich wenigstens einen einzigen guten Tag aus – und erlebt, dass er nicht kleingemacht wird.',
    anschluss: 'Für die konkrete Berufswahl: Bereich „Beruf“ der Toolbox (Talenttest, Wege zu CCP und DAP).',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1 – die Sprüche. „Realistisch bleiben“ ist in dieser Stunde verboten.'],
      ['5–20', 'Der Fall, die Kästen, das Video. Die unbequeme Frage stellen – und einen genannten Plan nur wiederholen, nicht bewerten.'],
      ['20–40', '„Ein normaler Dienstag“ allein. „Der Weg dahin“ gemeinsam, vom Ziel rückwärts. Dann das Duell: Ihr eigener Weg mit seinen Umwegen.'],
      ['40–50', 'Experiment vereinbaren – gemeinsam überlegen, wen er fragen könnte. Karten ausschneiden.'],
    ],
    haltung: ['Kein Plan ist zu groß. Zu groß ist höchstens der nächste Schritt.', 'Nicht korrigieren und nicht warnen. Hindernisse findet der Jugendliche selbst, wenn er rückwärts plant.', 'Ihr eigener, nicht gerader Weg ist das beste Argument der Stunde.', 'Auch „eine Wohnung und Ruhe“ ist ein vollständiges Lebensziel.'],
    hinweise: ['Seite 3: Der „Dienstag“ zeigt oft mehr über Bedürfnisse (Ruhe, eigene Tür, bestimmte Menschen) als über Berufe.', 'Seite 4: Die Karte „An mich in fünf Jahren“ kann im Logbuch oder bei Ihnen aufbewahrt werden.', 'Praktische Schritte (Bewerbung, Termine) gehören in eine eigene Stunde.'],
    achtung: 'Sätze wie „Ich werde eh nicht alt“ oder „Für mich gibt es kein Später“ sind keine Coolness, sondern ein Warnsignal: ruhig und direkt nach Suizidgedanken fragen und nach dem Verfahren der Einrichtung handeln. Offene Verfahren, Schulden oder ein unsicherer Aufenthalt begrenzen Pläne tatsächlich – das ehrlich benennen, statt es wegzureden, und klären, wer dabei hilft.',
    hintergrund: 'Konkrete Vorstellungen vom eigenen späteren Leben, verbunden mit nächsten Schritten, verbessern Schulbindung und Verhalten (Oyserman et al.). Menschen erleben ihr zukünftiges Selbst ähnlich wie eine fremde Person; je vertrauter es wird, desto eher handeln sie vorausschauend (Hershfield). In Langzeitstudien entwickelte sich die Mehrheit auch stark belasteter Kinder zu stabilen Erwachsenen, häufig nach Wendepunkten wie einer verlässlichen Bezugsperson oder einer Arbeit (Werner & Smith; Sampson & Laub). Hoffnung besteht aus Zielen, Wegen und dem Zutrauen, sie zu gehen (Snyder).',
    quellen: 'Oyserman, Bybee & Terry (2006) · Hershfield (2011) · Werner & Smith (1992) · Sampson & Laub (1993) · Snyder (2002).',
  },
}
export default d
