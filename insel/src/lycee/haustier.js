// Haustier, das mitläuft (garderobe.js, Art „tier“): Ratte, Frettchen, Igel, Hamster, Schildkröte – aus einfachen Formen,
// mit Hüpfen beim Laufen, Schnüffeln und Schwanzwackeln im Stand. Folgt der Spielfigur schräg hinten; zu weit weg = taucht hinten auf.
import * as THREE from 'three';

const L = (c) => new THREE.MeshLambertMaterial({ color: c });
function kugel(r, mat, x, y, z, sx = 1, sy = 1, sz = 1) { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat); k.position.set(x, y, z); k.scale.set(sx, sy, sz); k.castShadow = true; return k; }

// Erhöhte Gehwege (welt.js / dorf.js: Bordstein-Kästen 0–0,14 m): dort laufen Tiere obendrauf statt halb im Stein
export const GEHWEGE = [[-110, 110, 40.5, 44], [-110, 110, 52, 55], [-30, 110, 82, 84], [-30, 110, 90, 92]];
export const bodenHoehe = (x, z) => (GEHWEGE.some(([x0, x1, z0, z1]) => x > x0 && x < x1 && z > z0 && z < z1) ? 0.14 : 0);

// Baut das Tier mit Blick nach +z. Gibt { g, kopf, schwanz, hoehe } zurück.
export function baueTier(art, farbe = '#9a9a9e') {
  const g = new THREE.Group(), fell = L(farbe), rosa = L('#f2a7b5'), schwarz = L('#1b1b1f'), weiss = L('#f4f1ea');
  const kopf = new THREE.Group(); let schwanz = null, hoehe = 0.12; const fluegel = [];
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
  } else if (art === 'wellensittich') {   // kleiner Vogel: hüpft, Schwanzfedern, Schnabel
    g.add(kugel(0.045, fell, 0, 0.075, 0, 0.9, 1.0, 1.3)); g.add(kugel(0.03, L('#ffe066'), 0, 0.06, 0.03, 0.9, 0.9, 0.8));
    kopf.position.set(0, 0.125, 0.035); kopf.add(kugel(0.032, L('#ffe066'), 0, 0, 0)); const sn = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.02, 6), L('#e9a23b')); sn.rotation.x = Math.PI / 2 + 0.4; sn.position.set(0, -0.006, 0.033); kopf.add(sn); augen(0.008, 0.022, 0.018, 0.006);
    schwanz = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.006, 0.09), L('#2f6fd0')); schwanz.position.set(0, 0.07, -0.08); schwanz.rotation.x = -0.4; hoehe = 0.16;
    for (const sx of [-1, 1]) { const f = kugel(0.022, fell, sx * 0.04, 0.08, -0.005, 0.4, 0.9, 1.4); f.userData.sx = sx; g.add(f); fluegel.push(f); }
  } else if (art === 'wiesel') {   // schlank und lang, heller Bauch, kurzer Schwanz mit dunkler Spitze
    g.add(kugel(0.045, fell, 0, 0.06, 0, 1, 0.85, 3.0)); g.add(kugel(0.038, weiss, 0, 0.045, 0.05, 0.9, 0.7, 1.9));
    kopf.position.set(0, 0.075, 0.15); kopf.add(kugel(0.036, fell, 0, 0, 0.01, 1, 0.85, 1.35)); kopf.add(kugel(0.026, weiss, 0, -0.014, 0.03, 1, 0.6, 1)); kopf.add(kugel(0.009, schwarz, 0, -0.003, 0.058)); augen(0.012, 0.035, 0.02, 0.008);
    for (const sx of [-1, 1]) kopf.add(kugel(0.013, fell, sx * 0.027, 0.028, -0.008, 1, 1, 0.5));
    schwanz = new THREE.Group(); schwanz.position.set(0, 0.06, -0.15); schwanz.add(kugel(0.02, fell, 0, 0, -0.03, 1, 1, 2.2)); schwanz.add(kugel(0.018, schwarz, 0, 0.004, -0.085)); hoehe = 0.13;
  } else if (art === 'eichhoernchen') {   // rotbraun, Ohrpinsel, großer buschiger Schwanz nach oben gebogen
    g.add(kugel(0.055, fell, 0, 0.07, 0, 1, 1.05, 1.35)); g.add(kugel(0.04, L('#f1dcc0'), 0, 0.06, 0.035, 0.9, 1, 0.8));
    kopf.position.set(0, 0.12, 0.07); kopf.add(kugel(0.04, fell, 0, 0, 0, 1, 0.95, 1.1)); kopf.add(kugel(0.008, schwarz, 0, -0.006, 0.045)); augen(0.01, 0.03, 0.022, 0.009);
    for (const sx of [-1, 1]) { const o = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.04, 5), fell); o.position.set(sx * 0.022, 0.042, -0.005); kopf.add(o); }
    schwanz = new THREE.Group(); schwanz.position.set(0, 0.06, -0.06);
    for (let i = 0; i < 6; i++) { const a = i / 5; schwanz.add(kugel(0.03 + Math.sin(a * Math.PI) * 0.012, fell, 0, 0.02 + a * 0.15, -0.035 - Math.sin(a * 2.6) * 0.06)); }
    hoehe = 0.18;
  } else if (art === 'kaetzchen') {   // getigert, weiße Brust, spitze Ohren, Schwanz nach oben
    const streif = L('#b06a1c');
    g.add(kugel(0.06, fell, 0, 0.075, 0, 1, 0.9, 1.65)); g.add(kugel(0.045, weiss, 0, 0.06, 0.06, 0.9, 0.85, 0.8));
    for (let i = 0; i < 3; i++) g.add(kugel(0.02, streif, 0, 0.125, -0.05 + i * 0.045, 2.4, 0.35, 0.6));
    for (const [x, z] of [[0.035, 0.06], [-0.035, 0.06], [0.035, -0.06], [-0.035, -0.06]]) g.add(kugel(0.018, weiss, x, 0.02, z, 1, 1.4, 1));
    kopf.position.set(0, 0.115, 0.1); kopf.add(kugel(0.047, fell, 0, 0, 0, 1.05, 0.95, 1)); kopf.add(kugel(0.024, weiss, 0, -0.016, 0.036, 1.3, 0.8, 0.8)); kopf.add(kugel(0.008, rosa, 0, -0.004, 0.05)); augen(0.01, 0.038, 0.022, 0.01);
    for (const sx of [-1, 1]) { const o = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.04, 4), fell); o.position.set(sx * 0.03, 0.045, -0.005); o.rotation.z = sx * -0.25; kopf.add(o); }
    const kurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.08, -0.09), new THREE.Vector3(0, 0.12, -0.15), new THREE.Vector3(0, 0.2, -0.17), new THREE.Vector3(0.02, 0.25, -0.14)]);
    schwanz = new THREE.Mesh(new THREE.TubeGeometry(kurve, 12, 0.012, 6), fell); hoehe = 0.17;
  }
  g.add(kopf); if (schwanz) g.add(schwanz);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return { g, kopf, schwanz, hoehe, fluegel };
}

// Kleine Tiere klettern (oder fliegen) auf die Schulter, wenn man kurz stillsteht – beim Losgehen springen sie wieder runter
const SCHULTER = ['ratte', 'hamster', 'wellensittich', 'eichhoernchen'];
export function createHaustier({ scene, steuerung, schulter = null }) {
  let tier = null, art = null, uhr = 0, yaw = 0, schnuffel = 0, freude = 0, still = 0, hoch = 0, flug = 0, boden = 0;
  const pos = new THREE.Vector3(), soll = new THREE.Vector3();
  function setArt(neu, farbe) {
    if (neu === art) return;
    flug = 0; hoch = 0; still = 0;
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
    freude = Math.max(0, freude - dt); const sprung = freude > 0 ? Math.sin((1 - freude / 0.9) * Math.PI * 2) ** 2 * 0.12 : 0;
    // Wellensittich: bei schnellem Tempo fliegt er mit (Flügel schlagen), sonst hüpft er
    if (tier.fluegel.length) { flug += ((v > 3 ? 1 : 0) - flug) * Math.min(1, dt * 3); for (const f of tier.fluegel) { f.rotation.z = flug > 0.05 ? f.userData.sx * Math.sin(uhr * 32) * 0.9 * flug : 0; f.position.x = f.userData.sx * (0.04 + flug * 0.02); } }
    const fl = tier.fluegel.length ? flug : 0;
    boden += (bodenHoehe(pos.x, pos.z) - boden) * Math.min(1, dt * 14);   // weich die Bordsteinkante hoch
    tier.g.position.set(pos.x, boden + (fl > 0.05 ? fl * (0.9 + Math.sin(uhr * 3) * 0.08) : huepf) + sprung, pos.z); tier.g.rotation.y = yaw + (freude > 0 ? (1 - freude / 0.9) * Math.PI * 2 : 0);
    // Stand: ab und zu schnüffeln (Kopf nickt), Schwanz wackelt
    schnuffel -= dt; if (schnuffel < -2.5 - Math.random() * 3) schnuffel = 0.6;
    tier.kopf.rotation.x = v < 0.3 && schnuffel > 0 ? Math.sin(schnuffel * 30) * 0.12 : 0;
    if (tier.schwanz) tier.schwanz.rotation.y = Math.sin(uhr * (v > 0.3 ? 10 : 3)) * 0.25;
    // Schulter: nach 3,5 s Stillstand hoch (Bogen), beim Losgehen schnell wieder runter
    const kann = SCHULTER.includes(art) && schulter && !steuerung.sitzt && !steuerung.brett && !steuerung.eis && !steuerung.kameraAus;
    still = kann && (steuerung.tempo || 0) < 0.08 ? still + dt : 0;
    hoch += ((still > 3.5 ? 1 : 0) - hoch) * Math.min(1, dt * (still > 3.5 ? 1.8 : 7));
    if (hoch > 0.01 && kann) {
      const sp = schulter();
      if (sp) {
        const k = hoch, bogen = Math.sin(k * Math.PI) * (art === 'wellensittich' ? 0.6 : 0.3);
        tier.g.position.set(pos.x + (sp.x - pos.x) * k, boden * (1 - k) + (sp.y + 0.01) * k + bogen, pos.z + (sp.z - pos.z) * k);
        tier.g.rotation.y = k > 0.5 ? y0 : yaw;
        if (k > 0.97) tier.kopf.rotation.y = Math.sin(uhr * 0.9) * 0.5;   // oben: schaut sich um
      }
    } else if (tier.kopf.rotation.y) tier.kopf.rotation.y = 0;
  }
  return { setArt, tick, get aufSchulter() { return hoch > 0.97; }, freu: () => { freude = 0.9; }, get art() { return art; }, get pos() { return pos; } };
}
