/* CREW – Tagescode & Platznummer: gemeinsamer Zufall ohne Netz.
   Der Beamer zeigt einen 4-stelligen Tagescode. Jedes iPad hat eine Platznummer (1–8, Aufkleber am Gerät).
   Aus Code + Platz + Crew-Größe entstehen auf JEDEM iPad gleich: dieselben Szenen, dieselbe Paar-Farbe
   („Blau findet Blau“), dieselben Rollen A–D und dieselben Geheimrollen. Es wird nichts über Personen gespeichert. */
(function () {
  'use strict';
  const CREW = (window.CREW = window.CREW || {});

  /* ---------- Zufall mit festem Startwert ---------- */
  // FNV-1a über alle Teile → 32-Bit-Startwert
  function hash() {
    let hsh = 2166136261;
    const s = Array.prototype.slice.call(arguments).join('|');
    for (let i = 0; i < s.length; i++) { hsh ^= s.charCodeAt(i); hsh = Math.imul(hsh, 16777619); }
    return hsh >>> 0;
  }
  // mulberry32: schnell, gut genug für Spiele
  function rng() {
    let a = hash.apply(null, arguments) || 1;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const pick = (arr, r) => arr[Math.floor(r() * arr.length)];

  /* ---------- Tagescode ---------- */
  // Standard-Code aus dem Datum: Alle iPads mit gleichem Datum haben denselben Code, ohne Tippen.
  function defaultCode(iso) {
    const d = iso || CREW.util.todayISO();
    return String(1000 + (hash('crew-tagescode', d) % 9000));
  }
  const valid = (c) => /^\d{4}$/.test(String(c || ''));
  // Code dieses Geräts: eigener Code gilt nur für heute, sonst Standard
  function getCode() {
    const saved = CREW.store.get('daycode', null);
    if (saved && saved.date === CREW.util.todayISO() && valid(saved.code)) return String(saved.code);
    return defaultCode();
  }
  function setCode(code) {
    if (!valid(code)) return false;
    CREW.store.set('daycode', { date: CREW.util.todayISO(), code: String(code) });
    return true;
  }
  function newCode() {
    const c = String(1000 + Math.floor(Math.random() * 9000));
    setCode(c);
    return c;
  }
  // Platznummer dieses iPads (1–8), bleibt auf dem Gerät
  const getSeat = () => Math.max(1, Math.min(8, Number(CREW.store.get('seat', 1)) || 1));
  const setSeat = (n) => CREW.store.set('seat', Math.max(1, Math.min(8, Number(n) || 1)));
  const crewSize = () => Math.max(2, Math.min(8, Number(CREW.state.lastCrewSize) || 5));

  /* ---------- Paare, Rollen, Geheimrollen ---------- */
  const COLOURS = [
    { id: 'blau', name: 'Blau', css: 'var(--teamA)', ink: 'var(--teamA-ink)' },
    { id: 'pink', name: 'Pink', css: 'var(--teamB)', ink: 'var(--teamB-ink)' },
    { id: 'gelb', name: 'Gelb', css: 'var(--yellow)', ink: 'var(--yellow-ink)' },
    { id: 'gruen', name: 'Grün', css: 'var(--good)', ink: 'var(--good-ink)' },
  ];
  const ROLES = ['A', 'B', 'C', 'D'];
  // Reihenfolge der Plätze 1…n, für alle gleich
  const perm = (code, n, salt) => shuffle(Array.from({ length: n }, (_, i) => i + 1), rng('perm', code, n, salt || ''));
  // Paare: je zwei Plätze eine Farbe; bei ungerader Zahl wird das letzte Paar zu dritt
  function pairs(code, n) {
    const p = perm(code, n, 'paare');
    const out = [];
    for (let i = 0; i + 1 < p.length; i += 2) out.push({ colour: COLOURS[out.length % COLOURS.length], seats: [p[i], p[i + 1]] });
    if (p.length % 2 === 1) { if (out.length) out[out.length - 1].seats.push(p[p.length - 1]); else out.push({ colour: COLOURS[0], seats: [p[0]] }); }
    return out;
  }
  function pairOf(code, n, seat) {
    const g = pairs(code, n).find((x) => x.seats.includes(seat)) || { colour: COLOURS[0], seats: [seat] };
    return { colour: g.colour, seats: g.seats, partners: g.seats.filter((s) => s !== seat), trio: g.seats.length > 2 };
  }
  // Rollen A–D: die ersten vier Plätze der Reihenfolge bekommen A–D, weitere sind Beobachter:innen (5–6 Leute)
  function roleOf(code, n, seat) {
    const p = perm(code, n, 'rollen');
    const i = p.indexOf(seat);
    return i >= 0 && i < 4 ? ROLES[i] : 'X';
  }
  // Geheimrollen: count Plätze aus n (z. B. Stärken-Spion); salt = Spiel-ID
  function secret(code, n, count, salt) {
    return perm(code, n, 'geheim-' + (salt || '')).slice(0, Math.max(0, Math.min(n, count)));
  }

  CREW.seed = {
    hash, rng, shuffle, pick,
    defaultCode, valid, getCode, setCode, newCode, getSeat, setSeat, crewSize,
    COLOURS, ROLES, perm, pairs, pairOf, roleOf, secret,
  };
})();
