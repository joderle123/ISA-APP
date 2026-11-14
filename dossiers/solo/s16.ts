// SOLO #16 · MIST GEBAUT – Regeln, Ärger, Anzeige in der Einzelarbeit: Schuld statt Scham, Wiedergutmachen statt Abstempeln.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s16",
  "nr": "16",
  "datei": "Solo-16-Mist-gebaut",
  "reihe": "Thema",
  "thema": "Mist gebaut",
  "headline": "Du hast etwas getan. Du bist es nicht.",
  "farbe": "#FF5A36",
  "stand": "November 2026",
  "bild": "peep:ben:besorgt:verschraenkt",
  "sticker": "Dein Anteil",
  "seiten": [
    {
      "titel": "Mist gebaut",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Nach dem Ärger kommen die Gespräche. Alle wollen wissen, warum. Die ehrliche Antwort – „keine Ahnung, es ging schnell“ – will keiner hören.",
            "Dieses Heft ist keine Strafe und kein Verhör. **Frag zuerst, was dein Gegenüber weitersagen muss.** Über eine Sache, zu der ein Verfahren läuft, schreibst du hier nichts auf. Dann bleibt eine Frage: **Was davon war wirklich deins?**"
          ]
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Nach jedem Ärger"
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
                  "„Was hast du dir dabei gedacht?“",
                  "„Du verbaust dir deine Zukunft.“",
                  "„Mit denen solltest du dich nicht abgeben.“",
                  "„Das hat Konsequenzen.“",
                  "„Ich bin enttäuscht von dir.“"
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
                "So viel Ärger habe ich gerade",
                "So sehr glaube ich, dass ich da wieder rauskomme"
              ]
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Drei Dinge, die im Gespräch nach dem Vorfall nie vorkommen",
      "sticker": "Prüf nach",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:ben:besorgt",
          "name": "Ben, 15",
          "text": "Erst die Kopfhörer, jetzt das: Ben hat mit zwei anderen einen Roller „geliehen“. Die Idee kam nicht von ihm. Gefahren ist er. Jetzt gibt es eine Anzeige, einen Termin, und seine Mutter redet seit vier Tagen nur das Nötigste. Der Erzieher will „darüber sprechen“. Ben sagt: „War halt so.“ Was er denkt: Jetzt bin ich endgültig der, für den mich alle halten. Dann kann ich auch gleich so weitermachen.",
          "frage": "Was ist an Bens letztem Gedanken gefährlich?"
        },
        {
          "art": "fakten",
          "titel": "Was kaum einer sagt",
          "fakten": [
            {
              "t": "Schuld ist nicht Scham",
              "x": "Schuld sagt: **Ich habe etwas Schlechtes getan.** Scham sagt: **Ich bin schlecht.** Mit Schuld kann man etwas machen. Scham versteckt sich – oder schlägt zu."
            },
            {
              "t": "Zusammen anders als allein",
              "x": "Mit anderen dabei gehen Jugendliche viel mehr Risiko ein. **Vieles, was schiefgeht, passiert in der Gruppe.** Das erklärt es. Es entschuldigt es nicht."
            },
            {
              "t": "Die meisten hören auf",
              "x": "Die meisten, die als Jugendliche Mist bauen, hören nach ein paar Jahren damit auf. **Wer du heute bist, legt nicht fest, wer du dann bist.**"
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Das Asch-Experiment: So manipuliert uns die Gruppe",
            "kanal": "Quarks",
            "url": "https://www.youtube.com/watch?v=I40g6U3K7hc",
            "dauer": "die ersten 5 Min.",
            "frage": "Wie viel von deinem Mist hättest du auch allein gemacht?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Wer hat den Schaden – und ==weißt du, wie es dem geht==?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Erst aufteilen, was wem gehört. Dann den Unterschied zwischen Schuld und Scham finden",
      "sticker": "Zu zweit",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Wem gehört was?",
          "wie": "allein",
          "zeit": "5 Min.",
          "kontext": "Erst für Ben und den Roller, dann – wenn du willst – für eine eigene Sache. Je **zehn Punkte**.",
          "fragen": [
            {
              "f": "Zusammen je zehn:",
              "preis": {
                "erste": "Wer",
                "kopf": [
                  "Ben",
                  "ich"
                ],
                "optionen": [
                  "er selbst / ich",
                  "die anderen",
                  "die Umstände"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Schuld oder Scham?",
          "wie": "zusammen",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Was für ein Satz ist das?",
              "raster": {
                "spalten": [
                  "Schuld",
                  "Scham"
                ],
                "zeilen": [
                  "„Das war falsch von mir.“",
                  "„Ich bin halt ein Krimineller.“",
                  "„Ich will das wieder in Ordnung bringen.“",
                  "„Aus mir wird eh nichts.“",
                  "„Alle wissen jetzt, was ich für einer bin.“"
                ]
              }
            },
            {
              "f": "Mein Satz über mich nach dem letzten Ärger:",
              "linien": 1
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Zwei Geschichten",
          "band": [
            "users",
            "Beide antworten"
          ],
          "wie": "beide",
          "zeit": "5 Min.",
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
                  "Ein Mist, den ich gebaut habe",
                  "So habe ich es wieder hingekriegt – oder nicht"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Ein Schritt zurück – und drei Fragen für vorher",
      "sticker": "Zum Mitnehmen",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Ein Stück zurück",
          "x": "Such dir **eine Sache** aus, die du kaputtgemacht hast – ein Ding, ein Vertrauen, einen Tag. Nicht die mit der Anzeige. Besprich den Schritt vorher hier. Dann mach ihn: einen einzigen, kleinen. Kein großes Geständnis. Wette vorher: Wie reagiert die andere Person – und was tust du, wenn sie nicht will?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Schuld statt Scham",
              "icon": "scale",
              "zeilen": [
                "Was ich getan habe, ist nicht, was ich bin.",
                "Was davon war meins?",
                "Was kann ich wieder in Ordnung bringen?"
              ]
            },
            {
              "titel": "Bevor ich mitmache",
              "icon": "player-pause",
              "zeilen": [
                "Würde ich das auch allein machen?",
                "Wer zahlt, wenn es schiefgeht?",
                "Mein Satz zum Aussteigen: „Ich bin raus.“"
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Welche Regel hier findest du wirklich sinnlos?",
              "Wofür hast du Ärger bekommen, obwohl du es nicht warst?"
            ],
            [
              "Bei wem müsstest du dich eigentlich entschuldigen?",
              "Was hat dich der letzte Ärger wirklich gekostet?"
            ],
            [
              "Wovon weiß bis heute keiner, dass es dir leidtut?",
              "Was müsste passieren, damit du dir selbst verzeihst?"
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
      "f": "Was ist der Unterschied zwischen Schuld und Scham?",
      "o": [
        "Es gibt keinen.",
        "Scham ist die stärkere Schuld.",
        "Schuld: Ich habe etwas getan. Scham: Ich bin so.",
        "Schuld fühlt man, Scham zeigt man."
      ],
      "r": 2,
      "warum": "Mit Schuld kann man etwas tun. Scham lähmt."
    },
    {
      "f": "Wann gehen Jugendliche mehr Risiko ein?",
      "o": [
        "wenn Gleichaltrige dabei sind",
        "wenn sie allein sind",
        "wenn Erwachsene zuschauen",
        "morgens vor der Schule"
      ],
      "r": 0,
      "warum": "Die Gruppe verschiebt, was sich normal anfühlt."
    },
    {
      "f": "Die meisten, die als Jugendliche Mist bauen, …",
      "o": [
        "bleiben für immer dabei",
        "werden später schlimmer",
        "haben einfach Pech gehabt",
        "hören nach ein paar Jahren damit auf"
      ],
      "r": 3,
      "warum": "Wer du heute bist, legt nicht fest, wer du dann bist."
    },
    {
      "f": "„Ich bin halt so einer“ führt meistens zu …",
      "o": [
        "Besserung",
        "mehr vom Gleichen",
        "Ruhe",
        "Mitleid"
      ],
      "r": 1,
      "warum": "Wer sich abstempelt, hat nichts mehr zu verlieren."
    },
    {
      "f": "Die Idee kam von anderen, gemacht hast du es. Wer trägt Verantwortung?",
      "o": [
        "nur die anderen",
        "nur du",
        "alle – jeder seinen Teil",
        "niemand, es war die Gruppe"
      ],
      "r": 2,
      "warum": "Erklären ist nicht dasselbe wie entschuldigen."
    },
    {
      "f": "Was hilft nach einem Fehler am meisten?",
      "o": [
        "einen Schritt zum Wiedergutmachen gehen",
        "abwarten, bis Gras darüber wächst",
        "alles abstreiten",
        "sich selbst fertigmachen"
      ],
      "r": 0,
      "warum": "Reparieren verändert, wie andere und du selbst dich sehen."
    },
    {
      "f": "Was ist ein guter Satz zum Aussteigen?",
      "o": [
        "„Ihr seid alle dumm.“",
        "„Das sage ich dem Erzieher.“",
        "„Ich muss leider weg, sorry.“",
        "„Ich bin raus.“"
      ],
      "r": 3,
      "warum": "Kurz, ohne Vorwurf, ohne Erklärung."
    },
    {
      "f": "Heißt verstehen, warum etwas passiert ist, dass es okay war?",
      "o": [
        "ja",
        "nein",
        "ja, wenn der Grund gut ist",
        "nur bei Kleinigkeiten"
      ],
      "r": 1,
      "warum": "Gründe erklären – die Verantwortung bleibt."
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
        "Vorher",
        "Eigene Pflichten klären"
      ]
    ],
    "wann": [
      "Nach einem Vorfall mit Folgen: Anzeige, Ausschluss, Schaden – wenn die erste Aufregung vorbei ist.",
      "Der Jugendliche stempelt sich selbst ab („Bin halt kriminell“).",
      "Regelverstöße in der Gruppe, bei denen er mitzieht.",
      "Vor einem Termin bei Polizei, Gericht oder Jugendschutz, um die eigene Haltung zu klären."
    ],
    "ziel": "Der Jugendliche trennt, was er getan hat, von dem, was er ist, übernimmt seinen Anteil – nicht mehr und nicht weniger – und macht einen ersten Schritt zur Wiedergutmachung.",
    "anschluss": "Gruppendruck und Nein-Sätze stehen in REAL TALK #06.",
    "ablauf": [
      [
        "0–8",
        "Logbuch. Vor Seite 1 klarstellen: „Das ist keine Konsequenz. Und ich sage dir jetzt, was ich mit neuen Informationen tun muss.“"
      ],
      [
        "8–22",
        "Der Fall – Bens letzter Gedanke ist der Kern. Dann die Kästen und das Video."
      ],
      [
        "22–40",
        "„Wem gehört was?“ erst für Ben, dann allein für eine eigene Sache; die Punktzahl nicht korrigieren, nur nachfragen. „Schuld oder Scham?“ gemeinsam. Dann das Duell mit einer echten eigenen Geschichte."
      ],
      [
        "40–50",
        "Experiment vereinbaren – der Schritt muss klein und sicher sein. Karten ausschneiden."
      ]
    ],
    "haltung": [
      "Keine Empörung, keine Enttäuschung. Beides hat er schon bekommen, beides nährt die Scham.",
      "Verantwortung ja, Abstempeln nein: „Das war nicht okay – und du bist mehr als das.“",
      "Die Gründe ernst nehmen, ohne sie als Ausrede gelten zu lassen.",
      "Ihre eigene Geschichte im Duell zeigt: Man kann Mist bauen und trotzdem jemand werden."
    ],
    "hinweise": [
      "Seite 3: Zehn Punkte bei „ich“ sind genauso verdächtig wie null. Nachfragen: „Was hätten die anderen anders machen können?“",
      "Seite 4: Wiedergutmachung ist ein Angebot. Die geschädigte Person muss sie nicht annehmen – das vorher besprechen.",
      "Rechtliche Fragen beantwortet eine Rechtsberatung, nicht dieses Heft."
    ],
    "achtung": "Klären Sie vor der Stunde, was Sie mit neuen Informationen über Straftaten tun müssen, und sagen Sie es dem Jugendlichen, bevor er erzählt. In laufenden Verfahren keine Einzelheiten der Tat erfragen. Lebt die geschädigte Person im selben Haus, geht deren Schutz vor; ein Kontakt wird nur mit ihr und der zuständigen Leitung (Responsable) vorbereitet. Wird der Jugendliche von Älteren unter Druck gesetzt oder für Taten benutzt, ist das ein Schutzthema. Starke Scham kann in Selbstverletzung oder Suizidgedanken umschlagen – nachfragen.",
    "hintergrund": "Schuldgefühle gehen mit Wiedergutmachung und weniger Rückfällen einher, Scham dagegen mit Ärger, Rückzug und erneutem Fehlverhalten (Tangney et al.). In Anwesenheit Gleichaltriger gehen Jugendliche deutlich höhere Risiken ein (Gardner & Steinberg). Der größte Teil jugendlicher Regelverstöße bleibt auf die Jugend begrenzt (Moffitt). Wer als Person verurteilt statt für die Tat verantwortlich gemacht wird, übernimmt das Etikett eher; Verantwortung mit Wiederaufnahme wirkt besser (Braithwaite). Menschen, die aufhören, erzählen sich selbst als jemand, der mehr ist als seine Taten (Maruna).",
    "quellen": "Tangney, Stuewig & Mashek (2007) · Gardner & Steinberg (2005) · Moffitt (1993) · Braithwaite (1989) · Maruna (2001)."
  }
}
export default d
