// Vorlage wuerfel (WP39): Muschel-Mäxchen gegen eine Figur. Du würfelst verdeckt und sagst an (Wahrheit oder Bluff),
// die Figur glaubt oder ruft „Zeig!“. Ist die Figur dran, zeigt ihr Porträt beim Bluff ihren Tell – je Modus stärker
// (Entspannt deutlich, Profi subtil). Wer drei Muscheln verliert, hat verloren.
//   params: { partner (Figur), shells } · Ergebnis: { score, won, shells, calls, fails: 0 }
import { createMaexchen, RANKS, MAEXCHEN, TELL_LABEL } from './logic.js';
import { faceSvg } from './face.js';
import { esc } from '../../ui/overlay.js';

const label = (v) => (v === MAEXCHEN ? 'Mäxchen' : String(v));
const LINES = { start: ['Muschel-Mäxchen? Los.', 'Drei Muscheln. Wer bluffen kann, gewinnt.'], believe: ['Okay. Glaub ich.', 'Hm. Na gut.'], call: ['Zeig!', 'Das glaub ich nicht. Zeig!'], caught: ['Ertappt.', 'Mist. Erwischt.'], won: ['Ha! Deine Muschel.', 'Zu leicht.'], lost: ['Okay. Du hast es drauf.', 'Nochmal? Bitte.'] };

export default {
  id: 'wuerfel', world: false, hint: 'Schau ihr ins Gesicht, bevor du glaubst.',
  create(ctx) {
    const { def, params, mount, audio, icon, game, state } = ctx;
    const partner = params.partner || (ctx.opts && ctx.opts.who) || 'tun';
    const npcDef = game.content.get('npcs', partner) || { id: partner, name: partner, icon: 'punkt', color: '#ffd23f', look: {} };
    const name = game.npcs && game.npcs.nameOf ? game.npcs.nameOf(partner) : npcDef.name;
    const tell = game.npcs && game.npcs.tell ? game.npcs.tell(partner) : { bluff: (npcDef.tell && npcDef.tell.bluff) || 'blick-weg', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 }[ctx.mode] || 0.6 };
    const sharp = { entspannt: 0.25, abenteuer: 0.5, profi: 0.8 }[ctx.mode] || 0.5;
    const G = createMaexchen({ rng: ctx.rng, tell, shells: params.shells || 3, sharp });
    let done = false, face = { tell: null, amp: 0, mood: 'neutral' }, line = ctx.rng.pick ? ctx.rng.pick(LINES.start) : LINES.start[0], showNpcDice = null, busy = false;
    const look = npcDef.look || {};
    const say = (k) => { const arr = LINES[k]; line = arr[Math.floor((ctx.rng.next ? ctx.rng.next() : Math.random()) * arr.length)]; };

    function render(actions) {
      const you = G.dice, prev = G.prev;
      mount.innerHTML = `<div class="mg-two">
        <div class="mg-card"><div class="mg-face" data-face>${faceSvg({ color: npcDef.color, skin: look.skin, hair: look.hair, tell: face.tell, amp: face.amp, mood: face.mood })}</div>
          <b>${esc(name)}</b><div class="mg-shells" data-shells-npc>${Array.from({ length: params.shells || 3 }, (_, i) => `<i class="${i < G.shells.npc ? 'is-on' : ''}"></i>`).join('')}</div>
          <p class="mg-cup" data-line>${esc(line)}</p>
          <div class="mg-dice">${showNpcDice ? showNpcDice.map((d) => `<span class="mg-die">${d}</span>`).join('') : `<span class="mg-die is-hidden">?</span><span class="mg-die is-hidden">?</span>`}</div>
          ${G.announced !== null && G.turn === 'npc' ? `<p class="mg-cup">${esc(name)} sagt: <b>${label(G.announced)}</b></p>` : ''}</div>
        <div class="mg-card"><b>Du</b><div class="mg-shells" data-shells-du>${Array.from({ length: params.shells || 3 }, (_, i) => `<i class="${i < G.shells.du ? 'is-on' : ''}"></i>`).join('')}</div>
          <div class="mg-dice">${you ? you.map((d) => `<span class="mg-die">${d}</span>`).join('') : `<span class="mg-die is-hidden">·</span><span class="mg-die is-hidden">·</span>`}</div>
          <p class="mg-cup">${prev !== null ? `Vorgabe: <b>${label(prev)}</b>` : 'Noch keine Vorgabe.'}${ctx.hint ? `<br><span style="color:var(--c-mint)">${esc(ctx.hint)}</span>` : ''}</p>
          <div class="mg-tiles" data-actions>${actions}</div></div></div>`;
    }
    const tile = (id, text, ic, extra = '') => `<button class="mg-tile" type="button" data-act="${id}" ${extra}><span class="mg-tile-icon">${icon(ic, { size: 22 })}</span><span>${esc(text)}</span></button>`;
    function bind() { mount.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => { if (busy) return; onAct(b.dataset.act, b.dataset.value); })); }

    function yourTurn() {
      face = { tell: null, amp: 0, mood: 'neutral' }; showNpcDice = null;
      render(tile('roll', 'Würfeln', 'drehen'));
      bind();
    }
    function afterRoll() {
      const opts = G.options();
      render(opts.map((o) => tile('announce', `Sagen: ${label(o.value)}`, o.truth ? 'check' : 'sprechblase', `data-value="${o.value}"`)).join(''));
      bind();
    }
    async function onAct(act, value) {
      if (done) return;
      if (act === 'roll') { G.roll(); if (audio) audio.play('click'); afterRoll(); return; }
      if (act === 'announce') {
        G.announce(+value);
        if (audio) audio.play('tile');
        busy = true;
        render(''); await wait(700);
        const d = G.npcDecide();
        if (d.call) {
          say('call'); const r = G.resolveCall('npc');
          face = { tell: null, amp: 0, mood: r.truth ? 'ertappt' : 'froh' };
          if (audio) audio.play(r.loser === 'du' ? 'error' : 'pickup');
          render(''); await wait(1100);
          busy = false;
          return next(r);
        }
        say('believe'); face = { tell: null, amp: 0, mood: 'neutral' };
        render(''); await wait(700);
        busy = false;
        return npcTurn();
      }
      if (act === 'believe') { G.believe(); if (audio) audio.play('click'); face = { tell: null, amp: 0, mood: 'froh' }; busy = true; render(''); await wait(500); busy = false; return yourTurn(); }
      if (act === 'call') {
        const r = G.call();
        showNpcDice = !r.actual ? null : r.actual % 11 === 0 ? [r.actual / 11, r.actual / 11] : [Math.floor(r.actual / 10), r.actual % 10];
        say(r.truth ? 'won' : 'caught'); face = { tell: null, amp: 0, mood: r.truth ? 'froh' : 'ertappt' };
        if (audio) audio.play(r.truth ? 'error' : 'pickup');
        busy = true; render(''); await wait(1300); busy = false;
        return next(r);
      }
    }
    function npcTurn() {
      const r = G.npcTurn();
      face = r.tell ? { tell: r.tell.bluff, amp: r.tell.amp, mood: 'neutral' } : { tell: null, amp: 0, mood: 'neutral' };
      showNpcDice = null;
      line = `${label(r.value)}.`;
      if (audio) audio.play('bubble');
      render(tile('believe', 'Glauben', 'check') + tile('call', 'Zeig!', 'augen'));
      bind();
    }
    function next() {
      if (G.done) return finish();
      if (G.turn === 'du') yourTurn(); else npcTurn();
    }
    function finish() {
      if (done) return; done = true;
      const won = G.winner === 'du';
      const shells = G.shells.du, max = params.shells || 3;
      const score = won ? 0.5 + 0.5 * (shells / max) : 0.4 * (shells / max);
      ctx.finish({ score: +score.toFixed(3), won, shells, lost: max - shells, calls: G.calls, text: won ? `${name}: „${LINES.lost[0]}“` : `${name}: „${LINES.won[0]}“`, fails: 0 });
    }
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    return {
      G, get face() { return face; },
      start() { if (G.turn === 'du') yourTurn(); else npcTurn(); },
      stop() { done = true; },
      // Tests: auto('gold') = Sieg ohne Verlust, 'silber' = Sieg mit einer verlorenen Muschel, 'fail' = Niederlage
      auto(level = 'gold') {
        const max = params.shells || 3;
        if (level === 'fail') G.shells.du = 0; else { G.shells.npc = 0; G.shells.du = level === 'gold' ? max : level === 'silber' ? max - 1 : 1; }
        G.calls.right = level === 'gold' ? 3 : 1; G.calls.wrong = level === 'gold' ? 0 : 1;
        finish();
      },
      act(name, v) { if (name === 'roll' || name === 'announce' || name === 'believe' || name === 'call') { onAct(name, v); return true; } if (name === 'tell') { return face; } return false; },
    };
  },
};
