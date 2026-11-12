// Puls-Modell (WP33, DESIGN §6/§9) – reine Logik ohne Browser, für Plugin und Unit-Tests.
//   zoneOf(p) → gruen|gelb|rot            MODE_PARAMS[mode] → { rise, gelb:{…}, rot:{…}, vignette:{gelb, rot} }
//   modifiersFor(mode, zone) → { grabTolerance, glideStability }   (Entspannt ändert nie Steuerparameter)
//   vignetteFor(mode, zone, reducedFx) → 0..0,5 (gedeckelt)
//   applyRise(cur, delta, { mode, factor, cap }) → neuer Wert (Anstieg × Modus × Inselwetter, gedeckelt)
//   applyFail(cur, { mode, factor, cap }) → Wert (Fehlschlag +8, treibt nie über FAIL_MAX = 55)
//   createPulsCounter() → { fail() → { consecutive, antiSpiral }, success(), consecutive }   (2 in Folge → −20 + Windschatten)
//   decayRate(p, { sinks, shelter, calmNpcs, sources }) → Änderung je Sekunde (Senken, Co-Regulation, Abklingen)
//   heartbeatBpm(p) → Herzschlag-Tempo bei Rot · glimmColor(zone) → Hex
export const FAIL_PULS = 8;
export const FAIL_MAX = 55;
export const ANTI_SPIRAL_AT = 2;
export const ANTI_SPIRAL_DROP = 20;
export const HILFE_DROP = 50;
export const SICHERER_ORT_PULS = 10;
export const HARD_CAP = 100;

export const ZONE_COLOR = { neutral: '#2de2c9', gruen: '#5ad24f', gelb: '#ffd23f', rot: '#ff5d5d' };
export const ZONE_LABEL = { gruen: 'Grün', gelb: 'Gelb', rot: 'Rot' };

export const zoneOf = (p) => (p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot');
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Modus-Parameter (DESIGN §6/§9): Anstieg ×0,6 / ×1 / ×1,3; Zonen-Effekte nur in Abenteuer und Profi
export const MODE_PARAMS = {
  entspannt: { rise: 0.6, gelb: {}, rot: {}, vignette: { gelb: 0.16, rot: 0.34 } },
  abenteuer: { rise: 1.0, gelb: { glideStability: 0.95, grabTolerance: 0.85 }, rot: { glideStability: 0.95, grabTolerance: 0.7 }, vignette: { gelb: 0.22, rot: 0.46 } },
  profi: { rise: 1.3, gelb: { glideStability: 0.9, grabTolerance: 0.75 }, rot: { glideStability: 0.85, grabTolerance: 0.6 }, vignette: { gelb: 0.24, rot: 0.5 } },
};
const P = (mode) => MODE_PARAMS[mode] || MODE_PARAMS.abenteuer;

export function modifiersFor(mode, zone) {
  const base = { grabTolerance: 1, glideStability: 1 };
  const m = P(mode);
  if (zone === 'gelb') return { ...base, ...m.gelb };
  if (zone === 'rot') return { ...base, ...m.rot };
  return base;
}
export function vignetteFor(mode, zone, reducedFx = false) {
  if (reducedFx || zone === 'gruen' || !zone) return 0;
  return clamp(P(mode).vignette[zone] || 0, 0, 0.5);
}

// Anstieg: nur positive Deltas werden skaliert; Senken wirken immer voll
export function applyRise(cur, delta, { mode = 'abenteuer', factor = 1, cap = null } = {}) {
  const c = clamp(Number(cur) || 0, 0, HARD_CAP);
  const d = Number(delta) || 0;
  const scaled = d > 0 ? d * P(mode).rise * (Number(factor) > 0 ? Number(factor) : 1) : d;
  let next = c + scaled;
  const top = cap === null || cap === undefined ? HARD_CAP : Math.min(HARD_CAP, Number(cap));
  if (scaled > 0 && next > top) next = Math.max(c, top);   // ein Deckel senkt nie, er stoppt nur den Anstieg
  return clamp(next, 0, HARD_CAP);
}
// Fehlschlag: +8 (skaliert), treibt den Puls nie über 55 (Anti-Spirale)
export function applyFail(cur, opts = {}) {
  const c = clamp(Number(cur) || 0, 0, HARD_CAP);
  if (c >= FAIL_MAX) return c;
  return Math.min(FAIL_MAX, applyRise(c, FAIL_PULS, opts));
}
export function createPulsCounter() {
  let consecutive = 0;
  return {
    get consecutive() { return consecutive; },
    fail() { consecutive++; const antiSpiral = consecutive % ANTI_SPIRAL_AT === 0; return { consecutive, antiSpiral }; },
    success() { consecutive = 0; },
    reset() { consecutive = 0; },
  };
}

// Senken je Sekunde: natürliches Abklingen (langsam), Windschatten, ruhige Figuren nahe (Co-Regulation), Senken-Register
export const DECAY = { natural: 0.9, shelter: 5, calmNpc: 1.5, calmMax: 2 };
export function decayRate(p, { sinks = 0, shelter = false, calmNpcs = 0, sources = 0 } = {}) {
  const v = clamp(Number(p) || 0, 0, HARD_CAP);
  if (v <= 0) return 0;
  let rate = sources > 0 ? 0 : DECAY.natural;
  if (shelter) rate += DECAY.shelter;
  rate += DECAY.calmNpc * Math.min(DECAY.calmMax, Math.max(0, calmNpcs));
  rate += Math.max(0, Number(sinks) || 0);
  return rate;
}
export const heartbeatBpm = (p) => Math.round(64 + clamp(p - 70, 0, 30) * 1.4);
export const glimmColor = (zone) => ZONE_COLOR[zone] || ZONE_COLOR.neutral;
