# CREW – das 10-Minuten-Spiel für die Crew

CREW ist ein tägliches Gruppenspiel für 4–6 Jugendliche (12–16 Jahre) mit sozial-emotionalem Förderbedarf.
Die Lehrkraft zeigt das Spiel am Beamer oder am Lehrer-iPad. Die Jugendlichen nutzen ihre iPads als
„Antwort-Karte“ (Zahl, Wetter, Ja/Nein, A–D, Gefühl) und halten sie auf „Zeigt her!“ hoch.

Alle spielen zusammen als eine Crew. Es gibt keine Einzel-Rangliste. Die gesammelte Energie baut
ein gemeinsames Crew-HQ aus. Bei jedem neuen Level wählt die Crew per A/B, welches Teil dazukommt.

## So läuft eine Session (ca. 10 Minuten)

1. **Crew-Session starten** auf dem Startbildschirm. Eintippen, wie viele heute mitspielen.
2. **Wetter-Check (1 Min.):** Jede:r stellt geheim ein Wetter ein und dreht die Karte nur zur Lehrkraft.
   Du tippst einmal: „Alle eher sonnig“, „Gemischt“ oder „Bei einigen Sturm“. Genaue Zahlen gibt es nur
   auf Wunsch („genauer zählen“) und erst ab 6 Leuten. Bei Sturm: „1 Minute runterkommen“.
3. **Mission des Tages (4–5 Min.):** jeden Wochentag ein anderes Spiel. Eine Sitzungs-Uhr kürzt
   Runden, wenn die Zeit knapp wird.
4. **Nachspielzeit (1–2 Min.):** eine Frage, freiwillig. Passen ist okay.
5. **Belohnung:** Crew-Punkte werden zu Energie. Die Energie wird direkt nach der Mission gespeichert.

Sind alle Karten gezählt, geht das Spiel von allein weiter. Das spart Tipparbeit.

## Die Missionen

| Tag | Mission | Worum es geht |
|---|---|---|
| Montag | **Wer steht?** | „Steh auf, wenn du …“: schätzen, aufstehen, auflösen. Mit Goldener Karte und Blitzrunde. |
| Dienstag | **Gefühls-Radar** | Gleiche Situation, welches Gefühl? Wie stark? Ein Radar-Profi schätzt die Crew. |
| Mittwoch | **Clash** | Ein Streit zwischen zwei Fantasiefiguren. Zwei Teams bringen sie über 5 Level zum Frieden (nach der Friedenstreppe). |
| Donnerstag | **Feed-Check** | Echt, Meinung oder Fake? Gerüchte stoppen, Gruppendruck, Zivilcourage online. |
| Freitag | **Konter-Battle** | Aus einem blöden Spruch wird eine Stärke (Reframing). Der Crew-Tower wächst. |

Am Wochenende gibt es „Freie Wahl“. Mit „Andere Mission“ kannst du jederzeit tauschen.
In der **Solo-Zone** gibt es Spiele für eine Person (z. B. Chill-Zone, Gefühls-Decoder, Clash-Solo).

## Sicherheit im Spiel

- **X-Karte** (oben rechts): Jede Karte darf ohne Begründung übersprungen werden. Auch während einer Animation.
- **Pause** mit Atemkreis und **Hilfe** mit Kanner- a Jugendtelefon (116 111), BEE SECURE Helpline (8002 1234), Notruf 112, Polizei 113.
- **Heikle Karten** (Familie, Geld, Körper, Verlust …) sind aus, bis du sie im Lehrermodus einschaltest.

## Lehrermodus

Auf dem Startbildschirm unten rechts „Lehrkraft“ antippen. Die Start-PIN ist **1234**.
Beim ersten Öffnen musst du eine eigene PIN wählen. Bitte gut merken.
Nach drei falschen Versuchen ist der Zugang 30 Sekunden gesperrt.

Im Lehrermodus kannst du Missionen ein- und ausschalten oder direkt starten, heikle Karten freigeben,
Look, Crew-Name, Ton und Vorlesen einstellen und den Fortschritt sichern.

## Datenschutz und Spielstand

- CREW speichert **nichts über einzelne Jugendliche**: keine Namen, keine Antworten, keine Ranglisten.
- Gespeichert werden nur Crew-Name, Look, Energie, HQ-Teile, gespielte Missionen mit Datum und welche Karten schon dran waren.
- Der Spielstand liegt **nur auf diesem Gerät** (im Browser). Es gibt keinen Server.
- **Sichern:** Lehrermodus → „Fortschritt“ → Sicherungscode kopieren oder als Datei speichern.
  Auf einem anderen Gerät unter „Laden“ einfügen.

## Kostenlos online stellen (GitHub Pages)

1. Auf github.com ein kostenloses Konto anlegen (falls noch nicht vorhanden).
2. Ein neues **öffentliches** Repository anlegen, z. B. `crew`.
3. Die Dateien aus `crew/dist` hochladen: `index.html`, `sw.js`, `manifest.webmanifest`
   („Add file“ → „Upload files“ → „Commit changes“).
4. Im Repository: **Settings → Pages → Deploy from a branch**, Branch **main**, Ordner **/ (root)**, speichern.
5. Nach ein bis zwei Minuten läuft das Spiel unter `https://<name>.github.io/<repo>/`
   (z. B. `https://meinname.github.io/crew/`).

Der Link funktioniert auf allen iPads. Nach dem ersten Besuch geht CREW auch **offline**.
Tipp: In Safari „Teilen → Zum Home-Bildschirm“ legt ein App-Symbol an.

## Ohne Internet

`crew/dist/index.html` auf das O:-Laufwerk oder einen USB-Stick kopieren und in Chrome oder Edge öffnen.
Alles steckt in dieser einen Datei (auch Schriften und Grafiken).

## Für Entwickler:innen

- Quellcode: `crew/src` (core, content, missions, solo, base)
- Bauen: `node crew/build.js` → schreibt `crew/dist/index.html` und `crew/dist/crew-vorschau.html`
- Tests (Playwright): `node crew/tests/smoke.mjs` (ebenso radar, clash, feed, reframe, solo-test, hq)
