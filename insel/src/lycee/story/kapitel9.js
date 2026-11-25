// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 9 „Haltestelle, früh“, Anfang Juli.
// Verdecktes Thema: Gesund und stark (Schlaf, Stress, „Akku“, Geheimnisse, die man nicht tragen muss).
// Wer nicht schläft, hält immer weniger aus. Ein fremdes Geheimnis wiegt auch. Noah sagte im Dezember „Sagt’s keinem“,
// und das konnte man halten. Dario sagt es jetzt, und es geht nicht. Den Unterschied erklärt niemand – man spürt ihn
// am eigenen Akku (Anzeige links). Hilfe holen heißt hier: mitgehen, nicht abgeben.
import { S9_AKKU, S9_BODYSCAN } from './skills-j1.js';
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N9 = [
  { id: 'k9_frueh', kap: 9, tag: 'Montag', uhr: 6.67, titel: 'Haltestelle, früh', ziel: 'Dario sitzt auf der Bank. T-Shirt.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n9_nacht' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n9_beichte' } },
  { id: 'k9_skills', kap: 9, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Akku leer', ziel: 'Aula. Herr Kuedes hat einen Rucksack voller Steine dabei.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n9_skills' } },
  { id: 'k9_klinke', kap: 9, tag: 'Dienstag', uhr: 9.83, titel: 'Die Klinke', ziel: 'Gang vor dem SePAS. Dario steht an der Tür.', marker: 'dario', wenn: (m) => !m.k9Versprochen,
    start: { teleport: 'halle' },
    leute: { dario: [-11.2, -9.0, 2.6], kaya: [-12.6, -11.4, 0.6, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n9_klinke' } },
  { id: 'k9_tragen', kap: 9, tag: 'Dienstag', uhr: 12.17, titel: 'Tragen', ziel: 'Kantine. Noah hat dir einen Platz freigehalten.', marker: 'noah', wenn: (m) => !!m.k9Versprochen,
    start: { teleport: 'kantineTuer' },
    leute: { noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], mila: [16.65, -10.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'noah', gespraech: 'n9_tragen' } },
  { id: 'k9_klinkeDo', kap: 9, tag: 'Donnerstag', uhr: 9.83, titel: 'Die Klinke', ziel: 'Gang vor dem SePAS. Dario steht an der Tür.', marker: 'dario', wenn: (m) => !!m.k9Versprochen,
    start: { teleport: 'halle' },
    leute: { dario: [-11.2, -9.0, 2.6], kaya: [-12.6, -11.4, 0.6, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n9_klinke' } },
  { id: 'k9_ecke', kap: 9, tag: 'Donnerstag', uhr: 15.67, titel: 'Wenn ich falle', ziel: 'Skate-Ecke. Luca wartet auf dich.', marker: 'luca',
    start: { teleport: 'eingangHof' },
    leute: { luca: [-34.4, 11.4, 1.9], kenan: [-35.4, 12.6, 1.4] },
    fertig: { reden: 'luca', gespraech: 'n9_luca' } },
  { id: 'k9_ende', kap: 9, tag: 'Freitag', uhr: 10.0, neben: 'skills', titel: 'Skills: Mein Gesund-Plan', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA, dario: [-14.5, -61.4, 3.14] },
    fertig: { reden: 'kaya', gespraech: 'n9_ende' } },
  { id: 'k9_freitag', kap: 9, tag: 'Freitag', uhr: 14.0, titel: 'Alle Namen', ziel: 'Hof. Ben steht am Zaun.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [-6.4, 26.4, 2.8], luca: [6, 10, Math.PI], mesenberg: [7, 10.6, Math.PI] },
    fertig: { reden: 'ben', gespraech: 'n9_freitag' } },
];

// Skills-Stunde (freiwillig): Akku-Planer
const AKKU = {
  wo: 'Aula · Stell dir vor: ein Abend', titel: 'Euer Akku – seiner und deiner', start: 45, nacht: 20,
  stationen: [
    { zeit: '16:00', t: 'Ein Freund schreibt: „bin zu hause. kopf ist laut.“', verbrauch: 0, wahl: [
      { t: 'Zusammen raus. Skaten oder eine Runde laufen.', akku: 10, antwort: 'Er lacht einmal. Laut. Das hat gefehlt.' },
      { t: 'Video-Call, zusammen Hausaufgaben.', akku: 5, antwort: 'Erledigt. Er ist still, aber nicht allein.' },
      { t: 'Ein Meme schicken. Weiterzocken.', akku: 1, antwort: 'Er schickt 😂. Mehr nicht.' },
    ] },
    { zeit: '18:30', t: '„hab keinen hunger.“', wahl: [
      { t: '„Iss was Kleines. Ich auch. Foto davon?“', akku: 6, antwort: 'Ein Foto von einem Toast. Immerhin.' },
      { t: '„Okay. Kein Stress.“', akku: 1, antwort: 'Fair. Um neun knurrt sein Magen.' },
    ] },
    { zeit: '20:00', t: '„ich schau nur kurz, was @annexe.cam macht.“', wahl: [
      { t: '„Lass. Das macht es lauter. Spielen wir was?“', akku: 5, antwort: 'Eine Runde. Dann noch eine. Er schaut nicht nach.' },
      { t: '„Okay. Aber danach Handy weg.“', akku: -3, antwort: 'Danach war nicht danach.' },
    ] },
    { zeit: '22:00', t: '„kann nicht schlafen. telefonieren?“', wahl: [
      { t: '„Ja. Zehn Minuten. Dann schlafen wir beide.“', akku: 8, antwort: 'Er wird ruhiger. Du auch.' },
      { t: '„Ja. So lange du willst.“', akku: -4, antwort: 'Ihr legt um 0:40 auf. Er fühlt sich gehört. Morgen seid ihr beide leer.' },
      { t: '„Ich bin zu müde. Morgen an der Haltestelle?“', akku: 2, antwort: 'Er schreibt: „ok. danke.“ Grenzen sind erlaubt – auch beim Helfen.' },
    ] },
    { zeit: '22:30', t: 'Seine letzte Nachricht: „handy liegt in der küche. du auch?“', wahl: [
      { t: '(Handy auch weglegen. Licht aus.)', akku: 8, antwort: 'Einschlafen dauert. Aber es kommt.' },
      { t: '(Noch kurz scrollen.)', akku: -8, antwort: 'Es waren 34 Videos. Ihr wart beide wach.' },
    ] },
  ],
};


// ---------- Gesund-Würfel mit Ben (E29) ----------
// ---------- Montag 4:12 ----------
const DARIO412 = (m) => {
  const st = m.selbstZuhoeren ? 'du hast gesagt, du kannst zuhören.' : m.selbstMerken ? 'du hast gesagt, du merkst dir sachen. vergiss mich nicht.'
    : m.selbstLachen ? 'du hast gesagt, du bringst leute zum lachen. heute nicht. aber komm.' : 'du hast gesagt, du weißt noch nicht, was du kannst. ich glaub, das hier.';
  return {
    titel: 'Dario', mitglieder: 2, dauer: 20,
    nachrichten: [
      { nach: 0.6, wer: 'Dario', text: 'bist du wach' },
      { nach: 2.4, wer: 'Dario', text: 'kannst du den ersten bus nehmen' },
      { nach: 4.4, wer: 'Dario', text: 'bitte' },
      { nach: 7, wer: 'Dario', text: st },
    ],
    aktionen: [
      { id: 'ja', t: '„ja. ich komm.“', symbol: '✍️', setzt: 'ja', ich: 'ja. ich komm.', folgen: [{ nach: 1.5, wer: 'Dario', text: 'danke' }], ende: true },
      { id: 'was', t: '„was ist los?“', symbol: '❓', setzt: 'was', ich: 'was ist los?', folgen: [{ nach: 2, wer: 'Dario', text: 'sag ich dir dann. bitte.' }] },
    ],
  };
};

// ---------- Die Klinke: Mut-Balken (Entscheidung B) ----------
const MUT_KLINKE = {
  wo: 'Gang vor dem SePAS', titel: 'Die Klinke', situation: 'Darios Hand liegt auf der Klinke. Sie bewegt sich nicht.', dauer: 4.5,
  stufen: [
    { ab: 0, optionen: [{ key: 'warten', t: '(Warten. Neben ihm.)' }] },
    { ab: 0.4, optionen: [{ key: 'klopfen', t: '(Für ihn klopfen.)' }] },
    { ab: 0.75, optionen: [{ key: 'vorgehen', t: '(Vorgehen. Die Tür offen lassen.)' }] },
  ],
};

// ---------- Donnerstag 15:40: Luca hat Angst (Hitze-Duell) ----------
const LUCA9 = (m) => ({
  gegner: F.luca || { name: 'Luca', farbe: '#7a6fb0' }, wo: 'Skate-Ecke · 15:40', hitze: m.k8LucaDroht ? 55 : 35, zeit: 9, publikum: 'Kenan steht daneben.',
  runden: [
    { sagt: 'Wenn ich falle, fallen alle. Du auch, Hinten links.', karten: [
      { t: '„Dann fall halt.“', hitze: 20, art: 'angriff', antwort: '(lacht nicht) Pass auf.' },
      { t: '„Ich hab nichts zu verstecken.“', hitze: -5, respekt: 1, art: 'klar', antwort: 'Jeder hat was.' },
      { t: '(Ruhig bleiben. Hinschauen.)', hitze: -10, art: 'ruhig', antwort: '…' },
    ], still: { antwort: 'Siehst du. Nichts mehr zu sagen.', hitze: 5 } },
    { sagt: m.abgestimmt ? 'Du hast im September auch abgestimmt. Ich hab’s gesehen.' : 'Du hast auch zugeschaut. Jeden Tag.', karten: [
      { t: '„Stimmt. Und?“', hitze: -10, respekt: 2, art: 'klar', antwort: '(blinzelt) …' },
      { t: '„Halt die Klappe!“', hitze: 25, art: 'angriff', antwort: 'Na also. Da ist sie, die Wut.' },
      { t: '„Das hat nichts mit dir zu tun.“', hitze: 0, art: 'klar', antwort: 'Alles hat mit mir zu tun.' },
    ], still: { antwort: '(grinst schief)', hitze: 0 } },
    { sagt: '(leiser) Die werfen mich raus. Weißt du das?', karten: [
      { t: '„Ja. Und du bekommst jemanden zum Reden. Jeder hier.“', hitze: -15, respekt: 2, art: 'klar', antwort: '(schaut weg) … Toll.' },
      { t: '„Verdient.“', hitze: 20, art: 'angriff', antwort: '(tritt gegen die Rampe)' },
      { t: '(Nichts sagen. Nicht zurückschlagen.)', hitze: -10, art: 'ruhig', antwort: '…' },
    ], still: { antwort: '…', hitze: -5 } },
  ],
});

export const GESPRAECHE_N9 = {
  n9_nacht: [
    { blende: 'Sonntag · 23:50' },
    { tu: 'n9_akkuStart' },
    ['erzaehler', 'Du liegst wach. Das Armband. Immer wieder das Armband.'],
    { wahl: [
      { t: '(Mila schreiben, was du gesehen hast.)', merke: 'k9MilaGeschrieben', dann: [
        ['erzaehler', 'Du schreibst: „dario hat ein armband. wie auf der zeichnung.“'],
        ['mila', '(Nachricht) Ein Armband ist ein Hinweis. Kein Beweis. Schlaf.'] ] },
      { t: '(Liegen bleiben.)', dann: [['erzaehler', 'Die Decke ist zu warm. Dann zu kalt.'], { anzeige: 'akku', plus: -4 }] },
    ] },
    { blende: 'Montag · 4:12' },
    { anzeige: 'akku', wert: 31 },
    { szene: 'chat', id: 'dario412', def: (m) => DARIO412(m), ausgang: (r) => (r.flags.ja ? 'ja' : 'still'), folgen: { ja: { herz: { dario: 1 } }, still: {} } },
    { blende: 'Montag · 6:40' },
  ],
  // Montag 6:40 (Fable, Schlüsselszene K9) – Entscheidung A: „Sag’s keinem.“
  n9_beichte: [
    ['erzaehler', 'Montag. 6:40. Das Licht ist noch gelb. Die Bank ist trocken.'],
    ['erzaehler', 'Dario sitzt da. T-Shirt. Das Armband am linken Handgelenk.'],
    ['dario', 'Du bist gekommen.'],
    { wahl: [
      { t: '„Du hast ‚bitte‘ geschrieben.“', dann: [['dario', '(nickt) Dreimal gelöscht. Dann doch geschickt.']] },
      { t: '„Ich hab das Armband gesehen.“', dann: [['dario', '(schaut auf sein Handgelenk) Ich weiß. Ich versteck es nicht mehr.']] },
      { t: '(Dich setzen.)', staerke: 'warten', dann: [['erzaehler', 'Du setzt dich. Nicht zu nah. Er rutscht nicht weg.']] },
    ] },
    ['dario', 'Ich hab das Foto gemacht. Deins. Am ersten Tag.'],
    ['dario', 'Alle Fotos. Bis Dezember.'],
    ['erzaehler', 'Er legt das Handy auf die Bank. Display nach unten.'],
    ['erzaehler', 'Das Glas hat einen Sprung. Unten links.'],
    { tu: 'n9_sprung' },
    { wahl: [
      { t: '„Warum ich?“', dann: [['erzaehler', 'Er braucht lange für die Antwort.']] },
      { t: '„Warum sagst du es jetzt?“', dann: [['dario', 'Weil Freitag Namen kommen. Und weil ich nicht mehr schlafe.'], ['dario', 'Und du willst wissen, warum du. Ich weiß.']] },
      { t: '(Nichts sagen.)', staerke: 'zuhoeren', dann: [['erzaehler', 'Er wartet, ob du gehst. Du gehst nicht.']] },
    ] },
    ['dario', 'Du warst neu. Dich kannte keiner. Das war einfach.'],
    ['dario', 'Zweihundert Likes. Ich hatte noch nie zweihundert von irgendwas.'],
    ['dario', 'Dann wollte Luca das Passwort. Nur mal gucken.'],
    ['dario', 'Der Fake. Das Video. Das war ich nicht.'],
    ['dario', 'Aber es ist mein Account.'],
    ['dario', 'Ich schlaf nicht mehr. Seit dem Foto von Noah.'],
    ['dario', 'Ich hab jeden Morgen neben dir gesessen.'],
    ['dario', 'Das ist das Schlimmste, oder?'],
    ['erzaehler', 'Eine Amsel. Sonst nichts. Kein Auto, kein Bus.'],
    { tu: 'n9_datei' },
    ['dario', 'Sag’s keinem. Bitte.'],
    { warum: true, fest: true, wahl: [
      { t: '„Ich sag nichts. Versprochen.“', herz: { dario: 1 }, merke: 'k9Versprochen', dann: [['erzaehler', 'Dario atmet aus. Lange.'], ['erzaehler', 'Jetzt trägst du es.'], { anzeige: 'akku', plus: -6 }] },
      { t: '„Das kann ich nicht versprechen.“', staerke: 'klar', merke: 'k9NichtVersprochen', dann: [['erzaehler', 'Dario steht auf. Er läuft weg. Das Brett unter dem Arm.']] },
      { t: '„Komm mit zu Herrn Kuedes.“', staerke: 'hilfe', herz: { dario: 1 }, merke: 'k9Mitkommen', dann: [['dario', 'Jetzt?'], ['du', 'Morgen. Ich geh mit.'], ['dario', '… Erste Pause. Wenn du wirklich mitkommst.']] },
      { t: '(Aufstehen und gehen.)', merke: 'k9Gegangen', dann: [['erzaehler', 'Du gehst. Er sitzt allein auf der Bank, bis der Bus kommt.']] },
    ] },
    ['erzaehler', 'Gerd landet auf dem Mülleimer. Opa Nik ist noch nicht da.'],
    { blende: 'Montag · 7:25' },
    ['erzaehler', 'Der normale Bus. Opa Nik setzt sich zwischen euch und die anderen.'],
    { tu: 'n9_nik' },
    ['erzaehler', 'Lina geht vorbei. Sie bleibt kurz stehen. Dann geht sie weiter.'],
    { tu: 'n9_mittag' },
  ],
  n9_skills: [
    ['erzaehler', 'Aula. Herr Mesenberg stellt einen Rucksack auf den Boden. Er klingt nach Steinen.'],
    { szene: 'skillsStunde', id: 's9_akku', def: S9_AKKU, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'hilfe', merke: 's9Akku' }, weiter: { merke: 's9Akku' } } },
    ['kaya', 'Jetzt anwenden. Ein Freund kann nicht schlafen. Er schreibt euch.'],
    ['kaya', 'Plant den Abend. Für ihn UND für euch.'],
    { szene: 'akku', id: 'akku', def: AKKU, ausgang: (r) => (r.akku >= 55 ? 'voll' : r.akku >= 35 ? 'mittel' : 'leer'),
      folgen: {
        voll: { staerke: 'ruhig', merke: 'akkuVoll', dann: [['kaya', 'Geholfen – und selbst noch Akku übrig. Genau das ist die Kunst.']] },
        mittel: { merke: 'akkuMittel', dann: [['kaya', 'Geht. Ein Hebel reicht oft. Meistens der späte Abend.']] },
        leer: { merke: 'akkuLeer', dann: [['jo', 'Ich bin bei 12 Prozent. Vom Zuhören allein.'], ['kaya', 'Wer anderen hilft, darf auch an sich denken. Das ist kein Egoismus.']] },
      } },
  ],
  // Die Klinke – Entscheidung B. Danach: Herr Kuedes übernimmt. Mitgehen, nicht abgeben.
  n9_klinke: [
    { tu: 'n9_klinkeStart' },
    ['erzaehler', 'Darios Hand liegt auf der Klinke.'],
    ['dario', 'Ich kann da nicht rein.'],
    { szene: 'atem', id: 'atemDario', def: { wo: 'Gang vor dem SePAS', wer: F.dario || { name: 'Dario', farbe: '#d9693f' }, info: 'Darios Atem ist kurz. Atme ruhig vor. Er macht mit.', start: 85, ziel: 45,
      saetze: { 85: '(die Hand zittert auf der Klinke)', 65: 'Okay. Okay.', 50: '(atmet aus. Lang.)' } },
      ausgang: (r, m) => ((r.gut || 0) >= 2 ? 'standard' : ((m.k9AtemNicht = true), 'nicht')),
      folgen: { standard: {}, nicht: { dann: [['dario', '(lässt die Klinke los) Es geht nicht. Ich krieg das nicht hin.'], ['erzaehler', 'Er rutscht an der Wand runter. Du setzt dich daneben. Der Gang ist leer.']] } } },
    { szene: 'mut', id: 'mutKlinke', def: MUT_KLINKE, ausgang: (r) => r.key,
      folgen: {
        klopfen: { merke: 'k9Geklopft', dann: [['erzaehler', 'Du klopfst. Dario zuckt zusammen.'], ['kaya', 'Herein.']] },
        warten: { staerke: 'warten', merke: 'k9Gewartet', dann: [['erzaehler', 'Ihr wartet. Lange. Die Stunde bei Mme Nouvelle fängt ohne euch an.'], ['erzaehler', 'Dann klopft er. Selbst.']] },
        vorgehen: { staerke: 'mut', merke: 'k9Vorgegangen', dann: [['erzaehler', 'Du gehst rein. Die Tür bleibt offen.'], ['erzaehler', 'Nach einer Minute steht Dario neben dir.']] },
      } },
    ['kaya', 'Bevor du weiterredest: Das kann ich nicht für mich behalten.'],
    { tu: 'n9_erzaehlt' },
    ['kaya', 'Hier. 116 111. Kanner- a Jugendtelefon. Zum Reden. Ohne Namen.'],
    ['kaya', 'Und wie die Klasse es erfährt, entscheidest du mit.'],
    ['dario', 'Ich will es selber sagen.'],
    { tu: 'n9_nachKlinke' },
    { anzeige: 'akku', wert: 55 },
    ['kaya', '(zu dir) Herr Mesenberg redet mit Luca. Auch er bekommt jemanden.'],
    { tu: 'n9_kenan' },
  ],
  n9_tragen: [
    { anzeige: 'akku', wert: 25 },
    ['erzaehler', 'Dienstag. Kantine. Du hast kaum geschlafen. Das Essen schmeckt nach nichts.'],
    ['noah', 'Du isst nichts. Alles okay?'],
    ['du', 'Lass mich einfach!'],
    ['erzaehler', 'Zu laut. Noah zieht den Kopf ein. Am Nebentisch schauen zwei her.'],
    { wahl: [
      { t: '(Dich entschuldigen.)', herz: { noah: 1 }, dann: [['du', 'Sorry. Das war nicht wegen dir.'], ['noah', 'Weiß ich. Wegen wem dann?'], ['erzaehler', 'Du sagst nichts. Du hast es versprochen.']] },
      { t: '(Nichts sagen.)', herz: { noah: -1 }, merke: 'k9NoahAngefahren', dann: [['erzaehler', 'Noah isst schweigend weiter. Er setzt sich morgen trotzdem wieder hin. Glaubst du.']] },
    ] },
    { blende: 'Mittwoch' },
    { anzeige: 'akku', wert: 20 },
    ['mila', 'Du lügst schlecht.'],
    ['mila', 'Du weißt was. Seit Montag.'],
    { wahl: [
      { t: '„Ich hab es versprochen.“', dann: [['mila', 'Versprechen, die einen kaputtmachen, darf man brechen. Steht nirgends. Stimmt trotzdem.']] },
      { t: '(Schweigen.)', dann: [['mila', 'Okay. Ich frag nicht mehr. Aber ich seh es.']] },
    ] },
    ['erzaehler', 'Dario fehlt heute in der Schule.'],
  ],
  n9_luca: [
    { tu: 'n9_lucaStart' },
    ['luca', '(ruhig) Lowkey mutig von ihm.'],
    ['luca', 'Weißt du, was in dem Account alles drin ist? Wer was geschickt hat. Wer abgestimmt hat.'],
    ['erzaehler', 'Kenan steht neben ihm.'],
    { szene: 'hitze', id: 'luca9', def: (m) => LUCA9(m), ausgang: (r) => (r.knall ? 'knall' : r.hitze <= 40 ? 'ruhig' : 'heiss'),
      folgen: {
        ruhig: { staerke: 'ruhig', merke: 'k9LucaRuhig' },
        heiss: { merke: 'k9LucaHeiss' },
        knall: { merke: 'k9LucaKnall', dann: [['mesenberg', '(von der Tür) Luca. Mitkommen. Jetzt.']] },
      } },
    ['erzaehler', 'Luca hat Angst. Man sieht es an seinen Händen.'],
    ['kenan', 'Ich bin raus.'],
    ['erzaehler', 'Er steht nicht mehr neben ihm.'],
  ],
  n9_freitag: [
    ['erzaehler', 'Freitag. 14:00. Luca geht mit Herrn Mesenberg über den Hof. Zur Direktion.'],
    ['erzaehler', 'Keiner filmt. Zum ersten Mal.'],
    ['ben', 'Was passiert jetzt mit ihm?'],
    { wahl: [
      { t: '„Weiß ich nicht. Das machen jetzt die Erwachsenen.“', dann: [['ben', 'Komisch. Das fühlt sich gut an. Und blöd.']] },
      { t: '(Zuschauen.)', dann: [] },
    ] },
    { blende: 'Freitag · 21:00' },
    ['erzaehler', '@annexe.cam postet eine schwarze Kachel. Weiße Schrift.'],
    ['erzaehler', '„sommerfest. freitag. 15:00. alle namen.“'],
    ['jo', '(Nachricht) ich bin tot'],
    { tu: 'kapitelEnde' },
  ],
  n9_ende: [
    // Gesund-Plan als Wenn-dann-Plan (Umsetzungs-Absicht) mit Hindernis – und in Kap. 10 fragt jemand nach, ob er gehalten hat.
    ['kaya', 'Letzte Stunde der Woche. Jeder schreibt einen Gesund-Plan.'],
    ['kaya', 'Nicht „ich will gesünder“. Sondern: Wenn … dann …'],
    { wahl: [
      { t: 'Wenn ich ins Bett gehe, dann kommt das Handy in die Küche.', staerke: 'ruhig', merke: 'planSchlaf', dann: [['kaya', 'Klar und machbar. Genau so.']] },
      { t: 'Wenn es zur Pause klingelt, dann geh ich raus. Korb oder Bank.', staerke: 'ruhig', merke: 'planPause', dann: [['ben', 'Korb. Mit mir. Plan angenommen.']] },
      { t: 'Wenn ich morgens Schuhe anziehe, hab ich schon was gegessen. Auch klein.', staerke: 'ruhig', merke: 'planEssen', dann: [['noah', 'Ich bring dir ein halbes Brötchen. Wie früher.']] },
    ] },
    ['kaya', 'Und jetzt das Wichtigste: Was kommt dazwischen?'],
    { wahl: [
      { t: '„Ich vergess es einfach.“', merke: 'planHindernisVergessen', dann: [['kaya', 'Dann ein Zettel. Am Spiegel. Oder ein Freund, der fragt.']] },
      { t: '„Die anderen machen nicht mit.“', merke: 'planHindernisAndere', dann: [['kaya', 'Dann ein Satz bereit: „Ich mach das heute so.“ Fertig.']] },
      { t: '„Ich hab einen schlechten Tag.“', staerke: 'lesen', merke: 'planHindernisTag', dann: [['kaya', 'Dann halber Plan. Halb ist nicht null.']] },
    ] },
    ['kaya', 'Jetzt noch der Körper. Ein Bodyscan, ganz in Ruhe.'],
    { szene: 'skillsStunde', id: 'bodyscan', def: S9_BODYSCAN, ausgang: () => 'ok', folgen: { ok: { merke: 'bodyscanGemacht' } } },
    ['dario', '(leise) Brust. Zum ersten Mal seit Wochen ist da Platz.'],
    { tu: 'n9_schluss' },
  ],
};

export const tunN9 = (c) => ({
  n9_akkuStart: () => {
    c.anzeige('akku', 38);
    if (!c.S.merke.akkuGezeigt) { c.S.merke.akkuGezeigt = true; c.ui.toast('<b>Dein Akku · 38 %</b><span>Links. Er bleibt die ganze Woche da.</span>'); }
    return [];
  },
  n9_sprung: () => { c.S.merke.spurSprung = true; c.ui.toast('<b>🔎 Der Kratzer</b><span>Unten links. Auf jedem Foto bis Dezember.</span>', 'ly-t-ent'); return []; },
  n9_datei: () => (c.S.merke.k6Datei ? [['dario', 'Die Sprachnachricht im Januar. Das war das Einzige, was ich mich getraut hab.']] : []),
  n9_nik: () => (c.S.merke.k9Gegangen ? [['nik', '(zu Dario) Du siehst aus wie nach einer Nachtschicht, Bub.']] : [['nik', 'Ihr zwei seht aus wie nach einer Nachtschicht.']]),
  n9_mittag: () => ((c.S.merke.k9NichtVersprochen || c.S.merke.k9Gegangen) ? [
    { blende: 'Montag · 12:10' },
    ['dario', '(Nachricht) kommst du mit?'],
    ['dario', '(Nachricht) morgen. 9:50. sepas.'],
  ] : []),
  n9_klinkeStart: () => {
    const m = c.S.merke;
    if (m.k9Versprochen) return [['erzaehler', 'Donnerstag. Drei Tage hast du es getragen.'], ['dario', '(schaut dich an) Du siehst aus wie ich.'], ['erzaehler', 'Er ist von selbst gekommen.'], ['erzaehler', 'Mila weiß inzwischen, dass du es seit Montag wusstest.']];
    if (m.k9Mitkommen) return [['erzaehler', 'Dienstag. 9:50. Erste Pause.'], ['dario', 'Du bist da.']];
    return [['erzaehler', 'Dienstag. 9:50.'], ['dario', 'Du hast nichts versprochen. Deshalb bist du hier, oder?']];
  },
  n9_erzaehlt: () => (c.S.merke.k9Geklopft ? [['erzaehler', 'Dario nickt. Er sagt wenig. Leise.']] : [['erzaehler', 'Dario nickt. Und erzählt. Alles. Vom ersten Tag an.']]),
  n9_nachKlinke: () => (c.S.merke.k9Geklopft ? [['dario', '(draußen, zu dir) Ich wollte selber.']] : c.S.merke.k9Vorgegangen ? [['dario', '(draußen) Du hast die Tür offen gelassen. Das war gut.']] : []),
  n9_kenan: () => (c.S.merke.k8KenanDrin ? [['erzaehler', 'Kenan wurde befragt. Er geht dir aus dem Weg.'], ['kenan', '(im Vorbeigehen) Ich war’s nicht. Aber ich weiß, wer da stand.']]
    : [{ blende: 'Mittwoch' }, ['kenan', '(an der Treppe, leise) Ich war’s nicht. Aber ich weiß, wer da stand.']]),
  n9_lucaStart: () => (c.S.merke.k8LucaDroht || c.S.merke.k8LucaDrin ? [['erzaehler', 'Seit Mittwoch weiß die halbe Schule, dass Lucas Name in einer Mappe steht. Er weiß es auch.']] : []),
  n9_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 8 · Gesund und stark', titel: 'Akku geladen',
      gelernt: ['Ein Stress-Rucksack: tragen, warten, teilen, ablegen', 'Schlaf, Bewegung, Essen und Pausen laden den Akku', 'Macht ein Geheimnis Angst oder schadet es? Dann darfst du es sagen.', 'Kleine Schritte zählen – auch zehn Hampelmänner', 'Hilfe holen: Herr Kuedes, 116 111'],
      mission: 'Dein Gesund-Plan: ein Schritt. Eine Woche. Und einmal den Akku fragen, bevor er leer ist.' }, folgen: {} },
  ],
});
