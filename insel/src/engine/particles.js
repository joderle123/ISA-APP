// Einfaches Partikelsystem (Punkte-Sprites) für Staub, Spritzer, Funken, Glitzer.
// game.particles.emit({ x,y,z, count, spread, vx,vy,vz, speed, up, color, size, life, gravity, drag, additive })
import * as THREE from 'three';

const VERT = /* glsl */`
attribute vec3 aColor;
attribute float aSize;
attribute float aAlpha;
varying vec3 vColor;
varying float vAlpha;
uniform float uScale;
void main() {
  vColor = aColor;
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uScale / max(-mv.z, 0.5);
}`;
const FRAG = /* glsl */`
varying vec3 vColor;
varying float vAlpha;
uniform float uSoft;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = dot(p, p);
  if (d > 1.0) discard;
  float a = mix(1.0 - smoothstep(0.55, 1.0, d), exp(-d * 3.2), uSoft) * vAlpha;
  gl_FragColor = vec4(vColor, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

function makeSystem(max, additive) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(max * 3);
  const col = new Float32Array(max * 3);
  const size = new Float32Array(max);
  const alpha = new Float32Array(max);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setDrawRange(0, 0);
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG,
    uniforms: { uScale: { value: 400 }, uSoft: { value: additive ? 1 : 0.35 } },
    transparent: true, depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = additive ? 12 : 11;
  // Partikel-Daten
  const P = [];
  for (let i = 0; i < max; i++) P.push({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 1, g: 1, b: 1, size: 1, life: 0, age: 0, grav: 0, drag: 0, grow: 0, fade: 1 });
  return { geo, mat, points, pos, col, size, alpha, P, count: 0, max };
}

export function createParticles(scene, { budget = 1 } = {}) {
  const normal = makeSystem(700, false);
  const glow = makeSystem(500, true);
  scene.add(normal.points, glow.points);
  const tmpC = new THREE.Color();
  let scale = 1;

  function emit(o = {}) {
    const sys = o.additive ? glow : normal;
    const n = Math.max(1, Math.round((o.count || 1) * (o.count > 1 ? scale : 1)));
    tmpC.set(o.color !== undefined ? o.color : 0xffffff);
    const spread = o.spread || 0;
    const speed = o.speed || 0;
    for (let k = 0; k < n; k++) {
      if (sys.count >= sys.max) break;
      const p = sys.P[sys.count++];
      p.x = (o.x || 0) + (Math.random() - 0.5) * spread;
      p.y = (o.y || 0) + (Math.random() - 0.5) * spread * 0.5;
      p.z = (o.z || 0) + (Math.random() - 0.5) * spread;
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.4 + Math.random() * 0.6);
      p.vx = (o.vx || 0) + Math.cos(a) * s;
      p.vz = (o.vz || 0) + Math.sin(a) * s;
      p.vy = (o.vy || 0) + (o.up || 0) * (0.5 + Math.random() * 0.5);
      const jitter = o.colorJitter || 0;
      p.r = tmpC.r * (1 + (Math.random() - 0.5) * jitter);
      p.g = tmpC.g * (1 + (Math.random() - 0.5) * jitter);
      p.b = tmpC.b * (1 + (Math.random() - 0.5) * jitter);
      p.size = (o.size || 0.3) * (0.7 + Math.random() * 0.6);
      p.life = (o.life || 1) * (0.7 + Math.random() * 0.6);
      p.age = 0;
      p.grav = o.gravity !== undefined ? o.gravity : -2;
      p.drag = o.drag !== undefined ? o.drag : 1.5;
      p.grow = o.grow !== undefined ? o.grow : 0.6;
      p.fade = o.alpha !== undefined ? o.alpha : 0.85;
    }
  }

  function updateSys(sys, dt) {
    let i = 0;
    while (i < sys.count) {
      const p = sys.P[i];
      p.age += dt;
      if (p.age >= p.life) {
        // mit letztem tauschen
        sys.count--;
        const last = sys.P[sys.count];
        sys.P[sys.count] = p; sys.P[i] = last;
        continue;
      }
      const dd = Math.exp(-p.drag * dt);
      p.vx *= dd; p.vy *= dd; p.vz *= dd;
      p.vy += p.grav * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      const t = p.age / p.life;
      sys.pos[i * 3] = p.x; sys.pos[i * 3 + 1] = p.y; sys.pos[i * 3 + 2] = p.z;
      sys.col[i * 3] = p.r; sys.col[i * 3 + 1] = p.g; sys.col[i * 3 + 2] = p.b;
      sys.size[i] = p.size * (1 + p.grow * t);
      sys.alpha[i] = p.fade * Math.min(1, t * 8) * (1 - t) * (1 - t * 0.3);
      i++;
    }
    sys.geo.setDrawRange(0, sys.count);
    if (sys.count > 0) {
      for (const k of ['position', 'aColor', 'aSize', 'aAlpha']) {
        const at = sys.geo.attributes[k];
        at.needsUpdate = true;
        at.clearUpdateRanges();
        at.addUpdateRange(0, sys.count * at.itemSize);
      }
    }
  }

  return {
    emit,
    update(dt) { updateSys(normal, dt); updateSys(glow, dt); },
    // Pixelhöhe beeinflusst die Punktgröße
    setViewport(heightPx, fovDeg) {
      const s = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360));
      normal.mat.uniforms.uScale.value = s; glow.mat.uniforms.uScale.value = s;
    },
    setBudget(b) { scale = b; },
    systems: { normal, glow },
  };
}
