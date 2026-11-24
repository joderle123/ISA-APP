// REAL TALK #01 · ICH – die drei Einheiten als zusammenhängende Stunden (16.11.2026, vertieft 24.11.2026: schwerere Fälle,
// Modelle zum Mitarbeiten – Tankanzeige, sozialer Akku, Stärke und Schatten).
// Jede Stunde hat einen eigenen Aufbau und einen roten Faden: Der Fall vom Anfang kommt bei Clip, Modell und Schluss wieder vor.
// Alle Personen und Situationen sind erfunden.
import type { Stunde } from '../typen'

/* ---------- Stunde 1 · Leerer Tank: vom Fall zum Modell zur Aktion ----------
   Überarbeitet 24.11.2026 (Rückmeldung: „Fall etwas schwerer, Modell interessanter – mit Übung auf dem Blatt“):
   - Der Fall ist ein Ermittlungsfall: sechs Spuren, eine davon spricht gegen eine falsche Erklärung. Die Jugendlichen
     ordnen die Kette, trennen Funke und Fass und prüfen Theorien aus der Klasse. Die tiefere Ursache (Chat → Schlaf)
     steht nirgends ausdrücklich – sie wird gefunden.
   - Das Modell ist ein Armaturenbrett: Tankanzeigen zum Ausmalen (Nele um 10:20), Beweis-Linie, Warnlichter zum Zuordnen,
     dazu der Domino-Gedanke (ein leerer Tank zieht einen anderen leer).
   - Die große Runde hat drei Level: Situation (★), nur Verhalten (★★), zwei leere Tanks mit Reihenfolge (★★★). */
const tank: Stunde = {
  frage: 'Warum bist du manchmal sauer – und keiner hat dir etwas getan?',
  dauer: 'etwa 90 Minuten',
  kannst: ['einen Knall wie ein Detektiv zurückverfolgen', 'sechs Tanks nennen und am Verhalten erkennen, welcher blinkt', 'deinen Tank in zehn Minuten auffüllen'],
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
          titel: 'Der Fall Nele: Was steckt hinter dem Knall?', zeit: '20 Min.', wie: 'lesen · zu zweit ermitteln', icon: 'search',
          bausteine: [
            {
              art: 'fall', bild: 'peep:nele:muede', name: 'Nele, 15',
              text: 'Dienstag, dritte Stunde. Die Lehrerin fragt freundlich: „Nele, bist du bei uns?“ Nele knallt das Heft auf den Tisch und geht raus. Auf dem Flur sagt sie nur: „Keine Ahnung, was los war.“\n**Ihr seid die Ermittler.** Ihr habt sechs Spuren. Nicht jede gehört zum Knall – und das Wichtigste steht nirgends direkt.',
            },
            {
              art: 'spuren',
              spuren: [
                { k: 'A', icon: 'device-mobile', quelle: 'Neles Handy · Montag, 23:40', x: 'Klassenchat: „Samstag alle zu Dario!“ 37 Nachrichten. Nele wird nicht gefragt. Sie liest mit – bis 1:50 Uhr.' },
                { k: 'B', icon: 'alarm', quelle: 'Neles Wecker · 6:10', x: 'Dreimal „später“ gedrückt. Gut vier Stunden Schlaf.' },
                { k: 'C', icon: 'bottle', quelle: 'Tankstelle · 7:05', x: 'Kein Frühstück. Nele kauft einen Energydrink. Das Pausenbrot liegt noch zu Hause.' },
                { k: 'D', icon: 'user', quelle: 'Selin, sitzt neben Nele', x: '„In der Pause stand sie allein am Automaten. Sonst steht sie immer bei uns. Sie hat uns nicht mal angeschaut.“' },
                { k: 'E', icon: 'school', quelle: 'Die Lehrerin', x: '„Ich habe sie vor der ganzen Klasse angesprochen. Ich wollte nur, dass sie mitmacht.“' },
                { k: 'F', icon: 'notebook', quelle: 'Neles Mathe-Heft', x: 'Letzte Woche: alle Aufgaben gemacht, darunter ein Stern. Nele mag Mathe nicht besonders – aber sie kann es.' },
              ],
              fragen: [
                { f: 'Die Kette: Bring fünf Spuren in die richtige Reihenfolge bis zum Knall. Eine Spur gehört nicht in die Kette.', kette: ['', '', '', '', '', 'Knall'] },
                { f: 'Ein Knall braucht einen **Funken** und ein **volles Fass**. Der Funke ist der Moment, in dem es knallt. Im Fass ist alles, was sich vorher angesammelt hat.', satz: ['Der Funke ist Spur …', 'Im Fass sind die Spuren …'] },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Der Fall Nele: Theorien prüfen', zeit: '', wie: 'zu Station 2', icon: 'search', fort: true,
          bausteine: [
            { art: 'fragen', kontext: 'In der Klasse hat jede Person schon eine Erklärung. Prüft sie wie Ermittler: Was sagen die Spuren?', fragen: [
              { f: 'Kreuz an: stimmt die Theorie – **ja**, **halb** oder **nein**? Schreib die Spur dazu, die es beweist.', preis: { erste: 'Theorie aus der Klasse', kopf: ['ja · halb · nein', 'Beweis: Spur …'], optionen: ['„Nele ist halt so.“', '„Die Lehrerin ist schuld.“', '„Nele war einfach müde.“', '„Nele hat keinen Bock auf Mathe.“'] } },
              { f: 'Die schwerste Frage: Warum war Neles Nacht so kurz? Und was hat das mit Spur D zu tun?', satz: ['Die Nacht war kurz, weil …', 'Spur D zeigt, dass …'] },
              { f: 'Nele sagt: „Keine Ahnung, was los war.“ Was hat sie nicht gemerkt? Mehrere Kreuze gehen.', kreuz: ['dass sie hungrig war', 'dass der Chat sie verletzt hat', 'dass sie kaum geschlafen hat', 'dass die Lehrerin sie nicht mag'], unter: true },
            ] },
          ],
        },
        {
          titel: 'Clip: Was die Nacht mit dir macht', zeit: '12 Min.', wie: 'alle', icon: 'player-play',
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
                { f: 'Hilft der Energydrink (Spur C) wirklich?', kreuz: ['ja', 'nur kurz', 'nein'] },
                { f: 'Welche Spur erklärt der Clip am besten – und warum?', linien: 1 },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Das Modell: sechs Tanks', zeit: '15 Min.', wie: 'allein · dann zu zweit', icon: 'gauge',
          bausteine: [
            { art: 'text', x: ['Schlaf ist nur **einer** von sechs Tanks, auf denen ein Mensch läuft – wie die Leisten in einem Game: Ist eine leer, wird alles schwerer. Bei einem leeren Tank blinkt ein **Warnlicht**: meistens als Laune oder als Verhalten, das andere nervt. Was einen Tank füllt, heißt hier **Tankstelle**. Und: Ein leerer Tank kann einen anderen **leer ziehen** – wie Dominosteine.'] },
            {
              art: 'modell', warnTitel: 'Warnlicht', anzeige: 'Nele', beweis: 'Spur',
              punkte: [
                { icon: 'bed', t: 'Körper', x: 'Schlaf, Essen, Trinken, Bewegung.', warn: 'gereizt, Kopfweh', luecke: true },
                { icon: 'shield', t: 'Sicherheit', x: 'Wissen, was kommt und wer da ist.', warn: 'unruhig, auf dem Sprung', luecke: true },
                { icon: 'users', t: 'Dazugehören', x: 'Leute, zu denen du gehörst.', warn: 'neidisch, zieht sich zurück', luecke: true },
                { icon: 'ear', t: 'Ernst genommen', x: 'Jemand hört, was du sagst.', warn: 'gekränkt, macht dicht', luecke: true },
                { icon: 'steering-wheel', t: 'Selbst entscheiden', x: 'Etwas bestimmen dürfen.', warn: 'trotzig, „mir doch egal“', luecke: true },
                { icon: 'confetti', t: 'Spaß und Neues', x: 'Etwas erleben, das neu ist.', warn: 'gelangweilt, zappelig', luecke: true },
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'Sechs Warnlichter haben sich verirrt. Schreib jedes in seinen Tank – auf die leere Linie unter „Warnlicht“.', wortkasten: ['ruft Quatsch rein, nur damit etwas passiert', 'kann sich nicht konzentrieren', 'macht genau das Gegenteil von dem, was man sagt', 'schreibt nachts noch, damit jemand antwortet', 'fragt dreimal, wie es morgen läuft', 'wird laut, wenn man sie unterbricht'] },
              { f: 'Neles Anzeige um 10:20: Mal in jedem Tank aus, wie voll er ist. Unter jeden fast leeren Tank schreibst du die Spur, die es beweist.' },
              { f: 'Domino bei Nele: Welcher Tank war zuerst leer – und welchen hat er mitgezogen?', satz: ['Zuerst leer:', 'Hat mitgezogen:'] },
              { f: 'Um 10:20 kommt noch ein Tank dazu: Die Lehrerin spricht Nele vor allen an. Kreise die Nummer ein.', kreis: ['1', '2', '3', '4', '5', '6'] },
              { f: 'Zu zweit: Erfindet eine eigene Domino-Kette für eine Person in eurem Alter – ohne echte Namen.', satz: ['Zuerst leer, weil …', 'Das zieht mit:', 'So sieht der Knall aus:'] },
            ] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die große Runde: Tank-Detektive', zeit: '25 Min.', wie: 'zwei Teams am Tisch', icon: 'cards',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Am Verhalten erkennen, welcher Tank leer ist – auch wenn es nicht dasteht. Drei Level, jedes schwerer. **Niemand spielt etwas vor:** Es wird gelesen, gezeigt und gelegt.',
              material: 'die 18 Karten von der nächsten Seite (ausschneiden, nach Sternen in drei Stapel sortieren) und das Modell von Station 4 – die Tanks haben die Nummern 1 bis 6',
              schritte: [
                'Zwei Teams am Tisch. Die Leitung liest eine Karte vor – ohne die Lösung, die unten draufsteht.',
                'Alle überlegen still. Auf „drei“ zeigen **alle gleichzeitig** mit den Fingern die Nummer des Tanks.',
                'Zeigt die Mehrheit im Team den richtigen Tank, gibt es **so viele Punkte, wie Sterne auf der Karte sind.** Zeigt ihr verschiedene Tanks? Kurz sagen, warum – oft passen zwei.',
                '**Bonus-Punkt:** Das Team nennt eine Tankstelle, die diesen Tank in zehn Minuten füllt – ohne jemanden überreden zu müssen.',
                'Die Karte kommt auf den Platz ihres Tanks. Am Ende liegen sechs Stapel auf dem Tisch: Welcher ist am höchsten?',
              ],
              runden: [
                { t: 'Level 1 · ★ Situation', x: 'Die Situation steht da. Sechs Karten, je 1 Punkt.' },
                { t: 'Level 2 · ★★ Warnlicht', x: 'Nur das Verhalten steht da – und ein kleiner Hinweis. Was steckt dahinter? Je 2 Punkte.' },
                { t: 'Level 3 · ★★★ Domino', x: 'Zwei Tanks sind leer. Zeigt beide – zuerst den, der **zuerst** leer war. Je 3 Punkte.' },
              ],
              regeln: ['Niemand muss vorlesen oder etwas vorführen. Zeigen und legen reicht.', 'Passt auch ein anderer Tank? Wer es begründet, bekommt den Punkt. Die Leitung entscheidet.'],
              zu3: 'Ein Team gegen die Karten: Zeigen alle drei den richtigen Tank, gibt es die Punkte. Ziel: 25 von 36 Punkten.',
              wertung: { kopf: ['Punkte', 'Level 1', 'Level 2', 'Level 3', 'Bonus', 'Summe'], zeilen: ['Team A', 'Team B'] },
              notiz: { titel: 'Die zwei besten Tankstellen der Runde – ihr braucht sie gleich bei Station 6:', linien: 1 },
              auswertung: ['Welches Level war am schwersten – und warum?', 'Level 3: Welcher Tank zieht oft einen anderen mit? Seht ihr ein Muster?'],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: 18 Karten in drei Leveln', zeit: '', wie: 'zu Station 5', icon: 'scissors', fort: true,
          bausteine: [
            {
              art: 'karten', spalten: 3, hoehe: 37, hinweis: 'Die Leitung bringt die Karten ausgeschnitten mit (Extra-Ausdruck). Die Lösung steht klein unten.',
              karten: [
                { t: 'Du hast bis drei Uhr gezockt. Erste Stunde: Test.', marke: '★ · 1 Körper' },
                { t: 'Neuer Stundenplan. Keiner sagt dir, in welchen Raum du musst.', marke: '★ · 2 Sicherheit' },
                { t: 'Pause. Alle stehen in Gruppen. Du stehst daneben.', marke: '★ · 3 Dazugehören' },
                { t: 'Du sagst deine Idee. Alle lachen – es war kein Witz.', marke: '★ · 4 Ernst genommen' },
                { t: 'Über dein Wochenende wird entschieden. Gefragt hat dich keiner.', marke: '★ · 5 Selbst entscheiden' },
                { t: 'Sonntag, Regen, WLAN weg. Seit Stunden passiert nichts.', marke: '★ · 6 Spaß und Neues' },
                { t: 'Jana faucht bei jeder Kleinigkeit: „Lass mich!“ Nach dem Mittagessen ist sie wie ausgewechselt.', marke: '★★ · 1 Körper' },
                { t: 'Mika fragt in der Werkstatt alle fünf Minuten: „Und was machen wir danach?“ Heute ist eine Vertretung da.', marke: '★★ · 2 Sicherheit' },
                { t: 'Ben postet fünfmal am Abend und schaut ständig, wer reagiert. Seit dem Klassenwechsel kennt er kaum jemanden.', marke: '★★ · 3 Dazugehören' },
                { t: 'Noa sagt denselben Satz zum dritten Mal – immer lauter. Die anderen schauen dabei aufs Handy.', marke: '★★ · 4 Ernst genommen' },
                { t: 'Aylin sagt zu jeder Bitte erst einmal Nein – auch zu Sachen, die sie gern macht. Ihr Tag ist von morgens bis abends verplant.', marke: '★★ · 5 Selbst entscheiden' },
                { t: 'Timo kippelt, malt auf den Tisch und ruft Quatsch rein. Seit drei Wochen läuft jede Stunde gleich ab.', marke: '★★ · 6 Spaß und Neues' },
                { t: 'Erster Tag in der neuen Wohngruppe. Lea kennt niemanden und weiß nicht, was morgen kommt. Nachts liegt sie wach.', marke: '★★★ · zuerst 2 → dann 1' },
                { t: 'Beim Projekt macht der Betreuer alles selbst. Deniz darf nichts entscheiden. Bald sagt er: „Mir doch egal“ und schaut aufs Handy.', marke: '★★★ · zuerst 5 → dann 6' },
                { t: 'Sara erzählt, dass ihr Hamster gestorben ist. Die anderen reden weiter über ein Video. Am nächsten Tag sitzt sie allein.', marke: '★★★ · zuerst 4 → dann 3' },
                { t: 'Kai zockt jede Nacht bis spät, weil tagsüber nie etwas los ist. In der Schule fallen ihm die Augen zu.', marke: '★★★ · zuerst 6 → dann 1' },
                { t: 'Emil hat Hunger und Kopfweh und antwortet patzig. Die anderen sagen: „Mit dir kann man nicht reden“ und gehen.', marke: '★★★ · zuerst 1 → dann 3' },
                { t: 'Mo wird nie gefragt, was er möchte – nicht beim Ausflug, nicht beim Projekt. Jetzt geht er nicht mehr zu den Treffen.', marke: '★★★ · zuerst 5 → dann 3' },
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
                { t: 'Körper', punkte: ['etwas Richtiges essen, Wasser trinken', 'zehn Minuten an die Luft', 'das Handy um 22 Uhr aus dem Zimmer legen'] },
                { t: 'Sicherheit', punkte: ['nachfragen: „Was passiert morgen?“', 'den Plan für morgen aufschreiben', 'an einen Ort gehen, den du kennst'] },
                { t: 'Dazugehören', punkte: ['jemandem schreiben, der dir guttut', 'dich zu jemandem dazusetzen', 'bei etwas mitmachen, das schon läuft'] },
                { t: 'Ernst genommen', punkte: ['sagen: „Hör mir kurz zu.“', 'aufschreiben, was du sagen willst', 'es der Person sagen, die wirklich zuhört'] },
                { t: 'Selbst entscheiden', punkte: ['eine Sache heute selbst bestimmen', 'fragen: „Darf ich es auf meine Art machen?“', 'zwischen zwei Möglichkeiten wählen'] },
                { t: 'Spaß und Neues', punkte: ['einen neuen Weg gehen', 'etwas zum ersten Mal ausprobieren', 'ein Lied laut hören'] },
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'Blätter zurück zu Station 1: Was hat dich heute genervt – und welcher Tank steckte dahinter? Gab es auch bei dir ein Domino?', satz: ['Der Tank dahinter:', 'Mitgezogen hat er:'] },
              { f: 'Kreuz oben eine Tankstelle für diesen Tank an – oder nimm eine aus der großen Runde. Dein Plan: wann und wo? (Beispiel: Wenn ich nach der Schule heimkomme, esse ich zuerst etwas.)', satz: ['Wenn ich (wann? wo?) …', 'dann (meine Tankstelle) …'] },
            ] },
          ],
        },
        {
          titel: 'Schluss: die Kette stoppen', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Wo hätte Neles Kette am leichtesten gestoppt werden können?', kreuz: ['23:40 · Chat', '1:50 · Handy', '7:05 · Frühstück', '10:20 · Unterricht'] },
              { f: 'Es ist 23:40. Nele liest den Chat. Was schreibst du ihr?', linien: 1 },
            ] },
            { art: 'merk', x: 'Erst tanken. ==Dann streiten.==' },
            { art: 'woche', x: 'Füll deinen blinkenden Tank auf – **dreimal, je höchstens zehn Minuten.** Ein Kreuz pro Mal.', kaestchen: ['1', '2', '3'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Stunde 2 · Laut oder leise: erst erleben, dann verstehen ----------
   Überarbeitet 24.11.2026: Der Fall hat vier Leute und keine einfache Schuldige (Amira schweigt auch, als Tess fragt) –
   die Jugendlichen verteilen 100 Punkte Verantwortung und begründen. Neu: das Modell „sozialer Akku“ mit Übung im Heft. */
const lautLeise: Stunde = {
  frage: 'Was fehlt einer Gruppe, wenn nur die Lauten reden?',
  dauer: 'etwa 90 Minuten',
  kannst: ['sagen, wo du zwischen laut und leise stehst', 'erklären, wie dein Akku lädt', 'so fragen, dass auch leise Ideen ankommen'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Erst machen: das Experiment', zeit: '10 Min.', wie: 'alle · am Tisch', icon: 'flask',
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
          titel: 'Die Linie', zeit: '6 Min.', wie: 'allein · dann wer mag', icon: 'ruler-measure',
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
          titel: 'Der Fall: Wer hat das Projekt versenkt?', zeit: '15 Min.', wie: 'lesen · allein · dann zu zweit', icon: 'file-text',
          bausteine: [
            { art: 'text', x: ['Vier Leute sollen bis morgen ein Projekt über ihren Lieblingsort abgeben – Plakat oder Video, egal. **Morgen früh ist Abgabe.**'] },
            {
              art: 'chat',
              zeilen: [
                { wer: 'Sami sagt:', x: 'Ich hab’s! Wir drehen ein Video – mit Interviews und allem!' },
                { wer: 'Der Lehrer sagt:', x: 'Super, Sami, dass du anfängst.' },
                { wer: 'Jo sagt:', x: 'Video ist cool. Ich mache die Musik!' },
                { wer: 'Amira denkt:', x: 'Ein Video bis morgen? Das schaffen wir nie.', art: 'denkt' },
                { wer: '', x: 'Amira schreibt auf einen Zettel: „Plakat mit Fotos – geht schneller.“ Der Zettel bleibt unter ihrem Heft.', art: 'tut' },
                { wer: 'Tess sagt:', x: 'Amira, du sagst ja gar nichts. Alles okay?' },
                { wer: 'Amira sagt:', x: 'Passt schon.' },
                { wer: '', x: 'Am nächsten Morgen: Das Video ist nicht fertig. Die Gruppe hat nichts abzugeben.', art: 'tut' },
                { wer: 'Der Lehrer sagt:', x: 'Amira, du musst mehr mitmachen.' },
                { wer: 'Sami sagt:', x: 'Warum hast du nichts gesagt? Wir sind doch keine Hellseher!' },
              ],
              fragen: [
                { f: 'Wer hat zuerst gemerkt, dass der Plan nicht klappt?', kreuz: ['Sami', 'Jo', 'Amira', 'Tess', 'der Lehrer'] },
                { f: 'Wer hat wie viel Anteil daran, dass die Gruppe nichts abgeben konnte? Verteile genau **100 Punkte** – erst allein, dann vergleicht ihr.', zahl: ['Sami', 'Jo', 'Amira', 'Tess', 'der Lehrer'] },
                { f: 'Begründe deine höchste und deine niedrigste Zahl:', satz: ['Am meisten, weil …', 'Am wenigsten, weil …'] },
                { f: 'Sami sagt: „Wir sind doch keine Hellseher!“ Hat er recht?', kreuz: ['ja', 'halb', 'nein'] },
                { f: 'Tess fragt: „Alles okay?“ – Amira sagt: „Passt schon.“ Wie hätte Tess fragen können, damit Amiras Idee herauskommt?', linien: 1 },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip: laut, leise, glücklich?', zeit: '10 Min.', wie: 'alle', icon: 'player-play',
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
        {
          titel: 'Das Modell: dein sozialer Akku', zeit: '10 Min.', wie: 'allein · dann zu zweit', icon: 'battery-charging',
          bausteine: [
            { art: 'text', x: ['Jeder Mensch hat eine Art **sozialen Akku**. Viele Leise laden ihn auf, wenn sie allein oder mit einer Person sind – unter vielen Leuten wird er schnell leer. Viele Laute laden ihn unter Leuten auf – allein wird er leer. **Beides ist normal.** Schwierig wird es, wenn keiner merkt, dass ein Akku leer ist: Dann sieht leise aus wie „keinen Bock“.'] },
            { art: 'fragen', fragen: [
              { f: 'Was macht das mit deinem Akku? Ein Kreuz pro Zeile.', raster: { spalten: ['lädt auf', 'egal', 'zieht leer'], zeilen: ['eine Party mit vielen Leuten', 'allein Musik hören', 'eine Gruppenarbeit zu viert', 'mit einer Person reden', 'mit Freunden zocken', 'ein langer Tag in der Schule', 'Sport im Team', 'allein zeichnen, bauen oder basteln'] } },
              { f: 'Schau auf deine Kreuze bei „lädt auf“: Wo lädst du eher?', kreuz: ['eher allein', 'eher mit anderen', 'gemischt'] },
              { f: 'Zu zweit: Legt eure Hefte nebeneinander. Bei welcher Zeile seid ihr am verschiedensten?', linien: 1 },
              { f: 'Amira in der Gruppenarbeit: Wie voll war ihr Akku – und was hätte ihn geschont?', satz: ['Ihr Akku war …, weil …', 'Geschont hätte ihn …'] },
            ] },
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
              auswertung: ['Von wem kam die Idee, die ihr gebaut habt?', 'Welche Rolle hat der Gruppe am meisten geholfen?', 'Was war anders als bei Sami, Jo, Amira und Tess?'],
            },
            {
              art: 'karten', spalten: 3, hoehe: 25, hinweis: 'Rollen-Karten: ausschneiden und verdeckt ziehen.',
              karten: [
                { t: 'Starter', x: 'Du fängst an und sagst: „Los, erste Idee!“', marke: 'laut' },
                { t: 'Mutmacher', x: 'Du sagst, was schon gut klappt.', marke: 'laut' },
                { t: 'Sprecher', x: 'Du sagst am Ende in einem Satz, warum sie hält.', marke: 'laut' },
                { t: 'Zuhörer', x: 'Du fasst zusammen: „Bisher haben wir …“', marke: 'leise' },
                { t: 'Prüfer', x: 'Du schaust genau hin: „Moment – hält das?“', marke: 'leise' },
                { t: 'Frager', x: 'Du fragst jemanden, der noch nichts gesagt hat: „Was ist deine Idee?“', marke: 'leise' },
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
                { f: 'Dein Versuch für die Woche: als Erstes etwas sagen oder nur zuhören – wo genau? (Station 2: Wo bist du lauter als hier?)', satz: ['Wenn ich (wo? bei wem?) …', 'dann …'] },
              ],
            },
          ],
        },
        {
          titel: 'Schluss: der zweite Versuch', zeit: '5 Min.', wie: 'alle', icon: 'flag',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Morgen hat die Gruppe einen zweiten Versuch. Was fragt Tess diesmal – und was sagt Amira?', satz: ['Tess fragt:', 'Amira sagt:'] }] },
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

/* ---------- Stunde 3 · Was du kannst: zeigen, Akte prüfen, Stärken handeln ----------
   Überarbeitet 24.11.2026: In der Akte stehen die Stärken nicht mehr fertig daneben – vier Aussagen von Leuten, die Yusuf
   kennen; die Jugendlichen finden das Wort selbst. Neu: das Modell „Stärke und Schatten“ mit Wortkasten und Übersetzen
   von Akte-Sprache; der Crew-Plan fragt nach dem Schatten. */
const kannst: Stunde = {
  frage: 'Was steht in keiner Akte über dich?',
  dauer: 'etwa 90 Minuten',
  kannst: ['Stärken finden, die nirgends dastehen', 'zu einer Stärke ihren Schatten nennen', 'drei eigene Stärken nennen – mit Beweis'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Was in diesem Raum steckt', zeit: '8 Min.', wie: 'allein · dann alle', icon: 'checklist',
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
              daneben: { titel: 'Was andere über Yusuf sagen', punkte: [
                '**Seine Schwester (8):** „Er bringt mich jeden Morgen zur Schule. Auch wenn er kaum geschlafen hat.“',
                '**Der Werkstattmeister:** „Dem Neuen hat er alles zweimal erklärt. Ohne dass ich ihn gefragt habe.“',
                '**Ein Mitschüler:** „Als alle über mich gelacht haben, hat er gesagt: ‚Hört auf.‘ Dann war Ruhe.“',
                '**Die Betreuerin:** „Wenn er rausgeht, kommt er nach zehn Minuten ruhig zurück. Früher hat es dann geknallt.“',
              ] },
            },
            { art: 'fragen', fragen: [{ f: 'Schreib **Seite 2** der Akte. In jeder Aussage steckt eine Stärke – das Wort steht nicht da, du musst es finden.' }] },
            { art: 'tabelle', breiten: '36mm 50mm auto', kopf: ['Wer sagt es?', 'Die Stärke', 'Woran sieht man es?'], zeilen: [['Schwester', '', ''], ['Werkstattmeister', '', ''], ['Mitschüler', '', ''], ['Betreuerin', '', '']], hoehe: 9 },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Die Akte Yusuf: genauer hingeschaut', zeit: '', wie: 'zu Station 2', icon: 'folder', fort: true,
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Die Aussage der Betreuerin passt zu einem Eintrag auf Seite 1. Zu welchem – und was steht dort nicht?', satz: ['Eintrag:', 'Dort fehlt:'] },
              { f: 'Yusuf sagt: „Nichts Besonderes.“ Warum sagt er das? Mehrere Kreuze gehen.', kreuz: ['Für ihn ist das normal.', 'Niemand hat es ihm je gesagt.', 'Er will nicht angeben.'] },
            ] },
          ],
        },
        {
          titel: 'Das Modell: Stärke und Schatten', zeit: '12 Min.', wie: 'allein · dann zu zweit', icon: 'contrast',
          bausteine: [
            { art: 'text', x: ['Jede Stärke hat einen **Schatten**: Wird es zu viel davon, wird aus der Stärke ein Problem. Deshalb stehen in Akten oft nur Schatten – und die Stärke dahinter fehlt. Das Ziel ist nicht, eine Stärke wegzumachen. Das Ziel ist, sie **richtig einzustellen** – wie die Lautstärke an deinen Kopfhörern.'] },
            { art: 'fragen', fragen: [{ f: 'Welcher Schatten gehört zu welcher Stärke? Schreib ihn in die Tabelle.', wortkasten: ['überrollt die anderen', 'leichtsinnig', 'nimmt nichts ernst', 'verletzend', 'wirkt, als wäre alles egal', 'kann nie Nein sagen'] }] },
            { art: 'tabelle', breiten: '44mm auto', kopf: ['Die Stärke', 'Zu viel davon – der Schatten'], zeilen: [['mutig', ''], ['ehrlich', ''], ['hilfsbereit', ''], ['ruhig', ''], ['lustig', ''], ['setzt sich durch', '']], hoehe: 8 },
            { art: 'fragen', fragen: [
              { f: 'Und andersrum – Akte-Sprache übersetzen: Welche Stärke steckt hinter diesen Einträgen? Wie sieht sie richtig eingestellt aus?', preis: { erste: 'In Yusufs Akte', kopf: ['Die Stärke dahinter', 'Richtig eingestellt heißt …'], optionen: ['laut im Unterricht', 'gibt Widerworte'] } },
              { f: 'Deine Stärke – und ihr Schatten. Wann wird es bei dir zu viel?', satz: ['Meine Stärke:', 'Zu viel davon, wenn …'] },
            ] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip: Was bin ich wert?', zeit: '10 Min.', wie: 'alle', icon: 'player-play',
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
                '**Schatten-Check:** Jede Person schreibt dazu, auf welchen Schatten sie bei ihrem Job achten muss (Station 3). Die anderen dürfen ergänzen: „Und du könntest auch …“',
              ],
              regeln: ['Karten werden nur verschenkt, nie zurückgewiesen. Ein „Danke“ reicht.'],
              zu3: 'Jede Person bekommt von jeder anderen mindestens eine Karte – auch die Leitung.',
              auswertung: ['Welche Karte, die du bekommen hast, hat dich überrascht?', 'Welchen Job hätte ohne euch niemand übernommen – und welcher Schatten wäre dort gefährlich?'],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Material: Crew-Plan und 24 Stärken', zeit: '', wie: 'zu Station 5', icon: 'scissors', fort: true,
          bausteine: [
            { art: 'tabelle', breiten: '44mm 28mm auto auto', kopf: ['Job beim Grillfest', 'Wer?', 'Mit welcher Stärke?', 'Achtung, Schatten:'], zeilen: [['Einkaufen mit wenig Geld', '', '', ''], ['Grill und Essen', '', '', ''], ['Musik und Stimmung', '', '', ''], ['Aufbauen und Leute begrüßen', '', '', ''], ['Wenn etwas schiefgeht', '', '', '']], hoehe: 8 },
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
                { f: 'Seite 2 deiner Akte – wie bei Yusuf: Nimm eine Karte, die du heute bekommen hast, oder eine Stärke vom Stamm. Woran sieht man sie? Denk an einen Moment.', satz: ['Ich kann gut:', 'Beweis – das war, als …'] },
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
