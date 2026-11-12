// Fixture: Satzbau aus CONTENT-SCHEMA.md
export default {
  id: 'e21-klarklang-noor', template: 'satzbau', ruleset: 'klarklang', title: 'Der Klarklang', icon: 'horn',
  slots: [
    { id: 'gefuehl', label: 'Ich fühle mich …', tiles: [{ t: 'traurig', ok: true }, { t: 'egal', ok: false }] },
    { id: 'kamera', label: 'wenn …', tiles: [{ t: 'mein Bild übermalt wird', ok: true }, { t: 'du immer alles kaputt machst', thorn: true }] },
    { id: 'grund', label: 'weil …', tiles: [{ t: 'ich drei Tage gemalt habe', ok: true }, { t: 'du fies bist', thorn: true }] },
    { id: 'wunsch', label: 'Ich wünsche mir …', tiles: [{ t: 'dass du vorher fragst', ok: true }, { t: 'dass du verschwindest', thorn: true }] },
  ],
  outcome: {
    clean: [{ npcHitze: ['saftverkaeufer', -40] }, { gate: { open: 'markt-hintertor' } }],
    thorn: [{ npcHitze: ['saftverkaeufer', +15] }],
  },
};
