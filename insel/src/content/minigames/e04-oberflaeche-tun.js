// Minispiel e04-oberflaeche-tun „Unter der Oberfläche“ (QUELLE Schritt 3, Vorlage oberflaeche): Tun sitzt auf dem
// Nest-Dach und reißt einen Witz über das Leck. Unter dem Satz treibt ein dunkles Blau. Das feine Wort ist nicht
// „lustig“ und nicht „sauer“, sondern „gekränkt“. Eingehängt in dialogues/e04-tun.js (Wahl „Genau hinsehen“).
export default {
  id: 'e04-oberflaeche-tun', template: 'oberflaeche', title: 'Unter der Oberfläche', icon: 'blick', color: '#8fb6ff',
  intro: 'Tipp, wenn die Farbe im Kreis ist.',
  kurz: ['Tun macht einen Witz.', 'Darunter ist er gekränkt.'],
  modes: {
    entspannt: { window: 0.16, period: 3.2, duration: 22, need: 2 },
    abenteuer: { window: 0.11, period: 2.4, duration: 18, need: 3 },
    profi: { window: 0.07, period: 1.9, duration: 15, need: 4 },
  },
  medals: { bronze: { score: 0.6 }, silber: { score: 0.75 }, gold: { score: 0.9 }, stern: { score: 0.99, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    partner: 'tun', satz: 'Ist doch egal, Kapitän Titanic. Haha.', farbe: '#3f5fd6', frage: 'Was fühlt Tun wirklich?',
    words: [{ t: 'lustig', farbe: '#ffd166' }, { t: 'gekränkt', ok: true, farbe: '#3f5fd6' }, { t: 'sauer', farbe: '#ff6b6b' }],
  },
};
