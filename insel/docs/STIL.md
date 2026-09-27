# LUMO · Stil-Bibel („Premium-Stilisiert“)

*Verbindliche Vorgabe für alle Grafik-Arbeitspakete. Ersetzt die Look-Zeile in DESIGN.md §1 („Low-Poly mit Flat-Shading“) durch den hier beschriebenen Look. Alle Werte sind Startwerte und dürfen im Screenshot-Vergleich (§15) feinjustiert werden, aber nie „nach Gefühl“ im Code.*

Referenzen (nur als Richtung, nichts wird kopiert): *Zelda: Breath of the Wild* (Licht, Nebel, Landschaft), *Genshin Impact* (Figuren, Konturen, Himmel), *Sky: Children of the Light* (Stimmung, Wolken, Bloom), *Wind Waker* (Gebäude-Proportionen, Wasser).

---

## 0. Zusammenfassung in fünf Sätzen

1. **Stilisiert, nicht „low-poly“.** Die Geometrie bleibt prozedural und sparsam, aber sie wird wie gemalt beleuchtet: Toon-Ramp mit 2–3 Bändern, kühl getönte Schatten, warmes Kantenlicht, saubere farbige Konturen.
2. **Licht ist das Hauptmotiv.** Ein gemalter Himmel, weiche Tiefen-Dunst-Schichten, Bloom auf allem, was leuchtet, und eine feste Farbkorrektur pro Tageszeit tragen 60 % des Eindrucks.
3. **Weniger, dafür bessere Details.** Keine spitzen Gras-Sterne, keine Icosaeder-Klumpen, keine Rausch-Facetten. Jedes Objekt hat eine klare Silhouette, drei Farbtöne und eine Akzentfarbe.
4. **Figuren sind Anime-Teenager (6,5 Köpfe), cool statt süß.** Große lesbare Augen, Haar in Strähnenklumpen mit Glanzband, flache Kleidung mit Bordüre, Kontur, Kantenlicht, echte Ausdrücke.
5. **Oberfläche = ruhiges Glas + eine Akzentfarbe (Gold).** Keine Bonbon-Verläufe, keine dicken Ränder, kleine elegante Namensschilder.

Die Insel ist eine **Postkarte, die man betreten kann** – das ist der Maßstab für jedes Bild.

---

## 1. Die zehn Regeln des Looks

1. **Drei Töne pro Fläche:** Licht, Halbton, Schatten. Nie Verläufe aus Zufallsrauschen, nie mehr als ±4 % Flächenvariation auf glatten Flächen.
2. **Schatten sind nie grau oder schwarz.** Sie sind die Albedo, abgedunkelt und in die Schattentönung der Tageszeit gedreht (§2.3).
3. **Alles Wichtige hat eine Kontur** (Figuren, Requisiten, Gebäude, Baumkronen). Gelände, Wasser, Wolken, Gras haben keine.
4. **Kantenlicht (Rim) auf Figuren und Requisiten**, auf der Sonnenseite warm, auf der Schattenseite kühl und schwach.
5. **Der Himmel ist gemalt**: vier Farbstopps, Horizontband, zwei Sonnenhöfe, Wolken mit zwei Tönen.
6. **Luftperspektive statt Nebelwand:** Ferne wird heller, kühler, entsättigt und verliert die Kontur, aber Silhouetten (Vulkan, Turm, Gewitterturm, Glimmerwolke) bleiben lesbar.
7. **Leuchtendes leuchtet:** Laternen, Feuer, Lava, Runen, Auren, Gezeitenbecken – mit Bloom (medium/high) oder Glüh-Sprite (low).
8. **Eine Akzentfarbe pro Region, eine pro Figur, eine (Gold) für die Oberfläche.**
9. **Silhouetten zuerst:** Jedes Objekt muss als schwarze Form erkennbar sein. Details kommen erst, wenn die Silhouette stimmt.
10. **Prüfen per Screenshot-Set (§15)** auf Qualitätsstufe „mittel“ (iPad), nicht auf „hoch“.

---

## 2. Palette

### 2.1 Globale Anker

| Zweck | Hex | Anmerkung |
|---|---|---|
| Tageslicht (Sonne) | `#FFF4DC` | Intensität 3.2 (Lambert-Skala von three) |
| Goldene Stunde (Sonne) | `#FFC27A` | Intensität 3.0 |
| Mondlicht | `#8FA6FF` | Intensität 0.9 |
| Kantenlicht warm | `#FFF1C8` | Sonnenseite |
| Kantenlicht kühl | `#9FB4FF` | Himmelsseite, 40 % der warmen Stärke |
| Schattentönung Tag | `#6E86C8` | wird mit der Albedo gemischt (§3.2) |
| Schattentönung Goldene Stunde | `#7A5FA8` | warm-violett |
| Schattentönung Nacht | `#141A44` | |
| Kontur-Basis | Albedo × 0.38, Sättigung × 1.2 | nie reines Schwarz (§4.3) |
| Tinte (UI) | `#14102A` | |
| Gold (UI-Akzent) | `#FFD166` | einzige Akzentfarbe der Oberfläche |
| Mint (Glimm) | `#2DE2C9` | nur Glimm und Puls-grün |
| Koralle (Warnung, Herz) | `#FF6B6B` | |
| Glas-Panel | `rgba(18,12,36,0.62)` | + Haarlinie `rgba(255,255,255,0.14)` |

### 2.2 Regionen (je Region: Haupt · Sekundär · Akzent · Boden hell/dunkel · Laub hell/dunkel · Fels · Schattentönung)

| Region | Haupt | Sekundär | Akzent | Boden hell / dunkel | Laub hell / dunkel | Fels | Schatten |
|---|---|---|---|---|---|---|---|
| **Hafen-Dorf** (goldene Stunde) | Ocker-Gold `#F2B24B` | Koralle `#FF7A59`, Meergrün `#2FB8A8` | Creme `#FFF3D6` | Sand `#F5D9A0` / nass `#D9A96B` · Gras `#A6D65A` / `#5F9E3C` | `#9ADE5A` / `#3B8A3E` | `#B39A86` | `#7A5FA8` |
| Hauswände Hafen | Creme `#F4E9D3`, Koralle `#E8735C`, Mint `#6FCFB8`, Ocker `#E9B95C`, Blau `#4F88C8` | Dächer Terrakotta `#C6553B`, Schiefer `#3F4460` | Holz `#B47A4E` / `#7A4E2E` | | | | |
| **Palmenstrand** | Türkis `#27D3C3` | Lagune `#0FA9C9`, Korallenrosa `#FF8FAB` | Muschel `#FFE6D0` | `#F7DFA8` / `#E4BE7C` | `#8EDC5C` / `#3DA35A` | `#C9B39A` | `#5F8FC0` |
| **Dschungel** | Sattgrün `#2E8B47` | Tiefgrün `#16523A`, Wasser `#0AA6A0` | Blüten `#FF5D8F`, `#FFD23F`, `#B48CFF` | `#6FA24E` / `#3F6E3A` | `#7ED957` / `#1D6E33` | moosig `#6A8A62` | `#2F5F7A` |
| **Sturmklippen** | Basalt `#4E5470` | Basalt hell `#7C829E`, Heide `#A77FC8` | Windrad `#8FA3FF`, `#2DE2C9` | Gras kühl `#86AB63` / `#587A44` | Kiefer `#4FA06A` / `#255E45` | `#5A6080` | `#3A3F66` |
| Gewitter | Wolke `#3A3E5E` | Wolkenkamm `#8F97C4`, Unterseite `#262A44` | Blitz `#E8ECFF`, Regen `#B8C4E6` | | | | |
| **Flüstermoor** | Torf `#4A3F2E` | Torf dunkel `#2F2820`, Birke `#F2F0E8` | Heide `#8A5FB8` / `#B48CFF`, Irrlicht `#9CFFE0` | `#5C4F3A` / `#2F2820` | `#D9E46A` / `#7FA63E` | Menhir `#6E6A7A` | `#4A3F6E` |
| **Markt-Hügel** | Gewürz-Ocker `#E9A83A` | Paprika `#D94A3A`, Safran `#FFD23F` | Markisen `#FF6B6B`/`#FFF3D6`, `#4F88C8`/`#FFF3D6` | Terrassen `#C8DC5C` / `#8FB04A` | `#B9DC5E` / `#5E9A3C` | Mauer `#D9C2A0` | `#7A5FA8` |
| **Vulkan** | Obsidian `#2B2430` | Basalt `#4B3F3D`, Asche `#7A6358` | Lava `#FF5A1A` / `#FFC24A`, Flaggen `#FF4D4D`, `#FFD23F` | Asche `#7A6358` / `#4B3F3D` | `#93B54F` / `#5E7A3A` | `#3A3038` | `#5A3A6E` |
| **Glimmerwolke** | Perlweiß `#E8E4F8` | Antennen `#2F2C3A` | Neon-Pastell `#FF8CF0`, `#5AD8FF`, `#FFD23F`, `#B48CFF`, Hologramm `#7CF0FF` | `#E8E4F8` / `#B9B3D6` | – | `#C9C4E0` | `#6A5FA8` |
| **Quellental** | Mineral `#F1E4C8` | Mineral warm `#E7A86A`, Wasser `#62E0E0` | Moos `#7CF07C`, Glühwürmchen `#FFE98A` | `#E7D3B0` / `#A88A66` | `#5FBF6A` / `#1F3A46` | `#B9A890` | `#3A5A6E` |
| **Leuchtturm** | Weiß `#FBF6EE` | Rot `#E8453C` | Laternen `#FFE7A0` | `#A4D563` / `#83C052` | `#8ED05A` / `#3F8A45` | `#8D8A94` | `#2A3878` |

### 2.3 Tageszeiten (Himmel, Licht, Schatten, Dunst, Farbkorrektur)

| Phase (Uhr) | Zenit | Himmel mitte | Horizontband | Sonne / Mond | Sonnenhof | Lichtfarbe · I | Schattentönung | Dunst nah → fern | Grade (Sät · Kontrast · Lift) |
|---|---|---|---|---|---|---|---|---|---|
| Morgen 5.7–8.5 | `#5C8FD8` | `#9FC5EE` | `#FFD7A8` | `#FFE9C0` | `#FFC58A` | `#FFD9A8` · 2.6 | `#7C8CD0` | `#F2E2CC` → `#E9D6C0` | 1.10 · 1.05 · `#000000` |
| Tag 8.5–15.5 | `#3D8BE8` | `#79B6F0` | `#C9E6F6` | `#FFFFFF` | `#FFF3D8` | `#FFF6E0` · 3.4 | `#6E86C8` | `#DCEBF6` → `#CFE3F4` | 1.08 · 1.06 · `#000000` |
| Goldene Stunde 15.5–19.0 | `#3E6BC0` | `#8FA0DC` | `#FFB86C` (mit Rosa-Saum `#F0A070`) | `#FFF1C8` | `#FF9A55` | `#FFC27A` · 3.0 | `#7A5FA8` | `#F6CBA0` → `#F2BC8C` | 1.14 · 1.08 · Blau-Lift `#00030D` |
| Dämmerung 19.0–20.3 | `#1A2358` | `#5A3E8C` | `#E86A6A` → `#FF9C6E` | `#FFB07A` | `#FF6A5A` | `#C08AB0` · 1.2 | `#3A3F80` | `#8A5A8A` → `#7A4A8A` | 1.00 · 1.05 · `#020210` |
| Nacht 20.3–5.7 | `#0A0F2C` | `#141B44` | `#2A3470` | Mond `#E8ECFF` | Mondhof `#3A4A8A` | `#8FA6FF` · 0.9 | `#141A44` | `#1E2650` → `#1A2050` | 0.78 · 1.04 · `#03051A` |

Sterne `#FFFFFF`/`#BFD4FF` (Größe 1–2 px, 3 % funkeln), Milchstraße `#4A4A8A` bei 30 %. **Die Nacht ist ein Blau, kein Schwarz**: Die dunkelste Fläche im Bild liegt bei `#0C1030`, nie darunter.

### 2.4 Grauschleier (Duotone statt Zement)

Der Schleier entsättigt nicht auf „grau“, sondern auf ein **kaltes Duotone**: Luminanz → Farbe: Schatten `#2E2A44`, Mitten `#7A7691`, Lichter `#C9C4D8`. Dazu Kontrast × 0.85, Nebel im Schleier `#8F8AA8` (nah) → `#B9B3CC` (fern), Schwebeteilchen `#B9B3CC`, Schleier-Rand als sichtbare **Nebelwand** (§10.3). Der Schleier muss *verflucht* aussehen, nicht *unfertig*.

### 2.5 Gefühlsfarben (Voreinstellung, Lehrkraft stellt ein)

Freude `#FFD23F` · Wut `#FF4D4D` · Angst `#9B6BFF` · Traurigkeit `#4D8CFF` · Ekel `#5AD24F` · Überraschung `#2DE2C9` (aus `actors/humanoid/aura.js`). Tanks: `TANK_COLORS` unverändert.

---

## 3. Shading-Modell

### 3.1 Toon-Ramp (Grundmodell für alles Feste)

`NdotL` (Sonne/Mond) wird in Bänder gebrochen; die Übergänge sind schmal, aber weich (antialiasiert):

| Objektklasse | Bänder (NdotL-Schwellen) | Werte (Faktor auf Albedo) | Übergangsbreite |
|---|---|---|---|
| Figuren, Haut, Haare, Kleidung | 2 + Kernschatten: `0.32`, Kernschatten `0.05` | 1.0 · 0.62 · 0.48 | ±0.03 |
| Requisiten, Gebäude | 3: `0.55`, `0.18` | 1.0 · 0.72 · 0.48 | ±0.04 |
| Baumkronen, Büsche | 2: `0.35` + Transluzenz (§3.4) | 1.0 · 0.55 | ±0.06 |
| Gelände (Wiese, Sand, Weg) | 3: `0.60`, `0.22` | 1.0 · 0.78 · 0.55 | ±0.10 (weicher, damit Hügel „gemalt“ wirken) |
| Klippen, Basalt, Fels | 3, flat-shaded (Facetten bleiben) | 1.0 · 0.70 · 0.45 | ±0.04 |
| Wolken | 2: `0.35` | 1.0 · Untersteite (§5.2) | ±0.08 |

Der Schattenwurf (Shadow Map) multipliziert *nur* in den unteren Bändern und nie unter das Schattenband (kein „Schatten im Schatten“).

### 3.2 Schattenfarbe

```
shadowAlbedo = albedo * mix(vec3(0.42), uShadowTint, 0.55)
col = mix(shadowAlbedo, albedo, rampBand)
```

`uShadowTint` kommt aus §2.3 (Himmel setzt es je Tageszeit, wie heute die Farbkorrektur). Zusätzlich liefert das Hemisphärenlicht den Himmels-/Bodenanteil (Himmel = Zenitfarbe × 0.9, Boden = Bodenfarbe der Region × 0.6, Intensität 0.9), damit Schatten oben kühl und unten warm sind.

### 3.3 Kantenlicht (Rim)

```
float ndv  = 1.0 - saturate(dot(N, V));
float rimW = smoothstep(0.58, 0.74, ndv);              // schmaler, klarer Saum
float sunSide = saturate(dot(N, L) * 0.5 + 0.5);
col += uRimWarm * rimW * sunSide * strength;            // Sonnenseite
col += uRimCool * rimW * (1.0 - sunSide) * strength * 0.4;
```

Stärke: Figuren 0.35 · Requisiten/Gebäude 0.18 · Kronen 0.14 · Gelände 0 · Wasser eigener Fresnel. Nachts Rim = Mondfarbe × 0.5. Im Schleier Rim = `#B9B3CC` × 0.25.

### 3.4 Sonderfälle

- **Laub (Transluzenz):** `col += albedoLight * 0.25 * pow(saturate(dot(-V, L)), 3.0)` – Kronen leuchten im Gegenlicht.
- **Haut:** Schattenband minimal wärmer: `uShadowTint` mit `#C86E6E` zu 30 % gemischt (Blut-Rot statt Grau).
- **Haare:** 2 Bänder + **Glanzband** (§8.3), kein Rauschen.
- **Metall (Leuchtturm-Gitter, Prothese):** 3 Bänder + harter Glanzpunkt `pow(NdotH, 48) * 0.6`.
- **Glas (Tanks, Brillen):** Fresnel-Rand `#DFF3FF` 0.6 + Füllung mit 35 % Alpha.
- **Leuchtend (Laternen, Lava, Runen, Kristalle):** Emission über 1.0 (Bloom-Schwelle 0.85, §10.1); kein Rim, keine Ramp.
- **Sprites/Partikel:** ungerampt, aber durch dieselbe Farbkorrektur (§13).

### 3.5 Umsetzung in three.js (r186)

1. **Materialtausch:** `MeshLambertMaterial` → `MeshToonMaterial` mit geteilter `gradientMap` (Canvas-Textur 32×1, `LinearFilter`, Werte aus §3.1 je Klasse; `NearestFilter` nur für Fels). `veil.patch()` funktioniert unverändert (ToonMaterial nutzt dieselben Chunks `opaque_fragment`, `fog_fragment`; geprüft in r186). Hinweis: `MeshToonMaterial` deklariert `flatShading` nicht, `WebGLPrograms` liest die Eigenschaft aber klassenunabhängig – für Fels/Klippen also `mat.flatShading = true` nachträglich setzen (und beim `clone()` selbst übertragen). Betroffen: `world/landmarks.js lambertVC`, `actors/humanoid/base.js getMaterial`, `props/kit/materials.js`, `world/vegetation.js`, `world/terrain.js`, `world/sky.js` (Wolken).
2. **Schattentönung + Rim:** in `veil.patch` als neuer Standard-Block *vor* `lumoApplyVeil` (Option `afterVeil`/`beforeVeil` bleibt): Uniforms `uShadowTint`, `uRimWarm`, `uRimCool`, `uRimStrength` (je Material über `opts.rim`), `uSunDirWorld`. Der Himmel setzt sie in `apply()` neben `setGrade`.
3. **Kernschatten Figuren:** eigene Rampe `ramp-figur`.
4. **Transluzenz Laub:** über `opts.fragment` in `vegetation.js` (nur Kronen-Materialien).
5. **Kein zusätzlicher Draw-Call** durch 1–4; Kosten ≈ 6 ALU pro Fragment.

### 3.6 Schattenwurf

- Sonne: `PCFSoftShadowMap`, Größe 2048 (hoch) / 1024 (mittel), Ausdehnung 60 m (hoch) / 44 m (mittel), Bias −0.0003, normalBias 0.05, weicher Rand `radius 3`.
- Schattenfarbe = Schattenband (§3.2), Deckkraft der Schattenkarte 0.85 (nie 1.0).
- Niedrig: keine Schattenkarte; Figuren und Requisiten bekommen den **Kontaktschatten** (§8.7).

---

## 4. Konturen (Outlines)

### 4.1 Verfahren

- **Inverted Hull** (Rückseiten-Hülle, Vertex entlang der Normalen in *Clip-Space* extrudiert → konstante Bildschirmbreite): Figuren, Dorfleute, Requisiten, Gebäude, Baumkronen, Stämme. Ein zweites Mesh mit `side: BackSide`, `depthWrite: true`, gleiches Geometrie-Objekt (kein Speicher-Doppel). Draw-Calls: +1 je Objekt; gebackene Prop-Gruppen bekommen *eine* Hülle je gebackenem Mesh.
- **Bild-Kontur (Post, nur mittel/hoch):** Sobel auf Tiefe + Normalen im Composer, 1.0 px (hoch) / 0.8 px bei 0.75 Auflösung (mittel). Fängt Innenkanten (Dachüberstand, Fensterrahmen, Geländekanten) ein.
- Niedrig: nur Hülle auf Figuren und Hero-Requisiten (Signalfeuer, Tanks, Laternen, Boot), sonst keine Kontur.

### 4.2 Breite je Objektklasse (bei 1180 px Breite, 1×)

| Klasse | Hülle (px) | Post-Kante (px) |
|---|---|---|
| Spielfigur, Hauptfiguren | 2.0 | 1.0 |
| Dorfleute (lite/Impostor) | 1.6 | 1.0 |
| Requisiten klein (Laterne, Kiste, Krug) | 1.4 | 1.0 |
| Gebäude, Boot, Leuchtturm, Steg | 1.8 (Silhouette) | 1.0 (Innenkanten) |
| Baumkronen, Büsche | 1.6 | 0 |
| Stämme, Palmen | 1.2 | 0 |
| Gras, Blumen, Schilf, Kleinkram | 0 | 0 |
| Gelände | 0 | 1.0 (nur Tiefe, Schwelle hoch: nur Kanten > 0.6 m) |
| Wasser, Wolken, Himmel, Partikel, Sprites | 0 | 0 |

Ab 60 m Abstand blenden alle Konturen auf 0 aus (Luftperspektive). In Hochformat und auf DPR 2 bleiben die Pixelwerte gleich (nicht mit DPR multiplizieren).

### 4.3 Farbe

`outline = saturate(albedo * 0.38)`, Sättigung × 1.2 (im linearen Raum), Mindest-Luminanz 0.03. Nachts zusätzlich mit `#10142E` zu 40 % gemischt, im Schleier mit `#3A3650` zu 70 %. Leuchtende Teile haben keine Kontur. Konturen sind *immer* farbig – schwarze Linien lesen sich wie ein Malbuch.

### 4.4 Innenlinien

Augenlid, Mundlinie, Brauen, Haar-Trennlinien und Kleidungsnähte sind **gemalte Geometrie** (dünne dunkle Streifen in der Kontur-Farbe des jeweiligen Teils), keine Post-Kanten.

---

## 5. Himmel, Wolken, Dunst, Wasser

### 5.1 Himmelskuppel

Verlauf aus **vier Stopps** (Zenit · Mitte bei 35° · Horizontband bei 4° · unter dem Horizont = Dunst fern) mit `exp`-Gewicht wie heute, plus:
- Horizontband 3° hoch, 8 % heller als „Mitte“, warme Kante (Sonnenhof-Farbe zu 20 %).
- **Zwei Sonnenhöfe:** breit `pow(s, 3) * 0.55` in Sonnenhof-Farbe, eng `pow(s, 48) * 0.6` in Sonnenfarbe; Sonnenscheibe wie heute, aber mit weichem Saum 0.3°.
- Sanftes Dithering (Blue-Noise 1/255) gegen Banding.
- Farbkorrektur läuft *nicht* mehr im Kuppel-Shader, sondern im Post-Pass (§13).

### 5.2 Wolken

- **Anime-Cumulus**: 6–9 verschmolzene Kugeln (Icosaeder Stufe 2, *weiche* Normalen, kein Jitter), flache Unterseite (y-Klemme), Verhältnis Breite:Höhe 2.2:1. Zwei Töne: Licht `#FFFFFF`, Schatten = `mix(horizont, #B9C6E8, 0.5)`, Schwelle NdotL 0.35 ± 0.08. Keine Kontur. Ränder bekommen ein feines Rim in der Sonnenfarbe (0.25).
- Anzahl: 14 nah (60–170 m, y 70–110), 10 fern (200–450 m, y 100–140), Skalen 0.8–1.7. Drift 0.004 rad/s, leichtes Atmen.
- **Gewitterturm** (Klippen): Sockel `#3A3E5E`, Kamm `#8F97C4` (Ramp-Licht), Unterseite `#262A44`; nie schwarz. Beim Blitz Emission `#C9D0FF` × 1.4 (Bloom greift). Regenvorhänge Alpha 0.22, 25° schräg, Streifen 1.4 m. Blitz: Kern `#FFFFFF`, Hülle `#B4C0FF` 2×, 0.22 s + Bodenlicht-Flash.

### 5.3 Dunst und Luftperspektive

- Distanznebel: `near = 0.18 × Sichtweite`, `far = Sichtweite`, Farbe = Dunst nah → fern (§2.3), Sonnenstreuung wie heute (`lumoFog`).
- **Höhennebel:** unter y = 3 m zusätzlich 12 % Dunst (Küsten, Moor, Tränensee), im Moor 35 %.
- **Luftperspektive:** ab 60 m Sättigung −25 %, Konturen aus, Schattenband hebt sich um 0.15.
- Silhouetten der Landmarken bleiben: Vulkan, Leuchtturm, Gewitterturm, Glimmerwolke, Mangrove haben `fog: false`-Anteil 0.35 (Nebel wird auf 65 % gedeckelt).

### 5.4 Wasser

- **Drei Tiefenbänder** mit schmalen Übergängen (0.6 m): flach `#37E0CF` (0–1.5 m), mittel `#12A6CC` (1.5–6 m), tief `#0B4A94` (> 6 m). Nachts: `#1A6A78` / `#0D3A5A` / `#061C3A`.
- **Schaum als klare Formen:** Küstenband 0.6–1.2 m in `#FFFFFF` mit „Löchern“ (Noise > 0.55 → aus), Wellenlinien mit `step` statt `smoothstep`, Kämme draußen 0.1.
- **Reflexband:** Horizontfarbe bei streifendem Blick (Fresnel 0.35), Sonnenpfad `pow(·, 24) * 0.3`, Funkeln als 4-zackige Punkte (Sprite-Partikel, 20 Stück, nur nahe Kamera).
- **Nasser Sand:** 1 m Band an der Wasserlinie `#D9A96B` (Terrain-Farbe), Kaustik 2-tonig `#8FE8E0` auf Sand unter Wasser.
- Gezeitenbecken glühen (`#1A8A78` Emission 0.6 nachts 1.2), Quellen dampfen, Torf spiegelt kaum.

### 5.5 Nacht

Mond mit zwei Höfen, 60 % Sterne mit 2 Größen, Milchstraße als Band, Glühwürmchen (§10.2), Laternen und Feuer als **Hauptlichtquellen** mit Bloom. Die Farbkorrektur hebt die Schatten auf `#03051A` (nie schwarz).

---

## 6. Vegetation

| Art | Form | Farben (Licht / Schatten) | Kontur | Wind |
|---|---|---|---|---|
| **Gras** | zwei gekreuzte Karten je Instanz (4 Dreiecke), Halme als abgerundete Dreiecke, 0.5–0.9 m, Normale nach oben (kein Shading, nur Vertex-Verlauf Basis = Bodenfarbe × 0.85, Spitze +22 % Luminanz) | Zone (§2.2) | 0 | Spitze 1.0 |
| **Blumen** | 3–5 runde Punkte auf Stiel, Ø 0.14 m | Regions-Akzente | 0 | 0.6 |
| **Büsche** | 3 verschmolzene runde Loben, weiche Normalen | Laub hell / dunkel | 1.6 px | 0.15 |
| **Laubbäume** | Stamm 6-eckig, leichte Verjüngung, Wurzelansatz; Krone 3–5 große runde Loben (Icosaeder Stufe 2, **weiche Normalen**, kein Jitter), je Lobe Farbton ±4° | `#9ADE5A` / `#3B8A3E` (Hafen) | Krone 1.6 · Stamm 1.2 | 0.12 |
| **Blütenbäume** | wie Laub, Krone `#FFC2DC` / `#F06A9C` | | | |
| **Dschungelriesen** | Stamm mit Brettwurzeln (bleiben), Krone 2 Etagen, Lianen als Bänder mit 2 Tönen | `#6FD35A` / `#1D6E33` | 1.6 / 1.2 | 0.1 |
| **Palmen** | Stamm mit Ringen (Vertex-Bänder alle 0.5 m ±5 %), 9 Wedel als 2-tonige Fächer mit Mittelrippe, Spitzen eingerollt | `#2C8F45` / `#96E05A` | Stamm 1.2, Wedel 1.0 | Wedel 0.3–1.0 |
| **Kiefern** | 4 Etagen, Kanten weich, Spitze deutlich | `#4FA06A` / `#255E45` | 1.4 | 0.05 |
| **Mangrove** | wie heute, Stelzwurzeln dicker | `#4FAE55` / `#1F6A34` | 1.4 | |
| **Schilf, Heide, Birke** | wie heute, Heide-Blüten als runde Punkte statt Kegel | | 0 / 0 / 1.2 | |

Verbote: Icosaeder Stufe 0 mit Jitter als Krone, Stern-Büschel, `faceVar` > 0.06 auf Laub. Dichte: Gras 70 % der heutigen Menge, dafür 40 % größer; Blumen als Inseln (Cluster), nicht gestreut.

---

## 7. Gelände und Wege

- **Materialklassen:** Wiese, Sand, Weg, Fels, Basalt/Asche, Torf, Mineral. Je Klasse drei Töne (§2.2) und *eine* Makro-Variation aus `noise.zone` (±6 %), `faceVar` ≤ 0.04 auf Wiese/Sand/Weg, 0.12 auf Fels.
- **Normalen:** weich auf Wiese, Sand, Weg, Torf (Rampe ergibt saubere Bänder); Facetten nur auf Fels, Klippe, Basalt.
- **Wege:** 2.4 m breit, Farbe Weg hell `#E2B87A` mit 0.4 m weichem dunklem Saum `#BF915A`, kein Rauschen.
- **Übergänge:** Sand → Wiese 3 m weich; Wiese → Fels über Neigung (0.74–0.86) mit Moos-Kante.
- **Nasse Zone** am Wasser 1 m (§5.4). Klippenkanten bekommen eine helle Kantenlinie (Post-Kontur).
- Höhenlinien-Look vermeiden: keine sichtbaren Zellen-Raster; Zellgröße ≤ 2.5 m auf mittel.

---

## 8. Figuren

### 8.1 Proportionen (≈ 6,5 Kopfhöhen, Teen)

Maße in `actors/humanoid/base.js M` (Meter, Grundgröße 1.95 m):

| Maß | heute | Ziel |
|---|---|---|
| Kopfradius `headR` | 0.142 | 0.135 (Kopfhöhe 0.30 = 1 Kopf) |
| Hüfthöhe `hipY` | 0.96 | 1.00 |
| Oberschenkel / Schienbein | 0.45 / 0.43 | 0.47 / 0.45 |
| Rumpf `torso` | 0.56 | 0.58 |
| Hals `neck` | 0.08 | 0.09 |
| Schulterbreite `shoulderX` | 0.235 | 0.245 (Hüfte 0.09) |
| Oberarm / Unterarm | 0.30 / 0.27 | 0.31 / 0.28 |
| Hand | – | 0.85 Kopfhöhe lang |
| Fuß | – | 1.0 Kopfhöhe lang, chunky |

Silhouette: lange Beine, schmale Taille, leicht breite Schultern, kleine Hände, große Schuhe. Statur-Regler bleibt (0.88–1.18), Größe 0.93–1.07.

### 8.2 Kopf und Gesicht

- **Schädel:** Icosaeder Stufe 2, **weiche Normalen**, Skalierung (0.94, 1.12, 0.98), Kinn schmaler (heute), Wangen minimal voller (`v.z += 0.01` bei y < 0).
- **Augen** (der wichtigste Ausdrucksträger): Auge 0.078 breit × 0.046 hoch, mandelförmig (oben runder als unten), Weiß `#FFFFFF` leicht bläulich in der Schattenhälfte `#E6EEFF`; **Iris** 0.038 mit zwei Tönen (Rand = Augenfarbe × 0.55, Mitte = Augenfarbe), Pupille `#14102A` 0.014; **Glanzpunkt** oben links 0.009 `#FFFFFF` + kleiner zweiter unten rechts 0.004; **Oberlid** als dunkler Strich 0.008 in `Haarfarbe × 0.6` (bei hellem Haar `#4A3A3A`), Unterlid nur eine Hauttonkante (`Haut × 0.86`); optionale Wimper als 2 Dreiecke außen.
- **Brauen:** 0.058 breit, Dicke nach Stil (0.008–0.018), drehen ±0.42 rad und heben 0.016 (heute ähnlich, Bewegung verdoppeln).
- **Nase:** kleiner Keil (bleibt), Schatten nur an der Seite.
- **Mund:** 4 Zustände (neutral, Lächeln, Schmollen, **offen** für Reden/Rufen: Ellipse `#7A2E3A` mit Zahnkante `#FFFFFF`), Breite 0.04, Skalierung nach Stärke.
- **Wangen:** optional 8 % Rosa (`mix(Haut, #FF8FAB, 0.08)`) als flache Flecken.
- **Blinzeln:** Lid-Mesh skaliert alle 3–5 s in 0.12 s (nur „full“).
- Ohren, Sommersprossen, Vitiligo, Brillen, Hörgeräte wie heute, Brillengläser mit Fresnel-Rand.

### 8.3 Haare

- **Strähnenklumpen statt Kappe:** 5–9 keilförmige Klumpen (abgerundete Kegel/Prismen mit Spitze), Fransen in Bögen, Hinterkopf als 2–3 große Klumpen. Jeder Stil behält seine Silhouette (15 Stile), aber jeder besteht aus Klumpen mit klarer Spitze.
- **Farben:** Basis, Unterseite × 0.72, **Glanzband** (Ring bei 70 % Kopfhöhe, +25 % Luminanz, zur Lichtseite geneigt, 0.05 hoch) als Vertexfarbe – das Anime-„Shine“.
- Akzentfarbe (`hairAccent`) nur an Spitzen oder als Strähne, nie ganze Fläche.
- Kontur 2.0 px, Wind nur an Spitzen (Locs, lang, Zopf).

### 8.4 Kleidung

- Flat-Farbe + **eine Bordüre** (× 0.78: Saum, Bündchen, Kragen) + **ein Akzent** (Weiß/Gold/`patternColor`).
- Hoodie: Kapuze als deutliches Volumen im Nacken, Kordeln weiß, Bauchtasche als Linie. Ärmel am Bündchen 6 % weiter (Silhouette). Schuhe 1.0 Kopf lang, Sohle hell, Akzentstreifen.
- Muster subtil (Kontrast ≤ 25 %), Aufnäher gesättigt mit weißem Rand 0.006.
- Crew-Jacke: Brustband + Ärmelstreifen in Akzent (bleibt), Futter sichtbar bei offenem Reißverschluss.

### 8.5 Ausdruck, Blick, Animation

- **Sechs Ausdrucks-Presets** (Freude, Wut, Angst, Trauer, Ekel, Überraschung) aus `brows/mouth/raise/lidL/lidR/cheek` – jedes in 0.2 s erreichbar; Körpersprache (`poses.js`) bleibt additiv.
- Idle: Atmen 0.012, Gewichtsverlagerung alle 4–7 s, Kopf schaut zu Interessantem (`lookAt`), Blinzeln.
- Gehen: Hüftschwung ±0.05 rad, Armbogen; Laufen: Oberkörper 12° vor, Bounce 0.07, Haare/Hoodie schwingen nach (Wind-Attribut).
- Sprung: Anlauf-Squash 6 %, Stretch 8 %, Landung 0.15 s Knie.
- Dorfleute (Impostor): wenigstens **Atmen + gelegentliches Umschauen** als Vertex-Animation (Kopf-Region über `aWind`-ähnliches Gewicht), damit nie jemand eingefroren wirkt.

### 8.6 Materialien der Figur

Rampe `ramp-figur` (§3.1), Schattentönung mit Haut-Warmanteil (§3.4), Rim 0.35, Kontur 2.0 px in Albedo × 0.38, Brillen als Glas. Ein geteiltes Material je Schleier-Variante bleibt (Vertexfarben).

### 8.7 Bodenschatten

Kontaktschatten (Blob) 0.8 m, Deckkraft 0.45, weich – **plus** Schattenwurf auf mittel/hoch (Spielfigur immer, Hauptfiguren < 25 m, Dorfleute nie).

### 8.8 Silhouetten der Hauptfiguren (Signaturform + Farbe)

Ilda Kapitänsmütze + Mantel `#4D8CFF` · Jolie Kapuze tief, Muschelkette `#39D0C8` · Tun Kamera-Gurt, Cap rückwärts `#FFD23F` · Tiago Surfbrett auf dem Rücken `#FF8C42` · Maëlle Trommelstöcke, Zöpfe `#FF4F8B` · Luc Windjacke, Drachenschnur `#8FA3FF` · Jhemp Laternen-Lampe, Bart `#C9B37A` · Pit Moos-Poncho `#6FAE5A` · Noor Spraydose, Bandana `#B06BFF` · Lucinda Gießkanne, Strohhut `#8FD18B` · Mika Flammen-Jacke `#FF4D4D` · Yara Sternen-Hoodie `#FF8CCF` · Kim Headset, Chip-Hoodie `#2DE2FF` · Senait Kompass-Anhänger `#FFCF4D` · Fränz Werkzeuggürtel `#D8A26B` · Grisel Motte, Schatten `#9A93B8`. Jede Figur muss an der schwarzen Silhouette erkennbar sein.

---

## 9. Requisiten und Gebäude

### 9.1 Formsprache

- **Chunky, leicht übertrieben:** Dächer 0.6 m Überstand und 0.25 m dick, Balken 0.18 m, Pfosten oben breiter als unten (Wind-Waker-Lehne 4–6 %).
- Drei Größenstufen je Typ (S/M/L), damit Gruppen rhythmisch wirken.
- Jede Requisite: 3 Töne + 1 Akzent + Kontur. Höchstens 1 500 Dreiecke (Gebäude 3 000).
- Nachts: Fenster und Lampen emissiv (Bloom); Feuer mit Funken.

### 9.2 Häuser (Hafen, Markt, Leuchtturm-Wärterhaus) – *heute nicht vorhanden, Priorität 1*

Bauanleitung `props/kit/builders.js haus(o, K)`:
1. Steinsockel 0.4 m `#A69A8C`, Kontur.
2. Wandkörper Box B×H×T (S 3.5×3.0×3.2, M 4.5×3.4×4.0, L 6×6.4×4.5 zweistöckig), oben 5 % breiter; Wandfarbe aus §2.2, Planken als Vertex-Streifen alle 0.35 m ±4 %.
3. Dach: Satteldach 38°, Überstand 0.6, Dicke 0.25, First-Kappe, Ziegel als 3 Farbbänder (`#C6553B`, `#B44A33`, `#D46A4A`), Schiefer-Variante.
4. Tür 1.0×2.1 gewölbt `#6E4A30`, Goldknauf; Fenster 0.9×1.1, Rahmen 0.08 `#FFF3D6`, Scheibe `#BFE8FF` (tags) / emissiv `#FFE7A0` (nachts), Läden in Akzent, Blumenkasten.
5. Schornstein, Wimpelkette zum Nachbarhaus (Dreiecksflaggen in Regionsfarben), Laterne an der Tür.
6. Kollider Box, Bake-fähig.

Hafen-Layout: 8–10 Häuser um den Dorfplatz und entlang der Uferstraße, Baumhaus im Feigenbaum, Kioske, Kisten/Fässer/Netze/Bojen am Steg, Boote in 2 Farben. Markt: 5 Häuser mit Markisen an den Terrassen.

### 9.3 Materialfamilien

Holz (warm, Maserung als 2 Streifentöne), Stein (kühl, Facetten), Stoff (flat, Bordüre), Metall (Glanzpunkt), Glas (Fresnel), Licht (emissiv). Keine Fotos, keine Rauschtexturen.

### 9.4 Detail-Budget

Pro Sichtfeld höchstens 25 Requisiten-Draw-Calls (gebacken), Kleinkram als Instanzen. Lieber 6 gut gesetzte Objekte als 30 gestreute.

---

## 10. VFX

### 10.1 Bloom

Composer (§13): `UnrealBloomPass` Schwelle 0.85 (nach Tone-Mapping), Stärke 0.32, Radius 0.45 (hoch); mittel: halbe Auflösung, Stärke 0.22. Emissionsstärken: Laterne 1.6, Feuer 2.2, Lava 2.6, Runen/Kristalle 1.4, Gezeitenbecken 0.8 (nachts 1.4), Leuchtturm 3.0, Auren 1.2, UI-Sprites 0. Niedrig: additive Glüh-Sprites (Ø 3× Objekt, Alpha 0.35) an Laternen, Feuern, Lava.

### 10.2 Funken, Glühwürmchen, Glitzer

- Glitzer: 4-zackige Sterne (Canvas), 0.15–0.35 m, Leben 0.8 s, `#FFF6D0`/`#FFD166`, additiv – Sammelsachen, Farbwelle, Laternen nachts (1/s).
- Glühwürmchen: nachts Dschungel/Hafen/Quellental, 40 Punkte, Sinus-Drift, `#FFE98A`, Bloom.
- Feuerfunken wie heute, Leben 1.4 s, aufsteigend, mit Bloom.
- Aschenschnee am Vulkan (grau, langsam), Blütenblätter im Dschungel bei Farbwelle.

### 10.3 Grauschleier

- Duotone (§2.4) statt Grau; Schwebeteilchen bleiben, Größe 3–7 px.
- **Nebelwand am Schleierrand:** Zylinder-Shader am Zonenradius (6 m hoch, Alpha 0.35 → 0 nach oben, driftende Schlieren), von innen und außen sichtbar – der Spieler *sieht* die Grenze.
- Höhennebel im Schleier 0.35, Kontur-Farbe `#3A3650`.

### 10.4 Farbwelle

Regenbogenring (bleibt), Vorderrand heller, Glitzer entlang des Rings (12/s), Blumen/Heide „wachsen“ (uBloom), 0.4 s Lichtblitz (bleibt), danach 2 s Sättigungs-Überschwingen +10 %.

### 10.5 Auren

Additive Hülle (bleibt), Ringe 1–6, Symbol-Sprite über dem Kopf 0.3 m, Bloom 1.2; im Profi-Modus aus. Die Hülle darf die Figur **nie flächig verdecken** (heute eine gelbe Kapsel, b30): Fresnel-betonter Rand, Flächen-Alpha ≤ 0.12, Rand-Alpha ≤ 0.55, Gesicht bleibt immer frei lesbar.

### 10.6 Wetter

Regen 25° schräg, Bloom-freie Streifen `#B8C4E6` Alpha 0.45; Blitz mit Boden-Flash (Hemi +1.5, bleibt) und Wolken-Emission; Böen bewegen Gras/Kronen (Wind-Uniform ×2 in Klippen).

### 10.7 Reduzierte Effekte

Bloom 50 %, kein Flash, keine Vignette, kein Wackeln, Glitzer aus – die Farbkorrektur bleibt.

---

## 11. Oberfläche (UI)

### 11.1 Typografie

Schrift `ui-rounded / SF Pro Rounded / Nunito / Segoe UI` (wie heute). Gewichte 700/800/900. Größen: Titel 40 · Zonen-Banner 34 · Blasentext 24 · Kacheln 19 · Knopf 18 · Kapitälchen-Labels 13 (`letter-spacing 0.14em`, Versalien) · HUD-Label 13. Zeilenhöhe 1.25. Textschatten nur auf Text direkt über der Welt (`0 2px 6px rgba(0,0,0,.45)`), nie auf Panels.

### 11.2 Glas-Panels

`background rgba(18,12,36,0.62)`, `backdrop-filter blur(14px)`, Haarlinie 1 px `rgba(255,255,255,0.14)`, innen oben 1 px `rgba(255,255,255,0.08)`, Radius 18 (klein) / 24 (groß), Schatten `0 10px 30px rgba(6,2,20,0.35)`. **Keine 2–3 px hellen Ränder**, keine Bevel-Schatten (`0 6px 0 …`).

### 11.3 Namensschilder (klein und elegant)

- Welt-Höhe 0.26 m (heute 0.48), **Bildschirmgröße geklemmt**: Textgröße 13–16 px, Pille 26–32 px hoch, unabhängig vom Abstand (`sizeAttenuation: false` + Skalierung über Abstand).
- Pille `rgba(16,10,32,0.55)`, Ring 1.5 px in Signaturfarbe, Icon-Scheibe 18 px, Name 800.
- Sichtbarkeit: Dorfleute 8–22 m (Einblendung 4 m), Hauptfiguren 8–40 m; die Figur, mit der man spricht, ohne Schild (die Blase trägt den Namen). Nie mehr als 6 Schilder gleichzeitig (nach Abstand).

### 11.4 HUD-Knöpfe

- Runde Knöpfe = Glas-Panels (§11.2), Icon weiß 26 px, Label 13 px darunter; Springen 92 px mit 2 px Goldring, Kraft 72 px, Pause 56 px.
- Aktionspille: Gold flach (`#FFD166` → `#FFB84D`, 6 % dunkler unten), Tinte-Text, Radius 999, **kein** 3D-Bevel; gedrückt: Skalierung 0.94, Helligkeit 0.92.
- Joystick: Ring 1.5 px `rgba(255,255,255,0.45)`, Knauf Glas mit Gold-Punkt.
- Vignette bleibt (0.32), Schleier-Tönung am Rand `#5A5276`.

### 11.5 Sprechblasen und Kacheln

- Blase: Breite ≤ 560, Panel `rgba(16,10,32,0.86)`, linker Akzentbalken 4 px in Signaturfarbe, Name Kapitälchen 13 px in Signaturfarbe, Text 24/1.28 weiß, Schwanz-Dreieck zur Figur, Vorlesen = Geist-Knopf 52 px, Weiter = Gold-Kreis 56 px mit sanftem Puls.
- Kacheln: 2 Spalten, Mindesthöhe 68 px, Icon-Scheibe 40 px in Ton-Farbe (ruhig `#8FD18B`, fest `#FFB347`, Handlung Gold), gedrückt Gold-Rand; System-Kacheln (Rückzug, Hilfe) als Pillen.
- Glimm-Zeile: mint Haarlinie, 18 px.

### 11.6 Kompass, Glimm, Kraft-Rad, Tagebuch

Kompass 36 px, ohne Rand, Verlaufsmaske, Nadel = kleines Gold-Dreieck; Glimm-Badge 56 px mit Mint-Ring (Puls-Farbe), Atmen dezent (Opazität 0.2–0.5); Kraft-Rad 4 Glas-Segmente, aktiv Gold, Icons 28 px – solange es offen ist, blenden die HUD-Knöpfe aus (heute liegt es über „Kraft“ und „Springen“, b42), gesperrte Segmente 40 % Opazität mit kleinem Schloss; Tagebuch: Rail 132 px, Reiter mit Gold-Rand, Karte als gemaltes Pergament-Panel (`#F3E6C9` Papier mit Tintenlinien, Zonen als weiche Farbflächen statt Pixelraster, Nebel als Wolkenschraffur).

### 11.7 Titel- und Ladebild

Gemaltes Key-Art aus **Ebenen** (Canvas oder CSS): Himmel goldene Stunde (§2.3), Sonne mit zwei Höfen, ferne Insel-Silhouette violett `#3A1F55`, mittlere Insel mit Vulkan magenta-braun `#5A2A50`, nahe Palmen/Steg navy `#1B1033`, Möwen, Wasser mit Sonnenpfad (keine Retro-Gitterlinien). Titel „LUMO“ 900, `letter-spacing 0.08em`, Verlauf `#FFF3C4 → #FFD166 → #FF8A5B`, weicher Glow 24 px; Untertitel Kapitälchen `#FFE9B8`; Start-Knopf = Aktionspille. Ladebalken mint→gold→koralle bleibt.

---

## 12. Kamera und Komposition

- **FOV** 50° quer (heute 55), 62° hoch (heute 68). Weniger Verzerrung an den Figuren.
- Folgen: Abstand 7.6 m, Neigung 0.22 rad, Blickhöhe 1.5 m; Horizont im oberen Drittel; Figur leicht links der Mitte beim Laufen (Offset 0.35 m), damit der Weg Raum hat.
- Gespräch: Über-die-Schulter 35°, FOV 40°, Spielfigur im linken Drittel als ¾-Rückenansicht mit **ganzem Kopf im Bild** (Oberkante Kopf ≥ 8 % unter dem Bildrand), Gegenüber im rechten Drittel und der Kamera zugewandt (`npc.face`), Blase mit Schwanz höchstens 0.4 m über dessen Kopf; Kacheln unten mittig, nie über einem Gesicht. Heute (b20) füllt die Spielfigur das rechte Drittel mit abgeschnittenem Kopf, und die Blase hängt 2 m neben der Sprecherin.
- Zonen-Spawn und Teleport-Punkte blicken auf die Landmarke der Zone (Leuchtturm-Spawn zeigt den Turm, Vulkan-Spawn den Krater mit Rauch, Klippen-Spawn den Gewitterturm).
- **Vista-Moment** beim Zonenwechsel: 1.2 s Rückzug +1.5 m, FOV −4°, Banner.
- Gleiten: Abstand +3.2, FOV +9 (bleibt); Klettern nah; Tauchen kühler Grade.
- Intro-Anflug: Sonne im Bild, Vordergrund-Element (Möwe/Palmwedel), Landung auf dem Steg.
- Fotomodus: freie Neigung, Raster nach Dritteln, Filter „Postkarte“ (Sättigung +8 %, Vignette).
- Landmarken als Orientierung: Von jeder Zone ist mindestens eine Landmarke (Vulkan, Turm, Gewitterturm, Glimmerwolke, Mangrove) als Silhouette sichtbar (§5.3).

---

## 13. Qualitätsstufen und Post-Stack

| | Niedrig (altes iPad) | Mittel (iPad 9, Standard) | Hoch (PC) |
|---|---|---|---|
| Pixeldichte | 1.0 | 1.5 | 2.0 |
| Toon-Ramp, Schattentönung, Rim | ja | ja | ja |
| Kontur | Hülle nur Figuren + Hero-Props | Hülle alle + Post-Kante 0.75× | Hülle alle + Post-Kante 1.0× |
| Composer | **keiner** (direkt rendern) | RenderPass → Kontur → Bloom (½) → Grade/Output, MSAA 4× am RenderTarget | RenderPass → Kontur → Bloom → Grade/Output, SMAA |
| Bloom | Glüh-Sprites | ja, Stärke 0.22 | ja, 0.32 |
| Schattenkarte | aus (Blob) | 1024, 44 m | 2048, 60 m |
| Wolken | 10 | 18 | 24 |
| Gras | 40 % | 70 % | 100 % |
| Sichtweite | 380 | 480 | 600 |
| Farbkorrektur | im Material (wie heute) | im Post-Pass (`lumoGrade` als letzter Pass, auch Sprites/Partikel) | im Post-Pass |
| Ziel | 30 fps, ≤ 220 Draw-Calls | 30 fps, ≤ 320 Draw-Calls | 60 fps |

Umsetzung: `engine/renderer.js` bekommt `createPostStack(renderer, scene, camera, q)` mit `three/examples/jsm/postprocessing/{EffectComposer,RenderPass,UnrealBloomPass,SMAAPass,ShaderPass,OutputPass}` und einem eigenen `OutlinePass` (Tiefe+Normalen-Sobel); `loop.render` ruft `post.render()` statt `renderer.render()`. Auf Niedrig bleibt der heutige Pfad. Die Farbkorrektur wandert in einen `GradePass` (Uniforms von `sky.grade`); `lumoGrade` in den Materialien wird auf mittel/hoch zur Identität (Uniform-Flag), damit nichts doppelt gegradet wird.

---

## 14. Lückenliste: aktuell → Ziel (die 15 größten Qualitätsprobleme, priorisiert)

Grundlage: Screenshot-Set vom 26.09. (`shots/art/a01–a25, b00–b42`, Qualität hoch, 1180×820).

| # | Problem (aktuell) | Ziel | Verweis | Aufwand |
|---|---|---|---|---|
| 1 | **Flaches Lambert ohne Rampe, Schattenfarbe, Rim und Kontur** – alles sieht „unbeleuchtet“ aus, Figuren und Requisiten kleben ohne Kante am Hintergrund; das ist der Hauptgrund für den Prototyp-Eindruck (jeder Screenshot) | Toon-Ramp 2–3 Bänder, kühle Schatten, Rim, farbige Konturen | §3, §4 | M (2 Tage) |
| 2 | **Kein Post-Stack**: kein Bloom, Farbkorrektur nur pro Material (Sprites/Partikel ungegradet), keine Bild-Kontur – Laternen, Feuer, Lava und Runen leuchten nicht, die Nacht ist stumpf (a07, a08, b10) | Composer mittel/hoch mit Bloom, Kontur, Grade-Pass; Glüh-Sprites auf niedrig | §13, §10.1 | M |
| 3 | **Grauschleier = flacher Zement**: Sieben von acht Zonen starten grau, also ist dieses konturlose Grau-Beige der *erste Eindruck* fast der ganzen Insel; es wirkt unfertig statt verflucht (a06, a10, a14, b04–b09, b11) | Duotone `#2E2A44/#7A7691/#C9C4D8` mit erhaltenem Kontrast, Höhennebel, Schwebeteilchen, sichtbare Nebelwand am Zonenrand | §2.4, §10.3 | S |
| 4 | **Hafen-Dorf ohne Häuser** – der „letzte bunte Ort“ ist eine Wiese mit vier Feuerstellen, Laternen und einer Figurengruppe; kein `haus`-Prop existiert; Marktstände sind leere Gerüste (a01, a05, b02, b03, b08) | 8–10 bunte Holzhäuser, Kioske, Kisten, Netze, Wimpel, zweites Boot; Markt 5 Häuser + gefüllte Stände mit Markisen | §9.2 | M |
| 5 | **Himmel und Wolken**: 2-Stopp-Verlauf, Wolken als graue Polygon-Klumpen, Gewitterturm ein schwarzer Felsbrocken am Himmel, unter dem Turm ein schwarzes Brett (a02, a03, a05, b06) | 4-Stopp-Himmel mit Horizontband und zwei Sonnenhöfen, Anime-Cumulus zweitonig, Gewitterturm blauviolett mit hellem Kamm, sichtbarer Regen | §5.1, §5.2 | S–M |
| 6 | **Vegetation**: Gras als spitze Stern-Büschel (dunkle Stacheln auf Sand, a13, b12), Kronen als Icosaeder Stufe 0 mit Jitter, Kiefern als Papierkegel, Rausch-Facetten auf Wiesen | Gras-Karten mit Verlauf, runde weiche Kronen mit 2 Tönen und Kontur, Blumen-Cluster, weiche Wiesen-Normalen | §6, §7 | M |
| 7 | **Figuren steif und puppenhaft**: Kugelkopf mit winzigen Augen, Haar als Kappe mit Koteletten-Klötzen, Kapuze als Kasten, 6 Kopfhöhen, kaum Idle-Bewegung, kein Blinzeln, Dorfleute als eingefrorene Impostoren in Trauben; Ausdrücke sind aus 3 m nicht lesbar („zornig“ und „traurig“ unterscheiden sich nur im Brauenwinkel, der Mund ist unsichtbar, a20–a22); die Aura-Kapsel verdeckt die Figur flächig (a01, b02, b20, b30) | 6,5 Köpfe, große zweitonige Augen mit Lidlinie, Strähnenhaar mit Glanzband, Ausdrucks-Presets mit sichtbarem Mund (offen/Lächeln/Schmollen, Breite 0.04 m), Blinzeln, Atmen auch bei Impostoren, Aura als Rand-Schimmer | §8, §10.5 | M–L |
| 8 | **Namensschilder weltgroß**: 0.48 m-Sprite füllt aus der Nähe den halben Bildschirm („Bootsjunge“, „Fischerin“, „Sammlerin“ – a05, b03, b08), Trauben aus 4–5 Schildern, dicke Ringe | 0.26 m, Bildschirmgröße geklemmt 13–16 px, dünne Ringe, ≤ 6 gleichzeitig, Gesprächspartner ohne Schild | §11.3 | S |
| 9 | **HUD im Bonbon-Stil**: cyan/violett/gold Radialverläufe, 3 px helle Ränder, 3D-Bevel, große Aktionspille; das Kraft-Rad liegt über den Knöpfen „Kraft“ und „Springen“ (b42) | Glas-Panels, eine Akzentfarbe Gold, flache Pille, dünne Haarlinien; Kraft-Rad blendet die Knöpfe aus | §11.2, §11.4, §11.6 | S |
| 10 | **Komposition und Kamera**: Zonen-Spawns zeigen keine Landmarke (Leuchtturm-Spawn ohne Turm b09, Vulkan-Spawn = brauner Hang b07); Ferne verschwimmt im Orange-Dunst, harter Horizont (a02, a10); Dialog-Kamera schneidet der Spielfigur den Kopf ab und die Blase schwebt weit weg von Jolie (b20, b21) | Luftperspektive mit gedeckeltem Nebel auf Landmarken; Spawns mit Blick auf die Landmarke; Gesprächs-Kamera mit ganzem Kopf, Figur links, Blase mit Schwanz direkt über dem Gegenüber | §5.3, §12 | S |
| 11 | **Nacht zu dunkel und einfarbig**, Bäume schwarze Klumpen vor schwarzem Himmel, Laternen ohne Glühen, Feuer winzig (a07, a08, b10) | Blaue Nacht (Minimum `#0C1030`), Bloom auf Laternen/Feuern, mehr Glühwürmchen, Mondlicht mit Rim, Kronen vom Himmel abgesetzt | §2.3, §5.5, §10.2 | S (nach #2) |
| 12 | **Vulkan**: flache braune Masse, Lava-Adern als rosa Rauten, Rauchsäule aus durchsichtigen Kästen (a04, a08, b03) | Basalt-Facetten mit 3 Tönen, Lava-Adern als leuchtende Risse (Bloom), Rauch als zweitonige runde Ballen mit weichem Rand | §2.2, §3.1, §10.1 | S–M |
| 13 | **Wasser** muddy in der goldenen Stunde, Schaum weich, keine nasse Sandkante, Reflexband fehlt (a01, a13, b09) | 3 Tiefenbänder, klarer Schaum mit Löchern, Reflexband, nasser Sand, Funkeln | §5.4 | S |
| 14 | **Requisiten dünn**: Tanks als leere Glasröhren, Runen als schwebende Ringe, Glimmer-Inseln als graue Brocken, Baumhaus-Feige als nackter Riesenstamm mit Leiter, keine Zweit-Details (Kisten, Netze, Schilder) (a10, a13, a02, b03) | 3 Töne + Akzent + Kontur je Requisite, Sockel/Deckel/Emission für Tanks, Runen mit Symbol und Glow, Glimmer-Inseln perlweiß mit Neon-Kanten, Baumhaus mit Krone, Plattformen und Laternen, Kleinkram-Sets je Zone | §9 | M |
| 15 | **Titelbild** = CSS-Synthwave (Gitterlinien, Clip-Path-Insel) statt gemaltem Key-Art; Tagebuch-Karte als Pixelraster (b00, b41) | Ebenen-Key-Art mit Sonne, Silhouetten, Sonnenpfad; Titel mit Gold-Verlauf; Karte als gemaltes Pergament | §11.7, §11.6 | S |

Ergänzend (kleiner): FOV 55° → 50° (§12); Blob-Schatten dunkler/kleiner + echter Schattenwurf für die Spielfigur (§8.7); `faceVar` auf Gelände senken (§7); Kamera-Vista beim Zonenwechsel (§12). Was schon trägt und bleibt: die Farbwelle (a11–a13), die Palmen-Silhouetten gegen das Abendmeer (b04), die Feuerstellen, die Pause-Karte (b40), das Glimm-Badge.

**Reihenfolge:** 1 → 2 → 3 → 9 → 8 → 5 → 10 → 6 → 4 → 7 → 11 → 12 → 13 → 14 → 15. Nach 1, 2, 3, 9 und 8 (zusammen ≈ 4 Tage) sieht dasselbe Spiel bereits nach einem anderen Produkt aus – ohne ein einziges neues Modell.

---

## 15. Abnahme: Screenshot-Set

Jedes Grafik-Arbeitspaket legt vor dem Abschluss dieses Set (Qualität **mittel**, 1180×820, und Hochformat 820×1180) ab und vergleicht es mit dem Vorgänger:

`tests/shots.mjs` (a01–a14) · `tests/figur-shots.mjs` (a15, a20–a25: Figur neutral/zornig/traurig/winkend/ganz/laufend, Wald-Kamera) · `tests/ui-shots.mjs` (u00–u24: Titel quer/hoch · HUD mit Banner, Toast, Aktionspille · Glimm-Zeile · Intro-Titel · Blase verankert/frei · Kacheln · Pause · Tagebuch-Seiten · Recap · Lagerfeuer · Bestätigung · Kraft-Rad · Fotomodus · Hochformat HUD/Dialog/Tagebuch/Pause) · `tests/art-shots.mjs` (b00–b42: Titel · HUD · Hafen mit Figuren · Dorfplatz · Strand · Dschungel · Klippen im Gewitter · Vulkan · Markt · Leuchtturm · Hafen Nacht · Strand Mittag · Hafen Morgen · Dialog Blase · Dialog Kacheln · Figur nah mit Aura · Pause · Tagebuch · Kraft-Rad). Aufruf je Skript: `SHOTS=<Ordner> Q=medium node tests/<skript>.mjs` – die Skripte nacheinander starten (zwei Chromium-Instanzen mit Software-GL brechen sich gegenseitig ab). Referenz-Set vom 26.09.: `/tmp/claude-0/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/scratchpad/shots/art/`.

Prüffragen je Bild: Drei Töne pro Fläche? Schatten farbig? Konturen farbig und dünn? Leuchtendes leuchtet? Silhouetten lesbar? Ferne kühler und heller? Oberfläche ruhig, Gold als einziger Akzent? Namensschilder klein? Und die Kernfrage: **Würde man dieses Bild als Postkarte aufhängen?**

---

## 16. Stand der Umsetzung – Rendering (WP Rendering, 27.09.)

Umgesetzt in `engine/renderer.js`, `world/veil.js`, `world/sky.js`, `world/terrain.js`, `world/water.js`, `world/vegetation.js`, `world/veilfx.js`, `world/landmarks.js`, `props/kit/materials.js`, `world/geom.js`:

- **§3 Shading:** `veil.patch(material, opts)` ersetzt in jedem Lambert-Material das Direktlicht durch die Toon-Rampe (`opts.ramp`: `props` · `figur` · `laub` · `terrain` · `fels` · `wolke` · `glow` oder `{ t1, t2, mid, soft, rim }`, Standard nach `opts.key`), hält den Schattenwurf aus `directLight.color` heraus (nur der Sonnenanteil wird beschattet – kein Schatten im Schatten), fügt Kantenlicht (`uRimWarm/uRimCool`, Sonnenseite über `uSunDirView`) und Laub-Transluzenz (Attribut `aLeaf`, `geom.part({ leaf: 1 })`) ein. Die Schattenfarbe kommt aus dem Hemisphärenlicht (oben Schattentönung, unten warmer Boden, `sky.js KEYS`). `MeshToonMaterial` (Figuren) behält seine Rampe, bekommt aber denselben Schattenwurf.
- **§4 Konturen:** Post-Kante in `renderer.js OutlinePass` (Tiefen-Silhouette + Knicke aus der zweiten Tiefenableitung, Farbe = Bildfarbe × 0.13 linear mit Sättigung × 1.2, nachts Richtung `#10142E`, Ausblendung 45–70 m; 0.75× auf mittel, 1.0× auf hoch). Hüllen an Figuren macht `actors/humanoid/base.js`.
- **§5 Himmel/Wolken/Dunst/Wasser:** vier Stopps + Horizontband + zwei Sonnenhöfe + Dithering (`DOME_FRAG`), Anime-Cumulus aus weichen Kugeln (14 nah/10 fern, Rampe `wolke`, Unterseite = mix(Horizont, `#B9C6E8`, 0.5) als Eigenleuchten), Gewitterturm blauviolett. Luftperspektive in `lumoFog`: Dunst nah (`uFogNearColor`) → fern (`scene.fog.color`), Höhennebel unter 3 m (`uFogHeight`), Ferne entsättigt (`uAerial`), Nebel-Deckel `uFogMax` = 0.86 (Silhouetten bleiben), je Material `fogCap`. Wasser: drei Tiefenbänder, Schaum mit Löchern/`step`-Linien, Reflexband, Sonnenpfad, Nachtpalette.
- **§6/§7:** Gras als gekreuzte Karten mit Vertex-Verlauf (70 % Menge, 40 % größer), Kronen/Büsche/Heide als weiche Kugel-Loben (`smooth: true`, Farbton ±4° je Lobe), Kiefern mit weichen Kegeln. Gelände: Farben je Raster-Eckpunkt (weiche Übergänge), Umgebungsverdeckung (`occlusionAt`, kühl abgedunkelt) in die Eckfarben gebacken, nasse Sandkante, Wege mit weichem Saum, Facetten nur auf Fels.
- **§10.1 Bloom:** `UnrealBloomPass` Schwelle 1.0 (linear, vor dem Tone-Mapping), Stärke 0.22 (mittel, ¼-Auflösung) / 0.32 (hoch). Leuchtendes liegt über 1.0: `materials.glow(hex, { intensity })` → Emission `0.6 + 1.2·intensity`, Flammen × 2.2, Lava × 1.7, Runen 1.4, Leuchtturm 3.0, Sonne/Mond in der Kuppel.
- **§10.3:** Duotone-Schleier (`lumoApplyVeil`), Nebelwand am Zonen-/Fleckenrand (`veilfx.walls`).
- **§13 Post-Stack:** `rr.attachPost({ scene, camera, veil })`, `rr.render()`; niedrig rendert direkt (Farbkorrektur/Nebel im Material, `uLumoPost = 0`), mittel/hoch: RenderPass → Kontur → Bloom → Abschluss (Neutral-Tone-Mapping, sRGB, Grade aus `veil.uniforms`, Vignette 0.22, Dithering) → FXAA. `renderer.render(scene, camera)` von außen läuft durch den Stack; `renderer.info` zählt alle Pässe eines Bildes (`autoReset = false`).
- **Tone-Mapping:** `NeutralToneMapping` statt ACES (Paletten bleiben gesättigt).

### 16.1 Zweite Runde (27.09., Screenshot-Vergleich `shots/art/p1_…p5_`)

Befund der ersten Runde: Boden = konturlose, matschige Fläche (weiche Schattenblobs + Höhennebel schon ab 4 m + keine
Flächenstruktur), Konturen bei 0.64 px praktisch unsichtbar, Gras als dunkle Sprenkel, harte dunkle Bande am Meereshorizont
(Nebel-Deckel wirkte auch aufs Meer), Wolken als flache Creme-Klumpen. „Niedrig“ wirkte schärfer als „mittel“.

- **Konturen (`renderer.js`):** Breite = `max(1, outline × DPR)` Gerätepixel (mittel 0.8, hoch 1.0), acht Abtastrichtungen
  (auch diagonal), Ausblendung 60–110 m, keine Kontur auf Leuchtendem (> 1.0 linear).
- **Abschluss-Pass:** S-Kurve auf der Helligkeit (`uCurve` 0.26, weicher Fuß `max(s, c × 0.72)`, nie reines Schwarz),
  Vignette 0.24.
- **Dunst (`veil.js lumoFog`):** Nebelkurve flach (`f²(2−f)`: Mitteldistanz bleibt kontrastreich), Höhennebel unter 3 m
  erst ab 25–90 m Abstand (Strand/Steg nahe der Kamera klar), Nebel-Deckel nach Höhe: am Meeresspiegel 1.0 (nahtloser
  Horizont), ab 5–40 m Höhe `uFogMax` 0.72 × `gLumoFogCap` je Material (Silhouetten). `scene.fog.near` = 0.3 × Sichtweite.
- **Licht (`sky.js`):** Schattenkarte `radius` 1.5 (mittel) / 2 (hoch) – klare Toon-Schattenformen; Hemisphäre tags
  2.15–2.35 (vorher 2.5–2.9) für satteres Schattenband, goldene Stunde kühler (`#7062B8`); Wolken-Eigenleuchten 0.3
  (zwei Töne lesbar). **Wolkenschatten:** `uCloudAmt` (tags 0.3, nachts 0) × `lumoCloudShadow(xz)` (VEIL_GLSL) auf dem
  Sonnenanteil aller Lambert-/Toon-Materialien und des Wassers – große weiche Flecken ziehen über die Insel.
- **Gelände (`terrain.js`):** Attribut `aSurf` (Wiese · Sand · Weg) und gemalte Flächenstruktur im Fragment, nur bis
  28–80 m: Wiese = große zweitonige Farbflecken (~3 m, dunkler Fleck kühler/satter) + feine Halmstriche, Sand = klare
  Körnung + wenige helle Flecken + einzelne dunkle Körner, Weg = Kiesel-Zellen; Kanten über `fwidth` antialiasiert
  (`lumoInk`). Umgebungsverdeckung 0.65. **Kontaktschatten:** `terrain.darken(x, z, r, amount)` + `commit()` (über
  `mesh.userData.terrain`), die Vegetation dunkelt den Boden unter Kronen/Büschen/Felsen kühl ab – Objekte stehen,
  auch auf „niedrig“ ohne Schattenkarte.
- **Gras (`vegetation.js`):** je Karte ein Büschel aus drei gefächerten Halmen (6 Dreiecke je Instanz), Basis ≈
  Bodenfarbe (× 0.9–1.04), Spitze × 1.18, Transluzenz 0.6 – liest sich als Grasbüschel statt als Blatt oder Sprenkel.
- **Wasser (`water.js`):** Tagesfarben gesättigter (`#3AE4D2 / #14AAD2 / #0D52A8`), gemalte Wellenlichter (klar
  begrenzte helle Streifen bis 130 m, treiben langsam), Reflexband 0.28, Wolkenschatten auf dem Sonnenanteil.
- **Fels/Asche:** gemalte Gesteinsschichten im Gelände-Shader (leicht geneigte Bänder mit Rauschversatz, ±5 %),
  Facetten-Farbvariation auf Fels 0.08 (vorher 0.12) – die Facetten bleiben, lesen sich aber nicht mehr als Mosaik.
- **Aufwindsäulen (`updrafts.js`):** stilisierter Schimmer statt Füllung – dünne aufsteigende Streifen, Fresnel-Rand wie
  ein Glasrohr, nachts auf 30 % gedämpft (vorher eine orangefarbene Vollsäule vor dem Nachthimmel).
- **Offen (nicht im WP Rendering):** Laternenpfähle `#2f2c3a` (Albedo 0.03 linear) lesen sich in der Toon-Rampe als
  Schwarz – Palette in `props/kit/builders.js` Richtung Schiefer `#3F4460` (§2.2) ändern; Namensschilder (§11.3).

## 17. Stand der Umsetzung – Figuren (WP Figuren, 27.09.)

Umgesetzt in `actors/humanoid/{geo,base,head,body,cosmetics,index}.js` (APIs unverändert: `createHumanoid`, `setAnim`, `setExpression`, `setEmotionAura`, `setNameTag`, Kosmetik-Konfiguration, `h.face.mouths` mit vier Zuständen):

- **§8.1 Proportionen:** Hals kürzer und kräftiger (`M.neckY`/`M.headY`: Halsansatz 0.05 m über der Schulterlinie, Kopfmitte 0.125 m über dem Halsgelenk), kein Schulter-„Polster“ mehr (kleine Deltoid-Wölbung unter dem Ärmelansatz), kompakte Anime-Hände (abgerundete Handfläche, kurze kräftige Finger, entspannt gekrümmt; Faust/Daumen/Stopp bleiben).
- **§8.2 Kopf:** Schädel mit rundem Hinterkopf und zum Kinn zulaufendem Kiefer (`headDeform`); Augen 0.078 breit, deren Iris (hohe Ellipse, drei Töne) vom Oberlid angeschnitten wird (`EYE.lid`, kein Starren), Lidlinie mit Wimpernschwung, Lidfalte, Unterlidkante, zwei Glanzpunkte. Alle Gesichtsformen werden auf die gewölbte Kopffläche gelegt (`wrap()`), nicht als Ebene angeheftet. Blinzel-Lider tragen eine eigene Lidlinie an der Unterkante (halb geschlossene Augen sehen gezeichnet aus). Brauen breiter und innen dicker, Mund tiefer (`MOUTH.y −0.56`) mit Lächeln-Mundwinkeln, offenem Mund mit Zahnkante und Zunge.
- **§8.3 Haare:** Statt Kappe + Strähnen-Klötzen eine **Haarschale** (`shell()`: Kugelsegment, dessen Saum in spitze Strähnen-Enden ausläuft, Saumhöhe vorn/seitlich/hinten je Stil) plus **Pony aus langen, flachen, spitzen Strähnen in zwei Lagen** (`fringe()`), Schläfensträhnen, Scheitelsträhnen. Vertexfarben: Zickzack-Glanzband, dunkle Unterseite, gemalte Strähnen-Rillen (7 %, `groove`), Akzent nur an Spitzen. Alle 15 Stile nutzen die Schale; Schweife (lang, Zopf, Locs, Flechtzöpfe) bleiben eigene Feder-Meshes.
- **§4 Kontur:** Hüllenbreite je Vertex (`fig({ hull })`, im Nachkommateil von `aWind`, übersteht das Impostor-Backen): Silhouette 2.0 px, Haarsträhnen 0.35–0.6 (dünne Innenlinien statt „Ananas“), Augen/Mund 0. Hüllen werden mit ihrem Teil im Sichtkegel geprüft (Figuren außerhalb des Bildes kosten keine Hüllen-Calls); die Qualitätsstufe liest jede Figur je Bild neu (`refreshTier`, `window.LUMO` gibt es erst nach dem Aufbau) und hängt Hüllen um. Niedrig: Hülle nur am Kopf voller Figuren (Budget ≤ 150 Draw-Calls am Hafen: 6 animierte à 19 + 14 Impostoren à 3).
- **§8.5 Animation:** Idle mit Atmen bis in die Schultern, kaum merklichem Armpendeln und Gewichtsverlagerung; Gehen mit längerer Standphase (Hüftkurve `|sin|^0.8`), Knie beugt im Schwung, Hüftschwung; Laufen 12° vor, Arme 90°, Bounce 0.07; Kopf zieht beim Drehen leicht nach (`yawRate`); Haare/Rucksack pendeln (springs.js).
- **Budget:** Maximalausstattung 11 765 Dreiecke (≤ 12 000), Draw-Calls unverändert (ein Toon-Material, Hüllen als Kinder). Abnahme-Set: `shots/art/f01–f40` (Line-up 8 Figuren, alle Frisuren, Ausdrücke, Gehen/Laufen, Dorfleute, Hochformat), Vorher-Stand in `shots/art/vorher-figuren/`.

## 18. Stand der Umsetzung – Oberfläche (WP UI, 27.09.)

Umgesetzt in `src/styles.css`, `src/shell.html`, `src/ui/{hud,kraftrad,haltring,photomode}.js`, `src/ui/map/render.js`, `src/ui/journal/pages.js`, `src/ui/stil/css.js`, `src/ui/teacher/plugin.js`, `build.mjs` (Schrift-Einbettung). Logik in `src/systems/**` unverändert; alle DOM-Konventionen (`.bubble`, `[data-choice]`, `.ov-close`, `.jn-tab`, `#boot-start` …) bleiben.

- **§11.1 Typografie:** Nunito (OFL, `src/ui/fonts/nunito-latin-wght-normal.woff2`, variable Schrift 200–1000, 39 KB) wird vom Build als data-URL in das CSS eingebettet (`url(fonts/…)` → base64) und steht vor `ui-rounded / SF Pro Rounded` – PC und iPad zeigen dieselbe Schrift, kein DejaVu-Rückfall mehr. Größen nach §11.1 (Titel 40 · Banner 34 · Blase 24 · Kacheln 19 · Knopf 18 · Kapitälchen 13 mit 0.14 em), Zeilenhöhe 1.25, `--txt-scale` (großer Text) bleibt.
- **§11.2 Glas-Panels:** Tokens `--glass rgba(18,12,36,.62)`, `--glass-strong .8`, `--panel .86`, Haarlinie `rgba(255,255,255,.14)` als `box-shadow 0 0 0 1px` (kein Rand im Layout), innere Oberkante `.08`, Radius 18/24, Schatten `0 10px 30px rgba(6,2,20,.35)`. **Backdrop-Blur nur auf pausierenden Overlays** (`.ov`, `.menu`; `--blur blur(10px)` statt 14 – ein 14-px-Vollbild-Blur kostet im Software-Renderer rund das Doppelte, unter `html.reduced-fx` ganz aus): jede Blur-Ebene über dem laufenden WebGL-Canvas kostet ein Readback je Bild (gemessen: HUD mit sechs Blur-Knöpfen ≈ 1,4 s statt 0,9 s je Bild im Software-Renderer), darum sind HUD-Knöpfe, Toasts, Glimm-Zeile und Fotoleiste dichteres Glas (`--glass` 0.70) ohne Blur. Keine 2–3-px-Ränder, keine Bevel-Schatten mehr. Overlay-Karten sind Glas ohne eigenes Blur (der Hintergrund blurt schon), Textschatten nur auf Text über der Welt (`--world-shadow`).
- **§11.4 HUD:** Springen 92 px Glas mit 2-px-Goldring, Kraft 72 px, Pause/Glimm 64 px (Touch-Regel aus DESIGN §17 geht vor den 56 px der Vorgabe), Icons weiß 26 px, Label 13 px. Aktionspille Gold flach (`#FFD166 → #FFB84D`), Tinte-Text, gedrückt Skalierung 0.94 / Helligkeit 0.92. Joystick Ring 1.5 px, Knauf Glas mit Gold-Punkt. Vignette 0.32, Schleier-Tönung `#5A5276`. Kompass 36 px ohne Rand mit Verlaufsmaske, Nadel = Gold-Dreieck. Zonen-Banner ohne Panel: Kapitälchen-Zeile, Name 34/900, Gold-Haarlinie darunter, Textschatten. Toasts als Glas-Pillen. Kraft-Rad: Glas-Segmente mit Haarlinie, aktiv Gold, Icons 28 px, gesperrt 40 % mit Schloss-Plakette; solange es offen ist, blenden die HUD-Knöpfe aus (`#hud.has-kraftrad`).
- **§11.5 Blasen und Kacheln:** Blase ≤ 560/640 px, Panel 0.86, Akzentbalken 4 px in Signaturfarbe, Name Kapitälchen 13 px, Text 24/1.28/800, Vorlesen = Geist-Kreis, Weiter = Gold-Kreis mit sanftem Puls (Ring statt Wackeln), Schwanz mit Haarlinie. Kacheln 2 Spalten, ≥ 68 px, Icon-Scheibe 40 px (neutral Glas, `ruhig #8FD18B`, `fest #FFB347`, `handlung` Gold, Tinte-Icon), gewählt Gold-Rand 2 px, System-Kacheln als Glas-Pillen (Hilfe mit Gold-Haarlinie). Glimm-Zeile: Glas mit Mint-Haarlinie, 18 px.
- **§11.6 Tagebuch:** Rail 132 px, Reiter mit 1.5-px-Gold-Rand innen; Karten (Hauptauftrag, Einheiten, Koffer-Fächer, Echte-Welt, Stil) als Glas-Flächen mit Haarlinie und 4-px-Akzentbalken statt 6-px-Rändern; Aufnäher mit Haarlinien-Ringen; Einstellungen: Segment-Schalter auf dunkler Schiene, aktiv Gold (Mint bleibt Glimm/Puls vorbehalten), Kippschalter Gold. **Karte als gemaltes Pergament** (`map/render.js`): Papier `#F3E6C9` mit Fasern und Flecken, Tintenrahmen, Windrose, Meer als blasse Lasur mit Wellenstrichen, Land als weiche Farbflächen (96er-Raster weich hochskaliert, Zonenfarben als entsättigte Lasur, Schleier grau-lila), Küste als Tuschelinie (Kantenpunkte eines 192er-Rasters), Nebel als Papierwolken mit Schraffur und Wolkenbögen, Marker mit Tinten-Kontur; die Rückfall-Karte in `journal/pages.js` nutzt denselben Renderer (`revealed: null` = ohne Nebel).
- **§11.7 Titel- und Ladebild:** Key-Art aus CSS-Ebenen in `shell.html`: Himmel goldene Stunde (7 Stopps), Sonne mit zwei Höfen (quer bei 66 % rechts der Titelkarte, hoch mittig hinter dem Vulkan), ferne Insel violett `#3A1F55` / `#4A2A6A`, Vulkaninsel magenta-braun `#5A2A50` mit Rauchballen, Meer mit gemaltem Sonnenpfad (unregelmäßige Lichtstreifen, kein Gitter), Horizontdunst, Möwen, Palmen/Steg/Laterne navy `#1B1033` als SVG-Silhouetten (erzeugt mit einem kleinen Generator, als data-URLs im CSS). Titel „LUMO“ 900, 0.08 em, Verlauf `#FFF3C4 → #FFD166 → #FF8A5B`, Glow 24 px; Untertitel Kapitälchen `#FFE9B8`; Ladebalken mint→gold→koralle; Start = Aktionspille. Intro-Titel über der Welt mit demselben Verlauf.
- **Weitere Flächen:** Recap-Karten, Lagerfeuer-Zeilen, Bestätigung, Fotomodus-Leiste (Glas, Gold-Auslöser), Halt-Ring, Stil-Studio und Lehrer-Panel auf dieselben Tokens umgestellt (Auswahl = Gold, Haarlinien statt Rändern).
- **Nicht angefasst:** Namensschilder (`actors/humanoid/nametag.js`, bereits nach §11.3 im WP Figuren), Gesprächs-Kamera (§12), Systeme unter `src/systems/**`.
- **Abnahme-Set:** `tests/ui-shots.mjs` → `shots/art/ui-nachher/` (u00–u24), Vorher-Stand in `shots/art/ui-vorher/`.

