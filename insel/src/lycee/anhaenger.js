// Lila Bär – eigener Anhänger (Wunsch der Auftraggeberin, 18.11.2026). Bewusst KEINE Kopie einer Marken-Figur:
// eigene Form, Bauch-Fleck mit Mond und Stern. Als 3D-Anhänger an der Hüfte der Spielfigur und als Bild im Spind.
import * as THREE from 'three';

export const BAER_SVG = '<svg viewBox="0 0 100 120" width="64" height="77" aria-label="Lila Bär">' +
  '<circle cx="28" cy="20" r="11" fill="#9b6fd0"/><circle cx="72" cy="20" r="11" fill="#9b6fd0"/><circle cx="28" cy="20" r="5" fill="#d9c4f2"/><circle cx="72" cy="20" r="5" fill="#d9c4f2"/>' +
  '<ellipse cx="50" cy="88" rx="30" ry="28" fill="#9b6fd0"/><ellipse cx="22" cy="80" rx="9" ry="13" fill="#8a5fc2"/><ellipse cx="78" cy="80" rx="9" ry="13" fill="#8a5fc2"/>' +
  '<ellipse cx="36" cy="112" rx="11" ry="7" fill="#8a5fc2"/><ellipse cx="64" cy="112" rx="11" ry="7" fill="#8a5fc2"/>' +
  '<circle cx="50" cy="42" r="28" fill="#a87ddb"/><ellipse cx="50" cy="52" rx="13" ry="10" fill="#fff"/><path d="M45 47 q5 -4 10 0 q-5 6 -10 0z" fill="#5b3a8a"/>' +
  '<circle cx="39" cy="37" r="4" fill="#2b1d3a"/><circle cx="61" cy="37" r="4" fill="#2b1d3a"/><circle cx="40.3" cy="35.6" r="1.3" fill="#fff"/><circle cx="62.3" cy="35.6" r="1.3" fill="#fff"/>' +
  '<path d="M45 56 q5 4 10 0" stroke="#5b3a8a" stroke-width="2" fill="none" stroke-linecap="round"/>' +
  '<ellipse cx="50" cy="90" rx="15" ry="14" fill="#f4eefc"/><path d="M47 81 a9 9 0 1 0 6 15 a7 7 0 1 1 -6 -15z" fill="#f2b134"/>' +
  '<path d="M58 84 l1.3 2.8 3 .4 -2.2 2 .6 3 -2.7 -1.5 -2.7 1.5 .6 -3 -2.2 -2 3 -.4z" fill="#f2b134"/></svg>';

// 3D: kleiner Bär (etwa 9 cm) aus Kugeln, hängt an einer Kette an der Hüfte
export function baerAnhaenger() {
  const g = new THREE.Group(); g.name = 'anhaenger-baer';
  const m = (c) => new THREE.MeshLambertMaterial({ color: c });
  const lila = m('#9b6fd0'), hell = m('#a87ddb'), weiss = m('#ffffff'), bauch = m('#f4eefc'), gold = m('#f2b134'), dunkel = m('#2b1d3a'), kette = m('#c9ced6');
  const kugel = (r, x, y, z, mat, sx = 1, sy = 1, sz = 1) => { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat); k.position.set(x, y, z); k.scale.set(sx, sy, sz); g.add(k); return k; };
  const kt = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.05, 6), kette); kt.position.y = 0.025; g.add(kt);
  kugel(0.024, 0, -0.03, 0, hell);                       // Kopf
  kugel(0.009, -0.018, -0.012, 0, lila); kugel(0.009, 0.018, -0.012, 0, lila);   // Ohren
  kugel(0.010, 0, -0.036, 0.019, weiss, 1.2, 0.85, 0.7); // Schnauze
  kugel(0.004, 0, -0.031, 0.026, dunkel);                // Nase
  kugel(0.0032, -0.009, -0.024, 0.021, dunkel); kugel(0.0032, 0.009, -0.024, 0.021, dunkel);   // Augen
  kugel(0.027, 0, -0.072, 0, lila, 1, 1.08, 0.9);        // Bauch
  kugel(0.014, 0, -0.072, 0.019, bauch, 1, 1, 0.5);      // Bauch-Fleck
  kugel(0.005, -0.003, -0.07, 0.026, gold);              // Mond (angedeutet)
  kugel(0.0028, 0.006, -0.075, 0.026, gold);             // Stern
  kugel(0.009, -0.026, -0.064, 0, lila, 0.9, 1.3, 0.9); kugel(0.009, 0.026, -0.064, 0, lila, 0.9, 1.3, 0.9);   // Arme
  kugel(0.010, -0.012, -0.098, 0.006, lila, 1, 0.7, 1.2); kugel(0.010, 0.012, -0.098, 0.006, lila, 1, 0.7, 1.2); // Füße
  g.traverse((o) => { if (o.isMesh) o.castShadow = false; });
  return g;
}
