// Sprechblasen (WP21, Gesetz 7): ≤ 12 Wörter, Vorlese-Knopf, Figur-Icon und Signaturfarbe, Weiter per Tippen oder Aktion.
//   const bubbles = createBubbles({ root, events, game, speech, audio, icon, lock });
//   bubbles.say({ who: 'jolie' | { name, icon, color, voice }, text, tts?, anchor?: Object3D|{x,y,z}, wait = true,
//                 seconds?, lock = true, read = 'auto' | true | false, cls? }) → Promise<{ dismissed: 'tap'|'action'|'timeout'|'clear' }>
//   bubbles.glimm(text, { seconds = 3.4 }) → Promise   Kurze Zeile neben Glimm (≤ 6 Wörter); bei „Glimm stumm“ gar nicht
//   bubbles.registerSpeaker(id, { name, icon, color, voice }) · bubbles.speaker(id) · bubbles.clear() · bubbles.current · bubbles.update()
//   DOM: .bubble[data-bubble][data-who] (.bubble-text, [data-read], [data-next]) · .glimm-line[data-glimm]
//   Ereignisse: ui:bubble { who, text } · ui:bubble:end { who, text, dismissed }
import { esc } from './overlay.js';
import { countWords } from '../content/schema/text.js';

// Rückfall-Register aus DESIGN §13 (bis WP34 die Figuren als Inhalte liefert; Namen kann die Lehrkraft umbenennen)
export const SPEAKERS = {
  glimm: { name: 'Glimm', icon: 'glimm', color: '#2de2c9', voice: { pitch: 1.35, rate: 1.05 } },
  ilda: { name: 'Ilda', icon: 'anker', color: '#4d8cff', voice: { pitch: 0.9, rate: 0.92 } },
  jolie: { name: 'Jolie', icon: 'muschel', color: '#39d0c8', voice: { pitch: 1.15, rate: 0.95 } },
  tun: { name: 'Tun', icon: 'kamera', color: '#ffd23f', voice: { pitch: 1.1, rate: 1.05 } },
  tiago: { name: 'Tiago', icon: 'surfbrett', color: '#ff8c42', voice: { pitch: 1.0, rate: 1.0 } },
  maelle: { name: 'Maëlle', icon: 'trommel', color: '#ff4f8b', voice: { pitch: 1.2, rate: 0.98 } },
  luc: { name: 'Luc', icon: 'windrad', color: '#8fa3ff', voice: { pitch: 0.95, rate: 1.0 } },
  jhemp: { name: 'Jhemp', icon: 'laterne', color: '#c9b37a', voice: { pitch: 0.8, rate: 0.88 } },
  pit: { name: 'Pit', icon: 'stein', color: '#6fae5a', voice: { pitch: 1.1, rate: 0.95 } },
  noor: { name: 'Noor', icon: 'spraydose', color: '#b06bff', voice: { pitch: 1.15, rate: 1.0 } },
  lucinda: { name: 'Oma Lucinda', icon: 'giesskanne', color: '#8fd18b', voice: { pitch: 0.9, rate: 0.86 } },
  mika: { name: 'Mika', icon: 'flamme', color: '#ff4d4d', voice: { pitch: 0.92, rate: 1.02 } },
  yara: { name: 'Yara', icon: 'stern', color: '#ff8ccf', voice: { pitch: 1.2, rate: 1.0 } },
  kim: { name: 'Kim', icon: 'chip', color: '#2de2ff', voice: { pitch: 1.1, rate: 1.0 } },
  senait: { name: 'Senait', icon: 'kompass', color: '#ffcf4d', voice: { pitch: 1.2, rate: 0.98 } },
  fraenz: { name: 'Fränz', icon: 'hammer', color: '#d8a26b', voice: { pitch: 0.8, rate: 0.9 } },
  grisel: { name: 'Grisel', icon: 'motte', color: '#9a93b8', voice: { pitch: 0.7, rate: 0.85 } },
  erzaehler: { name: '', icon: 'buch', color: '#ffd166', voice: { pitch: 1.0, rate: 0.95 } },
  du: { name: 'Du', icon: 'sprechblase', color: '#ffffff', voice: { pitch: 1.0, rate: 0.95 } },
};

export function createBubbles({ root, events, game, speech, audio, icon, lock }) {
  const registry = { ...SPEAKERS };
  const queue = [];
  let current = null;           // { el, opts, resolve, timer, anchor, who }
  let glimmEl = null, glimmTimer = 0;
  const emit = (n, p) => { if (events) events.emit(n, p); };
  const V = new (game.THREE.Vector3)();

  function speaker(who) {
    if (!who) return { id: 'erzaehler', ...registry.erzaehler };
    if (typeof who === 'object') return { id: who.id || 'custom', ...registry.erzaehler, ...who };
    const npc = game.content && game.content.get && game.content.get('npcs', who);
    const base = registry[who] || {};
    const renamed = game.state && game.state.get && game.state.get('names.' + who);   // Lehrer-Panel: umbenannt (WP30)
    return { id: who, name: 'Figur', icon: 'sprechblase', color: '#ffd166', voice: { pitch: 1, rate: 1 }, ...base, ...(npc ? { name: npc.name, icon: npc.icon || base.icon, color: npc.color || base.color, voice: npc.voice || base.voice } : {}), ...(renamed ? { name: renamed } : {}) };
  }
  function textOf(t) { return t && typeof t === 'object' ? t.t : t; }

  function show(item) {
    const o = item.opts;
    const sp = speaker(o.who);
    const text = textOf(o.text) || '';
    const n = countWords(text);
    if (n > 12) console.warn(`[bubbles] „${text}“ hat ${n} Wörter (max. 12, Gesetz 7)`);
    const el = document.createElement('div');
    el.className = `bubble${o.anchor ? ' is-anchored' : ''}${o.cls ? ' ' + o.cls : ''}`;
    el.dataset.bubble = '1';
    el.dataset.who = sp.id;
    el.style.setProperty('--who', sp.color);
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-live', 'polite');
    const canRead = speech && speech.canRead(sp.id) && o.read !== false;
    el.innerHTML = `
      <div class="bubble-who"><span class="bubble-avatar">${icon(o.icon || sp.icon, { size: 26 })}</span>${sp.name ? `<span class="bubble-name">${esc(sp.name)}</span>` : ''}</div>
      <p class="bubble-text">${esc(text)}</p>
      <div class="bubble-tools">
        ${canRead ? `<button class="bubble-read" type="button" data-read aria-label="Vorlesen" title="Vorlesen">${icon('lautsprecher', { size: 26 })}</button>` : ''}
        ${o.wait !== false ? `<button class="bubble-next" type="button" data-next aria-label="Weiter" title="Weiter">${icon('weiter', { size: 28 })}</button>` : ''}
      </div>
      <span class="bubble-tail" aria-hidden="true"></span>`;
    root.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-in'));
    if (audio) audio.play('bubble');
    item.el = el; item.who = sp.id; item.text = text;
    current = item;
    root.classList.add('has-bubble');
    // Lesen
    const read = () => { if (!speech) return; if (speech.speaking && speech.current && speech.current.text === speech.cleanText(o.tts || text)) { speech.cancel(); return; } speech.speak(o.tts || text, { who: sp.id, voice: sp.voice, interrupt: true }); };
    const rb = el.querySelector('[data-read]');
    if (rb) rb.addEventListener('click', (e) => { e.stopPropagation(); if (audio) audio.play('click'); read(); });
    if (canRead && (o.read === true || (o.read !== false && speech && speech.settings.autoRead))) speech.speak(o.tts || text, { who: sp.id, voice: sp.voice, interrupt: true, auto: o.read !== true });
    // Weiter
    const advance = (how) => (e) => { if (e) e.stopPropagation(); dismiss(item, how); };
    const nb = el.querySelector('[data-next]');
    if (nb) nb.addEventListener('click', advance('tap'));
    el.addEventListener('click', (e) => { if (e.target.closest('[data-read]')) return; if (o.wait !== false) dismiss(item, 'tap'); });
    if (o.wait === false) { const secs = o.seconds || Math.min(7, 1.8 + 0.38 * n); item.timer = setTimeout(() => dismiss(item, 'timeout'), secs * 1000); }
    else if (o.seconds) item.timer = setTimeout(() => dismiss(item, 'timeout'), o.seconds * 1000);
    if (o.lock !== false && lock) lock.acquire('bubble');
    // Der HUD-Aktionsknopf wird per CSS ausgeblendet (die Blase hat ihren eigenen Weiter-Knopf); E/Enter blättern weiter
    emit('ui:bubble', { who: sp.id, text, anchored: !!o.anchor });
    project(item, true);
  }
  function dismiss(item, how) {
    if (current !== item) return;
    clearTimeout(item.timer);
    current = null;
    root.classList.remove('has-bubble');
    const el = item.el;
    el.classList.remove('is-in'); el.classList.add('is-out');
    setTimeout(() => el.remove(), 200);
    if (item.opts.lock !== false && lock) lock.release('bubble');
    if (game.interactions && game.interactions.lock) game.interactions.lock(0.45);
    if (speech && item.opts.wait !== false && speech.speaking && speech.current && speech.current.who === item.who) speech.cancel();
    emit('ui:bubble:end', { who: item.who, text: item.text, dismissed: how });
    item.resolve({ dismissed: how });
    if (queue.length) show(queue.shift());
  }
  // Verankerte Blase folgt der Figur (Kopfhöhe); außerhalb des Bildes rutscht sie an den Rand
  function project(item, force) {
    const a = item.opts.anchor;
    if (!a || !item.el) return;
    if (a.isObject3D) { a.getWorldPosition(V); V.y += (a.userData && a.userData.bubbleHeight) || 2.25; }
    else V.set(a.x, (a.y || 0) + 2.25, a.z);
    V.project(game.camera);
    const w = root.clientWidth, h = root.clientHeight;
    const behind = V.z > 1;
    let x = (V.x * 0.5 + 0.5) * w, y = (-V.y * 0.5 + 0.5) * h;
    if (behind) { x = w / 2; y = h * 0.3; }
    x = Math.max(170, Math.min(w - 170, x)); y = Math.max(120, Math.min(h - 220, y));
    item.el.style.left = x.toFixed(0) + 'px';
    item.el.style.top = y.toFixed(0) + 'px';
    if (force) item.el.style.transition = 'none';
  }

  const api = {
    registerSpeaker(id, def) { registry[id] = { ...(registry[id] || {}), ...def }; },
    speaker,
    get current() { return current ? { who: current.who, text: current.text, el: current.el } : null; },
    get queued() { return queue.length; },
    say(opts) {
      const o = typeof opts === 'string' ? { text: opts } : { ...opts };
      return new Promise((resolve) => {
        const item = { opts: o, resolve, timer: 0 };
        if (current) queue.push(item); else show(item);
      });
    },
    // Glimm: kurze Zeile (≤ 6 Wörter) oben links; stumm = weder Text noch Stimme
    glimm(text, { seconds = 3.4, read = 'auto' } = {}) {
      const t = textOf(text) || '';
      if (!t) return Promise.resolve({ shown: false });
      if (speech && !speech.canRead('glimm')) return Promise.resolve({ shown: false, muted: true });
      const n = countWords(t);
      if (n > 6) console.warn(`[bubbles] Glimm: „${t}“ hat ${n} Wörter (max. 6)`);
      api.lastGlimm = t;
      if (!glimmEl) {
        glimmEl = document.createElement('div');
        glimmEl.className = 'glimm-line';
        glimmEl.dataset.glimm = '1';
        glimmEl.setAttribute('role', 'status');
        root.appendChild(glimmEl);
      }
      glimmEl.innerHTML = `<span class="glimm-line-icon">${icon('glimm', { size: 22 })}</span><span class="glimm-line-text">${esc(t)}</span>`;
      glimmEl.classList.remove('is-out'); void glimmEl.offsetWidth; glimmEl.classList.add('is-in');
      clearTimeout(glimmTimer);
      if (audio) audio.play('bubble');
      if (speech && (read === true || (read === 'auto' && speech.settings.autoRead))) speech.speak(t, { who: 'glimm', voice: registry.glimm.voice, auto: read !== true });
      emit('ui:glimm', { text: t });
      return new Promise((resolve) => { glimmTimer = setTimeout(() => { glimmEl.classList.remove('is-in'); glimmEl.classList.add('is-out'); resolve({ shown: true }); }, seconds * 1000); });
    },
    lastGlimm: '',
    clear() {
      while (queue.length) queue.shift().resolve({ dismissed: 'clear' });
      if (current) dismiss(current, 'clear');
    },
    update() { if (current && current.opts.anchor) project(current); },
    speakers: registry,
  };
  // Aktion-Taste/Knopf blättert weiter (E, Enter, HUD-Knopf)
  if (events) events.on('input:action:down', () => { if (current && current.opts.wait !== false) dismiss(current, 'action'); });
  return api;
}
