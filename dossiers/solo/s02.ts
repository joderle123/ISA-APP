// SOLO #02 · GRENZEN – Mauer oder offenes Tor: Nein sagen, Nein hören, Nähe und Abstand. Anschluss an REAL TALK #05.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s02",
  "nr": "02",
  "datei": "Solo-02-Grenzen",
  "reihe": "Thema",
  "thema": "Grenzen",
  "headline": "Mauer oder offenes Tor?",
  "farbe": "#FF5A36",
  "stand": "November 2026",
  "bild": "peep:chloe:besorgt",
  "sticker": "Deine Regeln",
  "seiten": [
    {
      "titel": "Grenzen",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "„Du musst lernen, Nein zu sagen.“ Hast du gehört. Mehrmals. Geholfen hat es ungefähr so viel wie „Reiß dich zusammen“.",
            "Wie man Nein sagt, steht hinten auf einer Karte. Hier geht es darum, **warum es bei manchen Leuten nicht rauskommt** – und bei anderen viel zu hart."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Kennst du auswendig"
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
                  "„Du musst lernen, Nein zu sagen.“",
                  "„Setz doch einfach Grenzen.“",
                  "„Sag Stopp, wenn es dir zu viel wird.“",
                  "„Respektier die Grenzen der anderen.“",
                  "„Das darfst du dir nicht gefallen lassen.“"
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
            "Wo stehst du?"
          ],
          "wie": "allein",
          "zeit": "1 Min.",
          "fragen": [
            {
              "f": "0 = leicht, 10 = fast unmöglich. Kreise ein:",
              "regler": [
                "Nein sagen",
                "Jemanden nah ranlassen"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Was dir zu Grenzen wahrscheinlich noch keiner gesagt hat",
      "sticker": "Neu?",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:chloe:besorgt",
          "name": "Chloé, 16",
          "text": "Chloé leiht alles her: Ladekabel, Hausaufgaben, ihr Bett, wenn eine Freundin Stress zu Hause hat. Alle sagen: „Chloé ist die Netteste.“ Am Freitag fragt Mila zum dritten Mal nach 20 Euro. Chloé hat selbst nur 25. Sie sagt: „Klar.“ Zu Hause tritt sie gegen die Schranktür. Auf Mila ist sie nicht sauer. Auf sich schon.",
          "frage": "Warum ist Chloé sauer auf sich – und nicht auf Mila?"
        },
        {
          "art": "fakten",
          "titel": "Drei Behauptungen – streich, was du kanntest",
          "fakten": [
            {
              "t": "Weich oder hart",
              "x": "Eine Grenze kann zu weich sein: Alle kommen rein. Oder zu hart: Keiner kommt ran. **Beides schützt. Beides kostet.**"
            },
            {
              "t": "Der Körper zuerst",
              "x": "Bauch zieht sich zusammen, Kiefer wird fest, ein halber Schritt zurück. **Dein Nein ist da, bevor du es denkst.**"
            },
            {
              "t": "Gelernt, nicht angeboren",
              "x": "Wer als Kind kein Nein haben durfte, hat es nicht verlernt. **Er hat es nie geübt.** Das lässt sich nachholen."
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Sozialexperiment: Wie viel Nähe verträgt der Mensch?",
            "kanal": "Quarks",
            "url": "https://www.youtube.com/watch?v=wEALzPr7hBo",
            "dauer": "die ersten 5 Min.",
            "frage": "Woran sieht man, dass es jemandem zu nah wird – bevor er etwas sagt?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Bei wem ist deine Grenze ==eine Mauer== – und bei wem ==ein offenes Tor==?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Eine für dich, eine zusammen, eine im Duell",
      "sticker": "Beide antworten",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Mauer oder Tor",
          "wie": "allein",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Wie ist deine Grenze bei …",
              "raster": {
                "spalten": [
                  "Mauer",
                  "eher Mauer",
                  "passt",
                  "eher Tor",
                  "Tor"
                ],
                "zeilen": [
                  "Familie",
                  "Freunden",
                  "Leuten, in die ich verknallt bin",
                  "Erwachsenen mit Macht (Lehrer, Betreuer, Polizei)",
                  "Fremden im Netz"
                ]
              }
            },
            {
              "f": "Beides hat einen Grund:",
              "satz": [
                "Meine Mauer schützt mich vor:",
                "Mein offenes Tor bringt mir:"
              ]
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Chloés Rechnung",
          "wie": "zusammen",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Mila fragt nach 20 Euro. Rechne durch:",
              "preis": {
                "erste": "Chloé …",
                "kopf": [
                  "kostet sie",
                  "bringt ihr"
                ],
                "optionen": [
                  "sagt wieder „Klar“",
                  "sagt: „Diesmal nicht.“",
                  "sagt: „Ich überleg’s mir.“"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Wo ist deine Linie?",
          "band": [
            "swords",
            "Duell – beide antworten"
          ],
          "wie": "beide",
          "zeit": "6 Min.",
          "kontext": "Beide schreiben verdeckt eine Zahl von **0** (kein Problem) bis **10** (geht gar nicht). Dann aufdecken.",
          "fragen": [
            {
              "f": "Jemand …",
              "preis": {
                "erste": "Situation",
                "kopf": [
                  "du",
                  "Gegenüber"
                ],
                "optionen": [
                  "liest über deine Schulter deine Nachrichten mit",
                  "umarmt dich zur Begrüßung, ohne zu fragen",
                  "kommt in dein Zimmer, ohne zu klopfen",
                  "postet ein Foto von dir, ohne zu fragen"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Ein Nein zum Üben – und sechs Fragen, von leicht bis tief",
      "sticker": "Für danach",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Das kleinste Nein",
          "x": "Sag diese Woche einmal Nein zu etwas fast Egalem – bei jemandem in deinem Alter: Kaugummi, Sitzplatz, Lied. **Ohne Grund, ohne Entschuldigung, ohne Lächeln.** Wette vorher: Was macht der andere? Was macht dein Körper?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Körper-Check",
              "icon": "activity",
              "zeilen": [
                "Bauch zieht sich zusammen?",
                "Kiefer fest? Schritt zurück?",
                "Dann ist es ein Nein – auch wenn der Mund Ja sagt."
              ]
            },
            {
              "titel": "Drei Sätze reichen",
              "icon": "hand-stop",
              "zeilen": [
                "„Nein.“",
                "„Diesmal nicht.“",
                "„Ich überleg’s mir und sag dir Bescheid.“"
              ],
              "eigen": "Meiner:"
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Wem kannst du am leichtesten Nein sagen?",
              "Welches Nein von jemand anderem hat dich zuletzt genervt?"
            ],
            [
              "Wann hast du zuletzt Ja gesagt und Nein gemeint?",
              "Wer hält deine Grenzen ein, ohne dass du sie sagen musst?"
            ],
            [
              "Welches Nein hast du zu spät verstanden?",
              "Gibt es eine Grenze, die früher jemand bei dir übergangen hat – und die du heute verteidigen würdest? Du musst nicht sagen, welche."
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
      "f": "Wer als Kind kein Nein haben durfte, hat es …",
      "o": [
        "für immer verlernt",
        "gar nicht nötig",
        "nie geübt",
        "falsch verstanden"
      ],
      "r": 2,
      "warum": "Nie geübt heißt: Es lässt sich nachholen."
    },
    {
      "f": "Woran merkt man die eigene Grenze meistens zuerst?",
      "o": [
        "am Körper",
        "an den Worten",
        "am schlechten Gewissen",
        "erst am nächsten Tag"
      ],
      "r": 0,
      "warum": "Bauch, Kiefer, Schritt zurück – vor dem Gedanken."
    },
    {
      "f": "„Ich überleg’s mir“ ist …",
      "o": [
        "feige",
        "unhöflich",
        "eine erlaubte Antwort",
        "dasselbe wie Ja"
      ],
      "r": 2,
      "warum": "Zeit kaufen ist eine Grenze."
    },
    {
      "f": "Du willst dein Ladekabel nicht verleihen. Brauchst du einen Grund?",
      "o": [
        "ja, einen guten",
        "ja, sonst ist es unhöflich",
        "nur bei Freunden",
        "nein"
      ],
      "r": 3,
      "warum": "Erklären darf man. Müssen nicht."
    },
    {
      "f": "Jemand sagt Ja, schaut weg und wird still. Das ist …",
      "o": [
        "ein klares Ja",
        "wahrscheinlich kein echtes Ja",
        "egal",
        "ein Kompliment"
      ],
      "r": 1,
      "warum": "Worte und Körper passen nicht zusammen – nachfragen."
    },
    {
      "f": "Wer immer Ja sagt, …",
      "o": [
        "hat keine Probleme",
        "ist bei allen beliebt",
        "zahlt oft selbst den Preis",
        "braucht keine Grenzen"
      ],
      "r": 2,
      "warum": "Siehe Chloé und die Schranktür."
    },
    {
      "f": "Eine Mauer um sich herum …",
      "o": [
        "schützt – und hält auch die Guten draußen",
        "ist immer die beste Lösung",
        "kostet nichts",
        "haben nur Schwache"
      ],
      "r": 0,
      "warum": "Beides stimmt gleichzeitig."
    },
    {
      "f": "Chloé sagt „Klar“ und tritt zu Hause gegen die Schranktür. Auf wen ist sie sauer?",
      "o": [
        "auf Mila",
        "auf ihre Eltern",
        "auf alle",
        "auf sich selbst"
      ],
      "r": 3,
      "warum": "Das Ja hat sie selbst gegeben – gegen ihren Willen."
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
        "REAL TALK #05"
      ]
    ],
    "wann": [
      "Sagt zu allem Ja und explodiert später – oder zieht sich zurück.",
      "Lässt niemanden an sich heran; jede Nähe wird abgewehrt.",
      "Überschreitet selbst Grenzen: Nähe, Sachen, Sprüche.",
      "Nach einem Vorfall, bei dem ein Nein überhört wurde."
    ],
    "ziel": "Der Jugendliche erkennt sein eigenes Muster (zu weich, zu hart, je nach Person) als sinnvolle Schutzlösung – und probiert ein kleines Nein aus, das nichts kostet.",
    "anschluss": "Im Skills-Kurs vertieft REAL TALK #05 die Sätze dazu (Ich-Satz, Stopp).",
    "ablauf": [
      [
        "0–5",
        "Logbuch: Akku und letztes Experiment. Dann Seite 1 – „Schon mal gehört?“ ohne Kommentar ankreuzen lassen."
      ],
      [
        "5–20",
        "Der Fall und die drei Kästen. Video gemeinsam schauen. Die unbequeme Frage stellen und Stille aushalten."
      ],
      [
        "20–40",
        "„Mauer oder Tor“ allein, „Chloés Rechnung“ gemeinsam, dann das Duell: Sie schreiben Ihre Zahlen wirklich auf."
      ],
      [
        "40–50",
        "Experiment vereinbaren, Karten ausschneiden. Wenn Zeit ist: Der Jugendliche wählt eine Stufe und stellt Ihnen zuerst eine Frage."
      ]
    ],
    "haltung": [
      "Mauer und Tor sind beides Lösungen, die einmal nötig waren. Erst würdigen, dann fragen, was sie heute kosten.",
      "Im Duell eigene Zahlen nicht anpassen. Unterschiede sind der Inhalt.",
      "Kein Rollenspiel erzwingen. Das Experiment draußen ist die Übung.",
      "Wenn der Jugendliche Ihnen gegenüber Nein sagt: Das ist der Erfolg der Stunde."
    ],
    "hinweise": [
      "Seite 2: Die Lösung zur Szene ist die Rechnung auf Seite 3 – nicht vorwegnehmen.",
      "Seite 3: „Ich überleg’s mir“ ist für viele die Entdeckung: Zwischen Ja und Nein gibt es Zeit.",
      "Seite 4: Stufe 3 wählt nur der Jugendliche. Die letzte Frage verlangt keine Einzelheiten."
    ],
    "achtung": "Das Thema kann Übergriffe berühren – eigene erlittene und eigene begangene. Nicht ausfragen, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt oder eine aktuelle Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Über eigene Grenzverletzungen ohne Beschämung sprechen: Es geht um den nächsten Moment.",
    "extra": [
      {
        "titel": "Einverständnis – so einfach wie Tee",
        "kanal": "GONEASTRAYfilms",
        "url": "https://www.youtube.com/watch?v=2ovcQgIN5G4",
        "dauer": "ca. 3 Min.",
        "frage": "Handelt von sexuellem Einverständnis; passt, wenn das Thema von selbst aufkommt."
      }
    ],
    "hintergrund": "Menschen halten je nach Beziehung unterschiedliche Abstände ein und reagieren körperlich, wenn sie unterschritten werden (Hall). Die Fertigkeit, ein Anliegen oder ein Nein zu vertreten, ohne die Beziehung oder die Selbstachtung zu opfern, ist ein Kernstück des DBT-Skillstrainings, auch für Jugendliche (Linehan; Rathus & Miller). Wer früh erlebt hat, dass eigene Grenzen nicht zählen, entwickelt häufig überangepasstes oder stark abwehrendes Verhalten; beides lässt sich als Schutz verstehen (van der Kolk).",
    "quellen": "Hall (1966) · Linehan (2015) · Rathus & Miller (2015) · van der Kolk (2014)."
  }
}
export default d
