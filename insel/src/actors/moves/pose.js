// Posen-Ebene für die Bewegungszustände (klettern, gleiten, schwimmen, tauchen, tragen, anspannen, schweben).
// Legt sich nach humanoid.update(dt) über die Gelenke (weich eingeblendet), damit humanoid.js unverändert bleibt.
//   const poser = createPoser(humanoid); poser.set('climb', { phase }); poser.update(dt); poser.set(null)
const JOINTS = ['body', 'spine', 'head', 'hipL', 'hipR', 'kneeL', 'kneeR', 'shL', 'shR', 'elL', 'elR'];

const POSES = {
  // Pumpsprung: Hocke, Arme nach hinten, Blick nach vorn
  charge(p, o) {
    const c = 0.6 + 0.4 * (o.charge || 0);
    p.bodyY = -0.42 * c;
    p.hipL = [-1.25 * c, 0, 0.1]; p.hipR = [-1.25 * c, 0, -0.1];
    p.kneeL = [1.95 * c, 0, 0]; p.kneeR = [1.95 * c, 0, 0];
    p.spine = [0.6 * c, 0, 0]; p.head = [-0.4 * c, 0, 0];
    p.shL = [0.7 * c, 0, 0.35]; p.shR = [0.7 * c, 0, -0.35];
    p.elL = [-0.5, 0, 0]; p.elR = [-0.5, 0, 0];
    p.w = { hipL: 1, hipR: 1, kneeL: 1, kneeR: 1, spine: 1, head: 1, shL: 1, shR: 1, elL: 1, elR: 1, bodyY: 1 };
  },
  // Tragen: Arme vorn, Ding vor der Brust
  carry(p) {
    p.shL = [-1.2, 0.15, 0.25]; p.shR = [-1.2, -0.15, -0.25];
    p.elL = [-0.55, 0, 0]; p.elR = [-0.55, 0, 0];
    p.spine = [0.06, 0, 0];
    p.w = { shL: 1, shR: 1, elL: 1, elR: 1, spine: 0.6 };
  },
  // Klettern: Arme oben, Beine angewinkelt, abwechselnd greifen
  climb(p, o) {
    const ph = o.phase || 0;
    const s = Math.sin(ph), c = Math.cos(ph);
    if (o.slide) {
      p.shL = [-2.9, 0, 0.25]; p.shR = [-2.9, 0, -0.25]; p.elL = [-0.15, 0, 0]; p.elR = [-0.15, 0, 0];
      p.hipL = [-0.25, 0, 0.12]; p.hipR = [-0.35, 0, -0.12]; p.kneeL = [0.5, 0, 0]; p.kneeR = [0.6, 0, 0];
      p.spine = [-0.1, 0, 0]; p.head = [-0.7, 0, 0];
    } else if (o.rest) {
      p.shL = [-2.4, 0, 0.3]; p.shR = [-0.9, 0, -0.5]; p.elL = [-0.5, 0, 0]; p.elR = [-1.6, 0, 0];
      p.hipL = [-0.5, 0, 0.15]; p.hipR = [-0.5, 0, -0.15]; p.kneeL = [0.6, 0, 0]; p.kneeR = [0.6, 0, 0];
      p.spine = [0.1, 0, 0]; p.head = [-0.35, 0.3, 0];
    } else {
      p.shL = [-2.35 - s * 0.45, 0, 0.35]; p.shR = [-2.35 + s * 0.45, 0, -0.35];
      p.elL = [-0.55 - c * 0.35, 0, 0]; p.elR = [-0.55 + c * 0.35, 0, 0];
      p.hipL = [-0.85 + s * 0.4, 0, 0.18]; p.hipR = [-0.85 - s * 0.4, 0, -0.18];
      p.kneeL = [1.2 - s * 0.35, 0, 0]; p.kneeR = [1.2 + s * 0.35, 0, 0];
      p.spine = [0.18, s * 0.06, 0]; p.head = [-0.5, 0, 0];
    }
    p.w = { shL: 1, shR: 1, elL: 1, elR: 1, hipL: 1, hipR: 1, kneeL: 1, kneeR: 1, spine: 1, head: 1 };
  },
  // Gleiten: Arme an den Segelgriffen (seitlich oben), Beine gestreckt nach hinten, Körper nach vorn geneigt
  glide(p, o) {
    const roll = o.roll || 0, pitch = o.pitch || 0;
    if (o.hover) {
      p.shL = [-0.9, 0, 1.3]; p.shR = [-0.9, 0, -1.3]; p.elL = [-0.6, 0, 0]; p.elR = [-0.6, 0, 0];
      p.hipL = [-0.2, 0, 0.2]; p.hipR = [0.1, 0, -0.2]; p.kneeL = [0.5, 0, 0]; p.kneeR = [0.3, 0, 0];
      p.body = [0.15, 0, 0]; p.bodyY = 0.1; p.spine = [-0.1, 0, roll * 0.3]; p.head = [-0.2, 0, 0];
    } else {
      p.shL = [-1.1, 0, 1.55]; p.shR = [-1.1, 0, -1.55]; p.elL = [-0.35, 0, 0]; p.elR = [-0.35, 0, 0];
      p.hipL = [0.35, 0, 0.06]; p.hipR = [0.35, 0, -0.06]; p.kneeL = [0.18, 0, 0]; p.kneeR = [0.18, 0, 0];
      p.body = [0.75 + pitch * 0.35, 0, roll]; p.bodyY = 0.55; p.spine = [-0.2, 0, 0]; p.head = [-0.55, 0, 0];
    }
    p.w = { shL: 1, shR: 1, elL: 1, elR: 1, hipL: 1, hipR: 1, kneeL: 1, kneeR: 1, body: 1, bodyY: 1, spine: 1, head: 1 };
  },
  // Schwimmen: Bauchlage knapp unter der Oberfläche, Kraularme, Beinschlag
  swim(p, o) {
    const ph = o.phase || 0, s = Math.sin(ph), s2 = Math.sin(ph * 2.2);
    p.body = [1.28, 0, 0]; p.bodyY = 0.14;   // Bauchlage: Kopf knapp über, Hüfte knapp unter der Oberfläche
    p.shL = [-1.6 + s * 1.5, 0, 0.35]; p.shR = [-1.6 - s * 1.5, 0, -0.35];
    p.elL = [-0.4 + Math.max(0, s) * 0.6, 0, 0]; p.elR = [-0.4 + Math.max(0, -s) * 0.6, 0, 0];
    p.hipL = [0.12 + s2 * 0.3, 0, 0.06]; p.hipR = [0.12 - s2 * 0.3, 0, -0.06];
    p.kneeL = [0.25 + Math.max(0, s2) * 0.4, 0, 0]; p.kneeR = [0.25 + Math.max(0, -s2) * 0.4, 0, 0];
    p.spine = [-0.15, s * 0.1, 0]; p.head = [-0.85, 0, 0];
    p.w = { body: 1, bodyY: 1, shL: 1, shR: 1, elL: 1, elR: 1, hipL: 1, hipR: 1, kneeL: 1, kneeR: 1, spine: 1, head: 1 };
  },
  // Tauchen: gestreckt, Arme voraus, Delfinschlag
  dive(p, o) {
    const ph = o.phase || 0, s = Math.sin(ph);
    const vy = o.vy || 0;
    p.body = [1.35 - vy * 0.12, 0, 0]; p.bodyY = 0.1;
    p.shL = [-2.9, 0, 0.18]; p.shR = [-2.9, 0, -0.18]; p.elL = [-0.1, 0, 0]; p.elR = [-0.1, 0, 0];
    p.hipL = [0.1 + s * 0.35, 0, 0.04]; p.hipR = [0.1 + s * 0.35, 0, -0.04];
    p.kneeL = [0.2 + Math.max(0, -s) * 0.5, 0, 0]; p.kneeR = [0.2 + Math.max(0, -s) * 0.5, 0, 0];
    p.spine = [-0.1 + s * 0.08, 0, 0]; p.head = [-0.6, 0, 0];
    p.w = { body: 1, bodyY: 1, shL: 1, shR: 1, elL: 1, elR: 1, hipL: 1, hipR: 1, kneeL: 1, kneeR: 1, spine: 1, head: 1 };
  },
};

export function createPoser(humanoid) {
  const J = humanoid.joints;
  const body = J.body;
  let name = null, opts = {}, weight = 0;
  const p = {};
  const lerp = (a, b, t) => a + (b - a) * t;
  return {
    get name() { return name; },
    get weight() { return weight; },
    set(n, o) { if (n !== name) { name = n; if (n) weight = Math.min(weight, 0.25); } opts = o || {}; },
    // nach humanoid.update(dt) aufrufen
    update(dt) {
      const want = name && POSES[name] ? 1 : 0;
      weight += (want - weight) * Math.min(1, dt * (want ? 9 : 7));
      if (weight < 0.005) { weight = 0; return; }
      for (const j of JOINTS) p[j] = null;
      p.bodyY = null; p.w = {};
      const fn = POSES[name];
      if (!fn) return;
      fn(p, opts);
      for (const j of JOINTS) {
        const t = p[j]; if (!t) continue;
        const w = (p.w[j] === undefined ? 1 : p.w[j]) * weight;
        const r = J[j].rotation;
        r.set(lerp(r.x, t[0], w), lerp(r.y, t[1], w), lerp(r.z, t[2], w));
      }
      if (p.bodyY !== null && p.bodyY !== undefined) body.position.y = lerp(body.position.y, p.bodyY, (p.w.bodyY === undefined ? 1 : p.w.bodyY) * weight);
    },
  };
}
