# Lernbogen „Drei Jahre Annexe“ – was ein Kind nach jedem Kapitel wirklich weiß und kann

Auftrag (19.11.): Skills im Spiel höchst professionell, erklärt und tiefgehend. Nach dem ersten Jahr soll ein Kind
z. B. genau wissen, was Sorge, Angst, Panik und Verzweiflung unterscheidet, wo es Gefühle im Körper spürt, warum, und
was dann hilft – und welche Sätze es sagen kann, wenn es eine Grenze setzen will. Konsistent über drei Jahre.
Die Kurs-Unterlagen Jahr 1 (tools/data/skills-kurs-j1.json) sind Orientierung für Themen, keine 1:1-Vorlage.

## Grundsätze (gelten für jede Skills-Stunde im Spiel)
1. **Erst verstehen, dann üben.** Jede Stunde erklärt den Begriff klar, mit Beispiel aus der Geschichte und
   Gegenbeispiel. Kein Fachwort ohne Erklärung. Keine Übung, deren Regeln man erraten muss.
2. **Rückmeldung erklärt das Warum.** Nicht nur „richtig/falsch“, sondern: „Das ist eher Sorge, weil …“.
3. **Ehrlich statt erfunden.** Wo es um einen selbst geht, gibt es immer „Weiß ich nicht“ und „Möchte ich nicht
   sagen“. Nie muss man etwas über sich anklicken, das nicht stimmt. Das Eigene bleibt privat (nur auf dem Gerät).
4. **Ruhe in der Stunde.** Keine Zwischenrufe, keine Witze-Kommentare während des Lernens. Mitschüler kommen nur als
   ernsthafte Beispiele vor (sie erzählen etwas, das zum Begriff passt). Humor gehört in die Welt, nicht ins Lernen.
5. **Die Stunde ist ein eigener Raum.** Die 3D-Welt tritt zurück (Vollbild „Skills-Raum“), nach der Stunde geht es
   zurück in die Welt – und dort wird das Gelernte gebraucht.
6. **Merken und wieder aufgreifen.** Jede Stunde endet mit einer Merkkarte im Skills-Heft (Journal). Spätere Kapitel
   fragen das Wissen in der Geschichte wieder ab („Ist das Sorge oder Angst?“), bis es sitzt.
7. **Ein Kann-Satz pro Stunde.** Am Ende prüft eine kurze, faire Frage, ob der Kann-Satz sitzt – ohne Note.

## Ablauf einer Skills-Stunde im Spiel (Skills-Raum)
| Teil | Dauer | Was passiert |
|---|---|---|
| 1. Anlass | 30 s | Eine Situation aus der Geschichte (was gerade passiert ist) wird zur Frage. |
| 2. Verstehen | 2–3 min | Herr Kuedes erklärt in kurzen Karten: Begriff, woran man es merkt (Gedanken, Körper, Verhalten), wozu es gut ist, Beispiel, Gegenbeispiel. |
| 3. Üben | 2–3 min | Eine Übung mit echter Mechanik (unterscheiden, zuordnen, einstellen, formulieren). Jede Antwort bekommt eine Erklärung. |
| 4. Ich | 1–2 min | Freiwillig, ehrlich, privat: Wo spüre ich das? Wann zuletzt? Was hilft mir? (immer mit „weiß nicht / möchte ich nicht sagen“) |
| 5. Merken | 30 s | Merkkarte ins Skills-Heft. Kann-Satz-Check mit einer fairen Frage. |
| 6. Anwenden | später | Im selben Kapitel braucht die Geschichte genau dieses Wissen (Entscheidung, Gespräch, Situation). |

## Umsetzung im Spiel (Stand 19.11.)
Alle Stunden stehen in `src/lycee/story/skills-j1.js` und laufen im Skills-Raum (`src/lycee/skillsraum.js`).
Die Gefühlsfamilien sind über das Jahr verteilt, damit jede in Ruhe Platz hat.

| Kap. | Tag | Skills-Stunde | Übungen | Danach in der Welt (Anwenden) |
|---|---|---|---|---|
| 1 | Mi | Ankommen: Check-in und Regeln | genaueres Gefühlswort; Passt das zu unseren Regeln? | Regel-Vorschlag, Blind-Parcours |
| 2 | Mo | Die sechs Tanks | Welcher Tank ist leer + Was hilft?; Bedürfnis oder Wunsch? | Mila und die Liste, Tank-Mission |
| 2 | Do | Wie ich bin – und was ich kann | Charakterstärken; Stärken-Karte bauen | Linie (Fremdbild), Stärken verschenken, Karte von Noah |
| 3 | Mo | Sechs Grundgefühle | Welches Gefühl?; Körperkarte (Angst, Wut, Trauer, Freude) | Mila: Ekel auch bei Menschen |
| 3 | Do | Sorge, Angst, Panik, Verzweiflung | Angst-Familie unterscheiden | Sportfest, Körperkarte vor der Staffel |
| 4 | Mo | Runterkommen: Zonen und Skills | Körper, Sinne oder Kopf?; Skala 0–100 + passender Skill | Zonen-Wette, Koffer, Test, Noah auf der Bank, Ernstfall |
| 5 | Mo | Gedanken prüfen | Tatsache oder Gedanke?; Denkfallen; neuen Satz bauen | Bohnen, Detektiv-Waage, neuer Satz mit Noah |
| 5 | Mo | Gefühls-Kompass: Scham oder Schuld | Scham oder Schuld? | Kantine |
| 6 | Mo | Ich-Botschaft, Zuhören, Grenzen | Du/Ich-Botschaft; Zuhören; Grenzen-Stufe | Ich-Satz an Jo, Stopp im CDI |
| 6 | Fr | Gefühls-Kompass: Ärger, Wut, Zorn | Wut-Familie; Körperkarte Wut | Stopp-Sätze in der Runde |
| 7 | Mo | Streit, Druck, Mobbing | Tiere; Streit-Treppe; Hält dieses Nein? | Tier-Wechsel, Druck-Runde, Treppe, Bühne |
| 7 | Fr | Gefühls-Kompass: Trauer-Familie | Enttäuschung, Traurigkeit, Trauer, Einsamkeit | Spaß, Streit oder Mobbing? (vier Bilder) |
| 8 | Di | KI: geht klar oder gar nicht? | Drei Fragen anwenden | Beweis-Mappe |
| 9 | Mo | Mein Akku | Lädt oder leert?; Gutes oder schweres Geheimnis? | Akku-Abend, Dario zu Herrn Kuedes |
| 9 | Fr | Bodyscan (geführt) | acht Schritte mit Atemkreis | Bodyscan bleibt unter „Kurz raus“ |
| 10 | Mo | Mein Jahr in Skills | Quiz ohne Noten (acht Fragen aus dem Jahr) | Jahres-Kurve, Brief an mich |

Jede Stunde endet mit einer Merkkarte im Skills-Heft (Journal) und einem „Kann ich das?“-Check.
Antworten werden in zufälliger Reihenfolge gezeigt. Die eigene Antwort bleibt sichtbar, darunter steht immer das Warum.

## Jahr 1 (7ème) – Kapitel = Modul
### Kapitel 1 · Ankommen
- **Kann-Sätze:** Ich kann sagen, wie es mir gerade geht – genauer als „gut“ oder „schlecht“. Ich kenne die Regeln, die unsere Gruppe sicher machen.
- **Wissen:** Gefühle sind Signale, keine Fehler. Das Gefühlsrad: sechs Grundgefühle (Freude, Trauer, Wut, Angst, Ekel, Überraschung) und feinere Wörter darum herum. Check-in: Gefühl + Stärke (0–10).
- **Ich:** Mein Check-in heute (ehrlich, privat, „weiß nicht“ erlaubt).
- **Anwenden:** Erster Schultag, Gruppenchat: Woran merke ich, wie es Noah geht?

### Kapitel 2 · Wer bin ich? (Bedürfnisse und Stärken)
- **Kann-Sätze:** Ich kenne sechs Grundbedürfnisse und erkenne, wenn eines zu kurz kommt. Ich unterscheide Bedürfnis und Wunsch. Ich kann zwei eigene Stärken benennen.
- **Wissen:** Die sechs Tanks – Körper (Schlaf, Essen, Bewegung), Sicherheit (keine Angst haben müssen), Dazugehören, Ernst genommen werden (Anerkennung), Selbst entscheiden, Spaß und Neues. Ein leerer Tank meldet sich mit **Warnlichtern**: Gereiztheit, Rückzug, Clownerie, Müdigkeit. Verhalten ist oft ein Warnlicht, nicht „schlechter Charakter“. Bedürfnis = brauche ich wirklich; Wunsch = hätte ich gern.
- **Ich:** Welcher meiner Tanks ist diese Woche voll, welcher eher leer? Was füllt ihn?
- **Anwenden:** Ben ist ohne Witze → welcher Tank? Wie spreche ich ihn an?

### Kapitel 3 · Gefühle verstehen (Kern des Jahres)
- **Kann-Sätze:** Ich kenne sechs Grundgefühle und ihre Botschaft. Ich kann Sorge, Angst, Panik und Verzweiflung unterscheiden. Ich weiß, wo ich Gefühle im Körper spüre und wozu ein Gefühl da ist. (Die Wut-Familie folgt in Kap. 6, die Trauer-Familie in Kap. 7, Scham und Schuld in Kap. 5.)
- **Wissen (Gefühlsfamilien):**
  - Angst-Familie: **Sorge** (Gedanken kreisen um etwas, das passieren *könnte*; „Was, wenn …?“; eher Kopf, hält lange an) · **Angst** (Gefahr fühlt sich *jetzt* nah an; Herz schneller, Bauch eng, Atem flach; will schützen) · **Panik** (Angst ganz stark und plötzlich, der Körper übernimmt; Atemnot-Gefühl, Schwindel; ist unangenehm, aber ungefährlich und geht in Minuten vorbei) · **Verzweiflung** (Gefühl, dass es *keinen Ausweg* gibt; Hoffnung weg, schwer oder leer; braucht einen Menschen – Hilfe holen).
  - Wut-Familie: **Ärger** (etwas stört) · **Wut** (eine Grenze wurde verletzt, etwas ist unfair; Hitze, Kiefer, Fäuste) · **Zorn** (so stark, dass man die Kontrolle verlieren kann).
  - Trauer-Familie: **Enttäuschung** (eine Erwartung wurde nicht erfüllt) · **Traurigkeit** (etwas fehlt) · **Trauer** (ein großer Verlust, dauert lange) · **Einsamkeit** (Verbindung fehlt).
  - **Scham** („*Ich* bin falsch“, will verschwinden) vs **Schuld** („Ich habe etwas falsch *gemacht*“, will es wiedergutmachen).
  - Botschaft: Angst schützt, Wut zeigt Grenzen, Trauer zeigt, was wichtig war, Freude zeigt, was gut tut, Scham zeigt Angst um Zugehörigkeit, Schuld will reparieren.
  - Körperkarte: wo Gefühle typisch sitzen – und dass es bei jedem etwas anders ist.
- **Ich:** Meine Körperkarte: Wo spüre ich Angst, Wut, Trauer? Welches Gefühl kenne ich am häufigsten?
- **Anwenden:** Milas Foto-Moment und das Sportfest: Was fühlt wer – und woran sieht man es?

### Kapitel 4 · Gefühle regulieren (Skills)
- **Kann-Sätze:** Ich kann meine Anspannung auf einer Skala von 0 bis 100 einschätzen. Ich weiß, welche Skills bei welcher Anspannung wirken, und habe eine eigene Notfallkarte.
- **Wissen:** Anspannungsskala; grün (bis 30): Kopf-Skills (Gedanken ordnen, reden); gelb (30–70): Sinne und Ablenkung (5-4-3-2-1, Musik, etwas Kaltes, kauen); rot (ab 70): Körper zuerst („Deckel weg“ – der Kopf hört nicht zu): kaltes Wasser, Bewegung, länger aus- als einatmen. Panik-Wissen aus Kap. 3 wird hier angewendet. STOPP-Skill: Stopp – Atmen – Beobachten – Plan.
- **Ich:** Meine Frühwarnzeichen. Meine drei Skills für Rot.
- **Anwenden:** Raumwechsel ohne Ansage – Mila erstarrt (Ernstfall).

### Kapitel 5 · Meine Gedanken
- **Kann-Sätze:** Ich erkenne, wie Situation, Gedanke, Gefühl und Verhalten zusammenhängen. Ich kenne vier Denkfallen und kann einen Gedanken prüfen und hilfreicher formulieren.
- **Wissen:** Denkfallen: Gedankenlesen, Katastrophendenken, Alles-oder-nichts, „immer/nie“-Verallgemeinern, sich selbst abwerten. Detektivfragen: Was spricht dafür, was dagegen? Gibt es eine andere Erklärung? Was würde ich einer Freundin sagen? Hilfreich heißt realistisch – nicht „alles super“.
- **Ich:** Ein Satz, den ich oft über mich denke (privat) – und seine geprüfte Version.
- **Anwenden:** Der gefälschte Screenshot: „Alle glauben das“ – stimmt das?

### Kapitel 6 · Kommunikation und Grenzen
- **Kann-Sätze:** Ich kann eine Ich-Botschaft bilden. Ich kenne Sätze, um eine Grenze zu setzen – in Stufen – und ich achte die Grenzen anderer.
- **Wissen:** Ich-Botschaft: „Ich fühle mich …, wenn …, weil mir … wichtig ist. Ich wünsche mir …“. Grenzen-Stufen: (1) klar und ruhig: „Stopp. Das will ich nicht.“ (2) benennen: „Hör auf, mein Handy zu nehmen.“ (3) wiederholen, ohne zu diskutieren (4) Folge ankündigen: „Wenn du weitermachst, gehe ich / hole ich jemanden.“ (5) gehen und Hilfe holen. Körpersprache: aufrecht, Abstand, ruhige feste Stimme, Blick. Nein muss nicht begründet werden. Grenzen anderer: fragen statt annehmen, ein Nein ist ein Nein.
- **Ich:** Wo fällt mir Nein-Sagen schwer? Mein Grenzen-Satz.
- **Anwenden:** Jos „ok.“ als Sprachnachricht; Stopp im Klassenfoto.

### Kapitel 7 · Wenn es schwierig wird
- **Kann-Sätze:** Ich kenne die Stufen eines Streits und Wege nach unten. Ich unterscheide Streit und Mobbing. Ich weiß, was ich als Zuschauer sicher tun kann.
- **Wissen:** Konflikttreppe; Konfliktstile (Tiere) und wann welcher passt; Lösungsschritte: abkühlen – Ich-Botschaft – zuhören und zusammenfassen – Lösung für beide. Mobbing = wiederholt, absichtlich, ungleiche Macht. Rollen: wer mitmacht, wer zuschaut, wer hilft. Sicher helfen: nicht mitlachen, Betroffene ansprechen, Erwachsene holen, Beweise sichern. Gruppendruck erkennen, Nein-Wege.
- **Anwenden:** Druck-Runde an der Skate-Ecke; die zweite Gruppe.

### Kapitel 8 · Digitale Welt
- **Kann-Sätze:** Ich prüfe Inhalte mit drei Fragen (Wer? Woher? Wem schadet es?). Ich weiß, wie Feeds Aufmerksamkeit lenken und was Vergleiche mit mir machen. Ich kenne Schritte bei Online-Problemen.
- **Wissen:** Aufmerksamkeit als „Währung“, Vergleich mit bearbeiteten Bildern, KI-Fakes, Privatsphäre-Einstellungen, Screenshot – melden – Erwachsenen zeigen – BEE SECURE.

### Kapitel 9 · Gesund und stark
- **Kann-Sätze:** Ich kenne, was meinen Akku füllt und leert (Schlaf, Bewegung, Essen, Pausen, Bildschirm). Ich habe einen kleinen, machbaren Wenn-dann-Plan.
- **Wissen:** Stress-Akku, Schlaf und Handy, Wenn-dann-Pläne, Bodyscan, Hilfe holen, wenn jemand nicht mehr kann.

### Kapitel 10 · Abschluss
- **Kann-Sätze:** Ich kann sagen, was ich dieses Jahr gelernt habe und welcher Skill mir am meisten hilft.
- **Wissen:** Rückblick mit dem Skills-Heft (alle Merkkarten), Wiederholung der Kernbegriffe in einem Abschluss-Quiz ohne Noten.

## Jahr 2 (6ème) – vertiefen
- Gefühle: feinere Unterschiede (Neid vs Eifersucht, Nervosität vs Angst, Langeweile vs Leere), gemischte Gefühle, das Bedürfnis hinter dem Gefühl, Gefühle anderer lesen und darauf antworten (Empathie in Sätzen).
- Selbstwert und Körperbild; Freundschaft (Vertrauen, Eifersucht, Streit unter Freunden), Einverständnis im Alltag.
- Stress und Prüfungen; Schlaf und Bildschirm vertieft; Grenzen online (private Bilder, Druck, Cybermobbing).
- Vermitteln zwischen anderen (Mediation in Schritten); Werte und Entscheidungen.

## Jahr 3 (5ème) – anwenden und weitergeben
- Identität und Zukunft (Berufsorientierung, Stärken im Praktikum), Rückschläge und Resilienz.
- Risiko und Gewohnheiten (Energydrinks, Gaming, Rauchen – altersgerecht), Verantwortung für sich und andere.
- Psychische Gesundheit erkennen: Wann ist es mehr als ein schlechter Tag? Wie spreche ich jemanden an, wie hole ich Hilfe?
- Zivilcourage vertieft; eigener Selbstfürsorge-Plan für das nächste Jahr; den Jüngeren etwas beibringen (Pat:innen).

## Wiederaufnahme (Konsistenz)
Jeder Begriff kommt mindestens dreimal vor: in der Skills-Stunde (verstehen), im selben Kapitel in der Geschichte
(anwenden) und in einem späteren Kapitel als kurze Erinnerung („Weißt du noch: Sorge oder Angst?“). Das Skills-Heft
im Journal sammelt alle Merkkarten; das Abschluss-Quiz in Kapitel 10 fragt die Kann-Sätze des Jahres ab.
