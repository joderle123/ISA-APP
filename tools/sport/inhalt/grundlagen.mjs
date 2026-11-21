// Grundlagen für alle Sport-Blöcke: wie die Stunden gebaut sind, wie alle dranbleiben, Aufwärmspiele für Jugendliche,
// Match-Formate und Extra-Regeln, Jahresübersicht. Gilt für jede Sportart.
// Sprache (Rückmeldung 22.11.): kurze Sätze, keine Fachwörter ohne Erklärung.
export const GRUND = {
  farbe: '#1e8a5a',
  seiten: [
    {
      titel: 'So sind die Stunden gebaut', unter: 'Für Jugendliche, die schnell abschalten oder wenig Lust haben – und trotzdem etwas lernen sollen.',
      teile: [
        { titel: 'Jede Stunde gleich (50 Min.)', liste: [
          '**Aufwärmspiel (7–8 Min.)** – sofort los, kein Einlaufen im Kreis.',
          '**Technik (10 Min.)** – eine Sache, als kleiner Wettbewerb.',
          '**Spielnah üben (10–12 Min.)** – kleine Felder, viel Ball.',
          '**Match (15–24 Min.)** – mit einer Extra-Regel zum Thema.',
          '**Abschluss (5 Min.)** – Klassenrekord und ein Lob.',
          'Doppelstunde: Extra-Idee unten auf jeder Seite.',
        ] },
        { titel: 'Sieben Regeln, damit alle dranbleiben', liste: [
          '**Erst spielen, dann erklären.** Höchstens 30 Sekunden reden.',
          '**Kein Warten in Schlangen.** Höchstens 2 warten – sonst Gruppen teilen.',
          '**Kurze Blöcke:** spätestens nach 10 Minuten etwas Neues.',
          '**Leichter oder schwerer:** Jeder wählt selbst.',
          '**Punkte fürs Team**, nicht für Einzelne. Dazu ein Klassenrekord.',
          '**Aufgaben statt Bank:** Joker, Schiri, Zeitnehmer, Passgeber.',
          '**Musik** beim Aufwärmen und an Stationen.',
        ] },
        { titel: 'Teams einteilen – nie wählen lassen', liste: [
          'Leibchen oder Spielkarten ziehen (Farbe = Team).',
          'Nach Geburtsmonat oder Schuhfarbe – dann ausgleichen.',
          'Für Turniere macht die Lehrperson die Teams vorher.',
          'Zu ungleich? Nach dem Spiel 1–2 Personen tauschen.',
        ] },
        { titel: 'Wenn jemand nicht mitmachen will', liste: [
          '**Leise fragen, nicht vor allen:** „Was ist los?“',
          '**Aufgabe anbieten:** Joker, Schiri, Zeitnehmer, Passgeber.',
          '**Leichtere Stufe** oder Partner selbst wählen lassen.',
          '**„Erst 5 Minuten, dann entscheidest du.“** Die meisten bleiben dabei.',
          'Bei Schmerzen, Periode oder Verletzung: keinen Grund vor der Gruppe verlangen – Aufgabe geben.',
          'Nie bloßstellen, keine Strafrunden. Später kurz unter vier Augen fragen.',
        ] },
        { titel: 'Was „spielerisch“ hier heißt', text: 'Keine Kinderspiele, sondern **Spiele mit Wettbewerb, Tempo und Ziel**: Rekorde, Bonuspunkte, kleine Turniere. Jede Übung hat einen Punkt, einen Gegner oder eine Uhr. Gelernt wird nebenbei. Der **Satz der Stunde** ist der eine Tipp, den alle mitnehmen.', breit: true },
      ],
    },
    {
      titel: 'Aufwärmspiele für Jugendliche', unter: 'Für jede Sportart. 5–8 Minuten, Musik an, sofort los. Tempo, Wettbewerb, Lachen.',
      teile: [{ spiele: [
        { name: 'Schere-Stein-Papier-Fangen', fuer: 'alle', text: 'Paare stehen sich an der Mittellinie gegenüber. Alle spielen gleichzeitig. Gewinner fängt, Verlierer rennt zur eigenen Linie (8 m). Nach 3 Runden neuer Partner.', tipp: 'Kurze Sprints, viel Lachen.' },
        { name: 'Hütchen-Krieg', fuer: 'alle', text: '40 Hütchen verteilt, die Hälfte umgedreht. Team A stellt sie auf, Team B dreht sie um. 60 Sekunden, dann zählen. 3 Runden.', tipp: 'Mit Ball: Nur wer dribbelt, darf drehen.' },
        { name: 'Ball-Fangen', fuer: 'Ballspiele', text: '3 Fänger mit 1 Ball. Abschlagen nur mit dem Ball in der Hand. Mit Ball nicht laufen – also passen. Wer erwischt wird, fängt mit.', tipp: 'Übt Passen und Freilaufen nebenbei.' },
        { name: 'Hütchenklau', fuer: 'alle', text: '4 Teams in den Ecken, Hütchen in der Mitte. Immer eine Person holt ein Hütchen. Mitte leer? Bei den anderen klauen. Wer zuerst 5 hat, gewinnt.', tipp: 'Mit Ball: Hütchen nur dribbelnd holen.' },
        { name: 'Ninja', fuer: 'ruhig', text: 'Kreis, alle in einer Kampf-Pose. Reihum eine schnelle Bewegung: die Hand eines Nachbarn treffen. Der darf ausweichen. Getroffene Hand kommt auf den Rücken.', tipp: 'Beliebt und kaum anstrengend – gut für Müde.' },
        { name: 'Kegelball', fuer: 'Wurfspiele', text: 'Ein Kegel auf einem Kasten in einem Kreis. Eine Person bewacht ihn. Außen passen und auf den Kegel werfen. Wer trifft, wird Wächter.', tipp: 'Zwei Kreise, damit niemand wartet.' },
        { name: 'Schweinchen in der Mitte', fuer: 'Ballspiele', text: '4–5 außen, 1–2 in der Mitte. 10 Pässe = Punkt für außen. Wer den Ball verliert, geht in die Mitte.', tipp: 'Geht mit Hand, Fuß und Schläger.' },
        { name: 'Zombie-Ball', fuer: 'Softball', text: 'Alle gegen alle mit 3 Softbällen. Nur unter der Schulter treffen. Getroffen = hinsetzen. Wer einen rollenden Ball fängt, darf wieder rein.', tipp: 'Niemand ist lange draußen.' },
        { name: 'Kopf oder Zahl', fuer: 'alle', text: 'Paare Rücken an Rücken in der Mitte. Eine Seite heißt „Kopf“, die andere „Zahl“. Lehrperson ruft eine Seite: Die rennt weg, die andere fängt.', tipp: 'Mit Rechenaufgabe: gerade Zahl = Kopf rennt.' },
        { name: 'Zahlen-Pass', fuer: 'Ballspiele', text: 'Gruppen zu 5, alle haben eine Nummer. Im Laufen der Reihe nach passen: 1 → 2 → 3 → 4 → 5. Dann 2 Bälle.', tipp: 'Geht mit Hand, Fuß, Frisbee, Unihockey.' },
      ] }],
    },
    {
      titel: 'Match-Formen und Extra-Regeln', unter: 'Das Match ist für viele der Grund mitzumachen. Kleine Teams, kurze Spiele, eine Extra-Regel zum Thema.',
      teile: [
        { titel: 'Formen', liste: [
          '**Zwei Felder, 4 gegen 4** statt 8 gegen 8 – doppelt so viel Ball.',
          '**3 Teams:** Gewinner bleibt (höchstens 2-mal), Verlierer raus, wartendes Team rein.',
          '**King of the Court** (Volleyball, Badminton, Tischtennis): Gewinner ein Feld hoch, Verlierer eins runter.',
          '**Mini-Turnier** in Woche 6: 3 Teams, jeder gegen jeden. Das freie Team pfeift.',
          '**Lehrperson spielt mit** – beim schwächeren Team, nur als Passgeber.',
        ] },
        { titel: 'Extra-Regeln (eine pro Match)', liste: [
          'Tor zählt doppelt, wenn **alle im Team** vorher den Ball hatten.',
          'Tor von jemandem, der heute **noch nicht getroffen** hat, zählt doppelt.',
          '**Joker** spielt immer beim Team mit Ball.',
          '**Ball erobert** = Extrapunkt.',
          'Wer **3 hinten** liegt, bekommt einen Spieler mehr.',
          '**Fairplay-Punkt** pro Spiel – das Schiri-Team entscheidet.',
        ] },
        { titel: 'Kleine Belohnungen', liste: [
          '**Klassenrekord** an der Tafel – alle zusammen gegen die Uhr.',
          '**Wunsch-Aufwärmspiel:** Die Klasse wählt fürs nächste Mal.',
          '**Drei kleine Preise** in Woche 6: bester Pass, Fairplay, größter Fortschritt.',
          '**Ein echtes Lob** am Schluss: „Ich hab gesehen, wie du …“',
        ] },
        { titel: 'Sicherheit kurz', liste: [
          'Tore gegen Kippen sichern. Nie an Tore oder Körbe hängen.',
          'Schmuck ab, Schuhe zu.',
          'Softbälle bei Wurfspielen und für den Torhut.',
          'Draußen (Laufen, Fahrrad): feste Strecke, Treffpunkt, Handy dabei, Notruf 112.',
        ] },
      ],
    },
    {
      titel: 'Die Sport-Blöcke im Jahr', unter: 'Je 6 Wochen. Reihenfolge nach Wetter und Halle – ein Vorschlag:',
      teile: [
        { titel: 'Vorschlag für ein Schuljahr', liste: [
          '**Sept.–Okt. (draußen):** Laufen · Fußball',
          '**Nov.–Dez.:** Handball · Badminton',
          '**Jan.–Feb.:** Basketball · Tischtennis',
          '**März–April:** Volleyball · Unihockey',
          '**Mai–Juni (draußen):** Fahrrad · Ultimate Frisbee',
          'Im zweiten Jahr dieselben Blöcke, aber „schwerer“ und mit anderen Aufwärmspielen.',
        ] },
        { titel: 'Die Hefte', liste: [
          'Handball · Fußball · Basketball · Volleyball · Badminton',
          'Tischtennis · Laufen · Fahrrad · Unihockey · Ultimate Frisbee',
          'Jedes Heft: Übersicht, Regeln, Material – dann eine Seite pro Stunde.',
          'Skizzen: farbig = Team A, weiß = Team B, gelb = Joker, Dreieck = Hütchen.',
        ] },
        { titel: 'Was gelernt wird (falls eine Note nötig ist)', text: 'Jede Stunde hat einen **Satz der Stunde**. In Woche 6 reicht ein Blick auf vier Dinge: **Technik** (sieht man den Satz der Stunde?), **Spiel** (freilaufen, passen, mitverteidigen?), **Fairplay** und **Einsatz**. Kein Bewerten von Körper oder Gewicht. Wer wenig kann, aber dranbleibt, zeigt Fortschritt.', breit: true },
      ],
    },
  ],
}
