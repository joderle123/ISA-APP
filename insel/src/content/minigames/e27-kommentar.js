// Kommentar-Lampen (DESIGN §12 e27): welcher Kommentar darf leuchten? Fies bleibt hängen, sachlich und freundlich tragen.
export default {
  id: 'e27-kommentar', template: 'satzbau', ruleset: 'kommentar', title: 'Die Kommentar-Lampe', icon: 'sprechblase', color: '#ff8ccf',
  intro: 'Bau einen Kommentar, der leuchten darf.',
  slots: [
    { id: 'start', label: 'Unter Yaras Video:', tiles: [{ t: 'Cooler Schnitt.', tone: 'freundlich' }, { t: 'Peinlich.', tone: 'fies' }, { t: 'Okay.', tone: 'leer' }] },
    { id: 'dann', label: '… und dann:', tiles: [{ t: 'Der Ton ist etwas leise.', tone: 'sachlich' }, { t: 'Lösch das lieber.', tone: 'fies' }, { t: 'Ich mag die Farben.', tone: 'freundlich' }] },
  ],
  medals: { bronze: { score: 0.5 }, silber: { score: 0.75 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
};
