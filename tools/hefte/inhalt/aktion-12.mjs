// SOLO AKTION #12 · Nähe – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a12.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-12",
 "kuerzel": "ak12",
 "nr": 12,
 "nrText": "#12",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #12",
 "fuss": "SOLO AKTION #12 · Nähe",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-12-Naehe-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Nähe",
  "fr": ""
 },
 "untertitel": {
  "de": "Woran erkennst du, ob dir jemand guttut? Das probierst du hier aus – an Lina, nicht an dir. Von dir erzählst du nur, was du willst. Jede Aktion dauert 10 bis 15 Minuten.",
  "fr": ""
 },
 "farben": {
  "tief": "#E71387",
  "mittel": "#FF7AC3",
  "zart": "#ffeff8",
  "dunkel": "#960c58"
 },
 "deckbild": [
  "lina:verlegen:stehen"
 ],
 "blasen": [
  {
   "t": "Dein Tempo",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:heart-question}<span>Liebe oder Kontrolle?</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:lock}<span>Lina und Elias</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:arrows-maximize}<span>Größer oder kleiner?</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:player-play}<span>Video-Check</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:eye}<span>Ja, Nein, unsicher</span><small>10 Min.</small><i></i></div><div><b>6</b>{i:hand-stop}<span>Der Druck-Test</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:list-check}<span>Mein Maßstab</span><small>10 Min.</small><i></i></div><div><b>8</b>{i:lifebuoy}<span>Wem sage ich es?</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Liebe oder Kontrolle?",
   "icon": "heart-question",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "lina:verlegen",
   "schritte": [
    "Dein Gegenüber liest einen Satz vor.",
    "Beide zeigen gleichzeitig mit den Fingern: **1** okay. **2** kommt drauf an. **3** geht nicht.",
    "Kreuz an, was du gezeigt hast.",
    "Bei „kommt drauf an“: Worauf? Ein Satz reicht."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Jemand, mit dem du zusammen bist …",
     "kopf": [
      "",
      "okay",
      "kommt drauf an",
      "geht nicht"
     ],
     "breiten": [
      55,
      15,
      15,
      15
     ],
     "zeilen": [
      [
       "will immer wissen, wo ich bin",
       "",
       "",
       ""
      ],
      [
       "liest meine Nachrichten",
       "",
       "",
       ""
      ],
      [
       "will mein Passwort",
       "",
       "",
       ""
      ],
      [
       "schreibt 30-mal, wenn ich nicht antworte",
       "",
       "",
       ""
      ],
      [
       "sagt: „Wenn du mich liebst, dann …“",
       "",
       "",
       ""
      ],
      [
       "ist beleidigt, wenn ich Nein sage",
       "",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Eifersucht ist kein Beweis für Liebe. **Sie zeigt nur, dass jemand Angst hat.**",
   "ziel": "Kontrolle erkennen, auch wenn sie als Liebe verkauft wird.",
   "tipp": "Ehrlich mitzeigen. „Kommt drauf an“ nicht wegdiskutieren – nachfragen, worauf."
  },
  {
   "titel": "Lina und Elias",
   "icon": "lock",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "lina:verlegen",
   "schritte": [
    "Schaut euch an, was bei Lina passiert.",
    "Die Freundin sagt: „Der liebt dich halt.“ Kreis ein: Stimmt das?",
    "Kreuz an: Was könnte Lina jetzt tun?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:map-pin}</div><p>Elias will immer wissen, wo Lina ist. Erst fand sie es süß.</p></div><div><div class=\"o\"><b>2</b>{i:lock}</div><p>Dann will er ihren Standort. Dann ihr Passwort.</p></div><div><div class=\"o\"><b>3</b>{i:message-off}</div><p>Er liest ihre Chats. Drei Tage ist er beleidigt.</p></div><div><div class=\"o\"><b>4</b>{i:mood-sad}</div><p>Lina entschuldigt sich. Sie weiß nicht, wofür.</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "„Der liebt dich halt.“ Stimmt das?",
     "fragen": [
      {
       "f": "",
       "o": [
        "ja",
        "nein",
        "beides ein bisschen"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Das könnte Lina tun:",
     "fragen": [
      {
       "f": "",
       "o": [
        "sich wieder entschuldigen",
        "sagen: „Mein Handy bleibt meins.“",
        "erst mit jemandem reden, dem sie vertraut"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer sich entschuldigt und nicht weiß wofür, **steht unter Druck.**",
   "ziel": "An Lina sehen, wie Kontrolle Schritt für Schritt wächst.",
   "tipp": "Nicht fragen, ob er das kennt. Wer will, erzählt von selbst."
  },
  {
   "titel": "Größer oder kleiner?",
   "icon": "arrows-maximize",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest vor, was jemand in einer Beziehung macht.",
    "Arme weit auseinander: **Das Leben wird größer.** Arme eng zusammen: **Es wird kleiner.**",
    "Beide zeigen gleichzeitig. Kreuz an."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Die Person …",
     "kopf": [
      "",
      "größer",
      "kleiner"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "freut sich, wenn ich Freunde treffe",
       "",
       ""
      ],
      [
       "will nicht, dass ich allein rausgehe",
       "",
       ""
      ],
      [
       "fragt, bevor ein Foto von mir gepostet wird",
       "",
       ""
      ],
      [
       "macht meine Freunde schlecht",
       "",
       ""
      ],
      [
       "hört zu, wenn ich Nein sage",
       "",
       ""
      ],
      [
       "ist tagelang beleidigt",
       "",
       ""
      ],
      [
       "lässt mir mein Handy",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Wer dir guttut, **macht dein Leben größer – nicht kleiner.**",
   "ziel": "Einen einfachen Maßstab für Beziehungen haben.",
   "tipp": "Die Arme wirklich benutzen. Der Maßstab gilt auch für Freundschaften."
  },
  {
   "titel": "Video-Check",
   "icon": "player-play",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "Handy oder Tablet",
   "bild": "",
   "schritte": [
    "Scannt den Code. Der Clip dauert etwa 3 Minuten.",
    "Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.",
    "Wo wird es im echten Leben schwieriger als im Clip? Ein Satz."
   ],
   "zonen": [
    {
     "art": "clip",
     "titel": "Einverständnis – so einfach wie Tee",
     "kanal": "GONEASTRAYfilms",
     "dauer": "ca. 3 Min.",
     "url": "https://www.youtube.com/watch?v=2ovcQgIN5G4",
     "frage": "Wo wird es im echten Leben schwieriger?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Ein Ja zählt nur, wenn ein Nein auch ginge.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Ein Ja darf man zurücknehmen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Wer nichts sagt, ist einverstanden.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Wer weggetreten ist, kann nicht Ja sagen.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Ein Ja zählt nur, wenn ein Nein auch ginge. **Und jedes Ja darf man zurücknehmen.**",
   "ziel": "Einverständnis in vier klaren Sätzen.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Schweigen ist kein Ja."
  },
  {
   "titel": "Ja, Nein, unsicher",
   "icon": "eye",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber fragt dich etwas Kleines: „Darf ich deinen Stift nehmen?“",
    "Du antwortest **ohne Worte.** Nur mit Gesicht und Körper.",
    "Dein Gegenüber rät: Ja, Nein oder unsicher?",
    "Fünf Fragen. Dann tauschen."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "",
     "hoch": true,
     "kopf": [
      "",
      "richtig geraten von 5"
     ],
     "breiten": [
      86,
      14
     ],
     "zeilen": [
      [
       "Du",
       ""
      ],
      [
       "Dein Gegenüber",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Am schwersten zu erkennen war:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Ja",
        "Nein",
        "unsicher"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Nicht sicher, ob es ein Ja ist? **Dann frag. Ein unsicheres Ja ist ein Nein.**",
   "ziel": "Erleben, wie schwer ein Ja ohne Worte zu lesen ist.",
   "tipp": "Nur harmlose Alltagsfragen: Stift, Fenster, Platz, Musik. Keine Berührung."
  },
  {
   "titel": "Der Druck-Test",
   "icon": "hand-stop",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber spielt jemanden, der an dein Handy will.",
    "Du bleibst bei **einem Satz.** Such ihn dir unten aus.",
    "Es wird in drei Stufen schwerer. Kreuz an, wie es war.",
    "Tauschen: Jetzt drängst du – und dein Gegenüber bleibt bei seinem Satz."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Dein Gegenüber sagt …",
     "kopf": [
      "",
      "leicht",
      "schwer"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "„Zeig mal dein Handy.“",
       "",
       ""
      ],
      [
       "„Wenn du nichts versteckst, kannst du es ja zeigen.“",
       "",
       ""
      ],
      [
       "„Wenn du mich magst, dann zeigst du es.“",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "Mein Satz:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Mein Handy bleibt meins.“",
        "„Nein. Und ich mag dich trotzdem.“",
        "„Unter Druck entscheide ich nichts.“"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Wer Druck macht, will kein Ja. **Er will, dass du aufgibst.**",
   "ziel": "Unter Druck bei einem Satz bleiben können.",
   "tipp": "Sie spielen „jemanden“, keinen Partner. Es geht nur ums Handy. Nach Stufe 3 sofort aus der Rolle gehen."
  },
  {
   "titel": "Mein Maßstab",
   "icon": "list-check",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "lina:froh",
   "schritte": [
    "Kreuz an: Was muss jemand können, damit er dir guttut? **Höchstens drei.**",
    "Dein Gegenüber wählt seine drei.",
    "Jetzt die Rückseite: Kreis ein, was **du selbst** gut kannst."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:ear}<span>zuhören</span><i></i></div><div>{i:hand-stop}<span>ein Nein hören können</span><i></i></div><div>{i:users}<span>mir meine Freunde lassen</span><i></i></div><div>{i:check}<span>halten, was man sagt</span><i></i></div><div>{i:mood-happy}<span>mit mir lachen</span><i></i></div><div>{i:shield}<span>vor anderen zu mir stehen</span><i></i></div><div>{i:clock}<span>mir Zeit lassen</span><i></i></div><div>{i:message-circle}<span>ehrlich sein</span><i></i></div></div>"
    }
   ],
   "aha": "Dein Maßstab gilt **in beide Richtungen.**",
   "ziel": "Eigene Kriterien haben – und sie an sich selbst anlegen.",
   "tipp": "Die eigenen drei ehrlich wählen. Nicht fragen, an wen er denkt."
  },
  {
   "titel": "Wem sage ich es?",
   "icon": "lifebuoy",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Manchmal fühlt sich etwas falsch an – und man weiß nicht genau, warum.",
    "Kreuz an: Mit wem könntest du dann reden?",
    "Kreis **eine** Person ein, die es am ehesten wäre.",
    "Dein Gegenüber sagt dir, was es weitersagen müsste – und was nicht."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:users}<span>Freundin oder Freund</span><i></i></div><div>{i:user-check}<span>Bezugsperson hier</span><i></i></div><div>{i:home}<span>jemand aus der Familie</span><i></i></div><div>{i:school}<span>Lehrerin oder Lehrer</span><i></i></div><div>{i:phone}<span>Kanner-Jugendtelefon 116 111</span><i></i></div><div>{i:user-question}<span>weiß ich noch nicht</span><i></i></div></div>"
    }
   ],
   "aha": "Wenn sich etwas falsch anfühlt: **Du musst das nicht allein sortieren.**",
   "ziel": "Eine Ansprechperson benannt haben, bevor sie gebraucht wird.",
   "tipp": "Schritt 4 ernst nehmen: klar sagen, was Sie melden müssten. „Weiß ich noch nicht“ ist eine ehrliche Antwort."
  }
 ],
 "woche": {
  "titel": "Drei Paare",
  "icon": "calendar-week",
  "zeit": "1 Woche",
  "wer": "du allein",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Schau dir diese Woche **drei Paare** an: echt, in einer Serie oder im Netz.",
   "Wo siehst du Respekt? Wo Kontrolle, die wie Liebe aussieht?",
   "Mach einen Strich. Wette vorher: Wovon findest du mehr?"
  ],
  "zonen": [
   {
    "art": "tabelle",
    "auftrag": "",
    "hoch": true,
    "kopf": [
     "",
     "Mo",
     "Di",
     "Mi",
     "Do",
     "Fr",
     "Sa",
     "So"
    ],
    "breiten": [
     37,
     9,
     9,
     9,
     9,
     9,
     9,
     9
    ],
    "zeilen": [
     [
      "Respekt gesehen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "Kontrolle gesehen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ein Nein wurde gehalten",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ein Nein wurde übergangen",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ]
    ]
   },
   {
    "art": "schneidekarten",
    "auftrag": "Für die Tasche: Schneide die Karten aus.",
    "spalten": 2,
    "karten": [
     {
      "titel": "Tee-Regel",
      "icon": "heart",
      "text": "Ein Ja zählt nur, wenn Nein auch ginge.\nBedrängt, weggetreten, eingeschlafen: kein Ja.\nEin Ja darf man zurücknehmen."
     },
     {
      "titel": "Tut mir das gut?",
      "icon": "user-heart",
      "text": "Wird mein Leben größer oder kleiner?\nDarf ich Nein sagen, ohne bestraft zu werden?\nKann ich so sein, wie ich bin?"
     }
    ]
   }
  ],
  "aha": "Wer hinschaut, erkennt den Unterschied **schneller – auch bei sich.**",
  "ziel": "Eine Woche lang den Blick schärfen.",
  "tipp": "Nur über die beobachteten Paare sprechen, nicht über das eigene."
 },
 "begleitungAktion": {
  "material": "Handy, Stifte",
  "achtung": "Das Heft kann Übergriffe sichtbar machen. Nicht nach Einzelheiten fragen, glauben, ruhig bleiben, nichts versprechen, was Sie nicht halten können. Bei Hinweisen auf sexuelle Gewalt, auf Beziehungen mit deutlich Älteren, auf Erpressung mit Bildern oder auf Gewalt in der Beziehung nach dem Verfahren der Einrichtung handeln und die zuständige Leitung (Responsable) einbeziehen. Schildert der Jugendliche eigenes übergriffiges Verhalten, ist das ebenfalls ein Schutzthema – für die andere Person und für ihn. In keiner Aktion wird nach eigenen sexuellen Erfahrungen gefragt; Rollenspiele bleiben beim Handy und bei Alltagsfragen.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #12 Nähe."
 }
}

export const LEKTIONEN = []
