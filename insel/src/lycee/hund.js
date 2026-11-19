// Annexe Junglinster – Bonbon, der Schulhund der SePAS (aus Kästen gebaut, liegt im Körbchen, wedelt, hebt den Kopf).
// Begegnung übt Grenzen im Alltag: erst fragen, Hand hinhalten, der Hund entscheidet.
import * as THREE from 'three';

export function createHund({ scene, x, z, rot = 0 }) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; g.name = 'hund-bonbon';
  const mat = (c) => new THREE.MeshLambertMaterial({ color: c });
  const FELL = mat('#d9a35b'), HELL = mat('#f0d3a0'), DUNKEL = mat('#3a2a1c'), KISSEN = mat('#4f88c8'), RAND = mat('#2f5f9a');
  const teil = (w, h, d, m, px, py, pz, eltern = g) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(px, py, pz); b.castShadow = true; eltern.add(b); return b; };
  // Körbchen
  const korb = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.66, 0.1, 20), KISSEN); korb.position.y = 0.07; korb.receiveShadow = true; g.add(korb);
  const rand = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.09, 8, 24), RAND); rand.rotation.x = Math.PI / 2; rand.position.y = 0.15; g.add(rand);
  // Körper liegend
  teil(0.36, 0.24, 0.66, FELL, 0, 0.26, 0);
  teil(0.3, 0.06, 0.5, HELL, 0, 0.15, 0.02);
  for (const sx of [-0.14, 0.14]) { teil(0.1, 0.08, 0.3, FELL, sx, 0.17, 0.42); teil(0.11, 0.06, 0.08, HELL, sx, 0.16, 0.58); }   // Vorderpfoten nach vorn
  for (const sx of [-0.17, 0.17]) teil(0.1, 0.14, 0.26, FELL, sx, 0.2, -0.22);   // Hinterbeine angelegt
  // Kopf (Gruppe, damit er sich heben kann)
  const kopf = new THREE.Group(); kopf.position.set(0, 0.36, 0.36); g.add(kopf);
  teil(0.28, 0.24, 0.26, FELL, 0, 0.02, 0.05, kopf);
  teil(0.16, 0.12, 0.16, HELL, 0, -0.04, 0.24, kopf);
  teil(0.07, 0.05, 0.04, DUNKEL, 0, 0.0, 0.33, kopf);   // Nase
  for (const sx of [-0.07, 0.07]) teil(0.04, 0.04, 0.02, DUNKEL, sx, 0.07, 0.185, kopf);   // Augen
  const ohren = [];
  for (const sx of [-0.16, 0.16]) { const o = teil(0.06, 0.2, 0.12, mat('#b8833f'), sx, -0.02, 0.02, kopf); o.rotation.z = sx > 0 ? -0.25 : 0.25; ohren.push(o); }
  // Schwanz
  const schwanz = new THREE.Group(); schwanz.position.set(0, 0.32, -0.33); g.add(schwanz);
  const sw = teil(0.06, 0.06, 0.3, FELL, 0, 0.04, -0.13, schwanz); sw.rotation.x = -0.5;
  scene.add(g);

  let t = 0, wedeln = 0, kopfHoch = 0, atem = 0;
  return {
    group: g, pos: g.position,
    // nah: Spielfigur in der Nähe (wedeln, Kopf heben); freude: kurz stark wedeln (nach dem Streicheln)
    tick(dt, nah) {
      t += dt; atem += dt;
      const zielW = nah ? 1 : 0.15; wedeln += (zielW - wedeln) * Math.min(1, dt * 2);
      schwanz.rotation.y = Math.sin(t * (nah ? 11 : 3)) * 0.55 * wedeln;
      const zielK = nah ? 1 : 0; kopfHoch += (zielK - kopfHoch) * Math.min(1, dt * 1.5);
      kopf.rotation.x = -0.25 * kopfHoch + Math.sin(atem * 1.2) * 0.02; kopf.position.y = 0.36 + 0.08 * kopfHoch;
      g.children[2].scale.y = 1 + Math.sin(atem * 1.6) * 0.03;   // Atmen
      for (const o of ohren) o.rotation.x = Math.sin(t * 0.7) * 0.05;
    },
    freude() { t = 0; wedeln = 1.6; },
  };
}

// Begegnungen: erstes Mal mit Wahl (fragen oder einfach hin), danach ruhige kleine Momente
export const HUND_ERSTMAL = {
  frage: 'Ein Hund im Körbchen. Am Körbchen hängt ein Schild: „Bonbon · Schulhund · Bitte erst fragen“.',
  opt: [
    { t: 'Hand hinhalten und warten', gut: true, dann: ['Du hältst die Hand hin. Ganz ruhig.', 'Bonbon schnuppert. Dann legt er den Kopf in deine Hand.', 'Er hat entschieden. Er mag dich.'] },
    { t: 'Einfach streicheln', gut: false, dann: ['Bonbon zieht den Kopf weg und dreht sich um.', 'Er kennt dich noch nicht. Für ihn warst du zu schnell.', 'Nächstes Mal: Hand hinhalten, warten. Er entscheidet.'] },
  ],
};
export const HUND_MOMENTE = [
  'Bonbon hebt den Kopf. Schwanzwedeln. Dann legt er sich wieder hin.',
  'Sein Fell ist warm. Dein Atem wird langsamer.',
  'Bonbon schnuppert an deiner Hand. Du riechst nach Kantine.',
  'Er rollt sich auf den Rücken. Ganz klar: Bauch kraulen.',
  'Ein kleines Seufzen. Von ihm. Oder von dir?',
  'Bonbon legt die Pfote auf deinen Schuh. Bleib ruhig noch kurz.',
  'Er schließt die Augen. Du auch, für drei Atemzüge.',
];
