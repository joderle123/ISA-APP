// Unit-Tests WP20 (Node, ohne Browser): Musik-Theorie und Muster (rein), Vorlese-Warteschlange mit Ersatz-Synthese,
// Decke der Pegelkette. Aufruf: node --test tests/unit/audio.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, REGION_THEMES, MOTIFS, KLARKLANG, SCALES, layerMix, isConsonant, patternFor, midiToFreq, tempoFactor, cutoffFor, chordDegrees } from '../../src/engine/music.js';
import { createSpeech, cleanText, pickVoice, DEFAULT_RATE, LANG } from '../../src/engine/speech.js';
import { ceilingCurve, CEILING } from '../../src/engine/audio.js';
import { createEvents } from '../../src/engine/events.js';

test('musik: 10 Regionen-Themen mit je 4 Schichten, Jukebox-Loops getrennt', () => {
  assert.equal(REGION_THEMES.length, 10);
  for (const id of ['hafen', 'strand', 'dschungel', 'klippen', 'moor', 'markt', 'vulkan', 'glimmer', 'quellen', 'leuchtturm']) {
    assert.ok(THEMES[id], id);
    assert.equal(THEMES[id].layers.length, 4, id + ' hat 4 Schichten');
    assert.ok(SCALES[THEMES[id].scale], id + ' Skala');
    assert.ok(THEMES[id].bpm >= 60 && THEMES[id].bpm <= 130);
  }
  assert.ok(THEMES['jukebox-runter'].jukebox && THEMES['jukebox-auf'].jukebox);
  assert.ok(THEMES['jukebox-auf'].bpm > THEMES['jukebox-runter'].bpm);
});

test('musik: Schleier-Mischung – grau eine Schicht, frei alle vier, dazwischen weich', () => {
  assert.deepEqual(layerMix(1), [1, 0, 0, 0]);
  assert.deepEqual(layerMix(0), [1, 1, 1, 1]);
  const mid = layerMix(0.5);
  assert.ok(mid[1] > 0.9 && mid[2] > 0 && mid[2] < 1 && mid[3] === 0, JSON.stringify(mid));
  let prev = layerMix(1);
  for (let v = 0.95; v >= 0; v -= 0.05) { const m = layerMix(v); for (let i = 0; i < 4; i++) assert.ok(m[i] >= prev[i] - 1e-9, 'monoton'); prev = m; }
  assert.ok(cutoffFor(1, 0) < cutoffFor(0, 0) && cutoffFor(0, 100) < cutoffFor(0, 0));
  assert.ok(tempoFactor(0) === 1 && tempoFactor(100) > 1.05 && tempoFactor(100) < 1.1);
});

test('musik: Muster sind deterministisch, in der Tonart und im hörbaren Bereich', () => {
  for (const id of REGION_THEMES) {
    const theme = THEMES[id];
    const sc = SCALES[theme.scale];
    for (let l = 0; l < 4; l++) {
      const a = patternFor(id, l, 3), b = patternFor(id, l, 3);
      assert.deepEqual(a, b, 'gleicher Takt → gleiches Muster');
      assert.ok(a.length > 0, `${id} Schicht ${l} ist nicht leer`);
      for (const n of a) {
        assert.ok(n.step >= 0 && n.step < 16 && n.dur > 0 && n.vel > 0 && n.vel <= 1.0001);
        if (n.midi) {
          assert.ok(n.midi >= 36 && n.midi <= 100, `${id}/${l}: midi ${n.midi}`);
          assert.ok(sc.includes((((n.midi - theme.root) % 12) + 12) % 12), `${id}/${l}: ${n.midi} liegt in der Skala`);
        }
      }
    }
    assert.equal(chordDegrees(theme, 0).length, 3);
  }
  assert.deepEqual(patternFor('gibtsnicht', 0, 0), []);
  assert.ok(Math.abs(midiToFreq(69) - 440) < 1e-9);
});

test('musik: sechs Vogel-Leitmotive + Welle, Klarklang konsonant/dissonant', () => {
  for (const e of ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung', 'welle']) {
    const m = MOTIFS[e];
    assert.ok(m && m.notes.length === m.durs.length && m.notes.length >= 3, e);
  }
  assert.equal(isConsonant(KLARKLANG.konsonant), true);
  assert.equal(isConsonant(KLARKLANG.dur), true);
  assert.equal(isConsonant(KLARKLANG.sus), true);
  assert.equal(isConsonant(KLARKLANG.dissonant), false);
  assert.equal(isConsonant([0, 6]), false, 'Tritonus');
  assert.equal(isConsonant([0, 1]), false, 'kleine Sekunde');
  assert.equal(isConsonant([0, 4, 7]), true);
});

test('audio: weiche Decke endet exakt bei −6 dBFS und ist unterhalb des Knies linear', () => {
  const c = ceilingCurve(4096);
  let max = 0;
  for (const v of c) max = Math.max(max, Math.abs(v));
  assert.ok(max <= CEILING + 1e-6 && max > CEILING - 0.01, 'max ' + max);
  assert.ok(Math.abs(20 * Math.log10(CEILING) + 6.02) < 0.01);
  const i = Math.round((0.2 + 1) / 2 * 4095);
  assert.ok(Math.abs(c[i] - 0.2) < 0.002, 'linear bei 0,2');
  assert.ok(Math.abs(c[4095] + c[0]) < 1e-6, 'symmetrisch');
});

// Ersatz-Sprachausgabe: meldet Ende nach kurzer Zeit
function fakeSynth() {
  const spoken = [];
  return {
    spoken,
    getVoices: () => [{ lang: 'en-US', name: 'Samantha' }, { lang: 'de-DE', name: 'Anna', localService: true }, { lang: 'de-AT', name: 'Michael' }],
    speak(u) { spoken.push(u); setTimeout(() => u.onend && u.onend(), 5); },
    cancel() { this.cancelled = (this.cancelled || 0) + 1; },
  };
}
class FakeUtterance { constructor(text) { this.text = text; } }

test('vorlesen: de-DE, Tempo 0,95, Warteschlange in Reihenfolge, Ducking', async () => {
  const synth = fakeSynth();
  const events = createEvents();
  const ducks = [];
  const audio = { setDucking: (v) => ducks.push(v) };
  const speech = createSpeech({ synth, Utterance: FakeUtterance, events, audio });
  assert.equal(speech.available, true);
  assert.equal(speech.voice.name, 'Anna');
  assert.equal(speech.voices.length, 2);
  const order = [];
  events.on('speech:start', (e) => order.push(e.text));
  const a = speech.speak('Hi. Du bist neu hier, oder?', { who: 'jolie', voice: { pitch: 1.15 } });
  const b = speech.speak({ t: 'Moien!', tts: 'Moien' }, { who: 'ilda' });
  assert.equal(speech.queue, 1);
  assert.equal(speech.speaking, true);
  const ra = await a; const rb = await b;
  assert.equal(ra.done, true); assert.equal(rb.done, true);
  assert.deepEqual(order, ['Hi. Du bist neu hier, oder?', 'Moien']);
  assert.equal(synth.spoken[0].lang, LANG);
  assert.ok(Math.abs(synth.spoken[0].rate - DEFAULT_RATE) < 1e-9, 'Tempo 0,95');
  assert.ok(Math.abs(synth.spoken[0].pitch - 1.15) < 1e-9);
  assert.equal(synth.spoken[0].voice.name, 'Anna');
  assert.equal(ducks[0], 0.8);
  assert.equal(ducks[ducks.length - 1], 0);
  assert.equal(speech.speaking, false);
});

test('vorlesen: Glimm stumm, Auto-Vorlesen nur mit Schalter, Abbrechen, Text-Bereinigung', async () => {
  const synth = fakeSynth();
  const speech = createSpeech({ synth, Utterance: FakeUtterance, settings: { glimmMuted: true } });
  const r = await speech.speak('Gefühle? Nutzlos.', { who: 'glimm' });
  assert.equal(r.skipped, true); assert.equal(r.muted, true);
  assert.equal(synth.spoken.length, 0);
  speech.set('glimmMuted', false);
  const r2 = await speech.speak('Okay. Die war gut.', { who: 'glimm' });
  assert.equal(r2.done, true);
  const auto = await speech.speak('Automatisch?', { auto: true });
  assert.equal(auto.skipped, true, 'ohne autoRead wird nichts vorgelesen');
  speech.set('autoRead', true);
  const auto2 = await speech.speak('Automatisch!', { auto: true });
  assert.equal(auto2.done, true);
  // Abbrechen leert die Schlange
  const p1 = speech.speak('Eins'); const p2 = speech.speak('Zwei'); const p3 = speech.speak('Drei');
  speech.cancel();
  const [c1, c2, c3] = await Promise.all([p1, p2, p3]);
  assert.equal(c1.cancelled, true); assert.equal(c2.cancelled, true); assert.equal(c3.cancelled, true);
  assert.equal(speech.queue, 0);
  assert.equal(cleanText('Regeln … Gähn 😂 · LUMO'), 'Regeln, Gähn, Lumo');
  assert.equal(cleanText(null), '');
  assert.equal(pickVoice([]), null);
  assert.equal(pickVoice([{ lang: 'de-DE', name: 'Google Deutsch' }, { lang: 'de-DE', name: 'Anna', localService: true }]).name, 'Anna');
  // Ohne Sprachausgabe: nie hängen
  const none = createSpeech({ synth: null });
  assert.equal(none.available, false);
  const rn = await none.speak('Hallo');
  assert.equal(rn.skipped, true);
});
