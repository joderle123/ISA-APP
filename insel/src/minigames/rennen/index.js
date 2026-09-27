// Vorlage rennen (WP36): Ringe/Checkpoints der Reihe nach in der Welt – Lauf (Hafen-Dächer), Kletterei ohne Bodenkontakt
// (Mangrove), Segeln durch Luftringe (Festringe), Boot mit Ruderwahl je Abschnitt (Bootsrennen). Countdown, HUD mit Zeit,
// Ringzähler und Abstand zum Geist der Bestzeit, Neustart bei Bodenkontakt, Medaillen nach Zeit je Modus.
//   params: { kind:'lauf'|'klettern'|'segeln'|'boot', start: Pos, checkpoints: [Pos…] (Pos mit y = Luftring, rel = Höhe über Grund),
//            radius, noGround (klettern: Standard true), sections: [{ emotion, until }] (boot), ghost (Standard true) }
//   Ergebnis: { seconds, fails, ground, checkpoints, ghost:{ samples, cp } }
import * as THREE from 'three';
import { createRace, createSampler, loadSamples } from './logic.js';
import { createGhost } from '../shell/ghost.js';
import { createBoat } from '../../actors/boot.js';
import { medalCriteria, formatValue } from '../shell/medals.js';
import { EMOTION_ICON, EMOTION_COLOR } from '../../ui/icons.js';

const EMOTIONS = ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'];
const EMOTION_NAME = { freude: 'Freude', wut: 'Wut', angst: 'Angst', trauer: 'Trauer', ekel: 'Ekel', ueberraschung: 'Überraschung' };

export default {
  id: 'rennen', world: true, hint: 'Der nächste Ring leuchtet. Immer der Reihe nach.',
  create(ctx) {
    const { game, def, params, state, audio, ui, events, icon } = ctx;
    const { player, scene, world, cameraRig, input } = game;
    const island = world.island;
    const kind = params.kind || 'lauf';
    const radius = params.radius || (kind === 'boot' ? 3.6 : kind === 'segeln' ? 3.2 : 2.4);
    // Bodenhöhe wie die Spielfigur: Gelände oder begehbare Fläche (Steg, Dach, Podest), fürs Boot der Wasserspiegel
    const groundY = (x, z) => { const t = island.getHeight(x, z); const s = game.colliders && game.colliders.surfaceHeight ? game.colliders.surfaceHeight(x, z, Infinity, 0.65) : -Infinity; return s > t ? s : t; };
    const resolve3 = (pos) => {
      const p = ctx.resolvePos(pos); if (!p) return null;
      let y = p.y;
      if (y === undefined || y === null) y = kind === 'boot' ? island.waterLevel(p.x, p.z) + 0.9 : groundY(p.x, p.z) + (p.rel !== undefined ? p.rel : 1.15);
      return { x: p.x, y, z: p.z, r: p.r || radius };
    };
    const cps = (params.checkpoints || []).map(resolve3).filter(Boolean);
    const startP = resolve3(params.start) || cps[0] || { x: player.position.x, y: player.position.y, z: player.position.z };
    const race = createRace({ checkpoints: cps, noGround: kind === 'klettern' && params.noGround !== false, sections: params.sections || null });
    const n = cps.length;
    const useGhost = params.ghost !== false && !ctx.rueckenwind;
    const bestGhost = useGhost ? (state.get('medals.' + ctx.id + '.ghost') || null) : null;
    const ghostS = bestGhost && bestGhost.samples ? loadSamples(bestGhost.samples) : null;
    let ghost = null, boat = null, rings = [], ruderEl = null, ringMat = null, ringMatDone = null, ringMatNext = null;
    let recorder = createSampler(0.2), cpTimes = [], t = 0, phase = 'neu', stopped = false, hudT = 0, sectionStart = 0, spinT = 0;

    // ---- Ringe ----
    function buildRings() {
      const M = game.props && game.props.materials;
      ringMat = M ? M.glow('#8fa3ff', { intensity: 0.5, veil: false }) : new THREE.MeshBasicMaterial({ color: 0x8fa3ff });
      ringMatNext = M ? M.glow('#2de2c9', { intensity: 1.1, veil: false }) : new THREE.MeshBasicMaterial({ color: 0x2de2c9 });
      ringMatDone = M ? M.glow('#8fd18b', { intensity: 0.35, veil: false }) : new THREE.MeshBasicMaterial({ color: 0x8fd18b });
      const geo = new THREE.TorusGeometry(radius * 0.72, 0.14, 8, 22);
      const flag = new THREE.ConeGeometry(0.28, 0.9, 4);
      cps.forEach((c, i) => {
        const m = new THREE.Mesh(geo, ringMat);
        m.position.set(c.x, c.y, c.z);
        const nxt = cps[i + 1] || cps[i - 1] || { x: c.x, z: c.z + 1 };
        m.rotation.y = Math.atan2(nxt.x - c.x, nxt.z - c.z);
        if (kind === 'boot' || kind === 'lauf') m.rotation.x = 0;
        const f = new THREE.Mesh(flag, ringMat);
        f.position.y = radius * 0.72 + 0.6;
        m.add(f);
        m.userData.i = i;
        scene.add(m);
        rings.push(m);
      });
    }
    function highlight(i) {
      rings.forEach((m, k) => { const mat = k < i ? ringMatDone : k === i ? ringMatNext : ringMat; m.material = mat; m.children[0].material = mat; m.scale.setScalar(1); });
      const c = cps[i];
      if (c && ui.setMarker) ui.setMarker('mg-ring', c.x, c.z, '◉', '#2de2c9'); else if (ui.removeMarker) ui.removeMarker('mg-ring');
      if (game.quests && game.quests.markers && c) game.quests.markers.set({ x: c.x, z: c.z, y: c.y }, { color: '#2de2c9', label: 'Ring' });
    }
    const yawTo = (a, b) => Math.atan2(b.x - a.x, b.z - a.z);

    // ---- Boot: Spielfigur an Deck, Ruderleiste ----
    function mountBoat() {
      boat = createBoat({ game, speed: params.boatSpeed || 8.5 });
      boat.place(startP.x, startP.z, cps[0] ? yawTo(startP, cps[0]) : 0);
      player.lock('boot');
      placePlayerOnBoat();
    }
    function placePlayerOnBoat() {
      if (!boat) return;
      player.position.set(boat.x, boat.deckY, boat.z);
      player.velocity.set(0, 0, 0);
      player.yaw = boat.yaw;
      player.humanoid.group.position.copy(player.position);
      player.humanoid.group.rotation.y = boat.yaw;
    }
    function showRuder() {
      hideRuder();
      const sec = race.section;
      if (!sec) return;
      ruderEl = document.createElement('div');
      ruderEl.className = 'mg-ruder hud-interactive';
      ruderEl.dataset.mgRuder = '1';
      ruderEl.innerHTML = EMOTIONS.map((e, i) => `<button type="button" data-ruder="${e}" style="--tile:${EMOTION_COLOR[e]}" aria-label="${EMOTION_NAME[e]}" title="${EMOTION_NAME[e]} (${i + 1})">${icon(EMOTION_ICON[e], { size: 34 })}</button>`).join('');
      ruderEl.querySelectorAll('[data-ruder]').forEach((b) => b.addEventListener('click', () => chooseRuder(b.dataset.ruder)));
      ui.root.appendChild(ruderEl);
      ctx.line(sec.label || 'Wer steht am Ruder?', 2600);
    }
    function hideRuder() { if (ruderEl) { ruderEl.remove(); ruderEl = null; } }
    function chooseRuder(e) {
      const sec = race.section;
      if (!sec || !ruderEl) return;
      if (e === sec.emotion) {
        race.setRuder(e); hideRuder();
        if (audio) audio.play('chime');
        ctx.line(`${EMOTION_NAME[e]} am Ruder.`, 1400);
        return;
      }
      // Komischer Stillstand: Boot dreht sich, dann Neustart des Abschnitts
      if (audio) audio.play('error');
      hideRuder();
      ctx.line('Stillstand. Falsches Ruder.', 1600);
      if (boat) boat.spin(1.1);
      spinT = 1.2;
    }
    const onSlot = (e) => { if (ruderEl && e && e.n >= 1 && e.n <= 6) chooseRuder(EMOTIONS[e.n - 1]); };

    // ---- Lauf ----
    async function begin(count = 3) {
      phase = 'count';
      ctx.lock(true);
      highlight(0);
      ctx.hudSet({ time: 0, info: `Ring 0/${n}`, ghost: ghostS ? 'Geist läuft mit' : '' });
      await ctx.count(count);
      if (stopped) return;
      ctx.lock(false);
      phase = 'lauf';
      t = 0; race.start(0); recorder = createSampler(0.2); cpTimes = []; sectionStart = 0;
      if (ghost) ghost.show();
      if (ctx.hint) ctx.glimm(ctx.hint);
      if (kind === 'boot') showRuder();
      events.emit('rennen:start', { id: ctx.id, kind, checkpoints: n });
    }
    function toStart() {
      if (kind === 'boot') { if (boat) boat.place(startP.x, startP.z, cps[0] ? yawTo(startP, cps[0]) : 0); placePlayerOnBoat(); }
      else player.teleport(startP.x, startP.z, cps[0] ? yawTo(startP, cps[0]) : player.yaw);
      cameraRig.behindPlayer(); cameraRig.snap();
    }
    function restartRun(reason) {
      race.reset(0);
      toStart();
      ctx.line(reason, 1800);
      begin(1);
    }
    function ghostDelta() {
      if (!bestGhost || !bestGhost.cp || !cpTimes.length) return '';
      const i = cpTimes.length - 1;
      const d = cpTimes[i] - (bestGhost.cp[i] !== undefined ? bestGhost.cp[i] : cpTimes[i]);
      return (d <= 0 ? '−' : '+') + Math.abs(d).toFixed(1).replace('.', ',') + ' s';
    }
    const inst = {
      race, get cps() { return cps; },
      async start() {
        buildRings();
        if (ghostS) ghost = createGhost({ THREE, scene });
        const d = Math.hypot(player.position.x - startP.x, player.position.z - startP.z);
        if (kind === 'boot') mountBoat();
        else if (d > 6 || kind === 'segeln') toStart();
        else { cameraRig.behindPlayer(); }
        events.on('input:slot', onSlot);
        await begin(3);
      },
      update(dt, real) {
        if (phase !== 'lauf' || stopped) return;
        t += dt;
        if (spinT > 0) { spinT -= dt; if (boat) boat.update(dt, { frozen: true }); placePlayerOnBoat(); if (spinT <= 0) { const from = race.section ? Math.max(0, race.sectionIndex > 0 ? (params.sections[race.sectionIndex - 1].until + 1) : 0) : 0; race.reset(from); const c = cps[Math.max(0, from - 1)] || startP; if (boat) boat.place(c.x, c.z, cps[from] ? yawTo(c, cps[from]) : boat.yaw); placePlayerOnBoat(); highlight(from); showRuder(); } return; }
        if (kind === 'boot' && boat) {
          boat.update(dt, { move: input.state.move, camYaw: cameraRig.yaw, frozen: !!ruderEl });
          placePlayerOnBoat();
        }
        const p = player.position;
        const ev = race.update(t, p, { grounded: player.grounded && player.state === 'ground' });
        recorder.add(t, p.x, p.y, p.z);
        if (ev === 'checkpoint' || ev === 'abschnitt') {
          cpTimes.push(t);
          if (audio) audio.play('chime');
          highlight(race.index);
          ctx.hudSet({ info: `Ring ${race.index}/${n}`, ghost: ghostDelta(), behind: ghostDelta().startsWith('+') });
          if (ev === 'abschnitt') showRuder();
        } else if (ev === 'ziel') {
          cpTimes.push(t);
          phase = 'ziel';
          if (ui.removeMarker) ui.removeMarker('mg-ring');
          if (game.quests && game.quests.markers) game.quests.markers.clear();
          ctx.finish({ seconds: +t.toFixed(2), fails: race.fails, ground: race.groundTouches, checkpoints: n, kind, ghost: { samples: recorder.serialize(), cp: cpTimes.map((x) => +x.toFixed(2)) } });
          return;
        } else if (ev === 'boden') {
          if (audio) audio.play('error');
          restartRun('Bodenkontakt. Nochmal.');
          return;
        }
        if (ghost && ghostS) { const g = ghostS.at(t); if (g) ghost.set(g); ghost.update(dt); }
        hudT += real;
        if (hudT > 0.1) { hudT = 0; ctx.hudSet({ time: t }); }
        const nx = rings[race.index];
        if (nx) { const s = 1 + Math.sin(t * 5) * 0.06; nx.scale.setScalar(s); nx.rotation.z = Math.sin(t * 2) * 0.05; }
      },
      stop() {
        stopped = true; phase = 'aus';
        events.off && events.off('input:slot', onSlot);
        for (const m of rings) scene.remove(m);
        if (rings[0]) rings[0].geometry.dispose();
        rings = [];
        if (ghost) { ghost.dispose(); ghost = null; }
        hideRuder();
        if (boat) { player.unlock('boot'); boat.dispose(); boat = null; player.teleport(player.position.x, player.position.z); }
        if (ui.removeMarker) ui.removeMarker('mg-ring');
        if (game.quests && game.quests.markers) game.quests.markers.clear();
        ctx.lock(false);
      },
      // Tests: auto('gold'|'silber'|'bronze'|'fail') beendet den Lauf mit einer passenden Zeit; act('ring') nimmt den nächsten Ring
      auto(level = 'gold') {
        const C = medalCriteria(def, ctx.mode);
        const sec = level === 'fail' ? ((C.bronze && C.bronze.seconds) || 60) + 30 : Math.max(1, ((C[level] && C[level].seconds) || 30) - 1);
        const last = cps[n - 1]; if (last) player.teleport(last.x, last.z);
        const samples = createSampler(0.2); cps.forEach((c, i) => samples.add((i + 1) * (sec / n), c.x, c.y, c.z));
        phase = 'ziel';
        ctx.finish({ seconds: sec, fails: 0, ground: 0, checkpoints: n, kind, auto: true, ghost: { samples: samples.serialize(), cp: cps.map((c, i) => +((i + 1) * (sec / n)).toFixed(2)) } });
      },
      act(name, arg) {
        if (name === 'ring') { const c = cps[race.index]; if (!c || phase !== 'lauf') return false; if (kind === 'boot' && boat) { boat.place(c.x, c.z, boat.yaw); placePlayerOnBoat(); } else player.teleport(c.x, c.z); return true; }
        if (name === 'ruder') { chooseRuder(arg); return true; }
        return false;
      },
      get phase() { return phase; }, get time() { return t; },
    };
    return inst;
  },
};
