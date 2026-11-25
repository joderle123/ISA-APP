// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 8 „Nicht echt“, Juni, eine Woche später.
// Verdecktes Thema: Digitale Welt (Fakes, KI, Teilen bremsen, der Feed). Einen Fake erkennt man an Kleinigkeiten,
// wenn man langsam schaut. Jedes Anschauen und jedes Weiterleiten macht ihn größer, auch das gut gemeinte.
// Papier kann man nicht teilen. Und ein Beweis taugt nur, wenn er niemanden bloßstellt, der nichts dafür kann.
// Lösung vom Dezember: Das Foto von 8:34 wurde durch das Türglas gemacht – der grüne Fleck ist das Notausgang-Schild.
import { S8_KI } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' } };

export const SCHRITTE_N8 = [
  { id: 'k8_feed', kap: 8, tag: 'Montag', uhr: 7.83, titel: '1.900', ziel: 'Hof. Mila steht am Eingang.', marker: 'mila',
    start: { teleport: 'eingangHof', gespraech: 'n8_feed' },
    leute: { mila: [0.8, 16.6, 0.4], ben: [2.2, 17.2, -0.4, 'handy'], jo: [3.4, 15.8, -1.2, 'handy'] },
    fertig: { reden: 'mila', gespraech: 'n8_mila' } },
  { id: 'k8_skills', kap: 8, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Echt oder KI?', ziel: 'Aula. An der Wand hängen Fotos. Manche sind gar keine.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n8_skills' } },
  { id: 'k8_cdi', kap: 8, tag: 'Montag', uhr: 12.5, titel: 'Langsam schauen', ziel: 'CDI. Mila hat ihr Handy auf den Tisch gelegt.', marker: 'mila',
    start: { teleport: 'cdi' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n8_cdi' } },
  { id: 'k8_glas', kap: 8, tag: 'Dienstag', uhr: 10.0, titel: 'Das Türglas', ziel: 'Flur vor eurem Saal. Mila wartet an der Tür.', marker: 'mila',
    start: { teleport: 'saal104Tuer' },
    leute: { mila: [-19.6, -15.0, -2.2] },
    fertig: { reden: 'mila', gespraech: 'n8_glas' } },
  { id: 'k8_mappe', kap: 8, tag: 'Mittwoch', uhr: 16.0, titel: 'Die Mappe', ziel: 'Jugendhaus. Chiara hat eine leere Mappe mitgebracht.', marker: 'chiara',
    start: { teleport: 'jugendhaus' },
    leute: { chiara: [15.2, 118.4, -1.2], mila: [13.0, 118.8, 1.0], ben: [12.6, 120.4, 2.2], jo: [15.6, 120.6, -2.2] },
    fertig: { reden: 'chiara', gespraech: 'n8_mappe' } },
  { id: 'k8_sepas', kap: 8, tag: 'Donnerstag', uhr: 14.0, titel: 'Was soll ich damit machen?', ziel: 'SePAS. Die Tür von Herrn Kuedes steht offen.', marker: 'kaya',
    start: { teleport: 'halle', gespraech: 'n8_fach' },
    leute: { kaya: [-12.6, -11.4, 0.6, 'sitzt'], mila: [-10.4, -9.2, -1.6] },
    fertig: { reden: 'kaya', gespraech: 'n8_sepas' } },
  { id: 'k8_tidderich', kap: 8, tag: 'Freitag', uhr: 10.0, titel: 'Vier Sätze', ziel: 'Saal 1.04. Mme Tidderich ist zurück.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n8_tidderich' } },
  { id: 'k8_armband', kap: 8, tag: 'Freitag', uhr: 15.83, titel: '27 Grad', ziel: 'Haltestelle. Dario sitzt auf der Bank.', marker: 'dario',
    start: { teleport: 'eingang' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n8_armband' } },
];

// ---------- Montag 7:50: Wie groß ist es? Jedes Hinschauen füttert den Feed. ----------
const FEED8 = (m) => ({
  titel: 'Dein Feed', mitglieder: 0, dauer: 24,
  nachrichten: [
    { nach: 0.4, system: true, text: 'Das Video. Freitag: 400 Aufrufe. Jetzt: 1.900.' },
    { nach: 2, system: true, text: 'Jo hat es in drei Gruppen gestellt.' },
    { nach: 4, wer: 'unbekannt_31', text: 'ist das eure lehrerin? 💀' },
    { nach: 6, system: true, text: 'Es ist an anderen Schulen angekommen.' },
    ...(m.k7Geteilt ? [{ nach: 8, system: true, text: 'Geteilt: 213. Eine davon bist du.' }] : []),
  ],
  aktionen: [
    { id: 'an1', t: 'Noch mal ansehen', symbol: '▶', setzt: 'n1', sys: 'Du schaust es noch mal. In deinem Feed: drei neue Kopien.' },
    { id: 'an2', t: 'Noch mal ansehen', symbol: '▶', wenn: 'n1', setzt: 'n2', sys: 'Noch mal. Sechs neue Kopien. 2.300 Aufrufe.' },
    { id: 'an3', t: 'Noch mal ansehen', symbol: '▶', wenn: 'n2', setzt: 'n3', sys: 'Dein ganzer Feed ist jetzt das Video.' },
    { id: 'melden', t: 'Melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Gemeldet. „Danke. Wir prüfen das.“' },
  ],
});

// ---------- Montag 12:30: Echt oder KI? Langsam schauen (Spuren-Wand) ----------
const KI = {
  wo: 'CDI · ein Handy auf dem Tisch', helfer: F.mila,
  frage: 'Das Video läuft. Ohne Ton. Mila: „Was stimmt nicht? Langsam.“',
  spuren: [
    { id: 'schrift', sy: '🔤', t: 'Auf dem Plakat hinter ihr steht die Schrift spiegelverkehrt.', kurz: 'Schrift gespiegelt', echt: true,
      kommentar: ['Fakt. Unser Plakat ist nicht gespiegelt.', 'Doch. Schau noch mal. Spiegelverkehrt.'] },
    { id: 'ohrring', sy: '💎', t: 'Ihr Ohrring wechselt die Seite. Erst links. Dann rechts.', kurz: 'Ohrring wandert', echt: true,
      kommentar: ['Fakt. Ohrringe wandern nicht.', 'Doch. Zurückspulen. Links. Dann rechts.'] },
    { id: 'atem', sy: '🌬️', t: 'Zwischen den Sätzen atmet sie nicht.', kurz: 'kein Atem', echt: true,
      kommentar: ['Fakt. Menschen atmen. Die Maschine vergisst das.', 'Doch. Hör hin. Kein Atem.'] },
    { id: 'stimme', sy: '🔊', t: 'Es ist ihre Stimme.', kurz: 'ihre Stimme', echt: false,
      kommentar: ['Raus. Stimmen kann man nachbauen. Das beweist nichts mehr.', 'Eine Stimme ist kein Beweis mehr. Leider.'] },
    { id: 'aufrufe', sy: '👁️', t: 'Fast zweitausend Leute haben es gesehen.', kurz: 'viele Aufrufe', echt: false,
      kommentar: ['Raus. Viele Aufrufe machen nichts echt.', 'Viel ist nicht wahr. Nur viel.'] },
  ],
  frageEnde: 'Und?',
  schluesse: [
    { key: 'fake', t: 'Nicht echt.', braucht: ['ohrring', 'atem'], antwort: 'Das wissen jetzt genau zwei.' },
    { key: 'vielleicht', t: 'Vielleicht doch echt.', braucht: ['stimme'], antwort: 'Dann hat die Maschine gewonnen. Schau noch mal. Langsam.' },
    { key: 'weissnicht', t: 'Ich weiß es nicht.', braucht: [], antwort: 'Dann teil es nicht. Das reicht schon.' },
  ],
};

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


export const GESPRAECHE_N8 = {
  n8_feed: [
    ['erzaehler', 'Montag. 7:50. Alle schauen auf ihre Handys. Dasselbe Video.'],
    { szene: 'chat', id: 'feed8', def: (m) => FEED8(m),
      ausgang: (r, m) => { m.k8Angesehen = r.flags.n3 ? 3 : r.flags.n2 ? 2 : r.flags.n1 ? 1 : 0; if (r.flags.gemeldet) m.k8Gemeldet = true; return 'standard'; }, folgen: { standard: {} } },
    { tu: 'n8_feedFolge' },
    ['erzaehler', 'Mme Tidderich fehlt heute. Vertretung.'],
    ['jemand', 'Sie hat gekündigt. Sicher.'],
  ],
  n8_mila: [
    { tu: 'n8_milaPost' },
    ['mila', 'Schick’s mir nicht. Zeig’s mir. Mittag. CDI.'],
  ],
  n8_skills: [
    ['kaya', 'Wéi geet et? Heute: Was ist echt?'],
    ['kaya', 'Und wer entscheidet, was ihr seht?'],
    // „Quellen-Detektiv“ (statt Fehlersuche im Bild): Man sieht einem Bild oft nicht an, ob es echt ist – aber man kann
    // immer prüfen, woher es kommt, und bremsen. Am Ende: teilen, nicht teilen oder nachfragen.
    ['mesenberg', 'Echt oder KI? Ehrlich: Oft sieht man es nicht.'],
    ['mesenberg', 'Aber man kann prüfen, woher etwas kommt.'],
    ['mesenberg', 'Drei Posts. Ihr seid die Detektive.'],
    ['erzaehler', 'Post 1: „Schule morgen zu! Wasserrohrbruch!“ Konto: @annexe_news2. Seit gestern.'],
    { wahl: [
      { t: '(Woanders nachschauen: Schul-Website, Mme Weber.)', staerke: 'lesen', merke: 'quelleGeprueft', dann: [
        ['erzaehler', 'Schul-Website: nichts. Mme Weber am Telefon: „Wasserrohr? Hier ist alles trocken.“'],
        { wahl: [
          { t: '(Nicht teilen.)', staerke: 'lesen', dann: [['mesenberg', 'Genau. Ein Konto von gestern ist keine Quelle.']] },
          { t: '(Trotzdem teilen. Sicher ist sicher.)', dann: [['mesenberg', 'Dann bleiben morgen fünf Leute zu Hause. Wegen nichts.']] },
        ] }] },
      { t: '(Sofort teilen. Alle sollen es wissen!)', dann: [['mesenberg', 'Schnell geteilt, schnell falsch. Am nächsten Tag war ganz normal Schule.']] },
    ] },
    ['erzaehler', 'Post 2: Gerd die Taube. Mit einer goldenen Krone. Sehr glänzend.'],
    { wahl: [
      { t: '(Teilen – mit dem Satz „bearbeitet, nur Spaß“.)', staerke: 'humor', dann: [['ben', 'Ehrlich UND lustig. Geht also doch.'], ['mesenberg', 'Wer sagt, dass es bearbeitet ist, lügt niemanden an.']] },
      { t: '(Teilen, als wäre es echt.)', dann: [['lina', 'Meine kleine Schwester glaubt jetzt, Gerd ist ein König.'], ['mesenberg', 'Harmlos. Diesmal. Bei Menschen ist es das nicht.']] },
      { t: '(Nicht teilen. Einfach lachen.)', dann: [['mesenberg', 'Auch gut. Nicht alles muss weiter.']] },
    ] },
    ['erzaehler', 'Post 3: Ein Video, 8 Sekunden. „Lehrerin schreit Schüler an!!“ Ohne Anfang. Ohne Ende.'],
    { wahl: [
      { t: '(Erst fragen: Wer hat gefilmt?)', staerke: 'lesen', merke: 'quelleNachgefragt', dann: [
        ['erzaehler', 'Antwort vom Konto: „egal was davor war 😂“.'],
        ['mesenberg', 'Wenn jemand den Anfang nicht zeigen will, gibt es einen Grund.'] ] },
      { t: '(Nicht teilen. Es ist eine echte Person.)', staerke: 'klar', dann: [['mesenberg', 'Genau. Acht Sekunden sind kein Mensch. Und kein Urteil.']] },
      { t: '(Teilen. Die Klasse soll das sehen.)', dann: [['mila', 'Krass ist, dass sie das nie wieder löschen kann.'], ['mesenberg', 'Bremsen heißt: erst fragen, wem es schadet.']] },
    ] },
    ['mesenberg', 'Drei Fragen vor dem Teilen: Wer? Woher? Wem schadet es?'],
    ['mesenberg', 'Fake über euch? BEE SECURE Helpline: 8002 1234. Gratis.'],
    ['kaya', 'Und jetzt euer Feed. Wer bestimmt eigentlich, was ihr seht?'],
    ['ben', 'Ich. Ich drück einfach auf Katzen.'],
    { szene: 'feed', id: 'feed', def: FEED, ausgang: (r) => (r.top === 'drama' ? 'drama' : 'anders'),
      folgen: {
        drama: { merke: 'feedDrama', dann: [['kaya', 'Drama hält uns am längsten fest.'], ['kaya', 'Darum zeigt der Feed so viel davon.'], ['jo', 'Mein Feed ist ein einziger Streit. Echt.']] },
        anders: { merke: 'feedAnders', dann: [['kaya', 'Gut gesteuert. Der Feed folgt dir.'], ['kaya', 'Aber er schubst auch. Merkt euch das.']] },
      } },
    ['kaya', 'Mission: ein Wenn-dann-Satz. „Wenn ich Drama sehe, dann wische ich weiter.“'],
    ['kaya', 'Zum Schluss macht Herr Mesenberg noch etwas zu KI.'],
    { szene: 'skillsStunde', id: 's8_ki', def: S8_KI, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'klar', merke: 's8Ki' }, weiter: { merke: 's8Ki' } } },
    { szene: 'stempel', def: { modul: 'Modul 7 · Digitale Welt', titel: 'Erst bremsen',
      gelernt: ['Echt oder KI? Erst die Quelle prüfen', 'Die Teilen-Bremse: Wer? Echt? Wem schadet es?', 'Der Feed folgt dir – und schubst dich', 'KI: geht klar oder gar nicht', 'Fakes fängt man nicht mit Fakes – Fakten gehören zu Erwachsenen'],
      mission: 'Ein Wenn-dann-Satz für dein Handy. Und einmal bremsen, bevor du teilst.' }, folgen: {} },
  ],
  n8_cdi: [
    ['mila', 'Ein Handy. Ein Tisch. Keine Weiterleitung.'],
    { szene: 'spuren', id: 'ki8', def: KI, ausgang: (r) => r.schluss,
      folgen: {
        fake: { staerke: 'lesen', herz: { mila: 2 }, merke: ['k8Fake', 'spurKi'] },
        vielleicht: { herz: { mila: -1 } },
        weissnicht: { staerke: 'warten', herz: { mila: 1 }, merke: 'k8Gebremst' },
      } },
    { tu: 'n8_cdiFolge' },
    ['erzaehler', 'Auf Milas Display springt die Zahl weiter. 2.600 Aufrufe.'],
    ['erzaehler', 'Die Wahrheit ist langsamer als das Video.'],
  ],
  // Dienstag 10:00: Das Rätsel vom Dezember. Durch das Türglas.
  n8_glas: [
    ['erzaehler', 'Dienstag. 10:00. Du stehst vor eurer Tür. Du schaust durch das schmale Glas.'],
    ['erzaehler', 'Der Saal sieht aus wie auf dem Foto von 8:34.'],
    ['erzaehler', 'Nur dein Platz neben der Tür ist von hier nicht zu sehen.'],
    ['erzaehler', 'Über dir hängt das grüne Notausgang-Schild. Es spiegelt sich im Glas.'],
    { tu: 'n8_gruen' },
    ['mila', 'Es war keiner von uns.'],
    ['mila', 'Jemand stand hier. Im Flur. Um 8:34.'],
    { tu: 'n8_kenanGlas' },
    { wahl: [
      { t: '„Wer hier stand, ist nicht unsere Sache.“', dann: [['mila', 'Vielleicht. Aber was hier passiert ist, schon.']] },
      { t: '„Doch. Es ist unsere Sache.“', dann: [['mila', 'Dann schreiben wir es auf. Nur, was stimmt.']] },
      { t: '„Wir schreiben auf, was wir wissen. Nicht mehr.“', staerke: 'klar', herz: { mila: 1 }, dann: [['mila', 'Genau so.']] },
    ] },
  ],
  // Mittwoch 16:00: Die Mappe. Drei Streits machen drei Regeln. Entscheidung A (Namen) und B (zwei private Dinge).
  n8_mappe: [
    ['erzaehler', 'Mittwoch. 16:00. Jugendhaus. Auf dem Tisch liegt eine leere Mappe.'],
    ['chiara', 'Papier. Kein Handy. Was auf Papier ist, kann keiner weiterleiten.'],
    ['mila', 'Du suchst dir zwei Helfer aus. Mehr Leute, mehr Lecks.'],
    { wahl: [
      { t: 'Ben.', wenn: (m) => !!(true), herz: { ben: 1 }, merke: 'helfer_ben', dann: [] },
      { t: 'Jo.', wenn: (m) => !!(true), herz: { jo: 1 }, merke: 'helfer_jo', dann: [] },
      { t: 'Chiara.', wenn: (m) => !!(true), herz: { chiara: 1 }, merke: 'helfer_chiara', dann: [] },
      { t: 'Noah.', wenn: (m) => !!(m.k7Gesetzt), herz: { noah: 1 }, merke: 'helfer_noah', dann: [] },
      { t: 'Ayla.', wenn: (m) => !!(m.k7Gesetzt), herz: { ayla: 1 }, merke: 'helfer_ayla', dann: [] },
      { t: 'Yusuf.', wenn: (m) => !!(m.k7YusufGehalten), herz: { yusuf: 1 }, merke: 'helfer_yusuf', dann: [] },
    ] },
    ['mila', 'Und wer noch?'],
    { wahl: [
      { t: 'Ben.', wenn: (m) => !!((true) && !m.helfer_ben), herz: { ben: 1 }, merke: 'helfer_ben', dann: [] },
      { t: 'Jo.', wenn: (m) => !!((true) && !m.helfer_jo), herz: { jo: 1 }, merke: 'helfer_jo', dann: [] },
      { t: 'Chiara.', wenn: (m) => !!((true) && !m.helfer_chiara), herz: { chiara: 1 }, merke: 'helfer_chiara', dann: [] },
      { t: 'Noah.', wenn: (m) => !!((m.k7Gesetzt) && !m.helfer_noah), herz: { noah: 1 }, merke: 'helfer_noah', dann: [] },
      { t: 'Ayla.', wenn: (m) => !!((m.k7Gesetzt) && !m.helfer_ayla), herz: { ayla: 1 }, merke: 'helfer_ayla', dann: [] },
      { t: 'Yusuf.', wenn: (m) => !!((m.k7YusufGehalten) && !m.helfer_yusuf), herz: { yusuf: 1 }, merke: 'helfer_yusuf', dann: [] },
    ] },
    { tu: 'n8_helferDa' },
    ['erzaehler', 'Drei Streits. Drei Regeln.'],
    ['jo', 'Ich hab die Zettel aus der Fragen-Box. Die anonymen. Da steht was über Yusuf drin. Das zeigt, wie fies die Ecke ist.'],
    { wahl: [
      { t: '„Nichts Privates. Auch nicht über Yusuf.“', staerke: 'klar', herz: { yusuf: 1 }, dann: [['jo', '… Okay. Fair.']] },
      { t: '„Leg sie rein. Je mehr, desto besser.“', merke: 'k8PrivatGewollt', dann: [['mila', 'Nein. Dann sind wir wie der Account.']] },
    ] },
    { tu: 'n8_regel1' },
    ['ben', 'Wir posten die Mappe einfach. Dann wissen es alle. Zack.'],
    { wahl: [
      { t: '„Kein Pranger. Die Mappe geht zu Erwachsenen.“', staerke: 'klar', dann: [['ben', 'Langweilig. … Aber ja.']] },
      { t: '„Gute Idee. Dann hört es endlich auf.“', dann: [['chiara', 'Dann machen wir genau das, was uns passiert ist.']] },
    ] },
    { tu: 'n8_regel2' },
    ['erzaehler', 'Mila reißt eine Seite aus ihrem Heft.'],
    ['mila', 'Ich hab auch eine Liste gemacht. Alle, die „lowkey“ sagen.'],
    ['mila', 'Das ist ein Gerücht mit Namen. Das kommt nicht rein.'],
    { tu: 'n8_regel3' },
    ['jo', 'Schreib Luca rein. Weiß doch jeder.'],
    { tu: 'n8_kenanWissen' },
    { warum: true, fest: true, wahl: [
      { t: '(Luca reinschreiben. Weiß doch eh jeder.)', merke: 'k8Namen', dann: [['erzaehler', 'Du schreibst „Luca“. Darunter, kleiner: was alle sagen.']] },
      { t: '(Nur das, was wir gesehen haben.)', staerke: 'lesen', herz: { mila: 1 }, merke: 'k8NurBeobachtung', dann: [['erzaehler', 'Uhrzeiten. Orte. Was zu sehen war. Kein „weil“. Kein „bestimmt“.']] },
      { t: '(Gar keine Namen. Zu gefährlich.)', merke: 'k8KeineNamen', dann: [['chiara', 'Dann ist es ein Rätsel ohne Lösung.'], ['mila', 'Dann ist es ehrlich.']] },
    ] },
    { tu: 'n8_namenFolge' },
    ['mila', 'Zwei Dinge gehören nicht uns.'],
    { tu: 'n8_privatJo' },
    { tu: 'n8_privatNummer' },
    { blende: 'Mittwoch · 17:40' },
    ['erzaehler', 'Die anderen sind gegangen. Mila packt die Mappe ein.'],
    ['mila', 'Noch was. Eine Tatsache. Über mich.'],
    ['mila', 'Ich hab am ersten Tag abgestimmt. Bei dir.'],
    ['mila', 'Cringe.'],
    { wahl: [
      { t: '„Danke, dass du es sagst.“', herz: { mila: 2 }, dann: [['mila', 'Fakten statt Gerüchte. Gilt auch für mich.']] },
      { t: '„Ich hab auch abgestimmt. Bei jemand anderem.“', wenn: (m) => !!m.abgestimmt, herz: { mila: 2 }, dann: [['mila', '(fast ein Lächeln) Dann sind wir zwei.']] },
      { t: '(Nicken.)', herz: { mila: 1 }, dann: [] },
    ] },
  ],
  n8_fach: [{ tu: 'n8_blatt' }],
  // Donnerstag 14:00 (Fable, Schlüsselszene K8): die Übergabe
  n8_sepas: [
    ['erzaehler', 'Donnerstag. 14:00. Die Tür vom SePAS steht offen.'],
    ['kaya', 'Kommt rein. Tür auf oder zu?'],
    { wahl: [
      { t: '„Zu.“', dann: [['erzaehler', 'Herr Kuedes macht die Tür zu. Draußen wird es leiser.']] },
      { t: '„Auf.“', dann: [['erzaehler', 'Die Tür bleibt offen. Im Gang lacht jemand. Mila zuckt.']] },
      { t: '(Mila anschauen.)', staerke: 'lesen', dann: [['mila', 'Zu.'], ['erzaehler', 'Herr Kuedes macht die Tür zu. Mila atmet aus.']] },
    ] },
    ['erzaehler', 'Mila legt die Mappe hin. Ihre Hand bleibt darauf.'],
    ['mila', 'Da ist alles drin. Nur Fakten.'],
    ['kaya', 'Darf ich sie aufmachen?'],
    ['mila', '… Ja.'],
    ['erzaehler', 'Er liest. Lange. Draußen quietscht ein Skateboard.'],
    { tu: 'n8_kuedesLiest' },
    ['kaya', 'Das ist viel Arbeit. Und es ist schlimm, was da steht.'],
    ['kaya', 'Was soll ich damit machen? Und was nicht?'],
    { wahl: [
      { t: '„Dass das Video verschwindet.“', dann: [['kaya', 'Das versuche ich. Heute noch.']] },
      { t: '„Dass alle wissen: Ich war’s nicht.“', dann: [['kaya', 'Das dauert. Das sag ich dir ehrlich. Löschen geht schneller als Gerüchte.']] },
      { t: '„Weiß ich nicht.“', dann: [['kaya', 'Das ist okay. Dann fang ich mit dem Video an.']] },
    ] },
    ['mila', 'Und was machen Sie nicht?'],
    ['kaya', 'Ich sag keinem, von wem die Mappe ist.'],
    ['kaya', 'Aber für mich behalten kann ich sie nicht.'],
    ['erzaehler', 'An der Wand hängt ein Zettel. BEE SECURE. 8002 1234.'],
    ['kaya', 'Die helfen beim Löschen. Ich rufe an. Wollt ihr dabei sein?'],
    { wahl: [
      { t: '„Ja.“', staerke: 'hilfe', merke: 'k8Anruf', dann: [['erzaehler', 'Er stellt das Telefon auf laut. Eine ruhige Stimme fragt nach dem Link. Nach sonst nichts.']] },
      { t: '„Nein. Machen Sie.“', dann: [['kaya', 'In Ordnung. Ich sag euch morgen, was rauskommt.']] },
      { t: '„Und der, der es war?“', staerke: 'zuhoeren', merke: 'k8FrageTaeter', dann: [] },
    ] },
    ['kaya', 'Der bekommt auch jemanden zum Reden. Jeder hier.'],
    ['erzaehler', 'Mila nimmt die Hand von der Mappe.'],
  ],
  n8_tidderich: [
    ['erzaehler', 'Freitag. 10:00. Mme Tidderich steht vorne. Sie setzt sich nicht.'],
    ['hoffmann', 'Ich hab das Video gesehen.'],
    ['hoffmann', 'Es hat wehgetan, obwohl ich wusste, dass es falsch ist.'],
    ['hoffmann', 'Ich hab zu spät gesehen, was in dieser Klasse los ist.'],
    ['hoffmann', 'Das tut mir leid.'],
    ['erzaehler', 'Keiner weiß, wohin er schauen soll.'],
    { tu: 'n8_joSorry' },
    ['hoffmann', 'Hefte raus.'],
  ],
  n8_armband: [
    ['erzaehler', 'Freitag. 15:50. Der erste heiße Tag. 27 Grad an der Haltestelle.'],
    ['erzaehler', 'Dario schiebt die Ärmel hoch.'],
    ['erzaehler', 'Am linken Handgelenk: ein geflochtenes Armband.'],
    ['erzaehler', 'Wie auf der Zeichnung.'],
    { tu: 'n8_blick' },
    ['dario', 'Schönes Wochenende.'],
    { tu: 'kapitelEnde' },
  ],
};

export const tunN8 = (c) => ({
  n8_feedFolge: () => {
    const m = c.S.merke, n = m.k8Angesehen || 0;
    return n ? [['erzaehler', n >= 3 ? 'Dreimal angesehen. Dein Feed zeigt dir jetzt nur noch das.' : 'Jedes Mal, wenn du es anschaust, kommen neue Kopien dazu.']] : [];
  },
  n8_milaPost: () => (c.S.merke.milaKommentiert ? [
    ['mila', 'Weißt du noch? Dezember.'],
    ['erzaehler', 'Sie zeigt dir den alten Post. Vierzehn Antworten. Alle unter deinem Satz.'],
    ['mila', 'Du hast es gut gemeint. Es wurde trotzdem größer.'],
  ] : []),
  n8_cdiFolge: () => (c.S.merke.k8Fake ? [['du', 'Nicht echt.'], ['mila', 'Das wissen jetzt genau zwei.']] : [['mila', 'Nicht echt. Schrift, Ohrring, Atem.'], ['mila', 'Das wissen jetzt genau zwei.']]),
  n8_gruen: () => {
    c.ui.toast('<b>🔎 Gelöst</b><span>Das Foto von 8:34 kam durch das Türglas. Der grüne Fleck ist das Notausgang-Schild.</span>', 'ly-t-ent');
    c.S.merke.spurGlas = true;
    return [['erzaehler', c.S.merke.spurGruen ? 'Ein grüner Fleck. Am Rand. Wie auf dem Foto.' : 'Ein grüner Fleck im Glas.']];
  },
  n8_kenanGlas: () => (c.S.merke.kenanGesehen ? [['erzaehler', 'Du weißt noch, wer um 8:31 hier vorbeiging. Kenan. Mit einem gelben Zettel.']] : []),
  n8_helferDa: () => {
    const m = c.S.merke, n = ['ben', 'jo', 'chiara', 'noah', 'ayla', 'yusuf'].filter((id) => m['helfer_' + id]);
    const N = { ben: 'Ben', jo: 'Jo', chiara: 'Chiara', noah: 'Noah', ayla: 'Ayla', yusuf: 'Yusuf' };
    const r = [['erzaehler', 'Am Tisch: Mila, du, ' + n.map((x) => N[x]).join(' und ') + '.']];
    if (!m.helfer_jo) r.push(['erzaehler', 'Jo kommt trotzdem. Er setzt sich an den Rand.']);
    if (!m.helfer_ben) r.push(['erzaehler', 'Ben auch. Mit Keksen.']);
    if (m.helfer_noah) r.push(['noah', 'Ich kann Seiten nummerieren. Das kann ich gut.']);
    return r;
  },
  n8_regel1: () => { c.ui.toast('<b>Regel 1</b><span>Nichts Privates.</span>'); return []; },
  n8_regel2: () => { c.ui.toast('<b>Regel 2</b><span>Kein Pranger.</span>'); return []; },
  n8_regel3: () => { c.ui.toast('<b>Regel 3</b><span>Fakten statt Gerüchte.</span>'); return c.S.merke.k6DateiGepostet ? [['mila', 'Und nichts mehr in den Chat. Wie im Januar. Das war ein Fehler. Von uns allen.']] : []; },
  n8_kenanWissen: () => (c.S.merke.kenanGesehen ? [['erzaehler', 'Und du weißt noch etwas: Kenan ging um 8:31 am Glas vorbei.']] : []),
  n8_namenFolge: () => {
    const m = c.S.merke;
    m.k8KenanDrin = !!(m.kenanGesehen && (m.k8Namen || m.k8NurBeobachtung));
    m.k8LucaDrin = !!m.k8Namen;
    return m.k8LucaDrin ? [['jo', '(grinst) Endlich.'], ['erzaehler', 'Jo hat sein Handy schon in der Hand. Am Abend wissen es zwölf Leute.']] : [];
  },
  // Entscheidung B: zwei private Dinge – vorher fragen, einfach reinlegen oder weglassen
  n8_privatJo: () => {
    const m = c.S.merke;
    if (!(m.k6Datei || m.k6NurMila || m.k6KuedesDatei || m.k6DateiGepostet)) return [];
    return [['mila', 'Erstens: Jos Sprachnachricht.'], { fest: true, wahl: [
      { t: '(Jo vorher fragen.)', staerke: 'einbeziehen', herz: { jo: 2 }, merke: 'k8JoGefragt', dann: [['erzaehler', 'Jo schluckt.'], ['jo', 'Mach. Aber ich will dabei sein, wenn er’s hört.']] },
      { t: '(Einfach reinlegen.)', herz: { jo: -1 }, merke: 'k8JoReingelegt', dann: [['erzaehler', 'Jo sieht es. Er sagt nichts.']] },
      { t: '(Weglassen.)', merke: 'k8JoWeg', dann: [] },
    ] }];
  },
  n8_privatNummer: () => {
    const m = c.S.merke;
    const was = 'die Zeichnung aus deiner Jacke' + (m.nummerScreenshot || m.nummer7Screenshot ? ' und der Screenshot' : '');
    const opt = [
      ...(m.nummerBlockiert ? [] : [{ t: '(Die Nummer vorher fragen.)', staerke: 'einbeziehen', herz: { lina: 2 }, merke: 'k8NummerGefragt', dann: [
        ['erzaehler', 'Du schreibst: „darf ich deine zeichnung in eine mappe legen? für herrn kuedes.“'],
        ['erzaehler', 'Lange nichts. Dann:'],
        ['nummer', 'nein. aber ich geb dir was besseres.'] ] }]),
      { t: '(Einfach reinlegen.)', merke: 'k8NummerReingelegt', dann: [] },
      { t: '(Weglassen.)', merke: 'k8NummerWeg', dann: [] },
    ];
    return [['mila', 'Zweitens: ' + was + '. Von der Nummer.'], { fest: true, wahl: opt }];
  },
  n8_blatt: () => (c.S.merke.k8NummerGefragt ? (() => {
    c.S.merke.spurNovember = true;
    c.ui.toast('<b>🔎 Spur</b><span>Zwei an der Haltestelle. Ein Handy zwischen ihnen. November.</span>', 'ly-t-ent');
    return [['erzaehler', 'Donnerstag. In deinem Fach liegt ein Blatt.'], ['erzaehler', 'Zwei Jungen an der Haltestelle. Von hinten. Ein Handy zwischen ihnen.'], ['erzaehler', 'Unten, klein, ein Datum: 28. November.']];
  })() : []),
  n8_kuedesLiest: () => {
    const m = c.S.merke, r = [];
    if (m.k8LucaDrin) r.push(['kaya', 'Das hier ist beobachtet. Das hier ist vermutet.'], ['erzaehler', 'Er legt ein Blatt zur Seite. Das mit Lucas Namen.'], ['kaya', 'Vermutungen kann ich nicht benutzen. Beobachtungen schon.']);
    r.push((m.k5Kuedes || m.k6KuedesDatei || m.k5Tidderich) ? ['kaya', 'Ich kenn die Vorgeschichte. Seit Januar.'] : ['kaya', 'Das ist alles neu für mich. Seit wann geht das so?']);
    return r;
  },
  n8_joSorry: () => ((c.S.merke.k6JoSelbst || c.S.merke.k6JoVerstanden || c.S.merke.k8JoGefragt) ? [['jo', '(steht auf) Mme Tidderich … ich hab’s in drei Gruppen gestellt. Sorry.'], ['hoffmann', 'Danke, Jo. Angekommen.']] : []),
  n8_blick: () => (c.S.merke.zeichnungDarioGezeigt ? [['erzaehler', 'Er schaut dich dabei an. Er will, dass du es siehst.']] : [['erzaehler', 'Er schaut auf die Straße. Nicht auf dich.']]),
});
