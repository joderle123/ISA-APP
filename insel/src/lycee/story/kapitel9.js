// Drei Jahre Annexe – 7ème, Kapitel 9 „Gesund und stark“ (Kurs Jahr 1, Modul 8: E29 Gesund und stark – Rucksack-Rennen,
// Stress-Rucksack, Vier Ecken mit Tipp, Gesund-Würfel, Gesund-Plan, Bodyscan). Behutsam: schwere Gefühle → Hilfe-Wege
// (Herr Kuedes, 116 111). Faden @annexe.cam: Dario kann nicht mehr schlafen. Er erzählt, wie alles angefangen hat.
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N9 = [
  { id: 'k9_dario', kap: 9, tag: 'Montag', uhr: 7.45, titel: 'Dario', ziel: 'Dario wartet an der Haltestelle. Sehr früh. Sehr müde.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n9_morgen' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n9_dario' } },
  { id: 'k9_skills', kap: 9, tag: 'Montag', uhr: 9.9, titel: 'Skills: Akku leer', ziel: 'Aula. Herr Kuedes hat einen Rucksack voller Steine dabei.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n9_skills' } },
  { id: 'k9_kuedes', kap: 9, tag: 'Dienstag', uhr: 10.0, titel: 'Zu zweit zu Herrn Kuedes', ziel: 'Dario steht vor der Aula. Er geht nicht allein rein.', marker: 'dario',
    start: { teleport: 'eingangHof' },
    leute: { dario: [-13.6, -51.2, Math.PI], kaya: [-14, -55.5, Math.PI] },
    fertig: { reden: 'dario', gespraech: 'n9_kuedes' } },
  { id: 'k9_ben', kap: 9, tag: 'Mittwoch', uhr: 12.4, titel: 'Bens Gesund-Würfel', ziel: 'Ben am Korb. Er hat einen riesigen Würfel aus Pappe gebaut.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [28.4, 13.6, 2.6], jo: [26.8, 14.6, 1.6], noah: [27.2, 16.2, 0.8] },
    fertig: { reden: 'ben', gespraech: 'n9_ben' } },
  { id: 'k9_ende', kap: 9, tag: 'Freitag', uhr: 10.0, titel: 'Mein Gesund-Plan', ziel: 'Letzte Skills-Stunde vor dem Sommerfest. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA, dario: [-9.8, -55.2, -1.4] },
    fertig: { reden: 'kaya', gespraech: 'n9_ende' } },
];

// ---------- Darios Rucksack (E29 Stress-Rucksack) ----------
const DARIOS_RUCKSACK = {
  wo: 'Haltestelle · mit Dario', titel: 'Darios Rucksack',
  dinge: [
    { t: 'Das Geheimnis: Ich hab @annexe.cam angefangen.', sy: '🤐', kg: 6, passt: ['teilen'], warum: 'Ein Geheimnis wird schwerer, je länger man es trägt. Teilen mit einem Erwachsenen macht es leichter.' },
    { t: 'Luca hat das Passwort. Ich komm nicht mehr rein.', sy: '🔑', kg: 4, passt: ['nicht', 'teilen'], warum: 'Was Luca postet, ist Lucas Verantwortung. Nicht alles davon gehört Dario.' },
    { t: 'Nachts guck ich jede Stunde, was gepostet wird.', sy: '📱', kg: 4, passt: ['warten', 'teilen'], warum: 'Nachts kann man nichts ändern. Das kann bis morgen warten.' },
    { t: 'Angst, von der Schule zu fliegen.', sy: '😰', kg: 3, passt: ['teilen'], warum: 'Angst wird kleiner, wenn jemand sie mitträgt. Herr Kuedes kennt sich aus.' },
    { t: 'Mathe-Nachprüfung am Freitag.', sy: '📐', kg: 2, passt: ['tragen'], warum: 'Das ist echt seins. Aber es ist klein, wenn der Rest leichter ist.' },
    { t: '„Alle denken, ich bin cool. Ich muss cool bleiben.“', sy: '😎', kg: 3, passt: ['nicht'], warum: 'Das ist ein Satz, kein Gewicht. Den darf er ablegen.' },
  ],
};

// ---------- Akku-Tag (E29) ----------
const AKKU = {
  wo: 'Aula · ein ganz normaler Dienstag', start: 70, nacht: 25,
  stationen: [
    { zeit: '7:00', t: 'Der Wecker. Du bist müde.', verbrauch: 0, wahl: [
      { t: 'Aufstehen, Fenster auf, ein Brot.', akku: 10, antwort: 'Kühle Luft. Hunger weg.' },
      { t: 'Liegen bleiben, Handy checken. 20 Minuten.', akku: -8, antwort: 'Jetzt musst du rennen. Ohne Frühstück.' },
    ] },
    { zeit: '10:00', t: 'Große Pause.', wahl: [
      { t: 'Körbe werfen mit Ben.', akku: 8, antwort: 'Bewegung lädt. Komisch, aber wahr.' },
      { t: 'In der Ecke am Handy.', akku: -4, antwort: 'Zwanzig Minuten weg. Erholt? Nicht wirklich.' },
      { t: 'Auf der Bank mit Noah. Einfach sitzen.', akku: 6, antwort: 'Stille lädt auch.' },
    ] },
    { zeit: '12:30', t: 'Mittagessen.', wahl: [
      { t: 'Curry mit allen.', akku: 8, antwort: 'Essen plus Leute. Doppelt geladen.' },
      { t: 'Nur Chips aus dem Automaten.', akku: 2, antwort: 'Kurz gut. Um 14 Uhr leer.' },
    ] },
    { zeit: '17:00', t: 'Nachmittag zu Hause.', wahl: [
      { t: 'Erst Hausaufgaben, dann frei.', akku: 4, antwort: 'Der Kopf ist leichter, wenn es erledigt ist.' },
      { t: 'Drei Stunden Feed.', akku: -10, antwort: 'Wo ist die Zeit hin?' },
      { t: 'Rausgehen. Skaten. Oder spazieren.', akku: 9, antwort: 'Frische Luft. Der Tag wird länger.' },
    ] },
    { zeit: '22:00', t: 'Bettzeit. Eigentlich.', wahl: [
      { t: 'Handy außerhalb vom Bett. Licht aus.', akku: 15, antwort: 'Du schläfst nach 20 Minuten ein.' },
      { t: '„Nur noch ein Video.“ Bis 1 Uhr.', akku: -20, antwort: 'Es waren 34 Videos.' },
    ] },
  ],
};

// ---------- Vier Ecken mit Tipp ----------
const ECKEN_G = {
  wo: 'Aula · Vier Ecken', titel: 'Was lädt den Akku?', zeit: 8,
  info: 'Jeder Tipp gehört in eine Ecke: Schlaf, Bewegung, Essen oder Pause.',
  faecher: [{ id: 'schlaf', t: 'Schlaf', sy: '😴', f: '#4f88c8' }, { id: 'bewegung', t: 'Bewegung', sy: '🏃', f: '#3fa66b' }, { id: 'essen', t: 'Essen', sy: '🍎', f: '#e9734a' }, { id: 'pause', t: 'Pause', sy: '☕', f: '#8a7bc8' }],
  karten: [
    { t: 'Handy eine Stunde vor dem Schlafen weg.', ziel: 'schlaf', wer: F.jo, sagt: 'Eine STUNDE? … Okay. Eine halbe.' },
    { t: 'Zehn Minuten Fahrrad zur Schule.', ziel: 'bewegung' },
    { t: 'Wasser statt Energy-Drink.', ziel: 'essen', wer: F.ben, sagt: 'Mein Herz bedankt sich. Hat es mir gesagt.' },
    { t: 'Fünf Minuten aus dem Fenster gucken.', ziel: 'pause' },
    { t: 'Jeden Tag ungefähr zur gleichen Zeit ins Bett.', ziel: 'schlaf' },
    { t: 'Frühstück. Auch ein kleines.', ziel: 'essen' },
    { t: 'Musik, Augen zu, nichts müssen.', ziel: 'pause', wer: F.ayla, sagt: 'Das ist meine Lieblingsecke.' },
  ],
  ende: 'Vier Ecken, kein Muss. Ein kleiner Schritt pro Ecke reicht.',
};

// ---------- Gesund-Würfel mit Ben (E29) ----------
const WUERFEL = {
  wo: 'Hof · Bens Pappwürfel', runden: 3,
  aufgaben: [
    { t: '10 Hampelmänner. Jetzt.', sy: '🤸', wer: F.ben, sagt: 'Neun. Zählt fast.' },
    { t: 'Ein großes Glas Wasser trinken.', sy: '💧', wer: F.noah, sagt: 'Ich hol uns zwei.' },
    { t: 'Drei Minuten ohne Handy. Alle.', sy: '📵', wer: F.jo, sagt: 'Drei Minuten. Digga. Das ist Folter. … Okay, geht.' },
    { t: 'Jemandem was Nettes sagen. In echt.', sy: '💬', wer: F.ben, sagt: 'Du hast heute schöne Schuhe. Ich mein’s ernst.' },
    { t: 'Fünf Körbe werfen.', sy: '🏀', wer: F.jo, sagt: 'Ich zähl mit. Drei. Respekt.' },
    { t: 'Eine Minute in den Himmel gucken.', sy: '☁️', wer: F.noah, sagt: 'Die Wolke sieht aus wie Gerd.' },
  ],
};

export const GESPRAECHE_N9 = {
  n9_morgen: [
    ['erzaehler', 'Montag, 7:12. Du hast Dario gestern geschrieben: „Morgen, Haltestelle, früh.“'],
    ['erzaehler', 'Er sitzt schon da. Kapuze auf. Augenringe bis zum Kinn.'],
  ],
  n9_dario: [
    ['dario', 'Danke, dass du gekommen bist. Ich hab seit Wochen nicht richtig geschlafen.'],
    ['dario', 'Ich hab @annexe.cam angefangen. Im Herbst. Ich.'],
    ['dario', 'Erst nur Tauben. Lustige Sachen. Luca fand’s gut. Ich war plötzlich wer.'],
    ['dario', 'Dann wollte er das Passwort. Und dann wurden die Posts gemein.'],
    { wahl: [
      { t: '(Zuhören. Nicken. Nichts sagen.)', staerke: 'zuhoeren', herz: { dario: 2 }, dann: [['dario', 'Ich hab nicht gedacht, dass du einfach zuhörst. Nach allem.']] },
      { t: '„Und das Foto von Noah? War das auch du?“', staerke: 'mut', herz: { dario: 1 }, dann: [['dario', '(nickt) Das erste. Ja. Ohne Text. Den Text hat Luca dazugemacht.'], ['dario', 'Ich schäm mich. Jeden Tag.']] },
      { t: '„Warum erzählst du das ausgerechnet mir?“', staerke: 'lesen', herz: { dario: 1 }, dann: [['dario', 'Weil du am Korb was gesagt hast.'], ['dario', '„Kenn ich. Einmal Mist, und alle gucken.“']] },
    ] },
    ['dario', 'Kannst du … das für dich behalten?'],
    { wahl: [
      { t: '„Für mich behalten, nein. Aber ich geh mit dir zu Herrn Kuedes.“', staerke: 'hilfe', herz: { dario: 2, kaya: 1 }, merke: 'darioBegleiten', dann: [['dario', '… Zusammen? Okay. Morgen. Bevor ich es mir anders überlege.']] },
      { t: '„Versprochen. Ich sag nichts.“', merke: 'darioVersprochen', dann: [['dario', '(atmet aus) Danke.'], ['erzaehler', 'Du fühlst es sofort: Jetzt trägst du es mit. Allein.']] },
      { t: '„Das ist zu groß für uns zwei. Wir brauchen einen Erwachsenen.“', staerke: 'hilfe', herz: { dario: 1, kaya: 1 }, merke: 'darioBegleiten', dann: [['dario', 'Herr Kuedes? … Der ist okay. Kommst du mit?']] },
    ] },
    ['dario', 'Ich trag so viel mit mir rum. Wie ein Rucksack voller Steine.'],
    { szene: 'rucksack', id: 'darioRucksack', def: DARIOS_RUCKSACK, ausgang: (r) => (r.geteilt >= 2 ? 'leichter' : 'schwer'),
      folgen: {
        leichter: { staerke: 'lesen', herz: { dario: 2 }, merke: 'rucksackLeichter', dann: [['dario', 'Wenn man es so sortiert … ist es weniger. Komisch.']] },
        schwer: { herz: { dario: 1 }, dann: [['dario', 'Immer noch schwer. Aber jetzt weiß ich, was drin ist.']] },
      } },
    { tu: 'n9_hilfe' },
  ],
  n9_skills: [
    ['kaya', 'Wéi geet et? Heute: euer Akku. Wie voll ist er?'],
    ['mesenberg', '(stellt einen Rucksack hin) Voller Steine. Wer will ihn tragen?'],
    ['ben', 'Ich! … Oh. Nein. Doch nicht.'],
    ['kaya', 'Stress ist wie dieser Rucksack. Und Schlaf, Essen, Bewegung laden euch auf.'],
    { szene: 'akku', id: 'akku', def: AKKU, ausgang: (r) => (r.akku >= 60 ? 'voll' : r.akku >= 35 ? 'mittel' : 'leer'),
      folgen: {
        voll: { staerke: 'ruhig', merke: 'akkuVoll', dann: [['kaya', 'Gut geladen. Und das ohne Zaubertrick.']] },
        mittel: { merke: 'akkuMittel', dann: [['kaya', 'Geht. Ein Hebel reicht oft. Meistens der Abend.']] },
        leer: { merke: 'akkuLeer', dann: [['jo', 'Ich bin bei 12 Prozent. Und das ist mein Dienstag.'], ['kaya', 'Dann probier ich mit dir einen Abend. Nur einen.']] },
      } },
    { szene: 'sort', id: 'ecken', def: ECKEN_G, ausgang: () => 'ok', folgen: { ok: {} } },
  ],
  n9_kuedes: [
    { tu: 'n9_kuedesStart' },
    ['kaya', 'Kommt rein. Setzt euch. Wer will anfangen?'],
    ['erzaehler', 'Dario öffnet den Mund. Nichts kommt raus. Er guckt dich an.'],
    { wahl: [
      { t: '„Soll ich anfangen? Du sagst stopp, wenn’s falsch ist.“', staerke: 'einbeziehen', herz: { dario: 2 }, dann: [
        ['du', 'Dario hat den Account angefangen. Und Luca hat ihn übernommen.'],
        ['dario', '(leise) … Stimmt. Alles. Und ich will, dass es aufhört.'] ] },
      { t: '(Hand auf die Lehne neben ihm. Warten.)', staerke: 'warten', herz: { dario: 2 }, dann: [
        ['dario', '(nach einer langen Minute) Ich bin @annexe.cam. Also … ich war es.'] ] },
    ] },
    ['kaya', 'Danke, Dario. Das war sehr mutig. Wirklich.'],
    ['kaya', 'Das ist ernst. Und es wird Folgen haben.'],
    ['kaya', 'Aber du bist nicht allein damit.'],
    ['kaya', 'Ich rede mit der Direktion. Und mit deinen Eltern. Mit dir zusammen.'],
    ['dario', 'Und Luca?'],
    ['kaya', 'Um Luca kümmern sich auch Erwachsene. Nicht ihr.'],
    ['kaya', 'Und wenn es nachts zu schwer wird: 116 111. Anonym. Gratis.'],
    { tu: 'n9_kuedesEnde' },
  ],
  n9_ben: [
    ['ben', 'Gesund-Würfel! Selbst gebaut! Aus dem Karton von meinem neuen Bett.'],
    ['jo', 'Er hat ein neues Bett, weil er das alte kaputtgehüpft hat.'],
    ['ben', 'Beweis von Bewegung. Würfel!'],
    { szene: 'wuerfel', id: 'wuerfel', def: WUERFEL, ausgang: () => 'ok', folgen: { ok: { herz: { ben: 1, jo: 1, noah: 1 }, merke: 'wuerfelGespielt' } } },
    ['noah', 'Das war … schön. Einfach so. Ohne Grund.'],
  ],
  n9_ende: [
    ['kaya', 'Letzte Stunde vor dem Sommerfest. Jeder schreibt einen Gesund-Plan.'],
    ['kaya', 'Klein. Ein Schritt für den Schlaf, einer für den Körper.'],
    { wahl: [
      { t: 'Mein Plan: Handy um 22 Uhr in die Küche.', staerke: 'ruhig', merke: 'planSchlaf', dann: [['kaya', 'Klar und machbar. Genau so.']] },
      { t: 'Mein Plan: Jede Pause einmal raus. Korb oder Bank.', staerke: 'ruhig', merke: 'planPause', dann: [['ben', 'Korb. Mit mir. Plan angenommen.']] },
      { t: 'Mein Plan: Jeden Morgen frühstücken. Auch klein.', staerke: 'ruhig', merke: 'planEssen', dann: [['noah', 'Ich bring dir ein halbes Brötchen. Wie früher.']] },
    ] },
    { szene: 'koerper', id: 'bodyscan', def: { wo: 'Aula · Bodyscan, kurz', frage: 'Augen zu. Von den Füßen bis zum Kopf. Wo bist du heute ruhig?',
      vergleich: [{ wer: F.dario, zonen: ['brust'], satz: 'Brust. Zum ersten Mal seit Wochen. Da ist Platz.' }, { wer: F.noah, zonen: ['bauch'], satz: 'Bauch. Ruhig. Kein Stein.' }] },
      ausgang: () => 'ok', folgen: { ok: {} } },
    { tu: 'n9_schluss' },
  ],
};

export const tunN9 = (c) => ({
  n9_hilfe: () => (c.S.merke.darioVersprochen ? [['erzaehler', 'Abends kannst du nicht schlafen. Das Geheimnis ist jetzt auch in deinem Rucksack.'],
    { wahl: [
      { t: '(Dario schreiben: „Zu schwer für mich allein. Gehen wir zu Herrn Kuedes?“)', staerke: 'hilfe', herz: { dario: 1 }, merke: 'darioBegleiten', dann: [['dario', '(Nachricht) … ok. du hast recht. morgen. zusammen.']] },
      { t: '(Es weiter tragen.)', merke: 'geheimnisGetragen', dann: [['erzaehler', 'Am Dienstag steht Dario trotzdem vor der Aula. Er hat sich allein entschieden.']] },
    ] }] : []),
  n9_kuedesStart: () => (c.S.merke.darioBegleiten ? [['dario', 'Du bist gekommen. Okay. Okay. Wir gehen rein.']] : [['dario', 'Ich hab gewartet. Ich dachte, vielleicht kommst du.']]),
  n9_kuedesEnde: () => [
    ['erzaehler', 'Draußen setzt sich Dario auf die Treppe. Er zittert. Dann lacht er. Kurz.'],
    ['dario', 'Ich glaub, heute Nacht schlaf ich.'],
  ],
  n9_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 8 · Gesund und stark', titel: 'Akku geladen',
      gelernt: ['Ein Stress-Rucksack: tragen, warten, teilen, ablegen', 'Schlaf, Bewegung, Essen und Pausen laden den Akku', 'Ein Geheimnis, das zu schwer ist, gehört zu einem Erwachsenen', 'Kleine Schritte zählen – auch zehn Hampelmänner', 'Hilfe holen: Herr Kuedes, 116 111'],
      mission: 'Dein Gesund-Plan: ein Schritt. Eine Woche. Und einmal den Akku fragen, bevor er leer ist.' }, folgen: {} },
    ['erzaehler', 'Abends. Eine Nachricht von Herrn Kuedes an die ganze Klasse:'],
    ['kaya', '(Nachricht) Freitag ist Sommerfest.'],
    ['kaya', 'Dario möchte vor allen etwas sagen. Wer mag, steht dabei.'],
    { tu: 'kapitelEnde' },
  ],
});
