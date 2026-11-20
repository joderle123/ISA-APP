// Botengänge im Dorf (Auftrag 20.11.: „vergrößere das Spiel, mach es spaßiger“): Am Brett „Hilfe gesucht“ neben der Bäckerei
// gibt es kleine Aufträge der Dorf-Leute. Abholen → hinbringen, gern mit Brett oder Trottinette. Die Uhr zählt mit,
// aber niemand schimpft: Zu spät ist nur „ein Stern“. Ein Lichtstrahl zeigt das Ziel, ein Pfeil unter den Füßen den Weg.
import * as THREE from 'three';

// [id, Ding, von {x, z, ort, wer, satz}, nach {x, z, ort, wer, danke}]
export const BOTENGAENGE = [
  { id: 'croissants', ding: '🥐 Croissants', von: { x: 0.4, z: 54.9, ort: 'Bäckerei', wer: 'Rosa', satz: 'Frühstück fürs Jugendhaus. Noch warm, also flott!' },
    nach: { x: 25.6, z: 118.8, ort: 'Jugendhaus', wer: 'Kim', danke: 'Noch warm! Setz dich, es gibt Tee.' } },
  { id: 'brot', ding: '🍞 Brot', von: { x: 0.4, z: 54.9, ort: 'Bäckerei', wer: 'Rosa', satz: 'Ein Brot für Opa Nik. Krümel für Gerd inklusive.' },
    nach: { x: -23.2, z: 43.2, ort: 'Bushaltestelle', wer: 'Opa Nik', danke: 'Gerd sagt Danke. Ich auch.' } },
  { id: 'wasser', ding: '💧 Kiste Wasser', von: { x: 42, z: 90.6, ort: 'Épicerie', wer: 'Tante Lisette', satz: 'Die Baustelle hat Durst. Die Kiste ist schwer!' },
    nach: { x: 94, z: 108.2, ort: 'Baustelle', wer: 'die Bauleute', danke: 'Kühles Wasser! Du hast uns gerettet.' } },
  { id: 'saft', ding: '🧃 Saftflaschen', von: { x: -40, z: 98.4, ort: 'Kiosk am Weiher', wer: 'der Kiosk', satz: 'Saft fürs Skate-Treffen. Bitte nicht schütteln.' },
    nach: { x: 92.5, z: 79.5, ort: 'Skatepark', wer: 'die Skate-Gruppe', danke: 'Saft! Du bist eine Legende.' } },
  { id: 'plakat', ding: '📜 Plakat', von: { x: 25.6, z: 118.8, ort: 'Jugendhaus', wer: 'Kim', satz: 'Plakat fürs Dorffest. Bitte an den Brunnen.' },
    nach: { x: 60, z: 115.2, ort: 'Marktplatz, Brunnen', wer: 'der Markt', danke: 'Hängt! Jetzt weiß das ganze Dorf Bescheid.' } },
  { id: 'schal', ding: '🧣 Schal', von: { x: -23.2, z: 43.2, ort: 'Bushaltestelle', wer: 'Opa Nik', satz: 'Rosa hat ihren Schal hier vergessen. Bringst du ihn?' },
    nach: { x: 0.4, z: 54.9, ort: 'Bäckerei', wer: 'Rosa', danke: 'Mein Schal! Dafür gibt es morgen ein Teilchen.' } },
  { id: 'aepfel', ding: '🍎 Äpfel', von: { x: 51, z: 113, ort: 'Marktstand', wer: 'der Marktstand', satz: 'Äpfel für Rosas Apfelkuchen. Ganz frisch.' },
    nach: { x: 0.4, z: 54.9, ort: 'Bäckerei', wer: 'Rosa', danke: 'Morgen gibt es Apfelkuchen. Wegen dir.' } },
  { id: 'ball', ding: '⚽ Vereinsball', von: { x: 92.5, z: 79.5, ort: 'Skatepark', wer: 'die Skate-Gruppe', satz: 'Der Ball vom Fußballverein lag hier. Bringst du ihn?' },
    nach: { x: -80, z: -8, ort: 'Stade Annexe', wer: 'die Fußball-Gruppe', danke: 'Unser Ball! Das Training ist gerettet.' } },
];

export function createBotengang({ scene, steuerung, ui, ton = () => {}, vib = () => {}, zustand, sichern, belohnung = () => {} }) {
  const gelb = '#ffd23f';
  // Lichtstrahl + schwebendes Symbol am Ziel
  const strahl = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 26, 16, 1, true), new THREE.MeshBasicMaterial({ color: gelb, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
  strahl.name = 'botenstrahl'; strahl.visible = false; scene.add(strahl);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.75, 32), new THREE.MeshBasicMaterial({ color: gelb, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
  ring.rotation.x = -Math.PI / 2; ring.visible = false; scene.add(ring);
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g2 = cv.getContext('2d');
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const symbol = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, toneMapped: false })); symbol.scale.set(1.3, 1.3, 1); symbol.visible = false; symbol.renderOrder = 5; scene.add(symbol);
  const malSymbol = (emoji) => { g2.clearRect(0, 0, 128, 128); g2.fillStyle = gelb; g2.beginPath(); g2.arc(64, 64, 58, 0, Math.PI * 2); g2.fill(); g2.lineWidth = 8; g2.strokeStyle = '#ffffff'; g2.stroke();
    g2.font = '62px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.fillText(emoji, 64, 70); tex.needsUpdate = true; };
  // Pfeil am Boden unter der Spielfigur
  const pf = new THREE.Shape(); pf.moveTo(0, 0.95); pf.lineTo(0.5, 0.25); pf.lineTo(0.18, 0.25); pf.lineTo(0.18, -0.45); pf.lineTo(-0.18, -0.45); pf.lineTo(-0.18, 0.25); pf.lineTo(-0.5, 0.25); pf.closePath();
  const pfeil = new THREE.Mesh(new THREE.ShapeGeometry(pf), new THREE.MeshBasicMaterial({ color: gelb, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
  pfeil.geometry.rotateX(-Math.PI / 2); pfeil.visible = false; pfeil.name = 'botenpfeil'; scene.add(pfeil);
  // eigene kleine Anzeige oben (zu Fuß); auf Brett/Trottinette steht sie in der Fahrt-Anzeige
  const hud = document.createElement('div');
  hud.style.cssText = 'position:fixed;top:max(14px,env(safe-area-inset-top));left:max(16px,env(safe-area-inset-left));z-index:20;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.94);color:#2b3a55;font:600 15px system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.18);pointer-events:none;white-space:nowrap;max-width:min(380px,calc(100vw - 32px));overflow:hidden;text-overflow:ellipsis';
  hud.hidden = true; document.body.appendChild(hud);

  let lauf = null, anzeigeUhr = 0;
  const merke = () => { const S = zustand(); S.merke.boten = S.merke.boten || { n: 0, sterne: 0, best: {} }; return S.merke.boten; };
  const ziel = () => (lauf.phase === 'holen' ? lauf.b.von : lauf.b.nach);
  function zeigeZiel() {
    const z = ziel();
    strahl.position.set(z.x, 13, z.z); ring.position.set(z.x, 0.07, z.z); symbol.position.set(z.x, 3.2, z.z);
    malSymbol(lauf.phase === 'holen' ? '📦' : lauf.b.ding.split(' ')[0]);
    strahl.visible = ring.visible = symbol.visible = pfeil.visible = true;
  }
  function verstecken() { strahl.visible = ring.visible = symbol.visible = pfeil.visible = false; hud.hidden = true; }

  // Nächsten Auftrag wählen: erst alle der Reihe nach, danach zufällig (nicht zweimal derselbe)
  function naechster() {
    const m = merke(), offen = BOTENGAENGE.filter((b) => !m.best[b.id]);
    if (offen.length) return offen[0];
    const rest = BOTENGAENGE.filter((b) => b.id !== m.zuletzt); return rest[Math.floor(Math.random() * rest.length)];
  }
  function start() {
    if (lauf) return null;
    const b = naechster();
    const dist = Math.hypot(b.nach.x - b.von.x, b.nach.z - b.von.z);
    lauf = { b, phase: 'holen', t: 0, dist, zeit: Math.round(dist / 3.2 + 20) };
    zeigeZiel(); ton('pling');
    return b;
  }
  function abbrechen() { if (!lauf) return; lauf = null; verstecken(); ui.toast('<b>📦 Botengang abgebrochen</b><span>Das Brett hängt neben der Bäckerei.</span>'); }
  const gross = (w) => w.replace(/^./, (c) => c.toUpperCase());
  const mmss = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');

  function tick(dt, { sichtbar = true, faehrt = false } = {}) {
    if (!lauf) return;
    const L = lauf, p = steuerung.pos, z = ziel();
    if (!sichtbar) { strahl.visible = ring.visible = symbol.visible = pfeil.visible = false; hud.hidden = true; return; }
    strahl.visible = ring.visible = symbol.visible = true;
    const dx = z.x - p.x, dz = z.z - p.z, d = Math.hypot(dx, dz);
    if (L.phase === 'bringen') L.t += dt;
    // Pfeil unter den Füßen zeigt zum Ziel
    pfeil.visible = d > 5; pfeil.position.set(p.x, (p.y || 0) + 0.09, p.z); pfeil.rotation.y = Math.atan2(dx, dz);
    const puls = 1 + Math.sin(performance.now() / 260) * 0.08; ring.scale.setScalar(puls); symbol.position.y = 3.2 + Math.sin(performance.now() / 400) * 0.15;
    // Anzeige (4× pro Sekunde reicht)
    anzeigeUhr -= dt;
    if (anzeigeUhr <= 0) {
      anzeigeUhr = 0.25;
      const rest = L.zeit - L.t;
      const text = (L.phase === 'holen' ? '📦 Abholen: ' + L.b.von.ort : L.b.ding + ' → ' + L.b.nach.ort) + ' · ' + Math.round(d) + ' m' +
        (L.phase === 'bringen' ? ' · ⏱ ' + (rest >= 0 ? mmss(rest) : '+' + mmss(-rest)) : '');
      if (faehrt) { hud.hidden = true; ui.skate({ ziel: text }); }
      else {   // unter der Auftragsbox (links oben), damit nichts überdeckt wird
        const a = document.querySelector('.ly-auftrag'), r = a && a.offsetParent ? a.getBoundingClientRect() : null;
        hud.style.top = (r && r.height ? Math.round(r.bottom + 8) : 14) + 'px'; hud.hidden = false; hud.textContent = text;
      }
    }
    if (d < 2.2 && Math.abs(p.y || 0) < 1.5) {
      if (L.phase === 'holen') {
        L.phase = 'bringen'; L.t = 0; ton('pling'); vib(12); zeigeZiel(); anzeigeUhr = 0;
        ui.toast('<b>' + L.b.ding + ' abgeholt</b><span>' + L.b.von.wer + ': „' + L.b.von.satz + '“ · Ziel: ' + L.b.nach.ort + ' (' + mmss(L.zeit) + ')</span>');
      } else {
        const t = L.t, sterne = t <= L.dist / 7 + 8 ? 3 : t <= L.zeit ? 2 : 1;
        const m = merke(), neu = !m.best[L.b.id];
        m.n++; m.sterne += sterne; m.best[L.b.id] = Math.max(m.best[L.b.id] || 0, sterne); m.zuletzt = L.b.id;
        lauf = null; verstecken(); ton('melodie2'); vib([20, 30, 20]);
        ui.toast('<b>' + '⭐'.repeat(sterne) + ' Geliefert in ' + mmss(t) + '</b><span>' + (L.b.nach.wer === 'der Markt' ? '' : gross(L.b.nach.wer) + ': ') + '„' + L.b.nach.danke + '“' +
          (sterne === 1 ? ' Etwas spät – egal, angekommen ist angekommen.' : '') + '</span>', 'ly-t-ent');
        sichern();
        belohnung({ id: L.b.id, sterne, neu, anzahl: m.n, alle: BOTENGAENGE.every((b) => m.best[b.id]) });
      }
    }
  }
  return { start, tick, abbrechen, aktiv: () => !!lauf, liste: BOTENGAENGE, get lauf() { return lauf; } };
}
