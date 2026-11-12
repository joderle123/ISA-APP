// Seedbarer Zufall (sfc32) – pro Spielstand reproduzierbar. Kein Math.random in Systemen, die
// pro Spielstand stabil sein sollen (Koffer-Faktor, Mäxchen-Würfel, Regatta-Seeds, Spielname …).
//   const rng = createRng(seed); rng.next() → [0,1); rng.int(a,b); rng.float(a,b); rng.pick(arr);
//   rng.shuffle(arr) (Kopie); rng.chance(p); rng.fork('koffer') → eigener, ableitbarer Strom
//   hashString('text') → 32-Bit-Zahl (FNV-1a); seedFromEntropy() → frischer Seed

export function hashString(str) {
  let h = 0x811c9dc5;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function seedFromEntropy() {
  try {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint32Array(1);
      crypto.getRandomValues(a);
      return a[0] >>> 0;
    }
  } catch (e) { /* kein crypto */ }
  return (Math.floor(Math.random() * 0xffffffff) ^ (Date.now() & 0xffffffff)) >>> 0;
}

export function createRng(seed = 1) {
  const s0 = typeof seed === 'number' ? seed >>> 0 : hashString(seed);
  // sfc32 mit Aufwärmen aus einem 32-Bit-Seed
  let a = s0 ^ 0x9e3779b9, b = s0 ^ 0x243f6a88, c = s0 ^ 0xb7e15162, d = s0 | 1;
  function nextU32() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return t >>> 0;
  }
  for (let i = 0; i < 12; i++) nextU32();
  let count = 0;
  const rng = {
    seed: s0,
    get count() { return count; },
    next() { count++; return nextU32() / 4294967296; },
    float(min = 0, max = 1) { return min + rng.next() * (max - min); },
    int(min, max) { return min + Math.floor(rng.next() * (max - min + 1)); },   // inklusiv
    chance(p) { return rng.next() < p; },
    pick(arr) { return arr.length ? arr[Math.floor(rng.next() * arr.length)] : undefined; },
    shuffle(arr) {
      const out = arr.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rng.next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    // Abgeleiteter Strom: gleicher Seed + Name → immer dieselbe Folge, unabhängig von anderen Strömen
    fork(label) { return createRng((s0 ^ hashString(label)) >>> 0); },
    // Zustand für Tests: n Werte überspringen
    skip(n) { for (let i = 0; i < n; i++) nextU32(); count += n; },
  };
  return rng;
}
