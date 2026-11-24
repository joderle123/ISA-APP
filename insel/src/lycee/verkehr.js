// Leben im Dorf (Wochenplan Tag 1): Autos fahren mit Tempo 30 über die Hauptstraße – in beiden Richtungen.
// Sie halten, wenn vor ihnen jemand steht oder fährt (Spielfigur, Leute, Trottinette) und fahren dann weiter.
// Spielfigur kann nicht durch Autos laufen (steuerung.autos: Kreise je Auto). Im Gespräch stehen sie still.
import * as THREE from 'three';

const SPUREN = [{ z: 46.4, r: 1 }, { z: 49.6, r: -1 }];   // r = 1: nach Osten (+x), −1: nach Westen
const X0 = -104, X1 = 104, TEMPO = 8.3, BLICK = 8;

export function createVerkehr({ scene, geo, stelle, material, steuerung, personen = () => [] }) {
  const MODELLE = [['auto2/limo-blau', null], ['auto2/kompakt-rot', null], ['auto2/suv-grau', null], ['auto2/taxi', null], ['auto2/bus-weiss', null], ['auto2/kompakt-silber', null]].filter(([m]) => geo[m]);
  const autos = [];
  if (!MODELLE.length) return { tick() {}, autos };
  const plaetze = [[0, -70], [0, 10], [0, 75], [1, -30], [1, 45]];
  plaetze.forEach(([s, x], i) => {
    const [m, farbe] = MODELLE[i % MODELLE.length], sp = SPUREN[s];
    const g = stelle(geo[m], { x: 0, z: 0, rot: 0, farbe });   // eigene Autos haben schon echte Größe (Meter)
    g.computeBoundingBox(); const bb = g.boundingBox, lang = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z), laengsX = bb.max.x - bb.min.x > bb.max.z - bb.min.z;
    const mesh = new THREE.Mesh(g, material); mesh.castShadow = true; mesh.name = 'auto';
    // Modell zeigt längs z (Kenney) → so drehen, dass es in Fahrtrichtung zeigt
    mesh.rotation.y = laengsX ? (sp.r > 0 ? 0 : Math.PI) : (sp.r > 0 ? Math.PI / 2 : -Math.PI / 2);
    mesh.position.set(x, 0, sp.z); scene.add(mesh);
    autos.push({ mesh, sp, v: TEMPO, lang, hupe: 0 });
  });
  steuerung.autos = [];
  function tick(dt, still) {
    dt = Math.min(dt, 0.1);
    const leute = personen(), ich = steuerung.pos, kreise = [];
    for (const a of autos) {
      const p = a.mesh.position;
      // frei vor mir? Personen und Autos in der Spur, innerhalb von BLICK Metern
      let frei = true;
      const vorn = (x, z, r = 1.3) => { const dx = (x - p.x) * a.sp.r; return dx > 0 && dx < BLICK + a.lang / 2 && Math.abs(z - a.sp.z) < r; };
      if (vorn(ich.x, ich.z, 1.8)) frei = false;
      if (frei) for (const q of leute) if (vorn(q.x, q.z)) { frei = false; break; }
      if (frei) for (const b of autos) if (b !== a && b.sp === a.sp && vorn(b.mesh.position.x, b.mesh.position.z, 0.5)) { const d = (b.mesh.position.x - p.x) * a.sp.r; if (d < a.lang + 4) { frei = false; break; } }
      const ziel = still || !frei ? 0 : TEMPO;
      a.v += (ziel - a.v) * Math.min(1, dt * (ziel < a.v ? 3.2 : 0.8));
      p.x += a.v * dt * a.sp.r;
      if (p.x > X1) p.x = X0; if (p.x < X0) p.x = X1;
      for (const o of [-0.3, 0, 0.3]) kreise.push({ x: p.x + o * a.lang, z: p.z, r: 1.05 });
    }
    steuerung.autos = kreise;
  }
  return { tick, autos };
}
