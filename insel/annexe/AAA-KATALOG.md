# AAA-Katalog – alle Facetten eines großen Spiels, geprüft für „Annexe Junglinster“

Zweck: Nicht einzelne Techniken herauspicken, sondern das ganze Spiel so betrachten, wie ein großes Studio es tut.
Jeder Punkt bekommt einen Stand und – wenn sinnvoll – 2–3 Runden (bauen → kritisch prüfen → verbessern).

Stand: ✅ da · 🟡 halb · ❌ fehlt · ➖ nicht sinnvoll für ein ruhiges Schulspiel (Grund steht dabei)
Runden: R1 gebaut · R2 geprüft/verbessert · R3 zweite Verbesserung

(Entwurf aus eigener Kenntnis; wird mit der Online-Recherche zusammengeführt und dann Punkt für Punkt geprüft.)

## 1. Einstieg und erster Eindruck
- Titelbild mit lebender Szene im Hintergrund (Kamerafahrt, Musik) statt leerem Menü
- Ladebildschirm mit Fortschritt und Tipps / Story-Häppchen
- Erster Start: Sprache, Textgröße, Vorlesen, Steuerung – einmal kurz abfragen (Barrierefreiheit von Anfang an)
- Die ersten 2 Minuten: sofort spielen statt lesen; Geheimnis/Haken in der ersten Szene
- Tutorial im Spiel versteckt („lerne beim Tun“), jede Taste genau dann erklärt, wenn man sie braucht
- Steuerungshinweise verschwinden, sobald man sie beherrscht, und kommen wieder, wenn man lange nichts tut
- Figurenerstellung: Aussehen, Kleidung, Name – mit Vorschau in 3D

## 2. Steuerung und Spielgefühl („Game Feel“)
- Beschleunigen/Abbremsen mit Trägheit, kein Ruckeln beim Richtungswechsel
- Gehen/Joggen/Rennen stufenlos über den Stick; Analog-Stick-Totzone
- Wegfinden um Hindernisse (Rutschen an Wänden statt Hängenbleiben)
- Treppen/Stufen weich, Füße auf dem Boden (Fuß-IK)
- Interaktion mit Vorrang-Logik (das, worauf man schaut, gewinnt)
- Eingabepuffer (Taste kurz vor Ende einer Animation zählt)
- Rückmeldung bei jeder Eingabe: Ton, kleine Animation, Vibration
- Gamepad-Unterstützung mit passenden Symbolen; Tastenbelegung frei änderbar
- Touch: Joystick, große Knöpfe, Gesten; Linkshänder-Modus
- Kein Input-Lag; 60 fps-Ziel, stabile Bildzeit

## 3. Kamera
- Kamera weicht Wänden aus (keine Sicht durch Wände), zoomt in engen Räumen heran
- Kamera folgt weich, schaut voraus, dreht nach, wenn man lange nicht selbst dreht
- Eigene Kameras für Gespräche (Schuss/Gegenschuss), Minispiele, Zwischensequenzen
- Kamerafahrten an wichtigen Momenten (Ankunft, Kapitelende)
- Sanfte Übergänge (Blenden, Schnitte nach Filmregeln)
- Kamera-Empfindlichkeit, Y-Achse umkehren, Kamerawackeln abschaltbar

## 4. Figuren und Animation
- Gesichtsausdrücke (Freude, Trauer, Wut, Überraschung) passend zum Gesagten
- Lippen/Mund bewegen sich beim Sprechen
- Augen blinzeln, Blick zu Gesprächspartnern und interessanten Dingen
- Atmen, Gewicht verlagern, individuelle Ruhe-Animationen (Handy schauen, gähnen, strecken)
- Übergänge zwischen Animationen weich (Blending), kein Gleiten der Füße
- Hand-IK beim Greifen (Türklinke, Tablett, Ball), Sitzen auf echten Sitzflächen
- Gesten beim Reden passend zur Stimmung
- Kleidung/Haare mit leichter Bewegung
- Unterschiedliche Körper, Größen, Gangarten, Kleidungsstile – jede Figur erkennbar
- Kontakte: Handschlag, Umarmung (mit Einverständnis), Abklatschen

## 5. Grafik, Licht, Atmosphäre
- Tageszeit mit wechselndem Licht und Himmel; Wetter (Regen, Wind, Nebel, Schnee) mit Folgen
- Weiche Schatten, Umgebungsverdeckung (AO), indirektes Licht wirkt plausibel
- Innenräume mit eigenem Licht (Lampen, Fenster-Lichtflecken)
- Nachbearbeitung: Farbstimmung, Bloom, Tiefenschärfe im Gespräch, leichte Vignette
- Stimmige Kunstrichtung, Farbpalette pro Ort/Gefühl
- Details: Abnutzung, Poster, Müll, Pflanzen, Gegenstände mit Geschichte
- Partikel: Staub, Blätter, Atemwolken im Winter, Spritzer am Brunnen
- Spiegelungen/Glanz (Fenster, Pfützen nach Regen)
- Weitsicht: Horizont, Hügel, Dorf rundherum (keine leere Kante)
- LOD/Verblassen in der Ferne ohne sichtbares Aufploppen

## 6. Klang
- Schritte je Boden, Kleidung raschelt, Türen, Gegenstände
- Räume klingen verschieden (Hall in Gang/Aula, trocken im CDI)
- Umgebung lebt: Vögel, Wind, Stimmengewirr, Klingel, Straße
- Musik passt sich an (ruhig, spannend, traurig), blendet weich über
- Ducking: Musik/Geräusche leiser, wenn gesprochen wird
- Stimmen/Vertonung oder hochwertige Vorlese-Stimme; Laute pro Figur („Hm“, Lachen)
- UI-Klänge stimmig, nicht nervig
- Lautstärke getrennt: Musik, Effekte, Stimmen, Umgebung
- Ortung: Geräusche kommen aus der richtigen Richtung (3D-Ton)

## 7. Geschichte und Erzählen
- Starker roter Faden mit Geheimnis und Auflösung
- Figuren mit Wunsch, Angst, Entwicklung über das Jahr
- Entscheidungen haben sichtbare Folgen (sofort und später); „X wird sich daran erinnern“
- Mehrere Enden / Endbilder je nach Freundschaften und Entscheidungen
- Umwelt erzählt mit (Pinnwand, Zettel, Graffiti, Fotos)
- Rückblick „Was bisher geschah“, Kapitelzusammenfassung, Statistik der Entscheidungen
- Nebengeschichten (Fäden je Figur) mit eigenem Bogen
- Humor und Herz im Wechsel; keine Belehrung
- Zwischensequenzen mit Regie (Kamera, Pausen, Musik)

## 8. Dialoge
- Antworten mit Ton (freundlich/ehrlich/witzig) erkennbar, kein „richtig/falsch“-Gefühl
- Zeitdruck nur, wo es Sinn macht; „Schweigen“ als Antwort möglich
- Unterbrechen, Weggehen, Nachfragen
- Gesprächsverlauf nachlesbar; schon gewählte Fragen markiert
- Untertitel mit Sprechername, Farbe, Größe, Hintergrund einstellbar
- Figuren reagieren auf frühere Gespräche („Du hast doch gesagt …“)
- Kurze Zurufe („Barks“) passend zur Lage (Hof, Kantine, Regen, Rennen)

## 9. Leben in der Welt (NPC-Verhalten)
- Tagesabläufe: Leute gehen zum Unterricht, Pause, Kantine, Bus
- Gruppen stehen zusammen, reden, lachen, gehen gemeinsam
- Reaktionen auf die Spielfigur: Blick, Gruß, Ausweichen, Kommentar (Rennen, Springen, Winken)
- Reaktionen auf Ereignisse der Geschichte (Gerüchte, Sportfest)
- Lehrkräfte mit eigenen Wegen und Gewohnheiten
- Tiere (Tauben, Katze), Fahrzeuge (Bus, Fahrräder)
- Menschenmenge dicht, aber ohne Zusammenstöße

## 10. Welt und Erkunden
- Glaubwürdiger Ort mit klarer Orientierung (Landmarken, Schilder, Wegweiser)
- Karte/Übersicht mit aktuellem Ziel; Wegweiser zum Ziel (dezent)
- Geheimnisse und Entdeckungen (Easter Eggs, versteckte Orte)
- Interaktive Dinge (Spind, Automat, Klavier, Brunnen, Bücher, Licht)
- Orte verändern sich über das Jahr (Jahreszeiten, Deko, Plakate)
- Neue Orte schalten sich frei

## 11. Nebenaktivitäten und Minispiele
- Jedes Minispiel mit eigenem Lernbogen: leicht zu lernen, schwer zu meistern
- Ranglisten/Rekorde lokal, Herausforderungen mit Freundinnen/Freunden
- Belohnungen, die etwas bedeuten (Freundschaft, Abzeichen, Kleidung)
- Minispiele mit Schwierigkeitswahl und Hilfe nach Fehlversuchen
- Zufällige Begegnungen mit Sinn

## 12. Fortschritt und Belohnung
- Freundschaftsstufen mit sichtbaren Folgen (neue Gespräche, Handschlag, Einladungen)
- Abzeichen/Erfolge mit Seltenheit und Beschreibung
- Sammelbares mit Bedeutung (Fotos, Zettel, Erinnerungen) im Journal
- Anpassung: Kleidung/Accessoires freischalten
- Jahresrückblick am Ende mit eigenen Momenten

## 13. Menüs und Bedienoberfläche (UI/UX)
- Klare Hierarchie, wenig Text, große Ziele, einheitlicher Stil
- HUD minimal und ausblendbar; zeigt nur, was gerade zählt
- Pausenmenü jederzeit; Fortsetzen genau dort
- Journal/Handy als Spielwelt-Gerät (Nachrichten, Kontakte, Fotos, Aufgaben)
- Benachrichtigungen in einer Warteschlange, nicht überlappend
- Tastatur-, Maus-, Touch- und Gamepad-Bedienung überall
- Animierte Übergänge, Rückmeldung bei Hover/Klick
- Fehlermeldungen freundlich und mit Lösung

## 14. Barrierefreiheit
- Textgröße, Kontrast, Farbenblind-Modi, Lesbare Schrift (Legasthenie-freundlich)
- Vorlesen aller Texte (auch Menüs), Lesetempo einstellbar
- Untertitel und Geräusch-Hinweise für Gehörlose
- Weniger Bewegung, kein Kamerawackeln, Blitz-Schutz
- Halten statt Drücken (umschaltbar), einhändige Bedienung
- Zeitlimits verlängern/abschalten; Minispiele überspringen
- Navigationshilfe (Ziel-Pfeil, Weg anzeigen)
- Inhaltshinweise, „Kurz raus“-Pause, echte Hilfenummern

## 15. Speichern und Sicherheit der Daten
- Automatisch speichern an sinnvollen Stellen, Anzeige „gespeichert“
- Mehrere Spielstände; Spielstand sichern/übertragen
- Nichts geht verloren beim Schließen, Abstürzen, Akku leer
- Datenschutz: alles lokal, keine Konten, keine Werbung

## 16. Technik und Leistung
- Grafik-Stufen (niedrig/mittel/hoch) automatisch nach Gerät, manuell änderbar
- Schnelles Laden, Fortschrittsanzeige, kleine Datei
- Stabile Bildrate, kein Ruckeln beim Nachladen
- Läuft auf Schul-Tablets, Chromebooks, PCs, Handys; hoch- und querformat
- Kein Speicherleck bei langem Spielen
- Fehlerbehandlung: WebGL verloren, Speicher voll, offline

## 17. Feinschliff und Qualität (QA)
- Keine Figuren in Wänden, keine schwebenden Gegenstände
- Keine Rechtschreibfehler, einheitliche Sprache und Namen
- Automatische Tests: jedes Kapitel durchspielbar, jede Interaktion geprüft
- Kleine Überraschungen und Witze im Detail („Polish“)
- Einheitliche Begriffe und Symbole

## 18. Bindung und Wiederkommen
- Kapitelende mit Haken („Nächstes Mal …“)
- Tagesziele / kleine Wochenaufgaben
- Neues bei jedem Besuch (Pinnwand, Gespräche, Begegnungen)
- Erinnerungen an frühere Momente

## 19. Für die Schule (Besonderheit dieses Spiels)
- Lehrkraft-Bereich: Kapitel wählen, eigene Aufgaben, Lernziele je Kapitel, Dauer
- Begleitmaterial (Arbeitsblätter) verknüpft mit Kapiteln
- Reflexionsfrage am Kapitelende (fürs Gespräch in der Klasse)
- Keine Bewertung von Kindern, keine Datensammlung
- Sprache: Deutsch und Französisch (Luxemburg), Leichte Sprache
