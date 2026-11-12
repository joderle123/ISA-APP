// Kielpost-Plugin (BAUPLAN §2.1 A1/A2, Kostprobe „Die Kielpost fährt“): das alte Postboot am Steg, frei fahren im
// Schären-Sektor, Anlegen, Rückruf, sicheres Beenden. Bergen (systems/bergen) und Werft (systems/werft) hängen daran.
//   · Verfügbar nach OTTER: flags.boot.da (Ende von m0-finale) oder j1-e03 fertig/kurz (auch HERZGLAS-99).
//     Vorher liegt die Kielpost unsichtbar in der Hafengrotte.
//   · Einsteigen am Steg (Aktion „Einsteigen“). Beim ersten Ablegen erwischt dich Ilda (Dialog boot-ilda-laterne,
//     Plan für die Laterne → flags.boot.plan.laterne). Aussteigen: am Steg langsam werden → „Aussteigen“ (oder Springen tippen).
//   · Nur EIN Anleger (Kürzungsliste Punkt 4): der Steg. Pause → „Zurück zum Steg“ holt das Boot zurück.
//   · Hartes Beenden: Der Spielstand speichert nie „auf dem Wasser“. Wer auf See zuklappt, steht beim Laden am Steg.
//     Gesichert wird bei jedem abgeschlossenen Schritt (Anlegen, Fund, Teil, Nebel auf).
//   · Nebelwand vor der Wrackbank: ohne Laterne dreht das Boot sanft ab (Glimm „Zu dicht. Licht?“), mit Laterne löst
//     sie sich beim Hineinfahren auf (boot.nebel.wrackbank).
//   Spielstand: boot { gefahren, ilda, teile[], nebel{ wrackbank } } · flags.boot.da · flags.boot.plan.laterne
//   Ereignisse: boot:enter/exit (Move) · kielpost:board · kielpost:dock {via} · kielpost:fog-open · boot:bump · boot:gust
//   game.plugins.kielpost → { boat, schaeren, available(), onBoat, board({ skipIlda }), leave(), recall(), goal() }
//   Debug: LUMO.debug.kielpost.{ board, leave, recall, place(x, z, yaw), unlock() }
import { createBoat } from '../../actors/boot.js';
import { createSchaeren, SCHAEREN } from '../../world/schaeren.js';
import { SITES, worldLimitAt } from '../../world/island.js';

// Liegeplatz an der Westseite des Stegs (Bug zur See) und Landepunkt auf den Planken
export const MOOR = { x: 2.4, z: 146, yaw: 0 };
export const LAND = { x: 5.4, z: 145, yaw: -Math.PI / 2 };
const DOCK_BOXES = [
  { x0: 3.9, x1: 8.1, z0: 125, z1: 152.6 },    // Steg
  { x0: 8.3, x1: 11.1, z0: 141.6, z1: 148.4 }, // Ildas Boot
];

const CSS = `
.kp-hud{position:absolute;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:none;z-index:6;transition:opacity .3s ease}
.kp-hud.is-off{opacity:0}
.kp-mats{display:flex;gap:6px;background:rgba(20,24,48,.62);border-radius:999px;padding:6px 10px}
.kp-mat{display:flex;align-items:center;gap:5px;font:800 15px/1 system-ui,sans-serif;color:#fff;padding:2px 6px;border-radius:999px}
.kp-mat i{display:inline-block;width:14px;height:14px;border-radius:4px;box-shadow:inset 0 -2px 0 rgba(0,0,0,.25)}
.kp-mat.is-up{animation:kpUp .7s ease}
@keyframes kpUp{0%{transform:scale(1)}40%{transform:scale(1.35);background:rgba(255,209,102,.45)}100%{transform:scale(1)}}
.kp-keys{display:flex;gap:8px;font:700 13px/1.2 system-ui,sans-serif;color:#fff;transition:opacity .6s ease}
.kp-keys span{background:rgba(20,24,48,.55);border-radius:999px;padding:5px 10px}
.kp-keys.is-off{opacity:0}
`;

function registerSounds(audio) {
  const reg = (name, fn) => { if (!audio.has || !audio.has(name)) audio.register(name, fn); };
  const H = audio.helpers;
  reg('bootStoss', (ctx) => { const t = ctx.currentTime; const o = H.tone('sine', 120, t, 0.004, 0.22, 0.25); if (o) o.o.frequency.exponentialRampToValueAtTime(60, t + 0.2); H.burst(t, 0.12, 'lowpass', 600, 0.7, 0.12); });
  reg('moewe', (ctx, sfx, rev) => { const t = ctx.currentTime; for (let i = 0; i < 3; i++) { const o = H.tone('triangle', 1500, t + i * 0.16, 0.01, 0.05, 0.13, rev); if (o) o.o.frequency.exponentialRampToValueAtTime(900, t + i * 0.16 + 0.12); } H.burst(t, 0.35, 'bandpass', 2600, 1.4, 0.03); });
  reg('boe', (ctx) => { const t = ctx.currentTime; const b = H.burst(t, 1.2, 'bandpass', 500, 0.5, 0.07); if (b) b.f.frequency.exponentialRampToValueAtTime(1400, t + 0.6); });
  reg('boeSchub', (ctx, sfx, rev) => { const t = ctx.currentTime; H.tone('triangle', 660, t, 0.01, 0.06, 0.25, rev); H.tone('triangle', 990, t + 0.08, 0.01, 0.05, 0.3, rev); H.burst(t, 0.5, 'highpass', 1800, 0.6, 0.05); });
  reg('ablegen', (ctx) => { const t = ctx.currentTime; H.burst(t, 0.5, 'lowpass', 700, 0.6, 0.08); H.tone('sine', 180, t, 0.01, 0.1, 0.3); });
}

export default {
  id: 'kielpost', order: 66.5, deps: ['ui', 'bewegung', 'dialogue', 'npcs'],
  install(game) {
    const { events, state, player, ui, world, scene, particles, audio, content, interactions } = game;
    const island = world.island;
    registerSounds(audio);
    if (typeof document !== 'undefined' && !document.getElementById('kp-css')) { const s = document.createElement('style'); s.id = 'kp-css'; s.textContent = CSS; document.head.appendChild(s); }
    const TEILE = content.get('boot', 'teile') || { materialien: [], teile: [], zeilen: {}, ziele: {} };
    const line = (k) => (TEILE.zeilen && TEILE.zeilen[k] && (TEILE.zeilen[k].glimm || TEILE.zeilen[k].label)) || '';

    // ---- Welt: Schären + Boot ----
    const schaeren = createSchaeren({ scene, veil: world.veil, particles, audio, quality: { name: game.quality.name }, gullSource: world.life && world.life.gulls });
    world.schaeren = schaeren;
    const boat = createBoat({ game, variant: 'kielpost' });
    boat.place(MOOR.x, MOOR.z, MOOR.yaw);
    world.kielpost = boat;

    const teileNow = () => { const t = state.get('boot.teile', []) || []; return { ausleger: t.includes('ausleger'), segel: t.includes('segel'), laterne: t.includes('laterne') }; };
    const available = () => !!state.get('flags.boot.da') || ['fertig', 'kurz'].includes(state.get('units.j1-e03'));
    const fogOpen = () => !!state.get('boot.nebel.wrackbank');
    const onBoat = () => player.state === 'boot';
    function sync() {
      boat.visible = available();
      boat.setTeile(teileNow());
      if (fogOpen() && schaeren.fogActive) schaeren.dissolveFog({ instant: true });
    }
    sync();
    state.on('boot', sync);
    state.on('units', sync);
    state.on('flags', sync);
    events.on('state:reset', () => { if (onBoat()) player.teleport(LAND.x, LAND.z, LAND.yaw); boat.place(MOOR.x, MOOR.z, MOOR.yaw); sync(); });
    if (game.save && game.save.onApply) game.save.onApply(() => sync());

    // ---- Kollision für das Boot: Land, Steg, Schären, Weltrand ----
    const _n = { x: 0, y: 1, z: 0 };
    function hit(x, z) {
      const r = Math.hypot(x, z);
      const lim = worldLimitAt(x, z) - 1.5;
      if (r > lim) return { nx: -x / r, nz: -z / r };
      for (const b of DOCK_BOXES) {
        const px = Math.max(b.x0, Math.min(b.x1, x)), pz = Math.max(b.z0, Math.min(b.z1, z));
        const dx = x - px, dz = z - pz, d = Math.hypot(dx, dz);
        if (d < 1.2) {
          if (d > 1e-3) return { nx: dx / d, nz: dz / d };
          const cx = (b.x0 + b.x1) / 2; return { nx: x < cx ? -1 : 1, nz: 0 };
        }
      }
      const s = schaeren.hit(x, z, 1.2);
      if (s) return s;
      if (island.getHeight(x, z) > -0.6) {
        const n = island.getNormal(x, z, true, _n);
        const l = Math.hypot(n.x, n.z);
        if (l > 1e-3) return { nx: n.x / l, nz: n.z / l };
        return { nx: -x / (r || 1), nz: -z / (r || 1) };
      }
      return null;
    }
    const env = { hit, push: (x, z) => schaeren.fogPush(x, z) };
    const boatEnv = () => (teileNow().laterne ? { hit } : env);
    player.setWorld({ boat, boatEnv });

    // ---- Einsteigen / Aussteigen / Rückruf ----
    let boarding = false;
    async function board({ skipIlda = false } = {}) {
      if (!available() || onBoat() || boarding) return false;
      boarding = true;
      try {
        if (!state.get('boot.ilda') && !skipIlda && game.dialogue && content.has('dialogues', 'boot-ilda-laterne')) {
          const ilda = game.npcs && game.npcs.get ? game.npcs.get('ilda') : null;
          if (ilda && ilda.warpTo && ilda.setOverride) {
            const nx = LAND.x + 0.2, nz = LAND.z - 3.2, y = Math.atan2(LAND.x - nx, LAND.z - nz);
            ilda.warpTo(nx, nz, y); ilda.setOverride({ x: nx, z: nz, yaw: y, anim: 'idle' });
          }
          const r = await game.dialogue.play('boot-ilda-laterne').catch(() => null);
          if (ilda && ilda.clearOverride) ilda.clearOverride();
          if (!r || !r.end) return false;   // Rückzug: nichts passiert, einfach später nochmal
          state.set('boot.ilda', true);
        }
        if (skipIlda && !state.get('flags.boot.plan.laterne')) state.set('flags.boot.plan.laterne', true);
        boat.place(MOOR.x, MOOR.z, MOOR.yaw);
        player.go('boot');
        audio.play('ablegen');
        const first = !state.get('boot.gefahren');
        state.set('boot.gefahren', true);
        keysT = first ? 14 : 6;
        if (first && ui.glimm) setTimeout(() => ui.glimm(line('ersteFahrt'), { seconds: 3 }), 1600);
        if (game.cameraRig) { game.cameraRig.behindPlayer(); }
        events.emit('kielpost:board', { first });
        return true;
      } finally { boarding = false; }
    }
    function dock(via = 'steg') {
      if (!onBoat()) return false;
      player.teleport(LAND.x, LAND.z, LAND.yaw);
      boat.place(MOOR.x, MOOR.z, MOOR.yaw);
      if (game.cameraRig) { game.cameraRig.behindPlayer(); game.cameraRig.snap(); }
      events.emit('kielpost:dock', { via });
      if (game.save && game.save.request) game.save.request('force');   // Anlegen = abgeschlossener Schritt
      return true;
    }
    const leave = () => dock('steg');
    // Pause → „Zurück zum Steg“: kurze Blende, dann am Steg
    function recall() {
      if (!onBoat()) return false;
      if (ui.flash) ui.flash(0.5);
      audio.play('whoosh', { duration: 0.8 });
      return dock('rueckruf');
    }
    // Wer den Bootszustand anders verlässt (Teleport, Szene), dessen Boot kehrt an den Steg zurück
    events.on('player:state', (e) => { if (e && e.prev === 'boot' && e.state !== 'boot' && Math.hypot(boat.x - MOOR.x, boat.z - MOOR.z) > 0.5) boat.place(MOOR.x, MOOR.z, MOOR.yaw); });

    const nearMoor = () => Math.hypot(boat.x - MOOR.x, boat.z - MOOR.z) < 8 && boat.speed < 3.5;
    const pp = () => player.position;
    const einItem = interactions.add({ id: 'kielpost-einsteigen', x: LAND.x - 0.6, z: LAND.z + 0.6, radius: 2.8, label: 'Einsteigen', priority: 1, enabled: false, onAction: () => { board(); } });
    const ausItem = interactions.add({ id: 'kielpost-aussteigen', x: () => pp().x, z: () => pp().z, radius: 1, label: 'Aussteigen', priority: 2, enabled: false, onAction: () => leave() });

    // Pause-Menü: Knopf „Zurück zum Steg“, solange man fährt
    events.on('ui:overlay', (e) => {
      if (!e || e.id !== 'pause' || !e.open || !onBoat() || !ui.overlay) return;
      const h = ui.overlay.get('pause');
      const grid = h && h.el && h.el.querySelector('.menu-grid');
      if (!grid || grid.querySelector('[data-go="steg"]')) return;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'menu-btn'; b.dataset.go = 'steg';
      b.innerHTML = `${ui.icon ? ui.icon('anker', { size: 26 }) : ''}<span>Zurück zum Steg</span>`;
      b.addEventListener('click', () => { audio.play('tile'); ui.overlay.close('pause', 'steg'); recall(); });
      grid.insertBefore(b, grid.children[1] || null);
    });

    // Hartes Beenden: nie „auf dem Wasser“ speichern – dann gilt der Steg
    if (game.save && game.save.onCapture) game.save.onCapture((d) => { if (onBoat() && game.started) d.pos = { scene: 'welt', x: LAND.x, z: LAND.z, yaw: LAND.yaw }; });

    // ---- HUD: Material (nur auf dem Boot oder an der Werft) + kurze Steuer-Hinweise ----
    let hud = null, keysEl = null, keysT = 0;
    const matEls = {};
    if (typeof document !== 'undefined' && ui.root) {
      hud = document.createElement('div');
      hud.className = 'kp-hud is-off';
      hud.innerHTML = `<div class="kp-keys is-off"><span>Springen halten: Segel dicht</span><span>Aktion halten: Haken</span></div><div class="kp-mats"></div>`;
      const mats = hud.querySelector('.kp-mats');
      for (const m of TEILE.materialien || []) {
        const el = document.createElement('span');
        el.className = 'kp-mat'; el.dataset.mat = m.id;
        el.innerHTML = `<i style="background:${m.color}"></i><b>${m.name}</b> <em>0</em>`;
        mats.appendChild(el); matEls[m.id] = el;
      }
      keysEl = hud.querySelector('.kp-keys');
      ui.root.appendChild(hud);
    }
    const lastMat = {};
    function hudUpdate(dt) {
      if (!hud) return;
      const W = SITES.werft;
      const nearWerft = Math.hypot(pp().x - W.x, pp().z - W.z) < 7 && available();
      const blocked = (game.dialogue && game.dialogue.isOpen) || (ui.overlay && ui.overlay.count > 0 && !(ui.overlay.isOpen && ui.overlay.isOpen('werft')));
      const show = (onBoat() || nearWerft) && !blocked;
      hud.classList.toggle('is-off', !show);
      keysT = Math.max(0, keysT - dt);
      keysEl.classList.toggle('is-off', !(onBoat() && keysT > 0));
      const m = state.get('bergen.material', {}) || {};
      for (const k of Object.keys(matEls)) {
        const v = m[k] || 0;
        if (lastMat[k] !== v) { matEls[k].querySelector('em').textContent = String(v); if (lastMat[k] !== undefined && v > lastMat[k]) { matEls[k].classList.remove('is-up'); void matEls[k].offsetWidth; matEls[k].classList.add('is-up'); } lastMat[k] = v; }
      }
    }

    // ---- pro Frame: Boot am Steg schaukelt, Gischt, Nebel, Hinweise ----
    let sprayT = 0, fogMsgT = 0, gustFx = 0;
    const N = SCHAEREN.nebel;
    events.on('boot:bump', (e) => {
      audio.play('bootStoss');
      if (game.cameraRig && game.cameraRig.shake) game.cameraRig.shake(0.12, 0.3);
      particles.emit({ x: e.x, y: 0.3, z: e.z, count: 14, spread: 0.8, speed: 2.2, up: 3, color: 0xeafcff, size: 0.45, life: 0.8, gravity: -8, drag: 1, alpha: 0.8 });
      schaeren.gullUp(e.x, e.z);
    });
    events.on('boot:gust', () => { if (onBoat()) { audio.play('boe'); gustFx = 1.6; } });
    game.addUpdate((dt, t) => {
      schaeren.update(dt, t);
      if (!onBoat() && boat.visible) boat.idle(dt);
      hudUpdate(dt);
      // Einsteigen nur, wenn das Boot da ist und man zu Fuß am Steg steht
      einItem.enabled = available() && (player.state === 'ground') && !boarding;
      ausItem.enabled = onBoat() && nearMoor();
      if (!onBoat()) return;
      const st = boat.state;
      // Springen tippen am Steg = aussteigen
      if (ausItem.enabled && player.intent.jumpTap) { leave(); return; }
      // Gischt am Bug (Menge nach Tempo, das Partikel-Budget begrenzt ohnehin)
      const sp = boat.speed;
      sprayT -= dt;
      if (sp > 2.2 && sprayT <= 0) {
        sprayT = 0.09 - Math.min(0.05, sp * 0.004);
        const fx = Math.sin(boat.yaw), fz = Math.cos(boat.yaw), rx = Math.cos(boat.yaw), rz = -Math.sin(boat.yaw);
        for (const s of [-1, 1]) particles.emit({ x: boat.x + fx * 2.6 + rx * s * 0.7, y: boat.y + 0.25, z: boat.z + fz * 2.6 + rz * s * 0.7, vx: rx * s * 1.6 + fx * sp * 0.3, vz: rz * s * 1.6 + fz * sp * 0.3, count: 2, spread: 0.2, speed: 0.6, up: 1.2 + sp * 0.12, color: 0xf2fdff, size: 0.35 + sp * 0.02, life: 0.55, gravity: -7, drag: 1.2, alpha: 0.75 });
      }
      // Böe: Windstreifen; Segel dicht in der Böe = Schub mit Funken
      if (gustFx > 0) {
        gustFx -= dt;
        if (Math.random() < dt * 14) particles.emit({ x: boat.x + (Math.random() - 0.5) * 10, y: 1.5 + Math.random() * 2, z: boat.z + (Math.random() - 0.5) * 10, vx: Math.sin(boat.yaw) * 6, vz: Math.cos(boat.yaw) * 6, count: 1, spread: 0.1, speed: 0.1, up: 0, color: 0xffffff, size: 0.25, life: 0.7, gravity: 0, drag: 0, alpha: 0.45 });
      }
      if (st.boostT > 1.3) { audio.play('boeSchub'); particles.emit({ x: boat.x, y: boat.y + 2.2, z: boat.z, count: 14, spread: 1, speed: 1.4, up: 1, color: '#ffd166', size: 0.14, life: 0.8, gravity: -1, drag: 1.4, additive: true }); st.boostT = 1.29; }
      // Nebel: ohne Licht abdrehen + Glimm, mit Licht auflösen
      fogMsgT = Math.max(0, fogMsgT - dt);
      const dFog = Math.hypot(boat.x - N.x, boat.z - N.z);
      if (schaeren.fogActive && dFog < N.outer + 1.5) {
        if (teileNow().laterne) openFog();
        else if (fogMsgT <= 0 && ui.glimm) { fogMsgT = 9; ui.glimm(line('nebel'), { seconds: 2.6 }); }
      }
    }, { order: -45 });

    function openFog() {
      if (fogOpen()) return false;
      schaeren.dissolveFog();
      state.set('boot.nebel.wrackbank', true);
      if (ui.glimm) ui.glimm(line('nebelAuf'), { seconds: 2.4 });
      events.emit('kielpost:fog-open', { id: 'wrackbank' });
      if (game.save && game.save.request) game.save.request('force');
      return true;
    }

    // ---- Ziel-Zeile ohne Auftrag (systems/quests/objective.js fragt game.freeGoal) ----
    const Z = TEILE.ziele || {};
    function goal() {
      if (!available()) return null;
      const bergen = game.plugins && game.plugins.bergen;
      const werft = game.plugins && game.plugins.werft;
      const built = state.get('boot.teile', []) || [];
      const W = SITES.werft;
      if (!state.get('boot.gefahren')) return { text: Z.einsteigen.label, target: { x: LAND.x, z: LAND.z } };
      if (!built.includes('laterne')) {
        if (werft && werft.canBuild('laterne')) return { text: Z.werft.label, target: { x: W.x, z: W.z } };
        const n = bergen && bergen.nearest({ fogOpen: false });
        return n ? { text: Z.bergen.label, target: { x: n.pos.x, z: n.pos.z } } : null;
      }
      if (!fogOpen()) return { text: Z.nebel.label, target: { x: N.x, z: N.z } };
      const w = bergen && bergen.nearest({ fogOpen: true, kind: 'wrack' });
      if (w) return { text: Z.wrack.label, target: { x: w.pos.x, z: w.pos.z } };
      if (werft && werft.anyBuildable()) return { text: Z.bauen.label, target: { x: W.x, z: W.z } };
      const r = bergen && bergen.nearest({ fogOpen: true });
      if (r) return { text: Z.bergen.label, target: { x: r.pos.x, z: r.pos.z } };
      return null;
    }
    game.freeGoal = goal;

    const D = game.debug || (game.debug = {});
    D.kielpost = {
      board: (o) => board({ skipIlda: true, ...(o || {}) }),
      leave, recall, openFog,
      unlock: () => { state.set('flags.boot.da', true); sync(); return available(); },
      place: (x, z, yaw = 0) => { boat.place(x, z, yaw); return { x: boat.x, z: boat.z }; },
      info: () => ({ onBoat: onBoat(), x: +boat.x.toFixed(2), z: +boat.z.toFixed(2), speed: +boat.speed.toFixed(2), available: available(), fog: schaeren.fogActive, teile: teileNow(), visible: boat.visible }),
    };
    return {
      boat, schaeren, MOOR, LAND, available, get onBoat() { return onBoat(); }, board, leave, recall, openFog, goal, hit,
    };
  },
};
