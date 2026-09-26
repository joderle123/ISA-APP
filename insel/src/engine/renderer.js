// Renderer, Qualitätsstufen, FPS-Überwachung und Größenanpassung (inkl. iPad-Drehung).
import * as THREE from 'three';

export const QUALITY = {
  low: {
    name: 'low', label: 'Niedrig', pixelRatio: 1, shadows: false, shadowSize: 0,
    vegetation: 0.4, terrainCell: 3.2, drawDistance: 380, waterSegments: 110, antialias: false,
    grassDistance: 55, particles: 0.5,
  },
  medium: {
    name: 'medium', label: 'Mittel', pixelRatio: 1.5, shadows: true, shadowSize: 1024,
    vegetation: 0.7, terrainCell: 2.5, drawDistance: 480, waterSegments: 150, antialias: true,
    grassDistance: 80, particles: 0.8,
  },
  high: {
    name: 'high', label: 'Hoch', pixelRatio: 2, shadows: true, shadowSize: 2048,
    vegetation: 1, terrainCell: 2.0, drawDistance: 600, waterSegments: 190, antialias: true,
    grassDistance: 110, particles: 1,
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

export function createRenderer({ canvas, quality: qInfo, events }) {
  let q = QUALITY[qInfo.name];
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: q.antialias,
    powerPreference: 'high-performance',
    stencil: false,
    preserveDrawingBuffer: /[?&]test/.test(location.search),
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = q.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x88aacc, 1);

  const size = { w: 1, h: 1, aspect: 1, portrait: false };
  const resizeCbs = [];

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
    samples: [], windowStart: 0, frames: 0, lowWindows: 0, graceUntil: 0,
    downgrades: 0,
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

  const r = {
    renderer,
    size,
    monitor,
    dprScale: 1,
    get quality() { return q; },
    get qualityName() { return q.name; },
    onResize(cb) { resizeCbs.push(cb); cb(size); },
    resize,
    tickMonitor,
    // Qualität wechseln (Pixeldichte, Schatten, Vegetation, Sichtweite; Terrain bleibt)
    setQuality(name, opts = {}) {
      if (!QUALITY[name]) return;
      const prev = q;
      q = QUALITY[name];
      if (!opts.auto) monitor.enabled = !!opts.enableAuto;
      renderer.shadowMap.enabled = q.shadows;
      renderer.shadowMap.needsUpdate = true;
      monitor.graceUntil = performance.now() + 6000;
      resize();
      events && events.emit('quality', { name: q.name, prev: prev.name, auto: !!opts.auto, quality: q });
    },
    // Kleine Pause der Überwachung (z. B. während Weltaufbau)
    grace(ms) { monitor.graceUntil = performance.now() + ms; },
  };
  resize();
  monitor.graceUntil = performance.now() + 8000;
  return r;
}
