/* Spiel „Echte Freunde?“ (Thema: Ankommen & Crew) · Vorlage T3 Zu zweit an einem iPad · j1-e02, j1-e22, j1-e26
   Kurze Szenen: Was eine Freund-Figur tut (verteidigt Mika im Chat, erzählt Mikas Geheimnis weiter, meldet sich nur,
   wenn sie was braucht …). In drei Level:
   1) Erkennen – das Paar sortiert klare Szenen: grüne oder rote Flagge.
   2) Begründen – bei „kommt drauf an“: Worauf kommt es an? Mika sagt, was für Mika zählt.
   3) Reagieren – eine rote Flagge: Was sagt Mika jetzt? Klar, Angriff oder runterschlucken – die Freund-Figur reagiert.
   Danach: „Wem würde Mika eine schlechte Note erzählen – wem den Streit zu Hause?“ Alles über Figuren, Pass erlaubt.
   Familien-Thema → Hinweis auf der Szene, Hilfenummern am Ende. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Erkennen', 'Begründen', 'Reagieren'];
  const FLAGS = { gruen: { label: 'Grüne Flagge', short: 'grün' }, rot: { label: 'Rote Flagge', short: 'rot' }, kommt: { label: 'Kommt drauf an', short: 'kommt drauf an' } };
  /* Szenen: Freund-Figur, was sie tut, Einordnung mit Begründung (nie „falsch“).
     bedingung (bei „kommt drauf an“): Worauf kommt es an? reaktion (rote Flaggen): Was sagt Mika – und was passiert? */
  const SZENEN = [
    { id: 'chat', fig: 'yara', mood: 'wut', text: 'Im Klassenchat lacht jemand über Mikas Foto. Yara schreibt: „Lass das. Ist nicht lustig.“', best: 'gruen', warum: 'Yara stellt sich vor Mika, wenn’s zählt – auch wenn andere dabei sind.' },
    { id: 'geheimnis', fig: 'luca', mood: 'froh', familie: true, text: 'Mika hat Luca erzählt, dass die Eltern sich trennen. Zwei Tage später wissen es drei Leute aus der Klasse.', best: 'rot', warum: 'Ein Geheimnis weitergeben bricht Vertrauen – egal, wie nett es gemeint war.',
      reaktion: [
        { k: 'klar', t: '„Das war privat. Ich will, dass du es niemandem mehr erzählst.“', a: 'Luca: „Sorry. Ich dachte, die wissen es eh. Ich sag nichts mehr.“', mood: 'traurig' },
        { k: 'angriff', t: '„Du Verräter. Mit dir rede ich nie wieder.“', a: 'Luca: „Dann halt nicht!“ Jetzt redet die Klasse auch noch über den Streit.', mood: 'wut' },
        { k: 'schlucken', t: '(Mika sagt nichts und erzählt Luca nie wieder etwas.)', a: 'Luca merkt nichts. Mika ist mit der Trennung allein.', mood: 'neutral' }] },
    { id: 'nutzen', fig: 'sam', mood: 'neutral', text: 'Sam schreibt Mika nur, wenn Sam die Hausaufgaben braucht. Sonst: Funkstille.', best: 'kommt', warum: 'Einmal okay, als Muster rot. Freundschaft ist mehr als Nutzen.',
      bedingung: { opts: [{ t: 'Ob es immer so ist – oder nur einmal', ok: true }, { t: 'Ob Sam auch mal fragt, wie es Mika geht', ok: true }, { t: 'Ob die Hausaufgaben schwer sind', ok: false }, { t: 'Ob Sam nette Emojis schickt', ok: false }],
        mika: 'Einmal ist okay. Wenn Sam nie fragt, wie es mir geht, bin ich nur der Hausaufgaben-Service.' } },
    { id: 'da', fig: 'luca', mood: 'traurig', text: 'Mika geht es richtig schlecht. Luca kommt abends vorbei, sagt nicht viel, bleibt einfach da.', best: 'gruen', warum: 'Da sein ohne Ratschläge – das ist oft das Beste.' },
    { id: 'witze', fig: 'yara', mood: 'genervt', text: 'Yara macht vor anderen Witze über Mikas Frisur. Allein sagt Yara: „War doch nur Spaß.“', best: 'rot', warum: 'Vor anderen klein machen, allein nett sein: Das ist kein Spaß, das ist ein Muster.',
      reaktion: [
        { k: 'klar', t: '„Hör auf mit Witzen über mich vor anderen. Für mich ist das nicht lustig.“', a: 'Yara: „Oh. Okay. Hab ich nicht gemerkt. Mach ich nicht mehr.“', mood: 'neutral' },
        { k: 'angriff', t: '„Und du siehst aus wie ein nasser Hund.“', a: 'Alle lachen jetzt über beide. Es hört nicht auf, es wird mehr.', mood: 'wut' },
        { k: 'schlucken', t: '(Mika lacht mit.)', a: 'Yara macht weiter. Für Yara ist es ja „nur Spaß“.', mood: 'traurig' }] },
    { id: 'ehrlich', fig: 'sam', mood: 'froh', text: 'Mika hat eine Party abgesagt. Sam ist enttäuscht, sagt es ehrlich – und fragt dann: „Alles okay bei dir?“', best: 'gruen', warum: 'Ehrlich enttäuscht sein und trotzdem nachfragen – beides zusammen ist Freundschaft.' },
    { id: 'abschreiben', fig: 'luca', mood: 'neutral', text: 'Luca will, dass Mika beim Abschreiben hilft. Als Mika Nein sagt: „Dachte, wir sind Freunde.“', best: 'rot', warum: '„Dachte, wir sind Freunde“ ist Druck. Ein Nein muss in einer Freundschaft erlaubt sein.',
      reaktion: [
        { k: 'klar', t: '„Ich erklär dir die Aufgabe gern. Abschreiben lass ich dich nicht.“', a: 'Luca: „… Okay. Morgen in der Pause?“', mood: 'neutral' },
        { k: 'angriff', t: '„Mach deinen Kram selbst, du Schmarotzer.“', a: 'Luca redet drei Tage nicht mit Mika.', mood: 'wut' },
        { k: 'schlucken', t: '(Mika schickt die Lösungen.)', a: 'Nächste Woche fragt Luca wieder. Und die Woche danach auch.', mood: 'genervt' }] },
    { id: 'geburtstag', fig: 'yara', mood: 'froh', text: 'Yara vergisst Mikas Geburtstag. Am nächsten Tag kommt Yara mit einem selbst gemachten Kuchen.', best: 'kommt', warum: 'Vergessen passiert. Was danach kommt, zählt.',
      bedingung: { opts: [{ t: 'Was Yara danach macht', ok: true }, { t: 'Ob es das erste Mal war', ok: true }, { t: 'Ob der Kuchen schmeckt', ok: false }, { t: 'Ob es andere gemerkt haben', ok: false }],
        mika: 'Vergessen kann passieren. Dass Yara es wiedergutmacht, zeigt mir, dass ich wichtig bin.' } },
    { id: 'lesen', fig: 'sam', mood: 'genervt', text: 'Sam liest Mikas Nachrichten mit, wenn Mika das Handy liegen lässt. „Nur so.“', best: 'rot', warum: 'Grenze überschritten. Auch bei Freunden gilt: privat bleibt privat.',
      reaktion: [
        { k: 'klar', t: '„Mein Handy ist privat. Bitte lies nicht mehr mit.“', a: 'Sam: „Sorry, war neugierig. Mach ich nicht mehr.“', mood: 'neutral' },
        { k: 'angriff', t: '„Spinnst du? Du bist so ein Stalker!“', a: 'Sam: „Chill, war doch nur Spaß.“ Der Streit wird lauter, das Thema geht unter.', mood: 'wut' },
        { k: 'schlucken', t: '(Mika sagt nichts und legt das Handy nie mehr hin.)', a: 'Sam merkt nichts – und macht es beim nächsten Mal wieder.', mood: 'genervt' }] },
    { id: 'mitnehmen', fig: 'luca', mood: 'froh', text: 'Luca ist bei allen beliebt und nimmt Mika mit in die Gruppe – ohne dass Mika darum bitten muss.', best: 'gruen', warum: 'Mitnehmen, ohne dass man bitten muss. Das macht Platz.' },
    { id: 'weg', fig: 'yara', mood: 'neutral', text: 'Yara ist seit zwei Wochen kaum erreichbar. Mika weiß nicht, warum. Vorher waren sie jeden Tag zusammen.', best: 'kommt', warum: 'Vielleicht hat Yara selbst Stress. Nachfragen statt sauer sein – aber die Antwort zählt.',
      bedingung: { opts: [{ t: 'Ob Yara gerade selbst Stress hat', ok: true }, { t: 'Ob Mika nachfragt – und eine Antwort kommt', ok: true }, { t: 'Ob Yara neue Freunde hat', ok: false }, { t: 'Wer zuerst schreibt', ok: false }],
        mika: 'Ich frag Yara einfach. Die Antwort sagt mir mehr als mein Raten.' } },
    { id: 'direkt', fig: 'sam', mood: 'wut', text: 'Mika hat Sam bei etwas angelogen. Sam ist sauer, sagt es Mika direkt ins Gesicht – und nicht im Chat allen.', best: 'gruen', warum: 'Streit direkt und nur mit der Person: rote Karte für die Lüge, grüne Flagge für Sam.' },
  ];
  const REAKT_LABEL = { klar: 'Klar gesagt', angriff: 'Angriff', schlucken: 'Runtergeschluckt' };

  /* Flaggen-Profil pro Freund-Figur */
  function profil(ctx, wahl, figs) {
    return h('div', { class: 'ef-profile' }, figs.map((f) => {
      const fig = CREW.games.figures[f];
      const dots = wahl.filter((w) => w.fig === f);
      return h('div', { class: 'card stack', style: { alignItems: 'center', borderColor: fig.colour } }, ctx.avatar(f, 'neutral', 64), h('b', null, fig.name),
        h('div', { class: 'ef-dots' }, dots.length ? dots.map((w) => h('i', { 'data-f': w.flag, title: FLAGS[w.flag].label })) : h('span', { class: 'muted small' }, 'keine Szene')));
    }));
  }

  /* Eine Szene: Flagge wählen, Einordnung. Gibt die Flagge zurück (oder null bei Pass) */
  async function flagge(ctx, s, i, total, level) {
    const fig = CREW.games.figures[s.fig];
    const w = ctx.scr([
      ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: 'Szene ' + (i + 1) + ' von ' + total + ' · ' + fig.name + ' ist mit Mika befreundet' }),
      s.familie ? h('p', { class: 'small', style: { color: 'var(--yellow)' } }, 'Familien-Thema – nur, wenn du magst. Pass ist okay. Hilfe oben rechts.') : null,
      h('p', { class: 'muted' }, 'Redet kurz: Grün, rot oder kommt drauf an? Dann tippt EINE Flagge für euch beide.'),
    ], { eyebrow: 'Szene ' + (i + 1) + '/' + total, badge: ctx.stufe(level, LEVELS) });
    const r = await ctx.ask(w, [
      { label: 'Grüne Flagge', value: 'gruen', variant: 'good', icon: 'check' },
      { label: 'Kommt drauf an', value: 'kommt', variant: 'ghost', icon: 'help' },
      { label: 'Rote Flagge', value: 'rot', variant: 'teamB', icon: 'x' },
    ]);
    return r === ctx.SKIP ? null : r;
  }

  CREW.registerGame({
    id: 'echter-freund',
    template: 'T3',
    icon: 'heart',
    themen: ['Freundschaft', 'Vertrauen', 'Grenzen', 'Rote Flagge'],
    safety: ['figuren', 'freiwillig', 'familie'],
    help: true,
    szenen: SZENEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit: Was tun Freund-Figuren? Erst sortiert ihr Flaggen, dann begründet ihr, dann übt ihr, was Mika bei einer roten Flagge sagt.',
        levels: LEVELS,
        steps: [
          { icon: 'check', title: 'Flaggen sortieren', text: 'Grün oder rot? Einigt euch, dann tippt.' },
          { icon: 'help', title: 'Worauf kommt es an?', text: 'Manche Szenen sind nicht eindeutig.' },
          { icon: 'chat', title: 'Was sagt Mika?', text: 'Klar, Angriff oder runterschlucken?' },
        ],
        probe: ctx.T.probeCard('Probe: Eine Figur bringt dir Pommes mit, ohne dass du gefragt hast. Flagge? Tippt – zählt nicht.', [{ label: 'Grüne Flagge', value: 'g', variant: 'ghost' }, { label: 'Rote Flagge', value: 'r', variant: 'ghost' }, { label: 'Kommt drauf an', value: 'k', variant: 'ghost' }]),
      });
      // Szenen nach Level ziehen (gleich auf allen Geräten): klar → kommt drauf an → rote Flagge mit Reaktion
      const klare = ctx.rshuffle(SZENEN.filter((s) => s.best !== 'kommt' && !s.reaktion));
      const rote = ctx.rshuffle(SZENEN.filter((s) => s.reaktion));
      const kommt = ctx.rshuffle(SZENEN.filter((s) => s.best === 'kommt'));
      // Level 3 bevorzugt eine Szene ohne Familien-Thema; die übrigen roten dürfen in Level 1
      const l3 = rote.find((s) => !s.familie) || rote[0];
      const l1 = klare.slice(0, 2).concat(rote.filter((s) => s !== l3 && !s.familie).slice(0, 2));
      const l1s = ctx.rshuffle(l1);
      const l2 = kommt.slice(0, 2);
      const wahl = [];
      let einig = 0, begruendet = 0, reaktion = null;

      /* ---- Level 1: Erkennen ---- */
      for (let i = 0; i < l1s.length; i++) {
        const s = l1s[i];
        const r = await flagge(ctx, s, i, l1s.length, 1);
        if (!r) continue;
        wahl.push({ fig: s.fig, flag: r, best: s.best });
        if (r === s.best) einig++;
        const w2 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (r === 'gruen' ? 'good' : r === 'rot' ? 'teamB' : ''), style: { fontSize: '1.2em' } }, 'Ihr: ' + FLAGS[r].label)),
          ctx.figureCard({ fig: 'mika', mood: s.best === 'gruen' ? 'froh' : 'traurig', text: (r === s.best ? 'Seh ich auch so. ' : 'Viele sehen das als „' + FLAGS[s.best].short + '“. ') + s.warum, eyebrow: 'Mika dazu' }),
        ], { eyebrow: 'Szene ' + (i + 1), badge: ctx.stufe(1, LEVELS) });
        await ctx.next(w2, i + 1 < l1s.length ? 'Nächste Szene' : 'Weiter');
      }

      /* ---- Level 2: Begründen – worauf kommt es an? ---- */
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt wird’s kniffliger: Nicht alles ist grün oder rot. Worauf kommt es an?' });
      for (let i = 0; i < l2.length; i++) {
        const s = l2[i];
        const r = await flagge(ctx, s, i, l2.length, 2);
        if (!r) continue;
        wahl.push({ fig: s.fig, flag: r, best: s.best });
        const opts = ctx.rshuffle(s.bedingung.opts);
        const wb = ctx.scr([
          ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: 'Ihr: ' + FLAGS[r].label, size: 72 }),
          ctx.say('Worauf kommt es hier an? Wählt das Wichtigste.', { eyebrow: 'Begründen', small: true }),
        ], { eyebrow: 'Szene ' + (i + 1), badge: ctx.stufe(2, LEVELS) });
        const b = await ctx.ask(wb, opts.map((o, k) => ({ label: o.t, value: k, variant: 'ghost', id: 'ef-bed-' + k })));
        const o = b === ctx.SKIP ? null : opts[b];
        if (o && o.ok) begruendet++;
        const gute = s.bedingung.opts.filter((x) => x.ok).map((x) => x.t);
        const w2 = ctx.scr([
          ctx.figureCard({ fig: 'mika', mood: 'neutral', text: s.bedingung.mika, eyebrow: 'Mika dazu' }),
          h('div', { class: 'card stack soft' },
            h('b', null, o ? (o.ok ? 'Guter Punkt: „' + o.t + '“.' : '„' + o.t + '“ – das ist eher Nebensache.') : 'Gepasst. Auch okay.'),
            h('p', { class: 'muted small' }, 'Wichtig ist hier: ' + gute.join(' · ') + '. Ein Fehler ist noch kein Muster.')),
        ], { eyebrow: 'Szene ' + (i + 1), badge: ctx.stufe(2, LEVELS) });
        await ctx.next(w2, i + 1 < l2.length ? 'Nächste Szene' : 'Weiter');
      }

      /* ---- Level 3: Reagieren – was sagt Mika bei einer roten Flagge? ---- */
      if (l3) {
        await ctx.T.level({ n: 3, names: LEVELS, text: 'Eine rote Flagge. Erkennen reicht nicht – was sagt Mika jetzt?' });
        const fig = CREW.games.figures[l3.fig];
        const opts = ctx.rshuffle(l3.reaktion);
        const w3 = ctx.scr([
          ctx.figureCard({ fig: l3.fig, mood: l3.mood, text: l3.text, eyebrow: 'Rote Flagge · ' + fig.name }),
          l3.familie ? ctx.safetyLine('familie') : null,
          ctx.say('Was sagt Mika zu ' + fig.name + '? Einigt euch, dann beide Finger drauf.', { eyebrow: 'Reagieren', small: true }),
        ], { eyebrow: 'Rote Flagge', badge: ctx.stufe(3, LEVELS) });
        let pick = null;
        const row = h('div', { class: 'stack' }, opts.map((o) => { const b = h('button', { type: 'button', class: 'chip', style: { justifyContent: 'flex-start', textAlign: 'left' }, 'data-reakt': o.k }, o.t); b.addEventListener('click', () => { CREW.sound.play('tap'); pick = o; row.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x === b)); }); return b; }));
        w3.appendChild(h('div', { class: 'card' }, row));
        if (ctx.auto) pick = opts[Math.floor(ctx.autoRng() * opts.length)];
        const ok = await ctx.T.twoFinger(w3, { label: 'Beide: Finger drauf', hint: 'Erst einen Satz antippen, dann zwei Finger.' });
        if (ok !== ctx.SKIP) {
          if (!pick) pick = l3.reaktion[0];
          reaktion = pick.k;
          const klar = pick.k === 'klar';
          if (klar) CREW.sound.play('great');
          const w4 = ctx.scr([
            h('div', { class: 'grid two' },
              ctx.figureCard({ fig: 'mika', mood: klar ? 'neutral' : pick.k === 'angriff' ? 'wut' : 'traurig', text: pick.t, eyebrow: 'Mika · ' + REAKT_LABEL[pick.k] }),
              ctx.figureCard({ fig: l3.fig, mood: pick.mood, text: pick.a, eyebrow: fig.name + ' reagiert' })),
            h('div', { class: 'card stack soft' },
              h('b', null, klar ? 'Klar gesagt: Was war, was Mika will. Ohne Beleidigung.' : 'Kein „falsch“ – aber schaut auf die Folge.'),
              h('p', { class: 'muted small' }, klar ? 'Ob die Freundschaft hält, zeigt jetzt ' + fig.name + '. Mika hat die Grenze gezeigt.' : 'Ein klarer Satz sagt, was war und was Mika will: „Das war …, ich will …“')),
          ], { eyebrow: 'Rote Flagge · Folge', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w4, 'Weiter');
        }
      }

      /* ---- Vertrauen über Mika ---- */
      const figs = ['yara', 'luca', 'sam'];
      const w5 = ctx.scr([
        ctx.say('So sehen die drei nach euren Flaggen aus. Wem würde Mika eine schlechte Note erzählen?', { eyebrow: 'Vertrauen', small: true }),
        profil(ctx, wahl, figs),
        ctx.safetyLine('figuren'),
      ], { eyebrow: 'Vertrauen 1/2' });
      const note = await ctx.ask(w5, figs.map((f) => ({ label: CREW.games.figures[f].name, value: f, variant: 'ghost' })).concat([{ label: 'Niemandem', value: 'niemand', variant: 'ghost' }, { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]));
      const w6 = ctx.scr([
        ctx.say('Und wem würde Mika von einem Streit zu Hause erzählen? Das ist größer als eine Note. Vielleicht jemand anderem – vielleicht niemandem.', { eyebrow: 'Vertrauen', small: true }),
        profil(ctx, wahl, figs),
        h('div', { class: 'row' }, ctx.safetyLine('familie'), ctx.safetyLine('freiwillig')),
      ], { eyebrow: 'Vertrauen 2/2' });
      const streit = await ctx.ask(w6, figs.map((f) => ({ label: CREW.games.figures[f].name, value: f, variant: 'ghost' })).concat([{ label: 'Niemandem', value: 'niemand', variant: 'ghost' }, { label: 'Einer erwachsenen Person', value: 'erwachsen', variant: 'good', icon: 'user' }, { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]));
      const verschieden = note !== 'pass' && note !== ctx.SKIP && streit !== 'pass' && streit !== ctx.SKIP && note !== streit;
      const gruen = wahl.filter((w) => w.flag === 'gruen').length, rot = wahl.filter((w) => w.flag === 'rot').length;
      return {
        summary: wahl.length ? 'Freundschaft erkennt man am Verhalten – und an dem, was nach einem Fehler kommt.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[gruen, 'grüne Flaggen'], [rot, 'rote Flaggen'], [begruendet, 'gute Gründe']],
        extra: h('p', { class: 'muted small' }, (verschieden ? 'Für die Note und den Streit habt ihr verschiedene Antworten gewählt. Das ist normal: ' : '') + 'Nicht jedes Vertrauen ist gleich groß.' + (reaktion === 'klar' ? ' Und eine rote Flagge darf man klar ansprechen.' : '')),
      };
    },
  });
})();
