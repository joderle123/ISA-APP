// Muschel-Mäxchen (DESIGN §14): Würfel-Bluffspiel gegen eine Figur. Jede Figur hat ihren Tell (Tun grinst einseitig),
// im Profi-Modus subtiler. Im Baumhaus und in der Taverne; die Figur kommt aus params.partner oder dem Gespräch.
export default {
  id: 'muschel-maexchen', template: 'wuerfel', title: 'Muschel-Mäxchen', icon: 'muschel', color: '#39d0c8',
  intro: 'Würfeln, ansagen, bluffen. Wer zweifelt, sagt: Zeig!',
  medals: { bronze: { score: 0.5 }, silber: { score: 0.75 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { partner: 'tun', shells: 3 },
};
