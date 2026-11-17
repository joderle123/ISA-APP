# Lycée des Collines – Schulsimulator (Phase 1)

Ein offenes Lycée zum Herumlaufen mit einer klaren Hauptgeschichte. Ziel: soziale Situationen
des Schulalltags üben, ruhig und ohne Bewertung. Für Jugendliche der Annexe.

**Spielen:** `dist/lycee.html` im Browser öffnen (eine Datei, läuft ohne Internet).
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
- **Ohne Bewertung:** Jede Wahl hat eine ruhige Folge bei den Menschen (Herzen). Gezeigte
  Stärken werden gesammelt (Kontakt aufnehmen, Freundlich und klar, Zuhören, Ruhig bleiben …).
- **Journal (Tab / ☰):** Menschen, Stärken, Stundenplan, Entdeckungen (8 Orte).
- Vorlesen jeder Sprechblase (🔊). Gespeichert nur im Browser (`lycee.stand`).

## Dateien
`welt.js` Gebäude und Gelände · `requisiten.js` Modelle aufstellen · `figuren.js` Menschen (Skelett,
Sitzen) · `steuerung.js` Laufen und Kamera · `geschichte.js` Kapitel, Gespräche, Stärken ·
`ui.js` Oberfläche · `spiel.js` Kern · `main.js`, `shell.html`, `stil.css`.

## Nächste Schritte
Kapitel 2 „Die erste Woche“, Sitzen auch für die Spielfigur, Phase 2 (eigenes Unterrichtsmaterial
als Aufgaben in der Hauptgeschichte), Phase 3 (Werkstatt: Arbeitssimulator DAP/CCP).
