# Bauplan: vom Hafen-Demo zur Kielpost

*Was von LUMO bleibt, was sich ändert, die Kostprobe als nächste Bau-Runde (genau abgegrenzt), die Schritte danach,
Aufwand und Risiken. Dieser Plan ergänzt `insel/BAUPLAN.md` (die alten Arbeitspakete WP00–WP55), er ersetzt ihn nicht.*

## 1. Was bleibt, was sich ändert, was neu ist

| Bleibt (fast unverändert) | Wird umgebaut | Neu |
|---|---|---|
| Engine: three.js, eine HTML-Datei, offline, Plugin-Autoload, `core/state`, `core/save` mit `PRIVATE_PATHS`, Wipe, „Neu anfangen“ | `minigames/rennen/boat.js` → gemeinsames `actors/boot.js` (das Bootsrennen nutzt es weiter) | **Boot-System**: frei fahren, anlegen, Bauplätze, sichtbare Teile |
| Codes, Ersatzcodes, Kurzfassungen, Lehrer-Panel (LEUCHTFEUER-42), Lehrerheft-Generator, Lines & Veils | Grauschleier: bleibt an Land, dazu **Nebelwände auf See** mit derselben Regel | **Bergen**: feste Fundorte, Haken, Materialien |
| Dialog-Engine und Bühne, inklusive des Hakens `choice.minigame` → `{ ok, medal }` | Blick-Stufe `tanks`: dazu **Glashöhe = Wichtigkeit** | **Werft und Nest**: Bauplätze, Räume, Nest-Gläser pro Figur ohne Zeitverfall |
| Minispiel-Hülle und 8 Vorlagen; fertige Minispiele (Tank-Leitungen, Tauziehen, Sturmprognose, Bootsrennen, Garten-Wächter, Brandungsorgel, Planer …) | Baumhaus: bekommt **Spiegel-Stationen**, Schalter „Merken / Nicht merken“, Karte „Zeigen“ | **Gesprächs-Minispiele**: `leine`, `oberflaeche` (Kostprobe), später `echolot`, `gegenwind`; Der Knoten läuft auf `satzbau` |
| Puls-System, Skills-Koffer, Kräfte (Blick, Mut, Teamgeist), Sammelsachen, Chronik, Erinnerungen | Weltgrenze (`WORLD_LIMIT` 205): im Sektor vor dem Hafen weicher erweitert | **Schären** (Props mit Collidern) und später die **Seekarte** |
| Figuren, Stil (STIL.md), Hafen-Welt, Avatar, Stil-Studio, Vorlesen | STORY.md: äußerer Rahmen „Kielpost, Ildas Verbot, Nest, Lichtflotte“; die Wahrheit bleibt | **Board** (nach der Kostprobe) |
| Sicherheit §19, Text-Linter (≤ 12 Wörter, Glimm ≤ 6, verbotene Übungswörter), Validator | DESIGN.md §12: Quest-Liste nach `EINHEITEN-J1.md` | **Spielprofil** und **FOKUS-Codes** (nach der Kostprobe) |

Die bestehenden Hafen-Quests BOJE, DELFIN, OTTER bleiben spielbar. Die Kostprobe setzt nach OTTER an.

---

## 2. Die Kostprobe (nächste Bau-Runde)

> **WPK · Kostprobe „Die Kielpost fährt“**
> **Abhängig von:** der bestehenden Hafen-Demo (M0: BOJE, DELFIN, OTTER), `minigames/rennen/boat.js`, Dialog-Bühne mit
> `choice.minigame`, Minispiel-Hülle, `e04-tank-leitungen`, Tragen (`actors/moves/carry.js`), Baumhaus-Stationen,
> Roomkit für Innenräume.
> **Ziel:** Nach OTTER spielt man etwa 25 Minuten weiter: die Kielpost frei fahren, bergen, an der Werft bauen, eine
> Nebelwand öffnen, dann mit dem Code **QUELLE** die Mission „Leck im Nest“ mit zwei neuen Gesprächs-Minispielen.
> **Größe:** eine schlanke Runde. Ehrlich geschätzt **4–6 Agententage** inklusive Tests (die erste Schätzung von 3–4
> Tagen war zu knapp). Reicht das Budget nicht, gilt die **Kürzungsliste** in 2.4, nicht ein Aufschub von Tests.

### 2.0 Bevor gebaut wird (Voraussetzungen, alle kurz)
1. **Doku angleichen:** `insel/DESIGN.md` §2/§12 und `insel/docs/STORY.md` werden an den Kielpost-Rahmen angepasst,
   **vor** dem Start der Kostprobe, damit kein Agent gegen widersprüchliche Vorgaben baut (reine Doku-Arbeit, eine
   Stunde).
2. **Bedürfnis-Namen bestätigen:** Die sechs Namen kommen aus `skills/src/content/kurs-j1.js` (j1-e04): Dazugehören,
   Ruhe und Erholung, Anerkennung, Bewegung, Schlaf, Mitbestimmen. Die Lehrkraft bestätigt sie oder nennt die Namen
   vom Pegel-Blatt. Sie stehen an **einer** Stelle (`src/content/beduerfnisse.js`).
3. **Referenzgerät festlegen:** das **älteste iPad im CDSE-Bestand** (Modell und iPadOS-Version stehen dann hier). Nur
   daran wird die Leistungs-Abnahme gemessen.
4. **Rand-Test (eine Stunde):** das Boot testweise bis Radius 220 fahren lassen und Terrain, Wasser und Kollision am
   Rand prüfen. Erst dann wird der Sektor gebaut.
5. **Hilfe-Kontakte prüfen:** 116 111 und BEE SECURE 8002 1234 mit dem psychosozialen Dienst des CDSE gegenlisten,
   Vertrauensperson der Schule festlegen.

**Vor dem ersten Einsatz mit Jugendlichen (auch Handtest):** Datenschutz-Freigabe nach `KONZEPT.md` 15 Punkt 9
(Folgenabschätzung „light“ mit der Datenschutzbeauftragten, Zustimmung der Leitung, Elterninformation vorher verteilt).
Bis dahin bleiben die Spiegel-Stationen im Lehrer-Panel **aus**.

### 2.1 Umfang

**A. Signatur v1: Fahren, Bergen, Bauen**
1. **Die Kielpost frei fahren.**
   - `boat.js` wird nach `actors/boot.js` herausgelöst. Das Bootsrennen importiert es von dort.
   - Neuer Bewegungszustand `boot` in der Zustandsmaschine: einsteigen und aussteigen an **zwei Anlegern** (`hafen.steg` gibt es schon; neu `hafen.bootshaus` am Nest).
   - Steuerung: Joystick lenkt, **Springen halten** = Segel dicht (kurzer Schub bei Böen), **Aktion halten** = Haken. Am Anleger: Springen = aussteigen.
   - Fahrgefühl v1: Beschleunigen und Ausrollen, Schaukeln auf Wellen, Schräglage in Kurven, Gischt-Partikel am Bug, sanftes Abprallen an Land und Felsen (die Möwe fliegt auf). Kein Kentern, kein Schaden.
   - **Hartes Beenden ist sicher:** Speichern am letzten abgeschlossenen Schritt (Anlegen, Fund geborgen, Teil gebaut, Quest-Schritt fertig). Wer mitten auf dem Wasser oder in einem Minispiel zuklappt, startet am letzten Anleger bzw. vor dem Gespräch.
2. **Der Schären-Sektor.**
   - Weiche Erweiterung der Weltgrenze **nur** im Sektor vor dem Hafen (etwa 60° um die Richtung des Stegs, bis Radius **220**, mit 20 Einheiten Abstand zum Rand des Terrain-Rasters ±240; siehe Rand-Test in 2.0).
   - **Zwei Felsinseln** als Props mit Collidern: die **Möwenklippe** (ein Fund liegt auf einem Felsvorsprung, den man vom Boot aus mit dem Haken erreicht; Klettern kommt später) und die **Wrackbank** (Wrack-Prop mit drei Kisten).
   - **Eine Nebelwand** vor der Wrackbank. Ohne Laterne dreht die Kielpost sanft ab, Glimm: „Zu dicht. Licht?“ Mit Laterne löst sich die Wand beim Durchfahren auf (Partikel, Ton).
3. **Bergen.**
   - **10 feste Fundorte**, keine Zufallsbeute, keine Neugenerierung: 6 treibende Kisten im Sektor, 3 an der Wrackbank, 1 auf dem Vorsprung der Möwenklippe.
   - **4 Materialien:** Holz, Tau, Tuch, Metall.
   - Haken: Aktion halten in 2 m Reichweite, die Leine spannt sich, die Kiste kommt längsseits. Fehlversuch: Die Kiste treibt ein Stück weiter, sonst nichts.
   - Materialzähler im Bild nur, solange man auf dem Boot oder an der Werft ist.
4. **Die Werft** (Werkbank im Bootshaus) mit **4 Teilen**, jedes als sichtbares Mesh an der Kielpost:
   - **Ausleger:** weniger Schaukeln
   - **Segel:** etwa +25 % Tempo
   - **Laterne:** öffnet die Nebelwand. Der Bauplan kommt von Ilda: Sie erwischt dich beim ersten Ablegen am Steg („Eine Fahrt. Ohne Mist.“) und gibt dir ihre alte Laterne („Nimm die. War meine.“)
   - **Farbe und Name:** 6 Farben, Name aus der bestehenden Wortliste (`content/wordlist.js`), **kein Freitext**
   - Die Kosten sind so gesetzt, dass alle 4 Teile mit 9 der 10 Funde gehen.
5. **Nest v1:** das Innere des Bootshauses (Roomkit) mit **Werkbank** und **2 Bauplätzen**, die die Mission braucht: **Fotowand** und **Dachboden-Ecke**. Nest-Werte ändern sich nur durch Ereignisse, **nie durch Zeit**.

**B. Zwei Gesprächs-Minispiele** (neue Vorlagen in der Minispiel-Hülle, eingehängt über `choice.minigame`)
1. **`leine` (Leine halten):** Knopf halten = bleiben; die Figur wendet sich ab → nachgeben (loslassen); die Figur rückt näher → halten. Test-Sätze der Figur als „Zucken“. Die **Falle** ist ein zweiter Knopf „Was sagen“: Er führt zu „Egal.“, nicht zum Abbruch. Rhythmus je Figur aus Parametern (Pausenlänge, Anzahl Stille-Wellen, Test-Sätze).
   - **Damit es kein Wartebildschirm ist:** Die Leine zeigt ihre Spannung (sie strafft und lockert sich sichtbar, leises Knarzen), die Kamera rückt bei jeder überstandenen Stille-Welle ein Stück näher, die Figur macht kleine Gesten (schaut kurz hoch, legt den Stift weg). Jede Welle ist ein kleiner Erfolg mit Ton.
2. **`oberflaeche` (Unter der Oberfläche):** Satz der Figur über einer Wasserlinie, darunter treibt eine Farbströmung (1 Strömung in der Kostprobe; Doppelmodus mit zwei Reglern 0–10 als Parameter vorbereitet). Tippen im Zeitfenster, danach das feine Wort aus 3 Möglichkeiten wählen.
- Beide: drei Modi (Entspannt, Abenteuer, Profi; unterscheiden sich in Fenstergröße und Dauer), Ergebnis `{ ok, medal }`, Scheitern heißt „Später.“ und ist nach einer Spielstunde (30 s echte Zeit) wieder möglich. X überspringt jederzeit: Dann kommt eine ruhige Kurzfassung mit derselben Belohnung.
- **Nach zwei erfolglosen Versuchen** bietet Glimm von sich aus die Kurzfassung an („Anders probieren?“ mit den großen Knöpfen „Ja, kurz“ und „Nochmal“). Niemand bleibt in einer Schleife aus Misserfolg hängen.

**C. Mission QUELLE (j1-e04) „Leck im Nest“** (etwa 12–15 min; Ablauf genau wie in `WERKZEUG-QUESTS.md` Nr. 1)
1. Leck stopfen: 2 Planken tragen (bestehendes Tragen), 1 Kiste mit dem Haken aus der Strömung ziehen. Logbuchseite 2 (Chronik).
2. Blick (Gläser): Ilda gibt die Blick-Stufe `tanks` mit **Glashöhe**. Neues Datenfeld pro Figur: Wichtigkeit je Glas (0–1) und **Gefäßform** (Tun: Blechdosen, Jolie: Tintenfässer, Ilda: Laternengläser). Zuerst zeigt der Blick nur die **Folge in der Welt** (Winde klemmt, Karte leer); die Gefäße erscheinen, wenn man den Blick hält. Namen aus `src/content/beduerfnisse.js`.
3. Tun: **Oberfläche** („gekränkt“), Spuren im Nest, Hängematten-Falle („Danke. Trotzdem.“), richtige Tat = Winde würdigen + Bild an die Fotowand.
4. Blitz-Motor-Falle: an der Werft baubar. Füllt Tuns Glas sofort, bekommt einen **Riss** und läuft bis zur nächsten Sitzung sichtbar aus (Zustand wird beim Laden der nächsten Sitzung umgestellt, nicht nach echter Zeit). Das Material bleibt als Deko-Motor erhalten.
5. Wasserwerk: bestehendes `e04-tank-leitungen`.
6. Jolie: **Leine halten**, dann Dachboden-Ecke bauen und Jolie die nächste Route wählen lassen (ein Marker auf einer einfachen Karte im Nest).
7. Crew-Glas am Feuer: anonyme Muscheln, Abstimmung über den nächsten Raum (nur als Wahl gespeichert, gebaut wird er später). Aufnäher „Bedürfnis-Pegel“ mit Rückseite *„Wichtig und leer = größte Lücke.“*, Lichtsplitter, Farbwelle.
8. **Spiegel im Baumhaus** (freiwillig, privat, im Lehrer-Panel abschaltbar und bis zur Datenschutz-Freigabe aus): sechs Gläser mit den Kurs-Namen und zwei Reglern, größte Lücke leuchtet, drei Schritt-Karten + „Keiner davon“, „Nicht heute“ mit demselben Stich. Schalter **Merken / Nicht merken**. Knopf **Zeigen** (Vollbild-Karte mit nur dem, was die Person auswählt; „Ausblenden“).
- Dazu: Kurzfassung (3 min: Blick (Gläser) + Crew-Glas), Echte-Welt-Karte, 2 Debrief-Fragen, Glimm-Zeilen, Einträge fürs Lehrerheft.

### 2.2 Dateien (neu oder geändert)
| Bereich | Dateien |
|---|---|
| Boot | `src/actors/boot.js` (neu, aus `src/minigames/rennen/boat.js`) · `src/minigames/rennen/index.js` (Import) · `src/actors/moves/boot.js` (neuer Zustand einsteigen/fahren/aussteigen) · `src/actors/moves/index.js` (registrieren) |
| Welt | `src/world/schaeren.js` (neu: 2 Felsinseln, Wrack-Prop, Nebelwand) · `src/world/island.js` (Weltgrenze pro Sektor, Sites `hafen.bootshaus`, `schaeren.moewenklippe`, `schaeren.wrackbank`) · `src/content/regions/hafen.js` (Sites) |
| Bergen | `src/systems/bergen/model.js`, `src/systems/bergen/plugin.js` (Fundorte, Haken, Materialien) · `src/content/bergen/hafen.js` (10 Fundorte) |
| Werft | `src/systems/werft/model.js`, `src/systems/werft/plugin.js` (Teile, Kosten, Einbau, Meshes) · `src/content/boot/teile.js` (4 Teile + Blitz-Motor) |
| Nest | `src/systems/nest/model.js`, `src/systems/nest/plugin.js` (Bauplätze, Nest-Gläser pro Figur, **kein Zeitverfall**) · Roomkit-Preset „bootshaus“ in `src/world/roomkit/presets.js` |
| Gespräche | `src/minigames/leine/index.js`, `src/minigames/leine/logic.js` · `src/minigames/oberflaeche/index.js`, `src/minigames/oberflaeche/logic.js` · `src/minigames/shell/plugin.js` (zwei Vorlagen registrieren) · `src/content/minigames/e04-leine-jolie.js`, `src/content/minigames/e04-oberflaeche-tun.js` |
| Mission | `src/content/quests/j1-e04.js` · `src/content/dialogues/e04-ilda-blick.js`, `e04-tun.js`, `e04-blitzmotor.js`, `e04-jolie.js`, `e04-crewglas.js` · `src/content/npcs/tun.js`, `src/content/npcs/jolie.js` (Wichtigkeit je Glas) · `src/systems/abilities/blick.js`, `src/systems/abilities/model.js` (Glashöhe) · `src/content/glimm.js` (Zeilen) · `src/content/beduerfnisse.js` (neu: die sechs Namen an einer Stelle) |
| Baumhaus / privat | `src/systems/baumhaus/stations.js`, `src/systems/baumhaus/plugin.js` (Station „Spiegel: Gläser“, Merken-Schalter, Zeigen-Karte) · Werte unter `state.private.spiegel` (liegt schon in `PRIVATE_PATHS`) · `src/ui/teacher/plugin.js` (Schalter „Spiegel-Stationen an/aus“, Feld „Vertrauensperson“ für die Funkboje) |
| Schema | `src/content/schema/defs.js` (Typen Fundort, Boots-Teil, Nest-Bauplatz, Minispiel-Parameter) · `tools/validate-content.mjs` falls nötig |
| Tests | `tests/unit/bergen.test.mjs`, `tests/unit/werft.test.mjs`, `tests/unit/nest.test.mjs`, `tests/unit/gespraech.test.mjs`, `tests/unit/spiegel.test.mjs` · `tests/scenarios/kostprobe.mjs` · `package.json` (Szenario in `npm test`) |
| Doku | `insel/docs/DEMO.md` (Abschnitt „Kostprobe“: Ablauf, Code, bekannte Lücken) |

### 2.3 Abnahme (alles muss stimmen)
1. **Alles grün:** `npm test` (Validator, Text-Linter, Unit-Tests, alle alten Szenarien inklusive `demo.mjs`). `dist/index.html` bleibt **eine** Datei, läuft offline, bleibt unter 3 MB.
2. **Szenario `kostprobe`** läuft ohne Bildschirm durch:
   - nach OTTER: am Steg einsteigen → 6 Funde bergen → an der Werft Laterne bauen → Nebelwand ist passierbar → Kiste an der Wrackbank bergen → am Bootshaus anlegen und aussteigen
   - Code QUELLE → alle Pflicht-Schritte fertig → Aufnäher, Lichtsplitter, Farbwelle, Fotowand und Dachboden-Ecke gebaut
   - Kurzfassung von QUELLE (auf frischem Spielstand) schaltet Blick-Stufe und Aufnäher frei.
3. **Kein Zufall:** Die Fundorte sind in zwei neuen Spielständen mit verschiedenem Seed identisch (Unit-Test).
4. **Kein Verfall:** Nest-Gläser bleiben nach simulierten 7 Tagen ohne Spielen gleich. Der Riss im Blitz-Motor-Glas hängt am Sitzungswechsel, nicht an der Uhr (Unit-Test).
5. **Privat bleibt privat:** Spiegel-Werte liegen unter `state.private.spiegel`, fehlen nachweislich im Export-Code, „Neu anfangen“ und Wipe löschen sie, „Nicht merken“ speichert nichts (Unit-Test). Die Zeigen-Karte schreibt nichts. Ist der Schalter „Spiegel-Stationen“ aus, erscheint die Station nicht und nichts wird angelegt (Unit-Test).
6. **Gesprächs-Minispiele:** in jedem Modus mit automatischer Eingabe schaffbar (Szenario). Scheitern gibt „Später.“ ohne Verlust, ein neuer Versuch ist möglich. Die Falle „Was sagen“ führt zu „Egal.“ und nicht zum Abbruch. X gibt die Kurzfassung mit gleicher Belohnung. Nach zwei Fehlversuchen erscheint Glimms Angebot „Anders probieren?“ (Szenario).
7. **Hartes Beenden:** Neu laden mitten auf dem Wasser und mitten in `leine` führt zum letzten abgeschlossenen Schritt, ohne kaputten Zustand (Szenario).
8. **Texte:** Linter grün (≤ 12 Wörter pro Blase, ≤ 2 Blasen vor einer Wahl, Glimm ≤ 6, keine Übungswörter). Alles vorlesbar. Keine Freitexteingabe irgendwo.
9. **Bedienung:** Alles geht mit Joystick, Springen, Aktion, Kraft. Pause/X überall erreichbar, auch auf dem Boot und in beiden Minispielen. Aussteigen ist nur am Anleger möglich, man bleibt nie auf dem Wasser „stecken“ (Rückruf zum Steg über Pause).
10. **Leistung:** Schären-Sektor und Boot auf „niedrig“ mit weniger als 1,5 ms Mehrkosten pro Frame, mindestens 30 fps auf dem **Referenzgerät** aus 2.0 (`tests/perf.mjs` plus ein Durchlauf von Hand auf dem Gerät).
11. **Lehrerheft** enthält QUELLE mit Rückseitensatz, Echte-Welt-Karte, 2 Debrief-Fragen, die Wortliste der Spielbegriffe mit Bild und den Satz „Eine eingelöste Quest heißt nicht, dass das Thema behandelt ist.“
12. **Handtest mit 2–4 Jugendlichen** (erst nach der Datenschutz-Freigabe):
    - **Rahmen:** freiwillig, ohne Note, ohne Bewertung. Ausgewählt wird, wer **Lust hat**, nicht nach Förderbedarf. Möglichst auch eine Person mit 15–16 Jahren. Die Lehrkraft beobachtet locker, **ohne Protokoll mit Namen**; notiert werden nur Beobachtungen ohne Personenbezug. Gesagt wird vorher: „Wir testen das Spiel, nicht euch. Wenn was nicht klappt, ist das Spiel schuld.“ Die Spiegel-Station bleibt im Handtest aus oder wird nur gezeigt, nicht benutzt.
    - **10 Minuten Freispiel** ohne Auftrag (nur fahren, bergen, bauen), dann die Mission.
    - **Fragen danach:** Würdest du das nochmal spielen, auch wenn niemand aus der Klasse zuschaut? Worum geht es, in einem Satz? Was ist bei Tun „wichtig“ und was „voll“? War „Leine halten“ ein Spiel oder Warten? Wirkt irgendwas zu kindisch? Welche Wörter aus dem Spiel kennst du noch?

### 2.4 Kürzungsliste (nur falls die Runde zu groß wird, in dieser Reihenfolge)
1. Farbe und Name des Bootes (kommt in R3).
2. Crew-Glas am Feuer nur als kurze Szene ohne Abstimmung.
3. Nebelwand ohne eigene Partikel (einfaches Ausblenden).
4. Zweiter Anleger: Aussteigen nur am Steg, das Nest ist zu Fuß erreichbar.
**Nie gekürzt:** Fahrgefühl, feste Funde, beide Gesprächs-Minispiele, der Kern von QUELLE, Datenschutz-Tests.

**Nicht im Umfang:** Board, Seekarte, weitere Inseln, Crew an Bord, Postbrett, Rennen gegen die Krater-Crew,
Echolot, Gegenwind, Der Knoten, Spielprofil, FOKUS-Codes, Mehrspieler, Hub-Anbindung.

---

## 3. Danach: schlanke Runden zur neuen Demo
| Runde | Inhalt | Aufwand (grob) |
|---|---|---|
| **R1** | **Kostprobe** (Kapitel 2) | 4–6 Agententage |
| **R2** | **Board v1** (Fahren, Ollie, Grind, Manual, Kombo-Zähler, Sturz, Deck-Farbe) + 6–10 Grind-Kanten am Hafen + EICHE (Board mit Fränz bauen, Mast-Gravur) | 4–6 Tage (erste Schätzung; wird von der bauenden Person vor der Zusage geprüft) |
| **R3** | **Seekarte** mit Nebel und Silhouette „nächste Woche“ · **Postbrett** (höchstens 3 Aufträge pro Inseltag, von Hand geschrieben) · Abend am Feuer mit Tat-Sätzen · Sitzungslänge und „Ebbe“ im Lehrer-Panel | 2–3 Tage |
| **R4** | **Crew an Bord** (2 Plätze, Stationen, Stimmung wirkt aufs Boot) · **Echolot** · WELLE neu als Sturmfahrt mit Sturm-Logbuch (die bestehende Test-Quest j1-e11 wird ersetzt) inklusive Lines-&-Veils-Zeile „Eltern und Verlust“ | 3–5 Tage |
| **R5** | **Spielprofil** (Tempo, Wahl, Sicherer Rahmen, Lesen) mit **Schnellwahl beim Start** für geteilte iPads · **FOKUS-Codes** (Code mit Prüfziffer, Kompass-Symbol, abschaltbar, ein Fokus zur Zeit, auf geteilten Geräten nur pro Sitzung) · Test mit der Klasse · Feinschliff | 2–3 Tage |

Danach geht es Modul für Modul nach `EINHEITEN-J1.md` weiter, mit den Werkzeug-Quests aus `WERKZEUG-QUESTS.md` zuerst.
Die zwei anspruchsvollsten, **LUCHS** (Beweise sortieren) und **BIBER** (Konflikt-Treppe), werden früh als Papier- oder
Klick-Prototyp mit 2–3 Jugendlichen getestet: Verstehen sie die Aufgabe ohne Zusatzerklärung?

**Falls das Freispiel allein zu wenig zieht** (Handtest-Frage „auch wenn niemand zuschaut?“): In R3 kommt ein
**Hafen-Tag** dazu: Wer mag, zeigt sein Boot und sein Nest am Beamer oder am Gerät des Nachbarn (Stolz zeigen, nichts
vergleichen), und das Nest bekommt eine **Crew-Wand**, an der man sieht, welche Figuren man schon an Bord hat. Echte
gemeinsame Fahrten kommen erst mit Stufe 2.
Die Plattform-Schicht (Inhaltspakete pro Fach, `PLATTFORM.md`) lohnt sich erst, wenn die Skills-Insel M0–M3 trägt.

## 4. Aufwand grob
- **Neue Demo (R1–R5):** etwa 3–4 Wochen Agentenarbeit, verteilt auf Runden mit Handtest dazwischen.
- **Staffel 1 komplett (39 Quests):** grob 2–3 Monate Agentenarbeit, je nach Tiefe der Set-Pieces. Die vorhandenen Minispiele und Systeme sparen viel.
- **Stufe 2 (Klassen-Raum):** eigenes Projekt (Server, God Mode, Datenschutz-Folgenabschätzung), frühestens nach Staffel 1 M0–M3.

## 5. Risiken und was wir dagegen tun
| Risiko | Gegenmittel |
|---|---|
| **Das Boot fühlt sich nicht gut an.** Dann trägt die Signatur nicht. | Fahrgefühl ist Abnahme-Punkt im Handtest. Erst Gefühl, dann Inhalt. Parameter (Beschleunigung, Schräglage, Gischt) zentral einstellbar. |
| **Zu viel auf einmal.** Die Kostprobe wird zur großen Runde. | Harte Liste „Nicht im Umfang“. Nur 4 Teile, 10 Funde, 2 Bauplätze, 2 Minispiele. |
| **Leistung auf alten iPads** (Wasser, Gischt, zusätzliche Props). | Sektor statt ganze Weltgrenze, Partikel auf „niedrig“ aus, `perf.mjs` als Abnahme. |
| **Terrain-Raster endet bei ±240.** Ein echtes Inselmeer passt nicht hinein; Kantenfehler am Rand. | Staffel 1 bleibt beim Schären-Ring (bis Radius 220), Rand-Test vor dem Bau (2.0). Das große Inselmeer kommt mit Staffel 2 als eigene Karte. |
| **Lesen und zu viele Begriffe:** Minispiele und Blick (Gläser) brauchen Erklärung; über ein Jahr kommen viele neue Wörter dazu. | Bilder statt Text (Ilda hält zwei Gläser hoch), Profil „Lesen“, Vorlesen überall, Linter. Höchstens 1–2 neue Systemwörter pro Modul, alles an Figuren heißt „Blick“, Wortliste im Lehrerheft, Handtest-Frage nach den Wörtern. |
| **Sensible Daten auf geteilten iPads.** | „Nicht merken“ als Standard auf geteilten Geräten, Baumhaus-Schloss, Ausblenden bei Pause, Unit-Tests für Export und Wipe. |
| **Leere Gläser deuten echte Not an.** | Keine automatische Meldung; Hinweis im Lehrerheft auf Gespräch und Schutzabläufe; Hilfe-Nummern immer sichtbar. |
| **Sog kippt in Druck.** | Feste Fundorte, kein Verfall, keine Serien, Postbrett mit Tagesgrenze, Sitzungslänge durch die Lehrkraft, „Ebbe“ als sanftes Ende. |
| **Die Geschichte überdeckt das Thema.** | Die 15 tragenden Quests haben das Thema als Kern der Spannung; Debrief-Fragen im Lehrerheft; Handtest-Frage „Worum ging es?“. |
| **Doppelte Wahrheit in den Dokumenten** (DESIGN.md, STORY.md, dieses Konzept). | Direkt nach Freigabe durch die Lehrkraft und **vor** dem Start der Kostprobe werden DESIGN §2/§12 und STORY.md angepasst (2.0 Punkt 1). |
| **Hub-Anbindung bringt Daten ins Spiel.** | Nur Codes ohne Personenmerkmal, nichts fließt zurück, keine KI-Dienste mit Schülerdaten. |
| **Zu kindlich für 15–16-Jährige** (Glimm, Tierbilder). | Handtest mit mindestens einer älteren Person; Glimm lässt sich im Pause-Menü leiser stellen (weniger Sprüche); der Ton der Geschichte bleibt ernst. |
| **Solo zieht weniger als GTA oder Fortnite mit Freunden.** | Handtest-Frage; notfalls Hafen-Tag und Crew-Wand in R3 (Kapitel 3); echtes Miteinander in Stufe 2. |
| **Sammeln kippt in Vollständigkeitsdruck.** | Kein „X von Y“, keine leeren Plätze, nichts hängt an 100 % (`KONZEPT.md` 3.5). |
| **Nach der Staffel ist nichts mehr zu bergen.** | Neue feste Funde pro Code-Woche und eine Nachsaison, nie Zufall. |

## 6. Wartung
- **Einmal pro Schuljahr** (zum Beispiel in der ersten Septemberwoche): Hilfe-Nummern und Vertrauensperson in der
  Funkboje prüfen und bei Bedarf ändern (eine Stelle in den Inhaltsdaten, heute in `src/content/units.js`, plus Feld „Vertrauensperson“ im Lehrer-Panel).
- Referenzgerät prüfen: Ist noch ein älteres iPad im Bestand, wird es das neue Referenzgerät.

## 7. Bewusst nicht übernommen (aus den Prüfungen)
| Hinweis | Warum nicht (oder nur teilweise) |
|---|---|
| Kostprobe auf 5–7 Agententage anheben **oder** ein Minispiel streichen | Die Lehrkraft will genau zwei Gesprächs-Minispiele in der Kostprobe, und der Rahmen ist eine Runde. Deshalb ehrliche Schätzung 4–6 Tage plus Kürzungsliste (2.4) statt Streichen eines Minispiels. |
| Asynchrone Bestzeit-Vergleiche mit Freunden (Geister-Boote anderer) schon in Staffel 1 | Das wäre ein Vergleich zwischen Personen. Wir bleiben bei „Bestzeit nur für sich“ und testen den Solo-Sog zuerst; als Ausweich gibt es Hafen-Tag und Crew-Wand (Kapitel 3). |
| Gläser über Figuren ganz abschaffen | Nur teilweise: Zuerst sieht man Folgen in der Welt, die Gefäße sind Detailansicht mit eigener Form je Figur. Ganz ohne Gläser fehlt die Brücke zum Blatt aus dem Kurs, die die Lehrkraft ausdrücklich will. |
| Eine dritte Notfallnummer fest eintragen (SOS Détresse) | Ergänzt als Prüfauftrag, nicht fest: Welche Stellen für 12–16-Jährige passen, entscheidet der psychosoziale Dienst des CDSE. Fest drin ist stattdessen die Vertrauensperson der Schule. |
| Den dritten Entwurf nachträglich prüfen | Es gibt keinen Text davon; er gilt als verworfen (`KONZEPT.md` 18). |
