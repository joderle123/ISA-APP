/* CREW – Grundwerkzeuge: DOM-Helfer, Zufall, Speicher, Zustand. */
(function () {
  'use strict';
  const CREW = (window.CREW = window.CREW || {});

  /* ---------- DOM ---------- */
  // h('div', {class:'x', onclick:fn, style:{...}, dataset:{...}}, kids...)
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k === 'html') el.innerHTML = v;
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      }
    }
    append(el, kids);
    return el;
  }
  function append(el, kids) {
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false || kid === true) continue;
      el.appendChild(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

  /* ---------- Zufall & Kleinkram ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const todayISO = () => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  const weekday = () => new Date().getDay(); // 0 = So, 1 = Mo … 6 = Sa
  const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- Speicher (nur lokal, mit Präfix) ---------- */
  const PREFIX = 'crew_v1_';
  const memory = {};
  const store = {
    get(key, fallback) {
      try {
        const raw = window.localStorage.getItem(PREFIX + key);
        if (raw != null) return JSON.parse(raw);
      } catch (e) { /* privat/gesperrt: Speicher im RAM */ }
      return key in memory ? memory[key] : fallback;
    },
    set(key, value) {
      memory[key] = value;
      try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* egal */ }
    },
    del(key) {
      delete memory[key];
      try { window.localStorage.removeItem(PREFIX + key); } catch (e) { /* egal */ }
    },
  };

  /* ---------- Zustand ---------- */
  // Es werden KEINE Namen oder Daten einzelner Jugendlicher gespeichert.
  const DEFAULT_STATE = () => ({
    v: 1,
    crew: { name: '', look: 'arena', founded: false },
    energy: 0,
    history: [],          // [{date, mission, energy}]
    used: {},             // pool -> [ids] schon gespielt
    lastCrewSize: 5,
    settings: {
      pin: '1234',
      sound: true,
      speech: true,
      sensitive: false,   // heikle Karten zeigen?
      disabled: [],       // ausgeschaltete Missionen
    },
    solo: {},             // Bestwerte pro Solo-Spiel (ohne Namen)
  });

  function deepMerge(base, extra) {
    if (!extra || typeof extra !== 'object') return base;
    for (const [k, v] of Object.entries(extra)) {
      if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        deepMerge(base[k], v);
      } else {
        base[k] = v;
      }
    }
    return base;
  }

  const state = deepMerge(DEFAULT_STATE(), store.get('state', null));
  const listeners = new Set();
  function save() {
    store.set('state', state);
    listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } });
  }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function resetState() {
    const fresh = DEFAULT_STATE();
    fresh.settings.pin = state.settings.pin;
    Object.keys(state).forEach((k) => delete state[k]);
    Object.assign(state, fresh);
    save();
  }
  function importState(obj) {
    if (!obj || typeof obj !== 'object' || obj.v !== 1) throw new Error('Das ist kein gültiger CREW-Spielstand.');
    const fresh = deepMerge(DEFAULT_STATE(), obj);
    Object.keys(state).forEach((k) => delete state[k]);
    Object.assign(state, fresh);
    save();
  }
  function exportCode() {
    const json = JSON.stringify(state);
    return btoa(unescape(encodeURIComponent(json)));
  }
  function importCode(code) {
    const json = decodeURIComponent(escape(atob(String(code).trim())));
    importState(JSON.parse(json));
  }

  /* ---------- Levels der Crew-Basis ---------- */
  // Schnelle erste Erfolge, später langsamer (ca. 8 Energie pro Tag).
  const LEVELS = [0, 15, 35, 60, 90, 125, 165, 210, 260, 315, 375, 440, 510];
  function levelInfo(energy) {
    let lvl = 0;
    for (let i = 0; i < LEVELS.length; i++) if (energy >= LEVELS[i]) lvl = i;
    const cur = LEVELS[lvl];
    const next = LEVELS[lvl + 1];
    const max = next == null;
    return {
      level: lvl,
      max,
      cur,
      next: max ? cur : next,
      pct: max ? 100 : Math.round(((energy - cur) / (next - cur)) * 100),
      toNext: max ? 0 : next - energy,
    };
  }

  /* ---------- Inhalte ziehen ---------- */
  // Zieht n Einträge aus CREW.content[pool], bevorzugt noch nicht gespielte.
  // Heikle Einträge (heikel: true) nur, wenn die Lehrkraft sie freigibt.
  function pickContent(pool, n, filter) {
    const all = (CREW.content[pool] || []).filter((it) => (state.settings.sensitive || !it.heikel) && (!filter || filter(it)));
    if (!all.length) return [];
    const used = new Set(state.used[pool] || []);
    let fresh = all.filter((it) => !used.has(it.id));
    if (fresh.length < n) {
      state.used[pool] = [];
      fresh = all;
    }
    const chosen = shuffle(fresh).slice(0, n);
    state.used[pool] = [...(state.used[pool] || []), ...chosen.map((c) => c.id)];
    save();
    return chosen;
  }

  CREW.content = CREW.content || {};
  CREW.util = { h, append, clear, shuffle, pick, clamp, sleep, todayISO, weekday, WEEKDAYS, escapeHtml };
  CREW.store = store;
  CREW.state = state;
  CREW.save = save;
  CREW.onChange = onChange;
  CREW.resetState = resetState;
  CREW.exportCode = exportCode;
  CREW.importCode = importCode;
  CREW.LEVELS = LEVELS;
  CREW.levelInfo = levelInfo;
  CREW.pickContent = pickContent;

  /* ---------- Registrierung von Modulen ---------- */
  CREW.missions = CREW.missions || [];
  CREW.soloGames = CREW.soloGames || [];
  CREW.registerMission = (m) => { CREW.missions.push(m); };
  CREW.registerSolo = (g) => { CREW.soloGames.push(g); };
})();
