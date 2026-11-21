// SOLO AKTION #17 · Körper – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a17.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-17",
 "kuerzel": "ak17",
 "nr": 17,
 "nrText": "#17",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #17",
 "fuss": "SOLO AKTION #17 · Körper",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-17-Koerper-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Körper",
  "fr": ""
 },
 "untertitel": {
  "de": "Hier sagt dir niemand, wie du aussiehst. Hier kommt kein Gewicht vor, keine Größe, keine Kalorie. Du probierst aus, wer wirklich hinschaut – und was dein Feed mit dir macht.",
  "fr": ""
 },
 "farben": {
  "tief": "#8D780B",
  "mittel": "#FFD60A",
  "zart": "#fffae2",
  "dunkel": "#5c4e07"
 },
 "deckbild": [
  "sami:verlegen:stehen"
 ],
 "blasen": [
  {
   "t": "Benutzen statt prüfen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:focus-2}<span>Der Scheinwerfer</span><small>15 Min.</small><i></i></div><div><b>2</b>{i:run}<span>Benutzen</span><small>12 Min.</small><i></i></div><div><b>3</b>{i:swimming}<span>Sami im Schwimmbad</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:chart-dots}<span>Feed zählen</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:camera}<span>Das beste Schuh-Foto</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:ban}<span>Was ich lasse</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:user-minus}<span>Drei weg</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Der Scheinwerfer",
   "icon": "focus-2",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "Klebezettel",
   "bild": "sami:nervoes",
   "schritte": [
    "Kleb dir einen bunten Zettel an den Ärmel. Dein Gegenüber auch.",
    "Wette: Wie viele von **fünf Leuten** merken es?",
    "Geht zusammen durchs Haus. An fünf Leuten vorbei.",
    "Zählt: Wer hat geschaut oder etwas gesagt?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "von 5 Leuten",
      "meine Wette",
      "wirklich gemerkt"
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
     "auftrag": "Es haben gemerkt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "mehr als gedacht",
        "so viele wie gedacht",
        "weniger als gedacht"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Du fühlst dich wie im Scheinwerfer. **Kaum jemand schaut so genau hin wie du selbst.**",
   "ziel": "Am eigenen Versuch erleben: Andere bemerken viel weniger.",
   "tipp": "Selbst mitmachen. Niemanden vorwarnen. Wer nicht durchs Haus will: Hosenbein hochkrempeln und in einen einzigen Raum gehen."
  },
  {
   "titel": "Benutzen",
   "icon": "run",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "Papier, Uhr, Papierkorb",
   "bild": "",
   "schritte": [
    "Drei kleine Wettkämpfe. Dein Gegenüber macht mit.",
    "**Auf einem Bein stehen** – wie viele Sekunden?",
    "**Zehn Papierkugeln** in den Korb – wie viele Treffer?",
    "**Papierflieger** – wie viele Schritte weit?",
    "Danach ein Kreis: Wie oft hast du dabei an dein Aussehen gedacht?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "ein Bein (Sek.)",
      "Treffer von 10",
      "Flieger (Schritte)"
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
    },
    {
     "art": "mc",
     "auftrag": "An mein Aussehen habe ich gedacht:",
     "fragen": [
      {
       "f": "",
       "o": [
        "gar nicht",
        "kurz",
        "die ganze Zeit"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer seinen Körper **benutzt**, hat weniger Zeit, ihn zu prüfen.",
   "ziel": "Den Körper als Werkzeug erleben, nicht als Bild.",
   "tipp": "Es geht um Spaß, nicht um Leistung. Verlieren Sie ruhig. Den Körper des Jugendlichen nie kommentieren – auch nicht lobend."
  },
  {
   "titel": "Sami im Schwimmbad",
   "icon": "swimming",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "sami:verlegen",
   "schritte": [
    "Schaut euch Samis Sommer an.",
    "Kreuz an: Was lässt Sami wegen seines Aussehens?",
    "Kreis ein: Was würde sich ändern, wenn er aussähe wie im Video?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:swimming}</div><p>Im Schwimmbad ist Sami der Lauteste – und der Einzige im T-Shirt.</p></div><div><div class=\"o\"><b>2</b>{i:device-mobile}</div><p>Zu Hause schaut er Videos von Typen mit Bauchmuskeln.</p></div><div><div class=\"o\"><b>3</b>{i:tools-kitchen-2}</div><p>Beim Essen ist er als Erster fertig: „Kein Hunger.“</p></div><div><div class=\"o\"><b>4</b>{i:message-circle}</div><p>Seine Schwester sagt: „Du bist doch ganz normal.“ Das Wort hasst er.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Das lässt Sami:",
     "fragen": [
      {
       "f": "",
       "o": [
        "schwimmen ohne T-Shirt",
        "in Ruhe essen",
        "Videos schauen"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Sähe er aus wie im Video, wäre:",
     "fragen": [
      {
       "f": "",
       "o": [
        "alles anders",
        "ein bisschen anders",
        "fast nichts anders"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Sami glaubt, alle schauen auf seinen Bauch. **Sie schauen auf den Lautesten im Becken.**",
   "ziel": "An Sami sehen, was der eigene Blick kostet.",
   "tipp": "Nicht sagen „Sami sieht doch gut aus“ – das ist der Satz der Schwester."
  },
  {
   "titel": "Feed zählen",
   "icon": "chart-dots",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "",
   "schritte": [
    "Öffne deinen Feed. Kein Handy hier? Nimm das von deinem Gegenüber.",
    "Zähl die nächsten **20 Bilder mit Menschen.**",
    "Strich links: sieht aus wie Leute, die ich kenne. Strich rechts: sieht aus wie niemand, den ich kenne.",
    "Dein Gegenüber zählt in seinem Feed."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "20 Bilder",
      "wie Leute, die ich kenne",
      "wie niemand, den ich kenne"
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
    }
   ],
   "aha": "Dein Feed zeigt Leute, **die es in deinem Leben nicht gibt.** Mit denen vergleichst du dich.",
   "ziel": "Sehen, wie verzerrt die Vergleichsgruppe ist.",
   "tipp": "Nicht aufs Handy schauen. Nur die Striche zählen."
  },
  {
   "titel": "Das beste Schuh-Foto",
   "icon": "camera",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "sami:aufgeregt",
   "schritte": [
    "Mach ein Foto von deinem Schuh. Einfach so.",
    "Jetzt mach **das beste Schuh-Foto der Welt:** Licht, Winkel, Filter. So viele Versuche, wie du willst.",
    "Legt das erste und das beste Foto nebeneinander.",
    "Dein Gegenüber macht es mit seinem Schuh."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "So viele Versuche habe ich gebraucht:",
     "fragen": [
      {
       "f": "",
       "o": [
        "1–3",
        "4–10",
        "mehr als 10"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das erste und das beste Foto sind:",
     "fragen": [
      {
       "f": "",
       "o": [
        "fast gleich",
        "ziemlich anders",
        "ein anderer Schuh"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Was du im Netz siehst, ist **das beste von sehr vielen Fotos.** Bei Schuhen. Und bei Körpern.",
   "ziel": "Die Tricks selbst anwenden – an einem harmlosen Gegenstand.",
   "tipp": "Ausdrücklich kein Selfie, kein Foto vom Körper. Der Schuh reicht."
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
     "titel": "Schönheitswahn im Netz: Schlechter Einfluss durch Influencer?",
     "kanal": "ARD GESUND",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=S-i0TGztH0Y",
     "frage": "Welche Accounts machen das mit dir?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Bilder im Netz sind bearbeitet. Das weiß ich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Sie wirken trotzdem auf mich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Das betrifft nur Mädchen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich folge Accounts, nach denen es mir schlechter geht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Der Vergleich ist gezinkt. **Er wirkt trotzdem – auch wenn du es weißt.**",
   "ziel": "Wissen und Wirkung auseinanderhalten.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Jungen betrifft es genauso."
  },
  {
   "titel": "Was ich lasse",
   "icon": "ban",
   "zeit": "10 Min.",
   "wer": "allein",
   "material": "",
   "bild": "",
   "schritte": [
    "**Keiner schaut mit.**",
    "Kreuz an: Was lässt du wegen deines Aussehens?",
    "Zweites Kreuz: Was davon würdest du gern **wieder machen**?",
    "Du entscheidest, ob du etwas davon sagst."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Wegen meines Aussehens:",
     "kopf": [
      "",
      "lasse ich",
      "würde ich gern wieder"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "schwimmen gehen",
       "",
       ""
      ],
      [
       "Fotos von mir zulassen",
       "",
       ""
      ],
      [
       "vor anderen essen",
       "",
       ""
      ],
      [
       "bestimmte Sachen anziehen",
       "",
       ""
      ],
      [
       "Sport mit anderen",
       "",
       ""
      ],
      [
       "jemanden ansprechen",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Was würdest du machen, wenn es dir einen Tag egal wäre? **Fang mit dem Kleinsten an.**",
   "ziel": "Sehen, was der Blick auf sich selbst im Alltag kostet.",
   "tipp": "Wirklich wegschauen. Ein Kreuz bei „vor anderen essen“, von dem Sie erfahren: siehe Achtung."
  },
  {
   "titel": "Drei weg",
   "icon": "user-minus",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "",
   "schritte": [
    "Such **drei Accounts**, nach denen du dich schlechter fühlst.",
    "Entfolge ihnen. **Nur für eine Woche.** Danach kannst du zurück.",
    "Folge einem Account, bei dem Leute etwas **machen**: Sport, Musik, Bauen, Kochen.",
    "Dein Gegenüber räumt seinen Feed auch auf."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Entfolgt habe ich:",
     "fragen": [
      {
       "f": "",
       "o": [
        "0",
        "1",
        "2",
        "3"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Neu dazu:",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "noch nichts gefunden"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Mein Gegenüber hat entfolgt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "0",
        "1",
        "2",
        "3"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Dein Feed ist kein Schicksal. **Du baust ihn selbst.**",
   "ziel": "Den eigenen Feed sofort verändern.",
   "tipp": "Nicht fragen, welche Accounts es sind. Selbst wirklich drei entfolgen."
  }
 ],
 "woche": {
  "titel": "Eine Sache trotzdem",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Such dir **die kleinste Sache** aus, die du wegen deines Aussehens lässt.",
   "Mach sie diese Woche einmal.",
   "Mach jeden Abend deine Kreuze."
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
      "etwas gemacht, das ich sonst lasse",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Körper benutzt: laufen, tanzen, Sport",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Spiegel: kurzer Blick, keine Fehlersuche",
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
      "titel": "Benutzen statt prüfen",
      "icon": "run",
      "text": "Was hat mein Körper heute für mich gemacht?\nHeute hat er mich getragen. Das reicht.\nEr muss mich tragen, nicht gefallen."
     },
     {
      "titel": "Spiegel-Regel",
      "icon": "eye",
      "text": "Ein kurzer Blick reicht.\nKeine Suche nach Fehlern.\nKaum jemand schaut so genau hin wie ich."
     }
    ]
   }
  ],
  "aha": "Jedes Mal, wenn du es trotzdem machst, **wird der Scheinwerfer schwächer.**",
  "ziel": "Eine vermiedene Sache einmal tun.",
  "tipp": "Nicht fragen, was es war. Fragen: „Hat es jemand gemerkt?“"
 },
 "begleitungAktion": {
  "material": "Klebezettel, Papier, Papierkorb, Uhr, beide Handys",
  "achtung": "Warnzeichen für eine Essstörung ernst nehmen: deutliche Gewichtsveränderung, starre Essensregeln, Auslassen von Mahlzeiten, Erbrechen, übermäßiger Sport, Rückzug beim Essen. Dann zeitnah ärztliche und kinder- und jugendpsychiatrische Abklärung veranlassen – Essstörungen können lebensbedrohlich werden. Hinweise auf Selbstverletzung ruhig aufgreifen und nach dem Verfahren der Einrichtung handeln. Den Körper des Jugendlichen nie kommentieren, auch nicht lobend; keine Zahlen zu Gewicht, Größe oder Essen; keine Fotos vom Körper. Unwohlsein mit dem Körper kann mit Fragen der Geschlechtsidentität zu tun haben: respektvoll zuhören und bei Bedarf an eine Fachstelle vermitteln.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #17 Körper."
 }
}

export const LEKTIONEN = []
