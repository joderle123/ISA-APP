// Hafen-Plugin (Demo, DESIGN §11 M0): der spielbare Demo-Pfad im Hafen-Dorf.
//   · Erster Start: Hafen-Schleier auf RegionDef.veil.start (0,55), Ankunfts-Quest 'hafen-ankunft' (Ilda gibt den Blick).
//     Danach öffnen die Kurs-Codes (BOJE, DELFIN, OTTER) die Quests j1-e01…e03; jede Quest senkt den Schleier
//     (RegionDef.veil.steps) als Farbwelle, e03 macht den Hafen ganz bunt.
//   · Andere Regionen bleiben grau: beim Betreten sagt Glimm einmal je Sitzung „Grau hier. Kommt bald.“
//     (nach M0 am Strand: „Da glitzert was. Kommt bald.“, am Turm „Zu. Kratzer am Schloss.“ – docs/STORY.md)
//   · Story-Beats (docs/STORY.md): Ankunft mit dem Boot (erster Start, nach dem Stil-Studio) und je ein kurzer Beat am
//     Morgen nach dem Lagerfeuer von e01/e02/e03 (m0-nach-e01, m0-nach-e02, m0-finale). Spielstand: story.beat (wartend),
//     story.seen.<id>. Unter ?test nur mit ?story, damit Szenarien nicht von Szenen unterbrochen werden.
//     m0-nach-e01 ist eine Nachtszene am Dorffeuer (BEAT_SCENE: Uhrzeit + Ort, danach Morgen).
//     Entscheidungen der Beats liegen als flags.m0.* im Spielstand (docs/STORY.md §6).
//   · Autosave läuft im Kern (save.autosave); nach einer fertigen Quest wird sofort gespeichert.
//   game.plugins.hafen → { started(), teaser(zone) }   Spielstand: flags.hafenStart
//   Tests (?test): die Ankunft startet nur mit ?demo automatisch, damit ältere Szenarien (Code WELLE → aktiv) gleich bleiben.
export default {
  id: 'hafen', order: 68, deps: ['quests', 'session', 'ui'],
  install(game) {
    const { events, state, content, ui, world } = game;
    const params = game.params || new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
    const region = () => content.get('regions', 'hafen');
    const teased = new Set();

    function firstStart() {
      if (state.get('flags.hafenStart')) return false;
      if (params.has('test') && !params.has('demo')) return false;
      state.set('flags.hafenStart', true);
      const R = region();
      const start = R && R.veil && typeof R.veil.start === 'number' ? R.veil.start : 0.55;
      // Nur grauer machen, wenn der Hafen noch unberührt ist (kein Auftrag fertig)
      const done = Object.values(state.get('units', {}) || {}).some((v) => v === 'fertig');
      if (!done) {
        // sofort (ohne Überblendung), Spielstand wie die Effekt-DSL (state.veil.zones.<zone>)
        state.set('veil.zones.hafen', start);
        if (world.veil.setZone) world.veil.setZone('hafen', start);
        events.emit('veil:set', { zone: 'hafen', amount: start });
      }
      if (game.quests && content.has('quests', 'hafen-ankunft') && game.quests.status('hafen-ankunft') !== 'fertig') game.quests.offer('hafen-ankunft');
      return true;
    }

    // Grau ist grau: freundlicher Hinweis statt Absturz oder leerer Region
    function teaser(zone) {
      if (!zone || zone === 'hafen' || teased.has(zone)) return false;
      const v = world.veil.zoneValue ? world.veil.zoneValue(zone) : null;
      if (v === null || v < 0.5) return false;
      teased.add(zone);
      const m0 = (world.veil.zoneValue ? world.veil.zoneValue('hafen') : 1) <= 0.01;
      const line = zone === 'leuchtturm' ? 'Zu. Kratzer am Schloss. Kommt bald.' : zone === 'strand' && m0 ? 'Da glitzert was. Kommt bald.' : 'Grau hier. Kommt bald.';
      if (ui.glimm) ui.glimm(line, { seconds: 3 });
      return true;
    }
    events.on('zone:change', (e) => { if (game.started && e && e.id) setTimeout(() => teaser(e.id), 1400); });

    // Nach einer fertigen Hafen-Quest sofort sichern („Weiter“ funktioniert auch nach dem Schließen des Tabs)
    events.on('quest:complete', (e) => { if (e && e.id && game.save && game.save.request) game.save.request('force'); });
    events.on('quest:complete', (e) => {
      if (!e || e.kurz || e.id !== 'hafen-ankunft' || !ui.toast) return;
      setTimeout(() => ui.toast('Tagebuch → Code: Dein Kurs-Code öffnet den Auftrag.', 4200), 1500);
    });

    // ---- Story-Beats: erst abspielen, wenn nichts anderes offen ist (Stil-Studio, Lagerfeuer, Recap, Szene) ----
    const storyOn = !params.has('test') || params.has('story');
    const BEAT_AFTER = { 'j1-e01': 'm0-nach-e01', 'j1-e02': 'm0-nach-e02', 'j1-e03': 'm0-finale' };
    // Nachtszene (docs/STORY.md §12): vor dem Beat Uhr auf 22:30 und ans Dorffeuer, danach Morgen (du schläfst dort ein)
    const BEAT_SCENE = { 'm0-nach-e01': { hour: 22.5, site: 'hafen.feuerPlatz', after: 7.5, sits: 'ilda' } };
    function stageBeat(id) {
      const sc = BEAT_SCENE[id];
      if (!sc || !game.time || !game.time.setTimeOfDay) return null;
      const S = content.resolveSite ? content.resolveSite(sc.site) : null;
      if (S && game.player && game.player.teleport && !(game.scenes && game.scenes.isInterior)) {
        const px = S.x + 2.4, pz = S.z + 1.2;
        game.player.teleport(px, pz, Math.atan2(S.x - px, S.z - pz));
        if (game.cameraRig) { game.cameraRig.behindPlayer(); game.cameraRig.snap(); }
      }
      game.time.setTimeOfDay(sc.hour);
      // Figur sitzt schon am Feuer (nachts wäre sie laut Tagesablauf im Haus); Übersteuerung endet mit der Szene
      const n = sc.sits && S && game.npcs && game.npcs.get ? game.npcs.get(sc.sits) : null;
      if (n && n.setOverride && n.warpTo) {
        const nx = S.x + 0.6, nz = S.z + 2.8, y = Math.atan2(S.x - nx, S.z - nz);
        n.warpTo(nx, nz, y); n.setOverride({ x: nx, z: nz, yaw: y, anim: 'sit' });
      }
      return () => { if (n && n.clearOverride) n.clearOverride(); game.time.setTimeOfDay(sc.after); };
    }
    let beatTimer = null;
    const busy = () => !game.started || (ui.overlay && ui.overlay.count) || (game.dialogue && game.dialogue.isOpen) || (game.session && game.session.ending) || (game.scenes && game.scenes.isInterior);
    function playBeat(id, tries = 0, force = false) {
      if ((!storyOn && !force) || !id || !content.has('dialogues', id) || state.get('story.seen.' + id)) { if (state.get('story.beat') === id) state.set('story.beat', null); return false; }
      clearTimeout(beatTimer);
      if (busy()) { if (tries < 600) beatTimer = setTimeout(() => playBeat(id, tries + 1, force), 1000); return false; }
      state.set('story.seen.' + id, true);
      if (state.get('story.beat') === id) state.set('story.beat', null);
      const after = stageBeat(id);
      const run = game.dialogue && game.dialogue.play ? game.dialogue.play(id) : null;
      if (after) Promise.resolve(run).catch(() => null).then(after);
      return true;
    }
    events.on('quest:complete', (e) => { if (e && !e.kurz && BEAT_AFTER[e.id]) state.set('story.beat', BEAT_AFTER[e.id]); });
    events.on('session:ended', () => { const b = state.get('story.beat'); if (b) setTimeout(() => playBeat(b), 1200); });

    const onStart = () => {
      setTimeout(() => { if (firstStart()) setTimeout(() => playBeat('m0-ankunft-boot'), 2500); else { const b = state.get('story.beat'); if (b) setTimeout(() => playBeat(b), 3000); } }, 300);
    };
    if (game.started) onStart(); else events.on('game:start', onStart);
    events.on('state:reset', () => { teased.clear(); if (game.started) setTimeout(firstStart, 300); });

    const D = game.debug || (game.debug = {});
    D.hafenStart = () => { state.set('flags.hafenStart', false); return firstStart(); };
    // Debug/Tests: spielt den Beat auch unter ?test (ausdrücklicher Aufruf)
    D.storyBeat = (id) => { if (id) state.set('story.seen.' + id, false); return playBeat(id || state.get('story.beat'), 0, true); };
    return { started: () => !!state.get('flags.hafenStart'), teaser, firstStart, playBeat };
  },
};
