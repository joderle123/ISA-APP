import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from basis import *

BL = []
UHR = lambda label, h, m: {'h': 36, 'label': label, 'text': '', 'elemente': [{'t': 'uhr', 'x': 20, 'y': 18, 'r': 15, 'h': h, 'm': m}]}

# ---------------------------------------------------------------- Geld, Maße, Zeit (R9–R14)
BL.append(blatt('kk-r9-muenzen-scheine', 'groessen', 'R9', 'Münzen und Scheine', 'Geldwerte kennen, zusammenzählen und mit Komma schreiben', 'icon:coin-euro', [
    I('Unser Geld', ['1 Euro = 100 Cent', 'Münzen: 1, 2, 5, 10, 20, 50 Cent, 1 Euro, 2 Euro', 'Scheine: 5, 10, 20, 50 Euro']),
    A('Wie viel Geld ist das zusammen?', 1),
    P(['2 € + 1 € + 50 ct = ___ € ___ ct', '1 € + 20 ct + 20 ct + 10 ct = ___ € ___ ct', '5 € + 2 € + 2 € = ___ €', '10 € + 5 € + 1 € + 50 ct = ___ € ___ ct'], 1),
    A('Schreib den Betrag mit Komma.', 2),
    P(['2 € 50 ct = {2,50} €', '1 € 20 ct = ___ €', '3 € 5 ct = ___ €', '80 ct = ___ €'], 2),
    A('Was ist mehr? Setz <, > oder = ein.', 2),
    P(['1 € [] 90 ct', '2,50 € [] 2,05 €', '100 ct [] 1 €', '5 € [] 4,99 €'], 2),
    A('Lege 1 Euro auf verschiedene Arten.', 2),
    P(['1 € = 50 ct + ___ ct', '1 € = 20 ct + 20 ct + ___ ct + ___ ct + ___ ct'], 1),
], 'Das Kind kennt Münzen und Scheine, bestimmt Geldbeträge und schreibt sie in Euro mit Komma.',
   ['Mit Spielgeld oder echten Münzen sortieren: Welche ist am meisten wert?', 'Beträge legen und zusammenzählen – erst die Euro, dann die Cent.', 'Kommaschreibweise an Preisschildern zeigen; Blatt bearbeiten.'],
   'Geld ist für viele Kinder der erste und wichtigste Zugang zu Dezimalzahlen: 2,50 € sind 2 Euro und 50 Cent. Der Wert einer Münze hängt nicht von ihrer Größe ab – das muss erfahren werden. Sicheres Bündeln (100 Cent sind 1 Euro) ist die Brücke zum Stellenwert. Die Schreibweise 3,05 € ist eine typische Fehlerstelle, weil die Null gern weggelassen wird. Rechnen mit echtem Geld im Rollenspiel wirkt am stärksten.',
   ['1) 3 € 50 ct · 1 € 50 ct · 9 € · 16 € 50 ct', '2) 1,20 · 3,05 · 0,80', '3) > · > · = · >', '4) 50 · 20, 20, 20'],
   'Nur ganze Euro-Beträge mit Spielgeld legen.', 'Einen Betrag mit möglichst wenigen Münzen legen (3,70 €).', 'Spielgeld', schlag=['Geld', 'Euro und Cent', 'Dezimalzahlen']))

BL.append(blatt('kk-r9-einkaufen', 'groessen', 'R9', 'Einkaufen: Reicht das Geld?', 'Preise zusammenrechnen, Rückgeld bestimmen, Preise einschätzen', 'icon:shopping-cart', [
    A('Du kaufst in der Bäckerei ein. Was kostet alles zusammen?', 1),
    {'art': 'bon', 'titel': 'Bäckerei', 'posten': [{'text': 'Brötchen', 'preis': '0,50 €'}, {'text': 'Brezel', 'preis': '1,00 €'}, {'text': 'Saft', 'preis': '1,50 €'}]},
    A('Du bezahlst mit 5 Euro. Wie viel bekommst du zurück?', 2),
    P(['Einkauf: ___ €', 'Ich gebe: 5,00 €', 'Zurück: ___ €'], 3),
    A('Du hast 2 Euro. Was kannst du davon kaufen? Kreuze an.', 2, 'ankreuzen'),
    {'art': 'ankreuzen', 'items': ['ein Eis für 1,50 €', 'ein Heft für 2,50 €', 'einen Apfel für 0,60 €', 'ein Comic für 3,00 €', 'zwei Brötchen für je 0,50 €', 'eine Pizza für 6,00 €'], 'spalten': 2},
    A('Was kostet das ungefähr? Verbinde.', 1, 'verbinden'),
    Z(['ein Brot', 'ein Fahrrad', 'ein Handy', 'ein Kaugummi'], ['etwa 300 €', 'etwa 3 €', 'etwa 150 €', 'etwa 10 Cent']),
], 'Das Kind rechnet Preise zusammen, bestimmt das Rückgeld und schätzt ein, was Dinge ungefähr kosten.',
   ['Kaufladen aufbauen (echte Verpackungen, Preisschilder).', 'Einkaufen spielen: Kasse, Kunde, Rückgeld – in Rollen wechseln.', 'Blatt bearbeiten; über Preise sprechen: Was ist teuer, was billig?'],
   'Mit Geld umgehen zu können ist eine der wichtigsten Kompetenzen für ein selbstständiges Leben. Dazu gehören drei Dinge: zusammenrechnen, prüfen, ob das Geld reicht, und ein Gefühl für Preise. Das Rückgeld lässt sich leichter durch Ergänzen bestimmen („von 3 bis 5“) als durch Abziehen. Größenordnungen von Preisen lernen Kinder nur durch echte Erfahrungen – Prospekte, Kassenzettel und ein Besuch im Laden helfen mehr als jedes Blatt.',
   ['1) 3,00 €', '2) Einkauf 3,00 € · zurück 2,00 €', '3) Eis · Apfel · zwei Brötchen', '4) Brot – 3 € · Fahrrad – 150 € · Handy – 300 € · Kaugummi – 10 Cent'],
   'Nur ganze Euro-Preise; mit Spielgeld legen.', 'Einen Einkauf für 10 € aus einem Prospekt zusammenstellen.', 'Spielgeld, Prospekte', schlag=['Geld', 'Einkaufen', 'Rückgeld']))

BL.append(blatt('kk-r10-laengen', 'groessen', 'R10', 'Längen messen', 'Millimeter, Zentimeter und Meter im Alltag', 'icon:ruler-measure', [
    I('Längen', ['1 m = 100 cm', '1 cm = 10 mm', 'Ich messe immer ab der 0.']),
    A('Miss die Linien mit dem Lineal.', 1),
    {'art': 'geo', 'felder': [{'h': 30, 'elemente': [
        {'t': 'text', 'x': 2, 'y': 7, 'text': 'a)', 'klein': True}, {'t': 'linie', 'von': [10, 6], 'bis': [50, 6], 'stil': 'dick'},
        {'t': 'text', 'x': 2, 'y': 17, 'text': 'b)', 'klein': True}, {'t': 'linie', 'von': [10, 16], 'bis': [80, 16], 'stil': 'dick'},
        {'t': 'text', 'x': 2, 'y': 27, 'text': 'c)', 'klein': True}, {'t': 'linie', 'von': [10, 26], 'bis': [110, 26], 'stil': 'dick'}]}]},
    P(['a) ___ cm', 'b) ___ cm', 'c) ___ cm'], 3),
    A('Wie lang ist das ungefähr? Verbinde.', 1, 'verbinden'),
    Z(['Eine Tür ist hoch:', 'Ein Stift ist lang:', 'Ein Fingernagel ist breit:', 'Ein Fußballfeld ist lang:'], ['etwa 1 cm', 'etwa 100 m', 'etwa 2 m', 'etwa 15 cm']),
    A('Wandle um.', 2),
    P(['1 m = ___ cm', '2 m = ___ cm', '3 cm = ___ mm', '50 mm = ___ cm', '1 m 20 cm = ___ cm', '200 cm = ___ m'], 3),
], 'Das Kind misst Strecken mit dem Lineal, schätzt Längen im Alltag und wandelt zwischen mm, cm und m um.',
   ['Körpermaße suchen: Fingerbreite etwa 1 cm, großer Schritt etwa 1 m.', 'Lineal richtig anlegen (an der 0) und die Linien messen.', 'Dinge im Raum schätzen und nachmessen; dann umwandeln.'],
   'Messen heißt vergleichen: Wie oft passt die Einheit hinein? Typische Fehler sind das Anlegen am Linealrand statt an der 0 und das Zählen der Striche statt der Abstände. Stützgrößen am eigenen Körper (Fingerbreite, Handspanne, Schritt) geben ein Gefühl für die Einheiten und machen das Schätzen möglich. Erst wenn die Einheiten vorstellbar sind, wird das Umwandeln mehr als ein Verschieben von Nullen. Bitte in Originalgröße (100 %) drucken.',
   ['1) 4 cm · 7 cm · 10 cm', '2) Tür – 2 m · Stift – 15 cm · Fingernagel – 1 cm · Fußballfeld – 100 m', '3) 100 · 200 · 30 · 5 · 120 · 2'],
   'Nur messen in ganzen Zentimetern.', 'Den Raum mit dem Maßband ausmessen.', 'Lineal, Maßband', schlag=['Längen', 'Messen', 'Einheiten umwandeln']))

BL.append(blatt('kk-r10-liter', 'groessen', 'R10', 'Liter und Milliliter', 'Wie viel passt hinein? Volumen im Alltag', 'icon:glass-full', [
    I('Flüssigkeiten', ['1 l = 1000 ml', 'Ein halber Liter = 500 ml']),
    A('Wie viel passt hinein? Verbinde.', 1, 'verbinden'),
    Z(['ein Löffel', 'ein Glas', 'eine Flasche Wasser', 'ein Eimer'], ['etwa 10 l', 'etwa 5 ml', 'etwa 1 l', 'etwa 200 ml']),
    A('Wandle um und rechne.', 2),
    P(['1 l = ___ ml', '2 l = ___ ml', 'ein halber Liter = ___ ml', '3000 ml = ___ l', '500 ml + 500 ml = ___ l', '250 ml + 250 ml = ___ ml'], 2),
    A('Denk nach.', 2),
    P(['Wie viele Gläser mit 200 ml füllst du aus 1 Liter? ___', 'Im Rezept stehen 500 ml Milch. Du hast 1 Liter. Übrig bleiben ___ ml.'], 1),
    A('Miss nach: Wie viel passt in deine Trinkflasche?', 1),
    P(['Geschätzt: ______ ml', 'Gemessen: ______ ml'], 2),
], 'Das Kind kennt Liter und Milliliter, schätzt Füllmengen und rechnet einfache Umwandlungen.',
   ['Mit Wasser und Messbecher arbeiten: Wie oft passt das Glas in die Flasche?', 'Stützgrößen merken: Glas etwa 200 ml, Flasche 1 l, Eimer 10 l.', 'Blatt bearbeiten; die eigene Trinkflasche ausmessen.'],
   'Volumen lässt sich nicht sehen wie eine Länge – es muss durch Umfüllen erfahren werden. Hohe schmale Gefäße wirken größer als breite flache; nur das Messen klärt das. Mit einigen Stützgrößen (Löffel, Glas, Flasche, Eimer) können Kinder Mengen im Alltag einschätzen, etwa beim Kochen oder Einkaufen. Die Beziehung 1 l = 1000 ml ist ungewohnt groß; die halbe Literflasche mit 500 ml ist ein guter Anker.',
   ['1) Löffel – 5 ml · Glas – 200 ml · Flasche – 1 l · Eimer – 10 l', '2) 1000 · 2000 · 500 · 3 · 1 · 500', '3) 5 · 500'],
   'Nur umfüllen und vergleichen: mehr, weniger, gleich viel.', 'Ein Rezept für die doppelte Menge umrechnen.', 'Messbecher, Glas, Flasche, Wasser', schlag=['Liter', 'Milliliter', 'Volumen']))

BL.append(blatt('kk-r10-gewicht', 'groessen', 'R10', 'Gramm und Kilogramm', 'Wie schwer ist das? Gewichte im Alltag', 'icon:scale', [
    I('Gewichte', ['1 kg = 1000 g', 'Ein halbes Kilo = 500 g']),
    A('Wie schwer ist das ungefähr? Verbinde.', 1, 'verbinden'),
    Z(['ein Brief', 'eine Tafel Schokolade', 'eine Packung Mehl', 'ein Kind mit 10 Jahren'], ['etwa 35 kg', 'etwa 20 g', 'etwa 100 g', 'etwa 1 kg']),
    A('Wandle um und rechne.', 2),
    P(['1 kg = ___ g', '2 kg = ___ g', 'ein halbes Kilo = ___ g', '4000 g = ___ kg', '500 g + 500 g = ___ kg', '1 kg 500 g = ___ g'], 2),
    A('Was ist schwerer? Kreise ein.', 2, 'einkreisen'),
    P(['900 g oder 1 kg', '2 kg oder 1500 g', '250 g oder ein halbes Kilo'], 1),
    A('In der Tasche sind 1 kg Äpfel, 500 g Trauben und 500 g Tomaten. Wie schwer ist der Einkauf?', 2),
    P(['Der Einkauf wiegt ___ kg.'], 1),
], 'Das Kind kennt Gramm und Kilogramm, schätzt Gewichte von Alltagsdingen und rechnet einfache Umwandlungen.',
   ['Dinge in die Hand nehmen: Was ist schwerer? Dann wiegen.', 'Stützgrößen merken: Tafel Schokolade 100 g, Packung Mehl 1 kg.', 'Blatt bearbeiten; auf Verpackungen die Gewichtsangabe suchen.'],
   'Gewicht kann man nicht sehen – ein großes Paket kann leicht, ein kleines schwer sein. Deshalb gehört zum Lernen das Heben, Vergleichen und Wiegen. Zwei Stützgrößen genügen für den Anfang: die Tafel Schokolade (100 g) und die Packung Mehl oder Zucker (1 kg). Damit lassen sich Angaben auf Verpackungen und in Rezepten einordnen. Beim Umwandeln hilft die Vorstellung: Zehn Tafeln Schokolade wiegen ein Kilo.',
   ['1) Brief – 20 g · Schokolade – 100 g · Mehl – 1 kg · Kind – 35 kg', '2) 1000 · 2000 · 500 · 4 · 1 · 1500', '3) 1 kg · 2 kg · ein halbes Kilo', '4) 2 kg'],
   'Nur vergleichen mit der Balkenwaage: schwerer, leichter.', 'Zutaten für ein Rezept abwiegen.', 'Waage, Verpackungen', schlag=['Gewicht', 'Gramm', 'Kilogramm']))

BL.append(blatt('kk-r11-uhr', 'groessen', 'R11', 'Wie spät ist es?', 'Die Uhr lesen: volle Stunde, halb, Viertel', 'icon:clock', [
    I('Die Uhr', ['Der kleine Zeiger zeigt die Stunde.', 'Der große Zeiger zeigt die Minuten.', 'Nachmittags: 3 Uhr ist 15:00 Uhr.']),
    A('Wie spät ist es? Schreib die Uhrzeit.', 1),
    {'art': 'geo', 'spalten': 4, 'felder': [UHR('a)', 3, 0), UHR('b)', 8, 0), UHR('c)', 6, 30), UHR('d)', 10, 15)]},
    A('Was gehört zusammen? Verbinde.', 1, 'verbinden'),
    Z(['7 Uhr', 'halb 5', 'Viertel nach 2', 'Viertel vor 9'], ['14:15', '8:45', '7:00', '4:30']),
    A('Ergänze.', 2),
    P(['1 Stunde = ___ Minuten', '1 Minute = ___ Sekunden', 'eine halbe Stunde = ___ Minuten', 'eine Viertelstunde = ___ Minuten'], 2),
], 'Das Kind liest volle und halbe Stunden sowie Viertelstunden ab und verbindet die Zeigeruhr mit der digitalen Schreibweise.',
   ['An einer Lernuhr volle Stunden einstellen und ablesen lassen.', 'Halb und Viertel zeigen: „Der große Zeiger ist halb herum.“', 'Blatt bearbeiten, danach die Uhr im Raum ablesen.'],
   'Die Uhr verlangt zwei Skalen auf einem Zifferblatt: Stunden und Minuten. Sicher wird das Ablesen in Stufen – erst volle Stunden, dann halbe, dann Viertel, zuletzt Minuten. „Halb 5“ ist sprachlich schwierig, weil die Fünf genannt wird, obwohl es 4:30 Uhr ist. Im Alltag begegnet den Kindern vor allem die digitale Anzeige (Handy, Bus); beide Formen sollten deshalb immer nebeneinander stehen.',
   ['1) 3:00 · 8:00 · 6:30 · 10:15', '2) 7 Uhr – 7:00 · halb 5 – 4:30 · Viertel nach 2 – 14:15 · Viertel vor 9 – 8:45', '3) 60 · 60 · 30 · 15'],
   'Nur volle und halbe Stunden; Lernuhr danebenlegen.', 'Zeiten am Nachmittag digital schreiben (halb 4 = 15:30).', 'Lernuhr', schlag=['Uhr', 'Zeit', 'halb und Viertel']))

BL.append(blatt('kk-r11-kalender', 'groessen', 'R11', 'Tage, Wochen, Monate', 'Den Kalender kennen: Wochentage, Monate, Datum', 'icon:calendar', [
    I('Der Kalender', ['1 Woche = 7 Tage', '1 Jahr = 12 Monate', '1 Tag = 24 Stunden']),
    A('Welcher Tag fehlt? Schreib ihn auf.', 1, 'schreiben'),
    P(['Montag, ____________, Mittwoch', 'Donnerstag, Freitag, ____________', '____________, Sonntag, Montag'], 1),
    A('Welcher Monat fehlt?', 1, 'schreiben'),
    P(['Januar, ____________, März', 'April, Mai, ____________', 'Juli, ____________, September', 'Oktober, November, ____________'], 1),
    A('Antworte.', 2, 'schreiben'),
    P(['Welcher Tag ist heute? ____________', 'Welcher Tag war gestern? ____________', 'Welcher Tag ist morgen? ____________', 'In welchem Monat hast du Geburtstag? ____________'], 1),
    A('Schreib das Datum von heute.', 2),
    P(['___ . ___ . ______'], 1),
], 'Das Kind kennt die Wochentage und Monate in ihrer Reihenfolge und nennt das heutige Datum.',
   ['Am Wandkalender zeigen: heute, gestern, morgen.', 'Wochentage und Monate im Chor sprechen, auch ab einer beliebigen Stelle.', 'Blatt bearbeiten; das Datum täglich gemeinsam an die Tafel schreiben.'],
   'Zeitbegriffe wie gestern, morgen oder nächste Woche sind abstrakt und entwickeln sich langsam. Ein sichtbarer Kalender, an dem jeden Tag der gleiche kurze Ablauf stattfindet, gibt Halt: Welcher Tag ist heute? Was war gestern? Die Reihenfolge der Wochentage und Monate muss automatisiert sein, damit Kinder Termine verstehen und planen können. Persönliche Daten wie der eigene Geburtstag sind die besten Anker im Jahr.',
   ['1) Dienstag · Samstag · Samstag', '2) Februar · Juni · August · Dezember'],
   'Nur die Wochentage, mit Kalender zum Nachschauen.', 'Im Kalender nachsehen: Auf welchen Wochentag fällt dein Geburtstag?', 'Wandkalender', schlag=['Kalender', 'Wochentage', 'Monate']))

BL.append(blatt('kk-r11-zeitgefuehl', 'groessen', 'R11', 'Wie lange dauert das?', 'Sekunden, Minuten, Stunden: ein Gefühl für Zeit bekommen', 'icon:stopwatch', [
    A('Wie lange dauert das ungefähr? Verbinde.', 1, 'verbinden'),
    Z(['einmal klatschen', 'Zähne putzen', 'eine Schulstunde', 'schlafen in der Nacht', 'Sommerferien'], ['etwa 8 Wochen', 'etwa 50 Minuten', 'etwa 1 Sekunde', 'etwa 9 Stunden', 'etwa 3 Minuten']),
    A('Probier es aus: Was schaffst du in einer Minute? Schätze zuerst.', 2),
    T(['Was?', 'geschätzt', 'geschafft'], [['Hampelmänner', '', ''], ['meinen Namen schreiben', '', ''], ['zählen bis …', '', '']], breiten=[3, 1.4, 1.4]),
    A('Ergänze.', 1),
    P(['1 Minute = ___ Sekunden', '1 Stunde = ___ Minuten', '1 Tag = ___ Stunden', '2 Minuten = ___ Sekunden'], 2),
    A('Der Bus fährt um 8:10 Uhr. Du brauchst 10 Minuten bis zur Haltestelle. Wann gehst du los?', 2),
    P(['Ich gehe um ___ : ___ Uhr los.'], 1),
], 'Das Kind schätzt Zeitspannen im Alltag ein, kennt die Zeiteinheiten und plant eine einfache Abfahrtszeit.',
   ['Eine Minute lang ganz still sein: Arm heben, wenn man glaubt, sie ist um.', 'Minuten-Versuche mit Stoppuhr; Schätzung und Ergebnis vergleichen.', 'Blatt bearbeiten; die Bus-Aufgabe an der Lernuhr zeigen.'],
   'Zeitgefühl entsteht durch Erleben und Messen, nicht durch Erklären. Viele Kinder können eine Minute nicht von fünf unterscheiden – mit Folgen für Selbstorganisation und Pünktlichkeit. Kurze Versuche mit Sanduhr oder Stoppuhr machen Zeit spürbar. Stützgrößen aus dem eigenen Tag (Zähneputzen, Schulstunde, Nacht) verankern die Einheiten. Die Planungsaufgabe überträgt das auf eine echte Situation: rechtzeitig losgehen.',
   ['1) klatschen – 1 Sekunde · Zähne putzen – 3 Minuten · Schulstunde – 50 Minuten · schlafen – 9 Stunden · Sommerferien – 8 Wochen', '3) 60 · 60 · 24 · 120', '4) 8:00 Uhr'],
   'Nur schätzen und messen mit der Sanduhr.', 'Den eigenen Morgen rückwärts planen: Wann muss ich aufstehen?', 'Stoppuhr oder Sanduhr', schlag=['Zeitgefühl', 'Zeiteinheiten', 'Planen']))

BL.append(blatt('kk-r12-halb-viertel', 'groessen', 'R12', 'Halb und Viertel', 'Ein Ganzes in gleiche Teile teilen', 'icon:chart-pie', [
    I('Gleiche Teile', ['Halb: 2 gleiche Teile. Ein Teil ist die Hälfte.', 'Viertel: 4 gleiche Teile. Ein Teil ist ein Viertel.']),
    A('Male die Hälfte an.', 1, 'malen'),
    {'art': 'bruchbilder', 'spalten': 4, 'items': [{'form': 'kreis', 'teile': 2, 'label': 'a)'}, {'form': 'rechteck', 'teile': 2, 'label': 'b)'}, {'form': 'kreis', 'teile': 4, 'label': 'c)'}, {'form': 'streifen', 'teile': 4, 'label': 'd)'}]},
    A('Halb oder Viertel? Schreib es unter das Bild.', 1, 'schreiben'),
    {'art': 'bruchbilder', 'spalten': 4, 'items': [{'form': 'kreis', 'teile': 2, 'gefaerbt': 1, 'text': ''}, {'form': 'kreis', 'teile': 4, 'gefaerbt': 1, 'text': ''}, {'form': 'rechteck', 'teile': 4, 'gefaerbt': 1, 'text': ''}, {'form': 'streifen', 'teile': 2, 'gefaerbt': 1, 'text': ''}]},
    A('Halb und Viertel im Alltag.', 2),
    P(['eine halbe Stunde = ___ Minuten', 'eine Viertelstunde = ___ Minuten', 'ein halber Liter = ___ ml', 'ein halbes Kilo = ___ g', 'die Hälfte von 10 € = ___ €', 'ein Viertel von 20 € = ___ €'], 2),
], 'Das Kind versteht halb und Viertel als gleiche Teile eines Ganzen und findet sie bei Zeit, Geld und Maßen wieder.',
   ['Einen Apfel oder ein Blatt Papier teilen: Sind die Teile gleich groß? Nur dann heißt es halb.', 'Hälften und Viertel anmalen und benennen.', 'Alltagsbeispiele sammeln: halbe Stunde, halber Liter, Viertel Pizza.'],
   'Halb und Viertel sind die ersten Brüche, lange bevor Bruchzahlen geschrieben werden. Der Kern ist die Gleichheit der Teile – ein Stück ist nur dann die Hälfte, wenn beide Teile gleich groß sind. Wer das am Apfel, am Papier und an der Uhr erlebt hat, versteht später die Schreibweise 1/2 und 1/4 leicht. Im Alltag sind die Begriffe überall: bei der Uhrzeit, in Rezepten und beim Teilen von Kosten.',
   ['1) jeweils die Hälfte der Teile: 1 von 2 · 1 von 2 · 2 von 4 · 2 von 4', '2) halb · Viertel · Viertel · halb', '3) 30 · 15 · 500 · 500 · 5 · 5'],
   'Nur falten und schneiden mit Papier.', 'Drei Viertel anmalen und im Alltag suchen (Dreiviertelstunde).', 'Papier, Schere', schlag=['halb', 'Viertel', 'Brüche']))

BL.append(blatt('kk-r13-strichliste', 'groessen', 'R13', 'Strichlisten', 'Zählen mit Strichen: immer fünf als Bündel', 'icon:tallymarks', [
    I('So geht eine Strichliste', ['Für jedes Ding ein Strich.', 'Der fünfte Strich geht quer. So zählst du in Fünfern: 5, 10, 15 …']),
    A('Wie viele sind es? Zähle die Striche.', 1),
    {'art': 'strichliste', 'kopf': ['Tier', 'Striche', 'Anzahl'], 'zeilen': [{'text': 'Hund', 'striche': 7}, {'text': 'Katze', 'striche': 12}, {'text': 'Vogel', 'striche': 4}, {'text': 'Fisch', 'striche': 9}]},
    A('Die Klasse hat ihr Lieblingsobst gesagt. Mach für jedes Wort einen Strich und hake es ab.', 2),
    {'art': 'strichliste', 'kopf': ['Obst', 'Striche', 'Anzahl'], 'daten': ['Apfel', 'Banane', 'Apfel', 'Birne', 'Banane', 'Apfel', 'Traube', 'Banane', 'Apfel', 'Apfel', 'Birne', 'Banane', 'Apfel', 'Traube'],
     'zeilen': [{'text': 'Apfel'}, {'text': 'Banane'}, {'text': 'Birne'}, {'text': 'Traube'}], 'summe': True},
    A('Antworte.', 2),
    P(['Welches Obst mögen die meisten? ____________', 'Wie viele Kinder sind es zusammen? ___'], 1),
], 'Das Kind liest Strichlisten in Fünferbündeln und legt selbst eine Strichliste an.',
   ['Eine echte Frage in der Gruppe stellen (z. B. „Wer kommt mit dem Bus?“) und an der Tafel Striche machen.', 'Das Fünferbündel zeigen und in Fünferschritten zählen.', 'Blatt bearbeiten; die Urliste Wort für Wort abhaken.'],
   'Die Strichliste ist die einfachste Form, Daten zu sammeln. Das Bündeln zu fünf macht das Zählen übersichtlich und bereitet das Rechnen in Schritten vor. Typische Fehler: Der fünfte Strich wird nicht quer gesetzt, oder Wörter der Urliste werden doppelt gezählt – darum abhaken. Am meisten lernen Kinder, wenn die Frage aus ihrem Alltag kommt und das Ergebnis danach gemeinsam gelesen wird.',
   ['1) Hund 7 · Katze 12 · Vogel 4 · Fisch 9', '2) Apfel 6 · Banane 4 · Birne 2 · Traube 2 · Gesamt 14', '3) Apfel · 14'],
   'Nur Aufgabe 1; Striche mit dem Finger in Fünfern antippen.', 'Eigene Umfrage in der Klasse machen und als Strichliste aufschreiben.', schlag=['Strichliste', 'Daten', 'Zählen']))

BL.append(blatt('kk-r14-diagramm', 'groessen', 'R14', 'Diagramme ablesen', 'Ein Säulendiagramm lesen und Fragen dazu beantworten', 'icon:chart-bar', [
    A('Schau das Diagramm an: der Lieblingssport der Klasse.', 1),
    {'art': 'diagramm', 'kategorien': ['Fußball', 'Schwimmen', 'Tanzen', 'Radfahren'], 'werte': [8, 5, 3, 6], 'max': 10, 'schritt': 2, 'fein': 1, 'achsen': ['Sport', 'Kinder']},
    A('Lies ab: Wie viele Kinder sind es?', 1),
    P(['Fußball: ___', 'Schwimmen: ___', 'Tanzen: ___', 'Radfahren: ___'], 2),
    A('Antworte.', 2),
    P(['Was mögen die meisten Kinder? ____________', 'Was mögen die wenigsten? ____________', 'Wie viele Kinder mögen Fußball oder Tanzen? ___', 'Wie viele mehr mögen Fußball als Schwimmen? ___'], 1),
    A('Zeichne selbst die Säulen: Hund 4, Katze 6, Fisch 2.', 3),
    {'art': 'diagramm', 'kategorien': ['Hund', 'Katze', 'Fisch'], 'werte': [None, None, None], 'max': 8, 'schritt': 2, 'fein': 1, 'achsen': ['Haustier', 'Kinder']},
], 'Das Kind liest Werte aus einem Säulendiagramm ab und beantwortet einfache Fragen dazu.',
   ['Ein lebendes Diagramm stellen: Kinder stellen sich in Reihen hinter ihrer Lieblingssportart auf.', 'Am Diagramm zeigen: vom oberen Rand der Säule nach links zur Zahl.', 'Werte ablesen, dann vergleichen: am meisten, am wenigsten, zusammen, mehr als.'],
   'Diagramme begegnen Kindern in Büchern, Nachrichten und Apps. Ablesen heißt, zwei Achsen zu verbinden: Was wird gezählt, und wie viel ist es? Der Blick von der Säulenkante zur Skala muss geübt werden, besonders bei Werten zwischen zwei beschrifteten Zahlen. Fragen in drei Stufen – ablesen, vergleichen, rechnen – führen vom Sehen zum Auswerten. Ein Diagramm aus eigenen Daten der Gruppe ist der beste Einstieg.',
   ['2) 8 · 5 · 3 · 6', '3) Fußball · Tanzen · 11 · 3', '4) Säulen bis 4, bis 6 und bis 2'],
   'Nur ablesen (Aufgabe 2); mit dem Lineal zur Skala führen.', 'Aus der Strichliste der Klasse ein eigenes Diagramm zeichnen.', 'Lineal', schlag=['Diagramm', 'Daten', 'Ablesen']))

# ---------------------------------------------------------------- Raum & Formen (R15–R19)
def plan():
    orte = [['Schule', 'Park', 'Bäckerei'], ['Kiosk', 'Brunnen', 'Bus'], ['Haus', 'Spielplatz', 'Kino']]
    el = []
    for r in range(3):
        for c in range(3):
            x, y = c * 54, r * 21
            el.append({'t': 'flaeche', 'x': x, 'y': y, 'b': 50, 'h': 17, 'ton': 'gruen' if (r + c) % 2 else 'grau', 'rx': 2})
            el.append({'t': 'text', 'x': x + 25, 'y': y + 10, 'text': orte[r][c], 'mitte': True, 'fett': True})
    return {'art': 'geo', 'felder': [{'b': 158, 'h': 60, 'elemente': el}]}

BL.append(blatt('kk-r15-plan', 'raum', 'R15', 'Auf dem Plan', 'Sich orientieren: rechts, links, oben, unten', 'icon:map', [
    A('Schau den Plan an.', 1),
    plan(),
    A('Antworte.', 1, 'schreiben'),
    P(['Was ist oben links? ____________', 'Was ist unten rechts? ____________', 'Was ist in der Mitte? ____________', 'Was ist rechts neben der Schule? ____________', 'Was ist unter der Bäckerei? ____________', 'Was ist links neben dem Kino? ____________'], 2),
    A('Male an.', 1, 'malen'),
    P(['Male das Feld oben rechts gelb.', 'Male das Feld unten links blau.'], 2),
    A('Du stehst am Brunnen. Geh ein Feld nach oben und ein Feld nach links. Wo bist du?', 2),
    P(['Ich bin jetzt hier: ____________'], 1),
], 'Das Kind orientiert sich auf einem einfachen Plan und benutzt die Wörter rechts, links, oben, unten, neben, über, unter.',
   ['Raumwörter am eigenen Körper und im Raum üben: „Zeig nach links. Was ist rechts neben der Tür?“', 'Plan gemeinsam lesen: Zeile für Zeile.', 'Fragen beantworten; den Weg mit dem Finger gehen.'],
   'Raumorientierung beginnt am eigenen Körper und wird dann auf die Fläche übertragen. Links und rechts verwechseln viele Kinder lange; ein Merkzeichen an der Schreibhand hilft. Auf dem Plan bedeutet „oben“ nicht mehr „in der Höhe“, sondern „weiter weg vom Körper“ – das ist ein Denkschritt. Wege mit dem Finger zu gehen verbindet Sprache, Bewegung und Plan und bereitet das Lesen von Karten, Tabellen und Rastern vor.',
   ['2) Schule · Kino · Brunnen · Park · Bus · Spielplatz', '3) Bäckerei gelb · Haus blau', '4) an der Schule'],
   'Mit drei mal drei Bildkarten auf dem Tisch legen.', 'Einen eigenen Plan vom Klassenraum zeichnen und Fragen dazu stellen.', 'Buntstifte', schlag=['Orientierung', 'Plan', 'rechts und links']))

BL.append(blatt('kk-r16-raster', 'raum', 'R16', 'Auf dem Raster', 'Felder finden mit Buchstabe und Zahl', 'icon:layout-grid', [
    I('So findest du ein Feld', ['Erst der Buchstabe (Spalte), dann die Zahl (Zeile).', 'B1 heißt: Spalte B, Zeile 1.'], symbol='tipp'),
    A('Schau das Raster an.', 1),
    T(['', 'A', 'B', 'C', 'D', 'E'], [['1', '', 'Ball', '', '', ''], ['2', '', '', '', 'Hund', ''], ['3', 'Baum', '', '', '', ''], ['4', '', '', 'Haus', '', ''], ['5', '', '', '', '', 'Auto']], breiten=[0.6, 1, 1, 1, 1, 1]),
    A('In welchem Feld ist es?', 1),
    P(['Ball: {B1}', 'Hund: ___', 'Baum: ___', 'Haus: ___', 'Auto: ___'], 3),
    A('Trag ein.', 2),
    P(['Schreib „Sonne“ in das Feld E1.', 'Schreib „Maus“ in das Feld A5.', 'Male das Feld C2 rot an.'], 1),
    A('Schatzsuche: Start ist A1. Geh 2 Felder nach rechts und 3 Felder nach unten. Wo bist du?', 2),
    P(['Ich bin im Feld ___ . Dort steht: ____________'], 1),
], 'Das Kind findet Felder in einem Raster mit Buchstabe und Zahl und gibt Positionen an.',
   ['Ein Raster mit Klebeband auf den Boden kleben; Kinder stellen sich auf genannte Felder.', 'Die Leseregel üben: erst Spalte, dann Zeile.', 'Blatt bearbeiten; danach „Schiffe suchen“ zu zweit auf kariertem Papier.'],
   'Das Raster verbindet zwei Angaben zu einem Ort – wie auf Stadtplänen, in Tabellen, auf dem Schachbrett und später im Koordinatensystem. Die feste Reihenfolge (erst Buchstabe, dann Zahl) muss vereinbart und geübt werden. Bewegungsaufgaben im Raster („zwei nach rechts, drei nach unten“) schulen zugleich Raumwörter und Zählen. Spiele wie Schiffe versenken festigen das ohne Übungsdruck.',
   ['2) Hund D2 · Baum A3 · Haus C4 · Auto E5', '4) C4 – Haus'],
   'Kleines Raster mit drei mal drei Feldern und Bildern.', 'Einem Partner einen Weg durch das Raster diktieren.', 'Buntstifte, eventuell Klebeband für ein Bodenraster', schlag=['Raster', 'Koordinaten', 'Orientierung']))

BL.append(blatt('kk-r17-formen', 'raum', 'R17', 'Vier Formen', 'Rechteck, Quadrat, Dreieck, Kreis – Ecken und Seiten', 'icon:shape', [
    A('Wie heißt die Form? Schreib den Namen darunter.', 1, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['Kreis', 'Quadrat', 'Dreieck', 'Rechteck']},
    B([('icon:square', '________'), ('icon:circle', '________'), ('icon:triangle', '________'), ('icon:rectangle', '________')], 4, klein=False),
    A('Zähle die Ecken und die Seiten.', 1),
    T(['Form', 'Ecken', 'Seiten'], [['Dreieck', '', ''], ['Quadrat', '', ''], ['Rechteck', '', ''], ['Kreis', '', '']], breiten=[2, 1, 1]),
    A('Welche Form hat das? Verbinde.', 2, 'verbinden'),
    Z(['ein Fenster', 'eine Pizza', 'das Schild „Achtung“', 'eine Seite vom Würfel'], ['Dreieck', 'Quadrat', 'Rechteck', 'Kreis']),
], 'Das Kind benennt Rechteck, Quadrat, Dreieck und Kreis und beschreibt sie mit Ecken und Seiten.',
   ['Formen im Raum suchen und benennen (Fenster, Uhr, Schild).', 'Formen aus Karton fühlen: mit dem Finger die Seiten nachfahren, Ecken zählen.', 'Blatt bearbeiten; zum Schluss Formen mit dem Lineal ins Heft zeichnen.'],
   'Formen werden zuerst als Ganzes erkannt („sieht aus wie eine Tür“), erst später über Eigenschaften beschrieben. Der Schritt zu Ecken und Seiten macht aus dem Wiedererkennen ein Begreifen. Wichtig: Ein Quadrat ist ein besonderes Rechteck mit vier gleich langen Seiten. Auch gedrehte Formen (ein Quadrat auf der Spitze) sollten vorkommen, damit sich das Kind nicht nur an der gewohnten Lage orientiert.',
   ['1) Quadrat · Kreis · Dreieck · Rechteck', '2) Dreieck 3 und 3 · Quadrat 4 und 4 · Rechteck 4 und 4 · Kreis 0 und 0', '3) Fenster – Rechteck · Pizza – Kreis · Schild – Dreieck · Würfelseite – Quadrat'],
   'Formen aus Karton sortieren und benennen.', 'Aus Formen ein Bild legen und die Formen zählen.', 'Formen aus Karton, Lineal', schlag=['Formen', 'Ecken und Seiten', 'Geometrie']))

BL.append(blatt('kk-r18-umfang', 'raum', 'R18', 'Einmal rundherum: der Umfang', 'Den Umfang von Rechteck und Quadrat bestimmen', 'icon:route', [
    I('Der Umfang', ['Der Umfang ist der Weg einmal rundherum.', 'Ich zähle alle vier Seiten zusammen.']),
    A('Wie lang ist der Weg rundherum? Zähle die Kästchenseiten am Rand.', 1),
    {'art': 'flaeche', 'spalten': 3, 'felder': [{'l': 4, 'b': 2, 'label': 'a)', 'text': ''}, {'l': 3, 'b': 3, 'label': 'b)', 'text': ''}, {'l': 4, 'b': 3, 'label': 'c)', 'text': ''}]},
    A('Rechne den Umfang aus.', 2),
    P(['Rechteck mit 6 cm und 3 cm: 6 + 3 + 6 + 3 = ___ cm', 'Quadrat mit 5 cm: 5 + 5 + 5 + 5 = ___ cm', 'Garten mit 10 m und 4 m: ___ m'], 1),
    A('Miss nach: Wie groß ist der Umfang von deinem Heft?', 2),
    P(['Mein Heft: ___ cm + ___ cm + ___ cm + ___ cm = ___ cm'], 1),
], 'Das Kind versteht den Umfang als Weg um eine Figur und bestimmt ihn bei Rechteck und Quadrat.',
   ['Den Umfang ablaufen: einmal um den Tisch, um den Teppich, um das Schulhaus.', 'Mit einer Schnur um ein Buch legen und die Schnur messen.', 'Kästchenseiten zählen, dann rechnen; das eigene Heft ausmessen.'],
   'Umfang und Fläche werden oft verwechselt. Die Vorstellung „außen herumgehen“ (Zaun, Rahmen, Schnur) grenzt den Umfang klar ab. Beim Zählen am Karo zählen Kinder leicht die Kästchen statt der Seiten – deshalb mit dem Finger am Rand entlangfahren. Die Rechnung ergibt sich aus dem Tun: vier Seiten, zusammengezählt. Dass gegenüberliegende Seiten gleich lang sind, entdecken die Kinder dabei selbst. Bitte in Originalgröße (100 %) drucken.',
   ['1) 12 cm · 12 cm · 14 cm', '2) 18 cm · 20 cm · 28 m'],
   'Nur mit der Schnur legen und messen.', 'Verschiedene Rechtecke mit dem Umfang 12 cm zeichnen.', 'Schnur, Lineal', schlag=['Umfang', 'Rechteck', 'Messen']))

BL.append(blatt('kk-r18-flaeche', 'raum', 'R18', 'Kästchen zählen: die Fläche', 'Den Flächeninhalt mit Zentimeter-Kästchen auslegen', 'icon:square', [
    I('Die Fläche', ['Die Fläche ist das, was innen liegt.', 'Ich zähle die Kästchen. 1 Kästchen = 1 cm²']),
    A('Wie viele Kästchen passen hinein?', 1),
    {'art': 'flaeche', 'spalten': 3, 'felder': [{'l': 4, 'b': 2, 'label': 'a)', 'text': ''}, {'l': 3, 'b': 3, 'label': 'b)', 'text': ''}, {'l': 4, 'b': 3, 'label': 'c)', 'text': ''}]},
    A('Zeichne ein Rechteck mit 6 Kästchen und ein Quadrat mit 4 Kästchen.', 2),
    {'art': 'flaeche', 'spalten': 2, 'felder': [{'l': 0, 'b': 0, 'feld': [7, 4]}, {'l': 0, 'b': 0, 'feld': [7, 4]}]},
    A('Rechne geschickt: Reihen mal Kästchen.', 2),
    P(['3 Reihen mit je 5 Kästchen = ___ cm²', '4 Reihen mit je 4 Kästchen = ___ cm²'], 1),
], 'Das Kind bestimmt den Flächeninhalt von Rechteck und Quadrat durch Auslegen und Zählen von Zentimeterquadraten.',
   ['Eine Fläche (Buch, Tisch) mit quadratischen Zetteln auslegen: Wie viele passen?', 'Kästchen zählen – erst einzeln, dann reihenweise.', 'Eigene Figuren zeichnen; die Rechnung „Reihen mal Kästchen“ entdecken lassen.'],
   'Fläche ist das, was man auslegen, anmalen oder belegen kann – im Unterschied zum Rand. Das Auslegen mit gleichen Quadraten ist die Grundvorstellung des Flächeninhalts. Vom Einzelzählen führt der Weg über das reihenweise Zählen zur Mal-Aufgabe; damit wird die Formel später verständlich statt auswendig gelernt. Zwei Figuren mit gleicher Fläche können ganz verschieden aussehen – das überrascht viele Kinder. Bitte in Originalgröße (100 %) drucken.',
   ['1) 8 cm² · 9 cm² · 12 cm²', '2) z. B. 3 mal 2 Kästchen · 2 mal 2 Kästchen', '3) 15 cm² · 16 cm²'],
   'Mit Zentimeterwürfeln oder Plättchen auslegen.', 'Alle Rechtecke mit 12 Kästchen finden.', 'Zentimeterwürfel oder Zettel, Lineal', schlag=['Fläche', 'Zentimeterquadrat', 'Rechteck']))

BL.append(blatt('kk-r19-koerper', 'raum', 'R19', 'Würfel, Quader, Kugel, Zylinder', 'Körper benennen: Ecken, Kanten, Flächen', 'icon:cube', [
    A('Welcher Körper ist das? Verbinde.', 1, 'verbinden'),
    B([('emoji:game-die', 'Spielwürfel'), ('emoji:package', 'Paket'), ('emoji:soccer-ball', 'Ball'), ('emoji:canned-food', 'Dose')], 4),
    Z(['Spielwürfel', 'Paket', 'Ball', 'Dose'], ['Kugel', 'Zylinder', 'Würfel', 'Quader']),
    A('Nimm einen Würfel und einen Quader in die Hand. Zähle.', 2),
    T(['Körper', 'Ecken', 'Kanten', 'Flächen'], [['Würfel', '', '', ''], ['Quader', '', '', '']], breiten=[2, 1, 1, 1]),
    A('Rollt es? Kann man es stapeln? Kreuze an.', 1, 'ankreuzen'),
    T(['Körper', 'rollt', 'lässt sich stapeln'], [['Würfel', '', ''], ['Kugel', '', ''], ['Zylinder', '', ''], ['Quader', '', '']], breiten=[2, 1, 1.6]),
], 'Das Kind benennt Würfel, Quader, Kugel und Zylinder an Alltagsgegenständen und beschreibt sie mit Ecken, Kanten und Flächen.',
   ['Gegenstände mitbringen (Dose, Ball, Schachtel, Würfel) und sortieren.', 'Im Fühlsack ertasten: „Es hat Ecken. Es rollt nicht.“', 'Ecken, Kanten und Flächen am Würfel zeigen und zählen; dann das Blatt.'],
   'Körper lernt man mit den Händen. Bevor Begriffe wie Kante oder Fläche gebraucht werden, sollten Kinder Gegenstände fühlen, rollen, stapeln und bauen. Würfel und Quader haben beide 8 Ecken, 12 Kanten und 6 Flächen – der Unterschied liegt in der Form der Flächen. Die Fragen „Rollt es? Lässt es sich stapeln?“ verbinden die Form mit ihrer Funktion: Darum sind Dosen rund und Pakete eckig.',
   ['1) Spielwürfel – Würfel · Paket – Quader · Ball – Kugel · Dose – Zylinder', '2) Würfel 8, 12, 6 · Quader 8, 12, 6', '3) Würfel: stapeln · Kugel: rollt · Zylinder: rollt und stapeln · Quader: stapeln'],
   'Nur sortieren und benennen mit echten Gegenständen.', 'Aus Knete und Zahnstochern ein Kantenmodell des Würfels bauen.', 'Dose, Ball, Schachtel, Würfel, eventuell Fühlsack', schlag=['Körper', 'Würfel und Quader', 'Geometrie']))

# an kern-2.json anhängen
pfad = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'data', 'blaetter', 'kern-2.json')
alt = json.load(open(pfad, encoding='utf-8'))
alt = [b for b in alt if b['id'] not in {x['id'] for x in BL}]
schreibe(pfad, alt + BL)
