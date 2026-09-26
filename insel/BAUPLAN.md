# LUMO – Bauplan (Arbeitspakete)

Reihenfolge und Abhängigkeiten für den Bau durch parallele Agenten. Zuerst entsteht die spielbare Hälfte (Module 0–3, Abnahme in WP55), danach der Rest.

## WP00 · Kern: Plugin-Autoload, Spielzustand, Speichern
- **Abhängig von:** –
- **Dateien:** build.mjs, src/core/*, src/_gen/ (generiert), src/game.js (nur Hook, <40 Zeilen), tests/unit/core.test.mjs
- **Umfang:** build.mjs erzeugt vor dem Bündeln src/_gen/plugins.js (alle src/**/plugin.js, sortiert nach export order, deps geprüft) und src/_gen/content.js (alle src/content/**/*.js außer schema/). game.js installiert Plugins nach dem Aufbau. Neu: core/state.js (game.state mit get/set/on, Event state:change), core/save.js (8 Slots, Versionsfeld, Migration, Autosave, Export/Import-Code ohne state.private, Wipe), core/content.js (Registry get/list), core/rng.js (seedbar pro Spielstand). postbuild-Hook: alle tools/postbuild/*.mjs ausführen.
- **Abnahme:** dist/index.html bleibt EINE Datei; tests/smoke.mjs grün; Dummy-Plugin und Dummy-Content werden ohne Importänderung geladen; Save-Roundtrip inkl. Export/Import im Unit-Test grün; Export enthält nachweislich keine private-Felder; Wipe löscht alle lumo.*-Schlüssel.

## WP01 · Content-Schemas, Validator, Text-Linter
- **Abhängig von:** WP00
- **Dateien:** src/content/schema/*, tools/validate-content.mjs, tools/lint-text.mjs, package.json (scripts validate, lint:text in npm test), tests/fixtures/*
- **Umfang:** Content-Schema (content_schema) als JS-Validatoren ohne Fremdbibliothek. tools/validate-content.mjs: Pflichtfelder, ID-Referenzen, Cond/Effect-DSL, Einheiten-IDs, negatives Echo ohne repair wird abgelehnt. tools/lint-text.mjs: SAY ≤12 Wörter, ≤2 Blasen vor einer Wahl, GLIMM ≤6, LABEL ≤5; Verbotsliste für Übungswörter (einatmen, ausatmen, Atemübung, Bodyscan, 5-4-3-2-1, Gedankenschiffchen, Traumreise, 4-7-8); jede Quest hat patch.back, echteWelt, debrief, glimm.
- **Abnahme:** Beispiele aus content_schema validieren; kaputte Fixtures werden mit deutscher Meldung (Datei, Pfad, Grund) abgelehnt; beide Skripte < 5 s.

## WP02 · Debug- und Szenario-Werkzeuge
- **Abhängig von:** WP00
- **Dateien:** src/debug/*, tests/lib.mjs (Erweiterung), tests/scenario.mjs, tests/perf.mjs
- **Umfang:** Debug-Plugin nur mit ?debug: Einheit freischalten/abschließen, Fähigkeit geben, Puls setzen, Zeit, Teleport zu Site, Schleier, Modus, Bindung. LUMO.debug.runScenario(steps). tests/lib.mjs: Helfer für Knopf halten, Kraft-Rad, Dialogwahl. tests/perf.mjs: Draw-Calls, Dreiecke, Frame-Zeit je Region auf low.
- **Abnahme:** Beispielszenario läuft headless durch; perf.mjs meldet je Zone Werte; ohne ?debug keine Debug-UI.

## WP10 · Grauschleier-Erweiterung
- **Abhängig von:** WP00
- **Dateien:** src/world/veil.js, tests/unit/veil.test.mjs
- **Umfang:** veil.js: MAX_ZONES 12 (8 Zonen + 4 Flecken); addPatch/setPatch/removePatch; Teilwerte mit sanftem Übergang; restoreZone(id,{amount}) für Teil-Farbwellen; relapse(id) als blaugraue Welle nach innen (Schleier-Rückfall); CPU-amountAt identisch zur GLSL-Formel; getState/setState inkl. Flecken.
- **Abnahme:** Screenshots von Teilwelle und Rückfall; amountAt weicht an 200 Punkten < 0,02 vom GLSL-Nachbau ab; Mehrkosten < 0,5 ms auf low.

## WP11 · Gelände und Gewässer
- **Abhängig von:** WP00, WP10
- **Dateien:** src/world/island.js, src/world/water.js, src/world/vegetation.js, src/world/terrain.js, tests/unit/island.test.mjs
- **Umfang:** island.js: Zone moor (-114/68, r 26) als Senke 1,2–2,4 m mit Torfbecken und Bohlenweg vom Weg hafen-markt; Quellental-Terrassen (≈54/-30) mit 3 Becken; Mangroven-Lagune (≈150/-8); 2 Gezeitenbecken mit animiertem Pegel; generische WATER_BODIES ersetzen den POOL-Sonderfall in waterLevel(); alle SITES aus DESIGN §11. water.js rendert Wasserkörper (Moor dunkel, Quellen mit Dampf). vegetation.js: Schilf, Moorbirke, Heide (lila, schleierabhängig), Mangrove (kletterbar markiert), Farn.
- **Abnahme:** Smoke grün; Moor-Mittelhöhe 1,2–2,6 und auf Bohlen begehbar; Pegel per API 0,2–1,8 m sichtbar änderbar; Screenshots aller neuen Orte Tag/Nacht; Terrain-Dreiecke auf low +<10 %.

## WP12 · Bewegungs-Zustandsmaschine
- **Abhängig von:** WP00
- **Dateien:** src/actors/player.js, src/actors/moves/{index,ground,carry,pump}.js, tests/unit/moves.test.mjs
- **Umfang:** player.js als Zustandsmaschine (ground, air, climb, glide, swim, dive, carry, locked) mit Move-Modulen. Enthält: Sprint, Pumpsprung (Springen am Boden halten ≥0,5 s, Event player:pump), Tragen mit Schwappwert 0–1 (Event carry:spill), player.setModifiers({grabTolerance, glideStability, haltRegen}), Respawn an letzter sicherer Kante < 2 s. Keine Eingabeverzögerung.
- **Abnahme:** Laufen/Springen unverändert (Smoke + Vergleichs-Screenshots); Pumpsprung ≥ 2,2× Sprunghöhe; Sprint+Landung verschüttet ≥ 30 %, vorsichtiges Gehen < 5 %; Lava-Respawn < 2 s.

## WP13 · Gefühlssegel (Gleiten)
- **Abhängig von:** WP12, WP19
- **Dateien:** src/actors/moves/glide.js, src/actors/segel.js, src/world/updrafts.js, src/world/runes.js
- **Umfang:** Springen in der Luft halten öffnet ein prozedurales Segel aus 6 Federbahnen. Modi: freude Aufwind, wut Schub (bricht Dornen), angst Zeitlupe 0,5 mit leuchtenden Fallen, trauer Sturzflug ins Wasser (löst dive aus), ekel durch Sporen, ueberraschung 2 s Schweben. Kombis ab e10. Rune-Tore schalten in Entspannt/Abenteuer automatisch (Farbblitz, Vogelruf), in Profi wählt man im Kraft-Rad. Aufwindsäulen inkl. Krater bis 110 m. Wackeln nur über glideStability, in Entspannt rein optisch.
- **Abnahme:** Vom Baumhaus-Podest ≥ 60 m Gleitweite; Krater-Aufwind hebt auf 100 m; Rune schaltet in < 0,2 s; Dornen brechen nur mit wut; ≥ 30 fps auf low über dem Dschungel.

## WP14 · Klettern und Halt-Ring
- **Abhängig von:** WP12, WP21
- **Dateien:** src/actors/moves/climb.js, src/world/climbables.js, src/ui/haltring.js
- **Umfang:** Registry kletterbarer Flächen (Fels mit Griffspuren, Lianen, Mangrovenwurzeln, Turm). Auto-Greifen; Springen = Klettersprung (−1 Segment); Aktion = loslassen. Halt-Ring aus state.wurzeln (Basis 3, max 12), Regeneration auf Simsen, leer = langsames Abrutschen statt Sturz. HUD-Ring mit Segmentformen, damit er ohne Farbsehen lesbar ist.
- **Abnahme:** 40-m-Testwand: mit 5 Segmenten frei, mit 3 nur auf der Hauptroute; nie Sturz bei leerem Ring; nur mit Joystick, Springen und Aktion bedienbar.

## WP15 · Schwimmen und Tauchen
- **Abhängig von:** WP12, WP11, WP18
- **Dateien:** src/actors/moves/swim.js, src/actors/moves/dive.js
- **Umfang:** Tiefes Wasser wird schwimmbar (MAX_WADE-Sperre ersetzt, WORLD_LIMIT bleibt), Delfinsprung, keine Ausdauer, kein Ertrinken. Tauchen über Ringe oder Trauer-Sturzflug als Übergang in einen Unterwasser-Innenraum mit 3D-Schwimmen, blauem Nebel und automatischem Auftauchen.
- **Abnahme:** Vom Strand zur Felsnadel schwimmbar; Tauchring am Tränensee führt in eine Testgrotte und zurück; Timeout verhindert Feststecken.

## WP16 · Avatar-Parität und Kosmetik-Meshes
- **Abhängig von:** WP00
- **Dateien:** src/actors/humanoid.js, src/actors/humanoid/{index,head,body,cosmetics,patches}.js, tests/avatar-grid.mjs
- **Umfang:** humanoid.js in Module aufteilen (Re-Export bleibt). 16 Hauttöne; Frisuren inkl. Kopftuch, Locs, Flechtzöpfe, Buzz; Sommersprossen, Vitiligo; Brille, Hörgerät, Armprothese links/rechts; Regler für Statur und Größe; Kleidungsschichten (Kopf, Oberteil, Unterteil, Schuhe); Muster; Aufnäher-Raster (bis 39 Icons); Tiermasken; Crew-Jacke. NPCs nutzen dieselbe Pipeline.
- **Abnahme:** Screenshot-Raster aller Frisuren × 4 Hauttöne und aller Hilfsmittel ohne Clipping; ≤ 6k Dreiecke pro Figur; alte Konfigurationen bleiben gültig.

## WP17 · Körpersprache, Emotes, Aura-Shader
- **Abhängig von:** WP16
- **Dateien:** src/actors/humanoid/{poses,emotes,aura}.js, tests/bodylang-sheet.mjs
- **Umfang:** Additive Posen (shoulderUp, headDown, gazeAway, fistClench, armCross, stepBack, jawTension, fidget, slump, upright); Emotes (winken, Schulterzucken, Stopp-Hand, Hand heben, nicken, Kopfschütteln, Daumen, Sitzen-neben, lachen, 3 Tänze). Aura mit 2 Farben als Wirbel, Intensitätsringe 0–10, Innen/Außen, Grenz-Decal, Körpersignal-Hotspots, 6 Tank-Säulen, Streit-Tier-Symbol, Emotions-Symbole für Farbenblinde. setEmotionAura bleibt kompatibel.
- **Abnahme:** Bodylang-Bogen (12 Posen × 2 Abstände, iPad-Auflösung): Team-Review erkennt ≥ 10/12 eindeutig; 12 Auren zugleich < 1 ms GPU-Mehrkosten auf low.

## WP18 · Szenen-System und Raum-Baukasten
- **Abhängig von:** WP00
- **Dateien:** src/world/scenes.js, src/world/roomkit/*
- **Umfang:** Szenenstapel Oberwelt/Innenraum mit Überblendung (0,6 s), eigener Kollisionsgruppe, Licht-Presets, Spawn und Ausgang; die Oberwelt pausiert. Räume aus RoomDef-Daten: Höhle, Tempel, Turmetage, Kugel, Werkstatt, Lichtkammer (3 Räume), Unterwasser, Baumhaus-Innenraum.
- **Abnahme:** 10× betreten/verlassen, Heap stabil ± 5 MB; Übergang < 1 s auf low; Pause funktioniert innen; Kamera kollidiert mit Wänden.

## WP19 · Eingabe, Kraft-Rad, Kamera-Modi
- **Abhängig von:** WP00, WP21
- **Dateien:** src/engine/input.js, src/actors/camera.js, src/ui/kraftrad.js, src/ui/photomode.js
- **Umfang:** Tippen/Halten-Erkennung (< 0,25 s), Tasten 1–4, Tab, Q tippen/halten. Kraft-Rad: 4 Segmente, gesperrte grau mit Schloss, Zeitlupe 25 %, im Profi-Flug zusätzlich 6 Federn. Kamera-Modi follow, glide, climb, talk, photo (Filter, Zuschnitt, Bild nur lokal). Reduzierte Effekte dämpfen Wackeln.
- **Abnahme:** Mit einem Daumen bedienbar, Segmente ≥ 72 px; Tippen und Halten eindeutig; Smoke ohne Regression.

## WP20 · Audio, Musik-Schichten, Vorlesen
- **Abhängig von:** WP00
- **Dateien:** src/engine/audio.js, src/engine/music.js, src/engine/speech.js
- **Umfang:** music.js: 4 Schichten je Region, abhängig vom Schleier, Puls färbt Filter/Tempo leicht, 6 Vogel-Leitmotive, Klangmuschel mit exakter Dauer, Brandungsorgel, Klarklang-Akkorde (konsonant/dissonant), Jukebox-Loops. speech.js: speechSynthesis de-DE mit Warteschlange, Tempo 0,95, Auto-Vorlesen, Glimm stumm. Limiter, Pegelgrenzen, Herzschlag abschaltbar.
- **Abnahme:** OfflineAudioContext-Test: keine Spitze > −6 dBFS, kein Sprung > 12 dB in 100 ms; Vorlesen auf iPad-Safari manuell geprüft; Schichtwechsel ohne Knacken.

## WP21 · UI-Framework und Barrierefreiheit
- **Abhängig von:** WP00
- **Dateien:** src/ui/{bubbles,choices,overlay,a11y}.js, src/ui/journal/*, src/ui/hud.js (Erweiterung), src/styles.css (neue Abschnitte)
- **Umfang:** Sprechblasen (≤ 12 Wörter, Vorlese-Knopf, Figur-Icon und Farbe), Auswahl-Kacheln (Icon + ≤ 6 Wörter), Overlay-System mit Pause/X überall, Tagebuch-Hülle mit Seiten-Registry, Hüllen für Recap und Lagerfeuer, Einstellungen (großer Text, reduzierte Effekte, Auto-Vorlesen, Glimm stumm, Modus).
- **Abnahme:** DOM-Test: jedes Overlay hat Pause/X; Kontrast ≥ 4,5:1; Touch-Ziele ≥ 64 px; hoch und quer ohne Überlappung.

## WP30 · Codes, Kurzfassung, Lehrer-Modus, Lehrerheft
- **Abhängig von:** WP00, WP01, WP21
- **Dateien:** src/systems/codes/*, src/ui/teacher/*, src/content/wordlist.js, tools/postbuild/lehrerheft.mjs
- **Umfang:** Wortliste (256 Wörter ohne Umlaute); Code = WORT-WORT-ZZ aus gesalzenem FNV-Hash über salt+art+id. Arten: 39 Einheiten, 10 Module, Demo, Lehrer, 3 Inselwetter. Eingabe mit Vorschlägen und Zahlenrad. Freischalt-Nutzlast aus QuestDef.grants. Kurzfassung für frühere Einheiten ohne Code. j08 nur in der Lehrer-Liste. Lehrer-Panel: Codes, Inselwetter, Lines & Veils, Umbenennen, Gefühlsrad-Farben, eingelöste Codes. postbuild erzeugt dist/lehrerheft.html (Codes, Ziele, Rückseiten, Debrief, Echte-Welt).
- **Abnahme:** Alle 55 Codes eindeutig; Groß/Klein egal; falscher Code gibt eine freundliche Meldung ohne Hinweis; nur Code j1-e11 → Puls aktiv, e01–e10 als Kurzfassung mit allen Fähigkeiten; Lehrerheft enthält 39 Einheiten; Panel ohne Lehrer-Code unerreichbar.

## WP31 · Quest-Engine, Vorlagen, Taten-Log, Echos
- **Abhängig von:** WP00, WP01, WP10, WP21
- **Dateien:** src/systems/quests/*
- **Umfang:** Zustände gesperrt/kurz/offen/aktiv/fertig; Schritte mit Vorlage und Parametern; Marker; Belohnungen; Aufnäher mit Rückseite; Glimm-Zeile; Echte-Welt-Karte. 12 Vorlagen (wegTor, tragen, szene, ermitteln, treppe, befreunden, lotsen, boss, bauen, pruefung, nachtwache, erinnerung). Hinweisleiter (2 → Puls −20 + Rückenwind-Objekt, 3 → Glimm, 5 → Ziel leuchtet, 8 → Überspringen). Taten-Log lokal. Echos nur positiv oder mit Reparatur. Teil-Farbwelle pro Einheit.
- **Abnahme:** Beispiel-Quest j1-e11 läuft headless; jede Vorlage hat einen Minimaltest; Hinweisstufen feuern bei simulierten Fehlschlägen.

## WP32 · Dialog-Engine
- **Abhängig von:** WP00, WP01, WP20, WP21
- **Dateien:** src/systems/dialogue/*
- **Umfang:** Datengetriebene Szenen. Sichtbare Wahlen nach Puls (grün 4, gelb 3, rot 2) plus immer Rückzug und ab e11 Hilfe holen. NPC-Hitze mit 'Deckel ab' über 70. Zurückspulen immer an (stellt Hitze, Bindung und Flags wieder her). Lauschen-Knoten (Bewegung oder Tippen bricht ab). Satz-Bau-Knoten öffnet das Minispiel. Zeichen-Kanal. Kamera-Rahmung. Alle Zeilen vorlesbar.
- **Abnahme:** Szene e11-luc-kante spielbar; bei Puls 85 genau 2 Wahlen + Rückzug + Hilfe; Zurückspulen exakt (Unit-Test); Lauschen bricht bei Joystick ab.

## WP33 · Puls, Glimm, Skills-Koffer, Sicherer Ort
- **Abhängig von:** WP12, WP18, WP20, WP21, WP31
- **Dateien:** src/systems/puls/*, src/systems/koffer/*, src/actors/glimm.js, src/scenes/sicherer-ort.js
- **Umfang:** Puls 0–100 ab e11: Quellen/Senken-API, Zonen-Effekte je Modus über setModifiers, gedeckelte Vignette, Anti-Spirale (Fehlschlag-Anteil ≤ 55; 2 Fehlschläge → −20), Co-Regulation. glimm.js: Salamander mit 3 Skins, Farbe = Puls, Zeilen-Queue ≤ 6 Wörter, stummschaltbar. Koffer: 5 Fächer, GadgetDefs, Faktor pro Spielstand 0,7–1,3, Tester (vorher/nachher, Reichweite), Ampelplan, Kopf-Gadgets verpuffen bei Rot, Notfall-Slot. Sicherer Ort als Taschenwelt-Baukasten über das Pause-Menü.
- **Abnahme:** 10 Fehlschläge hintereinander heben den Puls nie über 55; Entspannt ändert keine Steuerparameter; Kopf-Gadget verpufft sichtbar bei 80; Hilfe holen bei jedem Puls verfügbar; Sicherer Ort < 1 s, danach Puls 10.

## WP34 · Figuren-System
- **Abhängig von:** WP00, WP16, WP17
- **Dateien:** src/systems/npc/*
- **Umfang:** Spawn aus NpcDef mit Namensschild (Icon, Farbe); Tagesablauf-Wegpunkte; Gefühlsmodell (6 Gefühle, 0–10, Zweitgefühl, maskiert innen); 6 Tanks (Wunsch +40, am Morgen zurück; Bedürfnis hält 7 Tage); Grenz-Radius nach Bindung und Stimmung; Streit-Stil je Gegenüber; Bindung 0–3 mit Fähigkeit auf Stufe 2, nie dauerhaft sinkend, 'verstimmt' mit Reparatur-Hook; Körpersprache aus dem Gefühlsmodell; Mäxchen-Tells; höchstens 12 animierte Figuren in Sicht, Rest als Impostor; Umbenennung.
- **Abnahme:** Hafen mit 14 Figuren ≥ 30 fps auf low; Unit-Tests für Tank-Dynamik und Bindung, die nie dauerhaft sinkt; umbenannte Namen erscheinen überall.

## WP35 · Kräfte und Tor-Bausteine
- **Abhängig von:** WP19, WP31, WP33, WP17
- **Dateien:** src/systems/abilities/*, src/props/gates/*
- **Umfang:** Blick (Stufen auren, faeden, tanks, koerper, doppel, grenzen, streittiere, masken; Profi ohne Farben). Mut: Klarklang über Satz-Bau; Stopp-Schild mit 4 Lichtern aus 2 Eingaben (stillstehen und zielen, Kraft halten, im Ring loslassen; Lächeln oder Bewegung schwächt). Teamgeist: Crew-Ruf, Hilfe holen, zweites Nein, Zuschauer. Tore: dornenwand, tauchring, klangtor, gezeitentuer, runentor, spalt, aufwindfaecher, fluesterstein, windschatten, kaeltefeld, heizring, orbfeld, bohle – jedes zeigt das Symbol seiner Fähigkeit.
- **Abnahme:** Gesperrte Tore zeigen ihr Symbol; Stopp-Fenster ±250/±150/±100 ms je Modus; Crew-Helfer erreichen ihr Ziel in < 10 s.

## WP36 · Minispiel-Hülle, Rennen, Rhythmus
- **Abhängig von:** WP00, WP12, WP21
- **Dateien:** src/minigames/shell/*, src/minigames/rennen/*, src/minigames/rhythmus/*
- **Umfang:** Hülle: Startkarte (Icon, 1 Satz, Moduswahl), Bronze/Silber/Gold und versteckter Leuchtstern, Neustart < 1 s, Rückenwind-Angebot nach 3 Fehlversuchen, lokale Bestwerte, Geist der Bestzeit. Vorlagen: rennen (Lauf, Klettern, Segeln, Boot) und rhythmus (halten/loslassen).
- **Abnahme:** Hafen-Dächer und e11-Tauziehen aus Beispiel-Configs spielbar; Leuchtstern wird nirgends angekündigt; Rückenwind nur als Angebot.

## WP37 · Minispiele Satz-Bau und Duell
- **Abhängig von:** WP36, WP20
- **Dateien:** src/minigames/satzbau/*, src/minigames/duell/*
- **Umfang:** satzbau mit Regelsets klarklang (4 Slots, Dornen = Dissonanz), schmiede (6 Regeln → Brettphysik: Glas bricht, Zukunft zu spät, nicht/passiv trägt nicht, 'Ich lerne' wächst), kompliment, zusammenfassung, kommentar, nein-vorschlag; Kacheln vorlesbar, Ton-Vorschau. duell: Reflex-Konterkarten mit 10 Arena-Runden.
- **Abnahme:** Die Beispiele e21-klarklang-noor und e18-schmiede liefern die richtigen Ergebnisse (Unit-Test für jede Regel); jede Kachel ist vorlesbar.

## WP38 · Minispiele Verteidigung und Lotsen/Schleichen
- **Abhängig von:** WP36, WP35
- **Dateien:** src/minigames/verteidigung/*, src/minigames/lotsen/*
- **Umfang:** verteidigung: Wellen von Klammer-Geistern, die nachhaken und auf den Stopp reagieren. lotsen: Symbolbefehle mit Stopp-Recht, Folgen-Modus mit Stereo und sichtbaren Lichtpunkten, Blickkegel, Radien-Durchquerung mit Laternen.
- **Abnahme:** Garten-Wächter und Hafengrotte spielbar; die Grotte funktioniert ohne Ton allein über visuelle Hinweise.

## WP39 · Minispiele Bauen/Ordnen und Muschel-Mäxchen
- **Abhängig von:** WP36, WP34
- **Dateien:** src/minigames/bauen/*, src/minigames/wuerfel/*
- **Umfang:** bauen: Raster und Physik für Tank-Leitungen, Kettenreaktion, Land-Art (dauerhaft in der Welt), Rückwärts-Planer, Regie-Modus mit Share-Code, Tischordnung. wuerfel: Mäxchen mit Figuren-Tells, Stärke der Tells je Modus.
- **Abnahme:** Regie-Share-Code spielt die Szene auf einem anderen Gerät ab (ohne Personendaten); jede Figur zeigt beim Mäxchen ihren Tell.

## WP40 · Baumhaus
- **Abhängig von:** WP18, WP31, WP33
- **Dateien:** src/systems/baumhaus/*, src/scenes/baumhaus.js
- **Umfang:** Innenraum und Außenpodest; Möbel platzieren (Raster); Stärken-Bonsai (Früchte aus dem Taten-Log, Äste aus Sätzen); Jukebox-Komponist; Glas mit anonymen Muscheln und Glühwürmchen, nur auf dem Gerät; Tür zum Sicheren Ort; Chronik-Pinnwand; Trophäenwand; Spiegel zum Stil-Studio; Mäxchen-Tisch; Hängematte.
- **Abnahme:** Alle Stationen erreichbar; der Bonsai wächst sichtbar mit dem Log; der Inhalt des Glases fehlt im Export-Code.

## WP41 · Stil-Studio und Kosmetik
- **Abhängig von:** WP16, WP21
- **Dateien:** src/ui/stil/*, src/systems/cosmetics/*
- **Umfang:** Editor mit Drehteller-Vorschau (Körper, Haare, Gesicht, Hilfsmittel, Kleidung, Muster, Farben), erzeugter Spielname, Kosmetik-Inventar aus CosmeticDefs, Anlegen von Segel-, Glimm-, Masken- und Emote-Skins.
- **Abnahme:** Erster Start: Avatar in < 2 min fertig; hoch und quer bedienbar; freigeschaltete Kosmetik erscheint sofort.

## WP42 · Sitzungsfluss und Welt-Systeme
- **Abhängig von:** WP31, WP34, WP21
- **Dateien:** src/systems/session/*, src/systems/collectibles/*, src/systems/nachtwache/*, src/ui/map/*
- **Umfang:** Recap 'Letztes Mal' (3 Bildkarten, 15 s, überspringbar); Abend am Feuer (bis zu 3 Figuren mit Tat-Zeile, Bester Moment, Cliffhanger, Speichern); Signalfeuer; Modi; Nachtwache-Scheduler; Sammelsachen (Lichtsplitter, Muscheln, Aussichtspunkte mit 8 s Stillstand, Nebelkerne, Knobel); Karte mit Nebelkacheln und Teasern; Jahreszeit-Paletten pro Modul; Inselwetter-Events.
- **Abnahme:** Szenario: Start, Recap, Ziel in < 3 min, Beenden, Feuer, Speichern; Nachtwache startet nur nachts in befreiten Regionen; Ruhewetter halbiert den Puls für 20 min.

## WP43 · Requisiten-Baukasten
- **Abhängig von:** WP00, WP10
- **Dateien:** src/props/kit/*
- **Umfang:** Prozedurale, schleierfähige Props aus geom.js: Signalfeuer, Laternen, Gezeiten-Tanks, Marktstände, Flüstersteine, Fakten-/Urteilskristalle, Planken, Windräder/Drachen, 6 Gefühlsvögel (schlank, kantig, leuchtende Kanten), Glimmer-Inseln und -Kugeln, Menhire, Orgel, Grisel, Titan-Wolkenkörper. Instancing wo möglich.
- **Abnahme:** Galerie-Screenshot aller Props; Vögel bestehen den Review 'cool, nicht süß'; jedes Prop < 3k Dreiecke oder instanziert.

## WP50 · Inhalt M0 Hafen + j07
- **Abhängig von:** WP31, WP32, WP34, WP35, WP36, WP38, WP42, WP43
- **Dateien:** src/content/regions/hafen.js, src/content/npcs/{ilda,jolie,tun,senait}.js, src/content/quests/j1-e01..e03.js, j1-j07.js, src/content/dialogues/hafen-*.js, src/content/minigames/hafen-*.js, src/content/rooms/hafengrotte.js, src/regions/hafen/*
- **Umfang:** RegionDef hafen; NPCs ilda, jolie, tun, senait + Dorfleute; Quests j1-e01..e03 und j1-j07 mit Kurzfassungen; Dialoge; Hafen-Kodex-Kacheln und Weltverhalten; Laternenfest; Hafengrotte; Rennen Hafen-Dächer; Kistenkammer; Nachtwache-Varianten; Aufnäher.
- **Abnahme:** tests/scenarios/m0.mjs spielt Code → Quest → Farbwelle → Aufnäher durch; validate und lint grün; Schleier Hafen 0,6 → 0; erstes Erfolgserlebnis in < 3 min.

## WP51 · Inhalt M1 Strand
- **Abhängig von:** WP50, WP11, WP14, WP15
- **Dateien:** src/content/**/strand*, src/content/quests/j1-e04..e06.js, src/content/npcs/tiago.js, src/content/rooms/gezeitenhoehle.js, src/regions/strand/*
- **Umfang:** RegionDef strand + Fleck mangrove; tiago; j1-e04..e06; Tank-Wasser; Gezeitenhöhle mit Brandungsorgel; Spiegelbecken; Mangrove kletterbar; Gezeitenkammer; Rennen Mangrove; Nebelkern.
- **Abnahme:** Szenario m1 grün; Wunsch/Bedürfnis bei Tiago beobachtbar; Spiegelbecken-Daten bleiben privat.

## WP52 · Inhalt M2 Dschungel + j01
- **Abhängig von:** WP51, WP13
- **Dateien:** src/content/**/dschungel*, src/content/quests/j1-e07..e10.js, j1-j01.js, src/content/npcs/maelle.js, src/regions/dschungel/*
- **Umfang:** RegionDef dschungel; maelle; 6 Vögel mit Befreundungsregeln; j1-e07..e10, j1-j01 (Traumschiff-Szene); Federtempel; Bootsrennen; Muschelgrotte; Kronendorf-Plattformen; Trommelfest; Festringe; Federkammer.
- **Abnahme:** Szenario m2 grün; jede Befreundungsregel hat einen Test; der Fallentempel ist ohne Angst-Feder nicht lösbar.

## WP53 · Inhalt M3 Klippen + j06 + j09
- **Abhängig von:** WP52, WP33
- **Dateien:** src/content/**/klippen*, src/content/quests/j1-e11..e15.js, j1-j06.js, j1-j09.js, src/content/npcs/{luc,jhemp}.js, src/content/gadgets/*, src/regions/klippen/*
- **Umfang:** RegionDef klippen; luc, jhemp; j1-e11..e15, j1-j06, j1-j09; Windschatten-Route; Tauziehen; Skills-Labor und Tester; Klangschlucht; Gedankenschlucht; Titan mit 3 Phasen und Puls-Deckel 80; Blitzableiter-Kammer; Sturmlauf.
- **Abnahme:** Szenario m3 grün; der Titan ist in Entspannt ohne Treffer schaffbar; der Puls überschreitet 80 nie.

## WP54 · Herzglas-Chronik und Erinnerungen
- **Abhängig von:** WP31, WP40, WP43
- **Dateien:** src/content/memories/*, src/systems/chronik/*
- **Umfang:** 9 MemoryDefs mit Dioramen (Gefühls-Tönung, Bildunterschrift ≤ 12 Wörter), Chronik-Pinnwand mit freiwilligen Widersprüchen und Warum-Slots, Grisel (Silhouette ab M3, Finale-Zustände), Cliffhanger-Pool für das Lagerfeuer. Zuerst die Splitter 1–4.
- **Abnahme:** Die Chronik ist ohne Lesen verständlich (Bildtest mit dem Team); keine Erinnerung stellt einen Ausbruch als Ursache des Graus dar.

## WP55 · Vertical-Slice-Abnahme M0–M3
- **Abhängig von:** WP50, WP51, WP52, WP53, WP54
- **Dateien:** tests/scenarios/m0..m3.mjs, docs/vs-protokoll.md
- **Umfang:** Integration von M0–M3 mit j01, j06, j09. ?nosel blendet Rückseiten, Echte-Welt und Glimm-Zeilen aus, um den reinen Spaß zu testen. Performance, Lesetest, Sicherheits-Checkliste §19. Spieltest mit 3–5 Jugendlichen durch die Lehrkraft. Befunde als Aufgaben. Freigabe durch die Lehrkraft vor WP56 und danach.
- **Abnahme:** 30-min-Dauerlauf ohne Fehler auf iPad; ≥ 30 fps in 4 Regionen; Checkliste vollständig; Spieltest-Protokoll liegt vor; kritische Befunde behoben.

## WP56 · Inhalt M4 Moor + j02
- **Abhängig von:** WP55, WP37
- **Dateien:** src/content/**/moor*, src/content/quests/j1-e16..e19.js, j1-j02.js, src/content/npcs/{pit,fraenz}.js, src/regions/moor/*
- **Umfang:** RegionDef moor; pit, fraenz; j1-e16..e19, j1-j02; Flüstersteine; Domino-Szenen; Stille Lichtung (privat, keiner davon voreingestellt); Steinriese als Gericht; Schmiede-Brücke; Krähen-Arena; Probelauf; Beweis-Zähler; Pechsträhne-Regatta mit offen unfairen Seeds.
- **Abnahme:** Szenario m4 grün; der eigene Stein flüstert nie und fehlt im Export; die Glasbrücke bricht reproduzierbar.

## WP57 · Inhalt M5 Markt + j05
- **Abhängig von:** WP55, WP38, WP39
- **Dateien:** src/content/**/markt*, src/content/quests/j1-e20..e23.js, j1-j05.js, src/content/npcs/{noor,lucinda}.js, src/regions/markt/*
- **Umfang:** RegionDef markt; noor, lucinda; j1-e20..e23, j1-j05; Stummer Markt; Beschreiben-und-Bauen; Emoji-Brett; Lesebrille; Klarklang-Fall; Grenz-Gärten; Stopp-Garten; Theater mit Regie-Modus; Klangkammer.
- **Abnahme:** Szenario m5 grün; Stopp-Schild mit Lächeln ist schwach, sonst stark (Test).

## WP58 · Inhalt M6 Vulkan und Rückfall
- **Abhängig von:** WP55
- **Dateien:** src/content/**/vulkan*, src/content/quests/j1-e24..e26.js, src/content/npcs/mika.js, src/regions/vulkan/*
- **Umfang:** RegionDef vulkan; mika; j1-e24..e26; Rückfall-Flecken; Friedenstreppe mit Abrutschen und Kontrolltag-Echo; Streit-Tiere je Gegenüber; Schreiduell; Mutprobe mit Ringen und Nein-Zügen; zweites Nein aus Bindungen (immer jemand); Schatten-Chor mit Leiter; Ilda handelt ohne Beweis; Helpline-Tafeln; Lines & Veils.
- **Abnahme:** Szenario m6 grün; e26 ohne Sprosse 6 gewinnbar; der Gehen-Ausgang ist in e25 immer offen; Lines & Veils ersetzt e26 durch die Kurzfassung.

## WP59 · Inhalt M7 Glimmerwolke + j03
- **Abhängig von:** WP55, WP13
- **Dateien:** src/content/**/glimmer*, src/content/quests/j1-e27.js, j1-e28.js, j1-j03.js, src/content/npcs/{yara,kim}.js, src/regions/glimmer/*
- **Umfang:** Fleck glimmer; 7 schwebende Inseln als Oberflächen-Collider; yara, kim; j1-e27, j1-e28, j1-j03; Orb-Sog mit Zeitsprung; Scroll-Strudel; Zeit-Schätzen; Foto-Rätsel; Kommentar-Lampen; Einstellungen mit Dauerwirkung; Repost-Kette; Teilen-Bremse färbt die Karte; Echokammer; KI-Abwägung; Kontrollraum als Algorithmus.
- **Abnahme:** Szenario m7 grün; ≥ 30 fps auf low auf den Inseln; Teilen ist reparierbar.

## WP60 · Inhalt M8, M9 Finale + j04 + j08
- **Abhängig von:** WP56, WP57, WP58, WP59
- **Dateien:** src/content/**/quellen*, src/content/quests/j1-e29.js, j1-e30.js, j1-j04.js, j1-j08.js, src/content/rooms/leuchtturm-*.js, src/regions/leuchtturm/*
- **Umfang:** Fleck quellen; j1-e29 (Rucksack, Stationen, Müdigkeit ohne Eingabeverzögerung, Wenn-dann), j1-e30 (Chronik-Auflösung, Turm mit 9 Etagen, Grisel anhören, Crew-Jacke, Jahreskurve, Flaschenpost aus Kacheln, restoreAll), j1-j04 (Frühling, Stille Pfade, Land-Art), j1-j08 (nur Lehrer-Code, ohne Timer und Wertung).
- **Abnahme:** Ganze Staffel per Szenario durchspielbar; im Finale erscheint niemand als 'fehlend'; j08 ist ohne Lehrer-Code unsichtbar.

## WP61 · Lehrerheft-Inhalte und Transfer-Karte
- **Abhängig von:** WP30
- **Dateien:** src/content/quests/* (Felder debrief, kursziele), tools/postbuild/lehrerheft.mjs (Layout)
- **Umfang:** Für alle 39 Einheiten: Einheit → Mechanik → Kursziele aus skills-kurs-j1.json → Rückseite → Glimm → Debrief → Echte-Welt. Lückenprüfung aller Kursziele, insbesondere e22 (Nein ohne Worte), e24 (Stil vom Gegenüber), e28 (KI Nutzen/Risiken).
- **Abnahme:** Das Lehrerheft deckt jedes Ziel ab (Skript vergleicht mit dem Kurs-JSON); druckbar auf A4.

## WP62 · QA, Sicherheit, Performance (laufend)
- **Abhängig von:** WP02
- **Dateien:** tests/*, tools/*
- **Umfang:** CI: validate, lint:text, smoke, perf, Szenarien. Sicherheits-Linter: jedes Overlay hat X, keine Jumpscare-Pegel, Wortliste, Lines-&-Veils-Flags. iPad-Geräteprüfung vor jeder Modul-Abnahme.
- **Abnahme:** Jeder Pull Request grün; Budgets aus DESIGN §20 werden in perf.mjs erzwungen.
