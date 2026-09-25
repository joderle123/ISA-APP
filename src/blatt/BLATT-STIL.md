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

Umfang: Schülerteil **1 Seite** (Spielschule, C2) bzw. **höchstens 2 Seiten** (C3–ES).
Die Seite „Für die Lehrperson“ muss auf **eine** Seite passen.

## 2. Aufbau eines Blatts

```json
{
  "id": "wutvulkan",                      // klein, a–z, 0–9, Bindestriche; eindeutig
  "bereich": "gefuehle",                  // gefuehle | verhalten | miteinander | lernen | alltag | werkzeuge
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
| `mindmap` | `mitte`, `aeste?` ('' = leer), `anzahl?` | Sammeln (max. 8 Äste). |
| `schritte` | `items: [{titel, text?}]`, `stil?` (liste/kette), `linien?` | Abläufe. `kette` = waagrecht, max. 4, Titel ≤ 26 Zeichen. |
| `plan` | `ziel?` ('' = Linie), `zeilen`, `tage?`, `symbol?` (gesicht/kasten/stern) | Wochen-Tracker. |
| `tagesplan` | `zeilen: [{zeit?, text?, bild?}]`, `leer?` | Tagesablauf. |
| `atmen` | `uebung`: quadrat, ballon, blume, fuenf-sinne, finger | Fertige Atem-/Achtsamkeitsübungen. |

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

- **Piktogramme** `icon:<name>` – Liste in `src/blatt/bilder/icons.json` (246 Stück, z. B. backpack, bed, book, bulb, clock, device-mobile, friends, heart, hourglass, lifebuoy, moon, music, palette, pillow, school, shield, sun, target, traffic-lights, volcano …).
- **Gefühlsgesichter** `gesicht:<gefühl>` – froh, traurig, wuetend, aengstlich, ueberrascht, angeekelt, ruhig, stolz, verlegen, muede, nervoes, enttaeuscht, gelangweilt, verwirrt, aufgeregt, besorgt, neutral.
- **Figuren** `figur:<name>[:<gefühl>[:<haltung>]]`
  - Kinder: mia, noah, lea, sami, amira (Kopftuch), tom (Kappe); Jugendliche: jana, ben; Erwachsene: lehrerin, lehrer.
  - Haltungen: stehen, winken, verschraenkt, zeigen, jubeln, melden, stopp, haende-gesicht, geben.
  - Beispiel: `figur:sami:traurig`, `figur:lehrerin:ruhig:zeigen`.
- **Motive** `motiv:<name>` – vulkan, eisberg, batterie, batterie-leer, batterie-voll, ampel, waage, hand, koerper, schildkroete, schildkroete-panzer, baum, berg, insel, stopp, bruecke, ballon, werkzeugkiste, haus, wasserglas.

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
