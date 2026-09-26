// Standard-Seiten des Tagebuchs (Hüllen, DESIGN §17). Spätere Pakete ersetzen sie über journal.registerPage mit derselben id:
//   karte (WP42) · auftraege (WP31) · skillspass (WP31) · koffer (WP33) · chronik (WP54) · echteWelt (WP31) · stil (WP41)
//   code (WP30) · einstellungen (hier, a11y.js) · steuerung
// Alle Seiten lesen nur game.state / game.content und schreiben über state (Echte-Welt-Karte, Code-Einlösung über debug bis WP30).
import { esc } from '../overlay.js';
import { UNIT_MODULE, KOFFER_FAECHER, AMPEL_ZONEN } from '../../content/schema/consts.js';

const MODULE_COLOR = { 'j1-m0': '#ffb347', 'j1-m1': '#2de2c9', 'j1-m2': '#4cd964', 'j1-m3': '#8fa3ff', 'j1-m4': '#b06bff', 'j1-m5': '#ffd166', 'j1-m6': '#ff6b3d', 'j1-m7': '#ff8ccf', 'j1-m8': '#8fd18b', 'j1-m9': '#fff3a0', joker: '#ffffff' };
const REGION_ICON = { hafen: 'anker', strand: 'muschel', dschungel: 'trommel', klippen: 'windrad', moor: 'stein', markt: 'spraydose', vulkan: 'flamme', glimmer: 'stern', quellen: 'giesskanne', leuchtturm: 'laterne' };
const STATE_LABEL = { gesperrt: 'Gesperrt', kurz: 'Kurzfassung', offen: 'Offen', aktiv: 'Läuft', fertig: 'Geschafft' };
const FACH_LABEL = { koerper: 'Körper', sinne: 'Sinne', kopf: 'Kopf', menschen: 'Menschen', aktivitaeten: 'Aktivitäten' };
const FACH_ICON = { koerper: 'sprint', sinne: 'kristall', kopf: 'rune', menschen: 'team', aktivitaeten: 'horn' };
const ZONE_LABEL = { gruen: 'Grün', gelb: 'Gelb', rot: 'Rot' };

export function installDefaultPages(journal, { game, settings, audio, icon, speech }) {
  const state = () => game.state;
  const content = () => game.content;
  const units = () => (content() && content().units) || [];
  const questOf = (id) => (content() && content().get('quests', id)) || null;

  // ---- Karte: Rasterkarte der Insel aus der Höhenfunktion, Zonenfarben, Schleier grau, Spieler ----
  journal.registerPage({
    id: 'karte', label: 'Karte', icon: 'karte', order: 10,
    render(el, ctx) {
      const island = game.world && game.world.island;
      if (!island) { el.innerHTML = '<p class="jn-note">Die Karte lädt noch.</p>'; return; }
      const veil = game.world.veil;
      const N = 64, R = 190;
      const cv = document.createElement('canvas'); cv.width = cv.height = 512; cv.className = 'map-canvas';
      const g = cv.getContext('2d');
      g.fillStyle = '#123a5c'; g.fillRect(0, 0, 512, 512);
      const cell = 512 / N;
      const zoneCol = {}; for (const z of island.ZONES) zoneCol[z.id] = z.color;
      for (let iy = 0; iy < N; iy++) for (let ix = 0; ix < N; ix++) {
        const x = (ix + 0.5) / N * 2 * R - R, z = (iy + 0.5) / N * 2 * R - R;
        const h = island.getHeight(x, z);
        if (h <= 0.05) { if (h > -1.2) { g.fillStyle = '#1d5f86'; g.fillRect(ix * cell, iy * cell, cell + 0.5, cell + 0.5); } continue; }
        const zid = island.zoneAt(x, z);
        const base = zid ? zoneCol[zid] : (h > 18 ? '#8a7f7a' : '#7bbf5a');
        const v = veil ? veil.amountAt(x, z) : 0;
        g.fillStyle = mixGrey(base, v, h);
        g.fillRect(ix * cell, iy * cell, cell + 0.5, cell + 0.5);
      }
      // Zonen-Namen und Schleier-Zustand
      g.textAlign = 'center'; g.textBaseline = 'middle';
      for (const z of island.ZONES) {
        const px = (z.x + R) / (2 * R) * 512, py = (z.z + R) / (2 * R) * 512;
        const veiled = veil && veil.isVeiled && veil.isVeiled(z.id);
        g.font = '700 15px system-ui, sans-serif';
        g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillText(z.name, px + 1, py + 1);
        g.fillStyle = veiled ? '#d8d4e6' : '#fff'; g.fillText(z.name, px, py);
        if (veiled) { g.font = '600 12px system-ui, sans-serif'; g.fillStyle = '#c8c2dc'; g.fillText('Grauschleier', px, py + 17); }
      }
      // Spieler
      const p = game.player.position;
      const px = (p.x + R) / (2 * R) * 512, py = (p.z + R) / (2 * R) * 512;
      g.beginPath(); g.arc(px, py, 9, 0, Math.PI * 2); g.fillStyle = 'rgba(255,209,102,0.35)'; g.fill();
      g.beginPath(); g.arc(px, py, 5, 0, Math.PI * 2); g.fillStyle = '#ffd166'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1d1330'; g.stroke();
      el.innerHTML = `<div class="map-wrap"></div><p class="jn-note">${veil ? 'Grau = dort liegt noch der Schleier. Jeder Code bringt Farbe zurück.' : ''}</p>`;
      el.querySelector('.map-wrap').appendChild(cv);
    },
  });

  // ---- Aufträge: Hauptauftrag + Liste der Einheiten ----
  journal.registerPage({
    id: 'auftraege', label: 'Aufträge', icon: 'auftrag', order: 20,
    badge: () => { const u = state() ? state().get('units', {}) : {}; const n = Object.values(u).filter((s) => s === 'offen' || s === 'aktiv').length; return n || null; },
    render(el) {
      const st = state();
      const us = st ? st.get('units', {}) : {};
      const list = units().filter((u) => !u.teacherOnly || us[u.id]);
      const main = list.find((u) => us[u.id] === 'aktiv') || list.find((u) => us[u.id] === 'offen');
      const known = list.filter((u) => us[u.id] && us[u.id] !== 'gesperrt');
      const q = main ? questOf(main.id) : null;
      el.innerHTML = `
        ${main ? `<article class="quest-main" style="--card:${MODULE_COLOR[main.module] || '#ffd166'}">
            <span class="quest-main-icon">${icon(REGION_ICON[main.region] || 'auftrag', { size: 40 })}</span>
            <div><small>Hauptauftrag · ${esc(STATE_LABEL[us[main.id]])}</small><h4>${esc(main.quest)}</h4><p>${esc(q && q.title !== main.quest ? q.title : (q && q.estMinutes ? `Etwa ${q.estMinutes} Minuten.` : 'Folge dem Marker auf dem Kompass.'))}</p></div>
          </article>`
          : `<article class="quest-main is-empty"><span class="quest-main-icon">${icon('schluessel', { size: 40 })}</span><div><small>Noch kein Auftrag</small><h4>Dein Code öffnet die nächste Quest.</h4><p>Du bekommst ihn am Ende der Stunde.</p></div><button class="btn" type="button" data-go-code>${icon('code', { size: 22 })}<span>Code eingeben</span></button></article>`}
        ${known.length ? `<ul class="quest-list">${known.map((u) => `<li class="quest-row is-${us[u.id]}" style="--card:${MODULE_COLOR[u.module] || '#fff'}"><span class="quest-row-icon">${icon(us[u.id] === 'fertig' ? 'haken' : REGION_ICON[u.region] || 'auftrag', { size: 22 })}</span><span class="quest-row-text"><b>${esc(u.quest)}</b><small>${esc(u.title)}</small></span><span class="quest-row-state">${esc(STATE_LABEL[us[u.id]])}</span></li>`).join('')}</ul>` : ''}`;
      const go = el.querySelector('[data-go-code]');
      if (go) go.addEventListener('click', () => { if (audio) audio.play('tile'); journal.open('code'); });
    },
  });

  // ---- Skills-Pass: 39 Aufnäher, umdrehen zeigt die Rückseite (Kursbegriff) ----
  journal.registerPage({
    id: 'skillspass', label: 'Skills-Pass', icon: 'pass', order: 30,
    badge: () => { const u = state() ? state().get('units', {}) : {}; const n = Object.values(u).filter((s) => s === 'fertig').length; return n || null; },
    render(el) {
      const st = state();
      const us = st ? st.get('units', {}) : {};
      const regular = units().filter((u) => !u.joker);
      const joker = units().filter((u) => u.joker && (!u.teacherOnly || us[u.id]));
      const patch = (u) => {
        const done = us[u.id] === 'fertig';
        const q = questOf(u.id);
        const back = q && q.patch && q.patch.back ? q.patch.back : `${u.title}.`;
        const ic = q && q.patch && q.patch.icon ? q.patch.icon : (REGION_ICON[u.region] || 'stern');
        const col = q && q.patch && q.patch.color ? q.patch.color : (MODULE_COLOR[u.module] || '#fff');
        return `<button type="button" class="patch${done ? ' is-done' : ''}${us[u.id] && !done ? ' is-open' : ''}" data-patch="${esc(u.id)}" style="--card:${col}" aria-label="${esc(u.quest)}${done ? ', umdrehen' : ''}">
          <span class="patch-inner"><span class="patch-front">${icon(done ? ic : 'schloss', { size: done ? 30 : 22 })}<small>${esc(u.joker ? 'J' + u.nr : String(u.nr))}</small></span><span class="patch-back"><small>${esc(u.quest)}</small><p>${esc(back)}</p></span></span>
        </button>`;
      };
      const done = Object.values(us).filter((s) => s === 'fertig').length;
      el.innerHTML = `
        <p class="jn-lead">${done} von ${regular.length + joker.length} Aufnähern. Tippe einen an, um ihn umzudrehen.</p>
        <div class="patch-grid">${regular.map(patch).join('')}</div>
        ${joker.length ? `<h4 class="jn-sub">Joker</h4><div class="patch-grid">${joker.map(patch).join('')}</div>` : ''}`;
      el.querySelectorAll('[data-patch]').forEach((b) => b.addEventListener('click', () => {
        if (!b.classList.contains('is-done')) { if (audio) audio.play('error'); return; }
        if (audio) audio.play('flip');
        b.classList.toggle('is-flipped');
        if (b.classList.contains('is-flipped') && speech && speech.settings.autoRead) speech.speak(b.querySelector('.patch-back p').textContent, { who: 'erzaehler', interrupt: true, auto: true });
      }));
    },
  });

  // ---- Koffer und Ampel (Hülle; WP33 füllt) ----
  journal.registerPage({
    id: 'koffer', label: 'Koffer', icon: 'koffer', order: 40,
    hidden: () => { const st = state(); return !(st && (st.get('abilities', []).includes('ruhe') || st.get('gadgets', []).length)); },
    render(el) {
      const st = state();
      const gadgets = st ? st.get('gadgets', []) : [];
      const ampel = st ? st.get('ampel', {}) : {};
      const defOf = (id) => (content() && content().get('gadgets', id)) || { id, name: id, icon: 'punkt', fach: 'koerper' };
      el.innerHTML = `
        <div class="koffer">${KOFFER_FAECHER.map((f) => `<section class="fach"><h4>${icon(FACH_ICON[f], { size: 22 })}<span>${FACH_LABEL[f]}</span></h4><div class="fach-slots">${gadgets.map(defOf).filter((d) => d.fach === f).map((d) => `<span class="gadget" title="${esc(d.name)}">${icon(d.icon || 'punkt', { size: 24 })}<small>${esc(d.name)}</small></span>`).join('') || '<span class="slot-empty">leer</span>'}</div></section>`).join('')}</div>
        <h4 class="jn-sub">Ampelplan</h4>
        <div class="ampel">${AMPEL_ZONEN.map((z) => `<div class="ampel-zone is-${z}"><b>${ZONE_LABEL[z]}</b><span>${ampel[z] ? esc(defOf(ampel[z]).name) : '–'}</span></div>`).join('')}<div class="ampel-zone is-notfall"><b>Notfall</b><span>${ampel.notfall ? esc(ampel.notfall) : '–'}</span></div></div>
        <p class="jn-note">Umbauen kannst du am Koffer-Stein.</p>`;
    },
  });

  // ---- Chronik: 9 Splitter (Hülle; WP54 füllt) ----
  journal.registerPage({
    id: 'chronik', label: 'Chronik', icon: 'chronik', order: 50,
    hidden: () => { const st = state(); return !(st && st.get('shards', []).length); },
    render(el) {
      const shards = state() ? state().get('shards', []) : [];
      el.innerHTML = `<p class="jn-lead">${shards.length} von 9 Splittern.</p><div class="shards">${Array.from({ length: 9 }, (_, i) => `<span class="shard${shards.includes(i + 1) ? ' is-found' : ''}">${icon('splitter', { size: 30 })}<small>${i + 1}</small></span>`).join('')}</div><p class="jn-note">Die Pinnwand im Baumhaus zeigt die ganze Nacht.</p>`;
    },
  });

  // ---- Echte Welt: eine Karte je fertiger Einheit, einmal antippen ----
  journal.registerPage({
    id: 'echteWelt', label: 'Echte Welt', icon: 'welt', order: 60,
    badge: () => { const st = state(); if (!st) return null; const us = st.get('units', {}); const ew = st.get('echteWelt', {}); const n = Object.keys(us).filter((id) => us[id] === 'fertig' && !ew[id] && questOf(id) && questOf(id).echteWelt).length; return n || null; },
    render(el) {
      const st = state();
      const us = st ? st.get('units', {}) : {};
      const ew = st ? st.get('echteWelt', {}) : {};
      const cards = units().filter((u) => us[u.id] === 'fertig').map((u) => ({ u, q: questOf(u.id) })).filter((x) => x.q && x.q.echteWelt);
      const ANSW = [['gemacht', 'Gemacht', 'check'], ['versucht', 'Versucht', 'drehen'], ['diesmal-nicht', 'Diesmal nicht', 'minus']];
      el.innerHTML = cards.length ? cards.map(({ u, q }) => `
        <article class="ew-card${ew[u.id] ? ' is-answered' : ''}" data-ew="${esc(u.id)}" style="--card:${MODULE_COLOR[u.module] || '#fff'}">
          <small>${esc(u.quest)}</small><p>${esc(typeof q.echteWelt === 'object' ? q.echteWelt.t : q.echteWelt)}</p>
          <div class="ew-answers">${ANSW.map(([v, l, ic]) => `<button type="button" class="btn btn-small${ew[u.id] === v ? ' is-on' : ''}" data-answer="${v}"${ew[u.id] ? ' disabled' : ''}>${icon(ic, { size: 20 })}<span>${l}</span></button>`).join('')}</div>
        </article>`).join('') + '<p class="jn-note">Jede Antwort zählt gleich. Nichts verlässt das Gerät.</p>'
        : '<p class="jn-note">Nach jeder Quest liegt hier eine Karte für die echte Welt.</p>';
      el.querySelectorAll('[data-answer]').forEach((b) => b.addEventListener('click', () => {
        const id = b.closest('[data-ew]').dataset.ew;
        if (st.get('echteWelt.' + id)) return;
        st.set('echteWelt.' + id, b.dataset.answer);
        if (audio) audio.play('pickup');
        if (game.events) game.events.emit('echteWelt:answer', { unit: id, answer: b.dataset.answer });
        journal.refresh();
      }));
    },
  });

  // ---- Stil (Hülle; WP41) ----
  journal.registerPage({
    id: 'stil', label: 'Stil', icon: 'stil', order: 70,
    render(el) {
      const st = state();
      el.innerHTML = `<div class="stil-card"><span class="stil-avatar">${icon('stil', { size: 48 })}</span><div><small>Dein Spielname</small><h4>${esc(st ? st.get('handle', '–') : '–')}</h4><p>Am Spiegel im Baumhaus änderst du Haare, Kleidung und Muster.</p></div></div><p class="jn-note">Kein Shop, kein Geld. Alles kommt aus der Welt.</p>`;
    },
  });

  // ---- Code (Vorstufe; WP30 baut Wortvorschläge und Zahlenrad) ----
  journal.registerPage({
    id: 'code', label: 'Code', icon: 'schluessel', order: 80,
    render(el) {
      const st = state();
      const used = st ? st.get('codesUsed', []) : [];
      el.innerHTML = `
        <p class="jn-lead">Der Code kommt am Ende der Stunde.</p>
        <form class="code-form" autocomplete="off">
          <input class="code-input" type="text" inputmode="latin" autocapitalize="characters" spellcheck="false" maxlength="24" placeholder="WORT" aria-label="Code">
          <button class="btn btn-primary" type="submit">${icon('schluessel', { size: 24 })}<span>Einlösen</span></button>
        </form>
        <p class="code-msg" role="status" aria-live="polite"></p>
        ${used.length ? `<p class="jn-note">${used.length} Code${used.length === 1 ? '' : 's'} auf diesem Gerät eingelöst.</p>` : ''}`;
      const form = el.querySelector('form'), input = el.querySelector('input'), msg = el.querySelector('.code-msg');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = input.value.trim();
        if (!word) return;
        const redeem = (game.plugins && game.plugins.codes && game.plugins.codes.redeem) || (game.debug && game.debug.redeemCode);
        const r = redeem ? redeem(word) : { ok: false, error: 'Codes kommen bald.' };
        msg.className = 'code-msg ' + (r.ok ? 'is-ok' : 'is-bad');
        if (r.ok) {
          const u = r.unit || (r.id && content().unit(r.id));
          msg.textContent = u ? `Geöffnet: ${u.quest}` : 'Code angenommen.';
          if (audio) audio.play('pickup');
          if (speech) speech.speak(msg.textContent, { who: 'erzaehler', interrupt: true, auto: true });
          input.value = '';
          setTimeout(() => journal.open(r.kind === 'teacher' ? 'code' : 'auftraege'), 900);
        } else {
          msg.textContent = r.error || 'Dieser Code passt hier nicht.';
          if (audio) audio.play('error');
        }
      });
      setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e) { /* egal */ } }, 250);
    },
  });

  // ---- Einstellungen ----
  journal.registerPage({ id: 'einstellungen', label: 'Einstellungen', icon: 'zahnrad', order: 90, render: (el) => settings.render(el) });

  // ---- Steuerung ----
  journal.registerPage({
    id: 'steuerung', label: 'Steuerung', icon: 'steuerung', order: 95,
    render(el) {
      const rows = [['Laufen', 'Joystick links', 'WASD'], ['Sprinten', 'Joystick weit', 'automatisch'], ['Umsehen', 'Wischen rechts', 'Maus'], ['Zoomen', 'Zwei Finger', 'Mausrad'], ['Springen', 'Knopf', 'Leertaste'], ['Aktion', 'Knopf', 'E'], ['Kraft', 'Knopf tippen · halten = Rad', 'Q · 1–4'], ['Pause', 'oben rechts', 'Esc'], ['Tagebuch', 'Pause → Tagebuch', 'Tab']];
      el.innerHTML = `<table class="keys"><thead><tr><th></th><th>iPad</th><th>PC</th></tr></thead><tbody>${rows.map(([a, b, c]) => `<tr><th>${a}</th><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody></table>`;
    },
  });
}

// Zonenfarbe mit Schleier grau mischen; Höhe hellt leicht auf
function mixGrey(hex, v, h) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const k = Math.min(1, Math.max(0, v)) * 0.85;
  const light = 1 + Math.min(0.25, h / 120);
  const m = (c) => Math.max(0, Math.min(255, Math.round(((c * (1 - k) + (l * 0.75 + 40) * k)) * light)));
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
