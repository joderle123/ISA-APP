// SOLO AKTION #02 · Grenzen – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a02.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-02",
 "kuerzel": "ak2",
 "nr": 2,
 "nrText": "#02",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #02",
 "fuss": "SOLO AKTION #02 · Grenzen",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-02-Grenzen-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Grenzen",
  "fr": ""
 },
 "untertitel": {
  "de": "Wo ist deine Grenze? Das findest du hier heraus – mit den Füßen, nicht mit Reden. Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.",
  "fr": ""
 },
 "farben": {
  "tief": "#E53813",
  "mittel": "#FF5A36",
  "zart": "#ffebe7",
  "dunkel": "#95240c"
 },
 "deckbild": [
  "chloe:neutral:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:ruler-measure}<span>Die Linie</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:body-scan}<span>Körper-Check</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:door}<span>Mauer oder Tor</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:numbers}<span>Auf drei!</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:coins}<span>Chloé sagt „Klar“</span><small>10 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:hand-stop}<span>Nein-Training</span><small>12 Min.</small><i></i></div><div><b>8</b>{i:list-check}<span>Meine Regeln</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Die Linie",
   "icon": "ruler-measure",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Klebeband oder Schnur",
   "bild": "chloe:neutral",
   "schritte": [
    "Dein Gegenüber bleibt stehen. Du stellst dich weit weg.",
    "Geh langsam hin. **Bleib stehen, wo es sich richtig anfühlt.**",
    "Kleb dort eine Linie auf den Boden. Zähl die Fußlängen dazwischen.",
    "Tauschen – nur wenn du willst: Dein Gegenüber kommt, du sagst **„Stopp“.**",
    "Vergleicht die zwei Linien."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Abstand in Fußlängen",
      "ich gehe hin",
      "ich sage Stopp"
     ],
     "breiten": [
      72,
      14,
      14
     ],
     "zeilen": [
      [
       "Du",
       "",
       ""
      ],
      [
       "Dein Gegenüber",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Was hat dein Körper kurz vor der Linie gemacht?",
     "fragen": [
      {
       "f": "",
       "o": [
        "nichts",
        "Bauch",
        "Schultern hoch",
        "Blick weg",
        "Schritt zurück",
        "gelacht"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Dein Körper weiß, wo deine Grenze ist. **Du musst nur hinhören.**",
   "ziel": "Die eigene Distanz spüren, bevor darüber geredet wird.",
   "tipp": "Zuerst geht der Jugendliche auf Sie zu. Nie über seine Linie treten, den Abstand nicht kommentieren. Wer nicht tauschen will, tauscht nicht."
  },
  {
   "titel": "Körper-Check",
   "icon": "body-scan",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei dicke Stifte",
   "bild": "",
   "schritte": [
    "Denk an einen Moment, in dem dir jemand zu nah kam. Oder zu viel wollte.",
    "Mal in die Figur: **Wo** hast du es gemerkt?",
    "Kreuz an, was dazu passt.",
    "Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-koerper\"><div class=\"fig\"><svg viewBox=\"0 0 100 200\" fill=\"#fff\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><circle cx=\"50\" cy=\"21\" r=\"15\"/><path d=\"M50 39C31 40 23 51 21 68L14 110C13 119 24 121 26 113L33 80L33 121L28 186C27 197 42 198 43 187L50 132L57 187C58 198 73 197 72 186L67 121L67 80L74 113C76 121 87 119 86 110L79 68C77 51 69 40 50 39Z\"/></svg></div><div class=\"w\"><span class=\"ak-box\"><i></i>Bauch zieht sich zusammen</span><span class=\"ak-box\"><i></i>Kiefer wird fest</span><span class=\"ak-box\"><i></i>Schritt zurück</span><span class=\"ak-box\"><i></i>Ich lächle – und meine es nicht</span><span class=\"ak-box\"><i></i>Ich werde still</span><span class=\"ak-box\"><i></i>Ich schaue weg</span><span class=\"ak-box\"><i></i>Mir wird heiß</span><span class=\"ak-box\"><i></i>Hände in die Taschen</span></div></div>"
    }
   ],
   "aha": "Dein Nein ist da, **bevor du es denkst.** Der Körper sagt es zuerst.",
   "ziel": "Das eigene Körpersignal für „zu viel“ kennen.",
   "tipp": "Nicht fragen, an welchen Moment er denkt. Ihr eigenes Signal zeigen."
  },
  {
   "titel": "Mauer oder Tor",
   "icon": "door",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "chloe:besorgt",
   "schritte": [
    "**Mauer** heißt: Keiner kommt an mich ran. **Tor** heißt: Alle kommen rein.",
    "Mach in jeder Zeile ein Kreuz.",
    "Dein Gegenüber kreuzt in einer anderen Farbe an.",
    "Schaut hin: Wo ist deine Mauer am höchsten?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Wie ist deine Grenze bei …",
     "kopf": [
      "",
      "Mauer",
      "passt",
      "Tor"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "Familie",
       "",
       "",
       ""
      ],
      [
       "Freunden",
       "",
       "",
       ""
      ],
      [
       "Leuten, in die ich verknallt bin",
       "",
       "",
       ""
      ],
      [
       "Erwachsenen hier",
       "",
       "",
       ""
      ],
      [
       "Lehrern und Polizei",
       "",
       "",
       ""
      ],
      [
       "Fremden im Netz",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Mauer und offenes Tor schützen beide. **Und beide kosten etwas.**",
   "ziel": "Sehen, dass die eigene Grenze je nach Mensch anders ist.",
   "tipp": "Eine Mauer nicht „aufweichen“ wollen. Sie hatte einen Grund."
  },
  {
   "titel": "Auf drei!",
   "icon": "numbers",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Zettel zum Abdecken",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest einen Satz vor.",
    "Beide schreiben **verdeckt** eine Zahl: **0** kein Problem. **10** geht gar nicht.",
    "Auf drei: aufdecken.",
    "Bei großem Unterschied sagt jeder **einen Satz** dazu. Mehr nicht."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Zahl von **0** (kein Problem) bis **10** (geht gar nicht)",
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
       "liest meine Nachrichten mit",
       "",
       ""
      ],
      [
       "umarmt mich, ohne zu fragen",
       "",
       ""
      ],
      [
       "kommt ohne Klopfen in mein Zimmer",
       "",
       ""
      ],
      [
       "postet ein Foto von mir",
       "",
       ""
      ],
      [
       "nimmt mein Handy in die Hand",
       "",
       ""
      ],
      [
       "setzt sich ganz dicht neben mich",
       "",
       ""
      ],
      [
       "leiht sich etwas, ohne zu fragen",
       "",
       ""
      ],
      [
       "fragt mich nach Geld",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Grenzen sind bei jedem anders. **Darum muss man sie sagen.**",
   "ziel": "Erleben, dass auch Erwachsene Grenzen haben – und andere.",
   "tipp": "Ehrliche eigene Zahlen. Bei „ohne Klopfen ins Zimmer“ Farbe bekennen, wenn das im Haus vorkommt."
  },
  {
   "titel": "Chloé sagt „Klar“",
   "icon": "coins",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "chloe:verlegen",
   "schritte": [
    "Schaut euch Chloés Freitag an.",
    "Kreuz an: Welchen Satz hätte Chloé sagen können?",
    "Sag den Satz einmal **laut** – so, wie Chloé ihn sagen müsste."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:gift}</div><p>Chloé leiht alles her. Alle sagen: „Chloé ist die Netteste.“</p></div><div><div class=\"o\"><b>2</b>{i:coins}</div><p>Mila fragt zum dritten Mal nach 20 Euro. Chloé hat selbst nur 25.</p></div><div><div class=\"o\"><b>3</b>{i:message-circle}</div><p>Chloé sagt: „Klar.“</p></div><div><div class=\"o\"><b>4</b>{i:door}</div><p>Zu Hause tritt sie gegen die Schranktür.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Das hätte Chloé sagen können:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Nein.“",
        "„Diesmal nicht.“",
        "„Ich überleg’s mir und sag dir Bescheid.“",
        "„Zehn kann ich dir geben. Mehr nicht.“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Auf wen ist Chloé sauer?",
     "fragen": [
      {
       "f": "",
       "o": [
        "auf Mila",
        "auf sich selbst",
        "auf alle"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer immer Ja sagt, **zahlt selbst.**",
   "ziel": "Den Preis eines falschen Ja sehen – erst bei Chloé.",
   "tipp": "Den Satz wirklich laut sagen lassen, nicht nur ankreuzen. Sie sagen ihn auch."
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
     "titel": "Sozialexperiment: Wie viel Nähe verträgt der Mensch?",
     "kanal": "Quarks",
     "dauer": "die ersten 5 Min.",
     "url": "https://www.youtube.com/watch?v=wEALzPr7hBo",
     "frage": "Woran sieht man, dass es jemandem zu nah wird?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ich merke sofort, wenn mir jemand zu nah kommt.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich sage es dann auch.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Bei Freunden ist mir Nähe egal.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Manche merken nicht, dass sie zu nah sind.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Zu nah merkt man am Körper. **Bei sich – und bei anderen.**",
   "ziel": "Körpersignale bei anderen erkennen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Ohne Netz: Aktion auslassen."
  },
  {
   "titel": "Nein-Training",
   "icon": "hand-stop",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "",
   "bild": "chloe:neutral",
   "schritte": [
    "Dein Gegenüber bittet dich um etwas aus der Liste.",
    "Du sagst **„Nein.“** oder **„Diesmal nicht.“** Ohne Grund. Ohne Entschuldigung.",
    "Kreuz an: War es leicht oder schwer?",
    "Tauschen: Du fragst. Dein Gegenüber sagt Nein. Du sagst nur: **„Okay.“**"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "„Gibst du mir …“",
     "kopf": [
      "",
      "leicht",
      "schwer"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "… ein Kaugummi?",
       "",
       ""
      ],
      [
       "… deinen Stift?",
       "",
       ""
      ],
      [
       "… deinen Platz?",
       "",
       ""
      ],
      [
       "… kurz dein Handy?",
       "",
       ""
      ],
      [
       "… fünf Euro?",
       "",
       ""
      ],
      [
       "… deine Hausaufgaben?",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Ein Nein hören war für mich:",
     "fragen": [
      {
       "f": "",
       "o": [
        "leicht",
        "geht so",
        "schwer"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Ein Nein braucht keinen Grund. **Üben macht es leichter.**",
   "ziel": "Nein sagen und ein Nein annehmen – einmal gemacht, nicht nur besprochen.",
   "tipp": "Ein bisschen betteln ist erlaubt, Druck nicht. Das „Okay“ beim Tauschen ist die schwerere Hälfte."
  },
  {
   "titel": "Meine Regeln",
   "icon": "list-check",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Hier geht es um die Zeit mit deinem Gegenüber.",
    "Kreuz an: Welche **drei** Regeln sind dir wichtig?",
    "Dein Gegenüber sagt seine drei.",
    "Gebt euch die Hand drauf. Oder nickt. **Ab jetzt gilt es.**"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:door}<span>erst klopfen</span><i></i></div><div>{i:hand-off}<span>mich nicht anfassen</span><i></i></div><div>{i:device-mobile}<span>mein Handy ist meins</span><i></i></div><div>{i:clock}<span>pünktlich anfangen</span><i></i></div><div>{i:ear}<span>ausreden lassen</span><i></i></div><div>{i:message-off}<span>nicht über mich reden, ohne dass ich es weiß</span><i></i></div><div>{i:arrows-horizontal}<span>Abstand am Tisch</span><i></i></div><div>{i:player-pause}<span>Pause, wenn ich sie brauche</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Meine eigene Regel:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Wer seine Regeln sagt, **muss sie seltener verteidigen.**",
   "ziel": "Echte Absprachen für die Bezugszeit – sie gelten ab sofort.",
   "tipp": "Nur zusagen, was Sie halten können. Die Regeln beim nächsten Mal von sich aus einhalten und benennen."
  }
 ],
 "woche": {
  "titel": "Das kleinste Nein",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Sag diese Woche einmal Nein zu etwas fast Egalem – bei jemandem in deinem Alter.",
   "**Ohne Grund, ohne Entschuldigung.**",
   "Mach jeden Abend einen Strich, wo er passt."
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
      "Ich habe Nein gesagt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Ja gesagt – Nein gemeint",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Jemand hat mein Nein gehalten",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Ich habe ein Nein gehört",
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
      "titel": "Körper-Check",
      "icon": "activity",
      "text": "Bauch zieht sich zusammen?\nKiefer fest? Schritt zurück?\nDann ist es ein Nein."
     },
     {
      "titel": "Drei Sätze",
      "icon": "hand-stop",
      "text": "„Nein.“\n„Diesmal nicht.“\n„Ich überleg’s mir.“"
     }
    ]
   }
  ],
  "aha": "Ein kleines Nein ist Training für das große.",
  "ziel": "Eine Woche lang Ja und Nein zählen.",
  "tipp": "Beim nächsten Mal zuerst die Liste ansehen. Die Zeile „Ja gesagt – Nein gemeint“ ist die wichtigste."
 },
 "begleitungAktion": {
  "material": "Klebeband, Stifte, Handy",
  "achtung": "Das Thema kann Übergriffe berühren – eigene erlittene und eigene begangene. Nicht ausfragen, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt oder eine aktuelle Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Über eigene Grenzverletzungen ohne Beschämung sprechen: Es geht um den nächsten Moment. Bei „Die Linie“ gilt: Der Jugendliche bestimmt den Abstand, Berührung gehört nicht zur Übung.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #02 Grenzen."
 }
}

export const LEKTIONEN = []
