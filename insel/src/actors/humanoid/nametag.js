// Namensschild (Stil-Bibel §11.3): kleine, elegante Pille über dem Kopf, in Bildschirmgröße geklemmt (Text 13–16 px,
// Pille 26–32 px, unabhängig vom Abstand), Glas-Füllung, 1,5 px Ring in der Signaturfarbe, Icon-Scheibe 18 px, Name 800.
//   const tag = createNameTag({ name, icon, color }); group.add(tag.sprite); tag.set({ name }); tag.update(dist); tag.dispose()
//   Sichtbarkeit: tag.update(dist, { far = 34, fade = 4, near = 0 }) blendet jenseits von far aus (und innerhalb von near).
import * as THREE from 'three';
import { icon as svgIcon } from '../../ui/icons.js';

const hasDOM = typeof document !== 'undefined';
const IMG = new Map();   // icon|color → Image
const S = 4;             // Canvas-Auflösung je Bildschirm-Pixel (scharf auf DPR 2)
const CW = 200 * S, CH = 40 * S;   // Canvas in „Bildschirm-Pixeln“ × S: Pille höchstens 32 px hoch, Rand für den Schatten

export function iconImage(name, color = '#ffffff') {
  if (!hasDOM) return null;
  const key = name + '|' + color;
  if (IMG.has(key)) return IMG.get(key);
  const svg = svgIcon(name, { size: 64 }).replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" style="color:${color}" `);
  const img = new Image();
  img.decoding = 'async';
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  IMG.set(key, img);
  return img;
}

export function createNameTag({ name = '', icon = 'punkt', color = '#ffd166', pill = 30, text = 15 } = {}) {
  if (!hasDOM) return { sprite: null, set() {}, update() {}, dispose() {}, name, get hidden() { return false; } };
  const canvas = document.createElement('canvas');
  canvas.width = CW; canvas.height = CH;
  const g = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true, toneMapped: false, sizeAttenuation: false });
  const sprite = new THREE.Sprite(mat);
  sprite.renderOrder = 17;
  sprite.center.set(0.5, 0);
  const cur = { name, icon, color, drawn: '', pill, text, hidden: false, dist: 0, px: 1 };
  let img = null, usedW = CW;

  function draw() {
    const key = cur.name + '|' + cur.icon + '|' + cur.color + '|' + (img && img.complete ? 1 : 0);
    if (key === cur.drawn) return;
    cur.drawn = key;
    g.clearRect(0, 0, CW, CH);
    const ph = 32 * S, r = ph / 2, ih = 18 * S, pad = 7 * S, gap = 6 * S;
    g.font = `800 ${16 * S}px ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", Nunito, "Segoe UI", system-ui, sans-serif`;
    const t = cur.name || '';
    const tw = Math.min(CW - ih - pad * 3 - gap, g.measureText(t).width);
    const w = Math.min(CW - 2 * S, tw + ih + pad * 2 + gap), x0 = (CW - w) / 2, y0 = (CH - ph) / 2;
    usedW = w;
    // Pille: ruhiges Glas + Haarlinie + dünner Ring in der Signaturfarbe
    const pillPath = () => { g.beginPath(); g.moveTo(x0 + r, y0); g.lineTo(x0 + w - r, y0); g.arc(x0 + w - r, y0 + r, r, -Math.PI / 2, Math.PI / 2); g.lineTo(x0 + r, y0 + ph); g.arc(x0 + r, y0 + r, r, Math.PI / 2, -Math.PI / 2); g.closePath(); };
    g.save();
    g.shadowColor = 'rgba(6,2,20,0.35)'; g.shadowBlur = 6 * S; g.shadowOffsetY = 2 * S;
    pillPath(); g.fillStyle = 'rgba(16,10,32,0.55)'; g.fill();
    g.restore();
    pillPath(); g.lineWidth = 1.5 * S; g.strokeStyle = cur.color; g.stroke();
    // Icon-Scheibe
    const cx = x0 + pad + ih / 2, cy = y0 + ph / 2;
    g.beginPath(); g.arc(cx, cy, ih / 2, 0, Math.PI * 2); g.fillStyle = cur.color; g.fill();
    if (img && img.complete && img.naturalWidth > 0) { try { g.drawImage(img, cx - ih * 0.32, cy - ih * 0.32, ih * 0.64, ih * 0.64); } catch (e) { /* egal */ } }
    // Name
    g.fillStyle = '#ffffff'; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillText(t, x0 + pad + ih + gap, cy + 1 * S, CW - ih - pad * 3 - gap);
    tex.needsUpdate = true;
  }
  function loadIcon() {
    img = iconImage(cur.icon, '#14102a');
    if (img && !img.complete) img.addEventListener('load', () => { cur.drawn = ''; draw(); }, { once: true });
  }
  loadIcon();
  draw();

  // Bildschirmgröße festlegen: Pille 32 px nah → 26 px fern, Text folgt (16 → 13 px)
  const _size = new THREE.Vector2();
  sprite.onBeforeRender = (renderer, scene, camera) => {
    renderer.getSize(_size);
    const H = Math.max(1, _size.y);
    const fov = camera.isPerspectiveCamera ? camera.fov : 50;
    const near = 1 - THREE.MathUtils.smoothstep(cur.dist, 5, 30);
    const px = (26 + 6 * near) * (cur.pill / 30);
    const hPx = px * (CH / (32 * S)), wPx = hPx * (CW / CH);   // ganze Canvas-Höhe in Bildschirm-Pixeln
    const f = 2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2) / H;
    sprite.scale.set(wPx * f, hPx * f, 1);
  };

  return {
    sprite,
    get name() { return cur.name; },
    get hidden() { return cur.hidden; },
    set({ name: n, icon: ic, color: c, hidden } = {}) {
      if (n !== undefined) cur.name = n;
      if (c !== undefined) cur.color = c;
      if (hidden !== undefined) cur.hidden = !!hidden;
      if (ic !== undefined && ic !== cur.icon) { cur.icon = ic; loadIcon(); }
      draw();
    },
    // Sichtbarkeit nach Abstand: sanfte Einblendung über `fade` Meter vor `far`
    update(dist, { far = 34, fade = 4, near = 0 } = {}) {
      cur.dist = dist;
      const on = !cur.hidden && dist < far && dist >= near;
      sprite.visible = on;
      if (on) mat.opacity = Math.max(0, Math.min(1, (far - dist) / fade));
    },
    dispose() { tex.dispose(); mat.dispose(); },
  };
}
