# Plattform: Wie jedes Fach eine Insel wird

*Ziel der Lehrkraft: „Weitere Konzepte, ob Skills oder Französisch-Grammatik oder whatever, durch diese App an die
Jugendlichen bringen.“*

## 1. Das Prinzip
**Ein Meer, viele Inseln. Das Boot fährt mit.**

- **Gleich bleiben:** die Engine (three.js, eine HTML-Datei, offline), Avatar, **Boot, Nest und Board**, die drei
  Kernverben **Fahren, Bergen, Bauen**, die Codes aus dem Unterricht, die Minispiel-Vorlagen, das Lehrer-Panel, alle
  Sicherheitsregeln.
- **Neu pro Fach:** eine Insel (oder Bucht) mit Figuren, Aufträgen, Rätseln, Wortschatz und **Bauplänen**. Die Regeln
  des Fachs werden zu Bauplänen und Spielregeln, genau wie die Kurswerkzeuge auf der Skills-Insel.
- **Warum das trägt:** Die Motivation hängt am eigenen Boot und Nest. Wer in Französisch ein neues Segel verdient,
  fährt damit auch auf der Skills-Insel. Die Jugendlichen müssen kein neues Spiel lernen.
- **Klarstellung:** Boot, Nest und Board sind ein **fachübergreifendes Belohnungssystem**, keine gemeinsame
  Geschichte. Die Kielpost-Geschichte gehört nur zur Skills-Insel. Jede Fach-Insel hat ihre eigene kleine Geschichte;
  das Boot ist nur das Fahrzeug, mit dem man hinkommt. Es muss also nicht erklärt werden, „warum ein
  Französisch-Segel zur Kielpost gehört“: Es ist einfach dein Boot.

Die Übersetzungsregeln sind dieselben wie in `KONZEPT.md` Kapitel 8:
| Aus dem Fach | wird im Spiel zu |
|---|---|
| **Regel** (Grammatik, Formel, Verfahren) | **Bauplan**: Wer die Regel anwendet, baut ein Teil. Die Regel steht auf der Rückseite. |
| **Aufgabe** | **Handlung in der Welt**: etwas verladen, bauen, lotsen, reparieren, statt ein Feld auszufüllen |
| **Wortschatz, Begriffe** | **Treibgut**: Wortkisten und Zahlenkisten, die man birgt und verbaut |
| **Fehler** | **sichtbare Folge ohne Punktabzug**: Die Planke wackelt komisch, die Fracht passt nicht. Man baut sofort um. |
| **Wiederholen** | **Treibgut kommt wieder**: Was man falsch gebaut hat, wird Tage später wieder angespült (verteiltes Wiederholen, als Welt verkleidet) |

## 2. Das Inhaltspaket (Content-Modell)
Ein Fach ist ein Ordner mit Daten, kein neuer Code:

```
src/content/packs/<fach>/
  insel.js        Ort: Name, Anleger, Sites (Werft, Markt, Leuchtturm …), Wetter, Musik, Nebelbänke
  figuren/*.js    Figuren: Name, Aussehen, Stimme (Satzlänge), Tagesplan
  auftraege/*.js  Quests und Postaufträge (Schritte mit Vorlage + Parametern), Kurzfassung, Aufnäher, Debrief
  dialoge/*.js    Gespräche (≤ 12 Wörter pro Blase), Wahlen, Minispiel-Haken
  baupläne.js     Regeln als Baupläne: Name, Rückseitensatz, welches Boots- oder Nest-Teil
  treibgut.js     Wort- und Zahlenkisten, Fundorte (fest, kein Zufall)
  minispiele/*.js Konfigurationen der Vorlagen (Modi, Medaillen, Aufgaben)
  codes.js        Code-Wörter der Stunden, Präfix der Insel
```

- Der bestehende **Validator** prüft Pflichtfelder und Verweise, der **Text-Linter** Wortzahl, Glimm-Länge und
  verbotene Übungswörter. Ein Paket, das nicht durchgeht, wird mit deutscher Meldung abgelehnt.
- Die Lehrerheft-Seite (Codes, Rückseiten, Debrief) entsteht automatisch aus dem Paket.
- Größe: Jede Insel kann als **eigene HTML-Datei** gebaut werden (unter 3 MB), mit demselben Spielstand-Format.
  Boot, Nest und Board liegen im gemeinsamen Personen-Spielstand und wandern mit (Export-Code zwischen Dateien, ohne
  private Daten).

## 3. Die Mechanik-Bibliothek
| Vorlage | gibt es schon? | Skills-Insel | Französisch | Mathe |
|---|---|---|---|---|
| `satzbau` | ja | Ich-Botschaft (Der Knoten), neuer Glaubenssatz | Sätze als Planken bauen (Subjekt + Hilfsverb + Partizip) | Rechenweg aus Bausteinen legen |
| `bauen` (Rohre, Pläne) | ja | Wasserwerk der Gläser | Endungen verbinden | Laderaum füllen, Maße umrechnen |
| `rennen` | ja | Bootsrennen, Sturmfahrt | Wörter im Vorbeifahren fangen | Bojen in richtiger Reihenfolge (Zahlenstrahl) |
| `duell` | ja | Detektiv-Showdown | „Welche Zeit hörst du?“ | Waage im Gleichgewicht halten |
| `lotsen` | ja | Blindführen | Wegbeschreibung auf Französisch | Koordinaten |
| `rhythmus` | ja | Tandem-Takt | Aussprache-Takt, Silben | Vielfache im Takt |
| `wuerfel` | ja | Gefühle, Situationen | Personalpronomen würfeln | Zufall und Wahrscheinlichkeit |
| `verteidigung` | ja | Garten-Wächter (Stopp) | – | – |
| `leine` (Leine halten) | neu (Kostprobe) | Stille aushalten | – | – |
| `oberflaeche` | neu (Kostprobe) | Gefühl hinter Worten | Zeitform hinter dem Satz hören | – |
| `echolot` | neu | nachfragen | Fragen stellen (*Est-ce que …? Où …?*) | nachfragen, was gesucht ist |
| `gegenwind` | neu | Nein sagen | – | – |
| **Bergen, Werft, Postauftrag** | neu (Kostprobe) | Signatur | Wortkisten bergen, Satz-Planken verbauen | Fracht, Maße, Kasse |

## 4. Codes und Fortschritt
- **Ein Code pro Stunde**, wie bisher. Jede Insel hat ihren Präfix-Raum, damit sich Codes nicht beißen (Skills Jahr 1: Natur und Meer; Jahr 2: Musik und Sport; Jahr 3: Raumfahrt; Französisch zum Beispiel Wörter aus Paris; Mathe zum Beispiel Werkzeuge).
- Pro Schuljahr ein **eigenes Salz** (steht schon in DESIGN §22), damit Codes nicht von älteren Jahrgängen kommen.
- Ein Code gilt einmal pro Gerät. Ein späterer Code setzt ausgelassene Stunden auf die **Kurzfassung**.
- **Fortschritt pro Insel** (Aufträge, Aufnäher) plus **gemeinsamer Besitz** (Boot, Nest, Board, Farbtöne, Material).
- **Keine Noten im Spiel.** Medaillen nur für einen selbst, nie sichtbar für andere.

## 5. Erstellen durch die Lehrkraft
Drei Wege, vom einfachsten zum aufwendigsten:

1. **Tabellen-Weg.** Eine Tabelle mit festen Spalten (Wortliste, Satzmuster, Aufgaben mit Lösung, Code-Wort). Ein Werkzeug baut daraus Treibgut, Baupläne und Minispiel-Konfigurationen. Gut für Vokabeln und Rechenaufgaben.
2. **Arbeitsblatt-Weg mit Claude.** So könnte es laufen:
   - Die Lehrkraft gibt Claude **nur das Arbeitsblatt** (PDF oder Text) und sagt, was die Jugendlichen am Ende können sollen.
   - Claude schlägt vor: Welche Regel wird ein Bauplan? Welche Aufgabe wird eine Handlung? Welche Figur hat das Problem?
   - Claude schreibt einen **Paket-Entwurf** im Format oben, mit Texten unter 12 Wörtern pro Blase.
   - **Validator und Text-Linter** prüfen automatisch. Fehler gehen an Claude zurück, bis alles grün ist.
   - Die Lehrkraft spielt die Insel in einer **Vorschau** (`?debug`, alle Codes offen) und gibt Rückmeldung in Worten („zu schwer“, „Figur zu kindisch“).
   - Erst nach Freigabe wird gebaut.
   - **Noch nicht ausprobiert.** Bevor weitere Fächer zugesagt werden, machen wir **einen echten Durchlauf** (ein
     echtes Arbeitsblatt → spielbare Bucht) und schreiben auf, wie lange es gedauert hat und wo es gehakt hat
     (Validator-Meldungen verstehen, Vorschau starten). Erst dann ist klar, wie viel Arbeit ein neues Fach wirklich ist.
   - **Wichtig:** Es gehen **nie Schülerdaten** an Claude oder einen anderen KI-Dienst. Nur Unterrichtsmaterial, das ohnehin öffentlich im Klassenzimmer liegt. Das Spiel selbst ruft keine KI auf.
3. **Von Hand** (Entwickler): Pakete direkt in JavaScript schreiben.

## 6. Anbindung an den CDSE-Hub
- Der Hub kann pro Fach **Wochenaufträge** als Code ausgeben (zum Beispiel „Diese Woche: Bucht der Bewegungsverben“). Der Code trägt kein Personenmerkmal.
- Fokus-Codes (`FOKUS-…`) gibt es auch für Fächer, wenn die Lehrkraft das will, zum Beispiel ein Fokus auf Umrechnen. Sie heben hervor, sperren nie. Es gelten dieselben Regeln wie in `KONZEPT.md` 13.2: Code nur direkt in die Hand, nie ausgehängt; ein Fokus zur Zeit; auf geteilten Geräten nur für die Sitzung; im Spiel nie der Code-Text sichtbar.
- **Nichts fließt vom Spiel zurück in den Hub.** Fortschritt sieht die Lehrkraft am Gerät im Lehrer-Panel oder weil die jugendliche Person es zeigt. Das hält die Plattform DSGVO-einfach.

## 7. Mehrspieler-Pfad
- **Stufe 2 (Klassen-Raum):** Die Lehrkraft öffnet einen Raum auf einer Insel. Alle Boote sind im selben Meer. Gemeinsame Aufträge brauchen mehrere: zu zweit an der Winde, einer liest die Karte, einer steuert. Französisch: Eine Person hat die Wortkisten, die andere den Bauplan. Mathe: Eine Person misst, die andere rechnet, die dritte verlädt.
- **Stufe 3 (große Welt):** Das Inselmeer als Hangout mit mehreren Inseln. Hafen mit Skatepark, Basketballkorb, Rennen. Crew-Rekorde statt Ranglisten. Feste Öffnungszeiten, kein Freitext, Meldeknopf.

---

## 8. Beispiel A: Französisch-Grammatik · „Île des Mots“

> ### ACHTUNG: PLATZHALTER, nicht einsatzbereit
> **In den Unterlagen lag kein Französisch-Grammatikmaterial.** Die Datei „MODULE 7_TOUT“ ist ein Mathe-Modul auf
> Französisch (siehe Beispiel B). Dieses Beispiel ist **frei erfunden** und zeigt nur, *wie* eine Sprachinsel
> funktionieren könnte. Es ist **nicht am Lehrplan geprüft**. Das echte erste Kapitel wählt die Lehrkraft aus ihrem
> eigenen Französisch-Programm; erst dann wird daraus eine Bucht.

**Die Insel:** Port-Accord, ein kleiner Hafen, in dem nur Französisch gesprochen wird. Kurze Sätze, alles vorlesbar,
ein Knopf gibt die Hilfe auf Deutsch. Die Werft heißt *le chantier*, die Chefin ist **Madame Rive**, die nichts
vergisst, außer was gestern passiert ist.

**Die Geschichte:** Madame Rives Logbuch hat nur Lücken. Was ist gestern im Hafen passiert? Wer das Logbuch füllt,
findet heraus, wer ihr Boot losgemacht hat. Eine kleine Detektivgeschichte, erzählt in der Vergangenheit.

**Bergen:** Treibgut sind **Wortkisten**: Subjekte (*je, tu, elle, nous …*), Hilfsverben (*avoir, être* in allen
Formen), Partizipien (*mangé, fini, venu, tombé …*), Endungen (*-e, -s, -es*).

**Bauen:** Ein Satz im *passé composé* ist eine **Planke**: Subjekt + Hilfsverb + Partizip.
- Richtige Planken ergeben einen **Steg** zur nächsten Insel oder ein Teil fürs Boot.
- Falsches Hilfsverb: Die Planke passt nicht ins Gerüst, sie wackelt komisch. Man tauscht die Kiste, kein Punktabzug.
- Fehlende Angleichung bei *être*: Die Planke hängt schief, bis die Endung stimmt.

**Baupläne (die Regeln):**
- **„La Maison d’Être“** ist ein Leuchtturm, in dem die Bewegungsverben wohnen (*aller, venir, partir, arriver, entrer, sortir, monter, descendre, tomber, rester* …). Wer dort alle Bewohner getroffen hat, bekommt den Bauplan **Être-Kran**: Boote mit *être*-Verben brauchen die Angleichung als Gegengewicht. Rückseite: *„Bewegung? Dann meist être. Und die Endung passt sich an.“*
- **„Avoir-Anker“**: Alle anderen Verben halten mit *avoir*.

**Aufträge (Beispiele):**
1. **Das Logbuch füllen:** An fünf Orten im Hafen ist gestern etwas passiert (Kiste ins Wasser gefallen, Katze auf den Mast geklettert). Man baut dort den passenden Satz: *„Elle est tombée du quai.“* Die Szene spielt sich dann als kurze Erinnerung ab.
2. **Welche Zeit hörst du?** (Vorlage `oberflaeche`): Figuren erzählen, unter der Wasserlinie treibt *présent* oder *passé composé*. Man tippt, wenn man die Zeit erkennt.
3. **Fragen im Hafen** (Vorlage `echolot`): Um die Wahrheit zu finden, muss man die Figuren richtig fragen (*Est-ce que tu as vu … ? Où est-ce que … ?*). Ja/Nein-Fragen bringen wenig, offene Fragen mehr, genau wie auf der Skills-Insel.
4. **Wiederholung:** Falsch gebaute Planken treiben Tage später wieder an. Wer sie richtig verbaut, bekommt einen Farbton für das Segel.

**Codes:** Wörter aus Paris, zum Beispiel `CROISSANT`, `METRO`, `SEINE`, am Ende der Französischstunde.
**Sicherheit:** Fehler kosten Sekunden, nie Würde. Keine Ranglisten. Nach zwei Fehlversuchen: „Rückenwind?“ mit einem Beispielsatz.

---

## 9. Beispiel B: Mathe · „Die Zahleninsel“ (aus dem echten Material)

Grundlage: Mathe-Module aus den Unterlagen. „Module 7“ (französisch) enthält unter anderem Volumeneinheiten
(m³, dm³ = Liter, cm³ = ml, Umrechnungstabelle), Vielfache und Teiler, ein Bankkonto mit Soll und Haben, Zinsen und
Gleichungen mit einer Unbekannten. „Modul 6“ (deutsch) beginnt mit relativen Zahlen am Wetterbericht aus Luxemburg
(Temperaturen in Luxemburg-Stadt, Clerf, Esch/Alzette, Echternach über den Tag). Das Material selbst betont: wenige
Aufgaben pro Seite, einfache Sprache, erst mit konkretem Material begreifen. Genau das kann eine Spielwelt.

**Die Insel:** ein Frachthafen mit Kran, Lagerhalle, Tauchstation und einer Werft-Kasse. Hafenmeister **Octave** misst
alles und glaubt nichts ohne Rechnung.

**Aufträge aus dem Material:**
| Mathe-Thema (Quelle) | Auftrag im Spiel | Was man tut | Bauplan / Belohnung |
|---|---|---|---|
| **Volumen, m³ / dm³ / l / cm³ / ml** (Module 7) | **Der Laderaum** | Ein Kunde will 1,5 m³ Sand und 40 Liter Öl verschicken. Kisten und Fässer haben Maße. Man rechnet um und verlädt. Passt es nicht, klemmt die Luke komisch. Die Umrechnungstabelle ist ein **Regal im Laderaum**, auf dem man die Zahl verschiebt. | Bauplan **Laderaum** (auch für die Skills-Insel nützlich) |
| **Volumen von Quader, Würfel, Zylinder** (Module 7) | **Der Tank** | Das Nest braucht einen Regentank. Man wählt Form und Maße, damit genau so viel Wasser hineinpasst, wie das Wasserwerk verlangt. | Nest-Modul **Regentank** |
| **Vielfache und Teiler** (Module 7) | **Der Bojen-Takt** | Zwei Leuchtbojen blinken alle 4 und alle 6 Sekunden. Wann blinken sie zusammen? Wer es ausrechnet, kann im Nebel genau dann durch die Lücke fahren (Vorlage `rhythmus`). Später drei Bojen. | Bauplan **Signallaterne** |
| **Teiler** (Module 7) | **Kisten aufteilen** | 36 Kisten auf gleich große Stapel, ohne Rest. Welche Stapel gehen? Jeder richtige Teiler öffnet einen Lagerplatz. | Deko für das Nest |
| **Relative Zahlen** (Modul 6, Wetterbericht Luxemburg) | **Tauchtiefe und Wetter** | Der Meeresspiegel ist 0. Die Tauchstation liegt bei −12 m, die Möwenklippe bei +18 m. Wie weit ist es? Dazu die Wetterstation: Die Temperatur fällt nachts von +3 °C auf −4 °C. Um wie viel? Richtige Antworten stellen die Tauchleine und das Sturmglas ein. | Bauplan **Tiefenmesser** |
| **Bankkonto: Soll und Haben, Zinsen** (Module 7) | **Die Werft-Kasse** | Die Werft nimmt Aufträge an (Haben) und kauft Material (Soll). Man führt ein kleines Kassenbuch und entscheidet, ob ein Umbau jetzt drin ist. Zinsen: Wer Material eine Woche liegen lässt, bekommt beim Händler einen kleinen Aufschlag, bei der Genossenschaft einen Bonus. Kein echtes Geld, nur Spielmaterial. | Nest-Modul **Kontor** |
| **Gleichungen mit einer Unbekannten** (Module 7) | **Die Waage am Kran** | Auf einer Seite Kisten mit bekanntem Gewicht, auf der anderen ein Sack „x“. Der Kran hebt nur, wenn beide Seiten gleich sind. Man nimmt auf beiden Seiten dasselbe weg, bis x allein ist (Vorlage `duell` als Waage). | Bauplan **Kran-Winde** (größere Reichweite beim Bergen) |

**Die Geschichte dazu (kurz):** Ein Frachter ist im Nebel gestrandet, seine Ladeliste ist durcheinander. Wer die Ladung
richtig misst, verteilt und verrechnet, bringt den Frachter wieder flott, und er fährt im Finale in der Lichtflotte mit.

**Codes:** Werkzeug-Wörter, zum Beispiel `ZIRKEL`, `LINEAL`, `WAAGE`, am Ende der Mathestunde.
**Sicherheit:** keine Noten, keine Zeitmessung gegen andere, Rechenhilfe jederzeit („Rückenwind?“ zeigt den ersten Schritt).

---

## 10. Was die Plattform nicht wird
- **Kein Quiz-Spiel mit Kulisse.** Jede Aufgabe ist eine Handlung mit sichtbarer Folge.
- **Keine Lernstands-Datenbank.** Das Spiel speichert Fortschritt auf dem Gerät, nicht Leistungsdaten auf einem Server.
- **Keine KI im Spiel.** KI (Claude) hilft höchstens der Lehrkraft beim Erstellen, mit Unterrichtsmaterial, nie mit Schülerdaten.
