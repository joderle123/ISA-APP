# Figuren

`menschen.glb` stammt aus dem Paket „Ultimate Modular Men“ von Quaternius (quaternius.com), Lizenz **CC0 1.0** (gemeinfrei):
frei nutzbar, auch ohne Namensnennung. Vom Nutzer am 12.11.2026 als `Humans_Master.blend` heruntergeladen.

Umgewandelt mit `tools/figuren/wandeln.py` (Blender als Python-Modul: `pip install bpy`, dann
`python -I tools/figuren/wandeln.py -- Humans_Master.blend src/respawn/modelle/menschen.glb`).

Achtung: Oberteile, Beine und Füße sind in der Blender-Datei nur als halbe Körper mit Spiegelung gespeichert; `wandeln.py`
rechnet die Spiegelung fest ein (sonst fehlt im Spiel eine Körperhälfte).

Inhalt: ein Skelett (62 Knochen), Bausteine `<Stil>_Head|Body|Legs|Feet` für Adventurer, Beach, Casual, Casual2, Farmer, Punk,
Suit, Worker; Bewegungen Idle (angespannt), Idle_Neutral, Walk, Run, Wave, Interact, Punch_Right, Kick_Right, HitRecieve, Death.
Farben stehen je Material in der Datei (keine Texturen) und werden im Spiel je Figur neu gesetzt.

# Stadt

`stadt.glb` enthält Häuser, Läden, Straßenteile und Autos aus den Bausätzen „City Kit (Suburban)“, „City Kit (Commercial)“,
„City Kit (Roads)“ und „Car Kit“ von Kenney (kenney.nl), Lizenz **CC0 1.0**. Geladen am 12.11.2026.
Umwandlung: `python3 -I tools/stadt/stadt.py <ordner mit den entpackten Kits> src/respawn/modelle/stadt.glb`
(Farben aus der Farbtafel fest in die Eckpunkte, Teile je Modell zusammengefasst, keine Texturen).
Dazu seit dem 13.11.2026 (gleiche Quelle, gleiche Lizenz **CC0 1.0**): „Mini Skate“ (Rampen, Rail, Skateboard),
„Watercraft Kit“ (Boote, Bojen) und „Mini Market“ (Auslagen, Regale) – Namen im Modell: `skate/…`, `boot/…`, `markt/…`.
Dazu „Nature Kit“ (Beete, Gemüse, Blumen für Lucindas Garten; gleiche Quelle, **CC0 1.0**) – Namen im Modell: `natur/…`;
Blatt- und Erdfarben sind an die Insel angepasst (`NATUR_FARBE` in `stadt.py`).
Die Straßen selbst sind keine Bausteine: `stadt.js` legt sie als Band auf die Wege der Insel.
