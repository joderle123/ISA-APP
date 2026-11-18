// Drei Jahre Annexe – 7ème, Kapitel 10 „Abschluss“ (Kurs Jahr 1, Modul 9: Rückblick, Jahres-Kurve, Brief an mich,
// Stärken-Rücken, Erden in fünf Sinnen). Faden @annexe.cam wird aufgelöst: Dario sagt es vor allen, Luca trägt Folgen –
// Verzeihen muss niemand, fair bleiben schon. Vier Enden je nach bester Freundschaft. Ausblick auf die 6ème (die Band).
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], dario: [-9.8, -55.2, -1.4] };
const FEST = { rantini: [4.5, 19.5, Math.PI], ben: [4, 14, 0.2], jo: [5.2, 15.4, -0.4], ayla: [2.5, 15, 0.3], noah: [7.2, 13.2, -0.6], mila: [3.2, 12.8, 0.1], lina: [1.8, 13.4, 0.4],
  dario: [5.6, 17.6, Math.PI], kaya: [8.6, 17.2, -2.4], hoffmann: [9.4, 15.8, -2], luca: [11.6, 12.4, -1.2] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

export const SCHRITTE_N10 = [
  { id: 'k10_morgen', kap: 10, tag: 'Montag', uhr: 7.45, titel: 'Zurück im Chat', ziel: 'Letzte Schulwoche. Noah wartet an der Haltestelle.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n10_chat' },
    leute: { noah: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n10_noah' } },
  { id: 'k10_skills', kap: 10, tag: 'Montag', uhr: 9.9, titel: 'Skills: Dein Jahr', ziel: 'Aula. Herr Kuedes hat eine Wäscheleine voller Fotos gespannt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n10_skills' } },
  { id: 'k10_ruecken', kap: 10, tag: 'Mittwoch', uhr: 9.9, titel: 'Stärken-Rücken', ziel: 'Aula. Alle haben ein weißes Blatt auf dem Rücken.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n10_ruecken' } },
  { id: 'k10_luca', kap: 10, tag: 'Donnerstag', uhr: 12.4, titel: 'Luca', ziel: 'Luca sitzt allein in der Skate-Ecke. Ohne Handy.', marker: 'luca',
    start: { teleport: 'eingangHof' },
    leute: { luca: [-34, 10.5, 1.2, 'sitzt'] },
    fertig: { reden: 'luca', gespraech: 'n10_luca' } },
  { id: 'k10_fest', kap: 10, tag: 'Freitag', uhr: 13.5, titel: 'Sommerfest', ziel: 'Sommerfest im Hof. Lampions. Dario steht neben der Bühne.', marker: 'dario',
    start: { teleport: 'eingangHof', gespraech: 'n10_festStart' },
    leute: FEST,
    fertig: { reden: 'dario', gespraech: 'n10_fest' } },
];

// ---------- Zurück im Klassenchat ----------
const ZURUECK = {
  titel: 'Klasse 7P2', mitglieder: 21, dauer: 24,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ayla hat dich hinzugefügt.' },
    { nach: 1.6, wer: 'Ayla', text: 'zurück wo du hingehörst 💅' },
    { nach: 3.6, wer: 'Ben', text: 'ENDLICH. ich hab 6 wochen memes an mich selbst geschickt' },
    { nach: 6.6, wer: 'Mila', text: 'Info: @annexe.cam ist gelöscht. 0 Beiträge. Ich hab nachgezählt.' },
    { nach: 9.6, wer: 'Jo', text: 'willkommen zurück. sorry nochmal wegen der sprachnachricht', setzt: 'joSorry' },
    { nach: 13, wer: 'Noah', text: 'Ich hab dir einen Platz im Chat freigehalten. Witz. Oder?' },
    { nach: 17, wer: 'Lina', text: '(schickt eine Zeichnung: Gerd die Taube mit Partyhut)' },
  ],
  aktionen: [
    { id: 'jo', t: 'Jo antworten', symbol: '💬', wenn: 'joSorry', wahl: [
      { t: '„Schon okay. Du hast es ja nicht gepostet.“', setzt: 'joVerziehen', ich: 'schon okay. du hast es ja nicht gepostet', folgen: [{ nach: 1.6, wer: 'Jo', text: 'trotzdem. war dumm 🫡' }] },
      { t: '„Okay. Aber das war echt nicht cool.“', setzt: 'joEhrlich', ich: 'okay. aber das war echt nicht cool', folgen: [{ nach: 1.6, wer: 'Jo', text: 'weiß ich. deshalb sag ichs ja' }] },
    ] },
    { id: 'hallo', t: 'Hallo sagen', symbol: '👋', setzt: 'hallo', ich: 'hi 👋 danke euch', folgen: [{ nach: 1.4, wer: 'Ben', text: 'die legende spricht 🎉🎉' }] },
    { id: 'weg', t: 'Handy weg, Bus kommt', symbol: '🚌', sys: 'Der Bus kommt. Du lächelst. Ein bisschen.', ende: true },
  ],
};

// ---------- Jahres-Kurve ----------
const KURVE = (m) => ({
  wo: 'Aula · Wäscheleine mit Fotos',
  momente: [
    { sy: '📸', t: 'Erster Tag. Du landest auf @annexe.cam.', dein: m.noahGerettet ? 'Du hast Noah einen Platz gerettet.' : 'Du hast den Tag überstanden. Immerhin.' },
    { sy: '🎤', t: 'Talenttag. „Top 5 langweiligste Leute.“', dein: m.noahVerteidigt ? 'Du hast im Chat für Noah geschrieben.' : m.staerkenKonkret ? 'Du hast echte Stärken-Karten verschenkt.' : 'Du hast zugesehen. Und viel gemerkt.' },
    { sy: '🏃', t: 'Sportfest. Und das Foto von Mila.', dein: m.milaGestoppt ? 'Du hast gesagt: Hört auf.' : m.koerperGespuert ? 'Du hast gespürt, wo die Aufregung sitzt.' : 'Ihr wart Letzte. Zusammen.' },
    { sy: '📐', t: 'Mathe-Test mit Puls 140.', dein: m.testSkills ? 'Du hast deinen Skills-Koffer benutzt.' : m.noahAtem ? 'Du hast mit Noah geatmet.' : 'Blackout. Und danach wieder Luft.' },
    { sy: '🖼️', t: 'Der Fake-Screenshot. Alle dachten, du warst es.', dein: m.fakeKuedes ? 'Du bist ruhig zu Herrn Kuedes gegangen.' : m.neuerSatz ? 'Du hast einen neuen Satz für dich gefunden.' : 'Die Gedanken waren laut.' },
    { sy: '✋', t: 'Klassenfoto. Und Luca filmt Mila.', dein: m.stoppKlar ? 'Dein Stopp war klar.' : m.joGehoert ? 'Du hast Jo wirklich zugehört.' : 'Danach: raus aus dem Klassenchat.' },
    { sy: '🧩', t: 'Allein. Wer bleibt?', dein: m.druckNein ? 'Du hast Nein gesagt. Drei gegen dich.' : m.buehneGekippt ? 'Du hast die Bühne gekippt. Für Noah.' : 'Ben ist geblieben. Sofort.' },
    { sy: '🤖', t: 'Das KI-Video von Mme Tidderich.', dein: m.videoGebremst ? 'Du hast nicht geteilt.' : m.falleEhrlich ? 'Ihr habt eine ehrliche Falle gestellt.' : 'Und dann schnappte die Falle zu.' },
    { sy: '🎒', t: 'Dario an der Haltestelle.', dein: m.darioBegleiten ? 'Du bist mit zu Herrn Kuedes gegangen.' : 'Du hast zugehört.' },
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
      { t: m.buehneGekippt ? 'Du bist in der Kantine sitzen geblieben. Obwohl alle gelacht haben.' : 'Du hältst Plätze frei. Ein ganzes Jahr lang.', konkret: true, antwort: '(liest es) Das kleb ich in mein Buch. Neben den Drachen.' },
      { t: 'Du bist voll nett.', antwort: 'Nett. Okay. Nett ist auch was.' } ] },
    { wer: F.mila, karten: [
      { t: 'Du hast die Spur gefunden. Den Winkel, die Uhrzeit, alles.', konkret: true, antwort: 'Das ist präzise. Das hebe ich auf.' },
      { t: 'Du bist schlau.', antwort: 'Immer noch keine Beobachtung. Aber danke.' } ] },
    { wer: F.ben, karten: [
      { t: 'Du bist geblieben, als alle weg waren. Sofort.', konkret: true, antwort: 'Bruder. Das ist keine Träne. Das ist Aura.' },
      { t: 'Du bist lustig.', antwort: 'Weiß ich. Trotzdem danke.' } ] },
    { wer: F.dario, karten: [
      { t: 'Du hast es Herrn Kuedes gesagt. Das war mutiger als alles.', konkret: true, antwort: '(lange Pause) … Danke. Echt.' },
      { t: 'Du bist cool.', antwort: 'Bin ich nicht. Aber ich arbeite dran.' } ] },
  ],
  bekommen: [
    { wer: F.noah, t: m.noahGerettet ? 'Du hast mir am ersten Tag geholfen. Nie vergessen.' : 'Du redest mit mir. Auch wenn andere gucken.' },
    { wer: F.mila, t: m.milaGestoppt || m.stoppKlar ? 'Du sagst Stopp. Laut genug. Das können wenige.' : 'Du stellst echte Fragen.' },
    { wer: F.ben, t: 'Lieblings-Mensch für Pausen. Platz zwei: Kekse.' },
    { wer: F.jo, t: m.joFrei || m.joIchBotschaft ? 'Du hast mir nie Druck gemacht. Auch nicht, als du durftest.' : 'Du bist okay. Das heißt bei mir viel.' },
    { wer: F.dario, t: m.darioBegleiten ? 'Ohne dich wär ich nicht reingegangen.' : 'Du hast zugehört. An der Haltestelle.' },
  ],
});

export const GESPRAECHE_N10 = {
  n10_chat: [
    ['erzaehler', 'Montag, 7:20. Letzte Schulwoche. Dein Handy vibriert.'],
    { szene: 'chat', id: 'zurueck', def: ZURUECK,
      ausgang: (r) => (r.flags.joVerziehen ? 'verziehen' : r.flags.joEhrlich ? 'ehrlich' : 'still'),
      folgen: {
        verziehen: { herz: { jo: 1 }, merke: 'joVerziehen' },
        ehrlich: { staerke: 'klar', herz: { jo: 1 }, merke: 'joEhrlich' },
        still: {},
      } },
  ],
  n10_noah: [
    ['noah', 'Letzte Woche. Dann Ferien.'],
    ['noah', 'Weißt du noch? Erster Tag. Ich hatte Kopfhörer auf.'],
    ['noah', 'Ohne Musik.'],
    { wahl: [
      { t: '„Warum ohne Musik?“', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [['noah', 'Damit keiner mit mir redet. Und dann hast du trotzdem.']] },
      { t: '„Und jetzt?“', staerke: 'kontakt', herz: { noah: 1 }, dann: [['noah', 'Jetzt mit Musik. Und ich nehm sie ab, wenn du kommst.']] },
      { t: '(Grinsen. Neben ihn setzen.)', herz: { noah: 1 }, dann: [['noah', '(schiebt dir einen Ohrstöpsel rüber)']] },
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
    ['ben', 'Meine Kurve sieht aus wie ein Basketball-Feld. Von oben.'],
    ['jo', 'Das ist nicht mal eine Kurve, Ben. Das ist ein Kreis.'],
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
  ],
  n10_luca: [
    ['luca', 'Was willst du? Lachen?'],
    { wahl: [
      { t: '„Nein. Nur fragen, wie’s dir geht.“', staerke: 'kontakt', herz: { luca: 1 }, merke: 'lucaGefragt', dann: [
        ['luca', 'Mies. Handy weg bis zu den Ferien. Gespräche mit allen.'],
        ['luca', 'Und alle gucken mich an. So wie ich euch angeguckt hab.'],
        { tu: 'n10_lucaMehr' } ] },
      { t: '(Weitergehen. Du musst nicht mit ihm reden.)', staerke: 'klar', merke: 'lucaAbstand', dann: [
        ['erzaehler', 'Du gehst weiter. Abstand halten ist auch eine Antwort.'] ] },
    ] },
  ],
  n10_festStart: [
    ['erzaehler', 'Freitag. Sommerfest. Lampions über dem Hof. Ben verkauft Kekse.'],
    ['ben', 'Ein Euro. Für Freunde zwei. Weil Freunde mehr essen.'],
  ],
  n10_fest: [
    ['dario', 'Meine Hände zittern. Mein Kopf ist komplett weg.'],
    { wahl: [
      { t: '„Fünf Sachen, die du siehst. Sag sie laut.“', staerke: 'ruhig', herz: { dario: 1 }, dann: [
        ['dario', 'Die Bühne. Die Lampions. Ben. Kekse. … Dein Gesicht.'],
        ['dario', 'Okay. Ich bin hier. Ich bin hier.'] ] },
      { t: '„Atmen. Mit mir. Vier rein, vier raus.“', staerke: 'ruhig', herz: { dario: 1 }, dann: [['dario', '(atmet mit dir) … Besser. Ein bisschen.']] },
      { t: '„Du schaffst das.“', dann: [['dario', 'Sagt man so. … Okay.']] },
    ] },
    ['erzaehler', 'Dario steigt auf die Bühne. Das Mikro pfeift. Alle drehen sich um.'],
    ['dario', 'Ähm. Hallo. Ich bin Dario. Das wisst ihr.'],
    ['dario', 'Ich hab @annexe.cam angefangen. Im Herbst.'],
    ['dario', 'Ich wollte dazugehören. Dann ist es mir weggelaufen.'],
    ['dario', 'Es tut mir leid. Noah. Mila. Mme Tidderich. Allen.'],
    { tu: 'n10_festDario' },
    ['dario', 'Ab September mach ich einen Foto-Club. Fotos nur mit Fragen vorher.'],
    ['erzaehler', 'Stille. Drei Sekunden. Sehr lange drei Sekunden.'],
    { wahl: [
      { t: '(Als Erstes klatschen.)', staerke: 'mut', herz: { dario: 2 }, merke: 'erstGeklatscht', dann: [['erzaehler', 'Du klatschst. Ben macht mit. Dann Noah. Dann fast alle.']] },
      { t: '(Dario zunicken. Ganz ruhig.)', herz: { dario: 1 }, dann: [['erzaehler', 'Dario sieht dich. Er nickt zurück. Dann klatscht Ben los.']] },
    ] },
    ['mila', 'Noch eine Frage, Dario. Darf ich in den Foto-Club?'],
    ['dario', '(lacht, halb weinend) Du bist Vorsitzende. Sofort.'],
    ['kaya', 'Das war groß, Dario. Wiedergutmachen geht in kleinen Schritten.'],
    ['hoffmann', 'Ça va? … Ich hab mit Dario gesprochen. Lange.'],
    ['hoffmann', 'Das Video ist weg. Und ich bin noch da.'],
    { tu: 'n10_festLuca' },
    ['rantini', 'Klassenfoto. Teil zwei. Alle rücken zusammen.'],
    ['noah', 'Diesmal frag ich vorher. Darf ich den Arm auf deine Schulter?'],
    { wahl: [
      { t: '„Ja. Klar.“', herz: { noah: 1 }, merke: 'fotoArm', dann: [['noah', '(legt den Arm ganz leicht auf deine Schulter)']] },
      { t: '„Lieber nebeneinander.“', staerke: 'klar', herz: { noah: 1 }, merke: 'fotoNeben', dann: [['noah', 'Okay. Nebeneinander ist auch zusammen.']] },
    ] },
    ['rantini', 'Drei, zwei, eins … Käsebrötchen!'],
    ['ben', 'Wer sagt denn Käsebrötchen?!'],
    ['erzaehler', 'Klick. Auf dem Foto lachen alle. Sogar Lina. Sogar du.'],
    { tu: 'n10_ende' },
  ],
};

const bester = (S) => {
  const h = S.herz || {};
  const id = ['noah', 'mila', 'ben', 'jo'].sort((a, b) => (h[b] || 0) - (h[a] || 0))[0];
  return (h[id] || 0) >= 2 ? id : null;
};

const ENDEN = {
  noah: [
    ['erzaehler', 'Später. Die Bank im Hof. Noah und du. Die Lampions gehen an.'],
    ['noah', 'Am ersten Tag hast du mir einen Platz gerettet.'],
    ['noah', 'Nächstes Jahr halt ich dir einen frei. Jeden Tag.'],
    ['noah', '(gibt dir einen Ohrstöpsel) Playlist heißt „Sommer für {name}“.'],
  ],
  mila: [
    ['erzaehler', 'Später. Mila sitzt auf der Treppe. Der Würfel ist gelöst.'],
    ['mila', 'Ich hab eine Liste gemacht. Menschen, denen ich vertraue.'],
    ['mila', 'Du bist Nummer eins. Die Liste ist kurz. Das ist ein Kompliment.'],
    ['mila', '(gibt dir den Würfel) Für die Ferien. Bring ihn gelöst zurück.'],
  ],
  ben: [
    ['erzaehler', 'Später. Ben zählt Münzen. Ein Euro. Noch ein Euro.'],
    ['ben', 'Ich schulde dir Geld. Seit dem ersten Tag. Weißt du noch?'],
    ['ben', 'Ich zahl in Keksen. Mit Zinsen. Das sind drei Packungen.'],
    ['ben', 'Und nächstes Jahr sitzen wir wieder nebeneinander. Ich hab’s schon beantragt.'],
  ],
  jo: [
    ['erzaehler', 'Später. Der Korb im Hof. Jo wirft dir den Ball zu.'],
    ['jo', 'Eins gegen eins. Und wenn ich verliere, sag ich’s keinem.'],
    ['jo', '… Okay, ich sag’s allen. Weil du’s verdient hast.'],
    ['jo', 'Und danke. Dass du nicht abgehauen bist. Damals.'],
  ],
  keiner: [
    ['erzaehler', 'Später. Lina sitzt allein am Rand. Sie zeichnet.'],
    ['lina', '(zeigt dir das Bild: Gerd die Taube. Mit Sonnenbrille.)'],
    ['lina', 'Gerd sagt: Bis nächstes Jahr. Gerd redet sonst nie.'],
  ],
};

export const tunN10 = (c) => ({
  n10_lucaMehr: () => [
    ['luca', 'Ich hab’s übertrieben. Mit allem.'],
    { wahl: [
      { t: '„Ja. Hast du.“', staerke: 'klar', dann: [['luca', '(nickt) … Ja.']] },
      { t: '„Dann sag das Noah und Mila. Nicht mir.“', staerke: 'klar', herz: { luca: 1 }, merke: 'lucaSorryNoah', dann: [['luca', 'Morgen. Beim Fest. Wenn ich mich trau.']] },
      { t: '„Schon gut.“', dann: [['luca', 'Ist es nicht. Weiß ich selber.']] },
    ] },
    ['erzaehler', 'Verzeihen musst du nicht. Fair bleiben kannst du trotzdem.'],
  ],
  n10_festDario: () => (c.S.merke.darioBegleiten
    ? [['dario', 'Und jemand ist mit mir zu Herrn Kuedes gegangen.'], ['dario', 'Ohne {name} würde ich hier nicht stehen.']]
    : [['dario', 'Ich hab lange gebraucht. Aber jetzt sag ich es. Selbst.']]),
  n10_festLuca: () => (c.S.merke.lucaSorryNoah
    ? [['erzaehler', 'Luca geht zu Noah und Mila. Er guckt auf seine Schuhe.'], ['luca', 'Sorry. Für die Posts. Für alles.'], ['mila', 'Notiert.'], ['noah', '… Okay.']]
    : [['erzaehler', 'Luca steht am Rand. Er sieht zu. Er sagt nichts.']]),
  n10_ende: () => [
    ...ENDEN[bester(c.S) || 'keiner'],
    { szene: 'stempel', def: { modul: 'Modul 9 · Abschluss', titel: 'Ein ganzes Jahr',
      gelernt: ['Ein Jahr geht rauf und runter – beides ist echt', 'Ein Brief an dich: was du behalten willst', 'Stärken genau sagen, nicht nur „nett“', 'Erden: fünf Dinge sehen, ruhig atmen', 'Wiedergutmachen geht in kleinen Schritten'],
      mission: 'In den Ferien: Lies dein Blatt vom Stärken-Rücken. Einmal pro Woche.' }, folgen: {} },
    ['erzaehler', 'Ende der 7ème.'],
    ['ayla', '(Nachricht) nächstes jahr gründen wir eine band. du bist drin. keine widerrede 🎸'],
    { tu: 'kapitelEnde' },
  ],
});
