/* Spiel „Wer fehlt?“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T1 Solo + Austausch · j1-e26, j1-e02
   Drei Szenen als Bild, in denen eine Figur leise ausgegrenzt wird (Gruppenchat ohne Sam, Tisch mit Tasche auf dem
   freien Platz, Insider-Witz). Erst die Zeichen antippen (wer schaut weg, wer wird nicht erwähnt) – es gibt auch
   Ablenker, die nur auffällig aussehen. Dann einen Mini-Zug wählen, der die Figur reinholt, ohne ein großes Ding
   daraus zu machen. Vergleichskarte zu zweit: „Wäre dein Zug bei uns machbar?“ Die Bonusfrage „Kennst du so einen
   Moment?“ hat einen großen Pass-Knopf. Alles über Figuren, keine Namen aus der Klasse, nichts wird gespeichert.
   In drei Level: 1) Zeichen sehen (Chat, Anzahl wird angezeigt), 2) Reinholen (Mensa mit Ablenkern),
   3) Ohne Drama (Insider-Witz, ohne Hinweis, wie viele Zeichen es gibt). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const ZUG = {
    mini: { label: 'Mini-Zug', icon: 'check', fb: 'Leise reingeholt – ohne großes Ding.' },
    gross: { label: 'Großes Ding', icon: 'bolt', fb: 'Gut gemeint. Aber jetzt steht die Person vor allen im Rampenlicht.' },
    nichts: { label: 'Nichts', icon: 'eyeOff', fb: 'Die Person merkt es trotzdem – nur später und allein.' },
    hart: { label: 'Ehrlich, aber hart', icon: 'x', fb: 'Das grenzt noch mehr aus – auch wenn es ehrlich gemeint ist.' },
  };

  /* Szenen: fig = die Figur, die leise ausgegrenzt wird. spots = antippbare Stellen im Bild (sign = echtes Zeichen).
     typ 'chat': Handy mit Nachrichten; typ 'bild': Figuren und Dinge mit Position (x/y in % der Bildfläche). */
  const SZENEN = [
    {
      id: 'chat', titel: 'Der Ausflug', typ: 'chat', fig: 'sam',
      intro: 'Mika, Yara, Luca und Sam sitzen in der Pause immer zusammen. Am Samstag ist ein Ausflug. Das ist der Chat dazu.',
      spots: [
        { id: 'mitglieder', sign: true, kind: 'kopf', text: 'Samstag 🌲 · 3 Mitglieder: Mika, Yara, Luca', why: 'Drei Mitglieder – die vier sitzen aber immer zusammen. Sam fehlt.' },
        { id: 'chips', sign: false, who: 'mika', text: 'ich bring chips 🥔', why: 'Eine normale Absprache.' },
        { id: 'zeit', sign: false, who: 'luca', text: '10 uhr am bahnhof?', why: 'Eine normale Absprache.' },
        { id: 'pssst', sign: true, who: 'yara', text: 'aber sam nix sagen 🤫', why: '🤫 – Sam soll es gar nicht erfahren.' },
        { id: 'gif', sign: false, who: 'luca', text: '(GIF: tanzender Pinguin)', why: 'Nur ein GIF.' },
        { id: 'frage', sign: true, kind: 'extra', text: 'Klassenchat, 16:02 · Sam: „macht ihr was am samstag?“ · gesehen von 3 · keine Antwort', why: 'Sams Frage wird gelesen – und keiner antwortet.' },
      ],
      zuege: [
        { k: 'mini', t: 'Sam in die Gruppe holen und schreiben: „Bringst du deine Musikbox mit?“', react: 'Oh, cool – klar, ich bring die Box mit!' },
        { k: 'gross', t: 'In den Klassenchat: „Warum ladet ihr Sam nicht ein?? Voll gemein!“', react: 'Jetzt weiß die ganze Klasse, dass ich nicht eingeladen war.' },
        { k: 'nichts', t: 'Nichts machen. Sam kriegt das eh nicht mit.', react: 'Am Montag zeigen alle Fotos vom Ausflug. Ich war nicht dabei.' },
        { k: 'hart', t: 'Sam privat: „Die anderen wollen dich halt nicht dabeihaben.“', react: 'Danke für die Ehrlichkeit … glaube ich.' },
      ],
    },
    {
      id: 'mensa', titel: 'Der freie Platz', typ: 'bild', fig: 'yara',
      intro: 'Mittagspause in der Mensa. Mika, Luca und Sam sitzen an einem Vierertisch. Yara kommt mit dem Tablett.',
      spots: [
        { id: 'mika', sign: false, x: 22, y: 2, fig: 'mika', mood: 'froh', text: 'Mika erzählt vom Training', why: 'Ein normales Gespräch.' },
        { id: 'weg', sign: true, x: 50, y: 2, fig: 'luca', mood: 'neutral', text: 'Luca schaut aufs Handy, als Yara kommt', why: 'Wegschauen heißt: Ich hab dich nicht gesehen.' },
        { id: 'pommes', sign: false, x: 22, y: 64, fig: 'sam', mood: 'froh', text: 'Sam isst Pommes', why: 'Nur Essen.' },
        { id: 'tasche', sign: true, x: 50, y: 64, emo: '🎒', text: 'Tasche auf dem freien Stuhl', why: 'Der Platz ist frei – die Tasche sagt: besetzt.' },
        { id: 'yara', sign: true, x: 78, y: 32, fig: 'yara', mood: 'traurig', text: 'Yara steht mit dem Tablett da', why: 'Yara wartet, ob jemand was sagt.' },
        { id: 'fenster', sign: false, x: 1, y: 32, emo: '🪟', text: 'Das Fenster ist offen', why: 'Nichts Besonderes.' },
      ],
      tisch: true,
      zuege: [
        { k: 'mini', t: 'Tasche runter, ein Stück rutschen: „Hier ist noch Platz.“', react: 'Danke. Ich dachte schon, ich ess wieder allein.' },
        { k: 'gross', t: 'Laut zum Tisch: „Leute, ihr grenzt Yara voll aus!“', react: 'Alle schauen her. Am liebsten wär ich jetzt weg.' },
        { k: 'nichts', t: 'Weiteressen. Yara findet schon einen Platz.', react: 'Yara isst allein am Fenster.' },
        { k: 'hart', t: 'Zu Yara: „Setz dich lieber woanders hin, die wollen unter sich sein.“', react: 'Okay … dann weiß ich ja Bescheid.' },
      ],
    },
    {
      id: 'witz', titel: 'Der Insider-Witz', typ: 'bild', fig: 'luca',
      intro: 'Im Flur nach dem Wochenende. Mika, Yara und Sam waren zusammen im Zoo. Luca war nicht dabei.',
      spots: [
        { id: 'kopfhoerer', sign: false, x: 2, y: 4, fig: 'mika', mood: 'froh', text: 'Mika hat Kopfhörer um den Hals', why: 'Nur Kopfhörer.' },
        { id: 'pinguin', sign: false, x: 26, y: 4, fig: 'yara', mood: 'froh', text: 'Yara macht den Pinguin nach', why: 'Spaß unter Freunden – das allein ist kein Zeichen.' },
        { id: 'satz', sign: true, x: 50, y: 4, fig: 'sam', mood: 'froh', text: 'Sam: „Du hättest dabei sein müssen! 🐧“', why: 'Der Satz schließt Luca aus, statt den Witz zu erklären.' },
        { id: 'lachen', sign: true, x: 78, y: 34, fig: 'luca', mood: 'ueberrascht', text: 'Luca lacht unsicher mit', why: 'Luca lacht mit, versteht aber nichts – damit es nicht auffällt.' },
        { id: 'kreis', sign: true, x: 30, y: 64, emo: '◠', text: 'Der Kreis ist zu – keine Lücke für Luca', why: 'Drei Rücken, keine Lücke. Wer dazukommen will, steht außen.' },
        { id: 'laut', sign: false, x: 2, y: 64, emo: '📢', text: 'Es ist laut im Flur', why: 'Flure sind laut.' },
      ],
      zuege: [
        { k: 'mini', t: 'Einen Schritt zur Seite und zu Luca: „Das war im Zoo – ich erzähl’s dir kurz, war echt witzig.“', react: 'Ah, ein Pinguin! Okay, jetzt check ich’s.' },
        { k: 'gross', t: 'Laut: „Hört auf mit dem Witz, Luca versteht das eh nicht!“', react: 'Jetzt bin ich der, der es nicht versteht. Vor allen.' },
        { k: 'nichts', t: 'Weiterlachen. Luca kennt das ja.', react: 'Luca geht zur Toilette und kommt erst zum Klingeln wieder.' },
        { k: 'hart', t: 'Zu Luca: „Ist ein Insider, das kannst du nicht verstehen.“', react: 'Okay. Dann bin ich halt draußen.' },
      ],
    },
  ];

  const LEVELS = ['Zeichen sehen', 'Reinholen', 'Ohne Drama'];
  const LEVEL_TEXT = {
    2: 'Jetzt ein Bild mit Ablenkern: Nicht alles, was auffällt, ist ein Zeichen. Und welcher Zug holt Yara rein, ohne sie bloßzustellen?',
    3: 'Ganz leise Zeichen – diesmal sagen wir nicht, wie viele es sind. Welcher Zug holt Luca rein, ohne Drama?',
  };

  /* Bild mit antippbaren Stellen. Rückgabe { el, found() }. */
  function szeneBild(ctx, sz, onTap) {
    const spotEl = (s) => {
      const b = h('button', { type: 'button', class: 'wf-spot' + (s.kind === 'kopf' ? ' kopf' : s.kind === 'extra' ? ' extra' : s.who ? ' msg' : ''), 'data-spot': s.id, style: s.x != null ? { left: s.x + '%', top: s.y + '%' } : null, 'aria-label': s.text },
        s.fig ? ctx.avatar(s.fig, s.mood, 52) : s.emo ? h('span', { class: 'wf-emo', 'aria-hidden': 'true' }, s.emo) : null,
        s.who ? h('span', { class: 'bubble-who' }, ctx.figures[s.who].name) : null,
        h('span', { class: 'wf-cap' }, s.text),
        h('span', { class: 'wf-mark', 'aria-hidden': 'true' }));
      b.addEventListener('click', () => onTap(s, b));
      return b;
    };
    if (sz.typ === 'chat') {
      const kopf = sz.spots.filter((s) => s.kind === 'kopf'), msgs = sz.spots.filter((s) => s.who), extra = sz.spots.filter((s) => s.kind === 'extra');
      return h('div', { class: 'wf-chat' },
        h('div', { class: 'wf-phone' }, kopf.map(spotEl), h('div', { class: 'wf-msgs' }, msgs.map(spotEl))),
        h('div', { class: 'wf-extra' }, extra.map(spotEl)));
    }
    return h('div', { class: 'wf-bild', 'data-szene': sz.id }, sz.tisch ? h('span', { class: 'wf-tisch', 'aria-hidden': 'true' }) : h('span', { class: 'wf-flur', 'aria-hidden': 'true' }), sz.spots.map(spotEl));
  }

  CREW.registerGame({
    id: 'wer-fehlt',
    template: 'T1',
    icon: 'users',
    themen: ['Ausgrenzung', 'Einbeziehen', 'Empathie', 'Mini-Zug'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    szenen: SZENEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Drei Bilder, in jedem wird jemand leise ausgegrenzt. Tipp die Zeichen an, dann wähl einen Mini-Zug, der die Figur reinholt – ohne Drama.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Zeichen sehen', text: 'Wer schaut weg? Wer wird nicht erwähnt?' },
          { icon: 'users', title: 'Mini-Zug', text: 'Reinholen, ohne ein großes Ding draus zu machen.' },
          { icon: 'chat', title: 'Vergleichen', text: 'Zu zweit: Wäre dein Zug bei uns machbar?' },
        ],
        probe: ctx.T.probeCard('Probe: In der Gruppe „Kino 🍿“ sind 4 von 5 Freunden. Ist das ein Zeichen? Tipp eins – zählt nicht.', [{ label: 'Zeichen', value: 'z', variant: 'ghost', icon: 'eye' }, { label: 'Kein Zeichen', value: 'k', variant: 'ghost', icon: 'x' }]),
      });
      await ctx.T.codeCheck();

      const ergebnis = [];
      let gefundenGesamt = 0, minis = 0;
      for (let i = 0; i < SZENEN.length; i++) {
        const sz = SZENEN[i];
        const L = i + 1;
        const F = ctx.figures[sz.fig];
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: LEVEL_TEXT[L] });
        const zeichen = sz.spots.filter((s) => s.sign);
        const gefunden = new Set();
        const zaehler = h('span', { class: 'pill accent wf-zaehler' }, L < 3 ? '0 von ' + zeichen.length + ' Zeichen' : 'Wie viele? Sagen wir nicht.');
        const info = h('div', { class: 'wf-info', role: 'status', 'aria-live': 'polite' }, h('span', { class: 'muted small' }, 'Tipp auf eine Stelle im Bild.'));
        const onTap = (s, b) => {
          if (b.dataset.done) return;
          b.dataset.done = s.sign ? 'zeichen' : 'nein';
          CREW.sound.play(s.sign ? 'good' : 'tap');
          if (s.sign) gefunden.add(s.id);
          info.replaceChildren(h('span', { class: 'wf-info-tag' + (s.sign ? ' ja' : '') }, CREW.icon(s.sign ? 'eye' : 'x', 16), s.sign ? 'Zeichen' : 'Kein Zeichen'), h('span', null, s.why));
          if (L < 3) zaehler.textContent = gefunden.size + ' von ' + zeichen.length + ' Zeichen';
          if (L < 3 && gefunden.size === zeichen.length) { zaehler.classList.add('good'); CREW.sound.play('great'); }
        };
        const bildEl = szeneBild(ctx, sz, onTap);
        const wS = ctx.scr([
          h('div', { class: 'wf-kopf' }, ctx.avatar(sz.fig, 'traurig', 44), h('div', { class: 'stack', style: { gap: '4px', flex: '1', minWidth: 0 } }, h('span', null, sz.intro), h('b', null, 'Wo siehst du, dass ' + F.name + ' draußen ist?')), ctx.readBtn(sz.intro + ' Wo siehst du, dass ' + F.name + ' draußen ist?')),
          h('div', { class: 'row end' }, zaehler),
          bildEl,
          info,
        ], { eyebrow: 'Bild ' + L + ' von ' + SZENEN.length + ' · ' + sz.titel, badge: ctx.stufe(L, LEVELS) });
        if (ctx.auto) { const spots = [...bildEl.querySelectorAll('.wf-spot')]; ctx.rshuffle(spots).slice(0, 4).forEach((b) => b.click()); }
        const go = await ctx.next(wS, 'Fertig gesucht', { id: 'wf-fertig' });
        if (go === ctx.SKIP) { ergebnis.push({ sz, zug: null, n: gefunden.size }); continue; }
        gefundenGesamt += gefunden.size;

        // Auflösung der Zeichen + Mini-Zug wählen
        const optionen = ctx.rshuffle(sz.zuege);
        const wZ = ctx.scr([
          h('div', { class: 'card stack wf-aufl' },
            h('div', { class: 'row between', style: { gap: '8px' } }, h('span', { class: 'eyebrow' }, 'Die Zeichen · ' + gefunden.size + ' von ' + zeichen.length + ' gefunden'), ctx.readBtn(zeichen.map((s) => s.why).join(' '))),
            zeichen.map((s) => h('div', { class: 'wf-z' + (gefunden.has(s.id) ? ' ja' : '') }, CREW.icon(gefunden.has(s.id) ? 'check' : 'eye', 18), h('span', null, h('b', null, s.text + ': '), s.why)))),
          ctx.say('Was machst du, damit ' + F.name + ' dazugehört – ohne ein großes Ding draus zu machen?', { eyebrow: L === 3 ? 'Ohne Drama' : 'Dein Zug', small: true }),
        ], { eyebrow: sz.titel + ' · Zug', badge: ctx.stufe(L, LEVELS) });
        const zk = await ctx.ask(wZ, optionen.map((z, j) => ({ label: z.t, value: j, variant: 'ghost', id: 'wf-zug-' + z.k })));
        if (zk === ctx.SKIP) { ergebnis.push({ sz, zug: null, n: gefunden.size }); continue; }
        const z = optionen[zk];
        if (z.k === 'mini') { minis++; CREW.sound.play('great'); } else CREW.sound.play('soft');
        ergebnis.push({ sz, zug: z, n: gefunden.size });
        const wR = ctx.scr([
          h('div', { class: 'wf-zugtag', 'data-k': z.k }, CREW.icon(ZUG[z.k].icon, 22), h('b', null, ZUG[z.k].label), h('span', null, ZUG[z.k].fb)),
          ctx.figureCard({ fig: sz.fig, mood: z.k === 'mini' ? 'froh' : z.k === 'gross' ? 'angst' : 'traurig', text: z.react, eyebrow: F.name + ' erlebt das so' }),
          z.k === 'mini' ? null : h('div', { class: 'card stack soft' }, h('span', { class: 'eyebrow' }, 'Mini-Zug wäre'), h('p', { style: { margin: 0 } }, sz.zuege.find((x) => x.k === 'mini').t)),
        ], { eyebrow: sz.titel + ' · ' + F.name, badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wR, i + 1 < SZENEN.length ? 'Nächstes Bild' : 'Zum Austausch');
      }

      // Austausch zu zweit: die EINE Vergleichskarte
      await ctx.T.pairScreen();
      await ctx.T.vergleich({
        title: 'Wer fehlt?',
        items: ergebnis.map((e) => ({ label: e.sz.titel, icon: e.zug ? ZUG[e.zug.k].icon : 'x', text: e.n + ' Zeichen · ' + (e.zug ? ZUG[e.zug.k].label : 'gepasst') })),
        questions: ['Wäre dein Zug bei uns machbar?', 'Welches Zeichen hättest du in echt übersehen?'],
        note: 'Es geht um Sam, Yara und Luca – nicht um euch. Keine Namen aus der Klasse. Pass ist okay.',
      });
      // Bonusfrage mit großem Pass-Knopf
      const wB = ctx.scr([
        ctx.say('Bonusfrage, nur wenn du magst: Kennst du so einen Moment – von außen oder von innen? Erzähl es deinem Partner nur, wenn du willst. Ohne Namen aus der Klasse.', { eyebrow: 'Bonus · freiwillig', small: true }),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Bonus', center: true });
      wB.classList.add('wf-bonus');
      await ctx.ask(wB, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'wf-bonus-pass' }, { label: 'Erzählt', value: 'ok', variant: 'ghost', icon: 'chat', id: 'wf-bonus-ok', auto: false }]);
      return {
        summary: minis === SZENEN.length ? 'Drei Mini-Züge. Reinholen geht leise – und wirkt.' : 'Ausgrenzung ist oft leise. Ein kleiner Zug holt mehr rein als ein großes Ding.',
        stats: [[gefundenGesamt, 'Zeichen gefunden'], [minis, 'Mini-Züge']],
        help: true,
      };
    },
  });
})();
