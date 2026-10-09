# Passgenau – Protokoll Toolbox ↔ Hub (verbindlich)

Stand 2026-10-09 · `proto` 1 · `planV` 1 · `profilV` 1. Gilt für `src/passgenau/ui/hub.ts` (Toolbox) und
`hub-quellen/passgenau.js` (Hub, Repo Klassebuch). Typen: `src/passgenau/typen.ts`. Konzept 3.4, 6.9, 9.2–9.4.
Änderungen nur abwärtsverträglich (neue Felder optional); wer etwas Unverträgliches ändert, erhöht `proto`.

## 1. Transport

- Start der Toolbox: `toolbox.html#passgenau=<ref>[&weg=gruendlich|schnell|leicht][&ziel=<ELDiB-Code>]`.
  `ref`: 16 Zeichen `[0-9a-z]`, zufällig, gilt 60 Minuten für genau ein Kind und genau das Konto, das geöffnet hat.
  Die Dossier-Kennung erfährt die Toolbox nie.
- Frage (Toolbox → Hub): `{ cdsePassgenau: 1, n, op, arg }` – `n` laufende Nummer der Toolbox.
- Antwort (Hub → Toolbox): `{ cdsePassgenau: 1, antwort: true, n, ok: true, erg }` oder
  `{ cdsePassgenau: 1, antwort: true, n, ok: false, grund, text?, treffer? }`.
  - `grund` (Kurzcode): `fehlt` (Passgenau fehlt im Hub) · `aus` (Schalter) · `abgemeldet` · `gesperrt` · `kein-bereich` ·
    `ref` (abgelaufen/unbekannt) · `kein-zugriff` · `recht` · `ungueltig` · `konflikt` (Plan woanders geändert) ·
    `sperrliste` · `bestaetigung` · `angebot` · `checkliste` · `unbekannt` · `pruefsumme` · `fehler`.
  - `text`: Satz für die Anzeige (die Toolbox zeigt ihn, sonst einen eigenen Text zum `grund`).
- Ziel: der Rahmen (`window.parent`) oder – Annexe unter `file://` im eigenen Tab – `window.opener`. Der Hub antwortet nur
  dem Rahmen, den er selbst eingebettet hat (`src` = Toolbox-Datei), oder dem Tab, den er geöffnet hat (`window.open`-Griff);
  unter http nur vom selben Ursprung. Die Toolbox nimmt Antworten nur vom Hub-Fenster an.
- Zeitlimit: `hallo` 1,5 s (ohne Antwort: „Ohne Kind planen“), sonst 8 s (`grund` in der Toolbox: Zeitlimit).

## 2. Ops

### `hallo`
- arg: `{ toolbox: { build, proto, planV, profilV } }`
- erg:
  ```
  { version, schema,                                   // Hub-Build, Protokoll (Kurzform)
    hub: { build, proto, planV, profilV },
    rechte: { planen, speichern, rueckmelden, kuratieren },   // speichern/rueckmelden false, wenn die Toolbox neuer ist
    praxis: boolean,                                   // „Aus der Praxis“ verfügbar (Ordner da und Schalter teilen)
    schalter: { an, lernen, teilen, freigabe, loeschenNachMonaten },   // window.CDSE_PASSGENAU (E-M11)
    ich: { name, team, funktion },                     // Vorname der angemeldeten Person, Team, Funktion
    chips: [{ key, text }],                            // Beobachtungs-Chips „Stunde gehalten“ (Schlüssel verbindlich)
    interessen: [{ key, text }],                       // 40 feste Interessen
    hilft: ['stundenleiste','bewegungspausen','reizarm','bildplan'],
    hinweis?: 'hub-aelter' }
  ```
- Versionsabgleich: gleiches `proto` → normal; Hub älter → Planen ja, Speichern aus (Hinweis); Toolbox älter → Hinweis.

### `profil`
- arg: `{ ref }`
- erg: **Profil** (Typ `Profil`, Konzept 3.4 – nur die dort genannten Felder, Schema-Prüfung im Hub vor dem Senden) und dazu
  drei Zusätze außerhalb des Profils:
  ```
  { ...Profil,
    kind: { korrekturen, interessen: string[] | null, vorname: boolean, lernen: boolean },  // gespeicherte Angaben (d.passgenau.kind)
    verlauf: { plaene: Plan[] },        // gespeicherte Pläne dieses Kindes, neueste zuerst, höchstens 12 (ohne zusammengefasste),
                                        // dazu gedruckte Pläne aus dem persönlichen Tresor der Person (ohne Schreibrecht)
    team: VorliebenTeam | null }        // Team-Zähler ohne Kinder (erst ab 3 Personen und 10 Rückmeldungen je Schlüssel)
  ```
- Der Hub wendet die gespeicherten Korrekturen schon an (Zugang, Sprache, Wörter, Stufe, Vorsicht, „Was hilft“, Interessen,
  „darf wieder“, Reihenfolge der Ziele). **Ausnahme:** abgewählte Ziele und Themen (`korrekturen.ziele.aus`,
  `korrekturen.themen.aus`) bleiben im Profil, damit die Toolbox sie wieder einschalten kann; die Toolbox wendet die Abwahl
  vor dem Planen an.
- Nie im Profil: Nachname, Geburtsdatum, Matricule, Schule, Klasse im Klartext, Testwerte, Diagnosen, Medikation,
  Familienangaben, Notiztexte, Dossier-Kennung, Themenschlüssel heikler Themen (nur `achtung: ['krise'|'kinderschutz']`).

#### `kind.korrekturen` (gespeichert in `d.passgenau.kind.korrekturen`, je Schlüssel `{ wert, am }`)
| Schlüssel | `wert` | Wirkung |
|---|---|---|
| `lesen` · `schreiben` | 0–3 | Zugang (bis eine neuere Quelle kommt) |
| `bild` | 1–3 | Zugang |
| `tempo` | `ruhig` · `normal` | Zugang |
| `struktur` | `normal` · `hoch` | Zugang |
| `zugangBestaetigt` | `true` | Testwerte wirken (gleiche Test- und Erstsprache, P4) |
| `stufe` | `C1`…`ES` (absolut; alt: −1/0/+1) | Stufen und Gestaltung (Jugendliche nie kindlich) |
| `sprache` | `de` · `fr` | Sprache des Blatts |
| `woerter` | `('lb'\|'pt')[]` | Wörterstreifen (leer = aus) |
| `hilft` | Liste aus `hallo.hilft` | „Was dem Kind hilft“ |
| `vorsicht` | `{ an: [...], aus: [...] }` | `reiz`/`trauma` nur hier; `heikel` nie abwählbar |
| `ziele` | `{ aus: [Code], reihenfolge: [Code] }` | Abwahl (Toolbox), Reihenfolge (Hub) |
| `themen` | `{ aus: [Schlüssel] }` | Abwahl (Toolbox) |
| `darfWieder` | `['blatt:<id>' \| Ref]` | „schon gemacht“ darf wieder vorkommen |

### `speichern` (Schreibrecht; gedruckt = gespeichert, P7)
- arg: `{ ref, plan, gedruckt?: boolean, ereignisse?: Ereignis[], vorlieben?: VorliebenKind | null }`
- erg: `{ planId, rev, ort: 'dossier' }` oder ohne Schreibrecht, aber mit Rückmelderecht und `gedruckt`:
  `{ planId, ort: 'tresor', hinweis }` (persönlicher Tresor der Person). Sonst `grund: 'recht'`.
- Eine Änderung des Dossiers (Stapel): Plan, Ereignisse und Kind-Vorlieben zusammen (T-M9).
- Gleichzeitig geändert: `plan.rev` kleiner als der gespeicherte → `grund: 'konflikt'`. Rückmeldungen gespeicherter Sitzungen
  bleiben erhalten, auch wenn die Toolbox einen älteren Stand der Sitzung schickt.

### `rueckmeldung` („Stunde gehalten“; Rückmeldung und Haken mit Leserecht, Notiz nur mit Schreibrecht)
- arg (eine Stunde):
  ```
  { ref, planId, sitzung, ergebnis, ziele?: [{ code, richtung }], chips?: [key], kind?: { wahl?: Ref, daumen?: 'hoch'|'runter' },
    ereignisse?: Ereignis[], plan?: Plan, vorlieben?: VorliebenKind | null, am?: 'JJJJ-MM-TT' }
  ```
  - `ergebnis`: `geklappt` · `teils` · `nicht` · Krisentage/Weg 3: `beruhigt` · `dabei` · `nur-da` · `abgebrochen` (nie negativ, P10).
  - `chips`: Schlüssel aus `hallo.chips`. `kind.wahl`: Ref des gewählten Schritts (Weg 3, auch `pg:da-sein`).
  - `plan`: der aktuelle Plan (P7: „Stunde gehalten“ speichert den Plan mit) – mit Schreibrecht ins Dossier (im selben Stapel,
    ohne eigene Protokollzeile), sonst nur zum Lesen. `vorlieben` ebenso nur mit Schreibrecht.
  - Nichts ist vorbelegt (P6/E-M1): was nicht geklickt wurde, fehlt.
- arg (Stapel, optional): `{ ref, liste: [ …wie oben ohne ref… ], ereignisse?: Ereignis[] }` → erg `{ liste: [erg …] }`.
- erg: `{ notizId: string | null, planId, rev?, hinweis?: 'ohne-notiz' }` (`rev`: Änderungszähler des gespeicherten Plans –
  die Toolbox übernimmt ihn, sonst hielte der Hub den nächsten Stand für veraltet).
- Der **Hub** schreibt die Notiz (`d.eintraege`, Art „Beobachtung“ nur mit Ziel-Richtung oder Chip, sonst „Notiz“), setzt die
  Haken `d.material.gemacht['blatt:<id>']` für jede Quelle `b:<id>:<n>` und schreibt eine Protokollzeile ohne Texte.
  Die Toolbox zeigt dieselbe Notiz vorab (`notizText` im Kern = `notizText` im Hub, gleicher Aufbau):
  `Passgenau[ <nr>/<n>] (<dauer> Min.)[ – Beziehungszeit]: <Schritt-Titel ohne Rituale und Pausen>[, Blatt „<Titel>“]. <Ergebnis>.`
  `[ <Code> <Stichwort>: <Richtung>.]…[ <Chip-Texte>.][ Hat gewählt: <Titel>.][ Daumen am Schluss: hoch|runter.]`

### `vorlieben` (Angaben und Vorlieben des Kindes; Schreibrecht – nur Ereignisse: Rückmelderecht)
- arg: `{ ref, aenderungen }` mit (alles optional, nur Geändertes):
  ```
  { korrekturen: { <Schlüssel>: wert | null },   // null löscht die Korrektur
    interessen: string[] | null, vorname: boolean, lernen: boolean, rituale: { ankommen?: Ref, abschluss?: Ref },
    vorlieben: VorliebenKind | null,             // Zwischenspeicher (6.9)
    zuruecksetzen: true | '<schluessel>',        // alles (Protokollzeile) oder ein Merkmal
    ereignisse: Ereignis[] }                     // gebündelt (T-M9)
  ```
- erg: `{ ok: true }`. `lernen: false` löscht Ereignisse und Kind-Vorlieben (E-M12).

### „Aus der Praxis“ (8)
| op | arg | erg |
|---|---|---|
| `praxis-liste` | `{ filter?: { ziel?, nurFreigegeben?, status? } }` | `{ vorlagen: PraxisVorlage[], zurueckgezogen: [id] }` |
| `praxis-pruefen` | `{ ref, entwurf }` | `{ treffer: [{ pfad, von, bis, art }] }` |
| `praxis-teilen` | `{ entwurf, ref?, planId? }` | `{ id, version, status }` |
| `praxis-signal` | `{ id, art, grund? }` | `{ ok, status? }` |
| `praxis-kuratieren` | `{ id, aktion, checkliste?, grund?, version? }` | `{ status }` (Export: `{ datei, inhalt }`) |

- `PraxisVorlage` im Hub zusätzlich (optional): `eigen`, `belastung`, `sensibel`, `geprueft`, `vorher` (zuletzt geprüfte
  Version für den Vergleich), `meldungen`, `darfFreigeben`, `importiert`. `zurueckgezogen`: Ids, deren Texte in Plänen auf
  das Original zurückgehen (E-M9; die Toolbox wendet `vorlageZurueckgezogen` auf den offenen Plan an, der Hub auf das Dossier).
- `entwurf` = Ergebnis von `fuerTeam(plan, profil).vorlage` (Whitelist `VorlagenInhalt`, E-M5) plus
  `bestaetigt: [pfad]` (Häkchen „Kein Kind erkennbar“ je eigenem Text, E-M6), `anonym: boolean`, `belastung: 0|1|2`,
  `sensibel: boolean`, `eigenerTausch?: boolean`, `id?` (neue Version einer eigenen Vorlage).
  Teilen nur bei einer Folge mit ≥ 3 gehaltenen Sitzungen oder einer Stunde mit eigenem Tausch (E-M8, `grund: 'angebot'`).
  Sperrliste (Namen aller Kinder und Personen des Hubs, Wörter des Dossiers, Daten) → immer Ablehnung (`grund: 'sperrliste'`, `treffer`).
- **Pfade** eigener Texte (Häkchen, Treffer) relativ zur Vorlage: `titel` · `fuerWen` ·
  `inhalt.sitzungen.<i>.schritte.<j>.ueber.<textpfad>` · `inhalt.sitzungen.<i>.blatt.titel` ·
  `inhalt.sitzungen.<i>.blatt.bausteine.<j>.ueber.<textpfad>`; `<textpfad>` = Pfad im Baustein-Paket (`<Index>.<Feld>…`,
  wie `MikroBaustein.textfelder`).
- `praxis-signal.art`: `genutzt` · `hoch` · `runter` · `geklappt` · `teils` · `nicht` · `melden` (mit `grund`:
  `datenschutz` – sofort ausgeblendet, mit Rückruf – · `fachlich` · `unpassend`).
- `praxis-kuratieren.aktion`: `freigeben` · `einblenden` (beide mit `checkliste: { datenschutz, alter, faden, wirksamkeit }`,
  alle `true`; Belastung 2 oder heikle Bausteine nur Psychologin oder Responsable) · `ablehnen` · `ausblenden` ·
  `zurueckziehen` (Urheberin) · `export`. Status `offiziell` ist vorgesehen, wird aber noch nicht vergeben.

## 3. Gespeicherter Plan (`d.passgenau.plaene[]`, Typ `Plan`, Konzept 9.3)

Der Hub nimmt nur bekannte Felder an (alles andere fällt weg):
- Plan: `id` (`pl-…`), `erstellt`, `von` (Hub setzt das Konto), `weg`, `gewichte`, `titel`, `ziele`, `n`, `dauer`, `vorlage`
  (`pv-…@v`), `kinder`, `auftrag`, `sitzungen`, `gedruckt`, `rev` (Hub zählt), `variante`, `katalogStand`.
- Sitzung: `nr`, `phase`, `status`, `datum`, `schritte`, `blatt`, `hinweise`, `rueckmeldung`, `gedruckt`, `rev`.
- Schritt: `ref`, `h`, `rolle`, `min`, `t` (Titel ≤ 60), `warum` (fertige Sätze des Kerns, je ≤ 200), `erkundung`,
  `gesperrt`, `ueber`, `ueberHerkunft`, `hinweis`, `gelockert`, `wahl` (`[{ ref, h, min, t }]`), `wahlkarte`.
- Blatt: `titel`, `ziel` („Mein Ziel“ aufs Blatt), `bausteine: [{ ref, h, t, ueber, ueberHerkunft, ausgeblendet, gesperrt }]`.

Konventionen:
- Refs: Blatt-Baustein `b:<blatt-id>:<n>`, Kurs `k:…`, Förderfach `f:…`, Material `m:…`, Spielschule `s:…`, CREW `c:…`,
  Freude & Beziehung `fb:…`, Ritual `r:…`, eigene Schritte des Kerns `pg:…` – der Platz des Blatts in der Stunde ist
  `pg:blatt`, „einfach da sein“ `pg:da-sein`, Bewegungspause `pg:pause`.
- `warum`: fertige Sätze (keine Schlüssel). Gelockerte Teile (T-M3) tragen `gelockert: true` und den Grund in `hinweis`.
- Haken „gemacht“: `blatt:<blatt-id>` (Hub, aus den `b:`-Refs der gehaltenen Sitzung). `Profil.gemacht` enthält
  `blatt:<id>`, `material:<id>`, `crew:<id>` und Refs gehaltener Passgenau-Schritte.

## 4. Ereignisse (`d.passgenau.ereignisse[]`, Typ `Ereignis`, Konzept 6.9)

- `id`: `ev-<ULID>` (die Toolbox vergibt sie; der Hub ergänzt fehlende, verwirft doppelte). `kind` und `fachkraft` sind
  im Dossier **immer** `null` (E-M10); hub-weit schreibt der Hub nur Zähler ohne Kind (je Quartal, `gemeinsam/passgenau-signale`).
- Krisentag (Weg 3, Stimmung ≤ 2, Ergebnis `beruhigt`/`dabei`/`nur-da`/`abgebrochen`): `krisentag: true`, `wert` nie negativ.
- „Passgenau lernt bei diesem Kind nicht“ (`Profil.lernen === false`) oder Schalter `lernen: false`: keine Ereignisse, keine
  Kind-Vorlieben (Toolbox schickt keine, Hub nimmt keine an).
