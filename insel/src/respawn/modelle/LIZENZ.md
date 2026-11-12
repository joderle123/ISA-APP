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
