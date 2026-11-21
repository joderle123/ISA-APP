// SOLO AKTION #13 · Zuhause – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a13.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-13",
 "kuerzel": "ak13",
 "nr": 13,
 "nrText": "#13",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #13",
 "fuss": "SOLO AKTION #13 · Zuhause",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-13-Zuhause-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Zuhause",
  "fr": ""
 },
 "untertitel": {
  "de": "Hier macht keiner deine Eltern schlecht. Und keiner macht sie gut. Du darfst beides sagen. Du entscheidest bei jeder Aktion, wie viel du zeigst.",
  "fr": ""
 },
 "farben": {
  "tief": "#69830B",
  "mittel": "#C6F02C",
  "zart": "#f8fde6",
  "dunkel": "#445507"
 },
 "deckbild": [
  "jana:neutral:stehen"
 ],
 "blasen": [
  {
   "t": "Deine Sicht zählt",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:home}<span>So war es bei uns</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:calendar-x}<span>Jana am Samstag</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:hand-two-fingers}<span>Zwei Hände</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:luggage}<span>Koffer packen</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:backpack}<span>Der Rucksack</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:quote}<span>Sätze von zu Hause</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:refresh}<span>Einmal anders</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:armchair}<span>Mein Platz</span><small>12 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "So war es bei uns",
   "icon": "home",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "jana:neutral",
   "schritte": [
    "Jede Linie hat zwei Enden.",
    "Mach ein **Kreuz**, wo es bei dir zu Hause eher war.",
    "Dein Gegenüber macht einen **Kreis** – für sein Zuhause als Kind.",
    "Nicht nachdenken. Schnell."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "Bei uns zu Hause:",
     "html": "<div class=\"striche\"><div class=\"st-z\"><span>laut</span><i></i><span>leise</span></div><div class=\"st-z\"><span>viele Leute</span><i></i><span>wenige Leute</span></div><div class=\"st-z\"><span>zusammen essen</span><i></i><span>jeder für sich</span></div><div class=\"st-z\"><span>viel reden</span><i></i><span>wenig reden</span></div><div class=\"st-z\"><span>Tür offen</span><i></i><span>Tür zu</span></div><div class=\"st-z\"><span>streng</span><i></i><span>locker</span></div></div>"
    }
   ],
   "aha": "Jedes Zuhause hat seinen eigenen Ton. **„Normal“ gibt es nicht.**",
   "ziel": "Ein leichter Einstieg: Zuhause beschreiben, ohne zu bewerten.",
   "tipp": "Die eigenen Kreise ehrlich setzen. Nichts kommentieren, auch nicht mit „Oh“."
  },
  {
   "titel": "Jana am Samstag",
   "icon": "calendar-x",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "jana:traurig",
   "schritte": [
    "Schaut euch Janas Samstag an.",
    "Kreuz an: Was fühlt Jana? **Mehrere Kreuze sind erlaubt.**",
    "Kreis ein: Wie viele Gefühle hat sie gleichzeitig?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:calendar}</div><p>Samstag ist Besuchstag. Janas Mutter hat versprochen zu kommen.</p></div><div><div class=\"o\"><b>2</b>{i:message-circle}</div><p>Um vier schreibt sie: „Schaff es heute nicht, Schatz.“</p></div><div><div class=\"o\"><b>3</b>{i:milk}</div><p>Jana schreibt: „Kein Problem.“ Aber sie ist tief enttäuscht. Später streitet sie – nur wegen eines Joghurts.</p></div><div><div class=\"o\"><b>4</b>{i:bolt}</div><p>Abends sagt ein Mädchen: „Deine Mutter ist das Letzte.“ Jana geht auf sie los.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Jana ist:",
     "fragen": [
      {
       "f": "",
       "o": [
        "enttäuscht",
        "wütend",
        "traurig",
        "Sie hat ihre Mutter lieb."
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Gleichzeitig hat sie:",
     "fragen": [
      {
       "f": "",
       "o": [
        "ein Gefühl",
        "zwei",
        "alle vier"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Du kannst jemanden lieben **und** wütend auf ihn sein. Das ist kein Widerspruch.",
   "ziel": "Gemischte Gefühle gegenüber den Eltern als normal sehen.",
   "tipp": "Kein Wort gegen Janas Mutter. Wer sie angreift, greift auch die Eltern des Jugendlichen an."
  },
  {
   "titel": "Zwei Hände",
   "icon": "hand-two-fingers",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Linke Hand heißt: **Das mag ich.** Rechte Hand heißt: **Das macht mich fertig.**",
    "Dein Gegenüber sagt ein Wort.",
    "Heb die linke Hand, die rechte – oder **beide.** Ohne ein Wort.",
    "Dann sagst du die Wörter, und dein Gegenüber hebt die Hände."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Meine Hände (dein Gegenüber kreuzt an):",
     "kopf": [
      "",
      "links",
      "rechts"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Essen bei uns",
       "",
       ""
      ],
      [
       "Feste und Geburtstage",
       "",
       ""
      ],
      [
       "wie bei uns gestritten wird",
       "",
       ""
      ],
      [
       "meine Geschwister",
       "",
       ""
      ],
      [
       "Besuche und Anrufe",
       "",
       ""
      ],
      [
       "mein Zimmer",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Beide Hände gleichzeitig oben – **das geht. Bei Familie ist es sogar normal.**",
   "ziel": "Beides zeigen können, ohne etwas erklären zu müssen.",
   "tipp": "Nicht nachfragen. Bei „Besuche und Anrufe“ besonders ruhig bleiben. Selbst ehrlich die Hände heben."
  },
  {
   "titel": "Koffer packen",
   "icon": "luggage",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Zu Hause hast du mehr gelernt als in jeder Schule.",
    "Manches nimmst du mit in dein Leben. Manches bleibt da.",
    "Mach in jeder Zeile ein Kreuz.",
    "Dein Gegenüber packt seinen Koffer in einer anderen Farbe."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Wie es bei uns läuft:",
     "kopf": [
      "",
      "nehme ich mit",
      "bleibt da",
      "weiß nicht"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "wie gestritten wird",
       "",
       "",
       ""
      ],
      [
       "wie man sich entschuldigt – oder nicht",
       "",
       "",
       ""
      ],
      [
       "wie über Gefühle geredet wird",
       "",
       "",
       ""
      ],
      [
       "wie man zusammenhält",
       "",
       "",
       ""
      ],
      [
       "wie gefeiert wird",
       "",
       "",
       ""
      ],
      [
       "wie mit Geld umgegangen wird",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Du musst nicht die ganze Kiste nehmen. **Du musst nicht werden wie deine Eltern.**",
   "ziel": "Auswählen, was bleibt und was geht.",
   "tipp": "„Weiß nicht“ ist oft die ehrlichste Spalte. Den eigenen Koffer zeigen."
  },
  {
   "titel": "Der Rucksack",
   "icon": "backpack",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "Rucksack, 8 Bücher",
   "bild": "jana:besorgt",
   "schritte": [
    "Kreuz an: Was hast du zu Hause übernommen?",
    "Für jedes Kreuz kommt **ein Buch** in den Rucksack.",
    "Heb ihn hoch. So schwer ist das.",
    "Nimm die Bücher raus, die eigentlich **ein Erwachsener** tragen müsste.",
    "Heb ihn noch einmal."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:users}<span>auf Geschwister aufpassen</span><i></i></div><div>{i:scale}<span>Streit schlichten</span><i></i></div><div>{i:heart}<span>Eltern trösten</span><i></i></div><div>{i:lock}<span>Geheimnisse hüten</span><i></i></div><div>{i:mood-smile}<span>für gute Laune sorgen</span><i></i></div><div>{i:tools-kitchen-2}<span>kochen, putzen, einkaufen</span><i></i></div><div>{i:message-off}<span>für andere lügen</span><i></i></div><div>{i:circle-off}<span>nichts davon</span><i></i></div></div>"
    }
   ],
   "aha": "Nicht alles, was du trägst, **gehört dir.**",
   "ziel": "Die eigene Last spüren – und was davon Erwachsenen gehört.",
   "tipp": "Nicht loben („Du bist so stark“). Fragen: „Wer hier könnte eins von den Büchern nehmen?“ Bei Hinweisen auf Gefährdung: siehe Achtung."
  },
  {
   "titel": "Sätze von zu Hause",
   "icon": "quote",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest die Sätze vor.",
    "Kreuz an: Kennst du den Satz?",
    "Zweites Kreuz: Willst du ihn später **selbst sagen** – oder **nie**?",
    "Dein Gegenüber kreuzt für sich an."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Der Satz:",
     "kopf": [
      "",
      "kenne ich",
      "sage ich später",
      "sage ich nie"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "„Stell dich nicht so an.“",
       "",
       "",
       ""
      ],
      [
       "„Ich bin stolz auf dich.“",
       "",
       "",
       ""
      ],
      [
       "„Das geht keinen etwas an.“",
       "",
       "",
       ""
      ],
      [
       "„Wir schaffen das.“",
       "",
       "",
       ""
      ],
      [
       "„Du bist wie dein Vater.“",
       "",
       "",
       ""
      ],
      [
       "„Hab dich lieb.“",
       "",
       "",
       ""
      ],
      [
       "„Frag nicht so viel.“",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Du entscheidest, **welche Sätze weiterleben.**",
   "ziel": "Sprache von zu Hause bewusst auswählen.",
   "tipp": "Nicht fragen, wer den Satz gesagt hat. Eigene Kreuze ehrlich setzen."
  },
  {
   "titel": "Einmal anders",
   "icon": "refresh",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Kreuz an: Was willst du **anders** machen, als du es gelernt hast?",
    "Probe – **hier, nicht zu Hause:** Dein Gegenüber hat deinen Stift verloren. Spielt es eine Minute.",
    "Mach dabei deine eine Sache anders.",
    "Kreis ein, wie es sich angefühlt hat."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:message-circle}<span>sagen, was mich stört – leise</span><i></i></div><div>{i:ear}<span>zuhören, ohne zu unterbrechen</span><i></i></div><div>{i:heart-handshake}<span>mich entschuldigen, ohne „aber“</span><i></i></div><div>{i:hand-stop}<span>eine Pause machen statt schreien</span><i></i></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Es hat sich angefühlt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "falsch",
        "fremd",
        "gut"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Was du gelernt hast, kannst du umlernen. **Erst fühlt es sich fremd an. Dann normal.**",
   "ziel": "Ein neues Verhalten einmal ausprobieren – an einem harmlosen Beispiel.",
   "tipp": "Das Spiel bleibt beim Stift. Keine Szenen aus der Familie nachspielen."
  },
  {
   "titel": "Mein Platz",
   "icon": "armchair",
   "zeit": "12 Min.",
   "wer": "beide",
   "material": "Stifte",
   "bild": "jana:froh",
   "schritte": [
    "Zeichne einen Platz, an dem es dir **gut geht.** Echt oder ausgedacht.",
    "Strichzeichnung reicht. Drei Minuten.",
    "Kreis ein, was es dort gibt.",
    "Dein Gegenüber zeichnet seinen Platz daneben."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "Mein Platz (links du, rechts dein Gegenüber):",
     "html": "<div class=\"feldbox\" style=\"height:62mm\"></div>"
    },
    {
     "art": "mc",
     "auftrag": "Dort gibt es:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Ruhe",
        "Musik",
        "ein Tier",
        "einen Menschen",
        "Essen",
        "meine Sachen",
        "eine Tür zum Zumachen"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Zuhause ist nicht nur ein Ort von früher. **Es ist auch das, was du dir baust.**",
   "ziel": "Ein Bild von einem guten Ort – als Ziel, nicht als Trost.",
   "tipp": "Nicht deuten. Fragen: „Was davon gibt es hier schon?“"
  }
 ],
 "woche": {
  "titel": "Einmal anders – hier",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Nimm **eine** Sache aus dem Koffer, die „da bleibt“. Oder aus „weiß nicht“.",
   "Mach sie diese Woche einmal bewusst anders. **Hier, nicht zu Hause.**",
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
      "einmal anders gemacht",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "fühlte sich fremd an",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "fühlte sich gut an",
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
      "titel": "Beides stimmt",
      "icon": "home-heart",
      "text": "Ich kann jemanden lieben und wütend auf ihn sein.\nIch kann jemanden vermissen, der mir wehgetan hat.\nIch muss mich nicht entscheiden."
     },
     {
      "titel": "Was ich trage",
      "icon": "backpack",
      "text": "Nicht alles, was ich trage, gehört mir.\nWas kann ein Erwachsener übernehmen?\nWer hier kann das sein?"
     }
    ]
   }
  ],
  "aha": "Fremd heißt nicht falsch. **Fremd heißt neu.**",
  "ziel": "Ein neues Verhalten einmal im Alltag der Einrichtung.",
  "tipp": "Ausdrücklich nicht am Besuchswochenende. Nach diesen Aktionen kann die Stimmung kippen – das Team ohne Inhalte informieren."
 },
 "begleitungAktion": {
  "material": "Stifte, Rucksack, Bücher",
  "achtung": "Schildert der Jugendliche aktuelle Gewalt, Vernachlässigung oder Übergriffe zu Hause – bei sich oder bei Geschwistern –, gilt das Verfahren der Einrichtung zum Kinderschutz; die zuständige Leitung (Responsable) sofort einbeziehen und dem Jugendlichen vorher sagen, was Sie tun. Keine Verschwiegenheit zusagen. Nicht nachbohren, wenn er abbricht. Nach dieser Stunde kann die Stimmung kippen: das Team informieren, dass das Thema bewegt wurde, ohne Inhalte weiterzugeben. Keine Aktion wird zu Hause oder mit der Familie durchgeführt.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #13 Zuhause."
 }
}

export const LEKTIONEN = []
