// Prozedurale Figur im Anime-Teen-Stil (≈ 6,5 Kopfhöhen, Stil-Bibel §8): weiche Cel-Shading-Körper, Kontur-Hülle, große
// lesbare Augen mit Blinzeln, Strähnenhaar mit Glanzband, nachschwingende Haare/Rucksack, elegantes Namensschild.
// createHumanoid(config, { veil, name, detail:'full'|'lite', quality:'low'|'medium'|'high' }) → h
//   Aussehen:   h.setConfig(cfg) · h.config · normalizeConfig(cfg) · randomConfig(rng) · h.setDetail('lite') · h.tier · h.outlinePx
//   Animation:  h.setAnim(name) (ANIMS) · h.update(dt, camera?) · h.setMoveSpeed(v) · h.vy · h.onStep(fuß)
//   Ausdruck:   h.setExpression({ brows, mouth, raise, lids, open } | 'freude' | … (EXPRESSIONS) | null) · h.lookAt(worldPos | null)
//   Körpersprache (additiv, WP17): h.setPose('slump', 0.8) · h.setPoses({ shoulderUp:1, gazeAway:0.5 }) · h.clearPoses() · h.bodyLanguage
//   Emotes:     h.playEmote('winken' | … , { loop, seconds }) → Promise · h.stopEmote() · h.emote (EMOTE_NAMES)
//   Hände:      h.setHands('fist' | 'open' | 'thumb' | 'stop' | null) (sonst aus Pose/Emote)
//   Aura:       h.aura (aura.js: setEmotion/setInner/setMaskView/setBoundary/setHotspots/setTanks/setStreitTier) ·
//               h.setEmotionAura(color | null) bleibt kompatibel
//   Schild:     h.setNameTag({ name, icon, color } | null) · h.nameTag (nametag.js, Bildschirmgröße geklemmt)
//   Maße:       h.height (Scheitel), h.headRadius, h.joints (body, spine, head, hipL/R, kneeL/R, shL/R, elL/R, wristL/R, hair, pack)
// Blickrichtung +z, Füße bei y = 0, Höhe ≈ 2,0 m × Größenfaktor. h.meshes enthält nur die Körperteile (ein Toon-Material);
// Kontur-Hüllen sind Kinder der Teile (Name 'hull'). Eine Figur (voll) ≈ 18 Teile + Hüllen, 'lite' ≈ 11 + Hüllen.
import * as THREE from 'three';
import { merge } from './geo.js';
import {
  M, SKIN_TONES, HAIR_COLORS, EYE_COLORS, HAIR_STYLES, BROW_STYLES, GLASSES, HEARING_AIDS, PROSTHESES, HEAD_ITEMS, TOP_STYLES,
  BOTTOM_STYLES, SHOE_STYLES, PATTERNS, MASKS, BACK_ITEMS, ACCESSORIES, CLOTH_COLORS, clamp01, buildWidth, heightScale, getMaterial,
  getGlassMaterial, getOutlineMaterial, attachHull, figureTier, HULL_PX, HULL_PARTS, hasDOM, hash01, setDefaultTier, setFigureRim,
} from './base.js';
import { buildHead, buildBrow, buildMouth, buildLids, buildLenses, buildHairTail, mouthAnchor } from './head.js';
import { buildTorso, buildPelvis, buildThigh, buildShin, buildUpperArm, buildForearm, buildHand } from './body.js';
import { buildBackpack } from './cosmetics.js';
import { PATCH_MAX } from './patches.js';
import { createBodyLanguage, POSE_NAMES, POSES, bodyLanguageFor, EMOTION_BODY } from './poses.js';
import { EMOTES, EMOTE_NAMES, EMOTE_LABEL, EMOTE_ICON, DANCES } from './emotes.js';
import { createAura, EMOTION_COLORS, EMOTION_SYMBOLS, TANK_COLORS, STREIT_TIERE, HOTSPOT_NAMES, ringsFor } from './aura.js';
import { createMotionSensor, createSwing } from './springs.js';
import { createNameTag } from './nametag.js';

export { M, SKIN_TONES, HAIR_COLORS, EYE_COLORS, HAIR_STYLES, BROW_STYLES, GLASSES, HEARING_AIDS, PROSTHESES, HEAD_ITEMS, TOP_STYLES, BOTTOM_STYLES, SHOE_STYLES, PATTERNS, MASKS, BACK_ITEMS, ACCESSORIES, CLOTH_COLORS, PATCH_MAX };
export { POSE_NAMES, POSES, bodyLanguageFor, EMOTION_BODY, EMOTES, EMOTE_NAMES, EMOTE_LABEL, EMOTE_ICON, DANCES, EMOTION_COLORS, EMOTION_SYMBOLS, TANK_COLORS, STREIT_TIERE, HOTSPOT_NAMES, ringsFor };
export { patchLayout, normalizePatch, MODULE_COLOR } from './patches.js';
export { createAura, symbolTexture } from './aura.js';
export { createBodyLanguage } from './poses.js';
export { createNameTag } from './nametag.js';
export { getMaterial as getFigureMaterial, getOutlineMaterial, getFigureRamp, setDefaultTier, setFigureRim, figureTier } from './base.js';

export const ANIMS = ['idle', 'walk', 'run', 'jump', 'fall', 'wave', 'talk', 'cheer', 'sad', 'angry', 'sit', 'think'];
export const CONFIG_VERSION = 2;
// Sechs Ausdrucks-Presets (STIL §8.5): brows −1 zornig … +1 besorgt · mouth −1 schmollen … +1 lächeln · raise Brauen hoch ·
// lids Lider halb geschlossen · open Mund offen
export const EXPRESSIONS = {
  freude: { brows: 0, mouth: 1, raise: 0.4, lids: 0, open: 0 },
  wut: { brows: -1, mouth: -0.8, raise: 0, lids: 0.18, open: 0 },
  angst: { brows: 0.9, mouth: -0.4, raise: 0.8, lids: 0, open: 0.6 },
  trauer: { brows: 0.9, mouth: -0.9, raise: 0.1, lids: 0.35, open: 0 },
  ekel: { brows: -0.5, mouth: -0.7, raise: 0.2, lids: 0.45, open: 0 },
  ueberraschung: { brows: 0.2, mouth: 0.2, raise: 1, lids: 0, open: 1 },
};

export const DEFAULT_CONFIG = {
  v: CONFIG_VERSION,
  skin: '#f0c09a', hair: '#3b2a20', hairStyle: 'kurz', hairAccent: '#ffd166', eyes: '#2b1d2e', brows: 'normal',
  freckles: 0, vitiligo: 0,
  glasses: 'keine', glassesColor: '#1d1d26', hearingAid: 'keins', prosthesis: 'keine', prosthesisColor: '#8fa3ff', aidColor: '#2de2c9',
  build: 0.5, height: 0.5,
  head: 'keins', headColor: '#ffd166',
  top: '#ff5d73', topStyle: 'hoodie',
  bottoms: '#2f4a7a', bottomsStyle: 'lang',
  shoes: '#ffffff', shoesStyle: 'sneaker', shoesAccent: '#ffd166',
  pattern: 'keins', patternColor: '#ffffff',
  back: 'keins', backColor: '#ffd166',
  mask: 'keine',
  patches: [], jacket: null,
  accessory: 'keins', accessoryColor: '#ffd166',   // alt (vor WP16) – normalizeConfig übersetzt
  scale: 1,
};

const inList = (v, list, fallback) => (list.includes(v) ? v : fallback);
const isHex = (v) => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
const hex = (v, fb) => (isHex(v) ? v.toLowerCase() : fb);

// Konfiguration vervollständigen und alte Felder übersetzen (accessory → Kopf, Brille, Rucksack). Ergebnis ist klein und serialisierbar.
export function normalizeConfig(c = {}) {
  const src = c && typeof c === 'object' ? c : {};
  const cfg = { ...DEFAULT_CONFIG, ...src };
  const acc = src.accessory;
  if (acc && acc !== 'keins') {
    if ((acc === 'cap' || acc === 'muetze' || acc === 'kopfhoerer') && (!src.head || src.head === 'keins')) { cfg.head = acc; if (!src.headColor) cfg.headColor = src.accessoryColor || cfg.headColor; }
    if (acc === 'brille' && (!src.glasses || src.glasses === 'keine')) cfg.glasses = 'rund';
    if (acc === 'rucksack' && (!src.back || src.back === 'keins')) { cfg.back = 'rucksack'; if (!src.backColor) cfg.backColor = src.accessoryColor || cfg.backColor; }
  }
  if (src.accessoryColor && !src.shoesAccent) cfg.shoesAccent = src.accessoryColor;
  if (src.accessoryColor && !src.hairAccent) cfg.hairAccent = src.accessoryColor;
  cfg.accessory = 'keins';
  cfg.v = CONFIG_VERSION;
  cfg.hairStyle = inList(cfg.hairStyle, HAIR_STYLES, 'kurz');
  cfg.brows = inList(cfg.brows, BROW_STYLES, 'normal');
  cfg.glasses = inList(cfg.glasses, GLASSES, 'keine');
  cfg.hearingAid = inList(cfg.hearingAid, HEARING_AIDS, 'keins');
  cfg.prosthesis = inList(cfg.prosthesis, PROSTHESES, 'keine');
  cfg.head = inList(cfg.head, HEAD_ITEMS, 'keins');
  cfg.topStyle = inList(cfg.topStyle, TOP_STYLES, 'hoodie');
  cfg.bottomsStyle = inList(cfg.bottomsStyle, BOTTOM_STYLES, 'lang');
  cfg.shoesStyle = inList(cfg.shoesStyle, SHOE_STYLES, 'sneaker');
  cfg.pattern = inList(cfg.pattern, PATTERNS, 'keins');
  cfg.mask = inList(cfg.mask, MASKS, 'keine');
  cfg.back = inList(cfg.back, BACK_ITEMS, 'keins');
  if (cfg.head === 'kapuze' && cfg.topStyle !== 'hoodie' && cfg.topStyle !== 'crewjacke') cfg.head = 'keins';
  for (const k of ['skin', 'hair', 'hairAccent', 'eyes', 'glassesColor', 'prosthesisColor', 'aidColor', 'headColor', 'top', 'bottoms', 'shoes', 'shoesAccent', 'patternColor', 'backColor']) cfg[k] = hex(cfg[k], DEFAULT_CONFIG[k]);
  cfg.freckles = Math.max(0, Math.min(2, Math.round(Number(cfg.freckles) || 0)));
  cfg.vitiligo = cfg.vitiligo ? 1 : 0;
  cfg.build = clamp01(cfg.build === undefined || cfg.build === null ? 0.5 : cfg.build);
  cfg.height = clamp01(cfg.height === undefined || cfg.height === null ? 0.5 : cfg.height);
  cfg.scale = Number.isFinite(Number(cfg.scale)) && Number(cfg.scale) > 0 ? Number(cfg.scale) : 1;
  cfg.patches = Array.isArray(cfg.patches) ? cfg.patches.slice(0, PATCH_MAX) : [];
  cfg.jacket = cfg.jacket && typeof cfg.jacket === 'object' ? cfg.jacket : null;
  return cfg;
}

// Zufälliger, stimmiger Look (für „Zufall“ im Stil-Studio und Dorfleute). rng: core/rng.js
export function randomConfig(rng, { npc = false } = {}) {
  const pick = (a) => rng.pick(a);
  const top = pick(CLOTH_COLORS);
  let bottoms = pick(CLOTH_COLORS);
  if (bottoms === top) bottoms = CLOTH_COLORS[(CLOTH_COLORS.indexOf(top) + 5) % CLOTH_COLORS.length];
  const accent = pick(['#ffd166', '#2de2c9', '#ff4f8b', '#ffffff', '#ff8a3d', '#8fa3ff']);
  const cfg = {
    skin: pick(SKIN_TONES), hair: pick(HAIR_COLORS), hairStyle: pick(HAIR_STYLES), hairAccent: accent, eyes: pick(EYE_COLORS), brows: pick(BROW_STYLES),
    freckles: rng.chance(0.3) ? rng.int(1, 2) : 0, vitiligo: rng.chance(0.08) ? 1 : 0,
    glasses: rng.chance(0.22) ? pick(GLASSES.slice(1)) : 'keine', glassesColor: pick(['#1d1d26', '#ff5d73', '#3e78e0', '#e9dcc4']),
    hearingAid: rng.chance(0.06) ? pick(HEARING_AIDS.slice(1)) : 'keins', prosthesis: rng.chance(0.05) ? pick(PROSTHESES.slice(1)) : 'keine',
    prosthesisColor: pick(['#8fa3ff', '#ff8a3d', '#c9ced6', '#2de2c9']), aidColor: accent,
    build: rng.float(0.15, 0.85), height: rng.float(0.15, 0.85),
    head: rng.chance(0.35) ? pick(HEAD_ITEMS.slice(1, 6)) : 'keins', headColor: accent,
    top, topStyle: pick(npc ? TOP_STYLES.filter((s) => s !== 'crewjacke') : TOP_STYLES.slice(0, 6)),
    bottoms, bottomsStyle: pick(BOTTOM_STYLES),
    shoes: pick(['#ffffff', '#1d1d26', '#ff5d73', '#3e78e0', '#e9dcc4', '#2de2c9']), shoesStyle: pick(SHOE_STYLES), shoesAccent: accent,
    pattern: rng.chance(0.45) ? pick(PATTERNS.slice(1)) : 'keins', patternColor: accent,
    back: rng.chance(0.25) ? 'rucksack' : 'keins', backColor: accent,
    mask: 'keine', patches: [], jacket: null,
  };
  return normalizeConfig(cfg);
}

// Weicher Kontaktschatten (Canvas-Textur, einmal erzeugt): 0,8 m, Deckkraft 0,45 (STIL §8.7)
let blobTex = null;
function getBlobTexture() {
  if (blobTex || !hasDOM) return blobTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  gr.addColorStop(0, 'rgba(0,0,0,0.5)'); gr.addColorStop(0.45, 'rgba(0,0,0,0.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  blobTex = new THREE.CanvasTexture(c);
  return blobTex;
}

const JOINTS = ['body', 'spine', 'head', 'hipL', 'hipR', 'kneeL', 'kneeR', 'shL', 'shR', 'elL', 'elR', 'wristL', 'wristR'];
function zeroPose() { const p = { bodyY: 0 }; for (const j of JOINTS) p[j] = { x: 0, y: 0, z: 0 }; return p; }
// Ausdruck je Animation
const ANIM_EXPR = {
  idle: { brows: 0, mouth: 0.1, raise: 0 }, walk: { brows: 0, mouth: 0.1, raise: 0 }, run: { brows: -0.25, mouth: 0, raise: 0 },
  jump: { brows: -0.1, mouth: 0.2, raise: 0.3 }, fall: { brows: 0.3, mouth: -0.2, raise: 0.5, open: 0.5 },
  wave: { brows: 0, mouth: 0.9, raise: 0.4 }, talk: { brows: 0.1, mouth: 0.25, raise: 0.2 }, cheer: { brows: 0, mouth: 1, raise: 0.6, open: 0.7 },
  sad: { brows: 0.9, mouth: -0.9, raise: 0.1, lids: 0.35 }, angry: { brows: -1, mouth: -0.8, raise: 0, lids: 0.15 }, sit: { brows: 0, mouth: 0.1, raise: 0 },
  think: { brows: -0.3, mouth: 0, raise: 0.3, lids: 0.12 },
};
const _tmp = new THREE.Vector3(), _qz = new THREE.Quaternion(), _Z = new THREE.Vector3(0, 0, 1), _w = new THREE.Vector3();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function createHumanoid(config = {}, opts = {}) {
  let cfg = normalizeConfig(config);
  let detail = opts.detail === 'lite' ? 'lite' : 'full';
  const veil = opts.veil || null;
  const tier = figureTier(opts);
  const seed = Math.floor(hash01(String(opts.name || 'x').length + 7, 3) * 1000);
  const material = getMaterial(veil);
  const group = new THREE.Group();
  group.name = opts.name || 'humanoid';
  const body = new THREE.Group(); body.name = 'body'; group.add(body);
  const hips = new THREE.Group(); hips.position.y = M.hipY; body.add(hips);
  const spine = new THREE.Group(); spine.position.y = 0.06; hips.add(spine);
  const neck = new THREE.Group(); neck.position.y = M.torso + 0.07; spine.add(neck);
  const headPivot = new THREE.Group(); headPivot.position.y = M.headR * 0.86; neck.add(headPivot);
  const hairPivot = new THREE.Group(); hairPivot.name = 'hair'; headPivot.add(hairPivot);
  const packPivot = new THREE.Group(); packPivot.name = 'pack'; spine.add(packPivot);
  const J = { body, spine, head: neck, hipL: new THREE.Group(), hipR: new THREE.Group(), kneeL: new THREE.Group(), kneeR: new THREE.Group(), shL: new THREE.Group(), shR: new THREE.Group(), elL: new THREE.Group(), elR: new THREE.Group(), wristL: new THREE.Group(), wristR: new THREE.Group(), hair: hairPivot, pack: packPivot };
  hips.add(J.hipL, J.hipR);
  J.kneeL.position.y = -M.thigh; J.kneeR.position.y = -M.thigh;
  J.hipL.add(J.kneeL); J.hipR.add(J.kneeR);
  spine.add(J.shL, J.shR);
  J.elL.position.y = -M.upperArm; J.elR.position.y = -M.upperArm;
  J.shL.add(J.elL); J.shR.add(J.elR);
  J.wristL.position.y = -M.forearm; J.wristR.position.y = -M.forearm;
  J.elL.add(J.wristL); J.elR.add(J.wristR);
  function placeJoints() {
    const W = buildWidth(cfg.build);
    J.hipL.position.set(0.095 * W, -0.06, 0); J.hipR.position.set(-0.095 * W, -0.06, 0);
    J.shL.position.set(M.shoulderX * W, M.torso - 0.06, 0); J.shR.position.set(-M.shoulderX * W, M.torso - 0.06, 0);
  }

  const meshes = {};
  let hullPx = 0, hullMat = null, hullMatHand = null;
  function setupHulls() {
    hullPx = (HULL_PX[tier] || HULL_PX.high)[detail] || 0;
    hullMat = hullPx > 0 ? getOutlineMaterial(veil, hullPx) : null;
    hullMatHand = hullPx > 0 ? getOutlineMaterial(veil, (HULL_PX[tier] || HULL_PX.high).hand) : null;
  }
  function mk(name, geo, parent, mat = material, { hull = true, thin = false, shadow = true } = {}) {
    if (meshes[name]) { meshes[name].parent.remove(meshes[name]); meshes[name].geometry.dispose(); }
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = shadow; m.receiveShadow = false;
    m.name = name;
    parent.add(m);
    meshes[name] = m;
    const parts = HULL_PARTS[tier];
    if (hull && mat === material && hullMat && (!parts || parts.has(name))) attachHull(m, thin ? hullMatHand : hullMat);
    return m;
  }
  function drop(name) { const m = meshes[name]; if (m) { m.parent.remove(m); m.geometry.dispose(); delete meshes[name]; } }
  const face = { browL: null, browR: null, mouths: {}, lids: null, anchors: { browL: null, browR: null, mouth: null } };
  const hands = { L: {}, R: {} };
  let hairSwing = null, packSwing = null;
  function build() {
    placeJoints();
    setupHulls();
    const W = buildWidth(cfg.build);
    const lite = detail === 'lite';
    for (const n of Object.keys(meshes)) drop(n);
    face.browL = face.browR = face.lids = null; face.mouths = {}; hands.L = {}; hands.R = {};
    hairSwing = packSwing = null;
    hairPivot.rotation.set(0, 0, 0); packPivot.rotation.set(0, 0, 0);
    const tail = buildHairTail(cfg);
    if (lite) {
      // Gesicht statisch in den Kopf gebacken (Augen, Brauen, Mund neutral), Schweif in den Kopf, Hände in die Unterarme
      mk('head', buildHead(cfg, { withBrows: true, withMouth: true, withTail: false }), headPivot);
      if (tail) tail.geo.dispose();
    } else {
      mk('head', buildHead(cfg, { withTail: !!tail }), headPivot);
      for (const [key, s] of [['browL', 1], ['browR', -1]]) {
        const b = buildBrow(cfg, s);
        face.anchors[key] = b.anchor;
        face[key] = mk(key, b.geo, headPivot, material, { hull: false, shadow: false });
      }
      const MA = mouthAnchor();
      face.anchors.mouth = MA;
      for (const k of ['neutral', 'smile', 'frown', 'open']) {
        const m = mk('mouth-' + k, buildMouth(cfg, k), headPivot, material, { hull: false, shadow: false });
        m.position.copy(MA.pos).addScaledVector(MA.n, 0.004);
        m.quaternion.copy(MA.q);
        face.mouths[k] = m;
      }
      const lids = buildLids(cfg);
      face.lids = mk('lids', lids.geo, headPivot, material, { hull: false, shadow: false });
      face.lids.position.y = lids.y;
      face.lids.visible = false;
      if (tail) {
        hairPivot.position.set(tail.pivot[0], tail.pivot[1], tail.pivot[2]);
        tail.geo.translate(-tail.pivot[0], -tail.pivot[1], -tail.pivot[2]);
        mk('hairTail', tail.geo, hairPivot);
        hairSwing = createSwing(hairPivot, { k: 55, damp: 6.5, gain: 0.07, turnGain: 0.5, limit: 0.5, idle: 0.025, phase: seed });
      }
    }
    const lens = buildLenses(cfg);
    if (lens) { const m = mk('lens', lens, headPivot, getGlassMaterial(), { hull: false, shadow: false }); m.renderOrder = 6; }
    let torso = buildTorso(cfg, W);
    if (cfg.back === 'rucksack') {
      const pack = buildBackpack(cfg, W);
      if (lite) { pack.geo.translate(pack.pivot[0], pack.pivot[1], pack.pivot[2]); torso = merge([torso, pack.geo]); }
      else {
        packPivot.position.set(pack.pivot[0], pack.pivot[1], pack.pivot[2]);
        mk('pack', pack.geo, packPivot);
        packSwing = createSwing(packPivot, { k: 140, damp: 11, gain: 0.03, turnGain: 0.1, limit: 0.16, idle: 0.004, phase: seed + 2 });
      }
    }
    mk('torso', torso, spine);
    mk('pelvis', buildPelvis(cfg, W), hips);
    mk('thighL', buildThigh(cfg, 0, W), J.hipL); mk('thighR', buildThigh(cfg, 1, W), J.hipR);
    mk('shinL', buildShin(cfg, 0, W), J.kneeL); mk('shinR', buildShin(cfg, 1, W), J.kneeR);
    mk('upperL', buildUpperArm(cfg, 0, W), J.shL); mk('upperR', buildUpperArm(cfg, 1, W), J.shR);
    if (lite) {
      mk('foreL', merge([buildForearm(cfg, 0, W), buildHand(cfg, 0, 'open', W).translate(0, -M.forearm, 0)]), J.elL);
      mk('foreR', merge([buildForearm(cfg, 1, W), buildHand(cfg, 1, 'open', W).translate(0, -M.forearm, 0)]), J.elR);
    } else {
      mk('foreL', buildForearm(cfg, 0, W), J.elL); mk('foreR', buildForearm(cfg, 1, W), J.elR);
      for (const [side, S, joint] of [[0, 'L', J.wristL], [1, 'R', J.wristR]]) {
        for (const kind of ['open', 'fist', 'thumb', 'stop']) {
          const m = mk(`hand${S}-${kind}`, buildHand(cfg, side, kind, W), joint, material, { thin: true });
          m.visible = kind === 'open';
          hands[S][kind] = m;
        }
      }
    }
    group.scale.setScalar((cfg.scale || 1) * heightScale(cfg.height));
    if (tag && tag.sprite) tag.sprite.position.y = 2.0 + 0.08;
    applyExpression(0);
  }

  // Kontaktschatten
  const blobTexture = getBlobTexture();
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: blobTexture, color: blobTexture ? '#ffffff' : '#000000', transparent: true, opacity: blobTexture ? 0.9 : 0.3, depthWrite: false, toneMapped: false }));
  blob.position.y = 0.03; blob.renderOrder = 4;
  group.add(blob);

  // Aura (WP17)
  const aura = createAura({ group, joints: J });
  // Namensschild
  let tag = null;

  // Körpersprache (additiv) und Emotes
  const bodyLanguage = createBodyLanguage(J, { shoulderY: M.torso - 0.06 });
  let emote = null;     // { name, def, t, loop, seconds, resolve, S }
  let handsOverride = null;
  const lookTarget = new THREE.Vector3();
  let lookOn = false, lookWeight = 0;
  const sensor = createMotionSensor(neck);

  // Ausdruck
  const exprCur = { brows: 0, mouth: 0, raise: 0, lids: 0, open: 0 };
  let exprOverride = null;
  let blinkT = 2 + hash01(seed, 11) * 3, blinkPhase = -1, mouthTalk = 0;
  function applyExpression(dt) {
    const base = exprOverride || (emote && emote.S.expr) || ANIM_EXPR[anim] || ANIM_EXPR.idle;
    const wantB = base.brows + bodyLanguage.face.brows, wantM = base.mouth + bodyLanguage.face.mouth, wantR = base.raise || 0, wantL = base.lids || 0;
    let wantO = base.open || 0;
    if (anim === 'talk' && !exprOverride && !emote) wantO = Math.max(wantO, (Math.sin(animT * 10.5) + Math.sin(animT * 6.3) * 0.7) > 0.4 ? 1 : 0);
    const k = dt > 0 ? 1 - Math.exp(-dt * 8) : 1;
    exprCur.brows += (wantB - exprCur.brows) * k;
    exprCur.mouth += (wantM - exprCur.mouth) * k;
    exprCur.raise += (wantR - exprCur.raise) * k;
    exprCur.lids += (wantL - exprCur.lids) * k;
    exprCur.open += (wantO - exprCur.open) * (dt > 0 ? 1 - Math.exp(-dt * 16) : 1);
    if (!face.browL) return;
    for (const [m, s, A] of [[face.browL, 1, face.anchors.browL], [face.browR, -1, face.anchors.browR]]) {
      m.position.copy(A.pos).addScaledVector(A.n, 0.0045).addScaledVector(A.up, exprCur.raise * 0.016 + Math.abs(exprCur.brows) * 0.003);
      m.quaternion.copy(A.q).multiply(_qz.setFromAxisAngle(_Z, s * (0.05 - exprCur.brows * 0.42)));
    }
    const mo = clamp(exprCur.mouth, -1, 1);
    const kind = exprCur.open > 0.5 ? 'open' : mo > 0.3 ? 'smile' : mo < -0.3 ? 'frown' : 'neutral';
    for (const [k2, m] of Object.entries(face.mouths)) {
      m.visible = k2 === kind;
      if (k2 === 'open') m.scale.set(0.75 + exprCur.open * 0.35 + Math.max(0, mo) * 0.3, 0.7 + exprCur.open * 0.4, 1);
      else m.scale.set(1 + Math.abs(mo) * 0.35, 1, 1);
    }
    // Blinzeln alle 3–5 s in 0,12 s; Lider halb geschlossen bei Trauer/Ekel
    if (dt > 0) {
      if (blinkPhase < 0) { blinkT -= dt; if (blinkT <= 0) blinkPhase = 0; }
      else { blinkPhase += dt / 0.12; if (blinkPhase >= 1) { blinkPhase = -1; blinkT = 2.6 + hash01(Math.floor(animT * 7) + seed, 5) * 2.6; } }
    }
    const blink = blinkPhase < 0 ? 0 : Math.sin(blinkPhase * Math.PI);
    const closed = Math.max(blink, exprCur.lids * 0.55);
    if (face.lids) { face.lids.visible = closed > 0.03; face.lids.scale.y = Math.max(0.02, closed); }
  }

  // Animationszustand
  let anim = 'idle', animT = 0, prevAnim = 'idle';
  let phase = 0, moveSpeed = 0, lastStepHalf = 0, landT = 0, stretch = 1;
  let shiftT = 0, shiftPeriod = 4.5 + hash01(seed, 2) * 2.5, shiftDir = hash01(seed, 4) > 0.5 ? 1 : -1, shiftCur = 0, shiftN = 0;
  const cur = zeroPose(), tgt = zeroPose();
  let blend = 1;
  build();

  function set(j, x, y, z) { tgt[j].x = x; tgt[j].y = y; tgt[j].z = z; }
  function emoteS() {
    return { set, bodyY: 0, expr: null, hands: { L: null, R: null }, wrist: { L: null, R: null }, lift: 0, yaw: null };
  }

  const h = {
    group, meshes, joints: J, blob, aura, face, bodyLanguage,
    get config() { return { ...cfg, patches: cfg.patches.slice() }; },
    get anim() { return anim; },
    get emote() { return emote ? emote.name : null; },
    get expression() { return { ...exprCur }; },
    get detail() { return detail; },
    get tier() { return tier; },
    get outlinePx() { return hullPx; },
    get hands() { return handsOverride || (emote && (emote.S.hands.R || emote.S.hands.L)) || bodyLanguage.hands; },
    get height() { return 2.0 * group.scale.y; },
    get triangles() { let n = 0; for (const m of Object.values(meshes)) if (m.visible) n += m.geometry.attributes.position.count / 3; return n; },
    get nameTag() { return tag; },
    headRadius: M.headR,
    headHeight: M.headR * 2 * 1.12,
    vy: 0,
    onStep: null,
    setConfig(c) { cfg = normalizeConfig({ ...cfg, ...(c || {}) }); build(); return h; },
    setDetail(d) { const nd = d === 'lite' ? 'lite' : 'full'; if (nd !== detail) { detail = nd; build(); } return h; },
    setAnim(name) {
      if (name === anim) return;
      if ((anim === 'jump' || anim === 'fall') && name !== 'jump' && name !== 'fall') landT = 0.16;
      prevAnim = anim; anim = name; animT = 0; blend = 0;
    },
    setMoveSpeed(v) { moveSpeed = v; },
    setExpression(e) {
      if (typeof e === 'string') e = EXPRESSIONS[e] || null;
      exprOverride = e ? { brows: 0, mouth: 0, raise: 0, lids: 0, open: 0, ...e } : null;
    },
    setEmotionAura(color) { aura.setColor(color); },
    // Namensschild über dem Kopf (oder null zum Entfernen)
    setNameTag(o) {
      if (tag) { group.remove(tag.sprite); tag.dispose(); tag = null; }
      if (!o) return h;
      tag = createNameTag(o);
      if (tag.sprite) { tag.sprite.position.y = 2.0 + 0.08; group.add(tag.sprite); }
      return h;
    },
    // Körpersprache
    setPose(name, w = 1) { bodyLanguage.set(name, w); return h; },
    setPoses(obj) { bodyLanguage.setAll(obj); return h; },
    clearPoses() { bodyLanguage.clear(); return h; },
    setHands(kind) { handsOverride = kind || null; return h; },
    // Kopf folgt einem Punkt (Weltkoordinaten) oder null
    lookAt(target) { if (target) { lookTarget.set(target.x, target.y, target.z); lookOn = true; } else lookOn = false; return h; },
    // Emote abspielen; löst auf, wenn der Clip endet oder gestoppt wird. freeze: 0…1 hält den Clip an dieser Stelle
    // (Bögen, Dioramen) bis stopEmote(); seconds begrenzt Schleifen.
    playEmote(name, { loop, seconds, freeze } = {}) {
      const def = EMOTES[name];
      if (!def) return Promise.resolve({ done: false, unknown: name });
      if (emote) { emote.resolve({ done: false, cancelled: true }); }
      return new Promise((resolve) => {
        emote = { name, def, t: 0, loop: loop === undefined ? !!def.loop : !!loop, seconds: seconds || (def.loop ? Infinity : def.seconds), resolve, S: emoteS(), freezeAt: typeof freeze === 'number' ? def.seconds * Math.max(0, Math.min(1, freeze)) : null };
        if (emote.loop && !seconds) emote.seconds = Infinity;
        if (emote.freezeAt !== null) emote.seconds = Infinity;
        blend = 0;
      });
    },
    stopEmote() { if (emote) { const e = emote; emote = null; blend = 0; cur.body.y = ((cur.body.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; e.resolve({ done: false, cancelled: true }); } },
    update(dt, camera) {
      animT += dt;
      blend = Math.min(1, blend + dt * 5);
      const motion = sensor.update(dt);
      if (emote) {
        emote.t += dt;
        if (emote.freezeAt !== null && emote.t > emote.freezeAt) emote.t = emote.freezeAt;
        if (emote.t >= emote.seconds) { const e = emote; emote = null; blend = 0; cur.body.y = ((cur.body.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; e.resolve({ done: true }); }
      }
      computePose(dt);
      const fast = anim === 'jump' || anim === 'fall';
      const k = 1 - Math.exp(-dt * (fast ? 14 : emote ? 12 : 11));
      cur.bodyY += (tgt.bodyY - cur.bodyY) * k;
      for (const j of JOINTS) {
        const a = cur[j], b = tgt[j];
        a.x += (b.x - a.x) * k; a.y += (b.y - a.y) * k; a.z += (b.z - a.z) * k;
        J[j].rotation.set(a.x, a.y, a.z);
      }
      body.position.y = cur.bodyY;
      body.position.z = 0;
      body.position.x = shiftCur * 0.018 * (anim === 'idle' || anim === 'think' ? 1 : 0);
      // Squash & Stretch (Sprung), Landung
      const wantStretch = anim === 'jump' && h.vy > 0 ? 1.06 : anim === 'fall' ? 1.02 : landT > 0 ? 0.95 : 1;
      stretch += (wantStretch - stretch) * Math.min(1, dt * 14);
      body.scale.set(1 / Math.sqrt(stretch), stretch, 1 / Math.sqrt(stretch));
      if (landT > 0) landT -= dt;
      bodyLanguage.update(dt, animT);
      if (emote && emote.S.lift) { J.shL.position.y += emote.S.lift; J.shR.position.y += emote.S.lift; }
      // Kopf folgt Blickziel (begrenzt)
      const wantLook = lookOn ? 1 : 0;
      lookWeight += (wantLook - lookWeight) * Math.min(1, dt * 4);
      if (lookWeight > 0.01) {
        neck.updateWorldMatrix(true, false);
        _tmp.copy(lookTarget);
        neck.parent.worldToLocal(_tmp);
        _tmp.sub(neck.position);
        const yaw = Math.max(-1.1, Math.min(1.1, Math.atan2(_tmp.x, _tmp.z)));
        const pitch = Math.max(-0.5, Math.min(0.6, -Math.atan2(_tmp.y - 0.2, Math.hypot(_tmp.x, _tmp.z))));
        neck.rotation.y += yaw * lookWeight; neck.rotation.x += pitch * lookWeight;
      }
      // Hände: Emote > manuell > Körpersprache
      if (hands.L.open) {
        const kL = (emote && emote.S.hands.L) || handsOverride || bodyLanguage.hands;
        const kR = (emote && emote.S.hands.R) || handsOverride || bodyLanguage.hands;
        for (const [S, kind] of [['L', kL], ['R', kR]]) {
          const want = hands[S][kind] ? kind : 'open';
          for (const [kk, m] of Object.entries(hands[S])) m.visible = kk === want;
        }
      }
      // Nachschwingen (Haare, Rucksack)
      if (hairSwing) hairSwing.update(dt, motion, animT);
      if (packSwing) packSwing.update(dt, motion, animT);
      applyExpression(dt);
      aura.update(dt, camera);
      // Impostor (npc.js backt alle Teile zu einem Mesh): bekommt dieselbe Kontur-Hülle
      if (!body.visible && hullMat) for (const c of group.children) if (c.isMesh && c.name === 'impostor' && !c.userData.hull) attachHull(c, hullMat);
      if (tag && tag.sprite && camera) { tag.sprite.getWorldPosition(_w); tag.update(camera.position.distanceTo(_w)); }
    },
    dispose() {
      for (const m of Object.values(meshes)) m.geometry.dispose();
      blob.geometry.dispose(); blob.material.dispose();
      aura.dispose();
      if (tag) { tag.dispose(); tag = null; }
      if (emote) { emote.resolve({ done: false, cancelled: true }); emote = null; }
    },
  };

  function computePose(dt) {
    const t = animT;
    for (const j of JOINTS) set(j, 0, 0, 0);
    tgt.bodyY = 0;
    // Grundhaltung: Arme leicht vom Körper, lässig, Ellbogen leicht gebeugt
    set('shL', 0.05, 0, 0.1); set('shR', 0.05, 0, -0.1);
    set('elL', -0.18, 0, 0); set('elR', -0.18, 0, 0);
    set('wristL', 0, 0, 0.06); set('wristR', 0, 0, -0.06);
    if (emote) {
      const S = emote.S;
      S.bodyY = 0; S.expr = null; S.hands.L = S.hands.R = null; S.wrist.L = S.wrist.R = null; S.lift = 0; S.yaw = null;
      emote.def.fn(emote.t, S);
      tgt.bodyY = S.bodyY;
      if (S.wrist.L) set('wristL', S.wrist.L[0], S.wrist.L[1], S.wrist.L[2]);
      if (S.wrist.R) set('wristR', S.wrist.R[0], S.wrist.R[1], S.wrist.R[2]);
      if (S.yaw !== null) tgt.body.y = S.yaw;
      return;
    }
    const breathe = Math.sin(t * 1.7);
    if (anim === 'idle' || anim === 'think') {
      // Atmen, Gewichtsverlagerung alle 4–7 s, Kopf schaut sich um
      shiftT += dt;
      if (shiftT > shiftPeriod) { shiftT = 0; shiftN++; shiftPeriod = 4 + hash01(shiftN + seed, 9) * 3; shiftDir = -shiftDir; }
      shiftCur += (shiftDir - shiftCur) * Math.min(1, dt * 1.6);
      const sc = shiftCur;
      tgt.bodyY = breathe * 0.012 - Math.abs(sc) * 0.006;
      set('spine', 0.02 + breathe * 0.02, sc * 0.05, -sc * 0.045);
      set('head', -breathe * 0.02 + Math.sin(t * 0.37) * 0.04, Math.sin(t * 0.23) * 0.25 - sc * 0.05, sc * 0.03);
      set('shL', 0.04 + breathe * 0.02, 0, 0.09 + breathe * 0.015 - sc * 0.02); set('shR', 0.04 + breathe * 0.02, 0, -0.09 - breathe * 0.015 - sc * 0.02);
      set('hipL', 0.01 - sc * 0.02, 0, 0.05 + sc * 0.045); set('hipR', 0.03 + sc * 0.02, 0, -0.03 + sc * 0.045);
      set('kneeL', Math.max(0, sc) * 0.16, 0, 0); set('kneeR', 0.06 + Math.max(0, -sc) * 0.14, 0, 0);
      set('body', 0, 0, sc * 0.035);
      if (anim === 'think') { set('shR', -0.9, 0.3, -0.35); set('elR', -2.1, 0, 0); set('wristR', -0.4, 0, 0.3); set('head', 0.12, 0.15, 0.08); }
    } else if (anim === 'walk' || anim === 'run') {
      shiftCur *= Math.max(0, 1 - dt * 4);
      const run = clamp((moveSpeed - 2.5) / 3.5, 0, 1);
      const stride = 1.35 + run * 0.95;
      phase += (dt * Math.max(moveSpeed, 0.8) / stride) * Math.PI;
      const s = Math.sin(phase), c = Math.cos(phase);
      const A = 0.5 + run * 0.4;
      set('hipL', -s * A + run * 0.1, 0, 0.02); set('hipR', s * A + run * 0.1, 0, -0.02);
      set('kneeL', Math.max(0, c) * (0.95 + run * 0.7) + Math.max(0, s) * 0.14, 0, 0);
      set('kneeR', Math.max(0, -c) * (0.95 + run * 0.7) + Math.max(0, -s) * 0.14, 0, 0);
      const aa = 0.42 + run * 0.5;
      set('shL', s * aa + run * 0.1, 0, 0.1 + run * 0.06); set('shR', -s * aa + run * 0.1, 0, -0.1 - run * 0.06);
      set('elL', -0.35 - run * 0.95 - Math.max(0, -s) * 0.35, 0, 0); set('elR', -0.35 - run * 0.95 - Math.max(0, s) * 0.35, 0, 0);
      set('wristL', -0.1 * run, 0, 0.1); set('wristR', -0.1 * run, 0, -0.1);
      tgt.bodyY = (0.5 - Math.abs(s)) * (0.045 + run * 0.07) - run * 0.03;
      set('spine', 0.06 + run * 0.15, s * 0.1, c * 0.03);
      set('head', -0.05 - run * 0.1, -s * 0.06, -c * 0.02);
      set('body', 0, -s * 0.07, c * 0.05);
      const half = Math.floor((phase + Math.PI / 2) / Math.PI);
      if (half !== lastStepHalf) { lastStepHalf = half; if (h.onStep) h.onStep(half % 2 ? 'L' : 'R'); }
    } else if (anim === 'jump' || anim === 'fall') {
      const up = h.vy > 0;
      const tuck = up ? 1 : 0.4;
      set('hipL', -0.5 * tuck - 0.2, 0, 0.08); set('hipR', 0.2 - 0.3 * tuck, 0, -0.08);
      set('kneeL', 0.9 * tuck + 0.3, 0, 0); set('kneeR', 0.5 + 0.3 * tuck, 0, 0);
      set('shL', -0.3, 0, 1.2 + (up ? 0.6 : 0.2)); set('shR', -0.3, 0, -1.2 - (up ? 0.6 : 0.2));
      set('elL', -0.4, 0, 0); set('elR', -0.4, 0, 0);
      set('spine', up ? -0.08 : 0.08, 0, 0);
      set('head', up ? -0.12 : 0.1, 0, 0);
    } else if (anim === 'wave') {
      tgt.bodyY = breathe * 0.01;
      set('shR', -0.2, 0, -2.55); set('elR', -0.5 + Math.sin(t * 9) * 0.45, 0, 0); set('wristR', 0, 0, Math.sin(t * 9) * 0.3);
      set('shL', 0.05, 0, 0.12);
      set('head', -0.08, 0.1, -0.1);
      set('spine', 0, 0.1, 0.05);
    } else if (anim === 'talk') {
      tgt.bodyY = breathe * 0.01;
      set('head', Math.sin(t * 5.2) * 0.07 + Math.sin(t * 2.1) * 0.04, Math.sin(t * 1.3) * 0.12, Math.sin(t * 1.7) * 0.05);
      set('shR', -0.45 + Math.sin(t * 2.3) * 0.2, 0.2, -0.3 - Math.sin(t * 1.9) * 0.1); set('elR', -1.2 + Math.sin(t * 3.1) * 0.25, 0, 0);
      set('shL', -0.2 + Math.sin(t * 1.7 + 1) * 0.15, -0.1, 0.25); set('elL', -0.9 + Math.sin(t * 2.6 + 2) * 0.2, 0, 0);
      set('wristR', Math.sin(t * 3.1) * 0.3, 0, -0.2); set('wristL', Math.sin(t * 2.6 + 1) * 0.2, 0, 0.2);
      set('spine', 0.03, Math.sin(t * 1.1) * 0.06, 0);
    } else if (anim === 'cheer') {
      const b = Math.abs(Math.sin(t * 6));
      tgt.bodyY = b * 0.12;
      set('shL', -0.3, 0, 2.6 + Math.sin(t * 12) * 0.2); set('shR', -0.3, 0, -2.6 - Math.sin(t * 12) * 0.2);
      set('elL', -0.3, 0, 0); set('elR', -0.3, 0, 0);
      set('kneeL', b * 0.4, 0, 0); set('kneeR', b * 0.4, 0, 0); set('hipL', -b * 0.25, 0, 0.05); set('hipR', -b * 0.25, 0, -0.05);
      set('head', -0.25, 0, 0);
    } else if (anim === 'sad') {
      tgt.bodyY = -0.02 + breathe * 0.005;
      set('spine', 0.22, 0, 0); set('head', 0.45, Math.sin(t * 0.4) * 0.1, 0);
      set('shL', 0.12, 0, 0.04); set('shR', 0.12, 0, -0.04);
      set('elL', -0.05, 0, 0); set('elR', -0.05, 0, 0);
    } else if (anim === 'angry') {
      const shake = Math.sin(t * 20) * 0.02;
      tgt.bodyY = Math.abs(Math.sin(t * 3)) * 0.03;
      set('spine', 0.1, shake, 0); set('head', 0.12, Math.sin(t * 3.3) * 0.15, 0);
      set('shL', -0.5, 0.6, 0.35); set('shR', -0.5, -0.6, -0.35);
      set('elL', -1.9, 0, 0); set('elR', -1.9, 0, 0);
      set('hipL', 0, 0, 0.12); set('hipR', 0, 0, -0.12);
      if (Math.sin(t * 3) > 0.9) set('hipR', -0.4, 0, -0.1);
    } else if (anim === 'sit') {
      tgt.bodyY = -0.46;
      set('hipL', -1.5, 0, 0.1); set('hipR', -1.5, 0, -0.1);
      set('kneeL', 1.5, 0, 0); set('kneeR', 1.5, 0, 0);
      set('shL', -0.3, 0, 0.15); set('shR', -0.3, 0, -0.15); set('elL', -0.6, 0, 0); set('elR', -0.6, 0, 0);
      set('head', Math.sin(t * 0.4) * 0.05, Math.sin(t * 0.3) * 0.2, 0);
    }
    // Landung: kurz in die Knie
    if (landT > 0) { const l = Math.sin(Math.min(1, landT / 0.16) * Math.PI) * 0.35; tgt.kneeL.x += l; tgt.kneeR.x += l; tgt.hipL.x -= l * 0.5; tgt.hipR.x -= l * 0.5; tgt.bodyY -= l * 0.08; tgt.spine.x += l * 0.3; }
  }
  return h;
}
