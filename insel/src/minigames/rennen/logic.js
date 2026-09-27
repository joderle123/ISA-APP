// Rennen (WP36), reine Logik: Ringe/Checkpoints der Reihe nach, Zeit, Bodenkontakt-Regel (Kletterei), Ruder-Abschnitte
// (Bootsrennen: je Abschnitt ein Gefühl am Ruder) und die Aufzeichnung für den Geist der Bestzeit.
//   createRace({ checkpoints:[{x,y,z,r}], noGround, sections }) → race
//     race.start(t) · race.update(t, pos, { grounded }) → Ereignis|null ('checkpoint'|'ziel'|'boden'|'abschnitt') · race.index · race.next
//     race.progress · race.seconds · race.done · race.reset(toIndex) · race.section (aktueller Ruder-Abschnitt) · race.setRuder(emotion)
//   createSampler(interval) → { add(t, x, y, z), samples, at(t) → {x,y,z}|null, serialize(), length }
//   loadSamples(flat) → sampler   (kompakt: [t, x, y, z, …] gerundet)
export const DEFAULT_RADIUS = 2.2;

export function createRace({ checkpoints = [], noGround = false, sections = null } = {}) {
  const cps = checkpoints.map((c, i) => ({ x: c.x, y: c.y === undefined ? null : c.y, z: c.z, r: c.r || DEFAULT_RADIUS, i }));
  let index = 0, t0 = 0, tNow = 0, done = false, started = false, fails = 0, ground = 0, sectionIdx = 0, ruder = null, lastPos = null;
  const secOf = (i) => (sections ? sections.findIndex((s) => i <= (s.until === undefined ? cps.length - 1 : s.until)) : -1);
  const race = {
    checkpoints: cps,
    get index() { return index; },
    get next() { return cps[index] || null; },
    get progress() { return cps.length ? index / cps.length : 0; },
    get seconds() { return Math.max(0, tNow - t0); },
    get done() { return done; },
    get started() { return started; },
    get fails() { return fails; },
    get groundTouches() { return ground; },
    get section() { return sections && sectionIdx >= 0 ? sections[sectionIdx] : null; },
    get sectionIndex() { return sectionIdx; },
    get ruder() { return ruder; },
    start(t) { t0 = t; tNow = t; started = true; done = false; index = 0; sectionIdx = sections ? Math.max(0, secOf(0)) : -1; ruder = null; lastPos = null; },
    setRuder(emotion) { ruder = emotion || null; return ruder; },
    // Zurück auf einen Checkpoint (Bodenkontakt/Abschnitts-Neustart); zählt als Fehlschlag im Lauf
    reset(toIndex = index) { index = Math.max(0, Math.min(cps.length - 1, toIndex)); fails++; lastPos = null; return index; },
    update(t, pos, { grounded = false } = {}) {
      if (!started || done) return null;
      tNow = t;
      if (noGround && grounded && index > 0) { ground++; return 'boden'; }
      const c = cps[index];
      if (!c) return null;
      const dy = c.y === null ? 0 : (pos.y - c.y);
      const d = Math.hypot(pos.x - c.x, pos.z - c.z, dy);
      // auch beim schnellen Durchqueren treffen: Segment vom letzten Punkt prüfen (Ring nicht überspringen)
      let hit = d <= c.r;
      if (!hit && lastPos) {
        const ax = lastPos.x - c.x, az = lastPos.z - c.z, bx = pos.x - c.x, bz = pos.z - c.z;
        const vx = bx - ax, vz = bz - az, L = vx * vx + vz * vz;
        if (L > 1e-6) { const s = Math.max(0, Math.min(1, -(ax * vx + az * vz) / L)); const px = ax + vx * s, pz = az + vz * s; hit = Math.hypot(px, pz) <= c.r && Math.abs(dy) <= c.r * 1.5; }
      }
      lastPos = { x: pos.x, y: pos.y, z: pos.z };
      if (!hit) return null;
      index++;
      if (index >= cps.length) { done = true; return 'ziel'; }
      if (sections) { const s = secOf(index); if (s !== sectionIdx) { sectionIdx = s; ruder = null; return 'abschnitt'; } }
      return 'checkpoint';
    },
  };
  return race;
}

// Geist der Bestzeit: Positionen in festem Takt aufzeichnen, kompakt speichern, weich abspielen
export function createSampler(interval = 0.2) {
  const S = [];   // [{t,x,y,z}]
  const s = {
    interval, samples: S,
    get length() { return S.length; },
    add(t, x, y, z) { const last = S[S.length - 1]; if (last && t - last.t < interval - 1e-6) return false; S.push({ t: +t.toFixed(2), x: +x.toFixed(2), y: +y.toFixed(2), z: +z.toFixed(2) }); return true; },
    at(t) {
      if (!S.length) return null;
      if (t <= S[0].t) return { ...S[0], yaw: 0 };
      if (t >= S[S.length - 1].t) return { ...S[S.length - 1], yaw: 0 };
      let lo = 0, hi = S.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (S[m].t <= t) lo = m; else hi = m; }
      const a = S[lo], b = S[hi], k = (t - a.t) / Math.max(1e-6, b.t - a.t);
      return { t, x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z: a.z + (b.z - a.z) * k, yaw: Math.atan2(b.x - a.x, b.z - a.z) };
    },
    serialize() { const out = []; for (const p of S) out.push(p.t, p.x, p.y, p.z); return out; },
  };
  return s;
}
export function loadSamples(flat, interval = 0.2) {
  const s = createSampler(interval);
  if (Array.isArray(flat)) for (let i = 0; i + 3 < flat.length; i += 4) s.samples.push({ t: flat[i], x: flat[i + 1], y: flat[i + 2], z: flat[i + 3] });
  return s;
}
