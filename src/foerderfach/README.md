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

## Zweite Ausgabe: Skills-Kurs Annexe

Dieselbe Technik setzt auch den Skills-Kurs der Annexe (nur Deutsch). Jedes Skript aus „Befehle“
(`foerderfach:pdf`, `:pruefen`, `:blatt`, `:einheit` und `scripts/foerderfach-uebernehmen.ts`) versteht
dazu `--ausgabe=annexe`: Es liest dann `src/data/foerderfach/annexe/` statt `src/data/foerderfach/` –
`plan-<klasse>.json`, `handbuch.json`, `einheiten-<klasse>.json`, `blaetter-<klasse>.json`,
`skillkarten.json`, Entwürfe in `entwurf/` (Ids `a7-e01`, `a6-…`, `a5-…`). Fehlende Dateien gelten als
leer, fehlt `fr`, wird `fr` = `de` gesetzt; die Werkzeug-Blätter (`blaetter.json`) und die Quellen sind
für beide Ausgaben gleich, dazu kommen die eigenen Werkzeug-Blätter der Annexe (`werkzeuge.json`, siehe unten).
Titel, Kopf und Fuß heißen „Skills fir d’Liewen · Annexe“, statt des
Lehrerhandbuchs entsteht ein Leitungsheft (`Skills-fir-d-Liewen_Annexe_7e_Leitungsheft.pdf` und
`…_Schuelerheft.pdf`, ohne Sprachkürzel). Auf Deckblatt und Rückseite steht über dem Titel „Annexe des CDSE ·
Kleingruppen“ (statt „Voie de préparation“), der Vergleichsbogen trägt im Kopf „Name“ und „Datum“ (statt „Klasse“
und „Schuljahr“). Teile ohne Texte oder Daten (z. B. der Auswertungsbogen der
Klasse, Stufen ohne Plan) und alles Zweisprachige (Glossar, Elternbrief und Fragebogen auf Französisch,
Übersetzung im Wortspeicher) entfallen; das Prüfen lässt Französisch sowie „Leitung“ und Imbiss aus den
Regeln und rechnet mit 30 Doppelstunden. `--daten=<ordner>` nimmt einen anderen Datenordner (zum Testen,
z. B. unter `tmp/`). Technik: `scripts/foerderfach-ausgabe.ts` lädt die Daten, `waehleAusgabe` in
`fach.ts` stellt die Namen ein; ohne Option läuft alles wie bisher.

**Spickzettel.** Vor jeder Einheit steht im Leitungsheft eine Seite „Spickzettel“ für die Hand der Leitung
(`SpickzettelSeite` in `pdf/Handbuch.tsx`, nur in der Ausgabe annexe; Vorbild: die Funktion `Spickzettel` im Skills-Kurs
der App, `src/seiten/Kurs.tsx`): Nummer und Titel, Minutenplan der Schritte (von–bis, Phase, Titel) mit dem ersten
Impuls je Schritt (erster Eintrag aus „sagen“, sonst erster Punkt), Material zum Abhaken, Kasten „Achtung“ und
Wochen-Mission. Er hat genau eine Seite: Je nach Länge der Texte wird in vier Stufen gekürzt (`SPICK_STUFEN`; Impulse auf
ganze Sätze, „Achtung“ mit Verweis „ganz: S. …“ auf die Übersicht). Die Marken `sp-<id>` und `spe-<id>` zeigen, ob es
dabei blieb – sonst meldet `foerderfach:pdf` und `foerderfach:einheit` ein ✗. Inhalt, Jahresplan und Kapitelseiten verweisen
weiter auf die Übersicht der Einheit (eine Seite hinter dem Spickzettel); `foerderfach:einheit` setzt den Spickzettel mit.
Die Sicherheitsseite (Teil A) hat in der Annexe etwas engere Abstände; ist ihr Text länger, fließt sie sauber auf eine
zweite Seite (Grundsätze paarweise, „Wenn sich jemand anvertraut“, „Hilfe“ und „Ohne Noten“ bleiben zusammen).

**Werkzeug-Blätter der Annexe.** Statt „So funktioniert das Fach“ (`ff-das-fach`) und „Klassenvereinbarung“
(`ff-klassenvereinbarung`) hat die Annexe „So läuft der Skills-Kurs“ (`a-der-kurs`) und „Unser Gruppenvertrag“
(`a-gruppenvertrag`), je eine Seite, in `src/data/foerderfach/annexe/werkzeuge.json` (Aufbau wie `blaetter.json`; ansehen:
`npm run foerderfach:blatt -- --ausgabe=annexe src/data/foerderfach/annexe/werkzeuge.json --png`). Welche Werkzeug-Blätter
je Klassenstufe in Teil D des Leitungshefts (`WERKZEUGE_ANNEXE`) und vorn im Schülerheft (`HEFT_VORN_ANNEXE`) stehen,
stellt `scripts/foerderfach-ausgabe.ts` ein (für die Klassen `src/foerderfach/daten.ts`); in der Annexe sind es
`a-der-kurs`, `ff-gefuehlsrad`, `ff-skills-pass`, `a-gruppenvertrag` und `ff-anspannungsskala` (Teil D) bzw. die ersten
vier (Heft).

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
