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
| `daten.ts` | lädt alles aus `src/data/foerderfach`; Werkzeug-Blätter je Klassenstufe (`WERKZEUGE`, `HEFT_VORN`) |
| `EINHEITEN-STIL.md` | Leitfaden für neue Einheiten und ihre Schülerblätter (Aufbau, Ton, Französisch, Blätter, Prüfen) |
| `pdf/teile.tsx` | Kopf, Fuß, Überschriften, Kompetenz-Punkte, Deckblatt, Rückseite |
| `pdf/Handbuch.tsx` | Lehrerhandbuch je Klassenstufe (siehe unten) |
| `pdf/Schuelerheft.tsx` | Schülerheft je Klassenstufe (siehe unten) |
| `src/data/foerderfach/plan-7e.json` … `plan-5e.json` | Jahrespläne: Ziele je Kompetenzbereich, Kapitel (mit „Worum es geht“), 35 Doppelstunden |
| `src/data/foerderfach/einheiten-7e.json` … `-5e.json` | ausgearbeitete Einheiten (Deutsch und Französisch in einer Einheit) |
| `src/data/foerderfach/blaetter.json` | Werkzeug-Blätter für jede Stunde (`ff-…`): Das Fach, Gefühlsrad, Skills-Pass, Klassenvereinbarung, Anspannungsskala, Skills-Kompass, Skills-Buch |
| `src/data/foerderfach/blaetter-7e.json` … `-5e.json` | Schülerblätter der Einheiten (`ff7-…`, `ff6-…`, `ff5-…`) – nicht in der Toolbox-Liste |
| `src/data/foerderfach/handbuch.json` | Texte von Teil A, Elternbrief, Jahresweg, Glossar, Schülerheft (DE und FR gleich aufgebaut) |
| `src/data/foerderfach/entwurf/` | Entwürfe, je Einheit eine Datei (`{ einheiten, blaetter }`), bevor sie übernommen werden |

## Die Hefte

**Lehrerhandbuch** (je Klassenstufe, DE und FR): Deckblatt · Inhalt ·
Teil A Das Fach (Überblick, Kompetenzbereiche, Doppelstunde, Rahmen und Sicherheit, Methodenkoffer,
Eltern und Kollegium mit Elternbrief auf Deutsch und Französisch, Material für das Jahr) ·
Teil B Jahresplan (mit Seitenzahlen) und Jahresweg als Plakat ·
Teil C Die Einheiten: je Kapitel eine Kapitelseite, dann jede Einheit (Übersicht mit Zielen, Ablauf,
Material, Kopiervorlagen, Wortspeicher und „Achtung“; Schritte mit Beispielsätzen, Tipps und „Wenn es
kippt“; Ausblick, Differenzierung, Kurzfassung für eine Stunde, Hintergrund) und direkt dahinter ihre
Kopiervorlagen · Teil D Kopiervorlagen für jede Stunde · Glossar Deutsch–Französisch · Notizen · Rückseite.

**Schülerheft** (je Klassenstufe, DE und FR): Deckblatt mit Namensfeldern · Inhalt · die Blätter für
jede Stunde · die Blätter der Einheiten in der Reihenfolge des Jahres · Meine Wörter (Wortspeicher
Deutsch–Französisch) · Notizen · Rückseite mit Hilfe (SePAS, Kanner- a Jugendtelefon …).

Das Handbuch verweist bei jedem Blatt auf die Seite im Schülerheft („Heft S. 12“) und auf die
Kopiervorlage im Handbuch. Beide Hefte haben eine durch 4 teilbare Seitenzahl (Druck als Broschüre).

## Befehle

- Prüfen: `npm run foerderfach:pruefen` – alles, auch die Entwürfe (Nummern, Trimester, Minuten,
  DE/FR gleich aufgebaut, Wortspeicher, Kurzfassung = 50 Min., Quellen, Stil, Blätter nach den Regeln
  der Toolbox). Nur einzelne Entwürfe: `npm run foerderfach:pruefen -- src/data/foerderfach/entwurf/ff7-e02.json`
- Blätter eines Entwurfs ansehen: `npm run foerderfach:blatt -- src/data/foerderfach/entwurf/ff7-e02.json --png`
- PDFs: `npm run foerderfach:pdf -- [ordner] [--png] [--entwurf] [--nur=7e] [--sprache=de]` →
  Schülerheft und Lehrerhandbuch je Klassenstufe und Sprache, standardmäßig in `tmp/foerderfach`
  (nicht im Repo). `--entwurf` nimmt die Entwürfe mit. Das Skript setzt jedes Heft zweimal und prüft,
  dass Inhalt und Verweise stimmen, dass die Übersicht jeder Einheit auf eine Seite passt und dass die
  Seitenzahl durch 4 teilbar ist.

## Regeln für neue Einheiten

Siehe `EINHEITEN-STIL.md`. Kurz:

- Aufbau der 100 Minuten: 0–10 Check-in, 10–15 Brücke, 15–45 Hauptteil 1, 45–50 Bewegungspause
  (entfällt, wenn die große Pause dazwischen liegt), 50–85 Hauptteil 2, 85–95 Skill, 95–100 Abschluss.
  Eine Ablauf-Zeile je Schritt.
- Sozialformen für 20: allein, zu zweit, Tischgruppen zu vier, Klasse. Kein Imbiss, nie „allein draußen“.
- „Lehrkraft“, „Klasse“, „Stunde“; Anlaufstelle im Lycée ist der SePAS; bei Gefährdung nach dem
  Schutzkonzept der Schule handeln.
- Deutsch und Französisch sind gleich aufgebaut; dazu Wortspeicher (3–6 Wörter), Differenzierung
  (einfacher, anspruchsvoller) und Kurzfassung für eine einzelne Stunde.
- Quellen nur aus `src/blatt/quellen.ts`, im Hintergrundtext mit Autor und Jahr.
- Im Jahresplan: `wahl` für Wahleinheiten (entfallen zuerst), `neu` für neue Einheiten, `hinweis`
  für sensible Einheiten (SePAS, Eltern, Direktion), `basis` für die Einheit des Skills-Kurses.
