// SOLO #09 · RAUSCH – Kiffen, Vapen, Trinken in der Einzelarbeit: ehrlich, ohne Abschreckung, ohne Anleitung.
import type { Solo } from '../solo-typen'

const d: Solo = {
  "id": "s09",
  "nr": "09",
  "datei": "Solo-09-Rausch",
  "reihe": "Thema",
  "thema": "Rausch",
  "headline": "Wofür brauchst du es?",
  "farbe": "#FFD60A",
  "stand": "November 2026",
  "bild": "peep:yusuf:neutral:laessig",
  "sticker": "Erst die Regeln",
  "seiten": [
    {
      "titel": "Rausch",
      "unter": "",
      "bloecke": [
        {
          "art": "text",
          "x": [
            "Die Abschreckungsfilme hast du gesehen. Die Lunge im Glas auch. Gewirkt hat es bei den Leuten, die sowieso nichts nehmen.",
            "Hier gibt es keine Predigt. Aber eine Sache zuerst: Der Deal gilt. Bei Drogen haben manche Häuser aber eigene Meldepflichten. **Frag zuerst, welche hier gelten.** Erst wenn du die Antwort kennst, entscheidest du, wie viel du sagst."
          ]
        },
        {
          "art": "kasten",
          "label": "Bevor es losgeht",
          "titel": "Die Regeln deines Gegenübers",
          "x": "Dein Gegenüber schreibt hier ehrlich auf, was es weitersagen **muss** – und was nicht.",
          "linien": 2
        },
        {
          "art": "fragen",
          "titel": "Schon mal gehört?",
          "band": [
            "ear",
            "Die Plakat-Sätze"
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
                  "„Drogen sind gefährlich.“",
                  "„Das ist eine Einstiegsdroge.“",
                  "„Davon wirst du dumm.“",
                  "„Sag einfach Nein.“",
                  "„Du landest irgendwann auf der Straße.“"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Der Stoff",
      "unter": "Was stimmt – ohne Übertreibung und ohne Verharmlosung",
      "sticker": "Streich, was du kennst",
      "bloecke": [
        {
          "art": "szene",
          "bild": "peep:yusuf:neutral",
          "name": "Yusuf, 16",
          "text": "Yusuf raucht abends einen, „zum Runterkommen“. Seit dem Sommer jeden Abend. Er sagt: „Ich hab’s im Griff, ich kann jederzeit aufhören.“ Letzte Woche gab es drei Tage nichts. Yusuf hat kaum geschlafen, seine kleine Schwester angeschrien und ist nicht zur Arbeit. Am vierten Tag war alles wieder gut. „Siehst du“, sagt Yusuf, „ohne geht es mir schlechter.“",
          "frage": "Yusuf sagt zwei Sätze. Welchen widerlegen die drei Tage – und welcher stimmt?"
        },
        {
          "art": "fakten",
          "titel": "Ohne Übertreibung",
          "fakten": [
            {
              "t": "Es wirkt. Deshalb.",
              "x": "Niemand kifft, trinkt oder vapt, weil es nichts bringt. Es macht ruhig, mutig, lustig, zugehörig. **Die Frage ist: Wofür brauchst du es?**"
            },
            {
              "t": "Umbau bis Mitte 20",
              "x": "So lange wird dein Gehirn noch umgebaut. Wer früh und oft kifft, hat später häufiger Probleme mit Lernen und Gedächtnis und ein höheres Risiko für Psychosen. **Je früher, je öfter, je stärker – desto mehr.**"
            },
            {
              "t": "Nikotin ist schnell",
              "x": "Erste Zeichen von Abhängigkeit zeigen sich bei Jugendlichen manchmal schon nach **wenigen Wochen**. Der süße Geschmack versteckt das nur."
            }
          ]
        },
        {
          "art": "clip",
          "clip": {
            "titel": "Wie schädlich ist Cannabis für das Gehirn Jugendlicher?",
            "kanal": "drugcom.de",
            "url": "https://www.youtube.com/watch?v=IbjiA_5BZ14",
            "dauer": "ganz schauen",
            "frage": "Was davon wusstest du schon – und was glaubst du nicht?"
          }
        },
        {
          "art": "marker",
          "label": "Die unbequeme Frage",
          "x": "Was müsstest du ==fühlen==, wenn du es eine Woche weglässt?"
        }
      ]
    },
    {
      "titel": "Dein Teil",
      "unter": "Keine Mengen, keine Namen, keine Quellen. Nur: wofür und zu welchem Preis",
      "sticker": "Auch dein Gegenüber",
      "bloecke": [
        {
          "art": "fragen",
          "titel": "Wofür eigentlich?",
          "wie": "allein",
          "zeit": "5 Min.",
          "kontext": "Für dich – oder für Leute, die du kennst, wenn du selbst nichts nimmst.",
          "fragen": [
            {
              "f": "Kreise ein:",
              "kreis": [
                "runterkommen",
                "einschlafen",
                "dazugehören",
                "Spaß",
                "nichts fühlen",
                "mutiger sein",
                "Langeweile",
                "weil es alle machen",
                "weil es ohne nicht mehr geht"
              ]
            },
            {
              "f": "Ehrlich:",
              "satz": [
                "Das erledigt es wirklich gut:",
                "Das erledigt es immer schlechter:"
              ]
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Yusufs Rechnung",
          "wie": "zusammen",
          "zeit": "6 Min.",
          "fragen": [
            {
              "f": "Jeden Abend einen:",
              "preis": {
                "erste": "Zeitraum",
                "kopf": [
                  "bringt ihm",
                  "kostet ihn"
                ],
                "optionen": [
                  "heute Abend",
                  "in diesem Monat",
                  "in zwei Jahren"
                ]
              }
            }
          ]
        },
        {
          "art": "fragen",
          "titel": "Jeder hat sein Mittel",
          "band": [
            "users",
            "Beide antworten"
          ],
          "wie": "beide",
          "zeit": "5 Min.",
          "kontext": "Bei deinem Gegenüber vielleicht Kaffee, Wein, Zigaretten oder das Handy.",
          "fragen": [
            {
              "f": "Ehrlich:",
              "preis": {
                "erste": "Frage",
                "kopf": [
                  "du",
                  "Gegenüber"
                ],
                "optionen": [
                  "Mein Mittel zum Runterkommen",
                  "Das bringt es mir",
                  "Daran würde ich merken, dass es zu viel ist"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "titel": "Mitnehmen",
      "unter": "Drei Tage Pause – und eine Karte für den Notfall",
      "sticker": "Bis nächstes Mal",
      "bloecke": [
        {
          "art": "experiment",
          "titel": "Drei Tage Pause",
          "x": "Lass es **drei Tage** weg – oder das, was bei dir an der Stelle steht: Vape, Energy-Drinks. Nur als Test. Sag deinem Gegenüber, an welchen Tagen. Wer täglich trinkt oder Tabletten nimmt: nicht allein, erst zum Arzt. Jeden Abend ein Wort: Wie war der Tag ohne? Wette vorher: Welcher Tag wird der schwerste?"
        },
        {
          "art": "karten",
          "karten": [
            {
              "titel": "Vorher fragen",
              "icon": "help-circle",
              "zeilen": [
                "Wofür will ich es gerade?",
                "Was hilft auch – nur langsamer?",
                "Entscheide ich – oder die Gewohnheit?"
              ]
            },
            {
              "titel": "Notfall",
              "icon": "first-aid-kit",
              "zeilen": [
                "Jemand ist nicht ansprechbar oder atmet komisch:",
                "**112.** Dableiben. Auf die Seite legen.",
                "Sagen, was genommen wurde. Ärger ist egal – Zeit zählt."
              ]
            }
          ]
        },
        {
          "art": "tiefe",
          "fragen": [
            [
              "Was war die dümmste Rausch-Geschichte, die du gehört hast?",
              "Wer in deinem Umfeld hat es wirklich im Griff?"
            ],
            [
              "Wann wolltest du zuletzt Nein sagen und hast es nicht getan?",
              "Was wäre in deinem Leben anders ohne?"
            ],
            [
              "Wen hast du daran kaputtgehen sehen?",
              "Wovor hast du Ruhe, wenn du drauf bist?"
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
      "f": "Bis wann wird das Gehirn noch umgebaut?",
      "o": [
        "bis 12",
        "bis 16",
        "bis 18",
        "bis Mitte 20"
      ],
      "r": 3,
      "warum": "Deshalb wirken Rauschmittel in der Jugend stärker nach."
    },
    {
      "f": "Wie früh können sich bei Jugendlichen erste Zeichen von Nikotin-Abhängigkeit zeigen?",
      "o": [
        "nach wenigen Wochen",
        "nach einem Jahr",
        "nach vielen Jahren",
        "nur bei Zigaretten"
      ],
      "r": 0,
      "warum": "Auch bei Vapes – der Geschmack ändert nichts am Stoff."
    },
    {
      "f": "Früh und oft kiffen erhöht das Risiko für …",
      "o": [
        "Diabetes",
        "Psychosen",
        "Asthma",
        "gar nichts"
      ],
      "r": 1,
      "warum": "Besonders bei starkem Cannabis und frühem Beginn."
    },
    {
      "f": "„Ich kann jederzeit aufhören.“ Wie prüft man das?",
      "o": [
        "indem man es oft sagt",
        "mit einem Online-Test",
        "mit einer Pause von ein paar Tagen",
        "indem man Freunde fragt"
      ],
      "r": 2,
      "warum": "Was in der Pause passiert, ist die Antwort."
    },
    {
      "f": "Jemand ist nach dem Trinken nicht mehr ansprechbar. Was tun?",
      "o": [
        "ausschlafen lassen",
        "112 rufen und dableiben",
        "kalt abduschen",
        "allein nach Hause schicken"
      ],
      "r": 1,
      "warum": "Bewusstlose können ersticken. Zeit zählt, nicht der Ärger."
    },
    {
      "f": "Warum nehmen Menschen Rauschmittel?",
      "o": [
        "aus Dummheit",
        "wegen der Werbung",
        "weil alle es tun",
        "weil sie etwas bewirken, das gerade fehlt"
      ],
      "r": 3,
      "warum": "Deshalb die Frage: Wofür?"
    },
    {
      "f": "Was fragt die Karte „Vorher fragen“ zuerst?",
      "o": [
        "Wie viel?",
        "Merkt es jemand?",
        "Wofür will ich es gerade?",
        "Wer hat etwas dabei?"
      ],
      "r": 2,
      "warum": "Wer das Wofür kennt, kann nach anderen Wegen suchen."
    },
    {
      "f": "Jemand kann drei Tage ohne Joint kaum schlafen. Das spricht …",
      "o": [
        "für eine Gewöhnung",
        "dafür, dass es ihm guttut",
        "für gar nichts",
        "für zu wenig Sport"
      ],
      "r": 0,
      "warum": "Siehe Yusufs drei Tage."
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
        "Meldepflichten klären"
      ]
    ],
    "wann": [
      "Konsum ist bekannt oder wird vermutet – und Verbote haben nichts verändert.",
      "Der Jugendliche spricht das Thema selbst an oder prahlt damit.",
      "Rauschmittel dienen erkennbar einem Zweck: schlafen, runterkommen, dazugehören.",
      "Auch vorbeugend, wenn das Umfeld konsumiert."
    ],
    "ziel": "Der Jugendliche benennt, welche Aufgabe das Mittel für ihn erfüllt und was es ihn kostet. Eine Abstinenzzusage ist nicht das Ziel dieser Stunde.",
    "ablauf": [
      [
        "0–8",
        "Logbuch. Dann zuerst den Kasten auf Seite 1 ausfüllen: Schreiben Sie selbst hinein, was Sie weitergeben müssen. Ohne diese Klarheit ist der Rest wertlos."
      ],
      [
        "8–22",
        "Der Fall – die Frage ist eine echte Denkaufgabe. Dann die Kästen und das Video."
      ],
      [
        "22–40",
        "„Wofür eigentlich?“ allein, „Yusufs Rechnung“ gemeinsam (den Gewinn ernsthaft aufschreiben), dann das Duell mit Ihrem eigenen Mittel."
      ],
      [
        "40–50",
        "Experiment anbieten, nicht verlangen. Karten ausschneiden – die Notfall-Karte in jedem Fall."
      ]
    ],
    "haltung": [
      "Nicht konfrontieren, nicht überzeugen. Wer argumentiert, bringt den Jugendlichen dazu, den Konsum zu verteidigen.",
      "Zwiespalt ist der Normalfall: „Es hilft mir“ und „es nervt mich“ dürfen nebeneinanderstehen.",
      "Keine Mengen, Bezugsquellen oder Namen erfragen. Sie brauchen sie nicht, und der Jugendliche prüft genau das.",
      "Ihr eigenes Mittel im Duell ehrlich nennen."
    ],
    "hinweise": [
      "Seite 1: Meldepflichten und Hausregeln vorher mit der zuständigen Leitung klären, damit Ihre Auskunft stimmt.",
      "Seite 4: Die Pause ist ein Test, kein Entzug. Bei täglichem starkem Alkohol- oder Beruhigungsmittelkonsum nie ohne ärztliche Begleitung absetzen.",
      "Wer nichts nimmt, bearbeitet das Heft über „Leute, die ich kenne“ – oder über Energy-Drinks und Vapes."
    ],
    "achtung": "Konsum ist oft Selbstbehandlung von Schlafproblemen, Anspannung, ADHS-Beschwerden oder traumatischen Erinnerungen – dann fachliche Abklärung anregen. Sofort ärztlich abklären lassen: Stimmenhören, Verfolgungsgefühle, tagelange Schlaflosigkeit, Mischkonsum, Konsum bis zur Bewusstlosigkeit. Schulden, Dealen und Druck durch Ältere sind Schutzthemen und gehören zur zuständigen Leitung (Responsable). Beratung für Jugendliche und Prävention gibt es in Luxemburg bei spezialisierten Stellen (z. B. Impuls von Solidarité Jeunes, CNAPA) – aktuelle Kontaktdaten prüfen.",
    "extra": [
      {
        "titel": "Psychose: Wie gefährlich ist Cannabis?",
        "kanal": "Quarks",
        "url": "https://www.youtube.com/watch?v=hc_QTrjhYpo",
        "dauer": "Reportage",
        "frage": "Hintergrund zum Zusammenhang von Cannabis und Psychosen."
      }
    ],
    "hintergrund": "Regelmäßiger Cannabiskonsum in der Jugend hängt mit Einbußen bei Lernen und Gedächtnis sowie einem erhöhten Psychoserisiko zusammen, vor allem bei frühem Beginn, täglichem Konsum und hohem THC-Gehalt (Volkow et al.; Di Forti et al.). Erste Zeichen von Nikotinabhängigkeit können bei Jugendlichen innerhalb von Wochen nach Beginn gelegentlichen Konsums auftreten (DiFranza et al.). Gemessen am Gesamtschaden steht Alkohol an erster Stelle (Nutt et al.). Viele Menschen konsumieren, um belastende Zustände zu regulieren (Khantzian). Offenes Nachfragen nach eigenen Gründen wirkt besser als Konfrontation (Miller & Rollnick).",
    "quellen": "Volkow et al. (2014) · Di Forti et al. (2019) · DiFranza et al. (2007) · Nutt et al. (2010) · Khantzian (1997) · Miller & Rollnick (2013)."
  }
}
export default d
