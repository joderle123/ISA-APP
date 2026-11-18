// Drei Jahre Annexe – 7ème, Kapitel 3 „Gefühle verstehen“ (Kurs Jahr 1, Modul 2: E07 Was sind Gefühle, E08 Wer greift
// zum Steuer, E09 Wo spüre ich Gefühle, E10 Gemischte Gefühle). Faden @annexe.cam: Mila wird gepostet; erste echte Spur.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

export const ORTE_N3 = { sportplatz: { x: -72, z: -6, yaw: -Math.PI / 2 } };

export const SCHRITTE_N3 = [
  { id: 'k3_pantomime', kap: 3, tag: 'Montag', uhr: 9.9, titel: 'Skills: Was sind Gefühle?', ziel: 'Aula. Herr Kuedes hat sechs Ecken markiert.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n3_checkin' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_pantomime' } },
  { id: 'k3_foto', kap: 3, tag: 'Mittwoch', uhr: 12.3, titel: 'Mittagspause', ziel: 'Mila ist aus der Kantine gerannt. Such sie.', marker: 'mila',
    start: { teleport: 'kantineTuer', gespraech: 'n3_foto' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { reden: 'mila', gespraech: 'n3_mila' } },
  { id: 'k3_klasse', kap: 3, tag: 'Mittwoch', uhr: 13.6, titel: 'Nach der Pause', ziel: 'Saal 1.04. Mme Tidderich hat die Fotos gesehen.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n3_klasse' } },
  { id: 'k3_sportfest', kap: 3, tag: 'Freitag', uhr: 10.0, titel: 'Sportfest', ziel: 'Sportplatz. Staffel. Frau Sommer hat den Stab.', marker: 'sommer',
    start: { teleport: 'sportplatz', gespraech: 'n3_sportMorgen' },
    leute: { sommer: [-75, -4, Math.PI / 2], noah: [-76.5, -6.6, 1.4], jo: [-77.2, -2.6, 1.8], ben: [-78.6, -5, 1.2], ayla: [-76.4, -8.2, 0.9], mila: [-79.4, -7.8, 1.6, 'sitzt'], dario: [-80.4, -3.2, 1.1], kenan: [-81.2, -4.6, 1.3] },
    fertig: { reden: 'sommer', gespraech: 'n3_staffel' } },
];

// ---------- Pantomime-Duell (Kurs E07): Gefühle ohne Worte erkennen ----------
const PANTOMIME = {
  wo: 'Aula · Pantomime-Duell', titel: 'Welches Gefühl spielt die Person?',
  leute: [
    { wer: F.ben, zeichen: ['reißt die Arme hoch', 'springt', 'riesiges Grinsen'], gefuehl: 'freude', aufloesung: 'Ben spielt Freude. Er hat an Nuggets gedacht.' },
    { wer: F.ayla, zeichen: ['zieht die Nase kraus', 'dreht den Kopf weg', 'Hand vor dem Mund'], gefuehl: 'ekel', aufloesung: 'Ekel. Sie hat an Kantinen-Fisch gedacht.' },
    { wer: F.jo, zeichen: ['Fäuste', 'Kiefer fest', 'stampft einmal auf'], gefuehl: 'wut', aufloesung: 'Wut. „Wie wenn einer dein Auto zerkratzt, digga.“' },
    { wer: F.lina, zeichen: ['Schultern hoch', 'macht sich klein', 'guckt zur Tür'], gefuehl: 'angst', aufloesung: 'Angst. Lina spielt sie sehr echt. Alle sind leise.' },
  ],
};

// ---------- @annexe.cam: Mila beim Essen ----------
const MILA_FOTO = {
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Luca hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Mila, Mund voll, Augen halb zu', text: 'mila beim essen 💀 sticker kommt gleich', lacher: { start: 5, proSek: 0.5, stopp: 'gestoppt' } },
    { nach: 3.4, wer: 'Jo', text: 'NEIN 😭😭' },
    { nach: 5.0, wer: 'Ben', text: 'ok das ist bisschen hart' },
    { nach: 6.8, wer: 'Luca', text: 'sticker wann' },
    { nach: 8.6, system: true, text: 'Mila ist online.' },
    { nach: 11, system: true, text: 'Mila ist offline.' },
    { nach: 13.5, wer: '@annexe.cam', text: '[Sticker] 🍝😵', wennNicht: 'gestoppt' },
    { nach: 13.5, wer: 'Ayla', text: 'stopp jetzt. ernsthaft', wenn: 'gestoppt' },
    { nach: 16, wer: 'Dario', text: 'leute chillt. war nicht so gemeint', wenn: 'gestoppt' },
    { nach: 16, wer: 'Jo', text: 'der sticker 💀 wallah', wennNicht: 'gestoppt' },
    { nach: 19, wer: 'Chiara', text: 'Mila ist gerade raus aus der Kantine. Gerannt.' },
    { nach: 22, wer: 'Noah', text: 'Ich hab nicht gelacht. Nur damit ihr es wisst.' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Löscht das. Jetzt. Das ist kein Spaß mehr.“', setzt: ['gestoppt', 'klartext'], ich: 'löscht das. jetzt. das ist kein spaß mehr', folgen: [{ nach: 1.2, wer: 'Ben', text: 'real. ich hab gemeldet' }] },
      { t: '„Wer das teilt, ist genauso dabei.“', setzt: ['gestoppt', 'teilen'], ich: 'wer das teilt ist genauso dabei', folgen: [{ nach: 1.3, wer: 'Luca', text: 'oha. moralpolizei' }, { nach: 2.6, system: true, text: 'Luca hat den Beitrag gelöscht.' }] },
      { t: '„Haha der Sticker“', setzt: 'mitgemacht', ich: 'haha der sticker', folgen: [{ nach: 1, wer: 'Jo', text: 'endlich wer mit humor' }] },
    ] },
    { id: 'privat', t: 'Mila privat schreiben', symbol: '🔒', setzt: 'milaPrivat', ich: '(privat an Mila) wo bist du? ich komm', folgen: [{ nach: 3, wer: 'Mila (privat)', text: 'CDI. Leseecke. Komm allein.' }] },
    { id: 'screenshot', t: 'Screenshot (Beweis)', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. Uhrzeit 12:14.' },
    { id: 'lachen', t: 'Mitlachen', symbol: '😂', setzt: 'mitgemacht', ich: '😂' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Gesichter lesen im Saal (Kurs E09 Statuen): wer fühlt was? Dario ist die Spur ----------
const KLASSE_LESEN = {
  wo: 'Saal 1.04 · Standbild', titel: 'Wer fühlt was?',
  leute: [
    { wer: F.mila, zeichen: ['Kapuze auf', 'dreht den Würfel nicht', 'Gesicht rot'], gefuehl: ['wut', 'trauer'], aufloesung: 'Mila: Wut und Scham gleichzeitig. Man sieht beides.' },
    { wer: F.jo, zeichen: ['grinst noch', 'guckt dann weg', 'trommelt mit dem Stift'], gefuehl: ['freude', 'angst'], aufloesung: 'Jo: erst lustig, jetzt mulmig. Er hat den Sticker geteilt.' },
    { wer: F.dario, zeichen: ['steht in der Tür', 'Handy in der Faust', 'Bein wippt schnell', 'schaut nie zu Mila'], gefuehl: 'angst', aufloesung: 'Dario hat Angst. Wovor? Er ist nicht mal in dieser Klasse.' },
  ],
};

// ---------- Gefühls-Pult beim Sportfest (Kurs E08): der Stab fällt ----------
const STAFFEL_PULT = {
  wo: 'Sportfest · Staffel',
  szene: 'Letzter Wechsel. Noah kommt angerannt. Du greifst nach dem Stab. Er fällt. Alle Teams laufen vorbei.',
  versionen: {
    wut: [['du', '(trittst gegen den Stab) MANN!'], ['jo', 'Digga! Was war das?!'], ['noah', '(bleibt stehen) … Sorry. Meine Schuld.']],
    trauer: [['erzaehler', 'Du hebst den Stab auf. Gehst. Ins Ziel. Als Letzte Person.'], ['noah', '(leise) Hey. Ist nur ein Stab.']],
    angst: [['erzaehler', 'Alle gucken. Du willst unsichtbar sein. Du läufst trotzdem.'], ['ben', '(von der Seite) WEITER! WEITER!']],
    freude: [['du', '(lachst) Okay! Neuer Plan: Wir gewinnen den Stil-Preis!'], ['noah', '(lacht mit) Wir sind so schlecht!'], ['ben', 'Aura plus 300 für die Show.']],
  },
};

// ---------- Hitze-Duell mit Jo, mit Frühwarn-Signalen (Kurs E09) ----------
const JO_DUELL = {
  wo: 'Sportplatz · nach der Staffel', gegner: { name: 'Jo', farbe: '#c0392b' }, publikum: 'halbe Klasse', hitze: 45, zeit: 7,
  runden: [
    { sagt: 'Digga, wegen dir sind wir Letzte. Wallah.', warn: 'Dein Gesicht wird heiß', skill: '(Weggucken. Ausatmen. Dann reden.)', skillAntwort: '(wartet) … Was?',
      karten: [
        { t: '„Ja. Der Stab ist mir runtergefallen. Passiert.“', stimme: 'kopf', art: 'klar', hitze: -8, respekt: 1, antwort: 'Passiert? Das war Sportfest!' },
        { t: '„Wegen MIR? Du bist doch gestolpert!“', stimme: 'stolz', art: 'angriff', hitze: 25, antwort: 'Ich? ICH? Sag das nochmal.' },
        { t: '(Weggehen.)', stimme: 'bauch', art: 'rueckzug', hitze: -4, respekt: -1, antwort: 'Ja, lauf weg. Typisch.' },
      ], still: { hitze: 6, antwort: 'Sagst nix? Okay. Wow.' } },
    { sagt: 'Ich hab die ganze Woche trainiert, digga.', warn: 'Deine Hände ballen sich', skill: '(Hände aufmachen. Schultern runter.)', skillAntwort: '(guckt auf deine Hände) … Okay.',
      karten: [
        { t: '„Echt? Das wusste ich nicht. Das ist mies.“', stimme: 'kopf', art: 'klar', hitze: -16, respekt: 2, antwort: '(überrascht) … Ja. Mit meinem Onkel. Jeden Abend.' },
        { t: '„Merkt man nicht.“', stimme: 'stolz', art: 'angriff', hitze: 32, antwort: 'WAS?!' },
        { t: '„Nächstes Jahr trainieren wir zusammen.“', art: 'witz', hitze: -14, respekt: 1, antwort: '(schnaubt) Du kannst ja nicht mal einen Stab halten.' },
      ], still: { hitze: 4, antwort: 'Egal. Vergiss es.' } },
    { sagt: '…', wenn: (z) => z.hitze > 25, warn: 'Dein Herz klopft laut', skill: '(Zehn Sekunden. Nichts sagen. Atmen.)', skillAntwort: '(atmet auch) … Okay. Sorry, dass ich so laut war.',
      karten: [
        { t: '„Sorry für den Stab. Ehrlich.“', stimme: 'kopf', art: 'klar', hitze: -20, respekt: 2, antwort: '… Okay. Und sorry für „wegen dir“.' },
        { t: '„Fass mich nicht an.“ (Er kommt näher.)', stimme: 'stolz', art: 'angriff', hitze: 20, antwort: 'Ich fass dich nicht an, digga!' },
      ], still: { hitze: -6, antwort: '(dreht sich weg) Egal.' } },
  ],
};
const joAusgang = (r) => (r.knall ? 'knall' : r.hitze <= 20 ? 'versoehnt' : r.hitze <= 55 ? 'abgekuehlt' : 'sauer');

// ---------- Mischpult nach dem Sportfest (Kurs E10) – Vergleich mit Noah ----------
const MISCH = (m) => ({
  wo: 'Sportfest · danach', gefuehle: ['freude', 'trauer', 'wut', 'angst', 'ueberraschung'],
  ereignis: 'Ihr seid Letzte. ' + (m.joVersoehnt ? 'Jo hat sich entschuldigt. ' : '') + 'Und Noah ist seine beste Zeit gelaufen. Ever.',
  vergleich: { wer: F.noah, werte: { freude: 8, trauer: 2, wut: 0, angst: 1, ueberraschung: 9 }, satz: 'Ich bin so überrascht. Ich bin noch nie schnell gewesen. Letzter ist mir egal.' },
});

export const GESPRAECHE_N3 = {
  n3_checkin: [
    ['erzaehler', 'Montag. Check-in. Heute will Herr Kuedes das genauere Wort.'],
    { szene: 'checkin', id: 'checkin3', def: { frage: 'Nicht „gut“ oder „schlecht“. Das genauere Wort?', posts: [
      { wer: 'Mila', wort: 'angespannt', farbe: '#8a7bc8' }, { wer: 'Ben', wort: 'aufgeregt (sportfest!!)', farbe: '#f2b134' }, { wer: 'Lina', wort: 'okay', farbe: '#5fb07a' } ],
      reaktion: (w, g) => (g === 'Wut' ? [{ wer: 'Jo', text: 'same, aber ich weiß nicht warum' }] : g === 'Angst' ? [{ wer: 'Mila', text: 'Gleiche Kategorie. Interessant.' }] : [{ wer: 'Ben', text: '{name} hat ein genaues wort. respekt' }]) }, folgen: {} },
  ],
  n3_pantomime: [
    ['kaya', 'Wéi geet et? Heute: Gefühle. Wie viele kennt ihr?'],
    ['ben', 'Hunger. Ist das eins?'],
    ['kaya', 'Fast. Sechs große: Freude, Trauer, Wut, Angst, Ekel, Überraschung.'],
    ['kaya', 'Und jedes schickt eine Botschaft. Auch die unangenehmen.'],
    ['kaya', 'Erst: Pantomime-Duell. Ohne Worte. Ihr ratet.'],
    { szene: 'lesen', id: 'pantomime', def: PANTOMIME,
      ausgang: (r) => (r.richtig.length >= 3 ? 'gut' : 'mittel'),
      folgen: { gut: { staerke: 'lesen', herz: { lina: 1, ayla: 1 }, merke: 'pantomimeGut' }, mittel: { dann: [['kaya', 'Ohne Worte ist schwer. Darum fragen wir manchmal nach.']] } } },
    ['kaya', 'Letzte Frage. Wozu ist Angst gut?'],
    { wahl: [
      { t: '„Sie sagt: Pass auf.“', staerke: 'lesen', herz: { kaya: 1 }, dann: [['kaya', 'Genau. Angst ist ein Wachhund. Manchmal bellt er zu laut.']] },
      { t: '„Für nix. Die soll weg.“', dann: [['mila', 'Ohne Angst würde Ben über die Straße rennen.'], ['ben', 'Mach ich doch eh.']] },
      { t: '„Damit man weiß, was einem wichtig ist.“', staerke: 'zuhoeren', herz: { mila: 1 }, dann: [['kaya', 'Stark. Man hat nur Angst um Dinge, die zählen.']] },
    ] },
    ['kaya', 'Mission: Achtet diese Woche drauf, wo ihr Gefühle im Körper spürt.'],
  ],
  n3_foto: [
    ['erzaehler', 'Mittwoch, Kantine. Plötzlich vibrieren zwanzig Handys gleichzeitig.'],
    { szene: 'chat', id: 'milaFoto', def: MILA_FOTO,
      ausgang: (r) => (r.flags.klartext || r.flags.teilen ? 'gestoppt' : r.flags.milaPrivat ? 'privat' : r.flags.mitgemacht ? 'mitgemacht' : r.flags.beweis ? 'beweis' : 'still'),
      folgen: {
        gestoppt: { staerke: 'mut', herz: { mila: 2, ayla: 1, dario: -1 }, merke: ['milaGestoppt', 'campFeind'] },
        privat: { staerke: 'zuhoeren', herz: { mila: 2 }, merke: 'milaPrivat' },
        mitgemacht: { herz: { mila: -3, jo: 1, luca: 1 }, merke: 'milaGelacht' },
        beweis: { staerke: 'lesen', merke: ['beweisMila', 'spurUhrzeit'] },
        still: { merke: 'milaStill3' },
      } },
    ['erzaehler', 'Milas Platz ist leer. Ihr Tablett steht noch da. Der Würfel liegt daneben.'],
    { wahl: [
      { t: '(Den Würfel einstecken. Mila suchen.)', staerke: 'einbeziehen', herz: { mila: 1 }, merke: 'wuerfelMit', dann: [['erzaehler', 'Der Würfel ist warm. Sie hat ihn bis eben gedreht.']] },
      { t: '(Sitzen bleiben. Weiteressen.)', merke: 'sitzenGeblieben', dann: [['noah', '(leise) Sollen wir nicht …?'], ['erzaehler', 'Du isst weiter. Das Curry schmeckt nach nichts.']] },
    ] },
  ],
  n3_mila: [
    ['erzaehler', 'CDI, Leseecke. Mila sitzt auf dem Sofa. Kapuze auf.'],
    { tu: 'n3_milaStart' },
    { wahl: [
      { t: '(Hinsetzen. Nichts sagen.)', staerke: 'warten', herz: { mila: 2 }, dann: [
        ['erzaehler', 'Eine Minute. Mila atmet laut. Dann leiser.'],
        ['mila', 'Ich weiß nicht, was ich fühle. Alles gleichzeitig.'] ] },
      { t: '„Das Foto ist widerlich. Nicht du.“', staerke: 'klar', herz: { mila: 2 }, dann: [
        ['mila', 'Ekel. Gute Kategorie. Ich nehme sie.'], ['mila', 'Und Wut. Und … dass ich nicht mehr reingehen will.'] ] },
      { t: '„Komm, ist nur ein Foto. Morgen ist es vergessen.“', herz: { mila: -2 }, merke: 'milaAbgewiegelt', dann: [
        ['mila', 'Im Internet wird nichts vergessen. Das ist ein Fakt.'], ['erzaehler', 'Sie zieht die Kapuze tiefer.'] ] },
      { t: '„Willst du, dass ich wem Bescheid sag? Herrn Kuedes?“', staerke: 'hilfe', herz: { mila: 1, kaya: 1 }, merke: 'kuedesAngeboten', dann: [
        ['mila', 'Nicht jetzt. Vielleicht später. Wenn ich weiß, wer es war.'] ] },
    ] },
    ['mila', 'Das Foto ist von links unten. Wieder. Wie aus einer Tasche.'],
    ['mila', 'Links von mir saßen heute: Kenan. Und Dario.'],
    { wahl: [
      { t: '„Dario hatte schon das Noah-Foto auf dem Handy.“', wenn: (m) => m.spurFoto || m.darioGefragt || m.darioKonfrontiert || m.fotoGeschickt, staerke: 'lesen', herz: { mila: 2 }, merke: 'spurDario2', dann: [
        ['mila', '(setzt sich gerade hin) Zwei Datenpunkte. Das ist ein Muster.'], ['mila', 'Aber kein Beweis. Noch nicht.'] ] },
      { t: '„Wir finden raus, wer das ist. Zusammen.“', staerke: 'einbeziehen', herz: { mila: 2 }, merke: 'teamMila', dann: [
        ['mila', 'Ein Ermittlungsteam. Ich mache die Tabelle.'] ] },
      { t: '„Lass uns das nicht selbst machen. Zu riskant.“', herz: { mila: 1 }, dann: [['mila', 'Vielleicht hast du recht. Vielleicht.']] },
    ] },
  ],
  n3_klasse: [
    ['hoffmann', 'Ich hab das Foto gesehen. Ich sag dazu nur eins.'],
    ['hoffmann', 'Wer so was teilt, macht mit. Punkt. Jetzt Deutsch.'],
    ['erzaehler', 'Keiner redet. Die Luft ist dick. Du guckst dich um.'],
    { szene: 'lesen', id: 'klasseLesen', def: KLASSE_LESEN,
      ausgang: (r) => (r.richtig.includes('dario') ? 'dario' : r.richtig.length >= 2 ? 'gut' : 'schwer'),
      folgen: {
        dario: { staerke: 'lesen', merke: 'spurDarioAngst', dann: [['erzaehler', 'Dario sieht, dass du ihn ansiehst. Er geht. Schnell.']] },
        gut: { staerke: 'lesen' },
        schwer: { dann: [['erzaehler', 'Gesichter sind schwer heute. Alle tragen eine Maske.']] },
      } },
  ],
  n3_sportMorgen: [
    ['erzaehler', 'Freitag. Sportfest. Die ganze Annexe auf dem Platz.'],
    ['ben', 'Staffel, Leute! Wir sind die 7P2! Wir sind … schnell? Hoffentlich.'],
    ['jo', 'Ich hab trainiert, digga. Die ganze Woche. Wallah, wir gewinnen.'],
    ['noah', 'Ich laufe als Dritter. Ich hab Angst. Das ist Angst, oder? Wachhund?'],
  ],
  n3_staffel: [
    ['sommer', '(pfeift) Allez! Staffel 7P2: Jo, Ben, Noah, {name}. Auf die Plätze!'],
    { szene: 'pult', id: 'staffel', def: STAFFEL_PULT, ausgang: (r) => r.final,
      folgen: {
        wut: { herz: { noah: -1, jo: -1 }, merke: 'staffelWut' },
        trauer: { herz: { noah: 1 }, merke: 'staffelTrauer' },
        angst: { staerke: 'mut', merke: 'staffelAngst' },
        freude: { staerke: 'humor', herz: { noah: 2, ben: 2 }, merke: 'staffelFreude' },
      } },
    ['erzaehler', 'Ziel. Letzte. Jo kommt rüber. Er ist rot im Gesicht.'],
    { szene: 'hitze', id: 'joDuell', def: JO_DUELL, ausgang: joAusgang,
      folgen: {
        knall: { herz: { jo: -3, sommer: -1 }, merke: 'joKnall', dann: [['sommer', '(pfeift laut) SCHLUSS! Ihr zwei: Bank. Sofort.'], ['erzaehler', 'Bank. Fünf Minuten. Jo sitzt am anderen Ende.']] },
        versoehnt: { staerke: 'ruhig', herz: { jo: 3 }, merke: 'joVersoehnt', dann: [['jo', 'Nächstes Jahr. Training. Zusammen. Mit meinem Onkel. Abgemacht, digga.']] },
        abgekuehlt: { staerke: 'ruhig', herz: { jo: 1 }, dann: [['jo', 'Okay. Okay. Ich bin nur sauer. Nicht auf dich. Bisschen auf dich.']] },
        sauer: { herz: { jo: -1 }, merke: 'joSauer', dann: [['erzaehler', 'Jo geht. Er tritt gegen eine Wasserflasche. Sie fliegt weit.']] },
      } },
    { tu: 'n3_warnBilanz' },
    { szene: 'mischpult', id: 'misch', def: (m) => MISCH(m), ausgang: (r) => (r.gemischt ? 'gemischt' : 'eins'),
      folgen: {
        gemischt: { staerke: 'lesen', herz: { noah: 1 }, dann: [['noah', 'Mehrere Gefühle gleichzeitig. Wie ein Smoothie. Ein komischer.']] },
        eins: { dann: [['noah', 'Nur eins? Bei mir ist alles gleichzeitig. Wie Ben in der Pause.']] },
      } },
    { tu: 'n3_ende' },
  ],
};

export const tunN3 = (c) => ({
  n3_milaStart: () => (c.S.merke.milaPrivat ? [['mila', 'Du bist allein gekommen. Gut.']] : c.S.merke.milaGestoppt ? [['mila', 'Du hast im Chat was geschrieben. Ayla hat es mir gezeigt.']]
    : c.S.merke.milaGelacht ? [['mila', 'Du hast gelacht. Warum bist du hier?'], ['erzaehler', 'Sie guckt dich nicht an.']] : [['mila', '(guckt kurz hoch) Oh. Du.']]),
  n3_warnBilanz: () => {
    const n = ((c.S.sz || {}).joDuell || {}).bemerkt || 0;
    return n >= 2 ? [['erzaehler', 'Du hast deine Warnsignale gemerkt: heißes Gesicht, Fäuste, Herzklopfen. Bevor es kracht.']] : [];
  },
  n3_ende: () => [
    ['sommer', 'Letzte. Aber mit der lautesten Fankurve. Ben, du bist heiser.'],
    ['erzaehler', 'Auf dem Weg vom Platz. Mila zieht dich am Ärmel.'],
    ['mila', 'Guck. @annexe.cam hat vor fünf Minuten gepostet. Das Siegerteam.'],
    ['mila', 'Von links unten. Links von uns stand nur einer.'],
    ['mila', 'Mit dem Handy in der Tasche.'],
    ['erzaehler', 'Dario. Er dreht sich um. Er sieht, dass ihr ihn seht.'],
    { szene: 'stempel', def: { modul: 'Modul 2 · Gefühle verstehen', titel: 'Gefühle gelesen',
      gelernt: ['Sechs Grundgefühle und ihre Botschaft', 'Gefühle ohne Worte erkannt', 'Gesehen: Wer am Steuer sitzt, ändert alles', 'Warnsignale im Körper bemerkt', 'Mehrere Gefühle gleichzeitig eingestellt'],
      mission: 'Merk dir diese Woche einmal, wo du ein Gefühl im Körper spürst – bevor du reagierst.' }, folgen: {} },
    { tu: 'kapitelEnde' },
  ],
});
