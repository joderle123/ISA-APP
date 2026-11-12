// Minispiel e01-leine-jolie „Leine halten“ (Kostprobe B1, Vorlage leine): Du setzt dich zur grauen Jolie. Reden hilft
// nicht, Drängen auch nicht – du bleibst. Sie dreht sich weg (loslassen), kommt zurück (halten), testet dich mit kurzen
// Sätzen (weiter halten). „Was sagen“ bringt nur „Egal.“. Eingehängt in dialogues/e01-jolie.js (Wahl „Dazusetzen“).
// Rhythmus Jolie: lange Pausen, einmal Abwenden je Welle, drei Test-Sätze; Gesten: schaut hoch, legt den Stift weg, rückt näher.
export default {
  id: 'e01-leine-jolie', template: 'leine', title: 'Leine halten', icon: 'seil', color: '#b9b4c9',
  intro: 'Halten heißt bleiben. Dreht sie sich weg? Loslassen.',
  kurz: ['Du setzt dich neben Jolie.', 'Ihr sagt beide nichts. Das ist okay.', 'Jolie rückt ein Stück näher.'],
  modes: {
    entspannt: { pause: 2, abLen: 2.2, grace: 0.9, need: 0.5, cue: true },
    abenteuer: { pause: 2.6, abLen: 1.6, grace: 0.6, need: 0.65 },
    profi: { pause: 3, ab: 2, abLen: 1.2, grace: 0.35, need: 0.8 },
  },
  medals: { bronze: { hits: 0.66 }, silber: { hits: 1 }, gold: { hits: 1, score: 0.9 }, stern: { hits: 1, score: 0.97, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    partner: 'jolie', farbe: '#8d8a99', waves: 3, ab: 1, nahLen: 0.9,
    tests: ['Du kannst ruhig gehen.', 'Ist langweilig hier, oder?', 'Hast du nichts vor?'],
    gesten: ['schaut', 'stift', 'rueckt'],
  },
};
