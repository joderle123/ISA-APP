// Gemeinsame Grundlagen der Figur (WP16): Maße, Farbhelfer, geteilte Materialien, Wertelisten.
// Alle Bauteile (head.js, body.js, cosmetics.js, patches.js) lesen von hier; index.js setzt die Figur zusammen.
import * as THREE from 'three';

// Maße (Meter): lange Beine, schmaler Rumpf, kleiner Kopf – Teen-Silhouette (~6,3 Kopfhöhen)
export const M = {
  hipY: 0.96, thigh: 0.45, shin: 0.43, torso: 0.56, shoulderX: 0.235, upperArm: 0.3, forearm: 0.27,
  headR: 0.142, neck: 0.08,
};

// 16 Hauttöne von sehr hell bis sehr dunkel (DESIGN §8)
export const SKIN_TONES = [
  '#fde7d4', '#f9d7b9', '#f3c9a6', '#f0c09a', '#e8b48c', '#dea67c', '#d29a6e', '#c98c5f',
  '#b97d57', '#a86c48', '#96603f', '#8e5b3c', '#7a4a30', '#6a4029', '#5f3c28', '#4a2e1f',
];
export const HAIR_COLORS = ['#1b1512', '#3b2a20', '#4a2e1f', '#6b4a2f', '#8a5a34', '#b07a3c', '#d9a24a', '#e8d29a', '#b23a2a', '#d84f8c', '#6c4bd6', '#2dbf9a', '#3e78e0', '#e9e9ef'];
export const EYE_COLORS = ['#2b1d2e', '#4a2a1a', '#6b4a2f', '#2f6b3a', '#3e78e0', '#6f8a9e', '#9b6bff'];
export const HAIR_STYLES = ['kurz', 'lang', 'locken', 'afro', 'locs', 'flechtzoepfe', 'buzz', 'dutt', 'stachel', 'glatze', 'kopftuch', 'zopf', 'bob', 'undercut', 'irokese'];
export const BROW_STYLES = ['normal', 'schmal', 'stark', 'geschwungen'];
export const GLASSES = ['keine', 'rund', 'eckig', 'sport'];
export const HEARING_AIDS = ['keins', 'links', 'rechts', 'beide'];
export const PROSTHESES = ['keine', 'links', 'rechts'];
export const HEAD_ITEMS = ['keins', 'cap', 'muetze', 'kopfhoerer', 'bandana', 'stirnband', 'kapuze'];
export const TOP_STYLES = ['hoodie', 'tshirt', 'jacke', 'hemd', 'tanktop', 'pullover', 'crewjacke'];
export const BOTTOM_STYLES = ['lang', 'kurz', 'jogger', 'cargo', 'rock'];
export const SHOE_STYLES = ['sneaker', 'boots', 'sandalen', 'high'];
export const PATTERNS = ['keins', 'streifen', 'camo', 'verlauf', 'batik', 'leuchtkante'];
export const MASKS = ['keine', 'fuchs', 'eule', 'hai', 'schildkroete', 'teddy'];
export const BACK_ITEMS = ['keins', 'rucksack'];
// Alte Konfigurationen (vor WP16): accessory → Kopf/Brille/Rucksack (normalizeConfig übersetzt)
export const ACCESSORIES = ['keins', 'cap', 'muetze', 'kopfhoerer', 'rucksack', 'brille'];
// Kleidungs-Farben (Grundpalette, Farbsets aus Regionen kommen dazu)
export const CLOTH_COLORS = ['#ff5d73', '#ff8a3d', '#ffd166', '#5ad24f', '#2de2c9', '#3e78e0', '#6c4bd6', '#ff4f8b', '#ffffff', '#c9ced6', '#5a6270', '#1d1d26', '#2f4a7a', '#6b4a2f', '#e9dcc4', '#8fa3ff'];

export const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));
export function darker(hex, k = 0.8) { return new THREE.Color(hex).multiplyScalar(k); }
export function lighter(hex, k = 0.2) { return new THREE.Color(hex).lerp(new THREE.Color('#ffffff'), k); }
export function mixHex(a, b, t) { return new THREE.Color(a).lerp(new THREE.Color(b), t); }
export const hasDOM = typeof document !== 'undefined';

// Statur (0 schlank … 1 kräftig) → Breitenfaktor; Größe (0 klein … 1 groß) → Gesamtmaßstab
export const buildWidth = (b) => 0.88 + clamp01(b === undefined ? 0.5 : b) * 0.3;
export const heightScale = (h) => 0.93 + clamp01(h === undefined ? 0.5 : h) * 0.14;

// ---- Geteilte Materialien (ein Lambert je Schleier-Variante, ein Glas, ein Leuchten) ----
const MATS = new Map();
export function getMaterial(veil) {
  const k = veil ? 'v' : 'n';
  if (!MATS.has(k)) {
    const m = new THREE.MeshLambertMaterial({ vertexColors: true });
    if (veil) veil.patch(m, { key: 'human' });
    MATS.set(k, m);
  }
  return MATS.get(k);
}
export function getGlassMaterial() {
  if (!MATS.has('glass')) {
    MATS.set('glass', new THREE.MeshBasicMaterial({ color: '#bfe6ff', transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }));
  }
  return MATS.get('glass');
}

// Deterministischer Zufall für Teilepositionen (kleine Varianz je Figur, stabil je Seed)
export function hash01(i, seed = 1) {
  let h = (i * 374761393 + seed * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

// Euler-Rotation, die +z auf die Richtung n dreht (für flache Teile auf Kugeloberflächen)
const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _z = new THREE.Vector3(0, 0, 1), _n = new THREE.Vector3();
export function rotToNormal(nx, ny, nz) {
  _n.set(nx, ny, nz).normalize();
  _q.setFromUnitVectors(_z, _n);
  _e.setFromQuaternion(_q);
  return [_e.x, _e.y, _e.z];
}
