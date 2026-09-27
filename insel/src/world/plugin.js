// Welt-Plugin (WP10/11/18/43): verbindet Schleier-Flecken, Gewässer, Szenen-System/Raum-Baukasten und die Requisiten
// zu einer lebendigen Insel. API: game.scenes (Szenenstapel), game.world.rooms (Raum-Baukasten), game.world.decor
//   (Dekor-Requisiten je Zone: decor.remove(id) / decor.clear(zone) für die Inhalts-WPs), game.world.birds (sechs Vögel).
// Debug: LUMO.debug.enterRoom(id, spawn) · exitRoom() · rooms() · setTide(id, 0..1) · setPatch(id, v) · relapse(id, to)
//   · restorePatch(id, to) · propsGallery(on) · titan(on) · grisel(state|null)
// Speichern: veil.patches (Flecken) und veil.rooms (Schleier je Raum) im Spielstand; Position im Raum = Rückkehrpunkt.
import { createRoomKit } from './roomkit/index.js';
import { createScenes } from './scenes.js';
import { BIRD_EMOTIONS } from '../props/kit/birds.js';
import { HAUS_DIM } from '../props/kit/gebaeude.js';
import { BUILDINGS, buildingYaw } from './layout.js';

// Wimpel-Farben je Region (§2.2)
const WIMPEL = { hafen: ['#FF7A59', '#FFD166', '#2FB8A8', '#FFF3D6', '#4F88C8', '#FF5D8F'], markt: ['#D94A3A', '#FFD23F', '#FFF3D6', '#4F88C8', '#FF6B6B', '#E9A83A'] };

// Standard-Flecken (Slots 8–11): Mangrove (bis j1-e06 grau), Glimmer und Quellen (spätere Module), Rückfall bleibt frei
const DEFAULT_PATCHES = [
  { id: 'mangrove', x: 150, z: -8, r: 18, veil: 1 },
  { id: 'glimmer', x: 20, z: -118, r: 30, veil: 1 },
  { id: 'quellen', x: 47, z: -23, r: 16, veil: 1 },
];

export default {
  id: 'welt', order: 24, deps: ['props'],
  install(game) {
    const { events, state, world, player, island, props, scene } = { ...game, island: game.world.island, props: game.props };
    const veil = world.veil;

    // ---- Schleier-Flecken: Standard + Regionen aus den Inhalten, Zustand im Spielstand ----
    for (const p of DEFAULT_PATCHES) if (!veil.getPatch(p.id)) veil.addPatch(p);
    for (const region of game.content.list('regions')) {
      for (const p of (region.veil && region.veil.patches) || []) if (!veil.getPatch(p.id)) veil.addPatch({ id: p.id, x: p.x, z: p.z, r: p.r, veil: p.start !== undefined ? p.start : 1 });
    }
    const savedPatches = state.get('veil.patches');
    if (savedPatches && Object.keys(savedPatches).length) veil.setState({ patches: savedPatches });
    game.save.onCapture((d) => { d.veil = { ...(d.veil || {}), patches: veil.getFullState().patches }; });
    game.save.onApply((d) => { if (d.veil && d.veil.patches) veil.setState({ patches: d.veil.patches }); });
    events.on('veil:set', (e) => { if (e && e.zone && veil.getPatch(e.zone)) veil.setPatch(e.zone, e.amount); });

    // ---- Szenen-System und Raum-Baukasten ----
    const rooms = createRoomKit({ veil, props, island, rng: game.rng });
    for (const def of game.content.list('rooms')) rooms.register(def);
    const scenes = createScenes({ game, kit: rooms });
    world.rooms = rooms; world.scenes = scenes; game.scenes = scenes;
    player.setDiveProvider(scenes.diveProvider);
    game.addUpdate((dt, t) => scenes.update(dt, t), { order: -8, always: true });
    events.on('scene:change', (e) => { if (e.scene !== 'welt' && game.music && game.music.setIntensity) game.music.setIntensity(0.85); else if (game.music && game.music.setIntensity) game.music.setIntensity(1); });

    // ---- Dekor für M0–M3 (Requisiten je Zone; Inhalts-WPs dürfen einzelne Stücke entfernen) ----
    const decorList = new Map();
    const dec = (zone, id, type, opts) => { const h = props.spawn(type, { id: `dekor-${id}`, ...opts }); h.zone = zone; decorList.set(h.id, h); return h; };
    const bake = (zone, id, items, opts = {}) => { const h = props.bake(items, { id: `dekor-${id}`, ...opts }); h.zone = zone; decorList.set(h.id, h); return h; };
    const S = island.SITES;
    // Hafen: vier dunkle Signalfeuer um den Dorfplatz, Laternenreihe vom Steg zum Platz, Papierlaternen am Baumhaus
    bake('hafen', 'signalfeuer', [[18, 118], [-10, 120], [16, 100], [-8, 100]].map(([x, z]) => ({ type: 'signalfeuer', x, z, lit: false })));
    bake('hafen', 'laternen', [
      ...[[9.5, 126], [2.5, 126], [9.5, 120], [2.5, 120]].map(([x, z]) => ({ type: 'laterne', x, z, variant: 'pfahl', lit: true })),
      ...[[-25, 92], [-34, 94], [-36, 102], [-27, 104]].map(([x, z], i) => ({ type: 'laterne', x, z, y: island.getHeight(x, z) + 2.2, variant: 'papier', color: ['#ff7a59', '#ffd23f', '#2de2c9', '#ff5d8f'][i] })),
    ]);
    // ---- Häuser (§9.2): je Zone zu einem Mesh je Material gebacken; Türlaternen leuchten, Fenster tags Glas / nachts Bloom ----
    const houses = new Map();
    {
      const byZone = new Map();
      for (const b of BUILDINGS) { if (!byZone.has(b.zone)) byZone.set(b.zone, []); byZone.get(b.zone).push(b); }
      for (const [zone, list] of byZone) {
        const h = bake(zone, 'haeuser-' + zone, list.map((b) => ({ type: b.type || 'haus', x: b.x, z: b.z, yaw: buildingYaw(b), size: b.size, wall: b.wall, accent: b.accent, roof: b.roof, markise: !!b.markise })));
        h.handles.forEach((hh, i) => houses.set(list[i].id, hh));
      }
    }
    const bDef = (id) => BUILDINGS.find((b) => b.id === id);
    // Traufpunkt eines Hauses in Richtung eines anderen Punkts (Wimpelketten)
    const eaveTo = (id, tx, tz, k = 2.3) => {
      const b = bDef(id), d = Math.hypot(tx - b.x, tz - b.z) || 1;
      const H = b.type === 'kiosk' ? 2.6 : HAUS_DIM[b.size][1] + 0.35;
      return [b.x + ((tx - b.x) / d) * k, island.getHeight(b.x, b.z) + H, b.z + ((tz - b.z) / d) * k];
    };
    const chain = (zone, from, to, sag) => ({ type: 'wimpelkette', x: 0, z: 0, y: 0, onGround: false, collide: false, from, to, colors: WIMPEL[zone] || WIMPEL.hafen, sag });
    const lampTop = (x, z) => [x, island.getHeight(x, z) + 2.85, z];
    game.addUpdate(() => props.materials.setNight(world.sky.night), { order: -11 });

    // Hafen: Wimpelketten zwischen Laternen und Häusern, Dorfplatz mit Pflaster, Brunnen, Bänken und Blumenkübeln,
    // Kisten/Fässer/Netz/Bojen am Steg, Ruderboot in der Bucht
    bake('hafen', 'wimpel', [
      chain('hafen', lampTop(9.5, 126), lampTop(2.5, 126)), chain('hafen', lampTop(9.5, 120), lampTop(2.5, 120)),
      chain('hafen', eaveTo('hafen-3', 24, 132), eaveTo('hafen-7', 34, 121)), chain('hafen', eaveTo('hafen-1', 44, 112), eaveTo('hafen-9', 30, 100)),
      chain('hafen', eaveTo('hafen-6', -20, 116), eaveTo('hafen-kiosk', -28, 112)), chain('hafen', eaveTo('hafen-2', -8, 86), eaveTo('hafen-4', -21, 91)),
      chain('hafen', eaveTo('hafen-5', 30, 100), eaveTo('hafen-1', 22, 88)), chain('hafen', eaveTo('hafen-8', -32, 130), eaveTo('hafen-10', -14, 130)),
    ]);
    bake('hafen', 'pflaster', [
      { type: 'pflaster', x: 0, z: 0, y: 0, onGround: false, collide: false, cx: 1, cz: 111, r: 6.6 },
      ...[[18, 118], [-10, 120], [16, 100], [-8, 100]].map(([x, z]) => ({ type: 'pflaster', x: 0, z: 0, y: 0, onGround: false, collide: false, cx: x, cz: z, r: 3.3, r0: 1.75 })),
    ], { castShadow: false });
    const faceTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);
    bake('hafen', 'platz', [
      { type: 'brunnen', x: -2, z: 112.5, yaw: 0.4 },
      ...[[11, 114], [-5, 104.5], [9.5, 105.5]].map(([x, z]) => ({ type: 'bank', x, z, yaw: faceTo(x, z, 4, 110) })),
      ...[[11.4, 126.2], [0.6, 126.2], [11.4, 119.8], [0.6, 119.8], [-22.6, 118.4], [-17.2, 114.2]].map(([x, z]) => ({ type: 'blumenkuebel', x, z })),
      { type: 'kisten', x: -23.2, z: 115.4, yaw: 0.5, n: 2 },
      { type: 'kisten', x: 10.4, z: 129.6, yaw: 0.3, n: 3 }, { type: 'fass', x: 12.2, z: 131.2 }, { type: 'fass', x: 12.9, z: 129.8, lying: true, color: '#A8794A' },
      { type: 'netz', x: 9.6, z: 132.2, yaw: 1.2 }, { type: 'kisten', x: 1.4, z: 130.2, yaw: -0.4, n: 1 }, { type: 'boje', x: 2.6, z: 131.6, lying: true, color: '#FFD166' },
      { type: 'kisten', x: 27.2, z: 129.4, yaw: 0.9, n: 2 }, { type: 'fass', x: 21.4, z: 134.2 }, { type: 'netz', x: 23.6, z: 135.4 }, { type: 'boje', x: 26.4, z: 135, lying: true },
    ]);
    dec('hafen', 'ruderboot', 'ruderboot', { x: -1.6, z: 137.5, y: 0.06, onGround: false, yaw: 0.65, color: '#FF7A59' });
    dec('hafen', 'boje-1', 'boje', { x: 13.5, z: 140, y: -0.06, onGround: false, collide: false, floating: true });
    dec('hafen', 'boje-2', 'boje', { x: -4.5, z: 143, y: -0.06, onGround: false, collide: false, floating: true, color: '#FFD166' });

    // Strand: sechs Gezeiten-Tanks an der Muschelbucht, Laterne am Höhleneingang
    const TANKS = ['koerper', 'sicherheit', 'zugehoerigkeit', 'anerkennung', 'selbstbestimmung', 'spass'];
    bake('strand', 'tanks', TANKS.map((need, i) => ({ type: 'tank', x: 120 + i * 3.1, z: 47.5, yaw: Math.PI, need, fill: [0.7, 0.6, 0.15, 0.4, 0.6, 0.5][i] })).concat([{ type: 'signalfeuer', x: 133, z: 46, lit: false }]));
    dec('strand', 'laterne-hoehle', 'laterne', { x: 157, z: 3, variant: 'pfahl', lit: true, dynamic: true });
    // Klippen: Lucs Windräder und Drachen an der Wetterwarte, Signalfeuer
    bake('klippen', 'wetterwarte', [[-105, -63], [-91, -65], [-97, -79]].map(([x, z], i) => ({ type: 'windrad', x, z, wind: 1.4 + i * 0.3, color: ['#8fa3ff', '#2de2c9', '#ffd166'][i] })).concat([{ type: 'signalfeuer', x: -92, z: -71, lit: false }]));
    [[-102, -74], [-93, -75]].forEach(([x, z], i) => dec('klippen', 'drachen-' + i, 'drachen', { x, z, wind: 1.4, color: i ? '#ff5d8f' : '#ffd23f', color2: i ? '#2de2c9' : '#ff3b3b' }));
    // Dschungel: Signalfeuer auf der Lichtung
    dec('dschungel', 'signalfeuer-dschungel', 'signalfeuer', { x: 76, z: -64, lit: false });
    // Moor: Menhir-Kreis, Flüstersteine, Bohlenweg von der Trasse zum Steinriesen
    const M = island.FEATURES.moor;
    bake('moor', 'menhire', Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return { type: 'menhir', x: M.x + Math.cos(a) * 9, z: M.z + Math.sin(a) * 9, yaw: -a, height: 2.8 + (i % 3) * 0.5 }; }));
    bake('moor', 'fluestersteine', [[-126, 66], [-104, 66], [-118, 86], [-100, 80], [-130, 76]].map(([x, z], i) => ({ type: 'fluesterstein', x, z, size: 0.8 + (i % 3) * 0.25, active: true })));
    dec('moor', 'bohlenweg', 'bohlenweg', { x: 0, z: 0, y: 0, onGround: false, collide: true, pts: [[-95, 45], [-99, 51], [-105, 59], [-110, 65], [-113, 73], [-112, 82]] });
    // Markt: vier gefüllte Stände um den Platz, Laternen, Pflaster, Wimpelketten zwischen den Häusern, Kisten und Kübel
    bake('markt', 'staende', [[-118, 27, 0], [-131, 14, Math.PI / 2], [-118, 1, Math.PI], [-105, 14, -Math.PI / 2]].map(([x, z, yaw], i) => ({ type: 'marktstand', x, z, yaw, colors: [['#D94A3A', '#FFF3D6'], ['#4F88C8', '#FFF3D6'], ['#FFD23F', '#5b3a8a'], ['#2FB8A8', '#FFF3D6']][i] })));
    bake('markt', 'laternen', [[-124, 22], [-112, 22], [-124, 6], [-112, 6]].map(([x, z]) => ({ type: 'laterne', x, z, variant: 'pfahl', lit: true })));
    bake('markt', 'pflaster', [{ type: 'pflaster', x: 0, z: 0, y: 0, onGround: false, collide: false, cx: -118, cz: 14, r: 9.5, color: '#D2B48C' }], { castShadow: false });
    bake('markt', 'wimpel', [
      chain('markt', lampTop(-124, 22), lampTop(-112, 22)), chain('markt', lampTop(-124, 6), lampTop(-112, 6)),
      chain('markt', eaveTo('markt-1', -118, 33), eaveTo('markt-4', -132, 26)), chain('markt', eaveTo('markt-3', -100, 14), eaveTo('markt-5', -104, 2)),
      chain('markt', eaveTo('markt-2', -118, 14), lampTop(-124, 6)),
    ]);
    bake('markt', 'kram', [
      { type: 'kisten', x: -114, z: 28.5, yaw: 0.4, n: 2 }, { type: 'fass', x: -121.5, z: 28.8 }, { type: 'kisten', x: -128.5, z: 10, yaw: 1.2, n: 3 }, { type: 'fass', x: -106.5, z: 18.5, lying: true, color: '#A8794A' },
      ...[[-125.4, 21.4], [-110.6, 21.4], [-125.4, 6.6], [-110.6, 6.6]].map(([x, z]) => ({ type: 'blumenkuebel', x, z })),
      ...[[-118, 8, Math.PI], [-124, 14, Math.PI / 2]].map(([x, z, yaw]) => ({ type: 'bank', x, z, yaw })),
    ]);
    // Vulkan: Kraterrand-Felsen (Obsidian, drei Töne) außen um den Kamm, die Serpentine bleibt frei
    {
      const V = island.FEATURES.volcano;
      const rocks = [];
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2 + 0.2, r = V.rimRadius + 1.6 + (i % 3) * 0.9;
        const x = V.x + Math.cos(a) * r, z = V.z + Math.sin(a) * r;
        if (island.pathWeight(x, z) > 0.2) continue;
        rocks.push({ type: 'fels', x, z, yaw: i * 1.7, size: 1.1 + (i % 4) * 0.35, color: i % 2 ? '#3A3038' : '#4B3F3D' });
      }
      bake('vulkan', 'kraterfelsen', rocks);
    }
    // Quellental: Laternen-Camp, Leuchtturm-Halbinsel: Laterne am Weg
    bake('vulkan', 'quellen-laternen', [[38, -14], [44, -27], [55, -26]].map(([x, z]) => ({ type: 'laterne', x, z, variant: 'pfahl', lit: true })));
    // Glimmerwolke: sieben schwebende Inseln über der Nordküste (sichtbar, noch unerreichbar) mit Kugeln
    const GL = S.glimmerwolke;
    bake('glimmer', 'inseln', Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2, r = i === 0 ? 0 : 26 + (i % 2) * 10; return { type: 'glimmerinsel', x: GL.x + Math.cos(a) * r, z: GL.z + Math.sin(a) * r, y: 72 + i * 5, radius: 5 + (i % 3) * 1.5, onGround: false }; }));
    for (let i = 0; i < 4; i++) dec('glimmer', 'kugel-' + i, 'glimmerkugel', { x: GL.x + Math.cos(i * 1.6) * 18, z: GL.z + Math.sin(i * 1.6) * 18, y: 90 + i * 4, onGround: false, collide: false, color: ['#ff3b6b', '#ff8cf0', '#5ad8ff', '#ffd23f'][i] });
    // Grisel: Schatten weit draußen über dem Meer (nachts), Titan über den Sturmklippen (nur per Debug/Quest)
    const gr = dec('welt', 'grisel', 'grisel', { x: -190, z: -170, y: 58, onGround: false, collide: false, size: 6, state: 'schatten' });
    const ti = dec('klippen', 'titan', 'titan', { x: S.klippenGipfel.x + 10, z: S.klippenGipfel.z - 18, y: island.getHeight(S.klippenGipfel.x + 10, S.klippenGipfel.z - 18) + 14, onGround: false, collide: false });
    ti.hidden = true; ti.group.visible = false; ti.far = 600;
    gr.far = 900;
    // Sechs Gefühlsvögel: sitzen um die Lichtung, fliegen ab und zu eine Runde (Vorschau; WP52 übernimmt sie mit Regeln)
    const L = S.lichtung;
    const birds = BIRD_EMOTIONS.map((emotion, i) => {
      const a = (i / 6) * Math.PI * 2 + 0.3, px = L.x + Math.cos(a) * 11, pz = L.z + Math.sin(a) * 11;
      const yaw = Math.atan2(L.x - px, L.z - pz);   // Blick zur Lichtung
      const h = dec('dschungel', 'vogel-' + emotion, 'vogel', { x: px, z: pz, yaw, emotion, pose: 'sitzen', collide: false, phase: i * 1.1 });
      h.life = { px, pz, py: h.group.position.y, a, yaw, t: 6 + i * 5, mode: 'sitzen', phase: 0 };
      return h;
    });
    const rngB = game.rng && game.rng.fork ? game.rng.fork('vogelleben') : { float: (a, b) => a + Math.random() * (b - a) };
    game.addUpdate((dt, t) => {
      if (scenes.isInterior) return;
      for (const b of birds) {
        const l = b.life;
        l.t -= dt;
        if (l.mode === 'sitzen') {
          if (l.t <= 0) { l.mode = 'fliegen'; l.phase = 0; l.t = 999; b.pose('fliegen'); }
          continue;
        }
        // Rundflug: Kreis um den Sitzplatz, Höhe steigt und fällt, dann landen
        l.phase += dt / 14;
        const k = Math.min(1, l.phase);
        const ang = l.a + Math.PI + k * Math.PI * 2 * 1.5;
        const rad = 7 * Math.sin(k * Math.PI), hgt = 4.5 * Math.sin(k * Math.PI);
        const x = l.px + Math.cos(ang) * rad, z = l.pz + Math.sin(ang) * rad;
        b.group.position.set(x, l.py + hgt + 0.3 * Math.sin(t * 3), z);
        b.group.rotation.y = -ang;   // Flugrichtung = Tangente des Kreises (Schnabel zeigt nach +z)
        b.group.rotation.z = Math.sin(k * Math.PI * 3) * 0.25;
        if (k >= 1) { l.mode = 'sitzen'; l.t = rngB.float(8, 22); b.group.position.set(l.px, l.py, l.pz); b.group.rotation.set(0, l.yaw, 0); b.pose('sitzen'); }
      }
      // Grisel nur nachts als Silhouette
      gr.hidden = world.sky.night <= 0.45; gr.group.visible = !gr.hidden;
    }, { order: -11 });
    // ---- Lichtpool (§5.5): brennende Laternen/Feuer, Türlaternen der Häuser, Steglampe → drei wandernde Punktlichter ----
    const lightPool = world.lightPool;
    const _lp = new (game.THREE.Vector3)();
    function collectEmitters() {
      const out = [];
      const dock = island.FEATURES.dock;
      out.push({ x: dock.x - dock.width / 2 + 0.3, y: dock.deck + 2.7, z: dock.z0 + 0.2, i: 5, r: 7 });
      const each = (h) => {
        if (h.type === 'laterne' && h.lit) { h.group.getWorldPosition(_lp); out.push({ x: _lp.x, y: _lp.y + (h.kind === 'pfahl' ? 2.35 : h.kind === 'papier' ? 2.6 : 2.2), z: _lp.z, i: 6, r: 7, color: h.kind === 'papier' && h.opts && h.opts.color ? h.opts.color : '#ffb070' }); }
        else if (h.type === 'signalfeuer' && h.lit) { h.group.getWorldPosition(_lp); out.push({ x: _lp.x, y: _lp.y + 1.3, z: _lp.z, i: 11, r: 9.5, color: '#ffa050', flicker: true }); }
        else if ((h.type === 'haus' || h.type === 'kiosk') && h.lampWorld) { h.lampWorld(_lp); out.push({ x: _lp.x, y: _lp.y, z: _lp.z, i: 5, r: 6.5 }); }
      };
      for (const h of props.list()) { if (h.type === 'bake') h.handles.forEach(each); else each(h); }
      return out;
    }
    let emitT = 0.5;
    if (lightPool) game.addUpdate((dt) => { emitT += dt; if (emitT > 1) { emitT = 0; lightPool.setEmitters(scenes.isInterior ? [] : collectEmitters()); } }, { order: -11 });

    const decor = {
      list: () => [...decorList.values()],
      get: (id) => decorList.get(id.startsWith('dekor-') ? id : 'dekor-' + id) || null,
      // alle Einzel-Requisiten eines Typs (auch innerhalb gebackener Gruppen), z. B. decor.find('signalfeuer').forEach((f) => f.setLit(true))
      find: (type) => [...decorList.values()].flatMap((h) => (h.type === 'bake' ? h.handles : [h])).filter((h) => h.type === type),
      remove(id) { const h = decor.get(id); if (h) { h.remove(); decorList.delete(h.id); } return !!h; },
      clear(zone) { for (const h of [...decorList.values()]) if (!zone || h.zone === zone) { h.remove(); decorList.delete(h.id); } },
      birds, grisel: gr, titan: ti,
    };
    world.decor = decor; world.birds = birds;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.enterRoom = (id, spawn) => scenes.enter(id, { spawn, fade: false }).then((r) => (r ? r.id : null));
    D.exitRoom = () => scenes.exit({ fade: false });
    D.rooms = () => scenes.rooms();
    D.setTide = (id, t) => (id === 'alle' ? world.water.tideAll(Number(t)) : world.water.setTide(id, Number(t)));
    D.setPatch = (id, v) => veil.setPatch(id, Number(v));
    D.relapse = (id, to) => veil.relapse(id, { to: to !== undefined ? Number(to) : 1 });
    D.restorePatch = (id, to) => veil.restoreZone(id, { amount: to !== undefined ? Number(to) : 0 });
    D.titan = (on = true, phase) => { ti.hidden = !on; ti.group.visible = !!on; if (phase) ti.setPhase(phase); return ti.phase; };
    D.grisel = (st) => { if (st === null || st === false) { gr.hidden = true; gr.group.visible = false; return null; } gr.hidden = false; gr.group.visible = true; if (st) gr.setState(st); return gr.state; };
    D.roomTriangles = (id) => { const r = scenes.room(id) || rooms.build(id); return r.triangles(); };

    return { rooms, scenes, decor, birds, patches: DEFAULT_PATCHES.map((p) => p.id) };
  },
};
