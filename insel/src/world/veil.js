// Grauschleier (WP10): entsättigt Zonen und Flecken per Shader, Farbwelle beim Befreien (auch Teilwellen),
// blaugraue Rückfall-Welle nach innen, weiche Übergänge bei Teilwerten. 12 Slots: 8 Zonen + 4 Flecken (Mangrove,
// Glimmer, Quellen, Rückfall …). Die CPU-Funktion amountAt() rechnet exakt die Shader-Formel nach.
// Außerdem: gemeinsamer Material-Patch (Schleier + richtungsabhängiger Nebel + Farbkorrektur) für alle Welt-Materialien.
//   veil.setZone(id, amount, { seconds })      Zone sofort oder weich auf einen Wert (0 = farbig, 1 = grau)
//   veil.addPatch({ id, x, z, r, veil })       Fleck (überstimmt seine Zone) · setPatch(id, amount, { seconds }) · removePatch(id)
//   veil.restoreZone(id, { x, z, amount = 0, duration, onDone })   Farbwelle nach außen bis zum Zielwert (Teil-Farbwelle)
//   veil.relapse(id, { to = 1, duration, onDone })                 Rückfall: blaugraue Welle vom Rand nach innen
//   veil.amountAt(x, z) · isVeiled(id) · getState() (Zonen flach) · getFullState() ({ zones, patches }) · setState(flach | voll)
//   veil.patch(material, { veil: true, key: 'meinprop' })          Material mit Schleier/Nebel/Farbkorrektur
// Eigene ShaderMaterials: veil.glsl einbinden, veil.uniforms übernehmen, am Ende lumoGrade(lumoFog(...)).
// Ereignisse: veil:restore:start {id, x, z, maxR, duration, to} · veil:restored {id, to} · veil:relapse:start {id, x, z, maxR, duration, to}
//   · veil:relapsed {id, to} · veil:patch {id, action:'add'|'remove'}
import * as THREE from 'three';
import { ZONES, ZONE_INDEX } from './island.js';

export const MAX_ZONES = 12;        // Slots im Shader
export const NUM_ZONES = 8;         // Slots 0–7: Zonen (island.ZONES), 8–11: Flecken
export const MAX_PATCHES = MAX_ZONES - NUM_ZONES;
export const WAVE_FRONT = 7.0;      // Breite der Wellenfront (m)
export const RING_WIDTH = 4.5;      // Breite des Regenbogenrings (m)

// ---- Reine Formel (CPU), identisch zum GLSL unten ----
export const smoothstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;
export const zoneWeight = (z, x, zz) => 1 - smoothstep(z.r * 0.72, z.r * 1.18, Math.hypot(x - z.x, zz - z.z));
export const patchWeight = (z, x, zz) => 1 - smoothstep(z.r * 0.55, z.r, Math.hypot(x - z.x, zz - z.z));
// Anteil „von der Welle schon erreicht“ an einem Punkt: nach außen laufend innen 1, nach innen laufend außen 1
export function waveInside(wave, x, z) {
  const dw = Math.hypot(x - wave.x, z - wave.z);
  return wave.dir > 0 ? 1 - smoothstep(wave.radius - WAVE_FRONT, wave.radius, dw) : smoothstep(wave.radius, wave.radius + WAVE_FRONT, dw);
}
/**
 * Schleierwert am Punkt. slots: [{x,z,r,veil}] (Länge MAX_ZONES, r<=0 = leer), base, wave: {index,x,z,radius,dir,from,to}|null
 */
export function veilFormula(slots, base, wave, x, z, strength = 1) {
  let cov = 0, acc = 0, wsum = 0;
  const valueOf = (k, v) => (wave && wave.index === k && wave.radius >= 0 ? mix(wave.from, wave.to, waveInside(wave, x, z)) : v);
  for (let k = 0; k < NUM_ZONES; k++) {
    const s = slots[k];
    if (!s || s.r <= 0) continue;
    const w = zoneWeight(s, x, z);
    acc += w * valueOf(k, s.veil); wsum += w; cov = Math.max(cov, w);
  }
  let amt = mix(base, wsum > 0 ? acc / wsum : 0, cov);
  for (let k = NUM_ZONES; k < MAX_ZONES; k++) {
    const s = slots[k];
    if (!s || s.r <= 0) continue;
    amt = mix(amt, valueOf(k, s.veil), patchWeight(s, x, z));
  }
  return amt * strength;
}

// ---- Rampen-Klassen der Stil-Bibel §3.1 (Schwellen auf N·L, Faktor des Sonnenanteils im Halbton, Übergangsbreite, Rim) ----
// t1/t2 = Schwellen Licht/Halbton bzw. Halbton/Schatten, mid = Sonnenanteil im Halbton (Schatten = nur Hemisphärenlicht),
// soft = Übergangsbreite, rim = Kantenlicht-Stärke, trans = Transluzenz (Laub im Gegenlicht), fogCap = Nebel-Deckel (Silhouetten)
export const RAMPS = {
  props:   { t1: 0.55, t2: 0.18, mid: 0.45, soft: 0.04, rim: 0.18 },
  figur:   { t1: 0.32, t2: 0.05, mid: 0.40, soft: 0.03, rim: 0.35 },
  laub:    { t1: 0.35, t2: 0.02, mid: 0.30, soft: 0.06, rim: 0.14, trans: 1 },
  terrain: { t1: 0.60, t2: 0.22, mid: 0.50, soft: 0.10, rim: 0.0 },
  fels:    { t1: 0.55, t2: 0.18, mid: 0.45, soft: 0.04, rim: 0.10 },
  wolke:   { t1: 0.35, t2: 0.02, mid: 0.25, soft: 0.08, rim: 0.25, fogCap: 0.55 },
  glow:    { t1: -1.0, t2: -1.0, mid: 1.0, soft: 0.02, rim: 0.0 },   // leuchtend: keine Rampe, kein Rim
};
// Standard-Klasse nach dem Material-Schlüssel (Figuren, Terrain, Vegetation … ohne dass deren Module etwas ändern müssen)
export function rampForKey(key = '') {
  if (key === 'human' || key.startsWith('figur')) return 'figur';
  if (key === 'terrain') return 'terrain';
  if (key.startsWith('veg') || key.startsWith('wind')) return 'laub';
  if (key === 'wolke' || key === 'sturm' || key === 'smoke' || key === 'pcloud') return 'wolke';
  if (key.startsWith('pglow') || key.startsWith('rune') || key.startsWith('climbglow') || key.endsWith('-g')) return 'glow';
  return 'props';
}

// GLSL: Uniforms + Funktionen (auch für eigene ShaderMaterials nutzbar: veil.glsl)
export const VEIL_GLSL = /* glsl */`
uniform vec4 uVeilZones[${MAX_ZONES}];
uniform float uVeilBase;
uniform vec4 uVeilWave;
uniform vec4 uVeilWave2;
uniform float uVeilStrength;
uniform float uLumoTime;
uniform vec3 uVeilHaze;
uniform vec3 uVeilFogColor;
uniform vec3 uFogSunColor;
uniform vec3 uFogSunDir;
uniform float uFogSunAmt;
uniform vec3 uFogNearColor;
uniform float uFogMax;
uniform float uFogHeight;
uniform float uAerial;
uniform float uLumoPost;
uniform vec3 uGradeLift;
uniform vec3 uGradeGain;
uniform float uGradeSat;
uniform float uGradeContrast;
uniform vec3 uShadowTint;
uniform vec3 uRimWarm;
uniform vec3 uRimCool;
uniform float uRimGlobal;
uniform vec3 uSunDirView;
uniform vec3 uSunColorLin;
float gLumoVeil = 0.0;
float gLumoRing = 0.0;
float gLumoInside = 0.0;
float gLumoShadow = 1.0;
float gLumoWorldY = 100.0;
// linear → Ausgaberaum (sRGB), für Nebelfarben beim Direkt-Rendern ohne Post-Stack
vec3 lumoToOut(vec3 c) {
  c = max(c, vec3(0.0));
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}
// Toon-Rampe: N·L → Sonnenanteil (1 Licht · mid Halbton · 0 Schatten = nur Hemisphärenlicht), weiche Kanten
float lumoBand(float ndl, vec4 ramp, float soft) {
  float hi = smoothstep(ramp.x - soft, ramp.x + soft, ndl);
  float md = smoothstep(ramp.y - soft, ramp.y + soft, ndl);
  return mix(md * ramp.z, 1.0, hi);
}
// Wellenwert für Slot k (uVeilWave: x, z, Radius, Slot · uVeilWave2: von, nach, Richtung ±1, Art 0 Farbwelle / 1 Rückfall)
float lumoWaveValue(int k, float v, vec2 p, float w) {
  if (uVeilWave.z < 0.0 || abs(float(k) - uVeilWave.w) > 0.5) return v;
  float dw = distance(p, uVeilWave.xy);
  float R = uVeilWave.z;
  float ins = uVeilWave2.z > 0.0 ? 1.0 - smoothstep(R - ${WAVE_FRONT.toFixed(1)}, R, dw) : smoothstep(R, R + ${WAVE_FRONT.toFixed(1)}, dw);
  gLumoInside = max(gLumoInside, ins * w);
  float rr = (dw - R) / ${RING_WIDTH.toFixed(1)};
  gLumoRing = max(gLumoRing, max(w, 0.35) * exp(-rr * rr));
  return mix(uVeilWave2.x, uVeilWave2.y, ins);
}
float lumoVeilAmount(vec3 p) {
  float cov = 0.0, acc = 0.0, wsum = 0.0;
  gLumoRing = 0.0; gLumoInside = 0.0;
  for (int k = 0; k < ${NUM_ZONES}; k++) {
    vec4 z = uVeilZones[k];
    if (z.z <= 0.0) continue;
    float w = 1.0 - smoothstep(z.z * 0.72, z.z * 1.18, distance(p.xz, z.xy));
    float v = lumoWaveValue(k, z.w, p.xz, w);
    acc += w * v; wsum += w; cov = max(cov, w);
  }
  float amt = mix(uVeilBase, wsum > 0.0 ? acc / wsum : 0.0, cov);
  for (int k = ${NUM_ZONES}; k < ${MAX_ZONES}; k++) {
    vec4 z = uVeilZones[k];
    if (z.z <= 0.0) continue;
    float w = 1.0 - smoothstep(z.z * 0.55, z.z, distance(p.xz, z.xy));
    float v = lumoWaveValue(k, z.w, p.xz, w);
    amt = mix(amt, v, w);
  }
  return amt * uVeilStrength;
}
vec3 lumoApplyVeil(vec3 col, vec3 p) {
  float v = lumoVeilAmount(p);
  gLumoVeil = v;
  gLumoWorldY = p.y;
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  // „Verflucht“, nicht „unfertig“: kaltes Duotone (Schatten #2E2A44 · Mitten #7A7691 · Lichter #C9C4D8, Stil-Bibel §2.4),
  // Kontrast × 0.85, träge wandernde Schlieren. Rechnung wahrnehmungsnah (Gamma), Farben linear.
  float lp = pow(max(l, 0.0), 0.4545);
  lp = clamp((lp - 0.5) * 0.85 + 0.5, 0.0, 1.0);
  float drift = 0.93 + 0.07 * sin(p.x * 0.11 + uLumoTime * 0.25) * sin(p.z * 0.09 - uLumoTime * 0.19 + p.y * 0.2);
  vec3 duo = lp < 0.5
    ? mix(vec3(0.0273, 0.0232, 0.0578), vec3(0.1946, 0.1812, 0.2831), lp * 2.0)
    : mix(vec3(0.1946, 0.1812, 0.2831), vec3(0.5841, 0.5520, 0.6867), (lp - 0.5) * 2.0);
  duo *= drift;
  col = mix(col, duo, clamp(v * 0.94, 0.0, 1.0));
  if (gLumoRing > 0.002) {
    float r = clamp(gLumoRing, 0.0, 1.0);
    if (uVeilWave2.w < 0.5) {
      // Farbwelle: breiter Regenbogenring mit hellem Vorderrand
      float a = atan(p.z - uVeilWave.y, p.x - uVeilWave.x);
      vec3 rb = 0.5 + 0.5 * cos(6.2831 * (a / 6.2831 * 3.0 + uLumoTime * 0.6 + vec3(0.0, 0.33, 0.67)));
      rb = rb * rb;
      col = mix(col, col * 0.5 + rb * 1.7 + 0.1, r * 0.9);
      col += vec3(1.0, 0.98, 0.9) * pow(r, 6.0) * 0.9;
    } else {
      // Rückfall: kalte, blaugraue Front mit dunklem Saum und Flackern
      float flick = 0.8 + 0.2 * sin(uLumoTime * 7.0 + p.x * 0.5 + p.z * 0.4);
      col = mix(col, vec3(0.42, 0.47, 0.66) * flick, r * 0.85);
      col = mix(col, vec3(0.16, 0.14, 0.24), pow(r, 5.0) * 0.8);
    }
  }
  // frisch befreite Fläche leuchtet kurz nach (innerhalb der Farbwelle)
  if (uVeilWave2.w < 0.5) col += col * gLumoInside * 0.25 * clamp(1.0 - (uVeilWave.z - distance(p.xz, uVeilWave.xy)) / 14.0, 0.0, 1.0);
  return col;
}
// Luftperspektive statt Nebelwand (Stil-Bibel §5.3): Dunst nah → fern (Uniform → Szenen-Nebelfarbe), Sonnenstreuung,
// Höhennebel unter 3 m, Ferne entsättigt; Nebel gedeckelt (uFogMax), damit Landmarken als Silhouette lesbar bleiben.
// Farben kommen linear an; ohne Post-Stack (Direkt-Rendern im sRGB-Ausgaberaum) werden sie hier umgerechnet.
vec3 lumoFog(vec3 col, float depth, vec3 viewPos, vec3 fogCol, float fogNear, float fogFar) {
  float f = smoothstep(fogNear, fogFar, depth);
  f = max(f, uFogHeight * smoothstep(3.0, -1.0, gLumoWorldY) * smoothstep(4.0, 30.0, depth));
  vec3 dir = normalize(viewPos);
  float s = max(dot(dir, uFogSunDir), 0.0);
  vec3 fc = mix(uFogNearColor, fogCol, f);
  fc = mix(fc, uFogSunColor, pow(s, 4.0) * uFogSunAmt * (0.35 + 0.65 * f));
  float veilF = gLumoVeil * smoothstep(5.0, 40.0, depth);
  f = max(f, veilF * 0.34);
  fc = mix(fc, uVeilFogColor, veilF * 0.5);
  if (uLumoPost < 0.5) fc = lumoToOut(fc);
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, vec3(l), f * uAerial * 0.35);
  return mix(col, fc, min(f, uFogMax));
}
// Farbkorrektur (nach Tone-Mapping, im sRGB-Ausgaberaum): Sättigung, Kontrast, warme Lichter / kühle Schatten.
// Mit Post-Stack (uLumoPost = 1) übernimmt der Grade-Pass dieselbe Formel für das ganze Bild (auch Sprites/Partikel).
vec3 lumoGrade(vec3 c) {
  if (uLumoPost > 0.5) return c;
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, uGradeSat);
  c = (c - 0.5) * uGradeContrast + 0.5;
  c = c * uGradeGain + uGradeLift * (1.0 - l);
  return clamp(c, 0.0, 1.0);
}
`;

const FOG_FRAG = /* glsl */`
  gLumoWorldY = vVeilPos.y;
#ifdef USE_FOG
  gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
#endif
  gl_FragColor.rgb = lumoGrade(gl_FragColor.rgb);
`;

// Toon-Beleuchtung (Stil-Bibel §3): ersetzt das Lambert-Direktlicht durch die Rampe. Der Schattenwurf wird vorher
// aus directLight.color herausgehalten (gLumoShadow) und multipliziert nur den Sonnenanteil – „kein Schatten im Schatten“,
// die Schattenfarbe kommt allein vom Hemisphärenlicht (Himmel oben kühl, Boden unten warm).
const LUMO_LAMBERT_PARS = /* glsl */`
varying vec3 vViewPosition;
uniform vec4 uRamp;
uniform float uRampSoft;
struct LambertMaterial {
  vec3 diffuseColor;
  float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
  float dotNL = dot( geometryNormal, directLight.direction );
  float sh = smoothstep( 0.18, 0.62, gLumoShadow );
  gLumoShadow = 1.0;
  float band = lumoBand( dotNL, uRamp, uRampSoft ) * sh;
  reflectedLight.directDiffuse += band * directLight.color * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`;
// MeshToonMaterial (Figuren mit eigener Rampe): behält seine Verlaufs-Rampe, der Schattenwurf kommt aus gLumoShadow
const LUMO_TOON_PARS = /* glsl */`
varying vec3 vViewPosition;
struct ToonMaterial {
  vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
  float sh = smoothstep( 0.18, 0.62, gLumoShadow );
  gLumoShadow = 1.0;
  vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color * sh;
  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`;
// Kantenlicht (§3.3) und Laub-Transluzenz (§3.4) nach der Lichtsumme; im Schleier kühl und schwach, nachts Mondfarbe
const LUMO_RIM = /* glsl */`
{
  vec3 lumoV = normalize( vViewPosition );
  float lumoNdv = 1.0 - saturate( dot( normal, lumoV ) );
  float lumoRimW = smoothstep( 0.58, 0.74, lumoNdv );
  float lumoSunSide = saturate( dot( normal, uSunDirView ) * 0.5 + 0.5 );
  vec3 lumoRim = ( uRimWarm * lumoSunSide + uRimCool * ( 1.0 - lumoSunSide ) * 0.4 ) * lumoRimW * uRimStrength * uRimGlobal;
  reflectedLight.directDiffuse += lumoRim * ( 0.35 + 0.65 * diffuseColor.rgb );
  #ifdef LUMO_TRANS
    float lumoTr = pow( saturate( dot( -lumoV, uSunDirView ) ), 3.0 ) * uTrans * vLumoLeaf;
    reflectedLight.directDiffuse += diffuseColor.rgb * uSunColorLin * 0.28 * lumoTr;
  #endif
}
`;

export function createVeil({ events, audio, zones: zoneDefs = ZONES } = {}) {
  // Slots 0..7 Zonen, 8..11 Flecken. veil = aktueller Wert, target/speed = weicher Übergang
  const slots = [];
  for (let i = 0; i < MAX_ZONES; i++) slots.push({ id: null, x: 0, z: 0, r: 0, veil: 0, target: null, rate: 0, patch: i >= NUM_ZONES });
  zoneDefs.slice(0, NUM_ZONES).forEach((z, i) => { Object.assign(slots[i], { id: z.id, x: z.x, z: z.z, r: z.r, veil: z.id === 'hafen' ? 0 : 1 }); });
  const zones = slots.slice(0, NUM_ZONES).filter((s) => s.id);
  const zoneIndex = Object.fromEntries(zones.map((z, i) => [z.id, i]));
  const zoneVecs = [];
  for (let i = 0; i < MAX_ZONES; i++) zoneVecs.push(new THREE.Vector4(0, 0, 0, 0));
  const uniforms = {
    uVeilZones: { value: zoneVecs },
    uVeilBase: { value: 0.55 },
    uVeilWave: { value: new THREE.Vector4(0, 0, -1, -1) },
    uVeilWave2: { value: new THREE.Vector4(1, 0, 1, 0) },
    uVeilStrength: { value: 1 },
    uLumoTime: { value: 0 },
    uVeilHaze: { value: new THREE.Color('#8f86b8') },
    uVeilFogColor: { value: new THREE.Color('#8f8aa8') },   // Nebel im Schleier (linear, Stil-Bibel §2.4)
    uFogSunColor: { value: new THREE.Color('#ffb070') },    // Sonnenstreuung im Dunst (linear, setzt der Himmel)
    uFogSunDir: { value: new THREE.Vector3(0, 0, -1) },
    uFogSunAmt: { value: 0.8 },
    uFogNearColor: { value: new THREE.Color('#dcebf6') },   // Dunst nah (fern = scene.fog.color)
    uFogMax: { value: 0.86 },                                // Nebel-Deckel: Silhouetten bleiben lesbar (§5.3)
    uFogHeight: { value: 0.12 },                             // Höhennebel unter 3 m
    uAerial: { value: 1 },                                   // Ferne entsättigt
    uLumoPost: { value: 0 },                                 // 1 = Post-Stack aktiv (Grade im Pass, Nebel linear)
    // Farbkorrektur (wird vom Himmel je nach Tageszeit gesetzt)
    uGradeLift: { value: new THREE.Vector3(0, 0, 0) },
    uGradeGain: { value: new THREE.Vector3(1, 1, 1) },
    uGradeSat: { value: 1 },
    uGradeContrast: { value: 1 },
    // Toon-Licht (§3.2/§3.3): Schattentönung, Kantenlicht warm/kühl, Sonne im Sichtraum
    uShadowTint: { value: new THREE.Color('#6e86c8') },
    uRimWarm: { value: new THREE.Color('#fff1c8') },
    uRimCool: { value: new THREE.Color('#9fb4ff') },
    uRimGlobal: { value: 1 },
    uSunDirView: { value: new THREE.Vector3(0, 1, 0) },
    uSunColorLin: { value: new THREE.Color('#fff4dc') },
  };
  let base = 0.55;
  let baseOverride = null;   // Innenräume (WP18): Schleierwert außerhalb aller Zonen, z. B. graue Hafengrotte
  let wave = null; // { index, id, x, z, radius, maxR, t, duration, dir, from, to, kind:'welle'|'rueckfall', onDone }

  const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));
  function sync() {
    for (let i = 0; i < MAX_ZONES; i++) { const s = slots[i]; zoneVecs[i].set(s.x, s.z, s.r, s.veil); }
  }
  function baseTarget() {
    if (!zones.length) return 0;
    const m = zones.reduce((s, z) => s + z.veil, 0) / zones.length;
    return 0.32 * m;
  }
  sync();
  base = baseTarget();
  uniforms.uVeilBase.value = base;

  function slotOf(id) {
    if (zoneIndex[id] !== undefined) return zoneIndex[id];
    for (let i = NUM_ZONES; i < MAX_ZONES; i++) if (slots[i].id === id) return i;
    return -1;
  }
  function setValue(index, amount, opts = {}) {
    const s = slots[index];
    const a = clamp01(amount);
    const seconds = opts.seconds || opts.duration || 0;
    if (seconds > 0.01) { s.target = a; s.rate = Math.abs(a - s.veil) / seconds; }
    else { s.veil = a; s.target = null; sync(); }
    return a;
  }
  function startWave(index, { x, z, from, to, dir, kind, duration, onDone, maxR }) {
    if (wave) finishWave();
    const s = slots[index];
    const cx = x !== undefined ? x : s.x, cz = z !== undefined ? z : s.z;
    const R = maxR !== undefined ? maxR : Math.hypot(cx - s.x, cz - s.z) + s.r * 1.35;
    s.target = null;   // ein laufender Übergang wird von der Welle übernommen
    wave = { index, id: s.id, x: cx, z: cz, radius: dir > 0 ? 0 : R, maxR: R, t: 0, duration: duration || (dir > 0 ? 4.6 : 5.2), dir, from: from !== undefined ? clamp01(from) : s.veil, to: clamp01(to), kind, onDone };
    uniforms.uVeilWave.value.set(cx, cz, wave.radius, index);
    uniforms.uVeilWave2.value.set(wave.from, wave.to, dir, kind === 'rueckfall' ? 1 : 0);
    return wave;
  }
  function finishWave() {
    const w = wave;
    wave = null;
    slots[w.index].veil = w.to;
    slots[w.index].target = null;
    sync();
    uniforms.uVeilWave.value.set(0, 0, -1, -1);
    if (events) events.emit(w.kind === 'rueckfall' ? 'veil:relapsed' : 'veil:restored', { id: w.id, to: w.to });
    if (w.onDone) w.onDone();
  }
  function currentWave() {
    return wave ? { index: wave.index, x: wave.x, z: wave.z, radius: wave.radius, dir: wave.dir, from: wave.from, to: wave.to } : null;
  }

  // Material patchen (onBeforeCompile wird verkettet). Neben Schleier/Nebel/Farbkorrektur bekommt jedes beleuchtete
  // Material (Lambert) die Toon-Rampe, Schattentönung und das Kantenlicht (Stil-Bibel §3):
  //   opts.ramp   'props' | 'figur' | 'laub' | 'terrain' | 'fels' | 'wolke' | 'glow' | { t1, t2, mid, soft, rim, trans, fogCap }
  //               (Standard nach opts.key, siehe rampForKey) · opts.rim überschreibt die Rim-Stärke
  //   opts.fogCap 0..1 Nebel-Deckel (Landmarken-Silhouetten) · opts.trans Laub-Transluzenz (Attribut aLeaf)
  // Die Rampen-Uniforms hängen am Material (material.userData.lumo), damit man sie zur Laufzeit anpassen kann.
  function patch(material, opts = {}) {
    const veilOn = opts.veil !== false;
    const prev = material.onBeforeCompile;
    const prevKey = material.customProgramCacheKey && material.userData.__lumoKey ? material.userData.__lumoKey : '';
    const rampDef = typeof opts.ramp === 'object' && opts.ramp ? { ...RAMPS.props, ...opts.ramp } : (RAMPS[opts.ramp] || RAMPS[rampForKey(opts.key || '')]);
    const lumo = material.userData.lumo || {
      uRamp: { value: new THREE.Vector4() }, uRampSoft: { value: 0.04 }, uRimStrength: { value: 0 }, uTrans: { value: 0 }, uFogCap: { value: 1 },
    };
    lumo.uRamp.value.set(rampDef.t1, rampDef.t2, rampDef.mid, 0);
    lumo.uRampSoft.value = rampDef.soft;
    lumo.uRimStrength.value = opts.rim !== undefined ? opts.rim : rampDef.rim;
    lumo.uTrans.value = opts.trans !== undefined ? opts.trans : (rampDef.trans || 0);
    lumo.uFogCap.value = opts.fogCap !== undefined ? opts.fogCap : (rampDef.fogCap !== undefined ? rampDef.fogCap : 1);
    material.userData.lumo = lumo;
    const trans = lumo.uTrans.value > 0;
    // Toon-Materialien (Figuren) bringen ihre eigene Rampe und ihr eigenes Kantenlicht mit
    const isToon = !!material.isMeshToonMaterial;
    const withRim = !isToon || opts.rim !== undefined;
    material.onBeforeCompile = (shader, renderer) => {
      if (prev && prev !== THREE.Material.prototype.onBeforeCompile) prev.call(material, shader, renderer);
      Object.assign(shader.uniforms, uniforms, lumo);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vVeilPos;\nvarying vec3 vFogView;' + (trans ? '\nattribute float aLeaf;\nvarying float vLumoLeaf;' : ''))
        .replace('#include <fog_vertex>', `#include <fog_vertex>
  vec4 lumoWP = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    lumoWP = instanceMatrix * lumoWP;
  #endif
  lumoWP = modelMatrix * lumoWP;
  vVeilPos = lumoWP.xyz;
  vFogView = mvPosition.xyz;` + (trans ? '\n  vLumoLeaf = aLeaf;' : ''));
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vVeilPos;\nvarying vec3 vFogView;\nuniform float uRimStrength;\nuniform float uTrans;\nuniform float uFogCap;\n' + (trans ? '#define LUMO_TRANS\nvarying float vLumoLeaf;\n' : '') + VEIL_GLSL + (opts.fragmentPars || ''))
        .replace('#include <lights_lambert_pars_fragment>', LUMO_LAMBERT_PARS)
        .replace('#include <lights_toon_pars_fragment>', LUMO_TOON_PARS)
        .replace(/directLight\.color \*= \( directLight\.visible && receiveShadow \) \? getShadow\(/g, 'gLumoShadow *= ( directLight.visible && receiveShadow ) ? getShadow(')
        .replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\n' + (withRim ? LUMO_RIM : ''))
        .replace('#include <opaque_fragment>', (opts.beforeVeil || '') + (veilOn ? 'outgoingLight = lumoApplyVeil(outgoingLight, vVeilPos);\n' : '') + (opts.afterVeil || '') + '#include <opaque_fragment>')
        .replace('#include <fog_fragment>', FOG_FRAG.replace('min(f, uFogMax)', 'min(f, uFogMax * uFogCap)'));
      // Nebel-Deckel je Material (Silhouetten) – lumoFog selbst deckelt mit uFogMax
      shader.fragmentShader = shader.fragmentShader.replace('return mix(col, fc, min(f, uFogMax));', 'return mix(col, fc, min(f, uFogMax * uFogCap));');
      if (opts.uniforms) Object.assign(shader.uniforms, opts.uniforms);
      if (opts.vertex) shader.vertexShader = opts.vertex(shader.vertexShader);
      if (opts.fragment) shader.fragmentShader = opts.fragment(shader.fragmentShader);
    };
    const key = prevKey + '|lumo' + (veilOn ? 'V' : 'n') + (trans ? 'T' : '') + (opts.key || '');
    material.userData.__lumoKey = key;
    material.customProgramCacheKey = () => key;
    material.needsUpdate = true;
    return material;
  }

  const veil = {
    uniforms,
    glsl: VEIL_GLSL,
    zones,
    slots,
    patch,
    get patches() { return slots.slice(NUM_ZONES).filter((s) => s.id); },
    // Farbkorrektur setzen: { lift:[r,g,b], gain:[r,g,b], sat, contrast }
    setGrade({ lift, gain, sat, contrast } = {}) {
      if (lift) uniforms.uGradeLift.value.set(lift[0], lift[1], lift[2]);
      if (gain) uniforms.uGradeGain.value.set(gain[0], gain[1], gain[2]);
      if (sat !== undefined) uniforms.uGradeSat.value = sat;
      if (contrast !== undefined) uniforms.uGradeContrast.value = contrast;
    },
    // Zone setzen (0 = farbig, 1 = grau); { seconds } = weicher Übergang
    setZone(id, amount, opts) {
      const i = zoneIndex[id];
      if (i === undefined) return false;
      setValue(i, amount, opts);
      return true;
    },
    veilZone(id) { veil.setZone(id, 1); },
    zoneValue(id) { const i = slotOf(id); return i < 0 ? null : slots[i].veil; },
    isVeiled(id) { const i = slotOf(id); return i >= 0 && slots[i].veil > 0.5; },
    // ---- Flecken (Slots 8–11): überstimmen ihre Zone ----
    addPatch({ id, x, z, r, veil: amount = 1, seconds } = {}) {
      if (!id || !(r > 0)) return null;
      let i = slotOf(id);
      if (i >= 0 && i < NUM_ZONES) return null;                       // Zonen-ID
      if (i < 0) { i = slots.findIndex((s, k) => k >= NUM_ZONES && !s.id); if (i < 0) return null; }
      const s = slots[i];
      const fresh = !s.id;
      Object.assign(s, { id, x, z, r, target: null });
      if (fresh || !seconds) s.veil = clamp01(amount); else setValue(i, amount, { seconds });
      sync();
      if (events && fresh) events.emit('veil:patch', { id, action: 'add' });
      return s;
    },
    setPatch(id, amount, opts) {
      const i = slotOf(id);
      if (i < NUM_ZONES) return false;
      setValue(i, amount, opts);
      return true;
    },
    removePatch(id) {
      const i = slotOf(id);
      if (i < NUM_ZONES) return false;
      if (wave && wave.index === i) { wave = null; uniforms.uVeilWave.value.set(0, 0, -1, -1); }
      Object.assign(slots[i], { id: null, x: 0, z: 0, r: 0, veil: 0, target: null });
      sync();
      if (events) events.emit('veil:patch', { id, action: 'remove' });
      return true;
    },
    getPatch(id) { const i = slotOf(id); return i >= NUM_ZONES ? slots[i] : null; },
    patchAt(x, z) { let best = null; for (let i = NUM_ZONES; i < MAX_ZONES; i++) { const s = slots[i]; if (s.id && Math.hypot(x - s.x, z - s.z) <= s.r) best = s; } return best; },
    amountAt(x, z) {
      // CPU-Nachbau der Shader-Formel (inkl. laufender Welle)
      return veilFormula(slots, base, currentWave(), x, z, uniforms.uVeilStrength.value);
    },
    // Farbwelle: breitet sich vom Punkt aus und befreit Zone oder Fleck bis zum Zielwert (amount, Standard 0)
    restoreZone(id, opts = {}) {
      const index = slotOf(id);
      if (index < 0) return false;
      const to = opts.amount !== undefined ? opts.amount : (opts.to !== undefined ? opts.to : 0);
      const w = startWave(index, { x: opts.x, z: opts.z, to, from: opts.from, dir: 1, kind: 'welle', duration: opts.duration, onDone: opts.onDone });
      if (audio && opts.sound !== false) audio.play('restore');
      if (events) events.emit('veil:restore:start', { id, x: w.x, z: w.z, maxR: w.maxR, duration: w.duration, to: w.to, from: w.from });
      return true;
    },
    // Schleier-Rückfall: kalte Welle vom Rand nach innen, der Ort wird wieder grau (to, Standard 1)
    relapse(id, opts = {}) {
      const index = slotOf(id);
      if (index < 0) return false;
      const to = opts.to !== undefined ? opts.to : (opts.amount !== undefined ? opts.amount : 1);
      const w = startWave(index, { x: opts.x, z: opts.z, to, from: opts.from, dir: -1, kind: 'rueckfall', duration: opts.duration, onDone: opts.onDone });
      if (audio && opts.sound !== false && audio.has && audio.has('rueckfall')) audio.play('rueckfall');
      if (events) events.emit('veil:relapse:start', { id, x: w.x, z: w.z, maxR: w.maxR, duration: w.duration, to: w.to, from: w.from });
      return true;
    },
    // Ganze Insel befreien (Finale)
    restoreAll() { for (const s of slots) if (s.id) { s.veil = 0; s.target = null; } sync(); },
    // Grundwert außerhalb aller Zonen festlegen (Innenräume liegen in einer Tasche ohne Zone); null = automatisch
    setBaseOverride(v) { baseOverride = v === null || v === undefined ? null : clamp01(v); if (baseOverride !== null) { base = baseOverride; uniforms.uVeilBase.value = base; } },
    get baseValue() { return base; },
    get waveActive() { return !!wave; },
    get wave() { return wave; },
    getState() { return Object.fromEntries(zones.map((z) => [z.id, +z.veil.toFixed(4)])); },
    getFullState() {
      return {
        zones: veil.getState(),
        patches: Object.fromEntries(veil.patches.map((p) => [p.id, { x: p.x, z: p.z, r: p.r, veil: +p.veil.toFixed(4) }])),
      };
    },
    setState(s) {
      if (!s) return;
      const zs = s.zones && typeof s.zones === 'object' ? s.zones : s;
      zones.forEach((z) => { if (typeof zs[z.id] === 'number') { z.veil = clamp01(zs[z.id]); z.target = null; } });
      if (s.patches && typeof s.patches === 'object') {
        for (const [id, p] of Object.entries(s.patches)) {
          if (!p) continue;
          const ex = veil.getPatch(id);
          if (ex) { ex.veil = clamp01(p.veil); ex.target = null; if (p.r) { ex.x = p.x; ex.z = p.z; ex.r = p.r; } }
          else if (p.r > 0) veil.addPatch({ id, x: p.x, z: p.z, r: p.r, veil: p.veil });
        }
      }
      sync(); base = baseTarget(); uniforms.uVeilBase.value = base;
    },
    update(dt, time) {
      uniforms.uLumoTime.value = time;
      let dirty = false;
      if (wave) {
        wave.t += dt;
        const k = Math.min(1, wave.t / wave.duration);
        const e = 1 - Math.pow(1 - k, 2.2);
        wave.radius = wave.dir > 0 ? e * wave.maxR : (1 - e) * wave.maxR;
        uniforms.uVeilWave.value.z = wave.radius;
        if (k >= 1) finishWave();
      }
      // weiche Übergänge
      for (const s of slots) {
        if (s.target === null || (wave && slots[wave.index] === s)) continue;
        const d = s.target - s.veil;
        const step = s.rate * dt;
        if (Math.abs(d) <= step) { s.veil = s.target; s.target = null; } else s.veil += Math.sign(d) * step;
        dirty = true;
      }
      if (dirty) sync();
      const bt = baseOverride !== null ? baseOverride : baseTarget();
      base += (bt - base) * Math.min(1, dt * (baseOverride !== null ? 6 : 0.8));
      uniforms.uVeilBase.value = base;
    },
  };
  return veil;
}
