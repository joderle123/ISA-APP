// SOLO #00 · START – erste Bezugszeit mit einem neuen Jugendlichen: Kennenlernen ohne Verhör.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s00",
  "nr": "00",
  "datei": "Solo-00-Start",
  "reihe": "Start",
  "thema": "Start",
  "headline": "Wer sitzt hier eigentlich?",
  "farbe": "#FFB21A",
  "stand": "November 2026",
  "bild": "peep:jana:neutral:verschraenkt",
  "sticker": "Kein Verhör",
  "seiten": [
    {
      "titel": "Start",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Niemand hat dich gefragt, ob du Bezugszeit willst. Jetzt sitzt du hier – mit jemandem, der gleich Fragen stellen wird. Du kennst das. Wahrscheinlich besser als die meisten Erwachsenen.",
            "Deshalb läuft es heute andersrum: **Du fragst zuerst.** Und du entscheidest, wie viel du zeigst."
          ]
        },
        {
          "art": "regeln",
          "titel": "Der Deal",
          "punkte": [
            "**Du bestimmst die Tiefe.** „Weiter“ gilt immer – ohne Erklärung.",
            "**Du erfährst, was weitergesagt wird.** Dein Gegenüber sagt dir heute, was es ans Team geben muss. Bei Gefahr erfährst du es zuerst.",
            "**Dein Gegenüber muss auch antworten.** Jede Frage an dich darfst du zurückfragen. („Weiter“ gilt für beide.)",
            "**Kein Vortrag.** Fängt dein Gegenüber an zu predigen, sagst du: „Vortrag.“ Dann ist Schluss damit.",
            "**Das Heft gehört dir.** Du entscheidest, wo es liegt und wer reinschaut."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Du bist hier der Profi"
          ],
          "wie": "allein",
          "zeit": "3 Min.",
          "kontext": "Hake ab, was du in solchen Gesprächen schon gehört hast. Dann wissen wir, was wir uns sparen können.",
          "fragen": [
            {
              "f": "Kreuze an:",
              "raster": {
                "spalten": [
                  "schon gehört",
                  "nervt",
                  "war okay"
                ],
                "zeilen": [
                  "„Wie geht es dir damit?“",
                  "„Du kannst mir alles sagen.“",
                  "„Ich bin für dich da.“",
                  "„Das verstehe ich.“",
                  "„Was würdest du dir wünschen?“",
                  "„Wir schaffen das zusammen.“"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Du fragst zuerst",
      "unter": "Heute bist du die Presse. Dein Gegenüber muss antworten",
      "sticker": "Rollen-tausch",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Das Interview",
          "wie": "du fragst",
          "zeit": "12 Min.",
          "kontext": "Such dir **fünf** Fragen aus und stell sie. Notier dir, was hängen bleibt. Eigene Fragen sind erlaubt.",
          "fragen": [
            {
              "f": "Kreuze an, was du fragen willst:",
              "unter": true,
              "kreuz": [
                "Warum machst du diesen Job – ehrlich?",
                "Wofür hast du mit 15 Ärger bekommen?",
                "Was war dein schlechtestes Fach?",
                "Was nervt dich an Jugendlichen?",
                "Was nervt dich an Erwachsenen?",
                "Was kannst du richtig schlecht?",
                "Welche Musik lief bei dir mit 15?",
                "Was hat dir in einer miesen Zeit geholfen?",
                "Was würdest du an diesem Ort sofort ändern?",
                "Wann hast du dich zuletzt entschuldigt – und wofür?"
              ]
            },
            {
              "f": "Notizen der Presse:",
              "linien": 2
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Entweder – oder",
          "wie": "beide",
          "zeit": "5 Min.",
          "kontext": "Du machst auf jeder Linie ein **Kreuz**, dein Gegenüber einen **Kreis**. Nicht nachdenken.",
          "fragen": [
            {
              "f": "Wo steht ihr?",
              "striche": [
                [
                  "Nacht",
                  "Morgen"
                ],
                [
                  "reden",
                  "machen"
                ],
                [
                  "Plan",
                  "spontan"
                ],
                [
                  "viele Leute",
                  "wenige Leute"
                ],
                [
                  "Musik laut",
                  "Stille"
                ],
                [
                  "drinnen",
                  "draußen"
                ]
              ]
            },
            {
              "f": "Hier liegen wir am weitesten auseinander:",
              "linien": 1
            }
          ]
        }
      ]
    },
    {
      "titel": "Warnhinweise",
      "unter": "Was man über dich wissen muss, bevor man etwas falsch macht",
      "sticker": "Nur für hier",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "So funktioniere ich",
          "wie": "allein",
          "zeit": "8 Min.",
          "fragen": [
            {
              "f": "Schreib nur, was du willst:",
              "satz": [
                "Wenn ich still werde, heißt das meistens:",
                "Wenn ich laut werde, hilft am ehesten:",
                "Daran sieht man, dass es mir gut geht:",
                "Das sollte man bei mir nie tun:"
              ]
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Wenn ich dichtmache",
          "wie": "allein",
          "zeit": "4 Min.",
          "kontext": "Was soll dein Gegenüber dann tun – und was besser lassen?",
          "fragen": [
            {
              "f": "Kreuze an:",
              "raster": {
                "spalten": [
                  "hilft",
                  "egal",
                  "macht es schlimmer"
                ],
                "zeilen": [
                  "nachfragen, was los ist",
                  "mich in Ruhe lassen",
                  "einen Witz machen",
                  "daneben sitzen und nichts sagen",
                  "sofort eine Lösung anbieten",
                  "später noch mal kommen",
                  "mit mir rausgehen",
                  "sagen, dass es nicht so schlimm ist"
                ]
              }
            }
          ]
        },
        {
          "art": "marker",
          "label": "Zum Schluss",
          "x": "Woran würdest du merken, dass diese Zeit ==keine Zeitverschwendung== ist?",
          "linien": 2
        }
      ]
    },
    {
      "titel": "Richtigstellung",
      "unter": "Über dich gibt es Berichte. Geschrieben von Leuten, die dich kurz kannten",
      "sticker": "Deine Fassung",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Was über mich gesagt wird",
          "wie": "allein",
          "zeit": "8 Min.",
          "kontext": "Du hast die meisten Berichte nie gelesen. Du weißt trotzdem, was drinsteht. Hier ist Platz für deine Fassung.",
          "fragen": [
            {
              "f": "Drei Zeilen reichen:",
              "satz": [
                "Das sagen sie – und es stimmt nicht (mehr):",
                "Das steht nirgends, ist aber wichtig:",
                "Das stimmt – aber anders, als es dasteht:"
              ]
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Das will ich hier nicht",
          "wie": "allein",
          "zeit": "3 Min.",
          "fragen": [
            {
              "f": "Kreuze an:",
              "unter": true,
              "kreuz": [
                "Arbeitsblätter",
                "gute Ratschläge",
                "Fragen zu früher, wenn ich nicht will",
                "dass über mich geredet wird und ich es nicht erfahre",
                "dass man mir etwas verspricht und es nicht hält"
              ]
            },
            {
              "f": "Und außerdem:",
              "linien": 1
            }
          ]
        },
        {
          "art": "experiment",
          "titel": "Test für dein Gegenüber",
          "x": "Diese Woche wirst nicht du beobachtet, sondern dein Gegenüber. Achte auf Vorträge, gebrochene Versprechen, ungewollte Fragen. **Wette vorher: Hält es sich an den Deal?**"
        },
        {
          "art": "check"
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
        "erste und zweite Bezugszeit"
      ],
      [
        "Dauer",
        "1–2 Stunden à 45 Min."
      ],
      [
        "Material",
        "Stift, Heft, sonst nichts"
      ]
    ],
    "wann": [
      "Erste Bezugszeit mit einem neuen Jugendlichen.",
      "Als Neustart, wenn die Beziehung festgefahren ist oder die Bezugsperson gewechselt hat.",
      "Bei Jugendlichen mit viel Helfer-Erfahrung, die Standardfragen auswendig kennen."
    ],
    "ziel": "Der Jugendliche erlebt in der ersten Stunde zwei Dinge: Er bestimmt mit – und der Erwachsene hält, was er sagt. Mehr muss diese Stunde nicht leisten.",
    "ablauf": [
      [
        "0–8",
        "Seite 1 gemeinsam lesen. Den Deal ernst nehmen: Stopp-Wort „Vortrag“ ausprobieren lassen. „Schon mal gehört?“ ankreuzen lassen und nicht verteidigen."
      ],
      [
        "8–25",
        "Das Interview. Kurz und ehrlich antworten; ein eigenes „Weiter“ ist ausdrücklich gut – es zeigt, wie man eine Grenze setzt."
      ],
      [
        "25–32",
        "Entweder – oder: selbst mitmachen, Gemeinsamkeiten laut bemerken."
      ],
      [
        "32–45",
        "Warnhinweise **oder** Richtigstellung. Eine der beiden Seiten reicht; die andere ist die nächste Stunde."
      ],
      [
        "45–50",
        "Experiment erklären: Der Jugendliche prüft die Bezugsperson. Nächstes Mal zuerst danach fragen."
      ]
    ],
    "haltung": [
      "Antworten Sie im Interview wirklich. Ausweichen merkt der Jugendliche sofort.",
      "Nichts kommentieren, was bei den Warnhinweisen steht. Höchstens fragen: „Woran merke ich das?“",
      "Was als „macht es schlimmer“ angekreuzt ist, ab sofort lassen – auch wenn es fachlich sinnvoll wäre.",
      "Das Heft gehört dem Jugendlichen. Er entscheidet, wo es liegt."
    ],
    "hinweise": [
      "Seite 1: Punkt 2 des Deals heute einlösen: laut sagen, was ans Team geht, was dokumentiert wird und was gemeldet werden muss. Nichts versprechen, was Sie nicht halten können.",
      "Seite 2: Die Fragen sind bewusst persönlich, aber nicht intim. Eigene Grenze vorher überlegen.",
      "Seite 4: „Richtigstellung“ nicht korrigieren und nicht mit der Akte abgleichen."
    ],
    "achtung": "Die Richtigstellung kann Wut auf frühere Helfer wecken – aushalten, nicht verteidigen. Erzählt der Jugendliche von einer Gefährdung, gilt der Deal: zuerst ihm sagen, mit wem Sie sprechen, dann die zuständige Leitung (Responsable) informieren. Ein gebrochenes Versprechen in den ersten Wochen wiegt schwerer als jede gute Stunde.",
    "hintergrund": "Die Qualität der Arbeitsbeziehung sagt bei Jugendlichen den Erfolg von Beratung und Therapie mit am besten voraus (Shirk & Karver; Karver et al.). Jugendliche arbeiten mit, wenn sie Wahlmöglichkeiten erleben und nicht belehrt werden (Ryan & Deci; Miller & Rollnick; Naar-King & Suarez). Wechselseitiges, dosiertes Erzählen schafft Nähe schneller als einseitiges Fragen (Aron et al.).",
    "quellen": "Shirk & Karver (2003) · Karver et al. (2018) · Ryan & Deci (2000) · Miller & Rollnick (2013) · Naar-King & Suarez (2011) · Aron et al. (1997)."
  }
}
export default d
