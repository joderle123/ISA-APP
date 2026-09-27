# LUMO – Demo „Hafen-Dorf“ (Stand: Demo-Woche)

> **PFLICHT für alle Agenten, die Story, Texte oder Dialoge schreiben, prüfen oder kritisieren:** zuerst
> `docs/LEITPLANKE-LEHRKRAFT.md` lesen (Verständlichkeit für die Schüler, ihre Problematik im Vordergrund – geht vor
> „nicht zu einfach“).

Kurzanleitung für die Lehrkraft. Die Demo umfasst das Modul 0 „Ankommen“: die Ankunft und die drei Hafen-Quests.
Alles läuft offline in einer einzigen HTML-Datei, ohne Konten, ohne Namen, ohne Netz.

## Öffnen
- Datei **`dist/index.html`** auf das iPad (Safari) oder den PC kopieren und doppelt antippen bzw. öffnen.
  `dist/lumo-vorschau.html` ist dieselbe Datei mit anderem Namen (für Vorschau-Links).
- Erster Start: kurzes Intro (antippen überspringt), dann das **Stil-Studio** (Avatar in 1–2 Minuten, „Fertig“ reicht).
- Der Spielstand liegt nur auf dem Gerät (Browser-Speicher). Beim nächsten Öffnen geht es an derselben Stelle weiter
  („Weiter spielen“). Nach jeder fertigen Quest wird automatisch gespeichert, sonst alle 60 Sekunden.
- Wichtig für die Klasse: **jedes Gerät hat seinen eigenen Spielstand.** Wer am selben iPad spielt, spielt denselben Stand.
  **Neu anfangen:** Pause (II) → Einstellungen → „Neu anfangen …“ → „Ja“. Das setzt **nur den eigenen Spielstand**
  zurück; andere Spielstände auf dem Gerät und die Lehrer-Einstellungen bleiben (wichtig auf geteilten iPads).
  Alles löschen geht nur noch über `index.html?debug` → Kasten „Debug“ → „wipe“ oder die Website-Daten in Safari.
- Lehrerheft zum Drucken: `dist/lehrerheft.html` (Codes, Rückseiten-Sätze, Debrief-Fragen je Einheit).

## Ablauf der Demo (ca. 20–25 Minuten)
1. **Ankunft** (2 min): Das letzte Boot legt an, der Hafen ist halb grau. Am Steg wartet Kapitänin Ilda und gibt den
   **Blick** (Kraft-Knopf ★): Über jeder Figur erscheint ihre Gefühlsfarbe. Danach sagt Ilda: Der Kurs-Code öffnet den Auftrag.
2. **Code eingeben:** Pause (II) → Tagebuch → **Code**. Wort tippen (Vorschlagsliste hilft), Groß/Klein egal.
3. Jede Quest endet mit einem **Aufnäher** (auf dem Hoodie; umdrehen zeigt den Kurssatz), Lichtsplittern und einer
   **Farbwelle**, die den Hafen Stück für Stück bunt macht. Nach der dritten Quest ist der Hafen ganz bunt, alle vier
   Signalfeuer brennen (Schnellreise und Speichern).

## Die Geschichte (für die Lehrkraft)
Ausführlich in `docs/STORY.md`. Die Geschichte trägt das Kurs-Thema, sie ersetzt es nie: Nichts davon ist eine Übung,
und wer eine Stunde fehlt, versteht jede Szene trotzdem für sich.

- **Prämisse:** Du kommst mit dem letzten Boot vor dem Herbst auf eine Insel, die grau wird. Vor einem Jahr ging beim
  Sommerfest der Leuchtturm aus, und seitdem redet niemand darüber. Am Turm hängt auch der Funkmast: Auf der Insel gibt
  es kein Netz.
- **Was auf dem Spiel steht:** Ohne Licht kommt im Herbststurm keine Fähre. Kapitänin Ilda will den Hafen zum Ende der
  Saison schließen (sie sagt es erst am Ende der Demo, auf „Und dann?“). Am Steg stehen gepackte Kisten mit Namen.
- **Deine eigene Geschichte:** Im Handy der Spielfigur liegt ein Satz, der nie abgeschickt wurde. Wem, was und warum
  sagt das Spiel nie. Jede:r kann etwas hineinlegen, ohne es erzählen zu müssen.
- **Die Gegenstimme:** Mika und die Vulkan-Crew sagen „Vergessen ist besser. Wer redet, verliert.“ Das klingt
  überzeugend, weil letzten Sommer Tratsch wirklich geschadet hat. Mika ist kein Bösewicht; er ist später erlösbar,
  aber nicht einfach.
- **Szenen zwischen den Quests:** die Bootsfahrt · eine Nacht mit Ilda am Feuer neben Jhemps leerem Stuhl (nach BOJE,
  das Spiel springt dafür auf 22:30 Uhr und danach auf den Morgen) · Jolies Zeichenheft (nach DELFIN) · ein Morgen mit
  Mika an der Hafenmauer (nach OTTER, Ende der Demo mit „Noch nicht.“).

<details><summary><b>Spoiler: die drei Entscheidungen und was sie ändern</b></summary>

Keine Wahl ist „richtig“. Jede kostet etwas in einer Beziehung, keine kostet Fortschritt oder Belohnung, und nichts
wird blockiert. Gespeichert wird nur im Spielstand (`flags.m0.*`).

| Wahl | Wo | Möglichkeiten | Was sich ändert |
|---|---|---|---|
| **Jolies Geheimnis** | BOJE, bei Jolie am Ufer | „Versprochen.“ · „Das kann ich nicht versprechen.“ | Jolies Satz am Lagerfeuer; in Jolies Heft weiß sie, ob du dicht gehalten hast. |
| **Ilda fragt direkt** | Nacht am Feuer | „Weiß ich nicht.“ · „Frag sie selbst.“ · „Ja. War sie.“ | Ausweichen merkt Ilda („Du hältst dicht. Gut für sie. Schlecht für mich.“); Weitersagen merkt Jolie; Zurückgeben schickt Ilda zu Jolie. Heft-Szene und Kodex bei OTTER reagieren. |
| **Das alte Festplakat** | DELFIN, bei Tun | „Abreißen.“ · „Hängen lassen.“ · „Umdrehen.“ | Mikas Spruch reißt nur mit Jhemps Gesicht ab (Jolie zeichnet ihn nach); Umdrehen ist genau das Schweigen der Insel. Mikas Spitze am Ende passt zu deiner Wahl. |

Dazu am Ende eine kleine Wahl bei Mika: Wer ihm recht gibt, bekommt ein Angebot seiner Crew (nur Text, wird später
aufgegriffen). Wer zurückfragt „Und wem hilft Schweigen?“, hört ein einziges Wort: „… Mir.“
</details>

## Die Codes
| Code | Einheit | Quest | Dauer | Was passiert |
|---|---|---|---|---|
| **BOJE** | j1-e01 Willkommen – unser Rahmen | Landgang: Der Hafen-Kodex | ≈ 5 min | Möwe klaut Ildas Schlüssel (Lauf über Steg, Kisten, Dächer = Bewegungs-Tutorial) · am Feuer mit Tun und Ilda Regeln aushandeln · die einzige graue Figur (Jolie) finden und sich einfach dazusetzen → Splitter 1 |
| **DELFIN** | j1-e02 Kennenlernen in Bewegung | Das Laternenfest | ≈ 5 min | Tun fragen – erst „Und dann?“ verrät etwas Echtes, ein Faden zu Jolie erscheint · drei Funken vom Feuer zu den Laternen tragen (Rennen schwappt) · Komplimente für Taten lassen die Laterne steigen |
| **OTTER** | j1-e03 Wir als Team | Die Brücke der Drei | ≈ 6 min | Brücke nur zu dritt · Jolie mit Symbolbefehlen durch die dunkle Hafengrotte lotsen (sie hat ein Stopp-Recht) · Rollentausch (freiwillig) · die Crew ergänzt den Kodex um eine Zeile → Crew-Ruf |
| HERZGLAS-99 | Demo (Team) | – | – | alle übrigen Einheiten als Kurzfassung freischalten (nur zum Ausprobieren) |
| LEUCHTFEUER-42 | Lehrer-Panel | – | – | Codeliste, Inselwetter, Lines & Veils, Figuren umbenennen, Gefühlsfarben |
| KOMPASS-0 | Modul 0 | – | – | für Neue: alle drei Hafen-Einheiten als Kurzfassung |

Die Codes gelten für jede Einheit genau einmal pro Gerät. Ein später eingegebener Code setzt ausgelassene frühere
Einheiten automatisch auf die 3-Minuten-Kurzfassung (Kraft, Splitter und Schleier-Anteil sind da, die volle Quest bleibt
mit ihrem Code erhalten).

## Was die Jugendlichen tun können
- Frei laufen, springen, rennen (Joystick ganz nach vorn = rennen, Springen). PC: WASD oder Pfeile, Leertaste springen,
  E/Enter = Aktion, Q/F = Kraft, Umschalt = langsam gehen. Kamera mit dem zweiten Finger oder der Maus.
- Mit Figuren reden (Aktionsknopf, wenn „Reden“ erscheint), vorlesen lassen (Lautsprecher in jeder Blase).
- Kraft ★ tippen: **Blick** – Auren pulsieren, die nächste Figur verrät ein Gefühlswort. Ab e02: Fäden zwischen Figuren mit
  derselben Sache. Ab e03: **Crew-Ruf** (Kraft-Rad halten).
- Tagebuch: Aufträge (aktueller Schritt, Kompass-Marker), Aufnäher mit Rückseite, Echte-Welt-Karte (einmal antippen:
  gemacht / versucht / diesmal nicht – jede Antwort gibt denselben Stich), Kräfte, Stil, Code.
- Minispiele wiederholen (Bestwerte nur auf dem Gerät): Hafen-Dächer-Rennen, Laternen-Satzbau, Hafengrotte.
- Signalfeuer: Schnellreise, Speichern, „Für heute Schluss“ (Abend am Feuer mit Rückblick).
- Baumhaus (−30/98) mit Spiegel (Stil-Studio) und Hängematte.

Sicherheit ist immer an: Pause/X überall, kein Tod, keine Rangliste, Fehler kosten nur Sekunden. Regel 7: höchstens
12 Wörter pro Blase.

## Neu im Feinschliff
- **Ziel-Zeile** oben mit Kompass-Pfeil und Entfernung. Kommt man 40 Sekunden dem Ziel nicht näher, pulsiert sie sanft.
- Die Hauptfigur einer Szene **wartet am Ort** der Szene (z. B. Ilda am Steg statt nach Tagesplan am Dorfplatz).
- **Aufnäher-Moment:** Nach einer Quest wächst der Aufnäher oben ins Bild, glänzt und fliegt auf die Figur, mit Ton.
  Er wartet, bis kein Dialog und kein Fenster offen ist. Mit „weniger Effekte“ nur ein Einblenden.
- Kleine Rückmeldungen: der Aktionsknopf federt, Funken beim Aufheben und Ablegen, Funkenring beim Quest-Ende.
- Namensschilder sind kleine Pillen in fester Größe, blenden sich bei Gedränge und während Dialogen aus.
- Der Lichtstrahl über dem Ziel blendet nicht mehr den halben Bildschirm, wenn die Kamera darin steht (Hochformat).
- „Neu anfangen“ im Pause-Menü (siehe oben), zweistufig und nur für den eigenen Spielstand.

## Bekannte Lücken (Demo-Stand)
- **Andere Regionen** (Strand, Dschungel, Klippen, Markt, Vulkan, Moor) sind begehbar, aber grau. Glimm sagt beim
  Betreten „Grau hier. Kommt bald.“ Ihre Quests kommen mit den Modulen 1–9. (Die Test-Quest j1-e11 „Das Sturmbarometer“
  an den Klippen ist mit dem Code WELLE bereits spielbar, aber unfertig.)
- e01 ist gegenüber dem Design gekürzt: drei Kodex-Runden in einer Szene statt vier Feuer mit eigenen Figuren; die
  Kodex-Regeln verändern das Weltverhalten noch nicht.
- e02: „Zwei Wahrheiten, eine Lüge“ und die Lichterkette mit Feuerwerk fehlen; die Laternen leuchten über die Farbwelle.
- e03: die Brücke ist eine Szene (keine echte Kisten-Physik); die Grotte läuft als Symbol-Minispiel ohne eigenen Innenraum.
- Joker j07 „Senait kommt an“ (Code NEST) ist noch nicht gebaut.
- Mehrere Spielstände pro Gerät gibt es im Speicher, aber noch keine Auswahl für die Jugendlichen (nur im Lehrer-Panel sichtbar).
- Nachtszene: Eine Dorf-Figur kann noch durchs Bild laufen. Im Schlussbild mit Mika springen vier Figuren zum Spieler; ein Laternenpfahl kann kurz die Sicht verdecken.
- Die späteren Folgen der Entscheidungen (Module 3–9) sind geplant, aber noch nicht gebaut. In der Demo reagieren nur Zeilen.
- Puls, Skills-Koffer, Baumhaus-Möbel und Chronik sind vorhanden, aber im Hafen noch ohne Rolle.
- Vorlesen braucht eine deutsche System-Stimme (iPad: Einstellungen → Bedienungshilfen → Gesprochene Inhalte).
- Grafikstufe stellt sich automatisch ein; ruckelt es, im Pause-Menü „Grafik: niedrig“ wählen.

## Für Entwickler
`npm run build` erzeugt `dist/`. Tests: `npm run test:fast` (Inhalte, Texte, Einheiten), `node tests/smoke.mjs`,
`flock /tmp/lumo-chrome.lock node tests/scenarios/demo.mjs` (spielt den ganzen Demo-Pfad headless durch, 38 Prüfungen inkl. der Story-Entscheidungen, Nachtszene, Aufnäher-Moment und „Neu anfangen“, und legt Screenshots `200_…`–`207_…` im
`SHOTS`-Ordner ab). Dauer mit Software-Grafik: etwa 10–15 Minuten.
