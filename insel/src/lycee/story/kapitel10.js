// Drei Jahre Annexe – 7ème, Kapitel 10 „Abschluss“ (Kurs Jahr 1, Modul 9: Rückblick, Jahres-Kurve, Brief an mich,
// Stärken-Rücken, Erden in fünf Sinnen). Faden @annexe.cam wird aufgelöst: Dario sagt es vor allen, Luca trägt Folgen –
// Verzeihen muss niemand, fair bleiben schon. Vier Enden je nach bester Freundschaft. Ausblick auf die 6ème (die Band).
import { S10_RUECKBLICK } from './skills-j1.js';
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], dario: [-13.56, -61.64, -2.65] };
const FEST = { rantini: [4.5, 19.5, Math.PI], ben: [4, 14, 0.2], jo: [5.2, 15.4, -0.4], ayla: [2.5, 15, 0.3], noah: [7.2, 13.2, -0.6], mila: [3.2, 12.8, 0.1], lina: [1.8, 13.4, 0.4],
  dario: [5.6, 17.6, Math.PI], kaya: [8.6, 17.2, -2.4], hoffmann: [9.4, 15.8, -2], luca: [11.6, 12.4, -1.2] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

export const SCHRITTE_N10 = [
  { id: 'k10_morgen', kap: 10, tag: 'Montag', uhr: 7.45, titel: 'Zurück im Chat', ziel: 'Letzte Schulwoche. Noah wartet an der Haltestelle.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n10_chat' },
    leute: { noah: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n10_noah' } },
  { id: 'k10_skills', kap: 10, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Dein Jahr', ziel: 'Aula. Herr Kuedes hat eine Wäscheleine voller Fotos gespannt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n10_skills' } },
  { id: 'k10_ruecken', kap: 10, tag: 'Mittwoch', uhr: 9.9, neben: 'skills', titel: 'Skills: Stärken-Rücken', ziel: 'Aula. Alle haben ein weißes Blatt auf dem Rücken.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
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

// ---------- Zurück im Klassenchat: die 7P2 gibt sich eigene Chat-Regeln (Abstimmung, eine aus dem Klassenvertrag) ----------
const ZURUECK = (m) => ({
  titel: '7P2 ohne Kamera', mitglieder: 19, dauer: 42,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Mila hat die Gruppe umbenannt: „7P2 ohne Kamera“.' },
    { nach: 1.6, wer: 'Ayla', text: 'besserer name. ich hab abgestimmt 💅' },
    { nach: 3.6, wer: 'Ben', text: 'neuer name. gefällt mir' },
    { nach: 6.6, wer: 'Mila', text: 'Info: @annexe.cam postet seit 9 Tagen nichts. Ich zähle mit.' },
    { nach: 9.6, wer: 'Jo', text: 'neuer name, gleiche leute. sorry nochmal wegen der sprachnachricht', setzt: 'joSorry' },
    { nach: 13, wer: 'Noah', text: 'Bus in 5 Minuten. Platz ist frei. Wie immer.' },
    { nach: 17, wer: 'Lina', text: '(schickt eine Zeichnung: Gerd die Taube mit Partyhut)' },
    { nach: 20, wer: 'Mila', text: 'Vorschlag: Wir geben uns Chat-Regeln. Eine pro Person. Abstimmen unten 👇', setzt: 'abstimmung' },
    { nach: 23, wer: 'Ayla', text: 'meine: keine umfragen über menschen. nie wieder.' },
    { nach: 26, wer: 'Noah', text: 'Meine: Wer Stopp sagt, wird nicht ausgelacht.' },
  ],
  aktionen: [
    { id: 'jo', t: 'Jo antworten', symbol: '💬', wenn: 'joSorry', wahl: [
      { t: '„Schon okay. Du hast es ja nicht gepostet.“', setzt: 'joVerziehen', ich: 'schon okay. du hast es ja nicht gepostet', folgen: [{ nach: 1.6, wer: 'Jo', text: 'trotzdem. war dumm 🫡' }] },
      { t: '„Okay. Aber das war echt nicht cool.“', setzt: 'joEhrlich', ich: 'okay. aber das war echt nicht cool', folgen: [{ nach: 1.6, wer: 'Jo', text: 'weiß ich. deshalb sag ichs ja' }] },
    ] },
    { id: 'regel', t: 'Abstimmen: deine Chat-Regel', symbol: '🗳️', wenn: 'abstimmung', wahl: [
      ...(m.regelPosten ? [{ t: '„Niemand wird ohne Fragen fotografiert.“ (unsere Regel vom ersten Tag)', setzt: 'regelVertrag', ich: 'meine regel: niemand wird ohne fragen fotografiert. stand schon am ersten tag an der tür', folgen: [{ nach: 1.6, wer: 'Mila', text: 'Erster Tag. Du hast dir das gemerkt.' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      ...(m.regelLina ? [{ t: '„Keiner lacht, wenn jemand was falsch sagt.“ (Linas Regel)', setzt: 'regelVertrag', ich: 'meine regel: keiner lacht wenn jemand was falsch sagt. linas regel', folgen: [{ nach: 1.6, wer: 'Lina', text: '🤍' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      ...(m.regelFotos ? [{ t: '„Keine Fotos von Leuten ohne Ja.“ (aus unserem Klassenvertrag)', setzt: 'regelVertrag', ich: 'meine regel: keine fotos von leuten ohne ja. stand schon im klassenvertrag', folgen: [{ nach: 1.6, wer: 'Mila', text: 'Stimmt! September. Du hast dir das gemerkt.' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      ...(m.regelPersoenlich ? [{ t: '„Niemand muss was Persönliches posten.“ (aus unserem Klassenvertrag)', setzt: 'regelVertrag', ich: 'meine regel: niemand muss was persönliches posten. aus dem klassenvertrag', folgen: [{ nach: 1.6, wer: 'Noah', text: 'Danke. Wirklich.' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      ...(m.regelVertraulich ? [{ t: '„Privat bleibt privat. Außer bei Gefahr.“ (aus unserem Klassenvertrag)', setzt: 'regelVertrag', ich: 'meine regel: privat bleibt privat. außer bei gefahr. wie im klassenvertrag', folgen: [{ nach: 1.6, wer: 'Lina', text: '🤍' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      ...(m.regelKekse ? [{ t: '„Jede Woche Kekse. Pflicht.“ (aus unserem Klassenvertrag)', setzt: 'regelKekse2', ich: 'meine regel: jede woche kekse. steht im vertrag. ist gesetz', folgen: [{ nach: 1.4, wer: 'Ben', text: 'endlich 🍪' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] }] : []),
      { t: '„Keine Screenshots von privaten Nachrichten ohne Ja.“', setzt: 'regelScreens', ich: 'meine regel: keine screenshots von privaten nachrichten ohne ja', folgen: [{ nach: 1.6, wer: 'Jo', text: 'ok das trifft mich. aber fair 🫡' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] },
      { t: '„Sprachnachrichten über Leute nur, wenn sie es okay finden.“', setzt: 'regelSprach', ich: 'meine regel: sprachnachrichten über leute nur mit ok', folgen: [{ nach: 1.6, wer: 'Mila', text: 'Notiert. Kommt in die Beschreibung.' }, { nach: 3.4, system: true, text: 'Mila hat die Regeln oben angepinnt. 17 von 19 haben abgestimmt.' }] },
    ] },
    { id: 'hallo', t: 'Hallo sagen', symbol: '👋', setzt: 'hallo', ich: 'hi 👋 danke euch', folgen: [{ nach: 1.4, wer: 'Ben', text: 'da bist du ja 🎉' }] },
    { id: 'weg', t: 'Handy weg, Bus kommt', symbol: '🚌', sys: 'Der Bus kommt. Du lächelst. Ein bisschen.', ende: true },
  ],
});

// ---------- Jahres-Kurve ----------
const KURVE = (m) => ({
  wo: 'Aula · Wäscheleine mit Fotos',
  momente: [
    { sy: '📸', t: 'Erster Tag. Du landest auf @annexe.cam.', dein: m.fotoGesagt ? 'Du hast es Mme Tidderich gesagt. Vor allen.' : m.noahGerettet ? 'Du hast Noah gesagt: Zweimal Hallo ist okay.' : 'Du hast den Tag überstanden. Immerhin.' },
    { sy: '📋', t: 'Die Liste. „Top 5 langweiligste Leute.“', dein: m.noahVerteidigt ? 'Du hast im Chat für Noah geschrieben.' : m.staerkenKonkret ? 'Du hast echte Stärken-Karten verschenkt.' : 'Du hast zugesehen. Und viel gemerkt.' },
    { sy: '🏃', t: 'Sportfest. Und das Foto von Mila.', dein: m.milaGestoppt ? 'Du hast gesagt: Hört auf.' : m.koerperGespuert ? 'Du hast gespürt, wo die Aufregung sitzt.' : 'Ihr wart Letzte. Zusammen.' },
    { sy: '📐', t: 'Mathe-Test mit Puls 140.', dein: m.testSkills ? 'Du hast deinen Skills-Koffer benutzt.' : m.noahAtem ? 'Du hast mit Noah geatmet.' : 'Blackout. Und danach wieder Luft.' },
    { sy: '🖼️', t: 'Der Fake-Screenshot. Alle dachten, du warst es.', dein: m.fakeKuedes ? 'Du bist ruhig zu Herrn Kuedes gegangen.' : m.neuerSatz ? 'Du hast einen neuen Satz für dich gefunden.' : 'Die Gedanken waren laut.' },
    { sy: '✋', t: 'Klassenfoto. Und Luca filmt Mila.', dein: m.stoppKlar ? 'Dein Stopp war klar.' : m.joGehoert ? 'Du hast Jo wirklich zugehört.' : 'Danach: raus aus dem Klassenchat.' },
    { sy: '🧩', t: 'Allein. Wer bleibt?', dein: m.druckNein ? 'Du hast Nein gesagt. Drei gegen dich.' : m.druckJa ? 'Du hast unter Druck Ja gesagt. Und viel nachgedacht.' : m.buehneGekippt ? 'Du hast die Bühne gekippt. Für Noah.' : 'Ben ist geblieben. Sofort.' },
    { sy: '🤖', t: 'Das KI-Video von Mme Tidderich.', dein: m.videoGebremst || m.videoKlartext ? 'Du hast nicht geteilt.' : m.mappeKuedes ? 'Ihr habt eine saubere Beweis-Mappe gemacht.' : 'Die Mappe ging zu Herrn Kuedes.' },
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
      { t: m.buehneGekippt ? 'Du bist in der Kantine sitzen geblieben. Obwohl alle gelacht haben.' : 'Du hältst Plätze frei. Ein ganzes Jahr lang.', konkret: true, antwort: '(liest es) Das kleb ich in mein Buch.' },
      { t: 'Du bist voll nett.', antwort: 'Nett. Okay. Nett ist auch was.' } ] },
    { wer: F.mila, karten: [
      { t: 'Du hast die Spur gefunden. Den Winkel, die Uhrzeit, alles.', konkret: true, antwort: 'Das ist präzise. Das hebe ich auf.' },
      { t: 'Du bist schlau.', antwort: '(nickt) Danke.' } ] },
    { wer: F.ben, karten: [
      { t: 'Du bist geblieben, als alle weg waren. Sofort.', konkret: true, antwort: '(schaut weg) … Danke. Echt.' },
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

export const GESPRAECHE_N10 = {
  n10_chat: [
    ['erzaehler', 'Montag, 7:20. Letzte Schulwoche. Dein Handy vibriert.'],
    { szene: 'chat', id: 'zurueck', def: (m) => ZURUECK(m),
      // Eigene Regel eingebracht? Zählt mehr als Jo (die Gruppe macht ihre Regeln selbst)
      ausgang: (r) => (r.flags.regelVertrag || r.flags.regelScreens || r.flags.regelSprach || r.flags.regelKekse2 ? (r.flags.joVerziehen || r.flags.joEhrlich ? 'beides' : 'regel') : r.flags.joVerziehen ? 'verziehen' : r.flags.joEhrlich ? 'ehrlich' : 'still'),
      folgen: {
        beides: { staerke: 'einbeziehen', herz: { jo: 1, mila: 1 }, merke: ['chatRegel', 'joVerziehen'] },
        regel: { staerke: 'einbeziehen', herz: { mila: 1 }, merke: 'chatRegel' },
        verziehen: { herz: { jo: 1 }, merke: 'joVerziehen' },
        ehrlich: { staerke: 'klar', herz: { jo: 1 }, merke: 'joEhrlich' },
        still: {},
      } },
  ],
  n10_noah: [
    ['noah', 'Letzte Woche. Dann Ferien.'],
    ['noah', 'Weißt du noch? Erster Tag. Die Bank. Meine Jacke drauf.'],
    ['noah', 'Hab so getan, als wär der Platz für wen.'],
    { wahl: [
      { t: '„War er ja auch.“', staerke: 'kontakt', herz: { noah: 1 }, dann: [['noah', '(guckt weg) … Ja. War er.']] },
      { t: '„Für wen denn?“', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [['noah', 'Für irgendwen. Dann kamst du. Passt.']] },
      { t: '(Grinsen. Neben ihn setzen.)', herz: { noah: 1 }, dann: [['noah', '(schiebt dir einen Kopfhörer rüber)']] },
    ] },
    { tu: 'n10_planCheck' },
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
  n10_luca: [
    ['luca', 'Was willst du? Lachen?'],
    { wahl: [
      { t: '„Nein. Nur fragen, wie’s dir geht.“', staerke: 'kontakt', herz: { luca: 1 }, merke: 'lucaGefragt', dann: [
        ['luca', 'Mies. Handy weg bis zu den Ferien. Gespräche mit allen.'],
        ['luca', 'Jetzt lachen manche über mich. Lustig, oder?'],
        { tu: 'n10_lucaMehr' } ] },
      { t: '(Weitergehen. Du musst nicht mit ihm reden.)', staerke: 'klar', merke: 'lucaAbstand', dann: [
        ['erzaehler', 'Luca guckt dir nach. Er sagt nichts.'] ] },
    ] },
  ],
  n10_festStart: [
    ['erzaehler', 'Freitag. Sommerfest. Lampions über dem Hof. Ben verkauft Kekse.'],
    ['ben', 'Ein Euro. Für Freunde zwei. Weil Freunde mehr essen.'],
    ['erzaehler', 'Luca steht bei Frau Kremer am Grill. Ohne Handy.'],
    ['luca', '(probiert) Zu wenig Salz.'],
    ['erzaehler', 'Luca stellt Ben einen Kuchen hin. Ohne Kommentar.'],
    ['luca', 'Zu wenig Zucker. Egal. Nachträglich.'],
    ['kenan', '(leise, im Vorbeigehen) Jos Sprachnachricht an Mila? Die hab ich weitergeleitet. Hab lange überlegt.'],
    ['kenan', 'Sag’s keinem.'],
    ['du', 'Welche Sprachnachricht? Hab nix gehört.'],
  ],
  n10_fest: [
    ['dario', 'Meine Hände zittern. Mein Kopf ist komplett weg.'],
    { wahl: [
      { t: '„Fünf Sachen, die du siehst. Sag sie laut.“', staerke: 'ruhig', herz: { dario: 1 }, dann: [
        ['dario', 'Die Lampions. Der Grill. Ben. Kekse. … Dein Gesicht.'],
        ['dario', 'Okay. Ich bin hier. Ich bin hier.'] ] },
      { t: '„Atmen. Mit mir. Vier rein, vier raus.“', staerke: 'ruhig', herz: { dario: 1 }, dann: [['dario', '(atmet mit dir) … Besser. Ein bisschen.']] },
      { t: '„Du schaffst das.“', dann: [['dario', 'Sagt man so. … Okay.']] },
    ] },
    ['erzaehler', 'Kurz darauf. Saal 1.04. Die 7P2 im Kreis. Dario steht an der Tür.'],
    ['dario', 'Ähm. Hallo. Ich bin Dario. Das wisst ihr.'],
    ['dario', 'Ich hab @annexe.cam angefangen. Im Herbst.'],
    ['dario', 'Ich wollte dazugehören. Dann konnte ich nicht mehr aufhören.'],
    ['dario', 'Es tut mir leid. {name}. Noah. Mila. Allen.'],
    ['dario', 'Und {name} war nie Admin. Der Screenshot war fake.'],
    ['erzaehler', 'Herr Kuedes hat mit der Direktion das Passwort zurückgeholt. Dario darf das Konto selbst löschen.'],
    ['erzaehler', 'Dario hält das Handy hoch. Er tippt. Alle sehen zu.'],
    ['erzaehler', '@annexe.cam – Konto gelöscht.'],
    ['mila', 'Null Beiträge. Ich hab nachgezählt.'],
    { tu: 'n10_festDario' },
    ['dario', 'Ab September mach ich einen Foto-Club. Fotos nur mit Fragen vorher.'],
    ['erzaehler', 'Stille. Drei Sekunden. Sehr lange drei Sekunden.'],
    { wahl: [
      { t: '(Still bleiben. Schauen, was Noah und Mila sagen.)', staerke: 'zuhoeren', herz: { noah: 1, mila: 1 }, dann: [['erzaehler', 'Noah nickt. Mila auch. Sonst nichts. Das reicht.']] },
      { t: '(Dario kurz zunicken.)', herz: { dario: 2 }, merke: 'darioGenickt', dann: [['erzaehler', 'Dario sieht dich. Er atmet aus.']] },
      { t: '„Ich nehm deine Entschuldigung an.“', herz: { dario: 2 }, merke: 'darioAngenommen', dann: [['dario', '… Danke. Echt.']] },
      { t: '„Ich brauch noch Zeit. Heute nicht.“', staerke: 'klar', merke: 'darioZeit', dann: [['dario', 'Okay. Das ist fair.'], ['kaya', '(leise) Beides ist in Ordnung. Verzeihen ist freiwillig.']] },
    ] },
    ['mila', 'Eine Frage, Dario. Wer macht im Foto-Club die Regeln?'],
    ['dario', '… Du? Bitte du.'],
    ['mila', 'Regel eins: erst fragen. Regel zwei: Nein heißt löschen.'],
    ['dario', 'Unterschreib ich.'],
    ['kaya', '(stellt Kekse in die Mitte) Für alle. Laut Statistik reichen sie nie.'],
    ['hoffmann', 'Ça va? … Ich hab mit Luca gesprochen. Lange.'],
    ['hoffmann', 'Das Video ist weg. Und ich bin noch da.'],
    ['hoffmann', 'Dario, das war mutig. Wieder gut machen dauert aber noch.'],
    { tu: 'n10_festLuca' },
    ['lina', '(gibt dir ein Heft: „Gerd ermittelt. Fall gelöst.“)'],
    ['rantini', 'Klassenfoto. Teil zwei. Alle rücken zusammen.'],
    ['noah', 'Diesmal frag ich vorher. Darf ich den Arm auf deine Schulter?'],
    { wahl: [
      { t: '„Ja. Klar.“', herz: { noah: 1 }, merke: 'fotoArm', dann: [['noah', '(legt den Arm ganz leicht auf deine Schulter)']] },
      { t: '„Lieber nebeneinander.“', staerke: 'klar', herz: { noah: 1 }, merke: 'fotoNeben', dann: [['noah', 'Okay. Nebeneinander ist auch zusammen.']] },
    ] },
    ['rantini', 'Drei, zwei, eins … Käsebrötchen!'],
    ['ben', 'Wer sagt denn Käsebrötchen?!'],
    ['erzaehler', 'Klick. Auf dem Foto lachen alle. Sogar Lina. Sogar du.'],
    // Jugendwelt heute: Wer darf ein Foto posten, auf dem andere sind? Fragen – am Ende des Jahres ganz selbstverständlich.
    ['ben', '(hat das Handy schon draußen) Das kommt in meine Story. Sofort.'],
    ['mila', '(guckt aufs Foto) Ich will in keine Story. Nicht nach diesem Jahr.'],
    { wahl: [
      { t: '„Ben, frag erst alle. Wer nicht will, kriegt einen Sticker.“', staerke: 'klar', herz: { mila: 2, ben: 1 }, merke: 'fotoZustimmung', dann: [
        ['ben', '(fragt rum. Drei wollen nicht.) Okay. Drei Gerd-Sticker.'], ['mila', '(lacht) Ich bin eine Taube. Perfekt.']] },
      { t: '„Nur ins Klassen-Album. Nicht öffentlich.“', staerke: 'abstand', herz: { mila: 1 }, merke: 'fotoZustimmung', dann: [['ben', 'Album. Für uns. Auch gut.']] },
      { t: '„Ist doch ein schönes Foto. Poste es.“', merke: 'fotoOhneFrage', dann: [
        ['erzaehler', 'Mila geht ein Stück weg.'], ['ben', '(steckt das Handy ein) … Nee.'], ['ben', 'Mila guckt schon so. Lass mal.']] },
    ] },
    { tu: 'n10_ende' },
  ],
};

const bester = (S) => {
  const h = S.herz || {};
  const id = ['noah', 'mila', 'ben', 'jo'].sort((a, b) => (h[b] || 0) - (h[a] || 0))[0];
  return (h[id] || 0) >= 2 ? id : null;
};

// Enden als Funktionen: frühere Entscheidungen tauchen sichtbar auf (Kritik Inhalt Runde 1)
const ENDEN = {
  noah: (m) => [
    ['erzaehler', 'Später. Noah öffnet seinen Spind. Er winkt dich her.'],
    ['erzaehler', 'Innen klebt das Klassenfoto. Das erste Ding in seinem Spind.'],
    ['noah', m.noahVerteidigt ? 'Die Top-5-Liste. Du hast für mich geschrieben. Ich hab’s gespeichert.' : 'Erster Tag. Du hast zurückgegrüßt. Das war genug.'],
    ['noah', 'Nächstes Jahr: Bus, dritte Reihe. Ich halt dir den Platz frei.'],
    ['noah', '(gibt dir einen Kopfhörer) Playlist heißt „Sommer für {name}“.'],
  ],
  mila: (m) => [
    ['erzaehler', 'Später. Mila sitzt auf der Treppe. Der Würfel ist gelöst.'],
    ['mila', 'Ich hab eine Liste gemacht. Menschen, denen ich vertraue.'],
    ['mila', 'Du bist Nummer eins. Die Liste ist kurz. Das ist ein Kompliment.'],
    ['mila', m.stoppKlar ? 'Dein Stopp im CDI. Das vergess ich nicht.' : 'Foto-Club. Ich mach die Regeln. Du testest sie.'],
    ['mila', '(verdreht ihn dreimal, gibt ihn dir) Für die Ferien. Gelöst zurück.'],
    ['mila', 'Neuer Rekord übrigens: 29 Sekunden. Du bist Zeuge.'],
  ],
  ben: (m, S = {}) => [
    ['erzaehler', 'Später. Ben zählt die Keks-Kasse. Es ist mehr als gedacht.'],
    ['ben', m.benGefragt ? 'Du hast mir was zum Geburtstag mitgebracht. Keiner bringt mir was mit.' : 'Bester Geburtstag. Der Account war weg. Und Kekse.'],
    ['ben', (S.benSchuld || 0) > (S.benZurueck || 0) ? 'Ich schulde dir noch Geld. Ich zahl in Keksen.' : 'Am ersten Tag hab ich dein Foto weitergeschickt. Ab jetzt frag ich immer. Versprochen.'],
    ['ben', 'Nächstes Jahr wieder nebeneinander. Hab schon gefragt.'],
  ],
  jo: (m) => [
    ['erzaehler', 'Später. Der Korb im Hof. Jo wirft dir den Ball zu.'],
    ['jo', 'Eins gegen eins. Und wenn ich verliere, sag ich’s keinem.'],
    ['jo', '… Okay, ich sag’s allen. Weil du’s verdient hast.'],
    ['jo', m.treppeFrueh ? 'Am Korb hast du mich rausgeholt. Bei 80. Danke.' : m.treppeKnall ? 'Am Korb hast du zugeguckt. Ich war sauer. Bin ich nicht mehr.' : 'Die Sprachnachricht. Du bist trotzdem geblieben. Danke.'],
  ],
  keiner: () => [
    ['erzaehler', 'Später. Lina setzt sich neben dich. Sie zeichnet.'],
    ['lina', '(flüstert) Im Comic bist du jetzt Hauptfigur. Ab Seite 40.'],
    ['lina', 'Nicht reingucken. Erst nächstes Jahr.'],
  ],
};

export const tunN10 = (c) => ({
  // Kap. 9: Hat der Wenn-dann-Plan gehalten? Ehrlich sein darf man – Pläne wackeln, man passt sie an.
  n10_planCheck: () => {
    const m = c.S.merke; const plan = m.planSchlaf ? 'schlaf' : m.planPause ? 'pause' : m.planEssen ? 'essen' : null;
    if (!plan) return [];
    const frage = { schlaf: ['noah', 'Und? Handy in der Küche? Du siehst ausgeschlafen aus. Bisschen.'], pause: ['noah', 'Ben sagt, du warst jede Pause am Korb. Fast jede.'], essen: ['noah', '(hält ein halbes Brötchen hoch) Hab’s versprochen. Hat dein Plan gehalten?'] }[plan];
    return [frage, { wahl: [
      { t: '„Meistens. Vier von fünf Tagen.“', staerke: 'ruhig', merke: 'planGehalten', dann: [['noah', 'Vier von fünf ist super. Ehrlich.']] },
      { t: '„Nö. Zwei Tage. Dann vergessen.“', merke: 'planGewackelt', dann: m.planHindernisVergessen
        ? [['noah', 'Du hast gesagt, du vergisst es. Hast du recht gehabt.'], ['noah', 'Soll ich dich erinnern? Ich bin gut im Nerven.']]
        : [['noah', 'Zwei ist mehr als null. Neuer Versuch nach den Ferien?']] },
      { t: '„Ich hab ihn geändert. Der alte war zu groß.“', staerke: 'lesen', merke: 'planAngepasst', dann: [['noah', 'Plan ändern ist auch Plan. Sagt Herr Kuedes, glaub ich.']] },
    ] }];
  },
  n10_lucaMehr: () => [
    ['luca', 'Ich hab’s übertrieben. Mit allem.'],
    { wahl: [
      { t: '„Ja. Hast du.“', staerke: 'klar', dann: [['luca', '(nickt) … Ja.']] },
      { t: '„Dann sag das Noah und Mila. Nicht mir.“', staerke: 'klar', herz: { luca: 1 }, merke: 'lucaSorryNoah', dann: [['luca', 'Morgen. Beim Fest. Wenn ich mich trau.']] },
      { t: '„Schon gut.“', dann: [['luca', 'Ist es nicht. Weiß ich selber.']] },
      { t: '„Auslachen ist auch bei dir nicht okay. Sag’s Herrn Kuedes.“', staerke: 'hilfe', herz: { luca: 1 }, dann: [['luca', '(guckt hoch) … Okay. Mach ich.']] },
    ] },
  ],
  n10_festDario: () => (c.S.merke.darioBegleiten
    ? [['dario', 'Und jemand ist mit mir zu Herrn Kuedes gegangen.'], ['dario', '{name}. Sonst wär ich heute zu Hause geblieben.']]
    : [['dario', 'Ich hab lange gebraucht. Aber jetzt sag ich es. Selbst.']]),
  n10_festLuca: () => (c.S.merke.lucaSorryNoah
    ? [['erzaehler', 'Luca geht zu Noah und Mila. Er guckt auf seine Schuhe.'], ['luca', 'Sorry. Für die Posts. Für alles.'], ['mila', 'Notiert.'], ['noah', '… Okay.'], ['luca', 'Und {name}: der Admin-Fake. War ich. Das war das Mieseste von allem.']]
    : [['erzaehler', 'Luca steht am Rand. Er sieht zu. Er sagt nichts.']]),
  n10_ende: () => [
    ...ENDEN[bester(c.S) || 'keiner'](c.S.merke || {}, c.S),
    ['erzaehler', 'Ende der 7ème.'],
    ['ayla', '(Nachricht) nächstes jahr gründen wir eine band. du bist drin. keine widerrede 🎸'],
    ['ayla', '(Nachricht) bandname: „Kein WLAN“ oder „Gerd und die Zombies“?'],
    { tu: 'kapitelEnde' },
  ],
});
