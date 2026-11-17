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
