// Figuren-Modell (WP34, reine Logik ohne three.js – läuft in Node-Tests und im Spiel):
//   Gefühlsmodell (6 Gefühle 0–10, Zweitgefühl, maskiertes Innen, Hitze 0–100 mit „Deckel ab“ > 70),
//   6 Tanks (Wunsch +40 fällt am Morgen zurück, Bedürfnis hält 7 Tage), Grenz-Radius nach Bindung und Stimmung,
//   Streit-Stil je Gegenüber, Bindung 0–3 (sinkt nie dauerhaft, negative Züge = „verstimmt“ mit Reparatur-Haken),
//   Körpersprache aus dem Gefühlsmodell, Mäxchen-Tells je Modus, Tagesablauf-Wegpunkte, Sichtbudget (12 animiert).
import { bodyLanguageFor } from '../../actors/humanoid/poses.js';
import { EMOTIONS, TANKS, STREIT_STILE, MODES } from '../../content/schema/consts.js';

export { EMOTIONS, TANKS, STREIT_STILE };
export const WISH_BOOST = 40;        // Wunsch: +40, am Morgen zurück
export const NEED_DAYS = 7;          // Bedürfnis: hält 7 Tage
export const HEAT_CAP_OFF = 70;      // „Deckel ab“: über 70 prallen Argumente ab
export const MAX_ANIMATED = 12;      // höchstens 12 animierte Figuren in Sicht (DESIGN §20)
export const BOND_MAX = 3;
export const DEFAULT_BOUNDARY = { byBond: [2.4, 1.8, 1.3, 1.0], mood: { angst: 1.3, wut: 1.25, ekel: 1.2, trauer: 1.1 } };
export const DEFAULT_TANKS = { koerper: 60, sicherheit: 60, zugehoerigkeit: 55, anerkennung: 50, selbstbestimmung: 55, spass: 55 };

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const clamp10 = (v) => clamp(Number(v) || 0, 0, 10);
const isEmotion = (e) => EMOTIONS.includes(e) || e === 'scham' || e === 'nervoes';
const pair = (p) => (Array.isArray(p) ? { emotion: p[0], intensity: clamp10(p[1]) } : p && typeof p === 'object' ? { emotion: p.emotion, intensity: clamp10(p.intensity) } : null);

// ---- Gefühlsmodell ----
//   createEmotion({ primary:['trauer',4], secondary?, inner?, heat? }) → { get(), set(), nudge(), heat(), tick(dt), toJSON(), fromJSON() }
//   inner = das maskierte Innen (Masken-Blick e28): außen ruhig, innen rot. Ohne inner gilt außen = innen.
export function createEmotion(base = {}) {
  const b = { primary: pair(base.primary) || { emotion: 'freude', intensity: 3 }, secondary: pair(base.secondary), inner: pair(base.inner), heat: clamp(Number(base.heat) || 0, 0, 100) };
  if (!isEmotion(b.primary.emotion)) b.primary = { emotion: 'freude', intensity: 3 };
  const cur = { primary: { ...b.primary }, secondary: b.secondary ? { ...b.secondary } : null, inner: b.inner ? { ...b.inner } : null, heat: b.heat };
  let hold = 0;   // Sekunden, in denen nichts zurückdriftet (nach einer Szene)

  const api = {
    get base() { return { primary: { ...b.primary }, secondary: b.secondary ? { ...b.secondary } : null, inner: b.inner ? { ...b.inner } : null, heat: b.heat }; },
    get() {
      return {
        primary: [cur.primary.emotion, Math.round(cur.primary.intensity)],
        secondary: cur.secondary && cur.secondary.intensity >= 0.5 ? [cur.secondary.emotion, Math.round(cur.secondary.intensity)] : null,
        inner: cur.inner ? [cur.inner.emotion, Math.round(cur.inner.intensity)] : null,
        heat: Math.round(cur.heat), capOff: cur.heat > HEAT_CAP_OFF,
        zone: cur.heat < 30 ? 'gruen' : cur.heat <= HEAT_CAP_OFF ? 'gelb' : 'rot',
      };
    },
    // Setzen: { primary, secondary, inner, heat, hold } – fehlende Felder bleiben
    set({ primary, secondary, inner, heat, hold: h } = {}) {
      if (primary !== undefined) { const p = pair(primary); if (p && isEmotion(p.emotion)) cur.primary = p; }
      if (secondary !== undefined) cur.secondary = pair(secondary);
      if (inner !== undefined) cur.inner = pair(inner);
      if (heat !== undefined) cur.heat = clamp(Number(heat) || 0, 0, 100);
      hold = h !== undefined ? Number(h) : 20;
      return api.get();
    },
    // Ein Gefühl anstoßen: gleiches Hauptgefühl → Stärke ändern, sonst wird es Zweitgefühl (oder Hauptgefühl, wenn stärker)
    nudge(emotion, delta = 1) {
      if (!isEmotion(emotion)) return api.get();
      const d = Number(delta) || 0;
      if (cur.primary.emotion === emotion) cur.primary.intensity = clamp10(cur.primary.intensity + d);
      else if (cur.secondary && cur.secondary.emotion === emotion) {
        cur.secondary.intensity = clamp10(cur.secondary.intensity + d);
        if (cur.secondary.intensity > cur.primary.intensity) { const t = cur.primary; cur.primary = cur.secondary; cur.secondary = t; }
      } else if (d > 0) {
        const n = { emotion, intensity: clamp10(d) };
        if (n.intensity > cur.primary.intensity) { cur.secondary = cur.primary; cur.primary = n; } else cur.secondary = n;
      }
      hold = 20;
      return api.get();
    },
    heat(delta) { cur.heat = clamp(cur.heat + (Number(delta) || 0), 0, 100); hold = Math.max(hold, 6); return Math.round(cur.heat); },
    setHeat(v) { cur.heat = clamp(Number(v) || 0, 0, 100); return Math.round(cur.heat); },
    // Zurückdriften zum Grundzustand (Spielzeit): Stärke 1 Punkt je 25 s, Hitze 1 Punkt je 1,2 s
    tick(dt) {
      if (!(dt > 0)) return;
      if (hold > 0) { hold -= dt; return; }
      const k = dt / 25;
      const toward = (c, t) => { if (!c) return; c.intensity += clamp(t - c.intensity, -k, k); };
      if (cur.primary.emotion === b.primary.emotion) toward(cur.primary, b.primary.intensity);
      else { toward(cur.primary, 0); if (cur.primary.intensity < 0.5) { cur.primary = { ...b.primary, intensity: Math.min(b.primary.intensity, 1) }; } }
      if (cur.secondary) {
        const t = b.secondary && b.secondary.emotion === cur.secondary.emotion ? b.secondary.intensity : 0;
        toward(cur.secondary, t);
        if (cur.secondary.intensity < 0.25 && t === 0) cur.secondary = null;
      } else if (b.secondary) cur.secondary = { ...b.secondary, intensity: 0.5 };
      if (cur.inner) { const t = b.inner && b.inner.emotion === cur.inner.emotion ? b.inner.intensity : 0; toward(cur.inner, t); if (cur.inner.intensity < 0.25 && t === 0) cur.inner = null; }
      cur.heat = Math.max(b.heat, cur.heat - dt / 1.2);
    },
    toJSON() { return { primary: [cur.primary.emotion, +cur.primary.intensity.toFixed(2)], secondary: cur.secondary ? [cur.secondary.emotion, +cur.secondary.intensity.toFixed(2)] : null, inner: cur.inner ? [cur.inner.emotion, +cur.inner.intensity.toFixed(2)] : null, heat: Math.round(cur.heat) }; },
    fromJSON(j) { if (j && typeof j === 'object') api.set({ primary: j.primary, secondary: j.secondary, inner: j.inner, heat: j.heat, hold: 0 }); return api; },
  };
  return api;
}

// ---- Tanks ----
//   createTanks({ koerper: 70, … }, { day }) → { value(tank), values(), add(tank, amount, { kind:'need'|'wish', day }),
//     morning(day), lowest(), empties(threshold), toJSON(), fromJSON() }
export function createTanks(init = {}, { day = 1 } = {}) {
  const base = { ...DEFAULT_TANKS };
  for (const t of TANKS) if (typeof init[t] === 'number') base[t] = clamp(init[t], 0, 100);
  let wishes = [];   // { tank, amount, day }
  let needs = [];    // { tank, amount, untilDay }
  let today = day;
  const api = {
    get base() { return { ...base }; },
    value(tank) {
      if (!TANKS.includes(tank)) return 0;
      let v = base[tank];
      for (const w of wishes) if (w.tank === tank) v += w.amount;
      for (const n of needs) if (n.tank === tank) v += n.amount;
      return Math.round(clamp(v, 0, 100));
    },
    values() { return Object.fromEntries(TANKS.map((t) => [t, api.value(t)])); },
    // Wunsch: kurzer Schub (Standard +40), fällt am nächsten Morgen zurück. Bedürfnis: hält NEED_DAYS Tage.
    add(tank, amount, { kind = 'need', day: d = today } = {}) {
      if (!TANKS.includes(tank)) return api.value(tank);
      const a = Number(amount) || 0;
      if (kind === 'wish') wishes.push({ tank, amount: a > 0 ? Math.min(a, WISH_BOOST) : a, day: d });
      else needs.push({ tank, amount: a, untilDay: d + NEED_DAYS });
      return api.value(tank);
    },
    // Neuer Morgen: Wünsche fallen zurück, abgelaufene Bedürfnisse enden
    morning(day) {
      today = day;
      wishes = [];
      needs = needs.filter((n) => n.untilDay > day);
      return api.values();
    },
    lowest() { let best = TANKS[0], bv = Infinity; for (const t of TANKS) { const v = api.value(t); if (v < bv) { bv = v; best = t; } } return best; },
    empties(threshold = 25) { return TANKS.filter((t) => api.value(t) <= threshold); },
    get pending() { return { wishes: wishes.map((w) => ({ ...w })), needs: needs.map((n) => ({ ...n })) }; },
    toJSON() { return { wishes: wishes.slice(), needs: needs.slice(), day: today }; },
    fromJSON(j) { if (j && typeof j === 'object') { wishes = Array.isArray(j.wishes) ? j.wishes.slice() : []; needs = Array.isArray(j.needs) ? j.needs.slice() : []; if (typeof j.day === 'number') today = j.day; } return api; },
  };
  return api;
}

// ---- Grenz-Radius: Bindung (0–3) wählt die Stufe, das Hauptgefühl skaliert (Angst → größer) ----
export function boundaryRadius(boundary, bond = 0, emotion = null) {
  const b = boundary && Array.isArray(boundary.byBond) && boundary.byBond.length === 4 ? boundary : DEFAULT_BOUNDARY;
  const mood = { ...DEFAULT_BOUNDARY.mood, ...((boundary && boundary.mood) || {}) };
  let r = b.byBond[clamp(Math.round(Number(bond) || 0), 0, 3)];
  const p = emotion && (Array.isArray(emotion.primary) ? { emotion: emotion.primary[0], intensity: emotion.primary[1] } : pair(emotion.primary || emotion));
  if (p && mood[p.emotion] !== undefined) r *= 1 + (mood[p.emotion] - 1) * clamp10(p.intensity) / 10;
  if (emotion && emotion.heat > HEAT_CAP_OFF) r *= 1.25;
  return +r.toFixed(2);
}

// ---- Streit-Stil je Gegenüber (Tiago ist Hai gegen Noor, Teddy gegen Mika) ----
export function streitStilFor(def, vs = null) {
  const s = (def && def.streitStil) || {};
  if (vs && s.vs && STREIT_STILE.includes(s.vs[vs])) return s.vs[vs];
  return STREIT_STILE.includes(s.default) ? s.default : 'schildkroete';
}

// ---- Mäxchen-Tell: Stärke je Modus (Profi subtil) ----
export function tellFor(def, mode = 'abenteuer') {
  const t = (def && def.tell) || { bluff: 'blick-weg' };
  const amp = t.amp && typeof t.amp[mode] === 'number' ? t.amp[mode] : { entspannt: 1, abenteuer: 0.6, profi: 0.3 }[mode] || 0.6;
  return { bluff: t.bluff || 'blick-weg', amp: clamp(amp, 0, 1), mode: MODES.includes(mode) ? mode : 'abenteuer' };
}

// ---- Bindung 0–3: steigt durch Taten, sinkt nie dauerhaft. Negative Züge machen „verstimmt“ (mit Ursache und Reparatur). ----
//   bondStep(level, delta, { cause, repair }) → { level, verstimmt: null | { cause, repair } }
export function bondStep(level, delta, { cause = null, repair = null } = {}) {
  const l = clamp(Math.round(Number(level) || 0), 0, BOND_MAX);
  const d = Math.round(Number(delta) || 0);
  if (d >= 0) return { level: clamp(l + d, 0, BOND_MAX), verstimmt: null };
  // Nie dauerhaft sinken: die Stufe bleibt, die Figur ist vorübergehend verstimmt und nennt die Ursache
  return { level: l, verstimmt: { cause: cause || 'verstimmt', repair: repair || null } };
}
// Bindungen aus dem Spielstand (state.bonds = { id: 0–3 }, state.moods = { id: { kind:'verstimmt', cause, repair, day } })
export function createBonds(state, { day = () => 1, emit = () => {} } = {}) {
  const api = {
    get(id) { return clamp(Math.round(Number(state.get('bonds.' + id)) || 0), 0, BOND_MAX); },
    all() { return { ...(state.get('bonds') || {}) }; },
    set(id, level) { const l = clamp(Math.round(Number(level) || 0), 0, BOND_MAX); const prev = api.get(id); state.set('bonds.' + id, l); if (l !== prev) emit('bond:change', { npc: id, level: l, prev }); return l; },
    add(id, delta, opts = {}) {
      const prev = api.get(id);
      const r = bondStep(prev, delta, opts);
      if (r.verstimmt) {
        state.set('moods.' + id, { kind: 'verstimmt', cause: r.verstimmt.cause, repair: r.verstimmt.repair, day: day() });
        emit('npc:verstimmt', { npc: id, cause: r.verstimmt.cause, repair: r.verstimmt.repair });
      } else if (r.level !== prev) {
        state.set('bonds.' + id, r.level);
        emit('bond:change', { npc: id, level: r.level, prev });
      }
      // Eine gute Tat hebt eine Verstimmung auf
      if (delta > 0 && api.isVerstimmt(id)) api.repair(id, 'tat');
      return r;
    },
    isVerstimmt(id) { const m = state.get('moods.' + id); return !!(m && m.kind === 'verstimmt'); },
    mood(id) { return state.get('moods.' + id) || null; },
    repair(id, how = 'quest') { if (!api.isVerstimmt(id)) return false; state.remove('moods.' + id); emit('npc:repaired', { npc: id, how }); return true; },
  };
  return api;
}

// ---- Körpersprache aus dem Gefühlsmodell (für Profi-Modus ohne Aurafarben) ----
export function bodyFor(snapshot, { verstimmt = false } = {}) {
  const s = snapshot || { primary: ['freude', 3], secondary: null, heat: 0 };
  const w = bodyLanguageFor(s.primary[0], s.primary[1], s.secondary ? { emotion: s.secondary[0], intensity: s.secondary[1] } : null);
  if (s.heat > HEAT_CAP_OFF) { w.fistClench = Math.min(1, (w.fistClench || 0) + 0.6); w.jawTension = Math.min(1, (w.jawTension || 0) + 0.5); }
  else if (s.heat > 30) { w.fidget = Math.min(1, (w.fidget || 0) + (s.heat - 30) / 80); }
  if (verstimmt) { w.armCross = Math.min(1, (w.armCross || 0) + 0.55); w.gazeAway = Math.min(1, (w.gazeAway || 0) + 0.4); }
  return w;
}

// ---- Blick-Stufen: was die Aura je Fähigkeit und Modus zeigt ----
export function auraView({ abilities = [], upgrades = [], mode = 'abenteuer' } = {}) {
  const has = (u) => upgrades.includes(u);
  const blick = abilities.includes('blick') || upgrades.some((u) => u.startsWith('blick.'));
  return {
    aura: blick && mode !== 'profi', colors: mode !== 'profi',
    doppel: blick && has('blick.doppel'), tanks: blick && has('blick.tanks'), koerper: blick && has('blick.koerper'),
    grenzen: blick && has('blick.grenzen'), streittiere: blick && has('blick.streittiere'), masken: blick && has('blick.masken'),
    symbols: true,
  };
}

// ---- Tagesablauf: Eintrag zur Stunde (über Mitternacht erlaubt), sonst der erste Eintrag ----
export function scheduleAt(schedule, hour) {
  if (!Array.isArray(schedule) || !schedule.length) return null;
  const h = ((Number(hour) % 24) + 24) % 24;
  for (const s of schedule) {
    const a = Number(s.from), b = Number(s.to);
    if (a <= b ? (h >= a && h < b) : (h >= a || h < b)) return s;
  }
  return schedule[0];
}

// ---- Sichtbudget: höchstens maxN animierte Figuren, nach Abstand und Sichtbarkeit ----
//   pickAnimated([{ id, dist, inView, hidden, priority }], maxN) → { animated:Set(id), lite:Set(id), hidden:Set(id) }
export function pickAnimated(list, maxN = MAX_ANIMATED, { liteDist = 70, hideDist = 160 } = {}) {
  const animated = new Set(), lite = new Set(), hidden = new Set();
  const cand = list.filter((e) => !e.hidden).map((e) => ({ ...e, score: (e.dist || 0) - (e.inView === false ? -60 : 0) - (e.priority || 0) * 1000 }));
  cand.sort((a, b) => a.score - b.score);
  for (const e of cand) {
    if (e.dist > hideDist && !e.priority) { hidden.add(e.id); continue; }
    if (animated.size < maxN && (e.dist <= liteDist || e.priority)) animated.add(e.id);
    else lite.add(e.id);
  }
  for (const e of list) if (e.hidden) hidden.add(e.id);
  return { animated, lite, hidden };
}

// ---- Umbenennung: Lehrer-Panel legt state.names[id] ab; Anzeige = umbenannt oder Inhalt ----
export function displayName(def, names = {}) {
  if (!def) return 'Figur';
  const n = names && names[def.id];
  return typeof n === 'string' && n.trim() ? n.trim().slice(0, 24) : (typeof def.name === 'object' ? def.name.t : def.name) || def.id;
}

// ---- Namensschild-Farbe: Signaturfarbe der Figur ----
export const isHex = (v) => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
