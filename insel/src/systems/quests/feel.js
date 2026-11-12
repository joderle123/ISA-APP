// Spielgefühl (Rückmeldung ohne Worte): Aktion ausgelöst, etwas aufgenommen/abgestellt, Auftrag geschafft, Aufnäher.
//   · interact      → kleiner Funkenpuff am Aktionspunkt, Aktion-Knopf federt
//   · carry:start/drop → Puff an den Händen bzw. am Abstellort, winziger Kamera-Stups
//   · quest:complete → Funkenring in Gold und Aufnäher-Farbe, Kamera-Stups, zweiter heller Ton
//   · patch:unlock  → Aufnäher-Moment: Abzeichen wächst oben ein, glänzt, fliegt zur Figur, dort funkt es
//     (der Aufnäher sitzt dann auf dem Rücken). Wartet, bis keine Szene/kein Fenster offen ist. Rein visuell, blockiert nichts.
//   createFeel({ game, engine }) → { reveal(unit), get pending(), get shown() }
import { icon, hasIcon } from '../../ui/icons.js';

export function createFeel({ game, engine }) {
  const ev = game.events;
  const hasDOM = typeof document !== 'undefined';
  const fx = () => game.particles;
  const pp = () => game.player && game.player.position;
  const puff = (x, y, z, o = {}) => { const P = fx(); if (P) P.emit({ x, y, z, count: 10, spread: 0.3, up: 1.6, speed: 1.4, color: '#bff6ff', size: 0.12, life: 0.7, gravity: -1, drag: 1.6, additive: true, ...o }); };
  const shake = (a, s) => { if (game.cameraRig && game.cameraRig.shake) game.cameraRig.shake(a, s); };
  const btnPop = () => {
    if (!hasDOM) return;
    const b = document.querySelector('.hud-btn-action');
    if (!b) return;
    b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop');
  };

  // ---- Aktion / Tragen ----
  ev.on('interact', (it) => {
    btnPop();
    const p = pp();
    if (!it || !p) return;
    const x = typeof it.x === 'function' ? it.x() : it.x, z = typeof it.z === 'function' ? it.z() : it.z;
    if (typeof x !== 'number' || typeof z !== 'number') return;
    puff(x, p.y + 1.2, z, { count: 8 });
  });
  ev.on('carry:start', () => { const p = pp(); if (p) puff(p.x, p.y + 1.1, p.z, { color: '#ffe8a3', count: 12 }); shake(0.04, 0.18); });
  ev.on('carry:drop', (e) => { const a = e && e.at; if (a && typeof a.x === 'number') puff(a.x, (a.y || (pp() ? pp().y : 0)) + 0.3, a.z, { color: '#ffe8a3', up: 1, count: 10 }); });

  // ---- Auftrag geschafft ----
  ev.on('quest:complete', (e) => {
    if (!e || e.kurz) return;
    const p = pp();
    const d = engine.get(e.id);
    const col = (d && d.patch && d.patch.color) || '#ffd166';
    if (p && fx()) {
      fx().emit({ x: p.x, y: p.y + 1, z: p.z, count: 34, spread: 0.8, up: 3.2, speed: 3, color: '#ffd166', size: 0.18, life: 1.4, gravity: -1.2, drag: 1.2, additive: true });
      fx().emit({ x: p.x, y: p.y + 0.4, z: p.z, count: 22, spread: 1.2, up: 1.2, speed: 2.4, color: col, size: 0.2, life: 1.2, gravity: -0.6, drag: 1.4, additive: true });
    }
    shake(0.14, 0.35);
    if (game.audio) setTimeout(() => game.audio.play('chime'), 260);
  });

  // ---- Aufnäher-Moment ----
  const queue = [];
  let shown = 0, waitT = null, el = null;
  const busy = () => !game.started || game.paused || (game.dialogue && game.dialogue.isOpen) || (game.ui && game.ui.overlay && game.ui.overlay.count > 0)
    || (game.session && game.session.ending) || (game.scenes && game.scenes.isInterior) || (hasDOM && !!document.querySelector('[data-overlay="minigame"]'));
  function pump(tries = 0) {
    clearTimeout(waitT); waitT = null;
    if (!queue.length) return;
    if (busy()) { if (tries < 300) waitT = setTimeout(() => pump(tries + 1), 700); else queue.length = 0; return; }
    show(queue.shift());
  }
  function show(unit) {
    shown++;
    const d = engine.get(unit) || {};
    const pa = d.patch || {};
    const col = pa.color || '#ffd166';
    const ic = pa.icon && hasIcon(pa.icon) ? pa.icon : 'stern';
    // (bewusst kein Kamera-Schwenk: ein harter Blickwechsel irritiert; der Funkenkranz landet auf der Figur)
    const p = pp();
    if (p && fx()) setTimeout(() => { const q = pp(); if (q) fx().emit({ x: q.x, y: q.y + 1.3, z: q.z, count: 28, spread: 0.35, up: 0.8, speed: 1.6, color: col, size: 0.14, life: 1.1, gravity: 0.4, drag: 2, additive: true }); }, 1500);
    if (game.audio) { game.audio.play('unlock'); setTimeout(() => game.audio.play('restore'), 1450); }
    if (ev) ev.emit('patch:reveal', { unit });
    if (!hasDOM) return;
    const root = (game.ui && game.ui.root) || document.getElementById('hud');
    if (!root) return;
    if (el) el.remove();
    el = document.createElement('div');
    el.className = 'patch-reveal';
    el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--pc', col);
    el.innerHTML = `<div class="pr-badge"><span class="pr-ring"></span>${icon(ic, { size: 54 })}<span class="pr-shine"></span></div>`;
    root.appendChild(el);
    const mine = el;
    setTimeout(() => { if (mine.isConnected) mine.remove(); if (el === mine) el = null; }, 2600);
  }
  ev.on('patch:unlock', (e) => { if (!e || !e.unit) return; queue.push(e.unit); clearTimeout(waitT); waitT = setTimeout(() => pump(), 900); });
  ev.on('state:reset', () => { queue.length = 0; clearTimeout(waitT); if (el) { el.remove(); el = null; } });

  return { reveal: (unit) => show(unit), get pending() { return queue.length; }, get shown() { return shown; } };
}
