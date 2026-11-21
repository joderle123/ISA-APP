// SOLO AKTION #15 · Leer – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a15.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-15",
 "kuerzel": "ak15",
 "nr": 15,
 "nrText": "#15",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #15",
 "fuss": "SOLO AKTION #15 · Leer",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-15-Leer-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Leer",
  "fr": ""
 },
 "untertitel": {
  "de": "Manchmal zieht nichts mehr. Nicht mal das, was früher sicher ging. Das ist kein Charakterfehler und keine Faulheit. Hier ist alles klein. Und alles zählt – auch „hier sitzen“.",
  "fr": ""
 },
 "farben": {
  "tief": "#2676ED",
  "mittel": "#4D94FF",
  "zart": "#eaf2ff",
  "dunkel": "#194d9a"
 },
 "deckbild": [
  "lea:muede:stehen"
 ],
 "blasen": [
  {
   "t": "Kleinste Schritte",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:clock}<span>Zehn Minuten</span><small>15 Min.</small><i></i></div><div><b>2</b>{i:arrows-exchange}<span>Früher – jetzt</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:pencil-off}<span>Lea</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:check}<span>Was trotzdem ging</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:message-heart}<span>Die direkte Frage</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:bulb}<span>Wenn es dunkel wird</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:calendar-plus}<span>Dreimal zehn</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Zehn Minuten",
   "icon": "clock",
   "zeit": "15 Min.",
   "wer": "zusammen",
   "material": "je nach Auswahl",
   "bild": "lea:muede",
   "schritte": [
    "Kreuz **eine** Sache an. Die kleinste reicht.",
    "Macht sie jetzt. **Zehn Minuten. Zusammen.**",
    "Reden ist nicht nötig.",
    "Danach nur ein Kreis: Wie ist es jetzt?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:walk}<span>eine Runde rausgehen</span><i></i></div><div>{i:headphones}<span>ein Lied hören</span><i></i></div><div>{i:cup}<span>Tee oder Kakao machen</span><i></i></div><div>{i:pencil}<span>kritzeln</span><i></i></div><div>{i:cards}<span>ein Spiel spielen</span><i></i></div><div>{i:window}<span>aus dem Fenster schauen</span><i></i></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Danach ist es:",
     "fragen": [
      {
       "f": "",
       "o": [
        "schwerer",
        "gleich",
        "ein bisschen leichter"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Du musst keine Lust haben. **Zehn Minuten reichen.**",
   "ziel": "Gemeinsam etwas Kleines tun – ohne Gespräch, ohne Ergebnis.",
   "tipp": "Tempo halbieren. Nicht aufmuntern, nicht fragen, ob es gutgetan hat. „Gleich“ ist eine gute Antwort."
  },
  {
   "titel": "Früher – jetzt",
   "icon": "arrows-exchange",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Mach in jeder Zeile ein Kreuz.",
    "Dein Gegenüber kreuzt für eine eigene miese Zeit an.",
    "Schaut hin: Was ist bei dir von „früher gut“ zu „jetzt egal“ gerutscht?"
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Wie ist es damit?",
     "kopf": [
      "",
      "früher gut",
      "jetzt noch gut",
      "jetzt egal"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "Musik",
       "",
       "",
       ""
      ],
      [
       "zeichnen oder basteln",
       "",
       "",
       ""
      ],
      [
       "Sport oder Bewegung",
       "",
       "",
       ""
      ],
      [
       "Freunde treffen",
       "",
       "",
       ""
      ],
      [
       "Essen",
       "",
       "",
       ""
      ],
      [
       "zocken oder Serien",
       "",
       "",
       ""
      ],
      [
       "draußen sein",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Wenn auch das Sichere keinen Spaß mehr macht, ist das **ein Zeichen. Kein Charakter.**",
   "ziel": "Die Veränderung sehen, ohne sie zu erklären.",
   "tipp": "Viele Kreuze bei „jetzt egal“ über Wochen: siehe Achtung. Keine Diagnose aussprechen."
  },
  {
   "titel": "Lea",
   "icon": "pencil-off",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "lea:traurig",
   "schritte": [
    "Schaut euch Leas Tag an.",
    "Kreuz an: Woran könnte jemand merken, dass etwas nicht stimmt?",
    "Kreis ein: Was ist Lea?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:school}</div><p>Lea steht auf, geht zur Schule, lacht in der Pause.</p></div><div><div class=\"o\"><b>2</b>{i:bed}</div><p>Nachmittags liegt sie auf dem Bett und schaut an die Decke.</p></div><div><div class=\"o\"><b>3</b>{i:pencil-off}</div><p>Früher hat sie gezeichnet. Die Stifte liegen seit Februar in der Schublade.</p></div><div><div class=\"o\"><b>4</b>{i:message-circle}</div><p>Wenn jemand fragt, sagt sie: „Bin nur müde.“</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Daran könnte man es merken:",
     "fragen": [
      {
       "f": "",
       "o": [
        "an den Stiften in der Schublade",
        "an „Bin nur müde“ – jeden Tag",
        "an ihrem Lachen in der Pause"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Lea ist:",
     "fragen": [
      {
       "f": "",
       "o": [
        "traurig",
        "leer",
        "faul"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Leer ist nicht traurig. Und nicht faul. **Es sieht von außen nur so aus wie „müde“.**",
   "ziel": "Leere von Faulheit und Traurigkeit unterscheiden.",
   "tipp": "Nicht fragen „Geht es dir auch so?“. Die Frage stellt Aktion 6."
  },
  {
   "titel": "Was trotzdem ging",
   "icon": "check",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Kreis ein: Wie voll ist dein Akku heute?",
    "Kreis alles ein, was diese Woche **trotzdem ging.**",
    "Dein Gegenüber kreist für sich ein.",
    "Zählt zusammen. Jeder Kreis zählt gleich viel."
   ],
   "zonen": [
    {
     "art": "skala",
     "auftrag": "Mein Akku (0 leer – 10 voll):",
     "zeilen": [
      "heute"
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das ging diese Woche:",
     "fragen": [
      {
       "f": "",
       "o": [
        "aufstehen",
        "duschen",
        "essen",
        "rausgehen",
        "jemandem schreiben",
        "Musik hören",
        "hierherkommen",
        "hier sitzen"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "An leeren Tagen **zählt alles.** Auch „hier sitzen“.",
   "ziel": "Kleines als geschafft anerkennen.",
   "tipp": "Nicht loben wie bei einem Kind. Nur zählen: „Fünf.“"
  },
  {
   "titel": "Video-Check",
   "icon": "player-play",
   "zeit": "12 Min.",
   "wer": "zusammen",
   "material": "Handy oder Tablet",
   "bild": "",
   "schritte": [
    "Scannt den Code. Schaut das Video.",
    "Jeder darf „Stopp“ sagen.",
    "Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei."
   ],
   "zonen": [
    {
     "art": "clip",
     "titel": "Depressionen – einfach erklärt",
     "kanal": "iks Institut Kinderseele Schweiz",
     "dauer": "ganz schauen",
     "url": "https://www.youtube.com/watch?v=tMsA-AZzy5g",
     "frage": "Was kennst du – von dir oder von jemand anderem?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>So etwas kenne ich – von mir oder von anderen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Das ist ein Zustand, keine Faulheit.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Darüber reden macht es schlimmer.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Es geht vorbei.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Hält es wochenlang an, heißt es depressive Verstimmung. **Sie ist häufig. Und sie geht vorbei – mit Hilfe meist schneller.**",
   "ziel": "Einen Namen und eine Aussicht haben.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Reden entlastet."
  },
  {
   "titel": "Die direkte Frage",
   "icon": "message-heart",
   "zeit": "10 Min.",
   "wer": "dein Gegenüber liest vor",
   "material": "Handy",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest den Kasten vor.",
    "Es sagt dir, **was es tut, wenn du Ja sagst.**",
    "Kreis ein: Wem würdest du es sagen?",
    "Speichert zusammen zwei Nummern in deinem Handy: **116 111** und **112.**"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"unbequem\"><span class=\"u-l\">Zum Vorlesen</span><p>Dunkle Gedanken</p><div class=\"u-x\">In so einer Zeit kommen manchmal Gedanken wie „Es wäre besser, wenn ich nicht da wäre“. <b>Kennst du das? Dann sag es</b> – jetzt oder später. Dein Gegenüber bleibt ruhig. Für sich behalten darf es das nicht. Aber du erfährst zuerst, mit wem es redet.</div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Wenn es so wäre, würde ich es sagen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "meinem Gegenüber",
        "jemand anderem",
        "weiß nicht"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Die Nummern sind gespeichert:",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "später"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Darüber reden macht es nicht schlimmer. **Nur weniger einsam.**",
   "ziel": "Die Frage nach Suizidgedanken ist gestellt, und der Weg danach ist bekannt.",
   "tipp": "Die Frage danach selbst direkt stellen: „Kennst du solche Gedanken?“ Bei Ja: ruhig bleiben, danken, nach dem Krisenverfahren handeln – siehe Achtung. Nie Verschwiegenheit zusagen."
  },
  {
   "titel": "Wenn es dunkel wird",
   "icon": "bulb",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Das ist dein Zettel für schlechte Stunden.",
    "Kreuz an: Was hilft dir **ein bisschen**? Mehr muss es nicht sein.",
    "Schreib auf, wer dein Mensch ist. Ein Anfangsbuchstabe reicht.",
    "Dein Gegenüber sagt, wann es selbst erreichbar ist."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:users}<span>bei jemandem sein</span><i></i></div><div>{i:walk}<span>rausgehen</span><i></i></div><div>{i:headphones}<span>Musik</span><i></i></div><div>{i:droplet}<span>duschen</span><i></i></div><div>{i:paw}<span>ein Tier</span><i></i></div><div>{i:pencil}<span>schreiben oder zeichnen</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Mein Mensch:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "„Es wird nie besser“ ist **ein Anzeichen. Keine Tatsache.**",
   "ziel": "Ein kleiner Plan für schlechte Stunden.",
   "tipp": "Ehrlich sagen, wann Sie erreichbar sind und wer es sonst ist. Die 116 111 hat feste Zeiten, die 112 ist immer da."
  },
  {
   "titel": "Dreimal zehn",
   "icon": "calendar-plus",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "lea:muede",
   "schritte": [
    "Such dir **eine sehr kleine Sache** aus, die früher gut war.",
    "Kreis drei Tage ein, an denen du sie machst. Je zehn Minuten.",
    "Kreis ein, wer mitmacht.",
    "Auch ohne Lust. Es wirkt langsam."
   ],
   "zonen": [
    {
     "art": "fragen",
     "auftrag": "Meine Sache:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "An diesen Tagen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa",
        "So"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Dabei ist:",
     "fragen": [
      {
       "f": "",
       "o": [
        "niemand",
        "mein Gegenüber",
        "jemand anderes"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Erst tun, dann fühlen. **Nicht umgekehrt.**",
   "ziel": "Drei feste, sehr kleine Termine.",
   "tipp": "Anbieten, einmal dabei zu sein. Ändert sich nichts, ist das normal – das auch so sagen."
  }
 ],
 "woche": {
  "titel": "Zehn Minuten trotzdem",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du – gern mit jemandem",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Mach deine kleine Sache an drei Tagen. Je zehn Minuten.",
   "Mach danach ein Kreuz.",
   "Ändert sich nichts? **Das ist normal. Es wirkt langsam.**"
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
      "zehn Minuten gemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ging schwer",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ging leichter",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "mit jemandem geredet",
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
      "titel": "Wenn es dunkel wird",
      "icon": "phone",
      "text": "„Es wird nie besser“ ist ein Anzeichen.\nNicht allein bleiben. Jemandem sagen, wie es ist.\nKanner-Jugendtelefon **116 111** (feste Zeiten) · Notruf **112** (immer)"
     },
     {
      "titel": "Erst tun",
      "icon": "player-play",
      "text": "Nicht auf Lust warten.\nZehn Minuten reichen.\nÄndert sich nichts: normal."
     }
    ]
   }
  ],
  "aha": "Jedes Kreuz zählt. **Auch das schwere.**",
  "ziel": "Drei kleine Aktivierungen in einer Woche.",
  "tipp": "Beim nächsten Mal nicht fragen „Hat es geholfen?“, sondern „An welchem Tag ging es am leichtesten?“"
 },
 "begleitungAktion": {
  "material": "Handy, Stifte, je nach Auswahl Tee oder ein Spiel",
  "achtung": "**Nennt der Jugendliche Suizidgedanken:** ruhig bleiben, danken, nachfragen (Wie oft? Gibt es einen Plan? Ein Mittel? Einen Zeitpunkt?). Nie Verschwiegenheit zusagen. Ihm sagen, mit wem Sie jetzt sprechen. Sofort nach dem Krisenverfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen; bei akuter Gefahr nicht allein lassen und den Notruf 112 wählen. **In jedem Fall** bei anhaltender Leere, Schlaf- und Essstörungen oder Selbstverletzung eine kinder- und jugendpsychiatrische oder psychotherapeutische Abklärung veranlassen. Nach der Stunde das Team informieren, dass das Thema bewegt wurde.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #15 Leer."
 }
}

export const LEKTIONEN = []
