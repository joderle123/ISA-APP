# Annexe Junglinster – Plan „nächstes Niveau“

Auftrag: aus dem 3D-Schulsimulator ein Spiel machen, das Jugendliche (12–17, Voie de préparation) freiwillig
weiterspielen. Maßstab: Jemand mit 15, der Schule hasst, spielt in der Pause weiter und zeigt jemandem eine Szene.
Feste Regeln, Säulen und Tonbeispiele: siehe Auftrag (vom Auftraggeber, nicht im Repo) und FIGUREN.md.

So knüpft eine neue Sitzung an: diese Datei lesen, dann ENTSCHEIDUNGEN.md, dann `node tools/annexe/regeln.mjs`.

## Aufbau (Stand Etappe 0)
- Quellen `insel/src/lycee/*.js` → `node build-lycee.mjs` → eine Datei `insel/dist/lycee.html` (esbuild, Modelle eingebettet, offline).
- Technik: `spiel.js` (Ablauf, Gespräche abspielen, Freundschaft, Unterricht, Minispiele), `ui.js` (alle Oberflächen),
  `steuerung.js` (Laufen, Kamera, Skateboard), `welt.js`/`campus.js`/`details.js` (Schule), `figuren.js` (Figuren, Sitzen).
- Inhalte als Daten: `geschichte.js` (Kapitel 1, Sprecher, Leute), `kapitel2.js` … `kapitel7.js`, `faeden.js`
  (3 Gespräche je Figur), `freunde.js` (Charaktere, Gruß, Nachrichten), `lektionen.js` (erzeugt aus `tools/sprachen`),
  `mathe.js`, `deutsch.js`. Noch in `spiel.js`: Plauder-Sätze, Statisten, Szenen-Funktionen (TUN) mit eingebetteten Zeilen.
- Speichern: `localStorage` „lycee.stand“ (ein Stand, ohne Versionsnummer), Aufgaben der Lehrperson „lycee.aufgaben“.
- Drehbuch: `node tools/annexe/drehbuch.mjs` schreibt `annexe/DREHBUCH.md` (nie von Hand ändern).
- Tests: `tests/lycee.mjs` (Gesamtlauf, 101 Prüfungen), `tests/lycee-interaktion.mjs` (42 Prüfungen).

## Werkzeuge (Etappe 0)
- `?debug` in der Adresse: Leiste unten links mit fps (min. der letzten 10 s), Schritt-Sprung, Dialog-Autoplay, Durchspielen.
- `node tools/annexe/regeln.mjs [--alle]` – Regel-Prüfung aller Texte (Wortzahl ≤ 12, verbotene Wörter, Therapie-/Moralsprache,
  Einwürfe nur aus der Liste, je Gespräch höchstens einer, nur die der Figur, Telefonnummern, Gewicht/Kalorien).
- `node tools/annexe/durchspielen.mjs [1-7] [--wahl=zufall|0|letzte] [--bilder=ORDNER]` – jedes Kapitel per Autoplay bis zum Ende.
- `node tools/annexe/geraete.mjs ORDNER` – Bildschirmfotos in iPad quer (1180×820), iPad hoch (820×1180), Handy (390×844).

## Etappen
- [x] **0 Vorbereiten** – Sicherung (Commit b1ec109, Kopie der Ausgangsdatei), Debug-Leiste, Regel-Skript, Autoplay-Durchlauf, Geräte-Fotos, PLAN.md, ENTSCHEIDUNGEN.md
- [ ] **1 Stimme** – FIGUREN.md, alle Gespräche neu, DREHBUCH.md (erzeugt), Kapitel 1 erfüllt den Fünf-Minuten-Maßstab
  - [x] Figurenbibel (will, Widerspruch, wunder Punkt, Sprechweise, Running Gag, Zuneigung durch Taten, nervt, Einwurf)
  - [x] `stimmen.js`: Einwürfe je Figur, Plauder-Sätze aus spiel.js als Daten
  - [x] Kapitel 1 neu, mit Lacher < 1 min, echter Entscheidung < 3 min, Freischaltung < 5 min
  - [~] Kapitel 2–7 überarbeitet (35 Kritik-Stellen + Kopfkino + flache Sätze); Gegenlesen folgt
  - [x] Freundschafts-Gespräche, Plaudern, Grüße, Nachrichten
  - [x] Kopfkino (Kopf, Bauch, Stolz) in Druckmomenten: Kantine, Tor, Schwänzen, Skate, Gerücht, Rauswurf
  - [x] Ben-Schulden als Zähler (Journal), Automat-Zähler, Webers „16 Uhr, nicht 16:05“, Mme Tidderichs „Neue Methode“, Busfahrer
  - [x] Knopf „Sagt keiner so“ (lokal `lycee.sagtkeiner`, ohne Namen, im Pausenmenü ⏸ kopierbar)
  - [x] Bank-Momente (9 s neben jemandem sitzen → Toast + Freundschaft, je Kapitel einmal)
  - [x] Welttexte (`welttexte.js`: Pinnwand wechselt, Kritzeleien Bus/Tisch, Durchsagen, Fundkiste)
  - [~] Klassenchat mit Tippen, Reaktionen, „gelesen von“; Kap. 2 Foto und Kap. 5 Rauswurf im Handy. Offen: Handy als Zentrale (Freundes-Nachrichten, Antworten im Chat)
  - [ ] Gegenlesen: drei Rollen per Subagent, Regel-Skript grün, Durchspielen 1–7 grün
- [ ] **2 Welt** – Tagesablauf je Figur, Szenen ohne Spielfigur, Körpersprache/Comic-Zeichen, Comic-Look, Licht/Wetter/Herbst, Kamera, Ton
- [~] **3 Lernen und Belohnungen** – erledigt: Jetons fürs Lernen, Einlösen bei Kenan/Lina/Ayla/Chiara, Spind 117 als Ort; offen: Mme Tidderichs Methoden als Lernform, Stoff in der Welt (Werkstatt messen, Wechselgeld, Fahrplan), Editor (Hauttöne, Kopftuch, Brille), Hilfe-Leiter, Erklären für Noah
- [ ] **4 Soziales Spiel** – Puls, Vertrauen/Reparatur, Gerüchte-Spur, Zuschauer-Momente, Freundschafts-Bögen, Seitenwechsel, Wiederholen, Klassenfoto, Comic
- [ ] **5 Minispiele** – Skaten (Wischen, Kombos, Grinds, Duell), Korbball, Tischtennis, Bandprobe, Küche, Werkstatt
- [~] **6 Feinschliff** – erledigt: Einstellungen (Textgröße, Vorlesen aus, weniger Bewegung, Linkshänder, ruhiger Modus, Lautstärke/Musik), Tätigkeitswort auf dem Knopf, Sicherungscode, BEGLEITKARTEN.md; offen: drei Spielstände, Wort-Hilfe, Blips, iPad-Tempo am Gerät

## Offen / bekannt
- fps nur im Headless-Browser messbar (Software-Grafik); echtes iPad-Tempo muss auf dem Gerät geprüft werden.
- Git-Tags lassen sich nicht hochladen (Server lehnt ab); Sicherung = Commit-Hash + Kopie der Ausgangsdatei.

---

# Auftrag „Grafik“ (gehört zum Hauptauftrag, vertieft Säule 2)

Werkzeuge: `node tools/annexe/blickpunkte.mjs ORDNER TAG --q=high` (8 feste Blicke + Messwerte),
`node tools/annexe/lookprobe.mjs ORDNER` (Look-Vergleich), `?look=comic|skizze|weich` in der Adresse,
`LYCEE.rr.setLook(name)` / `LYCEE.rr.lookWerte` + `LYCEE.rr.wendeLook()` (Look-Regler, Debug-Leiste folgt).
Vorher-Bilder und Messwerte: `annexe/bilder/vorher-*` (17.11.2026, q=high, 1180×820).

## Messwerte vorher (Headless, Software-Grafik → fps nicht aussagekräftig)
- Zeichenaufrufe ≈ 940–990 pro Bild (Ziel ≤ 200), Dreiecke ≈ 700 000–713 000 (Ziel ≤ 400 000), Schattenkarte 4096 bei „hoch“ (Ziel ≤ 2048).
- Datei 6,97 MB, Start 4,8 s (Headless).

## Etappen
- [x] **G0 Bestandsaufnahme** – Modelle gesichtet (Quaternius Men/Women, Kenney-Auswahl, Quaternius-Requisiten), KayKit geladen (CC0),
      Quaternius UBC/UAL/Nature und Kenney/Poly Pizza nicht erreichbar (Liste in LIZENZEN.md), Vorher-Bilder, Messwerte
- [x] **G1 Look-Probe** – A Comic, B Skizzenbuch, C Weich als ein Bild (`annexe/bilder/look-vergleich.jpg`) → vorläufig **A Comic, leichter** (siehe ENTSCHEIDUNGEN)
- [~] **G2 Fundament** – Leistung im Ziel (≤200 Aufrufe, ≤400k Dreiecke, Schatten ≤2048); offen: Material-Palette, Stimmungen, Debug-Regler – Material-System (ein Toon-Material + Palette für alle Modelle), Palette 12–16 Farben, Licht/Tageszeiten, Schatten ≤ 2048 eng um die Kamera, Himmel, Nachbearbeitung in einem Durchgang, Qualitätsstufen
- [ ] **G3 Figuren** – Probe Mila/Kenan/Frau Kremer (Halt), dann alle; Baukasten für Skins, Gesichter, Bewegung, Sport-Posen
- [ ] **G4 Welt** – Hof, Skate-Ecke, Bushaltestelle, Gänge, Saal, Kantine, Werkstatt, Bibliothek, Büro (Postkarten-Test)
- [ ] **G5 Effekte, Kamera, Oberfläche**
- [ ] **G6 Leistung und Feinschliff** – Galerie vorher/nachher

## Funde aus G0
- Zu viele Zeichenaufrufe: Innenräume und Hof werden immer gezeichnet (keine Raum-Abschaltung), viele Einzelnetze.
- Umgebungsverdeckung erzeugt dunkle Ränder um Figuren, sobald keine Kontur darüber liegt.
- Brunnen hatte einen zu kleinen Kollisionskasten (man lief ins Wasser); Ayla/Noah (Kap. 4) und Mila (Kap. 6) standen im Brunnen → behoben.
- Figuren: ein Skelett, 12 Erwachsenen-Modelle (Quaternius Modular Men/Women) – wirken erwachsen; Luca und ein Statist tragen „Farmer“ (Strohhut/Latzhose).
