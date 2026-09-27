// ABC-Rune (Kopf, e14): öffnet Kopf-Schlösser. Bei Grün und Gelb; bei Rot verpufft sie ohne Strafe.
export default {
  id: 'abcrune', fach: 'kopf', unit: 'j1-e14', name: 'ABC-Rune', icon: 'rune', use: 'tippen',
  hint: 'Öffnet Schlösser. Nicht bei Rot.',
  effect: { puls: -12, world: 'kopfschloss', seconds: 8 },
  zones: { gruen: 1, gelb: 1, rot: 0 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.0, pit: 0.9 }, reichweite: 60, cooldown: 6,
};
