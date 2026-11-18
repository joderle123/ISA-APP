// Annexe Junglinster – der Schul-Pass: Abzeichen für Pause, Entdecken und Story (Qualitätsrunde, Kritik „Gründe zum Erkunden“).
// Jedes Abzeichen prüft nur den Spielstand (S) – keine neuen Zähler nötig. Gesperrte zeigen einen Hinweis statt des Titels.
const m = (S) => S.merke || {};
export const ABZEICHEN = [
  // Pause und offene Welt
  { id: 'korb3', sy: '🏀', t: 'Korbjäger', hinweis: '3 von 5 Freiwürfen am Hof', test: (S) => (m(S).korbRekord || 0) >= 3 },
  { id: 'dreier', sy: '🎯', t: 'Von draußen', hinweis: '2 Dreier in einer Runde', test: (S) => (m(S).dreierRekord || 0) >= 2 },
  { id: 'horse', sy: '🐴', t: 'Ben geschlagen', hinweis: 'H-O-R-S-E gegen Ben gewinnen', test: (S) => (m(S).horseSiege || 0) >= 1 },
  { id: 'skate', sy: '🛹', t: 'Skate-Ecke', hinweis: '5 Punkte auf dem Brett', test: (S) => (m(S).skateRekord || 0) >= 5 },
  { id: 'tt', sy: '🏓', t: 'Tischtennis-Ass', hinweis: '5 Bälle zurückspielen', test: (S) => (m(S).ttRekord || 0) >= 5 },
  { id: 'takt', sy: '🥁', t: 'Im Takt', hinweis: 'Mit Ayla über 80 % im Takt', test: (S) => (m(S).bandRekord || 0) >= 80 },
  { id: 'lesen', sy: '📚', t: 'Leseratte', hinweis: '3 Hefte in der Lese-Ecke lesen', test: (S) => (m(S).gelesen || []).length >= 3 },
  { id: 'snack', sy: '🍫', t: 'Snack-Profi', hinweis: 'Der Automat kennt dich', test: (S) => (m(S).automat || 0) >= 3 },
  { id: 'kevin', sy: '🌵', t: 'Kevins Freund', hinweis: 'Gieß die Pflanzen. Oft.', test: (S) => (m(S).gegossen || 0) > 3 },
  { id: 'pinn', sy: '📌', t: 'Gut informiert', hinweis: 'Die Pinnwand dreimal lesen', test: (S) => (m(S).pinnwand || 0) >= 3 },
  { id: 'entdeck5', sy: '🔭', t: 'Entdecker', hinweis: '5 geheime Orte finden', test: (S) => (S.entdeckt || []).length >= 5 },
  // Menschen
  { id: 'freund', sy: '🤝', t: 'Echte Freundschaft', hinweis: 'Mit jemandem richtig befreundet sein', test: (S) => Object.values(S.freund || {}).some((p) => p >= 60) },
  { id: 'viele', sy: '💬', t: 'Kennt alle', hinweis: 'Mit 8 Leuten aus der Klasse reden', test: (S) => Object.keys(S.herz || {}).length >= 8 },
  { id: 'staerken', sy: '💪', t: 'Stark', hinweis: '20 Stärken zeigen', test: (S) => Object.values(S.staerken || {}).reduce((a, b) => a + b, 0) >= 20 },
  // Story (nur Dinge, die man bewusst tut – nie für „richtige“ Antworten)
  { id: 'lupe', sy: '🔍', t: 'Detektivblick', hinweis: 'Gefühle lesen mit nur einem Hinweis', test: (S) => Object.values(S.sz || {}).some((r) => (r.lupen || 0) >= 1) },
  { id: 'bremse', sy: '🛑', t: 'Erst bremsen', hinweis: 'Ein Fake-Video nicht teilen', test: (S) => !!m(S).videoGebremst },
  { id: 'fall', sy: '🕵️', t: 'Fall gelöst', hinweis: 'Die Spur von links unten bis zum Ende verfolgen', test: (S) => !!m(S).spurGeloest },
  { id: 'kap5', sy: '⭐', t: 'Halbzeit', hinweis: '5 Kapitel geschafft', test: (S) => (S.kapitelFertig || 0) >= 5 },
  { id: 'jahr', sy: '🎓', t: '7ème geschafft', hinweis: 'Alle 10 Kapitel', test: (S) => (S.kapitelFertig || 0) >= 10 },
];

// Neue Abzeichen finden (gibt die neu verdienten zurück und merkt sie im Spielstand)
export function neuePassAbzeichen(S) {
  S.pass = S.pass || [];
  const neu = ABZEICHEN.filter((a) => !S.pass.includes(a.id) && (() => { try { return a.test(S); } catch (e) { return false; } })());
  neu.forEach((a) => S.pass.push(a.id));
  return neu;
}
