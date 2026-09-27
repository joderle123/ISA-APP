// Lehrer-Einstellungen (WP30, DESIGN §10 Lehrer-Panel) – Logik ohne DOM, das Panel (ui/teacher/plugin.js) rendert sie.
// Alles liegt auf dem Gerät (localStorage lumo.teacher, fällt in Tests/Privatmodus auf Speicher zurück), nie im Export,
// keine Personendaten: Lines & Veils (an/aus), Gefühlsrad-Farben, Umbenennungen (Figuren, Glimm, Vögel), eigenes Salz.
//   const T = createTeacherSettings({ game, words });
//   T.device.get(key)/set(key, v)/all()          T.linesVeils.active · set(bool) → { toKurz, toOpen } · units() · isVeiled(unitId)
//   T.colors.get() · set({ freude:'#…' }) · reset() · apply()   (mutiert EMOTION_COLORS der Aura/Segel/Icons + CSS-Variablen --emo-*)
//   T.names.list() → [{ id, kind, name, custom }] · set(id, name|null) · apply()   (Gerätenamen → state.names.<id>, npcs.rename)
//   T.salt.get()/set(s)                            T.apply() nach Laden/Reset
//   Ereignisse: linesVeils:change {active, toKurz, toOpen} · emotion:colors {colors} · names:change {id, name}
import { EMOTION_COLORS as AURA_COLORS } from '../../actors/humanoid/aura.js';
import { EMOTION_COLORS as SEGEL_COLORS } from '../../actors/segel.js';
import { EMOTION_COLOR as ICON_COLORS } from '../../ui/icons.js';
import { EMOTIONS } from '../../content/schema/consts.js';
import { planLinesVeils, isLinesVeilsUnit, DEFAULT_SALT } from './model.js';

export const TEACHER_KEY = 'lumo.teacher';
export const EMOTION_DEFAULTS = { freude: '#ffd23f', wut: '#ff4d4d', angst: '#9b6bff', trauer: '#4d8cff', ekel: '#5ad24f', ueberraschung: '#2de2c9' };
export const EMOTION_LABEL = { freude: 'Freude', wut: 'Wut', angst: 'Angst', trauer: 'Traurigkeit', ekel: 'Ekel', ueberraschung: 'Überraschung' };
// Begleiter und Vögel, die außer den Figuren umbenannt werden dürfen (state.names.<id>, gelesen von Blasen/Schildern)
export const EXTRA_NAMES = [
  { id: 'glimm', kind: 'begleiter', name: 'Glimm' },
  { id: 'sonnensegler', kind: 'vogel', name: 'Sonnensegler', emotion: 'freude' },
  { id: 'glutfalke', kind: 'vogel', name: 'Glutfalke', emotion: 'wut' },
  { id: 'wachkranich', kind: 'vogel', name: 'Wachkranich', emotion: 'angst' },
  { id: 'tiefentaucher', kind: 'vogel', name: 'Tiefentaucher', emotion: 'trauer' },
  { id: 'gruenwuerger', kind: 'vogel', name: 'Grünwürger', emotion: 'ekel' },
  { id: 'blitzkolibri', kind: 'vogel', name: 'Blitzkolibri', emotion: 'ueberraschung' },
];
export const NAME_MAX = 16;
const isHex = (s) => /^#[0-9a-f]{6}$/i.test(String(s || ''));

function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); } };
}

export function createTeacherSettings({ game, storage = null, listen = true } = {}) {
  const { state, events, content } = game;
  const store = storage || (game.save && game.save.storage) || memoryStorage();
  const emit = (n, p) => { if (events) events.emit(n, p); };

  // ---- Gerätespeicher (ohne Cache: nach save.wipe() ist der Schlüssel weg und muss weg bleiben) ----
  function readAll() {
    let d = {};
    try { d = JSON.parse(store.getItem(TEACHER_KEY) || '{}') || {}; } catch (e) { d = {}; }
    return typeof d === 'object' && !Array.isArray(d) ? d : {};
  }
  function writeAll(obj) {
    try { if (Object.keys(obj).length) store.setItem(TEACHER_KEY, JSON.stringify(obj)); else store.removeItem(TEACHER_KEY); } catch (e) { /* privat-Modus */ }
  }
  const device = {
    get(key, fallback) { const v = readAll()[key]; return v === undefined ? fallback : v; },
    set(key, value) { const all = { ...readAll() }; if (value === undefined || value === null) delete all[key]; else all[key] = value; writeAll(all); return value; },
    all() { return { ...readAll() }; },
    clear() { try { store.removeItem(TEACHER_KEY); } catch (e) { /* egal */ } },
  };

  // ---- Lines & Veils ----
  const questDefs = (id) => (content && content.get ? content.get('quests', id) : null);
  const linesVeils = {
    get active() { return !!device.get('linesVeils', false); },
    // Umschalten und sofort anwenden: offene/laufende L&V-Einheiten → Kurzfassung ohne Szene; aus → per Code zurück auf offen
    set(active) {
      device.set('linesVeils', !!active);
      const r = linesVeils.apply();
      emit('linesVeils:change', { active: !!active, ...r });
      return r;
    },
    apply() {
      const active = linesVeils.active;
      if (state) state.set('session.linesVeils', active);
      const r = planLinesVeils(active, { units: content ? content.units : [], states: state ? state.get('units', {}) : {}, codesUsed: state ? state.get('codesUsed', []) : [], questDefs });
      for (const id of r.toKurz) {
        if (game.quests && game.quests.stop && game.quests.active === id) { try { game.quests.stop(id); } catch (e) { /* egal */ } }
        state.set('units.' + id, 'kurz');
        state.merge('quests.' + id, { linesVeils: true });
        emit('unit:unlock', { id, kurz: true, linesVeils: true, via: 'linesVeils' });
      }
      for (const id of r.toOpen) {
        state.merge('quests.' + id, { linesVeils: false });
        state.set('units.' + id, 'offen');
        emit('unit:unlock', { id, via: 'linesVeils' });
      }
      return r;
    },
    units() {
      const us = state ? state.get('units', {}) : {};
      return (content ? content.units : []).filter((u) => isLinesVeilsUnit(u, questDefs(u.id))).map((u) => ({ id: u.id, unit: u, status: us[u.id] || 'gesperrt', veiled: !!(state && (state.get('quests.' + u.id) || {}).linesVeils) }));
    },
    isVeiled(id) { return !!(state && (state.get('quests.' + id) || {}).linesVeils); },
  };

  // ---- Gefühlsrad-Farben ----
  const colors = {
    DEFAULTS: EMOTION_DEFAULTS, LABEL: EMOTION_LABEL,
    get() { return { ...EMOTION_DEFAULTS, ...(device.get('colors', {}) || {}) }; },
    set(partial) {
      const cur = { ...(device.get('colors', {}) || {}) };
      for (const [k, v] of Object.entries(partial || {})) { if (!EMOTIONS.includes(k)) continue; if (isHex(v) && v.toLowerCase() !== EMOTION_DEFAULTS[k]) cur[k] = v.toLowerCase(); else delete cur[k]; }
      device.set('colors', Object.keys(cur).length ? cur : null);
      return colors.apply();
    },
    reset() { device.set('colors', null); return colors.apply(); },
    isCustom() { return Object.keys(device.get('colors', {}) || {}).length > 0; },
    // Wirkt auf neue Auren/Segel/Icons sofort, auf schon gebaute Vögel/Runen nach dem nächsten Start
    apply() {
      const c = colors.get();
      Object.assign(AURA_COLORS, c);
      Object.assign(SEGEL_COLORS, c);
      Object.assign(ICON_COLORS, c);
      if (typeof document !== 'undefined') for (const k of EMOTIONS) document.documentElement.style.setProperty('--emo-' + k, c[k]);
      emit('emotion:colors', { colors: c, custom: colors.isCustom() });
      return c;
    },
  };

  // ---- Namen (Figuren, Glimm, Vögel) ----
  const cleanName = (n) => String(n || '').trim().replace(/\s+/g, ' ').slice(0, NAME_MAX);
  const names = {
    MAX: NAME_MAX,
    list() {
      const custom = device.get('names', {}) || {};
      const out = [];
      for (const d of (content ? content.list('npcs') : [])) if (d && d.id && d.renameable !== false && !d.ambient) out.push({ id: d.id, kind: 'figur', name: typeof d.name === 'object' ? d.name.t : d.name, custom: custom[d.id] || null, icon: d.icon, color: d.color });
      for (const e of EXTRA_NAMES) out.push({ ...e, custom: custom[e.id] || null });
      return out;
    },
    get(id) { return (device.get('names', {}) || {})[id] || null; },
    set(id, name) {
      const all = { ...(device.get('names', {}) || {}) };
      const clean = cleanName(name);
      if (clean) all[id] = clean; else delete all[id];
      device.set('names', Object.keys(all).length ? all : null);
      names.applyOne(id, clean || null);
      emit('names:change', { id, name: clean || null });
      return clean || null;
    },
    applyOne(id, name) {
      if (!state) return;
      if (game.npcs && game.npcs.rename && (game.npcs.def(id) || (content && content.has('npcs', id)))) { game.npcs.rename(id, name); return; }
      if (name) state.set('names.' + id, name); else state.remove('names.' + id);
    },
    // Gerätenamen gewinnen: nach Laden/Neu/Wipe in den Spielstand schreiben
    apply() { const all = device.get('names', {}) || {}; for (const [id, n] of Object.entries(all)) names.applyOne(id, n); return all; },
  };

  const salt = {
    get() { return device.get('salt', DEFAULT_SALT) || DEFAULT_SALT; },
    set(s) { const v = String(s || '').trim(); device.set('salt', v && v !== DEFAULT_SALT ? v : null); return salt.get(); },
    isCustom() { return salt.get() !== DEFAULT_SALT; },
  };

  function apply() { colors.apply(); names.apply(); linesVeils.apply(); }
  if (events && listen) { events.on('state:reset', () => { names.apply(); linesVeils.apply(); }); }

  return { device, linesVeils, colors, names, salt, apply, EXTRA_NAMES, EMOTION_LABEL, EMOTION_DEFAULTS, TEACHER_KEY };
}
