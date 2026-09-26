// Vorlesen (WP20, DESIGN §18): speechSynthesis de-DE, Tempo 0,95, Warteschlange, Auto-Vorlesen, Glimm stumm.
//   const speech = createSpeech({ synth?, events?, audio?, settings? });
//   speech.speak(text, { who?, voice?: { pitch, rate }, interrupt?, auto? }) → Promise<{ done, cancelled?, skipped? }>
//   speech.cancel() · speech.speaking · speech.queue (Anzahl) · speech.available · speech.voices (deutsche Stimmen)
//   speech.settings { rate: 0.95, autoRead, glimmMuted, enabled } · speech.canRead(who) · speech.unlock() (in einer Geste, iOS)
//   speech.setSynth(obj) – Ersatz für Tests (createSpeech({ synth, Utterance }) in Node) · speech.last – letzter Auftrag { text, lang, rate, pitch, who }
//   Ereignisse: speech:start {id, text, who} · speech:end {id, text, done|cancelled}
// Beim Sprechen wird die Musik leiser (audio.setDucking). Texte werden bereinigt (Symbole, „…“ → Pause).
export const DEFAULT_RATE = 0.95;
export const LANG = 'de-DE';

export function cleanText(t) {
  return String(t == null ? '' : t)
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')   // Emojis und Symbole
    .replace(/…/g, ', ')
    .replace(/\bLUMO\b/g, 'Lumo')
    .replace(/\s*[·•]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/,\s*,/g, ',')
    .trim();
}

export function pickVoice(voices) {
  if (!voices || !voices.length) return null;
  const de = voices.filter((v) => /^de[-_]/i.test(v.lang || ''));
  const score = (v) => {
    let s = 0;
    if (/^de[-_]DE/i.test(v.lang)) s += 4;
    if (v.localService) s += 2;
    if (/anna|helena|petra|vicki|katja|google deutsch|marlene/i.test(v.name || '')) s += 3;
    if (/siri|premium|enhanced|natural/i.test(v.name || '')) s += 2;
    if (v.default) s += 1;
    return s;
  };
  return (de.length ? de : voices).slice().sort((a, b) => score(b) - score(a))[0];
}

export function createSpeech({ synth = (typeof window !== 'undefined' ? window.speechSynthesis : null), Utterance = null, events = null, audio = null, settings = {} } = {}) {
  const cfg = { rate: DEFAULT_RATE, autoRead: false, glimmMuted: false, enabled: true, ...settings };
  let S = synth || null;
  let voices = [];
  let voice = null;
  let current = null;          // { id, text, utter, resolve, timer }
  const queue = [];
  let idSeq = 0;
  let unlocked = false;
  const emit = (n, p) => { if (events) events.emit(n, p); };
  const Utter = Utterance || (typeof window !== 'undefined' && window.SpeechSynthesisUtterance) || null;

  function loadVoices() {
    try { voices = S && S.getVoices ? S.getVoices() || [] : []; } catch (e) { voices = []; }
    voice = pickVoice(voices);
  }
  function bind() {
    if (!S) return;
    loadVoices();
    try { if (typeof S.addEventListener === 'function') S.addEventListener('voiceschanged', loadVoices); else if ('onvoiceschanged' in S) S.onvoiceschanged = loadVoices; } catch (e) { /* egal */ }
  }
  bind();

  function finish(status) {
    const c = current;
    if (!c) return;
    current = null;
    clearTimeout(c.timer);
    if (audio && !queue.length) audio.setDucking(0);
    emit('speech:end', { id: c.id, text: c.text, who: c.who, ...status });
    c.resolve({ done: status.done !== false, ...status });
    next();
  }
  function next() {
    if (current || !queue.length) return;
    const item = queue.shift();
    if (!S || !cfg.enabled) { item.resolve({ done: false, skipped: true }); return next(); }
    current = item;
    const u = item.utter;
    u.onend = () => finish({ done: true });
    u.onerror = (e) => finish({ done: false, error: (e && e.error) || 'error' });
    // Sicherheitsnetz: manche Browser melden kein Ende
    item.timer = setTimeout(() => finish({ done: true, timeout: true }), 2500 + item.text.length * 90);
    if (audio) audio.setDucking(0.8);
    emit('speech:start', { id: item.id, text: item.text, who: item.who });
    try { S.speak(u); } catch (e) { finish({ done: false, error: String(e) }); }
  }
  function makeUtter(text, v = {}) {
    const rate = Math.max(0.5, Math.min(1.6, (v.rate || 1) * cfg.rate));
    const pitch = Math.max(0.5, Math.min(2, v.pitch || 1));
    let u;
    if (Utter) u = new Utter(text); else u = { text };
    u.lang = LANG; u.rate = rate; u.pitch = pitch; u.volume = 1;
    if (voice && Utter) { try { u.voice = voice; } catch (e) { /* egal */ } }
    return u;
  }

  const speech = {
    settings: cfg,
    get available() { return !!S && !!Utter; },
    get voices() { return voices.filter((v) => /^de/i.test(v.lang || '')); },
    get voice() { return voice; },
    get speaking() { return !!current; },
    get queue() { return queue.length; },
    get current() { return current ? { id: current.id, text: current.text, who: current.who } : null; },
    last: null,
    // Darf diese Figur vorgelesen werden? (Glimm stumm)
    canRead(who) { return cfg.enabled && !(cfg.glimmMuted && who === 'glimm'); },
    // text: String oder { t, tts } (tts = Aussprache-Variante). Rückgabe: Promise beim Ende.
    speak(text, { who = null, voice: v = {}, interrupt = false, auto = false } = {}) {
      const raw = text && typeof text === 'object' ? (text.tts || text.t) : text;
      const t = cleanText(raw);
      if (!t) return Promise.resolve({ done: false, skipped: true });
      if (!speech.canRead(who)) return Promise.resolve({ done: false, skipped: true, muted: true });
      if (auto && !cfg.autoRead) return Promise.resolve({ done: false, skipped: true });
      if (interrupt) speech.cancel();
      const id = ++idSeq;
      const utter = makeUtter(t, v);
      speech.last = { id, text: t, who, lang: utter.lang, rate: utter.rate, pitch: utter.pitch, auto };
      return new Promise((resolve) => {
        queue.push({ id, text: t, who, utter, resolve, timer: 0 });
        next();
      });
    },
    // Alles abbrechen (auch die Warteschlange)
    cancel() {
      const c = current;
      while (queue.length) queue.shift().resolve({ done: false, cancelled: true });
      if (c) { clearTimeout(c.timer); current = null; if (audio) audio.setDucking(0); try { S && S.cancel && S.cancel(); } catch (e) { /* egal */ } emit('speech:end', { id: c.id, text: c.text, who: c.who, done: false, cancelled: true }); c.resolve({ done: false, cancelled: true }); }
      else { try { S && S.cancel && S.cancel(); } catch (e) { /* egal */ } }
    },
    pause() { try { S && S.pause && S.pause(); } catch (e) { /* egal */ } },
    resume() { try { S && S.resume && S.resume(); } catch (e) { /* egal */ } },
    // iOS: erste Sprachausgabe braucht eine Nutzer-Geste – leere Äußerung schaltet frei
    unlock() {
      if (unlocked || !S || !Utter) return;
      unlocked = true;
      try { const u = new Utter(''); u.volume = 0; S.speak(u); } catch (e) { /* egal */ }
    },
    set(k, v) { cfg[k] = v; if (k === 'enabled' && !v) speech.cancel(); if (k === 'glimmMuted' && v && current && current.who === 'glimm') speech.cancel(); },
    setSynth(obj) { speech.cancel(); S = obj || null; bind(); },
    cleanText,
  };
  return speech;
}
