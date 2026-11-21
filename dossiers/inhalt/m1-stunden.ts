// REAL TALK #01 · ICH – die drei Einheiten als zusammenhängende Stunden (16.11.2026).
// Jede Stunde hat einen eigenen Aufbau und einen roten Faden: Der Fall vom Anfang kommt bei Clip, Modell und Schluss wieder vor.
// Alle Personen und Situationen sind erfunden.
import type { Stunde } from '../typen'

/* ---------- Stunde 1 · Leerer Tank: vom Fall zum Modell zur Aktion ---------- */
const tank: Stunde = {
  frage: 'Warum bist du manchmal sauer – und keiner hat dir etwas getan?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sechs Tanks nennen', 'am Verhalten erkennen, welcher blinkt', 'deinen Tank in zehn Minuten auffüllen'],
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
                { f: 'Nele sagt: „Ich weiß selbst nicht, warum ich so sauer war.“ Was glaubst du?', kreuz: ['Sie war müde und hungrig.', 'Die Lehrerin war unfair.', 'Nele ist einfach so.'], unter: true },
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
              dabei: ['Das passiert im Schlaf:', 'Das passiert bei zu wenig Schlaf:'],
              nachher: [
                { f: 'Was hat Nele am Morgen gefehlt?', kreuz: ['Schlaf', 'Essen', 'beides'] },
                { f: 'Hilft der Energydrink Nele wirklich?', kreuz: ['ja', 'nur kurz', 'nein'] },
                { f: 'Warum?', linien: 1 },
              ],
            },
          ],
        },
        {
          titel: 'Das Modell: sechs Tanks', zeit: '10 Min.', wie: 'alle', icon: 'gauge',
          bausteine: [
            { art: 'text', x: ['Schlaf ist nur **einer** von sechs Tanks, auf denen ein Mensch läuft. Ist einer leer, blinkt ein Warnlicht – meistens als Laune oder als Verhalten, das andere nervt. Was einen Tank wieder füllt, heißt hier **Tankstelle**.'] },
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
            { art: 'fragen', fragen: [{ f: 'Zurück zu Nele: Der Tank „Körper“ war leer. Die Lehrerin spricht sie vor allen an. Welcher Tank blinkt jetzt auch noch?', linien: 1 }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: Tank-Detektive', zeit: '30 Min.', wie: 'zu zweit · dann zwei Teams am Tisch', icon: 'cards',
          bausteine: [
            { art: 'fragen', kontext: '**Zum Warmwerden (zu zweit oder zu dritt, 5 Min.):** Welcher Tank ist hier leer? Ein Kreuz pro Zeile.', fragen: [
              { f: 'Probe-Runde:', raster: { spalten: ['1 Körper', '2 sicher', '3 dazu', '4 ernst', '5 selbst', '6 Spaß'], zeilen: ['Alle haben eine Gruppe – du noch nicht', 'Jemand lacht über deine Antwort', 'Den ganzen Tag sagt dir jemand, was du tun sollst', 'Sonntag, Regen, nichts zu tun'] } },
            ] },
            {
              art: 'aktion',
              ziel: 'An einer Situation erkennen, welcher Tank leer ist – und eine Tankstelle finden, die ihn füllt. **Niemand spielt etwas vor:** Es wird gelesen, gezeigt und gelegt.',
              material: 'die 18 Situations-Karten von der nächsten Seite (ausschneiden, mischen) und das Modell von Station 4 – die Tanks haben die Nummern 1 bis 6',
              schritte: [
                'Zwei Teams am Tisch. Die Leitung liest eine Karte vor – ohne den Tank, der unten draufsteht.',
                'Alle überlegen still. Auf „drei“ zeigen **alle gleichzeitig** mit den Fingern die Nummer des Tanks.',
                'Zeigt die Mehrheit im Team den richtigen Tank: **1 Punkt.** Zeigt ihr verschiedene Tanks? Kurz sagen, warum – oft passen zwei.',
                '**Bonus-Punkt:** Das Team nennt eine Tankstelle, die diesen Tank in zehn Minuten füllt.',
                'Die Karte kommt auf den Platz ihres Tanks. Am Ende liegen sechs Stapel auf dem Tisch.',
              ],
              runden: [
                { t: 'Runde 1 · zeigen', x: 'Karte hören, Nummer zeigen. Neun Karten.' },
                { t: 'Runde 2 · legen', x: 'Jedes Team legt vier der restlichen Karten zu den Tanks. Das andere Team prüft. Die letzte Karte legen alle zusammen.' },
                { t: 'Runde 3 · eigene Karte', x: 'Jedes Team erfindet eine Situation. Das andere Team rät den Tank.' },
              ],
              regeln: ['Niemand muss vorlesen oder etwas vorführen. Zeigen und legen reicht.'],
              zu3: 'Ein Team gegen die Karten: Zeigen alle drei den richtigen Tank, gibt es den Punkt. Ziel: zwölf von achtzehn. In Runde 2 und 3 prüft und rät die Leitung.',
              wertung: { kopf: ['Punkte', 'Runde 1', 'Runde 2', 'Runde 3', 'Summe'], zeilen: ['Team A', 'Team B'] },
              notiz: { titel: 'Die zwei besten Tankstellen der Runde – ihr braucht sie gleich bei Station 6:', linien: 1 },
              auswertung: ['Bei welcher Karte habt ihr verschiedene Tanks gezeigt? Warum?', 'Welche Situation kennt ihr selbst am besten?'],
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
              art: 'karten', spalten: 3, hoehe: 35, hinweis: 'Die Leitung bringt die Karten ausgeschnitten mit (Extra-Ausdruck).',
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
  frage: 'Was fehlt einer Gruppe, wenn nur die Lauten reden?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, wo du zwischen laut und leise stehst', 'die Stärke der anderen Seite nennen', 'die andere Seite einmal ausprobieren'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Erst machen: das Experiment', zeit: '12 Min.', wie: 'alle · am Tisch', icon: 'flask',
          bausteine: [
            { art: 'text', x: ['Dieselbe Aufgabe, zweimal – einmal laut, einmal leise. Die Aufgabe: **Was kann man alles mit einem Blatt Papier machen?** Niemand muss etwas vorführen. Die Leitung zählt mit.'] },
            {
              art: 'tabelle', breiten: '22mm auto 22mm 34mm', kopf: ['Runde', 'So geht es', 'Ideen', 'Von wie vielen Leuten?'], hoehe: 13,
              zeilen: [
                ['A · laut', 'Zwei Minuten: Alle sagen ihre Ideen einfach in die Runde. Jede Idee ist ein Strich.', '', ''],
                ['B · leise', 'Zwei Minuten: Jede Person schreibt still für sich. Dann zusammenzählen – doppelte Ideen nur einmal.', '', ''],
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'In welcher Runde hattest **du** mehr Ideen?', kreuz: ['A – laut', 'B – leise', 'gleich'] },
              { f: 'In welcher Runde kamen Ideen von **allen**?', kreuz: ['A – laut', 'B – leise', 'in beiden'] },
            ] },
          ],
        },
        {
          titel: 'Die Linie', zeit: '10 Min.', wie: 'allein · dann wer mag', icon: 'ruler-measure',
          bausteine: [
            { art: 'text', x: ['Zuerst im Heft: ein Kreuz pro Linie, wo du dich **meistens** siehst. Die Mitte ist erlaubt. Wer mag, stellt sich danach auf das Klebeband im Raum: ein Ende heißt **laut**, das andere **leise**.'] },
            { art: 'fragen', fragen: [{ f: 'Ich bin eher …', striche: [['laut', 'leise'], ['spontan', 'plane gern'], ['unter Leuten', 'für mich'], ['rede gern', 'höre gern zu'], ['probiere sofort', 'schaue erst zu']] }, { f: 'Wo bist du lauter als hier?', kreuz: ['zu Hause', 'bei Freunden', 'im Netz', 'nirgends'] }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Der Fall: Sami redet, Amira schweigt', zeit: '12 Min.', wie: 'lesen · zu zweit', icon: 'file-text',
          bausteine: [
            { art: 'text', x: ['Vier Leute sollen zusammen ein Plakat machen. **Morgen muss es fertig sein.**'] },
            {
              art: 'chat',
              zeilen: [
                { wer: 'Sami sagt:', x: 'Ich hab’s! Wir drehen ein Video!' },
                { wer: 'Der Lehrer sagt:', x: 'Gut, Sami, dass du anfängst.' },
                { wer: 'Amira denkt:', x: 'Ein Video schaffen wir nicht bis morgen.', art: 'denkt' },
                { wer: '', x: 'Amira will es sagen. Aber Sami redet und redet. Amira kommt nicht zu Wort.', art: 'tut' },
                { wer: 'Der Lehrer sagt:', x: 'Amira, du musst mehr mitmachen.' },
                { wer: '', x: 'Amira nickt. Ihre wichtige Idee hat keiner gehört.', art: 'tut' },
              ],
              fragen: [
                { f: 'Wer hat gemerkt, dass der Plan nicht klappt?', kreuz: ['Sami', 'Amira', 'der Lehrer'] },
                { f: 'Warum hört die Gruppe Amiras Idee nicht? Mehrere Kreuze gehen.', kreuz: ['Sami redet die ganze Zeit', 'Amira sagt nichts', 'keiner fragt Amira'] },
                { f: 'Beide können etwas gut. Was?', satz: ['Sami kann gut:', 'Amira kann gut:'] },
                { f: 'Mit welchem Satz hätte jemand Amira helfen können?', linien: 1 },
              ],
            },
          ],
        },
        {
          titel: 'Clip: laut, leise, glücklich?', zeit: '12 Min.', wie: 'alle', icon: 'player-play',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Introvertiert | extrovertiert: Wer ist glücklicher?', kanal: 'Terra Xplore', url: 'https://www.youtube.com/watch?v=x_un3Ojno7Y', dauer: 'die ersten 5 Min.', frage: 'Introvertiert heißt: eher leise. Extrovertiert heißt: eher laut. Wer hat es leichter?' },
              vorher: [{ f: 'Dein Tipp: Wer ist glücklicher?', kreuz: ['die Lauten', 'die Leisen', 'kein Unterschied'], unter: true }],
              dabei: ['Das können die Leisen gut:', 'Das können die Lauten gut:'],
              nachher: [{ f: 'War dein Tipp richtig?', kreuz: ['ja', 'nein', 'halb'] }, { f: 'Was sollte Amiras Lehrer über leise Leute wissen?', linien: 1 }],
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
                'Jede Person zieht eine Rollen-Karte. Die Rolle ist eine Aufgabe, kein Schauspiel. Wer mag, tauscht: sonst laut – heute eine leise Rolle.',
                '**Zwei Minuten Stille:** Jede Person zeichnet allein ihre Idee. Dann zeigt jede reihum ihr Blatt – auch die, die sonst nichts sagen.',
                '**Zehn Minuten bauen.** Jede Person bleibt in ihrer Rolle.',
                'Test mit der Flasche. Hält sie? Einmal nachbessern ist erlaubt.',
              ],
              regeln: ['Keine Idee wird ausgelacht. Erst alle Blätter ansehen, dann entscheiden.', 'Wer nicht bauen will, ist Zeitwächter oder prüft die Brücke.'],
              zu3: 'Jede Person nimmt zwei Rollen. Die Leitung ist Zeitwächter und baut nicht mit.',
              auswertung: ['Von wem kam die Idee, die ihr gebaut habt?', 'Welche Rolle hat der Gruppe am meisten geholfen?', 'Was war anders als bei eurer letzten Gruppenarbeit?'],
            },
            {
              art: 'karten', spalten: 3, hoehe: 25, hinweis: 'Rollen-Karten: ausschneiden und verdeckt ziehen.',
              karten: [
                { t: 'Starter', x: 'Du fängst an und sagst: „Los, erste Idee!“', marke: 'laut' },
                { t: 'Mutmacher', x: 'Du sagst, was schon gut klappt.', marke: 'laut' },
                { t: 'Sprecher', x: 'Du sagst am Ende in einem Satz, warum sie hält.', marke: 'laut' },
                { t: 'Zuhörer', x: 'Du fasst zusammen: „Bisher haben wir …“', marke: 'leise' },
                { t: 'Prüfer', x: 'Du schaust genau hin: „Moment – hält das?“', marke: 'leise' },
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
          bausteine: [
            {
              art: 'fragen', kontext: 'Laut sein hat gute Seiten. Leise sein auch. Beides ist manchmal schwierig.',
              fragen: [
                { f: 'Was ist gut daran – und was ist schwierig daran?', preis: { erste: '', kopf: ['Das ist gut daran', 'Das ist schwierig daran'], optionen: ['laut sein', 'leise sein'] } },
                { f: 'Meine Rolle beim Brückenbau war:', kreuz: ['wie immer', 'ungewohnt, aber okay', 'ungewohnt und anstrengend'] },
                { f: 'Was möchtest du öfter können?', kreuz: ['öfter etwas sagen', 'öfter zuhören', 'passt so'] },
              ],
            },
          ],
        },
        {
          titel: 'Schluss: Amiras Satz', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Morgen ist wieder Gruppenarbeit. Was fragt Sami – und was sagt Amira?', satz: ['Sami fragt:', 'Amira sagt:'] }] },
            { art: 'merk', x: 'Beide Seiten ==punkten.==' },
            { art: 'woche', x: 'Probier die andere Seite: Bist du eher leise, sag einmal **als Erstes** etwas. Bist du eher laut, hör einmal **nur zu**.', kaestchen: ['gemacht'] },
          ],
        },
        {
          titel: 'Wenn noch Zeit ist: Punkte-Galerie', zeit: '10 Min.', wie: 'alle · freiwillig', icon: 'photo',
          bausteine: [
            { art: 'text', x: ['Jede Person zeichnet die fünf Linien von Station 2 (ohne Kreuze) auf ein Blatt, schreibt ihren Namen darauf und hängt es auf. Schweigend kleben alle Punkte: **Wo sehe ich dich?** Keine Kommentare. Danach vergleicht jede Person für sich: Wo sehen mich die anderen anders als ich mich? Du wählst selbst, auf welchen Linien geklebt wird. Zu dritt klebt die Leitung mit.'] },
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
          titel: 'Was in diesem Raum steckt', zeit: '10 Min.', wie: 'allein · dann alle', icon: 'checklist',
          bausteine: [
            { art: 'text', x: ['Kreuz an, was du kannst – auch wenn es dir klein vorkommt. **Niemand muss etwas vorführen.** Danach liest die Leitung die Liste vor: Hand hoch, wer es kann.'] },
            { art: 'fragen', fragen: [
              { f: 'Das kann ich:', kreuz: ['pfeifen', 'etwas reparieren', 'kochen oder backen', 'mit Tieren umgehen', 'mir Wege merken', 'jemanden zum Lachen bringen', 'lange zuhören', 'schnell rechnen', 'zeichnen', 'mit kleinen Kindern umgehen', 'ein Spiel richtig gut spielen', 'zwei oder mehr Sprachen sprechen'] },
              { f: 'Was kann hier im Raum **nur eine** Person – und was fehlt in der Liste?', linien: 1 },
            ] },
          ],
        },
        {
          titel: 'Die Akte Yusuf', zeit: '15 Min.', wie: 'lesen · zu zweit', icon: 'folder',
          bausteine: [
            {
              art: 'akte', titel: 'Akte · Seite 1', kopf: 'Yusuf, 16', stempel: 'unvollständig',
              eintraege: ['laut im Unterricht', 'impulsiv, gibt Widerworte', 'zwei Verwarnungen', 'verlässt den Raum ohne Erlaubnis', 'Auf die Frage „Was kannst du gut?“: „Nichts Besonderes.“'],
              daneben: { titel: 'Was nicht drinsteht', punkte: ['Bringt jeden Morgen seine kleine Schwester zur Schule.', 'Erklärt dem Neuen in der Werkstatt alles zweimal.', 'Hat noch nie einen Freund verpfiffen.'] },
              fragen: [{ f: 'Schreib **Seite 2** der Akte: drei Dinge, die Yusuf gut kann. Schreib dazu, woran man es sieht.', linien: 0 }],
            },
            { art: 'tabelle', breiten: '9mm 42% auto', kopf: ['Nr.', 'Das kann Yusuf gut', 'Daran sieht man es'], zeilen: [['1', '', ''], ['2', '', ''], ['3', '', '']], hoehe: 9 },
            { art: 'fragen', fragen: [{ f: 'Yusuf sagt: „Nichts Besonderes.“ Warum sagt er das? Mehrere Kreuze gehen.', kreuz: ['Für ihn ist das normal.', 'Niemand hat es ihm je gesagt.', 'Er will nicht angeben.'], unter: true }] },
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
              clip: { titel: 'Ich bin nichts wert – so steigerst du dein Selbstwertgefühl', kanal: 'BUBBLES', url: 'https://www.youtube.com/watch?v=XZzcGOxqBy8', dauer: 'die ersten 5 Min.', frage: 'Selbstwertgefühl heißt: wie viel du dir selbst wert bist. Woher kommt das?' },
              vorher: [{ f: 'Was zählt am meisten dafür, wie du über dich denkst?', kreuz: ['Noten', 'was andere sagen', 'was ich selbst über mich denke', 'was ich für andere tue'], unter: true }],
              dabei: ['Tipp 1 aus dem Clip:', 'Tipp 2 aus dem Clip:'],
              nachher: [{ f: 'Welchen Tipp kannst du wirklich ausprobieren?', linien: 1 }, { f: 'Welcher Tipp hilft Yusuf?', linien: 1 }],
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
                '**Verschenken (8 Min.):** Alle Karten liegen offen auf dem Tisch. Such dir drei aus, die zu Leuten aus der Gruppe passen. Geh hin und gib sie ab – mit einem Satz: „Die passt zu dir, weil …“',
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
            { art: 'text', x: ['Ein Baum steht, weil unten etwas hält. Fang unten bei den Wurzeln an und schreib nach oben – **nur, was du teilen willst.** Bei den Wurzeln zählen auch Orte, Tiere, Musik und Erinnerungen, nicht nur Menschen.'] },
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
            { art: 'fragen', fragen: [{ f: 'Die Betreuerin fragt dich: „Was kannst du gut?“ Der erste Satz deiner anderen Akte:', linien: 1 }] },
            { art: 'merk', x: 'Du bist mehr ==als deine Akte.==' },
            { art: 'woche', x: 'Sag einer Person eine Stärke, die du an ihr siehst – **und woran du sie gemerkt hast.**', kaestchen: ['gesagt'] },
          ],
        },
      ],
    },
  ],
}

export const stunden: Stunde[] = [tank, lautLeise, kannst]
