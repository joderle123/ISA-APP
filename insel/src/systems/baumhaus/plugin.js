// Baumhaus (WP40, DESIGN §8): Innenraum im Feigenbaum + Außenpodest mit Tür. Stationen: Hängematte (vor e14 der
// Sichere Ort, über die Pause erreichbar), Glas (Glühwürmchen vom Feuer + anonyme Muscheln, nur auf dem Gerät),
// Jukebox-Komponist (Runter/Auf, ab e13 vier Takte), Stärken-Bonsai (Früchte = Taten, Äste = Sätze), Chronik-Pinnwand
// (WP54), Trophäenwand, Spiegel (Stil-Studio), Mäxchen-Tisch, Möbel-Raster, Tür zum Sicheren Ort.
//   game.baumhaus = game.plugins.baumhaus → { enter({ spawn }), exit(), isInside, stations, open(stationId), rest({ kind }),
//     furniture: { list(), catalog(), place(id, cx, cz, yaw), remove(cx, cz), blocked() }, bonsai: { model(), addBranch(id, text, color), refresh() },
//     glass: { summary(), addShell(need) }, jukebox: { playlist(), set(i, loop), cycle(i), play(), stop(), current, composer },
//     trophies(), deck: { x, z, y }, refresh(part?), parts }
//   Ereignisse: baumhaus:enter · baumhaus:exit · baumhaus:station {id} · baumhaus:furniture {list} · bonsai:grow {fruits, branches, size}
//     · glas:add {kind:'muschel'|'moment', count} · jukebox:play {playlist, index, loop, mood} · jukebox:stop · ruhe:start/ruhe:end {kind, puls}
//   Hört auf: safeplace:open {kind:'haengematte'|'sichererOrt'} (Pause-Menü) · scene:enter/exit · state deedLog/baumhaus/chronik/medals/units
//   Spielstand: baumhaus { furniture:[{id,cx,cz,yaw}], bonsai:[{id,text,color,kind}], jukebox:[4 × runter|auf|still], glas:[{moment|need, day}] }
//     (baumhaus.glas ist privat: nie im Export-Code, core/save.js PRIVATE_PATHS)
//   Debug: LUMO.debug.baumhaus() · enterBaumhaus() · baumhausStation(id) · placeFurniture(id, cx, cz) · bonsaiInfo() · addShell(need) · rest(kind)
import { STATIONS, BAUMHAUS_ROOM, ROOM_ID, DECK, stationById } from '../../scenes/baumhaus.js';
import * as MDL from './model.js';
import { createStationBuilders } from './stations.js';
import { esc } from '../../ui/overlay.js';
import { TANKS as NEEDS } from '../../content/schema/consts.js';

const NEED_LABEL = { koerper: 'Körper', sicherheit: 'Sicherheit', zugehoerigkeit: 'Dazugehören', anerkennung: 'Anerkennung', selbstbestimmung: 'Selbst bestimmen', spass: 'Spaß' };
const NEED_ICON = { koerper: 'herz', sicherheit: 'schloss', zugehoerigkeit: 'team', anerkennung: 'stern', selbstbestimmung: 'kompass', spass: 'sonne' };

const CSS = `
.ov-ruhe{background:radial-gradient(ellipse at 50% 70%,rgba(20,60,40,.92),rgba(5,8,20,.96))}
.ov-ruhe .ov-card{width:min(720px,100%)}
.ruhe-scene{position:relative;height:min(38vh,300px);overflow:hidden;border-radius:var(--radius-l);background:linear-gradient(#0f2a1e,#07130f)}
.ruhe-scene svg{width:100%;height:100%}
.ruhe-matte{transform-origin:50% 0;animation:ruhe-sway 5.5s ease-in-out infinite}
@keyframes ruhe-sway{0%,100%{transform:rotate(-2.2deg)}50%{transform:rotate(2.2deg)}}
.ruhe-fly{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff6a8;box-shadow:0 0 10px 3px rgba(255,230,120,.8);animation:ruhe-fly 7s ease-in-out infinite;opacity:.9}
@keyframes ruhe-fly{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(26px,-18px) scale(.7)}50%{transform:translate(-14px,-34px) scale(1.1)}75%{transform:translate(-30px,-10px) scale(.8)}}
.ruhe-text{text-align:center;font-size:20px;margin:14px 0 4px;opacity:.95}
.ruhe-puls{display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0 6px;font-weight:800}
.ruhe-puls .bar{width:min(260px,60%);height:12px;border-radius:6px;background:var(--ghost);overflow:hidden}
.ruhe-puls .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2de2c9,#45d15a);transition:width .4s ease}
.bh-lead{font-size:16px;opacity:.85;margin:0 0 10px}
.bh-note{font-size:13px;opacity:.65;margin-top:10px}
.bh-rows{display:flex;flex-direction:column;gap:8px}
.bh-row{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius);background:var(--ghost);min-height:56px}
.bh-row .ico{flex:none;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;background:var(--card,#ffd166);color:#1b1b2a}
.bh-row b{font-size:15px}
.bh-row small{display:block;opacity:.7;font-size:13px}
.bh-row .grow{flex:1;min-width:0}
.bh-row .btn{flex:none}
.bh-grid6{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.bh-chip{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;border-radius:var(--radius);background:var(--ghost);min-height:72px;font-size:14px;text-align:center}
.bh-chip .cnt{font-weight:900;font-size:20px}
.bh-jar{display:flex;align-items:flex-end;justify-content:center;gap:6px;height:120px;padding:10px;border-radius:var(--radius-l);background:linear-gradient(rgba(190,230,255,.12),rgba(190,230,255,.28));border:2px solid rgba(190,230,255,.35);margin-bottom:12px;flex-wrap:wrap;align-content:flex-end}
.bh-jar i{width:10px;height:10px;border-radius:50%;background:#fff6a8;box-shadow:0 0 8px 2px rgba(255,230,120,.7);animation:ruhe-fly 6s ease-in-out infinite}
.bh-jar b{width:14px;height:12px;border-radius:7px 7px 3px 3px;background:var(--c,#ffd23f);display:inline-block}
.bh-slots{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:8px 0 12px}
.bh-slot{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 6px;border-radius:var(--radius);background:var(--ghost);min-height:84px;font-weight:800;border:2px solid transparent}
.bh-slot.is-runter{border-color:#8fa3ff}.bh-slot.is-auf{border-color:#ffd166}.bh-slot.is-still{opacity:.6}
.bh-slot.is-now{box-shadow:0 0 0 3px #2de2c9 inset}
.bh-two{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.bh-cat{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 8px;margin-bottom:8px}
.bh-cat .bh-chip{flex:none;width:92px;min-height:80px;border:2px solid transparent}
.bh-cat .bh-chip.is-on{border-color:#2de2c9}
.bh-cells{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:420px;margin:0 auto}
.bh-cell{aspect-ratio:1;border-radius:8px;background:var(--ghost);display:grid;place-items:center;min-width:0;padding:0;border:0;color:inherit}
.bh-cell[disabled]{opacity:.22}
.bh-cell.is-full{background:var(--card,#ffd166);color:#1b1b2a}
.bh-cell.is-target{outline:2px dashed #2de2c9}
.bh-troph{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
.bh-troph .bh-chip{border-bottom:4px solid var(--tier,#ffd166)}
.bh-tag{font-size:12px;opacity:.7;text-transform:uppercase;letter-spacing:.06em}
`;

export default {
  id: 'baumhaus', order: 66, deps: ['ui', 'welt', 'props', 'npcs', 'session', 'minigames'],
  install(game) {
    const { events, state, content, player, world, ui, scene, THREE } = game;
    const scenes = game.scenes;
    const island = world.island;
    const { part, merge } = game.geom;
    const emit = (n, p) => events.emit(n, p);
    const icon = ui.icon;
    const speech = game.speech || null;
    const audio = game.audio;
    const session = game.plugins.session;
    const cond = (c) => (session && session.evalCond ? session.evalCond(c) : false);
    const day = () => Number(state.get('time.day', 1)) || 1;
    const S = createStationBuilders({ THREE, part, merge, M: game.props.materials, rng: game.rng && game.rng.fork ? game.rng.fork('baumhaus') : null });
    if (typeof document !== 'undefined' && !document.getElementById('bh-css')) { const st = document.createElement('style'); st.id = 'bh-css'; st.textContent = CSS; document.head.appendChild(st); }

    // ---- Raum registrieren (ersetzt den Platzhalter des Baukastens) ----
    if (scenes) scenes.register(BAUMHAUS_ROOM);
    const blocked = MDL.blockedCells(STATIONS);
    const hasOrt = () => (state.get('upgrades', []) || []).includes('ruhe.kopf');
    const unitOpen = (id) => { const s = state.get('units.' + id); return !!s && s !== 'gesperrt'; };

    // ---- Außenpodest: Tür in den Stamm (nur oben nutzbar), Laterne, Schild ----
    const site = island.SITES.baumhaus;
    const gY = island.getHeight(site.x, site.z);
    const deckY = gY + DECK.height + 0.35;
    const deck = { x: site.x, z: site.z, y: deckY, door: { x: site.x + 1.9, z: site.z } };
    let deckHandle = null, doorIt = null;
    try {
      deckHandle = S.deck();
      deckHandle.group.position.set(site.x + 1.25, deckY, site.z);
      deckHandle.group.rotation.y = Math.PI / 2;
      scene.add(deckHandle.group);
      doorIt = game.interactions.add({ id: 'baumhaus-tuer', x: deck.door.x, z: deck.door.z, radius: 1.8, label: 'Baumhaus', priority: 3, enabled: false, onAction: () => api.enter() });
    } catch (e) { console.warn('[baumhaus] Podest nicht gebaut:', e); }

    // ---- Dynamische Stationen im Raum ----
    const parts = {};          // id → Handle aus stations.js
    let dyn = null;            // Gruppe im Raum
    let furnitureHandles = [];
    let interactions = [];
    const dirty = new Set();
    const inside = () => !!(scenes && scenes.current && scenes.current.id === ROOM_ID);
    const room = () => (scenes ? scenes.room(ROOM_ID) : null);
    const tintsOf = () => { const t = {}; for (const m of content.list('memories')) if (m && m.shard) t[m.shard] = (m.filter && m.filter.tint) || '#ffd166'; return t; };
    const chainOf = () => { const C = game.plugins.chronik; if (C && C.chain) return C.chain(); return Array.from({ length: 9 }, (_, i) => ({ slot: i + 1, shard: i + 1, placed: false, correct: false })); };

    function bonsaiModel() {
      return MDL.bonsaiFrom({ deedLog: state.get('deedLog', []) || [], deeds: state.get('deeds', []) || [], bonsai: state.get('baumhaus.bonsai', []) || [], npcDefs: game.npcs ? game.npcs.defs : content.list('npcs'), glaubenssatz: state.get('private.glaubenssatz'), nameOf: game.npcs ? (id) => game.npcs.nameOf(id) : null });
    }
    function trophyList() {
      return MDL.trophiesFrom({ medals: state.get('medals', {}) || {}, units: state.get('units', {}) || {}, jackePatches: state.get('jackePatches', []) || [], wege: state.get('wege', []) || [], minigameDefs: content.list('minigames'), questDefs: content.list('quests'), collectibles: state.get('collectibles', {}) || {} });
    }
    const BUILD = {
      bonsai: () => S.bonsai(bonsaiModel()),
      glas: () => S.glass(MDL.glassSummary(state.get('baumhaus.glas', []) || [])),
      pinnwand: () => S.pinnwand(chainOf(), tintsOf()),
      trophaeen: () => S.trophies(trophyList()),
      tuer: () => S.door({ open: hasOrt() }),
    };
    function mount(id) {
      const r = room();
      if (!r || !BUILD[id]) return null;
      if (!dyn) { dyn = new THREE.Group(); dyn.name = 'bh-dyn'; r.group.add(dyn); }
      if (parts[id]) { parts[id].dispose(); delete parts[id]; }
      const h = BUILD[id]();
      const st = stationById(id);
      h.group.position.set(st.at[0], st.at[1] || 0, st.at[2]);
      h.group.rotation.y = st.yaw || 0;
      dyn.add(h.group);
      parts[id] = h;
      dirty.delete(id);
      return h;
    }
    function mountFurniture() {
      const r = room();
      if (!r) return;
      if (!dyn) { dyn = new THREE.Group(); dyn.name = 'bh-dyn'; r.group.add(dyn); }
      for (const h of furnitureHandles) h.dispose();
      furnitureHandles = [];
      const owned = game.plugins.cosmetics && game.plugins.cosmetics.owned ? game.plugins.cosmetics.owned('moebel') : [];
      for (const it of state.get('baumhaus.furniture', []) || []) {
        const def = MDL.furnitureDef(it.id, owned);
        if (!def || !MDL.cellInRoom(it.cx, it.cz)) continue;
        const h = S.furniture(def, it);
        const p = MDL.cellToLocal(it.cx, it.cz);
        h.group.position.set(p.x, 0, p.z);
        h.group.rotation.y = it.yaw || 0;
        dyn.add(h.group);
        furnitureHandles.push(h);
      }
      dirty.delete('moebel');
    }
    function refresh(id) {
      if (!inside()) { dirty.add(id || 'alle'); return false; }
      if (!id || id === 'alle') { for (const k of Object.keys(BUILD)) mount(k); mountFurniture(); dirty.clear(); return true; }
      if (id === 'moebel') mountFurniture(); else mount(id);
      return true;
    }
    function addInteractions() {
      removeInteractions();
      const pocket = scenes.pocket;
      if (!pocket) return;
      for (const s of STATIONS) {
        const label = s.id === 'tuer' ? (hasOrt() ? 'Sicherer Ort' : 'Tür') : s.label;
        interactions.push(game.interactions.add({ id: 'bh-' + s.id, x: pocket.x + s.at[0], z: pocket.z + s.at[2], radius: s.radius, label, priority: 2, onAction: () => api.open(s.id) }));
      }
    }
    function removeInteractions() { for (const it of interactions) it.remove(); interactions = []; }
    events.on('scene:enter', (e) => {
      if (!e || e.id !== ROOM_ID) return;
      if (dirty.has('alle') || !parts.bonsai) refresh('alle'); else { for (const d of [...dirty]) refresh(d); }
      if (!parts.bonsai) refresh('alle');
      addInteractions();
      emit('baumhaus:enter', { spawn: e.spawn || 'eingang' });
    });
    events.on('scene:exit', (e) => { if (e && e.id === ROOM_ID) { removeInteractions(); emit('baumhaus:exit', {}); } });
    // Wachsen: Taten → Bonsai, Glas, Chronik, Trophäen; im Raum sofort, sonst beim nächsten Betreten
    state.on('deedLog', () => { refresh('bonsai'); const m = bonsaiModel(); emit('bonsai:grow', { fruits: m.fruits.length, branches: m.branches.length, size: m.size, stage: m.stage }); });
    state.on('deeds', () => refresh('bonsai'));
    state.on('baumhaus.bonsai', () => { refresh('bonsai'); const m = bonsaiModel(); emit('bonsai:grow', { fruits: m.fruits.length, branches: m.branches.length, size: m.size, stage: m.stage }); });
    state.on('private.glaubenssatz', () => refresh('bonsai'));
    state.on('baumhaus.glas', () => refresh('glas'));
    state.on('baumhaus.furniture', () => refresh('moebel'));
    state.on('chronik', () => refresh('pinnwand'));
    state.on('shards', () => refresh('pinnwand'));
    for (const p of ['medals', 'units', 'jackePatches', 'wege', 'collectibles']) state.on(p, () => refresh('trophaeen'));
    state.on('upgrades', () => { refresh('tuer'); if (inside()) addInteractions(); });
    events.on('state:reset', () => { dirty.add('alle'); if (inside()) refresh('alle'); });
    if (scenes) events.on('save:load', () => { const r = scenes.built.get(ROOM_ID); if (r && !inside()) dirty.add('alle'); });

    // Schleife: Tür-Interaktion nur oben auf dem Podest; Glühwürmchen im Glas; Jukebox-Takte
    game.addUpdate((dt, t) => {
      if (doorIt) doorIt.enabled = !scenes.isInterior && player.position.y > gY + DECK.minAbove && !(scenes && scenes.busy);
      if (inside() && parts.glas && parts.glas.update) parts.glas.update(dt, t);
      jukeboxTick(dt);
    }, { order: 12 });

    // ---- Hängematte / Sicherer Ort: Puls fällt auf 10, jederzeit verlassbar (DESIGN §7, §19) ----
    let resting = null;
    function rest({ kind = 'haengematte', title } = {}) {
      if (resting) return resting.promise;
      const from = Number(state.get('session.puls', 0)) || 0;
      const hasPuls = (state.get('upgrades', []) || []).includes('ruhe.puls');
      const t0 = performance.now();
      const ttl = title || (kind === 'sichererOrt' ? 'Sicherer Ort' : 'Hängematte');
      let timer = 0, closed = false;
      // Puls über das Puls-System (WP33), sonst direkt in den Laufzeit-Zustand
      const setPuls = (v) => { if (game.puls && game.puls.set) game.puls.set(v, 'ruhe'); else { state.set('session.puls', v); emit('puls:set', { value: v, via: 'ruhe' }); } };
      const promise = new Promise((resolve) => {
        const h = ui.overlay.open({
          id: 'ruhe', title: ttl, icon: 'haengematte', kind: 'dark', pause: true, cls: 'ov-ruhe', closeLabel: 'Zurück',
          content: (body) => {
            body.innerHTML = `
              <div class="ruhe-scene" aria-hidden="true">
                <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c4a33"/><stop offset="1" stop-color="#0a1a12"/></linearGradient></defs>
                  <rect width="400" height="200" fill="url(#rg)"/>
                  <g fill="#2f7a47"><ellipse cx="40" cy="30" rx="70" ry="40"/><ellipse cx="360" cy="24" rx="80" ry="44"/><ellipse cx="200" cy="-10" rx="120" ry="46"/></g>
                  <rect x="58" y="40" width="8" height="150" fill="#6b4a30"/><rect x="334" y="40" width="8" height="150" fill="#6b4a30"/>
                  <g class="ruhe-matte"><path d="M62 70 C 120 150, 280 150, 338 70 L 338 78 C 280 162, 120 162, 62 78 Z" fill="${kind === 'sichererOrt' ? '#2de2c9' : '#ff9a6a'}"/><path d="M62 70 C 120 150, 280 150, 338 70" stroke="#ffe0b0" stroke-width="2" fill="none"/></g>
                </svg>
                <span class="ruhe-fly" style="left:30%;top:40%"></span><span class="ruhe-fly" style="left:62%;top:52%;animation-delay:-2s"></span><span class="ruhe-fly" style="left:48%;top:30%;animation-delay:-4s"></span>
              </div>
              <p class="ruhe-text">${kind === 'sichererOrt' ? 'Dein Ort. Hier ist nichts eilig.' : 'Kurz ausruhen. Nichts ist eilig.'}</p>
              ${hasPuls ? `<div class="ruhe-puls">${icon('ruhe', { size: 24 })}<div class="bar"><i data-bar></i></div><span data-puls>${from}</span></div>` : ''}
              <div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-weiter>${icon('play', { size: 26 })}<span>Weiter</span></button></div>`;
            body.querySelector('[data-weiter]').addEventListener('click', () => h.close('weiter'));
          },
          onClose: () => { closed = true; clearInterval(timer); const p = MDL.restPuls(from, 99); setPuls(p); resting = null; emit('ruhe:end', { kind, puls: p }); resolve({ kind, puls: p }); },
        });
        const bar = h.body.querySelector('[data-bar]'), num = h.body.querySelector('[data-puls]');
        timer = setInterval(() => {
          if (closed) return;
          const s = (performance.now() - t0) / 1000;
          const p = MDL.restPuls(from, s);
          setPuls(p);
          if (bar) bar.style.width = `${Math.max(4, 100 - p)}%`;
          if (num) num.textContent = String(p);
        }, 200);
      });
      resting = { promise };
      emit('ruhe:start', { kind, puls: from });
      if (audio && audio.play) { try { audio.play('open'); } catch (e) { /* egal */ } }
      return promise;
    }
    // Pause-Menü: das Puls-Plugin (WP33, scenes/sicherer-ort.js) übernimmt Hängematte und Sicheren Ort; ohne WP33 die Ruhe-Szene hier
    events.on('safeplace:open', (e) => {
      if (!e || e.handled || game.sichererOrt) return;
      e.handled = true;
      rest({ kind: e.kind === 'sichererOrt' ? 'sichererOrt' : 'haengematte' });
    });

    // ---- Glas ----
    function openGlass() {
      const sum = MDL.glassSummary(state.get('baumhaus.glas', []) || []);
      const h = ui.overlay.open({
        id: 'bh-glas', title: 'Das Glas', icon: 'glas', kind: 'panel',
        content: (body) => {
          body.innerHTML = `
            <div class="bh-jar" aria-hidden="true">${sum.fireflies.slice(-18).map((f, i) => `<i style="animation-delay:-${(i * 0.7) % 6}s"></i>`).join('')}${sum.shells.slice(-30).map((s) => `<b style="--c:${esc(S.NEED_COLOR[s.need] || '#ffd23f')}"></b>`).join('')}</div>
            <p class="bh-lead">${sum.fireflies.length} Glühwürmchen · ${sum.shells.length} Muscheln</p>
            <div class="bh-grid6">${NEEDS.map((n) => `<div class="bh-chip" style="--card:${esc(S.NEED_COLOR[n])}">${icon(NEED_ICON[n], { size: 26 })}<span>${NEED_LABEL[n]}</span><span class="cnt">${sum.byNeed[n]}</span></div>`).join('')}</div>
            <div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-muschel>${icon('muschel', { size: 26 })}<span>Muschel hineinlegen</span></button></div>
            <p class="bh-note">Ohne Namen. Bleibt nur auf diesem Gerät.</p>`;
          body.querySelector('[data-muschel]').addEventListener('click', async () => {
            h.close('muschel');
            const r = await ui.ask({ prompt: 'Was hat dir heute gefehlt?', items: NEEDS.map((n) => ({ id: n, label: NEED_LABEL[n], icon: NEED_ICON[n], color: S.NEED_COLOR[n] })), system: { rueckzug: true, hilfe: false } });
            if (!r || r.system || !r.id) return;
            api.glass.addShell(r.id);
            ui.toast('Die Muschel liegt im Glas.');
          });
        },
      });
      return h;
    }

    // ---- Jukebox-Komponist ----
    const jb = { playing: false, index: -1, t: 0 };
    const music = () => game.music && game.music.jukebox ? game.music.jukebox : null;
    const composer = () => unitOpen('j1-e13');
    function jukeboxPlay(i) {
      const pl = MDL.playlistFrom(state.get('baumhaus.jukebox', []));
      const idx = i === undefined ? MDL.firstIndex(pl) : i;
      if (idx < 0) return false;
      const M = music();
      if (M) M.play(pl[idx]);
      jb.playing = true; jb.index = idx; jb.t = 0;
      state.set('session.jukebox', { playing: true, index: idx, loop: pl[idx], mood: MDL.playlistMood(pl) });
      emit('jukebox:play', { playlist: pl, index: idx, loop: pl[idx], mood: MDL.playlistMood(pl) });
      return true;
    }
    function jukeboxStop() {
      if (!jb.playing) return false;
      const M = music();
      if (M) M.stop();
      jb.playing = false; jb.index = -1;
      state.set('session.jukebox', { playing: false, index: -1, loop: null, mood: 0 });
      emit('jukebox:stop', {});
      return true;
    }
    function jukeboxTick(dt) {
      if (!jb.playing || !composer()) return;
      jb.t += dt;
      if (jb.t < MDL.JUKEBOX_STEP_SECONDS) return;
      const pl = MDL.playlistFrom(state.get('baumhaus.jukebox', []));
      const n = MDL.nextIndex(pl, jb.index);
      if (n < 0) { jukeboxStop(); return; }
      jukeboxPlay(n);
    }
    function openJukebox() {
      const render = (body, h) => {
        const pl = MDL.playlistFrom(state.get('baumhaus.jukebox', []));
        const cur = jb.playing ? jb.index : -1;
        if (composer()) {
          body.innerHTML = `
            <p class="bh-lead">Vier Takte. Tippen wechselt: Runter, Auf, Still.</p>
            <div class="bh-slots">${pl.map((v, i) => `<button class="bh-slot is-${v}${i === cur ? ' is-now' : ''}" type="button" data-slot="${i}">${icon(MDL.JUKEBOX_ICON[v], { size: 30 })}<span>${MDL.JUKEBOX_LABEL[v]}</span></button>`).join('')}</div>
            <div class="bh-two"><button class="btn btn-primary btn-big" type="button" data-play>${icon('play', { size: 26 })}<span>Abspielen</span></button><button class="btn btn-big" type="button" data-stop>${icon('stopp', { size: 26 })}<span>Stopp</span></button></div>
            <p class="bh-note">Runter beruhigt Wetter und Tiere. Auf bringt Schwung.</p>`;
          body.querySelectorAll('[data-slot]').forEach((b) => b.addEventListener('click', () => { audio.play('tile'); const i = Number(b.dataset.slot); state.set('baumhaus.jukebox', MDL.cycleLoop(state.get('baumhaus.jukebox', []), i)); render(body, h); }));
          body.querySelector('[data-play]').addEventListener('click', () => { audio.play('tile'); if (!jukeboxPlay()) ui.toast('Erst einen Takt wählen.'); render(body, h); });
        } else {
          body.innerHTML = `
            <p class="bh-lead">Zwei Loops. Der Komponist kommt mit dem Sturmbarometer.</p>
            <div class="bh-two">${['runter', 'auf'].map((v) => `<button class="bh-slot is-${v}${jb.playing && pl[0] === v ? ' is-now' : ''}" type="button" data-loop="${v}">${icon(MDL.JUKEBOX_ICON[v], { size: 34 })}<span>${MDL.JUKEBOX_LABEL[v]}</span></button>`).join('')}</div>
            <div class="ov-actions"><button class="btn btn-big" type="button" data-stop>${icon('stopp', { size: 26 })}<span>Stopp</span></button></div>`;
          body.querySelectorAll('[data-loop]').forEach((b) => b.addEventListener('click', () => { audio.play('tile'); state.set('baumhaus.jukebox', [b.dataset.loop, 'still', 'still', 'still']); jukeboxPlay(0); render(body, h); }));
        }
        body.querySelector('[data-stop]').addEventListener('click', () => { audio.play('tile'); jukeboxStop(); render(body, h); });
      };
      return ui.overlay.open({ id: 'bh-jukebox', title: 'Jukebox', icon: 'lautsprecher', kind: 'panel', content: (body, h) => render(body, h) });
    }

    // ---- Stärken-Bonsai ----
    function openBonsai() {
      const m = bonsaiModel();
      const stageLabel = { keimling: 'Keimling', jung: 'Junger Baum', kraeftig: 'Kräftiger Baum', alt: 'Alter Baum', ehrwuerdig: 'Ehrwürdiger Baum' }[m.stage] || m.stage;
      return ui.overlay.open({
        id: 'bh-bonsai', title: 'Stärken-Bonsai', icon: 'bonsai', kind: 'panel',
        content: (body) => {
          const rows = m.fruits.slice().reverse().map((f) => `<div class="bh-row" style="--card:${esc(f.color)}"><span class="ico">${icon(f.icon, { size: 20 })}</span><div class="grow"><b>${esc(f.text || (f.npcName ? `Mit ${f.npcName}` : 'Eine Tat'))}</b><small>${f.npcName ? esc(f.npcName) + ' · ' : ''}Tag ${f.day || 1}</small></div>${f.text ? `<button class="btn btn-small" type="button" data-read="${esc(f.text)}" data-who="${esc(f.npc || '')}" aria-label="Vorlesen">${icon('lautsprecher', { size: 20 })}</button>` : ''}</div>`).join('');
          const branches = m.branches.map((b) => `<div class="bh-row" style="--card:${esc(b.color)}"><span class="ico">${icon('bonsai', { size: 20 })}</span><div class="grow"><b>${esc(b.text || 'Ein neuer Ast')}</b><small>${b.kind === 'glaubenssatz' ? 'Dein Satz' : 'Satz'}</small></div></div>`).join('');
          body.innerHTML = `
            <p class="bh-lead">${stageLabel} · ${m.fruits.length} Früchte · ${m.branches.length} Äste</p>
            ${m.fruits.length ? `<div class="bh-tag">Früchte: echte Taten</div><div class="bh-rows">${rows}</div>` : '<p class="bh-lead">Noch keine Frucht. Hilf jemandem.</p>'}
            ${branches ? `<div class="bh-tag" style="margin-top:12px">Äste: deine Sätze</div><div class="bh-rows">${branches}</div>` : ''}`;
          body.querySelectorAll('[data-read]').forEach((b) => b.addEventListener('click', () => { if (speech) speech.speak(b.dataset.read, { who: b.dataset.who || null, interrupt: true }); }));
        },
      });
    }

    // ---- Trophäenwand ----
    function openTrophies() {
      const list = trophyList();
      const tierLabel = { bronze: 'Bronze', silber: 'Silber', gold: 'Gold', stern: 'Leuchtstern', aufnaeher: 'Aufnäher', weg: 'Weg', jacke: 'Jacke' };
      return ui.overlay.open({
        id: 'bh-trophaeen', title: 'Trophäenwand', icon: 'medaille', kind: 'panel',
        content: (body) => {
          body.innerHTML = list.length
            ? `<p class="bh-lead">${list.length} Stücke aus der Welt.</p><div class="bh-troph">${list.map((t) => `<div class="bh-chip" style="--tier:${esc(S.TIER_COLOR[t.tier] || t.color)}">${icon(t.icon, { size: 28 })}<span>${esc(t.label)}</span><span class="bh-tag">${tierLabel[t.tier] || t.tier}</span></div>`).join('')}</div>`
            : '<p class="bh-lead">Noch leer. Rennen, Kammern und Aufnäher landen hier.</p>';
        },
      });
    }

    // ---- Mäxchen-Tisch ----
    async function openMaexchen() {
      const bonds = state.get('bonds', {}) || {};
      const mains = game.npcs ? game.npcs.main().map((n) => n.id) : [];
      let ids = mains.filter((id) => (bonds[id] || 0) >= 1);
      if (!ids.length) ids = ['tun', 'jolie', 'tiago'].filter((id) => content.get('npcs', id));
      ids = ids.slice(0, 4);
      const items = ids.map((id) => { const d = content.get('npcs', id) || {}; return { id, label: game.npcs ? game.npcs.nameOf(id) : d.name || id, icon: d.icon || 'punkt', color: d.color }; });
      const r = await ui.ask({ prompt: 'Gegen wen?', items, system: { rueckzug: true, hilfe: false } });
      if (!r || r.system || !r.id) return null;
      const def = content.get('minigames', 'muschel-maexchen');
      if (!def || !game.minigames) return null;
      const res = await game.minigames.play({ ...def, params: { ...(def.params || {}), partner: r.id } }, { who: r.id });
      emit('baumhaus:maexchen', { partner: r.id, won: !!(res && res.won), medal: res && res.medal });
      return res;
    }

    // ---- Möbel-Raster ----
    function catalog() {
      const owned = game.plugins.cosmetics && game.plugins.cosmetics.owned ? game.plugins.cosmetics.owned('moebel') : [];
      return MDL.availableFurniture({ evalCond: cond, cosmetics: owned });
    }
    function openEinrichten() {
      let sel = null;
      const render = (body, h) => {
        const cat = catalog();
        const list = state.get('baumhaus.furniture', []) || [];
        const defs = new Map(cat.map((d) => [d.id, d]));
        const cells = [];
        for (let cz = 0; cz < MDL.GRID.n; cz++) for (let cx = 0; cx < MDL.GRID.n; cx++) {
          const it = list.find((f) => f.cx === cx && f.cz === cz);
          const ok = MDL.cellInRoom(cx, cz) && !blocked.has(`${cx},${cz}`);
          const d = it ? defs.get(it.id) || MDL.furnitureDef(it.id) : null;
          cells.push(`<button class="bh-cell${it ? ' is-full' : ''}${sel && ok && !it ? ' is-target' : ''}" type="button" data-cell="${cx},${cz}" ${ok ? '' : 'disabled'} style="--card:${esc(d ? d.color : '#ffd166')}" aria-label="Zelle ${cx + 1}, ${cz + 1}">${d ? icon(d.icon, { size: 18 }) : ''}</button>`);
        }
        body.innerHTML = `
          <p class="bh-lead">${sel ? 'Wohin damit? Tipp auf eine freie Zelle.' : 'Erst ein Möbel wählen, dann die Zelle. Volle Zelle tippen räumt ab.'}</p>
          <div class="bh-cat">${cat.map((d) => `<button class="bh-chip${sel === d.id ? ' is-on' : ''}" type="button" data-item="${esc(d.id)}" style="--card:${esc(d.color)}">${icon(d.icon, { size: 26 })}<span>${esc(d.label)}</span></button>`).join('') || '<span class="bh-lead">Noch keine Möbel. Regionen befreien.</span>'}</div>
          <div class="bh-cells">${cells.join('')}</div>
          <p class="bh-note">${list.length} Stücke stehen. Die Tür ist unten.</p>`;
        body.querySelectorAll('[data-item]').forEach((b) => b.addEventListener('click', () => { audio.play('tile'); sel = sel === b.dataset.item ? null : b.dataset.item; render(body, h); }));
        body.querySelectorAll('[data-cell]').forEach((b) => b.addEventListener('click', () => {
          const [cx, cz] = b.dataset.cell.split(',').map(Number);
          const it = (state.get('baumhaus.furniture', []) || []).find((f) => f.cx === cx && f.cz === cz);
          if (it && !sel) { api.furniture.remove(cx, cz); audio.play('close'); }
          else if (sel) { const r = api.furniture.place(sel, cx, cz, 0); audio.play(r.ok ? 'pickup' : 'tile'); if (!r.ok) ui.toast('Da ist kein Platz.'); }
          render(body, h);
        }));
      };
      return ui.overlay.open({ id: 'bh-einrichten', title: 'Einrichten', icon: 'hammer', kind: 'panel', content: (body, h) => render(body, h) });
    }

    // ---- Stationen öffnen ----
    function open(id) {
      const s = stationById(id);
      if (!s) return null;
      emit('baumhaus:station', { id });
      if (audio && audio.play) { try { audio.play('open'); } catch (e) { /* egal */ } }
      switch (id) {
        case 'haengematte': return rest({ kind: 'haengematte' });
        case 'glas': return openGlass();
        case 'jukebox': return openJukebox();
        case 'spiegel': return ui.stil && ui.stil.open ? ui.stil.open() : ui.journal.open('stil');
        case 'pinnwand': { const C = game.plugins.chronik; return C && C.openBoard ? C.openBoard() : ui.journal.open('chronik'); }
        case 'bonsai': return openBonsai();
        case 'tisch': return openMaexchen();
        case 'trophaeen': return openTrophies();
        case 'kiste': return openEinrichten();
        case 'tuer': {
          if (hasOrt()) { const SO = game.sichererOrt; if (SO && SO.enter) return SO.enter(); return rest({ kind: 'sichererOrt' }); }
          ui.glimm('Noch zu. Nimm die Hängematte.');
          return null;
        }
        default: return null;
      }
    }

    const api = {
      stations: STATIONS, deck, parts, room: ROOM_ID,
      get isInside() { return inside(); },
      enter({ spawn = 'eingang' } = {}) { return scenes ? scenes.enter(ROOM_ID, { spawn }) : Promise.resolve(null); },
      exit() { return inside() && scenes ? scenes.exit({}) : Promise.resolve(false); },
      open, rest, refresh,
      furniture: {
        list: () => (state.get('baumhaus.furniture', []) || []).slice(),
        catalog, blocked: () => [...blocked],
        place(id, cx, cz, yaw = 0) {
          if (!catalog().some((d) => d.id === id)) return { ok: false, reason: 'unbekannt' };
          const r = MDL.placeFurniture(state.get('baumhaus.furniture', []) || [], { id, cx, cz, yaw }, blocked);
          if (r.ok) { state.set('baumhaus.furniture', r.list); emit('baumhaus:furniture', { list: r.list }); }
          return r;
        },
        remove(cx, cz) { const r = MDL.removeFurniture(state.get('baumhaus.furniture', []) || [], cx, cz); if (r.ok) { state.set('baumhaus.furniture', r.list); emit('baumhaus:furniture', { list: r.list }); } return r; },
      },
      bonsai: {
        model: bonsaiModel,
        addBranch(id, text, color, kind = 'satz') { const list = (state.get('baumhaus.bonsai', []) || []).filter((b) => b && b.id !== id); list.push({ id, text: text || null, color: color || '#4fae55', kind, day: day() }); state.set('baumhaus.bonsai', list); return list.length; },
        refresh: () => refresh('bonsai'),
      },
      glass: {
        summary: () => MDL.glassSummary(state.get('baumhaus.glas', []) || []),
        addShell(need) { const r = MDL.addShell(state.get('baumhaus.glas', []) || [], need, day()); if (r.ok) { state.set('baumhaus.glas', r.list); emit('glas:add', { kind: 'muschel', count: r.list.length }); } return r.ok; },
      },
      jukebox: {
        playlist: () => MDL.playlistFrom(state.get('baumhaus.jukebox', [])),
        set(i, loop) { const pl = MDL.playlistFrom(state.get('baumhaus.jukebox', [])); if (MDL.JUKEBOX_LOOPS.includes(loop) && i >= 0 && i < MDL.JUKEBOX_SLOTS) pl[i] = loop; state.set('baumhaus.jukebox', pl); return pl; },
        cycle(i) { const pl = MDL.cycleLoop(state.get('baumhaus.jukebox', []), i); state.set('baumhaus.jukebox', pl); return pl; },
        play: jukeboxPlay, stop: jukeboxStop,
        get current() { return jb.playing ? { index: jb.index, loop: MDL.playlistFrom(state.get('baumhaus.jukebox', []))[jb.index], t: jb.t } : null; },
        get composer() { return composer(); },
      },
      trophies: trophyList,
    };
    game.baumhaus = api;

    // Bei Glühwürmchen vom Feuer (campfire.js schreibt baumhaus.glas) ein Ereignis für Tests/Statistik
    events.on('campfire:done', (e) => { if (e && e.moment) emit('glas:add', { kind: 'moment', count: (state.get('baumhaus.glas', []) || []).length }); });

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.baumhaus = () => ({ inside: inside(), furniture: api.furniture.list().length, bonsai: (() => { const m = bonsaiModel(); return { fruits: m.fruits.length, branches: m.branches.length, size: +m.size.toFixed(2), stage: m.stage }; })(), glas: (() => { const s = api.glass.summary(); return { fireflies: s.fireflies.length, shells: s.shells.length }; })(), trophies: trophyList().length, jukebox: api.jukebox.playlist(), playing: !!jb.playing, parts: Object.fromEntries(Object.entries(parts).map(([k, h]) => [k, h.group.userData])), deck, doorEnabled: !!(doorIt && doorIt.enabled) });
    D.enterBaumhaus = (spawn) => api.enter({ spawn }).then((r) => (r ? r.id : null));
    D.baumhausStation = (id) => { const r = open(id); return r && r.then ? r.then(() => id) : id; };
    D.placeFurniture = (id, cx, cz) => api.furniture.place(id, cx, cz, 0);
    D.bonsaiInfo = () => bonsaiModel();
    D.addShell = (need) => api.glass.addShell(need);
    D.rest = (kind) => rest({ kind: kind || 'haengematte' });
    return api;
  },
};
