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
- **Kapitel 4 „Nein sagen“** (kapitel4.js): Noah will abschreiben (Nein sagen und erklären) · Schwänzen und Vape
  hinter der Turnhalle · Hausaufgaben-Club mit den Aufgaben der Lehrperson · Streit zwischen Ben und Jo schlichten
  (Reihenfolge-Spiel) · ein Ziel für nächste Woche · Folgen kommen von Menschen (gleiche Fehler im Heft, Frau Sommer fragt).
- **Kapitel 5 „Gerüchte“** (kapitel5.js): aus der Klassengruppe geworfen, ein Bild von dir geht rum (welches, hängt von
  früher ab: Sturz an der Skate-Ecke, Fundkiste-Schuhe …) · Gerücht „du und Mila“ · schlechter Morgen nach Stress
  zuhause (niemand muss erzählen) · zu Unrecht rausgeschickt · Freitag: was hängen bleibt (gefälschte Unterschrift?).
- **Kapitel 6 „Kleine Schritte“** (kapitel6.js): zugeschnitten auf die Jugendlichen der Förderklasse (Angst vor Blicken
  und Bewertung, Einfrieren, Rückzug, Fehlerangst – nur verallgemeinerte Muster, keine Einzelheiten aus Unterlagen).
  Montagmorgen am Tor (Umdrehen tut sofort gut und macht den nächsten Morgen schwerer) · Herr Kaya: kurzer Check-in,
  eigene **Mutleiter** sortieren, „Gleich“-Karte · Stufe 1 in der Pause: **Mutprobe** mit Anspannung live (steigt erst,
  fällt beim Bleiben; Weggehen erlaubt und zählt) · Lachen im Gang: „Dein Kopf“ und Gedanken prüfen (wie sicher? vorher
  und nachher) · Drangenommen: Erstarren, „Gleich“, Karte, Klo – jede Wahl mit echter Folge · Test mit viel Rot und dem
  „Kritiker“ · Freitag: eigene Stufe (Bäcker oder Kantine) oder ehrlich „heute keine“ · Wochenrückblick vorher/nachher.
  Ansätze: gestufte Exposition, kognitive Umstrukturierung, nonverbales Hilfesignal, Selbstbeobachtung, feste Bezugsperson.
- **„Kurz raus“ (⏸ / P):** jederzeit (außer mitten im Gespräch, aber während einer Mutprobe): Atmen oder 5-4-3-2-1.
- **Zweite Jugend-Kritik (17.11.2026, Schnitt 3,2):** Logikfehler behoben (Mila im Klassenrat, Folgen zu früh gefragt,
  Weggehen bei Mila, Kenan am Bus, Hoffmann und „Zuhause“, Bens Schulden, Nudeln, unsichtbare Sprecher, männliche
  Anreden). Antworten können jetzt von früheren Entscheidungen abhängen (`wenn` auch je Antwort).
- **Jugend-Kritik (17.11.2026, Panel K./S./D., Schnitt vorher 1,8 von 5)** umgesetzt: keine Glocke und keine Herzen
  nach jeder Antwort (Tagesrückblick beim Tageswechsel, Stärken still im Journal), Antworten in gemischter
  Reihenfolge, echte Versuchungen (Witz, Handy, Lügen, Decken, Screenshot, Mitlachen, Weggehen), Erwachsene mit
  Macken und Grenzen (Kaya sagt, was er weitergeben muss; Hoffmann schickt den Falschen raus), Konflikte nicht am
  selben Tag gelöst, späte Folgen über `merke` (Kantine → Skate-Ecke, Turnschuhe → Bild im Chat, Abschreiben →
  Hoffmann, Portemonnaie → Freitag), neue Szenen Raucherecke am Tor, Skate-Ecke, Bäcker ohne Geld, WC-Portemonnaie.
  Szenen mit `wenn` gibt es nur nach bestimmten Entscheidungen (SePAS, Hoffmann nach dem Abschreiben).
- **Phase 2 – eigene Aufgaben** (lernen.js): Auf dem Titelbild „Für Lehrpersonen: eigene Aufgaben“ – Aufgabenpaket
  anlegen (Fach, Frage, 2–4 Antworten, richtige Antwort, Erklärung), als Datei speichern oder laden, auf Wunsch
  „Geschichte geht erst weiter, wenn gelöst“. Gespielt an der Lernstation im CDI (Mme Laurent, immer da) und im
  Hausaufgaben-Club. Falsch → Erklärung und neuer Versuch. Speicher „lycee.aufgaben“, nur Aufgaben, keine Namen.
  Ohne eigenes Paket kommen acht Beispiel-Aufgaben (Mathe, Deutsch, Französisch, Werkstatt).
- **Lebendiger Hof:** Statisten laufen über Hof und Gang.
- **Ohne Bewertung:** Jede Wahl hat eine ruhige Folge bei den Menschen (Herzen). Gezeigte
  Stärken werden gesammelt (Kontakt aufnehmen, Freundlich und klar, Zuhören, Ruhig bleiben …).
- **Journal (Tab / ☰):** Menschen, Stärken, Stundenplan, Entdeckungen (12 Orte), Mutleiter (ab Kapitel 6).
- Vorlesen jeder Sprechblase (🔊). Gespeichert nur im Browser (`lycee.stand`).

## Dateien
`welt.js` Gebäude und Gelände · `requisiten.js` Modelle aufstellen · `figuren.js` Menschen (Skelett,
Sitzen) · `steuerung.js` Laufen und Kamera · `geschichte.js` Kapitel, Gespräche, Stärken ·
`ui.js` Oberfläche · `spiel.js` Kern · `main.js`, `shell.html`, `stil.css`.

## Nächste Schritte
Kapitel 7 „Praktikum“ (Vorschlag der zweiten Kritik, nutzt viele alte Folgen); 15 Szenen aus der zweiten Kritik neu schreiben; Phase 2 ausbauen (Aufgaben aus dem Hub, mehr Lernmomente); Phase 3 (Werkstatt: Arbeitssimulator DAP/CCP).
