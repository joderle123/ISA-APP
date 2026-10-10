/* Spiel „Später-Monster“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T0 Solo · j1-e29, j1-e27
   Neu (Lücke Aufschieben): Luca hat eine Aufgabe, das Später-Monster flüstert „nur noch 5 Minuten scrollen“.
   In jeder Schleife entscheidest du, ob Luca bleibt oder aussteigt. Der Zeitbalken zeigt, was der Loop wirklich
   kostet (gefühlt 5 Minuten, echt 25), und der Pegel am Abend steigt. Raus kommt Luca nur über den kleinsten
   Startschritt (Laptop auf, eine Folie, 5-Minuten-Timer) – große Vorsätze lachen das Monster aus.
   Level 3: Replay mit Wenn-dann-Plan und frühem Ausstieg, beide Abende im Vergleich. Nur Figuren, nichts wird gespeichert.
   (Der Katalog nennt die Figur Noé; CREW nutzt nur Mika, Yara, Luca und Sam.) */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FIG = 'luca';
  const LEVELS = ['Loop erkennen', 'Ausstieg', 'Replay früh'];
  const START = 16 * 60;          // 16:00
  const ARBEIT = 45;              // so lange braucht die Aufgabe wirklich
  const AUFGABE = 'Bio-Referat für morgen: 5 Folien';
  const FLUESTERN = [
    { t: 'Nur noch 5 Minuten scrollen. Dann fängst du an.', masche: 'Nur noch 5 Minuten', gefuehlt: 5, echt: 25 },
    { t: 'Mit leerem Bauch lernt keiner. Erst mal ein Snack.', masche: 'Klingt vernünftig', gefuehlt: 5, echt: 20 },
    { t: 'Räum erst den Schreibtisch auf. Ordnung ist wichtig!', masche: 'Fleißig aufschieben', gefuehlt: 10, echt: 30 },
    { t: 'Nur noch ein Video – das ist sogar über Bio!', masche: 'Tarnung als Lernen', gefuehlt: 5, echt: 35 },
    { t: 'Morgen früh bist du viel frischer. Mach’s dann.', masche: 'Später ist besser', gefuehlt: 0, echt: 60 },
    { t: 'Jetzt lohnt es sich eh nicht mehr anzufangen.', masche: 'Zu spät für alles', gefuehlt: 0, echt: 45 },
  ];
  /* Startschritte: gross/mittel scheitern, klein gelingt */
  const SCHRITTE = [
    { id: 'alles', t: 'Heute alles auf einmal fertig machen', groesse: 'gross', monster: 'ALLES? Hahaha. Dafür brauchst du erst mal eine Pause …' },
    { id: 'stunde', t: 'Eine Stunde ohne Pause durchziehen', groesse: 'mittel', monster: 'Eine ganze Stunde? Klingt anstrengend. Trink erst was …' },
    { id: 'perfekt', t: 'Erst den perfekten Plan für alle Folien machen', groesse: 'mittel', monster: 'Perfekt ist gut. Perfekt dauert. Komm, noch ein Video …' },
    { id: 'titel', t: 'Laptop auf, nur den Titel von Folie 1 tippen', groesse: 'klein' },
    { id: 'timer', t: '5-Minuten-Timer stellen und anfangen', groesse: 'klein' },
    { id: 'kueche', t: 'Handy in die Küche, Heft aufschlagen', groesse: 'klein' },
  ];
  const PLAENE = [
    'Wenn das Monster „nur 5 Minuten“ sagt, dann lege ich das Handy in die Küche.',
    'Wenn das Monster „nur 5 Minuten“ sagt, dann stelle ich einen 5-Minuten-Timer und fange an.',
    'Wenn das Monster „nur 5 Minuten“ sagt, dann tippe ich nur den Titel von Folie 1.',
  ];
  const uhr = (m) => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
  const pegelAbends = (verloren) => Math.min(95, 20 + Math.round(verloren * 0.3));

  /* Das Später-Monster: wird mit jeder Schleife größer, schrumpft beim Ausstieg */
  function monster(stufe, o) {
    const oo = o || {};
    const s = Math.max(0.55, Math.min(1.6, 0.7 + stufe * 0.16));
    const el = h('div', { class: 'sm-monster' + (oo.klein ? ' klein' : ''), style: { '--s': String(s) }, 'aria-label': 'Das Später-Monster' });
    el.innerHTML = `<svg viewBox="0 0 160 150" aria-hidden="true"><defs><radialGradient id="smg" cx="40%" cy="35%"><stop offset="0" stop-color="#c9a7ff"/><stop offset="1" stop-color="#6b3fd1"/></radialGradient></defs>
      <path d="M30 140 C10 120 14 70 34 48 C40 26 58 14 80 14 C104 14 122 28 128 50 C148 72 150 120 130 140 C118 132 108 146 96 138 C86 148 74 148 64 138 C52 146 42 134 30 140 Z" fill="url(#smg)" stroke="#0e0a26" stroke-width="4"/>
      <path d="M50 30 L42 8 L62 22 M110 30 L118 8 L98 22" fill="#6b3fd1" stroke="#0e0a26" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="62" cy="62" rx="15" ry="${oo.schlaf ? 3 : 17}" fill="#fff" stroke="#0e0a26" stroke-width="3"/><ellipse cx="100" cy="62" rx="15" ry="${oo.schlaf ? 3 : 17}" fill="#fff" stroke="#0e0a26" stroke-width="3"/>
      ${oo.schlaf ? '' : '<circle cx="66" cy="66" r="6" fill="#0e0a26"/><circle cx="104" cy="66" r="6" fill="#0e0a26"/>'}
      <path d="${oo.schlaf ? 'M66 98 Q81 104 96 98' : 'M60 94 Q81 114 102 94'}" fill="${oo.schlaf ? 'none' : '#2a1440'}" stroke="#0e0a26" stroke-width="4" stroke-linecap="round"/>
      <rect x="108" y="88" width="26" height="40" rx="5" fill="#15122e" stroke="#0e0a26" stroke-width="3"/><rect x="112" y="93" width="18" height="28" rx="2" fill="#4cc9f0"/></svg>`;
    return el;
  }

  /* Zeitbalken: gefühlt vs. echt, dazu Uhr und Pegel am Abend */
  function zeitKarte(ctx, jetzt, gefuehlt, echt) {
    const max = 330;
    const m = ctx.meter({ value: pegelAbends(echt), label: 'Pegel heute Abend' });
    return h('div', { class: 'sm-zeit' },
      h('div', { class: 'row between' }, h('span', { class: 'sm-uhr display' }, uhr(jetzt)), h('span', { class: 'muted small' }, AUFGABE)),
      h('div', { class: 'sm-bar' }, h('span', { class: 'sm-bar-l' }, 'Gefühlt'), h('div', { class: 'sm-track' }, h('i', { class: 'gef', style: { width: Math.min(100, (gefuehlt / max) * 100) + '%' } })), h('b', null, gefuehlt + ' Min.')),
      h('div', { class: 'sm-bar' }, h('span', { class: 'sm-bar-l' }, 'Echt weg'), h('div', { class: 'sm-track' }, h('i', { class: 'echt', style: { width: Math.min(100, (echt / max) * 100) + '%' } })), h('b', null, echt + ' Min.')),
      m.el);
  }

  CREW.registerGame({
    id: 'spaeter-monster',
    fluestern: FLUESTERN, schritte: SCHRITTE, // für den Test
    template: 'T0',
    icon: 'timer',
    themen: ['Aufschieben', 'Kleinster Startschritt', 'Wenn-dann-Plan'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      const name = ctx.figures[FIG].name;
      await ctx.T.intro({
        rule: name + ' hat eine Aufgabe. Das Später-Monster flüstert Ausreden. Du entscheidest: bleiben oder aussteigen – raus geht es nur mit dem kleinsten Schritt.',
        levels: LEVELS,
        steps: [
          { icon: 'timer', title: 'Loop erkennen', text: 'Gefühlt 5 Minuten – echt viel mehr.' },
          { icon: 'leaf', title: 'Ausstieg', text: 'Nur der kleinste Startschritt klappt.' },
          { icon: 'undo', title: 'Replay früh', text: 'Mit Wenn-dann-Plan nochmal von vorn.' },
        ],
        probe: ctx.T.probeCard('Probe: Das Monster sagt „Erst noch Musik aussuchen.“ Bleiben oder aussteigen? Tipp irgendwas – zählt nicht.', [{ label: 'Okay, nur kurz', value: 1, variant: 'ghost' }, { label: 'Aussteigen', value: 2, variant: 'ghost' }]),
      });
      const w0 = ctx.scr([
        h('div', { class: 'sm-szene' }, ctx.figureCard({ fig: FIG, mood: 'neutral', text: uhr(START) + ' Uhr. ' + AUFGABE + '. Dauert eigentlich ' + ARBEIT + ' Minuten.', eyebrow: name + ' kommt nach Hause' }), monster(0)),
        h('p', { class: 'muted' }, 'Das Monster wartet schon. Mit jeder Ausrede wird es größer.'),
      ], { eyebrow: 'Start', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(w0, 'Los geht’s')) === ctx.SKIP) return { summary: 'Heute nur reingeschaut. Das Monster schläft.' };

      // Level 1 + 2: Der Loop. Bleiben kostet echte Zeit, Aussteigen braucht den kleinsten Schritt.
      let jetzt = START, gefuehlt = 0, echt = 0, loops = 0, versuche = 0, raus = null;
      const maschen = [];
      let levelZwei = false;
      for (let i = 0; i < FLUESTERN.length && !raus; i++) {
        const f = FLUESTERN[i];
        const w = ctx.scr([
          h('div', { class: 'sm-szene' },
            h('div', { class: 'stack', style: { gap: '10px', minWidth: 0 } },
              h('div', { class: 'sm-whisper' }, h('span', { class: 'eyebrow' }, 'Das Monster flüstert'), h('b', null, '„' + f.t + '“'), ctx.readBtn('Das Später-Monster flüstert: ' + f.t)),
              zeitKarte(ctx, jetzt, gefuehlt, echt)),
            monster(loops)),
        ], { eyebrow: uhr(jetzt) + ' Uhr · Schleife ' + (i + 1), badge: ctx.stufe(levelZwei ? 2 : 1, LEVELS) });
        const r = await ctx.ask(w, [{ label: 'Okay, nur kurz', value: 'bleiben', variant: 'ghost', icon: 'phone', id: 'sm-bleiben' }, { label: 'Aussteigen', value: 'raus', icon: 'leaf', id: 'sm-raus' }], { autoPick: () => (i >= 1 && ctx.autoRng() < 0.6 ? 'raus' : 'bleiben') });
        if (r === ctx.SKIP) continue;
        if (r === 'bleiben') {
          loops++; jetzt += f.echt; gefuehlt += f.gefuehlt; echt += f.echt;
          maschen.push(f.masche);
          CREW.sound.play('tick');
          const wl = ctx.scr([
            h('div', { class: 'sm-szene' },
              h('div', { class: 'stack', style: { gap: '10px', minWidth: 0 } },
                h('div', { class: 'sm-loop' }, CREW.icon('timer', 26), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, 'Gefühlt ' + f.gefuehlt + ' Minuten. Echt: ' + f.echt + '.'), h('span', { class: 'muted small' }, 'Masche erkannt: „' + f.masche + '“'))),
                zeitKarte(ctx, jetzt, gefuehlt, echt)),
              monster(loops)),
            ctx.figureCard({ fig: FIG, mood: loops >= 3 ? 'genervt' : 'neutral', text: 'Jetzt ist es ' + uhr(jetzt) + '. Die Aufgabe ist noch genauso groß – der Abend kleiner.', eyebrow: name, size: 64 }),
          ], { eyebrow: 'Loop · ' + uhr(jetzt), badge: ctx.stufe(levelZwei ? 2 : 1, LEVELS) });
          await ctx.next(wl, 'Weiter');
          continue;
        }
        // Aussteigen: Level 2 – nur der kleinste Startschritt klappt
        if (!levelZwei) { levelZwei = true; await ctx.T.level({ n: 2, names: LEVELS, text: 'Aussteigen! Aber das Monster ist schlau: Große Vorsätze lacht es aus. Nur der kleinste Startschritt klappt.' }); }
        const opts = ctx.rshuffle([ctx.rpick(SCHRITTE.filter((s) => s.groesse === 'gross')), ctx.rpick(SCHRITTE.filter((s) => s.groesse === 'mittel')), ctx.rpick(SCHRITTE.filter((s) => s.groesse === 'klein'))]);
        const ws = ctx.scr([
          h('div', { class: 'sm-szene' }, ctx.say('Wie steigt ' + name + ' aus? Wähl den ersten Schritt.', { eyebrow: 'Ausstieg', small: true }), monster(loops)),
        ], { eyebrow: 'Ausstieg · ' + uhr(jetzt), badge: ctx.stufe(2, LEVELS) });
        const s = await ctx.ask(ws, opts.map((x) => ({ label: x.t, value: x.id, variant: 'ghost', id: 'sm-schritt-' + x.groesse })), { autoPick: () => (versuche >= 1 ? opts.find((x) => x.groesse === 'klein').id : opts[0].id) });
        if (s === ctx.SKIP) continue;
        versuche++;
        const schritt = SCHRITTE.find((x) => x.id === s);
        if (schritt.groesse !== 'klein') {
          // Zu groß: Das Monster lacht, zehn Minuten gehen drauf – zurück in den Loop
          jetzt += 10; echt += 10; loops++;
          CREW.sound.play('soft');
          const wf = ctx.scr([
            h('div', { class: 'sm-szene' }, h('div', { class: 'sm-whisper laugh' }, h('span', { class: 'eyebrow' }, 'Das Monster lacht'), h('b', null, '„' + schritt.monster + '“')), monster(loops)),
            h('p', { class: 'muted' }, '„' + schritt.t + '“ ist ein Berg. Vor Bergen drückt sich der Kopf. Nächstes Mal: kleiner!'),
          ], { eyebrow: 'Zu groß · ' + uhr(jetzt), badge: ctx.stufe(2, LEVELS) });
          await ctx.next(wf, 'Nochmal');
          continue;
        }
        raus = schritt;
      }
      // Kein Ausstieg bis zum Schluss: Auch spät geht ein kleinster Schritt
      if (!raus) {
        const wz = ctx.scr([
          h('div', { class: 'sm-szene' }, ctx.say('Es ist ' + uhr(jetzt) + '. Auch jetzt geht noch ein kleinster Schritt – nie ist es zu spät für Folie 1.', { eyebrow: 'Letzte Chance', small: true }), monster(loops)),
        ], { eyebrow: 'Spät', badge: ctx.stufe(2, LEVELS) });
        const kl = SCHRITTE.filter((x) => x.groesse === 'klein');
        const s = await ctx.ask(wz, kl.map((x) => ({ label: x.t, value: x.id, variant: 'ghost' })));
        raus = SCHRITTE.find((x) => x.id === s) || kl[0];
      }
      // Geschafft: Das Monster schrumpft
      const fertig1 = jetzt + ARBEIT;
      const pegel1 = pegelAbends(echt);
      CREW.sound.play('great');
      const wg = ctx.scr([
        h('div', { class: 'sm-szene' },
          h('div', { class: 'stack', style: { gap: '10px', minWidth: 0 } },
            h('div', { class: 'sm-raus' }, CREW.icon('check', 30), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, 'Ausgestiegen um ' + uhr(jetzt)), h('span', null, '„' + raus.t + '“'))),
            ctx.figureCard({ fig: FIG, mood: 'froh', text: 'Nach dem ersten Schritt lief es. Fertig um ' + uhr(fertig1) + '. Pegel am Abend: ' + pegel1 + '.', eyebrow: name, size: 64 })),
          monster(0, { klein: true, schlaf: true })),
        h('p', { class: 'muted' }, 'Das Monster schrumpft, sobald man angefangen hat. Der kleinste Schritt ist der wichtigste.'),
      ], { eyebrow: 'Geschafft', badge: ctx.stufe(2, LEVELS) });
      await ctx.next(wg, 'Replay');

      // Level 3: Replay mit Wenn-dann-Plan – früh aussteigen
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Nochmal 16:00. Diesmal hat ' + name + ' einen Wenn-dann-Plan. Welcher passt?', label: 'Plan wählen' });
      const wp = ctx.scr([
        h('div', { class: 'sm-szene' }, ctx.say('Wähl den Wenn-dann-Plan für ' + name + '. Er springt an, sobald das Monster flüstert.', { eyebrow: 'Wenn-dann', small: true }), monster(0)),
      ], { eyebrow: 'Replay · Plan', badge: ctx.stufe(3, LEVELS) });
      const p = await ctx.ask(wp, PLAENE.map((t, i) => ({ label: t, value: i, variant: 'ghost', id: 'sm-plan-' + i })));
      const plan = p === ctx.SKIP ? PLAENE[1] : PLAENE[p];
      const w2 = ctx.scr([
        h('div', { class: 'sm-szene' },
          h('div', { class: 'stack', style: { gap: '10px', minWidth: 0 } },
            h('div', { class: 'sm-whisper' }, h('span', { class: 'eyebrow' }, '16:00 · Das Monster flüstert'), h('b', null, '„' + FLUESTERN[0].t + '“')),
            h('div', { class: 'sm-plan' }, CREW.icon('bolt', 24), h('b', null, plan))),
          monster(0, { klein: true })),
      ], { eyebrow: 'Replay · 16:00', center: false, badge: ctx.stufe(3, LEVELS) });
      CREW.sound.play('unlock');
      await ctx.next(w2, 'Plan springt an');
      // Replay: Der Plan springt bei der ersten Ausrede an (spätestens 16:05). Wer schon sofort ausgestiegen war, bleibt so schnell.
      const fertig2 = Math.min(fertig1, START + 5 + ARBEIT);
      const pegel2 = Math.min(pegel1, pegelAbends(5));
      const frei1 = Math.max(0, 22 * 60 - fertig1), frei2 = 22 * 60 - fertig2;
      const wv = ctx.scr([
        h('div', { class: 'sm-vergleich' },
          h('div', { class: 'sm-abend' }, h('span', { class: 'eyebrow' }, 'Durchgang 1'), h('b', { class: 'display' }, 'fertig ' + uhr(fertig1)), h('span', null, 'frei bis 22 Uhr: ' + Math.floor(frei1 / 60) + ' Std. ' + (frei1 % 60) + ' Min.'), h('span', null, 'Pegel abends: ' + pegel1)),
          h('div', { class: 'sm-abend gut' }, h('span', { class: 'eyebrow' }, 'Replay mit Plan'), h('b', { class: 'display' }, 'fertig ' + uhr(fertig2)), h('span', null, 'frei bis 22 Uhr: ' + Math.floor(frei2 / 60) + ' Std. ' + (frei2 % 60) + ' Min.'), h('span', null, 'Pegel abends: ' + pegel2))),
        ctx.say(fertig1 <= fertig2 ? 'Du warst schon im ersten Durchgang sofort draußen – genau so geht es. Der Plan macht das zur Gewohnheit.' : 'Gleiche Aufgabe, gleiches Monster. Der Unterschied: ein Wenn-dann-Plan und ein winziger erster Schritt. Das Handy war danach trotzdem da – nur später.', { eyebrow: 'Vergleich', small: true }),
        h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Handy-Stopp“')),
      ], { eyebrow: 'Replay · Vergleich', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wv, 'Weiter');
      // Für dich – freiwillig, nur im Kopf
      const wf = ctx.scr([
        ctx.say('Nur für dich, nur im Kopf: Wie heißt dein Später-Monster? Und welcher kleinste Schritt würde es schrumpfen lassen? Nichts wird gespeichert.', { eyebrow: 'Freiwillig' }),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Für dich', center: true, badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wf, 'Weiter');
      return {
        summary: 'Das Später-Monster wächst mit jeder Ausrede – und schrumpft beim kleinsten Schritt. Wenn-dann hilft.',
        stats: [[loops, 'Schleifen'], [echt, 'Minuten im Loop'], [Math.max(0, Math.round((frei2 - frei1) / 60 * 10) / 10), 'Std. mehr frei mit Plan']],
      };
    },
  });
})();
