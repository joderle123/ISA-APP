// Die 12 Schritt-Vorlagen der Quest-Engine (WP31, DESIGN §16): wegTor, tragen, szene, ermitteln, treppe, befreunden,
// lotsen, boss, bauen, pruefung, nachtwache, erinnerung – dazu 'auftrag' (QUELLE): ein System/Missions-Plugin führt den
// Schritt selbst (z. B. im Innenraum „Nest“) und meldet „fertig“ über ein Flag. Reine Logik: alles Welt-Spezifische läuft über den Adapter ctx
// (siehe engine.js / plugin.js), deshalb laufen die Vorlagen auch headless in Node-Tests.
//   const r = createRunner(step, { quest, ctx, done, fail, progress });  r.start() · r.update(dt) · r.stop() · r.describe()
//   describe() → { label, target:{x,z}|null, icon }   (Marker und Tagebuch)
// Adapter (ctx) – alles optional außer resolvePos/player/marker:
//   resolvePos(pos) → {x,z,y?,r?} · player() → {x,z,y,speed,sprinting,state,yaw} · marker(target|null, opts)
//   dialogue(id, opts) → Promise<{reason}> · minigame(id, opts) → Promise<{ok, medal}> · memory(id) → Promise
//   nachtwache(pool) → Promise · enterRoom(id, spawn) · exitRoom() · lotsen(params) → Promise|null
//   interaction({id,x,z,radius,label,onAction}) → {remove} · spawn(type, opts) → {remove, group?} · creature(id, params) → {x,z}
//   carry(def) · drop() · carrying() · on(event, fn) → off · glimm(t) · toast(t) · say(o) · pulsCap(v|null)
//   evalCond(c) · applyEffects(list) · minMedal(minigameId) → 'bronze' · winWait(win) → Promise
export const TEMPLATES = ['wegTor', 'tragen', 'szene', 'ermitteln', 'treppe', 'befreunden', 'lotsen', 'boss', 'bauen', 'pruefung', 'nachtwache', 'erinnerung', 'auftrag'];
export const MEDAL_RANK = { bronze: 0, silber: 1, gold: 2, stern: 3 };
const dist = (a, b) => (a && b ? Math.hypot(a.x - b.x, a.z - b.z) : Infinity);
const noop = () => {};

function base(step, o) {
  return { step, params: step.params || {}, quest: o.quest, ctx: o.ctx, done: o.done || noop, fail: o.fail || noop, progress: o.progress || noop, offs: [], active: false, data: o.data || {} };
}
function cleanup(r) { for (const f of r.offs.splice(0)) { try { f(); } catch (e) { /* egal */ } } }
const listen = (r, ev, fn) => { if (r.ctx.on) r.offs.push(r.ctx.on(ev, fn)); };
const spawn = (r, type, opts) => { const h = r.ctx.spawn ? r.ctx.spawn(type, opts) : null; if (h && h.remove) r.offs.push(() => h.remove()); return h; };
const interact = (r, o) => { const h = r.ctx.interaction ? r.ctx.interaction(o) : null; if (h && h.remove) r.offs.push(() => h.remove()); return h; };

// ---- 1 Weg und Tor: Route, Tor, Puls-Quellen. Fertig, sobald die Figur am Ziel steht (und das Tor offen ist). ----
function wegTor(step, o) {
  const r = base(step, o);
  const target = r.ctx.resolvePos(r.params.to);
  const radius = r.params.radius || (target && target.r) || 3.5;
  let arrived = false;
  return Object.assign(r, {
    target, radius,
    describe: () => ({ label: r.step.label || 'Geh zum Ziel', target, icon: r.params.gate ? 'schloss' : 'karte' }),
    start() { r.active = true; r.ctx.marker(target, { label: 'Ziel', icon: 'karte' }); },
    update() {
      if (!r.active || arrived || !target) return;
      const p = r.ctx.player();
      if (dist(p, target) > radius) return;
      if (r.params.gate && r.ctx.evalCond && !r.ctx.evalCond({ flag: 'gate.' + r.params.gate }) && !(r.ctx.gateOpen && r.ctx.gateOpen(r.params.gate))) return;
      arrived = true; r.active = false; r.done({ at: target });
    },
    stop() { r.active = false; cleanup(r); },
  });
}

// ---- 2 Tragen: Ding von A nach B, Schwappen, zerbrechlich, Radien (count Ladungen) ----
function tragen(step, o) {
  const r = base(step, o);
  const from = r.ctx.resolvePos(r.params.from), to = r.ctx.resolvePos(r.params.to);
  const count = r.params.count || 1;
  let delivered = r.data.delivered || 0, spilled = 0, carrying = false;
  const pickup = () => {
    if (carrying) return;
    carrying = true;
    if (r.ctx.carry) r.ctx.carry({ id: r.params.item, slosh: r.params.slosh, fragile: !!r.params.fragile, kind: r.params.kind || 'tank', color: r.params.color });
    r.ctx.marker(to, { label: 'Bringen', icon: 'koffer' });
  };
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || `${r.params.item} bringen`, target: carrying ? to : from, icon: 'koffer' }),
    start() {
      r.active = true;
      r.ctx.marker(from, { label: 'Holen', icon: 'koffer' });
      interact(r, { id: 'tragen-' + r.step.id, x: from.x, z: from.z, radius: from.r || 2.8, label: 'Nehmen', onAction: pickup });
      listen(r, 'carry:spill', (e) => { spilled += (e && e.amount) || 0; });
      listen(r, 'carry:empty', () => { if (r.params.fragile) { carrying = false; r.ctx.marker(from, { label: 'Holen', icon: 'koffer' }); r.fail('zerbrochen'); } });
      listen(r, 'carry:drop', () => { if (carrying && dist(r.ctx.player(), to) > (to.r || 3)) { carrying = false; r.ctx.marker(from, { label: 'Holen', icon: 'koffer' }); } });
    },
    update() {
      if (!r.active || !carrying) return;
      const p = r.ctx.player();
      if (dist(p, to) > (to.r || 3)) return;
      carrying = false;
      if (r.ctx.drop) r.ctx.drop();
      delivered++; r.data.delivered = delivered;
      r.progress(delivered / count);
      if (delivered >= count) { r.active = false; r.done({ spilled: +spilled.toFixed(2), gold: spilled < 0.05 }); }
      else r.ctx.marker(from, { label: 'Holen', icon: 'koffer' });
    },
    stop() { r.active = false; cleanup(r); },
    pickup,
  });
}

// ---- 3 Szene: ein Dialog; nach Rückzug bleibt der Schritt und lässt sich per „Reden“ wiederholen ----
function szene(step, o) {
  const r = base(step, o);
  const at = r.params.at ? r.ctx.resolvePos(r.params.at) : null;
  let running = false, retry = null, release = null, holdT = 2;
  const hold = () => { if (at && !release && r.ctx.holdCast) release = r.ctx.holdCast(r.params.dialogue, at); };
  const unhold = () => { if (release) { release(); release = null; } };
  const play = async () => {
    if (running) return;
    running = true;
    const res = await r.ctx.dialogue(r.params.dialogue, { step: r.step.id, quest: r.quest && r.quest.id });
    running = false;
    if (!r.active) return;
    release = null;   // die Szene hat ihre Übersteuerung schon gelöst
    if (res && res.reason === 'end') { r.active = false; cleanup(r); r.done(res); return; }
    // Rückzug/Exit: kein Fehlschlag – der Schritt wartet am selben Ort
    const p = at || r.ctx.player();
    if (!retry) retry = interact(r, { id: 'szene-' + r.step.id, x: p.x, z: p.z, radius: 3.5, label: 'Reden', priority: 2, onAction: play });
    r.ctx.marker(p, { label: 'Reden', icon: 'sprechblase' });
    hold();
  };
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || 'Rede mit der Figur', target: at, icon: 'sprechblase' }),
    start() {
      r.active = true;
      if (at && dist(r.ctx.player(), at) > (at.r || 4)) {
        r.ctx.marker(at, { label: 'Reden', icon: 'sprechblase' });
        retry = interact(r, { id: 'szene-' + r.step.id, x: at.x, z: at.z, radius: at.r || 4, label: 'Reden', priority: 2, onAction: play });
        hold();
      } else play();
    },
    // Tagesablauf kann die Figur später wegschicken: alle 2 s nachsehen (holdCast prüft selbst, ob sie noch dort ist)
    update(dt) { if (!r.active || running || release || !at) return; holdT -= dt || 0; if (holdT <= 0) { holdT = 2; hold(); } },
    stop() { r.active = false; unhold(); cleanup(r); },
    play,
  });
}

// ---- 4 Ermitteln: Faktenkristalle gegen Urteilsblasen; fertig bei need Fakten (Gericht/Chronik/Repost-Kette) ----
function ermitteln(step, o) {
  const r = base(step, o);
  const items = (r.params.evidence || []).map((e) => ({ ...e, pos: r.ctx.resolvePos(e.pos), got: (r.data.got || []).includes(e.id) }));
  const need = r.params.need || items.filter((e) => e.kind === 'fakt').length;
  const fakten = () => items.filter((e) => e.got && e.kind === 'fakt').length;
  const next = () => { const p = r.ctx.player(); return items.filter((e) => !e.got).sort((a, b) => dist(p, a.pos) - dist(p, b.pos))[0] || null; };
  const point = () => { const n = next(); r.ctx.marker(n ? n.pos : null, { label: 'Beweis', icon: 'lupe' }); };
  const collect = (e) => {
    if (e.got) return;
    e.got = true; r.data.got = items.filter((x) => x.got).map((x) => x.id);
    if (e.h && e.h.remove) e.h.remove();
    if (r.ctx.say) r.ctx.say({ who: e.who || 'erzaehler', text: e.say, wait: false });
    if (e.kind === 'urteil' && r.ctx.toast) r.ctx.toast('Ein Urteil. Hohl.');
    r.progress(Math.min(1, fakten() / need));
    if (fakten() >= need) { r.active = false; if (r.ctx.emit) r.ctx.emit('ermitteln:done', { step: r.step.id, board: r.params.board }); cleanup(r); r.done({ fakten: fakten(), board: r.params.board }); return; }
    point();
  };
  return Object.assign(r, {
    items,
    describe: () => ({ label: r.step.label || `Beweise sammeln (${fakten()}/${need})`, target: (next() || {}).pos || null, icon: 'lupe' }),
    start() {
      r.active = true;
      for (const e of items) {
        if (e.got || !e.pos) continue;
        spawn(r, 'kristall', { id: 'beweis-' + e.id, x: e.pos.x, z: e.pos.z, kind: e.kind });
        e.h = interact(r, { id: 'beweis-' + e.id, x: e.pos.x, z: e.pos.z, radius: 2.6, label: 'Ansehen', onAction: () => collect(e) });
      }
      point();
    },
    update() {},
    stop() { r.active = false; cleanup(r); },
    collect: (id) => { const e = items.find((x) => x.id === id); if (e) collect(e); },
  });
}

// ---- 5 Treppe: geordnete Stufen; ein Fehlschlag auf Stufe k rutscht zurück auf k−1 (slideBack) ----
function treppe(step, o) {
  const r = base(step, o);
  const stufen = r.params.steps || [];
  let k = r.data.stufe || 0, sub = null;
  const run = () => {
    if (sub) { sub.stop(); sub = null; }
    if (k >= stufen.length) { r.active = false; r.done({ stufen: stufen.length }); return; }
    r.data.stufe = k;
    r.progress(k / stufen.length);
    if (r.ctx.emit) r.ctx.emit('treppe:stufe', { step: r.step.id, stufe: k, id: stufen[k].id });
    sub = createRunner(stufen[k], {
      quest: r.quest, ctx: r.ctx,
      done: () => { k++; run(); },
      fail: (reason) => {
        if (r.params.slideBack !== false && k > 0) { k--; if (r.ctx.glimm) r.ctx.glimm('Stufe übersprungen. Rutschpartie.'); }
        r.fail(reason);
        run();
      },
    });
    sub.start();
  };
  return Object.assign(r, {
    get stufe() { return k; },
    describe: () => (sub && sub.describe ? { ...sub.describe(), label: `Stufe ${k + 1}/${stufen.length}: ${sub.describe().label}` } : { label: 'Treppe', target: null, icon: 'chronik' }),
    start() { r.active = true; run(); },
    update(dt) { if (sub) sub.update(dt); },
    stop() { r.active = false; if (sub) sub.stop(); cleanup(r); },
  });
}

// ---- 6 Befreunden: Annäherungsregel eines Tiers (sechs Regeln der Gefühlsvögel) ----
export const RULE_SECONDS = { 'nicht-rennen': 5, 'linie-achten': 5, 'still-sitzen': 6, fangen: 0, 'frisch-fuettern': 0, 'stillstehen-umsehen': 4 };
function befreunden(step, o) {
  const r = base(step, o);
  const rule = r.params.rule;
  const need = r.params.seconds || RULE_SECONDS[rule] || 5;
  let creature = null, t = 0, touches = 0, lastYaw = null, turned = 0, fed = false;
  const NEAR = r.params.near || 8;
  const finish = (extra) => { r.active = false; cleanup(r); r.done({ creature: r.params.creature, rule, ...extra }); };
  const flee = (why) => { t = 0; turned = 0; if (creature && creature.flee) creature.flee(); r.fail(why); };
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || `Freunde dich an: ${r.params.creature}`, target: creature, icon: 'herz' }),
    start() {
      r.active = true;
      creature = (r.ctx.creature && r.ctx.creature(r.params.creature, r.params)) || (r.params.pos ? r.ctx.resolvePos(r.params.pos) : null) || (() => { const p = r.ctx.player(); return { x: p.x + 5, z: p.z + 5 }; })();
      r.ctx.marker(creature, { label: 'Tier', icon: 'herz' });
      if (rule === 'frisch-fuettern') interact(r, { id: 'fuettern-' + r.step.id, x: creature.x, z: creature.z, radius: 3, label: 'Füttern', onAction: () => {
        // Nur frische Früchte (Item aus dem Spielstand); ohne Item-Vorgabe reicht das Füttern selbst
        const fresh = r.params.item ? (r.ctx.evalCond ? r.ctx.evalCond({ item: r.params.item }) : true) : true;
        if (fresh) { fed = true; finish({ fed }); } else { if (r.ctx.toast) r.ctx.toast('Faul. Er dreht ab.'); flee('faul'); }
      } });
    },
    update(dt) {
      if (!r.active || !creature) return;
      const p = r.ctx.player();
      const d = dist(p, creature);
      switch (rule) {
        case 'nicht-rennen':
          if (d > NEAR) { t = 0; return; }
          if (p.sprinting) return flee('gerannt');
          t += dt; r.progress(t / need); if (t >= need) finish({ seconds: t });
          return;
        case 'linie-achten': {
          const line = r.params.line || 3;
          if (d > NEAR) { t = 0; return; }
          if (d < line) return flee('linie');
          t += dt; r.progress(t / need); if (t >= need) finish({ seconds: t });
          return;
        }
        case 'still-sitzen':
          if (d > NEAR) { t = 0; return; }
          if (p.sprinting) return flee('gerannt');
          if (p.speed > 0.15) { t = Math.max(0, t - dt * 2); return; }
          t += dt; r.progress(t / need); if (t >= need) finish({ seconds: t });
          return;
        case 'fangen':
          if (d < (r.params.touch || 1.6)) {
            touches++; r.progress(touches / (r.params.touches || 3));
            if (creature.hop) creature.hop(); else { creature = { x: creature.x + (touches % 2 ? 6 : -4), z: creature.z + 5 }; }
            r.ctx.marker(creature, { label: 'Fangen', icon: 'herz' });
            if (touches >= (r.params.touches || 3)) finish({ touches });
          }
          return;
        case 'stillstehen-umsehen':
          if (d > NEAR) { t = 0; return; }
          if (p.speed > 0.1) { t = 0; turned = 0; lastYaw = null; return; }
          if (lastYaw !== null) turned += Math.abs(((p.yaw - lastYaw + Math.PI) % (Math.PI * 2)) - Math.PI);
          lastYaw = p.yaw;
          t += dt; r.progress(Math.min(1, Math.min(t / need, turned / (r.params.turn || 1.2))));
          if (t >= need && turned >= (r.params.turn || 1.2)) finish({ seconds: t, turned });
          return;
        default: return;
      }
    },
    stop() { r.active = false; cleanup(r); },
    get creature() { return creature; },
  });
}

// ---- 7 Lotsen: Symbolbefehle oder Folgen-Modus mit Stopp-Recht (Minispiel WP38); Rückfall: Interaktion an der Figur ----
function lotsen(step, o) {
  const r = base(step, o);
  let running = false;
  const go = async () => {
    if (running) return;
    running = true;
    if (r.params.room && r.ctx.enterRoom) await r.ctx.enterRoom(r.params.room, 'eingang');
    let res = null;
    if (r.ctx.lotsen) res = await r.ctx.lotsen({ ...r.params, stoppRecht: true, visualFallback: true });
    running = false;
    if (!r.active) return;
    if (res && res.ok === false) { r.fail('lotsen'); return; }
    r.active = false; cleanup(r); r.done(res || { guide: r.params.guide, mode: r.params.mode });
  };
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || `${r.params.guide} lotsen`, target: r.params.at ? r.ctx.resolvePos(r.params.at) : null, icon: 'team' }),
    start() {
      r.active = true;
      const at = r.params.at ? r.ctx.resolvePos(r.params.at) : (r.ctx.npcPos ? r.ctx.npcPos(r.params.guide) : null) || r.ctx.player();
      r.ctx.marker(at, { label: 'Lotsen', icon: 'team' });
      interact(r, { id: 'lotsen-' + r.step.id, x: at.x, z: at.z, radius: at.r || 4, label: r.params.mode === 'folgen' ? 'Folgen' : 'Lotsen', priority: 2, onAction: go });
    },
    update() {},
    stop() { r.active = false; cleanup(r); },
    go,
  });
}

// ---- 8 Boss: Phasen (grün/gelb/rot) mit Puls-Deckel und gewaltfreier Siegbedingung ----
export const BOSS_WIN_EVENT = { 'hilfe-holen': 'hilfe:holen', zuschauer: 'zuschauer:wende', lauschen: 'dialogue:lauschen', fakten: 'ermitteln:done' };
function boss(step, o) {
  const r = base(step, o);
  const phases = r.params.phases || [];
  let k = r.data.phase || 0, sub = null, winDone = false;
  const finish = () => { if (r.ctx.pulsCap) r.ctx.pulsCap(null); r.active = false; cleanup(r); r.done({ phases: phases.length, win: r.params.win }); };
  const waitWin = () => {
    const ev = BOSS_WIN_EVENT[r.params.win];
    if (r.ctx.winWait) { r.ctx.winWait(r.params.win, { boss: r.step.id }).then(() => { if (r.active && !winDone) { winDone = true; finish(); } }); return; }
    listen(r, ev, (e) => { if (r.params.win === 'lauschen' && e && e.ok === false) return; if (!winDone) { winDone = true; finish(); } });
  };
  const run = () => {
    if (sub) { sub.stop(); sub = null; }
    if (k >= phases.length) { waitWin(); return; }
    const ph = phases[k];
    r.data.phase = k;
    if (r.ctx.pulsCap) r.ctx.pulsCap(ph.pulsCap !== undefined ? ph.pulsCap : 80);
    if (r.ctx.emit) r.ctx.emit('boss:phase', { step: r.step.id, phase: k, zone: ph.zone, pulsCap: ph.pulsCap });
    sub = createRunner({ id: `${r.step.id}-phase${k}`, template: ph.template, params: ph.params }, { quest: r.quest, ctx: r.ctx, done: () => { k++; r.progress(k / (phases.length + 1)); run(); }, fail: (why) => r.fail(why) });
    sub.start();
  };
  return Object.assign(r, {
    get phase() { return k; },
    describe: () => ({ label: r.step.label || `Boss: Phase ${Math.min(k + 1, phases.length)}/${phases.length}`, target: sub && sub.describe ? sub.describe().target : null, icon: 'blitz' }),
    start() { r.active = true; run(); },
    update(dt) { if (sub) sub.update(dt); },
    stop() { r.active = false; if (sub) sub.stop(); if (r.ctx.pulsCap) r.ctx.pulsCap(null); cleanup(r); },
  });
}

// ---- 9/10 Bauen und Prüfung: ein Minispiel; Bronze reicht für die Geschichte, failForward nach 3 Versuchen ----
function minigameStep(icon) {
  return (step, o) => {
    const r = base(step, o);
    let tries = r.data.tries || 0, running = false;
    const play = async () => {
      if (running || !r.active) return;
      running = true;
      const res = await r.ctx.minigame(r.params.minigame, { step: r.step.id, quest: r.quest && r.quest.id, tries });
      running = false;
      if (!r.active) return;
      tries++; r.data.tries = tries;
      const min = (r.ctx.minMedal && r.ctx.minMedal(r.params.minigame)) || 'bronze';
      const ok = res && (res.ok === true || (res.medal && MEDAL_RANK[res.medal] >= MEDAL_RANK[min]));
      const failForward = r.ctx.failForward ? r.ctx.failForward(r.params.minigame) : true;
      if (ok || res && res.cancelled === false && failForward && tries >= 3) { r.active = false; cleanup(r); r.done({ medal: res && res.medal, tries, ok: !!ok }); return; }
      if (res && res.cancelled) { offer(); return; }
      r.fail('minispiel');
      offer();
    };
    const offer = () => {
      const p = r.params.at ? r.ctx.resolvePos(r.params.at) : r.ctx.player();
      // params.label: sichtbarer Name der Station (z. B. „Wasserwerk“), sonst „Start“
      const label = r.params.label || 'Start';
      r.ctx.marker(p, { label, icon });
      interact(r, { id: 'mini-' + r.step.id, x: p.x, z: p.z, radius: 4, label, priority: 2, onAction: play });
    };
    return Object.assign(r, {
      describe: () => ({ label: r.step.label || `Minispiel: ${r.params.minigame}`, target: r.params.at ? r.ctx.resolvePos(r.params.at) : null, icon }),
      start() {
        r.active = true;
        if (r.params.at) { const at = r.ctx.resolvePos(r.params.at); if (dist(r.ctx.player(), at) > (at.r || 4)) { offer(); return; } }
        play();
      },
      update() {},
      stop() { r.active = false; cleanup(r); },
      play,
    });
  };
}

// ---- 11 Nachtwache: eine Variante aus dem Pool (Scheduler WP42) ----
function nachtwache(step, o) {
  const r = base(step, o);
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || 'Wer braucht heute jemanden?', target: null, icon: 'laterne' }),
    async start() {
      r.active = true;
      const res = r.ctx.nachtwache ? await r.ctx.nachtwache(r.params.pool, { step: r.step.id }) : { id: r.params.pool[0], fit: true };
      if (!r.active) return;
      r.active = false; r.done(res || {});
    },
    update() {},
    stop() { r.active = false; cleanup(r); },
  });
}

// ---- 12 Erinnerung: Diorama eines Splitters (WP54); der Splitter kommt aus der MemoryDef ----
function erinnerung(step, o) {
  const r = base(step, o);
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || 'Eine Erinnerung', target: r.params.at ? r.ctx.resolvePos(r.params.at) : null, icon: 'splitter' }),
    async start() {
      r.active = true;
      const res = r.ctx.memory ? await r.ctx.memory(r.params.memory, { step: r.step.id }) : { memory: r.params.memory };
      if (!r.active) return;
      r.active = false; r.done(res || {});
    },
    update() {},
    stop() { r.active = false; cleanup(r); },
  });
}

// ---- 13 Auftrag: ein Missions-Plugin spielt den Schritt (z. B. im Nest) und setzt am Ende flags.<flag>. Der Marker zeigt
// draußen auf den Ort (at); drinnen führt das Plugin selbst (die Ziel-Zeile ist im Innenraum aus). Ist das Flag schon
// gesetzt (Neu laden nach dem Schritt), ist der Schritt sofort fertig.
function auftrag(step, o) {
  const r = base(step, o);
  const at = r.params.at ? r.ctx.resolvePos(r.params.at) : null;
  const fertig = () => !!(r.ctx.evalCond && r.ctx.evalCond({ flag: r.params.flag }));
  return Object.assign(r, {
    describe: () => ({ label: r.step.label || 'Auftrag', target: at, icon: r.params.icon || 'auftrag' }),
    start() {
      r.active = true;
      if (at) r.ctx.marker(at, { label: r.step.label || 'Auftrag', icon: r.params.icon || 'auftrag' });
      if (r.ctx.emit) r.ctx.emit('quest:auftrag', { step: r.step.id, flag: r.params.flag, room: r.params.room || null });
    },
    update() { if (!r.active || !fertig()) return; r.active = false; cleanup(r); r.done({ flag: r.params.flag }); },
    stop() { r.active = false; cleanup(r); },
  });
}

export const FACTORIES = { auftrag, wegTor, tragen, szene, ermitteln, treppe, befreunden, lotsen, boss, bauen: minigameStep('hammer'), pruefung: minigameStep('medaille'), nachtwache, erinnerung };

export function createRunner(step, o) {
  const f = FACTORIES[step.template];
  if (!f) throw new Error(`Unbekannte Vorlage '${step.template}' (Schritt ${step.id})`);
  return f(step, o);
}
