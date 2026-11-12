// Szene e11-luc-kante (DESIGN §12): Luc steht bei 90 an der Kante – „Deckel ab“, Reden prallt ab, nur die Leine hilft.
// Erste Fassung aus WP32; WP53 darf sie erweitern. Regeln: Wahlen nach Puls (4/3/2), Rückzug und Hilfe holen immer.
export default {
  id: 'e11-luc-kante', unit: 'j1-e11', cast: ['luc'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'luc', say: 'Lass mich! Der Drachen reißt gleich alles ab!', anim: 'angry',
      enter: [{ npcHitze: ['luc', 90] }],
      choices: [
        { say: 'Beruhig dich mal!', icon: 'hand', tone: 'fest', effects: [{ npcHitze: ['luc', 5] }], goto: 'a2' },
        { say: 'Was ist denn los?', icon: 'frage', tone: 'ruhig', requires: { npcHitze: ['luc', '<', 70] }, goto: 'b' },
        { label: 'Leine packen', icon: 'seil', tone: 'handlung', minigame: 'e11-tauziehen', goto: 'c' },
        { say: 'Ich bleib einfach hier.', icon: 'herz', tone: 'ruhig', goto: 'a3' },
      ],
    },
    a2: { speaker: 'luc', say: '…', anim: 'angry', goto: 'a' },
    a3: { speaker: 'luc', say: 'Dann halt. Aber halt die Leine!', anim: 'angry', goto: 'a' },
    c: { speaker: 'luc', say: 'Okay. Okay. Danke.', anim: 'calm', effects: [{ npcHitze: ['luc', -60] }, { deed: 'luc-leine' }], goto: 'b' },
    b: {
      speaker: 'luc', say: 'Die Böe kam. Und alle haben gelacht.', anim: 'sad',
      lauschen: { seconds: 4 },
      choices: [
        { say: 'Das klingt richtig mies.', icon: 'herz', effects: [{ bond: ['luc', 1] }], goto: 'd' },
        { say: 'Zeig mir das Windrad.', icon: 'windrad', goto: 'd' },
        { sign: 'nicken', label: 'Nicken', icon: 'check', goto: 'd' },
      ],
    },
    d: { speaker: 'luc', say: 'Morgen bau ich es neu. Kommst du?', anim: 'calm', end: true, effects: [{ flag: 'e11.luc-ruhig', set: true }] },
  },
};
