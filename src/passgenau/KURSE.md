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
- **Tausch-Übungen** (Abschnitt 4a): je Sitzung zwei weitere Kern-Übungen mit anderer Methode. Der Planer nimmt sie nie von
  selbst; die Fachkraft wählt sie unter „Andere Übung“ (gleich nach der anderen Variante). Blatt, Anleitung und Auftrag
  bleiben die der Variante (`PlanSchritt.blattVon`).

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
  – Kinder mia, noah, lea, sami, amira, tom; Jugendliche (ab 10) jana, ben, lina, yusuf, chloe, nele (Rollstuhl), finn
  (Hörgerät); Erwachsene lehrerin, lehrer, mutter, vater, verkaeuferin, arzthelferin, chef (Gefühle wie bei `gefuehle`,
  Posen stehen, winken, verschraenkt, zeigen, jubeln, melden, stopp, haende-gesicht, geben, handy, sitzen, gehen,
  nachdenken, abwenden) –, `szene:<name>` (pausenhof, klassenzimmer, bus, kueche, kinderzimmer, park, flur, kantine,
  umkleide, chat), `gesicht:<gefühl>`, `icon:<name>` (`src/blatt/bilder/icons.json`). Wachsende Motive: `turm-1` … `-5`,
  `blume-1` … `-5`, `rucksack-1` … `-5`, `insel-1` … `-5`, `werkzeugkiste-1` … `-5`, `bruecke-1` … `-5`, `kresse-1` … `-3`.
  Weitere wachsende Motive (`src/blatt/motive-neu-wachsend2.ts`; Stufe n = n Teile, fehlende gestrichelt): `schutzschild-1` … `-5` (Wappen, auch ab 13), `stopp-hand-1` … `-6`, `zebra-1` … `-6`, `rakete-1` … `-5`, `schluesselbund-1` … `-5`, `tagesuhr-1` … `-5`; dazu `uhr-ziffern` (Uhr mit 12/3/6/9), `turm-umgefallen` (zu `turm-1` … `-5`) und `platzhalter` (leerer gestrichelter Kreis für Ketten, statt Fragezeichen).
  Kinderfiguren auf Jugendblättern sparsam (Jugend-Gestaltung: ruhig, sachlich); Einzelheiten in `src/blatt/BLATT-STIL.md` §4.
- **Anleitung** (`uebungsblatt.anleitung`): welche Aufgabe gemeinsam, welche allein, was die Fachkraft fragt (`sagen`), was hilft,
  wenn Schreiben oder Lesen schwerfällt (`wennEsKippt`).
- Keine Codes, Testkürzel, „Sitzung 3“, „Einheit“, „Modul“ auf dem Kinderblatt; Nummer der Spur/Stufe des Modells ist gut.
- **Das Modell wächst sichtbar (Lektorat 16.10.):** In `schritte` (Kette/Weg) und in `bilder` (auch `klein`) ist nur der Schritt von heute getönt – mit
  `"heute": true` oder „heute“/« aujourd’hui » im Titel; die anderen bleiben weiß. In der `leiter` ist die Sprosse „Heute: …“
  hervorgehoben. Wachsende Motive: `motiv:ampel-aus`, `ampel-rot`, `ampel-gelb`, `ampel-gruen` (nur ein Licht an),
  `motiv:bruecke-1` … `bruecke-5` (so viele Abschnitte gebaut), `batterie-leer`/`batterie-voll`, `schildkroete-panzer`.
- **Höchstens 4–5 Aufgaben** je Blatt (die Blattphase dauert 6–8 Minuten); der Modell-Kasten oben höchstens ein Fünftel der Seite.
- **Auftrag nachfragen:** Den Auftrag vom letzten Blatt fragt der Planer am Anfang jeder Kurs-Sitzung selbst nach (wörtlich vom
  Blatt). Darum nicht in `text` oder `sagen` schreiben; das Blatt endet aber immer mit einem klaren kleinen Auftrag.
- **Hintergrund für die Fachkraft:** je Kurs in `src/data/passgenau/kurs-hintergrund.json` (warum es wirkt, Achtung, Quellen;
  DE und FR) – steht auf dem Deckblatt der Kurs-Mappe.

## 4a. Tausch-Übungen (austauschbare Bausteine)

Je Sitzung **zwei Tausch-Übungen** (`-t1`, `-t2`): dieselbe Sitzung – dasselbe Werkzeug, dieselbe Leitfigur, derselbe
rote Faden, dieselben Begriffe und Beispielfiguren –, aber mit einer **anderen Methode**. Wofür: ein Kind, dem die Methode
der Variante nicht liegt (mag kein Rollenspiel, braucht Bewegung, ist heute müde), eine zweite Runde derselben Sitzung oder
einfach Abwechslung. Das Blatt der Variante bleibt: Was auf dem Blatt vorkommt (Begriffe, Beispiele, Figuren, Skala), muss
auch in der Tausch-Übung vorkommen, damit das Blatt danach genauso passt. Vorbild: `ki:kurs-gefuehle-7-9-s2-t1` (Statuen-Rätsel
statt Pantomime hinter dem Blatt) und `-s2-t2` (Hinweis-Karten sortieren).

```
id            "ki:kurs-<thema>-<von>-<bis>-s<nr>-t1" bzw. "-t2"
tausch        true            · kein uebungsblatt
gleich wie -a quelle, rolle, bogen, thema, eldib, kompetenz, alter, dauer, sozialform, einzeltauglich, werkzeug, uebertragbar,
              qualitaet, linie (id, nr, faden), ort  (tmp/auftraege/tausch-einfuegen.py übernimmt sie aus -a)
titel         derselbe Anfang wie die Variante („Spur 2: …“, „Werkzeug 3: …“), dann der Name der Methode („Das Statuen-Rätsel“)
text          4–7 Sätze, nur der Kern: der erste Satz knüpft wie in der Variante an die letzte Sitzung an; dann die Methode
              Schritt für Schritt, mit Rollentausch, und zum Schluss derselbe Merksatz wie in der Variante. Nie „Blatt“ im
              Sinn von Arbeitsblatt (der Planer hält die Übung sonst für einen Blattverweis und lässt sie weg). Ebenso
              verboten: „Fallkarte(n)“ (→ „Situationskarten“), „Vorlage“, „Laufzettel“, „Mission(en)“ und Nummern wie
              „Station 1“, „Schritt 2“, „Teil 3“, „Aufgabe 1“ („Spur 2“, „Stufe 3“, „Werkzeug 4“ sind erlaubt).
sagen         2–4 wörtliche Sätze · wennEsKippt 1–3 Sätze · imSpiel { de, fr } · fr { titel, text, sagen, wennEsKippt }
format        mindestens ein Format, das keine Variante der Sitzung hat; t1 und t2 unterscheiden sich auch untereinander
              (z. B. t1 bewegt – Spiel, Bewegung, Statuen, Ball –, t2 ruhig – Karten, Malen, Bauen, Figuren, Gespräch)
material      nur aus inhalte/material.json, nur Alltägliches (papier, stifte, karten, ball, wuerfel, becher, knete, bausteine …)
zugang        was die Methode verlangt: meist { lesen: 0, schreiben: 0, bild: 2 } (passt für alle Kinder); Situationskarten mit Text
              für Ältere { lesen: 1, schreiben: 0, bild: 1 }
energie, belastung, reiz   wie es die Methode verlangt (Bewegung: energie 3, reiz 1)
```

**Methoden-Vorrat** (je nach Alter): Statuen und Pantomime · Bewegungsspiel (Ball zuwerfen mit Frage, Würfel, Laufen zu
Ecken des Raums, Aufstellen auf einer Skala am Boden) · Karten ziehen, sortieren, legen · Figuren oder Handpuppe spielen
(bis 9 Jahre) · Bauen mit Bausteinen oder Knete · Malen, Zeichnen am Tisch · Suchspiel im Raum · Geschichte weitererzählen
(die Fachkraft beginnt, das Kind entscheidet, wie es weitergeht) · Quiz, Schätzspiel, „Stimmt’s oder stimmt’s nicht?“ ·
kleines Experiment (Sanduhr, Becher, Stoppuhr) · ab 10: Situationskarten, Chat-Verläufe umschreiben, Interview, Rangliste,
Pro-und-Contra, Rolle tauschen („Du bist jetzt die Beraterin“).
**Vielfalt im Kurs:** höchstens 2 der 12 Tausch-Übungen eines Kurses als Lauf-Spiel zu Ecken, Zetteln oder Stationen am
Boden; je Kurs mindestens 6 verschiedene Methodenfamilien aus dem Vorrat. `text` höchstens etwa 950 Zeichen (4–7 klare Sätze,
keine Semikolon-Ketten), Vorbereitung höchstens 2 Minuten, Bewegung auch in einem kleinen Raum möglich (`wennEsKippt` nennt
eine ruhige Form im Sitzen).
Alles bleibt für die Einzelstunde (Fachkraft als Spielpartner), schonend (eigene Beispiele freiwillig) und ohne Katharsis.
Prüfregel 29 (`npm run -s passgenau:pruefen`) prüft die Felder; `passgenau:test` prüft, dass Blatt, Anleitung und Auftrag
beim Tausch bleiben.

**Schonende Tausch-Übung `-t3`** (17.10.2026): Steht im Profil ein heikles Thema (Kinderschutz, Krise, belastende
Erfahrungen), nimmt der Planer keine Übung mit `belastung` ≥ 1. Haben alle Varianten und t1/t2 einer Sitzung belastung 1, gibt
es eine dritte Tausch-Übung `-t3` mit **belastung 0, reiz 0**: dasselbe Werkzeug und Blatt, aber nichts Eigenes – alles über
die Figuren des Kurses und ausgedachte Situationen. Übertragen (Sitzung 5) bleibt, nach vorn gerichtet: drei harmlose
Schul-Situationen zur Wahl, geplant für die Figur („jemand wie du“ nur, wenn das Kind will). Der Planer nimmt t3 dann von
selbst (Warum: „Eine schonendere Übung …“), und die Blatt-Anleitung bekommt den Satz „Fragt das Blatt nach dem Kind selbst,
darf es für die Figur oder die ausgedachte Situation antworten“. Jede Kurs-Sitzung hat so eine schonende Fassung; prüfen mit
`tmp/auftraege/schonend-pruefen.tsx <linie> …` (mit `KRISE=1` zusätzlich belastende Erfahrungen – dort fallen Übungen, die
Gefühle abfragen oder Leistung prüfen, mit Absicht weg).

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
4. Tausch-Übungen schreiben (je Sitzung zwei, Abschnitt 4a) – als JSON-Array nur mit den eigenen Feldern und mit
   `python3 tmp/auftraege/tausch-einfuegen.py <linie> <datei.json>` einfügen; `python3 tmp/auftraege/kurs-kompakt.py <linie>`
   zeigt den Kurs kompakt (Varianten, Werkzeug, Blatt in Stichworten).
5. Hintergrund für die Fachkraft in `kurs-hintergrund.json` (Prüfregel 28).

## 8. Katalog (54 Kurse)

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

**Neu (Oktober 2026): sechs Themen für Lücken im Katalog** – Ziele, die noch kein Kurs als Hauptziel übte (ELDiB SOZ-26,
K-12, K-25, K-29, SOZ-36, KOG-61, K-20, KOG-38, SOZ-31, SOZ-35, KOG-55, KOG-45, KOG-62, KOG-58, K-9, K-11, K-15, SOZ-24,
K-17, K-30), und die Module des Skills-Kurses, die es als Einzelkurs noch nicht gab (Kommunikation & Grenzen, Resilienz
und Hilfe, Entscheidungen, Vielfalt und Respekt, Selbstständig werden, Digitale Welt, Meinung und Mitbestimmung).

| Linie | Kurs | Leitfigur / Leitmodell | ELDiB | Kompetenz · Thema | Sitzungen |
|---|---|---|---|---|---|
| kurs-grenzen-4-6 | Pinguin Pia sagt Stopp | Pinguin Pia (`motiv:pinguin`) und die Stopp-Hand (`motiv:stopp-hand`): Ja-Gefühl · Nein-Gefühl · Stopp! · Hilfe holen | K-12 1, SOZ-26 .5, K-16 .5 | kommunikation · mobbing | 1 Ja-Gefühl und Nein-Gefühl · 2 Das gehört mir: mein Körper, meine Sachen · 3 Laut und klar Stopp sagen · 4 Stopp gilt für alle: ein Stopp hören · 5 Hilfe holen: Wem sage ich es? · 6 Pias Stopp-Fest |
| kurs-grenzen-7-9 | Mein Schutzschild | Schutzschild (`motiv:schutzschild`) mit fünf Feldern: Bauchgefühl · Grenze · Nein · Geheimnis-Regel · Hilfe-Hand | SOZ-26 1, K-12 1, V-18 .5, K-26 .5 | kommunikation · mobbing | 1 Das Bauchgefühl: Ja oder Nein? · 2 Meine Grenzen und deine Grenzen · 3 Nein sagen mit Stimme, Körper und Worten · 4 Gute und schlechte Geheimnisse – Hilfe holen ist kein Petzen · 5 Meine Hilfe-Hand: wem, wann, welcher Satz · 6 Mein Schutzschild |
| kurs-grenzen-10-12 | Klar statt Schnecke oder Drache | Drei Arten zu reagieren: Schnecke (`motiv:schnecke`, zieht sich zurück) · Drache (`motiv:drache`, greift an) · klar (aufrechte Figur) – jede Sitzung ein Klar-Werkzeug | SOZ-26 1, K-25 .5, V-26 .5, SOZ-32 .5 | kommunikation · mobbing | 1 Schnecke, Drache oder klar? · 2 Meine Grenzen spüren und benennen · 3 Nein sagen – und dabei bleiben · 4 Wenn die Gruppe Druck macht · 5 Mobbing erkennen: Hilfe holen für mich und für andere · 6 Mein Klar-Plan |
| kurs-grenzen-13-16 | Grenzen setzen, Druck widerstehen | Grenzen-Profil: meine Grenzen · klar kommunizieren · Druck standhalten · Hilfe holen und helfen | K-25 1, SOZ-39 1, SOZ-26 .5, V-26 .5 | kommunikation · mobbing | 1 Was sind meine Grenzen? · 2 Selbstsicher statt passiv oder aggressiv · 3 Nein unter Druck: Gruppe, Mutproben, Überreden · 4 Grenzen online: Fotos, Gruppenchats, Weiterleiten · 5 Hilfe holen und Zivilcourage · 6 Mein Grenzen-Profil |
| kurs-probleme-4-6 | Momo hat eine Idee | Affe Momo (`motiv:affe`) und die Ideen-Glühbirne (`motiv:gluehbirne`): Was ist los? · Wie fühlt sich jeder? · Noch eine Idee! · Was passiert dann? | V-18 1, K-29 .5, K-9 .5 | konflikte · freundschaft | 1 Was ist das Problem? · 2 Wie fühlt sich jeder? · 3 Noch eine Idee! · 4 Was passiert dann? · 5 Eine gute Idee ausprobieren · 6 Momos Ideen-Fest |
| kurs-probleme-7-9 | Die Ideen-Rakete | Rakete (`motiv:rakete`) mit Countdown 5 – 4 – 3 – 2 – 1: Problem · Ziel · Ideen · Prüfen · Start | K-29 1, V-18 .5, SOZ-36 .5 | konflikte · freundschaft | 1 Was ist das Problem? · 2 Was will ich erreichen? · 3 Viele Ideen sammeln · 4 Prüfen: sicher – fair – klappt es? · 5 Start: ein echtes Problem dieser Woche · 6 Meine Rakete hebt ab |
| kurs-probleme-10-12 | Problem-Knacker | Schlüsselbund (`motiv:schluessel`) mit fünf Schlüsseln: genau beschreiben · Ursachen · Ideen · abwägen · ausprobieren und auswerten | SOZ-36 1, K-29 1, V-28 .5, KOG-56 .5 | konflikte · freundschaft | 1 Das Problem genau beschreiben · 2 Was steckt dahinter? · 3 Ideen ohne Schere im Kopf · 4 Vor- und Nachteile abwägen · 5 Plan, ausprobieren, auswerten · 6 Mein Schlüsselbund |
| kurs-probleme-13-16 | Gute Entscheidungen | Entscheidungs-Werkzeug: Optionen · Folgen (10 – 10 – 10) · Risiko-Check · Werte · Plan B | KOG-61 1, SOZ-36 .5, KOG-58 .5, V-33 .5 | selbstregulation · – | 1 Wie ich entscheide: Bauch, Kopf, andere · 2 Mehr als zwei Möglichkeiten · 3 Folgen abschätzen: in 10 Minuten, 10 Wochen, 10 Monaten · 4 Riskant oder okay? · 5 Eine echte Entscheidung mit Plan B · 6 Mein Entscheidungs-Werkzeug |
| kurs-vielfalt-4-6 | Jedes Zebra ist anders | Zebra Zara (`motiv:zebra`): jedes Zebra hat eigene Streifen – jede Sitzung ein Streifen mehr | K-20 1, K-13 .5, SOZ-15 .5 | kooperation · regeln | 1 Ich und du: gleich und anders · 2 Was wir gern mögen · 3 Viele Sprachen: Moien, Bonjour, Hallo · 4 Jeder kann etwas – auf seine Art · 5 Mitspielen lassen: niemand bleibt allein · 6 Zaras Streifen-Fest |
| kurs-vielfalt-7-9 | Die Wir-Insel | Insel (`motiv:insel-1` … `insel-5`), auf der alle Platz haben – jede Sitzung kommt etwas dazu | KOG-38 1, K-20 1, SOZ-21 .5 | kooperation · regeln | 1 Gleich und verschieden · 2 Mit anderen Augen sehen · 3 Warum macht jemand das? · 4 Neugierig statt auslachen: Sprachen, Feste, Essen · 5 Wenn jemand ausgeschlossen wird: einladen und helfen · 6 Unsere Wir-Insel |
| kurs-vielfalt-10-12 | Mit anderen Augen | Perspektiv-Brille (`motiv:brille`): Identität · Schubladen · Perspektive · Worte · Zivilcourage | SOZ-31 1, SOZ-35 1, KOG-38 .5, SOZ-32 .5 | kooperation · regeln | 1 Was mich ausmacht – viele Teile · 2 Schubladen im Kopf · 3 Die Perspektive wechseln · 4 Worte, die verletzen – Worte, die respektieren · 5 Wenn jemand ausgegrenzt wird: was ich tun kann · 6 Mein Respekt-Versprechen |
| kurs-vielfalt-13-16 | Vielfalt und Respekt | Identitäts-Molekül: ich · meine Gruppen · Werte · Haltung · Handeln | SOZ-35 1, KOG-55 1, SOZ-31 .5, KOG-58 .5 | kooperation · regeln | 1 Identität: viele Teile · 2 Stereotype und Vorurteile – wie sie entstehen · 3 Werte: meine und die der anderen · 4 Sprache, Respekt und Hass im Netz · 5 Verbündete sein: Zivilcourage im Alltag · 6 Mein Standpunkt |
| kurs-alltag-4-6 | Kiki kann das schon | Küken Kiki (`motiv:ei` → `motiv:kueken`) und die Ich-kann-das-Leiter | V-15 1, KOG-31 .5, V-9 .5 | alltag · – | 1 Was ich schon allein kann · 2 Anziehen Schritt für Schritt · 3 Hände waschen und Zähne putzen · 4 Aufräumen: alles hat seinen Platz · 5 Fragen, wenn es nicht klappt · 6 Kikis Groß-Fest |
| kurs-alltag-7-9 | Meine Tages-Uhr | Uhr (`motiv:uhr`, `motiv:wecker`) mit fünf Feldern: Reihenfolge · Zeit · Morgen · Schultasche und Hausaufgaben · Woche | KOG-45 1, V-15 .5, V-29 .5 | alltag · – | 1 Mein Tag hat eine Reihenfolge · 2 Wie lange dauert das? Zeit schätzen · 3 Der Morgen mit Checkliste · 4 Schultasche packen und Hausaufgaben starten · 5 Mein Plan für eine echte Woche · 6 Meine Tages-Uhr |
| kurs-alltag-10-12 | Ich hab’s im Griff | Kalender (`motiv:kalender`) als Cockpit mit fünf Anzeigen: Zeit · Ordnung · Geld · Wege · Hilfe | KOG-45 1, KOG-52 .5, V-29 .5, V-27 .5 | alltag · – | 1 Was ich schon selbst regle · 2 Zeit planen: Woche und Kalender · 3 Ordnung halten: Sachen, Schließfach, Zimmer · 4 Mit Geld umgehen: Taschengeld, sparen, wünschen · 5 Allein unterwegs: Bus, Weg, wenn etwas schiefgeht · 6 Mein Selbstständig-Plan |
| kurs-alltag-13-16 | Selbstständig werden | Selbstständig-Landkarte: Termine · Geld · Energie · Hilfe · Erledigen | KOG-62 1, V-32 .5, V-29 .5 | alltag · – | 1 Was heißt selbstständig? · 2 Anrufen, schreiben, Termine machen · 3 Geld: Budget und Kostenfallen · 4 Schlaf, Energie und Gewohnheiten · 5 Eine echte Erledigung dieser Woche · 6 Mein Selbstständig-Plan |
| kurs-medien-10-12 | Clever online | Handy-Führerschein (`motiv:handy`, `motiv:handy-chat`) mit fünf Feldern: Zeit · Chat · Privat · Hilfe · Pausen | K-25 1, SOZ-32 .5, V-29 .5 | selbstregulation · medien | 1 Mein Medien-Tag · 2 Fair im Chat · 3 Privat bleibt privat · 4 Wenn online etwas schiefgeht · 5 Meine Bildschirm-Regeln für diese Woche · 6 Mein Handy-Führerschein |
| kurs-medien-13-16 | Digital klar | Digital-Check: Zeit · Aufmerksamkeit · Fakten · Respekt · Hilfe | KOG-58 1, K-25 .5, V-29 .5 | selbstregulation · medien | 1 Mein digitales Ich · 2 Wer will meine Aufmerksamkeit? · 3 Fake oder Fakt – auch bei KI · 4 Respekt und Grenzen in Gruppenchats · 5 Mein Medien-Experiment dieser Woche · 6 Mein Digital-Check |
| kurs-sprechen-4-6 | Erzähl mal, Eli! | Elefant Eli (`motiv:elefant`) und die Erzähl-Kette: fragen · Wörter finden · zuhören · der Reihe nach · erzählen | K-9 1, K-11 1, K-12 .5, K-10 .5 | kommunikation · – | 1 Fragen und antworten · 2 Wörter für Dinge und Gefühle · 3 Zuhören und dran sein · 4 Eine Bildergeschichte erzählen: erst, dann, zum Schluss · 5 Von etwas Schönem erzählen · 6 Elis Erzähl-Fest |
| kurs-sprechen-7-9 | Die Erzähl-Hand | Hand (`hand`) mit fünf Fingern: Wer? · Wo? · Was ist passiert? · Wie war es? · Wie ging es aus? | K-15 1, SOZ-24 1, K-14 .5, K-17 .5 | kommunikation · – | 1 Erzählen mit der Erzähl-Hand · 2 Zuhören und nachfragen · 3 Der Reihe nach: erst – dann – zum Schluss · 4 Gefühle beim Erzählen · 5 Von einem Erlebnis dieser Woche erzählen · 6 Meine Erzähl-Hand |
| kurs-sprechen-10-12 | Mitreden | Mikrofon (`motiv:mikrofon`) mit fünf Gesprächs-Regeln: zuhören · einsteigen · klar sagen · nachfragen · zusammenfassen | K-17 1, K-30 .5, SOZ-33 .5, SOZ-22 .5 | kommunikation · – | 1 Wie gute Gespräche funktionieren · 2 Einsteigen statt reinrufen · 3 Klar und kurz sagen, was ich meine · 4 Nachfragen und zusammenfassen · 5 Mitreden in der Klasse diese Woche · 6 Mein Gesprächs-Mikrofon |
| kurs-sprechen-13-16 | Meine Meinung zählt | Megafon (`motiv:megafon`): Meinung bilden · begründen · zuhören · fair widersprechen · mitbestimmen | K-30 1, KOG-58 .5, SOZ-32 .5, SOZ-22 .5 | kommunikation · – | 1 Meinung, Fakt, Gefühl · 2 Begründen: Behauptung – Grund – Beispiel · 3 Zuhören und fair widersprechen · 4 Überzeugen ohne Druck · 5 Mitbestimmen: ein eigenes Anliegen diese Woche · 6 Meine Stimme |

## 9. Weltklasse-Standard (Welle 3, ab 23.10.2026)

Maßstab ist nicht „besser als vorher“, sondern: **Was fehlt, damit es das Beste ist, was es dazu gibt?** Jeder Kurs wird so
geschrieben, als säßen eine Fachperson des Themas (z. B. Social Media, Kommunikation) und eine Weltklasse-Pädagogin zusammen.

**Für wen.** Kinder und Jugendliche, die keine Lust haben – manche waren lange nicht in der Schule. Sie müssen in der ersten
Minute neugierig werden und am Ende der ersten Sitzung etwas können, das sie vorher nicht konnten.

1. **Haken in der ersten Minute** (`hilfen.haken`): ein Rätsel, ein echter Gegenstand, eine überraschende Frage, ein kleines
   Experiment, eine Geschichte mit offenem Ende – nie „Heute lernen wir …“.
2. **Früher Erfolg, echte Wahl, echtes Leben:** jede Sitzung mit einem schnellen Erfolgserlebnis und einer Wahl (zwei Wege,
   selbst entscheiden); Beispiele aus dem Leben der Zielgruppe in Luxemburg (Bus, Pause, Verein, Chat, mehrere Sprachen);
   Wettbewerb nur freiwillig.
3. **Aus einem Guss:** eine **Kurs-Welt** (Ort, 2–3 Figuren verschiedener Herkunft und Geschlechter, ein Problem, das sich durch
   alle Sitzungen zieht) in `kurs-hintergrund.json` → `welt` (`{ de, fr }`, 3–5 Sätze); jede Sitzung knüpft an (`linie.bruecke`)
   und endet mit einem kleinen offenen Faden zur nächsten. Man darf nie merken, dass Sitzungen einzeln geschrieben wurden.
4. **Dramaturgie nach Ziel, belegt** – der Bogen „wahrnehmen → … → reflektieren“ ist kein Muss. Wähle, was für das Ziel wirkt,
   und begründe es im `warum` des Hintergrunds:
   - Fertigkeiten (Nein sagen, Ich-Botschaft, Streit lösen): Erklären – Vormachen – Üben im Rollenspiel – Rückmeldung –
     Übertragen (Behavioral Skills Training; SAFE-Kriterien nach Durlak et al., 2011).
   - Motivation, Ambivalenz, Schulrückkehr: motivierende Gesprächsführung (Miller & Rollnick), Wahl und Kompetenzerleben
     (Selbstbestimmungstheorie, Ryan & Deci), sehr kleine Schritte.
   - Angst und Stress: Psychoedukation, Körper herunterfahren, Gedanken prüfen, gestufte Annäherung (KVT).
   - Medien und Fake News: forschendes Lernen, selbst prüfen (seitliches Lesen, SIFT; Wineburg & McGrew), keine Verbote.
   - Konflikte und Mobbing: Perspektivwechsel, Wiedergutmachung, Zivilcourage in sicheren Schritten.
   Das Feld `bogen` bleibt (der Planer braucht es); Sitzung 5 überträgt in den Alltag, die letzte Sitzung schaut zurück.
   Kurse haben 6 Sitzungen.
5. **Fertiges Produkt je Sitzung** – Feld `hilfen` (`{ de, fr }`, Typ `HilfenText` in `typen.ts`, Prüfregel 17), vollständig:
   `haken` · `vorbereitung` (Checkliste, ≤ 6 Punkte, in 10 Minuten machbar) · `aufbau` · `karten` (Druckmaterial außer dem Blatt:
   Szenen-, Rollen-, Frage- oder Spielkarten, je Satz ≤ 24 Karten) · `leichter` · `schwerer` · `gruppe` · `beobachten`
   (2–3 beobachtbare Zeichen, nah am ELDiB-Ziel) · `warum` (Mechanismus in einem Satz mit Kurzquelle) · `links`
   (nur geprüfte https-Seiten, Luxemburg zuerst, z. B. BEE SECURE, Kanner-Jugendtelefon; jede Adresse vorher nachweislich
   geprüft – lieber kein Link als ein erfundener).
6. **Multisensorisch:** in jeder Sitzung mindestens zwei Kanäle außer Lesen und Schreiben (bewegen, anfassen, hören/sprechen,
   sehen/zeichnen, Rollenspiel). Audio als Vorlese-Skript im Text, kein Film nötig.
7. **Fachlich korrekt:** jede Tatsache stimmt (Zahlen mit Quelle in `quellen`); keine Mythen (Lernstile, Katharsis,
   „Handysucht“-Etikett, „10 % des Gehirns“); Notfallnummern nur aus offiziellen Quellen.
8. **Sicher:** Abschnitt 5 gilt; heikle Themen (Liebe/Sexualität, Trauer, Familie) mit `sensibel` bzw. so geschrieben, dass
   die Vorsicht-Filter greifen; nie Eigenes ausfragen.

**Raster der Kritiker** (je 0–10; Phase 1 alle ≥ 8, Phase 2 alle ≥ 9): Haken · Lebensnähe · Wahl und früher Erfolg ·
Multisensorik · fachliche Richtigkeit und Belege · Kohärenz der Welt · fertiges Produkt (Hilfen, Blatt, Karten) · Sicherheit ·
Sprache (kindgerecht, DE und FR gleich gut) · Machbarkeit für eine müde Fachkraft (≤ 10 Min. Vorbereitung, Material aus der
Grundausstattung).

### 9a. Lehren aus dem Pilot „Hinter dem Feed“ (sechs Kritiker, 22.10.2026)

- **Sicherheitsregeln vollständig, nie halb:** Wer „Beweise sichern (Screenshot)“ schreibt, schreibt im selben Satz die Ausnahme
  (Nackt- oder intime Bilder nie speichern, weiterleiten oder zeigen – sofort Vertrauensperson, Polizei 113/112, BEE SECURE
  8002 1234; bei Erpressung nicht zahlen, nicht antworten). Keine Karte lässt den verbotenen Fall durchspielen.
- **Rollenspiel sicher:** Pausen-Signal und Rollenausstieg („Schüttel die Rolle ab, du bist wieder du“); Betroffenen-Rollen
  nie in Ich-Form als Standard, lieber Figuren, Stimme oder Regie; für Jugendliche immer eine Alternative zum Spielen allein vor
  einer Erwachsenen.
- **Betroffene mitdenken:** ein eigener Schutzplan (wen, wann, auch nachts), Sätze für Vertraulichkeit mit Grenzen, Sätze für
  den Fall, dass Täter oder Mitläufer im Raum sind.
- **Machbarkeit:** je Sitzung ein Minutenplan „Muss / Kann“, Gruppenregie für 4–6 (hilfen.gruppe), Vorbereitung wirklich
  ≤ 10 Minuten, Spielregeln und Material im Kern vollständig, ein Plan B.
- **Geschichte mit Spuren:** Wer einen „Krimi“ erzählt, verteilt echte Hinweise, die die Kinder selbst finden; die Auflösung
  kommt aus den Spuren, nicht aus dem Erzähltext. Figuren und Schlüsselmomente erzählen, nie voraussetzen.
- **Fachlich vorsichtig:** Mechanismen (Feed, Likes, Recht) nicht bis zur Fehlaussage vereinfachen; Rechtliches nur belegt.
- **Luxemburg echt:** Klassen wie 7G, 5C, Regent·in, Lycée; Chats dürfen mehrsprachig sein (LU/FR/PT/DE); Hilfe Luxemburg zuerst.
- **Französisch:** Schlüsselsätze (Karten, Werkzeug, Merksätze) von Anfang an französisch denken, nie wörtlich übertragen.
- **Filterwörter:** auch „papa“, „soirée“, „Video“, „Clip“, „Film“, „Bühne“, „Publikum“, „maillot“, „Figur“ (Körper) lösen Filter
  aus – vor dem Schreiben Abschnitt 6 und `kern/einzel.ts` ansehen.

### 9b. Lehren aus der zweiten Kritikrunde

- **Spickzettel je Sitzung:** die ersten Zeilen von `hilfen.aufbau` als „Minute – Schritt – Satz“ (5–7 Zeilen), so dass eine
  müde Fachkraft die Sitzung in zwei Minuten erfasst; dazu „Muss / Kann“ und „Wird es knapp …“.
- **Fachkraft-Karten getrennt:** Lösungen, Regieanweisungen und Musterantworten nie auf dem Bogen, der auf den Tisch kommt –
  eigener Kartensatz mit Titel „Nur für dich“ / « Pour l’adulte ».
- **Spielmechanik vollständig:** Nachschub, Stapel, Ende der Runde, Plan B, wenn ein Spiel nicht zündet.
- **Gruppenregie** (hilfen.gruppe): wer sitzt wo, wer hat welche Rolle, was tun die anderen, wie endet es – für 4–6 unruhige
  Jugendliche, nicht nur „geht auch in der Gruppe“.
- **Rätsel zum Selberlösen:** Hinweise verteilen, die die Jugendlichen kombinieren; nichts verraten (kein Geständnis im Text);
  ihr eigenes Wissen (Apps, Spiele, Chats) ab der ersten Sitzung als Expertenrolle nutzen.
- **Aufträge zwischen den Sitzungen freiwillig und klein** („wenn du magst“), nie wöchentliche Hausaufgaben.
- **Rollenspiel:** Täter- und Betroffenenseite nie von Gleichaltrigen gespielt – Fachkraft oder Figurenkarte; Ausstieg locker
  („Rolle aus, Jacke aus“), nicht peinlich.
- **Französisch zuerst denken:** Titel, Karten, Merksätze, Chats in FR eigenständig formulieren; DE und FR müssen dieselben
  Filter auslösen (Filterwörter in beiden Sprachen prüfen).

### 9c. Machbarkeits-Budget (Nachmessung Pilot, 23.10.2026)

Mehr Material macht einen Kurs nicht besser, sondern schwerer: Nach zwei Überarbeitungen mit vielen Ergänzungen fiel die
Machbarkeit beim Pilot wieder auf 5. Darum je Sitzung **hart**:
- **eine** Kernaktivität (nicht drei), dazu höchstens eine kurze Vorübung;
- höchstens **3 Kartensätze für den Tisch** und **1 Satz „Nur für dich“**;
- Lesestoff auf dem Tisch höchstens **~120 Wörter** (Paragrafen, Studien, Recht → Hintergrund oder Fachkraft-Karte);
- in jeder Sitzung **eine körperliche oder bewegte Aktion** (aufstehen, Positionslinie, Karten auf dem Boden, Stimme) statt
  mehr Text;
- Vorbereitung realistisch in **≤ 10 Minuten**.

### 9d. Lehren aus den ersten acht Kursen der Welle 3 (24 Kritiken, 23.10.2026)

- **Blatt:**
  - Das Blatt ist Werkzeug der Kernaktivität **oder** ein kurzer Nachklang. Es wiederholt die Aktivität nie schriftlich.
  - Lesestoff fürs Kind höchstens: 13–16 ~150 Wörter, 10–12 ~100, 7–9 ~60, 4–6 fast nur Bild.
  - Das Blatt steht im Minutenplan, und die Minuten gehen auf.
- **Kerntext** höchstens ~130 Wörter; Details stehen in `hilfen`. Der Schnellstart passt zur Mechanik: keine „ungeschnittenen Bögen“, wenn Karten am Boden liegen.
- **Rätsel:**
  - Keine Lösung vorab: nicht in Spurentexten, nicht auf dem Blatt, nicht im Minutenplan der Fachkraft, nicht in der Brücke.
  - Die Kinder benennen die Lösung selbst.
  - Zeitlinie, Wochentage, Uhrzeiten und Beträge sind überall gleich und gehen rechnerisch auf.
- **Hand-Modelle:** Kein einzeln gestreckter Mittelfinger. Die Hand liegt auf dem Tisch, Finger werden angetippt.
- **Einzelstunde:** Das Kind handelt selbst (stimmt ab, wählt, spielt). Die Fachkraft spricht höchstens zwei Stimmen.
- **Luxemburg:**
  - SePAS gibt es nur im Secondaire. Im Fondamental sind es Lehrkraft, Schulkomitee/Präsident·in, I-EBS, ESEB (Direction de région) und Maison relais.
  - Lëtzebuergesch nur fehlerfrei (Eifeler Regel), sonst weglassen.
  - Mehrsprachigkeit zeigen (2–3 echte Wörter je Sitzung), nicht behaupten.
  - Ein Inklusionsmerkmal (Hörgerät, Rollstuhl) hat eine Rolle in der Handlung.
  - Alter und Klasse passen zusammen (12 Jahre in der Maison relais: Cycle 4.2, nicht 7e).
- **Geprüfte Angaben:**
  - Elterentelefon 8002 4444 (seit 2023)
  - Kanner-Jugendtelefon 116 111
  - BEE SECURE Helpline 8002 1234
  - OKAJU 28 37 36 35
  - Helpline Gewalt 2060 1060: seit 1.5.2026 rund um die Uhr, für Betroffene, Zeugen und Menschen, die sich um ihr eigenes Verhalten sorgen (die Zeiten 12–20 Uhr sind veraltet)
  - Schulpflicht bis 18 seit 2026/27 (Gesetz vom 20.7.2023)
- **Fachlich:**
  - Studien nur mit dem, was drinsteht.
  - Keine Wirkversprechen („Angst sinkt in 10 Minuten“, „Stopp sagen hilft“).
  - Betroffene nie mit Tipps belasten, die Schuld nahelegen.
- **Abgrenzung:**
  - Vor dem Schreiben die Kurse desselben Themas und Altersbands lesen (Name, Welt, Werkzeuge im Hintergrund).
  - Keine gleichen Werkzeuge, Orte oder Figurenprofile.
  - Die Hauptziele (ELDiB, Gewicht 1) sind nie identisch mit denen eines Kurses im selben Altersband.
- **Armut und Familie:** Keine Vergleiche (Taschengeld, Urlaub, Handy). Es gibt Sätze für „Ich kann nicht“ / „Wir haben das nicht“.

### 9e. Lehren aus Welle 3b (8 Kurse, 24 Kritiken, 23.10.2026)

- **Abwechslung:** Nicht zweimal dieselbe Kernform (z. B. „Notizen vorlesen und zuordnen“). Jede Sitzung hat eine eigene Spielform; die besten Formen gehören in die Varianten, nicht nur in die Tausch-Übungen.
- **Echter Körper:** Bewegung ist ein „Muss“ und eine echte Erfahrung (Puls, Spannung, Atem, Gleichgewicht), nicht „Zettel tragen“.
- **Titel und Brücke verraten nichts:** Wenn das Kind etwas herausfinden soll, nennt der Sitzungstitel die Lösung nicht.
- **Krisenkarte kurz:** „Nur für dich – wenn es echt wird“ hat höchstens ~60 Wörter für den Moment (das Wichtigste zuerst, auch die Suizid-Frage), dazu eine Karte „Danach“ (~45 Wörter). Lösungen, Studien und Kultur-Fakten stehen nicht darunter.
- **Nach einem „Ja“:** Wo nach Suizidgedanken gefragt wird, steht der fertige Ablauf: bleiben, ruhig nachfragen, nicht allein lassen, heute noch SePAS bzw. I-EBS/Leitung, bei akuter Gefahr 112.
- **Figuren einmalig:** Figurennamen und -profile kommen in keinem anderen Kurs vor (grep in `kurs-hintergrund.json`). Die Bilder `figur:…` dürfen mehrfach vorkommen.
- **Ort und Regeln echt:** Lokale Regeln vorher prüfen (z. B. Klettern an den Felsen von Berdorf nur für Mitglieder eines Kletterverbands; Sichern erklären Erwachsene). Fondamental: dienstags und donnerstags nachmittags keine Schule.
- **Zahlen und Zeiten:** Kanner-Jugendtelefon 116 111 telefonisch Mo–Sa, Chat nur dienstags 18–21 Uhr; für Nacht und Sonntag 112/113 und SOS Détresse 45 45 45 nennen.
- **Körper und Essen:** Keine Figur- oder Ess-Moral, keine Fragen nach Essen oder Schlaf zu Hause. Satt-Signal, Klo, Schmerz, Übelkeit gehören zu den Körpersignalen. Für „Ich habe Hunger und nichts dabei“ hat die Fachkraft eine Antwort, auch wenn die Einrichtung nichts anbietet.
- **Test-Formate:** In Kursen zu Angst und Stress keine Quiz- oder Richtig/Falsch-Formate; Körperbeschwerden sind echt (ärztliche Abklärung), nie „Ausrede“.
- **Vor der Kritik:** `python3 <scratchpad>/welle/kurs-auszug.py <linie>` erzeugt einen Auszug mit Budget-Tabelle (Kerntext, Blatt-Wörter, Kartensätze, Blattzeit). Rote Flags vorher beheben.

## 10. Katalog Welle 3 (neue Themen, Arbeitstitel)

ELDiB-Codes wählt die Kursarchitektur aus `src/data/passgenau/eldib.json` (2 Hauptziele mit Gewicht 1, 1–2 weitere mit 0.5),
Kompetenz und Thema aus dem Vokabular (`kern/vokabular.ts`). Linie `kurs-<thema>-<von>-<bis>`.

| Thema (Linie) | Alter | Worum es geht |
|---|---|---|
| socialmedia | 10–12, 13–16 | Online-Ich, Likes und Vergleich, Privatsphäre, Cybermobbing erkennen und handeln |
| fakenews | 10–12, 13–16 | Meinung und Fakt, Quellen prüfen, KI-Bilder, Gerüchte stoppen |
| gaming | 7–9, 10–12, 13–16 | Spielzeit selbst steuern, Tricks der Spiele, aufhören können, Spiel und Freundschaft |
| comeback | 7–9, 10–12, 13–16 | wieder in die Schule: Ängste klein machen, kleine Schritte, Verbündete, Rückschläge |
| motivation | 7–9, 10–12, 13–16 | eigene Ziele, dranbleiben, Aufschieben überlisten |
| stress | 7–9, 10–12, 13–16 | Stress und Prüfungsangst verstehen und senken |
| koerper | 4–6, 7–9, 10–12, 13–16 | Schlaf, Bewegung, Essen, Körpersignale – gut für mich sorgen |
| mobbing | 7–9, 10–12, 13–16 | Ausgrenzung erkennen, sich schützen, Zivilcourage, Hilfe holen |
| mitbestimmen | 4–6, 7–9, 10–12, 13–16 | Regeln aushandeln, Meinung sagen, gemeinsam entscheiden (Partizipation) |
| identitaet | 7–9, 10–12, 13–16 | Wer bin ich? Herkunft, Sprachen, Luxemburg, Zugehörigkeit |
| familie | 4–6, 7–9, 10–12, 13–16 | Veränderung in der Familie (Umzug, Trennung, Geschwister) – schonend |
| trauer | 4–6, 7–9, 10–12, 13–16 | Abschied und Trauer – schonend, ohne Ausfragen |
| zukunft | 10–12, 13–16 | Stärken, Berufe entdecken, nächste Schritte (Orientierung) |
| geld | 7–9, 10–12, 13–16 | Taschengeld, Wünsche und Werbung, Konsum |
| selbstfuersorge | 10–12, 13–16 | Pausen, Grenzen, Hilfe annehmen, Energie einteilen |
| deeskalation | 10–12, 13–16 | wenn es kracht: ruhig bleiben, aussteigen, Gewalt vermeiden |
| liebe | 13–16 | Freundschaft, Verliebtsein, Grenzen und Einvernehmen (heikel: nur freigeschaltet) |
| achtsamkeit | 4–6, 7–9, 10–12, 13–16 | zur Ruhe kommen, Sinne, Aufmerksamkeit lenken |
