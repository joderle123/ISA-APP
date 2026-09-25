# Skills-Kurs – Leitfaden für Einheiten und Schülerblätter

Der Skills-Kurs ist ein Gruppenangebot für Jugendliche von etwa 12 bis 16 Jahren
im CDSE (Kleingruppe, meist 4–8 Jugendliche, eine oder zwei Leitungen). Jede
Einheit dauert rund **100 Minuten** und folgt festen Ritualen. Die Leitung
öffnet den Kurs, sieht die **nächste Einheit** und hat alles, was sie braucht:
Ziele, Material, Ablauf mit Minuten, genaue Anleitung mit Beispielsätzen,
Schülerblätter.

**Qualitätsmaßstab:** wie ein gutes Praxishandbuch aus einem Fachverlag
(Beltz, Verlag an der Ruhr, „Lions Quest – Erwachsen werden“). Fachlich
fundiert, konkret, erprobt klingend, respektvoll gegenüber den Jugendlichen.
Niemand soll beim Lesen denken: „Das hat eine KI geschrieben.“

Dateien:
- Kursjahr und Module: `src/data/kurs/jahr<N>.json` (Typen: `src/kurs/typen.ts`)
- Einheiten je Modul: `src/data/kurs/jahr<N>-m<k>.json` (`{ "einheiten": [...] }`),
  Joker-Einheiten: `src/data/kurs/jahr<N>-joker.json` (Id `j1-j01`, `joker: true`,
  `modul: "joker"`, `nr` = Joker-Nummer, `passt`: wann einsetzen)
- Grundlagen (Rituale, Rahmen, Methoden-Pool): `src/data/kurs/grundlagen.json`
- Schülerblätter: `src/data/blaetter/skills*.json`, Bereich `skills`, nach
  `src/blatt/BLATT-STIL.md` (dieser Leitfaden ergänzt ihn).
- Prüfen: `npx tsx --tsconfig tsconfig.scripts.json scripts/kurs-pruefen.ts`
  und `npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-pruefen.ts src/data/blaetter/skills.json`

---

## 1. Aufbau jeder Einheit (100 Minuten)

| Min. | Phase (`phase`) | Was passiert |
|---|---|---|
| 0–10 | `ankommen` | Check-in: Gefühlsrad (ab Einheit 11 zusätzlich Anspannung 0–100) oder eine Variante aus dem Methoden-Pool |
| 10–15 | `bruecke` | Kurzer Rückblick auf die letzte Einheit, Thema von heute nennen |
| 15–45 | `input` / `uebung` | Hauptteil 1: Input und erste Übung, eher ruhig, oft mit Schülerblatt |
| 45–60 | `pause` | Pause mit Imbiss – bewusst Teil des Programms (Beziehung entsteht hier) |
| 60–85 | `aktiv` | Hauptteil 2: Bewegung, Spiel, Natur, Rollenspiel |
| 85–95 | `skill` | Ein Skill oder eine Achtsamkeitsübung zum Runterkommen |
| 95–100 | `abschluss` | Réckbléck (Blitzlicht), Eintrag in den Skills-Pass, Ausblick |

Abweichungen sind erlaubt, wenn der Inhalt es verlangt (z. B. Film, Naturtag).
Die Minuten in `ablauf` müssen lückenlos von 0 bis `dauer` laufen; die
`schritte` zusammen ergeben ebenfalls etwa `dauer` (± 5 Min.).

**Wiederkehrende Fäden** (bitte aufgreifen, wo es passt): Gefühlsrad (jede
Einheit), Skills-Pass (jede Einheit), Glas der Bedürfnisse (E4 → E15 → E30),
Baum der Stärke (E6 → E19 → E30), Anspannungsskala 0–100 (ab E11 in jedem
Check-in), Plakat „Was sind Skills?“ (E1 → E11 → E30).

## 2. Felder einer Einheit

- `titel`: kurz, sprechend, ohne Doppelpunkt-Untertitel. Gut: „Das Glas der Bedürfnisse“, „Grenzen setzen: Stopp!“.
- `kurz`: ein Satz, worum es geht – für die Übersicht. Kein „In dieser Einheit …“.
- `ziele`: 2–4 beobachtbare Ziele, jeweils mit Verb beginnend, ohne „Die Jugendlichen“:
  „erkennen, dass …“, „probieren drei Atem-Skills aus und bewerten sie“.
- `material`: konkret und vollständig, so dass man es abhaken kann („Klebeband, A3-Papier je Person, Stifte“, „Situationskarten (Methoden-Pool G), ausgeschnitten“).
- `vorbereitung`: nur, was vorher passieren muss („Raum: Stühle im Kreis, Tische an die Wand“, „Filmausschnitt 12:40–17:10 vorbereiten“).
- `ablauf`: die Zeittabelle (kurze Titel, ≤ 60 Zeichen).
- `schritte`: die eigentliche Anleitung, in der Reihenfolge der Einheit.
  - `text`: sachlich, im Infinitiv oder Imperativ, ohne Anrede der Leitung
    („Stühle im Kreis. Selbst beginnen und die Geste vormachen.“). 2–6 Sätze.
    Konkret: Wer macht was, wie lange, in welcher Sozialform, was entsteht?
  - `sagen`: 1–4 wörtliche Impulse für die Jugendlichen, natürlich und
    jugendgerecht, wie eine erfahrene Fachkraft spricht („Was hat euch heute
    geholfen, ruhig zu bleiben?“). Keine Anführungszeichen setzen – das macht
    die App.
  - `punkte`: Listen, die die Leitung vorliest oder anschreibt.
  - `tabelle`: wenn ein Modell an die Tafel kommt (z. B. Anspannungsskala).
  - `tipp`: ein Satz aus der Praxis („Die Leitung macht den ersten Check-in
    selbst und ehrlich – das senkt die Hemmschwelle.“).
  - `wennEsKippt`: realistisch – niemand redet, jemand lacht andere aus,
    jemand verweigert, die Gruppe ist aufgedreht, jemand erzählt etwas
    Belastendes. Was konkret tun?
  - `blatt`: Id des Schülerblatts in diesem Schritt.
- `bruecke`: ein wörtlicher Ausblick-Satz für das Ende („Nächstes Mal …“).
- `hintergrund`: 300–900 Zeichen für die Leitung: warum die Einheit wirkt,
  fachlich sauber, Quelle im Text („(Rathus & Miller, 2015)“).
- `quellen`: nur wörtlich aus `src/blatt/quellen.ts` (das Prüfskript lehnt anderes ab).
- `achtung`: bei sensiblen Themen immer (Gefühle, Familie, Körper, Grenzen,
  Mobbing, Medien, Krise): nicht im Plenum vertiefen, Einzelgespräch
  anbieten, „weiter“ ist erlaubt; bei Hinweisen auf Gefährdung (Gewalt,
  Missbrauch, Selbstverletzung, Suizidgedanken) sofort nach dem internen
  Schutzkonzept handeln und die zuständige Leitung (Responsable) informieren.

## 3. Sprache und Ton

**Konkret statt allgemein.** Nicht „Über Gefühle sprechen“, sondern: „Jede
Person zieht eine Situationskarte, liest sie vor und stellt sich auf die
Linie 0–100, so angespannt wäre sie. Die anderen dürfen fragen: Was würde dir
bei dieser Zahl helfen?“

- **Alltag in Luxemburg:** Annexe, Lycée, Cycle 4, Maison Relais, SePAS, Bus,
  Pause, Kantine, Klassenrat, Praktikum. Luxemburgische Rituale dürfen bleiben
  (Réckbléck). Keine deutschen Sonderbegriffe (kein „Hort“, kein „Gymnasium“).
- **Namen** in Beispielen gemischt wie in Luxemburger Klassen: Lena, Noah,
  Inês, Tiago, Mila, Jang, Ben, Sofia, Yusuf, Amira, Luca, Emma, Liam,
  Chiara, Diogo, Léa, Mathis, Zoé, Elias, Aylin, Nora, Samuel, Ana, Rafael.
- **Jugendliche ernst nehmen:** nicht kindlich, keine Belehrung, kein
  erhobener Zeigefinger. Humor ja, Ironie über Jugendliche nein.
- **Freiwilligkeit:** Niemand muss Persönliches erzählen. „Weiter“ ist immer
  erlaubt. Schreibaufgaben mit persönlichen Inhalten werden nicht laut
  vorgelesen, außer jemand möchte das.
- **Varianten mitdenken:** Was tun bei wenig Energie, bei Unruhe, bei nur zwei
  Jugendlichen, bei Regen (Natur-Übungen)?
- **Keine Diagnose- oder Therapiesprache** gegenüber den Jugendlichen
  („Störung“, „Symptom“, „Therapie“). Im `hintergrund` fachlich korrekt.
- **Filme und Medien:** Wenn ein Film gezeigt wird, kurz auf Vorführrechte
  hinweisen (Schullizenz klären) und genaue Ausschnitte angeben.

**Verboten (wirkt nach KI oder Textbaukasten):**
- Emojis, Symbole als Deko (✓ ➜ ★), „Kernsatz:“, „Wichtig:“ als Satzanfang in jedem Absatz
- „In dieser Einheit …“, „Heute tauchen wir ein …“, „spannend“, „Reise“, „Entdeckungsreise“,
  „magisch“, „Superkraft“, „ganzheitlich“, „Lass uns …“, „Viel Spaß“, „Wusstest du …“
- Dreierlisten ohne Inhalt, Allgemeinplätze („Gefühle sind wichtig“, „Kommunikation ist der Schlüssel“)
- Mehr als ein Ausrufezeichen pro Einheit (außer in wörtlichen Spielanweisungen wie „Stopp!“)
- Englische Modewörter, wo es ein gutes deutsches Wort gibt (kein „Mindset“, „Challenge“ nur, wo die Jugendlichen es selbst so sagen)

**Typografie:** deutsche Anführungszeichen „…“ und ‚…‘, Gedankenstrich –,
Auslassung …, Minuten als „10 Min.“, Bereiche „0–10“. Keine Zeichen außerhalb
von Latein-1 außer diesen.

## 4. Schülerblätter im Skills-Kurs

- Nach `BLATT-STIL.md`, mit diesen Festlegungen:
  - `bereich`: `skills`, `thema`: Modul-Thema (`ankommen`, `ich`, `gefuehle`,
    `regulieren`, `gedanken`, `kommunikation`, `schwierig`, `digital`,
    `gesund`, `abschluss`)
  - `stufen`: `["C4", "ES"]`, `layout`: `"jugend"` (ruhig, sachlich, nie kindlich)
  - `kurs`: die Einheiten, in denen das Blatt vorkommt, z. B. `["j1-e01"]`
  - nur Deutsch (`fr` optional)
  - Seite „Für die Lehrperson“ wie im Leitfaden (Ziel, Ablauf, Hintergrund, Quellen …)
- Ein Blatt hat einen Zweck. Lieber zwei klare Blätter als eines, das alles will.
- Figuren für Jugendliche: `figur:jana`, `figur:ben` (mit Gefühl und Haltung);
  Erwachsene: `figur:lehrerin`, `figur:lehrer`.
- Denkmodelle nutzen, wo sie passen: `thermometer` (Anspannung), `eisberg`,
  `waage`, `leiter`, `zielscheibe`, `koerper` (Gefühls-Landkarte), `batterie`,
  `schritte`, `wennDann`, `satzanfaenge`, `einschaetzung`.
- Blätter mit persönlichen Inhalten: Hinweis „Du entscheidest, was du teilst.“
  als `info` (Art `hilfe`), nicht als Ermahnung.
- Bei Krisen-, Mobbing- und Medienthemen am Ende `notfall` (Hilfenummern Luxemburg).

## 5. Beispiel

Die Einheit `j1-e01` („Willkommen! Unser Rahmen“) in `jahr1.json` und die
Blätter `skills-gruppenvertrag` und `skills-pass` in `skills.json` sind die
Musterbeispiele. Neue Einheiten sollen mindestens diese Tiefe haben.
