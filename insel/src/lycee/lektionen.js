// ERZEUGT von tools/sprachen/baue.mjs – nicht von Hand ändern.
export const LEKTIONEN = {
 "deutsch": [
  {
   "nr": 1,
   "titel": "Ich und die anderen",
   "ziele": [
    "Das bin ich",
    "Was machst du gern?",
    "Wer? Wo? Wann?",
    "Nicht heute!",
    "Ich kann das!",
    "Wie spät ist es?",
    "Wo ist die Kantine?",
    "Du bist eingeladen!"
   ],
   "lektionen": [
    {
     "id": "de-m1-das-bin-ich",
     "titel": "Das bin ich",
     "ziel": "Ich stelle mich mit Name, Alter, Wohnort und Vorlieben vor.",
     "merke": {
      "titel": "So stellst du dich vor",
      "punkte": [
       "Ich heiße … oder: Ich bin …",
       "Ich bin … Jahre alt.",
       "Ich wohne in … · Ich komme aus …",
       "Ich mag … · Ich mag … nicht."
      ]
     },
     "ablauf": [
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: sich vorstellen.",
      "Ich heiße … Ich bin … Ich wohne in …",
      "Bei „ich“ endet das Verb meistens auf -e."
     ],
     "rolle": [
      {
       "wer": "noah",
       "sagt": "Hi! Ich bin Noah. Und du?",
       "optionen": [
        "Ich heiße {name}.",
        "Ich heißt {name}.",
        "Ich heißen {name}."
       ],
       "richtig": 0,
       "korrektur": "Ich heiße – mit -e am Ende."
      },
      {
       "wer": "mila",
       "sagt": "Wie alt bist du?",
       "optionen": [
        "Ich bist 13.",
        "Ich bin 13.",
        "Ich ist 13."
       ],
       "richtig": 1,
       "korrektur": "Ich bin, du bist, er ist."
      },
      {
       "wer": "ben",
       "sagt": "Und wo wohnst du?",
       "optionen": [
        "Ich wohnst in Junglinster.",
        "Ich wohnen in Junglinster.",
        "Ich wohne in Junglinster."
       ],
       "richtig": 2,
       "korrektur": "Ich wohne – wieder das -e."
      },
      {
       "wer": "lina",
       "sagt": "(leise) Was magst du?",
       "optionen": [
        "Ich mag Musik.",
        "Ich magst Musik.",
        "Mich mag Musik."
       ],
       "richtig": 0,
       "korrektur": "Ich mag. Ohne -st."
      }
     ],
     "uebung": [
      [
       "Ich ___ Noah. (heißen)",
       "heiße"
      ],
      [
       "Du ___ neu hier. (sein)",
       "bist"
      ],
      [
       "Sie ___ in Echternach. (wohnen)",
       "wohnt"
      ],
      [
       "Ich ___ aus Portugal. (kommen)",
       "komme"
      ],
      [
       "Wie ___ du? (heißen)",
       "heißt"
      ],
      [
       "Er ___ 14 Jahre alt. (sein)",
       "ist"
      ],
      [
       "Wo ___ du? (wohnen)",
       "wohnst"
      ],
      [
       "Ich ___ 13. (sein)",
       "bin"
      ],
      [
       "Woher ___ du? (kommen)",
       "kommst"
      ],
      [
       "Mila ___ Zauberwürfel. (mögen)",
       "mag"
      ],
      [
       "Ich ___ in der 7P2. (sein)",
       "bin"
      ],
      [
       "Lina ___ in Junglinster. (wohnen)",
       "wohnt"
      ]
     ],
     "karte": "Ich heiße, ich bin, ich wohne. Du heißt, du bist, du wohnst."
    },
    {
     "id": "de-m1-hobbys",
     "titel": "Was machst du gern?",
     "ziel": "Ich bilde Verben im Präsens und sage, was ich gern mache.",
     "merke": {
      "titel": "Verben im Präsens",
      "punkte": [
       "ich spiel-e · du spiel-st · er/sie spiel-t",
       "wir spiel-en · ihr spiel-t · sie spiel-en",
       "„gern“ steht nach dem Verb: Ich spiele gern."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Wer? – Welche Verbform passt?",
       "paare": [
        [
         "ich",
         "höre"
        ],
        [
         "du",
         "tanzt"
        ],
        [
         "Lina",
         "zeichnet"
        ],
        [
         "wir",
         "kochen"
        ],
        [
         "ihr",
         "lacht"
        ],
        [
         "Ben und Jo",
         "trainieren"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Thema heute: Hobbys.",
      "ich spiele, du spielst, er spielt.",
      "Und „gern“ kommt nach dem Verb."
     ],
     "rolle": [
      {
       "wer": "ben",
       "sagt": "Was machst du gern in der Pause?",
       "optionen": [
        "Ich spiele gern Basketball.",
        "Ich gern spiele Basketball.",
        "Ich spielst gern Basketball."
       ],
       "richtig": 0,
       "korrektur": "Erst das Verb, dann „gern“: Ich spiele gern …"
      },
      {
       "wer": "ayla",
       "sagt": "Hörst du gern Musik?",
       "optionen": [
        "Ja, ich hört gern Musik.",
        "Ja, ich höre gern Musik.",
        "Ja, ich hören gern Musik."
       ],
       "richtig": 1,
       "korrektur": "ich höre – mit -e."
      },
      {
       "wer": "yusuf",
       "sagt": "Und was macht Lina gern?",
       "optionen": [
        "Sie zeichnen gern.",
        "Sie zeichnest gern.",
        "Sie zeichnet gern."
       ],
       "richtig": 2,
       "korrektur": "sie zeichnet – bei -n vorher ein e."
      }
     ],
     "uebung": [
      [
       "Ben ___ gern Basketball. (spielen)",
       "spielt"
      ],
      [
       "Ich ___ gern Musik. (hören)",
       "höre"
      ],
      [
       "Du ___ gern. (tanzen)",
       "tanzt"
      ],
      [
       "Wir ___ Nudeln. (kochen)",
       "kochen"
      ],
      [
       "Lina ___ Comics. (zeichnen)",
       "zeichnet"
      ],
      [
       "Er ___ am Samstag. (arbeiten)",
       "arbeitet"
      ],
      [
       "Ihr ___ laut. (lachen)",
       "lacht"
      ],
      [
       "Sie ___ Judo. (trainieren, mehrere)",
       "trainieren"
      ],
      [
       "Du ___ viel. (arbeiten)",
       "arbeitest"
      ],
      [
       "Ich ___ gern Fußball. (spielen)",
       "spiele"
      ],
      [
       "Wir ___ zusammen. (lernen)",
       "lernen"
      ],
      [
       "Sie ___ Gitarre. (spielen, eine Person)",
       "spielt"
      ]
     ],
     "karte": "ich -e, du -st, er/sie -t, wir -en. „gern“ steht nach dem Verb."
    },
    {
     "id": "de-m1-w-fragen",
     "titel": "Wer? Wo? Wann?",
     "ziel": "Ich stelle W-Fragen und weiß, wo das Verb steht.",
     "merke": {
      "titel": "W-Fragen",
      "punkte": [
       "Wer? → Person · Was? → Sache · Wo? → Ort",
       "Wann? → Zeit · Wie? → Art · Woher? → Herkunft",
       "Das Verb steht an Stelle 2: Wo wohnst du?"
      ]
     },
     "ablauf": [
      {
       "art": "satzbau",
       "saetze": [
        {
         "woerter": [
          "Wo",
          "wohnst",
          "du?"
         ],
         "tipp": "Zuerst das W-Wort, dann das Verb."
        },
        {
         "woerter": [
          "Wann",
          "beginnt",
          "die",
          "Pause?"
         ],
         "tipp": "W-Wort – Verb – Rest."
        },
        {
         "woerter": [
          "Was",
          "machst",
          "du",
          "gern?"
         ],
         "tipp": "Das Verb steht an Stelle 2."
        },
        {
         "woerter": [
          "Wer",
          "spielt",
          "Bass?"
         ],
         "tipp": "Wer? fragt nach der Person."
        }
       ]
      },
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Ich wohne in Junglinster.",
         "frage": "Welche Frage passt zu der Antwort?",
         "optionen": [
          "Wo wohnst du?",
          "Wann wohnst du?",
          "Wer wohnt du?"
         ],
         "richtig": 0
        },
        {
         "sagen": "Die Pause beginnt um zehn Uhr.",
         "frage": "Welche Frage passt?",
         "optionen": [
          "Wo ist die Pause?",
          "Wann beginnt die Pause?",
          "Was ist die Pause?"
         ],
         "richtig": 1
        },
        {
         "sagen": "Das ist Mme Weber, unsere Klassenlehrerin.",
         "frage": "Welche Frage passt?",
         "optionen": [
          "Wie ist das?",
          "Wo ist sie?",
          "Wer ist das?"
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Wer fragt, erfährt mehr.",
      "Wer? Was? Wo? Wann? Wie?",
      "Das Verb steht an Stelle 2."
     ],
     "rolle": [
      {
       "wer": "jo",
       "sagt": "Frag mich was. Aber richtig.",
       "optionen": [
        "Wo du wohnst?",
        "Wo wohnst du?",
        "Wohnst wo du?"
       ],
       "richtig": 1,
       "korrektur": "Verb an Stelle 2: Wo wohnst du?"
      },
      {
       "wer": "chiara",
       "sagt": "Ich weiß, wann die Pause beginnt. Frag mich!",
       "optionen": [
        "Wann beginnt die Pause?",
        "Wer beginnt die Pause?",
        "Wo beginnt die Pause?"
       ],
       "richtig": 0,
       "korrektur": "Für die Zeit fragt man mit „Wann?“."
      },
      {
       "wer": "kenan",
       "sagt": "Du suchst die Werkstatt?",
       "optionen": [
        "Ja. Was ist die Werkstatt?",
        "Ja. Wie ist die Werkstatt?",
        "Ja. Wo ist die Werkstatt?"
       ],
       "richtig": 2,
       "korrektur": "Ort → „Wo?“."
      }
     ],
     "uebung": [
      [
       "◻ heißt du? – Sam.",
       [
        "Wie",
        "Wo",
        "Wann"
       ],
       "Wie"
      ],
      [
       "◻ wohnst du? – In Junglinster.",
       [
        "Was",
        "Wo",
        "Wer"
       ],
       "Wo"
      ],
      [
       "◻ beginnt Mathe? – Um acht.",
       [
        "Wann",
        "Wie",
        "Wer"
       ],
       "Wann"
      ],
      [
       "◻ spielt Bass? – Ayla.",
       [
        "Was",
        "Wer",
        "Wo"
       ],
       "Wer"
      ],
      [
       "◻ isst du? – Pizza.",
       [
        "Was",
        "Wann",
        "Wie"
       ],
       "Was"
      ],
      [
       "◻ kommst du? – Aus Portugal.",
       [
        "Woher",
        "Wohin",
        "Wann"
       ],
       "Woher"
      ],
      [
       "◻ geht es dir? – Gut.",
       [
        "Wie",
        "Was",
        "Wo"
       ],
       "Wie"
      ],
      [
       "◻ ist der Bus? – An der Haltestelle.",
       [
        "Wann",
        "Wo",
        "Wer"
       ],
       "Wo"
      ],
      [
       "◻ fährt der Bus? – Um 16:05.",
       [
        "Wo",
        "Wann",
        "Was"
       ],
       "Wann"
      ],
      [
       "◻ ist deine Lehrerin? – Mme Weber.",
       [
        "Wer",
        "Wie",
        "Was"
       ],
       "Wer"
      ],
      [
       "◻ machst du am Samstag? – Ich arbeite.",
       [
        "Was",
        "Wer",
        "Wo"
       ],
       "Was"
      ],
      [
       "◻ ist die Kantine? – Im Erdgeschoss.",
       [
        "Wo",
        "Wann",
        "Wie"
       ],
       "Wo"
      ]
     ],
     "karte": "W-Wort + Verb + Rest: Wo wohnst du? Wann beginnt die Pause?"
    },
    {
     "id": "de-m1-nicht",
     "titel": "Nicht heute!",
     "ziel": "Ich verneine Sätze mit „nicht“ und „kein“.",
     "merke": {
      "titel": "nicht oder kein?",
      "punkte": [
       "„nicht“ verneint ein Verb oder ein Adjektiv: Ich komme nicht. Das ist nicht schwer.",
       "„kein“ verneint ein Nomen ohne Artikel oder mit „ein“: Ich habe keine Zeit. Das ist kein Problem.",
       "„nicht“ steht oft am Satzende: Ich mag Fisch nicht."
      ]
     },
     "ablauf": [
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Nein sagen – freundlich und klar.",
      "„nicht“ für Verben: Ich komme nicht.",
      "„kein“ für Nomen: Ich habe keine Zeit."
     ],
     "rolle": [
      {
       "wer": "luca",
       "sagt": "Kommst du mit zum Bäcker?",
       "optionen": [
        "Nein, ich komme nicht.",
        "Nein, ich komme kein.",
        "Nein, ich nicht komme."
       ],
       "richtig": 0,
       "korrektur": "Verb verneinen → „nicht“, am Ende."
      },
      {
       "wer": "dario",
       "sagt": "Hast du zwei Euro?",
       "optionen": [
        "Nein, ich habe nicht Geld.",
        "Nein, ich habe kein Geld.",
        "Nein, ich kein Geld habe."
       ],
       "richtig": 1,
       "korrektur": "Nomen verneinen → „kein“."
      },
      {
       "wer": "ben",
       "sagt": "Ist die Aufgabe schwer?",
       "optionen": [
        "Nein, sie ist keine schwer.",
        "Nein, sie ist nicht schwer.",
        "Nein, nicht sie ist schwer."
       ],
       "richtig": 1,
       "korrektur": "Adjektiv verneinen → „nicht“."
      }
     ],
     "uebung": [
      [
       "Ich habe ◻ Zeit.",
       [
        "nicht",
        "keine"
       ],
       "keine"
      ],
      [
       "Ich komme heute ◻.",
       [
        "nicht",
        "kein"
       ],
       "nicht"
      ],
      [
       "Das ist ◻ Problem.",
       [
        "nicht",
        "kein"
       ],
       "kein"
      ],
      [
       "Das ist ◻ schwer.",
       [
        "nicht",
        "kein"
       ],
       "nicht"
      ],
      [
       "Wir haben ◻ Hausaufgaben.",
       [
        "nicht",
        "keine"
       ],
       "keine"
      ],
      [
       "Sie mag Fisch ◻.",
       [
        "nicht",
        "keinen"
       ],
       "nicht"
      ],
      [
       "Ich habe ◻ Ball.",
       [
        "keinen",
        "nicht"
       ],
       "keinen"
      ],
      [
       "Er hat ◻ Jacke dabei.",
       [
        "keine",
        "nicht"
       ],
       "keine"
      ],
      [
       "Ich habe ◻ Hunger.",
       [
        "keinen",
        "nicht"
       ],
       "keinen"
      ],
      [
       "Er spielt heute ◻.",
       [
        "nicht",
        "kein"
       ],
       "nicht"
      ],
      [
       "Das ist ◻ Witz.",
       [
        "kein",
        "nicht"
       ],
       "kein"
      ],
      [
       "Ich bin ◻ müde.",
       [
        "nicht",
        "kein"
       ],
       "nicht"
      ]
     ],
     "karte": "„ein“ → „kein“. Sonst: „nicht“. Ich habe keine Zeit. Ich komme nicht."
    },
    {
     "id": "de-m1-koennen",
     "titel": "Ich kann das!",
     "ziel": "Ich benutze können, wollen und müssen mit dem Infinitiv am Satzende.",
     "merke": {
      "titel": "Modalverb + Infinitiv",
      "punkte": [
       "können = Fähigkeit · wollen = Wunsch · müssen = Pflicht",
       "ich kann, du kannst, er kann · ich will, du willst, er will · ich muss, du musst, er muss",
       "Das zweite Verb steht am Ende: Ich kann gut schwimmen."
      ]
     },
     "ablauf": [
      {
       "art": "satzbau",
       "saetze": [
        {
         "woerter": [
          "Ich",
          "kann",
          "gut",
          "zeichnen."
         ],
         "tipp": "kann vorne, das zweite Verb ganz am Ende."
        },
        {
         "woerter": [
          "Wir",
          "müssen",
          "heute",
          "lernen."
         ],
         "tipp": "Das Modalverb an Stelle 2."
        },
        {
         "woerter": [
          "Sie",
          "will",
          "Musikerin",
          "werden."
         ],
         "tipp": "„werden“ kommt ans Ende."
        },
        {
         "woerter": [
          "Kannst",
          "du",
          "schwimmen?"
         ],
         "tipp": "Ja/Nein-Frage: Das Verb steht vorne."
        }
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "können, wollen, müssen.",
      "Das zweite Verb steht ganz am Ende.",
      "Ich kann gut zeichnen."
     ],
     "rolle": [
      {
       "wer": "yusuf",
       "sagt": "Kannst du schwimmen?",
       "optionen": [
        "Ja, ich kann schwimmen.",
        "Ja, ich kann schwimme.",
        "Ja, ich schwimmen kann."
       ],
       "richtig": 0,
       "korrektur": "kann + Infinitiv am Ende: schwimmen."
      },
      {
       "wer": "chiara",
       "sagt": "Was musst du heute noch machen?",
       "optionen": [
        "Ich muss Mathe lerne.",
        "Ich lernen muss Mathe.",
        "Ich muss Mathe lernen."
       ],
       "richtig": 2,
       "korrektur": "Ich muss … lernen. Das Verb ans Ende."
      },
      {
       "wer": "ayla",
       "sagt": "Willst du zur Probe kommen?",
       "optionen": [
        "Ja, ich will kommen!",
        "Ja, ich willst kommen!",
        "Ja, ich will komme!"
       ],
       "richtig": 0,
       "korrektur": "ich will – ohne -st."
      }
     ],
     "uebung": [
      [
       "Ich ___ gut zeichnen. (können)",
       "kann"
      ],
      [
       "Du ___ früh aufstehen. (müssen)",
       "musst"
      ],
      [
       "Sie ___ Musikerin werden. (wollen)",
       "will"
      ],
      [
       "Wir ___ heute lernen. (müssen)",
       "müssen"
      ],
      [
       "___ du schwimmen? (können)",
       "Kannst"
      ],
      [
       "Er ___ ein Rad. (wollen)",
       "will"
      ],
      [
       "Ich ___ am Samstag arbeiten. (müssen)",
       "muss"
      ],
      [
       "Ihr ___ gut tanzen. (können)",
       "könnt"
      ],
      [
       "Mila ___ den Würfel lösen. (können)",
       "kann"
      ],
      [
       "Du ___ mitkommen. (wollen)",
       "willst"
      ],
      [
       "Ben ___ nicht kommen. (können)",
       "kann"
      ],
      [
       "Wir ___ ins Kino gehen. (wollen)",
       "wollen"
      ]
     ],
     "karte": "Ich kann / will / muss + … + Verb am Ende: Ich kann gut zeichnen."
    },
    {
     "id": "de-m1-uhrzeit",
     "titel": "Wie spät ist es?",
     "ziel": "Ich frage höflich nach der Uhrzeit und erzähle meinen Schultag.",
     "merke": {
      "titel": "Uhrzeit",
      "punkte": [
       "7:15 = Viertel nach sieben · 7:30 = halb acht (!)",
       "7:45 = Viertel vor acht · 7:05 = fünf nach sieben",
       "Höflich fragen: Entschuldigung, wie spät ist es?",
       "Wann? → um: Die Schule beginnt um acht."
      ]
     },
     "ablauf": [
      {
       "art": "uhr",
       "items": [
        {
         "zeit": "7:30",
         "optionen": [
          "halb acht",
          "halb sieben",
          "acht Uhr dreißig"
         ],
         "richtig": 0,
         "hinweis": "halb = eine halbe Stunde vor"
        },
        {
         "zeit": "8:15",
         "optionen": [
          "Viertel vor acht",
          "Viertel nach acht",
          "halb neun"
         ],
         "richtig": 1
        },
        {
         "zeit": "9:45",
         "optionen": [
          "Viertel nach neun",
          "halb zehn",
          "Viertel vor zehn"
         ],
         "richtig": 2
        },
        {
         "zeit": "12:30",
         "optionen": [
          "halb eins",
          "halb zwölf",
          "zwölf Uhr"
         ],
         "richtig": 0
        },
        {
         "zeit": "4:10",
         "optionen": [
          "zehn vor vier",
          "zehn nach vier",
          "zehn nach fünf"
         ],
         "richtig": 1
        }
       ]
      },
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Achtung: Der Bus nach Junglinster fährt heute um Viertel nach vier.",
         "frage": "Wann fährt der Bus?",
         "optionen": [
          "4:15",
          "3:45",
          "4:30"
         ],
         "richtig": 0
        },
        {
         "sagen": "Die Kantine ist von halb zwölf bis halb zwei geöffnet.",
         "frage": "Ab wann ist die Kantine offen?",
         "optionen": [
          "12:30",
          "11:30",
          "11:00"
         ],
         "richtig": 1
        },
        {
         "sagen": "Der Mathetest beginnt um Viertel vor neun.",
         "frage": "Wann beginnt der Test?",
         "optionen": [
          "9:15",
          "9:45",
          "8:45"
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Wie spät ist es?",
      "Achtung: halb acht ist 7:30!",
      "Höflich: Entschuldigung, wie spät ist es?"
     ],
     "rolle": [
      {
       "wer": "noah",
       "sagt": "Der Bus kommt um 7:30. Wie sagt man das?",
       "optionen": [
        "Um halb acht.",
        "Um halb sieben.",
        "Um acht und halb."
       ],
       "richtig": 0,
       "korrektur": "7:30 = halb acht. Halb zur nächsten Stunde."
      },
      {
       "wer": "weber",
       "sagt": "Du willst die Uhrzeit wissen. Wie fragst du?",
       "optionen": [
        "Uhrzeit!",
        "Entschuldigung, wie spät ist es?",
        "Wie spät du?"
       ],
       "richtig": 1,
       "korrektur": "Höflich: Entschuldigung, wie spät ist es?"
      },
      {
       "wer": "ben",
       "sagt": "Tischtennis? Viertel nach vier?",
       "optionen": [
        "Gut, um 4:45.",
        "Gut, um 4:15.",
        "Gut, um 3:45."
       ],
       "richtig": 1,
       "korrektur": "Viertel nach vier = 4:15."
      }
     ],
     "uebung": [
      [
       "7:30 = ◻ acht",
       [
        "halb",
        "Viertel vor"
       ],
       "halb"
      ],
      [
       "8:15 = Viertel ◻ acht",
       [
        "nach",
        "vor"
       ],
       "nach"
      ],
      [
       "9:45 = Viertel ◻ zehn",
       [
        "vor",
        "nach"
       ],
       "vor"
      ],
      [
       "12:30 = halb ◻",
       [
        "eins",
        "zwölf"
       ],
       "eins"
      ],
      [
       "6:45 = Viertel vor ◻",
       [
        "sieben",
        "sechs"
       ],
       "sieben"
      ],
      [
       "4:10 = zehn ◻ vier",
       [
        "nach",
        "vor"
       ],
       "nach"
      ],
      [
       "halb drei = ◻",
       [
        "2:30",
        "3:30"
       ],
       "2:30"
      ],
      [
       "Viertel nach elf = ◻",
       [
        "11:15",
        "10:45"
       ],
       "11:15"
      ],
      [
       "Die Schule beginnt ◻ acht.",
       [
        "um",
        "an"
       ],
       "um"
      ],
      [
       "fünf vor zwölf = ◻",
       [
        "11:55",
        "12:05"
       ],
       "11:55"
      ],
      [
       "halb sieben = ◻",
       [
        "6:30",
        "7:30"
       ],
       "6:30"
      ],
      [
       "Viertel vor neun = ◻",
       [
        "8:45",
        "9:15"
       ],
       "8:45"
      ]
     ],
     "karte": "halb acht = 7:30 · Viertel nach acht = 8:15 · Viertel vor neun = 8:45."
    },
    {
     "id": "de-m1-weg",
     "titel": "Wo ist die Kantine?",
     "ziel": "Ich frage nach dem Weg und beschreibe einen Weg in der Schule.",
     "merke": {
      "titel": "Wege beschreiben",
      "punkte": [
       "Geh geradeaus / nach links / nach rechts.",
       "Die Kantine ist neben der Halle / hinter der Tür / zwischen Saal 1 und 2.",
       "Fragen: Entschuldigung, wo ist …? Wie komme ich zu …?"
      ]
     },
     "ablauf": [
      {
       "art": "weg",
       "schritte": [
        {
         "sagen": "Geh aus dem Saal in den Gang.",
         "x": -21,
         "z": -16,
         "r": 1.8
        },
        {
         "sagen": "Geh im Gang nach links bis zur Halle.",
         "x": 0,
         "z": -15.5,
         "r": 3
        },
        {
         "sagen": "Geh geradeaus weiter. Die erste Tür rechts ist die Kantine.",
         "x": 12,
         "z": -11.5,
         "r": 2.6
        }
       ],
       "ende": [
        [
         "noah",
         "Da bist du ja! Danke für die Wegbeschreibung."
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Wege beschreiben.",
      "links, rechts, geradeaus.",
      "neben, hinter, zwischen."
     ],
     "rolle": [
      {
       "wer": "noah",
       "sagt": "Ich finde die Kantine nicht …",
       "optionen": [
        "Geh geradeaus, dann rechts.",
        "Gehen geradeaus, rechts dann.",
        "Du geradeaus rechts."
       ],
       "richtig": 0,
       "korrektur": "Geh geradeaus, dann rechts."
      },
      {
       "wer": "mila",
       "sagt": "Wo ist das Sekretariat?",
       "optionen": [
        "Zwischen der Halle.",
        "Neben der Halle.",
        "Hinter geradeaus."
       ],
       "richtig": 1,
       "korrektur": "„zwischen“ braucht zwei Dinge. Hier: neben der Halle."
      },
      {
       "wer": "kenan",
       "sagt": "Wie fragst du höflich nach der Werkstatt?",
       "optionen": [
        "Werkstatt, wo?",
        "Entschuldigung, wie komme ich zur Werkstatt?",
        "Zeig Werkstatt!"
       ],
       "richtig": 1,
       "korrektur": "Höflich: Entschuldigung, wie komme ich zu …?"
      }
     ],
     "uebung": [
      [
       "Geh ◻ bis zur Treppe.",
       [
        "geradeaus",
        "zwischen"
       ],
       "geradeaus"
      ],
      [
       "Das Sekretariat ist ◻ der Halle.",
       [
        "neben",
        "links"
       ],
       "neben"
      ],
      [
       "Die Kantine liegt ◻ dem Gang und dem Hof.",
       [
        "zwischen",
        "hinter"
       ],
       "zwischen"
      ],
      [
       "Bieg nach ◻ ab. (→)",
       [
        "rechts",
        "links"
       ],
       "rechts"
      ],
      [
       "Bieg nach ◻ ab. (←)",
       [
        "links",
        "rechts"
       ],
       "links"
      ],
      [
       "Die Toilette ist ◻ der Tür.",
       [
        "hinter",
        "geradeaus"
       ],
       "hinter"
      ],
      [
       "◻, wo ist die Kantine?",
       [
        "Entschuldigung",
        "Hallo du"
       ],
       "Entschuldigung"
      ],
      [
       "Wie komme ich ◻ Turnhalle?",
       [
        "zur",
        "in"
       ],
       "zur"
      ],
      [
       "Die Halle ist vorne – also ◻.",
       [
        "geradeaus",
        "hinter"
       ],
       "geradeaus"
      ],
      [
       "Der Hof ist ◻ dem Haus. (davor)",
       [
        "vor",
        "neben"
       ],
       "vor"
      ],
      [
       "Geh die ◻ hoch.",
       [
        "Treppe",
        "Halle"
       ],
       "Treppe"
      ],
      [
       "Das CDI ist ◻ dem Lehrerzimmer.",
       [
        "neben",
        "geradeaus"
       ],
       "neben"
      ]
     ],
     "karte": "Geh geradeaus / nach links / nach rechts. Neben, hinter, vor, zwischen."
    },
    {
     "id": "de-m1-einladung",
     "titel": "Du bist eingeladen!",
     "ziel": "Ich schreibe eine kurze Einladung und schreibe Nomen groß.",
     "merke": {
      "titel": "Einladung schreiben",
      "punkte": [
       "Anrede: Hallo …, / Liebe …, / Lieber …,",
       "Was – Wann – Wo – (Was mitbringen?)",
       "Gruß und Name: Bis bald! Dein … / Deine …",
       "Nomen schreibt man groß: die Party, der Samstag, das Spiel."
      ]
     },
     "ablauf": [
      {
       "art": "gross",
       "saetze": [
        {
         "woerter": [
          "Am",
          "Samstag",
          "ist",
          "die",
          "Party",
          "im",
          "Hof."
         ]
        },
        {
         "woerter": [
          "Ben",
          "bringt",
          "den",
          "Ball",
          "und",
          "Wasser",
          "mit."
         ]
        },
        {
         "woerter": [
          "Wir",
          "treffen",
          "uns",
          "um",
          "vier",
          "am",
          "Tor."
         ]
        },
        {
         "woerter": [
          "Das",
          "Konzert",
          "ist",
          "schön",
          "und",
          "laut."
         ]
        }
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Eine Einladung: Was? Wann? Wo? Wer?",
      "Nomen schreibt man groß.",
      "die Party, der Samstag, das Spiel."
     ],
     "rolle": [
      {
       "wer": "ayla",
       "sagt": "Ich lade zum Konzert ein. Was fehlt noch?",
       "optionen": [
        "Wann und wo.",
        "Nichts.",
        "Mein Lieblingsessen."
       ],
       "richtig": 0,
       "korrektur": "Ohne Zeit und Ort kommt keiner."
      },
      {
       "wer": "lina",
       "sagt": "Schreibt man „samstag“ groß?",
       "optionen": [
        "Nein, klein.",
        "Ja: Samstag. Es ist ein Nomen.",
        "Nur am Satzende."
       ],
       "richtig": 1,
       "korrektur": "der Samstag → Nomen → groß."
      },
      {
       "wer": "jo",
       "sagt": "Wie fange ich die Einladung an?",
       "optionen": [
        "Hallo Ben,",
        "Tschüss Ben,",
        "Ben, Ende."
       ],
       "richtig": 0,
       "korrektur": "Anrede: Hallo … oder Lieber …"
      }
     ],
     "uebung": [
      [
       "die ◻ (Party)",
       [
        "Party",
        "party"
       ],
       "Party"
      ],
      [
       "am ◻ (Samstag)",
       [
        "Samstag",
        "samstag"
       ],
       "Samstag"
      ],
      [
       "wir ◻ (spielen)",
       [
        "spielen",
        "Spielen"
       ],
       "spielen"
      ],
      [
       "im ◻ (Hof)",
       [
        "Hof",
        "hof"
       ],
       "Hof"
      ],
      [
       "das ist ◻ (schön)",
       [
        "schön",
        "Schön"
       ],
       "schön"
      ],
      [
       "das ◻ (Konzert)",
       [
        "Konzert",
        "konzert"
       ],
       "Konzert"
      ],
      [
       "Was fehlt? „Komm zur Party!“ – ◻",
       [
        "Wann und wo",
        "Nichts"
       ],
       "Wann und wo"
      ],
      [
       "Anrede: ◻ Mila,",
       [
        "Liebe",
        "Tschüss"
       ],
       "Liebe"
      ],
      [
       "Gruß: ◻ Samstag!",
       [
        "Bis",
        "Hallo"
       ],
       "Bis"
      ],
      [
       "eine ◻ (Einladung)",
       [
        "Einladung",
        "einladung"
       ],
       "Einladung"
      ],
      [
       "wir ◻ (treffen) uns",
       [
        "treffen",
        "Treffen"
       ],
       "treffen"
      ],
      [
       "der ◻ (Geburtstag)",
       [
        "Geburtstag",
        "geburtstag"
       ],
       "Geburtstag"
      ]
     ],
     "karte": "Einladung = Was + Wann + Wo + Wer. Nomen groß: die Party, der Samstag."
    }
   ]
  },
  {
   "nr": 2,
   "titel": "Stadt, Sport und große Ideen",
   "ziele": [
    "Unterwegs in der Stadt",
    "Geh geradeaus!",
    "Bahn + Hof = Bahnhof",
    "Punkt, Frage, Ausruf",
    "Was hast du gemacht?",
    "Ich bin gefahren",
    "Wer hat das erfunden?",
    "Gib ihm den Ball!"
   ],
   "lektionen": [
    {
     "id": "de-m2-stadt",
     "titel": "Unterwegs in der Stadt",
     "ziel": "Ich lese einen Stadtplan und sage, wo etwas ist.",
     "merke": {
      "titel": "Einen Stadtplan lesen",
      "punkte": [
       "Die Legende erklärt die Symbole: H = Haltestelle, P = Parkplatz, i = Information.",
       "Das Straßenverzeichnis nennt das Feld: Bahnhofstraße → C2.",
       "Buchstabe = Spalte, Zahl = Zeile. Wo sie sich treffen, suchst du.",
       "Wo ist es? neben dem Bahnhof · zwischen dem Park und dem Bahnhof."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Welches Symbol gehört zu welchem Ort?",
       "paare": [
        [
         "🚉",
         "der Bahnhof"
        ],
        [
         "🚏",
         "die Haltestelle"
        ],
        [
         "🅿️",
         "der Parkplatz"
        ],
        [
         "ℹ️",
         "die Information"
        ],
        [
         "🏊",
         "das Schwimmbad"
        ],
        [
         "📮",
         "die Post"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: eine fremde Stadt.",
      "Stadtplan, Symbole, Felder wie B2.",
      "Und: neben und zwischen."
     ],
     "rolle": [
      {
       "wer": "chiara",
       "sagt": "Ausflug nach Trier! Wo treffen wir uns?",
       "optionen": [
        "Am Bahnhof.",
        "Bahnhof wo.",
        "In Bahnhof gehen."
       ],
       "richtig": 0,
       "korrektur": "Kurz und klar: Am Bahnhof."
      },
      {
       "wer": "noah",
       "sagt": "Wo ist die Post auf dem Plan?",
       "optionen": [
        "Auf Feld drei B.",
        "In Feld B3.",
        "Bei B mit drei."
       ],
       "richtig": 1,
       "korrektur": "Erst der Buchstabe, dann die Zahl: B3."
      },
      {
       "wer": "jo",
       "sagt": "Und das Rathaus?",
       "optionen": [
        "Zwischen der Park und der Bahnhof.",
        "Zwischen Park Bahnhof.",
        "Zwischen dem Park und dem Bahnhof."
       ],
       "richtig": 2,
       "korrektur": "zwischen dem Park und dem Bahnhof."
      },
      {
       "wer": "ayla",
       "sagt": "Ich brauche Pflaster. Wo bekomme ich die?",
       "optionen": [
        "In der Apotheke, in C3.",
        "Im Museum, in A1.",
        "Auf der Post, in B3."
       ],
       "richtig": 0,
       "korrektur": "Pflaster gibt es in der Apotheke."
      }
     ],
     "uebung": [
      [
       "Briefe schickt man auf der ◻ ab.",
       [
        "Post",
        "Kirche",
        "Schule"
       ],
       "Post"
      ],
      [
       "Den Zug nimmt man am ◻.",
       [
        "Bahnhof",
        "Park",
        "Rathaus"
       ],
       "Bahnhof"
      ],
      [
       "Pflaster kauft man in der ◻.",
       [
        "Apotheke",
        "Schule",
        "Post"
       ],
       "Apotheke"
      ],
      [
       "Bilder sieht man im ◻.",
       [
        "Museum",
        "Bahnhof",
        "Schwimmbad"
       ],
       "Museum"
      ],
      [
       "Schwimmen kann man im ◻.",
       [
        "Schwimmbad",
        "Rathaus",
        "Museum"
       ],
       "Schwimmbad"
      ],
      [
       "Einen Stadtplan bekommt man in der ◻.",
       [
        "Information",
        "Apotheke",
        "Kirche"
       ],
       "Information"
      ],
      [
       "Das Rathaus ist ◻ dem Park und dem Bahnhof.",
       [
        "zwischen",
        "neben",
        "unter"
       ],
       "zwischen"
      ],
      [
       "Die Kirche ist ◻ dem Museum.",
       [
        "neben",
        "zwischen",
        "in"
       ],
       "neben"
      ],
      [
       "Feld B2: zuerst der ◻, dann die Zahl.",
       [
        "Buchstabe",
        "Name",
        "Punkt"
       ],
       "Buchstabe"
      ],
      [
       "Die Symbole erklärt die ◻.",
       [
        "Legende",
        "Straße",
        "Post"
       ],
       "Legende"
      ],
      [
       "H auf dem Plan heißt: Hier ist eine ◻.",
       [
        "Haltestelle",
        "Halle",
        "Hose"
       ],
       "Haltestelle"
      ],
      [
       "P auf dem Plan heißt: Hier ist ein ◻.",
       [
        "Parkplatz",
        "Park",
        "Paket"
       ],
       "Parkplatz"
      ]
     ],
     "karte": "Stadtplan: Legende lesen, Feld suchen (B2). Das Rathaus ist zwischen dem Park und dem Bahnhof."
    },
    {
     "id": "de-m2-imperativ",
     "titel": "Geh geradeaus!",
     "ziel": "Ich erkläre einen Weg mit dem Imperativ – für du, ihr und Sie.",
     "merke": {
      "titel": "Der Imperativ",
      "punkte": [
       "du: du gehst → Geh! (ohne du, ohne -st)",
       "ihr: ihr geht → Geht! (ohne ihr)",
       "Sie: Gehen Sie! (Sie bleibt – höflich)",
       "Mit „bitte“ klingt es freundlich: Komm bitte mit!"
      ]
     },
     "ablauf": [
      {
       "art": "weg",
       "intro": "Ben wartet am Korbballfeld. Folge meinen Anweisungen!",
       "schritte": [
        {
         "sagen": "Geh aus dem Saal in den Gang.",
         "x": -21,
         "z": -16,
         "r": 1.8
        },
        {
         "sagen": "Geh im Gang nach links bis zur Halle.",
         "x": 0,
         "z": -15.5,
         "r": 3
        },
        {
         "sagen": "Geh durch die Halle und hinaus auf den Hof.",
         "x": 0,
         "z": 3.5,
         "r": 3
        },
        {
         "sagen": "Geh über den Hof zum Korbballfeld.",
         "x": 29,
         "z": 19,
         "r": 5
        }
       ],
       "ende": [
        [
         "ben",
         "Da bist du ja! Hier, wirf mal!"
        ],
        [
         "ben",
         "Geh, komm, wirf: Das ist der Imperativ."
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Wege erklären.",
      "Geh! Geht! Gehen Sie!",
      "Ohne du, ohne -st."
     ],
     "rolle": [
      {
       "wer": "noah",
       "sagt": "Wie komme ich zur Turnhalle?",
       "optionen": [
        "Gehst über den Hof, dann rechts.",
        "Geh über den Hof, dann rechts.",
        "Du gehen über den Hof."
       ],
       "richtig": 1,
       "korrektur": "Imperativ: Geh! – ohne du, ohne -st."
      },
      {
       "wer": "mila",
       "sagt": "Ich muss zum Bahnhof. Welcher Bus?",
       "optionen": [
        "Nehm den Bus 110.",
        "Nimmst den Bus 110.",
        "Nimm den Bus 110."
       ],
       "richtig": 2,
       "korrektur": "nehmen → du nimmst → Nimm!"
      },
      {
       "wer": "jo",
       "sagt": "Ben und ich suchen das Korbballfeld.",
       "optionen": [
        "Geht über den Hof!",
        "Gehen über den Hof!",
        "Geh ihr über den Hof!"
       ],
       "richtig": 0,
       "korrektur": "Zu zwei Personen: Geht!"
      },
      {
       "wer": "sommer",
       "sagt": "Wo ist hier die Turnhalle?",
       "optionen": [
        "Geh da rechts.",
        "Gehen Sie bitte rechts.",
        "Geht rechts."
       ],
       "richtig": 1,
       "korrektur": "Zu Erwachsenen höflich: Gehen Sie bitte …"
      }
     ],
     "uebung": [
      [
       "___ geradeaus! (gehen, du)",
       "Geh"
      ],
      [
       "___ bitte mit! (kommen, du)",
       "Komm"
      ],
      [
       "___ den Bus! (nehmen, du)",
       "Nimm"
      ],
      [
       "___ den Plan! (lesen, du)",
       "Lies"
      ],
      [
       "___ an der Ampel! (warten, du)",
       "Warte"
      ],
      [
       "___ langsam! (fahren, du)",
       "Fahr"
      ],
      [
       "___ zusammen! (gehen, ihr)",
       "Geht"
      ],
      [
       "___ bitte leise! (sein, du)",
       "Sei"
      ],
      [
       "___ Sie bitte links! (gehen)",
       "Gehen"
      ],
      [
       "___ Sie die Linie 110! (nehmen)",
       "Nehmen"
      ],
      [
       "___ hier! (warten, ihr)",
       "Wartet"
      ],
      [
       "___ den Ball! (werfen, du)",
       "Wirf"
      ]
     ],
     "karte": "Imperativ: Geh! (du) · Geht! (ihr) · Gehen Sie! (höflich). nehmen → Nimm!"
    },
    {
     "id": "de-m2-komposita",
     "titel": "Bahn + Hof = Bahnhof",
     "ziel": "Ich baue Wörter aus zwei Nomen und finde den richtigen Artikel.",
     "merke": {
      "titel": "Zusammengesetzte Nomen",
      "punkte": [
       "Das erste Wort sagt, welche Art: der Fußball = ein Ball für den Fuß.",
       "Das letzte Wort bestimmt den Artikel: die Bahn + der Hof = der Bahnhof.",
       "Manchmal kommt ein -s- oder -n- dazwischen: die Geburtstagskarte, das Klassenzimmer.",
       "Man schreibt sie zusammen und groß."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Welche Teile ergeben ein Wort?",
       "paare": [
        [
         "Fuß",
         "ball"
        ],
        [
         "Bahn",
         "hof"
        ],
        [
         "Stadt",
         "plan"
        ],
        [
         "Tisch",
         "tennis"
        ],
        [
         "Kopf",
         "hörer"
        ],
        [
         "Mittag",
         "essen"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Wörter bauen.",
      "Bahn plus Hof gibt Bahnhof.",
      "Das letzte Wort bestimmt den Artikel."
     ],
     "rolle": [
      {
       "wer": "ben",
       "sagt": "Wie heißt das Ding? Ein Ball für den Fuß.",
       "optionen": [
        "die Fußball",
        "der Fußball",
        "das Ballfuß"
       ],
       "richtig": 1,
       "korrektur": "Der Ball bestimmt: der Fußball."
      },
      {
       "wer": "ayla",
       "sagt": "Und das für die Ohren? Kopf und Hörer.",
       "optionen": [
        "der Kopfhörer",
        "das Kopfhörer",
        "die Hörerkopf"
       ],
       "richtig": 0,
       "korrektur": "der Hörer → der Kopfhörer."
      },
      {
       "wer": "kenan",
       "sagt": "Wo spielen wir Tischtennis? An der …",
       "optionen": [
        "Platte Tisch Tennis.",
        "Tischtennisplatte.",
        "Tennistischplatte."
       ],
       "richtig": 1,
       "korrektur": "Zusammen und groß: die Tischtennisplatte."
      }
     ],
     "uebung": [
      [
       "◻ Fußball",
       [
        "der",
        "die",
        "das"
       ],
       "der"
      ],
      [
       "◻ Turnhalle",
       [
        "der",
        "die",
        "das"
       ],
       "die"
      ],
      [
       "◻ Bahnhof",
       [
        "der",
        "die",
        "das"
       ],
       "der"
      ],
      [
       "◻ Klassenzimmer",
       [
        "der",
        "die",
        "das"
       ],
       "das"
      ],
      [
       "◻ Bushaltestelle",
       [
        "der",
        "die",
        "das"
       ],
       "die"
      ],
      [
       "◻ Stadtplan",
       [
        "der",
        "die",
        "das"
       ],
       "der"
      ],
      [
       "◻ Hausaufgabe",
       [
        "der",
        "die",
        "das"
       ],
       "die"
      ],
      [
       "◻ Handyspiel",
       [
        "der",
        "die",
        "das"
       ],
       "das"
      ],
      [
       "◻ Schulhof",
       [
        "der",
        "die",
        "das"
       ],
       "der"
      ],
      [
       "◻ Tischtennisplatte",
       [
        "der",
        "die",
        "das"
       ],
       "die"
      ],
      [
       "◻ Fahrrad",
       [
        "der",
        "die",
        "das"
       ],
       "das"
      ],
      [
       "◻ Mittagessen",
       [
        "der",
        "die",
        "das"
       ],
       "das"
      ]
     ],
     "karte": "Das letzte Wort bestimmt den Artikel: die Bahn + der Hof = der Bahnhof."
    },
    {
     "id": "de-m2-satzzeichen",
     "titel": "Punkt, Frage, Ausruf",
     "ziel": "Ich höre, ob ein Satz eine Aussage, eine Frage oder eine Aufforderung ist, und setze . ? ! richtig.",
     "merke": {
      "titel": "Satzmelodie und Satzzeichen",
      "punkte": [
       "Aussage: Die Stimme geht am Ende nach unten. Am Ende steht ein Punkt (.)",
       "Frage: Die Stimme geht am Ende nach oben. Am Ende steht ein Fragezeichen (?)",
       "Aufforderung oder starkes Gefühl: Ausrufezeichen (!)",
       "Nach . ? ! schreibt man groß weiter."
      ]
     },
     "ablauf": [
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Kommst du heute mit zum Training?",
         "frage": "Was hörst du?",
         "optionen": [
          "eine Frage",
          "eine Aussage",
          "eine Aufforderung"
         ],
         "richtig": 0
        },
        {
         "sagen": "Das Training beginnt um vier Uhr.",
         "frage": "Was hörst du?",
         "optionen": [
          "eine Frage",
          "eine Aussage",
          "eine Aufforderung"
         ],
         "richtig": 1
        },
        {
         "sagen": "Pass auf, der Ball!",
         "frage": "Was hörst du?",
         "optionen": [
          "eine Frage",
          "eine Aussage",
          "eine Aufforderung"
         ],
         "richtig": 2
        },
        {
         "sagen": "Hast du deine Sportschuhe dabei?",
         "frage": "Was hörst du?",
         "optionen": [
          "eine Frage",
          "eine Aussage",
          "eine Aufforderung"
         ],
         "richtig": 0
        }
       ]
      },
      {
       "art": "gross",
       "saetze": [
        {
         "woerter": [
          "Das",
          "Spiel",
          "ist",
          "vorbei.",
          "Wir",
          "haben",
          "gewonnen!"
         ]
        },
        {
         "woerter": [
          "Kommst",
          "du",
          "morgen?",
          "Der",
          "Trainer",
          "wartet."
         ]
        },
        {
         "woerter": [
          "Pass",
          "auf!",
          "Der",
          "Ball",
          "kommt."
         ]
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Hör auf die Stimme.",
      "Frage: Stimme nach oben.",
      "Aussage: Stimme nach unten."
     ],
     "rolle": [
      {
       "wer": "ben",
       "sagt": "Was steht am Ende von meiner Frage?",
       "optionen": [
        "Ein Fragezeichen.",
        "Ein Punkt.",
        "Ein Komma."
       ],
       "richtig": 0,
       "korrektur": "Frage → Fragezeichen."
      },
      {
       "wer": "lina",
       "sagt": "(leise) Nach dem Punkt: groß oder klein?",
       "optionen": [
        "Klein weiter.",
        "Groß weiter.",
        "Egal."
       ],
       "richtig": 1,
       "korrektur": "Nach . ? ! schreibt man groß."
      },
      {
       "wer": "jo",
       "sagt": "Pass auf! – Was ist das für ein Satz?",
       "optionen": [
        "Eine Aufforderung.",
        "Eine Frage.",
        "Eine Aussage."
       ],
       "richtig": 0,
       "korrektur": "Pass auf! – das ist eine Aufforderung."
      }
     ],
     "uebung": [
      [
       "Wann beginnt das Training◻",
       [
        ".",
        "?",
        "!"
       ],
       "?"
      ],
      [
       "Ich spiele gern Korbball◻",
       [
        ".",
        "?",
        "!"
       ],
       "."
      ],
      [
       "Pass auf◻",
       [
        ".",
        "?",
        "!"
       ],
       "!"
      ],
      [
       "Hast du deine Schuhe◻",
       [
        ".",
        "?",
        "!"
       ],
       "?"
      ],
      [
       "Das Spiel ist um vier◻",
       [
        ".",
        "?",
        "!"
       ],
       "."
      ],
      [
       "Wow, was für ein Wurf◻",
       [
        ".",
        "?",
        "!"
       ],
       "!"
      ],
      [
       "Wo ist die Turnhalle◻",
       [
        ".",
        "?",
        "!"
       ],
       "?"
      ],
      [
       "Die Turnhalle ist neben dem Hof◻",
       [
        ".",
        "?",
        "!"
       ],
       "."
      ],
      [
       "Komm schnell◻",
       [
        ".",
        "?",
        "!"
       ],
       "!"
      ],
      [
       "Wer hat gewonnen◻",
       [
        ".",
        "?",
        "!"
       ],
       "?"
      ],
      [
       "Das Training dauert eine Stunde◻",
       [
        ".",
        "?",
        "!"
       ],
       "."
      ],
      [
       "Hör auf◻",
       [
        ".",
        "?",
        "!"
       ],
       "!"
      ]
     ],
     "karte": "Aussage: Punkt. Frage: Fragezeichen? Aufforderung: Ausrufezeichen! Danach groß."
    },
    {
     "id": "de-m2-perfekt-haben",
     "titel": "Was hast du gemacht?",
     "ziel": "Ich erzähle mit dem Perfekt, was ich gemacht habe.",
     "merke": {
      "titel": "Perfekt mit haben",
      "punkte": [
       "haben an Stelle 2, das Partizip ganz am Ende: Ich habe Korbball gespielt.",
       "Regelmäßige Verben: ge- + Stamm + -t: spielen → gespielt.",
       "Stamm auf -t oder -d: ge- … -et: arbeiten → gearbeitet.",
       "Verben auf -ieren ohne ge-: telefonieren → telefoniert."
      ]
     },
     "ablauf": [
      {
       "art": "satzbau",
       "saetze": [
        {
         "woerter": [
          "Ich",
          "habe",
          "Korbball",
          "gespielt."
         ],
         "tipp": "habe an Stelle 2, das Partizip ans Ende."
        },
        {
         "woerter": [
          "Wir",
          "haben",
          "Musik",
          "gehört."
         ],
         "tipp": "Das Partizip steht ganz am Ende."
        },
        {
         "woerter": [
          "Hast",
          "du",
          "viel",
          "gelernt?"
         ],
         "tipp": "Ja/Nein-Frage: Das Verb kommt zuerst."
        },
        {
         "woerter": [
          "Am",
          "Samstag",
          "hat",
          "Kenan",
          "gearbeitet."
         ],
         "tipp": "Auch nach „Am Samstag“: Verb an Stelle 2."
        }
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: von gestern erzählen.",
      "Ich habe … gespielt.",
      "haben vorne, Partizip am Ende."
     ],
     "rolle": [
      {
       "wer": "dario",
       "sagt": "Und? Was hast du am Wochenende gemacht?",
       "optionen": [
        "Ich habe Fußball spielt.",
        "Ich habe Fußball gespielt.",
        "Ich habe gespielt Fußball."
       ],
       "richtig": 1,
       "korrektur": "Partizip ans Ende: … Fußball gespielt."
      },
      {
       "wer": "chiara",
       "sagt": "Ich habe ein Regal gebaut. Und du?",
       "optionen": [
        "Ich hat Pasta gekocht.",
        "Ich habe Pasta kochte.",
        "Ich habe Pasta gekocht."
       ],
       "richtig": 2,
       "korrektur": "ich habe … gekocht."
      },
      {
       "wer": "yusuf",
       "sagt": "Hm. Hast du gelernt?",
       "optionen": [
        "Ja, ich habe gelernt.",
        "Ja, ich habe gelernen.",
        "Ja, ich gelernt habe."
       ],
       "richtig": 0,
       "korrektur": "lernen → gelernt."
      }
     ],
     "uebung": [
      [
       "Ich habe Korbball ___. (spielen)",
       "gespielt"
      ],
      [
       "Wir haben Musik ___. (hören)",
       "gehört"
      ],
      [
       "Hast du alles ___? (machen)",
       "gemacht"
      ],
      [
       "Mila hat Brot ___. (kaufen)",
       "gekauft"
      ],
      [
       "Kenan hat lange ___. (arbeiten)",
       "gearbeitet"
      ],
      [
       "Ich habe mit Ben ___. (telefonieren)",
       "telefoniert"
      ],
      [
       "Ayla ___ Bass geübt. (haben)",
       "hat"
      ],
      [
       "Wir ___ Pasta gekocht. (haben)",
       "haben"
      ],
      [
       "Du ___ viel gelernt. (haben)",
       "hast"
      ],
      [
       "Lina hat ein Bild ___. (malen)",
       "gemalt"
      ],
      [
       "Ihr ___ getanzt. (haben)",
       "habt"
      ],
      [
       "Jo hat das Fahrrad ___. (putzen)",
       "geputzt"
      ]
     ],
     "karte": "Perfekt: haben + ge…t am Ende. Ich habe Korbball gespielt."
    },
    {
     "id": "de-m2-perfekt-sein",
     "titel": "Ich bin gefahren",
     "ziel": "Ich weiß, wann das Perfekt mit „sein“ gebildet wird, und kenne wichtige unregelmäßige Partizipien.",
     "merke": {
      "titel": "sein oder haben?",
      "punkte": [
       "sein bei Bewegung von A nach B: gehen, fahren, kommen, laufen, fliegen → Ich bin gefahren.",
       "sein auch bei bleiben: Ich bin zu Hause geblieben.",
       "Fast alle anderen Verben: haben.",
       "Unregelmäßig: oft ge- … -en: essen → gegessen, sehen → gesehen."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Infinitiv und Partizip: Was gehört zusammen?",
       "paare": [
        [
         "fahren",
         "gefahren"
        ],
        [
         "essen",
         "gegessen"
        ],
        [
         "sehen",
         "gesehen"
        ],
        [
         "trinken",
         "getrunken"
        ],
        [
         "schreiben",
         "geschrieben"
        ],
        [
         "gehen",
         "gegangen"
        ]
       ]
      },
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Am Samstag bin ich mit dem Zug nach Trier gefahren.",
         "frage": "Wie ist die Person gefahren?",
         "optionen": [
          "mit dem Zug",
          "mit dem Bus",
          "mit dem Rad"
         ],
         "richtig": 0
        },
        {
         "sagen": "In Trier habe ich ein Eis gegessen und die Porta Nigra gesehen.",
         "frage": "Was hat die Person gegessen?",
         "optionen": [
          "eine Pizza",
          "ein Eis",
          "einen Döner"
         ],
         "richtig": 1
        },
        {
         "sagen": "Am Sonntag bin ich zu Hause geblieben.",
         "frage": "Was hat die Person am Sonntag gemacht?",
         "optionen": [
          "Sie ist gefahren.",
          "Sie ist gelaufen.",
          "Sie ist zu Hause geblieben."
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: sein oder haben?",
      "Von A nach B: Ich bin gefahren.",
      "Sonst meistens: Ich habe gegessen."
     ],
     "rolle": [
      {
       "wer": "ayla",
       "sagt": "Wie bist du heute gekommen?",
       "optionen": [
        "Ich habe mit dem Bus gefahren.",
        "Ich bin mit dem Bus gefahren.",
        "Ich bin mit dem Bus gefahrt."
       ],
       "richtig": 1,
       "korrektur": "Von A nach B → sein: Ich bin gefahren."
      },
      {
       "wer": "luca",
       "sagt": "Hast du schon gegessen?",
       "optionen": [
        "Ja, ich habe gegessen.",
        "Ja, ich bin gegessen.",
        "Ja, ich habe geesst."
       ],
       "richtig": 0,
       "korrektur": "essen → hat gegessen."
      },
      {
       "wer": "noah",
       "sagt": "Wo warst du gestern?",
       "optionen": [
        "Ich habe zu Hause geblieben.",
        "Ich bin zu Hause gebleibt.",
        "Ich bin zu Hause geblieben."
       ],
       "richtig": 2,
       "korrektur": "bleiben → ist geblieben."
      }
     ],
     "uebung": [
      [
       "Ich ◻ nach Trier gefahren.",
       [
        "bin",
        "habe"
       ],
       "bin"
      ],
      [
       "Er ◻ eine Pizza gegessen.",
       [
        "ist",
        "hat"
       ],
       "hat"
      ],
      [
       "Wir ◻ zur Schule gelaufen.",
       [
        "sind",
        "haben"
       ],
       "sind"
      ],
      [
       "Ich ◻ einen Film gesehen.",
       [
        "bin",
        "habe"
       ],
       "habe"
      ],
      [
       "Sie ◻ zu Hause geblieben.",
       [
        "ist",
        "hat"
       ],
       "ist"
      ],
      [
       "Du ◻ spät gekommen.",
       [
        "bist",
        "hast"
       ],
       "bist"
      ],
      [
       "Ich habe ein Buch ___. (lesen)",
       "gelesen"
      ],
      [
       "Wir haben Wasser ___. (trinken)",
       "getrunken"
      ],
      [
       "Hast du die Nachricht ___? (schreiben)",
       "geschrieben"
      ],
      [
       "Ben ist nach Hause ___. (gehen)",
       "gegangen"
      ],
      [
       "Ich habe Noah ___. (sehen)",
       "gesehen"
      ],
      [
       "Mila ist nach Paris ___. (fliegen)",
       "geflogen"
      ]
     ],
     "karte": "Von A nach B → sein: Ich bin gefahren. Sonst meistens haben: Ich habe gegessen."
    },
    {
     "id": "de-m2-erfinder",
     "titel": "Wer hat das erfunden?",
     "ziel": "Ich verstehe kurze Biografien und ordne ein Leben nach der Zeit.",
     "merke": {
      "titel": "Eine kurze Biografie",
      "punkte": [
       "Name, Geburtsjahr, Ort: Melitta Bentz wurde 1873 in Dresden geboren.",
       "Was hat die Person gemacht? 1908 hat sie den Kaffeefilter erfunden.",
       "Der Reihe nach: zuerst … dann … später …",
       "Jahreszahlen: 1908 = neunzehnhundertacht."
      ]
     },
     "ablauf": [
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Melitta Bentz hat 1908 in Dresden den Kaffeefilter erfunden.",
         "frage": "Wann war das?",
         "optionen": [
          "1908",
          "1980",
          "1809"
         ],
         "richtig": 0
        },
        {
         "sagen": "Bertha Benz ist 1888 von Mannheim nach Pforzheim gefahren.",
         "frage": "Wohin ist sie gefahren?",
         "optionen": [
          "nach Mannheim",
          "nach Pforzheim",
          "nach Dresden"
         ],
         "richtig": 1
        },
        {
         "sagen": "Konrad Zuse hat 1941 in Berlin den Computer Z3 gebaut.",
         "frage": "Was hat er gebaut?",
         "optionen": [
          "ein Auto",
          "einen Filter",
          "einen Computer"
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "paare",
       "frage": "Wer hat was gemacht?",
       "paare": [
        [
         "Bertha Benz",
         "erste lange Autofahrt (1888)"
        ],
        [
         "Melitta Bentz",
         "Kaffeefilter (1908)"
        ],
        [
         "Konrad Zuse",
         "Computer Z3 (1941)"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Menschen mit Ideen.",
      "Wer? Wann? Wo? Was?",
      "Und Jahreszahlen: neunzehnhundertacht."
     ],
     "rolle": [
      {
       "wer": "chiara",
       "sagt": "Ich will auch was erfinden. Wer hat den Kaffeefilter erfunden?",
       "optionen": [
        "Konrad Zuse.",
        "Melitta Bentz.",
        "Bertha Benz."
       ],
       "richtig": 1,
       "korrektur": "Melitta Bentz, 1908 in Dresden."
      },
      {
       "wer": "kenan",
       "sagt": "Wann hat Zuse den Computer gebaut?",
       "optionen": [
        "Neunzehnhundertvierzehn.",
        "Eintausendneunhundert.",
        "Neunzehnhunderteinundvierzig."
       ],
       "richtig": 2,
       "korrektur": "1941 = neunzehnhunderteinundvierzig."
      },
      {
       "wer": "mila",
       "sagt": "Was steht im Lebenslauf ganz oben?",
       "optionen": [
        "Name und Geburtsjahr.",
        "Das Lieblingsessen.",
        "Das Ende."
       ],
       "richtig": 0,
       "korrektur": "Zuerst Name und Geburt, dann der Reihe nach."
      }
     ],
     "uebung": [
      [
       "Melitta Bentz kam aus ◻.",
       [
        "Dresden",
        "Berlin",
        "Paris"
       ],
       "Dresden"
      ],
      [
       "Den Kaffeefilter gibt es seit ◻.",
       [
        "1908",
        "1888",
        "1941"
       ],
       "1908"
      ],
      [
       "Bertha Benz ist 1888 nach ◻ gefahren.",
       [
        "Pforzheim",
        "Trier",
        "Berlin"
       ],
       "Pforzheim"
      ],
      [
       "Konrad Zuse hat die ◻ gebaut.",
       [
        "Z3",
        "Lampe",
        "Brücke"
       ],
       "Z3"
      ],
      [
       "Eine Biografie erzählt ein ◻.",
       [
        "Leben",
        "Rezept",
        "Spiel"
       ],
       "Leben"
      ],
      [
       "Im Lebenslauf steht oben das ◻.",
       [
        "Geburtsjahr",
        "Hobby",
        "Ende"
       ],
       "Geburtsjahr"
      ],
      [
       "Sie hat den Filter ___. (erfinden)",
       "erfunden"
      ],
      [
       "Er hat einen Computer ___. (bauen)",
       "gebaut"
      ],
      [
       "Sie ist nach Pforzheim ___. (fahren)",
       "gefahren"
      ],
      [
       "1908 liest man: neunzehnhundert___.",
       "acht"
      ],
      [
       "1941 liest man: neunzehnhundert___.",
       "einundvierzig"
      ],
      [
       "1888 liest man: achtzehnhundert___.",
       "achtundachtzig"
      ]
     ],
     "karte": "Biografie: Name, Geburt, was die Person gemacht hat – der Reihe nach. 1908 = neunzehnhundertacht."
    },
    {
     "id": "de-m2-sport",
     "titel": "Gib ihm den Ball!",
     "ziel": "Ich erkenne Pronomen im Akkusativ und Dativ und benutze sie statt Namen.",
     "merke": {
      "titel": "Pronomen: wen oder wem?",
      "punkte": [
       "Wen? (Akkusativ): mich, dich, ihn, sie, es, uns, euch, sie",
       "Wem? (Dativ): mir, dir, ihm, ihr, ihm, uns, euch, ihnen",
       "Ich sehe den Trainer. → Ich sehe ihn.",
       "Ich gebe dem Trainer den Ball. → Ich gebe ihm den Ball."
      ]
     },
     "ablauf": [
      {
       "art": "rollenspiel"
      },
      {
       "art": "paare",
       "frage": "Welches Pronomen passt?",
       "paare": [
        [
         "den Ball sehen",
         "ihn"
        ],
        [
         "die Trainerin fragen",
         "sie"
        ],
        [
         "das Team rufen",
         "es"
        ],
        [
         "dem Trainer helfen",
         "ihm"
        ],
        [
         "der Spielerin danken",
         "ihr"
        ],
        [
         "den Fans winken",
         "ihnen"
        ]
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "sommer",
     "intro": [
      "Heute Sport – und Sprache.",
      "Wen? ihn, sie, es.",
      "Wem? ihm, ihr, ihnen."
     ],
     "rolle": [
      {
       "wer": "ben",
       "sagt": "Ich bin frei! Schnell!",
       "optionen": [
        "Ich passe dich den Ball!",
        "Ich passe dir den Ball!",
        "Ich passe du den Ball!"
       ],
       "richtig": 1,
       "korrektur": "Wem passe ich den Ball? Dir!"
      },
      {
       "wer": "jo",
       "sagt": "Siehst du den Korb?",
       "optionen": [
        "Ja, ich sehe ihn.",
        "Ja, ich sehe ihm.",
        "Ja, ich sehe er."
       ],
       "richtig": 0,
       "korrektur": "Wen sehe ich? Den Korb → ihn."
      },
      {
       "wer": "dario",
       "sagt": "Ayla hat den Punkt gemacht!",
       "optionen": [
        "Wir gratulieren sie!",
        "Wir gratulieren ihn!",
        "Wir gratulieren ihr!"
       ],
       "richtig": 2,
       "korrektur": "gratulieren – wem? → ihr."
      },
      {
       "wer": "yusuf",
       "sagt": "Der Trainer sucht uns.",
       "optionen": [
        "Dann rufen wir ihn.",
        "Dann rufen wir ihm.",
        "Dann rufen wir er."
       ],
       "richtig": 0,
       "korrektur": "rufen – wen? → ihn."
      }
     ],
     "uebung": [
      [
       "Ich sehe den Trainer. Ich sehe ◻.",
       [
        "ihn",
        "ihm",
        "er"
       ],
       "ihn"
      ],
      [
       "Ich gebe Ben den Ball. Ich gebe ◻ den Ball.",
       [
        "ihm",
        "ihn",
        "er"
       ],
       "ihm"
      ],
      [
       "Ich helfe Ayla. Ich helfe ◻.",
       [
        "ihr",
        "sie",
        "ihm"
       ],
       "ihr"
      ],
      [
       "Wir fragen die Trainerin. Wir fragen ◻.",
       [
        "sie",
        "ihr",
        "ihn"
       ],
       "sie"
      ],
      [
       "Ben ruft das Team. Ben ruft ◻.",
       [
        "es",
        "ihm",
        "ihn"
       ],
       "es"
      ],
      [
       "Pass ◻ den Ball! (ich)",
       [
        "mir",
        "mich",
        "ich"
       ],
       "mir"
      ],
      [
       "Ich sehe ◻ beim Spiel. (du)",
       [
        "dich",
        "dir",
        "du"
       ],
       "dich"
      ],
      [
       "Der Trainer lobt ◻. (wir)",
       [
        "uns",
        "wir",
        "euch"
       ],
       "uns"
      ],
      [
       "Wir danken ◻. (die Fans)",
       [
        "ihnen",
        "sie",
        "ihr"
       ],
       "ihnen"
      ],
      [
       "Hilf ◻ bitte! (ich)",
       [
        "mir",
        "mich",
        "ich"
       ],
       "mir"
      ],
      [
       "Ich schreibe Mila. Ich schreibe ◻.",
       [
        "ihr",
        "sie",
        "es"
       ],
       "ihr"
      ],
      [
       "Siehst du den Korb? Ja, ich sehe ◻.",
       [
        "ihn",
        "ihm",
        "es"
       ],
       "ihn"
      ]
     ],
     "karte": "Wen? ihn, sie, es · Wem? ihm, ihr, ihnen. Gib ihm den Ball!"
    }
   ]
  },
  {
   "nr": 3,
   "titel": "Andere Länder, andere Sitten",
   "ziele": [
    "Länder entdecken",
    "Ein Café – das Café",
    "Ich hätte gern …",
    "Die Jacke ist zu groß",
    "Schneller, höher, am besten",
    "Muss ich? Darf ich?",
    "Schule früher und heute",
    "Liebe Mila, …"
   ],
   "lektionen": [
    {
     "id": "de-m3-laender",
     "titel": "Länder entdecken",
     "ziel": "Ich lese und schreibe einen kurzen Steckbrief über ein Land.",
     "merke": {
      "titel": "Über ein Land sprechen",
      "punkte": [
       "Das Land heißt … · Die Hauptstadt ist …",
       "In … spricht man … (In Portugal spricht man Portugiesisch.)",
       "Das Land liegt in … (Europa, Afrika …) – neben …",
       "Ein typisches Essen ist …"
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Welche Sprache spricht man dort?",
       "paare": [
        [
         "Frankreich",
         "Französisch"
        ],
        [
         "Italien",
         "Italienisch"
        ],
        [
         "Portugal",
         "Portugiesisch"
        ],
        [
         "Spanien",
         "Spanisch"
        ],
        [
         "Deutschland",
         "Deutsch"
        ],
        [
         "Polen",
         "Polnisch"
        ]
       ]
      },
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Kap Verde liegt im Atlantik. Die Hauptstadt heißt Praia.",
         "frage": "Wie heißt die Hauptstadt?",
         "optionen": [
          "Lissabon",
          "Praia",
          "Paris"
         ],
         "richtig": 1
        },
        {
         "sagen": "In Belgien spricht man Französisch, Niederländisch und Deutsch.",
         "frage": "Wie viele Sprachen hat Belgien?",
         "optionen": [
          "eine",
          "zwei",
          "drei"
         ],
         "richtig": 2
        },
        {
         "sagen": "Ein typisches Essen in Italien ist Pasta.",
         "frage": "Was isst man in Italien gern?",
         "optionen": [
          "Pasta",
          "Cachupa",
          "Pommes"
         ],
         "richtig": 0
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute reisen wir – auf dem Papier.",
      "Land, Sprache, Hauptstadt.",
      "In Portugal spricht man Portugiesisch."
     ],
     "rolle": [
      {
       "wer": "noah",
       "sagt": "Ich war mal in Brüssel. Wo liegt das?",
       "optionen": [
        "In Belgien.",
        "In Belgisch.",
        "Bei Belgien Stadt."
       ],
       "richtig": 0,
       "korrektur": "Brüssel ist die Hauptstadt von Belgien."
      },
      {
       "wer": "dario",
       "sagt": "Was spricht man in Portugal?",
       "optionen": [
        "Man spricht Portugal.",
        "Man spricht Portugiesisch.",
        "Man sprecht Portugiesisch."
       ],
       "richtig": 1,
       "korrektur": "Das Land: Portugal. Die Sprache: Portugiesisch."
      },
      {
       "wer": "chiara",
       "sagt": "Ich mache einen Steckbrief. Was gehört rein?",
       "optionen": [
        "Hauptstadt, Sprache, Essen.",
        "Nur mein Name.",
        "Gar nichts."
       ],
       "richtig": 0,
       "korrektur": "Ein Steckbrief: Hauptstadt, Sprache, Essen, Besonderes."
      }
     ],
     "uebung": [
      [
       "In Frankreich spricht man ◻.",
       [
        "Französisch",
        "Frankreich",
        "Franzose"
       ],
       "Französisch"
      ],
      [
       "In Italien spricht man ◻.",
       [
        "Italienisch",
        "Italien",
        "Italiener"
       ],
       "Italienisch"
      ],
      [
       "In Portugal spricht man ◻.",
       [
        "Portugiesisch",
        "Portugal",
        "Spanisch"
       ],
       "Portugiesisch"
      ],
      [
       "Die Hauptstadt von Deutschland ist ◻.",
       [
        "Berlin",
        "Bonn",
        "Wien"
       ],
       "Berlin"
      ],
      [
       "Die Hauptstadt von Frankreich ist ◻.",
       [
        "Paris",
        "Lyon",
        "Brüssel"
       ],
       "Paris"
      ],
      [
       "Die Hauptstadt von Portugal ist ◻.",
       [
        "Lissabon",
        "Porto",
        "Praia"
       ],
       "Lissabon"
      ],
      [
       "Brüssel liegt in ◻.",
       [
        "Belgien",
        "Frankreich",
        "Luxemburg"
       ],
       "Belgien"
      ],
      [
       "Praia ist die Hauptstadt von ◻.",
       [
        "Kap Verde",
        "Portugal",
        "Spanien"
       ],
       "Kap Verde"
      ],
      [
       "In Luxemburg spricht man ◻ Sprachen.",
       [
        "drei",
        "eine",
        "zehn"
       ],
       "drei"
      ],
      [
       "In Spanien spricht man ◻.",
       [
        "Spanisch",
        "Spanien",
        "Italienisch"
       ],
       "Spanisch"
      ],
      [
       "Ein Steckbrief ist ◻.",
       [
        "kurz",
        "sehr lang",
        "geheim"
       ],
       "kurz"
      ],
      [
       "In Polen spricht man ◻.",
       [
        "Polnisch",
        "Polen",
        "Russisch"
       ],
       "Polnisch"
      ]
     ],
     "karte": "Land – Sprache: Portugal – Portugiesisch. In Belgien spricht man drei Sprachen."
    },
    {
     "id": "de-m3-artikel",
     "titel": "Ein Café – das Café",
     "ziel": "Ich weiß, wann ich „ein“ und wann ich „der, die, das“ benutze.",
     "merke": {
      "titel": "ein oder der?",
      "punkte": [
       "Neu, irgendein, zum ersten Mal: ein, eine, ein – In Lissabon gibt es ein Café.",
       "Bekannt, genau dieses: der, die, das – Das Café ist sehr alt.",
       "Im Akkusativ (wen? was?) wird nur der/ein anders: den, einen – Ich sehe einen Turm.",
       "Mehrzahl: ohne Artikel oder die – Dort gibt es Märkte. Die Märkte sind bunt."
      ]
     },
     "ablauf": [
      {
       "art": "rollenspiel"
      },
      {
       "art": "paare",
       "frage": "Welcher bestimmte Artikel gehört dazu?",
       "paare": [
        [
         "ein Turm",
         "der Turm"
        ],
        [
         "eine Brücke",
         "die Brücke"
        ],
        [
         "ein Café",
         "das Café"
        ],
        [
         "eine Kirche",
         "die Kirche"
        ],
        [
         "ein Platz",
         "der Platz"
        ],
        [
         "ein Museum",
         "das Museum"
        ]
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: ein oder der?",
      "Neu: ein Café.",
      "Bekannt: das Café."
     ],
     "rolle": [
      {
       "wer": "mila",
       "sagt": "Was hast du in Trier gesehen?",
       "optionen": [
        "Ich habe ein Tor gesehen.",
        "Ich habe das Tor gesehen, irgendeins.",
        "Ich habe Tor gesehen."
       ],
       "richtig": 0,
       "korrektur": "Zum ersten Mal genannt: ein Tor."
      },
      {
       "wer": "mila",
       "sagt": "Und wie war es?",
       "optionen": [
        "Ein Tor war sehr alt.",
        "Das Tor war sehr alt.",
        "Tor war alt sehr."
       ],
       "richtig": 1,
       "korrektur": "Jetzt ist es bekannt: das Tor."
      },
      {
       "wer": "jo",
       "sagt": "Gibt es in der Stadt einen Skatepark?",
       "optionen": [
        "Ja, es gibt eine Skatepark.",
        "Ja, es gibt einen Skatepark.",
        "Ja, es gibt ein Skatepark."
       ],
       "richtig": 1,
       "korrektur": "der Skatepark → es gibt einen Skatepark."
      }
     ],
     "uebung": [
      [
       "Dort ist ◻ Café. (neu)",
       [
        "ein",
        "das"
       ],
       "ein"
      ],
      [
       "◻ Café ist sehr klein. (bekannt)",
       [
        "Ein",
        "Das"
       ],
       "Das"
      ],
      [
       "Ich sehe ◻ Brücke. (neu)",
       [
        "eine",
        "die"
       ],
       "eine"
      ],
      [
       "◻ Brücke ist lang. (bekannt)",
       [
        "Eine",
        "Die"
       ],
       "Die"
      ],
      [
       "In Rom gibt es ◻ Brunnen.",
       [
        "einen",
        "ein",
        "eine"
       ],
       "einen"
      ],
      [
       "Ich kaufe ◻ Postkarte.",
       [
        "eine",
        "einen",
        "ein"
       ],
       "eine"
      ],
      [
       "Das ist ◻ Museum.",
       [
        "ein",
        "eine",
        "einen"
       ],
       "ein"
      ],
      [
       "◻ Museum ist neu. (bekannt)",
       [
        "Das",
        "Der",
        "Die"
       ],
       "Das"
      ],
      [
       "Er hat ◻ Stadtplan.",
       [
        "einen",
        "eine",
        "ein"
       ],
       "einen"
      ],
      [
       "◻ Stadtplan ist alt. (bekannt)",
       [
        "Der",
        "Das",
        "Die"
       ],
       "Der"
      ],
      [
       "Dort steht ◻ Kirche.",
       [
        "eine",
        "ein",
        "einen"
       ],
       "eine"
      ],
      [
       "◻ Kirche ist groß. (bekannt)",
       [
        "Die",
        "Der",
        "Das"
       ],
       "Die"
      ]
     ],
     "karte": "Neu: ein Café. Bekannt: das Café. Akkusativ: einen Turm, den Turm."
    },
    {
     "id": "de-m3-kantine",
     "titel": "Ich hätte gern …",
     "ziel": "Ich bestelle höflich Essen und Trinken und frage nach dem Preis.",
     "merke": {
      "titel": "Höflich bestellen",
      "punkte": [
       "Ich hätte gern … · Ich möchte … · Für mich bitte …",
       "Was kostet …? · Das macht 4,50 Euro.",
       "Mit „bitte“ und „danke“ – und zu Erwachsenen „Sie“: Haben Sie …?",
       "„Ich will …“ klingt unhöflich."
      ]
     },
     "ablauf": [
      {
       "art": "weg",
       "intro": "Wir üben echt: Geh zur Essensausgabe in der Kantine!",
       "schritte": [
        {
         "sagen": "Geh aus dem Saal in den Gang.",
         "x": -21,
         "z": -16,
         "r": 1.8
        },
        {
         "sagen": "Geh nach links, dann rechts in die Kantine.",
         "x": 12,
         "z": -11.5,
         "r": 3
        },
        {
         "sagen": "Geh zur Essensausgabe ganz hinten.",
         "x": 24.2,
         "z": -8.8,
         "r": 2.8
        }
       ],
       "ende": [
        [
         "kremer",
         "Zack, zack. Was darf’s sein?"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: höflich bestellen.",
      "Ich hätte gern … bitte.",
      "Zu Erwachsenen: Sie."
     ],
     "rolle": [
      {
       "wer": "kremer",
       "sagt": "Was darf’s sein?",
       "optionen": [
        "Ich will Curry.",
        "Ich hätte gern das Curry, bitte.",
        "Curry. Schnell."
       ],
       "richtig": 1,
       "korrektur": "Höflich: Ich hätte gern …, bitte."
      },
      {
       "wer": "kremer",
       "sagt": "Und zu trinken?",
       "optionen": [
        "Ein Wasser, bitte.",
        "Gib Wasser!",
        "Wasser du."
       ],
       "richtig": 0,
       "korrektur": "Ein Wasser, bitte – kurz und höflich."
      },
      {
       "wer": "kremer",
       "sagt": "Sonst noch was?",
       "optionen": [
        "Was kostest du?",
        "Was kostet das, bitte?",
        "Wie viel du?"
       ],
       "richtig": 1,
       "korrektur": "Nach dem Preis fragt man: Was kostet das?"
      },
      {
       "wer": "kremer",
       "sagt": "Vier Euro achtzig.",
       "optionen": [
        "Hier, bitte. Danke schön!",
        "Zu teuer.",
        "Mach billiger!"
       ],
       "richtig": 0,
       "korrektur": "Bezahlen und danke sagen."
      }
     ],
     "uebung": [
      [
       "Ich ◻ gern eine Suppe, bitte.",
       [
        "hätte",
        "will",
        "habe"
       ],
       "hätte"
      ],
      [
       "◻ Sie auch Tee?",
       [
        "Haben",
        "Hast",
        "Habt"
       ],
       "Haben"
      ],
      [
       "Was ◻ das Sandwich?",
       [
        "kostet",
        "kosten",
        "kostest"
       ],
       "kostet"
      ],
      [
       "Für mich ◻ ein Wasser.",
       [
        "bitte",
        "danke",
        "gern"
       ],
       "bitte"
      ],
      [
       "Das macht 4,80 ◻.",
       [
        "Euro",
        "Uhr",
        "Meter"
       ],
       "Euro"
      ],
      [
       "Zur Köchin sagt man ◻.",
       [
        "Sie",
        "du",
        "ihr"
       ],
       "Sie"
      ],
      [
       "Zum Freund sagt man ◻.",
       [
        "du",
        "Sie",
        "Ihnen"
       ],
       "du"
      ],
      [
       "„Ich will Pommes!“ klingt ◻.",
       [
        "unhöflich",
        "höflich",
        "lustig"
       ],
       "unhöflich"
      ],
      [
       "Sonst noch etwas? – Nein, ◻. Das ist alles.",
       [
        "danke",
        "bitte",
        "gern"
       ],
       "danke"
      ],
      [
       "Was darf’s ◻?",
       [
        "sein",
        "haben",
        "machen"
       ],
       "sein"
      ],
      [
       "Ich ◻ einen Kakao, bitte.",
       [
        "möchte",
        "muss",
        "darf"
       ],
       "möchte"
      ],
      [
       "Hier, bitte. ◻ schön!",
       [
        "Danke",
        "Bitte",
        "Hallo"
       ],
       "Danke"
      ]
     ],
     "karte": "Ich hätte gern …, bitte. Was kostet das? Danke schön! Zu Erwachsenen: Sie."
    },
    {
     "id": "de-m3-kleidung",
     "titel": "Die Jacke ist zu groß",
     "ziel": "Ich beschreibe Kleidung mit Adjektiven und sage, was nicht passt.",
     "merke": {
      "titel": "Kleidung beschreiben",
      "punkte": [
       "Die Jacke ist warm. Die Hose ist blau. Die Schuhe sind neu.",
       "Gegenteile: groß – klein, lang – kurz, eng – weit, teuer – billig, neu – alt.",
       "„zu“ heißt: mehr als gut ist – Die Hose ist zu eng.",
       "Fragen: Haben Sie das in Größe M? Kann ich das anprobieren?"
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Finde das Gegenteil.",
       "paare": [
        [
         "groß",
         "klein"
        ],
        [
         "lang",
         "kurz"
        ],
        [
         "eng",
         "weit"
        ],
        [
         "teuer",
         "billig"
        ],
        [
         "neu",
         "alt"
        ],
        [
         "warm",
         "kalt"
        ]
       ]
      },
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Die Jacke ist schön, aber leider zu teuer.",
         "frage": "Was ist das Problem?",
         "optionen": [
          "Die Jacke ist zu groß.",
          "Die Jacke ist zu teuer.",
          "Die Jacke ist zu alt."
         ],
         "richtig": 1
        },
        {
         "sagen": "Haben Sie die Schuhe eine Nummer größer? Diese sind zu klein.",
         "frage": "Was braucht die Person?",
         "optionen": [
          "größere Schuhe",
          "kleinere Schuhe",
          "eine Jacke"
         ],
         "richtig": 0
        },
        {
         "sagen": "Ich nehme den grauen Pullover. Er ist warm und weich.",
         "frage": "Wie ist der Pullover?",
         "optionen": [
          "kalt und hart",
          "eng und kurz",
          "warm und weich"
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Kleidung.",
      "Die Jacke ist warm.",
      "Zu groß? Zu teuer? Sag es!"
     ],
     "rolle": [
      {
       "wer": "ayla",
       "sagt": "Ich such eine Jacke fürs Konzert. Wie findest du die?",
       "optionen": [
        "Sie ist cool, aber zu teuer.",
        "Sie ist zu teuer cool.",
        "Sie teuer."
       ],
       "richtig": 0,
       "korrektur": "Die Jacke ist cool, aber zu teuer."
      },
      {
       "wer": "luca",
       "sagt": "Die Hose passt nicht. Was sag ich im Laden?",
       "optionen": [
        "Hose falsch!",
        "Haben Sie die Hose eine Nummer größer?",
        "Gib größer!"
       ],
       "richtig": 1,
       "korrektur": "Höflich fragen: Haben Sie … eine Nummer größer?"
      },
      {
       "wer": "lina",
       "sagt": "(zeigt ihre Zeichnung) Wie ist das Kleid?",
       "optionen": [
        "Das Kleid ist lang und rot.",
        "Das Kleid sind lang.",
        "Der Kleid ist rot."
       ],
       "richtig": 0,
       "korrektur": "das Kleid – Das Kleid ist lang und rot."
      }
     ],
     "uebung": [
      [
       "Das Gegenteil von groß ist ◻.",
       [
        "klein",
        "kurz",
        "eng"
       ],
       "klein"
      ],
      [
       "Das Gegenteil von teuer ist ◻.",
       [
        "billig",
        "alt",
        "kalt"
       ],
       "billig"
      ],
      [
       "Das Gegenteil von eng ist ◻.",
       [
        "weit",
        "lang",
        "neu"
       ],
       "weit"
      ],
      [
       "◻ Jacke ist warm.",
       [
        "Die",
        "Der",
        "Das"
       ],
       "Die"
      ],
      [
       "◻ Pullover ist grau.",
       [
        "Der",
        "Die",
        "Das"
       ],
       "Der"
      ],
      [
       "◻ T-Shirt ist weiß.",
       [
        "Das",
        "Der",
        "Die"
       ],
       "Das"
      ],
      [
       "Die Schuhe ◻ neu.",
       [
        "sind",
        "ist",
        "bist"
       ],
       "sind"
      ],
      [
       "Die Hose ist ◻ lang. Ich brauche sie kürzer.",
       [
        "zu",
        "so",
        "sehr gut"
       ],
       "zu"
      ],
      [
       "Kann ich das ◻?",
       [
        "anprobieren",
        "anrufen",
        "aufräumen"
       ],
       "anprobieren"
      ],
      [
       "Haben Sie das in Größe ◻?",
       [
        "M",
        "Uhr",
        "Euro"
       ],
       "M"
      ],
      [
       "Im Winter ist eine Mütze ◻.",
       [
        "warm",
        "kalt",
        "nass"
       ],
       "warm"
      ],
      [
       "Das Gegenteil von neu ist ◻.",
       [
        "alt",
        "jung",
        "klein"
       ],
       "alt"
      ]
     ],
     "karte": "Die Jacke ist warm. Die Hose ist zu lang. Haben Sie das eine Nummer größer?"
    },
    {
     "id": "de-m3-steigerung",
     "titel": "Schneller, höher, am besten",
     "ziel": "Ich vergleiche mit „größer als“ und „am größten“.",
     "merke": {
      "titel": "Adjektive steigern",
      "punkte": [
       "schnell – schneller – am schnellsten",
       "Vergleich mit „als“: Ben ist schneller als Jo.",
       "Gleich mit „so … wie“: Mila ist so alt wie Lina.",
       "Oft mit Umlaut: groß – größer – am größten · alt – älter – am ältesten"
      ]
     },
     "ablauf": [
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Der Zug ist schneller als der Bus.",
         "frage": "Was ist schneller?",
         "optionen": [
          "der Bus",
          "der Zug",
          "beide gleich"
         ],
         "richtig": 1
        },
        {
         "sagen": "Die Jacke kostet sechzig Euro, der Pulli fünfundzwanzig.",
         "frage": "Was ist billiger?",
         "optionen": [
          "der Pulli",
          "die Jacke",
          "beide gleich"
         ],
         "richtig": 0
        },
        {
         "sagen": "Mila ist so alt wie Lina.",
         "frage": "Wer ist älter?",
         "optionen": [
          "Mila",
          "Lina",
          "Beide sind gleich alt."
         ],
         "richtig": 2
        },
        {
         "sagen": "Am liebsten spiele ich Tischtennis.",
         "frage": "Was macht die Person am liebsten?",
         "optionen": [
          "Fußball",
          "Tischtennis",
          "Korbball"
         ],
         "richtig": 1
        }
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: vergleichen.",
      "schnell, schneller, am schnellsten.",
      "Ben ist schneller als Jo."
     ],
     "rolle": [
      {
       "wer": "ben",
       "sagt": "Wer ist schneller, ich oder Jo?",
       "optionen": [
        "Du bist mehr schnell.",
        "Du bist schneller als Jo.",
        "Du bist schneller wie Jo."
       ],
       "richtig": 1,
       "korrektur": "schneller als – nicht „mehr schnell“, nicht „wie“."
      },
      {
       "wer": "jo",
       "sagt": "Pff. Welches Auto ist am schnellsten?",
       "optionen": [
        "Das rote ist am schnellsten.",
        "Das rote ist schnellste.",
        "Das rote ist mehr schnellsten."
       ],
       "richtig": 0,
       "korrektur": "am schnellsten."
      },
      {
       "wer": "kenan",
       "sagt": "Holz oder Metall – was magst du lieber?",
       "optionen": [
        "Ich mag Holz gerner.",
        "Ich mag Holz lieber.",
        "Ich mag Holz besser als gern."
       ],
       "richtig": 1,
       "korrektur": "gern – lieber – am liebsten."
      }
     ],
     "uebung": [
      [
       "Der Zug ist schneller ◻ der Bus.",
       [
        "als",
        "wie",
        "so"
       ],
       "als"
      ],
      [
       "Mila ist so alt ◻ Lina.",
       [
        "wie",
        "als",
        "so"
       ],
       "wie"
      ],
      [
       "gut – ◻ – am besten",
       [
        "besser",
        "guter",
        "mehr gut"
       ],
       "besser"
      ],
      [
       "gern – lieber – am ◻",
       [
        "liebsten",
        "gernsten",
        "besten"
       ],
       "liebsten"
      ],
      [
       "groß – ◻ – am größten",
       [
        "größer",
        "großer",
        "mehr groß"
       ],
       "größer"
      ],
      [
       "viel – ◻ – am meisten",
       [
        "mehr",
        "vieler",
        "meister"
       ],
       "mehr"
      ],
      [
       "Turm C ist am ◻.",
       [
        "höchsten",
        "hochsten",
        "höher"
       ],
       "höchsten"
      ],
      [
       "alt – ◻ – am ältesten",
       [
        "älter",
        "alter",
        "mehr alt"
       ],
       "älter"
      ],
      [
       "Die Jacke ist ___ als der Pulli. (teuer)",
       "teurer"
      ],
      [
       "Der Bus ist ___ als der Zug. (langsam)",
       "langsamer"
      ],
      [
       "Belgien ist ___ als Luxemburg. (groß)",
       "größer"
      ],
      [
       "Am ___ spiele ich Tischtennis. (gern)",
       "liebsten"
      ]
     ],
     "karte": "schnell – schneller – am schnellsten. gut – besser – am besten. schneller als, so schnell wie."
    },
    {
     "id": "de-m3-modalverben",
     "titel": "Muss ich? Darf ich?",
     "ziel": "Ich verstehe Regeln: müssen, nicht müssen, dürfen, nicht dürfen.",
     "merke": {
      "titel": "Regeln verstehen",
      "punkte": [
       "müssen = Pflicht: Man muss pünktlich sein.",
       "nicht müssen = nicht nötig: Am Samstag muss ich nicht kommen. (Ich darf aber.)",
       "dürfen = erlaubt: In der Pause darf man Musik hören.",
       "nicht dürfen = verboten: Im Gang darf man nicht rennen."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Was bedeutet das?",
       "paare": [
        [
         "Man muss.",
         "Pflicht"
        ],
        [
         "Man darf.",
         "erlaubt"
        ],
        [
         "Man muss nicht.",
         "nicht nötig"
        ],
        [
         "Man darf nicht.",
         "verboten"
        ]
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "hoffmann",
     "intro": [
      "Heute: Regeln verstehen.",
      "muss nicht – das ist nicht verboten!",
      "darf nicht – das ist verboten."
     ],
     "rolle": [
      {
       "wer": "becker",
       "sagt": "Werkstatt. Was gilt hier?",
       "optionen": [
        "Man muss eine Schutzbrille tragen.",
        "Man darf eine Schutzbrille tragen, wenn man will.",
        "Man muss keine Schutzbrille tragen."
       ],
       "richtig": 0,
       "korrektur": "Schutzbrille ist Pflicht: Man muss."
      },
      {
       "wer": "sommer",
       "sagt": "(pfeift) Was darf man im Gang nicht?",
       "optionen": [
        "Man muss nicht rennen.",
        "Man darf nicht rennen.",
        "Man darf rennen."
       ],
       "richtig": 1,
       "korrektur": "Verboten: Man darf nicht rennen."
      },
      {
       "wer": "noah",
       "sagt": "Muss ich morgen kommen? Es ist Samstag.",
       "optionen": [
        "Nein, du darfst nicht kommen.",
        "Nein, du musst nicht kommen.",
        "Ja, du musst nicht."
       ],
       "richtig": 1,
       "korrektur": "Nicht nötig: Du musst nicht kommen."
      },
      {
       "wer": "ayla",
       "sagt": "Darf ich in der Pause Musik hören?",
       "optionen": [
        "Ja, das darfst du.",
        "Ja, das musst du.",
        "Nein, du musst nicht."
       ],
       "richtig": 0,
       "korrektur": "Erlaubt: Ja, das darfst du."
      }
     ],
     "uebung": [
      [
       "Im Gang ◻ man nicht rennen.",
       [
        "darf",
        "muss"
       ],
       "darf"
      ],
      [
       "Man ◻ pünktlich sein. (Pflicht)",
       [
        "muss",
        "darf"
       ],
       "muss"
      ],
      [
       "Am Samstag ◻ ich nicht kommen. (nicht nötig)",
       [
        "muss",
        "darf"
       ],
       "muss"
      ],
      [
       "In der Pause ◻ man Musik hören. (erlaubt)",
       [
        "darf",
        "muss"
       ],
       "darf"
      ],
      [
       "In der Werkstatt ◻ man eine Schutzbrille tragen.",
       [
        "muss",
        "darf"
       ],
       "muss"
      ],
      [
       "Hier ◻ man nicht rauchen.",
       [
        "darf",
        "muss"
       ],
       "darf"
      ],
      [
       "„Du musst nicht“ heißt: Es ist ◻.",
       [
        "nicht nötig",
        "verboten",
        "Pflicht"
       ],
       "nicht nötig"
      ],
      [
       "„Du darfst nicht“ heißt: Es ist ◻.",
       [
        "verboten",
        "nicht nötig",
        "erlaubt"
       ],
       "verboten"
      ],
      [
       "Eintritt frei: Man ◻ nichts bezahlen.",
       [
        "muss",
        "darf"
       ],
       "muss"
      ],
      [
       "Im Unterricht ◻ man das Handy nicht benutzen.",
       [
        "darf",
        "muss"
       ],
       "darf"
      ],
      [
       "Du ◻ die Hausaufgaben machen.",
       [
        "musst",
        "darfst"
       ],
       "musst"
      ],
      [
       "◻ ich das Fenster öffnen? (Erlaubnis)",
       [
        "Darf",
        "Muss"
       ],
       "Darf"
      ]
     ],
     "karte": "muss = Pflicht · muss nicht = nicht nötig · darf = erlaubt · darf nicht = verboten."
    },
    {
     "id": "de-m3-frueher",
     "titel": "Schule früher und heute",
     "ziel": "Ich erzähle, wie etwas früher war, und benutze Zeitangaben.",
     "merke": {
      "titel": "Früher und heute",
      "punkte": [
       "Zeitangaben: gestern, heute, morgen · früher, damals, jetzt",
       "vor + Zeit (Vergangenheit): vor 100 Jahren · seit + Zeit (bis jetzt): seit drei Jahren",
       "nach / in: nach der Schule · in einer Stunde",
       "Modalverben im Präteritum: ich musste, durfte, konnte, wollte"
      ]
     },
     "ablauf": [
      {
       "art": "hoeren",
       "items": [
        {
         "sagen": "Früher mussten die Kinder still sitzen.",
         "frage": "Was mussten die Kinder früher?",
         "optionen": [
          "still sitzen",
          "laut singen",
          "Laptops benutzen"
         ],
         "richtig": 0
        },
        {
         "sagen": "Ich gehe seit zwei Jahren auf diese Schule.",
         "frage": "Wie lange schon?",
         "optionen": [
          "vor zwei Jahren, nicht mehr",
          "seit zwei Jahren, bis heute",
          "in zwei Jahren"
         ],
         "richtig": 1
        },
        {
         "sagen": "In einer Woche beginnen die Ferien.",
         "frage": "Wann beginnen die Ferien?",
         "optionen": [
          "vor einer Woche",
          "heute",
          "in einer Woche"
         ],
         "richtig": 2
        }
       ]
      },
      {
       "art": "satzbau",
       "saetze": [
        {
         "woerter": [
          "Früher",
          "mussten",
          "die",
          "Kinder",
          "still",
          "sitzen."
         ],
         "tipp": "Verb an Stelle 2, das zweite Verb ans Ende."
        },
        {
         "woerter": [
          "Damals",
          "durften",
          "sie",
          "nicht",
          "sprechen."
         ],
         "tipp": "durften an Stelle 2."
        },
        {
         "woerter": [
          "Heute",
          "können",
          "wir",
          "Fragen",
          "stellen."
         ],
         "tipp": "können vorne, stellen am Ende."
        }
       ]
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "laurent",
     "intro": [
      "Heute: Schule früher.",
      "Vor hundert Jahren: Schiefertafel!",
      "musste, durfte, konnte."
     ],
     "rolle": [
      {
       "wer": "laurent",
       "sagt": "Was mussten Kinder früher in der Schule?",
       "optionen": [
        "Sie mussten still sitzen.",
        "Sie muss still sitzen.",
        "Sie müssen gestern still."
       ],
       "richtig": 0,
       "korrektur": "Präteritum: sie mussten."
      },
      {
       "wer": "yusuf",
       "sagt": "Seit wann machst du Judo? Ich seit drei Jahren.",
       "optionen": [
        "Vor einem Jahr bis jetzt.",
        "Seit einem Jahr.",
        "In einem Jahr."
       ],
       "richtig": 1,
       "korrektur": "Bis heute: seit einem Jahr."
      },
      {
       "wer": "chiara",
       "sagt": "Konntest du als Kind schon schwimmen?",
       "optionen": [
        "Ja, ich konnte schwimmen.",
        "Ja, ich kannte schwimmen.",
        "Ja, ich könnt schwimmen."
       ],
       "richtig": 0,
       "korrektur": "können → ich konnte."
      }
     ],
     "uebung": [
      [
       "◻ hundert Jahren schrieben Kinder auf Tafeln.",
       [
        "Vor",
        "Seit",
        "In"
       ],
       "Vor"
      ],
      [
       "Ich gehe ◻ zwei Jahren auf diese Schule.",
       [
        "seit",
        "vor",
        "nach"
       ],
       "seit"
      ],
      [
       "◻ der Schule gehe ich zum Training.",
       [
        "Nach",
        "Seit",
        "Vor"
       ],
       "Nach"
      ],
      [
       "◻ einer Woche beginnen die Ferien.",
       [
        "In",
        "Vor",
        "Seit"
       ],
       "In"
      ],
      [
       "Früher ◻ die Kinder still sitzen.",
       [
        "mussten",
        "müssen",
        "musste"
       ],
       "mussten"
      ],
      [
       "Damals ◻ sie nicht sprechen.",
       [
        "durften",
        "dürfen",
        "darf"
       ],
       "durften"
      ],
      [
       "Als Kind ◻ ich nicht schwimmen.",
       [
        "konnte",
        "kann",
        "kannte"
       ],
       "konnte"
      ],
      [
       "Ich ◻ Pilot werden. (früher)",
       [
        "wollte",
        "will",
        "wolle"
       ],
       "wollte"
      ],
      [
       "Gestern ___ ich lange lernen. (müssen)",
       "musste"
      ],
      [
       "Früher ___ wir kein Handy haben. (dürfen)",
       "durften"
      ],
      [
       "Mit fünf ___ ich schon lesen. (können)",
       "konnte"
      ],
      [
       "Damals ___ sie Ärztin werden. (wollen)",
       "wollte"
      ]
     ],
     "karte": "vor 100 Jahren · seit zwei Jahren · nach der Schule · in einer Woche. ich musste, durfte, konnte, wollte."
    },
    {
     "id": "de-m3-brief",
     "titel": "Liebe Mila, …",
     "ziel": "Ich schreibe einen kurzen Brief oder eine E-Mail mit passender Anrede und passendem Gruß.",
     "merke": {
      "titel": "Brief und E-Mail",
      "punkte": [
       "Persönlich: Liebe Mila, / Lieber Ben, … Viele Grüße / Bis bald! Dein Sam",
       "Höflich: Sehr geehrte Frau Weber, / Sehr geehrter Herr Hoffmann, … Mit freundlichen Grüßen, Sam Muster",
       "Nach der Anrede: Komma – dann klein weiter: Liebe Mila, wie geht es dir?",
       "Höflich schreibt man Sie, Ihnen, Ihr groß."
      ]
     },
     "ablauf": [
      {
       "art": "paare",
       "frage": "Welcher Gruß passt zur Anrede?",
       "paare": [
        [
         "Liebe Mila,",
         "Viele Grüße"
        ],
        [
         "Sehr geehrte Frau Weber,",
         "Mit freundlichen Grüßen"
        ],
        [
         "Hi Jo,",
         "Bis morgen!"
        ]
       ]
      },
      {
       "art": "gross",
       "saetze": [
        {
         "woerter": [
          "Ich",
          "danke",
          "Ihnen",
          "für",
          "Ihre",
          "Hilfe."
         ]
        },
        {
         "woerter": [
          "Können",
          "Sie",
          "mir",
          "die",
          "Aufgaben",
          "schicken?"
         ]
        },
        {
         "woerter": [
          "Am",
          "Samstag",
          "waren",
          "wir",
          "im",
          "Kino."
         ]
        }
       ]
      },
      {
       "art": "rollenspiel"
      },
      {
       "art": "blatt"
      }
     ],
     "lehrer": "weber",
     "intro": [
      "Heute: Briefe und E-Mails.",
      "Liebe Mila – oder: Sehr geehrte Frau Weber?",
      "Sie, Ihnen, Ihr: groß."
     ],
     "rolle": [
      {
       "wer": "weber",
       "sagt": "Du schreibst mir eine E-Mail. Wie fängst du an?",
       "optionen": [
        "Hi Weber!",
        "Sehr geehrte Frau Weber,",
        "Liebe Weber,"
       ],
       "richtig": 1,
       "korrektur": "Zur Lehrerin höflich: Sehr geehrte Frau Weber,"
      },
      {
       "wer": "weber",
       "sagt": "Und wie hörst du auf?",
       "optionen": [
        "Mit freundlichen Grüßen",
        "Tschüss Süße",
        "Bussi"
       ],
       "richtig": 0,
       "korrektur": "Höflich: Mit freundlichen Grüßen."
      },
      {
       "wer": "mila",
       "sagt": "Und wenn du mir schreibst?",
       "optionen": [
        "Sehr geehrte Mila,",
        "Liebe Mila,",
        "Mit freundlichen Grüßen, Mila"
       ],
       "richtig": 1,
       "korrektur": "Zu Freunden: Liebe Mila, …"
      }
     ],
     "uebung": [
      [
       "◻ Mila, wie geht es dir?",
       [
        "Liebe",
        "Lieber",
        "Sehr geehrte"
       ],
       "Liebe"
      ],
      [
       "◻ Ben, danke für die Karte.",
       [
        "Lieber",
        "Liebe",
        "Sehr geehrter"
       ],
       "Lieber"
      ],
      [
       "◻ Frau Weber, …",
       [
        "Sehr geehrte",
        "Liebe",
        "Hi"
       ],
       "Sehr geehrte"
      ],
      [
       "◻ Herr Hoffmann, …",
       [
        "Sehr geehrter",
        "Sehr geehrte",
        "Lieber Herr Lehrer"
       ],
       "Sehr geehrter"
      ],
      [
       "An die Lehrerin: Mit ◻ Grüßen",
       [
        "freundlichen",
        "lieben Küssen",
        "coolen"
       ],
       "freundlichen"
      ],
      [
       "An einen Freund: Viele ◻!",
       [
        "Grüße",
        "Grüßen",
        "Gruß dich"
       ],
       "Grüße"
      ],
      [
       "Können ◻ mir helfen? (höflich)",
       [
        "Sie",
        "sie",
        "du"
       ],
       "Sie"
      ],
      [
       "Ich danke ◻. (höflich)",
       [
        "Ihnen",
        "ihnen",
        "dir"
       ],
       "Ihnen"
      ],
      [
       "Nach der Anrede steht ein ◻.",
       [
        "Komma",
        "Punkt",
        "Fragezeichen"
       ],
       "Komma"
      ],
      [
       "Liebe Mila, ◻ geht es dir?",
       [
        "wie",
        "Wie"
       ],
       "wie"
      ],
      [
       "Am Ende steht der ◻.",
       [
        "Name",
        "Titel",
        "Preis"
       ],
       "Name"
      ],
      [
       "Ein Brief an Freunde ist ◻.",
       [
        "persönlich",
        "höflich-formell",
        "geheim"
       ],
       "persönlich"
      ]
     ],
     "karte": "Liebe Mila, … Viele Grüße. Sehr geehrte Frau Weber, … Mit freundlichen Grüßen. Sie, Ihnen groß."
    }
   ]
  }
 ],
 "francais": []
};
