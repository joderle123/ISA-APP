/* Spiel „Crew-Rat“ (Thema: Ankommen & Crew) · Vorlage T6 Beamer-Gruppe · j1-e01, j1-e03, j1-e30 · Top
   Die Crew entscheidet etwas Echtes (nächstes Pausen-Spiel, Imbiss, Vertrags-Ergänzung …): Vorschläge sammeln,
   Runde „Was spricht dagegen?“, dann Konsent statt Abstimmung – „Wer kann damit leben?“, Veto nur mit Grund.
   Stille tippen „Einwand“ per Chip (auf dem eigenen iPad per QR oder am Beamer). Der Beschluss landet als Karte
   im Crew-HQ (unter der Sticker-Wand, ohne Namen). Keine Hände zählen, die Lehrkraft tippt nur, was die Crew sagt.
   In drei Level: 1) Sammeln, 2) Abwägen (Was spricht dagegen? Für wen wäre es schwer?), 3) Entscheiden (Konsent). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const THEMEN = [
    { id: 'pause', name: 'Nächstes Pausen-Spiel', icon: 'play', vorschlaege: ['Fußball', 'Werwolf', 'Tischkicker-Turnier', 'Musik anmachen und chillen', 'Karten spielen', 'Rausgehen, egal wohin'] },
    { id: 'imbiss', name: 'Imbiss für die Feier', icon: 'heart', vorschlaege: ['Pizza bestellen', 'Jede:r bringt was mit', 'Pancakes selbst machen', 'Nur Snacks und Getränke', 'Döner holen', 'Obst und Eis'] },
    { id: 'vertrag', name: 'Ergänzung für den Vertrag', icon: 'shield', vorschlaege: ['Handy-Regel genauer machen', '„Stopp heißt Stopp“ dazunehmen', 'Chat-Regel: gilt auch abends', 'Regel für Zu-spät-Kommen', 'Eine Regel streichen, die nie gilt', 'Pass ohne Nachfrage'] },
    { id: 'raum', name: 'Unser Raum', icon: 'home', vorschlaege: ['Sitzordnung ändern', 'Plakat-Wand neu machen', 'Eine Chill-Ecke einrichten', 'Musik in der Arbeitsphase (leise)', 'Pflanze besorgen', 'Lichter aufhängen'] },
    { id: 'ausflug', name: 'Ausflug am Ende', icon: 'star', vorschlaege: ['Kletterhalle', 'Kino', 'Grillen am See', 'Trampolinpark', 'Stadt-Rallye', 'Bowling'] },
    { id: 'ritual', name: 'Unser Start-Ritual', icon: 'sparkle', vorschlaege: ['Ein Lied zum Start', 'Wetter-Check in zwei Minuten', 'Ein Witz pro Stunde', 'Handschlag-Runde ohne Berührung', 'Fünf Minuten Reden ohne Thema', 'Kurz raus, kurz rein'] },
  ];
  const GRUENDE = [
    { id: 'regel', text: 'Das verletzt eine Regel von uns', icon: 'shield' },
    { id: 'ausschluss', text: 'Jemand kann da nicht mitmachen', icon: 'users' },
    { id: 'zuweit', text: 'Das geht mir zu weit', icon: 'x' },
    { id: 'kosten', text: 'Kostet zu viel Geld oder Zeit', icon: 'timer' },
    { id: 'unsicher', text: 'Das ist nicht sicher', icon: 'lock' },
  ];
  const LEVELS = ['Sammeln', 'Abwägen', 'Entscheiden'];
  const DAGEGEN = ['Zu teuer', 'Zu lang', 'Nicht alle können mit', 'Langweilig nach 10 Minuten', 'Braucht Erlaubnis', 'Unfair für manche', 'Wetter-abhängig', 'Zu laut', 'Schwer für Stille', 'Schwer für Neue'];

  /* ---- Beschlüsse: im Spielstand (ohne Namen), als Karten im HQ unter der Sticker-Wand ---- */
  const deDatum = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? m[3] + '.' + m[2] + '.' + m[1] : iso || ''; };
  function beschluesse() { const st = CREW.state; if (!Array.isArray(st.beschluesse)) st.beschluesse = []; return st.beschluesse; }
  function beschlussKarte(b) {
    return h('div', { class: 'beschluss', 'data-theme': 'ankommen' },
      h('span', { class: 'eyebrow' }, 'Crew-Rat · ' + deDatum(b.datum)),
      h('b', { class: 'display' }, b.thema),
      h('span', null, b.text, b.angepasst ? h('span', { class: 'pill small', style: { marginLeft: '6px' } }, 'angepasst') : null),
      h('span', { class: 'muted small' }, 'Konsent: alle konnten damit leben' + (b.einwaende ? ' · ' + b.einwaende + (b.einwaende === 1 ? ' Einwand' : ' Einwände') + ' besprochen' : '')));
  }
  function renderBeschluesse() {
    const all = beschluesse();
    if (!all.length) return null;
    return h('div', { class: 'card stack', id: 'beschluss-wand' },
      h('div', { class: 'row between' }, h('b', null, 'Beschlüsse der Crew'), h('span', { class: 'muted small' }, all.length + (all.length === 1 ? ' Beschluss' : ' Beschlüsse'))),
      h('div', { class: 'beschluss-grid' }, all.slice(-6).reverse().map(beschlussKarte)));
  }
  // Ins HQ einhängen, ohne den Kern zu ändern: Sticker-Wand + Beschlüsse
  if (CREW.games && CREW.games.renderWall && !CREW.games.renderWall.__crewRat) {
    const orig = CREW.games.renderWall;
    const wrapped = () => { const wall = orig(); const b = renderBeschluesse(); return b ? h('div', { class: 'stack' }, wall, b) : wall; };
    wrapped.__crewRat = true;
    CREW.games.renderWall = wrapped;
  }

  /* Vorschlagsliste als Karte (Status: offen / ok / veto) */
  function liste(vs, status, geaendert) {
    return h('div', { class: 'stack', style: { gap: '8px' } }, vs.map((v, i) => h('div', { class: 'cr-vorschlag', 'data-status': status[i] || 'offen' },
      h('span', { class: 'cr-nr' }, String(i + 1)), h('b', null, v), geaendert && geaendert[i] ? h('span', { class: 'pill small' }, 'angepasst') : null, h('span', { class: 'pill ' + (status[i] === 'ok' ? 'good' : '') }, status[i] === 'ok' ? 'alle können damit leben' : status[i] === 'veto' ? 'Veto' : 'offen'))));
  }

  /* Jugend-iPad per QR: stiller Einwand-Chip (zeigt nur Satzanfänge, nichts wird gesendet) */
  async function stillesIpad(ctx) {
    const w = ctx.scr([
      ctx.say('Du willst etwas sagen, aber nicht laut? Tipp „Einwand“ und zeig das iPad der Lehrkraft – oder sag leise einen Satz.', { eyebrow: 'Stille Stimme', small: true }),
      h('div', { class: 'card stack soft' }, h('b', null, 'Satzanfänge'), h('div', { class: 'row', style: { gap: '8px' } }, ['Ich kann damit leben, aber …', 'Ich kann damit NICHT leben, weil …', 'Mir fehlt dabei …', 'Für mich wäre besser …'].map((x) => h('span', { class: 'chip' }, x)))),
    ], { eyebrow: 'Crew-Rat', badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
    const r = await ctx.ask(w, [{ label: 'Einwand', value: 'einwand', variant: 'teamB', icon: 'bolt' }, { label: 'Kann damit leben', value: 'ok', variant: 'good', icon: 'check' }]);
    if (r === ctx.SKIP) return { summary: 'Gepasst. Auch eine Stimme.', noSticker: true };
    const w2 = ctx.scr([
      h('div', { class: 'stop-big display', style: { color: r === 'einwand' ? 'var(--teamB)' : 'var(--good)' } }, r === 'einwand' ? 'Einwand' : 'Okay'),
      h('p', { class: 'lead', style: { textAlign: 'center' } }, r === 'einwand' ? 'Zeig das der Lehrkraft. Dein Grund zählt – ein Satz reicht.' : 'Damit kannst du leben. Das ist Konsent.'),
    ], { eyebrow: 'Crew-Rat', center: true });
    await ctx.next(w2, 'Nochmal zeigen');
    return { summary: 'Stimme abgegeben. Der Rest läuft am Beamer.', noSticker: true };
  }

  CREW.registerGame({
    id: 'crew-rat',
    template: 'T6',
    icon: 'users',
    themen: ['Mitbestimmung', 'Konsent', 'Einwände', 'Verlieren können'],
    safety: ['freiwillig'],
    help: false,
    async run(ctx) {
      if (ctx.opts.platz || ctx.role) return stillesIpad(ctx);
      await ctx.T.intro({
        rule: 'Die Crew entscheidet etwas Echtes. Nicht die Mehrheit gewinnt – ihr sucht den Vorschlag, mit dem ALLE leben können. Veto nur mit Grund.',
        levels: LEVELS,
        steps: [
          { icon: 'plus', title: 'Vorschläge sammeln', text: 'Zwei bis vier Ideen.' },
          { icon: 'chat', title: 'Was spricht dagegen?', text: 'Jeder Vorschlag bekommt eine Runde.' },
          { icon: 'check', title: 'Konsent', text: '„Wer kann damit leben?“ statt Abstimmung.' },
        ],
        probe: ctx.T.probeCard('Probe: Vorschlag „Pause fünf Minuten länger“. Könnt ihr damit leben – oder Veto mit Grund? Tippt – zählt nicht.', [{ label: 'Kann damit leben', value: 1, variant: 'ghost' }, { label: 'Veto: „weil …“', value: 2, variant: 'ghost' }]),
      });
      const alte = beschluesse();
      // 1) Thema wählen
      const w1 = ctx.scr([
        ctx.say('Worüber entscheidet die Crew heute? Etwas Echtes – das Ergebnis gilt.', { eyebrow: 'Thema', small: true }),
        alte.length ? h('div', { class: 'card stack soft' }, h('b', null, 'Letzter Beschluss'), beschlussKarte(alte[alte.length - 1])) : null,
        CREW.ui.teacherLine('Thema antippen, das die Crew nennt.'),
      ], { eyebrow: 'Thema' });
      const tId = await ctx.ask(w1, THEMEN.map((t) => ({ label: t.name, value: t.id, icon: t.icon, variant: 'ghost' })));
      if (tId === ctx.SKIP) return { summary: 'Heute kein Rat. Auch okay.', noSticker: true };
      const thema = THEMEN.find((t) => t.id === tId);
      // 2) Vorschläge sammeln: Chips antippen oder eigenen Vorschlag eintippen (2–4)
      const vs = [];
      const listBox = h('div', { class: 'row', style: { gap: '8px', minHeight: '48px' } });
      const drawList = () => listBox.replaceChildren(...(vs.length ? vs.map((v, i) => { const c = h('button', { type: 'button', class: 'chip sel' }, (i + 1) + '. ' + v, ' ✕'); c.addEventListener('click', () => { vs.splice(i, 1); drawList(); }); return c; }) : [h('span', { class: 'muted' }, 'Noch kein Vorschlag.')]));
      drawList();
      const add = (t) => { const v = (t || '').trim().slice(0, 60); if (!v || vs.includes(v) || vs.length >= 4) return; vs.push(v); drawList(); };
      const inp = h('input', { type: 'text', class: 'cr-input', id: 'cr-input', placeholder: 'Eigener Vorschlag der Crew …', maxlength: '60' });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { add(inp.value); inp.value = ''; } });
      const w2 = ctx.scr([
        h('div', { class: 'row between' }, h('h2', null, thema.name), h('span', { class: 'pill accent' }, 'Vorschläge: 2 bis 4')),
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack' }, h('b', null, 'Ideen der Crew'), h('div', { class: 'row', style: { gap: '8px' } }, thema.vorschlaege.map((v) => { const b = h('button', { type: 'button', class: 'chip', 'data-v': v }, v); b.addEventListener('click', () => { CREW.sound.play('tap'); add(v); }); return b; })),
            h('div', { class: 'row' }, inp, CREW.ui.btn('Dazu', () => { add(inp.value); inp.value = ''; }, { small: true, icon: 'plus', id: 'cr-add' }))),
          h('div', { class: 'card stack' }, h('b', null, 'Auf dem Tisch'), listBox, h('p', { class: 'muted small' }, 'Antippen entfernt. Wer still ist, darf einen Vorschlag auf einen Zettel schreiben.'))),
        CREW.ui.teacherLine('Nur tippen, was die Crew sagt. Keine eigenen Vorschläge.'),
      ], { eyebrow: 'Vorschläge', badge: ctx.stufe(1, LEVELS) });
      if (ctx.auto) { thema.vorschlaege.slice(0, 2 + Math.floor(ctx.autoRng() * 3)).forEach(add); }
      for (;;) {
        const r = await ctx.next(w2, 'Vorschläge stehen');
        if (r === ctx.SKIP) return { summary: 'Abgebrochen. Beim nächsten Mal.', noSticker: true };
        if (vs.length >= 2) break;
        CREW.ui.toast('Mindestens zwei Vorschläge.');
      }
      // 3) Runde „Was spricht dagegen?“ – pro Vorschlag 30 Sekunden, Chips nur als Gedächtnis
      const dagegen = vs.map(() => []);
      for (let i = 0; i < vs.length; i++) {
        const box = h('div', { class: 'row', style: { gap: '8px' } }, DAGEGEN.map((d) => { const b = h('button', { type: 'button', class: 'chip', 'data-d': d }, d); b.addEventListener('click', () => { CREW.sound.play('tap'); const k = dagegen[i].indexOf(d); if (k >= 0) dagegen[i].splice(k, 1); else dagegen[i].push(d); b.classList.toggle('sel', dagegen[i].includes(d)); }); return b; }));
        const slot = h('div', { class: 'row center' });
        const w3 = ctx.scr([
          h('div', { class: 'row between' }, h('h2', null, (i + 1) + '. ' + vs[i]), slot),
          ctx.say('Was spricht dagegen? Und: Für wen wäre das schwer? Nur Einwände, keine Verteidigung.', { eyebrow: 'Was spricht dagegen? · ' + (i + 1) + ' von ' + vs.length, small: true }),
          h('div', { class: 'card stack' }, h('b', null, 'Gedächtnis-Chips (optional)'), box),
          h('p', { class: 'muted small' }, 'Wer den Vorschlag gemacht hat, hört zu. Perspektive wechseln: Wer kann nicht mit, wem fällt es schwer?'),
          CREW.ui.teacherLine('30 Sekunden pro Vorschlag. „Weiter“, wenn nichts mehr kommt.'),
        ], { eyebrow: 'Dagegen ' + (i + 1) + '/' + vs.length, badge: ctx.stufe(2, LEVELS) });
        if (ctx.auto && ctx.autoRng() < 0.6) box.querySelector('button').click();
        const r = await ctx.timerOrButton(w3, 30, [{ label: i + 1 < vs.length ? 'Nächster Vorschlag' : 'Zum Konsent', value: 'next', iconRight: 'right', id: 'btn-next' }], { slot });
        if (r === ctx.SKIP) continue;
      }
      // 4) Konsent: „Wer kann damit leben?“ – Veto nur mit Grund. Höchstens zwei Durchgänge.
      const status = vs.map(() => 'offen');
      const geaendert = vs.map(() => false); // Flag statt „(geändert)“ an den Text zu hängen
      let einwaende = 0;
      let beschluss = null;
      for (let runde = 0; runde < 2 && !beschluss; runde++) {
        for (let i = 0; i < vs.length && !beschluss; i++) {
          if (status[i] === 'veto') continue;
          const w4 = ctx.scr([
            h('div', { class: 'grid two' },
              h('div', { class: 'stack' }, ctx.say('Wer kann damit leben? Nicht: Wer findet es am besten.', { eyebrow: 'Konsent · ' + (i + 1) + '. ' + vs[i], small: true }), dagegen[i].length ? h('div', { class: 'row' }, dagegen[i].map((d) => h('span', { class: 'chip small' }, d))) : null,
                h('div', { class: 'card stack soft' }, h('b', null, 'Stille Stimmen'), h('p', { class: 'muted small' }, 'Wer nicht laut reden will: „Einwand“ am eigenen iPad zeigen oder einen Zettel geben. Die Lehrkraft liest ihn vor – ohne Namen.'))),
              h('div', { class: 'card stack' }, h('b', null, 'Vorschläge'), liste(vs, status))),
            CREW.ui.teacherLine('Fragen: „Kann jemand damit NICHT leben?“ Wenn niemand: alle können leben. Sonst: Veto mit Grund.'),
          ], { eyebrow: 'Konsent', badge: ctx.stufe(3, LEVELS) });
          const r = await ctx.ask(w4, [{ label: 'Veto mit Grund', value: 'veto', variant: 'teamB', icon: 'x' }, { label: 'Alle können damit leben', value: 'ok', variant: 'good', icon: 'check' }]);
          if (r === ctx.SKIP) continue;
          if (r === 'ok') { status[i] = 'ok'; beschluss = i; break; }
          // Veto: Grund nennen (Chips) – ohne Grund gilt es nicht
          const w5 = ctx.scr([
            ctx.say('Veto gilt nur mit Grund. Welcher Grund ist es? Die Person sagt ihn – die Lehrkraft tippt.', { eyebrow: 'Veto · ' + vs[i], small: true }),
            h('p', { class: 'muted' }, '„Ich mag es nicht“ ist eine Meinung, kein Veto. Dann heißt es: „Kann ich trotzdem damit leben?“'),
            ctx.safetyLine('freiwillig'),
          ], { eyebrow: 'Veto' });
          const g = await ctx.ask(w5, GRUENDE.map((x) => ({ label: x.text, value: x.id, icon: x.icon, variant: 'ghost' })).concat([{ label: 'Doch kein Veto – kann damit leben', value: 'zurueck', variant: 'good' }]));
          if (g === 'zurueck') { status[i] = 'ok'; beschluss = i; break; }
          if (g === ctx.SKIP) continue;
          einwaende++;
          status[i] = 'veto';
          const w6 = ctx.scr([ctx.say('Veto angenommen: ' + GRUENDE.find((x) => x.id === g).text + '. Kann der Vorschlag so geändert werden, dass das Veto wegfällt?', { eyebrow: 'Vorschlag ändern?', small: true }), liste(vs, status, geaendert)], { eyebrow: 'Veto' });
          const a = await ctx.ask(w6, [{ label: 'Nein, nächster Vorschlag', value: 'next', variant: 'ghost' }, { label: 'Ja, geändert – nochmal fragen', value: 'retry', icon: 'undo' }]);
          if (a === 'retry') { status[i] = 'offen'; geaendert[i] = true; i--; }
        }
        if (beschluss == null && status.every((s) => s === 'veto') && runde === 0) {
          const w7 = ctx.scr([ctx.say('Alle Vorschläge haben ein Veto. Zweite Runde: Welcher Vorschlag lässt sich ändern? Die Vetos sind zurückgesetzt.', { eyebrow: 'Zweite Runde', small: true })], { eyebrow: 'Konsent', center: true });
          await ctx.next(w7, 'Zweite Runde');
          status.fill('offen');
        }
      }
      // 5) Beschluss-Karte fürs HQ – oder ehrliches „heute kein Beschluss“
      if (beschluss == null) {
        const w8 = ctx.scr([ctx.say('Heute kein Beschluss. Das ist kein Scheitern: Ein Veto mit Grund schützt jemanden. Nächstes Mal weiter.', { eyebrow: 'Kein Konsent' })], { eyebrow: 'Ende', center: true });
        await ctx.next(w8, 'Fertig');
        return { summary: 'Kein Beschluss – aber ' + einwaende + (einwaende === 1 ? ' Einwand' : ' Einwände') + ' gehört. Das zählt.', stats: [[vs.length, 'Vorschläge'], [einwaende, 'Vetos mit Grund']] };
      }
      const b = { datum: CREW.util.todayISO(), thema: thema.name, text: vs[beschluss], einwaende, angepasst: !!geaendert[beschluss] };
      beschluesse().push(b);
      if (beschluesse().length > 12) beschluesse().splice(0, beschluesse().length - 12);
      CREW.save();
      CREW.sound.play('great');
      if (!ctx.fast) CREW.ui.confetti(100);
      const w9 = ctx.scr([
        h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Beschluss!'),
        beschlussKarte(b),
        ctx.say('Wer einen anderen Vorschlag wollte: Ein Satz, wie sich das anfühlt – wenn du magst. Verlieren können gehört zum Rat.', { eyebrow: 'Kurz reden', small: true }),
        h('p', { class: 'muted small' }, 'Die Karte hängt jetzt im Crew-HQ. Ohne Namen.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Beschluss', center: true });
      await ctx.next(w9, 'Fertig');
      return { summary: 'Beschluss: ' + vs[beschluss] + '. Alle konnten damit leben.', stats: [[vs.length, 'Vorschläge'], [einwaende, 'Vetos mit Grund']] };
    },
  });
})();
