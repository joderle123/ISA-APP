// Auswertung der Cond-/Effect-DSL aus CONTENT-SCHEMA.md (WP31/WP32). Reine Logik ohne Browser: Quest- und
// Dialog-Engine (und später Nachtwache, Tore, Minispiele) rufen dieselben Funktionen mit einem Kontext auf.
//   evalCond(cond, ctx) → boolean           cond = { unit } | { flag } | { all:[…] } | …  (siehe schema/dsl.js)
//   applyEffects(list, ctx) → Promise        jede Wirkung sofort; { wait } und Haken dürfen asynchron sein
//   applyEffect(effect, ctx) → Promise|any
//   createDslContext({ state, events, content, time, hooks }) → ctx   (Standard: schreibt direkt in game.state)
// Kontext (alles optional außer state):
//   ctx.state          Spielzustand (get/set/inc/push/addUnique/pull)
//   ctx.emit(name, p)  Ereignisse (unit:unlock, ability:grant, bond:change, puls:set, deed:add …)
//   ctx.puls() / setPuls(v)        Spieler-Puls (Standard state.session.puls; WP33 hängt sich hier ein)
//   ctx.hitze(npc) / setHitze(npc, v)   NPC-Hitze 0–100 (Standard state.session.hitze.<npc>)
//   ctx.time() → { hour, day }      ctx.mode() → 'entspannt'|'abenteuer'|'profi'
//   ctx.hooks.<name>(value, effect)  Welt-Haken: veil, relapse, quest, scene, glimm, anim, gate, toast, say, sound, wait,
//                                    echo, tank, emotion, mood, cosmetic, memory, item, wurzel, gadget, ampel
// Gesetz 6: Bindungen sinken hier nie (negative bond-Werte werden ignoriert), Puls und Hitze bleiben in 0–100.
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const clamp100 = (v) => clamp(Math.round(Number(v) || 0), 0, 100);
export const pulsZone = (p) => (p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot');

const OPS = {
  '<': (a, b) => a < b, '<=': (a, b) => a <= b, '>': (a, b) => a > b, '>=': (a, b) => a >= b,
  '==': (a, b) => a == b, '!=': (a, b) => a != b, // eslint-disable-line eqeqeq
};
const cmp = (a, op, b) => (OPS[op] ? OPS[op](a, b) : false);

export function createDslContext({ state, events = null, content = null, time = null, mode = null, hooks = {} } = {}) {
  const ctx = {
    state, content, hooks: { ...hooks },
    emit(name, payload) { if (events) events.emit(name, payload); },
    puls() { return Number(state.get('session.puls', 0)) || 0; },
    setPuls(v, reason) {
      const p = clamp100(v);
      state.set('session.puls', p);
      ctx.emit('puls:set', { value: p, zone: pulsZone(p), reason: reason || 'effekt' });
      return p;
    },
    hitze(npc) { return Number(state.get('session.hitze.' + npc, 0)) || 0; },
    setHitze(npc, v, reason) {
      const h = clamp100(v);
      state.set('session.hitze.' + npc, h);
      ctx.emit('npc:hitze', { npc, value: h, deckel: h > 70, reason: reason || 'effekt' });
      return h;
    },
    time() { return typeof time === 'function' ? time() : (time || { hour: Number(state.get('time.hour', 12)) || 12, day: Number(state.get('time.day', 1)) || 1 }); },
    mode() { return typeof mode === 'function' ? mode() : (mode || state.get('settings.mode', 'abenteuer')); },
  };
  return ctx;
}

// ---- Bedingungen ----
export function evalCond(c, ctx) {
  if (c === undefined || c === null) return true;
  if (Array.isArray(c)) return c.every((x) => evalCond(x, ctx));
  if (typeof c !== 'object') return !!c;
  const st = ctx.state;
  const k = Object.keys(c)[0];
  const v = c[k];
  switch (k) {
    case 'unit': { const s = st.get('units.' + v); return s === 'kurz' || s === 'offen' || s === 'aktiv' || s === 'fertig'; }
    case 'unitDone': return st.get('units.' + v) === 'fertig';
    case 'ability': return (st.get('abilities', []) || []).includes(v);
    case 'upgrade': return (st.get('upgrades', []) || []).includes(v);
    case 'feather': return (st.get('feathers', []) || []).includes(v);
    case 'item': return (st.get('items', []) || []).includes(v);
    case 'deed': return (st.get('deeds', []) || []).includes(v);
    case 'collectible': return !!st.get('collectibles.' + v);
    case 'flag': {
      if (typeof v === 'string') return !!st.get('flags.' + v);
      const [name, op, val] = v;
      return cmp(st.get('flags.' + name), op, val);
    }
    case 'bond': return (Number(st.get('bonds.' + v[0], 0)) || 0) >= Number(v[1]);
    case 'time': {
      const h = ctx.time().hour;
      if (v === 'night') return h >= 21 || h < 6;
      if (v === 'day') return h >= 6 && h < 21;
      const [a, b] = v;
      return a <= b ? h >= a && h < b : h >= a || h < b;
    }
    case 'puls': return cmp(ctx.puls(), v[0], v[1]);
    case 'npcHitze': return cmp(ctx.hitze(v[0]), v[1], v[2]);
    case 'mode': return ctx.mode() === v;
    case 'shard': return (st.get('shards', []) || []).includes(Number(v));
    case 'regionFreed': { const z = st.get('veil.zones.' + v); const p = st.get('veil.patches.' + v); const a = typeof z === 'number' ? z : typeof p === 'number' ? p : null; return a !== null && a <= 0.01; }
    case 'medal': { const m = st.get('medals.' + v[0]); if (!m) return false; const R = ['bronze', 'silber', 'gold', 'stern']; return (m.stern ? 3 : R.indexOf(m.medal)) >= R.indexOf(v[1]); }
    case 'all': return v.every((x) => evalCond(x, ctx));
    case 'any': return v.some((x) => evalCond(x, ctx));
    case 'not': return !evalCond(v, ctx);
    default: return false;
  }
}

// ---- Wirkungen ----
const hook = (ctx, name, ...args) => (ctx.hooks && typeof ctx.hooks[name] === 'function' ? ctx.hooks[name](...args) : undefined);

export function applyEffect(e, ctx) {
  if (!e || typeof e !== 'object') return undefined;
  const st = ctx.state;
  const k = Object.keys(e).find((x) => x !== 'set');
  const v = e[k];
  switch (k) {
    case 'flag': { const val = e.set === undefined ? true : e.set; st.set('flags.' + v, val); ctx.emit('flag:set', { flag: v, value: val }); return val; }
    case 'bond': {
      const [npc, delta] = v;
      if (!(Number(delta) > 0)) return st.get('bonds.' + npc, 0);   // Gesetz 6: Bindungen sinken nie dauerhaft
      const cur = Number(st.get('bonds.' + npc, 0)) || 0;
      const next = clamp(cur + Number(delta), 0, 3);
      if (next !== cur) { st.set('bonds.' + npc, next); ctx.emit('bond:change', { npc, level: next, prev: cur }); }
      return next;
    }
    case 'deed': return addDeed(ctx, v, e);
    case 'tank': return hook(ctx, 'tank', v, e) ?? setSessionTank(ctx, v);
    case 'puls': return ctx.setPuls(ctx.puls() + Number(v), 'effekt');
    case 'npcHitze': {
      const [npc, val] = v;
      // Konvention: im enter-Block eines Dialogknotens setzt npcHitze absolut (die Dialog-Engine markiert das mit
      // set: true), überall sonst ist der Wert ein Delta: effects: [{ npcHitze: ['luc', -60] }].
      const abs = e.set === true;
      return ctx.setHitze(npc, abs ? Number(val) : ctx.hitze(npc) + Number(val), 'effekt');
    }
    case 'emotion': return hook(ctx, 'emotion', v, e) ?? st.set('session.emotion.' + v.npc, { primary: v.primary || null, secondary: v.secondary || null });
    case 'grant': {
      if (!(st.get('abilities', []) || []).includes(v)) { st.addUnique('abilities', v); ctx.emit('ability:grant', { id: v, upgrade: false, ability: v }); }
      return true;
    }
    case 'upgrade': {
      const base = String(v).split('.')[0];
      const had = (st.get('upgrades', []) || []).includes(v);
      st.addUnique('abilities', base);
      st.addUnique('upgrades', v);
      if (!had) ctx.emit('ability:grant', { id: v, upgrade: true, ability: base });
      return true;
    }
    case 'feather': st.addUnique('feathers', v); ctx.emit('feather:grant', { id: v }); return true;
    case 'gadget': st.addUnique('gadgets', v); ctx.emit('gadget:grant', { id: v }); hook(ctx, 'gadget', v, e); return true;
    case 'wurzel': st.addUnique('wurzeln.extra', v); ctx.emit('wurzel:grant', { id: v }); hook(ctx, 'wurzel', v, e); return true;
    case 'item': st.addUnique('items', v); ctx.emit('item:grant', { id: v }); hook(ctx, 'item', v, e); return true;
    case 'veil': return hook(ctx, 'veil', v, e) ?? st.set('veil.zones.' + v.zone, clamp(Number(v.to), 0, 1));
    case 'relapse': return hook(ctx, 'relapse', v, e) ?? st.set('veil.patches.' + v.patch, clamp(Number(v.to), 0, 1));
    case 'patch': { st.addUnique('patches', v); ctx.emit('patch:unlock', { unit: v }); hook(ctx, 'patch', v, e); return true; }
    case 'lichtsplitter': { const n = st.inc('lichtsplitter', Number(v)); ctx.emit('lichtsplitter:add', { amount: Number(v), total: n }); return n; }
    case 'cosmetic': st.addUnique('cosmetics.owned', v); hook(ctx, 'cosmetic', v, e); return true;
    case 'shard': { const n = Number(v); if (!(st.get('shards', []) || []).includes(n)) { st.addUnique('shards', n); ctx.emit('shard:found', { shard: n }); } hook(ctx, 'shard', n, e); return true; }
    case 'echo': return hook(ctx, 'echo', v, e);
    case 'quest': return hook(ctx, 'quest', v, e);
    case 'scene': return hook(ctx, 'scene', v, e);
    case 'glimm': return hook(ctx, 'glimm', v, e);
    case 'anim': return hook(ctx, 'anim', v, e);
    case 'gate': { const id = v.open || v.close; st.set('gates.' + id, !!v.open); ctx.emit('gate:set', { id, open: !!v.open }); return hook(ctx, 'gate', v, e); }
    case 'mood': { st.set('moods.' + v[0], v[1] === 'verstimmt' ? undefined : v[1]); ctx.emit('mood:set', { npc: v[0], mood: v[1] }); return hook(ctx, 'mood', v, e); }
    case 'ampel': { st.set('ampel.' + v.zone, v.gadget || null); ctx.emit('ampel:set', v); return true; }
    case 'toast': return hook(ctx, 'toast', v, e);
    case 'say': return hook(ctx, 'say', v, e);
    case 'sound': return hook(ctx, 'sound', v, e);
    case 'wait': return hook(ctx, 'wait', Number(v), e) ?? new Promise((r) => setTimeout(r, Number(v) * 1000));
    default: return hook(ctx, k, v, e);
  }
}

export async function applyEffects(list, ctx) {
  if (!list) return [];
  const out = [];
  for (const e of Array.isArray(list) ? list : [list]) out.push(await applyEffect(e, ctx));
  return out;
}

// Tat ins Log: state.deeds (IDs, wie das Kosmetik-Inventar sie liest) + state.deedLog ({ id, day, unit, npc, t })
export function addDeed(ctx, id, meta = {}) {
  const st = ctx.state;
  const known = (st.get('deeds', []) || []).includes(id);
  if (!known) st.addUnique('deeds', id);
  const entry = { id, day: ctx.time().day, t: Date.now(), unit: meta.unit || st.get('session.activeUnit') || null, npc: meta.npc || null };
  st.push('deedLog', entry);
  ctx.emit('deed:add', { ...entry, first: !known });
  return entry;
}

function setSessionTank(ctx, v) {
  const path = `session.tanks.${v.npc}.${v.tank}`;
  const cur = Number(ctx.state.get(path, 50)) || 0;
  const next = clamp100(cur + Number(v.add || 0));
  ctx.state.set(path, next);
  ctx.emit('tank:set', { npc: v.npc, tank: v.tank, value: next, kind: v.kind || 'need' });
  return next;
}
