# REAL TALK – das Heft zum Skills-Kurs (eine Ausgabe je Modul)

Magazin für Jugendliche (12–16), bewusst nicht als Arbeitsblatt gemacht: schwarz-weiß mit einer
Akzentfarbe je Ausgabe, direkter Ton, erfundene Szenen nah am Alltag (Betrieb, Wohngruppe, Klinik).

Aufbau einer Ausgabe: Titel · Ansage · Tracklist mit Cast und Soundcheck · je Thema eine Doppelseite
(links Szene, Fakten, Mythos/Real, Merksatz – rechts „Dein Move“ mit zwei Aufgaben, Challenge,
eigenem Satz und Aufgabe für die Woche) · Sessions (Gruppen-Aktionen, zwei Seiten; ab neun Aktionen vier je
Seite) · Kino (nur in drei Ausgaben: ein Film je Trimester, mit Bingo und Fragen) · Hot Takes · Knack den Code · Karten für die Tasche · Abspann ·
drei Seiten nur für die Leitung.

    npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5      # HTML nach dossiers/aus/
    node dossiers/pdf.cjs m5                                           # PDF nach offline/real-talk/ (neben der Toolbox), prüft jede Seite
    BILDER=/pfad SEITEN=4,5 node dossiers/pdf.cjs m5                   # dazu Seitenbilder zum Ansehen
    npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx plan && node dossiers/pdf.cjs plan   # Jahresplan für die Leitung (alle Ausgaben, Videos, Filme)
    python3 dossiers/kurz.py m5                                        # Kurzfassung der Kurs-Einheiten

- `inhalt/<modul>.ts` – der Inhalt einer Ausgabe als Daten (Aufbau siehe `typen.ts`). Texte: `**fett**`, `==markiert==`.
- `bau.tsx` – setzt die Seiten. Figuren: Open Peeps aus `src/blatt` in Graustufen; Icons: Tabler (voller Satz).
- `stil.css` – Gestaltung. Akzentfarbe je Ausgabe über `farbe` im Inhalt.
- `pdf.cjs` – meldet „frei … mm“ je Seite. Negativ heißt Überlauf: Text kürzen oder Feld verkleinern.

## Hefte mit Stunden (seit 16.11.2026 – alle neun Hefte)

Rückmeldung aus der Praxis: Die Doppelseiten wirkten zusammengewürfelt (Clip ohne Bezug und ohne Fragen, jede Seite gleich gebaut,
Aktionen ohne Material). Deshalb ist eine Einheit jetzt eine **zusammenhängende Stunde** (`Track.stunde`, Aufbau in `typen.ts`,
gesetzt von `stunde-bau.ts`):

- **Stationen in der Reihenfolge des Unterrichts.** Die erste Seite zeigt Leitfrage, „Am Ende kannst du …“ und den Fahrplan mit
  Minuten; jede weitere Seite zeigt oben, wo die Gruppe gerade ist.
- **Ein roter Faden:** Der Fall vom Anfang kommt bei Clip, Modell und Schluss wieder vor (z. B. Nele: Ankommen → Fall → Clip über
  Schlaf → Schlaf ist einer von sechs Tanks → Warnlichter erkennen → eigener Tank → ein Satz für Nele).
- **Jede Stunde ist anders gebaut:** einmal vom Fall aus, einmal von einem Experiment aus (dieselbe Aufgabe laut und leise), einmal von dem,
  was die Gruppe schon kann. Bausteine: Fall mit Zeitleiste, Gesprächsprotokoll, Akte, Modell, Clip, große Aktion, Karten, Tabelle, Auswahl.
- **Clip nur, wenn er zum Fall passt – und immer mit Aufträgen:** vorher (Tipp abgeben), beim Schauen (mitschreiben), danach
  (zurück zum Fall). Der Inhalt der Videos lässt sich von hier aus nicht ansehen: Titel und Kanal kommen von oEmbed, die Fragen
  sind so gestellt, dass sie mit jedem passenden Ausschnitt funktionieren. Die Leitung sieht den Clip vorher an.
- **Eine große Aktion je Stunde (25–30 Minuten)** mit Ziel, Material, Schritten, Runden, Regeln, Variante zu dritt, Punktetabelle
  und Auswertung. **Alles Material steht im Heft** (Situations-, Rollen- und Stärken-Karten zum Ausschneiden).
- **Kein Vorspielen** (Rückmeldung 16.11.2026: Die Jugendlichen tun sich mit Theater und Pantomime sehr schwer). Keine Aufgabe verlangt,
  vor der Gruppe etwas darzustellen: Es wird gelesen, gleichzeitig gezeigt (Finger, Karten), gelegt, gebaut, angekreuzt und geschrieben.
  Rollen-Karten sind Aufgaben, kein Schauspiel.
- **Einfach zu verstehen** (Rückmeldung 16.11.2026): Fälle als kurze Geschichte mit Sprechblasen („Sami sagt:“, „Amira denkt:“), keine
  Uhrzeiten-Protokolle, keine Tabellen wie „bringt/kostet die Gruppe“. Fragen zuerst zum Ankreuzen, dann ein Satzanfang, höchstens eine
  freie Zeile. Fremdwörter im Clip-Titel werden in einem Satz erklärt.
- **Wörter:** Stunde statt Track, „Das kommt“ statt Tracklist, „Zum Aufwärmen“, „Streitfragen“, „Zum Schluss“. Die „Sessions“ entfallen
  (die Aktionen stehen in den Stunden). Die Leitung bekommt eine Seite „Der Ablauf der Stunden“ (Station, Zeit, Form, Seite, worauf es ankommt).

**Sweet Spot (Rückmeldung 24.11.2026 – ersetzt einen Versuch mit Ermittlungs-Fällen, der „zu viel und zu schwer“ war):**
Jede Station soll **persönlich** sein (Situationen aus dem eigenen Alltag, „Kennst du das?“), **zum Nachdenken** anregen (eine gute
Frage statt vieler Aufgaben), **leicht ins Gespräch** führen (Sprechblase „Redet darüber“, Baustein `reden` – freiwillig, ohne
Schreiben), **Spaß** machen (ausmalen, legen, bauen; Akku zum Ausmalen `akku`, Tankanzeige `anzeige`, Verbinden `verbinden`) und
**leicht verständlich** sein (kurze Anweisungen mit Verb, erst ankreuzen, höchstens zwei, drei Fragen je Station, ein Beispiel
„So sieht eine Runde aus“ bei jeder großen Runde). Große Runden **ohne Punkte und ohne Teams gegeneinander**. #01 ist der Pilot.

**So ist es abgelegt:** Die alten Angaben je Track (Szene, Fakten, Moves, Mythen) bleiben in `inhalt/mN.ts` als Quelle. Die Stunden
stehen in `inhalt/mN-stunden.ts` (`stunden(d)` und `loesungen`); am Ende von `mN.ts` stellt `aufStunden(d, stunden(d), { loesungen })`
die Ausgabe um (Wörter, Einsatz, Material, Lösungen der Leitung). #01 ist von Hand geschrieben (`m1-stunden.ts` + Block am Ende von
`m1.ts`). Die Kurzschreibweisen stehen in `inhalt/stunden-hilfe.ts` (`ankommen`, `fall`, `clip`, `modell`, `stimmtDas`, `runde`,
`material`, `fuerDich`, `schluss` …). Hefte ohne `stunde` würden weiter als Doppelseiten gesetzt – es gibt aber keine mehr.

**Die großen Runden** (je Stunde eine, Material im Heft): #00 eigene Regeln · Treffer-Jagd · Blind-Lotse — #01 Tank-Detektive · Brücke ·
Stärken-Markt — #02 Wörter-Jagd · Pult-Wette · Song-Tipp · Chips setzen — #03 Druck-Tag · Atem-Labor · Sinnes-Labor · Kopf-Zirkel ·
Skills-Notruf — #04 Zwei Filme · geheime Zählung · Tatort · Mut-Leiter — #05 drei Kanäle · Satz-Werkstatt · drei Felder · von unklar
bis klar — #06 Tiere und Treppe · Nein-Baukasten · Kipp die Bühne — #07 gegen den Algorithmus · bevor ich sende · Schlagzeilen-Wette —
#08 Schlaf-Auktion · Rucksack-Rennen · das Jahr in 16 Karten · Stärken-Post.

**Seiten prüfen:** `pdf.cjs` meldet den freien Platz je Seite. Faustwerte: erste Seite einer Stunde (Kopf und Fahrplan) trägt Ankommen
und ein bis zwei kurze Stationen; Fall 70–95 mm, Clip etwa 80 mm, Modell etwa 55 mm, große Runde 150–180 mm, Schluss 50–60 mm.
Ab vier Stunden verteilt sich „Der Ablauf der Stunden“ auf mehrere Seiten; bei fünf Stunden entfällt die Stations-Kette auf „Das kommt“.

**Clips umgehängt (16.11.2026):** #02 – der Clip über das Steuerpult der Gefühle gehört jetzt zu „Wer sitzt am Steuer?“; #04 – der Clip
über Glaubenssätze gehört zu „Alte Sätze“. Ohne Clip (keiner passte zum Fall): #00 Stunde 1, #02 Stunde 4, #04 Stunde 1, #07 Stunde 2,
#08 Stunde 3.

Videos und Filme
- `clip` je Track wird als QR-Code gedruckt. Nur Links eintragen, die über die oEmbed-Schnittstelle von
  YouTube bestätigt sind (Titel und Kanal von dort übernehmen); Dauer und Inhalt muss die Leitung vor dem
  Einsatz selbst ansehen – das steht auch auf der dritten Leitungsseite.
- `kino` ist wählbar und steht nur in #01, #03 und #07: **ein Film pro Trimester**, kein Filmkurs. `reserve` nennt
  einen Ersatzfilm für die Leitung (erscheint nur im Jahresplan). FSK nur 0, 6 oder 12 und aus einer Quelle
  belegt; sonst `fsk: null` („FSK prüfen“).
- Die Liste der Kandidaten liegt nicht im Repo (Recherche-Stand 14.11.2026).

Gruppe und Aktivitäten
- Die Gruppe hat **3 bis 6 Jugendliche**. Jede Aktion muss zu dritt funktionieren: `zu3` ist der Hinweis auf der
  Karte („Zu dritt: …“), wenn die allgemeine Regel (Leitung spielt mit, ein Team gegen die Uhr) nicht reicht.
- `wann` (`Start`, `Mitte`, `Schluss`) sagt, wann eine Aktion in der Einheit läuft. Jeder Track braucht eine
  Aktion für den Start. Die Leitungsseite zeigt daraus den Ablauf je Track.
- Nichts, was bloßstellt: keine Berührung, die man nicht sieht; Augen zu ist freiwillig; Vorwürfe und
  Täterrollen spricht die Leitung oder eine Karte, nie ein Gruppenmitglied.
- Praxistest und Jugend-Kritik vom 14.11.2026 sind eingearbeitet (Widersprüche, Therapie-Sprech, Wiederholungen).

Regeln für den Inhalt
- Du-Form, kurze Sätze, trockener Humor. Kein Kinderkram, keine Moral am Ende.
- Jeder Weg hat einen Preis und einen Gewinn („kostet mich / bringt mir“) – die Rechnung machen die Jugendlichen.
- Beide Seiten zeigen: selbst betroffen sein und selbst über eine Grenze gehen.
- Szenen und Personen sind erfunden (Namen der Peeps). Niemand muss Persönliches aufschreiben.
- Telefonnummern nur 116 111 und 112. „Diese Woche“ ist die Mission der Kurs-Einheit.
- Das Code-Quiz braucht so viele Fragen, wie das Lösungswort Buchstaben hat.

Schriften in `schrift/`: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache 2.0).

## Ton

- Klares, direktes Deutsch. **Keine nachgemachte Jugendsprache** (kein „Digga“, „cringe“, „Vibe“ usw.) – das wirkt bemüht.
- Englisch nur dort, wo es der normale Name einer Sache ist (Track, Challenge, Hot Take, Clip).
- Nicht ständig betonen, dass das Heft „nicht wie Schule“ ist. Höchstens einmal je Ausgabe.
- Ernst nehmen statt anbiedern: echte Themen, kurze Sätze, Humor ohne Zeigefinger. Mitmachen ist immer freiwillig.

## SOLO – Hefte für die Bezugszeit (Einzelarbeit)

- Inhalt: `solo/sNN.ts` (Aufbau `solo-typen.ts`), Renderer `solo-bau.ts`. Jede Seite ist eine Liste von Bausteinen
  (Text, Deal, Aufgaben, Fall, Fakten, Video, Marker-Frage, Experiment, Karten, drei Tiefen, Logbuch).
- **Druck-PDF (seit 21.11.2026 im Heft-Design der Modulhefte):** `npx tsx --tsconfig tsconfig.scripts.json tools/hefte/solo-umbau.mts`
  wandelt alle `solo/sNN.ts` in `tools/hefte/inhalt/solo-NN.mjs` um (außer #02, das ist von Hand gebaut), dann
  `npx tsx --tsconfig tsconfig.scripts.json tools/hefte/heft.tsx solo-05` → legt das PDF direkt nach `offline/solo/`.
  Inhalt also weiter in `solo/sNN.ts` ändern, danach Umwandler und Heft laufen lassen.
- Alter Weg (nur noch für die HTML-Vorschau, überschreibt sonst das neue PDF): `dossiers/bau.tsx s02 && node dossiers/pdf.cjs s02`.
- Verzeichnis für die Toolbox: `npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx solo-index` schreibt
  `src/data/solo.json` (Seite „Bezugszeit“ im Skills-Kurs, mit Quiz zum Spielen). Danach die Toolbox neu bauen.
- Neues Heft im Hub: in `Klassebuch/hub-apps.js` bei der Toolbox einen `zusatz`-Eintrag für das PDF ergänzen.
- Grundidee: Der Jugendliche ist der Profi („Schon mal gehört?“), die Bezugsperson macht mit (Duell mit eigenen
  Antworten), jede Stunde endet mit einem Experiment und einer Wette. Themenwahl über die Landkarte (#01).
- Regeln aus der Jugend-Kritik (November 2026):
  - **Quiz:** richtige Antworten gleichmäßig auf A–D verteilen, nicht die längste. Falsche Antworten sind naheliegende
    Irrtümer (Sprüche von Seite 1, Ausreden der Figur), keine Witze. Jede Frage muss im Heft belegt sein.
  - **Nichts versprechen, was die Einrichtung nicht hält:** Der Deal (#00) sagt „Du erfährst, was weitergesagt wird“.
    Vor Stufe 3 steht der Hinweis, zuerst nach der Meldepflicht zu fragen (druckt der Renderer).
  - **Keine Frage, die ein Geständnis oder Namen verlangt.** Heikles mit „Ja oder Nein reicht“ oder über die Figur.
  - **Experimente** nennen immer eine Wette, sind in der Wohngruppe machbar und sagen, was bei Abbruch gilt.
  - **Abwechslung:** Etikett über den Sprüchen, Titel der drei Kästen, Aufkleber und Unterzeile von Seite 4 je Heft
    eigen. Unter den Kästen darf der Jugendliche einen streichen. Kein Rat im Heft, über den Seite 1 spottet –
    sonst den Unterschied in einem Satz nennen.
  - **Alter:** kein „mit 15“ (Leser sind 12–17). **116 111** hat feste Zeiten – nur die **112** ist immer erreichbar.

## SOLO AKTION – Hefte zum Machen (je Thema acht Aktionen)

- Für Jugendliche, die wenig lesen wollen oder können (auch Förderbedarf): eine Seite je Aktion, höchstens fünf kurze
  Schritte, Ankreuzen, Zeichnen, Messen, Spielen statt Schreiben. Dazu ein Auftrag für die Woche und zwei Seiten für
  die Bezugsperson. Ein Thema reicht so für vier bis acht Bezugszeiten.
- Inhalt: `aktion/aNN.ts` (Aufbau `aktion-typen.ts`), Renderer `aktion-bau.ts`. Farbe, Video und Warnhinweis kommen aus
  dem vollen Heft `solo/sNN.ts` (`aktion/hilfe.ts`).
- Bauen: `npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx a05 && node dossiers/pdf.cjs a05`
  → `offline/solo/Solo-05-Wut-Aktion.pdf`. Die Toolbox zeigt das Aktions-Heft automatisch (`solo-index`).
- Regeln: einfache Sätze (ein Gedanke je Satz), jede Aktion mit dem Gegenüber gemeinsam, messbar oder sichtbar
  (Zahl, Kreuz, Zeichnung), in 10–15 Minuten mit Dingen aus jedem Büro machbar. Heikles läuft über die Figur, nie über
  ein Geständnis. Rollenspiele nur zu harmlosen Lagen (Stift, Handy), nach der letzten Stufe aus der Rolle gehen.
  Kein Körperkontakt außer der Seitenlage (#09) – und nur mit Einverständnis.
