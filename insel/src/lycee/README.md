# Annexe Junglinster – Schulsimulator (früher „Lycée des Collines“)

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
- **Kapitel 7 „Praktikum“** (kapitel7.js, Entwurf der zweiten Jugend-Kritik): Praktikumsliste · drei Unterschriften bei
  Herrn Kaya (gefälschte Unterschrift von früher kommt zurück; „Warum, musst du nicht sagen“) · zwei Wege: Werkstatt bei
  Meister Becker mit Kenan als Betreuer (falsches Loch: wer nimmt es auf sich?) oder Anruf beim Bäcker (Absage), dann
  Kantine bei Frau Kremer (Zwiebeln mit Luca, Kasse: Lucas Karte ist leer) · Bewertungsbogen am Freitag. Viele frühere
  Entscheidungen kommen zurück (Portemonnaie, Kenan am Tor, Gerücht mit Mila, Screenshot, Garage bei Jos Onkel).
- **Annexe Junglinster – Campus (campus.js, Auftrag 17.11.2026):** Name überall (Speicher-Schlüssel lycee.* bleiben).
  Hinter dem Haupthaus ein Innenhof mit Bogengängen, alter Linde mit Rundbank, Beeten, Sitzstufen und Gewächshaus;
  Nordflügel mit Aula (Bühne, Vorhang, Klavier, Kronleuchter) und Lesesaal (Bücherwände über zwei Etagen, Galerie);
  Glockenturm; Ecktürmchen, Gauben, Schornsteine und Schieferdach am Haupthaus; Neubau aus Holz und Glas mit Musik-,
  Kunst- und Informatikraum; Sportplatz mit Laufbahn, Fußballfeld und Tribüne. Gebäude erfunden – nur der Name ist echt.
  Oberflächen werden im Browser gemalt (texturen.js): Pflaster, Fliesen, Dielen, Rasen, Asphalt, Schiefer, Bücherrücken.
- **Mit Dingen etwas machen (interaktion.js):** Knopf bei nahen Dingen. Hinsetzen auf jedem Stuhl und jeder Bank,
  Snackautomat, Brunnen, Spind, Klavier, Keyboard, Schlagzeug, Bücher, Pinnwand, Gießkanne, Freiwürfe, Computer.
  **Arbeitsblatt am eigenen Platz** (Saal 1.04, Lesesaal): Blatt wählen → Papier mit Merkkasten, Lücken und < = >,
  prüfen, falsche nochmal; Fortschritt im Spielstand. Aufgaben aus den Kernkompetenz-Blättern der Toolbox
  (tools/lycee/blaetter-auszug.mjs → blaetter.js, nur eindeutige Lösungen) und das Paket der Lehrperson.
- **Fehler-Rundgang:** automatische Prüfung (Figuren in Wänden, Laufwege, große Dinge ohne Kollision); Stühle,
  Pflanzen, Laternen, Fahrräder, Bushaltestellen-Bank sind jetzt fest. Test: tests/lycee-interaktion.mjs.
- **„Kurz raus“ (⏸ / P):** jederzeit (außer mitten im Gespräch, aber während einer Mutprobe): Atmen oder 5-4-3-2-1.
- **Zweite Jugend-Kritik (17.11.2026, Schnitt 3,2):** 15 schwache Szenen neu (Noah am Bus, Sekretariat, Hoffmann, Bingo je Person verschieden, Mila auf der Bank, Kantinentische, Mathe-Test, Wochenende mit Doppel-Zusage, Telefon, zu spät, Werkstatt-Regeln, Sägen, Rückmeldung, Kenan am Bus); Logikfehler behoben (Mila im Klassenrat, Folgen zu früh gefragt,
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
- **Details und Atmosphäre** (details.js): eigene Plakate (eine Leinwand, ein Netz), Kreide auf den Tafeln, Wanduhren,
  Ranzen und Hefte in den Sälen, Hängelampen und Tabletts in der Kantine, Mülleimer, Pflanzkübel mit Sitzkante und
  Laubbäumen, Tischtennisplatte, weiche Kontaktschatten unter Möbeln, Fassade mit Fensterfaschen, Lisenen und Gauben.
  Neue Teile nur dort, wo nichts steht (`frei()`); die Prüfung (Figuren/Wege gegen Kästen) bleibt sauber.
- **Minispiele:** Freiwürfe am Korb; **Skateboard** in der Skate-Ecke (60 s, Schwung, Sprung mit Leertaste oder
  Knopf, Punkte für Ollies und Sprünge über Rail/Box/Bank, Rekord); **Tischtennis** an der Platte (im richtigen Moment
  tippen, drei Bälle, längster Ballwechsel zählt).
- **Gesprächsfäden** (faeden.js): elf Mitschülerinnen und Mitschüler mit je drei tieferen Gesprächen (Hobbys, Sorgen
  um Schule und Zukunft, Lampenfieber, Wut, zu laut, neu sein). Sie öffnen sich, wenn die Freundschaft wächst, höchstens
  eins pro Abschnitt. Niemand erzählt Privates aus der Familie. Im Journal unter „Menschen“ sichtbar.
- **Mathe-Training** (mathe.js): sechs vorläufige Module, 21 Blätter mit Erklärung, Tipps und immer neuen Zahlen am
  eigenen Platz. Dieselben Blätter als PDF in der Toolbox (tools/lycee/mathe-toolbox.mjs → mathe-3.json, DE/FR).

- **Feinschliff 22.11.2026 (Auftrag: ohne Cringe, sofort verständlich, realitätsnah):** Meme-Witze raus („Aura“ rund
  20-mal, Lehrerin macht keine Jugendsprache mehr nach), übriger Slang sparsam (Regel-Prüfung zählt mit). Zwei Lese-Runden
  wie eine kritische Jugendgruppe: rund 200 Zeilen ersetzt oder gestrichen – Erwachsene und Erzähler predigen nicht mehr
  (Merksätze am Ende von Besuchen und Situationen weg), Figuren erklären ihre Gefühle nicht, Fakten stimmen (Ayla spielt
  Bass, „Basket“ statt „Korbball“, keine „Eins plus“, Cannabis-Regel in Luxemburg, AirDrop statt Bild-Info, Serie 214 Tage),
  alte Namen im Text durch Mme Tidderich / Herr Kuedes ersetzt. Einstieg: Titelbild nennt das Rätsel, das Foto vom Morgen
  wird spürbar („Wer hat das Foto gemacht?“), Noah fragt am Kapitelende „bin ich da drauf?“.
  Geprüft und verworfen: Foto-Texturen (CC0, Poly Haven) für Pflaster, Rasen, Asphalt – im Vergleichsbild wirkte der
  Boden matschiger und blasser als die gemalten Flächen; die passen besser zum Stil.

## Dateien
`welt.js` Gebäude und Gelände · `requisiten.js` Modelle aufstellen · `figuren.js` Menschen (Skelett,
Sitzen) · `steuerung.js` Laufen und Kamera · `geschichte.js` Kapitel, Gespräche, Stärken ·
`ui.js` Oberfläche · `spiel.js` Kern · `details.js` Ausstattung · `faeden.js` Gesprächsfäden · `interaktion.js` Dinge benutzen · `mathe.js` Mathe-Training · `main.js`, `shell.html`, `stil.css`.

## Nächste Schritte
Phase 2 ausbauen (Aufgaben aus dem Hub, mehr Lernmomente); Phase 3 (Werkstatt: Arbeitssimulator DAP/CCP).
