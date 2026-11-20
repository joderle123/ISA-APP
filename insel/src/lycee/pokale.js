// Pokal-Regal im Jugendhaus (Westwand neben der Rekord-Tafel): zehn Plätze, jeder Champion-Titel stellt einen goldenen Pokal auf.
// Noch nicht geschafft = graue Silhouette mit Schild, wie man ihn bekommt. Nur Spielstand, keine Zufälle.
import * as THREE from 'three';

const m = (S) => S.merke || {};
export const POKALE = [
  { id: 'kicker', name: 'Kicker-Champion', wie: '3 Leute im Kicker schlagen', test: (S) => (m(S).kickerBesiegt || []).length >= 3 },
  { id: 'billard', name: 'Billard-Profi', wie: '3 Leute im Billard schlagen', test: (S) => (m(S).billardBesiegt || []).length >= 3 },
  { id: 'kevin', name: 'Kevin-Legende', wie: '500 Punkte bei Kevin rennt', test: (S) => (m(S).kevinRekord || 0) >= 500 },
  { id: 'tanz', name: 'Tanz-Star', wie: '3 Sterne auf der Tanzfläche', test: (S) => (m(S).tanzSterne || 0) >= 3 },
  { id: 'dosen', name: 'Dosen-König:in', wie: 'Alle 6 Dosen auf einmal', test: (S) => (m(S).dosenRekord || 0) >= 6 },
  { id: 'elfmeter', name: 'Elfmeter-Ass', wie: '4 von 5 Elfmetern', test: (S) => (m(S).elfmeterRekord || 0) >= 4 },
  { id: 'skate', name: 'S-K-A-T-E', wie: 'Alle 5 Buchstaben im Skatepark', test: (S) => (m(S).skate5 || '').length >= 5 },
  { id: 'boten', name: 'Dorf-Bote', wie: 'Alle 8 Botengänge', test: (S) => { const b = m(S).boten; return !!b && Object.keys(b.best || {}).length >= 8; } },
  { id: 'schnee', name: 'Schnee-Künstler:in', wie: 'Im Winter einen Schneemann bauen', test: (S) => (m(S).schneemann || 0) >= 1 },
  { id: 'eis', name: 'Eis-Expert:in', wie: 'Im Sommer alle 6 Eissorten', test: (S) => (m(S).eisSorten || []).length >= 6 },
];
export const pokaleVon = (S) => POKALE.filter((p) => { try { return p.test(S); } catch (e) { return false; } }).map((p) => p.id);

export function createPokale({ scene, x = 8.16, z0 = 121.7, z1 = 126.3 }) {
  const gold = new THREE.MeshStandardMaterial({ color: '#f5cf55', metalness: 0.6, roughness: 0.25, emissive: '#7a5600', emissiveIntensity: 0.55 });
  const grau = new THREE.MeshLambertMaterial({ color: '#b9b2a6', transparent: true, opacity: 0.55 });
  const holz = new THREE.MeshLambertMaterial({ color: '#8a5a3a' }), sockel = new THREE.MeshLambertMaterial({ color: '#2b2f3a' });
  const g = new THREE.Group(); g.name = 'pokale'; scene.add(g);
  for (const y of [1.2, 1.85]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, z1 - z0 + 0.2), holz); b.position.set(x + 0.13, y, (z0 + z1) / 2); g.add(b); }
  // Schild über dem Regal
  { const cv = document.createElement('canvas'); cv.width = 512; cv.height = 96; const c = cv.getContext('2d');
    c.fillStyle = '#2d4a3a'; c.fillRect(0, 0, 512, 96); c.fillStyle = '#ffd166'; c.font = 'bold 54px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🏆 POKALE', 256, 50);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.26), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); s.position.set(x + 0.02, 2.4, (z0 + z1) / 2); s.rotation.y = Math.PI / 2; g.add(s); }
  // Pokal-Form: Sockel, Fuß, Kelch (gedrehte Kurve), zwei Henkel
  const kelchGeo = new THREE.LatheGeometry([[0, 0], [0.03, 0], [0.03, 0.02], [0.012, 0.05], [0.012, 0.09], [0.05, 0.12], [0.075, 0.2], [0.08, 0.27], [0.07, 0.27]].map(([a, b]) => new THREE.Vector2(a, b)), 20);
  const henkelGeo = new THREE.TorusGeometry(0.035, 0.008, 6, 12, Math.PI);
  const plaetze = POKALE.map((p, i) => {
    const reihe = i < 5 ? 0 : 1, k = i % 5, zz = z0 + 0.25 + k * ((z1 - z0 - 0.5) / 4), y = reihe ? 1.87 : 1.22;
    const pg = new THREE.Group(); pg.position.set(x + 0.14, y, zz); pg.scale.setScalar(1.35);
    const so = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.1), sockel); so.position.y = 0.045; pg.add(so);
    const ke = new THREE.Mesh(kelchGeo, grau); ke.position.y = 0.07; pg.add(ke);
    const h = []; for (const sz of [-1, 1]) { const he = new THREE.Mesh(henkelGeo, grau); he.position.set(0, 0.27, sz * 0.075); he.rotation.set(0, Math.PI / 2, sz < 0 ? Math.PI / 2 : -Math.PI / 2); pg.add(he); h.push(he); }
    // Namensschild vorn
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64; const c = cv.getContext('2d'); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const schild = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.1), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); schild.position.set(0.131, -0.05, 0); schild.rotation.y = Math.PI / 2; pg.add(schild);
    g.add(pg);
    return { p, ke, h, c, t, an: null };
  });
  function schreibe(pl, an) {
    const c = pl.c; c.fillStyle = an ? '#2b2f3a' : '#e9e4da'; c.fillRect(0, 0, 256, 64);
    c.fillStyle = an ? '#ffd166' : '#5d6573'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = 'bold 26px system-ui, sans-serif'; c.fillText(an ? pl.p.name : '?', 128, 22);
    c.font = '18px system-ui, sans-serif'; c.fillText(an ? '★' : pl.p.wie, 128, 48, 244);
    pl.t.needsUpdate = true;
  }
  // gibt neu hinzugekommene Pokale zurück (für eine Meldung)
  function aktualisiere(S) {
    const neu = [];
    for (const pl of plaetze) {
      let an = false; try { an = !!pl.p.test(S); } catch (e) { /* */ }
      if (an === pl.an) continue;
      if (pl.an === false && an) neu.push(pl.p);
      pl.an = an; pl.ke.material = an ? gold : grau; for (const h of pl.h) h.material = an ? gold : grau; schreibe(pl, an);
    }
    return neu;
  }
  return { aktualisiere, gruppe: g, get anzahl() { return plaetze.filter((p) => p.an).length; } };
}
