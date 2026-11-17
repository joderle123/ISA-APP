// Annexe Junglinster – Freundschaften (Auftrag 17.11.: „verschiedene Charaktere … anfreunden durch Konversationen und andere
// Interaktionen, die messbar sind … mit welchen Freunden man am meisten befreundet ist, bekommt eine wichtigere Rolle“).
//
// Messbar: Freundschaftspunkte 0–100 je Person (S.freund) und die Gründe als Zähler (S.freundGrund): Gespräche, tiefe
// Gespräche, Entscheidungen, zusammen gespielt, geteilt. Daraus: Stufe (Bekannt → Kumpel → Freund → Enge Freundschaft) und
// ein Freundes-Profil (mit welchen Typen sich die Spielerin / der Spieler anfreundet) – im Journal sichtbar, gut für ein
// Gespräch mit der Fachkraft. Rolle: Die engsten Freunde begrüßen dich am Kapitelanfang, schreiben dir am Kapitelende,
// spielen mit dir Tischtennis. Keine Familiendaten, keine echten Personen.

export const STUFEN = [
  { ab: 0, name: 'Bekannt' },
  { ab: 20, name: 'Kumpel' },
  { ab: 45, name: 'Freund' },
  { ab: 75, name: 'Enge Freundschaft' },
];
export const stufe = (p) => { let s = STUFEN[0]; for (const x of STUFEN) if ((p || 0) >= x.ab) s = x; return s.name; };

export const GRUENDE = { kennen: 'kennengelernt', gespraech: 'Gespräche', tief: 'tiefe Gespräche', wahl: 'Entscheidungen', spiel: 'zusammen gespielt', teilen: 'geteilt' };

// Charaktere der Mitschülerinnen und Mitschüler: Typ, Hobby, was sie mögen, Eigenschaften (für das Freundes-Profil)
export const CHARAKTER = {
  noah: { typ: 'Der Neue', hobby: 'Serien, Fenster zählen', mag: 'ruhige Ecken, Leute, die fragen', eig: ['schüchtern', 'vorsichtig'] },
  mila: { typ: 'Die Tüftlerin', hobby: 'Zauberwürfel, Muster', mag: 'Regeln, Stille, klare Ansagen', eig: ['ruhig', 'denkt anders'] },
  lina: { typ: 'Die Zeichnerin', hobby: 'Comics zeichnen', mag: 'Leute, die nicht drängen', eig: ['still', 'kreativ'] },
  jo: { typ: 'Der Laute', hobby: 'Autos, Werkstatt am Samstag', mag: 'Tempo, ehrliche Ansagen', eig: ['laut', 'impulsiv'] },
  ben: { typ: 'Der Spaßvogel', hobby: 'Korbball, Witze', mag: 'Lachen, Pausen', eig: ['witzig', 'sportlich'] },
  chiara: { typ: 'Die Ehrgeizige', hobby: 'Lampen und Regale bauen', mag: 'Pläne, gute Noten', eig: ['ehrgeizig', 'handwerklich'] },
  yusuf: { typ: 'Der Ruhige', hobby: 'Judo', mag: 'Zeit zum Nachdenken', eig: ['ruhig', 'sportlich'] },
  ayla: { typ: 'Die Musikerin', hobby: 'Bass in einer Band', mag: 'Musik, kleine Runden', eig: ['musikalisch', 'unsicher'] },
  luca: { typ: 'Der Harte', hobby: 'Kochen (heimlich)', mag: 'Respekt, gutes Essen', eig: ['rebellisch', 'hilfsbereit'] },
  kenan: { typ: 'Der Handwerker', hobby: 'Holz, Werkstatt', mag: 'Genauigkeit, Ehrlichkeit', eig: ['handwerklich', 'rebellisch'] },
  dario: { typ: 'Der Treue', hobby: 'Handy, Fußball', mag: 'seine Leute', eig: ['loyal', 'witzig'] },
};
export const GLEICHALTRIGE = Object.keys(CHARAKTER);

// Begrüßung durch den besten Freund / die beste Freundin am Anfang eines neuen Kapitels
export const GRUSS = {
  noah: 'Da bist du ja. Ich hab extra gewartet.',
  mila: 'Neue Woche. Gleicher Platz? Gut.',
  lina: '(winkt mit dem Stift) Hi.',
  jo: 'Na endlich. Ohne dich ist es langweilig.',
  ben: 'Hast du zwei Euro? … Spaß. Schön, dass du da bist.',
  chiara: 'Ich hab einen Plan für die Woche. Du bist drin.',
  yusuf: 'Hm. Morgen. (nickt)',
  ayla: 'Ich hab einen neuen Song gelernt. Später?',
  luca: 'Na. Alles klar bei dir?',
  kenan: 'Morgen. Zweimal messen heute.',
  dario: 'Alles gut? Ehrlich jetzt?',
};

// Nachricht am Ende eines Kapitels (je nach Kapitel)
const ENDE = {
  1: 'Erster Tag geschafft. Morgen wieder?',
  2: 'Die Woche war lang. Gut, dass du da warst.',
  3: 'Schnuppertag überlebt. Du warst gut.',
  4: 'Du hast heute Nein gesagt. Respekt.',
  5: 'Krasse Woche. Wir halten zusammen, oder?',
  6: 'Kleine Schritte. Du machst das echt gut.',
  7: 'Erste Arbeitswoche! Erzähl mir alles.',
};
const ZUSATZ = { noah: ' 🙂', mila: ' (Rekord: 38 Sekunden.)', lina: ' (Ich hab dich gezeichnet.)', jo: ' 💪', ben: ' 😂', chiara: ' Plan steht.', yusuf: '', ayla: ' 🎵', luca: '', kenan: '', dario: ' Alles gut.' };
export const nachricht = (id, kap) => (ENDE[kap] || 'Bis morgen.') + (ZUSATZ[id] || '');

// Freundes-Profil: Eigenschaften gewichtet mit den Freundschaftspunkten → die drei häufigsten
export function profil(freund = {}) {
  const w = {};
  for (const [id, p] of Object.entries(freund)) {
    const c = CHARAKTER[id]; if (!c || p < 20) continue;
    for (const e of c.eig) w[e] = (w[e] || 0) + p;
  }
  return Object.entries(w).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([e]) => e);
}
