// SOLO AKTION #08 · Allein – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a08.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-08",
 "kuerzel": "ak8",
 "nr": 8,
 "nrText": "#08",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #08",
 "fuss": "SOLO AKTION #08 · Allein",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-08-Allein-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Allein",
  "fr": ""
 },
 "untertitel": {
  "de": "Viele Leute um sich haben und trotzdem allein sein – das kennen mehr, als du denkst. Hier übst du die kleinen Schritte. Jede Aktion dauert 10 bis 15 Minuten.",
  "fr": ""
 },
 "farben": {
  "tief": "#128693",
  "mittel": "#2FD3E6",
  "zart": "#e6fafc",
  "dunkel": "#0c5760"
 },
 "deckbild": [
  "amira:neutral:stehen"
 ],
 "blasen": [
  {
   "t": "Zum Machen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:target}<span>Mein Kreis</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:address-book}<span>Kontakte-Check</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:message-question}<span>Amira sagt „Mal sehen“</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:mood-neutral}<span>Gesichter raten</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:messages}<span>Eine Frage zurück</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:send}<span>Eine Nachricht</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:zoom-question}<span>Sicher oder vermutet?</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Mein Kreis",
   "icon": "target",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Stift",
   "bild": "",
   "schritte": [
    "Der Punkt in der Mitte bist du.",
    "Schreib **Anfangsbuchstaben** in die Ringe. Tiere und Leute aus dem Netz zählen.",
    "Mach einen **Pfeil** an jemanden, den du gern näher hättest.",
    "Dein Gegenüber zeichnet seinen Kreis auf ein eigenes Blatt."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-ringe\"><svg viewBox=\"0 0 200 200\"><circle cx=\"100\" cy=\"100\" r=\"97\" fill=\"#fff\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><circle cx=\"100\" cy=\"100\" r=\"66\" fill=\"var(--f-zart)\" stroke=\"currentColor\" stroke-width=\"1.4\"/><circle cx=\"100\" cy=\"100\" r=\"34\" fill=\"var(--f-mittel)\" stroke=\"currentColor\" stroke-width=\"1.4\"/><circle cx=\"100\" cy=\"100\" r=\"5\" fill=\"currentColor\"/></svg><div class=\"w\"><div><b>innen</b><span>Darf fast alles wissen.</span></div><div><b>Mitte</b><span>Mit denen ist es gut.</span></div><div><b>außen</b><span>Sind einfach da.</span></div></div></div>"
    }
   ],
   "aha": "Ein Mensch im inneren Ring ist mehr wert als zwanzig außen.",
   "ziel": "Das eigene Netz sehen – und einen Wunsch markieren.",
   "tipp": "Wenige Buchstaben nicht bedauern. Fragen: „Wer davon weiß, dass er drinsteht?“"
  },
  {
   "titel": "Kontakte-Check",
   "icon": "address-book",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "amira:neutral",
   "schritte": [
    "Öffne deine Kontakte oder Chats. Kein Handy? Schätz aus dem Kopf.",
    "Zähl: Wie viele **Kontakte** hast du?",
    "Wie vielen hast du **diese Woche** geschrieben?",
    "Bei wie vielen ging es um **etwas Echtes**?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "Kontakte",
      "diese Woche geschrieben",
      "etwas Echtes"
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
   "aha": "Viele Kontakte sind nicht dasselbe wie **nah.**",
   "ziel": "Den Unterschied zwischen Kontakt und Nähe in Zahlen sehen.",
   "tipp": "Die eigenen Zahlen zuerst nennen. Die letzte Spalte ist auch bei Erwachsenen klein."
  },
  {
   "titel": "Amira sagt „Mal sehen“",
   "icon": "message-question",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "amira:traurig",
   "schritte": [
    "Schaut euch Amiras Woche an.",
    "Kreuz an: Wovor schützt sich Amira?",
    "Kreuz an: Was könnte sie Sara schreiben?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:address-book}</div><p>Amira hat 212 Kontakte.</p></div><div><div class=\"o\"><b>2</b>{i:mood-smile}</div><p>In der Pause lacht sie an den richtigen Stellen.</p></div><div><div class=\"o\"><b>3</b>{i:message-circle}</div><p>Sara fragt: „Kommst du Samstag mit?“</p></div><div><div class=\"o\"><b>4</b>{i:message-question}</div><p>Amira sagt: „Mal sehen.“ Sie will. Aber was, wenn es komisch wird?</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Davor schützt sich Amira:",
     "fragen": [
      {
       "f": "",
       "o": [
        "dass es komisch wird",
        "vor Sara",
        "vor Langeweile"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das könnte sie schreiben:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Bin dabei. Wer kommt noch?“",
        "„Mal sehen.“",
        "„Ich komme eine Stunde.“"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer nicht hingeht, kann nicht abgelehnt werden. **Und auch nicht dazugehören.**",
   "ziel": "Rückzug als Schutz verstehen – erst bei Amira.",
   "tipp": "Nicht drängen („Du musst halt hingehen“). „Eine Stunde“ ist die brauchbarste Antwort."
  },
  {
   "titel": "Gesichter raten",
   "icon": "mood-neutral",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber sucht sich heimlich ein Wort aus der Liste aus.",
    "Es macht **das Gesicht** dazu. Ohne Worte.",
    "Du rätst. Richtig? Ein Strich.",
    "Fünf Gesichter. Dann tauschen."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Die Liste:",
     "fragen": [
      {
       "f": "",
       "o": [
        "müde",
        "genervt",
        "konzentriert",
        "freundlich",
        "gelangweilt",
        "unsicher",
        "ganz normal"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "richtig geraten von 5"
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
    }
   ],
   "aha": "Ein normales Gesicht ist kein Nein. **Dein Kopf rät – und rät oft falsch.**",
   "ziel": "Erleben, wie leicht man Gesichter falsch liest.",
   "tipp": "„Ganz normal“ und „konzentriert“ unbedingt drannehmen – die werden am häufigsten als „genervt“ gelesen."
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
     "titel": "Einsamkeit",
     "kanal": "Dinge Erklärt – Kurzgesagt",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=DwqwRYe6fKA",
     "frage": "Wo in der Spirale stehst du gerade – wenn überhaupt?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Man kann unter vielen Leuten allein sein.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich kenne das Gefühl.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Einsam sein ist peinlich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Eine Person reicht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Einsamkeit ist kein Fehler. **Sie ist ein Alarm – wie Hunger.**",
   "ziel": "Einsamkeit als Signal verstehen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Eine Frage zurück",
   "icon": "messages",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Uhr mit Sekunden",
   "bild": "amira:ruhig",
   "schritte": [
    "Dein Gegenüber fragt dich etwas zum Thema.",
    "**Runde 1:** Du antwortest so kurz wie möglich. Stoppt die Zeit, bis es still wird.",
    "**Runde 2:** Du antwortest – und stellst **eine Frage zurück.** Stoppt wieder.",
    "Vergleicht die Sekunden."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Sekunden",
      "Essen",
      "Musik",
      "Wochenende"
     ],
     "breiten": [
      58,
      14,
      14,
      14
     ],
     "zeilen": [
      [
       "nur antworten",
       "",
       "",
       ""
      ],
      [
       "antworten + Frage zurück",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Eine Frage zurück – **und das Gespräch lebt.** Mehr braucht es nicht.",
   "ziel": "Die einfachste Gesprächstechnik üben und ihre Wirkung messen.",
   "tipp": "In Runde 1 nichts retten – die Stille gehört dazu. In Runde 2 ehrlich antworten."
  },
  {
   "titel": "Eine Nachricht",
   "icon": "send",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "beide Handys",
   "bild": "",
   "schritte": [
    "Such dir **einen Menschen** aus, bei dem es länger her ist.",
    "Kreuz an, womit du anfängst. Oder schreib deinen eigenen Satz.",
    "Schreib die Nachricht. **Abschicken oder nur speichern** – du entscheidest.",
    "Dein Gegenüber schreibt auch jemandem."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Mein Anfang:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Hey, wie läuft’s bei dir?“",
        "„Hab gerade an dich gedacht.“",
        "„Das hier hat mich an dich erinnert.“ (mit Bild)",
        "„Lust, mal wieder …?“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Meine Nachricht ist:",
     "fragen": [
      {
       "f": "",
       "o": [
        "abgeschickt",
        "gespeichert",
        "heute nicht"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Der erste Schritt kostet **zehn Sekunden Mut.**",
   "ziel": "Einen echten Kontaktversuch machen – jetzt, nicht „irgendwann“.",
   "tipp": "Selbst wirklich eine Nachricht schicken. Nicht mitlesen, nicht nach dem Namen fragen. Auf Antworten nicht warten lassen: weitermachen."
  },
  {
   "titel": "Sicher oder vermutet?",
   "icon": "zoom-question",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest einen Gedanken vor.",
    "Kreuz an: **Weiß** man das sicher? Oder **vermutet** man es nur?",
    "Kreis ein: Wie findet man es heraus?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Der Gedanke:",
     "kopf": [
      "",
      "sicher",
      "nur vermutet"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Die wollen mich nicht dabeihaben.“",
       "",
       ""
      ],
      [
       "„Sie antwortet nicht. Sie mag mich nicht.“",
       "",
       ""
      ],
      [
       "„Wenn ich hingehe, wird es komisch.“",
       "",
       ""
      ],
      [
       "„Keiner würde merken, wenn ich fehle.“",
       "",
       ""
      ],
      [
       "„Die lachen über mich.“",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "So findet man es heraus:",
     "fragen": [
      {
       "f": "",
       "o": [
        "nachfragen",
        "hingehen",
        "abwarten"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Weißt du es von **diesen** Leuten – oder von früher? Nachfragen kostet weniger als ein Abend grübeln.",
   "ziel": "Vermutung und Wissen trennen.",
   "tipp": "Misstrauen ist oft eine vernünftige Erfahrung. Nicht sagen „Das bildest du dir ein“."
  }
 ],
 "woche": {
  "titel": "Zehn Sekunden mehr",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Bleib dreimal diese Woche **zehn Sekunden länger** in einem Kontakt.",
   "Eine Frage mehr. Eine Nachricht mehr. Einmal nicht als Erster gehen.",
   "Mach danach einen Strich."
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
      "eine Frage mehr gestellt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "eine Nachricht mehr geschrieben",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "nicht als Erster gegangen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "jemand kam auf mich zu",
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
      "titel": "Heute oder früher?",
      "icon": "eye",
      "text": "Ich denke: „Die wollen mich nicht.“\nWeiß ich das von diesen Leuten?\nEinmal nachfragen."
     },
     {
      "titel": "Kleine Schritte",
      "icon": "stairs-up",
      "text": "eine Frage zurück stellen\netwas Kleines von mir erzählen\neinmal Ja sagen und eine Stunde bleiben"
     }
    ]
   }
  ],
  "aha": "Nähe entsteht nicht auf einmal. **Sie entsteht in Zehn-Sekunden-Stücken.**",
  "ziel": "Drei kleine Kontakt-Schritte in einer Woche.",
  "tipp": "Die letzte Zeile ist die wichtigste: Sie zeigt, dass andere reagieren."
 },
 "begleitungAktion": {
  "material": "beide Handys, Uhr, Stifte",
  "achtung": "Einsamkeit ist ein Risikofaktor für depressive Krisen und Suizidgedanken – bei Sätzen wie „Mich würde eh keiner vermissen“ ruhig und direkt nachfragen und nach dem Verfahren der Einrichtung handeln. Kontakte im Netz ernst nehmen, aber prüfen: Erwachsene, die sehr schnell sehr nah werden, Geschenke machen oder Geheimhaltung verlangen, sind ein Grund, die zuständige Leitung (Responsable) einzubeziehen. Beratung: BEE SECURE Helpline 8002 1234; bei akuter Gefahr Polizei 113.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #08 Allein."
 }
}

export const LEKTIONEN = []
