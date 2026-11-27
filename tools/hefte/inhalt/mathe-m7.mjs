// Mathematik · Modul 7 „Gleichungen, Geld und Volumen“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (Programm VP Mathematik, Modul 7: Gleichungen mit einer Unbekannten,
// Bankkonto Soll/Haben, Zinsen, Volumeneinheiten mit der Umwandlungstabelle, Volumen von Quader, Würfel, Prisma und Zylinder).
// Neu hier: Szenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { zahlenstrahl } from './mathe-bilder.mjs'

export const MODUL = matheModul(7, {
  titelFr: 'Équations, argent et volumes',
  unterFr: 'Résoudre des équations comme avec une balance, comprendre le compte bancaire et les intérêts, calculer le volume des solides.',
  deckbild: ['sami:froh:zeigen-hoch', 'mia:froh:handy', 'yusuf:froh:erklaeren'],
  blasen: [{ t: '3x + 5 = 20', x: 12, y: 112 }, { t: '2 % Zinsen', x: 112, y: 98 }, { t: 'V = a · b · c', x: 166, y: 150 }],
  themenIcons: ['scale', 'building-bank', 'box'],
  aussprache: { '\\b(\\d+)x\\b': '\\1 x', 'm³': 'Kubikmeter', 'dm³': 'Kubikdezimeter', 'cm³': 'Kubikzentimeter', 'mm³': 'Kubikmillimeter' },
})

const EXTRAS = [
  // 1 Gleichungen – die Waage
  {
    fr: 'Je comprends une équation comme une balance et je résous des équations simples (x + 7 = 15, 4x = 20). Je vérifie ma solution.',
    bild: ['sami:froh:stehen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Auf dem Markt', wo: 'Wochenmarkt · alte Balkenwaage', titel: 'Was wiegt das Glas?',
      situation: 'Sami hilft an einem Marktstand mit Honig. Die Verkäuferin hat noch eine alte Balkenwaage mit Gewichten.',
      bild: ['verkaeuferin:froh:erklaeren', 'sami:froh:stehen'], sprecher: { Verkäuferin: 'w1', Sami: 'm3' },
      text: [
        ['Verkäuferin', 'Links liegen ein Honigglas und ein 200-Gramm-Gewicht. Rechts liegen 700 Gramm. Die Waage ist gerade.'],
        ['Sami', 'Dann wiegt das Glas … ich nenne es x. Also x plus 200 gleich 700.'],
        ['Verkäuferin', 'Genau. Und wie bekommst du das Glas allein auf die Seite?'],
        ['Sami', 'Ich nehme auf beiden Seiten 200 Gramm weg. Dann bleibt links das Glas und rechts 500 Gramm.'],
        ['Verkäuferin', 'Richtig: x gleich 500. Und jetzt vier gleiche Gläser zusammen: 2 Kilo.'],
        ['Sami', 'Vier x gleich 2000 Gramm. Ich teile beide Seiten durch 4: x gleich 500. Passt – jedes Glas wiegt 500 Gramm!'],
      ],
      vor: [{ art: 'mc', auftrag: 'x + 200 = 700. Was ist x? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['500', '900', '3,5'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['x + 200 = 700 | − [200] → x = [500]', '4x = 2000 | : [4] → x = [500]', 'Probe: 500 + 200 = [700] ✓'] }],
      nach: [{ art: 'sprechen', auftrag: 'Waage-Rätsel: Eine Person zeichnet eine Waage mit Päckchen (x) und Gewichten. Die andere stellt die Gleichung auf, löst sie und sagt die Probe laut.', stufe: 2, karten: [
        { titel: 'Das Gegenteil', text: ['aus + wird −, aus − wird +', 'aus · wird :, aus : wird ·', 'Immer auf beiden Seiten!'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit der Waage, wie du x + 9 = 15 löst. Was machst du auf beiden Seiten – und warum?', anfaenge: ['Auf der Waage liegen …', 'Ich nehme auf beiden Seiten …', 'Die Probe: …'] },
  },
  // 2 Gleichungen in zwei Schritten
  {
    fr: 'Je résous des équations en deux étapes (3x + 5 = 20), aussi avec des solutions négatives, et je vérifie.',
    bild: ['lina:froh:handy', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Im Handyladen', wo: 'Handyladen · Tarife vergleichen', titel: 'Wie viele Datenpakete?',
      situation: 'Lina schaut ihre Handyrechnung an. Sie versteht nicht, wie die 20 € zustande kommen.',
      bild: ['verkaeuferin:froh:erklaeren', 'lina:froh:handy'], sprecher: { Verkäuferin: 'w1', Lina: 'w2' },
      text: [
        ['Lina', 'Meine Rechnung ist 20 Euro. Ich dachte, der Tarif kostet nur 5 Euro.'],
        ['Verkäuferin', 'Die Grundgebühr ist 5 Euro. Jedes extra Datenpaket kostet 3 Euro.'],
        ['Lina', 'Dann rechne ich: 3 mal x plus 5 gleich 20. Zuerst die 5 weg: 3x gleich 15.'],
        ['Verkäuferin', 'Und dann?'],
        ['Lina', 'Durch 3: x gleich 5. Ich habe fünf Pakete gekauft. Das ist viel.'],
        ['Verkäuferin', 'Mit dem größeren Tarif zahlst du 12 Euro, und es sind 3 Pakete schon dabei.'],
        ['Lina', 'Dann hätte ich für 2 extra Pakete bezahlt: 12 plus 6 – 18 Euro. Das ist billiger als 20!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was rechnest du bei 3x + 5 = 20 zuerst? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['− 5 auf beiden Seiten', ': 3 auf beiden Seiten', '20 − 3'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Rechne mit.', stufe: 2, items: [{ a: '3x + 5 = 20 → x = ?', l: 'x = 5 (fünf Pakete)', raum: 2 }, { a: 'Größerer Tarif: 12 + 3 · 2 = ?', l: '18 €', raum: 1 }, { a: 'Wie viel spart Lina?', l: '20 − 18 = 2 €', raum: 1 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Tarif-Check: Erfindet zwei Tarife (Grundgebühr und Preis pro Paket). Bei wie vielen Paketen ist welcher Tarif billiger? Erklärt es euch gegenseitig.', stufe: 3, karten: [
        { titel: 'Zwei Schritte', text: ['1. Zahl ohne x weg', '2. Zahl vor x weg', '3. Probe'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre einer Person, die krank war, wie man 4x − 7 = 13 löst. Schreib jeden Schritt mit Begründung.', anfaenge: ['Zuerst rechne ich …, weil …', 'Dann …', 'Zum Schluss prüfe ich …'], zeilen: 6 },
  },
  // 3 Sachaufgaben mit Gleichungen
  {
    fr: 'Je traduis un problème en équation, je la résous et j’écris une phrase-réponse.',
    bild: ['amira:froh:handy', 'ben:froh:erklaeren'],
    hoeren: {
      was: 'Den Klassenausflug planen', wo: 'Klassenrat · Kosten teilen', titel: 'Wie viel zahlt jede Person?',
      situation: 'Amira und Ben planen einen Ausflug in einen Kletterpark. Sie wollen wissen, wie viel jede Person bezahlen muss.',
      bild: ['amira:froh:handy', 'ben:froh:erklaeren'], sprecher: { Amira: 'w2', Ben: 'm3' },
      text: [
        ['Amira', 'Der Bus kostet 180 Euro. Der Eintritt ist für alle gleich, aber ich weiß ihn nicht mehr.'],
        ['Ben', 'Wir sind 20 Personen. Insgesamt kostet alles 480 Euro. Das hat die Lehrerin gesagt.'],
        ['Amira', 'Der Eintritt ist x. Dann: 20 mal x plus 180 gleich 480.'],
        ['Ben', 'Minus 180: 20x gleich 300. Durch 20: x gleich 15. Der Eintritt kostet 15 Euro.'],
        ['Amira', 'Und wie viel zahlt jede Person, wenn wir den Bus teilen?'],
        ['Ben', '480 durch 20 – das sind 24 Euro pro Person.'],
        ['Amira', 'Probe: 20 mal 24 gleich 480. Stimmt. Ich schreibe es in den Klassenchat.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Gleichung passt? 20 Personen zahlen je x € Eintritt, dazu 180 € Bus, zusammen 480 €.', stufe: 1, fragen: [{ f: '', o: ['20x + 180 = 480', '20 + 180x = 480', 'x + 180 = 480 · 20'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['20x + 180 = 480 | − 180 → 20x = [300]', '| : 20 → x = [15] €', 'Pro Person mit Bus: 480 : 20 = [24] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Plant zu zweit einen eigenen Ausflug (Kino, Bowling, Schwimmbad): festen Preis und Preis pro Person erfinden. Die andere Gruppe stellt die Gleichung auf und löst sie.', stufe: 3, karten: [
        { titel: 'Fünf Schritte', text: ['x = …?', 'Gleichung', 'lösen', 'Probe', 'Antwortsatz'] }] }],
    },
    erklaeren: { auftrag: 'Schreib eine eigene Sachaufgabe aus deinem Alltag, die man mit einer Gleichung lösen kann. Löse sie und schreib einen Antwortsatz.', anfaenge: ['Meine Aufgabe: …', 'x ist …', 'Die Gleichung: …', 'Antwort: …'], zeilen: 7 },
  },
  // 4 Bankkonto
  {
    fr: 'Je lis un relevé de compte, je distingue crédit et débit et je calcule le nouveau solde, aussi en dessous de zéro.',
    bild: ['ben:froh:handy', 'verkaeuferin:froh:erklaeren'],
    erklBild: zahlenstrahl(-40, 40, { teile: 8, zahlen: [-40, -20, 0, 20, 40], marken: [{ w: 30, t: 'Start 30 €' }, { w: -15, t: '− 45 € → −15 €' }] }),
    hoeren: {
      was: 'In der Bank', wo: 'Bankschalter · der erste Kontoauszug', titel: 'Warum steht da ein Minus?',
      situation: 'Ben hat seinen ersten Kontoauszug in der Banking-App. Ganz unten steht −15 €. Ben fragt am Schalter nach.',
      bild: ['verkaeuferin:froh:erklaeren', 'ben:froh:handy'], sprecher: { Bankberaterin: 'w1', Ben: 'm3' },
      text: [
        ['Ben', 'Da steht minus 15 Euro. Habe ich jetzt Schulden?'],
        ['Bankberaterin', 'Schauen wir zusammen. Am Anfang des Monats waren 30 Euro auf dem Konto.'],
        ['Ben', 'Dann kamen 40 Euro Taschengeld dazu. Das steht als Haben, also plus.'],
        ['Bankberaterin', 'Richtig. Dann gingen ab: das Handy mit 25 Euro und die Online-Bestellung mit 60 Euro. Das ist Soll, also minus.'],
        ['Ben', '30 plus 40 sind 70. Minus 25 sind 45. Minus 60 … minus 15. Stimmt leider.'],
        ['Bankberaterin', 'Dein Konto ist überzogen. Dafür verlangen Banken oft Zinsen oder Gebühren. Am besten zahlst du bald wieder etwas ein.'],
        ['Ben', 'Nächste Woche bekomme ich 50 Euro für den Ferienjob. Dann habe ich wieder 35 Euro.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Soll“ (débit) auf dem Kontoauszug?', stufe: 1, fragen: [{ f: '', o: ['Geld geht ab (minus)', 'Geld kommt dazu (plus)', 'der Kontostand'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Lies mit und fülle den Kontoauszug aus.', stufe: 2, kopf: ['Buchung', 'Haben (+)', 'Soll (−)', 'Kontostand'], breiten: [34, 22, 22, 22], zeilen: [['Anfang', '', '', '30 €'], ['Taschengeld', '[40 €]', '', '[70 €]'], ['Handy', '', '[25 €]', '[45 €]'], ['Bestellung', '', '[60 €]', '[−15 €]'], ['Ferienjob', '[50 €]', '', '[35 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Budget-Gespräch: Was hätte Ben anders machen können, damit das Konto nicht ins Minus geht? Sammelt drei Tipps und begründet sie.', stufe: 2, karten: [
        { titel: 'Haben und Soll', text: ['Haben = crédit = +', 'Soll = débit = −', 'unter 0 = überzogen'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre jemandem, der noch kein Konto hat, was Soll, Haben und „überzogen“ bedeuten. Nutze ein eigenes Beispiel mit Zahlen.', anfaenge: ['Haben bedeutet …', 'Soll bedeutet …', 'Überzogen ist ein Konto, wenn …'], zeilen: 6 },
  },
  // 5 Zinsen
  {
    fr: 'Je calcule des intérêts pour un an, plusieurs années ou quelques mois. Je sais : en épargnant, je reçois des intérêts ; avec un crédit, j’en paie.',
    bild: ['mia:froh:stehen', 'opa:froh:erklaeren'],
    hoeren: {
      was: 'Sparen für den Führerschein', wo: 'Küche · Sparbuch und Werbung', titel: 'Sparen oder Raten?',
      situation: 'Mia möchte später den Führerschein machen und spart dafür. Ihr Opa zeigt ihr zwei Angebote.',
      bild: ['opa:froh:erklaeren', 'mia:froh:stehen'], sprecher: { Opa: 'm2', Mia: 'w2' },
      text: [
        ['Opa', 'Du hast 1.200 Euro gespart. Auf dem Sparbuch gibt es 2 Prozent Zinsen im Jahr.'],
        ['Mia', '1 Prozent von 1.200 sind 12 Euro. 2 Prozent sind 24 Euro im Jahr.'],
        ['Opa', 'Und in 3 Jahren, wenn die Zinsen gleich bleiben?'],
        ['Mia', '24 mal 3 – das sind 72 Euro. Dann habe ich 1.272 Euro.'],
        ['Opa', 'Jetzt schau dir diese Werbung an: Neues Handy für 900 Euro, bezahlbar in 12 Raten zu 82 Euro.'],
        ['Mia', '12 mal 82 sind 984 Euro. Das sind 84 Euro mehr als 900! Das ist ja mehr, als ich in drei Jahren an Zinsen bekomme.'],
        ['Opa', 'Genau. Beim Sparen arbeitet das Geld für dich. Beim Kredit arbeitest du für die Bank.'],
      ],
      vor: [{ art: 'mc', auftrag: '2 % von 1.200 € sind … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['24 €', '2,40 €', '240 €'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Rechne mit.', stufe: 2, items: [{ a: 'Zinsen in 1 Jahr: 1.200 · 2 : 100 = ?', l: '24 €', raum: 1 }, { a: 'Zinsen in 3 Jahren?', l: '72 € → 1.272 €', raum: 1 }, { a: 'Ratenkauf: 12 · 82 € − 900 € = ?', l: '84 € mehr', raum: 2 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Werbe-Check: Sucht (oder erfindet) ein Angebot „Jetzt kaufen, später zahlen“. Rechnet aus, wie viel man am Ende wirklich zahlt. Würdet ihr es nehmen? Begründet.', stufe: 3, karten: [
        { titel: 'Zinsen', text: ['1 Jahr: Kapital · Satz : 100', 'Jahre: mal Jahre', 'Monate: : 12 · Monate'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen Sparzinsen und Kreditzinsen. Schreib zu beiden ein Beispiel mit Zahlen.', anfaenge: ['Wenn ich spare, …', 'Wenn ich einen Kredit nehme, …', 'Darum …'], zeilen: 6 },
  },
  // 6 Volumeneinheiten
  {
    fr: 'Je connais m³, dm³, cm³ et mm³. Je sais que 1 dm³ = 1 l et 1 cm³ = 1 ml. Je convertis avec l’abaque.',
    bild: ['yusuf:froh:erklaeren', 'chef:froh:erklaeren'],
    hoeren: {
      was: 'Im Getränkemarkt', wo: 'Getränkemarkt · Ferienjob', titel: 'Wie viele Liter passen in den Kühlraum?',
      situation: 'Yusuf hat einen Ferienjob im Getränkemarkt. Der Chef erklärt, wie man Volumen und Liter zusammenbringt.',
      bild: ['chef:froh:erklaeren', 'yusuf:froh:erklaeren'], sprecher: { Chef: 'm2', Yusuf: 'm1' },
      text: [
        ['Chef', 'Siehst du diesen Würfel aus Plexiglas? Jede Kante ist 10 Zentimeter lang. Das ist ein Kubikdezimeter.'],
        ['Yusuf', 'Und wie viel Wasser passt hinein?'],
        ['Chef', 'Genau ein Liter. Ein Kubikdezimeter ist ein Liter.'],
        ['Yusuf', 'Und der Kühlraum? Der hat 12 Kubikmeter.'],
        ['Chef', 'Ein Kubikmeter sind tausend Kubikdezimeter, also tausend Liter. 12 Kubikmeter sind 12.000 Liter.'],
        ['Yusuf', 'Und diese kleine Dose mit 330 Millilitern – das sind 330 Kubikzentimeter, oder?'],
        ['Chef', 'Richtig. Und in der Umwandlungstabelle hat jede Einheit drei Spalten, weil es immer mal tausend geht.'],
      ],
      vor: [{ art: 'mc', auftrag: '1 dm³ = … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['1 l', '1 ml', '10 l'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['1 dm³ = [1] l', '12 m³ = [12.000] dm³ = [12.000] l', '330 ml = [330] cm³'] }],
      nach: [{ art: 'sprechen', auftrag: 'Schätz-Runde: Wie viele Liter passen in ein Waschbecken, eine Badewanne, einen Kühlschrank, das Klassenzimmer? Erst schätzen, dann begründen.', stufe: 2, karten: [
        { titel: 'Merken', text: ['1 m³ = 1.000 dm³', '1 dm³ = 1 l = 1.000 cm³', '1 cm³ = 1 ml'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum in der Umwandlungstabelle für Volumen jede Einheit drei Spalten hat. Zeig es an einem Beispiel.', anfaenge: ['Von m³ zu dm³ …', 'Darum hat jede Einheit …', 'Beispiel: …'] },
  },
  // 7 Quader und Würfel
  {
    fr: 'Je calcule le volume du pavé droit et du cube (V = L · l · h) et je convertis en litres.',
    bild: ['lea:froh:zeigen', 'opa:froh:stehen'],
    hoeren: {
      was: 'Das neue Aquarium', wo: 'Zoohandlung · Aquarien', titel: '54 oder 63 Liter?',
      situation: 'Lea möchte ein Aquarium für ihre Fische. In der Zoohandlung stehen zwei Modelle. Ihr Opa ist mit dabei.',
      bild: ['lea:froh:zeigen', 'opa:froh:stehen'], sprecher: { Lea: 'w2', Opa: 'm2' },
      text: [
        ['Lea', 'Das blaue Aquarium ist 60 Zentimeter lang, 30 breit und 30 hoch.'],
        ['Opa', 'Dann rechne: Länge mal Breite mal Höhe.'],
        ['Lea', '60 mal 30 sind 1.800, mal 30 sind 54.000 Kubikzentimeter. Das sind 54 Liter.'],
        ['Opa', 'Und das grüne? 70 lang, 30 breit, 30 hoch.'],
        ['Lea', '70 mal 30 mal 30 – 63.000 Kubikzentimeter, also 63 Liter.'],
        ['Opa', 'Aber Vorsicht: Man füllt nie bis ganz oben. Wenn das Wasser nur 25 Zentimeter hoch steht?'],
        ['Lea', 'Dann 70 mal 30 mal 25 – 52.500 Kubikzentimeter. 52,5 Liter. Das reicht für meine Fische.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie rechnest du das Volumen eines Quaders? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Länge · Breite · Höhe', 'Länge + Breite + Höhe', '2 · (Länge + Breite)'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Rechne mit.', stufe: 2, items: [{ a: 'Blaues Aquarium: 60 · 30 · 30 = ? cm³ = ? l', l: '54.000 cm³ = 54 l', raum: 1 }, { a: 'Grünes Aquarium: 70 · 30 · 30 = ? l', l: '63 l', raum: 1 }, { a: 'Grün, Wasser 25 cm hoch: ? l', l: '52.500 cm³ = 52,5 l', raum: 1 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt drei Schachteln oder Schränke im Raum. Rechnet ihr Volumen aus. Welche fasst am meisten? Passt die Schätzung?', stufe: 2, karten: [
        { titel: 'Formel', text: ['Quader: V = a · b · c', 'Würfel: V = a · a · a', '1.000 cm³ = 1 l'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit Würfeln (Schichten), warum man beim Quader Länge · Breite · Höhe rechnet.', anfaenge: ['Auf den Boden passen …', 'Dann stapele ich …', 'Darum …'] },
  },
  // 8 Prisma und Zylinder
  {
    fr: 'Je calcule le volume du prisme droit à base triangulaire et du cylindre (V = aire de la base · hauteur).',
    bild: ['finn:froh:stehen', 'chloe:froh:erklaeren'],
    hoeren: {
      was: 'Die Riesendose', wo: 'Pause · am Getränkeautomaten', titel: 'Steckt da wirklich ein halber Liter drin?',
      situation: 'Finn und Chloe stehen am Getränkeautomaten. Finn glaubt nicht, dass in die schlanke Dose 500 ml passen.',
      bild: ['finn:froh:stehen', 'chloe:froh:erklaeren'], sprecher: { Finn: 'm3', Chloe: 'w2' },
      text: [
        ['Finn', 'Auf der Dose steht 500 Milliliter. Die sieht aber viel kleiner aus.'],
        ['Chloe', 'Komm, wir messen nach. Der Durchmesser ist 6,6 Zentimeter, die Höhe 16,8 Zentimeter.'],
        ['Finn', 'Und wie rechnet man das bei einem Kreis?'],
        ['Chloe', 'Erst die Grundfläche: Radius ist die Hälfte, 3,3. Dann 3,14 mal 3,3 mal 3,3 – ungefähr 34,2 Quadratzentimeter.'],
        ['Finn', 'Und dann mal die Höhe: 34,2 mal 16,8 … ungefähr 575 Kubikzentimeter.'],
        ['Chloe', 'Also passen sogar etwa 575 Milliliter hinein. Oben bleibt Luft, damit die Dose nicht platzt.'],
        ['Finn', 'Okay. Die Dose ist größer, als sie aussieht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Durchmesser ist 6,6 cm. Wie groß ist der Radius?', stufe: 1, fragen: [{ f: '', o: ['3,3 cm', '13,2 cm', '6,6 cm'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['r = 6,6 : 2 = [3,3] cm', 'G = 3,14 · 3,3 · 3,3 ≈ [34,2] cm²', 'V ≈ 34,2 · 16,8 ≈ [575] cm³ = [575] ml'] }],
      nach: [{ art: 'sprechen', auftrag: 'Bringt verschiedene Dosen oder Flaschen mit (zylinderförmig). Messt, rechnet und vergleicht mit der Angabe auf dem Etikett. Wo bleibt Luft?', stufe: 3, karten: [
        { titel: 'V = G · h', text: ['Dreieck: G = g · h : 2', 'Kreis: G = 3,14 · r · r', 'r = d : 2'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum man bei Quader, Prisma und Zylinder immer „Grundfläche mal Höhe“ rechnen kann.', anfaenge: ['Alle drei Körper haben …', 'Wenn ich die Grundfläche …', 'Darum …'] },
  },
]

export const LEKTIONEN = matheLektionen(7, EXTRAS)
