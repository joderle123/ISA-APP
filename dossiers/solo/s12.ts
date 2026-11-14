// SOLO #12 · NÄHE – Liebe, Beziehung, Einverständnis in der Einzelarbeit. Sprache bewusst offen für alle Paare.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s12",
  "nr": "12",
  "datei": "Solo-12-Naehe",
  "reihe": "Thema",
  "thema": "Nähe",
  "headline": "Wird dein Leben größer oder kleiner?",
  "farbe": "#FF7AC3",
  "stand": "November 2026",
  "bild": "peep:lina:verlegen",
  "sticker": "Dein Tempo",
  "seiten": [
    {
      "titel": "Nähe",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Über Liebe und Sex reden Erwachsene mit Jugendlichen meistens auf zwei Arten: gar nicht – oder als Warnung. Beides hilft wenig, wenn man mittendrin steckt.",
            "In diesem Heft geht es nicht um Biologie. Es geht um die Frage, **woran du erkennst, ob dir jemand guttut**. Und darum, was ein Ja wert ist. Wie weit das Gespräch geht, bestimmst du."
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Aus der Warn-Abteilung"
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
                  "„Dafür bist du noch zu jung.“",
                  "„Pass bloß auf.“",
                  "„Da findest du was Besseres.“",
                  "„Wer dich liebt, wartet.“",
                  "„Das ist nur eine Phase.“"
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
                "So sehr ist das gerade mein Thema",
                "So gut kann ich mit jemandem darüber reden"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Drei Dinge, die in der Aufklärungsstunde gefehlt haben",
      "sticker": "Prüf nach",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:lina:verlegen",
          "name": "Lina, 16",
          "text": "Seit Lina mit Elias zusammen ist, will er wissen, wo sie ist. Erst fand sie es süß. Dann wollte er ihren Standort, dann ihr Passwort – „in einer Beziehung vertraut man sich“. Letzte Woche hat er ihre Chats gelesen und war drei Tage beleidigt wegen einer Nachricht an einen Jungen aus der Klasse. Lina hat sich entschuldigt. Sie weiß nicht genau, wofür. Ihre Freundin sagt: „Der liebt dich halt.“",
          "frage": "Woran erkennt man den Unterschied zwischen „Er liebt mich“ und „Er kontrolliert mich“?"
        },
        {
          "art": "fakten",
          "titel": "Was kaum einer sagt",
          "fakten": [
            {
              "t": "Eifersucht ist kein Beweis",
              "x": "Handy prüfen, Standort verlangen, Freunde madig machen: Das wird als Liebe verkauft. **Wer dir guttut, macht dein Leben größer – nicht kleiner.**"
            },
            {
              "t": "Ja braucht ein mögliches Nein",
              "x": "Unter Druck, aus Angst, weggetreten vom Alkohol oder halb im Schlaf ist ein Ja keins. **Und jedes Ja kann man zurücknehmen** – auch mittendrin."
            },
            {
              "t": "Porno ist Kino",
              "x": "Was dort passiert, ist gespielt und geschnitten wie ein Actionfilm. **Wer daraus lernt, lernt Autofahren aus Rennfilmen.**"
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Einverständnis – so einfach wie Tee",
            "kanal": "GONEASTRAYfilms",
            "url": "https://www.youtube.com/watch?v=2ovcQgIN5G4",
            "dauer": "ca. 3 Min.",
            "frage": "Der Clip macht es einfach. Wo wird es im echten Leben kompliziert?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Woran würdest du merken, dass dir jemand ==nicht guttut==?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Sortieren, rechnen, vergleichen. Was du von dir sagst, bestimmst du",
      "sticker": "Auch dein Gegenüber",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Liebe oder Kontrolle?",
          "wie": "allein",
          "zeit": "5 Min.",
          "fragen": [
            {
              "f": "Jemand, mit dem du zusammen bist …",
              "raster": {
                "spalten": [
                  "okay",
                  "kommt drauf an",
                  "geht nicht"
                ],
                "zeilen": [
                  "will immer wissen, wo ich bin",
                  "liest meine Nachrichten",
                  "will mein Passwort",
                  "schreibt 30-mal, wenn ich nicht antworte",
                  "sagt: „Wenn du mich liebst, dann …“",
                  "ist beleidigt, wenn ich Nein sage"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Linas Rechnung",
          "wie": "zusammen",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Elias hat ihre Chats gelesen. Was jetzt? Rechne durch:",
              "preis": {
                "erste": "Lina …",
                "kopf": [
                  "kostet sie",
                  "bringt ihr"
                ],
                "optionen": [
                  "entschuldigt sich wieder",
                  "sagt: „Mein Handy bleibt meins.“",
                  "redet erst mit jemandem, dem sie vertraut"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Was ich gelernt habe",
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
                  "Daran erkenne ich, dass mich jemand mag",
                  "Das geht für mich in keiner Beziehung",
                  "Ein Satz, den ich früher gebraucht hätte"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Drei Paare beobachten – und zwei Fragen für dich",
      "sticker": "Bis nächstes Mal",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Drei Paare",
          "x": "Schau dir diese Woche **drei Paare** genau an – im echten Leben, in einer Serie oder im Netz. Wo siehst du Respekt? Wo Kontrolle, die sich als Liebe verkleidet? Wette vorher: Wovon findest du mehr?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Tee-Regel",
              "icon": "heart",
              "zeilen": [
                "Ein Ja zählt nur, wenn Nein auch ginge.",
                "Bedrängt, weggetreten, eingeschlafen: kein Ja.",
                "Ein Ja darf man jederzeit zurücknehmen."
              ]
            },
            {
              "titel": "Tut mir das gut?",
              "icon": "user-heart",
              "zeilen": [
                "Wird mein Leben größer oder kleiner?",
                "Darf ich Nein sagen, ohne bestraft zu werden?",
                "Kann ich so sein, wie ich bin?"
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Welches Paar – echt oder aus einer Serie – findest du gut?",
              "Was ist für dich ein klares No-Go?"
            ],
            [
              "Wann warst du zuletzt eifersüchtig – und was hast du gemacht?",
              "Was hast du über Liebe gelernt, indem du Erwachsenen zugeschaut hast?"
            ],
            [
              "Hast du schon einmal etwas mitgemacht, das du nicht wolltest?",
              "Hast du schon einmal jemanden gedrängt? „Weiter“ gilt für beide Fragen."
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
      "f": "Starke Eifersucht ist …",
      "o": [
        "ein Liebesbeweis",
        "ein Kompliment",
        "kein Beweis für Liebe",
        "immer harmlos"
      ],
      "r": 2,
      "warum": "Sie sagt etwas über die Angst des einen, nichts über die Liebe."
    },
    {
      "f": "Wann ist ein Ja ein echtes Ja?",
      "o": [
        "wenn auch ein Nein möglich wäre",
        "wenn man lange genug gefragt hat",
        "wenn niemand widerspricht",
        "wenn man zusammen ist"
      ],
      "r": 0,
      "warum": "Ohne freie Wahl ist es kein Einverständnis."
    },
    {
      "f": "Darf man ein Ja zurücknehmen?",
      "o": [
        "nein",
        "nur vorher",
        "nur mit gutem Grund",
        "ja, jederzeit"
      ],
      "r": 3,
      "warum": "Auch mittendrin."
    },
    {
      "f": "Jemand kann vor Alkohol kaum noch stehen und sagt Ja. Das ist …",
      "o": [
        "ein Ja",
        "kein gültiges Ja",
        "ein halbes Ja",
        "seine Sache"
      ],
      "r": 1,
      "warum": "Wer nicht klar entscheiden kann, kann nicht zustimmen."
    },
    {
      "f": "Was zeigen Pornos?",
      "o": [
        "wie Sex normalerweise ist",
        "was die meisten wollen",
        "eine Art Aufklärung",
        "gespielte, geschnittene Szenen"
      ],
      "r": 3,
      "warum": "Darsteller, Drehbuch, Schnitt – wie im Actionfilm."
    },
    {
      "f": "Jemand will dein Passwort „als Vertrauensbeweis“. Was stimmt?",
      "o": [
        "Wer liebt, gibt es her",
        "Das machen alle Paare",
        "Vertrauen braucht keinen Zugriff",
        "Nur wer etwas versteckt, sagt Nein"
      ],
      "r": 2,
      "warum": "Vertrauen braucht keinen Zugriff."
    },
    {
      "f": "Woran erkennt man eine gute Beziehung am ehesten?",
      "o": [
        "das eigene Leben wird größer",
        "man ist nie getrennt",
        "man streitet nie",
        "man teilt alle Passwörter"
      ],
      "r": 0,
      "warum": "Freunde, Hobbys, eigene Meinung – alles bleibt."
    },
    {
      "f": "Jemand drängt dich. Was ist erlaubt?",
      "o": [
        "nachgeben, damit Ruhe ist",
        "Nein sagen – ohne Begründung",
        "sich entschuldigen",
        "erst einen guten Grund suchen"
      ],
      "r": 1,
      "warum": "Ein Nein braucht keinen Grund."
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
        "45–50 Min., teilbar"
      ],
      [
        "Material",
        "Stift, Schere, Gerät fürs Video"
      ],
      [
        "Passt zu",
        "SOLO #02 Grenzen"
      ]
    ],
    "wann": [
      "Erste Beziehung, Liebeskummer oder eine Beziehung, die den Jugendlichen kleiner macht.",
      "Kontrolle oder Druck sind erkennbar – ausgeübt oder erlitten.",
      "Vorstellungen über Sex stammen vor allem aus Pornos.",
      "Der Jugendliche bringt das Thema selbst mit."
    ],
    "ziel": "Der Jugendliche hat eigene Prüfsteine dafür, ob ihm eine Beziehung guttut, und weiß, was Einverständnis bedeutet – als jemand, der gefragt wird, und als jemand, der fragt.",
    "anschluss": "Körpersignale und Nein-Sätze stehen in SOLO #02 und REAL TALK #05.",
    "ablauf": [
      [
        "0–5",
        "Logbuch. Seite 1 – die Sprüche. Vorher sagen: „Du musst hier nichts von dir erzählen. Wir arbeiten mit Lina.“"
      ],
      [
        "5–20",
        "Der Fall, die drei Kästen, der Tee-Clip (handelt von Sex und Einverständnis – ankündigen). Die unbequeme Frage stellen."
      ],
      [
        "20–40",
        "„Liebe oder Kontrolle?“ allein. „Linas Rechnung“ gemeinsam. Dann das Duell mit Ihren Antworten."
      ],
      [
        "40–50",
        "Experiment vereinbaren, Karten ausschneiden. Stufe 3 nur, wenn der Jugendliche sie von sich aus wählt."
      ]
    ],
    "haltung": [
      "Sachlich und unaufgeregt. Jede Verlegenheit Ihrerseits beendet das Gespräch.",
      "Die Sprache offen halten: „jemand“, „dein Mensch“ – nie ein Geschlecht voraussetzen. Die Szene bei Bedarf umerzählen.",
      "Die Beziehung des Jugendlichen nicht bewerten. Die Prüfsteine geben Sie ihm, das Urteil fällt er.",
      "Auch die Seite dessen ansprechen, der drängt oder kontrolliert – ohne Beschämung."
    ],
    "hinweise": [
      "Seite 2: Den dritten Kasten (Porno) sachlich stehen lassen; Nachfragen beantworten, nicht ausfragen.",
      "Seite 3: „Kommt drauf an“ ist die interessanteste Spalte – nachfragen, worauf.",
      "Fragen zu Verhütung, Schwangerschaft oder Infektionen: an eine Fachstelle für sexuelle Gesundheit vermitteln (in Luxemburg z. B. Planning Familial)."
    ],
    "achtung": "Das Heft kann Übergriffe sichtbar machen. Nicht nach Einzelheiten fragen, glauben, ruhig bleiben, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt, auf Beziehungen mit deutlich Älteren, auf Erpressung mit Bildern oder auf Gewalt in der Beziehung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Schildert der Jugendliche eigenes übergriffiges Verhalten, ist das ebenfalls ein Schutzthema – für die andere Person und für ihn.",
    "hintergrund": "Kontrollierendes Verhalten in Jugendbeziehungen wird häufig als Zuneigung gedeutet; Programme, die Warnzeichen und Einverständnis konkret besprechen, verringern Gewalt in Beziehungen (Foshee et al.; Wolfe et al.). Jugendliche, die häufig Pornografie nutzen, haben eher unrealistische Vorstellungen von Sexualität (Peter & Valkenburg). Wirksame Sexualaufklärung behandelt neben Biologie auch Gefühle, Beziehungen und Rechte (WHO Europa/BZgA).",
    "quellen": "Foshee et al. (1998) · Wolfe et al. (2009) · Peter & Valkenburg (2016) · WHO-Regionalbüro für Europa & BZgA (2010)."
  }
}
export default d
