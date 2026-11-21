// SOLO AKTION #03 · Scrollen – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a03.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-03",
 "kuerzel": "ak3",
 "nr": 3,
 "nrText": "#03",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #03",
 "fuss": "SOLO AKTION #03 · Scrollen",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-03-Scrollen-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Scrollen",
  "fr": ""
 },
 "untertitel": {
  "de": "Keiner nimmt dir hier das Handy weg. Wir schauen nach, was es mit dir macht – und mit deinem Gegenüber. Jede Aktion dauert 10 bis 15 Minuten.",
  "fr": ""
 },
 "farben": {
  "tief": "#108960",
  "mittel": "#2EE6A8",
  "zart": "#e6fcf5",
  "dunkel": "#0a593e"
 },
 "deckbild": [
  "mia:muede:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:chart-bar}<span>Die Daten</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:device-mobile}<span>Fünf Minuten Feed</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:hand-finger}<span>Hand-Zähler</span><small>12 Min.</small><i></i></div><div><b>4</b>{i:help-circle}<span>Wofür eigentlich?</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:moon}<span>Mia, 1:20 Uhr</span><small>10 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:contrast}<span>Grau stellen</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:flag}<span>Mein Ende</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Die Daten",
   "icon": "chart-bar",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "mia:muede",
   "schritte": [
    "Erst **schätzen**: Wie lange warst du gestern am Handy?",
    "Dann nachschauen: Einstellungen → „Bildschirmzeit“ oder „Digitales Wohlbefinden“.",
    "Zeigen muss keiner. **Sagen reicht.**",
    "Gewonnen hat, wer näher an seiner Schätzung liegt."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Gestern",
      "geschätzt",
      "gemessen",
      "so oft entsperrt"
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
     "auftrag": "Wer kennt sich selbst besser?",
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
   "aha": "Es zählt nicht, wer weniger scrollt. **Es zählt, wer sich kennt.**",
   "ziel": "Eigene Nutzung ehrlich ansehen – ohne Bewertung.",
   "tipp": "Die eigene Zahl zuerst nennen. Keine Zahl kommentieren, auch nicht mit dem Gesicht."
  },
  {
   "titel": "Fünf Minuten Feed",
   "icon": "device-mobile",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys, Timer",
   "bild": "",
   "schritte": [
    "Kreis ein: deine Laune **jetzt**.",
    "Timer auf **5 Minuten**. Beide scrollen.",
    "Stopp. Handy umdrehen. Kreis ein: deine Laune **danach**.",
    "Nenn drei Dinge, die du gerade gesehen hast."
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "Meine Laune (0 mies – 10 super):",
     "zeilen": [
      "vorher",
      "nachher"
     ]
    },
    {
     "art": "mc",
     "auftrag": "So viele Dinge wusste ich noch:",
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
     "auftrag": "Laune von meinem Gegenüber:",
     "fragen": [
      {
       "f": "",
       "o": [
        "besser",
        "gleich",
        "schlechter"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Fünf Minuten Feed – und oft bleibt **fast nichts** hängen. Außer der Laune.",
   "ziel": "Die Wirkung direkt messen statt darüber zu reden.",
   "tipp": "Selbst mitscrollen und die eigene Zahl ehrlich sagen."
  },
  {
   "titel": "Hand-Zähler",
   "icon": "hand-finger",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "beide Handys, ein Spiel oder Würfel",
   "bild": "mia:nervoes",
   "schritte": [
    "Beide Handys liegen in der Mitte. Bildschirm nach unten. Ton an.",
    "Spielt zehn Minuten etwas: Karten, Würfel, Tic-Tac-Toe.",
    "Jedes Mal, wenn deine Hand zum Handy **will**: ein Strich.",
    "Anfassen gilt als fünf Striche."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Striche",
      "Meine Hand wollte hin",
      "Angefasst"
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
   "aha": "Die Hand ist schneller als der Kopf. **Das ist Gewohnheit – kein schwacher Wille.**",
   "ziel": "Den Griff zum Handy als Reflex bemerken.",
   "tipp": "Das eigene Handy wirklich dazulegen. Wer mehr Striche hat, hat nicht verloren – er hat genauer gezählt."
  },
  {
   "titel": "Wofür eigentlich?",
   "icon": "help-circle",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Kreuz an: **Wofür** nimmst du das Handy?",
    "Streich durch, wobei es **nicht** hilft.",
    "Dein Gegenüber macht es mit einer anderen Farbe."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:mood-empty}<span>Langeweile</span><i></i></div><div>{i:users}<span>nicht allein sein</span><i></i></div><div>{i:wind}<span>runterkommen</span><i></i></div><div>{i:bell}<span>nichts verpassen</span><i></i></div><div>{i:moon}<span>einschlafen</span><i></i></div><div>{i:bolt}<span>Stress vergessen</span><i></i></div><div>{i:message-circle}<span>mit Leuten reden</span><i></i></div><div>{i:search}<span>etwas wissen wollen</span><i></i></div></div>"
    }
   ],
   "aha": "Oft geht es nicht ums Handy. **Es geht um das Gefühl davor.**",
   "ziel": "Die Funktion des Handys erkennen.",
   "tipp": "Auch selbst durchstreichen. „Einschlafen“ ist bei den meisten Erwachsenen durchgestrichen."
  },
  {
   "titel": "Mia, 1:20 Uhr",
   "icon": "moon",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "mia:traurig",
   "schritte": [
    "Schaut euch Mias Nacht an.",
    "Kreuz an: Warum hilft Mia ihr Wissen nicht?",
    "Kreis ein: Kennst du das?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:clock}</div><p>23 Uhr. Mia will nur kurz schauen.</p></div><div><div class=\"o\"><b>2</b>{i:photo}</div><p>300 Leute. Alle schöner. Alle mit mehr Freunden.</p></div><div><div class=\"o\"><b>3</b>{i:bulb}</div><p>Mia weiß: Das ist alles gestellt.</p></div><div><div class=\"o\"><b>4</b>{i:mood-sad}</div><p>1:20 Uhr. Sie fühlt sich trotzdem mies.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Warum hilft das Wissen nicht?",
     "fragen": [
      {
       "f": "",
       "o": [
        "Das Gefühl ist schneller als der Gedanke.",
        "Mia ist zu dumm.",
        "Die Bilder sind doch echt."
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Kennst du das?",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "manchmal",
        "nein"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "„Ist gestellt“ kommt eine Sekunde zu spät. **Das Gefühl ist schon da.**",
   "ziel": "Verstehen, warum Vergleiche wirken, obwohl man es besser weiß.",
   "tipp": "Nicht trösten („Du bist doch auch hübsch“). Nur fragen: Bei welchen Accounts passiert das?"
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
     "titel": "Social Media: Warum kann ich nicht aufhören mit Binge-Scrolling?",
     "kanal": "Quarks Dimension Ralph",
     "dauer": "die ersten 5 Min.",
     "url": "https://www.youtube.com/watch?v=_V_VBrW3ZuY",
     "frage": "Welcher Trick wirkt bei dir am besten?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ich höre auf, wann ich will.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Apps sind gebaut, damit ich bleibe.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Mich nervt mein Scrollen selbst.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Erwachsene scrollen genauso viel.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Die App ist gebaut, damit du bleibst. **Das ist ihr Job.**",
   "ziel": "Die Bauweise der Apps kennen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Grau stellen",
   "icon": "contrast",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "",
   "schritte": [
    "Öffnet die Einstellungen. Sucht nach **„Graustufen“**.",
    "Schaltet das Handy auf Schwarz-Weiß.",
    "Zwei Minuten scrollen – in Grau.",
    "Kreis ein: Wie spannend war es?",
    "Entscheide: Wie lange bleibt es grau?"
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "So spannend ist mein Feed (0–10):",
     "zeilen": [
      "in Farbe",
      "in Grau"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Es bleibt grau:",
     "fragen": [
      {
       "f": "",
       "o": [
        "bis heute Abend",
        "bis morgen",
        "drei Tage",
        "gar nicht"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Farbe ist ein Köder. **Ohne Farbe zieht es bei vielen weniger.**",
   "ziel": "Einen Köder selbst ausschalten und den Unterschied sehen.",
   "tipp": "Vorher am eigenen Handy ausprobieren, wo die Einstellung ist. Geht es nicht: Lieblings-App vom Startbildschirm nehmen."
  },
  {
   "titel": "Mein Ende",
   "icon": "flag",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Handy",
   "bild": "",
   "schritte": [
    "Ein Buch hat eine letzte Seite. Der Feed nicht.",
    "Kreuz an: Welches **Ende** baust du dir?",
    "Mach es **jetzt**: Wecker stellen, App verschieben, Kabel umstecken.",
    "Dein Gegenüber baut sich auch eins."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:alarm}<span>Wecker: nach 20 Minuten Schluss</span><i></i></div><div>{i:music}<span>drei Lieder lang – dann weg</span><i></i></div><div>{i:home}<span>App runter vom Startbildschirm</span><i></i></div><div>{i:plug}<span>Ladekabel weit weg vom Bett</span><i></i></div><div>{i:door}<span>Handy nachts in ein anderes Zimmer</span><i></i></div><div>{i:bell-off}<span>Mitteilungen aus</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Gemacht – und zwar das:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Der Feed hört nicht auf. **Also baust du das Ende selbst.**",
   "ziel": "Eine konkrete Stopp-Stelle einrichten – sofort, nicht „irgendwann“.",
   "tipp": "Regeln der Einrichtung (Handy abgeben) nicht als eigene Idee des Jugendlichen verkaufen. Er wählt selbst."
  }
 ],
 "woche": {
  "titel": "Die Sekunde davor",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Wenn du zum Handy greifst: kurz stoppen.",
   "Was war gerade los? Mach **danach** einen Strich.",
   "Fünf Striche am Tag reichen."
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
      "leer oder langweilig",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "allein",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "gestresst",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ich wollte wirklich etwas",
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
      "titel": "Die Sekunde davor",
      "icon": "player-pause",
      "text": "Die Hand geht zum Handy.\nKurz stoppen: Was fühle ich?\nLeer, allein, gestresst – oder will ich etwas?"
     },
     {
      "titel": "Mein Ende",
      "icon": "flag",
      "text": "Der Feed hat kein Ende. Ich baue eins:\n**Schluss bei:** ________________\n**Danach:** ________________"
     }
    ]
   }
  ],
  "aha": "Die Zeile mit den meisten Strichen zeigt, **was dir wirklich fehlt.**",
  "ziel": "Das Gefühl vor dem Griff zum Handy zählen.",
  "tipp": "Selbst mitzählen und die eigene Liste mitbringen."
 },
 "begleitungAktion": {
  "material": "beide Handys, Timer, Würfel oder Karten",
  "achtung": "In den Daten oder im Gespräch können Cybermobbing, Druck im Chat oder Kontakte zu Erwachsenen sichtbar werden. Dann das Thema wechseln und ernst nehmen; bei Erpressung, sexuellen Übergriffen oder Selbstgefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Keine Diagnose stellen und keine Handyregeln im Namen Dritter aushandeln. Beratung bei Cybermobbing und Erpressung im Netz: BEE SECURE Helpline 8002 1234; bei akuter Gefahr Polizei 113.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #03 Scrollen."
 }
}

export const LEKTIONEN = []
