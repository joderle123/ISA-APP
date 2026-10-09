# Arbeitsblätter der CDSE Toolbox – Leitfaden für Inhalte

Dieser Leitfaden gilt für alle Blätter in `src/data/blaetter/*.json`. Das Aussehen
(Schriften, Farben, Abstände, Zeichnungen) erzeugt das Gestaltungssystem
automatisch – ein Blatt beschreibt **nur Inhalt und Aufbau**.

**Qualitätsmaßstab:** Ein Blatt muss wirken wie aus einem guten Fachverlag
(Beltz „Therapie-Tools“, Verlag an der Ruhr): fachlich fundiert, konkret, ruhig,
in der Sprache der Kinder. Niemand soll denken „oh, KI wieder“.

Musterblätter zum Anschauen: `gefuehle.json` (Mein Wutvulkan, Ballon-Atmen) und
`lernen.json` (Aufschieben überlisten, mit Französisch).

---

## 1. Arbeitsablauf

1. Blatt als JSON-Objekt in die Datei des Bereichs schreiben (neue Blätter **hinten anfügen** – die Nummer G-07 ergibt sich aus der Reihenfolge).
2. Prüfen: `npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-pruefen.ts src/data/blaetter/<datei>.json`
   – alle Fehler (✗) beheben, Hinweise (·) ernst nehmen.
3. Rendern: `npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-render.tsx <ordner> <blatt-id> --png --fr`
4. **Jede Seite als Bild ansehen** und kritisch prüfen: Passt alles? Zu voll? Zu leer? Seitenumbruch sinnvoll? Wirkt es professionell?
5. Nachbessern, bis es wirklich gut ist.
6. Seitenzahlen aller Blätter: `npm run blaetter:seiten`. Mappen (mehrere Blätter in einer PDF, z. B. „Alle Blätter“
   einer Kurs-Einheit): `npm run blaetter:mappe` – jedes Blatt muss dort genauso aussehen wie einzeln.
7. Modulhefte (z. B. Mathe Modul 2: Deckblatt, Inhalt, alle Lektionen, Wortschatz, „Mein Lernstand“ und dazu ein
   Lösungsheft mit den Seiten „Für die Lehrperson“): `npm run blaetter:modulheft -- [ordner] --fr --png`. Welche
   Blätter in welcher Reihenfolge ins Heft kommen, dazu „Mein Ziel“ je Lektion und der Wortschatz, steht in
   `src/blatt/module.ts`. Im Heft muss jede Lektion genau 2 Seiten haben, sonst stimmen die Seitenzahlen im Inhalt nicht.
   In der Toolbox steht das Heft oben im Bereich des Moduls (Knöpfe „Heft (PDF)“ und „Lösungsheft“, Sprache wie gemerkt).
8. Forscherkartei Spielschule (alle Experimente der Woche in einem PDF: Deckblatt, Inhalt, je Experiment eine Seite,
   Register nach Phänomenen): `npm run blaetter:forscherkartei -- [ordner] --fr --png` (Entwürfe dazu mit
   `--datei=<entwurf>.json`, nur diese mit `--nur-datei`). Das Skript meldet einen Fehler, wenn eine Seite überläuft.
   In der Toolbox steht die Kartei oben im Bereich Spielschule (Knopf „Forscherkartei (PDF)“, Sprache wie gemerkt).

Umfang: Schülerteil **1 Seite** (C1, C2) bzw. **höchstens 2 Seiten** (C3–ES).
Die Seite „Für die Lehrperson“ muss auf **eine** Seite passen. Ausnahme Bereich `spielschule` (Themenwochen):
Schülerteil 2 Seiten (Bildkarten + Blatt), für die Lehrperson 2 Seiten (Lehrerseite + „Aktivitäten & Ideen“), dazu je
1 Seite „Forschen: Experiment der Woche“ (mit `experiment`) und „Beobachten & Begleiten“ (mit deren Feldern); als
einzelne Downloads je 1 Seite Klassenraster, Portfolio-Blatt, Elternbrief und Forscherblatt (siehe Spielschule). Seitenzahlen zählen je Blatt („Seite 1 / 2“), auch in
einer Mappe; ein einseitiger Teil hat keine Seitenzahl. In der Fußzeile jeder Seite steht darunter klein der
Urheber-Vermerk „© 2026 Joey Guedes, Psychologe · CDSE“ (französische Fassung: „psychologue“); der Text steht nur in
`src/lib/urheber.ts`. Links neben beiden Zeilen steht das CDSE-Logo (`src/lib/cdse-logo.ts`, aus der Vorlage der
Fiche de renseignement), genau so hoch wie die zwei Zeilen – die Fußzeile wird dadurch nicht höher.

## 2. Aufbau eines Blatts

```json
{
  "id": "wutvulkan",                      // klein, a–z, 0–9, Bindestriche; eindeutig
  "bereich": "gefuehle",                  // gefuehle | verhalten | miteinander | lernen | alltag | werkzeuge | skills | selbstreflexion | mathe
  "thema": "wut",                         // siehe src/blatt/katalog.ts (THEMEN)
  "stufen": ["C3", "C4"],                 // C1 | C2 | C3 | C4 | ES
  "sozialform": ["einzeln", "gruppe"],    // einzeln | gruppe | klasse
  "dauer": "30–40 Min.",
  "eldib": ["V-21", "V-18", "K-26"],      // 1–4 passende ELDiB-Items
  "schlagworte": ["Wut", "Frühwarnzeichen", "Selbstkontrolle"],
  "bild": "icon:volcano",                 // Leitbild oben rechts
  "de": { "titel": "…", "untertitel": "…", "bausteine": [ … ], "lehrer": { … } },
  "fr": { … }                             // Pflicht für Blätter mit ES
}
```

Gestaltung nach Stufe (automatisch aus der niedrigsten Stufe):

| Stufe | Gestaltung | Schrift | Hinweise |
|---|---|---|---|
| C1 (Spielschule) | `bild` | Kinderschrift (Andika), sehr groß | Bildblatt. Kaum Text für das Kind. **Pflicht: `anleitung`** (1–3 Sätze für Erwachsene). Aufgaben mit Symbolen. |
| C2 | `gross` | Kinderschrift (Andika), groß | Kurze Sätze (max. 10 Wörter), weite Linien, viel Bild. |
| C3–C4 | `mittel` | Kinderschrift (Andika) | Geschichten, Tabellen, Denkmodelle. |
| ES | `jugend` | Inter | Sachlich, respektvoll, nie kindlich. **Französische Fassung Pflicht.** |

Stufen nicht zu breit mischen: gut sind `["C1"]`, `["C2"]`, `["C3","C4"]`, `["C4","ES"]`, `["ES"]`.

## 3. Bausteine

Aufgaben werden automatisch nummeriert. Eine Aufgabe (`aufgabe`) steht **vor**
dem Baustein, zu dem sie gehört, und bleibt mit ihm auf einer Seite.

### Text & Struktur
| Art | Felder | Wofür |
|---|---|---|
| `aufgabe` | `text`, `hinweis?`, `symbole?`, `niveau?` | Arbeitsauftrag. Kurz, klar, ein Verb. `symbole`: malen, schreiben, lesen, schneiden, kleben, ankreuzen, einkreisen, verbinden, sprechen, zuhoeren, nachdenken, zeigen, partner, gruppe (vor allem C1–C3). `niveau` (Spielschule): `einstieg` oder `stern`. |
| `text` | `text`, `klein?` | Kurzer Sachtext (v. a. ES). |
| `info` | `titel?`, `text?`, `punkte?`, `symbol?` | Kasten: `wissen` (Gut zu wissen), `tipp`, `merke`, `achtung`, `hilfe`. |
| `geschichte` | `titel?`, `text`, `bild?` | Kurze Alltagsgeschichte (C2: 3–5 Sätze, C3–C4: 4–7, ES: Fallvignette). Mit Figur links. |
| `bild` | `bild`, `groesse?` (s/m/l/xl), `text?`, `ausrichtung?` | Einzelnes Bild. |
| `spalten` | `links`, `rechts`, `verhaeltnis?` ('1:1','2:1','1:2') | Zwei Spalten (nicht verschachteln). Mit `bilder`, `comic`, `gefuehle`, `karten`, `glaeser` (und in der Spielschule immer) brechen sie als Ganzes nicht um – dann nicht höher als eine Seite; kein `seitenumbruch` darin. |
| `abstand` / `seitenumbruch` | – | Nur wenn wirklich nötig. |

### Schreiben
| Art | Felder | Wofür |
|---|---|---|
| `linien` | `anzahl`, `label?` | Schreiblinien. |
| `frage` | `text`, `linien?` | Frage mit Linien. |
| `satzanfaenge` | `items`, `linien?` | „Ich fühle mich sicher, wenn …“ – stark für Reflexion. |
| `feld` | `label?`, `hoehe?` (Zeilen), `beispiel?`, `zeichnen?` | Freies Feld; `zeichnen: true` = gestrichelter Malrahmen. |
| `tabelle` | `spalten`, `zeilen`, `beispiel?`, `breiten?` | Mit **ausgefüllter Beispielzeile** – zeigt, wie es gemeint ist. |
| `wennDann` | `zeilen`, `beispiele?`, `wenn?`, `dann?` | Wenn-dann-Pläne (Implementation Intentions). |
| `dialog` | `zeilen: [{wer, text?}]` | Gespräch in Sprechblasen, leere Blasen zum Ausfüllen. |
| `vertrag` | `titel?`, `text` (Lücken mit `___`), `unterschriften` | Abmachung mit Unterschriften. |

### Auswählen & Einschätzen
| Art | Felder | Wofür |
|---|---|---|
| `ankreuzen` | `items`, `spalten?` (1–3), `frei?`, `titel?` | Auswahl; `frei` = leere Zeilen für eigene Ideen. |
| `bilder` | `bilder: [{bild, text?}]`, `spalten?`, `modus?` (einkreisen/ankreuzen/anmalen/nur) | Bildauswahl – **das** Werkzeug für die Spielschule. |
| `wortspeicher` | `titel?`, `items` | Wörterkiste (Gefühlswörter …). |
| `skala` | `frage?`, `von`, `bis`, `stufen?` (5/10/11), `gesichter?` | 5 Stufen mit Gesichtern (C1–C2) oder 0–10. |
| `einschaetzung` | `items`, `optionen` | Selbsteinschätzung als Raster (stimmt / teils / stimmt nicht). |
| `zuordnen` | `links`, `rechts`, `titel?` | Verbinden mit Linien (rechts gemischt anordnen!). |
| `gefuehle` | `gefuehle`, `modus?` (benennen/einkreisen/nur), `leer?`, `spalten?`, `woerter?` | Gefühlsgesichter; `benennen` = Linie statt Wort; `woerter` = eigene Wörter statt der Standardwörter (Pflicht auf französischen C1-Blättern, wo das Standardwort einen Mittelpunkt hat). |

### Denk- und Bildmodelle
| Art | Felder | Wofür |
|---|---|---|
| `ampel` | `stufen` (genau 3: rot/gelb/grün), `linien?` | Stopp – Denken – Handeln. |
| `thermometer` | `stufen` (3–5, **von ruhig nach heiß**), `linien?` | Erregung, Stress, Wut. |
| `vulkan` | `stufen?` (3: unten → oben) | Auslöser – Anzeichen – Plan. Ohne `stufen` Standardtexte. |
| `eisberg` | `oben`, `unten`, `beispielOben?`, `beispielUnten?` | Sichtbares Verhalten vs. Gefühle/Bedürfnisse darunter. |
| `koerper` | `legende?` ([{farbe, text}]), `frage?` | Körperumriss zum Anmalen (farbe: rot, orange, gelb, gruen, blau, hellblau, lila, rosa, grau, braun, schwarz, weiss). |
| `batterie` | `laden`, `leeren`, `linien?` | Was gibt/kostet Energie. |
| `waage` | `links`, `rechts`, `zeilen?` | Vor-/Nachteile, Entscheidungswaage. |
| `leiter` | `stufen` (3–7), `oben?`, `unten?`, `beispiele?` | Mut-Leiter, Ziel-Treppe (Stufe 1 unten). |
| `zielscheibe` | `ringe` (2–4, außen → innen), `mitte?` | Nähe-Kreise, Wichtigkeit. |
| `hand` | `finger?` (5 Hinweise), `mitte?` | Fünf Helfer, fünf Stärken. |
| `mindmap` | `mitte`, `aeste?` ('' = leer), `anzahl?` | Sammeln (max. 6 Äste; ab 7 überlappen sich die Kästen). |
| `schritte` | `items: [{titel, text?}]`, `stil?` (liste/kette), `linien?` | Abläufe. `kette` = waagrecht, max. 4, Titel ≤ 26 Zeichen. |
| `plan` | `ziel?` ('' = Linie), `zeilen`, `tage?`, `symbol?` (gesicht/kasten/stern) | Wochen-Tracker. |
| `tagesplan` | `zeilen: [{zeit?, text?, bild?}]`, `leer?` | Tagesablauf. |
| `atmen` | `uebung`: quadrat, ballon, blume, fuenf-sinne, finger | Fertige Atem-/Achtsamkeitsübungen. |

### Selbstreflexion: Grafiken zum Füllen, Ausmalen und Einzeichnen
Ruhige Liniengrafiken mit viel Weißraum – für Blätter, die zum Innehalten einladen (Bereich `selbstreflexion`).

| Art | Felder | Wofür |
|---|---|---|
| `glaeser` | `items`, `leer?`, `spalten?` (3–6), `legende?` (2 Texte), `skala?` | Gläser mit Beschriftung (max. 20 Zeichen): Strich = so voll soll es sein, ausmalen = so voll ist es jetzt. Bedürfnisse, Werte. |
| `netz` | `bereiche` (5–10, max. 28 Zeichen), `stufen?` (5/10) | Lebensnetz: jeder Bereich ein Tortenstück mit Ringen zum Ausmalen (innen wenig, außen viel). |
| `kurve` | `x` (2–12), `oben`, `unten`, `mitte?`, `linien?` (2 Legendentexte), `hoehe?` | Leeres Diagramm zum Einzeichnen: Stimmung und Energie einer Woche, Lebenslinie. |
| `tageskreis` | `titel` (1–2 Kreise), `legende` ([{farbe, text}], 2–8; `text: ''` = Linie) | 24-Stunden-Kreise zum Ausmalen: normaler Tag und Wunsch-Tag. |
| `farbkalender` | `wochen?` (4–6), `legende` ([{farbe, text}], 2–8) | Kästchen-Kalender (Mo–So) zum Ausmalen, z. B. Stimmung pro Tag. |

### Mathe (Bereich `mathe`, Voie préparatoire)
Mathe-Blätter folgen dem Lehrplan (CNES-Référentiel, 5e PF), Aufgaben aus dem Alltag Jugendlicher (Geld, Handy, Sport,
Stage, Küche, Werkstatt) – nie kindlich. Pro Lektion ein Blatt: Regel, Beispiel, Übungen in drei Stufen, Kurz-Check.

| Art | Felder | Wofür |
|---|---|---|
| `rechnungen` | `items: [{zeilen, op?, ergebnis?, label?}]`, `spalten?` (1–4), `auffuellen?` | Schriftlich rechnen Komma unter Komma, jede Ziffer in einem Kästchen. Ohne `ergebnis` bleibt die Zeile leer. `auffuellen` zeigt fehlende Nullen farbig (für Beispiele). Das Prüfskript rechnet die Ergebnisse nach. |
| `kaestchen` | `zeilen`, `label?` | Karopapier (5 mm) für eigene Rechnungen. |
| `bon` | `titel?`, `posten: [{text, preis}]` (Preis wie „0,89 €“), `summe?`, `fuss?` | Kassenbon; ohne `summe` zum Ausrechnen (das Prüfskript prüft eine angegebene Summe). |
| `aufgabe` mit `stufe` | 1, 2 oder 3 | Kleine Punkte an der Nummer: Basis, Kern, Plus – unauffällig, die Lehrerseite erklärt sie. |
| `tabelle` mit `werte` | vorgegebene Zeilen | z. B. „Stimmt das?“ mit Rechnungen zum Prüfen. |
| `paeckchen` | `items`, `spalten?` (1–4), `buchstaben?` | Kurze Aufgaben in Spalten. Im Text: `___` Antwortlinie (mehr _ = länger), `[]` Kästchen für <, >, =, `{35}` vorgegebene Antwort in der Akzentfarbe (Beispiel), `#3/4#` Bruch mit Bruchstrich (`#_/_#` leer), Tabulator `\t` = rechter Teil bündig am Rand (z. B. „stimmt [] stimmt nicht []“). |
| `stellentafel` | `stellen` (z. B. `["Z","E","z","h"]`), `komma` (Stellen vor dem Komma), `zeilen: [{label?, zahl?}]` | Stellenwerttafel mit Komma-Spalte; Zeilen mit `zahl` ausgefüllt (Beispiel), sonst leer. |
| `hunderterfeld` | `felder: [{gefaerbt?, text?, label?}]`, `spalten?` | 10 × 10 = 1 Ganzes; `gefaerbt` Kästchen spaltenweise (Zehntel zuerst). Ohne `text` eine Schreiblinie darunter. |
| `zahlenstrahl` | `von`, `bis`, `schritt`, `fein?`, `zahlen?`, `punkte?: [{wert, name?}]` | Werte als Text mit Komma. Punkte ohne `name` bekommen einen leeren Kasten zum Eintragen. |
| `bruchbilder` | `items: [{form, teile?, gefaerbt?, ungleich?, anzahl?, gruppen?, nenner?, bruch?, text?, label?, ankreuzen?}]`, `spalten?` | `kreis`, `rechteck`, `streifen`, `menge` (Punkte, in `gruppen` eingekreist), `wand` (Bruchstreifen). `ungleich` = absichtlich ungleiche Teile. `bruch: "3/4"` oder `""` (leerer Bruch). |
| `treppe` | `stufen`, `runter`, `rauf`, `beispiel?` | Einheiten-Treppe (l – dl – cl – ml, t – kg – g; Flächen m² – dm² – cm² – mm² bzw. ha – a – m² mit „· 100“): nach unten malnehmen, nach oben teilen. |
| `flaeche` | `felder: [{l, b, feld?, kaestchen?, gefaerbt?, masse?, label?, text?}]`, `spalten?` | Rechteck/Quadrat (`l` × `b` in cm) in **Originalgröße**: cm²-Kästchen zum Auszählen, `gefaerbt` färbt reihenweise (z. B. eine Reihe), `masse: ["6 cm", "4 cm"]` beschriftet oben und rechts, `kaestchen: false` = nur Umriss zum Nachmessen. `feld: [17, 4]` = Zentimeter-Karo (cm) zum Selberzeichnen, mit `l: 0, b: 0` leer. Das Prüfskript prüft die Breite. |
| `temperatur` | `von`, `bis` (ganze °C, Spanne ≤ 60), `items: [{wert?, ziel?, pfeil?, label?, text?}]`, `spalten?` | Thermometer als senkrechter Zahlenstrahl mit Minusgraden (Bereich unter 0 hellblau). `wert` = rote Säule zum Ablesen, ohne `wert` zum Einfärben; `ziel` = Marke; `pfeil` zeichnet die Änderung (über die 0 in zwei Teilen, z. B. +3 und +5). Endet `text` auf „+8 °C“, rechnet das Prüfskript nach. |
| `kommasprung` | `items: [{zahl, op ("·" / ":"), faktor (10/100/1000), ergebnis?, label?}]`, `spalten?` | Mit `ergebnis`: Bögen für jeden Sprung, neue Nullen farbig (Beispiel). Ohne: Zahl mit leeren Kästchen zum Einzeichnen. Das Prüfskript rechnet nach. |
| `geo` | `felder: [{b?, h, label?, text?, raster?, elemente}]`, `spalten?` | Geometrie in **Originalgröße** (mm, Ursprung oben links): `punkt` (Kreuz + Name), `linie` (`strecke`, `halbgerade`, `gerade`; `stil` strasse/dick/gestrichelt; `mass`), `winkel` (Grad gegen den Uhrzeigersinn, Bogen bzw. Quadrat bei 90°), `vieleck` (`seiten`, `ecken`, `rechte`), `lineal`, `uhr`, `laptop`, `flaeche`, `text`. Das Prüfskript prüft Feldbreite und Lage. |
| `diagramm` | `kategorien`, `werte?` (Zahl oder `null`), `max`, `schritt`, `fein?`, `achsen?` ([Kategorien, Werte]), `liegend?`, `zahlen?`, `einheiten?`, `linie?: {wert, text?}`, `hoehe?`, `titel?` | Säulendiagramm mit Achsen, Skala (`schritt`) und Gitter (`fein`); `liegend` = Balken nach rechts. Ohne Wert kein Balken (zum Selberzeichnen), Kategorie `''` = Schreiblinie. `zahlen` schreibt die Werte an (Beispiel), `einheiten` teilt die Säulen in Kästchen (Ausgleichen), `linie` = gestrichelte Linie mit Legende (Mittelwert). Werte auf Gitterlinien legen – das Prüfskript meldet Werte dazwischen. |
| `strichliste` | `zeilen: [{text, striche?, anzahl?}]`, `kopf?` (3 Spaltentitel), `daten?`, `summe?` (true / Zahl) | Strichliste in Fünferbündeln (der fünfte Strich quer) mit Häufigkeit. Ohne `striche`/`anzahl` leer zum Ausfüllen; gezählte Häufigkeiten erscheinen in der Akzentfarbe, vorgegebene in Tinte. `daten` = Urliste zum Abhaken darüber, `summe` = Zeile „Gesamt“. Das Prüfskript zählt die Urliste nach und prüft Striche, Häufigkeit und Gesamt. |

Lehrerseite: `loesungen` ist Pflicht (kurz, eine Zeile je Aufgabe). ELDiB-Ziele und Quellen braucht ein Mathe-Blatt nicht.
Minuszeichen im Text als Gedankenstrich „–“, in Rechnungen `"op": "-"`. Mal „·“, geteilt „:“. Zahlen bis 9999 ohne
Trennzeichen (1000 ml), größere mit geschütztem Leerzeichen. Brüche im Fließtext als „3/4“, in Päckchen als `#3/4#`.
Blätter mit Messaufgaben (`geo`, `flaeche`) auf der Lehrerseite daran erinnern, in Originalgröße (100 %) zu drucken.

### Spielschule (Bereich `spielschule`, Themenwochen für Cycle 1)

Muster: `sp-apfelzeit` („Apfelzeit“, Thema Herbst). Eine Einheit ist **eine Themenwoche** für die ganze Gruppe
(3–5 Jahre), sehr praktisch: echtes Material, Bewegung, Sinne, Sprache, Zählen, Gestalten, ein Reim, Ideen für die
Spielecken. Pflicht: `stufen: ["C1"]`, `layout: "bild"`, DE **und** FR, `dauer` z. B. „1 Woche (täglich 20–30 Min.)“.

- **Schülerteil, Seite 1 – Bildkarten:** `aufgabe` + `karten` (6–9 Karten, `spalten` 3, je `bild` + `titel` mit
  Artikel: „der Apfel“ / « la pomme »). Dienen für Sitzkreis, Memory (zweimal drucken), Lotto, Wörterspiele.
  Dann `seitenumbruch`.
- **Schülerteil, Seite 2 – ein Blatt zum Tun:** 2–3 `aufgabe` mit Symbolen und dazu `bilder` (anmalen, einkreisen,
  ankreuzen), `gefuehle`, `comic` (Bildfolge „zuerst – dann“), `zuordnen`, `koerper` oder `feld` (`zeichnen: true`,
  `hoehe` in **Zeilen**, z. B. 8–10) – oder einer der **Bausteine zum Tun** (Schneiden & Kleben, Memory, Labyrinth,
  Laufweg, Mini-Buch, Punkte verbinden, Klappbild, Fädelkarte, Bastelbogen, Suchbild, Anziehpuppe; siehe unten).
  Von Einheit zu Einheit abwechseln, nicht jedes Mal „Kreise ein“. Sätze für Kinder höchstens 10 Wörter.
- **Automatisch auf jeder Kinderseite ab Seite 2:** Kopf mit Name, Datum und „Mein Zeichen“ (Kästchen für das Symbol
  oder den Aufkleber eines Kindes, das seinen Namen noch nicht schreibt). Kästchen zum Ankreuzen sind 10 mm groß,
  Bildunterschriften (Comic, Karten) mindestens 11 pt.
- **Farbwörter immer mit Farbpunkt:** Farbwort in geschweifte Klammern setzen – „Male die Äpfel `{rot}` an.“ druckt
  einen roten Punkt vor „rot“. Geht in Aufgaben, Bildunterschriften und allen Texten der Seite. Farben: rot, orange,
  gelb, grün/gruen, blau, hellblau, lila, rosa, braun, grau, schwarz, weiß/weiss – auch gebeugt (`{roten}`) und
  französisch (`{rouge}`, `{verte}`, `{bleu clair}`, `{violet}`, `{marron}`, `{blanc}` …). Höchstens 2 Farben je
  Blatt (8 Kinder, nicht 8 Stiftfarben). Ein `{…}`, das kein Farbwort ist, meldet das Prüfskript als Fehler.
- **Stufung auf dem Kinderblatt:** `"niveau": "einstieg"` an der einfachsten Aufgabe (Keimling neben der Nummer –
  für alle, auch die Jüngsten), `"niveau": "stern"` an einer Zusatzaufgabe für Ältere/Schnelle (Stern: Ziffern,
  Name spuren, Muster fortsetzen). Die Lehrerseite erklärt die Zeichen automatisch.
- **Französisch auf Kinderblättern:** keine inklusiven Formen mit Mittelpunkt (« joyeux·se ») – Kinder und Vorlesende
  stolpern darüber; das Prüfskript meldet sie als Fehler. Bei `gefuehle` die Wörter mit `woerter` selbst setzen
  (« content », « triste », « en colère », « j’ai peur » …), sonst stehen die Standardwörter mit Mittelpunkt darunter.
- **Spalten:** brechen in der Spielschule (und überall, wo `bilder`, `comic`, `gefuehle`, `karten` oder `glaeser`
  darin stehen) nie über eine Seite – react-pdf kann solche Zeilen nicht sauber teilen. Kein `seitenumbruch` und kein
  Baustein zum Tun in Spalten; `bilder` und `comic` nehmen in schmalen Spalten von selbst weniger Bilder je Reihe.
- **Lehrerseite:** `ziel`, `ablauf` als **Wochenplan** (Montag – … bis Freitag – …, je ≤ 170 Zeichen),
  `differenzierung`, 2–3 `impulse` (Fragen im Sitzkreis), 1–2 `tipps` (Sicherheit, Allergien, Vorbereitung),
  `material`, `hintergrund` (400–700 Zeichen; FR wird länger – kürzer halten), Quellen aus der Liste (Spielschule:
  hirshPasek2009, bodrovaLeong2007, vygotsky1978, sylva2004, clementsSarama2009, whitehurstLonigan1998,
  whitehurst1988, goswamiBryant1990, menfp2011, dazu je nach Thema z. B. denham1998, websterStratton2003, who2019).
- **`lehrer.spielschule` – Seite „Aktivitäten & Ideen“:**
  - `wortschatz`: 6–10 Wörter der Woche, Nomen mit Artikel.
  - `aktivitaeten`: 5–6 Karten `{art, titel, dauer, text, material?}`, mindestens 4 verschiedene Arten aus
    kreis, bewegung, gestalten, sprache, musik, sinne, zaehlen, spiel, draussen, ruhe, kochen, theater.
    `text` 120–330 Zeichen: was die Kinder tun und wie die Erwachsenen anleiten – so konkret, dass man es morgen
    ohne Vorbereitung machen kann.
  - `reim`: **selbst geschriebener** Reim oder Fingerspiel (4–8 Zeilen, ≤ 48 Zeichen je Zeile), reimt sauber, mit
    `gesten`. Keine bekannten Lieder abschreiben (Urheberrecht). Auf Französisch eine eigene Comptine, keine
    Übersetzung Zeile für Zeile.
  - `ecken`: 2–4 Ideen für Spielecken (Puppenecke, Bauecke, Malatelier, Lese-Ecke, Sand/Wasser …).
  - `eltern`: 1–2 Sätze für zu Hause, alltagsnah, ohne Kosten.
- **Sicherheit und Vielfalt:** Messer, Hitze, Kleinteile (Verschlucken), Allergien, Draußen-Regeln immer auf der
  Lehrerseite. Feste in Luxemburg (Kleeschen, Buergbrennen, Fuesend, Éimaischen, Nationalfeierdag, Schueberfouer)
  sachlich und einladend, ohne religiöse Pflicht; Familien in allen Formen.
- Prüfen wie immer, Seiten mit `scripts/blatt-seiten.tsx spielschule --datei=<entwurf>.json` (der Dateiname muss mit
  `spielschule` beginnen, z. B. `spielschule-3.json`).

#### Spielschule: Bausteine zum Tun (Seite 2)

Jeder dieser Bausteine füllt fast eine ganze Seite: davor **eine** `aufgabe` (mit Symbolen), höchstens noch eine kleine
zweite Aufgabe. Nicht in `spalten`. Die Linien sind auf allen Blättern gleich: **grau gestrichelt mit Schere =
schneiden**, **Strich-Punkt in der Bereichsfarbe = falten**, **getönte Fläche mit Klebestift = kleben**; eine kleine
Legende steht darunter. Bilder über dieselben Namen wie überall (`icon:`, `motiv:`, `gesicht:`, `figur:`) – neue
farbige Motive funktionieren sofort. Das Prüfskript prüft Anzahlen, Größen (Gänge, Kästchen) und ob alles auf die
Seite passt. Demo aller Bausteine: `tmp/demo-bausteine.json` rendern (falls vorhanden).

| Art | Felder | Wann |
|---|---|---|
| `schneiden_kleben` | `bilder` (3–6 × `{bild, text?}`, **richtige Reihenfolge**), `gemischt?` | Abläufe: Händewaschen, Kresse Tag 1/3/7, Ei – Riss – Küken, Brot backen. Bis 4 Bilder in einer Reihe (je ca. 40–55 mm), 5–6 in zwei Reihen. |
| `memory` | `bilder` (4–8 × `{bild, text?, paar?}`), `rueckseite?` | Wörter der Woche spielen und mitnehmen; `paar` = anderes Gegenstück (Tier – Tierkind, Gegenstand – Schatten). `rueckseite` (bis 6 Paare): Blatt an der Faltlinie falten, kleben, dann schneiden. |
| `labyrinth` | `start`, `ziel` (Bilder), `stufe?` (1–3), `seed?` | Stiftführung mit Geschichte: Igel zum Käfer, Laterne zum Fest. Immer genau ein Weg, Gänge 15–25 mm. Stufe 1 für 3-Jährige. Anderes `seed` = anderes Labyrinth. |
| `laufweg` | `felder` (10–16 × `{bild?, text?}`), `start?`, `ziel?`, `figuren?` | Würfelspiel zu den Wörtern der Woche; ein Feld darf eine Handlung tragen („hüpfen“, „2 zurück“, ≤ 14 Zeichen). Spielfiguren zum Ausschneiden darunter. |
| `minibuch` | `titel` (≤ 28 Zeichen), `titelbild?`, `seiten` (genau 6 × `{bild?, text?}`) | „Mein Tag“, „So geht Händewaschen“, „Mein Kressebuch“. Seite ohne `bild` = Malrahmen. Rückseite „Das Buch von ___“ automatisch. Falten: Rechteck ausschneiden, längs und quer falten, in der Mitte einschneiden, zum Buch falten (Anleitung für Erwachsene). |
| `punkte_verbinden` | `form` (stern, haus, herz, fisch, boot, ballon, apfel, tanne, drachen, schmetterling) oder `punkte` (4–10 × [x, y] in 0–100), `gruppen?` | Zahlenreihe 1–10 (drachen: 1–4, haus: 1–5). `gruppen` zeigt neben jeder Zahl die Menge als Punkte – für Kinder, die Ziffern noch nicht lesen. |
| `klappbild` | `bilder` (2–6 × `{bild}`), `klappe?` (Bild auf den Klappen) | „Wer versteckt sich?“: Tiere hinter Türen (`icon:door`), im Busch, unter dem Bett. Klappen ausschneiden, an der Lasche falten, auf den Klebestreifen über dem Fenster kleben. |
| `faedelkarte` | `form?` (kreis, oval, herz, stern, quadrat), `bild?`, `loecher?` (8–24), `ausmalen?` | Feinmotorik ohne Sprache: auf Karton kopieren, ausschneiden, Löcher mit der Lochzange; grüner Ring = Anfang. |
| `bastelbogen` | `vorlage` (maske, krone, stirnband, fahne), `ohren?` (katze, hase, baer, maus – Maske/Stirnband), `bild?`, `farben?` (Fahne, 2–4 Streifen) | Fuesend (Maske), Dreikönig/Geburtstag (Krone), Tierwoche (Stirnband mit Ohren), Nationalfeierdag (Fahne `["rot","weiss","hellblau"]`; ohne `farben` = eigene Fahne). Augenlöcher schneiden Erwachsene. |
| `suchbild` | `suchen` (1–4 × `{bild, anzahl 1–6}`), `ablenker?` (`{bild, anzahl?}`), `szene?` (wiese, wald, wasser, schnee, zimmer, nacht), `seed?` | Wimmelbild light: finden, einkreisen, zählen – unten „Finde: 3 ×“ mit Kästchen zum Abhaken (Selbstkontrolle). Höchstens 30 Bilder. |
| `anziehpuppe` | `figur?` (mia, noah, lea, sami, amira, tom), `kleider` (2–8 aus muetze, sonnenhut, schal, handschuhe, jacke, regenjacke, pulli, tshirt, kleid, hose, kurzehose, stiefel, gummistiefel, sandalen), `ausmalen?` | Wetter und Kleidung: Kind und Kleidung in passender Größe zum Ausschneiden und Anziehen; `ausmalen` = Kleidung weiß zum Selbstmalen. |

```json
{ "art": "aufgabe", "text": "Schneide aus. Klebe in der richtigen Reihenfolge.", "symbole": ["schneiden", "kleben"] },
{ "art": "schneiden_kleben", "bilder": [
  { "bild": "icon:seedling", "text": "der Keim" }, { "bild": "icon:plant-2", "text": "die Pflanze" },
  { "bild": "icon:flower", "text": "die Blume" } ] }

{ "art": "memory", "rueckseite": true, "bilder": [ { "bild": "icon:apple", "text": "der Apfel" }, { "bild": "icon:cat", "paar": "icon:paw" }, … ] }
{ "art": "labyrinth", "start": "icon:bug", "ziel": "icon:leaf", "stufe": 1 }
{ "art": "laufweg", "felder": [ { "bild": "icon:sun" }, { "bild": "icon:cloud-rain", "text": "hüpfen" }, … ] }
{ "art": "minibuch", "titel": "Mein Tag", "titelbild": "figur:lea:froh:winken",
  "seiten": [ { "bild": "icon:sunrise", "text": "aufstehen" }, { "text": "Das mag ich." }, … ] }
{ "art": "punkte_verbinden", "form": "fisch", "gruppen": true }
{ "art": "klappbild", "klappe": "icon:door", "bilder": [ { "bild": "icon:cat" }, { "bild": "icon:dog" }, { "bild": "icon:fish" } ] }
{ "art": "faedelkarte", "form": "herz", "bild": "gesicht:froh", "ausmalen": true }
{ "art": "bastelbogen", "vorlage": "stirnband", "ohren": "hase" }
{ "art": "suchbild", "szene": "wiese", "suchen": [ { "bild": "icon:bug", "anzahl": 3 } ],
  "ablenker": [ { "bild": "icon:leaf", "anzahl": 3 }, { "bild": "icon:flower" } ] }
{ "art": "anziehpuppe", "figur": "sami", "kleider": ["muetze", "schal", "handschuhe", "jacke", "hose", "stiefel"] }
```

In der `anleitung` (für Erwachsene) kurz sagen, was vorzubereiten ist: auf Karton kopieren (Memory, Fädelkarte),
Lochzange und Wollfaden (Fädelkarte), Gummiband (Maske), Würfel und Knöpfe (Laufweg).

#### Beobachten & Begleiten (Lehrerseite 3 und Zusatzseiten)

Alles optional – eine Einheit ohne diese Felder bleibt wie bisher (2 Lehrerseiten). Sobald eines da ist, meldet das
Prüfskript jedes fehlende als Hinweis. Zwei Orte:

- **In jeder Sprachfassung** (`de.lehrer.spielschule`, `fr.lehrer.spielschule`), in deren Sprache: `beobachtung`,
  `entscheiden`, `stufen`, `zugang`, `mehrsprachig`, `freitag`.
- **Einmal je Einheit** in `woche` (neben `de`/`fr`): was sprachunabhängig ist oder mehrere Sprachen nebeneinander zeigt –
  `domaenen`, `sprachen` (Wörterstreifen + Satz der Woche), `elternbrief`.

| Feld | Inhalt | Regeln |
|---|---|---|
| `beobachtung` | genau 3 `{text, eldib}` | „Ich kann …“ aus Sicht des Kindes (DE „Ich …“, FR « Je … »), ≤ 70 Zeichen, **beobachtbar** (zählen, zeigen, sagen, wählen – nicht „versteht“, „weiß“, „mag“). Je ein gültiges ELDiB-Ziel, in DE und FR dieselben. Die Stufen *mit Hilfe · allein · zeigt es anderen* (« avec de l’aide · tout seul · le montre aux autres ») sind fest. Dieselben Punkte stehen im Klassenraster und auf dem Portfolio-Blatt des Kindes – im FR deshalb **keine Mittelpunkt-Formen** (« seul·e »). |
| `entscheiden` | `{text, frage?}` | Eine **echte** Entscheidung der Kinder in dieser Woche (Wahl zwischen 3 Stationen, Abstimmung mit Steinen/Klammern über Lied, Rezept, Ort) – das Ergebnis wird umgesetzt. ≤ 170 Zeichen. `frage`: Frage fürs Fragenplakat am Montag („Was wollen wir über … wissen?“), ≤ 80 Zeichen, endet mit „?“. |
| `stufen` | `{precoce, p1, p2}` | Je eine Zeile ≤ 110 Zeichen für Précoce (3–4), Préscolaire 1 (4–5), Préscolaire 2 (5–6): dieselbe Aktivität, angepasst (Menge, Material, Sprache). |
| `zugang` | 2–3 Zeilen | „Zugang für alle“: Realgegenstand statt Bild, Gebärde, Bildplan, weniger Auswahl, Reizreduktion, feste Partnerin. ≤ 95 Zeichen, konkret für diese Woche. |
| `mehrsprachig` | 1 Zeile | Wie Familiensprachen vorkommen (Wort zuerst in der Familiensprache, Familien schicken ein Wort). ≤ 130 Zeichen. |
| `freitag` | `{vorlauf, kueche?, ausflug?, besuch?, material, planB?, sicherheit?}` | `vorlauf` 0 / 1 / 3 (Wochen), `material` `standard` (in jeder Spielschule) / `besorgen` / `selten` (ausleihen, bestellen). Die Angaben ohne Text in DE und FR gleich. `planB` ≤ 120 Zeichen (Regen, kein Schnee, keine Küche). `sicherheit`: höchstens 3, wo möglich als Standardsatz (unten). |
| `woche.domaenen` | 1–3 ids | Lernbereiche des Plan d’études Cycle 1: `logique-math` (Raisonnement logique et mathématique), `langage` (Langage, langue luxembourgeoise et éveil aux langues), `monde` (Découverte du monde par tous les sens), `psychomotricite` (Psychomotricité, expression corporelle et santé), `expression` (Expression créatrice, éveil à l’esthétique et à la culture), `vivre-ensemble` (Vie en commun et valeurs). Gedruckt werden nur diese Bezeichnungen (`src/blatt/spielschule.ts`) – **keine Zitate aus dem Plan d’études erfinden**. |
| `woche.sprachen` | `{woerter, satz?, geprueft}` | `woerter`: 6–8 `{de, fr, lb, pt?, bild?}`, jedes mit Artikel („der Apfel“, « la pomme », „den Apel“, „a maçã“), ≤ 24 Zeichen. Ohne `bild` nimmt die Seite das Bild der Bildkarte mit demselben Titel. `satz`: Satzmuster der Woche `{de, fr, lb?, pt?}` („Ich möchte …, bitte.“), ≤ 70 Zeichen. `geprueft`: **false**, bis eine Muttersprachlerin das Luxemburgisch gegen LOD geprüft hat. |
| `woche.elternbrief` | `{de, fr, pt?, lb?}` | Je `{woche, idee, bitte}`: 1 Absatz „Das machen wir“ (≤ 280), 1 Alltagsidee ohne Kosten (≤ 200), 1 Bitte an die Familien – ein Wort, Lied, Rezept, Foto mitbringen (≤ 200); zusammen ≤ 620 Zeichen. `lb` braucht `geprueft`. Das kurze `eltern` auf „Aktivitäten & Ideen“ bleibt. |

```json
"woche": {
  "domaenen": ["logique-math", "monde", "vivre-ensemble"],
  "sprachen": {
    "woerter": [
      { "de": "der Apfel", "fr": "la pomme", "lb": "den Apel", "pt": "a maçã" },
      { "de": "der Baum", "fr": "l’arbre", "lb": "de Bam", "pt": "a árvore" },
      { "de": "der Korb", "fr": "le panier", "lb": "de Kuerf", "pt": "o cesto" }
    ],
    "satz": { "de": "Ich möchte einen Apfel, bitte.", "fr": "Je voudrais une pomme, s’il te plaît.", "lb": "Ech hätt gär en Apel, wann ech gelift.", "pt": "Eu queria uma maçã, por favor." },
    "geprueft": false
  },
  "elternbrief": {
    "de": { "woche": "Diese Woche dreht sich bei uns alles um den Apfel …", "idee": "Zählen Sie beim Einkaufen die Äpfel gemeinsam in die Tüte …", "bitte": "Wie heißt „Apfel“ in Ihrer Familiensprache? …" },
    "fr": { "woche": "Cette semaine, tout tourne autour de la pomme …", "idee": "En faisant les courses, comptez ensemble les pommes …", "bitte": "Comment dit-on « pomme » dans la langue de votre famille ? …" },
    "pt": { "woche": "Esta semana, tudo gira à volta da maçã …", "idee": "Quando forem às compras, contem juntos as maçãs …", "bitte": "Como se diz «maçã» na língua da vossa família? …" }
  }
},
"de": { …, "lehrer": { …, "spielschule": { "wortschatz": […], "aktivitaeten": […], …,
  "beobachtung": [
    { "text": "Ich zähle Äpfel und zeige auf jeden genau einmal.", "eldib": "KOG-22" },
    { "text": "Ich sortiere Äpfel nach Farben: rot, grün, gelb.", "eldib": "KOG-23" },
    { "text": "Ich teile gerecht: Jedes Kind bekommt gleich viel.", "eldib": "SOZ-16" }
  ],
  "entscheiden": { "text": "Mittwoch: Jedes Kind legt einen Stein zu seiner Lieblingssorte. Aus der Sorte mit den meisten Steinen wird am Freitag das Apfelmus.", "frage": "Was wollen wir über Äpfel wissen?" },
  "stufen": {
    "precoce": "Äpfel tasten und benennen, bis 3 zählen; beim Teilen ein Stück weitergeben.",
    "p1": "Bis 6 zählen, nach Farben sortieren, „mehr“ und „weniger“ vergleichen.",
    "p2": "Nach zwei Merkmalen sortieren (Farbe und Größe), Mengen bis 10, das Rezept nacherzählen."
  },
  "zugang": ["Echter Apfel in der Hand statt Bildkarte; die Gebärde „Apfel“ zum Wort.", "Bildplan der Woche an der Tür: tasten, probieren, zählen, drucken, kochen.", "Beim Kochen: kleine Gruppe, ruhiger Platz, laute Geräte vorher ankündigen."],
  "mehrsprachig": "Familien schicken das Wort „Apfel“ in ihrer Sprache; alle Wörter hängen am Apfelbaum der Klasse.",
  "freitag": { "vorlauf": 0, "kueche": true, "ausflug": false, "besuch": false, "material": "besorgen",
    "planB": "Keine Kochplatte: Apfelspalten mit etwas Zimt probieren statt Apfelmus kochen.",
    "sicherheit": ["standard:allergien", "standard:messer", "standard:hitze"] }
} } }
```

**Schreibregeln:** kurz, konkret, ohne Fachjargon – so, dass eine Lehrerin es am Freitag in fünf Minuten liest.
Beobachtungspunkte beschreiben, was man **sehen oder hören** kann. Mitbestimmung heißt: Das Ergebnis der Kinder gilt.
Keine Diagnose- oder Defizitsprache in „Zugang für alle“ (nicht „für Autisten“, sondern „weniger Reize: …“).

**Standard-Sicherheitssätze** (in `freitag.sicherheit` als `"standard:<schlüssel>"`; Text DE/FR in `src/blatt/spielschule.ts`
– so steht jeder Satz in allen Einheiten gleich; das Prüfskript schlägt ihn vor, wenn eine freie Zeile dasselbe Thema hat):

| Schlüssel | Satz (DE) |
|---|---|
| `spiesse` | Keine spitzen Spieße oder Zahnstocher: Obst auf dem Teller anrichten; gegessen wird im Sitzen. |
| `pusten` | Strohhalm: nur pusten, nie saugen – vorher üben; jedes Kind hat seinen eigenen Halm. |
| `fotos` | Fotos und Aufnahmen nur mit schriftlicher Einwilligung der Familien; nur für Portfolio und Klasse, nie ins Internet. |
| `hitze` | Herd, Ofen und heißes Wasser bedienen nur Erwachsene; die Kinder bleiben einen großen Schritt entfernt. |
| `kleinteile` | Kleinteile (Perlen, Samen, Münzen, Magnete) nur unter Aufsicht; danach zählen und wegräumen. |
| `allergien` | Allergien und Essensregeln der Familien vorher klären; niemand muss probieren. |
| `messer` | Mit dem Messer schneiden nur Erwachsene; die Kinder zupfen, reißen oder brechen. |
| `wasser` | Am Wasser hat immer eine erwachsene Person die Kinder im Blick; Wannen danach sofort leeren. |
| `draussen` | Draußen: die Kinder beim Losgehen und beim Zurückkommen zählen; auf der Straße Warnwesten. |

**Luxemburgisch:** nur Wörter aufnehmen, die gegen LOD (lod.lu) nachgeschlagen sind, immer mit Artikel (den/de/d’);
`geprueft` bleibt `false`, bis eine Muttersprachlerin gegengelesen hat. Gedruckt wird es trotzdem normal. Das
Prüfskript listet ungeprüftes LB je Einheit (○, zählt nicht als Fehler); die Prüfliste für die Muttersprachlerin
(jedes Wort einmal, mit deutscher Bedeutung und Spalte „Korrektur“):
`npx tsx --tsconfig tsconfig.scripts.json scripts/lb-liste.ts --md=lb-liste.md` (oder `--csv=…`, `--alle`).

#### Experiment der Woche (Lehrerseite „Forschen“, Forscherblatt, Forscherkartei)

Jede Themenwoche bekommt ein kleines Experiment – echtes Material, sicher, in 15–30 Minuten mit der Gruppe zu machen,
passend zum Thema (Jahreszeit, Tiere, Essen …). `experiment` steht **in jeder Sprachfassung** in
`lehrer.spielschule` (DE und FR, beide Pflicht, sobald es eines gibt). Daraus entstehen:

- die Lehrerseite **„Forschen: Experiment der Woche“** (nach „Aktivitäten & Ideen“, vor „Beobachten & Begleiten“):
  Forscherfrage groß, Material mit kleinen Bildern, nummerierte Schritte mit Piktogrammen, *Vermuten – Beobachten –
  Erklären* mit „Warum? (für Kinder)“ als Sprechblase, „Hintergrund (für Erwachsene)“ klein, Sicherheit mit den
  Standardsätzen, Weiterforschen;
- die Zusatzseite **Forscherblatt** für die Kinder (eigener Knopf in der Toolbox, `…_zusatz.pdf` in `blatt-render`) –
  außer das Forscherblatt steht schon als Baustein im Schülerteil;
- eine Seite in der **Forscherkartei** (alle Experimente, nach Herbst, Winter, Frühling, Sommer und dann den übrigen
  Themen, mit Register nach Phänomenen).

Einheiten ohne `experiment` bleiben gültig (das Prüfskript zählt sie nur in der Zusammenfassung, ○). Ein vorhandenes
Experiment prüft es streng: Die Längen sind **Höchstwerte, damit die Seite nie überläuft** (Fehler, auch FR).

| Feld | Inhalt | Regeln |
|---|---|---|
| `titel` | Name des Experiments: „Der Wattepad-Regenbogen“ | ≤ 50 Zeichen |
| `frage` | Forscherfrage, so wie man sie den Kindern stellt | ≤ 90, endet mit „?“ |
| `material` | 3–8 Dinge mit Menge | je ≤ 60; Bild per Stichwort (s. u.) oder `{ "text": …, "bild": … }` |
| `schritte` | 3–5 Schritte, Infinitiv oder „Die Kinder …“ | je ≤ 140; Piktogramm per Stichwort (erstes Verb) oder `{ "text", "bild" }` |
| `vermutung` | Vermuten: Wie zeigen die Kinder ihre Idee (Daumen, Karte, Stein)? Was sagen sie oft? | ≤ 180 |
| `beobachten` | Beobachten: worauf achten, welche Fragen stellen | ≤ 180 |
| `warumKind` | Erklären in Kindersprache, 2–3 kurze Sätze, ohne Fachwörter | ≤ 180 |
| `hintergrund` | Fachlich für Erwachsene, sachlich, ohne Übertreibung | ≤ 550 |
| `sicherheit` | 1–3 Zeilen, wo möglich `standard:<schlüssel>` (Liste unten) | freie Zeile ≤ 120 |
| `weiter` | Weiterforschen: eine Variante für die nächsten Tage | ≤ 200 |
| `dauer` | „20 Min.“ | ≤ 20 |
| `phaenomene` | 1–2 ids fürs Register (in DE und FR dieselben) | `farben`, `wasser-wandert`, `schwimmen`, `loesen`, `waerme`, `verdunsten`, `luft`, `licht`, `magnet`, `schall`, `pflanzen`, `lebewesen`, `sinne`, `kraefte`, `gewicht`, `stoffe`, `oberflaeche`, `elektrizitaet` (Bezeichnungen in `src/blatt/forschen.ts`) |
| `forscherblatt` | optional: Bilder fürs Forscherblatt der Zusatzseite (wie der Baustein unten, ohne `art`) | ohne: Daumen hoch / runter |

**Nicht in der Spielschule** (Fehler, auch in `weiter`): Glitzer, Neodym- und kleine Magnete (Magnetkugeln), Kerzen,
Teelichter und Streichhölzer (LED-Kerze ist erlaubt), Alkohol/Spiritus, Trockeneis, heißes Wasser für Kinder (bedienen
Erwachsene heißes Wasser, steht das im Satz – „Eine Erwachsene gießt …“ – und `standard:hitze` gehört in die
Sicherheit). Verneint („keine Kerze“, « sans paillettes ») zählt nicht. Das Prüfskript schlägt Standardsätze vor:
Wanne/Becken → `wasser`, Messer/halbieren → `messer`, Samen, Perlen, Bohnen, Magnete → `kleinteile`,
Strohhalm/pusten → `pusten`, probieren/schmecken → `allergien`.

**Bilder per Stichwort** (`src/blatt/forschen.ts`): Material – Watte/Wattepad, Pipette, Tablett, Lupe, Farbe, Stift,
Eis, Salz, Zucker, Zitrone, Apfel, Becher, Glas, Teller, Schüssel/Wanne, Löffel, Tuch, Papier, Wasser, Ballon, Feder,
Samen/Erde, Steine, Sanduhr, Taschenlampe, Spiegel, Magnet … (auch FR). Schritte – das erste passende Verb: tropfen,
gießen/füllen, mischen, warten, schauen, vermuten, legen/stellen, malen, zählen, wiegen, messen, schneiden/halbieren,
pusten, einfrieren, einkreisen (Forscherblatt) … Passt nichts, steht ein Punkt (Material) bzw. die Hand (Schritt);
dann `{ "text": …, "bild": "icon:…" }` angeben. Neben allen Bildern der Toolbox gibt es `forschen:pipette`,
`forschen:wattepad` und `forschen:tablett`.

**Forscherblatt als Baustein** `forscherblatt` (Kinderseite, eine ganze Seite – steht allein auf Seite 2 nach
`seitenumbruch`): drei große Rahmen mit Nummer, Piktogramm und Handlungssymbol, ohne Lesen.

| Feld | Inhalt |
|---|---|
| `frage`, `bild` | Forscherfrage zum Vorlesen (≤ 60 Zeichen) mit Bild daneben |
| `vermuten` | „Ich vermute“: 2–3 `{ "bild", "text"? }` zum Einkreisen (Wort ≤ 18 Zeichen); ohne: Daumen hoch / runter |
| `sehen` | „Ich sehe“: `frei` (ein großes Malfeld, Standard) oder `vorher-nachher` (zwei Felder mit Pfeil) |
| `ergebnis` | „So war es“: 2–3 Bilder, `"gesichter"` (froh, überrascht, verwirrt) oder ohne Angabe dieselben Bilder wie `vermuten` |
| `name` | Namenszeile oben (Standard: ja; `false` auf Seite 1, wo der Kopf schon „Name“ hat) |

Muster (DE; die FR-Fassung steht mit eigenen Texten in `fr.lehrer.spielschule.experiment`):

```json
"experiment": {
  "titel": "Der Wattepad-Regenbogen",
  "frage": "Wohin wandern die Farben, wenn wir Wasser auf die Wattepads tropfen?",
  "material": [
    "7 Wattepads, in einer Reihe auf einem Tablett",
    "Lebensmittelfarbe oder Wasserfarbe: Rot, Gelb, Blau",
    "3 Pipetten (eine je Kind am Tablett)",
    "Becher mit Wasser",
    "Küchenpapier für Tropfen daneben",
    { "text": "Malkittel oder alte T-Shirts", "bild": "icon:shirt" }
  ],
  "schritte": [
    "Sieben Wattepads dicht nebeneinander auf das Tablett legen, so dass sie sich berühren.",
    "Auf jedes zweite Pad einige Tropfen Farbe geben: Rot, Gelb, Blau, Rot. Die Pads dazwischen bleiben weiß.",
    "Vermuten: Was passiert mit den weißen Pads, wenn wir Wasser dazugeben? Die Kinder zeigen ihre Idee.",
    "Mit der Pipette Wasser auf die farbigen Pads tropfen – langsam, Tropfen für Tropfen.",
    "Fünf Minuten warten und mit der Lupe schauen: Die Farben wandern und mischen sich zu Orange, Grün und Lila."
  ],
  "vermutung": "Fragen, bevor das Wasser kommt: Bleiben die weißen Pads weiß? Jedes Kind legt eine Karte: weiß oder bunt. Viele sagen: „Die Farbe bleibt, wo sie ist.“",
  "beobachten": "Langsam tropfen und schauen: Wohin läuft das Wasser? Was passiert, wo Rot und Gelb sich treffen? Welche neue Farbe entsteht zwischen Gelb und Blau?",
  "warumKind": "Die Watte trinkt das Wasser – wie ein Schwamm. Das Wasser wandert weiter und nimmt die Farbe mit. Wo zwei Farben sich treffen, entsteht eine neue.",
  "hintergrund": "Watte besteht aus feinen Fasern mit winzigen Zwischenräumen. Wasser wird in diese engen Räume hineingezogen und breitet sich aus, auch seitwärts und nach oben: Kapillarwirkung. Gelöste Farbstoffe wandern mit. Treffen zwei Grundfarben zusammen, mischen sie sich: Rot und Gelb ergeben Orange, Gelb und Blau Grün, Blau und Rot Lila. So erleben die Kinder zwei Dinge auf einmal: Wasser bewegt sich ohne Hilfe, und aus drei Farben werden sechs. Auf dieselbe Weise steigt Wasser in Pflanzen nach oben.",
  "sicherheit": ["standard:wasser", "Lebensmittelfarbe färbt Haut und Kleidung: Malkittel anziehen, Tisch abdecken; das Farbwasser nicht trinken."],
  "weiter": "Am nächsten Tag: die Wattepads im Kreis legen (Farbkreis) oder Küchenpapier statt Watte nehmen. Was geht schneller? Getrocknet werden die Pads zur Regenbogen-Girlande.",
  "dauer": "20 Min.",
  "phaenomene": ["wasser-wandert", "farben"],
  "forscherblatt": {
    "vermuten": [{ "bild": "forschen:wattepad", "text": "bleibt weiß" }, { "bild": "icon:rainbow", "text": "wird bunt" }],
    "sehen": "vorher-nachher"
  }
}
```

Als Seite 2 im Schülerteil (dann gibt es keine eigene Zusatzseite):
`{ "art": "seitenumbruch" }, { "art": "forscherblatt", "frage": "Wohin wandern die Farben?", "bild": "icon:rainbow", "vermuten": […], "sehen": "vorher-nachher" }`.

**Schreibregeln:** Ein Experiment, das wirklich funktioniert (vorher selbst ausprobieren) und das die Kinder selbst tun
(tropfen, legen, rühren) – die Erwachsenen bereiten vor und fragen. Vermuten immer **vor** dem Tun; beim Erklären keine
falschen Vereinfachungen („die Farbe ist schwer“), sondern ein Bild aus dem Alltag der Kinder (Schwamm, Schwimmring).
Hintergrund ohne erfundene Zahlen oder Studien. Ergebnisse der Kinder sind nie „falsch“ – sie werden überprüft.

**Seiten und Downloads:** Der Lehrerteil („Mit Lehrerseite“, „Nur Lehrerseite“, Mappen) bekommt die Seite
„Beobachten & Begleiten“ automatisch, sobald eines der Felder da ist. **Klassenraster** (quer: 14 Zeilen × 3 Punkte ×
3 Stufen, Datum eintragen) und **Portfolio-Blatt** (Kinderseite: Bild/Foto, „Das kann ich jetzt“ mit den drei Stufen,
Worte des Kindes, Datum) gibt es, wenn `beobachtung` da ist; den **Elternbrief** (DE und FR, darunter PT/LB, Wörter
und Satz der Woche), wenn `woche.elternbrief` da ist. Sie erscheinen in der Toolbox als eigene Knöpfe im Blatt
(`BlattOptionen.zusaetze`), `blatt-render` schreibt sie als `…_zusatz.pdf`, `blatt-seiten` prüft je 1 Seite.

### Bildgeschichten & Karten
| Art | Felder | Wofür |
|---|---|---|
| `comic` | `felder` (1–6), `spalten?` (2/3) | Feld: `figuren` (max. 2), `requisit?`, `text?` (Sprechblase, ≤ 70 Zeichen), `sprecher?` (0/1), `blase?` (sprechen/denken/keine), `untertitel?` ('' = Linie), `leer?` (zum Selbstzeichnen). |
| `karten` | `karten: [{titel?, text?, bild?}]`, `spalten?` (2–4), `hoehe?` | Karten zum Ausschneiden (Signalkarten, Stärkenkarten, Bildkarten). |
| `forscherblatt` | `frage?`, `bild?`, `vermuten?`, `sehen?`, `ergebnis?`, `name?` | Spielschule: Forscherblatt zum Experiment der Woche – eine ganze Seite (siehe „Experiment der Woche“). |

### Abschluss
| Art | Felder | Wofür |
|---|---|---|
| `rueckblick` | `frage?` | Kurze Selbstbewertung mit drei Gesichtern (optional, passt gut ans Ende). |
| `notfall` | `eintraege?`, `text?` | Hilfenummern Luxemburg (112, 113, KJT 116 111, SOS Détresse 45 45 45, BEE SECURE 8002 1234) + Vertrauensperson. Bei ES-Themen zu Krisen, Mobbing, psychischer Gesundheit. |

## 4. Bilder

- **Piktogramme** `icon:<name>` – Liste in `src/blatt/bilder/icons.json` (375 Stück, z. B. angle, backpack, bed, book, bulb, clock, device-mobile, friends, heart, hourglass, lifebuoy, moon, music, palette, pillow, school, shield, sun, target, traffic-lights, volcano …).
- **Gefühlsgesichter** `gesicht:<gefühl>` – froh, traurig, wuetend, aengstlich, ueberrascht, angeekelt, ruhig, stolz, verlegen, muede, nervoes, enttaeuscht, gelangweilt, verwirrt, aufgeregt, besorgt, neutral.
- **Figuren** `figur:<name>[:<gefühl>[:<haltung>]]`
  - Kinder: mia, noah, lea, sami, amira (Kopftuch), tom (Kappe); Jugendliche: jana, ben; Erwachsene: lehrerin, lehrer.
  - Haltungen: stehen, winken, verschraenkt, zeigen, jubeln, melden, stopp, haende-gesicht, geben.
  - Beispiel: `figur:sami:traurig`, `figur:lehrerin:ruhig:zeigen`.
- **Motive** `motiv:<name>` – vulkan, eisberg, batterie, batterie-leer, batterie-voll, ampel, waage, hand, koerper, schildkroete, schildkroete-panzer, baum, berg, insel, stopp, bruecke, ballon, werkzeugkiste, haus, wasserglas.
- **Kinder-Motive: Tiere, Natur, Feste** `motiv:<name>` (farbig, für die Spielschule; `src/blatt/motive-tiere.ts`,
  erkennbar ab ca. 18 mm Bildhöhe, auch als Ausmalbild mit `modus: "anmalen"`):
  - Bauernhof: kuh, huhn, kueken, ei, ei-im-nest, ei-riss, schaf, ziege, schwein, pferd, esel, hase, katze, hund.
  - Wald und Vögel: igel, eichhoernchen, fuchs, reh (ohne Geweih), eule, vogel, nest (mit Eiern), vogelhaus, frosch.
  - Krabbeltiere und Verwandlung: raupe, puppe, schmetterling, biene, ameise, regenwurm, schnecke, marienkaefer
    (Bildfolgen: ei → ei-riss → kueken, raupe → puppe → schmetterling).
  - Zoo: elefant, giraffe, loewe, affe, pinguin, zebra, krokodil.
  - Natur und Wetter: regenbogen, wind, pfuetze, schneeball, schlitten, kastanie, eichel, kuerbis (ohne Gesicht),
    kartoffel, blatt-herbst, kresse-1 / kresse-2 / kresse-3 (Tag 1 / 3 / 7), regenschirm, sonnenschirm.
  - Feste und Kirmes: peckvillchen, buergbrennen, lampion, riesenrad, karussell, feuerwerk, fahne-lu
    (rot – weiß – hellblau), kleeschen (ohne Rute), boxemaennchen.
- **Farbige Motive für die Spielschule** (`src/blatt/motive-dinge.ts`, auf Bildkarten ≈ 18 mm noch erkennbar; statt Piktogrammen nehmen, wo es passt):
  - Menschen zusammen: freunde, gruppe, familie, baby, oma, opa, kind-troesten, teilen.
  - Berufe und Rollen: aerztin, arzt, feuerwehrfrau, busfahrer, baeckerin, bauarbeiterin, polizist, verkaeufer, clown, ritterin, magier, schauspieler.
  - Körper am Kind (Teil gelb hervorgehoben): nase, mund, auge, ohr, haare, bauch, arm, bein, fuss, hand-offen.
  - Kleidung und Gepäck: winterjacke, pulli, hose, muetze, schal, handschuhe, gummistiefel, socke, schlafanzug, regenjacke, kappe, koffer, rucksack.
  - Tisch und Küche: becher, teller, tasse, loeffel, kanne, milch, brot, mehl, teig, ofen, ausstechform, topf, kelle, salat.
  - Bad und Zuhause: seife, handtuch, waschbecken, zahnbuerste, zahnpasta, spiegel, sofa, tisch, stuhl, bett, regal, spielzeugkiste.
  - Licht, Verkehr, Baustelle, Theater: laterne, taschenlampe, led-kerze, zebrastreifen, bushaltestelle, bus, bagger, kran, helm, buehne, krone, maske.
- **Farbige Motive: Forschen, Schule, Bewegung, Sage** (`src/blatt/motive-lernen.ts`, auf Karten ≈ 18 mm noch erkennbar, im
  Schwarzweißdruck lesbar, auch als Ausmalbild mit `modus: "anmalen"`; ohne Schrift, Marken und Zeichen):
  - Forschen und Entdecken: leuchttisch (mit bunten, durchscheinenden Formen), lupe, magnet (rot-blauer Hufeisenmagnet),
    kompass (ohne Buchstaben), knete (Kugel, Rolle, Stern), sanduhr, wasseruhr.
  - Schule, Bücher, Malen: schule (Gebäude mit Uhr im Giebel), buch (aufgeschlagenes Bilderbuch), buecherregal
    (nur Bücher; auch für „Bibliothek“), pinsel, radiergummi.
  - Bewegung, Musik, Zirkus: mikrofon, trommel, zirkuszelt, turnmatte (Matte und Bank), rad (Holzrad), fallschirm (Spielfigur am Schirm).
  - Zuhause und Garten: muelltonne (allgemein, ohne Aufdruck), gartenschlauch.
  - Sage von Melusina: fee (Wasserfee mit Fischschwanz, Oberteil mit Ärmeln), ritter (freundliche Ganzfigur; Gegenstück zur
    ritterin). Für Brücke und Ballon gibt es schon `bruecke` und `ballon`, für Spielzeug-Regale `regal`.
- **Farbige Motive: Alltag, Wetter, Sand, Fahrzeuge** (`src/blatt/motive-alltag.ts`, auf Karten ≈ 18 mm noch erkennbar, im
  Schwarzweißdruck lesbar, auch als Ausmalbild mit `modus: "anmalen"`; ohne Schrift, Marken und Zeichen):
  - Obst, Gemüse, Essen: apfel, zitrone (ganz und als Scheibe), mandarine (mit zwei Spalten), karotte, rosine (Schale voller
    Rosinen), flasche (klare Flasche mit Korken und leerem Etikett, z. B. für Essig), plaetzchen (rund, Stern, Herz).
  - Wetter und Jahreszeit: sonne, wolke, regen (Regenwolke mit Tropfen), schneemann, blume (Tulpe), eiswuerfel (durchscheinend
    blau, mit Glanz und Pfütze).
  - Sand und Garten: giesskanne (Zylinderkanne mit langem Ausguss und Brause, Wasser fließt – keine Teekanne; die Teekanne
    heißt `kanne`), eimer (Sandeimer mit Bügel und Sandhaufen – kein Becher), schaufel (Sandschaufel), burg (Burg mit drei
    Türmen und Tor), drache (freundlicher Drache mit kleiner Flamme), rakete.
  - Tiere und Krabbler: fisch (Goldfisch mit Blasen), kaefer (allgemeiner Käfer, braun – der rote heißt `marienkaefer`),
    spinne (freundlich, am Faden), gluehwuermchen (leuchtender Hinterleib).
  - Dinge: schluessel, schatten (Kind winkt, sein Schatten liegt dunkel auf dem Rasen, Sonne links oben), matsch (Pfütze aus
    Lehm mit Stiefelabdruck; die Wasserpfütze heißt `pfuetze`), warnweste (gelb mit grauen Reflexstreifen), fahrkarte (Karte
    mit Bus-Zeichen, Strichen und Lochung, ohne Text).
  - Fahrzeuge: auto, zug (Lok mit Wagen), fahrrad, traktor, flugzeug, schiff (Segelboot), roller (Tretroller; `bus` gibt es schon).

Figuren-Namen erscheinen **nicht** im Bild – in Geschichten dürfen die Kinder
anders heißen. Bilder sparsam und gezielt einsetzen, nie als Dekoration.

## 5. Sprache und Ton

**Konkret statt allgemein.** Nicht „Wie fühlst du dich in schwierigen Situationen?“,
sondern „Stell dir vor: In der Pause sagt jemand, du darfst nicht mitspielen. Was spürst du im Bauch?“

- **Alltag in Luxemburg:** Pause, Kantine, Maison Relais, Schulbus, Turnhalle, Précoce, Cycle, Lycée, Klassenrat, Hausaufgabenhilfe. Keine deutschen Sonderbegriffe (kein „Hort“, kein „Gymnasium“).
- **Namen** gemischt wie in Luxemburger Klassen: Lena, Noah, Inês, Tiago, Mila, Jang, Ben, Sofia, Yusuf, Amira, Luca, Emma, Liam, Chiara, Diogo, Léa, Mathis, Zoé, Elias, Aylin, Nora, Samuel, Ana, Rafael, Jil, Pol, Mia, Finn, Leonor, Mehmet.
- **Anrede:** Kinder und Jugendliche mit „du“. Die Lehrerseite ohne Anrede, sachlich im Infinitiv/Imperativ („Geschichte vorlesen. Fragen: …“).
- **Satzlänge:** C1/C2 höchstens 10 Wörter; C3–C4 höchstens 15; ES normal, aber klar.
- **Ein Blatt, ein roter Faden:** Wahrnehmen → Verstehen → Handeln/Üben → Übertragen (Plan). 3–5 Aufgaben reichen.
- **Beispiele vorgeben:** Beispielzeilen in Tabellen, Beispiel-Wenn-dann-Plan, Beispiel-Satz. Das nimmt Unsicherheit.
- **Wertschätzend, nie beschämend:** Kein Blatt als Strafe. Fehler und schwierige Gefühle sind normal.
- **Vielfalt ohne Aufhebens:** Familienformen, Sprachen, Herkunft kommen selbstverständlich vor.

**Verboten (wirkt nach KI oder Textbaukasten):**
- Emojis, „Super!“, „Toll!“, doppelte Ausrufezeichen, mehr als ein Ausrufezeichen pro Blatt
- „Lass uns …“, „spannende Reise“, „Entdeckungsreise“, „In diesem Arbeitsblatt …“, „Viel Spaß!“, „Wusstest du, dass …“, „Hast du dich schon einmal gefragt …“, „Superkraft“, „magisch“, „ganzheitlich“
- Leere Aufzählungen im Dreierpack ohne Inhalt; Allgemeinplätze („Gefühle sind wichtig“)
- Englische Modewörter, wo es ein gutes deutsches Wort gibt
- Therapie- oder Diagnosesprache auf dem Schülerblatt („Störung“, „Symptom“, „ADHS“)

**Typografie:** deutsche Anführungszeichen „…“ und ‚…‘, Gedankenstrich –, Auslassung …
Im Französischen normale Leerzeichen vor : ; ! ? schreiben (das System setzt die richtigen),
Anführungszeichen « … ». Keine Zeichen außerhalb von Latein-1 (z. B. kein ✓ – stattdessen „x“).

## 6. Französisch (ES)

- Vollständige, **natürliche** Übersetzung, kein Wort-für-Wort. So schreiben, wie eine erfahrene Lehrkraft im Lycée spricht.
- Inklusive Formen sparsam mit Mittelpunkt: « prêt·e », « motivé·e ». **Nie auf Kinderblättern der Spielschule (C1)** – dort eine einfache Form oder ein Nomen (Prüfskript: Fehler).
- Luxemburger Begriffe: « lycée », « classe », « éducateur·rice », « SePAS », « responsable ».
- Titel kurz, eigenständig formuliert (z. B. „Aufschieben überlisten“ → « Déjouer la procrastination »).

## 7. Seite „Für die Lehrperson“

```json
"lehrer": {
  "ziel": "1–2 Sätze: Was können die Kinder danach?",
  "ablauf": ["3–7 konkrete Schritte mit Zeitangaben und wörtlichen Impulsfragen"],
  "hintergrund": "250–900 Zeichen: fachlich fundiert, verständlich, ohne Übertreibung",
  "quellen": ["nur Texte aus src/blatt/quellen.ts, wörtlich kopiert"],
  "differenzierung": { "leichter": "…", "schwerer": "…" },
  "impulse": ["2–4 Gesprächsfragen"],
  "tipps": ["1–3 Hinweise aus der Praxis"],
  "achtung": "Wann mehr Hilfe nötig ist",
  "material": "Schere, Kleber …"
}
```

- **Quellen nur aus der geprüften Liste** (`src/blatt/quellen.ts`) – das Prüfskript lehnt alles andere ab. Keine erfundenen Studien, keine Prozentzahlen ohne Quelle.
- Im Hintergrund die Quelle im Text nennen wie im Muster: „(Gross, 1998)“.
- **Achtung-Hinweis** bei sensiblen Themen (Angst, Traurigkeit, Grenzen, Körper, Mobbing, Medien, Krise, Familie): nicht im Plenum vertiefen, Einzelgespräch, „die zuständige Leitung (Responsable) informieren“. Bei Hinweisen auf Gefährdung (Gewalt, Missbrauch, Selbstverletzung, Suizidgedanken) immer: sofort handeln nach dem internen Ablauf, nicht allein lassen.
- Keine Diagnosen stellen, keine Heilversprechen. Die Blätter sind pädagogische Förderung.

## 8. Sensible Themen

- **Grenzen & Körper (C1–C4):** Prävention ohne Angst: „Mein Körper gehört mir“, gute/schlechte Geheimnisse, Nein sagen, Hilfe holen. Keine Details über Missbrauch.
- **Pubertät:** sachlich, respektvoll, vielfältig (Körper sind verschieden). Keine Bewertung von Aussehen.
- **Traurigkeit/Krise (ES):** Warnzeichen benennen, Hilfe zeigen (`notfall`), nie zur Offenlegung in der Gruppe auffordern.
- **Familie:** keine Fragen, die Kinder zwingen, Privates preiszugeben; immer „wenn du magst“.
- **Medien:** ohne Panik, mit konkreten Regeln und Alternativen.

## 9. Checkliste vor dem Abschluss

- [ ] Prüfskript ohne Fehler, Hinweise bewusst entschieden
- [ ] Alle Seiten als Bild angesehen: nichts abgeschnitten, keine halbleeren Seiten, Umbrüche sinnvoll
- [ ] Schülerteil 1 Seite (C1/C2) bzw. höchstens 2 Seiten; Lehrerseite genau 1 Seite (Spielschule: 2, dazu je 1 für „Forschen“ und „Beobachten & Begleiten“)
- [ ] Mindestens eine Aufgabe mit Beispiel oder vorgegebenem Anfang
- [ ] ELDiB-Items passen wirklich zu Inhalt und Alter
- [ ] Französisch vollständig und natürlich (ES)
- [ ] Würde eine erfahrene Kollegin das so drucken? Wenn nein: überarbeiten.
