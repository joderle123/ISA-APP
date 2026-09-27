// Gelände (Stil-Bibel §7): Farben je Raster-Eckpunkt (weiche Übergänge Sand → Wiese → Weg, drei Töne je Klasse, eine
// Makro-Variation aus dem Zonenrauschen), Umgebungsverdeckung (Mulden/Fußpunkte) in die Eckfarben gebacken, weiche
// Normalen auf Wiese/Sand/Weg/Torf (die Toon-Rampe ergibt dann gemalte Hügel), Facetten nur auf Fels/Klippe/Basalt.
// Nasse Sandkante an der Wasserlinie, Kaustik unter Wasser (zweitonig), Lava-Glühen im Krater und an den Adern.
// Schleier/Nebel/Toon-Licht über veil.patch() (Rampe „terrain“).
import * as THREE from 'three';
import { ZONES, FEATURES, SITES } from './island.js';
import { hash2, smoothstep, clamp, ridged } from './noise.js';

const C = (hex) => new THREE.Color(hex);
const PAL = {
  sandDry: C('#f7dfa8'), sandWarm: C('#e8c98a'), sandWet: C('#d9a96b'),
  under: C('#e0c690'), underDeep: C('#6f8f8a'),
  path: C('#dcb98a'), pathDark: C('#bd9868'),
  rock: C('#b39a86'), rockDark: C('#8d7868'),
  cliff: C('#8a8fa6'), cliffDark: C('#5a6080'),
  basalt: C('#4b3f3d'), basaltDark: C('#3a3038'), ash: C('#7a6358'),
  lavaRock: C('#5b2618'),
  heather: C('#a77fc8'), meadow: C('#e6cf5a'), moss: C('#6a8a62'),
  peat: C('#5c4f3a'), peatDark: C('#2f2820'), moorHeather: C('#8a5fb8'),
  tideRock: C('#3f5f66'), tideAlgae: C('#3c8a6e'), mineral: C('#f1e4c8'), mineralWarm: C('#e7a86a'),
  ao: C('#5a6a9a'),   // Verdeckung: kühl abgedunkelt, nie grau
};
// Wiesenpaletten je Zone [hell, dunkel] (§2.2 Boden)
const GRASS = {
  hafen: [C('#a6d65a'), C('#5f9e3c')],
  strand: [C('#b9dc62'), C('#7bb84a')],
  dschungel: [C('#6fa24e'), C('#3f6e3a')],
  klippen: [C('#86ab63'), C('#587a44')],
  markt: [C('#c8dc5c'), C('#8fb04a')],
  vulkan: [C('#93b54f'), C('#5e7a3a')],
  leuchtturm: [C('#a4d563'), C('#83c052')],
  moor: [C('#8e9a48'), C('#5c6a3a')],
  wild: [C('#8ccf4e'), C('#5e9e3e')],
};

export function createTerrain({ island, veil, quality }) {
  const { n, heights, half, cell: c } = island;
  const H = (i, j) => heights[j * n + i];
  const zw = new Float32Array(ZONES.length);
  const tmp = new THREE.Color();
  const tmp2 = new THREE.Color();
  const grassA = new THREE.Color(), grassB = new THREE.Color();
  const vol = FEATURES.volcano;
  const moor = FEATURES.moor;
  const tidePools = island.water ? island.water.byKind('gezeiten') : [];
  const springs = island.water ? island.water.byKind('quelle') : [];
  const pads = Object.values(SITES).filter((s) => s.r > 0);
  const _sn = { x: 0, y: 1, z: 0 };
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
  // Lava-Adern am oberen Kegel (0..0,6), stetig über Flächen hinweg
  function veinAt(x, z, h) {
    const dv = Math.hypot(x - vol.x, z - vol.z);
    if (dv >= 48 || dv < vol.rimRadius || h <= 24) return 0;
    const vein = ridged(island.noise.rock, x / 9 + 5, z / 9 - 2, 2);
    return smoothstep(0.5, 0.64, vein) * 0.6 * smoothstep(24, 33, h) * (1 - smoothstep(38, 48, dv));
  }
  // Umgebungsverdeckung aus der Höhenkarte: Mulden und Fußpunkte von Hängen liegen tiefer als ihre Umgebung
  function occlusionAt(x, z, h) {
    let occ = 0;
    for (const r of [3.5, 7]) {
      let sum = 0;
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + r;
        sum += island.getHeight(x + Math.cos(a) * r, z + Math.sin(a) * r);
      }
      const d = sum / 6 - h;
      occ += clamp(d / (r * 0.55), 0, 1) * (r < 5 ? 0.6 : 0.4);
    }
    return clamp(occ, 0, 1);
  }

  // ---- Farbe je Eckpunkt. Rückgabe: Glühen; Nebenwirkung: tmp = Farbe, smoothness, facet (Fels-Facetten) ----
  let smoothness = 0, facet = 0;
  function vertexColor(cx, cz, h, ny) {
    const nz = island.noise.zone(cx / 18, cz / 18);
    const macro = 1 + nz * 0.06;                       // ±6 % Makro-Variation (§7)
    const s = island.surfaceAt(cx, cz, h, ny);
    island.zoneWeights(cx, cz, zw);
    let wsum = 0; for (let k = 0; k < zw.length; k++) wsum += zw[k];
    const wild = Math.max(0, 1 - wsum);
    const wKl = zw[3], wVu = zw[5], wMa = zw[4];
    const dv = Math.hypot(cx - vol.x, cz - vol.z);
    const pw = padWeight(cx, cz);
    const pathW = island.pathWeight(cx, cz);
    let gl = 0;
    smoothness = 0; facet = 0;
    if (dv < vol.rimRadius) {
      tmp.copy(PAL.lavaRock).lerp(PAL.basaltDark, 0.3 + nz * 0.2);
      gl = smoothstep(vol.lavaLevel + 4.5, vol.lavaLevel - 0.5, h);
      facet = 0.12;
      return gl;
    }
    const wMo = zw[ZONES.length - 1] || 0;   // Moor (letzte Zone)
    if (s === 'water') {
      const d = clamp(-h / 9, 0, 1);
      tmp.copy(PAL.under).lerp(PAL.underDeep, d);
      const b = island.water ? island.water.bodyAt(cx, cz, 0.6) : null;
      if (b && b.kind === 'moor') tmp.copy(PAL.peatDark).lerp(PAL.peat, 0.35);
      else if (b && b.kind === 'quelle') tmp.copy(PAL.mineralWarm).lerp(PAL.mineral, clamp(1 - (b.level - h) / 1.2, 0, 1) * 0.8);
      else if (b && b.kind === 'gezeiten') tmp.copy(PAL.tideRock).lerp(PAL.tideAlgae, 0.3 + nz * 0.2);
      smoothness = 0.75;
    } else if (s === 'moor') {
      const nm = island.noise.detail(cx / 6 + 70, cz / 6 - 30) * 0.5 + 0.5;
      tmp.copy(PAL.peat).lerp(PAL.peatDark, nm * 0.55);
      if (nm > 0.6) tmp.lerp(PAL.moorHeather, smoothstep(0.6, 0.85, nm) * 0.35);
      smoothness = 0.7;
    } else if (s === 'sand') {
      // trocken oben, warm in der Mitte, nasse Kante (1 m) an der Wasserlinie
      tmp.copy(PAL.sandWarm).lerp(PAL.sandDry, smoothstep(0.6, 2.2, h));
      tmp.lerp(PAL.sandWet, smoothstep(0.9, 0.15, h));
      smoothness = 0.9;
    } else if (s === 'rock' || s === 'ash') {
      if (s === 'ash' || wVu > 0.5) {
        const top = smoothstep(22, 44, h);
        tmp.copy(PAL.ash).lerp(PAL.basalt, top);
      } else {
        tmp.copy(PAL.rock);
        tmp2.copy(PAL.cliff);
        tmp.lerp(tmp2, clamp(wKl * 1.3, 0, 1));
      }
      // Moos-Kante auf flacheren Felsen (Wiese → Fels über die Neigung, §7)
      if (s === 'rock' && h > 3) tmp.lerp(PAL.moss, smoothstep(0.66, 0.8, ny) * 0.5 * (1 - wVu));
      facet = 0.12;
      smoothness = 0;
    } else {
      // Wiese: Zonenmischung, zwei Töne über das Zonenrauschen (kein Zufall je Dreieck)
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
      const n2 = island.noise.detail(cx / 9 + 21, cz / 9 - 4);
      const mix = clamp(0.5 + nz * 0.45 + n2 * 0.15, 0, 1);
      tmp.copy(grassA).lerp(grassB, mix);
      // Heidekraut auf den Klippen, Blumenwiese am Markt
      const nh = island.noise.detail(cx / 26 + 40, cz / 26);
      if (wKl > 0.3 && nh > 0.25) tmp.lerp(PAL.heather, smoothstep(0.25, 0.6, nh) * 0.45 * wKl);
      if (wMa > 0.3 && nh > 0.2) tmp.lerp(PAL.meadow, smoothstep(0.2, 0.6, nh) * 0.4 * wMa);
      // Vulkanhang: trockener nach oben
      if (dv < 80) tmp.lerp(PAL.ash, smoothstep(12, 26, h) * 0.6);
      // Übergang zum Sand (3 m weich)
      if (h < 3.6) tmp.lerp(PAL.sandWarm, smoothstep(3.6, 1.6, h) * 0.5);
      // steilere Flächen felsiger, mit Moos-Kante
      tmp.lerp(PAL.moss, smoothstep(0.86, 0.78, ny) * 0.4);
      tmp.lerp(PAL.rockDark, smoothstep(0.8, 0.74, ny) * 0.4);
      // Moorrand: Gras wird zu Torf und lila Heide
      if (wMo > 0.2) {
        const dm = Math.hypot(cx - moor.x, cz - moor.z);
        tmp.lerp(PAL.peat, smoothstep(moor.r + 4, moor.r - 6, dm) * 0.5 * wMo);
        if (nh > 0.15) tmp.lerp(PAL.moorHeather, smoothstep(0.15, 0.55, nh) * 0.45 * wMo);
      }
      smoothness = 0.78;
    }
    // Wege (§7): 2.4 m hell mit weichem dunklem Saum, kein Rauschen – über die Klassen hinweg eingemischt
    if (pathW > 0.02 && s !== 'water') {
      const core = smoothstep(0.55, 0.95, pathW);
      tmp2.copy(PAL.pathDark).lerp(PAL.path, core);
      tmp.lerp(tmp2, smoothstep(0.05, 0.5, pathW));
      smoothness = Math.max(smoothness, pathW * 0.9);
      facet *= 1 - pathW;
    }
    // Gezeitenbecken: dunkler, nasser Fels mit Algen auf der Schale
    for (let i = 0; i < tidePools.length; i++) {
      const b = tidePools[i];
      const t = Math.hypot(cx - b.x, cz - b.z) / b.r;
      if (t < 1.75 && s !== 'water') { const k = 1 - smoothstep(1.3, 1.75, t); tmp.lerp(PAL.tideRock, k * 0.85).lerp(PAL.tideAlgae, k * 0.3 * smoothstep(1.35, 0.95, t)); smoothness = Math.max(smoothness, 0.3); }
    }
    // Quellen: Mineralterrassen (hell, nach innen warm orange)
    for (let i = 0; i < springs.length; i++) {
      const b = springs[i];
      const d = Math.hypot(cx - b.x, cz - b.z);
      if (d < b.r + 6 && s !== 'water') { const k = smoothstep(b.r + 6, b.r + 1, d); tmp.lerp(PAL.mineral, k * 0.8).lerp(PAL.mineralWarm, k * smoothstep(b.r + 2, b.r - 0.5, d) * 0.7); smoothness = Math.max(smoothness, 0.6); facet = 0; }
    }
    // Plätze (Pads): glatt und ruhig
    smoothness = Math.max(smoothness, pw);
    if (pw > 0) { tmp.lerp(PAL.path, pw * 0.5); facet *= 1 - pw; }
    // Lava-Adern am oberen Kegel
    if (dv < 48 && h > 24 && dv >= vol.rimRadius) {
      const v = veinAt(cx, cz, h);
      if (v > 0.05) tmp.lerp(PAL.lavaRock, v * 0.6);
    }
    // Makro-Variation + Umgebungsverdeckung (kühl abgedunkelt)
    tmp.multiplyScalar(macro);
    const occ = occlusionAt(cx, cz, h) * (s === 'water' ? 0.4 : 1);
    if (occ > 0.01) { tmp2.copy(tmp).multiply(PAL.ao).multiplyScalar(1.6); tmp.lerp(tmp2, occ * 0.55); }
    return gl;
  }

  // ---- Eckpunkte des Rasters einmal auswerten ----
  const vCol = new Float32Array(n * n * 3);
  const vSmooth = new Float32Array(n * n);
  const vFacet = new Float32Array(n * n);
  const vGlow = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    const z = -half + j * c;
    for (let i = 0; i < n; i++) {
      const x = -half + i * c;
      const h = H(i, j);
      const vi = j * n + i;
      if (h <= -8) { vCol[vi * 3] = PAL.underDeep.r; vCol[vi * 3 + 1] = PAL.underDeep.g; vCol[vi * 3 + 2] = PAL.underDeep.b; vSmooth[vi] = 0.75; continue; }
      island.getNormal(x, z, true, _sn);
      const g = vertexColor(x, z, h, _sn.y);
      vCol[vi * 3] = tmp.r; vCol[vi * 3 + 1] = tmp.g; vCol[vi * 3 + 2] = tmp.b;
      vSmooth[vi] = smoothness; vFacet[vi] = facet;
      vGlow[vi] = Math.max(g, veinAt(x, z, h));
    }
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

  let fi = 0;
  // Dreieck aus drei Rasterindizes (ia, ja …): Farben/Normalen der Eckpunkte, Facetten-Variation je Fläche auf Fels
  function pushTri(ia, ja, ib, jb, ic, jc) {
    const idx = [ja * n + ia, jb * n + ib, jc * n + ic];
    const ax = -half + ia * c, az = -half + ja * c, ay = H(ia, ja);
    const bx = -half + ib * c, bz = -half + jb * c, by = H(ib, jb);
    const cx = -half + ic * c, cz = -half + jc * c, cy = H(ic, jc);
    va.set(ax, ay, az); vb.set(bx, by, bz); vc.set(cx, cy, cz);
    e1.subVectors(vb, va); e2.subVectors(vc, va);
    fn.crossVectors(e2, e1).normalize();
    if (fn.y < 0) fn.negate();
    const o = t * 9;
    pos[o] = ax; pos[o + 1] = ay; pos[o + 2] = az;
    pos[o + 3] = bx; pos[o + 4] = by; pos[o + 5] = bz;
    pos[o + 6] = cx; pos[o + 7] = cy; pos[o + 8] = cz;
    const sm = (vSmooth[idx[0]] + vSmooth[idx[1]] + vSmooth[idx[2]]) / 3;
    const fc = (vFacet[idx[0]] + vFacet[idx[1]] + vFacet[idx[2]]) / 3;
    const rnd = hash2(fi++, 17, 3);
    const fv = 1 + (rnd - 0.5) * (fc + 0.03 * (1 - sm));   // ≤ ±0.04 auf glatten Flächen, 0.12 auf Fels
    // Facettige Flächen: Farbe je Dreieck gemittelt (klare Facetten), glatte: je Eckpunkt (weiche Verläufe)
    let mr = 0, mg = 0, mb = 0;
    for (let k = 0; k < 3; k++) { mr += vCol[idx[k] * 3]; mg += vCol[idx[k] * 3 + 1]; mb += vCol[idx[k] * 3 + 2]; }
    mr /= 3; mg /= 3; mb /= 3;
    for (let k = 0; k < 3; k++) {
      let nx = fn.x, nyy = fn.y, nzz = fn.z;
      if (sm > 0.01) {
        island.getNormal(pos[o + k * 3], pos[o + k * 3 + 2], true, _sn);
        nx += (_sn.x - nx) * sm; nyy += (_sn.y - nyy) * sm; nzz += (_sn.z - nzz) * sm;
        const l = Math.hypot(nx, nyy, nzz) || 1;
        nx /= l; nyy /= l; nzz /= l;
      }
      nor[o + k * 3] = nx; nor[o + k * 3 + 1] = nyy; nor[o + k * 3 + 2] = nzz;
      const vi = idx[k];
      const r = vCol[vi * 3] + (mr - vCol[vi * 3]) * (1 - sm), g = vCol[vi * 3 + 1] + (mg - vCol[vi * 3 + 1]) * (1 - sm), b = vCol[vi * 3 + 2] + (mb - vCol[vi * 3 + 2]) * (1 - sm);
      col[o + k * 3] = r * fv; col[o + k * 3 + 1] = g * fv; col[o + k * 3 + 2] = b * fv;
      glow[t * 3 + k] = vGlow[vi];
    }
    t++;
  }

  for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < n - 1; i++) {
      if (!keep[j * (n - 1) + i]) continue;
      // Gegen den Uhrzeigersinn von oben gesehen (Normalen nach oben)
      if (island.flipAt(i, j) === 0) {
        pushTri(i, j, i, j + 1, i + 1, j);
        pushTri(i + 1, j, i, j + 1, i + 1, j + 1);
      } else {
        pushTri(i, j, i, j + 1, i + 1, j + 1);
        pushTri(i, j, i + 1, j + 1, i + 1, j);
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
    ramp: 'terrain',
    uniforms: { uLavaColor: lavaColor },
    fragmentPars: 'uniform vec3 uLavaColor;\nvarying float vGlow;\n',
    vertex: (s) => s
      .replace('#include <common>', '#include <common>\nattribute float aGlow;\nvarying float vGlow;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;'),
    // Unterwasser-Tönung + zweitonige Kaustik (§5.4), Lava-Glühen
    beforeVeil: /* glsl */`
      {
        float uy = vVeilPos.y;
        if (uy < 0.15) {
          float dd = clamp(-uy / 5.0, 0.0, 1.0);
          outgoingLight *= mix(vec3(1.0), vec3(0.42, 0.78, 0.82), smoothstep(0.1, 1.0, dd + 0.25));
          vec2 cp = vVeilPos.xz * 0.55;
          float ca = sin(cp.x + uLumoTime * 1.3) + sin(cp.y * 1.1 - uLumoTime * 1.1) + sin((cp.x + cp.y) * 0.7 + uLumoTime * 0.9);
          float caus = smoothstep(0.45, 0.6, 1.0 - abs(ca) * 0.55);
          outgoingLight += vec3(0.56, 0.91, 0.88) * caus * 0.3 * (1.0 - dd) * step(uy, 0.0);
        }
      }
    `,
    afterVeil: /* glsl */`
      {
        float pulse = 0.75 + 0.25 * sin(uLumoTime * 1.7 + vVeilPos.x * 0.3 + vVeilPos.z * 0.2);
        outgoingLight += uLavaColor * vGlow * vGlow * 2.2 * pulse;
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
