# Lycée des Collines – Schulsimulator (Phase 1)

Ein offenes Lycée zum Herumlaufen mit einer klaren Hauptgeschichte. Ziel: soziale Situationen
des Schulalltags üben, ruhig und ohne Bewertung. Für Jugendliche der Annexe.

**Spielen:** `dist/lycee.html` im Browser öffnen (eine Datei, rund 6,6 MB, läuft ohne Internet).
Bauen: `node build-lycee.mjs` · Test: `node tests/lycee.mjs` (spielt Kapitel 1 ganz durch).

## Stil
„Premium-Stilisiert“ wie die Insel (docs/STIL.md): Toon-Licht, Konturen, warmes Kantenlicht,
gemalter Himmel, Bloom. Flache, einfarbige Low-Poly-Modelle (Quaternius, Kenney – CC0, siehe
`modelle/LIZENZ.md`). Gebäude, Stühle, Regale und Tische sind aus einfachen Formen gebaut, damit
alles zusammenpasst.

## Was es gibt
- **Campus:** Haupthaus aus Sandstein mit Uhrtürmchen; Halle, Gang mit Spinden, Saal 1.04 und 1.06,
  CDI (Bibliothek), Sekretariat, SePAS, Kantine, WC; Turnhalle, Werkstatt (Ausblick Phase 3),
  Schulhof mit Brunnen, Korbballfeld, Fahrradständern, Bushaltestelle und Straße.
- **Kapitel 1 „Rentrée“** (geschichte.js): Bus · Sekretariat · Gang · Klasse · Klassen-Bingo ·
  Pause (Mila oder Freiwürfe) · Kantine (Vordrängeln) · Tischwahl · Gruppenarbeit · Heimweg.
- **Kapitel 2 „Die erste Woche“** (kapitel2.js): Dienstag Sport (Turnschuhe vergessen, Teams wählen, Korbwurf,
  Kritik aushalten) · Mittwoch Mathe im CDI (um Hilfe bitten; kleine Bruch-Aufgabe als Vorgeschmack auf Phase 2) und
  AG wählen · Donnerstag gemeines Foto im Klassenchat, Mila trösten, gemeinsam zum SePAS · Freitag Mathe-Test mit
  Atemübung, Klassenrat mit Ich-Botschaft (Baukasten; ein Vorwurf wird freundlich zurückgegeben), Wochenende.
- **Kapitel 3 „Der Schnuppertag“** (kapitel3.js): Bus verpasst – im Sekretariat anrufen (Telefonat mit Name,
  Klasse, Grund, Ankunft) · zu spät in die Klasse · Werkstatt mit Meister Becker: Sicherheitsregeln, Messen und
  Sägen (Spiel), Fehler zugeben, Regal zu zweit mit Kenan (erinnert sich an Kapitel 1), Rückmeldung annehmen,
  sagen, was einen beruflich interessiert. Brücke zu Phase 3 (DAP/CCP).
- **Lebendiger Hof:** Statisten laufen über Hof und Gang.
- **Ohne Bewertung:** Jede Wahl hat eine ruhige Folge bei den Menschen (Herzen). Gezeigte
  Stärken werden gesammelt (Kontakt aufnehmen, Freundlich und klar, Zuhören, Ruhig bleiben …).
- **Journal (Tab / ☰):** Menschen, Stärken, Stundenplan, Entdeckungen (8 Orte).
- Vorlesen jeder Sprechblase (🔊). Gespeichert nur im Browser (`lycee.stand`).

## Dateien
`welt.js` Gebäude und Gelände · `requisiten.js` Modelle aufstellen · `figuren.js` Menschen (Skelett,
Sitzen) · `steuerung.js` Laufen und Kamera · `geschichte.js` Kapitel, Gespräche, Stärken ·
`ui.js` Oberfläche · `spiel.js` Kern · `main.js`, `shell.html`, `stil.css`.

## Nächste Schritte
Kapitel 4, Phase 2 (eigenes Unterrichtsmaterial
als Aufgaben in der Hauptgeschichte), Phase 3 (Werkstatt: Arbeitssimulator DAP/CCP).
