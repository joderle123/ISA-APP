// SOLO #01 · LANDKARTE – zweite Bezugszeit: Der Jugendliche wählt die Themen, nennt sein eigenes Ziel und sein Team.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s01",
  "nr": "01",
  "datei": "Solo-01-Landkarte",
  "reihe": "Start",
  "thema": "Landkarte",
  "headline": "Worum soll es hier gehen?",
  "farbe": "#2FD3E6",
  "stand": "November 2026",
  "bild": "peep:noah:neutral:zeigen",
  "sticker": "Du wählst",
  "seiten": [
    {
      "titel": "Landkarte",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "In der Schule entscheiden andere, was drankommt. Hier nicht.",
            "Unten stehen 16 Themen. Manche brennen, manche gehen so, manche sind kalt, manche sind gesperrt. **Jede Antwort ist brauchbar.**"
          ]
        },
        {
          "art": "fragen",
          "titel": "Die Karte",
          "band": [
            "map-2",
            "Vier Spalten, keine falsche"
          ],
          "wie": "allein",
          "zeit": "6 Min.",
          "kontext": "**Brennt:** beschäftigt dich, ob du willst oder nicht. **Geht so:** kennst du, ist nicht dringend. **Kalt:** nicht dein Thema. **Sperrgebiet:** nicht anfassen, bis du es selbst aufmachst.",
          "fragen": [
            {
              "f": "Ein Kreuz pro Zeile:",
              "raster": {
                "spalten": [
                  "brennt",
                  "geht so",
                  "kalt",
                  "Sperrgebiet"
                ],
                "zeilen": [
                  "Grenzen: Nein sagen, Nähe, Abstand",
                  "Handy und Scrollen",
                  "Zocken",
                  "Wut und Ausrasten",
                  "Schlaf",
                  "Die Stimme im Kopf, die alles mies macht",
                  "Freunde – oder keine",
                  "Liebe, Sex, Beziehung",
                  "Kiffen, Vapen, Trinken",
                  "Schule und null Bock",
                  "Zuhause",
                  "Zukunft: Was soll aus mir werden?",
                  "Angst und Panik",
                  "Wenn alles leer ist",
                  "Mist gebaut: Regeln, Ärger, Polizei",
                  "Körper und Aussehen"
                ]
              }
            },
            {
              "f": "Und dann:",
              "satz": [
                "Fehlt auf der Karte:",
                "Damit fangen wir an:"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Dein Ziel",
      "unter": "Nicht das der Erwachsenen. Die haben schon genug Ziele für dich",
      "sticker": "Deins",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Zwei Listen",
          "wie": "allein",
          "zeit": "6 Min.",
          "kontext": "Über dich gibt es Pläne mit Zielen. Die meisten hat jemand anderes geschrieben. Trenn das mal.",
          "fragen": [
            {
              "f": "Das wollen die Erwachsenen von mir:",
              "linien": 2
            },
            {
              "f": "Das will ich selbst – auch wenn es keiner hören will:",
              "linien": 2
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "In drei Monaten",
          "wie": "allein, dann reden",
          "zeit": "10 Min.",
          "kontext": "In drei Monaten ist nicht alles gut. Aber eine Sache ist anders. Welche?",
          "fragen": [
            {
              "f": "So genau wie möglich:",
              "satz": [
                "Das ist anders:",
                "Daran würde ich es merken:"
              ]
            },
            {
              "f": "Kreise ein:",
              "regler": [
                "So sehr will ich das",
                "So sehr traue ich es mir zu"
              ]
            }
          ]
        },
        {
          "art": "marker",
          "label": "Nachfrage",
          "x": "Warum bei „zutrauen“ ==keine Zahl weniger==? (Bei 0: Was fehlt zur 1?)",
          "linien": 1
        }
      ]
    },
    {
      "titel": "Dein Team",
      "unter": "Wer steht auf deiner Seite – und wie soll die Zeit hier aussehen?",
      "sticker": "Auch Tiere zählen",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Wer steht wo?",
          "wie": "allein",
          "zeit": "6 Min.",
          "kontext": "Mal in die Mitte einen Punkt: du. Schreib Leute **nah** oder **weit weg** – je nachdem, wie sehr du dich auf sie verlassen kannst. Tiere und Leute aus dem Netz zählen.",
          "fragen": [
            {
              "f": "Mein Team:",
              "feld": 62
            },
            {
              "f": "Wen hättest du gern näher dran?",
              "linien": 1
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "So soll die Zeit hier aussehen",
          "wie": "allein",
          "zeit": "3 Min.",
          "fragen": [
            {
              "f": "Kreise ein, was passt:",
              "kreis": [
                "reden",
                "rausgehen",
                "spielen",
                "etwas bauen",
                "Videos schauen",
                "Musik hören",
                "kochen",
                "Sport",
                "auch mal nichts tun"
              ]
            },
            {
              "f": "Ehrlich:",
              "satz": [
                "Am besten kann ich reden, wenn:"
              ]
            }
          ],
          "kontext": "Jedes Heft geht auch mündlich oder im Gehen."
        },
        {
          "art": "experiment",
          "titel": "Die erste Wette",
          "x": "Nimm das Thema, das am meisten brennt. Ändere nichts – zähl nur: An wie vielen Tagen meldet es sich bis zum nächsten Mal? **Wette vorher:** wie viele von sieben?"
        }
      ]
    },
    {
      "titel": "Logbuch",
      "unter": "Eine Zeile pro Bezugszeit. In drei Monaten siehst du, was passiert ist",
      "sticker": "Roter Faden",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Jedes Mal am Anfang: **Akku** (0 leer – 10 voll) und was aus deinem Experiment geworden ist. Jedes Mal am Schluss: das Thema und ein Kreuz. Dauert eine Minute."
          ]
        },
        {
          "art": "logbuch",
          "zeilen": 14
        }
      ]
    }
  ],
  "begleitung": {
    "fakten": [
      [
        "Für wen",
        "12–17 Jahre, Einzelarbeit"
      ],
      [
        "Wann",
        "zweite oder dritte Bezugszeit"
      ],
      [
        "Dauer",
        "45–50 Min."
      ],
      [
        "Material",
        "Stift, Heft"
      ]
    ],
    "wann": [
      "Nach dem Start-Heft, sobald ein Mindestmaß an Vertrauen da ist.",
      "Erneut nach sechs bis acht Wochen: Karte neu ausfüllen und vergleichen.",
      "Wenn die Bezugszeit beliebig geworden ist und ein gemeinsamer Plan fehlt."
    ],
    "ziel": "Der Jugendliche wählt selbst, woran gearbeitet wird, und benennt ein eigenes Ziel in seinen Worten. Daraus entsteht der rote Faden für die nächsten Wochen.",
    "ablauf": [
      [
        "0–5",
        "Zuerst das Experiment vom letzten Mal: „Habe ich mich an den Deal gehalten?“ Kritik annehmen, nicht erklären."
      ],
      [
        "5–15",
        "Die Karte. Nicht mitlesen, während angekreuzt wird. Danach nur zu „brennt“ nachfragen – Sperrgebiete bleiben unkommentiert."
      ],
      [
        "15–32",
        "Dein Ziel. Die Erwachsenen-Liste ohne Rechtfertigung stehen lassen. Bei der Zahl „zutrauen“ die Nachfrage stellen: Sie holt die eigenen Gründe des Jugendlichen hervor."
      ],
      [
        "32–45",
        "Dein Team und „So soll die Zeit aussehen“. Wünsche, die gehen, in der nächsten Stunde umsetzen."
      ],
      [
        "45–50",
        "Die erste Wette eintragen, Logbuch erklären, erste Zeile gemeinsam ausfüllen."
      ]
    ],
    "haltung": [
      "Die Reihenfolge der Themen bestimmt der Jugendliche. Ihr eigener Auftrag (Vorfall, Wunsch des Teams) kommt als offenes Angebot dazu: „Ich hätte auch ein Thema.“",
      "Ein Sperrgebiet ist eine Information, kein Widerstand. Oft liegt dort das Wichtigste – es öffnet sich später oder nie.",
      "Ziele nicht „verbessern“. Ein Ziel wie „dass mich alle in Ruhe lassen“ ist ein brauchbarer Anfang.",
      "Wenige Namen auf der Team-Karte nicht bedauern. Fragen: „Wer davon weiß, dass er draufsteht?“"
    ],
    "hinweise": [
      "Seite 1: Zu jedem Thema der Karte gibt es ein Heft – Grenzen #02, Scrollen #03, Zocken #04, Wut #05, Schlaf #06, Stimme #07, Freunde #08, Liebe #12, Kiffen #09, Schule #10, Zuhause #13, Zukunft #14, Angst #11, Leere #15, Mist gebaut #16, Körper #17.",
      "Seite 2: Die zwei Zahlen sind die Skalen aus der Motivierenden Gesprächsführung (Wichtigkeit und Zuversicht).",
      "Seite 4: Das Logbuch ist der rote Faden. Es bleibt beim Jugendlichen; für Ihre Dokumentation eigene Notizen führen."
    ],
    "achtung": "„Wenn alles leer ist“ und „Zuhause“ als „brennt“ oder als Sperrgebiet sind Hinweise, die Sie im Kopf behalten sollten – ohne nachzubohren. Bei Andeutungen von Suizidgedanken, Selbstverletzung oder Gewalt direkt und ruhig nachfragen und nach dem Verfahren der Einrichtung handeln (zuständige Leitung, Krisenplan).",
    "hintergrund": "Eigene Ziele werden häufiger verfolgt als fremde (Ryan & Deci). Die Fragen nach Wichtigkeit und Zuversicht und die Nachfrage „Warum nicht niedriger?“ lassen den Jugendlichen selbst für die Veränderung argumentieren (Miller & Rollnick). Die Frage nach einem konkreten Unterschied in der Zukunft stammt aus der lösungsorientierten Kurzzeittherapie (de Shazer). Verlässliche Bezugspersonen sind der wichtigste bekannte Schutzfaktor (Masten).",
    "quellen": "Ryan & Deci (2000) · Miller & Rollnick (2013) · de Shazer (1988) · Masten (2014)."
  }
}
export default d
