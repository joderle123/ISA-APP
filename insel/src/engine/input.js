// Einheitliche Eingabe: Tastatur, Maus und Touch (Multi-Touch).
// Zustand pro Frame: move {x,y} (-1..1, y=+1 vorwärts), look {dx,dy} (Pixel), zoom (+ = weiter weg),
// jump/action/power (in diesem Frame gedrückt), *Held (gehalten).
const INTERACTIVE = 'button, input, select, textarea, a, .hud-interactive, .menu, .boot';

export function createInput({ root, events }) {
  const state = {
    move: { x: 0, y: 0 },
    look: { dx: 0, dy: 0 },
    zoom: 0,
    jump: false, action: false, power: false,
    jumpHeld: false, actionHeld: false, powerHeld: false,
    run: false,          // Tastatur: Umschalt = langsam gehen; Touch: Joystick weit = rennen
    enabled: true,
    lastDevice: 'none',  // 'touch' | 'keyboard' | 'mouse'
    // Joystick-Visual (für HUD)
    joystick: { active: false, x: 0, y: 0, kx: 0, ky: 0, radius: 62 },
  };
  const keys = new Set();
  const touches = new Map(); // id -> {role:'stick'|'look', x, y}
  let pinchDist = 0;
  let stickId = null;
  let mouseDrag = false;
  let lastMouse = { x: 0, y: 0 };
  let joyMove = { x: 0, y: 0 };

  const setDevice = (d) => {
    if (state.lastDevice !== d) { state.lastDevice = d; events.emit('input:device', d); }
  };

  // ---- Knöpfe (auch vom HUD genutzt) ----
  function press(name) {
    if (!state.enabled) return;
    if (!state[name + 'Held']) {
      state[name] = true;
      state[name + 'Held'] = true;
      events.emit('input:' + name, true);
      events.emit('input:' + name + ':down');
    }
  }
  function release(name) {
    if (state[name + 'Held']) {
      state[name + 'Held'] = false;
      events.emit('input:' + name + ':up');
    }
  }

  // ---- Tastatur ----
  const KEYMAP = { Space: 'jump', KeyE: 'action', Enter: 'action', KeyQ: 'power', KeyF: 'power' };
  function onKeyDown(e) {
    if (e.target && e.target.closest && e.target.closest('input, textarea')) return;
    setDevice('keyboard');
    keys.add(e.code);
    const b = KEYMAP[e.code];
    if (b) { press(b); e.preventDefault(); }
    if (e.code === 'Escape' || e.code === 'KeyP') events.emit('input:menu');
    if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
  }
  function onKeyUp(e) {
    keys.delete(e.code);
    const b = KEYMAP[e.code];
    if (b) release(b);
  }
  function keyMove() {
    let x = 0, y = 0;
    if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
    if (keys.has('KeyW') || keys.has('ArrowUp') || keys.has('KeyZ')) y += 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) y -= 1;
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    const slow = keys.has('ShiftLeft') || keys.has('ShiftRight');
    return { x: slow ? x * 0.5 : x, y: slow ? y * 0.5 : y, any: l > 0 };
  }
  function releaseAll() {
    keys.clear();
    ['jump', 'action', 'power'].forEach(release);
    touches.clear();
    stickId = null;
    joyMove = { x: 0, y: 0 };
    state.joystick.active = false;
    mouseDrag = false;
  }

  // ---- Touch ----
  function stickUpdate(t) {
    const js = state.joystick;
    let dx = t.clientX - js.x, dy = t.clientY - js.y;
    const l = Math.hypot(dx, dy);
    const r = js.radius;
    // Schwebender Joystick: Basis folgt dem Finger, wenn er weit hinauszieht
    if (l > r * 1.35) {
      const k = (l - r * 1.35) / l;
      js.x += dx * k; js.y += dy * k;
      dx = t.clientX - js.x; dy = t.clientY - js.y;
    }
    const l2 = Math.min(Math.hypot(dx, dy), r);
    const a = Math.atan2(dy, dx);
    js.kx = Math.cos(a) * l2;
    js.ky = Math.sin(a) * l2;
    let m = l2 / r;
    m = m < 0.12 ? 0 : (m - 0.12) / 0.88;
    joyMove.x = Math.cos(a) * m;
    joyMove.y = -Math.sin(a) * m;
  }
  function onTouchStart(e) {
    setDevice('touch');
    const w = root.clientWidth;
    let used = false;
    for (const t of e.changedTouches) {
      const target = t.target;
      if (target && target.closest && target.closest(INTERACTIVE)) continue;
      used = true;
      if (!state.enabled) continue;
      if (stickId === null && t.clientX < w * 0.45) {
        stickId = t.identifier;
        const js = state.joystick;
        const pad = js.radius + 14;
        js.x = Math.max(pad, Math.min(t.clientX, w - pad));
        js.y = Math.max(pad, Math.min(t.clientY, root.clientHeight - pad));
        js.kx = 0; js.ky = 0; js.active = true;
        touches.set(t.identifier, { role: 'stick', x: t.clientX, y: t.clientY });
        stickUpdate(t);
      } else {
        touches.set(t.identifier, { role: 'look', x: t.clientX, y: t.clientY });
      }
    }
    pinchDist = lookPinchDist();
    // Nur auf der Spielfläche blockieren – Knöpfe brauchen ihren Klick
    if (used && e.cancelable) e.preventDefault();
  }
  function lookTouches() {
    const arr = [];
    touches.forEach((v) => { if (v.role === 'look') arr.push(v); });
    return arr;
  }
  function lookPinchDist() {
    const l = lookTouches();
    return l.length >= 2 ? Math.hypot(l[0].x - l[1].x, l[0].y - l[1].y) : 0;
  }
  function onTouchMove(e) {
    let used = false;
    for (const t of e.changedTouches) {
      const rec = touches.get(t.identifier);
      if (!rec) continue;
      used = true;
      if (rec.role === 'stick') {
        stickUpdate(t);
      } else {
        const dx = t.clientX - rec.x, dy = t.clientY - rec.y;
        if (lookTouches().length < 2 && state.enabled) {
          state.look.dx += dx;
          state.look.dy += dy;
        }
      }
      rec.x = t.clientX; rec.y = t.clientY;
    }
    const pd = lookPinchDist();
    if (pd > 0 && pinchDist > 0) state.zoom += (pinchDist - pd) * 0.035;
    pinchDist = pd;
    if (used && e.cancelable) e.preventDefault();
  }
  function onTouchEnd(e) {
    for (const t of e.changedTouches) {
      const rec = touches.get(t.identifier);
      if (!rec) continue;
      if (rec.role === 'stick') {
        stickId = null;
        joyMove.x = 0; joyMove.y = 0;
        state.joystick.active = false;
      }
      touches.delete(t.identifier);
    }
    pinchDist = lookPinchDist();
  }

  // ---- Maus ----
  function onPointerDown(e) {
    if (e.pointerType === 'touch') return;
    if (e.target && e.target.closest && e.target.closest(INTERACTIVE)) return;
    setDevice('mouse');
    if (e.button === 0 || e.button === 2) {
      mouseDrag = true;
      lastMouse.x = e.clientX; lastMouse.y = e.clientY;
    }
  }
  function onPointerMove(e) {
    if (e.pointerType === 'touch' || !mouseDrag) return;
    if (state.enabled) {
      state.look.dx += e.clientX - lastMouse.x;
      state.look.dy += e.clientY - lastMouse.y;
    }
    lastMouse.x = e.clientX; lastMouse.y = e.clientY;
  }
  function onPointerUp(e) { if (e.pointerType !== 'touch') mouseDrag = false; }
  function onWheel(e) {
    if (e.target && e.target.closest && e.target.closest('.menu')) return;
    state.zoom += Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.012, 1.4);
    e.preventDefault();
  }

  // ---- Listener ----
  const opt = { passive: false };
  root.addEventListener('touchstart', onTouchStart, opt);
  root.addEventListener('touchmove', onTouchMove, opt);
  root.addEventListener('touchend', onTouchEnd, opt);
  root.addEventListener('touchcancel', onTouchEnd, opt);
  root.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  root.addEventListener('wheel', onWheel, opt);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', releaseAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) releaseAll(); });
  // iOS: Doppeltipp-Zoom, Gesten-Zoom, Kontextmenü und Überscrollen verhindern
  document.addEventListener('gesturestart', (e) => e.preventDefault(), opt);
  document.addEventListener('gesturechange', (e) => e.preventDefault(), opt);
  document.addEventListener('dblclick', (e) => e.preventDefault(), opt);
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('touchmove', (e) => { if (e.cancelable && !(e.target.closest && e.target.closest('.menu-panel'))) e.preventDefault(); }, opt);
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd < 320 && e.cancelable && !(e.target.closest && e.target.closest('button'))) e.preventDefault();
    lastTouchEnd = now;
  }, opt);
  document.addEventListener('selectstart', (e) => e.preventDefault());

  const input = {
    state,
    get move() { return state.move; },
    get look() { return state.look; },
    // Wird zu Beginn jedes Frames aufgerufen (vor Spiel-Updates)
    beginFrame() {
      const k = keyMove();
      if (!state.enabled) { state.move.x = 0; state.move.y = 0; state.run = false; return; }
      if (k.any) { state.move.x = k.x; state.move.y = k.y; state.run = true; }
      else { state.move.x = joyMove.x; state.move.y = joyMove.y; state.run = Math.hypot(joyMove.x, joyMove.y) > 0.82; }
    },
    // Wird am Ende jedes Frames aufgerufen: Deltas und Klick-Flanken zurücksetzen
    endFrame() {
      state.look.dx = 0; state.look.dy = 0; state.zoom = 0;
      state.jump = false; state.action = false; state.power = false;
    },
    press, release, releaseAll,
    setEnabled(v) { state.enabled = !!v; if (!v) releaseAll(); },
    // Für Tests
    _debug: { keys, touches },
  };
  return input;
}
