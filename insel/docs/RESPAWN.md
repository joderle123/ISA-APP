# RESPAWN – ein Jahr auf der Insel, dann nochmal (Stand 12.11.2026)

Zweiter Spielmodus auf der LUMO-Insel, ohne Kursbezug. Wunsch aus der Praxis: „wie GTA, nur pädagogisch“ – offene Welt,
man darf fast alles tun (auch Mist), keine Waffen, kein Gefängnis. Die Folgen sind zwischenmenschlich und kommen später.

- **Öffnen:** `dist/respawn.html` (oder `index.html?mode=respawn`). Bau: `node build.mjs`. LUMO selbst bleibt unverändert.
- **Ablauf:** Startkarten ziehen (Kopf, Zuhause, Tasche) → vier Jahreszeiten mit je drei freien Tagen (Kraft 3 je Tag) →
  Finale am Steg → Ausgang (11) und Akte („Das steht drin“ / „Das war wirklich“) → nochmal mit anderen Karten.
- **Frei tun:** an Leuten (reden, helfen, Geld leihen/zurückgeben, entschuldigen, „Gemein sein …“: aufziehen, heimlich
  filmen, schubsen) und an Orten (jobben, in die Kasse greifen, Tor besprühen, Boot nehmen, zocken, schlafen …).
  Zeugen sind die Figuren, die in der 3D-Welt wirklich in der Nähe stehen.
- **Folgen:** jeden Morgen (`daten/welt.js` → `FOLGEN`), jede einmal: Gerüchte im Gruppenchat, Rückzug, falscher Verdacht
  auf andere, Einträge in der Akte. Ereignisse des Tages stehen mit Marke in der Welt; liegen lassen hat auch Folgen (`VERPASST`).
- **Druck:** sperrt sichtbar ruhige Antworten, bringt eine Uhr; die Startkarten ändern die Regeln (`run.js`).
- **Dateien:** `src/respawn/` – `run.js` (Regeln, ohne Browser), `buehne.js` (Szenen in der 3D-Welt), `oberflaeche.js` + `stil.js`,
  `plugin.js` (Ablauf), `daten/` (Karten, Situationen, Welt, Ausgänge, Akte, Figuren).
- **Schreibregeln:** Blase ≤ 12 Wörter, Wahl ≤ 6 Wörter, keine Lehre, jede Wahl kostet etwas. Hilfe-Nummern nur 116 111 und 112.
- **Sanfter Rahmen:** `?sanft` (oder `meta.sanft`) nimmt Alkohol, Schlagen und Schubsen heraus.
- **Tests:** `node --test tests/unit/respawn-run.test.mjs` · `node tests/scenarios/respawn.mjs` (Autopilot, ganze Runden).
- **Offen:** Spieltest mit Jugendlichen, mehr Aktionen und Orte, Feinschliff der Figuren, Kachel im Hub.
