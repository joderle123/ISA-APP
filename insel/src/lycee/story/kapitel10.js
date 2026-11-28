// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 10 „Hinter der Kamera“, Juli, letzte Schulwoche.
// Verdecktes Thema: Abschluss (Rückblick, Wiedergutmachung). Zurückschauen heißt, sich auch auf den Blättern zu sehen,
// auf denen man nicht gut aussieht. Wiedergutmachung ist klein und konkret: eine Kopie löschen, ein Satz ohne „aber“.
// Wer verzeiht, entscheidet das selbst. Und ganz am Schluss hebt wieder jemand ein Handy. Diesmal stehst du daneben.
// Fünf Enden: Noah, Mila, Ben oder Jo (höchste Freundschaft) – das Lina-Ende kommt dazu, nicht stattdessen.
import { S10_RUECKBLICK } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], dario: [-13.56, -61.64, -2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

// Sommerfest an der Skate-Ecke: Dario auf der Bank, alle drumherum, die Erwachsenen an der Tür zur Aula
const FEST = { dario: [-33.4, 12.4, 1.2], ben: [-30.2, 14.2, -2.0], jo: [-31.6, 10.0, -0.6], chiara: [-29.6, 11.6, -1.6], mila: [-30.6, 15.6, -2.4], noah: [-28.8, 13.4, -1.8],
  lina: [-28.2, 16.8, -2.2], ayla: [-31.8, 16.4, -2.8], yusuf: [-29.0, 9.6, -1.0], kaya: [-24.6, 12.6, -1.6], hoffmann: [-24.4, 14.0, -1.6], mesenberg: [-24.8, 11.2, -1.6] };

export const SCHRITTE_N10 = [
  { id: 'k10_mauer', kap: 10, tag: 'Montag', uhr: 7.42, titel: 'Die Mauer', ziel: 'Haltestelle. Dario sitzt auf der Mauer. Nicht auf der Bank.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-23.6, 39.8, -1.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n10_mauer' } },
  { id: 'k10_skills', kap: 10, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Dein Jahr', ziel: 'Aula. Herr Kuedes hat eine Wäscheleine voller Fotos gespannt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n10_skills' } },
  { id: 'k10_bote', kap: 10, tag: 'Montag', uhr: 10.0, titel: 'Sag Dario …', ziel: 'Hof. Alle reden über Freitag, 15 Uhr. Ben winkt.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [2.2, 17.2, -0.4], chiara: [3.6, 15.6, -1.2], jo: [0.6, 15.4, 1.0] },
    fertig: { reden: 'ben', gespraech: 'n10_bote' } },
  { id: 'k10_bilder', kap: 10, tag: 'Dienstag', uhr: 14.0, titel: 'Dieses auch?', ziel: 'Aula. Mme Kiesser hängt Zeichnungen auf.', marker: 'kiesser',
    start: { teleport: 'eingangHof' },
    leute: { kiesser: [-14.50, -65.40, 0.00], lina: [-13.2, -64.2, -0.6] },
    fertig: { reden: 'kiesser', gespraech: 'n10_bilder' } },
  { id: 'k10_ruecken', kap: 10, tag: 'Mittwoch', uhr: 9.9, neben: 'skills', titel: 'Skills: Stärken-Rücken', ziel: 'Aula. Alle haben ein weißes Blatt auf dem Rücken.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n10_ruecken' } },
  { id: 'k10_karten', kap: 10, tag: 'Mittwoch', uhr: 10.0, titel: 'Eine Karte für die 5e', ziel: 'Saal 1.04. Mme Tidderich teilt Karten aus.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n10_karten' } },
  { id: 'k10_kantine', kap: 10, tag: 'Mittwoch', uhr: 12.17, titel: 'Löschen', ziel: 'Kantine. Chiara kommt an deinen Tisch.', marker: 'chiara',
    start: { teleport: 'kantineTuer' },
    leute: { chiara: [12.4, -12.6, -2.2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], ayla: [16.65, -14.1, Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'chiara', gespraech: 'n10_kantine' } },
  { id: 'k10_fest', kap: 10, tag: 'Freitag', uhr: 14.87, titel: 'Hinter der Kamera', ziel: 'Sommerfest. Dario steht an der Bank in der Skate-Ecke.', marker: 'dario',
    start: { teleport: 'eingangHof', gespraech: 'n10_festMorgen' },
    leute: FEST,
    fertig: { reden: 'dario', gespraech: 'n10_fest' } },
];

const KURVE = (m) => ({
  wo: 'Aula · Wäscheleine mit Fotos',
  momente: [
    { sy: '📸', t: 'Erster Tag. Du landest auf @annexe.cam.', dein: m.abgestimmt ? 'Bei der Umfrage hast du mitgeklickt. Einmal.' : 'Du hast nicht mitgeklickt.' },
    { sy: '📋', t: 'Die Liste. Platz sechs.', dein: m.listeBeiNoah ? 'Du bist zu Noah gegangen.' : m.listeGelacht ? 'Du hast mitgelacht. Kurz.' : 'Du hast weggeschaut.' },
    { sy: '🏀', t: 'Das Turnier. Yusuf im Gang.', dein: m.k3Uhr ? 'Du hast gesagt, was du gesehen hast: die Uhr.' : m.k3Zurueck ? 'Du hast zurückgeschrien.' : m.k3Sommer ? 'Du hast Frau Sommer geholt.' : m.k3Dazwischen ? 'Du hast dich dazwischengestellt.' : 'Du bist weggegangen.' },
    { sy: '⭕', t: '8:34. Ein Kreis um deinen Kopf.', dein: m.k4FotoGezeigt ? 'Du hast gezeigt: Das Foto ist von draußen.' : m.k4LenningGeholt ? 'Du bist zu Mme Lenning gegangen.' : m.k4Ruhig ? 'Du bist stehen geblieben und hast geatmet.' : m.k4Explodiert ? 'Du bist explodiert.' : m.k4Brunnen || m.k4Gerannt ? 'Du bist weg, um runterzukommen.' : m.k4Wut ? 'Du hast zurückgeschlagen.' : 'Es hat geklingelt.' },
    { sy: '🖼️', t: 'Der Screenshot. „Hinten links“.', dein: m.k4Ruhig ? 'Du hast einen ruhigen Satz geschrieben.' : m.k4Wut || m.k4WutSpaet ? 'Du hast in Großbuchstaben geschrieben.' : 'Du hast nichts geschrieben.' },
    { sy: '✋', t: 'Luca filmt Mila.', dein: m.k6Eingegriffen ? 'Du hast etwas getan.' : 'Du hast weggeschaut.' },
    { sy: '📹', t: 'Milas Video.', dein: m.k6VMitMila || m.k6VGefragt || m.k6MilaGefragtSpaet ? 'Du hast Mila zuerst gefragt.' : m.k6VGeteilt ? 'Du hast es weitergeleitet. Um zu helfen.' : m.k6VKommentar || m.k6VChiara || m.k6VApp || m.k6VNoahGefragt ? 'Du hast etwas getan.' : 'Du hast zugesehen.' },
    { sy: '🧩', t: 'Die Tüte in der Kantine.', dein: m.k7Gesetzt ? 'Du hast dich zu Noah gesetzt.' : m.k7Gefilmt ? 'Du hast gefilmt.' : 'Du bist sitzen geblieben.' },
    { sy: '🤖', t: 'Das KI-Video von Mme Tidderich.', dein: m.k8Fake ? 'Du hast es entlarvt. Langsam.' : 'Es hat sich echt angefühlt.' },
    { sy: '🎒', t: 'Dario an der Haltestelle.', dein: m.k9Mitkommen ? 'Du bist mitgegangen.' : m.k9Versprochen ? 'Du hast es getragen. Drei Tage.' : 'Du hast nichts versprochen.' },
  ],
});

// ---------- Brief an mich ----------
const NAMEN = { noah: 'Noah', mila: 'Mila', ben: 'Ben', jo: 'Jo', lina: 'Lina', dario: 'Dario', ayla: 'Ayla' };
const BRIEF = (S) => {
  const top = Object.keys(NAMEN).sort((a, b) => ((S.herz || {})[b] || 0) - ((S.herz || {})[a] || 0)).slice(0, 2);
  return {
    wo: 'Aula · Brief an mich', an: 'Liebes Ich in der 6ème,', gruss: 'Bis in einem Jahr. {name}, 7ème',
    teile: [
      { frage: 'Dein Jahr in einem Satz?', optionen: ['Dieses Jahr war eine Achterbahn.', 'Dieses Jahr war schwerer, als ich dachte.', 'Dieses Jahr war besser, als ich dachte.'] },
      { frage: 'Was willst du behalten?', optionen: ['Ich kann Stopp sagen. Freundlich und klar.', 'Zuhören reicht manchmal schon.', 'Hilfe holen ist kein Petzen.', 'Erst bremsen. Dann teilen.'] },
      { frage: 'Wer war für dich da?', optionen: [...top.map((id) => NAMEN[id] + ' war für mich da.'), 'Ich selbst. Das zählt auch.'] },
      { frage: 'Wenn es nächstes Jahr schwer wird …', optionen: ['… dann pack deinen Skills-Koffer aus.', '… dann such dir einen Erwachsenen. Wie Herrn Kuedes.', '… dann ruf 116 111 an. Anonym und gratis.', '… dann erst atmen. Dann reden.'] },
    ],
  };
};

// ---------- Stärken-Rücken ----------
const RUECKEN = (m) => ({
  wo: 'Aula · Stärken-Rücken', titel: 'Stärken-Rücken',
  info: 'Alle haben ein Blatt auf dem Rücken. Du schreibst. Lesen dürfen sie erst am Ende.',
  an: [
    { wer: F.noah, karten: [
      { t: m.k7Gesetzt ? 'Du hast den Turm wieder aufgebaut. Mit dem grauen Stein.' : 'Du hältst Plätze frei. Ein ganzes Jahr lang.', konkret: true, antwort: '(liest es) Das kleb ich in mein Buch.' },
      { t: 'Du bist voll nett.', antwort: 'Nett. Okay. Nett ist auch was.' } ] },
    { wer: F.mila, karten: [
      { t: 'Du hast die Spur gefunden. Den Winkel, die Uhrzeit, alles.', konkret: true, antwort: 'Das ist präzise. Das hebe ich auf.' },
      { t: 'Du bist schlau.', antwort: '(nickt) Danke.' } ] },
    { wer: F.ben, karten: [
      { t: m.k5BenGefragt ? 'Im Januar hab ich dich was gefragt. Du warst ehrlich.' : 'Du bringst immer Kekse mit. Für alle.', konkret: true, antwort: '(schaut weg) … Danke. Echt.' },
      { t: 'Du bist lustig.', antwort: 'Weiß ich. Trotzdem danke.' } ] },
    { wer: F.dario, karten: [
      { t: 'Du hast es Herrn Kuedes gesagt. Das war mutiger als alles.', konkret: true, antwort: '(lange Pause) … Danke. Echt.' },
      { t: 'Du bist cool.', antwort: 'Danke. … Echt.' } ] },
  ],
  bekommen: [
    { wer: F.noah, t: m.mobbingGemeldet ? 'Du bist mit mir zu Herrn Kuedes. Zusammen.' : m.noahGerettet ? 'Du hast mir am ersten Tag geholfen. Nie vergessen.' : 'Du redest mit mir. Auch wenn andere gucken.' },
    { wer: F.mila, t: m.milaGestoppt || m.stoppKlar ? 'Du sagst Stopp. Laut genug. Das können wenige.' : 'Du stellst echte Fragen.' },
    { wer: F.ben, t: m.benVerziehen ? 'Du hast mir am ersten Tag verziehen. Ich hab das nicht verdient gehabt.' : 'Mit dir sind Pausen besser. Einfach so.' },
    { wer: F.jo, t: m.joFrei || m.joIchBotschaft ? 'Du hast mir nie Druck gemacht. Auch nicht, als du durftest.' : 'Du bist okay. Das heißt bei mir viel.' },
    { wer: F.dario, t: m.darioBegleiten ? 'Ohne dich wär ich nicht reingegangen.' : 'Du hast zugehört. An der Haltestelle.' },
  ],
});

// ---------- Montag 10:00: Die, die dich rausgewählt haben, brauchen dich jetzt (Druck-Runde) ----------
const BOTE = {
  wo: 'Hof · 10:00', gruppe: { a: { id: 'a', name: 'tom', farbe: '#7a7a7a' }, b: { id: 'b', name: 'sami', farbe: '#8a6a5a' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' } }, zeit: 9,
  anker: 'Füße auf den Boden. Es ist nicht deine Nachricht.',
  runden: [
    { wer: 'a', sagt: 'Du redest doch mit Dario. Sag ihm, er soll’s zurücknehmen.', karten: [
      { t: '„Sag’s ihm selbst.“', art: 'nein', druck: -6, ich: 12, antwort: 'Ich red nicht mit dem.' },
      { t: '„Was zurücknehmen?“', art: 'frage', druck: 4, ich: 2, antwort: 'Die Namen! Um drei!' },
    ] },
    { wer: 'b', sagt: 'Im Januar wolltest du doch auch, dass alle wissen, wer’s war.', karten: [
      { t: '„Ja. Und jetzt wollt ihr es nicht mehr.“', art: 'nein', druck: -8, ich: 14, antwort: 'Das ist was anderes.' },
      { t: '„Okay. Ich frag ihn.“', art: 'ja', druck: -10, ich: -18, antwort: 'Danke. Echt.' },
    ] },
    { wer: 'chiara', sagt: '(leiser) Ich steh da bestimmt auch drin.', karten: [
      { t: '„Dann sag es selbst. Vorher.“', art: 'nein', druck: -6, ich: 12, antwort: '(nickt langsam)' },
      { t: '„Selber schuld.“', art: 'ausrede', druck: 4, ich: 0, antwort: '(dreht sich weg)' },
    ] },
  ],
};

export const GESPRAECHE_N10 = {
  // Montag 7:25: Er war nett zu dir, und er hat dir das angetan. Beides stimmt.
  n10_mauer: [
    ['erzaehler', 'Montag. Dario sitzt auf der Mauer. Nicht auf der Bank.'],
    ['erzaehler', 'Seine Eltern wissen es jetzt. An der Skate-Ecke redet keiner mehr mit ihm.'],
    ['dario', 'Ich wusste nicht, ob ich noch neben dir sitzen darf.'],
    { wahl: [
      { t: '(Rücken. Platz machen.)', herz: { dario: 1 }, merke: 'k10Rutschen', dann: [['erzaehler', 'Er kommt rüber. Er setzt sich. Ganz an den Rand.']] },
      { t: '„Heute nicht.“', merke: 'k10HeuteNicht', dann: [['dario', 'Okay.'], ['erzaehler', 'Er bleibt auf der Mauer. Er nickt. Er versteht es.']] },
      { t: '(Nichts sagen.)', merke: 'k10Schweigen', dann: [['erzaehler', 'Ihr sitzt. Zwei Meter auseinander. Dann kommt der Bus.']] },
    ] },
  ],
  n10_skills: [
    ['kaya', 'Wéi geet et? Letzte Skills-Stunde mit Fotos.'],
    ['kaya', 'Ein ganzes Jahr. Wir gucken zurück. Ohne Noten.'],
    ['mesenberg', 'Für jedes Foto: Wie hat es sich angefühlt? Ehrlich.'],
    { szene: 'kurve', id: 'kurve', def: (m) => KURVE(m),
      ausgang: (r) => (Math.min(...r.werte) <= 0 && Math.max(...r.werte) >= 3 ? 'achterbahn' : 'ruhig'),
      folgen: {
        achterbahn: { staerke: 'lesen', merke: 'kurveAchterbahn', dann: [['kaya', 'Ganz unten und ganz oben. Beides war echt.']] },
        ruhig: { merke: 'kurveRuhig', dann: [['kaya', 'Eine ruhigere Kurve. Auch das ist ein Jahr.']] },
      } },
    ['kaya', 'Bevor ihr schreibt: Was ist hängen geblieben? Ein Quiz ohne Noten.'],
    { szene: 'skillsStunde', id: 's10_rueckblick', def: S10_RUECKBLICK, ausgang: (r) => (r.richtig >= 6 ? 'viel' : 'weiter'),
      folgen: { viel: { staerke: 'lesen', merke: 's10Rueckblick' }, weiter: { merke: 's10Rueckblick' } } },
    ['kaya', 'Und jetzt: ein Brief. An dich. In einem Jahr.'],
    ['kaya', 'Ich hebe ihn auf. Versprochen. Ich lese ihn nicht.'],
    { szene: 'brief', id: 'brief', def: (m, S) => BRIEF(S), ausgang: () => 'ok', folgen: { ok: { merke: 'briefGeschrieben' } } },
  ],
  n10_ruecken: [
    ['kaya', 'Stärken-Rücken. Ihr schreibt auf die Rücken der anderen.'],
    ['kaya', 'Was ihr wirklich gesehen habt. Kein „nett“.'],
    { szene: 'staerken', id: 'ruecken', def: (m) => RUECKEN(m),
      ausgang: (r) => (r.konkret.length >= 3 ? 'konkret' : 'allgemein'),
      folgen: {
        konkret: { staerke: 'einbeziehen', herz: { noah: 1, mila: 1, ben: 1, dario: 1 }, merke: 'rueckenKonkret', dann: [['kaya', 'Gesehen. Nicht nur nett. Das bleibt hängen.']] },
        allgemein: { herz: { noah: 1, ben: 1 }, dann: [['kaya', 'Auch kurze Sätze tun gut. Genaue noch mehr.']] },
      } },
    ['erzaehler', 'Du nimmst dein Blatt vom Rücken. Du liest es zweimal.'],
    ['erzaehler', 'Dann faltest du es klein. Und steckst es ins Handy-Case.'],
    { szene: 'stempel', def: { modul: 'Modul 9 · Abschluss', titel: 'Ein ganzes Jahr',
      gelernt: ['Ein Jahr geht rauf und runter – beides ist echt', 'Ein Brief an dich: was du behalten willst', 'Stärken genau sagen, nicht nur „nett“', 'Erden: fünf Dinge sehen, ruhig atmen', 'Wiedergutmachen geht in kleinen Schritten'],
      mission: 'In den Ferien: Lies dein Blatt vom Stärken-Rücken. Einmal pro Woche.' }, folgen: {} },
  ],
  n10_bote: [
    ['erzaehler', 'Montag. 10:00. Alle reden über Freitag, 15:00.'],
    ['ben', 'Ich hab bei ALLEM abgestimmt. Bei allem.'],
    ['erzaehler', 'Dann kommen sie. Die, die im Januar mitgemacht haben. Bei der Umfrage. Beim Video.'],
    { szene: 'druck', id: 'bote', def: BOTE, ausgang: (r) => (r.ja ? 'bote' : 'nein'),
      folgen: {
        bote: { herz: { dario: -2 }, merke: 'k10Bote', dann: [['erzaehler', 'Du gehst zu Dario. Du sagst es.'], ['dario', '(schaut dich lange an) Von dir hätte ich das nicht gedacht.']] },
        nein: { staerke: 'klar', merke: 'k10KeinBote' },
      } },
    ['erzaehler', 'Luca postet nichts. Luca fehlt.'],
    ['erzaehler', 'Ab Mittwoch heißt es: Er darf bis zu den Ferien nicht kommen.'],
  ],
  n10_bilder: [
    ['erzaehler', 'Dienstag. 14:00. Aula. Aufbau fürs Sommerfest.'],
    ['kiesser', 'Lina hat ein Jahr gezeichnet. Wir hängen auf, was sie will. Nur das.'],
    { tu: 'n10_blaetter' },
    { wahl: [
      { t: '(Zu Lina: „Danke.“)', herz: { lina: 1 }, dann: [['erzaehler', 'Lina schaut nicht hoch. Aber ihr Stift hält kurz an.']] },
      { t: '(Nichts sagen. Weiter schauen.)', dann: [['erzaehler', 'Auf einem Blatt bist du. Hinten links. Du schaust lange hin.']] },
    ] },
  ],
  n10_karten: [
    ['hoffmann', 'Schreibt euch selbst. Ich geb sie euch in der 5e zurück.'],
    ['hoffmann', 'Ich les sie nicht. Versprochen.'],
    { tu: 'n10_kartenWahl' },
    ['erzaehler', 'Du faltest die Karte. Mme Tidderich steckt sie in einen Umschlag. Ohne zu lesen.'],
    ['erzaehler', 'Wer du in zwei Jahren bist, weißt du nicht. Die Karte weiß es auch nicht.'],
  ],
  // Mittwoch 12:10 – Entscheidung A: Wiedergutmachung
  n10_kantine: [
    // Wer im Januar selbst gegangen ist, wird gefragt, ob er zurückwill. Wer geblieben ist: Chiara macht die Gruppe neu.
    { wenn: (m) => !!m.k6Verlassen, dann: [['chiara', 'Darf ich dich wieder hinzufügen? Du musst nicht.']], sonst: [['chiara', 'Ich mach die Gruppe neu. Ohne Umfragen. Bist du dabei? Du musst nicht.']] },
    { fest: true, wahl: [
      { t: '„Ja.“', herz: { chiara: 1 }, merke: 'k10GruppeJa', dann: [{ wenn: (m) => !!m.k6Verlassen, dann: [['erzaehler', '„Chiara hat dich hinzugefügt.“ Das Handy summt. Zum ersten Mal seit Januar.']],
        sonst: [['erzaehler', '„Chiara hat dich hinzugefügt: 7P2 · neu.“ Regel 1 steht ganz oben.']] }] },
      { t: '„Noch nicht.“', merke: 'k10GruppeNochNicht', dann: [['chiara', 'Okay. Die Tür bleibt offen.']] },
      { t: '„Mach eine neue Gruppe. Mit Ayla.“', herz: { ayla: 1 }, merke: 'k10GruppeNeu', dann: [['chiara', '(überlegt) … Eine ohne Abstimmungen.'], ['ayla', '(vom Nebentisch) Ich bin dabei.']] },
    ] },
    ['chiara', 'Und noch was. Wer Kopien hat, löscht sie. Vor der Person, die drauf ist.'],
    ['erzaehler', 'Sieben Leute stellen sich an. Nicht alle. Manche halten nur das Handy hin.'],
    ['erzaehler', 'Bei Noah. Bei Mila. Bei dir.'],
    ['noah', '(nach dem fünften) Reicht. Ich will nicht alle sehen.'],
    { wahl: [
      { t: '(Dich selbst anstellen.)', merke: 'k10Angestellt', dann: [{ tu: 'n10_beiWem' }] },
      { t: '(Sitzen bleiben.)', merke: 'k10Sitzen', dann: [['erzaehler', 'Die Schlange wird kürzer. Dann ist sie weg.']] },
    ] },
  ],
  n10_festMorgen: [
    ['erzaehler', 'Freitag. Am Morgen, vor der Aula. Herr Kuedes redet mit Dario. Du hörst es zufällig.'],
    ['kaya', 'Alles ist gesichert. Du darfst ihn löschen. Wann, entscheidest du.'],
    ['dario', 'Um drei. Vor allen.'],
    { blende: 'Freitag · 14:52' },
  ],
  // Freitag 14:52 (Fable, Schlüsselszene K10)
  n10_fest: [
    ['erzaehler', 'Freitag. 14:52. Es riecht nach Gromperekichelcher und Sonnencreme.'],
    ['erzaehler', 'Alle schauen auf ihre Handys. Noch acht Minuten.'],
    ['erzaehler', 'Herr Kuedes, Herr Mesenberg und Mme Tidderich stehen an der Tür zur Aula.'],
    ['erzaehler', 'Dario steigt auf die Bank. Seine Knie zittern.'],
    ['dario', 'Ich muss was sagen. Bevor es drei ist.'],
    ['jemand', 'Lauter!'],
    { tu: 'n10_stimme' },
    ['dario', 'Der Account. Das war ich. Ich hab ihn gemacht.'],
    ['dario', 'Am Anfang war er lustig. Dann nicht mehr.'],
    ['dario', 'Und ich war immer noch dabei.'],
    ['dario', '{name} war es nie. Der Screenshot war gefälscht.'],
    { tu: 'n10_lina1455' },
    ['erzaehler', 'Niemand klatscht. Jemand lacht kurz und hört auf.'],
    ['dario', 'Um drei sollen Namen kommen. Wer was geschickt hat.'],
    ['dario', 'Meinen kennt ihr jetzt.'],
    ['erzaehler', 'Stille. Dann räuspert sich Jo.'],
    ['jo', 'Drei Fotos. Von mir. Und der Witz mit dem Fake.'],
    ['ben', 'Ich hab das erste weitergeleitet. An alle.'],
    ['erzaehler', 'Chiara faltet einen Zettel auf. Sie hat es aufgeschrieben.'],
    { wenn: (m) => m.k5Rausgeflogen === 'du', dann: [['chiara', 'Ich habe {name} aus der Gruppe entfernt. Das war falsch.']],
      sonst: [{ wenn: (m) => m.k5Rausgeflogen === 'noah', dann: [['chiara', 'Ich habe Noah aus der Gruppe entfernt. Und ich hab die Umfrage gemacht. Das war falsch.']],
        sonst: [{ wenn: (m) => !!m.k5ZielDu, dann: [['chiara', 'Ich hab die Umfrage über {name} gemacht. Das war falsch.']], sonst: [['chiara', 'Ich hab die Umfrage über Noah gemacht. Das war falsch.']] }] }] },
    { warum: true, wahl: [
      { t: '(Deinen Teil sagen.)', staerke: 'mut', merke: 'k10Teil', dann: [{ tu: 'n10_meinTeil' }] },
      { t: '(Nichts sagen.)', merke: 'k10Geschwiegen', dann: [['erzaehler', 'Du sagst nichts. Dein Teil bleibt bei dir. Für heute.']] },
      { t: '(Dich neben die Bank stellen.)', dann: [{ tu: 'n10_nebenBank' }] },
    ] },
    ['erzaehler', 'Dario tippt: „Passwort vergessen“. Sein Handy summt. Ein Code.'],
    ['erzaehler', '14:58. Auf dem Display: „Konto endgültig löschen?“'],
    ['dario', 'Jetzt kann er posten, was er will. Ich hab’s schon gesagt.'],
    ['erzaehler', 'Er drückt. Es wird 15:00. Kein Handy summt.'],
    { tu: 'n10_geloescht' },
    // 15:20 – Am Zaun (Entscheidung B)
    { blende: 'Freitag · 15:20' },
    ['erzaehler', 'Draußen auf dem Gehweg steht Luca. Er hat nichts gepostet.'],
    ['erzaehler', 'Kenan ist zu ihm rausgegangen. Dann kommt Herr Mesenberg dazu.'],
    ['mesenberg', 'Bis zu den Ferien bleibt Luca draußen. Im Herbst gibt es Gespräche. Mit denen, die er gefilmt hat. Nur, wenn die das wollen.'],
    { tu: 'n10_kenan' },
    ['erzaehler', 'Jo hebt das Handy.'],
    ['jo', 'Guck ihn dir an. Das poste ich.'],
    { fest: true, wahl: [
      { t: '„Jo. Nicht.“', staerke: 'klar', herz: { jo: 1 }, merke: 'k10JoNicht', dann: [['erzaehler', 'Jo lässt das Handy sinken.'], ['jo', 'War nur …'], ['erzaehler', 'Er sagt den Satz nicht zu Ende.']] },
      { t: '(Jos Handy runterdrücken.)', herz: { jo: -1 }, merke: 'k10HandyGedrueckt', dann: [['jo', 'Fass mich nicht an.'], ['erzaehler', 'Er steckt es trotzdem weg. Wütend.']] },
      { t: '(Selbst zum Zaun gehen.)', staerke: 'mut', merke: 'k10Zaun', dann: [['luca', 'Ihr habt alle gelacht. Jeden Tag.'], ['erzaehler', 'Er entschuldigt sich nicht. Er schaut dich an. Dann weg.']] },
      { t: '(Dich wegdrehen.)', merke: 'k10Weggedreht', dann: [['erzaehler', 'Hinter dir klickt es. Jo hat das Foto gemacht.'], ['erzaehler', 'Ob er es postet, erfährst du im September.']] },
    ] },
    { blende: 'Freitag · 16:30' },
    { tu: 'n10_ende' },
  ],
};

// Enden (Fable): Freitag 16:30 – deine engste Freundschaft bestimmt die letzte Szene
const bester = (S) => {
  const f = S.freund || {}, h = S.herz || {};
  const wert = (id) => (f[id] != null ? f[id] : (h[id] || 0) * 10);
  return ['noah', 'mila', 'ben', 'jo'].reduce((a, b) => (wert(b) > wert(a) ? b : a), 'noah');
};
const ENDEN = {
  noah: () => [
    ['erzaehler', 'Aula. Der Turm steht. Ein Meter vierzig.'],
    ['noah', 'Oben fehlt noch die Spitze.'],
    ['erzaehler', 'Er hält dir einen kleinen Stein hin. Grau.'],
    { wahl: [
      { t: '„Dein Turm. Mach du.“', dann: [] },
      { t: '(Den Stein nehmen.)', dann: [] },
    ] },
    ['noah', 'Im Juni lag er in der Kiste. Du warst dabei.'],
    ['noah', 'Deswegen du.'],
    ['erzaehler', 'Der Stein klickt. Die Uhr sitzt eine Reihe zu tief.'],
    ['noah', 'Lass ich so.'],
    ['noah', 'Nächstes Jahr bau ich die Haltestelle.'],
    { wahl: [
      { t: '„Mit Taube?“', dann: [] },
      { t: '„Mit Bank?“', dann: [] },
    ] },
    ['noah', 'Mit allem. Auch mit uns.'],
  ],
  mila: () => [
    ['erzaehler', 'Im CDI stehen die Stühle schon auf den Tischen.'],
    ['mila', 'Das Heft ist voll. Letzte Seite.'],
    ['erzaehler', 'Ihre Schrift, klein und gerade: „Fakt 112: {name} war es nicht.“'],
    ['mila', 'Hundertdreizehn sag ich laut. Sonst zählt es nicht.'],
    ['mila', 'Der Satz vom Dezember stimmt nicht mehr.'],
    { wahl: [
      { t: '„Welcher Satz?“', dann: [['mila', '„Wenn der Würfel dein einziger Freund ist.“ Ist er nicht mehr.']] },
      { t: '„Ich weiß.“', dann: [['mila', '(lächelt. Fast.) Ich weiß, dass du’s weißt.']] },
      { t: '(Nichts sagen.)', dann: [['erzaehler', 'Mila nickt. Das reicht ihr.']] },
    ] },
    ['erzaehler', 'Sie gibt dir den Würfel. Alle Seiten sauber.'],
    ['mila', 'Mach ihn kaputt.'],
    ['erzaehler', 'Du drehst. Einmal. Zweimal. Sie schaut zu.'],
    ['mila', 'Im September zeig ich dir, wie man ihn löst.'],
  ],
  ben: () => [
    ['erzaehler', 'Hof. Ben stellt zwei Teller ab. Gromperekichelcher. Zu viel Apfelmus.'],
    ['ben', 'Ich sag jetzt mal nichts.'],
    ['erzaehler', 'Drei Sekunden.'],
    ['ben', 'Okay. Das war lang.'],
    ['ben', 'Das Foto weiterleiten war blöd.'],
    ['ben', 'Im Januar still sein war schlimmer.'],
    { wahl: [
      { t: '„Ja. War es.“', dann: [] },
      { t: '„Du bist jetzt da.“', dann: [] },
      { t: '(Essen.)', dann: [] },
    ] },
    ['erzaehler', 'Er holt sein Handy raus. Dein Kontakt: „{name} 7P2“.'],
    ['ben', 'Nächstes Jahr stimmt das nicht mehr.'],
    ['erzaehler', 'Er löscht „7P2“. Nur dein Name bleibt.'],
    ['ben', 'So. Nur noch du.'],
  ],
  jo: () => [
    ['erzaehler', 'Jo sitzt auf der Mauer an der Skate-Ecke. Das Handy in beiden Händen.'],
    ['jo', 'Ich hab ein Foto. Von eben. Du, Dario, die Bank.'],
    ['jo', 'Es ist gut. Echt gut.'],
    ['erzaehler', 'Er hält es dir hin. Der Daumen weit weg von „Senden“.'],
    ['jo', 'Guck erst. Bevor ich’s irgendwem schicke.'],
    { wahl: [
      { t: '„Seit wann fragst du?“', dann: [] },
      { t: '„Schick’s nur mir.“', dann: [] },
      { t: '„Lösch es.“', dann: [] },
    ] },
    ['jo', 'Seit heute. Mal sehen, wie lang.'],
    ['erzaehler', 'Er grinst. Anders als im September.'],
    ['jo', 'Wenn du Nein sagst, ist es weg. Deal?'],
  ],
};
// Lina-Ende: Nummer nie blockiert, in Kapitel 8 vorher gefragt – und mindestens eins: sanfter Ton (K1), Lina zuerst gewählt (K3),
// die Zeichnung nicht Dario gezeigt (K3)
const linaEnde = (m) => !m.nummerBlockiert && !!m.k8NummerGefragt && !!(m.nummerSanft || m.wahlLina || !m.zeichnungDarioGezeigt);

export const tunN10 = (c) => ({
  n10_blaetter: () => {
    const m = c.S.merke;
    const blatt = (t, nickt = true) => [['erzaehler', t], ['kiesser', 'Dieses auch?'], ['erzaehler', nickt ? 'Lina nickt.' : 'Lina schüttelt den Kopf.']];
    return [
      ...blatt('Der Hof im September. Ein Kreis aus Handys. ' + (m.abgestimmt ? 'Am Rand: du. Der Daumen auf dem Display.' : 'Am Rand: du. Die Hände in den Taschen.')),
      ...blatt('Das Foto von 8:34. Ein Kreis um einen Kopf. ' + (m.k4NoahVerteidigt ? 'Und daneben Noah, der wieder atmen kann.' : m.k4FotoGezeigt ? 'Und ein grüner Fleck im Glas.' : 'Und zwölf Handys, die es haben.')),
      ...blatt('Der Würfel. Ein Stein auf der Mauer. ' + (m.k6Eingegriffen ? 'Und jemand, der vor Mila steht.' : 'Und viele Rücken.')),
      ...blatt(m.k7Gesetzt ? 'Die Kantine. Zwei an einem Tisch. Dann vier.' : m.k7Gefilmt ? 'Die Kantine. Ein Handy, hochgehalten. Die Hand ist deine.' : 'Die Kantine. Ein Tablett mit einer Tüte. Viele Handys.'),
      ...blatt('Die Bank. Dario. Daneben ein Platz.'),
      ...blatt('Die Haltestelle im November. Zwei von hinten. Ein Handy zwischen ihnen.', false),
      ['erzaehler', 'Du gehst an deinem eigenen Jahr vorbei. So, wie jemand anders es gesehen hat.'],
    ];
  },
  n10_kartenWahl: () => {
    const m = c.S.merke;
    const satz = m.k5Satz ? m.k5Satz : m.k5SatzManche ? 'Manche glauben es. Nicht alle.' : m.k5SatzMittwoch ? 'Heute ist Mittwoch. Mehr weiß ich nicht.' : m.k5SatzWissen ? 'Ich weiß, was ich gemacht hab. Und was nicht.' : null;
    return [{ wahl: [
      ...(satz ? [{ t: '„' + satz + '“ (dein Satz vom Januar)', merke: 'k10KarteJanuar', dann: [] }] : []),
      { t: '„Ich hab zugeschaut. Nächstes Jahr nicht mehr.“', merke: 'k10KarteZuschauen', dann: [] },
      { t: '„Ich weiß jetzt, wer bleibt.“', merke: 'k10KarteBleibt', dann: [] },
    ] }];
  },
  n10_beiWem: () => {
    const m = c.S.merke;
    const opt = [
      { id: 'noah', t: '(Bei Noah.)', antwort: [['noah', 'Okay.']], immer: true },
      { id: 'mila', t: '(Bei Mila.)', antwort: [['mila', 'Notiert.']], immer: true },
      { id: 'ben', t: '(Bei Ben.)', antwort: [['ben', 'Passt.']], wenn: m.k5BenBeschuldigt || m.k5BenGemieden || m.k5BenGeruecht },
      { id: 'jo', t: '(Bei Jo.)', antwort: [['jo', '… Danke.']], wenn: m.k6DateiGepostet || m.k8JoReingelegt },
    ].filter((o) => o.immer || o.wenn);
    const saetze = ['„Das war nicht okay. Ich lösch es.“', '„Ich hab zugeschaut. Das tut mir leid.“', '„Ich hab mitgemacht. Ich mach das nicht mehr.“', '„Ich wollte dazugehören. Das war es nicht wert.“', '(Nur löschen. Nichts sagen.)'];
    return [{ wahl: opt.map((o) => ({ t: o.t, herz: { [o.id]: 2 }, merke: 'k10Wieder_' + o.id, dann: [
      { wahl: saetze.map((s) => ({ t: s, dann: [] })) },
      ['erzaehler', 'Du löschst, was du hast. Vor den Augen von ' + (o.id === 'noah' ? 'Noah' : o.id === 'mila' ? 'Mila' : o.id === 'ben' ? 'Ben' : 'Jo') + '.'],
      ...o.antwort,
      ['erzaehler', 'Ein Blick. Kein Lob. Mehr braucht es nicht.'],
    ] })) }];
  },
  // „Deinen Teil sagen“ setzt ein, was du getan hast. Hast du nichts davon getan: „Ich hab zugeschaut. Jeden Tag.“
  n10_meinTeil: () => {
    const m = c.S.merke, r = [];
    if (m.abgestimmt) r.push(['du', 'Ich hab am ersten Tag abgestimmt.']);
    if (m.milaKommentiert) r.push(['du', 'Ich hab unter einem Post kommentiert. Es wurde größer.']);
    if (m.k7Geteilt) r.push(['du', 'Ich hab das Video weitergeleitet. Zum Prüfen. Es war trotzdem eins mehr.']);
    if (m.k7Gefilmt) r.push(['du', 'Ich hab Noah gefilmt. In der Kantine.']);
    if (m.k6DateiGepostet) r.push(['du', 'Ich hab Jos Sprachnachricht in den Chat gestellt.']);
    if (!r.length) r.push(['du', 'Ich hab zugeschaut. Jeden Tag.']);
    return [...r, ['erzaehler', 'Ein paar schauen zu dir. Dann wieder zu Dario.']];
  },
  n10_nebenBank: () => {
    const m = c.S.merke;
    if (m.k9Gegangen && !m.k9Mitkommen || m.k10Bote) { m.k10NebenNein = true; return [['erzaehler', 'Dario schaut kurz zu dir. Er schüttelt kaum sichtbar den Kopf. Du bleibst, wo du bist.']]; }
    m.k10NebenBank = true;
    return [['erzaehler', 'Du stellst dich neben die Bank. Dario schaut kurz zu dir. Seine Knie zittern weniger.']];
  },
  n10_stimme: () => {
    const m = c.S.merke;
    if (m.k9Geklopft) return [['erzaehler', 'Seine Stimme ist dünn. Er räuspert sich. Zweimal.']];
    if (m.k9Vorgegangen || m.k9Gewartet) return [['erzaehler', 'Seine Stimme zittert. Aber sie trägt.']];
    return [];
  },
  n10_lina1455: () => (linaEnde(c.S.merke) ? [
    ['erzaehler', '14:55. Jemand ruft: „Beweis! Der deckt doch nur {name}!“'],
    ['erzaehler', 'Am Rand steht Lina. Das Skizzenbuch vor der Brust.'],
    ['lina', 'Ich hab es gesehen.'],
    ['erzaehler', 'Leise. Aber alle drehen sich um.'],
    ['lina', 'Am ersten Tag. In der Kantine. Ich hab es gezeichnet.'],
    ['erzaehler', 'Sie schlägt das Buch auf. Eine Hand. Ein Handy. Ein Armband.'],
    ['erzaehler', 'Dario hebt den linken Arm. Er nickt.'],
  ] : []),
  n10_geloescht: () => { c.S.merke.accountGeloescht = true; c.ui.toast('<b>@annexe.cam</b><span>Dieses Konto existiert nicht mehr.</span>'); return []; },
  n10_kenan: () => ((c.S.merke.k6Eingegriffen || c.S.merke.k7NeinBleiben) ? [['kenan', '(im Vorbeigehen, zu dir) Im Januar hast du als Erstes was gesagt. Ich weiß das noch.']] : []),
  n10_ende: () => {
    const m = c.S.merke;
    const b = bester(c.S);
    m.endeMit = b; m.endeLina = linaEnde(m);   // für die Lehrer-Ansicht
    const lina = linaEnde(m) ? [
      { blende: 'Freitag · 16:40' },
      ['erzaehler', 'Dein Handy summt. Die unbekannte Nummer.'],
      ['nummer', 'jetzt kannst du mich speichern.'],
      ['erzaehler', 'Du tippst vier Buchstaben. L. I. N. A.'],
      ['lina', '(Nachricht) so hast du ausgesehen. am ersten tag.'],
      ['erzaehler', 'Ein Foto ihrer Zeichnung. Hinten links. Die Hände in den Taschen.'],
      { wahl: [{ t: '„verloren.“', dann: [] }, { t: '„cringe.“', dann: [] }, { t: '„wie denn?“', dann: [] }] },
      ['lina', '(Nachricht) neu.'],
    ] : [];
    const bank = m.k10NebenBank || (m.k10Rutschen && !m.k10NebenNein) ? 'Dario sitzt neben dir auf der Bank. Wie jeden Morgen. Nur ehrlicher.'
      : m.k10NebenNein ? 'Dario sitzt auf der Mauer. Er nickt dir zu. Mehr nicht. Noch nicht.'
      : m.k10HeuteNicht ? 'Dario sitzt auf der Mauer. Morgen vielleicht wieder auf der Bank.' : 'Dario sitzt am anderen Ende der Bank.';
    const gruppe = m.k10GruppeJa ? 'Du bist wieder im Klassenchat. Er heißt jetzt anders.' : m.k10GruppeNeu ? 'Du bist in einer neuen Gruppe. Mit Ayla. Ohne Abstimmungen.' : m.k6Verlassen ? 'Du bist noch in keiner Gruppe. Dein Handy ist still. Das ist okay.' : 'In der neuen Gruppe bist du noch nicht. Das ist okay.';
    const foto = m.k10Weggedreht ? 'Jo hat das Foto von Luca gemacht. Ob es online ist, weißt du nicht.' : 'Es gibt kein Foto von Luca am Zaun.';
    return [
      ...ENDEN[b](),
      ...lina,
      { blende: 'Freitag · 17:10' },
      ['erzaehler', 'Haltestelle. Die Bank ist warm.'],
      ['nik', 'Äddi.'],
      ['erzaehler', bank],
      ['erzaehler', gruppe],
      ['erzaehler', foto],
      { blende: 'Freitag · Abend' },
      ['erzaehler', 'An der Tür vom Jugendhaus hängt ein Zettel. Von Ayla.'],
      ['erzaehler', '„Band sucht: Schlagzeug, Gitarre, Stimme. Proben ab September. Einfach kommen.“'],
      ['erzaehler', 'Unter „Stimme“ stand schon ein Name. Jemand hat ihn wegradiert. Man sieht noch das L.'],
      ['erzaehler', 'Ende der 7e.'],
      { tu: 'kapitelEnde' },
    ];
  },
});
