// SOLO AKTION #09 · Rausch – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a09.ts.
// Inhalt dort ändern und den Umwandler neu laufen lassen.

export const MODUL = {
 "id": "aktion-09",
 "kuerzel": "ak9",
 "nr": 9,
 "nrText": "#09",
 "sprache": "de",
 "kompakt": true,
 "ohneLoesungen": true,
 "ablage": "offline/solo",
 "deckH1": "SOLO AKTION #09",
 "fuss": "SOLO AKTION #09 · Rausch",
 "stand": "November 2026",
 "klasse": "Zum Machen",
 "niveau": "12–17 Jahre · 10–15 Minuten je Aktion",
 "dateiname": "Solo-09-Rausch-Aktion",
 "fach": {
  "de": "Bezugszeit",
  "fr": "Temps de référence"
 },
 "titel": {
  "de": "Rausch",
  "fr": ""
 },
 "untertitel": {
  "de": "Hier fragt dich keiner nach Mengen, Namen oder woher. Fang mit Aktion 1 an – das sind die Regeln. Alles geht auch über „Leute, die ich kenne“.",
  "fr": ""
 },
 "farben": {
  "tief": "#8D780B",
  "mittel": "#FFD60A",
  "zart": "#fffae2",
  "dunkel": "#5c4e07"
 },
 "deckbild": [
  "yusuf:neutral:stehen"
 ],
 "blasen": [
  {
   "t": "Erst die Regeln",
   "x": 138,
   "y": 104
  }
 ],
 "deckUnten": "<h3>Such dir aus, womit du anfängst</h3><div class=\"ak-karte\"><div><b>1</b>{i:shield-check}<span>Erst die Regeln</span><small>10 Min.</small><i></i></div><div><b>2</b>{i:help-circle}<span>Wofür?</span><small>10 Min.</small><i></i></div><div><b>3</b>{i:calendar-x}<span>Yusufs drei Tage</span><small>10 Min.</small><i></i></div><div><b>4</b>{i:scale}<span>Yusufs Rechnung</span><small>10 Min.</small><i></i></div><div><b>5</b>{i:player-play}<span>Video-Check</span><small>12 Min.</small><i></i></div><div><b>6</b>{i:bulb}<span>Stimmt’s oder Quatsch?</span><small>10 Min.</small><i></i></div><div><b>7</b>{i:first-aid-kit}<span>Notfall üben</span><small>15 Min.</small><i></i></div><div><b>8</b>{i:hand-stop}<span>„Heute nicht.“</span><small>10 Min.</small><i></i></div></div><p class=\"ak-regel\"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>",
 "namensfelder": [
  "Dieses Heft gehört",
  "Mein Gegenüber"
 ],
 "aktionen": [
  {
   "titel": "Erst die Regeln",
   "icon": "shield-check",
   "zeit": "10 Min.",
   "wer": "dein Gegenüber schreibt",
   "material": "Stift",
   "bild": "yusuf:neutral",
   "schritte": [
    "**Bevor du etwas erzählst:** Dein Gegenüber schreibt auf, was es weitersagen **muss.**",
    "Und was hier bleibt.",
    "Frag nach, bis es klar ist.",
    "Erst dann entscheidest du, wie viel du sagst."
   ],
   "zonen": [
    {
     "art": "fragen",
     "auftrag": "Das muss mein Gegenüber weitersagen:",
     "fragen": [
      {
       "f": "",
       "zeilen": 2
      }
     ]
    },
    {
     "art": "fragen",
     "auftrag": "Das bleibt hier:",
     "fragen": [
      {
       "f": "",
       "zeilen": 2
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Für mich ist es:",
     "fragen": [
      {
       "f": "",
       "o": [
        "klar",
        "noch mal erklären"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Erst die Regeln, dann das Reden. **Das ist dein Recht.**",
   "ziel": "Der Jugendliche weiß vor jedem Wort, was mit seinen Angaben passiert.",
   "tipp": "Vorher die Meldepflichten der Einrichtung klären. Ehrlich aufschreiben – auch, wenn es das Gespräch kleiner macht."
  },
  {
   "titel": "Wofür?",
   "icon": "help-circle",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "zwei Farben",
   "bild": "",
   "schritte": [
    "Für dich – oder für Leute, die du kennst.",
    "Kreuz an: **Wofür** nehmen sie es?",
    "Dein Gegenüber kreuzt für sein Mittel an: Kaffee, Wein, Zigaretten, Handy.",
    "Kreis ein, was es **immer schlechter** erledigt."
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-wahl\"><div>{i:wind}<span>runterkommen</span><i></i></div><div>{i:moon}<span>einschlafen</span><i></i></div><div>{i:users}<span>dazugehören</span><i></i></div><div>{i:mood-happy}<span>Spaß</span><i></i></div><div>{i:mood-empty}<span>nichts fühlen</span><i></i></div><div>{i:flame}<span>mutiger sein</span><i></i></div><div>{i:hourglass}<span>Langeweile</span><i></i></div><div>{i:repeat}<span>ohne geht es nicht mehr</span><i></i></div></div>"
    }
   ],
   "aha": "Niemand nimmt etwas, weil es nichts bringt. **Die Frage ist: Wofür brauchst du es?**",
   "ziel": "Die Funktion des Mittels erkennen.",
   "tipp": "Das eigene Mittel ehrlich nennen. Keine Mengen erfragen."
  },
  {
   "titel": "Yusufs drei Tage",
   "icon": "calendar-x",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "yusuf:wuetend",
   "schritte": [
    "Schaut euch Yusufs Woche an.",
    "Kreuz an: Welcher Satz von Yusuf stimmt?",
    "Kreis ein: Was zeigen die drei Tage?"
   ],
   "zonen": [
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-comic\" style=\"grid-template-columns:repeat(4,1fr)\"><div><div class=\"o\"><b>1</b>{i:moon}</div><p>Yusuf raucht jeden Abend einen. „Zum Runterkommen.“</p></div><div><div class=\"o\"><b>2</b>{i:message-circle}</div><p>Er sagt: „Ich kann jederzeit aufhören.“</p></div><div><div class=\"o\"><b>3</b>{i:calendar-x}</div><p>Drei Tage gibt es nichts. Kaum Schlaf. Streit. Nicht zur Arbeit.</p></div><div><div class=\"o\"><b>4</b>{i:arrow-back-up}</div><p>Tag vier: „Siehst du. Ohne geht es mir schlechter.“</p></div></div>"
    },
    {
     "art": "mc",
     "auftrag": "Dieser Satz stimmt:",
     "fragen": [
      {
       "f": "",
       "o": [
        "„Ich kann jederzeit aufhören.“",
        "„Ohne geht es mir schlechter.“"
       ],
       "r": []
      }
     ]
    },
    {
     "art": "mc",
     "auftrag": "Die drei Tage zeigen:",
     "fragen": [
      {
       "f": "",
       "o": [
        "Er hat es im Griff.",
        "Sein Körper hat sich gewöhnt.",
        "gar nichts"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "„Ohne geht es mir schlechter“ stimmt. **Genau das ist das Zeichen.**",
   "ziel": "Gewöhnung an einem Beispiel erkennen.",
   "tipp": "Nicht fragen „Und bei dir?“. Wer will, sagt es von selbst."
  },
  {
   "titel": "Yusufs Rechnung",
   "icon": "scale",
   "zeit": "10 Min.",
   "wer": "zusammen",
   "material": "",
   "bild": "",
   "schritte": [
    "Jeden Abend einen: Was **bringt** es Yusuf? Was **kostet** es ihn?",
    "Mach in jeder Zeile ein Kreuz.",
    "Zählt die Kreuze in beiden Spalten."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Jeden Abend einen:",
     "kopf": [
      "",
      "bringt ihm",
      "kostet ihn"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "schneller einschlafen",
       "",
       ""
      ],
      [
       "Ruhe im Kopf",
       "",
       ""
      ],
      [
       "Geld",
       "",
       ""
      ],
      [
       "Streit mit der kleinen Schwester",
       "",
       ""
      ],
      [
       "Ärger auf der Arbeit",
       "",
       ""
      ],
      [
       "Schlafen geht nur noch damit",
       "",
       ""
      ],
      [
       "dazugehören",
       "",
       ""
      ]
     ]
    },
    {
     "art": "mc",
     "auftrag": "In zwei Jahren ist die Rechnung:",
     "fragen": [
      {
       "f": "",
       "o": [
        "besser",
        "gleich",
        "schlechter"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Am Anfang bringt es viel und kostet wenig. **Später dreht es sich um.**",
   "ziel": "Nutzen und Preis nebeneinander sehen – ohne Urteil.",
   "tipp": "Den Nutzen ernst nehmen. Wer nur die Kosten gelten lässt, hält eine Predigt."
  },
  {
   "titel": "Video-Check",
   "icon": "player-play",
   "zeit": "12 Min.",
   "wer": "zusammen",
   "material": "Handy oder Tablet",
   "bild": "",
   "schritte": [
    "Scannt den Code. Schaut das Video.",
    "Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?",
    "Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei."
   ],
   "zonen": [
    {
     "art": "clip",
     "titel": "Wie schädlich ist Cannabis für das Gehirn Jugendlicher?",
     "kanal": "drugcom.de",
     "dauer": "ganz schauen",
     "url": "https://www.youtube.com/watch?v=IbjiA_5BZ14",
     "frage": "Was wusstest du schon – und was glaubst du nicht?",
     "zeilen": 1
    },
    {
     "art": "frei",
     "auftrag": "",
     "html": "<div class=\"ak-daumen\"><div class=\"k\"><span></span><b>du</b><b>Gegenüber</b></div><div><span>Das wusste ich alles schon.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Manches davon glaube ich nicht.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Je früher man anfängt, desto mehr schadet es.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div><div><span>Erwachsene übertreiben bei dem Thema.</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div></div>"
    }
   ],
   "aha": "Dein Gehirn wird bis Mitte 20 umgebaut. **Je früher, je öfter, je stärker – desto mehr Schaden.**",
   "ziel": "Sachwissen ohne Abschreckung.",
   "tipp": "Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Zweifel des Jugendlichen stehen lassen."
  },
  {
   "titel": "Stimmt’s oder Quatsch?",
   "icon": "bulb",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber liest einen Satz vor.",
    "Beide zeigen gleichzeitig: Daumen hoch = stimmt. Daumen runter = Quatsch.",
    "Kreuz an. Die Lösung hat dein Gegenüber.",
    "Wer mehr richtig hat, gewinnt."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Der Satz:",
     "kopf": [
      "",
      "stimmt",
      "Quatsch"
     ],
     "breiten": [
      70,
      15,
      15
     ],
     "zeilen": [
      [
       "Das Gehirn wird bis Mitte 20 umgebaut.",
       "",
       ""
      ],
      [
       "Vapes machen nicht abhängig.",
       "",
       ""
      ],
      [
       "Kaffee macht Betrunkene wieder nüchtern.",
       "",
       ""
      ],
      [
       "Wer früh und oft kifft, hat später öfter Probleme mit dem Gedächtnis.",
       "",
       ""
      ],
      [
       "Wer bewusstlos ist, soll ausschlafen.",
       "",
       ""
      ],
      [
       "Nikotin kann schon nach Wochen abhängig machen.",
       "",
       ""
      ]
     ]
    }
   ],
   "aha": "Wer Bescheid weiß, **entscheidet selbst.**",
   "ziel": "Sechs Fakten sicher kennen.",
   "tipp": "Lösung: 1 stimmt · 2 Quatsch · 3 Quatsch (nur die Zeit baut Alkohol ab) · 4 stimmt · 5 Quatsch (Seitenlage, 112, dableiben) · 6 stimmt."
  },
  {
   "titel": "Notfall üben",
   "icon": "first-aid-kit",
   "zeit": "15 Min.",
   "wer": "beide",
   "material": "Decke oder Jacke als Unterlage",
   "bild": "yusuf:neutral",
   "schritte": [
    "Dein Gegenüber zeigt dir die **stabile Seitenlage.**",
    "Dann spielt es „nicht ansprechbar“. Sprich es laut an.",
    "Leg es auf die Seite. **Nur, wenn beide einverstanden sind.**",
    "Spiel den Anruf bei der **112**: Wo bin ich? Was ist passiert? Was wurde genommen?",
    "Tauschen."
   ],
   "zonen": [
    {
     "art": "mc",
     "auftrag": "Das habe ich gemacht:",
     "fragen": [
      {
       "f": "",
       "o": [
        "laut angesprochen",
        "auf die Seite gelegt",
        "112 gewählt (gespielt)",
        "gesagt, was genommen wurde",
        "dageblieben"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Ärger ist egal. **Zeit zählt. Bleib da.**",
   "ziel": "Im Ernstfall handeln können – einmal mit den Händen geübt.",
   "tipp": "Die Seitenlage vorher selbst auffrischen. Wer nicht angefasst werden will, übt nur den Anruf. Nie wirklich die 112 wählen."
  },
  {
   "titel": "„Heute nicht.“",
   "icon": "hand-stop",
   "zeit": "10 Min.",
   "wer": "beide",
   "material": "",
   "bild": "",
   "schritte": [
    "Dein Gegenüber spielt jemanden, der dir etwas anbietet.",
    "Du sagst **„Heute nicht.“** oder **„Lass mal.“** Ohne Erklärung.",
    "Es wird in drei Stufen schwerer. Kreuz an, wie es war.",
    "Tauschen: Du bietest an. Dein Gegenüber lehnt ab."
   ],
   "zonen": [
    {
     "art": "tabelle",
     "auftrag": "Dein Gegenüber …",
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
       "… fragt nett.",
       "",
       ""
      ],
      [
       "… fragt dreimal hintereinander.",
       "",
       ""
      ],
      [
       "… sagt: „Stell dich nicht so an.“",
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
        "„Heute nicht.“",
        "„Lass mal.“",
        "„Nein.“",
        "„Ich bin raus.“"
       ],
       "r": []
      }
     ]
    }
   ],
   "aha": "Du musst nichts erklären. **„Heute nicht“ ist ein ganzer Satz.**",
   "ziel": "Ablehnen üben – auch unter leichtem Druck.",
   "tipp": "Angeboten wird im Spiel „etwas“ – keine Stoffe benennen. Bei Stufe 3 nur den einen Satz sagen, nichts Persönliches."
  }
 ],
 "woche": {
  "titel": "Drei Tage Pause",
  "icon": "calendar-week",
  "zeit": "3 Tage",
  "wer": "du – mit Ansage",
  "material": "dieses Blatt",
  "bild": "",
  "schritte": [
   "Lass es **drei Tage** weg. Oder dein anderes Mittel: Vape, Energy-Drinks.",
   "**Sag deinem Gegenüber, an welchen Tagen.**",
   "Wer täglich trinkt oder Tabletten nimmt: **nicht allein. Erst zum Arzt.**",
   "Mach jeden Abend ein Kreuz."
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
      "Tag ohne",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "war schwer",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "ging so",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ],
     [
      "okay geschlafen",
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
      "titel": "Vorher fragen",
      "icon": "help-circle",
      "text": "Wofür will ich es gerade?\nWas hilft auch – nur langsamer?\nEntscheide ich – oder die Gewohnheit?"
     },
     {
      "titel": "Notfall",
      "icon": "first-aid-kit",
      "text": "Nicht ansprechbar oder atmet komisch:\n**112.** Dableiben. Auf die Seite legen.\nSagen, was genommen wurde."
     }
    ]
   }
  ],
  "aha": "Was in der Pause passiert, **ist die Antwort.**",
  "ziel": "Ein eigener Test, begleitet und angekündigt.",
  "tipp": "Die Tage notieren und im Haus Rückendeckung geben: Gereiztheit in diesen Tagen ist kein Regelverstoß."
 },
 "begleitungAktion": {
  "material": "Stifte, Handy, Decke",
  "achtung": "Konsum ist oft Selbstbehandlung von Schlafproblemen, Anspannung, ADHS-Beschwerden oder traumatischen Erinnerungen – dann fachliche Abklärung anregen. Sofort ärztlich abklären lassen: Stimmenhören, Verfolgungsgefühle, tagelange Schlaflosigkeit, Mischkonsum, Konsum bis zur Bewusstlosigkeit. Schulden, Dealen und Druck durch Ältere sind Schutzthemen und gehören zur zuständigen Leitung (Responsable). Beratung für Jugendliche und Prävention gibt es in Luxemburg bei spezialisierten Stellen (z. B. Impuls von Solidarité Jeunes, CNAPA) – aktuelle Kontaktdaten prüfen.",
  "mehr": "Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #09 Rausch."
 }
}

export const LEKTIONEN = []
