/* Spiel „Stärke im Einsatz“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T5 Gerät weitergeben · j1-e06, j1-e19
   Das iPad wandert. Es zeigt eine Mini-Mission („Morgen Vortrag, Zettel verloren“). Wer dran ist, wählt aus
   zwölf Stärken-Karten eine und sagt in EINEM Satz, wie genau die Figur sie einsetzt. Die nächste Person
   muss für dieselbe Mission eine andere Stärke finden. Jede Stärke wird ein Block im Stärken-Turm.
   Bei „Kumpel schreibt nachts: Alles scheiße“ erscheint der Hilfe-Hinweis. Pass gibt weiter, ohne Kommentar.
   Variante j1-e06: Stärken aus den Bäumen der Crew können als eigene Karten dazu (nur im RAM, nichts gespeichert).
   Variante j1-e19: Missionen mit bremsendem Satz – die Stärke ist der Beweis dagegen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const STAERKEN = [
    { id: 'mut', name: 'Mut', icon: 'bolt' }, { id: 'ruhe', name: 'Ruhe bewahren', icon: 'pause' }, { id: 'humor', name: 'Humor', icon: 'sparkle' },
    { id: 'zuhoeren', name: 'Zuhören', icon: 'speaker' }, { id: 'planen', name: 'Planen', icon: 'timer' }, { id: 'ideen', name: 'Ideen haben', icon: 'star' },
    { id: 'dran', name: 'Dranbleiben', icon: 'leaf' }, { id: 'hilfe', name: 'Hilfe holen', icon: 'phone' }, { id: 'ehrlich', name: 'Ehrlich sein', icon: 'check' },
    { id: 'team', name: 'Teamgeist', icon: 'users' }, { id: 'fuersorge', name: 'Für andere da sein', icon: 'heart' }, { id: 'fair', name: 'Fair bleiben', icon: 'shield' },
  ];

  /* Mini-Missionen. help = Hilfe-Hinweis. satz (j1-e19) = bremsender Satz, gegen den die Stärke der Beweis ist. */
  const MISSIONEN = [
    { fig: 'mika', mood: 'angst', text: 'Morgen ist der Vortrag. Der Zettel mit den Stichworten ist weg.', satz: '„Ich kann sowas nicht.“' },
    { fig: 'yara', mood: 'wut', text: 'Yaras kleine Schwester wird im Bus von zwei Älteren geärgert. Yara sitzt drei Reihen weiter hinten.', satz: '„Ich bin zu schwach, um was zu tun.“' },
    { fig: 'luca', mood: 'neutral', text: 'Luca ist neu in der Klasse. Erste Pause, alle stehen in Grüppchen. Luca kennt niemanden.', satz: '„Keiner will mich kennenlernen.“' },
    { fig: 'sam', mood: 'traurig', text: 'Sam hat die Mathearbeit verhauen. Die Eltern wissen es noch nicht. Morgen muss die Unterschrift drunter.', satz: '„Ich bin eine Enttäuschung.“' },
    { fig: 'mika', mood: 'genervt', text: 'Im Gruppenchat eskaliert gerade ein Streit um das Projekt. Mika ist in der Gruppe und wird morgen abgefragt.', satz: '„Das wird sowieso Chaos.“' },
    { fig: 'luca', mood: 'angst', text: 'Lucas Kumpel schreibt nachts um eins: „Alles scheiße. Hat eh keinen Sinn mehr.“', help: true, satz: '„Ich darf da nichts falsch machen.“' },
    { fig: 'yara', mood: 'neutral', text: 'Yaras Mannschaft liegt 0:3 hinten, noch 20 Minuten. Zwei Mitspieler wollen schon aufgeben.', satz: '„Wir verlieren immer.“' },
    { fig: 'sam', mood: 'genervt', text: 'Sam hat beim Fahrradfahren eine Delle in ein geparktes Auto gefahren. Niemand hat es gesehen.', satz: '„Ehrlich sein bringt nur Ärger.“' },
    { fig: 'mika', mood: 'traurig', text: 'Mikas bester Freund redet seit drei Tagen nicht mehr mit Mika. Mika weiß nicht, warum.', satz: '„Ich hab bestimmt was kaputt gemacht.“' },
    { fig: 'luca', mood: 'neutral', text: 'Beim Schulfest soll Luca den Stand mit drei Jüngeren leiten. Die hören nicht zu.', satz: '„Auf mich hört keiner.“' },
  ];
  const SATZANFAENGE = ['… setzt [Stärke] ein, indem …', 'Mit [Stärke] würde … zuerst …', '[Stärke] heißt hier: …'];

  /* Stärken-Turm: ein Block pro gesetzter Stärke, von unten nach oben */
  function turm(blocks) {
    return h('div', { class: 'turm', 'aria-label': 'Stärken-Turm mit ' + blocks.length + ' Blöcken' },
      h('div', { class: 'turm-stack' }, blocks.slice().reverse().map((b, i) => { const el = h('div', { class: 'turm-block' + (i === 0 ? ' new' : '') }, CREW.icon(b.icon, 16), h('span', null, b.name)); el.style.setProperty('--fc', b.colour); return el; })),
      h('div', { class: 'turm-boden' }, h('b', null, blocks.length + (blocks.length === 1 ? ' Block' : ' Blöcke'))));
  }
  const missionCard = (ctx, m, label, beweis) => ctx.figureCard({ fig: m.fig, mood: m.mood, text: m.text, eyebrow: label, extra: beweis ? h('div', { class: 'row' }, h('span', { class: 'pill' }, 'Bremsender Satz: ' + m.satz)) : null });

  CREW.registerGame({
    id: 'staerke-einsatz',
    template: 'T5',
    icon: 'bolt',
    themen: ['Stärken', 'Stärken als Werkzeug', 'Ideen anderer aufgreifen'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Das iPad wandert. Wer dran ist, wählt eine Stärke und sagt in einem Satz, wie genau die Figur sie einsetzt. Die nächste Person braucht eine andere Stärke.',
        steps: [
          { icon: 'eye', title: 'Mini-Mission', text: 'Eine Figur steckt in einer Situation.' },
          { icon: 'bolt', title: 'Stärke wählen', text: 'Zwölf Karten. Jede nur einmal pro Mission.' },
          { icon: 'base', title: 'Block in den Turm', text: 'Jede Stärke baut den Turm höher.' },
        ],
        probe: ctx.T.probeCard('Probe: Sam hat den Schlüssel verloren. Welche Stärke? Tippt irgendwas – zählt nicht.', [{ label: 'Ruhe bewahren', value: 1, variant: 'ghost', icon: 'pause' }, { label: 'Hilfe holen', value: 2, variant: 'ghost', icon: 'phone' }]),
      });
      // Stunde: j1-e06 (Baum der Stärke, eigene Karten) oder j1-e19 (bremsender Satz, Stärke als Beweis)
      const wu = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Vorbereitung', small: true })], { eyebrow: 'Vorbereitung', center: true });
      const set = await ctx.ask(wu, [{ label: 'Mein Baum der Stärke (j1-e06)', value: 'e06', variant: 'ghost', icon: 'leaf' }, { label: 'Neue Gedanken ausprobieren (j1-e19)', value: 'e19', variant: 'ghost', icon: 'sparkle' }]);
      const beweis = set === 'e19';
      let karten = STAERKEN.slice();
      if (set === 'e06') {
        // Stärken aus den Bäumen der Crew als eigene Karten (nur im RAM, bis zu vier)
        const inputs = [0, 1, 2, 3].map((i) => h('input', { type: 'text', class: 'se-input', maxlength: '24', placeholder: 'Stärke ' + (i + 1) + ' aus euren Bäumen', 'aria-label': 'Eigene Stärke ' + (i + 1), id: 'se-eigen-' + i }));
        if (ctx.auto) { inputs[0].value = 'Geduld'; }
        const we = ctx.scr([
          ctx.say('Welche Stärken stehen in euren Bäumen? Bis zu vier dazu – als Karten für die Figuren. Nichts wird gespeichert.', { eyebrow: 'Baum-Stärken', small: true }),
          h('div', { class: 'card stack' }, h('div', { class: 'grid two' }, inputs), h('p', { class: 'muted small' }, 'Die Karten gelten für die Figuren, nicht für euch. Leer lassen ist okay.')),
        ], { eyebrow: 'Vorbereitung' });
        const r = await ctx.ask(we, [{ label: 'Ohne eigene Karten', value: 'skip', variant: 'ghost' }, { label: 'Karten dazu', value: 'add', iconRight: 'right' }]);
        if (r === 'add') inputs.map((x) => x.value.trim()).filter(Boolean).slice(0, 4).forEach((t, i) => karten.push({ id: 'eigen' + i, name: t, icon: 'leaf', eigen: true }));
        inputs.forEach((x) => { x.value = ''; });
      }
      const missionen = ctx.rshuffle(MISSIONEN).slice(0, 2);
      const blocks = [];
      let passed = 0, helpShown = false;
      const perMission = Math.max(2, Math.min(4, Math.ceil(ctx.n / missionen.length)));
      for (let mi = 0; mi < missionen.length; mi++) {
        const m = missionen[mi];
        const name = CREW.games.figures[m.fig].name;
        const used = [];
        for (let p = 0; p < perMission; p++) {
          const label = 'Mission ' + (mi + 1) + ' von ' + missionen.length + ' · Person ' + (p + 1);
          const satzAnf = SATZANFAENGE.map((s) => s.replace('…', name).replace('[Stärke]', '…'));
          let pick = null;
          const grid = h('div', { class: 'se-grid' }, karten.map((k) => {
            const b = h('button', { type: 'button', class: 'se-card' + (k.eigen ? ' eigen' : ''), 'data-staerke': k.id, disabled: used.includes(k.id) ? 'disabled' : null }, CREW.icon(k.icon, 24), h('b', null, k.name), used.includes(k.id) ? h('span', { class: 'muted small' }, 'schon im Turm') : null);
            b.addEventListener('click', () => { CREW.sound.play('tap'); pick = k; grid.querySelectorAll('.se-card').forEach((x) => x.classList.toggle('sel', x === b)); });
            return b;
          }));
          if (ctx.auto) { const free = karten.filter((k) => !used.includes(k.id)); pick = free[Math.floor(ctx.autoRng() * free.length)]; }
          const wrap = ctx.scr([
            h('div', { class: 'se-layout' },
              h('div', { class: 'stack' },
                missionCard(ctx, m, label, beweis),
                h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, p === 0 ? 'Welche Stärke hilft ' + name + ' hier?' : 'Eine ANDERE Stärke für dieselbe Mission.'), ctx.readBtn('Stärken: ' + karten.map((k) => k.name).join(', '))), grid),
                h('div', { class: 'card soft stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, beweis ? 'Sag in einem Satz, warum die Stärke den bremsenden Satz widerlegt' : 'Sag in einem Satz, wie genau'), h('div', { class: 'row', style: { gap: '6px' } }, satzAnf.map((s) => h('span', { class: 'chip small' }, s))))),
              turm(blocks)),
          ], { eyebrow: label });
          const r = await ctx.ask(wrap, [{ label: 'Pass, weitergeben', value: 'pass', variant: 'ghost', icon: 'x', auto: false }, { label: 'Gesagt – Block setzen', value: 'ok', iconRight: 'right', id: 'btn-block' }]);
          if (r === 'ok' && pick) {
            used.push(pick.id);
            blocks.push({ name: pick.name, icon: pick.icon, colour: CREW.games.figures[m.fig].colour });
            CREW.sound.play('good');
          } else {
            passed++;
          }
          // Hilfe-Hinweis bei der Nacht-Nachricht: einmal, direkt nach der Mission
          if (m.help && !helpShown) {
            helpShown = true;
            const wh = ctx.scr([
              missionCard(ctx, m, 'Diese Mission ist anders', false),
              ctx.say('Hier reicht keine Stärke allein. Wenn jemand so schreibt, holt ' + name + ' eine erwachsene Person dazu – noch in der Nacht. Das ist kein Petzen, das ist Fürsorge.', { eyebrow: 'Wichtig', small: true }),
              ctx.helpCard({ title: 'Wenn du so eine Nachricht bekommst' }),
            ], { eyebrow: 'Hilfe' });
            await ctx.next(wh, 'Verstanden');
          }
          const last = mi + 1 === missionen.length && p + 1 === perMission;
          if (!last) await ctx.T.passOn({ direction: 'links', extra: h('div', { class: 'row center' }, h('span', { class: 'pill' }, 'Turm: ' + blocks.length + (blocks.length === 1 ? ' Block' : ' Blöcke')), p + 1 < perMission ? h('span', { class: 'pill accent' }, 'Gleiche Mission, andere Stärke') : h('span', { class: 'pill accent' }, 'Neue Mission')) });
        }
      }
      // Turm fertig: Zahl in den Crew-Stand (nur die Zahl, keine Namen) – fürs HQ
      try { const st = CREW.state; st.staerkenTurm = (st.staerkenTurm || 0) + blocks.length; CREW.save(); } catch (e) { /* egal */ }
      const wt = ctx.scr([
        h('div', { class: 'se-layout' },
          h('div', { class: 'stack' }, ctx.say('Euer Stärken-Turm. Eine Mission, viele Werkzeuge. Welche Stärke hättet ihr nicht gedacht?', { eyebrow: 'Turm fertig', small: true }), h('p', { class: 'muted small' }, 'Kurz reden, wer will. Die Blöcke zählen für den Stärken-Turm im HQ.'), ctx.safetyLine('freiwillig')),
          turm(blocks)),
      ], { eyebrow: 'Turm' });
      if (blocks.length >= 4 && !ctx.fast) CREW.ui.confetti(80);
      await ctx.next(wt, 'Fertig');
      return { summary: blocks.length ? 'Turm mit ' + blocks.length + ' Blöcken. Stärken sind Werkzeuge, keine Etiketten.' : 'Heute nur reingeschaut. Auch okay.', stats: [[blocks.length, 'Blöcke'], [passed, 'mal gepasst']], help: helpShown };
    },
  });
})();
