/* LUMO · Plugin-Konvention und Spielzustand (Kern, WP00). Gilt für alle späteren Systeme.
 *
 * PLUGINS
 *   Ein Plugin ist eine Datei  src/<irgendwo>/plugin.js  mit genau diesem Export:
 *     export default {
 *       id: 'puls',            // eindeutig, ASCII-kebab-case, LITERAL (der Build liest id/order/deps statisch)
 *       order: 30,             // kleiner = früher. Richtwerte: Kern 0–9 · Welt 10–29 · Systeme 30–59 · UI 60–89 · Inhalt/Debug 90+
 *       deps: ['quests'],      // ids anderer Plugins, die vorher installiert sein müssen ('core' ist immer da)
 *       install(game) { …; return api; },   // darf async sein; Rückgabe landet in game.plugins[id]
 *     };
 *   build.mjs sammelt alle plugin.js in src/_gen/plugins.js ein (sortiert nach order, dann deps; Zyklen und
 *   fehlende deps brechen den Build ab). game.js installiert sie nach dem Weltaufbau und vor game.start().
 *   Zugriff: game.plugins.puls (= Rückgabe von install), game.plugin('puls'). Ereignis 'plugin:installed' {id}.
 *   Ein Plugin, dessen install() wirft, wird übersprungen (console.error) – das Spiel läuft weiter.
 *
 * INHALTE
 *   src/content/<kind>/<name>.js  (oder src/content/<name>.js) mit  export default { id: '…', … }
 *   landen ohne Import in game.content:  content.get('quests', 'j1-e11') · content.list('npcs') · content.unit('j1-e11')
 *   Ordnername = kind (regions, npcs, quests, dialogues, minigames, rooms, memories, nachtwache, gadgets,
 *   cosmetics, collectibles); Dateien direkt unter content/ heißen nach ihrem Dateinamen (glimm, units).
 *   Schema und Validator: src/content/schema/*, node tools/validate-content.mjs, node tools/lint-text.mjs.
 *
 * SPIELZUSTAND (game.state)
 *   Ein Objekt nach CONTENT-SCHEMA „SaveState“ (siehe core/save.js: defaultState()). Zugriff über Pfade:
 *     state.get('units.j1-e11')            state.set('units.j1-e11', 'aktiv')      state.patch({ ampel: {…} })
 *     state.addUnique('abilities', 'segel') state.inc('session.puls', 8)            state.push('deeds', 'jolie-…')
 *     state.on('units', fn)  → fn({ path, value, prev })  (auch für Unterpfade)   state.on('*', fn)  alles
 *   Jede Änderung löst auf game.events 'state:change' {path, value, prev} aus; state.reset(data) löst 'state:reset' aus.
 *   'session.*' wird NICHT gespeichert (Laufzeit: puls, …); 'private.*' und 'baumhaus.glas' gehen NIE in den Export.
 *   Pfade trennen an '.', daher keine Schlüssel mit Punkt als Pfadsegment (Upgrades wie 'blick.tanks' liegen in Arrays).
 *
 * EREIGNISSE (Konvention für Systeme, damit Debug/Tests sie auslösen können)
 *   'unit:unlock' {id}  'unit:complete' {id}  'ability:grant' {id}  'puls:set' {value}  'mode:change' {mode}
 *   'bond:change' {npc, level}  'veil:set' {zone, amount}  'save:saved' {slot}  'save:load' {slot}  'save:wipe'
 */

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const split = (path) => (Array.isArray(path) ? path : String(path).split('.').filter(Boolean));

export function createState({ events = null, data = {} } = {}) {
  let root = data;
  const listeners = new Map(); // pattern -> Set(fn)

  function getAt(obj, keys) {
    let cur = obj;
    for (const k of keys) {
      if (cur === null || cur === undefined) return undefined;
      cur = cur[k];
    }
    return cur;
  }
  function setAt(obj, keys, value) {
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!isObj(cur[k]) && !Array.isArray(cur[k])) cur[k] = {};
      cur = cur[k];
    }
    const last = keys[keys.length - 1];
    const prev = cur[last];
    if (value === undefined) delete cur[last]; else cur[last] = value;
    return prev;
  }
  function notify(path, value, prev) {
    const ev = { path, value, prev };
    listeners.forEach((set, pattern) => {
      if (pattern === '*' || pattern === path || path.startsWith(pattern + '.') || pattern.startsWith(path + '.')) {
        for (const fn of [...set]) { try { fn(ev); } catch (e) { console.error('[state]', pattern, e); } }
      }
    });
    if (events) events.emit('state:change', ev);
  }

  const state = {
    get data() { return root; },
    get(path, fallback) {
      const v = getAt(root, split(path));
      return v === undefined ? fallback : v;
    },
    has(path) { return getAt(root, split(path)) !== undefined; },
    set(path, value, { silent = false } = {}) {
      const keys = split(path);
      if (!keys.length) return state.reset(value);
      const prev = setAt(root, keys, value);
      if (!silent && prev !== value) notify(keys.join('.'), value, prev);
      return value;
    },
    // Löschen = set(path, undefined)
    remove(path) { return state.set(path, undefined); },
    // Mehrere Schlüssel auf einmal (flach je Pfad): patch({ 'settings.mode': 'profi', puls: 3 })
    patch(obj, opts) { for (const k of Object.keys(obj)) state.set(k, obj[k], opts); },
    // Objekt an Pfad mit Werten zusammenführen (eine Ebene)
    merge(path, obj) {
      const cur = state.get(path);
      state.set(path, { ...(isObj(cur) ? cur : {}), ...obj });
    },
    inc(path, delta = 1) { return state.set(path, (Number(state.get(path)) || 0) + delta); },
    toggle(path) { return state.set(path, !state.get(path)); },
    push(path, item) {
      const arr = state.get(path);
      const next = Array.isArray(arr) ? arr.concat([item]) : [item];
      state.set(path, next);
      return next;
    },
    addUnique(path, item) {
      const arr = state.get(path);
      if (Array.isArray(arr) && arr.includes(item)) return arr;
      return state.push(path, item);
    },
    pull(path, item) {
      const arr = state.get(path);
      if (!Array.isArray(arr) || !arr.includes(item)) return arr;
      const next = arr.filter((x) => x !== item);
      state.set(path, next);
      return next;
    },
    on(pattern, fn) {
      if (!listeners.has(pattern)) listeners.set(pattern, new Set());
      listeners.get(pattern).add(fn);
      return () => state.off(pattern, fn);
    },
    off(pattern, fn) { const s = listeners.get(pattern); if (s) s.delete(fn); },
    // Ganzen Zustand ersetzen (Laden, neues Spiel, Wipe)
    reset(data) {
      const prev = root;
      root = data || {};
      listeners.forEach((set) => { for (const fn of [...set]) { try { fn({ path: '', value: root, prev }); } catch (e) { console.error('[state]', e); } } });
      if (events) events.emit('state:reset', { value: root, prev });
      return root;
    },
    // Tiefe Kopie (JSON) – für Tests, Export, Zurückspulen
    snapshot() { return JSON.parse(JSON.stringify(root)); },
  };
  return state;
}
