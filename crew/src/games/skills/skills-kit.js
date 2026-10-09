/* Bausteine für die Spiele aus „Anspannung & Skills“ und „Gefühle verstehen“ – KEIN eigenes Spiel.
   CREW.skillsKit:
     stufe(z) → 'gruen' | 'gelb' | 'rot'   ·   AMPEL[stufe]   ·   KOFFER (fünf Fächer wie in der Skill-Sprechstunde)
     koerper({ zonen, size, label })        → Körper-Silhouette, Zonen leuchten 'leise' (gelb) oder 'laut' (rot)
     pegelWahl(ctx, { werte, label })       → Zahl vorher/nachher (0–100) als Knopfreihe, nur im Speicher
     klang.mixer(ctx, { vol })              → kleine WebAudio-Mischpult-Engine (Gefühls-Mixer, Mein Ort)
   Alles wird erst zur Spielzeit benutzt; die Lade-Reihenfolge der Dateien ist darum egal.
   Nichts hier speichert etwas über Personen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* ---------- Ampel: 0–39 Grün, 40–69 Gelb, 70–100 Rot ---------- */
  const stufe = (z) => (z >= 70 ? 'rot' : z >= 40 ? 'gelb' : 'gruen');
  const AMPEL = {
    gruen: { id: 'gruen', name: 'Grün', bereich: '0–39', kurz: 'Kopf-Skills und Reden gehen gut.', icon: 'leaf' },
    gelb: { id: 'gelb', name: 'Gelb', bereich: '40–69', kurz: 'Jetzt ein Skill – bevor es rot wird.', icon: 'eye' },
    rot: { id: 'rot', name: 'Rot', bereich: '70–100', kurz: 'Erst Körper oder Sinne, dann Kopf.', icon: 'bolt' },
  };
  // Die fünf Koffer-Fächer (j1-e15). bis = darüber zieht das Fach kaum noch.
  const KOFFER = [
    { id: 'koerper', name: 'Körper', icon: 'bolt' },
    { id: 'sinne', name: 'Sinne', icon: 'eye' },
    { id: 'kopf', name: 'Kopf', icon: 'sparkle', bis: 69 },
    { id: 'reden', name: 'Reden', icon: 'chat', bis: 69 },
    { id: 'erwachsen', name: 'Erwachsene Person', icon: 'user' },
  ];

  /* ---------- Körper-Silhouette mit Zonen ---------- */
  const ZONEN = ['kopf', 'kiefer', 'schultern', 'brust', 'bauch', 'haende', 'beine'];
  const ZONE_NAME = { kopf: 'Kopf', kiefer: 'Kiefer und Mund', schultern: 'Schultern', brust: 'Brust und Herz', bauch: 'Bauch', haende: 'Hände', beine: 'Beine' };
  function koerper(o) {
    const oo = o || {};
    const el = h('div', { class: 'kk-body' + (oo.cls ? ' ' + oo.cls : ''), role: 'img', 'aria-label': oo.label || 'Körper', style: oo.size ? { width: oo.size + 'px' } : null });
    el.innerHTML = '<svg viewBox="0 0 120 220" aria-hidden="true">'
      // Arme (nur Linie), dann die Zonen als Flächen
      + '<path class="kk-arm" d="M32 66 Q20 78 18 104 L16 132"/><path class="kk-arm" d="M88 66 Q100 78 102 104 L104 132"/>'
      + '<path class="kz" data-zone="beine" d="M38 138 L57 141 L55 204 Q47 210 37 204 Z M63 141 L82 138 L83 204 Q73 210 65 204 Z"/>'
      + '<path class="kz" data-zone="bauch" d="M35 104 L85 104 L83 136 Q60 146 37 136 Z"/>'
      + '<path class="kz" data-zone="brust" d="M33 70 L87 70 L85 104 L35 104 Z"/>'
      + '<path class="kk-herz" d="M66 82 c-3 -5 -10 -3 -9 2 c1 4 9 9 9 9 c0 0 8 -5 9 -9 c1 -5 -6 -7 -9 -2 z"/>'
      + '<path class="kz" data-zone="schultern" d="M30 72 Q30 58 46 56 L74 56 Q90 58 90 72 Z"/>'
      + '<rect class="kk-hals" x="53" y="44" width="14" height="13" rx="4"/>'
      + '<circle class="kz" data-zone="kopf" cx="60" cy="27" r="20"/>'
      + '<path class="kz" data-zone="kiefer" d="M42 29 Q60 60 78 29 Q77 44 60 48 Q43 44 42 29 Z"/>'
      + '<circle class="kz" data-zone="haende" cx="16" cy="140" r="8.5"/><circle class="kz" data-zone="haende" cx="104" cy="140" r="8.5"/>'
      + '</svg>';
    el.setZonen = (z) => {
      const zz = z || {};
      el.querySelectorAll('.kz').forEach((p) => { const v = zz[p.dataset.zone]; if (v) p.setAttribute('data-on', v); else p.removeAttribute('data-on'); });
    };
    el.setZonen(oo.zonen);
    return el;
  }

  /* ---------- Zahl vorher/nachher (0–100): nur für diese Runde, wird nirgends gespeichert ---------- */
  function pegelWahl(ctx, o) {
    const oo = o || {};
    const werte = oo.werte || [0, 20, 40, 60, 80, 100];
    let sel = oo.value != null ? oo.value : null;
    const row = h('div', { class: 'solo-pegel-row', role: 'group', 'aria-label': oo.label || 'Anspannung 0 bis 100' }, werte.map((v) => {
      const b = h('button', { type: 'button', class: 'solo-pegel' + (sel === v ? ' sel' : ''), 'data-pegel': String(v), 'aria-pressed': String(sel === v) }, String(v));
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        sel = sel === v ? null : v;
        row.querySelectorAll('.solo-pegel').forEach((x) => { const on = Number(x.dataset.pegel) === sel; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
        if (oo.onPick) oo.onPick(sel);
      });
      return b;
    }));
    if (ctx && ctx.auto && oo.auto !== false) row.querySelectorAll('.solo-pegel')[Math.floor(ctx.autoRng() * werte.length)].click();
    return { el: row, get: () => sel };
  }

  /* ---------- Klang: ein kleines Mischpult aus WebAudio-Knoten ----------
     m = klang.mixer(ctx, { vol })  → { ok, ac, bus(gain), noise(type), osc(), env(), every(ms, fn), stop(fadeMs) }
     - respektiert den Ton-Schalter (Einstellungen → Ton) und die Pause (dann stumm)
     - räumt sich beim Spielende über ctx.onCleanup selbst auf */
  const NOISE = {};
  function noiseBuffer(ac, type) {
    const key = type + ac.sampleRate;
    if (NOISE[key]) return NOISE[key];
    const len = Math.floor(ac.sampleRate * 4);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'pink') { // Paul Kellet
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else if (type === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    // Weiche Naht, damit die Schleife nicht klickt
    const fade = Math.floor(ac.sampleRate * 0.05);
    for (let i = 0; i < fade; i++) { const k = i / fade; d[i] *= k; d[len - 1 - i] *= k; }
    NOISE[key] = buf;
    return buf;
  }
  function mixer(ctx, o) {
    const oo = o || {};
    const dead = { ok: false, ac: null, bus: () => null, noise: () => null, osc: () => null, tone: () => {}, every: () => {}, lfo: () => null, stop: () => {}, setVol: () => {} };
    if (!CREW.state.settings.sound || !CREW.sound || !CREW.sound.unlock) return dead;
    let ac = null;
    try { ac = CREW.sound.unlock(); } catch (e) { ac = null; }
    if (!ac) return dead;
    const vol = oo.vol != null ? oo.vol : 0.5;
    const out = ac.createGain();
    out.gain.value = 0.0001;
    const comp = ac.createDynamicsCompressor();
    out.connect(comp).connect(ac.destination);
    out.gain.setTargetAtTime(vol, ac.currentTime, 0.4);
    const sources = new Set();
    const timers = new Set();
    let stopped = false;
    let paused = false;
    // Pause: stumm schalten, danach wieder hochfahren
    const pauseIv = setInterval(() => {
      const p = CREW.ui.isPaused();
      if (p !== paused && !stopped) { paused = p; out.gain.setTargetAtTime(p ? 0.0001 : vol, ac.currentTime, 0.2); }
    }, 300);
    const bus = (g) => { const n = ac.createGain(); n.gain.value = g != null ? g : 1; n.connect(out); return n; };
    const track = (src) => { sources.add(src); src.onended = () => sources.delete(src); return src; };
    const noise = (type, dest) => { const s = ac.createBufferSource(); s.buffer = noiseBuffer(ac, type || 'white'); s.loop = true; s.loopStart = Math.random() * 2; s.connect(dest); s.start(); return track(s); };
    const osc = (type, freq, dest) => { const s = ac.createOscillator(); s.type = type || 'sine'; s.frequency.value = freq; s.connect(dest); s.start(); return track(s); };
    // LFO auf einen AudioParam: Mitte ± Tiefe
    const lfo = (param, rate, depth, mid) => { param.value = mid; const l = ac.createOscillator(); l.frequency.value = rate; const g = ac.createGain(); g.gain.value = depth; l.connect(g).connect(param); l.start(); track(l); return l; };
    // Kurzer Ton mit Hüllkurve (für Plucks, Glocken, Vögel). at = Sekunden ab jetzt
    const tone = (dest, freq, at, dur, type, peak, slideTo) => {
      if (stopped) return;
      const t0 = ac.currentTime + (at || 0);
      const s = ac.createOscillator(); const g = ac.createGain();
      s.type = type || 'sine'; s.frequency.setValueAtTime(freq, t0);
      if (slideTo) s.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur * 0.8);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak || 0.2, t0 + Math.min(0.03, dur / 4)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      s.connect(g).connect(dest); s.start(t0); s.stop(t0 + dur + 0.05); track(s);
    };
    // Kurzes Rauschen (Tropfen, Knistern, Klacken)
    const burst = (dest, at, dur, peak, filterType, freq, q) => {
      if (stopped) return;
      const t0 = ac.currentTime + (at || 0);
      const s = ac.createBufferSource(); s.buffer = noiseBuffer(ac, 'white');
      const f = ac.createBiquadFilter(); f.type = filterType || 'bandpass'; f.frequency.value = freq || 3000; f.Q.value = q || 1;
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak || 0.2, t0 + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      s.connect(f).connect(g).connect(dest); s.start(t0, Math.random() * 3); s.stop(t0 + dur + 0.05); track(s);
    };
    // Wiederkehrende Ereignisse (Tropfen, Klacken, Töne) – hält bei Pause an
    const every = (ms, fn) => { const iv = setInterval(() => { if (!stopped && !paused) { try { fn(); } catch (e) { /* Klang ist Bonus */ } } }, ms); timers.add(iv); return iv; };
    const filter = (type, freq, q, dest) => { const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; if (q != null) f.Q.value = q; if (dest) f.connect(dest); return f; };
    const stop = (fadeMs) => {
      if (stopped) return;
      stopped = true;
      clearInterval(pauseIv);
      timers.forEach((t) => clearInterval(t)); timers.clear();
      const f = (fadeMs != null ? fadeMs : 600) / 1000;
      try { out.gain.cancelScheduledValues(ac.currentTime); out.gain.setValueAtTime(Math.max(0.0001, out.gain.value), ac.currentTime); out.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + Math.max(0.02, f)); } catch (e) { /* egal */ }
      setTimeout(() => { sources.forEach((s) => { try { s.stop(); } catch (e) { /* schon aus */ } }); sources.clear(); try { out.disconnect(); comp.disconnect(); } catch (e) { /* egal */ } }, f * 1000 + 80);
    };
    const setVol = (v) => { if (!stopped) out.gain.setTargetAtTime(v, ac.currentTime, 0.3); };
    if (ctx && ctx.onCleanup) ctx.onCleanup(() => stop(150));
    return { ok: true, ac, bus, noise, osc, lfo, tone, burst, every, filter, stop, setVol, isStopped: () => stopped };
  }

  CREW.skillsKit = { stufe, AMPEL, KOFFER, ZONEN, ZONE_NAME, koerper, pegelWahl, klang: { mixer, noiseBuffer } };
})();
