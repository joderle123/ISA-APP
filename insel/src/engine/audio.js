// WebAudio: alles synthetisch erzeugt (Wind, Wellen, Schritte, Effekte). Start beim ersten Antippen.
//
// Kette: Busse (sfx · amb · music · reverb) → master → Leim-Kompressor → Limiter → weiche Decke (max. −6 dBFS) → Ausgang.
// Pegelgrenzen (DESIGN §18): keine Spitze über −6 dBFS, keine plötzlich lauten Töne, Donner tief und gedämpft,
// Herzschlag leise und abschaltbar (audio.heartbeat), Musik wird beim Vorlesen leiser (audio.setDucking).
//   createAudio({ context?, destination? })  – eigener Kontext z. B. OfflineAudioContext für Pegel-Tests (dann ohne unlock)
//   audio.play(name, opts) · footstep · setVolume · setMusicVolume · setAmbience · update() · register(name, fn)
//   audio.buses { sfx, amb, music, reverb } · audio.context · audio.ready · audio.now · audio.limiter { peak }
//   audio.heartbeat.start(bpm) / setRate(bpm) / stop() / enabled (aus bei „reduzierte Effekte“)
export const CEILING = 0.5;           // −6,02 dBFS – harte Obergrenze der weichen Decke

// Weiche Decke: linear bis knee, dann tanh-Sättigung, die genau bei CEILING endet
export function ceilingCurve(n = 2048, knee = 0.36, ceiling = CEILING) {
  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    const a = Math.abs(x);
    const y = a <= knee ? a : knee + (ceiling - knee) * Math.tanh((a - knee) / (ceiling - knee));
    c[i] = Math.sign(x) * Math.min(y, ceiling);
  }
  return c;
}

export function createAudio({ context = null, destination = null } = {}) {
  let ctx = null;
  let master, glue, limiter, ceiling, sfxBus, ambBus, musicBus, reverbIn, noiseBuf;
  let wind = null, waves = null;
  let nextWave = 0, nextChirp = 0, nextCricket = 0;
  const amb = { wind: 0.6, waves: 0.8, night: 0, day: 1 };
  const settings = { volume: 0.8, music: 0.7 };
  let duck = 0;                 // 0..1: Musik/Ambiente leiser (Vorlesen, Pause)
  const heart = { enabled: true, running: false, bpm: 60, next: 0, level: 0.06 };
  const offline = !!context;

  function init() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    buildGraph();
    return true;
  }
  function buildGraph() {
    // Decke ganz am Ende: garantiert ≤ −6 dBFS, auch wenn der Kompressor Makeup-Gain hinzufügt
    ceiling = ctx.createWaveShaper(); ceiling.curve = ceilingCurve(); ceiling.oversample = '2x';
    ceiling.connect(destination || ctx.destination);
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -9; limiter.knee.value = 2; limiter.ratio.value = 20; limiter.attack.value = 0.002; limiter.release.value = 0.18;
    limiter.connect(ceiling);
    glue = ctx.createDynamicsCompressor();
    glue.threshold.value = -16; glue.knee.value = 8; glue.ratio.value = 3; glue.attack.value = 0.01; glue.release.value = 0.25;
    glue.connect(limiter);
    master = ctx.createGain();
    master.gain.value = settings.volume;
    master.connect(glue);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.9; sfxBus.connect(master);
    ambBus = ctx.createGain(); ambBus.gain.value = offline ? 0.9 : 0; ambBus.connect(master);
    if (!offline) ambBus.gain.setTargetAtTime(0.9, ctx.currentTime + 0.2, 1.5);
    musicBus = ctx.createGain(); musicBus.gain.value = settings.music; musicBus.connect(master);
    // Rauschpuffer
    const len = Math.floor(ctx.sampleRate * 2);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let b = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; b = 0.97 * b + 0.03 * w; d[i] = w * 0.55 + b * 2.2; }
    // Hall
    const conv = ctx.createConvolver();
    const rl = Math.floor(ctx.sampleRate * 2.6);
    const ir = ctx.createBuffer(2, rl, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < rl; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 2.8);
    }
    conv.buffer = ir;
    reverbIn = ctx.createGain(); reverbIn.gain.value = 0.35;
    const wet = ctx.createGain(); wet.gain.value = 0.6;
    reverbIn.connect(conv); conv.connect(wet); wet.connect(master);
    startAmbience();
  }

  function noiseSrc() {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf; s.loop = true;
    s.loopStart = Math.random(); s.loopEnd = 2;
    return s;
  }
  function lfo(freq, depth, target, offset = 0) {
    const o = ctx.createOscillator(); o.frequency.value = freq;
    const g = ctx.createGain(); g.gain.value = depth;
    o.connect(g); g.connect(target); o.start(ctx.currentTime + offset);
    return o;
  }

  function startAmbience() {
    // Wind: Bandpass-Rauschen mit langsamen LFOs
    const ws = noiseSrc();
    const wf = ctx.createBiquadFilter(); wf.type = 'bandpass'; wf.frequency.value = 520; wf.Q.value = 0.7;
    const wg = ctx.createGain(); wg.gain.value = 0.05;
    ws.connect(wf); wf.connect(wg); wg.connect(ambBus);
    lfo(0.06, 260, wf.frequency); lfo(0.11, 0.025, wg.gain, 1.3);
    ws.start();
    wind = { g: wg, f: wf };
    // Wellen: Tiefpass-Rauschen, Brandung wird geplant
    const vs = noiseSrc();
    const vf = ctx.createBiquadFilter(); vf.type = 'lowpass'; vf.frequency.value = 420;
    const vg = ctx.createGain(); vg.gain.value = 0.02;
    vs.connect(vf); vf.connect(vg); vg.connect(ambBus);
    vs.start();
    waves = { g: vg, f: vf };
    nextWave = ctx.currentTime + 0.5;
    nextChirp = ctx.currentTime + 3;
    nextCricket = ctx.currentTime + 1;
  }

  function running() { return !!ctx && (offline || ctx.state === 'running'); }

  function update() {
    if (!running()) return;
    const t = ctx.currentTime;
    // Wind-Grundpegel
    wind.g.gain.setTargetAtTime((0.03 + amb.wind * 0.06) * (1 - duck * 0.5), t, 0.8);
    // Brandung
    if (t > nextWave - 0.05) {
      const peak = (0.03 + 0.16 * amb.waves) * (1 - duck * 0.5);
      const dur = 5.5 + Math.random() * 3.5;
      waves.g.gain.cancelScheduledValues(t);
      waves.g.gain.setValueAtTime(Math.max(waves.g.gain.value, 0.01), t);
      waves.g.gain.linearRampToValueAtTime(peak, t + 1.6 + Math.random() * 0.8);
      waves.g.gain.exponentialRampToValueAtTime(0.01 + 0.02 * amb.waves, t + dur);
      waves.f.frequency.cancelScheduledValues(t);
      waves.f.frequency.setValueAtTime(300, t);
      waves.f.frequency.linearRampToValueAtTime(900 + Math.random() * 500, t + 1.8);
      waves.f.frequency.exponentialRampToValueAtTime(320, t + dur);
      nextWave = t + dur - 0.8;
    }
    // Vögel am Tag
    if (t > nextChirp) {
      if (amb.day > 0.4 && amb.birds !== 0) chirp();
      nextChirp = t + 2.5 + Math.random() * 6;
    }
    // Grillen in der Nacht
    if (t > nextCricket) {
      if (amb.night > 0.3) cricket();
      nextCricket = t + 0.9 + Math.random() * 1.6;
    }
    // Herzschlag (leise, tief; nur wenn erlaubt)
    if (heart.running && heart.enabled && t > heart.next) {
      heartBeat(heart.next > 0 ? Math.max(heart.next, t) : t);
      heart.next = (heart.next > 0 ? Math.max(heart.next, t) : t) + 60 / Math.max(40, Math.min(140, heart.bpm));
    }
  }

  function env(g, t, a, peak, dcy) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dcy);
  }
  function tone(type, freq, t, a, peak, dcy, dest = sfxBus, detune = 0) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t); o.detune.value = detune;
    const g = ctx.createGain(); env(g, t, a, peak, dcy);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + a + dcy + 0.05);
    return { o, g };
  }
  function burst(t, dur, ftype, freq, q, peak, dest = sfxBus) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = ftype; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); env(g, t, 0.004, peak, dur);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.05);
    return { s, f, g };
  }
  function chirp() {
    const t = ctx.currentTime;
    const base = 2600 + Math.random() * 1600;
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const tt = t + i * 0.11;
      const { o } = tone('sine', base, tt, 0.01, 0.018 * amb.day, 0.07, ambBus);
      o.frequency.exponentialRampToValueAtTime(base * (1.25 + Math.random() * 0.3), tt + 0.06);
    }
  }
  function cricket() {
    const t = ctx.currentTime;
    for (let i = 0; i < 3; i++) tone('sine', 4200 + Math.random() * 300, t + i * 0.05, 0.005, 0.01 * amb.night, 0.03, ambBus);
  }
  // Herzschlag: zwei tiefe, weiche Schläge („lub-dub“), sehr leise
  function heartBeat(t) {
    const v = heart.level;
    const a = tone('sine', 58, t, 0.012, v, 0.16, ambBus);
    a.o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    const b = tone('sine', 52, t + 0.19, 0.012, v * 0.7, 0.14, ambBus);
    b.o.frequency.exponentialRampToValueAtTime(38, t + 0.32);
  }

  const SFX = {
    step(o = {}) {
      const t = ctx.currentTime;
      const s = o.surface || 'grass';
      const v = (o.volume || 1) * (0.8 + Math.random() * 0.4);
      if (s === 'sand') burst(t, 0.09, 'bandpass', 1500 + Math.random() * 400, 0.8, 0.07 * v);
      else if (s === 'wood') { tone('sine', 150 + Math.random() * 30, t, 0.003, 0.14 * v, 0.08); burst(t, 0.03, 'highpass', 2500, 0.7, 0.03 * v); }
      else if (s === 'water') burst(t, 0.16, 'bandpass', 900 + Math.random() * 500, 0.9, 0.09 * v);
      else if (s === 'rock') { burst(t, 0.05, 'bandpass', 2400, 1.2, 0.06 * v); tone('sine', 110, t, 0.002, 0.05 * v, 0.05); }
      else burst(t, 0.07, 'lowpass', 900 + Math.random() * 300, 0.7, 0.07 * v);
    },
    jump() {
      const t = ctx.currentTime;
      const { o } = tone('sine', 320, t, 0.01, 0.12, 0.2);
      o.frequency.exponentialRampToValueAtTime(700, t + 0.15);
      burst(t, 0.18, 'bandpass', 800, 0.6, 0.04);
    },
    land() {
      const t = ctx.currentTime;
      const { o } = tone('sine', 140, t, 0.003, 0.14, 0.12);
      o.frequency.exponentialRampToValueAtTime(70, t + 0.1);
      burst(t, 0.1, 'lowpass', 700, 0.7, 0.07);
    },
    splash() {
      const t = ctx.currentTime;
      const b = burst(t, 0.45, 'bandpass', 1200, 0.6, 0.12);
      b.f.frequency.exponentialRampToValueAtTime(500, t + 0.4);
    },
    click() {
      const t = ctx.currentTime;
      tone('triangle', 1400, t, 0.002, 0.08, 0.05);
      tone('sine', 2100, t + 0.02, 0.002, 0.04, 0.04);
    },
    // Oberfläche: Blase erscheint, Kachel gewählt, Fenster auf/zu, Aufnäher umdrehen, Glühwürmchen
    bubble() {
      const t = ctx.currentTime;
      const { o } = tone('sine', 620, t, 0.006, 0.05, 0.12);
      o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
    },
    tile() {
      const t = ctx.currentTime;
      tone('triangle', 740, t, 0.004, 0.06, 0.09);
      tone('sine', 1110, t + 0.05, 0.004, 0.05, 0.16);
    },
    open() {
      const t = ctx.currentTime;
      const { o } = tone('sine', 440, t, 0.01, 0.05, 0.22);
      o.frequency.exponentialRampToValueAtTime(660, t + 0.12);
      burst(t, 0.12, 'highpass', 3000, 0.5, 0.012);
    },
    close() {
      const t = ctx.currentTime;
      const { o } = tone('sine', 620, t, 0.01, 0.05, 0.18);
      o.frequency.exponentialRampToValueAtTime(400, t + 0.12);
    },
    flip() {
      const t = ctx.currentTime;
      burst(t, 0.08, 'bandpass', 1800, 1.2, 0.05);
      tone('triangle', 520, t + 0.05, 0.004, 0.04, 0.12);
    },
    firefly() {
      const t = ctx.currentTime;
      [880, 1108.7, 1318.5, 1760].forEach((f, i) => tone('sine', f, t + i * 0.09, 0.006, 0.035, 0.5, reverbIn));
    },
    pickup() {
      const t = ctx.currentTime;
      [1046.5, 1318.5, 1568, 2093].forEach((f, i) => {
        tone('triangle', f, t + i * 0.07, 0.005, 0.07, 0.35, sfxBus);
        tone('sine', f * 2, t + i * 0.07, 0.005, 0.02, 0.25, reverbIn);
      });
    },
    chime() {
      const t = ctx.currentTime;
      tone('sine', 880, t, 0.01, 0.06, 0.8, sfxBus);
      tone('sine', 1318.5, t + 0.12, 0.01, 0.05, 1.0, sfxBus);
      tone('sine', 1318.5, t + 0.12, 0.01, 0.04, 1.0, reverbIn);
    },
    restore() {
      const t = ctx.currentTime;
      const chord = [261.6, 329.6, 392.0, 493.9, 587.3];
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(400, t);
      lp.frequency.exponentialRampToValueAtTime(3200, t + 2.2);
      lp.connect(sfxBus); lp.connect(reverbIn);
      chord.forEach((f, i) => {
        [-8, 8].forEach((dt) => {
          const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = dt;
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.028, t + 0.6 + i * 0.12);
          g.gain.setTargetAtTime(0.0001, t + 2.6, 0.7);
          o.connect(g); g.connect(lp); o.start(t); o.stop(t + 6);
        });
      });
      // Glitzern oben drüber
      for (let i = 0; i < 10; i++) {
        const f = chord[i % chord.length] * 4 * (i > 4 ? 2 : 1);
        tone('sine', f, t + 0.4 + i * 0.13, 0.005, 0.035, 0.6, reverbIn);
        tone('triangle', f, t + 0.4 + i * 0.13, 0.005, 0.025, 0.4, sfxBus);
      }
    },
    whoosh(o = {}) {
      const t = ctx.currentTime;
      const d = o.duration || 1.4;
      const b = burst(t, d, 'bandpass', 300, 0.8, 0.08);
      b.g.gain.cancelScheduledValues(t);
      b.g.gain.setValueAtTime(0.0001, t);
      b.g.gain.linearRampToValueAtTime(0.09, t + d * 0.45);
      b.g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      b.f.frequency.exponentialRampToValueAtTime(1400, t + d * 0.5);
      b.f.frequency.exponentialRampToValueAtTime(300, t + d);
    },
    // Donner: tief, gedämpft, langsam anschwellend (kein Erschrecken)
    thunder(o = {}) {
      const t = ctx.currentTime;
      const v = o.volume === undefined ? 1 : o.volume;
      const b = burst(t, 2.8, 'lowpass', 180, 0.7, 0.3 * v);
      b.g.gain.cancelScheduledValues(t);
      b.g.gain.setValueAtTime(0.0001, t);
      b.g.gain.linearRampToValueAtTime(0.3 * v, t + 0.25);
      b.g.gain.exponentialRampToValueAtTime(0.12 * v, t + 0.9);
      b.g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
      b.f.frequency.exponentialRampToValueAtTime(70, t + 2.5);
      burst(t + 0.05, 0.25, 'bandpass', 700, 0.5, 0.05 * v);
    },
    error() {
      const t = ctx.currentTime;
      tone('triangle', 330, t, 0.005, 0.08, 0.15);
      tone('triangle', 247, t + 0.12, 0.005, 0.08, 0.2);
    },
  };

  if (context) { ctx = context; buildGraph(); }

  const audio = {
    settings,
    get ready() { return running(); },
    get context() { return ctx; },
    get now() { return ctx ? ctx.currentTime : 0; },
    get offline() { return offline; },
    get buses() { return ctx ? { sfx: sfxBus, amb: ambBus, music: musicBus, reverb: reverbIn, master } : null; },
    // Muss in einer Nutzer-Geste aufgerufen werden (iOS)
    unlock() {
      if (offline) return;
      try {
        if (!ctx && !init()) return;
        if (ctx.state === 'suspended') ctx.resume();
      } catch (e) { console.warn('[audio]', e); }
    },
    play(name, opts) {
      if (!running() || !SFX[name]) return;
      try { SFX[name](opts); } catch (e) { /* still */ }
    },
    has(name) { return !!SFX[name]; },
    footstep(surface, volume) { audio.play('step', { surface, volume }); },
    setVolume(v) {
      settings.volume = Math.max(0, Math.min(1, v));
      if (master) master.gain.setTargetAtTime(settings.volume, ctx.currentTime, 0.05);
    },
    setMusicVolume(v) {
      settings.music = Math.max(0, Math.min(1, v));
      if (musicBus) musicBus.gain.setTargetAtTime(settings.music * (1 - duck * 0.7), ctx.currentTime, 0.1);
    },
    // Musik und Ambiente leiser (0..1), z. B. während des Vorlesens oder in der Pause – weich, nie abrupt
    setDucking(v) {
      duck = Math.max(0, Math.min(1, v));
      if (musicBus) musicBus.gain.setTargetAtTime(settings.music * (1 - duck * 0.7), ctx.currentTime, 0.25);
    },
    get ducking() { return duck; },
    // wind/waves/night/day: 0..1
    setAmbience(o) { Object.assign(amb, o); },
    update,
    heartbeat: {
      get enabled() { return heart.enabled; },
      set enabled(v) { heart.enabled = !!v; },
      get running() { return heart.running; },
      get bpm() { return heart.bpm; },
      start(bpm = 60) { heart.bpm = bpm; heart.running = true; heart.next = 0; },
      setRate(bpm) { heart.bpm = bpm; },
      stop() { heart.running = false; heart.next = 0; },
    },
    limiter: { get ceiling() { return CEILING; }, get node() { return limiter; } },
    // Eigene Klänge für spätere Module: fn(ctx, sfxBus, reverbIn, opts)
    register(name, fn) { SFX[name] = (o) => fn(ctx, sfxBus, reverbIn, o); },
    helpers: { tone: (...a) => ctx && tone(...a), burst: (...a) => ctx && burst(...a), noise: () => ctx && noiseSrc(), env: (...a) => ctx && env(...a) },
  };
  return audio;
}
