# Roadmap: Von der Insel zur gemeinsamen Welt

## Die Vision (Lehrkraft, September 2026)
Die Insel soll immer größer werden:
- Die Jugendlichen loggen sich ein, sind **gemeinsam auf der Map** und lösen **zusammen Rätsel**.
- **Viele Themen auf vielen Maps.**
- Die Lehrkraft hat einen **God Mode** und kann sich alles von überall anschauen.
- Es gibt integrierte **Minispiele**, etwa einen Basketballkorb zum Werfen.
- Vielleicht wird es sogar ein Ort, der ihre Spiele zuhause ablöst und an dem sie **mit Freunden chillen**.

## Leitplanken, die immer gelten
- Spaß zuerst, Lernen nebenbei (siehe DESIGN.md, Gesetze §0).
- Sicherheit vor Reichweite: **kein freier Chat**, nur Emotes und vorgegebene Sätze. Die Lehrkraft kann einfrieren, stummschalten und wegteleportieren.
- Datensparsam: so wenig personenbezogene Daten wie möglich, Hosting in der EU, Freigabe durch CDSE-Leitung und Datenschutzbeauftragte.
- Keine Ranglisten einzelner Jugendlicher, keine Kaufmechaniken, keine Werbung.

## Stufe 1 – Einzelspieler-Insel (in Arbeit)
- LUMO Staffel 1 als Einzelspieler-Abenteuer zum Skills-Kurs (Module 0–3 zuerst, danach 4–9).
- Codes aus dem Unterricht schalten Quests frei, Spielstand nur auf dem iPad.
- Technik wird **mehrspielerfähig vorbereitet** (siehe DESIGN.md §20a).

## Stufe 2 – Klassen-Server im Unterricht
- Die Lehrkraft startet einen **Raum**. Die Jugendlichen treten mit einem **Raum-Code** bei, ohne Login und ohne Namen (Avatar und Spielname aus dem Spiel).
- Alle sind gleichzeitig auf der Insel: **Koop-Rätsel** (Druckplatten für mehrere, gemeinsames Tragen, Signale weitergeben, Rollen wie Späher/Lotse/Baumeister), gemeinsame Farbwellen.
- **God Mode der Lehrkraft:**
  - Übersichtskarte mit allen Avataren
  - freie Kamera, jedem zuschauen
  - alle oder einzelne einfrieren, zum Treffpunkt rufen
  - Ereignisse auslösen (Inselwetter, Rätsel starten)
  - Szenen ausblenden, Nachrichten an alle
- Kommunikation: Emotes, Schnellsätze („Hilf mir!“, „Hier lang!“, „Gut gemacht!“), Ping-Marker. Kein Freitext.
- Nichts wird dauerhaft auf dem Server gespeichert. Ist der Raum zu, sind die Daten weg.
- Technik: kleiner WebSocket-Server (z. B. Node mit Colyseus oder Cloudflare Durable Objects). Der Server ist maßgeblich für gemeinsame Rätsel. Gratis-Stufe oder ca. 5–20 € im Monat.

## Stufe 3 – Die große Welt
- **Konten:** pseudonym (Spielname + Schul-Code), keine Klarnamen. Einwilligung von Schule und Eltern.
- **Viele Maps und Themen:**
  - Staffel 2 (Kursjahr 2) und Staffel 3 (Kursjahr 3) als neue Inseln oder Gebiete
  - thematische Maps: Stadt (Ausbildung/Praktikum), Weltraum (Zukunft), Unterwasser (Gefühle)
- **Chill-Zonen:** Hangout, Baumhaus-Besuche, Musik, Fotos.
- **Minispiele:** Basketball-Korb, Skatepark, Rennen, Angeln, Fußball-Elfmeter, Parkour-Strecken, Versteckspiel. Alle mit Crew-Rekorden statt Einzelranglisten.
- **Zugang von zuhause:** nur mit festen **Öffnungszeiten** (z. B. nachmittags bis 20 Uhr), mit Moderationskonzept, Meldeknopf und Hilfe-Nummern (Kanner- a Jugendtelefon 116 111, BEE SECURE 8002 1234).
- Verbindung zum Klassebuch: Wochen-Missionen aus den Förderzielen, Fortschritts-Code zurück (siehe Plan in der Unterhaltung, später).

## Voraussetzungen, bevor Stufe 2 und 3 starten
1. Freigabe durch die CDSE-Leitung, Datenschutz-Folgenabschätzung, EU-Hosting.
2. Moderationskonzept: Wer schaut wann zu? Was passiert bei Mobbing im Spiel?
3. Elterninformation und Einwilligung (bei Stufe 3).
4. Budget für Server und Pflege (Updates, Sicherheit).

## Alternative, die man kennen sollte
**Minecraft Education** bietet Mehrspieler, Schul-Logins und einen Lehrer-Modus mit Kartenübersicht, Teleport und Einfrieren. Nach unserem Wissensstand ist es für Schüler:innen in Luxemburg kostenlos; das bitte prüfen. Der Nachteil: Es ist nicht das eigene Spiel, und die Kursinhalte passen weniger genau.
