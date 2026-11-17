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
