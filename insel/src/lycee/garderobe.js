// Garderobe: Belohnungen zum Anziehen und ein Haustier, das mitläuft (Auftrag 20.11.: „Rewards … Skins, Schuhe, Kappen,
// Brillen, ein Haustier … damit sie Motivation haben – so in etwa wie bei Fortnite“).
// Alles wird durch Nebenaufgaben VERDIENT: keine Zufallskisten, kein Geld, nichts auf Zeit, nichts geht verloren.
// Gesperrte Dinge zeigen, wie man sie bekommt (Ziel statt Glück). Jedes Teil prüft nur den Spielstand.
const m = (S) => S.merke || {};
import { pokaleVon } from './pokale.js';
const pokale = (S) => pokaleVon(S).length;
const herzen = (S, ab) => Object.values(S.herz || {}).filter((h) => h >= ab).length;

export const ARTEN = [['kopf', '🧢 Kopf'], ['haar', '💇 Haarfarbe'], ['brille', '🕶️ Brille'], ['oben', '👕 Oberteil'], ['schuhe', '👟 Schuhe'], ['fahrt', '🛹 Brett & Trotti'], ['tier', '🐾 Haustier'], ['ruecken', '🎒 Rücken'], ['spur', '✨ Spur'], ['emote', '🙌 Emotes']];

export const GARDEROBE = [
  // Kopf
  { id: 'k_start', art: 'kopf', wert: 'cap', farbe: '#2fb8a8', sy: '🧢', name: 'Cap „Annexe 7P2“', hinweis: 'Geschenk zum Schulstart', test: () => true },
  { id: 'k_beanie', art: 'kopf', wert: 'muetze', farbe: '#2b2f4a', sy: '🧶', name: 'Skate-Beanie', hinweis: 'Im Tischkicker gewinnen', test: (S) => (m(S).kickerSiege || 0) >= 1 },
  { id: 'k_bucket', art: 'kopf', wert: 'bucket', farbe: '#e9c46a', sy: '👒', name: 'Fischerhut „Weiher“', hinweis: 'Foto-Bingo: 5 Motive knipsen', test: (S) => (m(S).fotoBingo || []).length >= 5 },
  { id: 'k_kopfhoerer', art: 'kopf', wert: 'kopfhoerer', farbe: '#ff7ac8', sy: '🎧', name: 'Kopfhörer „Bass“', hinweis: 'Tanzfläche: 2000 Punkte', test: (S) => (m(S).tanzRekord || 0) >= 2000 },
  { id: 'k_propeller', art: 'kopf', wert: 'propeller', farbe: '#5ec8ff', sy: '🚁', name: 'Propellermütze', hinweis: 'S-K-A-T-E im Skatepark komplett', test: (S) => (m(S).skate5 || '').length >= 5 },
  { id: 'k_cap_gold', art: 'kopf', wert: 'cap', farbe: '#ffd166', sy: '🧢', name: 'Goldene Cap', hinweis: '16 Sticker im Dorf finden', test: (S) => (m(S).sticker || []).length >= 16 },
  { id: 'k_billard', art: 'kopf', wert: 'cap', farbe: '#151515', sy: '🎱', name: 'Cap „8-Ball“', hinweis: 'Im Billard einmal gewinnen', test: (S) => (m(S).billardSiege || 0) >= 1 },
  { id: 'k_bommel', art: 'kopf', wert: 'muetze', farbe: '#e0384f', sy: '⛸️', name: 'Wollmütze „Eisbahn“', hinweis: 'Im Winter 300 m auf der Eisbahn rutschen', test: (S) => (m(S).eisMeter || 0) >= 300 },
  { id: 'k_sommerhut', art: 'kopf', wert: 'bucket', farbe: '#ff9ecb', sy: '🍦', name: 'Sommerhut „Tutti Frutti“', hinweis: 'Im Sommer alle 6 Eissorten bei Tonio probieren', test: (S) => (m(S).eisSorten || []).length >= 6 },
  { id: 'k_ohren', art: 'kopf', wert: 'ohren', farbe: '#ff7ac8', sy: '🐱', name: 'Katzenohren', hinweis: 'Dein Haustier 20× streicheln', test: (S) => (m(S).tierStreicheln || 0) >= 20 },
  { id: 'k_dino', art: 'kopf', wert: 'dino', farbe: '#4caf50', sy: '🦖', name: 'Dino-Kapuze', hinweis: 'Fußball auf dem Stade: 10 Tore', test: (S) => (m(S).tore || 0) >= 10 },
  { id: 'k_einhorn', art: 'kopf', wert: 'einhorn', farbe: '#b197fc', sy: '🦄', name: 'Einhorn-Haarreif', hinweis: 'In 5 Kapiteln alle Wochenaufgaben', test: (S) => (m(S).wochenVoll || 0) >= 5 },
  { id: 'k_entdecker', art: 'kopf', wert: 'bucket', farbe: '#c8a26a', sy: '🧭', name: 'Entdeckerhut', hinweis: 'Linas Schnitzeljagd durchs Dorf schaffen', test: (S) => !!(m(S).jagd && m(S).jagd.fertig) },
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
  { id: 'o_kicker', art: 'oben', wert: '#1f4fa8', sy: '🏆', name: 'Trikot „Kicker-Champion“', hinweis: 'Im Kicker 3 verschiedene Leute schlagen', test: (S) => (m(S).kickerBesiegt || []).length >= 3 },
  { id: 'o_billard', art: 'oben', wert: '#151515', sy: '🎱', name: 'Weste „Billard-Profi“', hinweis: 'Im Billard 3 verschiedene Leute schlagen', test: (S) => (m(S).billardBesiegt || []).length >= 3 },
  { id: 'o_kaktus', art: 'oben', wert: '#3f9a4a', sy: '🌵', name: 'Shirt „Kevin der Kaktus“', hinweis: 'Spielautomat: 500 Punkte bei Kevin rennt', test: (S) => (m(S).kevinRekord || 0) >= 500 },
  // Schuhe
  { id: 's_rot', art: 'schuhe', wert: '#d6452f', sy: '👟', name: 'Sneaker „Feuer“', hinweis: '8 Sticker finden', test: (S) => (m(S).sticker || []).length >= 8 },
  { id: 's_neon', art: 'schuhe', wert: '#39ff14', sy: '💚', name: 'Sneaker „Neon“', hinweis: 'Tanzfläche: 3 Sterne', test: (S) => (m(S).tanzSterne || 0) >= 3 },
  { id: 's_weiss', art: 'schuhe', wert: '#f4f4f0', sy: '🤍', name: 'Sneaker „Weiß“', hinweis: '2 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 2 },
  { id: 's_gold', art: 'schuhe', wert: '#ffd166', sy: '✨', name: 'Sneaker „Gold“', hinweis: 'Foto-Bingo komplett (9 Motive)', test: (S) => (m(S).fotoBingo || []).length >= 9 },
  // Brett und Trottinette (Farbe beim nächsten Aufsteigen)
  { id: 'f_neon', art: 'fahrt', ziel: 'deck', wert: '#ff3fa4', sy: '🛹', name: 'Brett „Neon“', hinweis: '8 Sticker finden', test: (S) => (m(S).sticker || []).length >= 8 },
  { id: 'f_lila', art: 'fahrt', ziel: 'deck', wert: '#8e5cf7', sy: '🛹', name: 'Brett „Lila“', hinweis: 'S-K-A-T-E im Skatepark komplett', test: (S) => (m(S).skate5 || '').length >= 5 },
  { id: 'f_orange', art: 'fahrt', ziel: 'trotti', wert: '#ff9f1c', sy: '🛴', name: 'Trottinette „Orange“', hinweis: 'Alle 8 Botengänge schaffen', test: (S) => { const b = m(S).boten; return !!b && Object.keys(b.best || {}).length >= 8; } },
  { id: 'f_feuer', art: 'fahrt', ziel: 'deck', wert: '#e8432b', sy: '🔥', name: 'Brett „Feuer“', hinweis: 'Zeitrennen auf dem Brett unter 75 s', test: (S) => !!m(S).renn_brett && m(S).renn_brett < 75 },
  { id: 'f_trotti_mint', art: 'fahrt', ziel: 'trotti', wert: '#7fd4b0', sy: '🛴', name: 'Trottinette „Minze“', hinweis: 'Zeitrennen mit der Trottinette fahren', test: (S) => !!m(S).renn_trotti },
  // Haustiere (laufen mit)
  { id: 't_ratte', art: 'tier', wert: 'ratte', farbe: '#9a9a9e', sy: '🐀', name: 'Ratte „Krümel“', hinweis: 'Im Jugendhaus 2-mal Tischkicker spielen', test: (S) => (m(S).kicker || 0) >= 2 },
  { id: 't_frettchen', art: 'tier', wert: 'frettchen', farbe: '#d9c3a0', sy: '🦡', name: 'Frettchen „Flitzer“', hinweis: '3 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 3 },
  { id: 't_igel', art: 'tier', wert: 'igel', farbe: '#7a5a3a', sy: '🦔', name: 'Igel „Stachel“', hinweis: 'Im Park am Weiher die Enten beobachten', test: (S) => (m(S).enten || 0) >= 1 },
  { id: 't_hamster', art: 'tier', wert: 'hamster', farbe: '#e8b070', sy: '🐹', name: 'Hamster „Pommes“', hinweis: '5 Botengänge im Dorf', test: (S) => ((m(S).boten && m(S).boten.n) || 0) >= 5 },
  { id: 't_schildkroete', art: 'tier', wert: 'schildkroete', farbe: '#5f8a4a', sy: '🐢', name: 'Schildkröte „Turbo“', hinweis: 'S-K-A-T-E auf Zeit: unter 45 Sekunden', test: (S) => !!m(S).skate5Rekord && m(S).skate5Rekord < 45 },
  { id: 't_wiesel', art: 'tier', wert: 'wiesel', farbe: '#a0673a', sy: '🦦', name: 'Wiesel „Blitz“', hinweis: 'Schnitzeljagd: 3 Zettel von Lina finden', test: (S) => ((m(S).jagd && m(S).jagd.i) || 0) >= 3 },
  { id: 't_eichhoernchen', art: 'tier', wert: 'eichhoernchen', farbe: '#c0602a', sy: '🐿️', name: 'Eichhörnchen „Nussi“', hinweis: 'Im Herbst 5× in den Laubhaufen springen', test: (S) => (m(S).laub || 0) >= 5 },
  { id: 't_kaetzchen', art: 'tier', wert: 'kaetzchen', farbe: '#e9a23b', sy: '🐱', name: 'Kätzchen „Mimi“', hinweis: 'Hund Bonbon 5× besuchen', test: (S) => (m(S).hundBesuche || 0) >= 5 },
  // Haarfarbe (über die eigene Frisur): Pokale, Jahreszeiten-Spiele
  { id: 'h_pink', art: 'haar', wert: '#ff6fb5', sy: '🩷', name: 'Haare „Pink“', hinweis: '2 Pokale im Jugendhaus-Regal', test: (S) => pokale(S) >= 2 },
  { id: 'h_blau', art: 'haar', wert: '#3f7fff', sy: '💙', name: 'Haare „Blau“', hinweis: '4 Pokale im Jugendhaus-Regal', test: (S) => pokale(S) >= 4 },
  { id: 'h_gruen', art: 'haar', wert: '#35c27a', sy: '💚', name: 'Haare „Grün“', hinweis: 'Im Herbst 10× in den Laubhaufen', test: (S) => (m(S).laub || 0) >= 10 },
  { id: 'h_lila', art: 'haar', wert: '#9b5cf7', sy: '💜', name: 'Haare „Lila“', hinweis: '7 Herausforderungen von Freund:innen', test: (S) => ((m(S).hf && m(S).hf.fertig) || []).length >= 7 },
  { id: 'h_platin', art: 'haar', wert: '#efe6cf', sy: '🤍', name: 'Haare „Platin“', hinweis: 'Im Winter einen Schneemann bauen', test: (S) => (m(S).schneemann || 0) >= 1 },
  { id: 'h_feuer', art: 'haar', wert: '#e2462e', sy: '❤️‍🔥', name: 'Haare „Feuerrot“', hinweis: '7 Pokale im Jugendhaus-Regal', test: (S) => pokale(S) >= 7 },
  // Spur (spur.js): erscheint beim Rennen, Fahren und Rutschen
  { id: 'sp_funken', art: 'spur', wert: 'funken', sy: '✨', name: 'Spur „Funken“', hinweis: '3 Wochenaufgaben schaffen', test: (S) => (m(S).wochenGesamt || 0) >= 3 },
  { id: 'sp_herzen', art: 'spur', wert: 'herzen', sy: '💖', name: 'Spur „Herzen“', hinweis: 'Dein Haustier 10× streicheln', test: (S) => (m(S).tierStreicheln || 0) >= 10 },
  { id: 'sp_sterne', art: 'spur', wert: 'sterne', sy: '⭐', name: 'Spur „Sterne“', hinweis: 'In einem Kapitel alle 3 Wochenaufgaben', test: (S) => (m(S).wochenVoll || 0) >= 1 },
  { id: 'sp_schnee', art: 'spur', wert: 'schnee', sy: '❄️', name: 'Spur „Schneeflocken“', hinweis: 'Im Winter 600 m auf der Eisbahn rutschen', test: (S) => (m(S).eisMeter || 0) >= 600 },
  { id: 'sp_regenbogen', art: 'spur', wert: 'regenbogen', sy: '🌈', name: 'Spur „Regenbogen“', hinweis: '10× lernen (Arbeitsblatt oder Lektion)', test: (S) => (m(S).lernen || 0) >= 10 },
  // Rücken (ruecken.js): Rucksäcke und mehr, am Rücken der Figur
  { id: 'r_schul', art: 'ruecken', wert: 'rucksack', farbe: '#2fb8a8', sy: '🎒', name: 'Rucksack „Annexe“', hinweis: 'Geschenk zum Schulstart', test: () => true },
  { id: 'r_teddy', art: 'ruecken', wert: 'teddy', farbe: '#e85d75', sy: '🧸', name: 'Teddy im Rucksack', hinweis: 'Mit 4 Leuten richtig befreundet (4 Herzen)', test: (S) => herzen(S, 4) >= 4 },
  { id: 'r_gitarre', art: 'ruecken', wert: 'gitarre', farbe: '#1d1f24', sy: '🎸', name: 'Gitarrenkoffer', hinweis: 'Im Jugendhaus 3× die Musik wechseln', test: (S) => (m(S).musikGewechselt || 0) >= 3 },
  { id: 'r_skate', art: 'ruecken', wert: 'skate', farbe: '#ff3fa4', sy: '🛹', name: 'Brett auf dem Rücken', hinweis: 'Skate-Ecke: 15 Punkte', test: (S) => (m(S).skateRekord || 0) >= 15 },
  { id: 'r_panzer', art: 'ruecken', wert: 'panzer', farbe: '#5f8a4a', sy: '🐢', name: 'Schildkrötenpanzer', hinweis: 'Tischtennis 3-mal gewinnen', test: (S) => (m(S).ttSiege || 0) >= 3 },
  { id: 'r_rakete', art: 'ruecken', wert: 'rakete', farbe: '#d6452f', sy: '🚀', name: 'Spielzeug-Rakete', hinweis: 'Kevin rennt: 1000 Punkte', test: (S) => (m(S).kevinRekord || 0) >= 1000 },
  { id: 'r_fluegel', art: 'ruecken', wert: 'fluegel', farbe: '#f7f4ee', sy: '🪽', name: 'Flügel', hinweis: 'In 3 Kapiteln alle Wochenaufgaben', test: (S) => (m(S).wochenVoll || 0) >= 3 },
  // Emotes (Emote-Rad, Taste X oder Knopf 🙌): kurze Gesten und Tänze. Vier gibt es von Anfang an, der Rest wird verdient.
  { id: 'e_winken', art: 'emote', wert: 'winken', sy: '👋', name: 'Winken', hinweis: 'Von Anfang an (auch Taste H)', test: () => true },
  { id: 'e_jubeln', art: 'emote', wert: 'jubeln', sy: '🎉', name: 'Jubeln', hinweis: 'Von Anfang an (auch Taste J)', test: () => true },
  { id: 'e_tanzen', art: 'emote', wert: 'tanzen', sy: '🕺', name: 'Tanzen', hinweis: 'Von Anfang an (auch Taste K)', test: () => true },
  { id: 'e_zucken', art: 'emote', wert: 'zucken', sy: '🤷', name: 'Schulterzucken', hinweis: 'Von Anfang an', test: () => true },
  { id: 'e_daumen', art: 'emote', wert: 'daumen', sy: '👍', name: 'Daumen hoch', hinweis: '5 Leuten zuwinken (Taste H)', test: (S) => (m(S).gewunken || 0) >= 5 },
  { id: 'e_klatschen', art: 'emote', wert: 'klatschen', sy: '👏', name: 'Klatschen', hinweis: 'Einen Botengang im Dorf schaffen', test: (S) => ((m(S).boten && m(S).boten.n) || 0) >= 1 },
  { id: 'e_denken', art: 'emote', wert: 'denken', sy: '🤔', name: 'Nachdenken', hinweis: '5× lernen (Arbeitsblatt oder Lektion)', test: (S) => (m(S).lernen || 0) >= 5 },
  { id: 'e_herz', art: 'emote', wert: 'herz', sy: '🫶', name: 'Herz-Hände', hinweis: 'Mit 2 Leuten richtig befreundet (4 Herzen)', test: (S) => herzen(S, 4) >= 2 },
  { id: 'e_sieger', art: 'emote', wert: 'sieger', sy: '🙌', name: 'Sieger-Pose', hinweis: 'Einen Pokal im Jugendhaus gewinnen', test: (S) => pokale(S) >= 1 },
  { id: 'e_facepalm', art: 'emote', wert: 'facepalm', sy: '🤦', name: 'Facepalm', hinweis: 'Kevin rennt: 100 Punkte', test: (S) => (m(S).kevinRekord || 0) >= 100 },
  { id: 'e_verbeugen', art: 'emote', wert: 'verbeugen', sy: '🙇', name: 'Verbeugung', hinweis: 'Tischtennis einmal gewinnen', test: (S) => (m(S).ttSiege || 0) >= 1 },
  { id: 'e_roboter', art: 'emote', wert: 'roboter', sy: '🤖', name: 'Roboter-Tanz', hinweis: 'Tanzfläche: 1000 Punkte', test: (S) => (m(S).tanzRekord || 0) >= 1000 },
  { id: 'e_gitarre', art: 'emote', wert: 'gitarre', sy: '🎸', name: 'Luftgitarre', hinweis: 'Im Jugendhaus die Musik wechseln', test: (S) => (m(S).musikGewechselt || 0) >= 1 },
  { id: 'e_winken2', art: 'emote', wert: 'winken2', sy: '🙋', name: 'Beide Arme winken', hinweis: '5 verschiedene Emotes zeigen', test: (S) => (m(S).emoteArten || []).length >= 5 },
];

// Dorf-Level (wie ein Pass – aber kostenlos, ohne Zeitlimit): zählt ALLE je verdienten Jetons, auch fürs Lernen (Arbeitsblätter,
// Lektionen). Jedes zweite Level bringt ein Teil für die Garderobe.
export const LEVEL_AB = [0, 4, 9, 15, 22, 30, 39, 49, 60, 72, 85, 99, 114, 130, 147];
export function levelVon(gesamt = 0) {
  let l = 1; while (l < LEVEL_AB.length && gesamt >= LEVEL_AB[l]) l++;
  const naechste = LEVEL_AB[l] ?? null;
  return { level: l, max: LEVEL_AB.length, naechste, fehlt: naechste == null ? 0 : naechste - gesamt, anteil: naechste == null ? 1 : (gesamt - LEVEL_AB[l - 1]) / (naechste - LEVEL_AB[l - 1]) };
}
const lv = (S) => levelVon(S.jetonsGesamt || 0).level;
// Kurs-Missionen (REAL TALK ↔ Spiel, kursmission.js): jede geschaffte Mission bringt ihr Teil – fest, nicht zufällig
import KURS from './kurs-missionen.json';
for (const [heft, liste] of Object.entries(KURS.hefte)) for (const [i, k] of liste.entries()) {
  GARDEROBE.push({ id: 'km_' + k.code, ...k.item, name: k.belohnung, hinweis: 'Mission „' + k.titel + '“ (REAL TALK #' + heft + ', Stunde ' + (i + 1) + ')',
    test: (S) => !!(S.merke && S.merke.km && S.merke.km.fertig && S.merke.km.fertig[k.code]) });
}
GARDEROBE.push(
  { id: 'l_brett_gold', art: 'fahrt', ziel: 'deck', wert: '#ffd166', sy: '✨', name: 'Brett „Gold“', hinweis: 'Dorf-Level 11', level: 11, test: (S) => lv(S) >= 11 },
  { id: 'l_trotti_eis', art: 'fahrt', ziel: 'trotti', wert: '#9fe3ff', sy: '❄️', name: 'Trottinette „Eisblau“', hinweis: 'Dorf-Level 14', level: 14, test: (S) => lv(S) >= 14 },
  { id: 'l_cap_rot', art: 'kopf', wert: 'cap', farbe: '#d6452f', sy: '🧢', name: 'Cap „Rot“', hinweis: 'Dorf-Level 2', level: 2, test: (S) => lv(S) >= 2 },
  { id: 'l_retro', art: 'brille', wert: null, farbe: '#b5651d', sy: '👓', name: 'Retro-Brille', hinweis: 'Dorf-Level 3', level: 3, test: (S) => lv(S) >= 3 },
  { id: 'l_schwarz', art: 'schuhe', wert: '#2b2b33', sy: '🖤', name: 'Sneaker „Schwarz“', hinweis: 'Dorf-Level 4', level: 4, test: (S) => lv(S) >= 4 },
  { id: 'l_navy', art: 'oben', wert: '#2b3a55', sy: '🔵', name: 'Hoodie „Navy“', hinweis: 'Dorf-Level 5', level: 5, test: (S) => lv(S) >= 5 },
  { id: 'l_bandana', art: 'kopf', wert: 'bandana', farbe: '#e85d75', sy: '🎀', name: 'Bandana', hinweis: 'Dorf-Level 6', level: 6, test: (S) => lv(S) >= 6 },
  { id: 'l_pink', art: 'schuhe', wert: '#ff7ac8', sy: '💗', name: 'Sneaker „Pink“', hinweis: 'Dorf-Level 7', level: 7, test: (S) => lv(S) >= 7 },
  { id: 'l_minze', art: 'oben', wert: '#7fd4b0', sy: '🌿', name: 'Hoodie „Minze“', hinweis: 'Dorf-Level 8', level: 8, test: (S) => lv(S) >= 8 },
  { id: 'l_vogel', art: 'tier', wert: 'wellensittich', farbe: '#7CFC9A', sy: '🦜', name: 'Wellensittich „Pieps“', hinweis: 'Dorf-Level 9', level: 9, test: (S) => lv(S) >= 9 },
  { id: 'l_stirnband', art: 'kopf', wert: 'stirnband', farbe: '#ffd166', sy: '🏅', name: 'Stirnband „Gold“', hinweis: 'Dorf-Level 10', level: 10, test: (S) => lv(S) >= 10 },
  { id: 'l_sunset', art: 'oben', wert: '#ff8c42', sy: '🌅', name: 'Jacke „Sonnenuntergang“', hinweis: 'Dorf-Level 12', level: 12, test: (S) => lv(S) >= 12 },
  { id: 'l_goldbrille', art: 'brille', wert: 'sonne', farbe: '#ffd166', sy: '😎', name: 'Goldene Sonnenbrille', hinweis: 'Dorf-Level 13', level: 13, test: (S) => lv(S) >= 13 },
  { id: 'l_krone', art: 'kopf', wert: 'krone', farbe: '#b197fc', sy: '👑', name: 'Krone „Level 15“', hinweis: 'Dorf-Level 15 (höchstes)', level: 15, test: (S) => lv(S) >= 15 },
);

// Fortschritt für gesperrte Teile („3/5“) wie bei großen Spielen: [ist, soll]. Nur zählbare Ziele – Zeitrennen
// und Einmal-Dinge (Igel, Schneemann, Trottinette-Rennen) haben keinen Balken.
const anz = (v) => (Array.isArray(v) ? v.length : typeof v === 'string' ? v.length : +v || 0);
const Zf = (feld, soll) => (S) => [anz(m(S)[feld]), soll];
const botenN = (S) => (m(S).boten && m(S).boten.n) || 0, botenOrte = (S) => Object.keys((m(S).boten && m(S).boten.best) || {}).length;
const hfN = (S) => ((m(S).hf && m(S).hf.fertig) || []).length;
const FORT = {
  k_entdecker: (S) => [(m(S).jagd && m(S).jagd.i) || 0, 6], k_ohren: Zf('tierStreicheln', 20), k_dino: Zf('tore', 10), k_einhorn: Zf('wochenVoll', 5),
  k_beanie: Zf('kickerSiege', 1), k_bucket: Zf('fotoBingo', 5), k_kopfhoerer: Zf('tanzRekord', 2000), k_propeller: Zf('skate5', 5), k_cap_gold: Zf('sticker', 16), k_billard: Zf('billardSiege', 1), k_bommel: Zf('eisMeter', 300), k_sommerhut: Zf('eisSorten', 6), k_krone: Zf('sticker', 24),
  b_sonne: (S) => [botenN(S), 3], b_herz: (S) => [herzen(S, 4), 3], b_sport: Zf('elfmeterRekord', 4), b_stern: Zf('dosenRekord', 6),
  o_jugendhaus: (S) => [(m(S).kicker || 0) + (m(S).tanz || 0), 3], o_galaxie: (S) => [botenOrte(S), 8], o_trikot: Zf('volleyRekord', 10), o_gold: (S) => [hfN(S), 5], o_kicker: Zf('kickerBesiegt', 3), o_billard: Zf('billardBesiegt', 3), o_kaktus: Zf('kevinRekord', 500),
  s_rot: Zf('sticker', 8), s_neon: Zf('tanzSterne', 3), s_weiss: (S) => [hfN(S), 2], s_gold: Zf('fotoBingo', 9),
  f_neon: Zf('sticker', 8), f_lila: Zf('skate5', 5), f_orange: (S) => [botenOrte(S), 8],
  t_wiesel: (S) => [(m(S).jagd && m(S).jagd.i) || 0, 3], t_eichhoernchen: Zf('laub', 5), t_kaetzchen: Zf('hundBesuche', 5),
  t_ratte: Zf('kicker', 2), t_frettchen: (S) => [hfN(S), 3], t_hamster: (S) => [botenN(S), 5],
  h_pink: (S) => [pokale(S), 2], h_blau: (S) => [pokale(S), 4], h_gruen: Zf('laub', 10), h_lila: (S) => [hfN(S), 7], h_feuer: (S) => [pokale(S), 7],
  sp_funken: Zf('wochenGesamt', 3), sp_herzen: Zf('tierStreicheln', 10), sp_sterne: Zf('wochenVoll', 1), sp_schnee: Zf('eisMeter', 600), sp_regenbogen: Zf('lernen', 10),
  r_teddy: (S) => [herzen(S, 4), 4], r_gitarre: Zf('musikGewechselt', 3), r_skate: Zf('skateRekord', 15), r_panzer: Zf('ttSiege', 3), r_rakete: Zf('kevinRekord', 1000), r_fluegel: Zf('wochenVoll', 3),
  e_daumen: Zf('gewunken', 5), e_klatschen: (S) => [botenN(S), 1], e_denken: Zf('lernen', 5), e_herz: (S) => [herzen(S, 4), 2], e_sieger: (S) => [pokale(S), 1], e_facepalm: Zf('kevinRekord', 100), e_verbeugen: Zf('ttSiege', 1), e_roboter: Zf('tanzRekord', 1000), e_gitarre: Zf('musikGewechselt', 1), e_winken2: Zf('emoteArten', 5),
};
for (const g of GARDEROBE) if (g.level) FORT[g.id] = (S) => [S.jetonsGesamt || 0, LEVEL_AB[g.level - 1]];
export function fortschritt(id, S) {
  const f = FORT[id]; if (!f) return null;
  try { const [ist, soll] = f(S); return [Math.max(0, Math.min(Math.floor(ist), soll)), soll]; } catch (e) { return null; }
}

export const freigeschaltet = (S) => GARDEROBE.filter((g) => { try { return g.test(S); } catch (e) { return false; } }).map((g) => g.id);
