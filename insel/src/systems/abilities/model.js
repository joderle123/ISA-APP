// Kräfte – reine Logik (WP35, DESIGN §5), ohne Browser.
//   BLICK_STAGES · blickStages(upgrades) → { auren, faeden, tanks, koerper, doppel, grenzen, streittiere, masken }
//   BLICK_WORDS (36 feinere Wörter, 6 je Gefühl) · wordFor(emotion, intensity, { profi, heat }) → Wort
//   KOERPER_WORDS (Profi: nur Körpersprache) · WORD_TOTAL = 36
//   STOPP_WINDOW_MS = { entspannt: 250, abenteuer: 150, profi: 100 } · createStoppSchild({ mode, lights, period })
//     → { start(), tick(dt, { moving, smiling, aiming }) → snapshot, release() → { hit, lights, done, weakened, offset },
//         phase (0..1, Treffer bei 0,5), lights, active, done }
//   bystanderEffect(count) → { heat: −15·min(n,3), courage: 0..1 }   (Zuschauer-Wende, e26)
//   mutActionFor({ upgrades, target, targetHeat, near }) → 'stopp' | 'klarklang' | 'zeichen' | null
//   sharedThreads(list) → Paare mit Gemeinsamkeit (gleiches Hauptgefühl oder gleicher leerster Tank) für die Fäden (e02)
export const BLICK_STAGES = ['auren', 'faeden', 'tanks', 'koerper', 'doppel', 'grenzen', 'streittiere', 'masken'];
export const BLICK_UPGRADE = { faeden: 'blick.faeden', tanks: 'blick.tanks', koerper: 'blick.koerper', doppel: 'blick.doppel', grenzen: 'blick.grenzen', streittiere: 'blick.streittiere', masken: 'blick.masken' };
export function blickStages(upgrades = [], abilities = []) {
  const has = (u) => (upgrades || []).includes(u);
  const blick = (abilities || []).includes('blick') || (upgrades || []).some((u) => String(u).startsWith('blick.'));
  const out = { auren: blick };
  for (const s of BLICK_STAGES.slice(1)) out[s] = blick && has(BLICK_UPGRADE[s]);
  return out;
}

// 36 feinere Wörter (Intensität 0–10 → schwach/mittel/stark, je zwei Wörter)
export const BLICK_WORDS = {
  freude: ['zufrieden', 'heiter', 'froh', 'begeistert', 'strahlend', 'überglücklich'],
  wut: ['genervt', 'gereizt', 'sauer', 'zornig', 'wütend', 'rasend'],
  angst: ['unsicher', 'nervös', 'bang', 'ängstlich', 'panisch', 'starr'],
  trauer: ['leer', 'niedergeschlagen', 'traurig', 'einsam', 'verzweifelt', 'untröstlich'],
  ekel: ['abgeneigt', 'unwohl', 'angewidert', 'abgestoßen', 'übel', 'entsetzt'],
  ueberraschung: ['verdutzt', 'neugierig', 'erstaunt', 'verblüfft', 'überwältigt', 'sprachlos'],
};
export const WORD_TOTAL = Object.values(BLICK_WORDS).reduce((n, l) => n + l.length, 0);
export const KOERPER_WORDS = { faeuste: 'Fäuste geballt', kiefer: 'Kiefer fest', schultern: 'Schultern hoch', bauch: 'Hand am Bauch', blick: 'Blick weg', offen: 'Schultern locker' };
export function wordFor(emotion, intensity = 5, { profi = false, heat = 0 } = {}) {
  if (profi) {
    if (heat > 70) return KOERPER_WORDS.faeuste;
    if (heat > 30) return KOERPER_WORDS.schultern;
    return emotion === 'trauer' || emotion === 'angst' ? KOERPER_WORDS.blick : KOERPER_WORDS.offen;
  }
  const list = BLICK_WORDS[emotion] || BLICK_WORDS.freude;
  const i = Math.max(0, Math.min(10, Number(intensity) || 0));
  const k = Math.min(list.length - 1, Math.floor((i / 10.01) * list.length));
  return list[k];
}
export function sharedThreads(list = []) {
  const pairs = [];
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = list[i], b = list[j];
    if (a.emotion && a.emotion === b.emotion) pairs.push({ a: a.id, b: b.id, what: 'gefuehl', value: a.emotion });
    else if (a.need && a.need === b.need) pairs.push({ a: a.id, b: b.id, what: 'tank', value: a.need });
  }
  return pairs;
}

// ---- Stopp-Schild (e23): 4 Lichter aus 2 Eingaben – stillstehen und zielen, Kraft halten, im Ring loslassen ----
export const STOPP_WINDOW_MS = { entspannt: 250, abenteuer: 150, profi: 100 };
export const STOPP_LIGHTS = 4;
export function createStoppSchild({ mode = 'abenteuer', lights = STOPP_LIGHTS, period = 1.6 } = {}) {
  const win = (STOPP_WINDOW_MS[mode] || STOPP_WINDOW_MS.abenteuer) / 1000;
  const s = { active: false, done: false, lights: 0, phase: 0, t: 0, holding: false, moving: false, smiling: false, aiming: true, weakened: 0, attempts: 0 };
  return {
    get state() { return { ...s }; },
    get active() { return s.active; },
    get done() { return s.done; },
    get lights() { return s.lights; },
    get phase() { return s.phase; },
    get windowSeconds() { return win; },
    start() { Object.assign(s, { active: true, done: false, lights: 0, phase: 0, t: 0, holding: false, weakened: 0, attempts: 0 }); return this.state; },
    hold() { if (s.active) s.holding = true; return this.state; },
    tick(dt, { moving = false, smiling = false, aiming = true } = {}) {
      if (!s.active || s.done) return this.state;
      s.t += dt;
      s.phase = (s.t / period) % 1;
      s.moving = !!moving; s.smiling = !!smiling; s.aiming = !!aiming;
      // Bewegung oder Lächeln schwächt: ein Licht geht aus (höchstens einmal je 0,8 s)
      if ((moving || smiling) && s.lights > 0 && s.t - (s.lastWeak || -9) > 0.8) { s.lights--; s.weakened++; s.lastWeak = s.t; }
      return this.state;
    },
    // Loslassen: Treffer, wenn die Phase im Fenster um 0,5 liegt und die Figur still steht und zielt
    release() {
      if (!s.active || s.done) return { hit: false, lights: s.lights, done: s.done, weakened: false, offset: 0 };
      s.attempts++;
      s.holding = false;
      const offset = (s.phase - 0.5) * period;   // Sekunden neben der Mitte
      const inWindow = Math.abs(offset) <= win;
      const still = !s.moving && !s.smiling && s.aiming;
      const hit = inWindow && still;
      if (hit) s.lights = Math.min(lights, s.lights + 1);
      const weakened = !hit && !still;
      if (s.lights >= lights) { s.done = true; s.active = false; }
      return { hit, lights: s.lights, done: s.done, weakened, offset: +offset.toFixed(3), inWindow, still };
    },
    cancel() { s.active = false; return this.state; },
    // Tests und Vorführung: Phase direkt setzen (0,5 = Mitte des Fensters)
    setPhase(p) { s.phase = Math.max(0, Math.min(0.999, Number(p) || 0)); s.t = s.phase * period; return this.state; },
  };
}

// ---- Teamgeist ----
export function bystanderEffect(count = 0) {
  const n = Math.max(0, Math.min(3, Math.floor(Number(count) || 0)));
  return { heat: (-15 * n) || 0, courage: n / 3, count: n };
}
// Welche Mut-Handlung passt gerade? Stopp vor Klarklang, wenn ein Gegenüber heiß ist; ohne Gegenüber ein Zeichen
export function mutActionFor({ upgrades = [], target = null, targetHeat = 0, near = false } = {}) {
  const has = (u) => (upgrades || []).includes(u);
  if (target && near && has('mut.stopp') && targetHeat >= 50) return 'stopp';
  if (target && near && has('mut.klarklang')) return 'klarklang';
  if (target && near && has('mut.stopp')) return 'stopp';
  if (has('mut.zeichen')) return 'zeichen';
  return null;
}
