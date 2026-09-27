// Herzglas-Chronik (WP54, DESIGN §2): neun Splitter, neun Erinnerungen. Jede Erinnerung ist ein stilles 3D-Diorama in der
// Farbe des Gefühls (Tasche weit weg von der Insel, Kamera fest, Figuren in Zeitlupe) mit einer Bildunterschrift ≤ 12 Wörter.
// Die Chronik-Pinnwand im Baumhaus legt die Splitter als Bilder auf einen Zeitstrahl; freiwillig: Widersprüche und
// „Warum“-Slots (nie ein Ausbruch als Ursache des Graus). Grisel: Silhouette über dem Gipfel ab M3, nah ab acht Splittern,
// Lichtfalter im Finale. Cliffhanger-Pool fürs Lagerfeuer (content 'cliffhangers', liest das Sitzungs-Plugin).
//   game.chronik = game.plugins.chronik → { show(id, { replay }) → Promise<{ memory, shard, replay, closed }>, openBoard(), closeBoard(),
//     isOpen, memories(), memoryOf(shard), found(), placed(), chain(), place(shard, slot), unplace(shard), contradictions(),
//     answer(id, tileId), grisel: { state, refresh(), handle, set(state|null) }, cliffhangers(), active }
//   Ereignisse: memory:show {id, shard, replay} · memory:done {id, shard, replay, closed} · shard:found {shard} · chronik:open/close ·
//     chronik:place {shard, slot, correct} · chronik:why {id, tile, ok} · chronik:solved {id} · chronik:complete · grisel:state {state, prev}
//   Spielstand: shards[] · chronik { placed:[{shard, slot}], solved:[id], seen:[memoryId] } · flags grisel.nah / finale.lichtfalter
//   Debug: LUMO.debug.showMemory(id|shard, replay) · chronik() · openChronik() · placeShard(shard, slot) · solveWhy(id, tile) · grisel(state)
import * as CM from './model.js';
import { buildDiorama } from './diorama.js';
import { esc } from '../../ui/overlay.js';
import { moduleProgress } from '../session/logic.js';

export const MEM_POCKET = { x: 0, y: 320, z: 1240 };
const FADE_MS = 380;

const CSS = `
.mem-fade{position:absolute;inset:0;background:#05030c;opacity:0;pointer-events:none;z-index:21;transition:opacity ${FADE_MS / 1000}s ease}
.mem-fade.is-on{opacity:1}
.ov-erinnerung{background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;align-items:flex-end}
.ov-erinnerung .ov-card{width:min(760px,100%);background:linear-gradient(rgba(5,3,12,.35),rgba(5,3,12,.86));box-shadow:0 0 0 1px var(--glass-line)}
.ov-erinnerung .ov-head{border-bottom:0;padding-bottom:0}
.mem-card{position:relative;padding:4px 4px 2px 12px;border-left:5px solid var(--tint,#ffd166);border-radius:6px}
.mem-kicker{display:block;color:var(--tint,#ffd166);font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:13px;margin-bottom:6px}
.mem-caption{margin:0;font-size:calc(26px * var(--txt-scale));line-height:1.25;font-weight:900}
.mem-chain{display:flex;align-items:center;gap:10px;margin:12px 0 0;font-size:calc(17px * var(--txt-scale));font-weight:700;opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease}
.mem-chain.is-in{opacity:.92;transform:none}
.mem-chain .ico{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--tint,#ffd166);color:#1b1b2a}
.ov-erinnerung .ov-actions{margin-top:14px}
.ch-lead{font-size:16px;opacity:.85;margin:0 0 10px}
.ch-line{display:grid;grid-template-columns:repeat(9,1fr);gap:6px;position:relative;padding:8px 0 4px}
.ch-line::before{content:"";position:absolute;left:4%;right:4%;top:50%;height:3px;background:rgba(255,255,255,.22);border-radius:2px}
.ch-slot{position:relative;aspect-ratio:3/4;border-radius:10px;background:var(--ghost);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px 2px;border:2px dashed rgba(255,255,255,.22);color:inherit;min-width:0}
.ch-slot small{font-size:11px;opacity:.7;font-weight:800}
.ch-slot.is-target{border-color:#2de2c9;border-style:solid}
.ch-slot.is-full{border-style:solid;border-color:var(--tint,#ffd166);background:linear-gradient(rgba(255,255,255,.08),rgba(0,0,0,.2)),var(--tint,#ffd166);color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6)}
.ch-slot.is-correct::after{content:"";position:absolute;left:50%;bottom:-8px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#ffd166;box-shadow:0 0 10px #ffd166}
.ch-slot.is-wobble{animation:ch-wobble .5s ease}
@keyframes ch-wobble{0%,100%{transform:none}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
.ch-tray{display:flex;gap:10px;overflow-x:auto;padding:6px 2px 10px;min-height:96px}
.ch-card{flex:none;width:84px;height:104px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:linear-gradient(rgba(255,255,255,.1),rgba(0,0,0,.25)),var(--tint,#ffd166);color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6);border:3px solid transparent;font-weight:900}
.ch-card.is-on{border-color:#2de2c9;transform:translateY(-4px)}
.ch-card small{font-size:11px;font-weight:800;opacity:.9}
.ch-chain{display:flex;flex-direction:column;gap:6px;margin:6px 0 12px}
.ch-link{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--radius);background:var(--ghost);font-weight:700;font-size:15px}
.ch-link .ico{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--tint,#ffd166);color:#1b1b2a}
.ch-link.is-empty{opacity:.45}
.ch-why{padding:10px 12px;border-radius:var(--radius-l);background:var(--ghost);margin-bottom:10px}
.ch-why-head{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:8px}
.ch-why-head .pair{display:flex;gap:4px}
.ch-why-head .pair i{width:26px;height:26px;border-radius:6px;display:grid;place-items:center;background:var(--a,#ffd166);color:#1b1b2a;font-style:normal;font-size:12px;font-weight:900}
.ch-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.ch-tile{display:flex;align-items:center;gap:8px;padding:10px;border-radius:var(--radius);background:var(--ghost-2);min-height:56px;text-align:left;font-weight:700;color:inherit;border:2px solid transparent}
.ch-tile.is-ok{border-color:#45d15a}
.ch-tile.is-off{opacity:.5}
.ch-solved{display:flex;align-items:center;gap:8px;font-weight:700;color:#45d15a}
.ch-tag{font-size:12px;opacity:.7;text-transform:uppercase;letter-spacing:.06em;margin:10px 0 6px}
.ch-note{font-size:13px;opacity:.65;margin-top:8px}
`;

export default {
  id: 'chronik', order: 67, deps: ['ui', 'welt', 'props', 'npcs', 'session'],
  install(game) {
    const { events, state, content, player, world, ui, scene, THREE, cameraRig } = game;
    const island = world.island, sky = world.sky, veil = world.veil;
    const emit = (n, p) => events.emit(n, p);
    const icon = ui.icon;
    const speech = game.speech || null;
    const audio = game.audio;
    const { part, merge } = game.geom;
    const M = game.props.materials;
    if (typeof document !== 'undefined' && !document.getElementById('ch-css')) { const st = document.createElement('style'); st.id = 'ch-css'; st.textContent = CSS; document.head.appendChild(st); }

    const memories = () => content.list('memories').filter((m) => m && m.shard);
    const memoryOf = (shard) => CM.memoryBy(memories(), Number(shard));
    const found = () => (state.get('shards', []) || []).slice().sort((a, b) => a - b);
    const placed = () => (state.get('chronik.placed', []) || []).filter((p) => p && p.shard && p.slot);
    const solved = () => state.get('chronik.solved', []) || [];
    const chain = () => CM.chainFor(memories(), placed());
    const nameOf = (id) => (game.npcs && game.npcs.nameOf ? game.npcs.nameOf(id) : ((content.get('npcs', id) || {}).name || id));
    const npcLook = (id) => { const d = content.get('npcs', id); return d && d.look ? d.look : {}; };

    // ---- Erinnerung zeigen: Diorama in der Tasche, Kamera fest, Licht übersteuert, Spielfigur unsichtbar ----
    let active = null;    // { def, dio, overlay, saved, resolve, t }
    let fadeEl = null;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    function fade(on) {
      if (!fadeEl && ui.root) { fadeEl = document.createElement('div'); fadeEl.className = 'mem-fade'; ui.root.appendChild(fadeEl); }
      if (!fadeEl) return Promise.resolve();
      fadeEl.classList.toggle('is-on', on);
      return wait(FADE_MS);
    }
    // Schleier-Grundwert, den das Szenen-System gerade gesetzt hat (Innenraum) – nach der Erinnerung wiederherstellen
    const roomVeilNow = () => { const sc = game.scenes; if (!sc || !sc.isInterior || !sc.current) return null; const st = state.get('veil.rooms.' + sc.current.id); if (typeof st === 'number') return st; return typeof sc.current.def.veil === 'number' ? sc.current.def.veil : 0; };
    const _pos = new THREE.Vector3(), _look = new THREE.Vector3();
    function applyLight(dio, t) {
      const tint = new THREE.Color(dio.tint);
      const fogC = tint.clone().multiplyScalar(dio.dark ? 0.22 : 0.42);
      const near = 6 + (1 - dio.blur) * 8, far = 14 + (1 - dio.blur) * 22;
      scene.fog.color.copy(fogC); scene.fog.near = near; scene.fog.far = far;
      game.renderer.setClearColor(fogC, 1);
      veil.uniforms.uFogNearColor.value.copy(fogC);
      veil.uniforms.uFogHeight.value = 0; veil.uniforms.uAerial.value = 0; veil.uniforms.uFogSunAmt.value = 0;
      sky.sun.intensity = dio.dark ? 0.9 : 1.8;
      sky.hemi.color.copy(tint.clone().lerp(new THREE.Color('#ffffff'), 0.45)); sky.hemi.groundColor.copy(fogC); sky.hemi.intensity = dio.dark ? 1.1 : 1.5;
      veil.setGrade({ lift: [tint.r * 0.08, tint.g * 0.08, tint.b * 0.08], gain: [0.85 + tint.r * 0.25, 0.85 + tint.g * 0.25, 0.85 + tint.b * 0.25], sat: 0.8 - dio.blur * 0.25, contrast: 1.04 });
      game.renderer.toneMappingExposure = 1;
      // Kamera: fest mit ganz langsamer Drehung
      const c = dio.camera, a = Math.sin(t * 0.12) * 0.06;
      _pos.set(MEM_POCKET.x + c.pos[0] * Math.cos(a) - c.pos[2] * Math.sin(a), MEM_POCKET.y + c.pos[1], MEM_POCKET.z + c.pos[0] * Math.sin(a) + c.pos[2] * Math.cos(a));
      _look.set(MEM_POCKET.x + c.look[0], MEM_POCKET.y + c.look[1], MEM_POCKET.z + c.look[2]);
      cameraRig.setShot(_pos, _look);
    }
    game.addUpdate((dt, t) => { if (!active) return; active.t += dt; active.dio.update(dt, t); applyLight(active.dio, active.t); }, { order: -7.5, always: true });

    function grantShard(n) {
      if (!n || (state.get('shards', []) || []).includes(n)) return false;
      state.addUnique('shards', n);
      emit('shard:found', { shard: n });
      if (ui.toast) ui.toast(`Splitter ${n} gefunden.`);
      if (audio && audio.play) { try { audio.play('pickup'); } catch (e) { /* egal */ } }
      return true;
    }

    async function show(idOrShard, { replay = false, read = 'auto' } = {}) {
      const def = typeof idOrShard === 'number' ? memoryOf(idOrShard) : content.get('memories', idOrShard) || memoryOf(Number(idOrShard));
      if (!def) return { memory: idOrShard, missing: true };
      if (active) { try { active.overlay.close('replace'); } catch (e) { /* egal */ } await wait(50); }
      const isReplay = replay || (state.get('shards', []) || []).includes(def.shard);
      emit('memory:show', { id: def.id, shard: def.shard, replay: isReplay });
      ui.lock.acquire('erinnerung');
      if (game.interactions && game.interactions.lock) game.interactions.lock(1);
      await fade(true);
      let dio;
      try { dio = buildDiorama(def, { THREE, part, merge, M, createHumanoid: game.createHumanoid, npcLook, rng: game.rng && game.rng.fork ? game.rng.fork('diorama-' + def.id) : null }); }
      catch (e) { console.error('[chronik] Diorama', e); ui.lock.release('erinnerung'); await fade(false); return { memory: def.id, shard: def.shard, error: true }; }
      dio.group.position.set(MEM_POCKET.x, MEM_POCKET.y, MEM_POCKET.z);
      scene.add(dio.group);
      const hum = player.humanoid && player.humanoid.group;
      const saved = { humVisible: hum ? hum.visible : true, camMode: cameraRig.mode, fog: { color: scene.fog.color.clone(), near: scene.fog.near, far: scene.fog.far }, clear: game.renderer.getClearColor(new THREE.Color()), sun: sky.sun.intensity, hemi: [sky.hemi.color.clone(), sky.hemi.groundColor.clone(), sky.hemi.intensity], u: { nearC: veil.uniforms.uFogNearColor.value.clone(), h: veil.uniforms.uFogHeight.value, ae: veil.uniforms.uAerial.value, sa: veil.uniforms.uFogSunAmt.value }, timePaused: sky.time.paused, base: roomVeilNow() };
      if (hum) hum.visible = false;
      sky.time.paused = true;
      if (veil.setBaseOverride) veil.setBaseOverride(0);
      const kicker = `Splitter ${def.shard} · ${nameOf(def.owner)}${def.feeling && CM.FEELING_LABEL[def.feeling] ? ' · ' + CM.FEELING_LABEL[def.feeling] : ''}`;
      const caption = CM.textOf(def.caption), chainSay = def.chain ? CM.textOf(def.chain.say) : '';
      const autoRead = speech && (read === true || (read === 'auto' && speech.settings && speech.settings.autoRead));
      const result = await new Promise((resolve) => {
        let done = false;
        const finish = (closed) => { if (done) return; done = true; resolve({ closed }); };
        const h = ui.overlay.open({
          id: 'erinnerung', title: 'Eine Erinnerung', icon: 'splitter', kind: 'dark', pause: false, backdropClose: false, cls: 'ov-erinnerung', closeLabel: 'Verlassen',
          content: (body) => {
            body.innerHTML = `
              <div class="mem-card" style="--tint:${esc(dio.tint)}">
                <small class="mem-kicker">${esc(kicker)}</small>
                <h3 class="mem-caption">${esc(caption)}</h3>
                ${chainSay ? `<p class="mem-chain" data-chain><span class="ico">${icon('chronik', { size: 18 })}</span><span>${esc(chainSay)}</span></p>` : ''}
                <div class="ov-actions"><button class="btn btn-big" type="button" data-read aria-label="Vorlesen">${icon('lautsprecher', { size: 26 })}<span>Vorlesen</span></button><button class="btn btn-primary btn-big" type="button" data-ok>${icon('check', { size: 26 })}<span>Weiter</span></button></div>
              </div>`;
            body.querySelector('[data-ok]').addEventListener('click', () => h.close('ok'));
            body.querySelector('[data-read]').addEventListener('click', () => { if (speech) speech.speak(caption + (chainSay ? ' ' + chainSay : ''), { who: def.owner, interrupt: true }); });
            setTimeout(() => { const c = body.querySelector('[data-chain]'); if (c) c.classList.add('is-in'); }, 2200);
          },
          onClose: (reason) => finish(reason !== 'ok'),
        });
        active = { def, dio, overlay: h, saved, t: 0 };
        // Kamera sofort in die Tasche setzen (hinter der Blende), sonst gleitet sie sekundenlang durch den Nebel
        applyLight(dio, 0); game.camera.position.copy(_pos); game.camera.lookAt(_look);
        if (autoRead) speech.speak(caption, { who: def.owner, interrupt: true, auto: read !== true });
      });
      // Aufräumen
      if (speech) speech.cancel();
      await fade(true);
      active = null;
      dio.dispose();
      if (hum) hum.visible = saved.humVisible;
      scene.fog.color.copy(saved.fog.color); scene.fog.near = saved.fog.near; scene.fog.far = saved.fog.far;
      game.renderer.setClearColor(saved.clear, 1);
      sky.sun.intensity = saved.sun; sky.hemi.color.copy(saved.hemi[0]); sky.hemi.groundColor.copy(saved.hemi[1]); sky.hemi.intensity = saved.hemi[2];
      veil.uniforms.uFogNearColor.value.copy(saved.u.nearC); veil.uniforms.uFogHeight.value = saved.u.h; veil.uniforms.uAerial.value = saved.u.ae; veil.uniforms.uFogSunAmt.value = saved.u.sa;
      if (sky.grade && veil.setGrade) veil.setGrade(sky.grade);
      sky.time.paused = saved.timePaused;
      if (veil.setBaseOverride) veil.setBaseOverride(saved.base);
      cameraRig.setShot(null);
      if (saved.camMode === 'talk' || saved.camMode === 'photo') cameraRig.mode = saved.camMode; else if (cameraRig.snap) cameraRig.snap();
      ui.lock.release('erinnerung');
      if (!isReplay) grantShard(def.shard);
      state.addUnique('chronik.seen', def.id);
      await fade(false);
      const out = { memory: def.id, shard: def.shard, replay: isReplay, closed: result.closed };
      emit('memory:done', out);
      return out;
    }

    // ---- Zeitstrahl und Widersprüche ----
    function place(shard, slot) {
      shard = Number(shard); slot = Number(slot);
      if (!found().includes(shard)) return { ok: false, correct: false };
      const r = CM.placeShard(placed(), shard, slot);
      if (!r.ok) return { ok: false, correct: false };
      state.set('chronik.placed', r.placed);
      emit('chronik:place', { shard, slot, correct: r.correct });
      if (CM.chainComplete(r.placed)) { state.set('flags.chronik.kette', true); emit('chronik:complete', {}); }
      return { ok: true, correct: r.correct };
    }
    function unplace(shard) { state.set('chronik.placed', CM.unplaceShard(placed(), Number(shard))); return true; }
    function contradictions() { return CM.openContradictions({ shards: found(), placed: placed(), solved: solved() }); }
    function answer(id, tileId) {
      const c = contradictions().find((x) => x.id === id);
      if (!c || !c.ready) return { ok: false, ready: false };
      const r = CM.answerWhy(id, tileId);
      emit('chronik:why', { id, tile: tileId, ok: r.ok });
      if (r.ok && !solved().includes(id)) {
        state.addUnique('chronik.solved', id);
        const n = state.inc('lichtsplitter', 2);
        emit('lichtsplitter:add', { amount: 2, total: n });
        emit('chronik:solved', { id });
        if (audio && audio.play) { try { audio.play('chime'); } catch (e) { /* egal */ } }
      } else if (!r.ok && ui.glimm) ui.glimm('Schau nochmal hin.');
      return { ok: r.ok, ready: true, say: r.say };
    }

    // ---- Pinnwand (Overlay) ----
    let board = null, sel = null;
    function renderBoard(body, h) {
      const mems = memories(), pl = placed(), f = found(), ch = chain();
      const tintOf = (s) => { const m = CM.memoryBy(mems, s); return (m && m.filter && m.filter.tint) || '#ffd166'; };
      const tray = f.filter((s) => !CM.isPlaced(pl, s));
      const cons = contradictions();
      body.innerHTML = `
        <p class="ch-lead">${f.length} von 9 Splittern. ${tray.length ? 'Leg sie in die Nacht: erst Karte, dann Platz.' : pl.length ? `${CM.correctCount(pl)} sitzen richtig.` : 'Die Splitter warten in der Welt.'}</p>
        <div class="ch-line" role="list">${ch.map((c) => { const s = CM.shardInSlot(pl, c.slot); const m = s ? CM.memoryBy(mems, s) : null; return `<button class="ch-slot${s ? ' is-full' : ''}${s && c.correct ? ' is-correct' : ''}${sel && !s ? ' is-target' : ''}" type="button" data-slot="${c.slot}" style="--tint:${esc(s ? tintOf(s) : '#ffd166')}" aria-label="Platz ${c.slot}, ${CM.fmtHour(c.hour)}">${s ? icon(CM.SHARDS[s].icon, { size: 22 }) + `<b>${s}</b>` : icon('mond', { size: 16 })}<small>${CM.fmtHour(c.hour)}</small></button>`; }).join('')}</div>
        ${tray.length ? `<div class="ch-tag">Gefundene Splitter</div><div class="ch-tray">${tray.map((s) => `<button class="ch-card${sel === s ? ' is-on' : ''}" type="button" data-card="${s}" style="--tint:${esc(tintOf(s))}">${icon(CM.SHARDS[s].icon, { size: 30 })}<b>${s}</b><small>${esc(nameOf(CM.SHARDS[s].owner))}</small></button>`).join('')}</div>` : ''}
        <div class="ch-tag">Die Kette</div>
        <div class="ch-chain">${ch.map((c) => (c.placed ? `<div class="ch-link" style="--tint:${esc(tintOf(c.shard))}"><span class="ico">${icon(c.icon, { size: 16 })}</span><span>${esc(c.say || '…')}</span>${c.correct ? '' : ' <small>(noch am falschen Platz)</small>'}</div>` : `<div class="ch-link is-empty"><span class="ico">${icon('mond', { size: 16 })}</span><span>${CM.fmtHour(c.hour)} – noch leer</span></div>`)).join('')}</div>
        ${cons.length ? `<div class="ch-tag">Widersprüche (freiwillig)</div>${cons.map((c) => `<div class="ch-why" data-why="${esc(c.id)}"><div class="ch-why-head"><span class="pair">${c.shards.map((s) => `<i style="--a:${esc(tintOf(s))}">${s}</i>`).join('')}</span><span>${esc(c.prompt)}</span></div>${c.solved ? `<div class="ch-solved">${icon('check', { size: 20 })}<span>${esc(CM.contradictionById(c.id).say)}</span></div>` : c.ready ? `<div class="ch-tiles">${c.tiles.map((t) => `<button class="ch-tile" type="button" data-tile="${esc(t.id)}">${icon(t.icon, { size: 24 })}<span>${esc(t.t)}</span></button>`).join('')}</div>` : '<p class="ch-note">Erst beide Splitter auf den Zeitstrahl legen.</p>'}</div>`).join('')}` : ''}
        <p class="ch-note">Tipp auf einen gelegten Splitter: Erinnerung noch mal ansehen.</p>`;
      body.querySelectorAll('[data-card]').forEach((b) => b.addEventListener('click', () => { audio.play('tile'); const s = Number(b.dataset.card); sel = sel === s ? null : s; renderBoard(body, h); }));
      body.querySelectorAll('[data-slot]').forEach((b) => b.addEventListener('click', async () => {
        const slot = Number(b.dataset.slot);
        const s = CM.shardInSlot(pl, slot);
        if (sel) { const r = place(sel, slot); sel = null; audio.play(r.correct ? 'chime' : 'tile'); renderBoard(body, h); if (r.ok && !r.correct) { const el = body.querySelector(`[data-slot="${slot}"]`); if (el) el.classList.add('is-wobble'); } return; }
        if (s) { const m = CM.memoryBy(mems, s); if (!m) return; audio.play('open'); h.close('replay'); await show(m.id, { replay: true }); openBoard(); }
      }));
      body.querySelectorAll('[data-why]').forEach((box) => box.querySelectorAll('[data-tile]').forEach((b) => b.addEventListener('click', () => {
        const r = answer(box.dataset.why, b.dataset.tile);
        if (r.ok) { audio.play('chime'); ui.toast(r.say); renderBoard(body, h); }
        else { audio.play('tile'); b.classList.add('is-off'); }
      })));
    }
    function openBoard() {
      if (board) return board;
      sel = null;
      board = ui.overlay.open({ id: 'chronik', title: 'Chronik', subtitle: 'Die Nacht des Sommerfests', icon: 'chronik', kind: 'full', pause: true, content: (body, h) => renderBoard(body, h), onClose: () => { board = null; emit('chronik:close', {}); } });
      emit('chronik:open', {});
      return board;
    }
    function closeBoard() { if (board) board.close('api'); }

    // ---- Tagebuch-Seite „Chronik“ (ersetzt die Hülle aus ui/journal/pages.js) ----
    if (ui.journal && ui.journal.registerPage) ui.journal.registerPage({
      id: 'chronik', label: 'Chronik', icon: 'chronik', order: 50,
      hidden: () => !found().length,
      badge: () => { const n = found().filter((s) => !CM.isPlaced(placed(), s)).length; return n || null; },
      render(el) {
        const f = found(), pl = placed();
        el.innerHTML = `<p class="jn-lead">${f.length} von 9 Splittern · ${CM.correctCount(pl)} in der Kette.</p><div class="shards">${Array.from({ length: 9 }, (_, i) => `<span class="shard${f.includes(i + 1) ? ' is-found' : ''}">${icon(CM.SHARDS[i + 1].icon, { size: 30 })}<small>${i + 1}</small></span>`).join('')}</div><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-open-chronik>${icon('chronik', { size: 26 })}<span>Pinnwand öffnen</span></button></div><p class="jn-note">Die Pinnwand hängt im Baumhaus.</p>`;
        el.querySelector('[data-open-chronik]').addEventListener('click', () => { audio.play('tile'); ui.journal.close(); setTimeout(() => openBoard(), 120); });
      },
    });

    // ---- Grisel: Silhouette über dem Klippen-Gipfel ----
    let gr = null, grState = 'verborgen', grOverride = null;
    const gip = island.SITES.klippenGipfel || { x: -106, z: -106 };
    const gipY = island.getHeight(gip.x, gip.z);
    try {
      gr = game.props.spawn('grisel', { id: 'grisel-chronik', x: gip.x - 12, z: gip.z + 8, y: gipY + 24, onGround: false, collide: false, size: 5, state: 'schatten' });
      gr.far = 700; gr.group.visible = false;
    } catch (e) { console.warn('[chronik] Grisel nicht gesetzt:', e); }
    function griselState() { return grOverride || CM.griselStateFor({ module: moduleProgress(state.get('units', {}) || {}).module, shards: found(), flags: state.get('flags', {}) || {} }); }
    function griselRefresh() {
      const s = griselState();
      if (s !== grState) { const prev = grState; grState = s; if (gr) gr.setState(CM.GRISEL_PROP_STATE[s]); emit('grisel:state', { state: s, prev }); }
      if (gr) gr.group.visible = s !== 'verborgen';
      return s;
    }
    let grT = 0;
    game.addUpdate((dt) => {
      if (!gr || !gr.group.visible || (game.scenes && game.scenes.isInterior)) return;
      grT += dt;
      const s = grState;
      const r = s === 'ferne' ? 26 : s === 'nah' ? 14 : 8, hgt = s === 'ferne' ? 24 : s === 'nah' ? 12 : 9, speed = s === 'lichtfalter' ? 0.16 : 0.07;
      const a = grT * speed;
      gr.group.position.set(gip.x + Math.cos(a) * r, gipY + hgt + Math.sin(grT * 0.5) * 1.2, gip.z + Math.sin(a) * r);
      gr.group.rotation.y = -a + Math.PI / 2;
      // in der Ferne nur bei Dämmerung, Nacht oder Sturm als Silhouette sichtbar
      if (s === 'ferne') gr.group.visible = (sky.night > 0.25) || (sky.storm !== undefined && sky.storm > 0.4) || grOverride === 'ferne';
    }, { order: 13 });
    for (const ev of ['unit:unlock', 'unit:complete', 'shard:found', 'state:reset', 'save:load']) events.on(ev, () => griselRefresh());
    state.on('flags', griselRefresh);
    griselRefresh();

    // ---- Cliffhanger-Pool (Sitzung liest content 'cliffhangers'.lines beim Abend am Feuer) ----
    const cliffhangers = () => CM.cliffhangerPool({ shards: found(), solved: solved(), units: state.get('units', {}) || {} });
    try { content.register('cliffhangers', { id: 'chronik', get lines() { return cliffhangers(); } }, { file: 'systems/chronik/plugin.js', name: 'chronik' }); } catch (e) { /* egal */ }

    const api = {
      show, openBoard, closeBoard, memories, memoryOf, found, placed, chain, place, unplace, contradictions, answer, cliffhangers,
      get isOpen() { return !!board; },
      get active() { return active ? { id: active.def.id, shard: active.def.shard } : null; },
      grisel: { get state() { return grState; }, refresh: griselRefresh, get handle() { return gr; }, set(s) { grOverride = s && CM.GRISEL_STATES.includes(s) ? s : null; return griselRefresh(); } },
      POCKET: MEM_POCKET, model: CM,
    };
    game.chronik = api;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.showMemory = (id, replay = false) => show(typeof id === 'number' || /^\d$/.test(String(id)) ? Number(id) : id, { replay });
    D.chronik = () => ({ found: found(), placed: placed(), correct: CM.correctCount(placed()), solved: solved(), contradictions: contradictions().map((c) => ({ id: c.id, ready: c.ready, solved: c.solved })), grisel: grState, griselVisible: !!(gr && gr.group.visible), cliffhangers: cliffhangers(), memories: memories().map((m) => m.id), active: api.active, open: !!board });
    D.openChronik = () => { openBoard(); return true; };
    D.placeShard = (shard, slot) => place(shard, slot);
    D.solveWhy = (id, tile) => answer(id, tile);
    D.grisel = (s) => api.grisel.set(s === undefined ? null : s);
    return api;
  },
};
