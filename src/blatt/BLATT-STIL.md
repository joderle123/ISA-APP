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

Umfang: Schülerteil **1 Seite** (C1, C2) bzw. **höchstens 2 Seiten** (C3–ES).
Die Seite „Für die Lehrperson“ muss auf **eine** Seite passen. Ausnahme Bereich `spielschule` (Themenwochen):
Schülerteil 2 Seiten (Bildkarten + Blatt), für die Lehrperson 2 Seiten (Lehrerseite + „Aktivitäten & Ideen“). Seitenzahlen zählen je Blatt („Seite 1 / 2“), auch in
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
| `aufgabe` | `text`, `hinweis?`, `symbole?` | Arbeitsauftrag. Kurz, klar, ein Verb. `symbole`: malen, schreiben, lesen, schneiden, kleben, ankreuzen, einkreisen, verbinden, sprechen, zuhoeren, nachdenken, zeigen, partner, gruppe (vor allem C1–C3). |
| `text` | `text`, `klein?` | Kurzer Sachtext (v. a. ES). |
| `info` | `titel?`, `text?`, `punkte?`, `symbol?` | Kasten: `wissen` (Gut zu wissen), `tipp`, `merke`, `achtung`, `hilfe`. |
| `geschichte` | `titel?`, `text`, `bild?` | Kurze Alltagsgeschichte (C2: 3–5 Sätze, C3–C4: 4–7, ES: Fallvignette). Mit Figur links. |
| `bild` | `bild`, `groesse?` (s/m/l/xl), `text?`, `ausrichtung?` | Einzelnes Bild. |
| `spalten` | `links`, `rechts`, `verhaeltnis?` ('1:1','2:1','1:2') | Zwei Spalten (nicht verschachteln). |
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
| `gefuehle` | `gefuehle`, `modus?` (benennen/einkreisen/nur), `leer?`, `spalten?` | Gefühlsgesichter; `benennen` = Linie statt Wort. |

### Denk- und Bildmodelle
| Art | Felder | Wofür |
|---|---|---|
| `ampel` | `stufen` (genau 3: rot/gelb/grün), `linien?` | Stopp – Denken – Handeln. |
| `thermometer` | `stufen` (3–5, **von ruhig nach heiß**), `linien?` | Erregung, Stress, Wut. |
| `vulkan` | `stufen?` (3: unten → oben) | Auslöser – Anzeichen – Plan. Ohne `stufen` Standardtexte. |
| `eisberg` | `oben`, `unten`, `beispielOben?`, `beispielUnten?` | Sichtbares Verhalten vs. Gefühle/Bedürfnisse darunter. |
| `koerper` | `legende?` ([{farbe, text}]), `frage?` | Körperumriss zum Anmalen (farbe: rot, orange, gelb, gruen, blau, lila, grau, braun). |
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
  `hoehe` in **Zeilen**, z. B. 8–10). Von Einheit zu Einheit abwechseln. Sätze für Kinder höchstens 10 Wörter.
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

### Bildgeschichten & Karten
| Art | Felder | Wofür |
|---|---|---|
| `comic` | `felder` (1–6), `spalten?` (2/3) | Feld: `figuren` (max. 2), `requisit?`, `text?` (Sprechblase, ≤ 70 Zeichen), `sprecher?` (0/1), `blase?` (sprechen/denken/keine), `untertitel?` ('' = Linie), `leer?` (zum Selbstzeichnen). |
| `karten` | `karten: [{titel?, text?, bild?}]`, `spalten?` (2–4), `hoehe?` | Karten zum Ausschneiden (Signalkarten, Stärkenkarten, Bildkarten). |

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
- Inklusive Formen sparsam mit Mittelpunkt: « prêt·e », « motivé·e ».
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
- [ ] Schülerteil 1 Seite (C1/C2) bzw. höchstens 2 Seiten; Lehrerseite genau 1 Seite
- [ ] Mindestens eine Aufgabe mit Beispiel oder vorgegebenem Anfang
- [ ] ELDiB-Items passen wirklich zu Inhalt und Alter
- [ ] Französisch vollständig und natürlich (ES)
- [ ] Würde eine erfahrene Kollegin das so drucken? Wenn nein: überarbeiten.
