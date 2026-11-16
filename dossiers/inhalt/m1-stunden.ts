// REAL TALK #01 · ICH – die drei Einheiten als zusammenhängende Stunden (16.11.2026).
// Jede Stunde hat einen eigenen Aufbau und einen roten Faden: Der Fall vom Anfang kommt bei Clip, Modell und Schluss wieder vor.
// Alle Personen und Situationen sind erfunden.
import type { Stunde } from '../typen'

/* ---------- Stunde 1 · Leerer Tank: vom Fall zum Modell zur Aktion ---------- */
const tank: Stunde = {
  frage: 'Warum bist du manchmal sauer – und keiner hat dir etwas getan?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sechs Tanks nennen', 'am Verhalten erkennen, welcher blinkt', 'deinen in zehn Minuten auffüllen'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Ankommen: dein Tag bis jetzt', zeit: '5 Min.', wie: 'allein', icon: 'door-enter',
          bausteine: [
            { art: 'fragen', kontext: 'Bevor es losgeht – nur für dich. Du brauchst es am Ende der Stunde noch einmal.', fragen: [
              { f: 'Wie ist deine Laune gerade?', strich: ['im Keller', 'richtig gut'] },
              { f: 'Was hat dich heute schon genervt? Ein Stichwort reicht.', linien: 1 },
            ] },
          ],
        },
        {
          titel: 'Der Fall Nele', zeit: '10 Min.', wie: 'lesen · zu zweit', icon: 'search',
          bausteine: [
            {
              art: 'fall', bild: 'peep:nele:muede', name: 'Nele, 15',
              text: 'Dritte Stunde. Die Lehrerin fragt freundlich: „Nele, bist du bei uns?“ Nele knallt das Heft auf den Tisch und geht. Auf dem Flur weiß sie selbst nicht, warum sie so sauer ist. Hier ist, was vorher war:',
              zeitleiste: [['0:45', 'Letztes Video. Handy weg.'], ['1:50', 'Liegt wach. Schaut noch mal aufs Handy.'], ['6:10', 'Wecker. Vier Stunden Schlaf.'], ['7:05', 'Kein Frühstück. Ein Energydrink auf dem Weg.'], ['10:20', '„Nele, bist du bei uns?“ – Knall.']],
              fragen: [
                { f: 'Wer oder was ist schuld an dem Knall? Kreuz an – mehrere gehen.', kreuz: ['die Lehrerin', 'Nele', 'die Nacht davor', 'der Energydrink', 'niemand'] },
                { f: 'Nele sagt: „Ich weiß selbst nicht, warum ich so sauer war.“ Was antwortest du ihr?', linien: 2 },
                { f: 'Sauer sein, und keiner hat dir etwas getan – kennst du das?', kreuz: ['oft', 'manchmal', 'nie'] },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip: Was die Nacht mit dir macht', zeit: '15 Min.', wie: 'alle', icon: 'player-play',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Mehr als lebenswichtig: Darum schlafen wir!', kanal: 'Quarks', url: 'https://www.youtube.com/watch?v=sdH-fEEh1uY', dauer: 'Ausschnitt, etwa 6 Min.', frage: 'Was macht dein Körper nachts – und was hat Nele am Morgen gefehlt?' },
              vorher: [
                { f: 'Schätz: Wie viele Stunden Schlaf braucht jemand in deinem Alter?', zahl: ['Stunden'] },
                { f: 'Was passiert nach einer zu kurzen Nacht zuerst?', kreuz: ['die Laune kippt', 'der Kopf wird langsam', 'der Körper wird schlapp'], unter: true },
              ],
              dabei: ['Das passiert im Schlaf:', 'Das passiert bei zu wenig Schlaf:', 'Das war mir neu:'],
              nachher: [
                { f: 'Was aus dem Clip erklärt Neles Vormittag?', linien: 2 },
                { f: 'Der Energydrink: Hilfe oder nur verschoben? Begründe.', linien: 2 },
              ],
            },
          ],
        },
        {
          titel: 'Das Modell: sechs Tanks', zeit: '10 Min.', wie: 'alle', icon: 'gauge',
          bausteine: [
            { art: 'text', x: ['Schlaf ist nur **einer** von sechs Tanks, auf denen ein Mensch läuft. Ist einer leer, blinkt ein Warnlicht – meistens als Laune oder als Verhalten, das andere nervt.'] },
            {
              art: 'modell', warnTitel: 'Warnlicht',
              punkte: [
                { icon: 'bed', t: 'Körper', x: 'Schlaf, Essen, Trinken, Bewegung.', warn: 'gereizt, müde, Kopfweh' },
                { icon: 'shield', t: 'Sicherheit', x: 'Wissen, was kommt und wer da ist.', warn: 'unruhig, misstrauisch, auf dem Sprung' },
                { icon: 'users', t: 'Dazugehören', x: 'Leute, zu denen du gehörst.', warn: 'neidisch, klammern oder abhauen' },
                { icon: 'ear', t: 'Ernst genommen', x: 'Jemand hört, was du sagst.', warn: 'gekränkt, laut werden, dichtmachen' },
                { icon: 'steering-wheel', t: 'Selbst entscheiden', x: 'Etwas bestimmen dürfen.', warn: 'trotzig, „mir doch egal“' },
                { icon: 'confetti', t: 'Spaß und Neues', x: 'Etwas erleben, das neu ist.', warn: 'gelangweilt, zappelig, Blödsinn' },
              ],
            },
            { art: 'fragen', fragen: [{ f: 'Zurück zu Nele: Körper war leer. Welcher **zweite** Tank hat geblinkt, als sie vor allen angesprochen wurde?', linien: 1 }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: Warnlicht-Raten', zeit: '30 Min.', wie: 'zu zweit · dann zwei Teams', icon: 'masks-theater',
          bausteine: [
            { art: 'fragen', kontext: '**Zum Warmwerden (zu zweit, 5 Min.):** Welcher Tank ist hier leer? Ein Kreuz pro Zeile.', fragen: [
              { f: 'Probe-Runde:', raster: { spalten: ['Körper', 'sicher', 'dazu', 'ernst', 'selbst', 'Spaß'], zeilen: ['Alle haben eine Gruppe – du noch nicht', 'Jemand lacht über deine Antwort', 'Den ganzen Tag sagt dir jemand, was du tun sollst', 'Sonntag, Regen, nichts zu tun'] } },
            ] },
            {
              art: 'aktion',
              ziel: 'Am Verhalten erkennen, welcher Tank leer ist – und eine Tankstelle finden, die ihn füllt.',
              material: 'die 18 Situations-Karten von der nächsten Seite (ausschneiden, mischen), eine Stoppuhr, das Modell von Station 4',
              schritte: [
                'Bildet zwei Teams. Die Karten liegen verdeckt in der Mitte.',
                'Eine Person zieht, liest still und spielt die Situation **30 Sekunden** vor.',
                'Das eigene Team rät den Tank: **1 Punkt.** Falsch? Das andere Team darf einmal raten.',
                '**Bonus-Punkt:** eine Tankstelle nennen, die diesen Tank in zehn Minuten füllt.',
                'Der Tank steht klein auf der Karte. Ansagen, Punkte eintragen, wechseln.',
              ],
              runden: [
                { t: 'Runde 1 · ohne Worte', x: 'Nur Körper und Gesicht. Kein Ton.' },
                { t: 'Runde 2 · ein Satz', x: 'Ein einziger Satz, den die Person in dem Moment sagen würde.' },
                { t: 'Runde 3 · doppelt', x: 'Zwei Karten ziehen und in einer Szene spielen. Beide Tanks raten.' },
              ],
              regeln: ['Gespielt werden nur die Karten – niemand aus der Gruppe.', 'Wer nicht spielen will, stoppt die Zeit oder zählt die Punkte.'],
              zu3: 'Ein Team. Die Leitung spielt, ihr ratet gegen die Uhr: Wie viele Karten schafft ihr in drei Minuten?',
              wertung: { kopf: ['Punkte', 'Runde 1', 'Runde 2', 'Runde 3', 'Summe'], zeilen: ['Team A', 'Team B'] },
              notiz: { titel: 'Die drei besten Tankstellen der Runde – ihr braucht sie gleich bei Station 6:', linien: 3 },
              auswertung: ['Welche Karte war am schwersten zu raten – und warum?', 'Bei welcher Situation hätten zwei Tanks gepasst?', 'Welche Tankstelle war die beste Idee der Runde?'],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: 18 Situationen', zeit: '', wie: 'zu Station 5', icon: 'scissors', fort: true,
          bausteine: [
            {
              art: 'karten', spalten: 3, hoehe: 35, hinweis: 'An den gestrichelten Linien ausschneiden. Wer das Heft ganz lassen will: Seite kopieren.',
              karten: [
                { t: 'Du hast die halbe Nacht gezockt. Erste Stunde: Test.', marke: 'Körper' },
                { t: 'Kein Frühstück, kein Pausenbrot. Es ist 12 Uhr, jemand fragt dich etwas.', marke: 'Körper' },
                { t: 'Sechs Stunden gesessen. Jetzt sollst du noch still Aufgaben machen.', marke: 'Körper' },
                { t: 'Neuer Stundenplan. Keiner sagt dir, in welchen Raum du musst.', marke: 'Sicherheit' },
                { t: 'Deine Betreuerin ist krank. Niemand weiß, wer heute kommt.', marke: 'Sicherheit' },
                { t: 'Du hörst: In der Gruppe ändert sich bald etwas. Keiner sagt, was.', marke: 'Sicherheit' },
                { t: 'Pause. Alle stehen in Gruppen. Du stehst daneben.', marke: 'Dazugehören' },
                { t: 'Im Gruppenchat läuft eine Verabredung. Dich hat keiner gefragt.', marke: 'Dazugehören' },
                { t: 'Beim Sport werden Teams gewählt. Du bleibst bis zum Schluss stehen.', marke: 'Dazugehören' },
                { t: 'Du erklärst etwas. Mittendrin schaut dein Gegenüber aufs Handy.', marke: 'Ernst genommen' },
                { t: 'Du sagst deine Idee. Alle lachen – es war kein Witz.', marke: 'Ernst genommen' },
                { t: 'Du sagst zum dritten Mal Nein. Es wird wieder überhört.', marke: 'Ernst genommen' },
                { t: 'Von morgens bis abends sagt dir jemand, was du tun sollst.', marke: 'Selbst entscheiden' },
                { t: 'Über dein Wochenende wird entschieden. Gefragt hat dich keiner.', marke: 'Selbst entscheiden' },
                { t: 'Du willst es auf deine Art machen. Jemand nimmt dir das Werkzeug aus der Hand.', marke: 'Selbst entscheiden' },
                { t: 'Sonntag, Regen, WLAN weg. Seit Stunden passiert nichts.', marke: 'Spaß und Neues' },
                { t: 'Jede Woche derselbe Ablauf. Du kennst jeden Satz, der gleich kommt.', marke: 'Spaß und Neues' },
                { t: 'Alle erzählen vom Wochenende. Bei dir war nichts los.', marke: 'Spaß und Neues' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Für dich: meine Tanks heute', zeit: '10 Min.', wie: 'allein', icon: 'user',
          bausteine: [
            {
              art: 'fragen', kontext: 'Nur für dich – niemand sammelt das ein. **0** = leer, **10** = randvoll.',
              fragen: [
                { f: 'Kreise ein, wie voll jeder Tank gerade ist:', regler: ['Körper', 'Sicherheit', 'Dazugehören', 'Ernst genommen', 'Selbst entscheiden', 'Spaß und Neues'] },
              ],
            },
            {
              art: 'menue', titel: 'Schnell-Tankstellen – höchstens zehn Minuten, ohne jemanden überreden zu müssen',
              gruppen: [
                { t: 'Körper', punkte: ['etwas Richtiges essen, Wasser trinken', 'zehn Minuten an die Luft', 'heute eine halbe Stunde früher ins Bett'] },
                { t: 'Sicherheit', punkte: ['nachfragen: „Was passiert morgen?“', 'den Plan für morgen aufschreiben', 'an einen Ort gehen, den du kennst'] },
                { t: 'Dazugehören', punkte: ['jemandem schreiben, der dir guttut', 'dich zu jemandem dazusetzen', 'bei etwas mitmachen, das schon läuft'] },
                { t: 'Ernst genommen', punkte: ['sagen: „Hör mir kurz zu.“', 'aufschreiben, was du sagen willst', 'es der Person sagen, die wirklich zuhört'] },
                { t: 'Selbst entscheiden', punkte: ['eine Sache heute selbst bestimmen', 'fragen: „Darf ich es auf meine Art machen?“', 'zwischen zwei Möglichkeiten wählen'] },
                { t: 'Spaß und Neues', punkte: ['einen neuen Weg gehen', 'etwas zum ersten Mal ausprobieren', 'ein Lied laut hören'] },
              ],
            },
            { art: 'fragen', fragen: [{ f: 'Blätter zurück zu Station 1: Was hat dich heute genervt – und welcher Tank steckte dahinter?', satz: ['Der Tank dahinter:'] }, { f: 'Kreuz oben eine Tankstelle für diesen Tank an – oder schreib eine aus der großen Runde auf:', satz: ['Meine Tankstelle:'] }] },
          ],
        },
        {
          titel: 'Schluss: ein Satz für Nele', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Es ist 7:05 Uhr. Nele steht mit dem Energydrink an der Haltestelle. Was schreibst du ihr?', linien: 1 }] },
            { art: 'merk', x: 'Erst tanken. ==Dann streiten.==' },
            { art: 'woche', x: 'Füll deinen blinkenden Tank auf – **dreimal, je höchstens zehn Minuten.** Ein Kreuz pro Mal.', kaestchen: ['1', '2', '3'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Stunde 2 · Laut oder leise: erst erleben, dann verstehen ---------- */
const lautLeise: Stunde = {
  frage: 'Was verliert eine Gruppe, wenn nur die Lauten zählen?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, wo du zwischen laut und leise stehst', 'die Stärke der anderen Seite nennen', 'die andere Seite einmal ausprobieren'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Erst machen: die Olympiade', zeit: '15 Min.', wie: 'alle · im Stehen', icon: 'trophy',
          bausteine: [
            { art: 'text', x: ['Vier kurze Disziplinen, keine Sieger. Achte nur auf eins: **Was fällt dir leicht – und was kostet dich Überwindung?** Kreuz nach jeder Runde an.'] },
            {
              art: 'tabelle', breiten: '27mm auto 15mm 15mm 15mm', kopf: ['Disziplin', 'So geht es', 'leicht', 'ging', 'schwer'],
              zeilen: [
                ['Schweige-Reihe', 'Stellt euch nach Geburtstag auf – Januar links, Dezember rechts. Kein einziges Wort.', '', '', ''],
                ['Marktschreier', '20 Sekunden lang einen Stift anpreisen, als wäre er das Beste der Welt. Wer mag.', '', '', ''],
                ['Lippenlesen', 'Sag einen Satz ohne Ton. Die anderen lesen ihn von deinen Lippen ab.', '', '', ''],
                ['Dirigent', 'Eine Person steuert mit der Hand die Lautstärke: Alle summen – lauter, leiser, Stopp.', '', '', ''],
              ],
            },
            { art: 'fragen', fragen: [{ f: 'Meine leichteste Disziplin war eher …', kreuz: ['eine laute', 'eine leise', 'beides ging'] }] },
          ],
        },
        {
          titel: 'Die Linie', zeit: '10 Min.', wie: 'alle · dann allein', icon: 'ruler-measure',
          bausteine: [
            { art: 'text', x: ['Ein Klebeband quer durch den Raum: ein Ende heißt **laut**, das andere **leise**. Stell dich dahin, wo du dich meistens siehst. Dann dasselbe im Heft – ein Kreuz pro Linie, die Mitte ist erlaubt.'] },
            { art: 'fragen', fragen: [{ f: 'Ich bin eher …', striche: [['laut', 'leise'], ['spontan', 'plane gern'], ['unter Leuten', 'für mich'], ['rede gern', 'höre gern zu'], ['probiere sofort', 'schaue erst zu']] }, { f: 'An welchem Ort stehst du auf der Linie ganz woanders als hier?', linien: 1 }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Das Protokoll: Gruppenarbeit, 20 Minuten', zeit: '12 Min.', wie: 'lesen · zu zweit', icon: 'file-text',
          bausteine: [
            {
              art: 'chat', titel: 'Vier Leute, ein Plakat, Abgabe morgen',
              zeilen: [
                { zeit: '10:02', wer: 'Sami', x: 'Ich hab’s! Wir drehen ein Video. Oder wir bauen ein Modell!' },
                { zeit: '10:05', wer: 'Lehrer', x: 'Gut, Sami, dass du anfängst.' },
                { zeit: '10:06', wer: 'Amira', x: 'Abgabe ist morgen. Ein Video schaffen wir nie.', art: 'denkt' },
                { zeit: '10:09', wer: 'Sami', x: 'redet weiter. Drei Ideen, eine davon ist gut.', art: 'tut' },
                { zeit: '10:14', wer: 'Amira', x: 'holt Luft. Sami ist schon beim nächsten Satz.', art: 'tut' },
                { zeit: '10:20', wer: 'Lehrer', x: 'Sami, gut mitgemacht. Amira, du musst dich mehr beteiligen.' },
                { zeit: '10:21', wer: 'Amira', x: 'nickt. Den Fehler im Plan behält sie für sich.', art: 'tut' },
              ],
              fragen: [
                { f: 'Mach die Rechnung für die Gruppe auf:', preis: { erste: 'Wer', kopf: ['bringt der Gruppe', 'kostet die Gruppe'], optionen: ['Sami (laut)', 'Amira (leise)'] } },
                { f: 'Um 10:14 holt Amira Luft. Was hätte **eine** Person tun können, damit die Gruppe ihren Satz bekommt?', linien: 1 },
              ],
            },
          ],
        },
        {
          titel: 'Clip: laut, leise, glücklich?', zeit: '12 Min.', wie: 'alle', icon: 'player-play',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Introvertiert | extrovertiert: Wer ist glücklicher?', kanal: 'Terra Xplore', url: 'https://www.youtube.com/watch?v=x_un3Ojno7Y', dauer: 'die ersten 5 Min.', frage: 'Wer hat es leichter – und stimmt das überhaupt?' },
              vorher: [{ f: 'Dein Tipp: Wer ist glücklicher?', kreuz: ['die Lauten', 'die Leisen', 'kein Unterschied'], unter: true }],
              dabei: ['Das können die Leisen gut:', 'Das können die Lauten gut:', 'Das hat mich überrascht:'],
              nachher: [{ f: 'Hat der Clip deinen Tipp bestätigt?', kreuz: ['ja', 'nein', 'halb'] }, { f: 'Was würde der Clip dem Lehrer von Amira sagen?', linien: 2 }],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: die Brücke', zeit: '25 Min.', wie: 'alle · mit Rollen', icon: 'building-bridge',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Als Gruppe etwas bauen, bei dem die Lauten und die Leisen gebraucht werden – und merken, was jede Seite beiträgt.',
              material: '20 Blatt Papier, Klebeband, eine volle Plastikflasche, zwei Stühle, die sechs Rollen-Karten von unten',
              schritte: [
                'Der Auftrag: Baut aus Papier und Klebeband eine Brücke zwischen zwei Stühlen (40 cm Abstand). Sie muss die volle Flasche **zehn Sekunden** tragen.',
                'Jede Person zieht eine Rollen-Karte. Wer sonst laut ist, tauscht gegen eine leise Rolle – und umgekehrt.',
                '**Zwei Minuten Stille:** Jede Person zeichnet allein ihre Idee. Dann zeigt jede reihum ihr Blatt – auch die, die sonst nichts sagen.',
                '**Zehn Minuten bauen.** Jede Person bleibt in ihrer Rolle.',
                'Test mit der Flasche. Hält sie? Einmal nachbessern ist erlaubt.',
              ],
              regeln: ['Keine Idee wird ausgelacht. Erst alle Blätter ansehen, dann entscheiden.', 'Wer nicht bauen will, ist Zeitwächter oder prüft die Brücke.'],
              zu3: 'Jede Person nimmt zwei Rollen. Die Leitung ist Zeitwächter und baut nicht mit.',
              auswertung: ['Wessen Idee steckt in der Brücke – und wäre sie ohne die Stille aufgetaucht?', 'Welche Rolle hat der Gruppe am meisten geholfen?', 'Was war anders als bei eurer letzten Gruppenarbeit?'],
            },
            {
              art: 'karten', spalten: 3, hoehe: 25, hinweis: 'Rollen-Karten: ausschneiden und verdeckt ziehen.',
              karten: [
                { t: 'Starter', x: 'Du fängst an und sagst: „Los, erste Idee!“', marke: 'laut' },
                { t: 'Stimmung', x: 'Du feuerst an, wenn es hakt.', marke: 'laut' },
                { t: 'Sprecher', x: 'Du erklärst am Ende, wie die Brücke hält.', marke: 'laut' },
                { t: 'Zuhörer', x: 'Du fasst zusammen: „Bisher haben wir …“', marke: 'leise' },
                { t: 'Prüfer', x: 'Du schaust genau hin: „Moment – hält das?“', marke: 'leise' },
                { t: 'Frager', x: 'Du fragst die Stillste: „Was denkst du?“', marke: 'leise' },
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
          bausteine: [
            {
              art: 'fragen', kontext: 'Jede Seite bringt etwas – und kostet etwas. Mach deine eigene Rechnung auf.',
              fragen: [
                { f: 'Laut sein und leise sein:', preis: { erste: 'Seite', kopf: ['bringt mir', 'kostet mich'], optionen: ['laut sein', 'leise sein'] } },
                { f: 'Meine Rolle beim Brückenbau war:', kreuz: ['wie immer', 'ungewohnt, aber okay', 'ungewohnt und anstrengend'] },
                { f: 'Wo wärst du gern ein Stück mehr auf der anderen Seite?', linien: 2 },
              ],
            },
          ],
        },
        {
          titel: 'Schluss: Amiras Satz', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Morgen ist wieder Gruppenarbeit. Welchen Satz sagt Amira als Erstes – und was sagt Sami, damit sie ihn sagen kann?', satz: ['Amira:', 'Sami:'] }] },
            { art: 'merk', x: 'Beide Seiten ==punkten.==' },
            { art: 'woche', x: 'Probier die andere Seite: Bist du eher leise, sag einmal **als Erstes** etwas. Bist du eher laut, hör einmal **nur zu**.', kaestchen: ['gemacht'] },
          ],
        },
        {
          titel: 'Wenn noch Zeit ist: Punkte-Galerie', zeit: '10 Min.', wie: 'alle · freiwillig', icon: 'photo',
          bausteine: [
            { art: 'text', x: ['Jede Person hängt ein Blatt mit ihrem Namen und den fünf leeren Linien von Station 2 auf. Schweigend kleben alle Punkte: **Wo sehe ich dich?** Keine Kommentare. Danach vergleicht jede Person für sich: Wo sehen mich die anderen anders als ich mich? Zu dritt klebt die Leitung mit – und du wählst selbst, auf welchen Linien geklebt wird.'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Stunde 3 · Was du kannst: zeigen, Akte prüfen, Stärken handeln ---------- */
const kannst: Stunde = {
  frage: 'Was steht in keiner Akte über dich?',
  dauer: 'etwa 90 Minuten',
  kannst: ['drei eigene Stärken nennen – mit Beweis', 'jemandem eine Stärke sagen', 'sagen, was dich hält'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Zehn Sekunden Ruhm', zeit: '10 Min.', wie: 'alle', icon: 'microphone-2',
          bausteine: [
            { art: 'text', x: ['Jede Person zeigt zehn Sekunden lang etwas, das sie kann. **Je kleiner und schräger, desto besser:** pfeifen, einen Stift drehen, einen Zungenbrecher, in drei Sprachen bis fünf zählen. Wer nichts zeigen will, sagt einen Satz: „Ich kann …“ Geklatscht wird bei allen gleich laut.'] },
            { art: 'fragen', fragen: [{ f: 'Was hat dich bei jemand anderem überrascht?', linien: 1 }] },
          ],
        },
        {
          titel: 'Die Akte Yusuf', zeit: '15 Min.', wie: 'lesen · zu zweit', icon: 'folder',
          bausteine: [
            {
              art: 'akte', titel: 'Akte · Seite 1', kopf: 'Yusuf, 16', stempel: 'unvollständig',
              eintraege: ['laut im Unterricht', 'impulsiv, gibt Widerworte', 'zwei Verwarnungen', 'verlässt den Raum ohne Erlaubnis', 'Auf die Frage „Was kannst du gut?“: „Nichts Besonderes.“'],
              daneben: { titel: 'Was nicht drinsteht', punkte: ['Bringt jeden Morgen seine kleine Schwester zur Schule.', 'Erklärt dem Neuen in der Werkstatt alles zweimal.', 'Hat noch nie einen Freund verpfiffen.'] },
              fragen: [{ f: 'Schreib **Seite 2** der Akte: drei Stärken von Yusuf – jede mit Beweis.', linien: 0 }],
            },
            { art: 'tabelle', breiten: '9mm 42% auto', kopf: ['Nr.', 'Stärke', 'Beweis: Daran sieht man sie'], zeilen: [['1', '', ''], ['2', '', ''], ['3', '', '']], hoehe: 9 },
            { art: 'fragen', fragen: [{ f: 'Yusuf sagt: „Nichts Besonderes.“ Warum sagt er das, obwohl es nicht stimmt?', linien: 2 }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip: Was bin ich wert?', zeit: '12 Min.', wie: 'alle', icon: 'player-play',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Ich bin nichts wert – so steigerst du dein Selbstwertgefühl', kanal: 'BUBBLES', url: 'https://www.youtube.com/watch?v=XZzcGOxqBy8', dauer: 'die ersten 5 Min.', frage: 'Woher weiß ein Mensch, was er wert ist?' },
              vorher: [{ f: 'Was zählt am meisten dafür, wie du über dich denkst?', kreuz: ['Noten', 'was andere sagen', 'was ich selbst über mich denke', 'was ich für andere tue'], unter: true }],
              dabei: ['Tipp 1 aus dem Clip:', 'Tipp 2 aus dem Clip:', 'Dieser Satz ist hängen geblieben:'],
              nachher: [{ f: 'Welcher Tipp ist machbar – und welcher klingt nur gut?', linien: 2 }, { f: 'Welcher Tipp hätte Yusuf vor der Frage der Betreuerin geholfen?', linien: 1 }],
            },
          ],
        },
        {
          titel: 'Die große Runde: der Stärken-Markt', zeit: '25 Min.', wie: 'alle', icon: 'building-store',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Stärken bei anderen sehen und sagen – und merken, dass eine Gruppe jede davon braucht.',
              material: 'die 24 Stärken-Karten von der nächsten Seite (ausschneiden), ein Tisch als Markt',
              schritte: [
                '**Verschenken (8 Min.):** Zieh drei Karten. Überleg: Zu wem aus der Gruppe passt jede? Geh hin und gib sie ab – mit einem Satz: „Die passt zu dir, weil …“',
                'Niemand geht leer aus. Darauf achtet die Leitung – und bekommt selbst auch Karten.',
                '**Die Crew (12 Min.):** Der Auftrag: „In zwei Stunden kommen 40 Leute zum Grillfest. Nichts ist vorbereitet.“ Jede Person nimmt sich einen Job, der zu einer ihrer Karten passt, und trägt ihn im Crew-Plan auf der nächsten Seite ein.',
                'Die anderen dürfen ergänzen: „Und du könntest auch …“ Am Ende hat jede Person einen Job.',
              ],
              regeln: ['Karten werden nur verschenkt, nie zurückgewiesen. Ein „Danke“ reicht.'],
              zu3: 'Jede Person bekommt von jeder anderen mindestens eine Karte – auch die Leitung.',
              auswertung: ['Welche Karte, die du bekommen hast, hat dich überrascht?', 'Welchen Job hätte ohne euch niemand übernommen?'],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: Crew-Plan und 24 Stärken', zeit: '', wie: 'zu Station 4', icon: 'scissors', fort: true,
          bausteine: [
            { art: 'tabelle', breiten: '46mm 42mm auto', kopf: ['Job beim Grillfest', 'Wer übernimmt?', 'Mit welcher Stärke?'], zeilen: [['Einkaufen mit wenig Geld', '', ''], ['Grill und Essen', '', ''], ['Musik und Stimmung', '', ''], ['Aufbauen und Leute begrüßen', '', ''], ['Wenn etwas schiefgeht', '', '']], hoehe: 8 },
            {
              art: 'karten', wort: true, spalten: 4, hoehe: 25, hinweis: 'An den gestrichelten Linien ausschneiden. Die leeren Karten sind für Stärken, die fehlen.',
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
          titel: 'Für dich: mein Baum', zeit: '12 Min.', wie: 'allein', icon: 'tree',
          bausteine: [
            { art: 'text', x: ['Ein Baum steht, weil unten etwas hält. Schreib von unten nach oben – **nur, was du teilen willst.** Bei den Wurzeln zählen auch Orte, Tiere, Musik und Erinnerungen, nicht nur Menschen.'] },
            {
              art: 'fragen',
              fragen: [
                { f: 'Mein Baum:', satz: ['Früchte – darauf bin ich stolz:', 'Äste – das lerne ich gerade:', 'Stamm – das kann ich:', 'Wurzeln – das hält mich:'] },
                { f: 'Wer mag, zeichnet ihn. Krumm ist erlaubt – die meisten Bäume sind es.', feld: 46 },
                { f: 'Welche Stärken-Karten hast du heute bekommen – und welche Stärke kennt die Gruppe noch nicht?', satz: ['Bekommen:', 'Kennt noch keiner:'] },
              ],
            },
          ],
        },
        {
          titel: 'Schluss: die andere Akte', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Die Betreuerin fragt dich: „Was kannst du gut?“ Der erste Satz deiner anderen Akte:', linien: 2 }] },
            { art: 'merk', x: 'Du bist mehr ==als deine Akte.==' },
            { art: 'woche', x: 'Sag einer Person eine Stärke, die du an ihr siehst – **und woran du sie gemerkt hast.**', kaestchen: ['gesagt'] },
          ],
        },
      ],
    },
  ],
}

export const stunden: Stunde[] = [tank, lautLeise, kannst]
