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
  - **Rennen gegen Pit** (`lauf.js`, `ORT_AKTIONEN.rennen`): vom Brunnen in 29 Sekunden zum Leuchtturm – frei in der Welt,
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
  - **Frisuren und Kopfbedeckungen** (`figur3d.js` → `baueFrisur`): Das Figuren-Paket hat nur kurze Männerfrisuren. Jede
    Figur bekommt jetzt die Frisur aus ihrem Aussehen (`look.hairStyle`: lang, bob, dutt, flechtzoepfe, locken, kopftuch,
    irokese, stachel; `look.head`: muetze, cap, stirnband, bandana) als einfache Formen am Kopfknochen. Volle Frisuren
    blenden das kurze Haar des Kopfmodells aus. Jolie, Yara, Noor, Maëlle, Ilda und Oma Lucinda haben Köpfe ohne Bart und
    Hut und etwas schmalere Schultern. (Echte Frauen-Modelle bleiben besser – Paket „Ultimate Modular Women“.)
  - Im Hub steht RESPAWN als Kachel bei den Materialien (Klassebuch: `hub-apps.js`, Test `respawn-kachel.js`).
- **Offen:** Spieltest mit Jugendlichen, Frauen-Modelle (Paket „Ultimate Modular Women“ fehlt noch), Gesichtsausdruck der
  neuen Figuren.
  - **Ideen für heute** (`welt.js` → `ideenFuerHeute`): Im Handy stehen unter „Heute“ bis zu drei Hinweise, wo gerade etwas
    los ist („Pit übt Tricks am Brunnen.“) – jeden Tag andere, nur Dinge, die heute wirklich gehen, nie Mist. Antippen
    bringt einen hin. Wer müde ist, sieht zuerst das Bett; bei viel Druck zuerst den Steg. Kein Auftrag, kein Lohn.
  - **Ankommen mit Blick auf den Ort** (`ORTE[].steh`, `plugin.js` → `stehplatz`): Wer sich vom Handy an einen Ort bringen
    lässt, sah am Zuhause nur eine Wand, am Leuchtturm den Turm nie, am Garten stand man auf der Straße und am Lieferwagen
    im Nachbarauto. Diese vier Orte haben jetzt einen festen Stehplatz mit Blickpunkt. Der Leuchtturm-Ort liegt neu oben
    am Turm (vorher am Hang); das Rennen gegen Pit hat dafür 29 statt 26 Sekunden.
  - **Kamera im Hochformat** (`actors/camera.js` → `rig.hochkant`, nur von RESPAWN gesetzt): Am Handy verdeckte die eigene
    Figur, wer vor ihr stand. Der Blickpunkt liegt jetzt 0,5 m höher und die Kamera schaut etwas steiler – die Figur steht
    tiefer im Bild, darüber sieht man Leute und Ort. LUMO und das Querformat bleiben, wie sie waren.
  - **Merken** (`oberflaeche.js` → `merken`, Szenen-Schritt `['merk', { titel, dinge }, (ergebnis) => Schritte]`, Ergebnis
    `{ richtig, von }`): Jemand sagt, was er braucht – drei, vier, fünf Dinge, kurz zu sehen, dann weg. Danach aus sechs
    Dingen in derselben Reihenfolge antippen. Viel Druck: kürzer zu sehen („Dein Kopf ist voll“). Benutzt im Garten bei
    Oma Lucinda (alles richtig: mehr Geld, mehr Nähe – „Du hörst zu. Das können wenige.“). Die kleinen Spiele (Geschick,
    Durchatmen, Merken) sind jetzt genau so breit wie das Bild (vorher 4 Pixel zu breit).
  - **Lucindas Garten ist zu sehen** (`stadt.js` 2d2, Kenney „Nature Kit“, CC0): drei Beete mit Salat, Mais, Kürbis, Melone,
    Möhren und Blumen neben ihrem Stand. `tools/stadt/stadt.py` liest jetzt auch Bausätze ohne Farbtafel (Farbe im Material).
  - **Nicht zucken** (`oberflaeche.js` → `nichtZucken`, Szenen-Schritt `['zuck', { titel }, (ergebnis) => Schritte]`, Ergebnis
    `{ richtig, von }`): Mika täuscht an (die Faust wackelt) oder wirft wirklich einen Kronkorken (gelb, groß). Tippen nur
    beim echten Wurf – wer bei der Finte oder zu früh tippt, hat gezuckt. Sieben Durchgänge; viel Druck lässt weniger Zeit.
    Benutzt am Krater bei „Mit der Crew abhängen“. Sinn ohne Lehre: erst schauen, was wirklich passiert, dann reagieren.
  - **Reste aus LUMO entfernt:** Der Knopf „Feuer“ an den Signalfeuern (Speichern in LUMO) und der Hinweis „Bleib kurz. Schau.“
    an Aussichtspunkten erscheinen in RESPAWN nicht mehr (`signalfeuer.js`, `collectibles/plugin.js`, je eine Zeile).
  - **Der Morgen** (`plugin.js` → `einTag`): Jeder Tag begann mit einem dunkelbraunen Bild – die Kamera steckte in der Wand
    vom Bootshaus, die Figur war nicht zu sehen. Jetzt steht man morgens vor der Tür und schaut ins Dorf (zum Brunnen).
  - **Szenen am Zuhause** („Die Lüge für Tun“, „Zuhause“): Die Kamera stand im Bootshaus, das Bild war dunkel. Beide Szenen
    spielen jetzt vor dem Haus (`versatz`, darf auch eine Funktion der Runde sein). Gefunden mit einem Durchlauf aller
    Szenen am Handy (jede einmal starten, erstes Bild ansehen).
  - **„Schlafen gehen“** verdeckte Sprechblasen und Auswahl, sobald die Kraft leer war. Der Knopf ist jetzt nur zu sehen,
    wenn gerade niemand spricht und nichts offen ist.
