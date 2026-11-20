// Mathematik · Modul 6 „Rechnen mit Vorzeichen und Buchstaben“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { zahlenstrahl } from './mathe-bilder.mjs'

export const MODUL = matheModul(6, {
  titelFr: 'Calculer avec des signes et des lettres',
  unterFr: 'Plus et moins avec les nombres négatifs, la priorité des opérations et l’entrée dans l’algèbre.',
  deckbild: ['yusuf:froh:zeigen-hoch', 'lina:froh:laptop', 'ben:froh:laessig'],
  blasen: [{ t: '(−3)·(−4) = +12', x: 12, y: 112 }, { t: 'Punkt vor Strich!', x: 110, y: 98 }, { t: '4x + 2', x: 168, y: 150 }],
  themenIcons: ['plus-minus', 'variable'],
  aussprache: { '\\b(\\d+)x\\b': '\\1 x', '\\b(\\d+)([ab])\\b': '\\1 \\2', '\\bA\\(x\\)': 'A von x', '\\bA\\((−?\\d+)\\)': 'A von \\1' },
})

const EXTRAS = [
  // 1 Negative Zahlen addieren und subtrahieren
  {
    fr: 'J’additionne et je soustrais des nombres positifs et négatifs.',
    bild: ['finn:froh:stehen', 'lehrer:froh:erklaeren'],
    erklBild: zahlenstrahl(-5, 5, { teile: 10, zahlen: [-5, -3, 0, 2, 5], marken: [{ w: -3, t: 'Start −3' }, { w: 2, t: '+5 → +2' }] }),
    hoeren: {
      was: 'Beim Tauchkurs', wo: 'Am Stausee · Tauchkurs', titel: 'Fünf Meter nach oben',
      situation: 'Finn macht einen Tauchkurs am Stausee. Der Tauchlehrer erklärt, wie tief sie tauchen.',
      bild: ['lehrer:froh:erklaeren', 'finn:froh:stehen'], sprecher: { Tauchlehrer: 'm1', Finn: 'm3' },
      text: [
        ['Tauchlehrer', 'Die Wasseroberfläche ist null. Wir tauchen zuerst auf minus 4 Meter.'],
        ['Finn', 'Und dann noch 3 Meter tiefer?'],
        ['Tauchlehrer', 'Genau: minus 4 minus 3. Wo sind wir dann?'],
        ['Finn', 'Bei minus 7 Metern.'],
        ['Tauchlehrer', 'Richtig. Dann steigen wir 5 Meter nach oben: minus 7 plus 5.'],
        ['Finn', 'Dann sind wir bei minus 2 Metern. Fast wieder oben!'],
        ['Tauchlehrer', 'Und zum Schluss die letzten 2 Meter: minus 2 plus 2 gleich null. Wir sind an der Oberfläche.'],
      ],
      vor: [{ art: 'mc', auftrag: '−4 − 3 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['−7', '−1', '+7'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und rechne mit.', stufe: 1, saetze: ['Erst tauchen: 0 − 4 = [−4] m', 'Tiefer: −4 − 3 = [−7] m', 'Nach oben: −7 + 5 = [−2] m', 'Zur Oberfläche: −2 + 2 = [0] m'] }],
      nach: [{ art: 'sprechen', auftrag: 'Aufzug-Spiel: Startet im Erdgeschoss (0). Eine Person sagt „3 runter“, „5 hoch“ … Die anderen sagen die Etage.', stufe: 2, karten: [
        { titel: 'Regel', text: ['plus = nach oben / rechts', 'minus = nach unten / links', 'minus (−) eine negative Zahl = plus'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre am Zahlenstrahl, wie du −3 + 5 rechnest.', anfaenge: ['Ich starte bei …', 'Dann gehe ich …', 'Ich lande bei …'] },
  },
  // 2 Vorzeichenregel bei der Multiplikation
  {
    fr: 'Je multiplie des nombres relatifs avec la règle des signes.',
    bild: ['lea:froh:handy', 'opa:froh:erklaeren'],
    hoeren: {
      was: 'Eine kalte Nacht', wo: 'Am Frühstückstisch · Winter', titel: 'Jede Stunde 2 Grad kälter',
      situation: 'Lea und ihr Opa schauen auf das Thermometer. In der Nacht ist es immer kälter geworden.',
      bild: ['opa:froh:erklaeren', 'lea:froh:handy'], sprecher: { Opa: 'm2', Lea: 'w2' },
      text: [
        ['Opa', 'Um Mitternacht waren es 0 Grad. Dann ist die Temperatur jede Stunde um 2 Grad gefallen.'],
        ['Lea', 'Nach 3 Stunden also: 3 mal minus 2 … das sind minus 6 Grad.'],
        ['Opa', 'Genau. Plus mal minus gibt minus.'],
        ['Lea', 'Und was war 3 Stunden vor Mitternacht?'],
        ['Opa', 'Da war es 6 Grad wärmer. Minus 3 Stunden mal minus 2 Grad …'],
        ['Lea', '… gibt plus 6 Grad! Minus mal minus gibt plus. Das passt: Am Abend war es wärmer.'],
      ],
      vor: [{ art: 'mc', auftrag: '(−3) · (−4) = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['+12', '−12', '−7'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['3 Stunden später: 3 · (−2) = [−6] Grad', '3 Stunden vorher: (−3) · (−2) = [+6] Grad', 'plus mal minus = [minus] · minus mal minus = [plus]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Vorzeichen-Blitz: Eine Person sagt eine Aufgabe wie „minus 4 mal minus 5“. Die anderen sagen zuerst nur das Vorzeichen, dann das Ergebnis.', stufe: 1, karten: [
        { titel: 'Regel', text: ['gleiche Vorzeichen → plus', 'verschiedene Vorzeichen → minus'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre die Vorzeichenregel mit eigenen Worten und je einem Beispiel.', anfaenge: ['Wenn beide Vorzeichen gleich sind, …', 'Wenn sie verschieden sind, …'] },
  },
  // 3 Punkt vor Strich
  {
    fr: 'Je calcule plusieurs opérations dans le bon ordre (priorités, parenthèses d’abord).',
    bild: ['sami:verwirrt:stehen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'An der Kinokasse', wo: 'Kino · Samstagabend', titel: '29 oder 64 Euro?',
      situation: 'Sami kauft 3 Kinokarten zu je 8 Euro und ein Popcorn für 5 Euro. Er rechnet falsch.',
      bild: ['verkaeuferin:froh:erklaeren', 'sami:verwirrt:stehen'], sprecher: { Kassiererin: 'w1', Sami: 'm3' },
      text: [
        ['Sami', 'Drei Karten zu 8 Euro und ein Popcorn zu 5 Euro. Ich rechne 5 plus 3 mal 8 … von links: 8 mal 8 sind 64 Euro?!'],
        ['Kassiererin', 'Nein, nein! Punkt vor Strich: Zuerst mal, dann plus.'],
        ['Sami', 'Ah: 3 mal 8 sind 24, plus 5 sind 29 Euro.'],
        ['Kassiererin', 'Genau, 29 Euro. Und wenn du noch zwei Popcorn und zwei Getränke dazunimmst, schreib Klammern.'],
        ['Sami', 'Ein Popcorn kostet 5 Euro und ein Getränk 3 Euro. Also 2 mal, Klammer auf, 5 plus 3, Klammer zu. Erst die Klammer: 8, dann mal 2: 16 Euro.'],
        ['Kassiererin', 'Perfekt. Zusammen 45 Euro.'],
      ],
      vor: [{ art: 'mc', auftrag: '2 + 3 · 4 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['20', '14', '24'], r: 1 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu und rechne richtig.', stufe: 2, items: [{ a: 'Karten und Popcorn: 5 + 3 · 8 = ?', l: '5 + 24 = 29 €', raum: 2 }, { a: 'Snacks: 2 · (5 + 3) = ?', l: '2 · 8 = 16 €', raum: 2 }, { a: 'zusammen: 29 + 16 = ?', l: '45 €', raum: 1 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Fehlersuche: Schreibt drei Rechnungen mit einem Fehler bei der Reihenfolge an die Tafel. Die anderen finden und erklären den Fehler.', stufe: 3, karten: [
        { titel: 'Reihenfolge', text: ['1. Klammern', '2. Punkt (· und ÷)', '3. Strich (+ und −)', '4. Sonst von links nach rechts'] }] }],
    },
    erklaeren: { auftrag: 'Sami hat zuerst 64 € gerechnet. Erkläre seinen Fehler.', anfaenge: ['Sami hat von links …', 'Richtig ist: …'] },
  },
  // 4 Die Variable
  {
    fr: 'Je comprends qu’une lettre peut représenter un nombre et que 4x = 4·x.',
    bild: ['yusuf:froh:zeigen-hoch', 'mia:ueberrascht:stehen'],
    hoeren: {
      was: 'Ein Zaubertrick', wo: 'Pause · Mathe-Zauberei', titel: 'Ich kenne deine Zahl!',
      situation: 'Yusuf macht einen Zahlentrick mit Mia. Mach mit! Die Zahl am Anfang nennen wir x.',
      bild: ['yusuf:froh:zeigen-hoch', 'mia:ueberrascht:stehen'], sprecher: { Yusuf: 'm1', Mia: 'w2' },
      text: [
        ['Yusuf', 'Denk dir eine Zahl. Sag sie nicht!'],
        ['Mia', 'Okay, ich habe eine.'],
        ['Yusuf', 'Verdopple sie. Dann addiere 6. Dann teile durch 2. Und jetzt ziehe deine Zahl ab.'],
        ['Mia', 'Fertig.'],
        ['Yusuf', 'Dein Ergebnis ist 3!'],
        ['Mia', 'Wie machst du das?'],
        ['Yusuf', 'Ich nenne deine Zahl x. Verdoppeln: 2x. Plus 6: 2x plus 6. Geteilt durch 2: x plus 3. Minus x: Es bleibt immer 3!'],
      ],
      vor: [{ art: 'mc', auftrag: '4x bedeutet … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4 · x', '4 + x', '4 und dann x'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Schreibe jeden Schritt mit x.', stufe: 2, kopf: ['Schritt', 'mit Buchstaben'], breiten: [50, 50], zeilen: [['Denk dir eine Zahl.', '[x]'], ['Verdopple sie.', '[2x]'], ['Addiere 6.', '[2x + 6]'], ['Teile durch 2.', '[x + 3]'], ['Ziehe deine Zahl ab.', '[3]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Probiert den Trick mit drei verschiedenen Zahlen aus. Kommt immer 3 heraus? Erfindet einen eigenen Trick.', stufe: 3, karten: [
        { titel: 'Tipp', text: ['Am Ende muss das x wieder verschwinden.', 'Zum Beispiel: verdreifachen, + 9, ÷ 3, − x → immer 3'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum beim Zaubertrick immer 3 herauskommt – egal, welche Zahl man denkt.', anfaenge: ['Ich nenne die Zahl x.', 'Nach allen Schritten bleibt …', 'Das x …'], zeilen: 6 },
  },
  // 5 Terme aufstellen
  {
    fr: 'Je traduis une phrase en expression littérale (somme, différence, produit).',
    bild: ['amira:froh:laptop', 'ben:froh:erklaeren'],
    hoeren: {
      was: 'Die Klassenfahrt planen', wo: 'Klassenrat · Kosten der Fahrt', titel: '300 plus 25 mal x',
      situation: 'Amira und Ben planen eine Klassenfahrt. Sie wissen noch nicht, wie viele Schüler mitfahren.',
      bild: ['amira:froh:laptop', 'ben:froh:erklaeren'], sprecher: { Amira: 'w2', Ben: 'm3' },
      text: [
        ['Amira', 'Der Bus kostet 300 Euro, egal wie viele mitfahren.'],
        ['Ben', 'Und die Jugendherberge kostet 25 Euro pro Person.'],
        ['Amira', 'Wir wissen nicht, wie viele mitkommen. Nennen wir die Zahl der Schüler x.'],
        ['Ben', 'Dann kostet die Herberge 25 mal x, also 25x.'],
        ['Amira', 'Und alles zusammen: 300 plus 25x. Das ist unser Term.'],
        ['Ben', 'Und das Eis am letzten Tag? 2 Euro pro Person.'],
        ['Amira', 'Dann kommt noch 2x dazu: 300 plus 25x plus 2x. Das sind 300 plus 27x.'],
      ],
      vor: [{ art: 'mc', auftrag: '„Das Produkt von 25 und x“ schreibt man … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['25x', '25 + x', 'x − 25'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und schreibe die Terme.', stufe: 2, saetze: ['Jugendherberge für x Schüler: [25x] €', 'Bus und Herberge: [300 + 25x] €', 'mit Eis: 300 + 25x + [2x] = [300 + 27x] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Übersetzt Sätze in Terme: „das Doppelte von x“, „x vermindert um 7“, „die Summe von a und b“ … Eine Person sagt den Satz, die andere schreibt den Term.', stufe: 2, karten: [
        { titel: 'Signalwörter', text: ['Summe → +', 'Differenz → −', 'Produkt → ·', 'Quotient → ÷', 'das Doppelte → 2 ·'] }] }],
    },
    erklaeren: { auftrag: 'Schreibe einen eigenen Satz aus dem Alltag und den passenden Term dazu (zum Beispiel Kino: Eintritt pro Person).', anfaenge: ['Mein Satz: …', 'x bedeutet: …', 'Der Term: …'] },
  },
  // 6 Terme berechnen – Einsetzen
  {
    fr: 'Je calcule la valeur d’une expression en remplaçant x par un nombre.',
    bild: ['amira:froh:stehen-zeigen', 'lehrerin:froh:erklaeren'],
    hoeren: {
      was: 'Wie teuer wird es?', wo: 'Klassenrat · eine Woche später', titel: 'Jetzt setzen wir ein!',
      situation: 'Jetzt ist klar, wie viele Schüler mitfahren. Amira setzt die Zahl in den Term ein.',
      bild: ['lehrerin:froh:erklaeren', 'amira:froh:stehen-zeigen'], sprecher: { 'Frau Kremer': 'w1', Amira: 'w2' },
      text: [
        ['Frau Kremer', 'Unser Term für die Kosten war: 300 plus 27x. Es fahren 20 Schüler mit.'],
        ['Amira', 'Dann setze ich für x die 20 ein: 300 plus 27 mal 20.'],
        ['Frau Kremer', 'Und denk an Punkt vor Strich!'],
        ['Amira', 'Zuerst 27 mal 20, das sind 540. Plus 300 … das sind 840 Euro.'],
        ['Frau Kremer', 'Richtig. Und wenn nur 15 mitfahren?'],
        ['Amira', '27 mal 15 sind 405, plus 300 sind 705 Euro.'],
        ['Frau Kremer', 'Gut. Pro Person ist es aber teurer, wenn weniger mitfahren – der Bus kostet ja immer 300 Euro.'],
      ],
      vor: [{ art: 'mc', auftrag: 'A(x) = 2x + 1. A(3) = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['7', '24', '6'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Setze ein und rechne.', stufe: 2, kopf: ['Schüler (x)', 'Rechnung', 'Kosten'], breiten: [24, 46, 30], zeilen: [['20', '[300 + 27 · 20 = 300 + 540]', '[840 €]'], ['15', '[300 + 27 · 15 = 300 + 405]', '[705 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Rechnet: Wie viel kostet die Fahrt pro Person bei 15 und bei 20 Schülern? Was fällt auf? Diskutiert.', stufe: 3, karten: [
        { titel: 'Hilfe', text: ['840 € ÷ 20 = …', '705 € ÷ 15 = …', 'Je mehr mitfahren, desto …'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie du A(x) = 4x + 2 für x = −5 berechnest. Achte auf die Klammer.', anfaenge: ['Ich setze −5 ein: …', 'Zuerst rechne ich …', 'Ergebnis: …'] },
  },
  // 7 Terme zusammenfassen
  {
    fr: 'Je réduis une expression en regroupant les termes semblables.',
    bild: ['nele:froh:blatt', 'finn:froh:stehen'],
    hoeren: {
      was: 'Die Einkaufsliste', wo: 'Vor dem Schulfest · Einkaufsliste', titel: 'Äpfel zu Äpfeln',
      situation: 'Nele und Finn schreiben eine Einkaufsliste mit Buchstaben: a steht für eine Kiste Äpfel, b für eine Packung Becher.',
      bild: ['nele:froh:blatt', 'finn:froh:stehen'], sprecher: { Nele: 'w3', Finn: 'm3' },
      text: [
        ['Nele', 'Herr Becker will 2 Kisten Äpfel, also 2a. Frau Sommer will 5 Kisten: 5a.'],
        ['Finn', 'Und Becher: Herr Becker will 3 Packungen, also 3b.'],
        ['Nele', 'Auf der Liste steht jetzt: 2a plus 3b plus 5a.'],
        ['Finn', 'Das kann man zusammenfassen: Äpfel zu Äpfeln. 2a plus 5a sind 7a.'],
        ['Nele', 'Und die Becher bleiben 3b. Man kann a und b nicht zusammenzählen!'],
        ['Finn', 'Und die Mensa hat noch eine Kiste Äpfel übrig. Wir kaufen eine Kiste weniger, also minus a. Dann haben wir 6a plus 3b.'],
      ],
      vor: [{ art: 'mc', auftrag: '2a + 5a = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['7a', '7a²', '10a'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und fasse zusammen.', stufe: 2, saetze: ['2a + 3b + 5a = [7a + 3b]', '7a + 3b − a = [6a + 3b]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Sortier-Spiel: Schreibt Glieder auf Karten (3x, −2, 5x, 4, −x …). Sortiert sie in zwei Gruppen und fasst zusammen.', stufe: 2, karten: [
        { titel: 'Regel', text: ['x zu x, Zahlen zu Zahlen', 'Vorzeichen mitnehmen!', 'x und Zahlen nicht mischen'] }] }],
    },
    erklaeren: { auftrag: 'Warum kann man 3a + 2b nicht weiter zusammenfassen? Erkläre mit einem Beispiel.', anfaenge: ['a und b sind …', 'Zum Beispiel: …'] },
  },
  // 8 Klammern auflösen
  {
    fr: 'Je supprime des parenthèses précédées d’un signe plus ou moins.',
    bild: ['lina:froh:handy', 'ben:froh:erklaeren'],
    hoeren: {
      was: 'Ein Klammer-Rätsel', wo: 'Nach der Schule · im Bus', titel: 'Minus vor der Klammer',
      situation: 'Ben stellt Lina ein Rätsel mit Klammern. Achtung beim Minus vor der Klammer!',
      bild: ['ben:froh:erklaeren', 'lina:froh:handy'], sprecher: { Ben: 'm3', Lina: 'w3' },
      text: [
        ['Ben', 'Stell dir vor, eine Person hat 20 Euro. Sie bezahlt eine Rechnung: 8 Euro, aber sie bekommt 3 Euro Rabatt.'],
        ['Lina', 'Also 20 minus, Klammer auf, 8 minus 3, Klammer zu.'],
        ['Ben', 'Genau. Und wenn du die Klammer auflöst?'],
        ['Lina', 'Minus vor der Klammer dreht alle Vorzeichen um: 20 minus 8 plus 3.'],
        ['Ben', 'Und das sind?'],
        ['Lina', '15 Euro. Mit der Klammer: 8 minus 3 sind 5, und 20 minus 5 sind auch 15. Es stimmt!'],
        ['Ben', 'Und bei Plus vor der Klammer bleibt alles gleich: 20 plus, Klammer auf, 8 minus 3, Klammer zu, sind 20 plus 8 minus 3.'],
      ],
      vor: [{ art: 'mc', auftrag: '10 − (4 − 1) = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['7', '5', '13'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und löse die Klammern auf.', stufe: 2, saetze: ['20 − (8 − 3) = 20 [− 8 + 3] = [15]', '20 + (8 − 3) = 20 [+ 8 − 3] = [25]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Klammer-Detektive: Jede Person schreibt eine Aufgabe mit Minus vor der Klammer. Die anderen lösen sie auf zwei Wegen und vergleichen.', stufe: 3, karten: [
        { titel: 'Regel', text: ['+ ( … ) → Vorzeichen bleiben', '− ( … ) → alle Vorzeichen drehen', 'Danach zusammenfassen'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre an einem Beispiel mit Zahlen, warum sich bei „Minus vor der Klammer“ die Vorzeichen umdrehen.', anfaenge: ['Mein Beispiel: …', 'Mit Klammer: …', 'Ohne Klammer: …'], zeilen: 6 },
  },
]

export const LEKTIONEN = matheLektionen(6, EXTRAS)
