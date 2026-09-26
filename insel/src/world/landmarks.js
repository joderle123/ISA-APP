// Wahrzeichen, die die Welt von Anfang an braucht: Anlegesteg (Startpunkt), Boot der Kapitänin, Leuchtturm.
// Weitere Requisiten (Häuser, Stände, Brett …) kommen aus eigenen Modulen und nutzen dieselben Helfer.
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { FEATURES } from './island.js';

export function lambertVC(veil, key, opts = {}) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, ...opts });
  if (veil) veil.patch(m, { key: 'lm-' + key });
  return m;
}

export function createLandmarks({ island, veil, colliders, scene }) {
  const group = new THREE.Group();
  group.name = 'landmarks';
  const mat = lambertVC(veil, 'base');

  // ---- Anlegesteg ----
  const D = FEATURES.dock;
  const deckY = D.deck;
  const z0 = D.z0 - 2, z1 = D.z1;
  const dockParts = [];
  const nPl = Math.round((z1 - z0) / 0.62);
  for (let i = 0; i < nPl; i++) {
    const z = z0 + (i + 0.5) * ((z1 - z0) / nPl);
    dockParts.push(part(new THREE.BoxGeometry(D.width, 0.16, (z1 - z0) / nPl - 0.07), {
      pos: [D.x + ((i * 37) % 7 - 3) * 0.008, deckY - 0.08, z], rot: [0, 0, (i % 3 - 1) * 0.008],
      color: i % 2 ? '#b07e52' : '#a07046', faceVar: 0.08, seed: i,
    }));
  }
  for (let z = z0 + 1; z <= z1; z += 3.2) {
    for (const sx of [-1, 1]) {
      const px = D.x + sx * (D.width / 2 + 0.05);
      const ground = Math.min(island.getHeight(px, z), -0.5);
      const h = deckY + 0.5 - ground;
      dockParts.push(part(new THREE.CylinderGeometry(0.17, 0.2, h, 6, 1), { pos: [px, ground + h / 2, z], color: '#6e4a30' }));
    }
  }
  // Längsträger + Poller
  for (const sx of [-1, 1]) {
    dockParts.push(part(new THREE.BoxGeometry(0.16, 0.22, z1 - z0), { pos: [D.x + sx * (D.width / 2 - 0.1), deckY - 0.26, (z0 + z1) / 2], color: '#7a5234' }));
    for (const z of [z1 - 1.2, z1 - 8, z0 + 8]) {
      dockParts.push(part(new THREE.CylinderGeometry(0.16, 0.2, 0.55, 7, 1), { pos: [D.x + sx * (D.width / 2 - 0.3), deckY + 0.27, z], color: '#3d3a44' }));
      dockParts.push(part(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 7, 1), { pos: [D.x + sx * (D.width / 2 - 0.3), deckY + 0.56, z], color: '#4a4652' }));
    }
  }
  // Laterne am Stegende
  const lampZ = z0 + 2.2;
  dockParts.push(part(new THREE.CylinderGeometry(0.07, 0.09, 2.6, 5, 1), { pos: [D.x - D.width / 2 + 0.3, deckY + 1.3, lampZ], color: '#2f2c3a' }));
  dockParts.push(part(new THREE.CylinderGeometry(0.2, 0.14, 0.12, 6, 1), { pos: [D.x - D.width / 2 + 0.3, deckY + 2.95, lampZ], color: '#2f2c3a' }));
  const lampGeo = part(new THREE.IcosahedronGeometry(0.2, 0), { pos: [D.x - D.width / 2 + 0.3, deckY + 2.72, lampZ], color: '#ffe7a0' });
  const dockMesh = new THREE.Mesh(merge(dockParts), mat);
  dockMesh.castShadow = true; dockMesh.receiveShadow = true;
  group.add(dockMesh);
  const lampMat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  const lamp = new THREE.Mesh(merge([lampGeo]), lampMat);
  group.add(lamp);
  colliders.addSurface({ type: 'box', x: D.x, z: (z0 + z1) / 2, hw: D.width / 2, hd: (z1 - z0) / 2, y: deckY, group: 'landmarks', tag: 'steg', surface: 'wood' });
  colliders.addCircle(D.x - D.width / 2 + 0.3, lampZ, 0.2, { group: 'landmarks' });

  // ---- Boot der Kapitänin ----
  const boatParts = [];
  const hull = new THREE.CylinderGeometry(1.4, 1.0, 6.2, 8, 3, false);
  boatParts.push(part(hull, {
    rot: [Math.PI / 2, 0, 0], scale: [1, 1, 0.55],
    deform: (v) => {
      // Bug spitz zulaufen lassen
      const t = (v.y + 3.1) / 6.2;
      if (t > 0.65) { const k = 1 - (t - 0.65) / 0.35 * 0.85; v.x *= k; v.z = v.z * (0.6 + 0.4 * k); }
    },
    color: (x, y, z, out) => out.set(y > 0.25 ? '#ffffff' : (y > 0.05 ? '#e2413f' : '#2d4a7a')),
  }));
  boatParts.push(part(new THREE.BoxGeometry(1.6, 1.1, 1.8), { pos: [0, 1.05, -0.6], color: '#4aa3df' }));
  boatParts.push(part(new THREE.BoxGeometry(1.8, 0.14, 2.1), { pos: [0, 1.65, -0.6], color: '#f4f1e8' }));
  boatParts.push(part(new THREE.BoxGeometry(1.3, 0.45, 0.06), { pos: [0, 1.15, 0.31], color: '#bfe8ff' }));
  boatParts.push(part(new THREE.CylinderGeometry(0.06, 0.08, 3.6, 5, 1), { pos: [0, 2.4, 0.9], color: '#8a6a4a' }));
  boatParts.push(part(new THREE.BoxGeometry(0.9, 0.6, 0.02), { pos: [0.45, 3.8, 0.9], color: '#ffd166' }));
  boatParts.push(part(new THREE.TorusGeometry(0.35, 0.09, 4, 10), { pos: [0.72, 0.9, -0.6], rot: [0, Math.PI / 2, 0], color: '#ff6b3d' }));
  const boat = new THREE.Mesh(merge(boatParts), mat);
  boat.castShadow = true;
  const boatBase = new THREE.Vector3(D.x + D.width / 2 + 1.9, 0.25, D.z1 - 7);
  boat.position.copy(boatBase);
  group.add(boat);
  colliders.addBox(boatBase.x, boatBase.z, 1.3, 3.3, 0, { group: 'landmarks', tag: 'boot' });

  // ---- Leuchtturm ----
  const L = FEATURES.lighthouse;
  const ly = island.getHeight(L.x, L.z);
  const lhParts = [];
  const bands = 6, towerH = 13, r0 = 2.3, r1 = 1.55;
  for (let i = 0; i < bands; i++) {
    const a = i / bands, b = (i + 1) / bands;
    lhParts.push(part(new THREE.CylinderGeometry(r0 + (r1 - r0) * b, r0 + (r1 - r0) * a, towerH / bands, 10, 1), {
      pos: [0, towerH * (a + b) / 2, 0], color: i % 2 ? '#e8453c' : '#fbf6ee',
    }));
  }
  lhParts.push(part(new THREE.CylinderGeometry(2.6, 2.8, 0.8, 10, 1), { pos: [0, 0.2, 0], color: '#8d8a94' }));
  lhParts.push(part(new THREE.CylinderGeometry(2.25, 2.1, 0.3, 12, 1), { pos: [0, towerH + 0.15, 0], color: '#3b3848' }));
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2;
    lhParts.push(part(new THREE.BoxGeometry(0.07, 0.7, 0.07), { pos: [Math.cos(a) * 2.1, towerH + 0.65, Math.sin(a) * 2.1], color: '#3b3848' }));
  }
  lhParts.push(part(new THREE.TorusGeometry(2.1, 0.05, 3, 24), { pos: [0, towerH + 1.0, 0], rot: [Math.PI / 2, 0, 0], color: '#3b3848' }));
  lhParts.push(part(new THREE.CylinderGeometry(1.25, 1.25, 0.25, 10, 1), { pos: [0, towerH + 0.4, 0], color: '#3b3848' }));
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    lhParts.push(part(new THREE.BoxGeometry(0.1, 1.9, 0.1), { pos: [Math.cos(a) * 1.2, towerH + 1.5, Math.sin(a) * 1.2], color: '#3b3848' }));
  }
  lhParts.push(part(new THREE.ConeGeometry(1.6, 1.5, 10, 1), { pos: [0, towerH + 3.2, 0], color: '#e8453c' }));
  lhParts.push(part(new THREE.IcosahedronGeometry(0.28, 0), { pos: [0, towerH + 4.05, 0], color: '#3b3848' }));
  // Wärterhäuschen
  lhParts.push(part(new THREE.BoxGeometry(3.6, 2.4, 3.0), { pos: [3.4, 1.2, 0.6], color: '#fbf6ee' }));
  lhParts.push(part(new THREE.CylinderGeometry(0.01, 2.6, 1.6, 4, 1), { pos: [3.4, 3.2, 0.6], rot: [0, Math.PI / 4, 0], scale: [1.05, 1, 0.85], color: '#3f6fb5' }));
  lhParts.push(part(new THREE.BoxGeometry(0.8, 1.4, 0.05), { pos: [3.4, 0.7, 2.13], color: '#6e4a30' }));
  const tower = new THREE.Mesh(merge(lhParts), mat);
  tower.position.set(L.x, ly - 0.2, L.z);
  tower.castShadow = true; tower.receiveShadow = true;
  group.add(tower);
  const glassMat = new THREE.MeshLambertMaterial({ color: '#5a6275', emissive: new THREE.Color('#fff1b8'), emissiveIntensity: 0.0, transparent: true, opacity: 0.85 });
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 1.7, 10, 1), glassMat);
  glass.position.set(L.x, ly - 0.2 + towerH + 1.4, L.z);
  group.add(glass);
  colliders.addCircle(L.x, L.z, r0 + 0.5, { group: 'landmarks', tag: 'leuchtturm' });
  colliders.addBox(L.x + 3.4, L.z + 0.6, 1.8, 1.5, 0, { group: 'landmarks' });
  // Lichtkegel
  const beamMat = new THREE.ShaderMaterial({
    uniforms: { uAlpha: { value: 0 } },
    vertexShader: 'varying float vT; void main(){ vT = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform float uAlpha; varying float vT; void main(){ gl_FragColor = vec4(1.0, 0.92, 0.65, uAlpha * pow(vT, 1.6) * 0.5); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false,
  });
  const beamGeo = new THREE.ConeGeometry(7, 60, 12, 1, true);
  beamGeo.translate(0, -30, 0);
  beamGeo.rotateZ(Math.PI / 2);
  const beam = new THREE.Group();
  const b1 = new THREE.Mesh(beamGeo, beamMat), b2 = new THREE.Mesh(beamGeo, beamMat);
  b2.rotation.y = Math.PI;
  beam.add(b1, b2);
  beam.position.copy(glass.position);
  beam.visible = false;
  group.add(beam);

  // ---- Vulkan: Lava-See und Rauchfahne ----
  const V = FEATURES.volcano;
  const lavaMat = new THREE.ShaderMaterial({
    uniforms: Object.assign({ uT: { value: 0 } }, veil.uniforms),
    vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: /* glsl */`
      uniform float uT; varying vec3 vW;
      ${veil.glsl}
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
      void main() {
        vec2 p = vW.xz * 0.55;
        float v = n(p + vec2(uT * 0.12, uT * 0.05)) * 0.65 + n(p * 2.3 - uT * 0.2) * 0.35;
        vec3 col = mix(vec3(1.0, 0.22, 0.02), vec3(1.0, 0.8, 0.25), smoothstep(0.5, 0.85, v));
        col = mix(col, vec3(0.25, 0.05, 0.02), smoothstep(0.38, 0.22, v) * 0.85);
        col *= 1.7 + 0.3 * sin(uT * 2.0);
        col *= 1.0 - 0.35 * lumoVeilAmount(vW);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const lava = new THREE.Mesh(new THREE.CircleGeometry(V.lavaRadius, 28).rotateX(-Math.PI / 2), lavaMat);
  lava.position.set(V.x, V.lavaLevel, V.z);
  group.add(lava);
  let smokeT = 0;

  scene.add(group);
  let lit = 0, litTarget = 0;

  return {
    group, dock: dockMesh, boat, lighthouse: tower, beam, glass,
    deckY,
    // Leuchtturm leuchtet (Finale)
    setLighthouseLit(v) { litTarget = v ? 1 : 0; },
    get lighthouseLit() { return litTarget > 0.5; },
    lava,
    update(dt, t, night, particles) {
      lavaMat.uniforms.uT.value = t;
      if (particles && dt > 0) {
        smokeT += dt;
        while (smokeT > 0.3) {
          smokeT -= 0.3;
          particles.emit({ x: V.x + (Math.random() - 0.5) * 5, y: V.lavaLevel + 3, z: V.z + (Math.random() - 0.5) * 5, count: 1, speed: 0.3, up: 2.2, vx: 0.6, color: night > 0.5 ? 0x2c2733 : 0x9a93a0, size: 8, life: 10, gravity: 0.2, drag: 0.08, grow: 2.4, alpha: night > 0.5 ? 0.22 : 0.32 });
          if (Math.random() < 0.3) particles.emit({ x: V.x + (Math.random() - 0.5) * 8, y: V.lavaLevel + 0.5, z: V.z + (Math.random() - 0.5) * 8, count: 3, spread: 1, speed: 1.2, up: 4, color: 0xffa040, size: 0.5, life: 1.4, gravity: -4, drag: 0.5, additive: true, alpha: 1 });
        }
      }
      boat.position.y = boatBase.y + Math.sin(t * 1.1) * 0.12;
      boat.rotation.z = Math.sin(t * 0.9) * 0.04;
      boat.rotation.x = Math.sin(t * 0.7 + 1) * 0.025;
      lit += (litTarget - lit) * Math.min(1, dt * 1.5);
      glassMat.emissiveIntensity = lit * 2.2 + 0.05;
      beam.visible = lit > 0.02;
      beam.rotation.y += dt * 0.6;
      beamMat.uniforms.uAlpha.value = lit * (0.35 + night * 0.65);
      lampMat.color.setScalar(0.5 + night * 1.2);
    },
  };
}
