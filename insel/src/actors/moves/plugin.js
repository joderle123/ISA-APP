// Bewegungs-Plugin (WP12–15, WP19): verbindet Spielfigur, Welt und Oberfläche.
//   game.world.climbables / updrafts / runes / testgrotte · game.plugins.bewegung → { kraftrad, haltring, photomode,
//   setSlow(id, factor|null), sync(), grantAll(), abilitiesFromState() }
// Fähigkeiten kommen aus game.state (abilities, upgrades, feathers, gadgets, wurzeln, bonds, settings.mode/reducedFx);
// ?alles (oder LUMO.debug.grantMoves()) schaltet zum Ausprobieren alle Bewegungen frei.
// Ereignisse (zusätzlich zu den Move-Modulen): time:scale {scale, reasons} · kraft:* · photo:* · player:respawn:*
import { createClimbables } from '../../world/climbables.js';
import { createUpdrafts } from '../../world/updrafts.js';
import { createRunes } from '../../world/runes.js';
import { createTestgrotte } from '../../world/testgrotte.js';
import { createKraftRad } from '../../ui/kraftrad.js';
import { createHaltRing } from '../../ui/haltring.js';
import { createPhotoMode } from '../../ui/photomode.js';
import { CLIMB } from './climb.js';

const FADE_CSS = `
.mv-fade{position:absolute;inset:0;background:#0a0618;opacity:0;pointer-events:none;z-index:20;transition:opacity .3s ease}
.mv-fade.is-on{opacity:1}
.mv-dive{position:absolute;inset:0;pointer-events:none;z-index:8;opacity:0;transition:opacity .6s ease;background:radial-gradient(ellipse 80% 70% at 50% 45%, rgba(20,90,140,.18) 30%, rgba(6,30,70,.62) 100%)}
.mv-dive.is-on{opacity:1}
.mv-slow{position:absolute;inset:0;pointer-events:none;z-index:8;opacity:0;transition:opacity .25s ease;box-shadow:inset 0 0 120px rgba(155,92,255,.45)}
.mv-slow.is-on{opacity:1}
`;

function registerSounds(audio) {
  const reg = (name, fn) => { if (!audio.has || !audio.has(name)) audio.register(name, fn); };
  const H = audio.helpers;
  reg('segelAuf', (ctx, sfx, rev) => { const t = ctx.currentTime; const b = H.burst(t, 0.5, 'bandpass', 700, 0.7, 0.09); if (b) { b.f.frequency.exponentialRampToValueAtTime(2400, t + 0.25); b.f.frequency.exponentialRampToValueAtTime(500, t + 0.5); } H.tone('triangle', 520, t, 0.02, 0.05, 0.3, rev); H.tone('triangle', 780, t + 0.08, 0.02, 0.04, 0.35, rev); });
  reg('greifen', (ctx, sfx) => { const t = ctx.currentTime; H.burst(t, 0.06, 'bandpass', 1800, 1.2, 0.06); H.tone('sine', 160, t, 0.003, 0.08, 0.07); });
  reg('pumpsprung', (ctx, sfx, rev) => { const t = ctx.currentTime; const o = H.tone('sine', 180, t, 0.01, 0.16, 0.35); if (o) o.o.frequency.exponentialRampToValueAtTime(900, t + 0.28); H.burst(t, 0.3, 'bandpass', 900, 0.6, 0.06); H.tone('triangle', 1200, t + 0.05, 0.005, 0.04, 0.3, rev); });
  reg('abtauchen', (ctx, sfx, rev) => { const t = ctx.currentTime; const b = H.burst(t, 0.9, 'lowpass', 900, 0.6, 0.12); if (b) b.f.frequency.exponentialRampToValueAtTime(220, t + 0.8); for (let i = 0; i < 5; i++) H.tone('sine', 600 + i * 170, t + 0.1 + i * 0.09, 0.01, 0.03, 0.2, rev); });
  reg('runenklang', (ctx, sfx, rev) => { const t = ctx.currentTime; [880, 1174, 1568].forEach((f, i) => { const o = H.tone('sine', f, t + i * 0.06, 0.005, 0.06, 0.5, rev); if (o) o.o.frequency.exponentialRampToValueAtTime(f * 1.5, t + i * 0.06 + 0.12); }); });
  reg('dornenbruch', (ctx, sfx) => { const t = ctx.currentTime; H.burst(t, 0.35, 'bandpass', 500, 0.5, 0.18); H.burst(t + 0.05, 0.2, 'highpass', 2000, 0.7, 0.08); H.tone('triangle', 120, t, 0.003, 0.14, 0.2); });
  reg('ausloeser', (ctx, sfx) => { const t = ctx.currentTime; H.tone('square', 2200, t, 0.002, 0.05, 0.03); H.burst(t + 0.04, 0.05, 'highpass', 3000, 0.8, 0.05); H.tone('square', 1500, t + 0.09, 0.002, 0.04, 0.03); });
  reg('radtick', (ctx, sfx) => { const t = ctx.currentTime; H.tone('triangle', 1700, t, 0.002, 0.05, 0.04); });
  reg('radauf', (ctx, sfx, rev) => { const t = ctx.currentTime; H.tone('sine', 440, t, 0.01, 0.06, 0.25, rev); H.tone('sine', 660, t + 0.06, 0.01, 0.05, 0.3, rev); });
}

export default {
  id: 'bewegung', order: 30, deps: [],
  install(game) {
    const { events, state, player, cameraRig, input, audio, world, scene, particles, ui, colliders } = game;
    const island = world.island;
    const params = game.params || new URLSearchParams('');
    input.setClock(() => game.loop.realTime);
    registerSounds(audio);
    // Klangnamen der Move-Module auf die registrierten Klänge legen
    const alias = { segel: 'segelAuf', grab: 'greifen', pump: 'pumpsprung', dive: 'abtauchen', rune: 'runenklang', break: 'dornenbruch' };
    const play0 = audio.play.bind(audio);
    audio.play = (name, opts) => play0(alias[name] && !(audio.has && audio.has(name)) ? alias[name] : name, opts);

    // ---- Welt: kletterbare Flächen, Aufwind, Runen, Testgrotte ----
    const climbables = createClimbables({ scene, island, colliders, veil: world.veil, rng: game.rng, sites: { mangrove: { x: 150, z: -8 }, baumhaus: island.SITES.baumhaus } });
    const updrafts = createUpdrafts({ scene, island, particles, veil: world.veil, quality: game.quality.tier });
    const runes = createRunes({ scene, island, colliders, veil: world.veil, particles });
    const testgrotte = createTestgrotte({ scene, veil: world.veil, island });
    // Federpfad: von der Mangrovenkrone (40 m) westwärts in den Dschungel; Tore, Dornen, Sporen, Tauchring am Tränensee
    const P = island.FEATURES.pool;
    runes.addWithVisual({ id: 'tor-freude', kind: 'tor', emotion: 'freude', x: 136, z: -26, y: 33, r: 2.6, yaw: Math.atan2(150 - 136, -8 + 26) });
    runes.addWithVisual({ id: 'tor-angst', kind: 'tor', emotion: 'angst', x: 120, z: -46, y: 26, r: 2.6, yaw: Math.atan2(136 - 120, -26 + 46) });
    runes.addWithVisual({ id: 'dornen-lichtung', kind: 'dornen', x: 104, z: -62, hw: 4, hd: 0.7, h: 6, yaw: Math.atan2(120 - 104, -46 + 62) });
    runes.addWithVisual({ id: 'tor-wut', kind: 'tor', emotion: 'wut', x: 110, z: -56, y: 19, r: 2.6, yaw: Math.atan2(120 - 110, -46 + 56) });
    runes.addWithVisual({ id: 'sporen-teich', kind: 'sporen', x: P.x + 9, z: P.z - 9, y: P.level + 6, r: 4.5 });
    runes.addWithVisual({ id: 'tor-ekel', kind: 'tor', emotion: 'ekel', x: P.x + 16, z: P.z - 15, y: P.level + 8, r: 2.6, yaw: Math.atan2(104 - (P.x + 16), -62 - (P.z - 15)) });
    runes.addWithVisual({ id: 'tor-trauer', kind: 'tor', emotion: 'trauer', x: P.x + 3, z: P.z - 3, y: P.level + 9, r: 2.6, yaw: Math.atan2(P.x + 16 - (P.x + 3), (P.z - 15) - (P.z - 3)) });
    runes.addWithVisual({ id: 'tauchring-traenensee', kind: 'tauchring', x: P.x, z: P.z, r: 2.2 });
    runes.addWithVisual({ id: 'tor-ueberraschung', kind: 'tor', emotion: 'ueberraschung', x: 72, z: -76, y: 14, r: 2.6, yaw: Math.atan2(P.x - 72, P.z + 76) });
    world.climbables = climbables; world.updrafts = updrafts; world.runes = runes; world.testgrotte = testgrotte;
    player.setWorld({ climbables, updrafts, runes, water: world.water, diveRoom: testgrotte, cameraSnap: () => { cameraRig.behindPlayer(); cameraRig.snap(); } });
    game.addUpdate((dt, t) => { updrafts.update(dt, t, player.position); runes.update(dt, t, player.position); }, { order: -15 });

    // ---- Zeitlupe (Kraft-Rad 25 %, Angst-Segel 50 %) ----
    const slow = new Map();
    function setSlow(id, factor) {
      if (factor === null || factor === undefined || factor >= 1) slow.delete(id); else slow.set(id, factor);
      let f = 1; for (const v of slow.values()) f = Math.min(f, v);
      if (game.loop.timeScale !== f) { game.loop.timeScale = f; events.emit('time:scale', { scale: f, reasons: [...slow.keys()] }); slowEl.classList.toggle('is-on', f < 1); }
      player.ctx.worldTimeScaled = f < 1;
    }

    // ---- HUD-Ebenen: Blende (Neustart), Tauch-Tönung, Zeitlupe ----
    const style = document.createElement('style'); style.textContent = FADE_CSS; document.head.appendChild(style);
    const fadeEl = document.createElement('div'); fadeEl.className = 'mv-fade'; ui.root.appendChild(fadeEl);
    const diveEl = document.createElement('div'); diveEl.className = 'mv-dive'; ui.root.appendChild(diveEl);
    const slowEl = document.createElement('div'); slowEl.className = 'mv-slow'; ui.root.appendChild(slowEl);
    events.on('player:respawn:start', () => { fadeEl.classList.add('is-on'); });
    events.on('player:respawn', () => { setTimeout(() => fadeEl.classList.remove('is-on'), 120); if (ui.toast) ui.toast('Nochmal. Kostet nur Sekunden.', 1800); });
    events.on('dive:room', (e) => { diveEl.classList.add('is-on'); cameraRig.bounds = e.bounds || null; cameraRig.snap(); });
    events.on('dive:exit', () => { diveEl.classList.remove('is-on'); cameraRig.bounds = null; });
    events.on('segel:mode', (e) => setSlow('segel', e.timeScale && e.timeScale < 1 ? e.timeScale : null));
    events.on('player:state', (e) => { if (e.prev === 'glide' && e.state !== 'glide') setSlow('segel', null); });

    // ---- Oberfläche: Kraft-Rad, Halt-Ring, Fotomodus ----
    const kraftrad = createKraftRad({ root: ui.root, input, events, game, audio });
    const haltring = createHaltRing({ root: ui.root, game, events });
    const photomode = createPhotoMode({ root: ui.root, game, events, audio });
    events.on('kraftrad:open', () => setSlow('kraftrad', 0.25));
    events.on('kraftrad:close', () => setSlow('kraftrad', null));
    events.on('kraftrad:feather', (e) => { player.glide.setMode(e.emotion, null, 'rad'); kraftrad.setActiveFeather(e.emotion); });
    events.on('kraft:active', (e) => { const s = kraftrad.segments.find((x) => x.id === e.id); if (ui.setPower) ui.setPower({ enabled: true, label: s ? s.label : 'Kraft' }); });
    events.on('kraftrad:locked', () => { if (ui.toast && game.started) ui.toast('Diese Kraft kommt noch.', 1600); });
    events.on('segel:open', () => { if (player.glide.feathers.length) kraftrad.setFeathers(player.glide.feathers); });
    events.on('segel:close', () => kraftrad.setFeathers(null));
    events.on('segel:mode', (e) => kraftrad.setActiveFeather(e.mode));
    game.addUpdate((dt, t, real) => haltring.update(real), { order: 92, always: true });
    if (ui.registerMenuPage) ui.registerMenuPage({ id: 'foto', label: 'Fotomodus', icon: 'kamera', order: 70, render: (p) => {
      p.innerHTML = '<p class="menu-note">Ein Bild von deinem Moment. Bleibt nur auf diesem Gerät.</p><div class="menu-grid"><button class="menu-btn is-primary" type="button" data-foto>Fotomodus starten</button></div>';
      p.querySelector('[data-foto]').addEventListener('click', () => { audio.play('click'); if (ui.overlay && ui.overlay.closeAll) ui.overlay.closeAll(); else if (ui.closeMenu) ui.closeMenu(); setTimeout(() => photomode.enter(), 60); });
    } });

    // ---- Tragen: Aktion = Absetzen, andere Interaktionen ruhen ----
    events.on('carry:start', () => { if (ui.setAction) ui.setAction('Absetzen'); });
    events.on('carry:drop', () => { if (ui.setAction) ui.setAction(null); });
    game.addUpdate(() => {
      if (!player.carrying) return;
      game.interactions.lock(0.2);
      if (ui.el && ui.el.actionLbl && ui.el.actionLbl.textContent !== 'Absetzen') ui.setAction('Absetzen');
      if (input.state.action && player.enabled) player.drop();
    }, { order: -35 });

    // ---- Fähigkeiten und Halt aus dem Zustand ----
    const KIND_OF = (w) => { const s = typeof w === 'string' ? w : (w && (w.kind || w.id)) || ''; return s.startsWith('mensch') || s.startsWith('bond') ? 'mensch' : s.startsWith('ort') || s.includes('lieblingsort') ? 'ort' : s.includes('krabbe') || s.includes('tier') ? 'tier' : s.includes('karte') || s.includes('wenn') ? 'karte' : 'wurzel'; };
    let forceAll = params.has('alles') || params.has('allmoves');
    function abilitiesFromState() {
      const ab = state.get('abilities', []) || [], up = state.get('upgrades', []) || [], gd = state.get('gadgets', []) || [];
      return {
        klettern: forceAll || ab.includes('klettern'),
        segel: forceAll || ab.includes('segel'),
        schwimmen: forceAll || ab.includes('schwimmen'),
        tauchen: forceAll || ab.includes('tauchen'),
        pump: forceAll || up.includes('ruhe.koerper') || gd.includes('pumpsprung'),
        kombi: forceAll || up.includes('segel.kombi'),
      };
    }
    function sync() {
      player.setAbilities(abilitiesFromState());
      const feathers = forceAll ? ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'] : (state.get('feathers', []) || []);
      player.glide.setFeathers(feathers);
      // Halt-Ring: Basis + Bindungsstufen + Extras (Lieblingsort, Krabbe, Wenn-dann), höchstens 12
      const w = state.get('wurzeln', { base: 3, extra: [] }) || {};
      const bonds = state.get('bonds', {}) || {};
      const kinds = [];
      for (let i = 0; i < (w.base || 3); i++) kinds.push('wurzel');
      for (const [npc, lvl] of Object.entries(bonds)) for (let i = 0; i < (Number(lvl) || 0); i++) kinds.push('mensch');
      for (const e of w.extra || []) kinds.push(KIND_OF(e));
      const n = Math.min(CLIMB.maxSegments, kinds.length);
      player.halt.setSegments(n);
      if (player.state !== 'climb') player.halt.fill();
      haltring.setKinds(kinds.slice(0, n));
      // Modus: Profi wählt Segel selbst; reduzierte Effekte dämpfen die Kamera
      const mode = state.get('settings.mode', 'abenteuer');
      player.glide.autoSwitch = mode !== 'profi';
      cameraRig.reducedFx = !!state.get('settings.reducedFx');
      if (mode === 'entspannt') player.setModifiers({ glideVisualOnly: true }); else player.setModifiers({ glideVisualOnly: false });
      // Kraft-Rad: 4 Kräfte je nach Fähigkeit
      const ab = state.get('abilities', []) || [], up = state.get('upgrades', []) || [];
      const has = (id) => forceAll || ab.includes(id) || (id === 'teamgeist' && up.includes('teamgeist.ruf'));
      kraftrad.setSegments([
        { id: 'blick', locked: !has('blick') }, { id: 'teamgeist', locked: !has('teamgeist') },
        { id: 'ruhe', locked: !has('ruhe') }, { id: 'mut', locked: !has('mut') },
      ]);
      events.emit('halt:change', { current: player.halt.current, max: player.halt.max, ledge: false, sliding: false, climbing: player.state === 'climb' });
    }
    state.on('abilities', sync); state.on('upgrades', sync); state.on('feathers', sync); state.on('gadgets', sync);
    state.on('wurzeln', sync); state.on('bonds', sync); state.on('settings', sync);
    events.on('state:reset', sync); events.on('ability:grant', sync); events.on('mode:change', sync);
    sync();

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.grantMoves = (on = true) => { forceAll = !!on; sync(); return abilitiesFromState(); };
    D.moves = { climbables, updrafts, runes, kraftrad, haltring, photomode, setSlow, sync, testgrotte };
    D.carryTest = (opts) => player.carry({ id: 'test-tank', kind: 'tank', ...(opts || {}) });

    return { climbables, updrafts, runes, testgrotte, kraftrad, haltring, photomode, setSlow, sync, abilitiesFromState, get forceAll() { return forceAll; } };
  },
};
