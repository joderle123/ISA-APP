// SOLO #10 · NULL BOCK – Schule, Arbeit, Aufschieben in der Einzelarbeit: Wovor schützt „mir egal“?
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's10', nr: '10', datei: 'Solo-10-Null-Bock', reihe: 'Thema',
  thema: 'Null Bock', headline: 'Wovor schützt dich „mir egal“?', farbe: '#FFB21A', stand: 'November 2026',
  bild: 'peep:lio:gelangweilt:egal', sticker: 'Fünf Minuten',
  seiten: [
    {
      titel: 'Null Bock', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Du könntest, wenn du wolltest.“ Diesen Satz hast du so oft gehört, dass er Teil der Tapete ist. Er stimmt sogar. Er hilft nur keinem.',
          'Wer nichts macht, ist selten faul. Meistens ist „mir egal“ **die sicherste Art, nicht zu scheitern**. Was dahintersteckt – und warum Lust fast nie vorher da ist –, steht auf der nächsten Seite.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Du könntest, wenn du wolltest.“', '„Ohne Abschluss wird nichts aus dir.“', '„Setz dich einfach mal hin.“', '„Streng dich mehr an.“', '„Andere schaffen das doch auch.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So wenig Bock habe ich gerade', 'So sehr nervt mich das selbst'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Warum Aufschieben nichts mit Faulheit zu tun hat', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:lio:gelangweilt', name: 'Lio, 14',
          text: 'Lio hat seit drei Wochen ein Referat auf. Jeden Abend nimmt er es sich vor. Jeden Abend ist etwas anderes: erst essen, erst das Video, erst aufräumen – Lio räumt sonst nie auf. Am Abend davor sagt er: „Ist mir eh egal.“ Am Morgen ist ihm schlecht. Er bleibt zu Hause. Die Lehrerin schreibt: „Kein Interesse.“ Das Gegenteil stimmt. Es war ihm so wichtig, dass er es nicht anfassen konnte.',
          frage: 'Wovor hat sich Lio mit „egal“ geschützt?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Kein Zeitproblem', x: 'Du schiebst nicht die Aufgabe weg. **Du schiebst das Gefühl weg, das sie auslöst:** Angst zu versagen, Überforderung, Langeweile.' },
          { t: 'Egal schützt', x: 'Wer es nicht versucht, kann nicht scheitern. **„Ich wollte ja gar nicht“ tut weniger weh als „Ich konnte nicht“.**' },
          { t: 'Lust kommt danach', x: 'Auf Motivation zu warten, klappt selten. **Sie kommt meistens erst, wenn du schon fünf Minuten dran bist.**' },
        ] },
        { art: 'clip', clip: { titel: 'Prokrastination – Warum schieben wir so viel auf?', kanal: 'Quarks Dimension Ralph', url: YT + 'QNyKtYJ-e7Y', dauer: 'die ersten 5 Min.', frage: 'Welcher Grund aus dem Video ist deiner?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was wäre das ==Schlimmste==, wenn du es wirklich versuchst – und es reicht nicht?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Erst sortieren: Kann ich nicht, will ich nicht – oder trau ich mich nicht?', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Drei Sorten Nein', wie: 'allein', zeit: '5 Min.',
          kontext: 'Von außen sieht alles gleich aus: Er macht es nicht. Von innen sind es drei verschiedene Dinge.',
          fragen: [{ f: 'Ein Kreuz pro Zeile – oder keins, wenn es läuft:', raster: { spalten: ['kann ich nicht', 'will ich nicht', 'trau ich mich nicht'], zeilen: ['pünktlich da sein', 'nachfragen, wenn ich etwas nicht verstehe', 'mit einer Aufgabe anfangen', 'vor anderen etwas sagen', 'für eine Arbeit lernen', 'um Hilfe bitten'] } }] },
        { art: 'fragen', titel: 'Lios Abend', wie: 'zusammen', zeit: '6 Min.',
          fragen: [{ f: 'Es ist der Abend davor. Rechne durch:', preis: { erste: 'Lio …', kopf: ['kostet ihn', 'bringt ihm'], optionen: ['bleibt morgen zu Hause', 'macht fünf Minuten und hört dann auf', 'sagt der Lehrerin: „Ich kriege es nicht hin.“'] } }] },
        { art: 'fragen', titel: 'Der Stapel', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Das schiebe ich gerade vor mir her', 'Seit wann', 'Das Gefühl, das ich damit vermeide'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Fünf Minuten', x: 'Nimm die eine Sache, die du am meisten schiebst. Mach **genau fünf Minuten** – mit Wecker. Danach darfst du aufhören, ohne schlechtes Gewissen. Dreimal diese Woche. Wette vorher: Wie oft hörst du nach fünf Minuten wirklich auf?' },
        { art: 'karten', karten: [
          { titel: 'Fünf-Minuten-Deal', icon: 'alarm', zeilen: ['Wecker auf fünf Minuten.', 'Nur anfangen. Nicht fertig werden.', 'Klingelt es: Aufhören ist erlaubt.'] },
          { titel: 'Kann, will, trau', icon: 'list-check', zeilen: ['Kann ich es nicht? **Hilfe holen.**', 'Will ich es nicht? **Wozu wäre es gut?**', 'Trau ich mich nicht? **Was wäre das Schlimmste?**'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Welches Fach war das letzte, das du mochtest – und warum?', 'Was lernst du freiwillig, ohne dass es jemand verlangt?'],
          ['Wann hast du dich zuletzt richtig angestrengt – und wie ging es aus?', 'Welcher Satz eines Lehrers sitzt bis heute?'],
          ['Wem würdest du etwas beweisen, wenn du es schaffst?', 'Wem würdest du recht geben, wenn du scheiterst?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was schiebt man beim Aufschieben eigentlich weg?', o: ['die Zeit', 'das unangenehme Gefühl', 'den Stift', 'die Lehrerin'], r: 1, warum: 'Angst, Überforderung, Langeweile – nicht die Aufgabe selbst.' },
    { f: 'Wann kommt Motivation meistens?', o: ['vorher, wenn man lange wartet', 'nach dem Anfangen', 'am Wochenende', 'nie'], r: 1, warum: 'Erst tun, dann Lust – nicht umgekehrt.' },
    { f: '„Mir egal“ bedeutet oft …', o: ['wirklich egal', 'zu wichtig, um zu scheitern', 'Müdigkeit', 'Hunger'], r: 1, warum: 'Wer es nicht versucht, kann nicht versagen.' },
    { f: 'Was hilft am ehesten beim Anfangen?', o: ['auf Lust warten', 'ein sehr kleiner erster Schritt', 'sich beschimpfen', 'alles auf einmal planen'], r: 1, warum: 'Fünf Minuten sind leichter als „das Referat“.' },
    { f: 'Jemand macht eine Aufgabe nicht. Woran kann es liegen?', o: ['nur an Faulheit', 'an Können, Wollen oder Trauen', 'nur am Handy', 'an der Uhrzeit'], r: 1, warum: 'Drei verschiedene Gründe brauchen drei verschiedene Lösungen.' },
    { f: 'Hilft es, sich fürs Aufschieben fertigzumachen?', o: ['ja, das spornt an', 'nein, es macht das nächste Mal schwerer', 'nur bei Mathe', 'manchmal'], r: 1, warum: 'Mehr mieses Gefühl heißt mehr Ausweichen.' },
    { f: 'Warum fühlt sich Aufschieben kurz gut an?', o: ['weil die Aufgabe weg ist', 'weil das miese Gefühl kurz weg ist', 'weil man klüger wird', 'gar nicht'], r: 1, warum: 'Die Erleichterung ist echt – und hält nicht.' },
    { f: 'Was ist bei Überforderung der klügste Satz?', o: ['„Ist mir egal.“', '„Ich kriege es nicht hin – ich brauche Hilfe.“', '„Mach ich morgen.“', 'gar keiner'], r: 1, warum: 'Der teuerste Satz im Moment, der billigste auf Dauer.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Wecker, Gerät fürs Video'], ['Passt zu', 'REAL TALK #04']],
    wann: ['Verweigert Aufgaben oder gibt nichts ab; wirkt gleichgültig.', 'Fehlt häufig, verschläft, hat „Bauchweh“ vor bestimmten Tagen.', 'Hohe Fähigkeiten, wenig Ergebnis.', 'Vor einem Wechsel: Praktikum, neue Schule, Lehrstelle.'],
    ziel: 'Der Jugendliche unterscheidet bei sich selbst zwischen „kann nicht“, „will nicht“ und „trau mich nicht“ – und erlebt mit einem Fünf-Minuten-Versuch, dass Anfangen möglich ist.',
    anschluss: 'Sätze wie „Ich bin halt dumm“ prüft REAL TALK #04; die Stimme dahinter SOLO #07.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1: Wenn „Du könntest, wenn du wolltest“ angekreuzt ist – den Satz in dieser Stunde nicht sagen, auch nicht umformuliert.'],
      ['5–20', 'Der Fall. Die Auflösung (so wichtig, dass er es nicht anfassen konnte) erst nach den eigenen Vermutungen. Dann die Kästen und das Video.'],
      ['20–40', '„Drei Sorten Nein“ allein. „Lios Abend“ gemeinsam. Dann das Duell mit Ihrem eigenen Stapel.'],
      ['40–50', 'Fünf Minuten **jetzt** ausprobieren, wenn eine echte Aufgabe da ist. Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Nicht motivieren. Jede Aufmunterung bestätigt, dass der Erwachsene das Problem nicht verstanden hat.', 'Die Spalte „kann ich nicht“ ernst nehmen: Dahinter stehen oft echte Lücken oder nie erkannte Lernschwierigkeiten.', '„Will ich nicht“ ist erlaubt. Dann lautet die Frage: Was willst du stattdessen?', 'Im Duell den eigenen Stapel zeigen – auch das Gefühl dazu.'],
    hinweise: ['Seite 3: Die Tabelle zeigt, wo Hilfe (kann nicht), Sinn (will nicht) oder Mut (trau nicht) fehlt. Daraus ergibt sich der nächste Schritt.', 'Seite 4: Der Fünf-Minuten-Deal gilt wörtlich. Wer nach fünf Minuten aufhört, hat das Experiment bestanden.', 'Mit der Schule oder dem Betrieb nur sprechen, wenn der Jugendliche es weiß und einverstanden ist.'],
    achtung: 'Schulvermeidung hat häufig Gründe, die mit Motivation nichts zu tun haben: Angst, Mobbing, depressive Verstimmung, Schlafmangel, Sorgen um die Lage zu Hause. Bei wochenlangem Fehlen, körperlichen Beschwerden vor der Schule oder Hinweisen auf Lern- und Aufmerksamkeitsstörungen fachliche Abklärung anregen. Druck und Strafen verschlimmern Vermeidung fast immer.',
    hintergrund: 'Aufschieben dient der kurzfristigen Stimmungsregulation: Vermieden wird nicht die Aufgabe, sondern das unangenehme Gefühl, das sie auslöst (Sirois & Pychyl). Gezeigte Gleichgültigkeit schützt den Selbstwert, weil Scheitern ohne Anstrengung weniger über die eigenen Fähigkeiten aussagt (Covington). Handeln vor der Stimmung ist das Prinzip der Verhaltensaktivierung (Martell et al.). Kleine, konkrete Pläne erleichtern den Beginn (Gollwitzer). Schulvermeidung erfüllt meist eine von wenigen Funktionen, vor allem das Vermeiden von Angst und Bewertung (Kearney).',
    quellen: 'Sirois & Pychyl (2013) · Covington (1992) · Martell, Dimidjian & Herman-Dunn (2010) · Gollwitzer (1999) · Kearney (2008).',
  },
}
export default d
