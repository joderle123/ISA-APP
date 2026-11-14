// SOLO AKTION #11 · ANGST – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s11'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a11', nr: '11', datei: 'Solo-11-Angst-Aktion', thema: 'Angst', headline: 'Acht Aktionen. In kleinen Stufen.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:tom:aengstlich', sticker: 'Kleine Stufen',
  start: ['„Du brauchst keine Angst zu haben“ hilft nicht. Dem Körper ist das egal.', '**Hier probierst du aus, was die Angst kleiner macht.** Du wählst jede Stufe selbst.'],
  aktionen: [
    {
      titel: 'Alarm im Körper', icon: 'body-scan', zeit: '10 Min.', wer: 'beide', material: 'zwei dicke Stifte',
      schritte: [
        'Denk an einen Moment, in dem du Angst hattest. Ein kleiner reicht.',
        'Mal in die Figur: **Wo** hast du sie gespürt?',
        'Kreuz an, was dazu passt.',
        'Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur.',
      ],
      zonen: [{ art: 'koerper', woerter: ['Herz rast', 'Hände kribbeln', 'schlecht Luft', 'Bauch dreht sich', 'Zittern', 'Schwitzen', 'weiche Knie', 'Kopf ist leer'] }],
      aha: 'Das ist Alarm. **Er fühlt sich gefährlich an – er ist es nicht.**',
      ziel: 'Die eigenen Körperzeichen von Angst kennen.',
      tipp: 'Nicht fragen, an welchen Moment er denkt. Eigene Zeichen ehrlich einmalen.',
    },
    {
      titel: 'Echt oder falsch?', icon: 'alert-triangle', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: ['Dein Gegenüber liest eine Lage vor.', 'Beide zeigen gleichzeitig: Faust = **echte Gefahr.** Flache Hand = **falscher Alarm.**', 'Kreuz an.', 'Bei verschiedenen Antworten sagt jeder einen Satz.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Die Lage:', raster: { spalten: ['echte Gefahr', 'falscher Alarm'], zeilen: ['Ein Auto fährt auf dich zu.', 'Du sollst vor der Klasse etwas sagen.', 'Jemand bedroht dich.', 'Der Bus ist voll.', 'Du musst jemanden anrufen.', 'Ein Hund knurrt und kommt näher.', 'Du gehst in einen Raum voller Leute.'] } }] }],
      aha: 'Bei echter Gefahr ist Weggehen klug. **Bei falschem Alarm macht jeder Umweg die Angst größer.**',
      ziel: 'Echte Gefahr und falschen Alarm unterscheiden.',
      tipp: 'Sagt der Jugendliche bei „Bus“ oder „Raum voller Leute“ echte Gefahr: nicht korrigieren, fragen, was dort passieren kann. Siehe Achtung.',
    },
    {
      titel: 'Tom und der Bus', bild: 'peep:tom:aengstlich', icon: 'bus', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Toms Morgen an.', 'Kreuz an: Warum ist der Bus am nächsten Tag größer?', 'Kreis ein: Kennst du so einen Umweg?'],
      zonen: [
        { art: 'comic', bilder: [['bus', 'Der Bus kommt. Tom steigt nicht ein.'], ['heartbeat', 'Sein Herz rast. Die Hände kribbeln.'], ['walk', 'Er geht zu Fuß. 40 Minuten. „Verschlafen“, sagt er.'], ['arrows-maximize', 'Am nächsten Tag ist der Bus noch ein bisschen größer.']] },
        { art: 'fragen', fragen: [{ f: 'Der Bus ist größer, weil:', unter: true, kreuz: ['Der Umweg sagt dem Kopf: Das war gefährlich.', 'Der Bus wirklich größer ist.', 'Tom faul ist.'] }, { f: 'Kenne ich so einen Umweg?', kreis: ['ja', 'vielleicht', 'nein'] }] },
      ],
      aha: 'Die Erleichterung ist echt. **Der Preis kommt am nächsten Tag.**',
      ziel: 'Verstehen, wie Ausweichen die Angst füttert.',
      tipp: 'Nicht nach dem eigenen Umweg fragen – das Kreuz reicht.',
    },
    {
      titel: 'Dreimal dasselbe', icon: 'repeat', zeit: '12 Min.', wer: 'beide', material: 'Uhr mit Sekunden',
      schritte: [
        'Sucht euch **eine** unangenehme Sache aus: 20 Sekunden Blickkontakt. Oder: im Flur laut bis 20 zählen.',
        'Macht sie. Schreibt auf: Wie unwohl war es? 0 bis 10.',
        'Macht sie **noch zweimal.** Jedes Mal eine Zahl.',
        'Schaut auf die drei Zahlen.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['Unwohl 0–10', 'Runde 1', 'Runde 2', 'Runde 3'], zeilen: ['Du', 'Dein Gegenüber'] }],
      aha: 'Beim dritten Mal ist es kleiner. **So funktioniert Angst: Wer bleibt, gewöhnt sich.**',
      ziel: 'Gewöhnung am eigenen Leib messen.',
      tipp: 'Der Jugendliche wählt die Sache. Blickkontakt nur, wenn er ihn wählt. Selbst mitmachen und ehrliche Zahlen sagen.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Wann schützt Angst – und wann sperrt sie ein?') },
        { art: 'daumen', saetze: ['Angst schützt mich manchmal.', 'Angst hält mich von Sachen ab, die ich will.', 'Ich kann sie gut verstecken.', 'Andere haben weniger Angst als ich.'] },
      ],
      aha: 'Angst ist ein Alarmsystem. **Manchmal ist es zu empfindlich eingestellt.**',
      ziel: 'Angst als nützliches, aber übereifriges System sehen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Toms Treppe', bild: 'peep:tom:neutral', icon: 'stairs-up', zeit: '10 Min.', wer: 'zusammen', material: 'Stift',
      schritte: [
        'Niemand springt von null auf „ganze Strecke“.',
        'Erstes Kästchen: Welche Stufe kommt zuerst? Schreib **1 bis 5.**',
        'Zweites Kästchen: Wie viel Angst macht sie Tom? **0 bis 10.**',
        'Dann: Was wäre **deine** erste Stufe? Sagen reicht.',
      ],
      zonen: [{ art: 'werte', kopf: ['Platz 1–5', 'Angst 0–10'], von: 'keine Angst', bis: 'sehr viel', zeilen: ['die ganze Strecke im vollen Bus', 'an die offene Bustür treten und hineinschauen', 'drei Stationen, vorn beim Fahrer', 'einsteigen, eine Station, aussteigen', 'die ganze Strecke, früh am Morgen'] }],
      aha: 'Du wählst die Stufe. **Und sie darf klein sein.**',
      ziel: 'Eine Angst-Treppe bauen können.',
      tipp: 'Die Reihenfolge ist Ansichtssache. Wichtig: Die erste Stufe muss fast lächerlich klein sein.',
    },
    {
      titel: 'Der Panik-Plan', icon: 'heartbeat', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Übt den Plan **jetzt** – in Ruhe. Dann sitzt er, wenn du ihn brauchst.',
        '**Füße** fest auf den Boden. Zehn Sekunden reindrücken.',
        '**Lang ausatmen:** 4 Sekunden ein, 6 Sekunden aus. Fünfmal.',
        'Nenn **fünf Dinge**, die du siehst.',
        'Sag laut: „Das ist Alarm. Keine Gefahr.“',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'So ruhig bin ich (0 gar nicht – 10 ganz ruhig):', regler: ['vorher', 'nachher'] }, { f: 'Am besten geholfen hat:', kreis: ['Füße', 'Ausatmen', 'fünf Dinge', 'der Satz'] }] }],
      aha: 'Panik geht vorbei – meist in Minuten. **Du musst sie nicht wegmachen. Nur abwarten.**',
      ziel: 'Einen Ablauf für Panik im Körper haben, bevor er gebraucht wird.',
      tipp: 'Alles mitmachen, laut mitzählen. Erste oder sehr häufige Panikattacken ärztlich abklären lassen.',
    },
    {
      titel: 'Eine Stufe jetzt', bild: 'peep:tom:neutral:laessig', icon: 'flag', zeit: '15 Min.', wer: 'du – dein Gegenüber ist dabei', material: '',
      schritte: [
        'Kreuz an: Welche kleine Sache hier im Haus **vermeidest** du?',
        'Schreib auf: Angst **vorher.**',
        'Mach sie. Dein Gegenüber ist in der Nähe.',
        '**Abbrechen zählt auch.** Dann schreib auf, bei welcher Zahl.',
        'Schreib auf: höchster Punkt und danach.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['message-circle', 'jemanden etwas fragen'], ['phone', 'irgendwo anrufen'], ['door', 'in einen vollen Raum gehen'], ['book', 'jemandem laut vorlesen'], ['building', 'im Büro etwas abholen'], ['walk', 'allein den Flur entlang']] },
        { art: 'tabelle', kopf: ['Angst 0–10', 'vorher', 'höchster Punkt', 'danach'], zeilen: ['Ich'] },
      ],
      aha: 'Die Zahl danach ist kleiner als die Zahl davor. **Das merkt sich dein Kopf.**',
      ziel: 'Eine echte erste Stufe gehen – begleitet.',
      tipp: 'Nur Situationen, die wirklich ungefährlich sind. Nicht drängen. Abbrechen wird ausgewertet, nicht bewertet.',
    },
  ],
  woche: {
    titel: 'Eine Stufe', icon: 'calendar-week', zeit: '1 Woche', wer: 'du – gern mit jemandem', material: 'dieses Blatt',
    schritte: ['Nimm die **kleinste** Sache, der du ausweichst.', 'Mach sie diese Woche. Gern mit jemandem.', 'Bleib, bis die Angst ein Stück sinkt. Mach danach ein Kreuz.'],
    zonen: [
      { art: 'woche', zeilen: ['Stufe gemacht', 'abgebrochen (zählt auch)', 'Umweg genommen', 'Panik-Plan benutzt'] },
      { art: 'karten', karten: [
        { titel: 'Bei Panik', icon: 'heartbeat', zeilen: ['Das ist Alarm, keine Gefahr.', 'Füße auf den Boden. Lang ausatmen.', 'Keine echte Gefahr? Dann bleib.'] },
        { titel: 'Meine Treppe', icon: 'stairs-up', zeilen: ['_1 leicht', '_2', '_3', '_4 schwer'] },
      ] },
    ],
    aha: 'Jede geschaffte Stufe **macht die nächste kleiner.**',
    ziel: 'Eine Stufe in einer Woche – oder ein ehrlicher Abbruch.',
    tipp: 'Wenn möglich beim ersten Mal begleiten. Die Zeile „Umweg genommen“ ohne Vorwurf ansehen.',
  },
  begleitung: { material: 'Stifte, Uhr, Handy', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
