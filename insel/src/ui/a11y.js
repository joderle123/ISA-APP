// Einstellungen und Barrierefreiheit (WP21, DESIGN §9/§17): Modus (Entspannt/Abenteuer/Profi, nie „leicht“),
// großer Text, reduzierte Effekte, automatisch vorlesen, Glimm stumm, dazu Ton/Musik/Grafik (Gerät).
//   const settings = createSettings({ game, state, events, speech, audio, icon });
//   settings.get('mode') · settings.set('bigText', true) · settings.all · settings.apply() · settings.render(el)
//   Spielstand: state.settings.{ mode, reducedFx, bigText, autoRead, glimmMuted }  (wird gespeichert und exportiert)
//   Gerät (localStorage lumo.settings): quality, volume, music
//   Wirkung: html.big-text (--txt-scale 1.25) · html.reduced-fx (Vignette/Wackeln/Herzschlag aus) · Ereignisse
//   settings:change { key, value } und mode:change { mode }. game.reducedFx / game.bigText als Getter für andere Systeme.
import { MODES } from '../content/schema/consts.js';

export const SAVE_KEYS = ['mode', 'reducedFx', 'bigText', 'autoRead', 'glimmMuted'];
export const MODE_LABEL = { entspannt: 'Entspannt', abenteuer: 'Abenteuer', profi: 'Profi' };
export const MODE_HINT = {
  entspannt: 'Segel schaltet selbst, Puls steigt langsam, nur Optik bei Gelb und Rot.',
  abenteuer: 'Der Standard: Segel schaltet selbst, Steuerung reagiert leicht auf den Puls.',
  profi: 'Auren aus, Segel selbst wählen, Puls steigt schneller, enge Zeitfenster.',
};

export function createSettings({ game, state, events, speech, audio, icon }) {
  const emit = (n, p) => { if (events) events.emit(n, p); };
  const dev = game.settings || {};
  if (dev.music === undefined) dev.music = 0.7;

  function get(key) {
    if (SAVE_KEYS.includes(key)) return state ? state.get('settings.' + key) : undefined;
    return dev[key];
  }
  function set(key, value, { silent = false } = {}) {
    if (SAVE_KEYS.includes(key)) {
      if (key === 'mode' && !MODES.includes(value)) throw new Error('Unbekannter Modus ' + value);
      if (state) state.set('settings.' + key, value);
    } else {
      dev[key] = value;
      if (key === 'quality') { if (game.setQualitySetting) game.setQualitySetting(value); }
      else if (key === 'volume') { if (game.setVolume) game.setVolume(value); }
      else if (key === 'music') { if (audio) audio.setMusicVolume(value); if (game.saveSettings) game.saveSettings(); }
      else if (game.saveSettings) game.saveSettings();
    }
    apply();
    if (!silent) emit('settings:change', { key, value });
    if (key === 'mode' && !silent) emit('mode:change', { mode: value });
    return value;
  }
  function apply() {
    const s = (state && state.get('settings')) || {};
    const html = document.documentElement;
    html.classList.toggle('big-text', !!s.bigText);
    html.classList.toggle('reduced-fx', !!s.reducedFx);
    html.dataset.mode = s.mode || 'abenteuer';
    if (speech) { speech.set('autoRead', !!s.autoRead); speech.set('glimmMuted', !!s.glimmMuted); }
    if (audio) { audio.heartbeat.enabled = !s.reducedFx; audio.setMusicVolume(dev.music === undefined ? 0.7 : dev.music); }
  }
  // Nach Laden/Neu/Wipe erneut anwenden
  if (events) events.on('state:reset', apply);
  if (state) state.on('settings', () => apply());
  apply();
  Object.defineProperty(game, 'reducedFx', { get: () => !!get('reducedFx'), configurable: true });
  Object.defineProperty(game, 'bigText', { get: () => !!get('bigText'), configurable: true });

  // ---- Seite ----
  function render(el) {
    const s = (state && state.get('settings')) || {};
    const seg = (key, opts, cur, cls = '') => `<div class="seg seg-${key} ${cls}" role="radiogroup">${opts.map(([v, l, ic]) => `<button type="button" role="radio" aria-checked="${String(cur) === String(v)}" data-set="${key}" data-val="${v}" class="${String(cur) === String(v) ? 'is-on' : ''}">${ic ? icon(ic, { size: 22 }) : ''}<span>${l}</span></button>`).join('')}</div>`;
    const toggle = (key, label, hint, ic) => `
      <button type="button" class="row row-toggle${s[key] ? ' is-on' : ''}" data-toggle="${key}" role="switch" aria-checked="${!!s[key]}">
        <span class="row-icon">${icon(ic, { size: 26 })}</span>
        <span class="row-text"><b>${label}</b><small>${hint}</small></span>
        <span class="switch" aria-hidden="true"><i></i></span>
      </button>`;
    el.innerHTML = `
      <section class="set-block">
        <h3>${icon('kompass', { size: 22 })} Modus</h3>
        ${seg('mode', MODES.map((m) => [m, MODE_LABEL[m]]), s.mode || 'abenteuer', 'seg-wide')}
        <p class="set-hint" data-mode-hint>${MODE_HINT[s.mode || 'abenteuer']}</p>
      </section>
      <section class="set-block">
        <h3>${icon('augen', { size: 22 })} Anzeige und Vorlesen</h3>
        ${toggle('bigText', 'Großer Text', 'Alle Texte 25 % größer.', 'text')}
        ${toggle('reducedFx', 'Reduzierte Effekte', 'Kein Wackeln, keine Vignette, kein Herzschlag.', 'wolke')}
        ${toggle('autoRead', 'Automatisch vorlesen', 'Jede Blase wird sofort vorgelesen.', 'lautsprecher')}
        ${toggle('glimmMuted', 'Glimm stumm', 'Glimm sagt nichts mehr.', 'stumm')}
      </section>
      <section class="set-block">
        <h3>${icon('lautsprecher', { size: 22 })} Ton</h3>
        <div class="row"><span class="row-text"><b>Effekte</b></span>${seg('volume', [[0, 'Aus'], [0.4, 'Leise'], [0.8, 'Normal'], [1, 'Laut']], dev.volume)}</div>
        <div class="row"><span class="row-text"><b>Musik</b></span>${seg('music', [[0, 'Aus'], [0.35, 'Leise'], [0.7, 'Normal'], [1, 'Laut']], dev.music)}</div>
        <p class="set-hint">${speech && speech.available ? (speech.voice ? `Stimme: ${speech.voice.name}` : 'Vorlesen ist bereit.') : 'Dieses Gerät kann nicht vorlesen.'}</p>
      </section>
      <section class="set-block">
        <h3>${icon('zahnrad', { size: 22 })} Grafik</h3>
        <div class="row"><span class="row-text"><b>Qualität</b></span>${seg('quality', [['auto', 'Auto'], ['low', 'Niedrig'], ['medium', 'Mittel'], ['high', 'Hoch']], dev.quality || 'auto')}</div>
      </section>`;
    el.querySelectorAll('[data-set]').forEach((b) => b.addEventListener('click', () => {
      if (audio) audio.play('tile');
      const key = b.dataset.set;
      const raw = b.dataset.val;
      const val = key === 'mode' || key === 'quality' ? raw : Number(raw);
      set(key, val);
      render(el);
    }));
    el.querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', () => {
      if (audio) audio.play('tile');
      const key = b.dataset.toggle;
      const v = !get(key);
      set(key, v);
      if (key === 'autoRead' && v && speech) speech.speak('Vorlesen ist an.', { who: 'du', interrupt: true });
      render(el);
    }));
  }

  return {
    get, set, apply, render,
    get all() { return { ...((state && state.get('settings')) || {}), quality: dev.quality, volume: dev.volume, music: dev.music }; },
    keys: SAVE_KEYS, MODE_LABEL, MODE_HINT,
  };
}
