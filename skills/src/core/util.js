/* SKILL DECK – Grundwerkzeuge: DOM-Helfer, Zufall, Speicher, Einstellungen (Basis: Kern von CREW). */
(function () {
  'use strict';
  const SK = (window.SK = window.SK || {});

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
  const PREFIX = 'skills_v1_';
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

  /* ---------- Einstellungen (gerätweit, ohne Personendaten) ---------- */
  const SETTINGS_DEFAULT = { sound: true, speech: true, pin: '1234', heikel: false, jahr: 1 };
  const settings = Object.assign({}, SETTINGS_DEFAULT, store.get('settings', {}));
  function saveSettings() { store.set('settings', settings); }

  SK.util = { h, append, clear, shuffle, pick, clamp, sleep, todayISO, weekday, WEEKDAYS, escapeHtml };
  SK.store = store;
  SK.settings = settings;
  SK.saveSettings = saveSettings;
})();
