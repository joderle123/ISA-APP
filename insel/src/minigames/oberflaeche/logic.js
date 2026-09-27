// Unter der Oberfläche (Kostprobe B2), reine Logik (Node-testbar): Über der Wasserlinie steht, was die Figur sagt.
// Darunter treibt eine Farbströmung, das echte Gefühl. Tippen, wenn die Farbe im Blick-Kreis ist (Zeitfenster);
// nach genug Treffern ist die Farbe klar, dann das feine Wort aus drei wählen.
//   const O = createOberflaeche({ need, window, period, duration, words:[{ t, ok? }] })
//   O.pos(t) → 0..1 (Lage der Strömung) · O.inWindow(t) · O.tap(t) → 'treffer'|'daneben'|'warte'|null · O.tick(t) → 'zeit'|null
//   O.pick(i) → 'richtig'|'falsch'|null · O.phase ('tippen'|'wort'|'fertig') · O.caught · O.misses · O.reveal (0..1) · O.result()
//   Ergebnis: { score, hits (Treffer/need), precision, caught, misses, wrong, complete, fails }
//   Wertung: nicht fertig (Zeit um) → score 0 („Später.“). Fertig → 0,6 + 0,2 · Treffsicherheit + 0,2 · Wort beim ersten Mal.
//   Doppelmodus (zwei Strömungen, zwei Regler 0–10) ist als Parameter vorgesehen (streams), gebaut ist eine Strömung.

export const DIVE = 0.7;   // nach einem Treffer taucht die Farbe kurz ab (kein Doppel-Tippen)
export const MISS_LOCK = 0.35;   // nach einem Fehltipp kurz sperren (kein Dauer-Tippen)

export function createOberflaeche({ need = 3, window = 0.1, period = 2.4, duration = 16, words = [], phase0 = 0 } = {}) {
  let phase = 'tippen';
  let caught = 0, misses = 0, wrong = 0;
  let lockUntil = -1, lastHit = -99;
  let start = null;
  const tried = new Set();
  let pickedFirst = null;

  // Strömung pendelt unter dem Wasser hin und her; in der Mitte ist der Blick-Kreis (dort ist sie am schnellsten)
  const pos = (t) => 0.5 + 0.45 * Math.sin((2 * Math.PI * t) / period + phase0);
  const diving = (t) => t - lastHit < DIVE;
  const inWindow = (t) => !diving(t) && Math.abs(pos(t) - 0.5) <= window;

  const api = {
    get phase() { return phase; },
    get caught() { return caught; },
    get misses() { return misses; },
    get wrong() { return wrong; },
    get need() { return need; },
    get reveal() { return Math.min(1, caught / need); },
    get words() { return words; },
    tried: (i) => tried.has(i),
    pos, inWindow, diving,
    timeLeft(t) { return start === null ? duration : Math.max(0, duration - (t - start)); },
    tick(t) {
      if (start === null) start = t;
      if (phase === 'tippen' && t - start >= duration) { phase = 'fertig'; return 'zeit'; }
      return null;
    },
    tap(t) {
      if (start === null) start = t;
      if (phase !== 'tippen') return null;
      if (t < lockUntil || diving(t)) return 'warte';
      if (inWindow(t)) {
        caught++; lastHit = t;
        if (caught >= need) phase = 'wort';
        return 'treffer';
      }
      misses++; lockUntil = t + MISS_LOCK;
      return 'daneben';
    },
    pick(i) {
      if (phase !== 'wort' || !words[i] || tried.has(i)) return null;
      tried.add(i);
      if (pickedFirst === null) pickedFirst = i;
      if (words[i].ok) { phase = 'fertig'; return 'richtig'; }
      wrong++;
      return 'falsch';
    },
    result() {
      const complete = caught >= need && words.some((w, i) => w.ok && tried.has(i));
      const precision = caught + misses ? caught / (caught + misses) : 0;
      const first = pickedFirst !== null && !!(words[pickedFirst] && words[pickedFirst].ok);
      const score = complete ? 0.6 + 0.2 * precision + 0.2 * (first ? 1 : 0) : 0;
      return { score: +score.toFixed(3), hits: +Math.min(1, caught / need).toFixed(3), precision: +precision.toFixed(3), caught, misses, wrong, complete, fails: misses + wrong };
    },
  };
  return api;
}

// Nächster Zeitpunkt ab t, an dem die Farbe im Blick-Kreis ist (für auto() und Tests)
export function nextWindow(O, t, step = 1 / 120, max = 30) {
  for (let x = t; x < t + max; x += step) if (O.inWindow(x)) return x;
  return null;
}
