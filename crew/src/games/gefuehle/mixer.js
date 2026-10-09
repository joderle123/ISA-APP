/* Spiel „Gefühls-Mixer“ (Thema: Gefühle verstehen) · Vorlage T1 Solo + Austausch · j1-e10 „Gemischte Gefühle“
   Zu einer Situation (Situationen wie vom Emotionswürfel, per Tagescode gleich auf allen iPads) mischst du am
   DJ-Pult zwei bis drei Gefühle mit Reglern 0–10. Der Mix wird Farbe und Klang (leise, offline, WebAudio).
   Level: 1) Mischen, 2) Umschlagen (neue Info – was steigt, was sinkt?), 3) Mix raten: iPads tauschen, den Mix des
   anderen nur hören und sehen und raten, welcher Regler oben war – erst dann die Vergleichskarte.
   Überschrift beim Aufdecken: „Beide Mixe sind richtig.“ Nichts wird gespeichert. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;

  const LEVELS = ['Mischen', 'Umschlagen', 'Mix raten'];
  const MAX_AN = 3;

  /* Gefühle am Pult (Farben wie im Pult-Tausch, wo es sie dort gibt) */
  const GEF = [
    { id: 'freude', name: 'Freude', kurz: 'Freude', col: '#ffc93c', ink: '#2a1d00', icon: 'star', tempo: 6 },
    { id: 'trauer', name: 'Traurigkeit', kurz: 'Trauer', col: '#4c8dff', ink: '#ffffff', icon: 'heart', tempo: 14 },
    { id: 'wut', name: 'Wut', kurz: 'Wut', col: '#ff4d4d', ink: '#ffffff', icon: 'bolt', tempo: 3 },
    { id: 'angst', name: 'Angst', kurz: 'Angst', col: '#b48bff', ink: '#1a0a3a', icon: 'shield', tempo: 4 },
    { id: 'stolz', name: 'Stolz', kurz: 'Stolz', col: '#ff9a3c', ink: '#2a1200', icon: 'trophy', tempo: 8 },
    { id: 'erleichterung', name: 'Erleichterung', kurz: 'Erleichtert', col: '#2ee6c5', ink: '#003a30', icon: 'leaf', tempo: 11 },
    { id: 'vorfreude', name: 'Vorfreude', kurz: 'Vorfreude', col: '#ff6fd8', ink: '#2b0418', icon: 'sparkle', tempo: 5 },
    { id: 'unsicher', name: 'Unsicherheit', kurz: 'Unsicher', col: '#9aa3c7', ink: '#10142a', icon: 'help', tempo: 9 },
  ];
  const G = Object.fromEntries(GEF.map((g) => [g.id, g]));

  /* Situationen (Emotionswürfel). twist = neue Info für Level 2; hoch/runter = was viele dann verschieben (nie „richtig“) */
  const SITUATIONEN = [
    { id: 'ferien', fig: 'mika', mood: 'froh', titel: 'Letzter Schultag', text: 'Letzter Schultag vor den Sommerferien. Mika hat das Zeugnis in der Hand. Frau K., die Lieblingslehrerin, geht danach in Rente.',
      twist: 'Frau K. sagt zum Abschied: „Ich komm im Herbst zum Schulfest. Versprochen.“', hoch: ['freude', 'erleichterung'], runter: ['trauer'] },
    { id: 'umzug', fig: 'sam', mood: 'traurig', titel: 'Umzug', text: 'Sams Familie zieht in eine andere Stadt. Sam bekommt ein eigenes Zimmer – aber die Freunde bleiben hier.',
      twist: 'Sams bester Freund sagt: „In den Ferien komm ich dich besuchen. Zwei Wochen.“', hoch: ['vorfreude', 'freude'], runter: ['trauer', 'angst'] },
    { id: 'date', fig: 'yara', mood: 'ueberrascht', titel: 'Erstes Date', text: 'Yara hat zum ersten Mal ein Date. Kino um 18 Uhr. Es ist 17:30 und Yara steht vor dem Spiegel.',
      twist: 'Eine Nachricht kommt: „Bin schon da, hab Popcorn für uns beide 😊“', hoch: ['freude', 'vorfreude'], runter: ['unsicher', 'angst'] },
    { id: 'finale', fig: 'luca', mood: 'froh', titel: 'Das Finale', text: 'Lucas Team gewinnt das Finale. Lucas bester Freund spielt im anderen Team – und weint auf der Bank.',
      twist: 'Der Freund kommt rüber: „Glückwunsch. Nächstes Jahr holen wir euch.“ Er grinst schon wieder.', hoch: ['freude', 'erleichterung'], runter: ['trauer', 'unsicher'] },
    { id: 'hund', fig: 'sam', mood: 'froh', titel: 'Der Hund', text: 'Sam darf endlich einen Hund haben. Dafür muss Sam ab jetzt jeden Morgen um sechs Uhr raus.',
      twist: 'Am ersten Abend schläft der Hund auf Sams Füßen ein.', hoch: ['freude'], runter: ['unsicher', 'wut'] },
    { id: 'neueschule', fig: 'luca', mood: 'neutral', titel: 'Neue Schule', text: 'Luca wechselt nach den Ferien auf eine neue Schule. Luca hat sie sich selbst ausgesucht.',
      twist: 'Beim Kennenlerntag sitzt Luca neben jemandem, der auch Fußball spielt.', hoch: ['vorfreude', 'erleichterung'], runter: ['angst', 'unsicher'] },
    { id: 'solo', fig: 'yara', mood: 'angst', titel: 'Das Solo', text: 'Yara singt beim Schulfest ein Solo. Gleich geht der Vorhang auf.',
      twist: 'Der erste Ton sitzt. Ganz vorne winkt Yaras kleiner Bruder.', hoch: ['stolz', 'freude'], runter: ['angst'] },
  ];

  /* ---------- Klang: jedes Gefühl ist eine Spur, die Lautstärke folgt dem Regler ---------- */
  const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI → Hz
  function spielMix(ctx, mix, sek) {
    const m = CREW.skillsKit.klang.mixer(ctx, { vol: 0.45 });
    if (!m.ok) return m;
    const lv = (id) => (mix[id] || 0) / 10;
    // Freude: helles Arpeggio
    if (lv('freude')) { const b = m.bus(0.22 * lv('freude')); const seq = [72, 76, 79, 84, 79, 76]; let k = 0; m.every(190, () => { m.tone(b, NOTE(seq[k++ % seq.length]), 0, 0.22, 'triangle', 0.5); }); }
    // Traurigkeit: tiefer Moll-Teppich, langsam fallender Ton
    if (lv('trauer')) { const b = m.bus(0.16 * lv('trauer')); const lp = m.filter('lowpass', 900, 0.7, b); [45, 48, 52].forEach((n) => m.osc('sine', NOTE(n), lp)); m.every(1700, () => m.tone(b, NOTE(64), 0, 1.5, 'sine', 0.35, NOTE(60))); }
    // Wut: knurrender Puls
    if (lv('wut')) { const b = m.bus(0.2 * lv('wut')); const lp = m.filter('lowpass', 420, 4, b); const g = m.ac.createGain(); g.gain.value = 0; g.connect(lp); m.osc('sawtooth', 55, g); m.osc('sawtooth', 82.4, g); m.lfo(g.gain, 4, 0.5, 0.5); }
    // Angst: hohes Flirren mit Schwebung
    if (lv('angst')) { const b = m.bus(0.05 * lv('angst')); const g = m.ac.createGain(); g.gain.value = 0; g.connect(b); m.osc('sine', 880, g); m.osc('sine', 931, g); m.lfo(g.gain, 6.5, 0.5, 0.5); }
    // Stolz: warme Quinte und kleine Fanfare
    if (lv('stolz')) { const b = m.bus(0.1 * lv('stolz')); const lp = m.filter('lowpass', 1400, 0.7, b); m.osc('square', NOTE(55), lp); m.osc('square', NOTE(62), lp); m.every(1250, () => { m.tone(b, NOTE(67), 0, 0.25, 'triangle', 0.6); m.tone(b, NOTE(74), 0.22, 0.5, 'triangle', 0.6); }); }
    // Erleichterung: weiche Glocken, die nach unten gehen
    if (lv('erleichterung')) { const b = m.bus(0.22 * lv('erleichterung')); const seq = [76, 72, 69, 67]; let k = 0; m.every(900, () => { m.tone(b, NOTE(seq[k++ % seq.length]), 0, 1.2, 'sine', 0.45); }); }
    // Vorfreude: steigende Tonleiter, immer wieder von vorn
    if (lv('vorfreude')) { const b = m.bus(0.18 * lv('vorfreude')); const seq = [72, 74, 76, 79, 81, 84]; let k = 0; m.every(160, () => { const i = k++ % 9; if (i < seq.length) m.tone(b, NOTE(seq[i]), 0, 0.16, 'triangle', 0.45); }); }
    // Unsicherheit: zufällige Töne mit Zittern
    if (lv('unsicher')) { const b = m.bus(0.16 * lv('unsicher')); const pent = [62, 65, 67, 70, 72, 74]; m.every(420, () => { if (Math.random() < 0.6) m.tone(b, NOTE(pent[Math.floor(Math.random() * pent.length)]), 0, 0.5, 'sine', 0.4, NOTE(pent[0]) * (1 + Math.random() * 0.02)); }); }
    setTimeout(() => m.stop(900), (sek || 6) * 1000);
    return m;
  }

  /* ---------- Bausteine: Regler, Farb-Mix, Balken ---------- */
  const anzahlAn = (mix) => Object.values(mix).filter((v) => v > 0).length;
  const top = (mix) => { const max = Math.max(0, ...Object.values(mix)); return max ? Object.keys(mix).filter((k) => mix[k] === max) : []; };

  // Farb-Mix als drehende Scheibe: Anteile wie die Regler, Tempo vom stärksten Gefühl
  function blob(mix, o) {
    const oo = o || {};
    const an = GEF.filter((g) => mix[g.id] > 0);
    const sum = an.reduce((a, g) => a + mix[g.id], 0) || 1;
    let acc = 0;
    const stops = an.map((g) => { const a = acc; acc += (mix[g.id] / sum) * 100; return g.col + ' ' + a.toFixed(1) + '% ' + acc.toFixed(1) + '%'; });
    const dom = an.slice().sort((a, b) => mix[b.id] - mix[a.id])[0];
    const el = h('div', { class: 'mx-blob' + (oo.small ? ' small' : '') + (oo.spielt ? ' spielt' : ''), role: 'img', 'aria-label': oo.verdeckt ? 'Farb-Mix' : 'Mix: ' + an.map((g) => g.name + ' ' + mix[g.id]).join(', '),
      style: { '--mx': an.length ? 'conic-gradient(' + stops.join(', ') + ')' : 'var(--panel2)', '--mx-tempo': (dom ? dom.tempo : 8) + 's' } }, h('i'));
    return el;
  }
  // Balken (Equalizer) mit Namen
  function balken(mix, o) {
    const oo = o || {};
    const an = GEF.filter((g) => mix[g.id] > 0 || (oo.vorher && oo.vorher[g.id] > 0));
    return h('div', { class: 'mx-bars' }, an.map((g) => {
      const v = mix[g.id] || 0;
      const d = oo.vorher ? v - (oo.vorher[g.id] || 0) : 0;
      return h('div', { class: 'mx-bar', style: { '--fc': g.col, '--fi': g.ink } },
        h('span', { class: 'mx-bar-n' }, CREW.icon(g.icon, 16), ' ' + g.name),
        h('span', { class: 'mx-bar-t' }, h('i', { style: { width: v * 10 + '%' } })),
        h('b', null, String(v)),
        oo.vorher ? h('span', { class: 'mx-delta' + (d > 0 ? ' up' : d < 0 ? ' down' : '') }, d > 0 ? '+' + d : d < 0 ? String(d) : '±0') : null);
    }));
  }

  /* Ein Regler (Kanal am Pult): ziehen oder tippen, Pfeiltasten gehen auch */
  function kanal(g, mix, onTry) {
    let v = mix[g.id] || 0;
    const fill = h('i', { class: 'mx-fill' });
    const num = h('b', { class: 'mx-num' }, String(v));
    const track = h('div', { class: 'mx-track', role: 'slider', tabindex: '0', 'aria-label': g.name, 'aria-valuemin': '0', 'aria-valuemax': '10' }, fill);
    const el = h('div', { class: 'mx-ch', 'data-gef': g.id, style: { '--fc': g.col, '--fi': g.ink } }, num, track, h('span', { class: 'mx-ic' }, CREW.icon(g.icon, 18)), h('span', { class: 'mx-name' }, g.kurz));
    const draw = () => { fill.style.height = v * 10 + '%'; num.textContent = String(v); track.setAttribute('aria-valuenow', String(v)); el.classList.toggle('an', v > 0); };
    const set = (n) => {
      n = Math.max(0, Math.min(10, Math.round(n)));
      if (n === v) return;
      if (v === 0 && n > 0 && !onTry(g.id)) return;
      v = n; mix[g.id] = v; draw();
      CREW.sound.play('tick');
    };
    let drag = false;
    const fromY = (e) => { const r = track.getBoundingClientRect(); set((1 - (e.clientY - r.top) / r.height) * 10.4); };
    track.addEventListener('pointerdown', (e) => { e.preventDefault(); drag = true; try { track.setPointerCapture(e.pointerId); } catch (x) { /* egal */ } fromY(e); });
    track.addEventListener('pointermove', (e) => { if (drag) fromY(e); });
    const end = () => { drag = false; };
    track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
    track.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); set(v + 1); } if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); set(v - 1); } });
    draw();
    return { el, set, get: () => v };
  }
  // Das ganze Pult: acht Kanäle, höchstens drei an
  function pult(ctx, mix) {
    const tryOn = () => { if (anzahlAn(mix) >= MAX_AN) { CREW.ui.toast('Höchstens drei Regler. Zieh erst einen runter.'); return false; } return true; };
    const ks = GEF.map((g) => kanal(g, mix, tryOn));
    const el = h('div', { class: 'mx-pult' }, ks.map((k) => k.el));
    if (ctx.auto) {
      const n = 2 + Math.floor(ctx.autoRng() * 2);
      const ids = CREW.seed.shuffle(GEF.map((g) => g.id), ctx.autoRng).slice(0, n);
      ks.forEach((k) => k.set(0));
      ids.forEach((id) => ks.find((x) => x.el.dataset.gef === id).set(2 + Math.floor(ctx.autoRng() * 9)));
    }
    return { el, kanaele: ks };
  }

  /* Mischen bis mindestens zwei Regler oben sind. Liefert true oder SKIP */
  async function mischen(ctx, kopf, mix, o) {
    const oo = o || {};
    for (;;) {
      const p = pult(ctx, mix);
      const live = h('div', { class: 'mx-live' }, blob(mix, { small: true }));
      p.el.addEventListener('pointerup', () => { clear(live); live.appendChild(blob(mix, { small: true })); });
      p.el.addEventListener('keyup', () => { clear(live); live.appendChild(blob(mix, { small: true })); });
      const w = ctx.scr([
        kopf,
        h('div', { class: 'mx-desk' }, h('div', { class: 'mx-desk-head' }, h('span', { class: 'eyebrow' }, 'DJ-Pult · ' + (oo.hint || 'zwei bis drei Regler hoch')), live), p.el),
      ], { eyebrow: oo.eyebrow, badge: ctx.stufe(oo.L, LEVELS) });
      const r = await ctx.ask(w, [{ label: oo.label || 'Mix fertig', value: 'ok', iconRight: 'right', id: 'mx-fertig' }]);
      if (r === ctx.SKIP) return ctx.SKIP;
      if (anzahlAn(mix) >= 2) return true;
      CREW.ui.toast(anzahlAn(mix) ? 'Gemischt heißt: mindestens zwei Regler.' : 'Zieh zwei oder drei Regler hoch.');
    }
  }

  CREW.registerGame({
    id: 'mixer',
    template: 'T1',
    icon: 'sound',
    gefuehle: GEF, situationen: SITUATIONEN, // für den Test
    themen: ['Gemischte Gefühle', 'Gefühlsstärke 0–10', 'Dieselbe Lage – andere Mischung'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Situation, ein DJ-Pult: Misch zwei bis drei Gefühle mit Reglern. Danach tauscht ihr die iPads und ratet den Mix des anderen.',
        levels: LEVELS,
        steps: [
          { icon: 'sound', title: 'Mischen', text: 'Regler hoch: Welche Gefühle, wie stark (0–10)?' },
          { icon: 'shuffle', title: 'Umschlagen', text: 'Neue Info – was steigt, was sinkt?' },
          { icon: 'users', title: 'Mix raten', text: 'Hört den Mix des anderen. Welcher Regler war oben?' },
        ],
        probe: async () => {
          const mix = {};
          const tryOn = () => true;
          const ks = [kanal(G.freude, mix, tryOn), kanal(G.trauer, mix, tryOn)];
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), ctx.say('Probe: Pizza ist da – aber kalt. Zieh einen Regler hoch. Ziehen oder tippen.', { eyebrow: 'Zum Ausprobieren', small: true }), h('div', { class: 'mx-pult probe' }, ks.map((k) => k.el))], { eyebrow: 'Probe' });
          if (ctx.auto) ks[0].set(6);
          await ctx.next(w, 'Fertig');
        },
      });
      await ctx.T.codeCheck();
      const sit = ctx.rpick(SITUATIONEN);
      const name = ctx.figures[sit.fig].name;
      const sitCard = (eyebrow, extra) => ctx.figureCard({ fig: sit.fig, mood: sit.mood, text: sit.text, eyebrow: eyebrow || sit.titel, extra });

      // Level 1: Mischen
      const mix1 = {};
      const k1 = h('div', { class: 'stack' }, sitCard(sit.titel + ' · per Tagescode für alle gleich'), h('p', { class: 'muted small' }, 'Was fühlt ' + name + '? Zieh zwei oder drei Regler hoch – so stark, wie du es dir vorstellst.'));
      if ((await mischen(ctx, k1, mix1, { eyebrow: 'Mischen', L: 1 })) === ctx.SKIP) return { summary: 'Heute nur reingeschaut. Das Pult wartet.' };
      let spur = spielMix(ctx, mix1, 6);
      CREW.sound.play('reveal');
      const w1 = ctx.scr([
        h('div', { class: 'mx-show' }, blob(mix1, { spielt: true }), h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } }, h('span', { class: 'eyebrow' }, 'Dein Mix für ' + name), balken(mix1),
          CREW.ui.btn('Nochmal hören', () => { if (spur) spur.stop(100); spur = spielMix(ctx, mix1, 6); }, { variant: 'ghost', small: true, icon: 'sound', id: 'mx-hoeren' }))),
        ctx.say(anzahlAn(mix1) + ' Gefühle gleichzeitig. Das ist kein Chaos – das ist normal.', { eyebrow: spur.ok ? 'Mix läuft (leise)' : 'Ton ist aus – der Mix ist die Farbe', small: true }),
      ], { eyebrow: 'Mischen · Dein Mix', badge: ctx.stufe(1, LEVELS) });
      await ctx.next(w1, 'Weiter');
      if (spur) spur.stop(200);

      // Level 2: Umschlagen – neue Info, gleiche Regler neu einstellen
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Neue Info! Dein Mix steht noch am Pult. Was steigt, was sinkt? Gefühle sind nicht festgeklebt.' });
      const mix2 = Object.assign({}, mix1);
      const k2 = h('div', { class: 'stack' },
        sitCard(sit.titel, null),
        h('div', { class: 'mx-twist' }, CREW.icon('bolt', 22), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Neue Info'), h('b', null, sit.twist)), ctx.readBtn('Neue Info: ' + sit.twist)));
      let umgeschlagen = false;
      if ((await mischen(ctx, k2, mix2, { eyebrow: 'Umschlagen', L: 2, hint: 'Regler neu einstellen', label: 'Neuer Mix' })) !== ctx.SKIP) {
        umgeschlagen = true;
        const ids = Array.from(new Set(Object.keys(mix1).concat(Object.keys(mix2))));
        const auf = ids.filter((id) => (mix2[id] || 0) > (mix1[id] || 0));
        const ab = ids.filter((id) => (mix2[id] || 0) < (mix1[id] || 0));
        const passt = auf.some((id) => sit.hoch.includes(id)) || ab.some((id) => sit.runter.includes(id));
        const text = !auf.length && !ab.length
          ? 'Bei dir bleibt der Mix gleich. Auch das gibt es: Manche Gefühle brauchen länger, bis sie sich bewegen.'
          : (auf.length ? auf.map((id) => G[id].name).join(' und ') + ' rauf' : '') + (auf.length && ab.length ? ', ' : '') + (ab.length ? ab.map((id) => G[id].name).join(' und ') + ' runter' : '') + '. ' + (passt ? 'Eine Info – und der Mix verschiebt sich.' : 'Spannend: Viele schieben hier eher ' + sit.hoch.map((id) => G[id].name).join(' oder ') + ' hoch. Beides geht.');
        spur = spielMix(ctx, mix2, 6);
        const w2 = ctx.scr([
          h('div', { class: 'mx-vergleich' },
            h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Vorher'), blob(mix1, { small: true }), balken(mix1)),
            h('div', { class: 'mx-pfeil' }, CREW.icon('right', 34)),
            h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Nach der neuen Info'), blob(mix2, { small: true, spielt: true }), balken(mix2, { vorher: mix1 }))),
          ctx.say(text, { eyebrow: 'Was hat sich bewegt?', small: true }),
        ], { eyebrow: 'Umschlagen · Vergleich', badge: ctx.stufe(2, LEVELS) });
        await ctx.next(w2, 'Weiter');
        if (spur) spur.stop(200);
      }
      const meinMix = umgeschlagen ? mix2 : mix1;

      // Level 3: Mix raten – iPads tauschen, der andere hört nur Farbe und Klang
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt tauscht ihr die iPads. Du hörst und siehst nur den Mix des anderen – und rätst, welcher Regler ganz oben war.' });
      await ctx.T.pairScreen({ text: 'Steh auf und such die Person mit derselben Farbe. Setzt euch zusammen – jede:r mit dem eigenen iPad.', badge: ctx.stufe(3, LEVELS) });
      const wt = ctx.scr([
        h('div', { class: 'cover-sheet' }, CREW.icon('shuffle', 64), h('h1', { class: 'outline-text' }, 'iPads tauschen'),
          h('p', { class: 'lead' }, 'Gib dein iPad deinem Partner. Auf diesem iPad ist jetzt ein fremder Mix: nur Farbe und Klang, keine Zahlen.')),
      ], { eyebrow: 'Mix raten', center: true, badge: ctx.stufe(3, LEVELS) });
      let getroffen = null;
      if ((await ctx.next(wt, 'Getauscht', { id: 'mx-getauscht' })) !== ctx.SKIP) {
        spur = spielMix(ctx, meinMix, 7);
        const wr = ctx.scr([
          h('div', { class: 'mx-show' }, blob(meinMix, { verdeckt: true, spielt: true }), h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
            h('span', { class: 'eyebrow' }, 'Der Mix deines Partners'), h('p', { class: 'muted' }, 'Gleiche Situation: ' + sit.titel + '. Welche Farbe ist am größten? Wie klingt es?'),
            CREW.ui.btn('Mix abspielen', () => { if (spur) spur.stop(100); spur = spielMix(ctx, meinMix, 7); }, { variant: 'ghost', small: true, icon: 'play', id: 'mx-abspielen' }))),
          ctx.say('Welcher Regler war bei deinem Partner ganz oben?', { eyebrow: 'Raten', small: true }),
        ], { eyebrow: 'Mix raten', badge: ctx.stufe(3, LEVELS) });
        const tipp = await ctx.ask(wr, GEF.map((g) => ({ label: g.name, value: g.id, icon: g.icon, variant: 'ghost', id: 'mx-tipp-' + g.id })));
        if (spur) spur.stop(200);
        if (tipp !== ctx.SKIP) {
          getroffen = top(meinMix).includes(tipp);
          CREW.sound.play(getroffen ? 'great' : 'reveal');
          const wa = ctx.scr([
            h('div', { class: 'mx-reveal' + (getroffen ? ' hit' : '') }, h('b', { class: 'display' }, getroffen ? 'Getroffen!' : 'Anders gemischt'),
              h('span', null, 'Dein Tipp: ' + G[tipp].name + ' · oben war: ' + top(meinMix).map((id) => G[id].name).join(' und ') + ' (' + meinMix[top(meinMix)[0]] + ')')),
            h('div', { class: 'mx-show' }, blob(meinMix, { small: true }), balken(meinMix)),
            h('h2', { class: 'mx-beide' }, 'Beide Mixe sind richtig.'),
            h('p', { class: 'muted', style: { textAlign: 'center' } }, 'Gebt die iPads zurück. Dann kommt die Vergleichskarte.'),
          ], { eyebrow: 'Mix raten · Aufdecken', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(wa, 'Zurückgetauscht', { id: 'mx-zurueck' });
        }
      }
      // Vergleichskarte zu zweit (dieselbe Komponente wie überall)
      const items = GEF.filter((g) => meinMix[g.id] > 0).sort((a, b) => meinMix[b.id] - meinMix[a.id]).map((g) => ({ label: g.name + ' · ' + meinMix[g.id], el: h('span', { class: 'vk-ic', style: { background: g.col, color: g.ink } }, CREW.icon(g.icon, 24)), text: umgeschlagen && (mix1[g.id] || 0) !== meinMix[g.id] ? 'vorher ' + (mix1[g.id] || 0) : '' }));
      await ctx.T.vergleich({
        title: 'Gefühls-Mixer – Vergleichskarte',
        items,
        questions: ['Welcher Regler war bei dir oben – und warum?', 'Was hat die neue Info bei dir verändert?'],
        note: 'Beide Mixe sind richtig. Es geht um ' + name + ', nicht um dich.',
        badge: ctx.stufe(3, LEVELS),
      });
      return {
        summary: 'Gemischte Gefühle sind normal. Dieselbe Lage – bei jeder Person eine andere Mischung.',
        stats: [[anzahlAn(meinMix), 'Gefühle im Mix'], [getroffen ? 1 : 0, 'Mix erraten'], [umgeschlagen ? Object.keys(meinMix).filter((id) => (mix1[id] || 0) !== meinMix[id]).length : 0, 'Regler verschoben']],
      };
    },
  });
})();
