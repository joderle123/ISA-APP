// Bergen (BAUPLAN §2.1 A3) – reine Logik, ohne three.js und ohne Zufall (auch in Node testbar).
//   Fundorte kommen fest aus content/bergen/*.js. Der Spielstand merkt nur, was geborgen ist (bergen.gefunden) und die
//   Materialien (bergen.material). Treibende Kisten schaukeln auf einem kleinen festen Kreis; ein Fehlversuch schiebt
//   die Kiste nur ein Stück weiter (Laufzeit, wird nicht gespeichert), sonst passiert nichts.
export const MATERIALS = ['holz', 'tau', 'tuch', 'metall'];
export const HOOK = {
  reach: 2,          // Haken-Reichweite ab Bordwand (m)
  hull: 1.25,        // halbe Rumpfbreite der Kielpost
  pull: 0.9,         // so lange Aktion halten, bis die Kiste längsseits ist (s)
  near: 9,           // bis hierhin fliegt der Haken ins Leere (Fehlwurf) und die Kiste treibt weiter
  missDrift: 2.2,    // so weit treibt eine Kiste nach einem Fehlversuch
  maxDrift: 7,       // nie weiter als das vom festen Ort weg
};

export const emptyMaterials = () => ({ holz: 0, tau: 0, tuch: 0, metall: 0 });

export function addMaterials(a, b) {
  const out = { ...emptyMaterials(), ...(a || {}) };
  for (const k of MATERIALS) out[k] = (out[k] || 0) + ((b && b[k]) || 0);
  return out;
}
export function sumMaterials(funde, ids) {
  let m = emptyMaterials();
  const set = new Set(ids || funde.map((f) => f.id));
  for (const f of funde) if (set.has(f.id)) m = addMaterials(m, f.material);
  return m;
}

// Fundorte als Liste (Kopie), in fester Reihenfolge. seed wird bewusst NICHT benutzt: gleiche Orte in jedem Spielstand.
export function fundorte(def) {
  return ((def && def.funde) || []).map((f, i) => ({ ...f, index: i, y: f.y || 0, material: { ...f.material } }));
}

// Position zur Zeit t (s). Treibend: kleiner Kreis (r 1,4 m) um den festen Ort, plus Laufzeit-Versatz nach Fehlversuchen.
export function fundPos(f, t = 0, drift = null, out = {}) {
  const dx = drift ? drift.x : 0, dz = drift ? drift.z : 0;
  if (f.kind === 'treibend') {
    const w = 0.11 + (f.index % 3) * 0.02, ph = f.index * 1.7;
    out.x = f.x + Math.sin(t * w + ph) * 1.4 + dx;
    out.z = f.z + Math.cos(t * w * 0.8 + ph) * 1.4 + dz;
    out.y = 0;
  } else { out.x = f.x + dx; out.z = f.z + dz; out.y = f.y || 0; }
  return out;
}

// Abstand ab Bordwand (≤ HOOK.reach = in Reichweite)
export const gapTo = (boat, p) => Math.hypot(p.x - boat.x, p.z - boat.z) - HOOK.hull;

// Welche Funde sind gerade erreichbar? Wrack-Funde erst, wenn die Nebelwand weg ist.
export function isOpen(f, { fogOpen = false } = {}) { return f.kind !== 'wrack' || fogOpen; }

// Nächster offener Fund zum Boot → { fund, pos, gap } | null
export function nearestFund(funde, gefunden, boat, t = 0, drifts = null, opts = {}) {
  const got = new Set(gefunden || []);
  let best = null;
  for (const f of funde) {
    if (got.has(f.id) || !isOpen(f, opts)) continue;
    const pos = fundPos(f, t, drifts && drifts[f.id]);
    const gap = gapTo(boat, pos);
    if (!best || gap < best.gap) best = { fund: f, pos, gap };
  }
  return best;
}

// Fehlversuch: Kiste treibt ein Stück vom Boot weg (nur treibende und Wrack-Kisten; die Klippe bleibt liegen)
export function missDrift(f, drift, boat, t = 0) {
  const d = drift || { x: 0, z: 0 };
  if (f.kind === 'klippe') return d;
  const p = fundPos(f, t, d);
  let dx = p.x - boat.x, dz = p.z - boat.z;
  const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
  let nx = d.x + dx * HOOK.missDrift, nz = d.z + dz * HOOK.missDrift;
  const n = Math.hypot(nx, nz);
  if (n > HOOK.maxDrift) { nx *= HOOK.maxDrift / n; nz *= HOOK.maxDrift / n; }
  return { x: nx, z: nz };
}
