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
  }
 ],
 "francais": []
};
