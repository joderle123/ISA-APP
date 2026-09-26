// Bewegungs-Prüfungen (WP12–15, WP19): Pumpsprung, Tragen/Schwappen, Lava-Neustart, Klettern mit Halt-Ring,
// Segel (Gleitweite, Krater-Aufwind, Rune, Dornen), Schwimmen, Tauchring → Testgrotte, Tippen/Halten, Kraft-Rad,
// Kamera-Modi, Fotomodus. Dazu Screenshots. Aufruf: node tests/moves.mjs   (Q=low|medium|high, SHOTS=Ordner)
import { launch, openGame, startGame, frames, shot, hold, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const snap = (page) => page.evaluate(() => { LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&alles` });
  await startGame(page, { hour: 12 });
  const plug = await page.evaluate(() => ({ list: LUMO.plugins.list, failed: LUMO.plugins.failed, ab: LUMO.player.abilities, climb: LUMO.world.climbables.count, runes: LUMO.world.runes.list.length, up: LUMO.world.updrafts.list.length }));
  check('Bewegungs-Plugin installiert, Welt-Objekte da', plug.list.includes('bewegung') && plug.failed.length === 0 && plug.ab.segel && plug.climb >= 3 && plug.runes >= 6 && plug.up >= 3, JSON.stringify({ climb: plug.climb, runes: plug.runes, up: plug.up, failed: plug.failed }));

  // ---- Tippen / Halten ----
  const th = await page.evaluate(() => {
    const seen = [];
    const off1 = LUMO.events.on('input:jump:tap', () => seen.push('tap'));
    const off2 = LUMO.events.on('input:jump:hold', () => seen.push('hold'));
    LUMO.input.press('jump'); LUMO.debug.advance(0.1); LUMO.input.release('jump'); LUMO.debug.advance(1.2);
    LUMO.input.press('jump'); LUMO.debug.advance(0.4); const isHold = LUMO.input.isHold('jump'); LUMO.input.release('jump'); LUMO.debug.advance(1.2);
    off1(); off2();
    return { seen, isHold };
  });
  check('Tippen und Halten eindeutig (0,1 s = Tippen, 0,4 s = Halten)', th.seen.join(',') === 'tap,hold' && th.isHold, JSON.stringify(th));

  // ---- Pumpsprung ≥ 2,2× Sprunghöhe ----
  const pump = await page.evaluate(() => {
    const P = LUMO.player, I = LUMO.input, D = LUMO.debug;
    D.teleport('hafen'); D.advance(0.5);
    const y0 = P.position.y;
    let hNormal = 0;
    I.press('jump'); D.advance(1 / 30); I.release('jump');
    for (let i = 0; i < 40; i++) { D.advance(1 / 30); hNormal = Math.max(hNormal, P.position.y - y0); }
    D.advance(0.5);
    // Halten: kleiner Sprung, Landung, Anspannen, Loslassen
    let hPump = 0, charged = false, events = 0;
    const off = LUMO.events.on('player:pump', () => events++);
    I.press('jump');
    for (let i = 0; i < 45; i++) { D.advance(1 / 30); if (P.pump.charging) charged = true; }
    const ready = P.pump.ready;
    I.release('jump');
    for (let i = 0; i < 60; i++) { D.advance(1 / 30); hPump = Math.max(hPump, P.position.y - y0); }
    off();
    return { hNormal, hPump, ratio: hPump / hNormal, charged, ready, events };
  });
  check('Pumpsprung ≥ 2,2× Sprunghöhe', pump.ratio >= 2.2 && pump.charged && pump.ready && pump.events === 1, `normal ${pump.hNormal.toFixed(2)} m · Pump ${pump.hPump.toFixed(2)} m · ×${pump.ratio.toFixed(2)}`);
  await page.evaluate(() => { LUMO.input.press('jump'); LUMO.debug.advance(1.0); });
  await snap(page); await frames(page, 2);
  await shot(page, '80_pumpsprung_anspannen');
  await page.evaluate(() => { LUMO.input.release('jump'); LUMO.debug.advance(1.5); });

  // ---- Tragen: Sprint + Landung ≥ 30 % verschüttet, vorsichtiges Gehen < 5 % ----
  const carry = await page.evaluate(() => {
    const P = LUMO.player, I = LUMO.input, D = LUMO.debug;
    D.teleport('hafen'); D.advance(0.3);
    let spills = 0; const off = LUMO.events.on('carry:spill', () => spills++);
    P.carry({ id: 'tank-a', kind: 'tank' });
    const st = P.state;
    D.runScenario(['move 0 1 2.2']);
    I.press('jump'); D.advance(1 / 30); I.release('jump'); D.advance(1.2);
    const fillSprint = P.carrying ? P.moves.carry.slosh.fill : -1;
    P.drop();
    P.carry({ id: 'tank-b', kind: 'tank' });
    D.runScenario(['move 0 0.45 5']);
    const fillWalk = P.moves.carry.slosh.fill;
    const dropped = P.drop();
    off();
    return { st, fillSprint, fillWalk, spills, dropped: !!dropped, state: P.state };
  });
  check('Tragen: Sprint+Landung verschüttet ≥ 30 %, Gehen < 5 %', carry.st === 'carry' && carry.fillSprint <= 0.7 && carry.fillWalk >= 0.95 && carry.dropped && carry.state === 'ground', JSON.stringify(carry));
  await page.evaluate(() => { LUMO.player.carry({ id: 'tank-c', kind: 'tank' }); LUMO.debug.advance(0.4); });
  await snap(page); await frames(page, 2);
  await shot(page, '81_tragen');
  await page.evaluate(() => { LUMO.player.drop(); });

  // ---- Lava: Neustart < 2 s an der letzten Kante ----
  const lava = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, S = LUMO.world.island.SITES.kraterRand;
    D.teleportSite('kraterRand'); D.advance(0.6);
    const start = { x: P.position.x, z: P.position.z };
    let tFail = -1, tBack = -1, t = 0, reason = null;
    const o1 = LUMO.events.on('player:fail', (e) => { tFail = t; reason = e.kind; });
    const o2 = LUMO.events.on('player:respawn', () => { tBack = t; });
    // Richtung Kratermitte laufen (Absicht statt Joystick)
    P.setIntent({ x: 0, y: 1, camYaw: Math.atan2(-(0 - P.position.x), -(-42 - P.position.z)) });
    for (let i = 0; i < 300 && tBack < 0; i++) { D.advance(1 / 30); t += 1 / 30; if (tFail >= 0) P.setIntent(null); }
    P.setIntent(null); o1(); o2();
    const d = Math.hypot(P.position.x - start.x, P.position.z - start.z);
    return { tFail, tBack, dt: tBack - tFail, reason, dBack: d, state: P.state, inLava: P.ctx.inLava(P.position) };
  });
  check('Lava: Neustart an der letzten Kante in < 2 s', lava.reason === 'lava' && lava.dt > 0 && lava.dt < 2 && lava.state === 'ground' && !lava.inLava, JSON.stringify(lava));

  // ---- Klettern: 40-m-Mangrove mit 5 Segmenten frei, mit 3 nur über die Simse ----
  const climb = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, S = LUMO.state;
    const M = LUMO.world.climbables.get('mangrove-stamm');
    const R = M.r + 3.5;
    function run(base, angle) {
      S.set('wurzeln', { base, extra: [] });
      const x = M.x + Math.sin(angle) * R, z = M.z + Math.cos(angle) * R;
      D.teleport({ x, z }); D.advance(0.3);
      const camYaw = Math.atan2(-(M.x - x), -(M.z - z));
      P.setIntent({ x: 0, y: 1, camYaw });
      let grabbed = false, top = 0, slid = false, mantled = false, ledgeSeen = false;
      const o1 = LUMO.events.on('climb:mantle', () => { mantled = true; });
      for (let i = 0; i < 60 * 30 && !mantled; i++) {
        D.advance(1 / 30);
        if (P.state === 'climb') {
          grabbed = true; top = Math.max(top, P.position.y - M.yMin);
          if (P.climb.sliding) slid = true;
          // auf einem Sims rasten, bis der Ring voll ist (so klettert man die Hauptroute)
          if (P.climb.onLedge) { ledgeSeen = true; P.setIntent({ x: 0, y: P.halt.current < P.halt.max - 0.05 ? 0 : 1, camYaw }); }
          else P.setIntent({ x: 0, y: 1, camYaw });
        }
        if (grabbed && P.state === 'ground' && P.position.y < M.yMin + 1) break;
      }
      P.setIntent(null); o1();
      const y = P.position.y - M.yMin;
      D.advance(0.2);
      return { grabbed, top: +top.toFixed(1), slid, mantled, ledgeSeen, segments: P.halt.max, finalY: +y.toFixed(1), state: P.state };
    }
    const five = run(5, 2.6);       // Rückseite (keine Simse), 5 Segmente: frei bis oben
    const threeBack = run(3, 2.6);  // Rückseite, 3 Segmente: rutscht ab, kommt nicht hoch
    const threeMain = run(3, 0.65); // Hauptroute mit Simsen, 3 Segmente: kommt hoch
    return { five, threeBack, threeMain };
  });
  check('Klettern: 5 Segmente frei bis oben (40 m)', climb.five.grabbed && climb.five.mantled && climb.five.top >= 38, JSON.stringify(climb.five));
  check('Klettern: 3 Segmente auf der Rückseite rutschen ab, kein Sturz', climb.threeBack.grabbed && climb.threeBack.slid && !climb.threeBack.mantled && climb.threeBack.top < 30, JSON.stringify(climb.threeBack));
  check('Klettern: 3 Segmente auf der Hauptroute (Simse) bis oben', climb.threeMain.grabbed && climb.threeMain.mantled && climb.threeMain.ledgeSeen, JSON.stringify(climb.threeMain));
  // Screenshot beim Klettern (Halt-Ring sichtbar)
  await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, M = LUMO.world.climbables.get('mangrove-stamm');
    LUMO.state.set('wurzeln', { base: 5, extra: ['krabbe', 'lieblingsort'] });
    const a = 0.65, x = M.x + Math.sin(a) * (M.r + 3.5), z = M.z + Math.cos(a) * (M.r + 3.5);
    D.teleport({ x, z }); D.advance(0.3);
    P.setIntent({ x: 0, y: 1, camYaw: Math.atan2(-(M.x - x), -(M.z - z)) });
    for (let i = 0; i < 150; i++) D.advance(1 / 30);
    P.setIntent({ x: 0, y: 0 });
    for (let i = 0; i < 10; i++) D.advance(1 / 30);
    LUMO.cameraRig.snap();
  });
  await frames(page, 3);
  const hr = await page.evaluate(() => ({ state: LUMO.player.state, view: LUMO.cameraRig.viewMode, ring: !!document.querySelector('.haltring.is-on'), segs: document.querySelectorAll('.haltring .hr-seg').length }));
  check('Halt-Ring im HUD beim Klettern, Kamera-Modus climb', hr.state === 'climb' && hr.view === 'climb' && hr.ring && hr.segs >= 7, JSON.stringify(hr));
  await shot(page, '82_klettern_mangrove');
  await page.evaluate(() => { const P = LUMO.player; LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); P.setIntent(null); LUMO.debug.advance(2); });

  // ---- Segel: Gleitweite vom Baumhaus-Podest ≥ 60 m ----
  const glide = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, I = LUMO.input;
    const B = LUMO.world.island.SITES.baumhaus;
    D.teleport({ x: B.x, z: B.z }); D.advance(0.3);
    const onPodest = P.position.y > 8;
    const start = { x: P.position.x, z: P.position.z, y: P.position.y };
    P.setIntent({ x: 0, y: 1, camYaw: 0, jump: false, jumpHeld: false });   // nach Süden (+z) laufen
    for (let i = 0; i < 20; i++) D.advance(1 / 30);
    P.setIntent({ x: 0, y: 1, camYaw: 0, jump: true, jumpHeld: true });
    D.advance(1 / 30);
    P.setIntent({ x: 0, y: 0, camYaw: 0, jump: false, jumpHeld: true });
    let opened = false, view = null, maxD = 0, t = 0, modeOk = true;
    for (let i = 0; i < 40 * 30; i++) {
      D.advance(1 / 30); t += 1 / 30;
      if (P.state === 'glide') { opened = true; view = LUMO.cameraRig.viewMode; }
      const d = Math.hypot(P.position.x - start.x, P.position.z - start.z);
      maxD = Math.max(maxD, d);
      if (opened && P.state !== 'glide') break;
    }
    P.setIntent(null);
    return { onPodest, opened, view, maxD: +maxD.toFixed(1), t: +t.toFixed(1), startY: +start.y.toFixed(1), endState: P.state, segelOpen: P.segel.opened };
  });
  check('Segel: vom Baumhaus-Podest ≥ 60 m Gleitweite, Kamera-Modus glide', glide.onPodest && glide.opened && glide.view === 'glide' && glide.maxD >= 60, JSON.stringify(glide));

  // Screenshot im Flug
  await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, B = LUMO.world.island.SITES.baumhaus;
    D.teleport({ x: B.x, z: B.z }); D.advance(0.3);
    P.setIntent({ x: 0, y: 1, camYaw: 0 }); for (let i = 0; i < 20; i++) D.advance(1 / 30);
    P.setIntent({ x: 0, y: 1, camYaw: 0, jump: true, jumpHeld: true }); D.advance(1 / 30);
    P.setIntent({ x: 0.2, y: 0, camYaw: 0, jumpHeld: true }); for (let i = 0; i < 50; i++) D.advance(1 / 30);
    P.glide.setMode('freude', null, 'debug');
    for (let i = 0; i < 20; i++) D.advance(1 / 30);
    LUMO.cameraRig.snap();
  });
  await frames(page, 3);
  await shot(page, '83_segel_flug');
  await page.evaluate(() => { LUMO.player.setIntent(null); LUMO.debug.advance(4); });

  // ---- Krater-Aufwind hebt auf 100 m ----
  const krater = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug;
    const V = LUMO.world.island.FEATURES.volcano;
    D.teleportSite('kraterRand'); D.advance(0.3);
    const yaw = Math.atan2(V.x - P.position.x, V.z - P.position.z);
    P.yaw = yaw;
    P.position.y += 8; P.go('air'); D.advance(1 / 30);
    P.setIntent({ x: 0, y: 0, camYaw: yaw + Math.PI, jump: true, jumpHeld: true }); D.advance(1 / 30);
    P.setIntent({ x: 0, y: 0, camYaw: yaw + Math.PI, jumpHeld: true });
    let maxY = 0, t = 0, entered = false;
    for (let i = 0; i < 30 * 30; i++) {
      D.advance(1 / 30); t += 1 / 30;
      const d = Math.hypot(P.position.x - V.x, P.position.z - V.z);
      if (!entered && d < 7) { entered = true; P.setIntent({ x: 0.75, y: 0, camYaw: yaw + Math.PI, jumpHeld: true }); }
      maxY = Math.max(maxY, P.position.y);
      if (P.state !== 'glide' || maxY >= 100) break;
    }
    P.setIntent(null);
    return { entered, maxY: +maxY.toFixed(1), t: +t.toFixed(1), state: P.state };
  });
  check('Krater-Aufwind hebt das Segel auf 100 m', krater.entered && krater.maxY >= 100, JSON.stringify(krater));
  await snap(page); await frames(page, 2);
  await shot(page, '84_krater_aufwind');
  await page.evaluate(() => { LUMO.debug.teleport('vulkan'); LUMO.debug.advance(0.5); });

  // ---- Rune schaltet in < 0,2 s; Dornen nur mit Wut ----
  const rune = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, R = LUMO.world.runes;
    const tor = R.get('tor-freude');
    function flyThrough(target, mode, dist = 18) {
      P.glide.setMode(mode, null, 'debug');
      const yaw = tor.yaw + Math.PI;   // Flugrichtung entlang der Ring-Normalen (von Osten nach Westen)
      const sx = target.x - Math.sin(target.yaw) * dist, sz = target.z - Math.cos(target.yaw) * dist;
      D.teleport({ x: sx, z: sz }); D.advance(0.2);
      P.position.y = target.y + 1; P.yaw = target.yaw; P.go('air'); D.advance(1 / 30);
      P.setIntent({ x: 0, y: 0, camYaw: target.yaw + Math.PI, jump: true, jumpHeld: true }); D.advance(1 / 30);
      P.setIntent({ x: 0, y: 0, camYaw: target.yaw + Math.PI, jumpHeld: true });
      let tPass = -1, tMode = -1, t = 0, passed = null;
      const o1 = LUMO.events.on('rune:pass', (e) => { tPass = t; passed = e.id; });
      const o2 = LUMO.events.on('segel:mode', (e) => { if (e.source === 'rune') tMode = t; });
      for (let i = 0; i < 150 && tMode < 0; i++) { D.advance(1 / 30); t += 1 / 30; }
      o1(); o2();
      const m = P.glide.mode;
      P.setIntent(null);
      return { passed, tPass, tMode, delay: +(tMode - tPass).toFixed(3), mode: m };
    }
    const auto = flyThrough(tor, 'neutral');
    LUMO.debug.setMode('profi');
    const profi = flyThrough(tor, 'neutral');
    LUMO.debug.setMode('abenteuer');
    // Dornen: ohne Wut blockiert, mit Wut bricht
    const dorn = R.get('dornen-lichtung');
    function hitDornen(mode) {
      P.glide.setMode(mode, null, 'debug');
      const dist = 14;
      const sx = dorn.x + Math.sin(dorn.yaw) * dist, sz = dorn.z + Math.cos(dorn.yaw) * dist;
      D.teleport({ x: sx, z: sz }); D.advance(0.2);
      const yaw = Math.atan2(dorn.x - sx, dorn.z - sz);
      P.position.y = dorn.y + 2.5; P.yaw = yaw; P.go('air'); D.advance(1 / 30);
      P.setIntent({ x: 0, y: 0, camYaw: yaw + Math.PI, jump: true, jumpHeld: true }); D.advance(1 / 30);
      P.setIntent({ x: 0, y: 0, camYaw: yaw + Math.PI, jumpHeld: true });
      let blocked = 0, broke = false;
      const o1 = LUMO.events.on('gate:blocked', () => blocked++);
      const o2 = LUMO.events.on('gate:break', () => { broke = true; });
      for (let i = 0; i < 120 && !broke; i++) { D.advance(1 / 30); if (P.state !== 'glide' && i > 5) break; }
      o1(); o2(); P.setIntent(null);
      return { blocked, broke, broken: dorn.broken };
    }
    const neutral = hitDornen('neutral');
    const wut = hitDornen('wut');
    return { auto, profi, neutral, wut };
  });
  check('Rune schaltet das Segel automatisch in < 0,2 s', rune.auto.passed === 'tor-freude' && rune.auto.mode === 'freude' && rune.auto.delay >= 0 && rune.auto.delay < 0.2, JSON.stringify(rune.auto));
  check('Profi: Rune schaltet nicht automatisch', rune.profi.passed === 'tor-freude' && rune.profi.mode === 'neutral', JSON.stringify(rune.profi));
  check('Dornen brechen nur mit Wut', rune.neutral.blocked > 0 && !rune.neutral.broke && rune.wut.broke && rune.wut.broken, JSON.stringify({ neutral: rune.neutral, wut: rune.wut }));

  // ---- Schwimmen: aus dem tiefen Wasser zur Felsnadel ----
  const swim = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug;
    D.teleport({ x: -138, z: -104 }); D.advance(0.5);
    const s0 = P.state;
    const tx = -150, tz = -112;
    let arrived = false, t = 0, dolphin = false;
    for (let i = 0; i < 30 * 30; i++) {
      const yaw = Math.atan2(tx - P.position.x, tz - P.position.z);
      P.setIntent({ x: 0, y: 1, camYaw: yaw + Math.PI, run: true, jump: i === 60, jumpHeld: i === 60 });
      D.advance(1 / 30); t += 1 / 30;
      if (i > 60 && i < 100 && P.state === 'air') dolphin = true;
      if (Math.hypot(P.position.x - tx, P.position.z - tz) < 7.5) { arrived = true; break; }
    }
    P.setIntent(null);
    return { s0, arrived, t: +t.toFixed(1), dolphin, end: P.state, pos: { x: +P.position.x.toFixed(1), z: +P.position.z.toFixed(1), y: +P.position.y.toFixed(2) } };
  });
  check('Schwimmen: tiefes Wasser, Delfinsprung, bis zur Felsnadel', swim.s0 === 'swim' && swim.dolphin && swim.arrived && swim.end === 'swim', JSON.stringify(swim));
  await page.evaluate(() => { LUMO.debug.teleport({ x: -140, z: -106 }); LUMO.debug.advance(0.6); LUMO.player.setIntent({ x: 0, y: 1, camYaw: 0, run: true }); LUMO.debug.advance(0.6); });
  await snap(page); await frames(page, 2);
  await shot(page, '85_schwimmen');
  await page.evaluate(() => LUMO.player.setIntent(null));

  // ---- Tauchring am Tränensee → Testgrotte → zurück (auch per Zeitlimit) ----
  const dive = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, Pool = LUMO.world.island.FEATURES.pool;
    D.teleport({ x: Pool.x + 6, z: Pool.z }); D.advance(0.3);
    let room = null, exit = null, t = 0;
    const o1 = LUMO.events.on('dive:room', (e) => { room = e.id; });
    const o2 = LUMO.events.on('dive:exit', (e) => { exit = e.reason; });
    for (let i = 0; i < 12 * 30 && !room; i++) {
      const yaw = Math.atan2(Pool.x - P.position.x, Pool.z - P.position.z);
      P.setIntent({ x: 0, y: 1, camYaw: yaw + Math.PI });
      D.advance(1 / 30); t += 1 / 30;
    }
    P.setIntent(null);
    const inRoom = { state: P.state, stage: P.dive.stage, y: +P.position.y.toFixed(1), bounds: !!LUMO.cameraRig.bounds };
    // 3D schwimmen: vorwärts + auftauchen (Springen halten) → Austrittsring
    for (let i = 0; i < 40 * 30 && !exit; i++) { P.setIntent({ x: 0, y: 0.6, camYaw: P.yaw + Math.PI, jumpHeld: true }); D.advance(1 / 30); t += 1 / 30; }
    P.setIntent(null); o1(); o2();
    return { room, inRoom, exit, t: +t.toFixed(1), end: P.state, y: +P.position.y.toFixed(1) };
  });
  check('Tauchring: Testgrotte betreten und wieder aufgetaucht', dive.room === 'testgrotte' && dive.inRoom.state === 'dive' && dive.inRoom.stage === 'room' && dive.inRoom.bounds && !!dive.exit && dive.end !== 'dive' && dive.y > 0, JSON.stringify(dive));
  // Zeitlimit: erneut hinein und warten
  const timeout = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, Pool = LUMO.world.island.FEATURES.pool;
    D.teleport({ x: Pool.x + 6, z: Pool.z }); D.advance(0.3);
    let room = false, exit = null;
    const o1 = LUMO.events.on('dive:room', () => { room = true; });
    const o2 = LUMO.events.on('dive:exit', (e) => { exit = e.reason; });
    for (let i = 0; i < 12 * 30 && !room; i++) { const yaw = Math.atan2(Pool.x - P.position.x, Pool.z - P.position.z); P.setIntent({ x: 0, y: 1, camYaw: yaw + Math.PI }); D.advance(1 / 30); }
    P.setIntent(null);
    LUMO.cameraRig.snap();
    return { room, exitEarly: exit };
  });
  await frames(page, 3);
  await shot(page, '86_testgrotte');
  const timeout2 = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug;
    let exit = null; const o2 = LUMO.events.on('dive:exit', (e) => { exit = e.reason; });
    for (let i = 0; i < 40 * 30 && !exit; i++) D.advance(1 / 30);
    o2();
    return { exit, end: P.state };
  });
  check('Tauchen: Zeitlimit verhindert Feststecken', timeout.room && !timeout.exitEarly && timeout2.exit === 'zeit' && timeout2.end !== 'dive', JSON.stringify({ ...timeout, ...timeout2 }));
  await page.evaluate(() => { LUMO.debug.teleport('dschungel'); LUMO.debug.advance(0.5); });

  // ---- Rune-Tor ansehen ----
  await page.evaluate(() => { const t = LUMO.world.runes.get('tor-wut'); LUMO.debug.setShot({ x: t.x + 9, y: t.y + 2, z: t.z + 7 }, { x: t.x, y: t.y, z: t.z }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, '87_runentor');
  await page.evaluate(() => { LUMO.debug.setShot(null); LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.5); LUMO.cameraRig.snap(); });

  // ---- Kraft-Rad: Halten öffnet, Segmente ≥ 72 px, Zeitlupe 25 %, Wahl per Loslassen, Tippen = Kraft ----
  const rad = await page.evaluate(() => {
    const I = LUMO.input, D = LUMO.debug, E = LUMO.events;
    const seen = [];
    const offs = [E.on('kraftrad:select', (e) => seen.push('select:' + e.id)), E.on('kraft:tap', (e) => seen.push('tap:' + e.id)), E.on('kraftrad:open', () => seen.push('open'))];
    I.press('power'); D.advance(0.35);
    const open = !!document.querySelector('.kraftrad.is-open');
    const scale = LUMO.loop.timeScale;
    const segs = [...document.querySelectorAll('[data-kraft-segment]')].map((p) => { const b = p.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; });
    // Daumen zum Segment 1 ziehen (oben) und loslassen
    const el = document.querySelector('.kraftrad');
    const r = el.getBoundingClientRect();
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 - 90, bubbles: true }));
    const hot = !!document.querySelector('[data-kraft-segment="1"].is-hot');
    I.release('power'); D.advance(1 / 30);
    const closed = !document.querySelector('.kraftrad.is-open');
    const scaleAfter = LUMO.loop.timeScale;
    I.press('power'); D.advance(0.08); I.release('power'); D.advance(1 / 30);
    offs.forEach((o) => o());
    return { open, scale, segs, hot, closed, scaleAfter, seen, active: LUMO.plugins.bewegung.kraftrad.active };
  });
  check('Kraft-Rad: Halten öffnet (Zeitlupe 25 %), Segmente ≥ 72 px, Loslassen wählt, Tippen nutzt', rad.open && rad.scale === 0.25 && rad.segs.length === 4 && rad.segs.every((s) => s.w >= 72 && s.h >= 72) && rad.hot && rad.closed && rad.scaleAfter === 1 && rad.seen.includes('select:blick') && rad.seen.includes('tap:blick'), JSON.stringify(rad));
  await page.evaluate(() => { LUMO.input.press('power'); LUMO.debug.advance(0.35); });
  await frames(page, 2);
  await shot(page, '88_kraftrad');
  await page.evaluate(() => { LUMO.input.release('power'); LUMO.debug.advance(0.2); });
  // Federring im Flug (Profi)
  const featherRing = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug, I = LUMO.input, B = LUMO.world.island.SITES.baumhaus;
    LUMO.debug.setMode('profi');
    D.teleport({ x: B.x, z: B.z }); D.advance(0.3);
    P.setIntent({ x: 0, y: 1, camYaw: 0 }); for (let i = 0; i < 20; i++) D.advance(1 / 30);
    P.setIntent({ x: 0, y: 1, camYaw: 0, jump: true, jumpHeld: true }); D.advance(1 / 30);
    P.setIntent({ x: 0, y: 0, camYaw: 0, jumpHeld: true }); for (let i = 0; i < 30; i++) D.advance(1 / 30);
    I.press('power'); D.advance(0.35);
    const feathers = document.querySelectorAll('[data-kraft-feather]').length;
    LUMO.cameraRig.snap();
    return { state: P.state, feathers };
  });
  await frames(page, 2);
  await shot(page, '89_kraftrad_federn');
  await page.evaluate(() => { LUMO.plugins.bewegung.kraftrad.selectFeather('angst'); LUMO.input.release('power'); LUMO.debug.advance(0.5); });
  const angst = await page.evaluate(() => ({ mode: LUMO.player.glide.mode, scale: LUMO.loop.timeScale, state: LUMO.player.state }));
  check('Federring im Profi-Flug, Angst-Feder = Zeitlupe 0,5', featherRing.state === 'glide' && featherRing.feathers === 6 && angst.mode === 'angst' && angst.scale === 0.5, JSON.stringify({ featherRing, angst }));
  await page.evaluate(() => { LUMO.player.setIntent(null); LUMO.debug.advance(6); LUMO.debug.setMode('abenteuer'); });
  const scaleBack = await page.evaluate(() => LUMO.loop.timeScale);
  check('Zeitlupe endet mit dem Segel', scaleBack === 1, String(scaleBack));

  // ---- Kamera-Modi talk / photo, Fotomodus speichert nur lokal ----
  const cam = await page.evaluate(async () => {
    const R = LUMO.cameraRig, D = LUMO.debug;
    D.teleport('hafen'); D.advance(0.3);
    R.setMode('talk', { target: { x: LUMO.player.position.x + 2, y: LUMO.player.position.y, z: LUMO.player.position.z - 2 } });
    for (let i = 0; i < 30; i++) D.advance(1 / 30);
    const talk = { mode: R.mode, d: +LUMO.camera.position.distanceTo(LUMO.player.position).toFixed(1) };
    R.setMode(null);
    const back = R.mode;
    const F = LUMO.plugins.bewegung.photomode;
    localStorage.removeItem('lumo.fotos');
    const entered = F.enter();
    const photoMode = R.mode;
    const paused = LUMO.paused;
    F.setFilter('warm'); F.setFrame('breit');
    const url = F.capture();
    const n = F.photos().length;
    const bar = !!document.querySelector('.photo-bar') && !!document.querySelector('.photo-x');
    return { talk, back, entered, photoMode, paused, n, url: url.slice(0, 22), bar, hidden: getComputedStyle(document.querySelector('.hud-buttons')).visibility };
  });
  check('Kamera: talk rahmt beide, zurück zu follow', cam.talk.mode === 'talk' && cam.talk.d > 2 && cam.talk.d < 8 && cam.back === 'follow', JSON.stringify(cam.talk));
  check('Fotomodus: Pause, freie Kamera, Bild nur lokal (lumo.fotos)', cam.entered && cam.photoMode === 'photo' && cam.paused && cam.n === 1 && cam.url.startsWith('data:image/jpeg') && cam.bar && cam.hidden === 'hidden', JSON.stringify(cam));
  await frames(page, 2);
  await shot(page, '90_fotomodus');
  await page.evaluate(() => { LUMO.plugins.bewegung.photomode.exit(); });
  const after = await page.evaluate(() => ({ mode: LUMO.cameraRig.mode, paused: LUMO.paused, bar: !!document.querySelector('.photo-bar') }));
  check('Fotomodus beendet: Kamera folgt, Spiel läuft', after.mode === 'follow' && !after.paused && !after.bar, JSON.stringify(after));

  // ---- Fähigkeiten aus dem Zustand (ohne ?alles) ----
  const gate = await page.evaluate(() => {
    LUMO.debug.grantMoves(false);
    const off = { ...LUMO.player.abilities };
    LUMO.debug.grantAbility('segel'); LUMO.debug.grantAbility('klettern');
    const on = { ...LUMO.player.abilities };
    LUMO.state.set('feathers', ['wut']);
    const feathers = LUMO.player.glide.feathers;
    LUMO.debug.grantMoves(true);
    return { off, on, feathers };
  });
  check('Fähigkeiten folgen dem Spielstand (Segel/Klettern/Federn)', !gate.off.segel && !gate.off.klettern && gate.on.segel && gate.on.klettern && !gate.on.schwimmen && gate.feathers.join() === 'wut', JSON.stringify(gate));

  await frames(page, 2);
  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);
