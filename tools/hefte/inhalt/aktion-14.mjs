// SOLO AKTION #14 · Später – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a14.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-14",
 "kuerzel": "ak14",
 "nr": 14,
 "nrText": "#14",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #14",
 "fuss": "SOLO AKTION #14 · Später",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-14-Spaeter-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Später",
  "fr": ""
 },
 "untertitel": {
  "de": "Niemand muss in deinem Alter wissen, was er wird. Nur, was er als Nächstes ausprobiert. Hier wird kein Plan kleingemacht. Auch kein großer.",
  "fr": ""
 },
 "farben": {
  "tief": "#108960",
  "mittel": "#2EE6A8",
  "zart": "#e6fcf5",
  "dunkel": "#0a593e"
 },
 "deckbild": [
  "yusuf:neutral:stehen"
 ],
 "blasen": [
  {
   "t": "Ein Dienstag reicht",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:calendar}<span>Ein Dienstag</span><small>15 Min.</small><i></i></div><div><b>2</b>{i:checklist}<span>Was gibt es schon?</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:briefcase}<span>Yusuf beim Berater</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:arrow-back-up}<span>Rückwärts planen</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:search}<span>Drei Berufe</span><small>15 Min.</small><i></i></div><div><b>7</b>{i:route}<span>Der krumme Weg</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:users}<span>Wer hilft mir?</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Ein Dienstag",
   "icon": "calendar",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "Stifte",
   "bild": "",
   "schritte": [
    "Stell dir einen Dienstag in ein paar Jahren vor. Es läuft **okay.** Nicht perfekt.",
    "Zeichne vier Bilder. Strichmännchen reichen.",
    "Dein Gegenüber zeichnet auf ein eigenes Blatt: seinen Dienstag, als es so alt war wie du.",
    "Zeigt euch die Bilder. Jeder stellt **zwei Fragen.**"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-felder\"><div><b>1</b><span>Ich wache auf in …</span><div class=\"feldbox\" style=\"height:52mm\"></div></div><div><b>2</b><span>Tagsüber mache ich …</span><div class=\"feldbox\" style=\"height:52mm\"></div></div><div><b>3</b><span>Mittags esse ich mit …</span><div class=\"feldbox\" style=\"height:52mm\"></div></div><div><b>4</b><span>Am Abend …</span><div class=\"feldbox\" style=\"height:52mm\"></div></div></div>"
    }
   ],
   "aha": "Du brauchst keinen Lebensplan. **Ein okayer Dienstag ist ein Ziel.**",
   "ziel": "Zukunft greifbar machen: ein einzelner Tag statt „das Leben“.",
   "tipp": "Nichts „realistischer“ machen. Den eigenen echten Dienstag von damals zeichnen, ohne ihn schönzumalen."
  },
  {
   "titel": "Was gibt es schon?",
   "icon": "checklist",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "yusuf:neutral",
   "schritte": [
    "Kreuz an: Was gehört zu deinem okayen Dienstag?",
    "Zweites Kreuz: Was davon hast du **schon ein bisschen**?",
    "Dein Gegenüber kreuzt an, was es in deinem Alter schon hatte."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Zu meinem Dienstag gehört:",
     "kopf": [
      "",
      "will ich",
      "habe ich schon ein bisschen"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "ein eigenes Zimmer oder eine Wohnung",
       "",
       ""
      ],
      [
       "Arbeit oder Ausbildung",
       "",
       ""
      ],
      [
       "jemand, mit dem ich esse",
       "",
       ""
      ],
      [
       "eigenes Geld",
       "",
       ""
      ],
      [
       "etwas, worin ich gut bin",
       "",
       ""
      ],
      [
       "ein Tier",
       "",
       ""
      ],
      [
       "meine Ruhe",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Ein Stück von später **gibt es schon heute.**",
   "ziel": "Sehen, dass der Weg nicht bei null beginnt.",
   "tipp": "Jedes Kreuz in der zweiten Spalte benennen: „Das hast du schon.“ Mehr nicht."
  },
  {
   "titel": "Yusuf beim Berater",
   "icon": "briefcase",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "yusuf:neutral",
   "schritte": [
    "Schaut euch Yusufs Termin an.",
    "Kreuz an: Warum sagt Yusuf „Keine Ahnung“?",
    "Kreis ein: Wem würdest du einen Plan sagen?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:briefcase}</div><p>Der Berater fragt: „Wo siehst du dich in fünf Jahren?“</p></div><div><div class=\"o\"><b>2</b>{i:message-circle}</div><p>Yusuf sagt: „Keine Ahnung.“ Der Berater seufzt.</p></div><div><div class=\"o\"><b>3</b>{i:tool}</div><p>Dabei hat Yusuf einen Plan: Mechatroniker. Eine eigene Wohnung.</p></div><div><div class=\"o\"><b>4</b>{i:mood-sad}</div><p>Er sagt ihn nicht. Beim letzten Mal hat jemand gelacht.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Yusuf sagt „Keine Ahnung“, weil:",
     "fragen": [
      {
       "f": "",
       "o": [
        "beim letzten Mal jemand gelacht hat",
        "er keinen Plan hat",
        "er den Berater nicht mag"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Einen Plan würde ich sagen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "keinem",
        "einer Person",
        "mehreren"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer seinen Plan nicht sagt, **schützt ihn.** Das ist klug – und macht einsam.",
   "ziel": "Verstehen, warum Pläne verschwiegen werden.",
   "tipp": "Nicht nach dem Plan fragen. Wenn er kommt: nicht bewerten, nur „Erzähl mehr“."
  },
  {
   "titel": "Rückwärts planen",
   "icon": "arrow-back-up",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "Stift",
   "bild": "",
   "schritte": [
    "Yusuf will Mechatroniker werden. Das ist das Ziel.",
    "Schreib Zahlen in die Kästchen: **1** ist das, was er zuerst tun muss.",
    "Kreis ein, was er **diese Woche** schaffen kann.",
    "Dann: Was wäre **dein** nächster Schritt? Nur einer."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Yusufs Schritte – in welcher Reihenfolge?",
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
       "Ausbildung anfangen",
       ""
      ],
      [
       "Bewerbung abschicken",
       ""
      ],
      [
       "Praktikum in einer Werkstatt",
       ""
      ],
      [
       "den Meister fragen, was man braucht",
       ""
      ],
      [
       "den Abschluss schaffen",
       ""
      ],
      [
       "drei Betriebe heraussuchen",
       ""
      ]
     ]
    },
    {
     "art": "fragen",
     "auftrag": "Mein nächster Schritt:",
     "fragen": [
      {
       "f": "",
       "zeilen": 1
      }
     ]
    }
   ],
   "aha": "Vom Ziel rückwärts wird aus einem Traum **eine Liste.**",
   "ziel": "Ein Ziel in Schritte teilen können.",
   "tipp": "Mehrere Reihenfolgen sind richtig. „Den Meister fragen“ ist fast immer der beste erste Schritt."
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
     "titel": "So krempelst du dein Leben um!",
     "kanal": "Dinge Erklärt – Kurzgesagt",
     "dauer": "die ersten 6 Min.",
     "url": "https://www.youtube.com/watch?v=OSk0AUT4_8o",
     "frage": "Welche sehr kleine Veränderung traust du dir zu?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Kleine Schritte bringen mehr als große Vorsätze.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich habe schon mal etwas an mir geändert.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Menschen ändern sich nie.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ich weiß, was ich als Nächstes ausprobiere.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Du musst nicht dein Leben umkrempeln. **Eine sehr kleine Sache reicht für den Anfang.**",
   "ziel": "Veränderung als Folge kleiner Schritte verstehen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft."
  },
  {
   "titel": "Drei Berufe",
   "icon": "search",
   "zeit": "15 Min.",
   "wer": "zusammen",
   "material": "Handy oder Computer",
   "bild": "",
   "schritte": [
    "Sucht zusammen im Netz: **drei Berufe**, die du dir ansehen würdest.",
    "Nur ansehen. Du musst keinen davon wollen.",
    "Zu jedem ein kurzes Video oder drei Sätze.",
    "Schreib den Beruf auf. Daumen hoch oder runter."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "Beruf",
      "Daumen hoch oder runter?"
     ],
     "breiten": [
      72,
      14,
      14
     ],
     "zeilen": [
      [
       "1",
       "",
       ""
      ],
      [
       "2",
       "",
       ""
      ],
      [
       "3",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Du musst nicht wissen, was du wirst. **Nur, was du dir als Nächstes ansiehst.**",
   "ziel": "Drei Berufe wirklich angeschaut haben.",
   "tipp": "Der Jugendliche tippt und wählt. Auch „unrealistische“ Berufe ansehen – die Frage „Was braucht man dafür?“ klärt es von selbst."
  },
  {
   "titel": "Der krumme Weg",
   "icon": "route",
   "zeit": "10 Min.",
   "wer": "du fragst",
   "material": "Stift",
   "bild": "yusuf:neutral",
   "schritte": [
    "Du interviewst dein Gegenüber. Vier Fragen.",
    "Hak ab, was du gefragt hast.",
    "Zeichne den Weg deines Gegenübers als **Linie**: gerade oder mit Kurven?",
    "Zähl die Umwege."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Meine Fragen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Was wolltest du in meinem Alter werden?“",
        "„Wie bist du da gelandet, wo du jetzt bist?“",
        "„Wer hat dir dabei geholfen?“",
        "„Was ist schiefgegangen – und war am Ende gut?“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "frei",
     "auftrag": "So sah der Weg aus:",
     "html": "<div class=\"feldbox\" style=\"height:28mm\"></div>"
    }
   ],
   "aha": "Fast kein Weg ist gerade. **Umwege sind normal.**",
   "ziel": "Am echten Lebenslauf eines Erwachsenen sehen: Wege haben Kurven.",
   "tipp": "Ehrlich antworten, auch Brüche und Abbrüche nennen. Kein „und trotzdem habe ich es geschafft“-Vortrag."
  },
  {
   "titel": "Wer hilft mir?",
   "icon": "users",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Kreuz an: Wer könnte dir beim **nächsten Schritt** helfen?",
    "Kreis **eine** Person ein.",
    "Entscheide: Wann fragst du sie?",
    "Dein Gegenüber sagt, was es selbst für dich tun kann."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:user-check}<span>Bezugsperson hier</span><i></i></div><div>{i:school}<span>Lehrerin oder Lehrer</span><i></i></div><div>{i:tool}<span>Meister oder Chef</span><i></i></div><div>{i:briefcase}<span>Berufsberatung</span><i></i></div><div>{i:home}<span>jemand aus der Familie</span><i></i></div><div>{i:users}<span>Freundin oder Freund</span><i></i></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Ich frage:",
     "fragen": [
      {
       "f": "",
       "o": [
        "diese Woche",
        "diesen Monat",
        "später"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Oft gab es einen Wendepunkt: **ein Mensch, eine Arbeit, ein Ort.**",
   "ziel": "Eine Person für den nächsten Schritt benannt haben.",
   "tipp": "In Schritt 4 nur zusagen, was Sie wirklich tun – und es bis zum nächsten Mal tun."
  }
 ],
 "woche": {
  "titel": "Eine Frage stellen",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Frag einen Erwachsenen, dessen Leben du okay findest:",
   "**„Was wolltest du in meinem Alter werden – und wie bist du hier gelandet?“**",
   "Wette vorher: Wie viele Umwege waren es?"
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
      "einen Erwachsenen gefragt",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "einen Beruf angeschaut",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "meinen nächsten Schritt gemacht",
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
      "titel": "Nächster Schritt",
      "icon": "road",
      "text": "Ich muss nicht wissen, was ich werde.\nNur, was ich als Nächstes ausprobiere:\n**Versuch:** ________________"
     },
     {
      "titel": "Wer mir helfen kann",
      "icon": "send",
      "text": "Für den nächsten Schritt brauche ich:\n**Wen:** ________________\n**Bis wann:** ________________"
     }
    ]
   }
  ],
  "aha": "Ein Schritt in dieser Woche zählt mehr als ein Plan für zehn Jahre.",
  "ziel": "Ein Gespräch und ein Schritt in einer Woche.",
  "tipp": "Beim nächsten Mal zuerst fragen: „Wen hast du gefragt – und was hat dich überrascht?“"
 },
 "begleitungAktion": {
  "material": "Stifte, Papier, Handy oder Computer",
  "achtung": "Sätze wie „Ich werde eh nicht alt“ oder „Für mich gibt es kein Später“ sind keine Coolness, sondern ein Warnsignal: ruhig und direkt nach Suizidgedanken fragen und nach dem Verfahren der Einrichtung handeln. Offene Verfahren, Schulden oder ein unsicherer Aufenthalt begrenzen Pläne tatsächlich – das ehrlich benennen, statt es wegzureden, und klären, wer dabei hilft.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #14 Später."
 }
}

export const LEKTIONEN = []
