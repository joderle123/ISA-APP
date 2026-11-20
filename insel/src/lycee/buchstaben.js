// S-K-A-T-E im Skatepark Junglinster (Auftrag 20.11.: „spaßiger“): fünf Buchstaben schweben über Rampen, Rail und Box.
// Nur auf dem Brett und nur mit Sprung erreichbar. Erste Runde: einsammeln (bleibt gespeichert) → neues Brett.
// Danach: Zeitjagd – die Uhr startet beim ersten Buchstaben, Rekord wird gemerkt.
import * as THREE from 'three';

export const SKATE_BUCHSTABEN = [['S', 83.6, 77.6, 1.75], ['K', 88.0, 79.6, 1.95], ['A', 92.5, 78.2, 1.8], ['T', 97.6, 77.0, 1.65], ['E', 102.2, 77.6, 1.95]];

export function createBuchstaben({ scene, steuerung, ui, ton = () => {}, vib = () => {}, zustand, sichern, belohnung = () => {} }) {
  const liste = SKATE_BUCHSTABEN.map(([b, x, z, y], i) => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d');
    g.font = '900 112px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 14; g.strokeStyle = '#2b2b33'; g.strokeText(b, 64, 70); g.fillStyle = '#ffd166'; g.fillText(b, 64, 70);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false })); m.scale.set(1.0, 1.0, 1);   // Sprite: nie spiegelverkehrt
    m.position.set(x, y, z); m.visible = false; m.name = 'skatebuchstabe'; scene.add(m);
    return { b, x, z, y, m, i };
  });
  let jagd = null, uhr = 0;
  const merke = () => { const S = zustand(); return S.merke; };
  function tick(dt, aktiv) {
    const M = merke(); if (!M) return;
    const hab = M.skate5 || '', fertig = hab.length >= 5;
    const p = steuerung.pos, imPark = p.x > 77 && p.x < 107 && p.z > 73 && p.z < 82.5;
    uhr += dt;
    for (const L of liste) {
      const weg = fertig ? (jagd ? jagd.hab.includes(L.b) : false) : hab.includes(L.b);
      L.m.visible = aktiv && !weg && Math.hypot(p.x - L.x, p.z - L.z) < 60;
      if (!L.m.visible) continue;
      const w = 1 + Math.sin(uhr * 3 + L.i) * 0.08; L.m.scale.set(w, w, 1); L.m.position.y = L.y + Math.sin(uhr * 2.4 + L.i) * 0.08;
      const brett = steuerung.brett && steuerung.brett.mesh;
      if (!brett || !imPark) continue;
      const kopf = (p.y || 0) + 0.95;
      if (Math.hypot(p.x - L.x, p.z - L.z) < 0.85 && Math.abs(kopf - L.y) < 0.5) {
        ton('pling'); vib(14);
        if (!fertig) {
          M.skate5 = hab + L.b; const n = M.skate5.length;
          ui.skate({ trick: '🔤 ' + L.b + '!  ' + 'SKATE'.split('').map((c) => (M.skate5.includes(c) ? c : '·')).join(' ') });
          if (n >= 5) { ton('melodie2'); belohnung('erst'); }
          sichern(); return;
        }
        if (!jagd) jagd = { t: 0, hab: '' };
        jagd.hab += L.b;
        ui.skate({ trick: '🔤 ' + L.b + ' · ' + jagd.hab.length + '/5' });
        if (jagd.hab.length >= 5) {
          const t = jagd.t, alt = M.skate5Rekord, neu = !alt || t < alt; if (neu) M.skate5Rekord = t;
          ton('melodie2'); ui.skate({ trick: '🏆 S-K-A-T-E in ' + t.toFixed(1) + ' s' + (neu ? ' – Rekord!' : ' · Rekord ' + alt.toFixed(1) + ' s') });
          jagd = null; sichern(); if (neu) belohnung('rekord');
        }
        return;
      }
    }
    if (jagd) {
      jagd.t += dt;
      ui.skate({ ziel: '🔤 S-K-A-T-E · ' + jagd.t.toFixed(1) + ' s' });
      if (jagd.t > 90 || !imPark || !steuerung.brett) { jagd = null; ui.skate({ trick: 'S-K-A-T-E abgebrochen – nochmal!' }); }
    }
  }
  return { tick, liste, get jagd() { return jagd; } };
}
