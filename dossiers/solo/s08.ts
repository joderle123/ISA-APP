// SOLO #08 · ALLEIN – Freunde, Einsamkeit, Vertrauen in der Einzelarbeit.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's08', nr: '08', datei: 'Solo-08-Allein', reihe: 'Thema',
  thema: 'Allein', headline: 'Wen rufst du um zwei Uhr nachts an?', farbe: '#2FD3E6', stand: 'November 2026',
  bild: 'peep:amira:traurig', sticker: 'Eine Person reicht',
  seiten: [
    {
      titel: 'Allein', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Geh doch einfach auf die Leute zu.“ Klar. Und wenn es so einfach wäre, hättest du es längst gemacht.',
          'Viele Leute um sich zu haben und trotzdem allein zu sein, ist kein Widerspruch. Es ist ziemlich verbreitet – nur redet keiner darüber, weil es sich wie ein Makel anfühlt. **Ist es nicht. Es ist ein Alarm.** Wie der funktioniert, steht auf der nächsten Seite.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Geh doch einfach auf die Leute zu.“', '„Du musst offener sein.“', '„Such dir einen Verein.“', '„Die sind eh nicht gut für dich.“', '„Echte Freunde erkennt man in der Not.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So allein fühle ich mich gerade', 'So schwer fällt es mir, jemandem zu trauen'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Was Einsamkeit mit dem Kopf macht – und warum sie sich selbst füttert', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:amira:traurig', name: 'Amira, 16',
          text: 'Amira hat 212 Kontakte und niemanden, den sie um zwei Uhr nachts anrufen würde. In der Pause steht sie bei einer Gruppe, lacht an den richtigen Stellen und weiß: Keiner würde merken, wenn sie morgen fehlt. Als Sara fragt: „Kommst du Samstag mit?“, sagt Amira: „Mal sehen.“ Sie will. Aber hingehen und es wird komisch – das wäre schlimmer, als gar nicht gefragt zu werden.',
          frage: 'Wovor schützt sich Amira mit „Mal sehen“?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Ein Alarm wie Hunger', x: 'Einsamkeit ist kein Charakterfehler. Sie ist ein Signal: **Dir fehlt etwas, das Menschen zum Leben brauchen.**' },
          { t: 'Sie macht misstrauisch', x: 'Wer lange allein ist, liest neutrale Gesichter als feindlich und zieht sich zurück. **Der Kopf schützt dich – und sperrt dich ein.**' },
          { t: 'Eine Person reicht', x: 'Du brauchst keine Clique. Der größte Unterschied liegt **zwischen null und einem** Menschen, dem du etwas Echtes erzählen kannst.' },
        ] },
        { art: 'clip', clip: { titel: 'Einsamkeit', kanal: 'Dinge Erklärt – Kurzgesagt', url: YT + 'DwqwRYe6fKA', dauer: 'die ersten 6 Min.', frage: 'An welcher Stelle der Spirale stehst du gerade – wenn überhaupt?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Wen würdest du um ==zwei Uhr nachts== anrufen?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Wer ist wie nah – und wen hättest du gern näher?', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Mein Kreis', wie: 'allein', zeit: '6 Min.',
          kontext: 'Zeichne drei Ringe um einen Punkt – das bist du. **Innen:** Leute, die fast alles wissen dürfen. **Mitte:** Leute, mit denen es gut ist. **Außen:** Leute, die einfach da sind. Anfangsbuchstaben reichen.',
          fragen: [{ f: 'Drei Ringe:', feld: 44 }, { f: 'Wen hätte ich gern einen Ring weiter innen?', linien: 1 }] },
        { art: 'fragen', titel: 'Amiras Samstag', wie: 'zusammen', zeit: '6 Min.',
          fragen: [{ f: 'Rechne durch:', preis: { erste: 'Amira …', kopf: ['kostet sie', 'bringt ihr'], optionen: ['sagt ab', 'geht hin und bleibt eine Stunde', 'schreibt Sara: „Ich komme, bin aber unsicher.“'] } }] },
        { art: 'fragen', titel: 'Wer ist echt?', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Bei diesem Menschen muss ich nichts spielen', 'Daran merke ich, dass es jemand ernst meint', 'Das mache ich, wenn ich mich allein fühle'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Zehn Sekunden mehr', x: 'Bleib diese Woche dreimal **zehn Sekunden länger** in einem Kontakt, als du es sonst tun würdest: eine Frage mehr stellen, eine Nachricht mehr schreiben, einmal nicht als Erster gehen. Wette vorher: Was passiert in diesen zehn Sekunden?' },
        { art: 'karten', karten: [
          { titel: 'Alarm oder Beweis?', icon: 'eye', zeilen: ['Ich denke: „Die wollen mich nicht dabeihaben.“', 'Habe ich einen Beweis – oder ist das der Alarm?', 'Einmal nachfragen kostet weniger als ein Abend grübeln.'] },
          { titel: 'Kleine Schritte', icon: 'stairs-up', zeilen: ['eine Frage stellen', 'etwas von mir erzählen, das kein Geheimnis ist', 'einmal Ja sagen und eine Stunde bleiben'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Mit wem lachst du am meisten?', 'Was macht einen guten Freund aus – in drei Wörtern?'],
          ['Wann hast du dich zuletzt mitten unter Leuten allein gefühlt?', 'Welche Freundschaft ist kaputtgegangen und fehlt dir?'],
          ['Wer hat dich hängen lassen, als es darauf ankam?', 'Was zeigst du niemandem, weil du denkst, dann sind alle weg?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was ist Einsamkeit am ehesten?', o: ['ein Charakterfehler', 'ein Alarmsignal wie Hunger', 'eine Ausrede', 'eine Frage des Alters'], r: 1, warum: 'Sie zeigt, dass etwas Lebenswichtiges fehlt.' },
    { f: 'Kann man unter vielen Leuten einsam sein?', o: ['nein', 'ja', 'nur Erwachsene', 'nur im Netz'], r: 1, warum: 'Es zählt, ob jemand dich wirklich kennt.' },
    { f: 'Was macht lange Einsamkeit mit dem Blick auf andere?', o: ['freundlicher', 'misstrauischer', 'gar nichts', 'genauer'], r: 1, warum: 'Neutrale Gesichter wirken plötzlich feindlich.' },
    { f: 'Was schützt am meisten?', o: ['viele Follower', 'eine große Clique', 'ein Mensch, dem man etwas Echtes erzählen kann', 'beliebt sein'], r: 2, warum: 'Der Sprung von null auf eins ist der größte.' },
    { f: '„Mal sehen“ auf eine Einladung ist oft …', o: ['Desinteresse', 'Schutz vor einer Enttäuschung', 'Unhöflichkeit', 'Zeitmangel'], r: 1, warum: 'Wer nicht hingeht, kann nicht abgelehnt werden.' },
    { f: 'Wie entsteht Nähe am ehesten?', o: ['durch kleine echte Sätze, die mit der Zeit mehr werden', 'durch Geschenke', 'durch gemeinsames Schweigen im Chat', 'von allein'], r: 0, warum: 'Schritt für Schritt – nicht alles auf einmal.' },
    { f: 'Du denkst: „Die mögen mich nicht.“ Was ist das zuerst?', o: ['eine Tatsache', 'ein Gedanke, den man prüfen kann', 'ein Beweis', 'ein Urteil'], r: 1, warum: 'Alarm oder Beweis? Nachfragen klärt es.' },
    { f: 'Wer ist auch ein Teil deines Netzes?', o: ['nur Gleichaltrige', 'auch Erwachsene, Tiere und Leute aus dem Netz', 'nur Familie', 'niemand'], r: 1, warum: 'Verlässlichkeit zählt, nicht die Sorte Mensch.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'SOLO #01 (Dein Team)']],
    wann: ['Steht am Rand, wirkt angepasst oder unsichtbar.', 'Viele oberflächliche Kontakte, niemand Vertrautes.', 'Nach einem Wechsel: neue Gruppe, neue Schule, Freundschaft zerbrochen.', 'Sucht Nähe fast nur noch im Netz.'],
    ziel: 'Der Jugendliche versteht seinen Rückzug als Schutz, der inzwischen mehr kostet als bringt – und probiert einen einzigen kleinen Schritt auf jemanden zu.',
    anschluss: 'Die Team-Karte aus SOLO #01 daneben legen: Was hat sich verändert?',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1 – die Sprüche ankreuzen lassen.'],
      ['5–20', 'Der Fall, die Kästen, das Video. Die unbequeme Frage stellen; „niemanden“ ist eine Antwort, die Sie ruhig aushalten müssen.'],
      ['20–40', '„Mein Kreis“ allein, „Amiras Samstag“ gemeinsam, dann das Duell mit Ihren eigenen Antworten.'],
      ['40–50', 'Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Nicht trösten und nichts versprechen („Du findest sicher Freunde“).', 'Freunde, die Sie für ungünstig halten, nicht abwerten. Loyalität ist eine Stärke; fragen Sie, was der Jugendliche dort bekommt.', 'Sie selbst stehen vermutlich in einem der Ringe. Das nicht ansprechen – er entscheidet, wo.', 'Ein leerer innerer Ring ist kein Versagen, sondern der Auftrag der nächsten Monate.'],
    hinweise: ['Seite 3: Das Feld bleibt beim Jugendlichen; Namen nicht abfragen.', 'Seite 4: „Zehn Sekunden mehr“ funktioniert auch in der Wohngruppe und im Chat.', 'Bei vielen Beziehungsabbrüchen (Einrichtungswechsel) ist Misstrauen eine vernünftige Erfahrung, kein Symptom.'],
    achtung: 'Einsamkeit ist ein Risikofaktor für depressive Krisen und Suizidgedanken – bei Sätzen wie „Mich würde eh keiner vermissen“ ruhig und direkt nachfragen und nach dem Verfahren der Einrichtung handeln. Kontakte im Netz ernst nehmen, aber prüfen: Erwachsene, die sehr schnell sehr nah werden, Geschenke machen oder Geheimhaltung verlangen, sind ein Grund, die zuständige Leitung (Responsable) einzubeziehen.',
    hintergrund: 'Das Bedürfnis nach Zugehörigkeit ist ein Grundbedürfnis (Baumeister & Leary). Einsamkeit wirkt als Warnsignal und erhöht die Wachsamkeit für soziale Bedrohung, was Rückzug verstärkt (Cacioppo & Hawkley). Die Qualität enger Freundschaften in der Jugend sagt die spätere psychische Gesundheit besser voraus als Beliebtheit (Narr et al.). Eine einzige verlässliche Bezugsperson ist der am besten belegte Schutzfaktor (Masten).',
    quellen: 'Baumeister & Leary (1995) · Cacioppo & Hawkley (2009) · Narr et al. (2019) · Masten (2014).',
  },
}
export default d
