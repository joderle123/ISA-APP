// Wochenaufgaben (Auftrag 20.11.: „Rewards … wie bei Fortnite“): Jedes Kapitel bringt drei kleine Aufgaben.
// Eine davon ist immer Lernen (Arbeitsblatt, Lektion oder Übungsrunde) – Lernen bringt so auch Level und Garderobe.
// Gezählt wird ab Kapitelbeginn (Startwerte werden gemerkt). Erledigt = Jetons. Nichts verfällt: Was offen bleibt, bleibt einfach offen.
const m = (S) => S.merke || {};
export const AUFGABEN = [
  { id: 'lernen', sy: '📚', t: (n) => n + '× lernen (Arbeitsblatt oder Lektion)', zahl: (S) => m(S).lernen || 0, n: [1, 2], immer: true },
  { id: 'sticker', sy: '⭐', t: (n) => n + ' Sticker im Dorf finden', zahl: (S) => (m(S).sticker || []).length, n: [2, 3] },
  { id: 'boten', sy: '📌', t: (n) => n + ' Botengang' + (n > 1 ? 'e' : '') + ' erledigen', zahl: (S) => (m(S).boten && m(S).boten.n) || 0, n: [1, 2] },
  { id: 'kicker', sy: '⚽', t: (n) => n + '× Tischkicker spielen', zahl: (S) => m(S).kicker || 0, n: [1, 2] },
  { id: 'billard', sy: '🎱', t: (n) => n + '× Billard spielen', zahl: (S) => m(S).billard || 0, n: [1] },
  { id: 'tanz', sy: '💃', t: (n) => n + '× auf der Tanzfläche tanzen', zahl: (S) => m(S).tanz || 0, n: [1, 2] },
  { id: 'dosen', sy: '🥫', t: (n) => n + '× Dosenwerfen', zahl: (S) => m(S).dosenSpiele || 0, n: [1, 2] },
  { id: 'foto', sy: '📸', t: (n) => n + ' Foto' + (n > 1 ? 's' : '') + ' machen (C)', zahl: (S) => m(S).fotos || 0, n: [1, 3] },
  { id: 'elfmeter', sy: '🥅', t: (n) => n + '× Elfmeter schießen', zahl: (S) => m(S).elfmeterSpiele || 0, n: [1] },
  { id: 'volley', sy: '🏐', t: (n) => n + '× Volleyball spielen', zahl: (S) => m(S).volleySpiele || 0, n: [1] },
  { id: 'arcade', sy: '🌵', t: (n) => n + '× Kevin rennt spielen (Jugendhaus)', zahl: (S) => m(S).kevin || 0, n: [1, 2] },
  { id: 'enten', sy: '🦆', t: () => 'Die Enten im Park beobachten', zahl: (S) => m(S).enten || 0, n: [1] },
  { id: 'eisprobe', sy: '🍦', t: (n) => n + '× Eis probieren bei Tonio (Marktplatz)', zahl: (S) => m(S).eisBesuche || 0, n: [1, 2], nurKap: [9, 10] },
  { id: 'pfuetze', sy: '💦', t: (n) => n + '× durch eine Pfütze rennen (Schulhof)', zahl: (S) => m(S).pfuetzen || 0, n: [3, 5], nurKap: [7, 8] },
  { id: 'laub', sy: '🍂', t: (n) => n + '× in einen Laubhaufen rennen (Schulhof)', zahl: (S) => m(S).laub || 0, n: [3, 5], nurKap: [3, 4] },
  { id: 'eis', sy: '⛸️', t: (n) => n + ' m auf der Eisbahn rutschen (Marktplatz)', zahl: (S) => Math.floor(m(S).eisMeter || 0), n: [100, 150], nurKap: [5, 6] },
  { id: 'tier', sy: '🐾', t: (n) => 'Dein Haustier ' + n + '× streicheln', zahl: (S) => m(S).tierStreicheln || 0, n: [2, 3], braucht: (S) => !!(S.garderobe && S.garderobe.an && S.garderobe.an.tier) },
];

// Drei Aufgaben für ein Kapitel: Lernen + zwei weitere (fest je Kapitel, damit eine Klasse dieselben hat)
export function aufgabenFuer(kap, S) {
  const r = (i) => { const x = Math.sin(kap * 97.3 + i * 13.7) * 43758.5453; return x - Math.floor(x); };
  const pool = AUFGABEN.filter((a) => !a.immer && !a.nurKap && (!a.braucht || a.braucht(S)));
  const wahl = AUFGABEN.filter((a) => a.nurKap && a.nurKap.includes(kap)).slice(0, 1);   // Jahreszeit-Aufgabe (z. B. Eisbahn im Winter) kommt sicher dran
  for (let i = 0; wahl.length < 2 && i < 40; i++) { const a = pool[Math.floor(r(i) * pool.length)]; if (!wahl.includes(a)) wahl.push(a); }
  return [AUFGABEN[0], ...wahl].map((a, i) => ({ id: a.id, n: a.n[Math.floor(r(i + 50) * a.n.length)] }));
}
// Stand: [{ id, sy, text, ist, soll, fertig }]
export function aufgabenStand(S, wo) {
  return (wo.liste || []).map((x) => { const a = AUFGABEN.find((q) => q.id === x.id); const ist = Math.max(0, a.zahl(S) - (wo.start[x.id] || 0)); return { id: x.id, sy: a.sy, text: a.t(x.n), ist: Math.min(ist, x.n), soll: x.n, fertig: ist >= x.n }; });
}
