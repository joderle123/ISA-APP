// Minispiel e04-leine-jolie „Leine halten“ (QUELLE Schritt 7, Vorlage leine): Jolie redet nicht. Sie testet dich
// („Was willst du?“, „Geh doch.“). Wer bleibt und nicht plappert, hört danach ihren Satz. Rhythmus: etwas kürzere
// Pausen als in e01, dafür zweimal Abwenden je Welle. Eingehängt in dialogues/e04-jolie.js (Wahl „Dableiben“).
export default {
  id: 'e04-leine-jolie', template: 'leine', title: 'Leine halten', icon: 'seil', color: '#b9b4c9',
  intro: 'Halten heißt bleiben. Dreht sie sich weg? Loslassen.',
  kurz: ['Du bleibst bei Jolie.', 'Sie testet dich. Du bleibst trotzdem.', 'Dann redet sie.'],
  modes: {
    entspannt: { pause: 1.8, abLen: 2.2, grace: 0.9, need: 0.5, cue: true },
    abenteuer: { pause: 2.2, abLen: 1.6, grace: 0.6, need: 0.65 },
    profi: { pause: 2.6, ab: 2, abLen: 1.2, grace: 0.35, need: 0.8 },
  },
  medals: { bronze: { hits: 0.66 }, silber: { hits: 1 }, gold: { hits: 1, score: 0.9 }, stern: { hits: 1, score: 0.97, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    partner: 'jolie', farbe: '#8d8a99', waves: 3, ab: 1, nahLen: 0.9,
    tests: ['Was willst du?', 'Geh doch.', 'Hast du nichts Besseres vor?'],
    gesten: ['schaut', 'stift', 'rueckt'],
  },
};
