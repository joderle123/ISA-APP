// Ziel-Zeile (HUD): immer sichtbar unter dem Kompass – aktueller Schritt (step.label), Pfeil zum Marker relativ zur
// Kamera, Abstand in Metern. Ohne Auftrag: Hinweis auf den nächsten Code (antippen öffnet das Tagebuch).
// Sanfter Stupser: kommt man dem Ziel 40 s lang nicht näher (und ist frei unterwegs), pulsiert die Zeile, der Pfeil
// wird groß und der Marker leuchtet kurz auf. Kein Text von Glimm, keine Strafe.
//   const obj = createObjective({ game, engine, markers }); obj.update(dt) · obj.nudge() · obj.info · obj.el
import { icon } from '../../ui/icons.js';

export const IDLE_NUDGE_S = 40;

export function createObjective({ game, engine, markers }) {
  const hasDOM = typeof document !== 'undefined';
  const root = hasDOM ? (game.ui && game.ui.root) || document.getElementById('hud') : null;
  let el = null, lbl = null, dst = null, arr = null;
  if (root) {
    el = document.createElement('button');
    el.type = 'button';
    el.className = 'quest-obj hud-part is-off';
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = `<span class="qo-arrow" aria-hidden="true">${icon('pfeilhoch', { size: 18 })}</span><span class="qo-label"></span><span class="qo-dist"></span>`;
    lbl = el.querySelector('.qo-label'); dst = el.querySelector('.qo-dist'); arr = el.querySelector('.qo-arrow');
    el.addEventListener('click', () => {
      const j = game.ui && game.ui.journal;
      if (!j || !j.open) return;
      if (game.audio) game.audio.play('open');
      j.open(engine.active ? 'auftraege' : 'code');
    });
    root.appendChild(el);
  }
  const info = { text: '', dist: null, visible: false, nudges: 0, mode: 'none' };
  let textT = 0, idleT = 0, best = Infinity, lastTarget = '', glowT = 0, glowPrev = false;
  const dir = { x: 0, z: -1 };

  function blocked() {
    if (!game.started || game.paused) return true;
    if (game.dialogue && game.dialogue.isOpen) return true;
    const ui = game.ui || {};
    if (ui.overlay && ui.overlay.count > 0) return true;
    if (ui.visible === false) return true;
    if (game.scenes && game.scenes.isInterior) return true;
    if (hasDOM && document.querySelector('[data-overlay="minigame"]')) return true;
    return false;
  }

  function nudge() {
    info.nudges++;
    idleT = -50;   // nächster Stupser frühestens nach ≈ 90 s
    if (el) { el.classList.remove('is-nudge'); void el.offsetWidth; el.classList.add('is-nudge'); }
    if (game.audio) game.audio.play('firefly');
    if (markers && markers.visible) { glowPrev = markers.glow; markers.setGlow(true); glowT = 6; }
    if (game.events) game.events.emit('quest:nudge', { id: engine.active || null });
  }

  function update(dt) {
    if (glowT > 0) { glowT -= dt; if (glowT <= 0 && markers) markers.setGlow(glowPrev); }
    const hide = blocked();
    const active = engine.active;
    const si = active ? engine.stepInfo() : null;
    const step = si && si.step;
    const target = markers && markers.visible ? markers.target : null;
    const p = game.player && game.player.position;
    textT -= dt;
    if (textT <= 0 || hide !== !info.visible) {
      textT = 0.25;
      const text = step ? (step.label || '') : active ? '' : 'Neuer Code? Tagebuch → Code';
      info.mode = step ? 'step' : active ? 'none' : 'code';
      info.text = text;
      info.dist = target && p ? Math.hypot(target.x - p.x, target.z - p.z) : null;
      info.visible = !hide && !!text;
      if (el) {
        if (lbl.textContent !== text) { lbl.textContent = text; if (text) { el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new'); } }
        dst.textContent = info.dist !== null && info.dist > 6 ? Math.round(info.dist) + ' m' : '';
        el.classList.toggle('is-off', !info.visible);
        el.classList.toggle('is-code', info.mode === 'code');
        el.classList.toggle('has-target', !!target);
      }
    }
    // Pfeil: Ziel relativ zur Blickrichtung der Kamera (oben = geradeaus)
    if (el && target && p && info.visible && game.camera) {
      const e = game.camera.matrixWorld.elements;   // Blickrichtung = −Z-Achse der Kamera
      dir.x = -e[8]; dir.z = -e[10];
      const a = Math.atan2(target.x - p.x, target.z - p.z) - Math.atan2(dir.x, dir.z);
      arr.style.transform = `rotate(${(-a * 180 / Math.PI).toFixed(1)}deg)`;
    }
    // Stupser: frei unterwegs, Ziel da, aber seit 40 s nicht näher gekommen (neues Ziel = neue Uhr)
    const key = target ? target.x.toFixed(1) + ',' + target.z.toFixed(1) : '';
    if (key !== lastTarget) { lastTarget = key; best = Infinity; idleT = 0; }
    if (hide || !target || !p) return;
    const d = Math.hypot(target.x - p.x, target.z - p.z);
    if (d < best - 3) { best = d; idleT = Math.min(idleT, 0); }
    if (d < 4) { idleT = 0; return; }
    idleT += dt;
    if (idleT >= IDLE_NUDGE_S) nudge();
  }

  // Rückmeldung für geschaffte Schritte: heller Ton, goldener Funkenkranz um die Figur, kleiner Kamera-Stups
  if (game.events) game.events.on('quest:step:done', (e) => {
    if (!e || e.id !== engine.active) return;
    if (game.audio) game.audio.play('chime');
    const pp = game.player && game.player.position;
    if (game.particles && pp) game.particles.emit({ x: pp.x, y: pp.y + 1.1, z: pp.z, count: 26, spread: 0.6, up: 2.6, speed: 2.2, color: '#ffd166', size: 0.16, life: 1.1, gravity: -1.5, drag: 1.4, additive: true });
    if (game.cameraRig && game.cameraRig.shake) game.cameraRig.shake(0.08, 0.25);
    idleT = 0;
  });

  return { el, info, update, nudge, get idle() { return idleT; } };
}
