// SOLO AKTION #07 · Stimme – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a07.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-07",
 "kuerzel": "ak7",
 "nr": 7,
 "nrText": "#07",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #07",
 "fuss": "SOLO AKTION #07 · Stimme",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-07-Stimme-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Stimme",
  "fr": ""
 },
 "untertitel": {
  "de": "Die Stimme im Kopf sind deine eigenen Gedanken – die fiesen. Sie kommentiert alles, was du tust. Hier lernst du sie kennen. Jede Aktion dauert 10 bis 15 Minuten.",
  "fr": ""
 },
 "farben": {
  "tief": "#855DF2",
  "mittel": "#B79CFF",
  "zart": "#f6f3ff",
  "dunkel": "#563c9d"
 },
 "deckbild": [
  "mia:nervoes:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:id-badge-2}<span>Steckbrief</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:quote}<span>Wörtlich zitiert</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:hand-finger}<span>Falsche Hand</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:file-check}<span>Mia, 14 von 20</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:armchair}<span>Zwei Stühle</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:ball-basketball}<span>„Hab’s gehört.“</span><small>15 Min.</small><i></i></div><div><b>8</b>{i:speakerphone}<span>Trainer statt Richter</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Steckbrief",
   "icon": "id-badge-2",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Stifte",
   "bild": "mia:nervoes",
   "schritte": [
    "Stell dir die fiese Stimme als **Figur** vor.",
    "Zeichne sie. 60 Sekunden. Strichmännchen reicht.",
    "Gib ihr einen Namen.",
    "Kreis ein, wie sie klingt.",
    "Dein Gegenüber zeichnet seine daneben."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "So sieht sie aus (links du, rechts dein Gegenüber):",
     "html": "<div class=\"feldbox\" style=\"height:62mm\"></div>"
    },
    {
     "art": "mc",
     "auftrag": "So klingt sie:",
     "fragen": [
      {
       "f": "",
       "o": [
        "spöttisch",
        "streng",
        "genervt",
        "enttäuscht",
        "kalt",
        "laut"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "fragen",
     "auftrag": "Sie heißt:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Du **hast** eine Stimme. Du **bist** nicht die Stimme.",
   "ziel": "Abstand zur inneren Kritik: Sie wird eine Figur.",
   "tipp": "Die eigene Stimme wirklich zeichnen. Nicht fragen, an wen die Figur erinnert."
  },
  {
   "titel": "Wörtlich zitiert",
   "icon": "quote",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest die Sätze vor.",
    "Kreuz an: Welche sagt **deine** Stimme?",
    "Dein Gegenüber kreuzt für seine an.",
    "Kreis den Satz ein, der am häufigsten kommt."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Das sagt sie:",
     "kopf": [
      "",
      "meine",
      "die vom Gegenüber"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Das schaffst du eh nicht.“",
       "",
       ""
      ],
      [
       "„Alle anderen sind besser.“",
       "",
       ""
      ],
      [
       "„Typisch.“",
       "",
       ""
      ],
      [
       "„Du nervst.“",
       "",
       ""
      ],
      [
       "„Die meinen das nicht ernst.“",
       "",
       ""
      ],
      [
       "„Selbst schuld.“",
       "",
       ""
      ],
      [
       "„Das war peinlich.“",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Fast jeder hat so eine Stimme. **Auch dein Gegenüber.**",
   "ziel": "Die Sätze der Stimme kennen – und sehen, dass Erwachsene sie auch haben.",
   "tipp": "Ehrlich ankreuzen. Wenn Sie mehr Kreuze haben als der Jugendliche: umso besser."
  },
  {
   "titel": "Falsche Hand",
   "icon": "hand-finger",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Papier, Stift",
   "bild": "",
   "schritte": [
    "Zeichne **drei Minuten** lang das Gesicht deines Gegenübers.",
    "Mit der **falschen Hand.**",
    "Jeder fiese Gedanke über dich oder dein Bild: **ein Strich** am Rand.",
    "Dein Gegenüber zeichnet dich – und zählt auch."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "Striche"
     ],
     "breiten": [
      86,
      14
     ],
     "zeilen": [
      [
       "Du",
       ""
      ],
      [
       "Dein Gegenüber",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das hat sie gesagt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„hässlich“",
        "„peinlich“",
        "„kannst du nicht“",
        "„lass es“",
        "nichts"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Die Stimme meldet sich, **sobald du etwas versuchst.** Wer sie bemerkt, ist schon einen Schritt weiter.",
   "ziel": "Die Stimme in Echtzeit bemerken – bei einer harmlosen Aufgabe.",
   "tipp": "Über die Bilder lachen ist erlaubt, über die Person nicht. Die eigenen Striche laut mitzählen."
  },
  {
   "titel": "Mia, 14 von 20",
   "icon": "file-check",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "mia:traurig",
   "schritte": [
    "Schaut euch Mias Moment an.",
    "Kreis ein: Würde Mia so mit einer Freundin reden?",
    "Kreuz an: Was würde sie der Freundin sagen?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:file-check}</div><p>Mia bekommt die Arbeit zurück: 14 von 20.</p></div><div><div class=\"o\"><b>2</b>{i:thumb-up}</div><p>Die Lehrerin sagt: „Gut gemacht.“</p></div><div><div class=\"o\"><b>3</b>{i:volume}</div><p>Die Stimme sagt: „Sechs Fehler. Die sagt das aus Mitleid.“</p></div><div><div class=\"o\"><b>4</b>{i:mood-smile}</div><p>Mia lächelt und packt das Blatt weg.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Würde Mia so mit einer Freundin reden?",
     "fragen": [
      {
       "f": "",
       "o": [
        "nie",
        "vielleicht",
        "ja"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das würde sie der Freundin sagen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„14 ist gut.“",
        "„Sechs Fehler. Peinlich.“",
        "„Nächstes Mal 15.“"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Niemand im Raum redet so mit Mia. **Nur sie selbst.**",
   "ziel": "Den Unterschied sehen: So redet man mit anderen nicht.",
   "tipp": "Nicht sagen „Du machst das auch“. Das merkt er selbst."
  },
  {
   "titel": "Zwei Stühle",
   "icon": "armchair",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "zwei Stühle",
   "bild": "",
   "schritte": [
    "Stuhl 1 ist **die Stimme.** Stuhl 2 ist **jemand, der dich mag.**",
    "Dein Gegenüber liest eine Lage vor.",
    "Setz dich auf Stuhl 1: Was sagt die Stimme?",
    "**Wechsel den Stuhl:** Was sagt jemand, der dich mag?",
    "Bei der nächsten Lage ist dein Gegenüber dran."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Gesagt auf …",
     "kopf": [
      "",
      "Stuhl 1",
      "Stuhl 2"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Ich habe etwas verhauen.",
       "",
       ""
      ],
      [
       "Jemand antwortet mir nicht.",
       "",
       ""
      ],
      [
       "Jemand lobt mich.",
       "",
       ""
      ],
      [
       "Ich habe etwas vergessen.",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Welcher Stuhl war leichter?",
     "fragen": [
      {
       "f": "",
       "o": [
        "Stuhl 1",
        "Stuhl 2",
        "beide gleich"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Gleiche Lage, zwei Stimmen. **Du kannst den Stuhl wechseln.**",
   "ziel": "Erleben, dass es eine zweite Art gibt, mit sich zu reden.",
   "tipp": "Wirklich aufstehen und wechseln – die Bewegung ist der Punkt. Fällt Stuhl 2 schwer: „Was würdest du einem sagen, den du magst?“"
  },
  {
   "titel": "Video-Check",
   "icon": "player-play",
   "zeit": "12 Min.",
   "wer": "zusammen",
   "material": "Handy oder Tablet",
   "bild": "",
   "schritte": [
    "Scannt den Code. Schaut die ersten 5 Minuten.",
    "Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?",
    "Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei."
   ],
   "zonen": [
    {
     "art": "clip",
     "titel": "Impostor-Syndrom: Warum wir uns manchmal als Hochstapler fühlen",
     "kanal": "Quarks Dimension Ralph",
     "dauer": "die ersten 5 Min.",
     "url": "https://www.youtube.com/watch?v=8sPRWUwsmfk",
     "frage": "Erfolgreiche Leute glauben ihr auch. Was sagt das über die Stimme?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Lob glaube ich meistens nicht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Auch erfolgreiche Leute zweifeln an sich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Wer an sich zweifelt, ist schwach.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich denke manchmal: Gleich merken alle, dass ich nichts kann.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Die Stimme sagt wenig darüber, **was du wirklich kannst.**",
   "ziel": "Sehen, dass Selbstzweifel und Können nichts miteinander zu tun haben.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "„Hab’s gehört.“",
   "icon": "ball-basketball",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "10 Papierkugeln, Papierkorb",
   "bild": "mia:muede",
   "schritte": [
    "Wirf zehn Papierkugeln in den Korb. **Runde 1:** in Ruhe.",
    "**Runde 2:** Dein Gegenüber spielt die Stimme und sagt bei jedem Wurf „Daneben.“, „Typisch.“ oder „Wird nichts.“",
    "**Runde 3:** wie Runde 2. Du sagst jedes Mal **„Hab’s gehört.“** – und wirfst weiter.",
    "Tauschen: Jetzt bist du die Stimme."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Treffer von 10",
      "in Ruhe",
      "mit Stimme",
      "mit „Hab’s gehört.“"
     ],
     "breiten": [
      58,
      14,
      14,
      14
     ],
     "zeilen": [
      [
       "Du",
       "",
       "",
       ""
      ],
      [
       "Dein Gegenüber",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Du musst die Stimme nicht loswerden. **„Hab’s gehört.“ Und weitermachen.**",
   "ziel": "Eine Antwort auf die Stimme üben, die nicht diskutiert.",
   "tipp": "Zuerst werfen Sie, der Jugendliche ist die Stimme. Nur die drei Sätze aus dem Heft benutzen, nichts Persönliches."
  },
  {
   "titel": "Trainer statt Richter",
   "icon": "speakerphone",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Ein Richter sagt: „Schuldig.“ Ein Trainer sagt: „Nächster Versuch.“",
    "Kreuz an: Welche **Trainer-Sätze** passen zu dir?",
    "Dein Gegenüber macht etwas mit Absicht falsch. Du bist der Trainer. Sag deinen Satz.",
    "Tauschen."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Meine Trainer-Sätze:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Nächster Versuch.“",
        "„Das war schwer. Du hast es probiert.“",
        "„Ein Fehler. Kein Urteil.“",
        "„Was brauchst du jetzt?“",
        "„Weiter.“"
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
   "aha": "Wer fair mit sich ist, **versucht es eher noch einmal.**",
   "ziel": "Einen eigenen fairen Satz haben und einmal laut gesagt haben.",
   "tipp": "Ihr „Fehler“ darf lustig sein. Wichtig ist, dass der Jugendliche den Trainer-Satz laut sagt – zu Ihnen."
  }
 ],
 "woche": {
  "titel": "Ein Tag Strichliste",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Such dir **einen Tag** aus. Zähl mit.",
   "Jeder fiese Satz gegen dich: ein Strich in der ersten Zeile.",
   "An den anderen Tagen nur die Zeilen zwei und drei."
  ],
  "zonen": [
   {
    "art": "tabelle",
    "auftrag": "",
    "hoch": true,
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
      "Die Stimme hat sich gemeldet",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "„Hab’s gehört.“ gesagt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Trainer-Satz benutzt",
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
      "titel": "Wer redet da?",
      "icon": "volume",
      "text": "Die Stimme meldet sich.\nKurz hinhören: Wie klingt sie?\n„Hab’s gehört.“ Dann weitermachen."
     },
     {
      "titel": "Trainer statt Richter",
      "icon": "heart-handshake",
      "text": "Was ist passiert? Nur Fakten.\nWas würde ein guter Trainer sagen?\nWas ist der nächste Versuch?"
     }
    ]
   }
  ],
  "aha": "Nichts ändern. Nur zählen. **Das reicht schon, damit sie leiser wird.**",
  "ziel": "Die Stimme einen Tag lang zählen.",
  "tipp": "Die Zahl nicht bewerten. Fragen: Zu welcher Tageszeit kamen die meisten Striche?"
 },
 "begleitungAktion": {
  "material": "Stifte, Papier, zwei Stühle, Papierkorb, Handy",
  "achtung": "Starke Selbstabwertung kann mit Selbstverletzung oder Suizidgedanken einhergehen. Sätze wie „Ohne mich wäre es besser“ ruhig und direkt aufgreifen: „Denkst du manchmal daran, nicht mehr leben zu wollen?“ Danach nicht allein entscheiden – Verfahren der Einrichtung, zuständige Leitung (Responsable), Krisenplan. Stammt die Stimme erkennbar aus Abwertung oder Gewalt zu Hause, ist das ein Hinweis auf Belastung, der ins Team gehört. Wichtig: „Stimme im Kopf“ meint hier eigene Gedanken. Berichtet der Jugendliche von Stimmen, die er wie von außen hört, ist das ein Fall für eine ärztliche Abklärung.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #07 Stimme."
 }
}

export const LEKTIONEN = []
