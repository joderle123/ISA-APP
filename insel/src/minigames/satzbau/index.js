// Vorlage satzbau (WP37): Kacheln in Slots, oben entsteht der Satz, jede Kachel ist vorlesbar und hat eine Ton-Vorschau
// (Klarklang: Dornen klingen dissonant). „Klang“ bewertet nach dem Regelset (rules.js): Klarklang, Schmiede mit
// Brettphysik (Glas bricht, Zukunft zu spät, trägt nicht, wächst), Kompliment (Laterne steigt/sinkt/kippt), Zusammenfassung,
// Kommentar, Nein + Vorschlag. Wirkungen aus def.outcome.{clean, thorn, <physics>} laufen über die DSL.
//   Ergebnis: { score, clean, thorn, physics, text, picked, ok } (die Dialog-Engine liest clean/thorn)
import { evaluate, tileTone } from './rules.js';
import { esc } from '../../ui/overlay.js';

const TONE_RULESETS = new Set(['klarklang', 'kommentar', 'nein-vorschlag', 'zusammenfassung']);

export default {
  id: 'satzbau', world: false, hint: 'Hör auf den Ton. Schief klingt, was verletzt.',
  create(ctx) {
    const { def, mount, audio, speech, icon, game, state, textOf } = ctx;
    const music = game.music || null;
    const picked = {};
    let done = false;
    // Kacheln aus dem Taten-Log (Komplimente für Taten): { fromDeeds: true, max }
    const expandTiles = (slot) => {
      const out = [];
      for (const t of slot.tiles || []) {
        if (t && t.fromDeeds) {
          const log = (state.get('deedLog', []) || []).filter((d) => d && d.text).slice(-(t.max || 3)).reverse();
          for (const d of log) out.push({ t: d.text, kind: 'tat', deed: d.id });
          if (!log.length && t.fallback) for (const f of t.fallback) out.push({ ...f, kind: 'tat' });
        } else out.push(typeof t === 'string' ? { t } : t);
      }
      return out;
    };
    const slots = (def.slots || []).map((s) => ({ ...s, tiles: expandTiles(s) }));

    function sentence() {
      return slots.map((s) => {
        const v = picked[s.id];
        const arr = v === undefined ? [] : Array.isArray(v) ? v : [v];
        if (!arr.length) return `<span class="mg-gap" data-gap="${esc(s.id)}">${esc(s.stub || '')}</span>`;
        return arr.map((t) => `<span class="mg-word${t.thorn ? ' is-dorn' : ''}">${esc(textOf(t.t || t))}</span>`).join(' ');
      }).join(' ');
    }
    function render() {
      mount.innerHTML = `<p class="mg-sentence" data-sentence>${sentence()}</p>${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}
        ${slots.map((s) => `<section class="mg-slot" data-slot="${esc(s.id)}"><h4>${esc(textOf(s.label))}</h4><div class="mg-tiles">${s.tiles.map((t, i) => `<button class="mg-tile" type="button" data-tile="${i}">${t.icon ? `<span class="mg-tile-icon">${icon(t.icon, { size: 22 })}</span>` : ''}<span>${esc(textOf(t.t || t))}</span>${speech && speech.available ? `<span class="choice-read" data-read role="button" aria-label="Vorlesen">${icon('lautsprecher', { size: 20 })}</span>` : ''}</button>`).join('')}</div></section>`).join('')}
        <div class="mg-board" data-board hidden></div>
        <p class="mg-guideline" data-result></p>
        <div class="mg-actions"><button class="btn btn-primary btn-big" type="button" data-klang disabled>${icon('horn', { size: 26 })}<span>Klang</span></button></div>`;
      const klang = mount.querySelector('[data-klang]');
      mount.querySelectorAll('.mg-slot').forEach((sec) => {
        const slot = slots.find((s) => s.id === sec.dataset.slot);
        sec.querySelectorAll('[data-tile]').forEach((b) => b.addEventListener('click', (e) => {
          if (done) return;
          const tile = slot.tiles[+b.dataset.tile];
          if (e.target.closest('[data-read]')) { if (speech) speech.speak(textOf(tile.t || tile), { who: 'du', interrupt: true }); return; }
          pick(slot, tile, b, sec);
        }));
      });
      klang.addEventListener('click', () => submit());
      syncKlang();
    }
    function pick(slot, tile, btn, sec) {
      if (slot.multi) {
        const arr = Array.isArray(picked[slot.id]) ? picked[slot.id] : [];
        const i = arr.indexOf(tile);
        if (i >= 0) arr.splice(i, 1); else arr.push(tile);
        picked[slot.id] = arr;
        btn.classList.toggle('is-on', i < 0);
      } else {
        picked[slot.id] = tile;
        sec.querySelectorAll('[data-tile]').forEach((x) => x.classList.toggle('is-on', x === btn));
      }
      // Ton-Vorschau: Klarklang-Akkord (konsonant/dissonant) oder ein neutraler Klick
      const tone = TONE_RULESETS.has(def.ruleset) ? tileTone(def, tile) : null;
      if (music && music.klarklang && tone) music.klarklang(tone === 'dissonant' ? 'dissonant' : 'konsonant', { seconds: 1.1 });
      else if (audio) audio.play('tile');
      const s = mount.querySelector('[data-sentence]'); if (s) s.innerHTML = sentence();
      syncKlang();
    }
    function syncKlang() {
      const klang = mount.querySelector('[data-klang]');
      if (!klang) return;
      klang.disabled = !slots.every((s) => s.optional || (picked[s.id] !== undefined && (!Array.isArray(picked[s.id]) || picked[s.id].length)));
    }
    async function submit() {
      if (done) return; done = true;
      const r = evaluate(def, picked);
      const res = mount.querySelector('[data-result]');
      res.textContent = r.text;
      res.style.color = r.thorn ? '#ff8c8c' : r.clean ? '#8fd18b' : '#ffd166';
      mount.querySelectorAll('.mg-slot').forEach((sec) => { const v = r.per[sec.dataset.slot]; sec.querySelectorAll('.mg-tile.is-on').forEach((b) => { b.classList.add('is-' + (v === 'dorn' ? 'dorn' : v === 'ok' ? 'ok' : 'leer')); if (v === 'dorn') b.classList.add('is-shake'); }); });
      mount.querySelector('[data-klang]').disabled = true;
      if (music && music.klarklang) music.klarklang(r.thorn ? 'dissonant' : 'konsonant');
      if (audio) audio.play(r.thorn ? 'error' : r.clean ? 'pickup' : 'bubble');
      let wait = 900;
      if (def.ruleset === 'schmiede') wait = animatePlank(r);
      else if (def.ruleset === 'kompliment') wait = animateLantern(r);
      const out = def.outcome || {};
      if (r.clean && out.clean) await ctx.applyEffects(out.clean);
      if (r.thorn && out.thorn) await ctx.applyEffects(out.thorn);
      if (r.physics && out[r.physics]) await ctx.applyEffects(out[r.physics]);
      game.events.emit('satzbau:result', { id: def.id, clean: r.clean, thorn: r.thorn, physics: r.physics, score: r.score });
      const pickedText = Object.fromEntries(Object.entries(picked).map(([k, v]) => [k, Array.isArray(v) ? v.map((t) => textOf(t.t || t)) : textOf(v.t || v)]));
      setTimeout(() => ctx.finish({ score: +r.score.toFixed(3), clean: r.clean, thorn: r.thorn, physics: r.physics, text: r.text, picked: pickedText, sentence: r.sentence, bonus: r.bonus, fails: 0 }), wait);
    }
    // Brettphysik der Schmiede: ein Brett über der Schlucht, eine kleine Figur geht los
    function animatePlank(r) {
      const board = mount.querySelector('[data-board]');
      board.hidden = false;
      const cls = r.physics === 'traegt' ? (r.bonus ? 'is-waechst' : '') : 'is-' + r.physics;
      board.innerHTML = `<div class="mg-plank ${cls}" data-plank></div><div class="mg-walker" data-walker>${icon('sprint', { size: 34 })}</div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => { board.querySelector('[data-walker]').classList.add('is-go'); setTimeout(() => board.querySelector('[data-plank]').classList.add('is-go'), r.physics === 'traegt' ? 200 : 500); }));
      return 1900;
    }
    function animateLantern(r) {
      const board = mount.querySelector('[data-board]');
      board.hidden = false;
      board.innerHTML = `<div class="mg-lantern" data-lantern>${icon('laterne', { size: 64 })}</div>`;
      const cls = r.physics === 'fliegt' ? 'is-steigt' : r.physics === 'faellt' ? 'is-faellt' : 'is-sinkt';
      requestAnimationFrame(() => requestAnimationFrame(() => board.querySelector('[data-lantern]').classList.add(cls)));
      return 1500;
    }
    return {
      slots, picked,
      start() { render(); },
      stop() { done = true; },
      // Tests: auto('gold') wählt die tragenden Kacheln, auto('fail') einen Dorn; act('pick', slotId, tileIndex) · act('klang')
      auto(level = 'gold') {
        for (const s of slots) {
          const good = s.tiles.filter((t) => tileTone(def, t) === 'konsonant' && (def.ruleset !== 'kompliment' || t.kind !== 'leer') && (def.ruleset !== 'zusammenfassung' || t.kind === 'kern'));
          const bad = s.tiles.filter((t) => tileTone(def, t) === 'dissonant');
          const chosen = level === 'fail' ? (bad[0] || s.tiles[0]) : (good[0] || s.tiles[0]);
          picked[s.id] = s.multi ? (level === 'fail' ? [chosen] : good) : chosen;
        }
        submit();
      },
      act(name, slotId, i) {
        if (name === 'pick') { const s = slots.find((x) => x.id === slotId); const sec = mount.querySelector(`[data-slot="${slotId}"]`); const b = sec && sec.querySelectorAll('[data-tile]')[i]; if (!s || !b) return false; pick(s, s.tiles[i], b, sec); return true; }
        if (name === 'klang') { submit(); return true; }
        return false;
      },
    };
  },
};
