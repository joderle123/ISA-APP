/* Mission Dienstag: „Gefühls-Radar“.
   Idee aus den ISA-Materialien zu Gefühlen (Friedenstreppe: „Wie habe ich mich gefühlt?“,
   „Alles eine Frage der Perspektive“) + Party-Mechanik wie bei Wavelength:
     A) Welches Gefühl?  Alle wählen geheim ein Gefühl (Antwort-Karte „Gefühl“), die Lehrkraft zählt mit.
                         Der Gefühle-Mix zeigt: Gleiche Situation, verschiedene Gefühle – ganz normal.
     C) Wort-Upgrade    (freiwillig) Genauere Wörter für ein Gefühl, von schwach bis stark. Nur zum Reden.
     B) Wie stark?       Der Radar-Profi (reihum) schätzt laut den Crew-Schnitt 0–10.
                         Alle zeigen ihre Stärke (Antwort-Karte „Zahl“). Das Radar zeigt, ob der Tipp passt.
   Es gibt keine falschen Gefühle. Punkte gibt es nur gemeinsam (Treffer des Radars). */
(function () {
  const CREW = window.CREW;

  /* ---------- Die acht Gefühle (gleiche Reihenfolge wie auf der Antwort-Karte) ---------- */
  // Jedes Gefühl hat eine eigene Farbe, ein eigenes Zeichen und 4 genauere Wörter (schwach → stark).
  const EMOS = [
    { id: 'Wut', color: '#ff5b4a', words: ['genervt', 'gereizt', 'sauer', 'rasend'],
      glyph: '<path d="M9.5 3v3.5A2.5 2.5 0 0 1 7 9H3.5"/><path d="M14.5 3v3.5A2.5 2.5 0 0 0 17 9h3.5"/><path d="M9.5 21v-3.5A2.5 2.5 0 0 0 7 15H3.5"/><path d="M14.5 21v-3.5A2.5 2.5 0 0 1 17 15h3.5"/>' },
    { id: 'Angst', color: '#a883ff', words: ['unsicher', 'nervös', 'besorgt', 'panisch'],
      glyph: '<path d="M2.5 12.5h3.5l2-4.5 3 9 3.5-12 2.5 7.5h4.5"/>' },
    { id: 'Trauer', color: '#4f8dff', words: ['enttäuscht', 'bedrückt', 'traurig', 'am Boden zerstört'],
      glyph: '<path d="M12 3c3.6 4.6 6 8 6 11a6 6 0 0 1-12 0c0-3 2.4-6.4 6-11z"/><path d="M9.3 14.6a2.9 2.9 0 0 0 2.2 2.7"/>' },
    { id: 'Freude', color: '#ffc93c', words: ['zufrieden', 'froh', 'begeistert', 'überglücklich'],
      glyph: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/>' },
    { id: 'Scham', color: '#ff79b8', words: ['verlegen', 'peinlich berührt', 'beschämt', 'am liebsten unsichtbar'],
      glyph: '<path d="M4.5 17 8 7.5M10.3 17l3.5-9.5M16 17l3.5-9.5"/>' },
    { id: 'Stolz', color: '#2fdcb0', words: ['zufrieden mit mir', 'stolz', 'selbstbewusst', 'unbesiegbar'],
      glyph: '<path d="M4 19h16"/><path d="M4.6 15.5 3 7l5 3.6L12 4l4 6.6L21 7l-1.6 8.5z"/>' },
    { id: 'Ekel', color: '#a8d13b', words: ['nicht so mein Ding', 'angewidert', 'angeekelt', 'kurz vorm Würgen'],
      glyph: '<path d="M7 20.5c-2-2.5 2-4.5 0-7s2-4.5 0-7"/><path d="M12 20.5c-2-2.5 2-4.5 0-7s2-4.5 0-7"/><path d="M17 20.5c-2-2.5 2-4.5 0-7s2-4.5 0-7"/>' },
    { id: 'Überraschung', color: '#ff9d3b', words: ['verwundert', 'überrascht', 'baff', 'total geschockt'],
      glyph: '<path d="M12 4v10"/><path d="M12 19.3v.1"/><path d="M5.5 5.5 7.5 8M18.5 5.5 16.5 8M3.8 12.5h2.5M17.7 12.5h2.5"/>' },
  ];
  const EMO = Object.fromEntries(EMOS.map((e) => [e.id, e]));

  /* Gefühls-Abzeichen: farbiges Kästchen mit Zeichen */
  function emoBadge(id, size) {
    const e = EMO[id] || EMOS[3];
    const span = document.createElement('span');
    span.className = 'radar-emo';
    span.style.setProperty('--emo', e.color);
    if (size) span.style.setProperty('--s', size + 'px');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${e.glyph}</svg>`;
    return span;
  }

  /* Zahl mit deutschem Komma, ganze Zahlen ohne Nachkomma */
  function fmt(n) {
    const r = Math.round(n * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1).replace('.', ',');
  }
  function tweenNumber(el, to, ms) {
    const t0 = performance.now();
    return new Promise((res) => {
      (function frame(t) {
        if (!document.body.contains(el)) return res();
        const k = Math.min(1, (t - t0) / ms);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = k < 1 ? (to * e).toFixed(1).replace('.', ',') : fmt(to);
        if (k < 1) requestAnimationFrame(frame); else res();
      })(t0);
    });
  }

  /* ---------- Das Radar (Halbkreis-Skala 0–10, SVG) ---------- */
  let uid = 0;
  const DW = 460, DH = 268, CX = 230, CY = 230, RO = 206, RI = 176;
  const ang = (v) => Math.PI * (1 - v / 10);
  const P = (v, r) => [+(CX + r * Math.cos(ang(v))).toFixed(1), +(CY - r * Math.sin(ang(v))).toFixed(1)];
  const pt = (p) => p[0] + ' ' + p[1];
  // Ring-Stück zwischen zwei Werten und zwei Radien
  function sector(v1, v2, r1, r2) {
    const a = P(v1, r2), b = P(v2, r2), c = P(v2, r1), d = P(v1, r1);
    return `M${pt(a)} A${r2} ${r2} 0 0 1 ${pt(b)} L${pt(c)}` + (r1 > 0 ? ` A${r1} ${r1} 0 0 0 ${pt(d)}` : '') + ' Z';
  }

  function dial(o) {
    const opt = o || {};
    const id = 'radar-d' + (++uid);
    let s = `<svg class="radar-dial" viewBox="0 0 ${DW} ${DH}" role="img" aria-label="Radar: Stärke von 0 bis 10">`;
    s += `<defs><linearGradient id="${id}-band" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--good)"/><stop offset=".5" style="stop-color:var(--yellow)"/><stop offset="1" style="stop-color:var(--radar-hot)"/></linearGradient></defs>`;
    // Raster
    s += '<g class="grid">';
    [66, 112, 150].forEach((r) => { s += `<path d="M${pt(P(0, r))} A${r} ${r} 0 0 1 ${pt(P(10, r))}"/>`; });
    [2.5, 5, 7.5].forEach((v) => { s += `<path d="M${pt(P(v, 28))} L${pt(P(v, 140))}"/>`; });
    s += '</g>';
    s += `<path class="base" d="M${CX - RO} ${CY} H${CX + RO}"/>`;
    // Radar-Strahl (wischt hin und her)
    if (opt.sweep !== false) {
      s += '<g class="radar-sweep">';
      [[0, 0.6, 0.05], [0.6, 1.1, 0.1], [1.1, 1.45, 0.18], [1.45, 1.7, 0.3]].forEach(([a, b, op]) => { s += `<path d="${sector(a, b, 0, RI - 4)}" style="opacity:${op}"/>`; });
      s += `<path class="edge" d="M${CX} ${CY} L${pt(P(1.7, RI - 4))}"/></g>`;
    }
    // Treffer-Zone rund um den Tipp
    s += '<g class="radar-zone"><path d="M0 0"/></g>';
    // Farbband mit Stufen
    s += `<path class="band" d="${sector(0, 10, RI, RO)}" fill="url(#${id}-band)"/>`;
    for (let v = 1; v < 10; v++) s += `<path class="sep" d="M${pt(P(v, RI))} L${pt(P(v, RO))}"/>`;
    for (let v = 0; v <= 10; v++) { const q = P(v, RI - 21); s += `<text class="num${v % 5 === 0 ? ' key' : ''}" x="${q[0]}" y="${q[1]}">${v}</text>`; }
    s += `<text class="anchor" x="${CX - (RO + RI) / 2}" y="${CY + 25}">gar nicht</text><text class="anchor" x="${CX + (RO + RI) / 2}" y="${CY + 25}">extrem</text>`;
    // Deko-Punkte (nur im Intro)
    if (opt.decor) {
      s += '<g class="radar-decor">';
      [[1.6, 118, 'Wut', 0], [3.7, 72, 'Freude', 0.7], [5.4, 128, 'Angst', 1.3], [7.3, 96, 'Stolz', 0.35], [8.8, 124, 'Überraschung', 1.8], [6.4, 52, 'Trauer', 1.05]].forEach(([v, r, e, dl]) => {
        const q = P(v, r);
        s += `<circle class="ping" cx="${q[0]}" cy="${q[1]}" r="9" style="stroke:${EMO[e].color};animation-delay:${dl}s"/><circle class="dot" cx="${q[0]}" cy="${q[1]}" r="9" style="fill:${EMO[e].color}"/>`;
      });
      s += '</g>';
    }
    s += '<polygon class="radar-marker" points="0,0" style="display:none"/>';
    if (opt.needle !== false) {
      s += `<g class="radar-needle${opt.idle ? ' idle' : ''}"><path class="shadow" d="M${CX} ${CY} H${CX - 134}"/><path class="main" d="M${CX} ${CY} H${CX - 134}"/></g>`;
      s += `<circle class="radar-hub" cx="${CX}" cy="${CY}" r="15"/>`;
    }
    s += '<g class="radar-blips"></g>';
    s += '</svg>';
    const holder = document.createElement('div');
    holder.innerHTML = s;
    const svg = holder.firstChild;
    const zone = svg.querySelector('.radar-zone');
    const marker = svg.querySelector('.radar-marker');
    const blips = svg.querySelector('.radar-blips');
    const needle = svg.querySelector('.radar-needle');
    const sweep = svg.querySelector('.radar-sweep');
    return {
      el: svg,
      // Tipp anzeigen: gelbes Dreieck + Zone ±1
      setPred(v) {
        zone.querySelector('path').setAttribute('d', sector(Math.max(0, v - 1), Math.min(10, v + 1), 34, RI - 42));
        zone.classList.add('on');
        const a = ang(v);
        const tip = P(v, RO - 3), bc = P(v, RO + 20);
        const px = Math.sin(a) * 11, py = Math.cos(a) * 11;
        marker.setAttribute('points', `${tip[0]},${tip[1]} ${(bc[0] + px).toFixed(1)},${(bc[1] + py).toFixed(1)} ${(bc[0] - px).toFixed(1)},${(bc[1] - py).toFixed(1)}`);
        marker.style.display = '';
      },
      hit(on) { zone.classList.toggle('hit', !!on); },
      // Ein Punkt pro gezeigter Zahl; gleiche Zahlen stapeln sich nach innen
      addBlip(v, k) {
        const r = 126 - (k % 5) * 21;
        const shift = k >= 5 ? (v >= 9.5 ? -0.34 : 0.34) : 0;
        const q = P(v + shift, r);
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'radar-blip');
        g.innerHTML = `<circle class="radar-ping" cx="${q[0]}" cy="${q[1]}" r="10"/><circle class="dot" cx="${q[0]}" cy="${q[1]}" r="10"/>`;
        blips.appendChild(g);
      },
      stopSweep() { if (sweep) sweep.classList.add('off'); },
      setNeedle(v) { if (needle) { needle.classList.remove('idle'); needle.style.transform = `rotate(${(v * 18).toFixed(1)}deg)`; } },
    };
  }

  /* ---------- Sitzkreis: Wer ist Radar-Profi? ---------- */
  // Platz 0 = Lehrkraft (unten). Von oben gesehen ist „links von der Lehrkraft“ im Uhrzeigersinn.
  function seatMap(n, seat, fromSeat) {
    const W = 240, H = 252, c = 120, cy = 114, R = 80;
    const total = n + 1;
    const step = (2 * Math.PI) / total;
    const pos = (a, r) => [+(c + r * Math.sin(a)).toFixed(1), +(cy - r * Math.cos(a)).toFixed(1)];
    const seatA = (k) => Math.PI + k * step;
    let s = `<svg class="radar-seats" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sitzkreis: Radar-Profi ist Platz ${seat} links von der Lehrkraft">`;
    s += `<circle class="table" cx="${c}" cy="${cy}" r="${R - 32}"/>`;
    s += `<circle class="table-ring" cx="${c}" cy="${cy}" r="${R - 46}"/>`;
    // Pfeil: vom letzten Radar-Profi (oder der Lehrkraft) zum neuen
    const ra = R + 27;
    const gap = Math.min(0.3, step * 0.3);
    const a0 = seatA(fromSeat) + gap;
    let a1 = seatA(seat) - gap;
    while (a1 <= a0) a1 += 2 * Math.PI;
    const p0 = pos(a0, ra), p1 = pos(a1, ra);
    s += `<path class="arrow" d="M${p0[0]} ${p0[1]} A${ra} ${ra} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p1[0]} ${p1[1]}"/>`;
    const tx = Math.cos(a1), ty = Math.sin(a1); // Richtung am Pfeilende
    const nx = Math.sin(a1), ny = -Math.cos(a1);
    const hA = [p1[0] - 9 * tx + 6 * nx, p1[1] - 9 * ty + 6 * ny], hB = [p1[0] - 9 * tx - 6 * nx, p1[1] - 9 * ty - 6 * ny];
    s += `<path class="arrow" d="M${hA[0].toFixed(1)} ${hA[1].toFixed(1)} L${p1[0]} ${p1[1]} L${hB[0].toFixed(1)} ${hB[1].toFixed(1)}"/>`;
    for (let k = 0; k <= n; k++) {
      const q = pos(seatA(k), R);
      const cls = k === 0 ? 'lk' : k === seat ? 'profi' : '';
      if (k === seat) s += `<circle class="ring" cx="${q[0]}" cy="${q[1]}" r="18"/>`;
      s += `<circle class="seat ${cls}" cx="${q[0]}" cy="${q[1]}" r="18"/>`;
      s += `<text class="${cls}" x="${q[0]}" y="${q[1]}">${k === 0 ? 'L' : k}</text>`;
    }
    s += `<text class="cap" x="${c}" y="${H - 8}">L = Lehrkraft</text>`;
    s += '</svg>';
    const holder = document.createElement('div');
    holder.innerHTML = s;
    return holder.firstChild;
  }

  /* ---------- kleine Bausteine ---------- */
  function pips(h, r, total) {
    return h('span', { class: 'radar-pips', 'aria-hidden': 'true' }, Array.from({ length: total }, (_, i) => h('i', { class: i < r ? 'done' : i === r ? 'now' : '' })));
  }
  function head(ctx, r, total, title, right) {
    const { h } = ctx;
    return h('div', { class: 'row between radar-head enter' },
      h('div', { class: 'stack', style: { gap: '6px' } },
        h('div', { class: 'row', style: { gap: '12px' } }, h('span', { class: 'eyebrow' }, 'Runde ' + (r + 1) + ' von ' + total), pips(h, r, total)),
        h('h2', null, title)),
      right || null);
  }
  function situationStrip(ctx, card) {
    const { h } = ctx;
    return h('div', { class: 'radar-sit enter' }, CREW.icon('chat', 22), h('span', null, card.text));
  }

  /* ---------- Intro ---------- */
  async function intro(ctx) {
    const { h, ui } = ctx;
    const d = dial({ decor: true, idle: true });
    const step = (n, title, text, extra) => h('div', { class: 'radar-step card' },
      h('span', { class: 'radar-stepnum' }, String(n)),
      h('div', { class: 'stack', style: { gap: '6px' } }, h('b', { class: 'radar-steptitle' }, title), h('span', { class: 'muted' }, text), extra || null));
    const w = ctx.screen([
      h('div', { class: 'stack enter', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, 'Mission · Gefühls-Radar'), h('h2', null, 'Gleiche Situation. Gleiches Gefühl?')),
      h('div', { class: 'radar-intro enter-2' },
        h('div', { class: 'radar-dialbox' }, d.el),
        h('div', { class: 'stack' },
          step(1, 'Gefühl wählen', 'Lies die Situation. Wähl geheim ein Gefühl.', ui.paddleHint('emo')),
          step(2, 'Radar-Profi schätzt', 'Eine Person tippt: Wie stark fühlt die Crew das?'),
          step(3, 'Stärke zeigen', 'Alle zeigen 0 bis 10. Trifft der Tipp?', ui.paddleHint('zahl')))),
    ]);
    await ctx.waitFor(ui.choice(w, [{ label: 'Radar an!', value: 'go', iconRight: 'right' }], { align: 'end' }));
  }

  /* ---------- Schritt A: Welches Gefühl? ---------- */
  async function stepFeeling(ctx, card, r, total) {
    const { h, ui } = ctx;
    const N = ctx.crewSize;
    const w1 = ctx.screen([
      head(ctx, r, total, 'Welches Gefühl?', ui.paddleHint('emo')),
      ui.say(card.text, { eyebrow: 'Situation', cls: 'radar-sitcard' }),
      h('div', { class: 'radar-legend enter-2', 'aria-hidden': 'true' }, EMOS.map((e) => h('span', { class: 'radar-lg' }, emoBadge(e.id, 30), h('span', null, e.id)))),
      h('p', { class: 'lead enter-3' }, 'Welches Gefühl kommt bei dir zuerst? Wähl es geheim.'),
    ]);
    const a1 = await ctx.waitFor(ui.choice(w1, [{ label: 'Alle bereit', value: 'go', iconRight: 'right' }], { align: 'end' }));
    if (a1 === ctx.SKIP) return { skip: 'replace' };

    await ui.threeTwoOne('Zeigt her!');
    const ta = ui.tally(EMOS.map((e) => ({ id: e.id, label: e.id, icon: emoBadge(e.id, 46) })), { max: N });
    ta.el.querySelectorAll('.t-item').forEach((it, i) => { it.classList.add('radar-titem'); it.style.setProperty('--emo', EMOS[i].color); });
    const w2 = ctx.screen([
      head(ctx, r, total, 'Was zeigt die Crew?'),
      h('p', { class: 'muted' }, 'Tippe mit, wie oft jedes Gefühl hochgehalten wird.'),
      h('div', { class: 'radar-tally' }, ta.el),
    ]);
    const a2 = await ctx.waitFor(ui.choice(w2, [{ label: 'Überspringen', value: 'skip', variant: 'ghost' }, { label: 'Mix zeigen', value: 'go', iconRight: 'right' }], { align: 'end' }));
    if (a2 === ctx.SKIP) return { skip: 'round' };
    const counts = ta.get();
    const shown = EMOS.filter((e) => counts[e.id] > 0).sort((x, y) => counts[y.id] - counts[x.id]);
    if (a2 === 'skip' || !shown.length) return { counts: null, shown: [] };

    // Gefühle-Mix
    const total2 = shown.reduce((a, e) => a + counts[e.id], 0);
    const kinds = shown.length;
    let title, line;
    if (total2 === 1) { title = 'Auf dem Radar: ' + shown[0].id; line = 'Danke fürs Zeigen. Jede Antwort zählt.'; }
    else if (kinds === 1) { title = 'Alle auf einer Welle: ' + shown[0].id + '!'; line = 'Eher selten. Oft fühlen Menschen hier ganz verschieden.'; }
    else { title = kinds + ' verschiedene Gefühle!'; line = kinds >= 3 ? 'Gleiche Situation, anderer Film im Kopf. Völlig normal.' : 'Gleiche Situation, anderes Gefühl. Das ist normal.'; }
    const segs = shown.map((e) => {
      const seg = h('div', { class: 'seg', title: e.id + ': ' + counts[e.id] }, counts[e.id] / total2 >= 0.12 ? emoBadge(e.id, 0).firstChild : null);
      seg.style.setProperty('--emo', e.color);
      return seg;
    });
    const bar = h('div', { class: 'radar-mix', role: 'img', 'aria-label': 'Gefühle-Mix: ' + shown.map((e) => e.id + ' ' + counts[e.id]).join(', ') }, segs);
    const w3 = ctx.screen([
      h('div', { class: 'stack enter', style: { alignItems: 'center', textAlign: 'center', gap: '8px' } }, h('span', { class: 'eyebrow' }, 'Gefühle-Mix'), h('h2', null, title)),
      bar,
      h('div', { class: 'row center radar-legend2' }, shown.map((e, i) => h('span', { class: 'radar-lchip pop', style: { animationDelay: 300 + i * 90 + 'ms' } }, emoBadge(e.id, 34), h('span', null, e.id), h('b', null, '× ' + counts[e.id])))),
      h('p', { class: 'lead enter-3', style: { textAlign: 'center' } }, line),
      h('p', { class: 'muted enter-3', style: { textAlign: 'center' } }, 'Wer mag: Warum gerade dieses Gefühl?'),
    ], { center: true });
    CREW.sound.play('reveal');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      segs.forEach((seg, i) => { seg.style.flexBasis = (counts[shown[i].id] / total2) * 100 + '%'; });
    }));
    const a3 = await ctx.waitFor(ui.choice(w3, [{ label: 'Wort-Upgrade', value: 'up', variant: 'ghost', icon: 'sparkle' }, { label: 'Wie stark?', value: 'go', iconRight: 'right' }]));
    if (a3 === ctx.SKIP) return { skip: 'round', counts, shown };
    if (a3 === 'up') {
      const more = (card.gefuehle || []).filter((g) => EMO[g] && !shown.some((e) => e.id === g)).map((g) => EMO[g]);
      const r4 = await wordUpgrade(ctx, shown.concat(more).slice(0, 4));
      if (r4 === ctx.SKIP) return { skip: 'round', counts, shown };
    }
    return { counts, shown };
  }

  /* ---------- Schritt C: Gefühls-Wort-Upgrade (freiwillig, ohne Punkte) ---------- */
  async function wordUpgrade(ctx, options) {
    const { h, ui } = ctx;
    let cur = options[0];
    const area = h('div', { class: 'stack' });
    const draw = () => {
      CREW.util.clear(area);
      const words = cur.words.map((wd, i) => {
        const b = h('button', { type: 'button', class: 'radar-word' },
          h('span', { class: 'w' }, wd),
          h('span', { class: 'radar-signal', 'aria-label': 'Stärke ' + (i + 1) + ' von 4' }, [0, 1, 2, 3].map((j) => h('i', { class: j <= i ? 'on' : '', style: { height: 30 + j * 23 + '%' } }))));
        b.style.setProperty('--emo', cur.color);
        b.addEventListener('click', () => {
          CREW.sound.play('tap');
          area.querySelectorAll('.radar-word').forEach((x) => x.classList.toggle('sel', x === b && !b.classList.contains('sel')));
        });
        return b;
      });
      CREW.util.append(area, [
        h('div', { class: 'row between' },
          h('div', { class: 'row', style: { gap: '14px' } }, emoBadge(cur.id, 60), h('h2', null, cur.id + ' hat Stufen.')),
          options.length > 1 ? h('div', { class: 'row radar-switch' }, options.filter((e) => e !== cur).map((e) => {
            const c = h('button', { type: 'button', class: 'chip', 'aria-label': 'Wörter für ' + e.id }, emoBadge(e.id, 28), e.id);
            c.addEventListener('click', () => { CREW.sound.play('tap'); cur = e; draw(); });
            return c;
          })) : null),
        h('div', { class: 'radar-scale' }, h('span', null, 'schwach'), h('i'), h('span', null, 'stark')),
        h('div', { class: 'radar-words' }, words),
      ]);
      area.querySelector('.radar-scale').style.setProperty('--emo', cur.color);
    };
    draw();
    const w = ctx.screen([
      h('div', { class: 'stack enter', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, 'Gefühls-Wort-Upgrade'), h('p', { class: 'lead' }, 'Welches Wort passt für dich am besten? Wer will, sagt es laut.')),
      area,
    ]);
    return ctx.waitFor(ui.choice(w, [{ label: 'Weiter', value: 'go', iconRight: 'right' }], { align: 'end' }));
  }

  /* ---------- Schritt B: Wie stark? ---------- */
  async function stepStrength(ctx, card, r, total, profiTurn) {
    const { h, ui } = ctx;
    const N = ctx.crewSize;
    const seat = (profiTurn % N) + 1;
    const fromSeat = profiTurn === 0 ? 0 : ((profiTurn - 1) % N) + 1;
    const mini = dial({ needle: false, sweep: false });
    const st = ui.stepper({ value: 5, min: 0, max: 10, onChange: (v) => mini.setPred(v) });
    mini.setPred(5);
    const w1 = ctx.screen([
      head(ctx, r, total, 'Wie stark?', ui.paddleHint('zahl', 'Stärke')),
      situationStrip(ctx, card),
      h('div', { class: 'radar-profi enter-2' },
        h('div', { class: 'card stack radar-profi-who' },
          seatMap(N, seat, fromSeat),
          h('div', { class: 'stack', style: { gap: '4px', textAlign: 'center' } },
            h('span', { class: 'eyebrow' }, 'Radar-Profi'),
            h('b', { class: 'radar-steptitle' }, profiTurn === 0 ? 'Die Person direkt links von der Lehrkraft.' : 'Die nächste Person links davon.'))),
        h('div', { class: 'card stack radar-profi-tipp', id: 'radar-tipp' },
          h('div', { class: 'radar-mini' }, h('span', { class: 'radar-stepnum small' }, '1'), h('span', null, h('b', null, 'Alle: '), 'Stell geheim ein, wie stark du das fühlst.')),
          h('div', { class: 'radar-mini' }, h('span', { class: 'radar-stepnum small' }, '2'), h('span', null, h('b', null, 'Radar-Profi: '), 'Sag laut, wie stark die Crew das im Schnitt fühlt.')),
          h('div', { class: 'radar-minidial' }, mini.el),
          h('div', { class: 'row center', style: { gap: '14px' } }, h('span', { class: 'display', style: { fontSize: '1.3em' } }, 'Tipp'), st.el))),
    ]);
    const b1 = await ctx.waitFor(ui.choice(w1, [{ label: 'Zeigt her!', value: 'go', iconRight: 'right' }], { align: 'end' }));
    if (b1 === ctx.SKIP) return { skip: true };
    const pred = st.get();

    await ui.threeTwoOne('Zeigt her!');
    const vp = ui.valuePad({ count: N, min: 0, max: 10, placeholder: 'Tippe die gezeigten Zahlen ein …' });
    const w2 = ctx.screen([
      head(ctx, r, total, 'Welche Zahlen seht ihr?'),
      h('p', { class: 'muted' }, 'Tippe alle Zahlen ein. Die Reihenfolge ist egal.'),
      h('div', { class: 'card radar-pad' }, vp.el),
    ]);
    const b2 = await ctx.waitFor(ui.choice(w2, [{ label: 'Überspringen', value: 'skip', variant: 'ghost' }, { label: 'Radar starten', value: 'go', iconRight: 'right' }], { align: 'end' }));
    if (b2 === ctx.SKIP) return { skip: true };
    const values = vp.get();
    if (b2 === 'skip' || !values.length) { if (b2 !== 'skip') ui.toast('Keine Zahlen? Dann geht’s direkt weiter.'); return { skip: true }; }

    // Auflösung auf dem Radar
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const diff = Math.abs(avg - pred);
    const lo = Math.min(...values), hi = Math.max(...values);
    const d = dial({});
    d.setPred(pred);
    const avgNum = h('span', { class: 'radar-big' }, '0');
    const verdict = h('div', { class: 'radar-verdict stack' });
    const last = r + 1 >= total;
    const w3 = ctx.screen([
      head(ctx, r, total, 'Radar-Check'),
      h('div', { class: 'radar-reveal' },
        h('div', { class: 'radar-dialbox' }, d.el),
        h('div', { class: 'radar-side stack' },
          h('div', { class: 'radar-stat' }, h('span', { class: 'lbl' }, h('i', { class: 'radar-key needle' }), 'Crew-Schnitt'), avgNum),
          h('div', { class: 'radar-stat' }, h('span', { class: 'lbl' }, h('i', { class: 'radar-key tipp' }), 'Tipp vom Radar-Profi'), h('span', { class: 'radar-big tipp' }, String(pred))),
          verdict)),
    ]);
    CREW.sound.play('drum');
    await ctx.sleep(450);
    const seen = {};
    for (const v of values.slice().sort((a, b) => a - b)) {
      d.addBlip(v, (seen[v] = (seen[v] || 0) + 1) - 1);
      CREW.sound.play('tick');
      await ctx.sleep(170);
    }
    await ctx.sleep(250);
    d.stopSweep();
    d.setNeedle(avg);
    CREW.sound.play('whoosh');
    await Promise.all([tweenNumber(avgNum, avg, 1400), ctx.sleep(1500)]);

    let title, text, cls;
    if (diff <= 1) { title = 'Volltreffer!'; text = 'Der Radar-Profi hat die Crew genau gelesen.'; cls = 'hit'; }
    else if (diff <= 2) { title = 'Knapp dran!'; text = 'Nur ' + fmt(diff) + ' daneben. Guter Riecher.'; cls = 'near'; }
    else if (avg > pred) { title = 'Stärker als gedacht!'; text = 'Die Crew fühlt das heftiger. Spannend, oder?'; cls = 'miss'; }
    else { title = 'Schwächer als gedacht!'; text = 'Die Crew nimmt das lockerer. Interessant.'; cls = 'miss'; }
    let spread = null;
    if (values.length >= 2) {
      if (hi - lo >= 5) spread = 'Von ' + lo + ' bis ' + hi + ': riesige Unterschiede';
      else if (hi - lo <= 2) spread = 'Ihr fühlt es ähnlich stark';
      else spread = 'Spannweite: ' + lo + ' bis ' + hi;
    }
    CREW.util.append(verdict, [
      h('h2', { class: 'radar-vtitle ' + cls }, title),
      h('p', { class: 'lead' }, text),
      spread ? h('span', { class: 'pill' + (hi - lo >= 5 ? ' accent' : '') }, spread) : null,
      hi - lo >= 5 ? h('p', { class: 'muted small' }, 'Wer mag: Was macht es für dich so stark – oder so schwach?') : null,
    ]);
    verdict.classList.add('on');
    if (cls === 'hit') { d.hit(true); CREW.sound.play('great'); ui.confetti(160); }
    else if (cls === 'near') CREW.sound.play('good');
    else CREW.sound.play('soft');

    const b3 = await ctx.waitFor(ui.choice(w3, [{ label: last ? 'Zur Radar-Bilanz' : 'Nächste Runde', value: 'go', iconRight: 'right' }], { align: 'end' }));
    return { skip: false, pred, values, avg, hit: diff <= 1, near: diff > 1 && diff <= 2, skipped: b3 === ctx.SKIP };
  }

  /* ---------- Bilanz am Ende ---------- */
  async function summaryScreen(ctx, stats, summary) {
    const { h, ui } = ctx;
    const emos = EMOS.filter((e) => stats.emoSeen.has(e.id));
    const tile = (num, label, extra) => h('div', { class: 'card radar-tile pop' }, h('span', { class: 'radar-big' }, String(num)), h('span', { class: 'lbl' }, label), extra || null);
    const w = ctx.screen([
      h('div', { class: 'stack enter', style: { alignItems: 'center', textAlign: 'center', gap: '8px' } }, h('span', { class: 'eyebrow' }, 'Radar-Bilanz'), h('h2', null, summary)),
      h('div', { class: 'radar-stats' },
        tile(stats.played, stats.played === 1 ? 'Runde gespielt' : 'Runden gespielt'),
        tile(stats.hits, stats.hits === 1 ? 'Volltreffer' : 'Volltreffer'),
        tile(emos.length, emos.length === 1 ? 'Gefühl entdeckt' : 'Gefühle entdeckt', emos.length ? h('div', { class: 'row center', style: { gap: '6px' } }, emos.map((e) => emoBadge(e.id, 30))) : null)),
      h('p', { class: 'lead enter-3', style: { textAlign: 'center' } }, 'Gleiche Situation, anderes Gefühl. Jetzt wisst ihr mehr übereinander.'),
    ], { center: true, narrow: true });
    CREW.sound.play('reveal');
    await ctx.waitFor(ui.choice(w, [{ label: 'Weiter', value: 'go', iconRight: 'right' }]));
  }

  CREW.registerMission({
    id: 'radar',
    day: 2,
    title: 'Gefühls-Radar',
    tagline: 'Gleiche Situation – wie fühlt sich die Crew?',
    minutes: 7,
    themes: ['Gefühle', 'Fremdwahrnehmung', 'Empathie'],
    etep: 'III–IV',
    eldib: [
      { code: 'K-21', text: 'erkennt und benennt, wie sich andere fühlen' },
      { code: 'K-26', text: 'spricht in der Gruppe über eigene Gefühle' },
      { code: 'K-29', text: 'erklärt, warum eine Situation ein Gefühl auslöst' },
      { code: 'SOZ-31', text: 'merkt, dass andere in derselben Situation anders reagieren' },
      { code: 'SOZ-37', text: 'versteht die Gefühle anderer und nimmt sie ernst' },
    ],
    teacherNote: 'Zwei Antwort-Karten: „Gefühl“ und „Zahl 0–10“. 4 Runden. Situation vorlesen, alle wählen geheim ein Gefühl und halten auf „Zeigt her!“ hoch. Du zählst mit. Dann schätzt der Radar-Profi laut den Crew-Schnitt (0–10). Der Radar-Profi wechselt reihum, beginnend links von dir. Du stellst den Tipp ein, alle zeigen ihre Stärke, du tippst die Zahlen ein. ±1 = Volltreffer. Das Wort-Upgrade ist freiwillig und nur zum Reden. Es gibt keine falschen Gefühle. X-Karte beim Lesen = neue Situation.',
    debrief: [
      'Warum fühlen Menschen in der gleichen Situation so verschieden?',
      'Welche Situation hat die meisten verschiedenen Gefühle ausgelöst? Warum wohl?',
      'Woran merkst du bei anderen, wie es ihnen gerade geht?',
      'Woran merkst du bei dir selbst, dass ein Gefühl stark wird?',
      'Was hilft dir, wenn ein Gefühl auf 9 oder 10 steht?',
      'Was kann die Crew tun, wenn bei jemandem das Radar auf 10 steht?',
      'Welches Gefühlswort nimmst du heute mit?',
      'War es schwer, die Crew einzuschätzen? Was hat geholfen?',
    ],

    async run(ctx) {
      const ROUNDS = 4;
      const MAX_REPLACE = 4;
      const queue = ctx.pick('radar', ROUNDS);
      const seenIds = new Set(queue.map((c) => c.id));
      const stats = { played: 0, hits: 0, near: 0, emoSeen: new Set() };
      let round = 0;
      let profiTurn = 0;
      let replaced = 0;

      await intro(ctx);

      while (round < ROUNDS) {
        let card = queue.shift();
        if (!card) {
          const extra = ctx.pick('radar', 1, (it) => !seenIds.has(it.id));
          if (!extra.length) break;
          card = extra[0];
        }
        seenIds.add(card.id);

        // A) Welches Gefühl? (+ freiwilliges Wort-Upgrade)
        const a = await stepFeeling(ctx, card, round, ROUNDS);
        if (a.skip === 'replace' && replaced < MAX_REPLACE) { replaced++; continue; } // X-Karte: neue Situation, gleiche Runde
        let playedThis = false;
        if (a.shown && a.shown.length) { playedThis = true; a.shown.forEach((e) => stats.emoSeen.add(e.id)); }

        // B) Wie stark?
        if (!a.skip) {
          const b = await stepStrength(ctx, card, round, ROUNDS, profiTurn);
          profiTurn++;
          if (!b.skip) {
            playedThis = true;
            if (b.hit) stats.hits++;
            if (b.near) stats.near++;
          }
        }
        if (playedThis) stats.played++;
        round++;
      }

      let summary;
      if (!stats.played) summary = 'Danke fürs Reinschauen, Crew.';
      else if (stats.hits >= 3) summary = 'Euer Radar ist messerscharf!';
      else if (stats.hits >= 1) summary = 'Starkes Radar, Crew!';
      else if (stats.near >= 1) summary = 'Knapp dran – euer Radar wird besser.';
      else summary = 'Ihr habt heute viel übereinander gelernt.';
      if (stats.played) await summaryScreen(ctx, stats, summary);

      // Energie: Mitmachen + Treffer (5–10), nie unter 4
      const energy = stats.played
        ? Math.max(5, Math.min(10, Math.round(4 + stats.played * 0.75 + stats.hits * 1.25 + stats.near * 0.5)))
        : 4;
      return { energy, summary };
    },
  });
})();
