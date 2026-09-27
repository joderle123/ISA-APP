// Sicherer Ort (WP33, DESIGN §7/§19): eine selbstgebaute Taschenwelt mit Biom, Licht, Wetter, Klängen und auf Wunsch
// einem Tier. Immer über das Pause-Menü erreichbar (ab ruhe.kopf; davor übernimmt die Hängematte im Baumhaus), der Puls
// fällt auf 10. Gebaut über das Szenen-System (world/scenes.js) als Raum 'sicherer-ort' aus dem Raum-Baukasten.
//   const ort = createSichererOrt({ game, puls }); ort.enter() → Promise · ort.exit() · ort.isInside · ort.edit() (Overlay)
//   ort.config · ort.set(key, value) · ort.OPTIONS · ort.roomDef() · ort.haengematte() (Ersatz vor e14)
// Spielstand: state.private.sichererOrt = { biom, licht, wetter, klang, tier } (privat, nie im Export).
import { esc } from '../ui/overlay.js';

export const OPTIONS = {
  biom: [
    { id: 'hoehle', label: 'Leuchthöhle', icon: 'kristall', kit: 'hoehle', licht: 'biolumineszenz' },
    { id: 'baumhaus', label: 'Baumkrone', icon: 'bonsai', kit: 'baumhaus', licht: 'baumhaus' },
    { id: 'tempel', label: 'Stiller Tempel', icon: 'rune', kit: 'tempel', licht: 'kerzen' },
    { id: 'kugel', label: 'Sternenkugel', icon: 'stern', kit: 'kugel', licht: 'daemmerung' },
    { id: 'werkstatt', label: 'Werkstatt', icon: 'hammer', kit: 'werkstatt', licht: 'lampe' },
  ],
  licht: [
    { id: 'auto', label: 'Passend', icon: 'sonne' },
    { id: 'biolumineszenz', label: 'Türkis', icon: 'tropfen' },
    { id: 'kerzen', label: 'Kerzen', icon: 'feuer' },
    { id: 'daemmerung', label: 'Dämmerung', icon: 'mond' },
    { id: 'fenster', label: 'Tageslicht', icon: 'sonne' },
  ],
  wetter: [
    { id: 'still', label: 'Still', icon: 'wolke' },
    { id: 'regen', label: 'Leiser Regen', icon: 'tropfen' },
    { id: 'schnee', label: 'Schnee', icon: 'stern' },
    { id: 'funken', label: 'Glühwürmchen', icon: 'gluehwurm' },
  ],
  klang: [
    { id: 'stille', label: 'Stille', icon: 'stumm' },
    { id: 'wellen', label: 'Wellen', icon: 'welt' },
    { id: 'runter', label: 'Playlist Runter', icon: 'lautsprecher' },
  ],
  tier: [
    { id: 'keins', label: 'Kein Tier', icon: 'x' },
    { id: 'vogel-sonne', label: 'Sonnenvogel', icon: 'sonne', emotion: 'freude' },
    { id: 'vogel-blau', label: 'Blauvogel', icon: 'tropfen', emotion: 'trauer' },
    { id: 'vogel-stern', label: 'Sternvogel', icon: 'stern', emotion: 'ueberraschung' },
  ],
};
export const OPTION_LABEL = { biom: 'Biom', licht: 'Licht', wetter: 'Wetter', klang: 'Klänge', tier: 'Tier' };
export const DEFAULT_CONFIG = { biom: 'hoehle', licht: 'auto', wetter: 'still', klang: 'stille', tier: 'keins' };
export const ROOM_ID = 'sicherer-ort';

const CSS = `
.so-rows{display:grid;gap:12px}
.so-row h4{margin:0 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.so-opts{display:flex;flex-wrap:wrap;gap:8px}
.so-opt{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:6px 14px;border-radius:14px;background:rgba(18,12,36,.62);box-shadow:0 0 0 1px rgba(255,255,255,.14);color:#fff;font:800 15px/1.1 var(--font,system-ui);cursor:pointer}
.so-opt.is-on{box-shadow:0 0 0 2px var(--c-gold,#ffd166);background:rgba(255,209,102,.16)}
.so-opt svg{width:22px;height:22px}
`;

// Sichere Auswahl: unbekannte Werte fallen auf den Standard zurück
export function normalizeConfig(cfg = {}) {
  const out = { ...DEFAULT_CONFIG };
  for (const k of Object.keys(OPTIONS)) { const v = cfg && cfg[k]; if (OPTIONS[k].some((o) => o.id === v)) out[k] = v; }
  return out;
}
// RoomDef aus der Auswahl (reine Funktion, testbar)
export function roomDefFor(cfg) {
  const c = normalizeConfig(cfg);
  const biom = OPTIONS.biom.find((o) => o.id === c.biom);
  const light = c.licht === 'auto' ? biom.licht : c.licht;
  const features = [
    { type: 'bank', at: [0, 0, -3], yaw: 0 },
    { type: 'laterne', at: [-4, 0, -4], variant: 'pfahl', lit: true },
    { type: 'laterne', at: [4, 0, -4], variant: 'pfahl', lit: true },
    { type: 'blumenkuebel', at: [-5, 0, 2] },
    { type: 'kiste', at: [5, 0, 3] },
  ];
  const tier = OPTIONS.tier.find((o) => o.id === c.tier);
  if (tier && tier.emotion) features.push({ type: 'vogel', at: [2.5, 0, -1.5], emotion: tier.emotion });
  if (c.biom === 'hoehle' || c.biom === 'kugel') features.push({ type: 'kristall', at: [-6, 0, -6], kind: 'fakt' }, { type: 'kristall', at: [6, 0, -6], kind: 'fakt', color: '#9b5cff' });
  return {
    id: ROOM_ID, kit: biom.kit, size: [20, 8, 20], light, camera: { dist: 6 },
    spawns: { eingang: [0, 0, 6] },
    exits: [{ at: [0, 0, 9.2], label: 'Zurück', kind: 'tuer' }],
    features,
  };
}

export function createSichererOrt({ game, puls = null }) {
  const { events, state, ui, audio } = game;
  let built = null;       // { key } – zuletzt registrierte Variante
  let editing = null;
  let insideT = 0, fxT = 0;
  const emit = (n, p) => events.emit(n, p);
  if (typeof document !== 'undefined' && !document.querySelector('style[data-sicherer-ort]')) { const st = document.createElement('style'); st.dataset.sichererOrt = '1'; st.textContent = CSS; document.head.appendChild(st); }

  const config = () => normalizeConfig(state.get('private.sichererOrt') || {});
  const keyOf = (c) => Object.keys(OPTIONS).map((k) => c[k]).join('|');
  function ensureRoom() {
    const c = config();
    const key = keyOf(c);
    if (built && built.key === key && game.scenes && game.scenes.room(ROOM_ID)) return;
    const def = roomDefFor(c);
    if (game.scenes) game.scenes.register(def);
    built = { key, def };
  }
  const isInside = () => !!(game.scenes && game.scenes.current && game.scenes.current.id === ROOM_ID);

  // ---- Betreten / Verlassen ----
  async function enter() {
    if (!game.scenes) return false;
    if (isInside()) return true;
    const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    ensureRoom();
    if (ui.overlay && ui.overlay.closeAll) ui.overlay.closeAll('sichererOrt');
    if (puls && puls.set) puls.set(10, 'sichererOrt');
    emit('safeplace:enter', { kind: 'sichererOrt', config: config() });
    await game.scenes.enter(ROOM_ID, { spawn: 'eingang' });
    applyKlang(true);
    insideT = 0;
    const ms = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
    emit('safeplace:entered', { kind: 'sichererOrt', ms });
    if (game.glimm && game.glimm.line) game.glimm.line('sichererOrt');
    return true;
  }
  async function exit() {
    if (!isInside()) return false;
    applyKlang(false);
    await game.scenes.exit({});
    emit('safeplace:exit', { kind: 'sichererOrt' });
    return true;
  }
  // Hängematte im Baumhaus (vor e14): hinsetzen, Puls auf 10
  async function haengematte() {
    const s = game.content.resolveSite('baumhaus') || { x: -30, z: 98 };
    if (ui.overlay && ui.overlay.closeAll) ui.overlay.closeAll('haengematte');
    if (isInside()) await exit();
    game.player.teleport(s.x + 1.5, s.z + 1.5, Math.PI * 0.75);
    game.cameraRig.behindPlayer(); game.cameraRig.snap();
    game.player.playAnim('sit', 5);
    if (puls && puls.set) puls.set(10, 'haengematte');
    emit('safeplace:enter', { kind: 'haengematte' });
    if (game.glimm && game.glimm.line) game.glimm.line('haengematte');
    return true;
  }
  function applyKlang(on) {
    const c = config();
    if (!game.music) return;
    if (on && c.klang === 'runter' && game.music.jukebox) game.music.jukebox.play('runter');
    if (!on && game.music.jukebox && game.music.jukebox.current === 'runter') game.music.jukebox.stop();
    if (audio && audio.setAmbience) audio.setAmbience({ waves: on ? (c.klang === 'wellen' ? 0.9 : 0.05) : 0.4 });
  }

  // ---- Wetter im Raum (Partikel) ----
  function update(dt) {
    if (!isInside() || !game.particles || game.paused) return;
    insideT += dt; fxT += dt;
    const c = config();
    if (c.wetter === 'still' || fxT < 0.12) return;
    fxT = 0;
    const p = game.player.position;
    const pk = game.scenes.pocket;
    const py = pk ? pk.y : p.y;
    const rx = p.x + (Math.random() - 0.5) * 14, rz = p.z + (Math.random() - 0.5) * 14;
    if (c.wetter === 'regen') game.particles.emit({ x: rx, y: py + 6.5, z: rz, count: 3, spread: 0.4, speed: 0.2, up: -6, color: 0x9fd8ff, size: 0.35, life: 1.1, gravity: -4, drag: 0.2, alpha: 0.55 });
    else if (c.wetter === 'schnee') game.particles.emit({ x: rx, y: py + 6.5, z: rz, count: 2, spread: 0.6, speed: 0.3, up: -0.8, color: 0xffffff, size: 0.45, life: 6, gravity: -0.2, drag: 1.2, alpha: 0.85 });
    else if (c.wetter === 'funken') game.particles.emit({ x: rx, y: py + 0.6 + Math.random() * 2, z: rz, count: 1, spread: 0.5, speed: 0.25, up: 0.3, color: 0xd6ff5a, size: 0.4, life: 3.5, gravity: 0.05, drag: 1.5, additive: true, alpha: 0.9 });
  }

  // ---- Editor (Pause-Menü, Baumhaus-Tür, Kiste im Raum) ----
  function edit({ enterAfter = true } = {}) {
    if (!ui.overlay) return null;
    const cur = config();
    const rows = Object.keys(OPTIONS).map((k) => `<div class="so-row" data-row="${k}"><h4>${esc(OPTION_LABEL[k])}</h4><div class="so-opts">${OPTIONS[k].map((o) => `<button type="button" class="so-opt${cur[k] === o.id ? ' is-on' : ''}" data-key="${k}" data-val="${esc(o.id)}">${ui.icon(o.icon, { size: 22 })}<span>${esc(o.label)}</span></button>`).join('')}</div></div>`).join('');
    editing = ui.overlay.open({
      id: 'sicherer-ort', title: 'Sicherer Ort', icon: 'haengematte', kind: 'panel', pause: true, cls: 'ov-sicherer-ort',
      subtitle: 'Bau ihn so, wie er dir guttut.',
      content: `<div class="so-rows">${rows}</div><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-so-enter>${ui.icon('haengematte', { size: 26 })}<span>${isInside() ? 'Umbauen' : 'Betreten'}</span></button></div>`,
      onClose: () => { editing = null; },
    });
    editing.el.querySelectorAll('[data-key]').forEach((b) => b.addEventListener('click', () => {
      if (audio) audio.play('tile');
      set(b.dataset.key, b.dataset.val);
      editing.el.querySelectorAll(`[data-key="${b.dataset.key}"]`).forEach((x) => x.classList.toggle('is-on', x === b));
    }));
    editing.el.querySelector('[data-so-enter]').addEventListener('click', async () => {
      if (audio) audio.play('click');
      const h = editing; editing = null;
      h.close('enter');
      if (!enterAfter) return;
      if (isInside()) { await exit(); }
      await enter();
    });
    return editing;
  }
  function set(key, value) {
    if (!OPTIONS[key] || !OPTIONS[key].some((o) => o.id === value)) return false;
    state.set('private.sichererOrt', { ...config(), [key]: value });
    emit('safeplace:config', { key, value, config: config() });
    return true;
  }
  // Kiste im Raum: Umbauen
  events.on('scene:enter', (e) => {
    if (!e || e.id !== ROOM_ID || !game.interactions) return;
    const pk = game.scenes.pocket;
    const px = pk.x + 5, pz = pk.z + 3;
    const it = game.interactions.add({ id: 'so-umbauen', x: px, z: pz, radius: 2.4, label: 'Umbauen', priority: 1, onAction: () => edit() });
    const off = events.on('scene:exit', (x) => { if (x && x.id === ROOM_ID) { it.remove(); off(); } });
  });

  return {
    OPTIONS, OPTION_LABEL, ROOM_ID,
    get config() { return config(); },
    get isInside() { return isInside(); },
    get seconds() { return insideT; },
    enter, exit, edit, set, haengematte, update,
    roomDef: () => roomDefFor(config()),
  };
}
