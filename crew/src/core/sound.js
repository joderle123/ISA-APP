/* CREW – Töne (selbst erzeugt mit WebAudio, keine Dateien) und Vorlesen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  let ctx = null;
  let master = null;

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.35;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // iPad: Ton erst nach der ersten Berührung erlaubt
  ['pointerdown', 'touchstart', 'keydown'].forEach((ev) =>
    window.addEventListener(ev, () => { if (CREW.state.settings.sound) ac(); }, { once: true, passive: true })
  );

  function tone(freq, start, dur, type, vol, slideTo) {
    const a = ac();
    if (!a) return;
    const t0 = a.currentTime + start;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.5, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }
  function noise(start, dur, vol, fromHz, toHz) {
    const a = ac();
    if (!a) return;
    const t0 = a.currentTime + start;
    const len = Math.floor(a.sampleRate * dur);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    const f = a.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(fromHz || 800, t0);
    f.frequency.exponentialRampToValueAtTime(toHz || 3000, t0 + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, t0 + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t0);
  }

  const SFX = {
    tap: () => tone(660, 0, 0.07, 'triangle', 0.25),
    tick: () => tone(1200, 0, 0.04, 'square', 0.08),
    count: () => tone(520, 0, 0.12, 'triangle', 0.35),
    go: () => { tone(784, 0, 0.1, 'square', 0.2); tone(1046, 0.08, 0.22, 'square', 0.2); },
    good: () => { tone(660, 0, 0.1, 'triangle', 0.35); tone(990, 0.08, 0.18, 'triangle', 0.35); },
    great: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.07, 0.22, 'triangle', 0.32)),
    soft: () => { tone(392, 0, 0.14, 'sine', 0.3); tone(330, 0.1, 0.22, 'sine', 0.25); },
    reveal: () => { noise(0, 0.45, 0.25, 400, 5000); tone(880, 0.35, 0.25, 'triangle', 0.3); },
    whoosh: () => noise(0, 0.3, 0.18, 2000, 400),
    unlock: () => {
      [523, 659, 784, 1046, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.09, 0.28, 'square', 0.14));
      noise(0.55, 0.5, 0.12, 3000, 8000);
    },
    drum: () => { for (let i = 0; i < 14; i++) tone(120 + (i % 2) * 20, i * 0.06, 0.05, 'triangle', 0.25 + i * 0.015); },
    breatheIn: () => tone(220, 0, 3.8, 'sine', 0.12, 330),
    breatheOut: () => tone(330, 0, 5.5, 'sine', 0.1, 196),
  };

  function play(name) {
    if (!CREW.state.settings.sound) return;
    try { (SFX[name] || SFX.tap)(); } catch (e) { /* Ton ist Bonus */ }
  }

  /* ---------- Vorlesen ---------- */
  let voice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = window.speechSynthesis.getVoices().filter((v) => /^de(-|_|$)/i.test(v.lang));
    voice = vs.find((v) => /de-DE/i.test(v.lang) && /anna|helena|petra|google|markus|yannick/i.test(v.name)) || vs[0] || null;
    return voice;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/[*_#]/g, ''));
      u.lang = 'de-DE';
      if (voice || pickVoice()) u.voice = voice;
      u.rate = 0.95;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
  function stopSpeaking() {
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) { /* egal */ }
  }

  CREW.sound = { play, unlock: ac };
  CREW.speak = speak;
  CREW.stopSpeaking = stopSpeaking;
  CREW.canSpeak = () => 'speechSynthesis' in window;
})();
