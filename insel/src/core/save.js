// Speichern: 8 Spielstände in localStorage (lumo.save.0 … lumo.save.7, lumo.save.current), Versionsfeld + Migration,
// Autosave, Export-/Import-Code ohne private Felder, Wipe (löscht alle lumo.*-Schlüssel).
//   const save = createSave({ state, events, storage?, now? });
//   save.slots() → [{ slot, empty, v, handle, updatedAt, unitsDone, playSeconds }]   save.current (0–7)
//   save.boot() → lädt lumo.save.current oder legt Slot 0 neu an        save.load(slot) / save.save(slot?) / save.delete(slot)
//   save.newGame(slot?, { seed? }) → neuer Zustand mit Spielname („Nebelfuchs 7“) und Seed
//   save.exportCode(slot?) → 'LUMO1.<prüfsumme>.<base64url>'   save.importCode(code, slot?) → { ok, error?, data? }
//   save.wipe() → alle lumo.*-Schlüssel weg, Zustand neu                  save.autosave { enabled, interval } · save.tick(dt)
//   save.onCapture(fn(data, game)) – vor jedem Speichern (z. B. Position, Schleier eintragen)
//   save.onApply(fn(data, game))   – nach jedem Laden (Welt an den Zustand anpassen)
//   PRIVATE_PATHS (nie im Export), TRANSIENT_PATHS (nie gespeichert), SAVE_VERSION, defaultState(seed), migrate(data)
import { createRng, seedFromEntropy } from './rng.js';

export const SAVE_VERSION = 1;
export const SLOT_COUNT = 8;
export const KEY_PREFIX = 'lumo.';
export const SLOT_KEY = (n) => `${KEY_PREFIX}save.${n}`;
export const CURRENT_KEY = `${KEY_PREFIX}save.current`;
export const PRIVATE_PATHS = ['private', 'baumhaus.glas'];      // gehen nie in den Export-Code
export const TRANSIENT_PATHS = ['session'];                      // werden nie gespeichert (Laufzeit)
export const CODE_PREFIX = 'LUMO' + SAVE_VERSION;

const HANDLE_A = ['Nebel', 'Sturm', 'Licht', 'Wellen', 'Mond', 'Sand', 'Moos', 'Glut', 'Wind', 'Salz', 'Stern', 'Regen'];
const HANDLE_B = ['fuchs', 'otter', 'falke', 'luchs', 'robbe', 'igel', 'krabbe', 'eule', 'delfin', 'biber', 'krake', 'adler'];

export function makeHandle(rng) {
  return `${rng.pick(HANDLE_A)}${rng.pick(HANDLE_B)} ${rng.int(1, 99)}`;
}

// Standard-Spielstand (CONTENT-SCHEMA „SaveState“)
export function defaultState(seed = seedFromEntropy()) {
  const rng = createRng(seed).fork('handle');
  return {
    v: SAVE_VERSION,
    seed,
    handle: makeHandle(rng),
    symbolLock: null,
    createdAt: 0, updatedAt: 0, playSeconds: 0,
    settings: { mode: 'abenteuer', reducedFx: false, bigText: false, autoRead: false, glimmMuted: false },
    avatar: null,
    cosmetics: { owned: [], equipped: {} },
    units: {}, codesUsed: [],
    quests: {},
    abilities: [], upgrades: [], feathers: [], gadgets: [],
    ampel: { gruen: null, gelb: null, rot: null, notfall: null },
    wurzeln: { base: 3, extra: [] },
    bonds: {}, moods: {}, deeds: [], echoes: [], flags: {},
    veil: { zones: {}, patches: {} },
    shards: [], chronik: { placed: [] },
    collectibles: {}, medals: {},
    baumhaus: { furniture: [], bonsai: [], jukebox: [], glas: [] },
    echteWelt: {},
    private: { glaubenssatz: null, flaschenpost: null, sichererOrt: {}, spiegelbecken: {} },
    time: { day: 1, hour: 16.8 },
    pos: null,
    session: { puls: 0 },   // Laufzeit, wird nicht gespeichert
  };
}

// Migrationen: [{ to: 2, run(data) { … } }] – laufen der Reihe nach von data.v bis SAVE_VERSION
export const MIGRATIONS = [];
export function migrate(data) {
  let d = data;
  let v = Number(d.v) || 1;
  for (const m of MIGRATIONS) {
    if (m.to > v && m.to <= SAVE_VERSION) { d = m.run(d) || d; v = m.to; }
  }
  d.v = SAVE_VERSION;
  return fillDefaults(d, defaultState(d.seed || 1));
}

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
// Fehlende Felder aus den Standardwerten ergänzen (tief bei Objekten, Arrays bleiben wie gespeichert)
export function fillDefaults(data, def) {
  const out = isObj(data) ? data : {};
  for (const k of Object.keys(def)) {
    if (out[k] === undefined) out[k] = clone(def[k]);
    else if (isObj(def[k]) && isObj(out[k])) fillDefaults(out[k], def[k]);
  }
  return out;
}
const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

function deletePath(obj, path) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) { cur = cur && cur[keys[i]]; if (!isObj(cur)) return; }
  if (cur) delete cur[keys[keys.length - 1]];
}
// Kopie ohne die genannten Pfade
export function stripPaths(data, paths) {
  const d = clone(data);
  for (const p of paths) deletePath(d, p);
  return d;
}

// ---- Base64url (UTF-8), ohne Abhängigkeiten, Node und Browser ----
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function bytesToB64(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
    const n = (a << 16) | ((b || 0) << 8) | (c || 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
    out += b !== undefined ? B64[(n >> 6) & 63] : '';
    out += c !== undefined ? B64[n & 63] : '';
  }
  return out;
}
function b64ToBytes(str) {
  const clean = str.replace(/[^A-Za-z0-9\-_]/g, '');
  const out = [];
  for (let i = 0; i < clean.length; i += 4) {
    const v = [0, 1, 2, 3].map((k) => (i + k < clean.length ? B64.indexOf(clean[i + k]) : -1));
    if (v[0] < 0 || v[1] < 0) break;
    const n = (v[0] << 18) | (v[1] << 12) | ((v[2] < 0 ? 0 : v[2]) << 6) | (v[3] < 0 ? 0 : v[3]);
    out.push((n >> 16) & 255);
    if (v[2] >= 0) out.push((n >> 8) & 255);
    if (v[3] >= 0) out.push(n & 255);
  }
  return Uint8Array.from(out);
}
function checksum(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
}

// Zustand → Code (ohne private und transiente Felder)
export function encodeCode(data) {
  const json = JSON.stringify(stripPaths(data, PRIVATE_PATHS.concat(TRANSIENT_PATHS)));
  const b64 = bytesToB64(new TextEncoder().encode(json));
  return `${CODE_PREFIX}.${checksum(b64)}.${b64}`;
}
// Code → Zustand (migriert, private Felder auf Standard) oder { error }
export function decodeCode(code) {
  const s = String(code || '').trim().replace(/\s+/g, '');
  const parts = s.split('.');
  if (parts.length !== 3 || !/^LUMO\d+$/.test(parts[0])) return { error: 'Das ist kein LUMO-Code.' };
  if (checksum(parts[2]) !== parts[1]) return { error: 'Der Code ist unvollständig oder verändert.' };
  let data;
  try { data = JSON.parse(new TextDecoder().decode(b64ToBytes(parts[2]))); } catch (e) { return { error: 'Der Code lässt sich nicht lesen.' }; }
  if (!isObj(data) || !isObj(data.units)) return { error: 'Der Code enthält keinen Spielstand.' };
  const ver = Number(parts[0].slice(4));
  if (ver > SAVE_VERSION) return { error: 'Der Code stammt aus einer neueren Version.' };
  data.v = data.v || ver;
  for (const p of PRIVATE_PATHS) deletePath(data, p);
  return { data: migrate(data) };
}

function memoryStorage() {
  const m = new Map();
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
  };
}
function pickStorage(storage) {
  if (storage) return storage;
  try { if (typeof localStorage !== 'undefined') { localStorage.getItem('lumo.probe'); return localStorage; } } catch (e) { /* privat-Modus */ }
  return memoryStorage();
}

export function createSave({ state, events = null, storage = null, now = () => Date.now(), game = null } = {}) {
  const store = pickStorage(storage);
  const captureFns = [];
  const applyFns = [];
  let current = 0;
  let sinceSave = 0;
  const emit = (n, p) => { if (events) events.emit(n, p); };
  const clampSlot = (n) => { const s = Number(n); if (!Number.isInteger(s) || s < 0 || s >= SLOT_COUNT) throw new Error('Ungültiger Slot ' + n); return s; };

  function readSlot(slot) {
    try {
      const raw = store.getItem(SLOT_KEY(slot));
      if (!raw) return null;
      const d = JSON.parse(raw);
      return isObj(d) ? migrate(d) : null;
    } catch (e) { console.warn('[save] Slot', slot, 'unlesbar', e); return null; }
  }
  function writeSlot(slot, data) {
    try { store.setItem(SLOT_KEY(slot), JSON.stringify(stripPaths(data, TRANSIENT_PATHS))); return true; } catch (e) { console.error('[save] Speichern fehlgeschlagen', e); emit('save:error', { slot, error: e }); return false; }
  }
  function collect() {
    const d = state.data;
    for (const fn of captureFns) { try { fn(d, game); } catch (e) { console.error('[save] capture', e); } }
    d.updatedAt = now();
    if (!d.createdAt) d.createdAt = d.updatedAt;
    return d;
  }
  function applyAll() {
    for (const fn of applyFns) { try { fn(state.data, game); } catch (e) { console.error('[save] apply', e); } }
  }

  const save = {
    get current() { return current; },
    get storage() { return store; },
    autosave: { enabled: true, interval: 60, minGap: 5 },
    onCapture(fn) { captureFns.push(fn); return () => { const i = captureFns.indexOf(fn); if (i >= 0) captureFns.splice(i, 1); }; },
    onApply(fn) { applyFns.push(fn); return () => { const i = applyFns.indexOf(fn); if (i >= 0) applyFns.splice(i, 1); }; },
    slots() {
      const out = [];
      for (let i = 0; i < SLOT_COUNT; i++) {
        const d = readSlot(i);
        out.push(d ? {
          slot: i, empty: false, v: d.v, handle: d.handle, updatedAt: d.updatedAt, createdAt: d.createdAt, playSeconds: d.playSeconds || 0,
          unitsDone: Object.values(d.units || {}).filter((s) => s === 'fertig').length, symbolLock: d.symbolLock || null, mode: d.settings && d.settings.mode,
        } : { slot: i, empty: true });
      }
      return out;
    },
    has(slot) { return !!store.getItem(SLOT_KEY(clampSlot(slot))); },
    // Beim Start: zuletzt benutzten Slot laden, sonst Slot 0 neu anlegen (ohne zu speichern)
    boot() {
      let cur = 0;
      try { cur = clampSlot(store.getItem(CURRENT_KEY) || 0); } catch (e) { cur = 0; }
      if (save.has(cur)) return save.load(cur);
      save.newGame(cur, { persist: false });
      return false;
    },
    load(slot) {
      slot = clampSlot(slot);
      const d = readSlot(slot);
      if (!d) return false;
      d.session = defaultState(d.seed).session;
      current = slot;
      try { store.setItem(CURRENT_KEY, String(slot)); } catch (e) { /* egal */ }
      state.reset(d);
      sinceSave = 0;
      applyAll();
      emit('save:load', { slot });
      return true;
    },
    save(slot = current) {
      slot = clampSlot(slot);
      const d = collect();
      const ok = writeSlot(slot, d);
      if (ok) {
        current = slot;
        try { store.setItem(CURRENT_KEY, String(slot)); } catch (e) { /* egal */ }
        sinceSave = 0;
        emit('save:saved', { slot });
      }
      return ok;
    },
    newGame(slot = current, { seed, persist = true } = {}) {
      slot = clampSlot(slot);
      const d = defaultState(seed === undefined ? seedFromEntropy() : seed);
      d.createdAt = now();
      current = slot;
      try { store.setItem(CURRENT_KEY, String(slot)); } catch (e) { /* egal */ }
      state.reset(d);
      sinceSave = 0;
      applyAll();
      emit('save:new', { slot });
      if (persist) save.save(slot);
      return d;
    },
    delete(slot) {
      slot = clampSlot(slot);
      try { store.removeItem(SLOT_KEY(slot)); } catch (e) { /* egal */ }
      emit('save:delete', { slot });
    },
    // Export: aktueller Zustand (slot weggelassen) oder gespeicherter Slot; nie private Felder
    exportCode(slot) {
      const d = slot === undefined ? collect() : readSlot(clampSlot(slot));
      if (!d) return null;
      return encodeCode(d);
    },
    // Import: in Slot schreiben (Standard: freier Slot, sonst aktueller); { ok, slot, data } oder { ok:false, error }
    importCode(code, slot) {
      const r = decodeCode(code);
      if (r.error) return { ok: false, error: r.error };
      if (slot === undefined) { const free = save.slots().find((s) => s.empty); slot = free ? free.slot : current; }
      slot = clampSlot(slot);
      r.data.updatedAt = now();
      if (!writeSlot(slot, r.data)) return { ok: false, error: 'Der Spielstand konnte nicht gespeichert werden.' };
      emit('save:import', { slot });
      return { ok: true, slot, data: r.data };
    },
    // Alles löschen: jeden lumo.*-Schlüssel entfernen, Zustand neu (Slot 0), Einstellungen inklusive
    wipe() {
      const keys = [];
      try { for (let i = 0; i < store.length; i++) { const k = store.key(i); if (k && k.startsWith(KEY_PREFIX)) keys.push(k); } } catch (e) { /* egal */ }
      for (const k of keys) { try { store.removeItem(k); } catch (e) { /* egal */ } }
      current = 0;
      state.reset(defaultState());
      sinceSave = 0;
      applyAll();
      emit('save:wipe', { removed: keys.length });
      return keys.length;
    },
    // Aus der Spielschleife (nur wenn nicht pausiert): Spielzeit zählen, Autosave
    tick(dt) {
      if (!(dt > 0)) return;
      state.data.playSeconds = (state.data.playSeconds || 0) + dt;
      sinceSave += dt;
      if (save.autosave.enabled && sinceSave >= save.autosave.interval) save.save();
    },
    // Sofort speichern, wenn seit dem letzten Speichern mindestens minGap Sekunden vergangen sind
    request(reason) {
      if (sinceSave < save.autosave.minGap && reason !== 'force') return false;
      return save.save();
    },
    // Fenster verlassen / in den Hintergrund: speichern
    attachWindow(win = typeof window !== 'undefined' ? window : null) {
      if (!win) return;
      const onHide = () => { if (save.autosave.enabled && game && game.started) save.request('force'); };
      win.addEventListener('pagehide', onHide);
      win.document && win.document.addEventListener('visibilitychange', () => { if (win.document.hidden) onHide(); });
    },
  };
  if (events) {
    events.on('save:request', (e) => save.request(e && e.reason));
    for (const ev of ['unit:complete', 'quest:complete']) events.on(ev, () => save.request('force'));
  }
  return save;
}
