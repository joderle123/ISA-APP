// WebAudio: alles synthetisch erzeugt (Wind, Wellen, Schritte, Effekte). Start beim ersten Antippen.
export function createAudio() {
  let ctx = null;
  let master, comp, sfxBus, ambBus, reverbIn, noiseBuf;
  let wind = null, waves = null, night = null;
  let nextWave = 0, nextChirp = 0, nextCricket = 0;
  const amb = { wind: 0.6, waves: 0.8, night: 0, day: 1 };
  const settings = { volume: 0.8 };

  function init() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    comp.connect(ctx.destination);
    master = ctx.createGain();
    master.gain.value = settings.volume;
    master.connect(comp);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.9; sfxBus.connect(master);
    ambBus = ctx.createGain(); ambBus.gain.value = 0; ambBus.connect(master);
    ambBus.gain.setTargetAtTime(0.9, ctx.currentTime + 0.2, 1.5);
    // Rauschpuffer
    const len = ctx.sampleRate * 2;
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
    return true;
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

  function update() {
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    // Wind-Grundpegel
    wind.g.gain.setTargetAtTime(0.03 + amb.wind * 0.06, t, 0.8);
    // Brandung
    if (t > nextWave - 0.05) {
      const peak = 0.03 + 0.16 * amb.waves;
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
    thunder(o = {}) {
      const t = ctx.currentTime;
      const v = o.volume === undefined ? 1 : o.volume;
      const b = burst(t, 2.8, 'lowpass', 180, 0.7, 0.35 * v);
      b.g.gain.cancelScheduledValues(t);
      b.g.gain.setValueAtTime(0.0001, t);
      b.g.gain.linearRampToValueAtTime(0.4 * v, t + 0.08);
      b.g.gain.exponentialRampToValueAtTime(0.12 * v, t + 0.6);
      b.g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
      b.f.frequency.exponentialRampToValueAtTime(70, t + 2.5);
      burst(t, 0.25, 'bandpass', 900, 0.5, 0.08 * v);
    },
    error() {
      const t = ctx.currentTime;
      tone('triangle', 330, t, 0.005, 0.08, 0.15);
      tone('triangle', 247, t + 0.12, 0.005, 0.08, 0.2);
    },
  };

  const audio = {
    settings,
    get ready() { return !!ctx && ctx.state === 'running'; },
    get context() { return ctx; },
    // Muss in einer Nutzer-Geste aufgerufen werden (iOS)
    unlock() {
      try {
        if (!ctx && !init()) return;
        if (ctx.state === 'suspended') ctx.resume();
      } catch (e) { console.warn('[audio]', e); }
    },
    play(name, opts) {
      if (!ctx || ctx.state !== 'running' || !SFX[name]) return;
      try { SFX[name](opts); } catch (e) { /* still */ }
    },
    footstep(surface, volume) { audio.play('step', { surface, volume }); },
    setVolume(v) {
      settings.volume = Math.max(0, Math.min(1, v));
      if (master) master.gain.setTargetAtTime(settings.volume, ctx.currentTime, 0.05);
    },
    // wind/waves/night/day: 0..1
    setAmbience(o) { Object.assign(amb, o); },
    update,
    // Eigene Klänge für spätere Module: fn(ctx, sfxBus, reverbIn)
    register(name, fn) { SFX[name] = (o) => fn(ctx, sfxBus, reverbIn, o); },
    helpers: { tone: (...a) => ctx && tone(...a), burst: (...a) => ctx && burst(...a) },
  };
  return audio;
}
