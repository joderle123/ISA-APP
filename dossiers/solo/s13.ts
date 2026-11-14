// SOLO #13 · ZUHAUSE – Familie, Loyalität, Besuchstage in der Einzelarbeit. Ohne Video (kein passendes gefunden).
import type { Solo } from '../solo-typen'

const d: Solo = {
  id: 's13', nr: '13', datei: 'Solo-13-Zuhause', reihe: 'Thema',
  thema: 'Zuhause', headline: 'Beides stimmt gleichzeitig.', farbe: '#C6F02C', stand: 'November 2026',
  bild: 'peep:jana:traurig', sticker: 'Beides stimmt',
  seiten: [
    {
      titel: 'Zuhause', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Es sind trotzdem deine Eltern.“ Als hättest du das vergessen. Als wäre genau das nicht das Problem.',
          'Über Familie reden ist schwer, weil sofort jemand Partei ergreift: für deine Eltern oder gegen sie. **Hier macht das keiner.** Du darfst sie verteidigen und trotzdem sagen, was war. Beides stimmt gleichzeitig.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Es sind trotzdem deine Eltern.“', '„Die haben es auch nicht leicht.“', '„Du musst ihnen verzeihen.“', '„Irgendwann verstehst du das.“', '„Familie ist das Wichtigste.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So viel Platz nimmt Zuhause in meinem Kopf ein', 'So ungern rede ich darüber'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Drei Dinge über Familie, die selten jemand ausspricht', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:jana:traurig', name: 'Jana, 15',
          text: 'Samstag ist Besuchstag. Janas Mutter hat versprochen zu kommen. Um zwei ist sie nicht da, um drei auch nicht. Um vier kommt eine Nachricht: „Schaff es heute nicht, Schatz. Nächstes Mal sicher.“ Jana schreibt: „Kein Problem.“ Dann streitet sie mit der Erzieherin wegen eines Joghurts. Am Abend sagt ein Mädchen: „Deine Mutter ist echt das Letzte.“ Jana geht auf sie los.',
          frage: 'Wie kann Jana enttäuscht sein und ihre Mutter trotzdem verteidigen?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Beides geht zusammen', x: 'Du kannst jemanden lieben und wütend auf ihn sein. **Du kannst jemanden vermissen, der dir wehgetan hat.** Das ist kein Widerspruch.' },
          { t: 'Nicht deine Aufgabe', x: 'Eltern trösten, Streit schlichten, auf Geschwister aufpassen: Viele Kinder übernehmen das. **Es macht stark. Und sehr müde.**' },
          { t: 'Kein Schicksal', x: 'Was sich in Familien wiederholt, wiederholt sich nicht von selbst. **Die meisten, die es schwer hatten, machen es später anders.**' },
        ] },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was hast du zu Hause übernommen, das ==nicht deine Aufgabe== war?', linien: 2 },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Du entscheidest, was auf dem Blatt steht – und ob es jemand liest', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Beides stimmt', wie: 'allein', zeit: '6 Min.',
          fragen: [{ f: 'Vier Sätze, keiner hebt den anderen auf:', satz: ['An meiner Familie mag ich:', 'An meiner Familie macht mich fertig:', 'Das vermisse ich:', 'Das vermisse ich kein bisschen:'] }] },
        { art: 'fragen', titel: 'Mitnehmen oder dalassen', wie: 'allein', zeit: '5 Min.',
          kontext: 'Du hast zu Hause mehr gelernt als in jeder Schule. Manches davon willst du behalten.',
          fragen: [{ f: 'Wie es bei uns läuft:', raster: { spalten: ['nehme ich mit', 'lasse ich da', 'weiß nicht'], zeilen: ['wie gestritten wird', 'wie man sich entschuldigt – oder nicht', 'wie über Gefühle geredet wird', 'wie man zusammenhält', 'wie gefeiert wird'] } }] },
        { art: 'fragen', titel: 'Von zu Hause', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Das habe ich von zu Hause, und es ist gut', 'Das mache ich anders als meine Eltern', 'Ein Satz von zu Hause, den ich nie sagen will'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Einmal anders', x: 'Nimm eine Sache aus der Spalte „lasse ich da“. Mach sie diese Woche **einmal bewusst anders**, als du es zu Hause gelernt hast – beim Streiten, beim Entschuldigen, beim Reden. Wette vorher: Wie fühlt sich das an – falsch, fremd oder gut?' },
        { art: 'karten', karten: [
          { titel: 'Beides stimmt', icon: 'home-heart', zeilen: ['Ich kann jemanden lieben und wütend auf ihn sein.', 'Ich kann jemanden vermissen, der mir wehgetan hat.', 'Keines der Gefühle ist falsch.'] },
          { titel: 'Nicht meine Aufgabe', icon: 'arrow-back-up', zeilen: ['Eltern trösten.', 'Streit schlichten.', 'Erwachsene beschützen.'], eigen: 'Meine Aufgabe:' },
        ] },
        { art: 'tiefe', fragen: [
          ['Was gab es bei euch immer zu essen?', 'Wer in deiner Familie ist dir am ähnlichsten?'],
          ['Was hättest du als Kind gebraucht, das keiner gemerkt hat?', 'Worüber wird in deiner Familie nicht geredet?'],
          ['Wem bist du treu, obwohl es dich etwas kostet?', 'Was würdest du deinen Eltern sagen, wenn sie wirklich zuhören würden?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Kann man jemanden lieben und gleichzeitig wütend auf ihn sein?', o: ['nein', 'ja', 'nur kurz', 'nur Erwachsene'], r: 1, warum: 'Gemischte Gefühle sind bei Familie die Regel.' },
    { f: 'Ein Kind tröstet ständig seine Mutter. Das ist …', o: ['seine Aufgabe', 'eine Aufgabe, die Erwachsenen gehört', 'egal', 'ein Hobby'], r: 1, warum: 'Es macht stark – und kostet die eigene Kindheit.' },
    { f: 'Wer es zu Hause schwer hatte, macht es später …', o: ['immer genauso', 'meistens anders', 'immer schlimmer', 'gar nicht'], r: 1, warum: 'Muster wiederholen sich nicht von selbst.' },
    { f: 'Warum verteidigen viele ihre Eltern, auch wenn es schwer war?', o: ['aus Dummheit', 'aus Treue – sie gehören zu einem', 'weil sie lügen', 'aus Langeweile'], r: 1, warum: 'Wer die Eltern angreift, greift ein Stück von einem selbst an.' },
    { f: 'Muss man verzeihen, um weiterzukommen?', o: ['ja, sofort', 'nein – das entscheidet jeder selbst und in seinem Tempo', 'ja, immer', 'nur an Feiertagen'], r: 1, warum: 'Verzeihen auf Befehl funktioniert nicht.' },
    { f: 'Ist ein Kind schuld, wenn Eltern sich trennen oder nicht kommen?', o: ['ja', 'nein', 'manchmal', 'zur Hälfte'], r: 1, warum: 'Das sind Entscheidungen von Erwachsenen.' },
    { f: 'Was darf man von zu Hause mitnehmen?', o: ['alles oder nichts', 'das Gute – und den Rest dalassen', 'nur Geld', 'nichts'], r: 1, warum: 'Man muss nicht die ganze Kiste nehmen.' },
    { f: 'Jemand vermisst einen Menschen, der ihm wehgetan hat. Das ist …', o: ['verrückt', 'verständlich', 'verboten', 'gelogen'], r: 1, warum: 'Vermissen und Verletztsein schließen sich nicht aus.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere'], ['Passt zu', 'SOLO #01 (Dein Team)']],
    wann: ['Nach enttäuschenden Besuchstagen, abgesagten Kontakten, Wochenenden zu Hause.', 'Der Jugendliche schwankt zwischen Idealisieren und Abwerten der Eltern.', 'Er trägt erkennbar Verantwortung für Eltern oder Geschwister.', 'Vor einer Rückkehr nach Hause oder einer Entscheidung über den Wohnort.'],
    ziel: 'Der Jugendliche darf gemischte Gefühle gegenüber seiner Familie haben und aussprechen, ohne dass jemand Partei ergreift – und unterscheidet, was er von zu Hause mitnehmen will.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1 – die Sprüche. Ausdrücklich sagen: „Ich mache deine Eltern nicht schlecht und nicht gut.“'],
      ['5–20', 'Der Fall. Warum geht Jana auf das Mädchen los? Dann die drei Kästen. Die unbequeme Frage – mit Platz zum Schreiben statt Reden.'],
      ['20–40', '„Beides stimmt“ und „Mitnehmen oder dalassen“ allein. Fragen, ob Sie etwas davon lesen dürfen. Dann das Duell mit Ihren eigenen Antworten.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Nie über die Eltern urteilen – auch nicht zustimmend, wenn der Jugendliche schimpft. Morgen verteidigt er sie wieder.', 'Treue zur Familie ist eine Stärke. Fragen Sie, was sie ihn kostet, nicht, ob sie berechtigt ist.', 'Schreiben lassen, wo Reden zu viel ist. Nicht alles muss gesagt werden.', 'Im Duell von der eigenen Herkunft erzählen, ohne sie als Vergleich anzubieten.'],
    hinweise: ['Dieses Heft hat kein Video; ein passendes wurde nicht gefunden.', 'Seite 3: „weiß nicht“ ist die ehrlichste Spalte. Nicht zur Entscheidung drängen.', 'Seite 4: Das Experiment findet beim Jugendlichen selbst statt, nicht in der Familie. Keine Aufträge für Gespräche mit den Eltern erteilen.'],
    achtung: 'Schildert der Jugendliche aktuelle Gewalt, Vernachlässigung oder Übergriffe zu Hause – bei sich oder bei Geschwistern –, gilt das Verfahren der Einrichtung zum Kinderschutz; die zuständige Leitung (Responsable) sofort einbeziehen und dem Jugendlichen vorher sagen, was Sie tun. Nicht nachbohren, wenn er abbricht. Nach dieser Stunde kann die Stimmung kippen: das Team informieren, dass das Thema bewegt wurde, ohne Inhalte weiterzugeben.',
    hintergrund: 'Kinder bleiben ihren Eltern auch unter belastenden Umständen verbunden; diese Bindung anzugreifen verstärkt meist die Loyalität und den inneren Konflikt (Boszormenyi-Nagy & Spark; Bowlby). Die Übernahme elterlicher Aufgaben durch Kinder ist verbreitet und mit späterer Erschöpfung und Schuldgefühlen verbunden (Hooper). Die Weitergabe belastender Muster an die nächste Generation ist ein Risiko, aber nicht die Regel (Kaufman & Zigler). Verlässliche Beziehungen außerhalb der Familie wirken schützend (Masten).',
    quellen: 'Boszormenyi-Nagy & Spark (1973) · Bowlby (1988) · Hooper (2007) · Kaufman & Zigler (1987) · Masten (2014).',
  },
}
export default d
