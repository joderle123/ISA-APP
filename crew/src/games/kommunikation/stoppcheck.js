/* Spiel „Stopp-Check“ (Thema: Kommunikation & Grenzen) · Vorlage T3 Zu zweit an einem iPad · j1-e23 · Top
   Eine Figur sagt Stopp – aber etwas stimmt nicht: Sie lächelt, schaut weg, ist zu leise, redet zu viel. Das Paar sucht
   den Fehler wie im Wimmelbild (abwechselnd tippen) und baut das Stopp aus fünf Bausteinen neu: Haltung, Blick, Hand,
   Stimme, kurze Worte. Zwei Finger bestätigen; das Gegenüber weicht sofort zurück – oder merkt es nicht gleich. Klar
   gesagt wird immer: Jedes Stopp gilt, auch ein wackeliges. In drei Level:
   1) Fehler finden – ein Fehler, dann neu bauen.
   2) Zwei Fehler – subtiler (zu viel reden, halb weggedreht, Hände in den Taschen).
   3) Nachhaken – das Gegenüber bohrt nach: zweites Stopp wählen; hört es nicht auf: drittes Stopp = weggehen und
      Hilfe holen (die drei Stopps der Stunde j1-e23).
   Ausprobieren nur Richtung Wand, nie zur anderen Person. Kein Körperkontakt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Fünf Bausteine. ok = klares Stopp, falsch = Fehler fürs Wimmelbild (catalog: lächelt, schaut weg, zu leise, redet zu
     viel), extra = weitere falsche Bausteine nur zum Neubauen. „{an}“ wird durch das Gegenüber ersetzt. */
  const TEILE = [
    { id: 'haltung', label: 'Haltung', icon: 'user', ok: 'steht gerade, Füße fest', falsch: ['Schultern hängen', 'dreht sich halb weg'], extra: [] },
    { id: 'blick', label: 'Blick', icon: 'eye', ok: 'schaut {an} ernst an', falsch: ['lächelt dabei', 'schaut auf den Boden'], extra: [] },
    { id: 'hand', label: 'Hand', icon: 'shield', ok: 'Hand flach nach vorn', falsch: ['Hände in den Taschen', 'spielt mit den Haaren'], extra: ['droht mit der Faust'] },
    { id: 'stimme', label: 'Stimme', icon: 'speaker', ok: 'laut und ruhig', falsch: ['ganz leise', 'kichert dabei'], extra: [] },
    { id: 'worte', label: 'Worte', icon: 'chat', ok: '„Stopp. Das will ich nicht.“', falsch: ['„Ähm, also, sorry, vielleicht könntest du eventuell …“', '„Hihi, lass das mal … oder so.“'], extra: ['„Stopp, du Idiot!“'] },
  ];
  const BY = Object.fromEntries(TEILE.map((t) => [t.id, t]));
  /* Fehler-Sets pro Level: Level 1 die vier Fehler aus dem Katalog (einer), Level 2 je zwei, eher subtil */
  const FEHLER_L1 = [{ blick: 0 }, { blick: 1 }, { stimme: 0 }, { worte: 0 }];
  const FEHLER_L2 = [{ haltung: 1, worte: 0 }, { hand: 0, blick: 0 }, { haltung: 0, stimme: 0 }, { hand: 1, worte: 1 }, { blick: 1, stimme: 1 }];

  /* Szenen: Wer setzt die Grenze (fig) bei wem (an)? weiter / zurueck = Reaktion des Gegenübers. nachhaken = zwei Sätze. */
  const SZENEN = [
    { id: 'handy', fig: 'yara', an: 'sam', text: 'Sam nimmt Yaras Handy und scrollt durch ihre Fotos.', zurueck: 'Sam gibt das Handy sofort zurück: „Sorry.“', zoegert: 'Sam stutzt: „Echt jetzt?“ – und gibt es dann zurück.', weiter: 'Sam merkt es nicht richtig und scrollt weiter.', nachhaken: ['Chill, ich schau doch nur!', 'Was hast du denn zu verstecken?'] },
    { id: 'piksen', fig: 'mika', an: 'luca', text: 'Luca piekst Mika in der Pause immer wieder in die Seite. „Nur Spaß!“', zurueck: 'Luca hört sofort auf und geht einen Schritt zurück.', zoegert: 'Luca stutzt: „Oh. Okay.“ – und hört dann auf.', weiter: 'Luca merkt es nicht richtig und piekst nochmal.', nachhaken: ['Ey, war doch nur Spaß!', 'Sei nicht so empfindlich.'] },
    { id: 'video', fig: 'sam', an: 'mika', text: 'Mika filmt Sam beim Tanzen und will das Video in die Gruppe schicken.', zurueck: 'Mika löscht das Video vor Sams Augen.', zoegert: 'Mika zögert: „Wirklich nicht?“ – und löscht es dann.', weiter: 'Mika merkt es nicht richtig und tippt schon auf Senden.', nachhaken: ['Aber das ist voll lustig!', 'Nur an drei Leute, versprochen.'] },
    { id: 'bus', fig: 'luca', an: 'yara', text: 'Im fast leeren Bus rückt Yara immer näher an Luca heran.', zurueck: 'Yara rutscht sofort einen Platz weiter.', zoegert: 'Yara stutzt: „Oh, sorry.“ – und rückt dann weg.', weiter: 'Yara merkt es nicht richtig und bleibt kleben.', nachhaken: ['Wieso, ist doch gemütlich!', 'Hast du ein Problem mit mir?'] },
    { id: 'spitzname', fig: 'sam', an: 'luca', text: 'Luca nennt Sam vor allen „Zwerg“ – schon zum dritten Mal heute.', zurueck: 'Luca: „Okay. Sorry, Sam.“', zoegert: 'Luca stutzt: „Ernsthaft?“ – „Okay, sorry.“', weiter: 'Luca merkt es nicht richtig: „Okay, Zwerg.“', nachhaken: ['Ist doch nur ein Spitzname!', 'Alle nennen dich so.'] },
  ];
  /* Level 3: zweites und drittes Stopp */
  const STOPP2 = [
    { k: 'wiederholen', t: '„Stopp. Ich hab Nein gesagt.“', ok: true, warum: 'Kurz wiederholen – nicht diskutieren. Das zweite Stopp ist kürzer, nicht länger.' },
    { k: 'erklaeren', t: '„Weil … also … ich find das halt nicht so gut, weil …“', ok: false, warum: 'Rechtfertigen öffnet die Diskussion. Ein Nein braucht keinen Grund.' },
    { k: 'nachgeben', t: '„Na gut, aber nur kurz.“', ok: false, warum: 'Nachgeben zeigt: Nachbohren lohnt sich. Das nächste Mal wird es schwerer.' },
    { k: 'angriff', t: '„Halt die Klappe, du Freak!“', ok: false, warum: 'Der Angriff macht aus der Grenze einen Streit. Das Thema geht unter.' },
  ];
  const STOPP3 = [
    { k: 'gehen', t: 'Weggehen und einer erwachsenen Person Bescheid sagen.', ok: true, warum: 'Das dritte Stopp: gehen und Hilfe holen. Das ist kein Verlieren – das ist stark.' },
    { k: 'bleiben', t: 'Bleiben und weiter diskutieren.', ok: false, warum: 'Wer nach zwei Stopps weitermacht, hört gerade nicht zu. Reden bringt hier nichts mehr.' },
    { k: 'rache', t: 'Zurück ärgern, damit es fair ist.', ok: false, warum: 'Rache macht aus einer Grenzverletzung zwei. Und am Ende hast du Ärger.' },
  ];
  const LEVELS = ['Fehler finden', 'Zwei Fehler', 'Nachhaken'];
  const ersetze = (t, an) => t.replace('{an}', an);
  const zitat = (t) => (/^„/.test(t) ? t : '„' + t + '“');

  // Kompakte Aufgaben-Zeile (statt großer Karte), damit die Antworten sichtbar bleiben
  const hint = (ctx, text, icon) => h('div', { class: 'kg-hint' }, CREW.icon(icon || 'chat', 24), h('span', { class: 'kg-hint-t' }, text), ctx.readBtn(text));
  /* Zustand des Stopp-Bilds: { teil: index } heißt „dieser Baustein ist falsch (Variante index)“ */
  function zustand(fehler) {
    const st = {};
    TEILE.forEach((t) => { st[t.id] = fehler[t.id] != null ? { ok: false, t: t.falsch[fehler[t.id]] } : { ok: true, t: t.ok }; });
    return st;
  }
  const gesicht = (st) => (st.blick.t === 'lächelt dabei' ? 'froh' : st.blick.t === 'schaut auf den Boden' ? 'traurig' : st.stimme.t === 'kichert dabei' ? 'froh' : 'genervt');

  /* Das Wimmelbild: Figur in der Mitte, Sprechblase (Worte + Stimme), fünf Bausteine zum Antippen */
  function stoppBild(ctx, sz, st, o) {
    const oo = o || {};
    const an = ctx.figures[sz.an].name;
    const leise = st.stimme.t === 'ganz leise', kichern = st.stimme.t === 'kichert dabei';
    const worte = st.worte.t.replace(/^„|“$/g, '');
    const blase = h('div', { class: 'stc-blase' + (leise ? ' leise' : '') + (kichern ? ' kichern' : '') }, worte);
    const hot = TEILE.map((t) => {
      const b = h('button', { type: 'button', class: 'stc-hot', 'data-teil': t.id, 'aria-label': t.label + ': ' + ersetze(st[t.id].t, an) },
        h('span', { class: 'stc-hot-ic' }, CREW.icon(t.icon, 22)),
        h('span', { class: 'stc-hot-t' }, h('b', null, t.label), h('span', null, ersetze(st[t.id].t, an))),
        h('span', { class: 'stc-hot-mark', 'aria-hidden': 'true' }));
      if (oo.onTap) b.addEventListener('click', () => oo.onTap(t.id, b));
      else b.disabled = true;
      return b;
    });
    return h('div', { class: 'stc-bild' + (st.haltung.t === 'dreht sich halb weg' ? ' weg' : '') + (st.haltung.t === 'Schultern hängen' ? ' haengt' : '') },
      h('div', { class: 'stc-mitte' }, blase, h('div', { class: 'stc-fig' }, ctx.avatar(sz.fig, gesicht(st), 120)), h('b', { class: 'fig-name' }, ctx.figures[sz.fig].name + ' zu ' + an)),
      h('div', { class: 'stc-hots' }, hot));
  }

  /* Wimmelbild: Fehler suchen, abwechselnd tippen. Liefert { gefunden, fehlTipps } oder SKIP */
  function fehlerSuchen(ctx, sz, fehler, L, nr) {
    const st = zustand(fehler);
    const ziel = Object.keys(fehler);
    return ctx.waitFor(new Promise((resolve) => {
      const gefunden = new Set();
      let fehlTipps = 0, zug = 0, done = false;
      const zaehler = h('span', { class: 'pill accent' }, 'Fehler: 0 von ' + ziel.length);
      const dran = h('span', { class: 'pill stc-dran', 'data-dran': 'links' }, 'Links ist dran');
      const onTap = (id, b) => {
        if (done || b.classList.contains('found') || b.classList.contains('passt')) return;
        zug++;
        dran.dataset.dran = zug % 2 ? 'rechts' : 'links';
        dran.textContent = (zug % 2 ? 'Rechts' : 'Links') + ' ist dran';
        if (ziel.includes(id)) {
          gefunden.add(id); b.classList.add('found'); CREW.sound.play('good');
          zaehler.textContent = 'Fehler: ' + gefunden.size + ' von ' + ziel.length;
          if (gefunden.size === ziel.length) { done = true; CREW.sound.play('great'); setTimeout(() => resolve({ gefunden: gefunden.size, fehlTipps }), ctx.auto ? 30 : 700); }
        } else { fehlTipps++; b.classList.add('passt'); CREW.sound.play('soft'); }
      };
      const bild = stoppBild(ctx, sz, st, { onTap });
      const w = ctx.scr([
        h('div', { class: 'stc-lage' }, ctx.avatar(sz.an, 'neutral', 44), h('span', null, sz.text), ctx.readBtn(sz.text)),
        bild,
        h('div', { class: 'row between' }, h('p', { class: 'muted', style: { margin: 0 } }, L === 1 ? 'Ein Baustein passt nicht zum Stopp. Abwechselnd antippen.' : 'Zwei Bausteine passen nicht. Abwechselnd antippen – „passt“ ist kein Fehler.'), h('div', { class: 'row', style: { gap: '8px' } }, dran, zaehler)),
      ], { eyebrow: 'Stopp ' + nr + ' · Fehler suchen', badge: ctx.stufe(L, LEVELS) });
      if (ctx.auto) {
        const order = TEILE.map((t) => t.id).sort(() => ctx.autoRng() - 0.5);
        let k = 0;
        const tick = () => { if (done || !w.isConnected) return; const b = w.querySelector('.stc-hot[data-teil="' + order[k++] + '"]'); if (b) b.click(); if (k < order.length) setTimeout(tick, 40); };
        setTimeout(tick, Math.max(40, window.__crewAutoDelay || 0));
      }
    }));
  }

  /* Neu bauen: pro Baustein drei Möglichkeiten (eine klar), zwei Finger. Liefert { wahl:{id:ok?}, richtig } oder SKIP */
  async function neuBauen(ctx, sz, L, nr, versuch) {
    const an = ctx.figures[sz.an].name;
    const wahl = {}, wahlT = {};
    const rows = TEILE.map((t) => {
      const opts = ctx.rshuffle([{ t: ersetze(t.ok, an), ok: true }].concat(ctx.rshuffle(t.falsch.concat(t.extra)).slice(0, 2).map((x) => ({ t: x, ok: false }))));
      const row = h('div', { class: 'stc-bau-row', 'data-teil': t.id },
        h('span', { class: 'stc-bau-l' }, CREW.icon(t.icon, 20), h('b', null, t.label)),
        h('div', { class: 'stc-bau-opts' }, opts.map((o) => {
          const b = h('button', { type: 'button', class: 'chip stc-bau-chip', 'data-ok': o.ok ? '1' : '0' }, o.t);
          b.addEventListener('click', () => { CREW.sound.play('tap'); wahl[t.id] = o.ok; wahlT[t.id] = o.t; row.querySelectorAll('.chip').forEach((c) => c.classList.toggle('sel', c === b)); });
          return b;
        })));
      return row;
    });
    const w = ctx.scr([
      hint(ctx, (versuch > 1 ? 'Nochmal: ' : '') + 'Baut das Stopp neu – pro Baustein eine Karte. Dann beide Finger drauf.', 'shield'),
      h('div', { class: 'stc-bau' }, rows),
    ], { eyebrow: 'Stopp ' + nr + ' · Bauen', badge: ctx.stufe(L, LEVELS) });
    if (ctx.auto) rows.forEach((row) => { const want = versuch > 1 || ctx.autoRng() < 0.7 ? '1' : '0'; const b = row.querySelector('.chip[data-ok="' + want + '"]'); if (b) b.click(); });
    for (;;) {
      const r = await ctx.T.twoFinger(w, { label: 'Beide einig: Finger drauf', hint: 'Erst alle fünf Bausteine wählen.' });
      if (r === ctx.SKIP) return ctx.SKIP;
      if (Object.keys(wahl).length === TEILE.length) break;
      CREW.ui.toast('Noch nicht alle fünf Bausteine gewählt.');
      w.querySelector('.two-finger') && w.querySelector('.two-finger').remove();
    }
    return { wahl, wahlT, richtig: TEILE.filter((t) => wahl[t.id]).length };
  }

  /* Wirkung des neuen Stopps: 5 = sofort zurück, 4 = zögert, sonst merkt es nicht gleich. Jedes Stopp gilt! */
  async function wirkung(ctx, sz, bau, L, nr, letzter) {
    const an = ctx.figures[sz.an];
    const falsch = TEILE.filter((t) => !bau.wahl[t.id]);
    const n = bau.richtig;
    const text = n === 5 ? sz.zurueck : n === 4 ? sz.zoegert : sz.weiter;
    CREW.sound.play(n === 5 ? 'great' : n === 4 ? 'good' : 'soft');
    const w = ctx.scr([
      h('div', { class: 'row center' }, h('span', { class: 'pill ' + (n === 5 ? 'good' : ''), style: { fontSize: '1.15em' } }, n + ' von 5 Bausteinen klar')),
      h('div', { class: 'grid two' },
        ctx.figureCard({ fig: sz.fig, mood: n >= 4 ? 'genervt' : 'neutral', text: bau.wahlT.worte || '„Stopp.“', eyebrow: ctx.figures[sz.fig].name + ' sagt Stopp', chat: true,
          extra: h('div', { class: 'row', style: { gap: '6px' } }, TEILE.filter((t) => t.id !== 'worte').map((t) => h('span', { class: 'pill stc-ist' + (bau.wahl[t.id] ? ' ok' : ''), 'data-teil': t.id }, CREW.icon(t.icon, 14), bau.wahlT[t.id]))) }),
        ctx.figureCard({ fig: sz.an, mood: n === 5 ? 'ueberrascht' : n === 4 ? 'neutral' : 'froh', text: text, eyebrow: an.name + ' reagiert' })),
      falsch.length ? h('div', { class: 'card stack soft' }, h('b', null, 'Gemischtes Signal: ' + falsch.map((t) => t.label).join(', ')), h('p', { class: 'muted small', style: { margin: 0 } }, 'Worte sagen Stopp, der Körper sagt etwas anderes. Darum kommt es schwerer an.')) : h('p', { class: 'muted small' }, 'Körper und Worte sagen dasselbe. Das kommt sofort an.'),
      h('div', { class: 'stc-gilt' }, CREW.icon('shield', 26), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, 'Wichtig: Jedes Stopp gilt – auch ein leises oder wackeliges.'), h('span', { class: 'small' }, 'Wer Stopp hört, hört auf. Wenn ' + an.name + ' weitermacht, ist das nicht die Schuld von ' + ctx.figures[sz.fig].name + '. Ein klares Stopp kommt nur schneller an.'))),
    ], { eyebrow: 'Stopp ' + nr + ' · Wirkung', badge: ctx.stufe(L, LEVELS) });
    if (n === 5) { await ctx.next(w, letzter ? 'Weiter' : 'Nächstes Stopp'); return 'ok'; }
    return ctx.ask(w, [{ label: 'Nochmal bauen', value: 'again', variant: 'ghost', icon: 'undo', id: 'stc-again' }, { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'again' });
  }

  /* Ein Stopp komplett: suchen → bauen → Wirkung (Nochmal bauen erlaubt) */
  async function runde(ctx, sz, fehler, L, nr, letzter) {
    const f = await fehlerSuchen(ctx, sz, fehler, L, nr);
    if (f === ctx.SKIP) return null;
    // Auflösung der Fehler
    const st = zustand(fehler);
    const an = ctx.figures[sz.an].name;
    const w = ctx.scr([
      stoppBild(ctx, sz, st, {}),
      h('div', { class: 'stack' }, Object.keys(fehler).map((id) => h('div', { class: 'card row stc-loes', style: { gap: '10px', alignItems: 'center' } }, CREW.icon(BY[id].icon, 22), h('span', null, h('b', null, BY[id].label + ': '), zitat(ersetze(st[id].t, an)) + ' passt nicht zum Stopp. Klar wäre: ' + ersetze(BY[id].ok, an) + '.')))),
    ], { eyebrow: 'Stopp ' + nr + ' · Gefunden', badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w, 'Neu bauen')) === ctx.SKIP) return { fehlTipps: f.fehlTipps, richtig: 0 };
    let bau = null;
    for (let v = 1; v <= 3; v++) {
      bau = await neuBauen(ctx, sz, L, nr, v);
      if (bau === ctx.SKIP) return { fehlTipps: f.fehlTipps, richtig: 0 };
      const r = await wirkung(ctx, sz, bau, L, nr, letzter);
      if (r !== 'again') break;
    }
    return { fehlTipps: f.fehlTipps, richtig: bau.richtig };
  }

  /* Level 3: Nachhaken – zweites Stopp, dann drittes (gehen und Hilfe holen) */
  async function nachhaken(ctx, sz) {
    const badge = ctx.stufe(3, LEVELS);
    const fig = ctx.figures[sz.fig], an = ctx.figures[sz.an];
    const out = { s2: null, s3: null };
    for (const [stufe, liste, satz] of [[2, STOPP2, sz.nachhaken[0]], [3, STOPP3, sz.nachhaken[1]]]) {
      const opts = ctx.rshuffle(liste);
      let pick = null;
      const w = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: sz.fig, mood: 'genervt', text: stufe === 2 ? '„Stopp. Das will ich nicht.“' : '„Stopp. Ich hab Nein gesagt.“', eyebrow: fig.name + (stufe === 2 ? ' hat Stopp gesagt' : ' hat es wiederholt'), chat: true }),
          ctx.figureCard({ fig: sz.an, mood: 'froh', text: '„' + satz + '“', eyebrow: an.name + ' bohrt nach', chat: true })),
        hint(ctx, stufe === 2 ? 'Stopp 2: Was sagt ' + fig.name + ' jetzt? Einigt euch.' : 'Stopp 3: ' + an.name + ' hört immer noch nicht auf. Was macht ' + fig.name + '?', 'shield'),
      ], { eyebrow: 'Nachhaken · Stopp ' + stufe, badge });
      const row = h('div', { class: 'stack' }, opts.map((o) => { const b = h('button', { type: 'button', class: 'chip stc-wahl', 'data-wahl': o.k }, o.t); b.addEventListener('click', () => { CREW.sound.play('tap'); pick = o; row.querySelectorAll('.chip').forEach((c) => c.classList.toggle('sel', c === b)); }); return b; }));
      w.appendChild(h('div', { class: 'card' }, row));
      if (ctx.auto) pick = opts[Math.floor(ctx.autoRng() * opts.length)];
      let r;
      for (;;) {
        r = await ctx.T.twoFinger(w, { label: 'Beide einig: Finger drauf', hint: 'Erst eine Antwort antippen.' });
        if (r === ctx.SKIP || pick) break;
        CREW.ui.toast('Erst eine Antwort antippen.');
        const z = w.querySelector('.two-finger'); if (z) z.remove();
      }
      if (r === ctx.SKIP) return out;
      out['s' + stufe] = pick.k;
      CREW.sound.play(pick.ok ? 'great' : 'soft');
      const w2 = ctx.scr([
        h('div', { class: 'row center' }, h('span', { class: 'pill ' + (pick.ok ? 'good' : '') }, pick.ok ? 'Starkes Stopp ' + stufe : 'Schwieriger Weg')),
        ctx.figureCard({ fig: sz.fig, mood: pick.ok ? 'genervt' : 'traurig', text: pick.t, eyebrow: fig.name, chat: true }),
        h('div', { class: 'card stack soft' }, h('b', null, pick.warum), pick.ok ? null : h('p', { class: 'muted small', style: { margin: 0 } }, 'Besser: ' + liste.find((x) => x.ok).t)),
      ], { eyebrow: 'Nachhaken · Stopp ' + stufe, badge });
      await ctx.next(w2, stufe === 2 ? 'Und dann?' : 'Weiter');
    }
    // Die drei Stopps aus der Stunde
    const w3 = ctx.scr([
      ctx.say('Die drei Stopps: 1. Stopp sagen – mit Körper und Worten. 2. Kurz wiederholen, nicht diskutieren. 3. Weggehen und Hilfe holen.', { eyebrow: 'Drei Stopps', small: true }),
      h('div', { class: 'stc-drei' }, ['Stopp sagen', 'Wiederholen', 'Gehen + Hilfe'].map((t, i) => h('div', { class: 'stc-drei-s' }, h('b', { class: 'display' }, String(i + 1)), h('span', null, t)))),
      h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Fester Stand“: Füße fest, Schultern locker, Blick geradeaus – dann Stopp')),
    ], { eyebrow: 'Nachhaken', badge });
    await ctx.next(w3, 'Weiter');
    return out;
  }

  CREW.registerGame({
    id: 'stoppcheck',
    template: 'T3',
    icon: 'shield',
    themen: ['Grenzen setzen', 'Stopp sagen', 'Körpersprache', 'Nachhaken'],
    safety: ['figuren', 'koerper', 'freiwillig'],
    help: true,
    teile: TEILE, szenen: SZENEN, fehlerL1: FEHLER_L1, fehlerL2: FEHLER_L2, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit, nebeneinander. Eine Figur sagt Stopp – aber etwas passt nicht. Findet den Fehler und baut ein Stopp, das sofort ankommt.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Fehler finden', text: 'Abwechselnd tippen: Was passt nicht?' },
          { icon: 'shield', title: 'Neu bauen', text: 'Haltung, Blick, Hand, Stimme, Worte. Zwei Finger.' },
          { icon: 'chat', title: 'Nachhaken', text: 'Das zweite Stopp – und wenn nötig das dritte.' },
        ],
        probe: ctx.T.probeCard('Probe: Eine Figur sagt „Stopp“ und grinst dabei breit. Kommt das an? Tippt irgendwas – zählt nicht.', [{ label: 'Kommt an', value: 1, variant: 'ghost' }, { label: 'Kommt schwer an', value: 2, variant: 'ghost' }]),
      });
      const szenen = ctx.rshuffle(SZENEN);
      const s1 = szenen[0], s2 = szenen[1];
      const f1 = ctx.rpick(FEHLER_L1), f2 = ctx.rpick(FEHLER_L2);
      const r1 = await runde(ctx, s1, f1, 1, 1, false);
      // Freiwillig ausprobieren – Richtung Wand, nicht zur anderen Person
      if (r1 && r1.richtig === 5) {
        const w = ctx.scr([
          ctx.say('Wer mag, zeigt das Stopp einmal: aufstehen, Füße fest, Hand flach – Richtung Wand, nicht zur anderen Person.', { eyebrow: 'Ausprobieren', small: true }),
          h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('freiwillig')),
        ], { eyebrow: 'Ausprobieren', badge: ctx.stufe(1, LEVELS), center: true });
        await ctx.ask(w, [{ label: 'Heute nicht', value: 'pass', variant: 'ghost', icon: 'x', auto: false }, { label: 'Gezeigt', value: 'ok', iconRight: 'right', id: 'stc-gezeigt' }]);
      }
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt stecken zwei Fehler im Bild – und sie sind leiser: zu viel reden, halb weggedreht, Hände in den Taschen.' });
      const r2 = await runde(ctx, s2, f2, 2, 2, true);
      await ctx.T.level({ n: 3, names: LEVELS, text: ctx.figures[s2.an].name + ' bohrt nach. Ein Stopp reicht nicht immer. Was ist das zweite Stopp – und was das dritte?' });
      const r3 = await nachhaken(ctx, s2);
      const klar = [r1, r2].filter((r) => r && r.richtig === 5).length;
      return {
        summary: klar === 2 && r3.s2 === 'wiederholen' ? 'Stopp-Check bestanden: Körper und Worte sagen dasselbe – auch beim zweiten Mal.' : 'Jedes Stopp gilt. Ein klares kommt schneller an – und das zweite ist kürzer, nicht länger.',
        stats: [[klar, 'klare Stopps gebaut'], [r3.s2 === 'wiederholen' ? 1 : 0, 'zweites Stopp gehalten'], [r3.s3 === 'gehen' ? 1 : 0, 'Hilfe geholt']],
        help: true,
      };
    },
  });
})();
