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
        h('span', { class: 'lvl' }, li.level ? 'Level ' + li.level : 'Rohbau'),
        h('div', { class: 'bar' }, fill)),
      h('div', { class: 'spacer' }),
      run ? ui.iconBtn(null, onXCard, { text: 'X', cls: 'xcard', label: 'X-Karte: Diese Karte überspringen', id: 'btn-x' }) : null,
      run ? ui.iconBtn('pause', showPause, { label: 'Pause', id: 'btn-pause' }) : null,
      ui.iconBtn(S.settings.speech ? 'speaker' : 'speakerOff', () => { S.settings.speech = !S.settings.speech; CREW.save(); if (!S.settings.speech) CREW.stopSpeaking(); renderTopbar(); ui.toast(S.settings.speech ? 'Vorlesen an' : 'Vorlesen aus'); }, { label: 'Vorlesen an/aus', cls: S.settings.speech ? 'on' : '' }),
      ui.iconBtn('help', showHelp, { label: 'Hilfe', id: 'btn-help' }),
      ui.iconBtn('home', () => goHome(), { label: 'Start', id: 'btn-home' })]);
  }

  async function goHome(force) {
    if (run && !run.solo && !force) {
      const txt = run.phase === 'after'
        ? ['Zum Start?', 'Die Energie ist schon gespeichert.', 'Zum Start']
        : run.inMission
          ? ['Session beenden?', 'Die Mission wird abgebrochen. Energie aus dieser Runde gibt es dann nicht.', 'Beenden']
          : ['Session abbrechen?', 'Ihr seid noch vor der Mission.', 'Abbrechen'];
      const wasPaused = ui.isPaused();
      ui.setPaused(true);
      const ok = await ui.confirm(txt[0], txt[1], txt[2], 'Weiterspielen');
      if (!ok) { ui.setPaused(wasPaused); return; }
    }
    endRun();
    renderHome();
  }
  function endRun() {
    if (run) {
      run.token = -1;
      if (run.abort) run.abort();
      (run.cleanups || []).forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
    }
    ui.setPaused(false);
    run = null;
    CREW.stopSpeaking();
    renderTopbar();
  }

  /* X-Karte: jederzeit ohne Begründung überspringen.
     Läuft gerade eine Animation, merkt sich das Spiel das X und überspringt die nächste Karte. */
  function onXCard() {
    if (!run) return;
    if (run.skipWaiter) {
      const w = run.skipWaiter;
      run.skipWaiter = null;
      ui.toast('Übersprungen. Alles gut.');
      w(SKIP);
    } else if (run.onX) {
      const f = run.onX;
      run.onX = null;
      ui.toast('Übersprungen. Alles gut.');
      f();
    } else {
      run.pendingSkip = true;
      ui.toast('X-Karte: wird übersprungen.');
    }
  }

  /* Pause mit Atemkreis */
  function showPause() {
    CREW.stopSpeaking();
    ui.setPaused(true);
    const circle = h('div', { style: { width: 'min(46vmin, 320px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, var(--good) 0%, color-mix(in srgb, var(--good) 30%, transparent) 70%)', border: 'var(--bw) solid var(--line)', animation: 'breathe 10s ease-in-out infinite' } });
    const label = h('div', { class: 'display', style: { fontSize: '2em' } }, 'Einatmen …');
    let phase = 0;
    const iv = setInterval(() => { phase = 1 - phase; label.textContent = phase ? 'Ausatmen …' : 'Einatmen …'; }, 5000);
    const ov = h('div', { class: 'overlay', style: { background: 'color-mix(in srgb, var(--bg) 94%, transparent)' } },
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center', gap: '28px' } },
        h('span', { class: 'eyebrow' }, 'Pause'),
        circle, label,
        h('p', { class: 'muted' }, 'Kurz durchatmen. Das Spiel wartet.'),
        ui.btn('Weiter', () => { clearInterval(iv); ov.remove(); ui.setPaused(false); }, { big: true, icon: 'play' })));
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
      h('p', { class: 'muted small' }, 'X-Karte: Mit dem X oben rechts darfst du jede Karte überspringen. Ohne Begründung.'),
      h('p', { class: 'muted small' }, 'Antwort-Karte: Deine Wahl wird nirgends gespeichert.'));
    ui.modal({ title: 'Hilfe', body, actions: [{ label: 'Schließen', value: true }] });
  }

  /* ---------- Crew-Woche & Crew-HQ-Teile ---------- */
  const isoOf = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function weekDays() {
    const d = new Date();
    const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
    return ['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((label, i) => {
      const iso = isoOf(new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i));
      return { label, iso, played: S.history.some((x) => x.date === iso), today: iso === todayISO() };
    });
  }
  function weekPips() {
    const days = weekDays();
    const n = days.filter((d) => d.played).length;
    return h('div', { class: 'week', 'aria-label': 'Crew-Woche: ' + n + ' von 5 Tagen gespielt' },
      h('span', { class: 'eyebrow' }, 'Crew-Woche · ' + n + '/5'),
      h('div', { class: 'week-pips' }, days.map((d) => h('span', { class: 'pip' + (d.played ? ' on' : '') + (d.today ? ' today' : '') }, d.played ? CREW.icon('check', 18) : d.label))));
  }
  // Welche HQ-Teile gehören der Crew? Passt die Liste an das Level an (alte Spielstände, Import, Reset).
  function ownedItems(level) {
    const n = CREW.base && CREW.base.items ? CREW.base.items.length : 12;
    S.hq = S.hq || { owned: [] };
    let own = (S.hq.owned || []).filter((x, i, a) => x >= 1 && x <= n && a.indexOf(x) === i);
    if (own.length > level) own = own.slice(0, level);
    for (let i = 1; own.length < level && i <= n; i++) if (!own.includes(i)) own.push(i);
    if (JSON.stringify(own) !== JSON.stringify(S.hq.owned)) { S.hq.owned = own; CREW.save(); }
    return own;
  }
  // Die zwei Teile, zwischen denen die Crew beim nächsten Level wählt
  function candidates(own) {
    const n = CREW.base && CREW.base.items ? CREW.base.items.length : 12;
    const out = [];
    for (let i = 1; i <= n && out.length < 2; i++) if (!own.includes(i)) out.push(i);
    return out;
  }
  function scene(level, opts) {
    if (!CREW.base || !CREW.base.renderScene) return h('div', { class: 'card', style: { minHeight: '160px' } });
    return CREW.base.renderScene(level, Object.assign({ owned: ownedItems(level) }, opts || {}));
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
    const own = ownedItems(li.level);
    const next = candidates(own);
    const cta = h('button', { type: 'button', class: 'home-cta enter-2', id: 'tile-session', style: m && m.color ? { '--mc': m.color } : null },
      h('span', { class: 'home-cta-ic' }, CREW.icon('play', 34)),
      h('span', { class: 'stack', style: { gap: '2px' } },
        h('span', { class: 'home-cta-t' }, m ? (playedToday ? 'Noch eine Runde: ' : 'Heute: ') + m.title + ' · Los!' : 'Freie Wahl · Los!'),
        h('span', { class: 'home-cta-s' }, m ? (m.tagline || '') : 'Sucht euch eine Mission aus.')));
    cta.addEventListener('click', () => { CREW.sound.play('tap'); startSession(); });
    const unlock = h('button', { type: 'button', class: 'card home-next enter-3', id: 'tile-base' },
      next.length && !li.max
        ? h('div', { class: 'home-ghost' }, scene(li.level, { ghost: next }), h('span', { class: 'home-q' }, '???'))
        : null,
      h('div', { class: 'stack', style: { gap: '6px', flex: '1' } },
        h('b', null, li.max ? 'Crew-HQ voll ausgebaut!' : 'Nächstes HQ-Teil'),
        h('div', { class: 'progress' }, h('i', { style: { width: li.pct + '%' } })),
        h('span', { class: 'muted small' }, li.max ? 'Tippen zum Ansehen.' : 'Noch ' + li.toNext + ' Energie. Ihr wählt, was kommt.')));
    unlock.addEventListener('click', () => { CREW.sound.play('tap'); renderBase(); });
    const hero = h('div', { class: 'home-hero enter' },
      scene(li.level),
      h('div', { class: 'home-hero-txt' },
        h('span', { class: 'eyebrow' }, 'Moien! Heute ist ' + WEEKDAYS[wd]),
        h('h1', { class: 'outline-text' }, S.crew.name || 'CREW')));
    const teacher = ui.btn('Lehrkraft', renderTeacherGate, { variant: 'ghost', small: true, icon: 'lock', id: 'tile-teacher' });
    ui.screen([
      hero,
      cta,
      h('div', { class: 'grid two enter-3' }, h('div', { class: 'card home-week' }, weekPips()), unlock),
      h('div', { class: 'grid two enter-3' },
        tile({ icon: 'leaf', title: 'Solo-Zone', sub: 'Alleine chillen und trainieren', onClick: renderSoloHub, id: 'tile-solo' }),
        tile({ icon: 'phone', title: 'Antwort-Karte', sub: 'Für dein iPad', onClick: renderPaddle, id: 'tile-paddle' })),
      h('div', { class: 'row end' }, teacher),
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
          h('p', { class: 'lead muted' }, 'Stimmt gemeinsam ab. Name und Look gehören der ganzen Crew.')),
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
        // X-Karte wurde während einer Animation gedrückt: diese Karte gleich überspringen
        if (run.pendingSkip) { run.pendingSkip = false; ui.toast('Übersprungen. Alles gut.'); return Promise.resolve(SKIP); }
        return new Promise((resolve, reject) => {
          run.skipWaiter = resolve;
          run.abort = () => reject(new Abort());
          Promise.resolve(promise).then((v) => {
            if (run && run.skipWaiter === resolve) run.skipWaiter = null;
            resolve(v);
          }, reject);
        });
      },
      // Warten, das bei Pause anhält und bei gedrückter X-Karte abkürzt
      async sleep(ms) {
        let left = ms;
        while (left > 0) {
          const step = Math.min(100, left);
          await sleep(step);
          if (!alive()) throw new Abort();
          if (run.pendingSkip) return;
          if (!ui.isPaused()) left -= step;
        }
      },
      // Sitzungs-Uhr: Die ganze Session soll in etwa 10 Minuten passen
      minutesLeft: () => (run && run.startedAt ? 10 - (Date.now() - run.startedAt) / 60000 : 10),
      // Vor jeder weiteren Runde fragen: Reicht die Zeit noch? (false = Mission beenden)
      roundGate(i, total) {
        if (i <= 0 || i === ctx._gateAt) return true; // gleiche Runde nochmal (z. B. nach X-Karte): kein neuer Check
        ctx._gateAt = i;
        if (ctx._lastRound || ctx.minutesLeft() < 3.5) { ui.toast('Zeit ist um. Stark gespielt!'); return false; }
        if (i === total - 1 || ctx.minutesLeft() < 5.5) { ctx._lastRound = true; ui.toast('Letzte Runde!'); }
        return true;
      },
      // Aufräumen (Animationen, Listener), wenn die Session endet oder abgebrochen wird
      onCleanup(fn) { if (run && run.token === token) (run.cleanups = run.cleanups || []).push(fn); },
      isPaused: () => ui.isPaused(),
    };
    return ctx;
  }

  /* ---------- Session-Ablauf ---------- */
  async function startSession(forcedMission) {
    endRun();
    run = { token: ++tokenCounter, skipWaiter: null, inMission: false, phase: 'setup', startedAt: Date.now() };
    renderTopbar();
    try {
      // 1) Wer ist da?
      const size = await askCrewSize();
      // 2) Check-in
      run.phase = 'checkin';
      const checkin = await doCheckin(size);
      // 3) Mission wählen
      run.phase = 'setup';
      const mission = forcedMission || (await chooseMission());
      if (!mission) return goHome(true);
      // 4) Mission spielen
      run.inMission = true;
      run.phase = 'mission';
      const ctx = makeCtx(mission, size);
      const result = (await mission.run(ctx)) || {};
      if (!run || !ctx.alive()) return;
      run.inMission = false;
      run.pendingSkip = false;
      // 5) Energie sofort sichern (auch wenn danach jemand auf „Start“ tippt)
      const gain = commitResult(mission, result, checkin);
      run.phase = 'after';
      // 6) Nachspielzeit
      await doDebrief(mission, ctx);
      // 7) Belohnung zeigen
      await finish(mission, result, gain);
    } catch (e) {
      if (e instanceof Abort) return;
      console.error(e);
      ui.screen([h('div', { class: 'card stack' }, h('h2', null, 'Kurzer Hänger. Zurück zum Start.'), ui.btn('Zum Start', () => goHome(true), { icon: 'home' }))], { center: true, narrow: true });
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
    if (!run || run.token !== t) return Promise.reject(new Abort());
    return new Promise((res, rej) => {
      run.abort = () => rej(new Abort());
      p.then((v) => { if (!run || run.token !== t) rej(new Abort()); else res(v); });
    });
  }

  /* X-Karte während Check-in und Nachspielzeit: löst die Wartestelle mit xValue auf */
  function waitX(p, t, xValue) {
    if (!run || run.token !== t) return Promise.reject(new Abort());
    const r = run;
    return run_wait(new Promise((res) => {
      if (r.pendingSkip) { r.pendingSkip = false; res(xValue); return; }
      r.onX = () => res(xValue);
      p.then(res);
    }), t).finally(() => { if (r.onX) r.onX = null; });
  }

  /* Check-in: Wetter-Check, anonym. Die Karte wird nur zur Lehrkraft gedreht. */
  const FORECAST = {
    sonnig: ['Überwiegend sonnig.', 'Gute Aussichten. Nutzt die Energie!'],
    gemischt: ['Wechselhaft, mal Sonne, mal Wolken.', 'Ganz normal für eine Crew.'],
    sturm: ['Vereinzelt Gewitter.', 'Heißt: Heute wird niemand provoziert.'],
    nebel: ['Dichter Nebel.', 'Wir fahren heute auf Sicht.'],
  };
  async function doCheckin(size) {
    const t = guard();
    const wx = CREW.WEATHER;
    const firstWeek = S.history.length < 5;
    const legend = h('div', { class: 'grid three' }, wx.map((w) => h('div', { class: 'card soft row', style: { flexWrap: 'nowrap' } }, CREW.weatherIcon(w.id, 60), h('div', null, h('b', null, w.label), firstWeek ? h('div', { class: 'muted small' }, w.hint) : null))));
    const wrap = ui.screen([
      h('div', { class: 'row between enter' }, h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Crew-Wetterbericht'), h('h2', null, 'Wetter-Check: Wie ist’s heute bei dir?')), ui.paddleHint('wetter')),
      h('p', { class: 'lead muted enter-2' }, 'Stell es geheim ein. Dreh die Karte nur zur Lehrkraft. Die anderen schauen nach vorn.'),
      h('div', { class: 'enter-2' }, legend),
    ]);
    const r = await waitX(ui.choice(wrap, [{ label: 'Überspringen', value: 'skip', variant: 'ghost' }, { label: 'Alle bereit', value: 'go', iconRight: 'right' }]), t, 'skip');
    if (r === 'skip') return { skipped: true };
    await ui.threeTwoOne('Zur Lehrkraft drehen!');
    if (!run || run.token !== t) throw new Abort();
    // Schnell: ein Tipp für die ganze Crew. Genauer zählen nur, wenn die Lehrkraft will.
    const w2 = ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'eyebrow' }, 'Nur für die Lehrkraft'), h('h2', null, 'Was zeigt die Crew?'), ui.scanBar('Wetter-Scan läuft …')),
    ], { center: true, narrow: true });
    const quick = await waitX(ui.choice(w2, [
      { label: 'Alle eher sonnig', value: 'sonnig', icon: 'star', id: 'wx-sonnig' },
      { label: 'Gemischt', value: 'gemischt', variant: 'yellow', id: 'wx-gemischt' },
      { label: 'Bei einigen Sturm', value: 'sturm', variant: 'teamB', id: 'wx-sturm' },
      { label: 'genauer zählen', value: 'count', variant: 'ghost', id: 'wx-count' },
    ]), t, 'skip');
    if (quick === 'skip') return { skipped: true };
    let kind = quick;
    let counts = null;
    if (quick === 'count') {
      const ta = ui.tally(wx.map((w) => ({ id: w.id, label: w.label, icon: CREW.weatherIcon(w.id, 56) })), { max: size, onFull: () => ui.autoNext('wx-show', () => ta.total() >= size) });
      const w3 = ui.screen([
        h('div', { class: 'row between' }, h('div', { class: 'stack' }, h('span', { class: 'eyebrow' }, 'Nur für die Lehrkraft'), h('h2', null, 'Wetter zählen')), ui.scanBar('Wetter-Scan läuft …')),
        h('p', { class: 'muted' }, 'Tippe auf ein Wetter, einmal pro Karte. Namen werden nicht gespeichert.'),
        ta.el,
      ]);
      const r3 = await waitX(ui.choice(w3, [{ label: 'Crew-Wetter anzeigen', value: 'go', iconRight: 'right', id: 'wx-show' }]), t, 'skip');
      if (r3 === 'skip') return { skipped: true };
      counts = ta.get();
      const stormy = (counts.regen || 0) + (counts.gewitter || 0);
      const sunny = (counts.sonne || 0) + (counts.wolkig || 0);
      kind = !ta.total() ? 'gemischt' : stormy === 0 && sunny >= ta.total() / 2 ? 'sonnig' : stormy > 0 ? 'sturm' : (counts.nebel || 0) >= ta.total() / 2 ? 'nebel' : 'gemischt';
    }
    const icons = { sonnig: ['sonne', 'wolkig'], gemischt: ['wolkig', 'regen', 'sonne'], sturm: ['gewitter', 'regen', 'wolkig'], nebel: ['nebel', 'wolkig'] }[kind].filter((id) => wx.some((w) => w.id === id));
    // Genaue Zahlen nur ab 6 Leuten – sonst zeigt die Zahl auf eine Person
    const exact = counts && size >= 6;
    const shownIcons = counts ? wx.filter((w) => counts[w.id]).map((w) => w.id) : icons;
    const board = h('div', { class: 'row center wx-map' }, shownIcons.map((id, i) =>
      h('div', { class: 'stack pop', style: { alignItems: 'center', gap: '4px', animationDelay: 150 + i * 220 + 'ms' } }, CREW.weatherIcon(id, 96), exact ? h('span', { class: 'display', style: { fontSize: '2em' } }, '× ' + counts[id]) : null)));
    CREW.sound.play('reveal');
    const [head, line] = FORECAST[kind];
    const w4 = ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'eyebrow' }, 'Crew-Wetterbericht'), h('h2', null, head), h('p', { class: 'lead' }, line)),
      board,
    ], { center: true });
    const opts = [{ label: 'Zur Mission', value: 'go', iconRight: 'right' }];
    if (kind === 'sturm') opts.unshift({ label: '1 Minute runterkommen', value: 'chill', variant: 'good', icon: 'leaf' });
    const r2 = await waitX(ui.choice(w4, opts), t, 'go');
    if (r2 === 'chill') await miniBreathing(t);
    return { skipped: false, kind };
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
          h('div', { class: 'row center' }, h('span', { class: 'pill accent' }, 'ca. ' + (m.minutes || 5) + ' Min'), m.hook ? h('span', { class: 'pill' }, m.hook) : null)),
      ], { center: true });
      if (m.color) wrap.style.setProperty('--mc', m.color);
      CREW.sound.play('reveal');
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

  /* Nachspielzeit: kurz, freiwillig */
  async function doDebrief(mission, ctx) {
    const t = guard();
    const qs = mission.debrief && mission.debrief.length ? mission.debrief : ['Was nehmt ihr aus der Runde mit?'];
    let q = pick(qs);
    const card = ui.say(q, { eyebrow: 'Nachspielzeit', speakText: () => q });
    const tm = ui.timer(90, { autostart: false });
    const wrap = ui.screen([
      card,
      h('div', { class: 'row between' },
        h('p', { class: 'muted', style: { maxWidth: '46ch' } }, 'Wer will, sagt was. Passen ist okay.'),
        h('div', { class: 'row' }, tm.el, ui.btn('Timer', () => tm.start(), { variant: 'ghost', small: true, icon: 'timer' }))),
    ]);
    for (;;) {
      const r = await waitX(ui.choice(wrap, [{ label: 'Andere Frage', value: 'other', variant: 'ghost', icon: 'shuffle' }, { label: 'Fertig', value: 'done', iconRight: 'right' }]), t, 'done');
      if (r === 'done') break;
      const rest = qs.filter((x) => x !== q);
      q = rest.length ? pick(rest) : q;
      card.querySelector('.say').textContent = q;
      wrap.lastChild.remove();
    }
    tm.stop();
  }

  /* Energie sofort speichern, direkt nach der Mission */
  function commitResult(mission, result, checkin) {
    const base = Math.max(2, Math.min(12, Math.round(result.energy || 5)));
    const bonus = checkin && !checkin.skipped ? 2 : 0;
    const gained = base + bonus;
    const before = CREW.levelInfo(S.energy);
    ownedItems(before.level);
    S.energy += gained;
    S.history.push({ date: todayISO(), mission: mission.id, energy: gained });
    if (S.history.length > 400) S.history = S.history.slice(-400);
    // Crew-Rekord (nur Crew-Punkte, nie Einzelne)
    let record = null;
    if (typeof result.points === 'number') {
      S.records = S.records || {};
      const old = S.records[mission.id];
      record = { old, isNew: old == null || result.points > old };
      if (record.isNew) S.records[mission.id] = result.points;
    }
    CREW.save();
    return { gained, bonus, before, after: CREW.levelInfo(S.energy), record };
  }

  function nextMissionTeaser() {
    const ms = activeMissions();
    for (let i = 1; i <= 7; i++) {
      const d = (weekday() + i) % 7;
      const m = ms.find((x) => x.day === d);
      if (m) return (i === 1 ? 'Morgen: ' : WEEKDAYS[d] + ': ') + m.title + '. ' + (m.tagline || '');
    }
    return null;
  }

  async function finish(mission, result, gain) {
    const t = guard();
    const { gained, bonus, before, after, record } = gain;
    const alive = () => run && run.token === t;
    const num = h('span', { class: 'display', style: { fontSize: '4em', color: 'var(--yellow)' } }, '0');
    const bar = h('i', { style: { width: before.pct + '%' } });
    const pts = typeof result.points === 'number';
    const teaser = nextMissionTeaser();
    const wrap = ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
        h('span', { class: 'eyebrow' }, 'Mission geschafft'),
        h('h2', null, result.summary || 'Stark gespielt, Crew!'),
        pts ? h('div', { class: 'row center' }, h('span', { class: 'pill' }, result.points + ' Crew-Punkte'), h('span', { class: 'display' }, '→')) : null,
        h('div', { class: 'row center' }, CREW.icon('bolt', 54), num, h('span', { class: 'display', style: { fontSize: '1.6em' } }, 'Energie')),
        h('div', { class: 'row center' },
          bonus ? h('span', { class: 'pill good' }, '+' + bonus + ' Check-in-Bonus') : null,
          record && record.isNew && record.old != null ? h('span', { class: 'pill accent pop' }, 'Crew-Rekord: ' + record.old + ' → NEU: ' + result.points + '!') : null,
          record && !record.isNew ? h('span', { class: 'pill' }, 'Crew-Rekord: ' + record.old + (record.old - result.points <= 3 ? ' · noch ' + (record.old - result.points + 1) + ' bis zum Rekord' : '')) : null),
        (result.stats || []).length ? h('div', { class: 'row center' }, result.stats.map(([n, l]) => h('span', { class: 'pill' }, h('b', null, String(n)), ' ' + l))) : null,
        result.note || null),
      h('div', { class: 'card stack' },
        h('div', { class: 'row between' }, h('b', null, after.level ? 'Crew-HQ Level ' + after.level : 'Crew-HQ · Rohbau'), h('span', { class: 'muted' }, after.max ? 'Maximal ausgebaut' : 'noch ' + after.toNext + ' bis zum nächsten Teil')),
        h('div', { class: 'progress' }, bar),
        weekPips(),
        teaser ? h('p', { class: 'muted small' }, teaser) : null),
    ], { center: true, narrow: true });
    CREW.sound.play('good');
    await ui.countUp(num, 0, gained, 900);
    if (!alive()) return;
    renderTopbar();
    if (record && record.isNew && record.old != null) { CREW.sound.play('great'); ui.confetti(120); }
    requestAnimationFrame(() => { bar.style.width = (after.level > before.level ? 100 : after.pct) + '%'; });
    await sleep(1100);
    if (!alive()) return;
    for (let lv = before.level + 1; lv <= after.level; lv++) {
      await showUnlock(lv);
      if (!alive()) return;
    }
    const r = await run_wait(ui.choice(wrap, [{ label: 'Crew-HQ ansehen', value: 'base', variant: 'ghost', icon: 'base' }, { label: 'Bis morgen!', value: 'home', iconRight: 'home' }]), t);
    endRun();
    if (r === 'base') renderBase(after.level > before.level ? S.hq.owned[S.hq.owned.length - 1] : null); else renderHome();
  }

  /* Level-up: Die Crew wählt zwischen zwei Teilen (Mehrheit auf der Antwort-Karte A/B) */
  async function showUnlock(level) {
    const items = CREW.base && CREW.base.items ? CREW.base.items : [];
    const own = ownedItems(level - 1);
    const cand = candidates(own);
    CREW.sound.play('unlock');
    ui.confetti(200);
    let chosen = cand[0];
    if (cand.length > 1) {
      const card = (n, L) => h('div', { class: 'card stack unlock-cand', style: { alignItems: 'center', textAlign: 'center' } },
        h('span', { class: 'display', style: { fontSize: '2em' } }, L), h('b', null, items[n - 1].name), h('span', { class: 'muted small' }, items[n - 1].desc || ''));
      chosen = await ui.modal({
        title: 'Level ' + level + '! Was kommt ins HQ?',
        body: h('div', { class: 'stack' },
          h('p', { class: 'lead' }, 'Zeigt A oder B auf der Antwort-Karte. Die Mehrheit gewinnt.'),
          h('div', { class: 'grid two' }, card(cand[0], 'A'), card(cand[1], 'B'))),
        actions: [{ label: 'A: ' + items[cand[0] - 1].name, value: cand[0] }, { label: 'B: ' + items[cand[1] - 1].name, value: cand[1], variant: 'teamB' }],
        dismissable: false,
      });
      CREW.sound.play('drum');
    }
    if (chosen && !S.hq.owned.includes(chosen)) { S.hq.owned.push(chosen); CREW.save(); }
    const item = chosen ? items[chosen - 1] : null;
    const preview = CREW.base && CREW.base.renderScene ? CREW.base.renderScene(level, { owned: S.hq.owned.slice(), highlight: chosen }) : null;
    CREW.sound.play('great');
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
    if (tab === 'team') tab = 'zahl';
    let sel = null;
    let hidden = false;
    const tabs = [
      ['wetter', 'Wetter'], ['zahl', 'Zahl 0–10'], ['janein', 'Ja / Nein'], ['abcd', 'A B C D'], ['emo', 'Gefühl'],
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
      else grid = h('div', { class: 'paddle-grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' } }, EMO.map((x) => mk(x)));
      const status = sel == null
        ? h('p', { class: 'muted' }, 'Wähle deine Antwort. Wenn es heißt „Zeigt her!“, tippe auf ZEIGEN und halte das iPad hoch.')
        : h('div', { class: 'row between' },
            h('div', { class: 'row' }, h('span', { class: 'muted' }, 'Deine Wahl:'), h('b', { class: 'display', style: { fontSize: '1.6em' } }, hidden ? '• • •' : labelOf(sel))),
            h('div', { class: 'row' },
              ui.iconBtn(hidden ? 'eye' : 'eyeOff', () => { hidden = !hidden; draw(); }, { label: hidden ? 'Wahl anzeigen' : 'Wahl verdecken' }),
              ui.btn('Zeigen', showBig, { big: true, variant: 'good', icon: 'eye', id: 'btn-show' })));
      ui.screen([h('div', { class: 'paddle' },
        h('div', { class: 'row between' }, h('h2', null, 'Antwort-Karte')),
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
        tab === 'wetter' ? h('div', { class: 'pill accent paddle-private' }, 'Nur zur Lehrkraft zeigen') : null,
        ui.btn('Zurück', () => { ov.remove(); sel = null; hidden = false; draw(); }, { variant: 'ghost', icon: 'left', id: 'btn-paddle-back' }));
      ui.overlays().appendChild(ov);
      const note = ov.querySelector('.paddle-private');
      if (note) setTimeout(() => note.remove(), 5000);
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
    run = { token: ++tokenCounter, skipWaiter: null, inMission: false, solo: true };
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
  function renderBase(highlight) {
    endRun();
    const li = CREW.levelInfo(S.energy);
    const own = ownedItems(li.level);
    const next = candidates(own);
    const items = CREW.base && CREW.base.items ? CREW.base.items : [];
    const main = scene(li.level, typeof highlight === 'number' && own.includes(highlight) ? { highlight } : undefined);
    // Jedes Teil antippen: seine Crew-Regel
    const pills = own.map((n) => {
      const it = items[n - 1];
      const b = h('button', { type: 'button', class: 'chip sel', 'data-item': n }, it.name);
      b.addEventListener('click', () => { CREW.sound.play('tap'); ui.toast(it.name + ': ' + (it.desc || '')); });
      return b;
    });
    const mystery = next.length && !li.max
      ? h('div', { class: 'card stack enter-3 hq-mystery' },
          h('div', { class: 'row between' }, h('b', null, '??? · Nächstes Level'), h('span', { class: 'muted' }, 'noch ' + li.toNext + ' Energie')),
          h('div', { class: 'progress' }, h('i', { style: { width: li.pct + '%' } })),
          h('div', { class: 'home-ghost big' }, scene(li.level, { ghost: next }), h('span', { class: 'home-q' }, '???')),
          h('p', { class: 'muted small' }, next.length > 1 ? 'Zwei Teile warten. Beim nächsten Level wählt ihr eins davon.' : 'Das letzte Teil wartet schon.'))
      : null;
    ui.screen([
      h('div', { class: 'row between enter' },
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Crew-HQ · Saison 1'), h('h1', { class: 'outline-text' }, S.crew.name || 'CREW')),
        h('div', { class: 'stack', style: { alignItems: 'flex-end', gap: '4px' } }, h('span', { class: 'display', style: { fontSize: '2.2em' } }, li.level ? 'Level ' + li.level : 'Rohbau'), h('span', { class: 'muted' }, S.energy + ' Energie gesammelt'))),
      h('div', { class: 'enter-2', style: { borderRadius: 'var(--radius)', overflow: 'hidden', border: 'var(--bw) solid var(--line)', boxShadow: '0 var(--lift) 0 var(--line)', width: '100%', maxWidth: 'max(360px, calc((100dvh - 330px) * 16 / 9))', margin: '0 auto' } }, main),
      h('div', { class: 'card stack enter-3' },
        h('b', null, own.length ? 'Euer HQ · antippen für die Crew-Regel' : 'Noch leer. Die erste Session bringt Licht.'),
        own.length ? h('div', { class: 'row' }, pills) : null),
      mystery,
    ]);
  }

  /* ---------- Lehrermodus ---------- */
  // Falsche PIN: nach 3 Versuchen 30 Sekunden Sperre (gilt bis zum Neuladen der Seite)
  const gate = { fails: 0, lockedUntil: 0 };
  function renderTeacherGate() {
    endRun();
    let code = '';
    const dots = h('div', { class: 'display', style: { fontSize: '2.6em', letterSpacing: '0.3em', minHeight: '1.2em' } }, '');
    const msg = h('p', { class: 'muted', 'aria-live': 'polite' }, 'PIN eingeben.');
    const pad = h('div', { class: 'valuepad', style: { maxWidth: '360px', gridTemplateColumns: 'repeat(3, 1fr)' } });
    const locked = () => Date.now() < gate.lockedUntil;
    const press = (d) => {
      if (locked()) { msg.textContent = 'Gesperrt. Noch ' + Math.ceil((gate.lockedUntil - Date.now()) / 1000) + ' Sekunden.'; return; }
      if (d === 'del') code = code.slice(0, -1); else if (code.length < 8) code += d;
      dots.textContent = '•'.repeat(code.length);
      if (code === String(S.settings.pin)) {
        gate.fails = 0;
        CREW.sound.play('good');
        if (String(S.settings.pin) === '1234') forceNewPin(); else renderTeacher('missionen');
      } else if (code.length >= String(S.settings.pin).length && code.length >= 4) {
        gate.fails++;
        if (gate.fails >= 3) { gate.fails = 0; gate.lockedUntil = Date.now() + 30000; msg.textContent = 'Zu oft falsch. 30 Sekunden warten.'; }
        dots.classList.add('shake'); CREW.sound.play('soft');
        setTimeout(() => { code = ''; dots.textContent = ''; dots.classList.remove('shake'); }, 450);
      }
    };
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0'].forEach((d) => pad.appendChild(ui.btn(d === 'del' ? null : d, () => press(d), { variant: 'ghost', icon: d === 'del' ? 'left' : null, aria: d === 'del' ? 'Löschen' : d })));
    ui.screen([
      h('div', { class: 'stack', style: { alignItems: 'center' } }, CREW.icon('lock', 48), h('h2', null, 'Lehrermodus'), msg, dots, pad),
    ], { center: true });
  }
  // Mit der Start-PIN geht es erst weiter, wenn eine eigene PIN gesetzt ist
  async function forceNewPin() {
    const inp = h('input', { type: 'password', id: 't-newpin', inputmode: 'numeric', maxlength: '8', placeholder: 'Neue PIN (4–8 Ziffern)' });
    const err = h('p', { class: 'muted small', 'aria-live': 'polite' }, 'Die Start-PIN kennen zu viele. Bitte jetzt eine eigene wählen.');
    for (;;) {
      const ok = await ui.modal({ title: 'Eigene PIN festlegen', body: h('div', { class: 'stack' }, err, inp), actions: [{ label: 'Abbrechen', value: false, variant: 'ghost' }, { label: 'PIN speichern', value: true, icon: 'check' }], dismissable: false });
      if (!ok) { renderHome(); return; }
      const v = inp.value.trim();
      if (/^\d{4,8}$/.test(v) && v !== '1234') { S.settings.pin = v; CREW.save(); ui.toast('Neue PIN gespeichert.'); renderTeacher('missionen'); return; }
      err.textContent = 'Bitte 4 bis 8 Ziffern, nicht 1234.';
    }
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
    if (tab === 'missionen') body = h('div', { class: 'stack' }, teacherMissions(), teacherSolo());
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
          h('div', null, h('h3', null, m.title), h('div', { class: 'muted small' }, (m.day ? WEEKDAYS[m.day] : 'frei') + ' · ca. ' + (m.minutes || 5) + ' Min' + (m.etep ? ' · ETEP-Stufe ' + m.etep : ''))),
          h('div', { class: 'row' }, toggle, ui.btn('Jetzt spielen', () => { startSession(m); }, { small: true, icon: 'play' }))),
        m.teacherNote ? h('p', { class: 'small' }, m.teacherNote) : null,
        m.themes ? h('div', { class: 'row' }, m.themes.map((x) => h('span', { class: 'pill' }, x))) : null,
        m.eldib && m.eldib.length ? h('div', { class: 'small muted' }, h('b', null, 'ELDiB-Bezug (Vorschlag): '), m.eldib.map((e) => e.code + ' ' + e.text).join(' · ')) : null);
    }));
  }

  function teacherSolo() {
    return h('div', { class: 'stack' },
      h('h3', null, 'Solo-Spiele (alleine auf dem iPad)'),
      h('div', { class: 'list' }, CREW.soloGames.map((g) => h('div', { class: 'li', style: { flexDirection: 'column', alignItems: 'stretch' } },
        h('div', { class: 'row between' }, h('b', null, g.title), ui.btn('Ausprobieren', () => startSolo(g), { small: true, icon: 'play' })),
        g.desc ? h('p', { class: 'small muted' }, g.desc) : null,
        g.themes ? h('div', { class: 'row' }, g.themes.map((x) => h('span', { class: 'pill' }, x))) : null,
        g.eldib && g.eldib.length ? h('div', { class: 'small muted' }, h('b', null, 'ELDiB-Bezug (Vorschlag): '), g.eldib.map((e) => e.code + ' ' + e.text).join(' · ')) : null))));
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
          h('li', null, 'Wetter-Check (1 Min.): Jede:r stellt geheim das Wetter ein und dreht die Karte nur zu dir. Die anderen schauen nach vorn. Du tippst einmal: sonnig, gemischt oder Sturm. „Genauer zählen“ ist freiwillig; genaue Zahlen erscheinen erst ab 6 Leuten.'),
          h('li', null, 'Mission des Tages (4–5 Min.): Jeder Wochentag hat ein eigenes Spiel. Mit „Andere Mission“ kannst du tauschen. Eine Sitzungs-Uhr kürzt Runden, wenn die Zeit knapp wird.'),
          h('li', null, 'Nachspielzeit (1–2 Min.): Eine Frage, freiwillig. Das ist der wichtigste Teil.'),
          h('li', null, 'Energie fließt ins gemeinsame Crew-HQ und wird sofort nach der Mission gespeichert. Beim Level-up wählt die Crew per A/B ein neues Teil. Es gibt keine Einzel-Rangliste.'))),
      h('div', { class: 'card stack' }, h('h3', null, 'Wochenplan'), h('div', { class: 'list' }, byDay)),
      h('div', { class: 'card stack' }, h('h3', null, 'Sicherheitsregeln im Spiel'),
        h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } },
          h('li', null, 'X-Karte (oben rechts): Jede:r darf jede Karte ohne Begründung überspringen. Auch während Animationen: Dann wird die nächste Karte übersprungen.'),
          h('li', null, 'Start-PIN 1234: Beim ersten Öffnen musst du eine eigene PIN wählen. Nach 3 falschen Versuchen ist der Zugang 30 Sekunden gesperrt.'),
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
    xcard: onXCard,
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
