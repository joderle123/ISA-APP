// SOLO #11 · ANGST – Angst und Panik in der Einzelarbeit: Was machst du nicht, weil die Angst es nicht erlaubt?
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's11', nr: '11', datei: 'Solo-11-Angst', reihe: 'Thema',
  thema: 'Angst', headline: 'Was machst du nicht, weil sie es nicht erlaubt?', farbe: '#4D94FF', stand: 'November 2026',
  bild: 'peep:tom:aengstlich', sticker: 'In kleinen Stufen',
  seiten: [
    {
      titel: 'Angst', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Du brauchst keine Angst zu haben.“ Danke. Das wusste der Kopf vorher schon. Dem Körper war es egal.',
          'Angst erkennt man bei den meisten nicht am Zittern. Man erkennt sie an den **Umwegen**: am Bus, der nicht genommen wird, am Fach, in dem man fehlt, an „keine Lust“, wo eigentlich „trau mich nicht“ steht. Um diese Umwege geht es hier.',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Du brauchst keine Angst zu haben.“', '„Stell dich nicht so an.“', '„Da ist doch nichts.“', '„Denk an etwas Schönes.“', '„Augen zu und durch.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So oft bestimmt Angst, was ich mache', 'So gut kann ich sie verstecken'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Wie Angst wächst – und was sie kleiner macht', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:tom:aengstlich', name: 'Tom, 14',
          text: 'Tom steht an der Haltestelle. Der Bus kommt, Tom steigt nicht ein. Drinnen sitzen zu viele, die schauen könnten. Sein Herz rast, die Hände kribbeln, er bekommt schlecht Luft. Er geht zu Fuß, vierzig Minuten, und kommt zu spät. „Verschlafen“, sagt er. Am nächsten Tag ist der Bus noch ein bisschen größer geworden.',
          frage: 'Warum ist der Bus am nächsten Tag größer?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Falscher Alarm, echter Körper', x: 'Herzrasen, Schwindel, keine Luft: Panik fühlt sich an wie Sterben. **Sie ist ungefährlich** und klingt nach einigen Minuten von selbst ab.' },
          { t: 'Ausweichen füttert sie', x: 'Jeder Umweg sagt dem Gehirn: „Das war wirklich gefährlich.“ **Die Erleichterung ist echt. Der Preis kommt später.**' },
          { t: 'Bleiben lässt sie fallen', x: 'Wer in der Lage bleibt, erlebt: Die Angst steigt – und sinkt dann **von allein**. Das lässt sich in kleinen Stufen üben.' },
        ] },
        { art: 'clip', clip: { titel: 'Wie Angst dein Leben beeinflusst – und was du dagegen tun kannst', kanal: 'Quarks Dimension Ralph', url: YT + 'ZSPEJVzsovo', dauer: 'die ersten 6 Min.', frage: 'Wann schützt Angst – und ab wann sperrt sie ein?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was machst du ==nicht==, weil die Angst es nicht erlaubt?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Erst die Umwege finden. Dann eine Treppe bauen', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Meine Umwege', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Stichworte:', satz: ['Dem gehe ich aus dem Weg:', 'So erkläre ich es den anderen:', 'Das kostet mich der Umweg:'] },
          ] },
        { art: 'fragen', titel: 'Toms Treppe', wie: 'zusammen', zeit: '8 Min.',
          kontext: 'Niemand springt von null auf „ganze Strecke“. Wie viel Angst macht Tom jede Stufe (0–10)?',
          fragen: [
            { f: 'Vom Leichtesten zum Schwersten:', preis: { erste: 'Stufe', kopf: ['Angst 0–10', 'was hilft dabei'], optionen: ['an der Haltestelle bleiben, bis der Bus weg ist', 'einsteigen, eine Station, aussteigen', 'drei Stationen, vorn beim Fahrer', 'die ganze Strecke'] } },
            { f: 'Die erste Stufe meiner eigenen Treppe:', linien: 1 },
          ] },
        { art: 'fragen', titel: 'Auch Erwachsene', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '4 Min.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Davor habe ich Angst', 'Das mache ich deswegen nicht'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Eine Stufe', x: 'Nimm die **kleinste** Sache, der du ausweichst. Mach sie einmal – und bleib, bis die Angst von selbst ein Stück sinkt. Drei Zahlen (0–10): vorher, am höchsten Punkt, am Ende. Wette vorher: Wie hoch geht sie – und wie tief fällt sie?' },
        { art: 'karten', karten: [
          { titel: 'Bei Panik', icon: 'heartbeat', zeilen: ['Das ist Alarm, keine Gefahr.', 'Füße auf den Boden. Lang ausatmen.', 'Nicht weglaufen. Sie geht vorbei.'] },
          { titel: 'Meine Treppe', icon: 'stairs-up', zeilen: ['Von leicht nach schwer:', '_1', '_2', '_3'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Wovor hattest du als Kind Angst, das heute egal ist?', 'Wer in deinem Leben ist mutig – und auf welche Art?'],
          ['Welche Angst kennt keiner von dir?', 'Was hast du schon geschafft, obwohl du Angst hattest?'],
          ['Wovor hast du Angst, weil es schon einmal passiert ist?', 'Was würdest du tun, wenn die Angst morgen weg wäre?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Wozu ist Angst eigentlich da?', o: ['zu nichts', 'zum Schutz vor Gefahr', 'als Strafe', 'zum Angeben'], r: 1, warum: 'Ein Alarmsystem – manchmal zu empfindlich eingestellt.' },
    { f: 'Ist eine Panikattacke gefährlich?', o: ['ja, lebensgefährlich', 'nein, sie fühlt sich nur so an', 'nur nachts', 'nur bei Kindern'], r: 1, warum: 'Der Körper schlägt Alarm, ohne dass Gefahr besteht.' },
    { f: 'Was passiert mit der Angst, wenn man immer ausweicht?', o: ['sie verschwindet', 'sie wird größer', 'sie bleibt gleich', 'sie wird lustig'], r: 1, warum: 'Das Gehirn lernt: Das war gefährlich.' },
    { f: 'Was passiert, wenn man in der Situation bleibt?', o: ['die Angst steigt für immer', 'sie steigt und fällt dann von allein', 'man fällt um', 'nichts'], r: 1, warum: 'Diese Erfahrung macht nur, wer bleibt.' },
    { f: 'Wie übt man am besten gegen eine Angst?', o: ['alles auf einmal', 'in kleinen Stufen von leicht nach schwer', 'gar nicht', 'nur im Kopf'], r: 1, warum: 'Jede geschaffte Stufe macht die nächste kleiner.' },
    { f: 'Woran erkennt man Angst bei anderen oft?', o: ['immer am Zittern', 'an dem, was sie vermeiden', 'an der Kleidung', 'gar nicht'], r: 1, warum: '„Keine Lust“ heißt manchmal „trau mich nicht“.' },
    { f: 'Was bedeutet Mut?', o: ['keine Angst haben', 'es trotz Angst tun', 'laut sein', 'nie nachdenken'], r: 1, warum: 'Ohne Angst bräuchte man keinen Mut.' },
    { f: 'Was hilft dem Körper bei Panik am schnellsten?', o: ['schnell einatmen', 'lang ausatmen', 'die Luft anhalten', 'rennen'], r: 1, warum: 'Langes Ausatmen bremst den Alarm.' },
  ],
  begleitung: {
    fakten: [['Für wen', '12–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Passt zu', 'REAL TALK #03']],
    wann: ['Meidet bestimmte Orte, Fächer, Wege oder Menschen – mit immer neuen Begründungen.', 'Körperliche Beschwerden ohne Befund vor bestimmten Situationen.', 'Panikattacken.', 'Wirkt „unmotiviert“, wo eigentlich Angst vor Bewertung steckt.'],
    ziel: 'Der Jugendliche erkennt seine Umwege als Angst, versteht, warum Ausweichen sie vergrößert, und plant eine erste, wirklich kleine Stufe.',
    anschluss: 'Techniken für den Körper (Atmung, 5-4-3-2-1) stehen in REAL TALK #03.',
    ablauf: [
      ['0–5', 'Logbuch. Seite 1 – die Sprüche. Die zweite Zahl zeigt, wie viel Energie das Verstecken kostet.'],
      ['5–20', 'Der Fall, die Kästen, das Video. Die unbequeme Frage stellen.'],
      ['20–40', '„Meine Umwege“ allein. „Toms Treppe“ gemeinsam – dann die erste eigene Stufe so klein machen, dass sie fast lächerlich wirkt. Das Duell mit Ihrer eigenen Angst.'],
      ['40–50', 'Experiment vereinbaren, wenn möglich mit Begleitung beim ersten Mal. Karten ausschneiden, eine Frage aus den drei Stufen.'],
    ],
    haltung: ['Nicht beruhigen. „Da passiert nichts“ hat der Jugendliche hundertmal gehört – siehe Seite 1.', 'Die Stufe bestimmt er. Eine zu große Stufe bestätigt die Angst.', 'Jeden Versuch würdigen, nicht nur den geschafften.', 'Die eigene Angst im Duell muss echt sein und darf klein sein.'],
    hinweise: ['Seite 3: Die Treppe braucht mindestens vier Stufen. Fehlt eine Zwischenstufe, gemeinsam erfinden.', 'Seite 4: Bleiben heißt nicht aushalten um jeden Preis. Abbrechen ist erlaubt und wird ausgewertet, nicht bewertet.', 'Wiederholung ist wichtiger als Größe: dieselbe Stufe dreimal.'],
    achtung: 'Das Prinzip „bleiben, bis die Angst sinkt“ gilt nur für Situationen, die tatsächlich ungefährlich sind. Angst vor Menschen oder Orten, an denen wirklich etwas passiert ist oder passieren kann (Gewalt, Mobbing, Übergriffe), ist kein falscher Alarm – dort geht es um Schutz, nicht um Übung. Bei Hinweisen auf traumatische Erfahrungen, bei anhaltender Schulvermeidung oder häufigen Panikattacken fachliche Abklärung veranlassen; erste Panikattacken auch ärztlich abklären lassen. Niemals zu einer Stufe drängen.',
    extra: [{ titel: 'Weg mit der Angst: So hat Nane ihre Angst überwunden', kanal: 'Terra Xplore', url: YT + 'UQqLSOPYEjw', dauer: 'Reportage', frage: 'Eine Betroffene zeigt, wie Üben in Stufen aussieht.' }],
    hintergrund: 'Vermeidung hält Angst aufrecht, weil die befürchtete Folge nie überprüft wird (Barlow). Bei Panik werden harmlose Körperempfindungen als bedrohlich gedeutet, was die Erregung weiter steigert (Clark). Gestufte Konfrontation ist der wirksamste Baustein der Behandlung von Ängsten bei Kindern und Jugendlichen; entscheidend ist die neue Erfahrung, dass das Befürchtete ausbleibt (Craske et al.; Kendall & Hedtke).',
    quellen: 'Barlow (2002) · Clark (1986) · Craske et al. (2014) · Kendall & Hedtke (2006).',
  },
}
export default d
