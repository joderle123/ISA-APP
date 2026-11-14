// SOLO #15 · LEER – wenn alles leer ist (depressive Verstimmung) in der Einzelarbeit. Mit klaren Regeln für Krisen.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s15",
  "nr": "15",
  "datei": "Solo-15-Leer",
  "reihe": "Thema",
  "thema": "Leer",
  "headline": "Nicht traurig. Das wäre wenigstens ein Gefühl.",
  "farbe": "#4D94FF",
  "stand": "November 2026",
  "bild": "peep:lea:muede",
  "sticker": "Kleinste Schritte",
  "seiten": [
    {
      "titel": "Leer",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "„Kopf hoch, das wird schon.“ Wer das sagt, meint es gut und hat keine Ahnung.",
            "Es gibt einen Zustand, in dem nichts mehr zieht. Nicht mal das, was früher sicher ging. Man ist nicht traurig – man ist leer, müde und irgendwie hinter Glas. **Das ist kein Charakterfehler und keine Faulheit. Hält es wochenlang an, heißt es depressive Verstimmung – und es geht vorbei.** Mit Hilfe meist schneller."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Gut gemeint"
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
                  "„Kopf hoch.“",
                  "„Das wird schon wieder.“",
                  "„Anderen geht es schlechter.“",
                  "„Reiß dich zusammen.“",
                  "„Lach doch mal.“"
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
                "So leer fühlt es sich gerade an",
                "So gut kann ich das vor anderen verbergen"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Was Leere mit dem Kopf macht – und was nachweislich hilft",
      "sticker": "Stimmt das?",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:lea:muede",
          "name": "Lea, 16",
          "text": "Lea steht jeden Morgen auf, geht zur Schule, lacht in der Pause. Niemand merkt etwas. Nachmittags liegt sie auf dem Bett und schaut an die Decke. Früher hat sie gezeichnet, stundenlang. Die Stifte liegen seit Februar in der Schublade. Wenn jemand fragt, sagt sie: „Bin nur müde.“ Traurig ist sie nicht. Das wäre wenigstens ein Gefühl.",
          "frage": "Woran könnte jemand merken, dass bei Lea etwas nicht stimmt?"
        },
        {
          "art": "fakten",
          "titel": "Was man darüber weiß",
          "fakten": [
            {
              "t": "Leer ist nicht faul",
              "x": "Wenn nichts mehr Spaß macht, auch das Sichere nicht, ist das ein Zustand – kein Charakter. **Er ist bekannt, häufig und behandelbar.**"
            },
            {
              "t": "Der Kopf lügt in dieser Zeit",
              "x": "„Es wird nie besser.“ „Ich bin nur eine Last.“ Das fühlt sich wie Wahrheit an. **Es sind Anzeichen – wie Fieber bei einer Grippe.**"
            },
            {
              "t": "Erst tun, dann fühlen",
              "x": "Auf Lust zu warten klappt nicht, weil genau die fehlt. Gemeint ist nicht „Reiß dich zusammen“. **Zehn Minuten von etwas, das früher gut war, bringen das Gefühl langsam zurück.**"
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Depressionen – einfach erklärt",
            "kanal": "iks Institut Kinderseele Schweiz",
            "url": "https://www.youtube.com/watch?v=tMsA-AZzy5g",
            "dauer": "ganz schauen",
            "frage": "Was davon kennst du – von dir oder von jemand anderem?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Was machst du nicht mehr, das dir ==früher sicher== Spaß gemacht hat?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Kein Test. Nur hinschauen, was sich verändert hat",
      "sticker": "Auch dein Gegenüber",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Früher – jetzt",
          "wie": "allein",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Stichworte reichen:",
              "preis": {
                "erste": "Bereich",
                "kopf": [
                  "früher",
                  "jetzt"
                ],
                "optionen": [
                  "Schlaf und Essen",
                  "Leute",
                  "Das, was mir Spaß gemacht hat"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Was trotzdem ging",
          "wie": "allein",
          "zeit": "3 Min.",
          "fragen": [
            {
              "f": "Diese Woche. Kreise ein – alles zählt:",
              "kreis": [
                "aufstehen",
                "duschen",
                "essen",
                "rausgehen",
                "jemandem schreiben",
                "Musik hören",
                "hier sitzen"
              ]
            }
          ]
        },
        {
          "art": "kasten",
          "akzent": true,
          "label": "Die direkte Frage",
          "titel": "Dunkle Gedanken",
          "x": "In so einer Zeit kommen manchmal Gedanken wie „Es wäre besser, wenn ich nicht da wäre“. **Kennst du das? Dann sag es** – jetzt oder später. Dein Gegenüber bleibt ruhig. Für sich behalten darf es das nicht, aber du erfährst zuerst, mit wem es redet. Reden macht es nicht schlimmer. Nur weniger einsam."
        },
        {
          "art": "fragen",
          "titel": "Was geholfen hat",
          "band": [
            "users",
            "Beide antworten"
          ],
          "wie": "beide",
          "zeit": "4 Min.",
          "fragen": [
            {
              "f": "So viel, wie jeder sagen will:",
              "preis": {
                "erste": "Frage",
                "kopf": [
                  "du",
                  "Gegenüber"
                ],
                "optionen": [
                  "Das hat mir in einer miesen Zeit geholfen",
                  "Das hat überhaupt nicht geholfen"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Zehn Minuten trotzdem – und eine Karte für dunkle Tage",
      "sticker": "Bis nächstes Mal",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Zehn Minuten trotzdem",
          "x": "Such dir **eine sehr kleine Sache** aus, die früher gut war. Mach sie an drei Tagen je zehn Minuten – auch ohne Lust. Wette vorher: An welchem der drei Tage fällt es am leichtesten? Ändert sich nichts, ist das normal: Es wirkt langsam."
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Wenn es dunkel wird",
              "icon": "phone",
              "zeilen": [
                "„Es wird nie besser“ ist ein Anzeichen, keine Tatsache.",
                "Nicht allein bleiben. Jemandem sagen, wie es ist.",
                "Kanner-Jugendtelefon **116 111** (feste Zeiten) · Notruf **112** (immer)"
              ],
              "eigen": "Mein Mensch:"
            },
            {
              "titel": "Erst tun",
              "icon": "player-play",
              "zeilen": [
                "Nicht auf Lust warten.",
                "Zehn Minuten reichen.",
                "Danach kurz prüfen: ein bisschen anders?"
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Was war das Letzte, worüber du wirklich gelacht hast?",
              "Welcher Ort tut dir gut, auch wenn es dir mies geht?"
            ],
            [
              "Seit wann ist es so?",
              "Wer weiß, wie es dir wirklich geht?"
            ],
            [
              "Hattest du schon einmal den Gedanken, nicht mehr da sein zu wollen?",
              "Was oder wer hat dich bisher gehalten?"
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
      "f": "Monatelang ist alles leer und nichts macht mehr Spaß. Das ist am ehesten …",
      "o": [
        "Faulheit",
        "eine Phase, die jeder hat",
        "ein behandelbarer Zustand",
        "schlechte Laune"
      ],
      "r": 2,
      "warum": "Depression ist eine Erkrankung, kein Charakter."
    },
    {
      "f": "Muss man traurig sein, um depressiv zu sein?",
      "o": [
        "ja, immer",
        "nein – oft ist es Leere oder Gereiztheit",
        "ja, sonst ist es etwas anderes",
        "nur am Anfang"
      ],
      "r": 1,
      "warum": "Bei Jugendlichen zeigt es sich häufig als Leere, Müdigkeit oder Wut."
    },
    {
      "f": "„Es wird nie besser“ ist in so einer Zeit …",
      "o": [
        "ein Anzeichen der Verstimmung",
        "eine Tatsache",
        "ein guter Rat",
        "eine Vorhersage"
      ],
      "r": 0,
      "warum": "Der Kopf färbt in dieser Zeit alles dunkel."
    },
    {
      "f": "Was hilft eher?",
      "o": [
        "warten, bis die Lust zurückkommt",
        "sich zusammenreißen",
        "viel schlafen",
        "kleine Dinge trotzdem tun"
      ],
      "r": 3,
      "warum": "Erst tun, dann fühlen – nicht umgekehrt."
    },
    {
      "f": "Macht es Suizidgedanken schlimmer, wenn man jemanden danach fragt?",
      "o": [
        "nein – es entlastet eher",
        "ja, das bringt einen erst darauf",
        "nur bei Erwachsenen",
        "das weiß niemand"
      ],
      "r": 0,
      "warum": "Das ist gut untersucht: Fragen schadet nicht."
    },
    {
      "f": "Ein Freund sagt: „Ohne mich wäre alles besser.“ Was tust du?",
      "o": [
        "es für dich behalten",
        "ihn zum Lachen bringen",
        "es einem Erwachsenen sagen",
        "abwarten, ob er es wiederholt"
      ],
      "r": 2,
      "warum": "Dieses Geheimnis ist zu schwer für eine Person allein."
    },
    {
      "f": "Es ist drei Uhr nachts und es wird gefährlich. Welche Nummer?",
      "o": [
        "keine – bis morgen warten",
        "die Schule",
        "eine Freundin, die schläft",
        "112"
      ],
      "r": 3,
      "warum": "Die 116 111 hat feste Zeiten. Die 112 ist immer da."
    },
    {
      "f": "Wie lange dauert so ein Zustand?",
      "o": [
        "für immer",
        "er geht vorbei – mit Hilfe meist schneller",
        "genau eine Woche",
        "bis man erwachsen ist"
      ],
      "r": 1,
      "warum": "Auch wenn es sich nicht so anfühlt."
    }
  ],
  "begleitung": {
    "fakten": [
      [
        "Für wen",
        "13–17 Jahre, Einzelarbeit"
      ],
      [
        "Dauer",
        "45–50 Min., nicht kürzen"
      ],
      [
        "Material",
        "Stift, Schere, Gerät fürs Video"
      ],
      [
        "Vorher",
        "Krisenverfahren kennen"
      ]
    ],
    "wann": [
      "Rückzug, Müdigkeit, Interessenverlust über mehr als zwei Wochen.",
      "Gereiztheit oder Gleichgültigkeit, wo früher Lebendigkeit war.",
      "„Wenn alles leer ist“ wurde auf der Landkarte als „brennt“ angekreuzt.",
      "Nach Verlusten, Trennungen, Einrichtungswechseln."
    ],
    "ziel": "Der Jugendliche erkennt seinen Zustand als etwas, das er hat und das sich verändern kann, weiß, mit wem er über dunkle Gedanken sprechen kann – und probiert eine sehr kleine Aktivität aus.",
    "ablauf": [
      [
        "0–5",
        "Logbuch. Seite 1 – die Sprüche. Tempo halbieren; Pausen sind in dieser Stunde normal."
      ],
      [
        "5–20",
        "Der Fall, die drei Kästen, das Video. Die unbequeme Frage stellen."
      ],
      [
        "20–40",
        "„Früher – jetzt“ und „Was trotzdem ging“ allein. Den Kasten „Dunkle Gedanken“ **vorlesen** und offen fragen (siehe Achtung). Dann das Duell."
      ],
      [
        "40–50",
        "Experiment sehr klein vereinbaren. Karte „Wenn es dunkel wird“ gemeinsam ausfüllen: Wer ist „mein Mensch“? Abschluss mit etwas Leichtem."
      ]
    ],
    "haltung": [
      "Nicht aufmuntern, nicht widersprechen, keine Lösungen. Dabeibleiben reicht.",
      "Jede Kleinigkeit zählt wirklich: Aufstehen ist in diesem Zustand eine Leistung.",
      "Direkt nach Suizidgedanken fragen. Das schützt; es bringt niemanden auf die Idee.",
      "Das Duell knapp und echt halten – kein eigenes Drama."
    ],
    "hinweise": [
      "Dieses Heft ersetzt keine Diagnostik und keine Behandlung. Es öffnet das Gespräch.",
      "Seite 3: Der Kasten ist der Kern der Stunde. Nicht überspringen, auch wenn es gerade gut läuft.",
      "Stufe 3 enthält die Frage nach Suizidgedanken. Wählt der Jugendliche die Stufe nicht, stellen Sie die Frage trotzdem – offen als Ihre eigene angekündigt, nicht als Teil des Spiels."
    ],
    "achtung": "**Nennt der Jugendliche Suizidgedanken:** ruhig bleiben, danken, nachfragen (Wie oft? Gibt es einen Plan? Ein Mittel? Einen Zeitpunkt?). Nie Verschwiegenheit zusagen. Ihm sagen, mit wem Sie jetzt sprechen. Sofort nach dem Krisenverfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen; bei akuter Gefahr nicht allein lassen und den Notruf 112 wählen. **In jedem Fall** bei anhaltender Leere, Schlaf- und Essstörungen oder Selbstverletzung eine kinder- und jugendpsychiatrische oder psychotherapeutische Abklärung veranlassen. Nach der Stunde das Team informieren, dass das Thema bewegt wurde.",
    "hintergrund": "Depressive Störungen zeigen sich bei Jugendlichen häufig als Gereiztheit, Rückzug und Interessenverlust statt als sichtbare Traurigkeit (WHO, ICD-11). Negative Gedanken über sich, die Welt und die Zukunft gehören zum Zustand und sind kein verlässliches Urteil (Beck). Der Aufbau kleiner, angenehmer oder sinnvoller Aktivitäten ist auch bei Jugendlichen wirksam (Lewinsohn; McCauley et al.). Das direkte Fragen nach Suizidgedanken erhöht das Risiko nicht und wird von Betroffenen meist als Entlastung erlebt (Dazzi et al.). Ein gemeinsam erstellter Sicherheitsplan verringert suizidales Verhalten (Stanley & Brown).",
    "quellen": "WHO, ICD-11 · Beck (1979) · Lewinsohn (1974) · McCauley et al. (2016) · Dazzi et al. (2014) · Stanley & Brown (2012)."
  }
}
export default d
