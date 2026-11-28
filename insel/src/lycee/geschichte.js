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
  klar: { name: 'Freundlich und klar', text: 'Gesagt, was Sache ist. Keiner war sauer.' },
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
  hoffmann: { hoehe: 1.82, name: 'Mme Tidderich', modell: 'menschen', stil: 'Suit', haut: '#e8bf9a', haar: '#6d6d6d', oben: '#4a5568', unten: '#2d3748', schuhe: '#3a2a1c', farbe: '#4a5568', erwachsen: true },
  rafa: { hoehe: 1.5, name: 'Rafa', modell: 'menschen', stil: 'Casual2', haut: '#f0c9a8', haar: '#9a5530', oben: '#3fa66b', unten: '#4a5568', schuhe: '#e9e9e9', farbe: '#3fa66b' },   // rotbraune Haare, grünes Shirt: anders als Noah und Ben (Jugend-Kritik: „der Junge von der Bank“ = Noah?)   // 5e, der Junge auf dem Foto (Kapitel 1, neues Spielsystem)
  kenan: { hoehe: 1.8, kopf: 'muetze', kopfFarbe: '#3a3f4b', name: 'Kenan', modell: 'menschen', stil: 'Punk', haut: '#a8754f', haar: '#1b1410', oben: '#2b2b33', unten: '#4a4f5c', schuhe: '#d9523c', farbe: '#2b2b33' },
  dario: { hoehe: 1.77, frisur: 'stachel', name: 'Dario', modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#4a3020', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff', farbe: '#d9693f' },
  mila: { hoehe: 1.61, name: 'Mila', modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#f2f2f2', farbe: '#2fb8a8' },
  lina: { hoehe: 1.58, name: 'Lina', modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#c9a15a', oben: '#9b7bc8', unten: '#4a4f5c', schuhe: '#6b4e3a', farbe: '#9b7bc8' },
  jo: { hoehe: 1.71, kopf: 'cap', kopfFarbe: '#c0392b', name: 'Jo', modell: 'menschen', stil: 'Casual',   /* „Adventurer“ hat einen Vollbart – Jo ist 13 */ haut: '#d8a982', haar: '#3a2a1c', oben: '#c0392b', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#c0392b' },
  ayla: { hoehe: 1.64, name: 'Ayla', modell: 'frauen', stil: 'Punk', haut: '#c68e64', haar: '#2b1d14', oben: '#e85d75', unten: '#2b2b33', schuhe: '#2b2b2b', farbe: '#e85d75' },
  ben: { hoehe: 1.76, name: 'Ben', modell: 'menschen', stil: 'Beach', haut: '#f1c7a2', haar: '#d9b36a', oben: '#ffd166', unten: '#4f88c8', schuhe: '#ffffff', farbe: '#d9a21b' },
  chiara: { hoehe: 1.63, name: 'Chiara', modell: 'frauen', stil: 'Suit', haut: '#eec09a', haar: '#5a3a24', oben: '#3fa66b', unten: '#2f3a4a', schuhe: '#2b2b2b', farbe: '#3fa66b' },
  yusuf: { hoehe: 1.69, name: 'Yusuf', modell: 'menschen', stil: 'Casual', haut: '#9b6a45', haar: '#1b1410', oben: '#5fa0d0', unten: '#2d3748', schuhe: '#f2f2f2', farbe: '#5fa0d0' },
  bruder: { hoehe: 1.22, name: 'Der Kleine', modell: 'menschen', stil: 'Casual2', haut: '#9b6a45', haar: '#1b1410', oben: '#f2c14e', unten: '#3a3f4b', schuhe: '#e85d75', farbe: '#f2c14e', kind: true },   // Yusufs Bruder (7), K3
  manon: { hoehe: 1.57, name: 'Manon', modell: 'frauen', stil: 'Casual', haut: '#d9a07a', haar: '#2b1d14', oben: '#e07b39', unten: '#3a3f4b', schuhe: '#f2f2f2', farbe: '#e07b39' },
  kremer: { hoehe: 1.65, reich: 3.4, name: 'Frau Kremer', modell: 'frauen', stil: 'Worker', haut: '#f0c9a8', haar: '#a0522d', oben: '#ffffff', unten: '#4a4f5c', schuhe: '#ffffff', farbe: '#2f4f45', erwachsen: true },
  luca: { hoehe: 1.74, kopf: 'cap', kopfFarbe: '#2b2b33', name: 'Luca', modell: 'menschen', stil: 'Casual2', haut: '#e8bf9a', haar: '#2b1d14', oben: '#7b8794', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#7b8794' },
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
  { id: 'innenhof', x: -27.5, z: -40.5, r: 3, titel: 'Der Innenhof', text: 'Hinter dem Haupthaus: Bogengänge, Blumen, Ruhe. Viele kennen ihn gar nicht.' },
  { id: 'linde', x: 2, z: -40, r: 4, titel: 'Die alte Linde', text: 'Älter als die Schule. In der Rinde: Initialen und ein Herz.' },
  { id: 'aula', x: -14, z: -60, r: 4, titel: 'Die Aula', text: 'Bühne, roter Vorhang, ein Klavier. Im Juni ist hier die Abschlussfeier.' },
  { id: 'lesesaal', x: 14, z: -62, r: 4, titel: 'Der Lesesaal', text: 'Zwei Etagen Bücher. Oben auf der Galerie ist es ganz still.' },
  { id: 'gewaechshaus', x: 15, z: -46.5, r: 2.5, titel: 'Das Gewächshaus', text: 'Tomaten, Kräuter und ein Kaktus mit Namensschild: Kevin.' },
  { id: 'turm', x: 34, z: -53.6, r: 2.6, titel: 'Der Glockenturm', text: 'Um zwölf läutet er. Angeblich war noch nie jemand oben.' },
  { id: 'sitzstufen', x: -16, z: -44.8, r: 3, titel: 'Die Sitzstufen', text: 'Im Sommer ist hier Unterricht draußen. Und Pause sowieso.' },
  { id: 'musik', x: 56, z: -58, r: 3, titel: 'Der Musikraum', text: 'Ein Schlagzeug, ein Keyboard, vier Gitarren. Mittwochs probt hier eine Band.' },
  { id: 'kunst', x: 54, z: -50, r: 3, titel: 'Der Kunstraum', text: 'Staffeleien, Farbtöpfe, ein Waschbecken voller Pinsel. Es riecht nach Farbe.' },
  { id: 'informatik', x: 54, z: -42, r: 3, titel: 'Der Informatikraum', text: 'Achtzehn Bildschirme. Das WLAN-Passwort steht angeblich unter einem Tisch.' },
  { id: 'sportplatz', x: -66, z: -6, r: 4, titel: 'Der Sportplatz', text: '400-Meter-Bahn. Beim Sportfest läuft sogar Herr Mesenberg mit.' },
];

// Wer im Saal 1.04 sitzt (Pulte: x = −24.8 + r·2.1 + 0.55, z = −27.2 + c·3.4 ± 0.62)
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1) };
const KLASSE_STEHT = { ayla: [-24, -27, 0.4], ben: [-21.5, -22.5, -2.6], chiara: [-19.5, -25.5, 1.8], yusuf: [-23.6, -20.2, 2.4], jo: [-19.55, -21, -1.5], lina: [-19.55, -27.8, -0.6] };

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
  { id: 'klasse', uhr: 7.95, titel: 'Saal 1.04', ziel: 'Sag Mme Tidderich Hallo.', marker: 'hoffmann',
    leute: { hoffmann: [-27, -24, Math.PI / 2], noah: pult(0, 1, 1), ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'hoffmann1' } },
  { id: 'bingo', uhr: 8.3, titel: 'Klassen-Bingo', ziel: 'Finde für jedes Feld jemanden. Frag herum!', marker: 'bingo',
    leute: { hoffmann: [-27, -24, Math.PI / 2], noah: [-22.75, -23.3, 2.2], ...KLASSE_STEHT },
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
    leute: { hoffmann: [13.6, -12.2, Math.PI], kremer: [26.8, -9, -Math.PI / 2], luca: [24.6, -7.4, 2.6], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, -Math.PI / 2, 'sitzt'], yusuf: [16.65, -10.1, -Math.PI / 2, 'sitzt'] },
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
    ['erzaehler', 'Montag, 7:33. Erster Tag. Annexe Junglinster.'],
    ['erzaehler', 'Dein Rucksack ist so neu, dass er noch riecht.'],
    ['erzaehler', 'An der Haltestelle reserviert ein Junge eine Bank. Mit seiner Jacke.'],
  ],
  noah1: [
    ['noah', 'Kurze Frage. Bist du neu, oder guckst du immer so?'],
    { wahl: [
      { t: 'Neu. {name}. 7P2. Und du?', staerke: 'kontakt', herz: { noah: 2 }, merke: 'noahKlebt', dann: [
        ['noah', 'Noah. Auch 7P2. Gut. Dann sind wir schon zwei.'],
        ['noah', 'Ich bleib in deiner Nähe. Ganz unauffällig.'],
        ['erzaehler', 'Er stellt sich neben dich. Sehr auffällig nah.'] ] },
      { t: '„Und du? Du siehst aus wie ein Prospekt.“', staerke: 'humor', merke: 'noahGeneckt', dann: [
        ['noah', '(guckt an sich runter) … Ist das schlecht?'],
        ['noah', 'Okay. Noah. 7P2. Prospekt.'],
        ['erzaehler', 'Drüben lacht einer von den Älteren. Laut.'] ] },
      { t: 'Ja. Weißt du, wo wir hinmüssen?', staerke: 'hilfe', herz: { noah: 1 }, dann: [
        ['noah', 'Nein. Ich dachte, du weißt es. Du siehst so aus.'],
        ['noah', 'Noah. 7P2. Wir sind beide verloren.'] ] },
      { t: '(Kopfhörer drin lassen. Nicken.)', merke: 'noahKopfhoerer', dann: [
        ['erzaehler', 'Er sagt etwas. Du hörst nur Bass.'],
        ['erzaehler', 'Er nickt zurück. Lange. Dann gibt er auf.'] ] },
    ] },
    ['noah', 'Ich muss kurz … wohin. Bleib hier. Also, nicht hier. Egal.'],
    { tu: 'stundenplanTipp' },
  ],
  weber: [
    { tu: 'weberTelefon' },
    ['weber', '„… nein, die Liste kommt heute. Ja. Nein. JA.“'],
    ['erzaehler', 'Mme Weber telefoniert. Auf der Theke: ein Berg Stundenpläne.'],
    { wahl: [
      { t: '(Warten. Handy raus.)', staerke: 'warten', herz: { weber: 1 }, merke: 'weberGewartet', dann: [
        ['erzaehler', 'Drei Minuten. Vier. Du kennst jetzt jedes Plakat auswendig.'],
        ['weber', 'So. Name? … {name}, 7P2. Saal 1.04.'],
        ['weber', 'Moien übrigens. Ich bin bis 16 Uhr da. Nicht 16:05.'] ] },
      { t: '„Entschuldigung. Ich bin neu. 7P2.“', staerke: 'klar', herz: { weber: -1 }, dann: [
        ['weber', '(hält den Hörer zu) Siehst du das? Das ist ein Telefon.'],
        ['erzaehler', 'Sie schiebt dir trotzdem ein Blatt hin. Ohne hinzusehen.'],
        ['weber', '(ins Telefon) Nein, nicht Sie.'] ] },
      { t: '(Einen Plan vom Stapel nehmen. Gehen.)', merke: 'falscherPlan', dann: [
        ['erzaehler', 'Keiner sieht es. Zehn Sekunden. Perfekter Plan.'],
        ['erzaehler', 'Fast perfekt. Du hast nicht gelesen, was oben steht.'] ] },
    ] },
    { tu: 'stundenplan' },
    { tu: 'spindFrei' },
  ],
  gang: [
    ['erzaehler', 'Vor Saal 1.04 stehen zwei Ältere. Genau in der Tür.'],
    ['kenan', '… und Becker sagt: Zweimal messen. Ich so: Hab ich doch.'],
    { wahl: [
      { t: '„Darf ich mal durch?“', staerke: 'klar', herz: { kenan: 1, dario: 1 }, dann: [
        ['dario', 'Oh. Klar. Sorry.'],
        ['kenan', 'Neu? Mme Tidderich ist okay. Nur ihre Krawatten nicht.'] ] },
      { t: '(Einfach durchdrängeln.)', herz: { kenan: -1, dario: -1 }, merke: 'gedraengelt', dann: [
        ['kenan', 'Ey! Geht’s noch?'],
        ['dario', 'Lass. Erster Tag.'],
        ['erzaehler', 'Kenan merkt sich dein Gesicht. Man sieht es.'] ] },
      { t: '(Warten, bis sie weggehen.)', merke: 'gewartet', dann: [
        ['erzaehler', 'Sie reden weiter. Über Kommas. Dann klingelt es.'],
        ['dario', 'Mist, wir müssen. Komm.'],
        ['erzaehler', 'Die Tür ist frei. Du bist trotzdem zu spät.'] ] },
    ] },
  ],
  hoffmann1: [
    ['hoffmann', 'Guten Morgen! Du bist … (sucht auf der Liste) … {name}!'],
    { tu: 'zuSpaet' },
    ['hoffmann', 'Mme Tidderich. Klassenlehrerin. Und heute: mit Methode.'],
    ['hoffmann', 'Neue Methode: Klassen-Bingo! Vier Felder. Rumfragen!'],
    ['erzaehler', 'Die ganze Klasse stöhnt. Jo stöhnt mit Echo.'],
    { wahl: [
      { t: 'Okay.', dann: [] },
      { t: '„Muss das sein?“', staerke: 'humor', herz: { jo: 1, hoffmann: -1 }, merke: 'mussIch', dann: [
        ['jo', 'Danke. Endlich sagt’s wer.'],
        ['hoffmann', 'Muss nicht. Darf. Und du liest die Felder vor. Laut.'],
        ['erzaehler', 'Alle gucken. Du liest. Deine Stimme klingt fremd.'] ] },
      { t: '„Muss ich was über mich erzählen?“', staerke: 'hilfe', herz: { hoffmann: 1 }, dann: [
        ['hoffmann', 'Nein. Fragen reicht.'],
        ['jo', '(äfft nach) „Muss ich was erzählen?“'],
        ['hoffmann', 'Jo. Du fängst an.'] ] },
    ] },
    { tu: 'bingoStart' },
  ],
  bingoFertig: [
    ['hoffmann', 'Bingo! Schneller als die 7P1. Das schreib ich an die Tafel.'],
    ['hoffmann', 'Pause. Und die Methode hat funktioniert. Notiert.'],
  ],
  // Bingo-Gespräche: je Person. Die Antwort sagt, auf welches Feld sie passt.
  bingo_ayla: { felder: ['musik'], zeilen: [['ayla', 'Bass. Das ist Gitarre mit Selbstbewusstsein.'], ['ayla', 'Und du?']] },
  bingo_ben: { felder: ['sport', 'tier'], zeilen: [['ben', 'Korbball im Verein. Und ich hab einen Hund.'], ['ben', 'Er heißt Keks. Er hat mein Ladekabel gegessen.']] },
  bingo_chiara: { felder: ['kochen'], zeilen: [['chiara', 'Ich koche. Plan: mehr Knoblauch als Pasta.'], ['chiara', 'Voilà. Ein Feld für dich.']] },
  bingo_yusuf: { felder: ['sport'], zeilen: [['yusuf', 'Hm. Judo.'], ['yusuf', 'Zweimal die Woche. Willst du’s sehen? … Nein? Gut.']] },
  bingo_jo: { felder: ['tier'], zeilen: [['jo', 'Zwei Katzen. Turbo und Diesel. Diesel ist schneller.'], ['jo', 'Gib mal her. Was steht da noch?']] },
  bingo_lina: { felder: ['musik', 'kochen'], zeilen: [['lina', '(leise) Klavier.'], ['lina', 'Und … Kuchen. Manchmal. Sag’s keinem.']] },
  bingo_noah: { felder: [], zeilen: [['noah', 'Kurze Frage. Zählt ein Kaktus als Haustier?'], ['noah', 'Nein? Dann hab ich nichts. Lina hat zwei Felder.']] },
  mila: [
    ['erzaehler', 'Mila sitzt allein auf der Bank. Klack, klack. Zauberwürfel.'],
    { wahl: [
      { t: '„Ist hier frei?“', staerke: 'kontakt', herz: { mila: 1 }, dann: [
        ['mila', '(nimmt die Tasche weg) Jetzt ja.'],
        ['erzaehler', 'Dann sagt keiner was. Eine ganze Minute. Keiner stirbt.'],
        ['mila', 'Du sitzt in 1.04 an der Tür. Platz drei.'] ] },
      { t: '(Hinsetzen. Nichts sagen.)', staerke: 'warten', herz: { mila: 1 }, merke: 'milaStill', dann: [
        ['erzaehler', 'Klack, klack, klack. Sie legt den Würfel hin. Fertig.'],
        ['mila', '(ohne aufzusehen) 41 Sekunden. Merk dir die Zahl.'] ] },
      { t: '„Gib mal. Ich kann das auch.“', staerke: 'humor', dann: [
        ['erzaehler', 'Du drehst dreimal. Jetzt ist alles bunt durcheinander.'],
        ['mila', 'Zwei Minuten Arbeit. Weg.'],
        ['mila', '(nimmt ihn zurück) Du drehst falsch rum. Komplett.'] ] },
      { t: '„Komm mit zum Korb. Ben spielt.“', staerke: 'einbeziehen', dann: [
        ['mila', 'Zu viele Leute. Zu viele Bälle.'],
        ['mila', 'Geh ruhig. Ich zähl hier die Tauben.'],
        ['erzaehler', 'Ben ruft schon zum zweiten Mal.'] ] },
    ] },
  ],
  freiwurf: [
    ['ben', 'Du! Freiwürfe! Wer verliert, zahlt.'],
    ['yusuf', 'Er meint: Wer verliert, verliert. Fünf Würfe.'],
    { tu: 'freiwurf' },
  ],
  freiwurfDanach: [
    ['ben', 'Nicht schlecht. Ach so: Hast du zwei Euro? Kriegst du morgen.'],
    { wahl: [
      { t: '(Zwei Euro geben.)', staerke: 'kontakt', herz: { ben: 2, yusuf: 1 }, dann: [{ tu: 'benSchuld' }, ['ben', 'Du bist mein erster Investor. Morgen. Ehrenwort.'], ['yusuf', 'Hm. Das sagt er jeden Tag.']] },
      { t: '„Morgen. Vielleicht.“', herz: { ben: 1 }, dann: [['ben', 'Respekt. Du lernst schnell.']] },
      { t: '„Was krieg ich dafür?“', staerke: 'humor', herz: { ben: 1 }, dann: [['ben', 'Zinsen. In Witzen. Täglich.'], ['yusuf', '(leise) Lass es.']] },
    ] },
  ],
  kantine: [
    ['kremer', 'Nächster! Nudeln oder Curry? Zack, zack.'],
    ['erzaehler', 'Luca schiebt sich vor dich. Zwei Kumpels im Schlepptau.'],
    ['luca', 'Dreimal Nudeln. Wir haben’s eilig. Sehr.'],
    ['stolz', 'Sag was. Sonst machen die das jeden Tag.'],
    ['bauch', 'Nudeln sind eh überbewertet. Lass einfach.'],
    ['kopf', 'Ein Satz. Ruhig. Oder gar keiner.'],
    { wahl: [
      { t: '„Ich war dran.“', staerke: 'klar', herz: { luca: -1 }, merke: 'lucaAngelegt', dann: [
        ['luca', '(dreht sich langsam um) Und?'],
        ['erzaehler', 'Die Kumpels grinsen. Hinter dir wird es still.'],
        { wahl: [
          { t: '„Und hinten ist noch Platz.“', staerke: 'mut', herz: { kremer: 1 }, dann: [
            ['kremer', 'Stimmt. Luca, nach hinten. Wie jeden Tag.'],
            ['luca', '(im Vorbeigehen) Merk ich mir.'] ] },
          { t: '„… Schon gut.“', dann: [
            ['luca', 'Dacht ich mir.'],
            ['erzaehler', 'Die Kumpels lachen. Du bist trotzdem gleich dran.'] ] },
        ] } ] },
      { t: '(Nichts sagen. Aufs Handy gucken.)', staerke: 'ruhig', merke: 'nudelnAus', dann: [
        ['kremer', 'So. Nudeln sind aus. Curry für alle.'],
        ['luca', '(mit drei Tellern Nudeln) Tja.'] ] },
      { t: '„Nimmst du mir eine mit?“', staerke: 'humor', herz: { luca: 1 }, merke: 'lucaWitz', dann: [
        ['luca', '(kurzes Grinsen) Frech.'],
        ['luca', 'Nimm das Curry. Die Nudeln haben zu wenig Salz.'],
        ['erzaehler', 'Er bleibt vor dir. Aber er nickt dir zu.'] ] },
      { t: '(Frau Kremer angucken. Augen verdrehen.)', herz: { kremer: 1, luca: -1 }, merke: 'lucaGepetzt', dann: [
        ['kremer', 'Ich seh’s. Luca. Hinten anstellen.'],
        ['luca', 'Echt jetzt? Petze.'],
        ['erzaehler', 'Er rempelt dich an. Ganz aus Versehen.'] ] },
    ] },
    { wahl: [
      { t: 'Nudeln, bitte.', wenn: (m) => !m.nudelnAus, dann: [] },
      { t: 'Das Curry, bitte.', dann: [] },
      { t: '(Auf das zeigen, was noch da ist.)', dann: [['kremer', 'Gute Wahl. Ist auch das Einzige.']] },
    ] },
    ['kremer', 'Gudden Appetit. Nächster!'],
    { tu: 'tablett' },
  ],
  tisch_noah: [
    { tu: 'noahTisch' },
    ['ayla', 'Du bist die Bingo-Person, oder?'],
    { tu: 'aylaTisch' },
    { tu: 'gegessen' },
  ],
  tisch_mila: [
    ['mila', 'Oh. Du.'],
    ['erzaehler', 'Drüben winkt Noah. Neben ihm ist noch Platz.'],
    { wahl: [
      { t: '„Darf ich?“', staerke: 'kontakt', herz: { mila: 1, noah: -1 }, dann: [
        ['mila', 'Ist ein Tisch. Kein Klub.'],
        ['erzaehler', 'Noah hört auf zu winken. Langsam.'] ] },
      { t: '(Hinsetzen. Essen. Nichts sagen.)', staerke: 'warten', herz: { mila: 1 }, dann: [
        ['erzaehler', 'Ihr esst. Keiner redet. Nur Gabeln.'],
        ['luca', '(im Vorbeigehen) Oh. Der Schweige-Tisch.'] ] },
      { t: '„Sitzt du immer allein?“', staerke: 'lesen', herz: { mila: -1 }, dann: [
        ['mila', 'Erster Tag. Wie soll das „immer“ sein?'],
        ['erzaehler', 'Sie isst weiter. Aber sie schiebt dir den Pfeffer hin.'] ] },
    ] },
    { tu: 'gegessen' },
  ],
  gruppe: [
    ['hoffmann', 'Neue Methode: Plakat „Unsere Schule“. Ihr drei. 20 Minuten!'],
    ['jo', 'Ich mal das Gebäude. Ihr malt aus. Allez, fertig.'],
    ['erzaehler', 'Lina schiebt dir einen Zettel rüber.'],
    ['erzaehler', 'Darauf steht: „Orte, wo einen keiner nervt?“'],
    { wahl: [
      { t: '„Jo, Lina hat ’ne bessere Idee.“', staerke: 'einbeziehen', herz: { lina: 1, jo: -1 }, merke: 'linaGefragt', dann: [
        ['lina', '(wird rot) Ist nicht so wichtig …'],
        ['jo', 'Welche Idee? Zeig.'],
        ['jo', '… Okay. Gut. Aber das Gebäude mal ich.'] ] },
      { t: '(Die Idee laut sagen. Als deine.)', herz: { jo: 1 }, merke: 'ideeGeklaut', dann: [
        ['jo', 'Okay, das ist gut. Machen wir.'],
        ['erzaehler', 'Lina nimmt den Zettel zurück. Knüllt ihn ganz klein.'] ] },
      { t: '(Zurückschreiben: „Gut. Sag du’s.“)', herz: { lina: 1 }, merke: 'zettel', dann: [
        ['erzaehler', 'Lina liest. Schüttelt den Kopf.'],
        ['jo', 'Was schreibt ihr da? Liebesbriefe?'],
        ['erzaehler', 'Jo malt das Gebäude. Riesig.'] ] },
      { t: '(Jo machen lassen. Handy unterm Tisch.)', merke: 'joMacht', dann: [
        ['erzaehler', '18 Minuten Ruhe. Jo malt. Lina malt aus. Du scrollst.'] ] },
    ] },
    { tu: 'plakat' },
    ['hoffmann', 'Zeit! Zeigt mal her.'],
    { tu: 'plakatEnde' },
  ],
  heimweg: [
    ['erzaehler', '15:30. Tag eins: überlebt.'],
    ['noah', 'Hey! Gleicher Bus?'],
    { wahl: [
      { t: 'Ja. Morgen zusammen?', staerke: 'kontakt', herz: { noah: 2 }, dann: [['noah', 'Ich steig eine Station vor dir ein.'], ['noah', 'Ich halt dir einen Platz frei. Mit irgendwas.']] },
      { t: 'Ja. Langer Tag.', herz: { noah: 1 }, dann: [['noah', 'Total. Ich schlaf gleich im Stehen. Wie ein Pferd.']] },
    ] },
    { tu: 'milaAbschied' },
    ['fahrer', 'Einsteigen. Ich warte nicht. Nie.'],
    { tu: 'kapitelEnde' },
  ],
  milaAbschied_ja: [
    ['mila', 'Tschüss, {name}. Bis morgen. 7:35, nicht 7:36.'],
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
export const SPRECHER = { erzaehler: { name: '', farbe: '#5b6472' }, alle: { name: 'Alle', farbe: '#5b6472' }, du: { name: 'Du', farbe: '#2b3a55' }, kopf: { name: 'Kopf', farbe: '#5f7d9e' }, bauch: { name: 'Bauch', farbe: '#b0784a' }, stolz: { name: 'Stolz', farbe: '#8a5fa8' }, kritiker: { name: 'Die fiese Stimme', farbe: '#a34a4a' }, nik: { name: 'Opa Nik', farbe: '#5a6b5a' }, jemand: { name: 'Jemand', farbe: '#5b6472' }, nummer: { name: 'Unbekannte Nummer', farbe: '#5b6472' } };

// ---------- Neue Geschichte „Drei Jahre Annexe“ (annexe/KONZEPT-SPIEL.md): 1 Kurs-Modul = 1 Kapitel ----------
// Die alten Kapitel bleiben als Datei (Texte, Folgen), laufen aber nicht mehr. Kapitel kommen nach und nach dazu.
import { SCHRITTE_N1, GESPRAECHE_N1 } from './story/kapitel1.js';
import { PERSONAL } from './story/personal.js';
import { SCHRITTE_N2, GESPRAECHE_N2 } from './story/kapitel2.js';
import { SCHRITTE_N3, GESPRAECHE_N3 } from './story/kapitel3.js';
import { SCHRITTE_N4, GESPRAECHE_N4 } from './story/kapitel4.js';
import { SCHRITTE_N5, GESPRAECHE_N5 } from './story/kapitel5.js';
import { SCHRITTE_N6, GESPRAECHE_N6 } from './story/kapitel6.js';
import { SCHRITTE_N7, GESPRAECHE_N7 } from './story/kapitel7.js';
import { SCHRITTE_N8, GESPRAECHE_N8 } from './story/kapitel8.js';
import { SCHRITTE_N9, GESPRAECHE_N9 } from './story/kapitel9.js';
import { SCHRITTE_N10, GESPRAECHE_N10 } from './story/kapitel10.js';
import { SCHRITTE_NG, GESPRAECHE_NG } from './story/nebengeschichten.js';
Object.assign(LEUTE, PERSONAL);
SCHRITTE.length = 0;
SCHRITTE.push(...SCHRITTE_N1, ...SCHRITTE_N2, ...SCHRITTE_N3, ...SCHRITTE_N4, ...SCHRITTE_N5, ...SCHRITTE_N6, ...SCHRITTE_N7, ...SCHRITTE_N8, ...SCHRITTE_N9, ...SCHRITTE_N10, ...SCHRITTE_NG);
Object.assign(GESPRAECHE, GESPRAECHE_N1, GESPRAECHE_N2, GESPRAECHE_N3, GESPRAECHE_N4, GESPRAECHE_N5, GESPRAECHE_N6, GESPRAECHE_N7, GESPRAECHE_N8, GESPRAECHE_N9, GESPRAECHE_N10, GESPRAECHE_NG);
// Kapitel heißen nach der Geschichte, nicht nach dem Kurs-Modul (Rückmeldung 24.11.: Lernen soll man nicht merken).
// Welches Modul dazu passt, steht in KAPITEL_MODUL (für die Lehrperson und das Stunden-Fenster).
Object.assign(KAPITEL, { 1: 'Das Foto', 2: 'Die Liste', 3: 'Unter der Wut', 4: '8:34', 5: 'Admin', 6: 'Die Sprachnachricht', 7: 'Wer bleibt?', 8: 'Nicht echt', 9: 'Haltestelle, früh', 10: 'Hinter der Kamera' });
export const KAPITEL_MODUL = { 1: 'Ankommen', 2: 'Wer bin ich?', 3: 'Gefühle verstehen', 4: 'Gefühle regulieren', 5: 'Meine Gedanken', 6: 'Kommunikation und Grenzen', 7: 'Wenn es schwierig wird', 8: 'Digitale Welt', 9: 'Gesund und stark', 10: 'Abschluss' };
Object.assign(STAERKEN, {
  humor: STAERKEN.humor || { name: 'Humor', text: 'Du hast die Lage mit einem Witz entspannt.' },
  mut: STAERKEN.mut || { name: 'Für andere einstehen', text: 'Du hast etwas gesagt, als es unbequem war.' },
  lesen: STAERKEN.lesen || { name: 'Leute lesen', text: 'Du hast gemerkt, was los ist – ohne Worte.' },
  abstand: STAERKEN.abstand || { name: 'Abstand nehmen', text: 'Du bist rausgegangen, bevor es kracht.' },
  neinsagen: STAERKEN.neinsagen || { name: 'Nein sagen', text: 'Du hast Nein gesagt und bist trotzdem geblieben.' },
  fuehren: { name: 'Führen', text: 'Du hast jemanden ruhig und klar gelotst.' },
  vertrauen: { name: 'Vertrauen schaffen', text: 'Du hast dafür gesorgt, dass sich andere sicher fühlen.' },
});
