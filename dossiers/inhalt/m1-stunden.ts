// REAL TALK #01 · ICH – drei Stunden (16.11.2026), komplett neu gebaut am 24.11.2026 nach der Rückmeldung:
// „Detektiv-Fall zu viel und zu schwer, Tank-Spiel zu kompetitiv, Anweisungen zu kompliziert. Es soll der Sweet Spot sein:
// persönlich, man kann sich damit identifizieren, regt zum Nachdenken an, man kommt leicht ins Gespräch, macht Spaß und ist
// leicht verständlich.“
// Am 24.11.2026 noch einmal: „Vergiss Nele komplett … nahbarer, mehr Fragen zum Video“ – Stunde 1 geht vom eigenen Alltag aus.
// Darum: kurze Fälle, wenige Fragen je Station (erst ankreuzen), eine Sprechblase „Redet darüber“ als
// Gesprächsanstoß, Modelle zum Ausmalen und Verbinden, große Runden ohne Punkte und ohne Teams gegeneinander.
// Alle Personen und Situationen sind erfunden.
// Umbau 27.11.2026 nach fünf jugendlichen Kritikern: Schlaf-Clip → Schlaf-Wette, Tankstellen-Menü raus, „dein Akku“ als
// dritte Energie-Metapher raus, Pausen. Stunde 3 „die andere Akte“: Clip (Suizid, Essstörung) und Baum raus, dafür
// „Meine Akte, Seite 2“ mit den geschenkten Stärken-Karten.
import type { Stunde } from '../typen'

/* ---------- Stunde 1 · Leerer Tank ----------
   Neu am 24.11.2026 (Rückmeldung: „Vergiss Nele komplett, gestalte den Unterricht total um und nahbarer, mehr Fragen zum
   Video“): Die Stunde geht nicht mehr von einer erfundenen Person aus, sondern vom eigenen Alltag der Jugendlichen –
   die Schlaf-Wette, die sechs Tanks, „Kenn ich!“ mit 18 Situationen. Seit 27.11.2026 ohne „Kennst du das?“ (Dopplung mit
   „Kenn ich!“) und ohne Clip. */
const tank: Stunde = {
  frage: 'Warum bist du manchmal sauer – obwohl dir keiner etwas getan hat?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, wie voll deine Tanks sind', 'merken, was dir gerade fehlt', 'einen leeren Tank wieder auffüllen'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Ankommen: dein Tank heute', zeit: '5 Min.', wie: 'allein', icon: 'door-enter',
          leitung: 'Still. Niemand zeigt sein Blatt. Die Anzeige und das Wort von Frage 2 kommen am Ende noch einmal.',
          bausteine: [
            { art: 'fragen', kontext: 'Nur für dich.', fragen: [
              { f: 'Wie voll ist dein Tank gerade? Mal die Anzeige aus.', akku: 'leer' },
              { f: 'Was hat dich heute schon genervt? Ein Wort reicht.', linien: 1 },
            ] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Wette: fünf Sätze über Schlaf', zeit: '6 Min.', wie: 'allein · dann alle', icon: 'bed',
          leitung: 'Erst still tippen, dann auflösen (siehe Lösungen) – ein Satz pro Auflösung, kein Vortrag.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Stimmt das? Tipp einfach – danach wird aufgelöst.', raster: { spalten: ['stimmt', 'stimmt nicht'], zeilen: [
              'Im Schlaf räumt das Gehirn auf und speichert, was du gelernt hast.',
              'Wer zu wenig schläft, wird schneller gereizt.',
              'Verpassten Schlaf kann man am Wochenende ganz nachholen.',
              'Das Handy im Bett hilft meistens beim Einschlafen.',
              'Ein Energydrink ersetzt eine Stunde Schlaf.',
            ] } }] },
            { art: 'reden', x: ['Was hält euch abends am längsten wach?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Das Modell: deine sechs Tanks', zeit: '10 Min.', wie: 'alle · dann allein', icon: 'gauge',
          leitung: 'Die sechs Tanks vorlesen, zu jedem ein Beispiel aus der Gruppe. Dann ausmalen – still. Niemand muss seine Tanks zeigen.',
          bausteine: [
            { art: 'text', x: ['Schlaf ist nur **einer** von sechs Tanks. Jeder Mensch läuft auf ihnen – wie auf den Leisten in einem Game. Ist einer leer, wirst du schneller sauer, müde oder traurig. Was einen Tank wieder füllt, heißt **Tankstelle**.'] },
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
            { art: 'fragen', fragen: [
              { f: 'Mal in jedem Tank aus: Wie voll ist er bei dir heute?' },
            ] },
            { art: 'reden', x: ['Welcher Tank ist bei euch am Montagmorgen am leersten – und welcher am Freitagabend?', 'Was füllt bei euch am schnellsten wieder auf?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Pause', zeit: '5 Min.', wie: 'alle', icon: 'coffee',
          leitung: 'Wirklich Pause machen – auch Sie.',
          bausteine: [{ art: 'text', x: ['Aufstehen, trinken, Fenster auf. Danach geht es weiter.'] }],
        },
        {
          titel: 'Die große Runde: Kenn ich!', zeit: '25 Min.', wie: 'alle · am Tisch', icon: 'cards',
          leitung: 'Karten vorher ausschneiden (Kopiervorlage). Sie spielen mit. Es gibt keine Punkte – es geht ums Erkennen und Erzählen. Wer nichts sagen will, zeigt nur den Daumen.',
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
              auswertung: ['Bei welchem Tank liegen die meisten Karten?', 'Welche Karte hat euch überrascht?'],
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
            // Zweisprachig (Auftrag 24.11.2026): deutsch groß, französisch klein – in der französischen Fassung umgekehrt
            { art: 'karten', wort: true, spalten: 6, hoehe: 26, hinweis: 'Die sechs Tanks: ausschneiden und in die Mitte legen. Auf Deutsch und Französisch.', karten: [
              { t: 'Körper', x: 'le corps' }, { t: 'Sicherheit', x: 'la sécurité' }, { t: 'Dazu­gehören', x: 'faire partie' },
              { t: 'Ernst genommen', x: 'être pris au sérieux' }, { t: 'Selbst ent­scheiden', x: 'décider soi‑même' }, { t: 'Spaß und Neues', x: 'plaisir et nouveauté' }] },
            {
              art: 'karten', spalten: 3, hoehe: 28, hinweis: 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.',
              karten: [
                { t: 'Du hast bis drei Uhr gezockt. Erste Stunde: Test.' },
                { t: 'Kein Frühstück, kein Pausenbrot. Es ist 12 Uhr.' },
                { t: 'Sechs Stunden gesessen. Jetzt noch Hausaufgaben.' },
                { t: 'Neuer Stundenplan. Keiner sagt dir, in welchen Raum du musst.' },
                { t: 'Deine Klassenlehrerin ist krank. Keiner weiß, wer heute kommt.' },
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
          titel: 'Tanken – aber richtig', zeit: '10 Min.', wie: 'allein · dann alle', icon: 'gas-station',
          leitung: 'Erst allein, dann auflösen. Nicht moralisieren: Es kommt auf die Menge an. Fragen: Was gibt dir die Fake-Tankstelle – und was nimmt sie dir danach?',
          bausteine: [
            { art: 'text', x: ['Ist ein Tank leer, willst du ihn schnell füllen. Aber nicht alles, was sich gut anfühlt, füllt wirklich auf. Manches ist eine **Fake-Tankstelle**: Sie fühlt sich kurz gut an – danach bist du leerer als vorher.', '**Der Tankstellen-Check – drei Fragen:**\n1. Geht es mir danach besser – auch noch in einer Stunde?\n2. Schadet es mir oder anderen?\n3. Kann ich jederzeit aufhören?'] },
            { art: 'fragen', fragen: [{ f: 'Echte Tankstelle oder Fake? Ein Kreuz pro Zeile.', raster: { spalten: ['echt: füllt auf', 'Fake: nur kurz gut'], zeilen: [
              'ein Energydrink',
              'eine Runde um den Block gehen',
              'bis drei Uhr nachts zocken',
              'eine Stunde mit Freunden zocken',
              'jemanden anrufen, der dir guttut',
              'stundenlang durch Videos scrollen',
              'dein Lieblingslied laut hören',
              'Streit anfangen, damit endlich was los ist',
              'etwas Richtiges essen',
            ] } }] },
            { art: 'reden', x: ['Zocken steht zweimal in der Liste. Warum ist es einmal echt und einmal Fake?', 'Welche Fake-Tankstelle kennt ihr von euch selbst – und warum ist sie so verlockend?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Für dich: mein Tank-Plan', zeit: '12 Min.', wie: 'allein · dann alle', icon: 'user',
          leitung: 'Erst still. Die Tankstelle muss klein sein: höchstens zehn Minuten. Beim Tausch schreiben Sie auch einen Zettel.',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Blätter zurück zu Station 1: Was hat dich heute genervt? Welcher Tank war da leer?', kreis: ['Körper', 'Sicherheit', 'Dazugehören', 'Ernst genommen', 'Selbst entscheiden', 'Spaß und Neues'] },
              { f: 'Dein Tank-Plan. Beispiel: Wenn ich gereizt aus der Schule komme, esse ich zuerst etwas.', satz: ['Wenn ich merke, dass …', 'dann tanke ich so:'] },
            ] },
            { art: 'reden', titel: 'Tankstellen-Tausch', x: ['Schreib deine beste echte Tankstelle auf einen Zettel. Alle Zettel kommen in die Mitte. Jede Person nimmt sich eine Idee, die sie noch nicht kannte.'] },
            { art: 'fragen', fragen: [{ f: 'Meine neue Idee aus dem Tausch:', linien: 1 }] },
          ],
        },
        {
          titel: 'Schluss: dein Tank jetzt', zeit: '5 Min.', wie: 'allein · dann wer mag', icon: 'flag',
          leitung: 'Still ausmalen. Wer mag, sagt nur: mehr, gleich oder weniger als am Anfang. In der nächsten Stunde nach den drei Kreuzen fragen.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Und jetzt? Mal die Anzeige noch einmal aus – wie am Anfang.', akku: 'leer' }] },
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
              ],
            },
            { art: 'reden', x: ['Was hätte die Gruppe tun können, damit Amira etwas sagt?', 'Und was kann Sami richtig gut?'] },
          ],
        },
        {
          titel: 'Clip: laut, leise, glücklich?', zeit: '10 Min.', wie: 'alle', icon: 'player-play',
          leitung: 'Nur 04:07 bis 07:45 (davor ein Kraftausdruck). Kern: Keine Seite ist besser, viele haben beides. Laute haben im Schnitt etwas mehr gute Laune – kein Urteil über Leise.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Introvertiert | extrovertiert: Wer ist glücklicher?', kanal: 'Terra Xplore', url: 'https://www.youtube.com/watch?v=x_un3Ojno7Y', dauer: '04:07 bis 07:45 (gut 3 Min.)', frage: 'Introvertiert heißt: eher leise. Extrovertiert heißt: eher laut. Ist eine Seite besser?' },
              vorher: [{ f: 'Dein Tipp: Ist eine Seite besser?', kreuz: ['die Lauten', 'die Leisen', 'keine'], unter: true }],
              dabei: ['Das können die Leisen gut:', 'Das können die Lauten gut:', 'Das hat mich überrascht:'],
              nachher: [{ f: 'Was sagt die Psychologin: Kann man laut und leise zugleich sein?', kreuz: ['ja', 'nein'], unter: true }, { f: 'Was sollte Amiras Lehrer über leise Leute wissen?', linien: 1 }],
            },
            { art: 'reden', x: ['Erkennt ihr euch im Clip wieder? Wo ja, wo nein?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Pause', zeit: '5 Min.', wie: 'alle', icon: 'coffee',
          leitung: 'Wirklich Pause machen – auch Sie.',
          bausteine: [{ art: 'text', x: ['Aufstehen, trinken, Fenster auf. Danach geht es weiter.'] }],
        },
        {
          titel: 'Die große Runde: die Brücke', zeit: '25 Min.', wie: 'alle · mit Rollen', icon: 'building-bridge',
          leitung: 'Rollen sind Aufgaben, kein Schauspiel; tauschen ist freiwillig. Die zwei Minuten Stille stoppen. Nicht mitbauen – beobachten, wessen Idee gebaut wird.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Zusammen etwas bauen – mit lauten und leisen Rollen.',
              material: '20 Blatt Papier, Klebeband, eine volle 0,5-Liter-Flasche, zwei Stühle, die Rollen-Karten (bringt die Leitung mit)',
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
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: 6 Rollen-Karten', zeit: '', wie: 'zu Station 6', icon: 'scissors', fort: true,
          bausteine: [
            {
              art: 'karten', spalten: 3, hoehe: 22, hinweis: 'Rollen-Karten: einmal drucken, ausschneiden, verdeckt ziehen lassen.',
              karten: [
                { t: 'Starter', x: 'Du sagst: „Los, erste Idee!“', marke: 'laut' },
                { t: 'Fan', x: 'Du sagst, was schon hält.', marke: 'laut' },
                { t: 'Sprecher', x: 'Du sagst am Ende, warum sie hält.', marke: 'laut' },
                { t: 'Zuhörer', x: 'Du sagst: „Bisher haben wir …“', marke: 'leise' },
                { t: 'Prüfer', x: 'Du fragst: „Moment – hält das?“', marke: 'leise' },
                { t: 'Frager', x: 'Du fragst, wer noch still ist: „Was denkst du?“', marke: 'leise' },
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
              { f: 'Wo kommst du am besten runter? Schreib oder zeichne den Ort.', feld: 42 },
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
              art: 'akte', titel: 'Akte · Seite 1', kopf: 'Yusuf, 13', stempel: 'unvollständig',
              eintraege: ['laut im Unterricht', 'gibt Widerworte', 'zwei Verwarnungen', 'Auf die Frage „Was kannst du gut?“: „Nichts Besonderes.“'],
              daneben: { titel: 'Was nicht drinsteht', punkte: ['Bringt jeden Morgen seine kleine Schwester zur Schule.', 'Erklärt dem Neuen in der Klasse alles zweimal.', 'Hat seinem Kumpel nach dem Streit als Erster geschrieben.'] },
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
      ],
    },
    {
      stationen: [
        {
          titel: 'Pause', zeit: '5 Min.', wie: 'alle', icon: 'coffee',
          leitung: 'Wirklich Pause machen – auch Sie.',
          bausteine: [{ art: 'text', x: ['Aufstehen, trinken, Fenster auf. Danach geht es weiter.'] }],
        },
        {
          titel: 'Die große Runde: der Stärken-Markt', zeit: '30 Min.', wie: 'alle', icon: 'building-store',
          leitung: 'Karten vorher ausschneiden (Kopiervorlage zweimal drucken). Mitgehen und darauf achten, dass niemand leer ausgeht – auch Sie bekommen Karten.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Stärken bei anderen sehen – und sie ihnen sagen.',
              material: 'die Stärken-Karten (bringt die Leitung mit), Stifte, ein Tisch als Markt',
              schritte: [
                'Alle Karten liegen offen auf dem Tisch.',
                'Such dir für jede Person aus der Gruppe eine Karte aus, die zu ihr passt.',
                'Schreib auf die Rückseite das „weil …“ – drei Wörter reichen. Dann geh hin und gib sie ab: „Die passt zu dir, weil …“',
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
              art: 'karten', wort: true, spalten: 4, hoehe: 30, hinweis: 'Zweimal drucken (48 Karten), an den gestrichelten Linien ausschneiden. Die leeren Karten sind für Stärken, die fehlen.',
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
          titel: 'Meine Akte, Seite 2', zeit: '10 Min.', wie: 'allein', icon: 'folder',
          leitung: 'Stille Arbeit. Sagen Sie: „Diese Akte gehört dir. Keiner sammelt sie ein.“ Klebestift bereitlegen.',
          bausteine: [
            { art: 'text', x: ['Yusufs Akte war unvollständig. Deine auch – bis jetzt. **Kleb deine drei liebsten Karten ein.** Schreib daneben das „weil …“ von der Rückseite.'] },
            { art: 'fragen', fragen: [{ f: 'Hier einkleben – drei Karten nebeneinander:', feld: 34 }] },
            {
              art: 'akte', titel: 'Akte · Seite 2', kopf: 'Meine Akte', stempel: 'vollständiger',
              eintraege: ['Karte 1 – weil …', 'Karte 2 – weil …', 'Karte 3 – weil …', 'Das hat keiner gesehen:'],
              daneben: { titel: 'Zum Schluss', punkte: ['Eine Stärke dazuschreiben, die keiner gesehen hat.', 'Den Stempel ausmalen.'] },
              fragen: [{ f: 'Welche Karte hättest du dir selbst nie gegeben?', linien: 1 }],
            },
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
