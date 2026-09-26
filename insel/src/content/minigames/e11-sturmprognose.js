// Minispiel e11-sturmprognose (freiwillig, Duell-Vorlage): Ereignisse auf dem Barometer einschätzen. Erste Fassung
// (WP31); WP36/WP53 füllen Runden und Karten.
export default {
  id: 'e11-sturmprognose', template: 'duell', title: 'Die Sturmprognose', icon: 'blitz',
  intro: 'Welche Wolke bringt die Böe? Tipp schnell.',
  modes: { entspannt: { rounds: 5 }, abenteuer: { rounds: 8 }, profi: { rounds: 10 } },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 1 } },
  story: { minMedal: 'bronze', failForward: true },
};
