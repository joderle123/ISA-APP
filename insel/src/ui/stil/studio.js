// Stil-Studio (WP41): Editor mit Drehteller-Vorschau. Register: Körper (16 Hauttöne, Statur, Größe), Haare (15 Frisuren,
// Farben), Gesicht (Augen, Brauen, Sommersprossen, Vitiligo), Hilfsmittel (Brille, Hörgerät, Armprothese), Kleidung
// (Kopf, Oberteil, Unterteil, Schuhe, Rücken mit Farben), Muster, Extras (Kosmetik-Inventar: Masken, Kopfsachen, Jacke,
// Segel, Glimm, Spur, Emotes). Spielname wird erzeugt, nie eingetippt. Kein Shop, kein Geld.
//   const studio = createStudio({ game, ui, cosmetics, icon, audio, speech }); studio.open({ first }); studio.close();
//   studio.isOpen · studio.draft · studio.set(key, value) · studio.tab(id) · studio.finish() · studio.preview
import { esc } from '../overlay.js';
import { createPreview } from './preview.js';
import { STIL_CSS } from './css.js';

export const TABS = [
  { id: 'koerper', label: 'Körper', icon: 'team', focus: 'ganz' },
  { id: 'haare', label: 'Haare', icon: 'stil', focus: 'kopf' },
  { id: 'gesicht', label: 'Gesicht', icon: 'augen', focus: 'kopf' },
  { id: 'hilfsmittel', label: 'Hilfsmittel', icon: 'blick', focus: 'kopf' },
  { id: 'kleidung', label: 'Kleidung', icon: 'koffer', focus: 'ganz' },
  { id: 'muster', label: 'Muster', icon: 'karte', focus: 'oben' },
  { id: 'extras', label: 'Extras', icon: 'stern', focus: 'ganz' },
];
export const LABELS = {
  hairStyle: { kurz: 'Kurz', lang: 'Lang', locken: 'Locken', afro: 'Afro', locs: 'Locs', flechtzoepfe: 'Flechtzöpfe', buzz: 'Buzz', dutt: 'Dutt', stachel: 'Stachel', glatze: 'Glatze', kopftuch: 'Kopftuch', zopf: 'Zopf', bob: 'Bob', undercut: 'Undercut', irokese: 'Irokese' },
  brows: { normal: 'Normal', schmal: 'Schmal', stark: 'Stark', geschwungen: 'Geschwungen' },
  glasses: { keine: 'Keine', rund: 'Rund', eckig: 'Eckig', sport: 'Sport' },
  hearingAid: { keins: 'Keins', links: 'Links', rechts: 'Rechts', beide: 'Beide' },
  prosthesis: { keine: 'Keine', links: 'Links', rechts: 'Rechts' },
  head: { keins: 'Nichts', cap: 'Cap', muetze: 'Mütze', kopfhoerer: 'Kopfhörer', bandana: 'Bandana', stirnband: 'Stirnband', kapuze: 'Kapuze auf' },
  topStyle: { hoodie: 'Hoodie', tshirt: 'T-Shirt', jacke: 'Jacke', hemd: 'Hemd', tanktop: 'Tanktop', pullover: 'Pullover', crewjacke: 'Crew-Jacke' },
  bottomsStyle: { lang: 'Lang', kurz: 'Kurz', jogger: 'Jogger', cargo: 'Cargo', rock: 'Rock' },
  shoesStyle: { sneaker: 'Sneaker', boots: 'Boots', sandalen: 'Sandalen', high: 'High-Tops' },
  pattern: { keins: 'Kein Muster', streifen: 'Streifen', camo: 'Camo', verlauf: 'Verlauf', batik: 'Batik', leuchtkante: 'Leuchtkante' },
  back: { keins: 'Nichts', rucksack: 'Rucksack' },
  freckles: { 0: 'Keine', 1: 'Wenige', 2: 'Viele' },
};
const parseVal = (v) => (v === 'true' ? true : v === 'false' ? false : /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v);

export function createStudio({ game, ui, cosmetics, icon, audio, speech }) {
  const A = game.avatar;
  const { events, state } = game;
  let handle = null, preview = null, draft = null, tabId = 'koerper', first = false, canvas = null, ro = null;
  let styleEl = null;
  const play = (n) => { if (audio) audio.play(n); };

  function ensureCss() {
    if (styleEl) return;
    styleEl = document.createElement('style');
    styleEl.textContent = STIL_CSS;
    document.head.appendChild(styleEl);
  }
  const dyes = () => cosmetics.dyes();
  const allDyes = () => [...A.CLOTH_COLORS, ...dyes().filter((d) => !A.CLOTH_COLORS.includes(d))];

  // ---- Bausteine ----
  const opts = (key, list, cur, labels = LABELS[key] || {}, extra = '') => `<div class="st-opts" data-opts="${key}">${list.map((v) => `<button type="button" class="st-opt${String(cur) === String(v) ? ' is-on' : ''}" data-key="${key}" data-val="${esc(v)}" role="radio" aria-checked="${String(cur) === String(v)}">${esc(labels[v] !== undefined ? labels[v] : v)}</button>`).join('')}${extra}</div>`;
  const swatches = (key, colors, cur, { fresh = [] } = {}) => `<div class="st-swatches" data-opts="${key}">${colors.map((c) => `<button type="button" class="st-swatch${cur === c ? ' is-on' : ''}${fresh.includes(c) ? ' is-new' : ''}" data-key="${key}" data-val="${c}" style="--c:${c}" aria-label="Farbe ${c}" aria-pressed="${cur === c}"></button>`).join('')}</div>`;
  const slider = (key, lo, hi, cur) => `<div class="st-slider"><span>${lo}</span><input type="range" min="0" max="1" step="0.05" value="${Number(cur)}" data-key="${key}" aria-label="${lo} bis ${hi}"><span>${hi}</span></div>`;
  const group = (title, body, hint = '') => `<section class="st-group"><h4>${esc(title)}${hint ? `<span class="st-hint">${esc(hint)}</span>` : ''}</h4>${body}</section>`;
  const clothColors = (key, cur) => swatches(key, allDyes(), cur, { fresh: dyes() });

  function itemButton(it, { equipped, owned }) {
    const on = equipped === it.id;
    const lock = !owned;
    return `<button type="button" class="st-opt is-item${on ? ' is-on' : ''}${lock ? ' is-locked' : ''}" data-item="${esc(it.id)}" data-slot="${esc(it.slot)}" ${lock ? 'aria-disabled="true"' : ''} style="--c:${it.color || '#fff'}">
      <span class="${lock ? 'st-lock' : ''}">${icon(lock ? 'schloss' : it.icon || 'stern', { size: 26 })}</span><span>${esc(it.name || it.id)}</span><small>${esc(lock ? cosmetics.sourceText(it) : on ? 'Angelegt' : 'Antippen')}</small></button>`;
  }

  const PANELS = {
    koerper: (d) => group('Hautton', swatches('skin', A.SKIN_TONES, d.skin)) + group('Statur', slider('build', 'Schlank', 'Kräftig', d.build)) + group('Größe', slider('height', 'Kleiner', 'Größer', d.height)),
    haare: (d) => group('Frisur', opts('hairStyle', A.HAIR_STYLES, d.hairStyle)) + (d.hairStyle === 'kopftuch' ? group('Tuchfarbe', clothColors('headColor', d.headColor)) : '') + (d.hairStyle !== 'glatze' && d.hairStyle !== 'kopftuch' ? group('Haarfarbe', swatches('hair', A.HAIR_COLORS, d.hair)) : '') + (['zopf', 'dutt', 'locs', 'flechtzoepfe'].includes(d.hairStyle) ? group('Haarschmuck', swatches('hairAccent', ['#ffd166', '#2de2c9', '#ff4f8b', '#ffffff', '#ff8a3d', '#8fa3ff', '#1d1d26'], d.hairAccent)) : ''),
    gesicht: (d) => group('Augen', swatches('eyes', A.EYE_COLORS, d.eyes)) + group('Brauen', opts('brows', A.BROW_STYLES, d.brows)) + group('Sommersprossen', opts('freckles', [0, 1, 2], d.freckles)) + group('Vitiligo', opts('vitiligo', [0, 1], d.vitiligo, { 0: 'Nein', 1: 'Ja' })),
    hilfsmittel: (d) => group('Brille', opts('glasses', A.GLASSES, d.glasses) + (d.glasses !== 'keine' ? `<div style="height:8px"></div>${swatches('glassesColor', ['#1d1d26', '#ff5d73', '#3e78e0', '#e9dcc4', '#ffd166', '#2de2c9'], d.glassesColor)}` : '')) + group('Hörgerät', opts('hearingAid', A.HEARING_AIDS, d.hearingAid)) + group('Armprothese', opts('prosthesis', A.PROSTHESES, d.prosthesis) + (d.prosthesis !== 'keine' ? `<div style="height:8px"></div>${swatches('prosthesisColor', ['#8fa3ff', '#ff8a3d', '#c9ced6', '#2de2c9', '#1d1d26', '#ff4f8b'], d.prosthesisColor)}` : '')) + (d.prosthesis !== 'keine' || d.hearingAid !== 'keins' ? group('Leuchtfarbe', swatches('aidColor', ['#2de2c9', '#ffd166', '#ff4f8b', '#8fa3ff', '#5ad24f'], d.aidColor), 'Für Prothese und Hörgerät') : ''),
    kleidung: (d) => group('Kopf', opts('head', A.HEAD_ITEMS.filter((h) => h !== 'kapuze' || d.topStyle === 'hoodie' || d.topStyle === 'crewjacke'), d.head) + (d.head !== 'keins' && d.head !== 'kapuze' ? `<div style="height:8px"></div>${clothColors('headColor', d.headColor)}` : ''))
      + group('Oberteil', opts('topStyle', A.TOP_STYLES.filter((t) => t !== 'crewjacke' || d.topStyle === 'crewjacke'), d.topStyle) + `<div style="height:8px"></div>${clothColors('top', d.top)}`)
      + group('Unterteil', opts('bottomsStyle', A.BOTTOM_STYLES, d.bottomsStyle) + `<div style="height:8px"></div>${clothColors('bottoms', d.bottoms)}`)
      + group('Schuhe', opts('shoesStyle', A.SHOE_STYLES, d.shoesStyle) + `<div style="height:8px"></div>${clothColors('shoes', d.shoes)}`)
      + group('Schuh-Akzent', swatches('shoesAccent', ['#ffd166', '#2de2c9', '#ff4f8b', '#ffffff', '#ff8a3d', '#1d1d26', '#8fa3ff'], d.shoesAccent))
      + group('Rücken', opts('back', A.BACK_ITEMS, d.back) + (d.back !== 'keins' ? `<div style="height:8px"></div>${clothColors('backColor', d.backColor)}` : '')),
    muster: (d) => group('Muster', opts('pattern', A.PATTERNS, d.pattern)) + (d.pattern !== 'keins' ? group('Musterfarbe', clothColors('patternColor', d.patternColor)) : '') + `<p class="st-note">Muster liegen auf Oberteil und Ärmeln. Leuchtkante glüht nachts.</p>`,
    extras: () => {
      const eq = cosmetics.equipped;
      const sect = (slot, title, hint) => {
        const list = cosmetics.list(slot);
        if (!list.length) return '';
        const ownedN = list.filter((it) => cosmetics.isOwned(it.id)).length;
        return group(title, `<div class="st-opts" data-slot="${slot}">${slot !== 'emote' ? `<button type="button" class="st-opt${!eq[slot] ? ' is-on' : ''}" data-item="" data-slot="${slot}">${esc(slot === 'jacke' ? 'Normal' : 'Ohne')}</button>` : ''}${list.map((it) => itemButton(it, { equipped: eq[slot], owned: cosmetics.isOwned(it.id) })).join('')}</div>`, `${ownedN} von ${list.length}${hint ? ' · ' + hint : ''}`);
      };
      return sect('emote', 'Emotes', 'Antippen: vorführen') + sect('maske', 'Tiermasken') + sect('kopf', 'Besondere Kopfsachen') + sect('jacke', 'Crew-Jacke') + sect('segel', 'Segel') + sect('glimm', 'Glimm-Skin') + sect('spur', 'Spur') + '<p class="st-note">Alles hier kommt aus der Welt. Kein Shop, kein Geld.</p>';
    },
  };

  function renderPanel() {
    if (!handle) return;
    const panel = handle.el.querySelector('.st-panel');
    panel.dataset.tab = tabId;
    panel.innerHTML = PANELS[tabId](draft);
    handle.el.querySelectorAll('.st-tab').forEach((b) => { const on = b.dataset.tab === tabId; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); });
    const tab = TABS.find((t) => t.id === tabId);
    if (preview && tab) preview.focus(tab.focus);
  }
  function renderEmotes() {
    if (!handle) return;
    const el = handle.el.querySelector('.st-emotes');
    const names = cosmetics.emotes();
    const fav = cosmetics.equipped.emote;
    el.innerHTML = names.map((n) => `<button type="button" class="st-opt${fav && (cosmetics.byId(fav) || {}).params && cosmetics.byId(fav).params.emote === n ? ' is-on' : ''}" data-emote="${esc(n)}" title="${esc(A.EMOTE_LABEL[n] || n)}" aria-label="${esc(A.EMOTE_LABEL[n] || n)}">${icon(A.EMOTE_ICON[n] || 'stern', { size: 24 })}<span>${esc(A.EMOTE_LABEL[n] || n)}</span></button>`).join('');
  }
  function renderHandle() { if (handle) handle.el.querySelector('.st-handle b').textContent = A.handle; }
  function previewLook() { return cosmetics.withEquipped(draft); }
  function syncPreview() { if (preview) preview.setConfig(previewLook()); }

  function set(key, value) {
    if (!draft) return;
    draft = A.normalizeConfig({ ...draft, [key]: value });
    syncPreview();
    // Nur Markierungen aktualisieren; bei abhängigen Schlüsseln das Register neu zeichnen
    if (['hairStyle', 'topStyle', 'glasses', 'prosthesis', 'hearingAid', 'head', 'back', 'pattern'].includes(key)) renderPanel();
    else if (handle) handle.el.querySelectorAll(`[data-key="${key}"]`).forEach((b) => { if (b.tagName === 'INPUT') return; const on = String(parseVal(b.dataset.val)) === String(draft[key]); b.classList.toggle('is-on', on); b.setAttribute(b.classList.contains('st-swatch') ? 'aria-pressed' : 'aria-checked', String(on)); });
    events.emit('stil:change', { key, value: draft[key] });
  }
  function save() {
    if (!draft) return;
    A.setAvatar(draft, { first });
    first = false;
  }

  function build(body) {
    body.classList.remove('ov-scroll');
    body.innerHTML = `<div class="st-wrap">
      <section class="st-left">
        <div class="st-preview">
          <canvas aria-label="Vorschau deiner Figur"></canvas>
          <div class="st-handle"><span class="st-handle-text"><small>Dein Spielname</small><b>${esc(A.handle)}</b></span><button class="btn" type="button" data-reroll aria-label="Neuer Spielname" title="Neuer Spielname">${icon('drehen', { size: 26 })}</button></div>
          <div class="st-turn"><button class="btn" type="button" data-turn="-1" aria-label="Nach links drehen">${icon('zurueck', { size: 26 })}</button><button class="btn" type="button" data-turn="0" aria-label="Von vorn">${icon('augen', { size: 26 })}</button><button class="btn" type="button" data-turn="1" aria-label="Nach rechts drehen">${icon('weiter', { size: 26 })}</button></div>
        </div>
        <div class="st-emotes" role="group" aria-label="Emotes vorführen"></div>
      </section>
      <section class="st-right">
        <nav class="st-tabs" role="tablist">${TABS.map((t) => `<button type="button" class="st-tab" role="tab" data-tab="${t.id}">${icon(t.icon, { size: 24 })}<span>${t.label}</span></button>`).join('')}</nav>
        <div class="st-panel ov-scroll"></div>
        <footer class="st-foot">
          <button class="btn" type="button" data-random>${icon('drehen', { size: 24 })}<span>Zufall</span></button>
          <button class="btn" type="button" data-reset>${icon('rueckzug', { size: 24 })}<span>Zurück</span></button>
          <span class="st-spacer"></span>
          <button class="btn btn-primary" type="button" data-done>${icon('check', { size: 26 })}<span>Fertig</span></button>
        </footer>
      </section>
    </div>`;
    canvas = body.querySelector('canvas');
    preview = createPreview({ canvas, quality: game.quality.name });
    preview.setConfig(previewLook());
    preview.start();
    // Wischen dreht die Figur
    let drag = null;
    canvas.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, id: e.pointerId }; canvas.setPointerCapture(e.pointerId); e.stopPropagation(); });
    canvas.addEventListener('pointermove', (e) => { if (!drag || e.pointerId !== drag.id) return; preview.rotate((e.clientX - drag.x) * 0.012); drag.x = e.clientX; e.stopPropagation(); });
    const endDrag = (e) => { if (drag && e.pointerId === drag.id) drag = null; };
    canvas.addEventListener('pointerup', endDrag); canvas.addEventListener('pointercancel', endDrag);
    body.addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.tab) { play('tile'); tabId = t.dataset.tab; renderPanel(); return; }
      if (t.dataset.key !== undefined && t.dataset.val !== undefined) { play('tile'); set(t.dataset.key, parseVal(t.dataset.val)); return; }
      if (t.dataset.turn !== undefined) { play('click'); const d = Number(t.dataset.turn); if (d === 0) preview.front(); else preview.rotate(d * 0.9); return; }
      if (t.dataset.reroll !== undefined) { play('flip'); A.rerollHandle(); renderHandle(); if (speech) speech.speak(A.handle, { who: 'erzaehler', interrupt: true }); return; }
      if (t.dataset.random !== undefined) { play('flip'); randomize(); return; }
      if (t.dataset.reset !== undefined) { play('close'); draft = A.base(); syncPreview(); renderPanel(); return; }
      if (t.dataset.done !== undefined) { play('pickup'); save(); handle.close('fertig'); return; }
      if (t.dataset.emote !== undefined) { play('click'); preview.playEmote(t.dataset.emote); const it = cosmetics.list('emote').find((x) => x.params && x.params.emote === t.dataset.emote); if (it && cosmetics.isOwned(it.id)) { cosmetics.equip('emote', it.id); renderEmotes(); } return; }
      if (t.dataset.item !== undefined) {
        const slot = t.dataset.slot, id = t.dataset.item;
        if (id && !cosmetics.isOwned(id)) { play('error'); if (speech) speech.speak(cosmetics.sourceText(cosmetics.byId(id)), { who: 'erzaehler', interrupt: true, auto: true }); return; }
        play('tile');
        if (slot === 'emote') { const it = cosmetics.byId(id); if (it) preview.playEmote(it.params.emote); }
        cosmetics.equip(slot, cosmetics.equipped[slot] === id ? null : id);
        syncPreview(); renderPanel(); renderEmotes();
      }
    });
    body.addEventListener('input', (e) => { const t = e.target; if (t.tagName === 'INPUT' && t.dataset.key) set(t.dataset.key, Number(t.value)); });
    body.addEventListener('change', () => play('tile'));
    renderPanel();
    renderEmotes();
    const onResize = () => preview && preview.resize();
    window.addEventListener('resize', onResize);
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(onResize); ro.observe(canvas.parentElement); }
    requestAnimationFrame(onResize);
    handle._cleanup = () => { window.removeEventListener('resize', onResize); if (ro) { ro.disconnect(); ro = null; } };
  }

  function randomize() {
    const r = A.randomConfig(game.rng.fork('stil-' + state.inc('session.stilRolls')));
    // Identität bleibt: Hautton, Gesicht und Hilfsmittel wie gewählt – Zufall gilt für Haare, Kleidung und Muster
    const keep = ['skin', 'eyes', 'brows', 'freckles', 'vitiligo', 'glasses', 'glassesColor', 'hearingAid', 'prosthesis', 'prosthesisColor', 'aidColor', 'build', 'height', 'patches', 'jacket', 'mask'];
    const next = { ...r };
    for (const k of keep) next[k] = draft[k];
    if (draft.topStyle === 'crewjacke') next.topStyle = 'crewjacke';
    draft = A.normalizeConfig(next);
    syncPreview(); renderPanel();
  }

  const studio = {
    get isOpen() { return !!handle && handle.open; },
    get draft() { return draft ? { ...draft } : null; },
    get preview() { return preview; },
    get tabId() { return tabId; },
    set, tab(id) { if (TABS.some((t) => t.id === id)) { tabId = id; renderPanel(); } },
    randomize,
    finish() { save(); if (handle) handle.close('fertig'); },
    open({ first: isFirst = false, tab } = {}) {
      if (studio.isOpen) { if (tab) studio.tab(tab); return handle; }
      ensureCss();
      first = !!isFirst;
      draft = A.base();
      tabId = tab || 'koerper';
      if (ui.journal && ui.journal.isOpen) ui.journal.close();
      handle = ui.overlay.open({
        id: 'stil-studio', title: first ? 'Das bist du' : 'Stil-Studio', subtitle: first ? 'Mach dich fertig für die Insel.' : 'Spiegel im Baumhaus', icon: 'stil', kind: 'full', pause: true, cls: 'ov-stil', backdropClose: false,
        content: (body, h) => { handle = h; build(body); },
        onClose: (reason) => {
          // X oder Esc: Änderungen bleiben (kein verlorener Look), beim ersten Start wird der Avatar damit festgelegt
          if (reason !== 'fertig') save();
          if (handle && handle._cleanup) handle._cleanup();
          if (preview) { preview.dispose(); preview = null; }
          handle = null; canvas = null;
          events.emit('stil:close', { reason });
        },
      });
      events.emit('stil:open', { first });
      if (first && speech) speech.speak('Das bist du. Mach dich fertig für die Insel.', { who: 'erzaehler', interrupt: true, auto: true });
      return handle;
    },
    close() { if (handle) handle.close('close'); },
  };
  return studio;
}
