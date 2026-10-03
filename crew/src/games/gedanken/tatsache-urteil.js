/* Spiel „Tatsache oder Urteil?“ (Thema: Gedanken & Glaubenssätze) · Vorlage T4 Bewegung im Raum · j1-e18
   Zwei Wände: Tatsache / Urteil. Sätze im Chat-Look, 10 Sekunden gehen, Stopp. Die Urteil-Wand sagt,
   welche Tatsache dahintersteckt. Mitte erlaubt und wird zuerst gefragt; wer allein steht, darf bleiben
   und nichts sagen. Blitzrunde mit drei Sätzen à 5 Sekunden. Nur die Lehrkraft tippt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const SAETZE = [
    { fig: 'mika', text: 'Ich hab die Mathe-Arbeit verhauen.', kind: 'tatsache', fact: 'Eine Arbeit, eine Note. Das ist passiert – mehr sagt der Satz nicht.' },
    { fig: 'mika', text: 'Ich bin dumm.', kind: 'urteil', fact: 'Dahinter steckt: eine schlechte Note in einem Fach. Mehr nicht.' },
    { fig: 'yara', text: 'Alle finden mich langweilig.', kind: 'urteil', fact: 'Dahinter steckt: Zwei Leute haben gestern nicht auf meine Nachricht geantwortet.' },
    { fig: 'luca', text: 'Ich hab heute dreimal zu spät auf Nachrichten geantwortet.', kind: 'tatsache', fact: 'Dreimal, heute. Zählbar. Eine Tatsache.' },
    { fig: 'sam', text: 'Keiner will mit mir in einer Gruppe sein.', kind: 'urteil', fact: 'Dahinter steckt: Bei der letzten Gruppenarbeit war ich als Letzter übrig. Einmal.' },
    { fig: 'yara', text: 'Ich hab beim Spiel zwei Tore gehalten.', kind: 'tatsache', fact: 'Zwei Tore gehalten. Steht so im Spielbericht.' },
    { fig: 'luca', text: 'Ich kann einfach nichts.', kind: 'urteil', fact: 'Dahinter steckt: Gitarre klingt nach drei Wochen noch nicht gut. Drei Wochen.' },
    { fig: 'sam', text: 'Mein Lehrer hat mich heute zweimal ermahnt.', kind: 'tatsache', fact: 'Zweimal ermahnt. Beobachtbar. Was es bedeutet, ist eine andere Frage.' },
  ];
  const BLITZ = [
    { text: 'Ich bin heute eine halbe Stunde zu spät gekommen.', kind: 'tatsache' },
    { text: 'Ich bin ein Versager.', kind: 'urteil' },
    { text: 'Niemand mag mich.', kind: 'urteil' },
    { text: 'Ich hab heute vier Stunden am Handy verbracht.', kind: 'tatsache' },
  ];
  const POS = [
    { id: 'links', label: 'Tatsache', where: 'Wand links · zählbar, beobachtbar' },
    { id: 'mitte', label: 'Unsicher', where: 'Mitte · wird zuerst gefragt' },
    { id: 'rechts', label: 'Urteil', where: 'Wand rechts · Bewertung, „immer“, „alle“, „nie“' },
  ];

  // Satz im Chat-Look, groß für den Beamer
  function chatCard(ctx, s, eyebrow) {
    const fig = CREW.games.figures[s.fig] || CREW.games.figures.mika;
    return h('div', { class: 'bigcard enter' },
      h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, eyebrow), ctx.readBtn(fig.name + ' schreibt: ' + s.text)),
      h('div', { class: 'chat-box' }, h('div', { class: 'row', style: { gap: '10px' } }, CREW.games.avatar(fig, 'neutral', 56), h('b', null, fig.name)), ctx.bubble(s.text, { who: 'Gedanke im Chat' })));
  }

  CREW.registerGame({
    id: 'tatsache-urteil',
    template: 'T4',
    icon: 'sparkle',
    themen: ['Tatsache', 'Urteil', 'Glaubenssätze'],
    safety: ['figuren', 'koerper', 'raum'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Satz am Beamer. Geh zur Wand: Tatsache oder Urteil? Mitte ist okay. Die kleinere Gruppe erklärt zuerst.',
        steps: [
          { icon: 'eye', title: 'Satz lesen', text: 'Im Chat-Look, von einer Figur.' },
          { icon: 'bolt', title: '10 Sekunden gehen', text: 'Links Tatsache, rechts Urteil, Mitte unsicher.' },
          { icon: 'chat', title: 'Urteil-Wand sagt', text: 'welche Tatsache dahintersteckt.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: chatCard(ctx, { fig: 'sam', text: 'Heute ist Dienstag.' }, 'PROBE · zählt nicht'), positions: POS, seconds: 10, question: 'Probe vorbei. Das war eine Tatsache – oder? Kurz nicken reicht.', step: 'Probe' });
        },
      });
      const saetze = ctx.rshuffle(SAETZE).slice(0, 4);
      let played = 0;
      for (let i = 0; i < saetze.length; i++) {
        const s = saetze[i];
        const r = await ctx.T.walk({
          card: chatCard(ctx, s, 'Satz ' + (i + 1) + ' von ' + saetze.length),
          positions: POS, seconds: 10, step: 'Satz ' + (i + 1),
          question: s.kind === 'urteil' ? 'Urteil-Wand: Welche Tatsache steckt wohl dahinter? Tatsache-Wand: Was hat euch überzeugt?' : 'Tatsache-Wand: Woran erkennt ihr das? Urteil-Wand: Was hat euch gestört?',
          nextLabel: 'Auflösen',
        });
        if (r === ctx.SKIP) continue;
        played++;
        // Auflösung: Figur mit Tatsache dahinter
        const w = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (s.kind === 'urteil' ? 'teamB' : 'teamA'), style: { fontSize: '1.2em' } }, s.kind === 'urteil' ? 'Urteil' : 'Tatsache')),
          ctx.figureCard({ fig: s.fig, mood: s.kind === 'urteil' ? 'neutral' : 'froh', text: s.fact, eyebrow: s.kind === 'urteil' ? 'Die Tatsache dahinter' : 'Warum Tatsache' }),
          h('p', { class: 'muted' }, 'Wer allein stand, darf bleiben und nichts sagen. Beides ist okay.'),
          CREW.ui.teacherLine('Nur „Weiter“ tippen. Nicht zählen, wer wo stand.'),
        ], { eyebrow: 'Satz ' + (i + 1) });
        await ctx.next(w, i + 1 < saetze.length ? 'Nächster Satz' : 'Blitzrunde');
      }
      // Blitzrunde: drei Sätze à 5 Sekunden
      const blitz = ctx.rshuffle(BLITZ).slice(0, 3);
      const w0 = ctx.scr([ctx.say('Blitzrunde: drei Sätze, je 5 Sekunden. Gehen, nicht rennen.', { eyebrow: 'Blitz' }), ctx.safetyLine('koerper')], { eyebrow: 'Blitzrunde', center: true });
      const go = await ctx.next(w0, 'Los!');
      if (go !== ctx.SKIP) {
        for (let i = 0; i < blitz.length; i++) {
          const b = blitz[i];
          const r = await ctx.T.walk({ card: chatCard(ctx, { fig: ['mika', 'yara', 'luca'][i], text: b.text }, 'Blitz ' + (i + 1) + '/3 · 5 Sekunden'), positions: POS, seconds: 5, step: 'Blitz ' + (i + 1), question: (b.kind === 'urteil' ? 'Urteil. ' : 'Tatsache. ') + 'Ein Satz von der kleineren Gruppe – dann weiter.', nextLabel: i + 1 < blitz.length ? 'Nächster' : 'Fertig' });
          if (r === ctx.SKIP) continue;
          played++;
        }
      }
      return { summary: 'Urteile klingen wie Tatsachen. Die Tatsache dahinter ist meistens kleiner.', stats: [[played, 'Sätze gegangen']] };
    },
  });
})();
