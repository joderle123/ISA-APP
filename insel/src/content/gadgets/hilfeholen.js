// Hilfe holen (Menschen, e15, Notfall-Slot): eine erwachsene Figur kommt, die Szene pausiert, Puls −50. Immer verfügbar.
export default {
  id: 'hilfeholen', fach: 'menschen', unit: 'j1-e15', name: 'Hilfe holen', icon: 'hilfe', use: 'notfall',
  hint: 'Jemand Erwachsenes kommt. Immer.',
  effect: { puls: -50 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [1, 1], reichweite: 100, cooldown: 0,
};
