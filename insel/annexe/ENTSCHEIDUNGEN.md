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
  echte Entscheidung vor Minute drei (Mme Weber: warten, stören oder Plan klauen – mit Folgen bei Mme Tidderich),
  Freischaltung vor Minute fünf (Spind 117 nach dem Sekretariat; vorher ist er zu).
- **Kopfkino** (Kopf, Bauch, Stolz) zuerst in der Kantine vor Lucas Vordrängeln. Die drei Stimmen widersprechen sich;
  keine ist die „richtige“. Eigene Farben in `SPRECHER`.
- **Running Gag Ben-Schulden** als Zahl (`S.benSchuld`), steht im Journal unter „Menschen“, wird nie kleiner.
  Dort auch Münzen im Automaten und der Freiwurf-Rekord – nur Dinge, die man selbst geschafft hat.
- **Einwurf-Fehler** aus Kapitel 2/5/6/7 behoben (Sommer „Allez“, Mme Tidderich „Ça va?“, Kremer ohne „Moien“).

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
  Atem-Antwort im Test („Vier rein, vier raus“ → „Decke anstarren“), Mme Tidderichs „Wie war das für dich?“.
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
  Erwachsene reden ohne (Ausnahme: Mme Tidderich versucht es – als Witz). Derb, sexuell, gegen Herkunft bleibt tabu.

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
- Alter Lehrername „Mme Tidderich“ war noch sichtbar (Stundenplan, Pinnwand, Fäden) – jetzt überall Mme Tidderich.
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

## 19.11. – AAA-Techniken übertragen (Techniken großer Spiele, keine Inhalte, Figuren oder Bilder kopiert)
Quellen der Recherche: GDC-Vorträge und Fachartikel zu Kamera, Animation, Vegetation, Dialogen, Game Feel.
- Blick: Kopf und Nacken drehen sich weich zum Ziel (Grenzen wie beim Menschen, Nacken 40 %, Kopf 60 %). Im Gespräch
  schauen alle zur sprechenden Person, die Spielfigur schaut, wer redet oder wer in der Nähe ist. Leute am Rand schauen
  nur kurz her (2–3 s) und dann wieder weg – Dauerstarren wirkt unheimlich.
- Gesten: Wer spricht, bewegt die Hände; danach zurück in die eigene Haltung.
- Gesprächskamera nach Regeln: Schuss/Gegenschuss über die Schulter, beide auf derselben Seite (180°-Regel), harter
  Schnitt, nie durch Wände (sonst normale Einstellung). Hintergrund wird weich (Schärfentiefe, mit feinem Korn statt
  Treppenkanten), Namensschilder blenden im Gespräch aus, die Kamera „atmet“ kaum merklich.
- Bewegung: Körper neigt sich in Kurven und beim Anlaufen; Kamera dreht erst 1,2 s nach eigener Kamera-Bewegung wieder
  von selbst nach (die Absicht des Spielers geht vor) und schaut leicht in Laufrichtung voraus.
- Figuren: Atmung (Brustkorb), jede Figur mit eigenem Ruhe-Tempo und eigenem Einstieg in die Animation – niemand
  wippt im Gleichtakt.
- Welt: Baumkronen wiegen sich im Wind (nur im Vertex-Shader, kostet fast nichts); weiche Wolkenschatten ziehen über
  Hof, Rasen und Straße; drinnen schwebt am Tag feiner Staub im Licht.
- Klang: Schritte mit Ferse und Ballen, je nach Boden Holz, Fliesen, Pflaster oder Rasen, jedes Mal etwas anders.
- Gefühl: kurze Vibration auf Handys beim Reden und bei Antworten (nicht bei „weniger Bewegung“); erledigte Ziele werden
  sichtbar abgehakt, das neue Ziel gleitet hinein.
- Fotomodus (📷 oder Taste C): HUD weg, Kamera um die eigene Figur drehen, Pose (stehen, winken, reden, schauen),
  Filter (normal, warm, kühl, S/W, Retro), Unschärfe, Raster für den Bildaufbau, Bild als PNG speichern.
- Bewusst nicht übernommen: Kamera-Wackeln bei Treffern (passt nicht zu einem ruhigen Schulspiel), Sammel-Objekte ohne
  Bedeutung, Lichtschächte als Flächen (wirken auf Tablets schnell falsch).

## 19.11. (Abend) – Handschläge, Tischtennis 3D, Skaten 2, Sitzen, Begegnungen, Sequenzen umgebaut
Auftrag: Charakter und Spaß, echte Handschläge (pro Person eigener), Tischtennis/Skaten schwerer und genauer, Sitzen
reparieren, jede Sequenz auf Sinn prüfen, AAA-Funktionen. Grundlage: Kritik aller Sequenzen und AAA-Funktionsliste
(annexe/ARBEITSLISTE-1911.md, dort steht auch, was noch offen ist).
- Arm- und Hand-IK in figuren.js (Ellbogen, Handfläche, Finger, Faust, Zeigefinger); damit:
  - Handschläge (handschlag.js): 9 Bausteine (Einschlagen, Faust, Explosion, oben/unten abklatschen, Schnipsen,
    Ranziehen, Fingerpistolen, Ellbogen). Jede Freundin/jeder Freund hat einen eigenen Handschlag, der zur Person passt.
    Ab „Kumpel“: Taste G oder 🤝. Erst vormachen, dann aus dem Kopf nachmachen (Zeitbalken, Tasten 1–9, vorgemerkt
    während der Bewegung); daneben = Hände verfehlen sich. Nach zwei Fehlversuchen Spickzettel. Später zusammen einen
    neuen erfinden (3–5 Teile). Sinn: Zugehörigkeit, Rituale unter Freunden. Kamera von der Seite, nie durch Wände.
  - Sitzen: Hände liegen auf den Oberschenkeln statt durch Beine und Stuhl zu hängen.
- Tischtennis neu in 3D an der echten Platte (tt3d.js): Ballphysik mit Aufsprung, Netz, Netzkante, Topspin;
  Ballschatten und Spur; Schläger in der Hand; gezählt bis 11 mit 2 Punkten Abstand, Aufschlag alle 2 Punkte.
  Laufen (A/D, links ziehen), Schlagen mit Zielen (Richtung halten / Tippstelle), lang drücken = Schmetterball
  (aus tiefem Ball riskant). Gegner mit Reaktionszeit, Laufweg, Fehlern bei schnellen/weiten Bällen; wird stärker.
- Skaten 2: Anschieben baut Schwung langsam auf, Sprung aufladen (Pop), Tricks in der Luft (Kickflip, Shove-it, 180),
  müssen vor der Landung fertig sein; schief gelandet = Sturz; saubere Landung (Sprung kurz vor dem Boden) = Bonus;
  Grind auf Kanten mit Gleichgewicht; Kombo ×2…×5; 90 s mit Zielen Bronze/Silber/Gold.
- Kleine Begegnungen (zufall.js): Bücher fallen (helfen), Handy auf der Bank (ehrlich abgeben, nicht reinschauen),
  jemand sitzt allein (dazusetzen). Pinnwand reagiert auf Kapitel und auf das, was man getan hat.
- 8 neue Abzeichen; Pausenmenü: „Was soll ich tun?“, „Hilfe holen“ (116 111, 8002 1234, 112), „Ich stecke fest“;
  Speichern beim Wegklicken; „Was bisher geschah“ nach längerer Pause; Einstellungen „Minispiele leichter“, „Vibration“.
- Sequenzen umgebaut: Kapitel 8 „ehrliche Falle“ (Ben als Köder) → Beweis-Mappe (Fakten rein, Gerüchte und Privates
  raus, Erwachsene entscheiden); Kapitel 4 Notfallkarte → Ernstfall mit Mila (eigene Karte, bei Rot wirkt der Körper);
  Kapitel 9 Akku-Tag → Akku-Abend für einen Freund (helfen braucht selbst Akku, Grenzen sind erlaubt);
  Kapitel 10 Chat → Abstimmung über Chat-Regeln (Regel aus dem Klassenvertrag kehrt zurück); Druck-Runde: die
  Spielfigur entscheidet selbst, ob sie das Ja zurücknimmt; Finale: eigener Satz zu Darios Entschuldigung.
- Logik: Zettel am ersten Tag, Kantine/Tipp, Mila im Saal, Busstelle, Monat auf der Zeitkarte, Kuedes schreibt nicht
  privat abends, Fake über neues Konto, Passwort zurückgeholt, Jo verlässt Gruppe, fünf Tierbilder, „ohne Lächeln“,
  Live-Chat: E beendet nicht mehr (nur Esc/Knopf), Feed: Lesezeit zählt nicht als Interesse, Freundschaft wächst nicht
  durch Grammatik, „Erst bremsen“ zählt auch Klartext, „gewartet“ wird gesetzt, „statistisch“/„Algorithmus“ ersetzt.

## 19.11. (Abend, Teil 2) – letzte schwache Sequenzen, Jugendwelt heute
- Jede umgebaute Sequenz hat eine Folge, die man später merkt (Mila Kap. 4, Plan Kap. 10, Lina im Kunst-Interview, Ayla in Kap. 3).
- Jugendwelt: je Kapitel ein Online-Moment, immer mit mindestens einer Wahl, die nicht belehrt, sondern etwas tun lässt
  (zählen, fragen, Einstellungen ändern, Screenshot, Erwachsenen zeigen). Keine Marken- oder App-Namen.
- KI wird nicht verteufelt: Der KI-Chat in Kap. 9 schickt Dario zu einem Menschen. Angst vor KI-Fakes wird ernst genommen
  und mit konkreten Schritten beantwortet (Konto privat, Markieren aus, alte Gesichtsfotos archivieren, BEE SECURE).
- Synchronstudio nutzt die Vorlese-Stimme des Geräts (ohne Stimme: nur Regie-Text wie bisher).
- Fehler behoben: Beim Skaten wurde „Sprung halten“ nur im ersten Bild erkannt (Eingabe „jump“ statt „jumpHeld“) – der
  Pop lud nie auf, ein Ollie gab nie Punkte. Jetzt: halten lädt auf, loslassen springt.
- Lebendige Welt: Lehrkräfte ermahnen freundlich, wer im Gang an ihnen vorbeirennt (eigener Spruch je Person, max. alle 45 s).
- Sitzen: Figuren rasten auf echte Sitzflächen ein (Stuhl, Bank, Kübelrand, Stufen), Becken auf Sitzhöhe, Beine per IK auf
  den Boden. Geprüft im Klassenzimmer, auf der Bank und am Kübelrand.

## 19.11. (Abend, Teil 3) – AAA-Liste: Komfort und Zugänglichkeit
- „Kurz raus“ hat jetzt: „Was wurde gesagt?“ (die letzten 30 Sätze zum Nachlesen) und „Was bedeutet …?“ (21 Wörter
  aus dem Spiel, z. B. Story, Serie, Lesebestätigung, Ich-Botschaft, 116 111). Hilft beim langsamen Lesen.
- Inhaltshinweise am Kapitelanfang (sachlich, ein Satz, mit Hinweis auf „Kurz raus“).
- Einstellungen → „Über das Spiel“: Datenschutz (alles bleibt auf dem Gerät), erfundene Personen, Lizenzen (CC0, MIT), echte Hilfe.
- Für Lehrpersonen: beim neuen Spiel direkt in einem Kapitel starten (ein Kapitel = ein Modul des Skills-Kurses).
- Bildschirm bleibt beim Spielen an (Handy/Tablet).
- Die Welt redet über die Geschichte: Statisten erwähnen Ereignisse des aktuellen Kapitels (Fake, Sportfest, Serie …).

## Storyline nach Fable (24.11.2026)
- **Fables Storyline ist besser** (klarere Spuren, echte Folgen über Kapitel, ein Täter mit Grund, keine Bösewichte) → übernommen:
  Kapitel 1–10 neu, fünf Enden, zehn Nebengeschichten (STORY-FABLE.md). Alte Kapitel-Texte sind ersetzt; die freiwilligen
  Skills-Stunden und Fachstunden der alten Kapitel bleiben (🎟 → Stunden).
- **Neue Spiel-Elemente:** Anspannung 0–100 und Akku als Anzeige über eine ganze Woche; Gedanken antippen; Mut-Balken;
  Klassenchat mit Countdown und unsichtbarem „Stillstand“ als Belohnung fürs Atmen; Abstimmung, die man immer verliert.
- **Lesepausen** in Situations-Spielen werden mit „Ohne Zeitdruck“ nicht mehr 60-mal so lang (vorher: 96 Sekunden pro Kommentar).
  Zeitlimits verlängern sich weiter.
- **Geparkt (Auftraggeber):** Scheitern können, Skills nicht durchklickbar, Stunden als Pflicht in der Geschichte.

## 27.11.2026 – Serie 2 · Runde 1 (Jugend-Panel K1–K4, nach dem Umbau der Skills-Hefte)
Je Kapitel drei schwache Szenen gestrichen und neu gebaut, Wahlen ohne Folgen bekommen Folgen, Cringe-Zeilen ersetzt.
- K1: „Einer schaut DICH an“ → „Drei Dinge. Kein Mensch.“ (5-4-3-2-1 aus Heft #00 als Ausweg aus Rot) · erster Klassenchat →
  „Wie Ben dich speichert“ (Etikett „hinten links“ oder der eigene Name) · Essensausgabe → „Rafa in der Schlange“ · Jos Frage
  „Warum bist du in der P?“ mit Weiter-Karte · kein Timer bei Bens Entschuldigung.
- K2: Bens Handy 1:34 → „Ben am Bus“ (für ihn antworten oder nicht; Folge in K3) · Nachhak-Übung → Nachhak-Karten im Gespräch ·
  „Ben schläft – Jo filmt“ → „Linas Heft“ · Folgen aus K1 am Montag sichtbar.
- K3: Kamera-Rätsel → „23 Reaktionen“ (eine Nachricht; die wahre 📎-Antwort ist die Falle) · Vorstellen ×3 → „Übersetz mal“ (Manon
  und die alte Liste) · Hinschauen + feste Patzer-Liste → Aufstellung mit Zeitdruck und „Übrig“ (Tausch zur Halbzeit) · erstes
  Körper-Signal im Gang · „Bleib bis Schluss“ / „Geh“ mit Preis · Wut-Übersetzer am Freitag.
- K4: SePAS-Stunde → Vorausblende Mittwoch 8:33 und eigener Zettel ohne Etiketten (Bei Rot … / Bei Gelb … / zu wem) ·
  Notausgang-Suchbild → 👀 Aufschauen im Test kostet Zeit, bringt 📎 · Linas Suchbild → „Lina zoomt“ · Test ohne Zahl,
  Gedanken-Parkschein · Eisrutsche statt Laubhaufen im Frost.
- Motor: Start-Gespräche werden nicht mehr übersprungen; Warum-Frage 4 Antworten, einmal je Kapitel; Abzeichen nie mitten in einer
  Szene; „X wird sich das merken“ → nur 🔖; Ort-Karten passen auf kleine Bildschirme; Handy-Karte mit Chat-Zeilen und Zähler.
- Skills-Strang an die Hefte angeglichen (4 ein – 8 aus, Kopf ab Gelb, Ampelplan statt STOPP, „Weiter“ statt „Passe“).

## 27.11.2026 – Serie 2 · Runde 2 (Jugend-Panel K3/K4)
- Motor: Nebenbei-Meldungen (Handy, Aufgaben, Abzeichen, Entdeckt, Durchsage, Schnitzeljagd) warten, bis Gespräch/Szene vorbei
  ist (+4 s Ruhe). Warum-Frage mit Gründen, die zur Szene passen (`warum: [...]`). Test-Ereignisse hängen auch an der Aufgabe
  (schnelle Spieler verpassen nichts, die Uhr springt). Ab zwei Blicken ermahnt Mme Lenning. Schneeball schwerer.
- K3: Streifen-Standbild + Milas Frage → „Darios Handy rutscht“ (Störung, der Zähler läuft weiter) · Uhr-Standbild im Gang
  gestrichen (📎 Uhr schon am Montag am Korb) · Freitag-Orte → „Yusuf kommt zu dir“ (erster Satz je nach Weg; Manon ruft
  dazwischen – wer hingeht, verpasst Yusuf) · „Übrig“: wer hingeht, gibt den Platz ab und sitzt die erste Hälfte selbst auf der
  Bank · gebrochenes Pause-Versprechen: Manon „J’ai attendu.“
- K4: Haltestelle → Darios Handy fällt aufs Eis (nicht hinschauen / 📎 fragen / „Alles okay?“); wer fragt, kann im Test Noah
  „Bleib.“ zuflüstern (kostet Zeit und eine Ermahnung, schützt Noah) · Testrückgabe → Störung „Jos Blatt“ (Folge im
  Schneeball) · Mila am kalten Geländer: Zettel ändern oder lassen · Foto startet beim Stand aus dem Test.
- K1 (Panel K1/K2, Runde 2): „Rafa in der Schlange“ → „Der vierte Tisch“ (7P1: Kenans Galerie, 10:05 fehlt → 📎) · Warum-Karte
  → „Die Frage von nebenan“ (nur nach Mitlachen / Handy weg fragt die Person vom Mittagstisch leise „Warum?“) · „Ben privat“ →
  „Wer dir schreibt“ (der Abend-Chat kommt vom Mittagstisch: Noah, Mila, Ben oder Dario) · „{name} reicht.“ wirkt: Ben, Noah,
  Luca sagen dann deinen Namen · „Weiter.“ kommt um 13:31 zurück (Jo zu Ben: „Ben. Weiter.“) · Noahs Sicht je Rafa-Antwort ·
  keine Tasten-Tipps auf dem iPad · „Chill“ raus.
- K2: „Ben am Bus“ gestrichen (Yusufs Nachricht jetzt im Pause-Ort Ben) · Gegenliste kurz: „Du postest. Ich trau mich nicht.“ –
  8 s: Posten / Noah fragen / Löschen · Skate-Ecke → „Lucas Trick“ (Noah läuft durchs Bild: wegschwenken oder draufhalten; Folge
  am Freitag) · „Jo. Gib her.“ mit zweitem Schritt · Folgen aus K1 am Montag als Szene · Liste ohne Warum-Karte (Mila fragt nur
  die, die bei den Lachenden bleiben) · Reporter-Moralsatz gestrichen.

## 27.11.2026 – Serie 2 · Runde 3 (Jugend-Panel K3/K4)
- Motor: „Warum?“ kommt erst nach der Szene und wird von einer Figur gefragt (K3: wer den Ball verloren hat / Jo; K4: Mila).
  Höchstens zwei gleiche Gedanken gleichzeitig im Test; die Test-Uhr springt sofort mit. Schneeball: Wer neben dir am Wall steht,
  fängt einen Ball ab; dreimal erwischt = 10 s Bank; man kann verlieren.
- K3: „Darios Handy rutscht“ → „Yusuf steht auf“ (hinterher: „Wer war das? Du standst direkt davor.“ – 📎 Dario nennen hat in
  K4 eine Folge; der Chat ist danach bei 41, „Löscht das.“ zieht keiner mehr mit) · Manons Zwischenruf am Freitag → „Der Bus
  kommt“ (einsteigen oder bleiben; wer bleibt, geht mit zur Grundschule) · „Musst du weg?“ ohne 📎, nur Rot sperrt · Weitergehen
  am Tor hat eine Folge · Pause-Angebot zählt nur mit Hingehen.
- K4: Dario hält dir das Handy hin („Meine Finger sind zu kalt.“), Wand-Eintrag nur, wenn du nicht wegschaust · Testrückgabe →
  „Nach vorne“ (Mme Lenning im Hof; „Das Foto. Ich war’s nicht.“ = Parkschein abholen) · „Zwei Plätze am Wall“ (Jo wählen oder
  nicht) · Freitag „Später ist jetzt“ (Chiara erinnert an „später“; Linas Foto an Herrn Kuedes oder behalten) · Ayla/Jo-Zeilen
  logisch · Gesprächsfrage: „Wie hoch warst du um 8:34, von 0 bis 100 – und was hat dich runtergebracht?“
- K1/K2 (Panel Runde 3): „Die Frage von nebenan“ gestrichen → das Mitlachen kommt abends im Klassenchat zurück („sogar {name} hat
  gelacht 😂 also ist es ok“ – antworten: „War nicht okay.“ / „Ja. Nur Spaß.“); um 13:31 nur eine stumme Reaktion der Person vom
  Mittagstisch · „Wem zeigst du’s?“ hat sofort eine Folge am Dienstag 7:40 · Kenan zeigt nach „Schöne Taube.“ die Lücke um 10:05 ·
  Dario ohne Handy um 13:31 = 📎 · Chat: nach Blockieren/Posten keine weiteren Nachrichten und Knöpfe · keine Beziehungs-Liste mehr
  am Tagesanfang · K2: Steckbrief → „Ein Satz für die Zeitung“ (die Liste verdreht genau deinen Satz) · Gegenliste: „Noah suchen“
  hat eine eigene Folge · Dario „War nicht lustig.“ → @annexe.cam antwortet eine Minute später · Reinschauen = 📎 · Jo fragt am
  Freitag nach der „langen Geschichte“.

## 27.11.2026 – Serie 2 · Runde 4 (Jugend-Panel K3/K4)
- Welt: Im Dezember (K4–K6) liegt Schnee auf dem Rasen, Blumen sind weg. Test: auch zurückkehrende Gedanken höchstens zweimal
  gleichzeitig; 8:31 erscheint nicht mehr bei 8:30. Atem-Übung: „Ruhig. Genau so.“ statt „Du atmet mit.“
- K3: Tor ohne Sabli-Rede → man lotst Manon selbst („Salut ! Je te montre.“ startet den Wegweiser) · „Frag Mme Sabli.“ oder
  Weitergehen: Manon sitzt neben Jo, Jo übersetzt die Liste („Il est bizarre.“), man hat keine Wahl mehr (wer weitergeht: sie kommt
  zu spät, die Klasse lacht) · Pause „Eure Bank“ (dritte Ben-zockt-Szene) → „An der Mauer“: Yusufs kleiner Bruder ruft „Sag ihm:
  Mittwoch um vier!“ → 📎 „Um vier. Dein Bruder.“ im Gang; „Mach ich.“ ohne es zu sagen hat am Freitag eine Folge · „Frau Sommer
  holen“ auch ruhig (das 🔒 verrät nicht mehr die eine Lösung) · Jos „Warum?“ → „Was war bei dir los? Im Gang.“ (Wut / Wut – drunter
  Angst / drunter Scham / weiß nicht: der eigene Deckel) · Kantine: Yusufs Handy-Karte, 📎 „Der Streifen. Darios Hülle.“ oder 📎
  „„Bissig“ – das sagt Kenan.“; „Erst muss das weg.“ wirkt im Chat (Chiara schreibt „Stimmt.“) · Freitag: Lenning-Durchsage raus;
  Einsteigen = Platz neben Manon, sie fragt, was „bissig“ heißt (Méchant / Fâché. Très fâché. / 📎 Il avait peur. – ohne das
  Geheimnis zu verraten) · Grundschule nur nach Fragen, Dazwischenstellen oder „Sorry.“ · Manons Ankommen wird erst am Freitag gezählt.
- K4: Jos Satz kommt Montag in Mathe vor allen („{Hl} schreibt eh ab.“), keine Jo-Störung mehr in der Pause; beim Foto gibt es
  dafür ohne 📎 Blitz die ruhige Antwort „Montag hast du’s gesagt, Jo.“ · Dario: Handy-Karte „Fahrplan“, 📎 nur, wenn man fragt ·
  Herr Kuedes an der Tür nur, wenn er auf dem Zettel steht · Ayla raus aus dem Hof-Gerede (eine Zeile von Jo oder Chiara) ·
  Milas „Warum?“ mitten in der Welle → nach Jos Sicht: „Wie hoch warst du vorhin? Von 0 bis 100.“ (Chronik: gefühlt vs. gemessen)
  · Freitag vorne: Testkarte bleibt offen, bei < 4 bietet Mme Lenning Üben zu zweit an; Parkschein für alle, die geparkt haben
  („Wer war um 8:34 am Glas?“ → „Ich frag Herrn Kuedes.“); Chiara steht mit ihrem Blatt daneben · „Zwei Plätze am Wall“ gestrichen
  → Jos Platz folgt aus seinem Blatt (zurückgegeben: hinter eurem Wall; ausgelacht: wirft für die 7P1 auf dich; sonst steht er ohne
  Wall und mitten im Spiel kommt „📣 Jo! Hier!“ – kostet kurz die Deckung) · Noah fängt einen Ball, wenn du ihn verteidigt hast ·
  Freitag 15:40 nur Dario; wer Lina den Zettel beobachten ließ, bekommt ihre Nachricht neben Dario (wegdrehen / zeigen / fragen) ·
  Gelb ab 30 wie im Heft · Chronik ohne Doppel; Gesprächsfrage: „Als das Foto kam: Wie hoch warst du, von 0 bis 100? Was hat dich
  runtergebracht – und was hätte geholfen?“
- Motor (Panel K1/K2, Runde 4): Chat-Knöpfe erst, wenn die erste Nachricht da ist (kein „Gelesen“ vor der Nachricht) · leise
  Meldungen, die älter als 25 s sind, fallen weg (kein „Spind 117“ mitten in einer schweren Szene) · Belohnungs-Karten nur beim
  freien Herumlaufen, nicht zwischen zwei Szenen · Ort-Wahl kann eine Uhr haben (wer zögert, landet dort, wo gerufen wird) ·
  Plakat im Saal = Heft-Regeln („Lachen ja. Auslachen nein.“ · „Weiter.“ · Regel 6: Nichts von hier in Chats. Keine Fotos.).
- K1: Kantine ohne Laufweg und ohne „Suppe oder Pasta“ → acht Sekunden mit Tablett; wer zögert, wird von Ben gerufen · Kenans
  Galerie: kein „gelöscht“ mehr – man muss im richtigen Moment „✋ Stopp!“ tippen, dann sieht man das schwarze Bild um 10:05 ·
  Abend: EIN Chat – mitten im Klassenchat rutscht die private Nachricht vom Mittagstisch oben rein; ein Daumen: privat antworten
  oder in die Gruppe schreiben (nach dem Mitlachen schreibt Noah „und nicht gelacht.“, Mila schreibt gar nicht) · „Ben. Du sagtest:
  nicht geteilt.“ jetzt vor allen in der Gruppe · Bens Kontakt „{name} 7P2“ und sein „hinten links“ widersprechen sich nicht mehr ·
  13:31: „Alle lachen. Such drei Dinge, die nicht lachen.“ · Lehrer-Ansicht in Tagesreihenfolge, ohne Widersprüche; bei Mitlachen
  Zusatzfrage „Jo schrieb: ‚Sogar du hast gelacht. Also ist es ok.‘ Stimmt das?“
- K2: Milas Warum-Karte gestrichen → „Mila geht allein“ (sie zeigt Mme Tidderich die Liste; mittags: „Wer hat gepetzt?“ – Jo schaut
  Mila an) · Jo erinnert an „Nur Spaß“ aus K1 · Währenddessen zeigt den Ort, den du verlassen hast · Noah lädt nach dem Nachhaken
  ins Jugendhaus ein (sonst holt Ben dich zum „Turm-Foto“) · Freitag: „Beweis?“ – Dario will einen Beweis für deine Stärke aus
  deiner eigenen Woche (Noah/Treppe · Bank zwei/42 · Chiara/Stapel · „Hab keinen.“) · „nicht lustig? okay.“ kommt erst im Bus –
  Dario UND Lina haben es gehört (Spur bei beiden; 📎 „Schon wieder dein Satz.“) · „Den Strich kennst du“ nur, wenn man ins Heft
  gesehen hat · Becker-Moral nur einmal · Nouvelle fragt Noah, bevor der Turm in die Zeitung kommt · Lehrer-Ansicht in
  Wochenreihenfolge, falsche Sätze korrigiert.
- Welt: Schneefall bei der Schneeballschlacht, Hof und Wege im Winter leicht verschneit.
- Skills (freiwillig, K3): „Die Angst-Familie“ → „Die Wort-Leiter: von leise bis laut“ wie im Heft #02 (besorgt – nervös –
  ängstlich – panisch; genervt – gereizt – sauer – wütend – rasend; Wörter von zu Hause; Verzweiflung als Sicherheits-Karte mit
  SePAS und 116 111) · sechs Grundgefühle wie im Heft: Langeweile statt Überraschung.

### Serie 2, Runde 5 (letzte Runde, Jugend-Panel + „Vor dem Einsatz in der Klasse“)
- Motor: Rot-Modus kann pro Moment eine eigene Hilfe haben (K1: „✋ Stopp.“ statt Atem-Kreis – Heft #00: Stopp gilt sofort) ·
  Inhaltshinweis jetzt auch für Kapitel 1 · nach einem schweren Moment 90 s keine Belohnungs-Karten · Linas Schnitzeljagd startet
  nur in wirklich freier Zeit und verschwindet im Rot-Modus · eigenes Atmen zeigt keine Zahl mehr (die schätzt man selbst) ·
  „Genau so.“ nur beim ersten guten Atemzug · Test: höchstens vier Gedanken-Blasen gleichzeitig; nach dem zweiten „doppelt“
  steht für alle am Blattrand „nach dem Test“ (Parkschein) · Gesprächskamera wechselt die Schulter, wenn dahinter eine Wand ist ·
  Schneefall gut sichtbar.
- K1: Kenans Galerie-Stopp gestrichen → Kenan zeigt sein „bestes Foto“: du, von unten, ohne gefragt zu werden („Lösch das. Bitte.“
  wirkt – Kenan löscht) · Brunnen: kein Gruß-Menü, der Klick ist die Wahl (hochschauen = Mütze; bei Lina bleiben = ihre Skizze) ·
  23:07: wie du fragst, entscheidet, was zurückkommt („wer bist du?“ → verlässt den Chat; „was hast du gesehen?“ → „die treppe.
  eine hand. ein handy.“; „alles ok bei dir?“ → „nein. aber danke, dass du fragst.“) · Ben-Tisch mit Wahl („Hör auf, Jo.“ → Jo
  schreibt abends nichts über dich) · Kantine 12 s · Ben „hab nur weitergeleitet.“ – Mila „das ist teilen, ben.“ · Mila zeigt
  aufs Plakat (Regel 6) · Skills: Regeln 1–5 selbst gemacht, Regel 6 steht schon da · Chronik: nichts behaupten, was man nicht
  gesehen hat (stumm geschaltet), Spuren in einer Zeile, Pause und Rafa in einem Satz.
- K2: Darios Armband wird nicht mehr erzählt, man muss rüberschauen · „Beweis?“ repariert: Beleg nur, wenn er wirklich passiert
  ist; Dario prüft, ob Beleg und Stärke zusammenpassen („Das ist nicht Zuhören. Das ist Mut. Auch gut.“; „Erst gelacht. Dann
  gesucht. Zählt halb.“); nie ein Menü mit nur einem Knopf · Bus: jeder Satz von der Haltestelle kann in der Story landen ·
  Dario hat gehört, was du Luca gesagt hast · Mitlachen bei der Liste gibt erst etwas (Jo: Faust) und kostet eine Stunde später ·
  Schrank-Zweig ohne Widersprüche · Währenddessen mit Bild, Rückblick zeigt genau das Gespielte · Zusatzfragen für K2.
- K3: Französisch „neben Jo“ → Wettlauf im Klassenchat (Manon fragt, Jo tippt schon) · „Frau Sommer holen“ geht auch auf Rot und
  wirkt, wenn man sagt, was man weiß („Er muss um vier weg.“) · Bug „Löscht das.“ behoben + „📩 Chiara: Schreibst du mit?“ (zu
  zweit bleibt der Zähler stehen) · Warum-Karte im Gang → Wort-Leiter („Wie sauer warst du?“ – „Und drunter?“; die Figur sagt die
  eigene Stufe) · Korb-Beweis „Du hast gesagt: sofort weg.“ zählt · Bus: Yusuf wird unterbrochen, wer bleibt, hört den ganzen Satz ·
  Yusufs Dank als Nachricht im Bus · Rückblick und Chronik korrigiert.
- K4: Montag ohne Blitz (den kennt man erst Mittwoch) · Welle 3 gestrichen → „Wer kommt?“: die Person vom Ampelplan sieht den
  Kreis und kommt (bei „niemand“: Mila später „Ich hätte dich geholt.“) · Atmen kein Umweg mehr (gut geatmet = früher durch) ·
  Mila zeigt Finger statt „0 bis 100“ · „Montag hast du’s gesagt, Jo.“ ohne Stärke; Freitag fragt Ben „War’s Jo?“ · Testkarte
  „Nach den Ferien: zu zweit.“ · Chiaras Sicht mit Rahmen · „Dein Zettel“ heißt jetzt „Dein Ampelplan“.

### Serie 3, Runde 1 – Lernwirkung (Panel: Schulpsychologin, Sozialpädagoge, SEL-Lehrerin, zwei Jugendliche)
Frage: Lernt ein Kind etwas, das es nächste Woche anders machen lässt? Prinzip: zeigen → selbst tun → Rückmeldung → auf sich beziehen;
Fehler bekommen eine faire Folge UND eine zweite Chance; überall, wo jemand bloßgestellt wird, sagt ein Erwachsener „Das liegt nicht an dir“.
- K1: Plakat (mit „Weiter.“/„Stopp.“) hängt jetzt VOR Jos Frage, Mme Tidderich zeigt darauf · Rafa: „Achtundachtzig Stimmen. Eine
  davon ist deine.“ · „Drei Dinge suchen“ bekommt Namen und Ort (Hinweis + Rückblick „geht auch im Bus“), in K2 im Bus wieder ·
  23:07: Uhr steht, solange man tippt; „wer bist du?“ wird nicht mehr bestraft · wer die DM niemandem zeigt: Herr Kuedes am
  Dienstag „Das liegt nicht an dir.“ · neue Gesprächsfrage (Meinungsfrage auf Abstand) + Zusatzfragen.
- K2: Steckbrief: Mme Nouvelle gibt Rückmeldung („Frag nach.“ / „Das war Ja oder Nein.“) und einen zweiten Versuch · „Egal ist
  kein Ja.“ (Nouvelle streicht den Turm-Satz; Ben hat schon mitgelesen) · nach dem Mitlachen: „Sorry. Ich hab mitgelacht.“ →
  andere Folgen (Treppe, Darios Beweis zählt ganz) · „Ist mir egal“ wird am Freitag hörbar · Dario prüft genauer (Mut als
  Stärke, Gegenbelege) · Noah holt sich Hilfe (Herr Kuedes) · Tidderich: „Wer auf so einer Liste steht, hat nichts falsch gemacht.“
- K3: Zähler bleibt wirklich stehen, wenn andere mitziehen · „Musst du weg?“ mit 📎 Uhr · Frau Sommer: man sagt nur, was man weiß ·
  Hilfe holen wird nicht schlechtgemacht; Yusuf: „War nicht deine Schuld. Ich hab geschrien.“ · Wort-Leiter mit Körper-Spiegel
  („Dein Gesicht war knallrot.“) + „Wo merkst du’s zuerst?“ → steht in K4 oben auf dem Ampelplan · Bruder-Falle: im Bus kann man
  Yusuf schreiben („Sorry. War nicht meins.“) · Erholung auf Rot (geatmet) steht in Rückblick und Chronik · Manon-Chat langsamer.
- K4: ★ folgt der Farbe wie im Test: auf Rot die Rot-Zeile, sonst die Gelb-Zeile; Kopf-Werkzeuge wirken auf Gelb, rutschen auf
  Rot weg (mit Warum) und danach wird 🫁 angeboten · Mila spiegelt („Still ist oft Gelb.“) und bietet an, den Zettel zu tauschen
  (Rot-Zeile oder „Schreib dich drauf.“) · Mme Lenning: „Wer so ein Foto macht, ist schuld. Nicht du.“ · Parkschein holt auch den
  geparkten Gedanken ab · Chronik: Plan im Test benutzt (x-mal), gefühlt vs. gemessen ohne Zahl · neue Gesprächsfrage.
- Nach dem Testlauf: Der Hinweis „🖐 Drei Dinge suchen“ kommt sofort (als leise Meldung wäre er in der langen Szene verfallen) ·
  Noah geht am Freitag nicht „nach der Stunde“, sondern steigt an der Haltestelle nicht ein und geht zurück zu Herrn Kuedes.

### Serie 3, Runde 2 – Lernwirkung (Panel: Schulpsychologie, Sozialpädagogik, SEL-Fortbildung, zwei Jugendliche)
- Spiel-Kern: Nach dem Runterkommen auf Rot werden die Antworten neu geprüft (★ im Ampelplan springt nach dem Atmen auf die
  Gelb-Zeile) · Hinweise zeigen auf ⏸ (Kurz raus), nicht auf ☰ · „Kurz raus“ heißt jetzt „🖐 Drei Dinge suchen“ (danach freiwillig
  weiter: 5-4-3-2-1 wie im Heft #00), Lexikon gleich · Kapitelende: eine Zeile „SePAS · 116 111“ · Lehrer-Ansicht zeigt auch das
  laufende Kapitel („läuft noch – bisher“).
- K1: Wo-probierst-du’s-Plan für „Drei Dinge“ (Bus/Pause/Bett/weiß nicht), K2-Bus löst „im Bus“ ein · Rafa: wer abgestimmt hat,
  kann „Eine war meine. Sorry.“ sagen (statt Witz) · Tidderich: „Hilfe holen ist kein Petzen, Jo.“ · Kuedes- und Dario-Pfad nach
  der DM mit „Das liegt nicht an dir.“ · neue Gesprächsfrage (Finger 1–4: was hilft, wenn alle schauen?), Zusätze neu sortiert.
- K2: zweiter Interview-Versuch geht bis zum Ende („So geht Nachfragen.“) · „Du hast gelacht. … Nein.“ sagt den Grund · Treppe:
  späte Entschuldigung („Spät. Aber okay.“) · „Hab keinen.“ → Dario nennt einen Beweis, den er gesehen hat · Liste-Satz auch an der
  Kantinentür · „Hilfe holen ist kein Petzen“ (Mila/Ayla) · Chronik ohne „Folge:“, Steckbrief „genau“ ohne Schuld.
- K3: Erwachsene fragen nach der Schulter · Wort-Leiter: „Und sonst, nicht nur heute: Wo zuerst?“ + „Achte mal drauf. Bis Montag.“ ·
  Rückblick zeigt die eigenen Leiter-Antworten · Freitag: 📎 „Darum die Uhr?“ als späte zweite Chance · „Die Schule hat Mama
  angerufen. Jetzt gibt’s einen Plan für Mittwoch.“ · Chronik: genannte Stufe vs. gemessen Rot · Frage mit dem Satz, den alle hören.
- K4: Frühwarnung beim Foto mit dem eigenen Signal aus K3 (🫁 in 2,5 s → Wellen starten auf Gelb) · Vorausblende ohne Probe:
  „Noch mal durchspielen?“ · Karte „Ausprobiert“ nur, wenn probiert · Rückblick „Erst Rot. Du hast geatmet. Dann …“, „Gespickt hast
  du nicht.“ · Lenning sagt auch dem stillen Kind „Nicht du.“ und erklärt das leere Blatt · Zettel nach oben legen · nach dem
  Ausraster: Mila mit SePAS-Satz und Tausch-Angebot · Parken zählt als Plan · neue Gesprächsfrage (alle zeigen gleichzeitig Finger).

### Serie 3, Runde 3 – Lernwirkung für Kinder, die schwach lesen und schnell klicken
- K1: Vertrag als Handy-Karte genau bei Jos Frage (⏭ „Weiter.“ · ✋ „Stopp.“ · Keine Fotos.) · Plakat- und Mila-Satz kürzer
  („beides ist mitmachen“) · Rot-Moment aufgeräumt (ein Text statt vier, ✋ statt 🫁 beim Stopp) · Tidderich sofort: „Das liegt nicht
  an dir.“ · ruhige zweite Probe „Jetzt ist es still. Such drei Dinge.“ für alle, die um 13:31 nicht alle fanden · Plan mit Symbolen,
  „❔ Weiß noch nicht.“ zuerst · Rückblick zeigt den eigenen Plan und den Halt-Satz · Rafa wird für alle aufgelöst (Kuedes/Tidderich).
- K2: „Frag nach. Zum Beispiel: „Welche?““ · Nachhak-Karte als Toast · „Ist mir egal“: erst das Zeichen (Handy, Liste), dann der Satz ·
  kürzere Liste-/Atelier-Zeilen · Bank-Toast sagt den Grund · Kenan fragt in K2, ob das Foto weg soll · Jo fragt nach der langen
  Geschichte: „Weiter.“ geht wieder · Bus: der Plan löst aus („Im Bus. Hab ich mir vorgenommen.“), neu „🙋 Montag Herrn Kuedes zeigen“ ·
  „Hab keinen.“ mit halbem Beleg: „Das ist ein Anfang.“ · Dario: „Und ich? Was kann ich?“ (Stärke weitergeben, Heft #01).
- K3: Körpersignal per Körper-Karte antippen (statt Liste, kein 1-1-1) · Störung sagt „Körper“ statt „Hals“ (nicht vorsagen) ·
  „Und unter der Wut?“, „Weiß nicht.“ zuerst, nach dem Zurückschreien: „Dein Satz … Und drunter?“ · Toast „🔎 Unter der Wut: Angst.“ ·
  Bus-Einsteiger bekommen Yusufs „war nicht deine schuld“ per Chat · Bleib-bis-Schluss: „Ich hab’s Frau Sommer gesagt.“ · Kantine:
  „Melden geht. Ohne Namen.“ · Kind und Lehrperson sehen passende Fragen.
- K4: Zettel zeigt die eigene Probe („– probiert“ / „– auf Rot weg“) · Plan-Karte bekommt ein Bild (erscheint im Rückblick) · ★-Toast
  zuerst · Frühwarnung zeigt Wirkung („Früh gemerkt. Das bremst.“) bzw. „Zu spät gemerkt.“ · nicht dreimal Atmen hintereinander ·
  „Zwei Finger“ statt drei · Lenning sagt „Nicht du“ auch im Foto-Weg, Erklärung ab 70 · nach „Schleimer“: Mila „Gut, dass du gegangen
  bist.“ · Gefilmt-Toast: „Sag es Herrn Kuedes.“ · Chronik: Plan und Parken getrennt, Muster „gefühlt niedriger als gemessen“.

### Serie 3, Runde 4 – Transfer: Skills kommen wieder, ein kleiner Schritt in die echte Woche
- K1: „In diesem Kapitel“ (⏸ → Kurz raus) jetzt auch in K1, nach der Vorausblende · im Rot-Moment nur noch der Stopp-Rat (kein
  zweiter „Erst atmen“-Toast) · ⏭ auf dem „Weiter.“-Knopf (passt zur Vertragskarte) · „Zurück geht nicht.“ gestrichen (Mila reicht) ·
  Rafa: „Ich kümmere mich.“ für alle ohne SePAS-Gang · zweite Chance am Dienstag im Gang („Eine Stimme war meine. Sorry.“) · Noah
  privat nach dem Mitlachen: „Sorry. Ich hab mitgelacht.“ → „ok. gut, dass du’s sagst.“ · Halt für die Nacht in allen Wegen:
  „Kommt nachts was: Screenshot. Dann zeig’s mir.“ · Plan mit Auslöser („Zu laut? Drei Dinge …“), ❔ zuletzt · Chronik: drei Dinge
  auch beim Mitlachen, Dienstag-Probe, Jo-Nachricht nur, wenn gesehen, Melden/Screenshot getrennt · Frage mit „6 mitlachen“.
- K2: Dario-Stärke mit Beweis („Beweis?“ → „Du wusstest meinen Satz noch.“) · Notiz am Ende: „Jemandem eine Stärke sagen. Mit Beweis.
  Wem?“ · Bus: „Wie am ersten Tag. Drei Dinge?“ für alle mit K1-Erfahrung · Toast „💬 Nachgehakt“ am Turm · Freitag: „Sorry. Wegen dem
  Foto/Video.“ · Chronik: Nachhaken sofort, Zitat korrigiert, Bus-Schweigen mit „(Lieber einzeln:)“ · neue Frage: Stärke + Nachhaken
  zu zweit, Zettel „Ich kann ___. Beweis: ___.“
- K3: Körper-Karte fragt einmal nach, statt still „Weiß nicht“ zu zählen · Signal passt zur Person (Lina Bauch, Noah Brust, Mila
  Hände) · Wenn-dann mit Wann: „Achte mal drauf. Wann?“ (⚽/🏫/🎮/❔), „Montag frag ich.“ · Kantine: „Herr Kuedes hilft auch.“ ·
  Yusuf losgeschickt: Frau Sommer hilft sichtbar, Yusuf schreibt „bin da. pünktlich. danke“ · Chronik + „(Lieber einzeln:) Was bremst
  dich, bevor es knallt?“ bei Rasend/Zurückschreien.
- K4: Montag fragt die Person aus K3 nach („Und? Dein Signal. Im Sport?“) · ohne Signal aus K3: Körper-Karte nach der Vorausblende ·
  Test: beim ersten Rot „Dein Zettel liegt unten. Tipp ihn an.“ (Leiste leuchtet) · „Jo lacht am lautesten. Und drunter?“ vor Jos
  Sicht, danach „🔎 Unter dem Lachen: ein leeres Blatt“ (Wiederkehr aus K3) · Freitag vor der Klasse: zweite Signal-Probe („Wie am
  Mittwoch.“) · Ende: „Nächster Test. Mein Zettel liegt …“ (🎒/📄/🧠/❔) · Chronik: Plan beim Foto statt im Test benutzt, keine
  Doppelzeile, „gefühlt niedriger“ auch bei sechs Fingern, Zeile-drei-Frage, wenn auf dem Plan niemand steht.

### Serie 3, Runde 5 – Abschluss-Check: was bleibt, schwächste Szene ersetzen, kürzere Woche, Halt überall
- **Regel der Auftraggeberin angewandt:** Schwache Szenen werden nicht verbessert, sondern ersetzt.
  - K1: Der Nacht-Chat mit der unbekannten Nummer ist weg; es bleibt eine Karte ohne Wahl. Grund: dritter Handy-Bildschirm in Folge, Druck ohne Skill. Linas Faden bleibt.
  - K3: Die Aufstellung „9 Namen in 10 Sekunden“ ist weg; Frau Sommer liest das Team vor. Die echte Entscheidung („übrig“) bleibt.
  - K4: Die Wahl „Zettel nach oben“ und die Parkschein-Täterfrage am Freitag sind weg.
- **Rot-Modus:** Die Hilfe (✋/🫁) steht auf dem Platz der gesperrten Antwort. So sind es höchstens vier Knöpfe; die gesperrte Antwort bleibt klein mit 🔒 sichtbar („geht gleich wieder“).
- **Üben statt lesen:**
  - K2-Bus ist ein echtes Suchbild (drei Dinge, der Ort aus dem K1-Plan).
  - Zu Beginn von K2 die Frage „Drei Dinge – probiert?“.
  - Darios Stärke mit 📎-Beweis in einem Zug; danach sofort der Plan „Wem noch?“.
- **Vorbild vor dem Selbst-Tun (K3):** Mila sagt ihr Gefühl zuerst, dann „Und bei dir? Drunter?“.
- **Kernsätze als eigene Gedanken:**
  - K3: „(denkt) Heiß. Atmen. Und drunter?“
  - K4: „(denkt) Zahlen weg. Auf Rot: erst Körper.“
- **K4 Ampelplan:**
  - Nach dem Atmen bleibt der Plan (★) erreichbar.
  - Die zweite Signal-Probe ist leichter, wenn man am Mittwoch zu spät war.
  - Milas Tausch gilt auch für ein Kopf-Werkzeug auf der Rot-Zeile.
- **Halt:**
  - K1: Nacht-Satz auf allen Wegen; Mila schreibt auch nach dem Mitlachen.
  - K2: „Kommt noch was: Screenshot. Montag zeigen.“
  - K3: Mme Sabli nach der Liste; Frau Sommer zu „übrig“; Yusuf-Chat im Bleib-Weg.
  - K4: Lenning zu Noah-Verdacht, Jos Blatt und Chiara; „Zu viel“ darf man sagen (SePAS/116 111).
- **Zweite Chancen:**
  - K1: Rafa auch nach 😂.
  - K2: Turm-Satz „Sorry. Das war deins.“, „Sorry. Die Gegenliste.“, „Weiter“ auch nach „Geht dich nix an“.
  - K2: Keine Strafe mehr für Linas Weg: Chiara wird knapp Klassensprecherin.
- **Deine Woche:** Höchstens sechs Kernzeilen, Skill-Momente zuerst, der Rest unter „Alle Sätze“. Das gilt beim Kind am Kapitelende und in der Lehrer-Ansicht. Die Gesprächsfragen K1–K4 sind kürzer, die Lehrer-Kurzzeile zeigt „Rot-Zeile: Kopf“.
- **Neutral:** Kein Geschlecht für die Spielfigur („Beschützen, ja?“, „Wer ist das mit dem Kreis?“, „Petze.“). Abzeichen und Entdeckungen springen nicht mehr mitten in Szenen auf.

## 28.11. – Fehler beim Kapitelwechsel behoben · Kapitel 5 „Admin“ neu nach Gesamtkonzept
- **Kapitelwechsel:** Endete ein Kapitel in einem Gespräch (z. B. Dario am Freitag), sprang das Spiel nach „Weiter: Kapitel …“ einen Schritt zu weit.
  Die erste Szene des neuen Kapitels fehlte (K2: Dario an der Haltestelle und „Drei Dinge – probiert?“; ebenso vor K5). Auch „Kapitel nochmal
  spielen“ übersprang die erste Szene. Behoben an einer Stelle (spiel.js: `gespraechDannWeiter`, Zähler `kapEndeNr`). Ein Durchlauf K1 → K2 bestätigt es.
- **Suchbild:** Nach dem letzten Fund zählen weitere Tipps nicht mehr („4 / 3“ ist weg).
- **Kapitel 5 „Admin“ (Heft #04 Gedanken):** vor dem Bau als Entwurf von einem Fach-Panel und einem Jugend-Panel geprüft, dann umgebaut.
  - Werkzeug **📷 Kamera-Check**: Ein Gedanke erscheint als Blase über der Figur. 📷 = Standbild prüfen: zuerst „Echt: …“ (auch wenn es schlimm ist),
    dann zählen, was eine Kamera sieht. Eine Kamera sieht Verhalten, keine Gedanken. Vorhersagen prüft keine Kamera (Eisbahn: kleiner Schritt, dann schauen).
  - **Zurückspulen** an der Tür: zwei Durchläufe. Die anderen tun beide Male dasselbe, anders sind nur Blick und Tun (kein Vorwurf an Betroffene).
  - **Culture générale** (Mme Rantini): Ausschnitt mit Zoom, Taube-Test (Pässe zählen, Gerd läuft durchs Bild), das Foto von 8:34 als zweite Chance
    (grünes Schild im Glas), Bürgerkunde: Fotos von anderen posten ist nicht erlaubt – auch nicht als Beweis.
  - **Abstimmung im Chat:** Stimmen mit Namen, die Blase kommt von selbst, der Kamera-Check findet eine ungelesene Nachricht (Ayla) und schaltet
    „Ayla und ich: Nein.“ frei. Immer vier Knöpfe (Schreiben · Privat · Herr Kuedes · Raus) – Hilfe liegt nie hinter einem Gedanken. Screenshot an
    Herrn Kuedes beendet die Umfrage vor dem Rauswurf; sonst kommt Mme Tidderich danach, mit einem Satz unter vier Augen. „Beweis posten“: erst die
    Belohnung, dann „Wer war draußen?“ und zehn Sekunden, um es Herrn Kuedes zu geben. Chiaras Sicht danach.
  - **Spaß:** Eis-Rennen gegen Yusuf, Gerd als Running Gag (Zählung am Ende), Schneemann mit Jo.
  - **Freitag:** Busfenster – den alten Satz wegwischen, den eigenen Beweis hinschreiben. Er bleibt privat und taucht in K6/K7/K10 auf.
  - **Fäden aus K1–K4:** Darios „zu viel“ (Herr Kuedes redet in allen Wegen mit ihm), Chiaras Versprechen, Mme Lenning „wir zwei“, Noah unter Verdacht,
    Jos leeres Blatt, Kenan am Glas, Yusufs Bruder, Manon.
  - **Lehrer-Ansicht:** Kernzeilen „selbst geprüft“, Hilfe geholt, Tablet, Abstimmung, Folge, Satz; Hinweis ⚠, wenn die Umfrage über das Kind selbst ging.
  - Spielstände im alten Kapitel 5 beginnen das neue Kapitel 5 von vorn.
- **Nach dem ersten Testlauf K5:**
  - Chat-Knöpfe hatten kein Symbol („undefined“).
  - „Noah war’s nicht.“, „Nein“ drücken und „Ich glaub dir.“ zählen jetzt als eigene Ergebnisse, nicht mehr als „Abgewartet“.
  - Die Zahlen aus dem Kamera-Check stehen echt in Chronik und Rückblick.
  - Hilfe-Nummer: Ein Erwachsener sagt sie im Lesesaal, statt eines Toasts am Freitag.
  - Belehrende Sätze gestrichen. Lehrpersonen handeln: „Ich hab die Umfrage gesehen. Sie ist jetzt zu.“ – „Den Account hab ich gemeldet.“
  - Ende passt zu K6: Dario schreibt „montag zeig ich dir was. eine sprachnachricht. von jo.“ (7 Sekunden in K6).
  - Neu: Ben fragt kurz vor der Umfrage privat. Wer ehrlich antwortet – auch „Weiß ich nicht.“ –, ändert Bens Stimme. Damit funktionieren die Ben-Rückgriffe in K6, K7 und K10 wieder.
  - Eis-Rennen: Yusuf ist etwas schneller (12 s pro Runde).
- **K5 Runde 1 mit Fach- und Jugend-Panel** (Arbeitslisten im Notizordner):
  - **Gestrichen:** die Culture-générale-Stunde („Unterricht im Spiel über Unterricht“), Milas Tablet (fast das gestrichene Sortieren) und die Satzwahl im Busfenster.
  - **Neu „Unter dem Tisch“:** Jos Ausschnitt „beweis 👀“ → ganzes Foto → Suchbild unter Zeitdruck. Mme Rantini kommt durch die Reihe: Weitersuchen kostet Milas Handy bis zur Pause, Mila spricht es am Mittwoch an.
  - **Neu „Stille Post“:** Vier Screenshots, und man sucht, wo zuerst etwas dazukommt. Lous private Frage hat eine Folge im Chat („hab’s nur gehört“ oder „{name} sagt das auch“).
  - **Neu „Hinter dem Beschlag“:** Klar wird nur, was man selbst angeschaut hat. Danach geht das Foto an Dario, an Noah oder bleibt privat. Zum Schluss das kleine 📷 ohne Hilfe.
  - **Folgen:** Tür-Gedanke, Hof, Schneemann, Dario schreiben und die Eisbahn haben jetzt Folgen. Das Lob auf der Eisbahn kommt erst nach dem Rennen, die Vorhersage wird danach geprüft.
  - **Halt:** Wer selbst Ziel ist, bekommt einen Satz von Erwachsenen, und die Erwachsenen kommen vor Chiaras Sicht. SePAS wird genannt.
  - **Chronik:** „Von selbst geprüft“ zählt nur Freiwilliges. Die Gesprächsfrage ist kürzer und enthält Chiaras Satz.
  - **Fehler:** Systemzeilen im Chat zeigten „undefined“. Das Standbild an der Haltestelle war grau, weil die Kamera im Kopf der Figur stand.
- **Winterkleidung (K4–K6):** Figuren mit Top, Shorts oder bauchfreiem Oberteil tragen im Schnee Teile aus einem langen Stil. Der Kopf bleibt gleich. Geprüft mit einer Galerie aller Stile (Männer: Beach, Casual-Shorts, Punk; Frauen: Adventurer, Formal, Punk). Getauscht wird nur, was es im Modell gibt. Winter- und Sommerteile sind eigene Netze, die sich umschalten lassen.
