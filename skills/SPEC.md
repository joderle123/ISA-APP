# SKILL DECK – Das Spiel zum Skills-Kurs (Spiel 3)

Arbeitstitel. Die Jugendlichen dürfen umbenennen.

## Idee in einem Satz
Ein **Sammelkarten- und Kampfspiel**, das **genau zum Skills-Kurs** der Annexe passt (3 Kursjahre,
117 Einheiten). Jede Einheit, die im Kurs stattfindet, schaltet im Spiel **ihren Skill als Karte**, **eine
passende Mission** und **den Stempel im digitalen Skills-Pass** frei. Mit ihren Karten packen die
Jugendlichen ihren **Skills-Koffer** und bekämpfen **Anspannungs-Monster** auf der **Anspannungsskala
0–100**. Dabei gilt die Ampel aus dem Kurs: Bei **Rot (70–100)** helfen nur Körper-, Atem- und
Sinnes-Skills, Kopf-Skills kommen dort nicht an.

Es soll sich wie ein echtes Spiel anfühlen, etwa wie Pokémon-Karten oder Clash Royale, und nicht wie ein
Arbeitsblatt.

## Bezug zum Kurs (Quelle: Toolbox im Hub, `apps/toolbox.html`)
- **Anspannungsskala 0–100:** grün 0–30, gelb 30–70, rot 70–100. Bei Rot kein Reden und keine Kopf-Skills,
  sondern Körper, Atem und Sinne (Handmodell).
- **Skills-Koffer** mit fünf Fächern, dazu **Ampelplan** (grün/gelb/rot: Warnsignale, Skills,
  erreichbare erwachsene Person) und **Notfallkarte**.
- **Skills-Pass** mit Stempel nach jeder Einheit, Sonderstempel wie „Skills-Profi“ am Modulende.
- **Check-in** mit Gefühlsrad und Zahl 0–100 in jeder Einheit.
- Jede Einheit hat einen Phasen-Ablauf (ankommen, brücke, input, übung/aktiv, skill, abschluss) und
  **genau einen Skill-Schritt**. Das ist die Karte der Einheit.

## Spielmodi
1. **Kurs-Modus (Beamer, Lehrkraft):** Jahr und Einheit wählen. Dann:
   - „Neuer Skill“ als **Karten-Pack-Öffnung** mit Animation
   - die **Mission der Einheit** gemeinsam spielen (3–6 Min.)
   - am Ende den **Freischalt-Code** groß anzeigen
2. **Mein Koffer (eigenes iPad, alleine):**
   - Profil wählen (bis 8 pro iPad, Avatar-Emblem, optionales Symbol-Schloss, keine Namen)
   - **Code eingeben**: Karte, Stempel und Mission werden freigeschaltet
   - Koffer packen, Ampelplan bauen, **Anspannungs-Kämpfe**, **Skill üben**
   - Skills-Pass und Sammlung ansehen

## Anspannungs-Kampf (Kern-Mechanik)
- Eine **Situation** (passend zu den Modulen, z. B. „Mathe-Test gleich“, „Streit im Gruppenchat“,
  „Tilt beim Gaming“) startet bei einer Anspannung von z. B. 65. In **Wellen** kommen Auslöser, die sie erhöhen.
- Der **Monster-Avatar** zeigt die Anspannung: Er wächst, wird rot und glüht bei hoher Spannung und wird
  klein, blau und fast niedlich bei niedriger.
- Man hat 4 Karten aus dem eigenen Koffer auf der Hand. **Karte ausspielen** löst eine **kurze
  Interaktion** aus (5–15 Sekunden). Das echte Mini-Üben ist der Kern: mit dem Kreis atmen,
  5-4-3-2-1 antippen, anspannen und loslassen, Gedanken aufs Schiffchen ziehen und so weiter.
- **Wirkung = Kartenkraft × Zonen-Faktor:**
  - Körper, Atem, Sinne: rot 1.0 / gelb 0.8 / grün 0.5
  - Kopf: rot 0.15 („Bei Rot kommt der Kopf nicht an – erst runter!“) / gelb 0.8 / grün 1.0
  - Menschen & Handeln: wirkt nur bei grün, und zwar als **Abschluss** (die Situation lösen)
- **Sieg:** Anspannung unter 30, dann eine „Handeln“-Karte oder eine Wahl („Was machst du jetzt?“).
  Es gibt keine Niederlage im harten Sinn. Wird es zu viel, kommt die Option „Pause-Karte“ oder „Hilfe
  holen“, und man darf neu starten.
- Nach dem Kampf folgt ein **Ampel-Rückblick**: welche Karte in welcher Zone gewirkt hat.
- **XP:** Karten steigen durch Benutzen und Üben im Level (Stufe 1–3, mit schönerem Rahmen). Siege geben
  Sterne. Keine Rangliste.

## Missionen (Vorlagen, gefüllt pro Einheit)
| typ | Was passiert |
|---|---|
| `zonen-sortieren` | Situationen oder Skills in grün/gelb/rot sortieren |
| `mythos-fakt` | Karten nach links/rechts wischen: Mythos oder Fakt, mit Erklärung |
| `szene` | Kurze Szene mit 2–3 Entscheidungen und Folgen (kein „falsch“, sondern Folgen und Zurückspulen) |
| `satz-bauen` | Aus Bausteinen einen Satz bauen (Ich-Botschaft, Nein-Satz, freundliche Stimme …) |
| `paare` | Paare finden (Gefühl ↔ Körpersignal, Glaubenssatz ↔ hilfreicher Gedanke …) |
| `detektiv` | Einen Gedanken prüfen: Beweise dafür/dagegen sammeln, dann ein faires Urteil |
| `reihenfolge` | Schritte in die richtige Reihenfolge bringen (Konflikt-Schritte, Stopp-Ampel …) |
| `schaetzen` | Auf einem Regler schätzen (Anspannung, Fakten in %), dann Auflösung |

## Daten-Schnittstelle (alle Inhalte als Daten, keine Logik)
Dateien `src/content/kurs-j1.js`, `kurs-j2.js`, `kurs-j3.js` rufen die Registry auf (`src/core/registry.js`):

```js
SK.addSkills([{
  id: 'atem-478',                  // eindeutig, klein, mit Bindestrichen
  name: 'Atem 4-7-8',              // Kartenname, kurz
  typ: 'atem',                     // koerper | atem | sinne | kopf | menschen   (= die 5 Koffer-Fächer)
  zonen: ['gelb', 'rot'],          // wo er hilft (rot nur bei koerper/atem/sinne!)
  kraft: 2,                        // 1–3: wie stark er die Anspannung senkt
  interaktion: 'atmen',            // atmen | sinne-tippen | bodyscan | anspannen-loslassen | gedanken-boot |
                                   // kaelte | zaehlen | satz | bewegen | halten | wegwischen | anker | genuss
  params: { ein: 4, halten: 7, aus: 8, runden: 2 },   // je nach Interaktion (siehe unten)
  schritte: ['4 Sekunden einatmen.', '7 Sekunden halten.', '8 Sekunden ausatmen.'],   // max. 3 kurze Sätze
  wann: 'Wenn du nervös bist und runterkommen willst.',  // 1 Satz
  flavor: 'Langsamer als dein Puls. Stärker als dein Stress.', // cooler Kartentext, 1 Satz
  einheit: 'j1-e04',               // wo er im Kurs vorkommt (erste Einheit)
  seltenheit: 'basis',             // basis | selten | episch | legendaer
}]);

SK.addUnits([{
  id: 'j1-e11', jahr: 1, nr: 11, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
  titel: 'Skills und die Anspannungsskala', joker: false,
  code: 'WELLE',                   // 4–6 Großbuchstaben A–Z ohne Umlaute, im ganzen Kurs eindeutig, jugendgerecht
  skills: ['spaziergang-ohne-worte'],
  stempel: null,                   // oder z. B. 'Skills-Profi' bei Modulabschluss
  heikel: false,                   // true bei sehr sensiblen Einheiten (Lehrkraft kann Missionen dazu ausblenden)
  mission: {
    typ: 'zonen-sortieren',
    titel: 'Wo stehst du?',
    intro: 'Sortiere die Situationen: grün, gelb oder rot?',   // max. 2 kurze Sätze
    daten: { /* je nach typ, siehe unten */ },
    abschluss: 'Jede:r hat eine eigene Skala. Wichtig ist: Du kennst deine.',  // 1–2 Sätze
  },
}]);

SK.addSituations([{
  id: 'mathe-test', modul: 'j2-m2', titel: 'Mathe-Test gleich',
  text: 'In 10 Minuten beginnt der Test. Du hast die Hälfte nicht gelernt.',
  start: 62,
  wellen: [ { text: 'Jemand flüstert: „Easy, oder?“', plus: 8 }, { text: 'Die Lehrerin teilt aus.', plus: 12 } ],
  handeln: [ { text: 'Ich lese zuerst die Aufgabe, die ich kann.', gut: true }, { text: 'Ich gebe leer ab.', gut: false, folge: 'Kurz erleichtert – später ärgerlich.' } ],
  heikel: false,
}]);
```

### Missions-Daten je typ
- `zonen-sortieren`: `{ items: [{ text, zone: 'gruen'|'gelb'|'rot', warum }] }` (6–8 Items)
- `mythos-fakt`: `{ karten: [{ text, fakt: true|false, erklaerung }] }` (6–8)
- `szene`: `{ start: 'id', knoten: { id: { text, wahl: [{ text, weiter: 'id'|null, folge, punkte: 0-2 }] } } }` (2–3 Entscheidungen)
- `satz-bauen`: `{ aufgaben: [{ situation, bausteine: [...], loesungen: [[...]] , tipp }] }` (2–3)
- `paare`: `{ paare: [[links, rechts], ...] }` (5–6)
- `detektiv`: `{ gedanke, situation, beweise: [{ text, spricht: 'dafuer'|'dagegen' }], fairerGedanke }`
- `reihenfolge`: `{ schritte: ['…', '…'] }` (4–6, in richtiger Reihenfolge angegeben)
- `schaetzen`: `{ fragen: [{ text, min, max, richtig, einheit, erklaerung }] }` (3–4)

### Interaktions-Parameter
- `atmen`: `{ ein, halten, aus, halten2?, runden }` in Sekunden
- `sinne-tippen`: `{ schritte: [{ anzahl: 5, sinn: 'sehen' }, …] }` (Standard 5-4-3-2-1)
- `bodyscan`: `{ stellen: ['Füße', 'Beine', 'Bauch', 'Schultern', 'Kiefer'] }`
- `anspannen-loslassen`: `{ teile: ['Hände', 'Schultern'], halten: 5 }`
- `gedanken-boot`: `{ gedanken: ['Ich schaff das nie.', …] }`
- `kaelte` / `genuss` / `bewegen`: `{ text }` (kurze Anleitung plus Timer), zum Beispiel kaltes Wasser, Zitrone, Dehnen
- `zaehlen`: `{ bis: 10 }` (Atemzüge zählen)
- `satz`: `{ saetze: ['Ich bin okay, auch wenn es gerade schwer ist.'] }` (freundliche Stimme, Anker-Satz)
- `halten`: `{ sekunden: 10, text }` (Stopp, Teilen-Bremse, Tilt-Bremse: Finger halten und nicht loslassen)
- `wegwischen`: `{ dinge: ['Benachrichtigung', …] }` (Aufmerksamkeit zurückholen)
- `anker`: `{ text }` (fester Stand, Füße spüren, Hand aufs Herz)

## Schreibregeln (Inhalte)
- Deutsch, du-Form, kurze Sätze (höchstens 15 Wörter), Niveau A2–B1, jugendgerecht. Kein Moralisieren,
  kein Kinderton. Humor ist erlaubt.
- Skill-Namen und Anleitungen treu zum Kurs (Quelle: Skill-Schritt der Einheit), aber als kurze Spielkarte formuliert.
- Figuren sind fiktiv, mit diversen Namen, wie man sie in Luxemburg findet. Die Namen Alex, Ben, Chase und
  Jason sind **nie** erlaubt.
- Sensible Einheiten (Sexualität, Nudes/Sexting, Trauer, Sicherheitsplan, Familie, Rausch) werden behutsam,
  sachlich und ohne Details behandelt: `heikel: true`. Keine persönlichen Offenbarungen abfragen. Bei Krisen
  immer auf Hilfe verweisen: Vertrauensperson in der Schule, Kanner- a Jugendtelefon 116 111, Notruf 112.
- Nichts speichert Namen oder persönliche Antworten. Fortschritt bleibt nur im Profil auf dem Gerät.

## Technik
- Eine HTML-Datei (`skills/dist/index.html`), gebaut mit `node skills/build.js`. Reines JavaScript
  (keine Module, keine Bibliotheken). Grundlage ist der CREW-Kern (`crew/src/core`), angepasst auf den
  Namensraum `window.SK`.
- Speicher: `localStorage` mit dem Präfix `skills_v1_`, pro Profil.
- Tests: Playwright wie bei CREW (`skills/tests`).
- Prüfung der Inhalte: `node skills/tools/validate-content.cjs`
