// Drei Jahre Annexe – 7ème, Kapitel 8 „Digitale Welt“ (Kurs Jahr 1, Modul 7: E27 Social Media und ich – Algorithmus,
// Wenn-dann-Satz; E28 Echt oder fake? KI und Fake News – Bilder-Wette, Teilen-Bremse, Grenz-Linie).
// Faden @annexe.cam: Ein KI-Video von Mme Tidderich. Die Klasse stellt eine ehrliche Falle (keine Lüge, mit Erlaubnis).
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' } };

export const SCHRITTE_N8 = [
  { id: 'k8_video', kap: 8, tag: 'Montag', uhr: 7.6, titel: 'Das Video', ziel: 'Mila steht am Eingang. Sie hält ihr Handy hoch.', marker: 'mila',
    start: { teleport: 'eingangHof', gespraech: 'n8_chat' },
    leute: { mila: [0.8, 16.6, 0.4], ben: [2.2, 17.2, -0.4] },
    fertig: { reden: 'mila', gespraech: 'n8_mila' } },
  { id: 'k8_skills', kap: 8, tag: 'Montag', uhr: 9.9, titel: 'Skills: Echt oder KI?', ziel: 'Aula. An der Wand hängen Fotos. Manche sind gar keine.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n8_skills' } },
  { id: 'k8_tidderich', kap: 8, tag: 'Dienstag', uhr: 8.05, titel: 'Mme Tidderich', ziel: 'Saal 1.04. Mme Tidderich ist heute sehr still.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n8_tidderich' } },
  { id: 'k8_falle', kap: 8, tag: 'Mittwoch', uhr: 12.4, titel: 'Die ehrliche Falle', ziel: 'CDI. Mila und Ben haben einen Plan. Ben hat Kekse.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'], ben: [-4.8, -22.4, -1.2] },
    fertig: { reden: 'mila', gespraech: 'n8_falle' } },
  { id: 'k8_freitag', kap: 8, tag: 'Freitag', uhr: 10.0, titel: 'Die Falle schnappt zu', ziel: 'Aula. Herr Kuedes will alle sehen. Dein Handy vibriert.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n8_post' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n8_ende' } },
];

// ---------- Das KI-Video im Klassenchat (Teilen-Bremse, E28) ----------
const VIDEO = {
  titel: '7P2 😎 (offiziell)', mitglieder: 18, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ayla hat dich wieder zur Gruppe hinzugefügt.' },
    { nach: 1.6, wer: 'Chiara', bild: 'Mme Tidderich tanzt, Enten-Krawatte. KI-Stimme: „7P2 ist meine dümmste Klasse.“', text: 'habt ihr DAS gesehen 😳', lacher: { start: 6, proSek: 0.6, stopp: 'gebremst' } },
    { nach: 4, wer: 'Jo', text: 'wallah das ist so lustig 💀' },
    { nach: 6, wer: 'Ben', text: 'DAS IST KI. in 1.04 steht gar kein pult am fenster!!' },
    { nach: 8.5, wer: 'Yusuf', text: 'echt jetzt? sieht echt aus' },
    { nach: 11, system: true, text: 'Das Video wurde 312-mal geteilt.' },
    { nach: 13.5, wer: 'Lina', text: 'Sie hatte Freitag ganz rote Augen.', wennNicht: 'stumm' },
    { nach: 17, wer: 'Jo', text: '… oh. okay. ich lösch mein ❤️' },
    { nach: 20, wer: 'Mila', text: 'Fakt: Das ist KI. Fakt: Sie ist echt. Teilen = mitmachen.' },
    { nach: 23, wer: 'Ayla', text: 'spionin-bericht: luca schrieb samstag „video kommt 🎬“' },
  ],
  aktionen: [
    { id: 'teilen', t: 'Teilen', symbol: '↗️', wahl: [
      { t: '(Trotzdem teilen. Ist doch lustig.)', setzt: 'geteilt', ich: '↗️ geteilt', folgen: [{ nach: 1, system: true, text: 'Geteilt. 313.' }] },
      { t: '(Bremsen. Nicht teilen.)', setzt: ['gebremst', 'bremse'], sys: 'Nicht geteilt. Die Zahl bleibt bei 312. Wegen dir.' },
    ] },
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Das ist KI. Und es ist gemein. Hört auf zu teilen.“', setzt: ['gebremst', 'klartext'], ich: 'das ist ki. und es ist gemein. hört auf zu teilen', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'danke. genau' }, { nach: 2.6, wer: 'Yusuf', text: 'oh. ok. gelöscht' }] },
      { t: '„haha die ente 💀“', setzt: 'mitgelacht', ich: 'haha die ente 💀', folgen: [{ nach: 1.1, wer: 'Jo', text: 'die ENTE' }] },
    ] },
    { id: 'melden', t: 'Video melden', symbol: '🚩', setzt: ['gemeldet', 'gebremst'], sys: 'Gemeldet als „gefälschter Inhalt“.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Echt oder KI? (E28 Bilder-Wette) ----------
const ECHT_KI = {
  wo: 'Aula · Bilder-Wette', titel: 'Echt oder KI?', zeit: 20,
  info: 'Woher kommt das Bild? Das zählt mehr als Hingucken.',
  faecher: [{ id: 'echt', t: 'Echt', sy: '📷', f: '#3fa66b' }, { id: 'ki', t: 'KI', sy: '🤖', f: '#8a7bc8' }, { id: 'offen', t: 'Weiß ich nicht', sy: '❓', f: '#8a93a3' }],
  karten: [
    { t: '🎥 Ein Star sagt was Krasses. Kein Sender. Keine Quelle.', ziel: 'offen', hinter: 'Ohne Quelle weißt du es nicht. Erst prüfen.' },
    { t: '🏫 Die Annexe im Regen. Ein Fenster ist schief, die Pfütze spiegelt richtig.', ziel: 'echt', hinter: 'Spiegelung passt. Schiefe Fenster gibt’s auch echt.' },
    { t: '🪧 Ein Schild: „ANNXEE JUNGLNSTR“.', ziel: 'ki', hinter: 'Kann KI sein. Gute KI schreibt aber richtig. Quelle prüfen.' },
    { t: '🐦 Gerd die Taube. Eine Feder steht ab. Hinten ein unscharfer Mülleimer.', ziel: 'echt', hinter: 'Kleine Unordnung. Echte Fotos sind selten perfekt.' },
    { t: '😀 Ein Gesicht. Der Ohrring links ist rund, rechts eckig.', ziel: 'ki', hinter: 'Kann KI sein. Oder Mode. Ohne Quelle: offen.' },
    { t: '🌇 Sonnenuntergang. Drei Schatten zeigen in drei Richtungen.', ziel: 'ki', hinter: 'Eine Sonne, ein Schattenwurf. Hier stimmt’s nicht.' },
    { t: '🍝 Chiaras Pasta. Ein Fleck auf dem Tisch.', ziel: 'echt', hinter: 'Echte Flecken. Echte Pasta.' },
  ],
  ende: 'Nicht jedes KI-Bild erkennt man. Darum: erst bremsen, dann teilen.',
};

// ---------- Feed (E27) ----------
const FEED = {
  wo: 'Aula · Wer bestimmt deinen Feed?', runden: 10,
  arten: { drama: ['Drama', '#d6452f'], lustig: ['Lustiges', '#f2b134'], freunde: ['Freunde', '#3f78b8'], sport: ['Sport', '#3fa66b'], lernen: ['Wissen', '#8a7bc8'] },
  posts: [
    { art: 'drama', sy: '😱', t: 'Wer hat wen entfolgt? Die Liste!' }, { art: 'drama', sy: '🔥', t: 'Streit im Kommentar. 2000 Antworten.' }, { art: 'drama', sy: '😤', t: 'Sie hat WAS gesagt??' },
    { art: 'drama', sy: '🫢', t: 'Exposed: Das hat keiner gewusst.' }, { art: 'lustig', sy: '🐈', t: 'Katze fällt vom Sofa. Elegant.' }, { art: 'lustig', sy: '🦆', t: 'Ente jagt Fahrrad.' },
    { art: 'lustig', sy: '🤣', t: 'Opa versucht Trend-Tanz.' }, { art: 'freunde', sy: '🎸', t: 'Ayla: neuer Song, Treppenhaus-Version.' }, { art: 'freunde', sy: '🧱', t: 'Noah: Glockenturm, Teil 2.' },
    { art: 'sport', sy: '🏀', t: 'Trickwurf von der Mittellinie.' }, { art: 'sport', sy: '🛹', t: 'Kickflip in Zeitlupe.' }, { art: 'lernen', sy: '🧠', t: 'Warum Tauben nicken.' },
    { art: 'lernen', sy: '🌍', t: 'Luxemburg von oben. In 60 Sekunden.' }, { art: 'drama', sy: '💔', t: 'Paar trennt sich live.' }, { art: 'lustig', sy: '🐶', t: 'Hund isst Ladekabel. Keks?' },
  ],
};

// ---------- KI: geht klar oder gar nicht? (E28 Grenz-Linie) ----------
const GRENZE = {
  wo: 'Saal 1.04 · Grenz-Linie', titel: 'KI: geht klar oder gar nicht?', zeit: 9,
  info: 'Mme Tidderich liest vor. Wo stehst du?',
  faecher: [{ id: 'klar', t: 'Geht klar', sy: '✅', f: '#3fa66b' }, { id: 'kommt', t: 'Kommt drauf an', sy: '🤔', f: '#e9a23b' }, { id: 'nein', t: 'Geht gar nicht', sy: '⛔', f: '#d6452f' }],
  karten: [
    { t: 'Mir eine Matheaufgabe von KI erklären lassen.', ziel: ['kommt', 'klar'], wer: F.mila, sagt: 'Klar. Aber KI irrt sich. Nachrechnen.' },
    { t: 'Den Aufsatz von KI schreiben lassen und abgeben.', ziel: ['nein', 'kommt'], wer: F.mila, sagt: 'Dann lernt die KI. Nicht ich.' },
    { t: 'Ein Bild von mir selbst als Astronaut.', ziel: ['kommt', 'klar'], wer: F.ben, sagt: 'Mein Gesicht in eine App? Erst fragen, wer es behält.' },
    { t: 'Ein Foto von einer Mitschülerin verändern. Ohne zu fragen.', ziel: 'nein' },
    { t: 'Die Stimme einer Lehrerin nachmachen. Für einen Witz.', ziel: 'nein', wer: F.lina, sagt: 'Mme Tidderich hatte rote Augen. Kein Witz.' },
    { t: 'Einen Text übersetzen lassen.', ziel: ['kommt', 'klar'] },
    { t: 'Ein KI-Bild posten und dazuschreiben: „mit KI gemacht“.', ziel: ['kommt', 'klar'] },
  ],
  ende: 'Fake-Videos von echten Menschen sind Mobbing. Oft auch verboten.',
};

// ---------- Die Falle schnappt zu ----------
const BDAY = {
  titel: '@annexe.cam · Story', mitglieder: 0, dauer: 18,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Freitag, 9:48. @annexe.cam hat eine Story gepostet.' },
    { nach: 1.8, wer: '@annexe.cam', bild: 'Ben am Korb, von hinten', text: 'happy bday ben 🎂📷 alt wirst du' },
    { nach: 5, wer: 'Mila (privat)', text: 'Das wusste nur Luca. Ben hat es sonst niemandem gesagt.' },
    { nach: 9, wer: 'Ben (privat)', text: 'ICH HAB GEBURTSTAG UND HABE EINEN TÄTER. bestes geschenk' },
    { nach: 12, wer: 'Mila (privat)', text: 'Jetzt: nicht posten. Nicht drohen. Herr Kuedes. Heute noch.' },
  ],
  aktionen: [
    { id: 'laut', t: 'In den Klassenchat: LUCA IST ES', symbol: '📣', setzt: 'chatLuca', ich: 'LUCA IST ES. beweis kommt', folgen: [{ nach: 1.6, wer: 'Mila (privat)', text: 'Lösch das. Sonst bist du jetzt der Account.' }] },
    { id: 'luca', t: 'Luca privat schreiben', symbol: '✉️', setzt: 'lucaPrivat', ich: 'ich weiß, dass du es bist', folgen: [{ nach: 1.6, wer: 'Luca (privat)', text: 'beweis es 😇' }] },
    { id: 'weg', t: 'Zu Herrn Kuedes', symbol: '🚪', setzt: 'zuKuedes', sys: 'Du steckst das Handy ein. Dein Herz klopft. Aber du weißt, wohin.', ende: true }],
};

export const GESPRAECHE_N8 = {
  n8_chat: [
    ['erzaehler', 'Montag, 7:31. Du bist wieder in der Klassengruppe. Ayla hat dich zurückgeholt.'],
    { szene: 'chat', id: 'video', def: VIDEO,
      ausgang: (r) => (r.flags.geteilt ? 'geteilt' : r.flags.klartext ? 'klartext' : r.flags.bremse || r.flags.gemeldet ? 'gebremst' : r.flags.mitgelacht ? 'gelacht' : 'still'),
      folgen: {
        geteilt: { herz: { ayla: -1, lina: -1 }, merke: 'videoGeteilt' },
        klartext: { staerke: 'mut', herz: { ayla: 1, lina: 1, ben: 1 }, merke: 'videoKlartext' },
        gebremst: { staerke: 'lesen', herz: { mila: 1 }, merke: 'videoGebremst' },
        gelacht: { herz: { lina: -1 }, merke: 'videoGelacht' },
        still: {},
      } },
  ],
  n8_mila: [
    ['mila', 'Ich hab das Video Bild für Bild angeschaut. Es ist KI. Eindeutig.'],
    ['ben', 'Kein Pult am Fenster! Und die Ente blinzelt komisch.'],
    ['mila', 'Enten blinzeln anders. Aber ja.'],
    { tu: 'n8_milaStart' },
  ],
  n8_skills: [
    ['kaya', 'Wéi geet et? Heute: Was ist echt?'],
    ['kaya', 'Und wer entscheidet, was ihr seht?'],
    ['mesenberg', 'Zuerst eine Wette. Echt oder KI?'],
    ['mesenberg', 'Ich hab sie alle selbst gemacht. Also … gesammelt.'],
    { szene: 'sort', id: 'echtKi', def: ECHT_KI, ausgang: (r) => (r.passend >= 5 ? 'gut' : 'mittel'),
      folgen: { gut: { staerke: 'lesen', merke: 'kiProfi' }, mittel: { dann: [['mesenberg', 'Schwer, oder? Darum zählt nicht nur das Hingucken. Auch das Bremsen.']] } } },
    ['mesenberg', 'Fake über euch? BEE SECURE Helpline: 8002 1234. Gratis.'],
    ['kaya', 'Und jetzt euer Feed. Wer bestimmt eigentlich, was ihr seht?'],
    ['ben', 'Ich. Ich drück einfach auf Katzen.'],
    { szene: 'feed', id: 'feed', def: FEED, ausgang: (r) => (r.top === 'drama' ? 'drama' : 'anders'),
      folgen: {
        drama: { merke: 'feedDrama', dann: [['kaya', 'Drama hält uns am längsten fest.'], ['kaya', 'Darum zeigt der Feed so viel davon.'], ['jo', 'Digga, mein Feed ist ein einziger Streit.']] },
        anders: { merke: 'feedAnders', dann: [['kaya', 'Gut gesteuert. Der Feed folgt dir.'], ['kaya', 'Aber er schubst auch. Merkt euch das.']] },
      } },
    ['kaya', 'Mission: ein Wenn-dann-Satz. „Wenn ich Drama sehe, dann wische ich weiter.“'],
  ],
  n8_tidderich: [
    ['hoffmann', 'Ça va? Das Video ist gefälscht. Die Schule kümmert sich.'],
    ['hoffmann', 'Wer es geteilt hat: löschen. Mehr müsst ihr nicht tun.'],
    ['erzaehler', 'Ihre Stimme ist normal. Ihre Augen nicht ganz. Jo guckt auf seinen Tisch.'],
    { wahl: [
      { t: '„Es tut mir leid. Ich hab’s nicht geteilt. Aber gesehen.“', wenn: (m) => !m.videoGeteilt, staerke: 'zuhoeren', herz: { hoffmann: 2 }, dann: [['hoffmann', '(nickt) Sehen ist nicht schlimm. Weiterschicken schon.']] },
      { t: '„Ich hab’s geteilt. Sorry. Ist gelöscht.“', wenn: (m) => !!m.videoGeteilt, staerke: 'mut', herz: { hoffmann: 2 }, dann: [['hoffmann', '(nickt) Gut. Danke, dass du’s sagst.']] },
      { t: '„Wir wissen, dass es KI ist. Alle hier.“', staerke: 'klar', herz: { hoffmann: 1 }, dann: [['hoffmann', 'Die hier vielleicht. Die 300 da draußen nicht.']] },
      { t: '(Nichts sagen. Zuhören.)', staerke: 'warten', herz: { hoffmann: 1 }, dann: [['hoffmann', '(nickt dir zu) Danke, dass ihr zuhört.']] },
    ] },
    { tu: 'n8_joSorry' },
    ['hoffmann', 'Jetzt Deutsch. Herr Mesenberg hat eine Übung dagelassen. Zu KI.'],
    { szene: 'sort', id: 'grenze', def: GRENZE, ausgang: () => 'ok', folgen: { ok: {} } },
  ],
  n8_falle: [
    ['mila', 'Wir wissen: Luca hat den Fake gebaut. Aber wer hat das Passwort?'],
    ['ben', 'Ich hab eine Idee. Eine Falle. Wie im Film.'],
    ['ben', 'Und Ermittlungs-Kekse. Einer pro Hinweis.'],
    { wahl: [
      { t: '„Wir erfinden was und sagen es nur Luca.“', merke: 'falleLuege', dann: [['mila', 'Nein. Wir fangen keine Fakes mit Fakes.'], ['mila', 'Dann sind wir wie er.']] },
      { t: '„Wir sagen Luca was Wahres. Nur ihm.“', staerke: 'lesen', herz: { mila: 1 }, merke: 'falleEhrlich', dann: [['mila', 'Etwas Wahres. Harmlos. Nur wenn Herr Kuedes Ja sagt.']] },
      { t: '„Lasst es. Das ist Sache von Herrn Kuedes.“', staerke: 'hilfe', merke: 'falleKuedes', dann: [['mila', 'Okay. Dann sagen wir Herrn Kuedes den Plan. Vorher.'], ['mila', 'Eine Spur, die keinem schadet. Mit ihm zusammen.']] },
    ] },
    ['ben', 'Ich frag Luca, ob er mir einen Kuchen backt. Für Freitag.'],
    ['ben', 'Da hab ich Geburtstag. Das weiß sonst keiner.'],
    ['mila', 'Luca backt?'],
    ['ben', 'Er steht jeden Morgen bei Frau Kremer. Ich hab’s gesehen.'],
    ['mila', 'Bist du sicher? Dann postet er vielleicht was über dich.'],
    ['ben', 'Was Nettes, hoffentlich. „Happy Birthday, Legende.“'],
    { wahl: [
      { t: '„Ben, nur wenn du wirklich willst.“', staerke: 'einbeziehen', herz: { ben: 2 }, merke: 'benGefragt', dann: [['ben', 'Ich will. Für Noah. Für Mme Tidderich. Und für dich.']] },
      { t: '„Okay, machen wir.“', herz: { ben: 1 }, dann: [['ben', 'Deal. Aber erst fragen wir Herrn Kuedes. Ohne sein Ja: nix.']] },
    ] },
  ],
  n8_post: [
    ['erzaehler', 'Freitag. 9:48. Auf dem Weg in die Aula. Dein Handy vibriert.'],
    { szene: 'chat', id: 'bday', def: BDAY, ausgang: (r) => (r.flags.chatLuca ? 'laut' : r.flags.lucaPrivat ? 'privat' : 'zu'),
      folgen: { zu: { merke: 'falleZu' }, privat: { merke: ['falleZu', 'lucaPrivat'] }, laut: { merke: ['falleZu', 'chatLuca'], dann: [['mila', '(an der Tür) Lösch es. Jetzt. Fakten zu Erwachsenen.']] } } },
  ],
  n8_ende: [
    ['kaya', '(leise zu dir, Ben und Mila) Ich hab’s gesehen.'],
    ['kaya', 'Danke, dass ihr gekommen seid.'],
    { tu: 'n8_kuedesFolge' },
    ['kaya', 'Ab jetzt ist das meine Aufgabe. Mit der Direktion.'],
    ['kaya', 'Ihr macht jetzt Pause. Wirklich.'],
    { tu: 'n8_schluss' },
  ],
};

export const tunN8 = (c) => ({
  n8_kuedesFolge: () => [...(c.S.merke.lucaPrivat ? [['kaya', 'Schreib ihm nicht mehr. Ab jetzt machen wir das.']] : []),
    ...(c.S.merke.falleKuedes ? [['kaya', 'Euer Plan von Mittwoch. Er hat funktioniert.']] : [])],
  n8_milaStart: () => (c.S.merke.videoGeteilt ? [['mila', '(guckt dich an) Du hast es geteilt. Ich hab’s gesehen.'], ['mila', 'Du kannst es noch löschen. Jetzt.']] : []),
  n8_joSorry: () => (c.S.merke.joIchBotschaft || c.S.merke.joGehoert ? [['jo', '(steht auf) Mme Tidderich … ich hab’s geliked. Sorry. Echt.'], ['hoffmann', 'Okay, Jo. Angekommen.']] : []),
  n8_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 7 · Digitale Welt', titel: 'Erst bremsen',
      gelernt: ['Echt oder KI? Erst die Quelle prüfen', 'Die Teilen-Bremse: Wer? Echt? Wem schadet es?', 'Der Feed folgt dir – und schubst dich', 'KI: geht klar oder gar nicht', 'Fakes fängt man nicht mit Fakes'],
      mission: 'Ein Wenn-dann-Satz für dein Handy. Und einmal bremsen, bevor du teilst.' }, folgen: {} },
    ['erzaehler', 'Sonntag, 23:14 Uhr. Eine Nachricht von Dario.'],
    ['dario', '(Nachricht) bist du wach? ich kann nicht schlafen. seit wochen nicht.'],
    ['dario', '(Nachricht) kann ich dir was erzählen? morgen? bitte'],
    { wahl: [
      { t: '„Morgen früh. Haltestelle. Ich bin da.“', herz: { dario: 1 }, dann: [['dario', '(Nachricht) ok. danke 🙏']] },
      { t: '„Morgen früh, Haltestelle. Wenn’s jetzt gefährlich ist: 112.“', staerke: 'hilfe', herz: { dario: 1 }, dann: [['dario', '(Nachricht) nicht gefährlich. nur laut im kopf. bis morgen']] },
    ] },
    { tu: 'kapitelEnde' },
  ],
});
