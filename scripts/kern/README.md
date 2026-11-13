# Kernkompetenzen-Blätter (Bereich `kern`)

Die 56 Blätter zu den Kernkompetenzen der Scolarisation spécialisée (Sprachen S1–S13, Rechnen R1–R19) sind mit kleinen
Schreibhilfen in Python verfasst – so bleiben sie kurz und einheitlich. Ergebnis sind ganz normale Blatt-Dateien:

    python3 scripts/kern/sprachen.py     → src/data/blaetter/kern.json    (S1–S13, 23 Blätter)
    python3 scripts/kern/rechnen1.py     → src/data/blaetter/kern-2.json  (R1–R8, 16 Blätter)
    python3 scripts/kern/rechnen2.py     → hängt R9–R19 (17 Blätter) an kern-2.json an

Reihenfolge einhalten (rechnen1 vor rechnen2). Danach wie immer prüfen und ansehen:

    npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-pruefen.ts src/data/blaetter/kern.json src/data/blaetter/kern-2.json
    npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-seiten.tsx kern
    npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-render.tsx <ordner> <blatt-id> --png

Regeln für diese Blätter (zusätzlich zu `src/blatt/BLATT-STIL.md`):

- Der Punkt der Liste steht vorn im Untertitel: „R4 · Zwei Zahlen, die zusammen 10 ergeben“. Daran erkennt der CDSE Hub
  das Blatt und zeigt es im Dossier beim passenden Punkt (hub-quellen/kernkompetenzen.js → `eigene`).
- Stufen C2–C3 (große Schrift), Schülerteil genau eine Seite, höchstens 4 Aufgaben, Punkte 1–3 für Basis/Kern/Plus.
- Lesestoff (Silben, Wörter) als `paeckchen` mit 4 Spalten – in Tabellen wäre die Schrift zu klein.
- Hörtexte und Mal-Diktate stehen im Ablauf auf der Seite für die Lehrperson.
- Neue Blätter hinten anfügen (die Nummer KK-07 ergibt sich aus der Reihenfolge); nur Deutsch, bis eine französische
  Fassung gewünscht wird.
