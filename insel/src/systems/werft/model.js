// Werft (BAUPLAN §2.1 A4) – reine Logik: Kosten prüfen, Teil bauen. Teile und Kosten: content/boot/teile.js.
import { MATERIALS, emptyMaterials } from '../bergen/model.js';

// Was fehlt für ein Teil? → { ok, fehlt: { holz: 1, … }, plan: true|false, gebaut }
export function checkBuild(teil, material, { plans = [], gebaut = [] } = {}) {
  const m = { ...emptyMaterials(), ...(material || {}) };
  const fehlt = {};
  for (const k of MATERIALS) { const need = (teil.kosten && teil.kosten[k]) || 0; if (m[k] < need) fehlt[k] = need - m[k]; }
  const plan = !teil.plan || plans.includes(teil.plan);
  const done = gebaut.includes(teil.id);
  return { ok: !done && plan && !Object.keys(fehlt).length, fehlt, plan, gebaut: done };
}
// Material nach dem Bau (wirft nichts; prüft vorher checkBuild)
export function payFor(teil, material) {
  const m = { ...emptyMaterials(), ...(material || {}) };
  for (const k of MATERIALS) m[k] -= (teil.kosten && teil.kosten[k]) || 0;
  return m;
}
// Gesamtkosten mehrerer Teile
export function totalCost(teile) {
  const m = emptyMaterials();
  for (const t of teile) for (const k of MATERIALS) m[k] += (t.kosten && t.kosten[k]) || 0;
  return m;
}
export function affords(material, cost) { return MATERIALS.every((k) => ((material && material[k]) || 0) >= (cost[k] || 0)); }
