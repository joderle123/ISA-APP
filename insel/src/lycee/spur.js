// Spuren (Garderobe, Art „spur“): kleine Funken, Herzen, Sterne, Schneeflocken oder ein Regenbogen hinter der Figur –
// nur wenn man rennt, Brett oder Trottinette fährt oder auf dem Eis rutscht. Belohnung wie ein „Kondensstreifen“ in Spielen,
// aber verdient (garderobe.js). Formen sind selbst gezeichnet (Canvas), keine Bilder von außen.
import * as THREE from 'three';

const FARBEN = {
  funken: ['#fff6c2', '#ffd166', '#ffffff'],
  herzen: ['#ff7ac8', '#e85d75', '#ffb3d1'],
  sterne: ['#ffd23f', '#ffe98a', '#fff3c4'],
  schnee: ['#ffffff', '#dff3ff', '#bfe6ff'],
  regenbogen: null,   // Farbe läuft durch alle Töne
};
export const SPUR_ARTEN = Object.keys(FARBEN);

function form(art) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d');
  g.translate(32, 32); g.fillStyle = '#ffffff'; g.strokeStyle = '#ffffff'; g.shadowColor = 'rgba(255,255,255,.9)'; g.shadowBlur = 8;
  const stern = (n, ra, ri) => { g.beginPath(); for (let i = 0; i < n * 2; i++) { const r = i % 2 ? ri : ra, a = -Math.PI / 2 + i * Math.PI / n; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fill(); };
  if (art === 'funken') stern(4, 26, 6);
  else if (art === 'sterne') stern(5, 24, 10);
  else if (art === 'herzen') { g.beginPath(); g.moveTo(0, 20); g.bezierCurveTo(-30, 0, -18, -26, 0, -10); g.bezierCurveTo(18, -26, 30, 0, 0, 20); g.fill(); }
  else if (art === 'schnee') { g.lineWidth = 4; g.lineCap = 'round'; for (let i = 0; i < 6; i++) { g.save(); g.rotate(i * Math.PI / 3); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -24); g.moveTo(0, -14); g.lineTo(-7, -20); g.moveTo(0, -14); g.lineTo(7, -20); g.stroke(); g.restore(); } }
  else { const v = g.createRadialGradient(0, 0, 2, 0, 0, 26); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = v; g.beginPath(); g.arc(0, 0, 26, 0, Math.PI * 2); g.fill(); }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function createSpur({ scene, steuerung }) {
  const N = 64, teile = [], texturen = {};
  let art = null, naechstes = 0, uhr = 0;
  const letzte = new THREE.Vector3(), farbe = new THREE.Color();
  let hatLetzte = false;
  for (let i = 0; i < N; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, toneMapped: false }));
    s.visible = false; s.renderOrder = 5; scene.add(s); teile.push({ s, leben: 0, max: 1, vy: 0, dreh: 0, gr: 0.2 });
  }
  function setArt(neu) {
    art = neu && FARBEN[neu] !== undefined ? neu : null;
    if (art && !texturen[art]) texturen[art] = form(art);
    for (const t of teile) { t.leben = 0; t.s.visible = false; if (art) { t.s.material.map = texturen[art]; t.s.material.needsUpdate = true; } }
  }
  function ausstossen(p) {
    const t = teile[naechstes]; naechstes = (naechstes + 1) % N;
    const y0 = steuerung.yaw || 0, hinten = 0.25 + Math.random() * 0.2;
    t.s.position.set(p.x - Math.sin(y0) * hinten + (Math.random() - 0.5) * 0.3, 0.12 + Math.random() * (art === 'schnee' ? 0.9 : 0.6), p.z - Math.cos(y0) * hinten + (Math.random() - 0.5) * 0.3);
    t.max = t.leben = 0.7 + Math.random() * 0.5; t.vy = art === 'schnee' ? -0.15 : 0.35 + Math.random() * 0.3; t.dreh = (Math.random() - 0.5) * 3;
    t.gr = (art === 'regenbogen' ? 0.22 : 0.16) + Math.random() * 0.08;
    if (art === 'regenbogen') farbe.setHSL((uhr * 0.35) % 1, 0.9, 0.62); else { const l = FARBEN[art]; farbe.set(l[Math.floor(Math.random() * l.length)]); }
    t.s.material.color.copy(farbe); t.s.material.rotation = Math.random() * Math.PI; t.s.material.opacity = 1; t.s.scale.setScalar(t.gr); t.s.visible = true;
  }
  // sichtbar = Spielfigur zu sehen und frei unterwegs
  function tick(dt, sichtbar = true) {
    dt = Math.min(dt, 0.05); uhr += dt;
    for (const t of teile) {
      if (t.leben <= 0) continue;
      t.leben -= dt; if (t.leben <= 0) { t.s.visible = false; continue; }
      const a = t.leben / t.max;
      t.s.position.y += t.vy * dt; t.s.material.rotation += t.dreh * dt; t.s.material.opacity = Math.min(1, a * 1.6);
      t.s.scale.setScalar(t.gr * (0.4 + a * 0.6));
    }
    const p = steuerung.pos;
    if (!art || !sichtbar) { hatLetzte = false; return; }
    if (!hatLetzte) { letzte.copy(p); hatLetzte = true; return; }
    const weg = Math.hypot(p.x - letzte.x, p.z - letzte.z); letzte.copy(p);
    if (weg > 2) return;   // Teleport, kein Laufen
    const tempo = weg / Math.max(dt, 1e-4);
    if (tempo < 2.2) return;   // nur rennen, fahren, rutschen
    tick.rest = (tick.rest || 0) + weg;
    while (tick.rest > 0.22) { tick.rest -= 0.22; ausstossen(p); }
  }
  // Vorschau in der Garderobe: ein kleiner Wirbel rund um die Figur
  function vorschau() {
    if (!art) return; const p = steuerung.pos;
    for (let i = 0; i < 16; i++) { ausstossen(p); const t = teile[(naechstes + N - 1) % N], a = i / 16 * Math.PI * 2; t.s.position.set(p.x + Math.cos(a) * 0.55, 0.2 + (i % 4) * 0.35, p.z + Math.sin(a) * 0.55); t.max = t.leben = 1.1 + (i % 3) * 0.2; }
  }
  return { setArt, tick, vorschau, get art() { return art; }, get aktiv() { return teile.filter((t) => t.leben > 0).length; } };
}
