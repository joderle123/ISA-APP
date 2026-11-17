// Lycée-Simulator – Frisuren und Kopfbedeckungen (Kopie aus respawn/figur3d.js, damit das Lycée die RESPAWN-Figuren
// nicht mit in die Datei zieht). Einfache Formen am Kopfknochen: lang, Bob, Dutt, Zöpfe, Locken, Irokese, Stacheln,
// Kopftuch, Mütze, Cap, Stirnband.
import * as THREE from 'three';

// ---------- Frisuren und Kopfbedeckungen ----------
// Das Paket hat nur kurze Männerfrisuren. Damit jede Figur ihr eigenes Haar behält (Aussehen der Insel-Figuren:
// look.hairStyle, look.head), kommen einfache Formen an den Kopf: langes Haar, Zöpfe, Bob, Dutt, Locken, Kopftuch,
// Irokese, Stacheln, Mütze, Kappe, Stirnband. Maße in Metern im „Kopfraum“: Ursprung am Kopfgelenk (Halsende),
// y nach oben, z nach vorn (Gesicht). Kopfmitte liegt bei (0, 0.10, 0.012), Radius rund 0.105.
const K = { y: 0.10, z: 0.012, r: 0.105 };
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
// Schale über Hinterkopf und Scheitel (vorn offen); seite = wie weit sie um die Wangen reicht (Bogenmaß), tief = wie weit nach unten
const schale = (farbe, mat, { r = K.r * 1.2, seite = 0.55, tief = 1.9 } = {}) =>   // größer als das kurze Haar des Kopfmodells
  form(new THREE.SphereGeometry(r, 12, 8, Math.PI - seite, Math.PI + seite * 2, 0, tief), farbe, mat, [0, K.y, K.z]);
// Vorderes Stück über Stirn und Scheitel: schließt die Schale vorn (Haaransatz)
const ansatz = (farbe, mat, { r = K.r * 1.2, tief = 0.92 } = {}) => form(new THREE.SphereGeometry(r, 10, 4, Math.PI / 2 - 1.05, 2.1, 0, tief), farbe, mat, [0, K.y, K.z]);
// Diese Frisuren bedecken den ganzen Kopf: das kurze Haar des Kopfmodells wird dann ausgeblendet
const DECKT = ['lang', 'bob', 'dutt', 'flechtzoepfe', 'locken', 'kopftuch'];
export function baueFrisur(look = {}, mat) {
  const g = new THREE.Group(); g.name = 'frisur'; g.userData.deckt = DECKT.includes(look.hairStyle);
  if (['lang', 'bob', 'dutt', 'flechtzoepfe', 'locken'].includes(look.hairStyle)) g.add(ansatz(look.hair || '#3a2a1c', mat));
  const haar = look.hair || '#3a2a1c', stil = look.hairStyle, kopf = look.head;
  const tuch = look.headColor || look.top || '#7a4e8a';
  const kugel = (r, x, y, z, f = haar) => form(new THREE.IcosahedronGeometry(r, 1), f, mat, [x, y, z]);
  if (stil === 'lang') {
    g.add(schale(haar, mat, { seite: 0.75, tief: 2.0 }));
    // Haar fällt hinten bis über die Schultern
    g.add(form(new THREE.CylinderGeometry(K.r * 1.14, K.r * 0.9, 0.3, 9, 1, false, Math.PI / 2 + 0.25, Math.PI - 0.5), haar, mat, [0, K.y - 0.17, K.z - 0.005]));
    g.add(kugel(0.045, 0.085, K.y - 0.07, 0.03)); g.add(kugel(0.045, -0.085, K.y - 0.07, 0.03));   // Strähnen vor den Schultern
  } else if (stil === 'bob') {
    g.add(schale(haar, mat, { seite: 0.95, tief: 2.15 }));
    g.add(form(new THREE.CylinderGeometry(K.r * 1.2, K.r * 1.1, 0.1, 9, 1, false, Math.PI / 2 - 0.35, Math.PI + 0.7), haar, mat, [0, K.y - 0.07, K.z]));
  } else if (stil === 'dutt') {
    g.add(schale(haar, mat, { seite: 0.5, tief: 1.75 }));
    g.add(kugel(0.055, 0, K.y + 0.1, K.z - 0.1));
  } else if (stil === 'flechtzoepfe') {
    g.add(schale(haar, mat, { seite: 0.6, tief: 1.85 }));
    for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) g.add(kugel(0.03 - i * 0.002, sx * (0.092 + i * 0.004), K.y - 0.03 - i * 0.045, K.z + 0.02 + i * 0.006));
  } else if (stil === 'locken') {
    g.add(schale(haar, mat, { seite: 0.6, tief: 1.9 }));
    for (const [x, y, z, r] of [[0, 0.1, 0, 0.058], [0.06, 0.085, 0.02, 0.05], [-0.06, 0.085, 0.02, 0.05], [0.085, 0.04, -0.02, 0.05], [-0.085, 0.04, -0.02, 0.05], [0, 0.07, -0.07, 0.058],
      [0.055, 0.02, -0.085, 0.05], [-0.055, 0.02, -0.085, 0.05], [0, -0.02, -0.095, 0.05], [0.04, 0.1, 0.055, 0.042], [-0.04, 0.1, 0.055, 0.042]]) g.add(kugel(r, x, K.y + y, K.z + z));
  } else if (stil === 'irokese') {
    for (let i = 0; i < 6; i++) g.add(form(new THREE.BoxGeometry(0.03, 0.075 - Math.abs(i - 2.2) * 0.012, 0.045), haar, mat, [0, K.y + 0.118 - Math.abs(i - 2.2) * 0.012, K.z + 0.085 - i * 0.04], [0.5 - i * 0.26, 0, 0]));
  } else if (stil === 'stachel') {
    for (const [x, z] of [[0, 0.06], [0.05, 0.03], [-0.05, 0.03], [0, 0.0], [0.055, -0.035], [-0.055, -0.035], [0, -0.06]]) g.add(form(new THREE.ConeGeometry(0.026, 0.075, 5), haar, mat, [x, K.y + 0.118, K.z + z], [z * 3, 0, -x * 4]));
  } else if (stil === 'kopftuch') {
    // Tuch um Kopf und Hals, das Gesicht bleibt frei
    g.add(form(new THREE.SphereGeometry(K.r * 1.3, 14, 9, Math.PI / 2 + 0.6, Math.PI * 2 - 1.2, 0, 2.5), tuch, mat, [0, K.y + 0.005, K.z - 0.006]));
    g.add(form(new THREE.SphereGeometry(K.r * 1.305, 10, 4, Math.PI / 2 - 0.68, 1.36, 0.0, 0.98), tuch, mat, [0, K.y + 0.005, K.z - 0.006]));   // Stirn bis knapp über die Brauen
    g.add(form(new THREE.CylinderGeometry(0.085, 0.16, 0.15, 10, 1, true), tuch, mat, [0, K.y - 0.145, K.z - 0.005]));           // fällt auf die Schultern
  }
  // Kopfbedeckung (über dem Haar)
  if (kopf === 'muetze') {
    g.add(form(new THREE.SphereGeometry(K.r * 1.27, 12, 6, 0, Math.PI * 2, 0, 1.3), tuch, mat, [0, K.y + 0.012, K.z]));
    g.add(form(new THREE.CylinderGeometry(K.r * 1.3, K.r * 1.3, 0.038, 12, 1, true), tuch, mat, [0, K.y + 0.045, K.z]));
  } else if (kopf === 'cap') {
    g.add(form(new THREE.SphereGeometry(K.r * 1.25, 12, 6, 0, Math.PI * 2, 0, 1.22), tuch, mat, [0, K.y + 0.015, K.z]));
    g.add(form(new THREE.BoxGeometry(0.16, 0.012, 0.11), tuch, mat, [0, K.y + 0.055, K.z + 0.155], [0.12, 0, 0]));
  } else if (kopf === 'stirnband' || kopf === 'bandana') {
    g.add(form(new THREE.CylinderGeometry(K.r * 1.19, K.r * 1.19, kopf === 'bandana' ? 0.05 : 0.034, 12, 1, true), tuch, mat, [0, K.y + 0.05, K.z]));
  }
  return g.children.length ? g : null;
}

