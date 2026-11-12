// Abend am Feuer (WP21-Hülle für WP42, DESIGN §3): 60–90 s. Bis zu 3 Figuren sagen je einen Satz zu deiner Tat,
// Glimm fragt „Bester Moment heute?“ (drei Bilder, das gewählte fliegt als Glühwürmchen ins Glas), ein Cliffhanger,
// dann wird gespeichert. X beendet jederzeit (und speichert trotzdem).
//   const campfire = createCampfire({ overlay, speech, audio, icon, game, speakers });
//   campfire.show({ lines: [{ who, text }], moments: [{ id, icon, title, color }], cliffhanger, save = true, read = 'auto' })
//     → Promise<{ moment: id|null, closed: boolean }>
//   DOM: .ov[data-overlay=campfire] · .cf-line[data-line] · [data-moment=id] · [data-cf-next] · [data-cf-end]
import { esc } from './overlay.js';
import { countWords } from '../content/schema/text.js';

export function createCampfire({ overlay, speech, audio, icon, game, speakers }) {
  let active = null;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function show({ lines = [], moments = [], cliffhanger = '', save = true, read = 'auto', title = 'Abend am Feuer' } = {}) {
    if (active) active.close('replace');
    return new Promise((resolve) => {
      let done = false, moment = null, nextResolver = null;
      const autoRead = speech && (read === true || (read === 'auto' && speech.settings.autoRead));
      const finish = (closed) => {
        if (done) return; done = true;
        if (speech) speech.cancel();
        if (save && game.save) { try { game.save.request('force'); } catch (e) { /* egal */ } }
        active = null;
        if (game.events) game.events.emit('campfire:done', { moment, closed });
        resolve({ moment, closed });
      };
      const h = overlay.open({
        id: 'campfire', title, icon: 'feuer', kind: 'full', pause: true, cls: 'ov-campfire', closeLabel: 'Für heute Schluss',
        content: (body) => {
          body.innerHTML = `
            <div class="cf-scene" aria-hidden="true"><div class="cf-glow"></div><div class="cf-fire">${icon('feuer', { size: 96 })}</div><div class="cf-sparks"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
            <div class="cf-stage"></div>
            <div class="cf-glass" aria-hidden="true">${icon('glas', { size: 44 })}<span class="cf-glass-count"></span></div>`;
        },
        onClose: (reason) => finish(reason !== 'end'),
      });
      active = h;
      const stage = h.body.querySelector('.cf-stage');
      const glassCount = h.body.querySelector('.cf-glass-count');
      const glas = (game.state && game.state.get('baumhaus.glas')) || [];
      glassCount.textContent = glas.length ? String(glas.length) : '';

      const waitNext = () => new Promise((r) => { nextResolver = r; });
      const card = (html, cls = '') => { const el = document.createElement('div'); el.className = 'cf-card ' + cls; el.innerHTML = html; stage.appendChild(el); requestAnimationFrame(() => el.classList.add('is-in')); return el; };
      const clearStage = () => { stage.querySelectorAll('.cf-card').forEach((c) => { c.classList.add('is-out'); setTimeout(() => c.remove(), 260); }); };

      (async () => {
        // 1) Zeilen der Figuren
        for (let i = 0; i < Math.min(3, lines.length) && !done; i++) {
          const ln = lines[i];
          const sp = speakers ? speakers(ln.who) : { name: ln.who, icon: 'sprechblase', color: '#ffd166', voice: {} };
          const text = typeof ln.text === 'object' ? ln.text.t : ln.text;
          if (countWords(text) > 12) console.warn(`[campfire] „${text}“ hat mehr als 12 Wörter`);
          clearStage();
          const el = card(`
            <div class="cf-line" data-line="${i}" style="--who:${esc(sp.color)}">
              <span class="cf-avatar">${icon(sp.icon, { size: 30 })}</span>
              <div class="cf-line-body"><b>${esc(sp.name)}</b><p>${esc(text)}</p></div>
              ${speech && speech.canRead(sp.id) ? `<button class="bubble-read" type="button" data-read aria-label="Vorlesen">${icon('lautsprecher', { size: 24 })}</button>` : ''}
            </div>
            <div class="cf-actions"><button class="btn btn-primary" type="button" data-cf-next>${icon('weiter', { size: 24 })}<span>Weiter</span></button></div>`);
          if (audio) audio.play('bubble');
          const rb = el.querySelector('[data-read]');
          if (rb) rb.addEventListener('click', () => speech.speak(text, { who: sp.id, voice: sp.voice, interrupt: true }));
          el.querySelector('[data-cf-next]').addEventListener('click', () => { if (audio) audio.play('tile'); nextResolver && nextResolver(); });
          if (autoRead && speech.canRead(sp.id)) speech.speak(text, { who: sp.id, voice: sp.voice, interrupt: true, auto: read !== true });
          await waitNext();
        }
        // 2) Bester Moment (ab e05: WP42 liefert die Bilder)
        if (!done && moments.length) {
          clearStage();
          const el = card(`
            <div class="cf-line" data-line="glimm" style="--who:#2de2c9">
              <span class="cf-avatar">${icon('glimm', { size: 30 })}</span>
              <div class="cf-line-body"><b>Glimm</b><p>Bester Moment heute?</p></div>
            </div>
            <div class="cf-moments">${moments.slice(0, 3).map((m) => `
              <button class="cf-moment" type="button" data-moment="${esc(m.id)}" style="--card:${esc(m.color || '#ffd166')}">
                <span class="cf-moment-art">${icon(m.icon || 'stern', { size: 44 })}</span><span class="cf-moment-title">${esc(m.title || '')}</span>
              </button>`).join('')}</div>`);
          if (autoRead && speech.canRead('glimm')) speech.speak('Bester Moment heute?', { who: 'glimm', voice: { pitch: 1.35, rate: 1.05 }, interrupt: true, auto: read !== true });
          await new Promise((r) => {
            nextResolver = r;
            el.querySelectorAll('[data-moment]').forEach((b) => b.addEventListener('click', () => {
              moment = b.dataset.moment;
              b.classList.add('is-picked');
              if (audio) audio.play('firefly');
              // Glühwürmchen fliegt ins Glas
              const fly = document.createElement('span'); fly.className = 'cf-firefly';
              const r0 = b.getBoundingClientRect(), r1 = h.body.querySelector('.cf-glass').getBoundingClientRect();
              fly.style.left = (r0.left + r0.width / 2) + 'px'; fly.style.top = (r0.top + r0.height / 2) + 'px';
              fly.style.setProperty('--dx', (r1.left + r1.width / 2 - r0.left - r0.width / 2) + 'px');
              fly.style.setProperty('--dy', (r1.top + r1.height / 2 - r0.top - r0.height / 2) + 'px');
              h.el.appendChild(fly);
              setTimeout(() => { fly.remove(); glassCount.textContent = String(glas.length + 1); h.body.querySelector('.cf-glass').classList.add('is-lit'); }, 1100);
              if (game.state) game.state.push('baumhaus.glas', { moment, day: game.state.get('time.day', 1) });
              setTimeout(r, 1300);
            }));
          });
        }
        // 3) Cliffhanger, dann speichern
        if (!done) {
          clearStage();
          card(`
            ${cliffhanger ? `<div class="cf-cliff"><span class="cf-cliff-icon">${icon('mond', { size: 30 })}</span><p>${esc(cliffhanger)}</p></div>` : ''}
            <div class="cf-saved">${icon('speichern', { size: 22 })}<span>Gespeichert.</span></div>
            <div class="cf-actions"><button class="btn btn-primary btn-big" type="button" data-cf-end>${icon('mond', { size: 26 })}<span>Bis morgen</span></button></div>`);
          if (cliffhanger && autoRead) speech.speak(cliffhanger, { who: 'erzaehler', interrupt: true, auto: read !== true });
          if (save && game.save) { try { game.save.request('force'); } catch (e) { /* egal */ } }
          await wait(50);
          const end = stage.querySelector('[data-cf-end]');
          if (end) end.addEventListener('click', () => { if (audio) audio.play('close'); h.close('end'); });
        }
      })().catch((e) => console.error('[campfire]', e));
    });
  }
  return { show, get active() { return !!active; } };
}
