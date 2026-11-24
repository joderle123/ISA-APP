// Neue Geschichte „@annexe.cam“ (annexe/STORY.md) – Kapitel 1 „Der erste Tag“.
// Jugendsprache je Figur: annexe/FIGUREN.md („Slang“). Situations-Spiele: situation.js ({ szene: 'hitze' | 'chat' }).
// Höchstens rund 12 Wörter je Blase. Kein richtig/falsch – die Leute reagieren.
import { S1_ANKOMMEN } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1) };
// Zettel-Krimi (früher erste Stunde) entfernt – Rückmeldung der Schüler 24.11.: „Unsinn“. Jetzt: Klassenregeln (n1_hoffmann).
const KLASSE_STEHT = { ayla: [-24, -27, 0.4], ben: [-21.5, -22.5, -2.6], chiara: [-19.5, -25.5, 1.8], yusuf: [-23.6, -20.2, 2.4], jo: [-19.55, -21, -1.5], lina: [-19.55, -27.8, -0.6] };

export const SCHRITTE_N1 = [
  { id: 'ankunft', kap: 1, tag: 'Montag', uhr: 7.55, titel: 'Wer hat das Foto gemacht?', ziel: 'Jemand hat dich fotografiert. Der Junge mit der Jacke stand daneben.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n1_intro' },
    leute: { noah: [-20.5, 42.3, -1.9], fahrer: [-11.2, 44.6, -Math.PI / 2], kenan: [-3, 30, 0.5, 'redet'], dario: [-2, 31.2, -2.6, 'redet'], mila: [-26, 17.5, Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n1_noah' } },
  { id: 'sekretariat', kap: 1, tag: 'Montag', uhr: 7.7, titel: 'Wo muss ich hin?', ziel: 'Hol im Sekretariat deinen Stundenplan.', marker: 'weber',
    start: { gespraech: 'n1_benDM' },
    leute: { noah: [-6, -5, 2.4], weber: [-21, -9.4, 0, 'telefon'], kenan: [-12, -15.5, 1.2, 'redet'], dario: [-10.9, -16.3, -2, 'redet'] },
    fertig: { reden: 'weber', gespraech: 'n1_weber' } },
  { id: 'klasse', kap: 1, tag: 'Montag', uhr: 7.95, titel: 'Saal 1.04', ziel: 'Geh in Saal 1.04. Deine Klassenlehrerin wartet.', marker: 'hoffmann',
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n1_hoffmann' } },
  // Fachstunde nur, wenn die Lehrperson den Unterricht in der Geschichte einschaltet (sonst freiwillig: 🎟 → Stunden)
  { id: 'k1_deutsch', kap: 1, tag: 'Montag', uhr: 8.9, neben: 'fach', titel: 'Deutsch', ziel: 'Gleicher Saal. Jetzt Deutsch bei Mme Nouvelle.', marker: 'nouvelle',
    leute: { nouvelle: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'nouvelle', gespraech: 'n1_deutsch' } },
  { id: 'pause', kap: 1, tag: 'Montag', uhr: 10.0, titel: 'Große Pause', ziel: 'Pause. Mila sitzt allein auf der Bank. Ben wirft am Korb.', marker: ['mila', 'ben'],
    start: { teleport: 'eingangHof' },
    leute: { mila: [-20, 11.6, Math.PI, 'sitzt'], ben: [27.5, 21, 0.8], yusuf: [30.8, 22.2, -0.9], noah: [2, 14, 0.6, 'redet'], ayla: [3, 15.3, -2.5, 'redet'], kenan: [-34, 9, 1], dario: [-32.6, 10.2, -2] },
    fertig: { eins: ['mila', 'freiwurf'] } },
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.2, titel: 'Mittag in der Kantine', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [22.6, -10.6, -Math.PI / 2], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'n1_kantine' } },
  { id: 'tisch', kap: 1, tag: 'Montag', uhr: 12.3, titel: 'Wohin setzen?', ziel: 'Such dir einen Platz. Drei Tische, drei Leute.', marker: ['noah', 'mila', 'lina'],
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [24.6, -7.4, 2.6], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], lina: [15.15, -5.9, Math.PI / 2, 'sitzt'] },
    fertig: { eins: ['noah', 'mila', 'lina'] } },
  { id: 'post', kap: 1, tag: 'Montag', uhr: 13.6, titel: 'Handys vibrieren', ziel: 'Zurück in Saal 1.04.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n1_post' } },
  { id: 'heimweg', kap: 1, tag: 'Montag', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zum Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ben: [8, 36, 2.6], yusuf: [9.2, 35.4, -2.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n1_heimweg' } },
  // ---------- Dienstag: Sport (Teams wählen) und Lina auf der Treppe ----------
  { id: 'k1_sport', kap: 1, tag: 'Dienstag', uhr: 8.0, titel: 'Teams wählen', ziel: 'Turnhalle. Frau Sommer hat zwei Kapitäne bestimmt.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer', gespraech: 'n1_diMorgen' },
    leute: { sommer: [45.2, -12.6, Math.PI], ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0], mila: [52.4, -14.6, -1.2] },
    fertig: { reden: 'sommer', gespraech: 'n1_sport' } },
  // Früher: Kunst mit Steckbrief (Rückmeldung der Schüler 24.11.: „hat gar keine Tiefe“). Jetzt: Lina hat etwas gezeichnet,
  // das sie am Montag an der Haltestelle gesehen hat – die erste echte Spur. Nachfragen statt ausfragen.
  { id: 'k1_kunst', kap: 1, tag: 'Dienstag', uhr: 10.0, titel: 'Die Zeichnung', ziel: 'Pause. Lina sitzt auf der Treppe im Neubau und zeichnet.', marker: 'lina',
    start: { teleport: 'eingangHof' },
    leute: { lina: [51.6, -50.2, -0.4, 'sitzt'], noah: [56.2, -50.1, 0.5, 'redet'], ayla: [57.4, -50.4, -2.6, 'redet'] },
    fertig: { reden: 'lina', gespraech: 'n1_kunst' } },
  // ---------- Mittwoch: Skills-Stunde (nur, wenn eingeschaltet) und Herr Kuedes ----------
  { id: 'k1_skills', kap: 1, tag: 'Mittwoch', uhr: 9.9, neben: 'skills', titel: 'Skills: Ankommen', ziel: 'Geh in die Aula. Herr Kuedes wartet mit einem Ball.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n1_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] },
    fertig: { reden: 'kaya', gespraech: 'n1_skills' } },
  { id: 'k1_blind', kap: 1, tag: 'Mittwoch', uhr: 10.6, neben: 'skills', titel: 'Skills: Blind-Parcours', ziel: 'Auf den Hof. Herr Kuedes hat Hütchen aufgebaut.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [2, 14, Math.PI], noah: [4, 13, -1.6], mila: [-1.6, 13.4, 1.4], ben: [3.2, 16.2, -2.4], lina: [-0.6, 16.4, 2.6], jo: [5.6, 15.4, -2], ayla: [-2.6, 15.8, 1.9] },
    fertig: { reden: 'kaya', gespraech: 'n1_blind' } },
  { id: 'k1_kuedes', kap: 1, tag: 'Mittwoch', uhr: 11.2, titel: 'Herr Kuedes', ziel: 'Herr Kuedes will kurz mit dir reden. SePAS, Erdgeschoss.', marker: 'kaya',
    start: { teleport: 'halle', gespraech: 'n1_kuedesRuf' },
    leute: { kaya: [-11.5, -8, Math.PI / 2], mila: [-4, -3.4, 2.4], noah: [-5.2, -2.6, -2.6] },
    fertig: { reden: 'kaya', gespraech: 'n1_kuedes' } },
];

// ---------- Situations-Spiel: Einladung in den Klassenchat ----------
const CHAT_EINLADUNG = {
  titel: '7P2', mitglieder: 19, dauer: 26,
  nachrichten: [
    { nach: 0.6, system: true, text: 'Jo hat dich hinzugefügt.' },
    { nach: 1.8, wer: 'Ben', text: 'wer ist das' },
    { nach: 3.4, wer: 'Jo', text: 'neu. sitzt im 110er' },
    { nach: 4.8, wer: '@annexe.cam (geteilt von Jo)', bild: 'Du, an der Haltestelle. Von unten fotografiert.', text: 'neu an der annexe. bus 110. willkommen 📷' },
    { nach: 6.2, wer: 'Ben', text: 'jo wieso teilst du das' },
    { nach: 7.4, wer: 'Jo', text: 'ist doch nur ein foto' },
    { nach: 9.2, wer: 'Noah', text: 'Hallo. Ich bin auch neu. Hallo.' },
    { nach: 10.6, wer: 'Ben', text: 'zweimal hallo noah' },
    { nach: 12.4, wer: 'Chiara', text: 'Weiß jemand, ob wir heute schon Sport haben?' },
    { nach: 14.2, wer: 'Luca', text: 'egal wer neu ist', wennNicht: 'vorgestellt' },
    { nach: 16, wer: 'Ben', text: '{name}? schreib was', wennNicht: 'vorgestellt' },
    { nach: 18.5, wer: 'Luca', text: 'liest nur. okay', wennNicht: 'vorgestellt' },
    { nach: 21, wer: 'Mila', text: 'Das Foto ist von 7:31. Von unten. Wer stand da so tief?' },
    { nach: 23.4, wer: 'Jo', text: 'mila ermittelt wieder' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Moien. Ich bin {name}.“', setzt: ['vorgestellt', 'nett'], ich: 'moien. ich bin {name}', folgen: [{ nach: 1.2, wer: 'Ayla', text: 'moien 👋' }, { nach: 2.4, wer: 'Ben', text: 'willkommen. das foto ist nicht von uns btw' }] },
      { t: '„Moien. Wer hat das Foto gemacht?“', setzt: ['vorgestellt', 'frage'], ich: 'moien. wer hat das foto gemacht?', folgen: [{ nach: 1.4, wer: 'Jo', text: 'keiner weiß das. das ist ja der witz' }, { nach: 3, wer: 'Mila', text: 'Gute Frage.' }] },
      { t: '„Sport ist erst morgen, Chiara.“', setzt: ['vorgestellt', 'chiara'], ich: 'sport ist erst morgen', folgen: [{ nach: 1.3, wer: 'Chiara', text: 'Danke! Endlich jemand, der den Plan liest.' }] },
    ] },
    { id: 'sticker', t: 'Winke-Sticker schicken', symbol: '👋', setzt: ['vorgestellt', 'sticker'], ich: '👋', folgen: [{ nach: 1.1, wer: 'Ayla', text: '👋' }] },
    { id: 'stumm', t: 'Gruppe stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Situations-Spiel: Ben schreibt privat – er hat das Foto weitergeschickt ----------
const BEN_DM = {
  titel: 'Ben 🏀', mitglieder: 2, dauer: 13,
  nachrichten: [
    { nach: 0.5, wer: 'Ben', text: 'hey. bist du die person vom foto?' },
    { nach: 2.2, wer: 'Ben', text: 'ich hab das heute morgen an meinen cousin geschickt. bevor ich wusste dass du in unserer klasse bist' },
    { nach: 4.6, wer: 'Ben', text: 'sorry. war dumm' },
    { nach: 9.5, wer: 'Ben', text: 'ok. verstehe', wennNicht: 'geantwortet' },
  ],
  aktionen: [
    { id: 'antwort', t: 'Antworten', symbol: '💬', wahl: [
      { t: '„Schon okay. Danke, dass du’s sagst.“', setzt: ['geantwortet', 'okay'], ich: 'schon okay. danke dass dus sagst', folgen: [{ nach: 1.2, wer: 'Ben', text: 'ich lösch es bei ihm. versprochen' }] },
      { t: '„Kannst du ihn bitten, es zu löschen?“', setzt: ['geantwortet', 'bitte'], ich: 'kannst du ihn bitten es zu löschen?', folgen: [{ nach: 1.6, wer: 'Ben', text: 'schon passiert. er hat gefragt wer du bist. ich hab nix gesagt' }] },
      { t: '„Nicht cool, ehrlich.“', setzt: ['geantwortet', 'klar'], ich: 'nicht cool ehrlich', folgen: [{ nach: 1.4, wer: 'Ben', text: 'ja. weiß ich. deshalb schreib ich ja' }] },
    ] },
    { id: 'gelesen', t: 'Auf „gelesen“ lassen', symbol: '👀', setzt: 'ignoriert', sys: 'Gelesen 7:41', ende: true },
  ],
};

// ---------- Situations-Spiel: Kantine, Luca drängelt (Hitze-Duell) ----------
const KANTINE_DUELL = {
  wo: 'Kantine, Ausgabe', gegner: { name: 'Luca', farbe: '#7b8794' }, publikum: 'Kenan, Dario (mit Handy)', hitze: 30, zeit: 7,
  runden: [
    { sagt: 'Dreimal Nudeln, Frau Kremer. Wir haben’s eilig. Sehr.',
      karten: [
        { t: '„Ich war dran.“', stimme: 'kopf', art: 'klar', hitze: 8, respekt: 1, antwort: 'Warst. Jetzt nicht mehr.' },
        { t: '„Kannst du nicht warten wie alle?“', stimme: 'stolz', art: 'angriff', hitze: 28, respekt: 1, antwort: 'Wie redest du mit mir?' },
        { t: '„Dann nimm mir eine mit.“', art: 'witz', hitze: -12, respekt: 1, antwort: '(kurzes Grinsen) Frech. Lowkey frech.' },
        { t: '(Aufs Handy gucken.)', stimme: 'bauch', art: 'rueckzug', hitze: -5, respekt: -1, antwort: 'Siehst du, Kenan. Die neue Person ist entspannt.' },
      ], still: { hitze: -4, respekt: -1, antwort: 'Kein Kommentar? Gut.' } },
    { sagt: 'Erster Tag und gleich Stress machen?',
      karten: [
        { t: '„Kein Stress. Ich will nur Nudeln.“', stimme: 'kopf', art: 'klar', hitze: -10, respekt: 1, antwort: 'Hm. Alle wollen Nudeln.' },
        { t: '„Stress machst du. Ich steh nur hier.“', stimme: 'stolz', art: 'angriff', hitze: 30, respekt: 1, antwort: 'Pass auf, wie du redest.' },
        { t: '„Frau Kremer, ich war vor ihm.“', art: 'hilfe', hitze: -6, respekt: 0, antwort: '(rollt die Augen) Echt jetzt?' },
        { t: '„Ist okay. Geh vor.“', stimme: 'bauch', art: 'rueckzug', hitze: -12, respekt: 0, antwort: 'Merci. Siehst du, geht doch.' },
      ], still: { hitze: -6, respekt: -1, antwort: 'Dacht ich mir.' } },
    { sagt: 'Dario, film mal. Die neue Person will diskutieren.',
      wenn: (z) => z.hitze > 20,
      karten: [
        { t: '„Film ruhig. Ich steh nur hier.“', stimme: 'kopf', art: 'klar', hitze: -14, respekt: 2, antwort: '(guckt zu Dario) … Lass. Ist langweilig.' },
        { t: '„Gib das Handy her!“ (Nach Dario greifen.)', stimme: 'stolz', art: 'angriff', hitze: 40, respekt: 0, antwort: 'EY! Finger weg!' },
        { t: '„Schon wieder ein Foto? Ihr seid ja Fans.“', art: 'witz', hitze: -16, respekt: 2, antwort: '(lacht wider Willen) Okay. Du bist komisch.' },
        { t: '(Tablett nehmen. Weggehen.)', stimme: 'bauch', art: 'rueckzug', hitze: -8, respekt: 0, antwort: 'Ja, lauf.' },
      ], still: { hitze: 4, respekt: -1, antwort: 'Hallo? Jemand da?' } },
  ],
};
const kantineAusgang = (r) => (r.knall ? 'knall' : r.hitze >= 60 ? 'heiss' : (r.arten.witz || 0) >= 2 || ((r.arten.witz || 0) >= 1 && r.respekt >= 2) ? 'witz'
  : (r.arten.rueckzug || 0) + (r.arten.still || 0) >= 2 ? 'leise' : (r.arten.hilfe || 0) >= 1 && !(r.arten.klar || 0) ? 'hilfe' : 'klar');

// ---------- Situations-Spiel: @annexe.cam postet dich (Live-Chat mit Umfrage) ----------
const UNTERSCHRIFT = { knall: 'erster tag. erster streit 🍝', heiss: 'neue person sucht stress 🍝', witz: 'neue person ist lustig?? 🍝', leise: 'luca 1 : neue person 0 🍝', hilfe: 'neue person holt die kantinenfrau 🍝', klar: 'neue person bleibt ruhig. noch 🍝' };
const postChat = (m) => ({
  titel: '7P2', mitglieder: 19, dauer: 36,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Jo hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Du, Kantine, Tablett in der Hand', text: UNTERSCHRIFT[m.kantineKnall ? 'knall' : m.lucaFeind ? 'heiss' : m.kantineWitz ? 'witz' : m.lucaGewonnen ? 'leise' : m.lucaKremer ? 'hilfe' : 'klar'] + '  UMFRAGE: cool oder cringe?', lacher: { start: 2, proSek: 0.35, stopp: ['selbstironie', 'klartext', 'herausgefordert', 'gemeldet'] } },
    { nach: 3.4, wer: 'Ben', text: 'jo hör auf das zu teilen' },
    { nach: 5.0, wer: 'Jo', text: 'umfrage: cool 7, cringe 9' },
    ...(m.lucaFeind ? [{ nach: 7.0, wer: 'Luca', text: 'lowkey cringe' }] : m.lucaRespekt ? [{ nach: 7.0, wer: 'Luca', text: 'war lowkey okay' }] : []),
    { nach: 9.4, wer: 'Mila', text: 'Wieder von unten. Wieder links. Gleiche Person wie heute Morgen.' },
    { nach: 11.5, wer: 'Dario', text: 'chill. ist nur eine umfrage' },
    { nach: 13.5, wer: 'Jo', text: 'cool 9, cringe 12', wennNicht: 'selbstironie' },
    { nach: 12.4, wer: 'Ayla', text: 'wir voten nicht über leute. hört auf', wenn: 'klartext' },
    { nach: 12.4, wer: 'Ayla', text: 'wir voten nicht über leute. hört auf', wenn: 'herausgefordert' },
    { nach: 13.5, wer: 'Ayla', text: 'trotzdem: wer abstimmt, macht mit', wenn: 'selbstironie' },
    { nach: 16, wer: 'Noah', text: 'Ich hab gar nicht abgestimmt. Nur damit ihr es wisst.' },
    { nach: 19, wer: 'Ayla', text: 'wer macht sowas überhaupt', wennNicht: 'stumm' },
    { nach: 22, wer: 'Jo', text: 'wenigstens ist es nicht langweilig hier', wennNicht: 'gemeldet' },
    { nach: 29, system: true, text: '@annexe.cam: „Bis morgen, 7P2. 📷“' },
  ],
  aktionen: [
    { id: 'lachen', t: 'Selbst drüber lachen', symbol: '😂', setzt: 'selbstironie', ich: 'ok das tablett war nicht mein bester moment 😂', folgen: [{ nach: 1.1, wer: 'Ben', text: 'haha. stark' }] },
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Wer ist @annexe.cam? Sag’s doch.“', setzt: 'herausgefordert', ich: 'wer ist annexe.cam? sags doch', folgen: [{ nach: 1.5, wer: 'Dario', text: 'easy. ist nur spaß' }, { nach: 3.2, wer: 'Mila', text: 'Niemand sagt „nur Spaß“, wenn es Spaß ist.' }] },
      { t: '„Heimlich Leute fotografieren ist das Cringe hier.“', setzt: 'klartext', ich: 'heimlich leute fotografieren ist das cringe hier', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'danke' }, { nach: 2.8, wer: 'Luca', text: 'hat wer gefragt?' }] },
      { t: '„Stimmt doch einfach für cool.“', setzt: 'witz', ich: 'stimmt doch einfach für cool', folgen: [{ nach: 1.2, wer: 'Ben', text: 'cool 14. es lebt' }] },
    ] },
    { id: 'privat', t: 'Mila privat schreiben', symbol: '🔒', setzt: 'milaPrivat', ich: '(privat an Mila) wie meinst du das mit links?', folgen: [{ nach: 2, wer: 'Mila (privat)', text: 'Beide Fotos sind von links unten. Wie aus einer Tasche. Oder vom Schoß.' }] },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Gemeldet.', folgen: [{ nach: 2, wer: 'Ben', text: 'hab auch gemeldet' }] },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Das Handy liegt still. Dein Kopf nicht.', ende: true },
  ],
});

const TEAMS = {
  gegner: { name: 'Jo', farbe: '#c0392b' },
  leute: [
    { id: 'ben', name: 'Ben', farbe: '#d9a21b', info: 'hüpft schon' }, { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0', info: 'Arme verschränkt' },
    { id: 'chiara', name: 'Chiara', farbe: '#3fa66b', info: 'bindet die Schuhe' }, { id: 'ayla', name: 'Ayla', farbe: '#e85d75', info: 'will in die Mitte' },
    { id: 'noah', name: 'Noah', farbe: '#3f78b8', info: 'neue Schuhe' }, { id: 'mila', name: 'Mila', farbe: '#2fb8a8', info: 'zählt Würfe' },
    { id: 'lina', name: 'Lina', farbe: '#9b7bc8', info: 'Haare zum Zopf' },
  ],
  gegnerWahl: ['ben', 'yusuf', 'chiara', 'ayla', 'mila', 'noah', 'lina'],
};
const LINA_INTERVIEW = {
  wo: 'Treppe im Neubau · Pause', wer: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' },
  start: '(zieht das Heft ein Stück zu sich) … Hi.',
  runden: [
    { fragen: [
      { t: 'Was zeichnest du?', art: 'offen', offen: 1, antwort: 'Die Haltestelle. Von gestern.' },
      { t: 'Darf ich sehen?', art: 'zu', offen: 0, antwort: '(zögert) … Gleich vielleicht.' },
      { t: 'Ich kann gar nicht zeichnen.', art: 'ueber-mich', offen: 0, antwort: '(nickt) Mhm.' },
      { t: 'Warum sitzt du allein hier?', art: 'bohren', offen: -1, antwort: '(zuckt mit den Schultern. Zeichnet weiter.)' },
    ] },
    { fragen: (o) => [
      { t: 'Warum ausgerechnet die Haltestelle?', art: 'nachhaken', offen: 2, antwort: o >= 1 ? 'Weil da gestern was war. Ich zeichne, was mir nicht aus dem Kopf geht.' : 'Nur so.' },
      { t: 'Schön.', art: 'zu', offen: 0, antwort: 'Danke.' },
      { t: 'Zeichnest du oft Sachen, die du gesehen hast?', art: 'offen', offen: 1, antwort: 'Immer. Dann muss ich sie nicht mehr denken.' },
    ] },
    { fragen: (o) => [
      { t: o >= 2 ? 'Was war da gestern?' : 'Was zeichnest du sonst so?', art: 'nachhaken', offen: 2, antwort: o >= 2 ? '(dreht das Heft um) Guck selbst. Links von dir.' : 'Leute. Tauben. Nichts Besonderes.' },
      { t: 'Ich muss los.', art: 'zu', offen: 0, antwort: 'Okay.' },
      { t: 'Kann ich mich kurz dazusetzen?', art: 'offen', offen: 1, antwort: (x) => (x >= 3 ? '(rutscht zur Seite) Ja.' : 'Ist eine Treppe. Für alle.') },
    ] },
  ],
  stufen: ['Lina hat fast nichts gesagt.', 'Ein Anfang. Lina hat ein bisschen erzählt.', 'Lina hat erzählt. Mehr als sonst.', 'Lina hat dir ihre Zeichnung gezeigt.', 'Lina hat dir ihre Zeichnung gezeigt. Und erklärt, was darauf ist.', 'Lina zeigt dir die Zeichnung. Und eine zweite, die sonst keiner sieht.'],
};

const UNBEKANNT = {
  titel: '+352 6•• ••• •77', mitglieder: 2, dauer: 14,
  nachrichten: [
    { nach: 0.6, wer: 'Unbekannt', text: 'gut angekommen? 📷' },
    { nach: 2.6, wer: 'Unbekannt', text: 'du sitzt im bus immer links. merk ich mir' },
    { nach: 4.8, wer: 'Unbekannt', text: 'morgen ist wer anders dran. vielleicht' },
    { nach: 9.5, wer: 'Unbekannt', text: '👀', wennNicht: 'gefragt' },
  ],
  aktionen: [
    { id: 'fragen', t: '„Wer bist du?“', symbol: '💬', setzt: 'gefragt', ich: 'wer bist du?', folgen: [{ nach: 1.6, wer: 'Unbekannt', text: 'jemand aus deiner nähe' }] },
    { id: 'mila', t: 'Screenshot an Mila schicken', symbol: '📤', setzt: ['beweis', 'milaWeiss'], sys: 'Screenshot an Mila.', folgen: [{ nach: 2, wer: 'Mila (privat)', text: 'Nicht antworten. Screenshot behalten. Das zeigst du einem Erwachsenen.' }] },
    { id: 'beweis', t: 'Screenshot machen', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert.' },
    { id: 'erwachsen', t: 'Einem Erwachsenen zeigen', symbol: '🧑‍🏫', setzt: ['beweis', 'erwachsen'], sys: 'Screenshot gemacht. Heute Abend zeigst du es zu Hause.' },
    { id: 'block', t: 'Nummer blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert.', ende: true },
  ],
};

// ---------- Mittwoch: Check-in, Skills-Stunde (Kurs M0: E01–E03), Blind-Parcours, Stempel ----------
const CHECKIN_MI = {
  frage: 'Herr Kuedes will heute ein Wort von allen. Deins?',
  posts: [
    { wer: 'Ben', wort: 'hungrig', farbe: '#e9734a' }, { wer: 'Mila', wort: 'okay', farbe: '#5fb07a' },
    { wer: 'Jo', wort: 'müde digga', farbe: '#5fb07a' }, { wer: 'Noah', wort: 'nervös? glaub ich', farbe: '#8a7bc8' },
  ],
  reaktion: (w, g) => (g === 'Angst' ? [{ wer: 'Noah', text: 'Same. Wir sind ein Team jetzt.' }]
    : g === 'Wut' ? [{ wer: 'Jo', text: 'same. mittwoch halt 😤' }]
    : g === 'Freude' ? [{ wer: 'Ben', text: 'nice. erzähl in der pause, wenn du magst' }]
    : g === 'Trauer' ? [{ wer: 'Ayla', text: '🫂' }]
    : [{ wer: 'Mila', text: 'Notiert.' }]),
};
const KLASSE_NAMEN = [
  { id: 'noah', name: 'Noah', farbe: '#3f78b8', geste: '🙋' }, { id: 'mila', name: 'Mila', farbe: '#2fb8a8', geste: '🧊' },
  { id: 'lina', name: 'Lina', farbe: '#9b7bc8', geste: '✏️' }, { id: 'jo', name: 'Jo', farbe: '#c0392b', geste: '🏎️' },
  { id: 'ben', name: 'Ben', farbe: '#d9a21b', geste: '🏀' }, { id: 'chiara', name: 'Chiara', farbe: '#3fa66b', geste: '📚' },
  { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0', geste: '🥋' }, { id: 'ayla', name: 'Ayla', farbe: '#e85d75', geste: '🎸' },
];
const PARTNER = {
  noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8', weib: true },
  ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8', weib: true },
};
const blindFolgen = (id) => ({
  ausgang: (r) => (r.angekommen && r.vertrauen >= 55 ? 'gut' : r.angekommen ? 'knapp' : r.hektik >= 2 ? 'hektik' : 'nicht'),
  folgen: {
    gut: { staerke: 'fuehren', herz: { [id]: 2 }, merke: 'blindGut', dann: BLIND_SATZ[id].gut },
    knapp: { herz: { [id]: 1 }, dann: BLIND_SATZ[id].knapp },
    hektik: { herz: { [id]: -1 }, merke: 'blindHektik', dann: BLIND_SATZ[id].hektik },
    nicht: { dann: BLIND_SATZ[id].nicht },
  },
});
const BLIND_SATZ = {
  noah: { gut: [['noah', 'Ich hab dir einfach vertraut. Das mach ich sonst nie.']], knapp: [['noah', 'Drei Hütchen erwischt. Aber wir sind angekommen.']], hektik: [['noah', 'Das war zu schnell für mich. Sorry.']], nicht: [['noah', 'Nicht geschafft. War trotzdem okay mit dir.']] },
  mila: { gut: [['mila', 'Klare Ansagen. Danke.']], knapp: [['mila', 'Links ist links. Nicht „ein bisschen links“.']], hektik: [['mila', 'Zu viele Befehle auf einmal. Ich hab abgeschaltet.']], nicht: [['mila', 'Nicht geschafft. Nächstes Mal sagst du weniger. Und genauer.']] },
  ben: { gut: [['ben', 'Tor! Ohne was zu sehen! Okay, das war gut.']], knapp: [['ben', 'Fast ein Hütchen gegessen. Aber angekommen.']], hektik: [['ben', 'Du hast mich angeschrien. Ich bin stehen geblieben.']], nicht: [['ben', 'Nicht geschafft. Egal. Nochmal irgendwann.']] },
  lina: { gut: [['lina', '(leise) Danke. Du hast nicht gehetzt.']], knapp: [['lina', '(lächelt) Ein bisschen wackelig. Aber okay.']], hektik: [['lina', '(nimmt die Binde ab) Kurz Pause. Bitte.']], nicht: [['lina', 'Es war trotzdem schön draußen.']] },
};

export const GESPRAECHE_N1 = {
  n1_intro: [
    ['erzaehler', 'Montag, 7:33. Erster Tag an der Annexe Junglinster.'],
    ['erzaehler', 'Der Bus hält. Dein Handy vibriert. Eine Gruppe, die du nicht kennst.'],
    { szene: 'chat', id: 'einladung', def: CHAT_EINLADUNG,
      ausgang: (r) => (r.flags.frage ? 'frage' : r.flags.nett || r.flags.sticker ? 'nett' : r.flags.chiara ? 'chiara' : r.flags.stumm ? 'stumm' : 'still'),
      folgen: {
        frage: { staerke: 'mut', herz: { mila: 1 }, merke: 'chatFrage', dann: [['erzaehler', 'Mila reagiert mit einem Daumen. Sonst niemand.']] },
        nett: { staerke: 'kontakt', herz: { ayla: 1, ben: 1 }, dann: [['erzaehler', 'Zwei Leute winken zurück. Ein Anfang.']] },
        chiara: { staerke: 'hilfe', herz: { chiara: 2 }, dann: [['erzaehler', 'Chiara schickt dir privat einen Daumen. Dann noch einen.']] },
        stumm: { merke: 'gruppeStumm', dann: [['erzaehler', 'Stumm. Bis zur ersten Pause werden es 47 Nachrichten.']] },
        still: { merke: 'nurGelesen', herz: { mila: 1 }, dann: [['erzaehler', 'Du liest nur. Unter deinem Foto steht: „gesehen von 14“.']] },
      } },
    ['erzaehler', 'Du schaust noch mal auf das Foto. Das bist du. Von unten, schräg. Vor zwei Minuten.'],
    ['erzaehler', 'Jemand hier hat es gemacht. Um dich herum hat jeder ein Handy in der Hand.'],
    ['erzaehler', 'Neben dir stand ein Junge, die Jacke über dem Arm. Er steht immer noch da.'],
  ],
  n1_noah: [
    ['noah', 'Moien. Du bist … auf dem Foto. Ich stand direkt neben dir.'],
    ['noah', 'Ich hab nichts gemerkt. Ehrlich. Ich hab nur auf den Bus geschaut.'],
    { wahl: [
      { t: '„Hast du gesehen, wer hinter uns stand?“', staerke: 'lesen', herz: { noah: 1 }, merke: 'noahAura', dann: [
        ['noah', 'Kenan und Dario. Zwei aus der Sechsten. Eine Frau mit Hund.'],
        ['noah', 'Und jemand mit Kapuze. Glaub ich. Ich hab nicht richtig hingeschaut.'] ] },
      { t: '„Du hast zweimal Hallo geschrieben. Fand ich gut.“', staerke: 'kontakt', herz: { noah: 2 }, merke: 'noahGerettet', dann: [
        ['noah', 'Echt? Ich wollte es löschen. Dann war es zu spät.'],
        ['noah', 'Ich bin auch neu. Ich kenn hier niemanden.'],
        ['erzaehler', 'Er stellt sich neben dich. So, als wärt ihr zusammen gekommen.'] ] },
      { t: '„Weißt du, wo Saal 1.04 ist?“', staerke: 'hilfe', herz: { noah: 1 }, dann: [
        ['noah', 'Ich hab einen Plan. Aber ich glaub, ich halt ihn falsch rum.'] ] },
      { t: '(Kopfhörer rein. Nicken.)', merke: 'noahKopfhoerer', dann: [
        ['erzaehler', 'Noah redet weiter. Du hörst nur Musik.'],
        ['erzaehler', 'Nach einer Weile hört er auf. Er nickt auch. Ihr nickt beide.'] ] },
    ] },
    ['noah', 'Ich muss ins Sekretariat. Stundenplan holen. Du wahrscheinlich auch.'],
    { tu: 'stundenplanTipp' },
  ],
  n1_benDM: [
    { szene: 'chat', id: 'benDM', def: BEN_DM,
      ausgang: (r) => (r.flags.okay ? 'okay' : r.flags.bitte ? 'bitte' : r.flags.klar ? 'klar' : 'ignoriert'),
      folgen: {
        okay: { staerke: 'kontakt', herz: { ben: 2 }, merke: 'benVerziehen' },
        bitte: { staerke: 'klar', herz: { ben: 1 }, merke: 'benGeloescht' },
        klar: { staerke: 'klar', herz: { ben: 1 }, merke: 'benKlar' },
        ignoriert: { merke: 'benGelesen', dann: [['erzaehler', 'Zwei blaue Haken. Ben tippt. Hört auf. Tippt nicht mehr.']] },
      } },
  ],
  n1_weber: [
    { tu: 'weberTelefon' },
    ['weber', '„… nein, die Liste kommt heute. Ja. Nein. Heute.“'],
    ['erzaehler', 'Mme Weber telefoniert. Auf der Theke liegt ein Stapel Stundenpläne.'],
    { wahl: [
      { t: '(Warten.)', staerke: 'warten', merke: 'gewartet', herz: { weber: 1 }, dann: [
        ['weber', 'So. Entschuldigung. Name? … {name}, 7P2. Saal 1.04.'],
        ['weber', 'Und dein Spind ist die 117. Wenn was ist: Ich bin bis vier hier.'] ] },
      { t: '„Entschuldigung, ich bin neu!“', staerke: 'klar', herz: { weber: -1 }, dann: [
        ['weber', '(hält den Hörer zu) Einen Moment. Ich telefoniere.'],
        ['weber', '(schiebt dir ein Blatt hin) 7P2. Spind 117. Viel Glück.'] ] },
      { t: '(Einen Plan vom Stapel nehmen. Gehen.)', merke: 'falscherPlan', dann: [
        ['erzaehler', 'Zehn Sekunden. Keiner merkt was.'],
        ['erzaehler', 'Oben auf dem Blatt steht „7P1“. Das merkst du erst später.'] ] },
    ] },
    { tu: 'stundenplan' },
    { tu: 'spindFrei' },
  ],
  // Erste Stunde (Rückmeldung der Schüler 24.11.): keine Unterrichtsstunde, sondern der Moment, in dem das Foto im Raum
  // ankommt. Daraus entstehen die Klassenregeln – Linas leiser Satz und „nicht ohne Fragen fotografieren“.
  n1_hoffmann: [
    ['hoffmann', 'Da bist du ja. {name}, richtig? Setz dich, da vorne ist noch frei.'],
    { tu: 'zuSpaet' },
    ['hoffmann', 'Ich bin Mme Tidderich. Eure Klassenlehrerin. Wenn was ist, kommt ihr zu mir.'],
    ['jo', '(halblaut) Das ist doch die Person vom Foto.'],
    ['erzaehler', 'Ein paar drehen sich um. Zu dir.'],
    ['hoffmann', 'Welches Foto?'],
    ['erzaehler', 'Stille. Jo schaut auf seinen Tisch. Alle wissen, welches Foto.'],
    { wahl: [
      { t: '„Jemand hat mich heute Morgen fotografiert. Es ist in der Klassengruppe.“', staerke: 'klar', herz: { hoffmann: 1, mila: 1 }, merke: ['fotoGesagt', 'hoffmannGefragt'], dann: [
        ['hoffmann', '(nach einer Pause) Danke, dass du es sagst.'],
        ['hoffmann', 'Ich will es nicht sehen. Nicht hier vor allen. Aber ich kümmere mich.'],
        ['erzaehler', 'Sie schreibt etwas auf. Nicht an die Tafel. In ihr Heft.'] ] },
      { t: '„Ist nichts. Nur ein Foto.“', merke: 'fotoKleingeredet', dann: [
        ['hoffmann', 'Okay.'],
        ['hoffmann', '(schaut dich etwas länger an) Wenn es doch was ist: Ich bin jeden Tag hier.'] ] },
      { t: '(Nichts sagen. Jo anschauen.)', staerke: 'ruhig', herz: { jo: -1 }, merke: 'joAngeschaut', dann: [
        ['jo', 'Was? Ich hab’s nur geteilt. Gemacht hab ich’s nicht.'],
        ['hoffmann', 'Dann reden wir zwei nach der Stunde, Jo.'] ] },
    ] },
    ['hoffmann', 'Gut. Dann fangen wir genau da an.'],
    ['hoffmann', 'Ihr sitzt ein Jahr zusammen in diesem Raum. Was braucht ihr, damit ihr gern hier seid?'],
    ['jo', 'Keine Hausaufgaben.'],
    ['hoffmann', 'Nicht meine Entscheidung. Weiter.'],
    ['ben', 'Handy erlaubt. Für Musik.'],
    ['hoffmann', 'In der Pause, ja. Weiter.'],
    ['chiara', 'Dass wir pünktlich Pause machen. Nicht fünf Minuten später.'],
    ['hoffmann', '(schreibt es an die Tafel) Gilt auch für mich.'],
    ['erzaehler', 'Lina sagt etwas. Ganz leise. Niemand reagiert.'],
    ['erzaehler', 'Du sitzt nah genug. Du hast es gehört.'],
    { wahl: [
      { t: '„Lina hat was gesagt.“', staerke: 'einbeziehen', herz: { lina: 2, hoffmann: 1 }, merke: 'regelLina', dann: [
        ['hoffmann', 'Lina? Sag es noch mal. Wir hören zu.'],
        ['lina', '(leise) Dass keiner lacht, wenn jemand was falsch sagt.'],
        ['erzaehler', 'Kurz ist es still. Dann nickt Chiara. Dann Noah.'],
        ['hoffmann', '(schreibt es groß an die Tafel) Danke, Lina.'] ] },
      { t: 'Selbst etwas vorschlagen: „Wer neu ist, kriegt jemanden, der einem alles zeigt.“', staerke: 'klar', herz: { noah: 1, hoffmann: 1 }, merke: 'regelPate', dann: [
        ['hoffmann', 'Gute Idee. Wer zeigt {name} die Schule?'],
        ['noah', '(Hand halb oben) Ich. Ich kenn den Weg zur Kantine. Ungefähr.'],
        ['erzaehler', 'Lina schaut auf ihren Tisch. Sie sagt es nicht noch mal.'] ] },
      { t: '(Ben unterstützen.) „Wenigstens leise Musik beim Arbeiten?“', staerke: 'humor', herz: { ben: 1, jo: 1, hoffmann: -1 }, merke: 'regelHandy', dann: [
        ['ben', '(grinst) Danke.'],
        ['hoffmann', 'Netter Versuch. Nein.'],
        ['erzaehler', 'Ein paar lachen. Lina schaut auf ihren Tisch.'] ] },
    ] },
    ['hoffmann', 'Eine noch. Zwei Vorschläge liegen auf dem Tisch.'],
    ['hoffmann', 'A: Wir lassen jeden ausreden. B: Niemand wird fotografiert oder gefilmt, ohne dass man fragt.'],
    ['erzaehler', 'Hände gehen hoch. Gleichstand. Deine Hand fehlt noch.'],
    { wahl: [
      { t: 'Hand hoch für A: „Jeden ausreden lassen.“', staerke: 'zuhoeren', herz: { noah: 1, chiara: 1 }, merke: 'regelAusreden', dann: [
        ['hoffmann', 'A. Ausreden lassen. Auch mich, Jo.'],
        ['jo', 'Ich hab gar nichts gesagt.'],
        ['hoffmann', 'Noch nicht.'] ] },
      { t: 'Hand hoch für B: „Nicht ohne Fragen fotografieren.“', staerke: 'abstand', herz: { mila: 1, ayla: 1 }, merke: 'regelPosten', dann: [
        ['hoffmann', 'B. Kein Foto, kein Video, ohne zu fragen.'],
        ['mila', '(ohne aufzusehen) Gute Regel. Hält nur keiner ein.'],
        ['hoffmann', 'Dann fangen wir damit an.'] ] },
      { t: '„Warum nicht beide?“', staerke: 'klar', herz: { hoffmann: 1, ben: 1 }, merke: ['regelAusreden', 'regelPosten'], dann: [
        ['hoffmann', '(überlegt) … Beide. Aber dann halten wir uns auch an beide.'],
        ['ben', '(flüstert) Du hast am ersten Tag mit ihr verhandelt.'] ] },
    ] },
    { tu: 'n1_regeln' },
    ['hoffmann', 'Das Plakat kommt an die Tür. Wer unterschreibt, hält sich dran.'],
    ['erzaehler', 'Du unterschreibst. Unten rechts, klein.'],
    { blende: 'Zweite Stunde · Deutsch bei Mme Nouvelle' },
    ['nouvelle', 'Noah, lies uns bitte den ersten Satz vor.'],
    ['noah', '(liest) „Ich … heißt Noah.“'],
    ['erzaehler', 'Jo lacht. Laut. Zwei andere lachen mit.'],
    { tu: 'n1_lachen' },
    { tu: 'n1_deutschRest' },
  ],
  // Fachstunde (nur, wenn eingeschaltet – sonst freiwillig über 🎟 → Stunden): Lektion im eigenen Modul, dann Partnerkorrektur
  n1_deutsch: [
    ['nouvelle', 'So. Jetzt schauen wir, wo ihr steht. Jeder in seinem Modul.'],
    { stunde: 'deutsch' },
    ['nouvelle', 'Zum Schluss: Blätter tauschen. Korrigiert euch gegenseitig.'],
    ['erzaehler', 'Ben hat drei Fehler. Er schaut dich an, als wüsste er es schon.'],
    { wahl: [
      { t: '„Drei Fehler. Soll ich dir zeigen, wo?“', staerke: 'klar', herz: { ben: 1 }, merke: 'benFeedback', dann: [
        ['ben', 'Nur drei? Zeig.'],
        ['erzaehler', 'Ihr geht sie durch. Bei zweien lacht er über sich selbst.'] ] },
      { t: '„Alles richtig.“ (Damit er sich nicht schlecht fühlt.)', merke: 'benGeschont', dann: [
        ['ben', 'Echt?'],
        ['nouvelle', '(schaut über die Schulter) Ben, hier fehlt ein -e. Und hier. Und hier.'],
        ['ben', '(zu dir, leise) „Alles richtig“, ja?'] ] },
      { t: '„Drei Fehler. Ziemlich viele.“', herz: { ben: -1 }, merke: 'benBlossgestellt', dann: [
        ['ben', '(zieht das Blatt weg) Danke.'],
        ['erzaehler', 'Den Rest der Stunde schaut er nur nach vorn.'] ] },
    ] },
    ['nouvelle', 'Wer Fehler zeigt, hilft. Bis morgen.'],
  ],
  mila: [
    ['erzaehler', 'Mila sitzt allein auf der Bank. Sie dreht an einem Zauberwürfel, ohne hinzusehen.'],
    ['mila', 'Du bist die Person vom Foto.'],
    { wahl: [
      { t: '„Ist hier frei?“', staerke: 'kontakt', herz: { mila: 1 }, dann: [
        ['mila', '(nimmt die Tasche weg) Jetzt schon.'],
        ['erzaehler', 'Eine Minute sagt keiner was. Es ist nicht unangenehm.'] ] },
      { t: '„Du hast im Chat nach der Uhrzeit gefragt. Warum?“', staerke: 'zuhoeren', herz: { mila: 2 }, merke: 'milaAura', dann: [
        ['mila', 'Weil keiner fragt. Alle schauen nur, wer drauf ist.'],
        ['mila', 'Mich interessiert, wer es macht. Und warum von unten.'],
        ['mila', '(dreht weiter) Von unten fotografiert man, wenn es keiner sehen soll.'] ] },
      { t: '(Hinsetzen. Nichts sagen.)', staerke: 'warten', herz: { mila: 1 }, merke: 'milaStill', dann: [
        ['erzaehler', 'Klack, klack. Sie legt den Würfel hin. Fertig.'],
        ['mila', '(ohne aufzusehen) Du redest nicht, nur weil es still ist. Gut.'] ] },
      { t: '„Komm mit zum Korb.“', staerke: 'einbeziehen', dann: [
        ['mila', 'Nein danke. Ich bleib hier.'],
        ['mila', 'Aber danke, dass du fragst.'] ] },
    ] },
  ],
  freiwurf: [
    ['ben', '{name}! Fünf Freiwürfe. Wer weniger trifft, holt Wasser für alle.'],
    ['yusuf', 'Er verliert immer. Und holt nie Wasser.'],
    ['ben', 'Heute ist anders. Los.'],
    { tu: 'freiwurf' },
  ],
  freiwurfDanach: [
    ['ben', '(außer Atem) Okay. Nicht schlecht.'],
    { wahl: [
      { t: '(Wasser holen. Für alle drei.)', staerke: 'kontakt', herz: { ben: 2, yusuf: 1 }, dann: [['ben', 'Du holst Wasser, obwohl du gewonnen hast?'], ['yusuf', '(nimmt die Flasche) Danke.']] },
      { t: '„Wer verliert, holt. Abgemacht ist abgemacht.“', staerke: 'klar', herz: { ben: 1, yusuf: 1 }, dann: [['ben', '(seufzt) Ich hol ja schon.'], ['yusuf', '(zu dir, leise) Das hat noch keiner geschafft.']] },
      { t: '„Lass mal. Nächstes Mal.“', herz: { ben: 1 }, dann: [['ben', 'Nächstes Mal. Das sag ich auch immer.']] },
    ] },
  ],
  n1_kantine: [
    ['kremer', 'Nächster! Nudeln oder Curry?'],
    ['erzaehler', 'Luca schiebt sich vor dich. Kenan und Dario direkt dahinter.'],
    ['erzaehler', 'Hinter Luca hält Dario sein Handy hoch. Ziemlich tief.'],
    { szene: 'hitze', id: 'kantine', def: KANTINE_DUELL, ausgang: kantineAusgang,
      folgen: {
        knall: { herz: { luca: -3, kenan: -1, kremer: -1 }, merke: ['lucaFeind', 'kantineKnall'], dann: [
          ['erzaehler', 'Ein Tablett fällt. Nudeln auf dem Boden. Alle drehen sich um.'],
          ['kremer', 'Schluss! Ihr zwei: nach hinten. Beide.'],
          ['luca', '(leise) Wir sehen uns.'] ] },
        heiss: { herz: { luca: -2 }, merke: 'lucaFeind', dann: [
          ['kremer', 'Hier wird nicht gestritten. Luca, nach hinten.'],
          ['luca', 'Merk ich mir.'] ] },
        witz: { staerke: 'humor', herz: { luca: 1, kenan: 1 }, merke: ['lucaRespekt', 'kantineWitz'], dann: [
          ['luca', 'Okay. Geh vor. Einmal.'],
          ['kenan', '(grinst) Der lässt nie wen vor.'] ] },
        leise: { staerke: 'ruhig', merke: ['lucaGewonnen', 'nudelnAus'], dann: [
          ['kremer', 'Nudeln sind aus. Curry für den Rest.'],
          ['luca', '(mit drei Tellern Nudeln) Pech.'] ] },
        hilfe: { staerke: 'hilfe', herz: { kremer: 1, luca: -1 }, merke: 'lucaKremer', dann: [
          ['kremer', 'Ich hab’s gesehen. Luca. Hinten anstellen.'],
          ['luca', 'Echt jetzt?'] ] },
        klar: { staerke: 'klar', herz: { luca: 1, kremer: 1 }, merke: 'lucaRespekt', dann: [
          ['luca', '(schaut dich lange an) … Geh halt.'],
          ['dario', '(steckt das Handy weg) Langweilig.'] ] },
      } },
    ['kremer', 'Gudden Appetit. Nächster!'],
    { tu: 'tablett' },
  ],
  tisch_noah: [
    ['noah', 'Hier ist frei. Ich hab den Platz mit meiner Jacke freigehalten.'],
    ['ayla', 'Seit zehn Minuten. Er hat sogar Ben weggeschickt.'],
    ['noah', 'Ich hab gesagt, er ist besetzt. Das stimmte ja.'],
    { tu: 'gegessen' },
  ],
  tisch_mila: [
    ['mila', 'Setz dich. Ich hab eine Frage.'],
    ['mila', 'Dario hatte vorhin das Handy oben. An der Ausgabe. Hast du das gesehen?'],
    { wahl: [
      { t: '„Ja. Ziemlich tief gehalten.“', staerke: 'lesen', herz: { mila: 2 }, merke: 'spurDario', dann: [['mila', 'Gut. Dann sind wir zwei.'], ['mila', 'Das heißt noch nichts. Aber ich schreib es auf.']] },
      { t: '„Und? Alle filmen alles.“', herz: { mila: -1 }, dann: [['mila', 'Nicht alle. Aber okay.']] },
      { t: '„Lass uns erst essen.“', staerke: 'ruhig', herz: { mila: 1 }, dann: [['mila', '(schiebt dir das Salz rüber) Okay. Erst essen.']] },
    ] },
    { tu: 'gegessen' },
  ],
  // Dritter Tisch: Lina allein, Kopfhörer, Skizzenbuch. Wer sich hier hinsetzt, muss nichts reden – und Lina zeigt Dienstag mehr.
  tisch_lina: [
    ['erzaehler', 'Lina sitzt allein. Ein Kopfhörer drin. Sie zeichnet auf eine Serviette.'],
    { wahl: [
      { t: '„Ist hier frei?“', staerke: 'kontakt', herz: { lina: 2 }, merke: 'linaTisch', dann: [['lina', '(nimmt den Kopfhörer raus) … Ja.'], ['erzaehler', 'Sie zeichnet weiter. Die Kantine, von oben.']] },
      { t: '(Einfach hinsetzen. Nichts sagen.)', staerke: 'lesen', herz: { lina: 1 }, merke: 'linaTisch', dann: [['erzaehler', 'Ihr esst. Keiner redet. Es ist trotzdem angenehm.'], ['lina', '(nach einer Weile, schiebt dir die Serviette hin) Für dich.']] },
    ] },
    { tu: 'gegessen' },
  ],
  n1_post: [
    ['hoffmann', 'Handys bitte weg. Ab jetzt in die Tasche.'],
    ['erzaehler', 'Bevor deins weg ist, vibriert es. Dann das von Ben. Dann alle.'],
    { szene: 'chat', id: 'post1', def: (m) => postChat(m),
      ausgang: (r) => (r.flags.selbstironie ? 'selbstironie' : r.flags.klartext || r.flags.herausgefordert ? 'mutig' : r.flags.gemeldet ? 'gemeldet' : r.flags.stumm ? 'stumm' : r.flags.witz ? 'witz' : 'still'),
      folgen: {
        selbstironie: { staerke: 'humor', herz: { ben: 2, jo: 1, luca: 1 }, merke: 'umfrageCool', dann: [['erzaehler', 'Die Umfrage kippt. Cool gewinnt knapp. Gut fühlt es sich trotzdem nicht an.']] },
        mutig: { staerke: 'mut', herz: { ayla: 2, mila: 1, dario: -1 }, merke: ['umfrageMutig', 'campFeind'], dann: [['erzaehler', 'Zwei Minuten später ist die Umfrage weg. Gelöscht. Von wem?']] },
        gemeldet: { staerke: 'hilfe', herz: { mila: 1 }, merke: 'gemeldet', dann: [['erzaehler', 'Abends ist der Beitrag weg. Der Account nicht.']] },
        witz: { staerke: 'humor', herz: { ben: 1 }, dann: [['erzaehler', 'Cool 14, cringe 15. Fast unentschieden. Es bleibt eine Umfrage über dich.']] },
        stumm: { merke: 'postStumm', dann: [['erzaehler', 'Abends: 112 Nachrichten. Du liest keine. Dann doch eine.']] },
        still: { merke: 'postStill', dann: [['erzaehler', 'Cringe gewinnt, 16 zu 11. „Ist nur eine Umfrage“, schreibt Noah. Er meint es nett.']] },
      } },
    { tu: 'n1_postRegel' },
    ['hoffmann', '(laut) Handys. Weg. Alle.'],
    ['erzaehler', 'Sie geht durch die Reihen. Bei dir bleibt sie stehen.'],
    ['hoffmann', '{name}?'],
    { wahl: [
      { t: '(Handy wegstecken.)', dann: [['hoffmann', 'Danke.']] },
      { t: '„Ich bin schon wieder auf @annexe.cam.“', staerke: 'hilfe', herz: { hoffmann: 1 }, merke: 'hoffmannGefragt', dann: [
        ['hoffmann', '(leise) Schon wieder?'], ['hoffmann', 'Ich sag Herrn Kuedes Bescheid. Er ist vom SePAS. Heute noch.'], ['jo', '(leise) Die macht das echt.']] },
      { t: '(Das Handy umdrehen. Nichts sagen.)', merke: 'postVerschwiegen', dann: [
        ['hoffmann', '(schaut aufs Handy, dann zu dir) Nach der Stunde. Wenn du magst.']] },
    ] },
  ],
  n1_heimweg: [
    ['erzaehler', '15:30. Der erste Tag ist vorbei.'],
    ['noah', 'Gleicher Bus? … Ich hab den Beitrag gemeldet. Dreimal.'],
    { wahl: [
      { t: '„Danke, Noah. Echt.“', staerke: 'kontakt', herz: { noah: 2 }, dann: [['noah', 'Keine Ahnung, ob dreimal mehr bringt. Es hat sich besser angefühlt.']] },
      { t: '„Dreimal zählt nur einmal.“', herz: { noah: -1 }, dann: [['noah', '… Ja. Weiß ich.'], ['erzaehler', 'Im Bus setzt er sich zwei Reihen weiter vorne hin.']] },
      { t: '„Wer macht so einen Account?“', staerke: 'lesen', herz: { noah: 1 }, dann: [['noah', 'Jemand, der viel sieht und nichts sagt.'], ['noah', '(Pause) Das trifft hier auf ziemlich viele zu.']] },
    ] },
    ['fahrer', 'Einsteigen. Ich warte nicht.'],
    ['erzaehler', 'Im Bus. Dein Platz, links am Fenster. Eine Nachricht. Unbekannte Nummer.'],
    { szene: 'chat', id: 'unbekannt', def: UNBEKANNT,
      ausgang: (r) => (r.flags.erwachsen ? 'erwachsen' : r.flags.beweis ? 'beweis' : r.flags.blockiert ? 'blockiert' : r.flags.gefragt ? 'gefragt' : 'nichts'),
      folgen: {
        // Nicht allein damit bleiben ist der stärkste Weg.
        erwachsen: { staerke: ['hilfe', 'abstand'], herz: { kaya: 1 }, merke: ['unbekanntBeweis', 'spurNummer', 'unbekanntErwachsen'], dann: [
          ['erzaehler', 'Zu Hause zeigst du es jemandem, dem du vertraust.'],
          ['erzaehler', '„Gut, dass du es zeigst. Nicht antworten. Morgen sagen wir es der Schule.“'],
          ['erzaehler', 'Du schläfst besser als gedacht. Die Nummer endet auf 77.']] },
        gefragt: { merke: 'unbekanntGefragt', dann: [['erzaehler', 'Keine Antwort mehr. Nur zwei Haken. Du liest die Nachricht noch viermal.']] },
        blockiert: { staerke: 'abstand', merke: 'unbekanntBlockiert', dann: [['erzaehler', 'Blockiert. Der Bus fährt los. Du setzt dich trotzdem auf die andere Seite.']] },
        beweis: { staerke: 'hilfe', herz: { mila: 1 }, merke: ['unbekanntBeweis', 'spurNummer'], dann: [['erzaehler', 'Gespeichert. Die Nummer endet auf 77.']] },
        nichts: { merke: 'unbekanntIgnoriert', dann: [['erzaehler', 'Du legst das Handy weg. Bildschirm nach unten.']] },
      } },
  ],
  n1_diMorgen: [
    ['erzaehler', 'Dienstag. Sport, erste Stunde.'],
    ['erzaehler', 'Die Umfrage von gestern hat jeder gesehen. Keiner spricht sie an. Ein paar schauen kurz zu dir.'],
  ],
  n1_sport: [
    ['sommer', '(pfeift) Allez. Basket. Kapitäne: Jo und {name}.'],
    ['jo', 'Du fängst an. Ich bin großzügig.'],
    { szene: 'teams', id: 'teams', def: TEAMS,
      ausgang: (r) => (['lina', 'noah', 'mila'].includes(r.zuerst) ? 'erstwahl' : r.team.includes('lina') && r.letzte !== 'lina' ? 'linaFrueh' : r.letzte === 'lina' ? 'linaLetzte' : 'normal'),
      folgen: {
        erstwahl: { staerke: 'einbeziehen', herz: { noah: 1, mila: 1, lina: 2, jo: -1 }, merke: 'teamErstwahl', dann: [
          ['jo', 'Du nimmst als Erstes …? Okay. Ich nehm Ben.'], ['erzaehler', 'Deine erste Wahl steht plötzlich etwas gerader.'] ] },
        linaFrueh: { staerke: 'einbeziehen', herz: { lina: 2 }, dann: [['erzaehler', 'Lina muss nicht bis zum Schluss an der Wand stehen. Diesmal nicht.']] },
        linaLetzte: { herz: { lina: -1 }, merke: 'linaLetzte', dann: [
          ['jo', '(laut) Die Letzte kriegt {name}.'], ['erzaehler', 'Lina zieht die Ärmel über die Hände und geht langsam rüber.'], ['sommer', '(leise) Ab nächster Woche lose ich die Teams.'] ] },
        normal: { dann: [['sommer', 'Teams stehen. Aufs Feld.']] },
      } },
    ['sommer', 'Fünf Würfe pro Person. Die Summe zählt fürs Team.'],
    { tu: 'freiwurf' },
    ['sommer', '(pfeift) Gut gespielt. Alle. Umziehen.'],
    { tu: 'n1_sportNach' },
  ],
  // Lina auf der Treppe: Nachfragen öffnet, Ausfragen schließt. Wer zuhört, sieht die Zeichnung – und die erste echte Spur.
  n1_kunst: [
    ['erzaehler', 'Pause. Im Treppenhaus vom Neubau ist es still. Lina sitzt auf der dritten Stufe und zeichnet.'],
    { tu: 'n1_kunstLina' },
    { szene: 'nachhaken', id: 'linaInterview', def: (m) => ({ ...LINA_INTERVIEW, startOffen: m.linaTisch ? 1 : 0 }),
      ausgang: (r) => (r.offen >= 4 ? 'offen' : r.offen >= 2 ? 'etwas' : 'zu'),
      folgen: {
        offen: { staerke: 'zuhoeren', herz: { lina: 3 }, merke: ['linaGerd', 'linaOffen', 'spurZeichnung'], dann: [
          ['erzaehler', 'Lina dreht das Heft zu dir. Die Haltestelle, Montag früh. Mit Bleistift.'],
          ['erzaehler', 'Du stehst vorne. Neben dir Noah, die Jacke über dem Arm. Auf dem Dach eine Taube.'],
          ['lina', 'Und da. Hinter euch. Links.'],
          ['erzaehler', 'Eine Figur ohne Gesicht. Kapuze. Das Handy auf Hüfthöhe, schräg nach oben.'],
          ['lina', 'Das Gesicht hab ich nicht gesehen. Nur die Hand. Und die Schuhe. Weiß. Ganz neu.'],
          ['lina', '(leise) Ich hab es keinem gezeigt. Wem soll ich es zeigen?'],
          { wahl: [
            { t: '„Darf ich es Mila zeigen? Sie sucht auch.“', staerke: 'vertrauen', herz: { lina: 1, mila: 1 }, merke: 'linaMila', dann: [['lina', '(überlegt) … Nur Mila. Okay.']] },
            { t: '„Behalt es. Aber heb es gut auf.“', herz: { lina: 1 }, merke: 'linaBehalten', dann: [['lina', 'Ich heb alles auf.']] },
            { t: '„Wir könnten es Herrn Kuedes zeigen.“', staerke: 'hilfe', merke: 'linaKuedes', dann: [['lina', '(Pause) Nur wenn du mitkommst.']] },
          ] } ] },
        etwas: { staerke: 'zuhoeren', herz: { lina: 1 }, merke: 'linaHalb', dann: [
          ['lina', '(klappt das Heft halb zu) Ein andermal vielleicht.'],
          ['erzaehler', 'Du hast eine Bushaltestelle gesehen. Und hinten links etwas, das wie eine Hand aussieht.'] ] },
        zu: { dann: [['erzaehler', 'Lina zeichnet weiter. Du gehst. Oben an der Treppe drehst du dich noch mal um. Sie schaut dir nach.']] },
      } },
  ],
  // Mittwoch: Herr Kuedes ruft dich zu sich. Kein Verhör – er fragt, wie es dir geht, und was du willst.
  n1_kuedesRuf: [
    ['erzaehler', 'Mittwoch. In der Halle hält dich jemand am Ärmel fest. Mila.'],
    ['mila', 'Herr Kuedes sucht dich. Vom SePAS. Er hat nach „der Person vom Foto“ gefragt.'],
    ['noah', 'Das ist nicht schlimm. Glaub ich. Der ist nett.'],
  ],
  n1_kuedes: [
    ['kaya', 'Hey, {name}. Komm rein. Tür kann offen bleiben oder zu, wie du willst.'],
    ['kaya', 'Ich bin Herr Kuedes. SePAS. Das heißt: Ich bin hier, wenn es jemandem nicht gut geht.'],
    { tu: 'n1_kuedesGrund' },
    ['kaya', 'Ich will nicht wissen, was genau war. Erst mal nur: Wie geht’s dir damit?'],
    { wahl: [
      { t: '„Ehrlich? Ich schau die ganze Zeit, wer ein Handy in der Hand hat.“', staerke: 'ehrlich', herz: { kaya: 2 }, merke: 'kuedesEhrlich', dann: [
        ['kaya', 'Das ist ziemlich anstrengend. Und ziemlich normal, wenn so was passiert.'],
        ['kaya', 'Du musst das nicht allein rausfinden.'] ] },
      { t: '„Geht schon. Ist ja nur ein Foto.“', merke: 'kuedesKlein', dann: [
        ['kaya', 'Kann sein.'],
        ['kaya', 'Manchmal ist es nur ein Foto. Manchmal ist es das dritte. Sag mir, wenn es das dritte ist.'] ] },
      { t: '„Können Sie den Account nicht einfach löschen?“', staerke: 'klar', herz: { kaya: 1 }, merke: 'kuedesLoeschen', dann: [
        ['kaya', 'Ich wünschte, ich könnte. Löschen kann nur die Plattform.'],
        ['kaya', 'Melden können wir. Und ich kann dafür sorgen, dass hier jemand hinschaut.'] ] },
    ] },
    { tu: 'n1_kuedesBeweis' },
    ['kaya', 'Eine Sache noch. Ich könnte mit eurer Klasse reden. Über Fotos, über den Account.'],
    ['kaya', 'Aber nur, wenn du das willst. Nicht über deinen Kopf hinweg.'],
    { wahl: [
      { t: '„Ja. Reden Sie mit der Klasse.“', staerke: 'mut', herz: { kaya: 1 }, merke: 'kuedesKlasse', dann: [
        ['kaya', 'Okay. Ich sag nicht, dass es um dich geht. Ich red über alle.'] ] },
      { t: '„Nein. Dann bin ich die Person, wegen der es Ärger gibt.“', merke: 'kuedesNein', dann: [
        ['kaya', 'Verstehe ich. Dann nicht.'],
        ['kaya', 'Das Angebot bleibt. Die Tür auch.'] ] },
      { t: '„Noch nicht. Vielleicht später.“', staerke: 'abstand', merke: 'kuedesSpaeter', dann: [
        ['kaya', 'Später ist eine gute Antwort. Du entscheidest das.'] ] },
    ] },
    ['kaya', 'Und, {name}: Du hast nichts falsch gemacht. Nur damit das einmal gesagt ist.'],
    { blende: 'Mittwoch · 11:40 · Halle' },
    ['erzaehler', 'Draußen vibrieren die Handys. Alle gleichzeitig.'],
    ['erzaehler', '@annexe.cam hat eine Story. Schwarz, weiße Schrift.'],
    ['erzaehler', '„Kommenden Montag: TOP 5 LANGWEILIGSTE LEUTE DER 7P2. Ratet mal. 📷“'],
    ['noah', '(Nachricht) kurze frage. glaubst du, ich bin da drauf?'],
    { tu: 'kapitelEnde' },
  ],
  n1_checkin: [
    ['erzaehler', 'Skills-Stunde in der Aula. Auf dem Handy: „Check-in“.'],
    { szene: 'checkin', id: 'checkin1', def: CHECKIN_MI, ausgang: (r) => r.gefuehl, folgen: {} },
  ],
  n1_skills: [
    ['kaya', 'Wéi geet et? Herr Kuedes, SePAS. Hier lernt ihr euch erst mal kennen.'],
    ['kaya', 'Zum Aufwärmen: Namen. Drei Runden. Ihr werdet schneller.'],
    { szene: 'namen', id: 'namen', def: { leute: KLASSE_NAMEN, runden: 3, proRunde: 5 },
      ausgang: (r) => (r.treffer >= r.gesamt * 0.8 ? 'top' : r.treffer >= r.gesamt * 0.5 ? 'mittel' : 'wenig'),
      folgen: {
        top: { staerke: 'kontakt', herz: { noah: 1, mila: 1, lina: 1, yusuf: 1 }, merke: 'namenTop', dann: [['kaya', 'Dritte Runde, fast doppelt so schnell. Üben wirkt.']] },
        mittel: { staerke: 'kontakt', herz: { noah: 1 }, dann: [['kaya', 'Besser als Runde eins. Genau darum geht’s.']] },
        wenig: { dann: [['kaya', 'Namen sind schwer. Nächste Woche kennst du drei mehr.']] },
      } },
    { szene: 'skillsStunde', id: 's1_ankommen', def: S1_ANKOMMEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'hilfe', merke: 's1Ankommen' }, weiter: { merke: 's1Ankommen' } } },
    ['kaya', 'Die fünf Regeln stehen. Welche ist dir am wichtigsten? Oder fehlt eine?'],
    { wahl: [
      { t: '„Keine Fotos von Leuten ohne Ja.“', staerke: 'klar', herz: { mila: 1, ayla: 1 }, merke: 'regelFotos', dann: [
        ['ayla', 'Die Regel bräuchte die halbe Schule.'], ['kaya', 'Dann fangen wir mit diesem Raum an.'] ] },
      { t: '„Niemand muss was Persönliches sagen.“', staerke: 'einbeziehen', herz: { noah: 2, mila: 1 }, merke: 'regelPersoenlich', dann: [
        ['noah', '(leise) Danke.'], ['kaya', 'Steht ganz oben. Zu Recht.'] ] },
      { t: '„Was hier gesagt wird, bleibt hier. Außer bei Gefahr.“', staerke: 'vertrauen', herz: { lina: 2, kaya: 1 }, merke: 'regelVertraulich', dann: [
        ['lina', '(nickt. Zweimal.)'], ['kaya', 'Genau. Bei Gefahr hol ich Hilfe. Und sag es euch vorher.'], ['jo', 'Auch im Chat? Das wird schwer.'] ] },
      { t: '„Jede Woche Kekse.“', staerke: 'humor', herz: { ben: 2 }, merke: 'regelKekse', dann: [
        ['ben', 'Endlich eine gute Regel.'], ['kaya', 'Kekse gehen klar. Und von den ernsten: Welche zählt für dich?'] ] },
    ] },
    ['kaya', 'Gut. Unterschreiben. Dann raus auf den Hof.'],
  ],
  n1_blind: [
    ['kaya', 'Blind-Parcours. Eine Person sieht nichts. Die andere lotst.'],
    ['kaya', 'Wer zu hektisch ist, kriegt ein Stopp. Das darf jeder sagen.'],
    ['kaya', 'Such dir wen aus.'],
    { wahl: [
      { t: 'Noah.', herz: { noah: 1 }, merke: 'blindNoah', dann: [['noah', 'Ich? Okay. Ich vertraue dir. Glaub ich.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.noah }, ...blindFolgen('noah') }] },
      { t: 'Mila.', herz: { mila: 1 }, merke: 'blindMila', dann: [['mila', 'In Ordnung. Sag „links“ nur, wenn du links meinst.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.mila }, ...blindFolgen('mila') }] },
      { t: 'Ben.', herz: { ben: 1 }, merke: 'blindBen', dann: [['ben', 'Lass mich bitte nicht gegen den Brunnen laufen.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.ben }, ...blindFolgen('ben') }] },
      { t: 'Lina.', staerke: 'einbeziehen', herz: { lina: 2 }, merke: 'blindLina', dann: [['lina', '(überrascht) Oh. Okay.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.lina }, ...blindFolgen('lina') }] },
    ] },
    ['kaya', 'Tausch. Jetzt siehst DU nichts.'],
    ['erzaehler', 'Augenbinde. Dunkel. Jemand sagt „links“. Du gehst links. Es klappt.'],
    ['kaya', 'Was braucht eine Gruppe, damit das klappt?'],
    { wahl: [
      { t: '„Dass man sich traut, Stopp zu sagen.“', staerke: 'klar', dann: [['kaya', 'Kommt in den Vertrag. Danke.']] },
      { t: '„Dass keiner lacht, wenn wer hinfällt.“', staerke: 'einbeziehen', herz: { noah: 1 }, dann: [['jo', '(leise) … okay. Fair.']] },
      { t: '„Dass man sich vorher kennt.“', staerke: 'kontakt', herz: { ben: 1 }, dann: [['kaya', 'Genau darum war das die erste Stunde.']] },
    ] },
    { szene: 'stempel', def: (m) => ({ modul: 'Modul 0 · Ankommen', titel: 'Angekommen',
      gelernt: ['Namen gelernt' + (m.namenTop ? ' – sehr schnell' : ''), 'Check-in mit genauem Gefühlswort', 'Die fünf Regeln, die eine Gruppe sicher machen', 'Jemanden gelotst – und selbst blind gelaufen'],
      mission: 'Sprich diese Woche jemanden an, mit dem du noch nie geredet hast. Und lern drei Namen aus der Parallelklasse.' }), folgen: {} },
    ['kaya', 'Danke euch. Das war die erste Skills-Stunde.'],
  ],
};

// TUN für Kapitel 1 (in spiel.js eingehängt)
export const tunN1 = (c) => ({
  // Klassenregeln: was die Klasse heute Morgen beschlossen hat (Toast + im Stand, für spätere Szenen)
  n1_regeln: () => {
    const m = c.S.merke, r = ['Pünktlich Pause machen.'];
    if (m.regelLina) r.push('Keiner lacht, wenn jemand was falsch sagt.');
    if (m.regelPate) r.push('Wer neu ist, bekommt jemanden, der alles zeigt.');
    if (m.regelAusreden) r.push('Jeden ausreden lassen.');
    if (m.regelPosten) r.push('Niemand wird ohne Fragen fotografiert oder gefilmt.');
    c.S.klassenregeln = r;
    c.ui.toast('<b>📌 Klassenregeln der 7P2</b><span>' + r.join(' · ') + '</span>', 'ly-t-ent');
  },
  // Deutsch, zweite Stunde: Hält Linas Regel? Sonst entscheidest du.
  n1_lachen: () => {
    if (c.S.merke.regelLina) return [
      ['lina', '(leise, aber alle hören es) Regel eins.'],
      ['erzaehler', 'Chiara zeigt auf die Tür. Da hängt das Plakat.'],
      ['jo', 'Ja, ja. Schon gut.'],
      ['noah', '(atmet aus) Ich heiße Noah.'],
      ['nouvelle', 'Genau so. Fehler sind hier erlaubt. Steht ja an der Tür.'] ];
    return [{ wahl: [
      { t: '„Lass ihn, Jo.“', staerke: 'klar', herz: { noah: 2, jo: -1 }, merke: 'noahVerteidigt', dann: [['jo', '… Okay, okay.'], ['noah', '(leise) Danke.']] },
      { t: '(Noah zuflüstern:) „Heiße. Mit -e.“', staerke: 'hilfe', herz: { noah: 1 }, merke: 'noahGeholfen', dann: [['noah', 'Ich heiße Noah.'], ['nouvelle', 'Genau. Danke für den Tipp da hinten.']] },
      { t: '(Nichts sagen.)', merke: 'noahAusgelacht', dann: [['erzaehler', 'Noah wird rot. Er liest den Rest so leise, dass keiner etwas versteht.']] },
    ] }];
  },
  // Rest der Deutschstunde: läuft im Hintergrund, außer die Lehrperson hat den Unterricht in der Geschichte eingeschaltet
  n1_deutschRest: () => ((c.ui.einstellungen && c.ui.einstellungen().unterricht) ? [] : [{ blende: 'Der Rest der Stunde: Satzglieder. Dann klingelt es.' }]),
  // Nachmittag: Wer „Nicht ohne Fragen fotografieren“ gewählt hat, hört es wieder
  n1_postRegel: () => (c.S.merke.regelPosten ? [
    ['hoffmann', '(sieht die Handys) Heute Morgen beschlossen. Heute Mittag gebrochen.'],
    ['hoffmann', 'Nicht von euch. Aber an euch. Das lass ich nicht so stehen.'] ] : []),
  n1_sportNach: () => {
    const m = c.S.merke, t = m.freiwurf || 0, gewonnen = t >= 3;
    return [
      ['erzaehler', gewonnen ? 'Dein Team gewinnt knapp. Ben jubelt, als wäre es ein Finale.' : 'Jos Team gewinnt. Jo dreht eine Runde mit erhobenen Armen.'],
      ...(m.teamErstwahl ? [['noah', '(leise) Ich bin noch nie als Erster gewählt worden.']] : []),
      ...(m.linaLetzte ? [['erzaehler', 'Lina sitzt danach allein auf der Bank und zieht die Schuhe sehr langsam aus.']] : []),
      ['jo', gewonnen ? 'Revanche. Nächste Woche.' : 'Gut gespielt, {name}.'],
    ];
  },
  // Herr Kuedes: woher er es weiß (ehrlich, ohne Petzen-Gefühl)
  n1_kuedesGrund: () => {
    const m = c.S.merke;
    if (m.hoffmannGefragt) return [['kaya', 'Mme Tidderich hat mir gesagt, dass du auf einem Account gelandet bist. Sie hat gesagt, du hast es selbst erzählt.']];
    if (m.unbekanntErwachsen) return [['kaya', 'Heute Morgen kam ein Anruf. Von zu Hause, wegen einer Nachricht an dich. Gut, dass du sie gezeigt hast.']];
    return [['kaya', 'Ein paar aus deiner Klasse haben mir von einem Account erzählt. Und von einem Foto am ersten Tag.']];
  },
  // Spuren, die man schon hat: Screenshot, Linas Zeichnung
  n1_kuedesBeweis: () => {
    const m = c.S.merke, z = [];
    if (m.unbekanntBeweis) z.push({ wahl: [
      { t: '(Den Screenshot von der Nummer zeigen.)', staerke: 'hilfe', merke: 'kuedesNummer', dann: [['kaya', '(liest lange) „Du sitzt immer links.“ Das ist nicht mehr lustig. Das ist Beobachten.'], ['kaya', 'Den behalt ich als Kopie. Wenn noch eine kommt: Nicht antworten. Zu mir.']] },
      { t: '(Den Screenshot behalten. Nichts davon sagen.)', merke: 'kuedesNummerNicht', dann: [] },
    ] });
    if (m.linaKuedes) z.push(['erzaehler', 'Du erzählst von Linas Zeichnung.'], ['kaya', 'Lina kann jederzeit kommen. Mit dir zusammen, wenn sie das lieber will.']);
    return z;
  },
});
