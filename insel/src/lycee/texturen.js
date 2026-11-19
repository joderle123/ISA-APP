// Lycée-Simulator – gemalte Oberflächen ohne Bilddateien (alles im Browser erzeugt, kein Netz):
// Verbundpflaster für den Hof, Rasen, Asphalt und ein weicher Schatten unter den Figuren.
// Gleichmäßiger Zufall (fester Startwert), damit jedes Gerät dasselbe Bild zeigt.
import * as THREE from 'three';

function zufall(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function leinwand(n) { const c = document.createElement('canvas'); c.width = c.height = n; return c; }
function textur(c, wdh) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(wdh[0], wdh[1]);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
const hex = (r, g, b) => 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';

// Verbundpflaster: Reihen versetzter Steine (0,2 × 0,4 m), jeder Stein leicht anders, dunkle Fugen, feine Körnung,
// ein paar Flecken. Eine Kachel = 8 × 8 m.
export function pflaster(wdh = [1, 1]) {
  const N = 1024, c = leinwand(N), g = c.getContext('2d'), r = zufall(7);
  g.fillStyle = '#a99d88'; g.fillRect(0, 0, N, N);                    // Fugen
  const reihe = N / 40, stein = N / 20, fuge = 2;
  for (let y = 0; y < 40; y++) {
    const off = (y % 2) * stein / 2;
    for (let x = -1; x < 21; x++) {
      const t = 0.95 + r() * 0.09, w = r() < 0.04 ? 0.9 : 1;            // manche Steine etwas dunkler (älter)
      g.fillStyle = hex(216 * t * w, 204 * t * w, 182 * t * w);
      g.fillRect(x * stein + off + fuge / 2, y * reihe + fuge / 2, stein - fuge, reihe - fuge);
    }
  }
  // Körnung
  const img = g.getImageData(0, 0, N, N), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const k = (r() - 0.5) * 12; d[i] += k; d[i + 1] += k; d[i + 2] += k; }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 14; i++) { const x = r() * N, y = r() * N, rr = 80 + r() * 160, v = g.createRadialGradient(x, y, 0, x, y, rr); v.addColorStop(0, r() < 0.5 ? 'rgba(120,105,85,0.10)' : 'rgba(255,245,225,0.10)'); v.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = v; g.fillRect(0, 0, N, N); }
  // Flecken (Kaugummi, Regenränder)
  for (let i = 0; i < 70; i++) { g.fillStyle = 'rgba(60,55,50,' + (0.05 + r() * 0.12) + ')'; g.beginPath(); g.arc(r() * N, r() * N, 1.5 + r() * (i < 10 ? 26 : 3), 0, Math.PI * 2); g.fill(); }
  return textur(c, wdh);
}

// Rasen: viele kurze Halme in Grüntönen über einem fleckigen Grund. Eine Kachel = 6 × 6 m.
export function rasen(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(11);
  g.fillStyle = '#7fb069'; g.fillRect(0, 0, N, N);
  for (let i = 0; i < 260; i++) { g.fillStyle = r() < 0.5 ? 'rgba(98,150,80,0.35)' : 'rgba(150,190,110,0.3)'; g.beginPath(); g.arc(r() * N, r() * N, 8 + r() * 40, 0, Math.PI * 2); g.fill(); }
  g.lineWidth = 1.2;
  for (let i = 0; i < 9000; i++) {
    const x = r() * N, y = r() * N, l = 3 + r() * 6, a = -Math.PI / 2 + (r() - 0.5) * 0.9;
    const t = 0.75 + r() * 0.5; g.strokeStyle = hex(110 * t, 165 * t, 90 * t);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  return textur(c, wdh);
}

// Asphalt: dunkles Grau mit hellen und dunklen Körnern. Eine Kachel = 4 × 4 m.
export function asphalt(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(5);
  g.fillStyle = '#5d616b'; g.fillRect(0, 0, N, N);
  const img = g.getImageData(0, 0, N, N), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const k = (r() - 0.5) * 30 + (r() < 0.02 ? 40 : 0); d[i] += k; d[i + 1] += k; d[i + 2] += k; }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 12; i++) { g.strokeStyle = 'rgba(40,42,48,0.5)'; g.lineWidth = 1; g.beginPath(); let x = r() * N, y = r() * N; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - 0.5) * 40; y += (r() - 0.5) * 40; g.lineTo(x, y); } g.stroke(); }
  return textur(c, wdh);
}

// Fläche mit Textur (liegt flach, empfängt Schatten). Kachelgröße in Metern.
export const WOLKEN = { value: 0 };
const WOLKEN_GLSL = `
float wkH(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float wkN(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(wkH(i), wkH(i + vec2(1.0, 0.0)), f.x), mix(wkH(i + vec2(0.0, 1.0)), wkH(i + vec2(1.0, 1.0)), f.x), f.y); }
float wolke(vec2 p) { p = p * 0.04 + vec2(uWolken * 0.03, uWolken * 0.012);
  float n = wkN(p) * 0.65 + wkN(p * 2.3 + 7.1) * 0.35; return mix(1.0, 0.8, smoothstep(0.455, 0.53, n)); }
`;
export function flaeche(tex, x0, x1, z0, z1, y, kachel, { wolken = false } = {}) {
  const t = tex.clone(); t.needsUpdate = true; t.repeat.set((x1 - x0) / kachel, (z1 - z0) / kachel);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshLambertMaterial({ map: t }));
  if (wolken) {
    m.material.onBeforeCompile = (sh) => {
      sh.uniforms.uWolken = WOLKEN;
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vWkPos;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWkPos = (modelMatrix * vec4(transformed, 1.0)).xz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec2 vWkPos;\nuniform float uWolken;' + WOLKEN_GLSL).replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb *= wolke(vWkPos);');
    };
    m.material.customProgramCacheKey = () => 'boden-wolken';
  }
  m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  m.receiveShadow = true; m.name = 'boden';
  return m;
}

// Weicher runder Schatten unter einer Figur (wirkt „auf dem Boden“, auch drinnen ohne Sonnenschatten)
let _schattenMat = null;
export function fussSchatten(radius = 0.42) {
  if (!_schattenMat) {
    const c = leinwand(128), g = c.getContext('2d');
    const v = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    v.addColorStop(0, 'rgba(20,24,36,0.55)'); v.addColorStop(0.55, 'rgba(20,24,36,0.25)'); v.addColorStop(1, 'rgba(20,24,36,0)');
    g.fillStyle = v; g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    _schattenMat = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), _schattenMat);
  m.rotation.x = -Math.PI / 2; m.position.y = 0.115; m.renderOrder = 1; m.name = 'fussschatten';
  return m;
}

// Fliesen für Halle, Gang, Kantine, WC: zwei Töne im Wechsel, feine Fugen, leichter Glanzfleck. Eine Kachel = 2 Fliesen.
export function fliesen(f1, f2, wdh = [1, 1]) {
  const N = 256, c = leinwand(N), g = c.getContext('2d'), r = zufall(3);
  g.fillStyle = '#a7a196'; g.fillRect(0, 0, N, N);
  for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
    g.fillStyle = (x + y) % 2 ? f2 : f1; g.fillRect(x * 128 + 1.5, y * 128 + 1.5, 125, 125);
    const v = g.createLinearGradient(x * 128, y * 128, x * 128 + 128, y * 128 + 128); v.addColorStop(0, 'rgba(255,255,255,0.10)'); v.addColorStop(1, 'rgba(0,0,0,0.04)'); g.fillStyle = v; g.fillRect(x * 128 + 1.5, y * 128 + 1.5, 125, 125);
  }
  const img = g.getImageData(0, 0, N, N), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const k = (r() - 0.5) * 8; d[i] += k; d[i + 1] += k; d[i + 2] += k; }
  g.putImageData(img, 0, 0);
  return textur(c, wdh);
}

// Linoleum/Parkett-Optik für Klassenräume: längliche Dielen in warmen Tönen. Eine Kachel = 4 × 4 m.
export function dielen(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(9);
  g.fillStyle = '#8a6a48'; g.fillRect(0, 0, N, N);
  const breit = N / 16;
  for (let i = 0; i < 16; i++) {
    let y = -r() * N;
    while (y < N) {
      const l = N * (0.35 + r() * 0.4), t = 0.9 + r() * 0.18;
      g.fillStyle = hex(200 * t, 160 * t, 116 * t); g.fillRect(i * breit + 1, y + 1, breit - 2, l - 2);
      g.strokeStyle = 'rgba(120,85,50,0.18)'; g.lineWidth = 1;
      for (let k = 0; k < 3; k++) { const xx = i * breit + 4 + r() * (breit - 8); g.beginPath(); g.moveTo(xx, y + 2); g.lineTo(xx + (r() - 0.5) * 3, y + l - 2); g.stroke(); }
      y += l;
    }
  }
  return textur(c, wdh);
}

// Sporthallen-Parkett: helles Ahorn in schmalen Stäben, Fugen, leichter Glanzschimmer, ein paar Abriebspuren. Eine Kachel = 4 × 4 m.
export function sportParkett(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(17);
  g.fillStyle = '#b98f5c'; g.fillRect(0, 0, N, N);
  const breit = N / 24;
  for (let i = 0; i < 24; i++) {
    let y = -r() * N;
    while (y < N) {
      const l = N * (0.22 + r() * 0.3), t = 0.93 + r() * 0.12;
      g.fillStyle = hex(226 * t, 186 * t, 134 * t); g.fillRect(i * breit + 0.5, y + 0.5, breit - 1, l - 1);
      g.strokeStyle = 'rgba(150,105,60,0.14)'; g.lineWidth = 1;
      for (let k = 0; k < 2; k++) { const xx = i * breit + 3 + r() * (breit - 6); g.beginPath(); g.moveTo(xx, y + 2); g.lineTo(xx + (r() - 0.5) * 2, y + l - 2); g.stroke(); }
      y += l;
    }
  }
  // Glanz: breite helle Bahnen (wie Licht von den Fenstern auf Lack)
  const gr = g.createLinearGradient(0, 0, N, N);
  gr.addColorStop(0, 'rgba(255,255,255,0.05)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.11)'); gr.addColorStop(1, 'rgba(255,255,255,0.03)');
  g.fillStyle = gr; g.fillRect(0, 0, N, N);
  // Abrieb: ein paar dunkle Schuhspuren
  for (let k = 0; k < 14; k++) { g.strokeStyle = 'rgba(60,40,25,' + (0.05 + r() * 0.06) + ')'; g.lineWidth = 1 + r() * 2; const x = r() * N, y = r() * N; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + (r() - 0.5) * 40, y + (r() - 0.5) * 40, x + (r() - 0.5) * 60, y + (r() - 0.5) * 60); g.stroke(); }
  return textur(c, wdh);
}

// Schieferdach: überlappende Reihen kleiner Platten, leicht verschiedene Blautöne. Eine Kachel = 4 × 4 m.
export function schiefer(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(21);
  g.fillStyle = '#2c3146'; g.fillRect(0, 0, N, N);
  const reihe = N / 16, platte = N / 12;
  for (let y = 0; y < 16; y++) {
    const off = (y % 2) * platte / 2;
    for (let x = -1; x < 13; x++) {
      const t = 0.85 + r() * 0.3;
      g.fillStyle = hex(70 * t, 78 * t, 104 * t);
      g.beginPath();
      const x0 = x * platte + off + 1, y0 = y * reihe + 1, w = platte - 2, h = reihe * 1.25;
      g.moveTo(x0, y0); g.lineTo(x0 + w, y0); g.lineTo(x0 + w, y0 + h - 4); g.quadraticCurveTo(x0 + w / 2, y0 + h + 3, x0, y0 + h - 4); g.closePath(); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.06)'; g.fillRect(x0, y0, w, 2);
    }
  }
  return textur(c, wdh);
}

// Bücherrücken für hohe Regale (statt tausender Kästen): Reihen bunter Rücken auf dunklem Holz. Eine Kachel = 2 × 2 m.
export function buecher(wdh = [1, 1]) {
  const N = 512, c = leinwand(N), g = c.getContext('2d'), r = zufall(31);
  const farben = ['#8e2f2a', '#2f5d8a', '#c9a227', '#2e7d4f', '#5b3f78', '#b35a2a', '#e8e1cf', '#22324e', '#7a2b48', '#3b6e6a'];
  g.fillStyle = '#5a3a22'; g.fillRect(0, 0, N, N);
  const fach = N / 5;
  for (let f = 0; f < 5; f++) {
    let x = 3; const boden = (f + 1) * fach - 10;
    g.fillStyle = '#7a5232'; g.fillRect(0, boden, N, 10);
    while (x < N - 6) {
      const w = 7 + r() * 13, h = fach * (0.55 + r() * 0.35);
      if (r() < 0.06) { x += 10; continue; }   // Lücke
      g.fillStyle = farben[Math.floor(r() * farben.length)]; g.fillRect(x, boden - h, w, h);
      g.fillStyle = 'rgba(255,230,150,0.55)'; if (r() < 0.6) g.fillRect(x + 1, boden - h * 0.75, w - 2, 2);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(x + w - 1.5, boden - h, 1.5, h);
      x += w + 0.8;
    }
  }
  return textur(c, wdh);
}

// Senkrechte Fläche mit Textur (z. B. Bücherwand). achse 'x': Fläche längs x bei z = fest, blickt nach +z (s = 1) oder −z (s = −1).
export function wandFlaeche(tex, achse, fest, a0, a1, y0, y1, s, kachel) {
  const t = tex.clone(); t.needsUpdate = true; t.repeat.set(Math.abs(a1 - a0) / kachel, (y1 - y0) / kachel);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(Math.abs(a1 - a0), y1 - y0), new THREE.MeshLambertMaterial({ map: t }));
  if (achse === 'x') { m.position.set((a0 + a1) / 2, (y0 + y1) / 2, fest); m.rotation.y = s > 0 ? 0 : Math.PI; }
  else { m.position.set(fest, (y0 + y1) / 2, (a0 + a1) / 2); m.rotation.y = s > 0 ? Math.PI / 2 : -Math.PI / 2; }
  m.receiveShadow = true; m.name = 'wandbild';
  return m;
}

// Schräge Dachfläche mit Textur (für Satteldächer): von der Traufe (y0, z0) bis zum First (y1, z1), Breite x0 … x1.
export function dachFlaeche(tex, x0, x1, zTraufe, yTraufe, zFirst, yFirst, kachel = 4) {
  const lang = Math.hypot(zFirst - zTraufe, yFirst - yTraufe);
  const t = tex.clone(); t.needsUpdate = true; t.repeat.set((x1 - x0) / kachel, lang / kachel);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, lang), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
  m.position.set((x0 + x1) / 2, (yTraufe + yFirst) / 2, (zTraufe + zFirst) / 2);
  const neig = Math.atan2(yFirst - yTraufe, Math.abs(zFirst - zTraufe));
  m.rotation.order = 'YXZ'; m.rotation.y = zFirst > zTraufe ? Math.PI : 0; m.rotation.x = -Math.PI / 2 + neig;
  m.castShadow = false; m.receiveShadow = true; m.name = 'dach';
  return m;
}
