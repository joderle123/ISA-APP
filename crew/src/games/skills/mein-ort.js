/* Spiel „Mein Ort“ (Thema: Anspannung & Skills) · Vorlage T0 Solo · j1-e14 (Solo-Ergänzung, auch für zu Hause)
   Statt einer vorgelesenen Traumreise baust du deinen Ort aus Bausteinen: Ort, Licht, Wetter, Temperatur, bis zu drei
   Klang-Spuren (Regen, Meer, Zug, Wind, Feuer, Vögel, Grillen, Klangteppich) und ein Gegenstand. Daraus wird eine
   Ambient-Szene mit Klang für 1–3 Minuten (WebAudio, selbst erzeugt, offline). Zahl 0–100 vorher und nachher.
   Das Rezept bleibt nur auf Wunsch auf diesem Gerät (nur Kennungen wie „strand“, keine Namen, „Vergessen“ löscht es).
   Level: 1) Bauen, 2) Eintauchen, 3) Mitnehmen (wann brauchst du deinen Ort?). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Bauen', 'Eintauchen', 'Mitnehmen'];
  const STORE_KEY = 'meinOrtRezept';
  const BAUSTEINE = [
    { id: 'ort', label: 'Ort', opts: [{ id: 'strand', t: 'Strand' }, { id: 'wald', t: 'Wald' }, { id: 'berg', t: 'Berge' }, { id: 'zimmer', t: 'Am Fenster' }, { id: 'dach', t: 'Dach über der Stadt' }] },
    { id: 'licht', label: 'Licht', opts: [{ id: 'morgen', t: 'Morgen' }, { id: 'mittag', t: 'Mittag' }, { id: 'abend', t: 'Abendrot' }, { id: 'nacht', t: 'Nacht' }] },
    { id: 'wetter', label: 'Wetter', opts: [{ id: 'klar', t: 'Klar' }, { id: 'wolken', t: 'Wolken' }, { id: 'regen', t: 'Regen' }, { id: 'schnee', t: 'Schnee' }, { id: 'nebel', t: 'Nebel' }] },
    { id: 'temp', label: 'Temperatur', opts: [{ id: 'kuehl', t: 'Kühl' }, { id: 'mild', t: 'Mild' }, { id: 'warm', t: 'Warm' }] },
    { id: 'klang', label: 'Klang (bis zu 3)', multi: 3, opts: [{ id: 'regen', t: 'Regen' }, { id: 'meer', t: 'Meer' }, { id: 'zug', t: 'Zug' }, { id: 'wind', t: 'Wind' }, { id: 'feuer', t: 'Lagerfeuer' }, { id: 'voegel', t: 'Vögel' }, { id: 'grillen', t: 'Grillen' }, { id: 'musik', t: 'Klangteppich' }] },
    { id: 'ding', label: 'Gegenstand', opts: [{ id: 'tasse', t: 'Tasse Tee' }, { id: 'decke', t: 'Kuscheldecke' }, { id: 'katze', t: 'Katze' }, { id: 'buch', t: 'Buch' }, { id: 'kopfhoerer', t: 'Kopfhörer' }, { id: 'skate', t: 'Skateboard' }] },
  ];
  const BB = Object.fromEntries(BAUSTEINE.map((b) => [b.id, b]));
  const STANDARD = { ort: 'strand', licht: 'abend', wetter: 'klar', temp: 'warm', klang: ['meer', 'wind'], ding: 'tasse' };
  const tOf = (bid, id) => (BB[bid].opts.find((o) => o.id === id) || {}).t || id;
  const gueltig = (r) => r && typeof r === 'object' && ['ort', 'licht', 'wetter', 'temp', 'ding'].every((k) => BB[k].opts.some((o) => o.id === r[k])) && Array.isArray(r.klang) && r.klang.every((k) => BB.klang.opts.some((o) => o.id === k)) && r.klang.length <= 3;
  const kopie = (r) => ({ ort: r.ort, licht: r.licht, wetter: r.wetter, temp: r.temp, klang: r.klang.slice(0, 3), ding: r.ding });
  const rezeptText = (r) => tOf('ort', r.ort) + ' · ' + tOf('licht', r.licht) + ' · ' + tOf('wetter', r.wetter) + ' · ' + tOf('temp', r.temp) + (r.klang.length ? ' · ' + r.klang.map((k) => tOf('klang', k)).join(' + ') : '') + ' · ' + tOf('ding', r.ding);

  /* ---------- Bild: Himmel, Ort, Wetter, Temperatur, Gegenstand (SVG) ---------- */
  const HIMMEL = {
    morgen: ['#8ec5ff', '#ffd1dc'], mittag: ['#2f7fd6', '#a9dbff'], abend: ['#3b2a6b', '#ff8a5c'], nacht: ['#050a20', '#1d2a5a'],
  };
  let uid = 0;
  function szeneSvg(r) {
    const id = 'mo' + (++uid);
    const n = r.licht === 'nacht';
    const [top, bot] = HIMMEL[r.licht] || HIMMEL.abend;
    let s = '<defs><linearGradient id="' + id + 'h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bot + '"/></linearGradient>'
      + '<linearGradient id="' + id + 'n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".75"/></linearGradient></defs>'
      + '<rect width="800" height="450" fill="url(#' + id + 'h)"/>';
    // Sonne / Mond / Sterne
    if (r.licht === 'nacht') {
      for (let i = 0; i < 40; i++) { const x = (i * 197) % 790 + 5, y = (i * 83) % 230 + 8; s += '<circle class="mo-stern" cx="' + x + '" cy="' + y + '" r="' + (i % 3 ? 1.3 : 2.2) + '" fill="#fff" style="animation-delay:' + (i % 7) * 0.4 + 's"/>'; }
      s += '<circle cx="640" cy="90" r="30" fill="#f4f1d0"/><circle cx="652" cy="82" r="26" fill="' + top + '"/>';
    } else if (r.licht === 'mittag') s += '<circle cx="650" cy="80" r="44" fill="#ffe066"/>';
    else if (r.licht === 'morgen') s += '<circle cx="610" cy="290" r="40" fill="#fff3b0" opacity=".95"/>';
    else s += '<circle cx="600" cy="320" r="56" fill="#ff6b3d"/>';
    // Ort
    const dunkel = (c, d) => (n ? d : c);
    if (r.ort === 'strand') {
      s += '<rect y="292" width="800" height="78" fill="' + dunkel('#1e6fb8', '#0d2a4d') + '"/>'
        + '<g class="mo-welle" stroke="' + dunkel('#cfe9ff', '#5d7fa8') + '" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 320 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0"/><path d="M-40 348 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0"/></g>'
        + '<path d="M0 362 Q200 350 400 360 T800 358 L800 450 L0 450 Z" fill="' + dunkel('#f2d49b', '#6e6248') + '"/>';
    } else if (r.ort === 'wald') {
      s += '<path d="M0 360 Q400 340 800 360 L800 450 L0 450 Z" fill="' + dunkel('#3d7a3a', '#132a18') + '"/>';
      [[40, 1.1], [130, 0.8], [230, 1.3], [520, 1], [620, 1.25], [720, 0.9], [330, 0.7]].forEach(([x, k]) => { s += '<g transform="translate(' + x + ' ' + (365 - 130 * k) + ') scale(' + k + ')"><rect x="-6" y="110" width="12" height="30" fill="' + dunkel('#5a3a20', '#1b120a') + '"/><path d="M0 0 L42 70 L-42 70 Z M0 34 L50 115 L-50 115 Z" fill="' + dunkel('#1f5a30', '#0b1f12') + '"/></g>'; });
    } else if (r.ort === 'berg') {
      s += '<path d="M-20 380 L180 150 L330 330 L470 120 L700 360 L820 260 L820 450 L-20 450 Z" fill="' + dunkel('#6c7aa0', '#232a48') + '"/>'
        + '<path d="M180 150 L215 190 L195 185 L170 200 L150 185 Z M470 120 L510 165 L488 160 L465 175 L440 158 Z" fill="#ffffff" opacity="' + (n ? 0.6 : 0.95) + '"/>'
        + '<path d="M0 400 Q400 380 800 405 L800 450 L0 450 Z" fill="' + dunkel('#4f8a46', '#18301a') + '"/>';
    } else if (r.ort === 'dach') {
      [[0, 230, 90], [95, 270, 70], [170, 200, 80], [255, 250, 60], [320, 180, 100], [425, 240, 70], [500, 210, 90], [595, 260, 65], [665, 190, 80], [750, 240, 60]].forEach(([x, y, w]) => {
        s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (420 - y) + '" fill="' + dunkel('#3a3f5c', '#151829') + '"/>';
        for (let yy = y + 14; yy < 400; yy += 26) for (let xx = x + 10; xx < x + w - 12; xx += 22) s += '<rect x="' + xx + '" y="' + yy + '" width="9" height="12" fill="' + (n ? ((xx + yy) % 3 ? '#ffd76a' : '#2a2f4a') : '#9fb6d8') + '" opacity="' + (n ? 0.9 : 0.55) + '"/>';
      });
      s += '<path d="M0 405 L800 395 L800 450 L0 450 Z" fill="' + dunkel('#8a4a36', '#3a1f17') + '"/>';
    } else { // zimmer: Blick aus dem Fenster
      s += '<path d="M0 340 Q400 320 800 340 L800 450 L0 450 Z" fill="' + dunkel('#4f8a46', '#18301a') + '"/>';
    }
    // Wetter
    if (r.wetter === 'wolken' || r.wetter === 'regen' || r.wetter === 'schnee') {
      const cf = r.wetter === 'wolken' ? dunkel('#ffffff', '#4a5070') : dunkel('#c9cfdc', '#3a3f55');
      s += '<g class="mo-wolken" fill="' + cf + '" opacity=".92">' + [[120, 80, 1], [430, 60, 1.3], [690, 120, 0.9]].map(([x, y, k]) => '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><ellipse cx="0" cy="0" rx="60" ry="26"/><ellipse cx="-34" cy="8" rx="34" ry="20"/><ellipse cx="36" cy="10" rx="38" ry="20"/><ellipse cx="6" cy="-16" rx="30" ry="22"/></g>').join('') + '</g>';
    }
    if (r.wetter === 'regen') { s += '<rect width="800" height="450" fill="#1a2238" opacity=".22"/><g class="mo-regen" stroke="#cfe4ff" stroke-width="2" stroke-linecap="round" opacity=".7">'; for (let i = 0; i < 70; i++) { const x = (i * 113) % 800, y = (i * 61) % 450; s += '<path d="M' + x + ' ' + y + ' l-6 18"/>'; } s += '</g>'; }
    if (r.wetter === 'schnee') { s += '<g class="mo-schnee" fill="#fff" opacity=".9">'; for (let i = 0; i < 70; i++) { const x = (i * 131) % 800, y = (i * 47) % 450; s += '<circle cx="' + x + '" cy="' + y + '" r="' + (i % 3 ? 2.2 : 3.4) + '"/>'; } s += '</g>'; }
    if (r.wetter === 'nebel') s += '<rect y="160" width="800" height="290" fill="url(#' + id + 'n)"/><rect width="800" height="450" fill="#e9eef7" opacity=".25"/>';
    // Fenster-Rahmen für „Am Fenster“ (Wand mit Loch, Fensterbank)
    if (r.ort === 'zimmer') {
      const wand = dunkel('#e8d9c4', '#3a3346');
      s += '<path fill-rule="evenodd" d="M0 0 H800 V450 H0 Z M180 50 H620 V330 H180 Z" fill="' + wand + '"/>'
        + '<rect x="180" y="50" width="440" height="280" fill="none" stroke="#6b4a2e" stroke-width="12"/><path d="M400 50 V330 M180 190 H620" stroke="#6b4a2e" stroke-width="8"/>'
        + '<rect x="150" y="330" width="500" height="22" rx="4" fill="#8a5c36"/>';
    }
    // Temperatur als Farbschleier
    if (r.temp === 'kuehl') s += '<rect width="800" height="450" fill="#5aa0ff" opacity=".13"/>';
    if (r.temp === 'warm') s += '<rect width="800" height="450" fill="#ff9a3c" opacity=".14"/>';
    // Gegenstand vorne rechts
    s += '<g transform="translate(660 372)" stroke="#0e0a26" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' + ding(r.ding) + '</g>';
    return '<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s + '</svg>';
  }
  function ding(d) {
    if (d === 'tasse') return '<path class="mo-dampf" d="M-12 -38 q-8 -12 0 -24 M6 -40 q-8 -12 0 -24" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/><rect x="-30" y="-24" width="52" height="56" rx="8" fill="#ff6b3d"/><path d="M22 -10 q22 0 22 16 q0 16 -22 16" fill="none"/><rect x="-24" y="-18" width="40" height="8" rx="3" fill="#8a3a1a" stroke="none"/>';
    if (d === 'decke') return '<rect x="-60" y="-14" width="120" height="50" rx="12" fill="#3da5ff"/><rect x="-54" y="-30" width="108" height="26" rx="10" fill="#ffc93c"/><path d="M-40 -14 V36 M-10 -14 V36 M20 -14 V36" stroke="#fff" stroke-width="5" opacity=".6"/>';
    if (d === 'katze') return '<ellipse cx="0" cy="18" rx="46" ry="24" fill="#3b3550"/><circle cx="-38" cy="-8" r="20" fill="#3b3550"/><path d="M-54 -20 L-50 -40 L-38 -26 M-30 -26 L-22 -42 L-20 -20" fill="#3b3550"/><path d="M44 22 q30 -6 22 -34" fill="none" stroke-width="8"/><circle cx="-44" cy="-10" r="2.5" fill="#ffe066" stroke="none"/><circle cx="-32" cy="-10" r="2.5" fill="#ffe066" stroke="none"/>';
    if (d === 'buch') return '<path d="M-58 -18 Q-30 -30 0 -16 Q30 -30 58 -18 V34 Q30 22 0 36 Q-30 22 -58 34 Z" fill="#fdfbf3"/><path d="M0 -16 V36" /><path d="M-46 -6 H-12 M-46 6 H-12 M12 -6 H46 M12 6 H46" stroke-width="2.5" opacity=".5"/>';
    if (d === 'kopfhoerer') return '<path d="M-42 20 V0 a42 42 0 0 1 84 0 V20" fill="none" stroke-width="8"/><rect x="-56" y="4" width="24" height="38" rx="10" fill="#ff4fa3"/><rect x="32" y="4" width="24" height="38" rx="10" fill="#ff4fa3"/>';
    return '<rect x="-64" y="-4" width="128" height="16" rx="8" fill="#2ee6c5"/><circle cx="-40" cy="22" r="10" fill="#ffc93c"/><circle cx="40" cy="22" r="10" fill="#ffc93c"/>'; // skate
  }
  function szene(r, o) {
    const oo = o || {};
    const el = h('div', { class: 'mo-szene' + (oo.gross ? ' gross' : '') + (oo.cls ? ' ' + oo.cls : ''), role: 'img', 'aria-label': 'Dein Ort: ' + rezeptText(r) });
    el.innerHTML = szeneSvg(r);
    return el;
  }

  /* ---------- Klang: bis zu drei Spuren, ruhig gemischt ---------- */
  const HZ = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function klang(ctx, spuren, o) {
    const oo = o || {};
    const m = K().klang.mixer(ctx, { vol: oo.vol != null ? oo.vol : 0.55 });
    if (!m.ok || !spuren.length) return m;
    const ac = m.ac;
    spuren.forEach((sp) => {
      if (sp === 'regen') {
        const b = m.bus(0.32);
        const lp = m.filter('lowpass', 6500, 0.5, b); const hp = m.filter('highpass', 450, 0.6, lp);
        m.noise('pink', hp);
        const tropfen = m.bus(0.6);
        m.every(55, () => { if (Math.random() < 0.55) m.burst(tropfen, Math.random() * 0.05, 0.012 + Math.random() * 0.02, 0.03 + Math.random() * 0.09, 'bandpass', 2500 + Math.random() * 3500, 1.5); });
      } else if (sp === 'meer') {
        const b = m.bus(1);
        const g = ac.createGain(); g.gain.value = 0.3; g.connect(b);
        const lp = m.filter('lowpass', 600, 0.7, g);
        m.noise('brown', lp);
        m.lfo(lp.frequency, 0.085, 380, 620);
        m.lfo(g.gain, 0.085, 0.2, 0.32);
        const g2 = ac.createGain(); g2.gain.value = 0.04; g2.connect(b);
        const hp = m.filter('highpass', 2200, 0.5, g2);
        m.noise('pink', hp);
        m.lfo(g2.gain, 0.085, 0.035, 0.04);
      } else if (sp === 'zug') {
        const b = m.bus(1);
        const lp = m.filter('lowpass', 170, 0.7, m.bus(0.55));
        m.noise('brown', lp);
        const klack = m.bus(0.9);
        m.every(1100, () => {
          m.burst(klack, 0, 0.05, 0.35, 'lowpass', 320, 0.8); m.tone(b, 62, 0, 0.12, 'sine', 0.35);
          m.burst(klack, 0.19, 0.05, 0.25, 'lowpass', 300, 0.8); m.tone(b, 58, 0.19, 0.12, 'sine', 0.25);
        });
      } else if (sp === 'wind') {
        const g = ac.createGain(); g.gain.value = 0.15; g.connect(m.bus(1));
        const bp = m.filter('bandpass', 700, 0.9, g);
        m.noise('white', bp);
        m.lfo(bp.frequency, 0.05, 380, 720);
        m.lfo(g.gain, 0.07, 0.1, 0.15);
      } else if (sp === 'feuer') {
        const lp = m.filter('lowpass', 420, 0.6, m.bus(0.22));
        m.noise('brown', lp);
        const kn = m.bus(0.8);
        m.every(70, () => { if (Math.random() < 0.38) m.burst(kn, Math.random() * 0.06, 0.004 + Math.random() * 0.018, 0.02 + Math.random() * 0.14, 'highpass', 1600 + Math.random() * 2500, 0.7); });
      } else if (sp === 'voegel') {
        const b = m.bus(0.5);
        m.every(650, () => {
          if (Math.random() < 0.33) {
            const base = 2600 + Math.random() * 1400; const k = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < k; i++) m.tone(b, base * (1 + Math.random() * 0.2), i * 0.11, 0.09, 'sine', 0.12, base * 1.35);
          }
        });
      } else if (sp === 'grillen') {
        const b = m.bus(0.25);
        m.every(520, () => { if (Math.random() < 0.8) for (let i = 0; i < 3; i++) m.tone(b, 4300 + Math.random() * 200, i * 0.045, 0.03, 'sine', 0.1); });
      } else if (sp === 'musik') {
        const b = m.bus(0.09);
        const lp = m.filter('lowpass', 1300, 0.6, b);
        const AKKORDE = [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 67]];
        const os = AKKORDE[0].map((n) => m.osc('sine', HZ(n), lp));
        let k = 0;
        m.every(8000, () => { k = (k + 1) % AKKORDE.length; os.forEach((o2, i) => o2.frequency.setTargetAtTime(HZ(AKKORDE[k][i]), ac.currentTime, 1.2)); });
        m.lfo(b.gain, 0.12, 0.03, 0.09);
      }
    });
    if (oo.sek) setTimeout(() => m.stop(800), oo.sek * 1000);
    return m;
  }

  /* ---------- Baukasten: eine Zeile pro Baustein, Vorschau oben ---------- */
  async function bauen(ctx, rezept) {
    const r = kopie(rezept);
    const vorschau = h('div', { class: 'mo-vorschau' }, szene(r));
    const rText = h('p', { class: 'muted small mo-rtext' }, rezeptText(r));
    const neu = () => { clear(vorschau); vorschau.appendChild(szene(r)); rText.textContent = rezeptText(r); };
    let probe = null;
    const zeilen = BAUSTEINE.map((b) => {
      const row = h('div', { class: 'row mo-chips', style: { gap: '6px' } }, b.opts.map((o) => {
        const sel = b.multi ? r.klang.includes(o.id) : r[b.id] === o.id;
        const c = h('button', { type: 'button', class: 'chip small' + (sel ? ' sel' : ''), 'data-b': b.id, 'data-o': o.id, 'aria-pressed': String(sel) }, o.t);
        c.addEventListener('click', () => {
          CREW.sound.play('tap');
          if (b.multi) {
            const i = r.klang.indexOf(o.id);
            if (i >= 0) r.klang.splice(i, 1);
            else if (r.klang.length >= b.multi) { CREW.ui.toast('Höchstens drei Klänge. Tipp erst einen weg.'); return; } else r.klang.push(o.id);
          } else r[b.id] = o.id;
          row.querySelectorAll('.chip').forEach((x) => { const on = b.multi ? r.klang.includes(x.dataset.o) : r[b.id] === x.dataset.o; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
          neu();
        });
        return c;
      }));
      return h('div', { class: 'mo-zeile' }, h('span', { class: 'mo-zlabel' }, b.label), row);
    });
    if (ctx.auto) BAUSTEINE.forEach((b) => { if (!b.multi) { r[b.id] = b.opts[Math.floor(ctx.autoRng() * b.opts.length)].id; } else { r.klang = CREW.seed.shuffle(b.opts.map((o) => o.id), ctx.autoRng).slice(0, 1 + Math.floor(ctx.autoRng() * 3)); } neu(); });
    const hoeren = CREW.ui.btn('Anhören (5 Sek.)', () => { if (probe) probe.stop(100); probe = klang(ctx, r.klang, { sek: 5 }); if (!probe.ok) CREW.ui.toast(CREW.state.settings.sound ? 'Ton geht auf diesem Gerät nicht.' : 'Ton ist aus. Oben auf den Lautsprecher tippen.'); }, { small: true, variant: 'ghost', icon: 'sound', id: 'mo-anhoeren' });
    const w = ctx.scr([
      h('div', { class: 'mo-bau' }, h('div', { class: 'stack', style: { gap: '8px' } }, vorschau, h('div', { class: 'row between', style: { gap: '8px' } }, rText, hoeren)), h('div', { class: 'card stack mo-kasten' }, zeilen)),
    ], { eyebrow: 'Bauen', badge: ctx.stufe(1, LEVELS) });
    const a = await ctx.ask(w, [{ label: 'Mein Ort steht', value: 'ok', iconRight: 'right', id: 'mo-fertig' }]);
    if (probe) probe.stop(100);
    return a === ctx.SKIP ? null : r;
  }

  CREW.registerGame({
    id: 'mein-ort',
    template: 'T0',
    icon: 'heart',
    bausteine: BAUSTEINE, szeneSvg, gueltig, // für den Test
    themen: ['Sicherer Ort', 'Selbstregulation bei Gelb', 'Wirkung messen'],
    safety: ['freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Keine Traumreise zum Zuhören: Du baust deinen eigenen ruhigen Ort – Licht, Wetter, Klang, ein Gegenstand. Dann tauchst du kurz ein.',
        levels: LEVELS,
        steps: [
          { icon: 'base', title: 'Bauen', text: 'Ort, Licht, Wetter, Temperatur, Klang, Gegenstand.' },
          { icon: 'sound', title: 'Eintauchen', text: '1 bis 3 Minuten. Leise, mit Kopfhörern am besten.' },
          { icon: 'heart', title: 'Mitnehmen', text: 'Wann brauchst du deinen Ort?' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), szene({ ort: 'wald', licht: 'morgen', wetter: 'nebel', temp: 'kuehl', klang: [], ding: 'buch' }, { cls: 'klein' }), ctx.say('So könnte ein Ort aussehen. Wald, Morgen, Nebel. Passt das zu dir?', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Eher nicht', value: 0, variant: 'ghost' }, { label: 'Schon', value: 1, variant: 'ghost' }]);
        },
      });
      // Gemerkter Ort auf diesem Gerät? (nur auf Wunsch gespeichert)
      let gemerkt = null;
      try { const g = CREW.store.get(STORE_KEY, null); if (gueltig(g)) gemerkt = g; } catch (e) { gemerkt = null; }
      let rezept = kopie(STANDARD);
      if (gemerkt) {
        const wG = ctx.scr([szene(gemerkt, { cls: 'klein' }), ctx.say('Auf diesem iPad ist ein Ort gemerkt: ' + rezeptText(gemerkt) + '.', { eyebrow: 'Gemerkter Ort', small: true })], { eyebrow: 'Vorbereitung' });
        const g = await ctx.ask(wG, [{ label: 'Vergessen', value: 'weg', variant: 'ghost', icon: 'x', id: 'mo-vergessen', auto: false }, { label: 'Neu bauen', value: 'neu', variant: 'ghost', icon: 'shuffle', id: 'mo-neu' }, { label: 'Diesen nehmen', value: 'nehmen', iconRight: 'right', id: 'mo-nehmen' }]);
        if (g === 'weg') { CREW.store.del(STORE_KEY); gemerkt = null; CREW.ui.toast('Vergessen. Nichts mehr gespeichert.'); }
        if (g === 'nehmen') rezept = kopie(gemerkt);
      }
      // Zahl vorher (freiwillig)
      const vor = K().pegelWahl(ctx, { label: 'Anspannung vorher' });
      const wV = ctx.scr([
        ctx.say('Wie angespannt bist du gerade? 0 = ganz ruhig, 100 = gleich platzt es. Freiwillig, nur für dich, wird nicht gespeichert.', { eyebrow: 'Zahl vorher', small: true }),
        h('div', { class: 'card stack', style: { alignItems: 'center' } }, vor.el),
      ], { eyebrow: 'Vorher', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(wV, 'Weiter')) === ctx.SKIP) return { summary: 'Heute nur reingeschaut.' };
      const vorher = vor.get();
      // Level 1: Bauen
      const r = await bauen(ctx, rezept);
      if (!r) return { summary: 'Heute nur reingeschaut. Dein Ort wartet.' };
      // Level 2: Eintauchen
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Kopfhörer, wenn du hast. Setz dich bequem hin. Du kannst jederzeit „Fertig“ tippen.', label: 'Weiter' });
      const wD = ctx.scr([szene(r, { cls: 'klein' }), ctx.say('Wie lange willst du an deinem Ort bleiben?', { eyebrow: 'Eintauchen', small: true })], { eyebrow: 'Eintauchen', badge: ctx.stufe(2, LEVELS) });
      const dauer = await ctx.ask(wD, [{ label: '1 Minute', value: 60, variant: 'ghost', icon: 'timer' }, { label: '2 Minuten', value: 120, variant: 'ghost', icon: 'timer' }, { label: '3 Minuten', value: 180, variant: 'ghost', icon: 'timer' }]);
      let getaucht = 0;
      if (dauer !== ctx.SKIP) {
        const amb = klang(ctx, r.klang, { vol: 0.5 });
        const IMPULSE = [
          'Schau dich um. Was siehst du an deinem Ort?',
          'Was hörst du? ' + (r.klang.length ? r.klang.map((k) => tOf('klang', k)).join(', ') + '.' : 'Vielleicht nur Stille.'),
          'Wie warm ist es? ' + tOf('temp', r.temp) + '. Spür es auf der Haut.',
          'Neben dir: ' + tOf('ding', r.ding) + '. Wie fühlt es sich an?',
          'Atme langsam aus. Du bist hier sicher.',
          'Merk dir ein Detail. Das nimmst du mit.',
        ];
        const impuls = h('div', { class: 'mo-impuls', 'aria-live': 'polite' }, IMPULSE[0]);
        const slot = h('div', { class: 'mo-timer' });
        const w = ctx.scr([
          h('div', { class: 'mo-ein' }, szene(r, { gross: true }), impuls, slot),
          h('p', { class: 'muted small', style: { textAlign: 'center' } }, amb.ok ? 'Klang läuft leise. Pause hält alles an.' : 'Ton ist aus – schau einfach auf deinen Ort.'),
        ], { eyebrow: 'Eintauchen', badge: ctx.stufe(2, LEVELS) });
        let k = 0;
        const iv = setInterval(() => { if (CREW.ui.isPaused()) return; k = (k + 1) % IMPULSE.length; impuls.classList.remove('neu'); void impuls.offsetWidth; impuls.classList.add('neu'); impuls.textContent = IMPULSE[k]; }, 20000);
        ctx.onCleanup(() => clearInterval(iv));
        const t0 = Date.now();
        await ctx.timerOrButton(w, dauer, [{ label: 'Fertig', value: 'fertig', variant: 'ghost', icon: 'check', id: 'mo-ende' }], { slot });
        clearInterval(iv);
        amb.stop(1500);
        getaucht = Math.round((Date.now() - t0) / 1000);
      }
      // Zahl nachher
      const nach = K().pegelWahl(ctx, { label: 'Anspannung nachher' });
      const diff = h('p', { class: 'mo-diff', 'aria-live': 'polite' }, vorher != null ? 'Vorher: ' + vorher + '. Und jetzt?' : 'Und jetzt? Freiwillig.');
      const zeig = (v) => { if (vorher == null || v == null) return; const d = vorher - v; diff.textContent = d > 0 ? 'Von ' + vorher + ' auf ' + v + '. Dein Ort wirkt – merk ihn dir.' : d === 0 ? 'Gleich geblieben. Manchmal braucht der Ort ein paar Besuche.' : 'Höher als vorher. Das ist okay. Probier einen anderen Skill – oder rede mit jemandem.'; };
      zeig(nach.get());
      nach.el.addEventListener('click', () => setTimeout(() => zeig(nach.get()), 0));
      const wN = ctx.scr([
        ctx.say('Und jetzt? Wie angespannt bist du?', { eyebrow: 'Zahl nachher', small: true }),
        h('div', { class: 'card stack', style: { alignItems: 'center' } }, nach.el, diff),
      ], { eyebrow: 'Nachher', badge: ctx.stufe(2, LEVELS) });
      await ctx.next(wN, 'Weiter');
      const nachher = nach.get();
      // Level 3: Mitnehmen – wann brauchst du deinen Ort? Rezept merken (freiwillig)
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Dein Ort geht mit: Augen kurz zu, drei Atemzüge, an Licht, Klang und Gegenstand denken. Wann brauchst du ihn?', label: 'Weiter' });
      const WANN = ['Im Bus', 'Vor einem Test', 'Abends im Bett', 'Nach einem Streit', 'In der Pause', 'Wenn es zu laut ist'];
      const wahl = new Set();
      const wRow = h('div', { class: 'row center', style: { gap: '8px' } }, WANN.map((t) => { const b = h('button', { type: 'button', class: 'chip', 'data-wann': t }, t); b.addEventListener('click', () => { CREW.sound.play('tap'); if (wahl.has(t)) wahl.delete(t); else wahl.add(t); b.classList.toggle('sel', wahl.has(t)); }); return b; }));
      if (ctx.auto) wRow.querySelectorAll('.chip')[Math.floor(ctx.autoRng() * WANN.length)].click();
      const wM = ctx.scr([
        h('div', { class: 'mo-rezept' }, szene(r, { cls: 'klein' }), h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } }, h('span', { class: 'eyebrow' }, 'Dein Rezept'), h('b', null, rezeptText(r)), h('span', { class: 'muted small' }, 'Kurz-Version: Augen zu · 3 Atemzüge · ' + tOf('licht', r.licht) + ', ' + (r.klang[0] ? tOf('klang', r.klang[0]) : 'Stille') + ', ' + tOf('ding', r.ding) + '.'))),
        ctx.say('Wann könntest du deinen Ort brauchen? Tipp an, was passt – nur für dich.', { eyebrow: 'Mitnehmen', small: true }),
        wRow,
        h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Mein sicherer Ort“')),
      ], { eyebrow: 'Mitnehmen', badge: ctx.stufe(3, LEVELS) });
      const m = await ctx.ask(wM, [{ label: 'Nicht merken', value: 'nein', variant: 'ghost', icon: 'x', id: 'mo-nicht-merken' }, { label: 'Auf diesem iPad merken', value: 'merken', variant: 'ghost', icon: 'lock', id: 'mo-merken', auto: false }]);
      if (m === 'merken') { CREW.store.set(STORE_KEY, kopie(r)); CREW.ui.toast('Gemerkt – nur die Bausteine, keine Namen. „Vergessen“ löscht es.'); }
      return {
        summary: 'Dein Ort ist gebaut. Augen zu, drei Atemzüge – und du bist kurz dort.',
        stats: [[r.klang.length, 'Klang-Spuren'], [getaucht >= 60 ? Math.round(getaucht / 60) + ' Min.' : getaucht + ' Sek.', 'eingetaucht']].concat(vorher != null && nachher != null ? [[vorher + ' → ' + nachher, 'Anspannung']] : []).concat(wahl.size ? [[wahl.size, 'Momente zum Mitnehmen']] : []),
      };
    },
  });
})();
