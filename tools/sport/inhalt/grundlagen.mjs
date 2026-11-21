// Grundlagen für alle Sport-Blöcke: wie die Stunden gebaut sind, wie alle dranbleiben, Aufwärmspiele für Jugendliche,
// Match-Formate und Extra-Regeln, Jahresübersicht. Gilt für jede Sportart.
export const GRUND = {
  farbe: '#1e8a5a',
  seiten: [
    {
      titel: 'So sind die Stunden gebaut', unter: 'Für Jugendliche, die schnell abschalten, wenig Lust oder wenig Kondition haben – und trotzdem etwas lernen sollen.',
      teile: [
        { titel: 'Jede Stunde gleich (50 Min.)', liste: [
          '**Aufwärmspiel (7–8 Min.)** – sofort in Bewegung, kein Einlaufen im Kreis.',
          '**Technik im Spiel (10 Min.)** – eine Sache, als kleiner Wettbewerb.',
          '**Spielnah üben (10–12 Min.)** – Überzahl, kleine Felder, viele Ballkontakte.',
          '**Match (15–24 Min.)** – mit einer Extra-Regel, die das Thema der Stunde belohnt.',
          '**Abschluss (4–5 Min.)** – Klassenrekord, Daumen, ein Lob.',
          'Doppelstunde: Zusatzblock auf jeder Seite unten.',
        ] },
        { titel: 'Sieben Regeln, damit alle dranbleiben', liste: [
          '**Erst spielen, dann erklären.** Höchstens 30 Sekunden Ansage, Feinheiten im Spiel.',
          '**Kein Warten in Schlangen.** Höchstens 2 Personen warten – sonst Gruppen teilen.',
          '**Kurze Blöcke:** spätestens nach 10 Min. etwas Neues.',
          '**Zwei Stufen** bei jeder Übung (leichter/schwerer) – jede:r wählt selbst.',
          '**Punkte für Teams, nicht für Einzelne.** Dazu ein Klassenrekord über 6 Wochen.',
          '**Rollen mit Bewegung** statt Bank: Joker, Anspieler, Schiri, Zeitnehmerin.',
          '**Musik** beim Aufwärmen und an Stationen.',
        ] },
        { titel: 'Teams fair einteilen – nie wählen lassen', liste: [
          'Leibchen oder Spielkarten ziehen (Farbe = Team).',
          'Nach Geburtsmonat, Schuhfarbe, Anfangsbuchstaben – dann ausgleichen.',
          'Für Turniere stellt die Lehrperson die Teams vorher zusammen (gemischt, ausgeglichen).',
          'Starke nicht immer zusammen; nach jedem Spiel 1–2 tauschen, wenn es zu ungleich ist.',
        ] },
        { titel: 'Wenn jemand nicht mitmachen will', liste: [
          '**Leise fragen, nicht vor allen.** „Was ist los – Körper oder Kopf?“',
          '**Aktive Rolle anbieten:** Joker, Schiri, Zeitnehmer, Anspielerin – in Bewegung, mit Aufgabe.',
          '**Leichtere Stufe** oder Partner:in selbst wählen lassen.',
          '**„Erst 5 Minuten, dann entscheidest du.“** Die meisten bleiben dann dabei.',
          'Bei Schmerzen, Periode oder Verletzung: keine Begründung vor der Gruppe verlangen – Rolle geben.',
          'Nie bloßstellen, nie Strafrunden. Später kurz unter vier Augen nachfragen.',
        ] },
        { titel: 'Was „spielerisch“ hier heißt', text: 'Keine Kinderspiele, sondern **Spielformen mit Wettbewerb, Tempo und Ziel**: Rekorde, Überzahl, Bonuspunkte, Mini-Turniere. Jede Übung hat einen Punkt, einen Gegner oder eine Uhr. Gelernt wird nebenbei – der „Satz der Stunde“ ist der eine Technik-Tipp, den alle mitnehmen.', breit: true },
      ],
    },
    {
      titel: 'Aufwärmspiele für Jugendliche', unter: 'Für jede Sportart. 5–8 Minuten, Musik an, sofort los. Kein Kinderkram – Tempo, Wettbewerb, Lachen.',
      teile: [{ spiele: [
        { name: 'Schere-Stein-Papier-Fangen', fuer: 'alle', text: 'Paare an der Mittellinie. Alle spielen gleichzeitig SSP; Gewinner fängt, Verlierer rennt zur eigenen Heimlinie (8 m). Gefangen = Punkt. Partner nach 3 Runden wechseln.', tipp: 'Kurze Sprints, viel Lachen, keine Ausdauer nötig.' },
        { name: 'Hütchen-Krieg', fuer: 'alle', text: '40 Hütchen verteilt, die Hälfte umgedreht. Team A dreht auf „Spitze oben“, Team B auf „Spitze unten“. 60 Sekunden, dann zählen. 3 Runden.', tipp: 'Mit Ball: Nur wer prellt/dribbelt, darf drehen.' },
        { name: 'Ball-Fangen', fuer: 'Ballspiele', text: '3 Fänger mit einem Ball. Abschlagen nur mit Ball in der Hand; mit Ball nicht laufen, also passen. Abgeschlagene fangen mit.', tipp: 'Trainiert Passen und Freilaufen nebenbei.' },
        { name: 'Hütchenklau', fuer: 'alle', text: 'Vier Teams in den Ecken, Hütchen in der Mitte. Je eine Person läuft, holt ein Hütchen ins eigene Lager. Ist die Mitte leer, darf man bei anderen klauen. Wer zuerst 5 hat, gewinnt.', tipp: 'Mit Ball: Hütchen nur mit Ball am Fuß/prellend holen.' },
        { name: 'Ninja', fuer: 'ruhig, Halle', text: 'Kreis, alle in „Ninja-Pose“. Reihum eine schnelle Bewegung: Versuch, die Hand des Nachbarn zu treffen; der weicht mit einer Bewegung aus. Getroffene Hand kommt auf den Rücken.', tipp: 'Beliebt bei Jugendlichen, kaum anstrengend – gut als Einstieg für Müde.' },
        { name: 'Kegelball / Burgball', fuer: 'Wurfspiele', text: 'Kegel auf kleinem Kasten im Kreis, eine Wächterin. Außen passen und werfen auf den Kegel. Treffer = neue Wächter:in.', tipp: 'Zwei Kreise, damit niemand wartet.' },
        { name: 'Rondo (Schweinchen)', fuer: 'Ballspiele', text: '4–5 außen, 1–2 in der Mitte. 10 Pässe = Punkt für außen. Wer den Ball verliert, geht in die Mitte.', tipp: 'Funktioniert mit Hand, Fuß, Schläger nicht – sonst mit allem.' },
        { name: 'Zombie-Ball', fuer: 'Softball', text: 'Alle gegen alle mit 3 Softbällen, Treffer nur unter Schulterhöhe. Getroffen = setzen; man darf zurück, wenn man einen rollenden Ball fängt oder der Treffer abgeworfen wird.', tipp: 'Niemand ist lange draußen – darum kein Frust.' },
        { name: 'Linienlauf mit Ansage', fuer: 'alle', text: 'Zwei Linien, Paare Rücken an Rücken in der Mitte („Kopf“ / „Zahl“). Lehrperson ruft eine Seite: Die läuft weg, die andere fängt bis zur Linie. Mit Rechenaufgabe: gerade Zahl = Kopf fängt.', tipp: 'Kurz, explosiv, Kopf ist mit dabei.' },
        { name: 'Zahlen-Pass', fuer: 'Ballspiele', text: 'Gruppen zu 5, alle nummeriert. In Bewegung passen in fester Reihenfolge 1 → 5. Dann 2 Bälle. Gruppen-Rekord in 60 Sek.', tipp: 'Gleiche Form für Hand, Fuß, Frisbee, Unihockey.' },
      ] }],
    },
    {
      titel: 'Match-Formate und Extra-Regeln', unter: 'Das Match ist für viele der Grund, mitzumachen. Kleine Teams, kurze Spiele, eine Extra-Regel passend zum Thema.',
      teile: [
        { titel: 'Formate', liste: [
          '**Zwei Felder, 4 gegen 4** statt 8 gegen 8 – doppelt so viele Ballkontakte.',
          '**Rotation:** 3 Teams, Gewinner bleibt (höchstens 2-mal), Verlierer raus, wartendes Team rein. Spiel: 4 Min. oder 2 Tore.',
          '**King of the Court** (Volleyball, Badminton, Tischtennis): Gewinner rückt ein Feld hoch, Verlierer runter.',
          '**Mini-Turnier** in Woche 6: 3 Teams, jedes gegen jedes, freies Team pfeift und führt Tabelle.',
          '**Lehrperson spielt mit** – beim schwächeren Team, nur als Passgeber.',
        ] },
        { titel: 'Extra-Regeln (eine pro Match)', liste: [
          'Tor/Punkt zählt doppelt, wenn **alle im Team** vorher den Ball hatten.',
          'Ein Tor von jemandem, der heute **noch nicht getroffen** hat, zählt doppelt.',
          '**Joker** spielt immer für das Team mit Ball.',
          '**Ballgewinn** in der Abwehr = Bonuspunkt.',
          'Team, das **3 hinten** liegt, bekommt einen Spieler mehr.',
          '**Fairplay-Punkt** pro Spiel – das Schiri-Team entscheidet.',
        ] },
        { titel: 'Kleine Belohnungen, die wirken', liste: [
          '**Klassenrekord** an der Tafel (Pässe, Ballwechsel, Runden) – alle gegen die Zeit, nicht gegeneinander.',
          '**Wunsch-Aufwärmspiel:** Gewinner-Team oder die ganze Klasse wählt fürs nächste Mal.',
          '**Drei Mini-Preise** in Woche 6: bester Pass, Fairplay, größter Fortschritt.',
          '**Ein konkretes Lob** am Schluss: „Ich hab gesehen, wie du …“',
        ] },
        { titel: 'Sicherheit kurz', liste: [
          'Tore gegen Kippen sichern, nie an Tore oder Körbe hängen.',
          'Schmuck ab, Brillen ab oder Sportbrille, Schuhe zu.',
          'Softbälle bei Wurfspielen und für den Torhut.',
          'Draußen (Laufen, Fahrrad): feste Strecke, Treffpunkt, Handy der Lehrperson geladen, Notruf 112.',
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
          'Im zweiten Jahr dieselben Blöcke mit der Stufe „schwerer“ und anderen Aufwärmspielen.',
        ] },
        { titel: 'Die Hefte', liste: [
          'Handball · Fußball · Basketball · Volleyball · Badminton',
          'Tischtennis · Laufen · Fahrrad · Unihockey · Ultimate Frisbee',
          'Jedes Heft: Übersicht mit 6-Wochen-Plan, Regeln, Material – dann eine Seite pro Stunde.',
          'Skizzen: farbig = Team A, weiß = Team B, gelb = Joker, Dreieck = Hütchen.',
        ] },
        { titel: 'Was gelernt wird (für die Bewertung, falls nötig)', text: 'Jede Stunde hat einen **Satz der Stunde** (ein Technik-Merkmal). In Woche 6 reicht eine einfache Beobachtung: **Technik** (Satz der Stunde sichtbar?), **Spiel** (freilaufen, passen, mitverteidigen?), **Fairplay** und **Einsatz im eigenen Rahmen**. Kein Bewerten von Körper oder Gewicht; wer wenig kann, aber dranbleibt, zeigt Fortschritt.', breit: true },
      ],
    },
  ],
}
