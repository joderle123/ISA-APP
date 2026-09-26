// Nachtwache-Scheduler (WP42, DESIGN §9): ab e05, nachts, in einer befreiten Region ist die Laterne einer Figur aus.
// Die Figur weicht vom Tagesablauf ab und sitzt an einem stillen Ort (Spuren im Blick, Glimm-Hinweis, Marker). Man liest sie
// (Haltung gegen Worte, ab e28 Innen- gegen Außenaura) und hilft: dazusetzen, etwas bringen, zuhören, Laterne, Abstand und
// eine erwachsene Person holen, spielen. Jede Hilfe zählt; die passende zählt mehr. Höchstens eine Nachtwache je Nacht.
//   game.plugins.nachtwache → { active, candidates(), tonight(), start(npcId, { force }), resolve(helpId), cancel(), done(), variants() }
//   Ereignisse: nachtwache:start {id, npc, need, where} · nachtwache:clue {id} · nachtwache:help {id, npc, help, fit}
//     · nachtwache:done {id, npc, help, fit} · nachtwache:cancel {id, reason}
//   Spielstand: nachtwache = { lastDay, lastNpc, done: [{ id, npc, help, fit, day }] }
//   Debug: LUMO.debug.nachtwache(npcId?) · nachtwacheHelp(helpId) · nachtwacheCancel() · nachtwacheInfo()
import * as THREE from 'three';
import { generateNachtwache, pickTonight, variantCount, isNightHour, GLIMM_CLUE, HELPS } from './generate.js';

export default {
  id: 'nachtwache', order: 46, deps: ['npcs', 'session'],
  install(game) {
    const { events, state, content, player, world, scene } = game;
    const island = world.island;
    const N = game.npcs, S = game.session;
    const emit = (n, p) => events.emit(n, p);
    const params = game.params || new URLSearchParams('');
    const day = () => Number(state.get('time.day', 1)) || 1;
    const nw = () => state.get('nachtwache') || { lastDay: 0, lastNpc: null, done: [] };
    let active = null;    // { def, npc, where, lantern, tracks, clueT, markerOn, resolving }
    let schedT = 0;

    const unlocked = () => params.has('alles') || (state.get('units.j1-e05') || 'gesperrt') !== 'gesperrt';
    const isNight = () => (world.sky && world.sky.time && typeof world.sky.time.night === 'number' ? world.sky.time.night > 0.5 : isNightHour(game.time.hour));
    const zoneOfNpc = (npc) => island.zoneAt(npc.position.x, npc.position.z) || (npc.entry && content.resolveSite(npc.entry.site) && island.zoneAt(content.resolveSite(npc.entry.site).x, content.resolveSite(npc.entry.site).z)) || null;

    function candidates() {
      return N.main().filter((n) => !n.def.noSpawn).map((n) => {
        const zone = zoneOfNpc(n);
        const need = n.tanks.lowest();
        return { id: n.id, zone, need, needValue: n.tanks.value(need), zoneFree: !!zone && S.regionFreed(zone), unlocked: true, busy: n.busy };
      }).filter((c) => !c.busy);
    }
    function tonight() {
      if (!unlocked()) return null;
      const d = nw();
      if (d.lastDay === day()) return null;
      return pickTonight({ candidates: candidates(), day: day(), lastNpc: d.lastNpc });
    }
    // Stiller Ort: 12–16 m vom Abendplatz weg, begehbar, vom Zonenzentrum weg
    function quietSpot(npc) {
      const p = npc.position;
      const Z = island.zoneById(zoneOfNpc(npc)) || { x: 0, z: 0 };
      const a0 = Math.atan2(p.x - Z.x, p.z - Z.z);
      for (let k = 0; k < 12; k++) {
        const a = a0 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.5, r = 14 - (k % 3) * 2;
        const x = p.x + Math.sin(a) * r, z = p.z + Math.cos(a) * r;
        if (island.isWalkable(x, z) && island.getHeight(x, z) > 0.3) return { x: +x.toFixed(1), z: +z.toFixed(1) };
      }
      return { x: p.x + 6, z: p.z + 6 };
    }
    function defFor(npc, need) {
      const d = day();
      const own = content.list('nachtwache').filter((x) => x.npc === npc.id && (!x.from || (state.get('units.' + x.from) || 'gesperrt') !== 'gesperrt'));
      const recent = new Set(nw().done.slice(-6).map((e) => e.id));
      const fresh = own.filter((x) => !recent.has(x.id));
      if (fresh.length) return fresh[d % fresh.length];
      if (own.length) return own[d % own.length];
      return generateNachtwache(npc.def, { need, day: d });
    }
    function buildTracks(from, to) {
      const g = new THREE.Group(); g.name = 'nw-spuren';
      const n = 7, parts = [];
      for (let i = 1; i <= n; i++) {
        const t = i / (n + 1), x = from.x + (to.x - from.x) * t + Math.sin(i * 2.1) * 0.5, z = from.z + (to.z - from.z) * t + Math.cos(i * 1.7) * 0.5;
        parts.push(game.geom.part(new THREE.CircleGeometry(0.22, 8), { pos: [x, island.getHeight(x, z) + 0.06, z], rot: [-Math.PI / 2, 0, 0], color: '#9fb4ff' }));
      }
      const mesh = new THREE.Mesh(game.geom.merge(parts), game.props.materials.glow('#8fa3ff', { intensity: 0.9, veil: false }));
      mesh.castShadow = false; g.add(mesh); scene.add(g);
      return { group: g, dispose() { scene.remove(g); mesh.geometry.dispose(); } };
    }

    function start(npcId, { force = false } = {}) {
      if (active) return null;
      const id = npcId || tonight();
      const npc = id ? N.get(id) : null;
      if (!npc) return null;
      if (!force && (!isNight() || !unlocked())) return null;
      const need = npc.tanks.lowest();
      const def = defFor(npc, need);
      const home = { x: npc.position.x, z: npc.position.z };
      const w = def.where ? content.resolveSite(def.where) : null;
      const where = w && typeof w.x === 'number' ? { x: w.x, z: w.z } : quietSpot(npc);
      // Figur: Außen ruhig, innen anders; sitzt zusammengesunken am stillen Ort
      npc.emotion.set({ primary: def.outer || ['freude', 3], secondary: null, inner: def.inner || ['trauer', 7], hold: 3600 });
      const far = npc.distTo(player.position) > 60;
      npc.setOverride({ x: where.x, z: where.z, anim: 'sit', poses: { slump: 0.8, headDown: 0.6, armCross: 0.3 }, yaw: Math.atan2(home.x - where.x, home.z - where.z) + Math.PI });
      if (far) npc.warpTo(where.x, where.z);
      // Laterne am gewohnten Platz: aus
      const lantern = game.props ? game.props.spawn('laterne', { id: 'nw-laterne-' + npc.id, x: home.x + 1.2, z: home.z - 0.8, variant: 'pfahl', lit: false, dynamic: true }) : null;
      const tracks = (def.clue && def.clue.tracks !== false) ? buildTracks(home, where) : null;
      active = { def, npc, where, home, lantern, tracks, clueT: far ? 4 : 10, markerOn: false, resolving: false, need };
      if (game.ui && game.ui.setMarker) game.ui.setMarker('nachtwache', home.x, home.z, '☾', '#8fa3ff');
      emit('nachtwache:start', { id: def.id, npc: npc.id, need, where, generated: !!def.generated });
      return def;
    }
    function clearVisuals() {
      if (!active) return;
      if (active.lantern) { try { active.lantern.remove(); } catch (e) { /* egal */ } }
      if (active.tracks) active.tracks.dispose();
      if (game.ui && game.ui.removeMarker) game.ui.removeMarker('nachtwache');
    }
    function finish(entry) {
      const a = active;
      if (!a) return;
      const d = nw();
      d.lastDay = day(); d.lastNpc = a.npc.id; d.done = (d.done || []).concat([entry]).slice(-40);
      state.set('nachtwache', d);
      if (a.lantern) a.lantern.setLit(true);
      if (a.tracks) a.tracks.dispose();
      if (game.ui && game.ui.removeMarker) game.ui.removeMarker('nachtwache');
      const npc = a.npc;
      // Erleichterung: das Innere hellt auf, dann zurück in den Tagesablauf (Nacht = zu Hause)
      npc.emotion.set({ primary: ['freude', 4], inner: null, hold: 120 });
      npc.setOverride({ x: a.where.x, z: a.where.z, anim: 'idle', poses: { upright: 0.6 } });
      setTimeout(() => { if (!active || active.npc !== npc) { npc.clearOverride(); if (a.lantern) { try { a.lantern.remove(); } catch (e) { /* egal */ } } } }, 6000);
      active = null;
      emit('nachtwache:done', { ...entry });
    }
    function cancel(reason = 'tag') {
      if (!active) return false;
      const a = active;
      clearVisuals();
      a.npc.clearOverride();
      a.npc.emotion.set({ ...a.npc.emotion.base, hold: 0 });
      active = null;
      emit('nachtwache:cancel', { id: a.def.id, reason });
      return true;
    }
    // Belohnungen (Teilmenge der Effekt-DSL)
    function applyEffects(list, npcId, lineText) {
      for (const e of list || []) {
        if (!e || typeof e !== 'object') continue;
        if (e.bond) N.bondAdd(e.bond[0], e.bond[1]);
        else if (e.lichtsplitter) { state.inc('lichtsplitter', e.lichtsplitter); if (game.ui && game.ui.toast) game.ui.toast(`+${e.lichtsplitter} Lichtsplitter`); }
        else if (e.deed) N.deed(npcId, e.deed, lineText);
        else if (e.flag) state.set('flags.' + e.flag, e.set === undefined ? true : e.set);
        else if (N.applyEffect(e)) { /* Figuren-Effekt */ }
        else emit('effect:apply', e);
      }
    }
    async function resolve(helpId) {
      if (!active || active.resolving) return null;
      const a = active;
      const help = (a.def.help || []).find((h) => h.id === helpId) || (helpId === 'hilfe' ? (a.def.help || []).find((h) => h.adult) || HELPS.find((h) => h.id === 'abstand') : null);
      if (!help) return null;
      a.resolving = true;
      const fit = help.fits === a.need;
      emit('nachtwache:help', { id: a.def.id, npc: a.npc.id, help: help.id, fit });
      const ui = game.ui;
      const H = player.humanoid;
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      if (ui && ui.lock) ui.lock.acquire('nachtwache');
      try {
        if (help.emote && H && H.playEmote) { H.playEmote(help.emote, { seconds: Math.min(6, help.seconds || 4) }); }
        if (help.id === 'laterne' && a.lantern) a.lantern.setLit(true);
        if (help.adult) { if (ui && ui.glimm) ui.glimm('Du holst jemanden. Gut.'); a.npc.face(null); }
        else a.npc.face(player.position);
        await wait(Math.min(3000, (help.seconds || 3) * 400));
        const line = fit ? a.def.line.fit : a.def.line.other;
        const text = typeof line === 'object' ? line.t : line;
        const deedId = `${a.npc.id}-nachtwache-${help.id}`;
        applyEffects(fit ? a.def.reward.fit : a.def.reward.other, a.npc.id, text);
        N.deed(a.npc.id, deedId, text);
        if (ui && ui.say) await ui.say({ who: a.npc.id, text, anchor: a.npc.group });
        if (game.audio) game.audio.play(fit ? 'chime' : 'pickup');
        finish({ id: a.def.id, npc: a.npc.id, help: help.id, fit, day: day() });
        return { help: help.id, fit };
      } finally {
        if (ui && ui.lock) ui.lock.release('nachtwache');
        a.resolving = false;
        a.npc.face(null);
      }
    }
    // Gespräch mit der Figur während der Nachtwache: Hilfen als Kacheln
    events.on('npc:talk', (e) => {
      if (!active || !e || e.id !== active.npc.id || active.resolving) return;
      e.handled = true;
      (async () => {
        const a = active, ui = game.ui;
        if (!ui || !ui.ask) return;
        const name = N.nameOf(a.npc.id);
        const cam = game.cameraRig; if (cam && cam.setMode) cam.setMode('talk', { target: a.npc.group, side: -1 });
        await ui.say({ who: a.npc.id, text: (a.def.say && (a.def.say.t || a.def.say)) || '…', anchor: a.npc.group, seconds: 2.2, wait: false });
        const r = await ui.ask({ prompt: `${name} sitzt allein. Und du?`, items: (a.def.help || []).slice(0, 4).map((h) => ({ id: h.id, label: h.label, icon: h.icon || 'herz', tone: h.adult ? 'handlung' : 'ruhig' })), system: { rueckzug: { label: 'Später' } } });
        if (cam && cam.setMode) cam.setMode(null);
        if (!r || (r.system === 'rueckzug') || !r.id) { a.npc.face(null); return; }
        await resolve(r.system === 'hilfe' ? 'hilfe' : r.id);
      })().catch((err) => console.error('[nachtwache]', err));
    });

    game.addUpdate((dt) => {
      if (!game.started) return;
      schedT -= dt;
      if (active) {
        active.clueT -= dt;
        if (active.clueT <= 0 && !active.markerOn) {
          active.markerOn = true;
          const text = (active.def.clue && active.def.clue.glimm) || GLIMM_CLUE(N.nameOf(active.npc.id));
          if (game.ui && game.ui.glimm) game.ui.glimm(text);
          emit('nachtwache:clue', { id: active.def.id, npc: active.npc.id });
        }
        if (active.markerOn && game.ui && game.ui.setMarker) {
          const d = Math.hypot(player.position.x - active.home.x, player.position.z - active.home.z);
          if (d < 30) game.ui.setMarker('nachtwache', active.where.x, active.where.z, '☾', '#8fa3ff');
        }
        if (!isNight() && !active.resolving) cancel('tag');
        return;
      }
      if (schedT > 0) return;
      schedT = 1;
      if (game.scenes && game.scenes.isInterior) return;
      if (!isNight() || !unlocked()) return;
      const id = tonight();
      if (id) start(id);
    }, { order: 13 });
    events.on('day:new', () => { if (active && !active.resolving) cancel('neuer-tag'); });
    events.on('state:reset', () => { if (active) cancel('reset'); });

    const api = {
      HELPS,
      get active() { return active ? { id: active.def.id, npc: active.npc.id, need: active.need, where: active.where, home: active.home, generated: !!active.def.generated, help: (active.def.help || []).map((h) => h.id), clue: active.markerOn } : null; },
      candidates, tonight, start, resolve, cancel,
      done: () => nw().done.slice(),
      variants: () => variantCount(N.defs) + content.list('nachtwache').length,
      isNight, unlocked,
    };
    const D = game.debug || (game.debug = {});
    D.nachtwache = (npcId) => { const d = start(npcId, { force: true }); return d ? { id: d.id, npc: d.npc, need: d.need, help: d.help.map((h) => h.id) } : null; };
    D.nachtwacheHelp = (helpId) => resolve(helpId);
    D.nachtwacheCancel = () => cancel('debug');
    D.nachtwacheInfo = () => ({ active: api.active, tonight: tonight(), candidates: candidates(), night: isNight(), unlocked: unlocked(), variants: api.variants() });
    return api;
  },
};
