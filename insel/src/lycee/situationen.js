// Annexe Junglinster – Situationen in der offenen Welt: Dinge, die Jugendliche wirklich erleben (ab Kapitel 4, abschaltbar
// in den Einstellungen). Leitlinien: nichts wird schöngeredet oder belohnt, keine Anleitung, die Spielfigur konsumiert nie
// im Bild (Abblende, danach die Folgen), „Nein“ hat echte soziale Kosten und echten Lohn, Wiedergutmachung ist möglich,
// Erwachsene helfen ohne Verhör (Herr Kuedes, SePAS), echte Hilfe: 116 111 · 112. Keine Familie, keine Namen echter Menschen.
// Alle Figuren sind erfunden. Sprache: kurz, ehrlich, ohne Zeigefinger.
//
// Skript-API (spiel.js): a.sag(wer, text) · a.wahl([…]) → Index · a.blende(text) · a.merke(k, v) · a.m() → Merkzettel
// a.nachricht(von, text) (kommt beim nächsten Schritt aufs Handy) · a.teleport(ort) · a.ton(art)

export const SIT_LEUTE = {
  dex: { name: 'Dex (5ème)', farbe: '#e85d75', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#1b1410', oben: '#2b2b33', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.78, kopf: 'cap', kopfFarbe: '#e85d75' }, steht: [-60.8, -101.75, 0, 'sitzt'], ort: 'wald' },
  sina: { name: 'Sina (5ème)', farbe: '#9b7bc8', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#2b1d14', oben: '#9b7bc8', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.66 }, steht: [-57.25, -98.8, -Math.PI / 2, 'sitzt'], ort: 'wald' },
  mo: { name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [-58.2, -102.8, -0.7, 'handy'], ort: 'wald' },
  mika: { name: 'Mika (6ème)', farbe: '#e9b949', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#c9a15a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#4f88c8', hoehe: 1.58 }, steht: [-62.75, -99.6, Math.PI / 2, 'sitzt'], ort: 'wald' },
  moLaden: { name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [39.4, 90.4, 0.5, 'handy'], ort: 'laden' },
  lisette: { name: 'Tante Lisette · Épicerie', farbe: '#2f8a5a', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f0c9a8', haar: '#9a9a9a', oben: '#2f8a5a', unten: '#3a3f4b', schuhe: '#3a2a1c', hoehe: 1.62 }, steht: [36.9, 94.5, Math.PI / 2, 'redet'], ort: 'laden' },
};

// Wer ist wann da? (Kapitel, Schalter in den Einstellungen, was schon passiert ist)
export function sitSichtbar(id, kap, m, risiko, schritt) {
  if (id === 'lisette') return true;
  if (!risiko) return false;
  if (m.sitWaldSchritt === schritt && SIT_LEUTE[id].ort === 'wald') return false;   // gerade gegangen: heute niemand mehr da
  if (id === 'mika') return kap >= 4 && !m.sit_wald;
  if (id === 'moLaden') return kap >= 5 && !m.sit_laden;
  return kap >= 4;   // Dex, Sina, Mo hängen ab Kapitel 4 an der Lichtung ab
}

// Auslöser: kommt man in die Nähe, beginnt die Situation (einmal); weggehen geht immer
export const SIT_ZONEN = [
  { id: 'wald', x: -60, z: -99, r: 6.5, ab: 4, offen: (m) => !m.sit_wald },
  { id: 'laden', x: 41.6, z: 90.6, r: 2.6, ab: 5, offen: (m) => !m.sit_laden },
];

// ================= Die Lichtung (Kiffen) =================
export async function lichtung(a) {
  const m = a.m();
  await a.sag('e', 'Zwischen den Bäumen hängt Rauch. Es riecht süßlich.');
  await a.sag('dex', m.sit_laden ? 'Ah, du schon wieder. Komm, setz dich.' : 'Ey. Neu hier? Komm, setz dich. Wir beißen nicht.');
  await a.sag('sina', 'Meistens nicht.');
  await a.sag('mika', '(leise) Hi.');
  await a.sag('e', 'Dex hält dir einen Joint hin. Alle schauen dich an.');
  await a.sag('dex', 'Wir chillen nur. Willst du auch mal?');
  let w = await a.wahl(['„Nee, lass mal.“', '„Was ist das genau?“', '„Vielleicht später.“', '(Einfach umdrehen und gehen.)']);
  if (w === 3) {
    await a.sag('e', 'Du drehst dich um und gehst. Einfach so.');
    await a.sag('sina', '(ruft) Okay … Tschüss dann!');
    await a.sag('e', 'Hinter dir lacht jemand. Dein Gesicht wird warm.');
    await a.sag('e', 'Aber deine Füße sind schon auf dem Weg. Das zählt.');
    a.merke('sit_wald', 'gegangen');
    a.nachricht('Dex (Gruppe)', 'Wer rennt denn da weg 😂');
    a.nachricht('Mika', 'Hey. Du warst schlau. Ich war’s nicht.');
    return 'gegangen';
  }
  if (w === 1) {
    await a.sag('dex', 'Gras. Macht entspannt. Ist ja fast legal.');
    await a.sag('e', '(Fast legal? Für Erwachsene, zu Hause. Für dich: nein.)');
    await a.sag('e', '(Und dein Kopf wächst noch. Da wirkt es stärker.)');
  }
  if (w === 2) await a.sag('dex', 'Später gibt’s nicht. Jetzt oder nie.');
  if (w === 0) await a.sag('dex', 'Boah. Einmal. Merkt doch keiner.');
  await a.sag('mo', '(hebt das Handy) Ich film nicht. Versprochen.');
  await a.sag('e', 'Das rote Licht am Handy ist an.');
  await a.sag('sina', 'Dex, lass doch. Nicht jeder muss.');
  w = await a.wahl(['„Nein. Ich will das nicht.“', '„Ich hab gleich Training. Die testen da.“', '„Wer hat das Graffiti gemacht? Sieht krass aus.“', '(Ein Zug. Was soll schon passieren?)']);
  if (w === 3) {
    a.merke('sit_wald', 'mitgemacht');
    await a.blende('Ein paar Minuten später');
    await a.sag('e', 'Der Rauch kratzt im Hals. Du hustest. Alle lachen.');
    await a.sag('e', 'Dann wird dir schwindelig. Die Bäume drehen sich.');
    await a.sag('e', 'Dein Herz rast. Viel zu schnell.');
    await a.sag('du', '(Mir ist schlecht. Ich will hier weg.)');
    await a.sag('dex', 'Chill. Geht vorbei. Erstes Mal halt.');
    await a.sag('e', 'Mo zeigt aufs Handy. Er hat alles gefilmt.');
    await a.sag('e', 'Du setzt dich auf den Baumstamm. Atmest. Langsam wird es besser.');
    await a.sag('e', 'Es fühlt sich nicht an wie dazugehören. Eher wie verlieren.');
    a.nachricht('Gruppe', 'Mo hat ein Video geteilt: „Neu im Wald 😵“');
    a.nachricht('Sina', 'Sorry wegen Dex. Und wegen dem Video. Ehrlich.');
    await kuedes(a, 'mitgemacht');
    return 'mitgemacht';
  }
  a.merke('sit_wald', ['nein', 'ausrede', 'umgelenkt'][w]);
  if (w === 0) { await a.sag('dex', 'Boah. Baby.'); await a.sag('sina', 'Lass mal, Dex. Ist doch okay.'); await a.sag('e', 'Dein Herz klopft. Aber du hast es gesagt. Laut.'); }
  if (w === 1) { await a.sag('dex', 'Ach so. Na dann.'); await a.sag('e', 'Eine Ausrede. Hat funktioniert. Diesmal.'); await a.sag('e', 'Nächstes Mal geht vielleicht auch ein echtes Nein.'); }
  if (w === 2) {
    await a.sag('dex', '(grinst) Das war ich. D3X. Mit drei.'); await a.sag('dex', 'Krass, oder? Hat zwei Stunden gedauert.');
    await a.sag('e', 'Dex erzählt zehn Minuten von seinem Graffiti. Den Joint hat er vergessen.'); await a.sag('sina', '(zwinkert dir zu)');
  }
  // Mika will dazugehören – und dann geht es Mika schlecht
  await a.sag('e', 'Mika nimmt den Joint. Zieht. Hustet lange.');
  await a.sag('dex', 'Läuft. Wir sind weg. Ihr habt nix gesehen.');
  await a.sag('e', 'Dex, Mo und Sina gehen. Mika bleibt sitzen. Ganz blass.');
  await a.sag('mika', 'Mir ist komisch. Mein Herz … das rast voll.');
  const h = await a.wahl(['„Setz dich. Atme mit mir. Vier rein, vier raus.“', '„Warte hier. Ich hol Hilfe.“', '„Selbst schuld.“']);
  if (h === 0) {
    await a.sag('e', 'Ihr atmet zusammen. Vier rein. Vier raus. Immer wieder.');
    await a.sag('mika', 'Okay. Es wird … langsamer.');
    a.merke('mikaGeholfen');
  }
  if (h === 1) {
    await a.blende('Drei Minuten später');
    await a.sag('kaya', 'Gut, dass du mich geholt hast. Das war richtig.');
    await a.sag('kaya', 'Mika, schau mich an. Du bist sicher. Wir atmen.');
    await a.sag('kaya', 'Wenn jemand umkippt oder schlecht Luft kriegt: 112. Immer.');
    a.merke('mikaGeholfen'); a.merke('kuedesWald');
  }
  if (h === 2) {
    await a.sag('mika', '…');
    await a.sag('e', 'Du gehst. Mika sitzt allein. Etwas bleibt in deinem Bauch hängen.');
    a.merke('mikaAllein');
    a.nachricht('Mika', 'Bin okay. Glaub ich.');
    return a.m().sit_wald;
  }
  await a.sag('mika', 'Danke. Ich wollte nur dazugehören.');
  const d = await a.wahl(['„Du gehörst auch so dazu.“', '„Kenn ich. Das Gefühl.“', '(Nur nicken.)']);
  await a.sag('mika', ['(lächelt schief) Sagt sich so leicht. Aber danke.', 'Echt? Du auch?', '(nickt zurück)'][d]);
  if (a.m().sit_wald === 'nein') a.nachricht('Dex (Gruppe)', 'Baby 🍼');
  a.nachricht('Sina', 'Fand’s stark von dir. Sag ich Dex aber nicht.');
  a.nachricht('Mika', 'Danke für gestern. Echt.');
  if (a.m().kuedesWald) await kuedes(a, 'geholfen');
  return a.m().sit_wald;
}

// Herr Kuedes (SePAS) am nächsten Tag: kein Verhör, Fakten ohne Moral, Tür bleibt offen
async function kuedes(a, art) {
  await a.blende('Am nächsten Tag · SePAS');
  if (art === 'mitgemacht') {
    await a.sag('kaya', 'Ich hab von dem Video gehört. Kein Verhör.');
    await a.sag('kaya', 'Wie geht’s dir damit?');
    const w = await a.wahl(['„Weiß nicht.“', '„Mies.“', '„War doch nur einmal.“']);
    await a.sag('kaya', ['Weiß nicht ist eine ehrliche Antwort.', 'Mies ist okay. Das sagt, dass dir was wichtig ist.', 'Kann sein. Und trotzdem darfst du darüber reden.'][w]);
    await a.sag('kaya', 'Kiffen ist für Jugendliche verboten.'); await a.sag('kaya', 'Dein Gehirn wächst noch. Da wirkt es stärker.');
    await a.sag('kaya', 'Das ist kein Moralding. Das ist Biologie.');
    await a.sag('kaya', 'Das Video: Wir reden mit Mo. Löschen ist sein Job, nicht deiner.');
    await a.sag('kaya', 'Und du darfst dich umentscheiden. Jedes Mal.');
  } else {
    await a.sag('kaya', 'Du hast gestern geholfen. Das war nicht leicht.');
    await a.sag('kaya', 'Mika geht’s besser. Er wollte, dass ich dir das sage.');
    await a.sag('kaya', 'Und wenn dich das noch beschäftigt: Meine Tür ist offen.');
  }
  await a.sag('kaya', 'Oder 116 111. Anonym. Kostenlos. Rund um die Uhr.');
}

// ================= Die Épicerie (Klauen als Mutprobe) =================
export async function laden(a) {
  const m = a.m();
  await a.sag('e', 'Vor dem Laden steht Mo. Das Handy schon in der Hand.');
  await a.sag('mo', m.sit_wald ? 'Hey. Du warst doch im Wald. Dex hat eine Mutprobe.' : 'Hey. Du bist doch neu. Dex hat eine Mutprobe für Neue.');
  await a.sag('mo', 'Hol was aus dem Laden. Ohne Kasse. Ich film.');
  await a.sag('mo', 'Video oder es ist nicht passiert. Dann bist du drin.');
  let w = await a.wahl(['„Und wenn ich nicht will?“', '„Mach’s doch selber.“', '„Okay …“', '(Weitergehen.)']);
  if (w === 3) {
    await a.sag('mo', 'Ernsthaft? Feigling.');
    await a.sag('e', 'Du gehst weiter. Das Wort klebt kurz an dir.'); await a.sag('e', 'Dann fällt es ab.');
    a.merke('sit_laden', 'weiter');
    return 'weiter';
  }
  if (w === 0) { await a.sag('mo', '(zuckt mit den Schultern) Dann halt nicht. Dann bist du nicht drin.'); await a.sag('e', '(Drin. In was eigentlich? In einer Gruppe, die dich testet?)'); }
  if (w === 1) { await a.sag('mo', 'Hab ich schon. Letzte Woche. War easy.'); await a.sag('e', '(Stimmt das? Oder ist das nur ein Satz, der Druck macht?)'); }
  await a.sag('e', 'Du gehst rein. Über der Tür bimmelt eine Glocke.');
  a.teleport('epicerieInnen');
  await a.sag('lisette', 'Moien! Schulschluss? Die Gummibärchen sind heute im Angebot.');
  await a.sag('e', 'Vorn an der Theke liegt Süßes. Tante Lisette sortiert Zeitungen.');
  await a.sag('e', 'Oben in der Ecke blinkt etwas rot. Draußen hebt Mo das Handy.');
  w = await a.wahl(['„Eine Tüte Gummibärchen, bitte.“ (bezahlen)', '(Eine Tüte in die Jacke stecken.)', '„Draußen will einer, dass ich hier klaue.“', '(Nichts nehmen. Wieder rausgehen.)']);
  if (w === 0) {
    await a.sag('lisette', 'Fünfzig Cent. Merci, Schatz.');
    a.teleport('epicerie');
    await a.sag('e', 'Draußen.');
    await a.sag('mo', 'Du hast BEZAHLT? Lol.');
    const x = await a.wahl(['„Ja. Und?“', '„Klauen ist nicht mein Ding.“']);
    await a.sag('mo', x === 0 ? '…' : 'Hm.');
    await a.sag('mo', '(leiser) Ehrlich? Ich hab letzte Woche auch nicht geklaut. Nur so getan.');
    await a.sag('e', 'Der ganze Druck. Gebaut aus einem Satz, der nicht stimmte.');
    a.merke('sit_laden', 'bezahlt');
    return 'bezahlt';
  }
  if (w === 2) {
    await a.sag('lisette', '(schaut raus) Ah. Der mit dem Handy.');
    await a.sag('lisette', 'Weißt du was? Die Tüte ist geschenkt. Du warst schlauer als er.');
    await a.sag('e', 'Draußen ist Mo schon weg.');
    await a.sag('e', 'Hilfe holen ist kein Petzen. Petzen will schaden. Du wolltest raus.');
    a.merke('sit_laden', 'gesagt');
    return 'gesagt';
  }
  if (w === 3) {
    a.teleport('epicerie');
    await a.sag('e', 'Du gehst raus. Mit leeren Händen.');
    await a.sag('mo', 'Nichts? Feigling.');
    const x = await a.wahl(['„Kann sein.“', '„Ich entscheide selbst, was ich mache.“']);
    await a.sag('mo', x === 0 ? '(lacht unsicher)' : '… Okay. Respekt, irgendwie.');
    a.merke('sit_laden', 'leer');
    return 'leer';
  }
  // geklaut
  await a.sag('e', 'Deine Hand ist schneller als dein Kopf.'); await a.sag('e', 'Die Tüte knistert in der Jacke.');
  if (Math.random() < 0.6) {
    await a.sag('lisette', 'Moment. Die Jacke. Bitte.');
    await a.sag('e', 'Alles wird heiß. Gesicht, Ohren, Hände.');
    await a.sag('lisette', 'Ich hab’s gesehen. Die Kamera auch.');
    await a.sag('lisette', 'Warum?');
    const x = await a.wahl(['„Mutprobe …“', '„Weiß nicht.“', '„Tut mir leid.“']);
    await a.sag('lisette', ['Mutprobe. Für wen? Für den mit dem Handy?', '„Weiß nicht“ ist ehrlich. Immerhin.', 'Das glaub ich dir. Man sieht’s.'][x]);
    await a.sag('e', 'Draußen ist Mo weg. Natürlich.');
    await a.sag('lisette', 'Ich ruf nicht die Polizei. Diesmal nicht.');
    await a.sag('lisette', 'Aber du hilfst mir Samstag eine Stunde. Regale einräumen.');
    const y = await a.wahl(['„Abgemacht.“', '„Muss ich?“']);
    if (y === 1) await a.sag('lisette', 'Musst du nicht. Dann ruf ich die Schule an. Deine Wahl.');
    await a.blende('Samstag');
    await a.sag('lisette', 'Du sortierst gut. Ordentlicher als mein Neffe.');
    await a.sag('lisette', 'Komm wieder. Zum Kaufen.');
    await a.sag('e', 'Es fühlt sich komisch an. Aber leichter als vorher.');
    a.merke('sit_laden', 'erwischt');
    return 'erwischt';
  }
  a.teleport('epicerie');
  await a.sag('e', 'Niemand sagt was. Die Glocke bimmelt. Du bist draußen.');
  await a.sag('mo', 'Krass! Hast du’s? Das Video geht in die Gruppe.');
  await a.sag('e', 'Die Gummibärchen wiegen fast nichts. Und trotzdem ziemlich viel.');
  a.merke('sit_laden', 'geklaut');
  a.nachricht('Gruppe', '23 Leute haben dein Video gesehen 🔥');
  a.nachricht('Sina', 'Hab das Video gesehen. Alles okay bei dir?');
  return 'geklaut';
}

// Zurückbringen: braucht mehr Mut als Klauen
export async function zurueckbringen(a) {
  await a.sag('du', '(leise) Ich hab letztes Mal was nicht bezahlt.');
  await a.sag('e', 'Du legst die Tüte und fünfzig Cent auf die Theke.');
  await a.sag('lisette', '(lange Pause)');
  await a.sag('lisette', 'Weißt du, wie selten das ist? Dass jemand zurückkommt?');
  await a.sag('lisette', 'Danke. Das braucht mehr Mut als Klauen.');
  a.merke('zurueckgebracht');
}

// Kurze Sätze bei weiteren Besuchen (je nach dem, was passiert ist)
export function sitSaetze(id, m) {
  if (id === 'lisette') {
    if (m.zurueckgebracht) return ['Da ist ja meine ehrlichste Kundschaft.', 'Moien! Heute was Süßes? Bezahlt schmeckt’s besser.'];
    if (m.sit_laden === 'erwischt') return ['Na, Regal-Profi? Schön, dich zu sehen.', 'Samstag hast du das Mehl gerade gestellt. Das hält immer noch.'];
    if (m.sit_laden === 'geklaut') return ['Moien. Alles gut bei dir? Du schaust so auf die Theke.', 'Brauchst du was? Frag ruhig.'];
    if (m.sit_laden === 'bezahlt' || m.sit_laden === 'gesagt') return ['Gummibärchen wieder? Ich leg dir eins dazu.', 'Du bist hier immer willkommen, Schatz.'];
    return ['Moien! Was darf’s sein?', 'Die Kirsch-Teilchen sind von Rosa. Konkurrenz und Freundin.', 'Kauf nur, was du brauchst. Sagt die Verkäuferin. Ja, wirklich.'];
  }
  if (id === 'dex') return m.sit_wald === 'mitgemacht' ? ['Na? Wieder da? Heute nur chillen.', 'Das Video? Kam von Mo, nicht von mir.'] : m.sit_wald === 'nein' ? ['Na, Baby? … Kleiner Scherz.', 'Du bist echt so. Okay.'] : ['Wieder da? Setz dich.', 'Hier hört uns keiner. Fast keiner.'];
  if (id === 'sina') return ['Hey. Alles gut bei dir?', 'Dex ist nicht so hart, wie er tut.', 'Ich komm nur her wegen der Ruhe. Ehrlich.'];
  if (id === 'mo' || id === 'moLaden') return m.sit_laden === 'bezahlt' ? ['Du hast echt bezahlt. Hab’s keinem erzählt.', '(steckt das Handy weg) Heute nicht.'] : ['(filmt die Bäume) Content.', 'Willst du ins Video? Nein? Okay.'];
  if (id === 'mika') return ['Hi. Ich weiß nicht, ob ich hier sein will.', 'Dex sagt, ich bin cool. Bin ich?'];
  return ['…'];
}
