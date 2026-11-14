# Skills-Dossiers (Schülerhefte je Modul)

Ein Heft je Modul des Skills-Kurses, Jahr 1: Deckblatt mit Pass, „So läuft es“, Übersicht,
je Einheit eine Doppelseite (links verstehen, rechts tun), Rätsel, Quiz mit Lösungswort,
Rückblick mit Urkunde und drei Seiten nur für die Leitung.

    npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5      # HTML nach dossiers/aus/
    node dossiers/pdf.cjs m5                                           # PDF nach dossiers/pdf/, prüft jede Seite
    BILDER=/pfad SEITEN=4,5 node dossiers/pdf.cjs m5                   # dazu Seitenbilder zum Ansehen
    python3 dossiers/kurz.py m5                                        # Kurzfassung der Einheiten (zum Schreiben)

- `inhalt/<modul>.ts` – der Inhalt eines Hefts (Aufbau siehe `typen.ts`). Texte: `**fett**`.
- `bau.tsx` – setzt die Seiten; Bilder kommen aus `src/blatt` (`peep:`, `emoji:`, `icon:`).
- `stil.css` – Gestaltung. Eine Farbe je Einheit (`FARBEN` in `bau.tsx`).
- `pdf.cjs` – meldet „frei … mm“ je Seite. Negativ heißt Überlauf: Text kürzen.

Regeln für den Inhalt: Du-Form, kurze Sätze, nichts Kindliches, kein Zeigefinger, erfundene
Jugendliche (Namen der Peeps), niemand muss Persönliches aufschreiben, Telefonnummern nur
116 111 und 112, die Aufgabe „Für die Woche“ ist die Mission der Einheit.
Das Quiz braucht so viele Fragen, wie das Lösungswort Buchstaben hat.

Schriften: Fredoka und Nunito (SIL Open Font License), in `schrift/`.
