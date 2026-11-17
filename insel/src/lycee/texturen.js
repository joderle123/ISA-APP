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
export function flaeche(tex, x0, x1, z0, z1, y, kachel) {
  const t = tex.clone(); t.needsUpdate = true; t.repeat.set((x1 - x0) / kachel, (z1 - z0) / kachel);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshLambertMaterial({ map: t }));
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
