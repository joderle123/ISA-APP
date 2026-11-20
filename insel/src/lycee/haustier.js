// Haustier, das mitläuft (garderobe.js, Art „tier“): Ratte, Frettchen, Igel, Hamster, Schildkröte – aus einfachen Formen,
// mit Hüpfen beim Laufen, Schnüffeln und Schwanzwackeln im Stand. Folgt der Spielfigur schräg hinten; zu weit weg = taucht hinten auf.
import * as THREE from 'three';

const L = (c) => new THREE.MeshLambertMaterial({ color: c });
function kugel(r, mat, x, y, z, sx = 1, sy = 1, sz = 1) { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat); k.position.set(x, y, z); k.scale.set(sx, sy, sz); k.castShadow = true; return k; }

// Baut das Tier mit Blick nach +z. Gibt { g, kopf, schwanz, hoehe } zurück.
export function baueTier(art, farbe = '#9a9a9e') {
  const g = new THREE.Group(), fell = L(farbe), rosa = L('#f2a7b5'), schwarz = L('#1b1b1f'), weiss = L('#f4f1ea');
  const kopf = new THREE.Group(); let schwanz = null, hoehe = 0.12;
  const augen = (y, z, ab = 0.028, r = 0.011) => { for (const sx of [-1, 1]) kopf.add(kugel(r, schwarz, sx * ab, y, z)); };
  if (art === 'ratte') {
    g.add(kugel(0.07, fell, 0, 0.065, 0, 1, 0.85, 1.6));
    kopf.position.set(0, 0.07, 0.11); kopf.add(kugel(0.045, fell, 0, 0, 0.02, 1, 0.9, 1.4)); kopf.add(kugel(0.012, rosa, 0, -0.005, 0.085)); augen(0.015, 0.05, 0.026);
    for (const sx of [-1, 1]) kopf.add(kugel(0.022, rosa, sx * 0.035, 0.04, 0.0, 1, 1, 0.4));
    const kurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.05, -0.1), new THREE.Vector3(0, 0.03, -0.2), new THREE.Vector3(0.04, 0.02, -0.3), new THREE.Vector3(0.02, 0.02, -0.38)]);
    schwanz = new THREE.Mesh(new THREE.TubeGeometry(kurve, 12, 0.008, 5), rosa); hoehe = 0.13;
  } else if (art === 'frettchen') {
    g.add(kugel(0.06, fell, 0, 0.07, 0, 1, 0.9, 2.6));
    kopf.position.set(0, 0.085, 0.17); kopf.add(kugel(0.045, fell, 0, 0, 0.01, 1, 0.9, 1.3)); kopf.add(kugel(0.03, L('#6b4e3a'), 0, 0.005, 0.03, 1.5, 0.5, 0.8)); kopf.add(kugel(0.011, schwarz, 0, -0.005, 0.068)); augen(0.012, 0.045, 0.024);
    for (const sx of [-1, 1]) kopf.add(kugel(0.016, fell, sx * 0.034, 0.035, -0.005));
    schwanz = kugel(0.028, L('#6b4e3a'), 0, 0.06, -0.2, 1, 1, 2.6); hoehe = 0.15;
  } else if (art === 'igel') {
    g.add(kugel(0.085, fell, 0, 0.06, 0, 1, 0.8, 1.15));
    for (let i = 0; i < 26; i++) { const a = i * 2.4, b = 0.25 + (i % 5) * 0.22; const st = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.05, 4), L('#4a3624'));
      const n = new THREE.Vector3(Math.sin(a) * Math.sin(b + 0.6), Math.cos(b + 0.6), Math.cos(a) * Math.sin(b + 0.6) - 0.3).normalize(); st.position.set(n.x * 0.08, 0.06 + n.y * 0.065, n.z * 0.095); st.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n); g.add(st); }
    kopf.position.set(0, 0.05, 0.09); kopf.add(kugel(0.035, L('#d9c3a0'), 0, 0, 0.01, 1, 0.9, 1.3)); kopf.add(kugel(0.01, schwarz, 0, 0, 0.055)); augen(0.012, 0.03, 0.02, 0.008); hoehe = 0.13;
  } else if (art === 'hamster') {
    g.add(kugel(0.075, fell, 0, 0.07, 0, 1.05, 0.95, 1.1)); g.add(kugel(0.06, weiss, 0, 0.055, 0.03, 1, 0.8, 1));
    kopf.position.set(0, 0.1, 0.06); kopf.add(kugel(0.04, fell, 0, 0, 0)); kopf.add(kugel(0.03, weiss, 0, -0.012, 0.025, 1.2, 0.8, 1)); kopf.add(kugel(0.008, rosa, 0, -0.005, 0.05)); augen(0.01, 0.033, 0.022, 0.009);
    for (const sx of [-1, 1]) kopf.add(kugel(0.014, rosa, sx * 0.028, 0.032, -0.005)); hoehe = 0.15;
  } else if (art === 'schildkroete') {
    g.add(kugel(0.1, fell, 0, 0.06, 0, 1, 0.6, 1.2)); g.add(kugel(0.1, L('#c9b77a'), 0, 0.035, 0, 1.02, 0.2, 1.22));
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; g.add(kugel(0.028, L('#476b37'), Math.sin(a) * 0.05, 0.1, Math.cos(a) * 0.06, 1, 0.35, 1)); }
    for (const [x, z] of [[0.07, 0.07], [-0.07, 0.07], [0.07, -0.07], [-0.07, -0.07]]) g.add(kugel(0.025, L('#8aa86a'), x, 0.02, z, 1, 0.6, 1));
    kopf.position.set(0, 0.05, 0.14); kopf.add(kugel(0.032, L('#8aa86a'), 0, 0, 0, 1, 0.9, 1.3)); augen(0.01, 0.03, 0.018, 0.007); hoehe = 0.12;
  }
  g.add(kopf); if (schwanz) g.add(schwanz);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return { g, kopf, schwanz, hoehe };
}

export function createHaustier({ scene, steuerung }) {
  let tier = null, art = null, uhr = 0, yaw = 0, schnuffel = 0;
  const pos = new THREE.Vector3(), soll = new THREE.Vector3();
  function setArt(neu, farbe) {
    if (neu === art) return;
    if (tier) { scene.remove(tier.g); tier = null; }
    art = neu || null;
    if (!art) return;
    tier = baueTier(art, farbe); tier.g.name = 'haustier'; scene.add(tier.g);
    const p = steuerung.pos; pos.set(p.x - Math.sin(steuerung.yaw || 0) * 0.9, 0, p.z - Math.cos(steuerung.yaw || 0) * 0.9); tier.g.position.copy(pos);
  }
  function tick(dt, sichtbar = true) {
    if (!tier) return;
    tier.g.visible = sichtbar; if (!sichtbar) return;
    dt = Math.min(dt, 0.05); uhr += dt;
    const p = steuerung.pos, y0 = steuerung.yaw || 0;
    // Platz: schräg hinten links von der Figur
    soll.set(p.x - Math.sin(y0) * 0.85 + Math.cos(y0) * 0.45, 0, p.z - Math.cos(y0) * 0.85 - Math.sin(y0) * 0.45);
    const dx = soll.x - pos.x, dz = soll.z - pos.z, d = Math.hypot(dx, dz);
    if (d > 12) { pos.copy(soll); }
    const v = d > 0.15 ? Math.min(d * 3.2, steuerung.brett ? 14 : 8) : 0;
    if (v > 0) { pos.x += dx / d * v * dt; pos.z += dz / d * v * dt; }
    const zielYaw = v > 0.3 ? Math.atan2(dx, dz) : Math.atan2(p.x - pos.x, p.z - pos.z);   // läuft: in Laufrichtung, steht: schaut zu dir
    let dy = zielYaw - yaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2; yaw += dy * Math.min(1, dt * 8);
    const huepf = v > 0.3 ? Math.abs(Math.sin(uhr * (art === 'schildkroete' ? 6 : 14))) * (art === 'schildkroete' ? 0.01 : 0.035) : 0;
    tier.g.position.set(pos.x, (p.y > 0.3 && steuerung.brett ? 0 : 0) + huepf, pos.z); tier.g.rotation.y = yaw;
    // Stand: ab und zu schnüffeln (Kopf nickt), Schwanz wackelt
    schnuffel -= dt; if (schnuffel < -2.5 - Math.random() * 3) schnuffel = 0.6;
    tier.kopf.rotation.x = v < 0.3 && schnuffel > 0 ? Math.sin(schnuffel * 30) * 0.12 : 0;
    if (tier.schwanz) tier.schwanz.rotation.y = Math.sin(uhr * (v > 0.3 ? 10 : 3)) * 0.25;
  }
  return { setArt, tick, get art() { return art; }, get pos() { return pos; } };
}
