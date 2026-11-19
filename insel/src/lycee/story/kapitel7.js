// Drei Jahre Annexe – 7ème, Kapitel 7 „Wenn es schwierig wird“ (Kurs Jahr 1, Modul 6: E24 Konflikte lösen,
// E25 Gruppendruck und Nein sagen, E26 Mobbing und Zivilcourage). Faden @annexe.cam: Rauswurf aus dem Klassenchat,
// Luca baut eine Gegen-Gruppe. Wer bleibt? Ende: Ein KI-Fake von Mme Tidderich (Kapitel 8).
import { S7_STREIT, S7_TRAUER_FAMILIE } from './skills-j1.js';
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, luca: { id: 'luca', name: 'Luca', farbe: '#7a6fb0' }, kenan: { id: 'kenan', name: 'Kenan', farbe: '#4a8f7a' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N7 = [
  { id: 'k7_sonntag', kap: 7, tag: 'Montag', uhr: 7.55, titel: 'Wer bleibt?', ziel: 'Ben wartet an der Haltestelle. Mit zwei Brötchen.', marker: 'ben',
    start: { teleport: 'busAnkunft', gespraech: 'n7_chat' },
    leute: { ben: [-20.5, 42.3, -1.9] },
    fertig: { reden: 'ben', gespraech: 'n7_ben' } },
  { id: 'k7_skills', kap: 7, tag: 'Montag', uhr: 9.9, titel: 'Skills: Welches Tier bist du im Streit?', ziel: 'Aula. Auf dem Boden liegen fünf Tierbilder.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n7_skills' } },
  { id: 'k7_druck', kap: 7, tag: 'Dienstag', uhr: 12.4, titel: 'Das Angebot', ziel: 'Luca winkt dich zur Skate-Ecke. „Lass reden.“', marker: 'luca',
    start: { teleport: 'eingangHof' },
    leute: { luca: [-34.4, 11.4, 1.9], kenan: [-35, 10.4, 0.6], dario: [-33.4, 12.4, 1.2] },
    fertig: { reden: 'luca', gespraech: 'n7_druck' } },
  { id: 'k7_streit', kap: 7, tag: 'Mittwoch', uhr: 10.0, titel: 'Jo gegen Luca', ziel: 'Am Korb wird es laut. Jo und Luca.', marker: 'jo',
    start: { teleport: 'eingangHof' },
    leute: { jo: [28.4, 13.6, 2.6], luca: [29.6, 12.4, -0.6], ben: [26, 15.6, 1.4] },
    fertig: { reden: 'jo', gespraech: 'n7_streit' } },
  { id: 'k7_kantine', kap: 7, tag: 'Donnerstag', uhr: 12.3, titel: 'Die Bühne', ziel: 'Kantine. An Noahs Tisch ist es plötzlich sehr laut.', marker: 'noah',
    start: { teleport: 'kantineTuer' },
    leute: { noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], luca: [12.4, -12.6, -2.2], kenan: [13.6, -12.0, -2.0], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], ayla: [16.65, -10.1, Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9] },
    fertig: { reden: 'noah', gespraech: 'n7_kantine' } },
  { id: 'k7_ende', kap: 7, tag: 'Freitag', uhr: 10.0, titel: 'Spaß, Streit oder Mobbing?', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n7_ende' } },
];

// ---------- Sonntagabend: Wer bleibt? (privat) ----------
const WER_BLEIBT = (m) => ({
  titel: 'Nachrichten', mitglieder: 2, dauer: 30,
  nachrichten: [
    { nach: 0.5, wer: 'Ben', text: 'bin raus aus „7P2 echte“. sofort. ich bleib bei dir' },
    { nach: 3, wer: 'Mila', text: 'Ich war nie drin. Ich mag keine Gruppen mit 💯 im Namen.' },
    { nach: 6, wer: 'Noah', text: m.noahGefragtFoto || m.noahRunter ? 'Ich bin auch raus. Du warst immer da. Jetzt ich.' : 'Ich bin raus. Glaub ich. Ja. Raus.' },
    { nach: 9.5, wer: 'Jo', text: 'bin noch drin. raus? luca sagt, dann bin ich weg', setzt: 'joFragt' },
    { nach: 14, wer: 'Ayla', text: 'ich bin drin, aber nur um zu sehen was die schreiben. spionin 🕵️' },
    { nach: 18, wer: 'Luca', text: 'komm zurück wenn du sorry sagst. für alles 😇' },
    { nach: 22, wer: 'Lina', text: '(schickt eine Zeichnung: Gerd die Taube mit einem Schild „Team du“)' },
  ],
  aktionen: [
    { id: 'jo', t: 'Jo antworten', symbol: '💬', wenn: 'joFragt', wahl: [
      { t: '„Mach, was du für richtig hältst. Ich bin dir nicht böse.“', setzt: 'joFrei', ich: 'mach was du für richtig hältst. ich bin dir nicht böse', folgen: [{ nach: 2, wer: 'Jo', text: '… bin raus. 🫡' }] },
      { t: '„Wenn du drin bleibst, sind wir keine Freunde mehr.“', setzt: 'joDruck', ich: 'wenn du drin bleibst sind wir keine freunde mehr', folgen: [{ nach: 2, wer: 'Jo', text: 'okay. raus. aber das war jetzt auch druck, digga' }] },
    ] },
    { id: 'luca', t: 'Luca antworten', symbol: '↩️', wahl: [
      { t: '„Ich sag nicht sorry für etwas, das ich nicht gemacht hab.“', setzt: 'lucaNein', ich: 'ich sag nicht sorry für etwas das ich nicht gemacht hab', folgen: [{ nach: 1.6, wer: 'Luca', text: 'dann viel spaß allein 👋' }] },
      { t: '„Okay sorry“', setzt: 'lucaSorry', ich: 'okay sorry', folgen: [{ nach: 1.6, wer: 'Luca', text: 'haha. wusste ich. trotzdem nein 😂' }] },
    ] },
    { id: 'stumm', t: 'Handy weg, schlafen', symbol: '🌙', setzt: 'schlafen', sys: 'Handy weg. Du schläfst schlecht. Aber du schläfst.', ende: true },
  ],
});


// ---------- Druck-Runde an der Skate-Ecke (E25) ----------
const DRUCK = {
  wo: 'Skate-Ecke', gruppe: { luca: F.luca, kenan: F.kenan, dario: F.dario }, zeit: 9,
  anker: 'Füße auf den Boden. Ausatmen. Dein Satz: „Nein. Das mach ich nicht.“',
  runden: [
    { wer: 'luca', sagt: 'Ganz easy. Du kommst zurück in die Gruppe. Eine Bedingung.', karten: [
      { t: '„Welche?“', art: 'frage', druck: 4, ich: 0, antwort: 'Ein Foto von Noah. Beim Essen. Für die Story. Lustig.' },
      { t: '„Kein Interesse.“', art: 'nein', druck: -4, ich: 10, antwort: 'Hör doch erstmal zu, bro.' },
    ] },
    { wer: 'kenan', sagt: '(leise, guckt weg) Luca sagt, ist nur ein Foto.', karten: [
      { t: '„Nein. Ich weiß, wie sich das anfühlt.“', art: 'nein', druck: -8, ich: 14, antwort: '(nickt) … Hast recht. Ohne mich, Luca.' },
      { t: '„Vielleicht. Ich überleg’s mir.“', art: 'ausrede', druck: 8, ich: -6, antwort: 'Überleg nicht so lang.' },
      { t: '„Okay. Eins.“', art: 'ja', druck: -10, ich: -20, wer: 'luca', antwort: 'Na also. Geht doch.' },
    ] },
    { wer: 'luca', sagt: 'Sonst bleibst du halt allein. Für immer. Deine Wahl.', karten: [
      { t: '„Ich bin nicht allein.“', art: 'nein', druck: -10, ich: 16, antwort: '(lacht kurz. Hört dann auf.)' },
      { t: '„Lieber allein als so.“', art: 'nein', druck: -6, ich: 14, antwort: 'Dramatisch. Okay.' },
      { t: '(Gehen.)', art: 'gehen', druck: -14, ich: 12, antwort: '(ruft hinterher) Dein Verlust!' },
    ] },
    { wer: 'dario', sagt: '(ganz leise) … Luca. Lass es.', karten: [
      { t: '(Dario anschauen. Nicken.)', art: 'nein', druck: -6, ich: 8, wer: 'dario', antwort: '(nickt kaum sichtbar zurück)' },
      { t: '„Hörst du, Luca? Sogar Dario sagt es.“', art: 'nein', druck: 4, ich: 6, wer: 'luca', antwort: '(zu Dario, scharf) Halt du dich raus.' },
    ] },
  ],
};

// ---------- Konflikt-Treppe am Korb (E24) ----------
const TREPPE = {
  wo: 'Hof · am Korb', links: F.jo, rechts: F.luca, zeit: 12,
  stufen: [
    { titel: 'Meinung', sagt: [['r', 'Na, Verräter? Schon neue Freunde?'], ['l', 'Lass mich, Luca.']], ausstiege: [
      { t: '„Jo, komm. Wir spielen auf dem anderen Korb.“', wirkt: true, antwort: ['l', '(atmet aus) … Ja. Ist eh besser da.'] },
    ] },
    { titel: 'Sticheln', sagt: [['r', 'Wer zuerst geht, verliert, oder?'], ['l', 'Wer Fakes über andere macht, ist ein Feigling.']], ausstiege: [
      { t: '„Leute. Pause. Sonst kracht’s gleich.“', wirkt: true, antwort: ['r', '… Pff. Okay. Pause.'] },
      { t: '„Jo, lass ihn reden. Der will das.“', wirkt: false, antwort: ['l', 'Ich lass mich nicht beleidigen!'] },
    ] },
    { titel: 'Beleidigen', sagt: [['r', 'Du warst doch schon immer der Clown.'], ['l', 'Und du der Lügner!']], ausstiege: [
      { t: '(Zwei Schritte zurück. Laut:) „Jo! Komm her. Jetzt.“', wirkt: true, antwort: ['l', '(zittert) … Okay. Ich komm.'] },
      { t: '„Hört auf, Leute gucken!“', wirkt: false, antwort: ['r', 'Sollen sie doch!'] },
    ] },
    { titel: 'Drohen', sagt: [['r', 'Noch ein Wort und …'], ['l', 'Und WAS?']], ausstiege: [
      { t: '(Ben holen. Und Herrn Mesenberg.)', wirkt: true, antwort: ['l', '(Mesenberg kommt. Beide gehen auseinander.)'] },
    ] },
    { titel: 'Knall', sagt: [['l', '(schubst)'], ['r', '(schubst zurück)']], ausstiege: [
      { t: '(Laut: „STOPP!“ und Hilfe holen.)', wirkt: true, antwort: ['r', '(Herr Mesenberg rennt über den Hof.)'] },
    ] },
  ],
};

// ---------- Kipp die Bühne (E26) ----------
const BUEHNE = {
  wo: 'Kantine', opfer: F.noah, taeter: F.luca, runden: 3,
  start: [['taeter', 'Noah, du baust doch so gern. Bau dir mal Freunde!'], ['taeter', '(hält das Handy hoch) Lächeln für die Story!'], ['opfer', '(starrt auf sein Tablett)']],
  publikum: [
    { name: 'Kenan', farbe: '#4a8f7a', mut: 4 }, { name: 'Chiara', farbe: '#3fa66b', mut: 1 }, { name: 'Yusuf', farbe: '#5fa0d0', mut: 2 },
    { name: 'Lina', farbe: '#9b7bc8', mut: 2 }, { name: 'Ayla', farbe: '#e85d75', mut: 1 }, { name: 'Ben', farbe: '#d9a21b', mut: 1 }, { name: 'Dario', farbe: '#d9693f', mut: 3 },
  ],
  aktionen: [
    { t: '(Nicht mitlachen. Ernst gucken.)', stufe: 1, wirkt: 1, antwort: ['Chiara', '(hört auf zu grinsen)'] },
    { t: '(Mit dem Tablett zu Noah setzen.)', stufe: 2, wirkt: 2, antwort: ['opfer', '(guckt hoch. Ganz kurz.)'] },
    { t: '„Hör auf, Luca. Das ist nicht lustig.“', stufe: 3, wirkt: 2, antwort: ['taeter', 'Chill. War nur Spaß.'] },
    { t: '(Zur Aufsicht gehen und es sagen.)', stufe: 4, wirkt: 2, antwort: ['Ayla', '(steht auf und geht mit dir)'] },
    { t: '(Das Video melden, wenn es online ist.)', stufe: 2, wirkt: 1, antwort: ['Yusuf', '„Ich melde auch.“'] },
    { t: '„Noah, kommst du mit raus? Korb werfen?“', stufe: 2, wirkt: 1, antwort: ['opfer', '(steht auf) … Ja.'] },
  ],
};

export const GESPRAECHE_N7 = {
  n7_chat: [
    ['erzaehler', 'Sonntagabend. Dein Handy ist still. Zu still. Dann kommt eine Nachricht. Dann noch eine.'],
    { szene: 'chat', id: 'werBleibt', def: (m) => WER_BLEIBT(m),
      ausgang: (r) => (r.flags.joFrei ? 'joFrei' : r.flags.joDruck ? 'joDruck' : r.flags.lucaSorry ? 'sorry' : 'still'),
      folgen: {
        joFrei: { staerke: 'klar', herz: { jo: 2 }, merke: 'joFrei' },
        joDruck: { herz: { jo: -1 }, merke: 'joDruck' },
        sorry: { merke: 'lucaSorry' },
        still: {},
      } },
    // Jugendwelt heute: Screenshots aus der anderen Gruppe – Schutz oder neue Spirale?
    ['erzaehler', 'Später. Eine private Nachricht. Lina.'],
    ['lina', '(Nachricht) ich bin auch in Lucas neuer Gruppe. hab nicht nein gesagt.'],
    ['lina', '(Nachricht) soll ich dir Screenshots schicken? von allem?'],
    { wahl: [
      { t: '„Nein. Dann machen wir genau das, was sie machen.“', staerke: 'klar', herz: { lina: 1 }, merke: 'spionNein', dann: [['lina', '(Nachricht) ok. ehrlich gesagt bin ich erleichtert.']] },
      { t: '„Nur wenn jemand in Gefahr ist. Dann zu Herrn Kuedes.“', staerke: 'hilfe', herz: { lina: 2 }, merke: 'spionGefahr', dann: [['lina', '(Nachricht) deal. wir müssen nicht alles wissen.']] },
      { t: '„Ja. Schick alles.“', merke: 'spionJa', dann: [['lina', '(Nachricht) ok …'], ['erzaehler', 'Bis Mitternacht kommen 46 Screenshots. Du liest alle.'], ['erzaehler', 'Danach geht es dir schlechter. Nicht besser.']] },
    ] },
    ['lina', '(Nachricht) vielleicht verlass ich die Gruppe einfach. 🕊️'],
  ],
  n7_ben: [
    ['ben', 'Brötchen? Eins für dich. Das andere auch.'],
    ['ben', 'Ich hab schon gegessen. Zwei.'],
    { tu: 'n7_benStart' },
    ['ben', 'Die neue Gruppe hat elf Leute. Die alte hat zwölf. Wir gewinnen.'],
    { wahl: [
      { t: '„Danke, dass du geblieben bist.“', herz: { ben: 2 }, dann: [['ben', 'Bruder. Am ersten Tag hast du mir geantwortet. Ehrenschuld.']] },
      { t: '„Es geht nicht ums Gewinnen.“', staerke: 'klar', herz: { ben: 1 }, dann: [['ben', 'Weiß ich. Aber es fühlt sich besser an, wenn man’s zählt.']] },
    ] },
  ],
  n7_skills: [
    ['erzaehler', 'Aula. Auf dem Boden liegen fünf Tierbilder. Herr Kuedes wartet, bis alle sitzen.'],
    { szene: 'skillsStunde', id: 's7_streit', def: S7_STREIT, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's7Streit' }, weiter: { merke: 's7Streit' } } },
    { tu: 'n7_tierWechsel' },
  ],
  n7_druck: [
    ['luca', 'Hey. Kein Stress. Ich will reden. Ehrlich.'],
    ['erzaehler', 'Kenan und Dario stehen dicht dabei. Dario guckt auf seine Schuhe.'],
    { szene: 'druck', id: 'druck', def: DRUCK, ausgang: (r) => (r.ja ? 'ja' : r.nein >= 2 ? 'nein' : 'wackel'),
      folgen: {
        nein: { staerke: 'neinsagen', herz: { dario: 1, kenan: 1 }, merke: 'druckNein', dann: [['erzaehler', 'Du gehst. Deine Knie sind weich. Aber du gehst.']] },
        wackel: { merke: 'druckWackel', dann: [['erzaehler', 'Kein Ja. Kein klares Nein. Luca grinst. Er wird wiederkommen.']] },
        ja: { herz: { noah: -2, dario: -1 }, merke: 'druckJa', dann: [['erzaehler', 'Du hast Ja gesagt. Passiert unter Druck.'], ['erzaehler', 'Im Bauch fühlt es sich falsch an. Noch kannst du was tun.'],
          { wahl: [
            { t: '(„Doch nicht.“ schreiben.)', staerke: 'neinsagen', merke: 'druckZurueck', dann: [['erzaehler', 'Ein Nein geht auch später. Das zählt genauso.'], ['noah', '(schreibt dir) gut gemacht.']] },
            { t: '(Dabei bleiben. Nichts schreiben.)', merke: 'druckGeblieben', dann: [['erzaehler', 'Du bleibst dabei. Es bleibt schwer im Bauch.'], ['erzaehler', 'Morgen kannst du immer noch Nein sagen. Oder mit jemandem reden.']] },
          ] }] },
      } },
    { tu: 'n7_darioDanach' },
  ],
  n7_streit: [
    ['erzaehler', 'Jo ist inzwischen raus aus „7P2 echte“. Luca hat es gemerkt.'],
    { szene: 'treppe', id: 'treppe', def: TREPPE, ausgang: (r) => (!r.ausgestiegen ? 'knall' : r.stufe <= 2 ? 'frueh' : 'spaet'),
      folgen: {
        frueh: { staerke: 'ruhig', herz: { jo: 2, ben: 1 }, merke: 'treppeFrueh', dann: [['jo', 'Danke. Ich war bei 80. Mindestens.']] },
        spaet: { staerke: 'mut', herz: { jo: 1 }, merke: 'treppeSpaet', dann: [['jo', 'Fast hätt ich … Egal. Danke.']] },
        knall: { herz: { jo: -1 }, merke: 'treppeKnall', dann: [['mesenberg', 'Jo, Luca: mitkommen. Beide. Jetzt.'], ['jo', '(später) Ich hab geschubst. Das war ich. Nicht du.'], ['mesenberg', 'Hilfe holen geht auch spät noch.']] },
      } },
  ],
  n7_kantine: [
    ['erzaehler', 'Luca steht an Noahs Tisch. Mit Handy. Kenan daneben. Alle gucken. Manche lachen.'],
    { szene: 'buehne', id: 'buehne', def: BUEHNE, ausgang: (r) => (r.gekippt >= 4 ? 'gekippt' : r.gekippt >= 2 ? 'halb' : 'wenig'),
      folgen: {
        gekippt: { staerke: 'mut', herz: { noah: 3, ayla: 1, ben: 1 }, merke: 'buehneGekippt', dann: [['erzaehler', 'Luca steht plötzlich allein. Er steckt das Handy weg. Und geht.']] },
        halb: { staerke: 'mut', herz: { noah: 2 }, merke: 'buehneHalb', dann: [['erzaehler', 'Luca lacht noch. Aber leiser. Dann geht er.']] },
        wenig: { herz: { noah: 1 }, merke: 'buehneWenig', dann: [['erzaehler', 'Luca filmt noch kurz. Dann klingelt es.']] },
      } },
    { tu: 'n7_noahDanach' },
  ],
  // „Zurückspulen“ (statt Ecken-Lauf): vier Bilder dieser Woche, ohne Namen – was war es, wo standest DU, was tust du nächstes Mal
  n7_ende: [
    { szene: 'skillsStunde', id: 's7_trauer', def: S7_TRAUER_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'einbeziehen', merke: 's7Trauer' }, weiter: { merke: 's7Trauer' } } },
    ['kaya', 'Und jetzt spulen wir die Woche zurück. Vier Bilder. Ohne Namen.'],
    ['kaya', 'Vorher hab ich Noah gefragt, ob wir über Donnerstag reden dürfen.'],
    ['kaya', 'Er hat Ja gesagt. Danke, Noah.'],
    ['erzaehler', 'Bild 1: Sonntagabend. Eine neue Gruppe. Einer nach dem anderen fliegt raus.'],
    { wahl: [
      { t: 'Spaß.', dann: [['kaya', 'Für wen? Für die drin. Nicht für die, die rausfliegen.']] },
      { t: 'Streit.', dann: [['kaya', 'Streit ist zwischen zwei, die sich wehren können. Hier wurde ausgesucht.']] },
      { t: 'Mobbing.', staerke: 'lesen', dann: [['kaya', 'Ja. Immer wieder, mit Absicht, gegen Einzelne.']] },
    ] },
    ['erzaehler', 'Bild 2: Skate-Ecke. Drei gegen einen. „Mach mit oder du bist raus.“'],
    { wahl: [
      { t: 'Gruppendruck.', staerke: 'lesen', dann: [['kaya', 'Genau. Druck ist noch kein Mobbing. Aber der Anfang davon.']] },
      { t: 'Spaß unter Freunden.', dann: [['kaya', 'Freunde drohen nicht mit „raus“.']] },
    ] },
    { tu: 'n7_rolle2' },
    ['erzaehler', 'Bild 3: Kantine. Einer filmt. Einer sitzt allein. Viele lachen.'],
    { wahl: [
      { t: 'Mobbing.', staerke: 'lesen', dann: [['kaya', 'Ja. Und das Lachen gehört dazu. Ohne Publikum keine Bühne.']] },
      { t: 'Ein dummer Witz.', dann: [['kaya', 'Für den, der allein sitzt, ist es kein Witz. Seit Wochen nicht.']] },
    ] },
    { tu: 'n7_rolle3' },
    ['erzaehler', 'Bild 4: Am Korb. Ben und Jo ärgern sich. Beide lachen. Dann tauschen sie.'],
    { wahl: [
      { t: 'Spaß.', staerke: 'lesen', dann: [['kaya', 'Ja. Beide lachen, beide dürfen. Und beide können aufhören.']] },
      { t: 'Mobbing.', dann: [['ben', 'Hey! Ich ärger ihn. Er ärgert mich. Das ist Liebe.'], ['kaya', 'Stimmt. Gleich stark, beide lachen: Spaß.']] },
    ] },
    ['kaya', 'Und nächstes Mal? Ein Schritt. Nur einer.'],
    { wahl: [
      { t: '„Ich setz mich dazu.“', staerke: 'mut', merke: 'planDazu', dann: [['noah', '(leise) Das hilft mehr, als man denkt.']] },
      { t: '„Ich lach nicht mit. Und sag Stopp, wenn ich kann.“', staerke: 'klar', merke: 'planStopp', dann: [] },
      { t: '„Ich hol Hilfe. Herrn Kuedes oder das SePAS.“', staerke: 'hilfe', merke: 'planHilfe', dann: [['kaya', 'Das ist kein Petzen.'], ['kaya', 'Petzen will Ärger machen. Hilfe holen will Ärger beenden.']] },
      { t: '„Ich schreib danach privat: Alles okay?“', staerke: 'einbeziehen', merke: 'planPrivat', dann: [] },
    ] },
    ['kaya', 'Mobbing hört selten von allein auf. Hilfe holen wirkt.'],
    ['kaya', 'Und einer, der sich dazusetzt, auch.'],
    { tu: 'n7_schluss' },
  ],
};

export const tunN7 = (c) => ({
  // Wo standest DU? Kein Urteil – nur ein Spiegel
  n7_rolle2: () => { const m = c.S.merke;
    return [['erzaehler', m.druckNein ? 'Du warst da. Du hast Nein gesagt. Drei gegen dich.' : m.druckZurueck ? 'Du hast erst Ja gesagt. Dann „doch nicht“. Das zählt.' : m.druckJa ? 'Du hast Ja gesagt. Unter Druck passiert das. Du weißt jetzt, wie es sich anfühlt.' : 'Du warst nicht dabei. Aber du hast davon gehört.']]; },
  n7_rolle3: () => { const m = c.S.merke;
    return [['erzaehler', m.buehneGekippt ? 'Du bist zu seinem Tisch gegangen. Die Bühne ist gekippt.' : m.buehneHalb ? 'Du hast nicht mitgelacht. Das hat jemand gemerkt.' : 'Du warst im Publikum. Wie die meisten. Publikum kann eine Bühne kippen.']]; },
  // Tier-Wechsel: Der Streit mit Jo vom Sportfest (Kap. 3) – als welches Tier warst du? Jetzt nochmal, als ein anderes.
  // Sinn: „Gut ist, wechseln zu können“ wird erlebt, nicht nur gesagt.
  n7_tierWechsel: () => {
    const m = c.S.merke;
    const war = m.joKnall || m.joSauer ? 'hai' : m.joVersoehnt ? 'eule' : 'teddy';
    const NAME = { hai: '🦈 Hai', eule: '🦉 Eule', teddy: '🧸 Teddy', schildi: '🐢 Schildkröte', fuchs: '🦊 Fuchs' };
    const REAKT = {
      hai: [['du', '„Du hast den Stab verloren. Nicht ich. Punkt.“'], ['jo', '(Spiel-Jo, laut) Ach JA? Dann lauf doch allein!'], ['kaya', 'Hai gegen Hai. Beide oben auf der Treppe.']],
      schildi: [['du', '(Schultern hoch. Weggehen. Nichts sagen.)'], ['jo', '(Spiel-Jo) … Hallo? Ich red mit dir!'], ['kaya', 'Abtauchen schützt kurz. Aber Jo bleibt allein mit seiner Wut.']],
      teddy: [['du', '„Okay, okay. Meine Schuld. Alles meine Schuld.“'], ['jo', '(Spiel-Jo, leiser) … So hab ich’s auch nicht gemeint.'], ['kaya', 'Frieden schnell. Aber war es wirklich deine Schuld?']],
      fuchs: [['du', '„Wir waren beide zu schnell. Nächstes Mal üben wir den Wechsel.“'], ['jo', '(Spiel-Jo) … Fair. Halbe-halbe.'], ['kaya', 'Fuchs. Jeder gibt ein Stück. Oft gut genug.']],
      eule: [['du', '„Du wolltest gewinnen. Ich auch. Was hilft uns beiden fürs nächste Mal?“'], ['jo', '(Spiel-Jo, überrascht) … Training. Zusammen?'], ['kaya', 'Eule. Dauert länger. Hält länger.']],
    };
    const andere = Object.keys(REAKT).filter((t) => t !== war);
    return [
      ['kaya', 'Jetzt ihr. Erinnert euch an einen Streit. Vom Sportfest vielleicht.'],
      ['erzaehler', 'Der Stab fällt. Jo brüllt. Du weißt noch, was du gemacht hast.'],
      ['erzaehler', 'Damals warst du eher: ' + NAME[war] + '.'],
      ['kaya', 'Gleiche Szene. Anderes Tier. Jo spielt mit.'],
      ['jo', '(grinst) Ich bin ein sehr guter Wütender. Ich hab Erfahrung.'],
      { wahl: andere.map((t) => ({ t: NAME[t] + ' ausprobieren', merke: 'tierNeu_' + t, staerke: t === 'eule' || t === 'fuchs' ? 'klar' : undefined, dann: [
        ...REAKT[t],
        ['jo', t === 'eule' || t === 'fuchs' ? '(echt jetzt, leise) Hätten wir damals auch so machen können.' : '(lacht) Okay. Das war ein anderes Ende.'],
      ] })) },
      ['kaya', 'Niemand ist ein Tier. Ihr könnt wechseln. Das ist der Trick.'],
    ];
  },
  n7_benStart: () => (c.S.merke.lucaSorry ? [['ben', 'Du hast Luca „sorry“ geschrieben? Versteh ich. Druck macht das.'], ['ben', 'Aber du schuldest ihm nichts. Gar nichts.']] : []),
  n7_darioDanach: () => (c.S.merke.druckNein ? [['erzaehler', 'Hinter dir Schritte. Dario.'], ['dario', '(leise) Das war … stark. Ich kann das nicht. Nein sagen. Zu ihm.']] : []),
  n7_noahDanach: () => (!c.S.merke.buehneHalb && !c.S.merke.buehneGekippt ? [['noah', '(später, leise) Morgen sitz ich wieder da. Gleicher Tisch.']] : [
    ['noah', '(später, draußen) Du bist gekommen. Zu meinem Tisch.'],
    { wahl: [
      { t: '„Immer.“', herz: { noah: 1 }, dann: [['noah', 'Sag nicht immer. Sag: heute. Heute reicht.']] },
      { t: '„Sollen wir es Herrn Kuedes sagen? Zusammen?“', staerke: 'hilfe', herz: { noah: 1, kaya: 1 }, merke: 'mobbingGemeldet', dann: [['noah', 'Zusammen. Ja. Allein schaff ich das nicht.']] },
    ] },
  ]),
  n7_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 6 · Wenn es schwierig wird', titel: 'Standgehalten',
      gelernt: ['Fünf Tiere im Streit – und welches gerade hilft', 'Die Konflikt-Treppe und ihre Ausstiege', 'Nein sagen, wenn die Gruppe drückt', 'Spaß, Streit und Mobbing unterscheiden', 'Die Bühne kippen: ein Schritt reicht'],
      mission: 'Wenn du diese Woche siehst, dass jemand fertiggemacht wird: einen Schritt machen. Nicht mitlachen zählt auch.' }, folgen: {} },
    ['erzaehler', 'Samstag. @annexe.cam postet ein Video. Mme Tidderich tanzt. Auf dem Pult. Mit Enten-Krawatte.'],
    ['erzaehler', 'Es hat schon 300 Herzen. Ben schreibt: „DAS IST KI. GUCKT DIE HÄNDE AN.“'],
    { tu: 'kapitelEnde' },
  ],
});
