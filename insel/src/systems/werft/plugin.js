// Werft-Plugin (BAUPLAN §2.1 A4, ohne Nest-Innenraum): eine offene Werkbank am Steg (SITES.werft). Dort baut man aus
// dem Geborgenen die Teile der Kielpost (content/boot/teile.js): Ausleger, Segel, Laterne. Jedes Teil ist danach als
// Mesh am Boot zu sehen (actors/boot.js setTeile). Die Laterne braucht Ildas Plan (flags.boot.plan.laterne).
//   Spielstand: boot.teile[] (gebaut) · bergen.material (wird bezahlt) · Pläne: flags.boot.plan.<plan>
//   Blitz-Motor (QUELLE): versteckt bis flags.boot.plan.blitzmotor; nach dem Bau übernimmt systems/nest (Glas + Riss, Deko)
//   Ereignisse: werft:open · werft:gebaut {id}
//   game.plugins.werft → { teile, check(id), canBuild(id), anyBuildable(), build(id), open() }
//   Debug: LUMO.debug.werft.{ open(), build(id) }
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { SITES } from '../../world/island.js';
import { checkBuild, payFor } from './model.js';

const CSS = `
.wf-list{display:grid;gap:10px}
.wf-card{display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:center;background:rgba(255,255,255,.08);border-radius:14px;padding:10px 12px}
.wf-card.is-done{background:rgba(57,208,200,.18)}
.wf-ico{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;background:rgba(255,209,102,.18)}
.wf-name{font:900 18px/1.1 system-ui,sans-serif}
.wf-sub{font:600 14px/1.2 system-ui,sans-serif;opacity:.85;margin-top:2px}
.wf-cost{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.wf-chip{display:flex;align-items:center;gap:4px;font:800 13px/1 system-ui,sans-serif;padding:4px 7px;border-radius:999px;background:rgba(0,0,0,.25)}
.wf-chip i{width:11px;height:11px;border-radius:3px;display:inline-block}
.wf-chip.is-missing{background:rgba(255,93,115,.35)}
.wf-btn{min-width:96px;min-height:48px;border-radius:12px;border:0;font:900 16px/1 system-ui,sans-serif;background:#ffd166;color:#2a1f10;cursor:pointer}
.wf-btn[disabled]{background:rgba(255,255,255,.18);color:rgba(255,255,255,.8);cursor:default}
`;

export default {
  id: 'werft', order: 66.7, deps: ['kielpost', 'bergen'],
  install(game) {
    const { events, state, ui, scene, particles, audio, content, interactions } = game;
    const kp = game.plugins.kielpost;
    const TEILE = content.get('boot', 'teile') || { teile: [], materialien: [], zeilen: {} };
    const teile = TEILE.teile || [];
    const mats = TEILE.materialien || [];
    const W = SITES.werft;
    if (typeof document !== 'undefined' && !document.getElementById('wf-css')) { const s = document.createElement('style'); s.id = 'wf-css'; s.textContent = CSS; document.head.appendChild(s); }

    // ---- Werkbank: offenes Dach auf vier Pfosten, Tisch, Bock, Planken, Werkzeugbrett ----
    const island = game.world.island;
    const y0 = island.getHeight(W.x, W.z);
    const yaw = Math.atan2(6 - W.x, 146 - W.z);   // zur Kielpost am Steg
    const P = [];
    for (const [px, pz] of [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]]) P.push(part(new THREE.BoxGeometry(0.18, 2.6, 0.18), { pos: [px, 1.3, pz], color: '#6e4a30' }));
    P.push(part(new THREE.BoxGeometry(3.8, 0.12, 3.0), { pos: [0, 2.7, 0], rot: [0.16, 0, 0], color: '#b0563a', faceVar: 0.1, seed: 7 }));
    P.push(part(new THREE.BoxGeometry(2.2, 0.14, 0.9), { pos: [0, 0.9, -0.5], color: '#c9a071', faceVar: 0.08 }));
    for (const px of [-0.95, 0.95]) P.push(part(new THREE.BoxGeometry(0.12, 0.84, 0.8), { pos: [px, 0.42, -0.5], color: '#7a4a24' }));
    P.push(part(new THREE.BoxGeometry(1.4, 0.9, 0.06), { pos: [0, 1.7, -1.15], color: '#8a6a4a' }));
    P.push(part(new THREE.BoxGeometry(0.08, 0.5, 0.04), { pos: [-0.4, 1.7, -1.1], color: '#3d3a44' }));
    P.push(part(new THREE.BoxGeometry(0.5, 0.08, 0.04), { pos: [0.3, 1.9, -1.1], color: '#3d3a44' }));
    P.push(part(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 10, 1), { pos: [0.5, 1.07, -0.5], rot: [Math.PI / 2, 0, 0], color: '#e8d6a8' }));   // Taurolle
    for (let i = 0; i < 3; i++) P.push(part(new THREE.BoxGeometry(0.3, 0.08, 2.2), { pos: [1.2 + i * 0.05, 0.1 + i * 0.09, 0.7], rot: [0, 0.1 * i, 0], color: '#a8743f' }));
    const mesh = new THREE.Mesh(merge(P), game.materials.lambertVC('werft'));
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.position.set(W.x, y0, W.z); mesh.rotation.y = yaw;
    mesh.name = 'werft';
    scene.add(mesh);
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const toW = (lx, lz) => ({ x: W.x + lx * c + lz * s, z: W.z - lx * s + lz * c });
    for (const [lx, lz] of [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]]) { const p = toW(lx, lz); game.colliders.addCircle(p.x, p.z, 0.16, { group: 'werft' }); }
    { const p = toW(0, -0.5); game.colliders.addBox(p.x, p.z, 1.1, 0.45, yaw, { group: 'werft' }); }

    // Pläne: flags.boot.plan.<plan> (Laterne von Ilda, Blitz-Motor von Tun in QUELLE)
    const plans = () => teile.filter((t) => t.plan && state.get('flags.boot.plan.' + t.plan)).map((t) => t.plan);
    const built = () => state.get('boot.teile', []) || [];
    const material = () => state.get('bergen.material', {}) || {};
    const byId = (id) => teile.find((t) => t.id === id);
    const check = (id) => { const t = byId(id); return t ? checkBuild(t, material(), { plans: plans(), gebaut: built() }) : null; };
    const canBuild = (id) => { const r = check(id); return !!(r && r.ok); };
    const anyBuildable = () => teile.some((t) => canBuild(t.id));

    function build(id) {
      const t = byId(id);
      if (!t || !canBuild(id)) return false;
      state.set('bergen.material', payFor(t, material()));
      state.addUnique('boot.teile', id);
      audio.play('unlock');
      const b = kp.boat;
      particles.emit({ x: b.x, y: b.y + 1.5, z: b.z, count: 30, spread: 1.4, up: 2.4, speed: 2.2, color: '#ffd166', size: 0.16, life: 1.2, gravity: -1.2, drag: 1.3, additive: true });
      particles.emit({ x: W.x, y: y0 + 1.2, z: W.z, count: 16, spread: 0.6, up: 1.8, speed: 1.6, color: '#ffe7a0', size: 0.14, life: 0.9, gravity: -1.2, drag: 1.4, additive: true });
      if (ui.glimm && t.glimm) setTimeout(() => ui.glimm(t.glimm, { seconds: 2.6 }), 300);
      events.emit('werft:gebaut', { id });
      if (game.save && game.save.request) game.save.request('force');   // Teil gebaut = abgeschlossener Schritt
      return true;
    }

    const chip = (k, need, have) => { const m = mats.find((x) => x.id === k) || { name: k, color: '#ccc' }; return `<span class="wf-chip${have < need ? ' is-missing' : ''}"><i style="background:${m.color}"></i>${m.name} ${Math.min(have, need)}/${need}</span>`; };
    function render(body) {
      const m = material();
      // versteckte Teile (Blitz-Motor) erst mit Plan oder wenn schon gebaut
      const shown = teile.filter((t) => !t.versteckt || plans().includes(t.plan) || built().includes(t.id));
      body.innerHTML = `<div class="wf-list">${shown.map((t) => {
        const r = check(t.id);
        const cost = Object.entries(t.kosten || {}).map(([k, n]) => chip(k, n, m[k] || 0)).join('');
        const btn = r.gebaut ? `<button class="wf-btn" type="button" disabled>${ui.icon ? ui.icon('check', { size: 20 }) : ''}</button>`
          : !r.plan ? `<button class="wf-btn" type="button" disabled>${(TEILE.zeilen.planFehlt || {}).label || ''}</button>`
            : `<button class="wf-btn" type="button" data-build="${t.id}"${r.ok ? '' : ' disabled'}>${r.ok ? 'Bauen' : (TEILE.zeilen.fehlt || {}).label || ''}</button>`;
        return `<div class="wf-card${r.gebaut ? ' is-done' : ''}" data-teil="${t.id}"><div class="wf-ico">${ui.icon ? ui.icon(t.icon, { size: 30 }) : ''}</div>
          <div><div class="wf-name">${t.name}</div><div class="wf-sub">${t.label}</div><div class="wf-cost">${cost}</div></div>${btn}</div>`;
      }).join('')}</div>`;
      body.querySelectorAll('[data-build]').forEach((b) => b.addEventListener('click', () => { if (build(b.dataset.build)) render(body); }));
    }
    function open() {
      if (!ui.overlay) return null;
      audio.play('open');
      events.emit('werft:open', {});
      return ui.overlay.open({ id: 'werft', title: 'Werft', icon: 'hammer', kind: 'panel', content: (body) => render(body) });
    }
    const item = interactions.add({ id: 'werft', x: toW(0, 0.6).x, z: toW(0, 0.6).z, radius: 2.8, label: 'Werft', priority: 1, enabled: false, onAction: () => open() });
    game.addUpdate(() => { item.enabled = kp.available() && !kp.onBoat; }, { order: -44.5 });

    const D = game.debug || (game.debug = {});
    D.werft = { open, build, check };
    return { teile, check, canBuild, anyBuildable, build, open };
  },
};
