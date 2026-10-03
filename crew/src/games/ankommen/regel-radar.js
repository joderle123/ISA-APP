/* Spiel „Regel-Radar“ (Thema: Ankommen & Crew) · Vorlage T1 Solo + Austausch · j1-e01, j1-e02
   Vier Alltagsszenen als Bild (Gruppenchat, Bus, Pausenhof, Gruppenarbeit …). Pro Szene tippst du 1–2 Regel-Chips
   aus eurem Vertrag oder „Hier fehlt eine Regel“. Dann Vergleichskarte zu zweit – und wer eine Lücke findet,
   ändert den echten Vertrag. Das steht im Vordergrund, nicht das Antippen.
   Variante j1-e01: drei Szenen zum frisch unterschriebenen Vertrag, gefundene Lücke wandert aufs Plakat. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Regel-Chips: typische Sätze aus einem Crew-Vertrag. Die Lehrkraft kann im Spiel auf „Unser Vertrag“ tippen
     und Chips abwählen, die es bei euch nicht gibt. Nichts wird gespeichert. */
  const REGELN = [
    { id: 'ausreden', text: 'Ausreden lassen', icon: 'chat' },
    { id: 'bleibt', text: 'Was hier gesagt wird, bleibt hier', icon: 'lock' },
    { id: 'pass', text: 'Pass ist okay', icon: 'x' },
    { id: 'stopp', text: 'Stopp heißt Stopp', icon: 'pause' },
    { id: 'beleidigung', text: 'Keine Beleidigungen – auch nicht „aus Spaß“', icon: 'shield' },
    { id: 'handy', text: 'Handy nur, wenn’s zum Spiel gehört', icon: 'phone' },
    { id: 'hilfe', text: 'Hilfe holen ist stark', icon: 'heart' },
    { id: 'alle', text: 'Jede:r kommt einmal dran', icon: 'users' },
    { id: 'fehler', text: 'Fehler sind erlaubt', icon: 'sparkle' },
    { id: 'koerper', text: 'Kein Körperkontakt ohne Ja', icon: 'user' },
  ];
  const FEHLT = { id: 'fehlt', text: 'Hier fehlt eine Regel', icon: 'plus' };

  /* Szenen als Bild: Ort, zwei Figuren mit Stimmung, kurzer Text, ggf. Chat. „Passt“: welche Regeln hier greifen
     (mehrere sind richtig; es gibt keine Falsch-Markierung, nur Gesprächsstoff) */
  const SZENEN = [
    { id: 'chat', ort: 'Gruppenchat', icon: 'phone', colour: 'var(--teamB)', figs: [['mika', 'genervt'], ['sam', 'froh']], text: 'Im Klassenchat postet Sam ein Foto von Mika beim Stolpern. Zwölf Lach-Emojis.', chat: [['Sam', '😂😂 Mika, der Boden wollte dich'], ['Luca', 'hahaha'], ['Mika', '…']], passt: ['beleidigung', 'bleibt', 'stopp'], frage: 'Gilt euer Vertrag auch im Chat?' },
    { id: 'bus', ort: 'Im Bus', icon: 'right', colour: 'var(--teamA)', figs: [['yara', 'neutral'], ['luca', 'traurig']], text: 'Luca sitzt allein hinten. Yara erzählt zwei anderen leise, was Luca gestern im Kurs erzählt hat.', passt: ['bleibt', 'beleidigung'], frage: 'Wo endet „bleibt hier“ – an der Tür oder nie?' },
    { id: 'hof', ort: 'Pausenhof', icon: 'sparkle', colour: 'var(--good)', figs: [['sam', 'wut'], ['mika', 'angst']], text: 'Beim Kicken fliegt der Ball weg. Sam schreit Mika an: „Bist du blind?!“ Mika wird still.', passt: ['beleidigung', 'stopp', 'fehler'], frage: 'Welche Regel hilft Mika gerade? Welche Sam?' },
    { id: 'gruppe', ort: 'Gruppenarbeit', icon: 'users', colour: 'var(--yellow)', figs: [['luca', 'genervt'], ['yara', 'froh']], text: 'Yara redet die ganze Zeit. Luca hat eine Idee, kommt aber nicht dazwischen. Nach 10 Minuten hat Luca aufgegeben.', passt: ['ausreden', 'alle'], frage: 'Wer müsste hier etwas tun – Yara, Luca oder beide?' },
    { id: 'umkleide', ort: 'Umkleide', icon: 'user', colour: '#b48bff', figs: [['mika', 'angst'], ['sam', 'neutral']], text: 'Sam zieht Mika zum Spaß die Kapuze über den Kopf und hält fest. Mika lacht – aber nur mit dem Mund.', passt: ['koerper', 'stopp'], frage: 'Woran merkt man, dass ein Spaß kein Spaß mehr ist?' },
    { id: 'mensa', ort: 'Mensa', icon: 'heart', colour: '#ffb020', figs: [['yara', 'traurig'], ['luca', 'neutral']], text: 'Yara hat beim Vortrag den Faden verloren. In der Mensa macht Luca die Stimme nach. Alle am Tisch grinsen.', passt: ['fehler', 'beleidigung'], frage: 'Ist „nachmachen“ eine Beleidigung?' },
    { id: 'zocken', ort: 'Abends online', icon: 'play', colour: '#4cc9f0', figs: [['sam', 'wut'], ['mika', 'genervt']], text: 'Beim Zocken verliert Sam und schreibt im Voice-Chat: „Spiel nie wieder mit, du Opfer.“ Mika hört zu.', passt: ['beleidigung', 'bleibt', 'hilfe'], frage: 'Gilt der Vertrag abends um 22 Uhr?' },
    { id: 'raum', ort: 'Vor dem Kursraum', icon: 'home', colour: 'var(--accent)', figs: [['luca', 'angst'], ['yara', 'neutral']], text: 'Luca geht es nicht gut und will heute nichts erzählen. Yara fragt dreimal nach: „Jetzt sag schon.“', passt: ['pass', 'stopp', 'hilfe'], frage: 'Darf man nachfragen? Wie oft?' },
  ];

  /* Szenen-Bild: Ort-Kachel, zwei Figuren, Text, Chat-Blasen (Vorlese-Knopf immer dabei) */
  function szenenBild(ctx, s, i, total) {
    const speak = s.ort + '. ' + s.text + (s.chat ? ' ' + s.chat.map((c) => c[0] + ' schreibt: ' + c[1]).join('. ') : '');
    return h('div', { class: 'fig-card enter szene-bild', style: { '--fc': s.colour } },
      h('div', { class: 'fig-side' },
        h('span', { class: 'game-ic', style: { '--tc': s.colour, width: '72px', height: '72px' } }, CREW.icon(s.icon, 40)),
        h('b', { class: 'fig-name' }, s.ort),
        h('div', { class: 'row', style: { gap: '0' } }, s.figs.map(([f, m]) => ctx.avatar(f, m, 64)))),
      h('div', { class: 'fig-body' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Szene ' + (i + 1) + ' von ' + total), ctx.readBtn(speak)),
        h('div', { class: 'fig-text' }, s.text),
        s.chat ? h('div', { class: 'chat-box' }, s.chat.map(([who, t]) => ctx.bubble(t, { who, me: who === 'Mika' }))) : null));
  }

  /* Eine Szene: Bild + Regel-Chips (höchstens zwei) + „Hier fehlt eine Regel“ */
  async function szene(ctx, s, i, total, regeln) {
    const picked = [];
    const count = h('span', { class: 'pill' }, '0 von 2 gewählt');
    const chips = regeln.concat([FEHLT]).map((r) => {
      const b = h('button', { type: 'button', class: 'chip regel-chip' + (r.id === 'fehlt' ? ' fehlt' : ''), 'data-regel': r.id }, CREW.icon(r.icon, 18), r.text);
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        const idx = picked.indexOf(r.id);
        if (idx >= 0) picked.splice(idx, 1); else if (picked.length < 2) picked.push(r.id); else return;
        b.classList.toggle('sel', picked.includes(r.id));
        count.textContent = picked.length + ' von 2 gewählt';
      });
      return b;
    });
    const wrap = ctx.scr([
      szenenBild(ctx, s, i, total),
      h('div', { class: 'card stack' },
        h('div', { class: 'row between' }, h('b', null, 'Welche Regel aus eurem Vertrag greift hier? Höchstens zwei.'), count),
        h('div', { class: 'row', style: { gap: '8px' } }, chips),
        h('p', { class: 'muted small' }, 'Nur du siehst deine Wahl. Keine Regel passt? Dann „Hier fehlt eine Regel“.')),
    ], { eyebrow: 'Szene ' + (i + 1) + '/' + total });
    if (ctx.auto) { const n = 1 + Math.floor(ctx.autoRng() * 2); for (let k = 0; k < n; k++) chips[Math.floor(ctx.autoRng() * chips.length)].click(); }
    const r = await ctx.next(wrap, i + 1 < total ? 'Nächste Szene' : 'Fertig getippt');
    if (r === ctx.SKIP) return null;
    return picked.slice();
  }

  /* „Unser Vertrag“: Chips abwählen, die es bei euch nicht gibt (nur für dieses Spiel, nichts gespeichert) */
  async function vertragWaehlen(ctx) {
    const on = new Set(REGELN.map((r) => r.id));
    const chips = REGELN.map((r) => {
      const b = h('button', { type: 'button', class: 'chip sel', 'data-vertrag': r.id }, CREW.icon(r.icon, 18), r.text);
      b.addEventListener('click', () => { CREW.sound.play('tap'); if (on.has(r.id)) { if (on.size <= 4) return; on.delete(r.id); } else on.add(r.id); b.classList.toggle('sel', on.has(r.id)); });
      return b;
    });
    const w = ctx.scr([
      ctx.say('Welche Regeln stehen in eurem Vertrag? Tippt weg, was es bei euch nicht gibt. Mindestens vier bleiben.', { eyebrow: 'Unser Vertrag', small: true }),
      h('div', { class: 'card' }, h('div', { class: 'row', style: { gap: '8px' } }, chips)),
      h('p', { class: 'muted small' }, 'Nur für dieses Spiel auf diesem Gerät. Alle iPads sollten dieselben Chips haben – am Beamer zeigen.'),
    ], { eyebrow: 'Vorbereitung' });
    await ctx.next(w, 'So ist unser Vertrag');
    return REGELN.filter((r) => on.has(r.id));
  }

  CREW.registerGame({
    id: 'regel-radar',
    template: 'T1',
    icon: 'shield',
    themen: ['Regeln', 'Vertrag', 'Mitbestimmung', 'Alltag'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    async run(ctx) {
      // Variante aus dem Finder: j1-e01 = drei Szenen zum frischen Vertrag
      const unit = CREW.games.FILTER && CREW.games.FILTER.einheit;
      const anzahl = unit === 'j1-e01' ? 3 : 4;
      await ctx.T.intro({
        rule: 'Vier Szenen aus dem Alltag. Welche Regel aus eurem Vertrag greift hier? Keine passt? Dann fehlt eine – und ihr ändert den Vertrag.',
        steps: [
          { icon: 'eye', title: 'Szene anschauen', text: 'Chat, Bus, Hof, Gruppenarbeit.' },
          { icon: 'check', title: '1–2 Regeln tippen', text: 'Oder: „Hier fehlt eine Regel“.' },
          { icon: 'users', title: 'Zu zweit vergleichen', text: 'Lücke gefunden? Ab aufs Plakat.' },
        ],
        probe: async () => {
          const w = ctx.scr([
            h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            ctx.say('Probe: Zwei Figuren streiten um die Fernbedienung. Tipp einen Chip an und wieder ab.', { eyebrow: 'Zum Ausprobieren' }),
            h('div', { class: 'row', style: { gap: '8px' } }, REGELN.slice(0, 4).map((r) => { const b = h('button', { type: 'button', class: 'chip' }, CREW.icon(r.icon, 18), r.text); b.addEventListener('click', () => b.classList.toggle('sel')); return b; })),
          ], { eyebrow: 'Probe' });
          await ctx.next(w, 'Verstanden');
        },
      });
      await ctx.T.codeCheck();
      // Vertrag anpassen? (optional, Standard: alle zehn Chips)
      const w0 = ctx.scr([
        ctx.say('Die Regel-Chips sind typische Sätze aus einem Crew-Vertrag. Passen sie zu eurem?', { eyebrow: 'Vorbereitung', small: true }),
        h('div', { class: 'row', style: { gap: '6px' } }, REGELN.map((r) => h('span', { class: 'chip small' }, r.text))),
      ], { eyebrow: 'Vorbereitung' });
      const v = await ctx.ask(w0, [{ label: 'Chips anpassen', value: 'edit', variant: 'ghost', icon: 'gear', auto: false }, { label: 'Passt, los', value: 'go', iconRight: 'right' }]);
      const regeln = v === 'edit' ? await vertragWaehlen(ctx) : REGELN;
      // Dieselben Szenen auf allen iPads (Tagescode); die vier Klassiker zuerst im Pool
      const pool = ctx.rshuffle(SZENEN);
      const szenen = pool.slice(0, anzahl);
      const wahl = {};
      let luecken = 0, getippt = 0;
      for (let i = 0; i < szenen.length; i++) {
        const p = await szene(ctx, szenen[i], i, szenen.length, regeln);
        if (!p) continue;
        wahl[szenen[i].id] = p;
        getippt++;
        if (p.includes('fehlt')) luecken++;
      }
      // Austausch: Farbe finden, EINE Vergleichskarte
      await ctx.T.pairScreen();
      const label = (id) => (id === 'fehlt' ? FEHLT.text : (REGELN.find((r) => r.id === id) || {}).text || id);
      await ctx.T.vergleich({
        title: 'Regel-Radar',
        items: szenen.map((s) => ({ label: s.ort, el: h('span', { class: 'vk-ic', style: { background: s.colour } }, CREW.icon(s.icon, 22)), text: wahl[s.id] ? (wahl[s.id].length ? wahl[s.id].map(label).join(' · ') : 'nichts gewählt') : 'gepasst' })),
        questions: ['Wie hast du dich entschieden? Warum?', 'Wo fehlt eine Regel? Was müsste im Vertrag stehen?'],
        note: 'Anders ist nicht falsch. Eine Lücke ist ein Fund, kein Fehler.',
      });
      // Lücken-Runde am Beamer: Was kommt in den echten Vertrag? (Das ist der eigentliche Zweck.)
      const fragen = szenen.map((s) => h('div', { class: 'vk-item' }, h('span', { class: 'vk-ic', style: { background: s.colour } }, CREW.icon(s.icon, 22)), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, s.ort), h('span', { class: 'muted small' }, s.frage))));
      const w2 = ctx.scr([
        ctx.say('Jetzt alle: Hat ein Paar eine Lücke gefunden? Dann sagt sie – und der Satz wandert heute noch aufs Plakat.', { eyebrow: 'Der echte Vertrag' }),
        h('div', { class: 'grid two' }, fragen),
        CREW.ui.teacherLine('Lücke aufschreiben, Vertrag ergänzen. Kein Paar muss seine Wahl zeigen.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Vertrag' });
      const l = await ctx.ask(w2, [{ label: 'Keine Lücke heute', value: 'keine', variant: 'ghost' }, { label: 'Lücke gefunden – kommt aufs Plakat', value: 'plakat', icon: 'plus', variant: 'good' }]);
      const plakat = l === 'plakat';
      return {
        summary: plakat ? 'Eine Lücke gefunden. Der Vertrag wächst mit euch.' : getippt ? 'Der Vertrag hält – auch im Chat, im Bus und auf dem Hof.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[getippt, 'Szenen'], [luecken, 'mal „hier fehlt eine Regel“']].concat(plakat ? [[1, 'Satz fürs Plakat']] : []),
      };
    },
  });
})();
