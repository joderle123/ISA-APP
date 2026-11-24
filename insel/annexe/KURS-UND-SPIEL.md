# Kurs und Spiel – REAL TALK Jahr 1 + Annexe-Spiel (Plan und Stand, seit 24.11.2026)

Aufträge 24.11.2026 (Lehrperson, nach Test mit den Schülern):
- „Bevor du den Skills-Kursus in der App integrierst, das erste Jahr komplett umarbeiten – beides gleichzeitig und aufeinander aufbauend.“
- „Arbeite autonom, bis alles fertig ist. Die Missionen zum Skills-Kurs sollen nicht undurchdacht, sondern wirklich deep sein,
  praxisnah, mit Impact – und am Ende ein Resümee, das die Lehrperson sehen kann, damit man darüber reden kann.“
- Rückmeldungen zum Spiel (Schüler): Handy zu schnell · Spiel soll automatisch vorlesen · Autos furchtbar · in jedes Gebäude
  rein, mit Dingen interagieren · Basketball realistischer, schwerer, Pickup-Spiel mit Bewegen, Ben beim Wurf zeigen ·
  Unterricht: wechselnde Lehrpersonen, Fach + Modul spielerisch, zwischenmenschliche Übungen; erste Aufgabe bei der
  Klassenlehrerin ist Unsinn · Story tiefer mit Impact (annexe.cam größer, Mission mitten im Unterricht) · Nebenquests:
  Modullernen intensiv mit Erklärungen, Belohnung Skins/Ausrüstung · Skills total neu: spannend, dunkel statt grell,
  inhaltlich wie der Kurs, als Ergänzung zum Kurs (QR/Code), Missionen auch außerhalb der Schule, Belohnungen ·
  iPads (Eduroam): herunterladen, Updates bekommen, Konto bleibt.

## Grundsätze
- Kurs (Hefte) im **Sweet Spot** (dossiers/README.md): persönlich, zum Nachdenken, leicht ins Gespräch, Spaß, leicht verständlich.
  Pilot #01 von der Lehrperson bestätigt („den Rest finde ich super“).
- **Eine Mission je Kurs-Stunde** (30). Gemeinsame Daten: `insel/src/lycee/kurs-missionen.json` (Code, Titel, Ort, kurz,
  Belohnung, Skill). Das Heft druckt am Ende jeder Stunde ein Ticket mit Code und QR (`ANNEXE:<code>`).
- **Missionen deep:** Einstieg mit Haken (warum jetzt?), 4–7 Schritte an echten Orten, Entscheidungen mit spürbaren Folgen
  (auch später), eine Wendung, kein „richtig/falsch“-Quiz, Skill aus der Kurs-Stunde wird angewendet, nicht abgefragt.
- **Resümee am Ende jeder Mission:** Entscheidungen und Folgen, Skill, was gut lief, ein eigener Satz (freiwillig),
  Gesprächsfrage für die Gruppe. Lehrer-Ansicht (Lehrer-Code) mit allen Resümees auf dem Gerät + Teilen (AirDrop/Mail).
- Belohnungen verdient, keine Zufallskisten, kein Geld. Keine echten Namen; Lehrpersonen nur mit Spielnamen.

## Reihenfolge und Stand
- [x] #01 Ich – Sweet Spot (24.11.)
- [x] #00 Neu hier – Sweet Spot (24.11.)
- [x] Missions-Ticket im Heft (alle Hefte) + Jahresplan-Seite „Das Spiel dazu“
- [x] #02 Gefühle · [x] #03 Druck · [x] #04 Gedanken · [x] #05 Grenzen · [x] #06 Ärger · [x] #07 Netz · [x] #08 Akku
- [x] Spiel: Missions-Engine (Daten, Ablauf an Orten, Entscheidungen, Folgen, Resümee, Lehrer-Ansicht, Teilen, Code eingeben) – Thermometer/Tank, Erinnerungen an frühere Missionen, privater „Brief an mich“
- [ ] QR-Code direkt in der App scannen (bisher: Code eintippen)
- [x] Spiel: 33 Missionen geschrieben (eine je Stunde), Test tests/lycee-missionen.mjs
- [ ] Video-Prüfung (Gemini): Teil 1 eingearbeitet (#00–#02 S2); Teil 2–6 offen; Ersatz für #00 S2, #01 S1, #01 S3
- [ ] Spiel: Skills-Raum dunkel und spannend (stil.css .ly-ebene[data-art="skills"])
- [ ] Spiel: schnelle Punkte – Handy langsamer (ui.js:694, tempo), Vorlesen standardmäßig an (ui.js:145), Ben beim Wurf zeigen (korb3d.js:148), Autos neu (verkehr.js, requisiten.js)
- [ ] Spiel als Web-App (PWA, Service Worker, Home-Bildschirm, Updates) + Spielstand-Code (gibt es: AJ1., ui.js:199)
- [ ] Unterricht neu (wechselnde Lehrpersonen, Modul je Fach, spielerisch, zwischenmenschlich) + Modul-Anzeige beim Start
- [ ] Story tiefer (annexe.cam, Mission aus dem Unterricht heraus)
- [ ] Nebenquests Modullernen mit Belohnungen
- [ ] Alle Gebäude betretbar + Interaktionen
- [ ] Basketball: Wurf-Animation, Pickup-Spiel mit Bewegung, schwerer (eigene Spielidee, kein bekanntes Spiel kopieren)
- [ ] Danach: Deutsch-Hefte (Parcours, Punkte, Korrektor, Checkliste, Merkheft)
