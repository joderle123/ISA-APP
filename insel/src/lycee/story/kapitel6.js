// Drei Jahre Annexe – 7ème, Kapitel 6 „Kommunikation und Grenzen“ (Kurs Jahr 1, Modul 5: E20 Worte, Stimme, Körper,
// E21 Ich-Botschaften und Zuhören, E22 Grenzen erkennen und Stopp-Abstand, E23 Stopp sagen). Behutsam: Grenzen im Alltag
// (Umarmung, Foto, Nachricht), nichts Sexuelles. Faden @annexe.cam: Luca hat den Fake gebaut – die Idee kam aus einer
// Sprachnachricht von Jo. Ende: Rauswurf aus dem Klassenchat.
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, luca: { id: 'luca', name: 'Luca', farbe: '#7a6fb0' }, rantini: { id: 'rantini', name: 'Mme Rantini', farbe: '#6b7a8f' } };

export const SCHRITTE_N6 = [
  { id: 'k6_foto', kap: 6, tag: 'Montag', uhr: 7.9, titel: 'Klassenfoto', ziel: 'Hof. Mme Rantini hat eine Kamera. Alle sollen zusammenrücken.', marker: 'rantini',
    start: { teleport: 'eingangHof', gespraech: 'n6_morgen' },
    leute: { rantini: [4.5, 19.5, Math.PI], ben: [4, 14, 0.2], jo: [5.2, 15.4, -0.4], ayla: [2.5, 15, 0.3], noah: [7.2, 13.2, -0.6], mila: [3.2, 12.8, 0.1], lina: [1.8, 13.4, 0.4], luca: [7.4, 15.6, -0.3] },
    fertig: { reden: 'rantini', gespraech: 'n6_foto' } },
  { id: 'k6_skills', kap: 6, tag: 'Montag', uhr: 9.9, titel: 'Skills: Wie sag ich’s?', ziel: 'Aula. Herr Kuedes hat ein Ladekabel in der Hand. Warum auch immer.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n6_skills' } },
  { id: 'k6_mila', kap: 6, tag: 'Dienstag', uhr: 12.4, titel: 'Die Sprachnachricht', ziel: 'Mila im CDI. Sie hat Kopfhörer für dich dabei.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n6_mila' } },
  { id: 'k6_jo', kap: 6, tag: 'Dienstag', uhr: 13.5, titel: 'Jo', ziel: 'Jo wirft allein Körbe am Hof.', marker: 'jo',
    start: { teleport: 'eingangHof' },
    leute: { jo: [29, 14.5, Math.PI] },
    fertig: { reden: 'jo', gespraech: 'n6_jo' } },
  { id: 'k6_cdi', kap: 6, tag: 'Mittwoch', uhr: 12.5, titel: 'Stopp', ziel: 'CDI. Mila sitzt in der Leseecke. Luca steht da. Mit Handy.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'], luca: [-7.6, -20.2, 2.4] },
    fertig: { reden: 'mila', gespraech: 'n6_cdi' } },
  { id: 'k6_ende', kap: 6, tag: 'Freitag', uhr: 10.0, titel: 'Okay.', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n6_ende' } },
];

// ---------- Stopp-Abstand beim Klassenfoto (E22) ----------
const ABSTAND = {
  wo: 'Hof · Klassenfoto',
  leute: [
    { ...F.ben, okay: 'Okay! Hier bleib ich. Respekt-Abstand.', zuNah: 'Uff, zu nah? Sorry. Ich bin so ein Umarmer.' },
    { ...F.ayla, okay: 'Passt. So stehen Bands auf Fotos.', zuNah: 'Oh. Zu nah? Sag einfach Stopp.' },
    { ...F.luca, okay: '(bleibt stehen) Chill. Ich wollte nur aufs Foto.', zuNah: '(geht einen Schritt zurück) Okay. Zu nah. Chill.' },
    { ...F.noah, okay: 'Gut. Ich mag auch Abstand.', zuNah: 'Sorry. Ich hätte fragen sollen.' },
  ],
};

// ---------- Ich-Botschaft bauen (E21) ----------
const ICH = {
  wo: 'Aula · Ich-Botschaft', titel: '🧩 Ich-Botschaft', altTitel: 'Situation',
  alt: 'Jemand nimmt dauernd dein Ladekabel. Ohne zu fragen.',
  regeln: [['ich', 'Ich statt Du'], ['gefuehl', 'Gefühl gesagt'], ['grund', 'Grund gesagt'], ['wunsch', 'klarer Wunsch']],
  teile: [
    [{ t: 'Wenn du mein Kabel ohne Fragen nimmst,', regeln: { ich: true } }, { t: 'Du nimmst immer alles,', regeln: { ich: false } }, { t: 'Du Dieb,', regeln: { ich: false, gefuehl: false } }],
    [{ t: 'ärgere ich mich,', regeln: { gefuehl: true } }, { t: 'fühl ich mich von dir veräppelt,', regeln: { ich: false, gefuehl: false } }, { t: 'ist mir das egal,', regeln: { gefuehl: false } }],
    [{ t: 'weil mein Handy dann leer ist.', regeln: { grund: true } }, { t: 'weil du halt so bist.', regeln: { grund: false, ich: false } }, { t: 'weil das alle sagen.', regeln: { grund: false } }],
    [{ t: 'Frag mich bitte vorher.', regeln: { wunsch: true } }, { t: 'Hör einfach auf!', regeln: { wunsch: false } }, { t: 'Mach doch, was du willst.', regeln: { wunsch: false } }],
  ],
};

// ---------- Mila spielt die Sprachnachricht vor ----------
const BEWEIS = {
  titel: 'Team Chaos 🌀', mitglieder: 4, dauer: 22,
  nachrichten: [
    { nach: 0.4, system: true, text: 'Mila zeigt dir einen alten Chat. Weitergeleitet von jemandem aus der Gruppe.' },
    { nach: 1.5, wer: 'Luca', text: 'wen machen wir als nächstes zum opfer 😂' },
    { nach: 4, wer: 'Jo', text: '🎤 Sprachnachricht (0:06)' },
    { nach: 5.5, system: true, text: '▶ Jo: „Mach doch {name} zum Admin, wär lustig, haha.“' },
    { nach: 9, wer: 'Luca', text: 'deal 😈' },
    { nach: 11.5, wer: 'Jo', text: 'war ein witz digga. mach das nicht' },
    { nach: 14, wer: 'Luca', text: '👍' },
  ],
  aktionen: [{ id: 'stumm', t: 'Handy zurückgeben', symbol: '📱', setzt: 'zurueck', sys: 'Du gibst Mila das Handy zurück.', ende: true }],
};

// ---------- Stopp sagen (E23 Stopp-Jury) ----------
const STOPP = {
  wo: 'CDI · Leseecke', gegner: F.luca,
  situation: 'Luca hält sein Handy auf Mila. Sie hat die Kapuze auf. Sie will das nicht. Er filmt trotzdem.',
  teile: [
    { titel: 'Blick und Körper', optionen: [{ t: '(Auf den Boden gucken.)', klar: 0 }, { t: '(Aufstehen, ihn anschauen, Hand hoch.)', klar: 2 }, { t: '(Ganz nah ran, Brust raus.)', klar: 1, angriff: true }] },
    { titel: 'Stimme', optionen: [{ t: 'leise, mit Lächeln', klar: 0 }, { t: 'ruhig und fest', klar: 2 }, { t: 'laut, mit Grinsen', klar: 1 }] },
    { titel: 'Worte', optionen: [{ t: '„Äh … vielleicht lieber nicht?“', klar: 0 }, { t: '„Stopp. Lösch das. Jetzt.“', klar: 2 }, { t: '„Bist du dumm oder was?“', klar: 0, angriff: true }] },
  ],
  reaktion: {
    klar: ['(lässt das Handy sinken) … Okay. Okay. Ist gelöscht. Guck.', '(geht. Diesmal ohne Spruch.)'],
    mittel: ['(zögert) … Ist doch nur ein Video.', '(steckt das Handy weg. Löscht nichts.)'],
    unklar: ['(lacht) Ja ja. Gleich.', '(filmt weiter)'],
    angriff: ['(laut) WAS?! Du kommst MIR so?', '(filmt jetzt dich)'],
  },
};

export const GESPRAECHE_N6 = {
  n6_morgen: [
    ['erzaehler', 'Montag. Klassenfoto. Ben hat seinen besten Pulli an. Er hat nur einen.'],
    ['mila', '(leise) Morgen Mittag. CDI. Mit Beweis.'],
  ],
  n6_foto: [
    ['rantini', 'Voilà, 7P2! Alle zusammen! Näher! Noch näher!'],
    ['ben', 'GRUPPENUMARMUNG! Alle! Jetzt!'],
    ['erzaehler', 'Ben breitet die Arme aus. Er kommt auf alle zu. Auch auf dich.'],
    { szene: 'abstand', id: 'abstand', def: ABSTAND, ausgang: (r) => (r.abstaende.luca > r.abstaende.ben + 1 ? 'unterschied' : 'gleich'),
      folgen: { unterschied: { staerke: 'lesen', merke: 'abstandGespuert' }, gleich: {} } },
    ['erzaehler', 'Noah steht am Rand. Hand vor dem Gesicht. Er geht einen Schritt zurück.'],
    { wahl: [
      { t: '„Noah, willst du überhaupt aufs Foto?“', staerke: 'lesen', herz: { noah: 2 }, merke: 'noahGefragtFoto', dann: [
        ['noah', 'Nur am Rand. Und nicht online. Nie mehr online.'],
        ['du', 'Mme Rantini, kommt das Foto ins Internet?'],
        ['rantini', 'Nein. Es bleibt in der Schule. Wer nicht drauf will, muss nicht.'],
        ['noah', '(atmet aus) … Dann geh ich an den Rand. Neben dich.'] ] },
      { t: '„Komm schon, Noah! Alle müssen drauf!“', herz: { noah: -2 }, merke: 'noahGedraengt', dann: [
        ['noah', '(kommt. Guckt auf den Boden.)'],
        ['erzaehler', 'Auf dem Foto sieht man Noah. Man sieht auch, dass er nicht will.'] ] },
      { t: '(Nichts sagen. Aber neben ihn stellen.)', staerke: 'einbeziehen', herz: { noah: 1 }, dann: [['erzaehler', 'Ihr steht zusammen am Rand. Klick. Noah hat ein bisschen gelächelt.']] },
    ] },
    ['rantini', 'Und … Klick! Das Foto hängt nächste Woche im Gang.'],
    ['rantini', 'Nur dort. Nirgendwo sonst.'],
  ],
  n6_skills: [
    ['kaya', 'Wéi geet et? Heute: Wie sag ich’s? Drei Kanäle.'],
    ['kaya', 'Worte. Stimme. Körper. Ben, sag mal: „Mir geht’s super.“'],
    ['ben', '(Schultern hängen, ganz leise) … Mir geht’s super.'],
    ['kaya', 'Was glaubt ihr? Den Worten – oder dem Rest?'],
    { wahl: [
      { t: '„Dem Rest. Stimme und Körper sagen: Nein.“', staerke: 'lesen', herz: { kaya: 1 }, dann: [['kaya', 'Worte und Körper passen nicht. Dann fragt man nach.']] },
      { t: '„Den Worten. Er hat’s ja gesagt.“', dann: [['ben', 'Bro. Ich hab gespielt, als wär mein Hund weg.'], ['kaya', 'Darum fragen wir nach, wenn es nicht passt.']] },
    ] },
    ['kaya', 'Darum ist Schreiben so schwierig. Im Chat fehlen Stimme und Körper.'],
    ['kaya', 'Jetzt kommt ein Ladekabel ins Spiel. Ein geklautes.'],
    ['mesenberg', 'Es ist meins. Und es wird ständig geklaut. Echte Situation.'],
    { szene: 'satz', id: 'ichSatz', def: ICH, ausgang: (r) => (r.regeln >= 4 ? 'stark' : r.regeln >= 2 ? 'mittel' : 'schwach'),
      folgen: {
        stark: { staerke: 'klar', merke: 'ichBotschaft', dann: [['mesenberg', '(gibt dir das Kabel) Das würde ich sofort verstehen. Und mich entschuldigen.']] },
        mittel: { merke: 'ichBotschaft', dann: [['mesenberg', 'Fast. Ein Teil klingt noch wie ein Vorwurf. Vorwürfe machen Ohren zu.']] },
        schwach: { dann: [['mesenberg', 'Hm. Da würde ich mein Kabel festhalten und gehen.'], ['mesenberg', 'Probier’s nochmal im Kopf.']] },
      } },
    ['kaya', 'Mission: Einmal sagen, was du fühlst. Und was du dir wünschst.'],
  ],
  n6_mila: [
    ['mila', 'Ich hab einen Beweis. Er gefällt dir nicht. Ich bleib sitzen.'],
    { szene: 'chat', id: 'beweis', def: BEWEIS, ausgang: () => 'gesehen', folgen: { gesehen: { merke: 'joSprachnachricht' } } },
    ['erzaehler', 'Jos Stimme. Er lacht. „Mach doch {name} zum Admin.“'],
    ['mila', 'Luca hat den Fake gebaut. Die Idee kam von Jo. Als Witz.'],
    ['mila', 'Danach hat Jo geschrieben: „Mach das nicht.“ Das ist auch ein Fakt.'],
    { wahl: [
      { t: '„Ich red mit Jo. Allein.“', staerke: 'mut', herz: { mila: 1 }, merke: 'mitJoReden', dann: [['mila', 'Gut. Mit „Ich“ anfangen. Nicht mit den Fäusten.']] },
      { t: '„Ich stell das in den Klassenchat. Alle sollen es wissen.“', herz: { mila: -1 }, merke: 'chatGedroht', dann: [['mila', 'Dann bist du der nächste Account.'], ['mila', 'Mach. Aber ohne mich.'], ['erzaehler', 'Mila packt ihren Laptop ein. Langsam.']] },
      { t: '„Ich geh damit zu Herrn Kuedes.“', staerke: 'hilfe', herz: { mila: 1, kaya: 1 }, merke: ['kuedesBeweis', 'mitJoReden'], dann: [['mila', 'Ja. Und mit Jo reden. Beides geht.']] },
    ] },
  ],
  n6_jo: [
    ['jo', '(wirft. Daneben.) … Mila hat dir die Sprachnachricht gezeigt. Oder?'],
    { tu: 'n6_joStart' },
    { wahl: [
      { t: '„Du bist so ein Verräter. Echt jetzt.“', herz: { jo: -2 }, merke: 'joDuBotschaft', dann: [
        ['jo', 'VERRÄTER? Ich hab geschrieben: Mach das nicht!'],
        ['erzaehler', 'Jo wirft den Ball gegen das Brett. Sehr hart.'],
        ['jo', '… Sorry. Okay. Du hast recht, sauer zu sein.'] ] },
      { t: '„Ey. Das hat mich echt verletzt. Ich will’s verstehen.“', staerke: 'klar', herz: { jo: 2 }, merke: 'joIchBotschaft', dann: [
        ['jo', '(lässt den Ball fallen) … Wir SIND Freunde.'],
        ['jo', 'Das war ein dummer Witz. Ich hab nicht gedacht, dass er’s macht.'] ] },
      { t: '(Nichts sagen. Warten.)', staerke: 'warten', herz: { jo: 1 }, dann: [['erzaehler', 'Jo dribbelt. Einmal. Zweimal. Dann redet er von allein.'], ['jo', 'Ich hab Mist gebaut. Mit einem Satz.']] },
    ] },
    ['jo', 'Luca hat gelacht. Alle haben gelacht. Ich auch.'],
    ['jo', 'Dann war der Satz draußen. Zack. Fehlstart.'],
    { wahl: [
      { t: '„Wer bei Luca nicht lacht, ist der Nächste. Oder?“', staerke: 'zuhoeren', herz: { jo: 2 }, merke: 'joGehoert', dann: [['jo', '(wirft. Trifft.) … Genau so. Wallah.']] },
      { t: '„Mir egal, warum. Es war mies.“', herz: { jo: -1 }, dann: [['jo', 'Ja. War es. Okay. Ich sag nix mehr.']] },
      { t: '„Ich hätte auch gelacht. Wahrscheinlich.“', staerke: 'zuhoeren', herz: { jo: 1 }, dann: [['jo', 'Echt? … (wirft daneben) Okay. Trotzdem mies von mir.']] },
    ] },
    { tu: 'n6_joEnde' },
  ],
  n6_cdi: [
    ['erzaehler', 'CDI. Mila hat die Kapuze auf. Luca hält sein Handy auf sie.'],
    ['luca', '(grinst) Bisschen Content für die Story. Mila liest. Spannend.'],
    ['mila', '(leise) Hör auf.'],
    ['luca', 'Was? Ich hör nix.'],
    { szene: 'stopp', id: 'stopp', def: STOPP, ausgang: (r) => r.art,
      folgen: {
        klar: { staerke: 'klar', herz: { mila: 3, luca: -1 }, merke: 'stoppKlar' },
        mittel: { herz: { mila: 1 }, merke: 'stoppMittel', dann: [['mila', 'Danke. Er hat nichts gelöscht. Ich sag’s Herrn Kuedes.']] },
        unklar: { herz: { mila: 1 }, merke: 'stoppUnklar', dann: [['mila', '(steht auf) STOPP. Lösch das.'], ['erzaehler', 'Luca löscht. Mila zittert. Du auch.']] },
        angriff: { herz: { luca: -2, mila: -1 }, merke: 'stoppAngriff', dann: [['mesenberg', '(kommt rein) Hier wird nicht gefilmt. Luca und du: mitkommen.'], ['mesenberg', 'Mila, alles okay? Du darfst hierbleiben.']] },
      } },
    { tu: 'n6_cdiEnde' },
  ],
  n6_ende: [
    ['kaya', 'Letzte Übung der Woche. Jeder sagt seinen Stopp-Satz. Laut und klar.'],
    ['kaya', 'Und alle anderen antworten nur ein Wort: „Okay.“'],
    ['ben', 'Stopp. Kein Brokkoli in meiner Pasta.'],
    ['alle', 'Okay.'],
    ['noah', '(leise, dann lauter) Stopp. Keine Fotos von mir ohne Fragen.'],
    ['alle', 'Okay.'],
    { wahl: [
      { t: '„Stopp. Keine Fakes über mich.“', staerke: 'klar', herz: { noah: 1, mila: 1 }, dann: [['alle', 'Okay.'], ['erzaehler', 'Jo sagt es am lautesten.']] },
      { t: '„Stopp. Erst fragen, dann umarmen.“', staerke: 'klar', herz: { ben: 1 }, dann: [['alle', 'Okay.'], ['ben', '(hebt die Hand) Fair. Ich frag ab jetzt. Darf ich dich umarmen?']] },
      { t: '„Weiter.“ (Heute nicht.)', dann: [['kaya', 'Auch das ist okay. Nein sagen gilt auch hier.']] },
    ] },
    { tu: 'n6_schluss' },
  ],
};

export const tunN6 = (c) => ({
  n6_joStart: () => [...(c.S.merke.joKnall ? [['jo', 'Erst Sportfest, jetzt das. Wir zwei haben echt Talent.']] : []), ...(c.S.merke.chatGedroht ? [['jo', 'Mila sagt, du willst es in den Klassenchat stellen. Echt jetzt?']] : []),
    ...(c.S.merke.kuedesBeweis ? [['jo', 'Herr Kuedes hat mich heute schon angesprochen. Ich weiß, worum es geht.']] : [])],
  n6_joEnde: () => {
    const m = c.S.merke;
    const gut = m.joIchBotschaft || m.joGehoert;
    return gut ? [['jo', 'Ich geh mit dir zu Herrn Kuedes.'], ['jo', 'Und ich sag Luca, dass Schluss ist. Ohne Witz diesmal.']]
      : [['jo', 'Ich red mit Herrn Kuedes. Allein. Ich muss das selbst machen.']];
  },
  n6_cdiEnde: () => (c.S.merke.stoppKlar ? [['mila', '(nimmt die Kapuze ab) Danke. Du hast was gemacht.'], ['mila', 'Ich hab „Hör auf“ gesagt. Das hätte reichen müssen.']]
    : [['mila', 'Ich hab „Hör auf“ gesagt. Das hätte reichen müssen.'], ['mila', 'Danke, dass du was gemacht hast.']]),
  n6_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 5 · Kommunikation und Grenzen', titel: 'Klar gesagt',
      gelernt: ['Worte, Stimme, Körper – und wem man glaubt', 'Jeder hat einen anderen Wohlfühl-Abstand', 'Ich-Botschaften statt Vorwürfe', 'Zuhören, bis man es wirklich verstanden hat', 'Stopp sagen: klar, ruhig, ohne Lächeln – und ein Stopp annehmen'],
      mission: 'Sag diese Woche einmal deinen Stopp-Satz. Und wenn jemand dir Stopp sagt: „Okay.“ Ohne Diskussion.' }, folgen: {} },
    ['erzaehler', 'Samstag, 21:40. Dein Handy vibriert.'],
    ['erzaehler', '„Luca hat dich aus der Gruppe 7P2 😎 (offiziell) entfernt.“'],
    ['erzaehler', 'Eine Minute später: „Luca hat die Gruppe 7P2 echte 💯 erstellt.“ Du bist nicht drin.'],
    ['erzaehler', 'Dein Handy bleibt still. Lange. Dann vibriert es. Einmal.'],
    { tu: 'kapitelEnde' },
  ],
});
