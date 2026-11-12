/* Spiel „Satz-Werkstatt“ (Thema: Gedanken & Glaubenssätze) · Vorlage T2 Rollen-Puzzle · j1-e18, j1-e19
   Gekürzt nach der Kritik: A sieht Figur, bremsenden Satz und was passiert ist. B hat vier Regeln als Icons
   (realistisch, kurz, ohne „immer/nie“, Ich-Form). C hat zwei Beweis-Karten (nur die sind echt). D hat die
   Bausteine und baut den neuen Satz nach Ansage. B prüft laut; beim Prüfen leuchtet jede erfüllte Regel auf
   Ds iPad (D hält es hoch oder es hängt am Beamer) – „3 von 4, ihr habt noch ein ‚nie‘ drin!“ und ein Hinweis,
   wen ihr nochmal fragen solltet. Fall 2 braucht einen echten Beweis von C. Level 3: Stresstest – hält der faire
   Satz, wenn die alte Stimme zurückkommt? Vorlese-Knopf für D, Beobachter-Rolle für wer passen will. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Bauen', 'Mit Beweis', 'Stresstest'];
  const MAX_WOERTER = 18;
  const REGELN = [
    { id: 'real', icon: 'eye', name: 'Realistisch', text: 'stimmt wirklich, nichts schöngeredet' },
    { id: 'kurz', icon: 'timer', name: 'Kurz', text: 'passt in einen Atemzug (höchstens ' + MAX_WOERTER + ' Wörter)' },
    { id: 'nie', icon: 'x', name: 'Ohne „immer/nie“', text: 'kein immer, nie, alle, alles, sowieso' },
    { id: 'ich', icon: 'user', name: 'Ich-Form', text: 'die Figur spricht selbst: ich, mir, mich' },
  ];
  const ZEILEN = [{ id: 'kern', name: 'Kern' }, { id: 'beweis', name: 'Beweis' }, { id: 'schluss', name: 'Schluss' }];
  const OHNE = { t: '— ohne —', leer: true };

  /* Fälle: Figur, alter Satz, Situation, Cs Beweis-Karten, Ds Bausteine je Zeile.
     Baustein-Flags: real:false (schöngeredet/erfunden), ich:false (nicht Ich-Form), wort (Falle: immer/nie/alle …),
     lang (Bandwurm). Mindestens eine Kombination erfüllt alle vier Regeln (tests/gedanken-digital.mjs prüft das). */
  const FAELLE = [
    {
      id: 'kuchen', fig: 'mika', mood: 'traurig', alt: 'Ich kann nie was richtig.',
      situation: 'Mika hat für den Klassen-Basar gebacken – und Salz mit Zucker verwechselt. Alle haben das Gesicht verzogen.',
      beweise: ['Letzte Woche hat Mika die Fahrradkette allein repariert.', 'Mikas Bio-Plakat hing zwei Wochen im Flur.'],
      kern: [{ t: 'Ich mache manchmal Fehler.' }, { t: 'Ich kann nie was richtig.', wort: 'nie', real: false }, { t: 'Ich bin der perfekte Bäcker.', real: false, schoen: true }, { t: 'Du verbockst halt immer alles.', ich: false, wort: 'immer' }],
      beweis: [{ t: 'Die Fahrradkette hab ich allein repariert.', echt: true }, { t: 'Mein Plakat hing im Flur.', echt: true }, { t: 'Mein Kuchen hat einen Preis gewonnen.', real: false }, { t: 'Und sonst klappt bei mir sowieso immer alles total super, echt jetzt.', wort: 'sowieso', lang: true, real: false }],
      schluss: [{ t: 'Das kann ich lernen.' }, { t: 'Nächstes Mal lese ich das Rezept zweimal.' }, { t: 'Ich backe nie wieder.', wort: 'nie' }],
      stress: { event: 'Zwei Tage später vergisst Mika das Sportzeug.', stimme: 'Siehste? Nie kriegst du was hin!' },
    },
    {
      id: 'laut', fig: 'yara', mood: 'genervt', alt: 'Alle finden mich nervig.',
      situation: 'In der Gruppenarbeit sagt jemand: „Yara, chill mal.“ Zwei lachen.',
      beweise: ['Sam hat Yara gestern gefragt, ob sie mit ins Kino kommt.', 'Das Handball-Team hat Yara zur Kapitänin gewählt.'],
      kern: [{ t: 'Ich war gerade einem zu laut.' }, { t: 'Alle finden mich nervig.', wort: 'alle', real: false }, { t: 'Ich bin die Beliebteste der Schule.', real: false, schoen: true }, { t: 'Man ist halt immer allen zu viel.', ich: false, wort: 'immer' }],
      beweis: [{ t: 'Sam hat mich gestern ins Kino eingeladen.', echt: true }, { t: 'Das Team hat mich zur Kapitänin gewählt.', echt: true }, { t: 'Die ganze Schule hat mir gratuliert.', real: false }, { t: 'Und eigentlich mögen mich ja sowieso alle total gern, das weiß doch jeder.', wort: 'alle', lang: true, real: false }],
      schluss: [{ t: 'Ich darf trotzdem ich sein.' }, { t: 'Nächstes Mal frag ich nach.' }, { t: 'Ich sag nie wieder was.', wort: 'nie' }],
      stress: { event: 'Am Montag sagt wieder jemand: „Psst, Yara!“', stimme: 'Hörst du? Alle finden dich nervig!' },
    },
    {
      id: 'lauf', fig: 'luca', mood: 'angst', alt: 'Ich schaff das eh nie.',
      situation: 'Luca soll beim Sportfest 800 Meter laufen. Im Training musste Luca nach 400 Metern gehen.',
      beweise: ['Vor drei Wochen schaffte Luca nur 200 Meter am Stück.', 'Luca trainiert zweimal pro Woche.'],
      kern: [{ t: 'Ich laufe noch nicht 800 Meter.' }, { t: 'Ich schaff das eh nie.', wort: 'nie', real: false }, { t: 'Ich bin schneller als jeder Profi.', real: false, schoen: true }, { t: 'Du bist halt kein Läufer-Typ.', ich: false }],
      beweis: [{ t: 'Vor drei Wochen schaffte ich 200 Meter.', echt: true }, { t: 'Ich trainiere zweimal pro Woche.', echt: true }, { t: 'Ich hab schon einen Marathon geschafft.', real: false }, { t: 'Und alle anderen sind ja sowieso viel schneller als ich, das war schon immer so.', wort: 'immer', lang: true, ich: false }],
      schluss: [{ t: 'Jede Woche wird es mehr.' }, { t: 'Bis zum Sportfest übe ich weiter.' }, { t: 'Ich werde immer Letzter sein.', wort: 'immer' }],
      stress: { event: 'Beim nächsten Training muss Luca nach 500 Metern wieder gehen.', stimme: 'Hab ich doch gesagt. Du schaffst das nie!' },
    },
    {
      id: 'bus', fig: 'sam', mood: 'traurig', alt: 'Ich bin einfach peinlich.',
      situation: 'Sam ist im Bus vor allen gestolpert. Der Kakao ist auf der Jacke gelandet.',
      beweise: ['Gestern hat Sam die Klasse mit einem Witz zum Lachen gebracht.', 'Sam hat neulich einem Fünftklässler den Weg gezeigt.'],
      kern: [{ t: 'Mir ist gerade was Peinliches passiert.' }, { t: 'Ich bin einfach peinlich.', real: false }, { t: 'Ich bin der coolste Mensch im Bus.', real: false, schoen: true }, { t: 'Alle lachen immer über dich.', ich: false, wort: 'alle' }],
      beweis: [{ t: 'Gestern hab ich die Klasse zum Lachen gebracht.', echt: true }, { t: 'Ich hab einem Kleinen den Weg gezeigt.', echt: true }, { t: 'Ich hab den Preis für Coolness gewonnen.', real: false }, { t: 'Und sowieso passieren mir immer nur die peinlichsten Sachen der ganzen Welt.', wort: 'immer', lang: true, real: false }],
      schluss: [{ t: 'Das passiert jedem mal.' }, { t: 'Morgen fahr ich wieder Bus.' }, { t: 'Ich fahr nie wieder Bus.', wort: 'nie' }],
      stress: { event: 'In der Pause zeigt jemand noch mal auf Sams Jacke.', stimme: 'Siehste? Du bist und bleibst peinlich!' },
    },
  ];

  const woerter = (s) => s.split(/\s+/).filter(Boolean).length;
  const satzAus = (sel) => ZEILEN.map((z) => sel[z.id]).filter((b) => b && !b.leer).map((b) => b.t).join(' ');
  /* Regeln prüfen. needBeweis: Fall 2 braucht einen echten Beweis von C. */
  function pruefe(sel, needBeweis) {
    const bs = ZEILEN.map((z) => sel[z.id]).filter((b) => b && !b.leer);
    const n = woerter(satzAus(sel));
    const trap = bs.find((b) => b.wort);
    const res = {
      real: !!sel.kern && !sel.kern.leer && bs.every((b) => b.real !== false) && (!needBeweis || !!(sel.beweis && sel.beweis.echt)),
      kurz: n > 0 && n <= MAX_WOERTER && !bs.some((b) => b.lang),
      nie: !trap,
      ich: bs.length > 0 && bs.every((b) => b.ich !== false),
    };
    res.n = REGELN.filter((r) => res[r.id]).length;
    res.woerter = n;
    res.trap = trap ? trap.wort : null;
    res.ohneBeweis = needBeweis && !(sel.beweis && !sel.beweis.leer);
    res.falscherBeweis = !!(sel.beweis && !sel.beweis.leer && sel.beweis.real === false);
    return res;
  }
  // Eine Kombination mit 4 von 4 (Muster für die Auflösung): erster passender Baustein je Zeile
  function muster(f) {
    for (const k of f.kern) for (const b of f.beweis) for (const s of f.schluss) {
      const sel = { kern: k, beweis: b, schluss: s };
      if (pruefe(sel, true).n === 4) return sel;
    }
    return null;
  }
  function hinweis(res, name) {
    if (!res.nie) return 'Ihr habt noch ein „' + res.trap + '“ drin! B: Ohne immer und nie.';
    if (!res.ich) return 'Da redet noch jemand anderes als ' + name + '. B: Ist das Ich-Form?';
    if (!res.real) return res.ohneBeweis ? 'Ohne Beweis glaubt ' + name + ' es nicht. C: Welcher Beweis ist echt?' : res.falscherBeweis ? 'Diesen Beweis hat C nicht auf der Karte. C: Welche Beweise sind echt?' : 'Klingt schön – aber stimmt es? A: Würde ' + name + ' das glauben?';
    if (!res.kurz) return 'Zu lang für einen Atemzug (' + res.woerter + ' Wörter). B: Kurz?';
    return 'Alle vier Regeln erfüllt!';
  }

  const iconCard = (icon, title, text) => h('div', { class: 'icon-card' }, CREW.icon(icon, 32), h('b', null, title), text ? h('span', { class: 'muted small' }, text) : null);
  const lampen = (res) => h('div', { class: 'sw-lamps' }, REGELN.map((r) => h('div', { class: 'sw-lamp' + (res && res[r.id] ? ' on' : ''), 'data-regel': r.id }, CREW.icon(res && res[r.id] ? 'check' : r.icon, 26), h('b', null, r.name))));

  /* Was zeigt dieses iPad? Nur den eigenen Teil. */
  function slice(ctx, role, f, L) {
    const name = ctx.figures[f.fig].name;
    if (role === 'A') return h('div', { class: 'stack' },
      ctx.figureCard({ fig: f.fig, mood: f.mood, text: '„' + f.alt + '“', eyebrow: name + ' denkt', speakText: name + ' denkt: ' + f.alt + '. ' + f.situation }),
      h('div', { class: 'slice' }, h('b', null, 'Was passiert ist'), h('p', { style: { margin: 0 } }, f.situation),
        h('p', { class: 'muted small' }, 'Lies beides laut vor. Dann sag der Crew: Was bräuchte ' + name + ' jetzt für einen Satz? Bei „Würde ' + name + ' das glauben?“ entscheidest du.')));
    if (role === 'B') return h('div', { class: 'slice' },
      h('div', { class: 'row between' }, h('b', null, 'Vier Regeln für den neuen Satz'), ctx.readBtn('Vier Regeln: ' + REGELN.map((r) => r.name + ': ' + r.text).join('. '))),
      h('div', { class: 'icon-cards' }, REGELN.map((r) => iconCard(r.icon, r.name, r.text))),
      h('p', { class: 'muted small' }, 'Prüf jeden Vorschlag laut, Regel für Regel: „Realistisch? Kurz? Ohne immer und nie? Ich-Form?“'));
    if (role === 'C') return h('div', { class: 'slice' },
      h('div', { class: 'row between' }, h('b', null, 'Beweis-Karten: Das ist wirklich passiert'), ctx.readBtn('Beweise: ' + f.beweise.join(' '))),
      h('div', { class: 'stack' }, f.beweise.map((b) => h('div', { class: 'sw-beweis' }, CREW.icon('check', 22), h('span', null, b)))),
      h('p', { class: 'muted small' }, L >= 2 ? 'Diesmal braucht der Satz einen echten Beweis. D hat auch erfundene Beweise – nur deine Karten sind echt.' : 'Nur diese Beweise sind echt. D hat auch erfundene – sag laut, welche stimmen.'));
    if (role === 'D') return h('div', { class: 'slice' },
      h('b', null, 'Du bist die Werkbank'),
      h('p', { class: 'muted small', style: { margin: 0 } }, 'Gleich siehst du die Bausteine. Bau nur, was die Crew ansagt. Prüfen erst, wenn alle zustimmen. Dein iPad zeigt beim Prüfen die Regel-Lampen – halt es hoch.'));
    return h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Du hast kein Puzzle-Teil. Deine Aufgabe:'),
      h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass B jede Regel laut prüft.'), h('li', null, 'Frag: „Hat jemand C nach den Beweisen gefragt?“'), h('li', null, 'Am Ende: Welche Rolle hat den Satz gerettet?')),
      h('p', { class: 'muted small' }, 'Figur: ' + name + '. Die Bausteine bleiben für dich verdeckt.'));
  }

  /* Ds Werkbank: Bausteine wählen, Satz ansehen, prüfen. Rückgabe { res, sel, tries } oder null (Pass) */
  async function werkbank(ctx, f, L, ey) {
    const name = ctx.figures[f.fig].name;
    // Eigener Zufall für die Werkbank: Nur D mischt hier – der gemeinsame Tagescode-Zufall bleibt auf allen iPads gleich
    const brng = CREW.seed.rng(ctx.code, 'satz-werkstatt-bank', f.id);
    const mix = (arr) => CREW.seed.shuffle(arr, brng);
    const opts = { kern: mix(f.kern), beweis: mix(f.beweis).concat([OHNE]), schluss: mix(f.schluss).concat([OHNE]) };
    const apick = (arr) => arr[Math.floor(ctx.autoRng() * arr.length)];
    const best = muster(f);
    let sel = { kern: null, beweis: null, schluss: null };
    for (let tries = 1; ; tries++) {
      const preview = h('p', { class: 'say small-say sw-preview' });
      const count = h('span', { class: 'pill' });
      let pruefBtn;
      const upd = () => {
        const s = satzAus(sel);
        preview.textContent = s ? '„' + s + '“' : '… noch leer …';
        preview.classList.toggle('muted', !s);
        count.textContent = woerter(s) + ' Wörter';
        if (pruefBtn) pruefBtn.disabled = !sel.kern;
      };
      const rows = ZEILEN.map((z) => {
        const row = h('div', { class: 'sw-blocks' }, opts[z.id].map((b) => {
          const c = h('button', { type: 'button', class: 'chip sw-block' + (sel[z.id] === b ? ' sel' : ''), 'data-zeile': z.id }, b.t);
          c.addEventListener('click', () => { CREW.sound.play('tap'); sel[z.id] = sel[z.id] === b ? null : b; row.querySelectorAll('.chip').forEach((x) => x.classList.remove('sel')); if (sel[z.id]) c.classList.add('sel'); upd(); });
          return c;
        }));
        return h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, z.name + (z.id === 'kern' ? ' (Pflicht)' : '')), row);
      });
      const done = new Promise((res) => { pruefBtn = CREW.ui.btn('Prüfen', () => res(true), { iconRight: 'check', id: 'sw-pruefen', disabled: !sel.kern }); });
      ctx.scr([
        h('div', { class: 'card stack sw-bench' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, name + 's neuer Satz · Versuch ' + tries), h('div', { class: 'row', style: { gap: '8px' } }, count, ctx.readBtn(() => satzAus(sel) || 'Noch leer.'))),
          preview,
          h('div', { class: 'row between' }, h('span', { class: 'muted small' }, 'Alter Satz: „' + f.alt + '“ · Erst bauen, B prüft laut, dann tippen.'), pruefBtn)),
        rows,
      ], { eyebrow: ey + ' · Werkbank', badge: ctx.stufe(L, LEVELS) });
      upd();
      if (ctx.auto) {
        // Auto-Modus: erster Versuch zufällig, danach das Muster
        setTimeout(() => {
          const pick = tries >= 2 ? best : { kern: apick(f.kern), beweis: apick(opts.beweis), schluss: apick(opts.schluss) };
          sel = Object.assign({}, pick);
          upd();
          if (pruefBtn.isConnected) pruefBtn.click();
        }, Math.max(40, window.__crewAutoDelay || 0));
      }
      const r = await ctx.waitFor(done);
      if (r === ctx.SKIP) return null;
      const res = pruefe(sel, L >= 2);
      CREW.sound.play(res.n === 4 ? 'great' : 'soft');
      const w2 = ctx.scr([
        h('div', { class: 'sw-score' + (res.n === 4 ? ' full' : '') }, h('b', { class: 'display' }, res.n + ' von 4'), h('span', null, hinweis(res, name))),
        lampen(res),
        h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Euer Satz'), h('p', { class: 'say small-say', style: { margin: 0 } }, '„' + satzAus(sel) + '“')),
      ], { eyebrow: ey + ' · Prüfen', badge: ctx.stufe(L, LEVELS) });
      if (res.n === 4) { await ctx.next(w2, 'Satz steht'); return { res, sel, tries }; }
      const a = await ctx.ask(w2, [{ label: 'Auflösen', value: 'show', variant: 'ghost', auto: false, id: 'sw-aufloesen' }, { label: 'Umbauen', value: 'again', iconRight: 'undo', id: 'sw-umbauen' }]);
      if (a === ctx.SKIP) return null;
      if (a === 'show') return { res, sel, tries, aufgeloest: true };
    }
  }

  CREW.registerGame({
    id: 'satz-werkstatt',
    faelle: FAELLE, pruefe, muster, // für den Test: CREW.games.get('satz-werkstatt')
    template: 'T2',
    icon: 'sparkle',
    themen: ['Reframing nach Regeln', 'Beweise', 'Rollen', 'Feedback'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Figur hat einen bremsenden Satz. A kennt die Figur, B die Regeln, C die Beweise, D die Bausteine. Nur zusammen baut ihr einen fairen neuen Satz.',
        levels: LEVELS,
        steps: [
          { icon: 'user', title: 'A + C', text: 'Figur und echte Beweise vorlesen' },
          { icon: 'check', title: 'B prüft laut', text: 'Realistisch · kurz · ohne immer/nie · Ich-Form' },
          { icon: 'sparkle', title: 'D baut', text: 'nach Ansage – beim Prüfen leuchten die Regeln' },
        ],
        probe: ctx.T.probeCard('Probe: „Ich bin immer zu spät.“ Welche Regel fehlt? Tipp irgendwas – zählt nicht.', [{ label: 'Ohne „immer/nie“', value: 1, variant: 'ghost', icon: 'x' }, { label: 'Ich-Form', value: 2, variant: 'ghost', icon: 'user' }]),
      });
      await ctx.T.codeCheck();
      const role = await ctx.T.roleSetup({
        roles: {
          A: { name: 'Figur', desc: 'Du siehst die Figur, ihren alten Satz und was passiert ist. Lies alles vor.' },
          B: { name: 'Regel-Prüfer:in', desc: 'Du hast die vier Regeln. Du prüfst jeden Vorschlag laut.' },
          C: { name: 'Beweise', desc: 'Du hast zwei Beweis-Karten. Nur diese Beweise sind echt.' },
          D: { name: 'Werkbank', desc: 'Du hast die Bausteine und baust den Satz nach Ansage. Dein iPad zeigt die Regel-Lampen.' },
        },
        observer: { name: 'Beobachter:in', desc: 'Kein Puzzle-Teil. Du achtest darauf, dass B laut prüft und C gefragt wird.' },
      });
      // Zwei Fälle per Tagescode – gleich auf allen iPads
      const faelle = ctx.rshuffle(FAELLE).slice(0, 2);
      const badgeRole = () => h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role);
      let gebaut = 0, versuche = 0;
      for (let i = 0; i < faelle.length; i++) {
        const f = faelle[i];
        const L = i + 1;
        const name = ctx.figures[f.fig].name;
        const ey = 'Fall ' + (i + 1) + '/2';
        if (i === 1) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt braucht der Satz einen echten Beweis. D hat auch erfundene Beweise – nur C weiß, welche stimmen.' });
        const w = ctx.scr([
          slice(ctx, role, f, L),
          h('p', { class: 'muted small' }, role === 'D' ? 'Hör erst zu: A liest vor, C nennt die Beweise. Dann zur Werkbank.' : 'Redet und sagt D an, welche Bausteine. D baut, B prüft laut.'),
        ], { eyebrow: ey + ' · ' + name, badge: badgeRole() });
        const go = await ctx.next(w, role === 'D' ? 'Zur Werkbank' : 'D baut – weiter');
        if (go === ctx.SKIP) continue;
        let ergebnis = null;
        if (role === 'D') {
          ergebnis = await werkbank(ctx, f, L, ey);
          if (!ergebnis) continue;
          versuche += ergebnis.tries;
          if (ergebnis.res.n === 4) gebaut++;
        } else {
          // Die anderen behalten ihren Teil im Blick, bis D 4 von 4 hat
          const w1 = ctx.scr([
            h('div', { class: 'card row sw-wait' }, CREW.icon('sparkle', 26), h('span', null, h('b', null, 'D baut an der Werkbank. '), 'Sagt Bausteine an, B prüft laut. Wenn Ds Lampen 4 von 4 zeigen: weiter.')),
            slice(ctx, role, f, L),
          ], { eyebrow: ey + ' · Werkbank bei D', badge: badgeRole() });
          const r = await ctx.ask(w1, [{ label: 'Noch nicht – Auflösung zeigen', value: 'show', variant: 'ghost', auto: false }, { label: 'D hat 4 von 4', value: 'ok', iconRight: 'check', id: 'sw-d-fertig' }]);
          if (r === ctx.SKIP) continue;
          if (r === 'ok') gebaut++;
        }
        // Auflösung auf allen iPads: ein Satz mit 4 von 4
        const m = ergebnis && ergebnis.res.n === 4 ? ergebnis.sel : muster(f);
        const w2 = ctx.scr([
          lampen(pruefe(m, true)),
          ctx.figureCard({ fig: f.fig, mood: 'froh', text: '„' + satzAus(m) + '“', eyebrow: ergebnis && ergebnis.res.n === 4 ? name + ' denkt jetzt · euer Satz' : name + ' könnte denken · 4 von 4' }),
          h('p', { class: 'muted' }, 'Statt „' + f.alt + '“: kurz, wahr, ohne immer und nie – und ' + name + ' sagt es selbst.'),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Satz für schwere Tage“')),
        ], { eyebrow: ey + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(w2, i + 1 < faelle.length ? 'Nächster Fall' : 'Weiter');
      }
      // Level 3: Stresstest – die alte Stimme kommt zurück. Welcher Satz hält?
      const fl = faelle[faelle.length - 1];
      const nl = ctx.figures[fl.fig].name;
      const fair = satzAus(muster(fl));
      const schoen = fl.kern.find((k) => k.schoen) || fl.kern[2];
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Stresstest: Die alte Stimme kommt zurück. Hält der neue Satz – oder bricht er?' });
      const kandidaten = ctx.rshuffle([{ k: 'fair', t: fair }, { k: 'schoen', t: schoen.t }]);
      const w3 = ctx.scr([
        ctx.figureCard({ fig: fl.fig, mood: 'traurig', text: fl.stress.event, eyebrow: 'Stresstest' }),
        h('div', { class: 'sw-stimme' }, CREW.icon('bolt', 26), h('span', null, h('b', null, 'Die alte Stimme: '), '„' + fl.stress.stimme + '“')),
        ctx.say('Welcher Satz hält das aus? Jede:r tippt auf dem eigenen iPad, dann redet ihr.', { eyebrow: 'Hält der Satz?', small: true }),
      ], { eyebrow: 'Stresstest · ' + nl, badge: ctx.stufe(3, LEVELS) });
      const s = await ctx.ask(w3, kandidaten.map((c) => ({ label: '„' + c.t + '“', value: c.k, variant: 'ghost', id: 'sw-stress-' + c.k })));
      let haelt = 0;
      if (s !== ctx.SKIP) {
        if (s === 'fair') haelt = 1;
        CREW.sound.play(s === 'fair' ? 'great' : 'soft');
        const w4 = ctx.scr([
          h('div', { class: 'grid two' },
            h('div', { class: 'sw-shield ok' }, CREW.icon('shield', 34), h('b', null, 'Hält'), h('p', null, '„' + fair + '“'), h('span', { class: 'muted small' }, 'Er hat nie versprochen, dass nichts mehr schiefgeht.')),
            h('div', { class: 'sw-shield broken' }, CREW.icon('x', 34), h('b', null, 'Bricht'), h('p', null, '„' + schoen.t + '“'), h('span', { class: 'muted small' }, 'Beim ersten Rückschlag glaubt ' + nl + ' ihn nicht mehr.'))),
          ctx.say(s === 'fair' ? 'Genau. Ein fairer Satz übersteht Rückschläge, weil er ehrlich ist. A, sag ihn einmal laut – ruhig, wie ' + nl + '.' : 'Der schöne Satz klingt stärker, bricht aber zuerst. Der faire hält, weil er ehrlich ist. A, sag ihn einmal laut.', { eyebrow: 'Stresstest bestanden', small: true }),
          ctx.safetyLine('freiwillig'),
        ], { eyebrow: 'Stresstest · Auflösung', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w4, 'Weiter');
      }
      return {
        summary: gebaut === faelle.length ? 'Werkstatt geschafft: zwei faire Sätze, 4 von 4 Regeln. Zusammen ging es.' : 'Gebaut, geprüft, umgebaut. Fair schlägt schön – auch im Stresstest.',
        stats: [[gebaut, 'Sätze mit 4 von 4'], [versuche, 'Versuche an der Werkbank'], [haelt, 'Stresstest erkannt']],
      };
    },
  });
})();
