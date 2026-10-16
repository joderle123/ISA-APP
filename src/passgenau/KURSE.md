# Passgenau – Einzelkurse: Leitfaden und Katalog

Ein **Einzelkurs** ist eine als Ganzes geschriebene Folge von **6 Sitzungen** zu einem Thema und einer Altersstufe, für die
Einzelstunde (Fachkraft und ein Kind, 30 Minuten; Vorschule 20 Minuten). Maßstab ist der Skills-Kurs (`src/data/kurs/`) und
die Pilot-Sitzung „Gefühls-Detektive“ (`src/data/passgenau/inhalte/kurs-pilot.json`): Jede Sitzung hat einen klaren
Auftrag, wörtliche Sätze für die Fachkraft, eine Lösung für „wenn es kippt“ und ein **eigenes, starkes Blatt**. Eine
Leitfigur oder ein Leitmodell trägt durch alle sechs Sitzungen und **wächst** (Sitzung 1 führt es ein, jede Sitzung fügt
einen Teil hinzu, Sitzung 6 zeigt das Ganze).

Qualitätsmaßstab wie bei den Blättern (`src/blatt/BLATT-STIL.md`): wie aus einem guten Fachverlag (Beltz „Therapie-Tools“,
Verlag an der Ruhr) – fachlich fundiert, konkret, ruhig, in der Sprache der Kinder. Niemand soll denken „oh, KI wieder“.

## 1. Wie der Planer Kurse nutzt

- Eine **gründliche Folge** (Weg 1) nimmt einen Kurs, wenn eine erste Sitzung (Linie `kurs-…`, Nr. 1) ein Hauptziel des Kindes
  mit Gewicht 1 übt und für das Kind passt (Alter, Zugang, Vorsicht). Dann ist **Sitzung k der Folge Sitzung k des Kurses**,
  auch für Übertragen (5) und Rückblick (6) – dafür sind die Sitzungen 5 und 6 eines Kurses geschrieben.
- Je Sitzung gibt es **Varianten** (gleiche Nr., Id endet auf `-a`, `-b`). Es gewinnt die Variante, deren `zugang` zum Kind passt.
- Die **Kurs-Rituale** (Feld `kurs`) eröffnen und schließen jede Sitzung des Kurses – nur in Folgen dieses Kurses.
- Das Blatt der Sitzung bleibt ganz (nur bei wenig Schreiben gekürzt, außer bei der bildgestützten Variante).
- Die Stunde: Ankommen (Ritual, 2–3 Min.) · Einstieg (2–4) · **Kern = die Kurs-Sitzung (10–14)** · Blatt (8) · Abschluss
  (Ritual, 3–4). Der Kern-Text beschreibt nur den Kern; was am Blatt geschieht, steht in `uebungsblatt.anleitung`.

## 2. Aufbau eines Kurses

Datei: `src/data/passgenau/inhalte/kurs-<thema>-<von>-<bis>.json` (ein JSON-Array). Linie: `kurs-<thema>-<von>-<bis>`.

| Altersstufe | Varianten je Sitzung | Zugang (`zugang`) | Blatt |
|---|---|---|---|
| 4–6 (C1) | eine: `-a` | `{ lesen: 0, schreiben: 0, bild: 3 }` | 1 Seite, Bildblatt, Pflicht `anleitung` für Erwachsene |
| 7–9 (C2/C3) | `-a` schreibend, `-b` bildgestützt | a `{1,1,2}` · b `{0,0,3}` | höchstens 2 Seiten |
| 10–12 (C4) | `-a` schreibend, `-b` wenig Schreiben | a `{2,2,1}` · b `{1,0,2}` | höchstens 2 Seiten |
| 13–16 (ES) | `-a` schreibend, `-b` wenig Schreiben | a `{2,2,1}` · b `{1,0,2}` | höchstens 2 Seiten, Jugend-Gestaltung, nie kindlich |

**Bogen der sechs Sitzungen** (Feld `bogen`, so plant auch der Planer):
1. `wahrnehmen` – Leitfigur/Leitmodell einführen, erstes Erleben, Wortschatz.
2. `verstehen` – den Kern des Themas verstehen (wie funktioniert das bei mir?).
3. `ueben` – das erste Werkzeug üben.
4. `ueben` – das zweite Werkzeug üben, schwieriger oder mit anderen.
5. `uebertragen` – in den Alltag: eine echte Situation dieser Woche durchspielen und planen (wer, wann, wo, welcher Satz).
6. `reflektieren` – Rückblick über alle Sitzungen, das ganze Modell, eigene Karte/Urkunde, was bleibt, wer hilft.

**Varianten:** Varianten einer Sitzung haben denselben Titel, dieselbe Figur, dasselbe Modell, dasselbe Blatt-Gerüst und
denselben Ablauf – ein Tausch fällt nicht auf. Nur die Arbeitsform auf dem Blatt unterscheidet sich: `-a` schreibt (Linien,
Satzanfänge, Tabellen), `-b` kreist ein, kreuzt an, malt, zeigt, verbindet, ordnet zu (bis 9 Jahre) bzw. kreuzt an,
schätzt auf Skalen, wählt Karten, schreibt höchstens Stichworte (ab 10). Der Kern-Text darf bei `-b` einen Satz anders haben
(z. B. „Das Kind zeigt …“ statt „Das Kind schreibt …“).

## 3. Felder einer Sitzung (Vorbild: `ki:kurs-gefuehle-7-9-s1-a`)

```
id            "ki:kurs-<thema>-<von>-<bis>-s<nr>-<a|b>"
quelle        { "art": "praxis", "titel": "Einzelkurs <Kursname>" }
titel         ≤ 60 Zeichen, in der Sprache des Kurses („Spur 2: Der Körper verrät viel“)
text          Anleitung für die Fachkraft, 4–7 Sätze, konkret: was zeigt/tut sie, was tut das Kind, in welcher Reihenfolge,
              wann wird getauscht. Erster Satz knüpft ab Sitzung 2 an die letzte an („Oli hat schon Spur 1 …“).
sagen         2–4 wörtliche Sätze für die Fachkraft (kurz, warm, in Kindersprache bzw. respektvoll für Jugendliche)
wennEsKippt   1–3 Sätze: konkrete leichtere Form, ein Ausweg ohne Bloßstellen, und was genügt
rolle         ["kern"]
bogen         siehe oben
thema         ["<thema>"]  (gefuehle, wut, freundschaft, regeln, selbstwert, angst, aufmerksamkeit, lernen …)
eldib         [{ "code": "K-21", "gewicht": 1 }, { "code": "K-26", "gewicht": 0.5 }]  (aus dem Katalog unten; alle Sitzungen gleich)
kompetenz     ["gefuehle-erkennen"]  (gefuehle-erkennen, gefuehle-ausdruecken, impulskontrolle, selbstregulation,
              kommunikation, kooperation, konflikte, selbstbild, aufmerksamkeit, ausdauer, lernstrategien)
alter         { "von": 7, "bis": 9 }
dauer         { "min": 8, "typ": 10, "max": 14 }  (4–6: { 6, 8, 10 })
sozialform    ["einzeln"] · einzeltauglich "ja"
energie 1–3 · belastung 0–2 (Sitzungen mit eigenen Erlebnissen zu Angst/Wut/Streit: 1) · reiz 0–2
format        z. B. ["spiel","gespraech"], ["rollenspiel"], ["malen"], ["bewegung"], ["karten"], ["denkmodell"]
material      Schlüssel aus inhalte/material.json (stifte, buntstifte, karten, becher, ball, sanduhr, spiegel, knete, tuch,
              mappe …) – nur, was wirklich gebraucht wird; [] wenn nichts
ort           "raum"
werkzeug      { "de": "…", "fr": "…" }  das Werkzeug der Sitzung in einem Satz (≤ 90 Zeichen)
uebertragbar  true
qualitaet     "geprueft"
linie         { "id": "kurs-…", "nr": 1–6, "faden": { "de": "…", "fr": "…" } }  (faden in allen Sitzungen gleich)
imSpiel       { "de": "…", "fr": "…" }  1–2 Sätze: wie das Werkzeug mitten in einem Spiel kurz geübt wird
zugang        siehe Tabelle
fr            { "titel", "text", "sagen", "wennEsKippt" }  natürliches Französisch (Schule in Luxemburg), keine Wort-für-Wort-
              Übersetzung; die Fachkraft heißt „l’adulte“
uebungsblatt  { "titel": { "de", "fr" }, "de": [Bausteine], "fr": [Bausteine], "anleitung": { "de": { "text", "sagen",
              "wennEsKippt" }, "fr": { … } } }
```

**Kurs-Rituale** (zwei je Kurs, Vorbild `r:kurs-gefuehle-7-9-gruss` und `r:kurs-gefuehle-7-9-heft`): `id` `r:kurs-…-<name>`,
`kurs` = Linie, `quelle` `{ "art": "ritual", "titel": "Einzelkurs <Name>" }`, `rolle` `["ankommen"]` bzw. `["abschluss"]`,
`thema` `[]`, `eldib` `[]`, `kompetenz` `[]`, `dauer` `{1,2,3}` bzw. `{1,3,4}`, `ohneZiel: true`, `fr` vollständig. Jedes
Mal gleich, freiwillig, 1–3 Minuten, mit der Leitfigur verbunden; das Abschluss-Ritual legt das Blatt in eine **Kursmappe**
(Material `mappe`) und macht den Fortschritt sichtbar (z. B. ein Feld auf dem Umschlag ausmalen).

## 4. Das Blatt

- **Kopf:** `spalten` (2:1) – links ein `info`-Kasten mit dem Leitmodell (alle Teile, der heutige hervorgehoben im Text), darunter
  ein kurzer `text`; rechts das Bild der Leitfigur (`bild`, Größe `m`, mit Bildunterschrift).
- **2–4 Aufgaben** (`aufgabe` + Baustein), von gemeinsam zu allein, vom Beispiel zum eigenen Leben. Abwechslungsreiche Bausteine,
  passend zur Aufgabe: `gefuehle`, `comic` (Figuren mit Denk-/Sprechblasen), `bilder`, `karten`, `zuordnen`, `ankreuzen`,
  `skala`, `thermometer`, `ampel`, `vulkan`, `eisberg`, `koerper`, `waage`, `leiter`, `schritte`, `wennDann`, `dialog`,
  `satzanfaenge`, `tabelle`, `mindmap`, `hand`, `zielscheibe`, `batterie`, `glaeser`, `atmen`, `feld` (zeichnen), `minibuch`,
  `schneiden_kleben`, `labyrinth`, `suchbild`, `zielkarte`, `vertrag`, `rueckblick` … Reine Schreiblinien nur, wo wirklich
  geschrieben wird.
- **Am Schluss:** das wachsende Modell (`schritte` mit `stil: "kette"` oder `"weg"`, `leiter`, `hand` …: „Mal aus, was du heute
  gefunden hast“) und der **Auftrag bis zum nächsten Mal** (eine kleine, machbare Beobachtung oder Handlung im Alltag).
  Sitzung 6: das ganze Modell, eine eigene Karte (`zielkarte`, `vertrag` oder `karten`) und eine Urkunde/ein Diplom-Satz.
- **Umfang:** 4–6 Jahre 1 Seite, sonst höchstens 2 Seiten (prüft `scripts/kurs-mappe.tsx`). Platzfresser: `feld` mit
  `zeichnen` (Höhe in mm; auf Kursblättern ab `hoehe: 32` ≈ 3 cm, ohne Angabe gut 4 cm), `minibuch` und `schneiden_kleben` (fast eine ganze Seite) – auf einem 1-Seiten-Blatt höchstens
  einer davon, das Minibuch gar nicht (das Ich-Buch entsteht aus den Blättern selbst und wird in Sitzung 6 gebunden).
- **Bilder nur aus dem Bestand:** `motiv:<name>` (Liste: `MOTIV_NAMEN` in `src/blatt/motive.ts`), `figur:<name>[:<gefühl>[:<pose>]]`
  mit Namen mia, noah, lea, sami, amira, tom, jana, ben (Gefühle wie bei `gefuehle`, Posen stehen, winken, verschraenkt,
  zeigen, jubeln, melden, stopp, haende-gesicht, geben), `gesicht:<gefühl>`, `icon:<name>` (`src/blatt/bilder/icons.json`).
  Kinderfiguren auf Jugendblättern sparsam (Jugend-Gestaltung: ruhig, sachlich).
- **Anleitung** (`uebungsblatt.anleitung`): welche Aufgabe gemeinsam, welche allein, was die Fachkraft fragt (`sagen`), was hilft,
  wenn Schreiben oder Lesen schwerfällt (`wennEsKippt`).
- Keine Codes, Testkürzel, „Sitzung 3“, „Einheit“, „Modul“ auf dem Kinderblatt; Nummer der Spur/Stufe des Modells ist gut.
- **Das Modell wächst sichtbar (Lektorat 16.10.):** In `schritte` (Kette/Weg) ist nur der Schritt von heute getönt – mit
  `"heute": true` oder „heute“/« aujourd’hui » im Titel; die anderen bleiben weiß. In der `leiter` ist die Sprosse „Heute: …“
  hervorgehoben. Wachsende Motive: `motiv:ampel-aus`, `ampel-rot`, `ampel-gelb`, `ampel-gruen` (nur ein Licht an),
  `motiv:bruecke-1` … `bruecke-5` (so viele Abschnitte gebaut), `batterie-leer`/`batterie-voll`, `schildkroete-panzer`.
- **Höchstens 4–5 Aufgaben** je Blatt (die Blattphase dauert 6–8 Minuten); der Modell-Kasten oben höchstens ein Fünftel der Seite.
- **Auftrag nachfragen:** Den Auftrag vom letzten Blatt fragt der Planer am Anfang jeder Kurs-Sitzung selbst nach (wörtlich vom
  Blatt). Darum nicht in `text` oder `sagen` schreiben; das Blatt endet aber immer mit einem klaren kleinen Auftrag.
- **Hintergrund für die Fachkraft:** je Kurs in `src/data/passgenau/kurs-hintergrund.json` (warum es wirkt, Achtung, Quellen;
  DE und FR) – steht auf dem Deckblatt der Kurs-Mappe.

## 5. Fachliche Leitplanken

- Wirksam und belegt statt Mode: Emotionserkennung über Hinweise (Gesicht, Körper, Situation – PATHS, Second Step);
  Selbstkontrolle über Stopp – Beruhigen – Nachdenken – Handeln (Schildkröten-Technik, Ampel, Selbstinstruktion nach
  Meichenbaum); **keine Katharsis** (kein Kissenboxen, kein „Wut rauslassen“ durch Schlagen); Angst über gestufte Annäherung
  (Mut-Leiter), nicht über Vermeiden; Gedanken prüfen statt „positiv denken“; Stärken immer mit Beleg; soziale Fertigkeiten
  über Modell, Rollenspiel, Rückmeldung und Übertragung; keine Lernstil-Mythen („visueller Lerntyp“) – stattdessen Abrufen,
  Verteilen, Planen.
- Schonend: nichts aus der Familie ausfragen, keine Traumata bearbeiten, keine Bloßstellung; eigene Beispiele des Kindes nur
  freiwillig, Beispiele der Figuren gehen immer. Für Jugendliche respektvoll und sachlich, nie verniedlichend.
- Gleichberechtigt: Figuren verschiedener Herkunft und Geschlechter; keine Klischees.

## 6. Stolperfallen

- **Kinderblatt:** spricht das Kind direkt an („Kreis ein …“, „Wir spielen …“, „Ich sage dir ein Gefühl“) – nie „die Fachkraft“
  (Fachsprache). Auf Französisch geht „l’adulte“.
- **Wörter, bei denen der Planer eine Sitzung weglässt** (Schutzfilter für Einzelstunden, `src/passgenau/kern/einzel.ts`; für
  Kurs-Sitzungen gelockert: Orte wie Schulhof oder Spielplatz, „bis zum nächsten Mal“-Aufträge und Prüfungen als Anlass sind dort
  erlaubt – die Liste gilt aber für Rituale und bleibt eine gute Richtschnur):
  „Prüfung“/„examen“ (gilt als Prüfungsangst-Thema), „jeden Tag“, „täglich“, „die ganze Woche“, „zu Hause ausprobieren“,
  „bis zur nächsten Stunde“, „heute Abend“, „chaque jour“, „à la maison“, „ce soir“ (mehrtägig), „draußen“, „Spielplatz“, „Hof“ als Ort der Übung/„dehors“ (Ort),
  „Film“; ab 12 Jahren kindliche Wörter wie „Sticker“, „Stempel“, „Smiley“, „Handpuppe“, „Kuscheltier“. Statt „bis zur
  nächsten Stunde“: „bis zum nächsten Mal“; statt „zu Hause ausprobieren“: „diese Woche ausprobieren“.
- **Vorsicht-Filter gelten weiter:** Sitzungen, die nach Familie, Körperbild oder Trauer fragen, fallen bei Kindern mit dieser
  Vorsicht weg – darum Beispiele aus Schule, Pause, Spiel und Verein.
- `scripts/kurs-mappe.tsx` nennt den Grund, wenn eine Sitzung nicht kommt („ausgeschlossen: …“).

## 7. Arbeitsweise und Prüfung

Bis 5 Jahre plant Passgenau sonst ohne Blatt – in einer Kurs-Folge gehört das Blatt dazu (auch bei Fünfjährigen).

1. Kurs-Datei schreiben (alle Sitzungen und Varianten, zwei Rituale, DE und FR).
2. `npm run -s passgenau:pruefen` – keine Fehler.
3. `npx tsx --tsconfig tsconfig.scripts.json scripts/kurs-mappe.tsx <linie> tmp/kurs-mappe --blaetter` – alle Sitzungen ✓,
   Blätter im Umfang; die Bilder in `tmp/kurs-mappe/blaetter/` ansehen (mindestens je Variante Sitzung 1 und 6 auf Deutsch und
   eine auf Französisch) und nachbessern: zu voll, zu leer, Seitenumbruch, Bild fehlt?

## 8. Katalog (32 Kurse)

Codes: Hauptziel(e) mit Gewicht 1, weitere mit 0.5 – in allen Sitzungen eines Kurses gleich. Die Titel der Sitzungen sind
Vorschläge; Reihenfolge und Bogen gelten.

| Linie | Kurs | Leitfigur / Leitmodell | ELDiB | Kompetenz · Thema | Sitzungen |
|---|---|---|---|---|---|
| kurs-gefuehle-4-6 | Igel Ivo zeigt Gefühle | Igel Ivo (`motiv:igel`), das Gefühle-Haus mit vier Fenstern | K-21 1, K-26 1, K-16 .5, K-13 .5 | gefuehle-erkennen · gefuehle | 1 froh und traurig im Gesicht · 2 wütend und ängstlich · 3 Gefühle im Bauch und in den Händen · 4 Was ist passiert? · 5 Ich zeige und sage, wie es mir geht · 6 Ivos Gefühle-Fest |
| kurs-gefuehle-7-9 | Gefühls-Detektive | Eule Oli (`motiv:eule`), Gefühls-Lupe mit drei Spuren + das genaue Wort | K-21 1, K-26 .5 | gefuehle-erkennen · gefuehle | 1 Spur 1: das Gesicht (fertig) · 2 Spur 2: der Körper · 3 Spur 3: Was ist passiert? · 4 Das genaue Wort (wie stark?) · 5 Nachfragen: „Stimmt das?“ und eigene Gefühle sagen · 6 Detektiv-Prüfung und Diplom |
| kurs-gefuehle-10-12 | Der Gefühls-Kompass | Kompass (`motiv:kompass`) mit vier Richtungen: Wort · Körper · Gedanke · Sagen | K-26 1, K-21 1, K-23 .5, K-29 .5 | gefuehle-ausdruecken · gefuehle | 1 Mehr als gut und schlecht (Gefühlsrad) · 2 Körper und Stärke (Thermometer) · 3 Gedanke – Gefühl – Handlung · 4 Gefühle anderer lesen und nachfragen · 5 Gefühle sagen: Situation – Gefühl – Wunsch · 6 Mein Kompass |
| kurs-gefuehle-13-16 | Emotionen verstehen | Emotions-Radar: Signal · Körper · Bewertung · Ausdruck | SOZ-37 1, K-26 1, K-33 .5, K-23 .5 | gefuehle-erkennen · gefuehle | 1 Emotionen sind Signale · 2 Körper und Intensität · 3 Auslöser – Bewertung – Folge · 4 Gemischte Gefühle und was hinter Verhalten steckt · 5 Emotionen ausdrücken – direkt, fair, auch im Chat · 6 Mein Emotions-Profil |
| kurs-wut-4-6 | Die Schildkröte macht Pause | Schildkröte (`motiv:schildkroete`, `motiv:schildkroete-panzer`): Stopp – Panzer – Atmen – Rauskommen und sagen | V-20 1, V-21 .5, K-16 .5, SOZ-14 .5 | impulskontrolle · wut | 1 Die Schildkröte kennenlernen · 2 Wut im Körper spüren · 3 Im Panzer ruhig atmen · 4 Rauskommen und sagen, was los ist · 5 Ideen statt Hauen · 6 Schildkröten-Fest |
| kurs-wut-7-9 | Mein Ampel-Plan | Ampel (`motiv:ampel`): Rot stopp und abkühlen · Gelb denken · Grün tun | V-20 1, V-21 1, V-18 .5, V-25 .5 | impulskontrolle · wut | 1 Wut ist okay – Hauen nicht (Vulkan) · 2 Frühwarnzeichen im Körper · 3 Rot: Stopp und abkühlen · 4 Gelb: Was kann ich tun? · 5 Grün: ausprobieren und Hilfe holen · 6 Mein Ampel-Plan |
| kurs-wut-10-12 | Cool bleiben – der Wut-Werkzeugkasten | Werkzeugkiste (`motiv:werkzeugkiste`) und Wut-Thermometer | V-26 1, V-25 1, V-22 .5, V-21 .5 | impulskontrolle · wut | 1 Mein Wut-Thermometer · 2 Auslöser und Knöpfe · 3 Gedanken, die anheizen oder abkühlen · 4 Abkühl-Werkzeuge testen · 5 Wenn mich jemand reizt · 6 Mein Werkzeugkasten |
| kurs-wut-13-16 | Ärger im Griff | Ärger-Kurve (`kurve`): Anstieg – Gipfel – Abstieg, mit Ausstiegen | V-26 1, V-27 .5, K-31 .5, V-29 .5 | impulskontrolle · wut | 1 Die Ärger-Kurve · 2 Trigger und Frühwarnzeichen · 3 Denkfallen prüfen · 4 Ausstiege: Pause, Atmen, Ortswechsel · 5 Ärger sagen ohne Eskalation – auch online · 6 Mein Plan für heiße Momente |
| kurs-freundschaft-4-6 | Hallo, spielst du mit? | Hase Hoppel (`motiv:hase`) und die Freunde-Blume (Blütenblätter) | SOZ-15 1, SOZ-17 1, K-14 .5, SOZ-16 .5 | kommunikation · freundschaft | 1 Hallo sagen · 2 Fragen: Darf ich mitspielen? · 3 Abwechseln im Spiel · 4 Ein Nein – und etwas anderes probieren · 5 Freundlich sein: helfen und trösten · 6 Freunde-Fest |
| kurs-freundschaft-7-9 | Die Freundschafts-Brücke | Brücke (`motiv:bruecke`) mit fünf Planken | SOZ-15 1, K-27 1, K-20 .5, K-28 .5 | kommunikation · freundschaft | 1 Was ist ein guter Freund? · 2 Ins Spiel kommen · 3 Fragen und zuhören · 4 Nett sein: loben und helfen · 5 Wenn es knirscht: wieder gut machen · 6 Meine Brücke |
| kurs-freundschaft-10-12 | Freundschafts-Werkstatt | Werkstatt mit fünf Werkzeugen (`icon:tools`) und Freundschafts-Kreise | K-27 1, K-28 1, SOZ-33 .5, SOZ-32 .5 | kommunikation · freundschaft | 1 Meine Freundschafts-Kreise · 2 Ein Gespräch beginnen und weiterführen · 3 Interesse zeigen · 4 Einladen und Absagen aushalten · 5 Streit unter Freunden und Gruppendruck · 6 Mein Freundschaftsplan |
| kurs-freundschaft-13-16 | Beziehungen gestalten | Beziehungs-Kompass: Kontakt · Zuhören · Grenzen · Pflege | SOZ-41 1, K-35 1, K-32 .5, SOZ-33 .5 | kommunikation · freundschaft | 1 Mein Netzwerk · 2 Kontakt aufnehmen · 3 Zuhören und nachfragen · 4 Grenzen und Vertrauen – auch online · 5 Beziehungen pflegen und reparieren · 6 Mein Beziehungs-Kompass |
| kurs-streit-4-6 | Teilen, warten, abwechseln | Zwei Becher und die Sanduhr (`motiv:teilen`, `icon:hourglass`) | SOZ-16 1, SOZ-19 1, SOZ-18 .5, V-10 .5 | kooperation · freundschaft | 1 Mein und dein: fragen statt nehmen · 2 Abwechseln mit der Sanduhr · 3 Teilen · 4 Stopp sagen · 5 Hilfe holen · 6 Wir vertragen uns |
| kurs-streit-7-9 | Die Friedens-Treppe | Treppe (`leiter`/`schritte`) mit sechs Stufen: Stopp · Erzählen · Gefühl · Ideen · Einigen · Frieden | V-18 1, SOZ-21 1, SOZ-23 .5, V-28 .5 | konflikte · freundschaft | 1 Stopp und durchatmen · 2 Erzählen, was passiert ist · 3 Gefühle sagen · 4 Ideen sammeln · 5 Sich einigen · 6 Meine Friedens-Treppe |
| kurs-streit-10-12 | Konflikt-Lotsen | Waage (`motiv:waage`): fair für beide | V-28 1, SOZ-34 1, SOZ-32 .5, V-27 .5 | konflikte · regeln | 1 Konflikte gehören dazu · 2 Beide Seiten sehen · 3 Ich-Botschaften statt Vorwürfe · 4 Lösungen sammeln und prüfen · 5 Entschuldigen und wiedergutmachen · 6 Mein Lösungs-Fahrplan |
| kurs-streit-13-16 | Konflikte klären | Eisberg (`eisberg`): Positionen oben, Interessen unten | K-31 1, V-33 1, SOZ-38 .5, V-27 .5 | konflikte · regeln | 1 Wie Konflikte eskalieren · 2 Interessen hinter Positionen · 3 Zuhören und spiegeln · 4 Verhandeln · 5 Versöhnen und Verantwortung übernehmen · 6 Mein Konflikt-Kompass |
| kurs-selbstwert-4-6 | Das bin ich! | Spiegel (`motiv:spiegel`) und das Ich-Buch (jedes Blatt eine Seite, Sitzung 6 bindet es) | K-13 1, V-14 1, K-18 .5 | selbstbild · selbstwert | 1 Mein Name, mein Gesicht · 2 Das mag ich · 3 Das kann ich schon · 4 Ich bin stolz · 5 Ich helfe – ich bin wichtig · 6 Mein Ich-Buch |
| kurs-selbstwert-7-9 | Mein Stärken-Schatz | Schatzkiste (`icon:gift`) mit Stärken-Edelsteinen | K-19 1, K-18 1, K-24 .5 | selbstbild · selbstwert | 1 Stärken entdecken · 2 Was ich gut kann – mit Beispiel · 3 Was andere an mir mögen · 4 Fehler gehören dazu: noch nicht! · 5 Stolz sein dürfen · 6 Meine Schatzkiste |
| kurs-selbstwert-10-12 | Mein Stärken-Turm | Turm aus Bausteinen (`icon:tower`) | K-19 1, K-24 1, V-22 .5, K-28 .5 | selbstbild · selbstwert | 1 Stärken mit Beweis · 2 Stärken anderer sehen und sagen · 3 Fortschritt sichtbar machen · 4 Die innere Stimme: kritisch oder fair · 5 Rückschläge und mein Lernweg · 6 Mein Stärken-Turm |
| kurs-selbstwert-13-16 | Wer bin ich? | Selbstbild-Fenster: wie ich mich sehe · wie andere mich sehen · was mir wichtig ist · wohin ich will | SOZ-40 1, K-34 1, SOZ-39 .5, K-24 .5 | selbstbild · selbstwert | 1 Selbstbild und Fremdbild · 2 Stärken mit Belegen · 3 Meine Werte · 4 Der innere Kritiker und ein fairer Blick · 5 Ziele, die zu mir passen · 6 Mein Profil |
| kurs-mut-4-6 | Leo, der kleine Löwe | Löwe Leo (`motiv:loewe`) und die Mut-Medaille | V-13 1, V-24 .5, V-12 .5 | selbstregulation · angst | 1 Was macht mir Angst? · 2 Mutig sein heißt: es trotzdem probieren · 3 Mut-Atmen und Mut-Satz · 4 Wenn sich etwas ändert · 5 Etwas Neues ausprobieren · 6 Leos Mut-Medaille |
| kurs-mut-7-9 | Der Mut-Rucksack | Rucksack (`motiv:rucksack`) mit fünf Mut-Sachen | V-24 1, V-23 1, K-26 .5 | selbstregulation · angst | 1 Angst ist ein Alarm · 2 Angst im Körper – und beruhigen · 3 Mut-Gedanken · 4 Stufe für Stufe · 5 Wenn sich Pläne ändern · 6 Mein Mut-Rucksack |
| kurs-mut-10-12 | Mut-Training | Mut-Leiter (`leiter`) und Alarmanlage | V-24 1, V-23 1, K-29 .5 | selbstregulation · angst | 1 Angst verstehen · 2 Sorgen-Gedanken prüfen · 3 Beruhigen: Atmen und Sinne · 4 Meine Mut-Leiter · 5 Veränderungen meistern · 6 Mein Mut-Plan |
| kurs-mut-13-16 | Druck und Unsicherheit | Kontroll-Kreise und Stress-Kurve | V-24 1, V-23 1, V-29 .5 | selbstregulation · angst | 1 Stress und Angst: Signal, nicht Gegner · 2 Den Körper runterfahren · 3 Katastrophen-Gedanken prüfen · 4 Annähern statt vermeiden · 5 Was ich beeinflussen kann · 6 Mein Stress-Plan |
| kurs-fokus-4-6 | Fuchs Fino passt auf | Fuchs Fino (`motiv:fuchs`): Augen auf · Ohren auf · stille Hände · fertig! | V-11 1, V-15 .5, KOG-24 .5 | aufmerksamkeit · aufmerksamkeit | 1 Genau hinschauen · 2 Genau hinhören · 3 Still wie eine Statue · 4 Eins nach dem anderen · 5 Bis zum Ziel · 6 Finos Fuchs-Diplom |
| kurs-fokus-7-9 | Das Fokus-Fernglas | Fernglas (`icon:eyeglass`/`motiv:lupe`) und drei Fragen: Was soll ich tun? Wie? Fertig? | V-15 1, V-21 .5, V-11 .5 | aufmerksamkeit · aufmerksamkeit | 1 Mein Fokus-Fernglas · 2 Ablenkungen erkennen · 3 Drei Fragen an mich · 4 Dranbleiben in Etappen · 5 Pause machen und zurückkommen · 6 Mein Fokus-Plan |
| kurs-fokus-10-12 | Der Lern-Werkzeugkasten | Werkzeugkiste (`motiv:werkzeugkiste`) mit fünf Lern-Werkzeugen | V-15 1, V-22 .5, K-24 .5 | lernstrategien · lernen | 1 Was beim Lernen wirklich hilft · 2 Ablenkungen managen · 3 Große Aufgaben zerlegen · 4 Abfragen statt nur lesen · 5 Dranbleiben und Fehler nutzen · 6 Mein Lernplan |
| kurs-fokus-13-16 | Fokus und Selbstorganisation | Mein System: Planen · Fokus · Lernen · Durchhalten | V-29 1, V-32 1, KOG-62 .5 | lernstrategien · lernen | 1 Aufmerksamkeit ist begrenzt · 2 Digitale Ablenkung · 3 Planen: rückwärts und mit Prioritäten · 4 Lernen, das hält · 5 Aufschieben überlisten · 6 Mein System |
| kurs-zusammen-4-6 | Wir spielen zusammen | Bauklötze-Turm, zu dem jedes Mal ein Stein kommt (`icon:tower`) | SOZ-18 1, SOZ-17 1, V-9 .5, SOZ-14 .5 | kooperation · regeln | 1 Spielregeln · 2 Warten, bis ich dran bin · 3 Zusammen bauen · 4 Verlieren ist okay · 5 Zusammen aufräumen und helfen · 6 Unser Wir-Fest |
| kurs-zusammen-7-9 | Regel-Profis | Regel-Profi-Ausweis mit fünf Stempeln | SOZ-27 1, V-17 1, V-16 .5, SOZ-20 .5 | kooperation · regeln | 1 Warum gibt es Regeln? · 2 Regeln und ihre Gründe · 3 Fair spielen: gewinnen und verlieren · 4 Abmachungen treffen · 5 Freundlich erinnern statt petzen · 6 Unser Regel-Vertrag |
| kurs-zusammen-10-12 | Team-Player | Team-Puzzle (`icon:puzzle`) | V-27 1, SOZ-32 1, K-28 .5, SOZ-30 .5 | kooperation · regeln | 1 Was macht ein Team stark? · 2 Rollen im Team · 3 Ideen einbringen und annehmen · 4 Absprachen und Verantwortung · 5 Wenn im Team etwas schiefgeht · 6 Mein Beitrag fürs Team |
| kurs-zusammen-13-16 | Rollen, Regeln, Verantwortung | Gruppen-Landkarte: meine Rolle · Regeln · Verantwortung · Haltung | V-30 1, V-31 1, SOZ-38 .5 | kooperation · regeln | 1 Meine Rolle in Gruppen · 2 Regeln und Fairness · 3 Verantwortung übernehmen · 4 Gruppendruck und eigene Haltung · 5 Mitbestimmen · 6 Mein Platz in der Gruppe |
