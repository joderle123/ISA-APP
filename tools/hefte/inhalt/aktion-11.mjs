// SOLO AKTION #11 · Angst – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a11.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-11",
 "kuerzel": "ak11",
 "nr": 11,
 "nrText": "#11",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #11",
 "fuss": "SOLO AKTION #11 · Angst",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-11-Angst-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Angst",
  "fr": ""
 },
 "untertitel": {
  "de": "„Du brauchst keine Angst zu haben“ hilft nicht. Dem Körper ist das egal. Hier probierst du aus, was die Angst kleiner macht. Du wählst jede Stufe selbst.",
  "fr": ""
 },
 "farben": {
  "tief": "#2676ED",
  "mittel": "#4D94FF",
  "zart": "#eaf2ff",
  "dunkel": "#194d9a"
 },
 "deckbild": [
  "tom:aengstlich:stehen"
 ],
 "blasen": [
  {
   "t": "Kleine Stufen",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:body-scan}<span>Alarm im Körper</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:alert-triangle}<span>Echt oder falsch?</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:bus}<span>Tom und der Bus</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:repeat}<span>Dreimal dasselbe</span><small>12 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:stairs-up}<span>Toms Treppe</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:heartbeat}<span>Der Panik-Plan</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:flag}<span>Eine Stufe jetzt</span><small>15 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Alarm im Körper",
   "icon": "body-scan",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei dicke Stifte",
   "bild": "",
   "schritte": [
    "Denk an einen Moment, in dem du Angst hattest. Ein kleiner reicht.",
    "Mal in die Figur: **Wo** hast du sie gespürt?",
    "Kreuz an, was dazu passt.",
    "Dein Gegenüber malt mit einer anderen Farbe in dieselbe Figur."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-koerper\"><div class=\"fig\"><svg viewBox=\"0 0 100 200\" fill=\"#fff\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><circle cx=\"50\" cy=\"21\" r=\"15\"/><path d=\"M50 39C31 40 23 51 21 68L14 110C13 119 24 121 26 113L33 80L33 121L28 186C27 197 42 198 43 187L50 132L57 187C58 198 73 197 72 186L67 121L67 80L74 113C76 121 87 119 86 110L79 68C77 51 69 40 50 39Z\"/></svg></div><div class=\"w\"><span class=\"ak-box\"><i></i>Herz rast</span><span class=\"ak-box\"><i></i>Hände kribbeln</span><span class=\"ak-box\"><i></i>schlecht Luft</span><span class=\"ak-box\"><i></i>Bauch dreht sich</span><span class=\"ak-box\"><i></i>Zittern</span><span class=\"ak-box\"><i></i>Schwitzen</span><span class=\"ak-box\"><i></i>weiche Knie</span><span class=\"ak-box\"><i></i>Kopf ist leer</span></div></div>"
    }
   ],
   "aha": "Das ist Alarm. **Er fühlt sich gefährlich an – er ist es nicht.**",
   "ziel": "Die eigenen Körperzeichen von Angst kennen.",
   "tipp": "Nicht fragen, an welchen Moment er denkt. Eigene Zeichen ehrlich einmalen."
  },
  {
   "titel": "Echt oder falsch?",
   "icon": "alert-triangle",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest eine Lage vor.",
    "Beide zeigen gleichzeitig: Faust = **echte Gefahr.** Flache Hand = **falscher Alarm.**",
    "Kreuz an.",
    "Bei verschiedenen Antworten sagt jeder einen Satz."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Die Lage:",
     "kopf": [
      "",
      "echte Gefahr",
      "falscher Alarm"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Ein Auto fährt auf dich zu.",
       "",
       ""
      ],
      [
       "Du sollst vor der Klasse etwas sagen.",
       "",
       ""
      ],
      [
       "Jemand bedroht dich.",
       "",
       ""
      ],
      [
       "Der Bus ist voll.",
       "",
       ""
      ],
      [
       "Du musst jemanden anrufen.",
       "",
       ""
      ],
      [
       "Ein Hund knurrt und kommt näher.",
       "",
       ""
      ],
      [
       "Du gehst in einen Raum voller Leute.",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Bei echter Gefahr ist Weggehen klug. **Bei falschem Alarm macht jeder Umweg die Angst größer.**",
   "ziel": "Echte Gefahr und falschen Alarm unterscheiden.",
   "tipp": "Sagt der Jugendliche bei „Bus“ oder „Raum voller Leute“ echte Gefahr: nicht korrigieren, fragen, was dort passieren kann. Siehe Achtung."
  },
  {
   "titel": "Tom und der Bus",
   "icon": "bus",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "tom:aengstlich",
   "schritte": [
    "Schaut euch Toms Morgen an.",
    "Kreuz an: Warum ist der Bus am nächsten Tag größer?",
    "Kreis ein: Kennst du so einen Umweg?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:bus}</div><p>Der Bus kommt. Tom steigt nicht ein.</p></div><div><div class=\"o\"><b>2</b>{i:heartbeat}</div><p>Sein Herz rast. Die Hände kribbeln.</p></div><div><div class=\"o\"><b>3</b>{i:walk}</div><p>Er geht zu Fuß. 40 Minuten. „Verschlafen“, sagt er.</p></div><div><div class=\"o\"><b>4</b>{i:arrows-maximize}</div><p>Am nächsten Tag ist der Bus noch ein bisschen größer.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Der Bus ist größer, weil:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Der Umweg sagt dem Kopf: Das war gefährlich.",
        "Der Bus wirklich größer ist.",
        "Tom faul ist."
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Kenne ich so einen Umweg?",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "vielleicht",
        "nein"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Die Erleichterung ist echt. **Der Preis kommt am nächsten Tag.**",
   "ziel": "Verstehen, wie Ausweichen die Angst füttert.",
   "tipp": "Nicht nach dem eigenen Umweg fragen – das Kreuz reicht."
  },
  {
   "titel": "Dreimal dasselbe",
   "icon": "repeat",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "Uhr mit Sekunden",
   "bild": "",
   "schritte": [
    "Sucht euch **eine** unangenehme Sache aus: 20 Sekunden Blickkontakt. Oder: im Flur laut bis 20 zählen.",
    "Macht sie. Schreibt auf: Wie unwohl war es? 0 bis 10.",
    "Macht sie **noch zweimal.** Jedes Mal eine Zahl.",
    "Schaut auf die drei Zahlen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Unwohl 0–10",
      "Runde 1",
      "Runde 2",
      "Runde 3"
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
   "aha": "Beim dritten Mal ist es meist kleiner. **Wer bleibt, gewöhnt sich – Stück für Stück.**",
   "ziel": "Gewöhnung am eigenen Leib messen.",
   "tipp": "Der Jugendliche wählt die Sache. Blickkontakt nur, wenn er ihn wählt. Selbst mitmachen und ehrliche Zahlen sagen."
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
     "titel": "Wie Angst dein Leben beeinflusst – und was du dagegen tun kannst",
     "kanal": "Quarks Dimension Ralph",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=ZSPEJVzsovo",
     "frage": "Wann schützt Angst – und wann sperrt sie ein?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Angst schützt mich manchmal.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Angst hält mich von Sachen ab, die ich will.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich kann sie gut verstecken.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Andere haben weniger Angst als ich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Angst ist ein Alarmsystem. **Manchmal ist es zu empfindlich eingestellt.**",
   "ziel": "Angst als nützliches, aber übereifriges System sehen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Toms Treppe",
   "icon": "stairs-up",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "Stift",
   "bild": "tom:neutral",
   "schritte": [
    "Niemand springt von null auf „ganze Strecke“.",
    "Erstes Kästchen: Welche Stufe kommt zuerst? Schreib **1 bis 5.**",
    "Zweites Kästchen: Wie viel Angst macht sie Tom? **0 bis 10.**",
    "Dann: Was wäre **deine** erste Stufe? Sagen reicht."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Zahl von **0** (keine Angst) bis **10** (sehr viel)",
     "kopf": [
      "",
      "Platz 1–5",
      "Angst 0–10"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "die ganze Strecke im vollen Bus",
       "",
       ""
      ],
      [
       "an die offene Bustür treten und hineinschauen",
       "",
       ""
      ],
      [
       "drei Stationen, vorn beim Fahrer",
       "",
       ""
      ],
      [
       "einsteigen, eine Station, aussteigen",
       "",
       ""
      ],
      [
       "die ganze Strecke, wenn der Bus fast leer ist",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Du wählst die Stufe. **Und sie darf klein sein.**",
   "ziel": "Eine Angst-Treppe bauen können.",
   "tipp": "Die Reihenfolge ist Ansichtssache. Wichtig: Die erste Stufe muss fast lächerlich klein sein."
  },
  {
   "titel": "Der Panik-Plan",
   "icon": "heartbeat",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Übt den Plan **jetzt** – in Ruhe. Dann sitzt er, wenn du ihn brauchst.",
    "**Füße** fest auf den Boden. Zehn Sekunden reindrücken.",
    "**Lang ausatmen:** 4 Sekunden ein, 6 Sekunden aus. Fünfmal.",
    "Nenn **fünf Dinge**, die du siehst.",
    "Sag laut: „Das ist Alarm. Keine Gefahr.“"
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "So ruhig bin ich (0 gar nicht – 10 ganz ruhig):",
     "zeilen": [
      "vorher",
      "nachher"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Am besten geholfen hat:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Füße",
        "Ausatmen",
        "fünf Dinge",
        "der Satz"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Panik geht vorbei – meist in Minuten. **Du musst sie nicht wegmachen. Nur abwarten.**",
   "ziel": "Einen Ablauf für Panik im Körper haben, bevor er gebraucht wird.",
   "tipp": "Alles mitmachen, laut mitzählen. Erste oder sehr häufige Panikattacken ärztlich abklären lassen."
  },
  {
   "titel": "Eine Stufe jetzt",
   "icon": "flag",
   "zeit": "15 Min.",
   "wer": "du – dein Gegenüber ist dabei",
   "material": "",
   "bild": "tom:neutral",
   "schritte": [
    "Kreuz an: Welche kleine Sache hier im Haus **vermeidest** du?",
    "Schreib auf: Angst **vorher.**",
    "Mach sie. Dein Gegenüber ist in der Nähe.",
    "**Abbrechen zählt auch.** Dann schreib auf, bei welcher Zahl.",
    "Schreib auf: höchster Punkt und danach."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:message-circle}<span>jemanden etwas fragen</span><i></i></div><div>{i:phone}<span>irgendwo anrufen</span><i></i></div><div>{i:door}<span>in einen vollen Raum gehen</span><i></i></div><div>{i:book}<span>jemandem laut vorlesen</span><i></i></div><div>{i:building}<span>im Büro etwas abholen</span><i></i></div><div>{i:walk}<span>allein den Flur entlang</span><i></i></div></div>"
    },
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Angst 0–10",
      "vorher",
      "höchster Punkt",
      "danach"
     ],
     "breiten": [
      58,
      14,
      14,
      14
     ],
     "zeilen": [
      [
       "Ich",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Meist ist die Zahl danach kleiner. **Und auch wenn nicht: Du warst da. Das merkt sich dein Kopf.**",
   "ziel": "Eine echte erste Stufe gehen – begleitet.",
   "tipp": "Nur Situationen, die wirklich ungefährlich sind. Nicht drängen. Abbrechen wird ausgewertet, nicht bewertet."
  }
 ],
 "woche": {
  "titel": "Eine Stufe",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du – gern mit jemandem",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Nimm die **kleinste** Sache, der du ausweichst.",
   "Mach sie diese Woche. Gern mit jemandem.",
   "Bleib, bis die Angst ein Stück sinkt. Mach danach ein Kreuz."
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
      "Stufe gemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "abgebrochen (zählt auch)",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Umweg genommen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Panik-Plan benutzt",
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
      "titel": "Bei Panik",
      "icon": "heartbeat",
      "text": "Das ist Alarm, keine Gefahr.\nFüße auf den Boden. Lang ausatmen.\nKeine echte Gefahr? Dann bleib."
     },
     {
      "titel": "Meine Treppe",
      "icon": "stairs-up",
      "text": "**1 leicht:** ________________\n**2:** ________________\n**3:** ________________\n**4 schwer:** ________________"
     }
    ]
   }
  ],
  "aha": "Jede geschaffte Stufe **macht die nächste kleiner.**",
  "ziel": "Eine Stufe in einer Woche – oder ein ehrlicher Abbruch.",
  "tipp": "Wenn möglich beim ersten Mal begleiten. Die Zeile „Umweg genommen“ ohne Vorwurf ansehen."
 },
 "begleitungAktion": {
  "material": "Stifte, Uhr, Handy",
  "achtung": "Das Prinzip „bleiben, bis die Angst sinkt“ gilt nur für Situationen, die tatsächlich ungefährlich sind. Angst vor Menschen oder Orten, an denen wirklich etwas passiert ist oder passieren kann (Gewalt, Mobbing, Übergriffe), ist kein falscher Alarm – dort geht es um Schutz, nicht um Übung. Bei Hinweisen auf traumatische Erfahrungen, bei anhaltender Schulvermeidung oder häufigen Panikattacken fachliche Abklärung veranlassen; erste Panikattacken auch ärztlich abklären lassen. Niemals zu einer Stufe drängen.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #11 Angst."
 }
}

export const LEKTIONEN = []
