// Icon-Namensschild (WP34, DESIGN §1): Sprite über dem Kopf mit Signaturfarbe, Icon (aus ui/icons.js) und Name.
//   const tag = createNameTag({ name, icon, color }); group.add(tag.sprite); tag.set({ name }); tag.update(dist); tag.dispose()
// Das Icon wird als SVG-Bild in die Canvas gezeichnet (asynchron); bis dahin steht ein farbiger Kreis.
import * as THREE from 'three';
import { icon as svgIcon } from '../../ui/icons.js';

const hasDOM = typeof document !== 'undefined';
const IMG = new Map();   // icon|color → HTMLImageElement (geladen oder ladend)

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

export function createNameTag({ name = '', icon = 'punkt', color = '#ffd166', width = 256, height = 72 } = {}) {
  if (!hasDOM) return { sprite: null, set() {}, update() {}, dispose() {}, name };
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const g = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true, toneMapped: false });
  const sprite = new THREE.Sprite(mat);
  sprite.renderOrder = 17;
  sprite.center.set(0.5, 0);
  const cur = { name, icon, color, drawn: '' };
  let img = null;

  function draw() {
    const key = cur.name + '|' + cur.icon + '|' + cur.color + '|' + (img && img.complete ? 1 : 0);
    if (key === cur.drawn) return;
    cur.drawn = key;
    g.clearRect(0, 0, width, height);
    g.font = '800 30px ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", system-ui, sans-serif';
    const text = cur.name || '';
    const tw = Math.min(width - 90, g.measureText(text).width);
    const pad = 14, ih = 44, w = Math.min(width, tw + ih + pad * 2 + 8), x0 = (width - w) / 2, y0 = (height - 56) / 2;
    // Pille
    g.beginPath();
    const r = 28;
    g.moveTo(x0 + r, y0); g.lineTo(x0 + w - r, y0); g.arc(x0 + w - r, y0 + r, r, -Math.PI / 2, Math.PI / 2); g.lineTo(x0 + r, y0 + 56); g.arc(x0 + r, y0 + r, r, Math.PI / 2, -Math.PI / 2);
    g.closePath();
    g.fillStyle = 'rgba(20,12,40,0.78)'; g.fill();
    g.lineWidth = 3; g.strokeStyle = cur.color; g.stroke();
    // Icon-Kreis
    g.beginPath(); g.arc(x0 + pad + ih / 2, y0 + 28, ih / 2, 0, Math.PI * 2); g.fillStyle = cur.color; g.fill();
    if (img && img.complete && img.naturalWidth > 0) { try { g.drawImage(img, x0 + pad + 6, y0 + 28 - ih / 2 + 6, ih - 12, ih - 12); } catch (e) { /* egal */ } }
    // Name
    g.fillStyle = '#ffffff'; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillText(text, x0 + pad + ih + 8, y0 + 29, width - 90);
    tex.needsUpdate = true;
    // Weltgröße: 0,48 m hoch, Breite im Seitenverhältnis der ganzen Canvas (die Pille sitzt mittig)
    sprite.scale.set((width / height) * 0.48, 0.48, 1);
  }
  function loadIcon() {
    img = iconImage(cur.icon, '#1d1330');
    if (img && !img.complete) img.addEventListener('load', () => { cur.drawn = ''; draw(); }, { once: true });
  }
  loadIcon();
  draw();

  return {
    sprite,
    get name() { return cur.name; },
    set({ name: n, icon: ic, color: c } = {}) {
      if (n !== undefined) cur.name = n;
      if (c !== undefined) cur.color = c;
      if (ic !== undefined && ic !== cur.icon) { cur.icon = ic; loadIcon(); }
      draw();
    },
    // Sichtbarkeit nach Abstand (nah = groß, fern = aus)
    update(dist) {
      const on = dist < 34;
      sprite.visible = on;
      if (on) mat.opacity = Math.max(0, Math.min(1, (34 - dist) / 8));
    },
    dispose() { tex.dispose(); mat.dispose(); },
  };
}
