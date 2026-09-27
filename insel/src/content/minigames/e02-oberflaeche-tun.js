// Minispiel e02-oberflaeche-tun „Unter der Oberfläche“ (Kostprobe B2, Vorlage oberflaeche): Tun macht Witze über den
// kaputten Akku. Unter dem Satz treibt Blau. Tippen, wenn die Farbe im Kreis ist, dann das echte Gefühl wählen:
// nicht „lustig“ (die Oberfläche), sondern „traurig“. Eingehängt in dialogues/e02-nachfragen.js (Knoten h1).
export default {
  id: 'e02-oberflaeche-tun', template: 'oberflaeche', title: 'Unter der Oberfläche', icon: 'blick', color: '#8fb6ff',
  intro: 'Tipp, wenn die Farbe im Kreis ist.',
  kurz: ['Tun lacht. Aber nur oben.', 'Darunter ist er traurig.'],
  modes: {
    entspannt: { window: 0.16, period: 3.2, duration: 22, need: 2 },
    abenteuer: { window: 0.11, period: 2.4, duration: 18, need: 3 },
    profi: { window: 0.07, period: 1.9, duration: 15, need: 4 },
  },
  medals: { bronze: { score: 0.6 }, silber: { score: 0.75 }, gold: { score: 0.9 }, stern: { score: 0.99, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    partner: 'tun', satz: 'Akku kaputt. Seitdem. Blöd, oder? Haha.', farbe: '#5b7cff', frage: 'Was fühlt Tun wirklich?',
    words: [{ t: 'lustig', farbe: '#ffd166' }, { t: 'traurig', ok: true, farbe: '#5b7cff' }, { t: 'sauer', farbe: '#ff6b6b' }],
  },
};
