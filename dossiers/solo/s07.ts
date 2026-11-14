// SOLO #07 · STIMME – die Stimme im Kopf, die alles mies macht (Selbstwert). Anschluss an REAL TALK #04.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s07",
  "nr": "07",
  "datei": "Solo-07-Stimme",
  "reihe": "Thema",
  "thema": "Stimme",
  "headline": "Wer redet da eigentlich so mit dir?",
  "farbe": "#B79CFF",
  "stand": "November 2026",
  "bild": "peep:mia:traurig",
  "sticker": "Wörtlich zitiert",
  "seiten": [
    {
      "titel": "Stimme",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "„Du musst an dich glauben.“ „Du bist toll, so wie du bist.“ Nett gemeint. Bringt nichts – weil die Stimme in deinem Kopf lauter ist als jeder, der das sagt.",
            "Diese Stimme – deine eigenen Gedanken – kommentiert alles, was du tust. In einem Ton, den du dir von keinem anderen gefallen lassen würdest. **Heute wird sie wörtlich zitiert.** Um herauszufinden, wem sie gehört."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Nett gemeint"
          ],
          "wie": "allein",
          "zeit": "2 Min.",
          "fragen": [
            {
              "f": "Kreuze an:",
              "raster": {
                "spalten": [
                  "schon gehört",
                  "hat geholfen"
                ],
                "zeilen": [
                  "„Du musst an dich glauben.“",
                  "„Sei nicht so streng mit dir.“",
                  "„Du bist toll, so wie du bist.“",
                  "„Denk doch mal positiv.“",
                  "„Andere haben es viel schlimmer.“"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Standort",
          "band": [
            "map-pin",
            "Zwei Zahlen vorab"
          ],
          "wie": "allein",
          "zeit": "1 Min.",
          "fragen": [
            {
              "f": "0 = gar nicht, 10 = extrem. Kreise ein:",
              "regler": [
                "So laut ist die Stimme heute",
                "So sehr glaube ich ihr"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Drei Dinge über die Stimme, die sie dir selbst nie sagen würde",
      "sticker": "Stimmt das?",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:mia:traurig",
          "name": "Mia, 16",
          "text": "Mia bekommt die Arbeit zurück: 14 von 20. Die Lehrerin sagt: „Gut gemacht.“ Die Stimme in Mias Kopf sagt: „Sechs Fehler. Bei so einer leichten Arbeit. Die anderen hatten sicher mehr. Die sagt das nur aus Mitleid.“ Mia lächelt und packt das Blatt weg. Niemand im Raum würde so mit ihr reden. Nur sie selbst.",
          "frage": "Was würde Mia tun, wenn jemand so mit ihrer besten Freundin redet?"
        },
        {
          "art": "fakten",
          "titel": "Drei Dinge über die Stimme",
          "fakten": [
            {
              "t": "Die Stimme gehört jemandem",
              "x": "Hör auf den Tonfall, nicht auf die Wörter. **Oft klingt sie wie jemand, den du kennst.** Du hast sie gelernt, nicht erfunden."
            },
            {
              "t": "Sie will dich schützen",
              "x": "Wer sich selbst zuerst fertigmacht, den kann kein anderer mehr überraschen. **Die Stimme ist ein schlechter Bodyguard – aber ein Bodyguard.**"
            },
            {
              "t": "Härte macht nicht besser",
              "x": "Wer nach einem Fehler fair zu sich ist, **versucht es eher noch einmal**. Wer sich fertigmacht, gibt eher auf."
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Impostor-Syndrom: Warum wir uns manchmal als Hochstapler fühlen",
            "kanal": "Quarks Dimension Ralph",
            "url": "https://www.youtube.com/watch?v=8sPRWUwsmfk",
            "dauer": "die ersten 5 Min.",
            "frage": "Erfolgreiche Leute glauben ihr auch. Was sagt das über die Stimme?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "In wessen ==Tonfall== redet die Stimme in deinem Kopf?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Erst mitschreiben, was sie sagt. Dann prüfen: Redest du so mit Leuten, die du magst?",
      "sticker": "Zu zweit",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Die Stimme zitieren",
          "wie": "allein",
          "zeit": "5 Min.",
          "kontext": "Schreib sie wörtlich auf. Wie ein Protokoll – ohne zu diskutieren.",
          "fragen": [
            {
              "f": "Zitate:",
              "satz": [
                "Das sagt sie am häufigsten:",
                "Das sagt sie nach einem Fehler:",
                "Ihr Ton (spöttisch, streng …):"
              ]
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Gleiche Lage, zwei Stimmen",
          "wie": "zusammen",
          "zeit": "7 Min.",
          "fragen": [
            {
              "f": "Schreib beides auf:",
              "preis": {
                "erste": "Lage",
                "kopf": [
                  "das sage ich zu mir",
                  "das sage ich einem, den ich mag"
                ],
                "optionen": [
                  "Ich habe etwas verhauen.",
                  "Jemand antwortet mir nicht.",
                  "Jemand lobt mich."
                ]
              }
            },
            {
              "f": "Warum der Unterschied?",
              "linien": 1
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Auch Erwachsene haben eine",
          "band": [
            "swords",
            "Duell – beide antworten"
          ],
          "wie": "beide",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Erst raten, was der andere schreibt – dann aufdecken:",
              "preis": {
                "erste": "Frage",
                "kopf": [
                  "du",
                  "Gegenüber"
                ],
                "optionen": [
                  "Mein häufigster Satz gegen mich",
                  "In welcher Lage er kommt",
                  "Wann die Stimme leise ist"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Ein Tag Strichliste – und ein Satz für die Stimme",
      "sticker": "Zum Mitnehmen",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Strichliste",
          "x": "Zähl **einen einzigen Tag** lang mit: Jeder Satz, mit dem du dich selbst fertigmachst, ist ein Strich – auf einem Zettel oder im Handy. Nichts ändern, nur zählen. Wette vorher: Wie viele werden es bis zum Abend?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Wer redet da?",
              "icon": "volume",
              "zeilen": [
                "Die Stimme meldet sich.",
                "Kurz hinhören: Wessen Tonfall ist das?",
                "„Hab’s gehört.“ Dann weitermachen."
              ]
            },
            {
              "titel": "Trainer statt Richter",
              "icon": "heart-handshake",
              "zeilen": [
                "Was ist passiert? Nur das, was man sehen kann.",
                "Was würde ein guter Trainer jetzt sagen?",
                "Was ist der nächste Versuch?"
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Wofür würde dich jemand loben?",
              "Welches Kompliment hast du zuletzt nicht geglaubt?"
            ],
            [
              "Welchen Satz glaubst du nur an schlechten Tagen?",
              "Bei wem ist sie leiser?"
            ],
            [
              "Wer hat zuerst so mit dir geredet?",
              "Was müsste passieren, damit du ihr nicht mehr glaubst?"
            ]
          ]
        },
        {
          "art": "check"
        }
      ]
    }
  ],
  "quiz": [
    {
      "f": "Woher kommt die strenge Stimme im Kopf meistens?",
      "o": [
        "Sie ist angeboren.",
        "Sie kommt aus dem Nichts.",
        "Sie wurde gelernt – oft von echten Menschen.",
        "Sie ist die Wahrheit über mich."
      ],
      "r": 2,
      "warum": "Deshalb lohnt die Frage nach dem Tonfall."
    },
    {
      "f": "Was will die Stimme eigentlich erreichen?",
      "o": [
        "dich schützen – auf eine schlechte Art",
        "dich fertigmachen",
        "dich besser machen",
        "dich unterhalten"
      ],
      "r": 0,
      "warum": "Wer sich zuerst kleinmacht, wird nicht überrascht."
    },
    {
      "f": "Wer macht nach einem Fehler eher weiter?",
      "o": [
        "wer sich fertigmacht",
        "wer fair mit sich umgeht",
        "beide gleich",
        "keiner von beiden"
      ],
      "r": 1,
      "warum": "Härte lähmt, Fairness hält im Spiel."
    },
    {
      "f": "Was prüft die Aufgabe „Gleiche Lage, zwei Stimmen“?",
      "o": [
        "Wie viele Freunde habe ich?",
        "Wer mag mich nicht?",
        "Wer ist schuld am Fehler?",
        "Würde ich so mit jemandem reden, den ich mag?"
      ],
      "r": 3,
      "warum": "Meistens lautet die Antwort Nein."
    },
    {
      "f": "Hilft „Denk doch positiv“ gegen die Stimme?",
      "o": [
        "meistens nicht",
        "ja, sofort",
        "nur an guten Tagen",
        "ja, wenn man es oft genug sagt"
      ],
      "r": 0,
      "warum": "Ein neuer Satz muss stimmen, sonst glaubt ihn der Kopf nicht."
    },
    {
      "f": "Die Stimme ist laut Heft ein schlechter …",
      "o": [
        "Lehrer",
        "Freund",
        "Witz",
        "Bodyguard"
      ],
      "r": 3,
      "warum": "Sie will schützen – nur auf eine schlechte Art."
    },
    {
      "f": "Wer kennt das Gefühl „gleich fliegt auf, dass ich nichts kann“?",
      "o": [
        "nur Leute, die wirklich nichts können",
        "nur Jugendliche",
        "sehr viele, auch Erfolgreiche",
        "fast niemand"
      ],
      "r": 2,
      "warum": "Es sagt wenig über das, was man wirklich kann."
    },
    {
      "f": "Was ist der erste Schritt gegen die Stimme?",
      "o": [
        "sie anschreien",
        "sie bemerken",
        "ihr recht geben",
        "sie übertönen"
      ],
      "r": 1,
      "warum": "Wer sie bemerkt, ist schon nicht mehr dasselbe wie sie."
    }
  ],
  "begleitung": {
    "fakten": [
      [
        "Für wen",
        "12–17 Jahre, Einzelarbeit"
      ],
      [
        "Dauer",
        "45–50 Min., teilbar"
      ],
      [
        "Material",
        "Stift, Schere, Gerät fürs Video"
      ],
      [
        "Passt zu",
        "REAL TALK #04"
      ]
    ],
    "wann": [
      "Wertet sich ständig ab oder wehrt jedes Lob ab.",
      "Gibt schnell auf: „Kann ich eh nicht.“",
      "Perfektionismus – nichts ist gut genug.",
      "Nach außen cool, nach innen gnadenlos."
    ],
    "ziel": "Der Jugendliche hört die abwertende Stimme zum ersten Mal als etwas, das er hat – nicht als etwas, das er ist – und erkennt, woher ihr Ton stammt.",
    "anschluss": "Das Prüfen einzelner Sätze (Beweise dafür und dagegen) steht in REAL TALK #04.",
    "ablauf": [
      [
        "0–5",
        "Logbuch. Seite 1: Wenn „Du bist toll“ als „schon gehört, hat nicht geholfen“ angekreuzt ist – in dieser Stunde kein einziges Lob aussprechen."
      ],
      [
        "5–20",
        "Der Fall, die Kästen, das Video. Die unbequeme Frage stellen und warten. Kommt keine Antwort, ist „weiß ich nicht“ völlig in Ordnung."
      ],
      [
        "20–40",
        "„Die Stimme zitieren“ allein. „Gleiche Lage, zwei Stimmen“ gemeinsam. Dann das Duell: Ihr eigener Satz gegen sich selbst."
      ],
      [
        "40–50",
        "Experiment vereinbaren, Karten ausschneiden, eine Frage aus den drei Stufen."
      ]
    ],
    "haltung": [
      "Nicht dagegenreden. Jedes „Das stimmt doch gar nicht“ macht die Stimme lauter.",
      "Die Stimme als Schutz würdigen: Sie hat einmal einen Zweck erfüllt.",
      "Ihr eigener Satz im Duell muss echt sein. Das ist für viele Jugendliche die Überraschung der Stunde.",
      "Auf den Tonfall achten, den der Jugendliche beim Zitieren benutzt – er verrät oft die Herkunft."
    ],
    "hinweise": [
      "Seite 3: Kommt das Thema Körper auf, SOLO „Körper“ anbieten und nicht hier vertiefen.",
      "Seite 4: Die Strichliste verändert meist schon durch das Zählen etwas. Die Zahl nicht bewerten.",
      "Stufe 3: „Wer hat zuerst so mit dir geredet?“ führt oft in die Familie. Nur zuhören."
    ],
    "achtung": "Starke Selbstabwertung kann mit Selbstverletzung oder Suizidgedanken einhergehen. Sätze wie „Ohne mich wäre es besser“ ruhig und direkt aufgreifen: „Denkst du manchmal daran, nicht mehr leben zu wollen?“ Danach nicht allein entscheiden – Verfahren der Einrichtung, zuständige Leitung (Responsable), Krisenplan. Stammt die Stimme erkennbar aus Abwertung oder Gewalt zu Hause, ist das ein Hinweis auf Belastung, der ins Team gehört.",
    "hintergrund": "Selbstkritik lässt sich als früh gelernte Sicherheitsstrategie verstehen: Wer sich selbst angreift, kommt der Zurückweisung durch andere zuvor (Gilbert). Ein freundlicher Umgang mit eigenen Fehlern geht mit mehr, nicht weniger Bereitschaft einher, es erneut zu versuchen (Breines & Chen; Neff). Gedanken als Gedanken zu bemerken, statt ihnen zu glauben, ist ein Kernprinzip kognitiver und achtsamkeitsbasierter Verfahren (Beck; Hayes et al.). Selbstbeobachtung allein verändert Verhalten bereits messbar (Korotitsch & Nelson-Gray).",
    "quellen": "Gilbert (2010) · Breines & Chen (2012) · Neff (2003) · Beck (1979) · Hayes, Strosahl & Wilson (2012) · Korotitsch & Nelson-Gray (1999)."
  }
}
export default d
