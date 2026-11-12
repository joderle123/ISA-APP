// Tagebuch-Seiten der Quest-Engine (WP31, DESIGN §17): „Aufträge“ (ein Hauptauftrag mit Schritten, Kurzfassungen,
// Überspringen für freiwillige Schritte) und „Skills-Pass“ (39 Aufnäher zum Umdrehen; Stich aus der Echte-Welt-Karte).
// Ersetzt die Hüllen aus ui/journal/pages.js über dieselben Seiten-IDs; DOM-Konventionen bleiben (.patch[data-patch] …).
import { esc } from '../../ui/overlay.js';

const MODULE_COLOR = { 'j1-m0': '#ffb347', 'j1-m1': '#2de2c9', 'j1-m2': '#4cd964', 'j1-m3': '#8fa3ff', 'j1-m4': '#b06bff', 'j1-m5': '#ffd166', 'j1-m6': '#ff6b3d', 'j1-m7': '#ff8ccf', 'j1-m8': '#8fd18b', 'j1-m9': '#fff3a0', joker: '#ffffff' };
const REGION_ICON = { hafen: 'anker', strand: 'muschel', dschungel: 'trommel', klippen: 'windrad', moor: 'stein', markt: 'spraydose', vulkan: 'flamme', glimmer: 'stern', quellen: 'giesskanne', leuchtturm: 'laterne' };
const STATE_LABEL = { gesperrt: 'Gesperrt', kurz: 'Kurzfassung', offen: 'Offen', aktiv: 'Läuft', fertig: 'Geschafft' };
const TEMPLATE_ICON = { wegTor: 'karte', tragen: 'koffer', szene: 'sprechblase', ermitteln: 'lupe', treppe: 'chronik', befreunden: 'herz', lotsen: 'team', boss: 'blitz', bauen: 'hammer', pruefung: 'medaille', nachtwache: 'laterne', erinnerung: 'splitter' };

export const PAGES_CSS = `
.quest-steps{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
.quest-step{display:flex;align-items:center;gap:12px;min-height:56px;padding:6px 12px;border-radius:16px;background:rgba(255,255,255,.05);font-size:calc(16px * var(--txt-scale,1));font-weight:800;opacity:.55}
.quest-step.is-done{opacity:.85}.quest-step.is-done .quest-step-icon{background:#5ad24f;color:var(--ink,#1d1330)}
.quest-step.is-current{opacity:1;background:rgba(255,209,102,.16);border:2px solid var(--c-gold,#ffd166)}
.quest-step-icon{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.12)}
.quest-step small{margin-left:auto;font-size:calc(12px * var(--txt-scale,1));letter-spacing:.1em;text-transform:uppercase;opacity:.8}
.quest-step .btn{margin-left:auto}
.quest-row .btn{margin-left:8px}
.patch-stitch{position:absolute;right:4px;top:4px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:#fff8e6;color:var(--ink,#1d1330);box-shadow:0 2px 6px rgba(0,0,0,.35);z-index:2}
.patch.is-new .patch-front{animation:patch-pop .9s ease}
@keyframes patch-pop{0%{transform:scale(.6)}60%{transform:scale(1.12)}100%{transform:scale(1)}}
`;

export function installQuestPages({ journal, game, quests, audio, icon, speech }) {
  const state = () => game.state;
  const content = () => game.content;
  const units = () => (content() && content().units) || [];
  const questOf = (id) => (content() && content().get('quests', id)) || null;
  const unitOf = (id) => units().find((u) => u.id === id) || null;
  const titleOf = (id) => { const u = unitOf(id), q = questOf(id); return (u && u.quest) || (q && q.title) || id; };

  journal.registerPage({
    id: 'auftraege', label: 'Aufträge', icon: 'auftrag', order: 20,
    badge: () => { const u = state() ? state().get('units', {}) : {}; const n = Object.values(u).filter((s) => s === 'offen' || s === 'aktiv').length; return n || null; },
    render(el) {
      const st = state();
      const us = st ? st.get('units', {}) : {};
      const list = units().filter((u) => !u.teacherOnly || us[u.id]);
      const mainId = quests.active;
      const mainDef = mainId ? questOf(mainId) : null;
      const mainUnit = mainId ? unitOf(mainId) : null;
      const info = mainId ? quests.stepInfo(mainId) : null;
      const prog = mainId ? quests.progress(mainId) : null;
      const q = st ? st.get('quests.' + mainId) || {} : {};
      const steps = mainId ? quests.stepsOf(mainId, info && info.kurz) : [];
      const color = mainUnit ? MODULE_COLOR[mainUnit.module] : '#ffd166';
      const known = list.filter((u) => us[u.id] && us[u.id] !== 'gesperrt' && u.id !== mainId);
      const stepRow = (s, i) => {
        const done = (q.done || []).includes(s.id);
        const cur = info && info.step && info.step.id === s.id;
        return `<li class="quest-step${done ? ' is-done' : ''}${cur ? ' is-current' : ''}" data-step="${esc(s.id)}"><span class="quest-step-icon">${icon(done ? 'haken' : TEMPLATE_ICON[s.template] || 'punkt', { size: 20 })}</span><span>${esc(s.label || s.id)}</span>${cur && s.optional ? `<button class="btn btn-small" type="button" data-skip>${icon('weiter', { size: 18 })}<span>Überspringen</span></button>` : s.optional ? '<small>freiwillig</small>' : cur ? '<small>jetzt</small>' : ''}</li>`;
      };
      el.innerHTML = `
        ${mainDef ? `<article class="quest-main" style="--card:${color}">
            <span class="quest-main-icon">${icon(REGION_ICON[mainDef.region] || 'auftrag', { size: 40 })}</span>
            <div><small>Hauptauftrag · ${esc(info && info.kurz ? 'Kurzfassung' : STATE_LABEL[us[mainId]] || 'Läuft')}${prog ? ` · ${prog.done}/${prog.total}` : ''}</small><h4>${esc(mainDef.title)}</h4><p>${esc(info && info.describe && info.describe.label ? info.describe.label : 'Folge dem Marker auf dem Kompass.')}</p></div>
          </article>
          <ol class="quest-steps">${steps.map(stepRow).join('')}</ol>`
          : `<article class="quest-main is-empty"><span class="quest-main-icon">${icon('schluessel', { size: 40 })}</span><div><small>Noch kein Auftrag</small><h4>Dein Code öffnet die nächste Quest.</h4><p>Du bekommst ihn am Ende der Stunde.</p></div><button class="btn" type="button" data-go-code>${icon('code', { size: 22 })}<span>Code eingeben</span></button></article>`}
        ${known.length ? `<h4 class="jn-sub">Alle Aufträge</h4><ul class="quest-list">${known.map((u) => `<li class="quest-row is-${us[u.id]}" style="--card:${MODULE_COLOR[u.module] || '#fff'}"><span class="quest-row-icon">${icon(us[u.id] === 'fertig' ? 'haken' : REGION_ICON[u.region] || 'auftrag', { size: 22 })}</span><span class="quest-row-text"><b>${esc(u.quest)}</b><small>${esc(u.title)}</small></span><span class="quest-row-state">${esc(STATE_LABEL[us[u.id]])}</span>${us[u.id] === 'kurz' && questOf(u.id) && !(st.get('quests.' + u.id) || {}).kurzDone && !mainId ? `<button class="btn btn-small" type="button" data-kurz="${esc(u.id)}">${icon('play', { size: 18 })}<span>Kurz spielen</span></button>` : ''}</li>`).join('')}</ul>` : ''}`;
      const go = el.querySelector('[data-go-code]');
      if (go) go.addEventListener('click', () => { if (audio) audio.play('tile'); journal.open('code'); });
      el.querySelectorAll('[data-kurz]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); journal.close(); setTimeout(() => quests.startKurz(b.dataset.kurz), 150); }));
      const skip = el.querySelector('[data-skip]');
      if (skip) skip.addEventListener('click', () => { if (audio) audio.play('tile'); quests.skipStep(); journal.refresh(); });
    },
  });

  journal.registerPage({
    id: 'skillspass', label: 'Skills-Pass', icon: 'pass', order: 30,
    badge: () => { const u = state() ? state().get('units', {}) : {}; const n = Object.values(u).filter((s) => s === 'fertig').length; return n || null; },
    render(el) {
      const st = state();
      const us = st ? st.get('units', {}) : {};
      const stiche = st ? st.get('stiche', {}) : {};
      const fresh = st ? st.get('session.newPatches', []) : [];
      const regular = units().filter((u) => !u.joker);
      const joker = units().filter((u) => u.joker && (!u.teacherOnly || us[u.id]));
      const patch = (u) => {
        const q = questOf(u.id);
        // Auch die gespielte Kurzfassung bringt den Aufnäher (state.patches), die Einheit bleibt dabei 'kurz'
        const done = us[u.id] === 'fertig' || (st ? (st.get('patches', []) || []).includes(u.id) : false);
        const back = q && q.patch && q.patch.back ? q.patch.back : `${u.title}.`;
        const ic = q && q.patch && q.patch.icon ? q.patch.icon : (REGION_ICON[u.region] || 'stern');
        const col = q && q.patch && q.patch.color ? q.patch.color : (MODULE_COLOR[u.module] || '#fff');
        return `<button type="button" class="patch${done ? ' is-done' : ''}${us[u.id] && !done ? ' is-open' : ''}${fresh.includes(u.id) ? ' is-new' : ''}" data-patch="${esc(u.id)}" style="--card:${col}" aria-label="${esc(u.quest)}${done ? ', umdrehen' : ''}">
          ${done && stiche[u.id] ? `<span class="patch-stitch" title="Echte Welt: ein Stich">${icon('haken', { size: 16 })}</span>` : ''}
          <span class="patch-inner"><span class="patch-front">${icon(done ? ic : 'schloss', { size: done ? 30 : 22 })}<small>${esc(u.joker ? 'J' + u.nr : String(u.nr))}</small></span><span class="patch-back"><small>${esc((q && q.patch && q.patch.name) || u.quest)}</small><p>${esc(back)}</p></span></span>
        </button>`;
      };
      const havePatch = st ? (st.get('patches', []) || []) : [];
      const done = regular.concat(joker).filter((u) => us[u.id] === 'fertig' || havePatch.includes(u.id)).length;
      el.innerHTML = `
        <p class="jn-lead">${done} von ${regular.length + joker.length} Aufnähern. Tippe einen an, um ihn umzudrehen.</p>
        <div class="patch-grid">${regular.map(patch).join('')}</div>
        ${joker.length ? `<h4 class="jn-sub">Joker</h4><div class="patch-grid">${joker.map(patch).join('')}</div>` : ''}
        <p class="jn-note">Die Rückseite trägt den Kursbegriff. Ein Stich kommt von der Echte-Welt-Karte.</p>`;
      if (st && fresh.length) st.set('session.newPatches', []);
      el.querySelectorAll('[data-patch]').forEach((b) => b.addEventListener('click', () => {
        if (!b.classList.contains('is-done')) { if (audio) audio.play('error'); return; }
        if (audio) audio.play('flip');
        b.classList.toggle('is-flipped');
        if (game.events) game.events.emit('patch:flip', { unit: b.dataset.patch, back: b.classList.contains('is-flipped') });
        if (b.classList.contains('is-flipped') && speech && speech.settings.autoRead) speech.speak(b.querySelector('.patch-back p').textContent, { who: 'erzaehler', interrupt: true, auto: true });
      }));
    },
  });
}
