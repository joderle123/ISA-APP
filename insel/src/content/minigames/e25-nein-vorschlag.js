// Nein + Vorschlag (DESIGN §12 e25): ein klares Nein und ein konkreter Weg – dann öffnet sich der Ascheweg.
export default {
  id: 'e25-nein-vorschlag', template: 'satzbau', ruleset: 'nein-vorschlag', title: 'Nein, und ein Weg', icon: 'mut', color: '#ff4d4d',
  intro: 'Sag Nein. Und sag, was stattdessen geht.',
  slots: [
    { id: 'nein', label: 'Dein Nein:', tiles: [{ t: 'Nein, da mach ich nicht mit.', klar: true }, { t: 'Vielleicht später.', klar: false }, { t: 'Hm, keine Ahnung.', klar: false }] },
    { id: 'vorschlag', label: 'Dein Vorschlag:', tiles: [{ t: 'Wir gehen zum Krater.', konkret: true }, { t: 'Irgendwas anderes.', konkret: false }, { t: 'Du bist echt anstrengend.', thorn: true }] },
  ],
  medals: { bronze: { score: 0.5 }, silber: { score: 0.75 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
};
