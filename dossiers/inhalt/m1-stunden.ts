// REAL TALK #01 · ICH – drei Stunden (16.11.2026), komplett neu gebaut am 24.11.2026 nach der Rückmeldung:
// „Detektiv-Fall zu viel und zu schwer, Tank-Spiel zu kompetitiv, Anweisungen zu kompliziert. Es soll der Sweet Spot sein:
// persönlich, man kann sich damit identifizieren, regt zum Nachdenken an, man kommt leicht ins Gespräch, macht Spaß und ist
// leicht verständlich.“
// Darum: kurze Fälle mit „Kennst du das?“, wenige Fragen je Station (erst ankreuzen), eine Sprechblase „Redet darüber“ als
// Gesprächsanstoß, Modelle zum Ausmalen und Verbinden, große Runden ohne Punkte und ohne Teams gegeneinander.
// Alle Personen und Situationen sind erfunden.
import type { Stunde } from '../typen'

/* ---------- Stunde 1 · Leerer Tank ---------- */
const tank: Stunde = {
  frage: 'Warum bist du manchmal sauer – obwohl dir keiner etwas getan hat?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, wie voll deine Tanks sind', 'merken, was dir gerade fehlt', 'einen leeren Tank wieder auffüllen'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Ankommen: dein Akku heute', zeit: '5 Min.', wie: 'allein', icon: 'door-enter',
          leitung: 'Still. Niemand zeigt sein Blatt. Das Wort von Frage 2 brauchen alle am Ende noch einmal.',
          bausteine: [
            { art: 'fragen', kontext: 'Nur für dich.', fragen: [
              { f: 'Wie voll ist dein Akku gerade? Mal ihn aus.', akku: 'leer' },
              { f: 'Was hat dich heute schon genervt? Ein Wort reicht.', linien: 1 },
            ] },
          ],
        },
        {
          titel: 'Der Fall: Neles Morgen', zeit: '12 Min.', wie: 'lesen · zu zweit', icon: 'book',
          leitung: 'Vorlesen oder reihum lesen. Erst ankreuzen, dann die Sprechblase: zwei, drei Meinungen hören. Nicht auflösen – es gibt mehrere gute Antworten.',
          bausteine: [
            {
              art: 'fall', bild: 'peep:nele:muede', name: 'Nele, 15',
              text: 'Dritte Stunde. Die Lehrerin fragt freundlich: „Nele, bist du bei uns?“ Nele knallt das Heft auf den Tisch und geht raus. Auf dem Flur sagt sie: „Keine Ahnung, was mit mir los ist.“ So war ihr Morgen:',
              zeitleiste: [['23:30', 'Im Klassenchat planen alle den Samstag. Nele wird nicht gefragt.'], ['1:50', 'Sie liegt noch wach und schaut aufs Handy.'], ['6:10', 'Wecker. Vier Stunden Schlaf.'], ['7:05', 'Kein Frühstück. Ein Energydrink auf dem Weg.'], ['10:20', '„Nele, bist du bei uns?“ – Knall.']],
              fragen: [
                { f: 'Was war bei Nele los? Kreuz alles an, was passt.', kreuz: ['müde', 'hungrig', 'traurig wegen dem Chat', 'die Lehrerin war gemein'] },
                { f: 'Kennst du solche Tage?', kreuz: ['oft', 'manchmal', 'nie'] },
              ],
            },
            { art: 'reden', x: ['Was hat Nele am meisten zugesetzt: der Chat, der Schlaf oder das fehlende Frühstück?', 'Was hätte ihr um 23:30 geholfen?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip: Was die Nacht mit dir macht', zeit: '12 Min.', wie: 'alle', icon: 'player-play',
          leitung: 'Ausschnitt vorher wählen und selbst ansehen. Erst schätzen, dann schauen.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Mehr als lebenswichtig: Darum schlafen wir!', kanal: 'Quarks', url: 'https://www.youtube.com/watch?v=sdH-fEEh1uY', dauer: 'Ausschnitt, etwa 6 Min.', frage: 'Was macht dein Körper nachts – und was hat Nele am Morgen gefehlt?' },
              vorher: [{ f: 'Schätz: Wie viele Stunden Schlaf braucht man mit 15?', zahl: ['Stunden'] }],
              dabei: ['Das hat mich überrascht:'],
              nachher: [{ f: 'Hilft der Energydrink Nele?', kreuz: ['ja', 'nur kurz', 'nein'] }],
            },
          ],
        },
        {
          titel: 'Das Modell: deine sechs Tanks', zeit: '12 Min.', wie: 'alle · dann allein', icon: 'gauge',
          leitung: 'Die sechs Tanks vorlesen, zu jedem ein Beispiel aus der Gruppe. Dann malt jede Person still aus. Niemand muss seine Tanks zeigen.',
          bausteine: [
            { art: 'text', x: ['Jeder Mensch hat sechs Tanks – wie die Leisten in einem Game. Ist einer leer, wirst du schneller sauer, müde oder traurig. Was einen Tank wieder füllt, heißt **Tankstelle**.'] },
            { art: 'fragen', fragen: [{ f: 'Mal in jedem Tank aus: Wie voll ist er bei dir heute?' }] },
            {
              art: 'modell', warnTitel: 'Leer? Dann oft', anzeige: 'ich',
              punkte: [
                { icon: 'bed', t: 'Körper', x: 'Schlaf, Essen, Trinken, Bewegung.', warn: 'gereizt, müde, Kopfweh' },
                { icon: 'shield', t: 'Sicherheit', x: 'Wissen, was kommt und wer da ist.', warn: 'unruhig, misstrauisch' },
                { icon: 'users', t: 'Dazugehören', x: 'Leute, zu denen du gehörst.', warn: 'traurig, neidisch, allein' },
                { icon: 'ear', t: 'Ernst genommen', x: 'Jemand hört dir zu.', warn: 'gekränkt, laut, macht dicht' },
                { icon: 'steering-wheel', t: 'Selbst entscheiden', x: 'Etwas bestimmen dürfen.', warn: 'trotzig, „mir doch egal“' },
                { icon: 'confetti', t: 'Spaß und Neues', x: 'Etwas erleben, das neu ist.', warn: 'gelangweilt, zappelig' },
              ],
            },
            { art: 'fragen', fragen: [{ f: 'Welche Tanks waren bei Nele leer? Kreise die Nummern ein.', kreis: ['1', '2', '3', '4', '5', '6'] }] },
            { art: 'reden', x: ['Welcher Tank ist bei euch am Montagmorgen am leersten – und welcher am Freitagabend?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: Kenn ich!', zeit: '25 Min.', wie: 'alle · am Tisch', icon: 'cards',
          leitung: 'Karten vorher ausschneiden. Sie spielen mit. Es gibt keine Punkte – es geht ums Erkennen und Erzählen. Wer nichts sagen will, zeigt nur den Daumen.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Situationen aus dem Alltag den Tanks zuordnen – und hören, wie es den anderen damit geht.',
              material: 'die 6 Tank-Karten und die 18 Situations-Karten von der nächsten Seite (ausschneiden)',
              schritte: [
                'Legt die 6 Tank-Karten in die Mitte.',
                'Eine Person zieht eine Situations-Karte und liest sie vor.',
                'Alle zeigen gleichzeitig mit dem Daumen: **hoch** = kenn ich, **zur Seite** = ein bisschen, **runter** = kenn ich nicht.',
                'Zusammen entscheiden: Welcher Tank ist hier leer? Legt die Karte dazu.',
                'Wer mag, sagt: Was hilft dann? Danach zieht die nächste Person.',
              ],
              regeln: ['Es gibt kein Richtig oder Falsch. Passen zwei Tanks, legt die Karte dazwischen.', 'Niemand muss etwas erzählen. Daumen zeigen reicht.'],
              zu3: 'Genauso – die Leitung zieht und zeigt mit.',
              notiz: { titel: 'Die beste Tankstelle, die ich heute gehört habe:', linien: 1 },
              auswertung: ['Bei welchem Tank liegen die meisten Karten?', 'Welche Karte kannten fast alle?'],
            },
            {
              art: 'chat', titel: 'So sieht eine Runde aus',
              zeilen: [
                { wer: 'Mia liest vor:', x: '„Sonntag, Regen, WLAN weg.“' },
                { wer: '', x: 'Alle zeigen den Daumen: drei hoch, einer zur Seite.', art: 'tut' },
                { wer: 'Ben sagt:', x: 'Das ist Spaß und Neues, oder?' },
                { wer: 'Mia sagt:', x: 'Mir hilft dann: rausgehen oder jemanden anrufen.' },
                { wer: '', x: 'Die Karte kommt zu Tank 6. Jetzt zieht Ben.', art: 'tut' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: 6 Tanks und 18 Situationen', zeit: '', wie: 'zu Station 5', icon: 'scissors', fort: true,
          bausteine: [
            { art: 'karten', wort: true, spalten: 6, hoehe: 22, hinweis: 'Die sechs Tanks: ausschneiden und in die Mitte legen.', karten: [{ t: 'Körper' }, { t: 'Sicherheit' }, { t: 'Dazu­gehören' }, { t: 'Ernst genommen' }, { t: 'Selbst ent­scheiden' }, { t: 'Spaß und Neues' }] },
            {
              art: 'karten', spalten: 3, hoehe: 28, hinweis: 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.',
              karten: [
                { t: 'Du hast bis drei Uhr gezockt. Erste Stunde: Test.' },
                { t: 'Kein Frühstück, kein Pausenbrot. Es ist 12 Uhr.' },
                { t: 'Sechs Stunden gesessen. Jetzt noch Hausaufgaben.' },
                { t: 'Neuer Stundenplan. Keiner sagt dir, in welchen Raum du musst.' },
                { t: 'Deine Betreuerin ist krank. Keiner weiß, wer heute kommt.' },
                { t: 'Morgen ist ein wichtiger Termin. Du weißt nicht, was passiert.' },
                { t: 'Pause. Alle stehen in Gruppen. Du stehst daneben.' },
                { t: 'Im Gruppenchat wird geplant. Dich hat keiner gefragt.' },
                { t: 'Beim Sport werden Teams gewählt. Du bist als Letzter dran.' },
                { t: 'Du erzählst etwas. Dein Gegenüber schaut aufs Handy.' },
                { t: 'Du sagst deine Idee. Alle lachen – es war kein Witz.' },
                { t: 'Du sagst Nein. Keiner hört hin.' },
                { t: 'Den ganzen Tag sagt dir jemand, was du tun sollst.' },
                { t: 'Über dein Wochenende wird entschieden. Gefragt hat dich keiner.' },
                { t: 'Du willst es auf deine Art machen. Du darfst nicht.' },
                { t: 'Sonntag, Regen, WLAN weg.' },
                { t: 'Jede Woche derselbe Ablauf. Nichts Neues.' },
                { t: 'Alle erzählen vom Wochenende. Bei dir war nichts los.' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Für dich: meine Tankstellen', zeit: '10 Min.', wie: 'allein', icon: 'user',
          leitung: 'Stille Arbeit. Die Tankstelle muss klein sein: höchstens zehn Minuten, ohne jemanden überreden zu müssen.',
          bausteine: [
            {
              art: 'menue', titel: 'Schnell-Tankstellen – höchstens zehn Minuten. Kreuz zwei an, die du ausprobieren willst.',
              gruppen: [
                { t: 'Körper', punkte: ['etwas Richtiges essen, Wasser trinken', 'zehn Minuten raus an die Luft', 'das Handy um 22 Uhr weglegen'] },
                { t: 'Sicherheit', punkte: ['nachfragen: „Was passiert morgen?“', 'den Plan für morgen aufschreiben', 'an einen Ort gehen, den du magst'] },
                { t: 'Dazugehören', punkte: ['jemandem schreiben, der dir guttut', 'dich zu jemandem dazusetzen', 'bei etwas mitmachen, das schon läuft'] },
                { t: 'Ernst genommen', punkte: ['sagen: „Hör mir kurz zu.“', 'aufschreiben, was du sagen willst', 'es der Person sagen, die wirklich zuhört'] },
                { t: 'Selbst entscheiden', punkte: ['eine Sache heute selbst bestimmen', 'fragen: „Darf ich es auf meine Art machen?“', 'zwischen zwei Möglichkeiten wählen'] },
                { t: 'Spaß und Neues', punkte: ['einen neuen Weg gehen', 'etwas zum ersten Mal ausprobieren', 'dein Lieblingslied laut hören'] },
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'Blätter zurück zu Station 1: Was hat dich heute genervt? Welcher Tank war da leer?', kreis: ['Körper', 'Sicherheit', 'Dazugehören', 'Ernst genommen', 'Selbst entscheiden', 'Spaß und Neues'] },
              { f: 'Wenn dieser Tank leer ist, hilft mir:', linien: 1 },
            ] },
          ],
        },
        {
          titel: 'Schluss: ein Satz für Nele', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          leitung: 'Wer mag, liest seinen Satz vor. In der nächsten Stunde nach den drei Kreuzen fragen.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Es ist 23:30. Nele sieht den Chat. Was schreibst du ihr?', linien: 1 }] },
            { art: 'merk', x: 'Erst tanken. ==Dann streiten.==' },
            { art: 'woche', x: 'Füll deinen leersten Tank auf – **dreimal diese Woche.** Ein Kreuz pro Mal.', kaestchen: ['1', '2', '3'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Stunde 2 · Laut oder leise ---------- */
const lautLeise: Stunde = {
  frage: 'Was fehlt einer Gruppe, wenn nur die Lauten reden?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, ob du eher laut oder leise bist', 'sagen, was beide Seiten gut können', 'dafür sorgen, dass alle zu Wort kommen'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Erst machen: das Experiment', zeit: '10 Min.', wie: 'alle · am Tisch', icon: 'flask',
          leitung: 'Zeit stoppen. Sie zählen mit und schreiben die Zahlen an die Tafel. Nicht bewerten, nur vergleichen.',
          bausteine: [
            { art: 'text', x: ['Die Frage: **Was kann man alles mit einem Blatt Papier machen?**', '**Runde A · laut:** Zwei Minuten. Alle rufen ihre Ideen einfach in die Runde.', '**Runde B · leise:** Zwei Minuten. Jede Person schreibt still für sich. Dann zählt ihr zusammen.'] },
            { art: 'tabelle', breiten: '34mm auto auto', kopf: ['Runde', 'Wie viele Ideen?', 'Von wie vielen Leuten?'], zeilen: [['A · laut', '', ''], ['B · leise', '', '']], hoehe: 10 },
            { art: 'fragen', fragen: [{ f: 'In welcher Runde hattest **du** mehr Ideen?', kreuz: ['A · laut', 'B · leise', 'gleich'] }] },
          ],
        },
        {
          titel: 'Die Linie: Wo stehst du?', zeit: '8 Min.', wie: 'allein · dann wer mag', icon: 'ruler-measure',
          leitung: 'Erst im Heft. Das Aufstellen im Raum ist freiwillig. Wer steht, sagt einen Satz: Was ist an meiner Seite gut?',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Mach auf jeder Linie ein Kreuz. Die Mitte ist erlaubt.', striche: [['laut', 'leise'], ['rede gern', 'höre gern zu'], ['probiere sofort', 'schaue erst zu'], ['gern unter Leuten', 'gern für mich']] }] },
            { art: 'reden', x: ['Wer mag, stellt sich im Raum auf eine Linie: ein Ende ist laut, das andere leise.', 'Was ist an deiner Seite gut?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Der Fall: Sami redet, Amira schweigt', zeit: '12 Min.', wie: 'lesen · zu zweit', icon: 'file-text',
          leitung: 'Reihum lesen. Die Fragen zu zweit. Bei der Sprechblase zwei, drei Ideen sammeln.',
          bausteine: [
            { art: 'text', x: ['Vier Leute sollen zusammen ein Plakat machen. **Morgen muss es fertig sein.**'] },
            {
              art: 'chat',
              zeilen: [
                { wer: 'Sami sagt:', x: 'Ich hab’s! Wir drehen ein Video!' },
                { wer: 'Der Lehrer sagt:', x: 'Gut, Sami, dass du anfängst.' },
                { wer: 'Amira denkt:', x: 'Ein Video bis morgen? Das schaffen wir nie.', art: 'denkt' },
                { wer: '', x: 'Amira will es sagen. Aber Sami redet und redet.', art: 'tut' },
                { wer: 'Der Lehrer sagt:', x: 'Amira, du musst mehr mitmachen.' },
                { wer: '', x: 'Am nächsten Tag: Das Video ist nicht fertig.', art: 'tut' },
              ],
              fragen: [
                { f: 'Wer hat gemerkt, dass der Plan nicht klappt?', kreuz: ['Sami', 'Amira', 'der Lehrer'] },
                { f: 'Und du – bist du eher wie Sami oder eher wie Amira?', strich: ['Sami', 'Amira'] },
              ],
            },
            { art: 'reden', x: ['Was hätte die Gruppe tun können, damit Amira etwas sagt?', 'Und was kann Sami richtig gut?'] },
          ],
        },
        {
          titel: 'Clip: laut, leise, glücklich?', zeit: '10 Min.', wie: 'alle', icon: 'player-play',
          leitung: 'Ausschnitt vorher ansehen. Tipp vorher ankreuzen lassen. Studien finden bei Lauten im Schnitt etwas mehr gute Laune – ein Durchschnitt, kein Urteil über Leise.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Introvertiert | extrovertiert: Wer ist glücklicher?', kanal: 'Terra Xplore', url: 'https://www.youtube.com/watch?v=x_un3Ojno7Y', dauer: 'die ersten 5 Min.', frage: 'Introvertiert heißt: eher leise. Extrovertiert heißt: eher laut. Wer hat es leichter?' },
              vorher: [{ f: 'Dein Tipp: Wer ist glücklicher?', kreuz: ['die Lauten', 'die Leisen', 'kein Unterschied'], unter: true }],
              dabei: ['Das können die Leisen gut:'],
              nachher: [{ f: 'War dein Tipp richtig?', kreuz: ['ja', 'nein', 'halb'] }],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Das Modell: dein Akku', zeit: '8 Min.', wie: 'allein · dann zu zweit', icon: 'battery-charging',
          leitung: 'Vorlesen, dann allein ankreuzen. Zu zweit vergleichen. Betonen: Beides ist normal, viele sind gemischt.',
          bausteine: [
            { art: 'text', x: ['Manche Menschen laden ihren Akku **unter Leuten** auf. Andere laden ihn **allein** auf. Beides ist normal.'] },
            { art: 'fragen', fragen: [{ f: 'Was macht das mit deinem Akku? Ein Kreuz pro Zeile.', raster: { spalten: ['lädt auf', 'zieht leer'], zeilen: ['eine Party mit vielen Leuten', 'allein Musik hören', 'mit einer Person reden', 'mit Freunden zocken', 'ein langer Tag in der Schule', 'allein zeichnen oder basteln'] } }] },
            { art: 'reden', x: ['Vergleicht zu zweit: Wo seid ihr gleich – und wo ganz verschieden?'] },
          ],
        },
        {
          titel: 'Die große Runde: die Brücke', zeit: '25 Min.', wie: 'alle · mit Rollen', icon: 'building-bridge',
          leitung: 'Rollen sind Aufgaben, kein Schauspiel; tauschen ist freiwillig. Die zwei Minuten Stille stoppen. Nicht mitbauen – beobachten, wessen Idee gebaut wird.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Zusammen etwas bauen – mit lauten und leisen Rollen.',
              material: '20 Blatt Papier, Klebeband, eine volle Plastikflasche, zwei Stühle, die Rollen-Karten von unten',
              schritte: [
                'Baut aus Papier eine Brücke zwischen zwei Stühlen (40 cm). Sie muss die volle Flasche **zehn Sekunden** tragen.',
                'Jede Person zieht eine Rollen-Karte.',
                '**Zwei Minuten still:** Jede Person zeichnet ihre Idee. Dann zeigen alle ihr Blatt.',
                '**Zehn Minuten bauen.** Dann der Test mit der Flasche.',
              ],
              regeln: ['Keine Idee wird ausgelacht.', 'Wer nicht bauen will, ist Zeitwächter.'],
              zu3: 'Jede Person nimmt zwei Rollen.',
              auswertung: ['Von wem kam die Idee, die ihr gebaut habt?', 'Welche Rolle hat am meisten geholfen?'],
            },
            {
              art: 'karten', spalten: 3, hoehe: 22, hinweis: 'Rollen-Karten: ausschneiden und verdeckt ziehen.',
              karten: [
                { t: 'Starter', x: 'Du sagst: „Los, erste Idee!“', marke: 'laut' },
                { t: 'Mutmacher', x: 'Du sagst, was schon gut klappt.', marke: 'laut' },
                { t: 'Sprecher', x: 'Du sagst am Ende, warum sie hält.', marke: 'laut' },
                { t: 'Zuhörer', x: 'Du sagst: „Bisher haben wir …“', marke: 'leise' },
                { t: 'Prüfer', x: 'Du fragst: „Moment – hält das?“', marke: 'leise' },
                { t: 'Frager', x: 'Du fragst jemanden, der noch nichts gesagt hat: „Was denkst du?“', marke: 'leise' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Für dich: die andere Seite', zeit: '8 Min.', wie: 'allein', icon: 'user',
          leitung: 'Stille Arbeit. Die Antworten sind privat.',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Was möchtest du öfter können?', kreuz: ['öfter etwas sagen', 'öfter zuhören', 'passt so'] },
              { f: 'Wo willst du das diese Woche ausprobieren?', kreuz: ['in der Schule', 'bei Freunden', 'im Verein', 'zu Hause', 'im Netz'] },
              { f: 'Wo lädst du deinen Akku am besten auf? Schreib oder zeichne deinen Lieblingsort.', feld: 42 },
            ] },
          ],
        },
        {
          titel: 'Schluss: Amiras Satz', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          leitung: 'Zwei, drei Sätze hören. Wochenaufgabe ansagen.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Morgen arbeitet die Gruppe wieder zusammen. Was sagt Amira diesmal?', satz: ['Amira sagt:'] }] },
            { art: 'merk', x: 'Beide Seiten ==punkten.==' },
            { art: 'woche', x: 'Probier die andere Seite: Bist du eher leise, sag einmal **als Erstes** etwas. Bist du eher laut, hör einmal **nur zu**.', kaestchen: ['gemacht'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Stunde 3 · Was du kannst ---------- */
const kannst: Stunde = {
  frage: 'Was steht in keiner Akte über dich?',
  dauer: 'etwa 90 Minuten',
  kannst: ['Stärken bei dir und anderen sehen', 'eine Stärke mit einem Beispiel sagen', 'jemandem etwas Gutes sagen, das stimmt'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Was in diesem Raum steckt', zeit: '8 Min.', wie: 'allein · dann alle', icon: 'checklist',
          leitung: 'Liste vorlesen, Hände zählen, nicht kommentieren.',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Kreuz an, was du kannst – auch wenn es dir klein vorkommt.', kreuz: ['pfeifen', 'etwas reparieren', 'kochen oder backen', 'mit Tieren umgehen', 'mir Wege merken', 'jemanden zum Lachen bringen', 'lange zuhören', 'schnell rechnen', 'zeichnen', 'mit kleinen Kindern umgehen', 'ein Spiel richtig gut spielen', 'zwei oder mehr Sprachen'] },
            ] },
            { art: 'reden', titel: 'Hand hoch!', x: ['Die Leitung liest die Liste vor. Hand hoch, wer es kann. Was kann hier nur eine Person?'] },
          ],
        },
        {
          titel: 'Der Fall: Die Akte Yusuf', zeit: '12 Min.', wie: 'lesen · zu zweit', icon: 'folder',
          leitung: 'Die Akte vorlesen wie ein Amt, „Was nicht drinsteht“ ganz normal. Bei der Sprechblase nur erzählen lassen, wer mag.',
          bausteine: [
            {
              art: 'akte', titel: 'Akte · Seite 1', kopf: 'Yusuf, 16', stempel: 'unvollständig',
              eintraege: ['laut im Unterricht', 'gibt Widerworte', 'zwei Verwarnungen', 'Auf die Frage „Was kannst du gut?“: „Nichts Besonderes.“'],
              daneben: { titel: 'Was nicht drinsteht', punkte: ['Bringt jeden Morgen seine kleine Schwester zur Schule.', 'Erklärt dem Neuen in der Werkstatt alles zweimal.', 'Hat noch nie einen Freund verpfiffen.'] },
              fragen: [
                { f: 'Was kann Yusuf gut? Kreuz alles an, was passt.', kreuz: ['verlässlich', 'hilfsbereit', 'treu', 'faul', 'geduldig'] },
                { f: 'Yusuf sagt: „Nichts Besonderes.“ Warum?', kreuz: ['Für ihn ist das normal.', 'Niemand hat es ihm je gesagt.', 'Er will nicht angeben.'], unter: true },
              ],
            },
            { art: 'reden', x: ['Kennt ihr das: Andere sehen nur, was schiefgeht?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Das Modell: Stärke und Kehrseite', zeit: '8 Min.', wie: 'allein', icon: 'contrast',
          leitung: 'Vorlesen, allein verbinden, dann auflösen. Beispiel Yusuf: Laut im Unterricht kann auch heißen: traut sich was.',
          bausteine: [
            { art: 'text', x: ['Jede Stärke hat eine **Kehrseite**. Wird es zu viel davon, wird es schwierig. Und umgekehrt: In manchem Ärger steckt eine Stärke.'] },
            { art: 'fragen', fragen: [
              { f: 'Was passiert, wenn es zu viel wird? Verbinde.', verbinden: [['mutig', 'ehrlich', 'hilfsbereit', 'lustig'], ['nimmt nichts ernst', 'leichtsinnig', 'kann nie Nein sagen', 'verletzend']] },
              { f: 'Yusuf ist laut im Unterricht. Welche Stärke könnte dahinterstecken?', kreuz: ['traut sich was', 'hat viel Energie', 'sagt, was er denkt'] },
            ] },
          ],
        },
        {
          titel: 'Clip: Was bin ich wert?', zeit: '10 Min.', wie: 'alle', icon: 'player-play',
          leitung: 'Der Titel ist hart – vorher sagen, dass es um die Tipps geht. Ausschnitt vorher wählen.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Ich bin nichts wert – so steigerst du dein Selbstwertgefühl', kanal: 'BUBBLES', url: 'https://www.youtube.com/watch?v=XZzcGOxqBy8', dauer: 'die ersten 5 Min.', frage: 'Selbstwertgefühl heißt: wie viel du dir selbst wert bist. Woher kommt das?' },
              vorher: [{ f: 'Was zählt am meisten dafür, wie du über dich denkst?', kreuz: ['Noten', 'was andere sagen', 'was ich selbst denke'], unter: true }],
              dabei: ['Ein Tipp aus dem Clip:'],
              nachher: [{ f: 'Welcher Tipp hilft Yusuf?', linien: 1 }],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: der Stärken-Markt', zeit: '25 Min.', wie: 'alle', icon: 'building-store',
          leitung: 'Karten vorher ausschneiden. Mitgehen und darauf achten, dass niemand leer ausgeht – auch Sie bekommen Karten.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Stärken bei anderen sehen – und sie ihnen sagen.',
              material: 'die 24 Stärken-Karten von der nächsten Seite (ausschneiden), ein Tisch als Markt',
              schritte: [
                'Alle Karten liegen offen auf dem Tisch.',
                'Such dir für jede Person aus der Gruppe eine Karte aus, die zu ihr passt.',
                'Geh hin und gib sie ab – mit dem Satz: „Die passt zu dir, weil …“',
                'Jede Person legt ihre Karten vor sich hin. Welche hat dich überrascht?',
              ],
              regeln: ['Karten werden nur verschenkt, nie zurückgegeben. Ein „Danke“ reicht.', 'Niemand geht leer aus.'],
              zu3: 'Jede Person bekommt von jeder anderen zwei Karten – auch die Leitung.',
              notiz: { titel: 'Diese Karte habe ich bekommen – und das hat die Person dazu gesagt:', linien: 1 },
              auswertung: ['Welche Karte hat dich überrascht?', 'Welche Karte hättest du dir selbst nie gegeben?'],
            },
            {
              art: 'chat', titel: 'So kann es klingen',
              zeilen: [
                { wer: 'Lea zu Tom:', x: '„Kann zuhören“ passt zu dir, weil du mir letzte Woche zugehört hast, als ich Stress hatte.' },
                { wer: 'Tom:', x: 'Danke.' },
                { wer: 'Tom zu Sara:', x: '„Gibt nicht auf“ – weil du die Brücke dreimal neu gebaut hast.' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: 24 Stärken', zeit: '', wie: 'zu Station 5', icon: 'scissors', fort: true,
          bausteine: [
            {
              art: 'karten', wort: true, spalten: 4, hoehe: 30, hinweis: 'An den gestrichelten Linien ausschneiden. Die leeren Karten sind für Stärken, die fehlen.',
              karten: [
                { t: 'treu' }, { t: 'mutig' }, { t: 'lustig' }, { t: 'geduldig' },
                { t: 'ehrlich' }, { t: 'hilfsbereit' }, { t: 'kreativ' }, { t: 'hartnäckig' },
                { t: 'fair' }, { t: 'neugierig' }, { t: 'schnell im Kopf' }, { t: 'geschickt mit den Händen' },
                { t: 'bleibt ruhig' }, { t: 'kann zuhören' }, { t: 'hält Wort' }, { t: 'gibt nicht auf' },
                { t: 'macht Stimmung' }, { t: 'sieht, wenn es jemandem schlecht geht' }, { t: 'kann gut erklären' }, { t: 'steht für andere ein' },
                { t: 'gut mit Tieren' }, { t: 'gut mit Kindern' }, { t: '________' }, { t: '________' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Für dich: mein Baum', zeit: '10 Min.', wie: 'allein', icon: 'tree',
          leitung: 'Stille Arbeit. Wer nicht schreiben mag, zeichnet. Kein Vorzeigen.',
          bausteine: [
            { art: 'text', x: ['Ein Baum steht, weil unten etwas hält. Schreib nur, was du teilen willst.'] },
            { art: 'fragen', fragen: [
              { f: 'Mein Baum:', satz: ['Früchte – darauf bin ich stolz:', 'Stamm – das kann ich:', 'Wurzeln – das gibt mir Halt (Menschen, Orte, Musik, Tiere …):'] },
              { f: 'Wer mag, zeichnet ihn. Krumm ist erlaubt.', feld: 50 },
            ] },
          ],
        },
        {
          titel: 'Schluss: die andere Akte', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          leitung: 'Wer mag, liest seinen Satz vor. Wochenaufgabe ansagen.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Jemand fragt dich: „Was kannst du gut?“ Was sagst du jetzt?', satz: ['Ich kann gut …'] }] },
            { art: 'merk', x: 'Du bist mehr ==als deine Akte.==' },
            { art: 'woche', x: 'Sag einer Person eine Stärke, die du an ihr siehst – **und woran du sie gemerkt hast.**', kaestchen: ['gesagt'] },
          ],
        },
      ],
    },
  ],
}

export const stunden: Stunde[] = [tank, lautLeise, kannst]
