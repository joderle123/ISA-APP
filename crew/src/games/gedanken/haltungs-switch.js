/* Spiel „Haltungs-Switch“ (Thema: Gedanken & Glaubenssätze) · Vorlage T5 Gerät weitergeben · j1-e19, j1-e20
   Ein Paar (Standard, nicht Ausnahme) sieht verdeckt eine Figur mit altem oder neuem Satz im Kopf und sagt
   einen neutralen Satz („Ich mach das jetzt.“) mit passender Haltung und Stimme. Die Crew ruft „alt“ oder „neu“ –
   und woran (Schultern / Stimme / Tempo / Blick). Level 2: nur ein Kanal (Rücken zur Crew = nur Stimme, oder
   stumm = nur Körper). Level 3: der Switch – das Paar startet alt und schaltet mitten im Satz auf neu, die Crew ruft
   „Switch!“. Pass steht groß auf jedem Bildschirm und gibt das iPad sofort weiter. Die Crew sammelt Treffer gemeinsam. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Alt oder neu?', 'Nur ein Kanal', 'Switch'];
  const KANAELE = [
    { id: 'schultern', name: 'Schultern', icon: 'user', alt: 'hochgezogen, nach vorn', neu: 'locker unten, breit' },
    { id: 'stimme', name: 'Stimme', icon: 'speaker', alt: 'leise, brüchig', neu: 'ruhig, klar, laut genug' },
    { id: 'tempo', name: 'Tempo', icon: 'timer', alt: 'hastig oder stockend', neu: 'ruhig, mit kurzer Pause' },
    { id: 'blick', name: 'Blick', icon: 'eye', alt: 'auf den Boden', neu: 'nach vorn, zu den anderen' },
  ];
  /* Level 2: Nur ein Kanal ist sichtbar/hörbar */
  const NUR = [
    { id: 'stimme', titel: 'Nur Stimme', anweisung: 'Dreht euch mit dem Rücken zur Crew. Nur die Stimme verrät den Satz.', kanal: 'stimme' },
    { id: 'koerper', titel: 'Nur Körper', anweisung: 'Kein Wort! Ihr steht nur da – Schultern und Blick verraten den Satz.', kanal: 'schultern' },
  ];
  const SZENEN = [
    { id: 'referat', fig: 'mika', ort: 'Vor der Klasse, gleich ist Referat.', alt: 'Das geht eh schief.', neu: 'Ich hab geübt. Ich fang einfach an.', satz: 'Ich mach das jetzt.' },
    { id: 'gruppe', fig: 'sam', ort: 'Pausenhof. Eine Gruppe steht zusammen.', alt: 'Die wollen mich eh nicht.', neu: 'Fragen kostet nichts.', satz: 'Hey, kann ich mitmachen?' },
    { id: 'tafel', fig: 'luca', ort: 'Mathe. Luca wird an die Tafel gerufen.', alt: 'Gleich sehen alle, dass ich dumm bin.', neu: 'Ich rechne Schritt für Schritt.', satz: 'Okay, ich bin dran.' },
    { id: 'siebenmeter', fig: 'yara', ort: 'Handball. Yara soll den Siebenmeter werfen.', alt: 'Ich verhau das sicher.', neu: 'Den hab ich hundertmal geworfen.', satz: 'Ich mach das jetzt.' },
    { id: 'anruf', fig: 'mika', ort: 'Mika soll beim Zahnarzt anrufen.', alt: 'Ich stotter bestimmt rum.', neu: 'Ich sag einfach, was ich brauche.', satz: 'Hallo, ich hätte gern einen Termin.' },
    { id: 'verein', fig: 'sam', ort: 'Erster Tag im neuen Verein.', alt: 'Ich bin hier falsch.', neu: 'Alle waren hier mal neu.', satz: 'Hallo, ich bin neu hier.' },
  ];
  // Wie viele Paare? Jede:r spielt einmal zu zweit (bei ungerader Zahl ein Trio)
  const plan = (n) => { const c = Math.max(3, Math.min(5, Math.floor(Math.max(2, n) / 2))); return c === 3 ? [1, 2, 3] : c === 4 ? [1, 2, 3, 3] : [1, 1, 2, 3, 3]; };

  /* Ganzkörper-Figur mit Haltung (alt = eingesunken, Arme zu, Blick runter · neu = aufrecht, offen, Blick nach vorn) */
  function haltungSvg(figId, art, size) {
    const F = CREW.games.figures[figId] || CREW.games.figures.mika;
    const alt = art === 'alt';
    const INK = '#0e0a26';
    const st = `stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
    const hx = alt ? 64 : 60, hy = alt ? 50 : 36;
    const torso = alt ? 'M40 70 Q60 84 80 70 L78 134 Q60 140 42 134 Z' : 'M33 72 Q60 61 87 72 L83 134 Q60 141 37 134 Z';
    const limb = (d, col) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    const arms = alt
      ? limb('M44 76 Q47 104 74 98', F.colour) + limb('M76 76 Q73 108 46 102', F.colour)
      : limb('M36 78 L24 124', F.colour) + limb('M84 78 L96 124', F.colour) + `<circle cx="23" cy="129" r="6" fill="${F.skin}" ${st}/><circle cx="97" cy="129" r="6" fill="${F.skin}" ${st}/>`;
    const legs = `<ellipse cx="60" cy="193" rx="36" ry="5" fill="rgba(0,0,0,.28)"/>` + (alt
      ? limb('M53 136 L55 186', '#3a3366') + limb('M67 136 L65 186', '#3a3366') + `<ellipse cx="53" cy="188" rx="7" ry="4" fill="${INK}"/><ellipse cx="67" cy="188" rx="7" ry="4" fill="${INK}"/>`
      : limb('M49 136 L43 186', '#3a3366') + limb('M71 136 L77 186', '#3a3366') + `<ellipse cx="40" cy="188" rx="8" ry="4" fill="${INK}"/><ellipse cx="80" cy="188" rx="8" ry="4" fill="${INK}"/>`);
    const hair = F.style === 'cap' ? `<path d="M${hx - 20} ${hy - 4} C${hx - 20} ${hy - 26} ${hx + 20} ${hy - 26} ${hx + 20} ${hy - 4} Z" fill="${F.colour}" ${st}/><path d="M${hx + 16} ${hy - 6} L${hx + 32} ${hy - 2}" ${st}/>`
      : F.style === 'locken' ? `<circle cx="${hx - 14}" cy="${hy - 14}" r="9" fill="${F.hair}" ${st}/><circle cx="${hx}" cy="${hy - 20}" r="10" fill="${F.hair}" ${st}/><circle cx="${hx + 14}" cy="${hy - 14}" r="9" fill="${F.hair}" ${st}/>`
        : F.style === 'lang' ? `<path d="M${hx - 22} ${hy + 22} C${hx - 26} ${hy - 26} ${hx + 26} ${hy - 26} ${hx + 22} ${hy + 22} Z" fill="${F.hair}" ${st}/>`
          : `<path d="M${hx - 20} ${hy - 2} C${hx - 20} ${hy - 26} ${hx + 20} ${hy - 26} ${hx + 20} ${hy - 2} C${hx + 8} ${hy - 12} ${hx - 8} ${hy - 12} ${hx - 20} ${hy - 2} Z" fill="${F.hair}" ${st}/>`;
    const eyeY = alt ? hy + 5 : hy - 1;
    const face = `<circle cx="${hx}" cy="${hy}" r="18" fill="${F.skin}" ${st}/>${F.style === 'lang' ? '' : hair}<circle cx="${hx - 6}" cy="${eyeY}" r="2.4" fill="${INK}"/><circle cx="${hx + 6}" cy="${eyeY}" r="2.4" fill="${INK}"/>` +
      (alt ? `<path d="M${hx - 5} ${hy + 11} L${hx + 5} ${hy + 11}" ${st}/>` : `<path d="M${hx - 6} ${hy + 7} Q${hx} ${hy + 13} ${hx + 6} ${hy + 7}" fill="none" ${st}/>`);
    const head = (F.style === 'lang' ? hair : '') + face;
    const svg = `<svg viewBox="0 0 120 200" width="${size || 120}" height="${Math.round((size || 120) * 200 / 120)}" aria-hidden="true">${legs}<path d="${torso}" fill="${F.colour}" ${st}/>${arms}<g${alt ? ` transform="rotate(14 ${hx} ${hy + 18})"` : ''}>${head}</g></svg>`;
    return h('span', { class: 'hs-haltung', 'data-art': art, html: svg, 'aria-label': F.name + (alt ? ', eingesunkene Haltung' : ', aufrechte Haltung') });
  }

  const kanalZeile = (k, art) => h('div', { class: 'hs-kanal', 'data-kanal': k.id }, CREW.icon(k.icon, 22), h('b', null, k.name), h('span', null, k[art]));

  /* Großer Pass-Knopf + Weiter: Pass gibt sofort weiter (auch der Pass oben). */
  const PASS = { label: 'Pass – sofort weitergeben', value: 'pass', variant: 'ghost', icon: 'x', id: 'hs-pass', auto: false };

  CREW.registerGame({
    id: 'haltungs-switch',
    szenen: SZENEN, plan, // für den Test
    template: 'T5',
    icon: 'user',
    themen: ['Gedanke und Haltung', 'Stimme', 'Nonverbale Signale'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Paar sieht heimlich, welcher Satz im Kopf einer Figur ist – alt oder neu. Ihr sagt einen neutralen Satz mit passender Haltung. Die Crew ruft: alt oder neu?',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Nur ihr zwei', text: 'Figur, Satz im Kopf, ein neutraler Satz.' },
          { icon: 'user', title: 'Spielen', text: 'Schultern, Stimme, Tempo, Blick.' },
          { icon: 'users', title: 'Crew ruft', text: 'Alt oder neu – und woran? Pass gibt weiter.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            h('div', { class: 'hs-pair' }, haltungSvg('sam', 'alt', 80), haltungSvg('sam', 'neu', 80)),
            ctx.say('Probe: Welche Sam-Figur denkt „Ich schaff das“? Tipp irgendwas – zählt nicht.', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Links', value: 1, variant: 'ghost' }, { label: 'Rechts', value: 2, variant: 'ghost' }]);
        },
      });
      const runden = plan(ctx.n || 5);
      const szenen = ctx.rshuffle(SZENEN).slice(0, runden.length);
      let treffer = 0, gespielt = 0, gepasst = 0, lastL = 1;
      const kanaeleGenannt = {};
      for (let i = 0; i < runden.length; i++) {
        const L = runden[i];
        const sz = szenen[i];
        const name = ctx.figures[sz.fig].name;
        if (L !== lastL) { lastL = L; await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt nur ein Kanal: Mal hört die Crew nur die Stimme, mal sieht sie nur den Körper. Reicht das?' : 'Der Switch: Ihr startet mit dem alten Satz im Kopf und schaltet mitten im Satz um. Die Crew ruft „Switch!“, sobald sie es merkt.' }); }
        const art = L === 3 ? 'switch' : ctx.rng() < 0.5 ? 'alt' : 'neu';
        const nur = L === 2 ? NUR[i % 2] : null;
        const ey = 'Paar ' + (i + 1) + ' von ' + runden.length;
        // 1) Deckblatt: nur das Paar schaut – Pass groß
        const wc = ctx.scr([
          h('div', { class: 'cover-sheet' }, CREW.icon('eyeOff', 64), h('h1', { class: 'outline-text' }, 'Nur ihr zwei schaut'),
            h('p', { class: 'lead' }, ey + '. Die Crew schaut weg. Wer nicht spielen mag: Pass – das iPad geht sofort weiter.'),
            h('span', { class: 'pill' }, 'Kein Körperkontakt · Bei ungerader Zahl spielt ein Trio')),
        ], { eyebrow: ey, center: true, badge: ctx.stufe(L, LEVELS) });
        const c = await ctx.ask(wc, [PASS, { label: 'Wir schauen', value: 'go', iconRight: 'right', id: 'hs-schauen' }]);
        if (c === ctx.SKIP || c === 'pass') { gepasst++; await ctx.T.passOn({ text: 'Gebt das iPad an das nächste Paar. Pass ist okay – ohne Kommentar.' }); continue; }
        // 2) Geheime Karte
        const kopfAlt = art !== 'neu';
        const zeigeArt = art === 'switch' ? 'alt' : art;
        const kanaele = nur ? KANAELE.filter((k) => k.id === nur.kanal || (nur.id === 'koerper' && k.id === 'blick')) : KANAELE;
        const geheim = ctx.scr([
          h('div', { class: 'hs-geheim', 'data-art': art },
            h('div', { class: 'hs-geheim-fig' }, art === 'switch' ? h('div', { class: 'hs-pair' }, haltungSvg(sz.fig, 'alt', 92), CREW.icon('right', 30), haltungSvg(sz.fig, 'neu', 92)) : haltungSvg(sz.fig, zeigeArt, 120)),
            h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
              h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Geheim · ' + sz.ort), ctx.readBtn(name + '. ' + sz.ort + ' Im Kopf: ' + (art === 'neu' ? sz.neu : sz.alt) + (art === 'switch' ? ' Dann umschalten auf: ' + sz.neu : '') + '. Ihr sagt: ' + sz.satz)),
              h('div', { class: 'hs-kopf' }, h('span', { class: 'pill ' + (kopfAlt ? 'hs-alt' : 'good') }, art === 'switch' ? 'Erst ALT, dann NEU' : kopfAlt ? 'ALTER Satz im Kopf' : 'NEUER Satz im Kopf'),
                h('b', null, '„' + (art === 'neu' ? sz.neu : sz.alt) + '“'), art === 'switch' ? h('b', { class: 'hs-switch-to' }, '→ „' + sz.neu + '“') : null),
              h('div', { class: 'hs-sag' }, h('span', { class: 'eyebrow' }, 'Ihr sagt nur'), h('b', { class: 'display' }, '„' + sz.satz + '“')))),
          nur ? h('div', { class: 'card row hs-nur' }, CREW.icon(nur.id === 'stimme' ? 'speaker' : 'user', 26), h('span', null, h('b', null, nur.titel + ': '), nur.anweisung)) : null,
          h('div', { class: 'hs-kanaele' }, kanaele.map((k) => (art === 'switch' ? h('div', { class: 'hs-kanal', 'data-kanal': k.id }, CREW.icon(k.icon, 22), h('b', null, k.name), h('span', null, k.alt + ' → ' + k.neu)) : kanalZeile(k, zeigeArt)))),
          art === 'switch' ? h('p', { class: 'muted small' }, 'Startet alt. Nach dem ersten Wort atmet ihr aus und schaltet um. Die Crew ruft „Switch!“.') : h('p', { class: 'muted small' }, 'Kurz absprechen: Wer sagt den Satz, wer zeigt die Haltung? Oder beide.'),
        ], { eyebrow: ey + ' · Geheim', badge: ctx.stufe(L, LEVELS) });
        const g = await ctx.ask(geheim, [PASS, { label: 'Bereit – iPad umdrehen', value: 'go', iconRight: 'right', id: 'hs-bereit' }]);
        if (g === ctx.SKIP || g === 'pass') { gepasst++; await ctx.T.passOn({ text: 'Gebt das iPad an das nächste Paar. Pass ist okay – ohne Kommentar.' }); continue; }
        // 3) Bühne: Der Bildschirm verrät nichts – erst die Crew ruft, dann tippt das Paar, was gerufen wurde
        const buehne = ctx.scr([
          h('div', { class: 'hs-buehne' }, CREW.icon('users', 54), h('h1', { class: 'outline-text' }, 'Bühne frei'),
            h('p', { class: 'lead' }, art === 'switch' ? 'Sagt euren Satz. Crew: Ruft „Switch!“, sobald ihr den Wechsel seht.' : 'Sagt euren Satz. Crew: Ruft „alt“ oder „neu“ – und woran?'),
            nur ? h('span', { class: 'pill accent' }, nur.titel) : null),
          h('p', { class: 'muted small center' }, 'Danach tippt das Paar, was die Crew gerufen hat.'),
        ], { eyebrow: ey + ' · Bühne', center: true, badge: ctx.stufe(L, LEVELS) });
        const tipp = await ctx.ask(buehne, art === 'switch'
          ? [{ label: 'Crew hat „Switch!“ gerufen', value: 'switch', variant: 'good', icon: 'check', id: 'hs-crew-switch' }, { label: 'Keiner hat es gemerkt', value: 'nix', variant: 'ghost', id: 'hs-crew-nix' }]
          : [{ label: 'Crew sagt: alt', value: 'alt', variant: 'ghost', id: 'hs-crew-alt' }, { label: 'Crew sagt: neu', value: 'neu', variant: 'ghost', id: 'hs-crew-neu' }]);
        if (tipp === ctx.SKIP) { await ctx.T.passOn({}); continue; }
        gespielt++;
        // 4) Woran? (welche Kanäle hat die Crew genannt) – nicht bei „nur ein Kanal“
        let genannt = [];
        if (!nur) {
          const sel = new Set();
          const row = h('div', { class: 'row', style: { gap: '8px' } }, KANAELE.map((k) => {
            const b = h('button', { type: 'button', class: 'chip', 'data-kanal': k.id }, CREW.icon(k.icon, 18), ' ' + k.name);
            b.addEventListener('click', () => { CREW.sound.play('tap'); if (sel.has(k.id)) sel.delete(k.id); else sel.add(k.id); b.classList.toggle('sel', sel.has(k.id)); });
            return b;
          }));
          if (ctx.auto) row.querySelectorAll('.chip')[Math.floor(ctx.autoRng() * 4)].click();
          const ww = ctx.scr([
            ctx.say(art === 'switch' ? 'Was hat sich beim Switch zuerst verändert? Tippt, was die Crew genannt hat.' : 'Woran hat die Crew es erkannt? Tippt alles, was genannt wurde.', { eyebrow: 'Woran?', small: true }),
            h('div', { class: 'card stack' }, row, h('p', { class: 'muted small', style: { margin: 0 } }, 'Nichts genannt? Einfach weiter.')),
          ], { eyebrow: ey + ' · Woran?', badge: ctx.stufe(L, LEVELS) });
          await ctx.next(ww, 'Auflösen');
          genannt = [...sel];
          genannt.forEach((k) => { kanaeleGenannt[k] = (kanaeleGenannt[k] || 0) + 1; });
        }
        // 5) Auflösung
        const ok = art === 'switch' ? tipp === 'switch' : tipp === art;
        if (ok) treffer++;
        CREW.sound.play(ok ? 'great' : 'soft');
        const wr = ctx.scr([
          h('div', { class: 'hs-reveal' + (ok ? ' ok' : '') },
            art === 'switch' ? h('div', { class: 'hs-pair' }, haltungSvg(sz.fig, 'alt', 80), CREW.icon('right', 28), haltungSvg(sz.fig, 'neu', 80)) : haltungSvg(sz.fig, art, 100),
            h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
              h('b', { class: 'display hs-reveal-t' }, ok ? 'Crew-Treffer!' : 'Diesmal nicht erkannt'),
              h('span', null, art === 'switch' ? 'Es war der Switch: „' + sz.alt + '“ → „' + sz.neu + '“' : 'Im Kopf war der ' + (art === 'alt' ? 'ALTE' : 'NEUE') + ' Satz: „' + (art === 'alt' ? sz.alt : sz.neu) + '“'),
              genannt.length ? h('div', { class: 'row', style: { gap: '6px' } }, genannt.map((k) => h('span', { class: 'chip small sel' }, KANAELE.find((x) => x.id === k).name))) : null)),
          ctx.say(ok ? 'Gleicher Satz, andere Haltung – und die Crew hat es gesehen. Der Gedanke im Kopf zeigt sich im Körper.' : nur ? 'Mit nur einem Kanal ist es schwer. Darum lesen Menschen Stimme UND Körper zusammen.' : 'Kein Fehler: Manche Haltungen sind leise. Was hätte euch geholfen – Schultern, Stimme, Tempo oder Blick?', { eyebrow: 'Auflösung', small: true }),
        ], { eyebrow: ey + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wr, i + 1 < runden.length ? 'Weitergeben' : 'Weiter');
        if (i + 1 < runden.length) await ctx.T.passOn({ text: 'Gebt das iPad an das nächste Paar. Danke fürs Spielen!', extra: h('span', { class: 'pill' }, 'Crew-Treffer bisher: ' + treffer) });
      }
      // Abschluss: Was hat die Crew am häufigsten gelesen? (nur Kanäle, keine Personen)
      const top = KANAELE.slice().sort((a, b) => (kanaeleGenannt[b.id] || 0) - (kanaeleGenannt[a.id] || 0))[0];
      if (gespielt) {
        const wE = ctx.scr([
          h('div', { class: 'hs-score' }, h('b', { class: 'display' }, treffer + ' / ' + gespielt), h('span', null, 'Crew-Treffer')),
          ctx.say('Ein Satz im Kopf verändert Schultern, Stimme, Tempo und Blick. ' + (kanaeleGenannt[top.id] ? 'Am häufigsten habt ihr ' + top.name + ' gelesen.' : '') + ' Und umgekehrt: Aufrecht stehen hilft dem neuen Satz.', { eyebrow: 'Das habt ihr gesehen', small: true }),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Fester Stand“')),
        ], { eyebrow: 'Ergebnis', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wE, 'Weiter');
      }
      return {
        summary: gespielt ? (treffer >= Math.ceil(gespielt / 2) ? 'Die Crew liest Haltung wie ein Buch. Gedanke, Haltung, Stimme hängen zusammen.' : 'Haltung lesen ist schwer – genau darum lohnt sich der feste Stand.') : 'Heute nur zugeschaut. Pass ist okay.',
        stats: [[treffer, 'Crew-Treffer'], [gespielt, 'Paare gespielt'], [gepasst, 'mal gepasst']],
      };
    },
  });
})();
