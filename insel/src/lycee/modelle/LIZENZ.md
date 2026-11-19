# Modelle des Lycée-Simulators

Alle Modelle stehen unter **CC0 1.0** (gemeinfrei): frei nutzbar, auch ohne Namensnennung. Geladen am 17.11.2026 von
quaternius.com (Google-Drive-Ordner der Pakete).

## lycee.glb
Requisiten, je Modell ein Netz mit Eckpunktfarben (keine Texturen), Ursprung unten in der Mitte, quantisiert
(KHR_mesh_quantization). Namen `<gruppe>/<modell>`:
- `moebel/…` – „Ultimate Furniture“ (Desk, Chair, OfficeChair, Bookcase, Bookcase_Books, Table, Table2, Sofa2, Stool, ShortCloset, Closet, Door1, Door2)
- `einrichtung/…` – „Furniture“ (BookCaseLargeBooks, ChairCushioned, Plant, CoffeeTable, SofaLong, Table)
- `innen/…` – „Ultimate Home Interior“ (Stühle, Couch, Schubladen, Türen, Teppich, Säule, Waschbecken, Spiegel, Regal, Vorhänge)
- `verkehr/…` – „Public Transport“ (Bus, SchoolBus, Fahrräder, Hütchen, Schild)
- `strasse/…` – „Modular Streets“ (Straßenlampen, Stoppschild)
- `essen/…` – „Ultimate Food“ (Kantine: Apfel, Banane, Flasche, Brot, Burger, Croissant, Donut, Pommes, Gabel, Suppe, Hotdog, Schokolade)

Erzeugen: Blender als Python-Modul (`pip install bpy` für Python 3.13), dann
`python tools/lycee/requisiten.py -- roh.glb moebel=<ordner>+Desk,Chair … essen=<ordner>+Apple,…`
und mit `@gltf-transform/cli`: `merge`, `weld`, `quantize --quantize-position 14 --quantize-normal 8 --quantize-color 8`.

## frauen.glb
„Ultimate Modular Women“ (Quaternius, CC0): sechs Figuren (Adventurer, Casual, Formal, Punk, Suit, Worker) mit EINEM Skelett –
dasselbe Skelett (62 Knochen) wie `src/respawn/modelle/menschen.glb` – und den Bewegungen Idle, Idle_Neutral, Walk, Run,
Wave, Interact, HitRecieve, Death, Roll. Erzeugen: `python tools/lycee/frauen.py -- <ordner mit den .gltf> frauen.glb`.

## menschen.glb, kenney.glb
- `menschen.glb` = `src/respawn/modelle/menschen.glb` („Ultimate Modular Men“, Quaternius, CC0), nur gepackt.
- `kenney.glb` = Auswahl aus `src/respawn/modelle/stadt.glb` (Kenney, CC0): Bäume, Hecken, Bänke, Brunnen,
  Skate-Elemente, Autos, Blumen, Kisten, Werkbank. Erzeugen:
  `node tools/lycee/kenney-auswahl.mjs stadt.glb kenney-roh.glb haus/tree-large haus/tree-small …`

## Gepackt (17.11.2026)
Alle vier Dateien sind mit Meshopt gepackt (`gltf-transform meshopt <ein> <aus> --level medium`, Erweiterung
EXT_meshopt_compression; das Spiel entpackt mit `three/examples/jsm/libs/meshopt_decoder.module.js`).
Das Spiel wird so von 22 MB auf rund 6 MB kleiner.

## kaykit.glb
KayKit „Furniture Bits“, „City Builder Bits“ und „Restaurant Bits“ von Kay Lousberg (www.kaylousberg.com), **CC0 1.0**.
Geladen am 19.11.2026 von den öffentlichen GitHub-Archiven (github.com/KayKit-Game-Assets). Die Farben werden aus dem
Farbatlas in die Eckpunkte übernommen (sRGB), ein Netz je Modell, Namen `kk/<modell>`.
Erzeugen: `python -I tools/lycee/kaykit.py kaykit.glb <Furniture-Ordner> <City-Ordner> <Restaurant-Ordner> -- armchair couch_pillows …`
(braucht numpy und Pillow).

## natur.glb
„Stylized Nature MegaKit“ (Standard, kostenlos) von Quaternius, **CC0 1.0**. Geladen am 19.11.2026 über quaternius.itch.io
(`tools/lycee/itch-laden.sh`). 17 Modelle (Laubbäume, Kiefern, Büsche, Blumen, Gras, Farn, Klee, Steine, Pilze) mit
eingebetteten, verkleinerten Texturen (Blätter 512 px, sonst 256 px), Normalen als int8 (KHR_mesh_quantization).
Erzeugen: `python -I tools/lycee/natur-pack.py natur.glb <glTF-Ordner> CommonTree_1 CommonTree_3 …`
