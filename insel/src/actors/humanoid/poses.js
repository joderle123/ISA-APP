// Körpersprache (WP17): additive Posen, die sich weich über jede Animation legen (Gewicht 0…1 je Pose).
// Zehn Zeichen aus DESIGN §5 „Profi-Modus“: Schultern, Kopf, Blick, Fäuste, Arme, Abstand, Kiefer, Zappeln, Haltung.
//   const bl = createBodyLanguage(joints); bl.set('shoulderUp', 1); bl.setAll({ slump: 0.8, headDown: 0.5 });
//   bl.update(dt, t) → nach der Grund-Animation aufrufen (addiert Rotationen, hebt Schultern, verschiebt den Körper)
//   bl.hands → 'open' | 'fist' (für die Hand-Meshes) · bl.face → { brows, mouth } Zusatz für den Ausdruck
//   bodyLanguageFor(emotion, intensity 0–10, secondary?) → Gewichte (rein, für das Figuren-System)
export const POSE_NAMES = ['shoulderUp', 'headDown', 'gazeAway', 'fistClench', 'armCross', 'stepBack', 'jawTension', 'fidget', 'slump', 'upright'];

// Jede Pose: Gelenk → [x, y, z] Zusatzrotation (rad) bei Gewicht 1; lift = Schulter-Hebung (m); bodyY/bodyZ = Körperversatz;
// face = Ausdruckszusatz; dyn(t) liefert zeitabhängige Zusätze (Zappeln).
export const POSES = {
  shoulderUp: { shL: [-0.08, 0, 0.32], shR: [-0.08, 0, -0.32], head: [0.08, 0, 0], spine: [0.04, 0, 0], lift: 0.035, face: { brows: 0.35 } },
  headDown: { head: [0.55, 0, 0], spine: [0.06, 0, 0], face: { mouth: -0.15 } },
  gazeAway: { head: [0.06, 0.75, 0.12], spine: [0, 0.08, 0] },
  fistClench: { elL: [-0.35, 0, 0], elR: [-0.35, 0, 0], shL: [0.18, 0.15, 0.08], shR: [0.18, -0.15, -0.08], hands: 'fist', face: { brows: -0.4 } },
  armCross: { shL: [-0.5, 0.2, -0.12], shR: [-0.5, -0.2, 0.12], elL: [-1.75, 0, -1.0], elR: [-1.6, 0, 1.0], spine: [0.05, 0, 0], head: [-0.05, 0, 0] },
  stepBack: { bodyZ: -0.24, hipL: [-0.08, 0, 0.1], hipR: [0.4, 0, -0.1], kneeR: [0.5, 0, 0], spine: [-0.14, 0, 0], head: [-0.06, 0, 0], shL: [-0.25, 0, 0.3], shR: [-0.25, 0, -0.3], elL: [-0.6, 0, 0], elR: [-0.6, 0, 0], face: { brows: 0.5, mouth: -0.2 } },
  jawTension: { head: [-0.05, 0, 0], spine: [0.02, 0, 0], face: { mouth: -0.7, brows: -0.5 } },
  fidget: { shL: [-0.55, 0.1, -0.08], shR: [-0.55, -0.1, 0.08], elL: [-1.5, 0, -0.45], elR: [-1.55, 0, 0.45], head: [0.08, 0, 0], dyn: (t) => ({ elL: [Math.sin(t * 7.3) * 0.25, 0, 0], elR: [Math.sin(t * 7.3 + 1.6) * 0.25, 0, 0], head: [0, Math.sin(t * 2.9) * 0.18, Math.sin(t * 4.1) * 0.03], kneeL: [Math.max(0, Math.sin(t * 5.1)) * 0.08, 0, 0] }) },
  slump: { spine: [0.38, 0, 0], head: [0.2, 0, 0], shL: [0.2, 0, -0.08], shR: [0.2, 0, 0.08], elL: [0.1, 0, 0], elR: [0.1, 0, 0], hipL: [-0.12, 0, 0], hipR: [-0.12, 0, 0], kneeL: [0.18, 0, 0], kneeR: [0.18, 0, 0], bodyY: -0.06, face: { mouth: -0.35 } },
  upright: { spine: [-0.14, 0, 0], head: [-0.1, 0, 0], shL: [0.02, 0, -0.1], shR: [0.02, 0, 0.1], bodyY: 0.015, lift: 0.008, face: { mouth: 0.15 } },
};

// Gefühl → Körpersprache (Stärke 0–10 skaliert die Gewichte). Zweitgefühl mischt mit halbem Gewicht.
export const EMOTION_BODY = {
  wut: { fistClench: 1, jawTension: 0.9, upright: 0.35 },
  angst: { shoulderUp: 1, stepBack: 0.7, gazeAway: 0.35 },
  trauer: { slump: 1, headDown: 0.8 },
  freude: { upright: 1 },
  ekel: { stepBack: 0.6, gazeAway: 0.8, jawTension: 0.35 },
  ueberraschung: { shoulderUp: 0.55, upright: 0.5 },
  scham: { headDown: 0.9, gazeAway: 0.6, slump: 0.4, armCross: 0.3 },
  nervoes: { fidget: 1, shoulderUp: 0.3 },
};
export function bodyLanguageFor(emotion, intensity = 5, secondary = null) {
  const out = {};
  const add = (em, k) => {
    const def = EMOTION_BODY[em];
    if (!def) return;
    for (const [pose, w] of Object.entries(def)) out[pose] = Math.min(1, (out[pose] || 0) + w * k);
  };
  const k = Math.max(0, Math.min(1, Number(intensity) / 10));
  add(emotion, k);
  if (secondary) add(secondary.emotion || secondary[0], (Math.max(0, Math.min(1, Number(secondary.intensity !== undefined ? secondary.intensity : secondary[1]) / 10))) * 0.5);
  return out;
}

const JOINTS = ['body', 'spine', 'head', 'hipL', 'hipR', 'kneeL', 'kneeR', 'shL', 'shR', 'elL', 'elR'];

export function createBodyLanguage(J, { shoulderY = 0 } = {}) {
  const target = {}, cur = {};
  for (const n of POSE_NAMES) { target[n] = 0; cur[n] = 0; }
  let time = 0;
  const acc = {};
  const face = { brows: 0, mouth: 0 };
  const api = {
    get weights() { return { ...cur }; },
    get targets() { return { ...target }; },
    get active() { return POSE_NAMES.some((n) => cur[n] > 0.01); },
    hands: 'open',
    face,
    set(name, w = 1) { if (name in target) target[name] = Math.max(0, Math.min(1, Number(w) || 0)); return api; },
    setAll(obj) { for (const n of POSE_NAMES) target[n] = 0; if (obj) for (const [k, v] of Object.entries(obj)) api.set(k, v); return api; },
    clear() { for (const n of POSE_NAMES) target[n] = 0; return api; },
    // Sofort auf die Zielwerte springen (Tests, Bögen)
    snap() { for (const n of POSE_NAMES) cur[n] = target[n]; },
    update(dt, t) {
      time = t !== undefined ? t : time + dt;
      const k = dt > 0 ? 1 - Math.exp(-dt * 5) : 1;
      let anyFist = 0, lift = 0, bodyY = 0, bodyZ = 0;
      face.brows = 0; face.mouth = 0;
      for (const j of JOINTS) acc[j] = null;
      for (const n of POSE_NAMES) {
        cur[n] += (target[n] - cur[n]) * k;
        const w = cur[n];
        if (w < 0.003) continue;
        const P = POSES[n];
        const dyn = P.dyn ? P.dyn(time) : null;
        for (const j of JOINTS) {
          const v = P[j], d = dyn && dyn[j];
          if (!v && !d) continue;
          const a = acc[j] || (acc[j] = [0, 0, 0]);
          for (let i = 0; i < 3; i++) a[i] += ((v ? v[i] : 0) + (d ? d[i] : 0)) * w;
        }
        if (P.lift) lift += P.lift * w;
        if (P.bodyY) bodyY += P.bodyY * w;
        if (P.bodyZ) bodyZ += P.bodyZ * w;
        if (P.hands === 'fist') anyFist = Math.max(anyFist, w);
        if (P.face) { face.brows += (P.face.brows || 0) * w; face.mouth += (P.face.mouth || 0) * w; }
      }
      for (const j of JOINTS) {
        const a = acc[j]; if (!a) continue;
        const r = J[j].rotation;
        r.set(r.x + a[0], r.y + a[1], r.z + a[2]);
      }
      J.shL.position.y = shoulderY + lift; J.shR.position.y = shoulderY + lift;
      J.body.position.y += bodyY;
      J.body.position.z = bodyZ;
      api.hands = anyFist > 0.5 ? 'fist' : 'open';
    },
  };
  return api;
}
