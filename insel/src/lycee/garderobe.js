// Garderobe: Belohnungen zum Anziehen und ein Haustier, das mitläuft (Auftrag 20.11.: „Rewards … Skins, Schuhe, Kappen,
// Brillen, ein Haustier … damit sie Motivation haben – so in etwa wie bei Fortnite“).
// Alles wird durch Nebenaufgaben VERDIENT: keine Zufallskisten, kein Geld, nichts auf Zeit, nichts geht verloren.
// Gesperrte Dinge zeigen, wie man sie bekommt (Ziel statt Glück). Jedes Teil prüft nur den Spielstand.
const m = (S) => S.merke || {};
const herzen = (S, ab) => Object.values(S.herz || {}).filter((h) => h >= ab).length;

export const ARTEN = [['kopf', '🧢 Kopf'], ['brille', '🕶️ Brille'], ['oben', '👕 Oberteil'], ['schuhe', '👟 Schuhe'], ['tier', '🐾 Haustier']];

export const GARDEROBE = [
  // Kopf
  { id: 'k_beanie', art: 'kopf', wert: 'muetze', farbe: '#2b2f4a', sy: '🧶', name: 'Skate-Beanie', hinweis: 'Kim im Tischkicker schlagen', test: (S) => (m(S).kickerSiege || 0) >= 1 },
  { id: 'k_bucket', art: 'kopf', wert: 'bucket', farbe: '#e9c46a', sy: '👒', name: 'Fischerhut „Weiher“', hinweis: 'Foto-Bingo: 5 Motive knipsen', test: (S) => (m(S).fotoBingo || []).length >= 5 },
  { id: 'k_kopfhoerer', art: 'kopf', wert: 'kopfhoerer', farbe: '#ff7ac8', sy: '🎧', name: 'Kopfhörer „Bass“', hinweis: 'Tanzfläche: 2000 Punkte', test: (S) => (m(S).tanzRekord || 0) >= 2000 },
  { id: 'k_propeller', art: 'kopf', wert: 'propeller', farbe: '#5ec8ff', sy: '🚁', name: 'Propellermütze', hinweis: 'S-K-A-T-E im Skatepark komplett', test: (S) => (m(S).skate5 || '').length >= 5 },
  { id: 'k_cap_gold', art: 'kopf', wert: 'cap', farbe: '#ffd166', sy: '🧢', name: 'Goldene Cap', hinweis: '16 Sticker im Dorf finden', test: (S) => (m(S).sticker || []).length >= 16 },
  { id: 'k_krone', art: 'kopf', wert: 'krone', farbe: '#ffd23f', sy: '👑', name: 'Krone „Dorf-Legende“', hinweis: 'Alle 24 Sticker finden', test: (S) => (m(S).sticker || []).length >= 24 },
  // Brillen
  { id: 'b_sonne', art: 'brille', wert: 'sonne', farbe: '#1b1f27', sy: '🕶️', name: 'Sonnenbrille', hinweis: '3 Botengänge im Dorf', test: (S) => ((m(S).boten && m(S).boten.n) || 0) >= 3 },
  { id: 'b_herz', art: 'brille', wert: 'herz', farbe: '#e85d75', sy: '💗', name: 'Herzbrille', hinweis: 'Mit 3 Leuten richtig befreundet (4 Herzen)', test: (S) => herzen(S, 4) >= 3 },
  { id: 'b_sport', art: 'brille', wert: 'sport', farbe: '#ff9f1c', sy: '🥽', name: 'Sportbrille', hinweis: 'Elfmeter: 4 von 5 Toren', test: (S) => (m(S).elfmeterRekord || 0) >= 4 },
  { id: 'b_stern', art: 'brille', wert: 'stern', farbe: '#b197fc', sy: '⭐', name: 'Sternbrille', hinweis: 'Dosenwerfen: alle sechs abräumen', test: (S) => (m(S).dosenRekord || 0) >= 6 },
  // Oberteile (Skins)
  { id: 'o_jugendhaus', art: 'oben', wert: '#2fb8a8', sy: '🟩', name: 'Hoodie „Jugendhaus“', hinweis: 'Im Jugendhaus 3-mal Kicker oder Tanz', test: (S) => (m(S).kicker || 0) + (m(S).tanz || 0) >= 3 },
  { id: 'o_neon', art: 'oben', wert: '#39ff14', sy: '⚡', name: 'Shirt „Neon“', hinweis: 'Zeitrennen auf dem Brett unter 60 s', test: (S) => !!m(S).renn_brett && m(S).renn_brett < 60 },
  { id: 'o_galaxie', art: 'oben', wert: '#4b2f8a', sy: '🌌', name: 'Hoodie „Galaxie“', hinweis: 'Alle 8 Botengänge schaffen', test: (S) => { const b = m(S).boten; return !!b && Object.keys(b.best || {}).length >= 8; } },
  { id: 'o_trikot', art: 'oben', wert: '#c0392b', sy: '⚽', name: 'Trikot „Stade Annexe“', hinweis: 'Volleyball: 10 Ballwechsel', test: (S) => (m(S).volleyRekord || 0) >= 10 },
  { id: 'o_gold', art: 'oben', wert: '#e0b43c', sy: '🏆', name: 'Jacke „Gold“', hinweis: '5 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 5 },
  // Schuhe
  { id: 's_rot', art: 'schuhe', wert: '#d6452f', sy: '👟', name: 'Sneaker „Feuer“', hinweis: '8 Sticker finden', test: (S) => (m(S).sticker || []).length >= 8 },
  { id: 's_neon', art: 'schuhe', wert: '#39ff14', sy: '💚', name: 'Sneaker „Neon“', hinweis: 'Tanzfläche: 3 Sterne', test: (S) => (m(S).tanzSterne || 0) >= 3 },
  { id: 's_weiss', art: 'schuhe', wert: '#f4f4f0', sy: '🤍', name: 'Sneaker „Weiß“', hinweis: '2 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 2 },
  { id: 's_gold', art: 'schuhe', wert: '#ffd166', sy: '✨', name: 'Sneaker „Gold“', hinweis: 'Foto-Bingo komplett (9 Motive)', test: (S) => (m(S).fotoBingo || []).length >= 9 },
  // Haustiere (laufen mit)
  { id: 't_ratte', art: 'tier', wert: 'ratte', farbe: '#9a9a9e', sy: '🐀', name: 'Ratte „Krümel“', hinweis: 'Kim im Jugendhaus: 2-mal Kicker spielen', test: (S) => (m(S).kicker || 0) >= 2 },
  { id: 't_frettchen', art: 'tier', wert: 'frettchen', farbe: '#d9c3a0', sy: '🦡', name: 'Frettchen „Flitzer“', hinweis: '3 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 3 },
  { id: 't_igel', art: 'tier', wert: 'igel', farbe: '#7a5a3a', sy: '🦔', name: 'Igel „Stachel“', hinweis: 'Im Park am Weiher die Enten beobachten', test: (S) => (m(S).enten || 0) >= 1 },
  { id: 't_hamster', art: 'tier', wert: 'hamster', farbe: '#e8b070', sy: '🐹', name: 'Hamster „Pommes“', hinweis: '5 Botengänge im Dorf', test: (S) => ((m(S).boten && m(S).boten.n) || 0) >= 5 },
  { id: 't_schildkroete', art: 'tier', wert: 'schildkroete', farbe: '#5f8a4a', sy: '🐢', name: 'Schildkröte „Turbo“', hinweis: 'S-K-A-T-E auf Zeit: unter 45 Sekunden', test: (S) => !!m(S).skate5Rekord && m(S).skate5Rekord < 45 },
];

export const freigeschaltet = (S) => GARDEROBE.filter((g) => { try { return g.test(S); } catch (e) { return false; } }).map((g) => g.id);
