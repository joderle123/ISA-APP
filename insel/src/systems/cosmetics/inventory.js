// Kosmetik-Inventar (WP41), reine Logik ohne Browser: Quellen auswerten, Besitz bestimmen, Angelegtes auf den Look anwenden.
//   evalSource(source, data) → bool     data = Spielstand-Objekt (state.snapshot() oder state.data)
//   ownedItems(items, data) → [item]    (explizit in cosmetics.owned oder Quelle erfüllt)
//   applyEquipped(items, equipped, baseLook, ctx) → Look-Konfiguration inkl. Maske, Kopfsache, Jacke
//   dyesFor(items, data) → zusätzliche Farbfelder (Farbsets)   ·   emotesFor(items, data) → Emote-Namen
import { MEDALS } from '../../content/schema/consts.js';

const get = (o, path, fb) => { let c = o; for (const k of path.split('.')) { if (c === null || c === undefined) return fb; c = c[k]; } return c === undefined ? fb : c; };
const medalRank = (m) => MEDALS.indexOf(m);

export function evalSource(source, data = {}) {
  if (!source || typeof source !== 'object') return false;
  if (source.start) return true;
  if (source.unitDone) return get(data, 'units.' + source.unitDone) === 'fertig';
  if (source.regionFreed) {
    const z = get(data, 'veil.zones.' + source.regionFreed);
    const p = get(data, 'veil.patches.' + source.regionFreed);
    const v = typeof z === 'number' ? z : typeof p === 'number' ? p : null;
    return v !== null && v <= 0.01;
  }
  if (source.shard !== undefined) return (get(data, 'shards', []) || []).includes(source.shard);
  if (source.bond) return (Number(get(data, 'bonds.' + source.bond[0], 0)) || 0) >= Number(source.bond[1] || 1);
  if (source.minigame) {
    const m = get(data, 'medals.' + source.minigame);
    if (!m) return false;
    const need = source.medal ? medalRank(source.medal) : 0;
    const have = m.stern ? 3 : medalRank(m.medal);
    return have >= need;
  }
  if (source.nebelkern) return !!get(data, 'collectibles.' + source.nebelkern);
  if (source.collectible) return !!get(data, 'collectibles.' + source.collectible);
  if (source.lichtsplitter !== undefined) return (Number(get(data, 'lichtsplitter', 0)) || 0) >= Number(source.lichtsplitter);
  if (source.deed) return (get(data, 'deeds', []) || []).includes(source.deed);
  return false;
}

export function isOwned(item, data = {}) {
  const owned = get(data, 'cosmetics.owned', []) || [];
  return owned.includes(item.id) || evalSource(item.source, data);
}
export function ownedItems(items, data = {}) { return items.filter((it) => isOwned(it, data)); }

// Angelegte Kosmetik auf eine Avatar-Konfiguration anwenden (nur Slots mit Look-Wirkung: maske, kopf, jacke)
export function applyEquipped(items, equipped = {}, look = {}, ctx = {}) {
  const out = { ...look };
  const byId = new Map(items.map((it) => [it.id, it]));
  const has = (slot) => { const id = equipped[slot]; const it = id && byId.get(id); return it && it.slot === slot ? it : null; };
  const maske = has('maske');
  out.mask = maske && maske.params && maske.params.mask ? maske.params.mask : 'keine';
  const kopf = has('kopf');
  if (kopf && kopf.params) { if (kopf.params.head) out.head = kopf.params.head; if (kopf.params.headColor) out.headColor = kopf.params.headColor; }
  const jacke = has('jacke');
  if (jacke) {
    out.topStyle = (jacke.params && jacke.params.topStyle) || 'crewjacke';
    out.jacket = { ...(out.jacket || {}), signatures: ctx.signatures || [] };
  } else if (out.topStyle === 'crewjacke' && !ctx.allowCrew) {
    out.topStyle = 'hoodie';
  }
  return out;
}

// Zusätzliche Farbfelder aus Farbsets, Emote-Namen aus Emote-Kosmetik
export function dyesFor(items, data = {}) {
  const out = [];
  for (const it of ownedItems(items.filter((i) => i.slot === 'farbset'), data)) for (const d of (it.params && it.params.dyes) || []) if (!out.includes(d)) out.push(d);
  return out;
}
export function emotesFor(items, data = {}) {
  return ownedItems(items.filter((i) => i.slot === 'emote'), data).map((it) => (it.params && it.params.emote) || it.id.replace(/^emote-/, ''));
}

// Unterschriften für das Jacken-Futter: Figuren mit Bindung ≥ 2 (Farbe/Icon aus den Figurendaten)
export function jacketSignatures(bonds = {}, npcs = []) {
  const out = [];
  for (const [id, lvl] of Object.entries(bonds || {})) {
    if (Number(lvl) < 2) continue;
    const n = npcs.find((x) => x.id === id) || {};
    out.push({ npc: id, color: n.color || '#ffd166', icon: n.icon || 'stern' });
  }
  return out.slice(0, 12);
}
