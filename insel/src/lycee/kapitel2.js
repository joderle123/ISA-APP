// Lycée-Simulator – Kapitel 2 „Die erste Woche“ (Dienstag bis Freitag).
// Situationen: Turnschuhe vergessen (ehrlich sein) · Teams wählen, jemand bleibt übrig (einbeziehen, widersprechen) ·
// Kritik nach dem Spiel aushalten · Mathe nicht verstanden (um Hilfe bitten statt abschreiben) · eine AG wählen ·
// gemeines Foto im Klassenchat (widersprechen, nicht mitlachen) · für jemanden da sein und Hilfe holen (SePAS) ·
// Aufregung vor dem Test (Atmen) · Klassenrat mit Ich-Botschaft · Wochenende planen (ja oder nein sagen).
// Gleicher Aufbau wie Kapitel 1 (geschichte.js). Kurze Sätze, keine Moral-Stimme, erfundene Namen.

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE_SITZT = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 0, 1) };

export const STAERKEN2 = {
  ehrlich: { name: 'Ehrlich sein', text: 'Du hast gesagt, wie es wirklich ist.' },
  mut: { name: 'Für andere einstehen', text: 'Du hast gesagt: Das ist nicht okay.' },
  entscheiden: { name: 'Selbst entscheiden', text: 'Du hast dir etwas ausgesucht.' },
  ichbotschaft: { name: 'Klartext', text: 'Klar gesagt, was nervt. Ohne rumzubrüllen.' },
  atmen: { name: 'Sich beruhigen', text: 'Du hast geatmet, bis es ruhiger wurde.' },
};

export const LEUTE2 = {
  sommer: { name: 'Frau Sommer', modell: 'frauen', stil: 'Adventurer', haut: '#e8bf9a', haar: '#2b1d14', oben: '#d9523c', unten: '#2d3748', schuhe: '#ffffff', farbe: '#d9523c', erwachsen: true },
  kaya: { name: 'Herr Kaya', modell: 'menschen', stil: 'Casual2', haut: '#b07a55', haar: '#1b1410', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#6b4e3a', farbe: '#3fa66b', erwachsen: true },
};

export const ORTE2 = {
  turnhalleTuer: { x: 46, z: -0.5, yaw: Math.PI },
  meinPlatz: { x: -22.1, z: -24.4 },
};

const IN_DER_HALLE = { ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0] };
const HOF_DONNERSTAG = { noah: [16.6, 2.6, 0.8, 'redet'], ayla: [17.9, 3.8, -2.2, 'redet'], jo: [24.6, 6.4, -1.2, 'redet'], ben: [23.4, 7.4, 2.4, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'], kenan: [-34, 9, 1], dario: [-32.6, 10.2, -2] };

export const SCHRITTE2 = [
  { id: 'di_sport', kap: 2, tag: 'Dienstag', uhr: 8.05, titel: 'Sport', ziel: 'Geh in die Turnhalle zu Frau Sommer.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer', gespraech: 'di_intro' },
    leute: { sommer: [46, -13.5, 0], ...IN_DER_HALLE },
    fertig: { reden: 'sommer', gespraech: 'sommer1' } },
  { id: 'di_teams', kap: 2, tag: 'Dienstag', uhr: 8.2, titel: 'Teams wählen', ziel: 'Jo und Ben wählen Teams. Geh zu Jo.', marker: 'jo',
    leute: { sommer: [46, -11, 0], jo: [43.6, -20.5, 0], ben: [48.4, -20.5, 0], noah: [41.2, -14.5, Math.PI], lina: [42.6, -14.6, Math.PI], ayla: [44.2, -14.7, Math.PI], chiara: [49.4, -14.6, Math.PI], yusuf: [50.8, -14.5, Math.PI] },
    fertig: { reden: 'jo', gespraech: 'teams' } },
  { id: 'mi_cdi', kap: 2, tag: 'Mittwoch', uhr: 10.3, titel: 'Die Mathe-Hausaufgabe', ziel: 'Geh ins CDI. Chiara lernt dort.', marker: 'chiara',
    start: { teleport: 'halle', gespraech: 'mi_intro' },
    leute: { chiara: [-11.0, -22.9, Math.PI / 2, 'sitzt'], mila: [-6.2, -20.5, Math.PI, 'sitzt'], noah: [-2, -16, -1.6] },
    fertig: { reden: 'chiara', gespraech: 'mathe' } },
  { id: 'mi_ag', kap: 2, tag: 'Mittwoch', uhr: 13.7, titel: 'Eine AG wählen', ziel: 'An der Pinnwand in der Halle hängen die AGs. Schau sie dir an.', marker: 'pinnwand',
    leute: { ayla: [-3.6, -8.6, -1.6, 'redet'], yusuf: [-2.4, -9.8, 2.6, 'redet'], noah: [3, -5, 3] },
    fertig: { ort: 'pinnwand', r: 1.8, gespraech: 'ag' } },
  { id: 'do_chat', kap: 2, tag: 'Donnerstag', uhr: 12.45, titel: 'Der Klassenchat', ziel: 'Mittagspause. Geh unter das Vordach.', marker: 'preau',
    start: { teleport: 'eingangHof' },
    leute: HOF_DONNERSTAG,
    fertig: { ort: 'preau', r: 3.2, gespraech: 'chat' } },
  { id: 'do_mila', kap: 2, tag: 'Donnerstag', uhr: 12.6, titel: 'Mila', ziel: 'Mila sitzt allein auf der Bank.', marker: 'mila',
    leute: HOF_DONNERSTAG,
    fertig: { reden: 'mila', gespraech: 'milaChat' } },
  { id: 'do_sepas', kap: 2, wenn: (m) => m.zuKaya && !m.keinKaya, tag: 'Donnerstag', uhr: 12.8, titel: 'Beim SePAS', ziel: 'Geh mit Mila zum SePAS. Herr Kaya ist da.', marker: 'kaya',
    leute: { kaya: [-12, -6.6, Math.PI], mila: [-13.4, -12.4, 0.3], noah: [10, -16, 1.5] },
    fertig: { reden: 'kaya', gespraech: 'kaya' } },
  { id: 'fr_test', kap: 2, tag: 'Freitag', uhr: 8.0, titel: 'Der Mathe-Test', ziel: 'Setz dich auf deinen Platz in Saal 1.04.', marker: 'meinPlatz',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { ort: 'meinPlatz', r: 1.1, gespraech: 'test' } },
  { id: 'fr_rat', kap: 2, tag: 'Freitag', uhr: 13.5, titel: 'Klassenrat', ziel: 'Klassenrat! Sprich mit Mme Tidderich.', marker: 'hoffmann',
    leute: { hoffmann: [-26.4, -22.6, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { reden: 'hoffmann', gespraech: 'klassenrat' } },
  { id: 'fr_heim', kap: 2, tag: 'Freitag', uhr: 15.5, titel: 'Wochenende!', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ayla: [-25, 41.8, 0.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'woche' } },
];

export const GESPRAECHE2 = {
  di_intro: [
    ['erzaehler', 'Dienstag, 7:58. Erste Stunde: Sport.'],
    ['erzaehler', 'Tasche auf. Die Turnschuhe stehen zu Hause. Schön ordentlich.'],
  ],
  sommer1: [
    ['sommer', '(pfeift) Allez! Umziehen war vor zwei Minuten. {name}? Schuhe?'],
    { wahl: [
      { t: '„Vergessen. Sorry.“', staerke: 'ehrlich', herz: { sommer: 1 }, merke: 'fundkiste', dann: [
        ['sommer', 'Fundkiste. Neben der Tür.'],
        ['erzaehler', 'Ein Paar passt halb. Pink. Riecht nach Keller.'],
        ['jo', 'Pink. Wie ein Tuning-Unfall. Steht dir, {name}.'],
        ['erzaehler', 'Ben lacht. Yusuf nicht.'] ] },
      { t: '„Mir ist schlecht.“', merke: 'bank', dann: [
        ['sommer', '(schaut dich lange an) … Bank.'],
        ['sommer', 'Ich trag’s ein. Wie bei allen.'],
        ['erzaehler', '50 Minuten Bank. Keiner lacht. Keiner redet mit dir.'] ] },
      { t: '„Yusuf, hast du noch Schuhe?“', staerke: 'hilfe', herz: { yusuf: 1 }, merke: 'yusufSchuhe', dann: [
        ['yusuf', 'Meine alten. Im Spind. Zwei Nummern zu groß.'],
        ['yusuf', 'Wenn die wegkommen, bist du dran.'],
        ['erzaehler', 'Du schlurfst. Aber du spielst mit.'] ] },
      { t: '(In Socken loslaufen. Mal sehen.)', dann: [
        ['sommer', 'Stopp! Socken geht nicht. Versicherung.'],
        ['sommer', 'Fundkiste oder Bank. Such’s dir aus.'],
        { wahl: [
          { t: 'Fundkiste.', merke: 'fundkiste', dann: [['erzaehler', 'Pink. Riecht nach Keller. Jo grinst schon.']] },
          { t: 'Bank.', merke: 'bank', dann: [['sommer', 'Eingetragen.']] },
        ] } ] },
    ] },
  ],
  teams: [
    ['sommer', 'Korbwurf, zwei Teams. Jo und Ben wählen. Schnell.'],
    ['jo', 'Yusuf. … Ayla.'],
    ['ben', 'Chiara. Noah.'],
    ['erzaehler', 'Nur noch du und Lina.'],
    ['jo', '(zu Ben) Nimm du die Klavierspielerin. Ich bin großzügig.'],
    ['erzaehler', 'Ein paar lachen. Lina schaut auf ihre Schuhe.'],
    ['jo', '… {name}, komm.'],
    { wahl: [
      { t: 'Mitgrinsen. Zu Jo gehen.', herz: { jo: 1, lina: -1 }, merke: 'linaGelacht', dann: [
        ['jo', 'Siehste. {name} versteht Spaß.'],
        ['erzaehler', 'Lina zieht die Ärmel über die Hände.'] ] },
      { t: '„Großzügig. Wie bei deinen Freiwürfen.“', staerke: 'mut', herz: { jo: -1, ben: 1, lina: 1 }, merke: 'joGekontert', dann: [
        ['ben', 'Hahaha!'],
        ['jo', 'Pass auf, was du sagst.'],
        ['erzaehler', 'Er lacht dabei. Die Augen nicht.'] ] },
      { t: '„Ben, mit Lina gewinnst du eh.“', staerke: 'einbeziehen', herz: { lina: 1 }, merke: 'linaTeam', dann: [
        ['ben', 'Na hoffentlich.'],
        ['lina', '(schaut kurz hoch)'],
        ['jo', 'Seit wann bist du ihr Fanclub?'] ] },
      { t: '„Können wir nicht einfach abzählen?“', staerke: 'klar', herz: { sommer: 1, jo: -1 }, dann: [
        ['sommer', 'Nächstes Mal. Heute keine Zeit.'],
        ['jo', '(leise) Streberalarm.'] ] },
      { t: '(Nichts sagen. Zu Jo gehen.)', dann: [['erzaehler', 'Lina geht zu Ben. Langsam.']] },
    ] },
    { tu: 'korbRunde' },
  ],
  mi_intro: [
    ['erzaehler', 'Mittwoch. Mathe-Hausaufgabe. Fällig in 20 Minuten.'],
    ['erzaehler', 'Brüche. Du liest Aufgabe 2 dreimal. Sie wird nicht besser.'],
  ],
  mathe: [
    ['erzaehler', 'CDI. Chiara sitzt da. Ihr Heft ist voll.'],
    ['chiara', 'Was ist? Ich muss noch Französisch.'],
    { wahl: [
      { t: '„Ich check Aufgabe 2 nicht. Gar nicht.“', staerke: 'hilfe', herz: { chiara: 1 }, merke: 'matheGefragt', dann: [
        ['chiara', '(seufzt) Fünf Minuten. Dann muss ich echt.'] ] },
      { t: '„Darf ich ein Foto von deinem Heft?“', dann: [
        ['chiara', 'Kostet. Dein Dessert morgen.'],
        { wahl: [
          { t: '„Deal.“', herz: { chiara: 1 }, merke: 'matheFoto', dann: [
            ['erzaehler', 'Klick. In zehn Sekunden fertig.'],
            ['erzaehler', 'Verstanden hast du nichts. Aber es steht da.'] ] },
          { t: '„Dann erklär lieber. Ist billiger.“', staerke: 'hilfe', merke: 'matheGefragt', dann: [
            ['chiara', '(lacht kurz) Okay. Fünf Minuten.'] ] },
        ] } ] },
      { t: '„Mathe ist eh für nix gut.“ (Heft zu)', merke: 'matheZu', dann: [
        ['chiara', 'Sag das Mme Tidderich am Freitag.'],
        ['erzaehler', 'Du spielst auf dem Handy. Die Pause ist schnell weg.'] ] },
    ] },
    { tu: 'matheErklaeren' },
  ],
  ag: [
    ['erzaehler', 'An der Pinnwand hängen Zettel für die AGs. Mittwochs ab 14 Uhr.'],
    { wahl: [
      { t: 'Theater-AG', staerke: 'entscheiden', merke: 'agTheater', herz: { ayla: 1 }, dann: [
        ['ayla', 'Theater? Da bin ich auch!'], ['du', 'Ich spiel aber keinen Baum.'], ['ayla', 'Musst du nicht. Du kannst Licht machen. Und Nebel!'] ] },
      { t: 'Robotik-AG', staerke: 'entscheiden', merke: 'agRobotik', herz: { yusuf: 1 }, dann: [
        ['yusuf', 'Roboter-Arm. Kann schon winken.'], ['yusuf', 'Sonst nix. Noch. Komm mit.'] ] },
      { t: 'Schulgarten-AG', staerke: 'entscheiden', merke: 'agGarten', herz: { mila: 1 }, dann: [
        ['erzaehler', 'Auf der Liste steht schon ein Name: Mila.'], ['erzaehler', 'Du schreibst deinen Namen darunter.'] ] },
      { t: 'Erst mal keine.', dann: [['erzaehler', 'Die Zettel hängen bis Oktober. Einer hängt seit 2019.']] },
    ] },
  ],
  chat: [
    ['erzaehler', 'Mittagspause. Dein Handy vibriert. Nochmal. Und nochmal.'],
    { tu: 'chat' },
    ['erzaehler', 'Ein Foto von Mila. Mund voll, Augen halb zu.'],
    ['erzaehler', 'Gesehen von 14. Mila ist auch dabei.'],
    { wahl: [
      { t: 'Ein 😂 schicken. Wie alle.', herz: { jo: 1, ben: 1, mila: -2 }, merke: 'chatGelacht', dann: [
        ['erzaehler', 'Jo: „endlich jemand mit humor 😂“'],
        ['erzaehler', 'Ben schickt dir privat ein Meme. Zum ersten Mal.'] ] },
      { t: 'In die Gruppe: „Jo, echt jetzt?“', staerke: 'mut', herz: { jo: -2, mila: 1 }, merke: 'chatMut', dann: [
        ['erzaehler', 'Jo: „wer hat dich gefragt 😂“'],
        ['erzaehler', 'Ben: „😂😂“. Luca: „oha“.'],
        ['erzaehler', 'Ayla ist online. Sie schreibt nichts.'],
        ['erzaehler', 'Das Foto bleibt drin.'] ] },
      { t: 'Mila privat: „alles ok?“', staerke: 'zuhoeren', herz: { mila: 1 }, merke: 'chatPrivat', dann: [
        ['erzaehler', 'Zwei blaue Haken. Keine Antwort.'],
        ['erzaehler', 'In der Gruppe kommen noch drei Smileys.'] ] },
      { t: 'Screenshot machen. Nichts schreiben.', staerke: 'lesen', merke: 'chatBeweis', dann: [
        ['erzaehler', 'Jetzt hast du ein Bild von dem Bild.'],
        ['erzaehler', 'Was du damit machst, weißt du noch nicht.'] ] },
      { t: 'Gruppe stummschalten. Weiteressen.', merke: 'chatStumm', dann: [
        ['erzaehler', 'Ruhe. Das Essen ist kalt. Du isst trotzdem.'] ] },
    ] },
  ],
  milaChat: [
    ['erzaehler', 'Mila auf der Bank. Kapuze auf. Handy in der Hand.'],
    { tu: 'milaGelacht' },
    { tu: 'milaRest' },
  ],
  milaChatRest: [
    ['mila', 'Was willst du?'],
    { wahl: [
      { t: '(Hinsetzen. Nichts sagen.)', staerke: 'warten', herz: { mila: 1 }, dann: [
        ['erzaehler', 'Eine Minute. Zwei.'],
        ['mila', 'Er macht einen Sticker draus. Hat er geschrieben.'] ] },
      { t: '„Jo ist wie der Automat. Laut und kaputt.“', herz: { mila: 1 }, dann: [
        ['mila', 'Toll. Und? Alle haben’s trotzdem.'] ] },
      { t: '„Ehrlich, man sieht fast nix.“', dann: [
        ['mila', 'Lüg nicht. Ich hab’s gesehen.'] ] },
      { t: '„Soll ich gehen?“', dann: [
        ['mila', '… Nein. Bleib halt.'] ] },
    ] },
    ['mila', 'Wenn das ein Sticker wird, komm ich nicht mehr.'],
    { wahl: [
      { t: '„Komm, wir gehen zu Kaya.“', staerke: 'hilfe', merke: 'zuKaya', dann: [
        ['mila', 'Spinnst du? Dann bin ich die Petze.'],
        ['mila', 'Und Jo weiß sofort, wer’s war.'],
        { wahl: [
          { t: '„Dann sag ich, ich hab’s gemeldet.“', staerke: 'mut', herz: { mila: 2 }, merke: 'ichMelde', dann: [
            ['mila', 'Das würdest du machen?'],
            ['mila', '… Okay. Aber du redest.'] ] },
          { t: '„Dann nicht. Deine Sache.“', merke: 'keinKaya', dann: [
            ['mila', 'Ja. Meine Sache.'],
            ['erzaehler', 'Es klingelt. Sie geht ohne dich rein.'] ] },
        ] } ] },
      { t: '„Ich schreib Jo. Privat.“', staerke: 'klar', merke: 'joPrivat', dann: [
        ['erzaehler', 'Du schreibst: „lösch das. ist nicht lustig.“'],
        ['erzaehler', 'Jo: „chill 😂“. Zehn Minuten später ist es weg.'],
        ['erzaehler', 'Der Sticker ist schon bei Luca.'] ] },
      { t: '„Mach ein Foto von ihm. Beim Nasebohren.“', staerke: 'humor', herz: { mila: 1 }, merke: 'racheIdee', dann: [
        ['mila', '(kurzes Lachen)'],
        ['mila', 'Dann geht’s erst richtig los. Nee.'] ] },
      { t: '„Morgen redet keiner mehr drüber.“', merke: 'abgewiegelt', dann: [
        ['mila', 'Du kennst die Leute hier nicht.'] ] },
    ] },
  ],
  kaya: [
    ['erzaehler', 'Die Tür vom SePAS ist offen. Herr Kaya isst ein Brötchen.'],
    ['kaya', 'Moment. (kaut) So. Was gibt’s?'],
    ['erzaehler', 'Mila schaut auf den Boden.'],
    { wahl: [
      { t: '„Ein Foto von Mila. Im Klassenchat.“', staerke: 'klar', herz: { kaya: 1, mila: 1 }, dann: [] },
      { t: '„Mila, sag du.“', wenn: (m) => !m.ichMelde, herz: { mila: -1 }, dann: [['mila', '(leise) Ein Foto. Im Chat. Von mir.']] },
    ] },
    { tu: 'kayaBeweis' },
    ['kaya', 'Okay. Ich sag euch gleich, wie das läuft.'],
    ['kaya', 'Das muss ich Mme Tidderich sagen. Nicht nur hier drin.'],
    ['mila', 'Dann weiß Jo, dass wir’s waren.'],
    ['kaya', 'Kann sein. Das kann ich nicht verhindern.'],
    ['kaya', 'Wer hat es geschickt?'],
    { wahl: [
      { t: '„Jo.“', staerke: 'mut', herz: { mila: 1, jo: -2 }, merke: 'joGenannt', dann: [
        ['kaya', 'Okay.'],
        ['erzaehler', 'Er schreibt einen Namen auf einen Zettel.'] ] },
      { t: '„Weiß nicht. Irgendwer.“', merke: 'keinName', dann: [
        ['kaya', 'Ohne Namen kann ich wenig machen.'],
        ['erzaehler', 'Mila schaut dich an. Lange.'] ] },
      { t: '„Das soll Mila sagen.“', staerke: 'einbeziehen', herz: { mila: 2 }, merke: 'milaEntscheidet', dann: [
        ['mila', '… Jo. Es war Jo.'] ] },
    ] },
    ['kaya', 'Ich red morgen mit ihm. Heute bin ich allein hier.'],
    ['kaya', 'Mila, bleibst du noch? {name}, du kannst gehen.'],
    ['erzaehler', 'Am Abend ist das Foto immer noch im Chat.'],
  ],
  test: [
    { tu: 'setzen' },
    ['hoffmann', 'Neue Methode: ein Test. Kennt ihr schon. Handys weg.'],
    ['erzaehler', 'Deine Hände sind kalt. Aufgabe 3: Brüche.'],
    ['erzaehler', 'Chiaras Blatt liegt offen. Sie ist schon bei Aufgabe 4.'],
    { wahl: [
      { t: '(Stift hinlegen. Decke anstarren.)', dann: [{ tu: 'atem' }, ['erzaehler', 'An der Decke klebt ein Kaugummi. Seit Jahren, schätzt du.']] },
      { t: '(Zu Chiara rüberschauen.)', merke: 'testGeguckt', dann: [
        ['erzaehler', 'Drei Viertel. Du schreibst es hin.'],
        ['hoffmann', '{name}. Augen auf dein Blatt.'],
        ['erzaehler', 'Ab jetzt steht er hinter dir. Bis zum Schluss.'] ] },
      { t: '(Noah zuflüstern: „Aufgabe 3?“)', herz: { noah: 1, hoffmann: -1 }, dann: [
        ['noah', '(flüstert) Keine Ahnung. Echt.'],
        ['hoffmann', 'Ihr zwei. Noch ein Wort, dann null Punkte.'] ] },
      { t: '(Mit der leichten anfangen.)', staerke: 'ruhig', dann: [['erzaehler', 'Aufgabe 1 kennst du. Dann 2.']] },
    ] },
    { tu: 'testPizza' },
    ['hoffmann', 'Zeit. Ihr bekommt ihn Montag zurück.'],
  ],
  klassenrat: [
    { tu: 'milaFehlt' },
    ['hoffmann', 'Klassenrat. Erster Punkt: der Klassenchat.'],
    ['erzaehler', 'Alle schauen zu Mila. Dann zu Jo.'],
    ['hoffmann', 'Mila. Willst du was sagen? Musst du nicht.'],
    ['erzaehler', 'Mila wird rot. Sie sagt nichts.'],
    { wahl: [
      { t: '„Muss sie das jetzt vor allen sagen?“', staerke: 'mut', herz: { mila: 2, hoffmann: -1 }, merke: 'hoffmannGestoppt', dann: [
        ['hoffmann', '(Pause) … Nein. Muss sie nicht.'],
        ['hoffmann', 'Dann anders: Was soll im Chat gelten?'] ] },
      { t: '(Auf den Tisch schauen. Abwarten.)', dann: [
        ['erzaehler', 'Zehn lange Sekunden.'],
        ['mila', '(leise) War halt nicht so schön.'],
        ['hoffmann', 'Danke. Was soll im Chat gelten?'] ] },
      { t: '„Nächster Punkt: die Kantinen-Nudeln.“', staerke: 'humor', herz: { mila: 1, hoffmann: -1 }, merke: 'witzRat', dann: [
        ['erzaehler', 'Die halbe Klasse lacht. Mila atmet aus.'],
        ['hoffmann', '{name}. Bitte.'],
        ['hoffmann', '… Gut. Was soll im Chat gelten?'] ] },
    ] },
    ['jo', 'Ist doch nur ein Chat. Da schickt jeder Zeug.'],
    { wahl: [
      { t: '„Dann schick ich mal eins von dir.“', herz: { jo: -1, ben: 1 }, dann: [
        ['ben', 'Uuuh.'], ['jo', 'Mach doch.'], ['hoffmann', 'Stopp. Beide.'] ] },
      { t: '„Neue Regel: Jo darf nur Fotos von Jo schicken.“', staerke: 'klar', herz: { hoffmann: 1 }, merke: 'regelVorschlag', dann: [
        ['jo', 'Oh Mann. Streberalarm.'], ['ayla', 'Nee. Ich bin dafür.'] ] },
      { t: '(Nichts sagen. Soll Mme Tidderich machen.)', dann: [
        ['hoffmann', 'Dann schlag ich was vor: Fotos nur mit Ja.'], ['jo', '(verdreht die Augen)'] ] },
    ] },
    ['hoffmann', 'Abstimmung. Hände hoch.'],
    ['erzaehler', 'Fast alle Hände. Jo hebt seine als Letzter. Halb.'],
  ],
  woche: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Die erste Woche ist geschafft.'],
    ['noah', 'Kurze Frage. Samstag, zwei Uhr, Bolzplatz. Fußball. Du?'],
    ['ayla', 'Samstag um zwei: Bandprobe. Du darfst zuhören. Und Kabel tragen.'],
    { wahl: [
      { t: '„Noah. Fußball.“', herz: { noah: 2, ayla: -1 }, merke: 'samstagNoah', dann: [['ayla', 'Ah. Okay. Nächstes Mal.']] },
      { t: '„Ayla. Band.“', herz: { ayla: 2, noah: -1 }, merke: 'samstagAyla', dann: [['noah', 'Klar. Band ist cooler. Schon gut.']] },
      { t: '„Ich kann Samstag nicht.“', staerke: 'klar', dann: [['noah', 'Okay.'], ['ayla', 'Schade.'], ['erzaehler', 'Keiner fragt, warum.']] },
      { t: '„Ich versuch, beides zu schaffen.“', herz: { noah: 1, ayla: 1 }, merke: 'doppeltZugesagt', dann: [['noah', 'Cool!'], ['ayla', 'Cool! Ich sag’s den anderen.']] },
    ] },
    { tu: 'milaWoche' },
    ['fahrer', 'Wochenende. Wer im Bus isst, putzt den Bus.'],
    { tu: 'kapitelEnde' },
  ],
};

// Klassenchat (Handy-Bild): Absender, Text
export const CHAT = [
  { wer: 'Chiara', text: 'hat jemand die mathe seite 34?' },
  { wer: 'Jo', text: 'mila beim essen 💀', bild: true, reakt: '😂 6' },
  { wer: 'Ben', text: '😂😂' },
  { wer: 'Luca', text: 'nein bitte 😭' },
  { wer: 'Jo', text: 'sticker kommt gleich' },
  { wer: 'Ayla', text: 'hä' },
  { wer: 'Chiara', text: 'also hat jemand seite 34 oder nicht' },
];
// Kapitel 5: Die Gruppe ohne Lehrer – und dann bist du raus
export const CHAT5 = [
  { wer: 'Ben', text: 'wer hat bio hausi' },
  { wer: 'Jo', text: 'ich mach mal platz hier' },
  { system: true, text: '{wer} hat dich entfernt.' },
];

// Ich-Botschaft im Klassenrat: drei Teile; was ein Vorwurf ist, wird freundlich zurückgegeben
export function ichBotschaftThema() {
  return {
    thema: 'Das Foto im Klassenchat',
    teile: [
      { start: 'Ich fühle mich …', optionen: [{ t: 'unwohl', gut: true }, { t: 'traurig', gut: true }, { t: 'wütend', gut: true }, { t: 'Du bist gemein, Jo.', gut: false, tipp: 'So gesagt, gibt’s Krieg. Wie geht’s DIR damit?' }] },
      { start: '… wenn …', optionen: [{ t: 'Fotos ohne Fragen geteilt werden.', gut: true }, { t: 'Jo immer alles kaputt macht.', gut: false, tipp: 'Das klingt nach Vorwurf. Was genau ist passiert?' }, { t: 'alle darüber lachen.', gut: true }] },
      { start: 'Ich wünsche mir, …', optionen: [{ t: 'dass wir vorher fragen.', gut: true }, { t: 'dass Jo Ärger bekommt.', gut: false, tipp: 'Was soll in Zukunft anders sein?' }, { t: 'dass wir so etwas löschen.', gut: true }] },
    ],
  };
}
