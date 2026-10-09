# Passgenau – Beschriftung (Overlays)

Geprüfte Werte einzelner Katalogeinträge, **getrennt vom automatisch erzeugten Katalog** (`bausteine.json`,
`schritte.json`). Konzept 4.6, Phase 1/2: Phase 0 füllt alle Felder automatisch vor (mit `sicher` je Feld),
Beschrifter (Agenten, später Fachkräfte) prüfen und korrigieren sie hier. `npm run passgenau:katalog` wendet die
Overlays beim Erzeugen an – **das Overlay gewinnt**, die Sicherheit des Felds kommt aus dem Overlay.

## Dateien

| Datei | Inhalt |
|---|---|
| `blatt.json` | Mikro-Bausteine (`b:<blatt>:<n>`) |
| `kurs.json`, `foerderfach.json`, `spielschule.json`, `material.json`, `crew.json` | Stundenschritte (`k:`, `f:`, `s:`, `m:`, `c:`) |
| weitere `*.json` (z. B. `fachkraft.json`) | erlaubt; alle Dateien werden nach Namen sortiert gelesen |

`npm run passgenau:beschriftung-import` schreibt die Dateien je Quelle. Neue Inhalte (`inhalte/*.json`, Ids `fb:`, `r:`,
`pa:`) tragen ihre Werte selbst und gehören nicht hierher.

## Format

Ein Objekt `{ "<id>": { … } }`. Je Eintrag **nur die geprüften Felder** (geändert oder bestätigt), dazu Begründung,
Herkunft und Sicherheit:

```json
{
  "k:j2-e16:4": {
    "rolle": ["kern"],
    "eldib": { "primaer": ["SOZ-21"], "sekundaer": ["SOZ-32", "K-21"] },
    "alter": { "von": 12, "bis": 17 },
    "energie": 1,
    "belastung": 1,
    "einzeltauglich": "angepasst",
    "einzelvariante": {
      "text": "Drei Karten liegen auf dem Tisch: grün „okay“, gelb „erst fragen“, rot „Stopp“. …",
      "sagen": ["Hier gibt es kein Gewinnen – mich interessiert, wie du entscheidest."]
    },
    "merkmale": {},
    "sensibel": null,
    "begruendung": "Teams und Lauf entfallen, am Tisch mit drei Karten: Energie 1, kein Wettbewerb.",
    "von": "agent",
    "sicher": 0.85,
    "h": "3f9a01c2"
  }
}
```

### Felder

| Feld | Werte | Regeln |
|---|---|---|
| `rolle` | 1–3 aus `ankommen` `einstieg` `kern` `uebung` `bewegung` `spiel` `regulation` `reflexion` `abschluss` `transfer` | `ankommen` nur bis 12 Min.; mehrtägig nie `kern` |
| `bogen` | `wahrnehmen` `verstehen` `ueben` `uebertragen` `reflektieren` | |
| `eldib` | `{ "primaer": [0–2 Codes], "sekundaer": [0–3 Codes] }` | Codes aus `eldib.json`; zusammen ≤ 4; sekundär nur mit primär; leere Listen = kein Bezug |
| `kompetenz` | 0–2 aus `gefuehle-erkennen` `gefuehle-ausdruecken` `selbstregulation` `impulskontrolle` `aufmerksamkeit` `ausdauer` `kooperation` `konflikte` `kommunikation` `selbstbild` `lernstrategien` `alltag` | sonst aus Blatt bzw. ELDiB-Codes |
| `alter` | `{ "von": 3…18, "bis": von…18 }` | Bausteine: muss sich mit den Stufen des Blatts überschneiden (±1 Jahr) |
| `energie` | `1` ruhig sitzend · `2` aktiv am Platz · `3` Bewegung im Raum | |
| `belastung` | `0` leicht · `1` persönlich · `2` emotional schwer | |
| `einzeltauglich` | `ja` · `angepasst` · `nein` | Bausteine nur `ja`/`nein`; Schritte: `angepasst` ⇔ `einzelvariante` |
| `einzelvariante` | `{ "text": 40–300 Zeichen, "sagen"?: 1–3 Sätze ≤ 160, "fr"?: { text, sagen? } }` | nur Stundenschritte, nur mit `angepasst`; `fr` genau dann, wenn die Quelle Französisch hat |
| `allgemein` | `{ "<pfad>": "Text" }` | nur Bausteine; Pfade wie `texte()` des Pakets (`0.text`, `1.items.2`); höchstens 1,5 × so lang wie das Original |
| `zielgruppe` | `kind` · `fachkraft` · `eltern` | Werkzeuge für Fachkräfte bleiben `fachkraft` |
| `merkmale` | `{ "wettbewerb", "koerperkontakt", "laut", "gewaltbezug", "katharsis": true }` | **vollständige Menge**: was fehlt, ist false; `{}` = keins |
| `sensibel` | `kinderschutz` · `akut` · `familie` · `koerper` · `null` | `null` = ausdrücklich nicht sensibel |
| `mehrtaegig` | `true` · `false` | läuft über Tage (Wochenbeobachtung, Punkteplan, Tracker); `true` verlangt Rolle `transfer` (Bausteine `["uebung", "transfer"]`, Schritte nur `["transfer"]`), nie `kern` |
| `braucht` | Liste von Baustein-Ids, `[]` = keine | nur Bausteine; jede Id muss im Katalog existieren und zum selben Blatt gehören, nicht auf sich selbst zeigen |
| `begruendung` | ≤ 120 Zeichen | Pflicht |
| `von` | `agent` · `fachkraft` | Pflicht |
| `sicher` | 0…1 | Pflicht; gilt für alle Felder des Eintrags |
| `h` | 8 Hex-Zeichen | Prüfsumme des Eintrags zur Zeit der Beschriftung; setzt der Import |

Unbekannte Felder sind ein Fehler. In Texten (Einzelvariante, `allgemein`) nie ELDiB-Codes, Testkürzel oder
Katharsis („Wut rauslassen“, auf Kissen schlagen).

## Regeln beim Anwenden

- **Overlay gewinnt**; `sicher[feld] = sicher` des Overlays für jedes gesetzte Feld.
- **Fachkraft vor Agent:** steht dieselbe Id in mehreren Dateien, gilt `von: "fachkraft"`; bei gleicher Herkunft die
  spätere Datei (und `passgenau:pruefen` meldet die Doppelung). Der Import überschreibt nie eine Fachkraft-Beschriftung.
- **Sicherungen:** Ein Agent senkt nie `merkmale.katharsis` (E-M16) und nie `sensibel` `akut`/`kinderschutz` (T-M1);
  das darf nur eine Fachkraft. Texte zu Suizid/Selbstverletzung bleiben `akut`, Texte zu Übergriffen `kinderschutz`.
- **Ältere Fassung:** Passt `h` nicht mehr zum Eintrag (Inhalt geändert), gelten die Werte weiter, aber höchstens mit
  Sicherheit 0,6 – der Eintrag kommt beim nächsten Export wieder in einen Stapel (`passgenau:pruefen`: Hinweis 24).
- Ungültige Einträge wendet das Katalog-Skript nicht an; `passgenau:pruefen` nennt sie (Regel 24) und prüft, dass
  alle gültigen im Katalog angekommen sind (Regel 25).

Im Katalog stehen die Werte in den gewohnten Feldern (`mehrtaegig` → `mt`, `braucht` → `br`); neu sind `k`
(Kompetenzfelder aus einer Beschriftung), `ev`/`evf` (Einzelvariante DE/FR, Schritte) und `ag` (`allgemein`, Bausteine)
sowie die Sicherheits-Spalten `einzelvariante`, `allgemein`, `zielgruppe`, `merkmale`, `mehrtaegig`
(`src/passgenau/kern/format.ts`).

## Befehle

```sh
# 1. Stapel zu 30 Einträgen mit Kontext für die Beschrifter (Priorität a → b → c, index.json)
npm run passgenau:beschriftung-export -- --ordner=<ordner>
# 2. Beschrifter schreiben <ordner>/ergebnis/<stapel>.json; Selbstkontrolle einer Datei:
npm run passgenau:beschriftung-import -- --pruefen=<ordner>/ergebnis/<stapel>.json
# 3. übernehmen (prüft alles, schreibt hierher, Fehlerliste, Stichprobe 5 % für die Kritik)
npm run passgenau:beschriftung-import -- --ordner=<ordner>
# 4. Katalog neu (Höhen aus dem Cache) und prüfen
npm run passgenau:katalog -- --ohne-hoehen && npm run passgenau:pruefen
```

Prüfung und Anwenden: `src/passgenau/kern/beschriftung.ts`; Lesen in Node: `scripts/passgenau-beschriftung.ts`.
