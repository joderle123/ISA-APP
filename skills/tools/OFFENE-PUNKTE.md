# Offene Punkte zu den Kursinhalten (bitte kurz prüfen)

Beim Aufbereiten des Skills-Kurses für das Spiel sind diese Punkte aufgefallen. Die Agenten haben Lücken sinnvoll ergänzt; das sollte die Kursleitung gegenprüfen.

## Kursjahr 1

- Partneratmung has typ 'atem' (yellow/red), although the course says it belongs in the 'Menschen' compartment of the skills case. As a 'menschen' card it would only work at green, as the finishing move, which does not fit a breathing exercise.
- Freundliche Stimme: the source only says 'die drei Sätze' and never lists them. I used standard self-compassion sentences ('Das ist gerade schwer.' / 'Anderen geht es auch manchmal so.' / 'Ich darf freundlich zu mir sein.'). Match them to the teacher's script.
- Konflikt-Treppe (j1-e24 order mission): the source only points to a table. The five steps (Runterkommen -> Ich-Botschaft -> Zuhören -> Ideen sammeln -> Einigen) are reconstructed from the unit text. Check them against the course poster.
- Unsichtbare Skills (j1-j09): the source does not list the four skills. I used pressing feet into the floor, tensing and releasing hands, breathing out slowly, and a sip of water (from the tip). The card uses the 'anspannen-loslassen' interaction.
- minute-stille is named 'Bis es still ist' (the first unit j1-e13 uses the singing bowl). The card also covers 'eine Minute Stille' from j1-j08.
- achtsamkeit-wahl has typ 'sinne' (yellow/red, 'zaehlen' 5 breaths), although one of the choices (Gedankenschiffchen) is a head skill.
- j1-e26 reuses the three zone colours for a zonen-sortieren mission: green = fun, yellow = conflict, red = bullying (explained in the intro). If the engine automatically shows tension text for each zone, this will be misleading.
- I added an extra 'sekunden' param (timer length) to the genuss/bewegen/anker interactions. It is not in the spec schema, but an engine that ignores it is unaffected.
- Numbers in the schaetzen missions are rounded guideline values: personal distance about 120 cm with strangers and about 50 cm with friends, Luxembourg about 35% forest, about 20 minutes of nature lowering stress, WHO 60 minutes of exercise, 8-10 hours of sleep, phone away 30-60 minutes before bed, body about 60% water. Worth a quick fact-check by the teacher.
- Code collision: year 2 (sport/music theme) also used HAFEN, so I changed j1-e01 to BOJE. kurs-j3.js did not exist yet; run the collision check again once it does.
- j1-j01 detective mission uses the plot of 'Alles steht Kopf' 1: Riley's mother asks her to stay happy, the parents comfort her at the end and say they miss the old home too. This is accurate to my knowledge.
- sinne-54321 is 'legendaer' because it is the first and the last skill of the year. Flavor lines follow the spec example's style of two short fragments ('Langsamer als dein Puls. Stärker als dein Stress.').
- The source mentions the name 'Ben' twice (j1-e16 'Bens zwei Gedanken', j1-j03 'Bens Feed'). Neither appears in the game content.

**Als heikel markiert oder bewusst nicht markiert:**

- j1-j08 (Wenn uns etwas beschäftigt): heikel=true. The mission is a factual mythos-fakt round on 'every reaction is normal', 'check rumours' and 'nobody has to talk'. It asks for nothing personal and names the school contact person, 116 111 (anonymous, free) and 112.
- Situations heikel=true: j1-leerer-tank (home: sibling, hunger), j1-voller-rucksack (row at home plus stress).
- Deliberately heikel=false because the missions are behavioural and not personal (teacher may change this): j1-e26 Mobbing (mission: fun/conflict/bullying sorting, ends with 116 111 and BEE SECURE 8002 1234), j1-e29 (the course's four-corners game touches alcohol/body/sexuality, but the mission only covers sleep, exercise and phone use), j1-e22/j1-e23 (physical boundaries; the Stopp mission states that the person who crosses a boundary is responsible), j1-e17 (own beliefs: mission is general mythos-fakt, the personal sheet stays private), j1-e28 (says faking/sharing others' images can be illegal, points to BEE SECURE).

## Kursjahr 2

- Several skill steps in the source say '(Liste)' but the list itself is missing. I wrote those sentences from the unit context. This affects gute-wuensche, mitgefuehl-pause, freundlicher-neustart, the 4 steps of erst-runter-dann-senden, and welle-reiten. The 4 parts of an apology in the e12 mission (a table missing from the source) were also derived.
- Some mission numbers come from memory, not from the course. e07: forgetting curve about 66% after one day, and about 40% (rereading) vs 60% (self-test) after one week (Roediger & Karpicke). e14: irony in text, 78% expected vs 56% recognised (Kruger et al. 2005). e22: about 47% of residents without a Luxembourg passport, more than 170 nationalities, 3 administrative languages, about 220,000 daily cross-border commuters. The teacher should check these against current STATEC data.
- Codes TEAM, START, PAUSE and FAIR are generic words. Another year might use them if its author strays from its theme. kurs-j1.js and kurs-j3.js did not exist yet, so run the full validator again once all three files are in.
- Some interaction params have an extra 'text' key the spec does not list: the atmen params of ruhesatz-herzsprache and the sinne-tippen steps of landen and zitronen-uebung. The engine may ignore it.
- skill-der-bleibt depends on the group's hitparade winner, which the game cannot know. I made it a generic legendary anker card ('do your skill of the year now'), typ koerper, zones gruen/gelb/rot. rot-skill (double sigh plus stop) uses the 'halten' interaction so it does not duplicate seufzer-atmung.
- All 11 stamp names are my own (Olympia-Team, Innerer Coach, Pruefungs-Profi, Stopp-Ampel-Profi, Freundschafts-Profi, Verhandlungs-Profi, Respekt-Stern, Netz-Sicher, Welle geritten, Starke Schulter, Kompass komplett). The year-2 source names no special stamps.
- heikel was set on e16, e18-e20, e24, e27-e29 and e33. I left e04 (body image), e15 (exclusion), e17 (friendship ending), e23 (discrimination) and e25 (online hate) as false; the teacher may want to change that. In the situations, the family, substance, stranger-photo and crisis ones are heikel.
- The j2-j03 mission (film 'Wunder') uses plot details from memory: Summer sits with Auggie at lunch, Jack becomes his friend, others defend him at camp.

**Als heikel markiert oder bewusst nicht markiert:**

- j2-e16
- j2-e18
- j2-e19
- j2-e20
- j2-e24
- j2-e27
- j2-e28
- j2-e29
- j2-e33

## Kursjahr 3

- woop ('WOOP im Kopf') typed 'menschen' (Handeln, green-only finisher, zonen ['gruen']) to give year 3 an action card; the course name suggests 'kopf'.
- hand-aufs-herz typed 'kopf' (anker interaction) to match j2's selbstmitgefuehl-pause, although the name suggests a body skill.
- Stamp names are invented (the course only names 'Skills-Profi' in j1): Startklar, Werte-Kompass, Entscheidungs-Profi, Zukunfts-Pilot, Alltags-Profi, Plan an Bord, Starkes Netz, Stimme zählt, Grenzen-Profi, Durchblick, Skills-Legende.
- Code for e20 was BOJE, which collided with kurs-j1 (written in parallel); changed to BASIS. 'basis' is also a seltenheit value, which could be mildly confusing.
- Extra params beyond the spec: satz-im-ausatmen has atmen params with an extra 'satz'; wegstein uses sinne-tippen steps with a 'text' field (as j2 does). The renderer must ignore or use them.
- e22 (Hilfe-Landkarte: party emergency, threatening photos, a contraception question) and e34 (Ampel-Check with one crisis item pointing to 116 111/112) are NOT marked heikel.
- e18 Scham und Schuld and e19 Einsamkeit are not marked heikel; within module 5 only e17 and e20 are.
- 26 situations, slightly above the 'about 20–25' target (2–3 per module). Heikel situations: j3-heimweg, j3-bruder-geld, j3-tiago-treppe, j3-handy-kontrolle, j3-bild-druck, j3-bild-im-chat.
- Facts to check: Kauai quiz uses 698 children and 'jedes dritte' -> 3 of 10, per the course text. The e35 nostalgia quiz assumes 117 units, 100 minutes, 5 Koffer compartments and red from 70, as in SPEC.md.
- Kanner- a Jugendtelefon is not 24/7, so it is paired with 'wants to talk anonymously' rather than 'at night'.

**Als heikel markiert oder bewusst nicht markiert:**

- j3-e08
- j3-e17
- j3-e20
- j3-e27
- j3-e28
- j3-e29
- j3-e30
