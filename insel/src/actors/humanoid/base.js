// Gemeinsame Grundlagen der Figur (WP16, Stil-Bibel §8): Maße, Farbhelfer, geteilte Materialien (Toon-Rampe, Kontur-Hülle,
// Glas), Qualitätsstufe und Wertelisten. Alle Bauteile (head.js, body.js, cosmetics.js, patches.js) lesen von hier;
// index.js setzt die Figur zusammen.
//
// Materialien (je Schleier-Variante ein Toon-Material, vertexfarben):
//   getMaterial(veil)            MeshToonMaterial + Rampe „figur“ (STIL §3.1), kühl getönter Schatten, warme Haut-Schatten,
//                                Kantenlicht (STIL §3.3). Vertex-Attribut aWind trägt die Fläche: 0 Stoff/Haar · 1 Haut · 2 flach
//                                (Augen, Mund, Brauen – unbeleuchtet wie gemalte Linien).
//   getOutlineMaterial(veil, px) Inverted-Hull-Kontur in Bildschirm-Pixeln (STIL §4), Farbe = Albedo × 0.38, Sättigung × 1.2.
//                                Breite je Vertex × Hüllenfaktor aus dem Nachkommateil von aWind (geo.js fig({ hull })):
//                                Silhouette 1.0, Haarsträhnen 0.35–0.6 (dünne Innenlinien), flache Teile 0.
//   getGlassMaterial()           Brillengläser mit Fresnel-Rand.
//   figureTier(opts)             'low' | 'medium' | 'high' (opts.quality > setDefaultTier() > window.LUMO.quality > 'high').
import * as THREE from 'three';

// Maße (Meter): ≈ 6,5 Kopfhöhen (Kopfhöhe 0,30 m), lange Beine, schmale Taille, leicht breite Schultern (STIL §8.1)
export const M = {
  hipY: 1.0, thigh: 0.47, shin: 0.45, torso: 0.58, shoulderX: 0.245, upperArm: 0.31, forearm: 0.28,
  headR: 0.14, neck: 0.075, hand: 0.11, foot: 0.3,
  // Halsansatz über der Schulterlinie und Kopfmitte über dem Halsgelenk (index.js): kurzer, kräftiger Hals (Anime-Teen)
  neckY: 0.05, headY: 0.125,
};

// Rumpfquerschnitt je Höhe (y: 0 Hüfte … M.torso Schulter) → halbe Breite/Tiefe vor Statur (W). body.js baut daraus die Drehform,
// patches.js legt damit die Aufnäher exakt auf den Rücken.
export const TORSO_PROFILE = [[0.05, -0.03], [0.135, -0.01], [0.15, 0.04], [0.146, 0.12], [0.156, 0.24], [0.174, 0.36], [0.188, 0.46], [0.19, 0.52], [0.162, 0.56], [0.09, 0.585], [0.0, 0.59]];
export const TORSO_SCALE = { x: 1.22, z: 0.68 };
export function torsoRadius(y, W = 1) {
  const P = TORSO_PROFILE;
  let r = P[0][0];
  for (let i = 1; i < P.length; i++) {
    if (y <= P[i][1]) { const t = (y - P[i - 1][1]) / (P[i][1] - P[i - 1][1]); r = P[i - 1][0] + (P[i][0] - P[i - 1][0]) * Math.max(0, Math.min(1, t)); break; }
    r = P[i][0];
  }
  return { xr: r * TORSO_SCALE.x * W, zr: r * TORSO_SCALE.z * W };
}

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
// Bordüre (Saum, Bündchen, Kragen): Albedo × 0.78 (STIL §8.4)
export const trim = (hex) => darker(hex, 0.78);
// Helligkeit (sRGB-Eindruck) einer Farbe 0…1 – für „helles Haar → dunkle Lidlinie“
export function luma(hex) { const c = new THREE.Color(hex); return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b; }
export const hasDOM = typeof document !== 'undefined';

// Statur (0 schlank … 1 kräftig) → Breitenfaktor; Größe (0 klein … 1 groß) → Gesamtmaßstab
export const buildWidth = (b) => 0.88 + clamp01(b === undefined ? 0.5 : b) * 0.3;
export const heightScale = (h) => 0.93 + clamp01(h === undefined ? 0.5 : h) * 0.14;

// ---- Qualitätsstufe der Figuren (Kontur-Breite, Hülle auf lite-Figuren) ----
let defaultTier = null;
export function setDefaultTier(name) { defaultTier = name || null; }
export function figureTier(opts = {}) {
  const q = opts.quality || defaultTier || (typeof globalThis !== 'undefined' && globalThis.LUMO && globalThis.LUMO.quality && globalThis.LUMO.quality.name) || 'high';
  return q === 'low' || q === 'medium' ? q : 'high';
}
// Hüllenbreite in Pixeln je Stufe und Detail (STIL §4.2 / §13): niedrig nur volle Figuren und nur der Kopf
// (Draw-Call-Budget ≤ 150 für alle Figuren am Hafen, tests/scenarios/figuren.mjs: 6 animierte à 19 + 14 Impostoren à 3)
export const HULL_PX = { low: { full: 1.6, lite: 0, hand: 1.1 }, medium: { full: 1.8, lite: 1.5, hand: 1.2 }, high: { full: 2.0, lite: 1.6, hand: 1.3 } };
// Hüllen je Stufe (§13 Draw-Call-Budget): niedrig nur Kopf, mittel die silhouettenbildenden Teile (Oberarme, Becken und
// Rucksack liegen innerhalb der Silhouette – ihre Kanten fängt die Post-Kontur), hoch alle Teile
export const HULL_PARTS = { low: new Set(['head', 'impostor']), medium: new Set(['head', 'hair', 'hairTail', 'torso', 'thighL', 'thighR', 'shinL', 'shinR', 'foreL', 'foreR', 'impostor']), high: null };
// Jenseits dieses Kamera-Abstands bleiben die Hüllen aus (die Post-Kontur trägt die Silhouette; spart Draw-Calls je Figur)
export const HULL_FAR = { low: 14, medium: 26, high: 40 };

// ---- Toon-Rampe „figur“ (STIL §3.1): 2 Bänder + Kernschatten, Übergänge ±0.03 NdotL (64 Texel, linear gefiltert) ----
// Werte multiplizieren nur das Sonnenlicht; das Hemisphärenlicht füllt den Schatten (kühl oben, warm unten).
let rampTex = null;
export function getFigureRamp() {
  if (rampTex) return rampTex;
  const n = 64, data = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    const ndl = (i / (n - 1)) * 2 - 1;
    const v = ndl < 0.05 ? 0.30 : ndl < 0.32 ? 0.54 : 1.0;
    const b = Math.round(v * 255);
    data[i * 4] = b; data[i * 4 + 1] = b; data[i * 4 + 2] = b; data[i * 4 + 3] = 255;
  }
  rampTex = new THREE.DataTexture(data, n, 1, THREE.RGBAFormat);
  rampTex.minFilter = rampTex.magFilter = THREE.LinearFilter;
  rampTex.generateMipmaps = false;
  rampTex.needsUpdate = true;
  return rampTex;
}

// ---- Shader-Zusatz der Figur: Flächen-Flag, Schattentönung, Kantenlicht ----
export const RIM = { value: 0.35 };                   // Rim-Stärke (STIL §3.3: Figuren 0.35)
export function setFigureRim(v) { RIM.value = Math.max(0, Number(v) || 0); }
const FIG_VERT_PARS = /* glsl */`
#ifndef LUMO_AWIND
#define LUMO_AWIND
attribute float aWind;
#endif
varying float vLumoFlag;`;
const FIG_VERT_MAIN = /* glsl */`
vLumoFlag = aWind;`;
const FIG_FRAG_PARS = /* glsl */`
varying float vLumoFlag;
uniform float uLumoRim;`;
// vor <opaque_fragment>: outgoingLight ist das fertig beleuchtete Ergebnis (Rampe × Sonne + Hemisphäre)
const FIG_FRAG_MAIN = /* glsl */`
{
  float lumoSkin = step(0.5, vLumoFlag) * step(vLumoFlag, 1.5);
  float lumoFlat = step(1.5, vLumoFlag);
  #if NUM_DIR_LIGHTS > 0
    vec3 lumoN = normalize(normal);
    float lumoNdl = dot(lumoN, directionalLights[0].direction);
    vec3 lumoLc = directionalLights[0].color;
    float lumoLi = max(lumoLc.r, max(lumoLc.g, lumoLc.b));
    // Schattenband: kühl getönt (Stoff, Haar), Haut leicht warm-rosa (STIL §3.2, §3.4)
    float lumoShade = 1.0 - smoothstep(0.02, 0.14, lumoNdl);
    vec3 lumoTint = mix(vec3(0.86, 0.92, 1.12), vec3(1.07, 0.93, 0.95), lumoSkin);
    outgoingLight *= mix(vec3(1.0), lumoTint, lumoShade * (1.0 - lumoFlat));
    // Kantenlicht: schmaler Saum, Sonnenseite warm, Schattenseite kühl und schwach
    vec3 lumoV = normalize(vViewPosition);
    float lumoNdv = 1.0 - clamp(dot(lumoN, lumoV), 0.0, 1.0);
    float lumoRimW = smoothstep(0.58, 0.74, lumoNdv) * (1.0 - lumoFlat);
    float lumoSunSide = clamp(lumoNdl * 0.5 + 0.5, 0.0, 1.0);
    vec3 lumoChroma = lumoLc / max(lumoLi, 1e-3);
    float lumoStr = clamp(lumoLi / 2.6, 0.3, 1.0) * uLumoRim;
    outgoingLight += lumoChroma * vec3(1.0, 0.95, 0.82) * lumoRimW * lumoSunSide * lumoStr;
    outgoingLight += vec3(0.62, 0.71, 1.0) * lumoRimW * (1.0 - lumoSunSide) * lumoStr * 0.4;
    // Flache Teile (Augen, Mund): gemalt, folgen nur der Helligkeit der Szene
    float lumoExposure = clamp(lumoLi * 0.26 + 0.28, 0.3, 1.05);
    outgoingLight = mix(outgoingLight, diffuseColor.rgb * lumoExposure, lumoFlat);
  #else
    outgoingLight = mix(outgoingLight, diffuseColor.rgb * 0.9, lumoFlat);
  #endif
}`;
export const FIGURE_SHADER = { vertPars: FIG_VERT_PARS, vertMain: FIG_VERT_MAIN, fragPars: FIG_FRAG_PARS, fragMain: FIG_FRAG_MAIN };

function figureCompile(shader) {
  shader.uniforms.uLumoRim = RIM;
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\n' + FIG_VERT_PARS)
    .replace('#include <begin_vertex>', '#include <begin_vertex>\n' + FIG_VERT_MAIN);
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\n' + FIG_FRAG_PARS)
    .replace('#include <opaque_fragment>', FIG_FRAG_MAIN + '\n#include <opaque_fragment>');
}

// ---- Geteilte Materialien ----
const MATS = new Map();
export function getMaterial(veil) {
  const k = veil ? 'v' : 'n';
  if (!MATS.has(k)) {
    const m = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: getFigureRamp() });
    if (veil) {
      veil.patch(m, {
        key: 'figur',
        uniforms: { uLumoRim: RIM },
        vertex: (src) => src.replace('#include <common>', '#include <common>\n' + FIG_VERT_PARS).replace('#include <begin_vertex>', '#include <begin_vertex>\n' + FIG_VERT_MAIN),
        fragmentPars: FIG_FRAG_PARS,
        beforeVeil: FIG_FRAG_MAIN + '\n',
      });
    } else {
      m.onBeforeCompile = figureCompile;
      m.customProgramCacheKey = () => 'lumo-figur';
    }
    MATS.set(k, m);
  }
  return MATS.get(k);
}

// ---- Kontur-Hülle (STIL §4.1): Rückseiten, Extrusion entlang der Normalen im Bildschirmraum (konstante Pixelbreite) ----
// uLumoOutline: (2/Breite px, 2/Höhe px, Breite in px, Ausblend-Distanz m)
export const OUTLINE = { value: new THREE.Vector4(2 / 1180, 2 / 820, 2, 60) };
const _size = new THREE.Vector2();
// Wird von jeder Hülle vor dem Zeichnen aufgerufen: Zielgröße des aktuellen Renderers (Hauptbild oder Stil-Vorschau)
export function updateOutlineSize(renderer) {
  renderer.getDrawingBufferSize(_size);
  OUTLINE.value.x = 2 / Math.max(1, _size.x);
  OUTLINE.value.y = 2 / Math.max(1, _size.y);
}
const HULL_VERT_COLOR = /* glsl */`
#include <color_vertex>
{
  float lumoL = dot(vColor.rgb, vec3(0.299, 0.587, 0.114));
  vColor.rgb = max(mix(vec3(lumoL), vColor.rgb, 1.2) * 0.38, vec3(0.03));
}`;
// Breite je Vertex: aWind = Flächen-Flag + 0.45·Hüllenfaktor (geo.js fig(), Haarsträhnen 0.5 → dünne Innenlinien)
const HULL_PROJECT = /* glsl */`
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;
{
  vec3 lumoNv = normalMatrix * normal;
  vec2 lumoN2 = lumoNv.xy;
  float lumoLen = length(lumoN2);
  lumoN2 = lumoLen > 1e-5 ? lumoN2 / lumoLen : vec2(0.0);
  float lumoDist = -mvPosition.z;
  float lumoK = clamp(fract(aWind + 0.001) / 0.45, 0.0, 1.0);
  float lumoW = uLumoWidth * lumoK * (1.0 - smoothstep(uLumoOutline.w * 0.6, uLumoOutline.w, lumoDist));
  gl_Position.xy += lumoN2 * uLumoOutline.xy * lumoW * gl_Position.w;
}`;
export function getOutlineMaterial(veil, px = 2) {
  const k = 'hull' + (veil ? 'v' : 'n') + px;
  if (!MATS.has(k)) {
    const m = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
    const width = { value: px };
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uLumoOutline = OUTLINE;
      shader.uniforms.uLumoWidth = width;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform vec4 uLumoOutline;\nuniform float uLumoWidth;\n#ifndef LUMO_AWIND\n#define LUMO_AWIND\nattribute float aWind;\n#endif')
        .replace('#include <color_vertex>', HULL_VERT_COLOR)
        .replace('#include <project_vertex>', HULL_PROJECT);
    };
    m.userData.__lumoKey = k;
    if (veil) veil.patch(m, { key: k }); else m.customProgramCacheKey = () => k;
    m.userData.width = width;
    MATS.set(k, m);
  }
  return MATS.get(k);
}
// Hülle an ein Teil hängen (gleiche Geometrie, kein Speicher-Doppel). Rückgabe: Hüllen-Mesh (Kind des Teils).
// Die Hülle wird wie ihr Teil im Sichtkegel geprüft (gleiche Geometrie, gleiche Lage) – Figuren außerhalb des Bildes
// kosten keine Hüllen-Draw-Calls.
export function attachHull(mesh, mat) {
  if (!mesh || mesh.userData.hull) return mesh && mesh.userData.hull;
  const hull = new THREE.Mesh(mesh.geometry, mat);
  hull.name = 'hull';
  hull.castShadow = false; hull.receiveShadow = false;
  hull.onBeforeRender = onHullRender;
  mesh.add(hull);
  mesh.userData.hull = hull;
  return hull;
}
// Hülle wieder abnehmen (Qualitätswechsel)
export function detachHull(mesh) {
  const hull = mesh && mesh.userData.hull;
  if (!hull) return;
  mesh.remove(hull);
  delete mesh.userData.hull;
}
function onHullRender(renderer) { updateOutlineSize(renderer); }

// ---- Glas (Brillen): Fresnel-Rand hell, Fläche 35 % (STIL §3.4) ----
export function getGlassMaterial() {
  if (!MATS.has('glass')) {
    const m = new THREE.ShaderMaterial({
      vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      vertexShader: /* glsl */`
        varying vec3 vN; varying vec3 vV; varying vec3 vC;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vC = color;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */`
        varying vec3 vN; varying vec3 vV; varying vec3 vC;
        void main() {
          float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
          vec3 col = mix(vC, vec3(0.87, 0.95, 1.0), f);
          gl_FragColor = vec4(col, 0.35 + f * 0.6);
        }`,
    });
    MATS.set('glass', m);
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
export function quatToNormal(nx, ny, nz, out = new THREE.Quaternion()) {
  _n.set(nx, ny, nz).normalize();
  return out.setFromUnitVectors(_z, _n);
}
