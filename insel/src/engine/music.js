// Prozedurale Musik (WP20, DESIGN §11/§18): je Region ein Thema mit 4 Schichten, die vom Grauschleier abhängen
// (grau = 1 Schicht, gedämpft · frei = alle 4, offen), Puls färbt Filter und Tempo leicht, 6 Vogel-Leitmotive,
// Klangmuschel mit exakter Dauer, Brandungsorgel, Klarklang-Akkorde (konsonant/dissonant), Jukebox-Loops.
// Alles synthetisch über audio.helpers/WebAudio; Schichtwechsel laufen über setTargetAtTime (kein Knacken).
//
//   const music = createMusic({ audio, events, rng });   music.update() jedes Bild (plant ~0,35 s voraus)
//   music.start() / stop() · setRegion('strand') · setVeil(0..1) · setPuls(0..100) · setEnabled(v) · setIntensity(0..1)
//   music.motif('freude'|'wut'|'angst'|'trauer'|'ekel'|'ueberraschung'|'welle')   Leitmotiv, auf den nächsten Schlag
//   music.klangmuschel(seconds, { note? }) → { start, end, seconds }   Ton endet exakt (Ereignis music:klangmuschel)
//   music.orgel.start() / setLevel(0..1) / pulse(v) / stop()             Brandungsorgel (laut/leise)
//   music.klarklang('konsonant'|'dissonant'|[0,4,7,12]) → { intervals, consonant }
//   music.jukebox.play('runter'|'auf') / stop() / current / loops
//   music.state → { theme, region, veil, puls, layers:[…], jukebox, enabled }
// Reine Helfer (Node-Tests): SCALES, THEMES, MOTIFS, KLARKLANG, layerMix(veil), isConsonant(intervals), patternFor(themeId, layer, bar),
//   midiToFreq, chordDegrees(theme, bar), tempoFactor(puls), cutoffFor(veil, puls)
import { createRng, hashString } from '../core/rng.js';

export const SCALES = {
  pentaMajor: [0, 2, 4, 7, 9], pentaMinor: [0, 3, 5, 7, 10],
  ionian: [0, 2, 4, 5, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10], phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11], mixolydian: [0, 2, 4, 5, 7, 9, 10], aeolian: [0, 2, 3, 5, 7, 8, 10],
};
export const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Schicht: inst (Instrument), role (pad|drone|bass|rhythm|melody|arp|sparkle|perc), gain (Grundpegel), oct (Oktave), density (Notenhäufigkeit)
export const THEMES = {
  hafen: { name: 'Hafen: Glocken und Pads', root: 62, scale: 'pentaMajor', bpm: 84, prog: [0, 3, 4, 0],
    layers: [{ inst: 'pad', role: 'pad', gain: 0.9, oct: 0 }, { inst: 'holz', role: 'rhythm', gain: 0.55 }, { inst: 'glocken', role: 'melody', gain: 0.8, oct: 0, density: 0.45 }, { inst: 'glitzer', role: 'sparkle', gain: 0.6, oct: 1, density: 0.14 }] },
  strand: { name: 'Strand: Marimba', root: 65, scale: 'pentaMajor', bpm: 98, prog: [0, 4, 3, 0],
    layers: [{ inst: 'marimba', role: 'arp', gain: 0.8, oct: 0, every: 2 }, { inst: 'bass', role: 'bass', gain: 0.7, oct: -1 }, { inst: 'steeldrum', role: 'melody', gain: 0.7, oct: 0, density: 0.5 }, { inst: 'chor', role: 'pad', gain: 0.55, oct: 0 }] },
  dschungel: { name: 'Dschungel: Trommeln', root: 57, scale: 'dorian', bpm: 106, prog: [0, 3, 0, 4],
    layers: [{ inst: 'drone', role: 'drone', gain: 0.8, oct: -1 }, { inst: 'trommeln', role: 'perc', gain: 0.85, pattern: 'groove' }, { inst: 'floete', role: 'melody', gain: 0.65, oct: 0, density: 0.55 }, { inst: 'voegel', role: 'sparkle', gain: 0.5, oct: 0, density: 0.1 }] },
  klippen: { name: 'Klippen: tiefe Streicher', root: 55, scale: 'aeolian', bpm: 72, prog: [0, 5, 3, 4],
    layers: [{ inst: 'streicherTief', role: 'drone', gain: 0.85, oct: -1 }, { inst: 'cello', role: 'arp', gain: 0.6, oct: 0, every: 2 }, { inst: 'pauke', role: 'perc', gain: 0.7, pattern: 'sturm' }, { inst: 'violinen', role: 'melody', gain: 0.5, oct: 0, density: 0.35 }] },
  moor: { name: 'Moor: Flöte und Drone', root: 52, scale: 'aeolian', bpm: 66, prog: [0, 2, 0, 5],
    layers: [{ inst: 'drone', role: 'drone', gain: 0.8, oct: -1 }, { inst: 'floete', role: 'melody', gain: 0.6, oct: 0, density: 0.35 }, { inst: 'zupf', role: 'sparkle', gain: 0.55, oct: 0, density: 0.2 }, { inst: 'fluestern', role: 'sparkle', gain: 0.5, oct: 0, density: 0.12 }] },
  markt: { name: 'Markt: gezupfte Saiten', root: 60, scale: 'mixolydian', bpm: 112, prog: [0, 6, 3, 4],
    layers: [{ inst: 'gitarre', role: 'arp', gain: 0.75, oct: 0, every: 1 }, { inst: 'handperc', role: 'perc', gain: 0.7, pattern: 'markt' }, { inst: 'melodie', role: 'melody', gain: 0.65, oct: 0, density: 0.5 }, { inst: 'tamburin', role: 'rhythm', gain: 0.5 }] },
  vulkan: { name: 'Vulkan: Bass und Handtrommeln', root: 50, scale: 'phrygian', bpm: 92, prog: [0, 1, 0, 4],
    layers: [{ inst: 'bass', role: 'bass', gain: 0.9, oct: 0 }, { inst: 'handtrommeln', role: 'perc', gain: 0.8, pattern: 'vulkan' }, { inst: 'chor', role: 'pad', gain: 0.6, oct: 0 }, { inst: 'glut', role: 'sparkle', gain: 0.6, oct: 0, density: 0.25 }] },
  glimmer: { name: 'Glimmerwolke: Arpeggios', root: 64, scale: 'lydian', bpm: 120, prog: [0, 4, 5, 3],
    layers: [{ inst: 'arp', role: 'arp', gain: 0.7, oct: 0, every: 1 }, { inst: 'sub', role: 'bass', gain: 0.8, oct: -2 }, { inst: 'pad', role: 'pad', gain: 0.7, oct: 0 }, { inst: 'glitch', role: 'rhythm', gain: 0.45 }] },
  quellen: { name: 'Quellental: leise Glocken', root: 67, scale: 'pentaMajor', bpm: 76, prog: [0, 3, 0, 4],
    layers: [{ inst: 'glockenLeise', role: 'arp', gain: 0.7, oct: 0, every: 4 }, { inst: 'pad', role: 'pad', gain: 0.7, oct: 0 }, { inst: 'tropfen', role: 'sparkle', gain: 0.6, oct: 0, density: 0.2 }, { inst: 'floeteSanft', role: 'melody', gain: 0.5, oct: -1, density: 0.3 }] },
  leuchtturm: { name: 'Leuchtturm: alle zusammen', root: 60, scale: 'ionian', bpm: 88, prog: [0, 5, 3, 4],
    layers: [{ inst: 'pad', role: 'pad', gain: 0.9, oct: 0 }, { inst: 'glocken', role: 'melody', gain: 0.7, oct: 0, density: 0.45 }, { inst: 'streicherTief', role: 'drone', gain: 0.6, oct: -1 }, { inst: 'arp', role: 'arp', gain: 0.5, oct: 0, every: 2 }] },
  // Jukebox (Playlist „Runter/Auf“, DESIGN §7) – unabhängig vom Schleier, alle Schichten offen
  'jukebox-runter': { name: 'Playlist Runter', root: 57, scale: 'pentaMinor', bpm: 70, prog: [0, 3, 0, 2], jukebox: true,
    layers: [{ inst: 'pad', role: 'pad', gain: 0.8, oct: 0 }, { inst: 'sub', role: 'bass', gain: 0.6, oct: -1 }, { inst: 'zupf', role: 'melody', gain: 0.5, oct: 0, density: 0.3 }, { inst: 'holz', role: 'rhythm', gain: 0.3 }] },
  'jukebox-auf': { name: 'Playlist Auf', root: 62, scale: 'mixolydian', bpm: 128, prog: [0, 3, 4, 0], jukebox: true,
    layers: [{ inst: 'arp', role: 'arp', gain: 0.7, oct: 0, every: 1 }, { inst: 'trommeln', role: 'perc', gain: 0.85, pattern: 'groove' }, { inst: 'bass', role: 'bass', gain: 0.8, oct: -1 }, { inst: 'steeldrum', role: 'melody', gain: 0.6, oct: 0, density: 0.5 }] },
};
export const REGION_THEMES = Object.keys(THEMES).filter((k) => !THEMES[k].jukebox);

// 6 Vogel-Leitmotive (DESIGN §12 e07) + Farbwelle. Halbtöne relativ zur Themen-Grundnote, Dauer in Schlägen
export const MOTIFS = {
  freude: { inst: 'glocken', notes: [0, 4, 7, 12, 16], durs: [0.5, 0.5, 0.5, 0.5, 1.5], oct: 1, vel: 0.9 },          // Sonnensegler: aufsteigend, hell
  wut: { inst: 'horn', notes: [7, 5, 0], durs: [0.5, 0.5, 1.2], oct: 0, vel: 0.9 },                                    // Glutfalke: drei harte Stöße abwärts
  angst: { inst: 'floete', notes: [12, 13, 12, 13, 12], durs: [0.25, 0.25, 0.25, 0.25, 1], oct: 1, vel: 0.7 },         // Wachkranich: zitterndes Halbtonpaar
  trauer: { inst: 'cello', notes: [7, 5, 3, 0], durs: [1, 1, 1, 2], oct: 0, vel: 0.8 },                                // Tiefentaucher: langsam hinab
  ekel: { inst: 'nasal', notes: [6, 5, 6, 4], durs: [0.5, 0.5, 0.5, 1], oct: 0, vel: 0.7 },                            // Grünwürger: schiefer Rutscher
  ueberraschung: { inst: 'glitzer', notes: [0, 12, 19], durs: [0.25, 0.25, 1], oct: 2, vel: 0.9 },                     // Blitzkolibri: schneller Sprung
  welle: { inst: 'glocken', notes: [0, 7, 12, 16, 19, 24], durs: [0.5, 0.5, 0.5, 0.5, 0.5, 2], oct: 1, vel: 1 },        // Farbwelle
};
// Klarklang (e21): 4 Töne = Gefühl, Kamera, Grund, Wunsch. Konsonant trägt, Dornen (kleine Sekunde, Tritonus) klingen schief
export const KLARKLANG = { konsonant: [0, 4, 7, 12], dissonant: [0, 1, 6, 11], dur: [0, 3, 7, 12], sus: [0, 5, 7, 12] };
export function isConsonant(intervals) {
  const n = intervals.map((v) => ((v % 12) + 12) % 12);
  for (let i = 0; i < n.length; i++) for (let j = i + 1; j < n.length; j++) {
    const d = Math.abs(n[i] - n[j]) % 12;
    if (d === 1 || d === 11 || d === 6) return false;
  }
  return true;
}

// Schichten je Schleier: grau (1) → nur Schicht 0; frei (0) → alle vier, weich gestaffelt
const smooth = (x, a, b) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
export function layerMix(veil) {
  const f = 1 - Math.max(0, Math.min(1, veil));
  return [1, smooth(f, 0.12, 0.42), smooth(f, 0.38, 0.68), smooth(f, 0.66, 0.96)];
}
export const tempoFactor = (puls) => 1 + 0.06 * Math.max(0, Math.min(100, puls || 0)) / 100;
// Tiefpass: grau = gedämpft (900 Hz), frei = offen (9 kHz); hoher Puls nimmt oben etwas weg
export const cutoffFor = (veil, puls) => (900 + (9000 - 900) * Math.pow(1 - Math.max(0, Math.min(1, veil)), 1.4)) * (1 - 0.22 * Math.max(0, Math.min(100, puls || 0)) / 100);

export function chordDegrees(theme, bar) {
  const prog = theme.prog || [0];
  const deg = prog[bar % prog.length];
  return [deg, deg + 2, deg + 4];
}
const degToMidi = (theme, deg, oct = 0) => {
  const sc = SCALES[theme.scale];
  const o = Math.floor(deg / sc.length);
  const i = ((deg % sc.length) + sc.length) % sc.length;
  return theme.root + sc[i] + (o + oct) * 12;
};

const PERC = {   // 16 Schritte: k = Kick, t = Tom, s = Shaker, h = Hand, . = Pause
  groove: 'k.s.t.s.k.s.tks.', sturm: 'k.......k...k...', markt: 'h.s.hs.h.s.hh.s.', vulkan: 'k..h..k.hk..h.h.',
};
// Muster einer Schicht für einen Takt (deterministisch: Thema + Takt). Rückgabe [{ step, midi, dur (Schritte), vel, kind }]
export function patternFor(themeId, layerIdx, bar) {
  const theme = THEMES[themeId];
  if (!theme) return [];
  const L = theme.layers[layerIdx];
  if (!L) return [];
  const rng = createRng(hashString(`${themeId}:${layerIdx}:${bar % 8}`));   // Phrasen wiederholen sich alle 8 Takte
  const chord = chordDegrees(theme, bar);
  const out = [];
  const oct = L.oct || 0;
  switch (L.role) {
    case 'pad': case 'drone':
      chord.forEach((d, i) => { if (L.role === 'pad' || i < 2) out.push({ step: 0, midi: degToMidi(theme, d, oct), dur: 16.5, vel: 1, kind: 'sustain' }); });
      break;
    case 'bass':
      out.push({ step: 0, midi: degToMidi(theme, chord[0], oct), dur: 6, vel: 1 });
      out.push({ step: 8, midi: degToMidi(theme, chord[0], oct), dur: 4, vel: 0.85 });
      if (rng.chance(0.5)) out.push({ step: 14, midi: degToMidi(theme, chord[2], oct - (chord[2] > 4 ? 1 : 0)), dur: 2, vel: 0.7 });
      break;
    case 'arp': {
      const every = L.every || 2;
      const n = SCALES[theme.scale].length;
      const notes = [chord[0], chord[1], chord[2], chord[0] + n].map((d) => degToMidi(theme, d, oct));
      const up = rng.chance(0.5);
      for (let s = 0, i = 0; s < 16; s += every, i++) { const k = up ? i % notes.length : (notes.length - 1 - (i % notes.length)); out.push({ step: s, midi: notes[k], dur: every * 0.9, vel: s % 4 === 0 ? 1 : 0.75 }); }
      break;
    }
    case 'melody': {
      const n = SCALES[theme.scale].length;                 // Melodie in der Oktave über der Grundnote
      let deg = n + rng.int(0, 3);
      for (let s = 0; s < 16;) {
        if (rng.chance(L.density || 0.4)) {
          const dur = rng.pick([1, 2, 2, 3, 4]);
          if (s % 4 === 0 && rng.chance(0.6)) deg = n + (chord[rng.int(0, 2)] % n);   // starke Zählzeit → Akkordton
          else deg += rng.int(-2, 2);
          deg = Math.max(n - 2, Math.min(2 * n - 1, deg));
          out.push({ step: s, midi: degToMidi(theme, deg, oct), dur: dur * 0.95, vel: 0.7 + rng.next() * 0.3 });
          s += dur;
        } else s += 1;
      }
      break;
    }
    case 'sparkle': {
      const n = SCALES[theme.scale].length;
      for (let s = 0; s < 16; s++) if (rng.chance(L.density || 0.12)) out.push({ step: s, midi: degToMidi(theme, (chord[rng.int(0, 2)] % n) + n * rng.int(0, 1), oct), dur: 1, vel: 0.5 + rng.next() * 0.5 });
      break;
    }
    case 'rhythm':
      for (let s = 2; s < 16; s += 4) out.push({ step: s, midi: 0, dur: 1, vel: 0.8, kind: 'hit' });
      if (rng.chance(0.4)) out.push({ step: 15, midi: 0, dur: 1, vel: 0.5, kind: 'hit' });
      break;
    case 'perc': {
      const p = PERC[L.pattern] || PERC.groove;
      for (let s = 0; s < 16; s++) { const c = p[s]; if (c && c !== '.') out.push({ step: s, midi: 0, dur: 1, vel: s % 8 === 0 ? 1 : 0.75, kind: c }); }
      if (rng.chance(0.25)) out.push({ step: 14, midi: 0, dur: 1, vel: 0.5, kind: 't' });
      break;
    }
    default: break;
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
export function createMusic({ audio, events = null, rng = null } = {}) {
  const emit = (n, p) => { if (events) events.emit(n, p); };
  const st = { region: null, veil: 1, puls: 0, enabled: true, intensity: 1, started: false, jukebox: null };
  let ctx = null, out = null, filt = null, motifBus = null;
  let insts = [];               // laufende Thema-Instanzen (max. 2 während der Überblendung)
  let muschel = null;           // aktive Klangmuschel
  let orgelState = null;
  const LOOKAHEAD = 0.35;

  function ensureGraph() {
    if (out) return true;
    if (!audio || !audio.ready || !audio.buses) return false;
    ctx = audio.context;
    filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = cutoffFor(st.veil, st.puls); filt.Q.value = 0.6;
    out = ctx.createGain(); out.gain.value = 1;
    filt.connect(out); out.connect(audio.buses.music);
    motifBus = ctx.createGain(); motifBus.gain.value = 0.9; motifBus.connect(audio.buses.music);
    return true;
  }

  // ---- Instrumente: vel ist der Spitzenpegel (0..1 → intern skaliert, damit 4 Schichten unter der Decke bleiben) ----
  const V = 0.085;   // Grundpegel einer Stimme
  function osc(type, freq, t, detune = 0) { const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t); if (detune) o.detune.value = detune; return o; }
  function gainEnv(t, a, peak, d, sus, hold, r) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(Math.max(0.0002, peak), t + a);
    if (d > 0) g.gain.setTargetAtTime(Math.max(0.0001, peak * sus), t + a, d / 3);
    const end = t + a + Math.max(0, hold);
    g.gain.setTargetAtTime(0.0001, end, Math.max(0.01, r / 4));
    return { g, stopAt: end + r + 0.15 };
  }
  function lp(freq, q = 0.7) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq; f.Q.value = q; return f; }
  function noise(t, dur, ftype, freq, q, peak, dest) {
    const s = audio.helpers.noise(); const f = ctx.createBiquadFilter(); f.type = ftype; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.004 + dur);
    s.connect(f); f.connect(g); g.connect(dest); s.start(t); s.stop(t + dur + 0.06);
    return { s, f, g };
  }
  function vibrato(o, t, rate = 5, cents = 6, delay = 0.12) {
    const l = ctx.createOscillator(); l.frequency.value = rate; const lg = ctx.createGain(); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(cents, t + delay + 0.3);
    l.connect(lg); lg.connect(o.detune); l.start(t); return l;
  }
  // Generische Stimme: p = { types, mult, det, a, d, sus, r, lp, lpQ, sweep, vib, sub }
  function voice(dest, t, freq, dur, vel, p) {
    const { g, stopAt } = gainEnv(t, p.a, V * vel, p.d || 0, p.sus === undefined ? 1 : p.sus, Math.max(0, dur - p.a), p.r);
    let node = g;
    if (p.lp) { const f = lp(p.lp, p.lpQ || 0.7); if (p.sweep) { f.frequency.setValueAtTime(p.lp, t); f.frequency.exponentialRampToValueAtTime(p.sweep[0], t + p.sweep[1]); } f.connect(g); node = f; }
    const oscs = [];
    (p.types || ['sine']).forEach((type, i) => {
      const m = (p.mult && p.mult[i]) || 1;
      const o = osc(type, freq * m, t, (p.det && p.det[i]) || 0);
      const og = ctx.createGain(); og.gain.value = (p.mix && p.mix[i]) !== undefined ? p.mix[i] : 1;
      if (p.glide) o.frequency.exponentialRampToValueAtTime(freq * m * p.glide[0], t + p.glide[1]);
      o.connect(og); og.connect(node); o.start(t); o.stop(stopAt); oscs.push(o);
      if (p.vib && i === 0) { const l = vibrato(o, t, p.vib[0], p.vib[1]); l.stop(stopAt); }
    });
    g.connect(dest);
    return { g, oscs, stopAt };
  }
  const INST = {
    pad: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.55, { types: ['sawtooth', 'sawtooth', 'sine'], det: [-7, 7, 0], mix: [0.5, 0.5, 0.7], a: 0.7, r: 1.1, lp: 1100 }),
    drone: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.6, { types: ['sawtooth', 'triangle'], mult: [1, 0.5], mix: [0.5, 0.9], a: 1.4, r: 1.6, lp: 520 }),
    chor: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.5, { types: ['triangle', 'triangle', 'triangle'], det: [-9, 0, 9], mix: [0.6, 0.7, 0.6], a: 0.5, r: 0.9, lp: 1600, lpQ: 2.2, vib: [4.5, 5] }),
    streicherTief: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.6, { types: ['sawtooth', 'sawtooth'], det: [-5, 5], mix: [0.6, 0.6], a: 0.6, r: 1.2, lp: 700, vib: [4, 4] }),
    cello: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.7, { types: ['sawtooth', 'sine'], mix: [0.6, 0.6], a: 0.12, d: 0.6, sus: 0.7, r: 0.5, lp: 1300, vib: [5, 7] }),
    violinen: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.45, { types: ['sawtooth', 'sawtooth'], det: [-6, 6], mix: [0.5, 0.5], a: 0.25, r: 0.6, lp: 2600, vib: [5.5, 9] }),
    glocken: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.9, { types: ['sine', 'sine', 'sine'], mult: [1, 2.76, 5.4], mix: [1, 0.35, 0.12], a: 0.005, r: 1.8 }),
    glockenLeise: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.55, { types: ['sine', 'sine'], mult: [1, 2.76], mix: [1, 0.25], a: 0.01, r: 2.2 }),
    glitzer: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.6, { types: ['sine', 'triangle'], mult: [1, 1], mix: [1, 0.3], a: 0.004, r: 0.7 }),
    marimba: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.9, { types: ['sine', 'sine'], mult: [1, 4], mix: [1, 0.25], a: 0.004, r: 0.45 }),
    steeldrum: (d, t, f, dur, v) => voice(d, t, f, 0.05, v * 0.7, { types: ['sine', 'sine', 'sine'], mult: [1, 2.01, 3.03], mix: [1, 0.45, 0.2], a: 0.006, r: 0.8, vib: [6, 4] }),
    bass: (d, t, f, dur, v) => voice(d, t, f, Math.min(dur, 0.5), v * 1.1, { types: ['sawtooth', 'sine'], mix: [0.5, 0.9], a: 0.01, d: 0.3, sus: 0.6, r: 0.25, lp: 380 }),
    sub: (d, t, f, dur, v) => voice(d, t, f, Math.min(dur, 0.6), v * 1.2, { types: ['sine'], a: 0.02, r: 0.3 }),
    floete: (d, t, f, dur, v) => { const r = voice(d, t, f, dur, v * 0.7, { types: ['sine', 'triangle'], mix: [1, 0.3], a: 0.08, r: 0.25, lp: 3000, vib: [5.2, 8] }); noise(t, 0.08, 'bandpass', f * 2, 3, V * v * 0.08, d); return r; },
    floeteSanft: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.5, { types: ['sine', 'triangle'], mix: [1, 0.2], a: 0.15, r: 0.4, lp: 2200, vib: [4.8, 6] }),
    zupf: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.8, { types: ['triangle', 'sawtooth'], mix: [1, 0.25], a: 0.003, r: 0.55, lp: 3200, sweep: [500, 0.18] }),
    gitarre: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.85, { types: ['triangle', 'triangle'], det: [-4, 4], mix: [0.8, 0.8], a: 0.003, r: 0.6, lp: 2800, sweep: [700, 0.22] }),
    melodie: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.6, { types: ['square', 'sine'], mix: [0.25, 1], a: 0.02, r: 0.2, lp: 2400 }),
    arp: (d, t, f, dur, v) => voice(d, t, f, 0.03, v * 0.6, { types: ['square', 'sawtooth'], mix: [0.5, 0.35], a: 0.003, r: 0.16, lp: 3000, sweep: [900, 0.12] }),
    horn: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.75, { types: ['sawtooth', 'square'], mix: [0.6, 0.35], a: 0.06, r: 0.35, lp: 1500, lpQ: 1.5 }),
    nasal: (d, t, f, dur, v) => voice(d, t, f, dur, v * 0.55, { types: ['square'], a: 0.03, r: 0.2, lp: 1800, lpQ: 4, glide: [0.94, 0.3] }),
    tropfen: (d, t, f, dur, v) => voice(d, t, f, 0.02, v * 0.6, { types: ['sine'], a: 0.004, r: 0.28, glide: [1.9, 0.05] }),
    fluestern: (d, t, f, dur, v) => noise(t, 0.7, 'bandpass', 1400 + f * 0.5, 3, V * v * 0.35, d),
    glut: (d, t, f, dur, v) => noise(t, 0.02 + Math.random() * 0.03, 'highpass', 3000 + Math.random() * 3000, 1, V * v * 0.5, d),
    voegel: (d, t, f, dur, v) => { const r = voice(d, t, f * 2, 0.06, v * 0.5, { types: ['sine'], a: 0.01, r: 0.12, glide: [1.3, 0.06] }); voice(d, t + 0.11, f * 2.2, 0.06, v * 0.4, { types: ['sine'], a: 0.01, r: 0.1, glide: [1.25, 0.05] }); return r; },
    holz: (d, t, f, dur, v) => { noise(t, 0.05, 'bandpass', 2300, 5, V * v * 0.7, d); voice(d, t, 820, 0.01, v * 0.35, { types: ['sine'], a: 0.002, r: 0.06 }); },
    tamburin: (d, t, f, dur, v) => { for (let i = 0; i < 3; i++) noise(t + i * 0.025, 0.04, 'highpass', 5000, 1, V * v * 0.4, d); },
    glitch: (d, t, f, dur, v) => noise(t, 0.008, 'highpass', 2500, 2, V * v * 0.8, d),
    handperc: (d, t, f, dur, v) => { noise(t, 0.07, 'bandpass', 900, 2, V * v * 0.8, d); voice(d, t, 190, 0.01, v * 0.6, { types: ['sine'], a: 0.002, r: 0.1, glide: [0.5, 0.08] }); },
    handtrommeln: (d, t, f, dur, v) => { noise(t, 0.09, 'bandpass', 420, 1.5, V * v * 0.9, d); voice(d, t, 150, 0.01, v * 0.9, { types: ['sine'], a: 0.002, r: 0.16, glide: [0.5, 0.1] }); },
    pauke: (d, t, f, dur, v) => { voice(d, t, 82, 0.02, v * 1.3, { types: ['sine'], a: 0.004, r: 0.7, glide: [0.75, 0.3] }); noise(t, 0.06, 'lowpass', 400, 0.7, V * v * 0.5, d); },
    trommeln: null,   // Schlagzeug: kind k/t/s (siehe percHit)
  };
  function percHit(dest, t, kind, vel) {
    if (kind === 'k') { voice(dest, t, 125, 0.01, vel * 1.2, { types: ['sine'], a: 0.002, r: 0.22, glide: [0.36, 0.09] }); noise(t, 0.03, 'lowpass', 900, 0.7, V * vel * 0.5, dest); }
    else if (kind === 't') { voice(dest, t, 210, 0.01, vel * 0.9, { types: ['sine'], a: 0.002, r: 0.28, glide: [0.55, 0.18] }); noise(t, 0.05, 'bandpass', 700, 1.5, V * vel * 0.4, dest); }
    else if (kind === 's') noise(t, 0.04, 'highpass', 6000, 0.8, V * vel * 0.45, dest);
    else if (kind === 'h') { noise(t, 0.06, 'bandpass', 800, 2, V * vel * 0.8, dest); voice(dest, t, 170, 0.01, vel * 0.5, { types: ['sine'], a: 0.002, r: 0.1, glide: [0.5, 0.08] }); }
  }
  function playNote(layer, dest, t, note, stepDur) {
    const dur = note.dur * stepDur;
    const vel = note.vel * st.intensity;
    if (note.kind === 'hit') { if (INST[layer.inst]) INST[layer.inst](dest, t, 0, dur, vel); return; }   // Rhythmus-Schicht (Holz, Tamburin, Glitch)
    if (note.kind && note.kind.length === 1 && note.midi === 0) { percHit(dest, t, note.kind, vel); return; }   // Schlagzeug k/t/s/h
    const fn = INST[layer.inst];
    if (!fn) return;
    fn(dest, t, midiToFreq(note.midi), dur, vel);
  }

  // ---- Thema-Instanzen und Planung ----
  function stepDurOf(inst) { return (60 / inst.def.bpm / 4) / tempoFactor(st.puls); }
  function createInstance(id) {
    const def = THEMES[id];
    const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(filt);
    const layers = def.layers.map((L) => { const lg = ctx.createGain(); lg.gain.value = 0.0001; lg.connect(g); return lg; });
    const inst = { id, def, out: g, layers, bar: 0, step: 0, nextTime: ctx.currentTime + 0.08, fading: false, fadeEnd: 0 };
    applyMix(inst, true);
    return inst;
  }
  function applyMix(inst, immediate = false) {
    const mix = inst.def.jukebox ? [1, 1, 1, 1] : layerMix(st.veil);
    const t = ctx.currentTime;
    inst.layers.forEach((lg, i) => {
      const target = Math.max(0.0001, (inst.def.layers[i].gain || 1) * mix[i] * (st.enabled ? 1 : 0));
      if (immediate) lg.gain.setValueAtTime(target, t); else lg.gain.setTargetAtTime(target, t, 0.7);
    });
  }
  function schedule(inst, until) {
    const now = ctx.currentTime;
    // Nach Hintergrund/Tab-Wechsel nicht alles nachholen (das würde laut): sauber am Takt neu aufsetzen
    if (inst.nextTime < now - 0.25) { inst.nextTime = now + 0.05; inst.step = 0; inst.bar++; }
    let guard = 64;
    while (inst.nextTime < until && guard-- > 0) {
      const sd = stepDurOf(inst);
      if (inst.step === 0) inst.patterns = inst.def.layers.map((_, i) => patternFor(inst.id, i, inst.bar));
      inst.patterns.forEach((pat, li) => {
        for (const n of pat) if (n.step === inst.step) playNote(inst.def.layers[li], inst.layers[li], inst.nextTime, n, sd);
      });
      inst.step++;
      if (inst.step >= 16) { inst.step = 0; inst.bar++; }
      inst.nextTime += sd;
    }
  }
  function currentId() { return st.jukebox ? 'jukebox-' + st.jukebox : st.region; }
  function switchTo(id) {
    if (!ensureGraph()) return;
    const t = ctx.currentTime;
    const cur = insts.find((i) => !i.fading);
    if (cur && cur.id === id) return;
    if (cur) { cur.fading = true; cur.fadeEnd = t + 3.2; cur.out.gain.cancelScheduledValues(t); cur.out.gain.setValueAtTime(Math.max(0.0001, cur.out.gain.value), t); cur.out.gain.setTargetAtTime(0.0001, t, 0.7); }
    if (id && THEMES[id]) {
      const inst = createInstance(id);
      inst.out.gain.setTargetAtTime(1, t + 0.05, 1.1);
      insts.push(inst);
      emit('music:theme', { id, prev: cur ? cur.id : null, name: THEMES[id].name });
    }
  }
  function nextBeat() {
    const cur = insts.find((i) => !i.fading);
    if (!cur) return ctx.currentTime + 0.05;
    const sd = stepDurOf(cur);
    const beat = sd * 2;   // Achtel-Raster
    const t = cur.nextTime - sd * cur.step;   // Taktanfang
    const now = ctx.currentTime + 0.03;
    return t + Math.ceil((now - t) / beat) * beat;
  }

  // ---- Motive, Muschel, Orgel, Klarklang ----
  function motif(id, { at } = {}) {
    if (!st.enabled || !ensureGraph() || !MOTIFS[id]) return null;
    const m = MOTIFS[id];
    const cur = insts.find((i) => !i.fading);
    const root = (cur ? cur.def.root : 62) + (m.oct || 0) * 12;
    const beat = cur ? stepDurOf(cur) * 4 : 0.6;
    let t = at || nextBeat();
    const t0 = t;
    m.notes.forEach((n, i) => { const dur = m.durs[i] * beat; INST[m.inst](motifBus, t, midiToFreq(root + n), dur, m.vel * 0.9); t += dur; });
    emit('music:motif', { id, start: t0, end: t });
    return { id, start: t0, end: t };
  }
  function klangmuschel(seconds = 3, { note = null, vel = 0.9 } = {}) {
    if (!ensureGraph()) return null;
    const s = Math.max(0.2, seconds);
    const cur = insts.find((i) => !i.fading);
    const midi = note !== null ? note : (cur ? cur.def.root : 62) + 7 + 12;
    const t = ctx.currentTime + 0.02;
    const end = t + s;
    const f = midiToFreq(midi);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(V * vel, t + 0.06);
    g.gain.setValueAtTime(V * vel, Math.max(t + 0.06, end - 0.05));
    g.gain.linearRampToValueAtTime(0.0001, end);            // endet exakt bei end
    g.connect(motifBus);
    const oscs = [['sine', 1, 1], ['sine', 2, 0.25], ['triangle', 3.01, 0.08]].map(([type, m, mix]) => { const o = osc(type, f * m, t); const og = ctx.createGain(); og.gain.value = mix; o.connect(og); og.connect(g); o.start(t); o.stop(end + 0.01); return o; });
    vibrato(oscs[0], t, 4.6, 4, 0.3).stop(end + 0.01);
    const shimmer = noise(t, s, 'bandpass', f * 4, 12, V * vel * 0.12, motifBus);
    shimmer.g.gain.cancelScheduledValues(t); shimmer.g.gain.setValueAtTime(0.0001, t); shimmer.g.gain.linearRampToValueAtTime(V * vel * 0.12, t + 0.2); shimmer.g.gain.setValueAtTime(V * vel * 0.12, end - 0.1); shimmer.g.gain.linearRampToValueAtTime(0.0001, end);
    muschel = { start: t, end, seconds: s, midi };
    emit('music:klangmuschel', muschel);
    return muschel;
  }
  const orgel = {
    get active() { return !!orgelState; },
    start({ root = null } = {}) {
      if (!ensureGraph()) return false;
      if (orgelState) return true;
      const cur = insts.find((i) => !i.fading);
      const base = root !== null ? root : (cur ? cur.def.root : 60) - 12;
      const t = ctx.currentTime;
      const g = ctx.createGain(); g.gain.value = 0.0001;
      const f = lp(600, 0.8); f.connect(g); g.connect(motifBus);
      const trem = ctx.createOscillator(); trem.frequency.value = 0.35; const tg = ctx.createGain(); tg.gain.value = 0.04; trem.connect(tg); tg.connect(g.gain); trem.start(t);
      const oscs = [];
      [0, 7, 12, 16].forEach((iv) => {
        const fr = midiToFreq(base + iv);
        [[1, 1], [2, 0.5], [3, 0.25], [4, 0.18], [6, 0.08]].forEach(([m, mix]) => { const o = osc('sine', fr * m, t, (m - 1) * 2); const og = ctx.createGain(); og.gain.value = mix * V * 0.5; o.connect(og); og.connect(f); o.start(t); oscs.push(o); });
      });
      orgelState = { g, f, oscs, trem, level: 0 };
      orgel.setLevel(0.3);
      return true;
    },
    // laut/leise: Pegel und Helligkeit schwellen langsam (kein Sprung)
    setLevel(v) {
      if (!orgelState) return;
      const l = Math.max(0, Math.min(1, v));
      orgelState.level = l;
      const t = ctx.currentTime;
      orgelState.g.gain.setTargetAtTime(0.08 + l * 0.9, t, 0.45);
      orgelState.f.frequency.setTargetAtTime(500 + l * 3500, t, 0.5);
      emit('music:orgel', { level: l });
    },
    pulse(strength = 1) {
      if (!orgelState) return;
      const t = ctx.currentTime; const l = orgelState.level;
      orgelState.g.gain.setTargetAtTime(Math.min(1, 0.08 + l * 0.9 + strength * 0.4), t, 0.15);
      orgelState.g.gain.setTargetAtTime(0.08 + l * 0.9, t + 0.5, 0.4);
    },
    stop() {
      if (!orgelState) return;
      const t = ctx.currentTime; const s = orgelState; orgelState = null;
      s.g.gain.setTargetAtTime(0.0001, t, 0.5);
      s.oscs.forEach((o) => o.stop(t + 3)); s.trem.stop(t + 3);
      emit('music:orgel', { level: 0, stopped: true });
    },
  };
  function klarklang(spec = 'konsonant', { root = null, seconds = 1.8 } = {}) {
    const intervals = Array.isArray(spec) ? spec.slice(0, 4) : (KLARKLANG[spec] || KLARKLANG.konsonant);
    const consonant = isConsonant(intervals);
    if (ensureGraph()) {
      const cur = insts.find((i) => !i.fading);
      const base = root !== null ? root : (cur ? cur.def.root : 60);
      const t = ctx.currentTime + 0.02;
      intervals.forEach((iv, i) => {
        const r = INST.horn(motifBus, t + i * 0.09, midiToFreq(base + iv), seconds - i * 0.09, 0.8);
        if (!consonant) r.oscs.forEach((o) => { const l = vibrato(o, t, 7 + i, 18, 0.05); l.stop(r.stopAt); });   // schief: schnelles Wackeln
      });
    }
    emit('music:klarklang', { intervals, consonant });
    return { intervals, consonant };
  }
  const jukebox = {
    loops: [{ id: 'runter', name: 'Runter', theme: 'jukebox-runter' }, { id: 'auf', name: 'Auf', theme: 'jukebox-auf' }],
    get current() { return st.jukebox; },
    play(id) { if (!THEMES['jukebox-' + id]) return false; st.jukebox = id; if (st.started) switchTo(currentId()); emit('music:jukebox', { id }); return true; },
    stop() { st.jukebox = null; if (st.started) switchTo(currentId()); emit('music:jukebox', { id: null }); },
  };

  const music = {
    get state() { const cur = insts.find((i) => !i.fading); return { theme: cur ? cur.id : null, region: st.region, veil: st.veil, puls: st.puls, jukebox: st.jukebox, enabled: st.enabled, started: st.started, layers: cur ? cur.layers.map((l) => +l.gain.value.toFixed(3)) : [], bar: cur ? cur.bar : 0 }; },
    themes: THEMES, motifs: MOTIFS, jukebox, orgel, klangmuschel, klarklang, motif, layerMix, isConsonant,
    start() { st.started = true; if (ensureGraph()) switchTo(currentId()); },
    stop() { st.started = false; if (out) { const t = ctx.currentTime; insts.forEach((i) => { i.fading = true; i.fadeEnd = t + 3; i.out.gain.setTargetAtTime(0.0001, t, 0.6); }); } },
    setRegion(id) {
      if (!id) return;                                   // zwischen den Zonen läuft das letzte Thema weiter
      const rid = THEMES[id] && !THEMES[id].jukebox ? id : mapRegion(id);
      if (!rid || rid === st.region) return;
      st.region = rid;
      if (st.started) switchTo(currentId());
    },
    setVeil(v) { st.veil = Math.max(0, Math.min(1, Number(v) || 0)); if (out) { insts.forEach((i) => applyMix(i)); filt.frequency.setTargetAtTime(cutoffFor(st.veil, st.puls), ctx.currentTime, 0.9); } },
    setPuls(p) { st.puls = Math.max(0, Math.min(100, Number(p) || 0)); if (out) { filt.frequency.setTargetAtTime(cutoffFor(st.veil, st.puls), ctx.currentTime, 0.6); filt.Q.setTargetAtTime(0.6 + st.puls / 100 * 1.4, ctx.currentTime, 0.6); } },
    setEnabled(v) { st.enabled = !!v; if (out) insts.forEach((i) => applyMix(i)); },
    setIntensity(v) { st.intensity = Math.max(0.2, Math.min(1.2, v)); },
    get klangmuschelActive() { return !!(muschel && ctx && ctx.currentTime < muschel.end); },
    update() {
      if (!st.started || !ensureGraph()) return;
      const now = ctx.currentTime;
      if (!insts.some((i) => !i.fading) && currentId()) switchTo(currentId());
      for (const inst of insts) {
        if (inst.fading && now > inst.fadeEnd) { try { inst.out.disconnect(); } catch (e) { /* egal */ } continue; }
        if (!inst.fading || now < inst.fadeEnd - 1.5) schedule(inst, now + LOOKAHEAD);
      }
      insts = insts.filter((i) => !(i.fading && now > i.fadeEnd));
    },
  };
  // Regionen ohne eigenes Thema (Zonen der Insel) → nächstes Thema
  const REGION_ALIAS = { baumhaus: 'hafen', mangrove: 'strand', kronendorf: 'dschungel', surfspot: 'strand', rueckfall: 'vulkan' };
  function mapRegion(id) { return THEMES[id] && !THEMES[id].jukebox ? id : (REGION_ALIAS[id] || null); }
  return music;
}
