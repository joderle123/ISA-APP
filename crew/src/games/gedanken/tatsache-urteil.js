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
    { fig: 'mika', text: 'Ich bin dumm.', kind: 'urteil', umbau: { fair: 'Die Mathe-Arbeit lief schlecht. In Bio war ich gut.', urteil: 'In Mathe bin ich halt ein hoffnungsloser Fall.', schoen: 'Ich bin der Klügste der ganzen Schule.' }, fact: 'Dahinter steckt: eine schlechte Note in einem Fach. Mehr nicht.' },
    { fig: 'yara', text: 'Alle finden mich langweilig.', kind: 'urteil', umbau: { fair: 'Zwei haben gestern nicht geantwortet. Sam schreibt mir oft.', urteil: 'Die meisten finden mich wohl langweilig.', schoen: 'Alle lieben mich. Die sind nur schüchtern.' }, fact: 'Dahinter steckt: Zwei Leute haben gestern nicht auf meine Nachricht geantwortet.' },
    { fig: 'luca', text: 'Ich hab heute dreimal zu spät auf Nachrichten geantwortet.', kind: 'tatsache', fact: 'Dreimal, heute. Zählbar. Eine Tatsache.' },
    { fig: 'sam', text: 'Keiner will mit mir in einer Gruppe sein.', kind: 'urteil', umbau: { fair: 'Einmal war ich übrig. Beim Projekt davor wollte Yara mich dabeihaben.', urteil: 'Ich bin immer übrig. Das ist halt so.', schoen: 'Alle reißen sich darum, mit mir in der Gruppe zu sein.' }, fact: 'Dahinter steckt: Bei der letzten Gruppenarbeit war ich als Letzter übrig. Einmal.' },
    { fig: 'yara', text: 'Ich hab beim Spiel zwei Tore gehalten.', kind: 'tatsache', fact: 'Zwei Tore gehalten. Steht so im Spielbericht.' },
    { fig: 'luca', text: 'Ich kann einfach nichts.', kind: 'urteil', umbau: { fair: 'Gitarre klappt nach drei Wochen noch nicht. Drei Wochen sind kurz.', urteil: 'Ich bin einfach unbegabt.', schoen: 'Ich kann alles. Üben muss ich nie.' }, fact: 'Dahinter steckt: Gitarre klingt nach drei Wochen noch nicht gut. Drei Wochen.' },
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

  const LEVELS = ['Einordnen', 'Dahinter', 'Umbauen'];
  /* Level 3: drei Ecken für umgebaute Sätze */
  const ECKEN = [
    { id: 'links', label: 'Fair', where: 'Wand links · stimmt und ist freundlich' },
    { id: 'mitte', label: 'Noch Urteil', where: 'Mitte · klingt anders, urteilt aber noch' },
    { id: 'rechts', label: 'Schöngeredet', where: 'Wand rechts · zu schön, um wahr zu sein' },
  ];
  const ECKE_TEXT = {
    fair: { label: 'Fair', pill: 'teamA', t: 'Fair: Der Satz bleibt bei den Tatsachen und lässt Platz für mehr. So redet die freundliche Stimme.' },
    urteil: { label: 'Noch Urteil', pill: '', t: 'Immer noch ein Urteil: „halt“, „immer“, „einfach“ machen aus einem Moment ein Etikett.' },
    schoen: { label: 'Schöngeredet', pill: 'teamB', t: 'Schöngeredet: Klingt gut, glaubt aber keiner – auch die Figur nicht. Darum hilft es nicht.' },
  };

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
        rule: 'Ein Satz am Beamer. Geh zur Wand: Tatsache oder Urteil? Mitte ist okay. Später baut ihr Urteile in faire Sätze um.',
        levels: LEVELS,
        steps: [
          { icon: 'bolt', title: 'Einordnen', text: 'Links Tatsache, rechts Urteil, Mitte unsicher.' },
          { icon: 'eye', title: 'Dahinter', text: 'Welche Tatsache steckt im Urteil?' },
          { icon: 'sparkle', title: 'Umbauen', text: 'Fair, noch Urteil oder schöngeredet?' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: chatCard(ctx, { fig: 'sam', text: 'Heute ist Dienstag.' }, 'PROBE · zählt nicht'), positions: POS, seconds: 10, question: 'Probe vorbei. Das war eine Tatsache – oder? Kurz nicken reicht.', step: 'Probe' });
        },
      });
      // Level 1: eine Tatsache + ein Urteil gemischt. Level 2: zwei Urteile, erst sammeln, dann Tatsache. Level 3: ein Urteil umbauen.
      const urteile = ctx.rshuffle(SAETZE.filter((x) => x.kind === 'urteil'));
      const l1 = ctx.rshuffle([ctx.rpick(SAETZE.filter((x) => x.kind === 'tatsache')), urteile[0]]);
      const l2 = urteile.slice(1, 3);
      const l3 = urteile[3] || urteile[0];
      const saetze = l1.concat(l2);
      let played = 0, umgebaut = 0;
      for (let i = 0; i < saetze.length; i++) {
        const s = saetze[i];
        const L = i < 2 ? 1 : 2;
        if (i === 2) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt kommen nur noch Urteile. Nach dem Gehen sammelt jede Ecke: Welche Tatsache könnte dahinterstecken?' });
        const r = await ctx.T.walk({
          card: chatCard(ctx, s, 'Satz ' + (i + 1) + ' von ' + saetze.length),
          positions: POS, seconds: 10, step: 'Satz ' + (i + 1), badge: ctx.stufe(L, LEVELS),
          question: L === 2 ? 'Jede Gruppe sammelt: Was ist wohl wirklich passiert? Eine kleine, zählbare Sache.' : s.kind === 'urteil' ? 'Urteil-Wand: Woran erkennt ihr das Urteil? Tatsache-Wand: Was hat euch überzeugt?' : 'Tatsache-Wand: Woran erkennt ihr das? Urteil-Wand: Was hat euch gestört?',
          nextLabel: 'Auflösen',
        });
        if (r === ctx.SKIP) continue;
        played++;
        // Auflösung: Figur mit Tatsache dahinter
        const w = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (s.kind === 'urteil' ? 'teamB' : 'teamA'), style: { fontSize: '1.2em' } }, s.kind === 'urteil' ? 'Urteil' : 'Tatsache')),
          ctx.figureCard({ fig: s.fig, mood: s.kind === 'urteil' ? 'neutral' : 'froh', text: s.fact, eyebrow: s.kind === 'urteil' ? 'Die Tatsache dahinter' : 'Warum Tatsache' }),
          L === 2 ? h('p', { class: 'muted' }, 'Lag eure Vermutung nah dran? Die Tatsache ist fast immer kleiner als das Urteil.') : h('p', { class: 'muted' }, 'Wer allein stand, darf bleiben und nichts sagen. Beides ist okay.'),
          CREW.ui.teacherLine('Nur „Weiter“ tippen. Nicht zählen, wer wo stand.'),
        ], { eyebrow: 'Satz ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
        await ctx.next(w, i + 1 < saetze.length ? 'Nächster Satz' : 'Weiter');
      }
      // Level 3: Umbauen – drei umgebaute Sätze, drei Ecken
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Ein Urteil, drei neue Sätze. Geht in die Ecke: Ist der neue Satz fair, noch ein Urteil oder schöngeredet?' });
      const fig3 = CREW.games.figures[l3.fig];
      const umbauten = ctx.rshuffle(['fair', 'urteil', 'schoen']);
      for (let j = 0; j < umbauten.length; j++) {
        const k = umbauten[j];
        const card = h('div', { class: 'bigcard enter' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Umbau ' + (j + 1) + '/3 · ' + fig3.name + ' dachte: „' + l3.text + '“'), ctx.readBtn('Neuer Satz: ' + l3.umbau[k])),
          h('p', { class: 'say' }, '„' + l3.umbau[k] + '“'));
        const r = await ctx.T.walk({ card, positions: ECKEN, seconds: 10, step: 'Umbau ' + (j + 1), badge: ctx.stufe(3, LEVELS), question: 'Jede Ecke sagt einen Satz: Warum steht ihr hier?', nextLabel: 'Auflösen' });
        if (r === ctx.SKIP) continue;
        played++; umgebaut++;
        const e = ECKE_TEXT[k];
        const w = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + e.pill, style: { fontSize: '1.2em' } }, e.label)),
          ctx.figureCard({ fig: l3.fig, mood: k === 'fair' ? 'froh' : 'neutral', text: e.t, eyebrow: '„' + l3.umbau[k] + '“' }),
          k === 'fair' ? h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Die freundliche Stimme“')) : null,
        ], { eyebrow: 'Umbau ' + (j + 1), badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w, j + 1 < umbauten.length ? 'Nächster Umbau' : 'Blitzrunde');
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
      return { summary: 'Urteile klingen wie Tatsachen. Die Tatsache dahinter ist meistens kleiner – und ein fairer Satz hilft mehr als ein schöner.', stats: [[played, 'Sätze gegangen'], [umgebaut, 'Umbauten geprüft']] };
    },
  });
})();
