// Drei Jahre Annexe – 7ème, Kapitel 9 „Gesund und stark“ (Kurs Jahr 1, Modul 8: E29 Gesund und stark – Rucksack-Rennen,
// Stress-Rucksack, Vier Ecken mit Tipp, Gesund-Würfel, Gesund-Plan, Bodyscan). Behutsam: schwere Gefühle → Hilfe-Wege
// (Herr Kuedes, 116 111). Faden @annexe.cam: Dario kann nicht mehr schlafen. Er erzählt, wie alles angefangen hat.
import { S9_AKKU, S9_BODYSCAN } from './skills-j1.js';
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N9 = [
  { id: 'k9_dario', kap: 9, tag: 'Montag', uhr: 7.45, titel: 'Dario', ziel: 'Dario wartet an der Haltestelle. Sehr früh. Sehr müde.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n9_morgen' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n9_dario' } },
  { id: 'k9_skills', kap: 9, tag: 'Montag', uhr: 9.9, titel: 'Skills: Akku leer', ziel: 'Aula. Herr Kuedes hat einen Rucksack voller Steine dabei.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n9_skills' } },
  { id: 'k9_kuedes', kap: 9, tag: 'Dienstag', uhr: 10.0, titel: 'Zu zweit zu Herrn Kuedes', ziel: 'Dario steht vor der Aula. Er geht nicht allein rein.', marker: 'dario',
    start: { teleport: 'eingangHof' },
    leute: { dario: [-13.6, -51.2, Math.PI], kaya: [-14.50, -65.40, 0.00] },
    fertig: { reden: 'dario', gespraech: 'n9_kuedes' } },
  { id: 'k9_ben', kap: 9, tag: 'Mittwoch', uhr: 12.4, titel: 'Bens Gesund-Würfel', ziel: 'Ben am Korb. Er hat einen riesigen Würfel aus Pappe gebaut.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [28.4, 13.6, 2.6], jo: [26.8, 14.6, 1.6], noah: [27.2, 16.2, 0.8] },
    fertig: { reden: 'ben', gespraech: 'n9_ben' } },
  { id: 'k9_ende', kap: 9, tag: 'Freitag', uhr: 10.0, titel: 'Mein Gesund-Plan', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA, dario: [-9.8, -55.2, -1.4] },
    fertig: { reden: 'kaya', gespraech: 'n9_ende' } },
];

// ---------- Darios Rucksack (E29 Stress-Rucksack) ----------
const DARIOS_RUCKSACK = {
  wo: 'Haltestelle · mit Dario', titel: 'Darios Rucksack',
  dinge: [
    { t: 'Das Geheimnis: Ich hab @annexe.cam angefangen.', sy: '🤐', kg: 6, passt: ['teilen'], warum: '„Wenn ich’s sage, ist es raus. Nicht mehr nur bei mir.“' },
    { t: 'Luca hat das Passwort. Ich komm nicht mehr rein.', sy: '🔑', kg: 4, passt: ['teilen'], warum: 'Das Passwort zurückholen: Das machen Erwachsene.' },
    { t: 'Nachts guck ich jede Stunde, was gepostet wird.', sy: '📱', kg: 4, passt: ['warten', 'teilen'], warum: 'Nachts kann man nichts ändern. Das kann bis morgen warten.' },
    { t: 'Angst, von der Schule zu fliegen.', sy: '😰', kg: 3, passt: ['teilen'], warum: 'Angst wird kleiner, wenn jemand mitträgt. Zum Beispiel Herr Kuedes.' },
    { t: 'Mathe-Test, zweiter Versuch, am Freitag.', sy: '📐', kg: 2, passt: ['tragen'], warum: 'Das ist echt seins. Aber es ist klein, wenn der Rest leichter ist.' },
    { t: '„Alle denken, ich bin cool. Ich muss cool bleiben.“', sy: '😎', kg: 3, passt: ['nicht'], warum: '„Cool sein ist anstrengend. Seit Monaten.“' },
  ],
};

// ---------- Akku-Abend (E29): Ein Freund kann nicht schlafen und schreibt dir. Euer Akku – seiner UND deiner. ----------
// Keine „richtigen“ Antworten: Wer hilft, braucht selbst Akku. Grenzen beim Helfen sind erlaubt.
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
const WUERFEL = {
  wo: 'Hof · Bens Pappwürfel', runden: 3,
  aufgaben: [
    { t: '10 Hampelmänner. Jetzt. Tippen!', sy: '🤸', art: 'tippen', n: 10, wer: F.ben, sagt: 'Neun. Zählt fast.' },
    { t: 'Ein großes Glas Wasser. Austrinken!', sy: '💧', art: 'halten', n: 3, wer: F.noah, sagt: 'Ich hol uns zwei.' },
    { t: 'Ohne Handy. Nichts anfassen.', sy: '📵', art: 'still', n: 5, wer: F.jo, sagt: 'Drei Minuten. Das ist Folter. … Okay, geht.' },
    { t: 'Jemandem was Nettes sagen. In echt.', sy: '💬', art: 'wahl', optionen: ['„Ben, du machst jede Pause besser.“', '„Jo, dein Wurf vorhin war krass.“', '„Noah, danke für den Platz im Bus.“'], wer: F.ben, sagt: 'Du hast heute schöne Schuhe. Ich mein’s ernst.' },
    { t: 'Fünf Körbe. Schnell!', sy: '🏀', art: 'tippen', n: 5, zeit: 5, wer: F.jo, sagt: 'Ich zähl mit. Drei. Respekt.' },
    { t: 'In den Himmel gucken. Nichts anfassen.', sy: '☁️', art: 'still', n: 5, wer: F.noah, sagt: 'Die Wolke sieht aus wie Gerd.' },
  ],
};

export const GESPRAECHE_N9 = {
  n9_morgen: [
    ['erzaehler', 'Montag, 7:12. Gestern Nacht hast du geschrieben: „Haltestelle, früh.“'],
    ['erzaehler', 'Er sitzt schon da. Kapuze auf. Augenringe bis zum Kinn.'],
    // Jugendwelt heute: eine Serie, die nicht sterben darf – und ein KI-Chat um drei Uhr nachts.
    ['dario', '(hält das Handy hoch) 214 Tage. Meine Serie mit Luca.'],
    ['dario', 'Wir reden nicht mehr. Aber ich schick jeden Tag ein schwarzes Bild.'],
    ['dario', 'Sonst ist die Flamme weg. Dann ist alles weg.'],
    { wahl: [
      { t: '„Was passiert, wenn die Flamme ausgeht?“', staerke: 'zuhoeren', herz: { dario: 1 }, merke: 'serieGefragt', dann: [['dario', '… Nichts. Eigentlich nichts.'], ['erzaehler', 'Er drückt nicht auf Senden. Zum ersten Mal.']] },
      { t: '„214 Tage Bilder schicken. An einen, der nie redet?“', staerke: 'klar', herz: { dario: 1 }, merke: 'serieGefragt', dann: [['dario', 'Weiß ich. Klingt dumm, wenn du’s laut sagst.']] },
    ] },
    ['dario', 'Gestern Abend hab ich stundenlang mit so einer KI geschrieben.'],
    ['dario', 'Sie war nett. Sie hat immer sofort geantwortet.'],
    ['dario', 'Am Ende schrieb sie: „Rede mit einem Menschen, dem du vertraust.“'],
    ['dario', 'Darum hab ich dir geschrieben.'],
    { wahl: [
      { t: '„Gut, dass du’s gemacht hast. Ich bin da.“', staerke: 'kontakt', herz: { dario: 2 }, merke: 'darioMensch', dann: [['dario', '(nickt. Lange.)']] },
      { t: '„Eine KI hört zu. Aber sie geht nicht mit zu Herrn Kuedes.“', staerke: 'hilfe', herz: { dario: 1 }, merke: 'darioMensch', dann: [['dario', '… Und du?'], ['erzaehler', 'Du nickst.']] },
    ] },
  ],
  n9_dario: [
    ['dario', 'Danke, dass du kommst. Willkommen im Zombie-Team.'],
    ['dario', 'Ich bin Kapitän. Seit Wochen kein Schlaf.'],
    ['dario', 'Ich hab @annexe.cam angefangen. Im Herbst. Ich.'],
    ['dario', 'Am ersten Tag hab ich dich fotografiert. Luca hat gelacht.'],
    ['dario', 'Ich war plötzlich wer. Also hab ich weitergemacht.'],
    ['dario', 'Dann wollte Luca das Passwort. Ich hab’s ihm gegeben.'],
    ['dario', 'Ab da wurden die Texte gemein. Seine Texte.'],
    { tu: 'n9_nummer' },
    { wahl: [
      { t: '„Ich weiß es schon. Der Winkel. Von links unten.“', wenn: (m) => m.spurDario || m.spurDarioAngst || m.spurSkate, staerke: 'lesen', herz: { dario: 1 }, merke: 'spurGeloest', dann: [['dario', '(starrt dich an) … Seit wann?'], ['dario', 'Und du hast es trotzdem nicht gepostet. Krass.']] },
      { t: '(Zuhören. Nicken. Nichts sagen.)', staerke: 'zuhoeren', herz: { dario: 2 }, dann: [['dario', 'Ich hab nicht gedacht, dass du einfach zuhörst. Nach allem.']] },
      { t: '„Und das Foto von Noah? War das auch du?“', staerke: 'mut', herz: { dario: 1 }, dann: [['dario', '(nickt) Das erste. Ja. Ohne Text. Den Text hat Luca dazugemacht.'], ['dario', 'Ich schäm mich. Jeden Tag.']] },
      { t: '„Warum erzählst du das ausgerechnet mir?“', staerke: 'lesen', herz: { dario: 1 }, dann: [['dario', 'Weil du weißt, wie das ist. Gepostet werden.']] },
    ] },
    ['dario', 'Kannst du … das für dich behalten?'],
    { wahl: [
      { t: '„Für mich behalten, nein. Aber ich geh mit dir zu Herrn Kuedes.“', staerke: 'hilfe', herz: { dario: 2, kaya: 1 }, merke: 'darioBegleiten', dann: [['dario', '… Zusammen? Okay. Morgen. Bevor ich es mir anders überlege.']] },
      { t: '„Versprochen. Ich sag nichts.“', merke: 'darioVersprochen', dann: [['dario', '(atmet aus) Danke.'], ['erzaehler', 'Du fühlst es sofort: Jetzt trägst du es mit. Allein.']] },
      { t: '„Das ist zu groß für uns zwei. Wir brauchen einen Erwachsenen.“', staerke: 'hilfe', herz: { dario: 1, kaya: 1 }, merke: 'darioBegleiten', dann: [['dario', 'Herr Kuedes? … Der ist okay. Kommst du mit?']] },
    ] },
    ['dario', 'Ich hab so viel im Kopf. Ich weiß nicht mal, was.'],
    { szene: 'rucksack', id: 'darioRucksack', def: DARIOS_RUCKSACK, ausgang: (r) => (r.geteilt >= 2 ? 'leichter' : 'schwer'),
      folgen: {
        leichter: { staerke: 'lesen', herz: { dario: 2 }, merke: 'rucksackLeichter', dann: [['dario', 'Wenn man es so sortiert … ist es weniger. Komisch.']] },
        schwer: { herz: { dario: 1 }, dann: [['dario', 'Immer noch schwer. Aber jetzt weiß ich, was drin ist.']] },
      } },
    { tu: 'n9_hilfe' },
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
    ['kaya', 'Okay. Gut, dass ihr zu zweit seid.'],
    ['kaya', 'Das ist ernst. Aber du bist nicht allein damit.'],
    ['kaya', 'Ich rede mit der Direktion. Und mit deinen Eltern. Mit dir zusammen.'],
    ['dario', 'Und Luca?'],
    ['kaya', 'Um Luca kümmern sich auch Erwachsene. Nicht ihr.'],
    ['kaya', 'Und heute Nacht: Handy aus. Ich bin morgen um acht da.'],
    { tu: 'n9_kuedesEnde' },
  ],
  n9_ben: [
    ['ben', 'Gesund-Würfel! Selbst gebaut! Aus dem Karton von meinem neuen Bett.'],
    ['jo', 'Er hat ein neues Bett, weil er das alte kaputtgehüpft hat.'],
    ['ben', 'Beweis von Bewegung. Würfel!'],
    { szene: 'wuerfel', id: 'wuerfel', def: WUERFEL, ausgang: () => 'ok', folgen: { ok: { herz: { ben: 1, jo: 1, noah: 1 }, merke: 'wuerfelGespielt' } } },
    ['noah', 'Das war … schön. Einfach so. Ohne Grund.'],
    ['erzaehler', 'Dario kommt über den Hof. Allein. Er bleibt stehen.'],
    ['jo', '(leise) Was will der hier?'],
    { wahl: [
      { t: '„Dario. Würfelst du mit?“', staerke: 'einbeziehen', herz: { dario: 1, jo: -1 }, merke: 'darioWuerfel', dann: [['dario', '… Real? Eine Runde.'], ['jo', '(guckt weg) Eine. Dann sehen wir.']] },
      { t: '(Weiterspielen.)', dann: [['erzaehler', 'Dario guckt kurz zu. Dann geht er.']] },
    ] },
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
  n9_nummer: () => (c.S.merke.spurNummer ? [['dario', 'Die Nachricht mit der 77. „Ich seh alles.“ Auch ich.']] : []),
  n9_hilfe: () => (c.S.merke.darioVersprochen ? [['erzaehler', 'Abends kannst du nicht schlafen. Das Geheimnis ist jetzt auch in deinem Rucksack.'],
    { wahl: [
      { t: '(Dario schreiben: „Zu schwer für mich allein. Gehen wir zu Herrn Kuedes?“)', staerke: 'hilfe', herz: { dario: 1 }, merke: 'darioBegleiten', dann: [['dario', '(Nachricht) … ok. du hast recht. morgen. zusammen.']] },
      { t: '(Es weiter tragen.)', merke: 'geheimnisGetragen', dann: [['erzaehler', 'Am Dienstag steht Dario trotzdem vor der Aula. Er hat sich allein entschieden.']] },
    ] }] : []),
  n9_kuedesStart: () => (c.S.merke.darioBegleiten ? [['dario', 'Du bist gekommen. Okay. Okay. Wir gehen rein.']] : [['dario', 'Ich hab gewartet. Ich dachte, vielleicht kommst du.']]),
  n9_kuedesEnde: () => [
    ...(c.S.merke.geheimnisGetragen ? [['kaya', '(zu dir, leise) So was trägt man nicht allein. Du auch nicht.']] : []),
    ['erzaehler', 'Draußen setzt sich Dario auf die Treppe. Er zittert. Dann lacht er. Kurz.'],
    ['dario', 'Ich glaub, heute Nacht schlaf ich.'],
  ],
  n9_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 8 · Gesund und stark', titel: 'Akku geladen',
      gelernt: ['Ein Stress-Rucksack: tragen, warten, teilen, ablegen', 'Schlaf, Bewegung, Essen und Pausen laden den Akku', 'Macht ein Geheimnis Angst oder schadet es? Dann darfst du es sagen.', 'Kleine Schritte zählen – auch zehn Hampelmänner', 'Hilfe holen: Herr Kuedes, 116 111'],
      mission: 'Dein Gesund-Plan: ein Schritt. Eine Woche. Und einmal den Akku fragen, bevor er leer ist.' }, folgen: {} },
    ['erzaehler', 'Am nächsten Morgen gibt dir Herr Kuedes einen Zettel. Nur dir.'],
    ['kaya', '(Zettel) Freitag ist Sommerfest.'],
    ['kaya', 'Dario will sich entschuldigen. Noah und Mila sind einverstanden.'],
    ['kaya', 'Vor dem Fest, nur die Klasse. Wer nicht will, muss nicht.'],
    ['kaya', 'Und du? Sag mir in der Pause, wenn du nicht willst.'],
    { tu: 'kapitelEnde' },
  ],
});
