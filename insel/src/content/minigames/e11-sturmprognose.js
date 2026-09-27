// Minispiel e11-sturmprognose (freiwillig, Duell-Vorlage): Ereignisse auf dem Barometer einschätzen – grün, gelb, rot –
// und die Crew hinschicken. Runden und Karten aus WP36; WP53 darf ergänzen.
export default {
  id: 'e11-sturmprognose', template: 'duell', title: 'Die Sturmprognose', icon: 'blitz', color: '#8fa3ff',
  intro: 'Welche Wolke bringt die Böe? Tipp schnell.',
  modes: { entspannt: { rounds: 5, seconds: 6 }, abenteuer: { rounds: 8, seconds: 4 }, profi: { rounds: 10, seconds: 2.8 } },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 1 }, stern: { hits: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  rounds: [
    { say: 'Luc: Drachen weg, Fäuste zu, schreit.', icon: 'wolke', options: [{ t: 'Rot. Erst runter.', ok: true }, { t: 'Gelb. Reden geht.' }, { t: 'Grün. Alles gut.' }] },
    { say: 'Jolie: sitzt am Steg, atmet ruhig, lächelt.', icon: 'sonne', options: [{ t: 'Grün. Alles gut.', ok: true }, { t: 'Rot. Erst runter.' }, { t: 'Gelb. Reden geht.' }] },
    { say: 'Tun: redet schnell, zappelt, lacht schrill.', icon: 'wolke', options: [{ t: 'Gelb. Reden geht.', ok: true }, { t: 'Grün. Alles gut.' }, { t: 'Rot. Erst runter.' }] },
    { say: 'Tiago: Kiefer hart, Schultern oben, still.', icon: 'wolke', options: [{ t: 'Gelb. Reden geht.', ok: true }, { t: 'Grün. Alles gut.' }, { t: 'Rot. Erst runter.' }] },
    { say: 'Maëlle: wirft die Trommel, weint, hört nichts.', icon: 'blitz', options: [{ t: 'Rot. Erst runter.', ok: true }, { t: 'Gelb. Reden geht.' }, { t: 'Grün. Alles gut.' }] },
    { say: 'Ilda: sortiert Seile, summt.', icon: 'sonne', options: [{ t: 'Grün. Alles gut.', ok: true }, { t: 'Gelb. Reden geht.' }, { t: 'Rot. Erst runter.' }] },
    { say: 'Pit: schaut weg, Hände in den Taschen, knapp.', icon: 'wolke', options: [{ t: 'Gelb. Reden geht.', ok: true }, { t: 'Rot. Erst runter.' }, { t: 'Grün. Alles gut.' }] },
    { say: 'Mika: tritt gegen die Kiste, brüllt.', icon: 'blitz', options: [{ t: 'Rot. Erst runter.', ok: true }, { t: 'Grün. Alles gut.' }, { t: 'Gelb. Reden geht.' }] },
    { say: 'Senait: fragt viel, wippt mit dem Fuß.', icon: 'wolke', options: [{ t: 'Gelb. Reden geht.', ok: true }, { t: 'Rot. Erst runter.' }, { t: 'Grün. Alles gut.' }] },
    { say: 'Noor: malt, Musik an, nickt im Takt.', icon: 'sonne', options: [{ t: 'Grün. Alles gut.', ok: true }, { t: 'Gelb. Reden geht.' }, { t: 'Rot. Erst runter.' }] },
  ],
};
