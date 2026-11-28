// Storyline 7e „@annexe.cam“ – Kapitel 5 „Admin“, Januar, erste Woche nach den Ferien (Gesamtkonzept K5, Entwurf v2 nach Fach- und Jugend-Panel).
// Verdecktes Thema: Heft #04 „Gedanken“. Kernsatz: Ein Gedanke fühlt sich an wie eine Tatsache. Prüf, was eine Kamera sieht.
// Werkzeug: 📷 Kamera-Check (mechanik5.js: Kopf-Blase, Zurückspulen; Suchbild mit „Echt“-Zeile, Gerd als Bonus, Wackeln auf Rot).
// Regeln: Erst „echt“ (auch wenn es schlimm ist), dann der Kopf. Eine Kamera sieht Verhalten, keine Gedanken. Vorhersagen prüft keine Kamera –
// dafür: kleiner Schritt, dann schauen (Eisbahn, „Beweis Nummer eins“). Hilfe liegt nie hinter einem Gedanken. Der Admin wird hier NICHT gefunden.
// Fäden aus K1–K4: Darios „zu viel“ · Chiaras Versprechen · Mme Lenning „wir zwei“ · Noah unter Verdacht · Jos leeres Blatt · das Foto von 8:34
// (zweite Chance: grünes Schild im Glas) · Kenan am Glas · Yusufs Bruder · Manon am Rand. Cliffhanger: Dario will dir Montag Jos Sprachnachricht zeigen (K6).
import { S5_GEDANKEN, S5_SCHAM_SCHULD } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1), manon: pult(2, 0, 1) };
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
// Lesesaal (Nordflügel): Lesetische bei x 9/19, z −59,5/−64,5 – Stühle davor (Blick +z) und dahinter (Blick −z)
const LESESAAL = { ayla: [6.8, -60.65, 0, 'sitzt'], chiara: [11.15, -60.65, 0, 'sitzt'], mila: [8.25, -58.35, Math.PI, 'sitzt'], lina: [9.7, -63.35, Math.PI, 'sitzt'],
  jo: [17.8, -60.65, 0, 'sitzt'], ben: [19.25, -58.35, Math.PI, 'sitzt'], noah: [20.7, -58.35, Math.PI, 'sitzt'], yusuf: [16.35, -58.35, Math.PI, 'sitzt'] };
const MILA = { id: 'mila', name: 'Mila', farbe: '#2fb8a8' };
const BOHNEN = {
  wo: 'Aula · anonym',
  saetze: ['Ich bin nicht gut genug.', 'Die anderen sind besser.', 'Mich mag eh keiner.', 'Ich darf keine Fehler machen.', 'Ich bin zu viel.', 'Ich schaff das nie.'],
  klasse: [7, 9, 4, 8, 3, 6],
};
export const ORTE_N5 = { eisbahn: { x: 40.2, z: 118.8, yaw: Math.PI / 2 } };
// Wen trifft der Verdacht? Wer in K4 explodiert ist oder mit Worten zurückgeschlagen hat (gefilmt), steht oben in der Umfrage. Sonst Noah.
export const zielDu5 = (m) => (m.k5ZielDu != null ? !!m.k5ZielDu : ['explodiert', 'worte', 'atmenWorte'].includes(m.k4HochTat) || !!m.k4Explodiert);
const chiaraSicher = (m) => !!(m.chiaraGestaerkt || m.chiaraFuesse || m.k4SpaeterAbgefragt || m.k5ChiaraVersprechen || m.k5ChiaraHof);
const beweisDa5 = (m) => !!(m.k5Schild || m.spurGruen);
// Blick von der Tür in Saal 1.04 (beide Durchläufe gleich – anders sind nur dein Blick und dein Tun)
const TUER_BODEN = { von: [-20.7, 1.55, -17.9], auf: [-20.7, 0.0, -19.3], fov: 50 };
const TUER_KLASSE = { von: [-20.6, 1.62, -18.0], auf: [-20.3, 0.95, -24.0], fov: 72 };   // ein Schritt hinter der Tür: der Türflügel verdeckt nichts

// Stille Post (Mittwoch): ein gesehener Satz wird in vier Screenshots zum „Beweis“. Wo kommt zuerst etwas dazu, das keiner gesehen hat? (bei Lou)
const STILLE_POST = (m) => { const w = zielDu5(m) ? '{name}' : 'noah';
  return [{ wer: 'Lina · Mo', t: w + ' war um halb neun auf dem gang. hab ich gesehen' }, { wer: 'Lou · Mo', t: w + ' war beim foto draußen' },
    { wer: 'Pit · Di', t: w + ' hat das foto gemacht' }, { wer: 'Jo · Mi', t: w + ' ist der admin. sicher.' }]; };
// Die zwei Spuren auf dem Foto von 8:34 (K4): grünes Schild im Glas (= draußen), Papier vor der Linse. Der Kopf beweist nichts.
const SPUREN834 = (m) => [
  ...(m.spurGruen || m.k5Schild ? [] : [{ id: 'gruen', x: 0.865, y: 0.095, r: 0.08, t: 'Grünes Licht im Glas: das Notausgang-Schild im Gang.', kurz: 'Grün im Glas: der Gang.' }]),
  ...(m.k5Papier ? [] : [{ id: 'streifen', x: 0.1, y: 0.8, r: 0.1, t: 'Ein heller Rand unten links. Papier – direkt vor der Linse.', kurz: 'Papier vor der Linse.' }]),
  { id: 'kopf', x: 0.5, y: 0.5, r: 0.09, richtig: false, t: 'Ein Kopf. Das sagt nichts darüber, wer fotografiert hat.' },
];
const spurenMerken = (r, m) => { const g = r.gefunden || []; if (g.includes('gruen') || m.spurGruen) m.k5Schild = true; if (g.includes('streifen')) m.k5Papier = true; };
const spurenFertig = (m) => !!(m.k5Schild && m.k5Papier);

export const SCHRITTE_N5 = [
  // 1 · Montag 7:25: Schnee. Darios Platz ist leer. Die Ferien-Umfrage. Gerd und der erste, geführte Kamera-Check.
  { id: 'k5_morgen', kap: 5, tag: 'Montag', uhr: 7.42, titel: 'Die leere Bank', ziel: 'Haltestelle. Schnee. Darios Platz ist leer.', marker: null,
    start: { teleport: 'busAnkunft', gespraech: 'n5_bank' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { nachStart: true } },
  // 2 · Montag 7:58: Vor Saal 1.04. Erster Gedanke von selbst, ⏪ zurückspulen, ein anderer. Kamera-Check: Wer schaut wirklich?
  { id: 'k5_saal', kap: 5, tag: 'Montag', uhr: 7.97, titel: 'Die Tür', ziel: 'Saal 1.04. Drinnen ist es laut.', marker: null,
    start: { teleport: 'saal104Tuer', gespraech: 'n5_tuer' },
    // Jo und Mila drehen sich zur Tür (sie schauen wirklich), Ben hat das Handy in der Hand – alle anderen schauen nach vorn
    leute: { ...KLASSE, jo: [KLASSE.jo[0], KLASSE.jo[1], -0.56, 'sitzt'], mila: [KLASSE.mila[0], KLASSE.mila[1], -0.26, 'sitzt'], hoffmann: [-27, -24, Math.PI / 2] },
    fertig: { nachStart: true } },
  // 3 · Montag 8:05: Culture générale, Mme Rantini: Was ein Foto verrät (Ausschnitt, Taube-Test, das Foto von 8:34, Bürgerkunde)
  { id: 'k5_cg', kap: 5, tag: 'Montag', uhr: 8.08, titel: 'Was ein Foto verrät', ziel: 'Culture générale bei Mme Rantini.', marker: null,
    start: { teleport: 'saal104Tuer', gespraech: 'n5_cg' },
    leute: { ...KLASSE, rantini: [-27, -24, Math.PI / 2] },
    fertig: { nachStart: true } },
  // 4 · Montag 9:50: Pause im Schnee = ein Ort. „Admin!“ – Chiara tippt – Jo und der Schneemann – Manon.
  { id: 'k5_hof', kap: 5, tag: 'Montag', uhr: 9.83, titel: 'Admin!', ziel: 'Pause. Schnee. Irgendwo ruft jemand „Admin!“.', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n5_hofStart' },
    leute: { noah: [-2.6, 13.0, 2.0], ben: [1.0, 15.4, -2.2, 'redet'], luca: [2.6, 16.2, -2.4], chiara: [-6.0, 10.8, 0.6, 'handy'], jo: [11.2, 19.6, 0.9, 'handy'],
      manon: [-4.4, 11.6, -0.6], mila: [-14.4, 12.2, 1.2, 'sitzt'], sabli: [0.4, 4.6, Math.PI] },
    fertig: { nachStart: true } },
  // 5 · Mittwoch 12:30: CDI. Milas Tablet: 📷 Kamera oder 📢 laut?
  { id: 'k5_cdi', kap: 5, tag: 'Mittwoch', uhr: 12.5, titel: 'Laut oder echt', ziel: 'CDI. Mila winkt dich an ihren Tisch.', marker: 'mila',
    start: { teleport: 'cdi' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n5_cdi' } },
  // 6 · Mittwoch 13:30: Lesesaal. Die Abstimmung im Klassenchat (Hauptszene). Danach 20 Sekunden durch Chiaras Augen.
  { id: 'k5_abstimmung', kap: 5, tag: 'Mittwoch', uhr: 13.5, titel: 'Die Abstimmung', ziel: 'Lesesaal. Freistunde. Alle Handys summen.', marker: null,
    start: { teleport: 'lesesaal', gespraech: 'n5_abstimmung' },
    leute: { ...LESESAAL, kaya: [13.0, -51.2, 0], hoffmann: [15.2, -51.2, 0] },   // beide im Gang – sie kommen erst rein, wenn es passt
    fertig: { nachStart: true } },
  // Donnerstag (freiwillig, Skills-Kurs): Gedanken prüfen
  { id: 'k5_skills', kap: 5, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Was ich über mich denke', ziel: 'Aula. Herr Kuedes hat Karten mit Sätzen ausgelegt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n5_skills' } },
  // 7 · Freitag 16:00: Eisbahn auf dem Marktplatz. Loslassen, Rennen gegen Yusuf, wer am Rand steht.
  { id: 'k5_eis', kap: 5, tag: 'Freitag', uhr: 16.0, titel: 'Eisbahn', ziel: 'Marktplatz. Die Eisbahn leuchtet.', marker: null,
    start: { teleport: 'eisbahn', gespraech: 'n5_eis' },
    leute: { ayla: [43.2, 117.6, -1.6], yusuf: [43.4, 119.9, -1.4], noah: [47.2, 123.9, Math.PI], manon: [40.8, 116.3, 0.8] },
    fertig: { nachStart: true } },
  // 8 · Freitag 17:00: Haltestelle. Darios Sicht von gegenüber. Busfenster: der neue Satz. Jos Sprachnachricht.
  { id: 'k5_freitag', kap: 5, tag: 'Freitag', uhr: 17.0, titel: 'Der neue Satz', ziel: 'Haltestelle. Es wird dunkel. Gegenüber steht jemand.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n5_freitagStart' },
    leute: { dario: [-19.0, 48.6, Math.PI], noah: [-22.0, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n5_freitag' } },
];

// ---------- Die Abstimmung im Klassenchat (Hauptszene) ----------
// Stimmen kommen einzeln, mit Namen. Bei 8,5 s hält der Chat: die Kopf-Blase (von selbst). 📷 = Kamera-Check: echt – Zahlen – eine ungelesene Nachricht (Ayla).
// Immer vier Knöpfe (Hilfe liegt nie hinter einem Gedanken): ✍️ Schreiben · 💬 Privat · 🙋 Herr Kuedes · 🚪 Raus. Beim Wählen steht die Zeit.
const UMFRAGE = (m) => {
  const du = zielDu5(m), sicher = chiaraSicher(m), beweis = beweisDa5(m);
  const beendet = [{ wer: 'Chiara', text: 'herr kuedes steht in der tür 😳', nach: 4.5 }, { system: 'Chiara hat die Umfrage beendet.', nach: 5.5 }];
  return {
    titel: '7P2 🏫', mitglieder: 19, gesehenMax: 9, dauer: 25, wahlHaelt: true,
    info: 'Die Stimmen kommen nach und nach. Du kannst jederzeit etwas tun.',
    nachrichten: [
      { wer: 'Chiara', umfrage: { frage: du ? 'wer glaubt, es ist {name}?' : 'wer glaubt, es ist noah?', optionen: [{ id: 'ja', t: 'Ja' }, { id: 'nein', t: 'Nein' }, { id: 'weiss', t: 'Weiß nicht' }] }, nach: 0.4 },
      { stimme: { opt: m.k5Schneemann ? 'weiss' : 'ja', wer: 'Jo' }, nach: 2 },
      { wer: 'Jo', text: m.k5Schneemann ? 'keine ahnung ehrlich' : 'endlich fragt mal wer 😂', nach: 2.6 },
      { stimme: { opt: m.k5LouGefragt ? 'weiss' : 'ja', wer: 'Lou' }, nach: 4.4 },
      { stimme: { opt: 'weiss', wer: 'Lina' }, nach: 5.4 },
      { stimme: { opt: m.k5BenGefragt ? 'weiss' : 'ja', wer: 'Ben' }, nach: 6.4 },
      { stimme: { opt: 'nein', wer: 'Mila' }, nach: 7.2 },
      { stimme: { opt: 'ja', wer: 'Tim' }, nach: 11, wennNicht: 'zu' },
      { wer: 'Lou', text: m.k5LouGefragt ? 'hab’s nur gehört. weiß nicht' : m.k5LouKlar ? '{name} sagt das auch 😎' : du ? 'hinten links. sag ich nur 👀' : 'noah war doch um halb neun draußen', nach: 12.2, wennNicht: 'zu' },
      ...(m.k5TuerMal ? [{ wer: 'Jo', text: 'der mit der lauten tasche heute 😂', nach: 9.8, wennNicht: 'zu' }] : []),
      ...(m.k5NoahLasst && !du ? [{ wer: 'Jo', text: '{name} = admin-freund 👀', nach: 13.2, wennNicht: 'zu' }] : []),
      { stimme: { opt: 'weiss', wer: 'Yusuf' }, nach: 14, wennNicht: 'zu' },
      { system: 'Umfrage beendet. Ja: die meisten Stimmen.', nach: 21, wennNicht: 'zu', setzt: 'beendet' },
      { system: du ? 'Chiara hat dich aus der Gruppe entfernt.' : 'Chiara hat Noah aus der Gruppe entfernt.', nach: 22, wennNicht: 'zu', setzt: 'raus' },
    ],
    blase: { ab: 8.5, t: du ? 'Alle sind gegen mich.' : 'Alle glauben’s.', echt: du ? 'Eine Umfrage über dich. Nicht okay.' : 'Eine Umfrage über Noah. Nicht okay.',
      kopf: 'Gesehen ist nicht gestimmt.', ungelesen: { wer: 'Ayla', t: 'bin nicht dafür. weiß nicht was schreiben.', setzt: 'ayla' } },
    aktionen: [
      { id: 'schreiben', symbol: '✍️', t: 'Schreiben', wahl: [
        { t: du ? '„Ich war’s nicht.“' : '„Noah war’s nicht.“', ich: du ? 'ich war’s nicht.' : 'noah war’s nicht.', setzt: 'verteidigt',
          folgen: [{ wer: 'Jo', text: 'wer sich verteidigt … 👀', nach: 1.2 }, { stimme: { opt: 'ja', wer: 'Pit' }, nach: 2 }, { stimme: { opt: 'ja', wer: 'Elena' }, nach: 2.8 }, { stimme: { opt: 'ja', wer: 'Tom' }, nach: 3.6 }] },
        ...(du ? [] : [{ t: '🗳 „Nein“ drücken.', setzt: 'nein', folgen: [{ stimme: { opt: 'nein', wer: '{name}' }, nach: 0.1 }, { wer: 'Jo', text: '{name}?? 👀', nach: 1.4 }] }]),
        { t: '🤝 „Ayla und ich: Nein.“', wenn: 'ayla', ich: 'ayla und ich: nein.', setzt: ['zuZweit', 'zu'],
          folgen: [...(du ? [] : [{ stimme: { opt: 'nein', wer: '{name}' }, nach: 0.1 }]), { stimme: { opt: 'nein', wer: 'Ayla' }, nach: 0.8 }, { wer: 'Ayla', text: 'ja. nein.', nach: 1.2 },
            { stimme: { opt: 'nein', wer: 'Manon' }, nach: 2.2 }, { stimme: { opt: 'nein', wer: 'Yusuf' }, nach: 3 }, { wer: 'Chiara', text: 'okay. vergesst es.', nach: 4.4 }, { system: 'Chiara hat die Umfrage beendet.', nach: 5 }] },
        ...(beweis ? [{ t: '📎 Beweis posten.', setzt: ['gepostet', 'zu'], ich: 'das foto von 8:34 ist von draußen. grünes schild im glas. 📎',
          folgen: [{ stimme: { opt: 'nein', wer: 'Manon' }, nach: 1 }, { stimme: { opt: 'nein', wer: 'Ayla' }, nach: 1.6 }, { stimme: { opt: 'nein', wer: 'Yusuf' }, nach: 2.2 }, { stimme: { opt: 'nein', wer: 'Sara' }, nach: 2.8 },
            { wer: du ? 'Mila' : 'Noah', text: du ? '👍 sag ich doch' : 'danke.', nach: 3.4 }, { system: 'Chiara hat die Umfrage beendet.', nach: 4.4 },
            { wer: 'Jo', text: 'wer war dann draußen?? 🤔', nach: 6, setzt: 'draussen' }, { wer: 'Lou', text: 'kenan aus der 7P1 stand am glas. hab ich gehört', nach: 7.4 },
            { wer: 'Jo', text: 'KENAN 👀👀', nach: 17.5, wennNicht: 'kenanSicher' }, { system: 'Jo hat ein Foto von Kenan geteilt.', nach: 18.4, wennNicht: 'kenanSicher', setzt: 'kenanGejagt' }] }] : []),
      ] },
      // Nach „Beweis posten“: zehn Sekunden, bevor es den Nächsten trifft
      { id: 'kenan', symbol: '🙋', t: 'Schnell: an Herrn Kuedes', wenn: 'draussen', wennNicht: 'kenanSicher', setzt: 'kenanSicher', sys: 'Screenshot an Herrn Kuedes geschickt.',
        folgen: [{ system: 'Herr Kuedes: „Hab’s. Ich kümmere mich. Postet nichts mehr dazu.“', nach: 2 }] },
      { id: 'privat', symbol: '💬', t: 'Privat', wahl: [
        ...(du ? [] : [{ t: 'Noah: „Ich glaub dir.“', setzt: 'noahGeglaubt', sys: 'Privat an Noah: „ich glaub dir.“', folgen: [{ system: '💬 Noah (privat): danke. echt.', nach: 2.5 }] }]),
        { t: 'Chiara: „Stopp das.“', setzt: sicher ? ['chiaraStopp', 'zu'] : 'chiaraNein', sys: 'Privat an Chiara: „stopp das. bitte.“',
          folgen: sicher ? [{ system: '💬 Chiara (privat): ok.', nach: 2.5 }, { system: 'Chiara hat die Umfrage beendet.', nach: 4 }] : [{ system: '💬 Chiara (privat): kann nicht. sonst bin ich dran.', nach: 3 }] },
        { t: 'Ayla: „Danke.“', wenn: 'ayla', setzt: 'aylaDanke', sys: 'Privat an Ayla: „danke.“', folgen: [{ system: '💬 Ayla (privat): 🫶', nach: 2 }] },
      ] },
      { id: 'kuedes', symbol: '🙋', t: 'Herr Kuedes', wahl: [
        { t: '📸 Screenshot schicken.', setzt: ['kuedes', 'zu'], sys: 'Screenshot an Herrn Kuedes geschickt.', folgen: [{ system: 'Herr Kuedes: „Danke. Bin gleich da.“', nach: 2 }, ...beendet] },
        ...(beweis ? [{ t: '📎 Spuren schicken.', setzt: ['kuedes', 'kuedesSpuren', 'zu'], sys: 'Spuren an Herrn Kuedes geschickt.', folgen: [{ system: 'Herr Kuedes: „Gut hingeschaut. Bin gleich da.“', nach: 2 }, ...beendet] }] : []),
      ] },
      { id: 'raus', symbol: '🚪', t: 'Raus', wahl: [
        { t: '🔕 Stumm. Handy weg.', setzt: 'stumm', ende: true },
        { t: 'Chat verlassen.', setzt: 'verlassen', ende: true, sys: 'Du hast die Gruppe verlassen.' },
      ] },
    ],
  };
};

// ---------- Gespräche ----------
export const GESPRAECHE_N5 = {
  // 1 · Montag 7:25
  n5_bank: [
    { tu: 'n5_start' },
    ['erzaehler', 'Januar. Schnee auf der Bank. Darios Platz ist leer.'],
    { foto: 'k5Bank', von: [-18.4, 1.5, 44.6], auf: [-22.0, 0.6, 41.6], fov: 50 },
    { tu: 'n5_ferienUmfrage' },
    ['nik', '(von der Bank) Moien. Dein Kollege war schon da. Mit dem Brett.'],
    ['nik', 'Dann ist er wieder gegangen. Ganz schnell.'],
    { gerd: [-15.95, 0.05, 41.95] },
    ['erzaehler', 'Gerd landet vor dir. Er pickt. An deinem Schuh.'],
    { szene: 'blase', id: 'k5BlaseBank', pruefe: false, def: { t: 'Die Taube hasst mich.', stufe: 'gefuehrt' },
      ausgang: () => 'ja', folgen: { ja: { dann: [] } } },
    { szene: 'suchbild', id: 'k5CheckBank', pruefe: false,
      def: { wo: 'Haltestelle · 7:27', echt: 'Gerd pickt an deinem Schuh.', frage: 'Was hätte eine Kamera gesehen? Tipp drauf.', zeit: 14, finde: 1,
        foto: { von: [-17.0, 1.0, 40.8], auf: [-15.75, 0.12, 42.15], fov: 38 },   // von vorn auf Schuh und Gerd (vorher stand die Kamera im Kopf der Spielfigur)
        ergebnis: 'Kopf: „hasst mich“. Kamera: Krümel.',
        ziele: [{ id: 'kruemel', wo: [-15.8, 0.03, 42.08], r: 0.12, t: 'Krümel. Vom Brötchen.', kurz: 'Krümel am Schuh.' }] },
      ausgang: (r, m) => { m.k5GerdDa = (m.k5GerdDa || 0) + 1; m.k5GerdGesehen = (m.k5GerdGesehen || 0) + 1; m.k5CheckBank = true; return 'ja'; },
      folgen: { ja: { dann: [['nik', '(lacht) Gerd hasst keinen. Gerd hat Hunger.']] } } },
    { gerd: null },
    // Faden: Darios „zu viel“ (K4). Ein Erwachsener nimmt es ernst – in allen Wegen.
    { wenn: (m) => !!(m.k4DarioFrage || m.k4DarioDa || m.k4DarioWoher), dann: [['du', '(denkt) „Zu viel“, hat Dario vor den Ferien gesagt.']],
      sonst: [['du', '(denkt) Dario sitzt sonst immer hier.']] },
    { fest: true, wahl: [
      { t: '🙋 Herrn Kuedes sagen.', merke: ['k5DarioKuedes', 'k5Kuedes'], staerke: 'mut', dann: [
        { blende: 'Schultür · 7:52' },
        ['kaya', '(an der Tür) Moien. Du siehst aus, als wär was.'],
        ['du', 'Dario. Er hat gesagt, es ist zu viel. Heute war er weg.'],
        ['kaya', 'Gut, dass du’s sagst. Ich red heute mit ihm.'],
        ['kaya', 'Du musst nichts weiter tun. Das mach ich.']] },
      { t: '💬 Dario schreiben.', merke: 'k5DarioGeschrieben', dann: [
        { handy: { wer: 'Dario · privat', wann: '7:31', chat: [{ wer: 'Du', t: 'alles ok?' }, { wer: 'Dario', t: '👍' }] } },
        ['erzaehler', 'Zwei Sekunden später: „Nachricht gelöscht“.'], { handy: null }, { tu: 'n5_kuedesFragt' }] },
      { t: '(Nichts. Geht mich nichts an.)', merke: 'k5DarioNichts', dann: [{ tu: 'n5_kuedesFragt' }] },
    ] },
  ],

  // 2 · Montag 7:58: die Tür
  n5_tuer: [
    ['erzaehler', 'Saal 1.04. Durch die Tür hört man Lachen.'],
    { foto: 'k5Tuer', ...TUER_KLASSE },
    // Durchlauf 1 läuft von selbst: der erste Gedanke kommt, man wählt ihn nicht. Kapuze, Blick auf den Boden – Milas Winken sieht man nicht.
    { szene: 'blase', id: 'k5BlaseTuer', pruefe: false, def: { t: 'Alle denken, ich bin’s.', stufe: 'frei', zeit: 4 },
      ausgang: () => 'weiter', folgen: { weiter: { dann: [] } } },
    { szene: 'schnitt', pruefe: false, def: { kopf: '1 · „Alle denken, ich bin’s.“', bild: TUER_BODEN, t: 'Kapuze auf. Blick auf den Boden. Schnell auf den Platz.', ms: 4300 } },
    ['erzaehler', 'Jemand lacht. Du schaust nicht hoch. Du sitzt allein.'],
    { tu: 'n5_spulen' },
    ['du', '(denkt) Gleiche Tür. Anderer Gedanke?'],
    { fest: true, wahl: [
      { t: '„Die können mich mal.“', merke: 'k5TuerMal', dann: [
        { szene: 'schnitt', pruefe: false, def: { kopf: '2 · „Die können mich mal.“', bild: TUER_KLASSE, t: 'Kopf hoch. Tasche laut auf den Tisch.', ms: 4600 } }] },
      { t: '„Nur ’ne blöde Umfrage.“', merke: 'k5TuerUmfrage', dann: [
        { szene: 'schnitt', pruefe: false, def: { kopf: '2 · „Nur ’ne blöde Umfrage.“', bild: TUER_KLASSE, t: 'Kopf hoch. Du gehst ganz normal rein.', ms: 4600 } }] },
    ] },
    ['du', '(denkt) Was war echt? Was hätte eine Kamera gesehen?'],
    { gerd: [-25.4, 0.05, -21.2] },
    { szene: 'suchbild', id: 'k5CheckTuer', pruefe: false,
      def: (m) => ({ wo: 'Saal 1.04 · 7:58', echt: zielDu5(m) ? 'Dein Name steht oben in einer Umfrage. Das ist nicht okay.' : 'Dein Name steht in einer Umfrage. Das ist nicht okay.',
        frage: 'Wer schaut dich wirklich an?', zeit: 16, finde: 2, foto: TUER_KLASSE, wackel: zielDu5(m), zahl: 2,
        ergebnis: '{n} schauen. Was sie denken, sieht keine Kamera.',
        ziele: [
          { id: 'jo', wer: 'jo', hoehe: 1.15, t: 'Jo schaut. Er grinst.', kurz: 'Jo schaut.' },
          { id: 'mila', wer: 'mila', hoehe: 1.15, t: 'Mila schaut. Sie winkt.', kurz: 'Mila winkt.' },
          { id: 'ben', wer: 'ben', hoehe: 1.1, richtig: false, t: 'Ben schaut aufs Handy. Ein Katzenvideo.' },
          { id: 'chiara', wer: 'chiara', hoehe: 1.1, richtig: false, t: 'Chiara liest Karteikarten.' },
          { id: 'yusuf', wer: 'yusuf', hoehe: 1.1, richtig: false, t: 'Yusuf redet mit Ayla.' },
          { id: 'lina', wer: 'lina', hoehe: 1.1, richtig: false, t: 'Lina schreibt.' },
          { id: 'noah', wer: 'noah', hoehe: 1.1, richtig: false, t: 'Noah schaut aus dem Fenster.' },
          { id: 'gerd', wo: [-25.4, 0.2, -21.2], bonus: true, r: 0.1, kurz: 'Gerd. Im Klassenzimmer?!' },
        ] }),
      ausgang: (r, m) => { m.k5TuerZahl = (r.gefunden || []).length; m.k5TuerGefunden = r.gefunden || []; m.k5CheckTuer = true; m.k5GerdDa = (m.k5GerdDa || 0) + 1; if ((r.bonus || []).length) m.k5GerdGesehen = (m.k5GerdGesehen || 0) + 1; return 'ja'; },
      folgen: { ja: { dann: [] } } },
    { gerd: null },
    { wenn: (m) => !!m.k5TuerMal, dann: [['jo', 'Uuh. Guten Morgen auch.'], ['mila', 'Laut. Aber hier ist frei.']], sonst: [['mila', 'Hier. Neben mir ist frei.']] },
    ['du', '(denkt) Das Lachen vorhin? Bens Handy. Ein Katzenvideo.'],
    // Halt am Montag: ein Erwachsener hat die Umfrage gesehen
    ['hoffmann', 'Moien. Kurz, bevor wir anfangen.'],
    ['hoffmann', 'Die Umfrage von Sonntag habe ich gesehen. Die zählt hier nicht.'],
    ['hoffmann', 'Wer etwas weiß: zu mir. Nicht in den Chat.'],
  ],

  // 3 · Montag 8:05: Culture générale
  n5_cg: [
    { hin: { du: [-17.0, -21.6, -Math.PI / 2] } },   // im Saal, hinten (nicht mehr an der Tür im Gang)
    ['rantini', 'Bonjour. Culture générale. Seite zwölf, bitte.'],
    ['erzaehler', 'Unter dem Tisch schiebt Mila dir ihr Handy rüber.'],
    { handy: { wer: 'Jo · 7P2', wann: '8:09', text: 'beweis 👀👀' } },
    ['mila', '(flüstert) Das Foto von 8:34. Jo hat nur den Ausschnitt gepostet.'],
    { handy: null },
    // Ausschnitt → ganzes Bild: was Jo „Beweis“ nennt, ist ein Kopf. Das Ganze zeigt, von wo es gemacht wurde.
    { szene: 'schnitt', pruefe: false, def: { kopf: '📱 Jos Post', bildId: 'k4Foto834', bild: { von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },
      zoom: { x: 0.5, y: 0.5, s: 3.2, nach: 2400 }, t: '„beweis 👀“ – ein Kopf. Mehr nicht.', tWeit: 'Rausgezoomt: das ganze Foto.', ms: 5000 } },
    ['mila', '(flüstert) Von wo wurde das gemacht? Schnell.'],
    { szene: 'suchbild', id: 'k5Foto834', pruefe: false,
      def: (m) => ({ wo: 'Milas Handy · unter dem Tisch', bildId: 'k4Foto834', gespeichertZuerst: true, foto: { von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },
        gruen: true, streifen: true, frage: m.spurGruen ? 'Das Grüne kennst du. Was noch? Schnell.' : 'Von wo wurde das gemacht? Zwei Spuren. Schnell.',
        zeit: 8, finde: m.spurGruen ? 1 : 2, gut: 'Das Foto ist von draußen. Durch das Glas der Tür.', verpasst: 'Rantini dreht sich um.',
        ziele: SPUREN834(m) }),
      ausgang: (r, m) => { spurenMerken(r, m); return spurenFertig(m) ? 'fertig' : 'offen'; },
      folgen: { fertig: { dann: [{ tu: 'n5_spurenGefunden' }] }, offen: { dann: [{ tu: 'n5_rantiniKommt' }] } } },
  ],

  // 4 · Montag 9:50: Pause = ein Ort
  n5_hofStart: [
    ['erzaehler', 'Pause. Schnee. Irgendwo ruft jemand „Admin!“.'],
    { foto: 'k5Hof', von: [0.4, 2.4, 4.6], auf: [2.0, 1.0, 14.0], fov: 60 },
    { szene: 'orte', id: 'pauseOrt5', pruefe: false,
      def: { titel: 'Pause im Schnee · 9:50', info: 'Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'noah', sy: '❄️', name: 'Noah', wer: 'Sie rufen ihm „Admin!“ nach.', bild: { wer: 'noah', von: [2.2, 1.7, 2.2], auf: [0, 1.1, 0], fov: 50 } },
          { id: 'chiara', sy: '📱', name: 'Chiara', wer: 'Tippt. Löscht. Tippt.', bild: { wer: 'chiara', von: [1.4, 1.6, 1.8], auf: [0, 1.2, 0], fov: 44 } },
          { id: 'jo', sy: '⛄', name: 'Jo', wer: 'Baut einen Schneemann. Handy in der Hand.', bild: { wer: 'jo', von: [-2.0, 1.8, -2.0], auf: [0.6, 0.9, 0.6], fov: 50 } },
          { id: 'manon', sy: '❓', name: 'Manon', wer: 'Fragt, was „Admin“ heißt.', bild: { wer: 'manon', von: [-1.0, 1.6, 1.9], auf: [0, 1.2, 0], fov: 46 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: { noah: { merke: 'pause5Noah', dann: [{ tu: 'n5_ort', mit: 'noah' }] }, chiara: { merke: 'pause5Chiara', dann: [{ tu: 'n5_ort', mit: 'chiara' }] },
        jo: { merke: 'pause5Jo', dann: [{ tu: 'n5_ort', mit: 'jo' }] }, manon: { merke: 'pause5Manon', dann: [{ tu: 'n5_ort', mit: 'manon' }] } } },
    { tu: 'n5_hofAuch' },
    ['erzaehler', 'Es klingelt. Im Schnee bleiben Spuren. Alle in eine Richtung.'],
  ],
  n5_noah: [
    { szene: 'stoerung', id: 'k5Admin', pruefe: false,
      def: { bild: { wer: 'noah', von: [2.0, 1.6, 2.2], auf: [0, 1.1, 0], fov: 46 }, t: 'Ein Schneeball trifft Noah am Rücken. „Admin! Admin!“', hin: 'Hingehen', bleib: 'Weitergehen', zeit: 6 },
      ausgang: (r) => (r.hin ? 'hin' : 'weg'),
      folgen: {
        hin: { dann: [{ hin: { du: [-1.6, 13.6, 2.0] } }, ['du', '(denkt) Wenn ich was sage, bin ich dran.'], { tu: 'n5_noahWahl' }] },
        weg: { merke: 'k5AdminWeg', dann: [['erzaehler', 'Du gehst weiter. Hinter dir: „Admin! Admin!“']] } } },
    // Halt: die Aufsicht greift ein – in allen Wegen
    ['sabli', '(laut) Schluss mit Schneebällen auf Leute. Noah, komm kurz mit rein.'],
  ],
  n5_chiara: [
    ['chiara', '(tippt, löscht, tippt) Hm? Nichts.'],
    ['erzaehler', 'Auf ihrem Display: „wer glaubt, es ist …“. Sie löscht es wieder.'],
    { tu: 'n5_chiaraFaden' },
  ],
  n5_jo: [
    ['jo', '(ohne hochzuschauen) Hilf mal. Der Kopf hält nicht.'],
    ['jo', '(scrollt durch die Umfrage) Mehr Stimmen als bei der Klassensprecherwahl.'],
    { tu: 'n5_joFaden' },
  ],
  n5_manon: [
    ['manon', '{name}? „Admin“ – c’est quoi ?'],
    { wahl: [
      { t: '„Der Chef vom Account.“', merke: 'k5ManonErklaert', herz: { manon: 1 }, dann: [['manon', 'Ah. Et tout le monde cherche … qui ?'], ['du', 'Alle. Und keiner weiß es.'],
        { wahl: [
          { t: '„Freitag Eisbahn. Kommst du?“', merke: 'k5ManonEingeladen', herz: { manon: 2 }, dann: [['manon', '(überrascht) Moi ? … Oui. Peut-être.']] },
          { t: '(Nichts mehr.)', dann: [['manon', 'Merci.']] },
        ] }] },
      { t: '„Egal. Unwichtig.“', merke: 'k5ManonEgal', dann: [['manon', '(schaut zu denen, die „Admin!“ rufen) Ça n’a pas l’air égal.']] },
    ] },
  ],

  // 5 · Mittwoch 12:30: Milas Tablet
  n5_cdi: [
    { tu: 'n5_milaHandy' },
    ['mila', '(dreht ihr Handy zu dir) Schau. Wie aus einem Satz vier werden.'],
    { handy: (m) => ({ wer: '7P2 · vier Screenshots', wann: 'Mo – Mi', chat: STILLE_POST(m) }) },
    ['mila', 'Lina hat es gesehen. Das ist echt. Und dann?'],
    { fest: true, wahl: [
      { t: 'Bei Lou kommt was dazu.', merke: 'k5PostLou', staerke: 'klar', dann: [['mila', 'Genau. Halb neun ist nicht 8:34. Ab Lou: nur noch laut.']] },
      { t: 'Bei Pit kommt was dazu.', merke: 'k5PostSpaet', dann: [['mila', 'Schon bei Lou. Halb neun ist nicht 8:34.']] },
      { t: 'Erst bei Jo.', merke: 'k5PostSpaet', dann: [['mila', 'Schon bei Lou. Jo sagt nur „sicher“ dazu.']] },
    ] },
    { handy: null },
    ['erzaehler', 'Dein Handy summt. Lou. Privat.'],
    { tu: 'n5_louFragt' },
    { tu: 'n5_cdiDanach' },
  ],

  // 6 · Mittwoch 13:30: die Abstimmung
  n5_abstimmung: [
    ['erzaehler', 'Lesesaal. Freistunde. Ben schaut kurz zu dir rüber. Dann aufs Handy.'],
    { wenn: (m) => !!m.k5TuerUmfrage, dann: [['mila', '(setzt sich neben dich) Hier ist frei. Wie Montag.']] },
    { tu: 'n5_benFrage' },
    ['erzaehler', 'Dann summen alle Handys gleichzeitig.'],
    { foto: 'k5Lesesaal', von: [14.0, 1.7, -56.4], auf: [12.0, 0.9, -60.6], fov: 60 },
    { szene: 'chat', id: 'k5Umfrage', pruefe: false, def: (m) => UMFRAGE(m),
      ausgang: (r, m) => {
        const f = r.flags || {}; m.k5Geprueft = !!f.geprueft; m.k5PruefZahlen = f.pruefZahlen || null; m.k5Ayla = !!f.ayla; m.k5ChatStimmen = r.stimmen || null;
        if (f.noahGeglaubt) m.k5NoahGeglaubt = true; if (f.nein) m.k5NeinGedrueckt = true; if (f.verteidigt) m.k5Verteidigt = true; if (f.aylaDanke) m.k5AylaDanke = true;
        if (f.chiaraStopp || f.chiaraNein) m.k5ChiaraGefragt = true; if (f.chiaraNein) m.k5ChiaraNein = true; if (f.kuedesSpuren) m.k5KuedesSpuren = true;
        if (f.kenanSicher) m.k5KenanGeschuetzt = true; if (f.kenanGejagt) m.k5KenanGejagt = true;
        m.k5Rausgeflogen = !f.zu && !(f.verlassen && zielDu5(m)) ? (zielDu5(m) ? 'du' : 'noah') : null;
        return f.kuedes ? 'kuedes' : f.chiaraStopp ? 'chiara' : f.zuZweit ? 'zuzweit' : f.gepostet ? 'gepostet' : f.verteidigt ? 'verteidigt' : f.nein ? 'nein' : f.noahGeglaubt ? 'geglaubt' : f.verlassen ? 'verlassen' : f.stumm ? 'stumm' : 'abgewartet';
      },
      folgen: {
        kuedes: { merke: ['k5ChatKuedes', 'k5Kuedes'], staerke: 'mut', dann: [{ tu: 'n5_nachChat' }] },
        chiara: { merke: 'k5ChatChiara', dann: [{ tu: 'n5_nachChat' }] },
        zuzweit: { merke: 'k5ChatZuZweit', staerke: 'mut', dann: [{ tu: 'n5_nachChat' }] },
        gepostet: { merke: ['k5ChatGepostet', 'k5Laut'], dann: [{ tu: 'n5_nachChat' }] },
        verteidigt: { merke: 'k5ChatVerteidigt', staerke: 'mut', dann: [{ tu: 'n5_nachChat' }] },
        nein: { merke: 'k5ChatNein', staerke: 'mut', dann: [{ tu: 'n5_nachChat' }] },
        geglaubt: { merke: 'k5ChatGeglaubt', dann: [{ tu: 'n5_nachChat' }] },
        verlassen: { merke: 'k5ChatVerlassen', dann: [{ tu: 'n5_nachChat' }] },
        stumm: { merke: 'k5ChatStumm', dann: [{ tu: 'n5_nachChat' }] },
        abgewartet: { merke: 'k5ChatAbgewartet', dann: [{ tu: 'n5_nachChat' }] },
      } },
  ],

  // Donnerstag (freiwillig): Skills-Stunde Heft #04
  n5_skills: [
    ['erzaehler', 'Aula. Herr Kuedes schreibt einen Satz an die Tafel. Es wird still.'],
    { szene: 'skillsStunde', id: 's5_gedanken', def: S5_GEDANKEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's5Gedanken' }, weiter: { merke: 's5Gedanken' } } },
    ['mesenberg', 'Jetzt anonym. Jeder bekommt fünf Bohnen.'],
    ['mesenberg', 'Leg sie zu Sätzen, die du kennst. Von dir oder anderen.'],
    { szene: 'bohnen', id: 'bohnen', def: BOHNEN, ausgang: (r) => (r.bohnen.some((n) => n > 0) ? 'gelegt' : 'leer'),
      folgen: { gelegt: { merke: 'bohnenGelegt' }, leer: { merke: 'bohnenLeer' } } },
    ['mila', 'Ich hab gezählt: wir alle. Gegenseitig.'],
    { szene: 'skillsStunde', id: 's5_scham', def: S5_SCHAM_SCHULD, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's5Scham' }, weiter: { merke: 's5Scham' } } },
    ['mesenberg', 'Wenn ein Satz sehr laut ist: Bürotür ist offen. Oder 116 111.'],
    { szene: 'stempel', def: { modul: 'Modul 4 · Meine Gedanken', titel: 'Gedanken geprüft',
      gelernt: ['Sache – Gedanke – Gefühl', 'Was eine Kamera sieht und was nur laut ist', 'Ein Satz muss nicht schön sein. Er muss stimmen.'],
      mission: 'Wenn du „alle“ denkst: zähl nach.' }, folgen: {} },
  ],

  // 7 · Freitag 16:00: Eisbahn
  n5_eis: [
    ['erzaehler', 'Freitag. Marktplatz. Die Eisbahn leuchtet.'],
    { foto: 'k5Eis', von: [40.4, 2.3, 118.8], auf: [48.7, 0.6, 119.4], fov: 56 },
    { wenn: (m) => m.k5Rausgeflogen === 'du', dann: [['ayla', 'Da bist du! Ich hab dich wieder in den Chat geholt. Und hierher.']],
      sonst: [['ayla', 'Da bist du! Yusuf will ein Rennen.']] },
    ['yusuf', 'Eine Runde. Wer verliert, baut den Schneemann fertig.'],
    ['du', '(denkt) Gleich lachen alle. Wenn ich hinfalle.'],
    ['du', '(denkt) Noch ist keiner hingefallen. Auch ich nicht.'],
    { fest: true, wahl: [
      { t: '(Loslassen. Probieren.)', merke: 'k5Losgelassen', staerke: 'mut', dann: [] },
      { t: '(Erst an der Bande.)', merke: 'k5Bande', dann: [['ayla', 'Auch gut. Hand an die Bande.']] },
    ] },
    { szene: 'eisrennen', id: 'k5Rennen', pruefe: false, def: (m) => ({ gegner: { name: 'Yusuf', farbe: '#2e86de' }, vorsichtig: !!m.k5Bande }),
      ausgang: (r, m) => { m.k5RennenSieg = !!r.gewonnen; m.k5RennenGefallen = r.gefallen || 0; return r.gewonnen ? 'sieg' : 'nicht'; },
      folgen: {
        sieg: { dann: [['yusuf', 'Was?! Revanche. Nächste Woche.'], ['erzaehler', 'Yusuf baut den Schneemann fertig. Mit Mütze.']] },
        nicht: { dann: [['yusuf', '(grinst) Schneemann. Los.'], ['erzaehler', 'Du rollst die Kugeln. Ayla setzt die Nase.']] } } },
    // Die Vorhersage prüfen – erst jetzt, nach dem Rennen (vorher sieht keine Kamera etwas)
    { szene: 'blase', id: 'k5BlaseEis', pruefe: false, def: { t: 'Alle haben gelacht.', stufe: 'frei', zeit: 5 },
      ausgang: (r, m) => { m.k5EisGeprueft = !!(r && r.geprueft); return m.k5EisGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [{ tu: 'n5_eisCheck' }] }, nein: { dann: [] } } },
    { wenn: (m) => (m.k5RennenGefallen || 0) > 0, dann: [['ayla', '(hilft dir hoch) Uff. Alles gut?']] },
    { wenn: (m) => !!m.k5Losgelassen, dann: [['ayla', '(klatscht) Ohne Bande! Hab ich gesehen.']] },
    { tu: 'n5_eisRand' },
  ],

  // 8 · Freitag 17:00: Haltestelle
  n5_freitagStart: [
    ['erzaehler', 'Freitag, 17:00. Haltestelle. Es wird dunkel.'],
    { tu: 'n5_sichtRaus' },
    { sicht: { wer: 'dario', auf: 'du', gedanken: ['Gegenüber. Kapuze auf.', 'Ich weiß, dass du’s nicht warst.'] } },
    ['erzaehler', 'Auf der anderen Straßenseite: Dario. Er schaut rüber.'],
  ],
  n5_freitag: [
    { hin: { dario: 'du' } },
    ['dario', 'Hey.'],
    ['dario', 'Herr Kuedes hat mit mir geredet. Montag. War okay.'],
    { wenn: (m) => !!m.k5DarioKuedes, dann: [['dario', '(schaut dich kurz an) Du hast es Herrn Kuedes gesagt, oder? … Danke.']] },
    { wenn: (m) => !!m.k5DarioGeschrieben, dann: [['dario', 'Du hast mir geschrieben. Ich hab’s gelöscht. Sorry.']] },
    { wahl: [
      { t: '„Geht’s dir besser?“', merke: 'k5DarioBesser', herz: { dario: 1 }, dann: [['dario', 'Bisschen. … Frag nicht weiter. Okay?'], ['du', 'Okay.']] },
      { t: '(Neben ihm stehen.)', merke: 'k5DarioStehen', herz: { dario: 1 }, dann: [['erzaehler', 'Ihr steht da. Euer Atem macht Wölkchen.']] },
      { t: '„Weißt du, wer der Admin ist?“', merke: 'k5DarioAdminFrage', dann: [['dario', '(zu schnell) Nein. … Der Bus kommt.'], { verdacht: 'dario', spur: 'Freitag: „Weißt du, wer der Admin ist?“ – „Nein.“ Zu schnell.' }] },
    ] },
    { blende: 'Im Bus · 17:04' },
    { tu: 'n5_fenster' },
    ['erzaehler', 'Du machst ein Foto vom Fenster.'],
    { wahl: [
      { t: '„An Dario.“', merke: 'k5FensterDario', herz: { dario: 1 }, dann: [{ handy: { wer: 'Dario', wann: '17:07', text: 'meiner wär: zu viel.' } }, { handy: null }] },
      { t: '„An Noah.“', merke: 'k5FensterNoah', herz: { noah: 1 }, dann: [{ handy: { wer: 'Noah', wann: '17:07', text: 'meiner: alle starren.' } }, { handy: null }] },
      { t: '„Nur für mich.“', merke: 'k5FensterIch', dann: [] },
    ] },
    { handy: { wer: 'Dario', wann: '17:09', text: 'montag zeig ich dir was. eine sprachnachricht. von jo.' } },
    { handy: null },
    // Das kleine 📷 – ohne Hilfe. Nur hier zeigt sich, ob der Check von selbst kommt.
    { szene: 'blase', id: 'k5BlaseJo', pruefe: false, def: { t: 'Jo lästert über mich.', stufe: 'klein', zeit: 5 },
      ausgang: (r, m) => { m.k5FreitagGeprueft = !!(r && r.geprueft); return m.k5FreitagGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [['du', '(denkt) Echt: eine Nachricht. Noch nicht gehört.'], ['du', '(denkt) Montag. Erst hören.']] }, nein: { dann: [] } } },
    ['erzaehler', 'Der Bus fährt. Du schaust lange auf „von jo“.'],
    { tu: 'kapitelEnde' },
  ],
};

// ---------- Rückblick in Bildern (Kapitelende, Lehrer-Ansicht) ----------
export const RUECKBLICK_N5 = (m) => [
  { id: 'k5Bank', titel: 'Die leere Bank', text: 'Darios Platz war leer. ' + (m.k5DarioKuedes ? 'Du hast es Herrn Kuedes gesagt.' : 'Herr Kuedes hat selbst nachgefragt.') },
  { id: 'k5Tuer', titel: 'Die Tür', text: '„Alle denken, ich bin’s.“ ' + (m.k5TuerMal ? 'Zweiter Gedanke: „Die können mich mal.“ ' : m.k5TuerUmfrage ? 'Zweiter Gedanke: „Nur ’ne blöde Umfrage.“ ' : '') + 'Kamera: 2 haben geschaut.' },
  { id: 'k5Hof', titel: 'Admin!', text: m.pause5Noah ? (m.k5NoahLasst ? 'Du hast gesagt: „Lasst ihn.“' : m.k5NoahDaneben ? 'Du hast dich neben Noah gestellt.' : m.k5AdminWeg ? 'Du warst da. Dann bist du weitergegangen.' : 'Du warst bei Noah.') : m.pause5Chiara ? 'Du warst bei Chiara. „wer glaubt, es ist …“ – gelöscht.' : m.pause5Jo ? (m.k5Schneemann ? 'Du hast mit Jo den Schneemann gebaut.' : 'Du warst bei Jo. Er hat gescrollt.') : m.pause5Manon ? (m.k5ManonErklaert ? 'Du hast Manon erklärt, was „Admin“ heißt.' : 'Manon hat gefragt, was „Admin“ heißt.') : 'Pause im Schnee.' },
  { id: 'k5Lesesaal', titel: 'gesehen von ' + (m.k5PruefZahlen ? m.k5PruefZahlen.gs : 9), text: (m.k5Geprueft ? 'Geprüft: ' + (m.k5PruefZahlen ? m.k5PruefZahlen.ja + ' Ja, ' + m.k5PruefZahlen.gs + ' gesehen. ' : 'ein paar Ja, viele nur gesehen. ') : '') + (m.k5ChatKuedes ? 'Screenshot an Herrn Kuedes. Er kam, bevor jemand rausflog.' : m.k5ChatChiara ? 'Du hast Chiara geschrieben. Sie hat aufgehört.' : m.k5ChatZuZweit ? 'Ayla und du: Nein. Die Umfrage war vorbei.' : m.k5ChatGepostet ? 'Du hast das Foto gepostet. Dann hieß es: „Wer war draußen?“' : m.k5ChatVerteidigt ? 'Du hast geschrieben: „' + (m.k5ZielDu ? 'Ich' : 'Noah') + ' war’s nicht.“ Danach kamen Ja-Stimmen dazu. Die liegen nicht an dir.' : m.k5ChatNein ? '„Nein“ gedrückt – mit deinem Namen.' : m.k5ChatGeglaubt ? 'Noah privat: „Ich glaub dir.“ Die Umfrage lief weiter.' : m.k5ChatVerlassen ? 'Du bist rausgegangen.' : 'Die Umfrage lief bis zum Ende.') },
  { id: 'k5Chiara', titel: 'Das war auch', text: 'Chiaras Daumen über „Umfrage starten“. „Wenn ich nichts mache, bin ich die Nächste.“', auch: true },
  { id: 'k5Eis', titel: m.k5Losgelassen ? 'Ohne Bande' : 'An der Bande', text: (m.k5Losgelassen ? 'Losgelassen. ' : 'An der Bande gefahren. ') + (m.k5EisGeprueft ? 'Geprüft: gelacht hat keiner. ' : '') + (m.k5NoahGeholt ? 'Noah hast du vom Rand geholt.' : m.k5RennenSieg ? 'Rennen gegen Yusuf: gewonnen.' : 'Rennen gegen Yusuf: verloren.')
    + ((m.k5GerdDa || 0) ? ' 🐦 Gerd war ' + m.k5GerdDa + '-mal im Bild. Gesehen: ' + (m.k5GerdGesehen || 0) + '.' : '') },
];

// ---------- TUN für Kapitel 5 (in spiel.js eingehängt: tunN5) ----------
export const tunN5 = (c) => {
  const M = () => c.S.merke;
  const T = {
    // Kapitelstart: wer im Verdacht steht, wird einmal festgehalten (damit es die ganze Woche gleich bleibt)
    n5_start: () => { const m = M(); m.k5ZielDu = ['explodiert', 'worte', 'atmenWorte'].includes(m.k4HochTat) || !!m.k4Explodiert; return []; },
    // Die Ferien-Umfrage in Stimmen (nicht Prozent): Wer ist der Admin?
    n5_ferienUmfrage: () => {
      const du = zielDu5(M());
      return [{ handy: { wer: '@annexe.cam', wann: 'Sonntag, 21:00', text: 'wer ist der admin? 🤔', umfrage: du ? { a: c.S.name || 'du', b: 'noah', pa: 55, stimmen: 20 } : { a: 'noah', b: c.S.name || 'du', pa: 55, stimmen: 20 } } },
        ['erzaehler', du ? 'Elf Stimmen für dich. Neun für Noah. Abgestimmt haben Leute, die du kennst.' : 'Elf Stimmen für Noah. Neun für dich. Abgestimmt haben Leute, die du kennst.'],
        { handy: null }];
    },
    // Ben fragt privat, kurz vor der Umfrage. Wer ehrlich antwortet (auch „weiß ich nicht“), ändert Bens Stimme.
    n5_benFrage: () => {
      const du = zielDu5(M());
      return [{ handy: { wer: 'Ben (privat)', wann: '13:28', text: du ? 'bist du der admin? sag ehrlich' : 'du sitzt doch neben noah. war er’s?' } },
        { wahl: du ? [
          { t: '„Nein. Frag ruhig.“', merke: 'k5BenGefragt', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', text: 'ok. glaub ich dir.' } }] },
          { t: '„Warum fragst du mich?“', merke: ['k5BenGefragt', 'k5BenWarum'], dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', text: 'weil alle fragen. sorry' } }] },
          { t: '(Nicht antworten.)', merke: 'k5BenGemieden', dann: [] },
        ] : [
          { t: '„Weiß ich nicht. Echt nicht.“', merke: 'k5BenGefragt', staerke: 'klar', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', text: 'ok. dann drück ich nicht ja.' } }] },
          { t: '„Bestimmt.“', merke: 'k5BenGeruecht', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', text: 'dachte ich mir 👀' } }] },
          { t: '(Nicht antworten.)', merke: 'k5BenGemieden', dann: [] },
        ] },
        { handy: null }];
    },
    // Montag, unter dem Tisch: Mme Rantini kommt durch die Reihe. Weitersuchen kostet Milas Handy.
    n5_rantiniKommt: () => [
      { szene: 'stoerung', id: 'k5Rantini', pruefe: false, def: { t: 'Mme Rantini kommt durch die Reihe. Noch zwei Tische.', hin: 'Weitersuchen', bleib: 'Handy zurück', zeit: 3.5 },
        ausgang: (r) => (r.hin ? 'weiter' : 'zurueck'),
        folgen: {
          weiter: { merke: ['k5Weitergesucht', 'k5MilaHandyWeg'], dann: [
            { szene: 'suchbild', id: 'k5Foto834b', pruefe: false,
              def: (m) => ({ wo: 'Milas Handy · noch eine Sekunde', bildId: 'k4Foto834', gespeichertZuerst: true, foto: { von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },
                gruen: true, streifen: true, frage: 'Noch eine Sekunde …', zeit: 6, finde: SPUREN834(m).filter((z) => z.richtig !== false).length, gut: 'Gefunden.', verpasst: 'Zu spät.', ziele: SPUREN834(m) }),
              ausgang: (r, m) => { spurenMerken(r, m); return 'ja'; }, folgen: { ja: { dann: [] } } },
            ['rantini', '(steht neben dir, Hand auf) Merci. Bis zur Pause.'],
            ['erzaehler', 'Milas Handy liegt jetzt vorne auf dem Pult.'],
            { tu: 'n5_spurenGefunden' }] },
          zurueck: { merke: 'k5HandyZurueck', dann: [['erzaehler', 'Mila steckt das Handy weg. Mme Rantini geht vorbei.'], { tu: 'n5_spurenGefunden' }] } } },
    ],
    n5_spurenGefunden: () => {
      const m = M();
      if (spurenFertig(m)) { m.k5FotoDraussen = true; return [{ beweis: 'k5Draussen', t: 'Das Foto von 8:34 ist von draußen: grünes Schild im Glas, Papier vor der Linse.' }, ['mila', '(flüstert) Von draußen. Durch die Tür.'], ['du', '(denkt) „Beweis“. Ein Kopf. Mehr war nicht drauf.']]; }
      if (m.k5Schild) return [{ beweis: 'k5Draussen', t: 'Das Foto von 8:34 ist von draußen: grünes Schild im Glas.' }, ['mila', '(flüstert) Grün im Glas. Das ist der Gang.']];
      m.k5SchildTipp = true; return [['mila', '(flüstert) Oben rechts war was. Zeig ich dir Mittwoch.']];
    },
    // Mittwoch, CDI: Milas Handy (wenn es wegen dir bei Rantini lag)
    n5_milaHandy: () => {
      const m = M(); if (!m.k5MilaHandyWeg) return [];
      return [['mila', 'Mein Handy lag bis zur Pause bei Rantini.'], { wahl: [
        { t: '„Sorry. Meine Schuld.“', merke: 'k5MilaSorry', herz: { mila: 1 }, dann: [['mila', 'Schon gut. Hat’s was gebracht?'],
          { wenn: (mm) => !!mm.k5Schild, dann: [['du', 'Das Foto ist von draußen.'], ['mila', 'Dann ja.']], sonst: [['du', 'Nicht wirklich.'], ['mila', '(seufzt) Na toll.']] }] },
        { t: '„Hat sich gelohnt.“', merke: 'k5MilaLohnt', herz: { mila: -1 }, dann: [['mila', '(hebt eine Braue) Für dich.']] },
      ] }];
    },
    // Mittwoch: Lou fragt privat. Was du antwortest, steht nachher im Klassenchat.
    n5_louFragt: () => {
      const du = zielDu5(M()), lou = (t, w) => ({ handy: { wer: 'Lou (privat)', wann: w || '12:42', text: t } });
      return [lou(du ? 'sag ehrlich. warst du draußen? 👀' : 'stimmt doch mit noah, oder?', '12:41'),
        { wahl: du ? [
          { t: '„Woher hast du das?“', merke: 'k5LouGefragt', staerke: 'klar', dann: [lou('hab’s gehört. in der pause')] },
          { t: '„Nein. War ich nicht.“', merke: 'k5LouNein', dann: [lou('ok ok')] },
          { t: '(Nicht antworten.)', merke: 'k5LouStill', dann: [] },
        ] : [
          { t: '„Woher weißt du das?“', merke: 'k5LouGefragt', staerke: 'klar', dann: [lou('hab’s gehört. in der pause')] },
          { t: '„Keine Ahnung.“', merke: 'k5LouKeineAhnung', dann: [lou('hm ok')] },
          { t: '„Klar.“', merke: 'k5LouKlar', dann: [lou('wusst ich’s 😎')] },
          { t: '(Nicht antworten.)', merke: 'k5LouStill', dann: [] },
        ] },
        { handy: null }];
    },
    n5_spulen: async () => { await c.ui.zurueckspulen({ t: 'Zurück. Gleiche Tür.' }); return []; },
    // Ein Erwachsener fragt selbst nach (Dario) – auch wer nichts gesagt hat, bekommt eine zweite Chance
    n5_kuedesFragt: () => [
      { blende: 'Schultür · 7:52' },
      ['kaya', '(an der Tür) Moien. Hast du Dario heute gesehen? Mir fiel vor den Ferien was auf.'],
      { wahl: [
        { t: '„Er hat ‚zu viel‘ gesagt.“', merke: ['k5DarioKuedes', 'k5Kuedes'], staerke: 'mut', dann: [['kaya', 'Danke. Ich red heute mit ihm. Du musst nichts weiter tun.']] },
        { t: '„Nein.“', merke: 'k5DarioNein', dann: [['kaya', 'Okay. Ich schau nach ihm.']] },
      ] },
    ],
    // Faden: Zettel für den nächsten Test (K4) – Mme Lenning fragt einmal nach, im Vorbeigehen
    n5_lenningZettel: () => {
      const m = M(); if (!(m.k4NaechstMaeppchen || m.k4NaechstTisch || m.k4NaechstKopf || m.k4NaechstOffen)) return [];
      const wo = m.k4NaechstMaeppchen ? 'Im Mäppchen.' : m.k4NaechstTisch ? 'Oben auf dem Tisch.' : m.k4NaechstKopf ? 'Im Kopf.' : 'Weiß nicht.';
      return [['lenning', '(im Vorbeigehen, an der Tür) Dein Zettel vom Dezember – wo ist er?'], ['du', wo], ['lenning', m.k4NaechstOffen ? 'Dann mach dir bis zum nächsten Test einen.' : 'Gut. Nächster Test: Februar.']];
    },
    // Pause = ein Ort
    n5_ort: (pa) => {
      const id = pa && pa.id, G = { noah: 'n5_noah', chiara: 'n5_chiara', jo: 'n5_jo', manon: 'n5_manon' }[id];
      const hin = { chiara: [-4.6, 11.4, -2.0], jo: [10.0, 18.6, 0.9], manon: [-3.0, 12.6, -2.2] }[id];
      return [...(hin ? [{ hin: { du: hin } }] : []), ...(GESPRAECHE_N5[G] || [])];
    },
    n5_noahWahl: () => {
      const m = M();
      return [{ wahl: [
        { t: '„Lasst ihn.“', merke: 'k5NoahLasst', staerke: 'mut', herz: { noah: 2 }, dann: [['luca', 'Uuh. Admin-Freund.'], ['ben', '(lässt den Schneeball fallen) … Okay. War nur Spaß.'], ['noah', '(leise) Danke.']] },
        { t: '(Neben Noah stellen.)', merke: 'k5NoahDaneben', herz: { noah: 2 }, dann: [['erzaehler', 'Du stehst einfach da. Der nächste Schneeball fliegt nicht.'], ['noah', '(schaut dich kurz an)']] },
        ...(m.k4NoahVerdacht ? [{ t: '„Sorry wegen Mittwoch.“', merke: 'k5NoahSorry', herz: { noah: 2 }, dann: [['noah', '(lange still) … Okay. Hm.'], ['luca', 'Oh, jetzt Freunde?']] }] : []),
        { t: '(Doch weggehen.)', merke: 'k5AdminWeg', dann: [['du', '(denkt) Nicht heute.']] },
      ] }];
    },
    // Chiara: Versprechen aus K4 einlösen · Mme Lenning hält Wort („wir zwei“)
    n5_chiaraFaden: () => {
      const m = M(), z = [];
      if (m.k4SpaeterVersprochen) z.push(['chiara', '(ohne aufzuschauen) Du hast was versprochen. Nach den Ferien.'], { wahl: [
        { t: '„Jetzt. Eine Karte.“', merke: 'k5ChiaraVersprechen', herz: { chiara: 2 }, dann: [['du', 'Achthundert Gramm. Wie viel Kilo?'], ['chiara', 'Null Komma acht. … Okay. Danke.']] },
        { t: '„Morgen. Wirklich.“', merke: 'k5ChiaraMorgen', dann: [['chiara', 'Hm.']] },
      ] });
      else if (!m.chiaraSpaeter && !(m.chiaraGestaerkt || m.chiaraFuesse)) z.push(['chiara', 'Mme Lenning hat mit mir geübt. Wir zwei. Hat sie echt gemacht.']);
      else if (m.chiaraGestaerkt || m.chiaraFuesse) z.push(['chiara', '(hält ihre Karteikarte hoch) „Die dritte kommt.“ Hab ich noch.']);
      z.push({ wahl: [
        { t: '„Was tippst du da?“', merke: 'k5ChiaraHof', herz: { chiara: 1 }, dann: [['chiara', 'Nichts. … Alle reden über den Admin.'], ['chiara', 'Ich will nur nicht die Nächste sein.']] },
        { t: '(Nichts sagen.)', dann: [['erzaehler', 'Chiara steckt das Handy weg. Dann holt sie es wieder raus.']] },
      ] });
      return z;
    },
    // Jo und sein leeres Blatt (K4) – kein Vortrag, nur ein Schneemann
    n5_joFaden: () => {
      const m = M(), z = [];
      if (m.k4JoBlattZurueck) z.push(['jo', '(leise) Das mit dem Blatt im Dezember. … Danke.']);
      if (m.k4JoBlattGelacht) z.push(['jo', '(kalt) Du schon wieder. „Eins? Echt?“']);
      z.push({ wahl: [
        { t: '(Kopf draufsetzen.)', merke: 'k5Schneemann', herz: { jo: 1 }, dann: [['erzaehler', 'Der Kopf hält. Jo steckt zwei Steine als Augen rein.'], ['jo', '(grinst) Sieht aus wie Mme Lenning.']] },
        ...(m.k4JoBlattGelacht ? [{ t: '„Sorry wegen dem Blatt.“', merke: 'k5JoSorry', herz: { jo: 2 }, dann: [['jo', '(schaut hoch) … Okay. Halt den Kopf fest.']] }] : []),
        { t: '(Weitergehen.)', dann: [['jo', 'Dann halt nicht.']] },
      ] });
      return z;
    },
    // Was in der Pause ohne dich passiert ist (ein Satz, kein Vorwurf)
    n5_hofAuch: () => (M().pause5Noah ? [] : [['erzaehler', 'Später: Mme Sabli hat Noah reingeholt. Er hatte Schnee im Kragen.']]),
    // CDI: offene Krimi-Fäden, der Preis von „posten“ wird vorher sichtbar, zweite Chance für das grüne Schild
    n5_cdiDanach: () => {
      const m = M(), z = [];
      if (m.k5NoahLasst || m.k5NoahDaneben) z.push({ handy: { wer: 'Noah (privat)', wann: '12:44', text: 'du warst da. montag. 👍' } }, { handy: null });
      if (!m.k5Schild && !m.spurGruen) z.push(['mila', 'Das Foto von 8:34. Oben rechts. Schau.'],
        { szene: 'suchbild', id: 'k5Foto834c', pruefe: false, def: { wo: 'Milas Handy · CDI', bildId: 'k4Foto834', gespeichertZuerst: true, foto: { von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },
            gruen: true, streifen: true, frage: 'Tipp auf das Grüne im Glas.', zeit: 14, finde: 1, kreis: { x: 86, y: 10, r: 12 }, gut: 'Das Notausgang-Schild. Im Gang.', verpasst: 'Gelb: das Schild.',
            ziele: [{ id: 'gruen', x: 0.865, y: 0.095, r: 0.09, t: 'Grünes Licht im Glas: das Notausgang-Schild im Gang.', kurz: 'Grün im Glas: der Gang.' }] },
          ausgang: () => 'ja', folgen: { ja: { merke: 'k5Schild', dann: [['mila', 'Das Foto ist von draußen. Durch die Tür.'], { beweis: 'k5Draussen', t: 'Das Foto von 8:34 ist von draußen: grünes Schild im Glas.' }] } } });
      if (m.spurZettelKenan || m.spurZettel) z.push(['mila', 'Kenan stand um 8:31 am Glas. Um 8:34? Weiß keiner.']);
      if (m.k4DarioZettel) z.push(['du', '(denkt) Dario wusste: Der Zettel ist gelb.']);
      if (m.k4ZettelLassen) z.push(['mila', 'Lina sagt, der Zettel hing nach der Pause noch.']);
      z.push(['mila', 'Wenn das in den Chat kommt, fragen alle: Wer war draußen?'], ['mila', 'Ich zeig das Herrn Kuedes. Nicht dem Chat.']);
      return z;
    },
    // Nach der Abstimmung: Chiaras Sicht, ein Erwachsener (Kuedes vorher, sonst Tidderich danach), unter vier Augen, Hilfe-Nummern
    n5_nachChat: () => {
      const m = M(), raus = m.k5Rausgeflogen, z = [];
      if (m.k5ChatStumm && raus) z.push(['erzaehler', 'Später, auf dem Handy: „Chiara hat ' + (raus === 'du' ? 'dich' : 'Noah') + ' aus der Gruppe entfernt.“']);
      if (!m.k5Geprueft) z.push({ handy: { wer: 'Ayla · privat', wann: '13:38 · ungelesen', chat: [{ wer: 'Ayla', t: 'bin nicht dafür. weiß nicht was schreiben.' }] } }, ['du', '(denkt) Die war die ganze Zeit da. Ungelesen.'], { handy: null });
      const chiaraSicht = [{ foto: 'k5Chiara', von: [11.15, 1.35, -59.3], auf: [11.15, 1.0, -60.65], fov: 42 },
        { sicht: { wer: 'chiara', auf: 'du', gedanken: ['Mittwoch, 13:29. Mein Daumen über „Umfrage starten“.', 'Wenn ich nichts mache, bin ich die Nächste.'] } }];
      if (raus !== 'du') z.push(...chiaraSicht);
      if (m.k5ChatKuedes) {
        z.push({ hin: { kaya: [14.0, -56.2, Math.PI] } }, ['kaya', '(in der Tür) Die Umfrage ist zu. Ich hab sie gesehen.'], ['kaya', '(leise, zu dir) Danke für den Screenshot. Du musst nichts beweisen.']);
        if (m.k5KuedesSpuren) z.push(['kaya', 'Die Spuren nehm ich mit zur Direktion.']);
        z.push(['kaya', 'Wenn’s im Chat fies wird: Screenshot, zu mir oder ins SePAS. Abends: 116 111.']);
      } else {
        z.push({ hin: { hoffmann: [14.0, -56.2, Math.PI] } }, ['hoffmann', '(in der Tür) Handys bitte auf den Tisch. Kurz.'], ['hoffmann', 'Ich hab die Umfrage gesehen. Sie ist jetzt zu.'],
          ['hoffmann', 'Den Account hab ich gemeldet. Wer was weiß: zu mir oder zu Herrn Kuedes.'], ['hoffmann', 'Wenn’s im Chat fies wird: Screenshot, zu mir oder ins SePAS. Abends: 116 111.']);
        m.k5Tidderich = true;
        if (raus === 'du') z.push(['hoffmann', '(leise) {name}, kommst du kurz? Du musst nichts beweisen.'], { handy: { wer: '7P2 🏫', wann: '14:20', chat: [{ wer: '7P2', t: 'Ayla hat dich wieder hinzugefügt.' }] } }, { handy: null });
        if (raus === 'noah') z.push(['hoffmann', '(leise) Noah, kommst du kurz mit?'], ['erzaehler', 'Um 14:20 holt Ayla Noah zurück in den Chat.']);
        if (m.k5ChatGepostet && !m.k5KenanGeschuetzt) z.push(['hoffmann', 'Und das Foto von 8:34 ist jetzt überall. Mit der ganzen Klasse drauf.'], ['hoffmann', '(zu dir) Gut hingeschaut. Falscher Ort. Gib’s mir nächstes Mal.']);
        if (m.k5ChatVerlassen) z.push(['kaya', '(später, im Gang) Gut, dass du raus bist. Alles okay?'], ['mila', '(schreibt dir) Ich schick dir, was wichtig ist.']);
      }
      if (m.k5Verteidigt && zielDu5(m)) z.push([m.k5ChatKuedes ? 'kaya' : 'hoffmann', '(leise, zu dir) Dass du’s geschrieben hast: in Ordnung. Die Ja-Stimmen liegen nicht an dir.']);
      if (raus === 'du') z.push(...chiaraSicht);
      if (m.k5ChiaraNein) z.push(['erzaehler', 'Chiara schaut nicht zu dir rüber. Ihr Bein wippt.']);
      return z;
    },
    // Eisbahn: wer am Rand steht · Yusufs Bruder · Manon
    n5_eisRand: () => {
      const m = M(), z = [];
      z.push(['erzaehler', m.k5Rausgeflogen === 'noah' ? 'Am Rand, an der Bande: Noah. Seit Mittwoch ist er still.' : 'Am Rand, an der Bande: Noah. Allein.']);
      z.push({ wahl: [
        { t: '„Komm. Eine Runde.“', merke: 'k5NoahGeholt', staerke: 'mut', herz: { noah: 3 }, dann: [['noah', '(zögert) … Nur langsam.'], ['erzaehler', 'Ihr fahrt eine Runde. Langsam. Noah lacht einmal. Kurz.']] },
        { t: '(Winken.)', merke: 'k5NoahGewunken', herz: { noah: 1 }, dann: [['noah', '(winkt zurück)']] },
        { t: '(Weiterfahren.)', merke: 'k5NoahRand', dann: [] },
      ] });
      if (m.k3BruderVerraten) z.push(['yusuf', '(kommt neben dich, außer Atem)'], { wahl: [
        { t: '„Das mit deinem Bruder: sorry.“', merke: 'k5YusufSorry', herz: { yusuf: 3 }, dann: [['yusuf', '(lange still) … Hat gedauert. Aber okay.']] },
        { t: '(Nichts sagen.)', merke: 'k5YusufStill', dann: [['yusuf', 'Nächste Woche: Revanche.']] },
      ] });
      if (m.k5ManonEingeladen) z.push(['manon', '(hält sich an der Bande fest) Je ne sais pas patiner.'], { wahl: [
        { t: '„Erst an der Bande. Komm.“', merke: 'k5ManonEis', herz: { manon: 2 }, dann: [['manon', '(rutscht, lacht) Merci !']] },
        { t: '(Später.)', dann: [['manon', 'D’accord.']] },
      ] });
      return z;
    },
    // Freitag: 20 Sekunden durch die Augen der Person, die rausgeflogen ist
    n5_sichtRaus: () => {
      const m = M();
      if (m.k5Rausgeflogen !== 'noah') return [];
      return [{ sicht: { wer: 'noah', auf: 'du', gedanken: ['Mittwoch: raus aus dem Chat.', m.k5NoahGeholt ? 'Heute: eine Runde auf dem Eis. Langsam.' : m.k5NoahGeglaubt ? '„ich glaub dir.“ Hab ich noch.' : 'Heute: am Rand.'] } }];
    },
    // Busfenster: der alte Satz der Woche – wegwischen – was du wirklich gesehen hast
    n5_fenster: async () => {
      const m = M(), g = m.k5TuerGefunden || [];
      const bilder = [
        { id: 'mila', t: 'Mila hat gewinkt.', satz: 'Zwei haben geschaut. Mila hat gewinkt.', da: g.includes('mila') },
        { id: 'ayla', t: 'Ayla: „bin nicht dafür.“', satz: 'Ayla war nicht dafür. Ich war nicht allein.', da: !!(m.k5Ayla || !m.k5Geprueft) },
        { id: 'foto', t: 'Das Foto ist von draußen.', satz: 'Das Foto ist von draußen.', da: !!m.k5Schild },
        { id: 'eis', t: 'Auf dem Eis: keiner hat gelacht.', satz: 'Gelacht hat keiner.', da: !!m.k5EisGeprueft },
      ];
      const r = await c.ui.busfenster({ alt: 'Alle denken, ich bin’s.', wort: 'alle', bilder });
      const ges = (r && r.gesehen) || [];
      m.k5FensterGesehen = ges.length;
      const erster = ['ayla', 'mila', 'eis', 'foto'].map((id) => bilder.find((b) => b.id === id && ges.includes(id))).find(Boolean);
      m.k5Satz = erster ? erster.satz : 'Zwei haben geschaut. Nicht alle.'; m.k5SatzAlt = 'Alle denken, ich bin’s.';
      return [];
    },
    n5_eisCheck: () => {
      const m = M(), fiel = (m.k5RennenGefallen || 0) > 0;
      return [{ handy: { wer: '📷 Kamera-Check', wann: 'Eisbahn', chat: [{ wer: 'Echt', t: fiel ? 'Einmal hingefallen.' : 'Durchgefahren.' }, { wer: 'Gelacht', t: '0' }, { wer: 'Ayla', t: fiel ? '„Uff.“' : 'klatscht' }] } },
        ['du', '(denkt) Alle? Keiner.'], { handy: null }];
    },
  };
  return T;
};
