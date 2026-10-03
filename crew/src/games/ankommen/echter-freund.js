/* Spiel „Echte Freunde?“ (Thema: Ankommen & Crew) · Vorlage T3 Zu zweit an einem iPad · j1-e02, j1-e22, j1-e26
   Acht kurze Szenen: Was eine Freund-Figur tut (verteidigt Mika im Chat, erzählt Mikas Geheimnis weiter, meldet
   sich nur, wenn sie was braucht, kommt, wenn’s Mika schlecht geht). Das Paar sortiert: grüne Flagge / rote Flagge /
   kommt drauf an. Danach: „Wem von diesen Figuren würde Mika eine schlechte Note erzählen – wem den Streit zu Hause?“
   Alles über die Figuren, Pass erlaubt. Familien-Thema → Hilfe-Hinweis, Hilfenummern am Ende. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FLAGS = { gruen: { label: 'Grüne Flagge', short: 'grün' }, rot: { label: 'Rote Flagge', short: 'rot' }, kommt: { label: 'Kommt drauf an', short: 'kommt drauf an' } };
  /* Szenen: Freund-Figur (yara/luca/sam), was sie tut, eine Einordnung mit Begründung (nie „falsch“) */
  const SZENEN = [
    { fig: 'yara', mood: 'wut', text: 'Im Klassenchat lacht jemand über Mikas Foto. Yara schreibt: „Lass das. Ist nicht lustig.“', best: 'gruen', warum: 'Yara stellt sich vor Mika, wenn’s zählt – auch wenn andere dabei sind.' },
    { fig: 'luca', mood: 'froh', familie: true, text: 'Mika hat Luca erzählt, dass die Eltern sich trennen. Zwei Tage später wissen es drei Leute aus der Klasse.', best: 'rot', warum: 'Ein Geheimnis weitergeben bricht Vertrauen – egal, wie nett es gemeint war.' },
    { fig: 'sam', mood: 'neutral', text: 'Sam schreibt Mika nur, wenn Sam die Hausaufgaben braucht. Sonst: Funkstille.', best: 'kommt', warum: 'Einmal okay, als Muster rot. Freundschaft ist mehr als Nutzen.' },
    { fig: 'luca', mood: 'traurig', text: 'Mika geht es richtig schlecht. Luca kommt abends vorbei, sagt nicht viel, bleibt einfach da.', best: 'gruen', warum: 'Da sein ohne Ratschläge – das ist oft das Beste.' },
    { fig: 'yara', mood: 'genervt', text: 'Yara macht vor anderen Witze über Mikas Frisur. Allein sagt Yara: „War doch nur Spaß.“', best: 'rot', warum: 'Vor anderen klein machen, allein nett sein: Das ist kein Spaß, das ist ein Muster.' },
    { fig: 'sam', mood: 'froh', text: 'Mika hat eine Party abgesagt. Sam ist enttäuscht, sagt es ehrlich – und fragt dann: „Alles okay bei dir?“', best: 'gruen', warum: 'Ehrlich enttäuscht sein und trotzdem nachfragen – beides zusammen ist Freundschaft.' },
    { fig: 'luca', mood: 'neutral', text: 'Luca will, dass Mika beim Abschreiben hilft. Als Mika Nein sagt: „Dachte, wir sind Freunde.“', best: 'rot', warum: '„Dachte, wir sind Freunde“ ist Druck. Ein Nein muss in einer Freundschaft erlaubt sein.' },
    { fig: 'yara', mood: 'froh', text: 'Yara vergisst Mikas Geburtstag. Am nächsten Tag kommt Yara mit einem selbst gemachten Kuchen.', best: 'kommt', warum: 'Vergessen passiert. Was danach kommt, zählt.' },
    { fig: 'sam', mood: 'genervt', text: 'Sam liest Mikas Nachrichten mit, wenn Mika das Handy liegen lässt. „Nur so.“', best: 'rot', warum: 'Grenze überschritten. Auch bei Freunden gilt: privat bleibt privat.' },
    { fig: 'luca', mood: 'froh', text: 'Luca ist bei allen beliebt und nimmt Mika mit in die Gruppe – ohne dass Mika darum bitten muss.', best: 'gruen', warum: 'Mitnehmen, ohne dass man bitten muss. Das macht Platz.' },
    { fig: 'yara', mood: 'neutral', text: 'Yara ist seit zwei Wochen kaum erreichbar. Mika weiß nicht, warum. Vorher waren sie jeden Tag zusammen.', best: 'kommt', warum: 'Vielleicht hat Yara selbst Stress. Nachfragen statt sauer sein – aber die Antwort zählt.' },
    { fig: 'sam', mood: 'wut', text: 'Mika hat Sam bei etwas angelogen. Sam ist sauer, sagt es Mika direkt ins Gesicht – und nicht im Chat allen.', best: 'gruen', warum: 'Streit direkt und nur mit der Person: rote Karte für die Lüge, grüne Flagge für Sam.' },
  ];

  /* Flaggen-Profil pro Freund-Figur */
  function profil(ctx, wahl, figs) {
    return h('div', { class: 'ef-profile' }, figs.map((f) => {
      const fig = CREW.games.figures[f];
      const dots = wahl.filter((w) => w.fig === f);
      return h('div', { class: 'card stack', style: { alignItems: 'center', borderColor: fig.colour } }, ctx.avatar(f, 'neutral', 64), h('b', null, fig.name),
        h('div', { class: 'ef-dots' }, dots.length ? dots.map((w) => h('i', { 'data-f': w.flag, title: FLAGS[w.flag].label })) : h('span', { class: 'muted small' }, 'keine Szene')));
    }));
  }

  CREW.registerGame({
    id: 'echter-freund',
    template: 'T3',
    icon: 'heart',
    themen: ['Freundschaft', 'Vertrauen', 'Grenzen', 'Rote Flagge'],
    safety: ['figuren', 'freiwillig', 'familie'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit: Acht Dinge, die Freund-Figuren tun. Sortiert sie – grüne Flagge, rote Flagge oder kommt drauf an. Einigt euch, dann tippt.',
        steps: [
          { icon: 'users', title: 'iPad in die Mitte', text: 'Lest die Szene. Redet kurz.' },
          { icon: 'check', title: 'Flagge wählen', text: 'Grün, rot, kommt drauf an.' },
          { icon: 'lock', title: 'Wem erzählt Mika was?', text: 'Über die Figur. Pass ist okay.' },
        ],
        probe: ctx.T.probeCard('Probe: Eine Figur bringt dir Pommes mit, ohne dass du gefragt hast. Flagge? Tippt – zählt nicht.', [{ label: 'Grüne Flagge', value: 'g', variant: 'ghost' }, { label: 'Rote Flagge', value: 'r', variant: 'ghost' }, { label: 'Kommt drauf an', value: 'k', variant: 'ghost' }]),
      });
      // Familienszenen ans Ende (stabile Sortierung), mit eigenem Hinweis auf der Szene
      const szenen = ctx.rshuffle(SZENEN).slice(0, 8).sort((a, b) => (a.familie ? 1 : 0) - (b.familie ? 1 : 0));
      const wahl = [];
      let einig = 0;
      for (let i = 0; i < szenen.length; i++) {
        const s = szenen[i];
        const fig = CREW.games.figures[s.fig];
        const w = ctx.scr([
          ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: 'Szene ' + (i + 1) + ' von ' + szenen.length + ' · ' + fig.name + ' ist mit Mika befreundet' }),
          s.familie ? h('p', { class: 'small', style: { color: 'var(--yellow)' } }, 'Familien-Thema – nur, wenn du magst. Pass ist okay. Hilfe oben rechts.') : null,
          h('p', { class: 'muted' }, 'Redet kurz: Grün, rot oder kommt drauf an? Dann tippt EINE Flagge für euch beide.'),
        ], { eyebrow: 'Szene ' + (i + 1) + '/' + szenen.length });
        const r = await ctx.ask(w, [
          { label: 'Grüne Flagge', value: 'gruen', variant: 'good', icon: 'check' },
          { label: 'Kommt drauf an', value: 'kommt', variant: 'ghost', icon: 'help' },
          { label: 'Rote Flagge', value: 'rot', variant: 'teamB', icon: 'x' },
        ]);
        if (r === ctx.SKIP) continue;
        wahl.push({ fig: s.fig, flag: r, best: s.best });
        if (r === s.best) einig++;
        // Rückmeldung: keine „falsch“-Markierung – eine Einordnung mit Grund, kurz
        const w2 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (r === 'gruen' ? 'good' : r === 'rot' ? 'teamB' : ''), style: { fontSize: '1.2em' } }, 'Ihr: ' + FLAGS[r].label)),
          ctx.figureCard({ fig: 'mika', mood: s.best === 'gruen' ? 'froh' : s.best === 'rot' ? 'traurig' : 'neutral', text: (r === s.best ? 'Seh ich auch so. ' : 'Viele sehen das als „' + FLAGS[s.best].short + '“. ') + s.warum, eyebrow: 'Mika dazu' }),
        ], { eyebrow: 'Szene ' + (i + 1) });
        await ctx.next(w2, i + 1 < szenen.length ? 'Nächste Szene' : 'Zum Profil');
      }
      // Flaggen-Profil der drei Freund-Figuren + Vertrauensfrage über Mika
      const figs = ['yara', 'luca', 'sam'];
      const w3 = ctx.scr([
        ctx.say('So sehen die drei nach euren Flaggen aus. Jetzt die Frage: Wem würde Mika eine schlechte Note erzählen?', { eyebrow: 'Vertrauen', small: true }),
        profil(ctx, wahl, figs),
        ctx.safetyLine('figuren'),
      ], { eyebrow: 'Vertrauen 1/2' });
      const note = await ctx.ask(w3, figs.map((f) => ({ label: CREW.games.figures[f].name, value: f, variant: 'ghost' })).concat([{ label: 'Niemandem', value: 'niemand', variant: 'ghost' }, { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]));
      const w4 = ctx.scr([
        ctx.say('Und wem würde Mika von einem Streit zu Hause erzählen? Das ist größer als eine Note. Vielleicht jemand anderem – vielleicht niemandem.', { eyebrow: 'Vertrauen', small: true }),
        profil(ctx, wahl, figs),
        h('div', { class: 'row' }, ctx.safetyLine('familie'), ctx.safetyLine('freiwillig')),
      ], { eyebrow: 'Vertrauen 2/2' });
      const streit = await ctx.ask(w4, figs.map((f) => ({ label: CREW.games.figures[f].name, value: f, variant: 'ghost' })).concat([{ label: 'Niemandem', value: 'niemand', variant: 'ghost' }, { label: 'Einer erwachsenen Person', value: 'erwachsen', variant: 'good', icon: 'user' }, { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]));
      // Eigene Grenzen beim Erzählen – Gespräch zu zweit, zwei Finger zum Abschluss
      const w5 = ctx.scr([
        ctx.say('Zu zweit, kurz: Woran merkt man, dass man jemandem etwas Großes erzählen kann? Ein Satz jede:r – oder Pass.', { eyebrow: 'Grenzen beim Erzählen' }),
        h('div', { class: 'row', style: { gap: '8px' } }, ['Bleibt bei der Person', 'Lacht nicht', 'Fragt nach', 'Drängt nicht', 'Ist da, wenn’s schlecht geht', 'Sagt auch mal Nein'].map((x) => h('span', { class: 'chip' }, x))),
        h('p', { class: 'muted small' }, (note !== 'pass' && note !== ctx.SKIP && streit !== 'pass' && streit !== ctx.SKIP && note !== streit) ? 'Ihr habt für die Note und den Streit verschiedene Antworten gewählt. Das ist normal: Nicht jedes Vertrauen ist gleich groß.' : 'Nicht jedes Vertrauen ist gleich groß. Eine Note ist etwas anderes als ein Streit zu Hause.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Abschluss' });
      await ctx.T.twoFinger(w5, { label: 'Beide fertig: Finger drauf' });
      const gruen = wahl.filter((w) => w.flag === 'gruen').length, rot = wahl.filter((w) => w.flag === 'rot').length;
      return {
        summary: wahl.length ? 'Freundschaft erkennt man am Verhalten, nicht am Wort „Freund“.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[gruen, 'grüne Flaggen'], [rot, 'rote Flaggen'], [wahl.length - gruen - rot, 'kommt drauf an']],
      };
    },
  });
})();
