/* Spiel „Akku-Woche“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T1 Solo + Austausch · j1-e29
   Tamagotchi für Teenager: Eine Figur durch fünf Abende und Morgen. Kleine Entscheidungen als Bild-Kacheln
   (Handy bis 1 Uhr oder Schlafmodus, Frühstück ja/nein, Treppe oder Lift, nach dem Streit scrollen oder Bodyscan …).
   Akku und Anspannungszahl am nächsten Morgen reagieren sichtbar – ohne Moralpredigt: Jede Folge hat zwei Seiten.
   Level 2: vor dem Morgen schätzen (Akku höher oder tiefer?). Level 3: Ein kleiner Schritt – die Woche läuft nochmal
   und die Kurve zeigt den Unterschied. Vergleichskarte: „Was hat am meisten gebracht – und was machst du in echt?“ (Pass).
   Nichts wird gespeichert. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Abend für Abend', 'Vorhersage', 'Kleiner Schritt'];
  const START = { akku: 70, pegel: 35 };
  const NACHT = 6; // jede Nacht lädt der Schlaf ein bisschen nach – auch nach einem schlechten Abend
  /* Ablauf: Abende (a) und Morgen (m). Jede Option: akku / pegel (Veränderung bis zum nächsten Morgen bzw. bis mittags),
     t = Folge mit zwei Seiten, best = die Option, die ein kleiner Schritt wählen würde. schritt = welcher kleine Schritt sie ersetzt. */
  const TAGE = [
    { tag: 'Montag', art: 'abend', uhr: '22:30', frage: 'Noch am Handy – Videos laufen.', schritt: 'schlaf',
      opts: [
        { id: 'spaet', label: 'Handy bis 1 Uhr', icon: 'phone', akku: -25, pegel: +10, t: 'Die Videos waren lustig. Um 6:45 klingelt der Wecker. Der Kopf ist noch im Feed.' },
        { id: 'modus', label: 'Schlafmodus um 22:30', icon: 'leaf', akku: +20, pegel: -5, best: true, t: 'Kurz langweilig im Bett. Dann acht Stunden Schlaf am Stück.' },
        { id: 'zwanzig', label: 'Noch 20 Minuten, dann Schlafmodus', icon: 'timer', akku: +5, pegel: 0, t: 'Aus 20 Minuten wurden 40. Aber dann war Schluss.' },
      ] },
    { tag: 'Dienstag', art: 'morgen', uhr: '7:10', frage: 'Frühstück?', schritt: 'essen',
      opts: [
        { id: 'toast', label: 'Toast und Banane', icon: 'heart', akku: +10, pegel: -5, best: true, t: 'Fünf Minuten am Tisch. Bis mittags kein Loch im Bauch.' },
        { id: 'nix', label: 'Nichts, keine Zeit', icon: 'x', akku: -10, pegel: +5, t: 'Zehn Minuten länger geschlafen. Um 10 Uhr knurrt der Magen in Mathe.' },
        { id: 'bus', label: 'Banane im Bus', icon: 'timer', akku: +5, pegel: 0, t: 'Schnell und besser als nichts.' },
      ] },
    { tag: 'Dienstag', art: 'abend', uhr: '20:00', frage: 'Streit mit dem Bruder. Die Tür knallt.', schritt: 'runter',
      opts: [
        { id: 'scroll', label: 'Scrollen, bis es vorbei ist', icon: 'phone', akku: -10, pegel: +10, t: 'Fühlt sich kurz besser an. Um Mitternacht ist der Ärger noch da – und der Schlaf weg.' },
        { id: 'bodyscan', label: '5 Minuten Bodyscan', icon: 'leaf', akku: +5, pegel: -15, best: true, t: 'Komisch am Anfang. Danach sind die Schultern unten. Schlafen klappt.' },
        { id: 'musik', label: 'Musik an, Tür zu', icon: 'speaker', akku: 0, pegel: -5, t: 'Drei Songs laut. Der Ärger wird leiser, nicht ganz weg.' },
      ] },
    { tag: 'Mittwoch', art: 'morgen', uhr: '7:45', frage: 'Klassenraum im 4. Stock.', schritt: 'bewegen',
      opts: [
        { id: 'treppe', label: 'Treppe', icon: 'steps', akku: +5, pegel: -5, best: true, t: 'Oben kurz außer Atem – und dann wach.' },
        { id: 'lift', label: 'Lift', icon: 'right', akku: 0, pegel: 0, t: 'Bequem. Der Kopf bleibt im Halbschlaf bis zur zweiten Stunde.' },
      ] },
    { tag: 'Mittwoch', art: 'abend', uhr: '21:00', frage: 'Morgen ist Test.', schritt: 'lernen',
      opts: [
        { id: 'pauken', label: 'Bis 23 Uhr pauken', icon: 'timer', akku: -15, pegel: +5, t: 'Viel gelesen, wenig behalten. Im Bett rattert der Kopf weiter.' },
        { id: 'dreissig', label: '30 Minuten, dann Schluss', icon: 'check', akku: +5, pegel: -5, best: true, t: 'Das Wichtigste wiederholt. Der Rest muss reichen – und reicht meistens.' },
        { id: 'gar', label: 'Gar nicht lernen', icon: 'x', akku: +5, pegel: +15, t: 'Entspannter Abend. Am Morgen kommt die Panik doppelt.' },
      ] },
    { tag: 'Donnerstag', art: 'morgen', uhr: '7:55', frage: 'Vor dem Test.', schritt: 'atmen',
      opts: [
        { id: 'atmen', label: 'Drei Atemzüge vor der Tür', icon: 'leaf', akku: 0, pegel: -10, best: true, t: 'Dreimal lang ausatmen. Der Puls geht runter, der Stift liegt ruhiger.' },
        { id: 'scrollen', label: 'Bis zur Tür scrollen', icon: 'phone', akku: 0, pegel: +5, t: 'Im Klassenchat schreiben alle, wie schwer der Test wird. Super.' },
      ] },
    { tag: 'Donnerstag', art: 'abend', uhr: '21:30', frage: 'Die anderen zocken online. „Kommst du?“', schritt: 'schlaf',
      opts: [
        { id: 'null', label: 'Zocken bis 0 Uhr', icon: 'star', akku: -20, pegel: -5, t: 'Bester Abend der Woche, viel gelacht. Morgen früh: Akku im Keller. Beides stimmt.' },
        { id: 'runde', label: 'Eine Runde, dann Schluss', icon: 'check', akku: +5, pegel: -5, best: true, t: 'Eine Runde Spaß, dann Schlafmodus. Die anderen fanden das okay.' },
        { id: 'absagen', label: 'Absagen, früh ins Bett', icon: 'leaf', akku: +15, pegel: +5, t: 'Gut ausgeschlafen. Aber das Gefühl, was zu verpassen, bleibt kurz.' },
      ] },
    { tag: 'Freitag', art: 'morgen', uhr: '7:20', frage: 'Zur Schule: Rad oder Bus?', schritt: 'bewegen',
      opts: [
        { id: 'rad', label: 'Mit dem Rad', icon: 'right', akku: +10, pegel: -10, best: true, t: 'Kalte Luft, 15 Minuten treten. In der ersten Stunde hellwach.' },
        { id: 'bus2', label: 'Mit dem Bus', icon: 'users', akku: 0, pegel: 0, t: 'Warm und trocken. Im Bus nochmal die Augen zu.' },
      ] },
    { tag: 'Freitag', art: 'abend', uhr: '19:00', frage: 'Endlich Wochenende.', schritt: null,
      opts: [
        { id: 'raus', label: 'Raus mit Freunden', icon: 'users', akku: +5, pegel: -10, t: 'Lachen, Pommes, frische Luft. Müde – aber die gute Sorte.' },
        { id: 'serie', label: 'Allein Serie bis 2 Uhr', icon: 'play', akku: -15, pegel: 0, t: 'Sechs Folgen. Samstag erst um 12 wach.' },
        { id: 'beides', label: 'Raus, um 23 Uhr heim', icon: 'calendar', akku: +10, pegel: -10, t: 'Ein guter Abend und ein guter Samstag. Geht beides.' },
      ] },
  ];
  /* Kleine Schritte für Level 3 – je einer ersetzt die passenden Entscheidungen durch die „best“-Option */
  const SCHRITTE = [
    { id: 'schlaf', label: 'Schlafmodus um 22:30', icon: 'leaf' },
    { id: 'essen', label: 'Frühstück – eine Banane reicht', icon: 'heart' },
    { id: 'runter', label: 'Nach Streit: Bodyscan statt Scrollen', icon: 'eye' },
    { id: 'bewegen', label: 'Treppe und Rad statt Lift und Bus', icon: 'steps' },
  ];
  const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));

  /* Woche durchrechnen: Werte an jedem Morgen (Mo … Sa) */
  function simuliere(wahl) {
    let akku = START.akku, pegel = START.pegel;
    const morgen = [{ tag: 'Mo', akku, pegel }];
    TAGE.forEach((d, i) => {
      const o = d.opts.find((x) => x.id === wahl[i]) || d.opts[d.opts.length - 1];
      akku = clamp(akku + o.akku + (d.art === 'abend' ? NACHT : 0)); pegel = clamp(pegel + o.pegel);
      if (d.art === 'abend') morgen.push({ tag: ['Di', 'Mi', 'Do', 'Fr', 'Sa'][morgen.length - 1], akku, pegel });
    });
    return morgen;
  }
  function mitSchritt(wahl, schritt) {
    return wahl.map((w, i) => (TAGE[i].schritt === schritt ? TAGE[i].opts.find((o) => o.best).id : w));
  }

  /* Das Akku-Gerät (Tamagotchi): Figur, Akku-Batterie, Anspannung */
  function geraet(ctx, fig, akku, pegel, o) {
    const oo = o || {};
    const mood = akku >= 60 && pegel < 50 ? 'froh' : akku < 35 ? 'traurig' : pegel >= 60 ? 'genervt' : 'neutral';
    const m = ctx.meter({ value: pegel, label: 'Anspannung' });
    return h('div', { class: 'ak-egg' + (oo.small ? ' small' : '') },
      h('div', { class: 'ak-screen' },
        h('span', { class: 'ak-time' }, oo.zeit || ''),
        h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } }, h('span', { class: 'ak-label' }, 'Akku'), h('div', { class: 'ak-batt', 'data-level': akku < 30 ? 'low' : akku < 60 ? 'mid' : 'ok', 'aria-label': 'Akku ' + akku + ' Prozent' }, h('i', { style: { width: akku + '%' } }), h('b', null, akku + ' %'))),
        h('div', { class: 'ak-fig' }, ctx.avatar(fig, mood, oo.small ? 70 : 96)),
        m.el),
      h('div', { class: 'ak-knoepfe' }, h('i'), h('i'), h('i')));
  }

  /* Kurve: Akku an jedem Morgen. Eine Achse (0–100 %), dünne Linien, Endwerte direkt beschriftet. */
  function kurve(serien) {
    const W = 520, H = 220, L = 44, R = 70, T = 16, B = 34;
    const n = serien[0].werte.length;
    const x = (i) => L + (i * (W - L - R)) / (n - 1);
    const y = (v) => T + ((100 - v) * (H - T - B)) / 100;
    let svg = '';
    [0, 50, 100].forEach((v) => { svg += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="ak-grid"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" class="ak-axis">${v} %</text>`; });
    serien[0].werte.forEach((p, i) => { svg += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" class="ak-axis">${p.tag}</text>`; });
    // Endwerte direkt an der Linie; liegen sie zu nah beieinander, rückt das zweite Label weg
    const ends = serien.map((s) => y(s.werte[n - 1].akku) + 4);
    if (ends.length === 2 && Math.abs(ends[0] - ends[1]) < 16) { if (ends[1] <= ends[0]) ends[1] = ends[0] - 16; else ends[1] = ends[0] + 16; }
    serien.forEach((s, si) => {
      const pts = s.werte.map((p, i) => x(i) + ',' + y(p.akku)).join(' ');
      svg += `<polyline points="${pts}" fill="none" class="ak-line ${s.cls}"/>`;
      s.werte.forEach((p, i) => { svg += `<circle cx="${x(i)}" cy="${y(p.akku)}" r="5" class="ak-dot ${s.cls}"><title>${s.name} · ${p.tag}: ${p.akku} %</title></circle>`; });
      svg += `<text x="${x(n - 1) + 10}" y="${ends[si]}" class="ak-endlabel">${s.werte[n - 1].akku} %</text>`;
    });
    const el = h('div', { class: 'ak-chart' },
      h('div', { class: 'ak-legend' }, serien.map((s) => h('span', { class: 'ak-leg ' + s.cls }, h('i'), s.name))),
      h('div', { class: 'ak-svg', html: `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Akku an jedem Morgen"><title>Akku an jedem Morgen</title>${svg}</svg>` }),
      h('table', { class: 'ak-table' }, h('caption', null, 'Akku an jedem Morgen'), h('tr', null, h('th', null, ''), serien[0].werte.map((p) => h('th', null, p.tag))), serien.map((s) => h('tr', null, h('th', null, s.name), s.werte.map((p) => h('td', null, p.akku + ' %'))))));
    return el;
  }

  CREW.registerGame({
    id: 'akku-woche',
    tage: TAGE, simuliere, mitSchritt, schritte: SCHRITTE, // für den Test
    template: 'T1',
    icon: 'bolt',
    themen: ['Schlaf', 'Bewegung', 'Pausen', 'Anspannung', 'Kleiner Schritt'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Du steuerst eine Figur durch eine Schulwoche. Abends und morgens eine kleine Entscheidung. Am Morgen danach zeigt das Gerät Akku und Anspannung.',
        levels: LEVELS,
        steps: [
          { icon: 'calendar', title: 'Abend für Abend', text: 'Handy, Essen, Streit, Test – du entscheidest.' },
          { icon: 'eye', title: 'Vorhersage', text: 'Erst schätzen: Akku höher oder tiefer?' },
          { icon: 'leaf', title: 'Kleiner Schritt', text: 'Ein Schritt anders – die Woche nochmal.' },
        ],
        probe: ctx.T.probeCard('Probe: Sam ist um 23 Uhr noch wach. Akku morgen früh: höher oder tiefer? Tipp irgendwas – zählt nicht.', [{ label: 'Höher', value: 1, variant: 'ghost', icon: 'plus' }, { label: 'Tiefer', value: 2, variant: 'ghost', icon: 'minus' }]),
      });
      await ctx.T.codeCheck();
      // Figur per Tagescode – nach dem Code-Check, damit alle iPads dieselbe Figur haben (Vergleichskarte)
      const fig = ctx.rpick(['luca', 'yara', 'mika', 'sam']);
      const name = ctx.figures[fig].name;
      const wahl = [];
      let akku = START.akku, pegel = START.pegel, treffer = 0, tipps = 0;
      let lastL = 1;
      for (let i = 0; i < TAGE.length; i++) {
        const d = TAGE[i];
        const L = i < 4 ? 1 : i < 8 ? 2 : 3;
        if (L !== lastL) { lastL = L; await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt schätzt du vorher: Ist der Akku am nächsten Morgen höher oder tiefer als jetzt?' : 'Letzter Abend. Danach suchst du einen kleinen Schritt – und die Woche läuft nochmal.' }); }
        const w = ctx.scr([
          h('div', { class: 'ak-layout' }, geraet(ctx, fig, akku, pegel, { zeit: d.tag + ' ' + d.uhr }),
            h('div', { class: 'stack' },
              ctx.say(d.tag + (d.art === 'abend' ? 'abend, ' : 'morgen, ') + d.uhr + ': ' + d.frage + ' Was macht ' + name + '?', { eyebrow: d.art === 'abend' ? 'Abend' : 'Morgen', small: true }),
              h('div', { class: 'ak-woche' }, ['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((t, ti) => h('span', { class: 'ak-tag' + (d.tag.startsWith(t) ? ' now' : TAGE.findIndex((x) => x.tag.startsWith(t)) < i ? ' done' : '') }, t))))),
        ], { eyebrow: d.tag + ' · ' + (d.art === 'abend' ? 'Abend' : 'Morgen'), step: i + 1, badge: ctx.stufe(L, LEVELS) });
        const r = await ctx.ask(w, d.opts.map((o) => ({ label: o.label, value: o.id, icon: o.icon, variant: 'ghost', id: 'ak-' + o.id })));
        const opt = d.opts.find((o) => o.id === r) || d.opts[d.opts.length - 1];
        wahl.push(opt.id);
        const neuAkku = clamp(akku + opt.akku + (d.art === 'abend' ? NACHT : 0)), neuPegel = clamp(pegel + opt.pegel);
        if (r === ctx.SKIP) { akku = neuAkku; pegel = neuPegel; continue; }
        // Level 2: Vorhersage vor dem Morgen
        let tipp = null;
        if (L === 2 && d.art === 'abend') {
          const wv = ctx.scr([
            h('div', { class: 'ak-layout' }, geraet(ctx, fig, akku, pegel, { zeit: d.tag + ' ' + d.uhr }),
              ctx.say(name + ': „' + opt.label + '“. Was schätzt du: Ist der Akku morgen früh höher oder tiefer als jetzt (' + akku + ' %)?', { eyebrow: 'Vorhersage', small: true })),
          ], { eyebrow: d.tag + ' · Vorhersage', badge: ctx.stufe(2, LEVELS) });
          tipp = await ctx.ask(wv, [{ label: 'Höher', value: 'hoch', icon: 'plus', variant: 'ghost', id: 'ak-hoch' }, { label: 'Gleich', value: 'gleich', variant: 'ghost', id: 'ak-gleich' }, { label: 'Tiefer', value: 'tief', icon: 'minus', variant: 'ghost', id: 'ak-tief' }]);
          if (tipp !== ctx.SKIP) {
            tipps++;
            const ist = neuAkku > akku ? 'hoch' : neuAkku < akku ? 'tief' : 'gleich';
            if (tipp === ist) treffer++;
            tipp = { tipp, ist };
          } else tipp = null;
        }
        const diffA = neuAkku - akku, diffP = neuPegel - pegel;
        akku = neuAkku; pegel = neuPegel;
        const naechster = d.art === 'abend' ? (TAGE[i + 1] ? TAGE[i + 1].tag : 'Samstag') + ' früh' : d.tag + ' mittags';
        const wr = ctx.scr([
          h('div', { class: 'ak-layout' }, geraet(ctx, fig, akku, pegel, { zeit: naechster }),
            h('div', { class: 'stack' },
              h('div', { class: 'ak-delta' }, h('span', { class: 'ak-chip ' + (diffA >= 0 ? 'up' : 'down') }, 'Akku ' + (diffA >= 0 ? '+' : '') + diffA), h('span', { class: 'ak-chip ' + (diffP <= 0 ? 'up' : 'down') }, 'Anspannung ' + (diffP >= 0 ? '+' : '') + diffP)),
              ctx.figureCard({ fig, mood: diffA >= 0 && diffP <= 0 ? 'froh' : diffA < -10 ? 'traurig' : 'neutral', text: opt.t, eyebrow: naechster, size: 64 }),
              tipp ? h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon(tipp.tipp === tipp.ist ? 'check' : 'shuffle', 22), h('span', null, tipp.tipp === tipp.ist ? 'Vorhersage stimmt.' : 'Anders als geschätzt – der Körper rechnet manchmal anders.')) : null)),
        ], { eyebrow: naechster, badge: ctx.stufe(L, LEVELS) });
        CREW.sound.play(diffA >= 0 ? 'good' : 'tick');
        await ctx.next(wr, i + 1 < TAGE.length ? 'Weiter' : 'Zum Wochenende');
      }
      // Level 3: Ein kleiner Schritt – die Woche läuft nochmal
      const woche = simuliere(wahl);
      const schonDrin = (s) => TAGE.every((d, i) => d.schritt !== s.id || wahl[i] === d.opts.find((o) => o.best).id);
      const offen = SCHRITTE.filter((s) => !schonDrin(s));
      let schritt = null, plus = 0;
      if (offen.length) {
        const ws = ctx.scr([
          kurve([{ name: 'Deine Woche', cls: 'a', werte: woche }]),
          ctx.say('Wähl EINEN kleinen Schritt für ' + name + '. Die Woche läuft dann nochmal – alles andere bleibt gleich.', { eyebrow: 'Kleiner Schritt', small: true }),
          SCHRITTE.length !== offen.length ? h('p', { class: 'muted small' }, 'Schon drin: ' + SCHRITTE.filter(schonDrin).map((s) => s.label).join(' · ')) : null,
        ], { eyebrow: 'Kleiner Schritt', badge: ctx.stufe(3, LEVELS) });
        const s = await ctx.ask(ws, offen.map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: 'ghost', id: 'ak-schritt-' + x.id })));
        if (s !== ctx.SKIP) {
          schritt = SCHRITTE.find((x) => x.id === s);
          const neu = simuliere(mitSchritt(wahl, s));
          plus = neu[neu.length - 1].akku - woche[woche.length - 1].akku;
          CREW.sound.play(plus > 0 ? 'great' : 'good');
          const wk = ctx.scr([
            kurve([{ name: 'Deine Woche', cls: 'a', werte: woche }, { name: 'Mit „' + schritt.label + '“', cls: 'b', werte: neu }]),
            h('div', { class: 'ak-plus' }, h('b', { class: 'display' }, (plus >= 0 ? '+' : '') + plus + ' %'), h('span', null, 'Akku am Samstag – mit einem einzigen kleinen Schritt.')),
            h('p', { class: 'muted' }, 'Kein Perfekt-Plan. Ein Schritt reicht, damit die ganze Kurve anders aussieht.'),
            h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Energie-Check“')),
          ], { eyebrow: 'Kleiner Schritt · Ergebnis', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(wk, 'Weiter');
        }
      } else {
        const wk = ctx.scr([
          kurve([{ name: 'Deine Woche', cls: 'a', werte: woche }]),
          ctx.say(name + 's Woche hatte alle kleinen Schritte schon drin. Sieht man an der Kurve. Was davon klappt im echten Alltag am leichtesten?', { eyebrow: 'Kleiner Schritt', small: true }),
        ], { eyebrow: 'Kleiner Schritt', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wk, 'Weiter');
      }
      // Austausch zu zweit: dieselbe Vergleichskarte wie überall
      await ctx.T.pairScreen({ badge: ctx.stufe(3, LEVELS) });
      const sa = woche[woche.length - 1];
      await ctx.T.vergleich({
        title: 'Akku-Woche – Vergleichskarte',
        items: [
          { label: name + ' am Samstag: Akku ' + sa.akku + ' %', icon: 'bolt', text: 'Anspannung ' + sa.pegel },
          { label: schritt ? 'Kleiner Schritt: ' + schritt.label : 'Kleiner Schritt: schon alles drin', icon: 'leaf', text: schritt ? 'macht ' + (plus >= 0 ? '+' : '') + plus + ' % am Samstag' : '' },
          tipps ? { label: 'Vorhersagen', icon: 'eye', text: treffer + ' von ' + tipps + ' gestimmt' } : null,
        ].filter(Boolean),
        questions: ['Was hat ' + name + ' am meisten gebracht – und warum?', 'Und was machst du in echt? (Pass ist okay)'],
        note: 'Keine Woche ist perfekt – auch die von ' + name + ' nicht. Pass ist okay.',
      });
      return {
        summary: 'Schlaf, Essen, Bewegung und Pausen laden den Akku. Ein kleiner Schritt verändert die ganze Woche.',
        stats: [[sa.akku + ' %', 'Akku am Samstag'], [treffer, 'Vorhersagen gestimmt'], [schritt ? 1 : 0, 'kleiner Schritt getestet']],
      };
    },
  });
})();
