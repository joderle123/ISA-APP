// Zähl-Laterne (Kopf, e14): öffnet Kopf-Schlösser. Bei Grün und Gelb; bei Rot verpufft sie ohne Strafe.
export default {
  id: 'zaehllaterne', fach: 'kopf', unit: 'j1-e14', name: 'Zähl-Laterne', icon: 'laterne', use: 'tippen',
  hint: 'Öffnet Schlösser. Nicht bei Rot.',
  effect: { puls: -12, world: 'kopfschloss', seconds: 8 },
  zones: { gruen: 1, gelb: 1, rot: 0 },
  perSave: [0.7, 1.3], npcFit: { luc: 0.9, pit: 1.1 }, reichweite: 60, cooldown: 6,
};
