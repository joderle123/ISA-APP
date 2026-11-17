// Lycée-Simulator – Kapitel 1 „Rentrée“: der erste Tag am Lycée des Collines.
// Regeln (DESIGN.md): kurze Sätze (höchstens rund 12 Wörter je Blase), keine Moral-Stimme, kein „falsch“ – jede Wahl hat
// eine echte, ruhige Folge bei den Menschen. Niemand muss Persönliches erzählen. Erfundene Namen. Nichts wird bewertet;
// am Ende stehen Beziehungen (Herzen) und Stärken, die man gezeigt hat.
//
// Aufbau: SCHRITTE laufen nacheinander. Ein Schritt hat
//   uhr      – Tageszeit (Stunden), titel, ziel (Auftrag in einem Satz)
//   marker   – Person-Kennung oder Ort-Kennung (welt.orte) für die Markierung
//   leute    – wer wo steht: { id: [x, z, yaw, haltung?] } (haltung: 'sitzt' | 'winkt' | 'redet')
//   start    – optional: { teleport: ort, gespraech }
//   fertig   – wann der Schritt endet: { reden: id } | { ort: id, r } | { bingo: n } | { wahl: [...] } | { spiel: 'freiwurf' }
// GESPRAECHE: Liste von Zeilen. ['wer', 'Text'] · { wahl: [{ t, staerke?, herz?: {id: n}, merke?, dann: [...] }] } · { tu: 'name' }
// „du“ = die Spielfigur. Platzhalter {name} = Name der Spielfigur.

export const STAERKEN = {
  kontakt: { name: 'Kontakt aufnehmen', text: 'Du hast jemanden angesprochen.' },
  klar: { name: 'Freundlich und klar', text: 'Du hast gesagt, was du brauchst – ohne Druck.' },
  warten: { name: 'Den Moment abwarten', text: 'Du hast gewartet, bis der andere Zeit hatte.' },
  zuhoeren: { name: 'Zuhören', text: 'Du hast nachgefragt und zugehört.' },
  ruhig: { name: 'Ruhig bleiben', text: 'Es war ärgerlich. Du bist ruhig geblieben.' },
  einbeziehen: { name: 'Andere einbeziehen', text: 'Du hast an jemanden gedacht, der still war.' },
  hilfe: { name: 'Um Hilfe bitten', text: 'Du hast gefragt, statt zu raten.' },
  fair: { name: 'Fair aufteilen', text: 'Du hast vorgeschlagen, die Arbeit aufzuteilen.' },
};

export const LEUTE = {
  noah: { hoehe: 1.66, frisur: 'locken', name: 'Noah', modell: 'menschen', stil: 'Casual', haut: '#c99a72', haar: '#2b1d14', oben: '#3f78b8', unten: '#3a3f4b', schuhe: '#f2f2f2', farbe: '#3f78b8' },
  weber: { hoehe: 1.66, reich: 3.4, name: 'Mme Weber', modell: 'frauen', stil: 'Formal', haut: '#f0c9a8', haar: '#8a5a3a', oben: '#6b4e8a', unten: '#2f2f3a', schuhe: '#2b2b2b', farbe: '#6b4e8a', erwachsen: true },
  hoffmann: { hoehe: 1.82, name: 'M. Hoffmann', modell: 'menschen', stil: 'Suit', haut: '#e8bf9a', haar: '#6d6d6d', oben: '#4a5568', unten: '#2d3748', schuhe: '#3a2a1c', farbe: '#4a5568', erwachsen: true },
  kenan: { hoehe: 1.8, kopf: 'muetze', kopfFarbe: '#3a3f4b', name: 'Kenan', modell: 'menschen', stil: 'Punk', haut: '#a8754f', haar: '#1b1410', oben: '#2b2b33', unten: '#4a4f5c', schuhe: '#d9523c', farbe: '#2b2b33' },
  dario: { hoehe: 1.77, frisur: 'stachel', name: 'Dario', modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#4a3020', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff', farbe: '#d9693f' },
  mila: { hoehe: 1.61, name: 'Mila', modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#f2f2f2', farbe: '#2fb8a8' },
  lina: { hoehe: 1.58, name: 'Lina', modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#c9a15a', oben: '#9b7bc8', unten: '#4a4f5c', schuhe: '#6b4e3a', farbe: '#9b7bc8' },
  jo: { hoehe: 1.71, kopf: 'cap', kopfFarbe: '#c0392b', name: 'Jo', modell: 'menschen', stil: 'Adventurer', haut: '#d8a982', haar: '#3a2a1c', oben: '#c0392b', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#c0392b' },
  ayla: { hoehe: 1.64, name: 'Ayla', modell: 'frauen', stil: 'Punk', haut: '#c68e64', haar: '#2b1d14', oben: '#e85d75', unten: '#2b2b33', schuhe: '#2b2b2b', farbe: '#e85d75' },
  ben: { hoehe: 1.76, name: 'Ben', modell: 'menschen', stil: 'Beach', haut: '#f1c7a2', haar: '#d9b36a', oben: '#ffd166', unten: '#4f88c8', schuhe: '#ffffff', farbe: '#d9a21b' },
  chiara: { hoehe: 1.63, name: 'Chiara', modell: 'frauen', stil: 'Suit', haut: '#eec09a', haar: '#5a3a24', oben: '#3fa66b', unten: '#2f3a4a', schuhe: '#2b2b2b', farbe: '#3fa66b' },
  yusuf: { hoehe: 1.69, name: 'Yusuf', modell: 'menschen', stil: 'Casual', haut: '#9b6a45', haar: '#1b1410', oben: '#5fa0d0', unten: '#2d3748', schuhe: '#f2f2f2', farbe: '#5fa0d0' },
  kremer: { hoehe: 1.65, reich: 3.4, name: 'Frau Kremer', modell: 'frauen', stil: 'Worker', haut: '#f0c9a8', haar: '#a0522d', oben: '#ffffff', unten: '#4a4f5c', schuhe: '#ffffff', farbe: '#2f4f45', erwachsen: true },
  luca: { hoehe: 1.74, kopf: 'cap', kopfFarbe: '#2b2b33', name: 'Luca', modell: 'menschen', stil: 'Farmer', haut: '#e8bf9a', haar: '#2b1d14', oben: '#7b8794', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#7b8794' },
  fahrer: { hoehe: 1.78, kopf: 'cap', kopfFarbe: '#2fb8a8', name: 'Busfahrer', modell: 'menschen', stil: 'Worker', haut: '#d8a982', haar: '#5a5a5a', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#2b2b2b', farbe: '#2fb8a8', erwachsen: true },
};

// Klassen-Bingo: wer passt auf welches Feld (die Antworten sagen es)
export const BINGO = [
  { id: 'tier', text: 'hat ein Haustier' },
  { id: 'sport', text: 'macht Sport im Verein' },
  { id: 'kochen', text: 'kocht gern' },
  { id: 'musik', text: 'macht Musik' },
];

// Ort-Geheimnisse: kleine Entdeckungen für Neugierige (Journal → „Entdeckt“)
export const GEHEIMNISSE = [
  { id: 'pinnwand', x: -7.2, z: -9, r: 1.4, titel: 'Die Pinnwand', text: 'AG-Zettel: Theater, Robotik, Schulgarten. Mittwochs ab 14 Uhr.' },
  { id: 'vitrine', x: 6.6, z: -9, r: 1.4, titel: 'Die Pokalvitrine', text: 'Zwei Pokale vom Schulfußball. Und ein Foto vom Abschlussball.' },
  { id: 'cdi', x: -6.2, z: -21.6, r: 1.6, titel: 'Die Leseecke', text: 'Ein Sofa im CDI. Hier ist es in der Pause leise.' },
  { id: 'sepas', x: -12, z: -10.5, r: 1.6, titel: 'Der SePAS', text: 'Hier kann man reden, wenn etwas schwer ist. Ohne Termin.' },
  { id: 'atelier', x: -48, z: -12, r: 2.5, titel: 'Die Werkstatt', text: 'Hobelbänke und Werkzeug. Hier beginnt später die Ausbildung.' },
  { id: 'turnhalle', x: 46, z: -10, r: 3, titel: 'Die Turnhalle', text: 'Dienstags Sport. Turnschuhe nicht vergessen.' },
  { id: 'brunnen', x: -8, z: 18, r: 2.4, titel: 'Der Brunnen', text: 'Treffpunkt auf dem Hof. Hier warten viele morgens.' },
  { id: 'fahrrad', x: -38, z: 24, r: 2.4, titel: 'Die Fahrradständer', text: 'Wer mit dem Rad kommt, schließt hier ab.' },
  { id: 'skate', x: -36, z: 12, r: 3, titel: 'Die Skate-Ecke', text: 'Rampe, Rail, Half-Pipe. Wer hinfällt, wird gefilmt.' },
  { id: 'raucher', x: 60.4, z: -17, r: 3, titel: 'Hinter der Turnhalle', text: 'Kippen am Boden. Die Aufsicht kommt selten hierher.' },
  { id: 'baecker', x: 2, z: 54, r: 3, titel: 'Der Bäcker gegenüber', text: 'Kirsch-Teilchen bis 10:15. Danach ist die Schlange zu lang.' },
  { id: 'automat', x: -6.4, z: -3.1, r: 1.3, titel: 'Der Snackautomat', text: 'Frisst 50-Cent-Stücke. Alle wissen es. Alle versuchen es trotzdem.' },
];

// Wer im Saal 1.04 sitzt (Pulte: x = −24.8 + r·2.1 + 0.55, z = −27.2 + c·3.4 ± 0.62)
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1) };
const KLASSE_STEHT = { ayla: [-24, -27, 0.4], ben: [-21.5, -22.5, -2.6], chiara: [-19.5, -25.5, 1.8], yusuf: [-23.6, -20.2, 2.4], jo: [-18.6, -21, -1.5], lina: [-18.2, -27.8, -0.6] };

export const SCHRITTE = [
  { id: 'ankunft', uhr: 7.55, titel: 'Der erste Morgen', ziel: 'Sprich mit Noah an der Bushaltestelle.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'intro' },
    leute: { noah: [-20.5, 42.3, -1.9], fahrer: [-11.2, 44.6, -Math.PI / 2], kenan: [-3, 30, 0.5, 'redet'], dario: [-2, 31.2, -2.6, 'redet'], mila: [-26, 17.5, Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'noah1' } },
  { id: 'sekretariat', uhr: 7.7, titel: 'Wo muss ich hin?', ziel: 'Geh ins Sekretariat und hol deinen Stundenplan.', marker: 'weber',
    leute: { noah: [-6, -5, 2.4], weber: [-21, -9.4, 0, 'telefon'], kenan: [-12, -15.5, 1.2, 'redet'], dario: [-10.9, -16.3, -2, 'redet'] },
    fertig: { reden: 'weber', gespraech: 'weber' } },
  { id: 'gang', uhr: 7.85, titel: 'Der Gang', ziel: 'Geh zu Saal 1.04.', marker: 'saal104Tuer',
    leute: { weber: [-21, -9.4, 0], kenan: [-21.6, -16.2, 0.4, 'redet'], dario: [-20.4, -16.6, -2.4, 'redet'], noah: [-14, -15.6, -1.5] },
    fertig: { ort: 'saal104Tuer', r: 3.0, gespraech: 'gang' } },
  { id: 'klasse', uhr: 7.95, titel: 'Saal 1.04', ziel: 'Sag M. Hoffmann Hallo.', marker: 'hoffmann',
    leute: { hoffmann: [-27, -24, Math.PI / 2], noah: pult(0, 1, 1), ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'hoffmann1' } },
  { id: 'bingo', uhr: 8.3, titel: 'Klassen-Bingo', ziel: 'Finde für jedes Feld jemanden. Frag herum!', marker: 'bingo',
    leute: { hoffmann: [-27, -24, Math.PI / 2], noah: [-22.2, -23.3, 2.2], ...KLASSE_STEHT },
    fertig: { bingo: 4, gespraech: 'bingoFertig' } },
  { id: 'pause', uhr: 10.0, titel: 'Große Pause', ziel: 'Pause! Geh zu Mila auf der Bank – oder zum Korbballfeld.', marker: ['mila', 'ben'],
    start: { teleport: 'eingangHof' },
    leute: { mila: [-20, 11.6, Math.PI, 'sitzt'], ben: [27.5, 21, 0.8], yusuf: [30.8, 22.2, -0.9], noah: [2, 14, 0.6, 'redet'], ayla: [3, 15.3, -2.5, 'redet'], kenan: [-34, 9, 1], dario: [-32.6, 10.2, -2] },
    fertig: { eins: ['mila', 'freiwurf'] } },
  { id: 'kantine', uhr: 12.2, titel: 'Mittag in der Kantine', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [22.6, -10.6, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, -Math.PI / 2, 'sitzt'], yusuf: [16.65, -10.1, -Math.PI / 2, 'sitzt'] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'kantine' } },
  { id: 'tisch', uhr: 12.3, titel: 'Wohin setzen?', ziel: 'Such dir einen Platz.', marker: ['noah', 'mila'],
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [24.6, -7.4, 2.6], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, -Math.PI / 2, 'sitzt'], yusuf: [16.65, -10.1, -Math.PI / 2, 'sitzt'] },
    fertig: { eins: ['noah', 'mila'] } },
  { id: 'gruppe', uhr: 13.6, titel: 'Gruppenarbeit', ziel: 'Setz dich zu Jo und Lina.', marker: 'jo',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], jo: pult(3, 1, -1), lina: pult(3, 1, 1), noah: pult(1, 0, -1), ayla: pult(1, 0, 1), ben: pult(0, 2, 1), chiara: pult(0, 2, -1), yusuf: pult(2, 2, 1) },
    fertig: { reden: 'jo', gespraech: 'gruppe' } },
  { id: 'heimweg', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ben: [8, 36, 2.6], yusuf: [9.2, 35.4, -2.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'heimweg' } },
];

// ---------- Gespräche ----------
export const GESPRAECHE = {
  intro: [
    ['erzaehler', 'Montag, 7:33 Uhr. Dein erster Tag am Lycée des Collines.'],
    ['erzaehler', 'Neue Schule. Neue Leute. Niemand kennt dich hier.'],
    ['erzaehler', 'An der Haltestelle wartet ein Junge. Er sieht genauso neu aus.'],
  ],
  noah1: [
    ['noah', 'Oh … hi. Bist du auch neu hier?'],
    { wahl: [
      { t: 'Ja. Ich bin {name}. Und du?', staerke: 'kontakt', herz: { noah: 2 }, dann: [
        ['noah', 'Noah. Ich komm in die 7P2.'],
        ['du', 'Ich auch! Dann sind wir in einer Klasse.'],
        ['noah', 'Echt? Okay. Gut.'] ] },
      { t: 'Ja. Weißt du, wo man sich melden muss?', staerke: 'hilfe', herz: { noah: 1 }, dann: [
        ['noah', 'Im Sekretariat, glaube ich. Links in der Halle.'],
        ['noah', 'Ich bin übrigens Noah. 7P2.'],
        ['du', '{name}. Auch 7P2.'] ] },
      { t: '(Kopfhörer drin lassen. Nicken.)', herz: { noah: 0 }, dann: [
        ['noah', 'Okay. Ich bin Noah.'],
        ['noah', 'Man muss wohl erst ins Sekretariat. Links in der Halle.'] ] },
    ] },
    ['noah', 'Ich muss noch kurz aufs Klo. Bis gleich!'],
    { tu: 'stundenplanTipp' },
  ],
  weber: [
    { tu: 'weberTelefon' },
    ['weber', '„… ja, genau. Nein, die Liste kommt heute …“'],
    ['erzaehler', 'Mme Weber telefoniert noch.'],
    { wahl: [
      { t: '(Warten. Handy raus.)', staerke: 'warten', herz: { weber: 1 }, dann: [
        ['erzaehler', 'Nach einer Minute legt sie auf.'],
        ['weber', '(legt auf) So. Was brauchst du?'] ] },
      { t: 'Entschuldigung … ich bin neu.', herz: { weber: 1 }, dann: [
        ['weber', 'Einen Moment bitte, ich telefoniere.'],
        ['erzaehler', 'Sie legt kurz danach auf.'],
        ['weber', 'So. Jetzt hab ich Zeit für dich.'] ] },
      { t: 'Hallo? Ich brauch meinen Stundenplan!', herz: { weber: 0 }, dann: [
        ['weber', '(Sie hebt die Hand.) Gleich. Ich telefoniere.'],
        ['erzaehler', 'Es dauert noch zwei Minuten. Dann legt sie auf.'],
        ['weber', 'So. Was brauchst du?'] ] },
    ] },
    { wahl: [
      { t: 'Ich bin {name}, neu in der 7P2.', staerke: 'klar', herz: { weber: 1 }, dann: [] },
      { t: 'Ich weiß nicht, wo ich hin muss.', staerke: 'hilfe', herz: { weber: 1 }, dann: [['weber', 'Kein Problem. Wie heißt du?'], ['du', '{name}. 7P2.']] },
    ] },
    ['weber', 'Hier, dein Stundenplan. Saal 1.04, im Gang links.'],
    ['weber', 'Bis 16 Uhr bin ich da. Nicht 16:05.'],
    { tu: 'stundenplan' },
  ],
  gang: [
    ['erzaehler', 'Vor Saal 1.04 stehen zwei Ältere. Mitten vor der Tür.'],
    ['kenan', '… und dann hat er einfach aufgelegt, Mann.'],
    { wahl: [
      { t: '„Pardon, darf ich mal durch?“', staerke: 'klar', herz: { kenan: 1, dario: 1 }, dann: [
        ['dario', 'Oh, sorry. Klar.'],
        ['kenan', 'Neu hier? Viel Glück bei Hoffmann. Der ist okay.'] ] },
      { t: '(Einfach durchdrängeln.)', herz: { kenan: -1, dario: -1 }, merke: 'gedraengelt', dann: [
        ['kenan', 'Ey! Geht’s noch?'],
        ['dario', 'Lass. Neu hier.'],
        ['erzaehler', 'Sie schauen dir nach. Ein komisches Gefühl.'] ] },
      { t: '(Warten, bis sie weggehen.)', merke: 'gewartet', dann: [
        ['erzaehler', 'Sie reden weiter. Dann klingelt es.'],
        ['dario', 'Oh – wir müssen. Komm, Kenan.'],
        ['erzaehler', 'Jetzt ist die Tür frei. Aber du bist spät dran.'] ] },
    ] },
  ],
  hoffmann1: [
    ['hoffmann', 'Guten Morgen! Du musst {name} sein.'],
    { tu: 'zuSpaet' },
    ['hoffmann', 'Ich bin M. Hoffmann, euer Klassenlehrer.'],
    ['hoffmann', 'Bevor wir starten: ein Spiel zum Kennenlernen.'],
    ['hoffmann', 'Klassen-Bingo! Auf deiner Karte stehen vier Felder.'],
    ['hoffmann', 'Finde für jedes Feld jemanden. Einfach fragen.'],
    { wahl: [
      { t: 'Okay, verstanden.', dann: [] },
      { t: '„Muss ich?“', dann: [['hoffmann', 'Ja. Aber nur zehn Minuten.'], ['jo', '(stöhnt laut)']] },
      { t: 'Muss ich dann was über mich erzählen?', staerke: 'hilfe', herz: { hoffmann: 1 }, dann: [
        ['hoffmann', 'Nur, wenn du willst. Du darfst auch nur fragen.'] ] },
    ] },
    { tu: 'bingoStart' },
  ],
  bingoFertig: [
    ['hoffmann', 'Bingo! Sehr gut. Jetzt kennst du schon ein paar.'],
    ['hoffmann', 'So, setzt euch. Gleich ist große Pause.'],
  ],
  // Bingo-Gespräche: je Person. Die Wahl ist, WIE man fragt. Antwort sagt, auf welches Feld sie passt.
  bingo_ayla: { felder: ['musik'], zeilen: [['ayla', 'Ich spiel Gitarre. Seit drei Jahren.'], ['ayla', 'Und du so?']] },
  bingo_ben: { felder: ['sport', 'tier'], zeilen: [['ben', 'Basketball im Verein! Und wir haben einen Hund.'], ['ben', 'Er heißt Keks.']] },
  bingo_chiara: { felder: ['kochen'], zeilen: [['chiara', 'Ich koch total gern. Am liebsten Pasta.'], ['chiara', 'Meine Oma hat’s mir gezeigt.']] },
  bingo_yusuf: { felder: ['sport'], zeilen: [['yusuf', 'Ich mach Judo. Zweimal die Woche.']] },
  bingo_jo: { felder: ['tier'], zeilen: [['jo', 'Zwei Katzen. Die sind chaotisch.'], ['jo', 'Was steht da noch? Zeig mal.']] },
  bingo_lina: { felder: ['musik', 'kochen'], zeilen: [['lina', '(leise) Ich … spiel Klavier.'], ['lina', 'Und ich back manchmal. Kuchen.']] },
  bingo_noah: { felder: [], zeilen: [['noah', 'Ich hab leider nichts davon. Frag die anderen!'], ['noah', 'Lina da hinten ist noch ganz allein.']] },
  mila: [
    ['erzaehler', 'Mila sitzt allein auf der Bank. Sie schaut aufs Handy.'],
    { wahl: [
      { t: '„Ist hier noch frei?“', staerke: 'kontakt', herz: { mila: 2 }, dann: [
        ['mila', 'Äh … ja. Klar.'] ] },
      { t: '(Einfach hinsetzen.)', herz: { mila: 0 }, dann: [
        ['mila', '…'], ['erzaehler', 'Sie rutscht ein Stück weg.'] ] },
    ] },
    ['mila', 'Du bist auch in der 7P2, oder?'],
    { wahl: [
      { t: 'Ja. Wie findest du es bis jetzt?', staerke: 'zuhoeren', herz: { mila: 2 }, dann: [
        ['mila', 'Laut. Zu viele Leute.'],
        ['mila', 'Auf meiner alten Schule waren wir nur zwölf.'],
        { wahl: [
          { t: 'Zwölf? Das ist ja klein. Wie war das?', staerke: 'zuhoeren', herz: { mila: 1 }, dann: [
            ['mila', 'Ruhig. Man kannte alle.'], ['mila', 'Hier kenn ich noch niemanden.'], ['du', 'Jetzt kennst du mich.'], ['mila', '(lächelt) Stimmt.'] ] },
          { t: 'Ich find’s auch viel.', herz: { mila: 1 }, dann: [['mila', 'Gut zu wissen, dass es nicht nur mir so geht.']] },
        ] } ] },
      { t: 'Ja. Spielst du was auf dem Handy?', herz: { mila: 1 }, dann: [
        ['mila', 'Nur so ein Puzzle-Spiel.'], ['mila', 'Wenn alles zu laut ist, hilft das.'] ] },
    ] },
    ['erzaehler', 'Sie rutscht ein Stück. Platz für dich.'],
  ],
  freiwurf: [
    ['ben', 'Hey, du! Spielst du mit? Freiwürfe!'],
    ['yusuf', 'Wer die meisten trifft, gewinnt. Fünf Würfe.'],
    { tu: 'freiwurf' },
  ],
  freiwurfDanach: [
    ['ben', 'Nicht schlecht! Morgen wieder?'],
    { wahl: [
      { t: 'Klar, bin dabei.', staerke: 'kontakt', herz: { ben: 2, yusuf: 1 }, dann: [['yusuf', 'Cool. Wir sind immer hier in der Pause.']] },
      { t: 'Mal sehen.', herz: { ben: 1 }, dann: [['ben', 'Okay. Du weißt, wo wir sind.']] },
    ] },
  ],
  kantine: [
    ['kremer', 'Nächster! Nudeln oder Curry? Zack, zack.'],
    ['erzaehler', 'Luca schiebt sich vor dich. Zwei Kumpels hinter ihm.'],
    ['luca', 'Dreimal Nudeln. Wir haben’s eilig.'],
    { wahl: [
      { t: '„Ey. Ich war dran.“', staerke: 'klar', herz: { luca: -1 }, merke: 'lucaAngelegt', dann: [
        ['luca', '(dreht sich langsam um) Und?'],
        ['erzaehler', 'Die Kumpels grinsen. Hinter dir wird es still.'],
        { wahl: [
          { t: '„Und hinten ist noch Platz.“', staerke: 'mut', herz: { kremer: 1 }, dann: [
            ['kremer', 'Stimmt. Luca, nach hinten. Jeden Tag dasselbe.'],
            ['luca', '(leise, im Vorbeigehen) Merk ich mir.'] ] },
          { t: '„… Schon gut.“', dann: [
            ['luca', 'Dacht ich mir.'],
            ['erzaehler', 'Die Kumpels lachen. Du bist trotzdem gleich dran.'] ] },
        ] } ] },
      { t: '(Nichts sagen. Aufs Handy schauen.)', staerke: 'ruhig', merke: 'nudelnAus', dann: [
        ['kremer', 'So. Nudeln sind aus. Nur noch Curry.'] ] },
      { t: '„Nimmst du mir eine mit?“', staerke: 'humor', herz: { luca: 1 }, merke: 'lucaWitz', dann: [
        ['luca', '(kurzes Grinsen) Frech.'],
        ['erzaehler', 'Er bleibt vor dir. Aber er nickt dir zu.'] ] },
      { t: '(Frau Kremer anschauen. Augen verdrehen.)', herz: { kremer: 1, luca: -1 }, merke: 'lucaGepetzt', dann: [
        ['kremer', 'Ich seh’s. Luca. Hinten anstellen.'],
        ['luca', 'Echt jetzt? Petze.'],
        ['erzaehler', 'Er rempelt dich an. Wie aus Versehen.'] ] },
    ] },
    { wahl: [
      { t: 'Nudeln, bitte.', wenn: (m) => !m.nudelnAus, dann: [] },
      { t: 'Das Curry, bitte.', dann: [] },
      { t: '(Auf das zeigen, was noch da ist.)', dann: [['kremer', 'Gute Wahl. Ist eh das Einzige.']] },
    ] },
    ['kremer', 'Guten Appetit.'],
    { tu: 'tablett' },
  ],
  tisch_noah: [
    ['noah', 'Hey! Komm, setz dich zu uns.'],
    ['ayla', 'Du bist die Bingo-Person, oder?'],
    { wahl: [
      { t: 'Ja. Und du spielst Gitarre!', staerke: 'zuhoeren', herz: { ayla: 2, noah: 1 }, dann: [['ayla', 'Du hast es dir gemerkt! Ich spiel in einer Band.']] },
      { t: 'Ja, das war ich.', herz: { ayla: 1, noah: 1 }, dann: [['ayla', 'War lustig. Hoffmann ist nett, oder?']] },
    ] },
    { tu: 'gegessen' },
  ],
  tisch_mila: [
    ['mila', 'Oh. Hi.'],
    { wahl: [
      { t: '„Darf ich mich zu dir setzen?“', staerke: 'kontakt', herz: { mila: 2 }, dann: [['mila', 'Ja. Gern.'], ['mila', 'Das Curry ist gut, oder?']] },
      { t: '(Hinsetzen und essen.)', herz: { mila: 1 }, dann: [['erzaehler', 'Ihr esst. Es ist still, aber nicht schlimm.']] },
    ] },
    { tu: 'gegessen' },
  ],
  gruppe: [
    ['hoffmann', 'Plakat: „Unser Lycée“. Ihr drei. 20 Minuten. Los.'],
    ['jo', 'Ich mal das Gebäude. Ihr malt aus. Fertig.'],
    ['erzaehler', 'Lina schiebt dir einen Zettel rüber.'],
    ['erzaehler', 'Darauf steht: „Orte, wo man sich wohlfühlt?“'],
    { wahl: [
      { t: '„Jo, Lina hat ’ne bessere Idee.“', staerke: 'einbeziehen', herz: { lina: 1, jo: -1 }, merke: 'linaGefragt', dann: [
        ['lina', '(wird rot) Ist nicht so wichtig …'],
        ['jo', 'Welche Idee? Zeig.'],
        ['jo', '… Hm. Okay. Aber das Gebäude mal ich.'] ] },
      { t: 'Die Idee laut sagen. Als deine.', herz: { jo: 1 }, merke: 'ideeGeklaut', dann: [
        ['jo', 'Okay, das ist gut. Machen wir.'],
        ['erzaehler', 'Lina nimmt den Zettel zurück. Sie knüllt ihn klein.'] ] },
      { t: 'Zurückschreiben: „Gut. Sag du’s.“', herz: { lina: 1 }, merke: 'zettel', dann: [
        ['erzaehler', 'Lina liest. Schüttelt den Kopf.'],
        ['jo', 'Was schreibt ihr da? Liebesbriefe?'],
        ['erzaehler', 'Jo malt das Gebäude.'] ] },
      { t: '(Jo machen lassen. Handy unterm Tisch.)', merke: 'joMacht', dann: [
        ['erzaehler', '18 Minuten Ruhe. Jo malt. Lina malt aus. Du scrollst.'] ] },
    ] },
    { tu: 'plakat' },
    ['hoffmann', 'Zeit! Zeigt mal her.'],
    { tu: 'plakatEnde' },
  ],
  heimweg: [
    ['erzaehler', '15:30 Uhr. Der erste Tag ist vorbei.'],
    ['noah', 'Hey! Gleicher Bus?'],
    { wahl: [
      { t: 'Ja. Wollen wir morgen zusammen fahren?', staerke: 'kontakt', herz: { noah: 2 }, dann: [['noah', 'Gern! Ich steig eine Haltestelle vor dir ein.'], ['noah', 'Ich halt dir einen Platz frei.']] },
      { t: 'Ja. War ein langer Tag.', herz: { noah: 1 }, dann: [['noah', 'Total. Aber besser als gedacht.']] },
    ] },
    { tu: 'milaAbschied' },
    ['erzaehler', 'Der Bus kommt. Morgen geht es weiter.'],
    { tu: 'kapitelEnde' },
  ],
  milaAbschied_ja: [
    ['mila', 'Tschüss, {name}. Bis morgen.'],
  ],
};

// ---------- Kapitel 2 und folgende ----------
import { SCHRITTE2, GESPRAECHE2, LEUTE2, STAERKEN2 } from './kapitel2.js';
import { SCHRITTE3, GESPRAECHE3, LEUTE3, STAERKEN3 } from './kapitel3.js';
import { SCHRITTE4, GESPRAECHE4, LEUTE4, STAERKEN4 } from './kapitel4.js';
import { SCHRITTE5, GESPRAECHE5, STAERKEN5 } from './kapitel5.js';
import { SCHRITTE6, GESPRAECHE6, STAERKEN6, LEUTE6 } from './kapitel6.js';
import { SCHRITTE7, GESPRAECHE7 } from './kapitel7.js';
export const KAPITEL = { 1: 'Rentrée', 2: 'Die erste Woche', 3: 'Der Schnuppertag', 4: 'Nein sagen', 5: 'Gerüchte', 6: 'Kleine Schritte', 7: 'Praktikum' };
for (const st of SCHRITTE) { st.kap = st.kap || 1; st.tag = st.tag || 'Montag'; }
SCHRITTE.push(...SCHRITTE2, ...SCHRITTE3, ...SCHRITTE4, ...SCHRITTE5, ...SCHRITTE6, ...SCHRITTE7);
Object.assign(GESPRAECHE, GESPRAECHE2, GESPRAECHE3, GESPRAECHE4, GESPRAECHE5, GESPRAECHE6, GESPRAECHE7);
Object.assign(LEUTE, LEUTE2, LEUTE3, LEUTE4, LEUTE6);
Object.assign(STAERKEN, STAERKEN2, STAERKEN3, STAERKEN4, STAERKEN5, STAERKEN6);

// Sprecher-Namen und Farben (Erzähler, du)
export const SPRECHER = { erzaehler: { name: '', farbe: '#5b6472' }, du: { name: 'Du', farbe: '#2b3a55' }, kopf: { name: 'Dein Kopf', farbe: '#7d8796' }, kritiker: { name: 'Der Kritiker', farbe: '#a34a4a' } };
