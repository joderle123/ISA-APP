// SOLO AKTION #10 · Null Bock – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a10.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-10",
 "kuerzel": "ak10",
 "nr": 10,
 "nrText": "#10",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #10",
 "fuss": "SOLO AKTION #10 · Null Bock",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-10-Null-Bock-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Null Bock",
  "fr": ""
 },
 "untertitel": {
  "de": "„Du könntest, wenn du wolltest“ hat noch keinem geholfen. Hier probierst du aus, wie Anfangen geht. Jede Aktion dauert 10 bis 15 Minuten. Dein Gegenüber macht immer mit.",
  "fr": ""
 },
 "farben": {
  "tief": "#A16F0D",
  "mittel": "#FFB21A",
  "zart": "#fff6e4",
  "dunkel": "#694808"
 },
 "deckbild": [
  "lio:gelangweilt:stehen"
 ],
 "blasen": [
  {
   "t": "Fünf Minuten",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:alarm}<span>Fünf Minuten</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:arrows-split}<span>Drei Sorten Nein</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:presentation}<span>Lio und das Referat</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:stack-2}<span>Der Stapel</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:cut}<span>Zerlegen</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:message-circle}<span>Der teure Satz</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:rocket}<span>Mein Start-Platz</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Fünf Minuten",
   "icon": "alarm",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Timer, eine echte Aufgabe",
   "bild": "lio:gelangweilt",
   "schritte": [
    "Nimm **eine echte Sache**, die du schiebst. Dein Gegenüber nimmt auch eine.",
    "Wette: Wie schlimm wird es? Kreis ein.",
    "Timer auf **5 Minuten.** Nur anfangen. Nicht fertig werden.",
    "Der Timer klingelt: **Aufhören ist erlaubt.**",
    "Kreis ein: Wie schlimm war es wirklich?"
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "So schlimm (0 gar nicht – 10 furchtbar):",
     "zeilen": [
      "meine Wette",
      "so war es"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Nach fünf Minuten habe ich:",
     "fragen": [
      {
       "f": "",
       "o": [
        "aufgehört",
        "weitergemacht"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Lust kommt nicht vorher. **Sie kommt, wenn du schon dran bist.**",
   "ziel": "Erleben, dass Anfangen weniger schlimm ist als die Vorstellung davon.",
   "tipp": "Selbst eine echte Schiebe-Sache mitbringen. Aufhören nach fünf Minuten ist bestanden – nicht überreden."
  },
  {
   "titel": "Drei Sorten Nein",
   "icon": "arrows-split",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Von außen sieht es gleich aus: Er macht es nicht.",
    "Von innen sind es **drei verschiedene Dinge.**",
    "Mach in jeder Zeile ein Kreuz. Oder keins, wenn es läuft.",
    "Dein Gegenüber kreuzt in einer anderen Farbe an."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Bei mir ist es:",
     "kopf": [
      "",
      "kann ich nicht",
      "will ich nicht",
      "trau mich nicht"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "pünktlich da sein",
       "",
       "",
       ""
      ],
      [
       "nachfragen, wenn ich etwas nicht verstehe",
       "",
       "",
       ""
      ],
      [
       "mit einer Aufgabe anfangen",
       "",
       "",
       ""
      ],
      [
       "vor anderen etwas sagen",
       "",
       "",
       ""
      ],
      [
       "für eine Arbeit lernen",
       "",
       "",
       ""
      ],
      [
       "um Hilfe bitten",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Drei Sorten Nein brauchen **drei verschiedene Lösungen.**",
   "ziel": "Können, Wollen und Trauen unterscheiden.",
   "tipp": "„Will ich nicht“ ist erlaubt. Fragen: „Was willst du stattdessen?“"
  },
  {
   "titel": "Lio und das Referat",
   "icon": "presentation",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "lio:traurig",
   "schritte": [
    "Schaut euch Lios drei Wochen an.",
    "Die Lehrerin schreibt: „Kein Interesse.“ Kreis ein: Stimmt das?",
    "Kreuz an: Was steckt hinter „egal“?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:presentation}</div><p>Lio hat drei Wochen Zeit für ein Referat.</p></div><div><div class=\"o\"><b>2</b>{i:hourglass}</div><p>Jeden Abend: erst essen, erst das Video, erst aufräumen.</p></div><div><div class=\"o\"><b>3</b>{i:message-circle}</div><p>Am Abend davor: „Ist mir eh egal. Ich bin halt dumm.“</p></div><div><div class=\"o\"><b>4</b>{i:bed}</div><p>Am Morgen ist ihm schlecht. Er bleibt zu Hause.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "„Kein Interesse.“ Stimmt das?",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "nein",
        "weiß nicht"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Hinter „egal“ steckt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Angst, es nicht zu schaffen",
        "Faulheit",
        "zu wenig Zeit"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer es nicht versucht, kann nicht scheitern. **„Egal“ ist ein Schutz.**",
   "ziel": "Hinter „egal“ die Angst vor dem Versagen sehen – erst bei Lio.",
   "tipp": "Den Satz „Du könntest, wenn du wolltest“ in keiner Form sagen."
  },
  {
   "titel": "Der Stapel",
   "icon": "stack-2",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Kreuz an: Was schiebst du gerade?",
    "Dein Gegenüber kreuzt seinen Stapel an.",
    "Kreis **die kleinste** Sache ein.",
    "Schreib auf: Was ist der **allererste Handgriff**? Zum Beispiel: Heft aufschlagen."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:book}<span>Hausaufgabe oder Lernen</span><i></i></div><div>{i:home}<span>Zimmer</span><i></i></div><div>{i:message-circle}<span>eine Nachricht beantworten</span><i></i></div><div>{i:calendar}<span>einen Termin machen</span><i></i></div><div>{i:file-text}<span>ein Formular</span><i></i></div><div>{i:user}<span>jemandem etwas sagen</span><i></i></div><div>{i:arrow-back-up}<span>etwas zurückgeben</span><i></i></div><div>{i:briefcase}<span>Praktikum oder Bewerbung</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Der allererste Handgriff:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Nicht „das Referat“. **Nur: Heft aufschlagen.**",
   "ziel": "Eine geschobene Sache auf den ersten Handgriff verkleinern.",
   "tipp": "Den eigenen Stapel ehrlich zeigen. Der Handgriff muss in einer Minute machbar sein."
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
     "titel": "Prokrastination – Warum schieben wir so viel auf?",
     "kanal": "Quarks Dimension Ralph",
     "dauer": "die ersten 5 Min.",
     "url": "https://www.youtube.com/watch?v=QNyKtYJ-e7Y",
     "frage": "Welcher Grund aus dem Video ist deiner?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ich schiebe auch Sachen, die mir wichtig sind.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Unter Druck bin ich am besten.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Aufschieben fühlt sich kurz gut an.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Erwachsene schieben genauso.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Du schiebst nicht die Aufgabe weg. **Du schiebst das miese Gefühl weg.**",
   "ziel": "Aufschieben als Umgang mit Gefühlen verstehen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Zerlegen",
   "icon": "cut",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "Stift",
   "bild": "lio:gelangweilt",
   "schritte": [
    "Lios Referat ist ein Berg. Hier sind seine **sechs kleinen Schritte.**",
    "Schreib Zahlen in die Kästchen: Was kommt zuerst?",
    "Kreis ein: Welcher Schritt dauert **unter fünf Minuten**?",
    "Dann: Zerleg deine eigene Sache in drei Schritte – mündlich."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Lios Schritte – in welcher Reihenfolge?",
     "kopf": [
      "",
      "Zahl"
     ],
     "breiten": [
      80,
      20
     ],
     "zeilen": [
      [
       "Thema aussuchen",
       ""
      ],
      [
       "die Lehrerin fragen, wie lang es sein soll",
       ""
      ],
      [
       "drei Sätze dazu suchen",
       ""
      ],
      [
       "ein Bild suchen",
       ""
      ],
      [
       "Stichworte auf einen Zettel",
       ""
      ],
      [
       "einmal laut üben",
       ""
      ]
     ]
    }
   ],
   "aha": "Ein Berg ist nur **viele kleine Schritte hintereinander.**",
   "ziel": "Große Aufgaben in machbare Schritte teilen.",
   "tipp": "Es gibt mehrere richtige Reihenfolgen. Wichtig ist nur: Der erste Schritt ist klein."
  },
  {
   "titel": "Der teure Satz",
   "icon": "message-circle",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Manchmal ist die Lösung ein Satz – der schwer zu sagen ist.",
    "Kreuz an, welchen du am ehesten sagen würdest.",
    "Probe: Dein Gegenüber spielt die Lehrerin oder den Meister. Sag den Satz. **Laut.**",
    "Tauschen: Dein Gegenüber sagt seinen Satz zu dir."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Mein Satz:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Ich kriege es nicht hin.“",
        "„Ich weiß nicht, wie ich anfangen soll.“",
        "„Können Sie es mir noch mal erklären?“",
        "„Kann ich einen Teil später abgeben?“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Den Satz zu sagen war:",
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
   "aha": "Der teuerste Satz im Moment. **Der billigste auf Dauer.**",
   "ziel": "Um Hilfe bitten – einmal laut geübt.",
   "tipp": "Als Lehrerin freundlich und kurz antworten. Den eigenen teuren Satz wirklich sagen."
  },
  {
   "titel": "Mein Start-Platz",
   "icon": "rocket",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "lio:stolz",
   "schritte": [
    "Anfangen ist leichter, wenn nichts im Weg liegt.",
    "Kreuz an: Was hilft **dir** beim Anfangen? Höchstens drei.",
    "Richte **eine** Sache jetzt gleich ein.",
    "Dein Gegenüber sagt, was ihm hilft."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:device-mobile-off}<span>Handy in einem anderen Zimmer</span><i></i></div><div>{i:table}<span>Tisch leer</span><i></i></div><div>{i:headphones}<span>Musik ohne Text</span><i></i></div><div>{i:users}<span>jemand sitzt dabei</span><i></i></div><div>{i:clock}<span>immer zur gleichen Uhrzeit</span><i></i></div><div>{i:glass}<span>erst trinken, dann los</span><i></i></div><div>{i:alarm}<span>Timer auf fünf Minuten</span><i></i></div><div>{i:list-check}<span>nur ein Schritt auf dem Zettel</span><i></i></div></div>"
    }
   ],
   "aha": "Du brauchst keinen starken Willen. **Du brauchst einen guten Start-Platz.**",
   "ziel": "Eigene Start-Hilfen kennen und eine davon sofort einrichten.",
   "tipp": "„Jemand sitzt dabei“ ist für viele das Wirksamste – anbieten, wenn es geht."
  }
 ],
 "woche": {
  "titel": "Dreimal fünf",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt, Timer",
  "bild": "",
  "schritte": [
   "Nimm die Sache, die du am meisten schiebst.",
   "Dreimal diese Woche: **genau fünf Minuten** – mit Timer.",
   "Danach darfst du aufhören. Mach ein Kreuz."
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
      "Fünf Minuten gemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "danach aufgehört",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "danach weitergemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "um Hilfe gebeten",
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
      "titel": "Fünf-Minuten-Deal",
      "icon": "alarm",
      "text": "Timer auf fünf Minuten.\nNur anfangen. Nicht fertig werden.\nKlingelt es: Aufhören ist erlaubt."
     },
     {
      "titel": "Kann, will, trau",
      "icon": "list-check",
      "text": "Kann ich es nicht? **Hilfe holen.**\nWill ich es nicht? **Was will ich stattdessen?**\nTrau ich mich nicht? **Was wäre das Schlimmste?**"
     }
    ]
   }
  ],
  "aha": "Wer nach fünf Minuten aufhört, **hat bestanden.**",
  "ziel": "Drei kurze Starts in einer Woche.",
  "tipp": "Nicht zählen, wie viel geschafft wurde. Nur: Wie oft angefangen?"
 },
 "begleitungAktion": {
  "material": "Timer, Stifte, Handy, eine echte Aufgabe",
  "achtung": "Schulvermeidung hat häufig Gründe, die mit Motivation nichts zu tun haben: Angst, Mobbing, depressive Verstimmung, Schlafmangel, Sorgen um die Lage zu Hause. Bei wochenlangem Fehlen, körperlichen Beschwerden vor der Schule oder Hinweisen auf Lern- und Aufmerksamkeitsstörungen fachliche Abklärung anregen. Druck und Strafen verschlimmern Vermeidung fast immer.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #10 Null Bock."
 }
}

export const LEKTIONEN = []
