// Rollentausch (DESIGN §12 e03): dein Bild wird dunkel, Jolie führt dich mit Stimme (Stereo) und sichtbaren Lichtpunkten.
export default {
  id: 'e03-rollentausch', template: 'lotsen', title: 'Im Dunkeln folgen', icon: 'laterne', color: '#39d0c8',
  intro: 'Folge der Stimme. Und den Lichtern.',
  modes: { entspannt: { count: 5, spacing: 6 }, abenteuer: { count: 6, spacing: 7 }, profi: { count: 8, spacing: 8 } },
  medals: { bronze: { score: 0.3 }, silber: { score: 0.7 }, gold: { score: 0.95 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { mode: 'folgen', guide: 'jolie' },
};
