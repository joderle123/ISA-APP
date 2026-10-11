# Programm-Bibliothek – Bauplan (Stand 11.10.2026, noch nicht gebaut)

## Warum
Eine Fachkraft hat eine Passgenau-Folge (6 Sitzungen) gedruckt und gesagt: „Damit kann man nicht arbeiten.“
Befund: 25 gemischte Seiten (Spickzettel, Plan, Blatt je Sitzung), dünne Blätter mit 1–2 Fragen, Material zum
Selberbasteln, Textwände, zwei Ziele zusammengeklebt, jede Sitzung eine fremde Übung, kein Werkzeug, das trägt.
Passgenau setzt Stunden aus ~7 000 Teilen zusammen; das ergibt „passende“ Stunden, aber kein Programm.

**Entscheidung (Nutzer, 11.10.2026):** kuratierte Programme je Ziel und Alter, die zusammenhängen; je Sitzung
Auswechselspieler, die thematisch am Ganzen hängen. Dafür viele neue Arbeitsblätter. Passgenau wählt und passt an,
statt zu erfinden.

## Ein Programm
- **Schlüssel:** Kompetenz (12, `KOMPETENZ_NAME`) × Altersstufe (3–6, 7–9, 10–12, 13–18) = 48 Programme.
  ELDiB-Ziele werden über `kompetenzAusCode` einem Programm zugeordnet; ein zweites Ziel = eigene Folge.
- **Ein Werkzeug** durch alle Sitzungen (z. B. „Stopp – atmen – sagen“), bei 3–9 eine Figur; jede Sitzung greift es auf.
- **6 Sitzungen, fester Bogen:** 1 kennenlernen · 2 verstehen · 3 üben · 4 üben unter Druck · 5 Alltag · 6 Rückblick.
- **Je Sitzung 3 Kern-Übungen:** 1 Haupt-Übung + 2 Auswechselspieler. Gleicher Schritt, gleiches Werkzeug, anderer
  Zugang (Bewegung · Karten/Spiel · Gespräch/Rollenspiel). Jede mit eigenem Blatt im selben Heft-Stil.
- **Kinderheft:** Deckblatt („Mein Heft: …“), Seite 1 = Werkzeug-Karte, je Sitzung 1 Blatt (≥ 3 Aufgaben: erkennen →
  anwenden → übertragen), wächst mit; Rückblick-Seite greift alle Sitzungen auf.
- **Kartenbogen:** alles, was heute unter „Vorbereitung“ steht (Sprüche-, Rede-, Skill-Karten), fertig zum Ausschneiden.
- **Rahmen** (Ankommen, Bewegung, Abschluss) kommen weiter aus den Themen-Rahmen (`th:`) – Passgenau passt sie an die
  Tagesform an.

## Ausdrucke (statt eines Stapels)
1. **Fahrplan** (1 Seite): je Sitzung ein Satz zum Ziel, Übung, Blatt, Kästchen „gehalten“; „Für die Folge vorbereiten“
   mit Verweis auf den Kartenbogen. Codes nur klein in der Fußzeile.
2. **Plan je Sitzung** (1 Seite): Tabelle Min. · was passiert · ein Satz zum Sagen; „Wenn es kippt“ als Hinweis.
   Höchstens 4–5 Schritte bei 30 Min. Ausführliches nur in der App/Anhang.
3. **Kinderheft** (7–8 Seiten) und 4. **Kartenbogen** (1–2 Seiten) – je einzeln druckbar.
App: Vorschau mit Reitern Plan · Kinderheft · Karten, „Nur die Arbeitsblätter drucken“.

## Datenmodell (Entwurf)
`src/data/passgenau/programme/<kompetenz>-<stufe>.json`:
```
{ "id": "prog:impulskontrolle-7-9", "kompetenz": "impulskontrolle", "alter": {"von":7,"bis":9},
  "werkzeug": {"de","fr"}, "figur": "…", "eldib": ["V-20", …],
  "sitzungen": [ { "nr": 1, "bogen": "wahrnehmen", "ziel": {"de","fr"},
                   "uebungen": ["ki:…", "ki:…", "ki:…"] /* Haupt + 2 Auswechsler, normale Einträge */ } ],
  "heft": { "deckblatt": {…}, "werkzeugkarte": {…}, "rueckblick": {…} }, "karten": [ {…} ] }
```
Übungen bleiben normale Einträge (ki:/j: mit `uebungsblatt`), erhalten `programm` und `sitzung`; so funktionieren
Tausch, Rückmeldung und Wirkungs-Kreislauf weiter.

**Jedes Blatt gibt es auch einzeln (Nutzer, 11.10.2026):** Jedes Arbeitsblatt eines Programms ist zugleich ein normales
Toolbox-Blatt – mit ELDiB-Codes, Alter, DE/FR –, das ohne Programm funktioniert: in der Toolbox-Suche, in den
Material-Vorschlägen zu PEI-Zielen im Dossier, in der Arbeitsblatt-Checkliste je Kind und in Passgenau-Einzelstunden.
Das Programm stellt die Blätter nur zusammen (Reihenfolge, Werkzeug-Karte, Heft). Also: erst Einzelblätter bauen,
die für sich tragen, dann zum Programm bündeln.

## Bestand und Aufwand
`docs/PROGRAMM-BESTAND.md` (Skript `scripts/programm-bestand.ts`): eigene Kern-Übungen mit Blatt je Programm gegen das
Soll 18. Rechnerisch fehlen 341; realistisch mehr, weil vorhandene Übungen nicht um ein gemeinsames Werkzeug gebaut sind
(geschätzt ist ein Drittel bis die Hälfte direkt verwendbar, der Rest wird umgeschrieben). Toolbox-Teile dienen als
Rohmaterial. Schwach belegt: Gefühle ausdrücken, Ausdauer, Aufmerksamkeit, Lernstrategien, Alltag; 3–6 Jahre überall.

## Vorgehen
1. **Pilot – 3 Programme** (Vorschlag nach Bestand): Impulskontrolle 7–9 (19 vorhanden), Kommunikation 13–18 (33),
   Kooperation 3–6 (12). Alternative für 3–6: Gefühle erkennen (nur 5 vorhanden – zeigt den Aufwand für Neues).
2. Je Programm: Werkzeug + Bogen festlegen → vorhandene Übungen zuordnen/umschreiben → fehlende schreiben → Heft und
   Kartenbogen → blinde Nachbewertung (Note ≥ 4, wie bei den 150 Bausteinen) → Ausdrucke prüfen.
3. Zwei Wochen Praxis mit echten Kindern, Rückmeldung über „Stunde gehalten“.
4. Dann die übrigen 45 nach Häufigkeit der Ziele in den PEIs (nur Zahlen auswerten).

## Danach: die ganze Toolbox mit einem Designer ansehen (Nutzer, 11.10.2026)
Die Toolbox ist über die Zeit gewachsen (Arbeitsblätter, Material, Kurse, Spielschule, Mathe, Therapie-Blätter,
Passgenau, Programme, Förderfach …) und wirkt wie eine Ansammlung verschiedener Dinge. Nächster Schritt nach dem Pilot:
eine Design-Prüfung der ganzen Toolbox – Rundgang mit echten Aufgaben („Blatt zu einem PEI-Ziel finden“, „Stunde für
morgen“, „Heft drucken“), Klickwege, Begriffe, Navigation, ein gemeinsamer Aufbau für alle Bereiche – dann Entwürfe
zeigen und erst nach OK umbauen (wie beim Hub-Design).
