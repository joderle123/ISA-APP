/* Spiel „Deal oder kein Deal“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T6 Beamer-Gruppe · j1-e24
   Zwei Figuren wollen Verschiedenes. Die Crew teilt sich in Team A und Team B. Jedes Team sieht verdeckt,
   was seine Figur WIRKLICH braucht (Team-iPad per QR-Code mit Rolle A/B – oder am Lehrer-iPad mit
   „Nur Team A schaut“). 90 Sekunden Verhandlung, jede Seite muss mindestens eine Frage stellen, bevor sie
   den Deal nennt. Die Lehrkraft tippt den Deal einmal, beide Figuren reagieren. „Beide okay“ wird gefeiert.
   Keine Hände zählen, nur Weiter. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FAELLE = [
    {
      title: 'Musik laut vs. lernen',
      A: { fig: 'mika', will: 'will Musik laut hören – jetzt, im gemeinsamen Zimmer.', braucht: 'Mika braucht nach dem Stress in der Schule 20 Minuten Abschalten. Es muss nicht laut sein – es muss NUR Mika gehören.' },
      B: { fig: 'yara', will: 'will in Ruhe lernen – morgen ist die Arbeit.', braucht: 'Yara braucht Ruhe bis 18 Uhr. Danach ist es egal. Yara hat Angst, die Arbeit zu verhauen, und sagt das nicht.' },
      deals: [
        { id: 'both', label: 'Bis 18 Uhr Kopfhörer, danach darf Mika laut – beide okay', both: true },
        { id: 'a', label: 'Mika hört laut, Yara geht in die Küche', both: false, winner: 'A' },
        { id: 'b', label: 'Mika hört gar nichts, bis Yara fertig ist', both: false, winner: 'B' },
        { id: 'none', label: 'Kein Deal, Tür zu', both: false },
      ],
    },
    {
      title: 'Freunde vs. Geschwister-Geburtstag',
      A: { fig: 'luca', will: 'will Samstag zu den Freunden ins Freibad.', braucht: 'Luca braucht das Gefühl, dazuzugehören: Die Clique plant das seit Wochen. Zwei Stunden würden Luca reichen.' },
      B: { fig: 'sam', will: 'will, dass Luca den ganzen Samstag beim Geburtstag der kleinen Schwester ist.', braucht: 'Sam (großer Bruder) braucht Hilfe beim Aufbau am Vormittag und jemanden, der beim Kuchen da ist. Der Nachmittag ist frei.' },
      deals: [
        { id: 'both', label: 'Vormittag Aufbau und Kuchen, Nachmittag Freibad – beide okay', both: true },
        { id: 'a', label: 'Luca geht den ganzen Tag ins Freibad', both: false, winner: 'A' },
        { id: 'b', label: 'Luca bleibt den ganzen Tag zuhause', both: false, winner: 'B' },
        { id: 'none', label: 'Kein Deal, Streit', both: false },
      ],
    },
    {
      title: 'Gruppenchat-Regeln',
      A: { fig: 'yara', will: 'will, dass im Klassenchat auch nachts geschrieben werden darf.', braucht: 'Yara braucht den Chat abends, weil Yara da erst Zeit hat (Training bis 21 Uhr). Nachts um 2 ist Yara selbst egal.' },
      B: { fig: 'mika', will: 'will den Chat ab 20 Uhr komplett stumm.', braucht: 'Mika braucht Schlaf: Das Handy brummt nachts, und Mika traut sich nicht, es auszuschalten, aus Angst, etwas zu verpassen.' },
      deals: [
        { id: 'both', label: 'Chat bis 22 Uhr offen, danach stumm für alle – beide okay', both: true },
        { id: 'a', label: 'Chat immer offen', both: false, winner: 'A' },
        { id: 'b', label: 'Chat ab 20 Uhr stumm', both: false, winner: 'B' },
        { id: 'none', label: 'Kein Deal, Chat wird aufgelöst', both: false },
      ],
    },
  ];

  const LEVELS = ['Wissen', 'Fragen', 'Perspektive'];
  const FRAGEHILFEN = ['„Warum ist dir das wichtig?“', '„Was wäre das Schlimmste für dich?“', '„Ab wann wäre es okay?“', '„Was brauchst du mindestens?“'];

  // Geheim-Karte eines Teams: nur für dieses Team
  function needCard(ctx, side, team) {
    return ctx.figureCard({ fig: side.fig, mood: 'neutral', text: side.braucht, eyebrow: 'Geheim · nur Team ' + team + ' · Das braucht ' + CREW.games.figures[side.fig].name + ' wirklich', extra: h('p', { class: 'muted small' }, 'Verratet es nicht direkt. Lasst das andere Team FRAGEN.') });
  }

  CREW.registerGame({
    id: 'dealoderkein',
    template: 'T6',
    icon: 'shield',
    themen: ['Kompromiss', 'Bedürfnis', 'Verhandeln'],
    safety: ['figuren'],
    async run(ctx) {
      const fall = ctx.rpick(FAELLE);
      const A = CREW.games.figures[fall.A.fig], B = CREW.games.figures[fall.B.fig];

      /* Jugend-iPad mit Rolle A/B (per QR): nur die eigene Geheim-Karte, dann zurück zum Beamer schauen */
      if (ctx.role === 'A' || ctx.role === 'B') {
        const side = fall[ctx.role];
        const w = ctx.scr([needCard(ctx, side, ctx.role), ctx.say('Schaut jetzt zum Beamer. Fragt das andere Team, was seine Figur braucht – bevor ihr einen Deal nennt.', { eyebrow: 'Team ' + ctx.role, small: true })], { eyebrow: 'Team ' + ctx.role, badge: h('span', { class: 'pill accent' }, 'Team-iPad ' + ctx.role) });
        await ctx.next(w, 'Verstanden');
        return { summary: 'Team ' + ctx.role + ' kennt sein Bedürfnis. Der Rest läuft am Beamer.', noSticker: true };
      }

      await ctx.T.intro({
        rule: 'Zwei Figuren, zwei Teams. Jedes Team kennt heimlich, was seine Figur braucht. Fragt, bevor ihr einen Deal nennt.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Wissen', text: 'Geheim-Karte: Was braucht eure Figur wirklich?' },
          { icon: 'chat', title: 'Fragen', text: '90 Sekunden. Mindestens eine Frage pro Team.' },
          { icon: 'users', title: 'Perspektive', text: 'Sagt, was die ANDERE Figur braucht. Dann der Deal.' },
        ],
        probe: ctx.T.probeCard('Probe: Team A will Pizza, Team B will Pasta. Eine Frage, die hilft? Tippt eine – zählt nicht.', [{ label: '„Warum Pasta?“', value: 1, variant: 'ghost' }, { label: '„Pizza ist besser!“', value: 2, variant: 'ghost' }]),
      });
      // Der Fall am Beamer
      const w1 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: fall.A.fig, mood: 'genervt', text: A.name + ' ' + fall.A.will, eyebrow: 'Team A spricht für' }),
          ctx.figureCard({ fig: fall.B.fig, mood: 'genervt', text: B.name + ' ' + fall.B.will, eyebrow: 'Team B spricht für' })),
        CREW.ui.teacherLine('Crew in zwei Teams teilen (links/rechts im Raum). Dann Weiter.'),
      ], { eyebrow: fall.title });
      if ((await ctx.next(w1, 'Teams stehen')) === ctx.SKIP) return { summary: 'Heute kein Deal. Nächstes Mal.' };
      // Geheim-Karten: Team-iPads per QR oder am Lehrer-iPad nacheinander
      const qr = CREW.games.qrPanel('dealoderkein', { size: 150 });
      const w2 = ctx.scr([
        ctx.say('Jedes Team bekommt eine Geheim-Karte: Was braucht eure Figur wirklich?', { eyebrow: 'Geheim-Karten', small: true }),
        h('div', { class: 'card' }, qr),
        h('p', { class: 'muted small' }, 'Ohne Team-iPads: „Am Lehrer-iPad zeigen“ – erst schaut nur Team A, dann nur Team B.'),
      ], { eyebrow: 'Geheim-Karten', badge: ctx.stufe(1, LEVELS) });
      const how = await ctx.ask(w2, [{ label: 'Am Lehrer-iPad zeigen', value: 'here', variant: 'ghost', icon: 'eyeOff' }, { label: 'Teams haben gescannt', value: 'qr', iconRight: 'right' }]);
      if (how === 'here') {
        for (const team of ['A', 'B']) {
          const c = await ctx.T.cover({ who: 'Nur Team ' + team + ' schaut', hint: 'Team ' + (team === 'A' ? 'B' : 'A') + ' dreht sich um. Dann tippen.', eyebrow: 'Geheim-Karte ' + team });
          if (c === ctx.SKIP) continue;
          const w3 = ctx.scr([needCard(ctx, fall[team], team)], { eyebrow: 'Geheim-Karte ' + team, badge: ctx.stufe(1, LEVELS) });
          await ctx.next(w3, 'Gelesen, wegdrehen');
        }
      }
      // Verhandlung: 90 Sekunden, Fragen-Häkchen pro Team (nur die Lehrkraft tippt)
      const asked = { A: false, B: false };
      const askBtn = (team) => { const b = CREW.ui.btn('Team ' + team + ' hat gefragt', () => { asked[team] = true; b.classList.add('good'); b.disabled = true; }, { small: true, variant: 'ghost', icon: 'check', id: 'asked-' + team }); return b; };
      const slot = h('div', { class: 'row center' });
      const w4 = ctx.scr([
        h('div', { class: 'grid two' },
          h('div', { class: 'fig-card', style: { '--fc': A.colour } }, h('div', { class: 'fig-side' }, CREW.games.avatar(A, 'neutral', 72), h('b', { class: 'fig-name' }, 'Team A')), h('div', { class: 'fig-body' }, h('b', null, A.name + ' ' + fall.A.will), askBtn('A'))),
          h('div', { class: 'fig-card', style: { '--fc': B.colour } }, h('div', { class: 'fig-side' }, CREW.games.avatar(B, 'neutral', 72), h('b', { class: 'fig-name' }, 'Team B')), h('div', { class: 'fig-body' }, h('b', null, B.name + ' ' + fall.B.will), askBtn('B')))),
        h('div', { class: 'row between' }, ctx.say('Verhandelt. Jede Seite stellt mindestens eine Frage, bevor sie den Deal nennt.', { eyebrow: '90 Sekunden', small: true }), slot),
        h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Fragehilfen'), h('div', { class: 'row', style: { gap: '8px' } }, FRAGEHILFEN.map((x) => h('span', { class: 'chip' }, x)))),
        CREW.ui.teacherLine('Häkchen setzen, sobald ein Team gefragt hat. Dann „Weiter“.'),
      ], { eyebrow: 'Verhandlung', badge: ctx.stufe(2, LEVELS) });
      if (ctx.auto) { asked.A = true; asked.B = true; }
      const r = await ctx.timerOrButton(w4, 90, [{ label: 'Weiter', value: 'deal', iconRight: 'right', id: 'btn-deal' }], { slot });
      if (r === ctx.SKIP) return { summary: 'Abgebrochen. Auch okay.' };
      if (!asked.A || !asked.B) {
        const w5 = ctx.scr([ctx.say('Halt: ' + (!asked.A && !asked.B ? 'Beide Teams' : 'Team ' + (!asked.A ? 'A' : 'B')) + ' haben noch nicht gefragt. Eine Frage, dann der Deal.', { eyebrow: 'Erst fragen' })], { eyebrow: 'Verhandlung', center: true });
        await ctx.next(w5, 'Gefragt, weiter');
      }
      // Level 3: Perspektive – jedes Team sagt, was die ANDERE Figur braucht. Dann aufdecken.
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Bevor der Deal kommt: Jedes Team sagt in einem Satz, was die ANDERE Figur wirklich braucht.' });
      const gesagt = { A: false, B: false };
      const sagBtn = (team) => { const b = CREW.ui.btn('Gesagt', () => { gesagt[team] = true; b.classList.add('good'); b.disabled = true; }, { small: true, variant: 'ghost', icon: 'check', id: 'persp-' + team }); return b; };
      const wP = ctx.scr([
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Team A sagt'), h('b', { class: 'lead' }, '„' + B.name + ' braucht eigentlich …“'), sagBtn('A')),
          h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Team B sagt'), h('b', { class: 'lead' }, '„' + A.name + ' braucht eigentlich …“'), sagBtn('B'))),
        h('p', { class: 'muted small' }, 'Nicht was die Figur WILL – was sie BRAUCHT. Raten ist erlaubt.'),
      ], { eyebrow: 'Perspektive', badge: ctx.stufe(3, LEVELS) });
      if (ctx.auto) { gesagt.A = true; gesagt.B = true; }
      await ctx.next(wP, 'Aufdecken', { id: 'btn-aufdecken' });
      const wA = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: fall.A.fig, mood: 'neutral', text: fall.A.braucht, eyebrow: 'Das braucht ' + A.name + ' wirklich' }),
          ctx.figureCard({ fig: fall.B.fig, mood: 'neutral', text: fall.B.braucht, eyebrow: 'Das braucht ' + B.name + ' wirklich' })),
        ctx.say('Lag das andere Team nah dran? Mit beiden Bedürfnissen auf dem Tisch: Welcher Deal passt?', { eyebrow: 'Aufgedeckt', small: true }),
      ], { eyebrow: 'Perspektive', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wA, 'Deal nennen');

      // Der Deal (Lehrkraft tippt einmal), beide Figuren reagieren
      const w6 = ctx.scr([ctx.say('Welcher Deal steht?', { eyebrow: 'Deal' }), CREW.ui.teacherLine('Den Deal der Crew einmal antippen.')], { eyebrow: 'Deal', badge: ctx.stufe(3, LEVELS) });
      const d = await ctx.ask(w6, fall.deals.map((x) => ({ label: x.label, value: x.id, variant: x.both ? 'good' : 'ghost' })));
      const deal = fall.deals.find((x) => x.id === d) || fall.deals[3];
      const moodA = deal.both ? 'froh' : deal.winner === 'A' ? 'froh' : deal.winner === 'B' ? 'traurig' : 'wut';
      const moodB = deal.both ? 'froh' : deal.winner === 'B' ? 'froh' : deal.winner === 'A' ? 'traurig' : 'wut';
      const w7 = ctx.scr([
        deal.both ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Beide okay!') : null,
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: fall.A.fig, mood: moodA, text: deal.both ? 'Damit kann ich leben. Danke fürs Fragen.' : moodA === 'froh' ? 'Für mich passt’s. Aber ' + B.name + ' sieht nicht glücklich aus.' : moodA === 'traurig' ? 'Ich hab verloren. Mein Bedürfnis kam nicht vor.' : 'Kein Deal. Morgen gleicher Streit.', eyebrow: A.name }),
          ctx.figureCard({ fig: fall.B.fig, mood: moodB, text: deal.both ? 'Passt. Ich hatte Angst, das zu sagen – ihr habt gefragt.' : moodB === 'froh' ? 'Okay für mich. ' + A.name + ' zahlt den Preis.' : moodB === 'traurig' ? 'Ich hab verloren. Keiner hat gefragt, was ich brauche.' : 'Kein Deal. Das kostet uns beide.', eyebrow: B.name })),
        h('p', { class: 'muted' }, deal.both ? 'Beide Bedürfnisse drin. Das ist ein Deal.' : 'Kurz reden: Welche Frage hätte den „Beide okay“-Deal gefunden? Verlieren gehört dazu – beim nächsten Fall tauschen die Teams.'),
      ], { eyebrow: 'Reaktion' });
      if (deal.both) { CREW.sound.play('great'); if (!ctx.fast) CREW.ui.confetti(120); }
      await ctx.next(w7, 'Weiter');
      return { summary: deal.both ? 'Beide okay. Ihr habt das Bedürfnis hinter dem Wunsch gefunden.' : 'Ein Deal ist erst gut, wenn beide damit leben können.', stats: [[(asked.A ? 1 : 0) + (asked.B ? 1 : 0), 'Teams haben gefragt'], [(gesagt.A ? 1 : 0) + (gesagt.B ? 1 : 0), 'Teams haben die andere Seite benannt']] };
    },
  });
})();
