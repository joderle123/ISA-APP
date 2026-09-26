// Kosmetik-System (WP41): Inventar aus CosmeticDefs (content/cosmetics/*), Besitz aus dem Spielstand (Quellen: start,
// unitDone, regionFreed, shard, bond, minigame+medal, nebelkern, collectible, lichtsplitter, deed oder explizit
// cosmetics.owned), Anlegen je Slot (cosmetics.equipped), Avatar-Look = state.avatar + angelegte Kosmetik → Spielfigur.
//   game.plugins.cosmetics → { items, list(slot?), owned(slot?), isOwned(id), equip(slot, id|null), equipped, grant(id),
//                             refresh(), dyes(), emotes(), sourceText(item), byId(id) }
//   game.avatar → { HAIR_STYLES, SKIN_TONES, … (alle Wertelisten), normalizeConfig, randomConfig, createHumanoid,
//                   look() (aktueller Look inkl. Kosmetik), base() (state.avatar), setAvatar(cfg), handle, rerollHandle(),
//                   signatures() }
//   Ereignisse: cosmetic:unlock {id, slot, item} · cosmetic:equip {slot, id} · avatar:change {config, first}
//   Debug: LUMO.debug.grantCosmetic(id) · grantAllCosmetics() · setAvatar(cfg) · randomAvatar()
import * as H from '../../actors/humanoid/index.js';
import { DEFAULT_PLAYER_LOOK } from '../../actors/player.js';
import { ownedItems, isOwned, applyEquipped, dyesFor, emotesFor, jacketSignatures } from './inventory.js';
import { makeHandle } from '../../core/save.js';
import { COSMETIC_SLOTS } from '../../content/schema/consts.js';

export const SLOT_LABEL = { kopf: 'Kopf', oberteil: 'Oberteil', unterteil: 'Unterteil', schuhe: 'Schuhe', muster: 'Muster', farbset: 'Farbset', segel: 'Segel', spur: 'Spur', glimm: 'Glimm', maske: 'Maske', emote: 'Emote', moebel: 'Möbel', jacke: 'Jacke' };
const REGION_NAME = { hafen: 'Hafen', strand: 'Strand', dschungel: 'Dschungel', klippen: 'Klippen', moor: 'Moor', markt: 'Markt', vulkan: 'Vulkan', glimmer: 'Glimmerwolke', quellen: 'Quellental', leuchtturm: 'Leuchtturm' };
const MEDAL_NAME = { bronze: 'Bronze', silber: 'Silber', gold: 'Gold', stern: 'Leuchtstern' };

export default {
  id: 'cosmetics', order: 40, deps: [],
  install(game) {
    const { events, state, content, player, audio } = game;
    const emit = (n, p) => events.emit(n, p);
    let ownedSet = new Set();
    let ready = false;

    const items = () => content.list('cosmetics').flatMap((set) => (set && Array.isArray(set.items) ? set.items : []));
    const byId = (id) => items().find((it) => it.id === id) || null;
    const unitOf = (id) => content.unit(id);

    // Kurzer Hinweis, woher ein Stück kommt (≤ 6 Wörter, ohne Belohnungs-Sprache)
    function sourceText(it) {
      const s = (it && it.source) || {};
      if (s.start) return 'Von Anfang an dabei';
      if (s.unitDone) { const u = unitOf(s.unitDone); return u ? `Aus: ${u.quest}` : 'Aus einer Einheit'; }
      if (s.regionFreed) return `${REGION_NAME[s.regionFreed] || s.regionFreed} in Farbe`;
      if (s.shard !== undefined) return `Splitter ${s.shard}`;
      if (s.bond) return 'Aus einer Freundschaft';
      if (s.minigame) return s.medal ? `${MEDAL_NAME[s.medal] || s.medal} im Rennen` : 'Aus einem Rennen';
      if (s.nebelkern) return 'Aus einem Nebelkern';
      if (s.collectible) return 'Versteckt auf der Insel';
      if (s.lichtsplitter !== undefined) return `${s.lichtsplitter} Lichtsplitter`;
      if (s.deed) return 'Für eine Tat';
      return 'Aus der Welt';
    }

    function refresh({ announce = true } = {}) {
      const data = state.data;
      const now = new Set(ownedItems(items(), data).map((it) => it.id));
      const fresh = [...now].filter((id) => !ownedSet.has(id));
      ownedSet = now;
      if (announce && ready) {
        for (const id of fresh) {
          const it = byId(id);
          emit('cosmetic:unlock', { id, slot: it.slot, item: it });
          if (game.ui && game.ui.toast) game.ui.toast(`Neu im Stil-Studio: ${it.name || id}`);
          if (audio) audio.play('pickup');
        }
      }
      return fresh;
    }

    const cosmetics = {
      SLOTS: COSMETIC_SLOTS, SLOT_LABEL,
      get items() { return items(); },
      byId, sourceText,
      list(slot) { return slot ? items().filter((it) => it.slot === slot) : items(); },
      owned(slot) { return cosmetics.list(slot).filter((it) => ownedSet.has(it.id)); },
      isOwned(id) { return ownedSet.has(id); },
      get equipped() { return { ...(state.get('cosmetics.equipped') || {}) }; },
      equip(slot, id) {
        if (!COSMETIC_SLOTS.includes(slot)) throw new Error('Unbekannter Slot ' + slot);
        if (id && !ownedSet.has(id)) return false;
        const it = id ? byId(id) : null;
        if (id && (!it || it.slot !== slot)) return false;
        state.set('cosmetics.equipped.' + slot, id || null);
        emit('cosmetic:equip', { slot, id: id || null });
        applyLook();
        return true;
      },
      grant(id) { if (!byId(id)) return false; state.addUnique('cosmetics.owned', id); refresh(); return true; },
      refresh,
      dyes() { return dyesFor(items(), state.data); },
      emotes() { return emotesFor(items(), state.data); },
      // Angelegte Kosmetik auf eine beliebige Grund-Konfiguration anwenden (Vorschau im Stil-Studio)
      withEquipped(cfg) { return applyEquipped(items(), state.get('cosmetics.equipped') || {}, H.normalizeConfig(cfg), { signatures: signatures() }); },
    };

    // ---- Avatar-Look ----
    function base() { return H.normalizeConfig(state.get('avatar') || game.settings.look || DEFAULT_PLAYER_LOOK); }
    function signatures() { return jacketSignatures(state.get('bonds') || {}, content.list('npcs')); }
    function look() { return applyEquipped(items(), state.get('cosmetics.equipped') || {}, base(), { signatures: signatures() }); }
    let lastLook = '';
    function applyLook({ first = false } = {}) {
      const cfg = look();
      const key = JSON.stringify(cfg);
      if (key === lastLook) return cfg;
      lastLook = key;
      player.setLook(cfg);
      // Gerätekopie, damit die Figur beim nächsten Start sofort richtig aussieht (vor dem Laden der Plugins)
      game.settings.look = state.get('avatar') ? { ...cfg } : null;
      if (game.saveSettings) game.saveSettings();
      emit('avatar:change', { config: cfg, first });
      return cfg;
    }
    const avatar = {
      ...Object.fromEntries(['SKIN_TONES', 'HAIR_COLORS', 'EYE_COLORS', 'HAIR_STYLES', 'BROW_STYLES', 'GLASSES', 'HEARING_AIDS', 'PROSTHESES', 'HEAD_ITEMS', 'TOP_STYLES', 'BOTTOM_STYLES', 'SHOE_STYLES', 'PATTERNS', 'MASKS', 'BACK_ITEMS', 'CLOTH_COLORS', 'DEFAULT_CONFIG', 'EMOTE_NAMES', 'EMOTE_LABEL', 'EMOTE_ICON', 'POSE_NAMES'].map((k) => [k, H[k]])),
      normalizeConfig: H.normalizeConfig, randomConfig: H.randomConfig, createHumanoid: H.createHumanoid, bodyLanguageFor: H.bodyLanguageFor,
      base, look, signatures,
      get isSet() { return !!state.get('avatar'); },
      setAvatar(cfg, { first = false } = {}) { state.set('avatar', H.normalizeConfig(cfg)); return applyLook({ first }); },
      get handle() { return state.get('handle') || ''; },
      rerollHandle() {
        // Neuer Spielname, deterministisch je Spielstand und Wurf-Nummer; ein zufällig gleicher Name wird übersprungen
        const cur = state.get('handle');
        let h = cur;
        for (let k = 0; k < 8 && h === cur; k++) h = makeHandle(game.rng.fork('handle-' + state.inc('handleRolls')));
        state.set('handle', h);
        emit('avatar:handle', { handle: h });
        return h;
      },
    };
    game.avatar = avatar;

    // ---- Haken ----
    const onProgress = () => refresh({ announce: true });
    for (const ev of ['unit:complete', 'bond:change', 'veil:set', 'veil:restored', 'core:ready']) events.on(ev, onProgress);
    for (const p of ['units', 'bonds', 'medals', 'collectibles', 'shards', 'deeds', 'veil', 'cosmetics.owned', 'lichtsplitter']) state.on(p, onProgress);
    state.on('avatar', () => applyLook());
    state.on('cosmetics.equipped', () => applyLook());
    events.on('state:reset', () => { ownedSet = new Set(); refresh({ announce: false }); lastLook = ''; applyLook(); });
    refresh({ announce: false });
    applyLook();
    ready = true;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.grantCosmetic = (id) => cosmetics.grant(id);
    D.grantAllCosmetics = () => { for (const it of items()) state.addUnique('cosmetics.owned', it.id); return refresh().length; };
    D.setAvatar = (cfg) => avatar.setAvatar(cfg);
    D.randomAvatar = () => avatar.setAvatar(H.randomConfig(game.rng.fork('debug-avatar-' + Date.now())));
    return cosmetics;
  },
};
