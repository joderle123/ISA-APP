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
// Was im Chat um 13:12 ankommt (dreimal weitergeleitet). Mit 📎 von Lina wird es kleiner, mit „Klar.“ größer.
const KETTE = (m) => { const w = zielDu5(m) ? '{name}' : 'noah';
  return m.k5LouKlar ? w + ' hat das foto gemacht. sogar {name} sagt das. sicher.' : m.k5LouLina ? w + ' war auf dem gang?? lina sagt nur gang' : m.k5LouGefragt ? w + ' war draußen. sicher.' : w + ' ist der admin. sicher.'; };
const STILLE_POST = (m) => { const w = zielDu5(m) ? '{name}' : 'noah', du = zielDu5(m);
  // Was du Lou sagst, wandert weiter: „Klar.“ wird zu „sogar {name}“, „Woher?“ wird zu „hab’s gehört“ – und das fällt unterwegs weg
  const lou = m.k5LouKlar ? w + ' war beim foto draußen. {name} sagt das auch' : m.k5LouGefragt ? w + ' war draußen. hab ich gehört' : m.k5LouNein && du ? '{name} sagt nein. naja 👀' : w + ' war beim foto draußen';
  const pit = m.k5LouKlar ? w + ' hat das foto gemacht. sogar {name} sagt das' : m.k5LouGefragt ? w + ' war draußen' : w + ' hat das foto gemacht';
  return [{ wer: 'Lina · Mo', t: w + ' war um halb neun auf dem gang. hab ich gesehen' }, { wer: 'Lou → Pit · 12:43', t: lou },
    { wer: 'Pit → Jo · 12:58', t: pit }, { wer: 'Jo → 7P2 · 13:12', t: w + ' ist der admin. sicher.' }]; };

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
    leute: { mila: [-8.0, -21.9, 0.4, 'sitzt'], lina: [-11.0, -21.9, 0, 'sitzt'] },   // am Lesetisch, auf Stühlen (vorher auf dem Couchtisch – saß auf dem Boden)
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
      { wer: 'Jo', text: '↪ weitergeleitet ×3 · ' + KETTE(m), nach: 0.1 },
      { wer: 'Chiara', umfrage: { frage: du ? 'wer glaubt, es ist {name}?' : 'wer glaubt, es ist noah?', optionen: [{ id: 'ja', t: 'Ja' }, { id: 'nein', t: 'Nein' }, { id: 'weiss', t: 'Weiß nicht' }] }, nach: 0.4 },
      { stimme: { opt: m.k5Schneemann ? 'weiss' : 'ja', wer: 'Jo' }, nach: 2 },
      { wer: 'Jo', text: m.k5Schneemann ? 'keine ahnung ehrlich' : 'endlich fragt mal wer 😂', nach: 2.6 },
      { stimme: { opt: m.k5LouGefragt || m.k5LouLina ? 'weiss' : 'ja', wer: 'Lou' }, nach: 4.4 },
      { stimme: { opt: 'weiss', wer: 'Lina' }, nach: 5.4 },
      { stimme: { opt: m.k5BenGefragt ? 'weiss' : 'ja', wer: 'Ben' }, nach: 6.4 },
      ...(m.k5BenGeruecht ? [{ system: '💬 Ben (privat): hab ja gedrückt. du hast ja gesagt bestimmt', nach: 6.9 }] : []),
      { stimme: { opt: 'nein', wer: 'Mila' }, nach: 7.2 },
      { stimme: { opt: 'ja', wer: 'Tim' }, nach: 11, wennNicht: 'zu' },
      { wer: 'Lou', text: m.k5LouLina ? 'lina sagt nur gang. weiß nicht' : m.k5LouGefragt ? 'hab’s nur gehört. weiß nicht' : m.k5LouKlar ? '{name} sagt das auch 😎' : du ? 'hinten links. sag ich nur 👀' : 'noah war doch um halb neun draußen', nach: 12.2, wennNicht: 'zu', setzt: 'louZitat' },
      ...(m.k5TuerMal ? [{ wer: 'Jo', text: 'der mit der lauten tasche 😂', nach: 9.8, wennNicht: 'zu', setzt: 'taschenZitat' }] : []),
      ...(m.k5BeweisFrage ? [{ wer: 'Lina', text: '{name} hat montag gefragt: beweis für was?', nach: 8.2, wennNicht: 'zu', setzt: 'linaZitat' }] : []),
      ...(m.k5BeweisAugen ? [{ wer: 'Jo', text: 'sogar {name} hat 👀 gedrückt', nach: 8.8, wennNicht: 'zu', setzt: 'augenZitat' }] : []),
      ...(m.k5NoahLasst && !du ? [{ wer: 'Jo', text: '{name} = admin-freund 👀', nach: 13.2, wennNicht: 'zu', setzt: 'freundZitat' }] : []),
      { stimme: { opt: m.k5BeweisFrage ? 'nein' : 'weiss', wer: 'Yusuf' }, nach: 14, wennNicht: 'zu' },
      { system: 'Umfrage beendet. Ja: die meisten Stimmen.', nach: 21, wennNicht: 'zu', setzt: 'beendet' },
      { system: du ? 'Chiara hat dich aus der Gruppe entfernt.' : 'Chiara hat Noah aus der Gruppe entfernt.', nach: 22, wennNicht: 'zu', setzt: 'raus' },
    ],
    // Mme Tidderich in der Tür (Jugend-Panel R3): Entscheidung statt Vortrag. Zeit um = sofort hinlegen.
    stoerung: { ab: 15.5, zeit: 4, standard: 'hin', wennNicht: ['zu', 'verlassen', 'stumm'], t: 'Mme Tidderich steht in der Tür. „Handys auf den Tisch.“',
      optionen: [
        { id: 'screen', t: '📸 Screenshot. Dann hinlegen.', setzt: ['tidScreen', 'zu'], sys: '📸 Screenshot gespeichert.', ende: true },
        { id: 'hin', t: '(Sofort hinlegen.)', setzt: 'tidHin', sys: 'Du legst das Handy hin.', ende: true },
        { id: 'weiter', t: '(Unterm Tisch weiter.)', setzt: 'tidWeiter' },
      ] },
    blase: { ab: 8.5, t: du ? 'Alle sind gegen mich.' : 'Alle glauben’s.', gehoert: m.k5LouGefragt || m.k5LouLina ? 'Jo' : 'Lou, Jo', echt: du ? 'Eine Umfrage über dich. Nicht okay.' : 'Eine Umfrage über Noah. Nicht okay.',
      kopf: 'Gesehen heißt nicht: Ja gedrückt.', ungelesen: { wer: 'Ayla', t: 'bin nicht dafür. weiß nicht was schreiben.', setzt: 'ayla' } },
    aktionen: [
      { id: 'schreiben', symbol: '✍️', t: 'Schreiben', wahl: [
        { t: du ? '„Ich war’s nicht.“' : '„Noah war’s nicht.“', ich: du ? 'ich war’s nicht.' : 'noah war’s nicht.', setzt: 'verteidigt',
          folgen: [{ wer: 'Jo', text: du ? 'wer sich verteidigt … 👀' : 'wer ihn verteidigt … 👀', nach: 1.2 }, { stimme: { opt: 'ja', wer: 'Pit' }, nach: 2 }, { stimme: { opt: 'ja', wer: 'Elena' }, nach: 2.8 }, { stimme: { opt: 'ja', wer: 'Tom' }, nach: 3.6 }] },
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
    ['erzaehler', 'Januar. Eiskalt. Darios Platz ist leer.'],
    { foto: 'k5Bank', von: [-18.4, 1.5, 44.6], auf: [-22.0, 0.6, 41.6], fov: 50 },
    { tu: 'n5_ferienUmfrage' },
    ['nik', '(von der Bank) Moien. Dein Kollege war schon da. Mit dem Brett.'],
    ['nik', 'Dann ist er wieder gegangen. Ganz schnell.'],
    { gerd: [-15.95, 0.17, 41.95] },   // auf dem Gehweg (der liegt höher als die Straße)
    ['erzaehler', 'Gerd landet vor dir. Er pickt. An deinem Schuh.'],
    { szene: 'blase', id: 'k5BlaseBank', pruefe: false, def: { t: 'Nicht mal die Taube mag mich.', stufe: 'gefuehrt' },
      ausgang: () => 'ja', folgen: { ja: { dann: [] } } },
    { szene: 'suchbild', id: 'k5CheckBank', pruefe: false,
      def: { wo: 'Haltestelle · 7:27', echt: 'Gerd pickt an deinem Schuh.', frage: 'Was hätte eine Kamera gesehen? Tipp drauf.', zeit: 14, finde: 1,
        foto: { von: [-17.0, 1.0, 40.8], auf: [-15.75, 0.12, 42.15], fov: 38 },   // von vorn auf Schuh und Gerd (vorher stand die Kamera im Kopf der Spielfigur)
        ergebnis: 'Kopf: „mag mich nicht“. Kamera: Krümel.',
        ziele: [{ id: 'kruemel', wo: [-15.95, 0.32, 41.95], r: 0.14, t: 'Gerd pickt Krümel. Vom Brötchen.', kurz: 'Krümel am Schuh.' }] },
      ausgang: (r, m) => { m.k5GerdDa = (m.k5GerdDa || 0) + 1; if ((r.gefunden || []).includes('kruemel')) m.k5GerdGesehen = (m.k5GerdGesehen || 0) + 1; m.k5CheckBank = true; return 'ja'; },
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
      ausgang: (r, m) => { if (r.geprueft) m.k5TuerSelbst = true; return r.geprueft ? 'geprueft' : 'weiter'; },
      folgen: { geprueft: { dann: [['du', '(denkt) Gleich. Erst durch die Tür.']] }, weiter: { dann: [] } } },
    { szene: 'schnitt', pruefe: false, def: { kopf: '1 · „Alle denken, ich bin’s.“', bild: TUER_BODEN, t: 'Kapuze auf. Bauch zu. Blick auf den Boden. Schnell auf den Platz.', ms: 4300 } },
    ['erzaehler', 'Jemand lacht. Du schaust nicht hoch. Du sitzt allein.'],
    { tu: 'n5_spulen' },
    ['du', '(denkt) Gleiche Tür. Anderer Gedanke?'],
    { fest: true, wahl: [
      { t: '„Die können mich mal.“', merke: 'k5TuerMal', dann: [
        { szene: 'schnitt', pruefe: false, def: { kopf: '2 · „Die können mich mal.“', bild: TUER_KLASSE, t: 'Kiefer fest. Kopf hoch. Tasche laut auf den Tisch.', ms: 4600 } }] },
      { t: '„Nur ’ne blöde Umfrage.“', merke: 'k5TuerUmfrage', dann: [
        { szene: 'schnitt', pruefe: false, def: { kopf: '2 · „Nur ’ne blöde Umfrage.“', bild: TUER_KLASSE, t: 'Schultern locker. Kopf hoch. Du gehst ganz normal rein.', ms: 4600 } }] },
    ] },
    ['du', '(denkt) Moment. Wer hat wirklich geschaut?'],
    { gerd: [-25.4, 0.12, -21.2] },
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
          { id: 'gerd', wo: [-25.4, 0.3, -21.2], bonus: true, r: 0.1, kurz: 'Gerd. Im Klassenzimmer?!' },
        ] }),
      ausgang: (r, m) => { m.k5TuerZahl = (r.gefunden || []).length; m.k5TuerGefunden = r.gefunden || []; m.k5CheckTuer = true; m.k5GerdDa = (m.k5GerdDa || 0) + 1; if ((r.bonus || []).length) m.k5GerdGesehen = (m.k5GerdGesehen || 0) + 1; return 'ja'; },
      folgen: { ja: { dann: [] } } },
    { gerd: null },
    { wenn: (m) => !!m.k5TuerMal, dann: [['jo', 'Uuh. Guten Morgen auch.'], ['mila', 'Laut. Aber hier ist frei.']], sonst: [['mila', 'Hier. Neben mir ist frei.']] },
    ['ben', '(lacht aufs Handy, zeigt Yusuf) Die Katze! Schon wieder.'],
    ['du', '(denkt) Das Lachen vorhin. Das war die Katze.'],
    // Halt am Montag: ein Erwachsener hat die Umfrage gesehen
    ['hoffmann', 'Moien. Kurz, bevor wir anfangen.'],
    ['hoffmann', 'Die Umfrage von Sonntag habe ich gesehen. Die zählt hier nicht.'],
    ['hoffmann', 'Wer etwas weiß: zu mir. Nicht in den Chat.'],
  ],

  // 3 · Montag 8:05: Culture générale
  n5_cg: [
    { hin: { du: [-17.0, -21.6, -Math.PI / 2] } },   // im Saal, hinten (nicht mehr an der Tür im Gang)
    ['rantini', 'Bonjour. Culture générale. Seite zwölf, bitte.'],
    ['erzaehler', 'Unter dem Tisch vibriert dein Handy.'],
    // Ein Kopf, zwei Reaktionen, sechs gesehen – und schon heißt es „Beweis“. Ein Emoji ist auch eine Stimme.
    { handy: { wer: '7P2 🏫', wann: '8:09', chat: [{ wer: 'Jo', t: 'beweis 👀' }, { wer: 'Jo', t: '📷 Ein Kopf. Unscharf.' }, { wer: 'Lou', t: '👀' }, { wer: 'Pit', t: '😂' }, { wer: '7P2', t: 'gesehen von 6' }] } },
    { szene: 'blase', id: 'k5BlaseBeweis', pruefe: false, def: { t: 'Jetzt glauben’s alle.', stufe: 'frei', zeit: 6 },
      ausgang: (r, m) => { m.k5BeweisGeprueft = !!(r && r.geprueft); return m.k5BeweisGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [['du', '(denkt) Zählen. Wie viele haben reagiert?'],
        { fest: true, wahl: [
          { t: 'Alle.', dann: [['du', '(denkt) Das sagt der Kopf.']] },
          { t: 'Sechs.', dann: [['du', '(denkt) Sechs haben es gesehen. Reagiert hat weniger.']] },
          { t: 'Zwei.', merke: 'k5BeweisBenannt', dann: [] },
        ] },
        { handy: { wer: '📷 Kamera-Check', wann: '8:09', chat: [{ wer: 'Echt', t: '2 Reaktionen. 6 gesehen.' }, { wer: 'Geglaubt?', t: 'Steht nirgends.' }, { wer: 'Wessen Kopf?', t: 'Steht auch nirgends.' }] } }] }, nein: { dann: [] } } },
    { szene: 'stoerung', id: 'k5Rantini', pruefe: false,
      def: { t: 'Mme Rantini kommt durch die Reihe. Noch zwei Tische.', zeit: 4, standard: 'weg',
        optionen: [{ id: 'frage', t: '„Beweis für was?“' }, { id: 'augen', t: '👀 drücken.' }, { id: 'weg', t: '(Handy weg.)' }] },
      ausgang: (r) => r.wahl || 'weg',
      folgen: {
        frage: { merke: 'k5BeweisFrage', staerke: 'klar', dann: [
          { handy: { wer: '7P2 🏫', wann: '8:10', chat: [{ wer: 'Jo', t: 'beweis 👀' }, { wer: 'Du', t: 'beweis für was?' }, { wer: 'Lina', t: 'ich seh nur nen kopf' }] } },
          ['rantini', '(steht neben dir, Hand auf) Merci. Bis zur Pause.'], { handy: null },
          ['erzaehler', 'Dein Handy liegt vorne auf dem Pult. Lina schaut kurz zu dir.']] },
        augen: { merke: 'k5BeweisAugen', dann: [
          { handy: { wer: '7P2 🏫', wann: '8:10', chat: [{ wer: 'Jo', t: 'beweis 👀' }, { wer: '👀 3', t: 'Lou, Pit, {name}' }] } },
          ['rantini', '(steht neben dir, Hand auf) Merci. Bis zur Pause.'], { handy: null },
          ['erzaehler', 'Dein Handy liegt vorne auf dem Pult. Unter „👀“ steht jetzt auch dein Name.']] },
        weg: { merke: 'k5BeweisWeg', dann: [{ handy: null }, ['erzaehler', 'Du steckst das Handy weg. Mme Rantini geht vorbei.']] },
      } },
  ],

  // 4 · Montag 9:50: Pause = ein Ort
  n5_hofStart: [
    { wenn: (m) => !!(m.k5BeweisFrage || m.k5BeweisAugen), dann: [['rantini', '(gibt dir dein Handy zurück) Bis zur Pause, hab ich gesagt. Voilà.']] },
    ['erzaehler', 'Pause. Irgendwo ruft jemand „Admin!“.'],
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
    ['erzaehler', 'Es klingelt. Alle rennen rein.'],
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
    { wenn: (m) => zielDu5(m), dann: [['mila', 'Die Umfrage über dich am Sonntag: nicht okay. Nur damit du’s weißt.']] },
    { wenn: (m) => zielDu5(m), dann: [['lina', '(schaut von ihrem Buch hoch) Ich hab dich am Montag nur auf dem Gang gesehen. Halb neun. Mehr nicht.']],
      sonst: [['lina', '(schaut von ihrem Buch hoch) Ich hab Noah am Montag nur auf dem Gang gesehen. Halb neun. Mehr nicht.']] },
    { beweis: 'k5LinaGang', t: 'Lina hat nur gesehen: auf dem Gang, halb neun. Mehr nicht.' },
    ['erzaehler', 'Dein Handy summt. Lou. Privat.'],
    { tu: 'n5_louFragt' },
    { tu: 'n5_cdiDanach' },
  ],

  // 6 · Mittwoch 13:30: die Abstimmung
  n5_abstimmung: [
    { wenn: (m) => !!m.k5TuerUmfrage, dann: [['mila', '(setzt sich neben dich) Hier ist frei. Wie Montag.']] },
    ['erzaehler', 'Lesesaal. Freistunde. Ben schaut kurz zu dir rüber. Dann aufs Handy.'],
    { tu: 'n5_benFrage' },
    ['erzaehler', 'Dann summen alle Handys gleichzeitig.'],
    { foto: 'k5Lesesaal', von: [14.0, 1.7, -56.4], auf: [12.0, 0.9, -60.6], fov: 60 },
    { szene: 'chat', id: 'k5Umfrage', pruefe: false, def: (m) => UMFRAGE(m),
      ausgang: (r, m) => {
        const f = r.flags || {}; m.k5Geprueft = !!f.geprueft; m.k5PruefZahlen = f.pruefZahlen || null; m.k5Ayla = !!f.ayla; m.k5ChatStimmen = r.stimmen || null;
        if (f.noahGeglaubt) m.k5NoahGeglaubt = true; if (f.tidScreen) m.k5TidScreen = true; if (f.tidHin) m.k5TidHin = true; if (f.tidWeiter) m.k5TidWeiter = true; if (f.nein) m.k5NeinGedrueckt = true; if (f.verteidigt) m.k5Verteidigt = true; if (f.aylaDanke) m.k5AylaDanke = true;
        if (f.chiaraStopp || f.chiaraNein) m.k5ChiaraGefragt = true; if (f.chiaraNein) m.k5ChiaraNein = true; if (f.kuedesSpuren) m.k5KuedesSpuren = true;
        if (f.kenanSicher) m.k5KenanGeschuetzt = true; if (f.kenanGejagt) m.k5KenanGejagt = true; m.k5ChatZitate = { lou: !!f.louZitat, lina: !!f.linaZitat, augen: !!f.augenZitat, tasche: !!f.taschenZitat, freund: !!f.freundZitat };
        m.k5Rausgeflogen = !f.zu && !(f.verlassen && zielDu5(m)) ? (zielDu5(m) ? 'du' : 'noah') : null;
        return f.kuedes ? 'kuedes' : f.tidScreen ? 'screen' : f.chiaraStopp ? 'chiara' : f.zuZweit ? 'zuzweit' : f.gepostet ? 'gepostet' : f.verteidigt ? 'verteidigt' : f.nein ? 'nein' : f.noahGeglaubt ? 'geglaubt' : f.verlassen ? 'verlassen' : f.stumm ? 'stumm' : f.tidHin ? 'hingelegt' : 'abgewartet';
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
        screen: { merke: 'k5ChatScreen', staerke: 'klar', dann: [{ tu: 'n5_nachChat' }] },
        hingelegt: { merke: 'k5ChatHingelegt', dann: [{ tu: 'n5_nachChat' }] },
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
    { fest: true, wahl: [
      { t: '(Loslassen. Probieren.)', merke: 'k5Losgelassen', staerke: 'mut', dann: [] },
      { t: '(Erst an der Bande.)', merke: 'k5Bande', dann: [['ayla', 'Auch gut. Hand an die Bande.']] },
    ] },
    { szene: 'eisrennen', id: 'k5Rennen', pruefe: false, def: (m) => ({ gegner: { name: 'Yusuf', farbe: '#2e86de' }, vorsichtig: !!m.k5Bande }),
      ausgang: (r, m) => { m.k5RennenSieg = !!r.gewonnen; m.k5RennenGefallen = r.gefallen || 0; m.k5RennenSek = r.sek ? Math.round(r.sek * 10) / 10 : null; return r.gewonnen ? 'sieg' : 'nicht'; },
      folgen: {
        sieg: { dann: [['yusuf', 'Was?! Revanche. Nächste Woche.'], ['erzaehler', 'Yusuf baut den Schneemann fertig. Mit Mütze.']] },
        nicht: { dann: [['yusuf', '(grinst) Schneemann. Los.'], ['erzaehler', 'Du rollst die Kugeln. Ayla setzt die Nase.']] } } },
    // Die Vorhersage prüfen – erst jetzt, nach dem Rennen (vorher sieht keine Kamera etwas)
    { szene: 'blase', id: 'k5BlaseEis', pruefe: false, def: (m) => ({ t: (m.k5RennenGefallen || 0) > 0 ? 'Alle haben gelacht.' : m.k5RennenSieg ? 'Glück gehabt. Zählt nicht.' : 'Ich kann das nicht.', stufe: 'frei', zeit: 5 }),
      ausgang: (r, m) => { m.k5EisGeprueft = !!(r && r.geprueft); return m.k5EisGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [{ tu: 'n5_eisCheck' }] }, nein: { dann: [] } } },
    { wenn: (m) => (m.k5RennenGefallen || 0) > 0, dann: [['ayla', '(hilft dir hoch) Uff. Alles gut?']] },
    { wenn: (m) => !!m.k5Losgelassen, dann: [['ayla', '(klatscht) Ohne Bande! Hab ich gesehen.']] },
    { tu: 'n5_eisRand' },
  ],

  // 8 · Freitag 17:00: Haltestelle
  n5_freitagStart: [
    { tu: 'n5_noahBank' },
    { sicht: { wer: 'dario', auf: 'du', gedanken: ['Gegenüber. Hände in den Ärmeln.', 'Ich weiß, dass du’s nicht warst.'] } },
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
      { t: '„Weißt du, wer der Admin ist?“', merke: 'k5DarioAdminFrage', dann: [['dario', '(schaut auf die Straße) Nein. … Der Bus kommt.'], { verdacht: 'dario', spur: 'Freitag: „Nein.“ Blick auf die Straße.' }] },
    ] },
    { hin: { dario: [-19.0, 48.6, Math.PI] } },
    ['dario', '(nickt zur Straße) Dein Bus. Geh. Meiner kommt später.'],
    { blende: 'Im Bus · 17:04' },
    { handy: (m) => ({ wer: 'Dario', wann: '17:09', chat: [{ wer: 'Dario', t: (m.k5DarioAdminFrage ? 'vergiss die frage. ' : m.k5DarioBesser ? 'danke fürs fragen. ' : '') + 'montag zeig ich dir was. eine sprachnachricht. von jo.' }] }) },
    { handy: null },
    // Das kleine 📷 – ohne Hilfe. Nur hier zeigt sich, ob der Check von selbst kommt.
    { szene: 'blase', id: 'k5BlaseJo', pruefe: false, def: { t: 'Jo lästert über mich.', stufe: 'klein', zeit: 5 },
      ausgang: (r, m) => { m.k5FreitagGeprueft = !!(r && r.geprueft); return m.k5FreitagGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [['du', '(denkt) Was sieht die Kamera?'],
        { fest: true, wahl: [
          { t: 'Eine Nachricht. Nicht gehört.', merke: 'k5FreitagBenannt', dann: [] },
          { t: 'Jo lästert.', dann: [['du', '(denkt) Das sagt der Kopf. Echt: eine Nachricht. Noch nicht gehört.']] },
          { t: 'Dario will Ärger.', dann: [['du', '(denkt) Das sagt der Kopf. Echt: eine Nachricht. Noch nicht gehört.']] },
        ] }] }, nein: { dann: [] } } },
    // Die Lücke im Kopf will gefüllt werden – wie man fragt, hat einen Preis (Heft #04, Stunde 1: Wen könnte ich fragen?)
    { fest: true, wahl: [
      { t: 'Dario: „Was ist drauf?“', merke: 'k5HoerenDario', dann: [{ handy: { wer: 'Dario', wann: '17:10', chat: [{ wer: 'Du', t: 'was ist drauf?' }, { wer: 'Dario', t: 'nicht im chat. montag.' }] } }, { handy: null }] },
      { t: 'Jo: „Was soll das?“', merke: 'k5HoerenJo', herz: { dario: -1 }, dann: [{ handy: { wer: 'Jo', wann: '17:10', chat: [{ wer: 'Du', t: 'was soll das?' }, { wer: 'Jo', t: '?? was soll was' }] } },
        ['erzaehler', 'Zwei Minuten später summt es wieder.'], { handy: { wer: 'Dario', wann: '17:12', chat: [{ wer: 'Dario', t: 'hast du jo geschrieben?? jetzt weiß er’s.' }] } }, { handy: null }] },
      { t: '„Montag. Erst hören.“', merke: 'k5HoerenMontag', staerke: 'ruhig', dann: [['erzaehler', 'Du atmest gegen die Scheibe. Sie beschlägt. Du schreibst nichts hinein.']] },
      { t: '(Handy weg.)', merke: 'k5HoerenWeg', dann: [['erzaehler', 'Du steckst das Handy in die Jacke.']] },
    ] },
    { tu: 'n5_satz' },
    ['du', '(denkt) „von jo“. Montag.'],
    { tu: 'kapitelEnde' },
  ],
};

// ---------- Rückblick in Bildern (Kapitelende, Lehrer-Ansicht) ----------
export const RUECKBLICK_N5 = (m) => [
  { id: 'k5Bank', titel: 'Die leere Bank', text: 'Darios Platz war leer. ' + (m.k5DarioKuedes ? 'Du hast es Herrn Kuedes gesagt.' : 'Herr Kuedes hat selbst nachgefragt.') },
  { id: 'k5Tuer', titel: 'Die Tür', text: '„Alle denken, ich bin’s.“ ' + (m.k5TuerMal ? 'Zweiter Gedanke: „Die können mich mal.“ ' : m.k5TuerUmfrage ? 'Zweiter Gedanke: „Nur ’ne blöde Umfrage.“ ' : '') + 'Kamera: 2 haben geschaut.' },
  { id: 'k5Hof', titel: 'Admin!', text: m.pause5Noah ? (m.k5NoahLasst ? 'Du hast gesagt: „Lasst ihn.“' : m.k5NoahDaneben ? 'Du hast dich neben Noah gestellt.' : m.k5AdminWeg ? 'Du warst da. Dann bist du weitergegangen.' : 'Du warst bei Noah.') : m.pause5Chiara ? 'Du warst bei Chiara. „wer glaubt, es ist …“ – gelöscht.' : m.pause5Jo ? (m.k5Schneemann ? 'Du hast mit Jo den Schneemann gebaut.' : 'Du warst bei Jo. Er hat gescrollt.') : m.pause5Manon ? (m.k5ManonErklaert ? 'Du hast Manon erklärt, was „Admin“ heißt.' : 'Manon hat gefragt, was „Admin“ heißt.') : 'Pause im Schnee.' },
  { id: 'k5Lesesaal', titel: 'gesehen von ' + (m.k5PruefZahlen ? m.k5PruefZahlen.gs : 9), text: (m.k5Geprueft ? 'Geprüft: ' + (m.k5PruefZahlen ? m.k5PruefZahlen.ja + ' Ja, ' + m.k5PruefZahlen.gs + ' gesehen. ' : 'ein paar Ja, viele nur gesehen. ') : '') + (m.k5ChatKuedes ? 'Screenshot an Herrn Kuedes. Er kam, bevor jemand rausflog.' : m.k5ChatChiara ? 'Du hast Chiara geschrieben. Sie hat aufgehört.' : m.k5ChatZuZweit ? 'Ayla und du: Nein. Die Umfrage war vorbei.' : m.k5ChatGepostet ? 'Du hast das Foto gepostet. Dann hieß es: „Wer war draußen?“' : m.k5ChatVerteidigt ? 'Du hast geschrieben: „' + (m.k5ZielDu ? 'Ich' : 'Noah') + ' war’s nicht.“ Danach drei Ja. ' + (m.k5BenGeruecht ? 'Bens Ja kam nach deinem „Bestimmt.“ Die danach nicht.' : 'Allein gegen Jo ist schwer.') : m.k5ChatNein ? '„Nein“ gedrückt – mit deinem Namen.' : m.k5ChatGeglaubt ? 'Noah privat: „Ich glaub dir.“ Die Umfrage lief weiter.' : m.k5ChatVerlassen ? 'Du bist rausgegangen.' : 'Die Umfrage lief bis zum Ende.') },
  { id: 'k5Chiara', titel: 'Das war auch', text: 'Chiara. Daumen auf „Umfrage starten“. „Wenn ich nichts mache, bin ich die Nächste.“', auch: true },
  { id: 'k5Eis', titel: m.k5Losgelassen ? 'Ohne Bande' : 'An der Bande', text: (m.k5Losgelassen ? 'Losgelassen. ' : 'An der Bande gefahren. ') + (m.k5EisGeprueft ? ((m.k5RennenGefallen || 0) > 0 ? 'Geprüft: gelacht hat keiner. ' : m.k5RennenSieg ? 'Geprüft: kein Glück – eine ganze Runde. ' : 'Geprüft: eine Runde ging. ') : '') + (m.k5NoahGeholt ? 'Noah hast du vom Rand geholt.' : m.k5RennenSieg ? 'Rennen gegen Yusuf: gewonnen.' : 'Yusuf war schneller.')
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
      return [{ handy: { wer: 'Ben (privat)', wann: '13:28', chat: [{ wer: 'Ben', t: du ? 'bist du der admin? sag ehrlich' : 'du sitzt doch neben noah. war er’s?' }] } },
        { wahl: du ? [
          { t: '„Nein. Frag ruhig.“', merke: 'k5BenGefragt', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', chat: [{ wer: 'Ben', t: 'ok. glaub ich dir.' }] } }] },
          { t: '„Warum fragst du mich?“', merke: ['k5BenGefragt', 'k5BenWarum'], dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', chat: [{ wer: 'Ben', t: 'weil alle fragen. sorry' }] } }] },
          { t: '(Nicht antworten.)', merke: 'k5BenGemieden', dann: [] },
        ] : [
          { t: '„Weiß ich nicht. Echt nicht.“', merke: 'k5BenGefragt', staerke: 'klar', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', chat: [{ wer: 'Ben', t: 'ok. dann drück ich nicht ja.' }] } }] },
          { t: '„Bestimmt.“', merke: 'k5BenGeruecht', dann: [{ handy: { wer: 'Ben (privat)', wann: '13:29', chat: [{ wer: 'Ben', t: 'dachte ich mir 👀' }] } }] },
          { t: '(Nicht antworten.)', merke: 'k5BenGemieden', dann: [] },
        ] },
        { handy: null }];
    },
    // Mittwoch: Lou fragt privat. Was du antwortest, steht nachher im Klassenchat.
    n5_louFragt: () => {
      const du = zielDu5(M()), lou = (t, w) => ({ handy: { wer: 'Lou (privat)', wann: w || '12:42', chat: [{ wer: 'Lou', t }] } });
      return [lou(du ? 'sag ehrlich. warst du draußen? 👀' : 'stimmt doch mit noah, oder?', '12:41'),
        { wahl: du ? [
          { t: '📎 „Lina sagt: nur Gang.“', beweis: 'k5LinaGang', merke: 'k5LouLina', staerke: 'klar', dann: [lou('oh. ok. dann weiß ich nix')] },
          { t: '„Woher hast du das?“', merke: 'k5LouGefragt', staerke: 'klar', dann: [lou('hab’s gehört. in der pause')] },
          { t: '„Nein. War ich nicht.“', merke: 'k5LouNein', dann: [lou('ok ok')] },
          { t: '(Nicht antworten.)', merke: 'k5LouStill', dann: [] },
        ] : [
          { t: '📎 „Lina sagt: nur Gang.“', beweis: 'k5LinaGang', merke: 'k5LouLina', staerke: 'klar', dann: [lou('oh. ok. dann weiß ich nix')] },
          { t: '„Woher weißt du das?“', merke: 'k5LouGefragt', staerke: 'klar', dann: [lou('hab’s gehört. in der pause')] },
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
        { t: '„Er hat ‚zu viel‘ gesagt.“', merke: ['k5DarioKuedes', 'k5Kuedes', 'k5DarioAufNachfrage'], dann: [['kaya', 'Danke. Ich red heute mit ihm. Du musst nichts weiter tun.']] },
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
      if (m.k5NoahLasst || m.k5NoahDaneben) z.push({ handy: { wer: 'Noah (privat)', wann: '12:44', chat: [{ wer: 'Noah', t: 'du warst da. montag. 👍' }] } }, { handy: null });
      if (m.spurZettelKenan || m.spurZettel) z.push(['mila', 'Kenan stand um 8:31 am Glas. Um 8:34? Weiß keiner.']);
      if (m.k4DarioZettel) z.push(['du', '(denkt) Dario wusste: Der Zettel ist gelb.']);
      if (m.k4ZettelLassen) z.push(['mila', 'Lina sagt, der Zettel hing nach der Pause noch.']);
      if (beweisDa5(m)) z.push(['mila', 'Und das Foto von 8:34 ist von draußen. Wenn das in den Chat kommt, fragen alle: Wer war draußen?'], ['mila', 'Ich zeig das Herrn Kuedes. Nicht dem Chat.']);
      return z;
    },
    // Nach der Abstimmung: Chiaras Sicht, ein Erwachsener (Kuedes vorher, sonst Tidderich danach), unter vier Augen, Hilfe-Nummern
    n5_nachChat: () => {
      const m = M(), raus = m.k5Rausgeflogen, z = [];
      if ((m.k5ChatStumm || m.k5TidHin) && raus) z.push(['erzaehler', 'Später, auf dem Handy: „Chiara hat ' + (raus === 'du' ? 'dich' : 'Noah') + ' aus der Gruppe entfernt.“']);
      // Ein Wort privat zählt im Chat – wer Lous Zeile verpasst hat, bekommt sie von Mila (Folge immer sichtbar)
      const gs = m.k5ChatZitate || {}, vonMir = [
        m.k5LouKlar && !gs.lou ? { wer: 'Lou', t: '{name} sagt das auch 😎' } : null, m.k5BeweisAugen && !gs.augen ? { wer: 'Jo', t: 'sogar {name} hat 👀 gedrückt' } : null].filter(Boolean);
      if (vonMir.length) z.push({ handy: { wer: 'Mila · privat', wann: '13:41', chat: [{ wer: 'Mila', t: 'hast du das gesehen?' }, ...vonMir.map((v) => ({ wer: v.wer + ' (7P2)', t: v.t }))] } },
        ['du', '(denkt) Das kam von mir. Ein Wort.'], { handy: null });
      if (m.k5BeweisFrage && !gs.lina) z.push({ handy: { wer: 'Lina · privat', wann: '13:41', chat: [{ wer: 'Lina', t: 'hab im chat geschrieben dass du montag gefragt hast. beweis für was. 👍' }] } }, { handy: null });
      if (!m.k5Geprueft) z.push({ handy: { wer: 'Ayla · privat', wann: '13:38 · ungelesen', chat: [{ wer: 'Ayla', t: 'bin nicht dafür. weiß nicht was schreiben.' }] } }, ['du', '(denkt) Die war die ganze Zeit da. Ungelesen.'], { handy: null });
      const chiaraSicht = [{ foto: 'k5Chiara', von: [11.15, 1.35, -59.3], auf: [11.15, 1.0, -60.65], fov: 42 },
        { sicht: { wer: 'chiara', auf: 'du', gedanken: ['Mittwoch, 13:29. Mein Daumen über „Umfrage starten“.', 'Wenn ich nichts mache, bin ich die Nächste.'] } }];
      if (raus !== 'du') z.push(...chiaraSicht);
      if (m.k5ChatKuedes) {
        z.push({ hin: { kaya: [14.0, -56.2, Math.PI] } }, ['kaya', '(in der Tür) Die Umfrage ist zu. Ich hab sie gesehen.'], ['kaya', zielDu5(m) ? '(leise, zu dir) Danke für den Screenshot. Du musst nichts beweisen.' : '(leise, zu dir) Danke für den Screenshot. Ab hier kümmere ich mich.']);
        if (m.k5KuedesSpuren) z.push(['kaya', 'Die Spuren nehm ich mit zur Direktion.']);
      } else {
        z.push({ hin: { hoffmann: [14.0, -56.2, Math.PI] } });
        if (m.k5TidScreen) z.push(['hoffmann', '(schaut auf Chiaras Handy) Chiara. Mach sie zu.'], ['chiara', '(tippt) … Ist zu.']);
        else if (m.k5TidWeiter) z.push(['hoffmann', '(steht plötzlich neben dir, Hand auf) Das Handy. Bis vier.']);
        else if (!m.k5TidHin) z.push(['hoffmann', '(in der Tür) Handys auf den Tisch.']);
        z.push(['hoffmann', 'Wer so was sieht: Screenshot, zu mir. Oder ins SePAS.']);
        m.k5Tidderich = true;
        if (raus === 'du') z.push(['hoffmann', '(leise) {name}, kommst du kurz? Du musst nichts beweisen.'], { handy: { wer: '7P2 🏫', wann: '14:20', chat: [{ wer: '7P2', t: 'Ayla hat dich wieder hinzugefügt.' }] } }, { handy: null });
        if (raus === 'noah') z.push(['hoffmann', '(leise) Noah, kommst du kurz mit?'], ['erzaehler', 'Um 14:20 holt Ayla Noah zurück in den Chat.']);
        if (m.k5ChatGepostet && !m.k5KenanGeschuetzt) z.push(['hoffmann', 'Und das Foto von 8:34 ist jetzt überall. Mit der ganzen Klasse drauf.'], ['hoffmann', '(zu dir) Gut hingeschaut. Falscher Ort. Gib’s mir nächstes Mal.']);
        if (m.k5ChatVerlassen) z.push(['kaya', '(später, im Gang) Gut, dass du raus bist. Alles okay?'], { wahl: [
          { t: '„Ja.“', dann: [['kaya', 'Gut. Wenn sich das ändert: Du weißt, wo ich bin.']] },
          { t: '„Geht so.“', merke: 'k5GehtSo', dann: [['kaya', 'Okay. Ich bin bis vier im Büro.']] },
        ] }, ['mila', '(schreibt dir) Ich schick dir, was wichtig ist.']);
      }
      if (m.k5Verteidigt && zielDu5(m)) z.push([m.k5ChatKuedes ? 'kaya' : 'hoffmann', '(leise, zu dir) Dass du’s geschrieben hast: in Ordnung. Die Ja-Stimmen liegen nicht an dir.']);
      if (raus === 'du') z.push(...chiaraSicht);
      if (m.k5ChiaraNein) z.push(['erzaehler', 'Chiara schaut nicht zu dir rüber. Ihr Bein wippt.']);
      // Spott über dich (wegen „Die können mich mal.“ oder „Lasst ihn.“): Mila zeigt ihr Handy – nicht weiterleiten. Prüfen heißt nicht wegreden.
      const spott = [m.k5TuerMal ? 'der mit der lauten tasche 😂' : null, m.k5NoahLasst && !zielDu5(m) ? '{name} = admin-freund 👀' : null].filter(Boolean);
      if (spott.length) z.push(['mila', '(dreht ihr Handy zu dir) Das stand im Chat. Über dich.'], { handy: { wer: 'Milas Handy · 7P2', wann: '13:35', chat: spott.map((t) => ({ wer: 'Jo', t })) } },
        { szene: 'blase', id: 'k5BlaseSpott', pruefe: false, def: { t: 'Jetzt lachen alle über mich.', stufe: 'frei', zeit: 6 },
          ausgang: (r, mm) => { mm.k5SpottGeprueft = !!(r && r.geprueft); return mm.k5SpottGeprueft ? 'ja' : 'nein'; },
          folgen: { ja: { dann: [{ handy: { wer: '📷 Kamera-Check', wann: '13:35', chat: [{ wer: 'Echt', t: 'Jo. ' + (spott.length > 1 ? 'Zwei Sätze.' : 'Ein Satz.') + ' Über dich.' }, { wer: 'Alle?', t: 'Einer hat geschrieben.' }, { wer: 'Okay?', t: 'Nein. Nicht okay.' }] } },
            ['du', '(denkt) Stimmt. Und es ist nicht okay.']] }, nein: { dann: [] } } },
        { handy: null },
        { fest: true, wahl: [
          { t: '📸 An Herrn Kuedes.', merke: 'k5SpottKuedes', staerke: 'hilfe', dann: [m.k5ChatKuedes ? ['erzaehler', 'Herr Kuedes schreibt zurück: „Hab ich gesehen. Das kläre ich mit Jo.“'] : ['erzaehler', 'Herr Kuedes schreibt zurück: „Danke. Das kläre ich mit Jo. Du musst nichts weiter tun.“']] },
          { t: 'Mila soll’s schicken.', merke: 'k5SpottMila', dann: [['mila', 'Mach ich. Du musst nicht.']] },
          { t: '(Erst mal nichts.)', merke: 'k5SpottNichts', dann: [['mila', 'Okay. Ich heb den Screenshot auf. Falls du ihn brauchst.']] },
        ] });
      return z;
    },
    // Eisbahn: wer am Rand steht · Yusufs Bruder · Manon
    n5_eisRand: () => {
      const m = M(), z = [];
      z.push(['erzaehler', m.k5Rausgeflogen === 'noah' ? 'Am Rand, an der Bande: Noah. Seit Mittwoch ist er still.' : 'Am Rand, an der Bande: Noah. Allein.']);
      z.push({ wahl: [
        { t: '„Komm. Eine Runde.“', merke: 'k5NoahGeholt', staerke: 'mut', herz: { noah: 3 }, dann: [['noah', '(zögert) … Nur langsam.'], ['erzaehler', 'Ihr fahrt eine Runde. Langsam. Noah lacht einmal. Kurz.'], ['noah', '(an der Bande) Dachte, alle starren. Waren zwei.']] },
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
    // Freitag: Noah auf der Bank. Was du diese Woche selbst geprüft hast, wird zum 📎 – für jemand anderen (Heft #04, Stunde 1: für die anderen).
    n5_noahBank: () => {
      const m = M(), du = zielDu5(m), zw = ['', 'Einer', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht'];
      let ja = [m.k5Schneemann ? null : 'Jo', m.k5LouGefragt || m.k5LouLina ? null : 'Lou', m.k5BenGefragt ? null : 'Ben', 'Tim', ...(m.k5Verteidigt ? ['Pit', 'Elena', 'Tom'] : [])].filter(Boolean);
      if (m.k5ChatStimmen && m.k5ChatStimmen.ja != null && m.k5ChatStimmen.ja > 0) ja = ja.slice(0, m.k5ChatStimmen.ja);
      const n = Math.max(1, ja.length), satz = (zw[n] || n) + (n === 1 ? ' ist nicht alle.' : ' sind nicht alle.');
      const zaehlt = [['noah', '(zählt an den Fingern) ' + ja.join('. ') + '. … ' + (zw[n] || n) + '.'], ['noah', '(leise) ' + satz]];
      const opt = [
        { t: '📎 „Ayla war nicht dafür.“', merke: 'k5NoahAyla', dann: [['noah', 'Ayla? … Echt?'], ...zaehlt] },
        ...(m.k5Geprueft && m.k5PruefZahlen ? [{ t: '📎 „' + m.k5PruefZahlen.ja + ' Ja. ' + m.k5PruefZahlen.gs + ' gesehen.“', merke: 'k5NoahZahlen', dann: zaehlt }] : m.k5BeweisFrage ? [{ t: '📎 „Yusuf hat Nein gedrückt.“', merke: 'k5NoahYusuf', dann: [['noah', 'Yusuf?'], ...zaehlt] }] : []),
        { t: '„Alle? Wer genau?“', merke: 'k5NoahWerGenau', dann: zaehlt },
        { t: '(Nichts sagen.)', merke: 'k5NoahStill', dann: [['noah', '(nickt) Hm.']] },
      ];
      return [['erzaehler', 'Freitag, 17:00. Haltestelle. Es wird dunkel. Auf der Bank: Noah.'],
        ...(m.k5NoahGewunken ? [['noah', 'Du hast gewunken. Auf dem Eis.']] : m.k5NoahGeholt ? [['noah', 'Die Runde vorhin. Danke.']] : []),
        ...(m.k5Verteidigt && !du ? [['noah', 'Einer hat geschrieben: „noah war’s nicht.“ … Das warst du.']] : []),
        ['noah', du ? 'Die ganze Klasse denkt, du warst’s. Oder?' : m.k5Rausgeflogen === 'noah' ? 'Seit Mittwoch schreibt mir keiner. Die ganze Klasse denkt, ich war’s.' : 'Die ganze Klasse denkt, ich war’s.'],
        { fest: true, wahl: opt },
        { tu: 'n5_noahSatz' }];
    },
    n5_noahSatz: () => {
      const m = M();
      if (m.k5NoahStill) return [];
      const zw = ['', 'Einer', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht'];
      let ja = [m.k5Schneemann ? null : 'Jo', m.k5LouGefragt || m.k5LouLina ? null : 'Lou', m.k5BenGefragt ? null : 'Ben', 'Tim', ...(m.k5Verteidigt ? ['Pit', 'Elena', 'Tom'] : [])].filter(Boolean);
      if (m.k5ChatStimmen && m.k5ChatStimmen.ja != null && m.k5ChatStimmen.ja > 0) ja = ja.slice(0, m.k5ChatStimmen.ja);
      const n = Math.max(1, ja.length); m.k5NoahGezaehlt = true; m.k5SatzNoah = (zw[n] || n) + (n === 1 ? ' ist nicht alle.' : ' sind nicht alle.');
      return [];
    },
    n5_sichtRaus: () => {
      const m = M();
      if (m.k5Rausgeflogen !== 'noah') return [];
      return [{ sicht: { wer: 'noah', auf: 'du', gedanken: ['Mittwoch: raus aus dem Chat.', ...(m.k5Verteidigt ? ['Einer hat geschrieben: „noah war’s nicht.“'] : []), m.k5NoahGeholt ? 'Heute: eine Runde auf dem Eis. Langsam.' : m.k5NoahGeglaubt ? '„ich glaub dir.“ Hab ich noch.' : 'Heute: am Rand.'] } }];
    },
    // Satz der Woche (klebt in K7 am Spiegel, kommt in K10 als „dein Satz vom Januar“): was du mit Noah nachgezählt hast
    n5_satz: () => {
      const m = M();
      m.k5Satz = m.k5SatzNoah || 'Wenn ich ‚alle‘ denke, zähl ich nach.';
      m.k5SatzAlt = 'Alle denken, ich bin’s.';
      return [];
    },
    n5_eisCheck: () => {
      const m = M(), fiel = (m.k5RennenGefallen || 0) > 0;
      const echt = fiel ? 'Einmal hingefallen. Wieder aufgestanden.' : m.k5RennenSieg ? 'Gewonnen. ' + (m.k5RennenSek ? m.k5RennenSek + ' s. ' : '') + (m.k5Bande ? 'An der Bande.' : 'Ohne Bande.') : 'Eine Runde. Ohne Sturz.';
      return [{ handy: { wer: '📷 Kamera-Check', wann: 'Eisbahn', chat: [{ wer: 'Echt', t: echt }, ...(fiel ? [{ wer: 'Gelacht', t: '0' }] : []), ...(fiel ? [{ wer: 'Ayla', t: '„Uff.“' }] : [])] } },
        ['du', fiel ? '(denkt) Alle? Keiner.' : m.k5RennenSieg ? '(denkt) Glück? Eine ganze Runde.' : m.k5Bande ? '(denkt) Kann ich nicht? Noch nicht ohne Bande. Eine Runde ging.' : '(denkt) Kann ich nicht? Eine Runde. Ohne Sturz.'], { handy: null }];
    },
  };
  return T;
};
