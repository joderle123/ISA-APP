// Drei Jahre Annexe – 7ème, Kapitel 5 „Meine Gedanken“ (Kurs Jahr 1, Modul 4: E16 Glaubenssätze und Kopfkino,
// E17 Meine Glaubenssätze und Bohnen-Wette, E18 Kritischer Detektiv und neuer Satz, E19 Neue Gedanken ausprobieren).
// Faden @annexe.cam: Ein gefälschter Screenshot macht DICH zum Admin. Der Kopf sagt: „Alle halten mich dafür.“ Stimmt das?
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' } };

export const SCHRITTE_N5 = [
  { id: 'k5_morgen', kap: 5, tag: 'Montag', uhr: 7.6, titel: 'Der Screenshot', ziel: 'Ben steht am Hof. Er winkt dich zu sich.', marker: 'ben',
    start: { teleport: 'eingangHof', gespraech: 'n5_chat' },
    leute: { ben: [4, 14, 0.6], jo: [5.2, 15.4, -2.4, 'redet'], luca: [-34.4, 11.4, 1.9, 'redet'], dario: [-33.4, 12, 1.2], kenan: [-35, 10.4, 0.6] },
    fertig: { reden: 'ben', gespraech: 'n5_ben' } },
  { id: 'k5_saal', kap: 5, tag: 'Montag', uhr: 8.05, titel: 'Die Tür', ziel: 'Saal 1.04. Die Tür ist zu. Drinnen ist es laut.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer', gespraech: 'n5_tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n5_saal' } },
  { id: 'k5_skills', kap: 5, tag: 'Montag', uhr: 9.9, titel: 'Skills: Was ich über mich denke', ziel: 'Aula. Herr Kuedes hat Karten mit Sätzen ausgelegt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n5_skills' } },
  { id: 'k5_detektiv', kap: 5, tag: 'Mittwoch', uhr: 12.4, titel: 'Der kritische Detektiv', ziel: 'Mila wartet im CDI. Sie hat den Screenshot ausgedruckt.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n5_detektiv' } },
  { id: 'k5_satz', kap: 5, tag: 'Donnerstag', uhr: 10.0, titel: 'Ein neuer Satz', ziel: 'Noah sitzt auf der Bank am Hof. Er hat dir einen Platz frei gehalten.', marker: 'noah',
    start: { teleport: 'eingangHof' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n5_satz' } },
  { id: 'k5_kantine', kap: 5, tag: 'Freitag', uhr: 12.3, titel: 'Mutprobe Kantine', ziel: 'Kantine. Mittagessen. Mit allen. Trotzdem.', marker: 'ben',
    start: { teleport: 'kantineTuer', gespraech: 'n5_kantineVor' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], luca: [21.4, -13.2, 0.9], dario: [21.0, -12.0, 1.2] },
    fertig: { reden: 'ben', gespraech: 'n5_kantine' } },
];

// ---------- Klassenchat: der gefälschte Screenshot ----------
const FAKE = (m) => ({
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 38,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ein neues Konto „7p2.news“ ist der Gruppe beigetreten. Es teilt ein Bild.' },
    { nach: 1.4, wer: '7p2.news', bild: 'Profil @annexe.cam · Admin: {name}', text: 'wer ist admin?? 👀👀', lacher: { start: 3, proSek: 0.5, stopp: 'gestoppt' } },
    { nach: 3.4, wer: 'Jo', text: 'NEIN. wallah?? 😳' },
    { nach: 5.4, wer: 'Luca', text: 'wusst ich’s. lowkey hab ich’s immer gewusst' },
    { nach: 7.6, wer: 'Ben', text: 'warte. was? 😶', wennNicht: 'benZweifelt' },
    m.testGelacht || m.top5Gelacht ? { nach: 10, wer: 'Noah', text: '…', setzt: 'noahStill' } : { nach: 10, wer: 'Noah', text: 'Ich glaub das nicht. Einfach nicht.' },
    { nach: 12.5, wer: 'Ayla', text: 'leute. erst fragen, dann urteilen' },
    { nach: 15, wer: 'Luca', text: 'fragen? der screenshot IST die frage 😂', wennNicht: 'gestoppt' },
    { nach: 18, system: true, text: '4 Leute haben das Bild weitergeleitet.' },
    { nach: 21, wer: 'Mila', text: 'Ich prüfe das. Bis dahin: niemand teilt das weiter. Bitte.' },
    { nach: 25, wer: 'Jo', text: 'ok ich hab gelöscht. sorry. war schock' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Das bin ich nicht. Der Screenshot ist gefälscht.“', setzt: ['gestoppt', 'ruhigGesagt'], ich: 'das bin ich nicht. der screenshot ist gefälscht', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'ok. ich glaub dir' }, { nach: 2.8, wer: 'Luca', text: 'würde der admin auch sagen 😂' }] },
      { t: '„Luca, du bist so ein Lügner!!“', setzt: ['angriff'], ich: 'luca du bist so ein lügner!!', folgen: [{ nach: 1.2, wer: 'Luca', text: 'oha. so laut? klingt schuldig 😂' }, { nach: 2.6, wer: 'Jo', text: 'uff' }] },
      { t: '„Wer hat das gemacht? Sagt’s mir ins Gesicht.“', setzt: ['angriff'], ich: 'wer hat das gemacht? sagt’s mir ins gesicht', folgen: [{ nach: 1.4, wer: 'Luca', text: 'chill. ist doch nur ne frage' }] },
    ] },
    { id: 'raus', t: 'Gruppe verlassen', symbol: '🚪', setzt: 'raus', sys: 'Du hast die Gruppe verlassen. Erst mal Ruhe.', ende: true },
    { id: 'beweis', t: 'Screenshot an Herrn Kuedes', symbol: '📸', setzt: 'kuedes', sys: 'Gesendet an Herrn Kuedes.', folgen: [{ nach: 2.4, wer: 'Herr Kuedes (Schul-Postfach)', text: 'Eingang bestätigt. Liegt morgen früh bei der Direktion. Du bist nicht allein.' }] },
    { id: 'stumm', t: 'Handy weg', symbol: '🔕', setzt: 'stumm', sys: 'Handy in der Tasche. Es vibriert. Du lässt es.', ende: true },
  ],
});

// ---------- Gedanken-Weiche vor der Tür (E16 Kopfkino) ----------
const TUER = {
  wo: 'Vor Saal 1.04',
  situation: 'Du machst die Tür auf. Drinnen wird es plötzlich still. Ein paar gucken zu dir.',
  gedanken: [
    { t: 'Alle denken, ich bin’s.', gefuehl: 'Angst und Scham, sehr stark', koerper: 'Bauch zu, Gesicht heiß', tun: 'Kapuze auf, Blick nach unten, schnell auf den Platz', folge: 'Du sitzt allein mit dem Gedanken. Keiner merkt, wie es dir geht.' },
    { t: 'Die reden über den Screenshot. Nicht unbedingt über mich.', gefuehl: 'Unsicher, aber wach', koerper: 'Herz klopft, Kopf bleibt klar', tun: 'Du sagst „Moien“ und setzt dich normal hin', folge: 'Ben nickt dir zu. Jo sagt: „Morgen.“ Der Raum wird wieder laut.' },
    { t: 'Die können mich alle mal.', gefuehl: 'Wut', koerper: 'Fäuste, schnelle Atmung', tun: 'Du knallst die Tasche auf den Tisch', folge: 'Alle schrecken zusammen. Luca grinst. Jetzt reden wirklich alle über dich.' },
  ],
};

// ---------- Glaubenssätze sortieren (E16 Sortier-Duell) ----------
const SAETZE = {
  wo: 'Aula · Sortier-Duell', titel: 'Hilft der Satz – oder bremst er?', zeit: 8,
  info: 'Sätze, die Leute über sich denken. Wohin damit?',
  faecher: [{ id: 'hilft', t: 'Hilft', sy: '🚀', f: '#3fa66b' }, { id: 'kommt', t: 'Kommt drauf an', sy: '🤔', f: '#e9a23b' }, { id: 'bremst', t: 'Bremst', sy: '🧱', f: '#b5485d' }],
  karten: [
    { t: '„Ich bin zu dumm für Mathe.“', ziel: 'bremst', wer: F.noah, sagt: '(leise) Den kenn ich.' },
    { t: '„Ich darf auch mal danebenliegen.“', ziel: 'hilft' },
    { t: '„Ich muss immer perfekt sein.“', ziel: 'bremst', wer: F.mila, sagt: 'Bremst. Aber er fühlt sich an wie ein Motor.' },
    { t: '„Mir ist alles egal.“', ziel: null, wer: F.ben, sagt: 'Klingt stark. Aber dann fragt man nie.' },
    { t: '„Wenn mich einer nicht mag, mögen mich alle nicht.“', ziel: 'bremst' },
    { t: '„Ich muss stark sein.“', ziel: null, wer: F.jo, sagt: 'Manchmal hilft der. Manchmal macht er alles kaputt.' },
    { t: '„Ich kann Sachen lernen, die ich noch nicht kann.“', ziel: 'hilft', wer: F.ben, sagt: 'Ich lerne gerade Spagat. Seit drei Jahren.' },
    { t: '„Lieber nichts sagen, dann passiert nichts.“', ziel: null, wer: F.ayla, sagt: 'Kommt drauf an. Im Chat letzte Woche? Hat nicht geholfen.' },
  ],
  ende: 'Viele Sätze hat man nicht selbst erfunden. Man hat sie irgendwo aufgeschnappt.',
};
const BOHNEN = {
  wo: 'Aula · anonym',
  saetze: ['Ich bin nicht gut genug.', 'Die anderen sind besser.', 'Mich mag eh keiner.', 'Ich darf keine Fehler machen.', 'Ich bin zu viel.', 'Ich schaff das nie.'],
  klasse: [7, 9, 4, 8, 3, 6],
};

// ---------- Kritischer Detektiv: „Alle halten mich für @annexe.cam.“ (E18) ----------
const WAAGE = (m) => ({
  wo: 'CDI · mit Mila', satz: 'Mir glaubt eh keiner.', vorher: m.fakeRuhig ? 60 : 80,
  hinweise: [
    { t: 'Luca hat geschrieben: „wusst ich’s“.', art: 'dafuer', warum: 'Ein Beweis dafür. Aber nur für EINE Person: Luca.' },
    { t: 'Ben schrieb: „warte. was?“', art: 'kein', warum: 'Kein Beweis. Geschockt ist nicht überzeugt.' },
    { t: 'Ayla schrieb: „erst fragen, dann urteilen“.', art: 'dagegen', warum: 'Dagegen. Ayla glaubt den Fake nicht einfach.' },
    { t: 'Jo hat gesagt: „Ich glaub’s nicht. Echt nicht.“', art: 'dagegen', warum: 'Dagegen. Jo glaubt dir.' },
    { t: 'Dein Bauch fühlt sich an wie ein Stein.', art: 'kein', warum: 'Kein Beweis. Ein Gefühl ist echt – aber es ist keine Tatsache.' },
    { t: 'Luca schrieb: „der screenshot IST die frage“.', art: 'kein', warum: 'Kein Beweis. Nur ein Spruch.' },
    { t: 'Mme Tidderich hat gesagt: „Ich urteile nicht ohne Fakten.“', art: 'dagegen', warum: 'Dagegen. Eine Erwachsene hält dich NICHT für schuldig.' },
    { t: 'Vier Leute haben das Bild weitergeleitet.', art: 'kein', warum: 'Weiterleiten heißt nicht glauben. Gemein ist es trotzdem.' },
  ],
});

// ---------- Neuer Satz (E18 Prüfstand) ----------
const NEUER_SATZ = {
  wo: 'Bank am Hof · mit Noah', alt: 'Mir glaubt eh keiner.',
  teile: [
    [{ t: 'Keiner glaubt mir. Nie.', regeln: { real: false, ohneImmer: false, freundlich: false } },
      { t: 'Ein paar glauben mir schon.', regeln: { real: true, ohneImmer: true } },
      { t: 'Ein paar glauben den Fake. Das tut weh.', regeln: { real: true, ohneImmer: true, freundlich: true } }],
    [{ t: 'Das ist mir komplett egal.', regeln: { real: false } },
      { t: 'Ich bin halt so ein Typ, dem man so was glaubt.', regeln: { freundlich: false } },
      { t: 'Die, die mich kennen, fragen nach.', regeln: { real: true, freundlich: true } }],
    [{ t: 'Ich sag Ben und Jo, was ich weiß.', regeln: { schritt: true, freundlich: true } },
      { t: 'Ich zeig Herrn Kuedes die Fakten.', regeln: { schritt: true, freundlich: true } },
      { t: 'Ich stell Luca vor allen zur Rede.', regeln: { schritt: false } }],
  ],
};

// ---------- Mutprobe in der Kantine: Luca (E19 Neue Gedanken ausprobieren) ----------
const LUCA_DUELL = {
  wo: 'Kantine · Mittag', gegner: { name: 'Luca', farbe: '#7a6fb0' }, publikum: 'der halbe Tisch', hitze: 40, zeit: 7,
  runden: [
    { sagt: 'Na, Admin? Postest du heute noch was?', warn: 'Der alte Satz flüstert: „Alle glauben ihm.“', skill: '(Neuen Satz denken: „Ein paar zweifeln. Ich hab Fakten.“)', skillAntwort: '(wartet) … Was?',
      karten: [
        { t: '„Der Screenshot ist fake. 25:14 gibt’s nicht.“', stimme: 'kopf', art: 'klar', hitze: -10, respekt: 2, antwort: '(zuckt) … Kann ja jeder sagen.' },
        { t: '„Du warst doch selbst im Flur. Um 8:34.“', stimme: 'stolz', art: 'angriff', hitze: 22, antwort: '(wird blass, dann laut) Was soll DAS jetzt heißen?' },
        { t: '(Weggucken. Weiteressen.)', stimme: 'bauch', art: 'rueckzug', hitze: 2, respekt: -1, antwort: 'Siehste. Keine Antwort ist auch eine Antwort.' },
      ], still: { hitze: 6, antwort: 'Admin sagt nix mehr 😂' } },
    { sagt: 'Jeder sagt, du warst es.', warn: 'Dein Gesicht wird heiß', skill: '(Füße auf den Boden. „Jeder“ ist ein Spruch.)', skillAntwort: '… Okay, nicht jeder.',
      karten: [
        { t: '„Wer ist jeder? Nenn mir drei Namen.“', stimme: 'kopf', art: 'klar', hitze: -12, respekt: 2, antwort: '(sucht) … Leute halt.' },
        { t: '„Halt einfach die Klappe, Luca.“', stimme: 'stolz', art: 'angriff', hitze: 24, antwort: 'Uhh. Getroffen.' },
        { t: '„Mir egal, was jeder sagt.“', stimme: 'bauch', art: 'rueckzug', hitze: 4, antwort: 'Sieht aber nicht egal aus.' },
      ], still: { hitze: 4, antwort: 'Siehste.' } },
    { sagt: '…', wenn: (z) => z.hitze > 20, warn: 'Deine Hände zittern', skill: '(Ausatmen. Lang.)', skillAntwort: '(dreht sich weg) Egal. Langweilig.',
      karten: [
        { t: '„Ich weiß, wer ich bin. Du weißt es auch.“', stimme: 'kopf', art: 'klar', hitze: -14, respekt: 2, antwort: '… (geht zu seinem Tisch zurück)' },
        { t: '„Stopp. Ich ess jetzt. Mit meinen Leuten.“', stimme: 'kopf', art: 'klar', hitze: -10, respekt: 1, antwort: 'Ja ja. Guten Appetit, Admin.' },
      ], still: { hitze: -4, antwort: '(geht)' } },
  ],
};
const lucaAusgang = (r) => (r.knall ? 'knall' : r.hitze <= 20 ? 'ruhig' : r.hitze <= 55 ? 'gelb' : 'rot');

export const GESPRAECHE_N5 = {
  n5_chat: [
    ['erzaehler', 'Montag, 7:22. Du bist noch im Bus. Das Handy explodiert.'],
    { szene: 'chat', id: 'fake', def: (m) => FAKE(m),
      ausgang: (r) => (r.flags.kuedes ? 'kuedes' : r.flags.ruhigGesagt ? 'ruhig' : r.flags.angriff ? 'angriff' : r.flags.raus ? 'raus' : 'still'),
      folgen: {
        kuedes: { staerke: 'hilfe', herz: { kaya: 1 }, merke: ['fakeKuedes', 'fakeRuhig'] },
        ruhig: { staerke: 'klar', herz: { ayla: 1, ben: 1 }, merke: 'fakeRuhig' },
        angriff: { herz: { luca: -1, ayla: -1 }, merke: 'fakeAngriff' },
        raus: { merke: 'fakeRaus' },
        still: { merke: 'fakeStill' },
      } },
  ],
  n5_ben: [
    ['ben', 'Bruder. Ich hab nix Gutes geschrieben. Ich war baff.'],
    { tu: 'n5_benStart' },
    { wahl: [
      { t: '„Und? Glaubst du’s?“', herz: { ben: 2 }, dann: [['ben', 'Nee. Du bist nicht der Typ für so was.'], ['ben', 'Du bist der Typ für Nuggets.']] },
      { t: '„Aber was, wenn die anderen es glauben?“', staerke: 'zuhoeren', herz: { ben: 1 }, merke: 'sorgeGesagt', dann: [['ben', 'Welche anderen? Luca? Luca glaubt auch, dass Pizza Gemüse ist.']] },
      { t: '„Lass mich. Ich will nicht drüber reden.“', dann: [['ben', 'Okay. Ich lauf trotzdem neben dir. Ohne reden.']] },
    ] },
    ['jo', '(kommt dazu) Sorry wegen dem „NEIN wallah“. Das war Schock.'],
    ['jo', 'Ich glaub’s nicht. Echt nicht.'],
  ],
  n5_tuer: [
    ['erzaehler', 'Saal 1.04. Die Tür ist zu. Dahinter ist es laut.'],
    ['erzaehler', 'Deine Hand liegt auf der Klinke.'],
    { szene: 'weiche', id: 'tuer', def: TUER, ausgang: (r) => ['angst', 'klar', 'wut'][r.final],
      folgen: {
        angst: { merke: 'tuerAngst' },
        klar: { staerke: 'ruhig', herz: { ben: 1, jo: 1 }, merke: 'tuerKlar' },
        wut: { herz: { luca: 1, ayla: -1 }, merke: 'tuerWut' },
      } },
  ],
  n5_saal: [
    // „Wohin setzen?“ – nach dem Fake (Montag früh): Körpersprache lesen, Platz wählen. Die Stimmung an der Tür färbt den Blick.
    { tu: 'n5_saalBlick' },
    { wahl: [
      { t: '(Zu Ben. Er nimmt schon seine Jacke vom Stuhl.)', staerke: 'kontakt', herz: { ben: 1 }, merke: 'saalBen', dann: [['ben', '(leise) Platz für Nuggets-Typen. Reserviert.']] },
      { t: '(Zu Mila. Sie schiebt dir wortlos ihr Lineal rüber.)', staerke: 'lesen', herz: { mila: 1 }, merke: 'saalMila', dann: [['mila', '(flüstert) Nicht umdrehen. Luca guckt. Lass ihn gucken.']] },
      { t: '(Hinten allein. Rücken zur Wand.)', merke: 'saalHinten', dann: [['erzaehler', 'Von hier siehst du alle. Und keiner sieht dich an. Das ist sicher. Und einsam.'], ['noah', '(dreht sich um, formt mit dem Mund) Alles okay?']] },
      { t: '(Direkt neben Luca. Sollen alle sehen, dass du keine Angst hast.)', wenn: (m) => m.tuerWut || m.tuerKlar, staerke: 'mut', merke: 'saalLuca', dann: [['luca', '(rutscht ein Stück weg) … Was?'], ['erzaehler', 'Er sagt die ganze Stunde nichts mehr.']] },
    ] },
    ['hoffmann', 'Ça va? Screenshot gesehen. Ich urteile nicht ohne Fakten.'],
    ['hoffmann', 'Wer ihn weiterschickt: nach der Stunde zu mir.'],
    ['erzaehler', 'Drei Handys verschwinden ganz schnell in drei Taschen.'],
    { tu: 'n5_saalBilanz' },
  ],
  n5_skills: [
    ['kaya', '(schreibt: „Ich bin zu blöd.“) Nicht melden. Nur denken.'],
    ['erzaehler', 'Keiner meldet sich. Ein paar nicken ganz leicht.'],
    ['kaya', 'Den Satz kennen sehr viele. Heute prüfen wir solche Sätze.'],
    ['kaya', 'Sortiert mal. Hilft der Satz? Oder bremst er?'],
    { szene: 'sort', id: 'saetze', def: SAETZE, ausgang: (r) => (r.antworten[5] === 'kommt' ? 'kommt' : 'klar'),
      folgen: { kommt: { herz: { jo: 1 }, dann: [['jo', '„Kommt drauf an“ bei „stark sein“.'], ['jo', '(guckt lange auf die Karte. Sagt nichts.)']] }, klar: {} } },
    ['mesenberg', 'Jetzt anonym. Jeder bekommt fünf Bohnen.'],
    ['mesenberg', 'Leg sie zu Sätzen, die du kennst. Von dir oder anderen.'],
    ['mesenberg', 'Keiner guckt. Ich auch nicht. Ich dreh mich um.'],
    { szene: 'bohnen', id: 'bohnen', def: BOHNEN, ausgang: (r) => (r.bohnen.some((n) => n > 0) ? 'gelegt' : 'leer'),
      folgen: { gelegt: { merke: 'bohnenGelegt' }, leer: { merke: 'bohnenLeer' } } },
    ['ben', 'Neun Bohnen bei „Die anderen sind besser“. Wer sind die?'],
    ['mila', 'Ich hab gezählt: wir alle. Gegenseitig.'],
    ['kaya', 'Mission: Fangt einen Satz ein. Wie eine Fliege.'],
    ['mesenberg', 'Wenn ein Satz sehr laut ist: Bürotür ist offen. Oder 116 111.'],
  ],
  n5_detektiv: [
    ['mila', 'Setz dich. Wir arbeiten wie Detektive. Nur Fakten.'],
    ['mila', 'Ich hab den Fake 40 Mal angeguckt. Guck oben.'],
    ['mila', '25:14. Diese Uhrzeit gibt es nicht.'],
    ['mila', 'Der Fake ist gemein. Das ist echt, kein Denkfehler.'],
    ['mila', 'Wir prüfen nur einen Satz in deinem Kopf.'],
    { szene: 'waage', id: 'waage', def: (m) => WAAGE(m),
      ausgang: (r) => (r.nachher <= r.vorher - 30 ? 'leichter' : r.nachher < r.vorher ? 'etwas' : 'gleich'),
      folgen: {
        leichter: { staerke: 'lesen', herz: { mila: 1 }, merke: 'waageLeichter', dann: [['mila', 'Siehst du? Der Satz war lauter als die Beweise.']] },
        etwas: { staerke: 'lesen', herz: { mila: 1 }, dann: [['mila', 'Ein bisschen leichter. Das reicht für heute.']] },
        gleich: { herz: { mila: 1 }, dann: [['mila', 'Dein Bauch hört nicht auf Fakten. Typisch Bauch. Er braucht Zeit.']] },
      } },
    { tu: 'n5_detektivSpur' },
    // Jugendwelt heute: 30 Kommentare fühlen sich an wie „alle“. Mila zählt die Konten.
    ['mila', 'Noch was. Unter dem Fake stehen 30 Kommentare.'],
    ['mila', 'Es wirkt, als wäre die ganze Schule gegen dich.'],
    ['mila', 'Ich hab sie sortiert. Es sind drei Konten. Drei.'],
    { wahl: [
      { t: '„Drei? Es hat sich angefühlt wie alle.“', staerke: 'lesen', herz: { mila: 1 }, merke: 'lawineGezaehlt', dann: [['mila', 'So funktioniert das. Laut sein ist nicht viele sein.']] },
      { t: '„Und die 200, die nichts geschrieben haben?“', staerke: 'klar', herz: { mila: 1 }, merke: 'lawineGezaehlt', dann: [['mila', 'Genau. Die meisten schweigen. Schweigen ist nicht Zustimmung.']] },
    ] },
  ],
  n5_satz: [
    ['noah', 'Platz frei gehalten. Mit einer Banane. Sie hat Respekt.'],
    ['noah', 'Kurze Frage. Wenn ICH Admin wär. Was würdest du denken?'],
    { wahl: [
      { t: '„Du weißt ja nicht mal dein Passwort.“', staerke: 'humor', herz: { noah: 1 }, dann: [['noah', 'Stimmt. Es steht auf meiner Hand.'], ['noah', '(guckt dich an) Bei dir ist das übrigens genauso. Nur so.']] },
      { t: '„Dass du so was nie machen würdest.“', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [['noah', 'Eben. (guckt dich an) Und bei dir?']] },
    ] },
    ['noah', 'Aber kein „Alles super“-Satz. Den glaubt nicht mal Ben.'],
    { szene: 'satz', id: 'neuerSatz', def: NEUER_SATZ, ausgang: (r) => (r.regeln >= 4 ? 'stark' : r.regeln >= 2 ? 'mittel' : 'schwach'),
      folgen: {
        stark: { staerke: 'ruhig', herz: { noah: 2 }, merke: 'neuerSatz', dann: [['noah', 'Den würde ich glauben. Schreib ihn auf eine Karte.']] },
        mittel: { herz: { noah: 1 }, merke: 'neuerSatz', dann: [['noah', 'Fast. Das Ende klingt noch nach Luca.']] },
        schwach: { merke: 'neuerSatz', dann: [['noah', 'Hm. Das glaubst du selbst nicht. Ich seh’s.']] },
      } },
    { tu: 'n5_satzKarte' },
  ],
  n5_kantineVor: [
    ['erzaehler', 'Freitag. Kantine. Der Tisch der 7P2 ist voll.'],
    ['erzaehler', 'Dein Kopf sagt: Setz dich woanders hin.'],
    { tu: 'n5_kopfSatz' },
  ],
  n5_kantine: [
    ['ben', 'Hier. Ich hab den Stuhl mit meiner Jacke reserviert. Wie ein Profi.'],
    ['erzaehler', 'Du setzt dich. Ein paar Sekunden ist es still. Dann kommt Luca rüber.'],
    { szene: 'hitze', id: 'lucaDuell', def: LUCA_DUELL, ausgang: lucaAusgang,
      folgen: {
        knall: { herz: { luca: -2, ben: -1 }, merke: 'lucaKnall', dann: [['mesenberg', '(steht plötzlich da) Ihr zwei. Abstand. Luca, du kommst mit.']] },
        ruhig: { staerke: 'mut', herz: { ben: 2, jo: 1, noah: 1 }, merke: 'lucaRuhig', dann: [['jo', 'Digga. Das war … ruhig. Wie ein Boss.']] },
        gelb: { staerke: 'ruhig', herz: { ben: 1 }, merke: 'lucaGelb' },
        rot: { herz: { ben: -1 }, merke: 'lucaRot', dann: [['erzaehler', 'Dein Kopf ist laut. Ben schiebt dir wortlos seinen Nachtisch rüber.']] },
      } },
    { tu: 'n5_darioBlick' },
    { tu: 'n5_ende' },
  ],
};

export const tunN5 = (c) => ({
  n5_benStart: () => (c.S.merke.fakeAngriff ? [['ben', 'Du hast Luca im Chat angeschrien. Verständlich.'], ['ben', 'Aber er feiert das jetzt.']]
    : c.S.merke.fakeRaus ? [['ben', 'Du bist raus. Verstehe ich.'], ['ben', 'Ich sag dir, was läuft. Wenn du willst.']] : []),
  n5_saalBlick: () => {
    const m = c.S.merke;
    const blick = m.tuerAngst ? [['erzaehler', 'Die Tür geht auf. Es wird still. Alle schauen. Zumindest fühlt es sich so an.'], ['erzaehler', 'Angst macht jeden Blick größer. Schau genauer hin.']]
      : m.tuerWut ? [['erzaehler', 'Die Tür knallt gegen die Wand. Ups. Jetzt schauen wirklich alle.']]
      : [['erzaehler', 'Du gehst rein. Ruhig. Ein paar schauen kurz hoch. Dann wieder runter.']];
    return [...blick,
      ['erzaehler', 'Luca grinst ins Handy. Ayla stellt ihre Tasche auf den freien Stuhl. Und nimmt sie wieder runter.'],
      ['erzaehler', 'Ben hebt die Jacke von seinem Nebenplatz. Mila schaut nicht hoch. Aber sie rückt ein Stück.'],
      ['erzaehler', 'Wohin setzt du dich?']];
  },
  n5_saalBilanz: () => (c.S.merke.fakeKuedes ? [['hoffmann', '(leise zu dir) Herr Kuedes sagt, du hast ihm geschrieben.'], ['hoffmann', 'Gut gemacht.']] : []),
  n5_detektivSpur: () => [
    ['mila', 'Und noch was. Der Fake ist mit einer App gebaut.'],
    ['mila', 'Die Schrift ist zwei Pixel zu dünn.'],
    ['mila', 'In der Bild-Info steht ein Gerätename: „Handy von L.“'],
    { wahl: [
      { t: '„L wie Luca.“', merke: 'spurL', dann: [['mila', 'Vielleicht. Oder Lina. Oder Lenning. L ist ein Buchstabe, kein Beweis.']] },
      { t: '„Das zeigen wir Herrn Kuedes. Nicht der Klasse.“', staerke: 'hilfe', herz: { mila: 2, kaya: 1 }, merke: ['spurL', 'spurKuedes'], dann: [['mila', 'Einverstanden. Fakten an Erwachsene. Nicht an den Chat.']] },
    ] },
  ],
  n5_satzKarte: () => {
    const s = ((c.S.sz || {}).neuerSatz || {}).satz;
    return s ? [['erzaehler', 'Deine Karte: „' + s + '“']] : [];
  },
  n5_kopfSatz: () => (c.S.merke.neuerSatz ? [['erzaehler', 'Dann der andere Satz. Der von der Karte. Du gehst zum Tisch.']]
    : [['erzaehler', 'Du atmest. Einmal lang aus. Du gehst trotzdem zum Tisch.']]),
  n5_darioBlick: () => [
    ['erzaehler', 'Am Nachbartisch sitzt Dario. Er guckt dich an. Lange. Dann weg.'],
    ['dario', '(im Vorbeigehen, leise) Der Screenshot … war nicht von mir. Ich schwör.'],
    { wahl: [
      { t: '„Von wem dann?“', staerke: 'mut', merke: 'darioGefragt5', dann: [['dario', '(guckt zu Luca) … Frag nicht mich.']] },
      { t: '„Okay.“ (Nur nicken.)', staerke: 'lesen', merke: 'darioGeglaubt', herz: { dario: 1 }, dann: [['erzaehler', 'Dario nickt zurück. Seine Schultern gehen ein Stück runter.']] },
    ] },
  ],
  n5_ende: () => [
    { szene: 'stempel', def: { modul: 'Modul 4 · Meine Gedanken', titel: 'Gedanken geprüft',
      gelernt: ['Sätze, die helfen – und Sätze, die bremsen', 'Viele kennen die gleichen fiesen Sätze', 'Beweise dafür und dagegen gesammelt', 'Einen neuen, echten Satz gebaut'],
      mission: 'Fang einen fiesen Satz über dich ein. Ist er wahr?' }, folgen: {} },
    ['erzaehler', 'Abends. Eine Nachricht von Mila.'],
    ['mila', '(Nachricht) Ich glaube, ich weiß, wer den Fake gebaut hat.'],
    ['mila', '(Nachricht) Es wird dir nicht gefallen.'],
    ['erzaehler', 'Mila tippt. Hört auf. Tippt.'],
    ['mila', '(Nachricht) Nicht am Handy. Montag. Mit Beweis.'],
    { tu: 'kapitelEnde' },
  ],
});
