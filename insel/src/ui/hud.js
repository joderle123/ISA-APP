// HUD (DOM über dem Canvas): Glimm oben links, Kompass, Pause oben rechts, Joystick-Anzeige, Knöpfe (Springen / Aktion / Kraft),
// Zonen-Banner, Toasts, Menü-Rückfall (das UI-Plugin src/ui/plugin.js ersetzt Pause/Tagebuch durch Overlays), Intro-Titel, Debug.
//   ui.setGlimm({ zone: 'neutral'|'gruen'|'gelb'|'rot', muted }) · ui.onMenuKey() (Esc/Pause; das UI-Plugin überschreibt)
import { icon } from './icons.js';
const ICON = {
  jump: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6"/><path d="M6 11l6-6 6 6"/></svg>',
  power: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.6 6.3L21 9l-5 4.4L17.5 20 12 16.6 6.5 20 8 13.4 3 9l6.4-.7z"/></svg>',
  action: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M8 5v14M16 5v14"/></svg>',
};

export function createHUD({ root, input, events, audio, game }) {
  const params = new URLSearchParams(location.search);
  root.innerHTML = `
    <div class="vignette" aria-hidden="true"></div>
    <div class="flash" aria-hidden="true"></div>
    <div class="hud-top">
      <button class="glimm-badge hud-part" type="button" aria-label="Glimm" data-zone="neutral">${icon('glimm', { size: 34 })}</button>
      <div class="compass hud-part" aria-hidden="true"><div class="compass-strip"></div><div class="compass-needle"></div></div>
      <button class="hud-round hud-menu-btn" type="button" aria-label="Pause" title="Pause">${ICON.menu}</button>
    </div>
    <div class="zone-banner" role="status"><small>Du entdeckst</small><strong>Hafen-Dorf</strong><span class="zb-state"></span></div>
    <div class="toasts" aria-live="polite"></div>
    <div class="joystick is-idle"><div class="joystick-knob"></div></div>
    <div class="hud-buttons hud-part">
      <button class="hud-btn hud-btn-action is-off" type="button" data-btn="action">${ICON.action}<span class="lbl">Aktion</span></button>
      <button class="hud-btn hud-btn-power" type="button" data-btn="power">${ICON.power}<span class="lbl">Kraft</span></button>
      <button class="hud-btn hud-btn-jump" type="button" data-btn="jump">${ICON.jump}<span class="lbl">Springen</span></button>
    </div>
    <div class="key-hints is-hidden"><b>WASD</b> laufen · <b>Maus</b> umsehen · <b>Leertaste</b> springen · <b>E</b> Aktion · <b>Q</b> Kraft · <b>Esc</b> Menü</div>
    <div class="intro-title">LUMO<small>DIE INSEL</small></div>
    <div class="skip-hint is-hidden">Tippen zum Überspringen</div>
    <div class="debug is-hidden"></div>
  `;
  const $ = (s) => root.querySelector(s);
  const el = {
    compassStrip: $('.compass-strip'), banner: $('.zone-banner'), toasts: $('.toasts'), joy: $('.joystick'), knob: $('.joystick-knob'),
    action: $('.hud-btn-action'), actionLbl: $('.hud-btn-action .lbl'), power: $('.hud-btn-power'), powerLbl: $('.hud-btn-power .lbl'),
    jump: $('.hud-btn-jump'), menuBtn: $('.hud-menu-btn'), keys: $('.key-hints'), introTitle: $('.intro-title'), skip: $('.skip-hint'), debug: $('.debug'),
    vignette: $('.vignette'), flash: $('.flash'), glimm: $('.glimm-badge'),
  };
  let flashTimer = 0;

  // ---- Kompass ----
  const PX_PER_RAD = 90;
  const marks = [['N', 0, 'is-main is-north'], ['NO', 45], ['O', 90, 'is-main'], ['SO', 135], ['S', 180, 'is-main'], ['SW', 225], ['W', 270, 'is-main'], ['NW', 315]];
  const markEls = [];
  for (let rep = -1; rep <= 1; rep++) {
    for (const [txt, deg, cls] of marks) {
      const d = document.createElement('div');
      d.className = 'compass-mark ' + (cls || 'is-tick');
      d.textContent = txt;
      d.dataset.deg = String(deg + rep * 360);
      el.compassStrip.appendChild(d);
      markEls.push(d);
    }
  }
  const poiEls = new Map(); // id -> {el, x, z}
  let lastHeading = -999, lastPx = 0, lastPz = 0;
  function updateCompass(camYaw, px, pz) {
    // Blickrichtung → Himmelsrichtung (0° = Norden, im Uhrzeigersinn)
    const heading = ((((-camYaw * 180) / Math.PI) % 360) + 360) % 360;
    if (Math.abs(heading - lastHeading) < 0.2 && Math.abs(px - lastPx) + Math.abs(pz - lastPz) < 0.5) return;
    lastHeading = heading; lastPx = px; lastPz = pz;
    for (const m of markEls) {
      const x = ((+m.dataset.deg - heading) * Math.PI / 180) * PX_PER_RAD;
      m.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), -50%)`;
    }
    poiEls.forEach((p) => {
      let deg = (Math.atan2(p.x - px, -(p.z - pz)) * 180) / Math.PI;
      let d = ((deg - heading + 540) % 360) - 180;
      p.el.style.transform = `translate(calc(-50% + ${((d * Math.PI) / 180 * PX_PER_RAD).toFixed(1)}px), -50%)`;
      p.el.style.opacity = Math.abs(d) < 80 ? 1 : 0;
    });
  }

  // ---- Knöpfe ----
  function bindButton(btn, name) {
    const down = (e) => {
      e.preventDefault(); e.stopPropagation();
      btn.classList.add('is-down');
      if (btn.setPointerCapture && e.pointerId !== undefined) try { btn.setPointerCapture(e.pointerId); } catch (err) { /* egal */ }
      audio.unlock();
      input.press(name);
    };
    const up = (e) => { btn.classList.remove('is-down'); input.release(name); if (e) e.stopPropagation(); };
    btn.addEventListener('pointerdown', down);
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('lostpointercapture', () => { btn.classList.remove('is-down'); input.release(name); });
    btn.addEventListener('touchstart', (e) => { e.stopPropagation(); }, { passive: true });
  }
  bindButton(el.jump, 'jump');
  bindButton(el.action, 'action');
  bindButton(el.power, 'power');
  el.menuBtn.addEventListener('click', () => { audio.play('click'); el.menuBtn.blur(); ui.toggleMenu(); });

  // Touch vs. Tastatur
  function setDeviceClass(d) {
    const touch = d === 'touch' || (d === 'none' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window));
    document.documentElement.classList.toggle('no-touch', !touch);
    el.joy.style.display = touch ? '' : 'none';
    if (!touch && !keysShown && ui.visible) showKeys();
  }
  let keysShown = false;
  function showKeys() {
    keysShown = true;
    el.keys.classList.remove('is-hidden');
    setTimeout(() => el.keys.classList.add('is-out'), 12000);
  }
  events.on('input:device', setDeviceClass);
  setDeviceClass('none');

  // ---- Zonen-Banner ----
  let bannerTimer = 0;
  // ---- Toasts ----
  function toast(text, ms = 2800) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    el.toasts.appendChild(t);
    while (el.toasts.children.length > 3) el.toasts.firstChild.remove();
    setTimeout(() => { t.classList.add('is-out'); setTimeout(() => t.remove(), 450); }, ms);
    return t;
  }

  // ---- Menü ----
  const menuPages = [
    { id: 'tagebuch', label: 'Tagebuch', icon: 'buch', render: (p) => { p.innerHTML = '<p class="menu-note">Hier stehen bald deine Aufträge.</p>'; } },
    { id: 'avatar', label: 'Avatar', icon: 'stil', render: (p) => { p.innerHTML = '<p class="menu-note">Bald kannst du hier dein Aussehen ändern.</p>'; } },
    { id: 'wochencode', label: 'Code', icon: 'schluessel', render: (p) => { p.innerHTML = '<p class="menu-note">Kommt später.</p>'; } },
    { id: 'einstellungen', label: 'Einstellungen', icon: 'zahnrad', render: renderSettings },
    { id: 'hilfe', label: 'Steuerung', icon: 'steuerung', render: (p) => { p.innerHTML = '<div class="menu-row">Laufen<span>Joystick links · WASD</span></div><div class="menu-row">Umsehen<span>Wischen rechts · Maus</span></div><div class="menu-row">Zoomen<span>Zwei Finger · Mausrad</span></div><div class="menu-row">Springen<span>Knopf · Leertaste</span></div><div class="menu-row">Aktion<span>Knopf · E</span></div><div class="menu-row">Kraft<span>Knopf · Q</span></div>'; } },
  ];
  let menuEl = null;
  function renderSettings(p) {
    const s = game.settings;
    const qBtns = [['auto', 'Auto'], ['low', 'Niedrig'], ['medium', 'Mittel'], ['high', 'Hoch']]
      .map(([v, l]) => `<button type="button" data-q="${v}" class="${s.quality === v ? 'is-on' : ''}">${l}</button>`).join('');
    const vBtns = [[0, 'Aus'], [0.4, 'Leise'], [0.8, 'Normal'], [1, 'Laut']]
      .map(([v, l]) => `<button type="button" data-v="${v}" class="${Math.abs(s.volume - v) < 0.05 ? 'is-on' : ''}">${l}</button>`).join('');
    p.innerHTML = `<div class="menu-row">Grafik<div class="seg">${qBtns}</div></div><div class="menu-row">Ton<div class="seg">${vBtns}</div></div>`;
    p.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => { audio.play('click'); game.setQualitySetting(b.dataset.q); renderSettings(p); }));
    p.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => { game.setVolume(+b.dataset.v); audio.play('click'); renderSettings(p); }));
  }
  function openMenu(pageId) {
    if (ui.pauseMenu) return ui.pauseMenu.open(pageId);   // UI-Plugin (Overlays) übernimmt
    closeMenu(true);
    menuEl = document.createElement('div');
    menuEl.className = 'menu';
    const panel = document.createElement('div');
    panel.className = 'menu-panel';
    menuEl.appendChild(panel);
    const page = menuPages.find((m) => m.id === pageId);
    if (!page) {
      panel.innerHTML = `<h2>Pause</h2><div class="menu-grid"><button class="menu-btn is-primary" data-go="weiter">${icon('play', { size: 26 })}<span>Weiter spielen</span></button>${menuPages.map((m) => `<button class="menu-btn" data-go="${m.id}">${icon(m.icon, { size: 26 })}<span>${m.label}</span></button>`).join('')}</div>`;
    } else {
      panel.innerHTML = `<h2>${page.label}</h2><div class="menu-page"></div><button class="menu-btn menu-back" data-go="zurueck">← Zurück</button>`;
      page.render(panel.querySelector('.menu-page'), game);
    }
    panel.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
      audio.play('click');
      const g = b.dataset.go;
      if (g === 'weiter') closeMenu();
      else if (g === 'zurueck') openMenu();
      else openMenu(g);
    }));
    menuEl.addEventListener('pointerdown', (e) => { if (e.target === menuEl) closeMenu(); });
    root.appendChild(menuEl);
    game.setPaused(true);
    events.emit('ui:menu', { open: true, page: pageId || 'main' });
  }
  function closeMenu(silent) {
    if (ui.pauseMenu && !menuEl) { if (ui.overlay) ui.overlay.closeAll('closeMenu'); return; }
    if (!menuEl) return;
    // Fokus lösen, sonst löst die Leertaste (Springen) Knöpfe aus
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    menuEl.remove();
    menuEl = null;
    if (!silent) { game.setPaused(false); events.emit('ui:menu', { open: false }); }
  }
  events.on('input:menu', () => ui.onMenuKey());

  const debugOn = params.has('debug');
  if (debugOn) el.debug.classList.remove('is-hidden');
  let debugT = 0;
  let actionCb = null;
  let lastJs = '';

  const ui = {
    root, el,
    visible: false,
    show(v = true) {
      ui.visible = v;
      root.classList.toggle('is-hidden', false);
      root.classList.toggle('is-faded', !v);
      root.querySelectorAll('.hud-part, .hud-menu-btn').forEach((e) => { e.style.visibility = v ? '' : 'hidden'; });
      if (v && document.documentElement.classList.contains('no-touch') && !keysShown) showKeys();
    },
    toast,
    // Kurzer weißer Lichtblitz (z. B. Start der Farbwelle); sanft, nie stroboskopisch
    flash(strength = 0.7) {
      el.flash.style.setProperty('--flash', String(Math.max(0, Math.min(1, strength))));
      el.flash.classList.add('is-on');
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => el.flash.classList.remove('is-on'), 60);
    },
    // Schleier-Anteil an der Figur (0..1): Randabdunklung wird grau-violett
    setVeil(v) { root.style.setProperty('--veil', String(Math.max(0, Math.min(1, v)))); },
    // Zonen-Banner: name, Untertitel (z. B. „Der Grauschleier liegt hier“)
    showZone(name, sub = '', small = 'Du entdeckst') {
      el.banner.querySelector('small').textContent = small;
      el.banner.querySelector('strong').textContent = name;
      el.banner.querySelector('.zb-state').textContent = sub;
      el.banner.classList.add('is-shown');
      clearTimeout(bannerTimer);
      bannerTimer = setTimeout(() => el.banner.classList.remove('is-shown'), 3400);
    },
    // Kontext-Aktion: label (z. B. „Reden“) oder null zum Ausblenden
    setAction(label, cb) {
      actionCb = cb || null;
      if (label) { el.actionLbl.textContent = label; el.action.classList.remove('is-off'); }
      else el.action.classList.add('is-off');
    },
    get actionCallback() { return actionCb; },
    setPower({ enabled = true, label = 'Kraft' } = {}) {
      el.power.classList.toggle('is-disabled', !enabled);
      el.powerLbl.textContent = label;
    },
    // Kompass-Markierung (z. B. Quest-Ziel): id, x, z, Symbol
    setMarker(id, x, z, symbol = '◆', color = '#ffd166') {
      let p = poiEls.get(id);
      if (!p) {
        const d = document.createElement('div');
        d.className = 'compass-mark is-poi';
        el.compassStrip.appendChild(d);
        p = { el: d, x, z };
        poiEls.set(id, p);
      }
      p.x = x; p.z = z; p.el.textContent = symbol; p.el.style.color = color;
      lastHeading = -999;
    },
    removeMarker(id) { const p = poiEls.get(id); if (p) { p.el.remove(); poiEls.delete(id); } },
    openMenu, closeMenu,
    toggleMenu() { if (ui.menuOpen) closeMenu(); else openMenu(); },
    get menuOpen() { return !!menuEl || !!(ui.pauseMenu && (ui.pauseMenu.isOpen || (ui.journal && ui.journal.isOpen))); },
    // Esc / Pause-Taste (das UI-Plugin ersetzt dies: oberstes Fenster schließen, sonst Pause öffnen)
    onMenuKey() { if (ui.visible) ui.toggleMenu(); },
    // Glimm oben links: zone neutral|gruen|gelb|rot (Farbe = Puls, DESIGN §6), muted = stumm
    setGlimm({ zone = 'neutral', muted = false } = {}) { el.glimm.dataset.zone = zone; el.glimm.classList.toggle('is-muted', !!muted); },
    // Neue Menüseite für spätere Module: { id, label, icon, render(panelEl, game) }
    registerMenuPage(page) {
      const i = menuPages.findIndex((m) => m.id === page.id);
      if (i >= 0) menuPages[i] = page; else menuPages.splice(menuPages.length - 2, 0, page);
    },
    showIntro(on) {
      el.introTitle.classList.toggle('is-shown', !!on);
      el.skip.classList.toggle('is-hidden', !on);
    },
    update(dt, g) {
      // Joystick
      const js = input.state.joystick;
      const jsKey = js.active ? `${js.x}|${js.y}|${js.kx}|${js.ky}` : 'idle' + root.clientHeight;
      if (jsKey === lastJs) { /* unverändert */ } else if (js.active) {
        lastJs = jsKey;
        el.joy.classList.add('is-active'); el.joy.classList.remove('is-idle');
        el.joy.style.left = js.x + 'px'; el.joy.style.top = js.y + 'px';
        el.knob.style.transform = `translate(${js.kx}px, ${js.ky}px)`;
      } else {
        lastJs = jsKey;
        el.joy.classList.remove('is-active'); el.joy.classList.add('is-idle');
        const h = root.clientHeight;
        el.joy.style.left = '120px'; el.joy.style.top = (h - 130) + 'px';
        el.knob.style.transform = 'translate(0px, 0px)';
      }
      updateCompass(g.cameraRig.yaw, g.player.position.x, g.player.position.z);
      if (debugOn) {
        debugT += dt;
        if (debugT > 0.5) {
          debugT = 0;
          const info = g.renderer.info;
          const m = g.quality.monitor;
          const p = g.player.position;
          el.debug.textContent = `FPS ${m.fps.toFixed(0)} (${m.frameMs.toFixed(1)} ms)\nQualität ${g.quality.name} x${g.quality.dpr.toFixed(2)}\nDraws ${info.render.calls} · Dreiecke ${(info.render.triangles / 1000).toFixed(0)}k\nPos ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${p.z.toFixed(1)}\nZone ${g.zone || '–'} · ${g.time.hour.toFixed(2)} Uhr`;
        }
      }
    },
  };
  root.classList.remove('is-hidden');
  ui.show(false);
  return ui;
}
