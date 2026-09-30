# Förderfach „Skills fir d’Liewen“

Sozio-emotionales Lernen für die Voie de préparation (7e, 6e, 5e): eine
Doppelstunde (100 Min.) pro Woche, Klassen von rund 20 Jugendlichen,
unterrichtet von Lehrkräften des Lycée ohne psychologische Vorbildung,
Deutsch und Französisch, ohne Noten.

Das Fach beruht auf dem Skills-Kurs der Annexe (`src/kurs`, `src/data/kurs`),
ist aber eigenständig: Der Skills-Kurs bleibt unverändert. Der Arbeitstitel
steht an einer Stelle (`FACH` in `fach.ts`).

## Dateien

| Datei | Inhalt |
|---|---|
| `typen.ts` | Datenmodell: Jahresplan, Kapitel, Plan-Einheit, ausgearbeitete Einheit, Handbuchtexte |
| `fach.ts` | Name, Farben je Klassenstufe, die fünf Kompetenzbereiche (CASEL), Phasen, kurze Texte DE/FR |
| `daten.ts` | lädt alles aus `src/data/foerderfach` |
| `pdf/teile.tsx` | Kopf, Fuß, Überschriften, Kompetenz-Punkte, Deckblatt |
| `pdf/Handbuch.tsx` | Booklet je Klassenstufe (Lehrerhandbuch 7e, 6e, 5e): Teil A (Fach), Teil B (Jahresplan), Teil C (Einheiten, falls ausgearbeitet), Kopiervorlagen, Notizen, Rückseite |
| `pdf/Schuelerheft.tsx` | Schülerheft: Deckblatt, Blätter für jede Stunde, Blätter der Einheiten |
| `src/data/foerderfach/plan-7e.json` … `plan-5e.json` | Jahrespläne: Ziele je Kompetenzbereich, Kapitel mit Trimester, 35 Doppelstunden |
| `src/data/foerderfach/einheiten-7e.json` | ausgearbeitete Einheiten (Deutsch und Französisch in einer Einheit) |
| `src/data/foerderfach/handbuch.json` | Texte von Teil A (Überblick, Kompetenzen, Doppelstunde, Rahmen und Sicherheit) |
| `src/data/foerderfach/blaetter.json` | Schülerblätter (Toolbox-Blätter, `de` und `fr`) – nicht in der Toolbox-Liste |

## Befehle

- Prüfen: `npm run foerderfach:pruefen` (Nummern, Trimester, Minuten, DE/FR gleich aufgebaut, Quellen, Stil)
- PDFs: `npm run foerderfach:pdf -- [ordner] [--png]` → drei Booklets (7e, 6e, 5e) und das Schülerheft 7e,
  jeweils DE und FR, standardmäßig in `tmp/foerderfach` (nicht im Repo). Das Skript prüft, dass die
  Seitenzahlen im Inhalt und die Verweise auf die Kopiervorlagen stimmen und dass jedes Booklet eine
  durch 4 teilbare Seitenzahl hat (Druck als Broschüre, z. B. auf A3 gefaltet zu A4).
- Kopiervorlagen jedes Booklets: `VORLAGEN` in `daten.ts`, dazu die Blätter der ausgearbeiteten Einheiten.

## Regeln für neue Einheiten

- Aufbau und Felder wie im Skills-Kurs (`src/kurs/KURS-STIL.md`), angepasst an die Klasse:
  - 0–10 Check-in (Klebepunkt am Gefühlsrad, zwei oder drei Stimmen), 10–15 Brücke, 15–45 Hauptteil 1,
    45–50 Bewegungspause (entfällt, wenn die große Pause dazwischen liegt), 50–85 Hauptteil 2,
    85–95 Skill, 95–100 Skills-Pass und Blitzlicht.
  - Sozialformen für 20: erst allein, dann zu zweit, dann in Tischgruppen zu vier, dann alle.
    Kein Imbiss, kein „allein draußen“; Bewegung im Klassenraum oder auf dem Schulhof.
  - „Lehrkraft“ statt „Leitung“, „Klasse“ statt „Gruppe“, „Stunde“ statt „Einheit“ im Gespräch mit
    den Jugendlichen. Anlaufstelle im Lycée ist der SePAS; bei Gefährdung nach dem Schutzkonzept der
    Schule handeln.
- Deutsch und Französisch sind gleich aufgebaut: gleiche Minuten, Phasen, Schritte, Blätter,
  gleich viele Impulse und Punkte. Das Prüfskript vergleicht beides.
- Französisch: « … » mit normalem Leerzeichen (das Programm setzt geschützte), vor : ; ! ? ein
  Leerzeichen, innere Anführungszeichen “ … ”, „l’enseignant·e“ nur, wo es nicht anders geht –
  Anleitungen im Infinitiv („Écrire la question au tableau“).
- Quellen nur aus `src/blatt/quellen.ts`; im Hintergrundtext mit Autor und Jahr nennen.
- Im Jahresplan: `wahl` für Wahleinheiten (entfallen zuerst), `neu` für neue Einheiten, `hinweis`
  für sensible Einheiten (SePAS, Eltern, Direktion), `basis` für die Einheit des Skills-Kurses.
