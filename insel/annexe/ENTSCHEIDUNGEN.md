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

## Neustart der Geschichte (18.11.2026, Wunsch der Auftraggeberin)
- „Kapitel sind lahm, man läuft von A nach B und klickt sich durch.“ → **Ganze Geschichte neu** (STORY.md: „@annexe.cam“).
- **Situations-Spiele** in jedem wichtigen Moment, angelehnt an CREW, aber eigene Spiele nur für Annexe:
  Hitze-Duell, Live-Chat, Gerücht-Staffel, Druck-Runde, Gesichter lesen, Spuren-Wand, Mut-Balken.
  Ausgang und Entscheidungen verändern die Geschichte. Fähigkeiten werden still mitgezählt.
- **Jugendsprache ausdrücklich erwünscht** („wallah“, „sein Vater“, „digga“, „ich schwör“, „lowkey“, „Aura“ …).
  Die alte Regel „keine Jugendsprache“ ist aufgehoben. Jede Figur hat ihren eigenen Slang (FIGUREN.md, „Slang“).
  Erwachsene reden ohne (Ausnahme: Hoffmann versucht es – als Witz). Derb, sexuell, gegen Herkunft bleibt tabu.

## 18.11. (Nachmittag) – Kapitel 2 und 3 auf rund 30 Minuten, Lese-Ecke, Basketball-Modi
- **Fünf neue Situations-Spiele**: Sortier-Sprint (Bedürfnis/Wunsch, Gefühlswörter in sechs Ecken), Platzwechsel
  „Alle, die …“, Körper-Karte (Wo spüre ich das?), Synchronstudio („Wir sind Letzte.“ in fünf Gefühlen), Spuren-Wand
  (Fakten pinnen, falsche Fährten wackeln, nur belegbare Schlüsse wählbar). Strittige Karten sind ausdrücklich erlaubt.
- **Kapitel 2** neu dazu: Gruppe „Projekt #3“ am Handy (Noah fragen statt einfach adden; Jo beim Raten stoppen),
  Kantinen-Szene (Dario hält das Handy tief), Platzwechsel, „Bedürfnis oder Wunsch?“, Kompliment annehmen.
- **Kapitel 3** neu dazu: Sechs Ecken, „Welches Gefühl fliegt raus?“, Spuren-Wand mit Mila im CDI, Körper-Karte vor der
  Staffel, Synchronstudio nach dem Sportfest. Faden: Skate-Ecke, links sitzend, postet nur in Pausen.
- **Lese-Ecke im CDI** (Open World): 4 Comics aus der Klasse, 2 Kurzgeschichten. Blättern, ✓ gelesen, keine Fragen.
- **Basketball** am Hof: Freiwürfe, Dreier (Streifen schmaler) und H-O-R-S-E gegen Ben, Rekorde je Modus.

## 18.11. (Abend) – Kapitel 4 „Gefühle regulieren“ und zweite Kritik zu Kapitel 2–3
- **Kapitel 4** (Modul 3, E11–E15): Montagmorgen als Anspannungs-Thermometer (Zonen Grün/Gelb/Rot, bei Rot wirken
  Kopf-Skills kaum), Handmodell „Deckel weg“, Zonen-Wette, Skills-Koffer mit Notfallkarte, Mathe-Test mit Puls
  (Grübel-Gedanken antippen = ziehen lassen, Skills aus dem eigenen Koffer, Blackout ab 90), Noah bei Rot: gemeinsam
  atmen statt reden, Hitze-Duell mit Dario. Hilfe-Weg 116 111 auf der Notfallkarte. Faden: Handy-Kiste entlastet die
  7P2, Spur Flur 8:34 (Dario rausgeflogen, Luca „auf Toilette“), Cliffhanger zu Kapitel 5: gefälschter Screenshot.
- **Kritik umgesetzt**: Mehrfach-Merker bei Wahlen repariert; Chat-Knöpfe erscheinen erst, wenn sie passen; Spuren-Wand
  widerspruchsfrei (Luca hat geteilt, Jo hat gelacht; „nie im Unterricht“); keine Beschämung („Jo-Logik“ weg); E wählt
  in Auswahlspielen nicht mehr aus Versehen; Lesezeit statt fester Zeiten; Synchronstudio erst neutral, Farbe nach dem
  Tipp; Erwachsene benoten das Kompliment-Annehmen nicht mehr; Belohnungen nur an echten Entscheidungen; „Bus“-Satz
  entschärft; Markennamen raus; Synchronstudio und Mischpult als eigener Schritt „Im Schatten“; Lese-Ecke mit ✕ Regal.

## 18.11. (spät) – Basketball neu: direkt am echten Korb (Rückmeldung „Korbball ist noch immer nicht gut“)
- Kein flaches Extra-Fenster mehr: Man wirft in der 3D-Welt am Korb (Hof oder Turnhalle, der nächste Korb zählt),
  Kamera über der Schulter, runder Ring mit Netz, Ball mit Schwerkraft, Abpraller an Ring und Brett, Netz schwingt.
- Bedienung wie in Basketball-Spielen: halten = Wurf aufbauen (Balken rechts), loslassen im grünen Bereich, nach oben
  wischen = Richtung (PC: Leertaste halten, Pfeile). Rückmeldung „Perfekter Release“, „Etwas früh/spät“, „Swish“.
- Modi: Freiwürfe, Dreier (drei Positionen), H-O-R-S-E gegen Ben. Das alte flache Spiel bleibt im Code (ui.freiwurf2d).

## 18.11. (Nacht) – Kapitel 5 „Meine Gedanken“
- Modul 4 (E16–E19) als Kapitel: Der gefälschte Screenshot macht einen selbst zum „Admin“. Gedanken-Weiche vor der Tür
  (gleiche Situation, drei Gedanken, drei Tage), Sortier-Duell hilfreich/bremsend, anonyme Bohnen-Wette („mit keinem Satz
  allein“), Kritischer Detektiv mit Beweis-Waage (Tatsache, Gefühl, Spruch), neuer Satz nach Regeln (realistisch, ohne
  „alle/nie“, freundlich, nächster Schritt), Mutprobe in der Kantine gegen Luca. Die kleine Lüge mit dem Handy aus
  Kapitel 4 hat Folgen (kein Alibi). Fakten gehen an Erwachsene, nicht in den Chat.

## 19.11. – Rückmeldung: Bingo im Klassensaal raus, Konturen feiner
- Das Aura-Bingo (herumlaufen, Felder abhaken) ist ersetzt durch den **Zettel-Krimi** am Platz: Mme Tidderich liest
  anonyme Zettel vor, man rät an kleinen Hinweisen (Hundehaare, Plektrum, Kaktus-Sticker), von wem sie sind.
- **Konturen** im Comic-Look: halb so dick, deutlich heller (dunklere Farbe des Gegenstands statt fast Schwarz), weniger
  Linien an Knicken. Nur in Annexe; andere Spiele unverändert.
- Spielstand merkt sich den Schritt jetzt auch beim Namen (Kapitel können wachsen, ohne alte Stände zu verschieben).

## 19.11. – Kapitel 6 „Kommunikation und Grenzen“ (behutsam)
- Modul 5 (E20–E23): Klassenfoto mit Stopp-Abstand (jeder Abstand ist okay; Ben nimmt das Stopp an), Noah will nicht
  aufs Foto (fragen statt drängen; Foto bleibt in der Schule), drei Kanäle (Worte, Stimme, Körper), Ich-Botschaft bauen,
  Jos Sprachnachricht (Fakten: Witz, danach „mach das nicht“), Gespräch mit Jo (Du- vs. Ich-Botschaft, Zuhören),
  Stopp bauen gegen Luca, der Mila filmt (klar, ruhig, ohne Lächeln; Angriff kippt in Streit). Abschluss-Ritual:
  Stopp-Satz – alle antworten „Okay.“ Nichts Sexuelles; Grenzen = Umarmung, Foto, Nachricht.

## 19.11. – Kapitel 7 bis 10: das erste Jahr (7ème) ist fertig
- **Kapitel 7 „Wenn es schwierig wird“** (M6): Wer bleibt nach dem Rauswurf? Druck-Runde an der Skate-Ecke, Konflikt-Treppe
  zwischen Jo und Luca (früh aussteigen), Bühne kippen (Noah wird in der Kantine ausgelacht), Spaß/Streit/Mobbing sortieren.
- **Kapitel 8 „Digitale Welt“** (M7): KI-Video von Mme Tidderich. Teilen-Bremse im Chat, Echt oder KI? mit „Dahinter steckt“,
  Feed gegen den Algorithmus, Empathie-Szene mit Mme Tidderich. Die Falle ist ehrlich (mit Bens Einverständnis, keine Lüge).
- **Kapitel 9 „Gesund und stark“** (M8): Dario erzählt alles. Bewusst **kein** Schweige-Versprechen als „gute“ Antwort –
  zu schwere Geheimnisse gehören zu Erwachsenen. Stress-Rucksack (tragen, warten, teilen, nicht meins), Akku-Tag
  (Schlaf, Essen, Bewegung, Handy am Abend), Gesund-Würfel mit Ben, Bodyscan. Hilfe: Herr Kuedes, 116 111.
- **Kapitel 10 „Abschluss“** (M9): Jahres-Kurve aus den eigenen Entscheidungen, Brief an mich (wird für die 6ème
  gespeichert: `S.sz.brief`), Stärken-Rücken, Erden mit fünf Sinnen. Dario sagt es beim Sommerfest selbst; Luca trägt
  Folgen, man darf Abstand halten („Verzeihen musst du nicht“). Vier Enden je nach bester Freundschaft, sonst Lina.

## 19.11. – Qualitätsrunde Jahr 1 (Reihenfolge laut Auftrag: Qualität → alle Fach-Module → 6ème/5ème)
- Zwei Kritiken (Story, Minispiele) ausgewertet. Story: Man selbst war das erste Opfer von @annexe.cam – Dario und Luca
  sagen das jetzt; Spuren aus Kapitel 1–5 zahlen sich aus (Winkel, Nummer mit 77); im Finale eine echte Wahl im Chat
  („LUCA IST ES“ posten, privat schreiben oder zu Herrn Kuedes); Darios Entschuldigung im Klassenkreis statt vor der
  ganzen Schule (Noah und Mila wollten das so); weniger Erwachsenen-Moral; Running Gags von Ben, Lina, Mila, Ayla, Luca, Kenan.
- Minispiele: Ton bei Karten, Blasen und Stempel; Vorlesen auch in Spielen (wenn eingeschaltet); große Emoji-Rückmeldung
  statt kleiner grauer Texte; Countdown startet erst nach der Lesezeit; Druck-Runde: Anker hält die Zeit an;
  Treppe mit sichtbarer Zeit; Bühne kippen ohne verratene „Stufe“; Feed zeigt die Blickzeit; Sortieren mit Serie und
  fliegender Karte; Gesund-Würfel mit echten Mini-Aufgaben (tippen, halten, still sein); Check-in in zwei Schritten
  (Gesicht, dann Wort); Skills-Koffer mit Rot-Test; Warnlicht mit Tank-Anzeigen; Rucksack mit Steinen statt Kilo.
- Antworten, die eine Stärke zeigen, erscheinen in gemischter Reihenfolge (die gute Antwort war zu oft die erste).
- Grafik: Kreide-Hüpfspiel, Kreide-Sonne und Fahrradständer auf dem Hof; Farbband in den Gängen; Stempel „knallt“.

## 19.11. (abends) – Qualitätsrunde 2 („sei noch kritischer“)
- Zwei weitere Kritiken: harte Story-Kritik Kapitel 1–6 und Spielgefühl/Bedienung.
- Story 1–6: Hook in den ersten Minuten (man ist schon gepostet, als man ankommt); Dario nicht mehr Hauptverdächtiger in
  jeder Szene (Luca hat das Handy oben, die Spur bleibt offen); „#3“ wird beim Sportfest aufgelöst; lange Klick-Strecken
  gekürzt (Kuedes-Faust, Tidderich-Ansage, „Wie laut ist dein Kopf?“ gestrichen); verlockende „schlechte“ Antworten mit
  echten Folgen; Folgen aus früheren Entscheidungen (zu spät, Lina als Letzte, Jos Knall, Klassenchat-Drohung);
  Sicherheitsnetze (116 111 nach der Bohnen-Wette, „Einem Erwachsenen zeigen“ bei fremder Nummer, Teams werden gelost);
  eigene Stimmen für Yusuf, Chiara, Kenan, Ayla.
- Minispiele: Gesichter lesen mit gezeichneter Figur und Aufdecken (🔍 bei wenig Hinweisen); Zonen-Wette mit eigenem Stein
  auf der Linie; Bohnen-Wette mit wachsenden Balken; Mischpult mit −/+; Linie mit größeren Tippflächen.
- Bedienung: Richtungspfeil zum Ziel am Bildschirmrand; Konfetti, Stempel und Ton am Kapitelende; Nachfrage vor dem
  Überschreiben eines belegten Spielstands; Korb-Menü mit „Doch nicht“; Lautstärke gilt für alle Töne; Handy zeigt erst
  alle Nachrichten; Tagesrückblick ohne Auto-Schließen; Toasts bleiben länger (nach Länge) und lassen sich festhalten;
  Ziel-Box mit 🔊; Textgröße wirkt auch auf Ziel, Handy und Spiele; ⚙ auf dem Startbildschirm; Ziffern im Pause-Menü;
  Skateboard: zwei Sekunden zum Zurückrollen; weniger Rechenlast hinter Menüs.
- Neu: **Schul-Pass** mit 19 Abzeichen (Pause, Entdecken, Menschen, Story) als Reiter im Journal. Abzeichen nur für Dinge,
  die man bewusst tut – nie für „richtige“ Antworten.

## 19.11. (nachts) – Vier Runden Grafik, Lebendigkeit, Spaß, Easter Eggs
- Runde 1 (Grafik): Basketballplatz mit Zonen, Kreisen und Dreierlinie; Wimpelketten über dem Hof; Twister-Punkte,
  Pfütze; Blumenkästen und Kübel an der Fassade; Banner „Wëllkomm · Bienvenue · Willkommen“ über dem Eingang.
- Runde 2 (Lebendigkeit): Wolken, Tauben (Gerd mit Partyhut fliegt nie weg), Schmetterlinge; Leute auf dem Hof sagen
  kleine Sätze (Sprechblasen je Ort); „Hallo sagen“ bei Leuten auf dem Hof (zählt für den Pass); ab und zu fliegt ein
  Papierflieger oder rollt ein Ball vorbei; mehr Leute in Kantine, Innenhof und Gang.
- Runde 3 (Easter Eggs): Gummiente mit Krawatte im Brunnen (beim dritten Mal „Hand rein“ gefunden); fünf Ladekabel
  von Herrn Mesenberg im ganzen Gebäude; Kritzeleien im WC; Automat mit Jackpot beim 7. Mal; Geheimwort „gerd“ tippen.
- Runde 4 (kritischer Feinschliff): Brunnen in Steinfarbe mit Wasserstrahl und Wellenringen; Banner-Text passt jetzt
  ganz; Speiseplan mit Humor in der Kantine; seltene Schul-Durchsagen (Fundbüro, Turnbeutel, Gerd); Taste H = winken,
  Leute in der Nähe winken zurück; Ladekabel größer und orange (vorher unsichtbar). Neue Pass-Abzeichen: Kabelsalat,
  Enten-Retter, Geheimwort, Hallo an alle, Winke-Welle.

## 19.11. – Vier inhaltliche Runden („immer kritischer“)
### Runde 1: Story-Bogen und Figuren (zwei harte Kritiken, Kap. 1–5 und 6–10)
- Krimi war ab Kapitel 3 gelöst (alle Spuren zeigten auf Dario): Dario zieht das Handy nicht mehr weg, sagt „ging in drei
  Gruppen rum“; Jo und die 7P1 sind jetzt Mitverdächtige; Faktenwand: „Dario hatte das Foto“ ist Spur, kein Beweis.
- Erwachsene handeln sichtbar: Kuedes weiß ab Tag 3 von @annexe.cam; Tidderich: „Account gemeldet. Bürotür, nicht Chat.“;
  Kuedes’ Antwort im Chat: „Liegt schon bei der Direktion.“ (vorher: Termin, der nie kam).
- Kapitel 5: Ben löst den Fake nicht mehr in 7 Sekunden („warte. was?“) – die Uhrzeit 25:14 findet Mila beim Prüfen.
- Weniger Lehrer- und Therapie-Sätze: Noah coacht nicht mehr, Kuedes erklärt „Glaubenssätze“ nicht mehr, die
  Gefühls-Abstimmung hat keine Musterlösung, Moral-Schlüsse in Kap. 7 und 10 durch eine Frage/Handlung ersetzt.
- Kontinuität: Top-5-Liste wird am Mittwoch angekündigt, am Montag gepostet; Mila-Foto spielt in der Kantine; Bus/Zeit in
  Kap. 4; Bohnen-Zahlen passen zur Klassengröße; Darios Nachricht Sonntag 23:14 statt Samstag 2:14; Zeitlinie des Accounts.
- Finale (Kap. 10): Dario sagt vor der Klasse „{name} war nie Admin“ und löscht den Account live; Mila macht die Regeln im
  Foto-Club statt „Vorsitzende“-Kitsch; Kenan bekommt seinen Moment; die vier Enden greifen frühere Entscheidungen auf;
  Linas Ende ist kein Trostpreis mehr. Bens Falle: Luca soll einen Kuchen backen (passt zu Lucas Koch-Traum).
- Slang je Figur bereinigt („real/sus“ nur Dario, Ben sagt „Bruder“), schwere Wörter ersetzt, lange Stempel gekürzt.
### Runde 2: Lerninhalte fachlich (zwei schulpsychologische Kritiken mit Abgleich gegen die Kurs-Vorlage)
- Selbstschutz wird nicht mehr bestraft: Weggehen im Hitze-Duell („Ich geh kurz. Reden wir gleich.“), Gruppe verlassen,
  Handy weglegen – keine Respekt-Minuspunkte und keine Vorwürfe mehr.
- Opfer-Verantwortung entfernt: Milas „Stopp“ wirkt nicht wegen ihres Lächelns nicht – „Weitermachen war seine
  Entscheidung“; Schweigen ist kein Ja; Zuschauer:in ist nicht schuld am Schubsen („Ich hab geschubst. Nicht du.“).
- Kapitel 5: Echtes Cybermobbing ist kein Denkfehler. Geprüft wird nur der Gedanke „Mir glaubt eh keiner.“; Mila sagt:
  „Der Fake ist gemein. Das ist echt.“ Gleiche Herzen für jedes Ergebnis der Waage.
- Atmen bei Panik: lange ausatmen statt tief einatmen; Herr Mesenberg kommt, wenn niemand Hilfe geholt hat.
- Klassenregel „bleibt hier – außer bei Gefahr“ (Kinderschutz). Keine Selbstoffenbarung vor der Klasse („Nicht melden.
  Nur denken.“). Kuedes spricht Noah allein an, nicht vor allen. Darios Entschuldigung nur mit Einverständnis von Noah
  und Mila, im Klassenraum statt auf dem Fest; kein Klatsch-Druck.
- Fachlich genauer: Handmodell (Finger bremsen, ab etwa 90), Funktion der Gefühle („Angst passt auf. Trauer holt Trost.
  Wut sagt: Stopp.“), Mobbing-Definition (Absicht, Kräfte-Ungleichgewicht), Konflikt-Treppe auch als Weg nach unten,
  Fuchs (Kompromiss) bei den Streit-Tieren, Ich-Botschaft mit verkleideter Du-Botschaft, erster Gedanke kommt von allein.
- Medien/KI 2026: „Woher kommt das Bild?“ statt Fehler-Suche; Fach „Weiß ich nicht“; 20 statt 9 Sekunden; KI-Erklärungen
  nachprüfen, Gesicht in Apps; „Fake-Videos von echten Menschen sind Mobbing“. BEE SECURE Helpline (aus der Kurs-Vorlage).
- Gesundheit ohne Essens-Bewertung (keine Chips-Abwertung), Handy nicht der Feind, keine Einschlaf-Versprechen;
  Geheimnisse, die Angst machen oder schaden, darf man weitersagen. Nachts bei Gefahr 112 (116 111 ist nicht rund um die Uhr).
- Übungen ohne Musterlösung: Neuer Satz zeigt die Regeln erst nach „Das ist mein Satz“ (dann reparieren); mehrere gute
  Teile; Bohnen: alle fünf legen (anonym); Warnlicht-Raten und Sortier-Karten ohne verratene Lösung; Thermometer ohne
  Strafe fürs Langsam-Lesen; Check-in ohne Bewertung; Stärken-Rücken: Komplimente werden nicht korrigiert.
- Doppelte Durchsagen (alte + neue aus Grafik-Runde 4) zu einem System zusammengelegt.
### Runde 3: Neben-Inhalte (Jugend-Panel: Clown, schwache Leserin, Skeptiker)
- Regelverstöße behoben: echte Buchtitel in der Lese-Ecke durch erfundene ersetzt; Automarke („Golf“) und Plattform-Name
  („YouTube“, „google“) entfernt.
- Alter Lehrername „M. Hoffmann“ war noch sichtbar (Stundenplan, Pinnwand, Fäden) – jetzt überall Mme Tidderich.
- Freundschafts-Fäden an Story und Slang angepasst: Linas Comic ist „Gerd die Taube ermittelt“; Jo sagt „digga“ und
  repariert einen Kombi; Ben rechnet in Aura; Kenan sagt „Brudi“; Noah versucht Slang („sus? Sagt man das?“);
  Tidderich tanzt nicht in echt (das Tanz-Video ist der Fake aus Kapitel 8). Weniger Lehrer-Antworten und Therapie-Sätze
  (Chiaras „Kleber“, Bens Lerntipp, Beckers Opa-Witz, Webers Schleim), weniger gleiche Gags (Kekse, „kein Monster“).
- Welt-Texte: Kevin der Kaktus widerspricht sich nicht mehr; weniger Geruchs-Witze; Durchsagen ohne Kunstpausen-Witze;
  Lesegeschichte ohne „Wachhund“-Bild; Titel „Ein Jahr in der 7P2“; Touch-Hilfe ohne Taste E; „Kurz raus“ widerspricht
  sich nicht mehr; 5-4-3-2-1 ohne „riechen“ (Lach-Gefahr in der Klasse); Abzeichen-Hinweise verständlich.
- Nachrichten am Kapitelende passen zu den neuen Kapiteln 3–10 (vorher: Schnuppertag, Arbeitswoche).
### Runde 4: härteste Schluss-Prüfung (Zusammenhänge/Technik + Leichte Sprache/Kinderschutz)
- Kinderschutz: Bens Witz „vom Dach gesprungen“ (Suizid-Bild) ersetzt; Noah nennt sich nicht mehr „kaputt“; Ben ruft
  die Mobbing-Liste nicht mehr über den Hof; Dario wird nach dem Geständnis nicht vor den Opfern gefeiert (Kekse für alle,
  „Wieder gut machen dauert noch“); Option „Auslachen ist auch bei Luca nicht okay“; nach Druck-„Sorry“ keine Beschämung;
  die Falle nur mit Herrn Kuedes’ Ja; Mila will erst atmen und dann mit Erwachsenen reden, nicht erst den Täter finden;
  Hilfe auch zu Hause („Heute zu Hause zeigen“); gefilmte Mila muss nicht mit ins Büro.
- Technik-Fehler: Entscheidungen, die nie gespeichert wurden (Chat-Flags sind lokal), wirken jetzt: ruhige Reaktion
  im Fake-Chat → leichtere Waage; „Luca privat geschrieben“ → Herr Kuedes reagiert; Kantinen-Ausgang → passende
  Bildunterschrift und Luca-Kommentar. Bens Schulden werden nicht doppelt gezählt; sein Ende passt zum Kontostand.
- Zeitlinie: Kuedes erst am Mittwoch (nicht „morgen“); #3 „diese Woche“; Sportfest „nächsten Freitag“; CDI am Dienstag;
  „letzte Skills-Stunde der Woche“; Kreis „kurz darauf“ statt „vor dem Fest“; 19 statt 21 Leute im Klassenchat;
  Kenan wird in Kapitel 6 nicht mehr namentlich verraten; fünf statt „vier“ Tiere.
- Leichte Sprache: „statistisch“, „Kriterien“, „Kategorie“, „effizient“, „Algorithmus“, „Datenpunkte“,
  „unwissenschaftlich“, Genitiv/Passiv und Redewendungen durch einfache Wörter ersetzt; SePAS beim ersten Mal erklärt.
- Doppelte Zeilen und Pointen entfernt (Ben „Respekt. Du lernst schnell“, „falsch geraten“, Kaktus, Rückzug-Karte).

## 19.11. – Fünf Runden Spielqualität (Bewegung, Lebendigkeit, Eintauchen, Haken, Tempo)
- Runde 1 Bewegung: Schritte hörbar (Holz in Sälen/CDI/SePAS/Turnhalle, sonst Stein); Lauf-/Renn-Animation passt zum
  echten Tempo (kein Rennen auf der Stelle an Wänden); Sichtfeld weitet sich beim Rennen leicht, wird im Gespräch enger;
  weiche Stufe am Eingang; im Stand schaut sich die Figur ab und zu um.
- Runde 2 Lebendigkeit: Stimmengewirr, je mehr Leute in der Nähe (Kantine, Gang, Hof in der Pause) – neue, abschaltbare
  Ebene im Ton-Motor (Standard aus, andere Spiele unverändert); Schulklingel bei neuer Stunde; Leute drehen sich zu
  dir, wenn du nah vorbeikommst.
- Runde 3 Eintauchen: schmale Kino-Balken im Gespräch, Uhr und Ziel-Box blenden dabei aus; beim Laufen schrumpft die
  Ziel-Box auf eine Zeile (nicht bei Vorlesen).
- Runde 4 Haken: Am Kapitelende „Nächstes Mal …“ mit einer offenen Frage (ohne Spoiler).
- Runde 5 Tempo/Gefühl (nach Game-Design-Analyse): Blende mit Zeitkarte („Dienstag · 10:24 · Kunst“) statt harter
  Teleport-Schnitte; Wörter erscheinen im Gespräch nacheinander (nicht bei „weniger Bewegung“); Kamera folgt beim
  Rennen schneller, rückt an Wänden weich heran; Touch rennt früher (Joystick 65 %); während der Stunden ist der Hof
  fast leer (ein Viertel bleibt), in Pausen voll; Kapitel 1: das heimliche Foto kommt nach 5 statt 16 Sekunden;
  Gruß „beim Sportfest gesehen“ nicht mehr vor dem Sportfest.
- Offen für später (aus der Analyse): pro Kapitel ein Schritt mit Wahl des Weges und einer zum Hinlaufen; Finale und
  Darios Geständnis interaktiver; Freunde laufen mit; Freunde an Stammplätzen; laufende Uhr.
