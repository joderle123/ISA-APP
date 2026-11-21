// SOLO AKTION #05 · Wut – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a05.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-05",
 "kuerzel": "ak5",
 "nr": 5,
 "nrText": "#05",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #05",
 "fuss": "SOLO AKTION #05 · Wut",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-05-Wut-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Wut",
  "fr": ""
 },
 "untertitel": {
  "de": "Hier wird nicht lange geredet. Hier wird gemacht. Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.",
  "fr": ""
 },
 "farben": {
  "tief": "#69830B",
  "mittel": "#C6F02C",
  "zart": "#f8fde6",
  "dunkel": "#445507"
 },
 "deckbild": [
  "finn:wuetend:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:heartbeat}<span>Puls-Test</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:temperature}<span>Meine Knöpfe</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:body-scan}<span>Körper-Karte</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:ruler-2}<span>Lineal-Test</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:stack-2}<span>Unter dem Teller</span><small>10 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:hand-stop}<span>Mein Zeichen</span><small>15 Min.</small><i></i></div><div><b>8</b>{i:message-circle}<span>Der Satz danach</span><small>12 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Puls-Test",
   "icon": "heartbeat",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Uhr mit Sekunden",
   "bild": "finn:neutral",
   "schritte": [
    "Leg zwei Finger an den Hals. Spürst du den Puls?",
    "Dein Gegenüber stoppt **15 Sekunden**. Du zählst die Schläge.",
    "Jetzt **30 Sekunden Vollgas**: Hampelmann oder auf der Stelle rennen.",
    "Sofort wieder zählen. Dann nach jeder Minute.",
    "Tauschen: Jetzt ist dein Gegenüber dran."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Schläge in 15 Sek.",
      "vorher",
      "direkt danach",
      "nach 1 Min.",
      "nach 2 Min.",
      "nach 3 Min."
     ],
     "breiten": [
      30,
      14,
      14,
      14,
      14,
      14
     ],
     "zeilen": [
      [
       "Du",
       "",
       "",
       "",
       "",
       ""
      ],
      [
       "Dein Gegenüber",
       "",
       "",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Wer war schneller wieder unten?",
     "fragen": [
      {
       "f": "",
       "o": [
        "ich",
        "mein Gegenüber",
        "beide gleich"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Dein Körper braucht Zeit zum Runterkommen. Nach Wut noch länger: **ungefähr 20 Minuten.**",
   "ziel": "Am eigenen Körper erleben: Erregung klingt nur langsam ab.",
   "tipp": "Mitmachen, nicht nur stoppen. Statt Hüpfen geht auch Treppe oder schnelles Gehen. Bei Herz- oder Atemproblemen weglassen."
  },
  {
   "titel": "Meine Knöpfe",
   "icon": "temperature",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "finn:wuetend",
   "schritte": [
    "Lies die Sätze. Oder lass sie dir vorlesen.",
    "Schreib zu jedem Satz eine Zahl: **0** lässt mich kalt. **10** ich explodiere.",
    "Dein Gegenüber schreibt seine Zahl ins zweite Kästchen.",
    "Kreis deine **drei höchsten** Zahlen ein. Das sind deine Knöpfe."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Zahl von **0** (kalt) bis **10** (ich explodiere)",
     "kopf": [
      "",
      "du",
      "Gegenüber"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Jemand lacht über mich.",
       "",
       ""
      ],
      [
       "Jemand fasst meine Sachen an.",
       "",
       ""
      ],
      [
       "Ich war es nicht – und kriege den Ärger.",
       "",
       ""
      ],
      [
       "Ich muss lange warten.",
       "",
       ""
      ],
      [
       "Ich verliere.",
       "",
       ""
      ],
      [
       "Jemand sagt Nein.",
       "",
       ""
      ],
      [
       "Jemand redet schlecht über meine Familie.",
       "",
       ""
      ],
      [
       "Es ist laut und eng.",
       "",
       ""
      ],
      [
       "Jemand hält sein Versprechen nicht.",
       "",
       ""
      ],
      [
       "Jemand sagt mir, was ich tun soll.",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Jeder hat andere Knöpfe. **Wer seine kennt, wird seltener überrascht.**",
   "ziel": "Die eigenen Auslöser kennen und vergleichen.",
   "tipp": "Eigene Zahlen ehrlich eintragen. Hohe Zahlen nicht kommentieren, bei „Familie“ nicht nachfragen."
  },
  {
   "titel": "Körper-Karte",
   "icon": "body-scan",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei dicke Stifte",
   "bild": "",
   "schritte": [
    "Denk an das letzte Mal, als du richtig sauer warst.",
    "Mal in die Figur: **Wo** im Körper war die Wut? Je stärker, desto dicker.",
    "Kreuz an, was dazu passt.",
    "Kreis ein, was **zuerst** kommt.",
    "Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-koerper\"><div class=\"fig\"><svg viewBox=\"0 0 100 200\" fill=\"#fff\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><circle cx=\"50\" cy=\"21\" r=\"15\"/><path d=\"M50 39C31 40 23 51 21 68L14 110C13 119 24 121 26 113L33 80L33 121L28 186C27 197 42 198 43 187L50 132L57 187C58 198 73 197 72 186L67 121L67 80L74 113C76 121 87 119 86 110L79 68C77 51 69 40 50 39Z\"/></svg></div><div class=\"w\"><span class=\"ak-box\"><i></i>Fäuste</span><span class=\"ak-box\"><i></i>Kiefer fest</span><span class=\"ak-box\"><i></i>heißer Kopf</span><span class=\"ak-box\"><i></i>Herz rast</span><span class=\"ak-box\"><i></i>Bauch hart</span><span class=\"ak-box\"><i></i>Tunnelblick</span><span class=\"ak-box\"><i></i>Zittern</span><span class=\"ak-box\"><i></i>Stimme wird laut</span><span class=\"ak-box\"><i></i>ich werde ganz still</span></div></div>"
    }
   ],
   "aha": "Dein Körper merkt die Wut vor deinem Kopf. Das erste Zeichen ist dein **Frühwarn-System.**",
   "ziel": "Das erste Körpersignal finden.",
   "tipp": "Den Körper des Jugendlichen nicht kommentieren. Das eigene erste Zeichen nennen."
  },
  {
   "titel": "Lineal-Test",
   "icon": "ruler-2",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Lineal, 30 cm",
   "bild": "",
   "schritte": [
    "Dein Gegenüber hält das Lineal oben fest. Die Null zeigt nach unten.",
    "Deine Hand ist unten an der Null. Offen. Nicht berühren.",
    "Dein Gegenüber lässt los – **ohne Ansage.** Du fängst.",
    "Lies ab, wo deine Finger sind. Kleine Zahl heißt: schnell.",
    "Fünf Versuche. Dann tauschen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "cm",
      "1",
      "2",
      "3",
      "4",
      "5",
      "Bester"
     ],
     "breiten": [
      26,
      12.333333333333334,
      12.333333333333334,
      12.333333333333334,
      12.333333333333334,
      12.333333333333334,
      12.333333333333334
     ],
     "zeilen": [
      [
       "Du",
       "",
       "",
       "",
       "",
       "",
       ""
      ],
      [
       "Dein Gegenüber",
       "",
       "",
       "",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Dein Körper reagiert schneller, als dein Kopf denken kann. Darum brauchst du einen Plan – **vor dem Knall.**",
   "ziel": "Erleben: Reagieren geht schneller als Nachdenken.",
   "tipp": "Wettkampf zulassen und selbst verlieren können. Danach passt Aktion 7 (der Plan)."
  },
  {
   "titel": "Unter dem Teller",
   "icon": "stack-2",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "finn:wuetend",
   "schritte": [
    "Schaut euch Finns Tag an.",
    "Kreuz an: Was lag **unter** Finns Wut?",
    "Jetzt du: Denk an dein letztes Mal. Was lag darunter?",
    "Dein Gegenüber kreuzt auch an – für sein letztes Mal."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:message}</div><p>Freitag früh. Seit zwei Wochen freut Finn sich auf das Wochenende bei seiner Mutter. Dann ihre Nachricht: „Klappt diesmal nicht.“</p></div><div><div class=\"o\"><b>2</b>{i:mood-silence}</div><p>In der Schule sagt Finn keinem etwas. Im Kopf: „War ja klar. Ich bin ihr egal.“</p></div><div><div class=\"o\"><b>3</b>{i:tools-kitchen-2}</div><p>Abends sagt der Erzieher: „Finn, Handy weg. Wir essen.“</p></div><div><div class=\"o\"><b>4</b>{i:bolt}</div><p>Finn wirft den Teller an die Wand. Alle denken: wegen dem Handy.</p></div></div>"
    },
    {
     "art": "tabelle",
     "auftrag": "Was lag darunter?",
     "kopf": [
      "",
      "Finn",
      "ich",
      "Gegenüber"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "Enttäuschung",
       "",
       "",
       ""
      ],
      [
       "Scham (peinlich)",
       "",
       "",
       ""
      ],
      [
       "Angst",
       "",
       "",
       ""
      ],
      [
       "Ohnmacht (ich kann nichts tun)",
       "",
       "",
       ""
      ],
      [
       "Einsam",
       "",
       "",
       ""
      ],
      [
       "Ungerecht behandelt",
       "",
       "",
       ""
      ],
      [
       "weiß nicht",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Unter der Wut liegt fast immer ein anderes Gefühl. **Der Teller war nicht das Problem.**",
   "ziel": "Das Gefühl unter der Wut benennen – erst bei Finn, dann bei sich.",
   "tipp": "„Weiß nicht“ ist eine gute Antwort. Nicht nachbohren, warum."
  },
  {
   "titel": "Video-Check",
   "icon": "player-play",
   "zeit": "12 Min.",
   "wer": "zusammen",
   "material": "Handy oder Tablet",
   "bild": "",
   "schritte": [
    "Scannt den Code. Schaut die ersten 6 Minuten.",
    "Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?",
    "Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei."
   ],
   "zonen": [
    {
     "art": "clip",
     "titel": "Aggressiv: Woher kommt deine Wut?",
     "kanal": "Terra Xplore",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=ytcdqLNedrg",
     "frage": "Wen aus dem Video verstehst du am besten?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Wut ist immer schlecht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Wut kann auch helfen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich kenne jemanden wie im Video.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Man kann lernen, anders mit Wut umzugehen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Wut ist nicht schlecht. Sie zeigt, dass etwas nicht stimmt. **Die Frage ist, was du mit ihr machst.**",
   "ziel": "Wut als Signal sehen, nicht als Fehler.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Ohne Netz: Aktion auslassen."
  },
  {
   "titel": "Mein Zeichen",
   "icon": "hand-stop",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "",
   "bild": "finn:wuetend",
   "schritte": [
    "Kreuz an: Was hilft dir, wenn du ganz oben bist? Höchstens drei.",
    "Erfinde ein **Zeichen** für „Ich brauche 20 Minuten“: ein Wort oder eine Handbewegung.",
    "Probe: Dein Gegenüber nervt dich – nur gespielt. Du gibst das Zeichen und gehst raus.",
    "Eine Minute draußen. Dann komm zurück.",
    "Klärt: **Wer muss das Zeichen noch kennen?**"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:door-exit}<span>rausgehen</span><i></i></div><div>{i:run}<span>laufen oder rennen</span><i></i></div><div>{i:headphones}<span>Musik</span><i></i></div><div>{i:user}<span>allein sein</span><i></i></div><div>{i:hand-grab}<span>etwas fest drücken</span><i></i></div><div>{i:barbell}<span>Liegestütze</span><i></i></div><div>{i:pencil}<span>zeichnen</span><i></i></div><div>{i:message-circle}<span>mit jemandem reden</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Mein Zeichen:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Weggehen ist kein Aufgeben. **Es ist ein Plan.** Wer zurückkommt, hat gewonnen.",
   "ziel": "Ein vereinbartes Zeichen für eine Auszeit – geübt, bevor es gebraucht wird.",
   "tipp": "Vorher klären, wohin der Jugendliche gehen darf. Beim „Nerven“ nie persönlich werden: zum Beispiel zehnmal dieselbe Frage stellen. Das Zeichen mit seinem Einverständnis ans Team geben."
  },
  {
   "titel": "Der Satz danach",
   "icon": "message-circle",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "",
   "bild": "finn:froh",
   "schritte": [
    "Dein Gegenüber liest vier Sätze vor. Kreuz an: Repariert der Satz etwas?",
    "Such dir unten einen Satz aus. Oder bau einen eigenen.",
    "Probe: Dein Gegenüber spielt die Person, bei der es geknallt hat. Du sagst den Satz. **Laut.**",
    "Tauschen: Dein Gegenüber sagt seinen Satz zu dir."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Vier Sätze nach dem Knall:",
     "kopf": [
      "",
      "repariert",
      "bringt nichts"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Tut mir leid, aber du hast angefangen.“",
       "",
       ""
      ],
      [
       "„Vorhin ging es eigentlich nicht um dich.“",
       "",
       ""
      ],
      [
       "„Kommt nie wieder vor. Versprochen.“",
       "",
       ""
      ],
      [
       "„Ich war wegen etwas anderem fertig. Den Teller mache ich weg.“",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Mein Satz:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Vorhin ging es eigentlich nicht um …“",
        "„Ich war wegen etwas anderem sauer.“",
        "„Das mache ich wieder gut: …“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "fragen",
     "auftrag": "Oder mein eigener:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Ein ehrlicher Satz repariert mehr als zehn Erklärungen. **Versprich nichts, was du nicht halten kannst.**",
   "ziel": "Einen eigenen Satz für danach haben und einmal laut gesagt haben.",
   "tipp": "Den eigenen Satz wirklich sagen – am besten zu einer echten Situation mit dem Jugendlichen."
  }
 ],
 "woche": {
  "titel": "Strichliste",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Jedes Mal, wenn es diese Woche knallt oder fast knallt: **danach** ein Strich.",
   "Der Strich kommt zu dem Gefühl, das darunter lag.",
   "Wette vorher: Welches Wort gewinnt? Kreis es ein."
  ],
  "zonen": [
   {
    "art": "tabelle",
    "auftrag": "",
    "hoch": false,
    "kopf": [
     "",
     "Mo",
     "Di",
     "Mi",
     "Do",
     "Fr",
     "Sa",
     "So"
    ],
    "breiten": [
     37,
     9,
     9,
     9,
     9,
     9,
     9,
     9
    ],
    "zeilen": [
     [
      "Enttäuschung",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Scham (peinlich)",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Angst",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Ohnmacht (ich kann nichts tun)",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Einsam",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Ungerecht behandelt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "weiß nicht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ]
    ]
   },
   {
    "art": "schneidekarten",
    "auftrag": "Für die Tasche: Schneide die Karten aus.",
    "spalten": 2,
    "karten": [
     {
      "titel": "20 Minuten",
      "icon": "clock",
      "text": "Ganz oben? **Jetzt nicht reden.**\nZeichen geben. Weggehen.\nNach 20 Minuten ist der Kopf wieder da."
     },
     {
      "titel": "Mein Plan",
      "icon": "hand-stop",
      "text": "**Mein Zeichen:** ________________\n**Das hilft mir:** ________________\n**Mein Satz danach:** ________________"
     }
    ]
   }
  ],
  "aha": "Das Wort mit den meisten Strichen ist dein Thema. **Nicht die Wut.**",
  "ziel": "Eine Woche lang das Gefühl unter der Wut zählen.",
  "tipp": "Beim nächsten Mal zuerst die Liste ansehen. Nur zählen, nicht bewerten – auch eine leere Liste ist ein Ergebnis."
 },
 "begleitungAktion": {
  "material": "Uhr, Lineal, Stifte, Handy",
  "achtung": "Aktionen zu Wut können erlebte Gewalt berühren. Zuhören, nicht ausfragen; bei aktueller Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Bei Ankündigungen, jemandem etwas anzutun, oder bei Selbstverletzung nach Ausrastern direkt nachfragen und nicht allein entscheiden. Aktion 7 nur spielen, wenn die Stimmung ruhig ist. Das Heft ersetzt keine Vereinbarungen zur Sicherheit in der Gruppe.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #05 Wut."
 }
}

export const LEKTIONEN = []
