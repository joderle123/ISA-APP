// Minispiel-Hülle (WP36, DESIGN §9): Startkarte (Icon, ein Satz, Moduswahl, Bestwert), Lauf im Overlay oder in der Welt
// (HUD mit Zeit, Fortschritt, Geist-Abstand und X), Ergebniskarte mit Bronze/Silber/Gold und dem versteckten Leuchtstern
// (wird nirgends angekündigt, erscheint nur, wenn er erreicht ist), Neustart unter 1 s, „Rückenwind?“ leise nach drei
// Fehlversuchen (langsamer, ein Hinweis), Bestwerte nur auf dem Gerät (state.medals), Geist der Bestzeit (Rennen).
//   const shell = createShell({ game, templates }); shell.play(id|def, opts) → Promise<Ergebnis>
//   Ergebnis: { id, ok, medal, stern, newBest, cancelled, mode, rueckenwind, tries, key, best, …Vorlagenwerte (seconds, hits, score, clean …) }
//   shell.current → { id, def, mode, phase, inst } · shell.bests(id) · shell.lotsen(params) · shell.templates
//   Vorlage: { id, world?: bool, hint?: string, create(ctx) → { start(), stop(), update?(dt, real), auto?(level), act?(name, …) } }
//   ctx: { game, def, id, mode, params, timing, rueckenwind, hint, mount (Overlay-Body) | hud, rng, finish(result), cancel(),
//          line(text), count(n) → Promise, resolvePos(pos), applyEffects(list), textOf, icon, audio, ui, state, events, speech }
//   Ereignisse: minigame:start {id, mode, rueckenwind} · minigame:result {id, medal, stern, ok, newBest, mode, result}
//     · minigame:stern {id} · minigame:end {id, cancelled} · minigame:restart {id}
//   Spielstand: medals.<id> = { best, key, medal, stern, mode, runs, tries, bests:{modus:wert}, ghost? } · session.mgFails.<id>
//   Gesprächs-Vorlagen (T.gespraech: leine, oberflaeche; Kostprobe B): X überspringt jederzeit zur ruhigen Kurzfassung
//     (def.kurz: 1–3 kurze Zeilen) mit derselben Belohnung → { ok: true, kurz: true }; Scheitern heißt „Später.“;
//     nach zwei Fehlversuchen fragt Glimm „Anders probieren?“ mit „Ja, kurz“ / „Nochmal“. Ereignis minigame:kurz {id, why}
import { medalFor, primaryKey, updateBest, formatValue, MEDAL_NAME, MEDAL_COLOR, MEDAL_RANK, timingFor, RUECKENWIND_AFTER, medalCriteria } from './medals.js';
import { esc } from '../../ui/overlay.js';
import { textOf } from '../../content/schema/util.js';
import { applyEffects } from '../../systems/quests/dsl.js';

export const MODE_LABEL = { entspannt: 'Entspannt', abenteuer: 'Abenteuer', profi: 'Profi' };
export const MODE_ICON = { entspannt: 'ruhe', abenteuer: 'kompass', profi: 'blitz' };
const KEY_LABEL = { seconds: 'Zeit', hits: 'Treffer', score: 'Wertung', moves: 'Züge', spilled: 'Verschüttet', lost: 'Verloren' };
const PROG_REASONS = new Set(['los', 'again', 'weiter', 'done', 'replace', 'ende', 'kurz']);
export const KURZ_AFTER = 2;   // Gesprächs-Vorlagen: nach so vielen Fehlversuchen bietet Glimm die Kurzfassung an

export const MINIGAME_CSS = `
.ov-minigame .ov-card{width:min(900px,100%)}
.ov-minigame .ov-body{padding:16px 18px 20px}
.mg-card{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.mg-card .mg-icon{width:88px;height:88px;border-radius:28px;display:grid;place-items:center;background:var(--tile,var(--c-gold,#ffd166));color:var(--ink,#1d1330);box-shadow:0 10px 26px rgba(0,0,0,.35)}
.mg-modes{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.mg-mode{display:inline-flex;align-items:center;gap:8px;min-height:64px;padding:0 18px;border-radius:20px;border:2px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:#fff;font:800 calc(17px * var(--txt-scale,1))/1 inherit;font-family:inherit}
.mg-mode.is-on{background:var(--c-mint,#2de2c9);color:var(--ink,#1d1330);border-color:transparent}
.mg-mode:active{transform:scale(.97)}
.mg-best{display:flex;align-items:center;gap:8px;font-size:calc(16px * var(--txt-scale,1));font-weight:800;opacity:.9}
.mg-best .mg-dot{width:14px;height:14px;border-radius:50%;background:var(--medal,#fff);box-shadow:0 0 0 3px rgba(255,255,255,.15)}
.mg-wind{display:inline-flex;align-items:center;gap:10px;min-height:56px;padding:0 16px;border-radius:18px;border:2px dashed rgba(255,255,255,.3);background:transparent;color:#fff;font:800 calc(16px * var(--txt-scale,1))/1.2 inherit;font-family:inherit;opacity:.85;text-align:left}
.mg-wind small{display:block;font-size:.78em;font-weight:700;opacity:.75}
.mg-wind.is-on{border-style:solid;border-color:var(--c-mint,#2de2c9);background:rgba(45,226,201,.14);opacity:1}
.mg-offer{display:flex;flex-direction:column;align-items:center;gap:10px}
.mg-offer .mg-glimm{margin:0;padding:10px 18px;border-radius:20px;background:rgba(45,226,201,.14);border:2px solid var(--c-mint,#2de2c9);font-size:calc(20px * var(--txt-scale,1));font-weight:900;color:var(--c-mint,#2de2c9)}
.mg-kurz .mg-kurz-lines{display:flex;flex-direction:column;gap:8px;margin:0;padding:0;list-style:none}
.mg-kurz .mg-kurz-lines li{font-size:calc(21px * var(--txt-scale,1));font-weight:800;line-height:1.35;animation:mg-in .5s ease both}
.mg-kurz .mg-kurz-lines li:nth-child(2){animation-delay:.5s}.mg-kurz .mg-kurz-lines li:nth-child(3){animation-delay:1s}
.mg-hintline{margin:0;font-size:calc(16px * var(--txt-scale,1));font-weight:800;color:var(--c-mint,#2de2c9)}
.mg-result .mg-medal{position:relative;width:132px;height:132px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.5),transparent 55%),var(--medal,#6b6480);color:var(--ink,#1d1330);box-shadow:0 12px 30px rgba(0,0,0,.4),inset 0 0 0 6px rgba(0,0,0,.12);animation:mg-pop .5s cubic-bezier(.2,1.4,.4,1)}
.mg-result .mg-medal.is-none{background:rgba(255,255,255,.1);color:#fff;box-shadow:none;border:3px dashed rgba(255,255,255,.3)}
.mg-result .mg-medal.is-stern{box-shadow:0 0 0 8px rgba(255,246,200,.35),0 0 60px 18px rgba(255,236,150,.55)}
.mg-result .mg-stern{position:absolute;inset:-26px;pointer-events:none;animation:mg-spin 14s linear infinite;color:#fff6c8}
.mg-result h3{margin:0;font-size:calc(30px * var(--txt-scale,1));font-weight:900}
.mg-result .mg-score{margin:0;font-size:calc(18px * var(--txt-scale,1));font-weight:800;opacity:.9}
.mg-result .mg-text{margin:0;font-size:calc(20px * var(--txt-scale,1));font-weight:800;color:var(--c-gold,#ffd166)}
.mg-newbest{display:inline-block;padding:4px 12px;border-radius:99px;background:var(--c-mint,#2de2c9);color:var(--ink,#1d1330);font-size:13px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
@keyframes mg-pop{0%{transform:scale(.4);opacity:0}100%{transform:none;opacity:1}}
@keyframes mg-spin{to{transform:rotate(360deg)}}
.mg-body{min-height:200px}
.mg-canvas{display:block;width:100%;border-radius:22px;background:#140b2a;box-shadow:inset 0 0 0 2px rgba(255,255,255,.1)}
.mg-topline{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 10px;font-size:calc(15px * var(--txt-scale,1));font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.mg-topline .mg-prog{display:flex;gap:4px}
.mg-topline .mg-prog i{display:block;width:14px;height:10px;border-radius:3px;background:rgba(255,255,255,.14)}
.mg-topline .mg-prog i.is-hit{background:var(--c-mint,#2de2c9)}.mg-topline .mg-prog i.is-fast{background:var(--c-gold,#ffd166)}.mg-topline .mg-prog i.is-miss{background:#ff6b6b}
.mg-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:14px}
.mg-hold{width:min(420px,100%);min-height:84px;border-radius:26px;border:0;background:linear-gradient(180deg,#fff3c4,var(--c-gold,#ffd166) 60%,#ffa94d);color:var(--ink,#1d1330);font:900 calc(24px * var(--txt-scale,1))/1 inherit;font-family:inherit;box-shadow:0 8px 0 #c2621f;touch-action:none;-webkit-user-select:none;user-select:none}
.mg-hold{font-size:calc(24px * var(--txt-scale,1));font-weight:900}
.mg-hold.is-los{box-shadow:0 8px 0 #c2621f,0 0 0 6px rgba(45,226,201,.55);animation:mg-los .8s ease-in-out infinite alternate}
@keyframes mg-los{to{box-shadow:0 8px 0 #c2621f,0 0 0 14px rgba(45,226,201,.15)}}
.mg-hold.is-down{transform:translateY(6px);box-shadow:0 2px 0 #c2621f;background:linear-gradient(180deg,#d9fff8,var(--c-mint,#2de2c9) 60%,#19b8a0)}
.mg-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.mg-tile{position:relative;display:flex;align-items:center;gap:10px;min-height:72px;padding:8px 10px 8px 14px;border-radius:20px;border:2px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;font:800 calc(18px * var(--txt-scale,1))/1.2 inherit;font-family:inherit;text-align:left;transition:transform .08s ease,background .15s ease,border-color .15s ease}
.mg-tile:active{transform:scale(.97)}
.mg-tile.is-on{background:var(--c-mint,#2de2c9);color:var(--ink,#1d1330);border-color:transparent}
.mg-tile.is-ok{border-color:#8fd18b}.mg-tile.is-dorn{border-color:#ff6b6b;background:rgba(255,107,107,.18)}.mg-tile.is-leer{opacity:.7}
.mg-tile.is-shake{animation:mg-shake .4s ease}
.mg-tile .mg-tile-icon{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--tile,rgba(255,255,255,.14))}
.mg-tile.is-on .mg-tile-icon{background:rgba(0,0,0,.12)}
.mg-tile span{flex:1;min-width:0}
.mg-tile .choice-read{flex:none;width:40px;height:40px;min-width:40px}
@keyframes mg-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.mg-sentence{margin:0 0 12px;padding:14px 18px;border-radius:20px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.12);font-size:calc(21px * var(--txt-scale,1));font-weight:800;line-height:1.35;min-height:60px}
.mg-sentence .mg-gap{display:inline-block;min-width:60px;border-bottom:3px dotted rgba(255,255,255,.4);margin:0 4px}
.mg-sentence .mg-word{display:inline-block;margin:0 4px;padding:0 6px;border-radius:8px;background:rgba(45,226,201,.18)}
.mg-sentence .mg-word.is-dorn{background:rgba(255,107,107,.3)}
.mg-slot{margin:0 0 12px}
.mg-slot h4{margin:0 0 6px;font-size:calc(14px * var(--txt-scale,1));font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.mg-board{position:relative;margin:10px auto 0;width:min(520px,100%);height:120px}
.mg-plank{position:absolute;left:10%;right:10%;top:44px;height:18px;border-radius:9px;background:linear-gradient(180deg,#c99a63,#8a5a2b);box-shadow:0 8px 18px rgba(0,0,0,.4);transform-origin:50% 50%;transition:transform .8s cubic-bezier(.5,0,.8,.4),opacity .6s}
.mg-plank.is-glas{background:linear-gradient(180deg,#d9f4ff,#8ed3ff);opacity:.85}
.mg-plank.is-glas.is-go{opacity:0;transform:scaleX(.3) translateY(40px)}
.mg-plank.is-bricht.is-go{transform:rotate(18deg) translateY(30px);opacity:.3}
.mg-plank.is-spaet.is-go{transform:translateX(60%);opacity:.4}
.mg-plank.is-waechst.is-go{background:linear-gradient(180deg,#8fd18b,#3d8a3d)}
.mg-walker{position:absolute;left:10%;top:6px;transition:left 1.2s ease}
.mg-walker.is-go{left:80%}
.mg-lantern{margin:10px auto 0;width:64px;height:84px;display:grid;place-items:center;color:var(--c-gold,#ffd166);transition:transform 1.2s ease}
.mg-lantern.is-steigt{transform:translateY(-40px)}.mg-lantern.is-sinkt{transform:translateY(40px);opacity:.5}.mg-lantern.is-faellt{transform:rotate(80deg) translateY(30px);opacity:.6}
.mg-attack{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:22px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.14);margin:0 0 12px;animation:mg-in .3s ease}
.mg-attack .mg-attack-icon{flex:none;width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#3a2e5c;color:#d5c9ff}
.mg-attack p{margin:0;flex:1;font-size:calc(21px * var(--txt-scale,1));font-weight:800}
.mg-timebar{height:10px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden;margin:0 0 12px}
.mg-timebar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#2de2c9,#ffd166);transform-origin:left;transition:none}
@keyframes mg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.mg-cmds{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}
.mg-cmd{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:84px;height:76px;border-radius:20px;border:2px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:800 13px/1 inherit;font-family:inherit}
.mg-cmd:active{transform:scale(.95)}.mg-cmd[disabled]{opacity:.4}
.mg-cmd.is-stopp{border-color:var(--c-gold,#ffd166)}
.mg-guideline{margin:8px 0 0;min-height:28px;text-align:center;font-size:calc(18px * var(--txt-scale,1));font-weight:800;color:var(--c-mint,#2de2c9)}
.mg-face{width:150px;height:150px;margin:0 auto}
.mg-shells{display:flex;gap:6px;justify-content:center}
.mg-shells i{display:block;width:22px;height:22px;border-radius:50% 50% 45% 45%;background:#39d0c8;opacity:.25}
.mg-shells i.is-on{opacity:1;box-shadow:0 0 0 2px rgba(255,255,255,.2)}
.mg-dice{display:flex;gap:12px;justify-content:center;margin:10px 0}
.mg-die{width:64px;height:64px;border-radius:16px;background:#fff8e6;color:var(--ink,#1d1330);display:grid;place-items:center;font:900 30px/1 inherit;box-shadow:0 6px 0 #c9b37a}
.mg-die.is-hidden{background:#3a2e5c;color:#d5c9ff;box-shadow:0 6px 0 #241a3a}
.mg-cup{font-size:calc(16px * var(--txt-scale,1));font-weight:800;opacity:.85;text-align:center;margin:4px 0}
.mg-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
@media (max-width:640px){.mg-two{grid-template-columns:1fr}}
.mg-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:center}
.mg-chip{display:inline-flex;align-items:center;gap:8px;min-height:56px;padding:0 14px;border-radius:18px;border:2px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:800 calc(16px * var(--txt-scale,1))/1.2 inherit;font-family:inherit}
.mg-chip.is-on{background:var(--c-gold,#ffd166);color:var(--ink,#1d1330);border-color:transparent}
.mg-chip.is-ok{border-color:#8fd18b}.mg-chip.is-bad{border-color:#ff6b6b}
.mg-cal{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:12px 0}
.mg-day{min-height:96px;padding:8px;border-radius:16px;border:2px dashed rgba(255,255,255,.22);background:rgba(255,255,255,.04);text-align:center;font-size:13px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.mg-day.is-exam{border-style:solid;border-color:var(--c-coral,#ff6b6b)}
.mg-day .mg-chip{display:flex;margin-top:6px;min-height:44px;font-size:14px;text-transform:none;letter-spacing:0}
.mg-code{margin:10px 0 0;padding:10px 14px;border-radius:14px;background:rgba(0,0,0,.25);font:800 15px/1.4 ui-monospace,monospace;word-break:break-all;-webkit-user-select:text;user-select:text}
.mg-input{width:100%;min-height:52px;padding:8px 12px;border-radius:14px;border:2px solid rgba(255,255,255,.2);background:rgba(0,0,0,.25);color:#fff;font:800 16px/1.2 ui-monospace,monospace}
/* HUD in der Welt (Rennen, Folgen) */
.mg-hud{position:absolute;top:calc(74px + var(--safe-t,0px));left:50%;transform:translateX(-50%);z-index:15;display:flex;align-items:center;gap:14px;min-height:60px;padding:6px 8px 6px 16px;border-radius:22px;background:rgba(24,14,44,.74);border:2px solid rgba(255,255,255,.16);color:#fff;font:900 calc(20px * var(--txt-scale,1))/1 inherit;font-family:inherit;backdrop-filter:blur(6px);opacity:0;transition:opacity .25s ease}
.mg-hud.is-in{opacity:1}
.mg-hud .mg-hud-icon{color:var(--c-gold,#ffd166);display:grid;place-items:center}
.mg-hud .mg-hud-time{font-variant-numeric:tabular-nums;min-width:96px}
.mg-hud .mg-hud-info{font-size:.8em;opacity:.85}
.mg-hud .mg-hud-ghost{font-size:.75em;color:var(--c-mint,#2de2c9);min-width:0}
.mg-hud .mg-hud-ghost.is-behind{color:#ff8c8c}
.mg-hud .mg-hud-x{width:52px;height:52px;border-radius:16px;border:2px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;display:grid;place-items:center}
.mg-count{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);z-index:16;font:900 min(22vw,150px)/1 inherit;font-family:inherit;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.6);pointer-events:none;opacity:0}
.mg-count.is-in{animation:mg-count .9s ease}
@keyframes mg-count{0%{opacity:0;transform:translate(-50%,-50%) scale(1.6)}20%{opacity:1;transform:translate(-50%,-50%) scale(1)}80%{opacity:1}100%{opacity:0}}
.mg-line{position:absolute;left:50%;top:calc(150px + var(--safe-t,0px));transform:translateX(-50%);z-index:15;padding:8px 18px;border-radius:99px;background:rgba(24,14,44,.8);color:var(--c-gold,#ffd166);font:900 calc(18px * var(--txt-scale,1))/1.2 inherit;font-family:inherit;opacity:0;transition:opacity .2s ease;pointer-events:none;white-space:nowrap}
.mg-line.is-in{opacity:1}
.mg-ruder{position:absolute;left:50%;bottom:calc(168px + var(--safe-b,0px));transform:translateX(-50%);z-index:26;display:flex;gap:10px;padding:10px;border-radius:24px;background:rgba(24,14,44,.8);border:2px solid rgba(255,255,255,.16)}
.mg-ruder button{width:72px;height:72px;border-radius:20px;border:2px solid rgba(255,255,255,.18);background:var(--tile,#fff);color:var(--ink,#1d1330);display:grid;place-items:center}
.mg-ruder button:active{transform:scale(.95)}
.mg-dark{position:absolute;inset:0;z-index:12;pointer-events:none;background:radial-gradient(circle at 50% 58%,rgba(5,3,12,0) 0,rgba(5,3,12,.55) 12%,rgba(5,3,12,.97) 30%);transition:opacity .6s ease;opacity:0}
.mg-dark.is-in{opacity:1}
.mg-light{position:absolute;z-index:13;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:radial-gradient(circle,#fff 0,#ffd166 35%,rgba(255,209,102,0) 70%);box-shadow:0 0 24px 8px rgba(255,209,102,.55);pointer-events:none;transform:scale(var(--s,1));transition:opacity .3s ease}
.mg-light.is-next{opacity:.35;width:16px;height:16px;margin:-8px 0 0 -8px}
`;

export function createShell({ game, templates }) {
  const { events, state, content, ui, player, audio } = game;
  const icon = ui.icon;
  const speech = game.speech || null;
  const emit = (n, p) => events.emit(n, p);
  let current = null;
  const hudEls = {};

  const modeDefault = () => state.get('settings.mode', 'abenteuer');
  const failsOf = (id) => Number((state.get('session.mgFails') || {})[id] || 0);
  const setFails = (id, n) => state.set('session.mgFails.' + id, n);
  const bests = (id) => state.get('medals.' + id) || null;
  const rngFor = (id) => (game.rng && game.rng.fork ? game.rng.fork('mg-' + id + '-' + (bests(id) ? bests(id).runs || 0 : 0)) : { next: Math.random, float: (a, b) => a + Math.random() * (b - a), int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)), chance: (p) => Math.random() < p, pick: (a) => a[Math.floor(Math.random() * a.length)], shuffle: (a) => a.slice().sort(() => Math.random() - 0.5) });
  function resolvePos(pos) {
    if (!pos) return null;
    const r = content.resolveSite(pos);
    if (r) return { x: r.x, z: r.z, y: r.y, r: r.r, rel: pos.rel };
    if (typeof pos === 'object' && typeof pos.x === 'number') return { x: pos.x, z: pos.z, y: pos.y, r: pos.r, rel: pos.rel };
    return null;
  }

  // ---- HUD in der Welt ----
  function hud() {
    if (hudEls.root) return hudEls;
    const root = document.createElement('div');
    root.className = 'mg-hud hud-interactive';
    root.dataset.mgHud = '1';
    root.innerHTML = `<span class="mg-hud-icon" data-mg-icon></span><span class="mg-hud-time" data-mg-time>0:00,0</span><span class="mg-hud-info" data-mg-info></span><span class="mg-hud-ghost" data-mg-ghost></span><button class="mg-hud-x" type="button" data-mg-exit aria-label="Abbrechen" title="Abbrechen">${icon('x', { size: 26 })}</button>`;
    const count = document.createElement('div'); count.className = 'mg-count'; count.dataset.mgCount = '1';
    const line = document.createElement('div'); line.className = 'mg-line'; line.dataset.mgLine = '1';
    ui.root.appendChild(root); ui.root.appendChild(count); ui.root.appendChild(line);
    root.querySelector('[data-mg-exit]').addEventListener('click', () => { if (audio) audio.play('close'); if (current) cancel(current, 'exit'); });
    Object.assign(hudEls, { root, count, line, time: root.querySelector('[data-mg-time]'), info: root.querySelector('[data-mg-info]'), ghost: root.querySelector('[data-mg-ghost]'), iconEl: root.querySelector('[data-mg-icon]') });
    return hudEls;
  }
  function hudShow(on, def) {
    const h = hud();
    if (def) h.iconEl.innerHTML = icon(def.icon || 'medaille', { size: 26 });
    h.root.classList.toggle('is-in', !!on);
    if (!on) { h.line.classList.remove('is-in'); h.ghost.textContent = ''; h.info.textContent = ''; }
  }
  let lineTimer = 0;
  function line(text, ms = 1800) {
    const h = hud();
    h.line.textContent = text; h.line.classList.add('is-in');
    clearTimeout(lineTimer); lineTimer = setTimeout(() => h.line.classList.remove('is-in'), ms);
  }
  // Countdown 3·2·1·Los (Echtzeit; die Spielfigur steht solange)
  function countdown(n = 3, { seconds = 0.7 } = {}) {
    const h = hud();
    return new Promise((resolve) => {
      let k = n, t = 0;
      const show = (txt) => { h.count.textContent = txt; h.count.classList.remove('is-in'); void h.count.offsetWidth; h.count.classList.add('is-in'); if (audio) audio.play(txt === 'Los!' ? 'chime' : 'click'); };
      show(String(k));
      const off = game.addUpdate((dt, _t, real) => {
        t += real;
        if (t < (k === 0 ? seconds * 0.7 : seconds)) return;
        t = 0; k--;
        if (k > 0) { show(String(k)); return; }
        if (k === 0) { show('Los!'); return; }
        off(); resolve();
      }, { order: 44, always: true });
    });
  }

  // ---- Startkarte ----
  function renderStart(s) {
    const { def } = s;
    const best = bests(s.id);
    const fails = failsOf(s.id);
    const key = primaryKey(def, s.T.id);
    const hint = def.hint || s.T.hint || null;
    const bestLine = best && best.medal ? `<div class="mg-best"><span class="mg-dot" style="--medal:${MEDAL_COLOR[best.stern ? 'stern' : best.medal]}"></span>Bestwert: ${esc(formatValue(best.key || key, best.best))} · ${esc(best.stern ? MEDAL_NAME.stern : MEDAL_NAME[best.medal])}</div>` : '';
    const html = `<div class="mg-card" data-mg-start>
      <span class="mg-icon" style="--tile:${esc(def.color || '#ffd166')}">${icon(def.icon || 'medaille', { size: 46 })}</span>
      <p class="ov-text">${esc(textOf(def.intro) || 'Bereit?')}</p>
      <div class="mg-modes" role="group" aria-label="Modus">${['entspannt', 'abenteuer', 'profi'].map((m) => `<button class="mg-mode${m === s.mode ? ' is-on' : ''}" type="button" data-mode="${m}">${icon(MODE_ICON[m], { size: 22 })}<span>${MODE_LABEL[m]}</span></button>`).join('')}</div>
      ${bestLine}
      ${fails >= RUECKENWIND_AFTER ? `<button class="mg-wind${s.rueckenwind ? ' is-on' : ''}" type="button" data-rueckenwind>${icon('wetter', { size: 26 })}<span>Rückenwind?<small>Langsamer. Ein Hinweis.</small></span></button>` : ''}
      ${s.rueckenwind && hint ? `<p class="mg-hintline" data-mg-hint>${esc(hint)}</p>` : ''}
      <div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-los>${icon('play', { size: 26 })}<span>Los</span></button></div>
    </div>`;
    const mount = (body) => {
      body.classList.remove('mg-body');
      body.innerHTML = html;
      body.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('click'); s.mode = b.dataset.mode; body.querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('is-on', x === b)); }));
      const w = body.querySelector('[data-rueckenwind]');
      if (w) w.addEventListener('click', () => { if (audio) audio.play('tile'); s.rueckenwind = !s.rueckenwind; renderStart(s); });
      body.querySelector('[data-los]').addEventListener('click', () => { if (audio) audio.play('tile'); startGame(s); });
      if (speech && speech.settings.autoRead && !s.readOnce) { s.readOnce = true; speech.speak(textOf(def.intro) || textOf(def.title), { who: 'glimm', auto: true }); }
    };
    if (s.overlay && s.overlay.open) { mount(s.overlay.body); return; }
    s.phase = 'start';
    s.overlay = ui.overlay.open({
      id: 'minigame', title: textOf(def.title) || s.id, icon: def.icon || 'medaille', kind: 'panel', pause: true, cls: 'ov-minigame', backdropClose: false,
      content: mount,
      onClose: (reason) => onOverlayClose(s, reason),
    });
  }
  function onOverlayClose(s, reason) {
    if (PROG_REASONS.has(reason)) return;
    s.overlay = null;
    // Gesprächs-Vorlagen: X führt nie ins Leere, sondern zur ruhigen Kurzfassung mit derselben Belohnung
    if (s.phase === 'kurz') { end(s, kurzResult(s)); return; }
    if (reason === 'x' && s.T.gespraech && !(s.phase === 'ergebnis' && s.result && s.result.ok)) { kurz(s, 'x'); return; }
    if (s.phase === 'ergebnis') end(s, s.result);
    else cancel(s, reason);
  }

  // ---- Lauf ----
  function makeCtx(s, mount) {
    const def = s.def;
    const params = { ...(def.params || {}), ...((def.modes && def.modes[s.mode]) || {}) };
    return {
      game, def, id: s.id, mode: s.mode, params, timing: timingFor(s.mode, s.rueckenwind), rueckenwind: s.rueckenwind,
      hint: s.rueckenwind ? (def.hint || s.T.hint || null) : null, mount, hud: s.world ? hud() : null, opts: s.opts,
      rng: rngFor(s.id), audio, ui, state, events, content, speech, icon, textOf, resolvePos,
      finish: (r) => finish(s, r || {}), cancel: (why) => cancel(s, why || 'template'),
      line, count: countdown, glimm: (t) => ui.glimm(t), toast: (t) => ui.toast(t),
      applyEffects: (list) => (list && list.length && game.dsl ? applyEffects(list, game.dsl) : Promise.resolve()),
      hudSet({ time, info, ghost, behind }) { const h = hud(); if (time !== undefined) h.time.textContent = formatValue('seconds', time); if (info !== undefined) h.info.textContent = info; if (ghost !== undefined) { h.ghost.textContent = ghost; h.ghost.classList.toggle('is-behind', !!behind); } },
      lock: (on) => { if (on) ui.lock.acquire('minigame'); else ui.lock.release('minigame'); },
    };
  }
  async function startGame(s) {
    if (s.phase === 'spiel') return;
    s.phase = 'spiel'; s.tries++; s.result = null;
    s.startedAt = performance.now();
    emit('minigame:start', { id: s.id, mode: s.mode, rueckenwind: s.rueckenwind, tries: s.tries });
    if (s.inst) { try { s.inst.stop(); } catch (e) { /* egal */ } s.inst = null; }
    if (s.restartAt) { s.restartMs = Math.round(performance.now() - s.restartAt); s.restartAt = 0; }
    if (s.world) {
      if (s.overlay) { const o = s.overlay; s.overlay = null; o.close('los'); }
      hudShow(true, s.def);
      s.inst = s.T.create(makeCtx(s, null));
      s.offUpdate = game.addUpdate((dt, t, real) => { if (s.inst && s.inst.update && s.phase === 'spiel') s.inst.update(dt, real, t); }, { order: 45 });
      await s.inst.start();
    } else {
      const body = s.overlay.body;
      body.innerHTML = ''; body.classList.add('mg-body');
      s.inst = s.T.create(makeCtx(s, body));
      await s.inst.start();
    }
  }
  function stopInst(s) {
    if (s.offUpdate) { s.offUpdate(); s.offUpdate = null; }
    if (s.inst) { try { s.inst.stop(); } catch (e) { console.error('[minigame]', e); } s.inst = null; }
    if (s.world) { hudShow(false); ui.lock.release('minigame'); }
  }

  // ---- Ergebnis ----
  function finish(s, raw) {
    if (s.phase !== 'spiel') return;
    const def = s.def;
    const key = primaryKey(def, s.T.id);
    const r = { ...raw };
    if (typeof r[key] !== 'number' && typeof r.score === 'number' && key !== 'score') r[key] = r.score;
    const { medal, stern } = medalFor(def, r, { mode: s.mode, rueckenwind: s.rueckenwind });
    const minMedal = (def.story && def.story.minMedal) || 'bronze';
    const ok = !!medal && MEDAL_RANK[medal] >= MEDAL_RANK[minMedal];
    const cur = bests(s.id);
    const { next, newBest } = updateBest(cur, { key, value: r[key], medal, stern, mode: s.mode, ok });
    if (newBest && r.ghost) next.ghost = r.ghost;
    delete r.ghost;
    state.set('medals.' + s.id, next);
    setFails(s.id, ok ? 0 : failsOf(s.id) + 1);
    const result = { id: s.id, ok, medal, stern, newBest, cancelled: false, mode: s.mode, rueckenwind: s.rueckenwind, tries: s.tries, key, best: next.best, ...r };
    s.result = result;
    s.phase = 'ergebnis';
    stopInst(s);
    emit('minigame:result', { id: s.id, medal, stern, ok, newBest, mode: s.mode, rueckenwind: s.rueckenwind, result });
    if (stern && !(cur && cur.stern)) emit('minigame:stern', { id: s.id });
    if (audio) audio.play(stern ? 'restore' : medal ? 'pickup' : 'error');
    renderResult(s, result, cur);
  }
  function renderResult(s, r, prev) {
    const { def } = s;
    const key = r.key;
    const gespraech = !!s.T.gespraech;
    const label = r.stern ? MEDAL_NAME.stern : r.medal ? MEDAL_NAME[r.medal] : gespraech ? 'Später.' : 'Noch nicht.';
    const offer = gespraech && !r.ok && failsOf(s.id) >= KURZ_AFTER;
    // Gesprächs-Vorlagen zeigen keine Prozente (kein Schulgefühl), nur den kurzen Satz der Vorlage
    const val = !s.T.gespraech && typeof r[key] === 'number' ? `${KEY_LABEL[key] || key}: ${formatValue(key, r[key])}` : '';
    const prevBest = prev && typeof prev.best === 'number' ? prev.best : null;
    const bestTxt = s.T.gespraech ? '' : r.newBest ? '<span class="mg-newbest">Neuer Bestwert</span>' : prevBest !== null ? `Bestwert ${esc(formatValue(key, prevBest))}` : '';
    const detail = r.text ? `<p class="mg-text">${esc(r.text)}</p>` : (typeof r.hitCount === 'number' ? `<p class="mg-text">${r.hitCount} von ${r.beats} Böen</p>` : '');
    const html = `<div class="mg-card mg-result" data-mg-result data-medal="${esc(r.medal || 'keine')}"${r.stern ? ' data-stern="1"' : ''}>
      <div class="mg-medal${r.medal ? '' : ' is-none'}${r.stern ? ' is-stern' : ''}" style="--medal:${MEDAL_COLOR[r.stern ? 'stern' : r.medal] || '#6b6480'}">${r.stern ? `<span class="mg-stern">${icon('stern', { size: 184 })}</span>` : ''}${icon(r.medal ? (def.icon || 'medaille') : 'drehen', { size: 60 })}</div>
      <h3>${esc(label)}</h3>
      ${detail}
      <p class="mg-score">${esc(val)}${val && bestTxt ? ' · ' : ''}${bestTxt}</p>
      ${offer ? `<div class="mg-offer" data-mg-offer><p class="mg-glimm">Anders probieren?</p><div class="ov-actions">
        <button class="btn btn-primary btn-big" type="button" data-kurz>${icon('check', { size: 26 })}<span>Ja, kurz</span></button>
        <button class="btn btn-big" type="button" data-again>${icon('drehen', { size: 26 })}<span>Nochmal</span></button>
      </div></div>` : `<div class="ov-actions">
        <button class="btn${r.ok ? '' : ' btn-primary'} btn-big" type="button" data-again>${icon('drehen', { size: 26 })}<span>Nochmal</span></button>
        <button class="btn${r.ok ? ' btn-primary' : ''} btn-big" type="button" data-weiter>${icon(r.ok ? 'check' : 'weiter', { size: 26 })}<span>${r.ok ? 'Weiter' : 'Später'}</span></button>
      </div>`}
    </div>`;
    const mount = (body) => {
      body.classList.remove('mg-body');
      body.innerHTML = html;
      body.querySelector('[data-again]').addEventListener('click', () => { if (audio) audio.play('tile'); restart(s); });
      const w = body.querySelector('[data-weiter]');
      if (w) w.addEventListener('click', () => { if (audio) audio.play('tile'); const o = s.overlay; s.overlay = null; if (o) o.close('weiter'); end(s, s.result); });
      const k = body.querySelector('[data-kurz]');
      if (k) k.addEventListener('click', () => { if (audio) audio.play('tile'); kurz(s, 'angebot'); });
      if (offer && ui.glimm) ui.glimm('Anders probieren?');
    };
    if (s.overlay && s.overlay.open) { mount(s.overlay.body); return; }
    s.overlay = ui.overlay.open({
      id: 'minigame', title: textOf(def.title) || s.id, icon: def.icon || 'medaille', kind: 'panel', pause: true, cls: 'ov-minigame', backdropClose: false, sound: false,
      content: mount,
      onClose: (reason) => onOverlayClose(s, reason),
    });
  }
  // Neustart in unter einer Sekunde: Overlay-Spiele bauen sich im selben Fenster neu auf, Welt-Spiele schließen die Karte
  function restart(s) {
    emit('minigame:restart', { id: s.id, tries: s.tries });
    s.phase = 'neu';
    s.restartAt = performance.now();
    startGame(s);
  }
  // ---- Kurzfassung (Gesprächs-Vorlagen): ruhig, ohne Aufgabe, dieselbe Belohnung ----
  function kurzResult(s) {
    const minMedal = (s.def.story && s.def.story.minMedal) || 'bronze';
    return { id: s.id, ok: true, medal: minMedal, stern: false, kurz: true, cancelled: false, mode: s.mode, tries: s.tries };
  }
  function kurz(s, why) {
    if (s.phase === 'zu' || s.phase === 'kurz') return;
    stopInst(s);
    s.phase = 'kurz';
    setFails(s.id, 0);
    emit('minigame:kurz', { id: s.id, why });
    const lines = (Array.isArray(s.def.kurz) ? s.def.kurz : [s.def.kurz]).map((x) => textOf(x)).filter(Boolean);
    const html = `<div class="mg-card mg-kurz" data-mg-kurz>
      <span class="mg-icon" style="--tile:${esc(s.def.color || '#ffd166')}">${icon(s.def.icon || 'herz', { size: 46 })}</span>
      <ul class="mg-kurz-lines">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      <div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-weiter>${icon('check', { size: 26 })}<span>Weiter</span></button></div>
    </div>`;
    const mount = (body) => {
      body.classList.remove('mg-body');
      body.innerHTML = html;
      body.querySelector('[data-weiter]').addEventListener('click', () => { if (audio) audio.play('tile'); const o = s.overlay; s.overlay = null; if (o) o.close('weiter'); end(s, kurzResult(s)); });
      if (speech && speech.settings.autoRead && lines.length) speech.speak(lines.join(' '), { who: 'erzaehler', auto: true });
    };
    if (s.overlay && s.overlay.open) { mount(s.overlay.body); return; }
    s.overlay = ui.overlay.open({
      id: 'minigame', title: textOf(s.def.title) || s.id, icon: s.def.icon || 'medaille', kind: 'panel', pause: true, cls: 'ov-minigame', backdropClose: false, sound: false,
      content: mount,
      onClose: (reason) => onOverlayClose(s, reason),
    });
  }
  function cancel(s, reason) {
    if (s.phase === 'zu') return;
    end(s, { id: s.id, ok: false, medal: null, stern: false, cancelled: true, reason, mode: s.mode, tries: s.tries });
  }
  function end(s, result) {
    if (s.phase === 'zu') return;
    s.phase = 'zu';
    stopInst(s);
    if (s.overlay) { const o = s.overlay; s.overlay = null; o.close('ende'); }
    if (current === s) current = null;
    emit('minigame:end', { id: s.id, cancelled: !!result.cancelled, medal: result.medal || null });
    s.resolve(result);
  }

  // ---- Ersatzkarte für unbekannte Vorlagen (Start → Bronze) ----
  const FALLBACK = { id: 'karte', world: false, create(ctx) { return { start() { ctx.mount.innerHTML = `<div class="mg-card"><p class="ov-text">${esc(textOf(ctx.def.intro) || 'Los.')}</p><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-fertig>${icon('check', { size: 26 })}<span>Fertig</span></button></div></div>`; ctx.mount.querySelector('[data-fertig]').addEventListener('click', () => ctx.finish({ score: 0.6, hits: 0.6, fallback: true })); }, stop() {}, auto() { ctx.finish({ score: 1, hits: 1, fallback: true }); } }; } };

  const api = {
    templates,
    get current() { return current ? { id: current.id, def: current.def, mode: current.mode, phase: current.phase, inst: current.inst, rueckenwind: current.rueckenwind, tries: current.tries, restartMs: current.restartMs } : null; },
    bests,
    medalOf(id) { const b = bests(id); return b ? { medal: b.medal || null, stern: !!b.stern, best: b.best } : null; },
    // Minispiel spielen: Startkarte → Lauf → Ergebnis. opts: { mode, skipStart, who, satzbau, step, quest }
    play(idOrDef, opts = {}) {
      const def = typeof idOrDef === 'string' ? content.get('minigames', idOrDef) : idOrDef;
      if (!def) { console.warn('[minigame] unbekannt:', idOrDef); return Promise.resolve({ ok: false, cancelled: true, missing: true, medal: null }); }
      if (current) cancel(current, 'replace');
      const T = templates[def.template] || FALLBACK;
      const world = typeof T.world === 'function' ? !!T.world(def) : !!T.world;
      const s = { id: def.id || 'minigame', def, T, world, opts, mode: opts.mode || modeDefault(), rueckenwind: false, tries: 0, resolve: null, inst: null, overlay: null, phase: 'neu', result: null, offUpdate: null };
      current = s;
      return new Promise((resolve) => {
        s.resolve = resolve;
        if (opts.skipStart) {
          if (world) startGame(s);
          else { s.overlay = ui.overlay.open({ id: 'minigame', title: textOf(def.title) || s.id, icon: def.icon || 'medaille', kind: 'panel', pause: true, cls: 'ov-minigame', backdropClose: false, content: () => {}, onClose: (reason) => onOverlayClose(s, reason) }); startGame(s); }
        } else renderStart(s);
      });
    },
    // Lotsen aus der Quest-Vorlage: { guide, mode:'befehle'|'folgen', room, minigame?, stoppRecht, visualFallback }
    async lotsen(params = {}) {
      const def = params.minigame ? content.get('minigames', params.minigame) : null;
      const d = def || { id: `lotsen-${params.guide || 'jolie'}-${params.mode || 'befehle'}`, template: 'lotsen', title: params.mode === 'folgen' ? 'Im Dunkeln folgen' : 'Lotsen im Dunkeln', icon: params.mode === 'folgen' ? 'laterne' : 'team', intro: params.mode === 'folgen' ? 'Folge der Stimme und den Lichtern.' : 'Sag ihr, wohin. Wenn sie stoppt, warte.', params: { ...params }, medals: { bronze: { score: 0.3 }, silber: { score: 0.7 }, gold: { score: 0.95 }, stern: { score: 1, noHint: true } } };
      const r = await api.play(d, { lotsen: true });
      return { ...r, ok: !!r.ok, guide: params.guide, mode: params.mode };
    },
    cancel(reason = 'api') { if (current) cancel(current, reason); },
    // Gesprächs-Vorlagen: sofort zur Kurzfassung (wie X)
    kurz() { if (current && current.T.gespraech) kurz(current, 'api'); },
    formatValue, MEDAL_NAME, MEDAL_COLOR, medalFor, medalCriteria, primaryKey,
  };
  events.on('state:reset', () => { if (current) cancel(current, 'reset'); });
  events.on('session:end', () => { if (current) cancel(current, 'session'); });
  return api;
}
