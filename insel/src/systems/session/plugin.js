// Sitzungsfluss (WP42, DESIGN §3): „Letztes Mal“ (3 Bildkarten, 15 s, überspringbar), ein Hauptmarker mit einem Ziel in
// Reichweite, Abend am Feuer (bis zu 3 Figuren mit Tat-Satz, Bester Moment, Cliffhanger, Speichern, neuer Inseltag),
// Signalfeuer (Schnellreise, Speichern), Modi, Jahreszeit-Paletten je Modul, Inselwetter-Events.
//   game.session = game.plugins.session → { day, recap({ force }) → Promise, end({ via }) → Promise, newDay(), moment(m),
//     deed(npc, id, text), target, setTarget(t|null), buildRecap(), campfirePlan(), cliffhanger(), signalfeuer, weather,
//     seasons, mode (get/set), modeParams(), evalCond(c), regionFreed(id), log }
//   Ereignisse: session:start {day, returning} · session:recap {skipped} · session:campfire {via, lines, moments} ·
//     session:ended {via, moment, closed} · day:new {day} · session:target {target} · season:change · weather:start/end · signalfeuer:*
//   Hört auf: session:end {via:'pause'} (Pause-Menü „Für heute Schluss“) · quest:complete (Hauptquest → Feuer; nicht mit ?test)
//     · weather:set {id} (Inselwetter-Code)
//   Spielstand: time.day · recap {zone, deed, unitDone, collected, target} · signalfeuer.<id> · session.log (Laufzeit)
//   Debug: LUMO.debug.recap() · endSession() · newDay() · weather(id|null) · season(id|null) · lightFire(id) · travel(id)
import { buildRecap, buildCampfireLines, buildMoments, pickCliffhanger, moduleProgress, modeParams, evalCond, ZONE_NAME, ZONE_ICON, ZONE_COLOR, MODULE_REGION } from './logic.js';
import { createSignalfeuer } from './signalfeuer.js';
import { createWeather } from './weather.js';
import { createSeasons } from './seasons.js';

export default {
  id: 'session', order: 45, deps: ['ui', 'npcs'],
  install(game) {
    const { events, state, content, player, world, ui } = game;
    const island = world.island;
    const emit = (n, p) => events.emit(n, p);
    const params = game.params || new URLSearchParams('');
    const day = () => Number(state.get('time.day', 1)) || 1;
    const emptyLog = () => ({ deeds: [], moments: [], zones: [], units: [], collected: 0, startedDay: day() });
    const log = () => { let l = state.get('session.log'); if (!l) { l = emptyLog(); state.set('session.log', l); } return l; };
    let target = null, targetT = 0, ending = false, recapShown = false;

    // ---- Bedingungen und Regionen ----
    const regionFreed = (id) => { const region = content.get('regions', id); const zone = (region && region.veil && region.veil.zone) || id; const v = world.veil.zoneValue(zone); if (v !== null) return v < 0.5; const p = world.veil.getPatch && world.veil.getPatch(id); return !!p && p.veil < 0.5; };
    const cond = (c) => evalCond(c, { state, hour: () => game.time.hour, regionFreed, npcs: game.npcs });

    const seasons = createSeasons({ game });
    const weather = createWeather({ game, seasons });
    const fires = createSignalfeuer({ game, evalCond: cond, onSchluss: (o) => api.end(o) });
    game.addUpdate(() => seasons.update(), { order: -9.5, always: true });
    game.addUpdate((dt) => { if (game.started) weather.update(dt); }, { order: 11 });
    events.on('weather:set', (e) => { if (e && e.id) weather.set(e.id); });

    // ---- Momente und Taten der Sitzung ----
    function moment(m) {
      if (!m || !m.id) return false;
      const l = log();
      if (l.moments.some((x) => x.id === m.id)) return false;
      l.moments.push({ id: m.id, icon: m.icon || 'stern', title: m.title || 'Ein Moment', color: m.color || '#ffd166', kind: m.kind || m.icon || 'x' });
      if (l.moments.length > 12) l.moments.shift();
      state.set('session.log', l);
      return true;
    }
    function deed(npc, id, text) {
      if (!id) return false;
      // Taten-Log im Format der Quest-Engine (WP31): deeds[] + deedLog[] (über das Figuren-System)
      if (game.npcs && game.npcs.deed) game.npcs.deed(npc, id, text);
      else { state.addUnique('deeds', id); if (!(state.get('deedLog', []) || []).some((e) => e.id === id && e.day === day())) state.push('deedLog', { id, day: day(), t: Date.now(), unit: null, npc: npc || null, text: text || null }); }
      const d = content.get('npcs', npc);
      moment({ id: 'tat-' + id, icon: (d && d.icon) || 'herz', title: text ? String(text).split(/\s+/).slice(0, 4).join(' ') : `Mit ${game.npcs ? game.npcs.nameOf(npc) : npc}`, color: (d && d.color) || '#ffd166', kind: 'tat' });
      return true;
    }
    events.on('unit:complete', (e) => { if (!e || !e.id) return; const l = log(); if (!l.units.includes(e.id)) l.units.push(e.id); state.set('session.log', l); const u = content.unit(e.id); moment({ id: 'einheit-' + e.id, icon: 'medaille', title: u ? u.quest : 'Geschafft', color: '#ffd166', kind: 'einheit' }); });
    events.on('zone:change', (e) => { if (!e || !e.id) return; const l = log(); if (!l.zones.includes(e.id)) { l.zones.push(e.id); state.set('session.log', l); moment({ id: 'zone-' + e.id, icon: ZONE_ICON[e.id] || 'karte', title: ZONE_NAME[e.id] || e.id, color: ZONE_COLOR[e.id] || '#ffd166', kind: 'zone' }); } });
    events.on('veil:restored', (e) => { if (!e) return; moment({ id: 'farbe-' + e.id, icon: 'wetter', title: 'Farbe zurück', color: ZONE_COLOR[e.id] || '#2de2c9', kind: 'farbe' }); });
    events.on('collect', (e) => { if (!e) return; const l = log(); l.collected = (l.collected || 0) + 1; state.set('session.log', l); if (e.type === 'muschel' || e.type === 'aussicht') moment({ id: 'fund-' + e.id, icon: e.type === 'muschel' ? 'muschel' : 'augen', title: e.type === 'muschel' ? 'Eine Erinnerungsmuschel' : 'Ein Aussichtspunkt', color: '#39d0c8', kind: e.type }); });
    events.on('nachtwache:done', (e) => { if (e && e.npc) moment({ id: 'nw-' + e.id, icon: 'mond', title: `Nachts bei ${game.npcs ? game.npcs.nameOf(e.npc) : e.npc}`, color: '#8fa3ff', kind: 'nachtwache' }); });

    // ---- Hauptmarker: immer ein Ziel, das nah ist ----
    function autoTarget() {
      // 1) laufende/offene Einheit → Region der Einheit
      const us = state.get('units') || {};
      const unit = content.units.find((u) => us[u.id] === 'aktiv') || content.units.find((u) => us[u.id] === 'offen');
      if (game.plugins.quests && game.plugins.quests.markerTarget) { const t = game.plugins.quests.markerTarget(); if (t && typeof t.x === 'number') return { ...t, icon: t.icon || 'auftrag', title: t.title || t.label || 'Dein Auftrag', text: t.text || 'Folge dem Marker.', color: t.color || '#ffd166' }; }
      if (unit) { const Z = island.zoneById(unit.region); if (Z) return { x: Z.spawn.x, z: Z.spawn.z, icon: ZONE_ICON[unit.region] || 'auftrag', title: unit.quest, text: `Es geht los in: ${ZONE_NAME[unit.region] || unit.region}.`, color: ZONE_COLOR[unit.region] || '#ffd166', kind: 'quest' }; }
      // 2) nächstes dunkles Signalfeuer in einer freien Zone, sonst das nächste dunkle Feuer überhaupt
      const p = player.position;
      const dark = fires.list().filter((f) => !f.lit).sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
      if (dark.length) { const f = dark[0]; return { x: f.x, z: f.z, icon: 'feuer', title: 'Ein dunkles Signalfeuer', text: `${f.name}: Farbe bringt es zum Brennen.`, color: '#ff8c42', kind: 'feuer' }; }
      // 3) nächste Sammelsache
      if (game.plugins.collectibles && game.plugins.collectibles.nearest) { const c = game.plugins.collectibles.nearest(p.x, p.z); if (c) return { x: c.x, z: c.z, icon: 'splitter', title: 'Ein Lichtsplitter', text: 'Er glitzert ganz in der Nähe.', color: '#fff3a0', kind: 'splitter' }; }
      const B = island.SITES.baumhaus;
      return { x: B.x, z: B.z, icon: 'haengematte', title: 'Das Baumhaus', text: 'Dein Platz am Hafen.', color: '#ffb347', kind: 'baumhaus' };
    }
    function setTarget(t) {
      target = t ? { ...t } : null;
      if (ui && ui.setMarker) { if (target) ui.setMarker('haupt', target.x, target.z, '◆', target.color || '#ffd166'); else if (ui.removeMarker) ui.removeMarker('haupt'); }
      emit('session:target', { target });
      return target;
    }
    let manual = null;
    game.addUpdate((dt) => {
      if (!game.started) return;
      targetT -= dt;
      if (targetT > 0) return;
      targetT = 2;
      const t = manual || autoTarget();
      if (!target || t.x !== target.x || t.z !== target.z || t.title !== target.title) setTarget(t);
    }, { order: 12 });

    // ---- Recap „Letztes Mal“ ----
    function captureRecap(d) {
      const l = state.get('session.log') || emptyLog();
      const p = player.position;
      const zone = island.zoneAt(p.x, p.z) || game.zone || 'hafen';
      const lastDeed = (state.get('deedLog', []) || []).slice(-1)[0] || null;
      const npcDef = lastDeed && lastDeed.npc ? content.get('npcs', lastDeed.npc) : null;
      d.recap = {
        zone, day: day(),
        deed: lastDeed ? { text: lastDeed.text || (npcDef ? `Du hast ${game.npcs ? game.npcs.nameOf(lastDeed.npc) : lastDeed.npc} geholfen.` : 'Eine gute Tat.'), icon: (npcDef && npcDef.icon) || 'haken', color: (npcDef && npcDef.color) || '#2de2c9', title: npcDef ? `Mit ${game.npcs ? game.npcs.nameOf(lastDeed.npc) : npcDef.name}` : 'Deine Tat' } : null,
        unitDone: l.units.length ? l.units[l.units.length - 1] : null,
        collected: l.collected || 0,
        target: target ? { icon: target.icon, color: target.color, title: target.title, text: target.text } : null,
      };
    }
    game.save.onCapture(captureRecap);
    async function recap({ force = false, seconds = 15 } = {}) {
      if (!ui || !ui.recap) return { skipped: true, shown: false };
      const saved = state.get('recap');
      const returning = !!saved && (state.get('playSeconds', 0) > 30);
      if (!force && !returning) return { skipped: false, shown: false };
      recapShown = true;
      const cards = buildRecap({ recap: saved || {}, units: state.get('units') || {}, target: target || autoTarget(), content });
      const r = await ui.recap.show({ cards, seconds });
      emit('session:recap', { skipped: !!r.skipped });
      return { ...r, shown: true };
    }

    // ---- Abend am Feuer und neuer Tag ----
    function campfirePlan() {
      const npcDefs = (game.npcs ? game.npcs.defs : content.list('npcs'));
      let lines = buildCampfireLines({ deedLog: state.get('deedLog', []) || [], day: day(), npcDefs });
      // Quest-Engine (WP31) liefert Sätze aus ihrem Taten-Log, wenn vorhanden
      if (!lines.length && game.plugins.quests && game.plugins.quests.deeds && game.plugins.quests.deeds.campfireLines) { try { lines = game.plugins.quests.deeds.campfireLines(3); } catch (e) { /* egal */ } }
      const hasE05 = (state.get('units.j1-e05') || 'gesperrt') !== 'gesperrt';
      const moments = hasE05 || params.has('test') ? buildMoments(log().moments) : [];
      const prog = moduleProgress(state.get('units') || {});
      const extra = content.list('cliffhangers').flatMap((c) => (Array.isArray(c.lines) ? c.lines : []));
      const cliffhanger = pickCliffhanger({ module: prog.module, day: day(), extra });
      return { lines, moments, cliffhanger };
    }
    async function end({ via = 'api', campfire = true } = {}) {
      if (ending) return null;
      ending = true;
      emit('session:end:start', { via });
      try {
        const plan = campfirePlan();
        emit('session:campfire', { via, lines: plan.lines.length, moments: plan.moments.length });
        let r = { moment: null, closed: false };
        if (campfire && ui && ui.campfire) r = await ui.campfire.show({ ...plan, save: true });
        newDay();
        state.set('session.log', emptyLog());
        game.save.request('force');
        emit('session:ended', { via, moment: r.moment, closed: r.closed });
        return r;
      } finally { ending = false; }
    }
    function newDay() {
      const d = day() + 1;
      state.set('time.day', d);
      // Morgen im Baumhaus (DESIGN §3): Zeit 7:30, Start am Podest
      game.time.setTimeOfDay(7.5);
      const B = island.SITES.baumhaus;
      if (!(game.scenes && game.scenes.isInterior)) { player.teleport(B.x + 2, B.z + 3, Math.atan2(-B.x, -B.z)); if (game.cameraRig) { game.cameraRig.behindPlayer(); game.cameraRig.snap(); } }
      emit('day:new', { day: d });
      return d;
    }
    events.on('session:end', (e) => { if (e && e.via === 'pause' && !ending) end({ via: 'pause' }); });
    // Nach einer Hauptquest folgt der Abend am Feuer (DESIGN §3) – in Tests (?test) nur auf Wunsch (?feuer), damit Szenarien nicht pausieren
    events.on('quest:complete', (e) => {
      if (!e || e.campfire === false || e.kurz || ending || !content.unit(e.id)) return;
      if (params.has('test') && !params.has('feuer')) return;
      setTimeout(() => { if (!ending && !(ui && ui.overlay && ui.overlay.count)) end({ via: 'quest' }); }, 1200);
    });

    // ---- Start ----
    const onStart = () => {
      const returning = state.get('playSeconds', 0) > 30 && !!state.get('recap');
      emit('session:start', { day: day(), returning });
      fires.refresh();
      seasons.refresh();
      if (params.has('test') || params.has('norecap')) return;
      setTimeout(() => { if (game.started && !ui.overlay.count) recap(); }, 900);
    };
    if (game.started) onStart(); else events.on('game:start', onStart);

    const api = {
      get day() { return day(); },
      get target() { return target; },
      get log() { return log(); },
      get mode() { return state.get('settings.mode', 'abenteuer'); },
      set mode(m) { if (ui && ui.settings) ui.settings.set('mode', m); else state.set('settings.mode', m); },
      modeParams: () => modeParams(state.get('settings.mode', 'abenteuer')),
      recap, end, newDay, moment, deed, campfirePlan, setTarget: (t) => { manual = t || null; return setTarget(t || autoTarget()); }, buildRecap: () => buildRecap({ recap: state.get('recap') || {}, units: state.get('units') || {}, target: target || autoTarget(), content }),
      cliffhanger: () => campfirePlan().cliffhanger,
      signalfeuer: fires, weather, seasons, evalCond: cond, regionFreed, MODULE_REGION,
      get recapShown() { return recapShown; },
      get ending() { return ending; },
    };
    game.session = api;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.recap = (force = true) => recap({ force });
    D.endSession = (via = 'debug') => end({ via });
    D.newDay = () => newDay();
    D.weather = (id) => (id ? weather.set(id) : weather.clear());
    D.season = (id) => seasons.override(id || null);
    D.lightFire = (id) => fires.light(id);
    D.travel = (id) => fires.travel(id, { fade: false });
    D.fires = () => fires.list();
    D.sessionLog = () => log();
    return api;
  },
};
