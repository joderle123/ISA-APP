// Annexe Junglinster – Situationen in der offenen Welt: Dinge, die Jugendliche wirklich erleben (ab Kapitel 4, abschaltbar
// in den Einstellungen). Leitlinien: nichts wird schöngeredet oder belohnt, keine Anleitung, die Spielfigur konsumiert nie
// im Bild (Abblende, danach die Folgen), „Nein“ hat echte soziale Kosten und echten Lohn, Wiedergutmachung ist möglich,
// Erwachsene helfen ohne Verhör (Herr Kuedes, SePAS), echte Hilfe: 116 111 · 112. Keine Familie, keine Namen echter Menschen.
// Alle Figuren sind erfunden. Sprache: kurz, ehrlich, ohne Zeigefinger.
//
// Skript-API (spiel.js): a.sag(wer, text) · a.wahl([…]) → Index · a.blende(text) · a.merke(k, v) · a.m() → Merkzettel
// a.nachricht(von, text) (kommt beim nächsten Schritt aufs Handy) · a.teleport(ort) · a.ton(art)

export const SIT_LEUTE = {
  dex: { szene: 'wald', wer: 'dex', bleibt: true, dauer: true, name: 'Dex (5ème)', farbe: '#e85d75', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#1b1410', oben: '#2b2b33', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.78, kopf: 'cap', kopfFarbe: '#e85d75' }, steht: [-60.8, -101.75, 0, 'sitzt'], ort: 'wald' },
  sina: { szene: 'wald', wer: 'sina', bleibt: true, dauer: true, name: 'Sina (5ème)', farbe: '#9b7bc8', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#2b1d14', oben: '#9b7bc8', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.66 }, steht: [-57.25, -98.8, -Math.PI / 2, 'sitzt'], ort: 'wald' },
  mo: { szene: 'wald', wer: 'mo', bleibt: true, dauer: true, name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [-58.2, -102.8, -0.7, 'handy'], ort: 'wald' },
  mika: { szene: 'wald', wer: 'mika', name: 'Mika (6ème)', farbe: '#e9b949', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#c9a15a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#4f88c8', hoehe: 1.58 }, steht: [-62.75, -99.6, Math.PI / 2, 'sitzt'], ort: 'wald' },
  moLaden: { szene: 'laden', wer: 'mo', name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [39.4, 90.4, 0.5, 'handy'], ort: 'laden' },
  lisette: { immer: true, name: 'Tante Lisette · Épicerie', farbe: '#2f8a5a', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f0c9a8', haar: '#9a9a9a', oben: '#2f8a5a', unten: '#3a3f4b', schuhe: '#3a2a1c', hoehe: 1.62 }, steht: [36.9, 94.5, Math.PI / 2, 'redet'],  ort: 'laden' },
  // Bushäuschen Rue du Moulin (Graffiti, ab Kapitel 6)
  dexWand: { szene: 'graffiti', wer: 'dex', name: 'Dex (5ème)', farbe: '#e85d75', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#1b1410', oben: '#2b2b33', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.78, kopf: 'cap', kopfFarbe: '#e85d75' }, steht: [5.6, 83.25, Math.PI, 'redet'] },
  moWand: { szene: 'graffiti', wer: 'mo', name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [3.2, 84.7, 2.6, 'handy'] },
  // Hinter der Turnhalle (Streit mit Publikum, ab Kapitel 7)
  jules: { szene: 'halle', wer: 'jules', name: 'Jules (6ème)', farbe: '#d9693f', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#7a4a2a', oben: '#d9693f', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.7 }, steht: [59.8, -25.7, 1.2, 'redet'] },
  sami: { szene: 'halle', wer: 'sami', name: 'Sami (6ème)', farbe: '#4f88c8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.52 }, steht: [61.0, -25.4, -1.9, ''] },
  z1: { szene: 'halle', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f0c9a8', haar: '#c9a15a', oben: '#e9b949', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.6 }, steht: [59.2, -23.6, 2.6, 'handy'] },
  z2: { szene: 'halle', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.72 }, steht: [61.3, -22.9, -2.8, 'handy'] },
  z3: { szene: 'halle', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#2b1d14', oben: '#9b7bc8', unten: '#2d3748', schuhe: '#e85d75', hoehe: 1.66 }, steht: [58.8, -27.0, 1.0, 'handy'] },
  z4: { szene: 'halle', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#e85d75', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.62 }, steht: [61.9, -27.3, -0.8, 'handy'] },
  // Spielplatz (Energy-Drink-Wette, ab Kapitel 5)
  lenny: { szene: 'wette', wer: 'lenny', name: 'Lenny (6ème)', farbe: '#3fa66b', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#2b1d14', oben: '#3fa66b', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.68, kopf: 'cap', kopfFarbe: '#2b2b33' }, steht: [60.9, 79.3, -2.3, 'redet'] },
  pit: { szene: 'wette', wer: 'pit', name: 'Pit (6ème)', farbe: '#e9b949', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f0c9a8', haar: '#d9b36a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#4f88c8', hoehe: 1.5 }, steht: [58.6, 80.4, Math.PI, 'sitzt'] },
  // Eingangshalle (Lootbox, ab Kapitel 6; beginnt, wenn man Rafa anspricht)
  // WC (Vape, ab Kapitel 8)
  ines: { szene: 'vape', wer: 'ines', name: 'Ines (6ème)', farbe: '#d9693f', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#e0b48c', haar: '#2b1d14', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.58 }, steht: [22.2, -28.0, Math.PI / 2, 'handy'] },
  kai: { szene: 'vape', wer: 'kai', name: 'Kai (6ème)', farbe: '#4f88c8', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#5a3a24', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.64 }, steht: [23.5, -28.2, -Math.PI / 2, 'redet'] },
  // CDI (Gratis-Diamanten, ab Kapitel 8; beginnt, wenn man Noé anspricht)
  noe: { szene: 'link', wer: 'noe', bleibt: true, name: 'Noé (6ème)', farbe: '#3fa66b', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#3fa66b', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.55 }, steht: [-7.6, -20.6, 0.4, 'handy'] },
  // Gang vor Saal 1.04 (Video über Mme Lenning, ab Kapitel 9; beginnt, wenn man Yanis anspricht)
  yanis: { szene: 'video', wer: 'yanis', name: 'Yanis (6ème)', farbe: '#c0392b', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#c68e64', haar: '#1b1410', oben: '#c0392b', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.66, kopf: 'cap', kopfFarbe: '#ffffff' }, steht: [-15.0, -15.5, Math.PI / 2, 'handy'] },
  z5: { szene: 'video', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f0c9a8', haar: '#7a4a2a', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.58 }, steht: [-13.9, -15.1, -2.0, 'handy'] },
  z6: { szene: 'video', stumm: true, name: 'Jemand', farbe: '#5b6472', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#e9b949', unten: '#2d3748', schuhe: '#e85d75', hoehe: 1.62 }, steht: [-14.1, -16.4, -0.8, 'handy'] },
  // Sommerfest, Raucherecke hinter der Turnhalle (Alkohol, Kapitel 10) – alte Bekannte
  moFest: { szene: 'fest', wer: 'mo', name: 'Mo (5ème)', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.74 }, steht: [61.6, -13.4, -2.0, 'redet'] },
  mikaFest: { szene: 'fest', wer: 'mika', name: 'Mika (6ème)', farbe: '#e9b949', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#c9a15a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#4f88c8', hoehe: 1.6 }, steht: [59.9, -12.9, 2.2, 'handy'] },
  // Hinter der Turnhalle, am Container (Ball auf dem Dach, Kapitel 8–9) – Pit, schon wieder
  pitDach: { szene: 'dach', wer: 'pit', name: 'Pit (6ème)', farbe: '#e9b949', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f0c9a8', haar: '#d9b36a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#4f88c8', hoehe: 1.5 }, steht: [62.4, -21.9, -2.0, 'redet'] },
  jana: { szene: 'dach', wer: 'jana', name: 'Jana (6ème)', farbe: '#2f6db0', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#2b1d14', oben: '#2f6db0', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.57 }, steht: [60.6, -21.4, 1.6, 'redet'] },
  // Eingangshalle, Fundkiste (Kapitel 7–8, nur mittags, wenn Jeff im Lesesaal ist)
  tom: { szene: 'fundkiste', wer: 'tom', name: 'Tom (5ème)', farbe: '#5a6b7a', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#2b1d14', oben: '#5a6b7a', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.8 }, steht: [6.0, -12.0, 2.36, 'handy'] },
  jeffSit: { szene: 'fundkiste', wer: 'jeff', unsichtbar: true, name: 'Jeff (6ème)', farbe: '#3f78b8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#d9b36a', oben: '#3f78b8', unten: '#3a3f4b', schuhe: '#e85d75', hoehe: 1.6, kopf: 'cap', kopfFarbe: '#e9b949' }, steht: [5.4, -11.4, Math.PI / 2, 'handy'] },
  rafa: { szene: 'kiste', wer: 'rafa', bleibt: true, name: 'Rafa (6ème)', farbe: '#9b7bc8', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#c68e64', haar: '#1b1410', oben: '#9b7bc8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.56 }, steht: [1.6, -4.8, 0.3, 'handy'] },
};

// Szenen: ab welchem Kapitel, wo sie beginnen (Zone) – oder nur, wenn man die Person anspricht
export const SZENEN = {
  wald: { frage: 'Was kostet ein Nein – und was bringt es?', ab: 4, bis: 6, start: { x: -60, z: -93, yaw: Math.PI }, zone: { x: -60, z: -99, r: 6.5 }, teaser: ['Dex (Gruppe)', 'Wer chillt nach der Schule an der Lichtung? 🌲 Waldweg hinter der Werkstatt'], titel: ['🌲', 'Die Lichtung', 'Was du mitmachst, entscheidest du. Auch beim nächsten Mal.'] },
  laden: { frage: 'Wer hat bei einer Mutprobe eigentlich etwas davon?', ab: 5, bis: 6, start: { x: 42, z: 89.5, yaw: 0 }, zone: { x: 41.6, z: 90.6, r: 2.6 }, teaser: ['Mo (Gruppe)', 'Mutprobe für Neue 😏 Épicerie, Rue du Moulin'], titel: ['🛒', 'Die Mutprobe', 'Dazugehören darf nichts kosten, was du nicht geben willst.'] },
  wette: { frage: 'Wie steigt man aus einer Wette aus, ohne das Gesicht zu verlieren?', ab: 5, bis: 6, start: { x: 61.5, z: 80.8, yaw: -2.27 }, zone: { x: 59.6, z: 79.2, r: 3.4 }, teaser: ['Lenny (Gruppe)', 'Wette am Spielplatz ⚡ Wer traut sich?'], titel: ['🥤', 'Drei Dosen', 'Gewinnen, bis es dir schlecht geht, ist kein Gewinnen.'] },
  graffiti: { frage: 'Wie kann man gesehen werden, ohne etwas kaputtzumachen?', ab: 6, bis: 7, start: { x: 4.7, z: 86.8, yaw: Math.PI }, zone: { x: 4.7, z: 84.6, r: 3.2 }, teaser: ['Dex (Gruppe)', 'Kunst im Bushäuschen, Rue du Moulin 🎨 Kommt vorbei'], titel: ['🎨', 'Die Wand', 'Jede Wand hat schon eine Geschichte. Manchmal eine von jemandem, den du kennst.'] },
  kiste: { frage: 'Warum zeigt ein Spiel, was man „fast“ bekommen hätte?', ab: 6, bis: 8, start: { x: 2.8, z: -2.8, yaw: -2.6 }, teaser: ['Rafa', 'Bist du in der Halle? Ich muss dir was zeigen 🎁'], titel: ['🎁', 'Fast gewonnen', '„Fast“ ist gebaut. Damit du weiterdrückst.'] },
  vape: { frage: 'Woran merkt man, dass einen etwas festhält?', ab: 8, bis: 9, start: { x: 24.5, z: -23.5, yaw: -2.7 }, zone: { x: 23, z: -26.8, r: 2.8 }, teaser: ['Kai', 'WC, große Pause. Ich zeig dir was 😮‍💨'], titel: ['💨', 'Die Wolke', 'Süß riechen heißt nicht harmlos sein.'] },
  link: { frage: 'Woran erkennt man einen Fake-Link?', ab: 8, bis: 9, start: { x: -6.6, z: -19.0, yaw: -2.58 }, teaser: [['Unbekannt', '🎁 GRATIS 5000 Diamanten! Nur heute! Einloggen: gratis-diamanten.win'], ['Noé', 'Hast du die Diamanten-Nachricht auch?? Bin im CDI 💎']], titel: ['🔗', 'Gratis', 'Wer schickt es? Wo führt es hin? Wer hat was davon?'] },
  video: { frage: 'Wie fühlt es sich an, wenn alle über einen lachen – egal wie alt man ist?', ab: 9, bis: 10, start: { x: -12.4, z: -16.6, yaw: -1.13 }, teaser: ['Yanis (Gruppe)', 'HAHA habt ihr das Video von der Lenning gesehen?? 😂 Gang, vor 1.04'], titel: ['🎬', 'Das Video', 'Lachen über jemanden ist leicht. Aufhören ist schwerer.'] },
  fest: { frage: 'Was verpasst man, wenn man um jeden Preis dabei sein will?', ab: 10, bis: 10, start: { x: 60.6, z: -9.5, yaw: Math.PI }, schritt: 'k10_fest', zone: { x: 60.6, z: -13.3, r: 3.2 }, teaser: ['Mo (Gruppe)', 'Sommerfest-Afterparty hinter der Turnhalle 🍾 Psst'], titel: ['🍾', 'Die Wasserflasche', 'Das Fest ist drinnen. Und du gehörst dazu.'] },
  spiel: { frage: 'Woran erkennt man, dass ein Online-Freund nicht ehrlich ist?', ab: 9, bis: 10, start: { x: 4.7, z: 85.2, yaw: Math.PI }, zone: { x: 4.7, z: 83.1, r: 1.5 }, teaser: ['Leo_15 · Spiel-Chat', 'Hey 😊 Du spielst echt gut! Hab dir was geschenkt 🎁'], titel: ['🎮', 'Der Spielfreund', '„Erzähl es keinem“ ist der beste Grund, es jemandem zu erzählen.'] },
  dach: { frage: 'Wann ist Hilfe holen klüger als Mut?', ab: 8, bis: 9, start: { x: 60.8, z: -17.8, yaw: Math.PI }, zone: { x: 61.6, z: -21.6, r: 2.8 }, teaser: ['Pit', 'Ball auf dem Turnhallendach 😭 Hilf mal, hinten beim Container!'], titel: ['🏀', 'Das Dach', 'Die Leiter ist nicht feige. Sie ist klug.'] },
  fundkiste: { frage: 'Was hilft, wenn man Angst vor Rache hat?', ab: 7, bis: 8, zeit: [11.9, 13.6], start: { x: 3.6, z: -9.8, yaw: 2.31 }, teaser: ['Jeff', 'Schon wieder ist meine Powerbank weg 😩 Hab ich die verloren??'], titel: ['🎒', 'Die Fundkiste', 'Wer etwas sieht und es sagt, verändert, was jemand über sich glaubt.'] },
  halle: { frage: 'Was ist der Unterschied zwischen Petzen und Hilfe holen?', ab: 7, bis: 7, start: { x: 60.4, z: -20.4, yaw: Math.PI }, zone: { x: 60.4, z: -25.4, r: 5 }, teaser: ['Unbekannt', 'HINTER DER TURNHALLE. JETZT. 👀'], titel: ['📱', 'Der Kreis', 'Wer filmt, baut die Bühne. Wer hilft, baut sie ab.'] },
};

// Wer ist wann da? (Kapitel, Schalter in den Einstellungen, was schon passiert ist)
export function sitSichtbar(id, kap, m, risiko, schritt, schrittId, uhr = 12) {
  const P = SIT_LEUTE[id]; if (!P) return false;
  if (P.immer) return true;
  if (!risiko) return false;
  const sz = SZENEN[P.szene]; if (!sz || kap < sz.ab) return false;
  if (sz.schritt && sz.schritt !== schrittId) return false;   // nur an diesem Tag (z. B. Sommerfest)
  if (sz.zeit && (uhr < sz.zeit[0] || uhr > sz.zeit[1])) return false;   // nur zu dieser Uhrzeit (z. B. Mittagspause)
  if (P.unsichtbar) return false;   // tritt nur in der Szene auf (Jeff kommt später dazu)
  const weg = m.sitWeg || {};   // gerade passiert: Wer dabei war, ist für den Rest des Schritts weg
  for (const k in weg) if (weg[k] === schritt && (k === P.szene || Object.values(SIT_LEUTE).some((q) => q.szene === k && q.wer && q.wer === P.wer))) return false;
  if (P.dauer) return true;                                   // Dex, Sina, Mo hängen ab Kapitel 4 immer an der Lichtung ab
  if (m['sit_' + P.szene]) return !!P.bleibt;
  return kap <= (sz.bis || 10);                               // Zeitfenster vorbei: Die Situation ist vorüber, wie im echten Leben
}
// Ist die Situation gerade möglich? (Kapitel-Fenster, Tag, noch nicht erlebt)
export function sitOffen(id, kap, m, schrittId, uhr = 12) {
  const sz = SZENEN[id];
  return !!sz && !m['sit_' + id] && kap >= sz.ab && kap <= (sz.bis || 10) && (!sz.schritt || sz.schritt === schrittId) && (!sz.zeit || (uhr >= sz.zeit[0] && uhr <= sz.zeit[1]));
}

// Auslöser: kommt man in die Nähe, beginnt die Situation (einmal); weggehen geht immer
export const SIT_ZONEN = Object.entries(SZENEN).filter(([, s]) => s.zone).map(([id, s]) => ({ id, ...s.zone, ab: s.ab, bis: s.bis || 10, schritt: s.schritt, offen: (m) => !m['sit_' + id] }));

// ================= Die Lichtung (Kiffen) =================
export async function lichtung(a) {
  const m = a.m();
  await a.sag('e', 'Zwischen den Bäumen hängt Rauch. Es riecht süßlich.');
  await a.sag('dex', m.sit_laden || m.sit_graffiti ? 'Ah, du schon wieder. Komm, setz dich.' : 'Ey. Neu hier? Komm, setz dich. Wir beißen nicht.');
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
    await a.sag('e', '(Die Atem-Übung aus der Skills-Stunde. Hier draußen hilft sie wirklich.)');
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
  if (w === 1) { await a.sag('mo', 'Hab ich schon. Letzte Woche. War easy.'); await a.sag('e', '(Gedanken prüfen: Stimmt das? Oder macht der Satz nur Druck?)'); }
  a.ton('pling');
  await a.sag('e', 'Du gehst rein. Über der Tür bimmelt eine Glocke.');
  a.teleport('epicerieInnen');
  await a.sag('lisette', 'Moien! Die Gummibärchen sind heute im Angebot.');
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
  a.ton('pling');
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
  if (id === 'noe') return m.noeGeholfen || m.linkRepariert ? ['Neues Passwort. Zweiundzwanzig Zeichen. Ich kann’s selbst nicht.', 'Ich frag jetzt immer: Wer hat was davon?'] : ['Diamanten sind mir egal jetzt.', 'Hast du auch so komische Nachrichten?'];
  if (id === 'rafa') return m.kisteKuedes ? ['Käufe gesperrt. Fühlt sich komisch an. Aber gut.', 'Leon wartet noch. Ich zahl jede Woche fünf zurück.'] : ['Heute nicht gedrückt. Fast nicht.', 'Ich spiel jetzt ohne Kisten. Ist sogar lustiger.'];
  if (SIT_LEUTE[id] && SIT_LEUTE[id].stumm) return ['(filmt weiter)', '(schaut nicht mal hoch)'];
  return ['…'];
}

// ================= Die Wand (Graffiti am Bushäuschen, Rue du Moulin) =================
// Unter Dex’ Kürzel ist ein Wandbild der 7ème vom letzten Jahr. Noor hat die Trommel gemalt.
export async function graffiti(a) {
  const m = a.m();
  a.ton('spruehen');
  await a.sag('e', 'Zischen. Es riecht nach Farbe. Dex sprüht am Bushäuschen.');
  await a.sag('e', 'Unter seinem D3X: ein Wandbild. Kinder, Masten, ein Hund. Eine Trommel.');
  await a.sag('dexWand', m.sit_wald ? 'Ah, du. Perfekt. Halt mal Wache.' : 'Ey, 7ème. Halt mal Wache. Oder mach mit.');
  await a.sag('moWand', '(filmt) Für den Kanal. „Junglinster gehört uns.“');
  await a.sag('dexWand', 'Hier. Mach dein Zeichen. Neben meins. Dann bist du auf der Wand.');
  await a.sag('e', 'Die Dose ist kalt in deiner Hand. Und schwerer als gedacht.');
  const w = await a.wahl(['„Das Bild hat jemand gemalt. Siehst du die Unterschrift?“', '„Zeig mal. Malst du auch auf Papier?“', '(Ein schnelles Zeichen sprühen.)', '(Die Dose zurückgeben und gehen.)']);
  if (w === 3) {
    await a.sag('dexWand', 'Langweilig.');
    await a.sag('moWand', 'Cut. Das schneiden wir raus.');
    await a.sag('e', 'Du bist nicht im Video. Das fühlt sich besser an als gedacht.');
    a.merke('sit_graffiti', 'gegangen');
    return;
  }
  if (w === 0) {
    await a.sag('dexWand', 'Was für eine Unterschrift?');
    await a.sag('e', 'Oben links steht klein: „7ème B · Trommel: Noor“.');
    await a.sag('dexWand', '(liest) Noor? Die Kleine mit den Trommeln?');
    await a.sag('dexWand', 'Die hat mir mal den Musikraum aufgemacht. Als ich nirgends hinkonnte.');
    await a.sag('e', 'Dex schaut lange auf seine Farbe. Auf ihrer Trommel.');
    const x = await a.wahl(['„Wir machen es weg. Jetzt, solange es frisch ist.“', '„Sag es ihr. Bevor sie es selbst sieht.“', '(Nichts sagen. Er hat es verstanden.)']);
    if (x === 0) {
      await a.sag('dexWand', 'Wegmachen? Mit was denn?');
      await a.sag('e', 'Mo hat Feuchttücher. Natürlich hat Mo Feuchttücher.');
      await a.blende('Zwanzig Minuten später');
      a.deko('tagDex', false);
      await a.sag('e', 'Das Rot ist fast weg. Die Trommel hat einen rosa Schimmer.');
      await a.sag('dexWand', 'Sieht fast aus wie Absicht.');
      await a.sag('moWand', '(steckt das Handy weg) Das poste ich nicht.');
      a.merke('sit_graffiti', 'weggemacht');
    } else if (x === 1) {
      await a.sag('dexWand', 'Ihr sagen? Dann hasst die mich.');
      await a.sag('e', '(Vielleicht. Vielleicht auch nicht. Wer weiß das vorher?)');
      await a.sag('dexWand', '… Morgen. Vielleicht.');
      a.merke('sit_graffiti', 'reden');
    } else {
      await a.sag('e', 'Dex steckt die Dose weg. Ohne ein Wort.');
      a.merke('sit_graffiti', 'verstanden');
    }
    return;
  }
  if (w === 1) {
    await a.sag('dexWand', '(zögert) … Das fragt sonst keiner.');
    await a.sag('e', 'Dex zieht ein schwarzes Heft aus der Jacke. Voll mit Zeichnungen.');
    await a.sag('e', 'Buchstaben, die fliegen. Gesichter. Ein Bus, der wie ein Wal aussieht.');
    let x = await a.wahl(['„Das ist richtig gut. Warum dann hier an der Wand?“', '„Mme Kiesser sucht Leute für die große Wand im Neubau.“', '„Krass. Zeigst du mir, wie das geht?“']);
    if (x === 2) {
      await a.sag('dexWand', 'Auf Papier? … Okay. Hier, nimm den Stift.');
      await a.sag('e', 'Ihr zeichnet zehn Minuten. Dein D sieht aus wie ein Brot.');
      await a.sag('dexWand', '(lacht) Brot ist ein Anfang.');
      await a.sag('e', 'Die Dose bleibt zu. Mo filmt die Brote.');
      a.merke('sit_graffiti', 'papier');
      return;
    }
    if (x === 0) {
      await a.sag('dexWand', 'Weil mich hier jeder sieht. Im Heft sieht mich keiner.');
      await a.sag('e', '(Gesehen werden. Darum geht es. Nicht um die Wand.)');
      await a.sag('du', 'Mme Kiesser sucht Leute für die große Wand im Neubau.');
    }
    await a.sag('dexWand', 'Als ob die mich nimmt. Mich nimmt nie einer.');
    x = await a.wahl(['„Frag sie. Ich komm mit, wenn du willst.“', '„Dann eben nicht.“']);
    if (x === 0) {
      await a.sag('dexWand', '… Okay. Mittwoch. Aber du redest zuerst.');
      await a.sag('e', 'Dex steckt die Dose in den Rucksack. Ganz nach unten.');
      a.merke('sit_graffiti', 'kiesser');
    } else {
      await a.sag('dexWand', 'Eben.');
      await a.sag('e', 'Er sprüht weiter. Langsamer als vorher.');
      a.merke('sit_graffiti', 'verstanden');
    }
    return;
  }
  // gesprüht
  a.merke('sit_graffiti', 'gespruht');
  a.ton('spruehen');
  await a.blende('Zwei Minuten später');
  a.deko('tagDu', true);
  await a.sag('e', 'Dein Zeichen ist schief. Es läuft über die Trommel.');
  await a.sag('dexWand', 'Ha! Jetzt bist du drin.');
  await a.sag('e', 'Ein Auto hält. Ein Mann ruft. Alle rennen. Du auch.');
  await a.sag('e', 'Deine Finger sind gelb. Die Farbe geht nicht ab.');
  a.nachricht('Mo (Gruppe)', 'Neues Video: „Die Wand gehört uns“ 🎨');
  await a.blende('Am nächsten Morgen');
  await a.sag('e', 'Fernand steht am Bushäuschen. Mit Eimer und Bürste. Es ist kalt.');
  await a.sag('fernand', 'Zwei Stunden schrubben. Das Bild geht mit ab. Mist.');
  await a.sag('e', 'Neben ihm steht Noor. Ganz still. Schaut auf die Trommel.');
  const x = await a.wahl(['„Das war ich. Das Gelbe. Tut mir leid.“', '„Kann ich helfen?“', '(Weitergehen. Keiner weiß es.)']);
  if (x === 0) {
    await a.sag('noor', '(lange still) … Warum?');
    const y = await a.wahl(['„Ich wollte dazugehören.“', '„Ich weiß es nicht.“']);
    await a.sag('noor', y === 0 ? 'Zu Dex? … Wollte ich letztes Jahr auch.' : 'Okay. Wenigstens ehrlich.');
    await a.sag('noor', 'Ich mal die Trommel neu. Du hältst die Farben. Deal?');
    await a.sag('fernand', 'Dann schrubb ich mal weiter. Mit Hilfe geht’s schneller.');
    a.merke('graffitiGesagt');
  } else if (x === 1) {
    await a.sag('fernand', 'Zwei Hände mehr. Gut. Hier, Handschuhe.');
    await a.blende('Eine Stunde später');
    await a.sag('e', 'Deine Arme tun weh. Das Gelbe ist weg. Die Trommel auch.');
    await a.sag('noor', 'Danke fürs Helfen.');
    await a.sag('e', 'Sie weiß es nicht. Du schon.');
    a.merke('graffitiGeholfen');
  } else {
    await a.sag('e', 'Du gehst vorbei. Fernand schrubbt. Noor schaut dir nach.');
  }
  a.deko('tagDu', false); a.deko('tagDex', false);
}

// ================= Der Kreis (hinter der Turnhalle: Streit mit Publikum) =================
// Ein Fake-Account hat ein Foto von Jules gepostet. Jules glaubt, es war Sami. Alle filmen.
export async function halle(a) {
  await a.sag('e', 'Hinter der Turnhalle stehen Leute im Kreis. Alle Handys sind oben.');
  await a.sag('zu', '(rufen) Los! Los! Los!');
  await a.sag('e', 'In der Mitte: Jules und Sami. Sami ist einen Kopf kleiner.');
  await a.sag('jules', 'Du hast mein Foto in die Gruppe gestellt. Mit dem Schwein-Sticker.');
  await a.sag('sami', 'Das war ich nicht! Ehrlich! Ich weiß nicht mal, wie das geht!');
  await a.sag('jules', '(schubst ihn) Lüg nicht.');
  await a.sag('z1', 'Ey, 7ème! Mein Akku stirbt. Film du! Schnell!');
  await a.sag('e', 'Jemand drückt dir ein Handy in die Hand. Die Kamera läuft schon.');
  const w = await a.wahl(['(Filmen. Alle machen es.)', '„Handys runter! Das ist keine Show!“', '(Das Handy zurückgeben. Herrn Mesenberg holen.)', '(Zu Sami gehen. Neben ihn stellen.)']);
  if (w === 0) {
    a.merke('sit_halle', 'gefilmt');
    await a.blende('Zwanzig Sekunden');
    await a.sag('e', 'Auf dem Bildschirm sieht alles klein aus. Wie ein Film.');
    await a.sag('e', 'Jules schubst. Sami fällt hin. Alle schreien. Du filmst weiter.');
    await a.sag('e', 'Dann ein Pfiff. Herr Mesenberg. Alle rennen.');
    await a.sag('e', 'Das Handy ist weg. Das Video nicht.');
    a.nachricht('Gruppe', 'Video: „Jules vs Sami 💥“ · 61 Aufrufe');
    a.nachricht('Sami', 'Warum hast du gefilmt?');
    await kuedesHalle(a, 'gefilmt');
    return;
  }
  if (w === 1) {
    await a.sag('z2', 'Halt die Klappe, 7ème.');
    await a.sag('e', 'Dein Herz hämmert. Aber zwei Leute senken ihr Handy.');
    await a.sag('e', 'Dann noch eins. Ohne Kameras ist es nur noch ein Streit.');
    await a.sag('jules', '(schaut sich um) … Ihr seid alle so peinlich.');
    await a.sag('e', 'Jules geht. Der Kreis löst sich auf. Einfach so.');
    await a.sag('e', '(Ohne Publikum keine Show. Manchmal reicht das schon.)');
    a.merke('sit_halle', 'handys');
  } else if (w === 2) {
    await a.blende('Dreißig Sekunden später');
    await a.sag('mesenberg', 'Auseinander. Sofort. Handys in die Taschen.');
    await a.sag('jules', '(im Vorbeigehen, zu dir) Petze.');
    await a.sag('e', 'Das Wort trifft. Aber Sami steht noch. Unverletzt.');
    a.merke('sit_halle', 'hilfe');
  } else {
    await a.sag('e', 'Deine Beine gehen einfach. Du stehst neben Sami.');
    await a.sag('du', 'Komm, Sami. Wir gehen.');
    await a.sag('jules', 'Halt dich raus, 7ème.');
    const x = await a.wahl(['(Ruhig bleiben. Mit Sami weitergehen.)', '(Jules anschreien.)', '(Einen Schritt zurück.)']);
    if (x === 0) {
      await a.sag('e', 'Ihr geht. Langsam. Niemand hält euch auf.');
      await a.sag('jules', '(ruft) Wir sind noch nicht fertig!');
      await a.sag('e', 'Aber er bleibt stehen.');
      a.merke('sit_halle', 'sami');
    } else if (x === 1) {
      await a.sag('du', 'Lass ihn in Ruhe, du Idiot!');
      await a.sag('e', 'Jules kommt näher. Jetzt stehst du in der Mitte.');
      await a.blende('Ein Pfiff');
      await a.sag('mesenberg', 'Stopp! Alle drei. Mitkommen.');
      await a.sag('e', 'Nichts ist passiert. Diesmal. Dein Körper zittert trotzdem.');
      a.merke('sit_halle', 'mitte');
    } else {
      await a.sag('e', 'Du machst einen Schritt zurück. Sami schaut dich an.');
      await a.sag('e', 'Dann pfeift Herr Mesenberg. Gerade noch.');
      a.merke('sit_halle', 'zurueck');
    }
  }
  await a.blende('Später, am Fahrradständer');
  await a.sag('sami', 'Ich war das wirklich nicht. Mit dem Foto.');
  const y = await a.wahl(['„Ich glaub dir.“', '„Weißt du, wer es war?“', '„Sag es Herrn Kuedes.“']);
  if (y === 0) await a.sag('sami', 'Das hat heute noch keiner gesagt.');
  if (y === 1) { await a.sag('sami', 'Ein Fake-Account. Der postet über alle. Keiner weiß, wer.'); await a.sag('e', '(Wie der Screenshot im Dezember. Gleiche Masche.)'); }
  if (y === 2) { await a.sag('sami', 'Und dann bin ich der, der petzt.'); await a.sag('e', '(Hilfe holen ist kein Petzen. Fühlt sich aber manchmal so an.)'); }
  await a.sag('sami', 'Danke. Dass du nicht nur zugeschaut hast.');
  a.nachricht('Sami', 'Danke wegen heute. Echt.');
  const m = a.m().sit_halle;
  if (m === 'hilfe' || m === 'mitte') await kuedesHalle(a, m);
}

async function kuedesHalle(a, art) {
  await a.blende('Am nächsten Tag · SePAS');
  if (art === 'gefilmt') {
    await a.sag('kaya', 'Ich hab das Video gesehen. Kein Verhör. Wie geht’s dir?');
    const w = await a.wahl(['„Ich hab nur gefilmt.“', '„Alle haben gefilmt.“', '„Schlecht.“']);
    await a.sag('kaya', ['Nur gefilmt. Klingt harmlos. Ist es leider nicht.', 'Stimmt. Zwölf Leute. Und jeder dachte: Ich bin nur einer.', 'Schlecht zeigt: Sami ist dir nicht egal.'][w]);
    await a.sag('kaya', 'Wer filmt, baut die Bühne. Ohne Publikum hört so was oft auf.');
    await a.sag('kaya', 'Sami sieht sich jetzt jeden Tag hinfallen. Auf vielen Handys.');
    const x = await a.wahl(['(Löschen. Und Sami schreiben: „Sorry. War falsch.“)', '(Nichts machen.)']);
    if (x === 0) { a.merke('halleGeloescht'); a.nachricht('Sami', 'Okay. Danke, dass du schreibst.'); await a.sag('kaya', 'Das war der schwerere Weg. Danke.'); }
    else await a.sag('kaya', 'Du kannst es dir noch überlegen. Die Tür bleibt offen.');
  } else if (art === 'hilfe') {
    await a.sag('kaya', 'Jules hat „Petze“ zu dir gesagt. Ich weiß.');
    await a.sag('kaya', 'Petzen will jemandem schaden. Hilfe holen will Schaden verhindern.');
    await a.sag('kaya', 'Du hast verhindert. Das ist ein großer Unterschied.');
  } else {
    await a.sag('kaya', 'Du bist dazwischen gegangen. Das war mutig. Und gefährlich.');
    await a.sag('kaya', 'Dein Körper zählt auch. Nie dazwischen, wenn schon geschlagen wird.');
    await a.sag('kaya', 'Laut sein. Andere mitnehmen. Hilfe holen. Das ist auch Mut.');
  }
  await a.sag('kaya', 'Übrigens: Jules geht es auch nicht gut. Das Foto war gemein.');
  await a.sag('kaya', 'Wenn jemand verletzt ist: 112. Reden geht immer: 116 111.');
}

// ================= Drei Dosen (Energy-Drink-Wette am Spielplatz) =================
export async function wette(a) {
  a.deko('dosen', true);
  a.ton('dose');
  await a.sag('e', 'Am Spielplatz. Auf der Bank stehen Dosen. Bunt. Mit Blitzen drauf.');
  await a.sag('lenny', 'Wette! Wer schafft drei Dosen in fünf Minuten?');
  await a.sag('lenny', 'Wer verliert, zahlt alle. Pit ist schon bei zwei.');
  await a.sag('pit', '(grinst schief) Easy. Mein Herz macht nur so … Techno.');
  await a.sag('e', 'Pits Hände zittern ein bisschen. Er lacht trotzdem.');
  await a.sag('e', 'Auf der Dose steht klein: „Für Kinder nicht empfohlen.“');
  const w = await a.wahl(['„Lies mal, was da klein draufsteht.“', '„Andere Wette: Wer hält länger auf der Wippe?“', '„Gib her. Ich schaff drei.“', '„Nee. Und zahlen tu ich auch nicht.“']);
  if (w === 1) {
    await a.sag('lenny', 'Wippe? Bist du fünf?');
    await a.sag('pit', '(stellt die Dose ab) Wippe. Ich bin dabei.');
    await a.blende('Zehn Minuten später');
    await a.sag('e', 'Pit fällt dreimal runter. Lenny lacht. Dann probiert er es selbst.');
    await a.sag('lenny', 'Okay, okay. Revanche morgen.');
    await a.sag('e', 'Die Dosen stehen vergessen auf der Bank.');
    await a.sag('pit', 'Mir ist trotzdem flau. Zwei waren schon zu viel.');
    await a.sag('e', 'Ihr holt Wasser bei Tante Lisette. Pit setzt sich. Es wird besser.');
    a.merke('sit_wette', 'wippe');
    a.nachricht('Pit', 'Revanche Wippe morgen? Ohne Dosen 😅');
    return;
  }
  if (w === 2) {
    a.merke('sit_wette', 'getrunken');
    await a.blende('Fünf Minuten später');
    await a.sag('e', 'Die erste schmeckt süß. Die zweite schon nicht mehr.');
    await a.sag('e', 'Bei der dritten klopft dein Herz bis in die Ohren.');
    await a.sag('e', 'Deine Hände zittern. Dir ist übel.');
    await a.sag('lenny', 'Gewonnen! Pit zahlt!');
    await a.sag('e', 'Gewonnen fühlt sich anders an.');
    await a.blende('In der Nacht');
    await a.sag('e', 'Du liegst wach. Zwei Uhr. Drei Uhr. Das Herz klopft immer noch.');
    await a.blende('Am Morgen');
    await a.sag('e', 'Mathe. Die Zahlen verschwimmen. Du gähnst zwölfmal.');
    a.nachricht('Pit', 'Hab die ganze Nacht nicht geschlafen. Du?');
    a.deko('dosen', false);
    return;
  }
  if (w === 0) {
    await a.sag('lenny', 'Steht auf allem. Auf Chips steht auch was.');
    await a.sag('e', 'Eine Dose hat so viel Koffein wie eine große Tasse Kaffee.');
    await a.sag('e', 'Drei sind für einen Körper wie deinen viel zu viel.');
    await a.sag('pit', '(leise) Mir ist eh schon komisch.');
    a.merke('sit_wette', 'gelesen');
  } else {
    await a.sag('lenny', 'Wer nicht mitmacht, zahlt trotzdem. Regel.');
    const x = await a.wahl(['„Nein. Ich hab nicht gewettet.“', '(Zwei Euro geben. Hauptsache Ruhe.)']);
    if (x === 0) { await a.sag('lenny', '… Pfff. Geizig.'); await a.sag('e', '(Nicht geizig. Klar.)'); }
    else { await a.sag('e', 'Zwei Euro weg. Für Ruhe, die nicht lange hält.'); await a.sag('lenny', 'Morgen wieder? Du zahlst ja gern.'); }
    a.merke('sit_wette', x === 0 ? 'nein' : 'gezahlt');
  }
  // Pit trinkt weiter – und dann geht es ihm schlecht
  await a.sag('e', 'Pit trinkt die dritte. Dann wird er ganz blass.');
  await a.sag('pit', 'Mein Herz … das stolpert. Mir ist schwindelig.');
  await a.sag('lenny', 'Der tut nur so. Pit, chill.');
  const h = await a.wahl(['„Setz dich. Ich hol Wasser bei Lisette.“', '„Lenny, hol Hilfe. Jetzt.“', '„Mach langsam, dann wird’s schon besser.“']);
  if (h === 1) { await a.sag('lenny', '(zögert) … Okay. Okay!'); await a.sag('e', 'Lenny rennt. Zum ersten Mal sieht er erschrocken aus.'); }
  if (h === 2) { await a.sag('pit', 'Okay …'); await a.sag('e', 'Pit atmet flach. Du weißt nicht, ob das reicht.'); await a.sag('e', 'Tante Lisette kommt über die Straße. Sie hat alles gesehen.'); }
  else await a.blende('Zwei Minuten später');
  await a.sag('lisette', 'Hier, Wasser. Kleine Schlucke. Hinsetzen.');
  await a.sag('lisette', 'Wenn das Herz weiter stolpert oder die Brust weh tut: 112.');
  await a.sag('lisette', 'Ich ruf in der Schule an. Kein Ärger. Nur Bescheid.');
  await a.sag('pit', '(nach einer Weile) Langsamer. Glaub ich.');
  await a.sag('pit', 'Danke. Ich wollte nur nicht der sein, der verliert.');
  const d = await a.wahl(['„Verloren hat heute die Dose.“', '„Kenn ich.“', '(Ihm die Wasserflasche hinhalten.)']);
  await a.sag('pit', ['(lacht schwach) Die Dose. Ja.', 'Echt? Du auch?', '(trinkt) Danke.'][d]);
  if (h !== 2) a.merke('pitGeholfen');
  a.nachricht('Pit', 'Bin wieder okay. Keine Dosen mehr. Versprochen.');
  a.deko('dosen', false);
}

// ================= Fast gewonnen (Lootbox-Druck, Eingangshalle) =================
export async function kiste(a) {
  await a.sag('rafa', 'Psst! Schau. Noch eine Kiste. Diesmal kommt der goldene Skin.');
  await a.sag('e', 'Auf Rafas Handy dreht sich eine Truhe. Lichter. Musik. Trommelwirbel.');
  await a.sag('e', 'Dann: ein grauer Hut. Gewöhnlich.');
  await a.sag('rafa', 'NEIN! Fast! Der goldene war direkt daneben! Hast du gesehen?');
  await a.sag('e', '(Direkt daneben. Wie jedes Mal?)');
  await a.sag('rafa', 'Ich brauch nur 500 Diamanten. 4,99. Leihst du mir fünf Euro?');
  const w = await a.wahl(['„Wie viel hast du schon reingesteckt?“', '„Okay. Fünf Euro.“', '„Das Spiel lässt dich extra fast gewinnen.“', '„Lass mich auch mal drücken!“']);
  if (w === 0) {
    await a.sag('rafa', '(zählt) … Paar Karten. Je zehn Euro. Fünfzehn Karten.');
    await a.sag('e', 'Hundertfünfzig Euro. Rafa wird ganz still.');
    await a.sag('rafa', 'Mein ganzes Geburtstagsgeld. Und ich schulde Leon noch dreißig.');
    a.merke('sit_kiste', 'gefragt');
  } else if (w === 1) {
    a.merke('sit_kiste', 'geliehen');
    await a.sag('e', 'Rafa tippt. Die Truhe dreht sich. Lichter. Musik.');
    await a.sag('e', 'Ein blauer Schal. Selten. Nicht golden.');
    await a.sag('rafa', 'Fast! Noch eine! Nur noch eine, dann hör ich auf.');
    await a.sag('e', '(Deine fünf Euro sind weg. In zwölf Sekunden.)');
    const x = await a.wahl(['„Nein. Das war die letzte.“', '(Noch mal fünf geben.)']);
    if (x === 0) await a.sag('rafa', '(starrt aufs Handy) … Du hast recht. Glaub ich.');
    else { await a.sag('e', 'Ein grauer Hut. Wieder.'); await a.sag('rafa', 'Das Spiel hasst mich.'); await a.sag('e', '(Das Spiel hasst niemanden. Es ist nur so gebaut.)'); a.merke('kisteZweimal'); }
    await a.sag('rafa', 'Ich drück seit Wochen. Hundertfünfzig Euro sind schon drin.');
  } else if (w === 2) {
    await a.sag('rafa', 'Woher willst du das wissen?');
    const x = await a.wahl(['„Frag Tiago. Der baut Spiele.“', '„Scroll mal zurück. Wie oft kam „fast“?“']);
    if (x === 0) {
      await a.blende('Im Informatikraum');
      await a.sag('tiago', 'Kisten? Das ist Psychologie mit Lichtern.');
      await a.sag('tiago', 'Das „fast“ ist oft extra so gebaut. Damit du weiterdrückst.');
      await a.sag('tiago', 'In meinem Spiel gibt es keine Kisten. Nie.');
      await a.sag('rafa', '… Dann bin ich voll reingefallen.');
      await a.sag('tiago', 'Nicht du. Dein Gehirn. Das fällt bei allen drauf rein.');
    } else {
      await a.sag('rafa', '(scrollt) … Fast. Fast. Fast. Fast. Immer fast.');
      await a.sag('e', '(Immer fast. Nie ganz. Das ist kein Zufall.)');
    }
    await a.sag('rafa', 'Hundertfünfzig Euro. Weg. Für einen grauen Hut.');
    a.merke('sit_kiste', 'erklaert');
  } else {
    a.merke('sit_kiste', 'gedrueckt');
    await a.sag('e', 'Du drückst. Lichter. Musik. Dein Bauch kribbelt.');
    await a.sag('e', 'Ein grauer Hut. Aber der goldene war „direkt daneben“.');
    await a.sag('e', '(Noch einmal. Nur einmal. Das Gefühl kennst du jetzt.)');
    await a.sag('rafa', 'Siehst du? Man will sofort nochmal.');
    await a.sag('rafa', 'Ich drück seit Wochen. Hundertfünfzig Euro sind schon drin.');
  }
  await a.sag('rafa', 'Wenn das rauskommt … Ich kann das keinem sagen.');
  const h = await a.wahl(['„Komm, wir gehen zusammen zu Herrn Kuedes.“', '„Lösch die Karte aus dem Handy. Heute.“', '„Ruf BEE SECURE an. Anonym und kostenlos.“']);
  if (h === 0) {
    await a.sag('rafa', 'Zusammen? … Du kommst echt mit?');
    await a.blende('In der SePAS');
    await a.sag('kaya', 'Danke, dass ihr kommt. Rafa, das ist kein Weltuntergang.');
    await a.sag('kaya', 'Wir schauen zusammen, wie du das mit dem Geld klärst.');
    await a.sag('kaya', 'Und man kann Käufe im Handy sperren. Machen wir gleich.');
    a.merke('kisteKuedes');
  } else if (h === 1) {
    await a.sag('rafa', 'Die Karte löschen … Dann kann ich nicht mehr einfach drücken.');
    await a.sag('e', 'Rafa tippt lange. Dann: gelöscht.');
    await a.sag('rafa', 'Und Leon? Die dreißig Euro?');
    await a.sag('du', 'Herr Kuedes hilft. Ohne Ärger. Ich komm mit.');
    await a.sag('rafa', 'Vielleicht. Morgen.');
  } else {
    await a.sag('e', 'BEE SECURE Helpline: 8002 1234. Kostenlos. Anonym.');
    await a.sag('rafa', '(schreibt die Nummer auf die Hand) Okay.');
  }
  await a.sag('rafa', 'Danke. Du hast nicht gelacht.');
  a.nachricht('Rafa', 'Heute nicht gedrückt. Tag eins. 💪');
}

// Rückblick im Journal: was in den Situationen passiert ist – neutral, ohne Noten (für Gespräche in der Klasse)
const RUECKBLICK = {
  wald: { nein: 'Nein gesagt. Laut.', gegangen: 'Umgedreht und gegangen.', ausrede: 'Mit einer Ausrede raus.', umgelenkt: 'Das Thema gewechselt.', mitgemacht: 'Mitgemacht. Und gespürt, wie es sich anfühlt.' },
  laden: { weiter: 'Weitergegangen.', bezahlt: 'Bezahlt. Vor laufender Kamera.', gesagt: 'Tante Lisette Bescheid gesagt.', leer: 'Mit leeren Händen raus.', erwischt: 'Erwischt. Samstag Regale eingeräumt.', geklaut: 'Geklaut.' },
  wette: { wippe: 'Eine andere Wette vorgeschlagen.', getrunken: 'Drei Dosen. Eine schlaflose Nacht.', gelesen: 'Die kleine Schrift vorgelesen.', nein: 'Nicht gewettet. Nicht gezahlt.', gezahlt: 'Gezahlt, um Ruhe zu haben.' },
  graffiti: { gegangen: 'Die Dose zurückgegeben.', weggemacht: 'Zusammen weggewischt.', reden: 'Dex ermutigt, mit Noor zu reden.', verstanden: 'Dex zum Nachdenken gebracht.', papier: 'Auf Papier gezeichnet statt an der Wand.', kiesser: 'Dex zur großen Wand im Neubau geschickt.', gespruht: 'Gesprüht.' },
  kiste: { gefragt: 'Gefragt, wie viel Geld schon drin ist.', geliehen: 'Geld geliehen.', erklaert: 'Erklärt, wie „fast“ gebaut ist.', gedrueckt: 'Selbst gedrückt.' },
  vape: { raus: 'Rausgegangen, nichts gesagt.', gezogen: 'Einmal gezogen.', gelesen: 'Die kleine Schrift gelesen.', nein: 'Nein gesagt.' },
  link: { eingeloggt: 'Eingeloggt. Konto weg.', geprueft: 'Den Link geprüft, bevor jemand tippt.' },
  video: { weiter: 'Weitergegangen.', gelacht: 'Mitgelacht.', gefragt: 'Gefragt: Weiß sie das?', gespiegelt: 'Gefragt: Würdest du das wollen?' },
  fest: { getrunken: 'Getrunken. Den Auftritt verpasst.', zurueck: 'Zurück zum Fest.', gefragt: 'Gefragt, was in der Flasche ist.', mitgenommen: 'Mika mit reingenommen.' },
  spiel: { ignoriert: 'Nicht geantwortet.', blockiert: 'Blockiert und gemeldet.', geschickt: 'Ein Selfie geschickt.', gezeigt: 'Herrn Kuedes alles gezeigt.' },
  dach: { leiter: 'Fernand und die Leiter geholt.', festgehalten: 'Den Container festgehalten.', zugeschaut: 'Zugeschaut.' },
  fundkiste: { gesagt: '„Leg das zurück“ gesagt. Trotz Angst.', weg: 'Weggegangen.', kuedes: 'Herrn Kuedes Bescheid gesagt.' },
  halle: { gefilmt: 'Gefilmt.', handys: '„Handys runter“ gesagt.', hilfe: 'Hilfe geholt.', sami: 'Sich neben Sami gestellt.', mitte: 'Dazwischen gegangen.', zurueck: 'Einen Schritt zurück gemacht.' },
};
export function sitRueckblick(m) {
  const out = [];
  for (const [id, sz] of Object.entries(SZENEN)) {
    const v = m['sit_' + id]; if (!v) continue;
    let t = (RUECKBLICK[id] || {})[v] || 'Erlebt.';
    if (id === 'laden' && m.zurueckgebracht) t += ' Und zurückgebracht.';
    if (id === 'graffiti' && m.graffitiGesagt) t += ' Und es Noor gesagt.';
    if (id === 'graffiti' && m.graffitiGeholfen) t += ' Und beim Schrubben geholfen.';
    if (id === 'halle' && m.halleGeloescht) t += ' Dann gelöscht und entschuldigt.';
    if (id === 'kiste' && m.kisteKuedes) t += ' Mit zur SePAS gegangen.';
    if (id === 'wald' && m.mikaGeholfen) t += ' Mika geholfen.';
    if (id === 'wette' && m.pitGeholfen) t += ' Pit geholfen.';
    if (id === 'vape' && m.vapeKuedes) t += ' Kai zur SePAS begleitet.';
    if (id === 'link' && (m.noeGeholfen || m.linkRepariert)) t += ' Passwort gerettet.';
    if (id === 'video' && m.videoGeteilt) t += ' Und geteilt.';
    if (id === 'video' && m.lenningGesagt) t += ' Mme Lenning Bescheid gesagt.';
    if (id === 'fest' && m.mikaFestGeholfen) t += ' Bei Mika geblieben.';
    if (id === 'fundkiste' && m.fundkisteSpaet) t += ' Später doch die Wahrheit gesagt.';
    if (id === 'fundkiste' && m.fundkisteWahr) t += ' Jeff weiß jetzt: Er ist kein Chaot.';
    if (id === 'dach' && m.dachGeholt) t += ' Dann Fernand geholt.';
    if (id === 'spiel' && m.spielKuedes && m.sit_spiel !== 'gezeigt') t += ' Dann Herrn Kuedes Bescheid gesagt.';
    out.push({ t: sz.titel[0] + ' ' + sz.titel[1], w: t });
  }
  return out;
}

// ================= Die Wolke (Vape im WC, ab Kapitel 8) =================
// Kai ist schon abhängig und weiß es halb. Ines macht mit, weil Kai es macht.
export async function vape(a) {
  await a.sag('e', 'Im WC hängt eine süße Wolke. Erdbeere. Oder Mango.');
  await a.sag('ines', '(versteckt etwas in der Hand) Ach, nur du. Schreck.');
  await a.sag('kai', 'Willst du mal? Schmeckt wie Kaugummi. Ist kein Rauchen.');
  await a.sag('e', 'Ein buntes Ding, klein wie ein Textmarker. Es blinkt.');
  const w = await a.wahl(['„Was ist da eigentlich drin?“', '„Nee. Ich mag meine Lunge.“', '(Einmal ziehen. Ist ja nur Mango.)', '(Hände waschen. Nichts sagen. Raus.)']);
  if (w === 3) {
    await a.sag('e', 'Du wäschst die Hände. Das Wasser ist kalt.');
    await a.sag('kai', '(ruft dir nach) Petz nicht!');
    await a.sag('e', 'Du sagst nichts. Aber der Geruch klebt noch an deiner Jacke.');
    a.merke('sit_vape', 'raus');
    a.nachricht('Kai', 'Danke, dass du nix gesagt hast.');
    return;
  }
  if (w === 2) {
    a.merke('sit_vape', 'gezogen');
    await a.blende('Zehn Sekunden später');
    await a.sag('e', 'Süß. Dann kratzt es. Dir wird kurz schwindelig.');
    await a.sag('e', 'Dein Herz klopft schneller. Das ist das Nikotin.');
    await a.sag('kai', 'Siehst du? Nichts passiert.');
    await a.sag('e', 'In der nächsten Stunde denkst du dran. Zweimal. Komisch.');
    a.nachricht('Kai', 'Hast du Geld? Meins ist leer. Brauch ein neues.');
    return;
  }
  if (w === 0) {
    await a.sag('kai', 'Weiß nicht. Mango halt. Und so.');
    await a.sag('ines', '(liest klein) „Enthält Nikotin. Macht sehr stark abhängig.“');
    await a.sag('ines', '… Oh. Steht da wirklich.');
    await a.sag('e', '(Oft so viel wie ein ganzes Päckchen Zigaretten. In einem Ding.)');
    a.merke('sit_vape', 'gelesen');
  } else {
    await a.sag('kai', 'Boah. Okay, Oma.');
    await a.sag('ines', '(lacht) Lass. Hat ja recht.');
    await a.sag('e', 'Ines steckt das Ding weg. Nicht ganz überzeugt.');
    a.merke('sit_vape', 'nein');
  }
  await a.sag('ines', 'Kai, hast du nicht letzte Woche gesagt, du hörst auf?');
  await a.sag('kai', '…');
  await a.sag('kai', '(leise) Ehrlich? Ich wach nachts auf und will dran ziehen.');
  const h = await a.wahl(['„Klingt, als hätte das Ding dich im Griff.“', '„Herr Kuedes hilft. Zuerst hört er zu.“', '„Hör doch einfach auf.“']);
  if (h === 0) {
    await a.sag('kai', '… Ja. Vielleicht. Mit zwölf. Krass, oder?');
    await a.sag('e', '(Das hat Kai noch keinem gesagt. Jetzt dir.)');
    await a.sag('kai', 'Ich probier’s. Weniger. Erstmal.');
  } else if (h === 1) {
    await a.sag('kai', 'Und dann gibt’s Ärger.');
    await a.sag('e', '(In der SePAS gibt es zuerst Zuhören. Das weißt du.)');
    await a.sag('kai', 'Kommst du mit? Nur bis zur Tür.');
    await a.blende('Vor der SePAS');
    await a.sag('kaya', 'Kai. Komm rein. Danke, dass du ihn begleitest.');
    await a.sag('kaya', 'Aufhören ist schwer. Allein noch schwerer. Dafür gibt es Hilfe.');
    a.merke('vapeKuedes');
  } else {
    await a.sag('kai', 'Einfach. Klar.');
    await a.sag('e', 'Kai lacht. Es klingt nicht lustig.');
    await a.sag('e', '(Einfach ist es nicht. Das weiß Kai besser als du.)');
  }
  a.nachricht('Ines', 'Ich hab meins weggeworfen. Nur dass du’s weißt.');
}

// ================= Gratis (Fake-Link und gehacktes Konto, ab Kapitel 8 – passt zu „Fake oder echt?“) =================
export async function link(a) {
  await a.sag('noe', 'Hast du die Nachricht auch? Gratis-Diamanten! Fünftausend!');
  await a.sag('e', 'Ein Link: „gratis-diamanten.win“. Ein Countdown: noch 2:59.');
  await a.sag('noe', 'Man muss sich nur mit dem Spielkonto einloggen. Schnell!');
  const w = await a.wahl(['„Wer hat das geschickt? Kennst du den?“', '„Wo führt der Link hin? Lass uns schauen.“', '(Auch einloggen. Fünftausend!)', '„Wer hat was davon, dass er Diamanten verschenkt?“']);
  if (w === 2) {
    a.merke('sit_link', 'eingeloggt');
    await a.sag('e', 'Name. Passwort. „Login erfolgreich.“ Dann: nichts. Keine Diamanten.');
    await a.blende('Am Abend');
    await a.sag('e', 'Dein Konto schreibt Nachrichten. Nicht du. Gemeine Sachen. An deine Leute.');
    a.nachricht('Gruppe', '??? Warum schreibst du sowas');
    await a.blende('Am nächsten Morgen, im CDI');
    await a.sag('noe', 'Bei mir auch. Seit gestern. Wir sind gehackt.');
    const x = await a.wahl(['„Passwort ändern. Allen sagen: Das war ich nicht.“', '(Nichts sagen. Peinlich.)']);
    if (x === 0) {
      await a.sag('e', 'Neues Passwort. Lang. Nur für dieses Konto.');
      await a.sag('e', 'Dann eine Nachricht an alle: „Gehackt. Das war nicht ich. Sorry.“');
      a.nachricht('Gruppe', 'Ah okay, dachte schon 😅 Passiert');
      await a.sag('e', '(Es dauert, bis alle es glauben. Aber sie glauben es.)');
      a.merke('linkRepariert');
    } else {
      await a.sag('e', 'Du sagst nichts. Das Konto schreibt weiter. Zwei Leute antworten nicht mehr.');
    }
    await linkHilfe(a);
    return;
  }
  if (w === 0) {
    await a.sag('noe', '(scrollt) … „Diamanten_Support_Official“. Keine Ahnung, wer das ist.');
    await a.sag('e', '(Kein Name. Kein Foto. Nur Eile.)');
  } else if (w === 1) {
    await a.sag('e', 'Ihr haltet den Finger auf den Link, ohne zu tippen.');
    await a.sag('e', 'Die Adresse ist komisch. Nicht die vom Spiel. Mit „.win“ am Ende.');
  } else {
    await a.sag('noe', '… Niemand verschenkt was. Außer Oma.');
    await a.sag('e', '(Wer hat was davon? Wer dein Passwort hat, hat dein Konto.)');
  }
  a.merke('sit_link', 'geprueft');
  await a.sag('noe', '(wird blass) Ich hab mich gestern schon eingeloggt.');
  await a.sag('noe', 'Seitdem schreibt mein Konto komische Sachen. An alle.');
  const h = await a.wahl(['„Passwort ändern. Jetzt. Ich helf dir.“', '„Sag allen, dass du gehackt wurdest.“', '„Selber schuld.“']);
  if (h === 2) {
    await a.sag('noe', '… Danke auch.');
    await a.sag('e', 'Noé dreht sich weg. Das Handy zittert in der Hand.');
    await a.sag('e', '(Reinfallen kann jeder. Auch du. Nächstes Mal.)');
    return;
  }
  await a.sag('e', h === 0 ? 'Ihr ändert das Passwort. Lang. Nur für dieses Konto.' : 'Noé schreibt: „Ich wurde gehackt. Das war nicht ich.“');
  await a.sag('noe', '(atmet aus) Okay. Okay. Danke.');
  a.merke('noeGeholfen');
  await linkHilfe(a);
}
async function linkHilfe(a) {
  await a.sag('e', 'Am schwarzen Brett im CDI hängt ein Zettel. Groß.');
  await a.sag('e', '„Gehackt? BEE SECURE Helpline: 8002 1234. Kostenlos.“');
  await a.sag('noe', 'Ich ruf da an. Mit dir daneben? Bitte.');
}

// ================= Das Video (Mme Lenning, ab Kapitel 9) =================
export async function video(a) {
  await a.sag('yanis', 'Schau! Die Lenning! Hahaha!');
  await a.sag('e', 'Ein Video. Mme Lenning trägt eine Kiste. Sie stolpert. Blätter fliegen.');
  await a.sag('e', 'Jemand hat Zirkusmusik drübergelegt. Und einen Clown-Filter.');
  await a.sag('yanis', 'Zweitausend Aufrufe! Auf „annexe.memes“! Das ist von mir!');
  await a.sag('z5', '(lacht) Nochmal! Die Stelle mit dem Schuh!');
  const w = await a.wahl(['(Mitlachen. Ist ja witzig.)', '„Weiß sie das?“', '„Würdest du wollen, dass das von dir rumgeht?“', '(Nicht hinschauen. Weitergehen.)']);
  if (w === 3) {
    await a.sag('e', 'Du gehst weiter. Hinter dir läuft die Zirkusmusik nochmal.');
    a.merke('sit_video', 'weiter');
  } else if (w === 0) {
    a.merke('sit_video', 'gelacht');
    await a.sag('e', 'Du lachst. Alle lachen. Es fühlt sich kurz gut an.');
    await a.sag('yanis', 'Teil’s in der Klasse! Dann knacken wir dreitausend!');
    const x = await a.wahl(['(Teilen.)', '(Nicht teilen.)']);
    if (x === 0) { a.merke('videoGeteilt'); a.nachricht('Gruppe', 'Du hast ein Video geteilt · 14 😂'); }
  } else if (w === 1) {
    await a.sag('yanis', '… Keine Ahnung. Ist doch egal.');
    await a.sag('e', '(Ist es egal? Würde es dir egal sein?)');
    a.merke('sit_video', 'gefragt');
  } else {
    await a.sag('yanis', 'Von mir gibt’s nichts Peinliches.');
    await a.sag('z6', '(leise) Doch. Das vom Sportfest. Mit dem Hütchen.');
    await a.sag('yanis', '… Das hast du gelöscht. Hast du versprochen.');
    await a.sag('e', 'Yanis schaut lange auf sein Handy. Dann auf den Clown-Filter.');
    a.merke('sit_video', 'gespiegelt');
  }
  // Mme Lenning kommt den Gang entlang
  await a.sag('e', 'Da kommt Mme Lenning. Mit einer Kiste. Wie im Video.');
  await a.sag('e', 'Yanis steckt das Handy weg. Zu schnell.');
  await a.sag('lenning', 'Guten Morgen. Kann mir jemand die Tür aufhalten?');
  const h = await a.wahl(['(Die Tür aufhalten.)', '(Die Tür aufhalten. Und leise sagen: „Da ist ein Video von Ihnen.“)', '(So tun, als hättest du nichts gehört.)']);
  if (h === 2) {
    await a.sag('e', 'Yanis hält die Tür auf. Er schaut auf den Boden.');
    await a.sag('lenning', 'Merci, Yanis.');
    await a.sag('e', '(Merci. Ausgerechnet.)');
    return;
  }
  await a.sag('lenning', 'Merci.');
  if (h === 1) {
    a.merke('lenningGesagt');
    await a.sag('lenning', '(bleibt stehen) … Ich weiß. Eine Kollegin hat es mir gezeigt.');
    await a.sag('lenning', 'Ich hab gelacht. Später. Am Anfang nicht.');
    await a.sag('lenning', 'Danke, dass du es mir sagst. Und nicht nur weiterschickst.');
    await a.sag('yanis', '(sehr leise) … Ich lösch es. Heute noch.');
    a.nachricht('Yanis', 'Gelöscht. War nicht so witzig wie gedacht.');
  } else if (a.m().sit_video === 'gespiegelt' || a.m().sit_video === 'gefragt') {
    await a.sag('e', 'Yanis schaut ihr nach. Dann tippt er. Lange.');
    a.nachricht('Yanis', 'Hab das Video runtergenommen. Sag’s keinem.');
  }
}

// ================= Die Wasserflasche (Sommerfest, Kapitel 10) – alte Bekannte, alte Entscheidungen =================
export async function fest(a) {
  const m = a.m();
  await a.sag('e', 'Hinter der Turnhalle. Die Musik vom Fest wummert durch die Wand.');
  await a.sag('moFest', '(hält eine Wasserflasche) Sommerfest-Spezial. Frag nicht, woher.');
  await a.sag('e', 'Es riecht nicht nach Wasser.');
  if (['nein', 'umgelenkt', 'gegangen'].includes(m.sit_wald) || ['kiesser', 'papier', 'reden', 'weggemacht'].includes(m.sit_graffiti)) {
    await a.sag('e', 'Dex ist nicht da. Mo zuckt mit den Schultern.');
    await a.sag('moFest', 'Dex ist drinnen. Zeigt seine Wand. Ist jetzt Künstler, oder so.');
  }
  await a.sag('mikaFest', m.mikaGeholfen ? '(sieht dich) Oh. Hi. Du schon wieder. Gut.' : '(leise) Hi.');
  if (m.sit_laden === 'bezahlt') await a.sag('moFest', '(leise, zu dir) Ich trink nicht. Ich halt sie nur. Wie damals.');
  await a.sag('moFest', 'Mika hat schon. Zwei Schlucke. Mika ist mutig.');
  await a.sag('e', 'Mika lacht zu laut. Die Augen sind glasig.');
  const w = await a.wahl(['„Mika, kommst du mit rein? Noor spielt gleich.“', '„Was ist da drin, Mo?“', '(Einen Schluck. Ist ja Fest.)', '(Umdrehen. Zurück zum Fest.)']);
  if (w === 2) {
    a.merke('sit_fest', 'getrunken');
    await a.blende('Eine halbe Stunde später');
    await a.sag('e', 'Es brennt im Hals. Dann wird dir warm. Dann schlecht.');
    await a.sag('e', 'Noors Trommel hörst du nur noch von weit weg.');
    await a.sag('e', 'Du verpasst den Auftritt. Den, auf den alle gewartet haben.');
    a.nachricht('Gilles', 'Wo warst du? Erste Reihe war frei. Für dich.');
  } else if (w === 3) {
    a.merke('sit_fest', 'zurueck');
    await a.sag('e', 'Du gehst. Mika schaut dir nach. Lange.');
  } else if (w === 1) {
    await a.sag('moFest', 'Wodka mit Saft. Merkt keiner.');
    await a.sag('e', '(Merkt keiner? Mika merkt es gerade. Sehr.)');
    a.merke('sit_fest', 'gefragt');
  } else {
    a.merke('sit_fest', 'mitgenommen');
    await a.sag('mikaFest', '… Echt? Mit dir?');
    await a.sag('moFest', 'Geh doch. Langweiler.');
    await a.sag('mikaFest', '(steht auf, wackelig) Ich wollte eigentlich nur nicht allein sein.');
    await a.blende('Im Hof. Die Lampions brennen.');
    await a.sag('e', 'Ihr holt Wasser. Echtes. Mika trinkt zwei Becher.');
    await a.sag('e', 'Dann spielt Noor. Gilles singt. Mika klatscht. Zu früh. Egal.');
    a.nachricht('Mika', 'Bestes Fest. Wegen dir. Echt jetzt.');
    return;
  }
  if (w === 2) return;
  // Mika geht es schlecht
  await a.sag('e', 'Mika setzt sich auf den Boden. Dann legt Mika sich hin.');
  await a.sag('mikaFest', '(lallt) Alles dreht sich … mir ist so schlecht.');
  await a.sag('moFest', 'Oh nein. Ich bin weg. Ich war nie hier.');
  await a.sag('e', 'Mo rennt. Die Flasche lässt er liegen.');
  const h = await a.wahl(['(Bei Mika bleiben. Laut nach einem Erwachsenen rufen.)', '(Zum Fest rennen. Herrn Kuedes holen.)', '(Auch gehen. Nicht dein Problem.)']);
  if (h === 2) {
    await a.sag('e', 'Du gehst ein paar Schritte. Dann bleibst du stehen.');
    await a.sag('e', 'Mika liegt da. Allein. Mit einem Bauch voller Wodka.');
    const z = await a.wahl(['(Umdrehen. Zurück zu Mika.)', '(Weitergehen.)']);
    if (z === 1) {
      await a.sag('e', 'Fernand findet Mika zehn Minuten später. Er ruft 112.');
      await a.sag('e', 'Mika geht es wieder gut. Aber es war knapp.');
      a.merke('mikaAllein');
      a.nachricht('Mika', 'Warum bist du gegangen?');
      return;
    }
  }
  await a.blende(h === 1 ? 'Eine Minute später' : 'Jemand hört dich');
  await a.sag('kaya', 'Gut, dass du da bist. Mika, hörst du mich?');
  await a.sag('mikaFest', '(murmelt) … Ja.');
  await a.sag('kaya', 'Auf die Seite. So. Nicht allein lassen. Ich bleib jetzt hier.');
  await a.sag('kaya', 'Wenn jemand nicht mehr richtig wach wird: sofort 112.');
  await a.sag('kaya', '(zu dir) Du hast heute auf jemanden aufgepasst. Das vergisst man nicht.');
  a.merke('mikaFestGeholfen');
  a.nachricht('Mika', 'Danke. Ich weiß nicht mehr viel. Aber dass du da warst.');
}

// ================= Der Spielfreund (Online-Kontakt mit Warnzeichen, Kapitel 9–10, Bushäuschen Rue du Moulin) =================
// Kein sexueller Inhalt. Es geht um die Warnzeichen: Geschenke, „privat schreiben“, Selfie, Treffen, „Erzähl es keinem“.
export const CHAT_NAMEN = { leo: 'Leo_15 · Spiel-Chat' };
export async function spiel(a) {
  await a.sag('e', 'Du sitzt im Bushäuschen. Dein Handy summt. Der Spiel-Chat.');
  await a.sag('leo', 'Hey! Du spielst echt gut. Bist du auch 15?');
  await a.sag('e', '(Leo_15. Ihr spielt seit zwei Wochen zusammen. Leo ist immer nett.)');
  await a.sag('leo', 'Ich hab dir einen Skin geschenkt. Einfach so. 🎁');
  await a.sag('leo', 'Lass uns lieber privat schreiben. Hier lesen alle mit.');
  const w = await a.wahl(['„Okay. Gib mir deine Nummer.“', '„Warum privat? Hier ist doch okay.“', '„Ich bin zwölf. Nicht fünfzehn.“', '(Nicht antworten. Handy weg.)']);
  if (w === 3) {
    await a.sag('e', 'Du steckst das Handy weg. Es summt noch zweimal.');
    await a.sag('e', '(Nicht antworten ist auch eine Antwort.)');
    const x = await a.wahl(['(Leo blockieren und melden.)', '(Später vielleicht antworten.)']);
    if (x === 0) { await spielBlock(a); return; }
    a.merke('sit_spiel', 'ignoriert');
    a.nachricht('Leo_15', 'Hallo?? Bist du sauer? 🥺');
    return;
  }
  if (w === 0) { a.merke('spielPrivat'); await a.sag('leo', 'Cool 😊 Schick mal ein Selfie. Damit ich weiß, wie du aussiehst.'); }
  if (w === 1) await a.sag('leo', 'Weil ich dir was erzählen will. Nur dir.');
  if (w === 2) { await a.sag('leo', 'Egal. Du wirkst viel älter. Reifer.'); await a.sag('e', '(Reifer. Klingt schön. Warum fühlt es sich trotzdem komisch an?)'); }
  await a.sag('leo', 'Wo gehst du zur Schule? Vielleicht wohnen wir nah.');
  await a.sag('leo', 'Wir könnten uns mal treffen. Am Bahnhof. Aber erzähl es keinem, okay?');
  await a.sag('e', '„Erzähl es keinem.“ Der Satz bleibt hängen.');
  let x = await a.wahl(['„Warum soll ich es keinem erzählen?“', '(Ein Selfie schicken. „Okay“ schreiben.)', '(Screenshot machen. Herrn Kuedes zeigen.)', '(Blockieren. Melden.)']);
  if (x === 0) {
    await a.sag('leo', 'Weil die anderen das nicht verstehen. Erwachsene machen immer Stress.');
    await a.sag('e', '(Geheimnisse und „Erwachsene machen Stress“: Das sind Warnzeichen.)');
    x = 2 + await a.wahl(['(Screenshot machen. Herrn Kuedes zeigen.)', '(Blockieren. Melden.)']);
  }
  if (x === 3) { await spielBlock(a); return; }
  if (x === 1) {
    a.merke('sit_spiel', 'geschickt');
    await a.blende('Am Abend');
    await a.sag('e', 'Leo schreibt: „Du siehst älter aus. Unser Geheimnis, ja?“');
    await a.sag('e', 'Dein Bauch zieht sich zusammen. Das fühlt sich falsch an.');
    await a.sag('e', '(Es ist nie zu spät, es jemandem zu sagen.)');
    const y = await a.wahl(['(Morgen Herrn Kuedes alles zeigen.)', '(Nichts sagen. Zu peinlich.)']);
    if (y === 1) {
      await a.sag('e', 'Du sagst nichts. Leo schreibt jeden Tag. Du schläfst schlecht.');
      await a.sag('e', '(Herr Kuedes, Tante Lisette, 116 111: Dort hört man zu.)');
      a.nachricht('Leo_15', 'Wann treffen wir uns endlich? 😊');
      return;
    }
  } else a.merke('sit_spiel', 'gezeigt');
  await spielKuedes(a);
}
async function spielBlock(a) {
  await a.sag('e', 'Blockiert. Gemeldet. Das Spiel schreibt: „Danke für deine Meldung.“');
  await a.sag('e', 'Dein Herz klopft trotzdem. Das ist normal.');
  a.merke('sit_spiel', 'blockiert');
  const z = await a.wahl(['(Trotzdem Herrn Kuedes Bescheid sagen.)', '(Fertig. Weiter.)']);
  if (z === 0) await spielKuedes(a);
}
async function spielKuedes(a) {
  await a.blende('In der SePAS');
  await a.sag('kaya', 'Danke, dass du mir das zeigst. Du hast nichts falsch gemacht.');
  await a.sag('kaya', '„Erzähl es keinem“ ist der beste Grund, es jemandem zu erzählen.');
  await a.sag('kaya', 'Wir sichern die Screenshots. Dann blockieren und melden wir. Zusammen.');
  await a.sag('kaya', 'Wer „15“ schreibt, kann viel älter sein. Das sieht man nicht.');
  await a.sag('kaya', 'Treffen mit Leuten aus dem Internet: nie allein, nie heimlich.');
  await a.sag('kaya', 'Wenn dich so was beschäftigt: 116 111. Oder BEE SECURE: 8002 1234.');
  a.merke('spielKuedes');
}

// ================= Das Dach (Ball auf dem Turnhallendach, Kapitel 8–9) =================
// Kein Mutprobe-Spiel, sondern Alltag: Der Ball liegt oben, der Container steht praktisch da. Fernand hat eine Leiter.
export async function dach(a) {
  await a.sag('e', 'Hinter der Turnhalle. Pit, ein Fuß schon auf dem Container.');
  const m = a.m();
  if (m.pitGeholfen) await a.sag('pitDach', 'Oh, du! Keine Dosen heute, versprochen. Nur ein Ball.');
  await a.sag('pitDach', 'Der Ball ist aufs Dach geflogen! Ich hol ihn. Halt mal fest.');
  await a.sag('e', 'Vom Container bis zur Dachkante: fast zwei Meter. Oben sind Glasfenster.');
  await a.sag('jana', 'Mach doch, Pit! Sonst ist der Ball weg.');
  const w = await a.wahl(['„Warte. Fernand hat eine Leiter. Ich frag ihn.“', '„Pit, runter da. Auf dem Dach ist Glas.“', '(Den Container festhalten.)', '(Zuschauen. Ist ja Pits Sache.)']);
  if (w === 2 || w === 3) {
    a.merke('sit_dach', w === 2 ? 'festgehalten' : 'zugeschaut');
    await a.blende('Zehn Sekunden später');
    await a.sag('e', 'Pit zieht sich hoch. Der Fuß rutscht. Er fällt auf den Container.');
    await a.sag('e', 'Ein dumpfer Knall. Pit hält sich den Knöchel. Lippen ganz fest.');
    await a.sag('pitDach', 'Geht schon. Geht schon … Sagt’s bloß keinem.');
    const x = await a.wahl(['„Ich hol Fernand. Das muss jemand anschauen.“', '„Okay. Wir sagen nichts.“']);
    if (x === 1) {
      await a.sag('e', 'Pit humpelt nach Hause. Am nächsten Tag kommt er mit Krücken.');
      await a.sag('e', 'Bänderriss. Der Arzt sagt: Hätte man gleich kühlen müssen.');
      a.nachricht('Pit', 'Sechs Wochen kein Sport. Egal. War meine Idee.');
      return;
    }
    await a.blende('Eine Minute später');
    await a.sag('fernand', 'Nicht aufstehen, Pit. Eis drauf. Hochlegen. So.');
    await a.sag('fernand', 'Wenn der Fuß dick wird: Arzt. Ich ruf jetzt im Sekretariat an.');
    await a.sag('pitDach', '(leise) Danke, dass du ihn geholt hast.');
    a.merke('dachGeholt');
    return;
  }
  if (w === 1) {
    await a.sag('pitDach', 'Und der Ball? Der war neu!');
    await a.sag('e', '(Ein Ball gegen einen Fuß. Oder gegen ein Glasdach. Klare Rechnung.)');
  }
  a.merke('sit_dach', 'leiter');
  await a.blende('Drei Minuten später');
  await a.sag('fernand', 'Gut, dass ihr fragt. Letztes Jahr ist einer durchs Oberlicht gebrochen.');
  await a.sag('fernand', 'Ich steig rauf. Ihr haltet die Leiter. Zu zweit.');
  await a.sag('e', 'Fernand kommt mit drei Bällen zurück. Und einem Schuh.');
  await a.sag('fernand', 'Der Schuh ist von 2019. Ich häng ihn an die Fundkiste.');
  await a.sag('pitDach', '(lacht) Okay. Leiter ist besser als Fliegen.');
  a.nachricht('Pit', 'Fernand ist eigentlich voll cool. Sag’s ihm nicht.');
}

// ================= Die Fundkiste (Kapitel 7–8, Mittagspause, Eingangshalle) =================
// Jeff „verliert jede Woche etwas“. In Wahrheit klaut ein Älterer aus seinem Rucksack, während Jeff im Lesesaal ist.
export async function fundkiste(a) {
  await a.sag('e', 'An der Fundkiste wühlt ein Älterer in einem Rucksack. Jeffs Rucksack.');
  await a.sag('tom', '(steckt etwas ein) Was guckst du?');
  await a.sag('e', 'Eine Powerbank. Mit Jeffs Aufkleber drauf. Ein Dino.');
  await a.sag('tom', 'Der verliert eh alles. Der merkt das gar nicht.');
  await a.sag('tom', 'Und du hast nix gesehen. Sonst bist du der Nächste.');
  let w = await a.wahl(['„Leg das zurück.“', '(Nicken. Weggehen.)', '„Okay.“ (Und später Herrn Kuedes Bescheid sagen.)', '„Jeff merkt das. Er sucht jede Woche.“']);
  if (w === 3) {
    await a.sag('tom', 'Der denkt, er ist schusselig. Lustig, oder?');
    await a.sag('e', '(Lustig ist das nicht. Jeff glaubt, mit ihm stimmt was nicht.)');
    w = [0, 2][await a.wahl(['„Leg das zurück.“', '(Weggehen. Später Herrn Kuedes Bescheid sagen.)'])];
  }
  if (w === 0) {
    await a.sag('tom', '(steht auf, ganz nah) Sonst was?');
    const x = await a.wahl(['(Stehen bleiben. Ruhig.) „Sonst sag ich es.“', '(Zurückweichen.)']);
    if (x === 1) { await a.sag('e', 'Du weichst zurück. Er grinst. Die Powerbank bleibt in seiner Jacke.'); w = 1; }
    else {
      await a.sag('e', 'Er ist einen Kopf größer. Deine Knie zittern. Du bleibst trotzdem.');
      await a.sag('tom', '… Pff. Nimm doch.');
      await a.sag('e', 'Er wirft die Powerbank in die Fundkiste. Und geht.');
      a.merke('sit_fundkiste', 'gesagt');
      await jeffWahrheit(a);
      a.nachricht('Unbekannt', 'Pass auf, was du sagst.');
      await a.blende('Am Abend');
      await a.sag('e', 'Dein Handy summt. Unbekannt: „Pass auf, was du sagst.“');
      await a.sag('e', '(Eine Drohung. Die gehört zu Herrn Kuedes. Nicht nachts in deinen Kopf.)');
      const y = await a.wahl(['(Herrn Kuedes die Nachricht zeigen.)', '(Für dich behalten.)']);
      if (y === 0) await kuedesFund(a);
      return;
    }
  }
  if (w === 1) {
    a.merke('sit_fundkiste', 'weg');
    await a.sag('e', 'Du gehst. Hinter dir zippt der Rucksack zu.');
    await a.blende('Am Nachmittag');
    a.nachricht('Jeff', 'Meine Powerbank ist weg 😞 Ich bin so ein Chaot.');
    await a.sag('e', 'Jeff schreibt: „Powerbank weg. Ich bin so ein Chaot.“');
    await a.sag('e', 'Du weißt, dass er kein Chaot ist.');
    const y = await a.wahl(['(Jeff die Wahrheit schreiben. Und Herrn Kuedes.)', '(Nichts tun.)']);
    if (y === 1) { await a.sag('e', 'Jeff sucht weiter. Jede Woche. Und glaubt, es liegt an ihm.'); return; }
    a.merke('fundkisteSpaet');
    await kuedesFund(a);
    await jeffWahrheit(a);
    return;
  }
  // „Okay“ – und dann zu Herrn Kuedes
  a.merke('sit_fundkiste', 'kuedes');
  await a.sag('tom', 'Gut so.');
  await a.sag('e', 'Er geht. Dein Herz rast. Du gehst direkt zur SePAS.');
  await kuedesFund(a);
  await jeffWahrheit(a);
}
async function kuedesFund(a) {
  await a.blende('In der SePAS');
  await a.sag('kaya', 'Danke. Ich kümmere mich. Niemand erfährt, von wem ich es weiß.');
  await a.sag('kaya', 'Angst vor Rache ist normal. Genau dafür gibt es uns.');
  await a.sag('kaya', 'Wenn er dir droht: sofort sagen. Du musst das nicht allein tragen.');
  a.merke('fundkisteKuedes');
}
async function jeffWahrheit(a) {
  await a.blende('Später, an der Fundkiste');
  await a.sag('jeffSit', 'Meine Powerbank! Mit dem Dino! Wo war die?');
  const x = await a.wahl(['„Jemand hat sie genommen. Du hast sie nicht verloren.“', '„In der Fundkiste.“']);
  if (x === 1) { await a.sag('jeffSit', 'Typisch ich. Ich verlier echt alles.'); await a.sag('e', '(Tust du nicht, Jeff. Aber das weiß er nicht.)'); return; }
  await a.sag('jeffSit', '… Genommen? Nicht verloren?');
  await a.sag('jeffSit', 'Ich dachte immer, ich bin so. Einer, der alles verliert.');
  await a.sag('jeffSit', 'Das stimmt ja gar nicht. Krass.');
  a.merke('fundkisteWahr');
}
