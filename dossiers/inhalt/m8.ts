// REAL TALK #08 · AKKU – Module 8 und 9 (Gesundheit und Abschluss, Einheiten 29–30). Letzte Ausgabe von Jahr 1.
// Inhalt als Daten (wird auch per Skript bearbeitet). Texte: **fett**, ==markiert==.
import type { Heft } from '../typen'
import { loesungen, stunden } from './m8-stunden'
import { aufStunden } from './stunden-hilfe'

const d: Heft = {
  "id": "m8",
  "nr": "08",
  "datei": "Real-Talk-08-Akku",
  "thema": "Akku",
  "headline": "Was lädt dich auf?",
  "farbe": "#FF7AC3",
  "stand": "November 2026",
  "cover": {
    "bild": "peep:lio:stolz:stehen",
    "sticker": "Letzte Ausgabe",
    "zeilen": [
      "Nachts wach, morgens tot: Warum das nicht deine Schuld ist",
      "Hunger macht gereizt. Was dein Tank mit deiner Laune macht",
      "Ein Jahr später: Du hast dich mehr verändert, als du denkst",
      "Eine Postkarte an dich – für den Herbst"
    ]
  },
  "ansage": {
    "text": [
      "Das ist die letzte Ausgabe. Sie hat zwei Hälften.",
      "In der ersten geht es um deinen **Akku**: Schlaf, Essen, Bewegung. Das ist der Grund, warum derselbe blöde Spruch dich an einem Tag kaltlässt und am nächsten explodieren lässt.",
      "In der zweiten Hälfte schaust du zurück. Auf ein Jahr, in dem du mehr geschafft hast, als du dir zugetraut hättest. Und dann kommt ein Abschied. Der gehört dazu – auch wenn man ihn am liebsten überspringen würde."
    ],
    "zitat": "Es endet. ==Du bleibst.==",
    "so": [
      [
        "Szene",
        "Eine kurze Geschichte. Lies sie und sag, was du siehst."
      ],
      [
        "Fakten + Clip",
        "Drei Dinge, die dahinterstecken. Dazu ein Video per QR-Code."
      ],
      [
        "Mythos / Real",
        "Was alle sagen – und was stimmt."
      ],
      [
        "Dein Move",
        "Jetzt du: messen, planen, zurückschauen."
      ]
    ],
    "regeln": [
      "**Keine Zahlen zum Körper.** Kein Gewicht, keine Kalorien, keine Größen.",
      "**Niemand muss sich bewegen, der nicht will.** Zuschauen ist erlaubt.",
      "**Deine Postkarte gehört dir.** Niemand liest sie. Auch die Leitung nicht."
    ]
  },
  "cast": [
    {
      "bild": "peep:amira:muede",
      "name": "Amira, 13",
      "x": "Schläft um zwei ein. Der Wecker klingelt um halb sieben."
    },
    {
      "bild": "peep:yusuf:wuetend",
      "name": "Yusuf, 13",
      "x": "Kein Frühstück, zwei Energy-Drinks. Um drei knallt es in der Turnhalle."
    },
    {
      "bild": "peep:lio:stolz",
      "name": "Lio, 12",
      "x": "Hatte am Anfang zwei Wörter für alles. Heute erklärt er „4 ein, 8 aus“."
    },
    {
      "bild": "peep:chloe:besorgt",
      "name": "Chloé, 12",
      "x": "Hasst Abschiede. Den letzten Tag in der Grundschule hat sie geschwänzt."
    }
  ],
  "warm": {
    "titel": "Soundcheck",
    "text": "Zwei schnelle Fragen. Kein Richtig, kein Falsch.",
    "fragen": [
      {
        "f": "Wie voll ist dein Akku gerade?",
        "regler": [
          "Akku"
        ]
      },
      {
        "f": "Was lädt dich am schnellsten auf?",
        "satz": [
          "Das lädt mich in zehn Minuten auf:"
        ]
      }
    ]
  },
  "tracks": [
    {
      "nr": 29,
      "titel": "Nachtmodus",
      "unter": "Müde ist kein Charakterfehler. Es ist Biologie",
      "kurz": "Warum du nachts wach bist – und was wirklich hilft.",
      "szene": {
        "bild": "peep:amira:muede",
        "name": "Amira, 13",
        "text": "1:50 Uhr. Amira liegt wach. Der Kopf rattert, das Handy leuchtet, „nur noch ein Video“. Um 6:30 Uhr klingelt der Wecker. In der ersten Stunde fällt ihr der Kopf auf den Tisch. Die Lehrerin sagt: „Geh halt früher ins Bett.“ Amira würde ihr gern erklären, dass sie um zehn im Bett war. Sie war nur nicht müde. Stattdessen sagt sie: „Mir doch egal.“",
        "frage": "Was weiß die Lehrerin nicht über Amiras Nacht?"
      },
      "fakten": [
        {
          "t": "Deine Uhr geht nach",
          "x": "In der Pubertät verschiebt sich die innere Uhr. Du wirst **später müde** – die Schule fängt trotzdem früh an."
        },
        {
          "t": "Acht bis zehn",
          "x": "So viele Stunden braucht ein Körper mit 13 bis 18 (mit 12 eher mehr). **Viele kommen unter der Woche nicht mal auf acht.**"
        },
        {
          "t": "Schlaf räumt auf",
          "x": "Nachts sortiert das Gehirn den Tag. Ohne Schlaf **steigt deine Druck-Zahl schneller** – bei jeder Kleinigkeit."
        }
      ],
      "clip": {
        "titel": "Müde in der Schule: Warum Teenies ausschlafen sollten",
        "kanal": "Quarks",
        "url": "https://www.youtube.com/watch?v=EZKbP2xV8yU",
        "dauer": "die ersten 5 Min.",
        "frage": "Was passiert mit der inneren Uhr in der Pubertät?"
      },
      "mythen": [
        [
          "Ich brauche nur fünf Stunden.",
          "Du hältst fünf Stunden aus. Brauchen ist etwas anderes."
        ],
        [
          "Am Wochenende hole ich das nach.",
          "Ein bisschen. Aber bis mittags schlafen verstellt die Uhr noch weiter."
        ],
        [
          "Mit Handy schlafe ich besser ein.",
          "Licht und neue Clips halten das Gehirn wach. Es fühlt sich nur nach Abschalten an."
        ]
      ],
      "merk": "Müde ist ==kein Charakterfehler.==",
      "moveUnter": "Hol dir deine Nacht zurück",
      "moves": [
        {
          "titel": "Meine Nacht",
          "wie": "allein",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Die letzte Nacht – rechne nach. Sieht keiner:",
              "satz": [
                "Eingeschlafen um:",
                "Aufgewacht um:",
                "Das waren so viele Stunden:"
              ]
            },
            {
              "f": "Was hält dich wach? Kreise ein:",
              "kreis": [
                "Handy",
                "Gedanken",
                "Zocken",
                "Lärm",
                "Sorgen",
                "Koffein"
              ]
            }
          ]
        },
        {
          "titel": "Amiras Abend",
          "wie": "zu zweit",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Was hilft beim Einschlafen, was schadet?",
              "raster": {
                "spalten": [
                  "hilft",
                  "schadet"
                ],
                "zeilen": [
                  "Energy-Drink um 17 Uhr",
                  "Handy im Bett bis zum Einschlafen",
                  "jeden Tag ungefähr zur gleichen Zeit ins Bett",
                  "Fenster auf, Zimmer kühl und dunkel",
                  "morgens zehn Minuten ans Tageslicht"
                ]
              }
            },
            {
              "f": "Ein Tipp für Amira, der nicht nach Lehrerin klingt:",
              "linien": 1
            }
          ]
        }
      ],
      "challenge": {
        "titel": "Die Schlaf-Linie",
        "wie": "alle",
        "x": "Eine Linie aus Klebeband: 20 Uhr bis 1 Uhr. **Stell dich hin: Wann bist du gestern eingeschlafen?** Niemand muss etwas sagen.",
        "wann": "Start"
      },
      "line": {
        "titel": "Mein Abschalt-Plan",
        "x": "Was machst du in den letzten 20 Minuten vor dem Schlafen – ohne Bildschirm?",
        "linien": 1
      },
      "woche": "Leg das Handy an **drei Abenden** so weit weg, dass du aufstehen müsstest.",
      "gruppe": [
        {
          "titel": "Schlaf-Auktion",
          "wer": "zwei Teams",
          "zeit": "12 Min.",
          "material": "zehn Tipp-Karten (sechs echte, vier Mythen), Spielgeld",
          "schritte": [
            "Jedes Team hat 100 Punkte. Die Leitung versteigert Schlaf-Tipps: „Warme Dusche vor dem Bett – wer bietet?“",
            "Ihr bietet nur auf Tipps, die ihr für echt haltet.",
            "Am Ende wird aufgedeckt: Echte Tipps zählen doppelt, Mythen sind verbranntes Geld."
          ],
          "frage": "Für welchen Mythos habt ihr am meisten bezahlt?",
          "wann": "Start",
          "zu3": "Jeder bietet für sich mit 100 Punkten. Die Leitung versteigert."
        },
        {
          "titel": "Bodyscan",
          "wer": "alle",
          "zeit": "8 Min.",
          "material": "Stühle oder Matten",
          "schritte": [
            "Setz oder leg dich bequem hin. Augen zu oder auf einen Punkt am Boden.",
            "Die Leitung führt langsam durch den Körper: Füße, Beine, Bauch, Schultern, Gesicht.",
            "Du musst nichts fühlen und nichts ändern. Nur kurz hinschauen."
          ],
          "level2": "Abends allein im Bett – von den Füßen nach oben.",
          "frage": "Wo im Körper war es am ruhigsten?",
          "wann": "Schluss"
        }
      ],
      "leitung": {
        "einsatz": "Schlaf-Linie, Fall, Clip, dann der Zimmer-Umbau als große Runde.",
        "loesungen": [
          "Szene: Amira war im Bett, aber ihre innere Uhr stand noch auf „wach“. Dazu kommen Grübeln und Handy. Es ist kein fehlender Wille.",
          "Move B: hilft – gleiche Zeit, kühles dunkles Zimmer, Tageslicht am Morgen · schadet – Energy-Drink am späten Nachmittag, Handy im Bett.",
          "Auktion: echt sind z. B. feste Zeiten, Tageslicht am Morgen, kühles Zimmer, Bewegung am Tag, kein Koffein am Nachmittag, Handy außer Reichweite. Mythen: Alkohol macht guten Schlaf; Schlaf kann man auf Vorrat tanken; wer wach liegt, soll liegen bleiben; fünf Stunden reichen."
        ],
        "impulse": [
          "Was sagt ihr Erwachsenen, die „Geh halt früher ins Bett“ sagen?",
          "Was wäre der kleinste Schritt, der eure Nacht besser macht?"
        ],
        "material": "Tipp-Karten, Spielgeld oder Punktezettel, Stoppuhr",
        "blaetter": "Gefühlsrad, „Mein Gesund-Plan“, Skills-Pass."
      }
    },
    {
      "nr": 29,
      "titel": "Treibstoff",
      "unter": "Was du isst und wie du dich bewegst, entscheidet mit, wie du drauf bist",
      "kurz": "Hunger, Energy-Drinks, zehn Minuten Bewegung – und was dich wirklich lädt.",
      "szene": {
        "bild": "peep:yusuf:wuetend",
        "name": "Yusuf, 13",
        "text": "Yusuf hat verschlafen. Kein Frühstück, an der Bushaltestelle ein Energy-Drink. In der Pause noch einer, mittags eine Tüte Chips. Um 14:50 Uhr, Sport: Beim Aufwärmen rempelt Noah ihn aus Versehen an. Yusuf brüllt ihn zusammen und knallt den Ball gegen die Wand. Die Sportlehrerin schickt ihn auf die Bank: „Du hast ein Problem mit deiner Art.“ Yusuf denkt: Stimmt wohl. Dabei hat er seit gestern Abend nichts Richtiges gegessen.",
        "frage": "Was hat Yusufs Ausraster mit seinem Tag zu tun?"
      },
      "fakten": [
        {
          "t": "Hunger macht gereizt",
          "x": "Ist der Tank leer, schüttet der Körper Stresshormone aus. **Du wirst gereizt, bevor du Hunger merkst.**"
        },
        {
          "t": "Zehn Minuten reichen",
          "x": "Zügig gehen, Treppen, Tanzen: Schon kurze Bewegung **hebt die Stimmung und senkt den Druck.**"
        },
        {
          "t": "Trinken zählt mit",
          "x": "Schon ein bisschen Durst macht **müde und unkonzentriert** – und fühlt sich oft an wie schlechte Laune."
        }
      ],
      "clip": {
        "titel": "Warum Sport uns schlau macht und unser Gehirn fit hält",
        "kanal": "Quarks",
        "url": "https://www.youtube.com/watch?v=3SpyavZgZYo",
        "dauer": "die ersten 5 Min.",
        "frage": "Was macht Bewegung mit deinem Kopf?"
      },
      "mythen": [
        [
          "Energy-Drinks geben Energie.",
          "Sie leihen dir welche. Mit Zinsen: Nach dem Hoch kommt der Absturz."
        ],
        [
          "Sport ist nur was für Sportliche.",
          "Gehen zählt. Tanzen zählt. Die Treppe zählt. Niemand braucht ein Trikot."
        ],
        [
          "Gesund leben heißt verzichten.",
          "Es heißt: mehr von dem, was dich auflädt."
        ]
      ],
      "merk": "Erst den Tank füllen. ==Dann streiten.==",
      "moveUnter": "Finde, was dich auflädt",
      "moves": [
        {
          "titel": "Mein Akku",
          "wie": "allein",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Was lädt dich auf, was zieht dich leer?",
              "raster": {
                "spalten": [
                  "lädt auf",
                  "zieht leer"
                ],
                "zeilen": [
                  "Schlafen",
                  "mit jemandem essen",
                  "Zocken",
                  "draußen sein",
                  "Scrollen",
                  "Musik",
                  "Bewegung"
                ]
              }
            },
            {
              "f": "Das lädt mich auf und steht nicht in der Liste:",
              "linien": 1
            }
          ]
        },
        {
          "titel": "Yusufs Tag, zweiter Versuch",
          "wie": "zu zweit",
          "zeit": "6 Min.",
          "kontext": "Gleicher Tag, gleiche Sportstunde, gleicher Rempler. Tauscht drei Dinge aus.",
          "fragen": [
            {
              "f": "Was macht Yusuf anders?",
              "satz": [
                "Statt zwei Energy-Drinks:",
                "Statt Chips zu Mittag:",
                "Um 14:45 Uhr, kurz bevor es knallt:"
              ]
            }
          ]
        }
      ],
      "challenge": {
        "titel": "Akku-Würfel",
        "wie": "alle",
        "x": "Reihum würfeln. Wer will, macht mit: **1** Glas Wasser · **2** Fenster auf, drei Atemzüge · **3** einmal den Flur entlang · **4** zehn Kniebeugen · **5** 30 Sekunden Lieblingssong, laut · **6** freie Wahl.",
        "wann": "Start"
      },
      "line": {
        "titel": "Mein Mini-Schritt",
        "x": "So klein, dass er sicher klappt. Hak ab, wenn du ihn gemacht hast.",
        "kaestchen": [
          "Tag 1",
          "Tag 2",
          "Tag 3",
          "Tag 4"
        ]
      },
      "woche": "Mach deinen Mini-Schritt an **vier Tagen**. Klein schlägt perfekt.",
      "gruppe": [
        {
          "titel": "Rucksack-Rennen",
          "wer": "zwei Teams",
          "zeit": "15 Min.",
          "material": "zwei Rucksäcke, Bücher oder Flaschen, ein kurzer Parcours",
          "schritte": [
            "Packt den Rucksack: Jedes Buch ist ein Stress – Schule, Streit, Geld, zu wenig Schlaf.",
            "Staffel durch den Parcours – mit vollem Rucksack.",
            "**Runde 2:** Für jede Idee, die entlastet, kommt ein Buch raus. Dann noch mal laufen."
          ],
          "frage": "Welches Buch würdet ihr im echten Leben zuerst rausnehmen?",
          "wann": "Mitte",
          "zu3": "ein Team, ein Rucksack. Runde 2 läuft gegen eure Zeit aus Runde 1."
        },
        {
          "titel": "Vier Ecken",
          "wer": "alle",
          "zeit": "10 Min.",
          "material": "vier Schilder: Schlaf, Essen, Bewegung, Pause",
          "schritte": [
            "Die Leitung fragt: „Wo läuft es bei dir schon gut?“ Geh in deine Ecke.",
            "Jede Ecke sammelt einen Tipp, der wirklich funktioniert, und ruft ihn in den Raum.",
            "Zweite Frage: „Wo wäre dein größter Hebel?“ Neue Ecke, neuer Tipp."
          ],
          "frage": "Welchen Tipp aus einer anderen Ecke probierst du aus?",
          "wann": "Schluss",
          "zu3": "Wer allein in einer Ecke steht, bekommt die Leitung als Partner für den Tipp."
        }
      ],
      "leitung": {
        "einsatz": "Zweite Hälfte von Einheit 29: Rucksack-Rennen und Vier Ecken stehen bei den Sessions, der Akku-Würfel ist die Challenge, „Dein Satz“ ersetzt „Mein Gesund-Plan“ und begleitet die Mission (kleiner Schritt an vier Tagen).",
        "loesungen": [
          "Szene: zu wenig Schlaf, nichts gegessen, viel Koffein und Zucker – der Körper war schon auf Alarm, bevor die Kiste kam. Das entschuldigt das Brüllen nicht, erklärt aber die kurze Zündschnur.",
          "Move A: Es gibt kein Richtig. Zocken und Scrollen dürfen in beiden Spalten stehen – das ist ein guter Gesprächsanlass.",
          "Move B: z. B. Wasser und etwas Richtiges zu essen; zwei Minuten raus, 4 ein – 8 aus, Druck-Zahl prüfen (Ausgabe #03)."
        ],
        "impulse": [
          "Woran merkt ihr, dass euer Tank leer ist – bevor es knallt?",
          "Was ist ein Mini-Schritt, über den niemand lachen würde – und einer, der so klein ist, dass alle lachen?"
        ],
        "material": "zwei Rucksäcke, Bücher, Würfel, vier Schilder",
        "blaetter": "Gefühlsrad, „Mein Gesund-Plan“, Skills-Pass."
      }
    },
    {
      "nr": 30,
      "titel": "Was bleibt",
      "unter": "Du hast dich verändert. Du siehst es nur nicht, weil du dabei warst",
      "kurz": "Ein Jahr im Rückspiegel: Was du jetzt kannst.",
      "szene": {
        "bild": "peep:lio:stolz",
        "name": "Lio, 12",
        "text": "Im September, am ersten Tag in der 7e, hatte Lio zwei Wörter für alles: gut und scheiße. Sein Satz über sich: „Ich bin halt dumm.“ Heute, im Juni, kommt ein Neuer in die Klasse. Kapuze auf, er setzt sich direkt an die Tür. Lio setzt sich neben ihn und zeigt ihm „4 ein, 8 aus“. „Vier rein, acht raus. Klingt blöd, hilft aber.“ Jana grinst: „Ey. Im September hättest du das nie gemacht.“ Lio zuckt mit den Schultern. Ihm war das gar nicht aufgefallen.",
        "frage": "Warum merkt Lio seine eigene Veränderung nicht?"
      },
      "fakten": [
        {
          "t": "Veränderung ist leise",
          "x": "Sie passiert in kleinen Schritten. **Deshalb siehst du sie erst, wenn du zurückschaust.**"
        },
        {
          "t": "Rückschläge gehören dazu",
          "x": "Keine Kurve geht nur nach oben. **Wer hinfällt, hat nicht alles verlernt.**"
        },
        {
          "t": "Stark heißt nicht hart",
          "x": "Stark sind die, die nach einem Schlag wieder aufstehen – **meistens, weil jemand da war.**"
        }
      ],
      "clip": {
        "titel": "So krempelst du dein Leben um!",
        "kanal": "Dinge Erklärt – Kurzgesagt",
        "url": "https://www.youtube.com/watch?v=OSk0AUT4_8o",
        "dauer": "die ersten 5 Min.",
        "frage": "Warum halten kleine Schritte länger als große Vorsätze?"
      },
      "mythen": [
        [
          "Ich bin noch genau wie vorher.",
          "Frag die anderen. Die haben zugeschaut."
        ],
        [
          "Ein Rückschlag heißt: alles umsonst.",
          "Er heißt: Du weißt jetzt, wo es noch eng wird."
        ],
        [
          "Starke Leute brauchen niemanden.",
          "Starke Leute wissen, wen sie anrufen."
        ]
      ],
      "merk": "Du warst dabei. ==Deshalb siehst du es nicht.==",
      "moveUnter": "Schau dir dein Jahr an",
      "moves": [
        {
          "titel": "Meine Jahreskurve",
          "wie": "allein",
          "zeit": "8 Min.",
          "kontext": "Zeichne dein Jahr als Linie: links September, rechts heute. Hoch heißt gut, tief heißt hart. Dann markiere: **★** ein guter Moment · **⚡** ein harter Moment · **↗** ein Moment, an dem du etwas geschafft hast. Ein Wort dazu reicht.",
          "fragen": [
            {
              "f": "Mein Jahr:",
              "feld": 38
            }
          ]
        },
        {
          "titel": "Meine Top 3",
          "wie": "allein",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Welche drei Skills bleiben? Kreise ein:",
              "kreis": [
                "Druck-Zahl",
                "4 ein, 8 aus",
                "5-4-3-2-1",
                "Kälte",
                "Beweise prüfen",
                "neuer Satz",
                "Wort-Schere",
                "Stopp",
                "Nein-Satz",
                "Wenn-dann",
                "Teilen-Bremse"
              ]
            },
            {
              "f": "Und ehrlich:",
              "satz": [
                "Das habe ich über mich gelernt:"
              ]
            }
          ]
        }
      ],
      "challenge": {
        "titel": "Das Jahres-Museum",
        "wie": "alle",
        "x": "Zu zweit stellt ihr zwei Stücke aus dem Jahr aus – mit Museumsschild. **Dann Führung: Ihr seid die Profis.** Jede Person legt drei Münzen auf die Stücke, die ihr am meisten gebracht haben.",
        "wann": "Mitte",
        "zu3": "Jede Person stellt zwei Stücke aus. Die Leitung ist Besucher und fragt nach."
      },
      "line": {
        "titel": "Früher – heute",
        "x": "Ein Satz: „Im September habe ich …, heute …“",
        "linien": 2
      },
      "woche": "Zeig jemandem außerhalb des Kurses **einen** Skill. Erklären ist die beste Übung.",
      "gruppe": [
        {
          "titel": "Für die Neuen",
          "wer": "alle",
          "zeit": "10 Min.",
          "material": "Zettel, Stifte",
          "schritte": [
            "Schreibt zu zweit drei Sätze für die nächste Gruppe: Was stimmt wirklich über diesen Kurs?",
            "Ein Satz nennt einen Skill, der taugt. Einer darf sagen, was Quatsch war.",
            "Vorlesen. Die Leitung hebt die Zettel für die Neuen auf."
          ],
          "frage": "Welchen Satz hättet ihr am ersten Tag gebraucht?",
          "wann": "Schluss",
          "zu3": "Ihr schreibt zu dritt an einem Zettel."
        },
        {
          "titel": "Museum des Jahres",
          "wer": "alle",
          "zeit": "12 Min.",
          "material": "Zettel, Stifte, ein Tisch",
          "schritte": [
            "Jede Person zeichnet oder schreibt ein „Ausstellungsstück“: einen Moment, einen Satz, einen Gegenstand aus dem Kurs.",
            "Alles kommt ohne Namen auf den Tisch. Rundgang.",
            "Ratet: Von wem ist was? Wer mag, löst auf."
          ],
          "frage": "Welches Stück würdet ihr der nächsten Gruppe zeigen?",
          "wann": "Mitte",
          "zu3": "Jeder macht zwei Stücke, die Leitung auch. Dann lohnt sich das Raten."
        }
      ],
      "leitung": {
        "einsatz": "Erste Hälfte von Einheit 30. Die Szene vor dem Rückblick-Spiel (Challenge), Move A ersetzt Jahreskurve und Pass-Rückblick, Move B bündelt die Skills des Jahres. „Für die Neuen“ und das „Museum“ sind zusätzliche Angebote für die Runde.",
        "loesungen": [
          "Szene: Veränderung passiert in kleinen Schritten, man gewöhnt sich an jeden einzelnen. Von außen – oder im Rückblick – sieht man den Unterschied.",
          "Move A: Keine Kurve wird bewertet oder gezeigt, außer jemand möchte. Tiefpunkte nicht ausfragen.",
          "Rückblick-Duell: Tee – Einverständnis (#05) · Becher – Ping-Turm (#07) · Eiswürfel – Reiz gegen Reiz (#03) · Hai – Streit-Typen (#06). Eigene Gegenstände aus Ihrem Jahr ergänzen."
        ],
        "impulse": [
          "Woran würde jemand von außen merken, dass ihr ein Jahr hier wart?",
          "Welcher Skill hat euch am meisten überrascht?"
        ],
        "material": "Gegenstände aus dem Jahr, Zettel",
        "blaetter": "Skills-Pass, Jahreskurve, Gefühlsrad."
      }
    },
    {
      "nr": 30,
      "titel": "Letzter Track",
      "unter": "Abschiede sind mies. Überspringen ist mieser",
      "kurz": "Tschüss sagen, ohne abzuhauen. Und eine Postkarte an dich.",
      "szene": {
        "bild": "peep:chloe:besorgt",
        "name": "Chloé, 12",
        "text": "Letzte Stunde vor den Ferien. Chloé steht vor der Tür und überlegt umzudrehen. Am letzten Tag in der Grundschule hat sie es so gemacht: Bauchweh gesagt, zu Hause geblieben. Kein Tschüss, keine Umarmung, kein Kloß im Hals. Den ganzen Sommer hat sie sich danach gefragt, was die anderen wohl gesagt hätten. Ihre Hand liegt auf der Klinke.",
        "frage": "Was verpasst Chloé, wenn sie umdreht?"
      },
      "fakten": [
        {
          "t": "Es tut weh, weil es gut war",
          "x": "Wäre dir die Gruppe egal, wäre der Abschied es auch. **Der Kloß im Hals ist ein Kompliment.**"
        },
        {
          "t": "Alte Abschiede melden sich",
          "x": "Ein Ende weckt frühere Enden. Das ist normal. **Sag Bescheid, wenn es zu viel wird.**"
        },
        {
          "t": "Danke wirkt doppelt",
          "x": "Wer Danke sagt, fühlt sich danach selbst besser. **Und der andere erinnert sich oft noch lange daran.**"
        }
      ],
      "clip": {
        "titel": "Ein Mittel gegen Unzufriedenheit",
        "kanal": "Dinge Erklärt – Kurzgesagt",
        "url": "https://www.youtube.com/watch?v=HGKn3iUA5M0",
        "dauer": "die ersten 5 Min.",
        "frage": "Was verändert Dankbarkeit im Kopf?"
      },
      "mythen": [
        [
          "Einfach verschwinden ist leichter.",
          "Heute ja. Danach bleibt etwas offen – manchmal jahrelang."
        ],
        [
          "Wenn der Kurs vorbei ist, ist alles weg.",
          "Was du geübt hast, sitzt. Die Karten stecken in deiner Tasche."
        ],
        [
          "Danke sagen ist peinlich.",
          "Drei Sekunden lang. Dann ist es das Beste am ganzen Tag."
        ]
      ],
      "merk": "Es endet. ==Du bleibst.==",
      "moveUnter": "Sag Tschüss. Und schreib dir selbst",
      "moves": [
        {
          "titel": "Postkarte an mich",
          "wie": "allein",
          "zeit": "12 Min.",
          "kontext": "Schreib an dich im Herbst – an dich in der 6e. Dann Karte ausschneiden, in den Umschlag, Namen drauf, zukleben. **Niemand liest sie. Im Herbst bekommst du sie zurück.**",
          "fragen": [
            {
              "f": "An mich im Herbst:",
              "satz": [
                "Darauf bin ich stolz:",
                "Das war hart, und ich bin noch da:",
                "Das wünsche ich dir für die 6e:",
                "Vergiss nicht:"
              ]
            }
          ]
        },
        {
          "titel": "Mein Netz",
          "wie": "allein",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Wenn es eng wird – wen kannst du fragen? Kreuz an. Nur für dich.",
              "raster": {
                "spalten": [
                  "ja",
                  "vielleicht"
                ],
                "zeilen": [
                  "jemand zu Hause",
                  "ein Bruder, eine Schwester, eine Cousine …",
                  "ein Freund oder eine Freundin",
                  "eine Lehrperson",
                  "der SePAS in der Schule",
                  "das Kinder- und Jugendtelefon 116 111"
                ]
              }
            },
            {
              "f": "Und noch:",
              "satz": [
                "Danke sagen will ich noch:"
              ]
            }
          ]
        }
      ],
      "challenge": {
        "titel": "Stärken-Zettel",
        "wie": "alle",
        "x": "Jede Person klebt ein Blatt an die Lehne ihres Stuhls. Musik an, alle laufen. **Bei Stopp schreibst du auf das Blatt am nächsten Stuhl eine Stärke dieser Person.** Gelesen wird erst am Schluss.",
        "wann": "Start",
        "zu3": "Jeder schreibt jedem zwei Stärken – auch die Leitung."
      },
      "line": {
        "titel": "Mein letzter Satz",
        "x": "Was sagst du der Gruppe zum Schluss? Ein Satz reicht.",
        "linien": 1
      },
      "woche": "Der Kurs endet. **Deine Postkarte kommt im Herbst.** Bis dahin: Karten in die Tasche.",
      "hilfe": true,
      "gruppe": [
        {
          "titel": "Wie am ersten Tag",
          "wer": "alle",
          "zeit": "5 Min.",
          "material": "–",
          "schritte": [
            "Erinnert euch: Am ersten Tag habt ihr 5-4-3-2-1 gemacht. Jetzt noch einmal.",
            "Fünf Dinge sehen, vier spüren, drei hören, zwei riechen, eins schmecken. Leise, jede Person für sich.",
            "Schaut euch um: derselbe Raum, dieselbe Übung."
          ],
          "frage": "Was ist heute anders als am ersten Tag?",
          "wann": "Schluss"
        },
        {
          "titel": "Der letzte Kreis",
          "wer": "alle",
          "zeit": "10 Min.",
          "material": "ein Gegenstand zum Weitergeben",
          "schritte": [
            "Der Gegenstand geht reihum. Wer ihn hält, sagt einen Satz: „Ich nehme mit …“",
            "Weitergeben ohne Satz ist erlaubt.",
            "Zum Schluss sagt die Leitung jeder Person einen Satz. Dann ist Schluss – ohne Zugabe."
          ],
          "frage": "Welchen Satz wollt ihr behalten?",
          "wann": "Schluss"
        }
      ],
      "leitung": {
        "einsatz": "Fall, Postkarte an mich, Pause, Stärken-Post, 5-4-3-2-1, Mein Netz, Schluss – danach der letzte Kreis.",
        "loesungen": [
          "Szene: den Abschluss – zu hören, was sie den anderen bedeutet hat, und selbst etwas zu sagen. Offene Enden bleiben länger als traurige.",
          "Postkarten werden nie gelesen. Verschlossen aufbewahren und in der ersten Stunde im Herbst zurückgeben.",
          "Stärken-Zettel: nur Stärken, keine Witze. Blätter vor dem Vorlesen kurz selbst überfliegen."
        ],
        "impulse": [
          "Was macht einen guten Abschied aus?",
          "Was wünscht ihr der Gruppe, die nach euch kommt?"
        ],
        "material": "Umschläge, Blätter, Kreppband, Musik, ein Gegenstand zum Weitergeben",
        "blaetter": "Skills-Pass, Postkarte, Gefühlsrad."
      }
    }
  ],
  "hot": {
    "unter": "Sechs Sätze zum Streiten – nach Regeln",
    "regeln": "Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**",
    "takes": [
      "Schlaf ist Zeitverschwendung.",
      "Schule sollte erst um zehn anfangen.",
      "Energy-Drinks sollte es erst ab 18 geben.",
      "In einem Jahr kann sich ein Mensch nicht ändern.",
      "Abschiede sollte man einfach überspringen.",
      "Wer Hilfe braucht, hat es nicht im Griff."
    ]
  },
  "quiz": {
    "unter": "Zehn Fragen. Zehn Buchstaben. So gehst du hier raus.",
    "wort": "AUFGELADEN",
    "fragen": [
      {
        "f": "Warum werden Jugendliche abends so spät müde?",
        "o": [
          "die innere Uhr verschiebt sich",
          "aus Faulheit",
          "wegen zu viel Sport"
        ],
        "r": 0
      },
      {
        "f": "Wie viel Schlaf braucht dein Körper?",
        "o": [
          "fünf bis sechs Stunden",
          "acht bis zehn Stunden",
          "zwölf bis vierzehn Stunden"
        ],
        "r": 1
      },
      {
        "f": "Ein Energy-Drink am späten Nachmittag …",
        "o": [
          "hilft beim Einschlafen",
          "ist egal",
          "wirkt noch Stunden später"
        ],
        "r": 2
      },
      {
        "f": "Hunger macht gereizt heißt:",
        "o": [
          "gereizt, weil der Tank leer ist",
          "müde vom Essen",
          "satt und zufrieden"
        ],
        "r": 0
      },
      {
        "f": "Was hebt die Stimmung am schnellsten?",
        "o": [
          "eine Stunde scrollen",
          "zehn Minuten Bewegung",
          "ein dritter Energy-Drink"
        ],
        "r": 1
      },
      {
        "f": "Ein guter Mini-Schritt ist …",
        "o": [
          "groß und beeindruckend",
          "für irgendwann",
          "so klein, dass er sicher klappt"
        ],
        "r": 2
      },
      {
        "f": "Warum siehst du deine eigene Veränderung schlecht?",
        "o": [
          "sie passiert in kleinen Schritten",
          "es gibt keine",
          "andere verstecken sie"
        ],
        "r": 0
      },
      {
        "f": "Ein Rückschlag bedeutet:",
        "o": [
          "alles war umsonst",
          "er gehört dazu – weitermachen",
          "aufgeben"
        ],
        "r": 1
      },
      {
        "f": "Was weckt ein Abschied oft?",
        "o": [
          "Hunger",
          "gar nichts",
          "Erinnerungen an frühere Abschiede"
        ],
        "r": 2
      },
      {
        "f": "Was bleibt nach dem Kurs?",
        "o": [
          "was du geübt hast",
          "nichts",
          "nur das Heft"
        ],
        "r": 0
      }
    ]
  },
  "karten": [
    {
      "titel": "Nachtmodus",
      "icon": "moon",
      "zeilen": [
        "Handy raus aus dem Bett.",
        "Jeden Tag ungefähr die gleiche Zeit.",
        "Kein Koffein am Nachmittag."
      ]
    },
    {
      "titel": "Akku-Check",
      "icon": "battery-charging",
      "zeilen": [
        "Gegessen? Getrunken? Geschlafen? Bewegt?",
        "Erst den Tank füllen. **Dann streiten.**"
      ]
    },
    {
      "titel": "Mini-Schritt",
      "icon": "run",
      "zeilen": [
        "So klein, dass er sicher klappt:",
        "_Wenn",
        "_dann"
      ]
    },
    {
      "titel": "Meine Top 3",
      "icon": "flag",
      "zeilen": [
        "Diese Skills bleiben:",
        "_1",
        "_2",
        "_3"
      ]
    },
    {
      "titel": "Mein Netz",
      "icon": "heart",
      "zeilen": [
        "Wenn es eng wird, gehe ich zu:",
        "_Mensch 1",
        "_Mensch 2"
      ]
    },
    {
      "titel": "Hilfe",
      "icon": "lifebuoy",
      "zeilen": [
        "Der Kurs ist vorbei. Hilfe nicht.",
        "Sprich mit jemandem, dem du vertraust – auch der SePAS hört zu.",
        "Kinder- und Jugendtelefon **116 111** · Notruf **112**"
      ]
    }
  ],
  "abspann": {
    "posten": [
      "Schlaf ernst nehmen",
      "Akku-Check",
      "Mini-Schritt",
      "Mein Jahr sehen",
      "Abschied aushalten"
    ],
    "saetze": [
      "Das nehme ich aus dem ganzen Jahr mit:",
      "Das war Quatsch:",
      "Das wünsche ich der nächsten Gruppe:"
    ],
    "schluss": "Das war die letzte Ausgabe. Der Rest gehört dir."
  },
  "leitung": {
    "fakten": [
      [
        "Zielgruppe",
        "12–16 Jahre, 3–6 Jugendliche"
      ],
      [
        "Dauer",
        "4 Stunden à etwa 90 Min.: E29, E30 und zwei Zusatz-Termine – nur zwei Termine? Dann Stunde 01 und Stunde 04"
      ],
      [
        "Sozialform",
        "allein, zu zweit, Teams"
      ],
      [
        "Material",
        "Stifte, Rucksäcke, Würfel, Umschläge, Schere"
      ]
    ],
    "wozu": "REAL TALK ist das Heft der Jugendlichen – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Diese letzte Ausgabe verbindet Modul 8 (Gesundheit) und Modul 9 (Abschluss): Track 01 und 02 gehören zu Einheit 29, Track 03 und 04 zu Einheit 30. Wer mehr Zeit hat, macht aus jedem Track einen eigenen Termin.",
    "lernziele": [
      "Die Jugendlichen wissen, warum sie spät müde werden, und kennen drei Dinge, die ihren Schlaf verbessern.",
      "Sie erkennen den Zusammenhang zwischen Schlaf, Essen, Bewegung und Anspannung und planen einen Mini-Schritt.",
      "Sie benennen eigene Veränderungen im Jahr und wählen die Skills, die sie behalten.",
      "Sie gestalten einen Abschied aktiv mit und wissen, an wen sie sich danach wenden."
    ],
    "start": "Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten zu Beginn von Einheit 29.",
    "schluss": "Hot Takes: zwei Sätze statt „Ankommen“ (5 Min., gleiche Zeit) – oder alle sechs, wenn eine Stunde früher fertig ist, „Knack den Code“ als Wiederholung, Karten ausschneiden. Der Abspann gehört in die allerletzte Runde.",
    "hilfe": [
      "Szene und Fakten vorlesen oder reihum lesen lassen.",
      "Schlafzeiten gemeinsam ausrechnen.",
      "Jahreskurve mit drei vorgegebenen Punkten beginnen (September, Weihnachten, heute).",
      "Die Postkarte darf auch gezeichnet werden."
    ],
    "forder": [
      "Eine Woche Schlaf-Protokoll führen.",
      "Für die Neuen eine Seite „Was ich gern am Anfang gewusst hätte“ schreiben.",
      "Einen eigenen Akku-Würfel mit sechs Mini-Schritten bauen.",
      "Die Jahreskurve mit Belegen aus dem Skills-Pass ergänzen."
    ],
    "gespraech": "Schlafprobleme haben oft Gründe, die niemand in der Gruppe nennen will (Unruhe zu Hause, Angst, Medikamente). Nicht nachbohren, im Einzelgespräch aufgreifen. Beim Thema Körper nicht bewerten, was jemand isst oder wie jemand aussieht. Abschiede wecken alte Verluste: Rückzug, Albernheit oder Fernbleiben am letzten Tag sind häufig – vorher ankündigen, dass der Termin der letzte ist, und Abwesende persönlich verabschieden.",
    "druck": [
      "A4, doppelseitig, an der langen Seite gewendet. Material-Seiten (Schere) einmal extra einseitig drucken und daraus schneiden – im Heft der Jugendlichen steht auf der Rückseite die nächste Station.",
      "Seiten 1–{J} für die Jugendlichen, Seiten {L} nur für Sie.",
      "Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.",
      "Seite {K} (Karten) einzeln und einseitig drucken, am besten auf festerem Papier."
    ],
    "hot": "Es gibt keine richtige Position. Take 4 („In einem Jahr kann sich ein Mensch nicht ändern“) ist die Vorlage für Track 03 – wer zustimmt, bekommt später Gegenbeweise von der Gruppe. Take 5 offen stehen lassen; er wird am letzten Tag von selbst beantwortet.",
    "achtung": "Beim Thema Körper keine Zahlen: kein Gewicht, keine Kalorien, keine Kleidergrößen. Niemanden zu Bewegung oder Leistung drängen; Rucksack-Rennen und Würfel sind freiwillig. Bei „5-4-3-2-1“ dürfen die Augen offen bleiben; wer mag, setzt aus. Niemand muss etwas über das eigene Zimmer oder die eigene Familie sagen. Die Postkarten liest niemand.",
    "hintergrund": "In der Pubertät verschiebt sich der Schlaf-Wach-Rhythmus nach hinten (Carskadon); empfohlen sind acht bis zehn Stunden Schlaf (Paruthi et al.). Stress entsteht, wenn Anforderungen die eigenen Mittel übersteigen (Lazarus & Folkman); gesund bleibt eher, wer sein Leben als verstehbar, handhabbar und sinnvoll erlebt (Antonovsky). Kleine, konkrete Pläne werden eher umgesetzt als gute Vorsätze (Gollwitzer). Widerstandskraft ist nichts Besonderes, sondern entsteht aus gewöhnlichen Dingen wie verlässlichen Beziehungen (Masten). Über Erlebtes zu schreiben entlastet (Pennebaker), Dankbarkeit hebt das Wohlbefinden (Emmons & McCullough).",
    "quellen": "Carskadon (2011) · Paruthi et al. (2016) · Lazarus & Folkman (1984) · Antonovsky (1987) · Gollwitzer (1999) · Masten (2014) · Pennebaker (1997) · Emmons & McCullough (2003). Angaben zu den Einheiten 29–30 in der Toolbox."
  },
  "geprueft": "14.11.2026"
}

// Fassung mit Stunden (16.11.2026): Die Einheiten sind zusammenhängende Stunden (m8-stunden.ts). Die Angaben oben bleiben als Quelle;
// gedruckt werden die Stunden. Die letzte Einheit heißt jetzt „Letzte Stunde“ (früher „Letzter Track“).
Object.assign(d, JSON.parse(JSON.stringify(d).split('Letzter Track').join('Letzte Stunde')))
aufStunden(d, stunden(d), { geprueft: '16.11.2026', loesungen })
d.tracks[0].leitung.material = 'Kreppband und Zeit-Zettel (20–1 Uhr) für die Schlaf-Linie; ' + d.tracks[0].leitung.material
d.tracks[3].leitung.material = 'Postkarten (A6) und Umschläge, ein Gegenstand für den Kreis, Musik; ' + d.tracks[3].leitung.material
export default d
