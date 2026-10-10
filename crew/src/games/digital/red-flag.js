/* Spiel „Red Flag“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T3 Zu zweit an einem iPad · j1-e22, j1-e27, j1-e28
   Neu (Lücke Online-Kontakt mit Fremden): Eine Direktnachricht von einem unbekannten Profil, das nett anfängt.
   Nachricht für Nachricht tippt das Paar die roten Flaggen an, sobald sie auftauchen (schmeichelt viel, will ein
   Geheimnis, fragt nach Fotos, drängt auf einen anderen Kanal, Geschenke, Druck) – und wählt den Zug: Screenshot,
   blockieren, einer erwachsenen Person zeigen (zwei Finger). Level 2: ein „Teamkollege“ aus einem Spiel – früh stoppen.
   Level 3: Jemand aus der Klasse bittet um ein Foto „nur für mich“ – Nein sagen, beim Nein bleiben, Hilfe holen.
   Immer am Ende: BEE SECURE 8002 1234, 116 111, Lehrkraft. Erfundene Profile, keine echten Apps oder Nutzernamen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Flaggen finden', 'Früh stoppen', 'Nein + Hilfe'];
  const FLAGGEN = {
    schmeichel: 'Schmeichelt sehr viel',
    reif: '„So reif für dein Alter“',
    geheim: 'Will ein Geheimnis',
    kanal: 'Drängt auf einen anderen Kanal',
    foto: 'Fragt nach Fotos',
    geschenk: 'Bietet Geschenke an',
    druck: 'Macht Druck oder droht',
    alter: 'Fragt nach dem Alter',
  };
  /* Chats: who = 'x' (das fremde Profil) oder 'me' (die Figur). flag = Art der roten Flagge (oder keine). */
  const CHATS = [
    {
      id: 'fremd', L: 1, fig: 'yara', name: 'Nova 🌙', handle: 'nova.sky_14', info: 'Neuer Kontakt · 3 Beiträge · „14, Luxemburg“',
      msgs: [
        { who: 'x', t: 'hey 😊 hab dein Handball-Video gesehen' },
        { who: 'me', t: 'oh danke 😅 wer bist du?' },
        { who: 'x', t: 'Nova, 14, wohn auch in Luxemburg 🙂' },
        { who: 'x', t: 'ehrlich, du bist viel hübscher als die anderen aus deinem Team 😍', flag: 'schmeichel' },
        { who: 'me', t: 'haha ok' },
        { who: 'x', t: 'du bist echt reif für dein alter. mit dir kann man reden', flag: 'reif' },
        { who: 'x', t: 'erzähl aber niemandem von uns, die anderen verstehen das eh nicht 🤫', flag: 'geheim' },
        { who: 'x', t: 'lass lieber auf Blinkr weiterschreiben, da verschwinden die Nachrichten', flag: 'kanal' },
        { who: 'x', t: 'schick mal ein Foto von dir, nur für mich 🙈', flag: 'foto' },
        { who: 'x', t: 'ich schick dir auch 20 € Guthaben dafür 💸', flag: 'geschenk' },
        { who: 'x', t: '??? warum antwortest du nicht. dachte du bist anders', flag: 'druck' },
      ],
    },
    {
      id: 'spiel', L: 2, fig: 'mika', name: 'Kristallkönig', handle: 'kristallkoenig', info: 'Aus dem Team-Chat im Spiel · seit gestern',
      msgs: [
        { who: 'x', t: 'gg! du spielst echt gut 🔥' },
        { who: 'x', t: 'willst du in meinen clan? wir sind die besten' },
        { who: 'me', t: 'vllt, wie läuft das?' },
        { who: 'x', t: 'ich schenk dir 500 kristalle zum start 💎', flag: 'geschenk' },
        { who: 'x', t: 'wie alt bist du eigentlich? ich bin 15', flag: 'alter' },
        { who: 'x', t: 'lass auf Blinkr schreiben, der chat im spiel nervt', flag: 'kanal' },
        { who: 'x', t: 'sag deinen eltern nix vom clan, die checken das nicht', flag: 'geheim' },
        { who: 'x', t: 'für den clan-ausweis brauch ich ein foto von dir 📸', flag: 'foto' },
        { who: 'x', t: 'wenn nicht, bist du raus. und die kristalle will ich zurück', flag: 'druck' },
      ],
    },
  ];
  /* Züge: Reihenfolge zählt (Screenshot vor dem Blockieren, sonst ist der Beweis weg) */
  const ZUEGE = [
    { id: 'screenshot', t: 'Screenshot machen', gut: true, icon: 'copy' },
    { id: 'block', t: 'Blockieren und melden', gut: true, icon: 'x' },
    { id: 'erwachsen', t: 'Einer erwachsenen Person zeigen', gut: true, icon: 'user' },
    { id: 'weiter', t: 'Freundlich weiterchatten', gut: false, icon: 'chat', warum: 'Jede Antwort zeigt: Hier geht noch was.' },
    { id: 'ohne', t: 'Foto schicken, aber ohne Gesicht', gut: false, icon: 'eye', warum: 'Auch ohne Gesicht: Das Foto ist weg und kann weitergeschickt werden.' },
    { id: 'treffen', t: 'Sich treffen, um zu sehen, wer es ist', gut: false, icon: 'users', warum: 'Nie allein zu einem Online-Kontakt. Erst eine erwachsene Person.' },
  ];
  /* Level 3: Jemand aus der Klasse */
  const KLASSE = {
    fig: 'sam', von: 'luca',
    msgs: [{ who: 'x', t: 'hey sam 😊' }, { who: 'x', t: 'du warst heute echt süß im sport lol' }, { who: 'x', t: 'schick mir mal ein foto von dir, nur für mich 🙈 versprochen', flag: 'foto' }],
    nach: { who: 'x', t: 'komm schon, vertraust du mir nicht? 🥺 alle machen das', flag: 'druck' },
    antwort1: [
      { t: 'Nein. Mach ich nicht.', gut: true },
      { t: 'Haha vielleicht später 😅', gut: false, warum: 'Ein Vielleicht hört sich für den anderen wie „bald ja“ an. Er fragt weiter.' },
      { t: 'Nur wenn du zuerst schickst.', gut: false, warum: 'Dann sind zwei Fotos unterwegs – und beide können weitergehen.' },
      { t: 'Nein. Wenn du nochmal fragst, zeig ich das einer Lehrerin.', gut: true },
    ],
    antwort2: [
      { t: 'Nein. Vertrauen heißt: ein Nein akzeptieren.', gut: true },
      { t: 'Okay … aber nur eins.', gut: false, warum: 'Ein Foto „nur für dich“ bleibt nie nur bei einer Person. Wenn es passiert ist: nicht deine Schuld – Hilfe holen.' },
      { t: 'Chat stummschalten und einer erwachsenen Person zeigen.', gut: true },
    ],
  };

  // Chat im erfundenen Messenger-Look. Fremde Nachrichten sind antippbar (rote Flagge an/aus). Rückgabe { el, add(i) }
  function chatEl(ctx, c, flagged, onFlag) {
    const list = h('div', { class: 'rf-msgs', role: 'log', 'aria-live': 'polite' });
    let shown = 0;
    const add = (i) => {
      const m = c.msgs[i];
      shown = Math.max(shown, i + 1);
      list.querySelectorAll('.neu').forEach((x) => x.classList.remove('neu'));
      if (m.who === 'me') list.appendChild(h('div', { class: 'rf-msg me neu' }, h('span', { class: 'rf-bubble' }, m.t)));
      else {
        const b = h('button', { type: 'button', class: 'rf-msg x neu' + (flagged.has(i) ? ' flagged' : ''), 'data-i': String(i), 'aria-pressed': flagged.has(i) ? 'true' : 'false', 'aria-label': 'Nachricht: ' + m.t + '. Antippen: rote Flagge' },
          h('span', { class: 'rf-bubble' }, m.t), h('span', { class: 'rf-flag', 'aria-hidden': 'true' }, '🚩'));
        if (onFlag) b.addEventListener('click', () => { onFlag(i); b.classList.toggle('flagged', flagged.has(i)); b.setAttribute('aria-pressed', flagged.has(i) ? 'true' : 'false'); });
        list.appendChild(b);
      }
      requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
    };
    const el = h('div', { class: 'rf-phone' },
      h('div', { class: 'rf-head' }, h('span', { class: 'rf-ava' }, c.name.slice(0, 1)), h('div', { class: 'stack', style: { gap: '0', minWidth: 0 } }, h('b', null, c.name), h('span', { class: 'small rf-handle' }, '@' + c.handle)), ctx.readBtn(() => c.msgs.slice(0, shown).map((m) => (m.who === 'me' ? ctx.figures[c.fig].name : c.name) + ': ' + m.t).join('. '))),
      h('div', { class: 'rf-info' }, CREW.icon('help', 16), ' ' + c.info),
      list,
      h('div', { class: 'rf-foot' }, 'Erfundener Chat · zum Üben'));
    return { el, add, list };
  }
  const flagCount = (c, flagged) => {
    const echt = c.msgs.map((m, i) => (m.flag ? i : -1)).filter((i) => i >= 0);
    return { echt, getroffen: echt.filter((i) => flagged.has(i)), extra: [...flagged].filter((i) => !c.msgs[i].flag) };
  };

  /* Chat Nachricht für Nachricht lesen (auf EINEM Bildschirm), Flaggen tippen, Stopp jederzeit.
     Rückgabe { upto, flagged, gestoppt } oder null (Pass) */
  async function lesen(ctx, c, L) {
    const flagged = new Set();
    const name = ctx.figures[c.fig].name;
    let upto = 0;
    const cnt = h('span', null, '🚩 0');
    const pos = h('span', { class: 'muted small' });
    const chat = chatEl(ctx, c, flagged, (i) => { if (flagged.has(i)) flagged.delete(i); else { flagged.add(i); CREW.sound.play('tick'); } cnt.textContent = '🚩 ' + flagged.size; });
    let stop;
    const done = new Promise((res) => { stop = res; });
    const weiter = CREW.ui.btn('Nächste Nachricht', () => zeige(), { variant: 'ghost', iconRight: 'right', id: 'rf-weiter', big: true });
    const stopp = CREW.ui.btn('Stopp – Zug wählen', () => stop('stopp'), { variant: 'teamB', icon: 'shield', id: 'rf-stopp', big: true });
    const zeige = () => {
      if (upto >= c.msgs.length) return;
      chat.add(upto); upto++;
      pos.textContent = 'Nachricht ' + upto + ' von ' + c.msgs.length;
      if (upto >= c.msgs.length) { weiter.disabled = true; stopp.classList.add('pulse'); }
    };
    zeige();
    ctx.scr([
      h('div', { class: 'rf-layout' }, chat.el,
        h('div', { class: 'stack' },
          ctx.say(L === 2 ? 'Stoppt so früh wie möglich! Seht ihr genug rote Flaggen, drückt Stopp – jede ungelesene Nachricht ist gewonnen.' : 'Lest zusammen. Tippt jede Nachricht an, die eine rote Flagge ist. Stopp geht jederzeit.', { eyebrow: name + ' bekommt eine Nachricht', small: true }),
          h('div', { class: 'rf-count' }, h('b', { class: 'display' }, cnt), pos))),
      h('div', { class: 'row center' }, stopp, weiter),
    ], { eyebrow: 'Chat ' + L + ' · ' + c.name, badge: ctx.stufe(L, LEVELS) });
    if (ctx.auto) {
      // Auto-Modus: weiterlesen, rote Flaggen meist antippen, in Level 2 irgendwann stoppen
      const step = () => {
        if (!weiter.isConnected) return;
        const m = c.msgs[upto - 1];
        if (m && m.flag && ctx.autoRng() < 0.75) { const b = chat.list.querySelector('[data-i="' + (upto - 1) + '"]'); if (b && !b.classList.contains('flagged')) b.click(); }
        if (upto >= c.msgs.length || (L === 2 && upto > 4 && ctx.autoRng() < 0.4)) { stopp.click(); return; }
        weiter.click();
        setTimeout(step, Math.max(30, (window.__crewAutoDelay || 0) / 3));
      };
      setTimeout(step, Math.max(40, window.__crewAutoDelay || 0));
    }
    const r = await ctx.waitFor(done);
    if (r === ctx.SKIP) return null;
    return { upto, flagged, gestoppt: true };
  }

  // Ganzer Chat auf einmal (Level 3), markierte Nachrichten mit Flagge
  function zeigeAlle(ctx, c, flags) {
    const chat = chatEl(ctx, c, new Set(flags), null);
    c.msgs.forEach((m, i) => chat.add(i));
    return chat.el;
  }

  /* Zug wählen: in Reihenfolge antippen, zwei Finger. Rückgabe { folge: [ids], ok } */
  async function zug(ctx, c, L) {
    const folge = [];
    const opts = CREW.seed.shuffle(ZUEGE, CREW.seed.rng(ctx.code, 'rf-zug', c.id));
    const row = h('div', { class: 'rf-zuege' }, opts.map((z) => {
      const b = h('button', { type: 'button', class: 'chip rf-zug', 'data-zug': z.id }, CREW.icon(z.icon, 18), ' ' + z.t, h('span', { class: 'rf-nr' }));
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        const k = folge.indexOf(z.id);
        if (k >= 0) folge.splice(k, 1); else folge.push(z.id);
        row.querySelectorAll('.rf-zug').forEach((x) => { const n = folge.indexOf(x.dataset.zug); x.classList.toggle('sel', n >= 0); x.querySelector('.rf-nr').textContent = n >= 0 ? String(n + 1) : ''; });
      });
      return b;
    }));
    const w = ctx.scr([
      ctx.say('Euer Zug. Tippt in der Reihenfolge, in der ihr es macht. Mehrere sind erlaubt. Dann beide Finger drauf.', { eyebrow: 'Stopp – und dann?', small: true }),
      h('div', { class: 'card stack' }, row, h('p', { class: 'muted small', style: { margin: 0 } }, 'Nochmal tippen nimmt einen Zug wieder raus.')),
    ], { eyebrow: 'Chat ' + L + ' · Zug', badge: ctx.stufe(L, LEVELS) });
    if (ctx.auto) ['screenshot', 'block', 'erwachsen'].forEach((id) => { const b = row.querySelector('[data-zug="' + id + '"]'); if (b) b.click(); });
    if ((await ctx.T.twoFinger(w, { label: 'Beide: Finger drauf', hint: 'Erst Züge antippen, dann zwei Finger.' })) === ctx.SKIP) return null;
    const hat = (id) => folge.includes(id);
    const reihenfolgeOk = !hat('block') || !hat('screenshot') || folge.indexOf('screenshot') < folge.indexOf('block');
    const schlecht = folge.map((id) => ZUEGE.find((z) => z.id === id)).filter((z) => !z.gut);
    const ok = hat('erwachsen') && hat('block') && reihenfolgeOk && !schlecht.length;
    const zeilen = [];
    if (hat('screenshot') && hat('block') && !reihenfolgeOk) zeilen.push({ ok: false, t: 'Erst Screenshot, dann blockieren – sonst ist der Beweis vielleicht weg.' });
    if (!hat('screenshot')) zeilen.push({ ok: false, t: 'Ein Screenshot ist der Beweis. Den braucht die erwachsene Person.' });
    if (!hat('erwachsen')) zeilen.push({ ok: false, t: 'Einer erwachsenen Person zeigen ist kein Petzen. Das ist der stärkste Zug.' });
    if (!hat('block')) zeilen.push({ ok: false, t: 'Blockieren und melden schützt auch die Nächsten, die angeschrieben werden.' });
    schlecht.forEach((z) => zeilen.push({ ok: false, t: z.t + ': ' + z.warum }));
    if (ok) zeilen.unshift({ ok: true, t: 'Starke Reihenfolge: ' + folge.map((id) => ZUEGE.find((z) => z.id === id).t).join(' → ') + '.' });
    CREW.sound.play(ok ? 'great' : 'good');
    const w2 = ctx.scr([
      h('div', { class: 'rf-zug-res' + (ok ? ' ok' : '') }, CREW.icon(ok ? 'shield' : 'bulb', 34), h('h2', null, ok ? 'Sicher gestoppt' : 'Fast – so wird es sicher')),
      h('div', { class: 'stack' }, zeilen.map((z) => h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon(z.ok ? 'check' : 'right', 22), h('span', null, z.t)))),
      ok ? null : h('p', { class: 'muted small' }, 'Die beste Reihenfolge: Screenshot → blockieren und melden → einer erwachsenen Person zeigen.'),
    ], { eyebrow: 'Chat ' + L + ' · Zug', badge: ctx.stufe(L, LEVELS) });
    await ctx.next(w2, 'Weiter');
    return { folge, ok };
  }

  // Flaggen-Bilanz: getroffen, verpasst, extra (extra ist nie schlimm)
  async function bilanz(ctx, c, res, L) {
    const fl = flagCount(c, res.flagged);
    const gesehen = fl.echt.filter((i) => i < res.upto);
    const ungelesen = c.msgs.length - res.upto;
    const w = ctx.scr([
      h('div', { class: 'rf-bilanz' },
        h('div', { class: 'rf-big' }, h('b', { class: 'display' }, fl.getroffen.length + ' / ' + gesehen.length), h('span', null, 'rote Flaggen erkannt')),
        L === 2 ? h('div', { class: 'rf-big good' }, h('b', { class: 'display' }, String(ungelesen)), h('span', null, 'Nachrichten gar nicht erst gelesen')) : null),
      h('div', { class: 'stack' }, gesehen.map((i) => h('div', { class: 'rf-row' + (res.flagged.has(i) ? ' hit' : '') }, h('span', { class: 'rf-row-flag' }, res.flagged.has(i) ? '🚩' : '·'), h('b', null, FLAGGEN[c.msgs[i].flag]), h('span', { class: 'muted small' }, '„' + c.msgs[i].t + '“')))),
      fl.extra.length ? h('p', { class: 'muted small' }, fl.extra.length + '× vorsichtig geflaggt, wo noch alles harmlos war – das ist nie falsch.') : null,
    ], { eyebrow: 'Chat ' + L + ' · Flaggen', badge: ctx.stufe(L, LEVELS) });
    CREW.sound.play('good');
    await ctx.next(w, 'Weiter');
    return { getroffen: fl.getroffen.length, ungelesen };
  }

  CREW.registerGame({
    id: 'red-flag',
    chats: CHATS, zuege: ZUEGE, klasse: KLASSE, // für den Test
    template: 'T3',
    icon: 'shield',
    themen: ['Online-Kontakt mit Fremden', 'Bilder-Druck', 'Digitale Grenzen', 'Hilfe holen'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine fremde Nachricht fängt nett an. Lest zu zweit und tippt jede rote Flagge an. Stopp geht immer – dann wählt ihr euren Zug.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Flaggen finden', text: 'Schmeichelt, Geheimnis, Foto, anderer Kanal …' },
          { icon: 'shield', title: 'Früh stoppen', text: 'Je früher, desto besser.' },
          { icon: 'user', title: 'Nein + Hilfe', text: 'Auch wenn es jemand aus der Klasse ist.' },
        ],
        probe: ctx.T.probeCard('Probe: „Hey, cooles Bild! Sag aber niemandem, dass wir schreiben.“ Rote Flagge? Tippt irgendwas – zählt nicht.', [{ label: '🚩 Rote Flagge', value: 1, variant: 'ghost' }, { label: 'Harmlos', value: 2, variant: 'ghost' }]),
      });
      let flaggen = 0, gewonnen = 0, sicher = 0, neinGehalten = 0;
      for (const c of CHATS) {
        if (c.L === 2) await ctx.T.level({ n: 2, names: LEVELS, text: 'Ein „Teamkollege“ aus einem Spiel. Diesmal zählt: Wie früh stoppt ihr? Jede ungelesene Nachricht ist gewonnen.' });
        const res = await lesen(ctx, c, c.L);
        if (!res) continue;
        const b = await bilanz(ctx, c, res, c.L);
        flaggen += b.getroffen;
        if (c.L === 2) gewonnen += b.ungelesen;
        const z = await zug(ctx, c, c.L);
        if (z && z.ok) sicher++;
      }
      // Level 3: Jemand aus der Klasse – Nein sagen, beim Nein bleiben, Hilfe holen
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt schreibt jemand, den die Figur kennt – aus der Klasse. Auch hier: Ein Nein ist okay. Und Hilfe holen auch.' });
      const sam = ctx.figures[KLASSE.fig].name, von = ctx.figures[KLASSE.von].name;
      const kc = { id: 'klasse', fig: KLASSE.fig, name: von, handle: von.toLowerCase() + '.8b', info: 'Aus der Klasse · in deinen Kontakten', msgs: KLASSE.msgs.slice() };
      const w1 = ctx.scr([
        h('div', { class: 'rf-layout' }, zeigeAlle(ctx, kc, [2]),
          ctx.say('Was antwortet ' + sam + '? Einigt euch. Anker vorher: Füße fest, einmal ausatmen.', { eyebrow: 'Nein sagen', small: true })),
      ], { eyebrow: 'Chat 3 · ' + von, badge: ctx.stufe(3, LEVELS) });
      const a1o = CREW.seed.shuffle(KLASSE.antwort1, CREW.seed.rng(ctx.code, 'rf-a1'));
      const a1 = await ctx.ask(w1, a1o.map((a, i) => ({ label: '„' + a.t + '“', value: i, variant: 'ghost' })), { autoPick: () => a1o.findIndex((a) => a.gut) });
      if (a1 !== ctx.SKIP) {
        const x1 = a1o[a1];
        kc.msgs.push({ who: 'me', t: x1.t }, KLASSE.nach);
        const w2 = ctx.scr([
          h('div', { class: 'rf-layout' }, zeigeAlle(ctx, kc, [2, 4]),
            h('div', { class: 'stack' },
              x1.gut ? h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon('check', 22), h('span', null, 'Klares Nein. ' + von + ' hakt trotzdem nach – das passiert oft.')) : h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon('bulb', 22), h('span', null, x1.warum)),
              ctx.say('Zweites Nein – oder? ' + sam + ' muss sich nicht rechtfertigen.', { eyebrow: 'Nachhaken', small: true }))),
        ], { eyebrow: 'Chat 3 · Nachhaken', badge: ctx.stufe(3, LEVELS) });
        const a2o = CREW.seed.shuffle(KLASSE.antwort2, CREW.seed.rng(ctx.code, 'rf-a2'));
        const a2 = await ctx.ask(w2, a2o.map((a, i) => ({ label: '„' + a.t + '“', value: i, variant: 'ghost' })), { autoPick: () => a2o.findIndex((a) => a.gut) });
        if (a2 !== ctx.SKIP) {
          const x2 = a2o[a2];
          if (x2.gut) neinGehalten = 1;
          CREW.sound.play(x2.gut ? 'great' : 'soft');
          const w3 = ctx.scr([
            h('div', { class: 'rf-zug-res' + (x2.gut ? ' ok' : '') }, CREW.icon(x2.gut ? 'shield' : 'heart', 34), h('h2', null, x2.gut ? sam + ' bleibt beim Nein' : 'Das kann passieren')),
            ctx.figureCard({ fig: KLASSE.fig, mood: x2.gut ? 'froh' : 'neutral', text: x2.gut ? 'Ein Foto „nur für mich“ bleibt nie nur bei einer Person. Wer ein Nein nicht akzeptiert, verdient kein Ja.' : x2.warum, eyebrow: x2.gut ? 'Stark' : 'Wichtig' }),
            h('div', { class: 'grid two' },
              h('div', { class: 'card stack' }, h('b', null, 'Wenn schon ein Foto unterwegs ist'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Nicht deine Schuld. Nicht allein bleiben: einer erwachsenen Person zeigen oder anonym anrufen. Es gibt Wege, Fotos löschen zu lassen.')),
              h('div', { class: 'card stack' }, h('b', null, 'Klare Grenze'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Intime Fotos von Jugendlichen weiterschicken ist strafbar – für alle, die sie weiterleiten.'))),
            h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Anker vor dem Nein“')),
          ], { eyebrow: 'Chat 3 · Auflösung', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w3, 'Weiter');
        }
      }
      // Hilfe – immer am Ende, groß
      const wH = ctx.scr([
        ctx.say('Wenn euch online so etwas passiert: Ihr habt nichts falsch gemacht. Ihr müsst es nicht allein lösen.', { eyebrow: 'Immer erreichbar' }),
        ctx.helpCard({ title: 'Hilfe bei Online-Kontakten', text: 'Anonym und kostenlos – auch wenn schon etwas passiert ist:' }),
        h('p', { class: 'muted small' }, 'Wenn dich das gerade selbst betrifft: X-Karte oder Hilfe oben. Erfundener Chat, echte Hilfe.'),
      ], { eyebrow: 'Hilfe', center: true });
      await ctx.next(wH, 'Verstanden');
      return {
        summary: sicher === CHATS.length && neinGehalten ? 'Red Flags erkannt, früh gestoppt, beim Nein geblieben. Und Hilfe holen ist der stärkste Zug.' : 'Rote Flaggen sehen, stoppen, Hilfe holen – in dieser Reihenfolge. Nein ist immer erlaubt.',
        stats: [[flaggen, 'rote Flaggen erkannt'], [gewonnen, 'Nachrichten gar nicht gelesen'], [sicher, 'Chats sicher gestoppt'], [neinGehalten, 'Nein gehalten']],
        help: true,
      };
    },
  });
})();
