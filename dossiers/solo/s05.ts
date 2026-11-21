// SOLO #05 · WUT – Ausrasten in der Einzelarbeit: Was liegt unter der Wut? Anschluss an REAL TALK #03.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s05",
  "nr": "05",
  "datei": "Solo-05-Wut",
  "reihe": "Thema",
  "thema": "Wut",
  "headline": "Worauf warst du wirklich wütend?",
  "farbe": "#C6F02C",
  "stand": "November 2026",
  "bild": "peep:finn:wuetend:verschraenkt",
  "sticker": "Nach dem Knall",
  "seiten": [
    {
      "titel": "Wut",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "„Zähl bis zehn.“ „Atme tief durch.“ „Gewalt ist keine Lösung.“ Du kannst das alles aufsagen. Und wenn es knallt, ist nichts davon da.",
            "Dieses Heft bringt dir keine neue Atemtechnik bei. Es fragt, **was unter der Wut liegt** – denn das ist fast nie der Teller, der gerade fliegt."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Die Standard-Tipps"
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
                  "„Zähl bis zehn.“",
                  "„Atme tief durch.“",
                  "„Du musst dich besser kontrollieren.“",
                  "„Gewalt ist keine Lösung.“",
                  "„Schlag doch in ein Kissen.“"
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
              "f": "0 = nie, 10 = immer. Kreise ein:",
              "regler": [
                "Ich bin sofort oben",
                "Ich brauche lange, bis ich wieder unten bin"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Drei Dinge über Wut. Streich durch, was du schon kanntest",
      "sticker": "Streich, was du kennst",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:finn:wuetend",
          "name": "Finn, 15",
          "text": "Der Erzieher sagt: „Kommst du? Wir essen.“ Ganz normaler Ton. Finn schmeißt den Teller an die Wand. Zehn Minuten später sitzt er auf dem Bett und versteht es selbst nicht. Seit zwei Wochen hatte er sich auf das Wochenende bei seiner Mutter gefreut. Am Morgen kam ihre Nachricht: „Dieses Wochenende klappt es nicht.“ Den ganzen Tag hatte er sie im Kopf. Darüber hat er mit keinem geredet. Über den Teller reden jetzt alle.",
          "frage": "Worauf war Finn wirklich wütend?"
        },
        {
          "art": "fakten",
          "titel": "Unter der Oberfläche",
          "fakten": [
            {
              "t": "Selten das erste Gefühl",
              "x": "Unter der Wut liegt oft etwas anderes: Scham, Angst, Ohnmacht, Enttäuschung. **Wut fühlt sich nur weniger schwach an.**"
            },
            {
              "t": "20 Minuten",
              "x": "So lange braucht der Körper ungefähr, bis der Alarm abklingt. **Vorher ist jedes Gespräch verloren** – deins und das der Erwachsenen."
            },
            {
              "t": "Rauslassen heizt an",
              "x": "Auf ein Kissen einschlagen macht nicht ruhiger. In Versuchen waren die Leute danach **wütender als vorher**."
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Aggressiv: Woher kommt deine Wut?",
            "kanal": "Terra Xplore",
            "url": "https://www.youtube.com/watch?v=ytcdqLNedrg",
            "dauer": "die ersten 6 Min.",
            "frage": "Wen aus dem Video verstehst du am besten – und warum?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Welches Gefühl wäre da, wenn die Wut ==nicht== da wäre?"
        },
        {
          "art": "fragen",
          "titel": "Der Gedanke macht die Hitze",
          "wie": "allein",
          "zeit": "3 Min.",
          "kontext": "Im Gang rempelt dich jemand an. Was du in der ersten Sekunde denkst, entscheidet, wie heiß es wird.",
          "fragen": [
            {
              "f": "Wie wütend wärst du bei diesem Gedanken? 0 = gar nicht, 10 = ich explodiere:",
              "regler": [
                "„Der macht das extra.“",
                "„Der hat mich nicht gesehen.“",
                "„Der hat gerade selbst Stress.“"
              ]
            },
            {
              "f": "Welcher Gedanke kommt bei dir meistens zuerst?",
              "kreis": ["extra", "nicht gesehen", "selbst Stress", "kommt drauf an, wer"]
            }
          ]
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Keine Schuldfrage. Nur: Was war darunter?",
      "sticker": "Beide antworten",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Die Kette",
          "wie": "zusammen",
          "zeit": "10 Min.",
          "kontext": "Ein Ausraster kommt nicht aus dem Nichts. Er hat Glieder wie eine Kette. Erst Finn, dann ein Mal von dir – oder von jemandem, den du kennst. Stichworte reichen.",
          "fragen": [
            {
              "f": "Glied für Glied:",
              "preis": {
                "erste": "Glied",
                "kopf": [
                  "Finn",
                  "ich"
                ],
                "optionen": [
                  "1 · Davor: Was war schon los?",
                  "2 · Auslöser: Was ist passiert?",
                  "3 · Gedanke: Was ging durch den Kopf?",
                  "4 · Gefühl darunter",
                  "5 · Körper: Was hast du gespürt?",
                  "6 · Tat: Was hast du gemacht?",
                  "7 · Danach: Was ist passiert?"
                ]
              }
            },
            {
              "f": "An welchem Glied hätte die Kette reißen können? Kreise ein:",
              "kreis": ["1", "2", "3", "4", "5", "6"]
            },
            {
              "f": "Was hätte dort geholfen?",
              "linien": 2
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Die ehrliche Rechnung",
          "wie": "zusammen",
          "zeit": "6 Min.",
          "kontext": "Wut bringt auch etwas. Sonst würde sie niemand benutzen.",
          "fragen": [
            {
              "f": "Rechne durch:",
              "preis": {
                "erste": "Wut …",
                "kopf": [
                  "bringt mir",
                  "kostet mich"
                ],
                "optionen": [
                  "rauslassen",
                  "runterschlucken",
                  "später sagen, was los war"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Meine Zündschnur",
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
                  "Das bringt mich am schnellsten hoch",
                  "Daran sieht man es mir an",
                  "Das bereue ich danach"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Ein Wort danach – und 20 Minuten für die Tasche",
      "sticker": "Für danach",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Mein Plan für Gelb",
          "wie": "zusammen",
          "zeit": "5 Min.",
          "kontext": "Bei Rot ist es zu spät – dann denkt keiner mehr. Bei Gelb geht noch was. Gelb ist dein erstes Zeichen: Fäuste, heißer Kopf, laute Stimme …",
          "fragen": [
            {
              "f": "Mach deinen Plan:",
              "satz": [
                "Mein Gelb merke ich an …",
                "Wenn ich Gelb merke, dann …",
                "Das sage ich dabei:",
                "Diese Person darf mein Zeichen kennen:"
              ]
            }
          ]
        },
        {
          "art": "experiment",
          "titel": "Ein Wort danach",
          "x": "Wenn du diese Woche hochgehst: Schreib **danach** ein einziges Wort auf – das Gefühl darunter. Scham, Angst, Ohnmacht, Enttäuschung, Einsamkeit. Mehr nicht. Wette vorher: Welches Wort steht am häufigsten da?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "20 Minuten",
              "icon": "clock",
              "zeilen": [
                "Ganz oben? **Jetzt nicht reden.**",
                "Weggehen. Sagen: „20 Minuten.“",
                "Nach 20 Minuten ist der Kopf wieder da."
              ]
            },
            {
              "titel": "Der Satz danach",
              "icon": "message-circle",
              "zeilen": [
                "„Vorhin ging es eigentlich nicht um …“",
                "„Eigentlich war ich …“",
                "„Ich brauche gerade …“"
              ],
              "eigen": "Zu wem:"
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Was bringt dich zuverlässig auf die Palme?",
              "Wer kann wütend sein, ohne dass etwas kaputtgeht?"
            ],
            [
              "Wann hat dir Wut zuletzt wirklich geholfen?",
              "Wovor haben andere Angst, wenn du wütend bist?"
            ],
            [
              "Auf wen bist du wütend, dem du es nie gesagt hast?",
              "Wie war Wut bei euch zu Hause – wer durfte sie haben?"
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
      "f": "Was liegt oft unter der Wut?",
      "o": [
        "nichts – Wut ist einfach Wut",
        "ein anderes Gefühl wie Scham oder Angst",
        "schlechte Erziehung",
        "zu viel Energie"
      ],
      "r": 1,
      "warum": "Wut fühlt sich stärker an als das Gefühl darunter."
    },
    {
      "f": "Wie lange braucht der Körper ungefähr, bis der Alarm abklingt?",
      "o": [
        "10 Sekunden",
        "1 Minute",
        "20 Minuten",
        "2 Tage"
      ],
      "r": 2,
      "warum": "Vorher bringt Reden wenig."
    },
    {
      "f": "Auf ein Kissen einschlagen macht …",
      "o": [
        "ruhiger",
        "müde",
        "eher wütender",
        "gar nichts"
      ],
      "r": 2,
      "warum": "Es übt die Wut ein, statt sie abzubauen."
    },
    {
      "f": "Was hilft bei voller Wut am ehesten?",
      "o": [
        "Abstand und Zeit",
        "diskutieren",
        "eine Erklärung verlangen",
        "eine Nachricht schreiben"
      ],
      "r": 0,
      "warum": "Erst der Körper, dann das Gespräch."
    },
    {
      "f": "Finn wirft den Teller. Worum ging es wirklich?",
      "o": [
        "um das Essen",
        "um den Ton des Erziehers",
        "um den Teller",
        "um die Nachricht seiner Mutter"
      ],
      "r": 3,
      "warum": "Darüber hat er mit keinem geredet."
    },
    {
      "f": "Jemand rempelt dich an. Was macht dich am wütendsten?",
      "o": [
        "der Rempler selbst",
        "der Gedanke „Der macht das extra“",
        "das Wetter",
        "die Uhrzeit"
      ],
      "r": 1,
      "warum": "Der Gedanke in der ersten Sekunde entscheidet, wie heiß es wird."
    },
    {
      "f": "Wann redet man am besten über einen Ausraster?",
      "o": [
        "mittendrin",
        "wenn der Körper wieder ruhig ist",
        "sofort danach",
        "am besten gar nicht"
      ],
      "r": 1,
      "warum": "Erst dann ist das Denken wieder da."
    },
    {
      "f": "Jemand rastet wegen einer Kleinigkeit aus. Meistens …",
      "o": [
        "ging es wirklich um die Kleinigkeit",
        "ist er einfach so",
        "will er Aufmerksamkeit",
        "war das Fass schon vorher voll"
      ],
      "r": 3,
      "warum": "Der Auslöser ist selten der Grund."
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
        "REAL TALK #03"
      ]
    ],
    "wann": [
      "Häufige Ausraster, die der Jugendliche hinterher selbst nicht versteht.",
      "Nach einem Vorfall – aber erst, wenn er wirklich wieder ruhig ist, frühestens am nächsten Tag.",
      "Wut als einziges Gefühl, das gezeigt wird.",
      "Auch bei Jugendlichen, die alles schlucken und nie laut werden."
    ],
    "ziel": "Der Jugendliche entdeckt an eigenen Beispielen, welches Gefühl unter seiner Wut liegt – und dass darüber zu reden mehr verändert als jede Beherrschungstechnik.",
    "anschluss": "Techniken zum Runterkommen (Zahl 0–100, Atmung, Kälte) stehen in REAL TALK #03.",
    "ablauf": [
      [
        "0–5",
        "Logbuch. Seite 1: Die Sprüche ankreuzen lassen. Wenn „Kissen“ angekreuzt ist – der dritte Kasten auf Seite 2 gehört ihm."
      ],
      [
        "5–18",
        "Der Fall. Die Frage offen lassen, bis er selbst auf die Nachricht der Mutter kommt. Dann die Kästen, das Video und „Der Gedanke macht die Hitze“."
      ],
      [
        "18–40",
        "„Die Kette“ gemeinsam: erst Finn, dann ein eigenes Mal (oder das eines Bekannten). Nicht bewerten, nur Glied für Glied fragen. „Die ehrliche Rechnung“: den Gewinn der Wut ernsthaft aufschreiben. Das Duell mit Ihren Antworten, wenn Zeit ist."
      ],
      [
        "40–50",
        "„Mein Plan für Gelb“ fertig machen, Experiment vereinbaren, Karten ausschneiden. Die drei Stufen passen gut in eine zweite Stunde."
      ]
    ],
    "haltung": [
      "Die Stunde ist keine Aufarbeitung und keine Konsequenz. Wer sie so benutzt, bekommt nur die Sätze zu hören, die er hören will.",
      "Den Gewinn der Wut anerkennen: Respekt, Abstand, Ruhe vor Fragen. Erst dann wird über den Preis geredet.",
      "Im Duell eigene Wut nicht kleinreden. „Ich werde nie laut“ glaubt niemand.",
      "Fällt das Wort für das Gefühl darunter, nicht nachsetzen. Es reicht, dass es gesagt ist."
    ],
    "hinweise": [
      "„Die Kette“ ist eine Verhaltensanalyse in Jugendsprache. Wichtig ist Glied 3 (Gedanke) und 4 (Gefühl darunter): Dort reißt die Kette am leichtesten. Wiederholt sich das Gefühl darunter bei mehreren Malen, ist das das Thema der nächsten Wochen.", "„Der Gedanke macht die Hitze“: Wer fast immer „extra“ ankreuzt, unterstellt anderen schnell Absicht. Das nicht korrigieren, sondern beim nächsten Vorfall fragen: „Welche anderen Gedanken wären noch möglich?“",
      "Seite 4: „Der Satz danach“ ist für viele das Schwerste im ganzen Heft. Anbieten, ihn gemeinsam für eine echte Situation vorzubereiten.",
      "Die 20 Minuten gelten auch für Sie und das Team: Konsequenzen und Gespräche erst danach."
    ],
    "achtung": "Die Frage nach der Wut zu Hause (Stufe 3) kann erlebte Gewalt berühren. Zuhören, nicht ausfragen; bei aktueller Gefährdung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Bei Ankündigungen, jemandem etwas anzutun, oder bei Selbstverletzung nach Ausrastern direkt nachfragen und nicht allein entscheiden. Das Heft ersetzt keine Vereinbarungen zur Sicherheit in der Gruppe.",
    "hintergrund": "Wut tritt häufig als Reaktion auf verletzlichere Gefühle wie Scham, Angst oder Ohnmacht auf (Novaco). Jugendliche, die anderen in unklaren Situationen schnell Absicht unterstellen, reagieren häufiger aggressiv (Dodge); die Kette (Verhaltensanalyse nach Linehan) macht diesen Schritt sichtbar. Das „Dampfablassen“ durch Schlagen auf Gegenstände senkt Ärger nicht, sondern verstärkt ihn (Bushman). Körperliche Erregung klingt nur langsam ab und überträgt sich auf die nächste Situation (Zillmann). Ausraster lassen sich besser als fehlende Fertigkeit unter Belastung verstehen denn als fehlender Wille; gemeinsames Problemlösen in ruhigen Momenten wirkt besser als Strafen (Greene).",
    "quellen": "Novaco (1975) · Bushman (2002) · Zillmann (1971) · Dodge (2006) · Greene (2014) · Linehan (2015)."
  }
}
export default d
