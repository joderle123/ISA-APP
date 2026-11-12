// Fixture: Prüfungs-Minispiel
export default {
  id: 'e11-sturmprognose', template: 'duell', title: 'Die Sturmprognose', icon: 'blitz',
  intro: 'Welche Wolke bringt die Böe? Tipp schnell.',
  modes: { entspannt: { rounds: 5 }, abenteuer: { rounds: 8 }, profi: { rounds: 10 } },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 1 } },
};
