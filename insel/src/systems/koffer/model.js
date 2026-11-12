// Skills-Koffer – reine Logik (WP33, DESIGN §7), ohne Browser: Fächer, Wirkungsfaktor je Spielstand (0,7–1,3) und je
// Figur (npcFit), Zonenregel (Kopf-Gadgets verpuffen bei Rot, ohne Strafe), Skills-Tester (vorher/nachher, Reichweite
// „hilft bis 60“), Ampelplan (ein Gadget je Zone plus Notfall-Slot).
//   FAECHER · FACH_LABEL · FACH_ICON · factorFor(seed, gadgetId, [min, max]) · fitFor(def, npcId)
//   effectFor(def, { seed, npc }) → { puls (negativ), factor, fit, reichweite }
//   canUse(def, zone) → 'ok' | 'verpufft'      reichweiteFor(def, factor) → 0–100
//   testerEntry({ before, after, reichweite }) → { before, after, delta, reichweite, wirkt }
//   planFor(state) · ampelSet(plan, zone, id, defs) → { plan, warn } (Kopf auf Rot = Hinweis, kein Verbot)
//   pickForZone(plan, zone, defs) → GadgetDef|null (Zonen-Gadget, sonst Notfall)
export const FAECHER = ['koerper', 'sinne', 'kopf', 'menschen', 'aktivitaeten'];
export const FACH_LABEL = { koerper: 'Körper', sinne: 'Sinne', kopf: 'Kopf', menschen: 'Menschen', aktivitaeten: 'Aktivitäten' };
export const FACH_ICON = { koerper: 'sprint', sinne: 'ohr', kopf: 'laterne', menschen: 'team', aktivitaeten: 'trommel' };
export const ZONEN = ['gruen', 'gelb', 'rot'];
export const ZONE_LABEL = { gruen: 'Grün', gelb: 'Gelb', rot: 'Rot', notfall: 'Notfall' };
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Deterministischer Faktor je Spielstand und Gadget (Hash aus Seed und ID → [min, max])
export function factorFor(seed, gadgetId, range = [0.7, 1.3]) {
  const s = String(seed === undefined || seed === null ? 1 : seed) + '|' + String(gadgetId || '');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  const u = ((h >>> 0) % 10000) / 10000;
  const [a, b] = Array.isArray(range) && range.length === 2 ? range : [0.7, 1.3];
  return +(a + u * (b - a)).toFixed(2);
}
export function fitFor(def, npcId) {
  if (!def || !npcId || !def.npcFit) return 1;
  const f = Number(def.npcFit[npcId]);
  return f > 0 ? f : 1;
}
export function reichweiteFor(def, factor = 1) {
  const base = def && typeof def.reichweite === 'number' ? def.reichweite : 80;
  return Math.round(clamp(base * (0.75 + 0.25 * factor), 10, 100));
}
export function effectFor(def, { seed = 1, npc = null } = {}) {
  const factor = factorFor(seed, def && def.id, def && def.perSave);
  const fit = fitFor(def, npc);
  const base = def && def.effect && typeof def.effect.puls === 'number' ? def.effect.puls : 0;
  const puls = -Math.round(Math.abs(base) * factor * fit);
  return { puls, factor, fit, reichweite: reichweiteFor(def, factor) };
}
export function canUse(def, zone) {
  if (!def) return 'verpufft';
  const z = def.zones || {};
  const allowed = z[zone];
  if (allowed === 0) return 'verpufft';
  return 'ok';
}
export function testerEntry({ before, after, reichweite }) {
  const b = clamp(Math.round(Number(before) || 0), 0, 100), a = clamp(Math.round(Number(after) || 0), 0, 100);
  return { before: b, after: a, delta: a - b, reichweite: clamp(Math.round(Number(reichweite) || 0), 0, 100), wirkt: a < b };
}
export function planFor(state) {
  const p = (state && (typeof state.get === 'function' ? state.get('ampel') : state.ampel)) || {};
  return { gruen: p.gruen || null, gelb: p.gelb || null, rot: p.rot || null, notfall: p.notfall || null };
}
// Ein Gadget in eine Zone legen: Kopf-Gadgets auf Rot bleiben erlaubt, liefern aber einen Hinweis (man merkt es selbst)
export function ampelSet(plan, zone, id, defs = {}) {
  const next = { ...plan };
  if (!ZONEN.includes(zone) && zone !== 'notfall') return { plan: next, warn: 'zone' };
  next[zone] = id || null;
  const def = id ? defs[id] : null;
  const warn = zone === 'rot' && def && def.fach === 'kopf' ? 'kopf-bei-rot' : null;
  return { plan: next, warn };
}
export function pickForZone(plan, zone, defs = {}) {
  const id = plan && plan[zone];
  if (id && defs[id]) return defs[id];
  return null;
}
