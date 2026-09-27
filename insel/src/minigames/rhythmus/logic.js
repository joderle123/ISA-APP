// Rhythmus (WP36), reine Logik: Schläge (Böen) erzeugen und Halten/Loslassen bzw. Tippen bewerten.
//   makeBeats({ beats, interval, hold, irregular, seed, pattern, lead }) → [{ i, t, len, kind }]
//     kind: 'laut' (halten) – t = Beginn, len = Dauer; pattern 'wechsel' (Orgel laut/leise) lässt längere leise Phasen
//   createRhythm({ beats, window, input:'hold'|'tap' }) → r
//     r.press(t) · r.release(t) · r.tick(t) → [neu bewertete Schläge] · r.results · r.hits (Summe) · r.ratio · r.done(t)
//     Bewertung je Schlag: 'hit' (1), 'fast' (0,5), 'miss' (0). Halten: Beginn im Fenster und ≥ 70 % der Böe gehalten;
//     etwas zu früh/spät = 'fast'. Dauerhaltung von weit vorher zählt nicht (sonst wäre Festhalten die Lösung).
//     Tippen: ein Tipp innerhalb des Fensters um t.
import { createRng } from '../../core/rng.js';

export const DEFAULT_INTERVAL = 1.6;
export const DEFAULT_HOLD = 0.7;
export const LEAD_IN = 2.4;   // Sekunden bis zur ersten Böe

export function makeBeats({ beats = 8, interval = DEFAULT_INTERVAL, hold = DEFAULT_HOLD, irregular = false, seed = 1, pattern = 'einzeln', lead = LEAD_IN } = {}) {
  const rng = createRng(seed);
  const out = [];
  let t = lead;
  for (let i = 0; i < beats; i++) {
    const len = pattern === 'wechsel' ? hold * (irregular ? rng.float(0.8, 1.6) : 1.2) : hold * (irregular ? rng.float(0.7, 1.4) : 1);
    out.push({ i, t: +t.toFixed(3), len: +len.toFixed(3), kind: 'laut' });
    let gap = interval;
    if (irregular) gap = interval * rng.float(0.55, 1.5);
    if (pattern === 'wechsel') gap = Math.max(gap, len + hold * 0.9);   // leise-Phase mindestens so lang wie eine Böe
    t += gap;
  }
  return out;
}

export function createRhythm({ beats, window = 0.22, input = 'hold' } = {}) {
  const list = beats.slice();
  const results = new Array(list.length).fill(null);   // 'hit' | 'fast' | 'miss'
  const segs = [];    // Halte-Abschnitte [{ down, up|null }]
  const taps = [];
  let judged = 0;
  const near = window * 2;
  const rank = { miss: 0, fast: 1, hit: 2 };

  function judgeHold(b) {
    let best = 'miss';
    for (const s of segs) {
      const up = s.up === null ? Infinity : s.up;
      const covered = Math.max(0, Math.min(up, b.t + b.len) - Math.max(s.down, b.t)) / b.len;
      if (covered <= 0) continue;
      const dStart = s.down - b.t;
      let r = 'miss';
      if (Math.abs(dStart) <= window && covered >= 0.7) r = 'hit';
      else if (Math.abs(dStart) <= near && covered >= 0.45) r = 'fast';
      else if (dStart < -near && dStart >= -near * 2 && covered >= 0.7) r = 'fast';
      if (rank[r] > rank[best]) best = r;
    }
    return best;
  }
  function judgeTap(b) {
    let best = Infinity;
    for (const t of taps) best = Math.min(best, Math.abs(t - b.t));
    return best <= window ? 'hit' : best <= near ? 'fast' : 'miss';
  }
  const r = {
    beats: list, results, window, input,
    get held() { const s = segs[segs.length - 1]; return !!s && s.up === null; },
    press(t) {
      if (input === 'tap') { taps.push(t); return; }
      if (!r.held) segs.push({ down: t, up: null });
    },
    release(t) { const s = segs[segs.length - 1]; if (s && s.up === null) s.up = t; },
    // Schläge bewerten, deren Fenster vorbei ist (Ende der Böe + Toleranz)
    tick(t) {
      const fresh = [];
      while (judged < list.length) {
        const b = list[judged];
        const closeAt = b.t + (input === 'tap' ? near : b.len + near * 0.5);
        if (t < closeAt) break;
        results[judged] = input === 'tap' ? judgeTap(b) : judgeHold(b);
        fresh.push({ i: judged, result: results[judged], beat: b });
        judged++;
      }
      return fresh;
    },
    get hits() { return results.reduce((s, x) => s + (x === 'hit' ? 1 : x === 'fast' ? 0.5 : 0), 0); },
    get ratio() { return list.length ? r.hits / list.length : 0; },
    get judged() { return judged; },
    done(t) { const last = list[list.length - 1]; return !last || t > last.t + last.len + near + 0.4; },
    phase(b, t) { return t < b.t ? 'kommt' : t <= b.t + b.len ? 'aktiv' : 'vorbei'; },
  };
  return r;
}
