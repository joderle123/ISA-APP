// Low-Poly-Terrain: nicht indizierte Dreiecke mit Flächen-Normalen und Flächenfarben.
// Wege, Plätze (Pads) und Sand bekommen weich interpolierte Normalen und ruhige Farben, damit sie als
// glatte Flächen lesen statt als Dreiecks-Mosaik. Farben nach Höhe, Neigung, Zone; Schleier über veil.patch();
// Lava-Glühen im Krater und Lava-Adern am oberen Kegel; Kaustik unter Wasser.
import * as THREE from 'three';
import { ZONES, FEATURES, SITES } from './island.js';
import { hash2, smoothstep, clamp, ridged } from './noise.js';

const C = (hex) => new THREE.Color(hex);
const PAL = {
  sandDry: C('#f7dca2'), sandWarm: C('#efc98a'), sandWet: C('#d2a36c'),
  under: C('#e0c690'), underDeep: C('#6f8f8a'),
  path: C('#d9ad72'), pathDark: C('#bf915a'),
  rock: C('#a39085'), rockDark: C('#85756d'),
  cliff: C('#8a8fa6'), cliffDark: C('#676c85'),
  basalt: C('#4b3f3d'), basaltDark: C('#352b2b'), ash: C('#7a6358'),
  lavaRock: C('#5b2618'),
  heather: C('#a77fc8'), meadow: C('#f0cf55'), moss: C('#5d8f3a'),
};
// Graspaletten pro Zone [hell, dunkel]
const GRASS = {
  hafen: [C('#8fd552'), C('#6cbd40')],
  strand: [C('#b9dc5e'), C('#95c94c')],
  dschungel: [C('#44a843'), C('#2a8a3a')],
  klippen: [C('#86ab63'), C('#6a9152')],
  markt: [C('#c8dc5c'), C('#a6cf4c')],
  vulkan: [C('#93b54f'), C('#7c9c45')],
  leuchtturm: [C('#a4d563'), C('#83c052')],
  wild: [C('#8ccf4e'), C('#68b540')],
};

export function createTerrain({ island, veil, quality }) {
  const { n, heights, half, cell: c } = island;
  const H = (i, j) => heights[j * n + i];
  const zw = new Float32Array(ZONES.length);
  const tmp = new THREE.Color();
  const tmp2 = new THREE.Color();
  const grassA = new THREE.Color(), grassB = new THREE.Color();
  const vol = FEATURES.volcano;
  const pads = Object.values(SITES).filter((s) => s.r > 0);
  // Ebene Plätze: 1 innerhalb des Pads, weich auslaufend
  function padWeight(x, z) {
    let w = 0;
    for (let i = 0; i < pads.length; i++) {
      const p = pads[i];
      const d = Math.hypot(x - p.x, z - p.z);
      if (d < p.r + 5) w = Math.max(w, smoothstep(p.r + 5, p.r, d));
    }
    return w;
  }

  // Zellen zählen (tiefe Meereszellen weglassen)
  const keep = new Uint8Array((n - 1) * (n - 1));
  let cells = 0;
  for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) {
    const m = Math.max(H(i, j), H(i + 1, j), H(i, j + 1), H(i + 1, j + 1));
    if (m > -7) { keep[j * (n - 1) + i] = 1; cells++; }
  }
  const triCount = cells * 2;
  const pos = new Float32Array(triCount * 9);
  const nor = new Float32Array(triCount * 9);
  const col = new Float32Array(triCount * 9);
  const glow = new Float32Array(triCount * 3);
  let t = 0;
  const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3();
  const e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), fn = new THREE.Vector3();
  const _sn = { x: 0, y: 1, z: 0 };
  // Rückgabe von faceColor: Glühen; Nebenwirkung: tmp = Farbe, smoothness = Anteil weicher Normalen
  let smoothness = 0;
  // Lava-Adern am oberen Kegel (0..0,6), stetig über Flächen hinweg
  function veinAt(x, z, h) {
    const dv = Math.hypot(x - vol.x, z - vol.z);
    if (dv >= 48 || dv < vol.rimRadius || h <= 24) return 0;
    const vein = ridged(island.noise.rock, x / 9 + 5, z / 9 - 2, 2);
    return smoothstep(0.5, 0.64, vein) * 0.6 * smoothstep(24, 33, h) * (1 - smoothstep(38, 48, dv));
  }

  function faceColor(cx, cz, h, ny, fi) {
    const rnd = hash2(fi, 17, 3);
    const nz = island.noise.zone(cx / 18, cz / 18);
    const s = island.surfaceAt(cx, cz, h, ny);
    island.zoneWeights(cx, cz, zw);
    let wsum = 0; for (let k = 0; k < zw.length; k++) wsum += zw[k];
    const wild = Math.max(0, 1 - wsum);
    const wKl = zw[3], wVu = zw[5], wMa = zw[4];
    const dv = Math.hypot(cx - vol.x, cz - vol.z);
    const pw = padWeight(cx, cz);
    const pathW = island.pathWeight(cx, cz);
    let gl = 0;
    smoothness = 0;
    if (dv < vol.rimRadius) {
      // Krater: dunkler Lavafels, glüht nach unten hin
      tmp.copy(PAL.lavaRock).lerp(PAL.basaltDark, rnd * 0.5);
      gl = smoothstep(vol.lavaLevel + 4.5, vol.lavaLevel - 0.5, h);
      return gl;
    }
    if (s === 'water') {
      const d = clamp(-h / 9, 0, 1);
      tmp.copy(PAL.under).lerp(PAL.underDeep, d);
      smoothness = 0.6;
    } else if (s === 'sand') {
      tmp.copy(PAL.sandWet).lerp(PAL.sandDry, smoothstep(0.1, 1.1, h));
      tmp.lerp(PAL.sandWarm, (nz * 0.5 + 0.5) * 0.35);
      smoothness = 0.85;
    } else if (s === 'path') {
      // ruhige, ortsabhängige Variation statt Zufall pro Dreieck
      const nd = island.noise.detail(cx / 7 + 3, cz / 7 - 9) * 0.5 + 0.5;
      tmp.copy(PAL.path).lerp(PAL.pathDark, 0.2 + nd * 0.3 + rnd * 0.06);
      smoothness = 1;
    } else if (s === 'rock' || s === 'ash') {
      if (s === 'ash' || wVu > 0.5) {
        const top = smoothstep(22, 44, h);
        tmp.copy(PAL.ash).lerp(PAL.basalt, top).lerp(PAL.basaltDark, rnd * 0.35 * top);
      } else {
        tmp.copy(PAL.rock).lerp(PAL.rockDark, rnd * 0.6);
        tmp2.copy(PAL.cliff).lerp(PAL.cliffDark, rnd * 0.6);
        tmp.lerp(tmp2, clamp(wKl * 1.3, 0, 1));
      }
      if (s === 'rock' && ny > 0.6 && h > 3) tmp.lerp(PAL.moss, 0.25 * (1 - wVu));
    } else {
      // Gras: Zonenmischung
      grassA.setRGB(0, 0, 0); grassB.setRGB(0, 0, 0);
      let tw = 0;
      for (let k = 0; k < ZONES.length; k++) {
        if (zw[k] <= 0) continue;
        const g = GRASS[ZONES[k].id];
        grassA.r += g[0].r * zw[k]; grassA.g += g[0].g * zw[k]; grassA.b += g[0].b * zw[k];
        grassB.r += g[1].r * zw[k]; grassB.g += g[1].g * zw[k]; grassB.b += g[1].b * zw[k];
        tw += zw[k];
      }
      if (wild > 0) {
        grassA.r += GRASS.wild[0].r * wild; grassA.g += GRASS.wild[0].g * wild; grassA.b += GRASS.wild[0].b * wild;
        grassB.r += GRASS.wild[1].r * wild; grassB.g += GRASS.wild[1].g * wild; grassB.b += GRASS.wild[1].b * wild;
        tw += wild;
      }
      grassA.multiplyScalar(1 / tw); grassB.multiplyScalar(1 / tw);
      const mix = clamp(nz * 0.6 + 0.5 + (rnd - 0.5) * 0.4, 0, 1);
      tmp.copy(grassA).lerp(grassB, mix);
      // Heidekraut auf den Klippen, Blumenwiese am Markt
      const nh = island.noise.detail(cx / 26 + 40, cz / 26);
      if (wKl > 0.3 && nh > 0.25) tmp.lerp(PAL.heather, smoothstep(0.25, 0.6, nh) * 0.55 * wKl);
      if (wMa > 0.3 && nh > 0.2) tmp.lerp(PAL.meadow, smoothstep(0.2, 0.6, nh) * 0.45 * wMa);
      // Vulkanhang: trockener nach oben
      if (dv < 80) tmp.lerp(PAL.ash, smoothstep(12, 26, h) * 0.6);
      // Übergang zum Sand
      if (h < 3.4) tmp.lerp(PAL.sandWarm, smoothstep(3.4, 1.8, h) * 0.35);
      // steilere Flächen dunkler/felsiger
      tmp.lerp(PAL.rockDark, smoothstep(0.86, 0.74, ny) * 0.35);
      smoothness = 0.12;
    }
    // Plätze (Pads) und Wegränder: glatt und ruhig
    smoothness = Math.max(smoothness, pw, pathW * 0.9);
    if (pw > 0) tmp.lerp(PAL.path, pw * 0.55);
    // Lava-Adern am oberen Kegel: Farbe je Fläche, Glühen je Eckpunkt (siehe veinAt)
    if (dv < 48 && h > 24 && dv >= vol.rimRadius) {
      const v = veinAt(cx, cz, h);
      if (v > 0.05) tmp.lerp(PAL.lavaRock, v * 0.6);
    }
    // Flächen-Variation (auf glatten Flächen fast keine)
    const v = 1 + (rnd - 0.5) * (0.12 - 0.09 * smoothness);
    tmp.multiplyScalar(v);
    return gl;
  }

  let fi = 0;
  function pushTri(ax, az, ay, bx, bz, by, cx, cz, cy) {
    va.set(ax, ay, az); vb.set(bx, by, bz); vc.set(cx, cy, cz);
    e1.subVectors(vb, va); e2.subVectors(vc, va);
    fn.crossVectors(e2, e1).normalize();
    if (fn.y < 0) fn.negate();
    const o = t * 9;
    pos[o] = ax; pos[o + 1] = ay; pos[o + 2] = az;
    pos[o + 3] = bx; pos[o + 4] = by; pos[o + 5] = bz;
    pos[o + 6] = cx; pos[o + 7] = cy; pos[o + 8] = cz;
    const mx = (ax + bx + cx) / 3, mz = (az + bz + cz) / 3, my = (ay + by + cy) / 3;
    const g = faceColor(mx, mz, my, fn.y, fi++);
    const sm = smoothness;
    for (let k = 0; k < 3; k++) {
      let nx = fn.x, nyy = fn.y, nzz = fn.z;
      if (sm > 0.01) {
        // weiche Normale am Eckpunkt einmischen
        island.getNormal(pos[o + k * 3], pos[o + k * 3 + 2], true, _sn);
        nx += (_sn.x - nx) * sm; nyy += (_sn.y - nyy) * sm; nzz += (_sn.z - nzz) * sm;
        const l = Math.hypot(nx, nyy, nzz) || 1;
        nx /= l; nyy /= l; nzz /= l;
      }
      nor[o + k * 3] = nx; nor[o + k * 3 + 1] = nyy; nor[o + k * 3 + 2] = nzz;
      col[o + k * 3] = tmp.r; col[o + k * 3 + 1] = tmp.g; col[o + k * 3 + 2] = tmp.b;
      glow[t * 3 + k] = Math.max(g, veinAt(pos[o + k * 3], pos[o + k * 3 + 2], pos[o + k * 3 + 1]));
    }
    t++;
  }

  for (let j = 0; j < n - 1; j++) {
    const z0 = -half + j * c, z1 = z0 + c;
    for (let i = 0; i < n - 1; i++) {
      if (!keep[j * (n - 1) + i]) continue;
      const x0 = -half + i * c, x1 = x0 + c;
      const ha = H(i, j), hb = H(i + 1, j), hc = H(i, j + 1), hd = H(i + 1, j + 1);
      // Gegen den Uhrzeigersinn von oben gesehen (Normalen nach oben)
      if (island.flipAt(i, j) === 0) {
        pushTri(x0, z0, ha, x0, z1, hc, x1, z0, hb);
        pushTri(x1, z0, hb, x0, z1, hc, x1, z1, hd);
      } else {
        pushTri(x0, z0, ha, x0, z1, hc, x1, z1, hd);
        pushTri(x0, z0, ha, x1, z1, hd, x1, z0, hb);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aGlow', new THREE.BufferAttribute(glow, 1));
  geo.computeBoundingSphere();

  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const lavaColor = { value: new THREE.Color('#ff5a1a') };
  veil.patch(mat, {
    key: 'terrain',
    uniforms: { uLavaColor: lavaColor },
    fragmentPars: 'uniform vec3 uLavaColor;\nvarying float vGlow;\n',
    vertex: (s) => s
      .replace('#include <common>', '#include <common>\nattribute float aGlow;\nvarying float vGlow;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;'),
    // Unterwasser-Tönung + Kaustik, Lava-Glühen
    beforeVeil: /* glsl */`
      {
        float uy = vVeilPos.y;
        if (uy < 0.15) {
          float dd = clamp(-uy / 5.0, 0.0, 1.0);
          outgoingLight *= mix(vec3(1.0), vec3(0.42, 0.78, 0.82), smoothstep(0.1, 1.0, dd + 0.25));
          vec2 cp = vVeilPos.xz * 0.55;
          float ca = sin(cp.x + uLumoTime * 1.3) + sin(cp.y * 1.1 - uLumoTime * 1.1) + sin((cp.x + cp.y) * 0.7 + uLumoTime * 0.9);
          float caus = pow(clamp(1.0 - abs(ca) * 0.55, 0.0, 1.0), 4.0);
          outgoingLight += vec3(0.55, 0.85, 0.8) * caus * 0.35 * (1.0 - dd) * step(uy, 0.0);
        }
      }
    `,
    afterVeil: /* glsl */`
      {
        float pulse = 0.75 + 0.25 * sin(uLumoTime * 1.7 + vVeilPos.x * 0.3 + vVeilPos.z * 0.2);
        outgoingLight += uLavaColor * vGlow * vGlow * 0.9 * pulse;
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = 'terrain';
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  return {
    mesh,
    material: mat,
    triangles: triCount,
    lavaColor,
  };
}
