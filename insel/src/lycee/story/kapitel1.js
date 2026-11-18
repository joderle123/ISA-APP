// Neue Geschichte „@annexe.cam“ (annexe/STORY.md) – Kapitel 1 „Der erste Tag“.
// Jugendsprache je Figur: annexe/FIGUREN.md („Slang“). Situations-Spiele: situation.js ({ szene: 'hitze' | 'chat' }).
// Höchstens rund 12 Wörter je Blase. Kein richtig/falsch – die Leute reagieren.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1) };
// ---------- Zettel-Krimi (statt Bingo): Wer hat welchen Zettel geschrieben? ----------
const P = { ben: ['Ben', '#d9a21b'], jo: ['Jo', '#c0392b'], lina: ['Lina', '#9b7bc8'], ayla: ['Ayla', '#e85d75'], noah: ['Noah', '#3f78b8'], yusuf: ['Yusuf', '#5fa0d0'], chiara: ['Chiara', '#3fa66b'] };
const ZETTEL = {
  wo: 'Saal 1.04 · Mme Tidderich liest vor',
  leute: [
    { id: 'ben', hinweis: 'Hundehaare auf dem Pulli', falsch: 'Ich? Leider nein. Aber gute Idee.' },
    { id: 'jo', hinweis: 'Schlüsselanhänger: kleines Auto', falsch: 'Digga, nein. Guck richtig hin.' },
    { id: 'lina', hinweis: 'Finger tippen leise auf den Tisch', falsch: '(schüttelt nur den Kopf)' },
    { id: 'ayla', hinweis: 'Plektrum an der Kette', falsch: 'Nope. Aber ich mag deinen Mut.' },
    { id: 'noah', hinweis: 'Kaktus-Sticker auf dem Heft', falsch: 'Ich? Nein. Ich glaub nicht. Nein.' },
    { id: 'yusuf', hinweis: 'Sporttasche mit Gürtel drin', falsch: 'Nein.' },
    { id: 'chiara', hinweis: 'Brotdose mit Pasta', falsch: 'Non. Falscher Zettel.' },
  ].map((p) => ({ ...p, name: P[p.id][0], farbe: P[p.id][1] })),
  zettel: [
    { von: 'ben', t: 'Mein Hund hat mein Ladekabel gegessen.', sagt: [['ben', 'Keks heißt er. Er hat das Kabel komplett gegessen.'], ['ben', 'Sein Vater ist auch so. Also der Hund-Vater.']] },
    { von: 'jo', t: 'Meine zwei Katzen heißen wie Autos.', sagt: [['jo', 'Turbo und Diesel.'], ['jo', 'Diesel ist schneller. Wie im echten Leben.']] },
    { von: 'lina', t: 'Ich spiele Klavier. Aber nur, wenn keiner zuhört.', sagt: [['lina', '(leise) … Ja. Das war meiner.']] },
    { von: 'ayla', t: 'Ich spiele Bass. Laut. Sehr laut.', sagt: [['ayla', 'Bass ist Gitarre mit Selbstbewusstsein. Merk dir das.']] },
    { von: 'noah', t: 'Mein Kaktus heißt Kevin. Er hat eine Sonnenbrille.', sagt: [['noah', 'Zählt ein Kaktus als Haustier? Für mich schon.']] },
  ],
};
const KLASSE_STEHT = { ayla: [-24, -27, 0.4], ben: [-21.5, -22.5, -2.6], chiara: [-19.5, -25.5, 1.8], yusuf: [-23.6, -20.2, 2.4], jo: [-19.55, -21, -1.5], lina: [-19.55, -27.8, -0.6] };

export const SCHRITTE_N1 = [
  { id: 'ankunft', kap: 1, tag: 'Montag', uhr: 7.55, titel: 'Der erste Morgen', ziel: 'Sprich mit Noah an der Haltestelle.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n1_intro' },
    leute: { noah: [-20.5, 42.3, -1.9], fahrer: [-11.2, 44.6, -Math.PI / 2], kenan: [-3, 30, 0.5, 'redet'], dario: [-2, 31.2, -2.6, 'redet'], mila: [-26, 17.5, Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n1_noah' } },
  { id: 'sekretariat', kap: 1, tag: 'Montag', uhr: 7.7, titel: 'Wo muss ich hin?', ziel: 'Hol im Sekretariat deinen Stundenplan.', marker: 'weber',
    start: { gespraech: 'n1_benDM' },
    leute: { noah: [-6, -5, 2.4], weber: [-21, -9.4, 0, 'telefon'], kenan: [-12, -15.5, 1.2, 'redet'], dario: [-10.9, -16.3, -2, 'redet'] },
    fertig: { reden: 'weber', gespraech: 'n1_weber' } },
  { id: 'klasse', kap: 1, tag: 'Montag', uhr: 7.95, titel: 'Saal 1.04', ziel: 'Geh in Saal 1.04 zu Mme Tidderich.', marker: 'hoffmann',
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n1_hoffmann' } },
  { id: 'pause', kap: 1, tag: 'Montag', uhr: 10.0, titel: 'Große Pause', ziel: 'Pause! Zu Mila auf die Bank – oder zum Korb, wo Ben wettet.', marker: ['mila', 'ben'],
    start: { teleport: 'eingangHof' },
    leute: { mila: [-20, 11.6, Math.PI, 'sitzt'], ben: [27.5, 21, 0.8], yusuf: [30.8, 22.2, -0.9], noah: [2, 14, 0.6, 'redet'], ayla: [3, 15.3, -2.5, 'redet'], kenan: [-34, 9, 1], dario: [-32.6, 10.2, -2] },
    fertig: { eins: ['mila', 'freiwurf'] } },
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.2, titel: 'Mittag in der Kantine', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [22.6, -10.6, -Math.PI / 2], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'n1_kantine' } },
  { id: 'tisch', kap: 1, tag: 'Montag', uhr: 12.3, titel: 'Wohin setzen?', ziel: 'Such dir einen Platz.', marker: ['noah', 'mila'],
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [24.6, -7.4, 2.6], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'] },
    fertig: { eins: ['noah', 'mila'] } },
  { id: 'post', kap: 1, tag: 'Montag', uhr: 13.6, titel: 'Handys vibrieren', ziel: 'Zurück in Saal 1.04. Mme Tidderich wartet.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n1_post' } },
  { id: 'heimweg', kap: 1, tag: 'Montag', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zum Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ben: [8, 36, 2.6], yusuf: [9.2, 35.4, -2.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n1_heimweg' } },
  // ---------- Dienstag: Sport (Teams wählen) und Kunst (Interview mit Nachhaken) ----------
  { id: 'k1_sport', kap: 1, tag: 'Dienstag', uhr: 8.0, titel: 'Sport', ziel: 'Turnhalle. Frau Sommer pfeift schon.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer', gespraech: 'n1_diMorgen' },
    leute: { sommer: [45.2, -12.6, Math.PI], ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0], mila: [52.4, -14.6, -1.2] },
    fertig: { reden: 'sommer', gespraech: 'n1_sport' } },
  { id: 'k1_kunst', kap: 1, tag: 'Dienstag', uhr: 10.4, titel: 'Kunst', ziel: 'Kunstraum im Neubau. Mme Kiesser verteilt Steckbriefe.', marker: 'kiesser',
    leute: { kiesser: [54, -50.6, Math.PI], lina: [51.6, -50.2, -0.4], noah: [56.2, -50.1, 0.5, 'redet'], ayla: [57.4, -50.4, -2.6, 'redet'], ben: [49.2, -50.4, 0.3, 'redet'], jo: [48.0, -50.6, 2.8, 'redet'] },
    fertig: { reden: 'kiesser', gespraech: 'n1_kunst' } },
  // ---------- Mittwoch: Skills-Stunde ----------
  { id: 'k1_skills', kap: 1, tag: 'Mittwoch', uhr: 9.9, titel: 'Skills-Stunde', ziel: 'Geh in die Aula. Herr Kuedes wartet mit einem Ball.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n1_checkin' },
    leute: { kaya: [-14, -55.5, Math.PI], noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] },
    fertig: { reden: 'kaya', gespraech: 'n1_skills' } },
  { id: 'k1_blind', kap: 1, tag: 'Mittwoch', uhr: 10.6, titel: 'Draußen: Team-Aufgabe', ziel: 'Auf den Hof. Herr Kuedes hat Hütchen aufgebaut.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [2, 14, Math.PI], noah: [4, 13, -1.6], mila: [-1.6, 13.4, 1.4], ben: [3.2, 16.2, -2.4], lina: [-0.6, 16.4, 2.6], jo: [5.6, 15.4, -2], ayla: [-2.6, 15.8, 1.9] },
    fertig: { reden: 'kaya', gespraech: 'n1_blind' } },
];

// ---------- Situations-Spiel: Einladung in den Klassenchat ----------
const CHAT_EINLADUNG = {
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 26,
  nachrichten: [
    { nach: 0.6, system: true, text: 'Jo hat dich hinzugefügt.' },
    { nach: 1.8, wer: 'Ben', text: 'wer ist das' },
    { nach: 3.4, wer: 'Jo', text: 'die neue person. aus dem bus' },
    { nach: 5.2, wer: 'Ben', text: 'neue person = neue aura. wir messen gleich 📏' },
    { nach: 7.2, wer: 'Noah', text: 'Hallo. Ich bin auch neu. Hallo.' },
    { nach: 8.6, wer: 'Ben', text: 'zwei mal hallo. ehrlich süß noah' },
    { nach: 10.6, wer: 'Chiara', text: 'Hat jemand Mathe Seite 12? Ernsthaft jetzt.' },
    { nach: 12.4, wer: 'Luca', text: 'lowkey egal wer neu ist', wennNicht: 'vorgestellt' },
    { nach: 14.6, wer: 'Ben', text: '{name}? schreib was. wir warten ⏳', wennNicht: 'vorgestellt' },
    { nach: 16, wer: '@annexe.cam (geteilt)', bild: 'Du, an der Haltestelle. Vor zwei Minuten.', text: 'neue person. bus 110. willkommen 📷' },
    { nach: 17.2, wer: 'Jo', text: 'digga wer ist DAS account 💀' },
    { nach: 18.5, wer: 'Luca', text: 'liest nur, schreibt nix. sus', wennNicht: 'vorgestellt' },
    { nach: 21, wer: 'Mila', text: 'Was bedeutet Aura in diesem Zusammenhang?' },
    { nach: 23, wer: 'Ben', text: 'mila. aura erklär ich dir in der pause' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Moien. {name}. Bin neu, beiße nicht.“', setzt: ['vorgestellt', 'nett'], ich: 'Moien. {name}. Bin neu, beiße nicht.', folgen: [{ nach: 1.2, wer: 'Ayla', text: 'moien 👋 willkommen' }, { nach: 2.4, wer: 'Ben', text: '+300 aura. solide' }] },
      { t: '„Aura messen? Ich hab 9000.“', setzt: ['vorgestellt', 'witz'], ich: 'Aura messen? Ich hab 9000.', folgen: [{ nach: 1, wer: 'Ben', text: '9000? sein vater. +1000' }, { nach: 2.2, wer: 'Jo', text: 'wallah frech. gefällt mir' }, { nach: 3.4, wer: 'Luca', text: 'mal sehen' }] },
      { t: '„Seite 12 hab ich auch nicht, Chiara.“', setzt: ['vorgestellt', 'chiara'], ich: 'Seite 12 hab ich auch nicht, Chiara.', folgen: [{ nach: 1.3, wer: 'Chiara', text: 'Endlich antwortet wer. Danke. Nutzlos, aber danke.' }] },
    ] },
    { id: 'sticker', t: 'Winke-Sticker schicken', symbol: '👋', setzt: ['vorgestellt', 'sticker'], ich: '👋🙂', folgen: [{ nach: 1.1, wer: 'Ben', text: 'ein sticker. mutig. +100' }] },
    { id: 'stumm', t: 'Gruppe stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Ruhe. Herrlich.', ende: true },
  ],
};

// ---------- Situations-Spiel: Ben schreibt privat (Running Gag: Schulden) ----------
const BEN_DM = {
  titel: 'Ben 🏀', mitglieder: 2, dauer: 12,
  nachrichten: [
    { nach: 0.5, wer: 'Ben', text: 'yo neue person 👋' },
    { nach: 2.0, wer: 'Ben', text: 'kurze frage für einen freund' },
    { nach: 3.6, wer: 'Ben', text: 'hast du 2€? der freund bin ich' },
    { nach: 8.5, wer: 'Ben', text: 'ok du überlegst. respekt. ich warte am korb', wennNicht: 'geantwortet' },
  ],
  aktionen: [
    { id: 'antwort', t: 'Antworten', symbol: '💬', wahl: [
      { t: '„Klar. Gib ich dir in der Pause.“', setzt: ['geantwortet', 'zahlt'], ich: 'klar. pause.', folgen: [{ nach: 1, wer: 'Ben', text: 'EHRENMANN. oder ehrenfrau. ehrenperson 🙏' }] },
      { t: '„Was krieg ich dafür?“', setzt: ['geantwortet', 'handel'], ich: 'was krieg ich dafür?', folgen: [{ nach: 1.2, wer: 'Ben', text: 'zinsen. in witzen. täglich. deal?' }] },
      { t: '„Nein 😂“', setzt: ['geantwortet', 'nein'], ich: 'nein 😂', folgen: [{ nach: 1, wer: 'Ben', text: 'respekt. du lernst schnell hier' }] },
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
        { t: '„Äh. Ich war dran.“', stimme: 'kopf', art: 'klar', hitze: 8, respekt: 1, antwort: 'Und? Jetzt bin ich dran. Safe.' },
        { t: '„Sorry, wie heißt du? Vordrängler?“', stimme: 'stolz', art: 'angriff', hitze: 28, respekt: 1, antwort: 'Wie bitte? Sag das nochmal.' },
        { t: '„Nimmst du mir eine mit?“', art: 'witz', hitze: -12, respekt: 1, antwort: '(kurzes Grinsen) Frech. Lowkey frech.' },
        { t: '(Aufs Handy gucken.)', stimme: 'bauch', art: 'rueckzug', hitze: -5, respekt: -1, antwort: 'Siehst du, Kenan. Die neue Person ist chill.' },
      ], still: { hitze: -4, respekt: -1, antwort: 'Kein Kommentar? Safe.' } },
    { sagt: 'Neu hier und gleich Stress machen? Ehrenlos, ehrlich.',
      karten: [
        { t: '„Kein Stress. Ich will nur Nudeln.“', stimme: 'kopf', art: 'klar', hitze: -10, respekt: 1, antwort: 'Hm. Alle wollen Nudeln.' },
        { t: '„Ehrenlos ist Vordrängeln, Bruder.“', stimme: 'stolz', art: 'angriff', hitze: 30, respekt: 1, antwort: 'Bruder? Pass auf, wie du redest.' },
        { t: '„Frau Kremer, gibt’s heute Nudeln für alle?“', art: 'hilfe', hitze: -6, respekt: 0, antwort: '(rollt die Augen) Echt jetzt?' },
        { t: '„Ist okay. Geh vor.“', stimme: 'bauch', art: 'rueckzug', hitze: -12, respekt: -1, antwort: 'Merci. Siehst du, geht doch.' },
      ], still: { hitze: -6, respekt: -1, antwort: 'Dacht ich mir.' } },
    { sagt: 'Dario, film mal. Die neue Person will diskutieren.',
      wenn: (z) => z.hitze > 20,
      karten: [
        { t: '„Film ruhig. Ich steh nur hier.“', stimme: 'kopf', art: 'klar', hitze: -14, respekt: 2, antwort: '(guckt zu Dario) … Lass. Ist langweilig.' },
        { t: '„Gib das Handy her!“ (Nach Dario greifen.)', stimme: 'stolz', art: 'angriff', hitze: 40, respekt: 0, antwort: 'EY! Finger weg!' },
        { t: '„Für dein Profil? Ich mach auch ein Lächeln.“', art: 'witz', hitze: -16, respekt: 2, antwort: '(lacht wider Willen) Okay. Okay. Du bist komisch.' },
        { t: '(Tablett nehmen. Weggehen.)', stimme: 'bauch', art: 'rueckzug', hitze: -8, respekt: 0, antwort: 'Ja, lauf.' },
      ], still: { hitze: 4, respekt: -1, antwort: 'Erde an neue Person?' } },
  ],
};
const kantineAusgang = (r) => (r.knall ? 'knall' : r.hitze >= 60 ? 'heiss' : (r.arten.witz || 0) >= 2 || ((r.arten.witz || 0) >= 1 && r.respekt >= 2) ? 'witz'
  : (r.arten.rueckzug || 0) + (r.arten.still || 0) >= 2 ? 'leise' : (r.arten.hilfe || 0) >= 1 && !(r.arten.klar || 0) ? 'hilfe' : 'klar');

// ---------- Situations-Spiel: @annexe.cam postet dich (Live-Chat mit Umfrage) ----------
const UNTERSCHRIFT = { knall: 'KANTINEN-KRIEG 🍝💥 neue person vs luca', heiss: 'neue person sucht stress?? 🍝', witz: 'neue person hat rizz?? 🍝😂', leise: 'luca 1 : neue person 0 🍝', hilfe: 'neue person ruft die kantinen-polizei 🚨', klar: 'neue person bleibt cool. oder?? 🍝' };
const postChat = (m) => ({
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 36,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ben hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Du, Kantine, Tablett in der Hand', text: UNTERSCHRIFT[m.n1_kantine || 'klar'] + '  UMFRAGE: cool oder cringe?', lacher: { start: 2, proSek: 0.35, stopp: ['selbstironie', 'klartext', 'herausgefordert', 'gemeldet'] } },
    { nach: 3.4, wer: 'Jo', text: 'digga wer ist annexe.cam 💀' },
    { nach: 5.0, wer: 'Ben', text: 'umfrage: cool 7, cringe 9. es wird eng' },
    { nach: 7.0, wer: 'Luca', text: 'lowkey cringe', wenn: 'lucaFeind' },
    { nach: 7.0, wer: 'Luca', text: 'lowkey cool. hab nix gesagt', wenn: 'lucaRespekt' },
    { nach: 9.4, wer: 'Mila', text: 'Wer hat das Foto gemacht? Der Winkel ist von links.' },
    { nach: 11.5, wer: 'Dario', text: 'keine ahnung bro. war nicht ich 👀' },
    { nach: 13.5, wer: 'Ben', text: 'cool 9, cringe 12. hart 📉', wennNicht: 'selbstironie' },
    { nach: 12.4, wer: 'Ayla', text: 'stopp. wir voten nicht über leute', wenn: 'klartext' },
    { nach: 12.4, wer: 'Ayla', text: 'stopp. wir voten nicht über leute', wenn: 'herausgefordert' },
    { nach: 13.5, wer: 'Ben', text: 'cool 15, cringe 10. COMEBACK 📈', wenn: 'selbstironie' },
    { nach: 16, wer: 'Noah', text: 'Ich habe cool gewählt. Zweimal. Geht das?' },
    { nach: 19, wer: 'Ayla', text: 'leute, ist das nicht bisschen sus? wer postet sowas', wennNicht: 'stumm' },
    { nach: 22, wer: 'Jo', text: 'ich will auch gepostet werden ehrlich', wennNicht: 'gemeldet' },
    { nach: 25, wer: 'Chiara', text: 'Kann mal jemand über Seite 12 reden. Bitte.' },
    { nach: 29, system: true, text: '@annexe.cam: „Bis morgen, 7P2. Ich seh alles. 📷“' },
  ],
  aktionen: [
    { id: 'lachen', t: 'Über dich selbst lachen', symbol: '😂', setzt: 'selbstironie', ich: '😂😂 mein bester winkel', folgen: [{ nach: 1.1, wer: 'Ben', text: 'okay das ist stark. +500' }, { nach: 2.3, wer: 'Jo', text: 'ehrenhaft' }] },
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Wer ist annexe.cam? Zeig dich.“', setzt: 'herausgefordert', ich: 'wer ist annexe.cam? zeig dich', folgen: [{ nach: 1.5, wer: 'Dario', text: 'easy bro. ist nur spaß' }, { nach: 3.2, wer: 'Mila', text: 'Gute Frage. Ich notiere.' }] },
      { t: '„Cringe ist, heimlich Leute zu fotografieren.“', setzt: 'klartext', ich: 'cringe ist heimlich leute fotografieren', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'real.' }, { nach: 2.8, wer: 'Luca', text: 'oha. hat wer gefragt?' }] },
      { t: '„Stimmt für cool, ihr Feiglinge.“', setzt: 'witz', ich: 'stimmt für cool ihr feiglinge', folgen: [{ nach: 1.2, wer: 'Ben', text: 'cool 14!! es lebt' }] },
    ] },
    { id: 'privat', t: 'Mila privat schreiben', symbol: '🔒', setzt: 'milaPrivat', ich: '(privat an Mila) wie meinst du das mit dem winkel?', folgen: [{ nach: 2, wer: 'Mila (privat)', text: 'Das Foto ist von links unten. Wie aus einer Tasche.' }] },
    { id: 'melden', t: 'Account melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Gemeldet.', folgen: [{ nach: 2, wer: 'Ben', text: 'hab auch gemeldet. zwei sind besser als einer' }] },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Dein Handy vibriert trotzdem in deinem Kopf.', ende: true },
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
  wo: 'Kunstraum · Steckbrief', wer: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' },
  start: '(leise) Hi. Wir sollen uns interviewen. Du fragst zuerst.',
  runden: [
    { fragen: [
      { t: 'Was machst du am liebsten?', art: 'offen', offen: 1, antwort: 'Zeichnen. Comics.' },
      { t: 'Magst du Kunst?', art: 'zu', offen: 0, antwort: 'Ja.' },
      { t: 'Ich kann gar nicht zeichnen, haha.', art: 'ueber-mich', offen: 0, antwort: '(lächelt kurz) Okay.' },
      { t: 'Warum redest du eigentlich so wenig?', art: 'bohren', offen: -1, antwort: '(zuckt mit den Schultern. Guckt aufs Blatt.)' },
    ] },
    { fragen: (o) => [
      { t: 'Was für Comics? Worüber?', art: 'nachhaken', offen: 2, antwort: o >= 1 ? 'Über eine Taube. Sie ist Detektivin. Sie heißt Gerd.' : 'Verschiedenes.' },
      { t: 'Cool.', art: 'zu', offen: 0, antwort: 'Mhm.' },
      { t: 'Zeigst du mir mal eins?', art: 'offen', offen: 1, antwort: 'Vielleicht. Später. Nicht hier.' },
    ] },
    { fragen: (o) => [
      { t: o >= 2 ? 'Warum ausgerechnet eine Taube?' : 'Und was machst du noch so?', art: 'nachhaken', offen: 2, antwort: o >= 2 ? 'Weil keiner auf Tauben achtet. Die sehen alles.' : 'Klavier. Und … nichts Besonderes.' },
      { t: 'Ich mag eher Videospiele.', art: 'ueber-mich', offen: 0, antwort: 'Oh. Okay.' },
      { t: 'Was soll ich in den Steckbrief schreiben?', art: 'offen', offen: 1, antwort: (x) => (x >= 3 ? 'Schreib: Lina. Zeichnet. Sieht mehr, als sie sagt.' : 'Schreib einfach „zeichnet“.') },
    ] },
  ],
  stufen: ['Lina hat fast nichts gesagt. Der Steckbrief hat zwei Wörter.', 'Ein Anfang. Lina hat ein bisschen erzählt.', 'Lina hat erzählt. Mehr als sonst.', 'Lina hat mehr erzählt als in der ganzen Woche.', 'Lina hat mehr erzählt als in der ganzen Woche.', 'Lina zeigt dir am Ende ihr Heft. Eine Seite. Mit Gerd.'],
};

const UNBEKANNT = {
  titel: '+352 6•• ••• •77', mitglieder: 2, dauer: 14,
  nachrichten: [
    { nach: 0.6, wer: 'Unbekannt', text: 'Willkommen an der Annexe 📷' },
    { nach: 2.4, wer: 'Unbekannt', text: 'Ich seh alles.' },
    { nach: 4.6, wer: 'Unbekannt', text: 'Morgen ist wer anders dran. Vielleicht.' },
    { nach: 9.5, wer: 'Unbekannt', text: '👀', wennNicht: 'gefragt' },
  ],
  aktionen: [
    { id: 'fragen', t: '„Wer bist du?“', symbol: '💬', setzt: 'gefragt', ich: 'wer bist du?', folgen: [{ nach: 1.6, wer: 'Unbekannt', text: 'jemand mit gutem winkel 😉' }] },
    { id: 'mila', t: 'Screenshot an Mila schicken', symbol: '📤', setzt: ['beweis', 'milaWeiss'], sys: 'Screenshot an Mila.', folgen: [{ nach: 2, wer: 'Mila (privat)', text: 'Nicht antworten. Screenshot. Morgen Kuedes. Protokoll.' }] },
    { id: 'beweis', t: 'Screenshot machen', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert.' },
    { id: 'erwachsen', t: 'Einem Erwachsenen zeigen', symbol: '🧑‍🏫', setzt: ['beweis', 'erwachsen'], sys: 'Screenshot gemacht. Morgen zeigst du ihn Herrn Kuedes.' },
    { id: 'block', t: 'Nummer blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert. Ruhe. Fürs Erste.', ende: true },
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
    : g === 'Wut' ? [{ wer: 'Jo', text: 'endlich wer ehrlich 😤' }]
    : g === 'Freude' ? [{ wer: 'Ben', text: 'gute laune person. bleib so' }]
    : g === 'Trauer' ? [{ wer: 'Ayla', text: '🫂' }]
    : [{ wer: 'Mila', text: 'Notiert.' }]),
};
const KLASSE_NAMEN = [
  { id: 'noah', name: 'Noah', farbe: '#3f78b8', geste: '🙋' }, { id: 'mila', name: 'Mila', farbe: '#2fb8a8', geste: '🧊' },
  { id: 'lina', name: 'Lina', farbe: '#9b7bc8', geste: '✏️' }, { id: 'jo', name: 'Jo', farbe: '#c0392b', geste: '🏎️' },
  { id: 'ben', name: 'Ben', farbe: '#d9a21b', geste: '🏀' }, { id: 'chiara', name: 'Chiara', farbe: '#3fa66b', geste: '📚' },
  { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0', geste: '🥋' }, { id: 'ayla', name: 'Ayla', farbe: '#e85d75', geste: '🎸' },
];
const ZWEI = {
  runden: [
    { wer: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, luege: 1,
      saetze: [{ t: 'Mein Hund hat mein Ladekabel gegessen.', zeichen: 'zuckt mit den Schultern' }, { t: 'Ich hab noch nie Schulden gemacht.', zeichen: 'grinst viel zu breit' }, { t: 'Ich hab mal 40 Chicken Nuggets gegessen.', zeichen: 'wird stolz' }],
      treffer: 'Okay, okay. Schulden hab ich. Bei dir auch bald.', daneben: 'Haha! Die Nuggets sind echt. Und die Schulden auch.' },
    { wer: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, luege: 2,
      saetze: [{ t: 'Ich kann den Würfel in 41 Sekunden.', zeichen: 'guckt dich direkt an' }, { t: 'Ich habe 212 Tauben gezählt. Dieses Jahr.', zeichen: 'guckt dich direkt an' }, { t: 'Ich mag Überraschungen.', zeichen: 'blinzelt dreimal' }],
      treffer: 'Korrekt. Überraschungen sind schlecht geplante Ereignisse.', daneben: 'Falsch. Ich hasse Überraschungen. Das war die Lüge.' },
    { wer: { id: 'jo', name: 'Jo', farbe: '#c0392b' }, luege: 0,
      saetze: [{ t: 'Ich bin schon Auto gefahren, digga. Autobahn.', zeichen: 'redet sehr schnell' }, { t: 'Meine Katze heißt Diesel.', zeichen: 'lacht' }, { t: 'Ich hab Angst vor Gänsen.', zeichen: 'wird leiser' }],
      treffer: 'Wallah, du bist gut. Parkplatz. Es war ein Parkplatz.', daneben: 'HA! Autobahn? Ich bin zwölf. Die Gänse sind echt, okay?' },
  ],
  eigene: [{ t: 'Ich kann rückwärts Fahrrad fahren.' }, { t: 'Ich war mal im Fernsehen. Hinten. Im Publikum.' }, { t: 'Ich hab einen Kaktus, der Kevin heißt.' }],
  eigeneRater: [
    { id: 'noah', name: 'Noah', farbe: '#3f78b8', gut: 0.3, richtig: 'Nummer … die da. Ich hab geraten.', falsch: 'Ich tippe auf die. Ich vertraue dir. Leider.' },
    { id: 'ayla', name: 'Ayla', farbe: '#e85d75', gut: 0.6, richtig: 'Easy. Du hast weggeguckt.', falsch: 'Digga, ich war so sicher.' },
    { id: 'ben', name: 'Ben', farbe: '#d9a21b', gut: 0.4, richtig: 'Lügen erkenn ich. Ich bin Profi.', falsch: 'Nee. Das ist gelogen. Oder? Sein Vater.' },
  ],
};
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
  noah: { gut: [['noah', 'Ich hab dir einfach vertraut. Das mach ich sonst nie.']], knapp: [['noah', 'Ich hab drei Hütchen umarmt. Aber wir sind da.']], hektik: [['noah', 'Du warst wie ein Navi im Tunnel. Sorry.']], nicht: [['noah', 'Nächstes Mal. Ich übe blind laufen. Zu Hause.']] },
  mila: { gut: [['mila', 'Präzise Ansagen. Ich bin beeindruckt. Etwas.']], knapp: [['mila', 'Links ist links. Nicht „ein bisschen links“.']], hektik: [['mila', 'Zu viele Befehle pro Sekunde. Ich hab abgeschaltet.']], nicht: [['mila', 'Ich hab die Hütchen gezählt. Zwölf. Wir haben keins geschafft.']] },
  ben: { gut: [['ben', 'TOR! Ohne Augen! Aura plus eine Million.']], knapp: [['ben', 'Ich hab ein Hütchen gegessen. Fast. Aber Tor!']], hektik: [['ben', 'Bruder, du hast geschrien wie mein Vater beim Fußball.']], nicht: [['ben', 'Wir sagen allen, wir haben gewonnen. Deal?']] },
  lina: { gut: [['lina', '(leise) Danke. Du hast nicht gehetzt.']], knapp: [['lina', '(lächelt) Ein bisschen wackelig. Aber okay.']], hektik: [['lina', '(nimmt die Binde ab) Kurz Pause. Bitte.']], nicht: [['lina', 'Es war trotzdem schön draußen.']] },
};

export const GESPRAECHE_N1 = {
  n1_intro: [
    ['erzaehler', 'Montag, 7:33. Erster Tag. Annexe Junglinster.'],
    ['erzaehler', 'Dein Handy vibriert. Schon wieder. Eine Gruppe.'],
    { szene: 'chat', id: 'einladung', def: CHAT_EINLADUNG,
      ausgang: (r) => (r.flags.witz ? 'witz' : r.flags.nett || r.flags.sticker ? 'nett' : r.flags.chiara ? 'chiara' : r.flags.stumm ? 'stumm' : 'still'),
      folgen: {
        witz: { staerke: 'humor', herz: { ben: 2, jo: 1 }, merke: 'auraWitz', dann: [['erzaehler', 'Ben hat dich schon im Kopf. Mit 9000 Aura.']] },
        nett: { staerke: 'kontakt', herz: { ayla: 1, ben: 1 }, dann: [['erzaehler', 'Zwei Leute haben dir zurückgewunken. Guter Start.']] },
        chiara: { staerke: 'kontakt', herz: { chiara: 2 }, dann: [['erzaehler', 'Chiara hat dich gespeichert. Als „Seite-12-Person“.']] },
        stumm: { merke: 'gruppeStumm', dann: [['erzaehler', 'Stumm. Später sind es 47 Nachrichten.']] },
        still: { merke: 'nurGelesen', herz: { mila: 1 }, dann: [['erzaehler', 'Du liest nur. Mila auch. Ihr seid zu zweit.']] },
      } },
    ['erzaehler', 'An der Haltestelle reserviert ein Junge eine Bank. Mit seiner Jacke.'],
  ],
  n1_noah: [
    ['noah', 'Moien. Du bist auf dem Foto. Hast du’s gesehen?'],
    ['noah', 'Ich bin Noah. Ich hab „Hallo“ zweimal geschrieben. Aus Versehen.'],
    { wahl: [
      { t: '„Minus 200 Aura. Ich hab’s gesehen.“', staerke: 'humor', herz: { noah: 1 }, merke: 'noahAura', dann: [
        ['noah', 'Was ist Aura? Ist das schlimm? Ich google das.'],
        ['noah', '(liest) … Okay. Ich hab also keine. Gut zu wissen.'] ] },
      { t: '„Zweimal Hallo ist doppelt höflich.“', staerke: 'kontakt', herz: { noah: 2 }, merke: 'noahGerettet', dann: [
        ['noah', 'Oh. So hab ich das noch nie gesehen.'],
        ['noah', 'Ich bleib in deiner Nähe. Ganz unauffällig.'],
        ['erzaehler', 'Er stellt sich neben dich. Sehr auffällig nah.'] ] },
      { t: '„Weißt du, wo Saal 1.04 ist?“', staerke: 'hilfe', herz: { noah: 1 }, dann: [
        ['noah', 'Nein. Aber ich hab eine Karte. Falsch rum, glaub ich.'] ] },
      { t: '(Kopfhörer rein. Nicken.)', merke: 'noahKopfhoerer', dann: [
        ['erzaehler', 'Noah redet weiter. Du hörst nur Bass.'],
        ['erzaehler', 'Er nickt mit. Er weiß nicht, wozu.'] ] },
    ] },
    ['noah', 'Ich muss … ins Sekretariat. Stundenplan. Kommst du?'],
    { tu: 'stundenplanTipp' },
  ],
  n1_benDM: [
    { szene: 'chat', id: 'benDM', def: BEN_DM,
      ausgang: (r) => (r.flags.zahlt ? 'zahlt' : r.flags.handel ? 'handel' : r.flags.nein ? 'nein' : 'ignoriert'),
      folgen: {
        zahlt: { herz: { ben: 2 }, merke: 'benVersprochen', dann: [{ tu: 'benSchuld' }] },
        handel: { staerke: 'humor', herz: { ben: 1 }, merke: 'benZinsen' },
        nein: { staerke: 'neinsagen', herz: { ben: 1 } },
        ignoriert: { merke: 'benGelesen', dann: [['erzaehler', 'Zwei blaue Haken. Ben hat es gesehen. Ben sieht alles.']] },
      } },
  ],
  n1_weber: [
    { tu: 'weberTelefon' },
    ['weber', '„… nein, die Liste kommt heute. Ja. Nein. JA.“'],
    ['erzaehler', 'Mme Weber telefoniert. Auf der Theke: ein Berg Stundenpläne.'],
    { wahl: [
      { t: '(Warten.)', staerke: 'warten', herz: { weber: 1 }, dann: [
        ['weber', 'So. Name? … {name}, 7P2. Saal 1.04. Spind 117.'],
        ['weber', 'Moien übrigens. Ich bin bis 16 Uhr da. Nicht 16:05.'] ] },
      { t: '„Entschuldigung, ich bin neu!“', staerke: 'klar', herz: { weber: -1 }, dann: [
        ['weber', '(hält den Hörer zu) Siehst du das? Das ist ein Telefon.'],
        ['weber', '(schiebt dir ein Blatt hin) Spind 117. Weg.'] ] },
      { t: '(Einen Plan vom Stapel nehmen. Gehen.)', merke: 'falscherPlan', dann: [
        ['erzaehler', 'Zehn Sekunden. Keiner merkt was. Perfekt.'],
        ['erzaehler', 'Fast perfekt. Oben steht „7P1“.'] ] },
    ] },
    { tu: 'stundenplan' },
    { tu: 'spindFrei' },
  ],
  n1_hoffmann: [
    ['hoffmann', 'Ah! {name}! Willkommen in der 7P2.'],
    { tu: 'zuSpaet' },
    ['hoffmann', 'Das wird ein Jahr … wie sagt ihr … lit.'],
    ['erzaehler', 'Die ganze Klasse stöhnt. Jo stöhnt mit Echo.'],
    ['ben', '(flüstert) Minus 5000 Aura. Für sie. Nicht für dich.'],
    ['hoffmann', 'Neue Methode! Jeder hat mir letzte Woche einen Zettel geschrieben.'],
    ['hoffmann', 'Ohne Namen. Eine Sache über sich. Du bist neu – du rätst.'],
    { wahl: [
      { t: '„Sie haben „lit“ gesagt. Das darf man nicht.“', staerke: 'humor', herz: { ben: 1, jo: 1, hoffmann: -1 }, dann: [
        ['jo', 'WALLAH. Endlich sagt’s wer.'],
        ['hoffmann', 'Ich darf alles. Ich hab einen Kaffee.'] ] },
      { t: '„Muss ich auch einen Zettel schreiben?“', staerke: 'hilfe', herz: { hoffmann: 1 }, dann: [
        ['hoffmann', 'Nächste Woche. Wenn du willst. Heute nur raten.'],
        ['jo', '(äfft nach) „Muss ich auch einen Zettel?“'], ['hoffmann', 'Jo. Benimm dich. Oder rate mit.'] ] },
      { t: 'Okay.', dann: [] },
    ] },
    { szene: 'zettel', id: 'zettel', def: ZETTEL,
      ausgang: (r) => (r.richtig.length >= 4 ? 'gut' : r.richtig.length >= 2 ? 'mittel' : 'schwer'),
      folgen: {
        gut: { staerke: 'lesen', herz: { ben: 1, lina: 1, noah: 1 }, merke: 'zettelGut', dann: [['hoffmann', 'Detektivin! Oder Detektiv. Jedenfalls: Wow.']] },
        mittel: { herz: { ben: 1 }, dann: [['ben', 'Nicht schlecht für Tag eins. Ich hab bei mir selbst falsch geraten.']] },
        schwer: { herz: { noah: 1 }, dann: [['noah', '(flüstert) Ich hätte auch nix erraten. Ehrlich.']] },
      } },
    ['hoffmann', 'Notiert: Methode funktioniert. Zweimal unterstrichen.'],
    ['ben', '(flüstert) Zweimal unterstrichen. Bei ihr ist das eine Eins plus.'],
  ],
  bingoFertig: [
    ['hoffmann', 'Bingo! Schneller als die 7P1. Das schreib ich an die Tafel.'],
    ['ben', 'Schneller als die 7P1. Sein Vater, ehrlich.'],
  ],
  bingo_ayla: { felder: ['musik'], zeilen: [['ayla', 'Bass. Digga, das ist Gitarre mit Selbstbewusstsein.'], ['ayla', 'Und du? Nee, warte. Erst Ben fragen. Der hat ’nen Hund.']] },
  bingo_ben: { felder: ['sport', 'tier'], zeilen: [['ben', 'Korbball im Verein. Und Hund. Keks heißt er.'], ['ben', 'Er hat mein Ladekabel gegessen. Sein Vater ist auch so.']] },
  bingo_chiara: { felder: ['kochen'], zeilen: [['chiara', 'Ich koche. Pasta. Mit mehr Knoblauch als Pasta.'], ['chiara', 'Voilà. Und jetzt Seite 12, bitte.']] },
  bingo_yusuf: { felder: ['sport'], zeilen: [['yusuf', 'Judo.'], ['yusuf', 'Safe.']] },
  bingo_jo: { felder: ['tier'], zeilen: [['jo', 'Zwei Katzen. Turbo und Diesel.'], ['jo', 'Diesel ist schneller. Wie im echten Leben.']] },
  bingo_lina: { felder: ['musik', 'kochen'], zeilen: [['lina', '(leise) Klavier.'], ['lina', 'Und … Kuchen. Manchmal. Sag’s keinem.']] },
  bingo_noah: { felder: [], zeilen: [['noah', 'Zählt ein Kaktus als Haustier? Er heißt Kevin.'], ['noah', 'Nein? Okay. Lina hat zwei Felder. Glaub ich.']] },
  mila: [
    ['erzaehler', 'Mila sitzt allein auf der Bank. Klack, klack. Zauberwürfel.'],
    ['mila', 'Du bist die Person aus der Gruppe. 9 Uhr 02 beigetreten.'],
    { wahl: [
      { t: '„Ist hier frei?“', staerke: 'kontakt', herz: { mila: 1 }, dann: [
        ['mila', '(nimmt die Tasche weg) Jetzt ja.'],
        ['erzaehler', 'Dann sagt keiner was. Eine ganze Minute. Keiner stirbt.'] ] },
      { t: '„Was ist Aura? Du hattest gefragt.“', staerke: 'zuhoeren', herz: { mila: 2 }, merke: 'milaAura', dann: [
        ['mila', 'Ben sagt, eine Punktzahl für Coolness. Ohne Regeln.'],
        ['mila', 'Ein System ohne Regeln. Das ist unwissenschaftlich.'],
        ['mila', '(dreht weiter) Ich hab vermutlich minus 40000.'] ] },
      { t: '(Hinsetzen. Nichts sagen.)', staerke: 'warten', herz: { mila: 1 }, merke: 'milaStill', dann: [
        ['erzaehler', 'Klack, klack, klack. Sie legt den Würfel hin. Fertig.'],
        ['mila', '(ohne aufzusehen) 41 Sekunden. Merk dir die Zahl.'] ] },
      { t: '„Komm mit zum Korb. Ben wettet.“', staerke: 'einbeziehen', dann: [
        ['mila', 'Ben wettet mit Geld, das er nicht hat.'],
        ['mila', 'Geh ruhig. Ich zähl hier die Tauben.'] ] },
    ] },
  ],
  freiwurf: [
    ['ben', 'Neue Person! Freiwürfe. Wer verliert, zahlt zwei Euro.'],
    ['yusuf', 'Er meint: Wer verliert, verliert. Fünf Würfe.'],
    ['ben', 'Er meint: Ich hab kein Geld. Los!'],
    { tu: 'freiwurf' },
  ],
  freiwurfDanach: [
    ['ben', 'Nicht schlecht. Ach so, und die zwei Euro …'],
    { wahl: [
      { t: '(Zwei Euro geben.)', staerke: 'kontakt', herz: { ben: 2, yusuf: 1 }, dann: [{ tu: 'benSchuld' }, ['ben', 'Du bist mein erster Investor. Ehrenwort.'], ['yusuf', 'Hm. Das sagt er jeden Tag.']] },
      { t: '„Morgen. Vielleicht.“', herz: { ben: 1 }, dann: [['ben', 'Respekt. Du lernst schnell hier.']] },
      { t: '„Ich hab gewonnen. DU zahlst.“', staerke: 'humor', herz: { ben: 1, yusuf: 1 }, dann: [['ben', '(sucht in der Tasche) Ich hab … einen Kaugummi.'], ['yusuf', 'Nimm ihn nicht.']] },
    ] },
  ],
  n1_kantine: [
    ['kremer', 'Nächster! Nudeln oder Curry? Zack, zack.'],
    ['erzaehler', 'Luca schiebt sich vor dich. Kenan und Dario dahinter.'],
    ['erzaehler', 'Luca hat das Handy oben. Dario guckt weg.'],
    { szene: 'hitze', id: 'kantine', def: KANTINE_DUELL, ausgang: kantineAusgang,
      folgen: {
        knall: { herz: { luca: -3, kenan: -1, kremer: -1 }, merke: ['lucaFeind', 'kantineKnall'], dann: [
          ['erzaehler', 'Ein Tablett fällt. Nudeln auf dem Boden. Alle drehen sich um.'],
          ['kremer', 'SCHLUSS! Ihr zwei: nach hinten. Ganz nach hinten.'],
          ['luca', '(leise) Wir sehen uns, neue Person.'] ] },
        heiss: { herz: { luca: -2 }, merke: 'lucaFeind', dann: [
          ['kremer', 'Hier wird nicht gestritten. Luca, nach hinten. Sofort.'],
          ['luca', 'Merk ich mir. Ehrlich.'] ] },
        witz: { staerke: 'humor', herz: { luca: 1, kenan: 1 }, merke: 'lucaRespekt', dann: [
          ['luca', 'Okay. Geh vor. Weil du lustig bist. Einmal.'],
          ['kenan', '(grinst) Ich schwör, der lässt nie wen vor.'] ] },
        leise: { staerke: 'ruhig', merke: ['lucaGewonnen', 'nudelnAus'], dann: [
          ['kremer', 'So. Nudeln sind aus. Curry für den Rest.'],
          ['luca', '(mit drei Tellern Nudeln) Tja. Safe.'] ] },
        hilfe: { staerke: 'hilfe', herz: { kremer: 1, luca: -1 }, merke: 'lucaKremer', dann: [
          ['kremer', 'Ich seh’s. Luca. Hinten anstellen.'],
          ['luca', 'Echt jetzt? Kantinen-Polizei.'] ] },
        klar: { staerke: 'klar', herz: { luca: 1, kremer: 1 }, merke: 'lucaRespekt', dann: [
          ['luca', '(guckt dich an. Lange.) … Safe. Geh halt.'],
          ['dario', '(steckt das Handy weg) Langweilig, bro.'] ] },
      } },
    ['kremer', 'Gudden Appetit. Nächster!'],
    { tu: 'tablett' },
  ],
  tisch_noah: [
    ['noah', 'Hier! Platz frei. Ich hab ihn mit meiner Jacke verteidigt.'],
    ['ayla', 'Seit zehn Minuten. Er hat Ben weggeschickt. Respekt, Noah.'],
    ['noah', 'Ich hab „Respekt“ bekommen. Ist das Aura?'],
    { tu: 'gegessen' },
  ],
  tisch_mila: [
    ['mila', 'Oh. Du. Setz dich. Ich hab eine Frage.'],
    ['mila', 'Dario hatte das Handy oben. Bei dir an der Ausgabe.'],
    { wahl: [
      { t: '„Hab ich auch gesehen.“', staerke: 'lesen', herz: { mila: 2 }, merke: 'spurDario', dann: [['mila', 'Gut. Dann sind wir zwei Zeugen.'], ['mila', 'Zeugen wovon, weiß ich noch nicht.']] },
      { t: '„Und? Alle filmen alles.“', herz: { mila: -1 }, dann: [['mila', 'Statistisch nicht. Aber okay.']] },
      { t: '„Iss erst mal. Curry wird kalt.“', staerke: 'humor', herz: { mila: 1 }, dann: [['mila', 'Curry ist auch kalt essbar. Aber gut.']] },
    ] },
    { tu: 'gegessen' },
  ],
  n1_post: [
    ['hoffmann', 'Neue Methode: Handy-Hotel. Alle Handys in die Kiste.'],
    ['erzaehler', 'Bevor deins drin ist, vibriert es. Und das von Ben. Und Jos.'],
    { szene: 'chat', id: 'post1', def: (m) => postChat(m),
      ausgang: (r) => (r.flags.selbstironie ? 'selbstironie' : r.flags.klartext || r.flags.herausgefordert ? 'mutig' : r.flags.gemeldet ? 'gemeldet' : r.flags.stumm ? 'stumm' : r.flags.witz ? 'witz' : 'still'),
      folgen: {
        selbstironie: { staerke: 'humor', herz: { ben: 2, jo: 1, luca: 1 }, merke: 'umfrageCool', dann: [['erzaehler', 'Die Umfrage kippt. Cool gewinnt. Knapp.']] },
        mutig: { staerke: 'mut', herz: { ayla: 2, mila: 1, dario: -1 }, merke: ['umfrageMutig', 'campFeind'], dann: [['erzaehler', 'Die Umfrage stoppt. Jemand hat sie gelöscht. Wer?']] },
        gemeldet: { staerke: 'hilfe', herz: { mila: 1 }, merke: 'gemeldet', dann: [['erzaehler', 'Abends ist der Beitrag weg. Der Account nicht.']] },
        witz: { staerke: 'humor', herz: { ben: 1 }, dann: [['erzaehler', 'Cool 14, cringe 15. Ein Unentschieden. Fast.']] },
        stumm: { merke: 'postStumm', dann: [['erzaehler', 'Abends: 112 Nachrichten. Du liest keine. Oder doch eine.']] },
        still: { merke: 'postStill', dann: [['erzaehler', 'Cringe gewinnt. 16 zu 11. Es ist nur eine Umfrage. Sagt Noah.']] },
      } },
    ['hoffmann', '{name}. Handy. Hotel. Danke.'],
    { wahl: [
      { t: '(Handy in die Kiste.)', dann: [['hoffmann', 'Danke. Zimmer 12. Mit Meerblick.']] },
      { t: '„Wer ist @annexe.cam?“', staerke: 'hilfe', herz: { hoffmann: 1 }, merke: 'hoffmannGefragt', dann: [
        ['hoffmann', '(Pause) Ein Account? Ich schau mir das an.'], ['hoffmann', 'Und ich sag Herrn Kuedes Bescheid.'], ['jo', 'Digga, die schaut sich das echt an.']] },
    ] },
  ],
  n1_diMorgen: [
    ['erzaehler', 'Dienstag. Sport. Deine Turnschuhe sind dabei. Diesmal.'],
    ['ben', 'Neue Person! Gestern noch auf @annexe.cam, heute im Trikot. Karriere.'],
  ],
  n1_sport: [
    ['sommer', '(pfeift) Allez! Korbball. Kapitäne: Jo und … die neue Person.'],
    ['jo', 'Okay. Ich fang an? Nein? Du fängst an. Großzügig.'],
    { szene: 'teams', id: 'teams', def: TEAMS,
      ausgang: (r) => (['lina', 'noah', 'mila'].includes(r.zuerst) ? 'erstwahl' : r.team.includes('lina') && r.letzte !== 'lina' ? 'linaFrueh' : r.letzte === 'lina' ? 'linaLetzte' : 'normal'),
      folgen: {
        erstwahl: { staerke: 'einbeziehen', herz: { noah: 1, mila: 1, lina: 2, jo: -1 }, merke: 'teamErstwahl', dann: [
          ['jo', 'Du nimmst zuerst …? Okay. Mutig. Ich nehm Ben.'], ['erzaehler', 'Wen du zuerst genommen hast, steht ein Stück gerader.'] ] },
        linaFrueh: { staerke: 'einbeziehen', herz: { lina: 2 }, dann: [['erzaehler', 'Lina muss nicht bis zum Schluss an der Wand stehen. Diesmal nicht.']] },
        linaLetzte: { herz: { lina: -1 }, merke: 'linaLetzte', dann: [
          ['jo', '(laut) Okay, die Letzte kriegt die neue Person. Fair.'], ['erzaehler', 'Lina zieht die Ärmel über die Hände. Geht langsam rüber.'], ['sommer', '(leise) Ab nächster Woche lose ich die Teams.'] ] },
        normal: { dann: [['sommer', 'Gut. Teams stehen. Ab aufs Feld.']] },
      } },
    ['sommer', 'Jeder wirft fünfmal. Die Summe zählt fürs Team.'],
    { tu: 'freiwurf' },
    ['sommer', '(pfeift) Gut gespielt. Alle. Duschen, zack.'],
    { tu: 'n1_sportNach' },
  ],
  n1_kunst: [
    ['kiesser', 'Salut! Mme Kiesser. Hier wird gemalt, gekleckert und geredet.'],
    ['kiesser', 'Heute: Steckbriefe. Zu zweit. Ihr interviewt euch. Dann malt ihr euch.'],
    ['kiesser', '{name}, du gehst zu Lina. Sie wartet schon.'],
    { szene: 'nachhaken', id: 'linaInterview', def: LINA_INTERVIEW,
      ausgang: (r) => (r.offen >= 4 ? 'offen' : r.offen >= 2 ? 'etwas' : 'zu'),
      folgen: {
        offen: { staerke: 'zuhoeren', herz: { lina: 3 }, merke: ['linaGerd', 'linaOffen'], dann: [['erzaehler', 'Lina zeigt dir ihr Heft. Eine Seite. Eine Taube mit Lupe.'], ['lina', 'Gerd. Sie ermittelt. Gerade gegen … Kameras.']] },
        etwas: { staerke: 'zuhoeren', herz: { lina: 1 }, dann: [['lina', 'Jetzt ich. Du musst nicht alles sagen.']] },
        zu: { dann: [['erzaehler', 'Lina zeichnet. Du guckst. Es ist sehr still.']] },
      } },
    ['lina', 'Was ist … dein Lieblingsort hier?'],
    { wahl: [
      { t: '„Die Bank am Hof. Da ist es ruhig.“', herz: { lina: 1, mila: 1 }, dann: [['lina', 'Da sitzt Mila immer. Ihr wärt ein gutes Team.']] },
      { t: '„Die Kantine. Wegen der Nudeln. Und dem Drama.“', staerke: 'humor', herz: { lina: 1 }, dann: [['lina', '(lacht leise) Das Drama hab ich gezeichnet. Mit dir.']] },
      { t: '„Weiß noch nicht. Bin ja neu.“', herz: { lina: 1 }, dann: [['lina', 'Ehrlich. Gut. Schreib ich so.']] },
    ] },
    ['kiesser', 'Wunderbar! Und jetzt: malen. Schnell, nicht schön.'],
    ['erzaehler', 'Du malst Lina. Es sieht aus wie ein Kartoffel-Mensch.'],
    ['erzaehler', 'Lina malt dich. Es sieht aus wie du. Unfair.'],
  ],
  n1_checkin: [
    ['erzaehler', 'Mittwoch. Zwei Tage Annexe. Dein Handy: „Check-in“.'],
    { szene: 'checkin', id: 'checkin1', def: CHECKIN_MI, ausgang: (r) => r.gefuehl, folgen: {} },
    ['erzaehler', '@annexe.cam hat nichts Neues gepostet. Noch nicht.'],
  ],
  n1_skills: [
    ['kaya', 'Wéi geet et? Ich bin Herr Kuedes. Vom SePAS.'],
    ['kaya', 'Hier gibt’s keine Noten. Nur Spiele. Und Kekse.'],
    ['ben', 'Kekse? Ich bin dabei.'],
    ['kaya', 'Erstes Spiel: Namen-Rekord. Wir werden schneller. Ihr werdet sehen.'],
    { szene: 'namen', id: 'namen', def: { leute: KLASSE_NAMEN, runden: 3, proRunde: 5 },
      ausgang: (r) => (r.treffer >= r.gesamt * 0.8 ? 'top' : r.treffer >= r.gesamt * 0.5 ? 'mittel' : 'wenig'),
      folgen: {
        top: { staerke: 'kontakt', herz: { noah: 1, mila: 1, lina: 1, yusuf: 1 }, merke: 'namenTop', dann: [['kaya', 'Seht ihr? Dritte Runde, doppelt so schnell. Üben wirkt.'], ['mila', 'Statistisch signifikant. Glaub ich.']] },
        mittel: { staerke: 'kontakt', herz: { noah: 1 }, dann: [['kaya', 'Besser als Runde eins. Genau darum geht’s.']] },
        wenig: { dann: [['kaya', 'Namen sind schwer. Morgen kennst du drei mehr.'], ['noah', 'Ich kenn nur Ben. Weil er laut ist.']] },
      } },
    ['kaya', 'Zweites Spiel. Zwei Wahrheiten, eine Lüge. Ihr ratet mit.'],
    { szene: 'zwei', id: 'zwei', def: ZWEI,
      ausgang: (r) => (r.erraten.length >= 2 ? 'leser' : r.reingelegt.length >= 2 ? 'poker' : 'normal'),
      folgen: {
        leser: { staerke: 'lesen', herz: { mila: 1, jo: 1 }, merke: 'luegenLeser', dann: [['jo', 'Digga, du liest Leute wie ein Buch. Unheimlich.']] },
        poker: { staerke: 'humor', herz: { ben: 1, ayla: 1 }, dann: [['ben', 'Pokerface. Ich will nie gegen dich spielen.']] },
        normal: { herz: { noah: 1 }, dann: [['noah', 'Ich hab alles falsch geraten. Aber ich weiß jetzt was über Gänse.']] },
      } },
    ['kaya', 'Letzte Frage. Wie wäre der schlimmste Kurs der Welt?'],
    ['jo', 'Handys klingeln dauernd. Alle lachen über alle.'],
    ['ben', 'Keine Kekse. Nie.'],
    ['mila', 'Jemand muss vor allen was Persönliches erzählen.'],
    ['kaya', 'Und jetzt umdrehen. Was soll bei UNS gelten? Ein Vorschlag pro Person.'],
    { wahl: [
      { t: '„Keine Fotos von Leuten ohne Ja.“', staerke: 'klar', herz: { mila: 1, dario: -1, ayla: 1 }, merke: 'regelFotos', dann: [
        ['ayla', 'Real. Gerade diese Woche.'], ['erzaehler', 'Ben guckt zu Jo. Jo guckt aufs Handy. Keiner sagt „@annexe.cam“.'] ] },
      { t: '„Niemand muss was Persönliches sagen.“', staerke: 'einbeziehen', herz: { noah: 2, mila: 1 }, merke: 'regelPersoenlich', dann: [
        ['noah', '(leise) Danke.'], ['kaya', 'Kommt auf die Liste. Ganz oben.'] ] },
      { t: '„Was hier gesagt wird, bleibt hier.“', staerke: 'vertrauen', herz: { lina: 2, kaya: 1 }, merke: 'regelVertraulich', dann: [
        ['lina', '(nickt. Zweimal.)'], ['jo', 'Auch im Chat? Das wird schwer.'] ] },
      { t: '„Jede Woche Kekse. Pflicht.“', staerke: 'humor', herz: { ben: 2 }, merke: 'regelKekse', dann: [
        ['ben', 'EHRENPERSON. Ich unterschreib mit Blut. Mit Kakao.'], ['kaya', 'Angenommen. Aber noch eine ernste, bitte.'] ] },
    ] },
    ['kaya', 'Gut. Unterschreiben. Dann raus auf den Hof.'],
  ],
  n1_blind: [
    ['kaya', 'Blind-Parcours. Eine Person sieht nichts. Die andere lotst.'],
    ['kaya', 'Wer zu hektisch ist, kriegt ein Stopp. Das darf jeder sagen.'],
    ['kaya', 'Such dir wen aus.'],
    { wahl: [
      { t: 'Noah.', herz: { noah: 1 }, merke: 'blindNoah', dann: [['noah', 'Ich? Okay. Ich vertraue dir. Glaub ich.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.noah }, ...blindFolgen('noah') }] },
      { t: 'Mila.', herz: { mila: 1 }, merke: 'blindMila', dann: [['mila', 'In Ordnung. Ich zähle deine Fehler nicht. Laut.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.mila }, ...blindFolgen('mila') }] },
      { t: 'Ben.', herz: { ben: 1 }, merke: 'blindBen', dann: [['ben', 'Lass mich nicht in den Brunnen laufen, ja?'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.ben }, ...blindFolgen('ben') }] },
      { t: 'Lina.', staerke: 'einbeziehen', herz: { lina: 2 }, merke: 'blindLina', dann: [['lina', '(überrascht) Oh. Okay.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.lina }, ...blindFolgen('lina') }] },
    ] },
    ['kaya', 'Tausch. Jetzt siehst DU nichts.'],
    ['erzaehler', 'Augenbinde. Dunkel. Jemand sagt „links“. Du gehst links. Es klappt.'],
    ['kaya', 'Was braucht eine Gruppe, damit das klappt?'],
    { wahl: [
      { t: '„Dass man sich traut, Stopp zu sagen.“', staerke: 'klar', dann: [['kaya', 'Kommt in den Vertrag. Danke.']] },
      { t: '„Dass keiner lacht, wenn wer hinfällt.“', staerke: 'einbeziehen', herz: { noah: 1 }, dann: [['jo', '(leise) … okay. Fair.']] },
      { t: '„Kekse.“', staerke: 'humor', herz: { ben: 1 }, dann: [['kaya', 'Steht schon drauf. Dank Ben.']] },
    ] },
    { szene: 'stempel', def: (m) => ({ modul: 'Modul 0 · Ankommen', titel: 'Angekommen',
      gelernt: ['Namen gelernt' + (m.namenTop ? ' – sehr schnell' : ''), 'Leute gelesen: zwei Wahrheiten, eine Lüge', 'Jemanden gelotst – und selbst blind gelaufen', 'Eine Regel für die Gruppe vorgeschlagen'],
      mission: 'Sprich diese Woche jemanden an, mit dem du noch nie geredet hast. Und lern drei Namen aus der Parallelklasse.' }), folgen: {} },
    ['erzaehler', 'Pause. Dein Handy vibriert. @annexe.cam hat gepostet. Wieder.'],
    ['erzaehler', 'Diesmal: Noah. Allein am Tisch. „Top 5 langweiligste Leute, Platz 1?“'],
    { tu: 'kapitelEnde' },
  ],
  n1_heimweg: [
    ['erzaehler', '15:30. Tag eins: überlebt. Knapp.'],
    ['noah', 'Gleicher Bus? Ich hab nachgezählt. Sieben Leute haben cool gewählt.'],
    { wahl: [
      { t: '„Danke, Noah. Echt.“', staerke: 'kontakt', herz: { noah: 2 }, dann: [['noah', 'Ich war drei davon. Sag’s keinem.']] },
      { t: '„Sieben von neunzehn. Super, Noah.“', herz: { noah: -1 }, dann: [['noah', '… Ja. Hab ich auch gerechnet.'], ['erzaehler', 'Im Bus setzt er sich zwei Reihen weiter vor.']] },
      { t: '„Wer macht so einen Account?“', staerke: 'lesen', herz: { noah: 1 }, dann: [['noah', 'Jemand, der viel sieht. Und wenig sagt.'], ['noah', 'Das war gerade sehr düster von mir. Sorry.']] },
    ] },
    ['fahrer', 'Einsteigen. Ich warte nicht. Nie. Heute schon gar nicht.'],
    ['erzaehler', 'Im Bus. Eine Nachricht. Unbekannte Nummer.'],
    { szene: 'chat', id: 'unbekannt', def: UNBEKANNT,
      ausgang: (r) => (r.flags.beweis ? 'beweis' : r.flags.blockiert ? 'blockiert' : r.flags.gefragt ? 'gefragt' : 'nichts'),
      folgen: {
        gefragt: { merke: 'unbekanntGefragt', dann: [['erzaehler', 'Keine Antwort mehr. Nur zwei Haken.']] },
        blockiert: { staerke: 'abstand', merke: 'unbekanntBlockiert' },
        beweis: { staerke: 'hilfe', herz: { mila: 1 }, merke: ['unbekanntBeweis', 'spurNummer'], dann: [['erzaehler', 'Gespeichert. Die Nummer endet auf 77.']] },
        nichts: { merke: 'unbekanntIgnoriert' },
      } },
  ],
};

// TUN für Kapitel 1 (in spiel.js eingehängt)
export const tunN1 = (c) => ({
  n1_sportNach: () => {
    const m = c.S.merke, t = m.freiwurf || 0, gewonnen = t >= 3;
    return [
      ['erzaehler', gewonnen ? 'Dein Team gewinnt. Knapp. Ben schreit, als wäre es ein Finale.' : 'Jos Team gewinnt. Jo macht eine Ehrenrunde. Allein.'],
      ...(m.teamErstwahl ? [['noah', 'Erste Wahl. Ich. Das schreib ich in mein Tagebuch. Spaß.']] : []),
      ...(m.linaLetzte ? [['erzaehler', 'Lina sitzt danach allein auf der Bank. Zieht die Schuhe sehr langsam aus.']] : []),
      ['jo', gewonnen ? 'Revanche, digga. Nächste Woche. Wallah.' : 'Gut gespielt, neue Person. Echt jetzt.'],
    ];
  },
});
