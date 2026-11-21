// SOLO AKTION #16 · Mist gebaut – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a16.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-16",
 "kuerzel": "ak16",
 "nr": 16,
 "nrText": "#16",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #16",
 "fuss": "SOLO AKTION #16 · Mist gebaut",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-16-Mist-gebaut-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Mist gebaut",
  "fr": ""
 },
 "untertitel": {
  "de": "Das hier ist keine Strafe und kein Verhör. Fang mit Aktion 1 an – das sind die Regeln. Über eine Sache, zu der ein Verfahren läuft, sagst und schreibst du hier nichts.",
  "fr": ""
 },
 "farben": {
  "tief": "#E53813",
  "mittel": "#FF5A36",
  "zart": "#ffebe7",
  "dunkel": "#95240c"
 },
 "deckbild": [
  "ben:besorgt:stehen"
 ],
 "blasen": [
  {
   "t": "Dein Anteil",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:shield-check}<span>Erst die Regeln</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:coins}<span>Zehn Münzen</span><small>12 Min.</small><i></i></div><div><b>3</b>{i:scale}<span>Getan oder bin so?</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:users-group}<span>Allein oder Gruppe?</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:door-exit}<span>„Ich bin raus.“</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:tool}<span>Reparieren</span><small>12 Min.</small><i></i></div><div><b>8</b>{i:user-star}<span>Wer bin ich noch?</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Erst die Regeln",
   "icon": "shield-check",
   "zeit": "10 Min.",
   "wer": "dein Gegenüber schreibt",
   "material": "Stift",
   "bild": "ben:besorgt",
   "schritte": [
    "**Bevor du etwas erzählst:** Dein Gegenüber schreibt auf, was es weitersagen **muss.**",
    "Und was hier bleibt.",
    "Frag nach, bis es klar ist.",
    "Läuft ein Verfahren? Dann reden wir hier nur über **Ben.**"
   ],
   "zonen": [
    {
     "art": "fragen",
     "auftrag": "Das muss mein Gegenüber weitersagen:",
     "fragen": [
      {
       "f": "",
       "zeilen": 2
      }
     ]
    },
    {
     "art": "fragen",
     "auftrag": "Das bleibt hier:",
     "fragen": [
      {
       "f": "",
       "zeilen": 2
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Für mich ist es:",
     "fragen": [
      {
       "f": "",
       "o": [
        "klar",
        "noch mal erklären"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Erst die Regeln, dann das Reden. **Das ist dein Recht.**",
   "ziel": "Der Jugendliche weiß vor jedem Wort, was mit seinen Angaben passiert.",
   "tipp": "Vorher klären, was Sie bei neuen Straftaten melden müssen. Ehrlich aufschreiben. In laufenden Verfahren keine Einzelheiten erfragen."
  },
  {
   "titel": "Zehn Münzen",
   "icon": "coins",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "10 Münzen oder Büroklammern, 3 Zettel",
   "bild": "ben:besorgt",
   "schritte": [
    "Schaut euch an, was bei Ben passiert ist.",
    "Schreibt drei Zettel: **Ben – die anderen – die Umstände.**",
    "Verteil die zehn Münzen: Wer trägt wie viel?",
    "Schreib die Zahlen auf. Dann verteilt dein Gegenüber neu.",
    "Wenn du willst: dasselbe für eine eigene Sache. **Ohne zu sagen, welche.**"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:bulb}</div><p>Zwei andere haben die Idee: Wir nehmen einen Roller, der uns nicht gehört.</p></div><div><div class=\"o\"><b>2</b>{i:scooter}</div><p>Ben fährt.</p></div><div><div class=\"o\"><b>3</b>{i:file-alert}</div><p>Jetzt gibt es eine Anzeige. Seine Mutter redet kaum noch.</p></div><div><div class=\"o\"><b>4</b>{i:mood-sad}</div><p>Ben denkt: „Jetzt bin ich endgültig so einer.“</p></div></div>"
    },
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "Münzen",
      "Ben",
      "die anderen",
      "die Umstände"
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
   "aha": "Die Idee kam von anderen. Gefahren ist er. **Beides stimmt.**",
   "ziel": "Verantwortung teilen statt alles oder nichts.",
   "tipp": "Die Zahlen des Jugendlichen nicht korrigieren, nur nachfragen. Ihre eigene Verteilung begründen."
  },
  {
   "titel": "Getan oder bin so?",
   "icon": "scale",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "**Schuld** sagt: Ich habe etwas Schlechtes **getan.**",
    "**Scham** sagt: Ich **bin** schlecht.",
    "Dein Gegenüber liest einen Satz vor. Beide zeigen: Daumen = Schuld. Faust = Scham.",
    "Kreuz an."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Der Satz:",
     "kopf": [
      "",
      "Schuld",
      "Scham"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Das war falsch von mir.“",
       "",
       ""
      ],
      [
       "„Ich bin halt ein Krimineller.“",
       "",
       ""
      ],
      [
       "„Ich will das wieder in Ordnung bringen.“",
       "",
       ""
      ],
      [
       "„Aus mir wird eh nichts.“",
       "",
       ""
      ],
      [
       "„Alle wissen jetzt, was ich für einer bin.“",
       "",
       ""
      ],
      [
       "„Das hätte ich nicht tun sollen.“",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Mit Schuld kann man etwas machen. **Scham versteckt sich – oder schlägt zu.**",
   "ziel": "Schuld und Scham unterscheiden.",
   "tipp": "Bens Satz („so einer“) ist Scham. Darauf zurückkommen, nicht auf den Jugendlichen."
  },
  {
   "titel": "Allein oder Gruppe?",
   "icon": "users-group",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Es geht um Leute in deinem Alter – nicht um dich.",
    "Dein Gegenüber liest vor. Kreuz an: Macht man das **auch allein**? Oder **nur in der Gruppe**?",
    "Dein Gegenüber kreuzt für Erwachsene an."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Leute in meinem Alter …",
     "kopf": [
      "",
      "auch allein",
      "nur in der Gruppe"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "… gehen bei Rot über die Straße.",
       "",
       ""
      ],
      [
       "… lachen jemanden aus.",
       "",
       ""
      ],
      [
       "… klettern irgendwo hoch, wo es verboten ist.",
       "",
       ""
      ],
      [
       "… nehmen etwas mit, das ihnen nicht gehört.",
       "",
       ""
      ],
      [
       "… machen etwas kaputt.",
       "",
       ""
      ],
      [
       "… helfen jemandem, der am Boden liegt.",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Mit anderen dabei geht man mehr Risiko ein. **Das erklärt es. Es entschuldigt es nicht.**",
   "ziel": "Den Einfluss der Gruppe erkennen.",
   "tipp": "Die letzte Zeile zeigt: In der Gruppe tut man auch Gutes seltener. Kein Verhör daraus machen."
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
     "titel": "Das Asch-Experiment: So manipuliert uns die Gruppe",
     "kanal": "Quarks",
     "dauer": "die ersten 5 Min.",
     "url": "https://www.youtube.com/watch?v=I40g6U3K7hc",
     "frage": "Hättest du bei dem Experiment mitgemacht?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ich hätte bei dem Experiment auch mitgemacht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>In der Gruppe mache ich Sachen, die ich allein nie machen würde.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich sage Nein, auch wenn alle Ja sagen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Wer mitmacht, ist auch verantwortlich.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Fast alle machen mit, wenn alle mitmachen. **Wer das weiß, hat drei Sekunden Vorsprung.**",
   "ziel": "Gruppendruck als normales Phänomen sehen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "„Ich bin raus.“",
   "icon": "door-exit",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "ben:besorgt",
   "schritte": [
    "Dein Gegenüber spielt die Gruppe.",
    "Du sagst **„Ich bin raus.“** – und gehst **wirklich** zur Tür.",
    "Es wird in drei Stufen schwerer. Kreuz an, wie es war.",
    "Tauschen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Die Gruppe sagt …",
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
       "„Komm, mach mit.“",
       "",
       ""
      ],
      [
       "„Stell dich nicht so an.“",
       "",
       ""
      ],
      [
       "„Bist du feige?“",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Mein Satz zum Aussteigen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Ich bin raus.“",
        "„Ohne mich.“",
        "„Macht ihr mal.“"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Aussteigen dauert **drei Sekunden.** Und spart Monate.",
   "ziel": "Aussteigen einmal mit den Füßen geübt haben.",
   "tipp": "Wirklich bis zur Tür gehen lassen – die Bewegung ist der Punkt. Nach Stufe 3 sofort aus der Rolle gehen."
  },
  {
   "titel": "Reparieren",
   "icon": "tool",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Denk an **eine kleine Sache**, die du kaputtgemacht hast: ein Ding, ein Vertrauen, einen Tag.",
    "**Nicht die mit der Anzeige.**",
    "Kreuz an: Welcher Schritt würde passen?",
    "Probe: Sag den ersten Satz zu deinem Gegenüber. Es spielt die andere Person.",
    "Besprecht: Was tust du, wenn die Person nicht will?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:message-circle}<span>sagen: „Das war falsch von mir.“</span><i></i></div><div>{i:coins}<span>etwas ersetzen oder bezahlen</span><i></i></div><div>{i:tool}<span>etwas reparieren oder sauber machen</span><i></i></div><div>{i:calendar}<span>eine Woche etwas für die Person übernehmen</span><i></i></div><div>{i:help-circle}<span>fragen: „Was brauchst du von mir?“</span><i></i></div><div>{i:ear}<span>erst mal nur zuhören</span><i></i></div></div>"
    }
   ],
   "aha": "Reparieren ändert, wie andere dich sehen. **Und wie du dich selbst siehst.**",
   "ziel": "Einen kleinen Schritt zur Wiedergutmachung vorbereiten.",
   "tipp": "Der Schritt wird hier besprochen, bevor er gemacht wird. Die andere Person darf ablehnen. Lebt sie im selben Haus, geht ihr Schutz vor – siehe Achtung."
  },
  {
   "titel": "Wer bin ich noch?",
   "icon": "user-star",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "Stift",
   "bild": "ben:besorgt",
   "schritte": [
    "Ben denkt: „Jetzt bin ich endgültig so einer.“ Das stimmt nicht.",
    "Kreuz an, was du **auch** bist. Mindestens drei.",
    "Dein Gegenüber schreibt **eine Sache** dazu, die es an dir sieht.",
    "Du schreibst eine für dein Gegenüber."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:users}<span>ein guter Freund</span><i></i></div><div>{i:heart}<span>großer Bruder, große Schwester</span><i></i></div><div>{i:check}<span>zuverlässig, wenn es zählt</span><i></i></div><div>{i:mood-happy}<span>witzig</span><i></i></div><div>{i:tool}<span>geschickt mit den Händen</span><i></i></div><div>{i:run}<span>sportlich</span><i></i></div><div>{i:paw}<span>gut mit Tieren</span><i></i></div><div>{i:message-circle}<span>ehrlich, wenn es darauf ankommt</span><i></i></div></div>"
    },
    {
     "art": "fragen",
     "auftrag": "Das sieht mein Gegenüber an mir:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Was du getan hast, **ist nicht, was du bist.**",
   "ziel": "Ein Selbstbild, das größer ist als der Vorfall.",
   "tipp": "Etwas Echtes und Konkretes aufschreiben, kein Trostpflaster. Etwas, das Sie wirklich beobachtet haben."
  }
 ],
 "woche": {
  "titel": "Ein Stück zurück",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du – nach Absprache",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Mach diese Woche **den einen kleinen Schritt**, den ihr besprochen habt.",
   "Kein großes Geständnis. Nicht die Sache mit der Anzeige.",
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
      "Schritt gemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "die Person hat es angenommen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "die Person wollte nicht (zählt auch)",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "„Ich bin raus.“ gesagt",
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
      "titel": "Schuld statt Scham",
      "icon": "scale",
      "text": "Was ich getan habe, ist nicht, was ich bin.\nWas davon war meins?\nWas kann ich wieder in Ordnung bringen?"
     },
     {
      "titel": "Bevor ich mitmache",
      "icon": "player-pause",
      "text": "Würde ich das auch allein machen?\nWer zahlt, wenn es schiefgeht?\nMein Satz: „Ich bin raus.“"
     }
    ]
   }
  ],
  "aha": "Ein kleiner Schritt zurück ist **ein großer Schritt für dich.**",
  "ziel": "Ein abgesprochener Schritt zur Wiedergutmachung.",
  "tipp": "Lehnt die andere Person ab, ist das kein Scheitern. Beim nächsten Mal fragen: „Was hast du dann gemacht?“"
 },
 "begleitungAktion": {
  "material": "Münzen oder Büroklammern, Zettel, Stifte, Handy",
  "achtung": "Klären Sie vor der Stunde, was Sie mit neuen Informationen über Straftaten tun müssen, und sagen Sie es dem Jugendlichen, bevor er erzählt. In laufenden Verfahren keine Einzelheiten der Tat erfragen. Lebt die geschädigte Person im selben Haus, geht deren Schutz vor; ein Kontakt wird nur mit ihr und der zuständigen Leitung (Responsable) vorbereitet. Wird der Jugendliche von Älteren unter Druck gesetzt oder für Taten benutzt, ist das ein Schutzthema. Starke Scham kann in Selbstverletzung oder Suizidgedanken umschlagen – nachfragen und das Kanner-Jugendtelefon 116 111 nennen.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #16 Mist gebaut."
 }
}

export const LEKTIONEN = []
