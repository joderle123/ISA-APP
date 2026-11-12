# RESPAWN – ein Jahr auf der Insel, dann nochmal (Stand 12.11.2026)

Zweiter Spielmodus auf der LUMO-Insel, ohne Kursbezug. Wunsch aus der Praxis: „wie GTA, nur pädagogisch“ – offene Welt,
man darf fast alles tun (auch Mist), keine Waffen, kein Gefängnis. Die Folgen sind zwischenmenschlich und kommen später.

- **Öffnen:** `dist/respawn.html` (oder `index.html?mode=respawn`). Bau: `node build.mjs`. LUMO selbst bleibt unverändert.
- **Ablauf:** Startkarten ziehen (Kopf, Zuhause, Tasche) → vier Jahreszeiten mit je drei freien Tagen (Kraft 3 je Tag) →
  Finale am Steg → Ausgang (12) und Akte („Das steht drin“ / „Das war wirklich“) → nochmal mit anderen Karten.
- **Frei tun:** an Leuten (reden, helfen, Geld leihen/zurückgeben, entschuldigen, „Gemein sein …“: aufziehen, heimlich
  filmen, schubsen) und an Orten (jobben, in die Kasse greifen, Tor besprühen, Boot nehmen, zocken, schlafen …).
  Zeugen sind die Figuren, die in der 3D-Welt wirklich in der Nähe stehen.
- **Neu am 12.11. abends:** Fränz’ Lieferwagen kann man nehmen und wirklich fahren (`fahren.js`; gemessen wird Strecke, Aufprall,
  wer zur Seite springen musste, wo der Wagen stehen bleibt). Am Markt: Süßes kaufen oder an Oma Lucindas Stand Kopfhörer
  einstecken. Bei Leuten: Pommes ausgeben, über jemanden lästern, etwas von sich aus zugeben (bei Fränz, Tiago, Oma Lucinda).
  Dazu neun neue Folgen am Morgen (Blechschaden, ausgefallene Lieferung, Verdacht auf Noor, Lästern kommt heraus …).
- **Folgen:** jeden Morgen (`daten/welt.js` → `FOLGEN`), jede einmal: Gerüchte im Gruppenchat, Rückzug, falscher Verdacht
  auf andere, Einträge in der Akte. Ereignisse des Tages stehen mit Marke in der Welt; liegen lassen hat auch Folgen (`VERPASST`).
- **Druck:** sperrt sichtbar ruhige Antworten, bringt eine Uhr; die Startkarten ändern die Regeln (`run.js`).
- **Dateien:** `src/respawn/` – `run.js` (Regeln, ohne Browser), `buehne.js` (Szenen in der 3D-Welt), `oberflaeche.js` + `stil.js`,
  `plugin.js` (Ablauf), `daten/` (Karten, Situationen, Welt, Ausgänge, Akte, Figuren).
- **Figuren:** echte 3D-Figuren mit Skelett und Bewegungen (Quaternius „Ultimate Modular Men“, CC0; `src/respawn/modelle/`,
  Lizenz und Umwandlung in `LIZENZ.md`). `figur3d.js` legt sie als „Überzug“ auf die Spielfiguren: Kopf, Oberteil, Beine und
  Füße je Figur gemischt (`STIL` in `plugin.js`), Farben aus dem Aussehen der Figur. LUMO selbst nutzt weiter die alten Figuren.
  Die Datei macht den Bau rund 5 MB größer. Es fehlen noch Frauen-Modelle (gleiches Paket „Ultimate Modular Women“).
- **Stadt:** Im Modus RESPAWN ersetzt `stadt.js` das Bilderbuch-Dorf durch eine kleine moderne Stadt: Häuser und Läden
  (Kenney, CC0; je Haus andere Dach- und Wandfarbe), Asphaltstraßen auf den Hauptwegen (Hafen–Strand, Hafen–Leuchtturm,
  Hafen–Markt), Straßenlampen, parkende Autos und je Straße ein Fahrzeug, das langsam fährt und vor Menschen anhält.
  Die alten Häuser bleiben unsichtbar als Logik bestehen (Kollision, Orte, Türen).
- **Grafik:** Umgebungsschatten, Tiefenunschärfe, Lichtstrahlen (`src/engine/renderer.js`), nähere Kamera, Wetter je Jahreszeit.
- **Schreibregeln:** Blase ≤ 12 Wörter, Wahl ≤ 6 Wörter, keine Lehre, jede Wahl kostet etwas. Hilfe-Nummern nur 116 111 und 112.
- **Sanfter Rahmen:** `?sanft` (oder `meta.sanft`) nimmt Alkohol, Schlagen und Schubsen heraus.
- **Tests:** `node --test tests/unit/respawn-run.test.mjs` · `node tests/scenarios/respawn.mjs` (Autopilot, ganze Runden).
- **Neu in der Nacht 12./13.11.:**
  - **Vier neue Orte** (`daten/welt.js` → `ORTE`): Strand (rausschwimmen, Feuer machen), Leuchtturm (Aussicht, aufs Geländer
    klettern), Bühne am Markt (auftreten), Lucindas Garten (helfen). Am Steg kann man jetzt angeln und springen, am Krater geht
    eine Vape rum (nur ohne `?sanft`, wie Klettern am Leuchtturm).
  - **Folgen dazu:** Feuer dicht an der Strandhütte verkohlt das Dach – mit Zeuge weiß es Tiagos Familie, ohne Zeuge bekommt
    die Krater-Crew den Ärger („Davongekommen“). Der Clip vom Leuchtturm findet einen Nachahmer. Die Vape wird teuer und
    macht unruhig; Ilda riecht es und sagt nur, dass sie da ist. Zugeben geht auch hier (bei Tiago).
  - **Geschick** (`oberflaeche.js` → `geschick`, Szenen-Schritt `['spiel', { titel, bild }, (ergebnis) => Schritte]`):
    ein Zeiger läuft hin und her, tippen, wenn er im hellen Feld steht – drei Runden. Benutzt beim Skaten, Angeln, an der
    Fritteuse und auf der Bühne. Viel Druck macht das Feld kleiner und den Zeiger schneller („Deine Hände zittern“).
  - **Spuren in der Welt:** Die Feuerstelle am Strand bleibt liegen (`stadt.js` → `zeigeSpuren`). Leute ohne Namen grüßen
    nicht mehr nur – sie reden über das, was sich herumgesprochen hat (`statistSagt`).
  - **13. Ausgang** „Die Stimme vom Markt“ (zweimal auf die Bühne, Maëlle an der Seite).
  - **Kamera:** Hauswände versperren die Sicht (`colliders.js` → Rechtecke mit `sicht: true`); die Kamera rückt bis 0,9 m an
    die Figur, statt im Haus zu landen. Die Hindernisse der Häuser passen jetzt zu den neuen Modellen.
  - **Stadt:** Skate-Ecke am Dorfplatz, vier Boote am Steg, Bojen, Auslagen vor den Marktständen (Kenney „Mini Skate“,
    „Watercraft Kit“, „Mini Market“, CC0).
  - **Tretroller** (`roller.js`): am Markt für 35 Euro zu kaufen, danach jederzeit „Roller fahren“ auf der Aktionstaste
    (schneller unterwegs; steigt von selbst ab, wenn eine Szene beginnt oder man ins Wasser gerät).
  - **Rennen gegen Pit** (`lauf.js`, `ORT_AKTIONEN.rennen`): vom Brunnen in 26 Sekunden zum Leuchtturm – frei in der Welt,
    oben läuft die Uhr mit Entfernung. Zu Fuß knapp, mit dem Roller leicht. Wer verliert, zahlt Pommes.
  - **Neue Situation** „Das Feuer am Strand“ (`situationen-2.js` → `lagerfeuer`): Mika will, dass Pit über das Feuer springt.
  - **Fahren üben** (`ORT_AKTIONEN.ueben`): Wer den Lieferwagen zugegeben hat – oder bei Fränz gut steht –, darf einmal am
    Tag mit ihm daneben fahren. Zugeben öffnet also wieder eine Tür.
  - Die Straßen zum Leuchtturm und zum Strand sind jetzt EINE durchgehende Hauptstraße (keine Lücke am Dorfplatz), mit
    zwei Wagen. Die Orte im Handy stehen zweispaltig (zwölf Orte passen auf einen Bildschirm).
  - **Handy (Meldung 12.11., 22 Uhr):** „Deine Karten“ war höher als das Bild, der Knopf unten nicht erreichbar, Wischen
    ging nicht. Alle vollen Bildschirme (`.rs-voll`) sind jetzt `.ov-scroll` (Wischen erlaubt), beginnen oben, die Karten
    stehen am Handy als flache Zeilen und die Knöpfe bleiben unten sichtbar. Test: `tests/scenarios/respawn-handy.mjs`.
  - **Durchatmen** (`oberflaeche.js` → `atmen`, Szenen-Schritt `['atem', { zuege }, (ergebnis) => Schritte]`): Finger halten =
    einatmen, loslassen = ausatmen, drei Züge. Wird angeboten, wenn zu viel Druck eine ruhige Antwort sperrt („Erst
    durchatmen.“, einmal je Auswahl) – danach steht dieselbe Auswahl wieder da, oft mit der ruhigen Antwort frei. Auch am
    Steg („Ans Wasser setzen“). Ein kleines Spiel mit Sinn (erst runterkommen, dann antworten), ohne ein Wort der Belehrung.
  - **Zuhören** (`welt.js` → `merkFrage`): Wer jemandem Pommes ausgegeben hat, wird ab dem nächsten Tag beim Reden einmal
    gefragt: „Weißt du noch, was ich dir erzählt hab?“ – drei Antworten, die richtige gibt Nähe, die falsche kostet nichts.
  - **Einstieg:** In der allerersten Runde folgen auf die Ankunft vier kurze Sätze, wie ein freier Tag geht (einmalig).
  - Im Hub steht RESPAWN als Kachel bei den Materialien (Klassebuch: `hub-apps.js`, Test `respawn-kachel.js`).
- **Offen:** Spieltest mit Jugendlichen, Frauen-Modelle (Paket „Ultimate Modular Women“ fehlt noch), Gesichtsausdruck der
  neuen Figuren.
