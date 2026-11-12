// Vorlage bauen (WP39): Platzieren und Logik.
//   kind 'leitungen' (Tank-Leitungen: Rohrstücke drehen, bis das Wasser alle Tanks erreicht; Züge gegen Par),
//   kind 'kette' (Kettenreaktion: dieselbe Logik als Dominosteine, die beim Start nacheinander fallen),
//   kind 'planer' (Rückwärts-Planer: Vorbereitungskarten vom Prüfungstag rückwärts in den Kalender legen),
//   kind 'ordnung' (Tischordnung/Regie: Figuren auf Plätze setzen, Regeln prüfen; Regie zeigt einen Share-Code),
//   kind 'landart' (Steine frei setzen, bleibt im Spielstand und als Menhire in der Welt).
//   params: leitungen/kette { w, h, tanks, seed, par } · planer { cards:[{t, day, kind}], days, exam } · ordnung { seats, tokens, rules, regie }
//   Ergebnis: { score, moves, fails: 0, … }
import { generateBoard, rotateCell, flow, N, E, S, W } from './pipes.js';
import { encodeScene, decodeScene } from './share.js';
import { createCanvas, roundRect, circle } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

const NEED_COLOR = { koerper: '#ff7a59', sicherheit: '#4d8cff', zugehoerigkeit: '#ffd23f', anerkennung: '#b48cff', selbstbestimmung: '#2de2c9', spass: '#ff5d8f' };
const NEED_NAME = { koerper: 'Körper', sicherheit: 'Sicherheit', zugehoerigkeit: 'Zugehörigkeit', anerkennung: 'Anerkennung', selbstbestimmung: 'Selbstbestimmung', spass: 'Spaß' };

// ---- Leitungen / Kette ----
function createPipes(ctx, kind) {
  const { params, mount, audio, icon, events } = ctx;
  const seed = params.seed !== undefined ? params.seed : (ctx.rng.int ? ctx.rng.int(1, 9999) : 1);
  const board = generateBoard({ w: params.w || 5, h: params.h || 4, tanks: params.tanks || 3, seed });
  const par = params.par || Math.max(3, board.par);
  let cv = null, done = false, t = 0, fill = 0, solvedAt = 0, fallen = new Map();
  function draw(c, w, h) {
    const cs = Math.min((w - 90) / board.w, h / board.h), ox = 30, oy = (h - cs * board.h) / 2;
    c.clearRect(0, 0, w, h);
    c.fillStyle = '#17102e'; c.fillRect(0, 0, w, h);
    const F = flow(board);
    const isDom = kind === 'kette';
    // Quelle
    const sy = oy + (board.source.y + 0.5) * cs;
    c.fillStyle = isDom ? '#ffd166' : '#4d8cff'; circle(c, ox - 12, sy, 12); c.fill();
    c.fillStyle = '#fff'; c.font = `900 12px ${getComputedStyle(document.body).fontFamily}`; c.textAlign = 'center'; c.fillText(isDom ? 'Start' : 'Quelle', ox - 12, sy + 28);
    for (let y = 0; y < board.h; y++) for (let x = 0; x < board.w; x++) {
      const m = board.cells[y * board.w + x];
      const px = ox + x * cs, py = oy + y * cs, cx = px + cs / 2, cy = py + cs / 2;
      c.fillStyle = 'rgba(255,255,255,0.05)'; roundRect(c, px + 2, py + 2, cs - 4, cs - 4, 10); c.fill();
      if (!m) continue;
      const on = F.reached.has(x + ',' + y);
      const tank = board.tanks.find((tk) => tk.x === x && tk.y === y);
      if (isDom) {
        // Domino: ein Stein je Öffnung, gefallen = flach in Richtung
        const fell = fallen.has(x + ',' + y) && t > fallen.get(x + ',' + y);
        c.fillStyle = on && fell ? '#ffd166' : '#e8e0ff';
        const arms = [[N, 0, -1], [E, 1, 0], [S, 0, 1], [W, -1, 0]].filter(([b]) => m & b);
        for (const [, dx, dy] of arms) { c.save(); c.translate(cx + dx * cs * 0.22, cy + dy * cs * 0.22); c.rotate(Math.atan2(dy, dx)); roundRect(c, -cs * 0.2, fell ? -cs * 0.07 : -cs * 0.14, cs * 0.4, fell ? cs * 0.14 : cs * 0.28, 5); c.fill(); c.restore(); }
        c.fillStyle = '#3a2e5c'; circle(c, cx, cy, cs * 0.08); c.fill();
      } else {
        c.lineCap = 'round'; c.lineWidth = cs * 0.24; c.strokeStyle = '#6b5f8a';
        c.beginPath();
        for (const [b, dx, dy] of [[N, 0, -1], [E, 1, 0], [S, 0, 1], [W, -1, 0]]) if (m & b) { c.moveTo(cx, cy); c.lineTo(cx + dx * cs * 0.5, cy + dy * cs * 0.5); }
        c.stroke();
        if (on) { c.lineWidth = cs * 0.12; c.strokeStyle = '#58c4ff'; c.beginPath(); for (const [b, dx, dy] of [[N, 0, -1], [E, 1, 0], [S, 0, 1], [W, -1, 0]]) if (m & b) { c.moveTo(cx, cy); c.lineTo(cx + dx * cs * 0.5, cy + dy * cs * 0.5); } c.stroke(); }
        c.fillStyle = on ? '#8fd8ff' : '#8a7fa8'; circle(c, cx, cy, cs * 0.14); c.fill();
      }
      if (tank) {
        const col = NEED_COLOR[tank.need] || '#fff';
        c.fillStyle = 'rgba(255,255,255,0.12)'; roundRect(c, px + cs * 0.62, py + cs * 0.1, cs * 0.3, cs * 0.5, 6); c.fill();
        const lvl = on ? Math.min(1, fill) : 0;
        c.fillStyle = col; roundRect(c, px + cs * 0.62, py + cs * 0.1 + cs * 0.5 * (1 - lvl), cs * 0.3, cs * 0.5 * lvl, 6); c.fill();
        c.strokeStyle = col; c.lineWidth = 2; roundRect(c, px + cs * 0.62, py + cs * 0.1, cs * 0.3, cs * 0.5, 6); c.stroke();
      }
    }
  }
  function sync() { const el = mount.querySelector('[data-moves]'); if (el) el.textContent = `Züge ${board.moves} · Par ${par}`; }
  function finish() {
    if (done) return; done = true;
    if (cv) cv.stop();
    const score = board.moves <= par ? 1 : Math.max(0.35, par / board.moves);
    ctx.finish({ score: +score.toFixed(3), moves: board.moves, par, fails: 0 });
  }
  function checkSolved() {
    const F = flow(board);
    if (!F.all) return;
    solvedAt = t; if (audio) audio.play('pickup');
    if (kind === 'kette') { let k = 0; const q = [board.source]; const seen = new Set([board.source.x + ',' + board.source.y]); while (q.length) { const c = q.shift(); fallen.set(c.x + ',' + c.y, t + k * 0.12); k++; for (const [b, dx, dy, opp] of [[N, 0, -1, S], [E, 1, 0, W], [S, 0, 1, N], [W, -1, 0, E]]) { const nx = c.x + dx, ny = c.y + dy, key = nx + ',' + ny; if (!(board.cells[c.y * board.w + c.x] & b) || seen.has(key) || nx < 0 || ny < 0 || nx >= board.w || ny >= board.h || !(board.cells[ny * board.w + nx] & opp)) continue; seen.add(key); q.push({ x: nx, y: ny }); } } }
    events.emit('bauen:solved', { id: ctx.id, moves: board.moves, par });
    setTimeout(finish, kind === 'kette' ? 1600 : 1200);
  }
  return {
    board,
    start() {
      mount.innerHTML = `<div class="mg-topline"><span>${kind === 'kette' ? 'Kettenreaktion' : 'Tank-Leitungen'}</span><span data-moves></span></div>${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}`;
      cv = createCanvas(mount, { aspect: 1.6 });
      sync();
      cv.onPointer((type, x, y) => {
        if (type !== 'down' || done || solvedAt) return;
        const cs = Math.min((cv.w - 90) / board.w, cv.h / board.h), ox = 30, oy = (cv.h - cs * board.h) / 2;
        const gx = Math.floor((x - ox) / cs), gy = Math.floor((y - oy) / cs);
        if (gx < 0 || gy < 0 || gx >= board.w || gy >= board.h) return;
        rotateCell(board, gx, gy);
        if (audio) audio.play('click');
        sync(); checkSolved();
      });
      if (kind === 'leitungen') { const leg = document.createElement('div'); leg.className = 'mg-row'; leg.innerHTML = board.tanks.map((tk) => `<span class="mg-chip" style="border-color:${NEED_COLOR[tk.need]}">${icon('glas', { size: 20 })} ${NEED_NAME[tk.need] || tk.need}</span>`).join(''); mount.appendChild(leg); }
      cv.loop((_, dt) => { t += dt; if (solvedAt) fill = Math.min(1, fill + dt * 1.2); draw(cv.ctx, cv.w, cv.h); });
    },
    stop() { done = true; if (cv) { cv.dispose(); cv = null; } },
    auto(level = 'gold') {
      if (cv) cv.stop();
      board.cells = board.solution.slice();
      board.moves = level === 'gold' ? par : level === 'silber' ? Math.ceil(par * 1.4) : level === 'bronze' ? par * 3 : par * 3;
      done = true;
      ctx.finish({ score: level === 'fail' ? 0 : +(board.moves <= par ? 1 : Math.max(0.35, par / board.moves)).toFixed(3), moves: board.moves, par, fails: 0, auto: true });
    },
    act(name, x, y) { if (name === 'rotate') { rotateCell(board, x, y); sync(); checkSolved(); return flow(board).count; } return false; },
  };
}

// ---- Rückwärts-Planer ----
function createPlaner(ctx) {
  const { params, mount, audio, icon, textOf } = ctx;
  const days = params.days || 5;
  const cards = (params.cards || []).map((c, i) => ({ ...c, i }));
  const placed = {};   // cardIndex -> day (0 = Prüfungstag, n = n Tage davor)
  let sel = null, done = false;
  const KIND_ICON = { selbsttest: 'haken', lesen: 'buch', ruhe: 'haengematte', packen: 'koffer', fragen: 'frage' };
  function render() {
    mount.innerHTML = `<div class="mg-topline"><span>${esc(textOf(params.exam) || 'Prüfung')}: rückwärts planen</span><span>${Object.keys(placed).length}/${cards.length}</span></div>${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}
      <div class="mg-row" data-cards>${cards.filter((c) => placed[c.i] === undefined).map((c) => `<button class="mg-chip${sel === c.i ? ' is-on' : ''}" type="button" data-card="${c.i}">${icon(KIND_ICON[c.kind] || 'kalender', { size: 20 })} ${esc(textOf(c.t))}</button>`).join('') || '<span class="jn-note">Alle Karten liegen.</span>'}</div>
      <div class="mg-cal">${Array.from({ length: days + 1 }, (_, k) => days - k).map((d) => `<div class="mg-day${d === 0 ? ' is-exam' : ''}" data-day="${d}">${d === 0 ? 'Prüfung' : `${d} Tag${d > 1 ? 'e' : ''} davor`}${cards.filter((c) => placed[c.i] === d).map((c) => `<button class="mg-chip" type="button" data-placed="${c.i}">${icon(KIND_ICON[c.kind] || 'kalender', { size: 18 })} ${esc(textOf(c.t))}</button>`).join('')}</div>`).join('')}</div>
      <div class="mg-actions"><button class="btn btn-primary btn-big" type="button" data-fertig ${Object.keys(placed).length < cards.length ? 'disabled' : ''}>${icon('check', { size: 26 })}<span>Plan steht</span></button></div>`;
    mount.querySelectorAll('[data-card]').forEach((b) => b.addEventListener('click', () => { sel = sel === +b.dataset.card ? null : +b.dataset.card; if (audio) audio.play('tile'); render(); }));
    mount.querySelectorAll('[data-placed]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); delete placed[+b.dataset.placed]; sel = +b.dataset.placed; if (audio) audio.play('click'); render(); }));
    mount.querySelectorAll('[data-day]').forEach((d) => d.addEventListener('click', () => { if (sel === null) return; placed[sel] = +d.dataset.day; sel = null; if (audio) audio.play('tile'); render(); }));
    mount.querySelector('[data-fertig]').addEventListener('click', submit);
  }
  function evaluate() {
    let ok = 0, selbsttest = 0;
    for (const c of cards) { if (placed[c.i] === c.day) ok++; if (c.kind === 'selbsttest' && placed[c.i] !== undefined && placed[c.i] > 0) selbsttest++; }
    const onlyReading = cards.every((c) => c.kind !== 'selbsttest') || selbsttest === 0;
    return { ok, total: cards.length, score: cards.length ? ok / cards.length : 0, onlyReading };
  }
  function submit() {
    if (done) return; done = true;
    const r = evaluate();
    if (audio) audio.play(r.score >= 0.99 ? 'pickup' : 'bubble');
    ctx.finish({ score: +r.score.toFixed(3), correct: r.ok, total: r.total, text: r.onlyReading ? 'Nur lesen. Bojen fehlen.' : r.score >= 0.99 ? 'Der Plan trägt.' : 'Fast. Ein paar Tage passen nicht.', fails: 0 });
  }
  return {
    start() { render(); }, stop() { done = true; },
    auto(level = 'gold') { for (const c of cards) placed[c.i] = level === 'fail' ? (c.day + 1) % (days + 1) : level === 'silber' ? (c.i % 4 === 0 ? (c.day + 1) % (days + 1) : c.day) : c.day; submit(); },
    act(name, i, day) { if (name === 'place') { placed[i] = day; render(); return true; } if (name === 'fertig') { submit(); return true; } return false; },
  };
}

// ---- Tischordnung / Regie ----
function createOrdnung(ctx) {
  const { params, mount, audio, icon, textOf, game, state } = ctx;
  const seats = params.seats || 6;
  const tokens = (params.tokens || ['jolie', 'tun', 'tiago', 'maelle', 'luc', 'ilda']).slice(0, seats);
  const rules = params.rules || [];   // { a, b, kind:'neben'|'nicht-neben'|'gegenueber' }
  const table = new Array(seats).fill(null);
  const regie = !!params.regie;
  let sel = null, done = false;
  const nameOf = (id) => (game.npcs && game.npcs.nameOf ? game.npcs.nameOf(id) : id);
  const iconOf = (id) => { const d = game.content.get('npcs', id); return d ? d.icon : 'punkt'; };
  const colorOf = (id) => { const d = game.content.get('npcs', id); return d ? d.color : '#fff'; };
  const seatDist = (i, j) => Math.min(Math.abs(i - j), seats - Math.abs(i - j));
  function check() {
    let ok = 0;
    for (const r of rules) {
      const a = table.indexOf(r.a), b = table.indexOf(r.b);
      if (a < 0 || b < 0) continue;
      const d = seatDist(a, b);
      if (r.kind === 'neben' && d === 1) ok++;
      if (r.kind === 'nicht-neben' && d > 1) ok++;
      if (r.kind === 'gegenueber' && d === Math.floor(seats / 2)) ok++;
    }
    return { ok, total: rules.length };
  }
  const ruleText = (r) => `${nameOf(r.a)} ${r.kind === 'neben' ? 'neben' : r.kind === 'gegenueber' ? 'gegenüber' : 'nicht neben'} ${nameOf(r.b)}`;
  function render() {
    const c = check();
    mount.innerHTML = `<div class="mg-topline"><span>${regie ? 'Regie' : 'Tischordnung'}</span><span>${c.ok}/${c.total} Regeln</span></div>${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}
      <div class="mg-two"><div><div class="mg-row" data-tokens>${tokens.filter((t) => !table.includes(t)).map((t) => `<button class="mg-chip${sel === t ? ' is-on' : ''}" type="button" data-token="${t}" style="border-color:${colorOf(t)}">${icon(iconOf(t), { size: 20 })} ${esc(nameOf(t))}</button>`).join('') || '<span class="jn-note">Alle sitzen.</span>'}</div>
      <ul class="mg-rules" style="margin:12px 0 0;padding-left:20px;font-weight:800">${rules.map((r) => { const a = table.indexOf(r.a), b = table.indexOf(r.b); const d = a >= 0 && b >= 0 ? seatDist(a, b) : -1; const okR = d >= 0 && ((r.kind === 'neben' && d === 1) || (r.kind === 'nicht-neben' && d > 1) || (r.kind === 'gegenueber' && d === Math.floor(seats / 2))); return `<li style="color:${d < 0 ? '#fff' : okR ? '#8fd18b' : '#ff8c8c'}">${esc(ruleText(r))}</li>`; }).join('')}</ul></div>
      <div class="mg-row" data-seats>${table.map((t, i) => `<button class="mg-chip${t ? '' : ' is-empty'}" type="button" data-seat="${i}" style="min-width:120px;${t ? `border-color:${colorOf(t)}` : ''}">${t ? `${icon(iconOf(t), { size: 20 })} ${esc(nameOf(t))}` : `Platz ${i + 1}`}</button>`).join('')}</div></div>
      <div class="mg-actions"><button class="btn btn-primary btn-big" type="button" data-fertig ${table.some((t) => !t) ? 'disabled' : ''}>${icon('check', { size: 26 })}<span>Fertig</span></button></div>
      ${regie ? `<div class="mg-row" style="margin-top:10px"><input class="mg-input" data-code placeholder="Regie-Code eingeben" aria-label="Regie-Code"><button class="btn btn-small" type="button" data-load>Laden</button></div>` : ''}`;
    mount.querySelectorAll('[data-token]').forEach((b) => b.addEventListener('click', () => { sel = sel === b.dataset.token ? null : b.dataset.token; if (audio) audio.play('tile'); render(); }));
    mount.querySelectorAll('[data-seat]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.seat; if (table[i]) { sel = table[i]; table[i] = null; } else if (sel) { table[i] = sel; sel = null; } if (audio) audio.play('click'); render(); }));
    mount.querySelector('[data-fertig]').addEventListener('click', submit);
    const load = mount.querySelector('[data-load]');
    if (load) load.addEventListener('click', () => { const sc = decodeScene(mount.querySelector('[data-code]').value); if (sc && Array.isArray(sc.cells)) { sc.cells.forEach((t, i) => { if (i < seats) table[i] = tokens.includes(t) ? t : null; }); if (audio) audio.play('chime'); render(); } else if (audio) audio.play('error'); });
  }
  function submit() {
    if (done) return; done = true;
    const c = check();
    const score = c.total ? c.ok / c.total : 1;
    const code = regie ? encodeScene({ id: ctx.id, cells: table.slice(), seed: 0 }) : null;
    if (code) { state.set('regie.' + ctx.id, code); mount.insertAdjacentHTML('beforeend', `<p class="mg-code" data-share>${esc(code)}</p>`); }
    if (audio) audio.play(score >= 0.99 ? 'pickup' : 'bubble');
    setTimeout(() => ctx.finish({ score: +score.toFixed(3), ok: c.ok, total: c.total, code, text: score >= 0.99 ? 'Alle Regeln passen.' : 'Fast. Schau auf die roten Regeln.', fails: 0 }), code ? 1800 : 500);
  }
  return {
    table,
    start() { render(); }, stop() { done = true; },
    auto(level = 'gold') {
      // gültige Ordnung durch Probieren (klein) – oder absichtlich falsch
      const perms = (arr) => (arr.length <= 1 ? [arr] : arr.flatMap((v, i) => perms(arr.slice(0, i).concat(arr.slice(i + 1))).map((p) => [v, ...p])));
      let best = null, bestOk = -1;
      for (const p of perms(tokens).slice(0, 720)) { p.forEach((t, i) => { table[i] = t; }); const c = check(); if (c.ok > bestOk) { bestOk = c.ok; best = p.slice(); } if (c.ok === c.total) break; }
      if (level === 'fail') best = tokens.slice().reverse();
      best.forEach((t, i) => { table[i] = t; });
      submit();
    },
    act(name, i, t) { if (name === 'seat') { table[i] = t || null; render(); return true; } if (name === 'fertig') { submit(); return true; } return false; },
  };
}

// ---- Land-Art ----
function createLandart(ctx) {
  const { params, mount, audio, icon, state, game } = ctx;
  const n = params.size || 7, max = params.stones || 9;
  const cells = new Set((state.get('landart.' + ctx.id) || []).map(String));
  let cv = null, done = false, t = 0;
  function draw(c, w, h) {
    const cs = Math.min(w, h) / n, ox = (w - cs * n) / 2, oy = (h - cs * n) / 2;
    c.clearRect(0, 0, w, h); c.fillStyle = '#243a2a'; c.fillRect(0, 0, w, h);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const px = ox + x * cs, py = oy + y * cs;
      c.fillStyle = 'rgba(255,255,255,0.05)'; roundRect(c, px + 2, py + 2, cs - 4, cs - 4, 8); c.fill();
      if (cells.has(x + ',' + y)) { c.fillStyle = '#8b8794'; circle(c, px + cs / 2, py + cs / 2 + Math.sin(t * 2 + x) * 1.5, cs * 0.32); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; circle(c, px + cs * 0.42, py + cs * 0.42, cs * 0.1); c.fill(); }
    }
  }
  function finish() {
    if (done) return; done = true; if (cv) cv.stop();
    const list = [...cells];
    state.set('landart.' + ctx.id, list);
    // dauerhaft in der Welt: Menhire um den Ort (wenn Requisiten da sind)
    const at = params.at ? ctx.resolvePos(params.at) : null;
    if (at && game.props && game.props.spawn) {
      const half = (n - 1) / 2;
      for (const k of list) { const [x, y] = k.split(',').map(Number); try { game.props.spawn('menhir', { id: `landart-${ctx.id}-${x}-${y}`, x: at.x + (x - half) * 1.6, z: at.z + (y - half) * 1.6, height: 1.1 + ((x * 7 + y * 3) % 4) * 0.2 }); } catch (e) { /* egal */ } }
    }
    ctx.finish({ score: list.length ? 1 : 0.5, stones: list.length, text: 'Steht. Bleibt.', fails: 0 });
  }
  return {
    start() {
      mount.innerHTML = `<div class="mg-topline"><span>Land-Art</span><span data-cnt>${cells.size}/${max} Steine</span></div>`;
      cv = createCanvas(mount, { aspect: 1.3 });
      cv.onPointer((type, x, y) => { if (type !== 'down' || done) return; const cs = Math.min(cv.w, cv.h) / n, ox = (cv.w - cs * n) / 2, oy = (cv.h - cs * n) / 2; const gx = Math.floor((x - ox) / cs), gy = Math.floor((y - oy) / cs); if (gx < 0 || gy < 0 || gx >= n || gy >= n) return; const k = gx + ',' + gy; if (cells.has(k)) cells.delete(k); else if (cells.size < max) cells.add(k); else { if (audio) audio.play('error'); return; } if (audio) audio.play('click'); mount.querySelector('[data-cnt]').textContent = `${cells.size}/${max} Steine`; });
      const a = document.createElement('div'); a.className = 'mg-actions'; a.innerHTML = `<button class="btn btn-primary btn-big" type="button" data-fertig>${icon('check', { size: 26 })}<span>So bleibt es</span></button>`; mount.appendChild(a);
      a.querySelector('[data-fertig]').addEventListener('click', finish);
      cv.loop((_, dt) => { t += dt; draw(cv.ctx, cv.w, cv.h); });
    },
    stop() { done = true; if (cv) { cv.dispose(); cv = null; } },
    auto() { cells.add('3,3'); cells.add('2,3'); cells.add('4,3'); finish(); },
    act(name, x, y) { if (name === 'stone') { cells.add(x + ',' + y); return true; } if (name === 'fertig') { finish(); return true; } return false; },
  };
}

export default {
  id: 'bauen', world: false, hint: 'Dreh ein Stück und schau, wo das Wasser ankommt.',
  create(ctx) {
    const kind = (ctx.params && ctx.params.kind) || 'leitungen';
    if (kind === 'planer') return createPlaner(ctx);
    if (kind === 'ordnung' || kind === 'regie') return createOrdnung({ ...ctx, params: { ...ctx.params, regie: kind === 'regie' || ctx.params.regie } });
    if (kind === 'landart') return createLandart(ctx);
    return createPipes(ctx, kind === 'kette' ? 'kette' : 'leitungen');
  },
};
