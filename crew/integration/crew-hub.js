/* GENERIERT durch tools/hub-gen.js aus integration/src/crew-hub.src.js – NICHT von Hand ändern.
   Stand 2026-10, 38 von 62 Spielen gebaut.
   CREW-Hub – Anbindung der CREW-Spiele an die CDSE-Klassebücher (Galileo / Unified).
   QUELLE: integration/src/crew-hub.src.js → tools/hub-gen.js baut daraus integration/crew-hub.js
   (Katalog aus docs/spielekatalog.json, Liste der gebauten Spiele aus src/games/**, QR-Kern aus src/core/qr.js).
   Die fertige Datei integration/crew-hub.js NICHT von Hand ändern.

   Ohne Abhängigkeiten, läuft als <script> (window.CREWHub) oder als CommonJS-Modul (require).
   Alles rechnet im Browser. Es wird NICHTS gesendet: Notizen bleiben im Klassebuch, nach außen gehen nur
   Themen-Stichwörter und Spiel-IDs. Keine Namen in Links.

   API:
     CREWHub.katalog                        Themen, Formate, Spiele (mit gebaut: true/false), Einheiten, ELDiB-Kurznamen
     CREWHub.suggest(opts)                  → Vorschläge [{id, name, grund, …}], sortiert
        opts: { eldib: ['SOZ-32', …], themen: ['wut', …], einheit: 'j1-e04', format: 'zu-zweit',
                max: 3, nurGebaut: true, ohne: ['probelauf'], code: '1234', basis: 'https://…/index.html' }
     CREWHub.themenAusNotizen(text, opts)   → Themen-Tags, nur lokal per Stichwortliste (de/lb/fr); { details: true } → mit Trefferzahl
     CREWHub.qrSvg(url, {size})             → SVG-Markup eines QR-Codes
     CREWHub.spielUrl(id, {rolle, code, platz, basis})  → Deep-Link ohne Personendaten
     CREWHub.tagescode(datumISO)            → 4-stelliger Tagescode wie in CREW (aus dem Datum)
     CREWHub.eldibName(code)                → Kurzname eines ELDiB-Codes
     CREWHub.themenListe()                  → alle bekannten Themen-Tags [{id, name, vorsicht}]
     CREWHub.renderKarte(el, opts)          → fertige Karte (Personal- oder Jugend-Ansicht) in ein Element zeichnen
*/
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CREWHub = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  /* ---------- Katalog (generiert) ---------- */
  const KATALOG = {"stand":"2026-10","gebaut":38,"themen":[{"id":"ankommen","name":"Ankommen & Crew","spiele":["probelauf","regel-radar","frag-weiter","pilot-navigator","stummer-aufbau","staerken-spion","crew-rat","erster-eindruck","echter-freund"]},{"id":"ich","name":"Ich: Bedürfnisse & Stärken","spiele":["tank-detektiv","dahinter","kleiner-schritt","je-nach-ort","zwei-brillen","staerke-einsatz","vergleichs-falle"]},{"id":"gefuehle","name":"Gefühle verstehen","spiele":["gefuehls-funk","pult-tausch","fruehwarn","mixer"]},{"id":"skills","name":"Anspannung & Skills","spiele":["pegel-reihe","innen-aussen","undercover","sinnesjagd","gelb-rot","skill-sprechstunde","ampel-woche","kipp-punkt","blackout","mein-ort"]},{"id":"gedanken","name":"Gedanken & Glaubenssätze","spiele":["gedanken-weiche","woher-satz","tatsache-urteil","satz-werkstatt","beweis-jaeger","haltungs-switch"]},{"id":"kommunikation","name":"Kommunikation & Grenzen","spiele":["uebersetzer","stillepost","funkstille","zuhoerfalle","okayradar","naeher-nicht","stoppcheck","hitzeecken","familienfunk"]},{"id":"konflikt","name":"Konflikt, Druck & Mobbing","spiele":["storystaffel","sorrywerkstatt","dealoderkein","hundert-prozent","gerecht-oder-gleich","druck-chat","nein-trainer","vier-zeugen","leiter-lauf","wer-fehlt"]},{"id":"digital","name":"Digital, Gesundheit & Abschluss","spiele":["trick-erkannt","teilen-oder-nicht","geruecht-staffel","red-flag","akku-woche","spaeter-monster","jahres-quest"]}],"formate":[{"id":"solo","name":"Solo","template":"T0","icon":"phone","kurz":"allein am eigenen iPad"},{"id":"solo-austausch","name":"Solo + Austausch","template":"T1","icon":"shuffle","kurz":"erst allein tippen, dann Vergleichskarte zu zweit"},{"id":"zu-zweit","name":"Zu zweit an einem iPad","template":"T3","icon":"users","kurz":"ein iPad zwischen zwei Personen"},{"id":"weitergeben","name":"Gerät weitergeben","template":"T5","icon":"undo","kurz":"ein iPad wandert im Kreis"},{"id":"rollen","name":"Rollen-Puzzle","template":"T2","icon":"sparkle","kurz":"jedes iPad zeigt andere Infos"},{"id":"bewegung","name":"Bewegung im Raum","template":"T4","icon":"bolt","kurz":"Ecken und Wände, die Position ist die Antwort"},{"id":"beamer","name":"Beamer-Gruppe","template":"T6","icon":"users","kurz":"ganze Crew vor dem Beamer, nur Weiter"}],"spiele":{"probelauf":{"id":"probelauf","name":"Probelauf","thema":"ankommen","format":"beamer","formatName":"Beamer-Gruppe","dauer":"3–4 Min","text":"Neu (Lücke aus der Kritik): Drei harmlose Fragen am Beamer (Lieblingsessen, Spiel, Wetter) – und die einzige Regel ist, dass jede:r einmal passt, einmal die X-Karte zieht und einmal „Stopp“ sagt. Das Spiel tut dann sichtbar nichts: Die Karte verschwindet, kein Kommentar, kein Punkt. Die Crew erlebt in Stunde 1, dass Passen wirklich folgenlos ist.","foerdert":"Sicherheit erleben, Stopp-Recht, Passen ohne Scham (SOZ-32, V-22)","eldib":["SOZ-32","V-22"],"einheiten":["j1-e01"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"regel-radar":{"id":"regel-radar","name":"Regel-Radar","thema":"ankommen","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"5–7 Min","text":"Vier Alltagsszenen als Bild (Gruppenchat, Bus, Pausenhof, Gruppenarbeit); pro Szene tippst du 1–2 Regel-Chips aus eurem Vertrag oder „Hier fehlt eine Regel“. Vergleichskarte zu zweit, und wer eine Lücke findet, ändert den echten Vertrag – das steht im Vordergrund, nicht das Antippen.","foerdert":"Verbindlichkeit, Regeln auf Alltag übertragen, Mitbestimmung (SOZ-32, K-32)","eldib":["SOZ-32","K-32"],"einheiten":["j1-e01","j1-e02"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"frag-weiter":{"id":"frag-weiter","name":"Frag weiter!","thema":"ankommen","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Eine Figur antwortet knapp („War im Sommer weg.“). Das Paar wählt aus 12 Frage-Chips drei Nachfragen; bei guten geht die Tür-Anzeige auf, bei Ja/Nein-Fragen bleibt sie zu. Runde 2 live mit harmlosen echten Antworten, Tausch. Zusatzfrage: „Welche Nachfrage willst du nicht gestellt bekommen?“ (Grenzen).","foerdert":"Nachfragen statt Ja/Nein, Interesse zeigen, Zuhören, Grenzen beim Nachfragen (SOZ-31, SOZ-32, K-26)","eldib":["SOZ-31","SOZ-32","K-26"],"einheiten":["j1-e02","j1-e21"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"pilot-navigator":{"id":"pilot-navigator","name":"Pilot & Navigator","thema":"ankommen","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Bildschirm geteilt: Der Navigator sieht den Weg durchs Gitter, der Pilot steuert nach Ansage. Ein großer Stopp-Knopf stoppt sofort, egal wer drückt. Runde 1 ohne Rückfragen, Runde 2 mit – danach liegen beide Wege übereinander und zeigen, wessen Ansage den Crash gebaut hat (ohne Schuld).","foerdert":"Kooperation, führen und sich führen lassen, Stopp-Recht, präzise Sprache (SOZ-32, K-26, V-22)","eldib":["SOZ-32","K-26","V-22"],"einheiten":["j1-e03","j1-e20"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"stummer-aufbau":{"id":"stummer-aufbau","name":"Stummer Aufbau","thema":"ankommen","format":"rollen","formatName":"Rollen-Puzzle","dauer":"5–7 Min","text":"Neu (Lücke): Jedes iPad zeigt per Tagescode ein Stück eines Bildes (Crew-Logo, Skyline des HQ). Ohne ein Wort legt die Crew die iPads so, dass das Bild entsteht; der Beamer zählt die Sekunden. Durchgang 2 mit Worten – welcher war schneller, welcher entspannter?","foerdert":"Kooperation ohne Absprache, nonverbale Abstimmung, Teambuilding (SOZ-18, SOZ-32, K-29)","eldib":["SOZ-18","SOZ-32","K-29"],"einheiten":["j1-e03"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"staerken-spion":{"id":"staerken-spion","name":"Stärken-Spion","thema":"ankommen","format":"beamer","formatName":"Beamer-Gruppe","dauer":"2 Min Start + 3 Min Ende","text":"Läuft über ein anderes Spiel: Vor dem Start zieht jede:r geheim eine Rolle – fast alle „Crew“, ein bis zwei bekommen eine Karte: „Merk dir ein Ding, das jemand gut gemacht hat“ oder eine Schutzengel-Aufgabe („Achte, dass jede:r einmal drankommt“). Nach dem Spiel: „Spione, aufdecken!“ – der Spion sagt nur, WAS er gesehen hat, die Crew rät das Stärke-Wort. Werwolf-Gefühl ohne Verräter.","foerdert":"Fremdwahrnehmung, Stärken am Verhalten benennen, Rückmeldung geben und annehmen (K-20, K-28, SOZ-33)","eldib":["K-20","K-28","SOZ-33"],"einheiten":["j1-e06","j1-e02","j1-e03","j1-e30"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"crew-rat":{"id":"crew-rat","name":"Crew-Rat","thema":"ankommen","format":"beamer","formatName":"Beamer-Gruppe","dauer":"6–10 Min","text":"Die Crew entscheidet etwas Echtes (nächstes Pausen-Spiel, Imbiss, Vertrags-Ergänzung): Vorschläge sammeln, Runde „Was spricht dagegen?“, dann Konsent statt Abstimmung – „Wer kann damit leben?“, Veto nur mit Grund. Stille tippen „Einwand“ per Chip. Der Beschluss landet als Karte im HQ.","foerdert":"Mitbestimmung, Verlieren können, Einwände formulieren, Verbindlichkeit (SOZ-32, K-32, SOZ-33)","eldib":["SOZ-32","K-32","SOZ-33"],"einheiten":["j1-e01","j1-e03","j1-e30"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"erster-eindruck":{"id":"erster-eindruck","name":"Erster Eindruck","thema":"ankommen","format":"rollen","formatName":"Rollen-Puzzle","dauer":"7–9 Min","text":"Nur eine Silhouette und zwei Oberflächen-Infos (Kapuze, laute Musik im Bus); jede:r tippt heimlich zwei „Erster Gedanke“-Chips. Dann zeigt jedes iPad einen anderen echten Fakt über die Figur, die Crew tauscht sie aus und tippt gemeinsam den „Zweiten Blick“. Erste Gedanken bleiben anonym als Wolke.","foerdert":"Vorurteile bemerken ohne Scham, Vielfalt, Nachfragen statt Urteilen (SOZ-31, K-29)","eldib":["SOZ-31","K-29"],"einheiten":["j1-e05","j1-e02","j1-e26"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"echter-freund":{"id":"echter-freund","name":"Echte Freunde?","thema":"ankommen","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Neu (Lücke Freundschaft & Vertrauen): Acht kurze Szenen, was eine Freund-Figur tut (verteidigt dich im Chat, erzählt dein Geheimnis weiter, meldet sich nur, wenn sie was braucht, kommt, wenn’s dir schlecht geht). Das Paar sortiert grüne / rote Flagge / kommt drauf an. Danach: „Wem von diesen Figuren würde Mika eine schlechte Note erzählen – wem den Streit zu Hause?“ – über die Figur, Pass erlaubt.","foerdert":"Vertrauen einschätzen, Freundschaft an Verhalten erkennen, eigene Grenzen beim Erzählen (SOZ-31, SOZ-37, K-29)","eldib":["SOZ-31","SOZ-37","K-29"],"einheiten":["j1-e02","j1-e22","j1-e26"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"tank-detektiv":{"id":"tank-detektiv","name":"Tank-Detektiv","thema":"ich","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Eine Figur zeigt Verhalten (schnappt bei jedem Kommentar, scrollt seit zwei Stunden, hängt nur im Zimmer). Das Paar einigt sich, welcher der sechs Tanks leer ist, und wählt den kleinsten Schritt, der ihn füllt. Bei einem Wunsch statt Bedürfnis („neue Sneaker“) bleibt der Tank leer – „Rückfrage nötig“, nie „falsch“. Detektiv, nicht Patient.","foerdert":"Bedürfnis vs. Wunsch, Verhalten als Signal lesen, kleine Schritte planen (K-21, K-26, V-25)","eldib":["K-21","K-26","V-25"],"einheiten":["j1-e04","j1-e29"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"dahinter":{"id":"dahinter","name":"Was steckt dahinter?","thema":"ich","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–7 Min","text":"Beamer zeigt den Wunsch einer Figur („mehr Follower“, „neue Konsole“, „Ruhe“). Zwei Raumseiten Wunsch / Bedürfnis, Mitte „kommt drauf an“, 10 Sekunden gehen, Stopp. Die größte Gruppe sagt, welcher Tank dahintersteckt – Gruppen antworten, nie Einzelne. Streit bei „mehr Follower“ garantiert.","foerdert":"Wunsch von Bedürfnis trennen, Meinung begründen (K-26, SOZ-32)","eldib":["K-26","SOZ-32"],"einheiten":["j1-e04"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"kleiner-schritt":{"id":"kleiner-schritt","name":"Kleiner Schritt","thema":"ich","format":"solo","formatName":"Solo","dauer":"4–6 Min","text":"Eine Figur hat ein zu großes Ziel („besser in Mathe“). Der Machbar-Meter steht auf Rot; mit drei Taps (Wann? Wo? Wie klein?) schrumpft das Ziel, und der Meter wird erst grün, wenn der Schritt winzig ist – mit Wenn-dann-Satz. Danach optional das Gleiche für dich, nur auf dem Bildschirm, X löscht.","foerdert":"Ziele zerlegen, Wenn-dann-Pläne, kleine Erfolge (V-25, KOG-38)","eldib":["V-25","KOG-38"],"einheiten":["j1-e04","j1-e29"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"je-nach-ort":{"id":"je-nach-ort","name":"Je nach Ort","thema":"ich","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Fünf Orte per Tagescode (Fußballplatz, Arztpraxis, Familienessen, Gruppenchat, neue Klasse); pro Ort drei Regler laut–leise, schnell–langsam, nah–Abstand. Ergebnis: fünf farbige Streifen, „du bist je nach Ort anders“. Beim Vergleich rät der Partner zuerst, wo ihr am weitesten auseinander liegt – „anders“, nie „richtiger“.","foerdert":"Selbstbild je nach Situation, Vielfalt ohne Bewertung (K-19, K-26, SOZ-31)","eldib":["K-19","K-26","SOZ-31"],"einheiten":["j1-e05"],"abschluss":true,"top":false,"aufwand":"M","gebaut":true},"zwei-brillen":{"id":"zwei-brillen","name":"Zwei Brillen","thema":"ich","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"Eine Szene um Yara (hat in der Gruppenarbeit kaum geredet): iPad A zeigt, wie sie sich selbst sieht, B die Freundin, C die Lehrkraft, D nur die Tatsachen. Die Crew wählt aus sechs Chips die zwei, die zu allen vier Sichten passen. Pointe: Die eigene Brille ist fast immer die strengste – ohne dass jemand über sich reden muss.","foerdert":"Selbst- und Fremdbild, Tatsache vs. Urteil anbahnen, Zuhören (K-19, K-26, KOG-38, SOZ-31)","eldib":["K-19","K-26","KOG-38","SOZ-31"],"einheiten":["j1-e05","j1-e18"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"staerke-einsatz":{"id":"staerke-einsatz","name":"Stärke im Einsatz","thema":"ich","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"6–8 Min","text":"Das iPad zeigt eine Mini-Mission („Morgen Vortrag, Zettel verloren“, „Kleine Schwester wird im Bus geärgert“). Wer dran ist, wählt aus 12 Stärken-Karten eine und sagt in einem Satz, wie genau; die nächste Person muss für dieselbe Mission eine andere Stärke finden. Jede Stärke wird ein Block im Stärken-Turm. Bei „Kumpel schreibt nachts: Alles scheiße“ erscheint der Hilfe-Hinweis.","foerdert":"Stärken als Werkzeug statt Etikett, Ideen anderer aufgreifen (K-19, K-20, K-28, SOZ-33)","eldib":["K-19","K-20","K-28","SOZ-33"],"einheiten":["j1-e06","j1-e19"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"vergleichs-falle":{"id":"vergleichs-falle","name":"Vergleichs-Falle","thema":"ich","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Ein Fake-Profil im Glimmr-Look (Strandfoto, „Beste Freunde“-Post, 2 000 Follower) und Luca, der es anschaut. Das Paar tippt, womit Luca sich vergleicht, dreht dann die Posts um (gestellt, dreimal gefiltert, der Streit danach) und wählt drei Dinge, die Luca wertvoll machen und in keinem Feed stehen. Der Körper-Chip steht bewusst nicht im Vordergrund.","foerdert":"Selbstwert ohne Vergleich, Social Media als Quelle bremsender Sätze (K-19, K-28, KOG-58)","eldib":["K-19","K-28","KOG-58"],"einheiten":["j1-e16","j1-e27"],"abschluss":true,"top":false,"aufwand":"M","gebaut":true},"gefuehls-funk":{"id":"gefuehls-funk","name":"Gefühls-Funk","thema":"gefuehle","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"A sieht die Szene, B das Gefühls-Lexikon als Icon-Karte (sechs Familien, höchstens vier Wörter je Familie), C die Körper-Signale als Icons, D die Botschafts-Karte („Angst sagt: pass auf“). Nur zusammen finden sie Gefühl, genaueres Wort, Botschaft und Handlung; „Noch nicht – fragt nochmal nach“ statt falsch. Beobachter-Rolle für wer passen will.","foerdert":"Gefühlswörter zuordnen, Botschaft eines Gefühls, zuhören und nachfragen (K-10, K-21, KOG-38, SOZ-18)","eldib":["K-10","K-21","KOG-38","SOZ-18"],"einheiten":["j1-e07"],"abschluss":true,"top":false,"aufwand":"M","gebaut":true},"pult-tausch":{"id":"pult-tausch","name":"Pult-Tausch","thema":"gefuehle","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Zwei Szenen per Tagescode (Note vor der Klasse, im Chat auf „gelesen“ gelassen), Vorlese-Knopf. Du wählst, welches Gefühl bei der Figur am Steuerpult sitzt und was es tut; dann setzt das iPad ein anderes Gefühl ans Pult und du entscheidest neu – mit Rewind wie in Clash. Vergleichskarte: „Lief es mit dem Tausch besser oder schlechter – warum?“","foerdert":"Gefühl steuert Handeln, Gefühle begründen, Perspektivenwechsel (K-16, K-21, K-26, KOG-38)","eldib":["K-16","K-21","K-26","KOG-38"],"einheiten":["j1-e08"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"fruehwarn":{"id":"fruehwarn","name":"Frühwarn-Radar","thema":"gefuehle","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"5–8 Min","text":"Eine Figur geht durch eine Szene, der Kipp-Balken steigt, Körper-Signale erscheinen als Bild – erst leise (Kiefer fest), dann laut (Faust). Das Paar tippt mit zwei Fingern „Stopp“, wählt das Gefühl und einen Mini-Move, der jetzt noch geht; statt Punkten gibt es „gewonnene Sekunden“. Bewegungs-Variante „Signal-Stopp“: alle gehen durch den Raum, beim Signal einfrieren und eine Skill-Geste zeigen – Crew-Stern, wenn alle vor 70 stehen.","foerdert":"Erstes Warnsignal für Wut und Angst erkennen, rechtzeitig handeln (K-16, K-21, V-21, V-25)","eldib":["K-16","K-21","V-21","V-25"],"einheiten":["j1-e09","j1-e11"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"mixer":{"id":"mixer","name":"Gefühls-Mixer","thema":"gefuehle","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Zu einer Situation (letzter Schultag, Umzug, erstes Date) mischst du am DJ-Pult zwei bis drei Gefühle mit Reglern; der Mix wird Farbe und Sound (offline, ohne Kopfhörer leise). Vor dem Vergleich hört das Paar beide Mixe und rät, welcher Regler beim anderen oben war – das ist der Spiel-Moment. Überschrift: „Beide Mixe sind richtig.“","foerdert":"Gemischte Gefühle, Gefühlsstärke, dieselbe Situation – andere Mischung (K-26, K-29, SOZ-31)","eldib":["K-26","K-29","SOZ-31"],"einheiten":["j1-e10"],"abschluss":true,"top":false,"aufwand":"M","gebaut":true},"pegel-reihe":{"id":"pegel-reihe","name":"Pegel-Reihe","thema":"skills","format":"rollen","formatName":"Rollen-Puzzle","dauer":"6–8 Min","text":"Jedes iPad zeigt eine Figur in einer Situation mit versteckter Anspannungszahl 0–100 (Test morgen, Handy weg, Lob vom Trainer). Ohne ein Wort legt die Crew die iPads von niedrig nach hoch – wer glaubt, die niedrigste zu haben, legt zuerst. Aufdecken, Kipper leuchten, „2 Kipper – trotzdem geschafft“. Die Lehrkraft tippt nichts.","foerdert":"Skala 0–100 auf Alltag anwenden, nonverbale Signale lesen, Kooperation ohne Worte (V-25, K-29, SOZ-18)","eldib":["V-25","K-29","SOZ-18"],"einheiten":["j1-e11"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"innen-aussen":{"id":"innen-aussen","name":"Innen/Außen","thema":"skills","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"5–7 Min","text":"Hand-drauf-Modus: A sieht nur das Außen der Figur (was sie tut und sagt), B nur das Innen (Herz, Gedankentempo). Jede Seite tippt verdeckt eine Zahl 0–100 und „Deckel drauf / Deckel ab“, dann Reveal und Einigung. Eine Figur wirkt außen völlig ruhig und steht innen bei 85.","foerdert":"Handmodell anwenden, Anspannung einschätzen, Perspektivenwechsel innen/außen (V-21, K-21, K-29)","eldib":["V-21","K-21","K-29"],"einheiten":["j1-e11"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"undercover":{"id":"undercover","name":"Undercover-Skill","thema":"skills","format":"bewegung","formatName":"Bewegung im Raum","dauer":"6–10 Min","text":"Der Beamer zeigt einen Ort (Test, Bus, Familientisch); die Crew sitzt, als wäre sie dort. Ein Paar zieht verdeckt einen Körper-Skill als Bild (Faust anspannen und lösen, Fußdruck, langer Ausatem) und macht ihn 30 Sekunden – die anderen beobachten. Nicht erwischt = alltagstauglich, Stern. Paar-Modus ist Standard, Beobachter-Rolle und Pass sichtbar.","foerdert":"Körper-Skills unauffällig anwenden, Skills an Orte binden, Fremdwahrnehmung (V-21, V-25, K-20)","eldib":["V-21","V-25","K-20"],"einheiten":["j1-e12"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"sinnesjagd":{"id":"sinnesjagd","name":"Sinnes-Jagd","thema":"skills","format":"bewegung","formatName":"Bewegung im Raum","dauer":"8–10 Min","text":"Jedes Paar bekommt drei Aufträge („etwas Kälteres als eure Hand“, „ein Geräusch, das nur ihr beide hört“), legt das iPad weg und sucht 90 Sekunden – nur im Klassenraum und Flur in Sichtweite. Zurück wird der Fund dem Fach zugeordnet. Der eigentliche Kern danach: „Hosentaschen-Pack“ – je ein Sinnes-Skill für Bus, Schulhof und Bett nachts.","foerdert":"Sinnes-Skills im Raum finden, Skills für Orte auswählen (V-24, V-25, SOZ-18)","eldib":["V-24","V-25","SOZ-18"],"einheiten":["j1-e13"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"gelb-rot":{"id":"gelb-rot","name":"Gelb oder Rot?","thema":"skills","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–8 Min","text":"Umgebaut nach der Kritik (kein Handzeichen-Zählen mehr): Zwei Wände, Gelb und Rot. Der Beamer zeigt eine Figur mit Zahl, Ort und einem Kopf-Skill (Gedankenstopp, „Es ist nur ein Gedanke“). Zieht der Skill hier noch, oder braucht es erst den Körper? Gehen, Stopp, die kleinere Wand erklärt zuerst, die Folge-Szene zeigt, was passiert. Bei Rot baut die Crew per Zuruf „erst Körper, dann Kopf“.","foerdert":"Kopf-Skills richtig einordnen, Reihenfolge Körper vor Kopf, Entscheidungen begründen (V-25, KOG-38)","eldib":["V-25","KOG-38"],"einheiten":["j1-e14"],"abschluss":true,"top":false,"aufwand":"S","gebaut":true},"skill-sprechstunde":{"id":"skill-sprechstunde","name":"Skill-Sprechstunde","thema":"skills","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"6–8 Min","text":"Ein iPad wandert: eine Figur mit Zahl (z. B. 80), Ort und Warnsignal. Du wählst aus fünf großen Koffer-Icons (Körper / Sinne / Kopf / Reden / Erwachsene Person) einen Skill und sagst in einem Satz, warum – Satzanfänge hinter „Tipp“. Die Crew darf einmal pro Runde „Veto“ rufen (Kopf-Skill bei 80), dann wird gemeinsam korrigiert. Pass gibt weiter, ohne Kommentar.","foerdert":"Koffer und Ampelplan anwenden, Skill zur Zahl wählen, Kritik annehmen (V-25, K-28, SOZ-26)","eldib":["V-25","K-28","SOZ-26"],"einheiten":["j1-e15"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"ampel-woche":{"id":"ampel-woche","name":"Ampel-Woche","thema":"skills","format":"solo","formatName":"Solo","dauer":"5–7 Min","text":"Fünf Szenen einer Woche (Montag Bus bis Freitag Abend). Vorher tippst du die fünf Fächer deines echten Koffers an (nur lokal). Bei jeder Szene wählst du Grün / Gelb / Rot und einen Skill; die Figur reagiert, die Wochenkurve wächst, Replay mit anderen Entscheidungen. Bei Rot ohne erwachsene Person erinnert das Spiel an die Notfallkarte.","foerdert":"Ampelplan durchspielen, Warnsignal–Farbe–Skill verbinden, Hilfe holen bei Rot (V-21, V-25, V-27)","eldib":["V-21","V-25","V-27"],"einheiten":["j1-e15"],"abschluss":false,"top":false,"aufwand":"M","gebaut":true},"kipp-punkt":{"id":"kipp-punkt","name":"Kipp-Punkt","thema":"skills","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"6–8 Min","text":"Story-Staffel mit der Clash-Engine, nur ist die Hitze diesmal im Körper der Figur: Der Beamer startet eine Wut-Szene, das iPad wandert, jede Person sieht Pegel und nächsten Trigger und wählt einen Zug als Icon (Warnsignal + Skill, kurz raus, einen Satz sagen, draufhalten) und begründet ihn in einem Satz. Crew-Ziel: unter 70 bleiben und am Ende sagen, was die Figur braucht.","foerdert":"Wut früh bremsen, erst runter, dann reden, Folgen abschätzen (V-20, V-21, V-26, K-26)","eldib":["V-20","V-21","V-26","K-26"],"einheiten":["j1-e09","j1-e11","j1-e24"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"blackout":{"id":"blackout","name":"Blackout","thema":"skills","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Neu (Lücke Prüfungsangst): Figur Sam sitzt vor dem Test, der Pegel steigt, die Buchstaben verschwimmen – Blackout. An vier Stellen wählst du einen Zug (Fußdruck unter dem Tisch, leichteste Aufgabe zuerst, Hand heben und Wasser holen, „Ich kann nichts“ zu Ende denken) und siehst, wie viel Sam noch lesen kann. Vergleichskarte: „Was machst du vor einem Test – und was hat dir noch nie geholfen?“ Pass erlaubt.","foerdert":"Leistungsangst und Scham regulieren, Skills unter Druck, Kopf-Skills bei Gelb (V-21, V-25, KOG-38)","eldib":["V-21","V-25","KOG-38"],"einheiten":["j1-e11","j1-e12","j1-e14"],"abschluss":true,"top":false,"aufwand":"M","gebaut":true},"mein-ort":{"id":"mein-ort","name":"Mein Ort","thema":"skills","format":"solo","formatName":"Solo","dauer":"3–5 Min","text":"Statt einer vorgelesenen Traumreise baust du deinen Ort aus Bausteinen: Licht, Wetter, Klang-Layer (Regen, Meer, Zug), Temperatur, ein Gegenstand. Daraus wird eine Ambient-Szene mit Sound für 1–3 Minuten, Zahl 0–100 vorher und nachher, das Rezept bleibt auf dem Gerät. Nur bauen, wenn die Sound-Layer wirklich gut klingen.","foerdert":"Sicheren Ort selbst gestalten, Selbstregulation bei Gelb, Wirkung messen (V-21, V-25, K-23)","eldib":["V-21","V-25","K-23"],"einheiten":["j1-e14"],"abschluss":false,"top":false,"aufwand":"L","gebaut":true},"gedanken-weiche":{"id":"gedanken-weiche","name":"Gedanken-Weiche","thema":"gedanken","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"7–9 Min","text":"Eine Situation („Mika schreibt in die Gruppe, keiner antwortet“) und eine Weiche mit zwei Gedanken-Gleisen. Das Paar sagt pro Gleis mit Icon-Chips voraus, welches Gefühl und welches Verhalten folgt; dann fährt der Zug beide Gleise ab und zeigt die Ausgänge als Comic-Panels. „Vorhersage stimmt“ statt richtig/falsch. Am Ende: „Welche Weiche hättet ihr genommen – ehrlich?“ (über die Figur).","foerdert":"Kette Situation–Gedanke–Gefühl–Verhalten, hilfreich vs. bremsend (KOG-38, K-21, K-26)","eldib":["KOG-38","K-21","K-26"],"einheiten":["j1-e16"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"woher-satz":{"id":"woher-satz","name":"Woher kommt der Satz?","thema":"gedanken","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Bewusst nur Figuren, nie eigene Sätze: Vier Teen-Figuren mit bremsenden Sätzen („Ich bin halt nicht so schlau“) und je drei Hinweis-Schnipsel, die wie echte Chats und Feeds aussehen (ein Spruch, ein Vergleich mit dem Bruder, eine einzige blöde Erfahrung – nichts Gewaltnahes). Quelle antippen, „Stimmt der Satz heute noch?“, dann zeigt das iPad, was die Figur geschafft hat. Knopf „Kenne ich“ ohne Zählung: „Du bist damit nicht allein.“","foerdert":"Quellen von Glaubenssätzen, „stimmt er heute noch?“, Entlastung (KOG-38, K-19, K-26)","eldib":["KOG-38","K-19","K-26"],"einheiten":["j1-e17"],"abschluss":true,"top":false,"aufwand":"M","gebaut":false},"tatsache-urteil":{"id":"tatsache-urteil","name":"Tatsache oder Urteil?","thema":"gedanken","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–6 Min","text":"Zwei Wände, Tatsache / Urteil. Sätze im Chat-Look („Ich hab die Mathe-Arbeit verhauen“, „Ich bin dumm“, „Alle finden mich langweilig“), 10 Sekunden gehen, Stopp; die Urteil-Wand sagt, welche Tatsache dahintersteckt. Mitte erlaubt und wird zuerst gefragt; wer allein steht, darf bleiben und nichts sagen. Blitzrunde mit drei Sätzen à 5 Sekunden.","foerdert":"Tatsache von Urteil trennen, schnelle realistische Antwort auf bremsende Sätze (KOG-38, K-19)","eldib":["KOG-38","K-19"],"einheiten":["j1-e18"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"satz-werkstatt":{"id":"satz-werkstatt","name":"Satz-Werkstatt","thema":"gedanken","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"Gekürzt nach der Kritik: A sieht Figur und bremsenden Satz, B vier Regeln als Icons (realistisch, kurz, ohne „immer/nie“, Ich-Form), C zwei Beweis-Karten, D die Bausteine und baut den neuen Satz nach Ansage. B prüft laut, jede erfüllte Regel leuchtet am Beamer – „3 von 4, ihr habt noch ein ‚nie‘ drin!“ Vorlese-Knopf für D, Beobachter-Rolle für wer passen will.","foerdert":"Reframing nach Regeln, Beweise nutzen, klare Rollen, Feedback annehmen (KOG-38, K-28, SOZ-32)","eldib":["KOG-38","K-28","SOZ-32"],"einheiten":["j1-e18","j1-e19"],"abschluss":true,"top":false,"aufwand":"L","gebaut":false},"beweis-jaeger":{"id":"beweis-jaeger","name":"Beweis-Jäger","thema":"gedanken","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Oben der neue Satz einer Figur („Ich kann Dinge lernen, wenn ich dranbleibe“), darunter ziehen sieben Momente der Woche vorbei – Swipe: Beweis oder kein Beweis. Die Bilanz als Lupe, dann die Trick-Frage: „Hast du den verhauenen Test als Gegenbeweis gezählt – oder als Teil von dranbleiben?“ Dazu drei Haltungs-Scans (alter oder neuer Satz im Kopf?). Eigene Beweise nur besprechen, nichts eingeben.","foerdert":"Beweise im Alltag sammeln, Rückschläge einordnen, Körper und Gedanke verbinden (KOG-38, K-19, K-26)","eldib":["KOG-38","K-19","K-26"],"einheiten":["j1-e19"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"haltungs-switch":{"id":"haltungs-switch","name":"Haltungs-Switch","thema":"gedanken","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"5–7 Min","text":"Ein Paar (Standard, nicht Ausnahme) sieht verdeckt eine Figur mit altem oder neuem Satz im Kopf und sagt einen neutralen Satz („Ich mach das jetzt.“) mit passender Haltung und Stimme. Die Crew ruft alt oder neu – und woran (Schultern / Stimme / Tempo / Blick). Pass steht groß auf dem Bildschirm und gibt das iPad sofort weiter.","foerdert":"Gedanke–Haltung–Stimme erleben, nonverbale Signale lesen (K-19, KOG-38, K-29)","eldib":["K-19","KOG-38","K-29"],"einheiten":["j1-e19","j1-e20"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"uebersetzer":{"id":"uebersetzer","name":"Übersetzer","thema":"kommunikation","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"5–7 Min","text":"Umgebaut nach der Kritik (kein Daumen-Zählen): Eine Chat-Nachricht mit Emoji („ok 👍“, „ja klar.“, „mach doch 🙃“). Beide tippen verdeckt, wie sie es lesen (nett / ironisch / sauer / egal), Reveal – bei „verschieden“ sagt jede:r in einem Satz, warum, dann wählt das Paar gemeinsam die Rückfrage, die es klärt, und die Figur antwortet. Variante: drei Ecken im Raum.","foerdert":"Missverständnisse in Chat und Emoji, Rückfragen statt Annahmen (K-29, SOZ-31, K-26)","eldib":["K-29","SOZ-31","K-26"],"einheiten":["j1-e20"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"stillepost":{"id":"stillepost","name":"Stille Post ohne Worte","thema":"kommunikation","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–7 Min","text":"Die Crew steht in einer Reihe, nur die letzte Person sieht die Botschaft („genervt, 7“ oder „Komm mit“). Sie gibt sie nur mit Körper und Gesicht weiter – Signalwort oder Klopfen auf den Tisch statt Schultertippen, kein Körperkontakt. Vorn wird angetippt, was ankam; der Beamer zeigt Start und Ziel. Runde 3 mit einem erlaubten Wort. Beobachter-Rolle wird ausdrücklich angeboten.","foerdert":"Körpersprache senden und lesen, Grenzen des Nonverbalen (K-29, SOZ-37, K-21)","eldib":["K-29","SOZ-37","K-21"],"einheiten":["j1-e20"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"funkstille":{"id":"funkstille","name":"Funkstille – der Chat kippt","thema":"kommunikation","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"A sieht einen Chat, der gerade kippt, und sechs mögliche Nachrichten; B hat die Ich-Botschaft-Regel als Icon-Karte; C sieht, welche Nachrichten eine Grenze der Figur überschreiten; D den Pegel (bei 80: erst Skill, dann Text). Nur zusammen finden sie die eine Nachricht, die alles erfüllt. Kein Countdown, „Fragt nochmal nach“ statt falsch. Keep Talking and Nobody Explodes für Gruppenchats.","foerdert":"Ich-Botschaften anwenden, Grenzen erkennen, Anspannung einschätzen, Team-Entscheidung (K-31, K-26, SOZ-31, SOZ-37)","eldib":["K-31","K-26","SOZ-31","SOZ-37"],"einheiten":["j1-e21","j1-e23"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"zuhoerfalle":{"id":"zuhoerfalle","name":"Zuhör-Falle","thema":"kommunikation","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"5–7 Min","text":"Eine Figur erzählt 20 Sekunden (Vorlesestimme plus Untertitel). Du wählst aus vier Antworten die, bei der sie sich verstanden fühlt – eine trifft Inhalt und Gefühl, eine übersieht das Gefühl, eine gibt Ratschläge, eine klaut das Thema („Ich auch …“). Das Verstanden-Meter zeigt es. Vergleichskarte: „Welche Falle passiert dir eher: Ratschlag oder Ich-auch?“","foerdert":"Aktives Zuhören, Gefühl zusammenfassen, Zuhör-Fallen erkennen (K-26, SOZ-31, SOZ-37)","eldib":["K-26","SOZ-31","SOZ-37"],"einheiten":["j1-e21"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"okayradar":{"id":"okayradar","name":"Okay-Radar","thema":"kommunikation","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"5–7 Min","text":"Fünf Szenen, je ein Satz plus Bild (Foto gepostet ohne zu fragen, Umarmung zur Begrüßung, jemand scrollt durch dein Handy, Spitzname vor der Klasse). Jede:r wählt heimlich okay / nicht okay / kommt drauf an (auf wen?). Die Vergleichskarte sagt es selbst: „Bei dir okay, bei mir nicht. Beides gilt.“","foerdert":"Eigene Grenzen wahrnehmen, Grenzen anderer respektieren, Unterschiede aushalten (SOZ-37, SOZ-39, K-29)","eldib":["SOZ-37","SOZ-39","K-29"],"einheiten":["j1-e22"],"abschluss":true,"top":true,"aufwand":"S","gebaut":false},"naeher-nicht":{"id":"naeher-nicht","name":"Näher nicht","thema":"kommunikation","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–7 Min","text":"Neu (Lücke Wohlfühl-Distanz): Bodenmarken 1–5 vor dem Beamer. Ein Avatar kommt Schritt für Schritt näher – als Freundin, Lehrer, Fremder im Bus, Verwandter zur Begrüßung. Jede:r stellt sich auf die Marke, ab der es für sie oder ihn „näher nicht“ heißt; die Position ist die Antwort, Gruppen reden („Beim Fremden stehen wir alle auf 4“). Keine echte Person kommt jemandem nahe.","foerdert":"Wohlfühl-Distanz spüren, Grenzen je nach Person, Nein ohne Worte (SOZ-37, SOZ-39, K-29)","eldib":["SOZ-37","SOZ-39","K-29"],"einheiten":["j1-e22"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"stoppcheck":{"id":"stoppcheck","name":"Stopp-Check","thema":"kommunikation","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Eine Figur sagt Stopp – aber etwas stimmt nicht: Sie lächelt, schaut weg, ist zu leise, redet zu viel. Das Paar findet den Fehler wie im Wimmelbild und baut das Stopp mit fünf Bausteinen neu; das Gegenüber weicht sofort zurück oder nicht. Runde 2 „Nachhaken“: Das Gegenüber bohrt nach, das Paar wählt das zweite Stopp.","foerdert":"Grenzen klar setzen (Haltung, Blick, Hand, Stimme, kurze Worte), Stopp unter Nachhaken halten (K-29, SOZ-39)","eldib":["K-29","SOZ-39"],"einheiten":["j1-e23"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"hitzeecken":{"id":"hitzeecken","name":"Hitze-Ecken","thema":"kommunikation","format":"bewegung","formatName":"Bewegung im Raum","dauer":"6–8 Min","text":"Ein Streit-Satz am Beamer („Du hörst mir nie zu!“, „Mach doch, was du willst.“), vier Ecken: Klartext / Angriff / Abgetaucht / Getarnter Angriff. Gehen, Stopp, der Beamer zeigt die Reaktion der anderen Figur. Zusatzzug: Die Angriff-Ecke hat 20 Sekunden, den Satz als Klartext neu zu sagen – gelingt es, sinkt die Hitze für alle. Ecken werden gefragt, nicht Einzelne.","foerdert":"Du- und Ich-Botschaften erkennen, getarnte Vorwürfe durchschauen, umformulieren (K-31, V-26, SOZ-31)","eldib":["K-31","V-26","SOZ-31"],"einheiten":["j1-e21","j1-e24"],"abschluss":true,"top":true,"aufwand":"S","gebaut":true},"familienfunk":{"id":"familienfunk","name":"Familien-Funk","thema":"kommunikation","format":"solo","formatName":"Solo","dauer":"5–6 Min","text":"Eine Figur will zu Hause etwas aushandeln (länger wach, Handy nach 22 Uhr); die Elternfigur reagiert, du wählst aus drei Antworten (Ich-Botschaft mit Vorschlag / Vorwurf / Türknall). Vertrauens- und Hitze-Meter zeigen die Rechnung, Zurückspulen wie bei Clash. Drei Szenen, nur erfundene Familien, bewusst ohne Vergleichskarte; am Ende „Mit jemandem drüber reden“ mit 116 111.","foerdert":"Freiraum aushandeln mit Ich-Botschaft, Kompromiss statt Türknall (K-31, V-26, SOZ-34)","eldib":["K-31","V-26","SOZ-34"],"einheiten":["j1-e21","j1-e24"],"abschluss":false,"top":false,"aufwand":"M","gebaut":false},"storystaffel":{"id":"storystaffel","name":"Story-Staffel: Der Streit","thema":"konflikt","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"8–10 Min","text":"Der Beamer zeigt den Start eines Alltagsstreits (Kopfhörer, Gruppenarbeit, Platz im Bus) mit Hitze-Meter. Das iPad wandert: „Nur du schaust“ – drei Züge als Icons (Klartext / Angriff / Abtauchen) mit Satzanfang als Tipp; die Geschichte und die Hitze ändern sich am Beamer. Ziel: in höchstens sechs Zügen zum Deal. Jede Person baut auf dem Zug der vorigen auf. Clash, nur die ganze Crew steuert nacheinander.","foerdert":"Konflikt-Treppe anwenden, Eskalation erkennen, Ich-Botschaften, Verantwortung im Team (V-26, K-31, SOZ-34)","eldib":["V-26","K-31","SOZ-34"],"einheiten":["j1-e24"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"sorrywerkstatt":{"id":"sorrywerkstatt","name":"Sorry-Werkstatt","thema":"konflikt","format":"weitergeben","formatName":"Gerät weitergeben","dauer":"6–8 Min","text":"Nach einem Figuren-Streit wird eine Entschuldigung gebaut: Jede Person legt einen Baustein dazu oder nimmt einen weg – echte („Das war nicht okay von mir“) und Fake-Sorrys („Sorry, aber du hast angefangen“). Die Figur reagiert sofort mit Stimmung; wer einen Fake-Baustein entfernt, sagt in einem Satz, warum. Ein „aber“ im Sorry, und der Chat ist wieder auf 80.","foerdert":"Echte Entschuldigung vs. Rechtfertigung, Wiedergutmachung, Verantwortung (SOZ-34, K-31, V-26)","eldib":["SOZ-34","K-31","V-26"],"einheiten":["j1-e24"],"abschluss":true,"top":true,"aufwand":"S","gebaut":false},"dealoderkein":{"id":"dealoderkein","name":"Deal oder kein Deal","thema":"konflikt","format":"beamer","formatName":"Beamer-Gruppe","dauer":"8–10 Min","text":"Zwei Figuren wollen Verschiedenes (Musik laut vs. lernen; Freunde vs. Geschwister-Geburtstag). Die Crew teilt sich, jede Seite sieht auf dem Team-iPad verdeckt, was ihre Figur wirklich braucht. 90 Sekunden Verhandlung, jede Seite muss mindestens eine Frage stellen, bevor sie den Deal nennt; die Lehrkraft tippt ihn einmal, beide Figuren reagieren („beide okay“ wird groß gefeiert).","foerdert":"Kompromisse aushandeln, Bedürfnis hinter dem Wunsch, verlieren können (V-26, SOZ-31, SOZ-34, K-32)","eldib":["V-26","SOZ-31","SOZ-34","K-32"],"einheiten":["j1-e24"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"hundert-prozent":{"id":"hundert-prozent","name":"100 Prozent","thema":"konflikt","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"Etwas ist schiefgelaufen (Gruppenarbeit ohne Teil 3, Screenshot beim Lehrer gelandet, Fenster kaputt). Jedes iPad zeigt, was eine der vier Figuren getan und gedacht hat. Die Crew verteilt am Beamer 100 % Verantwortung mit Reglern – niemand 0, niemand 100 – und wählt pro Figur einen Wiedergutmach-Zug. Kein „Wer war’s?“, sondern „Wie viel war’s?“","foerdert":"Verantwortung teilen statt Schuld schieben, Fairness, Wiedergutmachung (SOZ-34, K-31, V-26)","eldib":["SOZ-34","K-31","V-26"],"einheiten":["j1-e26","j1-e24"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"gerecht-oder-gleich":{"id":"gerecht-oder-gleich","name":"Gerecht oder gleich?","thema":"konflikt","format":"bewegung","formatName":"Bewegung im Raum","dauer":"6–8 Min","text":"Umgebaut nach der Kritik: Fairness-Dilemma mit Bild (Pizza für fünf, einer hat nichts gegessen; Gruppenarbeit, einer hat alles gemacht, eine Note für alle). Zwei Seiten im Raum A/B, Mitte „kommt drauf an“, 20 Sekunden gehen, die kleinere Seite spricht zuerst. Die Folge-Szene zeigt, wie es den Figuren geht, „Rewind“ zeigt den anderen Weg. Es gibt keine richtige Antwort, nur Folgen.","foerdert":"Fairness vs. Gleichheit, argumentieren, andere Meinung aushalten (SOZ-33, K-32)","eldib":["SOZ-33","K-32"],"einheiten":["j1-e01","j1-e24"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"druck-chat":{"id":"druck-chat","name":"Druck-Chat","thema":"konflikt","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"7–9 Min","text":"Ein simulierter Gruppenchat im Glimmr-Look, der Druck steigt leise („Dachte, du bist cool“, Emoji-Schweigen). An drei Stellen wählst du deine Nein-Art (klar / mit Grund / Ausweich-Nein / Nein + Alternative) oder „Mitmachen“; der Chat hakt nach, zweites Nein nötig. Drei Situationen: Vape am Bahnhof, Arbeit abschreiben, jemanden im Chat auslachen. Ende: „Chat beendet, du bist noch du.“ „Mitmachen“ wird nie rot markiert.","foerdert":"Leisen Gruppendruck erkennen, vier Arten Nein, zweites Nein, Wenn-dann-Plan (SOZ-39, K-31, V-26)","eldib":["SOZ-39","K-31","V-26"],"einheiten":["j1-e25","j1-e27"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"nein-trainer":{"id":"nein-trainer","name":"Nein-Trainer","thema":"konflikt","format":"solo","formatName":"Solo","dauer":"3–5 Min","text":"Sparring-Partner fürs Stundenende oder zu Hause: Eine Figur setzt per Sprachnachricht-Optik Druck („Nur dieses eine Mal“). Du wählst eine Nein-Art und sprichst den Satz im Kopf oder flüsternd mit (laut nur als Option), tippst „Gesagt“; die Figur hakt zweimal nach. Dreimal beim Nein geblieben = „Druck beendet“ plus Anker-Tipp. Nichts wird gespeichert.","foerdert":"Nein sagen üben ohne Publikum, zweites Nein, Anker vor dem Nein (SOZ-39, V-26, K-31)","eldib":["SOZ-39","V-26","K-31"],"einheiten":["j1-e25","j1-e23"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"vier-zeugen":{"id":"vier-zeugen","name":"Vier Zeugen","thema":"konflikt","format":"rollen","formatName":"Rollen-Puzzle","dauer":"8–10 Min","text":"Dieselbe Pausenhof- oder Chat-Szene auf vier iPads aus vier Sichten (Betroffene:r, Clique, Zuschauer:in, Lehrkraft), je zwei Sätze mit Vorlese-Knopf und einem Detail, das nur diese Sicht kennt („zum vierten Mal diese Woche“). Erst wenn jede Rolle gesprochen hat, nimmt der Beamer die Antwort an: Spaß, Konflikt oder Mobbing (vier Merkmale als Ampel-Checkliste) und welche Leiter-Stufe sicher wäre. Hilfenummern am Ende des Falls.","foerdert":"Spaß/Konflikt/Mobbing unterscheiden, Perspektivenwechsel, Macht der Zuschauenden (SOZ-37, SOZ-39, K-29)","eldib":["SOZ-37","SOZ-39","K-29"],"einheiten":["j1-e26","j1-e28"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"leiter-lauf":{"id":"leiter-lauf","name":"Leiter-Lauf","thema":"konflikt","format":"bewegung","formatName":"Bewegung im Raum","dauer":"6–8 Min","text":"Fünf Bodenmarken = Zivilcourage-Leiter (Hinschauen / Nicht mitlachen / Weggehen mit Betroffener / Erwachsenen holen / Direkt was sagen) plus Mitte. Zuschauer-Szene am Beamer, 10 Sekunden, Stopp, die größte Gruppe zuerst: „Warum hier?“ Runde 2 derselben Szene: „Jetzt dürft ihr zu zweit gehen“ – wer geht höher? Vorab sagt der Beamer: „Jede Stufe hilft. Stufe 1 ist keine Null.“ Hilfenummern (116 111, BEE SECURE, Schule) am Ende.","foerdert":"Zivilcourage realistisch einschätzen, zu zweit mutiger, Hilfe holen als Stärke (SOZ-39, SOZ-32, K-32)","eldib":["SOZ-39","SOZ-32","K-32"],"einheiten":["j1-e26","j1-e25"],"abschluss":true,"top":true,"aufwand":"S","gebaut":false},"wer-fehlt":{"id":"wer-fehlt","name":"Wer fehlt?","thema":"konflikt","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"6–8 Min","text":"Drei Szenen als Bild, in denen jemand leise ausgegrenzt wird (Gruppenchat ohne eine Person, Tisch mit leerem Platz, Insider-Witz). Erst die Zeichen antippen (wer schaut weg, wer wird nicht erwähnt), dann einen Mini-Zug wählen, der die Person reinholt, ohne ein großes Ding daraus zu machen. Vergleichskarte: „Wäre dein Zug bei uns machbar?“ Die Bonusfrage „Kennst du so einen Moment?“ hat einen großen Pass-Knopf.","foerdert":"Ausgrenzung früh erkennen, Einbeziehen in kleinen Schritten, Empathie (SOZ-37, SOZ-31, K-29)","eldib":["SOZ-37","SOZ-31","K-29"],"einheiten":["j1-e26","j1-e02"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"trick-erkannt":{"id":"trick-erkannt","name":"Trick erkannt","thema":"digital","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"5–7 Min","text":"Suchbild zu zweit: nachgebaute App-Screens (Feed, Story-Leiste, Game-Shop) mit versteckten Aufmerksamkeits-Tricks (Autoplay, Streak-Flamme, verzögerte Likes, Endlos-Scroll). Abwechselnd einen Verdacht antippen, ein Treffer erklärt in einem Satz, was der Trick mit dem Kopf macht; dann das Gefühl wählen, das danach bleibt. Der Beamer sammelt nur Trick-Namen, keine Personen.","foerdert":"Mechanismen durchschauen, eigene Reaktion benennen, Social-Media-Plan konkret machen (KOG-58, K-21, V-26)","eldib":["KOG-58","K-21","V-26"],"einheiten":["j1-e27"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"teilen-oder-nicht":{"id":"teilen-oder-nicht","name":"Teilen oder nicht?","thema":"digital","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Kein weiteres Real-or-Fake: Ein aufregender Post, der Daumen liegt auf Senden. Beide kippen die drei Prüffragen gemeinsam (Wer sagt das? Gibt’s das woanders? Will mich der Post wütend machen?) und entscheiden: Teilen / Nachfragen / Löschen – dann die Folge nach 24 Stunden. Dritter Post: ein gefälschtes Bild einer Mitschülerin, aus der Klasse geschickt → klare Grenze Mobbing/strafbar plus Hilfe.","foerdert":"Checkliste anwenden, Teilen-Bremse, Grenze Fälschung = Mobbing (KOG-58, SOZ-39, V-26)","eldib":["KOG-58","SOZ-39","V-26"],"einheiten":["j1-e28"],"abschluss":true,"top":true,"aufwand":"M","gebaut":true},"geruecht-staffel":{"id":"geruecht-staffel","name":"Gerücht-Staffel","thema":"digital","format":"bewegung","formatName":"Bewegung im Raum","dauer":"5–7 Min","text":"Die Crew steht in einer Reihe, jedes iPad ist eine Station. Ein Gerücht startet mit Reichweite 1; wer das iPad bekommt, sieht die Verlockung („+40 Leute, wenn du weiterschickst“) und tippt Weitergeben (iPad wandert, Punktwolke am Beamer wächst) oder Stopp (behält es und sagt einen von drei Stopp-Sätzen laut). Durchgang 2 mit einem Gerücht, das sich wahr anfühlt. Ersetzt die Gerücht-Kette im Feed-Check.","foerdert":"Gerüchte stoppen, Zivilcourage online, Folgen abschätzen (SOZ-39, KOG-58, K-31)","eldib":["SOZ-39","KOG-58","K-31"],"einheiten":["j1-e27","j1-e28"],"abschluss":true,"top":true,"aufwand":"S","gebaut":false},"red-flag":{"id":"red-flag","name":"Red Flag","thema":"digital","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"6–8 Min","text":"Neu (Lücke Online-Kontakt mit Fremden): Eine DM-Unterhaltung mit einem unbekannten Profil, das nett anfängt. Das Paar tippt die roten Flaggen an, sobald sie auftauchen (schmeichelt viel, will ein Geheimnis, fragt nach Fotos, drängt auf einen anderen Kanal), und wählt den Zug: blockieren, Screenshot, Erwachsenen zeigen. Zweiter Chat: Jemand aus der Klasse bittet um ein Foto „nur für mich“. Immer am Ende: BEE SECURE 8002 1234, 116 111, Lehrkraft.","foerdert":"Grooming und Bilder-Druck erkennen, digitale Grenzen, Hilfe holen ohne Scham (SOZ-39, KOG-58, V-26)","eldib":["SOZ-39","KOG-58","V-26"],"einheiten":["j1-e22","j1-e27","j1-e28"],"abschluss":true,"top":false,"aufwand":"M","gebaut":false},"akku-woche":{"id":"akku-woche","name":"Akku-Woche","thema":"digital","format":"solo-austausch","formatName":"Solo + Austausch","dauer":"5–7 Min","text":"Tamagotchi für Teenager: Fünf Abende und Morgen einer Figur mit kleinen Entscheidungen als Bild (Handy bis 1 Uhr oder Schlafmodus, Frühstück ja/nein, Treppe oder Lift, nach dem Streit scrollen oder Bodyscan). Akku und Anspannungszahl am nächsten Morgen reagieren sichtbar, ohne Moralpredigt. Vergleichskarte: „Was hat am meisten gebracht – und was machst du in echt?“ (Pass).","foerdert":"Schlaf, Bewegung, Pausen und Anspannung verbinden, kleiner machbarer Schritt (V-25, V-27, K-26)","eldib":["V-25","V-27","K-26"],"einheiten":["j1-e29"],"abschluss":true,"top":true,"aufwand":"M","gebaut":false},"spaeter-monster":{"id":"spaeter-monster","name":"Später-Monster","thema":"digital","format":"solo","formatName":"Solo","dauer":"4–6 Min","text":"Neu (Lücke Aufschieben): Figur Noé hat eine Aufgabe, das Später-Monster flüstert „nur noch 5 Minuten scrollen“. Du entscheidest in jeder Schleife, ob Noé bleibt oder aussteigt; der Zeitbalken zeigt, was der Loop wirklich kostet, und der Pegel am Abend steigt. Ausstieg gelingt nur über den kleinsten Startschritt (Buch aufschlagen, eine Aufgabe, 5 Minuten Timer). Replay mit frühem Ausstieg.","foerdert":"Aufschieben erkennen, kleinster Startschritt, Wenn-dann-Plan gegen den Loop (V-25, KOG-38, V-27)","eldib":["V-25","KOG-38","V-27"],"einheiten":["j1-e29","j1-e27"],"abschluss":true,"top":false,"aufwand":"S","gebaut":false},"jahres-quest":{"id":"jahres-quest","name":"Jahres-Quest","thema":"digital","format":"zu-zweit","formatName":"Zu zweit an einem iPad","dauer":"8–10 Min","text":"Neu (Lücke Rückblick): Die 30 Einheiten als Weg auf einer Karte mit den Crew-Stempeln aus dem HQ. Das Paar läuft ihn ab und tippt pro Modul ein Icon an: ein Moment, ein Spiel oder ein Skill, der hängen geblieben ist (kein neuer Stoff). Ende solo: „Welche drei Skills kommen mit in den Sommer?“ als Postkarte „Grüße aus 2031“ mit Icons, „weiß nicht“ erlaubt, dazu Sommer-Notfallkarte mit Hilfenummern. Nichts wird gespeichert.","foerdert":"Veränderung sehen, Skills als Dauer-Ausrüstung, Zukunftsperspektive, bewusster Abschied (K-19, K-28, KOG-38)","eldib":["K-19","K-28","KOG-38"],"einheiten":["j1-e30"],"abschluss":true,"top":false,"aufwand":"M","gebaut":false}},"einheiten":[{"id":"j1-e01","titel":"Willkommen – unser Rahmen","spiel":"regel-radar","variante":"Startet mit dem 3-Minuten-Probelauf (jede:r passt einmal, zieht die X-Karte), dann drei Szenen zum frisch unterschriebenen Vertrag; gefundene Lücke wandert aufs Plakat."},{"id":"j1-e02","titel":"Kennenlernen in Bewegung","spiel":"frag-weiter","variante":"Nach dem Bingo: Runde 2 mit echten, harmlosen Antworten (Lieblingsessen, Spiel); Stärken-Spion läuft heimlich mit."},{"id":"j1-e03","titel":"Wir als Team","spiel":"pilot-navigator","variante":"Drinnen ohne Augenbinde nach dem Blindführen; Runde 1 ohne Rückfragen, Runde 2 mit – Frage: „Was hat beim Führen geholfen?“ Mehr Zeit: Stummer Aufbau."},{"id":"j1-e04","titel":"Das Glas der Bedürfnisse","spiel":"tank-detektiv","variante":"Figur 3 wünscht sich etwas (Sneaker) statt zu brauchen – Rückfrage nötig; Schlussrunde mit zwei Chips aus „Was steckt dahinter?“."},{"id":"j1-e05","titel":"Zwischen laut und leise","spiel":"je-nach-ort","variante":"Orte passend zur Galerie der Stunde; der Partner rät vor dem Vergleich, wo ihr am weitesten auseinander liegt. Alternative mit mehr Zeit: Zwei Brillen."},{"id":"j1-e06","titel":"Mein Baum der Stärke","spiel":"staerke-einsatz","variante":"Stärken-Karten = die Stärken aus den Bäumen der Crew; jeder Block landet im Stärken-Turm im HQ."},{"id":"j1-e07","titel":"Was sind Gefühle – und wozu sind sie gut?","spiel":"gefuehls-funk","variante":"Lexikon-Karte B nutzt die Wörter aus der Mindmap der Stunde als Icons; Botschafts-Karte D aus dem Input „Wozu sind Gefühle gut?“."},{"id":"j1-e08","titel":"Alles steht Kopf","spiel":"pult-tausch","variante":"Zwei Szenen, eine davon aus dem Film-Thema der Stunde; Brücke in die Woche: „Wer saß bei dir heute am Pult?“ (Pass)."},{"id":"j1-e09","titel":"Wo spüre ich Gefühle?","spiel":"fruehwarn","variante":"Nach den Gefühlsstatuen die Bewegungs-Variante Signal-Stopp: einfrieren beim ersten Körper-Signal, Skill-Geste zeigen."},{"id":"j1-e10","titel":"Gemischte Gefühle","spiel":"mixer","variante":"Situationen vom Emotionswürfel; vor dem Balken raten, welcher Regler beim Partner oben war."},{"id":"j1-e11","titel":"Skills und die Anspannungsskala","spiel":"pegel-reihe","variante":"Figuren-Situationen aus der Linie im Raum; Alternative zu zweit: Innen/Außen mit der ruhigen 85er-Figur."},{"id":"j1-e12","titel":"Skills über Körper und Atem","spiel":"undercover","variante":"Orte aus dem Skills-Tester; Paar-Modus, die Crew schätzt, bis zu welcher Zahl der Skill noch hilft."},{"id":"j1-e13","titel":"Skills über die Sinne","spiel":"sinnesjagd","variante":"Radius Klassenraum + Flur; der Hosentaschen-Pack am Ende knüpft an die Sinneskiste an."},{"id":"j1-e14","titel":"Achtsamkeit und Kopf-Skills","spiel":"gelb-rot","variante":"Zwei Wände; nur Kopf-Skills, die in der Stunde geübt wurden. Mein Ort als Solo-Ergänzung für zu Hause."},{"id":"j1-e15","titel":"Mein Skills-Koffer und Ampelplan","spiel":"skill-sprechstunde","variante":"Figuren mit genau den fünf Koffer-Fächern der Stunde; Ampel-Woche als freiwillige Hausaufgabe aufs eigene iPad."},{"id":"j1-e16","titel":"Was sind Glaubenssätze?","spiel":"gedanken-weiche","variante":"Situation 1 ist die aus der SGGV-Übung der Stunde; Austausch nur über Mika, nicht über sich."},{"id":"j1-e17","titel":"Meine Glaubenssätze","spiel":"woher-satz","variante":"Bewusst entlastend nach der privaten Übung: nur Figuren-Sätze, „Kenne ich“-Knopf ohne Zählung, X-Karte sichtbar."},{"id":"j1-e18","titel":"Der kritische Detektiv","spiel":"tatsache-urteil","variante":"Als 5-Minuten-Abschluss nach dem Gedankenstopp-Spiel; mit mehr Zeit stattdessen Satz-Werkstatt mit den sechs Regeln."},{"id":"j1-e19","titel":"Neue Gedanken ausprobieren","spiel":"beweis-jaeger","variante":"Bereitet die Beweis-Challenge der Woche vor; die drei Haltungs-Scans knüpfen an die Rollenspiele an."},{"id":"j1-e20","titel":"Verbal und nonverbal","spiel":"uebersetzer","variante":"Nachrichten aus der Emoji-Übung der Stunde; mit Bewegungsdrang stattdessen Stille Post ohne Worte."},{"id":"j1-e21","titel":"Ich-Botschaften und Zuhören","spiel":"funkstille","variante":"Rolle B bekommt die Formel der Stunde als Icon-Karte; kurz-Variante: Zuhör-Falle solo mit Vergleichskarte."},{"id":"j1-e22","titel":"Grenzen erkennen","spiel":"okayradar","variante":"Szenen zu körperlich / emotional / digital; davor 3 Minuten Näher nicht mit Bodenmarken, wenn die Stunde ruhig war."},{"id":"j1-e23","titel":"Grenzen setzen: Stopp!","spiel":"stoppcheck","variante":"Die vier Fehler entsprechen den drei Stopps der Stunde; Runde Nachhaken übt das zweite Stopp."},{"id":"j1-e24","titel":"Konflikte lösen","spiel":"storystaffel","variante":"Alltagsstreit aus der Stunde; Einstieg „Welches Tier hat bei euch gespielt?“, Ziel unter 70 bevor geredet wird. Oder Clash im Sprecher-Modus."},{"id":"j1-e25","titel":"Gruppendruck und Nein sagen","spiel":"druck-chat","variante":"Digitale Variante nach den Live-Rollenspielen; Nein-Trainer als Hausaufgabe mit dem Wenn-dann-Plan."},{"id":"j1-e26","titel":"Mobbing und Zivilcourage","spiel":"vier-zeugen","variante":"Fall mit der Leiter aus der Stunde; Bewegungs-Alternative Leiter-Lauf („zu zweit gehen – wer geht höher?“). Hilfenummern am Ende."},{"id":"j1-e27","titel":"Social Media und ich","spiel":"trick-erkannt","variante":"Screens passend zu den Apps aus dem Bildschirmzeit-Vergleich; Beamer sammelt nur Trick-Namen für den Social-Media-Plan."},{"id":"j1-e28","titel":"Echt oder fake? KI und Fake News","spiel":"teilen-oder-nicht","variante":"Nach Checkliste und Teilen-Bremse; Post 3 (gefälschtes Bild einer Mitschülerin) führt zu Red Flag und zur Grenze „strafbar“."},{"id":"j1-e29","titel":"Gesund und stark","spiel":"akku-woche","variante":"Entscheidungen aus dem Vier-Ecken-Spiel der Stunde; danach Kleiner Schritt für den Gesund-Plan mit Wenn-dann-Satz."},{"id":"j1-e30","titel":"Rückblick und Abschied","spiel":"jahres-quest","variante":"Weg mit den Crew-Stempeln aus dem HQ, Stärken-Turm sichtbar; Postkarte aus 2031 als Vorlauf zum Brief an mich selbst."}]};

  /* ---------- QR-Code (generiert aus src/core/qr.js, qrcode-generator von Kazuhiko Arase, MIT) ---------- */
  var qrcode = function() {
  var qrcode = function(typeNumber, errorCorrectionLevel) {
    var PAD0 = 0xEC;
    var PAD1 = 0x11;
    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];
    var _this = {};
    var makeImpl = function(test, maskPattern) {
      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);
      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);
      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }
      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }
      mapData(_dataCache, maskPattern);
    };
    var setupPositionProbePattern = function(row, col) {
      for (var r = -1; r <= 7; r += 1) {
        if (row + r <= -1 || _moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c += 1) {
          if (col + c <= -1 || _moduleCount <= col + c) continue;
          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };
    var getBestMaskPattern = function() {
      var minLostPoint = 0;
      var pattern = 0;
      for (var i = 0; i < 8; i += 1) {
        makeImpl(true, i);
        var lostPoint = QRUtil.getLostPoint(_this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    };
    var setupTimingPattern = function() {
      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }
      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };
    var setupPositionAdjustPattern = function() {
      var pos = QRUtil.getPatternPosition(_typeNumber);
      for (var i = 0; i < pos.length; i += 1) {
        for (var j = 0; j < pos.length; j += 1) {
          var row = pos[i];
          var col = pos[j];
          if (_modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r += 1) {
            for (var c = -2; c <= 2; c += 1) {
              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };
    var setupTypeNumber = function(test) {
      var bits = QRUtil.getBCHTypeNumber(_typeNumber);
      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }
      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };
    var setupTypeInfo = function(test, maskPattern) {
      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      for (var i = 0; i < 15; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }
      for (var i = 0; i < 15; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }
      _modules[_moduleCount - 8][8] = (!test);
    };
    var mapData = function(data, maskPattern) {
      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);
      for (var col = _moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col -= 1;
        while (true) {
          for (var c = 0; c < 2; c += 1) {
            if (_modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }
              var mask = maskFunc(row, col - c);
              if (mask) {
                dark = !dark;
              }
              _modules[row][col - c] = dark;
              bitIndex -= 1;
              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };
    var createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r += 1) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }
      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }
      return data;
    };
    var createData = function(typeNumber, errorCorrectionLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);
      var buffer = qrBitBuffer();
      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }
      return createBytes(buffer, rsBlocks);
    };
    _this.addData = function(data, mode) {
      mode = mode || 'Byte';
      var newData = null;
      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }
      _dataList.push(newData);
      _dataCache = null;
    };
    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };
    _this.getModuleCount = function() {
      return _moduleCount;
    };
    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;
        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();
          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }
        _typeNumber = typeNumber;
      }
      makeImpl(false, getBestMaskPattern() );
    };
    _this.createTableTag = function(cellSize, margin) {
      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;
      var qrHtml = '';
      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';
      for (var r = 0; r < _this.getModuleCount(); r += 1) {
        qrHtml += '<tr>';
        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }
        qrHtml += '</tr>';
      }
      qrHtml += '</tbody>';
      qrHtml += '</table>';
      return qrHtml;
    };
    _this.createSvgTag = function(cellSize, margin, alt, title) {
      var opts = {};
      if (typeof arguments[0] == 'object') {
        opts = arguments[0];
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }
      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;
      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;
      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';
      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';
      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }
      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';
      return qrSvg;
    };
    _this.createDataURL = function(cellSize, margin) {
      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;
      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;
      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };
    _this.createImgTag = function(cellSize, margin, alt) {
      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;
      var size = _this.getModuleCount() * cellSize + margin * 2;
      var img = '';
      img += '<img';
      img += '\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\u0020width="';
      img += size;
      img += '"';
      img += '\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';
      return img;
    };
    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };
    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;
      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;
      var y, x, r1, r2, p;
      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };
      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };
      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';
          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }
          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }
        ascii += '\n';
      }
      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }
      return ascii.substring(0, ascii.length-1);
    };
    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;
      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }
      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;
      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;
      var y, x, r, p;
      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');
      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;
          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }
          line += p ? white : black;
        }
        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\n';
        }
      }
      return ascii.substring(0, ascii.length-1);
    };
    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }
    return _this;
  };
  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };
  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];
  qrcode.createStringToBytes = function(unicodeData, numChars) {
    var unicodeMap = function() {
      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };
      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }
      return unicodeMap;
    }();
    var unknownChar = '?'.charCodeAt(0);
    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              bytes.push(b);
            } else {
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };
  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };
  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };
  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };
  var QRUtil = function() {
    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
    var _this = {};
    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };
    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };
    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };
    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };
    _this.getMaskFunction = function(maskPattern) {
      switch (maskPattern) {
      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };
      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };
    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };
    _this.getLengthInBits = function(mode, type) {
      if (1 <= type && type < 10) {
        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }
      } else if (type < 27) {
        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }
      } else if (type < 41) {
        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }
      } else {
        throw 'type:' + type;
      }
    };
    _this.getLostPoint = function(qrcode) {
      var moduleCount = qrcode.getModuleCount();
      var lostPoint = 0;
      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {
          var sameCount = 0;
          var dark = qrcode.isDark(row, col);
          for (var r = -1; r <= 1; r += 1) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (var c = -1; c <= 1; c += 1) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };
      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }
      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }
      var darkCount = 0;
      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    };
    return _this;
  }();
  var QRMath = function() {
    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }
    var _this = {};
    _this.glog = function(n) {
      if (n < 1) {
        throw 'glog(' + n + ')';
      }
      return LOG_TABLE[n];
    };
    _this.gexp = function(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return EXP_TABLE[n];
    };
    return _this;
  }();
  function qrPolynomial(num, shift) {
    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }
    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();
    var _this = {};
    _this.getAt = function(index) {
      return _num[index];
    };
    _this.getLength = function() {
      return _num.length;
    };
    _this.multiply = function(e) {
      var num = new Array(_this.getLength() + e.getLength() - 1);
      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }
      return qrPolynomial(num, 0);
    };
    _this.mod = function(e) {
      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }
      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );
      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }
      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }
      return qrPolynomial(num, 0).mod(e);
    };
    return _this;
  };
  var QRRSBlock = function() {
    var RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };
    var _this = {};
    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };
    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }
      var length = rsBlock.length / 3;
      var list = [];
      for (var i = 0; i < length; i += 1) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }
      return list;
    };
    return _this;
  }();
  var qrBitBuffer = function() {
    var _buffer = [];
    var _length = 0;
    var _this = {};
    _this.getBuffer = function() {
      return _buffer;
    };
    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };
    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };
    _this.getLengthInBits = function() {
      return _length;
    };
    _this.putBit = function(bit) {
      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }
      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }
      _length += 1;
    };
    return _this;
  };
  var qrNumber = function(data) {
    var _mode = QRMode.MODE_NUMBER;
    var _data = data;
    var _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _data.length;
    };
    _this.write = function(buffer) {
      var data = _data;
      var i = 0;
      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }
      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };
    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };
    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };
    return _this;
  };
  var qrAlphaNum = function(data) {
    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;
    var _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _data.length;
    };
    _this.write = function(buffer) {
      var s = _data;
      var i = 0;
      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }
      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };
    var getCode = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };
    return _this;
  };
  var qr8BitByte = function(data) {
    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);
    var _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _bytes.length;
    };
    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };
    return _this;
  };
  var qrKanji = function(data) {
    var _mode = QRMode.MODE_KANJI;
    var _data = data;
    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\u53cb', 0x9746);
    var _bytes = stringToBytes(data);
    var _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };
    _this.write = function(buffer) {
      var data = _bytes;
      var i = 0;
      while (i + 1 < data.length) {
        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);
        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }
        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);
        buffer.put(c, 13);
        i += 2;
      }
      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };
    return _this;
  };
  var byteArrayOutputStream = function() {
    var _bytes = [];
    var _this = {};
    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };
    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };
    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };
    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };
    _this.toByteArray = function() {
      return _bytes;
    };
    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };
    return _this;
  };
  var base64EncodeOutputStream = function() {
    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';
    var _this = {};
    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };
    var encode = function(n) {
      if (n < 0) {
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };
    _this.writeByte = function(n) {
      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;
      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };
    _this.flush = function() {
      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }
      if (_length % 3 != 0) {
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };
    _this.toString = function() {
      return _base64;
    };
    return _this;
  };
  var base64DecodeInputStream = function(str) {
    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;
    var _this = {};
    _this.read = function() {
      while (_buflen < 8) {
        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }
        var c = _str.charAt(_pos);
        _pos += 1;
        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/) ) {
          continue;
        }
        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }
      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };
    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };
    return _this;
  };
  var gifImage = function(width, height) {
    var _width = width;
    var _height = height;
    var _data = new Array(width * height);
    var _this = {};
    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };
    _this.write = function(out) {
      out.writeString('GIF87a');
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);
      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);
      out.writeByte(lzwMinCodeSize);
      var offset = 0;
      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }
      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);
      out.writeString(';');
    };
    var bitOutputStream = function(out) {
      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;
      var _this = {};
      _this.write = function(data, length) {
        if ( (data >>> length) != 0) {
          throw 'length over';
        }
        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }
        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };
      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };
      return _this;
    };
    var getLZWRaster = function(lzwMinCodeSize) {
      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;
      var table = lzwTable();
      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );
      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);
      bitOut.write(clearCode, bitLength);
      var dataIndex = 0;
      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;
      while (dataIndex < _data.length) {
        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;
        if (table.contains(s + c) ) {
          s = s + c;
        } else {
          bitOut.write(table.indexOf(s), bitLength);
          if (table.size() < 0xfff) {
            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }
            table.add(s + c);
          }
          s = c;
        }
      }
      bitOut.write(table.indexOf(s), bitLength);
      bitOut.write(endCode, bitLength);
      bitOut.flush();
      return byteOut.toByteArray();
    };
    var lzwTable = function() {
      var _map = {};
      var _size = 0;
      var _this = {};
      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };
      _this.size = function() {
        return _size;
      };
      _this.indexOf = function(key) {
        return _map[key];
      };
      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };
      return _this;
    };
    return _this;
  };
  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }
    var b = byteArrayOutputStream();
    gif.write(b);
    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();
    return 'data:image/gif;base64,' + base64;
  };
  return qrcode;
}();
!function() {
  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        else {
          i++;
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };
}();
  
function qrSvgRaw(text, o) {
    const opt = o || {};
    const ec = opt.ec || 'M';
    let qr = null;
    for (let type = 1; type <= 40 && !qr; type++) {
      try { const q = qrcode(type, ec); q.addData(String(text), 'Byte'); q.make(); qr = q; } catch (e) { qr = null; }
    }
    if (!qr) return '';
    const n = qr.getModuleCount();
    const margin = opt.margin != null ? opt.margin : 2;
    const size = n + margin * 2;
    let d = '';
    for (let r = 0; r < n; r++) {
      let run = -1;
      for (let c = 0; c <= n; c++) {
        const on = c < n && qr.isDark(r, c);
        if (on && run < 0) run = c;
        if (!on && run >= 0) { d += 'M' + (run + margin) + ' ' + (r + margin) + 'h' + (c - run) + 'v1h-' + (c - run) + 'z'; run = -1; }
      }
    }
    const px = opt.size || 220;
    return '<svg xmlns="http://www.w3.org/2000/svg" class="qr" viewBox="0 0 ' + size + ' ' + size + '" width="' + px + '" height="' + px + '" shape-rendering="crispEdges" role="img" aria-label="QR-Code">' +
      '<rect width="' + size + '" height="' + size + '" fill="' + (opt.light || '#ffffff') + '"/><path d="' + d + '" fill="' + (opt.dark || '#000000') + '"/></svg>';
  }
  

  /* ---------- ELDiB-Kurznamen (für den Grund-Text der Lehrkraft) ---------- */
  const ELDIB = {
    'K-10': 'Gefühle erkennen und benennen',
    'K-16': 'Gefühle begründen, Warnsignale erkennen',
    'K-19': 'Selbstbild und Fremdbild',
    'K-20': 'Stärken wahrnehmen, Rückmeldung geben',
    'K-21': 'Bedürfnisse und Gefühle verstehen',
    'K-23': 'Selbstregulation, sicherer Ort',
    'K-26': 'Zuhören, nachfragen, kooperieren',
    'K-28': 'Rückmeldung annehmen, Selbstwert',
    'K-29': 'Zusammenarbeit, Vielfalt, Vertrauen',
    'K-31': 'Ich-Botschaften, Grenzen ansprechen',
    'K-32': 'Regeln, Mitbestimmung, Verbindlichkeit',
    'KOG-38': 'Ziele zerlegen, planen, Tatsache vs. Urteil',
    'KOG-58': 'Medien durchschauen, Selbstwert ohne Vergleich',
    'SOZ-18': 'Kooperation ohne Worte',
    'SOZ-26': 'Hilfsmittel anwenden, Kritik annehmen',
    'SOZ-31': 'Interesse zeigen, Nachfragen',
    'SOZ-32': 'Regeln und Sicherheit in der Gruppe',
    'SOZ-33': 'Rückmeldung geben, Einwände formulieren',
    'SOZ-34': 'Konflikte lösen, Verantwortung übernehmen',
    'SOZ-37': 'Vertrauen und Grenzen in Beziehungen',
    'SOZ-39': 'Eigene und fremde Grenzen achten',
    'V-20': 'Wut früh bremsen',
    'V-21': 'Warnsignale erkennen, Anspannung einschätzen',
    'V-22': 'Stopp-Recht nutzen',
    'V-24': 'Sinnes-Skills anwenden',
    'V-25': 'Kleine Schritte planen und umsetzen',
    'V-26': 'Konflikte ohne Eskalation austragen',
    'V-27': 'Ampelplan, Alltag und Anspannung',
  };
  const eldibName = (code) => ELDIB[String(code || '').toUpperCase()] || code;

  /* ---------- Themen-Tags mit Stichwortlisten (Deutsch, Lëtzebuergesch, Français) ----------
     Die Listen suchen nur lokal im Text. vorsicht = Thema nur mit Hilfe-Hinweis im Spiel. */
  const THEMEN = [
    { id: 'wut', name: 'Wut & Ausraster', woerter: ['wut', 'wütend', 'ausraster', 'ausgerastet', 'explodiert', 'aggress', 'schreit', 'geschrien', 'tobt', 'rastet', 'rout', 'rosen', 'rosend', 'colère', 'énervé', 'enervé', 'agressi', 'crise'] },
    { id: 'streit', name: 'Streit & Konflikt', woerter: ['streit', 'konflikt', 'zoff', 'auseinandersetzung', 'beleidig', 'provoz', 'prügel', 'geschlagen', 'schlägerei', 'sträit', 'streiden', 'dispute', 'conflit', 'bagarre', 'insult', 'provoc'] },
    { id: 'angst', name: 'Angst & Sorgen', woerter: ['angst', 'ängstlich', 'panik', 'sorge', 'nervös', 'unsicher', 'traut sich nicht', 'fäert', 'angscht', 'peur', 'anxie', 'anxié'] },
    { id: 'mobbing', name: 'Mobbing', woerter: ['mobbing', 'gemobbt', 'mobbt', 'cybermobbing', 'harcèlement', 'harcel', 'bedroht', 'drohung', 'erpress', 'gehänselt', 'hänsel', 'bully'] },
    { id: 'ausgrenzung', name: 'Ausgrenzung', woerter: ['ausgrenz', 'ausgeschlossen', 'allein gelassen', 'einsam', 'außenseiter', 'aussenseiter', 'niemand spielt', 'keine freunde', 'ignoriert', 'zurückgezogen', 'zieht sich zurück', 'eleng', 'exclu', 'exclusion', 'isolé', 'rejet'] },
    { id: 'gruppendruck', name: 'Gruppendruck', woerter: ['gruppendruck', 'druck von', 'mitgemacht', 'mitläufer', 'überredet', 'angestiftet', 'mutprobe', 'clique', 'pression', 'influenc'] },
    { id: 'digital', name: 'Handy & Social Media', woerter: ['handy', 'smartphone', 'tiktok', 'insta', 'snap', 'whatsapp', 'social media', 'soziale medien', 'online', 'chat', 'gaming', 'zockt', 'zocken', 'fortnite', 'screenshot', 'gepostet', 'posten', 'portable', 'réseaux', 'reseaux', 'écran', 'ecran', 'telefon'] },
    { id: 'schlaf', name: 'Schlaf & Energie', woerter: ['schlaf', 'müde', 'muede', 'übermüdet', 'eingeschlafen', 'nachts wach', 'midd', 'schléift', 'sommeil', 'fatigué', 'fatigue', 'dort pas'] },
    { id: 'stress', name: 'Stress & Anspannung', woerter: ['stress', 'anspannung', 'angespannt', 'überfordert', 'ueberfordert', 'unruhig', 'zappelig', 'nervös', 'gereizt', 'tension', 'tendu', 'débordé', 'deborde', 'nervos'] },
    { id: 'selbstwert', name: 'Selbstwert', woerter: ['selbstwert', 'selbstbewusst', 'traut sich', 'kann nichts', 'kann das nicht', 'kann das eh', 'schaff das nicht', 'bin dumm', 'bin blöd', 'minderwertig', 'vergleicht sich', 'schämt', 'scham', 'wertlos', 'estime', 'confiance en', 'nul'] },
    { id: 'trauer', name: 'Trauer & Verlust', woerter: ['trauer', 'trauert', 'gestorben', 'verstorben', 'tod ', 'todesfall', 'verlust', 'verloren', 'beerdigung', 'gestuerwen', 'gestuerf', 'deuil', 'décès', 'deces', 'mort '], vorsicht: true },
    { id: 'familie', name: 'Familie', woerter: ['familie', 'eltern', 'mutter', 'mama', 'vater', 'papa', 'zuhause', 'zu hause', 'scheidung', 'getrennt', 'stiefvater', 'stiefmutter', 'geschwister', 'bruder', 'schwester', 'foyer', 'heim', 'famill', 'doheem', 'elteren', 'parents', 'mère', 'père', 'maison', 'divorce'], vorsicht: true },
    { id: 'grenzen', name: 'Grenzen & Nein sagen', woerter: ['grenze', 'grenzen', 'nein sagen', 'kann nicht nein', 'zu nah', 'abstand', 'distanz', 'übergriff', 'anfassen', 'respektlos', 'limite', 'dire non', 'trop proche'] },
    { id: 'freundschaft', name: 'Freundschaft', woerter: ['freund', 'freundin', 'freundschaft', 'beste freund', 'clique', 'kumpel', 'frënd', 'frëndin', 'kolleg', 'ami ', 'amie', 'amitié', 'copain', 'copine'] },
    { id: 'regeln', name: 'Regeln & Absprachen', woerter: ['regel', 'regeln', 'absprache', 'vereinbarung', 'verspätet', 'zu spät', 'unpünktlich', 'hält sich nicht', 'konsequenz', 'reegel', 'règle', 'regle', 'retard', 'consigne'] },
    { id: 'motivation', name: 'Motivation & Aufschieben', woerter: ['motivation', 'unmotiviert', 'keine lust', 'aufschieb', 'prokrastin', 'hausaufgaben nicht', 'gibt auf', 'aufgegeben', 'null bock', 'keng loscht', 'motivé', 'motive', 'procrastin', 'abandonne'] },
    { id: 'gefuehle', name: 'Gefühle zeigen & verstehen', woerter: ['gefühl', 'gefuehl', 'gefühle', 'traurig', 'weint', 'geweint', 'frustriert', 'enttäuscht', 'enttaeuscht', 'gefill', 'kräischt', 'émotion', 'emotion', 'triste', 'pleure', 'déçu', 'decu'] },
    { id: 'kommunikation', name: 'Kommunikation & Zuhören', woerter: ['zuhör', 'zuhoer', 'unterbricht', 'redet dazwischen', 'missverständnis', 'missverstaendnis', 'ich-botschaft', 'vorwurf', 'nachfragen', 'nolauschter', 'écoute', 'ecoute', 'interrompt', 'malentendu'] },
    { id: 'koerper', name: 'Körper & Bewegung', woerter: ['bewegung', 'sport', 'bewegt sich', 'sitzt nur', 'körper', 'koerper', 'essen', 'ernährung', 'ernaehrung', 'kierper', 'bougé', 'bouge', 'activité physique'] },
    { id: 'entschuldigung', name: 'Entschuldigung & Wiedergutmachung', woerter: ['entschuldig', 'wiedergutmach', 'rechtfertig', 'ausrede', 'schuld', 'verantwortung', 'entschëllegt', 'excuse', 'pardon', 'responsab'] },
  ];
  const THEMEN_BY_ID = {};
  THEMEN.forEach((t) => { THEMEN_BY_ID[t.id] = t; });

  /* Welches Thema passt zu welchem Katalog-Thema (Ordner) besonders gut? Bonus beim Vorschlag. */
  const THEMA_ZU_KATALOG = {
    wut: ['skills', 'gefuehle'], streit: ['konflikt', 'kommunikation'], angst: ['gefuehle', 'skills'],
    mobbing: ['konflikt'], ausgrenzung: ['konflikt', 'ankommen'], gruppendruck: ['konflikt'],
    digital: ['digital'], schlaf: ['digital', 'skills'], stress: ['skills'], selbstwert: ['ich', 'gedanken'],
    trauer: ['gefuehle'], familie: ['kommunikation'], grenzen: ['kommunikation'], freundschaft: ['ankommen', 'kommunikation'],
    regeln: ['ankommen'], motivation: ['digital', 'ich'], gefuehle: ['gefuehle'], kommunikation: ['kommunikation'],
    koerper: ['skills', 'digital'], entschuldigung: ['konflikt'],
  };
  /* Handverlesene Treffer: Thema → Spiele, die genau dazu gebaut sind (zusätzlich zur Stichwortsuche im Katalogtext). */
  const THEMA_SPIELE = {
    wut: ['fruehwarn', 'kipp-punkt', 'gelb-rot', 'pegel-reihe', 'blackout', 'hitzeecken', 'pult-tausch'],
    streit: ['storystaffel', 'sorrywerkstatt', 'leiter-lauf', 'uebersetzer', 'funkstille', 'hitzeecken', 'gerecht-oder-gleich'],
    angst: ['fruehwarn', 'mein-ort', 'sinnesjagd', 'innen-aussen', 'gefuehls-funk'],
    mobbing: ['vier-zeugen', 'wer-fehlt', 'druck-chat', 'geruecht-staffel', 'hundert-prozent', 'red-flag'],
    ausgrenzung: ['wer-fehlt', 'echter-freund', 'erster-eindruck', 'vier-zeugen', 'stummer-aufbau'],
    gruppendruck: ['druck-chat', 'nein-trainer', 'dealoderkein', 'hundert-prozent', 'leiter-lauf'],
    digital: ['trick-erkannt', 'teilen-oder-nicht', 'geruecht-staffel', 'red-flag', 'akku-woche', 'druck-chat', 'vergleichs-falle'],
    schlaf: ['akku-woche', 'spaeter-monster', 'tank-detektiv'],
    stress: ['pegel-reihe', 'innen-aussen', 'undercover', 'sinnesjagd', 'gelb-rot', 'skill-sprechstunde', 'ampel-woche', 'mein-ort', 'blackout'],
    selbstwert: ['vergleichs-falle', 'zwei-brillen', 'staerke-einsatz', 'staerken-spion', 'satz-werkstatt', 'beweis-jaeger', 'woher-satz', 'haltungs-switch'],
    trauer: ['gefuehls-funk', 'mixer', 'mein-ort'],
    familie: ['familienfunk', 'funkstille', 'dahinter'],
    grenzen: ['okayradar', 'naeher-nicht', 'stoppcheck', 'nein-trainer', 'frag-weiter', 'probelauf'],
    freundschaft: ['echter-freund', 'erster-eindruck', 'frag-weiter', 'wer-fehlt', 'sorrywerkstatt'],
    regeln: ['regel-radar', 'probelauf', 'crew-rat', 'pilot-navigator'],
    motivation: ['spaeter-monster', 'kleiner-schritt', 'akku-woche', 'jahres-quest'],
    gefuehle: ['gefuehls-funk', 'pult-tausch', 'fruehwarn', 'mixer', 'dahinter', 'innen-aussen'],
    kommunikation: ['uebersetzer', 'stillepost', 'zuhoerfalle', 'frag-weiter', 'funkstille', 'pilot-navigator'],
    koerper: ['akku-woche', 'sinnesjagd', 'undercover', 'tank-detektiv'],
    entschuldigung: ['sorrywerkstatt', 'storystaffel', 'leiter-lauf'],
  };

  const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ');

  /* themenAusNotizen(text, {details}) → ['wut', 'streit', …] nach Trefferzahl; nur lokale Stichwortsuche. */
  function themenAusNotizen(text, opts) {
    const o = opts || {};
    const t = ' ' + norm(text) + ' ';
    if (!t.trim()) return [];
    const hits = [];
    THEMEN.forEach((th) => {
      let n = 0;
      const gefunden = [];
      th.woerter.forEach((w) => {
        let i = t.indexOf(w);
        while (i >= 0) { n++; if (gefunden.indexOf(w) < 0) gefunden.push(w); i = t.indexOf(w, i + w.length); }
      });
      if (n) hits.push({ id: th.id, name: th.name, treffer: n, woerter: gefunden, vorsicht: !!th.vorsicht });
    });
    hits.sort((a, b) => b.treffer - a.treffer || a.id.localeCompare(b.id));
    const max = o.max || 5;
    const top = hits.slice(0, max);
    return o.details ? top : top.map((x) => x.id);
  }
  const themenListe = () => THEMEN.map((t) => ({ id: t.id, name: t.name, vorsicht: !!t.vorsicht }));

  /* ---------- Tagescode & Deep-Link (identisch zu CREW: src/core/seed.js, src/core/games.js) ---------- */
  function fnv() {
    let hsh = 2166136261;
    const s = Array.prototype.slice.call(arguments).join('|');
    for (let i = 0; i < s.length; i++) { hsh ^= s.charCodeAt(i); hsh = Math.imul(hsh, 16777619); }
    return hsh >>> 0;
  }
  const todayISO = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const tagescode = (iso) => String(1000 + (fnv('crew-tagescode', iso || todayISO()) % 9000));
  const DEFAULT_BASE = 'https://joderle123.github.io/ISA-APP/crew/dist/index.html';
  // spielUrl('frag-weiter', {rolle:'A', code:'1234', platz:3, basis:'…/index.html'}) – keine Personendaten im Link
  function spielUrl(id, o) {
    const oo = o || {};
    if (!/^[a-z0-9-]{1,40}$/.test(String(id || ''))) throw new Error('spielUrl: ungültige Spiel-ID');
    const p = [];
    p.push('spiel=' + id);
    p.push('code=' + (/^\d{4}$/.test(String(oo.code || '')) ? oo.code : tagescode()));
    if (oo.rolle && /^[A-DX]$/i.test(oo.rolle)) p.push('rolle=' + String(oo.rolle).toUpperCase());
    if (oo.platz && /^[1-8]$/.test(String(oo.platz))) p.push('platz=' + oo.platz);
    return (oo.basis || DEFAULT_BASE) + '?' + p.join('&');
  }
  const qrSvg = (url, o) => qrSvgRaw(url, o);

  /* ---------- Vorschläge ---------- */
  function spielText(k) { return norm(k.name + ' ' + k.text + ' ' + k.foerdert); }
  const THEMEN_TEXT_CACHE = {};
  function themenEinesSpiels(k) {
    if (THEMEN_TEXT_CACHE[k.id]) return THEMEN_TEXT_CACHE[k.id];
    const t = ' ' + spielText(k) + ' ';
    const out = {};
    THEMEN.forEach((th) => {
      let n = 0;
      th.woerter.forEach((w) => { if (w.length >= 5 && t.indexOf(w) >= 0) n++; });
      if ((THEMA_SPIELE[th.id] || []).indexOf(k.id) >= 0) n += 3;
      if (n) out[th.id] = n;
    });
    THEMEN_TEXT_CACHE[k.id] = out;
    return out;
  }

  /* suggest({eldib, themen, einheit, format, max, nurGebaut, ohne, code, basis}) → [{id, name, grund, …}] */
  function suggest(opts) {
    const o = opts || {};
    const K = KATALOG;
    const eldib = (o.eldib || []).map((c) => String(c).toUpperCase());
    const themen = (o.themen || []).map((t) => String(t).toLowerCase()).filter((t) => THEMEN_BY_ID[t]);
    const einheit = o.einheit || '';
    const unit = einheit ? K.einheiten.find((e) => e.id === einheit) : null;
    const nurGebaut = o.nurGebaut !== false;
    const ohne = o.ohne || [];
    const max = o.max || 3;
    const out = [];
    Object.keys(K.spiele).forEach((id) => {
      const k = K.spiele[id];
      if (ohne.indexOf(id) >= 0) return;
      if (nurGebaut && !k.gebaut) return;
      if (o.format && k.format !== o.format) return;
      if (o.thema && k.thema !== o.thema) return;
      let score = 0;
      const gruende = [];
      // 1) ELDiB-Ziele (Wochenziel / Förderplan): jeder Treffer zählt
      const eldHits = k.eldib.filter((c) => eldib.indexOf(c) >= 0);
      if (eldHits.length) { score += eldHits.length * 10; gruende.push('ELDiB ' + eldHits.map((c) => c + ' (' + eldibName(c) + ')').join(', ')); }
      // 2) Themen aus den Notizen
      const st = themenEinesSpiels(k);
      const thHits = themen.filter((t) => st[t]);
      thHits.forEach((t) => { score += 4 + Math.min(st[t], 5); });
      themen.forEach((t) => { if ((THEMA_ZU_KATALOG[t] || []).indexOf(k.thema) >= 0) score += 2; });
      if (thHits.length) gruende.push('Thema ' + thHits.map((t) => THEMEN_BY_ID[t].name).join(', '));
      // 3) Einheit des Kurses (Abschlussspiel der Stunde)
      if (unit) {
        if (unit.spiel === id) { score += 25; gruende.push('Abschlussspiel der Einheit ' + unit.id + ' „' + unit.titel + '“'); }
        else if (k.einheiten.indexOf(unit.id) >= 0) { score += 8; gruende.push('passt zur Einheit ' + unit.id); }
        else {
          const u = K.spiele[unit.spiel];
          if (u && !u.gebaut && u.thema === k.thema) {
            // Katalogspiel der Einheit noch nicht gebaut → Ersatz aus demselben Thema, gleiche ELDiB-Codes zählen
            const same = k.eldib.filter((c) => u.eldib.indexOf(c) >= 0).length;
            score += 3 + same * 2;
            gruende.push('Ersatz für „' + u.name + '“ (noch nicht gebaut), gleiches Thema' + (same ? ', gleiche ELDiB-Codes' : ''));
          } else if (u && u.thema === k.thema) score += 3;
        }
      }
      // 4) kleine Zusätze (nur als Zünglein an der Waage): Favorit, Abschluss-tauglich. Ohne echten Treffer kein Vorschlag.
      if (score <= 0) return;
      if (k.top) score += 1.5;
      if (k.abschluss) score += 0.5;
      const themaName = (K.themen.find((t) => t.id === k.thema) || {}).name || k.thema;
      out.push({
        id, name: k.name, thema: k.thema, themaName, format: k.format, formatName: k.formatName, dauer: k.dauer,
        gebaut: !!k.gebaut, top: !!k.top, eldib: k.eldib.slice(), score: Math.round(score * 10) / 10,
        gruende, grund: gruende.join(' · ') || 'passt zum Thema', foerdert: k.foerdert, text: k.text,
        url: spielUrl(id, { code: o.code, basis: o.basis }),
      });
    });
    out.sort((a, b) => b.score - a.score || (b.top - a.top) || a.name.localeCompare(b.name));
    return out.slice(0, max);
  }

  /* ---------- Karte zeichnen (optional, ohne Abhängigkeiten) ----------
     renderKarte(el, { titel, vorschlaege, modus: 'personal' | 'jugend', code, basis, qrSize })
     personal: Spiel + Grund (nur für die Lehrkraft) + Link; jugend: Spiel + QR, KEIN Grund, keine Tags. */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function renderKarte(el, opts) {
    const o = opts || {};
    const modus = o.modus === 'jugend' ? 'jugend' : 'personal';
    const list = o.vorschlaege || [];
    const code = o.code || tagescode();
    const items = list.map((v) => {
      const url = spielUrl(v.id, { code, basis: o.basis });
      const qr = qrSvg(url, { size: o.qrSize || 96 });
      return '<li class="crewhub-item" data-spiel="' + esc(v.id) + '">' +
        '<div class="crewhub-qr">' + qr + '</div>' +
        '<div class="crewhub-body"><b class="crewhub-name">' + esc(v.name) + '</b>' +
        '<span class="crewhub-meta">' + esc(v.themaName || v.thema) + ' · ' + esc(v.formatName || v.format) + ' · ' + esc(v.dauer || '') + '</span>' +
        (modus === 'personal' ? '<span class="crewhub-grund" title="nur für das Personal sichtbar">' + esc(v.grund) + '</span>' : '') +
        '<a class="crewhub-link" href="' + esc(url) + '" target="_blank" rel="noopener">Spiel öffnen</a>' +
        '</div></li>';
    }).join('');
    el.innerHTML = '<section class="crewhub-karte" data-modus="' + modus + '">' +
      '<header class="crewhub-head"><span class="crewhub-logo">CREW</span><b>' + esc(o.titel || 'CREW-Spiele für diese Woche') + '</b>' +
      '<span class="crewhub-code">Tagescode ' + esc(code) + '</span></header>' +
      (list.length ? '<ul class="crewhub-list">' + items + '</ul>' : '<p class="crewhub-leer">Noch kein Vorschlag. Wochenziel oder Einheit wählen.</p>') +
      (modus === 'personal' ? '<p class="crewhub-fuss">Grund und Themen sieht nur das Personal. Die Jugendlichen sehen nur Spiel und QR-Code. Links enthalten keine Namen.</p>' : '') +
      '</section>';
    return el;
  }

  return {
    version: KATALOG.stand, katalog: KATALOG, eldib: ELDIB, eldibName,
    themen: THEMEN, themenListe, themenAusNotizen,
    suggest, spielUrl, qrSvg, tagescode, renderKarte, DEFAULT_BASE,
  };
});
