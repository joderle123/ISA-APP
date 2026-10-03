# CREW im Klassebuch – Anleitung für Galileo (Annexe) und Unified (CDSE-Hub)

Stand: Oktober 2026. Dieses Paket liegt in `crew/integration/`:

| Datei | Was sie ist |
|---|---|
| `crew-hub.js` | Eine Datei, keine Abhängigkeiten, kein Netz. Katalog aller CREW-Spiele, Vorschläge, Themen aus Notizen, QR-Code, Deep-Links. Wird von `node crew/build.js` erzeugt (Quelle: `integration/src/crew-hub.src.js`). |
| `demo.html` | Beispielseite mit erfundenen Daten (Schülerprofil-Karte, Jugend-Ansicht, Gruppenkarte). Einfach im Browser öffnen. |
| `HUB-ANLEITUNG.md` | Diese Anleitung. |

CREW selbst ist `crew/dist/index.html` (eine Datei, offline) bzw. die gehostete Adresse
`https://joderle123.github.io/ISA-APP/crew/dist/index.html` (GitHub Pages, siehe `crew/README.md`).

## 1. CREW als App-Reiter einbinden (wie die Toolbox)

Beide Klassebücher haben bereits App-Reiter (z. B. die ISA-Toolbox). CREW kommt genauso dazu:

- **Reiter „CREW“** → öffnet `dist/index.html` (lokal auf dem O:-Laufwerk/Schul-Server) oder die gehostete URL
  in einem neuen Fenster bzw. in einem `<iframe>`. CREW braucht keinen Login und keine Daten vom Klassebuch.
- Lehrer-iPad/Beamer: der Reiter öffnet den Startbildschirm. Der Lehrermodus liegt unten rechts („Lehrkraft“, PIN).
- Schüler-iPads: nie über das Klassebuch, sondern über QR-Code oder Deep-Link (Abschnitt 3). Die Jugendlichen
  sehen das Klassebuch nicht.

`<iframe>`-Hinweis: CREW setzt keine Frame-Sperre. Erlaubt werden sollte `allow="fullscreen"`. Der Spielstand
(Sticker-Wand, Crew-HQ) liegt im Browser-Speicher des Geräts, das den Reiter öffnet; auf dem Lehrer-iPad also
immer derselbe.

## 2. Karte „CREW-Spiele für diese Woche“ im Schülerprofil

Ziel: Aus den **ELDiB-Wochenzielen** und den **Themen der Notizen** schlägt die Karte **drei Spiele** vor.
Das Personal sieht den Grund, die jugendliche Person sieht nur Spiel und QR-Code.

```html
<script src="crew-hub.js"></script>
<div id="crew-karte"></div>
<script>
  // 1) Themen NUR LOKAL aus den Notizen ziehen (Stichwortlisten de/lb/fr, nichts wird gesendet)
  const tags = CREWHub.themenAusNotizen(notizTextDerWoche);        // → ['wut', 'digital', …]
  // 2) Vorschläge: ELDiB-Codes des Förderplans + Tags → Top 3 mit Grund
  const top3 = CREWHub.suggest({ eldib: ['V-21', 'K-26'], themen: tags, max: 3 });
  // 3) Karte zeichnen – Personal-Ansicht (mit Grund) …
  CREWHub.renderKarte(document.getElementById('crew-karte'), { vorschlaege: top3, modus: 'personal' });
  // … oder Jugend-Ansicht (nur Spiel + QR)
  CREWHub.renderKarte(el, { vorschlaege: top3, modus: 'jugend', titel: 'Deine CREW-Spiele' });
</script>
```

Was `suggest` liefert (pro Spiel): `id, name, thema, themaName, format, formatName, dauer, gebaut, eldib, score,
grund` (ein Satz für das Personal, z. B. „ELDiB V-21 (Warnsignale erkennen) · Thema Wut & Ausraster“), `gruende`
(Liste), `url` (Deep-Link). Bewertet wird: ELDiB-Treffer (stark), Themen-Treffer, Favoriten des Katalogs (leicht).
Nur gebaute Spiele, es sei denn `nurGebaut: false`. Schon gespielte Spiele ausschließen: `ohne: ['frag-weiter']`.

Die Karte kann auch komplett selbst gezeichnet werden (eigenes Design des Klassebuchs); `renderKarte` ist nur ein
Angebot. CSS-Klassen: `.crewhub-karte[data-modus]`, `.crewhub-item`, `.crewhub-qr`, `.crewhub-grund` (nur Personal).

**Themen-Tags** (`CREWHub.themenListe()`): wut, streit, angst, mobbing, ausgrenzung, gruppendruck, digital, schlaf,
stress, selbstwert, trauer, familie, grenzen, freundschaft, regeln, motivation, gefuehle, kommunikation, koerper,
entschuldigung. `trauer` und `familie` tragen `vorsicht: true`: Die vorgeschlagenen Spiele zeigen dann im Spiel den
Hilfe-Hinweis (Kanner-Jugendtelefon 116 111, BEE SECURE 8002 1234), die Lehrkraft entscheidet, ob das Spiel heute passt.

**ELDiB-Codes** (`CREWHub.eldib`): die 28 Codes, die im Spielekatalog vorkommen, mit Kurznamen
(`CREWHub.eldibName('SOZ-32')` → „Regeln und Sicherheit in der Gruppe“). Das Klassebuch übergibt einfach die
Codes der Wochenziele; unbekannte Codes werden ignoriert.

## 3. Gruppenkarte: Ende der Skills-Stunde (Einheit → Spiel)

Jede Einheit des Skills-Kurses Jahr 1 (`j1-e01` … `j1-e30`) hat ein Abschlussspiel mit Varianten-Text.
Die Gruppenkarte zeigt: Einheit, Abschlussspiel, Variante heute, QR-Code.

```js
const heute = CREWHub.suggest({ einheit: 'j1-e04', max: 2 });   // 1. das Katalogspiel, 2. Ersatz
const einheit = CREWHub.katalog.einheiten.find((e) => e.id === 'j1-e04'); // { id, titel, spiel, variante }
CREWHub.renderKarte(el, { vorschlaege: heute, modus: 'personal', titel: 'Abschlussspiel ' + einheit.id });
```

Ist das Katalogspiel einer Einheit noch nicht gebaut (`gebaut: false`), kommt automatisch der beste gebaute Ersatz
aus demselben Thema mit denselben ELDiB-Codes – nie ein toter Link. Gleiche Logik wie im Spiel-Finder von CREW.

## 4. QR-Codes und Deep-Links

```js
CREWHub.spielUrl('frag-weiter')                                  // …/index.html?spiel=frag-weiter&code=4821
CREWHub.spielUrl('funkstille', { rolle: 'B', code: '1234' })      // Rollen-Puzzle: eine Rolle pro iPad (A–D, X = Beobachter:in)
CREWHub.spielUrl('tank-detektiv', { platz: 3, basis: 'https://schule.lu/crew/index.html' })
CREWHub.qrSvg(url, { size: 160 })                                 // SVG-Markup, direkt ins innerHTML
CREWHub.tagescode()                                               // 4-stelliger Tagescode (aus dem Datum, wie in CREW)
```

Der Link enthält nur: Spiel-ID, Tagescode (4 Ziffern aus dem Datum), optional Rolle A–D/X und Platznummer 1–8.
**Nie** Namen, Klassen, Schüler-IDs oder Notizen. CREW ignoriert alle anderen Parameter.
Für QR-Codes muss CREW online stehen (GitHub Pages oder Schul-Server). Ohne Internet: Spiel am Beamer starten.

## 5. Datenschutz – verbindliche Regeln

1. **Notizen bleiben im Klassebuch.** `themenAusNotizen` läuft im Browser und gibt nur Tag-IDs zurück
   (z. B. `['wut', 'digital']`). Der Notiz-Text wird nirgends gespeichert, nicht geloggt, nicht übertragen.
2. **Nur Tags und ELDiB-Codes** gehen in `suggest`. Das Ergebnis enthält Spiel-IDs und Gründe – keine Personendaten.
3. **Keine KI-Dienste.** Die Themen-Erkennung ist eine feste Stichwortliste. Es gibt keinen Aufruf an ein
   Sprachmodell, auch nicht „nur zum Zusammenfassen“. Wer das später will: Schulleitung + Datenschutzbeauftragte
   zuerst, und dann nur mit anonymisierten Tags, nie mit Notizen.
4. **Keine Namen in Links.** Deep-Links enthalten nur Spiel-ID, Tagescode, Rolle, Platz. QR-Codes dürfen
   ausgedruckt werden; sie verraten nichts über die Person.
5. **Der Grund ist Personal-Sache.** Die Jugend-Ansicht (`modus: 'jugend'`) zeigt nie Grund, Tags oder ELDiB-Codes.
   CREW selbst zeigt nie, warum ein Spiel vorgeschlagen wurde, und speichert keine Antworten.
6. **CREW speichert nichts über Personen**: nur Crew-Name, Energie, HQ-Teile, gespielte Spiele (ID + Anzahl) im
   Browser des jeweiligen Geräts. Kein Server, keine Konten.
7. **DPO-Check vor dem Start.** Die Datenschutzbeauftragte des CDSE prüft einmal: Speicherort der Notizen (unverändert),
   Tag-Liste (diese Datei, Abschnitt 2), Deep-Link-Felder (Abschnitt 4). Danach Elterninformation im üblichen Rahmen.
8. **Vorsicht-Themen** (Familie, Trauer): nur mit Hilfe-Hinweis im Spiel; die Lehrkraft kann den Vorschlag ablehnen.
   Spiele über Familie laufen nur mit Figuren (Mika, Yara, Luca, Sam), nie über die Jugendlichen.

## 6. Fertiger Prompt für die Klassebuch-Sitzung (zum Kopieren)

```
Ich möchte mein Spiel CREW in beide Klassebücher einbinden: „Galileo“ (Annexe Junglinster) und „Unified“ (CDSE-Hub).
Bitte nichts Bestehendes kaputt machen, den vorhandenen Stil der App übernehmen und vor größeren Umbauten kurz nachfragen.

QUELLE (öffentliches Repo, nur Spiele, keine Schülerdaten):
- Repo: github.com/joderle123/ISA-APP, Branch: claude/youth-game-socio-emotional-ntxd04
- crew/integration/crew-hub.js   → die Schnittstelle (window.CREWHub), ohne Abhängigkeiten
- crew/integration/HUB-ANLEITUNG.md → Details und Datenschutz-Regeln (bitte zuerst lesen)
- crew/integration/demo.html     → Beispiel, wie die Karten aussehen sollen (nur Beispieldaten)
- crew/dist/index.html           → das Spiel selbst (eine Datei, läuft offline)
Hol die Dateien per git (Repo zur Sitzung hinzufügen oder klonen) oder über
https://raw.githubusercontent.com/joderle123/ISA-APP/claude/youth-game-socio-emotional-ntxd04/crew/integration/crew-hub.js
und lege sie im Klassebuch unter apps/crew/ ab (crew-hub.js und index.html).

AUFGABEN:
1. App-Reiter „CREW“ neben der Toolbox: öffnet apps/crew/index.html (lokal) oder die in den Einstellungen hinterlegte
   CREW-Adresse (Standard https://joderle123.github.io/ISA-APP/crew/dist/index.html) in einem neuen Fenster.
2. Im Schülerprofil eine Karte „CREW-Spiele für diese Woche“:
   - tags = CREWHub.themenAusNotizen(<Réunion- und Wochen-Notizen dieser Person>) – läuft lokal, der Text verlässt die Seite nie
   - top3 = CREWHub.suggest({ eldib: <ELDiB-Codes der aktuellen Ziele/Wochenziele>, themen: tags, max: 3,
            ohne: <IDs der in den letzten 14 Tagen vorgeschlagenen Spiele> })
   - Ansicht fürs Personal: Spielname, Format, Dauer, Grund (top3[i].grund), QR-Code (CREWHub.qrSvg(top3[i].url)).
   - Falls es eine Schüler-Ansicht oder einen Ausdruck für Jugendliche gibt: nur Spielname + QR-Code.
     Kein Grund, keine Tags, keine ELDiB-Codes.
   - Tags mit vorsicht:true (z. B. familie, trauer) als gelben Hinweis nur fürs Personal markieren.
3. Gruppenkarte am Ende der Skills-Stunde (Kursplan Jahr 1, Einheiten j1-e01 … j1-e30):
   - heute = CREWHub.suggest({ einheit: <Einheit laut Stundenplan/Kursplan>, max: 2 }); die Variante aus
     CREWHub.katalog.einheiten anzeigen; QR-Code groß für den Beamer; bei Rollen-Puzzles (format 'rollen')
     vier QR-Codes mit rolle A–D (CREWHub.spielUrl(id, {rolle, code})).
4. Datenschutz (nicht verhandelbar): Notizen bleiben im Klassebuch; an CREWHub gehen nur Tag-IDs und ELDiB-Codes;
   keine Aufrufe an KI-Dienste mit Notizen oder Schülerdaten; keine Namen oder Schüler-IDs in CREW-Links;
   der Grund ist nur für das Personal sichtbar. Vor dem Einsatz mit Jugendlichen der Datenschutzbeauftragten vorlegen.
5. Tests: crew-hub.js lädt ohne Fehler; suggest liefert für jede Einheit j1-e01 … j1-e30 mindestens ein gebautes Spiel;
   themenAusNotizen('') ist leer; die Schüler-Ansicht enthält weder 'grund' noch Tags noch ELDiB-Codes im DOM;
   bestehende Tests des Klassebuchs bleiben grün.
Danach kurz berichten, was eingebaut ist und wo ich es finde.
```

## 7. Pflege

- Neue Spiele oder Katalog-Änderungen: `node crew/build.js` erzeugt `crew-hub.js` neu (gebaute Spiele werden aus
  `src/games/**` erkannt). Die Datei dann ins Klassebuch kopieren; die API bleibt gleich.
- Eigene Stichwörter für die Themen-Erkennung: `integration/src/crew-hub.src.js`, Liste `THEMEN`. Lëtzebuergesch
  und Französisch sind mit den häufigsten Formen dabei; Ergänzungen bitte dort, nicht in der generierten Datei.
- Versions-Stand: `CREWHub.version` (Katalog-Stand) und `CREWHub.katalog.gebaut` (Anzahl gebauter Spiele).
