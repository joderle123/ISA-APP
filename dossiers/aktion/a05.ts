// SOLO AKTION #05 · WUT – acht Aktionen zum Machen (wenig Text, einfache Sprache) und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'

const GEFUEHLE = ['Enttäuschung', 'Scham (peinlich)', 'Angst', 'Ohnmacht (ich kann nichts tun)', 'Einsam', 'Ungerecht behandelt', 'weiß nicht']

const d: AktionsHeft = {
  id: 'a05', nr: '05', datei: 'Solo-05-Wut-Aktion', thema: 'Wut', headline: 'Acht Aktionen. Wenig lesen. Viel machen.', farbe: '#C6F02C', stand: 'November 2026',
  bild: 'peep:finn:wuetend:verschraenkt', sticker: 'Zum Machen',
  start: [
    'Hier wird nicht lange geredet. **Hier wird gemacht.**',
    'Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.',
  ],
  aktionen: [
    {
      titel: 'Puls-Test', bild: 'peep:finn:neutral', icon: 'heartbeat', zeit: '10 Min.', wer: 'beide', material: 'Uhr mit Sekunden',
      schritte: [
        'Leg zwei Finger an den Hals. Spürst du den Puls?',
        'Dein Gegenüber stoppt **15 Sekunden**. Du zählst die Schläge.',
        'Jetzt **30 Sekunden Vollgas**: Hampelmann oder auf der Stelle rennen.',
        'Sofort wieder zählen. Dann nach jeder Minute.',
        'Tauschen: Jetzt ist dein Gegenüber dran.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['Schläge in 15 Sek.', 'vorher', 'direkt danach', 'nach 1 Min.', 'nach 2 Min.', 'nach 3 Min.'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Wer war schneller wieder unten?', kreis: ['ich', 'mein Gegenüber', 'beide gleich'] }] },
      ],
      aha: 'Dein Körper braucht Zeit zum Runterkommen. Nach Wut noch länger: **ungefähr 20 Minuten.**',
      ziel: 'Am eigenen Körper erleben: Erregung klingt nur langsam ab.',
      tipp: 'Mitmachen, nicht nur stoppen. Statt Hüpfen geht auch Treppe oder schnelles Gehen. Bei Herz- oder Atemproblemen weglassen.',
    },
    {
      titel: 'Meine Knöpfe', bild: 'peep:finn:wuetend:stehen', icon: 'temperature', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Lies die Sätze. Oder lass sie dir vorlesen.',
        'Schreib zu jedem Satz eine Zahl: **0** lässt mich kalt. **10** ich explodiere.',
        'Dein Gegenüber schreibt seine Zahl ins zweite Kästchen.',
        'Kreis deine **drei höchsten** Zahlen ein. Das sind deine Knöpfe.',
      ],
      zonen: [
        { art: 'werte', kopf: ['du', 'Gegenüber'], von: 'kalt', bis: 'ich explodiere', zeilen: [
          'Jemand lacht über mich.', 'Jemand fasst meine Sachen an.', 'Ich war es nicht – und kriege den Ärger.', 'Ich muss lange warten.', 'Ich verliere.',
          'Jemand sagt Nein.', 'Jemand redet schlecht über meine Familie.', 'Es ist laut und eng.', 'Jemand hält sein Versprechen nicht.', 'Jemand sagt mir, was ich tun soll.',
        ] },
      ],
      aha: 'Jeder hat andere Knöpfe. **Wer seine kennt, wird seltener überrascht.**',
      ziel: 'Die eigenen Auslöser kennen und vergleichen.',
      tipp: 'Eigene Zahlen ehrlich eintragen. Hohe Zahlen nicht kommentieren, bei „Familie“ nicht nachfragen.',
    },
    {
      titel: 'Körper-Karte', icon: 'body-scan', zeit: '10 Min.', wer: 'beide', material: 'zwei dicke Stifte',
      schritte: [
        'Denk an das letzte Mal, als du richtig sauer warst.',
        'Mal in die Figur: **Wo** im Körper war die Wut? Je stärker, desto dicker.',
        'Kreuz an, was dazu passt.',
        'Kreis ein, was **zuerst** kommt.',
        'Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur.',
      ],
      zonen: [{ art: 'koerper', woerter: ['Fäuste', 'Kiefer fest', 'heißer Kopf', 'Herz rast', 'Bauch hart', 'Tunnelblick', 'Zittern', 'Stimme wird laut', 'ich werde ganz still'] }],
      aha: 'Dein Körper merkt die Wut vor deinem Kopf. Das erste Zeichen ist dein **Frühwarn-System.**',
      ziel: 'Das erste Körpersignal finden.',
      tipp: 'Den Körper des Jugendlichen nicht kommentieren. Das eigene erste Zeichen nennen.',
    },
    {
      titel: 'Lineal-Test', icon: 'ruler-2', zeit: '10 Min.', wer: 'beide', material: 'Lineal, 30 cm',
      schritte: [
        'Dein Gegenüber hält das Lineal oben fest. Die Null zeigt nach unten.',
        'Deine Hand ist unten an der Null. Offen. Nicht berühren.',
        'Dein Gegenüber lässt los – **ohne Ansage.** Du fängst.',
        'Lies ab, wo deine Finger sind. Kleine Zahl heißt: schnell.',
        'Fünf Versuche. Dann tauschen.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['cm', '1', '2', '3', '4', '5', 'Bester'], zeilen: ['Du', 'Dein Gegenüber'] },
      ],
      aha: 'Dein Körper reagiert schneller, als dein Kopf denken kann. Darum brauchst du einen Plan – **vor dem Knall.**',
      ziel: 'Erleben: Reagieren geht schneller als Nachdenken.',
      tipp: 'Wettkampf zulassen und selbst verlieren können. Danach passt Aktion 7 (der Plan).',
    },
    {
      titel: 'Unter dem Teller', bild: 'peep:finn:wuetend', icon: 'stack-2', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: [
        'Schaut euch Finns Tag an.',
        'Kreuz an: Was lag **unter** Finns Wut?',
        'Jetzt du: Denk an dein letztes Mal. Was lag darunter?',
        'Dein Gegenüber kreuzt auch an – für sein letztes Mal.',
      ],
      zonen: [
        { art: 'comic', bilder: [
          ['message', 'Morgens schreibt Finns Mutter: „Dieses Wochenende klappt es nicht.“'],
          ['mood-silence', 'Den ganzen Tag sagt Finn keinem etwas.'],
          ['tools-kitchen-2', 'Abends ruft der Erzieher: „Kommst du? Wir essen.“'],
          ['bolt', 'Finn wirft den Teller an die Wand.'],
        ] },
        { art: 'fragen', fragen: [{ f: 'Was lag darunter?', raster: { spalten: ['Finn', 'ich', 'Gegenüber'], zeilen: GEFUEHLE } }] },
      ],
      aha: 'Unter der Wut liegt fast immer ein anderes Gefühl. **Der Teller war nicht das Problem.**',
      ziel: 'Das Gefühl unter der Wut benennen – erst bei Finn, dann bei sich.',
      tipp: '„Weiß nicht“ ist eine gute Antwort. Nicht nachbohren, warum.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: [
        'Scannt den Code. Schaut die ersten 6 Minuten.',
        'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?',
        'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.',
      ],
      zonen: [
        { art: 'clip', clip: { titel: 'Aggressiv: Woher kommt deine Wut?', kanal: 'Terra Xplore', url: 'https://www.youtube.com/watch?v=ytcdqLNedrg', dauer: 'die ersten 6 Min.', frage: 'Wen aus dem Video verstehst du am besten?' } },
        { art: 'daumen', saetze: ['Wut ist immer schlecht.', 'Wut kann auch helfen.', 'Ich kenne jemanden wie im Video.', 'Man kann lernen, anders mit Wut umzugehen.'] },
      ],
      aha: 'Wut ist nicht schlecht. Sie zeigt, dass etwas nicht stimmt. **Die Frage ist, was du mit ihr machst.**',
      ziel: 'Wut als Signal sehen, nicht als Fehler.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Ohne Netz: Aktion auslassen.',
    },
    {
      titel: 'Mein Zeichen', bild: 'peep:finn:wuetend:laessig', icon: 'hand-stop', zeit: '15 Min.', wer: 'beide', material: '',
      schritte: [
        'Kreuz an: Was hilft dir, wenn du ganz oben bist? Höchstens drei.',
        'Erfinde ein **Zeichen** für „Ich brauche 20 Minuten“: ein Wort oder eine Handbewegung.',
        'Probe: Dein Gegenüber nervt dich – nur gespielt. Du gibst das Zeichen und gehst raus.',
        'Eine Minute draußen. Dann komm zurück.',
        'Klärt: **Wer muss das Zeichen noch kennen?**',
      ],
      zonen: [
        { art: 'wahl', punkte: [['door-exit', 'rausgehen'], ['run', 'laufen oder rennen'], ['headphones', 'Musik'], ['user', 'allein sein'], ['hand-grab', 'etwas fest drücken'], ['barbell', 'Liegestütze'], ['pencil', 'zeichnen'], ['message-circle', 'mit jemandem reden']] },
        { art: 'fragen', fragen: [{ f: 'Mein Zeichen:', linien: 1 }] },
      ],
      aha: 'Weggehen ist kein Aufgeben. **Es ist ein Plan.** Wer zurückkommt, hat gewonnen.',
      ziel: 'Ein vereinbartes Zeichen für eine Auszeit – geübt, bevor es gebraucht wird.',
      tipp: 'Vorher klären, wohin der Jugendliche gehen darf. Beim „Nerven“ nie persönlich werden: zum Beispiel zehnmal dieselbe Frage stellen. Das Zeichen mit seinem Einverständnis ans Team geben.',
    },
    {
      titel: 'Der Satz danach', bild: 'peep:finn:froh', icon: 'message-circle', zeit: '12 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber liest vier Sätze vor. Kreuz an: Repariert der Satz etwas?',
        'Such dir unten einen Satz aus. Oder bau einen eigenen.',
        'Probe: Dein Gegenüber spielt die Person, bei der es geknallt hat. Du sagst den Satz. **Laut.**',
        'Tauschen: Dein Gegenüber sagt seinen Satz zu dir.',
      ],
      zonen: [
        { art: 'fragen', fragen: [{ f: 'Vier Sätze nach dem Knall:', raster: { spalten: ['repariert', 'bringt nichts'], zeilen: ['„Tut mir leid, aber du hast angefangen.“', '„Vorhin ging es eigentlich nicht um dich.“', '„Kommt nie wieder vor. Versprochen.“', '„Ich war wegen etwas anderem fertig. Den Teller mache ich weg.“'] } }] },
        { art: 'fragen', fragen: [{ f: 'Mein Satz:', unter: true, kreuz: ['„Vorhin ging es eigentlich nicht um …“', '„Ich war wegen etwas anderem sauer.“', '„Das mache ich wieder gut: …“'] }, { f: 'Oder mein eigener:', linien: 1 }] },
      ],
      aha: 'Ein ehrlicher Satz repariert mehr als zehn Erklärungen. **Versprich nichts, was du nicht halten kannst.**',
      ziel: 'Einen eigenen Satz für danach haben und einmal laut gesagt haben.',
      tipp: 'Den eigenen Satz wirklich sagen – am besten zu einer echten Situation mit dem Jugendlichen.',
    },
  ],
  woche: {
    titel: 'Strichliste', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: [
      'Jedes Mal, wenn es diese Woche knallt oder fast knallt: **danach** ein Strich.',
      'Der Strich kommt zu dem Gefühl, das darunter lag.',
      'Wette vorher: Welches Wort gewinnt? Kreis es ein.',
    ],
    zonen: [
      { art: 'woche', zeilen: GEFUEHLE },
      { art: 'karten', karten: [
        { titel: '20 Minuten', icon: 'clock', zeilen: ['Ganz oben? **Jetzt nicht reden.**', 'Zeichen geben. Weggehen.', 'Nach 20 Minuten ist der Kopf wieder da.'] },
        { titel: 'Mein Plan', icon: 'hand-stop', zeilen: ['_Mein Zeichen', '_Das hilft mir', '_Mein Satz danach'] },
      ] },
    ],
    aha: 'Das Wort mit den meisten Strichen ist dein Thema. **Nicht die Wut.**',
    ziel: 'Eine Woche lang das Gefühl unter der Wut zählen.',
    tipp: 'Beim nächsten Mal zuerst die Liste ansehen. Nur zählen, nicht bewerten – auch eine leere Liste ist ein Ergebnis.',
  },
  begleitung: {
    material: 'Uhr, Lineal, Stifte, Handy',
    achtung: 'Aktionen zu Wut können erlebte Gewalt berühren. Zuhören, nicht ausfragen; bei aktueller Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Bei Ankündigungen, jemandem etwas anzutun, oder bei Selbstverletzung nach Ausrastern direkt nachfragen und nicht allein entscheiden. Aktion 7 nur spielen, wenn die Stimmung ruhig ist. Das Heft ersetzt keine Vereinbarungen zur Sicherheit in der Gruppe.',
    mehr: 'Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #05 Wut.',
  },
}
export default d
