# Förderfach „Skills fir d’Liewen“ – Leitfaden für die Einheiten

Dieser Leitfaden gilt für alle ausgearbeiteten Einheiten des Förderfachs (7e, 6e, 5e) und ihre
Schülerblätter. Er ergänzt `src/foerderfach/README.md`, `src/kurs/KURS-STIL.md` (Skills-Kurs der
Annexe, auf dem das Fach beruht) und `src/blatt/BLATT-STIL.md` (Bausteine der Blätter).

**Muster:** Einheit `ff7-e01` in `src/data/foerderfach/einheiten-7e.json` und die Blätter in
`src/data/foerderfach/blaetter.json`. Jede neue Einheit hat mindestens diese Tiefe.

**Qualitätsmaßstab:** wie ein gutes Lehrerhandbuch aus einem Fachverlag (Lions Quest „Erwachsen
werden“, Beltz, Verlag an der Ruhr). Eine Lehrkraft ohne psychologische Ausbildung schlägt die
Einheit auf, liest sie in 20 Minuten und kann sie halten: Sie weiß, was sie vorbereitet, was sie
sagt, wie lange etwas dauert, in welcher Sozialform gearbeitet wird und was sie tut, wenn es kippt.
Niemand soll beim Lesen denken: „Das hat eine KI geschrieben.“

---

## 0. Auftrag für eine Ausarbeitung

1. Im Jahresplan (`src/data/foerderfach/plan-<klasse>.json`) die eigene Einheit lesen – Titel,
   Kurztext, Kompetenzen, `hinweis`, `wahl`, `neu`, `basis` – und die Einheiten davor und danach
   (für Brücke und Ausblick).
2. Die Basis-Einheit des Skills-Kurses lesen (`basis`, z. B. `j1-e04`; zu finden mit
   `grep -l '"id": "j1-e04"' src/data/kurs/*.json`) und ihre Blätter (`src/data/blaetter/skills*.json`,
   nur Deutsch). Die Einheit wird **angepasst, nicht kopiert** (siehe 1.3). Einheiten mit `neu`
   haben keine Basis und werden neu geschrieben.
3. Die Einheit auf Deutsch und Französisch schreiben, dazu die Schülerblätter (Abschnitt 7).
4. Ablegen als eigene Datei je Einheit: `src/data/foerderfach/entwurf/<id>.json` (Abschnitt 10).
5. Prüfen und nachbessern, bis das Prüfskript keine Fehler mehr meldet und die Blätter höchstens
   zwei Seiten haben (Abschnitt 10). Keine anderen Dateien ändern, kein git.

---

## 1. Das Fach und die Klasse

### 1.1 Wer sitzt im Raum?

- **Voie de préparation (VP)** des Enseignement secondaire général in Luxemburg, 7e, 6e und 5e:
  Jugendliche von etwa 12 bis 15 Jahren, die im Grundschulzyklus 4 nicht alle Ziele erreicht haben.
  Viele sprechen mehrere Sprachen (Luxemburgisch, Portugiesisch, Französisch, Deutsch, Serbisch,
  Arabisch …), manche lesen und schreiben mühsam, manche haben schwierige Schulerfahrungen hinter sich.
  Sie sind nicht „schwach“, sondern brauchen klare Abläufe, kurze Texte, viel Aktivität und
  Erfolgserlebnisse.
- **Klasse von rund 20 Jugendlichen.** Standard-Sitzordnung: fünf Tischgruppen zu vier.
- **Lehrkraft des Lycée**, oft ohne psychologische oder sozialpädagogische Ausbildung. Sie leitet
  an, schützt den Rahmen und holt Hilfe (SePAS), wenn etwas zu groß wird. Sie ist keine
  Therapeutin.
- **Eine Doppelstunde (2 × 50 Min.) pro Woche**, 35 Doppelstunden im Jahr, **ohne Noten**.
  Manchmal liegt die große Pause zwischen den beiden Stunden; manchmal fällt eine Stunde aus
  (dafür gibt es die `kurzfassung`).
- **Unterrichtssprache Deutsch oder Französisch**: Jede Einheit gibt es vollständig in beiden
  Sprachen, gleich aufgebaut.

### 1.2 Was die Einheiten gemeinsam haben

- Üben statt Belehren: Jede Einheit hat mindestens eine Übung, in der die Jugendlichen etwas
  **tun** (aufstellen, ausprobieren, spielen, sortieren, rollenspielen, bauen, messen).
- Freiwilligkeit: Niemand muss Persönliches erzählen. „Weiter“ ist immer erlaubt. Persönliche
  Schreibaufgaben werden nicht vorgelesen, außer jemand möchte es.
- Distanz schützt: Schwierige Themen laufen über erfundene Figuren und Situationen („Was könnte
  Jana tun?“), nicht über die Erlebnisse der Jugendlichen.
- Die Lehrkraft macht mit: Sie beginnt den Check-in, probiert jeden Skill selbst aus.

### 1.3 Vom Skills-Kurs zur Klasse

Der Skills-Kurs ist für Kleingruppen von 4 bis 8 Jugendlichen mit einer Leitung aus dem CDSE
geschrieben. Für das Fach gilt:

| Skills-Kurs | Förderfach |
|---|---|
| 4–8 Jugendliche, Stuhlkreis | 20 Jugendliche, fünf Tischgruppen zu vier |
| „Leitung“, „Gruppe“, „Einheit“ | „Lehrkraft“, „Klasse“, im Gespräch mit den Jugendlichen „Stunde“ |
| 45–60 Pause mit Imbiss | 45–50 Bewegungspause; **kein Imbiss**, kein Essen als Programmpunkt |
| Jede Person spricht in jeder Runde | Nicht alle 20 in jeder Runde: Tischgruppen berichten, drei bis vier Freiwillige, Aufstellungen, Handzeichen, Karten, Galerie, stilles Schreibgespräch |
| Draußen, Natur, allein unterwegs | Klassenraum, Flur, Schulhof in Sichtweite; nie „allein draußen“ |
| Responsable, internes Schutzkonzept | SePAS des Lycée, Schutzkonzept der Schule, Direktion; Klassenlehrer oder Klassenlehrerin (Régent) |
| Gruppenvertrag | Klassenvereinbarung (Blatt `ff-klassenvereinbarung`) |
| Übungen mit Körperkontakt | nur freiwillig, mit Alternative; keine Übungen mit verbundenen Augen in der Klasse |

Übungen, die in der Kleingruppe tragen, aber mit 20 nicht funktionieren (lange Einzelrunden,
Vertrauensübungen, Traumreisen im Liegen), werden umgebaut oder ersetzt. Schreibaufgaben werden
kürzer, Gespräche kleiner (zu zweit, Tischgruppe), Ergebnisse sichtbar (Tafel, Plakat, Galerie).

---

## 2. Aufbau der Doppelstunde (100 Minuten)

| Min. | `phase` | Was passiert |
|---|---|---|
| 0–10 | `ankommen` | Check-in: Klebepunkt am Gefühlsrad-Plakat beim Hereinkommen (oder eine Variante, Abschnitt 2.3), dazu zwei, drei Stimmen; die Lehrkraft beginnt |
| 10–15 | `bruecke` | Rückblick auf die letzte Stunde (am besten sagt eine Person ihren Satz aus dem Skills-Pass), kurz nach der Wochen-Mission fragen (Daumen, eine Stimme), Thema von heute nennen |
| 15–45 | `input` / `uebung` / `aktiv` | Hauptteil 1: Input und erste Übung, oft mit Schülerblatt; ein oder zwei Schritte |
| 45–50 | `aktiv` | Bewegungspause (5 Min.) im Raum oder auf dem Schulhof; entfällt, wenn die große Pause dazwischen liegt |
| 50–85 | `uebung` / `aktiv` | Hauptteil 2: Rollenspiel, Spiel, Stationen, Gruppenarbeit; ein oder zwei Schritte |
| 85–95 | `skill` | Ein Skill oder eine Achtsamkeitsübung, angeleitet, mit kurzer Auswertung |
| 95–100 | `abschluss` | Skills-Pass (ein Satz mit einer Leitfrage zum Thema), Blitzlicht oder Variante, Wochen-Mission ansagen, Ausblick |

- Abweichungen sind erlaubt, wenn der Inhalt es verlangt (Film, Stationen, Präsentationen,
  Kapitelende mit Skills-Kompass oder Skills-Buch). Fest bleiben: 0–10 Check-in, 10–15 Brücke,
  45–50 Bewegungspause, Skill und Abschluss am Ende (zusammen 10–15 Min.).
- **Die Minuten in `ablauf` laufen lückenlos von 0 bis 100. Jede Ablauf-Zeile ist genau ein
  Schritt**: gleich viele Zeilen wie Schritte, gleiche Reihenfolge, gleiche Minuten (das Handbuch
  druckt beides nebeneinander). Die Schritte ergeben zusammen genau 100 Minuten.
- In der Regel 8 oder 9 Schritte. Check-in, Brücke und Abschluss sind kurz, aber konkret
  (Variante, Leitfrage, Satz für den Skills-Pass).

### 2.1 Rituale je Klassenstufe

| | 7e | 6e | 5e |
|---|---|---|---|
| Check-in | Gefühlsrad (`ff-gefuehlsrad`); **ab Einheit 13** zusätzlich Anspannung 0–100 (`ff-anspannungsskala`) | Gefühlsrad und Anspannung 0–100 | Gefühlsrad und Anspannung 0–100 |
| Abschluss | Skills-Pass (`ff-skills-pass`) und Blitzlicht | Skills-Pass; **am Ende jedes Kapitels** zusätzlich der Skills-Kompass (`ff-skills-kompass`, 5 Min.) | Skills-Pass; **am Ende jedes Kapitels** eine Seite im Skills-Buch (`ff-skills-buch`, 10 Min.) |
| Klassenvereinbarung | aufgestellt in Einheit 1, hängt in jeder Stunde | geprüft und erneuert in Einheit 1 | erneuert in Einheit 1 |

Die Werkzeug-Blätter (`ff-das-fach`, `ff-gefuehlsrad`, `ff-skills-pass`, `ff-klassenvereinbarung`,
`ff-anspannungsskala`, `ff-skills-kompass`, `ff-skills-buch`) gibt es schon. Nicht neu anlegen.
Eine Einheit führt sie in `blaetter` nur, wenn sie damit arbeitet (Einführung, Kapitelende) –
nicht für den gewöhnlichen Check-in oder Skills-Pass.

### 2.2 Wiederkehrende Fäden

**7e:** Plakat „Was sind Skills?“ mit den Spalten „hilft kurz – hilft wirklich“ (Einheit 1 → 13 → 35) ·
Klassenrat (Einheit 5, danach alle paar Wochen 10 Min. am Ende einer Stunde, wo es passt) ·
Glas der Bedürfnisse (Einheit 6 → 17 → 35) · Baum der Stärke (Einheit 8 → 30 → 35) ·
Anspannungsskala (ab Einheit 13 in jedem Check-in) · Skills-Tester (Einheit 14 → 17) ·
Skills-Koffer, Ampelplan und Notfallkarte (Einheit 17 → 22, 31).
**6e:** Skills-Kompass am Ende jedes Kapitels (Einheiten 2, 5, 9, 12, 17, 20, 23, 26, 29, 33, 35) ·
Skills aus der 7e werden aufgefrischt, nicht neu erklärt (Skills-Olympiade, Einheit 2).
**5e:** Skills-Buch am Ende jedes Kapitels (Einheiten 2, 5, 9, 12, 16, 20, 23, 26, 30, 32, 35) ·
Skills-Radar (Einheit 2 → 33) · Sicherheitsplan (Einheit 20 → 34) · Mein Netz (Einheit 22 → 23, 34).

### 2.3 Bausteine für Check-in, Bewegungspause, Skill und Abschluss

Abwechseln, zum Thema passend wählen, im Schritt vollständig beschreiben (nicht nur den Namen
nennen). Mit 20 Personen dauert eine Runde, in der jede Person einen Satz sagt, etwa 4 Minuten –
deshalb meist Klebepunkt, Handzeichen, Aufstellen oder zwei, drei Freiwillige.

- **Check-in:** Gefühlsrad mit Klebepunkt · Anspannung per Finger (auf drei zeigen alle 0–10 Finger
  = 0–100) · Aufstellen an einer Klebeband-Linie (0 an der Tür, 100 am Fenster) · Wetterbericht
  (inneres Wetter) · Akkustand in Prozent · zwei Gefühle gleichzeitig (ab 7e Einheit 12) ·
  Körper-Check (wo sitzt das Gefühl?) · Bildkarte oder Postkarte wählen · Symbol an die Tafel.
- **Bewegungspause (5 Min.):** Alle, die … (hinter dem Stuhl stehen, bei „ja“ kurz setzen) ·
  Stein, Papier, Schere mit Fanclub · Zip Zap Boing in zwei Kreisen · Spiegeln zu zweit · Atom
  (Gruppen nach Zahl bilden) · Zählen bis 20 ohne Absprache · Gefühlsstatuen raten · Fenster auf,
  eine Minute Hampelmann, eine Minute still · Ja-Nein-Seiten (Raumseite wählen) · Klatschwelle ·
  Obstsalat mit Stühlen (nur wenn Platz ist) · Pantomime-Kette.
- **Skill (10 Min.):** 5-4-3-2-1 · Kastenatmung · Fingeratmung · Anspannen und Loslassen
  (Fäuste, Schultern) · Klangschale bis der Ton verklingt · Farbsuche · achtsames Hören ·
  Gedankenschiffchen · Kälte (kaltes Wasser an den Handgelenken) · rückwärts zählen in Siebener-
  schritten · Papierknistern · Sinneswürfel · Atem zählen · Handmassage mit Knetball.
  Die Lehrkraft leitet langsam an, macht mit, fragt danach: Wann könnte das helfen?
- **Abschluss:** Skills-Pass mit einer Leitfrage zum Thema („Welchen Satz nehme ich mit?“) ·
  Blitzlicht (ein Wort) · Daumen hoch, Mitte, runter · Koffer und Papierkorb · eine Tischgruppe
  sagt einen Satz für alle · Wochen-Mission ansagen (`mission`, steht im Heft) · Ausblick (`bruecke`).

---

## 3. Felder einer Einheit

```json
{
  "id": "ff7-e02",                   // wie im Jahresplan
  "klasse": "7e",
  "dauer": 100,
  "blaetter": ["ff7-neu-am-lycee"],  // Blätter des Schülerhefts in der Reihenfolge der Einheit
  "vorlagen": ["ff7-rallye-karten"], // optional: Kopiervorlagen nur für die Lehrkraft (Karten zum Ausschneiden)
  "woerter": [{ "de": "die Anlaufstelle", "fr": "le point de contact" }],   // 3–6, Abschnitt 6
  "de": { … EinheitText … },
  "fr": { … EinheitText … }
}
```

`EinheitText` (Deutsch und Französisch gleich aufgebaut):

- `titel`: **genau** der Titel aus dem Jahresplan (`titel.de` bzw. `titel.fr`).
- `kurz`: ein Satz, worum es geht (höchstens 220 Zeichen). Kein „In dieser Einheit …“.
- `ziele`: 2–4 beobachtbare Ziele, mit Verb im Plural beginnend, ohne Subjekt – gedruckt nach
  „Die Jugendlichen …“ / « Les jeunes… »: „benennen drei Warnsignale für Wut“, « nomment trois
  signaux d’alerte de la colère ».
- `material`: vollständig und abhakbar, mit Mengen für 20 („Moderationskarten, 8 je Tischgruppe“);
  höchstens 9 Punkte, je eine kurze Zeile.
- `vorbereitung`: nur, was vorher passieren muss (Raum, Tafelbild, Kopien, Karten schneiden,
  Absprachen mit SePAS oder Eltern, Film prüfen); höchstens 5 Punkte, je höchstens 180 Zeichen.
- **Die Übersichtsseite muss auf eine A4-Seite passen:** Titel, Kurztext, Ziele, Ablauf, Material,
  Vorbereitung, Kopiervorlagen, Wortspeicher und `achtung` stehen zusammen auf der ersten Seite der
  Einheit. Deshalb Material und Vorbereitung knapp halten und `achtung` auf 300–700 Zeichen begrenzen
  (bei Einheiten mit `hinweis` im Plan bis 900);
  Einzelheiten gehören in die Schritte.
- `ablauf`: Zeittabelle, eine Zeile je Schritt: `{ "min": "0–10", "phase": "ankommen", "titel": "…" }`
  (Titel ≤ 60 Zeichen, Gedankenstrich – zwischen den Minuten).
- `schritte`: die eigentliche Anleitung:
  - `titel`, `dauer` (Minuten), `phase` – wie in der Ablauf-Zeile.
  - `text`: 3–7 Sätze, sachlich, im Infinitiv oder Imperativ, ohne Anrede der Lehrkraft. Konkret:
    wer macht was, wie lange (Teilzeiten in Klammern: „(3 Min.)“), in welcher Sozialform (allein →
    zu zweit → Tischgruppe → Klasse), was entsteht (Tafel, Plakat, Heft). Mindestens 200 Zeichen,
    bei Kernübungen 400–700.
  - `sagen`: 1–3 wörtliche Impulse an die Klasse, natürlich und jugendgerecht, ohne
    Anführungszeichen am Anfang und Ende (setzt das Programm). Die Klasse mit „ihr“ / « vous »
    ansprechen. (Ausgabe annexe: Der erste Impuls je Schritt – sonst der erste Punkt – steht auf dem Spickzettel der
    Einheit; er sollte für sich verständlich sein.)
  - `punkte`: Listen, die die Lehrkraft vorliest oder anschreibt (Situationen, Sätze, Stationen,
    Regeln). Situationen immer ausformuliert, 4–8 Stück, aus dem Alltag der Jugendlichen.
  - `tabelle`: wenn ein Modell an die Tafel kommt (`{ "spalten": […], "zeilen": [[…]] }`).
  - `tipp`: ein, zwei Sätze aus der Praxis.
  - `wennEsKippt`: realistisch und konkret – niemand redet, Gelächter, jemand verweigert, die Klasse
    ist aufgedreht, jemand erzählt etwas Belastendes, zwei geraten aneinander. Was genau tun?
  - `blatt`: Id des Blatts (aus `blaetter` oder `vorlagen`), das in diesem Schritt gebraucht wird.
  - Jede Kernübung hat `tipp` **und** `wennEsKippt`; die meisten anderen Schritte eines von beiden.
- `bruecke`: ein wörtlicher Satz für das Ende, der zur **nächsten Einheit im Plan** passt
  („Nächste Woche …“ / « La semaine prochaine… »). In der letzten Einheit des Jahres ein Abschiedssatz.
- `mission`: die **Wochen-Mission** – ein kleiner Auftrag für den Alltag bis zur nächsten Stunde, an die
  Jugendlichen gerichtet („du“ / « tu »), 60–180 Zeichen. Sie steht im Schülerheft auf den Seiten „Meine
  Wochen-Missionen“ (mit Kästchen zum Abhaken) und im Handbuch unter dem Ausblick. Der letzte Schritt
  (Abschluss) sagt sie in einem Satz an; die Brücke der **nächsten** Stunde fragt kurz nach (Daumen hoch, Mitte,
  runter; eine Stimme erzählt – niemand muss sie geschafft haben). Das Prüfskript sucht in beiden Schritten
  das Wort „Mission“.
  - In wenigen Minuten machbar, ohne Material, Geld oder Handy; etwas tun, ausprobieren oder beobachten –
    höchstens einen Satz schreiben. Passt zum Skill oder zum Kern der Stunde.
  - Nichts, was andere bloßstellt oder Persönliches von anderen verlangt; keine Mutprobe; nichts, wofür man
    Erwachsene ausfragen muss. Bei sensiblen Themen sanft und mit Wahl („… oder …“).
  - Keine Hausaufgabe: keine Kontrolle, keine Note, kein Tadel, wenn sie nicht geklappt hat.
  - Beispiel: „Probiere 5-4-3-2-1 diese Woche einmal aus – im Bus, vor einem Test oder abends im Bett. Was war
    danach anders?“ / « Essaie le 5-4-3-2-1 une fois cette semaine – dans le bus, avant un devoir en classe ou le
    soir au lit. Qu’est-ce qui a changé après ? »
- `hintergrund`: 450–950 Zeichen für die Lehrkraft: warum die Einheit wirkt, fachlich sauber,
  verständlich ohne Fachstudium, mit Quelle im Text („(Gross, 1998)“, „(Durlak et al., 2011)“).
- `quellen`: 1–3 Einträge, wörtlich aus `src/blatt/quellen.ts` (Abschnitt 8), in beiden Sprachen gleich.
- `achtung`: **immer**, 300–700 Zeichen (mit `hinweis` im Plan bis 900). Was ist sensibel, woran erkennt man, dass es zu viel wird, was dann tun
  (nicht im Plenum vertiefen, nach der Stunde ansprechen, noch am selben Tag den SePAS
  informieren, nach dem Schutzkonzept der Schule handeln). Bei Einheiten mit `hinweis` im Plan
  (Eltern, SePAS, Direktion, Vorführrechte, Düfte, Verlust) steht die Absprache hier und in
  `vorbereitung`.
- `differenzierung`: `{ "leichter": "…", "schwerer": "…" }` (Abschnitt 6).
- `kurzfassung`: für eine einzelne Stunde (Abschnitt 6).

---

## 4. Sprache und Ton

- **Konkret statt allgemein.** Nicht „Über Gruppendruck sprechen“, sondern: „Jede Tischgruppe zieht
  eine Situationskarte, spielt sie in zwei Minuten vor und friert an der schwierigsten Stelle ein.
  Die Klasse schlägt zwei Nein-Sätze vor; die Gruppe spielt die Szene mit dem besseren zu Ende.“
- **Alltag in Luxemburg:** Lycée, Klasse, Régent, SePAS, Éducateur, Direktion, Bus, Kantine,
  Pause, Schulhof, Klassengruppe im Chat (WhatsApp, Snapchat, TikTok, Instagram), Maison des
  jeunes, Fußballverein, Praktikum (stage), Devoir en classe, Bulletin. Keine deutschen
  Sonderbegriffe (kein „Hort“, „Gymnasium“, „Klassenarbeit“ – sondern „Test“ bzw. « devoir en classe »).
- **Namen** gemischt wie in Luxemburger Klassen, erfunden: Lena, Noah, Inês, Tiago, Mila, Jang,
  Ben, Sofia, Yusuf, Amira, Luca, Emma, Liam, Chiara, Diogo, Léa, Mathis, Zoé, Elias, Aylin, Nora,
  Samuel, Ana, Rafael, Jana, Kevin, Bruna, Arben, Leonie, Gabriel. Nie echte Personen.
- **Jugendliche ernst nehmen:** nicht kindlich, keine Belehrung, kein erhobener Zeigefinger.
  Humor ja, Ironie über Jugendliche nein. Jugendsprache nur, wo sie echt klingt.
- **Leichte Sprache auf den Blättern:** kurze Sätze, bekannte Wörter, ein Auftrag pro Aufgabe.
  In der Anleitung für die Lehrkraft normale, klare Sprache.
- **Keine Diagnose- oder Therapiesprache** gegenüber den Jugendlichen („Störung“, „Symptom“,
  „Therapie“, „Trauma“). Im `hintergrund` fachlich korrekt.
- **Keine Moralpredigt über Handy, Drogen oder Sex.** Fakten, Abwägen, eigene Entscheidung –
  und wissen, wo es Hilfe gibt.
- **Filme und Medien:** nur mit geklärten Vorführrechten (Schullizenz), genaue Ausschnitte mit
  Minuten angeben, Altersfreigabe prüfen.
- **Verboten** (das Prüfskript sucht danach): Emojis und Deko-Symbole · „In dieser Einheit …“,
  „Heute tauchen wir ein …“, „spannend“, „Reise“, „Entdeckungsreise“, „magisch“, „Superkraft“,
  „ganzheitlich“, „Lass uns …“, „Viel Spaß“, „Wusstest du …“, „Mindset“, „Es ist wichtig, …“ ·
  Allgemeinplätze („Gefühle sind wichtig“) · mehr als ein Ausrufezeichen pro Einheit (außer in
  wörtlichen Spielanweisungen wie „Stopp!“) · Dreierlisten ohne Inhalt.
- **Typografie Deutsch:** „…“ und innen ‚…‘, Gedankenstrich –, Auslassung …, „10 Min.“,
  Bereiche „0–10“, keine geraden Anführungszeichen, keine Zeichen außerhalb von Latein-1 außer
  – — ‘ ’ ‚ “ ” „ … ·.

---

## 5. Französisch

Die französische Fassung ist **keine Wort-für-Wort-Übersetzung**, sondern so geschrieben, wie eine
erfahrene Lehrkraft in Luxemburg sie auf Französisch schreiben würde – mit genau demselben
Aufbau: gleiche Schritte, Minuten, Phasen, Blätter, gleich viele Impulse, Punkte, Zeilen,
Tipps und „Wenn es kippt“.

- Anleitungen im Infinitiv: « Écrire la question au tableau. Deux minutes d’échange à deux, puis… »
- Impulse an die Klasse mit « vous », auf den Blättern « tu ».
- Die Lehrkraft möglichst nicht nennen (Infinitiv); wo nötig « l’enseignant·e » (sparsam).
- `ziele` im Plural ohne Subjekt: « repèrent… », « s’entraînent à… », « nomment… ».
- **Typografie:** « … » mit **normalem Leerzeichen** innen (das Programm setzt geschützte), vor
  `: ; ! ?` ein Leerzeichen, innere Anführungszeichen “ … ”, Apostroph ’ (nie '), « 10 min »,
  « 1er », « 2e », « p. 12 », Gedankenstrich –. Keine „deutschen“ Anführungszeichen.
- Französische Floskeln vermeiden: « Dans cette séance… », « voyage », « aventure », « magique »,
  « Amusez-vous bien », « Le saviez-vous », « Il est important de… ».

**Feste Begriffe** (immer so übersetzen):

| Deutsch | Français |
|---|---|
| das Fach | la matière |
| die Doppelstunde / die Stunde | la séance (de deux heures) / le cours |
| die Einheit (im Handbuch) | la séance |
| die Lehrkraft | l’enseignant·e (sparsam; besser Infinitiv) |
| die Jugendlichen | les jeunes |
| die Tischgruppe | l’îlot (le groupe de quatre) |
| zu zweit, allein, in der Klasse | à deux, seul, en classe entière |
| der Check-in | le tour d’humeur |
| das Gefühlsrad | la roue des émotions |
| der Klebepunkt | la gommette |
| die Anspannung / die Anspannungsskala | la tension / l’échelle de tension |
| der Skill, die Skills | le skill, les skills |
| der Skills-Pass | le Skills-Pass |
| der Skills-Kompass | la boussole des skills |
| das Skills-Buch | le livre des skills |
| der Skills-Koffer | la valise à skills |
| der Ampelplan | le plan feu tricolore |
| die Notfallkarte | la carte d’urgence |
| das Blitzlicht | le tour éclair |
| die Wochen-Mission | la mission de la semaine |
| die Bewegungspause | la pause active |
| die Brücke (Phase) | le lien |
| die Klassenvereinbarung | la charte de classe |
| der Klassenrat | le conseil de coopération |
| das Schülerheft | le cahier de l’élève |
| das Blatt / die Kopiervorlage | la fiche / le modèle à photocopier |
| das Plakat / die Tafel | l’affiche / le tableau |
| die Moderationskarten | les cartes (cartons) |
| das Rollenspiel | le jeu de rôle |
| das Standbild | l’image figée |
| die Situationskarte | la carte situation |
| der Test (Klassenarbeit) | le devoir en classe |
| der Klassenlehrer, die Klassenlehrerin | le régent, la régente |
| der SePAS | le SePAS |
| das Schutzkonzept der Schule | le protocole de protection de l’école |
| die Direktion | la direction |
| die Ich-Botschaft | le message en « je » |
| die ‚Wenn-dann‘-Pläne | les plans « si… alors » |
| das Glas der Bedürfnisse | le bocal des besoins |
| der Baum der Stärke | l’arbre des forces |
| Wenn es kippt | Si ça dérape |
| „weiter“ (Runde auslassen) | « je passe » |

---

## 6. Wortspeicher, Differenzierung, Kurzfassung

**`woerter` (3–6 Einträge):** die Schlüsselwörter der Stunde in beiden Sprachen. Sie stehen an der
Tafel, auf der Seite der Einheit und im Glossar Deutsch–Französisch am Ende des Handbuchs.
Wörter, die die Jugendlichen brauchen, um über das Thema zu sprechen – keine Fachbegriffe der
Psychologie. Nomen mit Artikel („die Grenze“ – « la limite »; vor Vokal mit Geschlecht:
« l’émotion (f.) »), Verben im Infinitiv. Ein Begriff, der schon in einer früheren Einheit steht,
wird genauso übersetzt.

**`differenzierung`:** für gemischte Klassen, je 1–3 Sätze, konkret für diese Einheit.
- `leichter`: für Jugendliche, die mühsam lesen oder schreiben oder die Unterrichtssprache noch
  lernen: mündlich statt schriftlich, Satzanfänge, Bildkarten, weniger Punkte, Tandem mit einer
  Person, die gut liest, Wortspeicher an der Tafel, Stichworte statt Sätze.
- `schwerer`: für Schnelle: eine Zusatzfrage, Übertragung auf eine neue Situation, Rolle als
  Moderation oder Beobachtung, eine Regel oder ein Argument formulieren.

**`kurzfassung`:** Wenn nur eine Stunde (50 Min.) bleibt: welche Schritte mit welchen Minuten
(zusammen **genau 50**), was entfällt, was sich in die nächste Stunde verschieben lässt. Minuten
immer als „(10 Min.)“ bzw. « (10 min) » schreiben – das Prüfskript zählt nach.
Beispiel: „Bleibt nur eine Stunde: Check-in (5 Min.), Situationen sortieren (20 Min.),
Rollenspiel mit zwei Gruppen (15 Min.), Skills-Pass und Blitzlicht (5 Min.), Kastenatmung
(5 Min.). Die Stationen entfallen; das Blatt wird zu Hause oder in der nächsten Stunde fertig.“

---

## 7. Schülerblätter

Die Blätter bilden das **Schülerheft** der Klassenstufe (ein Heft je Jugendlicher, im Lauf des
Jahres gefüllt) und stehen im Lehrerhandbuch als Kopiervorlage direkt nach der Einheit.

- **In der Regel ein neues Blatt je Einheit**, höchstens zwei; keines, wenn die Einheit nur mit
  Werkzeug-Blättern, Karten oder der Tafel arbeitet. Ein Blatt hat einen Zweck und muss sich lohnen:
  eine klare Aufgabe, Platz zum Schreiben, Ergebnis, das später wieder gebraucht wird.
- **Umfang: eine Seite, höchstens zwei** (mit `seitenumbruch`). Die Lehrerseite wird im Förderfach
  nicht gedruckt – alles für die Lehrkraft steht in der Einheit.
- **Karten zum Ausschneiden** (Situations-, Rollen-, Fragekarten) sind keine Seiten im Schülerheft:
  als eigenes Blatt anlegen (Baustein `karten`, 2 oder 3 Spalten, höchstens 12 Karten je Seite) und
  in der Einheit unter `vorlagen` führen, nicht unter `blaetter`.
- Aufbau und Bausteine nach `src/blatt/BLATT-STIL.md`, mit diesen Festlegungen:
  - `id`: `ff7-…`, `ff6-…` oder `ff5-…` und ein sprechender Name, klein mit Bindestrichen
    (`ff7-neu-am-lycee`, `ff6-wut-eisberg`)
  - `bereich`: `"skills"`; `thema`: eines von `ankommen`, `ich`, `gefuehle`, `regulieren`,
    `gedanken`, `kommunikation`, `schwierig`, `digital`, `gesund`, `abschluss`
  - `stufen`: `["ES"]`, `layout`: `"jugend"`, `eldib`: `[]`, `kurs`: die Einheiten, z. B. `["ff7-e02"]`
  - `schlagworte`: mindestens drei, darunter `"Förderfach"`
  - `bild`: ein Piktogramm `icon:<name>` aus `src/blatt/bilder/icons.json`
  - `de` und `fr` mit denselben Bausteinen in derselben Reihenfolge
  - `lehrer` (Pflichtfeld, wird nicht gedruckt): `ziel` (1–2 Sätze), `ablauf` (3–4 kurze
    Schritte), `hintergrund` (1–3 Sätze); `quellen` nur aus `src/blatt/quellen.ts`
- Text auf dem Blatt: kurze Sätze, Aufgaben höchstens 150 Zeichen, zwei bis vier Aufgaben. Denkmodelle
  nutzen, wo sie passen: `thermometer`, `ampel`, `eisberg`, `waage`, `leiter`, `zielscheibe`,
  `wennDann`, `satzanfaenge`, `einschaetzung`, `ankreuzen`, `skala`, `schritte`, `hand`, `glaeser`,
  `netz`, `comic` mit `figur:jana` und `figur:ben` (Jugendliche), `figur:lehrerin`, `figur:lehrer`.
- Blätter mit persönlichen Inhalten: `info` mit `symbol: "hilfe"` „Du entscheidest, was du teilst.“ /
  « Tu décides de ce que tu partages. » – als Hinweis, nicht als Ermahnung.
- Bei Krisen-, Mobbing-, Gewalt-, Sucht-, Sexualitäts- und Medienthemen am Ende `notfall` (ohne
  `eintraege`: dann stehen die Luxemburger Nummern automatisch darin).

**Gemeinsame Blätter über mehrere Einheiten** – die Id steht fest, angelegt wird das Blatt in der
ersten Einheit, die späteren Einheiten führen es in `blaetter` (auch wenn es beim Schreiben noch
nicht da ist):

| Id | angelegt in | wieder in |
|---|---|---|
| `ff7-glas-der-beduerfnisse` | ff7-e06 | ff7-e17, ff7-e35 |
| `ff7-baum-der-staerke` | ff7-e08 | ff7-e30, ff7-e35 |
| `ff7-skills-tester` | ff7-e14 | ff7-e15, ff7-e16, ff7-e17 |
| `ff7-skills-koffer` (Skills-Koffer, Ampelplan und Notfallkarte) | ff7-e17 | ff7-e22, ff7-e31 |
| `ff5-skills-radar` | ff5-e02 | ff5-e33 |
| `ff5-sicherheitsplan` | ff5-e20 | ff5-e34 |
| `ff5-mein-netz` | ff5-e22 | ff5-e23, ff5-e34 |

---

### 7.1 Skill-Karten

Am Ende des Schülerhefts stehen Skill-Karten zum Ausschneiden (Scheckkartengröße, acht je Seite, dahinter
die Rückseiten). Sie stehen in `src/data/foerderfach/skillkarten.json` und werden **nach** den Einheiten
einer Klassenstufe aus deren Skill-Schritten zusammengestellt – etwa 16 je Jahr, abwechslungsreich (Atem,
Körper, Sinne, Kopf, Miteinander, Schule). Je Karte: `name` (wie im Schritt „Skill: …“), `wann` (höchstens
70 Zeichen), genau drei `schritte` (je höchstens 80 Zeichen, an die Jugendlichen gerichtet), ein Piktogramm
und die `einheit`, in der der Skill eingeführt wird. Der Skill-Schritt dieser Einheit verweist im Handbuch
automatisch auf die Karte („Skill-Karte · Heft S. …“). Deshalb den Skill im Schritt so anleiten, dass er sich
in drei Schritten zusammenfassen lässt.

## 8. Quellen

- Nur Einträge aus `src/blatt/quellen.ts`, **Zeichen für Zeichen** kopiert (das Prüfskript
  vergleicht). Suchen: `grep -n "Gross\|Linehan" src/blatt/quellen.ts`.
- Im `hintergrund` mit Autor und Jahr zitieren: „(Gross, 1998)“, „(Rathus & Miller, 2015)“,
  „(Durlak et al., 2011)“; auf Französisch genauso, mit « et al. ».
- Keine Quellen erfinden, keine Zahlen ohne Quelle. Was in der Basis-Einheit zitiert ist und in
  `quellen.ts` steht, darf übernommen werden. Hilfsnummern nur aus der Basis-Einheit oder diesen:
  Notruf 112, Polizei 113, Kanner- a Jugendtelefon 116 111, SOS Détresse 45 45 45,
  BEE SECURE Helpline 8002 1234.

---

## 9. Sensible Themen

- Grundsatz: **nichts im Plenum vertiefen, was persönlich wird.** Die Lehrkraft stoppt freundlich,
  würdigt den Beitrag, bietet ein Gespräch nach der Stunde an. Gesprächsangebote immer mit dem
  SePAS verbinden.
- Hinweise auf Gewalt, Missbrauch, Vernachlässigung, Selbstverletzung oder Suizidgedanken: ruhig
  bleiben, zuhören, nichts versprechen (keine Geheimhaltung), noch am selben Tag den SePAS
  informieren und nach dem Schutzkonzept der Schule handeln; bei akuter Gefahr nicht allein lassen,
  112. Die Lehrkraft muss das nicht allein klären.
- **Suizid und Selbstverletzung** (6e Einheit 33, 5e Einheit 20): gemeinsam mit dem SePAS
  vorbereiten und möglichst halten; keine Methoden, keine Details, keine Geschichten mit
  Todesfolge; Botschaft: Hilfe holen ist kein Verrat, Krisen gehen vorbei, es gibt Hilfe.
- **Liebe und Sexualität** (6e Einheit 16, 5e Kapitel 9): Eltern vorher informieren (Brief), keine
  persönlichen Fragen an Jugendliche, anonymer Fragenbriefkasten, Grenzen und Einvernehmlichkeit
  im Mittelpunkt, Vielfalt respektvoll und sachlich, religiöse und kulturelle Unterschiede achten.
- **Verlust und Trauer** (5e Einheit 17): vorher mit Régent und SePAS klären, ob jemand gerade einen
  Verlust erlebt hat; diese Person vorher ansprechen und wählen lassen.
- **Familie** (6e Kapitel 6): nur mit erfundenen Familien arbeiten; niemand muss über die eigene
  Familie sprechen; keine Familienform ist „normal“.
- **Mobbing und Gruppendruck**: Beispiele erfunden, nie über anwesende Jugendliche; bei
  Hinweisen auf laufendes Mobbing in der Klasse nicht in der Stunde klären, sondern mit Régent und
  SePAS nach dem Vorgehen der Schule.
- **Konsum** (6e Kapitel 9, 5e Einheit 15): sachlich, ohne Abschreckungsbilder, ohne Konsumanleitung,
  ohne Fragen nach eigenem Konsum; im Notfall: 112 rufen, die Person nicht allein lassen,
  Erwachsene holen.

---

## 10. Ablage, Prüfen, Ansehen

**Datei je Einheit:** `src/data/foerderfach/entwurf/<id>.json` (UTF-8, gültiges JSON, zwei Leerzeichen
Einrückung):

```json
{
  "einheiten": [ { …die Einheit… } ],
  "blaetter": [ { …Blätter, die in dieser Einheit neu angelegt werden… } ]
}
```

Blätter, die eine andere Einheit anlegt (Tabelle in Abschnitt 7) oder die es schon gibt, stehen
nicht in `blaetter` der Datei, nur in `blaetter` bzw. `vorlagen` der Einheit.

**Prüfen** (im Ordner `/home/user/isa-app`):

```
npm run foerderfach:pruefen -- src/data/foerderfach/entwurf/ff7-e02.json
```

Das Skript prüft die Einheit (Aufbau, Minuten, Deutsch und Französisch gleich gebaut, Wortspeicher,
Kurzfassung, Quellen, Stil) und ihre Blätter (mit den Regeln der Toolbox). Alle Fehler (✗) beheben,
Hinweise (·) ernst nehmen – ein Hinweis auf eine Floskel ist fast immer berechtigt.

**Blätter ansehen:**

```
npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-blatt.tsx src/data/foerderfach/entwurf/ff7-e02.json --png
```

setzt jedes Blatt der Datei so, wie es im Schülerheft steht (Deutsch und Französisch), meldet die
Seitenzahl (mehr als zwei ist ein Fehler) und legt mit `--png` Bilder in `tmp/foerderfach-blatt/`
ab. Jedes Blatt einmal als Bild ansehen: zu voll, zu leer, Seitenumbruch sinnvoll?
