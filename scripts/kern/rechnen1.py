import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from basis import *

BL = []

# ---------------------------------------------------------------- Zahlen & Rechnen (R1–R8)
BL.append(blatt('kk-r1-stellenwert', 'zahlen', 'R1', 'Hunderter, Zehner, Einer', 'Zahlen bis 1000 in die Stellentafel eintragen', 'icon:abacus', [
    I('So ist eine Zahl gebaut', ['H = Hunderter, Z = Zehner, E = Einer.', '345 = 3 Hunderter, 4 Zehner und 5 Einer.']),
    A('Trag die Zahlen in die Stellentafel ein.', 1),
    {'art': 'stellentafel', 'stellen': ['H', 'Z', 'E'], 'komma': 3, 'zeilen': [{'label': 'Beispiel: 345', 'zahl': '345'}, {'label': 'a) 278'}, {'label': 'b) 506'}, {'label': 'c) 90'}, {'label': 'd) 731'}]},
    A('Welche Zahl ist das?', 1),
    P(['3 H + 4 Z + 5 E = ___', '6 H + 2 Z + 0 E = ___', '200 + 60 + 8 = ___', '500 + 7 = ___']),
    A('Zerlege die Zahl.', 2),
    P(['482 = ___ H + ___ Z + ___ E', '309 = ___ H + ___ Z + ___ E'], 1),
    A('Schreib die Zahl mit Ziffern.', 2),
    P(['zweihundertdreißig: ___', 'vierhundertfünf: ___', 'neunhundertneunundneunzig: ___'], 1),
], 'Das Kind benennt Hunderter, Zehner und Einer einer Zahl bis 1000 und trägt Zahlen in die Stellentafel ein.',
   ['Eine Zahl mit Material legen (Hunderterplatten, Zehnerstangen, Einerwürfel).', 'Gemeinsam die Beispielzeile lesen: „3 Hunderter, 4 Zehner, 5 Einer“.', 'Blatt bearbeiten; bei Zahlen mit 0 nachfragen: „Was bedeutet die Null?“'],
   'Der Stellenwert ist die Grundidee unseres Zahlsystems: Dieselbe Ziffer hat je nach Platz einen anderen Wert. Schwierig sind Zahlen mit einer Null (506) und zweistellige Zahlen in der Tafel (90). Viele Kinder sprechen Zahlen richtig, schreiben sie aber verdreht, weil im Deutschen der Einer vor dem Zehner gesprochen wird. Das Legen mit Material und das laute Sprechen „Hunderter – Zehner – Einer“ helfen.',
   ['1) 278: 2 | 7 | 8 · 506: 5 | 0 | 6 · 90: – | 9 | 0 · 731: 7 | 3 | 1', '2) 345 · 620 · 268 · 507', '3) 4 H + 8 Z + 2 E · 3 H + 0 Z + 9 E', '4) 230 · 405 · 999'],
   'Nur Zahlen bis 100 (Z und E) eintragen.', 'Zahlen diktieren, auch mit Null (704, 860).', 'Zehnersystem-Material', schlag=['Stellenwert', 'Zahlenraum 1000', 'Stellentafel']))

BL.append(blatt('kk-r1-nachbarzahlen', 'zahlen', 'R1', 'Vorgänger und Nachfolger', 'Zahlen bis 1000 einordnen: Nachbarzahlen und Nachbarzehner', 'icon:arrow-right', [
    I('Nachbarn', ['Der Vorgänger ist 1 kleiner.', 'Der Nachfolger ist 1 größer.']),
    A('Schreib die Nachbarzahlen auf.', 1),
    T(['Vorgänger', 'Zahl', 'Nachfolger'], [['', '8', ''], ['', '30', ''], ['', '99', ''], ['', '250', ''], ['', '400', ''], ['', '999', '']], beispiel=['44', '45', '46']),
    A('Welche Zahlen gehören in die Kästchen?', 1),
    {'art': 'zahlenstrahl', 'von': '0', 'bis': '100', 'schritt': '10', 'zahlen': ['0', '50', '100'], 'punkte': [{'wert': '20'}, {'wert': '70'}, {'wert': '90'}]},
    A('Zwischen welchen Zehnern liegt die Zahl?', 2),
    P(['___ < 34 < ___', '___ < 67 < ___', '___ < 128 < ___', '___ < 495 < ___']),
], 'Das Kind nennt Vorgänger und Nachfolger von Zahlen bis 1000 und ordnet Zahlen am Zahlenstrahl ein.',
   ['Zahlenreihe im Raum ablaufen oder am Maßband zeigen: ein Schritt vor, ein Schritt zurück.', 'Tabelle ausfüllen; bei 99, 400 und 999 den Übergang besprechen.', 'Zahlenstrahl und Nachbarzehner; zum Schluss Zahlen würfeln und Nachbarn nennen.'],
   'Vorgänger und Nachfolger zeigen, ob ein Kind die Zahlenreihe als geordnete Folge versteht. Kritisch sind die Übergänge: nach 99 kommt 100, vor 400 liegt 399. Hier zählen viele Kinder falsch weiter (zum Beispiel „hundertzehn“ nach 109). Der Zahlenstrahl macht Abstände sichtbar und bereitet das Runden und Überschlagen vor. Nachbarzehner sind die Grundlage für geschicktes Kopfrechnen.',
   ['1) 7/9 · 29/31 · 98/100 · 249/251 · 399/401 · 998/1000', '2) 20 · 70 · 90', '3) 30 und 40 · 60 und 70 · 120 und 130 · 490 und 500'],
   'Nur Zahlen bis 20, mit Zahlenband.', 'Nachbarhunderter suchen (zwischen welchen Hundertern liegt 437?).', schlag=['Vorgänger', 'Nachfolger', 'Zahlenstrahl']))

BL.append(blatt('kk-r1-vergleichen', 'zahlen', 'R1', 'Größer, kleiner, gleich', 'Zahlen bis 1000 vergleichen und ordnen', 'icon:math-greater', [
    I('Die Zeichen', ['> heißt: ist größer als.   < heißt: ist kleiner als.   = heißt: ist gleich.', 'Das Zeichen ist immer zur größeren Zahl hin offen.']),
    A('Setz ein: <, > oder =.', 1),
    P(['7 [] 9', '15 [] 12', '40 [] 40', '68 [] 86', '100 [] 99', '250 [] 205', '399 [] 400', '710 [] 701'], 4),
    A('Ordne die Zahlen. Beginne mit der kleinsten.', 2),
    P(['45, 54, 15, 51:   ___ < ___ < ___ < ___', '320, 230, 302, 203:   ___ < ___ < ___ < ___'], 1),
    A('Kreise in jeder Zeile die größte Zahl ein.', 1, 'einkreisen'),
    P(['199     91     119', '608     680     806', '1000     999     990'], 1),
    A('Tom hat 135 Sticker. Mia hat 153 Sticker. Wer hat mehr?', 2),
    P(['Mehr Sticker hat: ____________'], 1),
], 'Das Kind vergleicht Zahlen bis 1000 mit den Zeichen <, > und = und ordnet sie der Größe nach.',
   ['Zwei Mengen oder Zahlen zeigen: Welche ist größer? Woran sieht man das?', 'Vergleichsregel besprechen: zuerst die Hunderter, dann die Zehner, dann die Einer.', 'Blatt bearbeiten; Zahlendreher (68 und 86) laut lesen lassen.'],
   'Zahlen vergleichen heißt, die Stellen von links nach rechts zu prüfen. Kinder, die nur auf einzelne Ziffern achten, halten 199 für größer als 201. Das Bild vom Krokodilmaul, das zur größeren Zahl hin offen ist, hilft beim Zeichen. Zahlendreher wie 45 und 54 sind bewusst gewählt: Sie zeigen, ob der Stellenwert verstanden ist. Die Sachfrage verbindet das Vergleichen mit einer Situation.',
   ['1) < · > · = · < · > · > · < · >', '2) 15 < 45 < 51 < 54 · 203 < 230 < 302 < 320', '3) 199 · 806 · 1000', '4) Mia'],
   'Nur Zahlen bis 100, mit Material legen.', 'Aus drei Ziffern die größte und die kleinste Zahl bilden.', schlag=['Vergleichen', 'größer kleiner', 'Ordnen']))

BL.append(blatt('kk-r2-zahlenfolgen', 'zahlen', 'R2', 'Wie geht es weiter?', 'Zahlenfolgen und Muster verstehen und fortsetzen', 'icon:timeline', [
    I(text='Schau genau hin: Wie groß ist der Sprung von einer Zahl zur nächsten?', symbol='tipp'),
    A('Setz die Folge fort.', 1),
    P(['1, 3, 5, 7, ___, ___', '2, 4, 6, 8, ___, ___', '5, 10, 15, 20, ___, ___', '10, 20, 30, 40, ___, ___'], 2),
    A('Jetzt rückwärts.', 2),
    P(['20, 18, 16, ___, ___', '50, 45, 40, ___, ___', '100, 90, 80, ___, ___'], 1),
    A('Wie heißt die Regel?', 2),
    P(['3, 6, 9, 12 …   Regel: immer + ___', '40, 36, 32, 28 …   Regel: immer – ___'], 1),
    A('Setz das Muster fort.', 1),
    P(['A  B  A  B  A  ___  ___', 'rot  blau  blau  rot  blau  blau  ______  ______', '1  2  2  3  3  3  4  ___  ___  ___'], 1),
], 'Das Kind erkennt die Regel einer Zahlenfolge oder eines Musters und setzt sie fort.',
   ['Ein Klatschmuster vormachen (klatsch – stampf – stampf); die Kinder setzen es fort.', 'An der ersten Folge gemeinsam die Sprünge einzeichnen: „immer plus 2“.', 'Blatt bearbeiten; zum Schluss erfindet jedes Kind eine eigene Folge für den Partner.'],
   'Muster zu erkennen ist eine Grundlage des mathematischen Denkens: Aus dem, was sich wiederholt, wird eine Regel. Zahlenfolgen in gleichen Schritten bereiten das Einmaleins vor (2er-, 5er-, 10er-Reihe). Hilfreich ist, die Sprünge als Bögen über die Zahlen zu zeichnen und die Regel in Worte zu fassen. Rückwärtsfolgen sind deutlich schwerer und stützen das Minusrechnen.',
   ['1) 9, 11 · 10, 12 · 25, 30 · 50, 60', '2) 14, 12 · 35, 30 · 70, 60', '3) + 3 · – 4', '4) B, A · rot, blau · 4, 4, 4'],
   'Nur Aufgabe 1 und 4; Sprünge am Zahlenband hüpfen.', 'Folgen mit zwei Regeln (1, 2, 4, 5, 7, 8 …).', schlag=['Zahlenfolgen', 'Muster', 'Regeln erkennen']))

BL.append(blatt('kk-r3-mengen', 'zahlen', 'R3', 'Wie viele sind es?', 'Mengen erfassen, bündeln und schätzen', 'icon:layout-grid', [
    A('Wie viele Kästchen sind gefärbt? Zähle geschickt: erst die Zehner, dann die Einer.', 1),
    {'art': 'hunderterfeld', 'spalten': 3, 'felder': [{'label': 'a)', 'gefaerbt': 23}, {'label': 'b)', 'gefaerbt': 40}, {'label': 'c)', 'gefaerbt': 57}]},
    A('Was ist mehr? Kreise ein.', 1, 'einkreisen'),
    P(['12 oder 21', '3 Zehner oder 25 Einer', '4 Zehner oder 39 Einer'], 3),
    A('Schätze zuerst. Zähle dann nach.', 2),
    T(['Was?', 'geschätzt', 'gezählt'], [['Stifte in deinem Mäppchen', '', ''], ['Stühle im Raum', '', ''], ['Fenster im Raum', '', '']], breiten=[3, 1.4, 1.4]),
], 'Das Kind erfasst Mengen strukturiert (Zehner und Einer), vergleicht sie und schätzt Anzahlen.',
   ['Eine Handvoll Bohnen auf den Tisch: schätzen, dann zu Zehnern bündeln und zählen.', 'Hunderterfelder: Spalten sind Zehner – nicht einzeln zählen.', 'Schätzen im Raum; Schätzung und Zählung vergleichen: „Wie nah war ich?“'],
   'Mengenverständnis bedeutet, eine Anzahl als Ganzes und in Teilen zu sehen – nicht nur abzuzählen. Das Bündeln zu Zehnern ist der Schritt vom Zählen zum Rechnen. Im Hunderterfeld sind die Zehner als Spalten sichtbar. Schätzen schult das Gefühl für Größenordnungen; dabei geht es nicht um das genaue Ergebnis, sondern um eine vernünftige Nähe. Kinder mit Rechenschwierigkeiten zählen oft lange einzeln – hier lohnt es, das Bündeln immer wieder zu zeigen.',
   ['1) 23 · 40 · 57', '2) 21 · 3 Zehner · 4 Zehner'],
   'Mengen bis 20 mit Plättchen im Zwanzigerfeld legen.', 'Große Mengen schätzen (Nudeln im Glas) und in Zehnern nachzählen.', 'Bohnen oder Plättchen', schlag=['Mengen', 'Bündeln', 'Schätzen']))

BL.append(blatt('kk-r4-zehnerfreunde', 'zahlen', 'R4', 'Zehnerfreunde', 'Zwei Zahlen, die zusammen 10 ergeben', 'icon:heart-handshake', [
    I('Zehnerfreunde', ['Zwei Zahlen ergeben zusammen 10.', '1 und 9 · 2 und 8 · 3 und 7 · 4 und 6 · 5 und 5']),
    A('Wie viel fehlt bis 10? Schreib die Zahl.', 1),
    P(['7 + ___ = 10', '4 + ___ = 10', '9 + ___ = 10', '2 + ___ = 10', '5 + ___ = 10', '6 + ___ = 10', '1 + ___ = 10', '3 + ___ = 10'], 4),
    A('Verbinde die Zehnerfreunde.', 1, 'verbinden'),
    Z(['1', '2', '3', '4', '5'], ['7', '5', '9', '6', '8']),
    A('Die Zehnerfreunde helfen auch hier.', 2),
    P(['10 – 3 = ___', '10 – 8 = ___', '13 + ___ = 20', '16 + ___ = 20', '30 + ___ = 100', '60 + ___ = 100'], 3),
], 'Das Kind kennt die Zahlenpaare, die zusammen 10 ergeben, und nutzt sie beim Rechnen.',
   ['Zehn Plättchen oder Finger zeigen: einige verdecken – wie viele fehlen?', 'Die Paare gemeinsam aufsagen, dann das Blatt bearbeiten.', 'Am Ende ein Paar würfeln lassen: „Ich habe 4 – wer ist mein Freund?“'],
   'Die Zerlegungen der 10 sind die wichtigste Grundlage für das Rechnen über den Zehner. Kinder, die sie auswendig wissen, müssen nicht mehr zählen und rechnen später schneller und sicherer. Hilfreich sind das Zehnerfeld und die Finger: Was man sieht, plus was fehlt, ergibt immer 10. Erst wenn die Paare sicher sitzen, lohnt die Übertragung auf 20 und auf volle Zehner bis 100.',
   ['1) 3 · 6 · 1 · 8 · 5 · 4 · 9 · 7', '2) 1–9 · 2–8 · 3–7 · 4–6 · 5–5', '3) 7 · 2 · 7 · 4 · 70 · 40'],
   'Mit Zehnerfeld und Plättchen legen lassen.', 'Paare für 20 und für 100 suchen (12 und 8, 30 und 70).', 'Plättchen oder Zehnerfeld', schlag=['Zehnerfreunde', 'Zahlzerlegung', 'Rechnen bis 10']))

BL.append(blatt('kk-r4-zahlen-zerlegen', 'zahlen', 'R4', 'Zahlen zerlegen', 'Eine Zahl in zwei oder drei Teile zerlegen', 'icon:arrow-fork', [
    I('Zerlegen', ['Eine Zahl kann ich in Teile zerlegen.', '8 = 5 + 3   oder   8 = 6 + 2']),
    A('Zerlege die Zahl. Finde zwei verschiedene Wege.', 1),
    P(['6 = ___ + ___', '6 = ___ + ___', '9 = ___ + ___', '9 = ___ + ___', '7 = ___ + ___', '7 = ___ + ___'], 2),
    A('Das Zahlenhaus der 8: Ergänze.', 1),
    P(['8 = 1 + ___', '8 = 2 + ___', '8 = 3 + ___', '8 = 4 + ___', '8 = 5 + ___', '8 = 6 + ___'], 3),
    A('Zerlege in Zehner und Einer.', 2),
    P(['45 = 40 + ___', '63 = ___ + 3', '78 = ___ + ___', '91 = ___ + ___'], 2),
    A('Zerlege in Hunderter, Zehner und Einer.', 3),
    P(['256 = 200 + ___ + ___', '408 = ___ + ___ + ___'], 1),
], 'Das Kind zerlegt Zahlen bis 10 auf verschiedene Weise und größere Zahlen in ihre Stellenwerte.',
   ['Acht Plättchen in zwei Farben werfen (Wendeplättchen): Wie viele rot, wie viele blau?', 'Alle Zerlegungen der 8 geordnet aufschreiben – das Zahlenhaus.', 'Übertragen: Zehner und Einer, dann Hunderter.'],
   'Wer Zahlen flexibel zerlegen kann, sieht in einer Zahl ihre Teile: 8 ist 5 und 3, aber auch 6 und 2. Diese Teil-Ganzes-Vorstellung ist die wichtigste Voraussetzung, um vom zählenden Rechnen wegzukommen. Das geordnete Zahlenhaus zeigt ein Muster: Wird ein Teil um 1 größer, wird der andere um 1 kleiner. Die Zerlegung in Zehner und Einer führt direkt zum halbschriftlichen Rechnen.',
   ['1) z. B. 6 = 1 + 5, 2 + 4, 3 + 3 · 9 = 4 + 5, 3 + 6 · 7 = 3 + 4, 2 + 5', '2) 7 · 6 · 5 · 4 · 3 · 2', '3) 5 · 60 · 70 + 8 · 90 + 1', '4) 50 + 6 · 400 + 0 + 8'],
   'Nur Zahlen bis 6, mit Wendeplättchen.', 'Zahlen in drei Teile zerlegen (10 = 2 + 3 + 5).', 'Wendeplättchen', schlag=['Zahlzerlegung', 'Zahlenhaus', 'Teil-Ganzes']))

BL.append(blatt('kk-r5-malnehmen', 'zahlen', 'R5', 'Malnehmen verstehen', 'Mal heißt: immer wieder das Gleiche dazu', 'icon:math-symbols', [
    I('Malnehmen', ['Mal heißt: immer wieder das Gleiche dazu.', '3 · 4 = 4 + 4 + 4 = 12']),
    A('Schreib als Plus-Aufgabe und als Mal-Aufgabe.', 1),
    T(['Geschichte', 'Plus', 'Mal'], [['4 Tüten mit je 5 Bonbons', '', ''], ['2 Kisten mit je 10 Flaschen', '', ''], ['5 Teller mit je 2 Keksen', '', '']], beispiel=['3 Teller mit je 2 Äpfeln', '2 + 2 + 2 = 6', '3 · 2 = 6'], breiten=[2.6, 2.2, 1.4]),
    A('Zähl in Schritten.', 1),
    P(['2, 4, 6, ___, ___, ___', '5, 10, 15, ___, ___, ___', '10, 20, 30, ___, ___, ___'], 1),
    A('Rechne.', 2),
    P(['2 · 3 = ___', '5 · 2 = ___', '10 · 4 = ___', '2 · 7 = ___', '5 · 5 = ___', '10 · 9 = ___', '2 · 9 = ___', '5 · 8 = ___'], 4),
], 'Das Kind versteht das Malnehmen als wiederholtes Addieren und kennt die 2er-, 5er- und 10er-Reihe.',
   ['Mit echten Dingen legen: 3 Teller, auf jeden 2 Äpfel. „Dreimal zwei.“', 'Plus- und Mal-Aufgabe nebeneinander schreiben; die Sprechweise üben.', 'Reihen im Chor aufsagen und dabei hüpfen oder klatschen.'],
   'Das Einmaleins wird nur dann sicher, wenn das Kind versteht, was Malnehmen bedeutet: gleich große Gruppen zusammenfassen. Deshalb steht am Anfang das Handeln mit Dingen und der Vergleich mit der Plus-Aufgabe. Die Reihen mit 2, 5 und 10 sind die Kernaufgaben – aus ihnen lassen sich später alle anderen ableiten. Auswendiglernen ohne Verständnis führt zu Verwechslungen und schnellem Vergessen.',
   ['1) 5 + 5 + 5 + 5 = 20, 4 · 5 = 20 · 10 + 10 = 20, 2 · 10 = 20 · 2 + 2 + 2 + 2 + 2 = 10, 5 · 2 = 10', '2) 8, 10, 12 · 20, 25, 30 · 40, 50, 60', '3) 6 · 10 · 40 · 14 · 25 · 90 · 18 · 40'],
   'Nur die 2er-Reihe; jede Aufgabe legen.', 'Rechengeschichten zu Mal-Aufgaben erfinden.', 'Plättchen, Teller oder Becher', schlag=['Einmaleins', 'Malnehmen', 'Kernaufgaben']))

BL.append(blatt('kk-r5-einmaleins', 'zahlen', 'R5', 'Das kleine 1×1 üben', 'Kernaufgaben, Nachbaraufgaben und Tauschaufgaben', 'icon:calculator', [
    A('Füll die leeren Felder der Tafel aus.', 1),
    T(['·', '2', '3', '4', '5'], [['2', '4', '', '', ''], ['3', '', '9', '', ''], ['4', '8', '', '16', ''], ['5', '', '', '', '25'], ['10', '20', '', '', '']]),
    A('Kernaufgaben: mal 2, mal 5, mal 10.', 1),
    P(['4 · 2 = ___', '4 · 5 = ___', '4 · 10 = ___', '7 · 2 = ___', '7 · 5 = ___', '7 · 10 = ___'], 3),
    A('Nachbaraufgaben: Die erste Aufgabe hilft dir.', 2),
    P(['5 · 6 = 30, also 6 · 6 = ___', '10 · 7 = 70, also 9 · 7 = ___', '2 · 8 = 16, also 3 · 8 = ___'], 1),
    A('Tauschaufgaben: Das Ergebnis bleibt gleich.', 2),
    P(['3 · 4 = ___ und 4 · 3 = ___', '6 · 2 = ___ und 2 · 6 = ___'], 1),
], 'Das Kind löst Aufgaben des kleinen Einmaleins und nutzt Kern-, Nachbar- und Tauschaufgaben als Rechenhilfe.',
   ['Die Tafel gemeinsam lesen: Zeile mal Spalte.', 'Kernaufgaben wiederholen; dann zeigen, wie man daraus die Nachbaraufgabe gewinnt (eine Gruppe mehr oder weniger).', 'Tauschaufgaben mit einem Punktefeld zeigen: drehen – gleich viele.'],
   'Nicht hundert einzelne Aufgaben, sondern wenige Kernaufgaben und kluge Ableitungen machen das Einmaleins beherrschbar. Wer 5 · 6 kennt, findet 6 · 6 durch eine Gruppe mehr. Die Tauschaufgabe halbiert die Zahl der Aufgaben, die gelernt werden müssen. Dieses Vorgehen entlastet vor allem Kinder mit schwachem Gedächtnis für Zahlenfakten und hält das Verständnis lebendig.',
   ['1) Zeile 2: 4, 6, 8, 10 · Zeile 3: 6, 9, 12, 15 · Zeile 4: 8, 12, 16, 20 · Zeile 5: 10, 15, 20, 25 · Zeile 10: 20, 30, 40, 50', '2) 8 · 20 · 40 · 14 · 35 · 70', '3) 36 · 63 · 24', '4) 12 und 12 · 12 und 12'],
   'Nur Aufgabe 1 und 2, mit Einmaleins-Tafel als Hilfe.', 'Die Tafel bis 10 erweitern.', schlag=['Einmaleins', 'Kernaufgaben', 'Tauschaufgaben']))

BL.append(blatt('kk-r5-teilen', 'zahlen', 'R5', 'Teilen: gerecht verteilen', 'Geteilt-Aufgaben verstehen und mit der Mal-Aufgabe lösen', 'icon:users-group', [
    I('Teilen', ['Teilen heißt: gerecht verteilen. Jeder bekommt gleich viel.', '12 : 3 = 4, denn 4 · 3 = 12.']),
    A('Verteile gerecht. Male zuerst, wenn es dir hilft.', 1),
    P(['12 Bonbons für 3 Kinder: Jedes Kind bekommt ___ .', '10 Stifte für 2 Kinder: Jedes Kind bekommt ___ .', '20 Karten für 5 Kinder: Jedes Kind bekommt ___ .'], 1),
    A('Rechne.', 1),
    P(['8 : 2 = ___', '15 : 5 = ___', '30 : 10 = ___', '12 : 2 = ___', '25 : 5 = ___', '60 : 10 = ___', '18 : 2 = ___', '40 : 5 = ___'], 4),
    A('Die Mal-Aufgabe hilft.', 2),
    P(['4 · 5 = 20, also 20 : 5 = ___', '3 · 10 = 30, also 30 : 10 = ___', '6 · 2 = 12, also 12 : 2 = ___'], 1),
    A('Geht es auf? Oder bleibt etwas übrig?', 3),
    P(['7 Äpfel für 2 Kinder: Jedes bekommt ___ , übrig bleibt ___ .', '11 Sticker für 5 Kinder: Jedes bekommt ___ , übrig bleibt ___ .'], 1),
], 'Das Kind versteht das Teilen als gerechtes Verteilen und löst einfache Geteilt-Aufgaben über die Mal-Aufgabe.',
   ['Zwölf Dinge wirklich an drei Kinder verteilen: eins für dich, eins für dich …', 'Die Rechnung dazu schreiben und mit der Mal-Aufgabe prüfen.', 'Blatt bearbeiten; bei Aufgabe 4 mit Material legen.'],
   'Teilen wird im Alltag ständig gebraucht und ist doch die Rechenart, die am häufigsten unverstanden bleibt. Zwei Vorstellungen gehören dazu: Verteilen (12 an 3 Kinder) und Aufteilen (immer 3 in eine Tüte). Beide führen zur selben Rechnung. Der sicherste Weg zum Ergebnis ist die Umkehrung: Welche Mal-Aufgabe passt? Aufgaben mit Rest zeigen, dass nicht jede Verteilung aufgeht.',
   ['1) 4 · 5 · 4', '2) 4 · 3 · 3 · 6 · 5 · 6 · 9 · 8', '3) 4 · 3 · 6', '4) 3, übrig 1 · 2, übrig 1'],
   'Nur verteilen mit Material, ohne Rechnung.', 'Eigene Verteil-Geschichten mit Rest erfinden.', 'Plättchen oder Bonbons', schlag=['Teilen', 'Division', 'Verteilen']))

BL.append(blatt('kk-r6-plus-ueber-zehner', 'zahlen', 'R6', 'Plus über den Zehner', 'In zwei Schritten rechnen: erst bis zur 10, dann weiter', 'icon:stairs-up', [
    I('Der Trick', ['Erst bis zur 10, dann weiter.', '8 + 5 = 8 + 2 + 3 = 13']),
    A('Rechne in zwei Schritten.', 1),
    P(['8 + 5 = 8 + 2 + ___ = ___', '9 + 4 = 9 + 1 + ___ = ___', '7 + 6 = 7 + 3 + ___ = ___', '6 + 8 = 6 + 4 + ___ = ___'], 1),
    A('Zeichne die zwei Sprünge für 7 + 5 ein. Wo landest du?', 1),
    {'art': 'zahlenstrahl', 'von': '0', 'bis': '20', 'schritt': '1', 'zahlen': ['0', '5', '10', '15', '20']},
    A('Rechne.', 2),
    P(['9 + 3 = ___', '8 + 4 = ___', '7 + 7 = ___', '6 + 9 = ___', '5 + 8 = ___', '9 + 9 = ___', '8 + 7 = ___', '4 + 9 = ___'], 4),
    A('Genauso geht es mit großen Zahlen.', 3),
    P(['28 + 5 = ___', '47 + 6 = ___', '59 + 3 = ___', '36 + 8 = ___'], 4),
], 'Das Kind addiert über den Zehner, indem es bis zur 10 ergänzt und den Rest dazurechnet.',
   ['Im Zwanzigerfeld legen: 8 rote, 5 blaue Plättchen – erst die Zehnerreihe füllen.', 'Die zwei Schritte laut sprechen: „8 plus 2 ist 10, plus 3 ist 13.“', 'Sprünge am Zahlenstrahl einzeichnen; dann frei rechnen.'],
   'Der Zehnerübergang ist die größte Hürde im ersten Rechnen. Kinder, die hier weiterzählen, bleiben oft lange zählende Rechner. Das Rechnen in zwei Schritten verlangt zwei Dinge: die Zehnerfreunde und das Zerlegen der zweiten Zahl. Beides sollte vorher sicher sein. Das Zwanzigerfeld und der Zahlenstrahl machen die Schritte sichtbar. Die Übertragung auf 28 + 5 zeigt, dass der Trick bei jedem Zehner gilt.',
   ['1) 3, 13 · 3, 13 · 3, 13 · 4, 14', '2) 7 + 3 = 10, 10 + 2 = 12', '3) 12 · 12 · 14 · 15 · 13 · 18 · 15 · 13', '4) 33 · 53 · 62 · 44'],
   'Nur Aufgabe 1 und 2, mit Zwanzigerfeld.', 'Aufgaben mit drei Zahlen (7 + 5 + 6).', 'Zwanzigerfeld, Plättchen', schlag=['Zehnerübergang', 'Addition', 'Rechnen bis 20']))

BL.append(blatt('kk-r6-minus-ueber-zehner', 'zahlen', 'R6', 'Minus über den Zehner', 'In zwei Schritten rechnen: erst zurück zur 10, dann weiter', 'icon:stairs', [
    I('Der Trick', ['Erst zurück bis zur 10, dann weiter.', '13 – 5 = 13 – 3 – 2 = 8']),
    A('Rechne in zwei Schritten.', 1),
    P(['13 – 5 = 13 – 3 – ___ = ___', '12 – 4 = 12 – 2 – ___ = ___', '15 – 7 = 15 – 5 – ___ = ___', '14 – 6 = 14 – 4 – ___ = ___'], 1),
    A('Zeichne die zwei Sprünge für 12 – 5 ein. Wo landest du?', 1),
    {'art': 'zahlenstrahl', 'von': '0', 'bis': '20', 'schritt': '1', 'zahlen': ['0', '5', '10', '15', '20']},
    A('Rechne.', 2),
    P(['11 – 3 = ___', '12 – 5 = ___', '14 – 7 = ___', '16 – 8 = ___', '13 – 4 = ___', '15 – 9 = ___', '17 – 8 = ___', '11 – 6 = ___'], 4),
    A('Genauso geht es mit großen Zahlen.', 3),
    P(['32 – 5 = ___', '51 – 4 = ___', '63 – 7 = ___', '84 – 6 = ___'], 4),
], 'Das Kind subtrahiert über den Zehner, indem es erst bis zur 10 zurückgeht und dann den Rest abzieht.',
   ['Im Zwanzigerfeld 13 Plättchen legen und 5 wegnehmen: erst die 3 hinter dem Zehner, dann 2.', 'Die zwei Schritte laut sprechen.', 'Sprünge rückwärts am Zahlenstrahl einzeichnen; dann frei rechnen.'],
   'Minus über den Zehner fällt den meisten Kindern schwerer als Plus, weil das Rückwärtszählen fehleranfällig ist. Die Zerlegung des Abzugs in zwei Teile (erst bis zur 10) ersetzt das Zählen durch zwei leichte Schritte. Als zweiter Weg hilft die Umkehraufgabe: 13 – 5 = ?, denn 5 + ? = 13. Beide Wege dürfen nebeneinander stehen; das Kind wählt den, der ihm sicherer ist.',
   ['1) 2, 8 · 2, 8 · 2, 8 · 2, 8', '2) 12 – 2 = 10, 10 – 3 = 7', '3) 8 · 7 · 7 · 8 · 9 · 6 · 9 · 5', '4) 27 · 47 · 56 · 78'],
   'Nur Aufgabe 1 und 2, mit Zwanzigerfeld.', 'Mit der Umkehraufgabe prüfen (8 + 5 = 13).', 'Zwanzigerfeld, Plättchen', schlag=['Zehnerübergang', 'Subtraktion', 'Rechnen bis 20']))

BL.append(blatt('kk-r7-umkehraufgaben', 'zahlen', 'R7', 'Hin und zurück', 'Rechenarten und ihre Umkehrung verstehen', 'icon:arrows-shuffle', [
    I('Das gehört zusammen', ['Plus und Minus: 3 + 4 = 7, also 7 – 4 = 3.', 'Mal und Geteilt: 3 · 4 = 12, also 12 : 4 = 3.']),
    A('Schreib die Umkehraufgabe.', 1),
    P(['5 + 3 = 8, also 8 – 3 = ___', '6 + 9 = 15, also 15 – ___ = ___', '2 · 5 = 10, also 10 : 5 = ___', '4 · 3 = 12, also 12 : ___ = ___'], 1),
    A('Rechenfamilie: Schreib vier Aufgaben mit den Zahlen 4, 6 und 10.', 2),
    P(['___ + ___ = ___', '___ + ___ = ___', '___ – ___ = ___', '___ – ___ = ___'], 2),
    A('Prüfe mit der Umkehraufgabe. Stimmt das Ergebnis?', 2),
    T(['Aufgabe', 'Probe', 'stimmt', 'stimmt nicht'], [['17 – 9 = 8', '8 + 9 = ___', '', ''], ['24 – 6 = 16', '16 + 6 = ___', '', ''], ['20 : 5 = 4', '4 · 5 = ___', '', '']], breiten=[2, 2, 1, 1.4]),
], 'Das Kind versteht Plus und Minus sowie Mal und Geteilt als Umkehrungen und nutzt die Umkehraufgabe zur Kontrolle.',
   ['Mit Plättchen zeigen: 3 dazu, 3 wieder weg – man ist wieder am Anfang.', 'Rechenfamilien an der Tafel bilden: drei Zahlen, vier Aufgaben.', 'Die Probe als Gewohnheit einführen: „Stimmt das? Rechne zurück.“'],
   'Rechenarten hängen zusammen: Was Plus hinzufügt, nimmt Minus wieder weg; was Mal vervielfacht, teilt Geteilt wieder auf. Wer das verstanden hat, braucht weniger auswendig zu wissen und kann jede Rechnung selbst kontrollieren. Rechenfamilien (drei Zahlen, vier Aufgaben) machen den Zusammenhang sichtbar. Die Probe gibt Kindern Unabhängigkeit: Sie müssen nicht auf die Bestätigung durch Erwachsene warten.',
   ['1) 5 · 9 = 6 (oder 6 = 9) · 2 · 4 = 3 (oder 3 = 4)', '2) 4 + 6 = 10 · 6 + 4 = 10 · 10 – 4 = 6 · 10 – 6 = 4', '3) 17: stimmt · 22: stimmt nicht (richtig ist 18) · 20: stimmt'],
   'Nur Plus und Minus bis 10, mit Plättchen.', 'Rechenfamilien für Mal und Geteilt (3, 5, 15).', schlag=['Umkehraufgabe', 'Probe', 'Rechenfamilie']))

BL.append(blatt('kk-r7-welche-rechenart', 'zahlen', 'R7', 'Plus, minus, mal oder geteilt?', 'In Rechengeschichten die passende Rechenart finden', 'icon:question-mark', [
    I('Signalwörter', ['zusammen, dazu, mehr → plus', 'weg, übrig, weniger → minus', 'je, jeder bekommt gleich viele → mal', 'verteilen, aufteilen → geteilt']),
    A('Welche Rechenart passt? Kreise das Zeichen ein und rechne.', 1),
    T(['Geschichte', 'Zeichen', 'Rechnung'], [['Lea hat 8 Sticker. Sie bekommt 5 dazu.', '+   –   ·   :', ''], ['Im Bus sind 20 Leute. 6 steigen aus.', '+   –   ·   :', ''], ['4 Kinder bekommen je 3 Kekse.', '+   –   ·   :', ''], ['12 Bälle werden auf 3 Kisten verteilt.', '+   –   ·   :', '']], breiten=[3.2, 1.5, 2]),
    A('Erfinde eine Rechengeschichte zu 6 + 7.', 2, 'schreiben'),
    LIN(2),
], 'Das Kind erkennt in einfachen Sachsituationen, welche Rechenart passt, und schreibt die Rechnung auf.',
   ['Eine Geschichte vorspielen (Kinder steigen aus dem „Bus“ aus): Wird es mehr oder weniger?', 'Signalwörter sammeln und den Rechenarten zuordnen.', 'Geschichten lesen, Zeichen einkreisen, rechnen; eigene Geschichte vorlesen.'],
   'Viele Kinder können rechnen, wissen aber bei Sachaufgaben nicht, was zu rechnen ist. Entscheidend ist die Vorstellung der Handlung: Kommt etwas dazu, geht etwas weg, gibt es gleiche Gruppen, wird verteilt? Signalwörter sind eine Stütze, ersetzen aber nicht das Verstehen – deshalb Geschichten spielen oder zeichnen lassen. Eigene Rechengeschichten zu erfinden ist die beste Kontrolle, ob die Rechenart mit Bedeutung gefüllt ist.',
   ['1) + : 8 + 5 = 13 · – : 20 – 6 = 14 · · : 4 · 3 = 12 · : : 12 : 3 = 4'],
   'Nur Plus und Minus; Geschichten mit Material nachspielen.', 'Zu jeder Rechenart eine eigene Geschichte schreiben.', schlag=['Sachaufgaben', 'Rechenarten', 'Rechengeschichten']))

BL.append(blatt('kk-r8-kopfrechnen', 'zahlen', 'R8', 'Kopfrechnen bis 100', 'Geschickt im Kopf rechnen: erst die Zehner, dann die Einer', 'icon:brain', [
    A('Zehner und Zehner.', 1),
    P(['30 + 40 = ___', '50 + 20 = ___', '60 + 30 = ___', '80 – 50 = ___', '70 – 30 = ___', '100 – 40 = ___'], 3),
    A('Nur Zehner oder nur Einer dazu.', 1),
    P(['34 + 20 = ___', '45 + 30 = ___', '62 + 5 = ___', '78 – 20 = ___', '59 – 40 = ___', '87 – 6 = ___'], 3),
    A('Erst die Zehner, dann die Einer.', 2),
    P(['24 + 13 = ___', '52 + 26 = ___', '41 + 38 = ___', '67 – 25 = ___', '89 – 34 = ___', '76 – 43 = ___'], 3),
    A('Blitzrechnen mit einem Partner: Wie viele Aufgaben schaffst du in einer Minute?', 2, 'partner'),
    P(['Montag: ___', 'Mittwoch: ___', 'Freitag: ___'], 3),
], 'Das Kind rechnet Plus- und Minusaufgaben im Zahlenraum 100 ohne Zehnerübergang im Kopf.',
   ['Am Hunderterfeld zeigen: Zehner dazu heißt eine Zeile tiefer, Einer dazu heißt nach rechts.', 'Rechenweg laut sprechen: „24 plus 10 ist 34, plus 3 ist 37.“', 'Blitzrechnen dreimal in der Woche; die eigene Zahl notieren.'],
   'Kopfrechnen bis 100 baut auf zwei Dingen auf: dem sicheren Rechnen bis 20 und dem Verständnis von Zehnern und Einern. Wer weiß, dass 3 + 4 = 7 ist, kennt auch 30 + 40 = 70. Das schrittweise Rechnen (erst die Zehner, dann die Einer) ist der tragfähigste Weg. Tägliches kurzes Üben mit persönlicher Bestzahl motiviert mehr als lange Päckchen – das Kind misst sich nur an sich selbst.',
   ['1) 70 · 70 · 90 · 30 · 40 · 60', '2) 54 · 75 · 67 · 58 · 19 · 81', '3) 37 · 78 · 79 · 42 · 55 · 33'],
   'Nur Aufgabe 1 und 2, mit Hunderterfeld.', 'Aufgaben mit Zehnerübergang (38 + 25, 72 – 36).', 'Hunderterfeld, Sanduhr', schlag=['Kopfrechnen', 'Zahlenraum 100', 'Blitzrechnen']))

BL.append(blatt('kk-r8-verdoppeln-halbieren', 'zahlen', 'R8', 'Verdoppeln und halbieren', 'Das Doppelte und die Hälfte im Kopf finden', 'icon:friends', [
    I('So geht es', ['Verdoppeln: die Zahl plus sich selbst. 6 + 6 = 12', 'Halbieren: in zwei gleiche Teile. 12 ist 6 und 6.']),
    A('Wie viel ist das Doppelte?', 1),
    P(['von 4: ___', 'von 7: ___', 'von 10: ___', 'von 15: ___', 'von 25: ___', 'von 40: ___'], 3),
    A('Wie viel ist die Hälfte?', 1),
    P(['von 8: ___', 'von 14: ___', 'von 20: ___', 'von 50: ___', 'von 30: ___', 'von 100: ___'], 3),
    A('Fast-Verdoppeln: Die erste Aufgabe hilft dir.', 2),
    P(['6 + 6 = 12, also 6 + 7 = ___', '8 + 8 = 16, also 8 + 9 = ___', '20 + 20 = 40, also 20 + 21 = ___'], 1),
    A('Im Alltag.', 2),
    P(['Ein Eis kostet 2 €. Zwei Eis kosten ___ €.', 'Eine Pizza kostet 8 €. Zwei Kinder teilen den Preis. Jedes zahlt ___ €.'], 1),
], 'Das Kind verdoppelt und halbiert Zahlen bis 100 im Kopf und nutzt Verdopplungen als Rechenhilfe.',
   ['Mit einem Spiegel an Plättchen zeigen: Das Spiegelbild verdoppelt.', 'Verdopplungen bis 10 + 10 auswendig üben; dann halbieren als Umkehrung.', 'Fast-Verdoppeln erklären: eins mehr als das Doppelte.'],
   'Verdopplungen prägen sich leicht ein und sind starke Stützpunkte: Aus 6 + 6 folgt 6 + 7, aus 8 + 8 folgt 8 + 9. Halbieren ist die Umkehrung und bereitet das Teilen sowie die Begriffe halb und Viertel vor. Im Alltag begegnen beide ständig – beim Teilen von Kosten, beim Abmessen im Rezept, bei Preisen. Ein Spiegel macht das Verdoppeln für jüngere oder schwächere Rechner sichtbar.',
   ['1) 8 · 14 · 20 · 30 · 50 · 80', '2) 4 · 7 · 10 · 25 · 15 · 50', '3) 13 · 17 · 41', '4) 4 € · 4 €'],
   'Nur Zahlen bis 10, mit Spiegel und Plättchen.', 'Mehrfach halbieren (40 – 20 – 10 – 5).', 'Spiegel, Plättchen', schlag=['Verdoppeln', 'Halbieren', 'Kopfrechnen']))

schreibe(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'data', 'blaetter', 'kern-2.json'), BL)
