// Renderer, Qualitätsstufen, FPS-Überwachung, Größenanpassung (inkl. iPad-Drehung) und der Post-Stack (Stil-Bibel §13):
//   niedrig: direkt rendern (Toon-Rampe/Rim/Farbkorrektur im Material)
//   mittel:  RenderPass → Kontur (Tiefenkante 0.75×) → Bloom (¼) → Tone-Mapping+Grade+Vignette → FXAA
//   hoch:    RenderPass → Kontur (1.0×) → Bloom (½) → Tone-Mapping+Grade+Vignette → FXAA
// rr.attachPost({ scene, camera, veil }) baut den Stack; rr.render() zeichnet; renderer.render(scene, camera) von außen
// (Fotomodus, Tests) läuft automatisch durch den Stack. Die Farbkorrektur kommt aus veil.uniforms (der Himmel setzt sie).
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAPass } from 'three/examples/jsm/postprocessing/FXAAPass.js';

export const QUALITY = {
  low: {
    name: 'low', label: 'Niedrig', pixelRatio: 1, shadows: false, shadowSize: 0,
    vegetation: 0.4, terrainCell: 3.2, drawDistance: 380, waterSegments: 110, antialias: true,
    grassDistance: 55, particles: 0.5,
    post: false, outline: 0, bloom: 0, bloomScale: 0.5,
  },
  medium: {
    name: 'medium', label: 'Mittel', pixelRatio: 1.5, shadows: true, shadowSize: 1024,
    vegetation: 0.7, terrainCell: 2.5, drawDistance: 480, waterSegments: 150, antialias: false,
    grassDistance: 80, particles: 0.8,
    post: true, outline: 0.75, bloom: 0.22, bloomScale: 0.5,
  },
  high: {
    name: 'high', label: 'Hoch', pixelRatio: 2, shadows: true, shadowSize: 2048,
    vegetation: 1, terrainCell: 2.0, drawDistance: 600, waterSegments: 190, antialias: false,
    grassDistance: 110, particles: 1,
    post: true, outline: 1.0, bloom: 0.32, bloomScale: 1.0,
  },
};
export const QUALITY_ORDER = ['low', 'medium', 'high'];

function readSetting() {
  try { return JSON.parse(localStorage.getItem('lumo.settings') || '{}').quality || 'auto'; } catch (e) { return 'auto'; }
}

// Startstufe bestimmen: URL (?q=) > Einstellung > automatische Erkennung
export function detectQuality() {
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  if (q && QUALITY[q]) return { name: q, forced: true, reason: 'url' };
  const s = readSetting();
  if (QUALITY[s]) return { name: s, forced: true, reason: 'setting' };
  let gpu = '';
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    gpu = (ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl ? gl.getParameter(gl.RENDERER) : '')) || '';
  } catch (e) { /* egal */ }
  const ua = navigator.userAgent;
  const isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobile = isIPad || /iPhone|Android|Mobile/.test(ua);
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  if (/SwiftShader|llvmpipe|Software/i.test(gpu)) return { name: 'low', forced: false, reason: 'software', gpu };
  if (isMobile) return { name: cores >= 6 ? 'medium' : 'low', forced: false, reason: 'mobile', gpu };
  if (mem <= 2 || cores <= 2) return { name: 'low', forced: false, reason: 'weak', gpu };
  if (/Intel/i.test(gpu) && !/Iris Xe|Arc/i.test(gpu)) return { name: 'medium', forced: false, reason: 'igpu', gpu };
  return { name: 'high', forced: false, reason: 'desktop', gpu };
}

// ---- Kontur-Pass (§4): Tiefenkanten (Silhouetten) + Knicke aus der zweiten Tiefenableitung, Farbe = Albedo × 0.38 mit
// Sättigung × 1.2 (nie schwarz), nachts Richtung #10142E; ab 45–70 m ausgeblendet (Luftperspektive). Läuft im linearen Raum.
const OUTLINE_SHADER = {
  uniforms: {
    tDiffuse: { value: null }, tDepth: { value: null }, uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
    uNear: { value: 0.3 }, uFar: { value: 1600 }, uThick: { value: 1 }, uStrength: { value: 1 }, uNight: { value: 0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform sampler2D tDepth; uniform vec2 uTexel;
    uniform float uNear; uniform float uFar; uniform float uThick; uniform float uStrength; uniform float uNight;
    varying vec2 vUv;
    float linD(vec2 uv) {
      float z = texture2D(tDepth, uv).x;
      return (2.0 * uNear * uFar) / (uFar + uNear - (z * 2.0 - 1.0) * (uFar - uNear));
    }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float dc = linD(vUv);
      vec2 o = uTexel * uThick;
      float dl = linD(vUv - vec2(o.x, 0.0)), dr = linD(vUv + vec2(o.x, 0.0));
      float du = linD(vUv + vec2(0.0, o.y)), dd = linD(vUv - vec2(0.0, o.y));
      // Silhouette: ein Nachbar liegt deutlich weiter hinten → dieses Pixel liegt am Rand des näheren Objekts
      float dmax = max(max(dl, dr), max(du, dd));
      float jump = (dmax - dc) / (dc * 0.045 + 0.25);
      float edge = smoothstep(1.0, 2.2, jump);
      // Knicke (Dachkanten, Kisten, Klippenkanten): zweite Ableitung der Tiefe, relativ zur ersten
      float d2 = abs(dl + dr - 2.0 * dc) + abs(du + dd - 2.0 * dc);
      float d1 = abs(dr - dl) + abs(du - dd);
      float crease = d2 / (d1 * 0.35 + dc * 0.012 + 0.02);
      edge = max(edge, smoothstep(1.2, 2.4, crease) * 0.7);
      float fade = 1.0 - smoothstep(45.0, 70.0, dc);
      edge *= fade * uStrength;
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      vec3 oc = max(mix(vec3(l), c.rgb, 1.2), vec3(0.0)) * 0.13;
      oc = max(oc, vec3(0.0025));
      oc = mix(oc, vec3(0.0052, 0.0070, 0.0273), uNight * 0.4);
      gl_FragColor = vec4(mix(c.rgb, oc, edge), c.a);
    }`,
};
class OutlinePass extends ShaderPass {
  constructor() { super(OUTLINE_SHADER); }
  setSize(w, h) { this.uniforms.uTexel.value.set(1 / w, 1 / h); }
  render(renderer, writeBuffer, readBuffer, dt, mask) {
    this.uniforms.tDepth.value = readBuffer.depthTexture;
    super.render(renderer, writeBuffer, readBuffer, dt, mask);
  }
}

// ---- Abschluss-Pass: Tone-Mapping + sRGB (wie OutputPass), danach Farbkorrektur (dieselbe Formel wie lumoGrade in den
// Materialien, aber fürs ganze Bild inkl. Sprites/Partikel), weiche Vignette, Dithering.
const FINAL_SHADER = {
  uniforms: {
    tDiffuse: { value: null }, toneMappingExposure: { value: 1 },
    uGradeLift: { value: new THREE.Vector3() }, uGradeGain: { value: new THREE.Vector3(1, 1, 1) }, uGradeSat: { value: 1 }, uGradeContrast: { value: 1 },
    uVignette: { value: 0.22 }, uTime: { value: 0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec3 uGradeLift; uniform vec3 uGradeGain; uniform float uGradeSat; uniform float uGradeContrast;
    uniform float uVignette; uniform float uTime;
    varying vec2 vUv;
    #include <tonemapping_pars_fragment>
    float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      #if defined(LUMO_ACES)
        c.rgb = ACESFilmicToneMapping(c.rgb);
      #elif defined(LUMO_AGX)
        c.rgb = AgXToneMapping(c.rgb);
      #else
        c.rgb = NeutralToneMapping(c.rgb);
      #endif
      c = sRGBTransferOETF(c);
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb = mix(vec3(l), c.rgb, uGradeSat);
      c.rgb = (c.rgb - 0.5) * uGradeContrast + 0.5;
      c.rgb = c.rgb * uGradeGain + uGradeLift * (1.0 - l);
      vec2 q = vUv - 0.5;
      float vig = 1.0 - smoothstep(0.18, 0.6, dot(q, q)) * uVignette;
      c.rgb *= vig;
      c.rgb += (hash12(gl_FragCoord.xy + fract(uTime) * 3.0) - 0.5) * (1.5 / 255.0);
      gl_FragColor = clamp(c, 0.0, 1.0);
    }`,
};

export function createRenderer({ canvas, quality: qInfo, events }) {
  let q = QUALITY[qInfo.name];
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: q.antialias,
    powerPreference: 'high-performance',
    stencil: false,
    preserveDrawingBuffer: /[?&]test/.test(location.search),
  });
  // Neutrales Tone-Mapping (Khronos PBR Neutral): Farben bleiben bis ~0.8 unverändert, Lichter rollen weich ab –
  // die Sättigung der gemalten Paletten bleibt erhalten (ACES entsättigt und dunkelt die Mitten).
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = q.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;   // weich über shadow.radius (PCFSoft gibt es in r186 nicht mehr)
  renderer.setClearColor(0x88aacc, 1);
  // Draw-Calls/Dreiecke über alle Pässe eines Bildes zählen (renderer.info lesen Tests und das Debug-Panel)
  renderer.info.autoReset = false;

  const size = { w: 1, h: 1, aspect: 1, portrait: false };
  const resizeCbs = [];

  // ---- Post-Stack ----
  const post = { active: false, composer: null, outline: null, bloom: null, final: null, fxaa: null, scene: null, camera: null, veil: null, night: 0 };
  function disposePost() {
    if (post.composer) {
      for (const p of post.composer.passes) if (p.dispose) p.dispose();
      post.composer.renderTarget1.dispose(); post.composer.renderTarget2.dispose();
    }
    post.composer = null; post.outline = null; post.bloom = null; post.final = null; post.fxaa = null;
    post.active = false;
    if (post.veil) post.veil.uniforms.uLumoPost.value = 0;
  }
  function buildPost() {
    disposePost();
    if (!q.post || !post.scene || !post.camera) return;
    const dpr = renderer.getPixelRatio();
    const w = Math.max(1, Math.round(size.w * dpr)), h = Math.max(1, Math.round(size.h * dpr));
    const rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, depthBuffer: true, stencilBuffer: false, depthTexture: new THREE.DepthTexture(w, h, THREE.UnsignedIntType) });
    rt.texture.name = 'lumo.rt1';
    const composer = new EffectComposer(renderer, rt);
    composer.setPixelRatio(dpr);
    composer.setSize(size.w, size.h);
    composer.addPass(new RenderPass(post.scene, post.camera));
    const outline = new OutlinePass();
    outline.uniforms.uThick.value = q.outline * dpr * 0.85;
    outline.uniforms.uStrength.value = q.outline > 0 ? 1 : 0;
    outline.uniforms.uNear.value = post.camera.near; outline.uniforms.uFar.value = post.camera.far;
    outline.enabled = q.outline > 0;
    composer.addPass(outline);
    const bloom = new UnrealBloomPass(new THREE.Vector2(w * q.bloomScale, h * q.bloomScale), q.bloom, 0.45, 1.0);
    // Bloom in halber/viertel Auflösung: die Mips sind ohnehin geblurrt, das spart auf dem iPad viel Füllrate
    const bloomSetSize = bloom.setSize.bind(bloom);
    bloom.setSize = (bw, bh) => bloomSetSize(Math.max(2, Math.round(bw * q.bloomScale)), Math.max(2, Math.round(bh * q.bloomScale)));
    bloom.enabled = q.bloom > 0;
    composer.addPass(bloom);
    const final = new ShaderPass(FINAL_SHADER);
    if (post.veil) {
      const u = post.veil.uniforms;
      final.uniforms.uGradeLift = u.uGradeLift; final.uniforms.uGradeGain = u.uGradeGain;
      final.uniforms.uGradeSat = u.uGradeSat; final.uniforms.uGradeContrast = u.uGradeContrast;
      final.material.uniforms = final.uniforms;
    }
    final.material.defines = renderer.toneMapping === THREE.ACESFilmicToneMapping ? { LUMO_ACES: '' } : renderer.toneMapping === THREE.AgXToneMapping ? { LUMO_AGX: '' } : {};
    // Tone-Mapping und sRGB macht der Pass selbst (sonst würde three die Chunks beim Zeichnen auf den Bildschirm doppelt einfügen)
    final.material.toneMapped = false;
    outline.material.toneMapped = false;
    composer.addPass(final);
    const fxaa = new FXAAPass();
    composer.addPass(fxaa);
    composer.setSize(size.w, size.h);
    Object.assign(post, { composer, outline, bloom, final, fxaa, active: true });
    if (post.veil) post.veil.uniforms.uLumoPost.value = 1;
    return composer;
  }

  function measure() {
    const vv = window.visualViewport;
    const w = Math.round(vv ? vv.width : window.innerWidth) || window.innerWidth;
    const h = Math.round(vv ? vv.height : window.innerHeight) || window.innerHeight;
    return { w: Math.max(1, w), h: Math.max(1, h) };
  }
  function resize() {
    const m = measure();
    const dpr = Math.min(window.devicePixelRatio || 1, q.pixelRatio * r.dprScale);
    renderer.setPixelRatio(dpr);
    renderer.setSize(m.w, m.h, true);
    size.w = m.w; size.h = m.h; size.aspect = m.w / m.h; size.portrait = m.h > m.w;
    if (post.composer) {
      post.composer.setPixelRatio(dpr);
      post.composer.setSize(m.w, m.h);
      if (post.outline) post.outline.uniforms.uThick.value = q.outline * dpr * 0.85;
    }
    resizeCbs.forEach((cb) => cb(size));
    events && events.emit('resize', size);
  }
  let resizeTimer = 0;
  const scheduleResize = () => {
    resize();
    clearTimeout(resizeTimer);
    // iOS meldet die endgültige Größe nach dem Drehen verzögert
    resizeTimer = setTimeout(resize, 350);
  };
  window.addEventListener('resize', scheduleResize);
  window.addEventListener('orientationchange', scheduleResize);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleResize);

  // ---- FPS-Überwachung: stuft nach anhaltend < 40 fps herunter ----
  const monitor = {
    enabled: !qInfo.forced,
    fps: 60, frameMs: 16.7,
    samples: [], windowStart: 0, frames: 0, lowWindows: 0, highWindows: 0, graceUntil: 0,
    downgrades: 0, upgraded: false, mobile: qInfo.reason === 'mobile',
  };
  function tickMonitor(realDt) {
    const now = performance.now();
    monitor.frameMs = monitor.frameMs * 0.95 + realDt * 1000 * 0.05;
    if (!monitor.windowStart) monitor.windowStart = now;
    monitor.frames++;
    const span = now - monitor.windowStart;
    if (span >= 2000) {
      monitor.fps = (monitor.frames * 1000) / span;
      monitor.frames = 0; monitor.windowStart = now;
      if (!monitor.enabled || document.hidden || now < monitor.graceUntil) return;
      if (monitor.fps < 40) monitor.lowWindows++; else monitor.lowWindows = 0;
      // Einmal vorsichtig hochstufen, wenn stabil 60 fps (Mobilgeräte höchstens „mittel“)
      if (monitor.fps >= 57) monitor.highWindows++; else monitor.highWindows = 0;
      const maxUp = monitor.mobile ? 'medium' : 'high';
      if (monitor.highWindows >= 4 && !monitor.downgrades && !monitor.upgraded && q.name !== maxUp && q.name !== 'high') {
        monitor.upgraded = true;
        monitor.highWindows = 0;
        r.setQuality(QUALITY_ORDER[QUALITY_ORDER.indexOf(q.name) + 1], { auto: true });
        return;
      }
      if (monitor.lowWindows >= 3) {
        monitor.lowWindows = 0;
        const i = QUALITY_ORDER.indexOf(q.name);
        if (r.dprScale > 0.75 && q.pixelRatio * r.dprScale > 1) {
          // Erst die Auflösung senken
          r.dprScale = 0.75; resize(); monitor.graceUntil = now + 5000;
          events && events.emit('quality:auto', { name: q.name, step: 'resolution' });
        } else if (i > 0) {
          monitor.downgrades++;
          r.dprScale = 1;
          r.setQuality(QUALITY_ORDER[i - 1], { auto: true });
        } else if (r.dprScale > 0.6 && (window.devicePixelRatio || 1) > 1) {
          r.dprScale = 0.6; resize(); monitor.graceUntil = now + 5000;
        }
      }
    }
  }

  // renderer.render(scene, camera) von außen (Fotomodus, Tests) läuft durch den Post-Stack; innen (RenderPass) direkt
  const rawRender = renderer.render.bind(renderer);
  let inPost = false;
  renderer.render = (scene, camera) => {
    if (post.active && !inPost && scene === post.scene && camera === post.camera) {
      inPost = true;
      try { post.composer.render(); } finally { inPost = false; }
    } else rawRender(scene, camera);
  };

  const r = {
    renderer,
    size,
    monitor,
    post,
    dprScale: 1,
    get quality() { return q; },
    get qualityName() { return q.name; },
    onResize(cb) { resizeCbs.push(cb); cb(size); },
    resize,
    tickMonitor,
    // Post-Stack an Szene/Kamera/Schleier hängen (einmal nach dem Weltaufbau)
    attachPost({ scene, camera, veil }) {
      post.scene = scene; post.camera = camera; post.veil = veil || null;
      buildPost();
      return post;
    },
    // Ein Bild zeichnen (Stack oder direkt); night steuert die Konturfarbe
    render(opts = {}) {
      renderer.info.reset();
      if (post.active) {
        if (post.outline) { post.outline.uniforms.uNight.value = opts.night || 0; post.outline.uniforms.uNear.value = post.camera.near; post.outline.uniforms.uFar.value = post.camera.far; }
        if (post.final) post.final.uniforms.uTime.value = opts.time || 0;
        if (post.final) post.final.uniforms.toneMappingExposure.value = renderer.toneMappingExposure;
        inPost = true;
        try { post.composer.render(); } finally { inPost = false; }
      } else if (post.scene) rawRender(post.scene, post.camera);
    },
    // Qualität wechseln (Pixeldichte, Schatten, Vegetation, Sichtweite, Post-Stack; Terrain bleibt)
    setQuality(name, opts = {}) {
      if (!QUALITY[name]) return;
      const prev = q;
      q = QUALITY[name];
      if (!opts.auto) monitor.enabled = !!opts.enableAuto;
      renderer.shadowMap.enabled = q.shadows;
      renderer.shadowMap.needsUpdate = true;
      monitor.graceUntil = performance.now() + 6000;
      resize();
      if (post.scene) buildPost();
      events && events.emit('quality', { name: q.name, prev: prev.name, auto: !!opts.auto, quality: q });
    },
    // Kleine Pause der Überwachung (z. B. während Weltaufbau)
    grace(ms) { monitor.graceUntil = performance.now() + ms; },
  };
  resize();
  monitor.graceUntil = performance.now() + 8000;
  return r;
}
