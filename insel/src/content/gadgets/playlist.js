// Playlist Runter/Auf (Aktivitäten, e13): Jukebox. Verändert Wetter, Tiere und Puls; Luc leiht sie sich aus.
export default {
  id: 'playlist', fach: 'aktivitaeten', unit: 'j1-e13', name: 'Playlist Runter/Auf', icon: 'lautsprecher', use: 'jukebox',
  hint: 'Runter oder Auf. Musik als Skill.',
  effect: { puls: -15, world: 'wetter-musik', seconds: 40 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.2, pit: 1.0 }, reichweite: 70, cooldown: 30,
};
