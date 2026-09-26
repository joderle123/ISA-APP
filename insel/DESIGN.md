# LUMO – die Skills-Insel
### Staffel 1 · „Das zerbrochene Herzglas“
*Finales Spieldesign, ersetzt die alte DESIGN.md. Alle Namen sind Arbeitstitel und Daten: Die Klasse darf das Spiel, den Begleiter, die Vögel, die Figuren und die Orte umbenennen.*

## 0. Auf einen Blick
**Pitch für die Jugendlichen:** Du kommst mit dem letzten Boot auf eine Insel, die ihre Farben verliert. Ein grauer Schleier liegt überall dort, wo gestritten, geschwiegen oder ausgelacht wird. Seit der Nacht des Sommerfests ist das Leuchtfeuer aus, das Herzglas im Turm ist zerbrochen, und der Wärter ist verschwunden. Niemand will darüber reden. Du holst die Farben zurück, und zwar mit Kräften, die es in keinem anderen Spiel gibt: ein Segel aus sechs Gefühlen, ein Halt, der so stark ist wie die Menschen, die zu dir halten, und ein Klang, der Türen öffnet, wenn du ehrlich sagst, was los ist. Du kletterst auf eine Riesen-Mangrove, gehst mitten in ein Dauergewitter, bringst im Flüstermoor einen Steinriesen zu Fall und surfst durch eine leuchtende Wolkenstadt. Du findest neun Splitter und neun Erinnerungen an eine Nacht, die jede Person anders erlebt hat. Am Ende zündest du das Leuchtfeuer.

**Für die Lehrkraft:**
- 3D-Open-World (three.js, eine HTML-Datei, offline) für iPad und PC. Man spielt allein, 10–20 Minuten pro Sitzung, auf Deutsch mit Vorlesefunktion.
- Kursjahr 1 ist Staffel 1: 10 Module werden zu 10 Regionen, 30 Einheiten und 9 Joker zu 39 Quests. Der Code am Ende einer Einheit öffnet genau deren Quest.
- Das Spiel wiederholt keine Übung aus der Stunde. Es macht das Thema zur Spielregel und überträgt es auf neue Situationen.
- Der Transfer läuft über drei Brücken:
  - die Rückseite des Aufnähers (ein Satz mit dem Kursbegriff, nur für alle, die ihn umdrehen),
  - eine freiwillige Echte-Welt-Karte,
  - 1–2 Debrief-Fragen pro Quest im Lehrerheft.

### Die acht Gesetze
1. **Spaß zuerst.** Jede Region trägt auch ohne Kursinhalt: klettern, gleiten, tauchen, Rennen, Geheimnisse und Bosse.
2. **Die Fähigkeit ist die Spielregel.** Ruhe bedeutet Präzision, Beziehungen bedeuten Halt, ehrliche Sätze werden zu tragfähigen Brücken. Quizfragen gibt es nie.
3. **Berater:in und Held:in, nie Patient:in.** Die Probleme gehören erfundenen Figuren. Private Wahlen sind freiwillig, „keiner davon“ ist voreingestellt.
4. **Keine Übung aus der Stunde.** Atemübungen, Bodyscan, 5-4-3-2-1, Gedankenschiffchen und Traumreise gibt es nur im Kurs. Im Spiel tauchen Techniken nur als Weltobjekte und Physik auf.
5. **Benennen erst hinterher.** Es gibt keine Moral-Stimme. Den Kursbegriff trägt die Aufnäher-Rückseite.
6. **Nie beschämen, nie bestrafen.** Es gibt keinen Tod und keine öffentliche Rangliste, und niemand verliert dauerhaft Freunde. Ein Fehler kostet Sekunden, nie Würde.
7. **Wenig Text.** Höchstens 12 Wörter pro Blase und höchstens 2 Blasen, dann handelt man wieder. Alles kann vorgelesen werden.
8. **Sicherheit ist immer an.** Pause/X, Ausgang, Zurückspulen und „Hilfe holen“ hängen nie von einer Wahl, einem Level oder dem Puls ab.

## 1. Rahmen, Ton und Look
- **Zielgruppe:** 12–16 Jahre mit sozial-emotionalem Förderbedarf, eher schwache Leser:innen, CDSE Annexe Junglinster.
- **Geräte:** Schul-iPads (Safari, hoch und quer) und PC. Keine Konten, keine Namen, keine Netzwerkzugriffe. Alles wird lokal gespeichert.
- **Ton:** trocken, witzig, respektvoll. Die Figuren haben Macken, und Erwachsene schreiben keine Jugendsprache. Der Begleiter Glimm spricht 3–6 Wörter und lässt sich stummschalten. Figuren grüßen gelegentlich luxemburgisch („Moien!“).
- **Look:** Low-Poly mit Flat-Shading und kräftigen Paletten pro Region (siehe §11). Der Grauschleier entsättigt, jede Farbwelle ist ein Regenbogenring. Die Welt wirkt cool statt süß: Kreaturen sind schlank, kantig und haben leuchtende Kanten, es gibt keine Kulleraugen-Maskottchen. Jede Figur hat eine eigene Silhouette, eine Signaturfarbe und ein Icon-Namensschild. Jede Gefühlsfarbe hat zusätzlich ein Symbol (Sonne, Flamme, Zickzack, Tropfen, Wirbel, Stern), damit auch Farbenblinde sie erkennen. Die Farben des Gefühlsrads stellt die Lehrkraft passend zum Kursmaterial ein. Voreinstellung: Freude gelb, Wut rot, Angst violett, Traurigkeit blau, Ekel grün, Überraschung türkis.
- **Jahreszeiten:** Die Staffel folgt dem Schuljahr.
  - M0–M2: Spätsommer und Herbst, warmes Licht.
  - M3: Winterstürme.
  - M4–M6: Nebel und Tauwetter.
  - M7–M9: Frühling bis Sommer. Das Finale spielt in einer Sommernacht.

## 2. Die Staffel-Geschichte: Das zerbrochene Herzglas
**Ausgangslage:** Vor einem Jahr ging beim Sommerfest das Leuchtfeuer aus. Das Herzglas, die Linse im Turm, zerbrach in 9 Splitter. Wärter Jhemp verschwand. Seitdem schweigt die Insel, und der Grauschleier wächst.

**Die Wahrheit (nur für das Team).** Eine Kette von Missverständnissen, die von Person zu Person weitergereicht wurde:
1. Jhemp hat drei Nächte nicht geschlafen, weil er das Licht allein hütet. Auf der Festbühne stolpert er. *(Situation)*
2. Tun filmt es als Witz. Die Vulkan-Crew schneidet den Clip schneller und schreibt „Leuchtturm-Opa tanzt 😂“ darunter. In einer Stunde wird er 40-mal geteilt.
3. Jhemp sieht alle lachen und denkt: „Ich bin nur noch ein Witz.“ *(Gedanke)* Er fühlt Scham, dann Wut. *(Gefühl)*
4. Ilda ist gestresst und sagt „Reiß dich zusammen!“, statt zu fragen.
5. Jhemp ist im roten Bereich. Er rennt in den Turm und knallt die Tür zu, das Herzglas kippt und zerbricht. *(Verhalten: ein Unfall, keine Absicht)*
6. Danach sagt niemand etwas. Tun schämt sich, Mika spielt den Coolen, Ilda fährt nachts aufs Meer, Pit glaubt, das Lachen galt ihm, und Jhemp versteckt sich.

Aus dem Ungesagten spinnt **Grisel, die Schleiermotte**, den Grauschleier.

**Kernsatz: Nicht der Knall hat die Insel grau gemacht, sondern das Schweigen danach.** Der Ausbruch ist verständlich und lässt sich wiedergutmachen. Wer im roten Bereich ist, ist nie „vom Schleier befallen“. Es gibt keinen Bösewicht, und die Auflösung heißt Wiedergutmachung statt Schuld.

**Neun Splitter, neun Erinnerungen.** Jede Erinnerung ist ein stilles 3D-Diorama in der Farbe des Gefühls der erinnernden Person, mit einer Bildunterschrift von höchstens 12 Wörtern. So sieht man: Gefühle filtern, was man erinnert.

| # | Wann | Wessen Erinnerung | Filter | Was man sieht | Glied der Kette |
|---|---|---|---|---|---|
| 1 | e01 | Fundstück von Jolie | – | Laternen, ein Knall, der Turm wird dunkel | Situation |
| 2 | e06 | Tiago | Anerkennung | Niemand schaut seine Surf-Show, alle lachen aufs Handy | ein Video geht herum |
| 3 | e10 | Maëlle | Angst | Musik bricht ab, Knall, Leute rennen | der Knall |
| 4 | e15 | Jhemp | Scham/Rot | alles zu laut, die Tür knallt, das Glas kippt: „Ich wollte nur weg“ | Verhalten bei Rot |
| 5 | e18 | Pit | Glaubenssatz | Er war sicher, das Lachen galt ihm | ein Gedanke färbt das Gefühl |
| 6 | e23 | Oma Lucinda | Genau hingehört | Ilda: „Reiß dich zusammen!“ | Du-Botschaft statt Frage |
| 7 | e26 | Mika | Gruppendruck | Die Crew schneidet den Clip, alle teilen | Verstärker, Druck |
| 8 | e28 | Glimmer-Archiv (Kim) | Daten | Tuns harmloses Original, dann der beschleunigte Schnitt, dann 40 Reposts | Quelle, Algorithmus |
| 9 | e29 | Jhemp und Ilda | Erschöpfung | drei Nächte ohne Schlaf, Ilda fährt aufs Meer statt zu reden | Gesundheit und Schweigen |

In der **Chronik** (Pinnwand im Baumhaus) legt man die Splitter als Bilder auf einen Zeitstrahl. Freiwillige Detektiv-Aufgaben: Widersprüche finden und fragen, „warum“ jemand so gehandelt hat. Für die Hauptgeschichte ist dabei nie Lesen nötig. Grisel sieht man im Intro als Schatten vor dem Mond und ab M3 in der Ferne. Im Finale hört man ihr zu, dann wird sie zum Lichtfalter.

## 3. Spielschleifen
- **30 Sekunden:** laufen, springen, gleiten, klettern, mit dem Blick scannen. Man entdeckt einen Lichtsplitter, einen Vogel, ein Tor oder eine Figur.
- **3 Minuten:** ein Tor, ein Rennen, eine Szene, eine Befreundung oder eine Kammer-Stufe. Jedes Mal passiert etwas Sichtbares: Farbe kehrt zurück, ein Aufnäher kommt dazu, eine Kraft wächst, die Karte füllt sich.
- **Sitzung = etwa ein Inseltag (720 s Tageszyklus):**
  1. **„Letztes Mal“:** 15 Sekunden mit drei Bildkarten (wo du warst, was du geschafft hast, was als Nächstes leuchtet), vorgelesen, überspringbar.
  2. **Ein Hauptmarker** und immer ein Ziel, das weniger als 3 Minuten entfernt ist.
  3. **Abend am Feuer:** Beim Beenden über „Für heute Schluss“, an einem Signalfeuer oder nach einer Hauptquest folgt eine Szene von 60–90 Sekunden. Bis zu 3 Figuren, denen du heute geholfen hast, sagen je einen Satz zu deiner Tat (aus dem Taten-Log). Ab e05 fragt Glimm „Bester Moment heute?“ und zeigt drei Bilder. Das gewählte fliegt als Glühwürmchen ins Glas. Danach folgt ein Cliffhanger-Satz zum Geheimnis, dann wird gespeichert.
- **Woche:** Der Code öffnet die Hauptquest (höchstens 20 Minuten, verteilt auf 1–2 Sitzungen), eine neue Kraft oder Stufe, eine Regionsschicht, einen Aufnäher, eine Echte-Welt-Karte und 1–2 freiwillige Herausforderungen. Zwischen zwei Codes gibt es immer etwas zu tun: Nachtwachen, Lichtkammern, Rennstrecken, Nebelkerne, Muschel-Mäxchen und Sammelsachen.
- **Staffel:** Die Insel wird mit jeder Einheit etwas bunter, pro Einheit gibt es eine Teil-Farbwelle. Gebiete, die noch kommen, sind sichtbar, aber gesperrt: Jedes Tor zeigt das Symbol der Fähigkeit, die es braucht. Ab M6 kommt der **Schleier-Rückfall**: Der Schleier legt sich dicker über schon befreite Orte, und man kommt mit allen Kräften zurück.

**Beispiel-Sitzung (Woche 11):**
- **0:00** Start im Baumhaus. Letztes Mal: Dschungel bunt, Kombi-Segel, Glimm zeigt zu den Klippen. Glimm: „Ich hab jetzt Farben. Schau.“
- **0:40** Man gleitet vom Baumhaus-Podest. Eine Freude-Rune gibt Aufwind, eine Angst-Rune vor den Klippen gibt Zeitlupe, und brüchige Kanten leuchten rot.
- **3:00** Klippentor: Böen, Donner, Luc schreit. Glimm wird gelb, das Segel wackelt. Man stellt sich drei Sekunden hinter einen Windschatten-Felsen, und Glimm wird grün. Das ist eine Routenentscheidung, keine Übung.
- **6:00** Luc steht bei 90. Reden bringt nur „…“ und „Lass mich!“. Man packt seine Drachenleine und zieht im Takt der Böen. Beide Pulse sinken, und jetzt fragt eine von vier Antworten, was los war.
- **9:00** Er zeigt eine versiegelte Schlucht mit Klangmuschel-Symbol. Das ist der Teaser für nächste Woche.
- **10:30** Lichtkammer „Blitzableiter“. Nach zwei Stürzen erscheint ein Windschatten-Stein, der Puls sinkt. Ergebnis: Silber.
- **14:00** Teil-Farbwelle über die Klippen, Aufnäher „Sturmbarometer“, Echte-Welt-Karte. Dann „Für heute Schluss“: Am Feuer sagt Luc „Danke für die Leine.“ Cliffhanger: Ein Blitz zeigt eine Gestalt am Gipfel.

## 4. Steuerung und Verben
| | Touch | PC |
|---|---|---|
| Laufen/Sprinten | Joystick links, weit ausgelenkt = sprinten | WASD, Umschalt = gehen |
| Kamera/Zoom | rechts wischen, zwei Finger | Maus, Rad |
| Springen | Knopf; am Boden halten = Pumpsprung (ab e12); in der Luft halten = Segel | Leertaste |
| Aktion | Knopf mit Kontext-Label (Reden, Nehmen, Tragen, Hinsetzen, Benutzen, Loslassen) | E |
| Kraft | tippen = aktive Kraft; halten = Kraft-Rad (4 Segmente, Zeitlupe auf 25 %) | Q tippen/halten, 1–4 direkt |
| Pause/X | immer oben rechts | Esc; Tab = Tagebuch |

**Verb-Budget:** höchstens 3 Knöpfe plus ein Rad. Pro Einheit kommt höchstens ein neues Verb, insgesamt 7 in der Staffel. Jedes neue Verb bekommt einen 60-Sekunden-Spielplatz, auf dem man nicht scheitern kann.

| # | Verb | ab | Eingabe |
|---|---|---|---|
| 1 | Blick | e01 | Kraft |
| 2 | Teamgeist (Crew-Ruf) | e03 | Kraft-Rad, zielen auf Markierung, Helfer wählen |
| 3 | Schwimmen | e05 | automatisch in tiefem Wasser, Springen = Delfinsprung |
| 4 | Klettern | e06 | gegen kletterbare Fläche laufen; Springen = Klettersprung; Aktion = loslassen |
| 5 | Gefühlssegel (mit Tauchen ab e08, Kombis ab e10) | e07 | Springen in der Luft halten |
| 6 | Ruhe (Skills-Koffer) | e12 | Kraft-Rad; tippen nutzt das Gadget, das der Ampelplan für die aktuelle Zone vorsieht |
| 7 | Mut (Klarklang e21, Stopp e23, Nein e25) | e21 | Kraft-Rad, je nach Kontext |

Weitere Bewegungsdetails:
- **Halt-Ring beim Klettern:** Die Segmente sind die **Wurzeln**: Basis 3, dazu je Bindungsstufe ein Segment sowie Lieblingsort, Krabbe und Wenn-dann-Karte, höchstens 12. Auf Simsen regeneriert der Ring. Ist er leer, rutscht man langsam zur letzten Kante ab und stürzt nie.
- **Segel-Modi:** Im Modus Entspannt und Abenteuer schaltet das Segel an Rune-Toren automatisch um (Farbblitz und Vogelruf). Im Modus Profi wählt man selbst im Rad.
- **Tauchen:** Tauchringe oder ein Trauer-Sturzflug führen in kurze Unterwasser-Räume. Man kann nicht ertrinken.
- **Tragen:** Getragene Dinge schwappen, wenn man rennt oder hart landet.
- **Stürze:** Wer in Leere oder Lava fällt, startet in weniger als 2 Sekunden an der letzten Kante neu.

## 5. Die vier Kräfte
| Kraft | Stufen |
|---|---|
| **Empathie-Blick** | e01 Auren (Farbe = Gefühl; Antippen liest ein feineres Wort aus dem äußeren Ring, 36 Wörter sammelbar) · e02 Fäden (Gemeinsamkeiten) · e04 Tanks · e09 Körpersignale · e10 Doppel-Aura und Stärke 0–10 · e22 Grenz-Radien · e24 Streit-Tiere · e28 Masken-Blick (Außen- gegen Innenaura) |
| **Ruhe** (ersetzt das alte „Einatmen/Ausatmen“ vollständig) | e11 Puls · e12 Körper-Gadgets · e13 Sinnes-Gadgets · e14 Kopf-Gadgets und Sicherer Ort · e15 Ampelplan und Notfall · e29 Rucksack und Wenn-dann |
| **Mut** | e20 Zeichen (Körpersprache in Szenen) · e21 Klarklang und Lauschen · e23 Stopp-Schild · e25 Nein-Züge · e26 Zivilcourage-Leiter |
| **Teamgeist** | e03 Crew-Ruf · e15 Hilfe holen (als Dialogoption schon ab e11) · e25 zweites Nein · e26 Zuschauer-Wende · e30 alle |

**Profi-Modus:** Die Aurafarben sind aus. Man liest nur Körpersprache: Schultern, Kopf, Blick, Fäuste, Abstand und Hände.

## 6. Puls (ab e11)
Glimms Farbe zeigt den Puls: grün 0–30, gelb 30–70, rot 70–100. Zahlen sieht man nur im Skills-Tester.
- **Quellen:** Böen, Donner, Zeitdruck, Provokation, Vulkanhitze, Glimmer-Kugeln und Fehlschläge (je +8).
- **Senken:** Windschatten, ruhige Orte, Gadgets, ruhige Figuren in der Nähe (Co-Regulation), Hilfe holen und natürliches Abklingen.

| | Entspannt | Abenteuer | Profi |
|---|---|---|---|
| Gelb | leichte Vignette | Segel ±5 %, Greifen −15 % | ±10 %, −25 % |
| Rot | Vignette, Glimm rot; Steuerung unverändert | Greifen −30 % | Greifen −40 %, Segel ±15 % |
| In allen Modi | Kopf-Gadgets verpuffen bei Rot. Dialogwahlen: grün 4, gelb 3, rot 2. „Rückzug“ und „Hilfe holen“ gibt es immer. | | |

**Anti-Spirale:**
- Fehlschläge treiben den Puls höchstens bis 55.
- Nach 2 Fehlschlägen hintereinander sinkt der Puls um 20, und es erscheinen ein Windschatten-Stein oder eine Abkürzung. Glimm: „Da drüben. Windstille.“
- Der Schalter „reduzierte Effekte“ nimmt Vignette, Wackeln und Herzschlag heraus.
- Bosse deckeln den Puls. Kein Spielabschnitt zwingt ohne Ausweg über 80.

**NPC-Puls „Deckel ab“:** Figuren über 70 prallen Argumente ab. Hier hilft nur Handeln (Leine ziehen, Abstand, Kälte, Hilfe holen), erst danach Reden.

## 7. Skills-Koffer und Ampelplan
Der Koffer hat 5 Fächer wie im Kurs: Körper, Sinne, Kopf, Menschen, Aktivitäten.

| Gadget | Fach | ab | Wirkung | Zonen |
|---|---|---|---|---|
| Pumpsprung (Springen halten: anspannen, loslassen) | Körper | e12 | hoher Sprung, Puls −15 | alle |
| Sprint-Ventil (5 s voll sprinten) | Körper | e12 | danach Puls −20; ein Graph zeigt vorher/nachher | alle |
| Quetschkoralle | Körper | e12 | Puls −20 | alle |
| Tandem-Takt (im Schritt einer ruhigen Figur gehen) | Menschen | e12 | beide Pulse sinken | alle |
| Kältekristall (werfen) | Sinne | e13 | Sturmfeld friert ein, Puls −30 | alle |
| Klangmuschel | Sinne | e13 | unsichtbare Plattformen, solange der Ton klingt | alle |
| Anker-Stein | Sinne | e13 | Kamerawackeln stoppt 10 s | alle |
| Playlist „Runter/Auf“ (Jukebox) | Aktivität | e13 | verändert Wetter, Tiere und Puls | alle |
| Zähl-Laterne, ABC-Rune | Kopf | e14 | öffnen Schlösser | nur grün/gelb |
| Hilfe holen (Notfall-Slot) | Menschen | e15 | eine erwachsene Figur kommt, die Szene pausiert, Puls −50 | immer |

- **Skills-Tester:** Die Wirkung schwankt pro Spielstand (Faktor 0,7–1,3) und pro Figur (Luc braucht Sprints, Pit braucht Klang). Der Tester zeigt Vorher/Nachher und eine Reichweite („hilft bis 60“). So findet jede:r heraus, was bei ihr oder ihm wirkt.
- **Ampelplan:** Pro Zone gibt es ein Gadget plus den Notfall-Slot. Wer ein Kopf-Gadget auf Rot legt, merkt selbst, dass es verpufft. Das kostet nichts, man baut an einem Koffer-Stein einfach um.
- **Sicherer Ort** (e14, kein Gadget, gehört zur Sicherheit): eine selbstgebaute Taschenwelt mit Biom, Licht, Wetter, Klängen und auf Wunsch einem Tier. Man erreicht sie immer über das Pause-Menü, der Puls fällt auf 10. Vor e14 übernimmt die Hängematte im Baumhaus diese Rolle.

## 8. Avatar, Glimm, Baumhaus
- **Stil-Studio** (Spiegel im Baumhaus und beim ersten Start):
  - Körper: 16 Hauttöne, Regler für Statur und Größe ohne Geschlechtsvorgaben.
  - Frisuren: kurz, lang, Locken, Afro, Locs, Flechtzöpfe, Buzz, Dutt, Stachel, Glatze, Kopftuch/Hijab.
  - Gesicht: Augenbrauen, Sommersprossen, Vitiligo.
  - Hilfsmittel: Brille, Hörgerät, Armprothese. Sie sind voll animiert und machen spielerisch keinen Unterschied.
  - Kleidung in Schichten (Kopf, Oberteil, Unterteil, Schuhe), freie Farbwahl, Muster (Streifen, Camo, Verlauf, Batik, Leuchtkante).
  - Statt eines Namens gibt es einen erzeugten Spielnamen („Nebelfuchs 7“). Es gibt keinen Shop und kein Geld.
  - **Rollstuhl:** in Staffel 1 bewusst nicht, weil ein Sprung-Plattformer Rampen und Gleitalternativen braucht. Das ist eine Entscheidung für Staffel 2 (§22).
- **Aufnäher:** Jede Einheit gibt einen Aufnäher für Hoodie-Rücken und Ärmel. So trägt man den Skills-Pass am Körper. **Crew-Jacke:** Im Finale schreiben Figuren mit Bindung 2 oder mehr je eine konkrete Stärke ins Futter.
- **Glimm:** ein schlanker Lichtsalamander auf der Schulter, Skins Axolotl und Funkenfledermaus. Seine Farbe ist dein Puls. Er ist anfangs zynisch („Gefühle? Nutzlos.“) und wird von den Levels immer wieder widerlegt. Im Finale gibt er zu, dass er selbst grau war.
- **Baumhaus** (Feigenbaum am Hafen):
  - Möbel aus Regionsmaterialien
  - Stärken-Bonsai: Früchte für echte Taten
  - Jukebox
  - das Glas (anonyme Muscheln, nur auf dem Gerät)
  - die Tür zum Sicheren Ort
  - die Chronik
  - Trophäenwand
  - Muschel-Mäxchen-Tisch
  - Fotowand (Fotomodus, lokal)

## 9. Fortschritt und Schwierigkeit
| | Entspannt | Abenteuer (Standard) | Profi |
|---|---|---|---|
| Auren | an | an | Farben aus |
| Segel-Modi | automatisch | automatisch | selbst wählen |
| Puls-Anstieg | ×0,6 | ×1 | ×1,3 |
| Steuerung bei Gelb/Rot | nur optisch | leicht | deutlich |
| Minispiel-Timings | großzügig | Standard | eng |

- **Modus:** Man kann ihn jederzeit wechseln. Die Namen sind neutral, nie „leicht“. Zurückspulen ist immer unbegrenzt.
- **Medaillen-Hülle** für jede Kammer, jedes Rennen und jedes Minispiel:
  - Für die Geschichte reicht Bronze. Silber und Gold sind echtes Können.
  - Der **Leuchtstern** ist eine versteckte vierte Stufe (ohne Hinweis und ohne Zurückspulen). Er wird nirgends angekündigt.
  - Vor jedem Start wählt man den Modus. Nach 3 Fehlversuchen bietet das Spiel leise „Rückenwind?“ an (langsamer, ein Hinweis). Neustart dauert unter 1 s.
  - Bestwerte sieht nur man selbst, gespeichert nur auf dem Gerät.
- **Stille Hinweisleiter** (bildet die ELDiB-Hilfestufen ab, ohne sie je anzuzeigen): nach 2 Stürzen Rückenwind, nach 3 schaut Glimm hin, nach 5 leuchtet das Ziel, nach 8 wird Überspringen angeboten („geht später nochmal“).
- **Schichten von „nicht zu einfach“:**
  1. Der Hauptweg ist in Entspannt immer lösbar.
  2. **10 Lichtkammern**, je 3 Räume mit kombinierten Fähigkeiten: Kisten-, Gezeiten-, Feder-, Blitzableiter-, Stein-, Klang-, Glut-, Orb-, Dampf- und Meisterkammer.
  3. **6 Rennstrecken:** Hafen-Dächer, Mangroven-Kletterei, Kronen-Segeln, Sturmlauf, Ascherutsche, Glimmer-Ringe.
  4. **10 Nebelkerne:** schwere, versteckte Knoten aus Grau, die man mit Fähigkeits-Kombis löst (etwa Trauer-Tauchen, dann Flut, dann die Wand hinauf). Belohnung: seltene Segel.
  5. **24 Knobel-Tafeln:** freiwillig und bildbasiert (Tank-Leitungen, Feuerwerks-Tischordnung, Sternbild-Fäden, Domino-Ketten).
  6. **Sammeln:** 100 Lichtsplitter, 30 Erinnerungsmuscheln (Jhemps Geschichte in Bildern), 12 Aussichtspunkte (8 s stillstehen: Kartenstück und versteckte Splitter), ein geheimes 11. Segel für alles.
- **Bindung** (0–3 pro Hauptfigur) öffnet die Karte. Stufe 2 schenkt eine Wegfähigkeit, zum Beispiel:
  - Tiago: Surfbrett zum Riff
  - Jolie: Spalten
  - Luc: Aufwind-Fächer
  - Maëlle: Blütenbrücken
  - Pit: Moos-Abkürzungen
  - Noor: Farbmarkierungen auf der Karte
  - Lucinda: Gartenpforte und Kochrezepte
  - Mika: Lavatunnel
  - Yara: Lichtschienen
  - Kim: Netz-Schnellreise
  - Senait: Schleichpfade

  Stufe 3 gibt einen Aufnäher für die Crew-Jacke und eine Lagerfeuer-Geschichte. Bindungen sinken nie dauerhaft.
- **Echos:** Figuren zitieren Wochen später deine Taten („Du warst da, als ich allein am Steg saß.“). Negative Echos sind höchstens vorübergehend „verstimmt“. Sie nennen immer ihre Ursache und haben eine sichtbare Reparatur-Quest.
- **Nachtwache** (ab e05, nachts): In einer befreiten Region ist die Laterne einer Figur aus. Man findet sie über die Abweichung vom Tagesablauf und über Spuren im Blick. Dann liest man sie: Haltung gegen Worte, ab e28 Innen- gegen Außenaura. Und man hilft: sich dazusetzen, etwas bringen, zuhören oder Abstand lassen und eine erwachsene Person holen. Das Leitmotiv ist „Wer braucht heute jemanden?“, nie „Wer ist schuld?“. Etwa 20 Varianten.

## 10. Kursanbindung und Lehrer-Modus
- **Codes:** Format zwei Wörter plus zwei Ziffern (WELLE-KORN-11). Die Wörter kommen aus einer Offline-Liste mit 256 Wörtern ohne Umlaute. Der Code entsteht aus einem gesalzenen Hash über Art und ID, ist offline prüfbar und unabhängig von Groß-/Kleinschreibung. Man gibt ihn mit einer Wort-Vorschlagsliste und einem Zahlenrad ein, er wird vorgelesen. Codes schützen vor Raten, nicht vor Neugierigen, und sie schalten nur Spiel frei.
- **Arten:** 39 Einheiten-Codes, 10 Modul-Codes (für Neue), ein Demo-Code (Team), ein Lehrer-Code (öffnet das Lehrer-Panel) und 3 Inselwetter-Codes.
- **Ein Einheiten-Code öffnet:** die Hauptquest, die Kraft oder Stufe, die Regionsschicht, den Aufnäher, die Echte-Welt-Karte und die freiwilligen Extras. Inhalte kommen nie vor der Stunde.
- **Verpasst?** Jeder spätere Code setzt frühere Einheiten ohne Code auf **Kurzfassung**: Fähigkeit, Splitter und Schleier-Anteil sind da, dazu eine spielbare 3-Minuten-Szene. Die volle Quest bleibt mit ihrem Code erhalten. Niemand steht je vor einem Tor, das er oder sie nicht öffnen kann.
- **Joker:** Event-Episoden, frei platzierbar, nie nötig für den Hauptweg. **j08 steht nur in der Lehrer-Liste.**
- **Echte-Welt-Karte:** erscheint nach der Quest im Tagebuch und wird einmal angetippt: „gemacht“, „versucht“ oder „diesmal nicht“. Jede Antwort gibt dieselbe kleine Belohnung (ein Stich auf dem Aufnäher). Es gibt keine Nachfrage, keine Serie und keine Erinnerung, nichts verlässt das Gerät.
- **Aufnäher-Rückseite:** Wer den Aufnäher umdreht, liest den Kursbegriff in einem Satz. Das ist die Brücke im Unterricht: „Dreht mal eure Aufnäher um.“ Die Spielnamen sind Kurswörter: Tank, Pult, Zone, Koffer, Ampel, Treppe, Leiter, Stopp.
- **Lehrerheft** (`dist/lehrerheft.html`, beim Build erzeugt und druckbar): pro Einheit Code, Kursziele, Mechanik, Rückseiten-Satz, 1–2 Debrief-Fragen und Echte-Welt-Karte.
- **Lehrer-Panel:**
  - Codeliste
  - Inselwetter: Ruhewetter mit goldenem Abend, gebremsten Stürmen und halbiertem Puls für 20 Minuten, das alle gleichzeitig eintippen, sodass niemand herausgehoben wird. Dazu Festwetter und Frühlingswetter.
  - **Lines & Veils:** e17, e26, e28, j08 und markierte Szenen werden bei einem aktuellen Vorfall nur als Kurzfassung ohne Szene gezeigt.
  - Figuren, Glimm und Vögel umbenennen, sodass kein NPC so heißt wie ein Kind der Gruppe.
  - Farben des Gefühlsrads
  - Übersicht, welche Codes auf diesem Gerät eingelöst sind (keine Personendaten)
- **Wochen-Code (Klassebuch, später):** Der alte `#q=`-Mechanismus bleibt als optionale Fokus-Quest. Er trägt nur Flags, nie Namen, Diagnosen oder private Wahlen. ELDiB taucht nur als Item-Code auf, nie als Katalogtext.

## 11. Die Regionen (eine pro Modul)
Die Insel (Radius 170 m) bekommt keine neue Landmasse. Neu entstehen vertikale Ebenen, Innenräume, eine 8. Zone (Moor) und Schleier-Flecken.

**M0 Ankommen: Hafen-Dorf** (Zone `hafen` 6/110; Baumhaus −30/98; Hafengrotte als Innenraum)
- Fantasie: Du bist neu am letzten bunten Ort und machst ihn zu deiner Basis.
- Look: goldene Stunde, Wimpelketten, bunte Holzhäuser, Laternen, Fischerboote. Am Ortsrand steht der Schleier wie eine Nebelwand, auf der Halbinsel der dunkle Turm.
- Mechanik: Bewegungs-Tutorial durchs Spielen, Blick, Hafen-Kodex, Signalfeuer (Schnellreise und Speichern), Crew-Ruf, Lotsen im Dunkeln.
- Set-Piece: **Laternenfest**, eine Lichterkette über der Bucht mit Feuerwerk.
- Schleier: 0,6, dann 0,3 (e01), dann 0 (e03).

**M1 Wer bin ich?: Palmenstrand, Gezeitenhöhle und Riesen-Mangrove** (Zone `strand`; Muschelbucht 128/38; Höhle 160/0; Mangrove ≈150/−8 als Fleck)
- Fantasie: Du beherrschst Ebbe und Flut und kletterst auf den ältesten Baum der Insel.
- Look: türkise Lagune, leuchtende Becken, biolumineszente Höhle, eine Mangrove mit Wurzelbögen und einer Krone über den Wolken.
- Mechanik: Tanks, Wunsch und Bedürfnis, schwappendes Tankwasser, Gezeitenhörner (lang blasen = Flut: schwimmen, Echo, Krabben; kurz = Ebbe: Böden freilegen, schleichen, Flüstern hören), Spiegelbecken, Klettern.
- Set-Piece: **Brandungsorgel**, eine höhlengroße Orgel im Wechsel von laut und leise, während die Flut die Halle füllt.

**M2 Gefühle verstehen: Dschungel und Wasserfall** (Zone `dschungel`; Tränensee = vorhandener Teich; Kronendorf auf Baumriesen um 70/−70 in 14–22 m Höhe; Federtempel und Muschelgrotte als Innenräume)
- Fantasie: Du fliegst mit einem Segel aus deinen Gefühlen.
- Look: Riesenblüten, die sich zur Musik öffnen, Nebel, ein Regenbogen-Wasserfall, Vögel in sechs Farben.
- Mechanik: sechs Gefühlsvögel mit Befreundungsregeln, Segel-Modi, Bootsrennen mit Ruderwahl, Tauchen, Körpersignale, Doppel-Auren.
- Set-Piece: Kombi-Segelflug vom Wasserfall durch die Laternenringe des Abschiedsfests. Der Dschungel blüht auf.

**M3 Gefühle regulieren: Sturmklippen** (Zone `klippen` mit vorhandenem Dauergewitter; Wetterwarte −98/−70; Klangschlucht zu den Felsnadeln im Meer; Gedankenschlucht; Jhemps Sturmhütte am Gipfel)
- Fantasie: Du gehst mitten in ein Gewitter und behältst die Kontrolle.
- Look: Basalt, waagrechter Regen, Blitze, Lucs Windräder, Sonnenstrahlen durch Wolkenlöcher.
- Mechanik: Puls, Windschatten-Routen, Koffer, Ampelplan, Hilfe holen.
- Set-Piece: **Der Gewitter-Titan.** Der Leuchtturm flackert zum ersten Mal.

**M4 Meine Gedanken: Flüstermoor** (neue Zone `moor` −114/68, r 26, Senke mit Torfbecken und Bohlenwegen)
- Fantasie: Detektiv:in in einem Nebelmoor, in dem Sätze zu Steinen werden.
- Look: Irrlichter, Menhire, Moorbirken. Die Farbe kehrt als lila Heide zurück.
- Mechanik: Flüstersteine machen schwer, Domino-Szenen, Faktenkristalle gegen Urteilsblasen, Satz-Schmiede mit Brettphysik, Flüsterkrähen-Duell.
- Set-Piece: **Der Steinriese „Urteil“.**

**M5 Kommunikation und Grenzen: Markt-Hügel** (Zone `markt`; Terrassengärten, Bühne, Noors Mauer, Oma Lucindas Garten)
- Fantasie: Du gibst einem verstummten Markt die Sprache zurück.
- Look: Markisen, Gewürzfarben, Lichterketten, überall graue Sprechblasen.
- Mechanik: Zeichen, Stimm-Summen, Rückfragen, Klarklang, Lauschen, Grenz-Sicht, Stopp-Schild.
- Set-Pieces: Alle grauen Blasen platzen auf einmal in Farbe (e20), und die Nacht des Garten-Wächters (e23).

**M6 Wenn es schwierig wird: Vulkan und Schleier-Rückfall** (Zone `vulkan`; Serpentine = Friedenstreppe; Kraterrand; Rückfall-Flecken über Surfspot und Kronendorf)
- Fantasie: Du steigst auf den Feuerberg und lässt dich nicht in die Lava schubsen.
- Look: Obsidian, Lavaadern, Aschenschnee, Crew-Flaggen, nachts Lavalicht.
- Mechanik: Treppe mit Abrutschen, Hitze-Ringe (Komfort, Lernen, Panik), Druckwellen, vier Nein-Züge, zweites Nein, Streit-Tiere, Schatten-Chor.
- Set-Pieces: **Mutprobe bei Nacht** und **Schatten-Chor**.

**M7 Digitale Welt: Glimmerwolke** (vertikale Ebene: 7 schwebende Inseln in 70–110 m Höhe über der Nordküste, Zentrum ≈20/−118, erreichbar über den Aufwind aus dem Krater; Innenräume Echokammer, Trugbild-Werkstatt, Kontrollraum)
- Fantasie: Du surfst durch das leuchtende Netz der Insel.
- Look: Neon-Pastell, Antennenbäume, Hologramm-Tafeln, Lichtschienen, weit unten die Insel.
- Mechanik: Benachrichtigungs-Kugeln ziehen das Segel an und lassen die Sonne springen, Scroll-Strudel, Fotomodus, Kommentar-Lampen, Repost-Knoten, Teilen-Bremse.
- Set-Piece: **Die Echokammer.**

**M8 Gesund und stark: Quellental** (Fleck an der Vulkan-Nordostflanke ≈54/−30; drei heiße Quellen, Dampffelder, Nachtwald)
- Fantasie: eine echte Expedition.
- Look: Glühwürmchen, leuchtendes Moos, Laternen-Camps, Sonnenaufgang.
- Mechanik: Rucksackgewicht, Entlastungsstationen, Müdigkeit (kürzere Gleitflüge, nie Eingabeverzögerung), Kochen nur als Energie, Rasten, Wenn-dann.
- Set-Piece: **Die Nachtüberquerung.**

**M9 Abschluss: Leuchtturm** (Zone `leuchtturm`; Turm als Innenraum mit 9 Etagen und Linsenraum)
- Look: weiß-roter Turm, Sternennacht, unten alle Figuren mit Laternen.
- Set-Piece: Die Linse zündet, und eine Regenbogenwelle rollt über alle Zonen gleichzeitig.

**Musik:** Jede Region hat ein prozedurales Thema mit 4 Schichten (Hafen: Glocken und Pads, Strand: Marimba, Dschungel: Trommeln, Klippen: tiefe Streicher, Moor: Flöte und Drone, Markt: gezupfte Saiten, Vulkan: Bass und Handtrommeln, Glimmer: Arpeggios, Quellen: leise Glocken, Leuchtturm: alle zusammen). Grau spielt 1 Schicht, frei spielen alle.

## 12. Die 39 Quests
Jede Quest dauert höchstens 20 Minuten und bringt höchstens ein neues System und ein Set-Piece.
Format pro Quest: **Neu** · Spiel · *Verborgen gelernt* · Glimm · Rückseite · Echte Welt · Debrief.

### M0 Hafen
**j1-e01 Willkommen – unser Rahmen: „Landgang: Der Hafen-Kodex“.** Neu: Blick (Auren), Signalfeuer.
- Spiel:
  - Das Boot kommt aus dem Nebel. Ilda gibt dir den Blick.
  - Eine Möwe klaut Ildas Schlüssel. Die Verfolgung über Steg, Kisten und Dächer ist das Tutorial (Rennen, Gold unter 90 s).
  - Die 4 Signalfeuer sind dunkel, weil sich der Hafen nicht einigen kann, wie man zusammenlebt. An jedem Feuer schlagen Figuren Regeln vor (Tun: „Keine Regeln!“). Du handelst mit Kacheln eine Version aus, die alle unterschreiben.
  - Die Regeln werden Weltverhalten: „Niemand wird ausgelacht“ heißt, niemand lacht, wenn du vom Steg fällst. „Wer Stopp sagt, wird gehört“ kommt in e23 zurück. Die Sicherheitsfunktionen gelten unabhängig davon.
  - Zum Schluss findest du mit dem Blick die einzige graue Figur (Jolie) und setzt dich einfach neben sie. Sie gibt dir Splitter 1, und die erste Farbwelle rollt.
  - Fragst du Ilda nach dem Turm, schaut sie weg.
- *Gemeinsame Regeln schaffen Sicherheit; Gefühle haben Farben und Namen; Da-Sein zählt ohne Worte.*
- Glimm: „Regeln. Gähn. Okay, die war gut.“ · Rückseite: „Gruppenvertrag: Regeln, die wir zusammen machen, schützen alle.“
- Echte Welt: „Such dir eine Regel aus eurem Vertrag. Wo begegnet sie dir?“ · Debrief: Welche Hafen-Regel hat am meisten verändert?

**j1-e02 Kennenlernen in Bewegung: „Das Laternenfest“.** Neu: Fäden.
- Spiel:
  - Eine Frage bringt nur eine flache Antwort. Erst die Nachfrage („Und dann?“) verrät ein harmloses Detail, und zwischen Figuren mit derselben Sache erscheint ein Faden.
  - Du trägst Funken (Wasser löscht sie) und verbindest 12 Laternen zur Lichterkette.
  - „Zwei Wahrheiten, eine Lüge“: Die Lüge findest du, indem du in der Welt nachschaust.
  - Komplimente: „Ach, war nix“ lässt die Laterne sinken, „Danke“ lässt sie steigen. Deine Komplimente für Taten (aus dem Taten-Log) fliegen, die fürs Aussehen fallen um.
  - Gold: alle Laternen vor dem Feuerwerk.
- *Gemeinsamkeiten ohne Preisgabe; nachhaken; nicht allein sein; konkrete Komplimente geben und annehmen.*
- Glimm: „Danke sagen. Krass schwer, oder?“ · Rückseite: „Kompliment: Lob, was jemand getan hat. Annehmen heißt: Danke.“
- Echte Welt: „Lob jemanden für eine Tat. Und sag selbst einfach Danke.“ · Debrief: Warum sank die Laterne bei „Ach, war nix“?

**j1-e03 Wir als Team: „Die Brücke der Drei“.** Neu: Crew-Ruf.
- Spiel:
  - Die Brücke zum Strand ist kaputt. Jolie passt durch Spalten, Tun schiebt Kisten, Glimm leuchtet. Das Siegel füllt sich nur, wenn alle beigetragen haben.
  - In der dunklen Hafengrotte lotst du Jolie mit Symbolbefehlen. Sie hat ein Stopp-Recht: Wenn sie unsicher ist, bleibt sie stehen. Drängeln lässt sie zurückweichen.
  - Rollentausch: Dein Bild wird dunkel, und Jolie führt dich mit Stimme (Stereo) und sichtbaren Lichtpunkten.
  - Am Ende ergänzt die Crew den Kodex um eine Zeile.
- *Alle werden gebraucht; führen und geführt werden mit Stopp-Recht; Hören ersetzt Sehen; benennen, was die Gruppe braucht.*
- Glimm: „Allein wär's schneller. Nicht.“ · Rückseite: „Team: Jede Person zählt. Beim Führen gilt Stopp.“
- Echte Welt: „Frag eine stille Person nach ihrer Idee.“ · Debrief: Was brauchte Jolie, um dir im Dunkeln zu vertrauen?

**j1-j07 Joker Neu in der Gruppe: „Senait kommt an“.**
- Spiel:
  - Senait kommt mit dem Morgenboot, wie du damals. Du wirst Pate oder Patin: Du zeigst ihr die Feuer und erklärst den Kodex mit eigenen Kacheln (sie hakt nach).
  - Ein Kennenlernspiel legt Fäden nur über harmlose Dinge.
  - Du bringst ihr eine Fähigkeit bei, sie macht deine Bewegungen nach. Dann unterschreibt ihr den Kodex neu. Senait hilft in späteren Quests.
- *Rituale erklären; Vertrag erneuern; Kennenlernen ohne Bloßstellen; Patenschaft.*
- Rückseite: „Neu dabei: Wir erklären Regeln selbst und begleiten.“
- Echte Welt: „Zeig einer neuen Person eine Sache, die dir geholfen hätte.“ · Debrief: Was war beim Erklären wichtig?

### M1 Strand
**j1-e04 Das Glas der Bedürfnisse: „Die sechs Tanks von Muschelbucht“.** Neu: Tanks.
- Spiel:
  - Das Dorf läuft über 6 gläserne Tanks. Figuren benehmen sich daneben, weil ein Tank leer ist.
  - Tiago will „das neue Surfbrett!“. Kaufst du es, schießt seine Aura hoch und fällt bis zum Morgen zurück. Sein leerer Tank ist Anerkennung: Rufst du die Crew als Publikum, hält der Tank eine Woche.
  - Tankwasser trägst du vorsichtig, weil es beim Rennen schwappt (Gold: nichts verschüttet).
  - Sind alle 6 voll, dreht sich die Gezeitenmaschine, und Farbe flutet die Bucht.
  - Im Baumhaus entsteht das Glas für anonyme Muscheln.
- *Wunsch gegen Bedürfnis; sechs Bereiche; Verhalten zeigt leere Tanks; kleine Schritte füllen.*
- Glimm: „Brett gekauft. Bringt nix. Hm.“ · Rückseite: „Bedürfnisse: sechs Tanks. Ein Wunsch ist nicht immer das, was fehlt.“
- Echte Welt: „Welcher Tank ist leer? Plane einen kleinen Schritt.“ · Debrief: Warum hat das Brett Tiago nicht geholfen?

**j1-e05 Zwischen laut und leise: „Ebbe und Flut“.** Neu: Schwimmen, Gezeitenhörner.
- Spiel:
  - Flut: Wasser steigt, du schwimmst, dein Echo-Ruf sprengt Glaskorallen, Krabben sammeln sich.
  - Ebbe: Böden liegen frei, du schleichst an Seelöwen vorbei, scheue Tiere flüstern Geheimnisse.
  - Tiago (Flut) und Jolie (Ebbe) halten das jeweils andere für schlechter. Die Höhle braucht beides.
  - Set-Piece Brandungsorgel: Man spielt im Wechsel von laut und leise im Rhythmus.
  - Spiegelbecken: Dein Selbstbild steht neben dem, wie die Strandleute dich sehen, berechnet aus deinem Spielstil. Das ist neutral, oft überraschend und bleibt nur auf dem Gerät.
- *Eigenschaften als Kontinuum und je nach Situation; keine Seite ist besser; Selbst- gegen Fremdbild.*
- Glimm: „Laut oder leise? Beides, Klugscheißer.“ · Rückseite: „Laut und leise: Wir sind je nach Lage verschieden. Beides ist okay.“
- Echte Welt: „Wann bist du Ebbe, wann Flut?“ · Debrief: Wo war im Spiel Ebbe besser?

**j1-e06 Mein Baum der Stärke: „Die Wurzeln der alten Mangrove“.** Neu: Klettern.
- Spiel:
  - Der Halt-Ring besteht aus deinen Wurzeln: Menschen, denen du geholfen hast, dein Lieblingsort, eine Krabbe. Beziehungen tragen dich also wörtlich höher.
  - In den Stamm sind echte Taten aus dem Log geschnitzt, grauen Äste sind kommende Fähigkeiten.
  - An Rastplätzen nennen dir Figuren eine konkrete Stärke, die sie bei dir gesehen haben. Du gibst Stärke-Karten zurück, und nur konkrete Taten lassen Bäume blühen.
  - Freiwillig: Kronen-Kletterei ohne Bodenkontakt (Rennen).
  - Oben siehst du die graue Karte, und Tiagos Erinnerung liefert Splitter 2. Im Baumhaus wächst der Bonsai.
- *Ressourcen halten; Stärken zeigen sich im Verhalten; Rückmeldung annehmen.*
- Glimm: „Du hast Fans. Seltsam, aber okay.“ · Rückseite: „Baum der Stärke: Wurzeln halten, Stamm kann, Äste wachsen.“
- Echte Welt: „Frag jemanden: Was kann ich gut? Sag Danke.“ · Debrief: Warum kamst du höher, je mehr Leuten du geholfen hattest?

### M2 Dschungel
**j1-e07 Was sind Gefühle?: „Die sechs Federn“.** Neu: Segel.
- Die sechs Vögel (die Klasse darf sie umbenennen):

| Vogel | Gefühl | Befreundung | Segel-Modus |
|---|---|---|---|
| Wachkranich | Angst | flieht, wenn du sprintest oder ihn einkesselst | Wachsinn: Zeitlupe, Fallen leuchten |
| Glutfalke | Wut | ritzt eine Linie; wer sie achtet, bekommt die Feder | Schub: bricht Dornenwände, „hier ist eine Grenze“ |
| Tiefentaucher | Traurigkeit | kommt nur, wenn du dich still dazusetzt | Tauchen |
| Sonnensegler | Freude | will Fangen spielen | Aufwind |
| Grünwürger | Ekel | nimmt nur frische Früchte (Faulgeruch als Wolke) | Abstoßen: durch Sporen |
| Blitzkolibri | Überraschung | erscheint nur, wenn du stillstehst und dich umsiehst | Schwebe-Stopp |

- Spiel: Jeden Vogel erkennt man an seinem Tanz-Silhouetten-Umriss. Glimm spottet über die Angst-Feder, aber den Fallentempel übersteht man nur mit ihr.
- *Sechs Grundgefühle mit Botschaft und Funktion, auch die unangenehmen; an Haltung erkennen.*
- Glimm: „Okay. Die Angst-Feder war gut.“ · Rückseite: „Jedes Gefühl hat eine Botschaft, auch Angst, Wut und Traurigkeit.“
- Echte Welt: „Welche Botschaft hat ein unangenehmes Gefühl für dich?“ · Debrief: Wozu war die Angst-Feder gut?

**j1-e08 Alles steht Kopf: „Wer steht am Ruder?“.** Neu: Tauchen.
- Spiel:
  - Bootsrennen mit Maëlle vom Strand zur Dschungelbucht. Die Vögel sitzen auf dem Pult, und du gibst pro Abschnitt einem das Ruder: Felsen braucht Angst, Treibholz-Tore brauchen Wut, offenes Wasser braucht Freude, Nebel braucht Überraschung. Das falsche Gefühl führt zu einem komischen Stillstand und sofortigem Neustart.
  - Den grauen Strudel schafft nur Traurigkeit: Das Boot lässt sich sinken, unten liegt Maëlles Festtrommel, und sie zieht dich heraus.
  - Aufstellung: Für 5 Inselszenen sagst du vorher, wer ans Pult geht.
- *Das Gefühl am Pult bestimmt das Verhalten; auch Kummer hat seinen Platz und ruft Nähe.*
- Glimm: „Trauer am Steuer? Hat geklappt?!“ · Rückseite: „Steuerpult: Welches Gefühl steuert, bestimmt, was ich tue.“
- Echte Welt: „Wer stand heute zuerst an deinem Pult?“ · Debrief: Warum kam nur Traurigkeit durch den Strudel?

**j1-j01 Joker Film „Alles steht Kopf“: „Das Steuerhaus“.**
- Spiel:
  - Maëlle schläft ein, und du landest auf ihrem Traumschiff (eigene Szene). Die Gefühls-Crew streitet ums Steuer. Du teilst die Abschnitte zu, manche mit Doppelruder für zwei Gefühle.
  - Im Endsturm kann niemand steuern, bis Kummer die Leuchtrakete zündet und Ildas Boot kommt.
  - Konferenz: Situationen werden als Comic-Strip ausgespielt.
- *Verfolgen, wer steuert; Kummer wird gebraucht; Gefühle steuern gemeinsam; Übertragung auf den Alltag.*
- Rückseite: „Zwei Gefühle können gleichzeitig am Pult stehen.“
- Echte Welt: „Wer stand heute bei dir am Pult, vielleicht zwei?“ · Debrief: Warum konnte im Sturm nur Kummer steuern?

**j1-e09 Wo spüre ich Gefühle?: „Das Frühwarnsystem“.** Neu: Körpersignale.
- Spiel:
  - Die Tempelruinen bröckeln. 1,5 s vor jeder Gefahr zeigt dein Avatar ein Signal: Bauchschimmer, heiße Fäuste, hochgezogene Schultern. Dein Körper ist dein Radar. Es gibt kein Raubtier, keinen Jumpscare.
  - Im Charakterbildschirm setzt du die Signale selbst auf deine Körperkarte, und dort zeigt das HUD sie dann an.
  - Trommelfest: Tun ärgert Tiago. Siehst du sein erstes Warnsignal (Kiefer, Fäuste), reicht eine kleine Handlung. Verpasst du es, folgen ein Ausbruch und eine lange Beruhigungsjagd, aber nie Game Over.
  - Deine Musikwahl öffnet Riesenblüten und verändert die Stimmung der Menge.
- *Gefühle als Körpersignale; erstes Warnsignal bei Wut und Angst; Haltung; Musik verändert Stimmung.*
- Glimm: „Deine Fäuste glühen. Nur so.“ · Rückseite: „Gefühls-Landkarte: Mein Körper warnt zuerst.“
- Echte Welt: „Wo spürst du Wut zuerst?“ · Debrief: Was brachte es, Tiagos erstes Signal zu sehen?

**j1-e10 Gemischte Gefühle: „Maëlles Abschiedsfest“.** Neu: Doppel-Aura, Stärke 0–10, Segel-Kombis.
- Spiel:
  - Maëlles Schwester geht zum Studium aufs Festland. Maëlle ist froh (6) und traurig (8). Wer nur das Frohe anspricht, bekommt ein dünnes Lächeln. Wer beides nennt, öffnet ihre Geschichte.
  - An Intensitäts-Toren stellst du den Regler auf die echte Stärke.
  - Dieselbe Nachricht trifft drei Figuren verschieden, jede braucht etwas anderes.
  - Kombis: Freude + Trauer ergibt den Regenbogenbogen, Angst + Wut den Schutzschub.
  - Set-Piece: Kombi-Flug durch die Festringe. Maëlles Erinnerung liefert Splitter 3.
- *Gemischte Gefühle; Stärke einschätzen; dieselbe Situation, verschiedene Gefühle.*
- Glimm: „Froh UND traurig. Geht also.“ · Rückseite: „Gefühle mischen sich. Stärke von 0 bis 10.“
- Echte Welt: „Zwei Gefühle? Gib beiden Namen und Zahl.“ · Debrief: Woran hast du Maëlles zwei Gefühle erkannt?

### M3 Klippen
**j1-e11 Anspannungsskala: „Das Sturmbarometer“.** Neu: Puls.
- Spiel:
  - Glimm leuchtet jetzt grün, gelb oder rot. Die Route führt durch Windschatten.
  - Luc steht bei 90 an der Kante, sein Drachen reißt: Reden prallt ab („Deckel ab“). Du packst die Leine und ziehst im Takt der Böen (Rhythmus). Beide Pulse sinken, dann öffnet sich das Gespräch.
  - Freiwillig: Sturmprognose. Du schätzt Ereignisse auf dem Barometer ein und schickst die Crew hin.
- *Alle kennen Momente ohne Kontrolle; 0–30/30–70/70–100; bei Rot erst runter, dann reden.*
- Glimm: „Bei Rot hört keiner zu.“ · Rückseite: „Anspannung 0–100: Grün, Gelb, Rot. Bei Rot erst runter, dann reden.“
- Echte Welt: „Schätz dreimal am Tag deine Zahl.“ · Debrief: Warum konnte man Luc bei 90 nicht zutexten?

**j1-e12 Körper und Atem: „Das Skills-Labor“.** Neu: Ruhe mit Körper-Gadgets.
- Spiel:
  - Pumpsprung: Anspannen und Loslassen ist die Bewegung selbst.
  - Sprint-Ventil: Der Graph zeigt vorher/nachher, erklärt wird nichts.
  - Tandem-Takt: Du trägst mit Luc ein Windrad-Blatt im Gleichschritt die Klippe hinauf. Wer hetzt, kippt.
  - Am Tester misst du, was bei dir wirkt und bis zu welcher Zahl. Der Favorit kommt ins erste Fach.
  - Atmung wird nie angeleitet.
- *Der Körper reguliert; Bewegung senkt Anspannung; Anspannen und Loslassen; Takt mit Ruhigen; Experimentieren.*
- Glimm: „Rennen hilft. Wer hätte das gedacht.“ · Rückseite: „Körper-Skills: testen mit Zahl vorher und nachher.“
- Echte Welt: „30 Sekunden schnell bewegen. Was macht deine Zahl?“ · Debrief: Was wirkte bei dir, was bei Luc?

**j1-e13 Über die Sinne: „Die Klangschlucht“.** Neu: Sinnes-Gadgets.
- Spiel:
  - Klangmuschel-Plattformen führen von der Klippe zu den Felsnadeln und halten genau so lange, wie der Ton klingt.
  - Ein Duftfaden führt durch blendenden Nebel, der Kältekristall friert Sturmfelder ein, der Anker-Stein stoppt das Wackeln.
  - Du stellst eine Jukebox-Playlist zusammen (Runter/Auf), die Wetter und Tiere verändert. Luc leiht sie sich aus.
- *Sinne holen ins Jetzt; verschiedene Sinne für verschiedene Zustände; Musik als Skill.*
- Glimm: „Ohren auf. Augen reichen nicht.“ · Rückseite: „Sinnes-Skills: Kälte, Duft, Klang holen mich ins Jetzt.“
- Echte Welt: „Zwei Songs: runterkommen und aufladen.“ · Debrief: Wo halfen andere Sinne, als die Augen nicht reichten?

**j1-e14 Achtsamkeit und Kopf-Skills: „Die Irrlichter“.** Neu: Kopf-Gadgets, Sicherer Ort.
- Spiel:
  - In der Schlucht flüstern Gedankenlichter. Jagst du sie, vermehren sie sich. Setzt du sie auf den Bach und gehst weiter, ziehen sie davon.
  - Kopf-Schlösser (Zähl-Laterne, ABC-Rune) gehen bei Grün und Gelb auf, bei Rot verpuffen sie. Unkommentiert.
  - Die Baumhaus-Tür öffnet deinen Sicheren Ort, den du frei gestaltest.
- *Gedanken beobachten statt folgen; Kopf-Skills bei Gelb, nicht bei Rot; ein sicherer Ort als Ressource.*
- Glimm: „Zählen bei Rot? Puff.“ · Rückseite: „Kopf-Skills helfen bei Gelb. Bei Rot zuerst Körper oder Sinne.“
- Echte Welt: „Ein Stichwort für deinen sicheren Ort.“ · Debrief: Warum klappten die Kopf-Schlösser bei Rot nicht?

**j1-e15 Skills-Koffer und Ampelplan: „Der Gewitter-Titan“.** Neu: Ampelplan, Notfall-Slot.
- Spiel:
  - Du packst den Koffer (5 Fächer) und legst den Ampelplan fest, dazu eine erwachsene Figur im Notfall-Slot.
  - Der Titan hat drei Phasen: Grün ist ein Runenrätsel (Kopf), Gelb Blitzen ausweichen (Sinne), Rot ein Sturm mit Puls-Deckel 80, Windschatten-Steinen und Umbau am Koffer-Stein.
  - Das Ende kommt mit Hilfe holen: Ildas Horn, und alle, denen du geholfen hast, kommen.
  - Im Kern steht Jhemps Hütte mit einem leeren Zugehörigkeits-Tank. Die Crew stellt sich darum, der Sturm bricht. Jhemp liefert Splitter 4, sagt aber: „Noch nicht.“ Der Turm flackert.
  - Epilog: Du bringst Jolie ein Gadget bei.
- *Skill passend zur Zahl; Notfallplan mit erreichbarem Erwachsenen; beibringen macht zur Expertin oder zum Experten.*
- Glimm: „Hilfe holen. Stärkster Zug im Spiel.“ · Rückseite: „Ampelplan: Grün, Gelb, Rot, dazu ein Erwachsener, den ich erreiche.“
- Echte Welt: „Trag eine erwachsene Person in deine Notfallkarte ein.“ · Debrief: Wer kam, als du Hilfe geholt hast, und wer wäre das bei dir?

**j1-j06 Joker Dampf ablassen, Akku laden: „Die Energie-Arena“.**
- Spiel:
  - Energie-Regler 0–10 (es wird nichts gemessen). Dann wählst du Dampf (Parkour mit Boost-Ringen, Krabbenrennen) oder Akku (Kettenreaktion mit Figuren bauen).
  - Danach schätzt du die Energie erneut. Beide Zahlen stehen kommentarlos nebeneinander, die Figuren sagen, was ihnen geholfen hat.
- *Bewegung und Spiel verändern die Energie; Geduld und Absprache.*
- Rückseite: „Energie: Dampf ablassen oder Akku laden. Was hilft mir?“
- Echte Welt: „Was lädt deinen Akku?“ · Debrief: Was hat deine Zahl verändert?

**j1-j09 Joker Prüfungszeit: „Der Bootsführerschein“.**
- Spiel:
  - Rückwärts-Planer: Vorbereitungen legst du vom Prüfungstag rückwärts in einen Kalender, Selbsttest-Bojen schlagen bloßes Lesen.
  - In der Prüfung kommt Nebel-Blackout: Du hältst das Ruder fest, stampfst auf (die Kamera beruhigt sich) und suchst 5 Landmarken.
  - Prüfungsgedanken als Steine konterst du mit Satz-Karten (ab M4 in der Schmiede).
  - Belohnung: ein Boot zur Schnellreise.
- *Anspannung und Prüfung; rückwärts planen mit Selbsttests; Gegensätze; ein Blackout-Plan.*
- Rückseite: „Prüfung: rückwärts planen, selbst testen, unsichtbare Skills.“
- Echte Welt: „Plane eine echte Prüfung rückwärts.“ · Debrief: Was hat im Blackout geholfen?

### M4 Moor
**j1-e16 Was sind Glaubenssätze?: „Die Flüstersteine“.**
- Spiel:
  - Das Moor öffnet sich. Graue Steine flüstern („Das schaffst du eh nicht“), und in ihrer Nähe wird dein Avatar schwer.
  - Pit schrieb eine Nachricht und bekam „gelesen, keine Antwort“. Du wählst seinen Gedanken, und die Szene läuft als Dominokette ab: Situation, Gedanke, Gefühl, Verhalten, mit anderem Ende. Wiederholen mit dem anderen Gedanken.
  - Moos-Spuren führen zu Ursprungs-Echos: ausgelacht, ein Spruch, ein Vergleich, ein Feed.
  - Dieselben Steine stehen bei vielen Figuren.
- *Ein Gedanke steht zwischen Situation und Gefühl; hilfreiche und bremsende Sätze; Quellen; viele teilen sie.*
- Glimm: „Steine, die reden. Wie Menschen.“ · Rückseite: „Glaubenssätze: Ein Gedanke entscheidet, wie sich etwas anfühlt.“
- Echte Welt: „Welcher Satz bremst oder hilft dich?“ · Debrief: Warum endete Pits Abend zweimal anders?

**j1-e17 Meine Glaubenssätze: „Die Stille Lichtung“.** Privat. Lines & Veils möglich.
- Spiel:
  - Standard: Pits schwerster Stein. Du folgst dem Echo zum Ursprung und prüfst an Bildern von heute: Stimmt das noch?
  - Freiwillig kannst du einen eigenen Stein wählen („keiner davon“ ist voreingestellt). Er liegt nur still im Glas, flüstert nie und wird nie Gegner.
  - Am Feuer erzählen Figuren von ihren Steinen. Du hast nur Zuhör-Züge. Ein Rat-Zug schließt die Aura (Zurückspulen möglich).
  - In der Glühwürmchennacht spielt jedes Glühwürmchen einen echten Höhepunkt deines Spielstands ab.
- *Eigene Sätze privat anschauen; zuhören ohne Rat; den Blick auf Gutes lenken.*
- Glimm: „Ich sag nix. Ich leuchte nur.“ · Rückseite: „Zuhören heißt: da bleiben, nicht bewerten, keinen Rat geben.“
- Echte Welt: „Schreib nur für dich auf, wo dein Satz bremst.“ · Debrief: Warum hörte die Figur beim Ratschlag auf?

**j1-e18 Der kritische Detektiv: „Fall: Der Steinriese“.** Neu: Satz-Schmiede.
- Spiel:
  - Der Golem „Urteil“ trägt die Inschrift „Pit ist ein Versager“. Beweise liegen als feste Faktenkristalle („22 von 60, davor 15“) und hohle Urteilsblasen („dumm“) herum.
  - Gericht: Ein Kristall bringt „Einspruch!“ und einen Riss, Blasen prallen ab.
  - In der Satz-Schmiede baust du aus Runen einen Satz, der eine Brücke trägt: „Ich bin der Beste“ ergibt Glas, das bricht. Zukunftsform kommt zu spät. „Nicht“- und Passiv-Sätze tragen nicht. „Ich lerne …“ wächst beim Gehen mit.
  - Bonus: Flüsterkrähen-Duell mit Konterkarten. Pits Erinnerung liefert Splitter 5.
- *Beweise dafür und dagegen; Tatsache gegen Urteil; sechs Regeln; schnell realistisch kontern.*
- Glimm: „Fakten hauen. Urteile nicht.“ · Rückseite: „Detektiv: Tatsachen statt Urteile. Neuer Satz: realistisch, aktiv, jetzt, wachsend.“
- Echte Welt: „Sammle einen Gegenbeweis.“ · Debrief: Warum brach die Glasbrücke?

**j1-e19 Neue Gedanken ausprobieren: „Pits Probelauf“.**
- Spiel:
  - Du läufst Pits Moor-Fest-Parcours zweimal. Mit dem alten Satz: gebückt, kurze Sprünge, verschwommene Menge. Mit dem neuen: aufrecht, weite Sprünge, klare Gesichter.
  - Der neue Satz wächst als Ast am Bonsai.
  - Der Beweis-Zähler markiert in späteren Sitzungen fünf echte Momente. Die Heide blüht.
- *Ein Gedanke verändert Haltung, Stimme und Ausgang; mit Stärken verbinden; Beweise sammeln.*
- Glimm: „Gleicher Lauf. Andere Haltung. Krass.“ · Rückseite: „Neuer Satz, neue Haltung. Beweise sammeln.“
- Echte Welt: „Teste deinen Satz eine Woche.“ · Debrief: Was änderte sich beim zweiten Lauf?

**j1-j02 Joker Film „Das Streben nach Glück“: „Die Pechsträhne-Regatta“.**
- Spiel:
  - Ein Roguelite mit Fränz: zufällige Rückschläge (Segel reißt, Sturm, Karte weg). Nach jedem landet ein bremsender Stein an Deck, du konterst mit Satzkarten und Menschen an den Checkpoints.
  - Manche Läufe sind offen fast unschaffbar: „Das lag nicht an dir, das war Pech.“
  - In der Geschichte wird Fränz Vierter und ist stolz. Auf Tuns „Wer sich anstrengt, schafft alles!“ antwortest du mit Kacheln: Anstrengung, Hilfe, Glück.
- *Rückschläge und Gedanken; Gegensätze; Menschen tragen; kritisch auf „Glück = Erfolg“ schauen.*
- Rückseite: „Ein Satz für schwere Tage. Erfolg ist Mühe, Hilfe und Glück.“
- Echte Welt: „Speicher einen Satz für schwere Tage.“ · Debrief: Was war Mühe, was Glück?

### M5 Markt
**j1-e20 Verbal und nonverbal: „Die Stummen vom Markt“.** Neu: Zeichen.
- Spiel:
  - Die Blasen sind grau. Du sprichst mit Gesten, Haltung und Abstand plus Summen, dessen Tonhöhe freundlich, genervt oder ironisch klingt.
  - Pantomime-Handel.
  - Noor beschreibt ein Wandbild in Wortfetzen, du baust es mit Formen nach: erst ohne Rückfragen (Chaos), dann mit dem Knopf „Rückfrage“ (klappt).
  - Das Emoji-Brett liefert eine Torte an die falsche Person, außer du fragst „Wie meinst du das?“.
  - Unstimmigkeiten finden („Mir geht's super“ bei hängenden Schultern) öffnet Nebenquests. Die Lesebrille zeigt, wie deine Nachricht bei jemandem Müdem ankommt.
  - Set-Piece: Alle Blasen platzen in Farbe.
- *Worte, Stimme, Körper; Grenzen der Körpersprache; Rückfragen; Emojis werden missverstanden.*
- Glimm: „Daumen hoch heißt nicht alles.“ · Rückseite: „Worte, Stimme, Körper sagen nicht immer dasselbe. Nachfragen.“
- Echte Welt: „Unklare Nachricht? Nachfragen statt raten.“ · Debrief: Warum ging die Torte an die falsche Person?

**j1-e21 Ich-Botschaften und Zuhören: „Der Klarklang“.** Neu: Mut: Klarklang, Lauschen.
- Spiel:
  - Das Horn baut einen Akkord aus 4 Tönen: Gefühl, Kamera (was passiert ist), Grund, Wunsch. Dorn-Kacheln („immer“, „nie“, „du bist“) klingen schief.
  - Ein sauberer Akkord bringt Klangtore zum Schwingen und macht Figuren weich. Eine Du-Botschaft prallt als Dornen zurück.
  - Fall: Der Saftverkäufer hat Noors Bild übermalt.
  - Lauschen: Stillstehen, während der Satz entsteht. Jede Bewegung bricht ihn ab. Danach fasst du mit Gefühl zusammen, und das öffnet sein Hintertor.
- *Du- und Ich-Botschaft; die Formel; zuhören und zusammenfassen mit Gefühl.*
- Glimm: „Schiefer Ton. Hört man sofort.“ · Rückseite: „Ich fühle mich …, wenn …, weil … Ich wünsche mir …“
- Echte Welt: „Probier eine Ich-Botschaft.“ · Debrief: Warum prallte die Du-Botschaft ab?

**j1-e22 Grenzen erkennen: „Die unsichtbaren Gärten“.** Neu: Grenz-Radien.
- Spiel:
  - Radien sind je nach Person, Stimmung und Bindung verschieden (Noor lässt Tiago nah, dich noch nicht). Du trägst Laternen durch die Menge, ohne Radien zu kreuzen.
  - Drei Grenzarten: Körper (Radius), Gefühl (Schloss-Symbol an privaten Themen), digital (ein Foto nur nach „Darf ich?“).
  - Mika kommt dir zu nah. Dein Körpersignal meldet sich vor dem Puls.
  - Gesten wie Hand heben oder Schritt zurück wirken bei manchen. Bei anderen erscheint nach zwei ignorierten Gesten die Wort-Kachel.
- *Grenzen sind individuell; körperlich, emotional, digital; der Körper merkt zuerst; wann Worte nötig sind.*
- Glimm: „Zu nah. Dein Bauch weiß es.“ · Rückseite: „Grenzen: jede Person anders. Körper merkt zuerst. Manchmal braucht es Worte.“
- Echte Welt: „Woran merkt dein Körper: zu nah?“ · Debrief: Wann reichte eine Geste, wann nicht?

**j1-e23 Grenzen setzen: „Der Garten-Wächter“.** Neu: Stopp-Schild.
- Spiel:
  - 4 Lichter (Stand, Blick, Hand, Stimme) mit nur 2 Eingaben: Stillstehen und Zielen, dann Kraft halten und im Ring loslassen. Ein Lächel-Emote macht das Schild dünn.
  - Nachts verteidigst du Oma Lucindas Garten gegen Klammer-Geister, die nachhaken. Wiederholen hält.
  - Tun filmt dich: Stopp-Satz und Schild. Er sagt „Chill doch“, du wiederholst.
  - Spiegel: Jolie sagt Stopp zu DIR, und der Kodex leuchtet.
  - Lucinda liefert Splitter 6.
- *Klar ist, wenn Haltung, Blick, Hand und Stimme gleich sind, kurz und ohne Lächeln; wiederholen; wer Stopp hört, stoppt.*
- Glimm: „Vier Lichter. Kein Grinsen.“ · Rückseite: „Stopp: fester Stand, Blick, Hand, Stimme. Kurz. Wiederholen.“
- Echte Welt: „Überleg dir deinen Stopp-Satz.“ · Debrief: Warum war das Schild mit Lächeln dünn?

**j1-j05 Joker Unser Stück: „Das Inselfest-Theater“.**
- Spiel: Im Regie-Modus wählst du ein Thema, eine Botschaft, die Besetzung, Markierungen, Gesten, Zeilen und Kameras und nimmst 30–60 s auf. Ein Code spielt die Szene am Klassenbildschirm ab. Nach dem Stück legen die Figuren an der Rollen-Truhe ihre Rolle ab.
- *Eine klare Botschaft; Rollen; Kursverhalten vorspielen; Rollen bewusst ablegen.*
- Rückseite: „Szene mit Botschaft. Rolle danach ablegen.“
- Echte Welt: „Zeig deine Szene: Was kam an?“ · Debrief: Kam die Botschaft an?

### M6 Vulkan
**j1-e24 Konflikte lösen: „Die Friedenstreppe“.** Neu: Streit-Tiere.
- Spiel:
  - Der Schleier-Rückfall liegt über dem Surfspot: Noor hat Tiagos Brett „verschönert“.
  - Die 5 Terrassen der Serpentine:
    1. beide unter 70 (Hitze, Kühlstellen, Gadgets an ihnen)
    2. Klarklang von beiden
    3. Zusammenfassen für den anderen
    4. Ideenkugeln sammeln, wer vorher verwirft, lässt die Stufe einstürzen
    5. Lösung und Kontrolltag, an dem die Figuren wirklich wiederkommen
  - Wer eine Stufe überspringt, rutscht durch die Asche.
  - Streit-Tiere über den Köpfen wechseln je nach Gegenüber (Tiago ist Hai gegen Noor und Teddy gegen Mika). Dein eigener Stil ist nur ein Spiegel, kein Etikett.
  - Schreiduell: Beide reden gleichzeitig, bis du sie abwechseln lässt.
  - Das Eulen-Ende findet die Bedürfnisse dahinter.
- *Der Stil hängt vom Gegenüber ab; fünf Stufen; Schreiduell.*
- Glimm: „Stufe übersprungen. Rutschpartie.“ · Rückseite: „Konflikt-Treppe: runter unter 70, Ich-Botschaft, zuhören, Ideen, einigen.“
- Echte Welt: „Welches Tier warst du im Streit?“ · Debrief: Warum rutschten alle ab?

**j1-e25 Gruppendruck: „Die Mutprobe am Krater“.**
- Spiel:
  - Nachts verlangt Mikas Crew den Lavasprung. Sprechchöre sind Druckwellen.
  - Vier Nein-Züge:
    - Schallplatte: Stopp im Takt.
    - Nein + Vorschlag: Klarklang, dann ein Rennen den Ascheweg hinunter zu einer geheimen Höhle.
    - Humor: klappt nur, wenn die Stimmung stimmt.
    - Gehen: immer offen, ohne Strafe.
  - Ringe: Komfort bringt nichts, in der Lernzone wachsen Obsidian-Splitter, in der Panikzone führt dich das Spiel automatisch heraus. Die Zonen sind pro Person verschieden.
  - Das zweite Nein ist Jolie (sonst deine stärkste Bindung): Der Druck halbiert sich, die Crew kippt.
  - Mikas Aura zeigt danach Erleichterung, er selbst steht unter Druck. Leiser Druck im Gruppenchat ist freiwillig.
- *Lauter und leiser Druck; Zonen pro Person; vier Wege, Nein zu sagen; ein zweites Nein.*
- Glimm: „Zwei Nein. Die kippen um.“ · Rückseite: „Nein sagen: Schallplatte, Vorschlag, Humor, gehen. Sei das zweite Nein.“
- Echte Welt: „Dein Nein-Satz. Und sei das zweite Nein.“ · Debrief: Was änderte das zweite Nein?

**j1-e26 Mobbing und Zivilcourage: „Der Schatten-Chor“.** Lines & Veils möglich.
- Spiel:
  - Im Kronendorf siehst du drei Tage lang Szenen gegen Pit. Die vier Merkmale zeigt die Welt, nicht ein Quiz: Strichliste an der Wand (wiederholt), die Crew steht höher (Ungleichgewicht), ruhige Aura des Anführers (Absicht), Pits Stopp verhallt (allein nicht wehren).
  - Gegenbilder: Tiago und Noor necken sich und lachen beide (Spaß). Luc und Mika streiten auf Augenhöhe (Konflikt).
  - Boss: ein Schatten aus Lachen und Schweigen. Schlagen bringt nichts. Die 6 Sprossen der Leiter:
    1. nicht mitlachen und nicht weiterleiten (eine verlockende Taste)
    2. sich zu Pit setzen oder eine private Nachricht
    3. andere holen und Bänke umdrehen (jeder Zuschauer hat einen Grund)
    4. Ildas Glocke. Sie handelt sofort, ohne Beweise zu verlangen.
    5. freiwillig: Beitrag sichern und melden
    6. direkter Stopp, nur wenn das Sicherheitslicht grün ist. Allein reißt er, mit anderen hält er.
  - Man gewinnt auch ohne Sprosse 6. Die Nummern 116 111 und BEE SECURE 8002 1234 hängen als Tafeln am Glockenturm.
  - Mika liefert Splitter 7.
- *Merkmale und Rollen; Zuschauende beenden Mobbing; sichere Schritte; Hilfe holen ist kein Petzen; Hilfe in Luxemburg.*
- Glimm: „Bänke drehen. Schatten schrumpft.“ · Rückseite: „Mobbing: wiederholt, ungleich, absichtlich, allein. Zuschauende können es stoppen.“
- Echte Welt: „Welche Sprosse traust du dir zu? 116 111.“ · Debrief: Warum brachte Schlagen nichts?

### M7 Glimmerwolke
**j1-e27 Social Media und ich: „Die Glimmerwolke“.**
- Spiel:
  - Der Aufwind trägt dich hinauf. Rote Punkte ziehen das Segel an. Wer sie berührt, bekommt Glitzer, aber die Sonne springt vor.
  - Der Scroll-Strudel endet nur, wenn du stehen bleibst. Ein Treffen mit Jolie verfällt dabei; sie wartet am nächsten Tag noch einmal.
  - Danach schätzt du deine Zeit und siehst die echte.
  - Yaras perfektes Foto: Winkel, Filter, Zuschnitt, dann die Totale mit dem Chaos und 40 Versuchen.
  - Ein „nice“ bewirkt nichts, ein konkreter ehrlicher Kommentar zündet ihre Lampe.
  - Deine Glimmer-Einstellungen (nur Menschen, alles oder aus) ändern den Sog dauerhaft.
- *Geschätzte gegen echte Zeit; wie Apps binden; bearbeitete Bilder; ehrliche Kommentare; ein eigener Plan.*
- Glimm: „Kurz gucken. Sonne weg.“ · Rückseite: „Apps binden Aufmerksamkeit. Mein Plan: Was guttut, bleibt.“
- Echte Welt: „Schätz deine Bildschirmzeit, dann nachschauen.“ · Debrief: Was hat das Segel abgelenkt?

**j1-j03 Joker Doku: „Der Kontrollraum“.**
- Spiel:
  - Zuerst BIST du der Algorithmus und schiebst Tun Beiträge zu, bis seine Blase einfarbig ist.
  - Dann schleichst du durch den Kontrollraum und schaltest um: Benachrichtigungen nur für Menschen, Suche statt Autoplay, andere Stimmen dazu. Die Blase wird bunt.
  - Blasen-Spiel mit Meinungskugeln.
  - Kims Doku-Trailer schneidest du ehrlicher: Belege bleiben, Dramamusik fliegt raus.
- *Benachrichtigung, Scrollen, Empfehlung; wie Blasen entstehen; die Doku kritisch prüfen; ein Experiment planen.*
- Rückseite: „Algorithmus: zeigt, was mich festhält. Ich kann umstellen.“
- Echte Welt: „Eine Woche ein Handy-Experiment.“ · Debrief: Was hast du als Algorithmus getan?

**j1-e28 Echt oder fake?: „Das Trugbild“.** Neu: Masken-Blick. Lines & Veils möglich.
- Spiel:
  - Ein Deepfake zeigt Noor, wie sie „gesteht“. Der Markt wird grau, alle wenden sich ab.
  - Das Bild anzustarren bringt nur vage Artefakte, in späteren Runden ist es makellos. Also liest du quer: über Repost-Knoten, von Figur zu Figur zurück bis zu einem Konto von gestern, zu Kims KI „Spiegel“, die außer Kontrolle geraten ist.
  - Teilen-Bremse: Empörung pulsiert als Taste. Teilen färbt die Karte grau (reparierbar).
  - Der Masken-Blick zeigt Noor außen ruhig und innen rot.
  - Echokammer: Du öffnest Fenster zu anderen Stimmen.
  - Mit Kim wägst du Nutzen und Risiken ab und entscheidest: „Spiegel“ abschalten oder umbauen (etwa für Bildbeschreibungen). Dazu der Satz: Fälschungen von anderen sind Mobbing und können strafbar sein.
  - Splitter 8.
- *KI, Deepfake, Fake News, Algorithmus, Blase; Quelle statt Bild; Nutzen und Risiken; die Teilen-Bremse.*
- Glimm: „Woher kommt's? Nicht wie sieht's aus.“ · Rückseite: „Quelle prüfen, quer lesen, vor dem Teilen bremsen.“
- Echte Welt: „Vor dem Teilen: Wo ist die Quelle?“ · Debrief: Warum half Anstarren nicht?

### M8 und M9
**j1-e29 Gesund und stark: „Die Nachtüberquerung“.** Neu: Rucksack, Wenn-dann.
- Spiel:
  - Jhemp kommt herunter, wenn du ihn zu den Quellen bringst.
  - Sorgen-Steine aus früheren Quests machen den Rucksack schwer, die Gleitflüge werden kürzer. Entlastung bringen ein Sprintrennen, Kochen (nur Energie), Rasten und eine Figur, die zuhört.
  - Wer die Nacht durchläuft, wird müde: Gleitflüge werden kürzer, gegähnt wird, die Eingabe bleibt aber gleich.
  - Jhemp findet EINEN machbaren Schritt. Du wählst eine Wenn-dann-Karte für den Rest der Staffel.
  - Sonnenaufgang an den Quellen, Splitter 9.
- *Schlaf, Bewegung, Essen, Pausen und Stress hängen zusammen; was belastet und was entlastet; ein kleiner Schritt als Wenn-dann-Satz.*
- Glimm: „Pause gemacht. Weiter geflogen. Logisch.“ · Rückseite: „Gesund-Plan: ein kleiner Schritt als Wenn-dann-Satz.“
- Echte Welt: „Dein Wenn-dann-Satz für eine Woche.“ · Debrief: Was hat den Rucksack leichter gemacht?

**j1-e30 Rückblick und Abschied: „Das Leuchtfeuer“.**
- Spiel:
  - Die 9 Splitter in der Chronik ergeben die Kette. Niemand ist böse, das Schweigen war es.
  - Der Turm ist ein vertikaler Parcours, eine Etage pro Modul.
  - Oben wartet Grisel. Du hörst zu: Blick, Ruhe, Mut, und über den Teamgeist kommen alle. Jede Figur sagt den Satz, den sie nie gesagt hat. Ilda: „Ich hätte fragen sollen.“ Tun: „Das Video war nicht okay.“ Jhemp: „Ich hätte Hilfe holen können.“
  - Grisel wird zum Lichtfalter.
  - Die Figuren nennen konkrete Taten von dir, dazu Crew-Jacke, Jahreskurve der Farbwellen und eine Flaschenpost aus Kacheln (freier Text nur auf Wunsch und nur auf dem Gerät), versiegelt bis Staffel 2.
  - Die Linse zündet. Zum Schluss ein leises Lagerfeuer.
- *Rückblick; Veränderung seit September; Wertschätzung; bewusster Abschied; Wiedergutmachung.*
- Glimm: „Ich war auch grau. Jetzt nicht.“ · Rückseite: „Rückblick: Was habe ich gelernt? Was nehme ich mit?“
- Echte Welt: „Brief an dich in einem Jahr.“ · Debrief: Was hat die Insel wirklich grau gemacht?

**j1-j04 Joker Naturtag: „Der Frühlingslauf“.**
- Spiel:
  - Die Insel wird Frühling. Stille Pfade erscheinen nur beim Gehen, nicht beim Sprinten. Sechs Sinnesstationen sind Geheimnisse: Vogel in Stereo mit Wellen-Anzeige, Duftspur, Nahaufnahme-Texturen, Farbchamäleons, Tautropfen-Timing, Kochen.
  - Sardinen-Verstecken mit der Crew.
  - Land-Art am Strand bleibt in der Welt, die Figuren legen dazu.
- *Mit einem Sinn wahrnehmen; Ruhe erleben; Gruppen-Kunstwerk.*
- Rückseite: „Draußen mit allen Sinnen, gemeinsam gestalten.“
- Echte Welt: „Fünf Minuten draußen ohne Handy.“ · Debrief: Was hast du erst beim Gehen gefunden?

**j1-j08 Joker Wenn uns etwas beschäftigt: „Der stille Abend“.** Nur mit Lehrer-Code.
- Spiel:
  - Ohne Timer, ohne Medaille, ohne Schleier. Ein Sturm, Stromausfall, der alte Signalbaum ist umgefallen (kein Tod, nichts Drastisches).
  - Am Brett trennst du Wissen von Gerüchten. Gerüchtekarten ohne Quelle lösen sich auf.
  - Laternen anzünden, Decken bringen, dich dazusetzen. Jede Reaktion (still, witzig, wütend) ist okay.
  - Die Hilfe-Tafel nennt eine Vertrauensperson, 116 111 und 8002 1234. Der Ausgang ist immer einen Tipp entfernt.
- *Wissen gegen Gerücht; jede Reaktion ist normal; stabilisieren; Hilfe kennen.*
- Rückseite: „Was wissen wir sicher? Wer hilft mir?“
- Echte Welt: „Merk dir eine Person, an die du dich wendest.“ · Debrief: individuell nach Absprache.

## 13. Figuren
Höchstens 2 neue Hauptfiguren pro Modul (M0: 3 als Startcrew). Jede hat ein Icon, eine Farbe und eine Silhouette. Täter-, Opfer- und Helferrollen sind über alle Herkünfte verteilt, und alle Figuren lassen sich umbenennen.

| Figur | Wer | Bogen |
|---|---|---|
| Kapitänin Ilda Ferreira (~60, Anker, blau) | Mentorin, Werkstatt | Hat nie um Hilfe gebeten und schwieg nach ihrem Satz. Lässt dich im Finale das Licht zünden. |
| Glimm | Lichtsalamander | vom Zyniker zu bunt |
| Jolie Wagner (13, Muschel, türkis) | still, „Ebbe“ | grau und allein, dann vertraut sie im Dunkeln, wird zweites Nein und spricht im Finale ihren eigenen Stopp |
| Tun Kremer (13, Kamera, gelb) | Hafen-Clown | filmt, wird gestoppt, ist Verstärker, dreht als Erster seine Bank um, entschuldigt sich |
| Tiago Pinto (15, Surfbrett, orange) | laut, „Flut“ | Wunsch gegen Anerkennung, lernt: Gesehenwerden braucht keinen Sieg |
| Maëlle Schmit (14, Trommel, magenta) | Trommlerin | gemischte Gefühle, Traumschiff, Postkarten |
| Luc Reding (16, Windrad, sturmblau) | Erfinder, Sturm-Wut | von „Deckel ab“ zum Experten, der Senait sein Gadget zeigt |
| Jhemp Weber (~65, Laterne, grau zu gold) | verschwundener Wärter | Scham und Rückzug, gefunden, Nachtüberquerung, Rückkehr |
| Pit Hoffmann (13, Stein, moosgrün) | Moorkind | Fall für den Berater, Probelauf, Ziel im Schatten-Chor mit Verbündeten: „Ich bin nicht der Witz.“ |
| Noor Haddad (14, Spraydose, violett) | Künstlerin | übermaltes Bild, Treppe mit Tiago, Deepfake, malt am Ende das Turmbild mit allen |
| Oma Lucinda Tavares (~70, Gießkanne) | Gärtnerin, Faktencheck: „Gesehen oder nur gehört?“ | Zeugin, Notfall-Erwachsene |
| Mika Thill (16, Flamme, schwarz-rot) | Chef der Vulkan-Crew | spielt den Harten wegen der älteren Asche-Crew, erleichtert, dreht sein Publikum, entschuldigt sich |
| Yara Nasser (15, Stern, rosa) | Glimmer-Creatorin | Likes, 40 Versuche, „echte Momente“ |
| Kim Lentz (13, Chip, cyan) | Technik | KI „Spiegel“ außer Kontrolle, steht dazu, baut sie um |
| Senait Tesfaye (12, Kompass, sonnengelb) | Neue (j07) | von der Neuen zur Insiderin, trägt im Finale den letzten Splitter |
| Fränz Kieffer (~70, Hammer) | Bootsbauer (j02) | Vierter und stolz, repariert dein Boot für Staffel 2 |
| Grisel | Schleiermotte aus Ungesagtem | wirkt wie ein Monster, ist hungrig, wird zum Lichtfalter |

## 14. Belohnungen und Geheimnisse
- **Lichtsplitter:** werden bei Ilda zu Segel-Upgrades (Dauer, Wendigkeit, Aufwind) und Möbeln.
- **Aus der Welt, nie für Wohlverhalten:** Aufnäher (39), Segelmuster (6 Grundmuster, Regionen, Nebelkern-Raritäten, das geheime 11.), Spuren, Glimm-Skins, Emotes (wachsen ab M5), Tiermasken als Kosmetik (e24), Farbsets aus befreiten Regionen, Crew-Jacke, Baumhaus-Möbel, Trophäen.
- **Muschel-Mäxchen:** ein Würfel-Bluffspiel gegen Figuren. Jede Figur hat einen Tell (Tun grinst einseitig, Jolie schaut links unten), im Profi-Modus subtiler.
- **Weitere Inhalte:** Flüsterkrähen-Arena (10 Runden), Knobel-Tafeln, Nachtwachen, Aussichtspunkte, Erinnerungsmuscheln, Fotomodus.

## 15. Minispiel-Katalog (8 Vorlagen)
| Vorlage | Kern | Einsätze |
|---|---|---|
| Rennen | Ringe/Checkpoints, Geist der Bestzeit | Dächer, Mangrove, Bootsrennen, Kronen-Segeln, Sturmlauf, Ascherutsche, Glimmer-Ringe, j06, Regatta |
| Rhythmus | halten und loslassen im Takt | Tauziehen, Brandungsorgel, Tandem-Takt, Schreiduell, Schallplatte |
| Satz-Bau | Kacheln in Slots mit Regeln | Kompliment, Klarklang, Zusammenfassen, Satz-Schmiede, Kommentar, Nein+Vorschlag |
| Duell | Reflex-Karten | Flüsterkrähen, Echt-oder-Fake-Schnellrunde, Prüfungssteine |
| Verteidigung | Tower-Defense-lite | Garten-Wächter, Klammer-Geister |
| Lotsen/Schleichen | Befehle, Blickkegel, Radien | Hafengrotte, Seelöwen, Laternen, Kontrollraum |
| Bauen/Ordnen | Platzieren und Logik | Tank-Leitungen, Kettenreaktion, Land-Art, Rückwärts-Planer, Regie, Tischordnung, Sicherer Ort |
| Würfel/Bluff | Mäxchen mit Tells | Baumhaus, Taverne |

Alle Vorlagen nutzen die Medaillen-Hülle aus §9.

## 16. Quest-Vorlagen (12)
- **Weg und Tor:** Route, Tor, Puls-Quellen
- **Tragen:** Schwappen, zerbrechlich, Radien
- **Szene:** Dialog
- **Ermitteln:** Fakten gegen Urteile, Repost-Kette
- **Treppe:** geordnete Stufen mit Abrutschen
- **Befreunden:** Annäherungsregel
- **Lotsen**
- **Boss:** Phasen mit gewaltfreier Siegbedingung (Hilfe holen, Zuschauer, Lauschen, Fakten)
- **Bauen**
- **Prüfung:** Minispiel
- **Nachtwache**
- **Erinnerung:** Diorama

## 17. Oberfläche
- **HUD:** Kompass mit Marker, Glimm oben links, Halt-Ring nur beim Klettern, 3 Knöpfe, Pause.
- **Tagebuch:**
  - Karte mit Nebelkacheln und gesperrten Teasern samt Fähigkeitssymbol
  - Aufträge (ein Hauptauftrag)
  - Skills-Pass (Aufnäher-Raster zum Umdrehen)
  - Koffer und Ampel
  - Chronik
  - Echte Welt
  - Stil
  - Code
  - Einstellungen (Modus, großer Text, reduzierte Effekte, automatisch vorlesen, Glimm stumm)
- **Text:** höchstens 12 Wörter pro Blase, jede mit Vorlese-Knopf, Kacheln mit Icon und höchstens 6 Wörtern, Touch-Ziele mindestens 64 px, Kontrast mindestens 4,5:1.

## 18. Audio
- Prozedurales WebAudio: Regionsschichten, Vogel-Leitmotive, Klangmuschel-Töne mit exakter Dauer, Akkorde konsonant oder dissonant, Jukebox-Loops.
- Grenzen: Limiter, keine plötzlichen lauten Töne, Donner tief und gedämpft, Herzschlag leise und abschaltbar.
- Jede Audio-Aufgabe hat eine sichtbare Alternative (Partikel, Pfeile), weil es keine Kopfhörer braucht.
- Vorlesen über speechSynthesis de-DE mit Tempo 0,95.

## 19. Sicherheit (Checkliste)
Immer an:
- Pause/X auf jedem Bildschirm
- Zurückspulen in Szenen
- Szene sofort verlassen
- „Hilfe holen“ ab e11 bei jedem Puls
- Sicherer Ort und Hängematte über das Pause-Menü

Nie:
- Tod, Jumpscares, Raubtier-Verfolgung
- erzwungenes Rot ohne Ausweg
- öffentliche Ranglisten
- dauerhafter Freundschaftsverlust oder fehlende Freunde im Finale
- die „Wer ist komisch?“-Jagd
- eigene Glaubenssätze, die den Spieler angreifen
- gutes gegen schlechtes Essen, Gewicht
- schwere Familienthemen in Jahr 1

Dazu:
- „Keiner davon“ und Fragmente statt Freitext
- private Daten nur auf dem Gerät, nie im Export, Lösch-Knopf
- j08 nur per Lehrer-Code
- Lines & Veils
- Hilfe-Nummern als Weltobjekte

## 20. Technik-Leitplanken
- **Grundlage:** vorhandener Kern (Terrain, Wasser, Himmel mit 720-s-Tag, Vegetation, Figuren, Schleier-Shader, Joystick, Zonen).
- **Neu:** Schleier mit 12 Slots (8 Zonen plus 4 Flecken: Mangrove, Glimmer, Quellen, Rückfall), Moor-Senke, Wasserkörper-API, Szenen-System für Innenräume, Bewegungs-Zustandsmaschine.
- **Inhalte als Daten:** `src/content/**` werden automatisch eingesammelt, Systeme als `plugin.js`.
- **Budgets:** 30 fps auf iPad 9. Gen „mittel“ und auf älteren „niedrig“. Höchstens 12 animierte Figuren in Sicht, Mengen als Impostor. Höchstens 220 Draw-Calls auf „niedrig“. Die gebündelte HTML-Datei bleibt unter 3 MB.
- **Vertical Slice zuerst:** M0–M3 mit j01 und j06. Sie müssen schon ohne Kurs-Schicht Spaß machen, bevor der Rest entsteht.

## 20a. Mehrspieler-Vorbereitung (Pflicht für alle Arbeitspakete)
Die Insel soll später ein gemeinsamer Ort werden (siehe ROADMAP.md). Deshalb gilt schon jetzt:
1. **Ein Zustand, eine Wahrheit:** Aller spielrelevanter Zustand liegt in `game.state` (JSON, serialisierbar). Grafik liest den Zustand, speichert aber nie Spieldaten nur in Meshes.
2. **Aktionen statt direkter Änderungen:** Jede Änderung durch Spieler:innen läuft über `game.dispatch({ type, actor, payload })`. Handler ändern den Zustand und senden Ereignisse. Die lokale Person ist `actor: 'local'`. Später kann ein Server dieselben Aktionen prüfen und an alle verteilen.
3. **Pro Person getrennt von der Welt:** `state.players[id]` (Position, Avatar-Konfiguration, Inventar, Puls, Quest-Fortschritt, Kosmetik) ist getrennt von `state.world` (Schleier, Tore, gemeinsame Rätsel, Zeit, Wetter). Heute gibt es nur einen Eintrag in `players`.
4. **Stabile IDs:** Figuren, Props, Tore, Sammelsachen und Rätsel haben feste IDs aus den Inhaltsdaten, nie abhängig von der Erzeugungsreihenfolge. Zufall kommt nur aus dem seedbaren `rng`.
5. **Avatare aus Daten:** Jede Figur (auch eine fremde Spielerfigur) entsteht aus ihrer Konfiguration über dieselbe Pipeline. Die Konfiguration ist klein und serialisierbar.
6. **Absicht vor Bewegung:** Der Spieler-Controller verarbeitet Absichten (move, jump, action, power). Die lokale Eingabe erzeugt sie; später können sie aus dem Netz kommen. Fremde Figuren lassen sich über Position und Animation steuern.
7. **Rätsel mit n Personen denken:** Wo es passt, funktionieren Rätsel mit 1–n Personen. Im Einzelspieler übernehmen Glimm oder befreundete Figuren die zweite Rolle.
8. **Zeit und Wetter über einen Dienst:** `game.time` und das Inselwetter kommen aus einem Dienst, der später vom Server synchronisiert werden kann.
9. **Beobachter-Rolle vorbereiten:** Kamera und Oberfläche dürfen nicht voraussetzen, dass es genau eine spielende Person gibt. Eine freie Beobachter-Kamera (God Mode) soll möglich bleiben.
10. **Keine Freitext-Eingaben**, die später zu Chat werden könnten. Kommunikation läuft über Emotes, Schnellsätze und Marker.
11. **Speicherstände getrennt:** Personen-Spielstand und Welt-Spielstand werden getrennt gespeichert und versioniert.

## 21. Ausblick Staffel 2 und 3
- Der Spielstand wandert mit: Avatar, Baumhaus, Bindungen, Flaschenpost (öffnet sich beim Start) und Grisel als Lichtfalter-Begleiter.
- **Staffel 2 (Jahr 2):** Fränz' Boot bringt dich zu einem Archipel, jede Insel ist eine Szene pro Modul:
  - Selbstwert und Körper: Spiegelinsel
  - Stress und Schule
  - Wut und Impulse: Eisberg-Insel
  - Freundschaft und Liebe: Festinsel
  - Familie: Nachbarinsel, vorsichtig und von der Lehrkraft freigeschaltet
  - Vielfalt
  - Sicher im Netz
  - Riskant oder okay: nur mit Lehrer-Freigabe
  - Gesund an Körper und Seele
- **Staffel 3 (Jahr 3):** Mit der Fähre aufs Festland in eine Hafenstadt: Werte, Entscheidungen, Zukunft und Beruf (Jobs als Quests), Selbstständigkeit, schwere Gefühle, Resilienz, Mitbestimmung (Inselrat), Liebe und Einvernehmlichkeit (fiktional, ohne Romanzen-Simulation, von der Lehrkraft freigeschaltet), Medien und KI.

## 22. Entscheidungen für die Lehrkraft
- Namen von Spiel, Begleiter, Vögeln und Figuren (gemeinsam mit der Klasse)
- Farben des Gefühlsrads
- Rollstuhl-Unterstützung in Staffel 2
- Zeitpunkt für den Wochen-Code und das Klassebuch
- Eigenes Salz für die Codes pro Schuljahr
