// Land-Art (DESIGN §12 j04): Steine setzen, die bleiben – im Spielstand und als Menhire an der Stillen Lichtung.
export default {
  id: 'j04-landart', template: 'bauen', title: 'Land-Art', icon: 'stein', color: '#b48cff',
  intro: 'Setz Steine. So bleibt es stehen.',
  medals: { bronze: { score: 0.5 }, silber: { score: 0.8 }, gold: { score: 1 } },
  story: { minMedal: 'bronze', failForward: true },
  params: { kind: 'landart', size: 7, stones: 9, at: { site: 'stilleLichtung' } },
};
