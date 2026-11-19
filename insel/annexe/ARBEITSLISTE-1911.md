# Arbeitsliste nach dem Auftrag vom 19.11. (Handschläge, 7ème perfekt, AAA-Funktionen, Jugendwelt)

Quelle: kritische Durchsicht aller Sequenzen (Kapitel 1–10) und Recherche „Was macht ein AAA-Spiel aus“ (140 Punkte).
Status: [ ] offen · [x] erledigt · [~] bewusst nicht (Grund)

## A. Schwächste Sequenzen – Umbau (Kapitel = story/kapitelN.js)
- [x] 8.4/8.5 „Ehrliche Falle“ (Ben als Köder, Erwachsener stimmt zu) → „Lucas Zunge“: Account kommentiert selbst
      „zu wenig salz“, Beweis-Mappe (Fundstücke rein, Unbeteiligte schwärzen, Gerüchte raus), dann zu Herrn Kuedes.
- [x] 3.4 „Nach der Pause“ (Mila abwesend, aber im Standbild) → „Der leere Platz“: Gesichter Jo/Dario/Noah lesen,
      Nachricht an Mila aus Bausteinen („Keine Antwort nötig.“), Mila reagiert in Kap. 4; wuerfelMit bekommt Folge.
- [x] 4.6 Notfallkarte zeigen → „Ernstfall“: Raumwechsel-Durchsage, Mila erstarrt, Karten der eigenen Notfallkarte;
      nur Körper-/Sinnes-Skills wirken bei Rot (kofferNurKopf); Karte mit 116 111 im Spind.
- [x] 9.2 Akku-Tag (moralisch) → „Darios Abend“: Zeitblöcke 16–23 Uhr mit Dario planen, echte Zielkonflikte, Akku am Morgen.
- [x] 7.6 Ecken-Lauf (7. Sortierspiel) → „Zurückspulen“: Standbilder dieser Woche, eigene Rolle aus Flags, Noah vorher fragen.
- [x] 6.2 Ich-Botschaft Ladekabel → „Wie hat er das gemeint?“: Jos „ok.“ als Text/Sprachnachricht; Satz kommt in n6_jo zurück.
- [x] 8.2 „Echt oder KI?“ (widersprüchlich) → „Quellen-Detektiv“: Details antippen, am Ende teilen / nicht teilen / nachfragen.
- [x] 3.6 Synchronstudio ohne Ton → Vorlese-Stimme mit Tempo/Tonhöhe; eigener Take an Jo, Reaktion je Ton.
- [x] 7.2 Tier-Sortieren → „Tier-Wechsel“: eigene Antworten aus Kap. 3 als Tier, Szene als anderes Tier neu spielen.
- [x] 9.5 Gesund-Plan + Bodyscan → Wenn-dann-Karte im Spind, in der Welt geprüft (planPause); Bodyscan geführt, „Kurz raus“.
- [x] 10.1 Zurück im Chat → „Chat-Regeln der 7P2“: Abstimmung, eigene Regel aus dem Klassenvertrag (regel*-Flags).
- [x] 5.2 n5_saal → „Wohin setzen?“: Körpersprache lesen, tuerAngst/tuerKlar/tuerWut entscheiden, wer Platz macht.
- [x] 2.4 Talenttag → mit Mut-Balken (altes Kap. 6): wie viel zeige ich; Noah traut sich nur, wenn ermutigt ohne Druck.
- [x] 10.5 Finale → eigener Satz zu Darios Entschuldigung (annehmen / Zeit brauchen / heute nichts), alle gleich gültig;
      Foto-Club leiten Mila + Lehrkraft, Dario hilft nur.
- [x] 1.8 Tischwahl → drei Tische (Noah+Ayla, Mila, Lina allein) + allein mit Handy; verändert die Kunst-Stunde.

## B. Logikfehler
- [x] 1.5 „letzte Woche einen Zettel geschrieben“ am ersten Tag; Noah (neu) hat auch einen Zettel.
- [x] Zeitlinie: Monat/Jahreszeit auf die Zeitkarte (Wochen überspringen), Kapitelüberschriften „Dein erster Tag“ usw.
- [x] kapitel8.js:43 „Freitag rote Augen“ – Video kam Samstag; kapitel8.js:102 Lina macht Tränen öffentlich → streichen.
- [x] kapitel9.js:36 Passwort bei Luca vs. kapitel10.js:200 Dario löscht live → Satz „Erwachsene haben es zurückgeholt“.
- [x] kapitel4.js:60 „Noah im nächsten Bus“ vs. Noah an derselben Haltestelle.
- [x] kapitel2.js:216 „heute in der Kantine“ vs. Skate-Ecke.
- [x] kapitel3.js:292 Mila bei Kuedes, sitzt aber im Saal.
- [x] kapitel7.js:211 „Jo hat die Gruppe verlassen“ immer → an Bedingung knüpfen; „vier Tierbilder“ → fünf.
- [x] Kapitel 1: Wer filmt in der Kantine – Luca oder Dario? Vereinheitlichen.
- [x] kapitel5.js:41 Luca teilt Fake unter eigenem Namen → neues anonymes Konto.
- [x] Herr Kuedes schreibt abends Nachrichten (kapitel5.js:60, kapitel9.js:214) → Zettel/am nächsten Tag.
- [x] Fäden zeitlos (faeden.js:27, :284), Luca-Grüße nach Rauswurf, Profile in freunde.js (Noah-Hobby, Ayla-Band, Luca „hilfsbereit“).
- [x] „Einem Erwachsenen zeigen“ wie Screenshot gewertet (k1:240, k2:226) → eigene Folge.
- [x] „Erst bremsen“-Abzeichen und Kurve kennen nur videoGebremst → auch videoKlartext.
- [x] spiel.js:635 zuSpaet prüft nie gesetzte Flags gewartet/weberGewartet.
- [x] Umfrage gelöscht – von wem? Team-Chaos-Weiterleitung auflösen.
- [x] Live-Chat: E beendet die Szene (situation.js:146–147) → E zeigt nur alles an.
- [x] Druck-Runde: Ja wird automatisch zurückgenommen (kapitel7.js:206) → Spielfigur entscheidet selbst.
- [x] Stärken-Schieflage: humor 50×, neinsagen 2×, abstand 1× → neu gewichten.
- [x] Freundschaft durch Grammatik (spiel.js:1598) → Lernfragen zu Mme Laurent verlegen.
- [x] Feed-Spiel: Lesezeit zählt als Interesse (situation.js:1500) → ändern.
- [x] Stempel „ohne Lächeln“ (kapitel6.js:215) → „Ein Stopp gilt immer. Klar und ruhig kommt es besser an.“
- [x] „statistisch“, „Algorithmus“ noch im Text.
- [x] ~150 gesetzte, nie gelesene Flags: wichtigste mit Folgen versehen (Klassenvertrag, wuerfelMit, Spuren, campFeind, tuer*, plan*).
- [x] kapitel8.js:151 weitere Helpline-Nummer prüfen (nur 116 111 / 112 / BEE SECURE erlaubt).

## C. Jugendwelt heute (erst nach A/B) – je Kapitel ein Online-Moment  [x] eingebaut 19.11. (Abend, Teil 2)
2 Bild-Post und Selbstwert (Ayla will Foto nach 6 Likes löschen) · 3 anonyme Fragen-Sticker · 4 „Gesehen 21:04“ ·
5 Kommentar-Lawine (3 Konten = 30 Kommentare) · 6 verschwindende Nachrichten / „antworte JETZT“ ·
7 Spionin in der fremden Gruppe · 8 Angst vor KI-Fakes (Noah, Profil-Einstellungen im Informatikraum) ·
9 Serien-Druck 214 Tage, KI-Chat nachts → Mensch hilft · 10 Zustimmung beim Posten des Klassenfotos.

## D. AAA-Funktionen (Auswahl „hoch“, Rest siehe Recherche) – je 2–3 Runden
Erster Start mit Einstellungen + Barrierefreiheits-Vorlagen · Inhaltshinweise je Kapitel · Hilfe-Seite (116 111) im Pausenmenü ·
Infoseite Lehrkraft (Lernziele, Dauer, Datenschutz) · Credits/Lizenzen · Tipps-Bibliothek · Hängen-Erkennung mit Hinweisen ·
Untertitel-Optionen (Größe, Hintergrund, Sprecher) · Dialog-Tempo · UI-Skalierung · Bewegung reduzieren (DoF/Ruck/Kamera) ·
Blitz-Schutz · Halten/Umschalten · Minispiel-Hilfen (Tempo, „Weiter zur Geschichte“ nach 2 Fehlversuchen) ·
Ziel-Taste (Kamera dreht zum Ziel) · „Was soll ich tun?“ · Pause überall · Grafik-Vorlagen + Akku sparen ·
Lautstärke je Kanal · Autosave-Anzeige · Speichern bei Wegklicken · Spielstand exportieren/importieren ·
Rückblick „Was bisher geschah“ nach >24 h · Kapitelwahl/Wiederholen · Mitteilungs-Warteschlange · Pausenmenü-Standard ·
Ducking bei Dialog · Ambiente-Zonen · Hall je Raum · UI-Klänge · Kapitel-Titelkarte · „X merkt sich das“ ·
Kapitel-Zusammenfassung mit Reflexionsfrage · Gesprächsverlauf · Glossar („Was bedeutet das?“) · Ich-stecke-fest-Knopf ·
freundliche Fehlermeldung · WebGL-Kontextverlust · Pause bei Fokusverlust · Bildschirm wach halten · Gesten blockieren.

## Stand 19.11. (Abend, Teil 2)
- A komplett: 8.2 Quellen-Detektiv (drei Posts: Konto von gestern, Krone-Taube, 8-Sekunden-Video), 3.4 kleine Geste für Mila
  (Würfel / Zettel / Ruhe / laut) mit Antwort in Kap. 4, 3.6 Synchronstudio mit echter Vorlese-Stimme (Tempo, Tonhöhe, Pausen),
  7.2 Tier-Wechsel (Jo-Streit aus Kap. 3 als anderes Tier), 9.5 Wenn-dann-Plan + Hindernis, Nachfrage in Kap. 10, Bodyscan
  danach unter „Kurz raus“, 5.2 Wohin setzen (Körpersprache, Tür-Stimmung färbt den Blick), 2.4 Noah traut sich nur ohne Druck,
  1.8 dritter Tisch (Lina allein) mit Folge im Kunst-Interview.
- B: „Einem Erwachsenen zeigen“ mit eigener Folge (K1, K2); Luca-Fäden ruhen in Kap. 7–9; Noah-Faden zeitneutral; Luca-Profil.
- C: K2 Likes/Selbstwert · K3 anonyme Fragen · K4 „Gesehen 21:04“ · K5 30 Kommentare = 3 Konten · K6 verschwindende
  Nachricht „antworte JETZT“ · K7 Screenshots aus der fremden Gruppe · K8 KI-Angst + Profil-Einstellungen · K9 Serie 214 Tage
  + KI-Chat um 3 Uhr → Mensch · K10 Zustimmung vor dem Posten des Klassenfotos.
