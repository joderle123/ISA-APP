// Hafen-Plugin (Demo, DESIGN §11 M0): der spielbare Demo-Pfad im Hafen-Dorf.
//   · Erster Start: Hafen-Schleier auf RegionDef.veil.start (0,55), Ankunfts-Quest 'hafen-ankunft' (Ilda gibt den Blick).
//     Danach öffnen die Kurs-Codes (BOJE, DELFIN, OTTER) die Quests j1-e01…e03; jede Quest senkt den Schleier
//     (RegionDef.veil.steps) als Farbwelle, e03 macht den Hafen ganz bunt.
//   · Andere Regionen bleiben grau: beim Betreten sagt Glimm einmal je Sitzung „Grau hier. Kommt bald.“
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
      if (ui.glimm) ui.glimm('Grau hier. Kommt bald.', { seconds: 3 });
      return true;
    }
    events.on('zone:change', (e) => { if (game.started && e && e.id) setTimeout(() => teaser(e.id), 1400); });

    // Nach einer fertigen Hafen-Quest sofort sichern („Weiter“ funktioniert auch nach dem Schließen des Tabs)
    events.on('quest:complete', (e) => { if (e && e.id && game.save && game.save.request) game.save.request('force'); });
    events.on('quest:complete', (e) => {
      if (!e || e.kurz || e.id !== 'hafen-ankunft' || !ui.toast) return;
      setTimeout(() => ui.toast('Tagebuch → Code: Dein Kurs-Code öffnet den Auftrag.', 4200), 1500);
    });

    const onStart = () => setTimeout(firstStart, 300);
    if (game.started) onStart(); else events.on('game:start', onStart);
    events.on('state:reset', () => { teased.clear(); if (game.started) setTimeout(firstStart, 300); });

    const D = game.debug || (game.debug = {});
    D.hafenStart = () => { state.set('flags.hafenStart', false); return firstStart(); };
    return { started: () => !!state.get('flags.hafenStart'), teaser, firstStart };
  },
};
