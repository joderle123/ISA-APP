// Nest v1 (BAUPLAN §2.1 A5, Kürzungsliste Punkt 4: zu Fuß erreichbar, kein zweiter Anleger): das Bootshaus am Strand
// westlich vom Steg (Pfahlbau halb über dem Wasser, Landtür an SITES.bootshaus) und sein Innenraum „Nest“ (Raum-Baukasten,
// Kit 'werkstatt', Licht-Preset 'bootshaus'). Drinnen: Werkbank (öffnet die Werft), Wasserluke mit Tuns Winde,
// Kartentisch (Jolies Route), Hängematte, zwei Bauplätze für QUELLE (Fotowand, Dachboden-Ecke), Deko-Motor.
// Dazu die Nest-Gläser je Figur (wie voll; wie wichtig steht in content/npcs/*.js glaeser) und der Blitz-Motor-Riss.
// REGEL: Nest-Werte ändern sich NUR durch Ereignisse, NIE durch Zeit (kein Tages-/Uhr-Hörer, keine Schleife schreibt).
//   game.nest = game.plugins.nest → {
//     enter({ spawn }), exit(), isInside, room: 'nest', site, available(),
//     glaeser: { list(npc), get(npc, need), set(npc, need, voll, { grund }), add(npc, need, delta, { grund }), luecke(npc), folge(npc) },
//     slots:   { list(), state(id), open(id), build(id, { force }) },   fotowand: { hang(npc), bilder() },  route: { set(id), get() },
//     blitzmotor(): Riss setzen (macht die Werft beim Bau selbst), riss(), sitzung, model, refresh() }
//   Ereignisse aus: nest:enter · nest:exit · nest:glas {npc, need, voll, prev, grund} · nest:slot {id, state} · nest:gebaut {id}
//     · nest:bild {npc} · nest:route {id} · nest:riss {npc, need, phase:'leckt'|'aus'} · nest:sitzung {sitzung, ausgelaufen}
//     · nest:station {id: 'werkbank'|'winde'|'karte'|'haengematte'|'fotowand'|'dachboden', handled} (Aktion drinnen; Missionen hängen sich an)
//   Ereignisse ein: nest:glas:set {npc, need, voll} · nest:glas:add {npc, need, delta} · werft:gebaut {id:'blitzmotor'}
//     · Quest-Effekt { tank: { npc, tank: '<bedürfnis>', add } | { npc, tank, set } } für Figuren mit glaeser (0–1; |add| > 1 zählt als Prozent)
//     · Flag flags.nest.offen.<platz> = true öffnet einen Bauplatz (Quest-Effekt { flag: 'nest.offen.fotowand' })
//   Spielstand: nest { sitzung, glaeser:{npc:{need:0..1}}, gebaut[], bilder[], riss, route, deko[] } · flags.nest.offen.*
//   Sitzung: beim Installieren (= Laden der Seite) und bei jedem save:load zählt nest.sitzung hoch; ein Riss aus einer
//     früheren Sitzung ist dann ausgelaufen (Wunsch weg, echter Füllstand bleibt). Nie nach Uhrzeit.
//   Debug: LUMO.debug.nest.{ info(), enter(), glas(npc, need, v), open(id), build(id), bild(npc), route(id), blitz(), neueSitzung() }
import * as THREE from 'three';
import { SITES } from '../../world/island.js';
import * as MDL from './model.js';

export const NEST_ID = 'nest';
export const NEST_YAW = 0.52;                      // Bug des Bootshauses zur See (Strand westlich vom Steg)
export const NEST_ROOM = {
  id: NEST_ID, kit: 'werkstatt', size: [14, 5.5, 12], light: 'bootshaus', camera: { dist: 6.2 },
  spawns: { eingang: [0, 0, 3.8], mitte: [0, 0, 0.5], dachboden: [3.4, 0, -0.9], werkbank: [0, 0, -2.6] },
  exits: [{ at: [0, 0, 5.6], r: 1.4, to: { site: 'bootshaus' }, label: 'Hinaus', kind: 'tuer' }],
  features: [
    { type: 'haengematte', at: [-4.2, 0, -3.5], yaw: 0, color: '#d9a066' },
    { type: 'tisch', at: [2.4, 0, 2.5], width: 1.7 },
    { type: 'kiste', at: [-6.1, 0, 5.1], size: 0.8, color: '#8a6a48' },
    { type: 'kiste', at: [6.0, 0, 5.1], size: 0.9 },
    { type: 'kiste', at: [6.1, 0, 4.0], size: 0.6, color: '#b08a5a' },
  ],
};
// Orte im Raum (lokal: Ursprung Bodenmitte, +z zur Tür)
export const SPOTS = {
  werkbank: { act: [0, 0, -3.3], r: 2.2, label: 'Werkbank' },
  fotowand: { at: [-6.82, 0, -0.4], act: [-5.3, 0, -0.4], r: 2.0 },
  dachboden: { at: [5.0, 0, -4.3], act: [3.3, 0, -1.9], r: 2.0 },
  karte: { at: [2.4, 0, 2.5], act: [2.4, 0, 3.6], r: 1.9, label: 'Karte' },
  winde: { at: [-5.9, 0, 1.7], act: [-4.6, 0, 1.2], r: 1.9, label: 'Winde' },
  luke: { at: [-3.1, 0, 3.4] },
  haengematte: { act: [-4.2, 0, -2.4], r: 1.8, label: 'Hängematte' },
  motor: { at: [5.2, 0, 2.9] },
};
const SLOT_LABEL = { zu: null, offen: 'Bauen', gebaut: null };

export default {
  id: 'nest', order: 66.8, deps: ['ui', 'werft'],
  install(game) {
    const { events, state, content, ui, scene, particles, audio, player, interactions } = game;
    const island = game.world.island;
    const scenes = game.scenes;
    const kp = game.plugins.kielpost || null;
    const M = game.props.materials;
    const { part, merge } = game.geom;
    const emit = (n, p) => events.emit(n, p);
    const TEILE = content.get('boot', 'teile') || { zeilen: {} };

    // ---- Zustand (nur über diese Funktionen) ----
    const nest = () => MDL.normNest(state.get('nest'));
    const write = (n) => state.set('nest', n);
    const npcDef = (id) => content.get('npcs', id) || { id, glaeser: {} };
    const isOffen = (id) => !!state.get('flags.nest.offen.' + id);
    const request = () => { if (game.save && game.save.request) game.save.request('force'); };

    // ---- Sitzung: Laden = neue Sitzung (Riss läuft aus) ----
    function sessionStart(via) {
      const r = MDL.startSession(nest());
      write(r.nest);
      emit('nest:sitzung', { sitzung: r.nest.sitzung, ausgelaufen: r.ausgelaufen, via });
      if (r.ausgelaufen) {
        emit('nest:riss', { ...r.ausgelaufen, phase: 'aus' });
        const say = () => { const z = TEILE.zeilen && TEILE.zeilen.rissAus; if (ui.glimm && z && z.glimm) ui.glimm(z.glimm, { seconds: 3 }); };
        if (game.started) setTimeout(say, 1600); else events.once('game:start', () => setTimeout(say, 2400));
      }
      return r;
    }

    // ---- Gläser ----
    const glaeser = {
      list: (npc) => MDL.glassesOf(npcDef(npc), nest()),
      get(npc, need) { const g = glaeser.list(npc).find((x) => x.id === need); return g ? { wichtig: g.wichtig, voll: g.voll, echt: g.echt, luecke: g.luecke, riss: g.riss } : null; },
      set(npc, need, voll, { grund = null } = {}) {
        const r = MDL.setVoll(nest(), npc, need, voll, npcDef(npc));
        if (!r.ok) return null;
        write(r.nest);
        emit('nest:glas', { npc, need, voll: r.voll, prev: r.prev, grund });
        refreshFolgen();
        return r.voll;
      },
      add(npc, need, delta, { grund = null } = {}) { const cur = MDL.realVoll(npcDef(npc), nest(), need); return glaeser.set(npc, need, cur + (Number(delta) || 0), { grund }); },
      luecke: (npc) => MDL.groessteLuecke(glaeser.list(npc)),
      folge: (npc) => MDL.folgeAktiv(glaeser.list(npc)),
    };
    events.on('nest:glas:set', (e) => { if (e && e.npc && e.need) glaeser.set(e.npc, e.need, e.voll, { grund: e.grund || 'ereignis' }); });
    events.on('nest:glas:add', (e) => { if (e && e.npc && e.need) glaeser.add(e.npc, e.need, e.delta, { grund: e.grund || 'ereignis' }); });
    // Quest-/Dialog-Effekt { tank: { npc, tank, add|set } }: Figuren mit Gläsern und die sechs Kurs-Bedürfnisse laufen hierher
    if (game.dsl && game.dsl.hooks) {
      const prevTank = game.dsl.hooks.tank;
      game.dsl.hooks.tank = (v, e) => {
        const d = v && v.npc ? content.get('npcs', v.npc) : null;
        if (d && d.glaeser && MDL.NEEDS.includes(v.tank)) {
          if (typeof v.set === 'number') return glaeser.set(v.npc, v.tank, v.set, { grund: 'quest' });
          const a = Number(v.add) || 0;
          return glaeser.add(v.npc, v.tank, Math.abs(a) > 1 ? a / 100 : a, { grund: 'quest' });
        }
        return prevTank ? prevTank(v, e) : undefined;
      };
    }

    // ---- Bauplätze ----
    const slots = {
      list: () => MDL.SLOTS.map((s) => ({ id: s.id, name: s.name, icon: s.icon, state: slots.state(s.id) })),
      state: (id) => MDL.slotState(nest(), id, isOffen(id)),
      open(id) {
        if (!MDL.slotById(id) || isOffen(id)) return slots.state(id);
        state.set('flags.nest.offen.' + id, true);
        return slots.state(id);
      },
      build(id, { force = false } = {}) {
        if (force) slots.open(id);
        const r = MDL.buildSlot(nest(), id, isOffen(id));
        if (!r.ok) return { ok: false, reason: r.reason };
        write(r.nest);
        const s = MDL.slotById(id);
        if (audio && audio.play) audio.play('unlock');
        const sp = SPOTS[id];
        if (particles && inside() && scenes.pocket) { const p = scenes.pocket; particles.emit({ x: p.x + sp.at[0] * 0.8, y: p.y + 1.6, z: p.z + sp.at[2], count: 34, spread: 1.4, up: 2.2, speed: 2, color: '#ffd166', size: 0.16, life: 1.2, gravity: -1.2, drag: 1.3, additive: true }); }
        if (ui.toast) ui.toast(`${s.name} gebaut.`, 2400);
        emit('nest:gebaut', { id });
        request();
        return { ok: true };
      },
    };
    state.on('flags', (e) => {
      const m = /^flags\.nest\.offen\.([a-z]+)$/.exec(e.path || '');
      if (m) { emit('nest:slot', { id: m[1], state: slots.state(m[1]) }); refresh('slots'); }
      else if (e.path === 'flags' || e.path === 'flags.nest' || e.path === 'flags.nest.offen') refresh('slots');
    });
    events.on('nest:gebaut', (e) => { emit('nest:slot', { id: e.id, state: 'gebaut' }); refresh('slots'); });
    const fotowand = {
      hang(npc) { const r = MDL.hangBild(nest(), npc); if (!r.ok) return false; write(r.nest); emit('nest:bild', { npc }); refresh('fotowand'); request(); return true; },
      bilder: () => nest().bilder.slice(),
    };
    const route = {
      set(id) { const r = MDL.setRoute(nest(), id); write(r.nest); emit('nest:route', { id: id || null }); refresh('karte'); return r.nest.route; },
      get: () => nest().route,
    };

    // ---- Blitz-Motor (Werft baut, hier: Glas voll + Riss, Deko-Motor im Nest) ----
    function blitzmotor() {
      const r = MDL.blitzmotor(nest(), npcDef(MDL.BLITZ.npc));
      if (!r.ok) return false;
      write(r.nest);
      emit('nest:riss', { npc: r.nest.riss.npc, need: r.nest.riss.need, phase: 'leckt' });
      refresh('motor'); refreshFolgen();
      request();
      return true;
    }
    events.on('werft:gebaut', (e) => { if (e && e.id === 'blitzmotor') blitzmotor(); });

    // ================= Außen: Bootshaus auf Pfählen =================
    const site = SITES.bootshaus;
    const yaw = NEST_YAW;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const L = 10, W = 7, DOOR = 7.6;   // Länge (Land → See), Breite, Abstand Tür-Vorplatz → Mitte
    const C = { x: site.x + s * DOOR, z: site.z + c * DOOR };
    const toW = (lx, lz) => ({ x: C.x + lx * c + lz * s, z: C.z - lx * s + lz * c });
    const gh = (lx, lz) => { const p = toW(lx, lz); return island.getHeight(p.x, p.z); };
    const floorY = Math.max(gh(0, -L / 2 - 0.6), gh(-W / 2, -L / 2), gh(W / 2, -L / 2), 0.6) + 0.18;
    const outside = { x: C.x, z: C.z, y: floorY, door: toW(0, -L / 2 - 0.9) };
    try {
      const P = [], G = [];
      const wood = '#7a4f33', wood2 = '#8e5f3c', roof = '#a8493a', trim = '#e8d6a8';
      // Pfähle bis in den Grund, Boden
      for (const lx of [-W / 2 + 0.3, W / 2 - 0.3]) for (const lz of [-4.4, -1.5, 1.5, 4.4]) { const top = floorY - 0.1; const bot = Math.min(gh(lx, lz), top - 0.6) - 0.8; P.push(part(new THREE.CylinderGeometry(0.17, 0.2, top - bot, 6, 1), { pos: [lx, (top + bot) / 2 - floorY, lz], color: '#5c3c26' })); }
      P.push(part(new THREE.BoxGeometry(W + 0.8, 0.26, L + 1.0), { pos: [0, -0.13, 0.3], color: '#9a6a42', faceVar: 0.1, seed: 3 }));
      for (let i = 0; i < 9; i++) P.push(part(new THREE.BoxGeometry(W + 0.8, 0.03, 0.05), { pos: [0, 0.005, -L / 2 + 0.2 + i * 1.2], color: '#6e4a2e' }));
      // Wände (Planken), Landseite mit Türöffnung, Seeseite mit halb offenem Bootstor
      const H = 3.1;
      const planks = (lx0, lx1, lz, h, rotY = 0) => { const w = Math.abs(lx1 - lx0); P.push(part(new THREE.BoxGeometry(w, h, 0.18, Math.max(1, Math.round(w / 0.6)), 1, 1), { pos: [(lx0 + lx1) / 2, h / 2, lz], rot: [0, rotY, 0], faceVar: 0.14, seed: 11, faceColor: (x, y, z, out) => out.set(Math.floor((x + 10) / 0.55) % 2 ? wood : wood2) })); };
      for (const lx of [-W / 2, W / 2]) P.push(part(new THREE.BoxGeometry(0.18, H, L, 1, 1, Math.round(L / 0.55)), { pos: [lx, H / 2, 0], faceVar: 0.14, seed: 12, faceColor: (x, y, z, out) => out.set(Math.floor((z + 10) / 0.55) % 2 ? wood : wood2) }));
      planks(-W / 2, -0.8, -L / 2, H); planks(0.8, W / 2, -L / 2, H); planks(-0.8, 0.8, -L / 2, 0.75); P[P.length - 1].translate(0, H - 0.75, 0);
      planks(-W / 2, -2.2, L / 2, H); planks(2.2, W / 2, L / 2, H); planks(-2.2, 2.2, L / 2, 0.9); P[P.length - 1].translate(0, H - 0.9, 0);
      // Tür (Landseite) mit Rahmen, Bootstor-Flügel (See) halb offen, dunkles Inneres dahinter
      P.push(part(new THREE.BoxGeometry(1.5, 2.36, 0.08), { pos: [0, 1.18, -L / 2 + 0.02], color: '#5a3a24', faceVar: 0.08 }));
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.14, 2.5, 0.26), { pos: [sx * 0.82, 1.25, -L / 2 - 0.02], color: trim }));
      P.push(part(new THREE.BoxGeometry(1.8, 0.14, 0.26), { pos: [0, 2.44, -L / 2 - 0.02], color: trim }));
      P.push(part(new THREE.SphereGeometry(0.06, 6, 4), { pos: [0.5, 1.15, -L / 2 - 0.08], color: '#ffd166' }));
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(2.1, 2.1, 0.12), { pos: [sx * (2.2 + 0.75), 1.05, L / 2 + 0.85], rot: [0, sx * 1.0, 0], faceVar: 0.12, color: '#6a4630' }));
      P.push(part(new THREE.BoxGeometry(4.3, 2.2, 0.06), { pos: [0, 1.1, L / 2 - 0.4], color: '#20150e' }));
      // Satteldach: zwei Flächen + Giebeldreiecke (Prisma), Firstbalken
      const RW = W / 2 + 0.7, pitch = 0.52, rise = Math.tan(pitch) * (W / 2);
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(RW / Math.cos(pitch) * 0.98, 0.16, L + 1.2, 4, 1, 8), { pos: [sx * (W / 4 + 0.2), H + rise / 2 + 0.06, 0], rot: [0, 0, -sx * pitch], faceVar: 0.12, seed: 5, faceColor: (x, y, z, out) => out.set(Math.floor((z + 10) / 0.75) % 2 ? roof : '#b8584a') }));
      const tri = new THREE.Shape([new THREE.Vector2(-W / 2, 0), new THREE.Vector2(W / 2, 0), new THREE.Vector2(0, rise)]);
      for (const lz of [-L / 2, L / 2]) P.push(part(new THREE.ExtrudeGeometry(tri, { depth: 0.18, bevelEnabled: false }), { pos: [0, H, lz - 0.09], color: wood2 }));
      P.push(part(new THREE.BoxGeometry(0.22, 0.22, L + 1.3), { pos: [0, H + rise + 0.12, 0], color: '#5c3c26' }));
      // Schild über der Tür, Stufen zum Strand
      P.push(part(new THREE.BoxGeometry(1.6, 0.5, 0.08), { pos: [0, 2.85, -L / 2 - 0.14], color: trim }));
      const gDoor = gh(0, -L / 2 - 1.2);
      const steps = Math.max(0, Math.min(5, Math.round((floorY - gDoor) / 0.28)));
      for (let i = 0; i < steps; i++) P.push(part(new THREE.BoxGeometry(1.8, 0.28 * (i + 1), 0.5), { pos: [0, -0.28 * (i + 1) / 2 + 0.0, -L / 2 - 0.75 - (steps - 1 - i) * 0.5], color: '#8a5c3a', faceVar: 0.1 }));
      // Fenster (warm), Laterne neben der Tür, Tau-Rollen und Fender
      for (const sx of [-1, 1]) for (const lz of [-2, 1.4]) G.push(part(new THREE.BoxGeometry(0.06, 0.8, 1.1), { pos: [sx * (W / 2 + 0.08), 1.8, lz], color: '#ffe0a0' }));
      G.push(part(new THREE.SphereGeometry(0.17, 8, 6), { pos: [1.2, 2.2, -L / 2 - 0.35], color: '#ffd28a' }));
      G.push(part(new THREE.OctahedronGeometry(0.13, 0), { pos: [0, 2.85, -L / 2 - 0.2], color: '#ff5d8f' }));
      P.push(part(new THREE.BoxGeometry(0.06, 0.5, 0.06), { pos: [1.2, 2.5, -L / 2 - 0.3], color: '#3a2a20' }));
      for (const [lx, lz] of [[-W / 2 - 0.25, 2.8], [W / 2 + 0.25, -0.5]]) P.push(part(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 8, 1), { pos: [lx, 0.9, lz], rot: [Math.PI / 2, 0, 0], color: '#ff7a59' }));
      P.push(part(new THREE.TorusGeometry(0.32, 0.12, 5, 10), { pos: [-W / 2 + 0.8, 0.2, -L / 2 - 0.5], rot: [Math.PI / 2, 0, 0], color: '#e8d6a8' }));
      const mesh = new THREE.Mesh(merge(P), game.materials.lambertVC('bootshaus'));
      mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = 'bootshaus';
      const gm = new THREE.Mesh(merge(G), M.glow('#ffd28a', { intensity: 1.0 })); gm.name = 'bootshaus-licht';
      const grp = new THREE.Group(); grp.name = 'bootshaus-aussen'; grp.add(mesh); grp.add(gm);
      grp.position.set(C.x, floorY, C.z); grp.rotation.y = yaw;
      scene.add(grp);
      outside.group = grp;
      // Kollision: Hauskörper (nur an Land relevant), Stufen frei
      game.colliders.addBox(C.x, C.z, W / 2 + 0.2, L / 2 + 0.2, yaw, { group: 'bootshaus' });
    } catch (e) { console.warn('[nest] Bootshaus nicht gebaut:', e); }
    const available = () => (kp && kp.available ? kp.available() : true);
    const doorIt = interactions.add({ id: 'nest-tuer', x: outside.door.x, z: outside.door.z, radius: 2.3, label: 'Nest', priority: 3, enabled: false, onAction: () => api.enter() });
    game.addUpdate(() => { doorIt.enabled = available() && !(scenes && scenes.isInterior) && player.state !== 'boot' && !(scenes && scenes.busy); }, { order: -44.4 });

    // ================= Innen: Raum + wachsende Teile =================
    if (scenes) scenes.register(NEST_ROOM);
    const inside = () => !!(scenes && scenes.current && scenes.current.id === NEST_ID);
    const room = () => (scenes ? scenes.room(NEST_ID) : null);
    const parts = {};
    let dyn = null, its = [];
    const mk = (geos, mat, name) => { const m = new THREE.Mesh(merge(geos), mat); m.name = name; m.castShadow = true; m.receiveShadow = true; return m; };
    const grp = (name, at, yawL = 0) => { const g = new THREE.Group(); g.name = name; g.position.set(at[0], at[1] || 0, at[2]); g.rotation.y = yawL; return g; };

    // Tuns Winde an der Wasserluke: Trommel, Kurbel, Tau; klemmt = verkantetes Tau + roter Keil
    function buildWinde() {
      const klemmt = glaeser.folge('tun');
      const g = grp('nest-winde', SPOTS.winde.at, -0.5);
      const P = [];
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.16, 1.2, 0.3), { pos: [sx * 0.6, 0.6, 0], color: '#5c3c26' }));
      P.push(part(new THREE.BoxGeometry(1.5, 0.12, 0.6), { pos: [0, 0.06, 0], color: '#6e4a2e' }));
      const drum = [part(new THREE.CylinderGeometry(0.28, 0.28, 1.0, 10, 1), { rot: [0, 0, Math.PI / 2], color: '#8a6a48' })];
      for (let i = 0; i < 5; i++) drum.push(part(new THREE.TorusGeometry(0.3, 0.045, 4, 12), { pos: [-0.36 + i * 0.18, 0, 0], rot: [0, Math.PI / 2, 0], color: klemmt && i === 2 ? '#c46a3a' : '#e8d6a8' }));
      const dm = mk(drum, M.base, 'nest-winde-trommel'); dm.position.y = 1.05; g.add(dm);
      P.push(part(new THREE.BoxGeometry(0.06, 0.5, 0.06), { pos: [0.72, 1.05 - (klemmt ? 0.1 : 0.2), 0.1], rot: [0, 0, klemmt ? 0.9 : 0], color: '#3d3a44' }));
      P.push(part(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 6, 1), { pos: [klemmt ? 0.92 : 0.72, klemmt ? 0.9 : 0.8, 0.22], rot: [Math.PI / 2, 0, 0], color: '#ff7a59' }));
      // Tau hängt zur Luke
      P.push(part(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 4, 1), { pos: [-0.2, 0.6, 0.55], rot: [0.9, 0, 0], color: '#e8d6a8' }));
      g.add(mk(P, M.base, 'nest-winde-holz'));
      if (klemmt) { const w = mk([part(new THREE.ConeGeometry(0.12, 0.3, 4, 1), { pos: [0.2, 0.74, 0.28], rot: [Math.PI, 0, 0.4], color: '#ff4d4d' })], M.glow('#ff4d4d', { intensity: 0.5 }), 'nest-winde-keil'); g.add(w); }
      g.userData = { klemmt };
      const drumRef = dm;
      let shake = 0;
      return { group: g, show(sec = 1.6) { shake = sec; }, update(dt, t) { if (shake > 0) { shake -= dt; g.rotation.z = Math.sin(t * 38) * 0.04 * Math.min(1, shake); drumRef.rotation.x = Math.sin(t * 30) * 0.08; } else { g.rotation.z = 0; drumRef.rotation.x = klemmt ? 0 : drumRef.rotation.x + dt * 0.3; } } };
    }
    // Wasserluke (Regenwasser des Nests, Gezeitenlicht)
    function buildLuke() {
      const g = grp('nest-luke', SPOTS.luke.at);
      const P = [];
      for (const [x, z, w, d] of [[0, -1.05, 2.6, 0.2], [0, 1.05, 2.6, 0.2], [-1.3, 0, 0.2, 2.3], [1.3, 0, 0.2, 2.3]]) P.push(part(new THREE.BoxGeometry(w, 0.22, d), { pos: [x, 0.11, z], color: '#5c3c26' }));
      g.add(mk(P, M.base, 'nest-luke-rand'));
      const wm = mk([part(new THREE.BoxGeometry(2.4, 0.04, 1.9), { pos: [0, 0.14, 0], color: '#1a5a78' })], M.glow('#1f7fae', { intensity: 0.08 }), 'nest-luke-wasser'); wm.castShadow = false; g.add(wm);
      return { group: g };
    }
    // Kartentisch: Karte mit Inselumriss; leer (Jolies Glas) = blasses Blatt, Route = gestrichelte Linie + Fähnchen
    function buildKarte() {
      const n = nest();
      const leer = !n.route && glaeser.folge('jolie');
      const g = grp('nest-karte', [SPOTS.karte.at[0], 0.92, SPOTS.karte.at[2]]);
      const P = [part(new THREE.BoxGeometry(1.4, 0.02, 0.95), { pos: [0, 0.01, 0], color: leer ? '#efe9dc' : '#e8dcb8', faceVar: 0.04 })];
      if (!leer) {
        P.push(part(new THREE.CylinderGeometry(0.22, 0.26, 0.02, 7, 1), { pos: [-0.25, 0.03, 0.05], color: '#8fbf6a' }));
        P.push(part(new THREE.CylinderGeometry(0.12, 0.1, 0.02, 5, 1), { pos: [0.35, 0.03, -0.2], color: '#a8b87a' }));
      } else {
        for (let i = 0; i < 4; i++) P.push(part(new THREE.BoxGeometry(1.2, 0.004, 0.01), { pos: [0, 0.024, -0.3 + i * 0.2], color: '#d8d0bc' }));
      }
      g.add(mk(P, M.base, 'nest-karte-blatt'));
      if (n.route) {
        const R = [];
        for (let i = 0; i < 6; i++) R.push(part(new THREE.BoxGeometry(0.08, 0.012, 0.025), { pos: [-0.1 + i * 0.09, 0.03, 0.02 - i * 0.04], rot: [0, 0.4, 0], color: '#ff5d73' }));
        R.push(part(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 4, 1), { pos: [0.44, 0.15, -0.22], color: '#3a2a20' }));
        R.push(part(new THREE.BoxGeometry(0.14, 0.09, 0.01), { pos: [0.51, 0.24, -0.22], color: '#39d0c8' }));
        const rm = mk(R, M.glow('#ff5d73', { intensity: 0.4 }), 'nest-karte-route'); rm.castShadow = false; g.add(rm);
      }
      g.userData = { leer, route: n.route };
      let fl = 0;
      const sheet = g.children[0];
      return { group: g, show(sec = 1.6) { fl = sec; }, update(dt, t) { if (fl > 0) { fl -= dt; sheet.position.y = Math.abs(Math.sin(t * 9)) * 0.03; } else sheet.position.y = 0; } };
    }
    // Fotowand: offen = leuchtender Umriss, gebaut = Korkwand mit Rahmen und Bildern (Figurenfarbe)
    function buildFotowand() {
      const st = slots.state('fotowand');
      const g = grp('nest-fotowand', SPOTS.fotowand.at, Math.PI / 2);
      if (st === 'zu') { g.userData = { state: st }; return { group: g }; }
      if (st === 'offen') {
        const O = [];
        for (const [x, y, w, h] of [[0, 2.55, 2.6, 0.06], [0, 0.95, 2.6, 0.06], [-1.3, 1.75, 0.06, 1.66], [1.3, 1.75, 0.06, 1.66]]) O.push(part(new THREE.BoxGeometry(w, h, 0.04), { pos: [x, y, 0.08], color: '#ffd166' }));
        O.push(part(new THREE.OctahedronGeometry(0.16, 0), { pos: [0, 1.75, 0.35], color: '#ffd166' }));
        const m = mk(O, M.glow('#ffd166', { intensity: 0.9, veil: false }), 'nest-fotowand-umriss'); m.castShadow = false; g.add(m);
        g.userData = { state: st };
        const gem = m;
        return { group: g, update(dt, t) { gem.scale.setScalar(1 + Math.sin(t * 3) * 0.03); } };
      }
      const P = [part(new THREE.BoxGeometry(2.6, 1.7, 0.08), { pos: [0, 1.75, 0.05], color: '#b98a5a', faceVar: 0.1 })];
      for (const [x, y, w, h] of [[0, 2.62, 2.8, 0.1], [0, 0.88, 2.8, 0.1], [-1.35, 1.75, 0.1, 1.84], [1.35, 1.75, 0.1, 1.84]]) P.push(part(new THREE.BoxGeometry(w, h, 0.12), { pos: [x, y, 0.07], color: '#6b4a30' }));
      const bilder = nest().bilder;
      const slotsXY = [[-0.8, 2.05], [0, 2.1], [0.8, 2.0], [-0.45, 1.4], [0.45, 1.35], [0, 1.45]];
      const glows = new Map();
      slotsXY.forEach(([x, y], i) => {
        const who = bilder[i];
        P.push(part(new THREE.BoxGeometry(0.5, 0.5, 0.02), { pos: [x, y, 0.1], rot: [0, 0, (i % 2 ? 0.06 : -0.05)], color: who ? '#fffaf0' : '#e8dcc4' }));
        P.push(part(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 6, 1), { pos: [x, y + 0.22, 0.12], rot: [Math.PI / 2, 0, 0], color: '#ff3b3b' }));
        if (who) { const col = (content.get('npcs', who) || {}).color || '#ffd166'; if (!glows.has(col)) glows.set(col, []); glows.get(col).push(part(new THREE.BoxGeometry(0.4, 0.34, 0.02), { pos: [x, y + 0.03, 0.115], rot: [0, 0, (i % 2 ? 0.06 : -0.05)], color: col })); }
      });
      g.add(mk(P, M.base, 'nest-fotowand-holz'));
      for (const [hex, geos] of glows) { const m = mk(geos, M.glow(hex, { intensity: 0.3 }), 'nest-fotowand-bild'); m.castShadow = false; g.add(m); }
      g.userData = { state: st, bilder: bilder.length };
      return { group: g };
    }
    // Dachboden-Ecke: offen = leuchtender Umriss der Plattform, gebaut = Plattform, Leiter, Kissen, Laterne, Wimpel
    function buildDachboden() {
      const st = slots.state('dachboden');
      const g = grp('nest-dachboden', SPOTS.dachboden.at);
      if (st === 'zu') { g.userData = { state: st }; return { group: g }; }
      const Y = 2.75;
      if (st === 'offen') {
        const O = [];
        for (const [x, z, w, d] of [[0, -1.7, 3.8, 0.06], [0, 1.7, 3.8, 0.06], [-1.9, 0, 0.06, 3.4], [1.9, 0, 0.06, 3.4]]) O.push(part(new THREE.BoxGeometry(w, 0.06, d), { pos: [x, Y, z], color: '#ffd166' }));
        for (const [x, z] of [[-1.9, 1.7], [-1.9, -1.7]]) O.push(part(new THREE.BoxGeometry(0.05, Y, 0.05), { pos: [x, Y / 2, z], color: '#ffd166' }));
        O.push(part(new THREE.OctahedronGeometry(0.16, 0), { pos: [-1.2, 1.4, 2.2], color: '#ffd166' }));
        const m = mk(O, M.glow('#ffd166', { intensity: 0.9, veil: false }), 'nest-dachboden-umriss'); m.castShadow = false; g.add(m);
        g.userData = { state: st };
        return { group: g };
      }
      const P = [part(new THREE.BoxGeometry(3.9, 0.18, 3.5, 6, 1, 1), { pos: [0, Y, 0], faceVar: 0.14, seed: 4, faceColor: (x, y, z, out) => out.set(Math.floor((x + 10) / 0.65) % 2 ? '#9a6a42' : '#8a5c3a') })];
      for (const [x, z] of [[-1.85, 1.65], [-1.85, -1.65]]) P.push(part(new THREE.BoxGeometry(0.16, Y, 0.16), { pos: [x, Y / 2, z], color: '#5c3c26' }));
      for (const x of [-1.9, 0]) P.push(part(new THREE.BoxGeometry(x ? 0.08 : 3.8, 0.08, x ? 3.4 : 0.08), { pos: [x ? x : 0, Y + 0.6, x ? 0 : 1.72], color: '#6e4a2e' }));
      for (let i = 0; i < 5; i++) P.push(part(new THREE.BoxGeometry(0.06, 0.6, 0.06), { pos: [-1.5 + i * 0.75, Y + 0.3, 1.72], color: '#6e4a2e' }));
      // Leiter
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.08, Y + 0.4, 0.08), { pos: [-1.4 + sx * 0.28, (Y + 0.4) / 2, 2.05], rot: [-0.18, 0, 0], color: '#6e4a2e' }));
      for (let i = 0; i < 6; i++) P.push(part(new THREE.BoxGeometry(0.56, 0.05, 0.06), { pos: [-1.4, 0.35 + i * 0.47, 2.18 - i * 0.085], color: '#8a6a48' }));
      // Kissen (Jolie türkis), Decke, Kiste mit Stiften, Wimpel
      P.push(part(new THREE.BoxGeometry(1.4, 0.22, 0.9), { pos: [0.6, Y + 0.2, -0.7], color: '#39d0c8', faceVar: 0.1 }));
      P.push(part(new THREE.BoxGeometry(0.6, 0.2, 0.5), { pos: [-0.5, Y + 0.19, -1.0], color: '#ff9a6a', faceVar: 0.1 }));
      P.push(part(new THREE.BoxGeometry(0.5, 0.35, 0.4), { pos: [1.4, Y + 0.27, 0.6], color: '#a87850' }));
      P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 4, 1), { pos: [1.7, Y + 0.6, 1.5], color: '#3a2a20' }));
      P.push(part(new THREE.ConeGeometry(0.2, 0.5, 3, 1), { pos: [1.83, Y + 1.0, 1.5], rot: [0, 0, -Math.PI / 2], color: '#39d0c8' }));
      g.add(mk(P, M.base, 'nest-dachboden-holz'));
      const lm = mk([part(new THREE.SphereGeometry(0.16, 8, 6), { pos: [-0.9, Y + 0.45, -1.2], color: '#ffd28a' })], M.glow('#ffd28a', { intensity: 1.2 }), 'nest-dachboden-licht'); lm.castShadow = false; g.add(lm);
      g.userData = { state: st };
      return { group: g };
    }
    // Deko-Motor (nach dem Blitz-Motor): Bock, Motorblock, Schraube, Blitz-Aufkleber
    function buildMotor() {
      const has = nest().deko.includes('blitzmotor');
      const g = grp('nest-motor', SPOTS.motor.at, -0.6);
      if (!has) { g.userData = { deko: false }; return { group: g }; }
      const P = [part(new THREE.BoxGeometry(1.0, 0.7, 0.6), { pos: [0, 0.35, 0], color: '#6e4a2e' })];
      P.push(part(new THREE.BoxGeometry(0.55, 0.6, 0.45), { pos: [0, 1.0, 0], color: '#c0392b', faceVar: 0.1 }));
      P.push(part(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 6, 1), { pos: [0, 0.65, 0.3], color: '#3d3a44' }));
      for (let i = 0; i < 3; i++) P.push(part(new THREE.BoxGeometry(0.08, 0.34, 0.03), { pos: [0, 0.3, 0.72], rot: [0, 0, i * 2.09], color: '#9fb3c8' }));
      g.add(mk(P, M.base, 'nest-motor-holz'));
      const z = mk([part(new THREE.BoxGeometry(0.12, 0.26, 0.02), { pos: [0, 1.02, 0.24], rot: [0, 0, 0.4], color: '#ffd23f' })], M.glow('#ffd23f', { intensity: 0.8 }), 'nest-motor-blitz'); z.castShadow = false; g.add(z);
      g.userData = { deko: true };
      return { group: g };
    }
    // Innenverkleidung: Plankenwände mit Fenstern (die Kit-Hülle zeigt von innen nur Rückseiten), Teppich, Crew-Liste
    function buildHuelle() {
      const g = grp('nest-huelle', [0, 0, 0]);
      const [w, h, d] = NEST_ROOM.size;
      const P = [], G = [];
      const stripe = (axis) => (x, y, z, out) => out.set(Math.floor(((axis === 'x' ? x : z) + 20) / 0.55) % 2 ? '#8a5c3a' : '#9c6b45');
      for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.12, h, d - 0.1, 1, 1, Math.round(d / 0.55)), { pos: [sx * (w / 2 - 0.08), h / 2, 0], faceVar: 0.1, seed: 21, faceColor: stripe('z') }));
      P.push(part(new THREE.BoxGeometry(w - 0.1, h, 0.12, Math.round(w / 0.55), 1, 1), { pos: [0, h / 2, -d / 2 + 0.0], faceVar: 0.1, seed: 22, faceColor: stripe('x') }));
      for (const [x0, x1] of [[-w / 2, -1.6], [1.6, w / 2]]) P.push(part(new THREE.BoxGeometry(x1 - x0, h, 0.12, Math.round((x1 - x0) / 0.55), 1, 1), { pos: [(x0 + x1) / 2, h / 2, d / 2 - 0.08], faceVar: 0.1, seed: 23, faceColor: stripe('x') }));
      P.push(part(new THREE.BoxGeometry(3.2, h - 3.4, 0.12), { pos: [0, 3.4 + (h - 3.4) / 2, d / 2 - 0.08], color: '#8a5c3a' }));
      // Fenster zur See (rechte Wand) und zur Tür hin, Rahmen
      for (const z of [-0.2, 3.4]) { G.push(part(new THREE.BoxGeometry(0.05, 1.1, 1.4), { pos: [w / 2 - 0.16, 2.3, z], color: '#bfe8ff' })); for (const [dy, dz, hh, dd] of [[0.6, 0, 0.1, 1.6], [-0.6, 0, 0.1, 1.6], [0, 0.75, 1.3, 0.1], [0, -0.75, 1.3, 0.1], [0, 0, 1.1, 0.06]]) P.push(part(new THREE.BoxGeometry(0.1, hh, dd), { pos: [w / 2 - 0.18, 2.3 + dy, z + dz], color: '#e8d6a8' })); }
      // Teppich, Crew-Liste an der Tür (drei Namen-Streifen, einer fehlt: Spur für QUELLE)
      P.push(part(new THREE.CylinderGeometry(1.6, 1.6, 0.03, 12, 1), { pos: [0.2, 0.17, 0.4], scale: [1.3, 1, 1], color: '#4f7f8f', faceVar: 0.12 }));
      P.push(part(new THREE.BoxGeometry(0.7, 0.9, 0.04), { pos: [-2.3, 1.7, d / 2 - 0.16], color: '#f4efe2' }));
      for (let i = 0; i < 3; i++) P.push(part(new THREE.BoxGeometry(0.5, 0.06, 0.02), { pos: [-2.3, 1.95 - i * 0.2, d / 2 - 0.19], color: ['#39d0c8', '#4d8cff', '#f4efe2'][i] }));
      g.add(mk(P, M.base, 'nest-huelle-holz'));
      const gm = mk(G, M.glow('#cfeaff', { intensity: 0.5 }), 'nest-huelle-fenster'); gm.castShadow = false; g.add(gm);
      return { group: g };
    }
    const BUILD = { huelle: buildHuelle, winde: buildWinde, luke: buildLuke, karte: buildKarte, fotowand: buildFotowand, dachboden: buildDachboden, motor: buildMotor };
    const GROUPS = { slots: ['fotowand', 'dachboden'], folgen: ['winde', 'karte'] };
    const dirty = new Set(['alle']);
    function mount(id) {
      const r = room();
      if (!r || !BUILD[id]) return null;
      if (!dyn) { dyn = new THREE.Group(); dyn.name = 'nest-dyn'; r.group.add(dyn); }
      if (parts[id]) { dyn.remove(parts[id].group); parts[id].group.traverse((o) => { if (o.isMesh) o.geometry.dispose(); }); delete parts[id]; }
      const h = BUILD[id]();
      dyn.add(h.group);
      parts[id] = h;
      return h;
    }
    function refresh(which = 'alle') {
      const ids = which === 'alle' ? Object.keys(BUILD) : (GROUPS[which] || [which]);
      if (!inside()) { for (const i of ids) dirty.add(i); return false; }
      for (const i of ids) { mount(i); dirty.delete(i); }
      if (which === 'alle') dirty.clear();
      addInteractions();
      return true;
    }
    function refreshFolgen() { refresh('folgen'); }

    // Aktionen im Raum
    function station(id) {
      const ev = { id, handled: false };
      emit('nest:station', ev);
      if (ev.handled) return ev;
      if (id === 'werkbank') { const W = game.plugins.werft; if (W && W.open) W.open(); }
      else if (id === 'winde' && parts.winde) { parts.winde.show(1.2); if (audio && audio.play) audio.play('tile'); }
      else if (id === 'karte' && parts.karte) { parts.karte.show(0.8); if (audio && audio.play) audio.play('tile'); }
      else if (id === 'haengematte') { if (audio && audio.play) audio.play('tile'); }
      return ev;
    }
    function addInteractions() {
      for (const it of its) it.remove();
      its = [];
      const pocket = scenes && scenes.pocket;
      if (!pocket || !inside()) return;
      const add = (id, sp, label, onAction) => its.push(interactions.add({ id: 'nest-' + id, x: pocket.x + sp.act[0], z: pocket.z + sp.act[2], radius: sp.r || 2, label, priority: 2, onAction }));
      add('werkbank', SPOTS.werkbank, 'Werkbank', () => station('werkbank'));
      add('winde', SPOTS.winde, 'Winde', () => station('winde'));
      add('karte', SPOTS.karte, 'Karte', () => station('karte'));
      add('haengematte', SPOTS.haengematte, 'Hängematte', () => station('haengematte'));
      for (const sl of MDL.SLOTS) {
        const st = slots.state(sl.id);
        if (st === 'zu') continue;
        if (st === 'offen') add(sl.id, SPOTS[sl.id], SLOT_LABEL.offen, () => slots.build(sl.id));
        else add(sl.id, SPOTS[sl.id], sl.id === 'fotowand' ? 'Fotowand' : 'Dachboden', () => station(sl.id));
      }
    }
    events.on('scene:enter', (e) => {
      if (!e || e.id !== NEST_ID) return;
      if (dirty.has('alle') || !parts.winde) refresh('alle'); else { for (const d of [...dirty]) { mount(d); dirty.delete(d); } addInteractions(); }
      emit('nest:enter', { spawn: e.spawn || 'eingang' });
    });
    events.on('scene:exit', (e) => { if (e && e.id === NEST_ID) { for (const it of its) it.remove(); its = []; emit('nest:exit', {}); } });
    events.on('state:reset', () => { dirty.add('alle'); if (inside()) refresh('alle'); });
    game.addUpdate((dt, t) => { if (!inside()) return; for (const k in parts) if (parts[k].update) parts[k].update(dt, t); }, { order: 12.5 });

    // Folgen für den Blick (Stufe „Gläser“): Winde (Tun) und Karte (Jolie) im Nest
    const B = game.abilities && game.abilities.blick;
    const wpos = (sp, y) => { const p = scenes && scenes.pocket; return inside() && p ? new THREE.Vector3(p.x + sp.at[0], p.y + y, p.z + sp.at[2]) : null; };
    if (B && B.addFolge) {
      B.addFolge({ id: 'winde', npc: 'tun', pos: () => wpos(SPOTS.winde, 1.1), aktiv: () => glaeser.folge('tun'), show: (sec) => { if (parts.winde) parts.winde.show(sec); } });
      B.addFolge({ id: 'karte', npc: 'jolie', pos: () => wpos(SPOTS.karte, 1.0), aktiv: () => !nest().route && glaeser.folge('jolie'), show: (sec) => { if (parts.karte) parts.karte.show(sec); } });
    }

    // Sitzung beim Laden
    sessionStart('laden');
    events.on('save:load', () => sessionStart('laden'));

    const api = {
      room: NEST_ID, site, outside, SPOTS, model: MDL,
      get isInside() { return inside(); },
      get sitzung() { return nest().sitzung; },
      available,
      enter({ spawn = 'eingang' } = {}) { return scenes ? scenes.enter(NEST_ID, { spawn }) : Promise.resolve(null); },
      exit() { return inside() && scenes ? scenes.exit({}) : Promise.resolve(false); },
      glaeser, slots, fotowand, route, blitzmotor, riss: () => nest().riss, refresh, station, parts,
      state: () => nest(),
    };
    game.nest = api;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.nest = {
      info: () => ({ inside: inside(), sitzung: nest().sitzung, slots: slots.list().map((x) => `${x.id}:${x.state}`), bilder: nest().bilder, route: nest().route, riss: nest().riss, deko: nest().deko, tun: glaeser.luecke('tun'), jolie: glaeser.luecke('jolie'), door: { ...outside.door, enabled: !!doorIt.enabled }, parts: Object.fromEntries(Object.entries(parts).map(([k, h]) => [k, h.group.userData])) }),
      enter: (spawn) => api.enter({ spawn }).then((r) => (r ? r.id : null)),
      glas: (npc, need, v) => (v === undefined ? glaeser.get(npc, need) : glaeser.set(npc, need, v, { grund: 'debug' })),
      open: (id) => slots.open(id), build: (id) => slots.build(id, { force: true }), bild: (npc) => fotowand.hang(npc), route: (id) => route.set(id),
      blitz: () => blitzmotor(), neueSitzung: () => sessionStart('debug'),
    };
    return api;
  },
};
