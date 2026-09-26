// Fotomodus (WP19): freie Kamera um die Figur (Wischen dreht, Joystick schwenkt, Springen/Aktion hebt und senkt),
// Filter (Normal, Warm, Kalt, Schwarzweiß, Retro), Zuschnitt (Frei, Quadrat, Breit). Das Bild bleibt nur auf dem Gerät
// (localStorage lumo.fotos, höchstens 12), Speichern öffnet es zum Sichern. Die Welt steht still, Pause/X immer da.
//   const foto = createPhotoMode({ root, game, events, audio }); foto.enter() · exit() · capture() · photos()
export const PHOTO_KEY = 'lumo.fotos';
export const PHOTO_MAX = 12;
const FILTERS = [
  { id: 'normal', label: 'Normal', css: 'none' },
  { id: 'warm', label: 'Warm', css: 'sepia(0.35) saturate(1.25) contrast(1.05)' },
  { id: 'kalt', label: 'Kalt', css: 'hue-rotate(18deg) saturate(0.9) brightness(1.05) contrast(1.05)' },
  { id: 'sw', label: 'Schwarz-Weiß', css: 'grayscale(1) contrast(1.15)' },
  { id: 'retro', label: 'Retro', css: 'sepia(0.55) contrast(1.2) saturate(0.8) brightness(0.95)' },
];
const FRAMES = [{ id: 'frei', label: 'Frei', ratio: 0 }, { id: 'quadrat', label: 'Quadrat', ratio: 1 }, { id: 'breit', label: 'Breit', ratio: 2.35 }];

const CSS = `
#hud.is-photo .hud-top,#hud.is-photo .hud-buttons,#hud.is-photo .zone-banner,#hud.is-photo .toasts,#hud.is-photo .glimm-badge,#hud.is-photo .key-hints,#hud.is-photo .haltring{visibility:hidden!important}
.photo-bar{position:absolute;left:50%;bottom:calc(14px + var(--safe-b,0px));transform:translateX(-50%);display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;padding:8px 10px;border-radius:22px;background:rgba(24,14,44,.62);border:2px solid rgba(255,255,255,.22);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);max-width:calc(100vw - 32px);z-index:14}
.photo-bar button{min-height:52px;min-width:64px;padding:0 14px;border-radius:16px;font:800 15px var(--font,system-ui);color:#fff;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.15)}
.photo-bar button.is-on{background:var(--c-mint,#2de2c9);color:#1d1330;border-color:transparent}
.photo-bar button.is-shutter{min-width:96px;min-height:64px;border-radius:32px;font-size:18px;background:linear-gradient(180deg,#fff3c4,#ffd166 60%,#ffa94d);color:#1d1330;border-color:transparent}
.photo-bar .sep{width:2px;height:36px;background:rgba(255,255,255,.2);border-radius:2px}
.photo-x{position:absolute;top:calc(12px + var(--safe-t,0px));right:calc(14px + var(--safe-r,0px));width:64px;height:64px;border-radius:50%;background:rgba(24,14,44,.6);border:2px solid rgba(255,255,255,.25);color:#fff;font:900 28px var(--font,system-ui);z-index:14}
.photo-mask{position:absolute;inset:0;pointer-events:none;z-index:13}
.photo-mask .m{position:absolute;background:rgba(10,4,24,.72)}
.photo-hint{position:absolute;left:50%;top:calc(18px + var(--safe-t,0px));transform:translateX(-50%);padding:8px 16px;border-radius:99px;background:rgba(24,14,44,.55);border:2px solid rgba(255,255,255,.2);font:800 14px var(--font,system-ui);color:#fff;z-index:14;white-space:nowrap}
.photo-preview{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:15;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px;border-radius:20px;background:rgba(24,14,44,.85);border:2px solid rgba(255,255,255,.25)}
.photo-preview img{max-width:min(60vw,520px);max-height:50vh;border-radius:12px;display:block}
.photo-preview .row{display:flex;gap:8px}
.photo-preview a,.photo-preview button{min-height:52px;padding:0 18px;border-radius:16px;font:800 16px var(--font,system-ui);color:#fff;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.18);display:flex;align-items:center;text-decoration:none}
.photo-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:16;transition:opacity .2s ease}
.photo-flash.is-on{opacity:.7;transition:none}
`;

export function createPhotoMode({ root, game, events, audio }) {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
  let open = false, filter = 'normal', frame = 'frei';
  let bar = null, xBtn = null, mask = null, hint = null, preview = null, flash = null;
  let wasPaused = false;
  const canvas = game.renderer.domElement;

  function readPhotos() { try { return JSON.parse(localStorage.getItem(PHOTO_KEY) || '[]'); } catch (e) { return []; } }
  function writePhotos(list) { try { localStorage.setItem(PHOTO_KEY, JSON.stringify(list.slice(-PHOTO_MAX))); return true; } catch (e) { return false; } }

  function applyFilter() { canvas.style.filter = (FILTERS.find((f) => f.id === filter) || FILTERS[0]).css; }
  function applyMask() {
    if (!mask) return;
    const fr = FRAMES.find((f) => f.id === frame) || FRAMES[0];
    mask.innerHTML = '';
    if (!fr.ratio) return;
    const W = root.clientWidth, H = root.clientHeight;
    const box = cropBox(W, H, fr.ratio);
    const mk = (l, t, w, h) => { const d = document.createElement('div'); d.className = 'm'; d.style.cssText = `left:${l}px;top:${t}px;width:${w}px;height:${h}px`; mask.appendChild(d); };
    mk(0, 0, W, box.y); mk(0, box.y + box.h, W, H - box.y - box.h); mk(0, box.y, box.x, box.h); mk(box.x + box.w, box.y, W - box.x - box.w, box.h);
  }
  function cropBox(W, H, ratio) {
    if (!ratio) return { x: 0, y: 0, w: W, h: H };
    let w = W, h = W / ratio;
    if (h > H) { h = H; w = H * ratio; }
    return { x: (W - w) / 2, y: (H - h) / 2, w, h };
  }
  // Pixel-Filter für das gespeicherte Bild (funktioniert ohne ctx.filter, auch in Safari)
  function filterPixels(ctx, w, h) {
    if (filter === 'normal') return;
    const img = ctx.getImageData(0, 0, w, h), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i], g = d[i + 1], b = d[i + 2];
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      if (filter === 'sw') { const v = Math.min(255, (l - 128) * 1.15 + 128); r = g = b = v; }
      else if (filter === 'warm') { r = r * 0.7 + l * 0.3 + 18; g = g * 0.75 + l * 0.25 + 4; b = b * 0.8 + l * 0.2 - 16; }
      else if (filter === 'kalt') { r = r * 0.85 + l * 0.15 - 8; g = g * 0.9 + l * 0.1 + 2; b = b * 0.85 + l * 0.15 + 22; }
      else if (filter === 'retro') { r = (r * 0.5 + l * 0.5) * 1.12 + 10; g = (g * 0.5 + l * 0.5) * 1.02; b = (b * 0.5 + l * 0.5) * 0.86; }
      d[i] = Math.max(0, Math.min(255, r)); d[i + 1] = Math.max(0, Math.min(255, g)); d[i + 2] = Math.max(0, Math.min(255, b));
    }
    ctx.putImageData(img, 0, 0);
  }
  function capture() {
    game.renderer.render(game.scene, game.camera);
    const fr = FRAMES.find((f) => f.id === frame) || FRAMES[0];
    const sw = canvas.width, sh = canvas.height;
    const box = cropBox(sw, sh, fr.ratio);
    const scale = Math.min(1, 1280 / box.w);
    const out = document.createElement('canvas');
    out.width = Math.round(box.w * scale); out.height = Math.round(box.h * scale);
    const ctx = out.getContext('2d');
    ctx.drawImage(canvas, box.x, box.y, box.w, box.h, 0, 0, out.width, out.height);
    try { filterPixels(ctx, out.width, out.height); } catch (e) { /* ohne Filter */ }
    const url = out.toDataURL('image/jpeg', 0.86);
    const list = readPhotos();
    list.push({ t: Date.now(), filter, frame, data: url });
    const saved = writePhotos(list);
    audio.play('ausloeser');
    if (flash) { flash.classList.add('is-on'); requestAnimationFrame(() => setTimeout(() => flash.classList.remove('is-on'), 40)); }
    events.emit('photo:taken', { index: Math.min(list.length, PHOTO_MAX) - 1, saved, filter, frame, dataUrl: url });
    showPreview(url);
    return url;
  }
  function showPreview(url) {
    if (preview) preview.remove();
    preview = document.createElement('div');
    preview.className = 'photo-preview hud-interactive';
    preview.innerHTML = `<img alt="Dein Foto" src="${url}"><div class="row"><a download="lumo-foto.jpg" href="${url}" target="_blank">Sichern</a><button type="button" data-close>Weiter</button></div>`;
    preview.querySelector('[data-close]').addEventListener('click', () => { audio.play('click'); preview.remove(); preview = null; });
    root.appendChild(preview);
  }
  function build() {
    bar = document.createElement('div');
    bar.className = 'photo-bar hud-interactive';
    bar.innerHTML = FILTERS.map((f) => `<button type="button" data-filter="${f.id}" class="${f.id === filter ? 'is-on' : ''}">${f.label}</button>`).join('')
      + '<span class="sep"></span>' + FRAMES.map((f) => `<button type="button" data-frame="${f.id}" class="${f.id === frame ? 'is-on' : ''}">${f.label}</button>`).join('')
      + '<span class="sep"></span><button type="button" class="is-shutter" data-shutter>Foto</button>';
    bar.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.filter; bar.querySelectorAll('[data-filter]').forEach((x) => x.classList.toggle('is-on', x === b)); applyFilter(); audio.play('click'); }));
    bar.querySelectorAll('[data-frame]').forEach((b) => b.addEventListener('click', () => { frame = b.dataset.frame; bar.querySelectorAll('[data-frame]').forEach((x) => x.classList.toggle('is-on', x === b)); applyMask(); audio.play('click'); }));
    bar.querySelector('[data-shutter]').addEventListener('click', () => capture());
    xBtn = document.createElement('button');
    xBtn.className = 'photo-x hud-interactive'; xBtn.type = 'button'; xBtn.setAttribute('aria-label', 'Fotomodus schließen'); xBtn.textContent = '×';
    xBtn.addEventListener('click', () => { audio.play('click'); exit(); });
    mask = document.createElement('div'); mask.className = 'photo-mask';
    hint = document.createElement('div'); hint.className = 'photo-hint'; hint.textContent = 'Wischen dreht · Joystick schwenkt · Zwei Finger zoomen';
    flash = document.createElement('div'); flash.className = 'photo-flash';
    root.append(mask, bar, xBtn, hint, flash);
  }
  function enter() {
    if (open || !game.started) return false;
    open = true;
    wasPaused = game.paused;
    if (!wasPaused) game.setPaused(true);
    game.cameraRig.setMode('photo');
    root.classList.add('is-photo');
    build();
    applyFilter(); applyMask();
    events.emit('photo:enter', {});
    return true;
  }
  function exit() {
    if (!open) return;
    open = false;
    for (const e of [bar, xBtn, mask, hint, flash, preview]) if (e) e.remove();
    bar = xBtn = mask = hint = flash = preview = null;
    canvas.style.filter = '';
    root.classList.remove('is-photo');
    game.cameraRig.setMode(null);
    if (!wasPaused) game.setPaused(false);
    events.emit('photo:exit', {});
  }
  window.addEventListener('resize', () => { if (open) applyMask(); });
  events.on('input:menu', () => { if (open) exit(); });

  return {
    get isOpen() { return open; },
    get filter() { return filter; }, get frame() { return frame; },
    FILTERS, FRAMES,
    enter, exit, capture,
    setFilter(id) { if (FILTERS.find((f) => f.id === id)) { filter = id; applyFilter(); } },
    setFrame(id) { if (FRAMES.find((f) => f.id === id)) { frame = id; applyMask(); } },
    photos: readPhotos,
    deletePhoto(i) { const l = readPhotos(); l.splice(i, 1); writePhotos(l); },
    clear() { try { localStorage.removeItem(PHOTO_KEY); } catch (e) { /* egal */ } },
  };
}
