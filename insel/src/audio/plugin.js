// Audio-Plugin (WP20): Musik-Schichten je Region (abhängig von Schleier und Puls), Leitmotive, Vorlesen.
//   game.music  (src/engine/music.js)   game.speech (src/engine/speech.js)   game.plugins.audio → { music, speech, renderOffline }
// Hört auf: game:start (Musik an) · zone:change (Thema) · puls:set (Filter/Tempo) · veil:restore:start (Motiv „welle“)
//           pause (Musik leiser) · state settings.* (reducedFx → Herzschlag aus, glimmMuted/autoRead → Vorlesen) · weather:set
// Test: LUMO.plugins.audio.renderOffline(6, { region:'hafen', veil:0, puls:0, veilAt:{t:2, veil:1} }) → { peakDb, maxJumpDb, … }
//   (OfflineAudioContext; Abnahme WP20: keine Spitze > −6 dBFS, kein Sprung > 12 dB in 100 ms)
import { createAudio } from '../engine/audio.js';
import { createMusic } from '../engine/music.js';
import { createSpeech } from '../engine/speech.js';
import { createEvents } from '../engine/events.js';

export default {
  id: 'audio', order: 20, deps: [],
  install(game) {
    const { events, audio, state, world, player } = game;
    const music = createMusic({ audio, events, rng: game.rng });
    const speech = createSpeech({ events, audio, settings: readSettings() });
    game.music = music;
    game.speech = speech;

    function readSettings() {
      const s = (state && state.get('settings')) || {};
      return { autoRead: !!s.autoRead, glimmMuted: !!s.glimmMuted };
    }
    function applySettings() {
      const s = (state && state.get('settings')) || {};
      speech.set('autoRead', !!s.autoRead);
      speech.set('glimmMuted', !!s.glimmMuted);
      audio.heartbeat.enabled = !s.reducedFx;
      if (game.settings) { audio.setMusicVolume(game.settings.music === undefined ? 0.7 : game.settings.music); }
    }
    applySettings();
    if (state) { state.on('settings', applySettings); }
    events.on('state:reset', applySettings);

    // ---- Musik folgt der Welt ----
    let veilT = 0;
    events.on('game:start', () => { music.setRegion(game.zone || 'hafen'); music.start(); });
    events.on('zone:change', (e) => { if (e && e.id) music.setRegion(e.id); });
    events.on('puls:set', (e) => music.setPuls(e && e.value));
    events.on('veil:restore:start', () => music.motif('welle'));
    events.on('pause', (p) => { if (!speech.speaking) audio.setDucking(p ? 0.5 : 0); });
    events.on('weather:set', (e) => music.setIntensity(e && e.id === 'ruhe' ? 0.7 : e && e.id === 'fest' ? 1.1 : 1));
    game.addUpdate((dt, t, real) => {
      veilT += real;
      if (veilT > 0.25 && game.started && world && world.veil) {
        veilT = 0;
        music.setVeil(world.veil.amountAt(player.position.x, player.position.z));
      }
      music.update();
    }, { order: 12, always: true });
    // Erste Berührung schaltet auch das Vorlesen frei (iOS)
    if (typeof window !== 'undefined') {
      const unlock = () => { speech.unlock(); window.removeEventListener('pointerdown', unlock); window.removeEventListener('touchend', unlock); };
      window.addEventListener('pointerdown', unlock); window.addEventListener('touchend', unlock, { passive: true });
    }

    // ---- Pegel-Test ohne Lautsprecher: Thema offline rendern und messen ----
    async function renderOffline(seconds = 6, { region = 'hafen', veil = 0, puls = 0, sampleRate = 22050, veilAt = null, motifAt = null, sfxAt = null, step = 0.1 } = {}) {
      const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!OAC) throw new Error('OfflineAudioContext fehlt');
      const ctx = new OAC(1, Math.ceil(seconds * sampleRate), sampleRate);
      const a = createAudio({ context: ctx });
      a.setVolume(1); a.setMusicVolume(1);            // schlimmster Fall: alles voll aufgedreht
      const m = createMusic({ audio: a, events: createEvents(), rng: game.rng.fork('offline') });
      m.setRegion(region); m.setVeil(veil); m.setPuls(puls); m.start();
      const q = 128 / sampleRate;
      const times = [];
      for (let t = step; t < seconds - step / 2; t += step) times.push(Math.round(t / q) * q);
      const susp = times.map((t) => ctx.suspend(t).then(() => {
        if (veilAt && t >= veilAt.t && !veilAt.done) { veilAt.done = true; m.setVeil(veilAt.veil); }
        if (motifAt && t >= motifAt.t && !motifAt.done) { motifAt.done = true; m.motif(motifAt.id || 'freude', { at: ctx.currentTime + 0.05 }); }
        if (sfxAt && t >= sfxAt.t && !sfxAt.done) { sfxAt.done = true; a.play(sfxAt.name || 'restore'); }
        a.update(); m.update();
        return ctx.resume();
      }));
      const rendered = ctx.startRendering();
      await Promise.all(susp);
      const buf = await rendered;
      return { ...analyze(buf.getChannelData(0), sampleRate), region, veil, puls, seconds };
    }
    // Spitze (dBFS); Lautheits-Hüllkurve (RMS über 100 ms, alle 20 ms); größter ANSTIEG zwischen zwei Fenstern im Abstand von
    // 100 ms, sobald es schon hörbar war (> −45 dB) – misst „plötzlich laut“, nicht den normalen Anschlag aus der Stille.
    function analyze(data, sr) {
      let peak = 0;
      for (let i = 0; i < data.length; i++) { const v = Math.abs(data[i]); if (v > peak) peak = v; }
      const win = Math.floor(sr * 0.1), hop = Math.floor(sr * 0.02);
      const env = [];
      for (let i = 0; i + win <= data.length; i += hop) { let s = 0; for (let k = i; k < i + win; k++) s += data[k] * data[k]; env.push(Math.sqrt(s / win)); }
      const db = (v) => 20 * Math.log10(Math.max(v, 1e-6));
      let maxJump = 0, at = 0;
      for (let i = Math.max(5, Math.round(0.6 / 0.02)); i < env.length; i++) {
        const a = db(env[i - 5]), b = db(env[i]);
        if (a < -45) continue;
        const d = b - a;
        if (d > maxJump) { maxJump = d; at = i * 0.02; }
      }
      const rms = Math.sqrt(env.reduce((s, v) => s + v * v, 0) / Math.max(1, env.length));
      return { peakDb: +db(peak).toFixed(2), peak: +peak.toFixed(4), maxJumpDb: +maxJump.toFixed(2), jumpAt: +at.toFixed(2), rmsDb: +db(rms).toFixed(2), windows: env.length };
    }

    return { music, speech, renderOffline, applySettings };
  },
};
