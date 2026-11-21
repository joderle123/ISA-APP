// SOLO AKTION #04 · Zocken – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a04.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-04",
 "kuerzel": "ak4",
 "nr": 4,
 "nrText": "#04",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #04",
 "fuss": "SOLO AKTION #04 · Zocken",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-04-Zocken-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Zocken",
  "fr": ""
 },
 "untertitel": {
  "de": "Die meisten Erwachsenen haben dein Spiel nie gespielt. Heute lernt dein Gegenüber von dir. Jede Aktion dauert 10 bis 15 Minuten.",
  "fr": ""
 },
 "farben": {
  "tief": "#855DF2",
  "mittel": "#B79CFF",
  "zart": "#f6f3ff",
  "dunkel": "#563c9d"
 },
 "deckbild": [
  "noah:ruhig:stehen"
 ],
 "blasen": [
  {
   "t": "Du erklärst",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:school}<span>Du bist der Coach</span><small>12 Min.</small><i></i></div><div><b>2</b>{i:device-gamepad-2}<span>Eine Runde zusammen</span><small>15 Min.</small><i></i></div><div><b>3</b>{i:gift}<span>Was gibt es mir?</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:search}<span>Tricks finden</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:users-group}<span>Noah, 16 Uhr</span><small>10 Min.</small><i></i></div><div><b>6</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>7</b>{i:checklist}<span>Sechs Sätze</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:alarm}<span>Stopp-Test</span><small>15 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Du bist der Coach",
   "icon": "school",
   "zeit": "12 Min.",
   "wer": "du erklärst",
   "material": "Handy, Konsole oder Stift",
   "bild": "noah:neutral",
   "schritte": [
    "Zeig dein Spiel: am Handy, in einem Video oder als Zeichnung.",
    "Erklär es in **3 Minuten**. Der Timer läuft.",
    "Stell deinem Gegenüber **drei Testfragen**.",
    "Gib eine Note."
   ],
   "zonen": [
    {
     "art": "fragen",
     "auftrag": "Mein Spiel:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Richtige Antworten von meinem Gegenüber:",
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
     "auftrag": "Meine Note für mein Gegenüber:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Anfänger",
        "geht so",
        "hat es kapiert"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer etwas erklären kann, **kann etwas.**",
   "ziel": "Der Jugendliche ist der Experte, Sie sind der Anfänger.",
   "tipp": "Wirklich dumme Fragen stellen. Nicht nach Stunden fragen."
  },
  {
   "titel": "Eine Runde zusammen",
   "icon": "device-gamepad-2",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "das Spiel – oder ein Video davon",
   "bild": "noah:ruhig",
   "schritte": [
    "Dein Gegenüber spielt. **Du bist der Coach.**",
    "Sag, was es tun soll. Ohne ihm das Gerät wegzunehmen.",
    "Geht Spielen hier nicht: Schaut zusammen eine Runde im Video.",
    "Danach kreuzt jeder an."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Mein Gegenüber war:",
     "fragen": [
      {
       "f": "",
       "o": [
        "hoffnungslos",
        "lernt schnell",
        "besser als gedacht"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Coach sein war für mich:",
     "fragen": [
      {
       "f": "",
       "o": [
        "nervig",
        "okay",
        "gut"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das sagt mein Gegenüber über das Spiel:",
     "fragen": [
      {
       "f": "",
       "o": [
        "zu schwer",
        "verstehe, warum es zieht",
        "will noch eine Runde"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Hier bist du gut in etwas – und jemand hört dir zu. **Das Gefühl gehört dir.**",
   "ziel": "Gemeinsam erleben, was das Spiel gibt.",
   "tipp": "Sich wirklich coachen lassen. Frust zeigen ist erlaubt. Hausregeln zu Geräten vorher klären."
  },
  {
   "titel": "Was gibt es mir?",
   "icon": "gift",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Kreuz an: Was bekommst du **im Spiel**?",
    "Zweites Kreuz: Bekommst du das **auch woanders**?",
    "Dein Gegenüber kreuzt für sein Ding an: Serien, Handy, Arbeit."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Das bekomme ich …",
     "kopf": [
      "",
      "im Spiel",
      "auch woanders"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Ich werde besser.",
       "",
       ""
      ],
      [
       "Ich entscheide selbst.",
       "",
       ""
      ],
      [
       "Leute brauchen mich.",
       "",
       ""
      ],
      [
       "Ich habe meine Ruhe.",
       "",
       ""
      ],
      [
       "Ich gewinne.",
       "",
       ""
      ],
      [
       "Ich treffe Freunde.",
       "",
       ""
      ],
      [
       "Ich kann abschalten.",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Das Spiel gibt dir etwas Echtes. Die Frage ist: **Bekommst du es nur dort?**",
   "ziel": "Sehen, welches Bedürfnis das Spiel erfüllt.",
   "tipp": "Leere Kästchen bei „auch woanders“ sind die Information – nicht kommentieren, merken."
  },
  {
   "titel": "Tricks finden",
   "icon": "search",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Spiel und eine App vom Gegenüber",
   "bild": "",
   "schritte": [
    "Öffne dein Spiel. Dein Gegenüber öffnet seine Lieblings-App.",
    "Sucht: Mit welchen **Tricks** hält es euch?",
    "Kreuzt an, was ihr findet.",
    "Wer mehr Tricks findet, gewinnt."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Gefunden:",
     "kopf": [
      "",
      "mein Spiel",
      "App vom Gegenüber"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "tägliche Belohnung",
       "",
       ""
      ],
      [
       "Serie, die reißt, wenn ich fehle",
       "",
       ""
      ],
      [
       "Angebot mit Uhr, die abläuft",
       "",
       ""
      ],
      [
       "Rangliste",
       "",
       ""
      ],
      [
       "Kisten mit Zufall",
       "",
       ""
      ],
      [
       "Leute, die auf mich warten",
       "",
       ""
      ],
      [
       "kein Ende",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Das ist kein Zufall. **Das ist Absicht – und ein Geschäft.**",
   "ziel": "Die Bindungs-Mechaniken selbst entdecken.",
   "tipp": "Die eigene App ehrlich durchsuchen. Meist findet der Erwachsene genauso viele Tricks."
  },
  {
   "titel": "Noah, 16 Uhr",
   "icon": "users-group",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "noah:gelangweilt",
   "schritte": [
    "Schaut euch Noahs Tag an.",
    "Kreuz an: Was bekommt Noah im Spiel?",
    "Kreis ein: Wie ist das bei dir?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:school}</div><p>In der Schule ist Noah der, der fehlt.</p></div><div><div class=\"o\"><b>2</b>{i:message-circle}</div><p>Die Lehrerin sagt: „Du könntest, wenn du wolltest.“</p></div><div><div class=\"o\"><b>3</b>{i:device-gamepad-2}</div><p>Um vier loggt er sich ein.</p></div><div><div class=\"o\"><b>4</b>{i:users}</div><p>Drei Leute schreiben: „Endlich.“</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Das bekommt Noah im Spiel:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Leute, die ihn brauchen",
        "Er ist gut in etwas",
        "Er entscheidet selbst",
        "Geld"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Bei mir ist es:",
     "fragen": [
      {
       "f": "",
       "o": [
        "genauso",
        "ein bisschen so",
        "anders"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Im Clan ist Noah wichtig. **Wo bist du wichtig?**",
   "ziel": "Über Noah sehen, was das Spiel ersetzt.",
   "tipp": "Den Satz der Lehrerin nicht selbst sagen – auch nicht nett gemeint."
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
     "titel": "Gaming & Psyche: Darum kann Spielen heilsam für dich sein",
     "kanal": "Terra Xplore",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=6vGY6Oyxb8c",
     "frage": "Was stimmt für dich – und was ist schöngeredet?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Zocken tut mir gut.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Zocken macht mir manchmal Ärger.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Erwachsene verstehen das nicht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich kann aufhören, wenn ich will.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Spielen kann guttun **und** Ärger machen. Beides stimmt.",
   "ziel": "Ein Bild vom Spielen, das weder verteufelt noch schönredet.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Sechs Sätze",
   "icon": "checklist",
   "zeit": "10 Min.",
   "wer": "allein",
   "material": "",
   "bild": "",
   "schritte": [
    "Diese Sätze fragen auch Ärzte.",
    "Kreuz an. **Keiner schaut mit.**",
    "Du wertest selbst aus: Wie viele „oft“?",
    "Du entscheidest, ob du etwas davon sagst."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Wie oft stimmt das?",
     "kopf": [
      "",
      "nie",
      "manchmal",
      "oft"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "Ich spiele länger, als ich wollte.",
       "",
       "",
       ""
      ],
      [
       "Ich lasse anderes liegen: Schlaf, Leute, Schule.",
       "",
       "",
       ""
      ],
      [
       "Ich spiele weiter, obwohl es Ärger gibt.",
       "",
       "",
       ""
      ],
      [
       "Ich spiele, um etwas nicht zu fühlen.",
       "",
       "",
       ""
      ],
      [
       "Ohne Spiel bin ich gereizt oder leer.",
       "",
       "",
       ""
      ],
      [
       "Ich sage nicht ehrlich, wie viel ich spiele.",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Nicht die Stunden zählen. **Es zählt: Kannst du aufhören, wenn du willst?**",
   "ziel": "Eine ehrliche Selbsteinschätzung ohne Publikum.",
   "tipp": "Wirklich wegschauen. Nicht nachfragen. Erzählt er von selbst mehrere „oft“: siehe Achtung."
  },
  {
   "titel": "Stopp-Test",
   "icon": "alarm",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "Spiel oder Handy, Timer",
   "bild": "noah:neutral",
   "schritte": [
    "Leg **vorher** fest: Schluss nach einer Runde – oder nach 8 Minuten.",
    "Sag es laut. Timer an. Spiel.",
    "Dein Gegenüber macht dasselbe mit seinem Handy.",
    "Der Timer klingelt: **aufhören.** Mitten drin.",
    "Kreis ein: Wie schwer war das?"
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "Aufhören war (0 leicht – 10 fast unmöglich):",
     "zeilen": [
      "für mich",
      "für mein Gegenüber"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Am schwersten ist Aufhören:",
     "fragen": [
      {
       "f": "",
       "o": [
        "mitten in der Runde",
        "nach einer Niederlage",
        "wenn Leute warten",
        "nie"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Die Entscheidung fällt **vor dem Einloggen.** Nicht mittendrin.",
   "ziel": "Aufhören einmal wirklich üben.",
   "tipp": "Selbst pünktlich aufhören – auch mitten in einer Nachricht. Geht Spielen hier nicht: mit einem Handyspiel oder Video üben."
  }
 ],
 "woche": {
  "titel": "Dreimal Stopp",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Leg dreimal diese Woche **vor dem Einloggen** fest, wann Schluss ist.",
   "Sag es jemandem, den du aussuchst.",
   "Mach danach ein Kreuz."
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
      "Vorher festgelegt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Hat geklappt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Hat nicht geklappt",
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
      "titel": "Vor dem Einloggen",
      "icon": "device-gamepad-2",
      "text": "Wie voll ist mein Akku? (0–10)\nWann ist Schluss? Laut sagen.\nWas mache ich direkt danach?"
     },
     {
      "titel": "Drei Fragen",
      "icon": "help-circle",
      "text": "Kann ich aufhören, wenn ich will?\nWas bleibt gerade liegen?\nWill ich spielen – oder etwas nicht fühlen?"
     }
    ]
   }
  ],
  "aha": "Jedes „Hat geklappt“ zeigt: **Du steuerst. Nicht das Spiel.**",
  "ziel": "Drei geplante Enden in einer Woche.",
  "tipp": "Nicht kontrollieren. Beim nächsten Mal fragen: In welchem Moment ist es gekippt?"
 },
 "begleitungAktion": {
  "material": "Handy oder Konsole, Timer, Stifte",
  "achtung": "Erzählt der Jugendliche selbst von mehreren „oft“ über viele Monate, oder bei Schulabbruch oder völligem Rückzug: fachliche Abklärung anregen (Kinder- und Jugendpsychiatrie, Suchtberatung). Auf Geld achten (Käufe im Spiel, Schulden, fremde Karten) und auf Kontakte: Erwachsene, die Geschenke machen oder in private Chats wechseln wollen, sind ein Grund, sofort die zuständige Leitung (Responsable) einzubeziehen. Spielen als Flucht vor einer unerträglichen Lage zu Hause ist kein Spielproblem.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #04 Zocken."
 }
}

export const LEKTIONEN = []
