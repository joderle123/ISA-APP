// Rücken-Teile für die Garderobe (wie „Back Bling“ in großen Spielen): Schulrucksack, Teddy im Rucksack, Gitarrenkoffer,
// Skateboard, Schildkrötenpanzer, Spielzeug-Rakete, Flügel. Nur einfache Formen, eingefärbt über die Eckpunkte (wie frisur.js),
// damit sie das Toon-Material der Figur tragen. Maße in Metern im „Brustraum“: Ursprung am Brustknochen,
// y nach oben, z nach vorn (Gesicht) – der Rücken liegt bei z ≈ −0,12.
import * as THREE from 'three';

function form(geo, farbe, mat, pos, dreh, mass) {
  const n = geo.attributes.position.count, c = new THREE.Color(farbe);
  const col = new Float32Array(n * 3); for (let i = 0; i < n; i++) { col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n), 1));
  const m = new THREE.Mesh(geo, mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (dreh) m.rotation.set(dreh[0], dreh[1], dreh[2]);
  if (mass) m.scale.set(mass[0], mass[1], mass[2]);
  m.castShadow = true; m.frustumCulled = false;
  return m;
}
const dunkler = (f, k = 0.7) => '#' + new THREE.Color(f).multiplyScalar(k).getHexString();
const Z = -0.2;   // Mitte der Rückenteile (hinter dem Rücken)

// Rucksack (Grundform für Schul- und Teddy-Rucksack): Körper, Vortasche, Reißverschluss, Griff, Träger über die Schultern
function rucksack(g, farbe, mat) {
  g.add(form(new THREE.BoxGeometry(0.3, 0.36, 0.13, 2, 2, 1), farbe, mat, [0, 0.0, Z]));
  g.add(form(new THREE.SphereGeometry(0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), farbe, mat, [0, 0.18, Z], null, [1, 0.35, 0.43]));   // runder Deckel
  g.add(form(new THREE.BoxGeometry(0.22, 0.13, 0.05), dunkler(farbe, 0.78), mat, [0, -0.09, Z - 0.085]));
  g.add(form(new THREE.BoxGeometry(0.2, 0.012, 0.012), '#e9e4da', mat, [0, -0.02, Z - 0.112]));   // Reißverschluss
  g.add(form(new THREE.TorusGeometry(0.035, 0.008, 6, 12, Math.PI), '#2b2f3a', mat, [0, 0.235, Z]));
  for (const s of [-1, 1]) g.add(form(new THREE.BoxGeometry(0.045, 0.018, 0.2), '#2b2f3a', mat, [s * 0.09, 0.2, Z + 0.09], [-0.25, 0, 0]));
}

export const RUECKEN_ARTEN = ['rucksack', 'teddy', 'gitarre', 'skate', 'panzer', 'rakete', 'fluegel'];

export function baueRuecken(art, farbe, mat) {
  if (!RUECKEN_ARTEN.includes(art)) return null;
  const g = new THREE.Group(); g.name = 'ruecken';
  if (art === 'rucksack') rucksack(g, farbe || '#2fb8a8', mat);
  else if (art === 'teddy') {
    rucksack(g, farbe || '#e85d75', mat);
    const b = '#b07a4a';
    g.add(form(new THREE.SphereGeometry(0.075, 12, 9), b, mat, [0, 0.27, Z - 0.01]));
    for (const s of [-1, 1]) g.add(form(new THREE.SphereGeometry(0.027, 8, 6), b, mat, [s * 0.055, 0.33, Z - 0.01]));
    g.add(form(new THREE.SphereGeometry(0.03, 8, 6), '#e3c39b', mat, [0, 0.255, Z - 0.075], null, [1, 0.8, 0.7]));   // Schnauze nach hinten (schaut über die Schulter zurück)
    for (const s of [-1, 1]) g.add(form(new THREE.SphereGeometry(0.01, 6, 5), '#1b1b1f', mat, [s * 0.026, 0.29, Z - 0.07]));
    for (const s of [-1, 1]) g.add(form(new THREE.SphereGeometry(0.025, 8, 6), b, mat, [s * 0.1, 0.2, Z - 0.05], null, [1, 1.4, 1]));   // Pfoten über dem Rand
  } else if (art === 'gitarre') {
    const k = new THREE.Group(); k.position.set(0, 0.02, Z); k.rotation.z = 0.32; g.add(k);
    const f = farbe || '#1d1f24';
    k.add(form(new THREE.SphereGeometry(1, 16, 10), f, mat, [0, -0.13, 0], null, [0.17, 0.15, 0.06]));
    k.add(form(new THREE.SphereGeometry(1, 16, 10), f, mat, [0, 0.07, 0], null, [0.135, 0.12, 0.06]));
    k.add(form(new THREE.BoxGeometry(0.065, 0.36, 0.05), f, mat, [0, 0.33, 0]));
    k.add(form(new THREE.BoxGeometry(0.09, 0.08, 0.055), f, mat, [0, 0.53, 0]));
    k.add(form(new THREE.BoxGeometry(0.02, 0.6, 0.012), '#c9a24a', mat, [0, 0.12, -0.062]));   // Reißverschluss
    k.add(form(new THREE.BoxGeometry(0.05, 0.06, 0.02), '#c9a24a', mat, [0, -0.14, -0.06]));   // Aufkleber
    g.add(form(new THREE.BoxGeometry(0.035, 0.016, 0.4), '#3b2a20', mat, [0.02, 0.1, -0.02], [0, 0, 0.75]));   // Gurt quer über die Brust
  } else if (art === 'skate') {
    const k = new THREE.Group(); k.position.set(0, 0.02, Z - 0.02); k.rotation.z = -0.3; g.add(k);
    const f = farbe || '#ff3fa4';
    k.add(form(new THREE.CapsuleGeometry(0.1, 0.56, 4, 10), f, mat, [0, 0, 0], null, [1, 1, 0.12]));
    k.add(form(new THREE.BoxGeometry(0.19, 0.64, 0.004), '#1b1b1f', mat, [0, 0, 0.0125]));   // Griptape (zum Rücken)
    for (const y of [-0.24, 0.24]) {
      k.add(form(new THREE.BoxGeometry(0.15, 0.03, 0.03), '#b9bcc4', mat, [0, y, -0.03]));
      for (const s of [-1, 1]) k.add(form(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 12), '#f2e6cf', mat, [s * 0.085, y, -0.045], [0, 0, Math.PI / 2]));
    }
  } else if (art === 'panzer') {
    const f = farbe || '#5f8a4a', B = 0.2, H = 0.27, T = 0.15, z0 = Z + 0.05;   // Breite, Höhe, Tiefe der Wölbung
    g.add(form(new THREE.SphereGeometry(1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), f, mat, [0, -0.02, z0], [-Math.PI / 2, 0, 0], [B, T, H]));
    g.add(form(new THREE.TorusGeometry(1, 0.08, 6, 28), '#c9b77a', mat, [0, -0.02, z0], null, [B, H, 0.25]));
    for (const [x, y] of [[0, 0], [-0.09, 0.12], [0.09, 0.12], [-0.1, -0.1], [0.1, -0.1], [0, -0.19], [0, 0.18]]) {
      const k = Math.max(0, 1 - (x / B) ** 2 - (y / H) ** 2), z = z0 - T * Math.sqrt(k) - 0.004;
      g.add(form(new THREE.CylinderGeometry(0.048, 0.048, 0.016, 6), dunkler(f, 0.72), mat, [x, y - 0.02, z], [Math.PI / 2 - x * 2.2, 0, 0]));
    }
  } else if (art === 'rakete') {
    const f = farbe || '#d6452f';
    for (const s of [-1, 1]) {
      g.add(form(new THREE.CylinderGeometry(0.058, 0.058, 0.3, 14), '#c8cdd6', mat, [s * 0.08, 0.0, Z]));
      g.add(form(new THREE.ConeGeometry(0.058, 0.1, 14), f, mat, [s * 0.08, 0.2, Z]));
      g.add(form(new THREE.CylinderGeometry(0.035, 0.05, 0.05, 12), '#3a3f4a', mat, [s * 0.08, -0.175, Z]));
      g.add(form(new THREE.BoxGeometry(0.06, 0.08, 0.008), f, mat, [s * 0.14, -0.1, Z], [0, 0, s * -0.3]));
    }
    g.add(form(new THREE.BoxGeometry(0.12, 0.16, 0.05), '#3a3f4a', mat, [0, 0.0, Z + 0.03]));
    g.add(form(new THREE.CircleGeometry(0.02, 10), '#5ec8ff', mat, [0, 0.03, Z + 0.003], [0, Math.PI, 0]));   // Knopf
  } else if (art === 'fluegel') {
    const f = farbe || '#f7f4ee';
    for (const s of [-1, 1]) {
      const w = new THREE.Group(); w.position.set(s * 0.06, 0.08, Z + 0.03); w.rotation.set(0, s * 0.35, s * -0.45); g.add(w);
      for (let i = 0; i < 4; i++) w.add(form(new THREE.SphereGeometry(1, 12, 8), i % 2 ? f : dunkler(f, 0.9), mat, [s * (0.12 + i * 0.04), 0.04 - i * 0.07, -i * 0.004], [0, 0, s * (0.25 - i * 0.12)], [0.17 - i * 0.015, 0.06, 0.012]));
    }
  }
  return g;
}
