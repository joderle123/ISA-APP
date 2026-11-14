// SOLO #03 · SCROLLEN – Handy und Social Media in der Einzelarbeit. Anschluss an REAL TALK #07.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s03",
  "nr": "03",
  "datei": "Solo-03-Scrollen",
  "reihe": "Thema",
  "thema": "Scrollen",
  "headline": "Was fühlst du in der Sekunde davor?",
  "farbe": "#2EE6A8",
  "stand": "November 2026",
  "bild": "peep:mia:muede:handy",
  "sticker": "Handy bleibt an",
  "seiten": [
    {
      "titel": "Scrollen",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Dass Apps gebaut sind, damit du bleibst, weißt du. Dass im Feed alles gestellt ist, auch. Du könntest den Vortrag selbst halten.",
            "Die spannendere Frage ist eine andere: **Wenn du das alles weißt – warum wirkt es trotzdem?** Darum geht es hier. Und zwar bei euch beiden."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Der Handy-Vortrag"
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
                  "„Leg doch mal das Handy weg.“",
                  "„Das ist alles nicht echt.“",
                  "„Früher haben wir draußen gespielt.“",
                  "„Stell dir ein Zeitlimit ein.“",
                  "„Du verpasst das echte Leben.“"
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
            "Bevor wir anfangen"
          ],
          "wie": "allein",
          "zeit": "1 Min.",
          "fragen": [
            {
              "f": "0 = gar nicht, 10 = extrem. Kreise ein:",
              "regler": [
                "Mein Scrollen nervt mich selbst",
                "Es nervt mich, dass Erwachsene darüber reden"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Drei Dinge, die im Handy-Vortrag der Erwachsenen meistens fehlen",
      "sticker": "Stimmt das?",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:mia:traurig",
          "name": "Mia, 16",
          "text": "Mia will um elf nur kurz schauen. Um zwanzig nach eins hat sie 300 Leute gesehen, die schöner wohnen, besser aussehen und mehr Freunde haben. Sie kennt keinen davon. Sie weiß, dass das gestellt ist – ihre eigenen Fotos macht sie ja genauso. Es hilft nichts. Sie fühlt sich trotzdem wie der einzige Mensch, bei dem nichts los ist.",
          "frage": "Mia weiß, dass alles gestellt ist. Warum wirkt es trotzdem?"
        },
        {
          "art": "fakten",
          "titel": "Was im Vortrag fehlt",
          "fakten": [
            {
              "t": "Vergleichen geht von allein",
              "x": "Dein Kopf vergleicht, bevor du denkst. **„Ist gestellt“ kommt eine Sekunde zu spät** – das Gefühl ist schon da."
            },
            {
              "t": "Kein Ende eingebaut",
              "x": "Ein Buch hat eine letzte Seite, eine Folge einen Abspann. Der Feed nicht. **Du hörst nicht auf, weil nichts aufhört.**"
            },
            {
              "t": "Es geht selten ums Handy",
              "x": "Oft greifst du hin, weil das Gefühl davor mies ist: leer, allein, unter Druck. **Das Handy ist die schnellste Betäubung, die es gibt.**"
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Social Media: Warum kann ich nicht aufhören mit Binge-Scrolling?",
            "kanal": "Quarks Dimension Ralph",
            "url": "https://www.youtube.com/watch?v=_V_VBrW3ZuY",
            "dauer": "die ersten 5 Min.",
            "frage": "Welcher Trick wirkt bei dir am besten – ehrlich?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Was fühlst du in der Sekunde, ==bevor== du zum Handy greifst?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Zahlen auf den Tisch. Die von deinem Gegenüber auch",
      "sticker": "Auch dein Gegenüber",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Die Daten",
          "band": [
            "swords",
            "Duell – beide antworten"
          ],
          "wie": "beide",
          "zeit": "8 Min.",
          "kontext": "Erst schätzen, dann beide in den Einstellungen nachschauen. **Zeigen muss keiner – sagen reicht.** Wer näher an seiner eigenen Schätzung liegt, gewinnt.",
          "fragen": [
            {
              "f": "Bildschirmzeit:",
              "preis": {
                "erste": "Gestern",
                "kopf": [
                  "du",
                  "Gegenüber"
                ],
                "optionen": [
                  "geschätzte Zeit",
                  "gemessene Zeit",
                  "so oft entsperrt",
                  "App Nummer eins",
                  "längste Pause ohne Handy (Stunden)"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Fünf Minuten Feed",
          "wie": "beide",
          "zeit": "8 Min.",
          "kontext": "Jetzt, hier, beide: **fünf Minuten scrollen.** Vorher eine Zahl, nachher eine Zahl.",
          "fragen": [
            {
              "f": "Meine Laune (0 mies – 10 super):",
              "regler": [
                "vorher",
                "nachher"
              ]
            },
            {
              "f": "Drei Dinge, die ich gerade gesehen habe und noch weiß:",
              "linien": 1
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Wofür eigentlich?",
          "wie": "allein",
          "zeit": "4 Min.",
          "fragen": [
            {
              "f": "Wofür nimmst du das Handy? Kreise ein. **Streich durch, wobei es nicht hilft.**",
              "kreis": [
                "Langeweile",
                "nicht allein sein",
                "runterkommen",
                "nichts verpassen",
                "einschlafen",
                "Stress vergessen",
                "mit Leuten reden",
                "etwas wissen wollen"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Drei Tage grau – und eine Karte für die Sekunde davor",
      "sticker": "Bis nächstes Mal",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Drei Tage grau",
          "x": "Stell dein Handy drei Tage auf **Schwarz-Weiß** (Einstellungen: „Graustufen“ suchen). Geht nicht? Nimm deine App Nummer eins vom Startbildschirm. Wette vorher: Was passiert mit Bildschirmzeit und Laune?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Die Sekunde davor",
              "icon": "player-pause",
              "zeilen": [
                "Die Hand geht zum Handy.",
                "Kurz stoppen: Was fühle ich gerade?",
                "Leer, allein, gestresst – oder will ich wirklich etwas?"
              ]
            },
            {
              "titel": "Mein Ende",
              "icon": "flag",
              "zeilen": [
                "Der Feed hat kein Ende. Ich baue eins:",
                "_Schluss bei",
                "_Danach"
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Welcher Account macht dir wirklich gute Laune?",
              "Welche App würdest du löschen, wenn alle anderen sie auch löschen?"
            ],
            [
              "Mit wem vergleichst du dich am meisten?",
              "Wann hast du zuletzt etwas gepostet und dann auf Reaktionen gewartet?"
            ],
            [
              "Wer wärst du im Netz, wenn dich dort keiner kennen würde?",
              "Was würdest du merken, wenn das Handy eine Woche weg wäre – außer Langeweile?"
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
      "f": "Du weißt, dass ein Foto gestellt ist. Was ist trotzdem schneller?",
      "o": [
        "der Gedanke „ist gestellt“",
        "der Griff zum Ausschalten",
        "die Langeweile",
        "das Gefühl beim Vergleichen"
      ],
      "r": 3,
      "warum": "Der Kopf vergleicht, bevor du denkst."
    },
    {
      "f": "Was fehlt einem Feed, das ein Buch hat?",
      "o": [
        "Bilder",
        "ein Ende",
        "Spannung",
        "neue Folgen"
      ],
      "r": 1,
      "warum": "Ohne Stopp-Stelle hört man später auf."
    },
    {
      "f": "Wer gewinnt beim Duell „Die Daten“?",
      "o": [
        "wer weniger Bildschirmzeit hat",
        "wer seltener entsperrt hat",
        "wer näher an seiner Schätzung liegt",
        "wer zuerst fertig ist"
      ],
      "r": 2,
      "warum": "Es zählt, wie gut du dich kennst – nicht, wie wenig du scrollst."
    },
    {
      "f": "Was misst du bei „Fünf Minuten Feed“?",
      "o": [
        "wie viele Videos du schaffst",
        "deine Laune vorher und nachher",
        "deinen Akku",
        "wie schnell du tippst"
      ],
      "r": 1,
      "warum": "Eine Zahl vorher, eine nachher – mehr braucht es nicht."
    },
    {
      "f": "Wonach greifen Leute oft zum Handy?",
      "o": [
        "nach einem miesen Gefühl",
        "nach einem guten Tag",
        "wenn jemand zuschaut",
        "wenn alles erledigt ist"
      ],
      "r": 0,
      "warum": "Langeweile, Leere, Druck – das Handy betäubt schnell."
    },
    {
      "f": "Was soll die Karte „Mein Ende“ ersetzen?",
      "o": [
        "den Wecker",
        "ein Zeitlimit der Eltern",
        "den Akku",
        "das Ende, das der Feed nicht hat"
      ],
      "r": 3,
      "warum": "Der Feed hört nicht auf. Also baust du die Stopp-Stelle selbst."
    },
    {
      "f": "Mia hat 300 Leute gesehen. Wie viele davon kennt sie?",
      "o": [
        "keinen",
        "die Hälfte",
        "die meisten",
        "alle"
      ],
      "r": 0,
      "warum": "Sie vergleicht sich mit Fremden."
    },
    {
      "f": "Was fragt die Karte „Die Sekunde davor“?",
      "o": [
        "Wie spät ist es?",
        "Wer hat geschrieben?",
        "Was fühle ich gerade?",
        "Wie viel Akku habe ich?"
      ],
      "r": 2,
      "warum": "Oft geht es ums Gefühl davor, nicht ums Handy."
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
        "beide Handys, Stift, Schere"
      ],
      [
        "Passt zu",
        "REAL TALK #07"
      ]
    ],
    "wann": [
      "Übermüdet; das Handy läuft bis tief in die Nacht.",
      "Gereizt oder leer, wenn das Handy weg ist.",
      "Vergleicht sich; die Stimmung fällt nach dem Scrollen.",
      "Dauerstreit um Handyregeln zu Hause oder in der Wohngruppe."
    ],
    "ziel": "Der Jugendliche untersucht sein eigenes Verhalten wie ein Forscher – mit eigenen Zahlen – und entdeckt, welches Gefühl er mit dem Handy regelt. Ein Verbot ist nicht das Ziel.",
    "anschluss": "REAL TALK #07 behandelt dasselbe Thema in der Gruppe, dazu Druck im Chat und Fakes.",
    "ablauf": [
      [
        "0–5",
        "Logbuch. Seite 1: den Vortrag ausdrücklich dem Jugendlichen überlassen – „Erklär du mir, wie die Apps einen kriegen.“"
      ],
      [
        "5–17",
        "Der Fall, die drei Kästen, das Video. Die unbequeme Frage offen stehen lassen."
      ],
      [
        "17–40",
        "Das Duell mit **Ihren echten Zahlen**. Dann fünf Minuten scrollen lassen – Sie scrollen mit. Danach „Wofür eigentlich?“."
      ],
      [
        "40–50",
        "Experiment „Drei Tage grau“ vereinbaren (Sie machen mit), Karten ausschneiden, eine Frage aus den drei Stufen."
      ]
    ],
    "haltung": [
      "Das Handy gehört dem Jugendlichen. Nicht draufschauen, nichts einsammeln, keine Zahl bewerten.",
      "Ihre eigene Bildschirmzeit ist das stärkste Material der Stunde. Wer sie verschweigt, hat verloren.",
      "Das Wort „Sucht“ vermeiden. Es beendet das Gespräch.",
      "Wenn das Gefühl „in der Sekunde davor“ benannt wird, ist das Thema der nächsten Stunde gefunden."
    ],
    "hinweise": [
      "Seite 3: Ohne eigenes Handy schätzt der Jugendliche nur; die fünf Minuten laufen dann auf Ihrem Gerät.",
      "Seite 4: Schwarz-Weiß heißt je nach Gerät „Graustufen“ oder „Farbfilter“. Vorher selbst ausprobieren.",
      "Geht Schwarz-Weiß nicht (Sperre, altes Gerät): eine App vom Startbildschirm nehmen. Ganz ohne Handy: verschieben."
    ],
    "achtung": "In den Daten oder im Gespräch können Cybermobbing, Druck im Chat oder Kontakte zu Erwachsenen sichtbar werden. Dann das Thema wechseln und ernst nehmen; bei Erpressung, sexuellen Übergriffen oder Selbstgefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Keine Diagnose stellen und keine Handyregeln im Namen Dritter aushandeln.",
    "hintergrund": "Der Zusammenhang zwischen Bildschirmzeit und Wohlbefinden ist im Durchschnitt klein; entscheidend sind Inhalte, Vergleiche und verdrängter Schlaf (Orben & Przybylski). Vergleiche mit idealisierten Bildern verschlechtern Stimmung und Körperbild, auch wenn die Bearbeitung bekannt ist (Fardouly et al.). Unregelmäßige Belohnung bindet Verhalten besonders stark (Ferster & Skinner); fehlende Stopp-Signale verlängern die Nutzung (Alter). Graustufen verringerten in einer Studie mit Studierenden die tägliche Bildschirmzeit (Holte & Ferraro). Konkrete Wenn-dann-Pläne wirken besser als Vorsätze (Gollwitzer). Die ICD-11 kennt die Computerspielstörung, aber keine eigene Diagnose für Social-Media-Nutzung.",
    "quellen": "Orben & Przybylski (2019) · Fardouly et al. (2015) · Ferster & Skinner (1957) · Alter (2017) · Holte & Ferraro (2020) · Gollwitzer (1999) · WHO, ICD-11."
  }
}
export default d
