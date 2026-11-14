# REAL TALK – das Heft zum Skills-Kurs (eine Ausgabe je Modul)

Magazin für Jugendliche (12–16), bewusst nicht als Arbeitsblatt gemacht: schwarz-weiß mit einer
Akzentfarbe je Ausgabe, direkter Ton, erfundene Szenen nah am Alltag (Betrieb, Wohngruppe, Klinik).

Aufbau einer Ausgabe: Titel · Ansage · Tracklist mit Cast und Soundcheck · je Thema eine Doppelseite
(links Szene, Fakten, Mythos/Real, Merksatz – rechts „Dein Move“ mit zwei Aufgaben, Challenge,
eigener Line und Aufgabe für die Woche) · Sessions (Gruppen-Aktionen aus dem Kurs, zwei Seiten) · Kino
(Hauptfilm, Tipp, Bingo, Fragen) · Hot Takes · Knack den Code · Karten für die Tasche · Abspann ·
drei Seiten nur für die Leitung.

    npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5      # HTML nach dossiers/aus/
    node dossiers/pdf.cjs m5                                           # PDF nach dossiers/pdf/, prüft jede Seite
    BILDER=/pfad SEITEN=4,5 node dossiers/pdf.cjs m5                   # dazu Seitenbilder zum Ansehen
    npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx plan && node dossiers/pdf.cjs plan   # Jahresplan für die Leitung (alle Ausgaben, Videos, Filme)
    python3 dossiers/kurz.py m5                                        # Kurzfassung der Kurs-Einheiten

- `inhalt/<modul>.ts` – der Inhalt einer Ausgabe (Aufbau siehe `typen.ts`). Texte: `**fett**`, `==markiert==`.
- `bau.tsx` – setzt die Seiten. Figuren: Open Peeps aus `src/blatt` in Graustufen; Icons: Tabler (voller Satz).
- `stil.css` – Gestaltung. Akzentfarbe je Ausgabe über `farbe` im Inhalt.
- `pdf.cjs` – meldet „frei … mm“ je Seite. Negativ heißt Überlauf: Text kürzen oder Feld verkleinern.

Videos und Filme
- `clip` je Track wird als QR-Code gedruckt. Nur Links eintragen, die über die oEmbed-Schnittstelle von
  YouTube bestätigt sind (Titel und Kanal von dort übernehmen); Dauer und Inhalt muss die Leitung vor dem
  Einsatz selbst ansehen – das steht auch auf der dritten Leitungsseite.
- `kino.filme`: FSK nur 0, 6 oder 12 und aus einer Quelle belegt; sonst `fsk: null` („FSK prüfen“).
- Die Liste der Kandidaten liegt nicht im Repo (Recherche-Stand 14.11.2026).

Regeln für den Inhalt
- Du-Form, kurze Sätze, trockener Humor. Kein Kinderkram, keine Moral am Ende.
- Jeder Weg hat einen Preis und einen Gewinn („kostet mich / bringt mir“) – die Rechnung machen die Jugendlichen.
- Beide Seiten zeigen: selbst betroffen sein und selbst über eine Grenze gehen.
- Szenen und Personen sind erfunden (Namen der Peeps). Niemand muss Persönliches aufschreiben.
- Telefonnummern nur 116 111 und 112. „Diese Woche“ ist die Mission der Kurs-Einheit.
- Das Code-Quiz braucht so viele Fragen, wie das Lösungswort Buchstaben hat.

Schriften in `schrift/`: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache 2.0).
