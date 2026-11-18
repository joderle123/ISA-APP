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
  { id: 'k3_schatten', kap: 3, tag: 'Freitag', uhr: 11.2, titel: 'Im Schatten', ziel: 'Ayla winkt dich unter den Baum. Sie hat eine Idee.', marker: 'ayla',
    start: {},
    leute: { ayla: [-76.4, -9.2, 0.9], noah: [-77.6, -8.4, 1.4, 'sitzt'], ben: [-78.6, -9.6, 1.2, 'sitzt'], mila: [-79.4, -7.8, 1.6, 'sitzt'], jo: [-80.6, -6.4, 1.8] },
    fertig: { reden: 'ayla', gespraech: 'n3_schatten' } },
];

// ---------- Pantomime-Duell (Kurs E07): Gefühle ohne Worte erkennen ----------
const PANTOMIME = {
  wo: 'Aula · Pantomime-Duell', titel: 'Welches Gefühl spielt die Person?',
  leute: [
    { wer: F.ben, zeichen: ['riesiges Grinsen', 'reißt die Arme hoch', 'springt hoch'], gefuehl: 'freude', aufloesung: 'Ben spielt Freude. Er hat an Nuggets gedacht.' },
    { wer: F.ayla, zeichen: ['zieht die Nase kraus', 'Hand vor dem Mund', 'dreht sich weg'], gefuehl: 'ekel', aufloesung: 'Ekel. Sie hat an Kantinen-Fisch gedacht.' },
    { wer: F.jo, zeichen: ['Kiefer fest, Augenbrauen runter', 'Fäuste', 'stampft einmal auf'], gefuehl: 'wut', aufloesung: 'Wut. „Wie wenn einer dein Auto zerkratzt, digga.“' },
    { wer: F.lina, zeichen: ['Augen weit, guckt zur Tür', 'Hände nah am Gesicht', 'Schultern hoch, ganz klein'], gefuehl: 'angst', aufloesung: 'Angst. Lina spielt sie sehr echt. Alle sind leise.' },
    { wer: F.yusuf, zeichen: ['Mundwinkel runter', 'Arme hängen', 'Kopf runter, langsame Schritte'], gefuehl: 'trauer', aufloesung: 'Trauer. Yusuf: „Wie wenn das Training ausfällt.“' },
    { wer: F.noah, zeichen: ['Augen riesig, Mund offen', 'Hände nach vorn', 'springt einen Schritt zurück'], gefuehl: 'ueberraschung', aufloesung: 'Überraschung. Noah: „Wie wenn ich mal treffe.“' },
  ],
};

// ---------- Gefühlswörter in sechs Ecken (Kurs E07) ----------
const ECKEN = {
  wo: 'Aula · Sechs Ecken', titel: 'Wohin gehört das Wort?', zeit: 7,
  info: 'Herr Kuedes ruft ein Wort. Du läufst in die Ecke, in die es gehört. Manche Wörter passen in zwei.',
  faecher: [['freude', 'Freude', '😄', '#f2b134'], ['trauer', 'Trauer', '😢', '#4f88c8'], ['wut', 'Wut', '😠', '#d6452f'], ['angst', 'Angst', '😨', '#8a7bc8'], ['ekel', 'Ekel', '🤢', '#5fa04a'], ['ueberraschung', 'Überraschung', '😲', '#e9734a']].map(([id, t, sy, f]) => ({ id, t, sy, f })),
  karten: [
    { t: 'genervt', ziel: 'wut' },
    { t: 'nervös', ziel: 'angst', wer: F.noah, sagt: 'Das bin ich. Jeden Morgen. Halb acht.' },
    { t: 'enttäuscht', ziel: ['trauer', 'wut'] },
    { t: 'baff', ziel: 'ueberraschung', wer: F.ben, sagt: 'Baff ist mein Lieblingswort. Baff. Baff.' },
    { t: 'eifersüchtig', ziel: null, wer: F.mila, sagt: 'Mischung. Wut, Angst, Trauer. Ein Cocktail.' },
    { t: 'angewidert', ziel: 'ekel' },
    { t: 'peinlich berührt', ziel: null, wer: F.ayla, sagt: 'Scham. Die hat keine eigene Ecke. Unfair.' },
    { t: 'gelangweilt', ziel: null, wer: F.ben, sagt: 'Gefühl oder Zustand? Das ist Philosophie.' },
    { t: 'beleidigt', ziel: ['wut', 'trauer'], wer: F.jo, sagt: 'Beleidigt ist Wut mit Handbremse, digga.' },
  ],
  ende: 'Viele Wörter, sechs Ecken. Je genauer das Wort, desto besser weiß man, was man braucht.',
};

// ---------- Körper-Karte vor der Staffel (Kurs E09: Wo spüre ich Gefühle?) ----------
const KOERPER_STAFFEL = {
  wo: 'Sportfest · zwei Minuten vor dem Start',
  frage: 'Gleich startet die Staffel. Du läufst die letzte Runde. Wo spürst du die Aufregung?',
  vergleich: [
    { wer: F.noah, zonen: ['beine'], satz: 'Bei mir: Knie. Komplett. Wie Pudding.' },
    { wer: F.mila, zonen: ['bauch'], satz: 'Bauch. Wie Würfel drehen. Nur innen.' },
    { wer: F.jo, zonen: ['haende', 'brust'], satz: 'Hände. Und Brust. Ich will einfach los, digga.' },
  ],
};

// ---------- Synchronstudio nach dem Sportfest (Kurs E07): „Wir sind Letzte.“ ----------
const SYNCHRON = {
  wo: 'Sportfest · Schatten unter dem Baum', satz: 'Wir sind Letzte.',
  takes: [
    { wer: F.ben, gefuehl: 'freude', regie: 'laut, schnell, Stimme geht hoch' },
    { wer: F.noah, gefuehl: 'trauer', regie: 'sehr leise, langsam, lange Pause' },
    { wer: F.jo, gefuehl: 'wut', regie: 'laut, jedes Wort hart und kurz' },
    { wer: F.mila, gefuehl: 'ueberraschung', regie: 'hoch, Pause vor „Letzte“, dann lauter' },
    { wer: F.ayla, gefuehl: 'ekel', regie: 'tief, zieht „Leeetzte“ in die Länge' },
  ],
  reaktion: {
    freude: [F.ben, 'JA! Letzte mit Stil! Das ist der Geist!'],
    trauer: [F.noah, '(nickt) Ja. So fühlt es sich an. Ein bisschen.'],
    wut: [F.jo, 'Siehste. So hab ich’s gemeint. Danke.'],
    angst: [F.mila, 'Angst? Wovor? … Vor Montag. Verstehe. Alle reden darüber.'],
    ekel: [F.ayla, 'Haha, wie Kantinen-Fisch. Perfekt.'],
    ueberraschung: [F.mila, 'Überraschung ist statistisch falsch. Wir waren immer Letzte.'],
  },
};

// ---------- Spuren-Wand mit Mila im CDI (Kurs E28: Fakten statt Gerüchte) ----------
const SPUREN = (m) => ({
  wo: 'CDI · Leseecke', helfer: F.mila,
  frage: 'Mila holt Post-its aus der Tasche. „Was wissen wir WIRKLICH? Nur Fakten an die Wand.“',
  spuren: [
    { id: 'winkel', sy: '📐', t: 'Beide Fotos sind von links unten gemacht. Sitzhöhe.', kurz: 'Winkel: links unten', echt: true,
      kommentar: ['Fakt. Zweimal derselbe Winkel. Das ist ein Muster.', 'Doch. Das ist das Wichtigste. Zweimal derselbe Winkel.'] },
    { id: 'jo', sy: '😂', t: 'Jo hat den Sticker mit „wallah“ gefeiert.', kurz: 'Jo hat gelacht', echt: false,
      kommentar: ['Richtig. Lachen ist mies. Aber Lachen ist nicht Machen.', 'Lachen ist nicht Machen. Das gehört nicht an diese Wand.'] },
    { id: 'skate', sy: '🛹', t: 'Im Mila-Foto spiegelt sich ein Stück Griptape in der Fensterscheibe.', kurz: 'Griptape im Fenster', echt: true,
      kommentar: ['Griptape. Skateboard. Gut gesehen.', 'Doch, das zählt. Griptape ist ein Skateboard. Wer hat eins in der Kantine?'] },
    { id: 'luca', sy: '💬', t: 'Luca schreibt unter jeden Post „lowkey stimmt“.', kurz: 'Luca kommentiert', echt: false,
      kommentar: ['Kommentieren ist nicht Posten. Nervig. Aber kein Beweis.', 'Kommentieren ist nicht Posten. Weg damit.'] },
    { id: 'zeit', sy: '🕐', t: 'Der Account postet nie während des Unterrichts.', kurz: 'nie im Unterricht', echt: true,
      kommentar: ['Fakt. Bis jetzt. Jemand, der im Unterricht nicht ans Handy kann.', 'Doch. Das heißt: jemand mit Stundenplan. Jemand von hier.'] },
    ...(m.spurFoto || m.darioGefragt || m.darioKonfrontiert || m.fotoGeschickt || m.darioTief ? [
      { id: 'dario', sy: '📱', t: 'Dario hatte das Original – ohne den Listen-Text.', kurz: 'Dario hatte das Original', echt: true,
        kommentar: ['Nicht den Post. Das Original. Das beweist nichts. Aber es ist eine Spur.', 'Doch. Nicht den Post – das Original. Das ist eine Spur.'] }] : []),
    { id: 'chiara', sy: '🤐', t: 'Chiara war nicht auf der Liste.', kurz: 'Chiara nicht auf der Liste', echt: false,
      kommentar: ['Nicht auf der Liste sein beweist nichts. Sonst wär die halbe Annexe verdächtig.', 'Weg damit. Nicht auf einer Liste sein beweist gar nichts.'] },
  ],
  frageEnde: 'Okay. Was sagt die Wand? Nur, was wir belegen können.',
  schluesse: [
    { key: 'skate', t: 'Jemand von der Skate-Ecke. Sitzt links. Postet in Pausen.', braucht: ['winkel', 'skate', 'zeit'], antwort: 'Das ist eingegrenzt. Nicht bewiesen. Wir beobachten. Wir beschuldigen niemanden.' },
    { key: 'dario', t: 'Dario. Fertig. Wir sagen es allen.', braucht: ['dario'], antwort: '(schüttelt den Kopf) Wenn wir falsch liegen, sind WIR @annexe.cam.' },
    { key: 'jo', t: 'Jo. Er hat zuerst geteilt.', braucht: ['jo'], antwort: 'Jo ist laut. Laut ist nicht schuldig.' },
    { key: 'offen', t: 'Wir wissen es noch nicht. Weiter Fakten sammeln.', braucht: [], antwort: 'Langweilig. Aber richtig.' },
  ],
});

// ---------- @annexe.cam: Mila beim Essen ----------
const MILA_FOTO = {
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Luca hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Mila redet mit Tauben', text: 'mila interviewt tauben 💀 sticker kommt gleich', lacher: { start: 5, proSek: 0.5, stopp: 'gestoppt' } },
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
    { id: 'privat', t: 'Mila privat schreiben', symbol: '🔒', setzt: 'milaPrivat', ich: '(privat an Mila) wo bist du? ich komm', folgen: [{ nach: 3, wer: 'Mila (privat)', text: 'CDI. Leseecke. Bitte nicht mit der ganzen Klasse.' }] },
    { id: 'screenshot', t: 'Screenshot (Beweis)', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. Uhrzeit 12:14.' },
    { id: 'lachen', t: 'Mitlachen', symbol: '😂', setzt: 'mitgemacht', ich: '😂' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Gesichter lesen im Saal (Kurs E09 Statuen): wer fühlt was? Dario ist die Spur ----------
const KLASSE_LESEN = {
  wo: 'Saal 1.04 · Standbild', titel: 'Wer fühlt was?',
  leute: [
    { wer: F.mila, zeichen: ['Gesicht rot', 'dreht den Würfel nicht', 'Kapuze auf'], gefuehl: ['wut', 'trauer'], aufloesung: 'Mila: Wut und Scham gleichzeitig. Man sieht beides.' },
    { wer: F.jo, zeichen: ['grinst noch, guckt dann weg', 'trommelt mit dem Stift', 'rutscht auf dem Stuhl'], gefuehl: ['freude', 'angst'], aufloesung: 'Jo: erst lustig, jetzt mulmig. Er hat über den Sticker gelacht.' },
    { wer: F.dario, zeichen: ['schaut nie zu Mila', 'Handy in der Faust', 'steht in der Tür, Bein wippt'], gefuehl: 'angst', aufloesung: 'Dario hat Angst. Wovor? Er ist nicht mal in dieser Klasse.' },
  ],
};

// ---------- Gefühls-Pult beim Sportfest (Kurs E08): der Stab fällt ----------
const STAFFEL_PULT = {
  wo: 'Sportfest · Staffel',
  szene: 'Letzter Wechsel. Noah kommt angerannt. Du greifst nach dem Stab. Er fällt. Alle Teams laufen vorbei.',
  versionen: {
    wut: [['du', '(reißt den Stab hoch) MANN! … LAUF, NOAH! LAUF!'], ['erzaehler', 'Ihr rennt wie verrückt. Ihr überholt eine Gruppe.'], ['jo', 'Digga, was war DAS? Weiter!']],
    trauer: [['erzaehler', 'Du hebst den Stab auf. Gehst. Ins Ziel. Als Letzte Person.'], ['noah', '(leise) Hey. Ist nur ein Stab.']],
    angst: [['erzaehler', 'Alle gucken. Du willst unsichtbar sein. Du läufst trotzdem.'], ['ben', '(von der Seite) WEITER! WEITER!']],
    freude: [['du', '(lachst) Okay! Neuer Plan: Wir gewinnen den Stil-Preis!'], ['noah', '(lacht mit) Wir sind so schlecht!'], ['ben', 'Stil-Preis! Sein Vater!']],
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
        { t: '„Echt? Das wusste ich nicht. Das ist mies.“', stimme: 'kopf', art: 'klar', hitze: -16, respekt: 2, antwort: '(überrascht) … Ja. Auf dem Bolzplatz. Jeden Abend.' },
        { t: '„Merkt man nicht.“', stimme: 'stolz', art: 'angriff', hitze: 32, antwort: 'WAS?!' },
        { t: '„Nächstes Jahr trainieren wir zusammen.“', art: 'witz', hitze: -14, respekt: 1, antwort: '(schnaubt) Du kannst ja nicht mal einen Stab halten.' },
      ], still: { hitze: 4, antwort: 'Egal. Vergiss es.' } },
    { sagt: '…', wenn: (z) => z.hitze > 25, warn: 'Dein Herz klopft laut', skill: '(Zehn Sekunden. Nichts sagen. Atmen.)', skillAntwort: '(atmet auch) … Okay. Sorry, dass ich so laut war.',
      karten: [
        { t: '„Sorry für den Stab. Ehrlich.“', stimme: 'kopf', art: 'klar', hitze: -20, respekt: 2, antwort: '… Okay. Und sorry für „wegen dir“.' },
        { t: '„Stopp. Abstand.“ (Er kommt sehr nah.)', stimme: 'kopf', art: 'klar', hitze: -6, respekt: 1, antwort: '… Okay. Abstand. Hab’s gecheckt.' },
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
    ['kaya', 'Jetzt kommt Bewegung rein. Sechs Ecken. Ich rufe ein Wort, ihr lauft.'],
    { szene: 'sort', id: 'ecken', def: ECKEN,
      ausgang: (r) => (r.offen <= 2 ? 'genau' : 'schnell'),
      folgen: { genau: { merke: 'eckenGenau' }, schnell: { dann: [['kaya', 'Manche Wörter passen in keine Ecke. Das ist kein Fehler.']] } } },
    ['kaya', 'Abstimmung. Wenn ein Gefühl rausfliegen müsste – welches?'],
    { wahl: [
      { t: 'Angst. Die nervt am meisten.', merke: 'rausAngst', dann: [['noah', 'Dann wär ich ganz ruhig. Und würde Jos Fahrrad ohne Bremsen testen.']] },
      { t: 'Wut. Die macht nur Stress.', merke: 'rausWut', dann: [['jo', 'Ohne Wut hätte ich mich nie gewehrt. Nie.']] },
      { t: 'Trauer. Die braucht keiner.', merke: 'rausTrauer', dann: [['ayla', 'Ohne Trauer gäb’s keine guten Songs. Null.']] },
      { t: 'Keins.', merke: 'rausKeins', dann: [['kaya', 'Ihr ahnt es. Jedes hat einen Job. Auch die unbequemen.']] },
    ] },
    ['kaya', 'Angst ist ein Wachhund. Manchmal bellt er den Postboten an.'],
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
      { t: '„Lass uns das nicht selbst machen. Zu riskant.“', herz: { mila: 1 }, merke: 'nichtSelbst', dann: [['mila', 'Vielleicht hast du recht. Vielleicht.'], ['mila', 'Aber Fakten sortieren ist nicht gefährlich. Nur denken.']] },
    ] },
    { szene: 'spuren', id: 'spuren', def: (m) => SPUREN(m), ausgang: (r) => r.schluss,
      folgen: {
        skate: { staerke: 'lesen', herz: { mila: 2 }, merke: ['spurSkate', 'wandSauber'] },
        dario: { herz: { mila: -1 }, merke: 'vorschnellDario', dann: [['mila', 'Wir warten. Versprochen? Ich schreib’s in die Tabelle: „Versprochen.“']] },
        jo: { herz: { mila: -1, jo: -1 }, merke: 'vorschnellJo', dann: [['mila', 'Jo nervt. Aber Nerven ist kein Beweis.']] },
        offen: { herz: { mila: 1 }, merke: 'wandOffen' },
      } },
    { tu: 'n3_wandBilanz' },
  ],
  n3_klasse: [
    ['hoffmann', 'Ich hab das Foto gesehen. Ich hab’s Herrn Kuedes gegeben. Heute noch.'],
    ['hoffmann', 'Jetzt Deutsch. Ja, Chiara: Seite 12.'],
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
    ['jo', 'Ich hab trainiert. Die ganze Woche. Wir gewinnen.'],
    ['noah', 'Ich laufe als Dritter. Ich hab Angst. Das ist Angst, oder? Wachhund?'],
    ['ayla', 'Herr Kuedes hat gesagt: Achtet drauf, wo ihr es spürt. Also?'],
    { szene: 'koerper', id: 'koerper', def: KOERPER_STAFFEL, ausgang: (r) => (r.zonen.includes('nirgends') ? 'unklar' : 'gespuert'),
      folgen: {
        gespuert: { staerke: 'lesen', herz: { noah: 1 }, merke: 'koerperGespuert', dann: [['noah', 'Wenn man’s weiß, ist es ein bisschen weniger. Komisch.']] },
        unklar: { dann: [['mila', 'Weiß nicht ist auch eine Messung. Vielleicht merkst du’s beim Laufen.']] },
      } },
  ],
  n3_staffel: [
    ['sommer', '(pfeift) Allez! Staffel 7P2: Jo, Ben, Noah, {name}. Auf die Plätze!'],
    { szene: 'pult', id: 'staffel', def: STAFFEL_PULT, ausgang: (r) => r.final,
      folgen: {
        wut: { herz: { jo: 1 }, merke: 'staffelWut' },
        trauer: { herz: { noah: 1 }, merke: 'staffelTrauer' },
        angst: { herz: { ben: 1 }, merke: 'staffelAngst' },
        freude: { herz: { noah: 1 }, merke: 'staffelFreude' },
      } },
    ['erzaehler', 'Ziel. Letzte. Jo kommt rüber. Er ist rot im Gesicht.'],
    { szene: 'hitze', id: 'joDuell', def: JO_DUELL, ausgang: joAusgang,
      folgen: {
        knall: { herz: { jo: -3, sommer: -1 }, merke: 'joKnall', dann: [['sommer', '(pfeift laut) SCHLUSS! Ihr zwei: Bank. Sofort.'], ['erzaehler', 'Bank. Fünf Minuten. Jo sitzt am anderen Ende.']] },
        versoehnt: { staerke: 'ruhig', herz: { jo: 3 }, merke: 'joVersoehnt', dann: [['jo', 'Nächstes Jahr. Training. Zusammen. Bolzplatz. Abgemacht.']] },
        abgekuehlt: { staerke: 'ruhig', herz: { jo: 1 }, dann: [['jo', 'Okay. Okay. Ich bin nur sauer. Nicht auf dich. Bisschen auf dich.']] },
        sauer: { herz: { jo: -1 }, merke: 'joSauer', dann: [['erzaehler', 'Jo geht. Er tritt gegen eine Wasserflasche. Sie fliegt weit.']] },
      } },
    { tu: 'n3_warnBilanz' },
  ],
  n3_schatten: [
    ['erzaehler', 'Pause im Schatten. Ayla hält ihr Handy wie ein Mikrofon.'],
    ['ayla', 'Synchronstudio. Ein Satz. Jeder spricht ihn anders. Ihr ratet das Gefühl.'],
    { szene: 'synchron', id: 'synchron', def: SYNCHRON, ausgang: (r) => (r.richtig >= 3 ? 'gut' : 'mittel'),
      folgen: {
        gut: { staerke: 'lesen', herz: { ayla: 1, ben: 1 }, merke: 'synchronGut', dann: [['ayla', 'Du hörst, wie was gesagt wird. Nicht nur was. Band-Ohr.']] },
        mittel: { herz: { ayla: 1 }, dann: [['ben', 'Stimmen sind schwer. Ich hab bei mir selbst falsch geraten.']] },
      } },
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
  n3_wandBilanz: () => {
    const r = (c.S.sz || {}).spuren || {};
    return r.heringe >= 2 ? [['mila', 'Ein paar Zettel wackeln. Gerüchte sehen aus wie Fakten. Das ist gefährlich.']]
      : [['mila', '(macht ein Foto von der Wand) Für die Tabelle. Danke. Wirklich.']];
  },
  n3_warnBilanz: () => {
    const n = ((c.S.sz || {}).joDuell || {}).bemerkt || 0;
    return n >= 2 ? [['erzaehler', 'Du hast deine Warnsignale gemerkt: heißes Gesicht, Fäuste, Herzklopfen. Bevor es kracht.']] : [];
  },
  n3_ende: () => [
    ['sommer', 'Letzte. Aber mit der lautesten Fankurve. Ben, du bist heiser.'],
    ['erzaehler', 'Mila zieht dich am Ärmel.'],
    ['mila', 'Guck. #3 ist da. Vor fünf Minuten.'],
    ['mila', '„#3 der langweiligsten: die 7P2-Staffel. Letzte. 💀“'],
    ['mila', 'Von links unten. Links von uns standen drei.'],
    ['erzaehler', 'Dario. Kenan. Luca. Luca grinst. Dario nicht.'],
    { szene: 'stempel', def: { modul: 'Modul 2 · Gefühle verstehen', titel: 'Gefühle gelesen',
      gelernt: ['Sechs Grundgefühle und ihre Botschaft', 'Gefühle ohne Worte erkannt', 'Gesehen: Wer am Steuer sitzt, ändert alles', 'Warnsignale im Körper bemerkt', 'Gefühle im Körper gefunden', 'Fakten von Gerüchten getrennt', 'Mehrere Gefühle gleichzeitig eingestellt'],
      mission: 'Merk dir diese Woche einmal, wo du ein Gefühl im Körper spürst – bevor du reagierst.' }, folgen: {} },
    { tu: 'kapitelEnde' },
  ],
});
