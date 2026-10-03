/* Spiel „Tank-Detektiv“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T3 Zu zweit an einem iPad · j1-e04, j1-e29
   Eine Figur zeigt Verhalten (schnappt bei jedem Kommentar, scrollt seit zwei Stunden, hängt nur im Zimmer).
   Das Paar einigt sich mit zwei Fingern, welcher der sechs Tanks leer ist, und wählt dann den kleinsten
   Schritt, der ihn füllt. Bei einem Wunsch statt Bedürfnis („neue Sneaker“) bleibt der Tank leer –
   „Rückfrage nötig“, nie „falsch“. Detektiv, nicht Patient: Es geht immer um die Figur.
   Variante j1-e04: Fall 3 ist der Sneaker-Wunsch, Schlussrunde mit zwei Chips aus „Was steckt dahinter?“.
   Variante j1-e29: Fälle rund um Schlaf, Essen, Bewegung, Bildschirm (Gesund-Plan). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Die sechs Tanks (aus „Das Glas der Bedürfnisse“) */
  const TANKS = [
    { id: 'ruhe', name: 'Ruhe', icon: 'pause', colour: '#4cc9f0', desc: 'Schlaf, Pause, Erholung' },
    { id: 'naehe', name: 'Dazugehören', icon: 'users', colour: '#ff4fa3', desc: 'Freunde, Nähe, Zusammensein' },
    { id: 'gesehen', name: 'Gesehen werden', icon: 'eye', colour: '#ffc93c', desc: 'Lob, Beachtung, zählen' },
    { id: 'sicher', name: 'Sicherheit', icon: 'shield', colour: '#2ee6c5', desc: 'wissen, was kommt; keine Angst' },
    { id: 'bewegung', name: 'Bewegung & Spaß', icon: 'bolt', colour: '#b48bff', desc: 'raus, toben, lachen' },
    { id: 'frei', name: 'Selbst bestimmen', icon: 'star', colour: '#3da5ff', desc: 'selbst entscheiden, nicht nur Regeln' },
  ];
  const tank = (id) => TANKS.find((t) => t.id === id);
  // Eigene CSS-Variable setzen (h() kennt keine --Variablen)
  const cv = (el, k, v) => { el.style.setProperty(k, v); return el; };

  /* Fälle: Verhalten als Signal. tank = leerer Tank. steps: der kleinste Schritt ist „best“, einer ist zu groß,
     einer füllt einen anderen Tank. wunsch = Wunsch statt Bedürfnis → Rückfrage nötig; dahinter = möglicher Tank. */
  const FAELLE = [
    { id: 'schnappt', fig: 'mika', mood: 'genervt', set: 'basis', text: 'Mika schnappt heute bei jedem Kommentar. „Lass mich!“ – schon beim dritten Satz. Gestern Abend war das Handy bis zwei Uhr an.', signal: 'kurz angebunden, Augenringe, laut', tank: 'ruhe',
      steps: [{ label: 'Heute Abend Handy um 22 Uhr raus aus dem Zimmer', best: true }, { label: 'Ab jetzt jeden Tag um 20 Uhr schlafen', big: true }, { label: 'Mit allen Freunden darüber reden', other: 'naehe' }] },
    { id: 'scrollt', fig: 'luca', mood: 'neutral', set: 'basis', text: 'Luca scrollt seit zwei Stunden. Nicht, weil es Spaß macht. Eher, weil im Klassenchat heute wieder niemand auf Lucas Nachricht reagiert hat.', signal: 'scrollt ohne zu lächeln, checkt alle zwei Minuten den Chat', tank: 'naehe',
      steps: [{ label: 'Einer Person schreiben: „Hast du Lust, morgen was zu machen?“', best: true }, { label: 'Den Klassenchat verlassen', big: true }, { label: 'Zwei Stunden draußen laufen', other: 'bewegung' }] },
    { id: 'zimmer', fig: 'yara', mood: 'traurig', set: 'basis', text: 'Yara hängt seit Tagen nur im Zimmer. Beim Essen kaum ein Wort. Vorletzte Woche hat Yaras beste Freundin die Schule gewechselt.', signal: 'zieht sich zurück, antwortet knapp', tank: 'naehe',
      steps: [{ label: 'Der Freundin eine Sprachnachricht schicken, zwei Sätze', best: true }, { label: 'Sofort neue beste Freunde finden', big: true }, { label: 'Ein Nickerchen machen', other: 'ruhe' }] },
    { id: 'sneaker', fig: 'sam', mood: 'genervt', set: 'basis', text: 'Sam will unbedingt die neuen Sneaker. 180 Euro. „Alle haben die.“ Sam redet seit drei Tagen von nichts anderem.', signal: 'will etwas haben, redet nur davon', wunsch: 'Neue Sneaker (180 €)', dahinter: ['naehe', 'gesehen'],
      rueckfrage: 'Was wäre anders, wenn du sie hättest? Was würde dann passieren?', antwort: 'Sam: „Dann … würden die anderen mich endlich mal sehen. Im Team zählen alle, nur ich nicht.“',
      steps: [{ label: 'Im Training einmal laut einen Spielzug vorschlagen', best: true }, { label: 'Kapitän werden', big: true }, { label: 'Die Sneaker auf Raten kaufen', wunsch: true }] },
    { id: 'kontrolle', fig: 'mika', mood: 'angst', set: 'basis', text: 'Mika fragt die Lehrkraft fünfmal am Tag, was morgen drankommt. Nach dem Stundenplan-Wechsel ist Mika seit einer Woche angespannt.', signal: 'fragt oft nach, kaut an den Nägeln', tank: 'sicher',
      steps: [{ label: 'Den Plan für morgen abends einmal aufschreiben', best: true }, { label: 'Den ganzen Monat durchplanen', big: true }, { label: 'Zum Fußball gehen', other: 'bewegung' }] },
    { id: 'zappelt', fig: 'luca', mood: 'genervt', set: 'basis', text: 'Luca sitzt seit der dritten Stunde still. Jetzt wippt das Bein, der Stift fällt zum vierten Mal runter, Luca lacht über alles.', signal: 'wippt, lacht viel, kann nicht sitzen', tank: 'bewegung',
      steps: [{ label: 'In der Pause einmal um das Schulgebäude laufen', best: true }, { label: 'Dreimal die Woche ins Fitnessstudio', big: true }, { label: 'Allein ins stille Zimmer', other: 'ruhe' }] },
    { id: 'regeln', fig: 'yara', mood: 'wut', set: 'basis', text: 'Yara explodiert, als Papa sagt: „Du machst erst Hausaufgaben, dann Handy.“ Zuhause wird gerade alles vorgeschrieben: Essen, Klamotten, Zeiten.', signal: 'knallt Türen, sagt „immer entscheidest du“', tank: 'frei',
      steps: [{ label: 'Papa fragen: „Darf ich die Reihenfolge heute selbst wählen?“', best: true }, { label: 'Ab jetzt alle Regeln selbst machen', big: true }, { label: 'Mit Freunden ins Kino', other: 'naehe' }] },
    { id: 'konsole', fig: 'luca', mood: 'neutral', set: 'basis', text: 'Luca will die neue Konsole. „Dann wird alles besser.“ Dabei liegt die alte seit Wochen unbenutzt im Schrank.', signal: 'will etwas haben, redet von „dann wird alles gut“', wunsch: 'Neue Konsole', dahinter: ['naehe', 'bewegung'],
      rueckfrage: 'Was würdest du damit machen – und mit wem?', antwort: 'Luca: „Online zocken mit Sam und den anderen. Die spielen seit Wochen ohne mich.“',
      steps: [{ label: 'Sam fragen, ob man bei ihm mitspielen kann', best: true }, { label: 'Eine eigene Online-Gruppe gründen', big: true }, { label: 'Die Konsole auf Pump kaufen', wunsch: true }] },
    { id: 'lob', fig: 'sam', mood: 'traurig', set: 'basis', text: 'Sam gibt beim Projekt alles, zwei Wochen lang. Die Lehrkraft lobt am Ende die Gruppe. Sam sagt seitdem: „Bringt eh nichts.“', signal: 'macht nur noch das Nötigste, zuckt mit den Schultern', tank: 'gesehen',
      steps: [{ label: 'Der Lehrkraft einmal sagen, welchen Teil Sam gemacht hat', best: true }, { label: 'Beim nächsten Projekt alles allein machen', big: true }, { label: 'Früher schlafen gehen', other: 'ruhe' }] },
    /* Gesund-Set (j1-e29): Schlaf, Essen, Bewegung, Bildschirm */
    { id: 'fruehstueck', fig: 'mika', mood: 'genervt', set: 'gesund', text: 'Mika ist in der dritten Stunde unkonzentriert und gereizt. Frühstück: ausgefallen. Mittag: ein Riegel. Das geht seit Wochen so.', signal: 'zittrig, gereizt, kann sich nicht konzentrieren', tank: 'ruhe',
      steps: [{ label: 'Morgen eine Banane in den Rucksack legen', best: true }, { label: 'Ab jetzt jeden Tag gesund kochen', big: true }, { label: 'Allen vom Hunger erzählen', other: 'naehe' }] },
    { id: 'serie', fig: 'yara', mood: 'neutral', set: 'gesund', text: 'Yara schaut jede Nacht Serien bis drei Uhr. „Ich kann eh nicht schlafen.“ Tagsüber schläft Yara im Bus ein.', signal: 'müde, Serie als Einschlafhilfe, schläft im Bus', tank: 'ruhe',
      steps: [{ label: 'Heute eine Folge weniger, Bildschirm um Mitternacht aus', best: true }, { label: 'Serien komplett löschen', big: true }, { label: 'Mit Freunden gemeinsam schauen', other: 'naehe' }] },
    { id: 'energy', fig: 'sam', mood: 'wut', set: 'gesund', text: 'Sam trinkt drei Energy-Drinks am Tag, um fit zu sein, und rastet trotzdem bei Kleinigkeiten aus. Sport hat Sam vor zwei Monaten aufgehört.', signal: 'zittrig, Herz rast, schnell wütend', tank: 'bewegung',
      steps: [{ label: 'Einmal die Woche mit Luca zum Bolzplatz', best: true }, { label: 'Sofort wieder Leistungssport', big: true }, { label: 'Einen Energy-Drink mehr', wunsch: true }] },
    { id: 'kamera', fig: 'luca', mood: 'angst', set: 'gesund', text: 'Luca will eine neue Handy-Kamera, „damit die Fotos endlich gut aussehen“. Luca postet seit Wochen nichts mehr und schaut nur, was andere posten.', signal: 'vergleicht sich, postet nichts mehr', wunsch: 'Neues Handy mit besserer Kamera', dahinter: ['gesehen', 'sicher'],
      rueckfrage: 'Was soll mit besseren Fotos anders werden?', antwort: 'Luca: „Dann … lachen die anderen nicht. Dann bin ich okay so, wie ich bin.“',
      steps: [{ label: 'Einer Person ein Foto zeigen, der Luca vertraut', best: true }, { label: 'Nie wieder etwas posten', big: true }, { label: 'Das Handy auf Raten kaufen', wunsch: true }] },
  ];

  /* Die sechs Tanks als Tipp-Fläche. onPick(id). Rückgabe { el, mark(id, state) } */
  function tankGrid(ctx, o) {
    const oo = o || {};
    const els = {};
    const el = h('div', { class: 'tank-grid' }, TANKS.map((t) => {
      const b = cv(h('button', { type: 'button', class: 'tank', 'data-tank': t.id, 'aria-label': 'Tank ' + t.name + ': ' + t.desc },
        h('span', { class: 'tank-glass' }, h('i')),
        h('span', { class: 'tank-ic' }, CREW.icon(t.icon, 22)),
        h('b', null, t.name),
        h('span', { class: 'muted small' }, t.desc)), '--tk', t.colour);
      if (oo.onPick) b.addEventListener('click', () => { CREW.sound.play('tap'); el.querySelectorAll('.tank').forEach((x) => x.classList.toggle('sel', x === b)); oo.onPick(t.id); });
      else b.disabled = true;
      els[t.id] = b;
      return b;
    }));
    return { el, mark: (id, state) => { const b = els[id]; if (b) { b.dataset.state = state; } }, sel: (id) => { Object.values(els).forEach((x) => x.classList.toggle('sel', x.dataset.tank === id)); } };
  }

  function fallCard(ctx, f, i, total) {
    return ctx.figureCard({ fig: f.fig, mood: f.mood, text: f.text, eyebrow: 'Fall ' + (i + 1) + ' von ' + total + ' · Detektiv-Akte',
      extra: h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill' }, CREW.icon('eye', 16), ' Signal: ' + f.signal), f.wunsch ? h('span', { class: 'pill accent' }, 'Wunsch: ' + f.wunsch) : null) });
  }

  /* Ein Fall: Tank wählen (zwei Finger) → Wunsch? Rückfrage → kleinster Schritt (zwei Finger) → Tank füllt sich */
  async function fall(ctx, f, i, total, stats) {
    const name = CREW.games.figures[f.fig].name;
    // 1) Welcher Tank ist leer?
    let picked = null;
    const grid = tankGrid(ctx, { onPick: (id) => { picked = id; } });
    if (ctx.auto) { picked = ctx.autoRng() < 0.6 && f.tank ? f.tank : TANKS[Math.floor(ctx.autoRng() * 6)].id; grid.sel(picked); }
    const w1 = ctx.scr([
      fallCard(ctx, f, i, total),
      h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Welcher Tank ist bei ' + name + ' leer? Einigt euch.'), ctx.readBtn('Welcher Tank ist leer? ' + TANKS.map((t) => t.name + ': ' + t.desc).join('. '))), grid.el),
    ], { eyebrow: 'Fall ' + (i + 1) + ' · Tank' });
    const ok = await ctx.T.twoFinger(w1, { label: 'Beide: Finger drauf, wenn ihr euch einig seid', hint: 'Erst einen Tank antippen. Dann zwei Finger, kurz halten.' });
    if (ok === ctx.SKIP) return;
    if (!picked) { picked = f.tank || (f.dahinter && f.dahinter[0]); }
    stats.faelle++;

    // 2) Wunsch statt Bedürfnis: Der Tank bleibt leer – Rückfrage nötig
    if (f.wunsch) {
      stats.wuensche++;
      const g2 = tankGrid(ctx); g2.sel(picked); g2.mark(picked, 'empty');
      const w2 = ctx.scr([
        h('div', { class: 'row center' }, h('span', { class: 'pill teamB', style: { fontSize: '1.1em' } }, 'Rückfrage nötig')),
        ctx.figureCard({ fig: f.fig, mood: 'neutral', text: '„' + f.wunsch + '“ ist ein Wunsch. Ein Wunsch füllt keinen Tank von allein. Fragt ' + name + ' nach: „' + f.rueckfrage + '“', eyebrow: 'Der Tank bleibt leer' }),
        h('div', { class: 'card stack' }, h('b', null, 'Eine Person liest die Rückfrage laut vor. Dann tippt auf „' + name + ' antwortet“.'), h('p', { class: 'muted small' }, 'Nicht falsch – nur noch nicht fertig ermittelt.')),
      ], { eyebrow: 'Fall ' + (i + 1) + ' · Rückfrage' });
      const r2 = await ctx.next(w2, name + ' antwortet');
      if (r2 === ctx.SKIP) return;
      // Nach der Antwort: Welcher Tank steckt dahinter? (mehrere passen)
      let picked2 = null;
      const g3 = tankGrid(ctx, { onPick: (id) => { picked2 = id; } });
      if (ctx.auto) { picked2 = f.dahinter[0]; g3.sel(picked2); }
      const w3 = ctx.scr([
        ctx.figureCard({ fig: f.fig, mood: 'traurig', text: f.antwort, eyebrow: 'Antwort auf die Rückfrage' }),
        h('div', { class: 'card stack' }, h('b', null, 'Jetzt nochmal: Welcher Tank steckt dahinter?'), g3.el),
      ], { eyebrow: 'Fall ' + (i + 1) + ' · Dahinter' });
      const ok3 = await ctx.T.twoFinger(w3, { label: 'Beide: Finger drauf' });
      if (ok3 === ctx.SKIP) return;
      picked = picked2 || f.dahinter[0];
      if (f.dahinter.includes(picked)) stats.treffer++;
    } else if (picked === f.tank) {
      stats.treffer++;
    }

    // 3) Der kleinste Schritt, der den Tank füllt
    const t = tank(picked);
    const spur = f.wunsch ? (f.dahinter.includes(picked) ? 'Das passt zur Antwort.' : 'Hm, ' + name + ' hat etwas anderes gesagt. Vielleicht nochmal hinhören.') : picked === f.tank ? 'Das passt zum Signal.' : 'Möglich. Das Signal „' + f.signal + '“ zeigt eher auf „' + tank(f.tank).name + '“. Beides ist eine Spur.';
    const steps = ctx.rshuffle(f.steps);
    const w4 = ctx.scr([
      h('div', { class: 'row', style: { gap: '10px', alignItems: 'center' } }, cv(h('span', { class: 'tank mini' }, h('span', { class: 'tank-glass' }, h('i')), h('span', { class: 'tank-ic' }, CREW.icon(t.icon, 18))), '--tk', t.colour), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Euer Tank'), h('b', null, t.name)), h('span', { class: 'muted small' }, spur)),
      ctx.say('Welcher Schritt füllt den Tank „' + t.name + '“ – und ist so klein, dass ' + name + ' ihn heute noch schafft?', { eyebrow: 'Der kleinste Schritt', small: true }),
    ], { eyebrow: 'Fall ' + (i + 1) + ' · Schritt' });
    let stepPick = null;
    const row = h('div', { class: 'stack' }, steps.map((s) => { const b = h('button', { type: 'button', class: 'chip', style: { justifyContent: 'flex-start', textAlign: 'left' } }, s.label); b.addEventListener('click', () => { CREW.sound.play('tap'); stepPick = s; row.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x === b)); }); return b; }));
    w4.appendChild(h('div', { class: 'card' }, row));
    if (ctx.auto) { stepPick = steps[Math.floor(ctx.autoRng() * steps.length)]; }
    const ok4 = await ctx.T.twoFinger(w4, { label: 'Beide: Finger drauf', hint: 'Erst einen Schritt antippen, dann zwei Finger.' });
    if (ok4 === ctx.SKIP) return;
    if (!stepPick) stepPick = steps[0];
    // Ergebnis: Tank füllt sich (ganz, halb oder gar nicht)
    const level = stepPick.best ? 3 : stepPick.big ? 1 : 0;
    if (stepPick.best) stats.klein++;
    const g5 = tankGrid(ctx); g5.sel(picked); g5.mark(picked, level === 3 ? 'full' : level === 1 ? 'half' : 'empty');
    const fb = stepPick.best ? name + ' schafft das heute. Der Tank füllt sich. Klein gewinnt.'
      : stepPick.big ? 'Zu groß. ' + name + ' fängt gar nicht erst an – der Tank bekommt nur ein paar Tropfen. Welcher Schritt wäre kleiner?'
      : stepPick.wunsch ? 'Der Wunsch wird erfüllt – und der Tank bleibt leer. Morgen wünscht sich ' + name + ' das Nächste.'
      : 'Das füllt einen anderen Tank („' + tank(stepPick.other).name + '“). Nicht schlecht, aber ' + name + ' braucht gerade „' + t.name + '“.';
    const w5 = ctx.scr([
      g5.el,
      ctx.figureCard({ fig: f.fig, mood: level === 3 ? 'froh' : level === 1 ? 'neutral' : 'genervt', text: fb, eyebrow: level === 3 ? 'Tank voll' : level === 1 ? 'Ein paar Tropfen' : 'Tank bleibt leer' }),
      level < 3 ? h('p', { class: 'muted small' }, 'Der kleinste Schritt wäre: „' + f.steps.find((s) => s.best).label + '“') : null,
    ], { eyebrow: 'Fall ' + (i + 1) + ' · Ergebnis' });
    if (level === 3) CREW.sound.play('great');
    await ctx.next(w5, i + 1 < total ? 'Nächster Fall' : 'Weiter');
  }

  CREW.registerGame({
    id: 'tank-detektiv',
    template: 'T3',
    icon: 'eye',
    themen: ['Bedürfnisse', 'Wunsch vs. Bedürfnis', 'Kleine Schritte', 'Verhalten als Signal'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit: Eine Figur zeigt Verhalten. Findet den leeren Tank und den kleinsten Schritt, der ihn füllt. Bestätigt mit zwei Fingern.',
        steps: [
          { icon: 'eye', title: 'Signal lesen', text: 'Verhalten ist eine Spur, keine Diagnose.' },
          { icon: 'users', title: 'Tank wählen', text: 'Sechs Tanks. Einigt euch, zwei Finger drauf.' },
          { icon: 'leaf', title: 'Kleinster Schritt', text: 'So klein, dass die Figur heute anfängt.' },
        ],
        probe: async () => {
          const g = tankGrid(ctx, { onPick: () => {} });
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), ctx.say('Probe: Sam gähnt seit der ersten Stunde. Tippt irgendeinen Tank an, dann beide Finger drauf.', { eyebrow: 'Zum Ausprobieren', small: true }), g.el], { eyebrow: 'Probe' });
          await ctx.T.twoFinger(w, { label: 'Probe: beide Finger drauf' });
        },
      });
      // Stunde wählen: Basis-Fälle (j1-e04) oder Gesund-Fälle (j1-e29)
      const wu = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Fälle wählen', small: true }), h('p', { class: 'muted small' }, 'Beide Sets haben Fälle mit Wunsch statt Bedürfnis.')], { eyebrow: 'Vorbereitung', center: true });
      const set = await ctx.ask(wu, [{ label: 'Glas der Bedürfnisse (j1-e04)', value: 'basis', variant: 'ghost', icon: 'star' }, { label: 'Gesund und stark (j1-e29)', value: 'gesund', variant: 'ghost', icon: 'leaf' }]);
      const which = set === 'gesund' ? 'gesund' : 'basis';
      let pool;
      if (which === 'gesund') {
        pool = ctx.rshuffle(FAELLE.filter((f) => f.set === 'gesund')).slice(0, 3);
      } else {
        // j1-e04: zwei Bedürfnis-Fälle, Fall 3 ist der Sneaker-Wunsch
        const needs = ctx.rshuffle(FAELLE.filter((f) => f.set === 'basis' && !f.wunsch)).slice(0, 2);
        pool = needs.concat([FAELLE.find((f) => f.id === 'sneaker')]);
      }
      const stats = { faelle: 0, treffer: 0, klein: 0, wuensche: 0 };
      for (let i = 0; i < pool.length; i++) await fall(ctx, pool[i], i, pool.length, stats);

      // Schlussrunde: zwei Chips aus „Was steckt dahinter?“ – Wunsch oder Bedürfnis? (nur reden, kein Zählen)
      const dahinter = ctx.rshuffle([
        { text: 'Mehr Follower', fig: 'yara' }, { text: 'Endlich mal Ruhe', fig: 'mika' }, { text: 'Neue Konsole', fig: 'luca' }, { text: 'Dass jemand fragt, wie es mir geht', fig: 'sam' }, { text: 'Ein eigenes Zimmer', fig: 'yara' }, { text: 'Freitag frei', fig: 'luca' },
      ]).slice(0, 2);
      const w6 = ctx.scr([
        ctx.say('Schlussrunde: Zwei Wünsche. Sagt euch gegenseitig in einem Satz: Welcher Tank steckt dahinter?', { eyebrow: 'Was steckt dahinter?', small: true }),
        h('div', { class: 'grid two' }, dahinter.map((d) => ctx.figureCard({ fig: d.fig, mood: 'neutral', text: '„Ich will ' + d.text.charAt(0).toLowerCase() + d.text.slice(1) + '.“', eyebrow: 'Wunsch', size: 72 }))),
        h('div', { class: 'row' }, TANKS.map((t) => h('span', { class: 'chip small', style: { background: 'color-mix(in srgb, ' + t.colour + ' 30%, var(--bg))' } }, CREW.icon(t.icon, 14), ' ' + t.name))),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Schlussrunde' });
      await ctx.ask(w6, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }, { label: 'Beide gesagt', value: 'done', iconRight: 'right' }]);
      return {
        summary: stats.faelle ? 'Detektiv-Arbeit: Verhalten ist ein Signal. Ein Wunsch braucht eine Rückfrage, ein Tank einen kleinen Schritt.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[stats.faelle, 'Fälle'], [stats.klein, 'kleinste Schritte'], [stats.wuensche, 'Rückfragen']],
      };
    },
  });
})();
