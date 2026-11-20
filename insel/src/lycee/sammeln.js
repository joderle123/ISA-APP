// Sticker-Jagd (Auftrag 20.11.: „größer, spaßiger“): 24 Sticker im ganzen Dorf – Schulhof, Skatepark, Stade, Gasse, Innenhof …
// Draufzulaufen oder -fahren = einsammeln. Belohnungen: 8 = Brett „Neon“, 16 = Helm „Gold“, 24 = Titel „Kennt jede Ecke“.
// Keine Sticker an Orten schwieriger Situationen (Lichtung, Raucherecke, Épicerie innen, hinter der Turnhalle).
import * as THREE from 'three';

export const STICKER = [
  ['hof', 3, 21, '⭐', 'Schulhof'], ['korb', 29, 22.5, '🏀', 'Korbfeld'], ['skate', -38.5, 13, '🛹', 'Skate-Ecke'], ['rad', -38, 24.5, '🚲', 'Fahrradständer'],
  ['preau', 19, 6.5, '☂️', 'Préau'], ['weiher', -66.5, 96, '🦆', 'Park am Weiher'], ['bus', -17, 40.5, '🚌', 'Bushaltestelle'], ['baeckerei', 2, 54.5, '🥐', 'Bäckerei'],
  ['west', -90, 47, '🏁', 'Hauptstraße West'], ['ost', 98, 51, '🌅', 'Hauptstraße Ost'], ['gasse', 32, 68, '🐈', 'Gasse'], ['spielplatz', 68, 78, '🎈', 'Spielplatz'],
  ['park', 92.5, 79.5, '🔥', 'Skatepark'], ['arret', 5, 85.5, '🎨', 'Arrêt Rue du Moulin'], ['moulin', 75, 87, '🍦', 'Rue du Moulin'], ['stade', -80, -8, '⚽', 'Stade Annexe'],
  ['ecke', -101, 15, '🏃', 'Laufbahn'], ['tribuene', -70.5, -10, '📣', 'Tribüne'], ['waldweg', -64, -27, '🌲', 'Waldweg'], ['linde', 2, -33, '🌳', 'Alte Linde'],
  ['stufen', -16, -44.5, '🎭', 'Sitzstufen'], ['garten', 15, -41.5, '🌻', 'Schulgarten'], ['torost', 32, -40.5, '🗝️', 'Tor Ost'], ['werkstatt', -48, -3, '🔧', 'Werkstatt'],
];
export const STICKER_PREIS = { 8: 'deck', 16: 'helm', 24: 'titel' };

export function createSticker({ scene, steuerung, ui, ton = () => {}, vib = () => {}, zustand, sichern, belohnung = () => {} }) {
  const FARBEN = ['#ffd23f', '#5ec8ff', '#ff7ac8', '#7CFC9A', '#ffa94d', '#b197fc'];
  const liste = STICKER.map(([id, x, z, emoji, ort], i) => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d');
    g.fillStyle = FARBEN[i % FARBEN.length]; g.beginPath(); g.arc(64, 64, 60, 0, Math.PI * 2); g.fill();
    g.lineWidth = 8; g.strokeStyle = '#ffffff'; g.stroke();
    g.font = '64px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(emoji, 64, 70);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.32, 28), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true, toneMapped: false }));
    m.position.set(x, 1.1, z); m.name = 'sticker'; m.visible = false; scene.add(m);
    return { id, x, z, emoji, ort, m, phase: i * 0.7 };
  });
  let uhr = 0, bereit = false;
  function tick(dt, sichtbar) {
    const S = zustand(); if (!S || !S.merke) return;
    const hab = S.merke.sticker = S.merke.sticker || [];
    if (!bereit) { bereit = true; for (const s of liste) s.weg = hab.includes(s.id); }
    uhr += dt;
    const p = steuerung.pos;
    for (const s of liste) {
      s.m.visible = sichtbar && !s.weg;
      if (!s.m.visible) continue;
      s.m.rotation.y = uhr * 1.6 + s.phase; s.m.position.y = 1.1 + Math.sin(uhr * 2 + s.phase) * 0.12 + (p.y || 0) * 0;
      if (Math.hypot(p.x - s.x, p.z - s.z) < 1.3 && (p.y || 0) < 2) {
        s.weg = true; hab.push(s.id); ton('pling'); vib(14);
        const n = hab.length, preis = STICKER_PREIS[n];
        ui.toast('<b>' + s.emoji + ' Sticker ' + n + ' von ' + liste.length + '</b><span>' + s.ort + (n === 1 ? ' – im Dorf sind noch mehr versteckt!' : '') + '</span>', preis ? 'ly-t-ent' : undefined);
        if (preis) belohnung(preis, n);
        sichern();
      }
    }
  }
  return { tick, liste, anzahl: () => { const S = zustand(); return (S && S.merke && S.merke.sticker || []).length; } };
}
