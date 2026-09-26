/* CREW – App: Startbildschirm, Tages-Session, Antwort-Karte, Solo, Crew-HQ, Lehrermodus.
   Diese Datei wird als LETZTE eingebunden und startet das Spiel. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear, pick, sleep, todayISO, weekday, WEEKDAYS } = CREW.util;
  const ui = CREW.ui;
  const S = CREW.state;
  const SKIP = Symbol('skip');
  CREW.SKIP = SKIP;

  /* ---------- Look ---------- */
  const LOOKS = [
    { id: 'arena', label: 'Arena', desc: 'Dick, bunt, wie ein Handyspiel' },
    { id: 'pixel', label: 'Pixel', desc: 'Retro wie ein altes Arcade-Spiel' },
    { id: 'neon', label: 'Neon', desc: 'Dunkel mit Leuchtfarben' },
  ];
  function applyLook(look) {
    document.getElementById('app').dataset.look = look || S.crew.look || 'arena';
  }

  /* ---------- Teams ---------- */
  const TEAM_A = ['Team Blitz', 'Team Nordlicht', 'Team Tsunami', 'Team Komet', 'Team Frost', 'Team Orbit'];
  const TEAM_B = ['Team Vulkan', 'Team Phoenix', 'Team Magma', 'Team Nova', 'Team Kobra', 'Team Laser'];
  function makeTeams() {
    return { A: { id: 'A', name: pick(TEAM_A), cls: 'teamA' }, B: { id: 'B', name: pick(TEAM_B), cls: 'teamB' } };
  }

  /* ---------- Laufzeit ---------- */
  let run = null; // aktuelle Session { token, skipWaiter, inMission }
  let tokenCounter = 0;

  class Abort extends Error {}

  /* ---------- Kopfzeile ---------- */
  function renderTopbar() {
    const bar = document.getElementById('topbar');
    clear(bar);
    const li = CREW.levelInfo(S.energy);
    const fill = h('i', { style: { width: li.pct + '%' } });
    CREW.util.append(bar, [
      h('button', { type: 'button', class: 'crew-badge', style: { background: 'none', border: 0, color: 'inherit', padding: 0, cursor: 'pointer' }, onclick: () => goHome(), 'aria-label': 'Zum Start' },
        h('span', { class: 'logo', html: CREW.LOGO }),
        h('span', { class: 'name' }, S.crew.name || 'CREW')),
      h('div', { class: 'energy-mini', title: 'Crew-Energie' },
        CREW.icon('bolt', 22),
        h('span', { class: 'lvl' }, 'Level ' + li.level),
        h('div', { class: 'bar' }, fill)),
      h('div', { class: 'spacer' }),
      run ? ui.iconBtn(null, onXCard, { text: 'X', cls: 'xcard', label: 'X-Karte: Diese Karte überspringen', id: 'btn-x' }) : null,
      run ? ui.iconBtn('pause', showPause, { label: 'Pause', id: 'btn-pause' }) : null,
      ui.iconBtn(S.settings.speech ? 'speaker' : 'speakerOff', () => { S.settings.speech = !S.settings.speech; CREW.save(); if (!S.settings.speech) CREW.stopSpeaking(); renderTopbar(); ui.toast(S.settings.speech ? 'Vorlesen an' : 'Vorlesen aus'); }, { label: 'Vorlesen an/aus', cls: S.settings.speech ? 'on' : '' }),
      ui.iconBtn('help', showHelp, { label: 'Hilfe', id: 'btn-help' }),
      ui.iconBtn('home', () => goHome(), { label: 'Start', id: 'btn-home' })]);
  }

  async function goHome(force) {
    if (run && run.inMission && !force) {
      const ok = await ui.confirm('Session beenden?', 'Die Mission wird abgebrochen. Energie aus dieser Runde gibt es dann nicht.', 'Beenden', 'Weiterspielen');
      if (!ok) return;
    }
    endRun();
    renderHome();
  }
  function endRun() {
    if (run) { run.token = -1; if (run.abort) run.abort(); }
    run = null;
    CREW.stopSpeaking();
    renderTopbar();
  }

  /* X-Karte: jederzeit ohne Begründung überspringen */
  function onXCard() {
    if (run && run.skipWaiter) {
      const w = run.skipWaiter;
      run.skipWaiter = null;
      ui.toast('Übersprungen. Alles gut.');
      w(SKIP);
    } else {
      ui.toast('Okay, wir machen einfach weiter.');
    }
  }

  /* Pause mit Atemkreis */
  function showPause() {
    CREW.stopSpeaking();
    const circle = h('div', { style: { width: 'min(46vmin, 320px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, var(--good) 0%, color-mix(in srgb, var(--good) 30%, transparent) 70%)', border: 'var(--bw) solid var(--line)', animation: 'breathe 10s ease-in-out infinite' } });
    const label = h('div', { class: 'display', style: { fontSize: '2em' } }, 'Einatmen …');
    let phase = 0;
    const iv = setInterval(() => { phase = 1 - phase; label.textContent = phase ? 'Ausatmen …' : 'Einatmen …'; }, 5000);
    const ov = h('div', { class: 'overlay', style: { background: 'color-mix(in srgb, var(--bg) 94%, transparent)' } },
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center', gap: '28px' } },
        h('span', { class: 'eyebrow' }, 'Pause'),
        circle, label,
        h('p', { class: 'muted' }, 'Kurz durchatmen. Das Spiel wartet.'),
        ui.btn('Weiter', () => { clearInterval(iv); ov.remove(); }, { big: true, icon: 'play' })));
    ui.overlays().appendChild(ov);
  }

  /* Hilfe: immer erreichbar */
  function showHelp() {
    const nums = [
      ['Kanner- a Jugendtelefon', '116 111', 'anonym und kostenlos'],
      ['BEE SECURE Helpline', '8002 1234', 'bei Problemen im Internet'],
      ['Notruf', '112', 'wenn jemand in Gefahr ist'],
      ['Polizei', '113', ''],
    ];
    const body = h('div', { class: 'stack' },
      h('p', { class: 'lead' }, 'Wenn dich etwas belastet: Sprich mit einer erwachsenen Person, der du vertraust. Zum Beispiel hier in der Annexe.'),
      h('div', { class: 'list' }, nums.map(([n, t, d]) => h('div', { class: 'li' }, h('div', null, h('b', null, n), d ? h('div', { class: 'muted small' }, d) : null), h('span', { class: 'display selectable', style: { fontSize: '1.4em' } }, t)))),
      h('p', { class: 'muted small' }, 'X-Karte: Mit dem X oben rechts darfst du jede Karte überspringen. Ohne Begründung.'));
    ui.modal({ title: 'Hilfe', body, actions: [{ label: 'Schließen', value: true }] });
  }

  /* ---------- Startbildschirm ---------- */
  function renderHome() {
    applyLook();
    renderTopbar();
    if (!S.crew.founded) return renderFounding();
    const li = CREW.levelInfo(S.energy);
    const wd = weekday();
    const m = missionForToday();
    const playedToday = S.history.some((x) => x.date === todayISO());
    ui.screen([
      h('div', { class: 'stack enter', style: { gap: '6px', paddingTop: '8px' } },
        h('span', { class: 'eyebrow' }, 'Moien! Heute ist ' + WEEKDAYS[wd]),
        h('h1', { class: 'outline-text' }, S.crew.name || 'CREW')),
      h('div', { class: 'grid two enter-2' },
        tile({ hero: true, icon: 'play', title: playedToday ? 'Noch eine Session' : 'Crew-Session starten', sub: m ? 'Heute: ' + m.title + ' · ca. 10 Minuten' : 'ca. 10 Minuten', onClick: startSession, id: 'tile-session' }),
        tile({ icon: 'phone', title: 'Antwort-Karte', sub: 'Auf dem eigenen iPad: Zahl, Wetter, Ja/Nein … hochhalten', onClick: renderPaddle, id: 'tile-paddle' })),
      h('div', { class: 'grid three enter-3' },
        tile({ icon: 'leaf', title: 'Alleine spielen', sub: 'Chillen und trainieren', onClick: renderSoloHub, id: 'tile-solo' }),
        tile({ icon: 'base', title: 'Crew-HQ', sub: li.max ? 'Voll ausgebaut!' : 'Level ' + li.level + ' · noch ' + li.toNext + ' Energie bis Level ' + (li.level + 1), onClick: renderBase, id: 'tile-base' }),
        tile({ icon: 'lock', title: 'Lehrkraft', sub: 'Missionen, Einstellungen, Fortschritt', onClick: renderTeacherGate, id: 'tile-teacher' })),
    ]);
  }
  function tile(o) {
    const t = h('button', { type: 'button', class: 'tile' + (o.hero ? ' hero' : ''), id: o.id },
      h('span', { class: 't-icon' }, CREW.icon(o.icon, 30)),
      h('span', { class: 't-title' }, o.title),
      o.sub ? h('span', { class: 't-sub' }, o.sub) : null);
    t.addEventListener('click', () => { CREW.sound.play('tap'); o.onClick(); });
    return t;
  }

  /* ---------- Crew gründen (erster Start) ---------- */
  const NAME_A = ['Die Nachtfalken', 'Crew Zero', 'Die Unaufhaltbaren', 'Team Turbo', 'Die Wölfe', 'Squad 404', 'Die Legenden', 'Crew Galaxy', 'Die Phantome', 'Neon Crew', 'Die Rebellen', 'Crew Titan'];
  async function renderFounding() {
    let look = S.crew.look || 'arena';
    let names = CREW.util.shuffle(NAME_A).slice(0, 3);
    let chosen = null;
    const draw = () => {
      applyLook(look);
      const nameRow = h('div', { class: 'row' }, names.map((n) => {
        const c = h('button', { type: 'button', class: 'chip' + (chosen === n ? ' sel' : '') }, n);
        c.addEventListener('click', () => { CREW.sound.play('tap'); chosen = n; input.value = ''; draw(); });
        return c;
      }), ui.iconBtn('shuffle', () => { names = CREW.util.shuffle(NAME_A).slice(0, 3); draw(); }, { label: 'Neue Vorschläge' }));
      const input = h('input', { type: 'text', id: 'crew-name', maxlength: '24', placeholder: 'oder eigenen Crew-Namen eintippen (ohne echte Namen)', value: chosen && !names.includes(chosen) ? chosen : '' });
      input.addEventListener('input', () => { chosen = input.value.trim() || null; });
      const lookRow = h('div', { class: 'grid three' }, LOOKS.map((L) => {
        const t = h('button', { type: 'button', class: 'tile' + (look === L.id ? ' hero' : ''), 'data-look': L.id },
          h('span', { class: 't-title' }, L.label), h('span', { class: 't-sub' }, L.desc));
        t.addEventListener('click', () => { CREW.sound.play('tap'); look = L.id; draw(); });
        return t;
      }));
      ui.screen([
        h('div', { class: 'stack enter' }, h('span', { class: 'eyebrow' }, 'Neue Crew'), h('h1', { class: 'outline-text' }, 'Gründet eure Crew'),
          h('p', { class: 'lead muted' }, 'Stimmt gemeinsam ab. Die Lehrkraft kann alles später im Lehrermodus ändern.')),
        h('div', { class: 'card stack enter-2' }, h('h3', null, '1. Wie heißt eure Crew?'), nameRow, input),
        h('div', { class: 'card stack enter-3' }, h('h3', null, '2. Welcher Look?'), h('p', { class: 'muted small' }, 'Tippt die Looks an, um sie auszuprobieren.'), lookRow),
        h('div', { class: 'row end' }, ui.btn('Crew gründen', async () => {
          const name = (input.value.trim() || chosen || '').slice(0, 24);
          if (!name) { ui.toast('Wählt zuerst einen Namen.'); return; }
          S.crew.name = name; S.crew.look = look; S.crew.founded = true; CREW.save();
          CREW.sound.play('unlock'); ui.confetti();
          renderHome();
        }, { big: true, icon: 'check', id: 'btn-found' })),
      ]);
    };
    draw();
  }

  /* ---------- Missionen ---------- */
  function activeMissions() {
    return CREW.missions.filter((m) => !S.settings.disabled.includes(m.id));
  }
  function missionForToday() {
    const wd = weekday();
    const ms = activeMissions();
    return ms.find((m) => m.day === wd) || null;
  }

  /* Kontext, den jede Mission bekommt */
  function makeCtx(mission, crewSize) {
    const token = run.token;
    const alive = () => run && run.token === token;
    const ctx = {
      SKIP,
      mission,
      crewSize,
      teams: makeTeams(),
      h, ui, sound: CREW.sound, speak: CREW.speak, icon: CREW.icon, util: CREW.util,
      state: S,
      pick: (pool, n, filter) => CREW.pickContent(pool, n, filter),
      alive,
      // Bildschirm neu aufbauen (bricht ab, wenn die Session beendet wurde)
      screen(children, opts) {
        if (!alive()) throw new Abort();
        return ui.screen(children, opts);
      },
      // Auf eine Eingabe warten; X-Karte liefert ctx.SKIP
      waitFor(promise) {
        if (!alive()) return Promise.reject(new Abort());
        return new Promise((resolve, reject) => {
          run.skipWaiter = resolve;
          run.abort = () => reject(new Abort());
          Promise.resolve(promise).then((v) => {
            if (run && run.skipWaiter === resolve) run.skipWaiter = null;
            resolve(v);
          }, reject);
        });
      },
      sleep: (ms) => sleep(ms).then(() => { if (!alive()) throw new Abort(); }),
    };
    return ctx;
  }

  /* ---------- Session-Ablauf ---------- */
  async function startSession(forcedMission) {
    endRun();
    run = { token: ++tokenCounter, skipWaiter: null, inMission: false };
    renderTopbar();
    try {
      // 1) Wer ist da?
      const size = await askCrewSize();
      // 2) Check-in
      const checkin = await doCheckin(size);
      // 3) Mission wählen
      const mission = forcedMission || (await chooseMission());
      if (!mission) return goHome(true);
      // 4) Mission spielen
      run.inMission = true;
      const ctx = makeCtx(mission, size);
      const result = (await mission.run(ctx)) || {};
      run.inMission = false;
      // 5) Nachbesprechung
      await doDebrief(mission, ctx);
      // 6) Energie & Belohnung
      await finish(mission, result, checkin);
    } catch (e) {
      if (e instanceof Abort) return;
      console.error(e);
      ui.screen([h('div', { class: 'card stack' }, h('h2', null, 'Ups, da ist etwas schiefgelaufen.'), h('p', { class: 'muted' }, String(e && e.message || e)), ui.btn('Zum Start', () => goHome(true)))]);
      endRun();
    }
  }

  function guard() { if (!run) throw new Abort(); return run.token; }

  async function askCrewSize() {
    const t = guard();
    const st = ui.stepper({ value: S.lastCrewSize || 5, min: 2, max: 10 });
    const wrap = ui.screen([
      h('div', { class: 'stack enter' }, h('span', { class: 'eyebrow' }, 'Crew-Session'), h('h1', { class: 'outline-text' }, 'Moien Crew!')),
      h('div', { class: 'card stack enter-2', style: { alignItems: 'center', textAlign: 'center' } },
        h('h3', null, 'Wie viele spielen heute mit?'), st.el),
    ], { narrow: true });
    await run_wait(ui.next(wrap, 'Los geht’s', { variant: '' }), t);
    S.lastCrewSize = st.get(); CREW.save();
    return st.get();
  }
  function run_wait(p, t) {
    return new Promise((res, rej) => {
      run.abort = () => rej(new Abort());
      p.then((v) => { if (!run || run.token !== t) rej(new Abort()); else res(v); });
    });
  }

  /* Check-in: Inneres Wetter, anonym */
  async function doCheckin(size) {
    const t = guard();
    const wx = CREW.WEATHER;
    const legend = h('div', { class: 'grid three' }, wx.map((w) => h('div', { class: 'card soft row', style: { flexWrap: 'nowrap' } }, CREW.weatherIcon(w.id, 60), h('div', null, h('b', null, w.label), h('div', { class: 'muted small' }, w.hint)))));
    const wrap = ui.screen([
      h('div', { class: 'row between enter' }, h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Check-in · 1 Minute'), h('h2', null, 'Wie ist dein inneres Wetter?')), ui.paddleHint('wetter')),
      h('p', { class: 'lead muted enter-2' }, 'Stellt es geheim auf eurer Antwort-Karte ein. Oder zeigt es mit der Hand. Niemand muss etwas erklären.'),
      h('div', { class: 'enter-2' }, legend),
    ]);
    const r = await run_wait(ui.choice(wrap, [{ label: 'Überspringen', value: 'skip', variant: 'ghost' }, { label: 'Alle bereit', value: 'go', iconRight: 'right' }]), t);
    if (r === 'skip') return { skipped: true };
    await ui.threeTwoOne('Zeigt her!');
    // Lehrkraft zählt, was gezeigt wird
    const ta = ui.tally(wx.map((w) => ({ id: w.id, label: w.label, icon: CREW.weatherIcon(w.id, 56) })), { max: size });
    const w2 = ui.screen([
      h('div', { class: 'stack' }, h('span', { class: 'eyebrow' }, 'Check-in'), h('h2', null, 'Was zeigt die Crew?')),
      h('p', { class: 'muted' }, 'Tippt kurz mit, wie oft welches Wetter gezeigt wird. Namen werden nicht gespeichert.'),
      ta.el,
    ]);
    await run_wait(ui.next(w2, 'Crew-Wetter anzeigen'), t);
    const counts = ta.get();
    const stormy = (counts.regen || 0) + (counts.gewitter || 0);
    const sunny = (counts.sonne || 0) + (counts.wolkig || 0);
    let line;
    if (!ta.total()) line = 'Danke fürs Mitmachen.';
    else if (stormy === 0 && sunny >= ta.total() / 2) line = 'Gute Aussichten heute. Nutzt die Energie!';
    else if (stormy >= Math.max(2, ta.total() / 2)) line = 'Heute ist bei einigen Sturm. Wir nehmen Rücksicht aufeinander.';
    else if (stormy > 0) line = 'Nicht bei allen scheint die Sonne. Das ist okay. Wir nehmen Rücksicht.';
    else line = 'Gemischtes Wetter. Ganz normal für eine Crew.';
    const board = h('div', { class: 'row center', style: { gap: '18px' } }, wx.filter((w) => counts[w.id]).map((w) =>
      h('div', { class: 'stack pop', style: { alignItems: 'center', gap: '4px' } }, CREW.weatherIcon(w.id, 96), h('span', { class: 'display', style: { fontSize: '2em' } }, '× ' + counts[w.id]))));
    CREW.sound.play('reveal');
    const w3 = ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'eyebrow' }, 'Crew-Wetter'), h('h2', null, line)),
      board,
    ], { center: true });
    const opts = [{ label: 'Zur Mission', value: 'go', iconRight: 'right' }];
    if (stormy > 0) opts.unshift({ label: '1 Minute runterkommen', value: 'chill', variant: 'good', icon: 'leaf' });
    const r2 = await run_wait(ui.choice(w3, opts), t);
    if (r2 === 'chill') await miniBreathing(t);
    return { skipped: false, counts };
  }

  async function miniBreathing(t) {
    const circle = h('div', { style: { width: 'min(40vmin, 300px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, var(--good) 0%, color-mix(in srgb, var(--good) 25%, transparent) 70%)', border: 'var(--bw) solid var(--line)', animation: 'breathe 10s ease-in-out infinite' } });
    const label = h('div', { class: 'display', style: { fontSize: '2.2em' } }, 'Einatmen …');
    const wrap = ui.screen([h('span', { class: 'eyebrow' }, 'Gemeinsam atmen'), circle, label, h('p', { class: 'muted' }, 'Folgt dem Kreis. Sechs Atemzüge.')], { center: true });
    for (let i = 0; i < 6; i++) {
      label.textContent = 'Einatmen …'; CREW.sound.play('breatheIn');
      await sleep(5000); if (!run || run.token !== t) throw new Abort();
      label.textContent = 'Ausatmen …'; CREW.sound.play('breatheOut');
      await sleep(5000); if (!run || run.token !== t) throw new Abort();
    }
    await run_wait(ui.next(wrap, 'Weiter'), t);
  }

  async function chooseMission() {
    const t = guard();
    const ms = activeMissions();
    let m = missionForToday();
    if (!ms.length) {
      ui.screen([h('div', { class: 'card' }, h('h2', null, 'Keine Mission aktiv.'), h('p', null, 'Im Lehrermodus Missionen einschalten.'))]);
      await sleep(1500);
      return null;
    }
    for (;;) {
      if (!m) m = await pickMissionList(ms, t);
      const wrap = ui.screen([
        h('div', { class: 'stack enter', style: { alignItems: 'center', textAlign: 'center' } },
          h('span', { class: 'eyebrow' }, 'Mission des Tages'),
          h('h1', { class: 'outline-text' }, m.title),
          m.tagline ? h('p', { class: 'lead' }, m.tagline) : null,
          h('div', { class: 'row center' }, h('span', { class: 'pill accent' }, 'ca. ' + (m.minutes || 7) + ' Min'), (m.themes || []).slice(0, 3).map((x) => h('span', { class: 'pill' }, x)))),
      ], { center: true });
      const r = await run_wait(ui.choice(wrap, [{ label: 'Andere Mission', value: 'other', variant: 'ghost', icon: 'shuffle' }, { label: 'Start!', value: 'go', iconRight: 'play' }]), t);
      if (r === 'go') return m;
      m = null;
    }
  }
  function pickMissionList(ms, t) {
    return run_wait(new Promise((resolve) => {
      ui.screen([
        h('div', { class: 'stack' }, h('span', { class: 'eyebrow' }, 'Mission wählen'), h('h2', null, 'Worauf habt ihr Lust?')),
        h('div', { class: 'grid two' }, ms.map((m) => {
          const t2 = h('button', { type: 'button', class: 'tile', 'data-mission': m.id },
            h('span', { class: 't-title' }, m.title),
            h('span', { class: 't-sub' }, (m.tagline || '') + (m.day ? ' · sonst ' + WEEKDAYS[m.day] : '')));
          t2.addEventListener('click', () => { CREW.sound.play('tap'); resolve(m); });
          return t2;
        })),
      ]);
    }), t);
  }

  /* Nachbesprechung: kurz, freiwillig */
  async function doDebrief(mission, ctx) {
    const t = guard();
    const qs = mission.debrief && mission.debrief.length ? mission.debrief : ['Was nehmt ihr aus der Runde mit?'];
    let q = pick(qs);
    const card = ui.say(q, { eyebrow: 'Kurz drüber reden' });
    const tm = ui.timer(90, { autostart: false });
    const wrap = ui.screen([
      card,
      h('div', { class: 'row between' },
        h('p', { class: 'muted', style: { maxWidth: '46ch' } }, 'Wer will, sagt etwas. Passen ist erlaubt. Die Lehrkraft moderiert.'),
        h('div', { class: 'row' }, tm.el, ui.btn('Timer', () => tm.start(), { variant: 'ghost', small: true, icon: 'timer' }))),
    ]);
    for (;;) {
      const r = await run_wait(ui.choice(wrap, [{ label: 'Andere Frage', value: 'other', variant: 'ghost', icon: 'shuffle' }, { label: 'Fertig', value: 'done', iconRight: 'right' }]), t);
      if (r === 'done') break;
      const rest = qs.filter((x) => x !== q);
      q = rest.length ? pick(rest) : q;
      card.querySelector('.say').textContent = q;
      wrap.lastChild.remove();
    }
    tm.stop();
  }

  async function finish(mission, result, checkin) {
    const t = guard();
    const base = Math.max(2, Math.min(12, Math.round(result.energy || 5)));
    const bonus = checkin && !checkin.skipped ? 2 : 0;
    const gained = base + bonus;
    const before = CREW.levelInfo(S.energy);
    S.energy += gained;
    S.history.push({ date: todayISO(), mission: mission.id, energy: gained });
    if (S.history.length > 400) S.history = S.history.slice(-400);
    CREW.save();
    const after = CREW.levelInfo(S.energy);
    const num = h('span', { class: 'display', style: { fontSize: '4em', color: 'var(--yellow)' } }, '0');
    const bar = h('i', { style: { width: before.pct + '%' } });
    const wrap = ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
        h('span', { class: 'eyebrow' }, 'Mission geschafft'),
        h('h2', null, result.summary || 'Stark gespielt, Crew!'),
        h('div', { class: 'row center' }, CREW.icon('bolt', 54), num, h('span', { class: 'display', style: { fontSize: '1.6em' } }, 'Energie')),
        bonus ? h('span', { class: 'pill good' }, '+' + bonus + ' Check-in-Bonus') : null),
      h('div', { class: 'card stack' },
        h('div', { class: 'row between' }, h('b', null, 'Crew-HQ Level ' + after.level), h('span', { class: 'muted' }, after.max ? 'Maximal ausgebaut' : 'noch ' + after.toNext + ' bis Level ' + (after.level + 1))),
        h('div', { class: 'progress' }, bar)),
    ], { center: true, narrow: true });
    CREW.sound.play('good');
    await ui.countUp(num, 0, gained, 900);
    renderTopbar();
    requestAnimationFrame(() => { bar.style.width = (after.level > before.level ? 100 : after.pct) + '%'; });
    await sleep(1100);
    if (after.level > before.level) {
      await showUnlock(after.level);
    }
    const r = await run_wait(ui.choice(wrap, [{ label: 'Crew-HQ ansehen', value: 'base', variant: 'ghost', icon: 'base' }, { label: 'Bis morgen!', value: 'home', iconRight: 'home' }]), t);
    endRun();
    if (r === 'base') renderBase(); else renderHome();
  }

  async function showUnlock(level) {
    CREW.sound.play('unlock');
    ui.confetti(200);
    const item = CREW.base && CREW.base.items ? CREW.base.items[level - 1] : null;
    const preview = CREW.base && CREW.base.renderScene ? CREW.base.renderScene(level, { highlight: level }) : null;
    await ui.modal({
      title: 'Level ' + level + ' freigeschaltet!',
      body: h('div', { class: 'stack' },
        preview ? h('div', { style: { borderRadius: 'var(--radius)', overflow: 'hidden', border: 'var(--bw) solid var(--line)' } }, preview) : null,
        h('p', { class: 'lead' }, item ? 'Neu im Crew-HQ: ' + item.name + '. ' + (item.desc || '') : 'Euer Crew-HQ wird größer.')),
      actions: [{ label: 'Stark!', value: true, icon: 'star' }],
      dismissable: false,
    });
  }

  /* ---------- Antwort-Karte (Schüler-iPad) ---------- */
  function renderPaddle(startTab) {
    endRun();
    let tab = startTab || CREW.store.get('paddleTab', 'zahl');
    let sel = null;
    let hidden = false;
    const tabs = [
      ['wetter', 'Wetter'], ['zahl', 'Zahl 0–10'], ['janein', 'Ja / Nein'], ['abcd', 'A B C D'], ['team', 'Team'], ['emo', 'Gefühl'],
    ];
    const EMO = ['Wut', 'Angst', 'Trauer', 'Freude', 'Scham', 'Stolz', 'Ekel', 'Überraschung'];
    const colorFor = (v) => ({ Ja: 'var(--good)', Nein: 'var(--teamB)', A: 'var(--teamA)', B: 'var(--teamB)', C: 'var(--good)', D: 'var(--yellow)', 'Team A': 'var(--teamA)', 'Team B': 'var(--teamB)' }[v] || 'var(--yellow)');
    const draw = () => {
      const tabRow = h('div', { class: 'paddle-tabs' }, tabs.map(([id, label]) => {
        const c = h('button', { type: 'button', class: 'chip' + (tab === id ? ' sel' : ''), 'data-tab': id }, label);
        c.addEventListener('click', () => { CREW.sound.play('tap'); tab = id; sel = null; CREW.store.set('paddleTab', id); draw(); });
        return c;
      }));
      let grid;
      const choose = (v) => { sel = v; CREW.sound.play('tap'); draw(); };
      const mk = (v, label, extra) => {
        const b = ui.btn(label || String(v), () => choose(v), { variant: 'ghost', cls: sel === v ? 'sel' : '', silent: true });
        if (extra) b.prepend(extra);
        return b;
      };
      if (tab === 'zahl') grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))' } }, Array.from({ length: 11 }, (_, i) => mk(i)));
      else if (tab === 'wetter') grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' } }, CREW.WEATHER.map((w) => { const b = mk(w.id, w.label); b.style.flexDirection = 'column'; b.prepend(CREW.weatherIcon(w.id, 64)); return b; }));
      else if (tab === 'janein') grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: '1fr 1fr' } }, mk('Ja'), mk('Nein'));
      else if (tab === 'abcd') grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: '1fr 1fr' } }, ['A', 'B', 'C', 'D'].map((x) => mk(x)));
      else if (tab === 'team') grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: '1fr 1fr' } }, mk('Team A'), mk('Team B'));
      else grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' } }, EMO.map((x) => mk(x)));
      const status = sel == null
        ? h('p', { class: 'muted' }, 'Wähle deine Antwort. Wenn es heißt „Zeigt her!“, tippe auf ZEIGEN und halte das iPad hoch.')
        : h('div', { class: 'row between' },
            h('div', { class: 'row' }, h('span', { class: 'muted' }, 'Deine Wahl:'), h('b', { class: 'display', style: { fontSize: '1.6em' } }, hidden ? '• • •' : labelOf(sel))),
            h('div', { class: 'row' },
              ui.iconBtn(hidden ? 'eye' : 'eyeOff', () => { hidden = !hidden; draw(); }, { label: hidden ? 'Wahl anzeigen' : 'Wahl verdecken' }),
              ui.btn('Zeigen', showBig, { big: true, variant: 'good', icon: 'eye', id: 'btn-show' })));
      ui.screen([h('div', { class: 'paddle' },
        h('div', { class: 'row between' }, h('h2', null, 'Antwort-Karte'), h('span', { class: 'muted small' }, 'Wird nirgends gespeichert.')),
        tabRow, h('div', { class: 'paddle-body' }, grid, status))]);
    };
    const labelOf = (v) => { if (tab === 'wetter') { const w = CREW.WEATHER.find((x) => x.id === v); return w ? w.label : v; } return String(v); };
    function showBig() {
      CREW.sound.play('reveal');
      const color = tab === 'zahl' ? 'var(--yellow)' : colorFor(sel);
      const content = tab === 'wetter' ? CREW.weatherIcon(sel, Math.min(innerWidth, innerHeight) * 0.5) : h('div', { class: 'answer' + (String(labelOf(sel)).length > 3 ? ' wordy' : ''), style: { color } }, labelOf(sel));
      const ov = h('div', { class: 'paddle-show', style: { background: 'var(--bg)' } },
        content,
        tab === 'wetter' ? h('div', { class: 'display', style: { fontSize: '2.4em' } }, labelOf(sel)) : null,
        ui.btn('Zurück', () => { ov.remove(); sel = null; hidden = false; draw(); }, { variant: 'ghost', icon: 'left', id: 'btn-paddle-back' }));
      ui.overlays().appendChild(ov);
    }
    draw();
  }

  /* ---------- Alleine spielen ---------- */
  function renderSoloHub() {
    endRun();
    const games = CREW.soloGames;
    ui.screen([
      h('div', { class: 'stack enter' }, h('span', { class: 'eyebrow' }, 'Alleine spielen'), h('h1', { class: 'outline-text' }, 'Solo-Zone'),
        h('p', { class: 'lead muted' }, 'Zum Runterkommen und Trainieren. Nichts davon wird über dich gespeichert.')),
      games.length
        ? h('div', { class: 'grid two enter-2' }, games.map((g) => tile({ icon: g.icon || 'star', title: g.title, sub: g.desc, onClick: () => startSolo(g), id: 'solo-' + g.id })))
        : h('div', { class: 'card' }, h('p', null, 'Hier kommen bald Solo-Spiele.')),
    ]);
  }
  async function startSolo(g) {
    endRun();
    run = { token: ++tokenCounter, skipWaiter: null, inMission: false };
    renderTopbar();
    const ctx = makeCtx(g, 1);
    ctx.solo = true;
    ctx.best = (key, value, higherIsBetter) => {
      const k = g.id + ':' + key;
      const cur = S.solo[k];
      const better = cur == null || (higherIsBetter === false ? value < cur : value > cur);
      if (better) { S.solo[k] = value; CREW.save(); }
      return { best: better ? value : cur, isNew: better };
    };
    try {
      await g.run(ctx);
    } catch (e) {
      if (e instanceof Abort) return;
      console.error(e);
    }
    if (!ctx.alive()) return;
    endRun();
    renderSoloHub();
  }

  /* ---------- Crew-HQ ---------- */
  function renderBase() {
    endRun();
    const li = CREW.levelInfo(S.energy);
    const scene = CREW.base && CREW.base.renderScene ? CREW.base.renderScene(li.level) : h('div', { class: 'card', style: { minHeight: '240px', display: 'grid', placeItems: 'center' } }, h('p', { class: 'muted' }, 'Das Crew-HQ wird gerade gebaut …'));
    const items = CREW.base && CREW.base.items ? CREW.base.items : [];
    ui.screen([
      h('div', { class: 'row between enter' },
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Crew-HQ · Saison 1'), h('h1', { class: 'outline-text' }, S.crew.name || 'CREW')),
        h('div', { class: 'stack', style: { alignItems: 'flex-end', gap: '4px' } }, h('span', { class: 'display', style: { fontSize: '2.2em' } }, 'Level ' + li.level), h('span', { class: 'muted' }, S.energy + ' Energie gesammelt'))),
      h('div', { class: 'enter-2', style: { borderRadius: 'var(--radius)', overflow: 'hidden', border: 'var(--bw) solid var(--line)', boxShadow: '0 var(--lift) 0 var(--line)' } }, scene),
      h('div', { class: 'card stack enter-3' },
        h('div', { class: 'row between' }, h('b', null, li.max ? 'Alles freigeschaltet!' : 'Nächstes Level'), h('span', { class: 'muted' }, li.max ? '' : 'noch ' + li.toNext + ' Energie')),
        h('div', { class: 'progress' }, h('i', { style: { width: li.pct + '%' } })),
        items.length ? h('div', { class: 'row', style: { marginTop: '6px' } }, items.map((it, i) => h('span', { class: 'pill' + (i < li.level ? ' good' : ''), title: it.desc || '' }, (i < li.level ? '' : '🔒 ') + it.name))) : null),
    ]);
  }

  /* ---------- Lehrermodus ---------- */
  function renderTeacherGate() {
    endRun();
    let code = '';
    const dots = h('div', { class: 'display', style: { fontSize: '2.6em', letterSpacing: '0.3em', minHeight: '1.2em' } }, '');
    const pad = h('div', { class: 'valuepad', style: { maxWidth: '360px', gridTemplateColumns: 'repeat(3, 1fr)' } });
    const press = (d) => {
      if (d === 'del') code = code.slice(0, -1); else if (code.length < 8) code += d;
      dots.textContent = '•'.repeat(code.length);
      if (code === String(S.settings.pin)) { CREW.sound.play('good'); renderTeacher('missionen'); }
      else if (code.length >= String(S.settings.pin).length && code.length >= 4) { dots.classList.add('shake'); CREW.sound.play('soft'); setTimeout(() => { code = ''; dots.textContent = ''; dots.classList.remove('shake'); }, 450); }
    };
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0'].forEach((d) => pad.appendChild(ui.btn(d === 'del' ? null : d, () => press(d), { variant: 'ghost', icon: d === 'del' ? 'left' : null, aria: d === 'del' ? 'Löschen' : d })));
    ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center' } }, CREW.icon('lock', 48), h('h2', null, 'Lehrermodus'), h('p', { class: 'muted' }, 'PIN eingeben. Am Anfang: 1234. Bitte im Lehrermodus ändern.'), dots, pad),
    ], { center: true });
  }

  function renderTeacher(tab) {
    const tabs = [['missionen', 'Missionen'], ['inhalte', 'Inhalte'], ['einstellungen', 'Einstellungen'], ['fortschritt', 'Fortschritt'], ['anleitung', 'Anleitung']];
    const head = h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('h2', null, 'Lehrermodus'), ui.btn('Schließen', () => renderHome(), { variant: 'ghost', small: true, icon: 'x' })),
      h('div', { class: 'tabs' }, tabs.map(([id, label]) => {
        const c = h('button', { type: 'button', class: 'chip' + (tab === id ? ' sel' : ''), 'data-tab': id }, label);
        c.addEventListener('click', () => { CREW.sound.play('tap'); renderTeacher(id); });
        return c;
      })));
    let body;
    if (tab === 'missionen') body = teacherMissions();
    else if (tab === 'inhalte') body = teacherContent();
    else if (tab === 'einstellungen') body = teacherSettings();
    else if (tab === 'fortschritt') body = teacherProgress();
    else body = teacherGuide();
    ui.screen([head, body]);
  }

  function teacherMissions() {
    const all = CREW.missions.slice().sort((a, b) => (a.day || 9) - (b.day || 9));
    return h('div', { class: 'list' }, all.map((m) => {
      const on = !S.settings.disabled.includes(m.id);
      const toggle = ui.btn(on ? 'An' : 'Aus', () => {
        if (on) S.settings.disabled.push(m.id); else S.settings.disabled = S.settings.disabled.filter((x) => x !== m.id);
        CREW.save(); renderTeacher('missionen');
      }, { variant: on ? 'good' : 'ghost', small: true });
      return h('div', { class: 'li', style: { flexDirection: 'column', alignItems: 'stretch' } },
        h('div', { class: 'row between' },
          h('div', null, h('h3', null, m.title), h('div', { class: 'muted small' }, (m.day ? WEEKDAYS[m.day] : 'frei') + ' · ca. ' + (m.minutes || 7) + ' Min' + (m.etep ? ' · ETEP-Stufe ' + m.etep : ''))),
          h('div', { class: 'row' }, toggle, ui.btn('Jetzt spielen', () => { startSession(m); }, { small: true, icon: 'play' }))),
        m.teacherNote ? h('p', { class: 'small' }, m.teacherNote) : null,
        m.themes ? h('div', { class: 'row' }, m.themes.map((x) => h('span', { class: 'pill' }, x))) : null,
        m.eldib && m.eldib.length ? h('div', { class: 'small muted' }, h('b', null, 'ELDiB-Bezug (Vorschlag): '), m.eldib.map((e) => e.code + ' ' + e.text).join(' · ')) : null);
    }));
  }

  function teacherContent() {
    const pools = Object.entries(CREW.content).filter(([, v]) => Array.isArray(v));
    const sens = ui.btn(S.settings.sensitive ? 'Heikle Karten: AN' : 'Heikle Karten: AUS', () => { S.settings.sensitive = !S.settings.sensitive; CREW.save(); renderTeacher('inhalte'); }, { variant: S.settings.sensitive ? 'yellow' : 'ghost' });
    return h('div', { class: 'stack' },
      h('div', { class: 'card stack' },
        h('div', { class: 'switch' }, h('div', null, h('h3', null, 'Heikle Karten'), h('p', { class: 'muted small' }, 'Karten zu Familie, Geld, Körper, Verlust und ähnlichen Themen sind markiert und standardmäßig aus. Nur einschalten, wenn die Gruppe stabil ist.')), sens)),
      h('div', { class: 'card stack' }, h('h3', null, 'Kartenstapel'),
        h('div', { class: 'list' }, pools.map(([k, v]) => h('div', { class: 'li' }, h('b', null, k), h('span', { class: 'muted' }, v.length + ' Karten · ' + v.filter((x) => x.heikel).length + ' heikel · ' + (S.used[k] || []).length + ' schon gespielt')))),
        ui.btn('Gespielte Karten zurücksetzen', () => { S.used = {}; CREW.save(); ui.toast('Alle Karten wieder frisch.'); renderTeacher('inhalte'); }, { variant: 'ghost', small: true, icon: 'undo' })));
  }

  function teacherSettings() {
    const lookRow = h('div', { class: 'row' }, LOOKS.map((L) => ui.btn(L.label, () => { S.crew.look = L.id; CREW.save(); applyLook(); renderTeacher('einstellungen'); }, { variant: S.crew.look === L.id ? 'yellow' : 'ghost', small: true })));
    const nameIn = h('input', { type: 'text', id: 't-crewname', maxlength: '24', value: S.crew.name });
    const pinIn = h('input', { type: 'password', id: 't-pin', inputmode: 'numeric', maxlength: '8', placeholder: 'Neue PIN (4–8 Ziffern)' });
    return h('div', { class: 'stack' },
      h('div', { class: 'card stack' }, h('h3', null, 'Look'), lookRow),
      h('div', { class: 'card stack' }, h('h3', null, 'Crew-Name'), nameIn, h('div', { class: 'row end' }, ui.btn('Speichern', () => { const v = nameIn.value.trim().slice(0, 24); if (v) { S.crew.name = v; CREW.save(); renderTopbar(); ui.toast('Gespeichert.'); } }, { small: true }))),
      h('div', { class: 'card stack' }, h('h3', null, 'Ton & Vorlesen'),
        h('div', { class: 'row' },
          ui.btn(S.settings.sound ? 'Töne: AN' : 'Töne: AUS', () => { S.settings.sound = !S.settings.sound; CREW.save(); renderTeacher('einstellungen'); }, { variant: S.settings.sound ? 'good' : 'ghost', small: true }),
          ui.btn(S.settings.speech ? 'Vorlesen: AN' : 'Vorlesen: AUS', () => { S.settings.speech = !S.settings.speech; CREW.save(); renderTopbar(); renderTeacher('einstellungen'); }, { variant: S.settings.speech ? 'good' : 'ghost', small: true }),
          ui.btn('Vorlesen testen', () => CREW.speak('Moien Crew! So klingt die Vorlesestimme.'), { variant: 'ghost', small: true, icon: 'speaker' }))),
      h('div', { class: 'card stack' }, h('h3', null, 'PIN ändern'), pinIn, h('div', { class: 'row end' }, ui.btn('PIN speichern', () => { const v = pinIn.value.trim(); if (!/^\d{4,8}$/.test(v)) { ui.toast('Bitte 4 bis 8 Ziffern.'); return; } S.settings.pin = v; CREW.save(); pinIn.value = ''; ui.toast('Neue PIN gespeichert.'); }, { small: true }))));
  }

  function teacherProgress() {
    const li = CREW.levelInfo(S.energy);
    const last = S.history.slice(-12).reverse();
    const codeBox = h('textarea', { id: 't-export', readonly: true }, CREW.exportCode());
    const importBox = h('textarea', { id: 't-import', placeholder: 'Sicherungscode hier einfügen …' });
    const copy = () => {
      const txt = codeBox.value;
      const fallback = () => { codeBox.focus(); codeBox.select(); ui.toast('Code markiert. Jetzt kopieren.'); };
      try { navigator.clipboard.writeText(txt).then(() => ui.toast('Code kopiert.'), fallback); } catch (e) { fallback(); }
    };
    const download = () => {
      try {
        const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
        const a = h('a', { href: URL.createObjectURL(blob), download: 'crew-spielstand-' + todayISO() + '.json' });
        document.body.appendChild(a); a.click(); a.remove();
      } catch (e) { ui.toast('Download geht hier nicht. Bitte Code kopieren.'); }
    };
    return h('div', { class: 'stack' },
      h('div', { class: 'card stack' },
        h('div', { class: 'row between' }, h('h3', null, 'Crew-Energie'), h('span', { class: 'display', style: { fontSize: '1.6em' } }, S.energy + ' · Level ' + li.level)),
        h('p', { class: 'muted small' }, 'Gespeichert wird nur: Crew-Name, Look, Energie, gespielte Missionen mit Datum und welche Karten schon dran waren. Keine Namen, keine Antworten einzelner Jugendlicher.'),
        last.length ? h('div', { class: 'list' }, last.map((x) => { const m = CREW.missions.find((mm) => mm.id === x.mission); return h('div', { class: 'li' }, h('span', null, x.date), h('span', null, m ? m.title : x.mission), h('b', null, '+' + x.energy)); })) : h('p', { class: 'muted' }, 'Noch keine Session gespielt.')),
      h('div', { class: 'card stack' }, h('h3', null, 'Sichern'), h('p', { class: 'muted small' }, 'Der Spielstand liegt nur auf diesem Gerät. Zum Übertragen auf ein anderes Gerät: Code kopieren und dort einfügen.'), codeBox,
        h('div', { class: 'row' }, ui.btn('Code kopieren', copy, { small: true, icon: 'copy' }), ui.btn('Als Datei speichern', download, { small: true, variant: 'ghost', icon: 'download' }))),
      h('div', { class: 'card stack' }, h('h3', null, 'Laden'), importBox,
        h('div', { class: 'row' }, ui.btn('Spielstand laden', async () => {
          try { CREW.importCode(importBox.value); applyLook(); renderTopbar(); ui.toast('Spielstand geladen.'); renderTeacher('fortschritt'); } catch (e) { ui.toast(e.message || 'Code ungültig.'); }
        }, { small: true }))),
      h('div', { class: 'card stack' }, h('h3', null, 'Neue Saison'), h('p', { class: 'muted small' }, 'Setzt Energie, Crew-HQ und Crew-Namen zurück. Die PIN bleibt.'),
        h('div', { class: 'row' }, ui.btn('Alles zurücksetzen', async () => {
          const ok = await ui.confirm('Wirklich alles zurücksetzen?', 'Energie, Level, Crew-Name und Verlauf werden gelöscht.', 'Zurücksetzen', 'Abbrechen');
          if (ok) { CREW.resetState(); applyLook(); renderHome(); }
        }, { small: true, variant: 'teamB', icon: 'undo' }))));
  }

  function teacherGuide() {
    const byDay = [1, 2, 3, 4, 5].map((d) => { const m = CREW.missions.find((x) => x.day === d); return h('div', { class: 'li' }, h('b', null, WEEKDAYS[d]), h('span', null, m ? m.title : '–')); });
    const credits = CREW.CREDITS || [];
    return h('div', { class: 'stack' },
      h('div', { class: 'card stack' }, h('h3', null, 'So läuft eine Session (ca. 10 Minuten)'),
        h('ol', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } },
          h('li', null, 'CREW am Beamer oder auf dem Lehrer-iPad öffnen. Die Jugendlichen öffnen auf ihren iPads die „Antwort-Karte“.'),
          h('li', null, 'Check-in (1 Min.): Jede:r stellt geheim das innere Wetter ein. Auf „Zeigt her!“ halten alle gleichzeitig hoch. Du tippst nur die Anzahl mit.'),
          h('li', null, 'Mission des Tages (6–7 Min.): Jeder Wochentag hat ein eigenes Spiel. Mit „Andere Mission“ kannst du tauschen.'),
          h('li', null, 'Kurz drüber reden (1–2 Min.): Eine Frage, freiwillig. Das ist der wichtigste Teil.'),
          h('li', null, 'Energie fließt ins gemeinsame Crew-HQ. Es gibt keine Einzel-Rangliste.'))),
      h('div', { class: 'card stack' }, h('h3', null, 'Wochenplan'), h('div', { class: 'list' }, byDay)),
      h('div', { class: 'card stack' }, h('h3', null, 'Sicherheitsregeln im Spiel'),
        h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } },
          h('li', null, 'X-Karte (oben rechts): Jede:r darf jede Karte ohne Begründung überspringen.'),
          h('li', null, 'Pause-Knopf mit Atemkreis. Hilfe-Knopf mit Kanner- a Jugendtelefon (116 111), BEE SECURE Helpline (8002 1234), Notruf 112, Polizei 113.'),
          h('li', null, 'Heikle Karten sind aus, bis du sie unter „Inhalte“ einschaltest.'),
          h('li', null, 'Gespeichert wird nur auf diesem Gerät, ohne Namen.'))),
      credits.length ? h('div', { class: 'card stack' }, h('h3', null, 'Danke & Lizenzen'), h('ul', { class: 'small', style: { margin: 0, paddingLeft: '1.2em' } }, credits.map((c) => h('li', null, c)))) : null);
  }

  /* ---------- Start ---------- */
  function boot() {
    CREW.missions.sort((a, b) => (a.day || 9) - (b.day || 9));
    applyLook();
    renderHome();
    // Offline-Unterstützung (nur auf der echten Webseite, nicht in der Vorschau)
    try {
      if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude|anthropic/.test(location.hostname)) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      }
    } catch (e) { /* egal */ }
  }

  CREW.app = { renderHome, startSession, renderPaddle, renderSoloHub, renderBase, renderTeacher, goHome, applyLook, LOOKS };
  // Für automatische Tests
  CREW.debug = {
    found(name, look) { S.crew.name = name || 'Test Crew'; S.crew.look = look || 'arena'; S.crew.founded = true; CREW.save(); renderHome(); },
    startMission(id) { const m = CREW.missions.find((x) => x.id === id); if (m) startSession(m); return !!m; },
    startSolo(id) { const g = CREW.soloGames.find((x) => x.id === id); if (g) startSolo(g); return !!g; },
    addEnergy(n) { S.energy += n; CREW.save(); renderTopbar(); },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
