// Der Klarklang (DESIGN §12 e21, Beispiel aus CONTENT-SCHEMA): vier Slots, Dornen klingen dissonant und prallen ab.
export default {
  id: 'e21-klarklang-noor', template: 'satzbau', ruleset: 'klarklang', title: 'Der Klarklang', icon: 'horn', color: '#b06bff',
  intro: 'Vier Teile, ein Ton. Dornen klingen schief.',
  slots: [
    { id: 'gefuehl', label: 'Ich fühle mich …', tiles: [{ t: 'traurig', ok: true }, { t: 'egal', ok: false }, { t: 'sauer', ok: true }] },
    { id: 'kamera', label: 'wenn …', tiles: [{ t: 'mein Bild übermalt wird', ok: true }, { t: 'du immer alles kaputt machst', thorn: true }] },
    { id: 'grund', label: 'weil …', tiles: [{ t: 'ich drei Tage gemalt habe', ok: true }, { t: 'du fies bist', thorn: true }] },
    { id: 'wunsch', label: 'Ich wünsche mir …', tiles: [{ t: 'dass du vorher fragst', ok: true }, { t: 'dass du verschwindest', thorn: true }] },
  ],
  medals: { bronze: { score: 0.5 }, silber: { score: 0.75 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  outcome: {
    clean: [{ npcHitze: ['noor', -40] }, { flag: 'e21.klarklang', set: true }],
    thorn: [{ npcHitze: ['noor', 15] }],
  },
};
