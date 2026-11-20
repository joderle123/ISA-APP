// Schneemann bauen (Winter, Kapitel 5–6) auf dem Schulhof. Eine Schneekugel rollt vor der Figur her und wird beim Laufen
// größer (nur auf dem Schneefeld). Am Bauplatz mit E absetzen: erst die große, dann die mittlere, dann den Kopf.
// Danach bekommt er Kohle-Augen, eine Karottennase, Knöpfe, Zweig-Arme und einen Schal in der Farbe deines Oberteils.
// Er bleibt stehen, bis der Winter vorbei ist. Eigenes kleines Spiel, nur aus einfachen Formen.
import * as THREE from 'three';

export const SCHNEEFELD = { x0: 8, x1: 17.6, z0: 13, z1: 29 };   // freie Fläche zwischen Hofbrunnen und Korbballfeld
export const BAUPLATZ = { x: 12.4, z: 20.6 };   // neben dem Deko-Schneemann (15,5 | 21,5): er bekommt Gesellschaft
// Mindestgröße je Stufe (Radius in m); obere Kugel höchstens 85 % der unteren
export const STUFEN = [{ min: 0.34, name: 'Bauch' }, { min: 0.25, name: 'Brust' }, { min: 0.17, name: 'Kopf' }];
export const START_R = 0.1, MAX_R = 0.52;

// reine Regel (für Tests): passt die Kugel als Stufe n auf den Stapel?
export function kugelPasst(stapel, r) {
  const n = stapel.length; if (n >= 3) return { ok: false, grund: 'fertig' };
  if (r < STUFEN[n].min) return { ok: false, grund: 'klein' };
  const unten = n ? stapel[n - 1] : Infinity;
  return { ok: true, r: Math.min(r, unten * 0.85) };   // zu groß für oben: ein bisschen Schnee fällt ab
}

export function createSchneemann({ scene, steuerung, ui, ton = () => {}, vib = () => {} }) {
  const schnee = new THREE.MeshStandardMaterial({ color: '#f7fbff', roughness: 0.95 });
  const kohle = new THREE.MeshLambertMaterial({ color: '#1b1b1f' }), karotte = new THREE.MeshLambertMaterial({ color: '#f08a24' }), holz = new THREE.MeshLambertMaterial({ color: '#6b4a2e' });
  const kugelGeo = new THREE.SphereGeometry(1, 20, 14);
  const gruppe = new THREE.Group(); gruppe.name = 'schneemann'; gruppe.position.set(BAUPLATZ.x, 0, BAUPLATZ.z); scene.add(gruppe);
  // Bauplatz: kleiner Schneehaufen mit Stock als Markierung (immer im Winter sichtbar, solange noch kein Schneemann steht)
  const marke = new THREE.Group(); marke.position.set(BAUPLATZ.x, 0, BAUPLATZ.z); scene.add(marke);
  { const h = new THREE.Mesh(kugelGeo, schnee); h.scale.set(0.45, 0.12, 0.45); marke.add(h); const st = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 6), holz); st.position.set(0.25, 0.35, 0); st.rotation.z = 0.2; marke.add(st); }
  let roll = null, stapel = [], aktiv = false, fertig = null, pill = null, ende = null, sichtbarWinter = false;
  gruppe.visible = false; marke.visible = false;   // erst im Winter (tick)
  const vorn = new THREE.Vector3();

  function hud(t) {
    if (!pill) { pill = document.createElement('div'); pill.className = 'ly-schnee-hud'; document.body.appendChild(pill); }
    pill.innerHTML = t;
  }
  function stapelHoehe() { let y = 0; for (const r of stapel) y += r * 1.75; return y; }
  function kugelSetzen(r) {
    const m = new THREE.Mesh(kugelGeo, schnee); m.scale.setScalar(r); m.castShadow = true; m.receiveShadow = true;
    m.position.y = stapelHoehe() + r * (stapel.length ? 0.88 : 0.85); gruppe.add(m); stapel.push(r);
  }
  function gesicht(farbe) {
    const [a, b, c] = stapel, yK = a * 1.75 + b * 1.75 + c * 0.88, yB = a * 1.75 + b * 0.88;
    for (const sx of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(c * 0.11, 8, 6), kohle); e.position.set(sx * c * 0.35, yK + c * 0.25, c * 0.88); gruppe.add(e); }
    const n = new THREE.Mesh(new THREE.ConeGeometry(c * 0.12, c * 0.8, 10), karotte); n.rotation.x = Math.PI / 2; n.position.set(0, yK, c * 1.25); gruppe.add(n);
    for (let i = 0; i < 5; i++) { const k = new THREE.Mesh(new THREE.SphereGeometry(c * 0.07, 6, 5), kohle), w = (i - 2) * 0.32; k.position.set(Math.sin(w) * c * 1.05, yK - c * 0.45 + Math.abs(i - 2) * c * 0.08, Math.cos(w) * c * 1.0); gruppe.add(k); }
    for (let i = 0; i < 3; i++) { const k = new THREE.Mesh(new THREE.SphereGeometry(b * 0.08, 6, 5), kohle); k.position.set(0, yB + (i - 1) * b * 0.42, b * 0.98 - Math.abs(i - 1) * b * 0.08); gruppe.add(k); }
    for (const sx of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, b * 2.2, 5), holz); arm.position.set(sx * b * 1.6, yB + b * 0.25, 0); arm.rotation.z = sx * (Math.PI / 2 - 0.5); gruppe.add(arm); }
    const schal = new THREE.Mesh(new THREE.TorusGeometry(c * 0.95, c * 0.16, 8, 20), new THREE.MeshLambertMaterial({ color: farbe || '#e0384f' })); schal.rotation.x = Math.PI / 2; schal.position.y = a * 1.75 + b * 1.75 + c * 0.05; gruppe.add(schal);
    const zipf = new THREE.Mesh(new THREE.BoxGeometry(c * 0.3, c * 0.9, c * 0.08), schal.material); zipf.position.set(c * 0.5, a * 1.75 + b * 1.75 - c * 0.35, c * 0.85); zipf.rotation.z = 0.15; gruppe.add(zipf);
  }

  // startet das Bauen; Promise endet mit { fertig: true } oder { fertig: false } (abgebrochen)
  function start({ farbe } = {}) {
    if (aktiv || fertig) return Promise.resolve({ fertig: !!fertig, schon: !!fertig });
    aktiv = true; stapel = []; for (const c of [...gruppe.children]) gruppe.remove(c);
    neueKugel();
    hud('<b>⛄ Schneemann bauen</b><span>Lauf über den Schnee – die Kugel wird größer. Am Stock mit <kbd>E</kbd> absetzen.</span>');
    return new Promise((ok) => { ende = (r) => { ende = null; ok(r); }; start.farbe = farbe; });
  }
  function neueKugel() {
    const m = new THREE.Mesh(kugelGeo, schnee); m.castShadow = true; m.scale.setScalar(START_R); scene.add(m);
    roll = { m, r: START_R, rot: 0 };
  }
  function abbrechen() {
    if (!aktiv) return; aktiv = false;
    if (roll) { scene.remove(roll.m); roll = null; }
    if (stapel.length < 3) { for (const c of [...gruppe.children]) gruppe.remove(c); stapel = []; }
    if (pill) { pill.remove(); pill = null; }
    ende && ende({ fertig: false });
  }
  // E am Bauplatz: Kugel absetzen
  function absetzen() {
    if (!aktiv || !roll) return false;
    const p = steuerung.pos;
    if (Math.hypot(p.x - BAUPLATZ.x, p.z - BAUPLATZ.z) > 2.2) { ui.toast('Erst zum Stock rollen – dort wird gebaut.'); return true; }
    const r = kugelPasst(stapel, roll.r);
    if (!r.ok) { ui.toast('<b>Noch zu klein</b><span>Die Kugel für den ' + STUFEN[stapel.length].name + ' muss größer sein. Roll weiter!</span>'); ton('klack'); return true; }
    if (r.r < roll.r - 0.005) ui.toast('Zu groß für oben – ein bisschen Schnee fällt ab.');
    scene.remove(roll.m); roll = null; kugelSetzen(r.r); ton('pling'); vib(15);
    if (stapel.length < 3) { neueKugel(); hud('<b>⛄ ' + stapel.length + ' von 3</b><span>Jetzt die ' + (stapel.length === 1 ? 'mittlere' : 'kleine für den Kopf') + ' Kugel rollen.</span>'); return true; }
    gesicht(start.farbe); fertig = true; aktiv = false; marke.visible = false;
    if (pill) { pill.remove(); pill = null; }
    ton('melodie2'); vib(30);
    ende && ende({ fertig: true });
    return true;
  }
  function tick(dt, winter) {
    if (winter !== sichtbarWinter) { sichtbarWinter = winter; gruppe.visible = winter; marke.visible = winter && !fertig; if (!winter && aktiv) abbrechen(); }
    if (!aktiv || !roll) return;
    const p = steuerung.pos, y = steuerung.yaw || 0;
    vorn.set(p.x + Math.sin(y) * (0.45 + roll.r), roll.r, p.z + Math.cos(y) * (0.45 + roll.r));
    const alt = roll.m.position, weg = Math.hypot(vorn.x - alt.x, vorn.z - alt.z);
    const imSchnee = vorn.x > SCHNEEFELD.x0 && vorn.x < SCHNEEFELD.x1 && vorn.z > SCHNEEFELD.z0 && vorn.z < SCHNEEFELD.z1;
    if (weg < 1.5 && imSchnee) roll.r = Math.min(MAX_R, roll.r + weg * 0.016);
    roll.rot += weg / Math.max(roll.r, 0.05);
    roll.m.position.copy(vorn); roll.m.scale.setScalar(roll.r); roll.m.rotation.set(roll.rot, y, 0, 'YXZ');
    if (!imSchnee && Math.hypot(p.x - BAUPLATZ.x, p.z - BAUPLATZ.z) > 30) abbrechen();   // weit weg gelaufen
  }
  // Spielstand: gebauter Schneemann bleibt nach dem Neuladen stehen
  const daten = () => (fertig ? { stapel: [...stapel], farbe: start.farbe || null } : null);
  function wiederherstellen(d) {
    if (fertig || aktiv || !d || !Array.isArray(d.stapel) || d.stapel.length !== 3) return;
    for (const c of [...gruppe.children]) gruppe.remove(c); stapel = [];
    for (const r of d.stapel) kugelSetzen(Math.max(0.1, Math.min(MAX_R, Number(r) || 0.2)));
    start.farbe = d.farbe; gesicht(d.farbe); fertig = true; marke.visible = false;
  }
  return { start, tick, absetzen, abbrechen, daten, wiederherstellen, aktiv: () => aktiv, get fertig() { return !!fertig; }, get kugel() { return roll ? roll.r : 0; }, get stapel() { return [...stapel]; } };
}
