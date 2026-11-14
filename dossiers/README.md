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
- Bauen: `npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx s02 && node dossiers/pdf.cjs s02` → `offline/solo/`.
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
