// Plugin-Installer: sortiert nach order und deps, ruft install(game) auf, sammelt die APIs in game.plugins.
// Konvention siehe src/core/state.js (Kopf). Eingabe: src/_gen/plugins.js → [{ file, plugin }].
export async function installPlugins(game, entries = []) {
  const events = game.events;
  const plugins = entries.map((e) => ({ file: e.file, p: e.plugin }));
  const bad = plugins.filter((x) => !x.p || typeof x.p !== 'object' || !x.p.id || typeof x.p.install !== 'function');
  for (const b of bad) console.error('[plugins]', b.file, 'ist kein Plugin (braucht id + install)');
  const list = plugins.filter((x) => !bad.includes(x));
  const ids = new Set(list.map((x) => x.p.id));
  list.sort((a, b) => (a.p.order || 0) - (b.p.order || 0) || a.file.localeCompare(b.file));

  if (!game.plugins) game.plugins = { core: game.plugins && game.plugins.core, list: [], failed: [] };
  game.plugins.list = game.plugins.list || [];
  game.plugins.failed = game.plugins.failed || [];
  const done = new Set(['core', ...game.plugins.list]);
  const pending = [...list];
  let guard = pending.length * pending.length + 1;
  while (pending.length && guard-- > 0) {
    const i = pending.findIndex((x) => (x.p.deps || []).every((d) => done.has(d)));
    if (i < 0) {
      for (const x of pending) {
        const missing = (x.p.deps || []).filter((d) => !done.has(d));
        console.error('[plugins]', x.p.id, 'übersprungen – fehlende Abhängigkeit:', missing.join(', '), ids.has(missing[0]) ? '(nicht installiert)' : '(unbekannt)');
        game.plugins.failed.push({ id: x.p.id, error: 'deps: ' + missing.join(', ') });
      }
      break;
    }
    const x = pending.splice(i, 1)[0];
    try {
      const api = await x.p.install(game);
      game.plugins[x.p.id] = api === undefined ? {} : api;
      game.plugins.list.push(x.p.id);
      done.add(x.p.id);
      if (events) events.emit('plugin:installed', { id: x.p.id, api: game.plugins[x.p.id] });
    } catch (e) {
      console.error('[plugins]', x.p.id, 'install() fehlgeschlagen:', e);
      game.plugins.failed.push({ id: x.p.id, error: String(e && e.message || e) });
    }
  }
  game.plugin = (id) => game.plugins[id] || null;
  return game.plugins;
}
