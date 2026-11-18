# Annexe Junglinster – Entscheidungen

Kurz: was, warum, Datum. Neueste unten.

## Etappe 0 (17.11.2026)
- **Kein Neuaufbau, sondern Umbau.** Der Code ist schon in Module geteilt und wird per Skript zu einer Datei gebaut
  (`build-lycee.mjs`, esbuild). Das bleibt so. Inhalte wandern weiter aus `spiel.js` in Datendateien.
- **Sicherung:** Commit b1ec109 auf dem Arbeitszweig, lokaler Tag `annexe-ausgang-etappe0`, Kopie der Ausgangsdatei.
  Tags hochladen lehnt der Server ab.
- **Debug nur mit `?debug`.** Kein Knopf im normalen Spiel, nichts gespeichert. Autoplay klickt Gespräche/Karten weiter,
  „Durchspielen“ erledigt zusätzlich den Auftrag (zur Person/zum Ort springen, bei Bingo/Pause alle ansprechen).
- **Regel-Skript liest Quelltext statt auszuführen.** Kein Parser im Projekt; die Texte stehen einheitlich als
  `['wer', 'Text']` und `t: 'Antwort'`. Erzähler-Zeilen über 12 Wörter sind nur Hinweise (keine Sprechblase einer Figur),
  alles andere sind Fehler.
- **Einwürfe:** Liste genau wie vorgegeben; Zuordnung je Figur kommt in `stimmen.js` (Etappe 1), das Skript prüft sie dann.
  „Pardon“ steht nicht auf der Liste → wird ersetzt.
- **Fehler gefunden und behoben:** Figuren saßen nie wirklich (der Lader entfernt Punkte aus Knochennamen, „UpperLeg.L“ →
  „UpperLegL“); dadurch fehlten auch Hand-Dinge (Zigarette, Würfel, Kopfhörer). Kamera steckte an Regalen in der Wand.
  Skate-Anzeige überdeckte die Auftragskarte.
- **Dokumente** liegen in `insel/annexe/` (PLAN, ENTSCHEIDUNGEN, FIGUREN, DREHBUCH, später BEGLEITKARTEN).

## Grafik G0/G1 (17.11.2026)
- **Look als ein Durchgang im vorhandenen Bild-Stapel** (nach der Farbkorrektur, vor FXAA): Stufen, Rasterpunkte, Schraffur,
  Papier, Sättigung. Konturen kommen aus dem schon vorhandenen Kontur-Pass (Stärke/Dicke je Look). So bleibt es schnell.
- **Rohpakete** liegen in `insel/assets_roh/` (in .gitignore). Nur KayKit war erreichbar (über git); itch.io ist gesperrt,
  kenney.nl und poly.pizza antworten 403. Keine Umgehung.
- **Vorher-Bilder als JPEG** im Repo (`annexe/bilder/`), damit spätere Sitzungen vergleichen können (1,4 MB).

## Look-Auswahl (17.11.2026, vorläufig, Modus „durchziehen“)
- **A „Comic“ ist Standard, leichter gestimmt.** Der Auftraggeber war nicht erreichbar („durchziehen“, keine Rückfragen).
  A wirkt auf einem Bildschirmfoto sofort wiedererkennbar und passt zu Linas Comic und den Sprechblasen.
  Leichter als in der Probe: Konturdicke 2,4 statt 3, vier statt drei Helligkeitsstufen, Sättigung 1,2 statt 1,3.
- **Umschaltbar** bleibt alles: `?look=aus|comic|skizze|weich` in der Adresse oder `LYCEE.rr.setLook(name)`.
  Wenn der Auftraggeber B oder C will, ist es eine Zeile (`look:` in `spiel.js`, Aufruf von `createRenderer`).
- Der Look-Durchgang läuft nur, wenn die Nachbearbeitung läuft (Qualität mittel/hoch). Auf „niedrig“ bleibt das Bild schlicht.

## Etappe 1, Kapitel 1 (17.11.2026)
- **Antwort-Reihenfolge und Wirkungen bleiben**, nur Texte neu. Der Gesamttest wählt Antworten über die Position.
  Einzige Ergänzung: bei Ben nach den Freiwürfen eine dritte, witzige Antwort.
- **Fünf-Minuten-Maßstab:** Lacher in der ersten Minute (Noah: „Bist du neu, oder guckst du immer so?“, Antwort „Prospekt“),
  echte Entscheidung vor Minute drei (Mme Weber: warten, stören oder Plan klauen – mit Folgen bei Hoffmann),
  Freischaltung vor Minute fünf (Spind 117 nach dem Sekretariat; vorher ist er zu).
- **Kopfkino** (Kopf, Bauch, Stolz) zuerst in der Kantine vor Lucas Vordrängeln. Die drei Stimmen widersprechen sich;
  keine ist die „richtige“. Eigene Farben in `SPRECHER`.
- **Running Gag Ben-Schulden** als Zahl (`S.benSchuld`), steht im Journal unter „Menschen“, wird nie kleiner.
  Dort auch Münzen im Automaten und der Freiwurf-Rekord – nur Dinge, die man selbst geschafft hat.
- **Einwurf-Fehler** aus Kapitel 2/5/6/7 behoben (Sommer „Allez“, Hoffmann „Ça va?“, Kremer ohne „Moien“).

## Etappe 1, Rest (17./18.11.2026)
- **„Sagt keiner so“** sitzt in jeder Sprechblase einer Figur (nicht beim Erzähler). Gespeichert nur im Browser
  (`lycee.sagtkeiner`, höchstens 200 Sätze), der Spielername wird durch `{name}` ersetzt. Im Pausenmenü ⏸ als Liste
  `[wer, Text]` zum Kopieren und Leeren. Nichts verlässt das Gerät.
- **Welttexte** in eigener Datei `welttexte.js`: Pinnwand wechselt bei jedem Lesen, Fundkiste, Kritzeleien (Bus, Tisch),
  Durchsagen von Mme Weber alle ~2–5 Minuten beim Herumlaufen (nie im Gespräch, nie im Test).
- **Bank-Momente:** 9 Sekunden neben einer Figur sitzen = ein Satz („Ihr sitzt …“) und +1 Freundschaft, einmal je Kapitel
  und Person. Kein Gespräch, kein Knopf – Schweigen zählt.
- **Klassenchat:** Nachrichten kommen nacheinander mit „… tippt“, Reaktionen und „Gelesen von N“. Kapitel 5: Der Rauswurf
  passiert im Handy selbst. E/„Handy weg“ zeigt sofort alles (für langsame Leser und Tests).
  Noch offen: Antworten direkt im Chat (bisher entscheidet man danach in der Sprechblase).
- **Kaya (Kapitel 6)** erklärt nicht mehr wie ein Ratgeber („die ersten Minuten sind die schlimmsten“), sondern mit einem Bild:
  kaltes Wasser im Freibad. Gleiche Idee, keine Fachsprache.

## Grafik G2, Leistung (18.11.2026)
- **Zellen statt ein Riesennetz:** Wände, Innenausbau, Möbel und Böden werden in Rasterzellen (24–32 m) zusammengefasst.
  So schneidet der Kamera-Ausschnitt ganze Zellen weg. Böden: eine Textur je Art, Kacheln über UV statt eigener Textur je Raum.
- **Figuren außerhalb des Bildes** (oder > 70 m) werden nicht gezeichnet und nicht animiert. Der Fußschatten bleibt.
- **Schattenkarte höchstens 2048**, enger um die Kamera (±40 m statt ±60 m). Gilt nur für die Annexe, andere Spiele unverändert.

## Gegenlesen mit drei Rollen (18.11.2026)
Ein Subagent hat das Drehbuch als (1) 13-jährige Person, die Schule hasst, (2) 16-jährige Person mit sozialer Angst und
(3) Kinderpsycholog:in gelesen. Umgesetzt (Auswahl):
- **Sichtbare Therapie-Technik raus:** Kayas Gewöhnungs-Erklärung, „Kann beides sein“ (ausgewogener Gedanke),
  Atem-Antwort im Test („Vier rein, vier raus“ → „Decke anstarren“), Hoffmanns „Wie war das für dich?“.
- **Erwachsene teilen nichts Persönliches:** Kayas „Kenn ich“ (2×), Laurents Rechtschreib-Geständnis, Sommers „Ich mochte Mathe nie“.
  Kaya schreibt Jugendlichen keine Nachrichten am Wochenende (Grenze) → Zettel.
- **Keine erkennbar richtige Antwort:** „Fotos nur mit Ja“ → „Jo darf nur Fotos von Jo schicken“ (witzig, gleiche Regel);
  „Hab gesehen, wie du Nein gesagt hast. Stark.“ (Lob fürs richtige Verhalten) → Ben-Schulden-Witz.
- **Etiketten wie Diagnosen** in der Freundesliste („denkt anders“, „impulsiv“, „unsicher“) → Eigenheiten („zählt Tauben“).
- **Kopf ist nüchtern** (Figurenbibel): In Kapitel 6 spricht jetzt der Bauch die Angst-Gedanken.
- Noah sagt seinen wunden Punkt nicht mehr laut („besser als die letzte Schule“).
- Ich-Botschaft-Baukasten und Streitschlichten-Reihenfolge sind im Spiel nicht mehr erreichbar (alter Code), bleiben aber
  vorerst in den Dateien. Das Drehbuch-Skript zählt Daten-Listen (marker, felder …) nicht mehr als Sprechzeilen.

## Etappe 3, Anfang: Jetons, Einlösen, Spind (18.11.2026)
- **Jetons fürs Lernen:** Blatt alles richtig 3, geübt 1; Lektion neu 3, wiederholt 1; Übungsrunde alles richtig 2, sonst 1.
  Auch „nicht alles richtig“ bringt etwas. Zahl verdient insgesamt steht im Spind.
- **Einlösen nur bei Figuren** (`belohnungen.js`): Kenan lackiert Decks (Farbe am eigenen Skateboard), Lina macht Sticker
  (kleben innen an der Spindtür), Ayla hat Songs (im Spind abspielen), Chiara baut Spind-Lampen (Licht im Spind).
  Angeboten wird einmal je Abschnitt, nur wenn es für mindestens ein Ding reicht. Kein Zufall, nichts auf Zeit, nichts verfällt.
- **Spind 117** ist ein eigener Ort (vorher nur ein Satz): erst nach dem Sekretariat offen, zeigt alles Erworbene.
- **Spiegel im Spind = Editor:** Hautton (7), Haarfarbe (8), Frisur (8, auch Kopftuch), Kopfbedeckung, Brille (neu, drei Farben),
  Oberteil-Farbe. Gespeichert als `S.aussehen`, gilt sofort. Keine Kosten – Aussehen ist nie eine Belohnung.

## Etappe 6, Anfang (18.11.2026)
- **Einstellungen** im Pausenmenü ⏸ (nur auf dem Gerät, `lycee.einstellungen`): Textgröße A/A+/A++, Vorlesen (Standard aus),
  weniger Bewegung, Linkshänder (Joystick rechts, Knopf links), ruhiger Modus (keine Durchsagen), Lautstärke und Musik.
- **Knopf zeigt das Tätigkeitswort** („Hinsetzen“, „Öffnen“, „Reden“) statt „E“. Der Joystick erscheint schon dort,
  wo der Daumen aufsetzt (war vorhanden).
- **Sicherungscode** (Einstellungen → Sicherungscode): Spielstand als Text „AJ1.…“ zum Kopieren und auf einem anderen Gerät
  Einlösen. Der alte Stand wird vorher unter `lycee.stand.vorher` aufgehoben. Drei Spielstände: noch offen.
- Luca und ein Statist tragen keine „Farmer“-Kleidung (Strohhut/Latzhose) mehr.

## Handy-Rückmeldung (18.11.2026)
Bild vom Handy (Kapitel 1, Bingo): Punktraster wirkte wie Schmutz, Knopf zeigte „Los“, Bingo-Karte zu groß.
- **Punktraster nur bei scharfem Bild** (Pixelverhältnis ≥ 2) und nur in echten Schatten, schwächer (0,32 statt 0,5).
  Bei weniger Auflösung verschwimmen die Punkte – dann lieber keine.
- **Runder Knopf leer und blass**, wenn man gerade nichts tun kann (statt „Los“).
- **Bingo-Karte auf schmalen Bildschirmen kompakt** (kleinere Schrift, Fragezeichen in der Zeile).
- **Drei Spielstände** auf dem Titelbild (Platz 1 = bisheriger Speicher, nichts geht verloren).
- Leistung jetzt (high, 1180×820): Dreiecke 123k–281k (Ziel ≤ 400k ✓), Zeichenaufrufe 101–391.
  Davon ist fast die Hälfte die Schattenkarte; ohne Schatten 146–212. Nächster Schritt: Schattenwerfer auf Nahbereich begrenzen.

## Grafik G2: Leistung im Ziel (18.11.2026)
Gemessen mit `tools/annexe/blickpunkte.mjs` (high, 1180×820), Zeichenaufrufe / Dreiecke:

| Ort | vorher (17.11.) | jetzt |
|---|---|---|
| Hof | 954 / 710k | 182 / 251k |
| Skate | 942 / 709k | 123 / 184k |
| Bus | 936 / 707k | 100 / 129k |
| Gang | 965 / 713k | 162 / 212k |
| Saal | – | 116 / 161k |
| Kantine | – | 146 / 145k |
| Werkstatt | – | 80 / 103k |
| Bibliothek | – | 174 / 199k |

Ziel war ≤ 200 Aufrufe und ≤ 400k Dreiecke – überall erreicht. Was es gebracht hat:
- **Figuren nur zeichnen, wenn sie im Bild sind** (vorher immer, auch in der Schattenkarte). Großzügige Kugel je Figur.
- **Figur-Teile zusammengefasst:** Teile mit gleicher Ruhelage werden ein Netz (1–3 statt 4–8 je Person).
  Jede Zusammenfassung wird nachgeprüft (Stichproben vorher/nachher ≤ 1 cm), sonst bleibt alles einzeln.
- **Frisuren** sind ein Netz statt bis zu 20 Kugeln.
- **Schattenbereich** enger um die Kamera (28 m statt 40 m) – weniger Schattenwerfer, schärfere Schatten.
- Bildrate am echten iPad ist damit noch nicht gemessen (im Test läuft die Grafik in Software).
