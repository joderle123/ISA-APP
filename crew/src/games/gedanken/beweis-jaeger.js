/* Spiel „Beweis-Jäger“ (Thema: Gedanken & Glaubenssätze) · Vorlage T1 Solo + Austausch · j1-e19
   Oben steht der neue Satz einer Figur („Ich kann Dinge lernen, wenn ich dranbleibe“). Darunter ziehen sieben
   Momente ihrer Woche vorbei – wischen: nach rechts Beweis, nach links kein Beweis (Knöpfe gehen auch).
   Die Bilanz kommt als Lupe. Dann die Trick-Frage: „Hast du den verhauenen Test als Gegenbeweis gezählt – oder als
   Teil von dranbleiben?“ Dazu drei Haltungs-Scans: Alter oder neuer Satz im Kopf? (Schultern, Blick, Stimme).
   Danach Vergleichskarte zu zweit. Eigene Beweise werden nur besprochen, nie eingegeben. Bereitet die
   Beweis-Challenge der Woche vor (j1-e19). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Sammeln', 'Trick-Frage', 'Haltungs-Scan'];
  /* Figuren mit neuem Satz, sieben Momenten (beweis / kein / trick = Rückschlag, der zum neuen Satz gehört)
     und drei Haltungs-Scans (alt oder neu im Kopf, woran man es sieht). */
  const FIGUREN = [
    {
      id: 'luca', fig: 'luca', neu: 'Ich kann Dinge lernen, wenn ich dranbleibe.', alt: 'Ich bin halt nicht so schlau.',
      momente: [
        { tag: 'Mo', t: 'Im Bus übt Luca 10 Minuten Vokabeln.', icon: 'phone', art: 'beweis' },
        { tag: 'Di', t: 'Luca schaut abends zwei Folgen einer Serie.', icon: 'play', art: 'kein' },
        { tag: 'Mi', t: 'Mathe-Test zurück: eine 4.', icon: 'x', art: 'trick' },
        { tag: 'Mi', t: 'Nach der Stunde fragt Luca: „Was war bei Aufgabe 3 falsch?“', icon: 'chat', art: 'beweis' },
        { tag: 'Do', t: 'Luca isst mit Sam Pizza.', icon: 'heart', art: 'kein' },
        { tag: 'Fr', t: 'Gitarre: Der Griff, der zwei Wochen gehakt hat, klappt.', icon: 'star', art: 'beweis' },
        { tag: 'So', t: 'Luca macht einen Tag gar nichts für die Schule.', icon: 'leaf', art: 'kein' },
      ],
      trick: { frage: 'Die 4 im Mathe-Test: Hast du sie als Gegenbeweis gezählt – oder als Teil von dranbleiben?', teil: 'Teil von dranbleiben', erkl: 'Der Satz sagt nicht „Ich schreibe nur Einsen“. Er sagt „Ich lerne, wenn ich dranbleibe“. Nach der 4 hat Luca nachgefragt – genau das ist dranbleiben.' },
      scans: [
        { art: 'alt', szene: 'Montag, vor dem Vokabeltest', cues: ['Schultern hochgezogen', 'Blick auf den Boden', 'murmelt „Wird eh nix.“'] },
        { art: 'neu', szene: 'Mittwoch, nach der Stunde bei der Lehrerin', cues: ['Schultern locker unten', 'Blick zur Lehrerin', 'ruhig: „Was war falsch?“'] },
        { art: 'alt', szene: 'Freitagabend: Der Griff hakt wieder', cues: ['Schultern nach vorn', 'Blick weg vom Griffbrett', 'seufzt laut'], twist: 'Auch in einer guten Woche kommt der alte Satz mal zurück. Bemerken reicht – dann umschalten.' },
      ],
    },
    {
      id: 'mika', fig: 'mika', neu: 'Ich kann vor Leuten reden, wenn ich mich vorbereite.', alt: 'Ich kann nicht vor Leuten reden.',
      momente: [
        { tag: 'Mo', t: 'Mika liest das Referat einmal laut im Zimmer vor.', icon: 'speaker', art: 'beweis' },
        { tag: 'Di', t: 'Beim Training sagt Mika die Aufstellung an.', icon: 'users', art: 'beweis' },
        { tag: 'Mi', t: 'Referat: Mika verhaspelt sich am Anfang.', icon: 'x', art: 'trick' },
        { tag: 'Mi', t: 'Mika atmet aus und redet weiter bis zum Schluss.', icon: 'leaf', art: 'beweis' },
        { tag: 'Do', t: 'Mika schaut ein Video über Haie.', icon: 'play', art: 'kein' },
        { tag: 'Fr', t: 'In Bio meldet sich Mika einmal.', icon: 'star', art: 'beweis' },
        { tag: 'Sa', t: 'Mika schläft bis elf.', icon: 'calendar', art: 'kein' },
      ],
      trick: { frage: 'Verhaspelt am Anfang vom Referat: Hast du das als Gegenbeweis gezählt – oder als Teil vom Reden?', teil: 'Teil vom Reden', erkl: 'Der Satz sagt nicht „Ich rede perfekt“. Mika war vorbereitet, hat sich verhaspelt – und weitergeredet. Das zählt doppelt.' },
      scans: [
        { art: 'neu', szene: 'Dienstag, beim Training', cues: ['steht breit und fest', 'Blick in die Runde', 'klare, laute Stimme'] },
        { art: 'alt', szene: 'Mittwochmorgen, vor dem Klassenraum', cues: ['Arme verschränkt', 'Blick auf die Schuhe', 'flüstert „Ich kann das nicht.“'] },
        { art: 'neu', szene: 'Mittwoch, nach dem Verhaspeln', cues: ['atmet aus, Schultern sinken', 'Blick zurück zur Klasse', 'redet langsamer weiter'], twist: 'Mitten im Referat umgeschaltet: Der Körper hat dem neuen Satz geholfen.' },
      ],
    },
    {
      id: 'sam', fig: 'sam', neu: 'Ich finde Anschluss, wenn ich den ersten Schritt mache.', alt: 'Mich will eh keiner dabeihaben.',
      momente: [
        { tag: 'Mo', t: 'Sam fragt in der Pause: „Darf ich mitspielen?“ – „Klar.“', icon: 'users', art: 'beweis' },
        { tag: 'Di', t: 'Sam fragt eine Gruppe. Die sagt: „Heute nicht.“', icon: 'x', art: 'trick' },
        { tag: 'Mi', t: 'Sam hört im Bus einen Podcast.', icon: 'speaker', art: 'kein' },
        { tag: 'Do', t: 'Sam schreibt Yara: „Skatepark?“ – „Ja!“', icon: 'chat', art: 'beweis' },
        { tag: 'Fr', t: 'In Mathe setzt sich Sam neben jemand Neuen und leiht einen Stift.', icon: 'heart', art: 'beweis' },
        { tag: 'Sa', t: 'Sam räumt das Zimmer auf.', icon: 'home', art: 'kein' },
        { tag: 'So', t: 'Sam bleibt zu Hause, weil Sam müde ist.', icon: 'leaf', art: 'kein' },
      ],
      trick: { frage: '„Heute nicht“ von der Gruppe: Hast du das als Gegenbeweis gezählt – oder als Teil vom ersten Schritt?', teil: 'Teil vom ersten Schritt', erkl: 'Der Satz sagt nicht „Alle sagen immer Ja“. Sam hat den ersten Schritt gemacht. Ein Nein gehört dazu – am Donnerstag kam ein Ja.' },
      scans: [
        { art: 'alt', szene: 'Dienstag, nach dem „Heute nicht“', cues: ['Kopf gesenkt', 'Hände in den Taschen', 'sagt gar nichts mehr'] },
        { art: 'neu', szene: 'Donnerstag, am Skatepark', cues: ['aufrecht, offen', 'schaut die anderen an', 'lacht laut mit'] },
        { art: 'neu', szene: 'Freitag, neben dem Neuen in Mathe', cues: ['dreht sich zur Seite hin', 'kurzer Blickkontakt', 'freundlich: „Brauchst du einen Stift?“'], twist: 'Kleiner Schritt, offene Haltung: So sieht der neue Satz von außen aus.' },
      ],
    },
  ];

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
    return h('span', { class: 'bj-haltung', 'data-art': art, html: svg, 'aria-label': F.name + (alt ? ', eingesunkene Haltung' : ', aufrechte Haltung') });
  }

  // Satz-Kopf: neuer Satz groß, alter Satz klein durchgestrichen, Lupe mit Zähler
  function satzKopf(ctx, f, lupe) {
    const name = ctx.figures[f.fig].name;
    return h('div', { class: 'bj-head' },
      ctx.avatar(f.fig, 'froh', 64),
      h('div', { class: 'stack', style: { gap: '4px', minWidth: 0, flex: '1' } },
        h('span', { class: 'eyebrow' }, name + 's neuer Satz'),
        h('b', { class: 'bj-neu' }, '„' + f.neu + '“'),
        h('span', { class: 'muted small' }, 'statt: ', h('s', null, '„' + f.alt + '“'))),
      lupe ? h('div', { class: 'bj-lupe', 'aria-label': 'Lupe: ' + lupe.n + ' Beweise' }, CREW.icon('eye', 22), h('b', { class: 'display' }, String(lupe.n)), h('span', { class: 'small' }, 'Beweise')) : null,
      ctx.readBtn(name + 's neuer Satz: ' + f.neu));
  }

  /* Wisch-Karte: nach rechts = Beweis, nach links = kein Beweis. Klickt den passenden Knopf, damit X/Pass/Auto gleich bleiben. */
  function swipeCard(m, i, total, decide) {
    const tagEl = h('span', { class: 'bj-tag display' }, m.tag);
    const card = h('div', { class: 'bj-card', role: 'group', 'aria-label': 'Moment ' + (i + 1) + ' von ' + total + ': ' + m.t },
      h('span', { class: 'bj-stamp yes' }, 'Beweis'), h('span', { class: 'bj-stamp no' }, 'Kein Beweis'),
      h('div', { class: 'row between' }, tagEl, h('span', { class: 'muted small' }, 'Moment ' + (i + 1) + ' von ' + total)),
      h('div', { class: 'bj-card-body' }, h('span', { class: 'bj-card-ic' }, CREW.icon(m.icon, 34)), h('p', null, m.t)));
    let x0 = null, dx = 0, pid = null;
    const set = () => { card.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 18 + 'deg)'; card.style.setProperty('--yes', String(Math.max(0, Math.min(1, dx / 90)))); card.style.setProperty('--no', String(Math.max(0, Math.min(1, -dx / 90)))); };
    card.addEventListener('pointerdown', (e) => { x0 = e.clientX; pid = e.pointerId; dx = 0; card.classList.add('drag'); try { card.setPointerCapture(pid); } catch (er) { /* egal */ } });
    card.addEventListener('pointermove', (e) => { if (x0 == null || e.pointerId !== pid) return; dx = e.clientX - x0; set(); });
    const up = () => { if (x0 == null) return; card.classList.remove('drag'); x0 = null; if (dx > 80) decide('beweis'); else if (dx < -80) decide('kein'); else { dx = 0; set(); } };
    card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up);
    return card;
  }

  CREW.registerGame({
    id: 'beweis-jaeger',
    figuren: FIGUREN, // für den Test
    template: 'T1',
    icon: 'eye',
    themen: ['Beweise sammeln', 'Rückschläge einordnen', 'Haltung und Gedanke'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Oben steht der neue Satz einer Figur. Sieben Momente ihrer Woche ziehen vorbei: nach rechts wischen = Beweis, nach links = kein Beweis.',
        levels: LEVELS,
        steps: [
          { icon: 'right', title: 'Sammeln', text: 'Wischen oder tippen: Beweis oder kein Beweis?' },
          { icon: 'eye', title: 'Trick-Frage', text: 'Ist ein Rückschlag ein Gegenbeweis?' },
          { icon: 'user', title: 'Haltungs-Scan', text: 'Alter oder neuer Satz im Kopf? Schau auf den Körper.' },
        ],
        probe: async () => {
          let pick = null;
          const card = swipeCard({ tag: 'Probe', t: 'Sam trinkt ein Glas Wasser. Wisch irgendwohin – zählt nicht.', icon: 'leaf' }, 0, 1, (v) => { pick = v; const b = document.getElementById(v === 'beweis' ? 'bj-ja' : 'bj-nein'); if (b) b.click(); });
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), h('div', { class: 'bj-deck' }, card)], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Kein Beweis', value: 'kein', variant: 'ghost', icon: 'left', id: 'bj-nein' }, { label: 'Beweis', value: 'beweis', iconRight: 'right', id: 'bj-ja' }]);
          return pick;
        },
      });
      await ctx.T.codeCheck();
      const f = ctx.rpick(FIGUREN);
      const name = ctx.figures[f.fig].name;
      const wahl = [];
      let lupe = 0;
      // Level 1: Sammeln – sieben Momente, wischen oder tippen
      for (let i = 0; i < f.momente.length; i++) {
        const m = f.momente[i];
        let flyDir = null;
        const card = swipeCard(m, i, f.momente.length, (v) => { flyDir = v; const b = document.getElementById(v === 'beweis' ? 'bj-ja' : 'bj-nein'); if (b && !b.disabled) b.click(); });
        const w = ctx.scr([
          satzKopf(ctx, f, { n: lupe }),
          h('div', { class: 'bj-deck' }, card, h('div', { class: 'bj-deck-shadow' })),
          h('p', { class: 'muted small center' }, 'Passt der Moment zum neuen Satz? Wischen oder Knopf. Später redet ihr darüber.'),
        ], { eyebrow: 'Woche von ' + name + ' · ' + m.tag, step: i + 1, badge: ctx.stufe(1, LEVELS) });
        const r = await ctx.ask(w, [{ label: 'Kein Beweis', value: 'kein', variant: 'ghost', icon: 'left', id: 'bj-nein' }, { label: 'Beweis', value: 'beweis', iconRight: 'right', id: 'bj-ja' }], { autoPick: () => (m.art === 'beweis' || ctx.autoRng() < 0.3 ? 'beweis' : 'kein') });
        if (r === ctx.SKIP) { wahl.push(null); continue; }
        wahl.push(r);
        if (r === 'beweis') lupe++;
        card.classList.add(r === 'beweis' ? 'fly-yes' : 'fly-no');
        CREW.sound.play(r === 'beweis' ? 'tick' : 'tap');
        void flyDir;
        await ctx.hold(320);
      }
      // Bilanz als Lupe: Was hast du gezählt – was sieht die Lupe?
      const klar = f.momente.map((m, i) => ({ m, i })).filter((x) => x.m.art === 'beweis');
      const gefunden = klar.filter((x) => wahl[x.i] === 'beweis').length;
      const ti = f.momente.findIndex((m) => m.art === 'trick');
      const wB = ctx.scr([
        satzKopf(ctx, f, { n: lupe }),
        h('div', { class: 'bj-bilanz' }, f.momente.map((m, i) => h('div', { class: 'bj-row', 'data-wahl': wahl[i] || 'pass', 'data-art': m.art },
          h('span', { class: 'bj-tag display small' }, m.tag), h('span', { class: 'bj-row-t' }, m.t),
          h('span', { class: 'pill small' }, wahl[i] === 'beweis' ? 'Beweis' : wahl[i] === 'kein' ? 'kein Beweis' : 'Pass'),
          m.art === 'beweis' ? h('span', { class: 'bj-lupe-mark', title: 'Die Lupe sieht hier einen klaren Beweis' }, CREW.icon('eye', 18)) : m.art === 'trick' ? h('span', { class: 'bj-lupe-mark trick', title: 'Trick-Moment' }, '?') : h('span', { class: 'bj-lupe-mark leer' })))),
        ctx.say('Die Lupe sieht ' + klar.length + ' klare Beweise – du hast ' + gefunden + ' davon. Ein Moment ist ein Trick-Moment. Pausen und Pizza sind keine Gegenbeweise: Sie haben mit dem Satz nichts zu tun.', { eyebrow: 'Bilanz', small: true }),
      ], { eyebrow: 'Bilanz', badge: ctx.stufe(1, LEVELS) });
      CREW.sound.play('good');
      await ctx.next(wB, 'Zur Trick-Frage');

      // Level 2: Die Trick-Frage – ist ein Rückschlag ein Gegenbeweis?
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Ein Moment war ein Rückschlag. Zählt er gegen den neuen Satz – oder gehört er dazu? Lies den Satz genau.' });
      const tm = f.momente[ti];
      const wT = ctx.scr([
        satzKopf(ctx, f, { n: lupe }),
        h('div', { class: 'bj-card static' }, h('div', { class: 'row between' }, h('span', { class: 'bj-tag display' }, tm.tag), h('span', { class: 'pill small' }, 'Du hattest: ' + (wahl[ti] === 'beweis' ? 'Beweis' : wahl[ti] === 'kein' ? 'kein Beweis' : 'Pass'))), h('div', { class: 'bj-card-body' }, h('span', { class: 'bj-card-ic' }, CREW.icon(tm.icon, 34)), h('p', null, tm.t))),
        ctx.say(f.trick.frage, { eyebrow: 'Trick-Frage', small: true }),
      ], { eyebrow: 'Trick-Frage', badge: ctx.stufe(2, LEVELS) });
      const tr = await ctx.ask(wT, [{ label: 'Gegenbeweis', value: 'gegen', variant: 'ghost', icon: 'x', id: 'bj-gegen' }, { label: f.trick.teil, value: 'teil', variant: 'ghost', icon: 'check', id: 'bj-teil' }, { label: 'Weiß nicht', value: 'weiss', variant: 'ghost', id: 'bj-weiss' }]);
      let umgedreht = 0;
      if (tr !== ctx.SKIP) {
        if (tr === 'teil') umgedreht = 1;
        if (wahl[ti] !== 'beweis') lupe++;
        CREW.sound.play(tr === 'teil' ? 'great' : 'unlock');
        const wT2 = ctx.scr([
          satzKopf(ctx, f, { n: lupe }),
          h('div', { class: 'bj-plus' }, CREW.icon('eye', 26), h('b', null, wahl[ti] === 'beweis' ? 'Hattest du schon in der Lupe.' : '+1 in der Lupe')),
          ctx.say((tr === 'teil' ? 'Genau so. ' : tr === 'gegen' ? 'Verständlich – so fühlt es sich an. ' : 'Schau mal: ') + f.trick.erkl, { eyebrow: 'Rückschlag ≠ Gegenbeweis', small: true }),
        ], { eyebrow: 'Trick-Frage', badge: ctx.stufe(2, LEVELS) });
        await ctx.next(wT2, 'Weiter');
      }

      // Level 3: Haltungs-Scans – alter oder neuer Satz im Kopf?
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Gedanken sieht man nicht – den Körper schon. Drei Scans: Welcher Satz ist gerade im Kopf?' });
      let scansOk = 0;
      for (let s = 0; s < f.scans.length; s++) {
        const sc = f.scans[s];
        const w = ctx.scr([
          h('div', { class: 'bj-scan' },
            h('div', { class: 'bj-scan-fig' }, haltungSvg(f.fig, sc.art, 130), h('span', { class: 'bj-scanline', 'aria-hidden': 'true' })),
            h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
              h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Scan ' + (s + 1) + ' von 3 · ' + sc.szene), ctx.readBtn(sc.szene + '. ' + sc.cues.join('. '))),
              sc.cues.map((c, ci) => h('div', { class: 'bj-cue' }, CREW.icon(['user', 'eye', 'chat'][ci] || 'user', 20), h('span', null, c))))),
          ctx.say('Welcher Satz ist bei ' + name + ' gerade im Kopf?', { eyebrow: 'Scan', small: true }),
        ], { eyebrow: 'Haltungs-Scan ' + (s + 1), badge: ctx.stufe(3, LEVELS) });
        const r = await ctx.ask(w, [{ label: 'Alter Satz', value: 'alt', variant: 'ghost', id: 'bj-scan-alt' }, { label: 'Neuer Satz', value: 'neu', variant: 'ghost', id: 'bj-scan-neu' }]);
        if (r === ctx.SKIP) continue;
        const ok = r === sc.art;
        if (ok) scansOk++;
        CREW.sound.play(ok ? 'good' : 'tick');
        const w2 = ctx.scr([
          h('div', { class: 'bj-scan done', 'data-art': sc.art },
            h('div', { class: 'bj-scan-fig' }, haltungSvg(f.fig, sc.art, 130)),
            h('div', { class: 'stack', style: { gap: '8px' } },
              h('span', { class: 'pill ' + (sc.art === 'neu' ? 'good' : ''), style: { alignSelf: 'flex-start' } }, sc.art === 'neu' ? 'Neuer Satz im Kopf' : 'Alter Satz im Kopf'),
              h('b', { class: 'bj-scan-satz' }, '„' + (sc.art === 'neu' ? f.neu : f.alt) + '“'),
              h('p', { class: 'muted', style: { margin: 0 } }, (ok ? 'Scan stimmt. ' : 'Anders als gedacht. ') + 'Woran man es sieht: ' + sc.cues.join(', ') + '.'),
              sc.twist ? h('p', { class: 'small', style: { margin: 0 } }, sc.twist) : null)),
        ], { eyebrow: 'Haltungs-Scan ' + (s + 1), badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w2, s + 1 < f.scans.length ? 'Nächster Scan' : 'Weiter');
      }

      // Austausch zu zweit: dieselbe Vergleichskarte wie überall. Eigene Beweise nur besprechen, nichts eingeben.
      await ctx.T.pairScreen({ badge: ctx.stufe(3, LEVELS) });
      await ctx.T.vergleich({
        title: 'Beweis-Jäger – Vergleichskarte',
        items: [
          { label: 'Lupe: ' + lupe + ' Beweise', icon: 'eye', text: gefunden + ' von ' + klar.length + ' klaren Beweisen gefunden' },
          { label: 'Trick-Moment', icon: 'shuffle', text: tr === 'teil' ? f.trick.teil : tr === 'gegen' ? 'als Gegenbeweis gezählt' : 'offen gelassen' },
          { label: 'Haltungs-Scans', icon: 'user', text: scansOk + ' von 3 gelesen' },
        ],
        questions: ['Welchen Moment hast du anders gezählt als dein Gegenüber – warum?', 'Woran merkt man von außen, welcher Satz gerade im Kopf ist?'],
        note: 'Eigene Beweise nur besprechen, nichts eingeben. Pass ist okay.',
      });
      // Beweis-Challenge der Woche (nur zum Mitnehmen, nichts wird gespeichert)
      const wC = ctx.scr([
        h('div', { class: 'bj-challenge' }, CREW.icon('target', 40),
          h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, 'Beweis-Challenge der Woche'),
            h('b', null, 'Sammelt im Kopf drei Beweise für einen neuen Satz – für einen Figuren-Satz oder euren eigenen.'),
            h('p', { class: 'muted small', style: { margin: 0 } }, 'Nichts aufschreiben, nichts eintippen. Rückschläge zählen, wenn es danach weitergeht.')),
          ctx.readBtn('Beweis-Challenge der Woche: Sammelt im Kopf drei Beweise für einen neuen Satz. Nichts eintippen.')),
        h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Positivitätskette“')),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Mitnehmen', center: true, badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wC, 'Fertig');
      return {
        summary: 'Beweise sammeln heißt: genau hinschauen. Ein Rückschlag ist kein Gegenbeweis, wenn es danach weitergeht.',
        stats: [[lupe, 'Beweise in der Lupe'], [umgedreht, 'Trick-Moment umgedreht'], [scansOk, 'Haltungs-Scans gelesen']],
      };
    },
  });
})();
