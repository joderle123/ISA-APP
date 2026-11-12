// Rückwärts-Planer (DESIGN §12 j09): Vorbereitungen vom Prüfungstag rückwärts in den Kalender legen; Selbsttest-Bojen
// schlagen bloßes Lesen.
export default {
  id: 'j09-planer', template: 'bauen', title: 'Der Rückwärts-Planer', icon: 'kalender', color: '#ffd166',
  intro: 'Leg die Karten rückwärts vom Prüfungstag aus.',
  medals: { bronze: { score: 0.5 }, silber: { score: 0.8 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    kind: 'planer', exam: 'Bootsführerschein', days: 5,
    cards: [
      { t: 'Regeln einmal lesen', day: 5, kind: 'lesen' },
      { t: 'Selbsttest: Bojen', day: 4, kind: 'selbsttest' },
      { t: 'Knoten üben', day: 3, kind: 'packen' },
      { t: 'Selbsttest: Karte', day: 2, kind: 'selbsttest' },
      { t: 'Früh schlafen', day: 1, kind: 'ruhe' },
      { t: 'Prüfung fahren', day: 0, kind: 'fragen' },
    ],
  },
};
