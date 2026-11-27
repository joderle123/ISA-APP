// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 5 „Admin“, Januar, erste Woche nach den Ferien.
// Verdecktes Thema: Meine Gedanken. Ein Gedanke kann sich anfühlen wie eine Tatsache. „Alle“ sind vier Tische.
// „Ben war’s“ ist ein Kontakt in zehn Gruppen. Und der eigene Satz muss nicht schön sein. Er muss stimmen.
// Spuren: 8:31 im Screenshot (Handys in der Kiste) · „lowkey“ (null Mal von dir) · „{name} 7P2“ (so nennt man sich nicht selbst)
// · grauer Kreis statt Profilbild · Kontaktkarte in der Gruppe „Ecke“. Cliffhanger: Jos Sprachnachricht.
import { S5_GEDANKEN, S5_SCHAM_SCHULD } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' } };


export const SCHRITTE_N5 = [
  { id: 'k5_morgen', kap: 5, tag: 'Montag', uhr: 7.42, titel: 'Schneematsch', ziel: 'Dario sitzt auf der Bank. Wie immer.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n5_haltestelle' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n5_dario' } },
  { id: 'k5_saal', kap: 5, tag: 'Montag', uhr: 7.92, titel: 'Dreißig Zentimeter', ziel: 'Saal 1.04. Mila sitzt schon an ihrem Platz.', marker: 'mila',
    start: { teleport: 'saal104Tuer', gespraech: 'n5_tuer' },
    leute: { ...KLASSE },
    fertig: { reden: 'mila', gespraech: 'n5_saal' } },
  { id: 'k5_skills', kap: 5, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Was ich über mich denke', ziel: 'Aula. Herr Kuedes hat Karten mit Sätzen ausgelegt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n5_skills' } },
  { id: 'k5_cdi', kap: 5, tag: 'Montag', uhr: 12.25, titel: 'Ich prüf das', ziel: 'CDI. Mila hat ihr Heft dabei.', marker: 'mila',
    start: { teleport: 'cdi' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n5_cdi' } },
  { id: 'k5_ben', kap: 5, tag: 'Dienstag', uhr: 10.0, titel: 'Ben', ziel: 'Hof. Ben steht allein am Zaun.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [-6.4, 26.4, 2.8] },
    fertig: { reden: 'ben', gespraech: 'n5_ben' } },
  { id: 'k5_kantine', kap: 5, tag: 'Mittwoch', uhr: 12.17, titel: 'Alle', ziel: 'Mila winkt dich an ihren Tisch.', marker: 'mila',
    start: { teleport: 'kantineTuer', gespraech: 'n5_alle' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], chiara: [16.65, -14.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n5_kreis' } },
  { id: 'k5_sepas', kap: 5, tag: 'Donnerstag', uhr: 14.0, titel: 'Die offene Tür', ziel: 'Gang vor dem SePAS. Mila wartet dort.', marker: 'mila',
    start: { teleport: 'halle' },
    leute: { mila: [-9.4, -8.6, -1.8], kaya: [-12.6, -11.4, 0.6, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n5_sepas' } },
  { id: 'k5_freitag', kap: 5, tag: 'Freitag', uhr: 15.75, titel: 'Die Sprachnachricht', ziel: 'Zum Bus.', marker: 'bus',
    start: { teleport: 'saal104Tuer', gespraech: 'n5_mila' },
    leute: { mila: [-19.6, -14.6, -2.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 5, gespraech: 'n5_cliff' } },
];

// ---------- Montag 7:55: vor der Tür. Gedanke – Gefühl – Handlung (Gedanken-Weiche) ----------
const TUER = {
  wo: 'Vor Saal 1.04',
  situation: 'Du machst die Tür auf. Drinnen wird es still. Dein Tisch steht dreißig Zentimeter weiter weg als vor den Ferien.',
  gedanken: [
    { t: 'Alle wissen es.', gefuehl: 'Angst und Scham, sehr stark', koerper: 'Bauch zu, Gesicht heiß', tun: 'Kapuze auf, Blick nach unten, schnell auf den Platz', folge: 'Du sitzt allein mit dem Gedanken. Keiner merkt, wie es dir geht.' },
    { t: 'Die reden über den Screenshot. Nicht unbedingt über mich.', gefuehl: 'Unsicher, aber wach', koerper: 'Herz klopft, Kopf bleibt klar', tun: 'Du sagst „Moien“ und setzt dich normal hin', folge: 'Zwei sagen „Moien“ zurück. Der Raum wird wieder lauter.' },
    { t: 'Die können mich alle mal.', gefuehl: 'Wut', koerper: 'Fäuste, schnelle Atmung', tun: 'Du knallst die Tasche auf den Tisch', folge: 'Alle schrecken zusammen. Jo grinst. Jetzt reden wirklich alle über dich.' },
  ],
};

// Skills-Stunde (freiwillig): anonym Bohnen legen
const BOHNEN = {
  wo: 'Aula · anonym',
  saetze: ['Ich bin nicht gut genug.', 'Die anderen sind besser.', 'Mich mag eh keiner.', 'Ich darf keine Fehler machen.', 'Ich bin zu viel.', 'Ich schaff das nie.'],
  klasse: [7, 9, 4, 8, 3, 6],
};

// ---------- Montag 12:15: Mila prüft (Spuren-Wand) ----------
const MILA_PRUEFT = {
  wo: 'CDI · Milas Heft', helfer: F.mila,
  frage: 'Mila schiebt dir das Heft hin. „Was zählt? Was nicht?“',
  spuren: [
    { id: 'kiste', sy: '📦', t: 'Zweiundzwanzig Handys in der Kiste. Mme Lenning hat gezählt.', kurz: '22 Handys in der Kiste', echt: true,
      kommentar: ['Fakt. Auch deins.', 'Doch. Das ist der wichtigste Fakt. Dein Handy war weggesperrt.'] },
    { id: 'uhrzeit', sy: '🕗', t: 'Im Screenshot steht 8:31.', kurz: '8:31 im Screenshot', echt: true,
      kommentar: ['Fakt. Um 8:31 lag dein Handy in der Kiste.', 'Doch. 8:31. Da war die Kiste zu.'] },
    { id: 'lowkey', sy: '💬', t: '„lowkey“ – in 212 Nachrichten von dir: null Mal.', kurz: 'null Mal „lowkey“', echt: true,
      kommentar: ['Fakt. Ich hab gezählt.', 'Doch. Wer schreibt so? Du nicht.'] },
    { id: 'name', sy: '🏷️', t: 'Oben steht „{name} 7P2“.', kurz: '„{name} 7P2“', echt: true,
      kommentar: ['Fakt. So speichert dich jemand.', 'Doch. So nennt man sich nicht selbst.'] },
    { id: 'foto', sy: '🪑', t: 'Hinten links ist auf dem Foto nicht drauf.', kurz: 'nicht auf dem Foto', echt: false,
      kommentar: ['Stimmt – und beweist nichts. Wer nicht drauf ist, ist nur nicht drauf.', 'Das ist Jos Rechnung. Sie geht nicht auf.'] },
    { id: 'alle', sy: '👥', t: 'Alle sagen, du warst es.', kurz: 'alle sagen es', echt: false,
      kommentar: ['Raus. Viele ist kein Beweis.', 'Viele ist nicht richtig. Viele ist nur laut.'] },
  ],
  frageEnde: 'Und jetzt? Was steht fest?',
  schluesse: [
    { key: 'gebaut', t: 'Der Screenshot ist gebaut. Von jemandem, der mich als „{name} 7P2“ gespeichert hat.', braucht: ['uhrzeit', 'name'], antwort: 'Die beste Erklärung. Noch kein Beweis. Aber nah dran.' },
    { key: 'lowkey', t: 'Wer „lowkey“ schreibt, hat das geschrieben.', braucht: ['lowkey'], antwort: 'Merk dir das Wort. Hör hin, wer es sagt.' },
    { key: 'falsch', t: 'Wer nicht auf dem Foto ist, hat es gemacht.', braucht: ['foto'], antwort: '(schaut dich lange an) Dann wärst du es. Und du bist es nicht. Also stimmt die Rechnung nicht.' },
    { key: 'basta', t: 'Ich war es nicht. Basta.', braucht: [], antwort: 'Das weißt du. Ich will es wissen.' },
  ],
};

// ---------- Dienstag: Ben. Nachfragen statt ausfragen ----------
const BEN_FRAGEN = {
  wo: 'Hof · am Zaun', wer: F.ben, start: '(zieht das Handy raus) Deine Nummer? Keine Ahnung. Allen?',
  runden: [
    { fragen: [
      { t: 'Kannst du mal nachschauen?', art: 'offen', offen: 2, antwort: '(scrollt) Okay. Ich hab dich im September überall geteilt. Damit du Leute kennst.' },
      { t: 'Allen? Echt jetzt?', art: 'zu', offen: 0, antwort: 'Ja, sorry. Ich wollte helfen!' },
      { t: 'Du bist so peinlich.', art: 'zu', offen: -1, antwort: '(steckt das Handy weg) Okay. Dann nicht.' },
    ] },
    { fragen: (offen) => (offen >= 2 ? [
      { t: 'In welche Gruppen genau?', art: 'nachhaken', offen: 2, antwort: 'Fußball. Basket. Bus 7:15. Zehn Stück. … Und „Ecke“. Die Gruppe von der Skate-Ecke. Die Älteren.' },
      { t: 'Und wer ist da drin?', art: 'nachhaken', offen: 1, antwort: 'Vierzig Leute? Die von der Ecke halt. Ein paar aus der 6. … Und „Ecke“ heißt die Gruppe.' },
    ] : [
      { t: 'Bitte. Schau nach.', art: 'offen', offen: 1, antwort: '(seufzt. Scrollt.) Zehn Gruppen. Auch „Ecke“. Zufrieden?' },
      { t: 'Egal. Vergiss es.', art: 'zu', offen: 0, antwort: 'Okay.' },
    ]) },
  ],
  stufen: ['Ben sagt nichts mehr.', 'Ben erzählt ein bisschen.', 'Ben erzählt.', 'Ben zeigt dir alles.', 'Ben zeigt dir alles. Und er hört dir zu.', 'Ben zeigt dir alles. Und er hört dir zu.'],
};

// ---------- Mittwoch: Der Gedanke „Alle“ – antippen ----------
const ALLE = (m) => ({
  wo: 'Kantine · Mittwoch', intro: 'Über dir hängt ein Gedanke. Er ist laut. Er fühlt sich an wie eine Tatsache.',
  gedanke: 'Alle wissen es. Alle.',
  gruppen: [
    { t: 'Tische flüstern.', n: 4, farbe: '#d6452f', sy: '🤫' },
    { t: 'Leuten ist es egal. Sie essen.', n: 9, farbe: '#5b6472', sy: '🍝' },
    { t: (m.k4NoahVerteidigt || m.k3UebrigHin && m.k3UebrigId === 'noah') ? 'nicken dir zu. Einer davon ist Noah.' : 'nicken dir zu.', n: 2, farbe: '#3fa66b', sy: '🙂' },
  ],
  schluss: '„Alle“ sind vier Tische.',
  frage: 'Dein Satz für diese Woche:',
  saetze: [
    { key: 'manche', t: 'Manche glauben es. Nicht alle.' },
    { key: 'wissen', t: 'Ich weiß, was ich gemacht hab. Und was nicht.' },
    { key: 'mittwoch', t: 'Heute ist Mittwoch. Mehr weiß ich nicht.' },
  ],
});

// ---------- Mittwoch: Gerüchte sortieren ----------
const GERUECHTE = (m) => ({
  wo: 'Kantine · Milas Heft', helfer: F.mila,
  frage: 'Mila: „Gerüchte sind auch Daten. Man muss sie nur richtig ablegen.“',
  spuren: [
    { id: 'lenning', sy: '🗣️', t: 'Die Lenning war’s selber. Sie hatte als Einzige ein Handy.', kurz: 'Lenning', echt: false,
      kommentar: ['Gerücht. Ein Handy haben ist nicht posten.', 'Das ist Bens Rechnung. Klingt logisch. Ist es nicht.'] },
    ...(m.k4Explodiert ? [{ id: 'video', sy: '📹', t: 'Das Video: „Hinten links rastet aus.“', kurz: 'das Video', echt: false,
      kommentar: ['Raus. Wütend sein ist kein Beweis. Für gar nichts.', 'Ein Video von einer Sekunde. Es zeigt Wut. Sonst nichts.'] }] : []),
    { id: 'kreis', sy: '⚪', t: 'Im Screenshot ist oben ein grauer Kreis. Da, wo dein Profilbild sein müsste.', kurz: 'grauer Kreis', echt: true,
      kommentar: ['Fakt. Und den hast du gefunden. Nicht ich.', 'Doch! Du hast ein Profilbild. Im Screenshot nicht. Das zählt.'] },
    { id: 'ben', sy: '📇', t: 'Deine Kontaktkarte ist in der Gruppe „Ecke“.', kurz: 'Kontakt in „Ecke“', echt: !!m.spurEcke,
      kommentar: m.spurEcke ? ['Fakt. Ben hat es dir gezeigt. Die Spur führt raus aus der Klasse.', 'Doch. Das hast du selbst gesehen.'] : ['Raus. Das weißt du nicht. Du hast nicht gefragt.', 'Hast du das gesehen? Nein. Also raus.'] },
  ],
  frageEnde: 'Was nimmst du mit?',
  schluesse: [
    { key: 'kreis', t: 'Der Screenshot kommt nicht von meinem Handy.', braucht: ['kreis'], antwort: 'Ja. Das ist neu. Und es ist deins.' },
    { key: 'ecke', t: 'Die Spur führt aus der Klasse raus. Zur Ecke.', braucht: ['kreis', 'ben'], antwort: 'Vorsicht. Aber ja. Das passt zusammen.' },
    { key: 'nichts', t: 'Ich weiß nichts Neues.', braucht: [], antwort: 'Doch. Du weißt, was nicht zählt.' },
  ],
});

export const GESPRAECHE_N5 = {
  n5_haltestelle: [
    ['erzaehler', 'Montag. Schneematsch. Erster Schultag nach den Ferien.'],
    { tu: 'n5_ungelesen' },
    ['erzaehler', 'Dario setzt sich neben dich. Wie immer.'],
  ],
  n5_dario: [
    ['dario', 'Ich glaub das nicht. Den Screenshot.'],
    { wahl: [
      { t: '„Woher willst du das wissen?“', merke: 'darioWoher', dann: [['dario', 'Weiß ich halt.'], ['erzaehler', 'Er schaut auf seine Schuhe.']] },
      { t: '„Danke.“', herz: { dario: 1 }, dann: [['erzaehler', 'Er nickt. Einmal.']] },
    ] },
    ['dario', 'Wie waren die Ferien?'],
    { wahl: [
      { t: '„Lang. Ich hab das Handy zwei Wochen nicht angemacht.“', herz: { dario: 1 }, dann: [['dario', 'Gut.'], ['erzaehler', 'Er sagt es, als wäre es wichtig.']] },
      { t: '„Ich hab jeden Abend den Chat gelesen.“', herz: { dario: 1 }, dann: [['dario', '(leise) Mach das nicht.'], ['erzaehler', 'Dann sagt er nichts mehr. Er hört zu.']] },
      { t: '„Frag lieber nicht.“', dann: [['dario', 'Okay.'], ['erzaehler', 'Er bleibt trotzdem sitzen. Neben dir. Bis der Bus kommt.']] },
    ] },
    ['dario', '(nach einer Weile) Ich weiß es einfach. Frag nicht.'],
  ],
  n5_tuer: [
    ['erzaehler', 'Saal 1.04. Die Tür ist zu. Dahinter ist es laut.'],
    ['erzaehler', 'Deine Hand liegt auf der Klinke.'],
    { szene: 'weiche', id: 'tuer5', def: TUER, ausgang: (r) => ['angst', 'klar', 'wut'][r.final],
      folgen: {
        angst: { merke: 'tuerAngst' },
        klar: { staerke: 'ruhig', merke: 'tuerKlar' },
        wut: { herz: { ayla: -1 }, merke: 'tuerWut' },
      } },
  ],
  n5_saal: [
    ['jemand', '(hustet) Admin.'],
    { tu: 'n5_mitschnitt' },
    ['ayla', '(laut, in den Raum) Habt ihr einen Beweis? Nein? Dann seid still.'],
    ['chiara', 'Der Screenshot ist der Beweis.'],
    ['mila', '(ohne aufzuschauen) Ein Screenshot ist ein Bild von einem Bildschirm.'],
    { wahl: [
      { t: '„Dann zeig mir, wann ich das geschrieben hab, Chiara.“', staerke: 'klar', herz: { ayla: 1 }, merke: 'k5ChiaraGefragt', dann: [['chiara', '… 8:31. Steht doch da.'], ['mila', 'Um 8:31 war die Kiste zu.'], ['erzaehler', 'Chiara sagt nichts mehr. Sie schreibt sich etwas auf.']] },
      { t: '(Hinsetzen. Nichts sagen.)', dann: [['erzaehler', 'Du setzt dich. Ayla schiebt ihren Stuhl ein kleines Stück zu dir.']] },
      { t: '„Ihr habt doch alle keine Ahnung!“', herz: { chiara: -1 }, merke: 'k5Laut', dann: [['erzaehler', 'Ein paar lachen. Leise. Das ist schlimmer als laut.']] },
    ] },
    ['erzaehler', 'Mme Tidderich kommt herein.'],
    ['hoffmann', 'Schöne Ferien gehabt?'],
    ['erzaehler', 'Niemand antwortet.'],
  ],
  n5_skills: [
    ['erzaehler', 'Aula. Herr Kuedes schreibt einen Satz an die Tafel. Es wird still.'],
    { szene: 'skillsStunde', id: 's5_gedanken', def: S5_GEDANKEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's5Gedanken' }, weiter: { merke: 's5Gedanken' } } },
    ['mesenberg', 'Jetzt anonym. Jeder bekommt fünf Bohnen.'],
    ['mesenberg', 'Leg sie zu Sätzen, die du kennst. Von dir oder anderen.'],
    ['mesenberg', 'Keiner guckt. Ich auch nicht. Ich dreh mich um.'],
    { szene: 'bohnen', id: 'bohnen', def: BOHNEN, ausgang: (r) => (r.bohnen.some((n) => n > 0) ? 'gelegt' : 'leer'),
      folgen: { gelegt: { merke: 'bohnenGelegt' }, leer: { merke: 'bohnenLeer' } } },
    ['ben', 'Neun Bohnen bei „Die anderen sind besser“. Wer sind die?'],
    ['mila', 'Ich hab gezählt: wir alle. Gegenseitig.'],
    { szene: 'skillsStunde', id: 's5_scham', def: S5_SCHAM_SCHULD, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's5Scham' }, weiter: { merke: 's5Scham' } } },
    ['kaya', 'Mission: Fangt einen Satz ein. Wie eine Fliege.'],
    ['mesenberg', 'Wenn ein Satz sehr laut ist: Bürotür ist offen. Oder 116 111.'],
    { szene: 'stempel', def: { modul: 'Modul 4 · Meine Gedanken', titel: 'Gedanken geprüft',
      gelernt: ['Gedanke – Gefühl – Handlung', 'Tatsache und Gedanke unterschieden', 'Vier Denkfallen erkannt', 'Beweise dafür und dagegen gesammelt', 'Einen neuen, echten Satz gebaut'],
      mission: 'Fang einen fiesen Satz über dich ein. Ist er wahr?' }, folgen: {} },
  ],
  // Montag 12:15 (Fable, Schlüsselszene K5): „Ich glaub dir nicht. Denen glaub ich auch nicht. Ich prüf das.“
  n5_cdi: [
    ['erzaehler', 'Montag. 12:15. Mila legt ihr Heft auf den Tisch.'],
    ['mila', 'Ich glaub dir nicht.'],
    ['mila', 'Denen glaub ich auch nicht. Ich prüf das.'],
    { wahl: [
      { t: '„Dann prüf.“', herz: { mila: 1 }, dann: [] },
      { t: '„Ich muss dir nichts beweisen.“', dann: [['mila', 'Stimmt. Ich prüf trotzdem.']] },
      { t: '„Warum hilfst du mir?“', dann: [['mila', 'Ich helf nicht. Ich prüf.']] },
    ] },
    ['mila', 'Fakt eins. Zweiundzwanzig Handys in der Kiste. Lenning hat gezählt.'],
    ['mila', 'Fakt zwei. Im Screenshot steht 8:31.'],
    ['mila', 'Also zweites Handy. Oder Fake. Hast du ein zweites?'],
    { wahl: [
      { t: '„Nein.“', dann: [['mila', '(schreibt) „Nein.“ Ist notiert.']] },
      { t: '„Willst du meine Tasche sehen?“', dann: [['mila', 'Eine Tasche beweist nichts. Handys passen in Socken.']] },
      { t: '(Sie nur anschauen.)', staerke: 'warten', dann: [['erzaehler', 'Mila hält deinem Blick stand. Dann schaut sie zuerst weg.']] },
    ] },
    ['mila', 'Kann ich nicht prüfen. Also weiter.'],
    ['erzaehler', 'Sie tippt auf ein Wort im Screenshot.'],
    ['mila', '„Lowkey.“ Sagst du das?'],
    { wahl: [
      { t: '„Nie.“', dann: [['mila', '(schreibt) „Nie.“ Ich prüf das.']] },
      { t: '„Weiß nicht. Vielleicht mal?“', dann: [['mila', 'Ehrlich. Ich prüf es trotzdem.']] },
    ] },
    ['mila', 'Zweihundertzwölf Nachrichten von dir im Klassenchat. Ich hab gezählt.'],
    ['mila', 'Null Mal.'],
    ['erzaehler', 'Sie sagt es ohne Lächeln. Fast.'],
    ['mila', 'Und oben steht „{name} 7P2“. So speichert dich jemand.'],
    ['mila', 'So nennt man sich nicht selbst.'],
    { wahl: [
      { t: '„Ben speichert alle so.“', merke: 'k5BenHinweis', dann: [] },
      { t: '„Keine Ahnung, wer.“', dann: [] },
    ] },
    ['mila', 'Das ist ein Hinweis. Kein Beweis.'],
    { szene: 'spuren', id: 'wand5', def: MILA_PRUEFT, ausgang: (r) => r.schluss,
      folgen: {
        gebaut: { staerke: 'lesen', herz: { mila: 2 }, merke: ['spurGebaut', 'spurLowkey'] },
        lowkey: { staerke: 'lesen', herz: { mila: 1 }, merke: 'spurLowkey' },
        falsch: { herz: { mila: -1 } },
        basta: { herz: { mila: 1 } },
      } },
    ['erzaehler', 'Der Würfel liegt neben dem Heft. Sie dreht ihn wieder.'],
    ['mila', 'Bis Freitag weiß ich mehr. Oder nicht.'],
  ],
  // Dienstag: Der Gedanke „Ben war’s“ fühlt sich an wie eine Tatsache (Entscheidung A)
  n5_ben: [
    ['kopf', 'Ben war’s. Wer sonst speichert dich so? Name, Klasse.'],
    ['erzaehler', 'Der Gedanke ist so laut, dass er sich wie eine Tatsache anfühlt.'],
    ['ben', 'Hey.'],
    { warum: true, fest: true, wahl: [
      { t: '„Du warst das.“', herz: { ben: -2 }, merke: 'k5BenBeschuldigt', dann: [
        ['ben', 'Ich hab mich ENTSCHULDIGT. Im September.'],
        ['ben', 'Was willst du noch?'],
        ['erzaehler', 'Er geht. Er dreht sich nicht um.'] ] },
      { t: '„Wem hast du meine Nummer gegeben?“', staerke: 'zuhoeren', herz: { ben: 1 }, merke: ['k5BenGefragt', 'spurEcke'], dann: [
        { szene: 'nachhaken', id: 'benFragen', def: BEN_FRAGEN, ausgang: (r) => (r.offen >= 3 ? 'viel' : 'wenig'),
          folgen: { viel: { staerke: 'zuhoeren', herz: { ben: 1 } }, wenig: {} } },
        { tu: 'n5_ecke' } ] },
      { t: '(Ihm aus dem Weg gehen.)', merke: 'k5BenGemieden', dann: [
        ['erzaehler', 'Du drehst ab. Zum anderen Ende vom Hof.'],
        ['ben', '(ruft) Hey! … Hab ich was gemacht?'] ] },
    ] },
  ],
  n5_alle: [
    ['erzaehler', 'Mittwoch. Kantine. Du kommst rein.'],
    { szene: 'antippen', id: 'alle', def: (m) => ALLE(m), ausgang: (r) => r.satz,
      folgen: {
        manche: { staerke: 'klar', merke: 'k5SatzManche' },
        wissen: { staerke: 'ruhig', merke: 'k5SatzWissen' },
        mittwoch: { staerke: 'ruhig', merke: 'k5SatzMittwoch' },
      } },
    ['erzaehler', 'Mila winkt. Sie hat das Heft dabei.'],
  ],
  n5_kreis: [
    ['mila', 'Heute sortieren wir die Gerüchte.'],
    ['mila', 'Und schau dir den Screenshot noch mal an. Oben. Ganz genau.'],
    { szene: 'spuren', id: 'geruechte', def: (m) => GERUECHTE(m), ausgang: (r) => r.schluss,
      folgen: {
        kreis: { staerke: 'lesen', herz: { mila: 1 }, merke: 'spurKreis' },
        ecke: { staerke: 'lesen', herz: { mila: 2 }, merke: ['spurKreis', 'spurEckeSicher'] },
        nichts: {},
      } },
    { tu: 'n5_kreisSpur' },
    { tu: 'n5_story' },
  ],
  // Donnerstag 14:00: Die offene Tür (Entscheidung B)
  n5_sepas: [
    ['erzaehler', 'Donnerstag. Die Tür von Herrn Kuedes steht offen.'],
    ['erzaehler', 'An der Wand daneben: drei Nummern. 112. 116 111. BEE SECURE 8002 1234.'],
    ['mila', 'Noch nicht. Wir haben nur Hinweise. Wenn wir jetzt reingehen, glaubt uns keiner.'],
    { fest: true, wahl: [
      { t: '(Zu Herrn Kuedes gehen.)', staerke: 'hilfe', herz: { kaya: 1 }, merke: 'k5Kuedes', dann: [
        ['erzaehler', 'Herr Kuedes legt den Stift weg. Er hört zu. Bis zum Ende.'],
        ['kaya', 'Danke, dass du kommst.'],
        ['kaya', 'Was soll ich damit machen? Und was nicht?'],
        { wahl: [
          { t: '„Nichts vor der Klasse. Bitte.“', merke: 'k5KuedesLeise', dann: [['kaya', 'Versprochen. Ich sag Mme Tidderich Bescheid. Ohne Namen.']] },
          { t: '„Ich weiß es nicht.“', dann: [['kaya', 'Dann mach ich nichts, was du nicht willst. Ich sag nur Mme Tidderich Bescheid. Ohne Namen.']] },
        ] },
        ['kaya', 'Komm wieder. Auch wenn nichts Neues ist.'] ] },
      { t: '(Zu Mme Tidderich gehen.)', staerke: 'hilfe', herz: { hoffmann: 1 }, merke: 'k5Tidderich', dann: [
        ['erzaehler', 'Mme Tidderich hat fünf Minuten zwischen zwei Stunden. Sie hört trotzdem zu.'],
        ['hoffmann', 'Danke. Ich hol Herrn Kuedes dazu. Heute noch.'] ] },
      { t: '(Warten, bis ihr mehr habt.)', herz: { mila: 1 }, merke: 'k5Warten', dann: [
        ['mila', 'Gut. Freitag weiß ich mehr.'],
        ['erzaehler', 'Die Tür bleibt offen. Ihr geht vorbei.'] ] },
      { t: '(Niemandem etwas sagen.)', merke: 'k5Niemand', dann: [
        ['erzaehler', 'Du gehst vorbei. Die drei Nummern bleiben an der Wand.'] ] },
    ] },
    { tu: 'n5_milaTuer' },
  ],
  n5_mila: [
    ['erzaehler', 'Freitag. 15:45. Flur.'],
    ['mila', 'Du warst es nicht.'],
    ['erzaehler', 'Pause.'],
    ['mila', 'Aber jemand will, dass du es warst. Das ist schlimmer.'],
  ],
  n5_cliff: [
    ['erzaehler', 'An der Haltestelle stehen zwei aus der 7P1. Ein Handy, laut.'],
    ['erzaehler', 'Eine Sprachnachricht. Es ist Jos Stimme.'],
    ['jo', '(Sprachnachricht) Was, wenn’s Hinten links ist? Man bräuchte nur einen Screenshot. Haha.'],
    ['erzaehler', 'Die Bustür geht zu.'],
    { tu: 'kapitelEnde' },
  ],
};

export const tunN5 = (c) => ({
  n5_ungelesen: () => (c.S.merke.k4Verlassen
    ? [['erzaehler', '147 ungelesene Nachrichten.'], ['erzaehler', 'Ayla hat dich am zweiten Ferientag wieder in die Gruppe geholt. Ohne Kommentar.']]
    : [['erzaehler', '147 ungelesene Nachrichten. Du machst keine davon auf.']]),
  n5_mitschnitt: () => (c.S.merke.k4Explodiert
    ? [['erzaehler', 'Aus einem Handy hinten: deine Stimme. „Halt die Klappe, Jo!“'], ['erzaehler', 'Darunter steht: „Hinten links rastet aus.“']] : []),
  n5_ecke: () => { c.ui.toast('<b>🔎 Spur</b><span>Deine Kontaktkarte: in zehn Gruppen. Auch in „Ecke“.</span>', 'ly-t-ent'); return [['erzaehler', 'Die Spur führt aus der Klasse hinaus.']]; },
  n5_kreisSpur: () => (c.S.merke.spurKreis ? (c.ui.toast('<b>🔎 Spur</b><span>Grauer Kreis statt Profilbild. Der Screenshot ist nicht von deinem Handy.</span>', 'ly-t-ent'), []) : []),
  // Wer in Kapitel 1 abgestimmt hat, sieht heute eine Story
  n5_story: () => (c.S.merke.abgestimmt ? [
    { blende: 'Mittwoch · 21:10' },
    ['erzaehler', 'Eine Story von @annexe.cam. Dein Profil, rot umrandet.'],
    ['erzaehler', '„tut unschuldig. hat selber abgestimmt.“'],
    ['erzaehler', 'Im September hast du einmal geklickt. Jemand hat es sich gemerkt.'],
  ] : []),
  n5_milaTuer: () => ((c.S.merke.k5Kuedes || c.S.merke.k5Tidderich)
    ? [['mila', '(später, im Gang) Du bist reingegangen. Ohne Beweis.'], ['mila', 'Ich hätte gewartet. … Vielleicht war deins besser.']] : []),
});
