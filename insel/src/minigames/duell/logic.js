// Duell (WP37), reine Logik: Reflex-Konterkarten. Je Runde kommt ein Angriff (Flüsterkrähe, Wolke, Prüfungsstein) und
// drei Karten; die richtige Karte rechtzeitig tippen. Schnell = voller Treffer, spät = halber, falsch/zu spät = keiner.
//   createDuel({ rounds:[{ say, icon?, options:[{ t, ok }] }], seconds, rng, count }) → d
//     d.round (aktuell) · d.begin(t) → Runde · d.answer(t, index) → { ok, fast, late } · d.timeout(t) → true wenn abgelaufen
//     d.next() · d.done · d.hits · d.ratio · d.results
//   pickRounds(def, mode, rng) → Runden (aus def.rounds oder def.params.pool gemischt, Anzahl aus def.modes[mode].rounds)
//   shuffleOptions(round, rng) → Kopie mit gemischten Karten (die richtige Karte bleibt markiert)
export const DEFAULT_SECONDS = { entspannt: 6, abenteuer: 4, profi: 2.8 };

export function shuffleOptions(round, rng) {
  const opts = (round.options || []).map((o, i) => ({ ...o, orig: i }));
  const arr = rng && rng.shuffle ? rng.shuffle(opts) : opts.slice();
  return { ...round, options: arr };
}

export function pickRounds(def, mode = 'abenteuer', rng = null) {
  const pool = (def.rounds && def.rounds.length ? def.rounds : (def.params && def.params.pool) || []).slice();
  const want = (def.modes && def.modes[mode] && def.modes[mode].rounds) || pool.length || 5;
  const shuffled = rng && rng.shuffle ? rng.shuffle(pool) : pool;
  const out = [];
  for (let i = 0; i < want && shuffled.length; i++) out.push(shuffleOptions(shuffled[i % shuffled.length], rng));
  return out;
}

export function createDuel({ rounds = [], seconds = 4 } = {}) {
  const results = [];   // { ok, fast, late, ms }
  let k = -1, t0 = 0, open = false;
  const d = {
    rounds, results, seconds,
    get index() { return k; },
    get round() { return rounds[k] || null; },
    get open() { return open; },
    get done() { return k >= rounds.length - 1 && !open && results.length >= rounds.length; },
    get hits() { return results.reduce((s, r) => s + (r.ok ? (r.late ? 0.5 : 1) : 0), 0); },
    get ratio() { return rounds.length ? d.hits / rounds.length : 0; },
    get correct() { return results.filter((r) => r.ok).length; },
    next() { if (k + 1 >= rounds.length) return null; k++; open = false; return rounds[k]; },
    begin(t) { t0 = t; open = true; return rounds[k]; },
    remaining(t) { return Math.max(0, seconds - (t - t0)); },
    answer(t, index) {
      if (!open) return null;
      open = false;
      const r = rounds[k];
      const o = r.options[index];
      const dt = t - t0;
      const ok = !!(o && o.ok);
      const late = dt > seconds * 0.6;
      const res = { ok, fast: ok && !late, late: ok && late, ms: Math.round(dt * 1000), index };
      results.push(res);
      return res;
    },
    timeout(t) {
      if (!open || t - t0 < seconds) return false;
      open = false;
      results.push({ ok: false, fast: false, late: true, ms: Math.round(seconds * 1000), index: -1, timeout: true });
      return true;
    },
  };
  return d;
}
