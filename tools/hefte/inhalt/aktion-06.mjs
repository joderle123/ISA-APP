// SOLO AKTION #06 · Nachts – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a06.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-06",
 "kuerzel": "ak6",
 "nr": 6,
 "nrText": "#06",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #06",
 "fuss": "SOLO AKTION #06 · Nachts",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-06-Nachts-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Nachts",
  "fr": ""
 },
 "untertitel": {
  "de": "„Geh halt früher ins Bett“ hilft keinem. Hier probierst du aus, was wirklich etwas ändert. Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.",
  "fr": ""
 },
 "farben": {
  "tief": "#2676ED",
  "mittel": "#4D94FF",
  "zart": "#eaf2ff",
  "dunkel": "#194d9a"
 },
 "deckbild": [
  "nele:muede:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:moon}<span>Meine Nacht</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:clock-2}<span>Halb-drei-Gedanken</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:calculator}<span>Nele rechnet</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:bolt}<span>Wachmacher</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:sun}<span>Licht-Test</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:heartbeat}<span>Bremse finden</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:list-check}<span>Mein 20-Minuten-Plan</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Meine Nacht",
   "icon": "moon",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Stift",
   "bild": "nele:muede",
   "schritte": [
    "Jedes Kästchen ist eine Stunde der letzten Nacht.",
    "**Mal aus**, wann du geschlafen hast.",
    "Schreib **H**, wo du am Handy warst. Schreib **W**, wo du wach im Bett lagst.",
    "Dein Gegenüber füllt seine Zeile aus.",
    "Zählt die ausgemalten Kästchen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Uhr",
      "21",
      "22",
      "23",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8"
     ],
     "breiten": [
      26,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667,
      6.166666666666667
     ],
     "zeilen": [
      [
       "Du",
       "",
       "",
       "",
       "",
       "",
       "",
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
     "art": "mc",
     "auftrag": "Wer hat mehr geschlafen?",
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
    },
    {
     "art": "mc",
     "auftrag": "Wo sind bei mir die meisten W und H?",
     "fragen": [
      {
       "f": "",
       "o": [
        "am Anfang",
        "mitten in der Nacht",
        "am Morgen",
        "nirgends"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Im Bett sein und schlafen sind **zwei verschiedene Dinge.**",
   "ziel": "Die eigene Nacht sichtbar machen – ohne Bewertung.",
   "tipp": "Die eigene Nacht ehrlich eintragen, auch das Handy. Keine Zahl kommentieren."
  },
  {
   "titel": "Halb-drei-Gedanken",
   "icon": "clock-2",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest einen Gedanken vor.",
    "Erstes Kästchen: Wie wahr fühlt er sich **nachts** an? 0 bis 10.",
    "Zweites Kästchen: Wie wahr fühlt er sich **um zehn Uhr morgens** an?",
    "Schaut auf den Unterschied."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Zahl von **0** (stimmt nicht) bis **10** (stimmt total)",
     "kopf": [
      "",
      "nachts",
      "um zehn Uhr"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Ich schaffe das nie.“",
       "",
       ""
      ],
      [
       "„Keiner mag mich wirklich.“",
       "",
       ""
      ],
      [
       "„Mit mir stimmt etwas nicht.“",
       "",
       ""
      ],
      [
       "„Morgen wird schlimm.“",
       "",
       ""
      ],
      [
       "„Ich habe alles falsch gemacht.“",
       "",
       ""
      ],
      [
       "„Das wird nie besser.“",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Nachts ist das Thema echt. **Die Größe stimmt nicht.**",
   "ziel": "Erleben: Derselbe Gedanke wiegt nachts mehr.",
   "tipp": "Nicht fragen, worum es bei den Gedanken geht. Hohe Zahlen auch am Vormittag: siehe Achtung."
  },
  {
   "titel": "Nele rechnet",
   "icon": "calculator",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "nele:verwirrt",
   "schritte": [
    "Schaut euch Neles Nacht an.",
    "Kreuz an: Was hält Nele wach?",
    "Kreis ein: Welche Nele hat recht?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:bed}</div><p>23:30 Uhr. Nele liegt im Bett.</p></div><div><div class=\"o\"><b>2</b>{i:calculator}</div><p>1 Uhr. Sie rechnet: noch fünfeinhalb Stunden.</p></div><div><div class=\"o\"><b>3</b>{i:cloud-storm}</div><p>2:30 Uhr. „Den Abschluss schaffe ich nie.“</p></div><div><div class=\"o\"><b>4</b>{i:sun}</div><p>10 Uhr. „Das war übertrieben.“</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Das hält Nele wach:",
     "fragen": [
      {
       "f": "",
       "o": [
        "auf die Uhr schauen",
        "rechnen",
        "grübeln",
        "das Bett"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Welche Nele hat recht?",
     "fragen": [
      {
       "f": "",
       "o": [
        "die von halb drei",
        "die von zehn Uhr",
        "beide ein bisschen"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer nachts rechnet, bleibt wach. **Dreh die Uhr um.**",
   "ziel": "An Nele sehen, wie Grübeln und Rechnen wach halten.",
   "tipp": "„Beide ein bisschen“ ist die beste Antwort – das Thema kann echt sein."
  },
  {
   "titel": "Wachmacher",
   "icon": "bolt",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Denk an die **letzte Stunde** vor dem Schlafen.",
    "Kreuz an, was bei dir vorkommt.",
    "Dein Gegenüber kreuzt in einer anderen Farbe an.",
    "Jeder kreist **eine** Sache ein, die er heute Abend weglässt."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:device-mobile}<span>Handy im Bett</span><i></i></div><div>{i:bottle}<span>Energy oder Cola</span><i></i></div><div>{i:device-gamepad-2}<span>zocken</span><i></i></div><div>{i:message-2}<span>Streit oder Stress im Chat</span><i></i></div><div>{i:bulb}<span>helles Licht</span><i></i></div><div>{i:tools-kitchen-2}<span>spät und viel essen</span><i></i></div><div>{i:book}<span>lernen im Bett</span><i></i></div><div>{i:zzz}<span>langer Mittagsschlaf</span><i></i></div></div>"
    }
   ],
   "aha": "Du musst nicht alles ändern. **Eine Sache reicht für den Anfang.**",
   "ziel": "Einen eigenen Wachmacher finden und einen Abend weglassen.",
   "tipp": "Selbst etwas einkreisen und nächstes Mal ehrlich berichten."
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
     "titel": "6 oder 9 Uhr? Warum wir zur falschen Zeit aufstehen!",
     "kanal": "Quarks",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=kY5rFRU8A1c",
     "frage": "Bist du eher früh oder spät gebaut?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ich bin ein Nachtmensch.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Morgens bin ich zu nichts zu gebrauchen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Am Wochenende schlafe ich ganz anders.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Mein Alltag passt zu meiner inneren Uhr.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Dass du abends spät müde wirst, ist Biologie. **Kein Charakterfehler.**",
   "ziel": "Die innere Uhr kennen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Licht-Test",
   "icon": "sun",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Kreis ein: Wie wach bist du **jetzt**?",
    "Geht zusammen **fünf Minuten raus** ans Tageslicht. Ohne Handy.",
    "Zurück. Kreis ein: Wie wach bist du **danach**?"
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "So wach bin ich (0 schlafe gleich ein – 10 hellwach):",
     "zeilen": [
      "vorher",
      "nachher"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Mein Gegenüber ist danach:",
     "fragen": [
      {
       "f": "",
       "o": [
        "wacher",
        "gleich",
        "müder"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Tageslicht stellt deine innere Uhr. **Zehn Minuten am Morgen wirken wie ein Wecker von innen.**",
   "ziel": "Die Wirkung von Tageslicht selbst spüren.",
   "tipp": "Wirklich rausgehen, auch bei Regen. Fenster reicht nicht."
  },
  {
   "titel": "Bremse finden",
   "icon": "heartbeat",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Uhr mit Sekunden",
   "bild": "",
   "schritte": [
    "Zähl deinen Puls: **15 Sekunden.** Zwei Finger an den Hals.",
    "Zwei Minuten atmen: **4 Sekunden ein, 6 Sekunden aus.** Dein Gegenüber zählt laut.",
    "Zähl den Puls noch einmal.",
    "Tauschen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Schläge in 15 Sek.",
      "vorher",
      "nach 2 Min. Atmen"
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
   "aha": "Lang ausatmen bremst den Körper. **Oft kannst du das sogar messen.**",
   "ziel": "Eine Bremse kennen, die man im Bett benutzen kann.",
   "tipp": "Ruhig und gleichmäßig zählen. Wem schwindlig wird: normal weiteratmen."
  },
  {
   "titel": "Mein 20-Minuten-Plan",
   "icon": "list-check",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "nele:muede",
   "schritte": [
    "Die Regel: Wer **20 Minuten** wach liegt, steht auf. Oder setzt sich im Bett auf.",
    "Kreuz an: Was Langweiliges machst du dann? Kein Handy.",
    "Leg es heute Abend **neben dein Bett.**",
    "Schreib deine Aufstehzeit auf. Jeden Tag ungefähr gleich."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:headphones}<span>Hörbuch ohne Bildschirm</span><i></i></div><div>{i:book}<span>ein langweiliges Buch</span><i></i></div><div>{i:puzzle}<span>Rätselheft</span><i></i></div><div>{i:pencil}<span>kritzeln</span><i></i></div><div>{i:glass}<span>Wasser trinken</span><i></i></div><div>{i:window}<span>aus dem Fenster schauen</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Ich stehe jeden Tag auf um:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Wann du einschläfst, kannst du nicht steuern. **Wann du aufstehst, schon.**",
   "ziel": "Ein fertiger Plan für wache Nächte und eine feste Aufstehzeit.",
   "tipp": "Vorher mit der Wohngruppe oder Familie klären, ob nachts aufstehen erlaubt ist. Sonst: im Bett aufsetzen."
  }
 ],
 "woche": {
  "titel": "Sieben Nächte",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Mach jeden Morgen deine Kreuze.",
   "Nur ankreuzen, was stimmt. **Leere Kästchen sind okay.**",
   "Wette vorher: An wie vielen Tagen schläfst du „okay“?"
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
      "zur gleichen Zeit aufgestanden",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "10 Minuten Tageslicht am Morgen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Wachmacher weggelassen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "20-Minuten-Plan benutzt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "okay geschlafen",
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
      "titel": "Nachts gilt",
      "icon": "moon",
      "text": "Nach Mitternacht nichts entscheiden.\nDas Thema ist echt, die Größe nicht.\nUm zehn Uhr noch mal prüfen."
     },
     {
      "titel": "Mein Anker",
      "icon": "sunrise",
      "text": "Jeden Tag gleich aufstehen:\n**Um:** ________________\nDanach zehn Minuten ans Licht."
     }
    ]
   }
  ],
  "aha": "Schlaf ändert sich langsam. **Zähl die Woche, nicht die Nacht.**",
  "ziel": "Eine Woche lang die eigenen Stellschrauben zählen.",
  "tipp": "Beim nächsten Mal nur fragen: Welche Zeile war am leichtesten?"
 },
 "begleitungAktion": {
  "material": "Uhr, Stifte, Handy",
  "achtung": "Schlaflosigkeit ist bei belasteten Jugendlichen häufig mit Albträumen, nächtlicher Angst oder früheren Erfahrungen verbunden, bei denen die Nacht nicht sicher war. Nicht ausfragen. Bei anhaltender Schlaflosigkeit, Albträumen oder nächtlichen Suizidgedanken ärztliche oder therapeutische Abklärung veranlassen und die zuständige Leitung (Responsable) einbeziehen. Schlafmittel sind kein Thema dieser Aktionen.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #06 Nachts."
 }
}

export const LEKTIONEN = []
