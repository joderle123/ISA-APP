/* Mission Donnerstag: „Feed-Check“ – Online-Leben, Gerüchte, Gruppendruck, Zivilcourage.
   Füllt die größte Lücke der ISA-Toolbox (Medien, Cybermobbing, Gruppendruck, Vapen: 0–2 Aktivitäten).
   Idee (nach der Gerücht-Mechanik „Verfälschte Wahrheit“ und den Zuschauer-Missionen aus der Analyse):
   Ein erfundenes Handy („Glimmr“) zeigt Posts und Gruppenchats. Die Crew spielt in zwei Teams, fünf Runden:
   Fakt oder Meinung? · Was machst du? · Gerücht-Kette · Gruppendruck.
   Jedes Team einigt sich leise und zeigt es mit der Antwort-Karte. Die Lehrkraft tippt, was sie sieht.
   Folgen werden sichtbar (Reichweite, wie es der Person geht, Reaktion im Chat). Es gibt kein „Falsch“:
   Jede Wahl zeigt nur, was passiert. Beide Teamkonten zählen am Ende zusammen für die Crew.
   Zusätzlich als Solo-Spiel: eine Person tippt direkt an. */
(function () {
  const CREW = window.CREW;
  const { h, clear, clamp, shuffle } = CREW.util;
  const INK = '#0e0a26';
  const LETTERS = ['A', 'B', 'C', 'D'];

  /* ---------- Eigene Icons (gleicher Strichstil wie CREW.icon) ---------- */
  const OWN = {
    scale: '<path d="M12 4v16M8 20h8M4.5 7.5h15"/><path d="M12 4.5 12 7.5"/><path d="M4.5 7.5 2 13.5a2.8 2.8 0 0 0 5 0zM19.5 7.5 17 13.5a2.8 2.8 0 0 0 5 0z"/>',
    ask: '<path d="M4 4.5h16v11.5H9.5L4 20z"/><path d="M9.7 8.6a2.4 2.4 0 1 1 3.3 2.2c-.7.3-1 .8-1 1.5"/><path d="M12 14.6h.01"/>',
    link: '<path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1.2 1.2"/><path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1.2-1.2"/>',
    push: '<path d="M2.5 4h11v7.5H7l-4.5 3.5z"/><path d="M16.5 8h5v9.5L18 15h-7.5v-3.5"/><path d="M6 7.8h4"/>',
    send: '<path d="M21 3 3 10.4l7.2 2.4L12.6 20z"/><path d="M21 3 10.2 12.8"/>',
    fwd: '<path d="M14 5l7 7-7 7"/><path d="M21 12H10a7 7 0 0 0-7 7"/>',
    video: '<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="m15.5 10.5 6-3.5v10l-6-3.5z"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  };
  function ownIcon(name, size) {
    const s = size || 24;
    const span = document.createElement('span');
    span.className = 'ic';
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-grid';
    span.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${OWN[name]}</svg>`;
    return span;
  }

  /* ---------- Rundentypen & Arten von Antworten (nie „falsch“) ---------- */
  const TYPES = {
    fakt: { name: 'Fakt oder Meinung?', icon: 'scale', col: 'var(--good)' },
    tun: { name: 'Was machst du?', icon: 'ask', col: 'var(--yellow)' },
    kette: { name: 'Gerücht-Kette', icon: 'link', col: 'var(--accent)' },
    druck: { name: 'Gruppendruck', icon: 'push', col: 'var(--teamA)' },
  };
  const TUN_KIND = {
    3: { tone: 'stark', label: 'Stark' },
    2: { tone: 'gut', label: 'Gut' },
    1: { tone: 'okay', label: 'Okay' },
    0: { tone: 'riskant', label: 'Riskant' },
  };
  // Gruppendruck: Ziel ist „Nein sagen UND das Gesicht wahren“
  const DRUCK_KIND = {
    cool: { tone: 'stark', label: 'Nein + cool', p: 3, nein: 'ja', gesicht: 'ja' },
    hart: { tone: 'gut', label: 'Nein, aber hart', p: 2, nein: 'ja', gesicht: 'nein' },
    ausrede: { tone: 'okay', label: 'Ausrede', p: 1, nein: 'halb', gesicht: 'ja' },
    ja: { tone: 'riskant', label: 'Mitgemacht', p: 0, nein: 'nein', gesicht: 'egal' },
  };
  const WIE_KIND = {
    stark: { tone: 'stark', label: 'Stark', p: 1 },
    okay: { tone: 'okay', label: 'Okay', p: 0 },
    riskant: { tone: 'riskant', label: 'Riskant', p: 0 },
  };
  const feelWord = (v) => (v < 20 ? 'am Boden' : v < 40 ? 'verletzt' : v < 58 ? 'unsicher' : v < 72 ? 'erleichtert' : 'gestärkt');
  const fmt = (n) => (n >= 1000 ? String(Math.round(n / 100) / 10).replace('.', ',') + 'k' : String(n));
  const fmtN = (n) => (n >= 1000 ? n.toLocaleString('de-DE') : String(n));
  const sides = (G) => (G.solo ? ['solo'] : ['A', 'B']);

  /* ---------- Personen: Farbe + Anfangsbuchstabe ---------- */
  const PCOLS = ['var(--teamA)', 'var(--teamB)', 'var(--good)', 'var(--yellow)', 'var(--accent)', 'var(--accent-2)'];
  const hash = (s) => { let x = 7; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
  const pcol = (name) => PCOLS[hash(name) % PCOLS.length];
  function ava(name, size) {
    const s = size || 32;
    const letter = (String(name).replace(/[^A-Za-zÀ-ÿ?]/g, '')[0] || '?').toUpperCase();
    return h('span', { class: 'feed-ava', 'aria-hidden': 'true', style: { background: pcol(name), width: s + 'px', height: s + 'px', fontSize: Math.round(s * 0.46) + 'px' } }, letter);
  }

  /* ---------- Bilder im Feed (flache SVGs, Farben über Tokens) ---------- */
  const st = (v) => `style="fill:var(--${v})"`;
  const K = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const MOTIF = {
    skate: `<rect y="112" width="320" height="38" ${st('panel2')}/><path d="M36 134V64q0 70 80 70z" ${st('teamA')} ${K}/><path d="M196 134l86-44v44z" ${st('accent')} ${K}/><rect x="134" y="96" width="62" height="9" rx="4.5" ${st('yellow')} ${K}/><circle cx="146" cy="112" r="6" ${st('panel')} ${K}/><circle cx="184" cy="112" r="6" ${st('panel')} ${K}/>`,
    pizza: `<circle cx="160" cy="76" r="58" ${st('accent')} ${K}/><circle cx="160" cy="76" r="46" ${st('yellow')} ${K}/><path d="M160 30v92M114 76h92M128 44l64 64M192 44l-64 64" stroke="${INK}" stroke-width="3" opacity=".5"/><g ${st('teamB')} ${K}><circle cx="142" cy="58" r="8"/><circle cx="180" cy="62" r="8"/><circle cx="150" cy="96" r="8"/><circle cx="182" cy="94" r="7"/></g>`,
    game: `<path d="M104 58q0-14 16-14h80q16 0 16 14l10 44q4 18-12 20-10 1-18-10l-8-10h-56l-8 10q-8 11-18 10-16-2-12-20z" ${st('panel')} ${K}/><path d="M130 70v22M119 81h22" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><g ${K}><circle cx="192" cy="72" r="7" ${st('teamA')}/><circle cx="206" cy="84" r="7" ${st('teamB')}/><circle cx="178" cy="84" r="7" ${st('good')}/><circle cx="192" cy="96" r="7" ${st('yellow')}/></g>`,
    fouer: `<circle cx="160" cy="70" r="52" fill="none" ${K}/><path d="M160 18v104M108 70h104M123 33l74 74M197 33l-74 74" stroke="${INK}" stroke-width="3"/><g ${K}><rect x="152" y="8" width="16" height="14" rx="3" ${st('teamB')}/><rect x="204" y="63" width="16" height="14" rx="3" ${st('yellow')}/><rect x="152" y="118" width="16" height="14" rx="3" ${st('good')}/><rect x="100" y="63" width="16" height="14" rx="3" ${st('teamA')}/><rect x="189" y="26" width="14" height="12" rx="3" ${st('accent')}/><rect x="117" y="102" width="14" height="12" rx="3" ${st('accent')}/></g><path d="M160 70l-34 76M160 70l34 76" ${K}/><circle cx="160" cy="70" r="8" ${st('yellow')} ${K}/>`,
    kopfhoerer: `<path d="M110 102V78a50 50 0 0 1 100 0v24" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M110 102V78a50 50 0 0 1 100 0v24" fill="none" stroke="var(--panel)" stroke-width="5" stroke-linecap="round"/><rect x="94" y="84" width="34" height="48" rx="14" ${st('accent')} ${K}/><rect x="192" y="84" width="34" height="48" rx="14" ${st('accent')} ${K}/><path d="M236 70q10 18 0 36M248 60q18 28 0 56" fill="none" stroke="var(--yellow)" stroke-width="5" stroke-linecap="round"/>`,
    job: `<rect x="96" y="54" width="128" height="80" rx="10" ${st('accent-2')} ${K}/><path d="M138 54V42q0-8 8-8h28q8 0 8 8v12" fill="none" ${K}/><path d="M96 86h128" stroke="${INK}" stroke-width="4"/><rect x="148" y="78" width="24" height="18" rx="4" ${st('yellow')} ${K}/><g ${K} fill="none"><path d="M40 134V96l24-16 24 16v38"/></g><rect x="56" y="108" width="16" height="26" ${st('panel')} ${K}/>`,
    stadion: `<rect y="92" width="320" height="58" ${st('good')}/><path d="M0 92h320M160 92v58" stroke="#fff" stroke-width="3" opacity=".8"/><ellipse cx="160" cy="122" rx="30" ry="12" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/><g ${K}><path d="M40 92V30M280 92V30" fill="none"/><rect x="24" y="18" width="32" height="16" rx="3" ${st('yellow')}/><rect x="264" y="18" width="32" height="16" rx="3" ${st('yellow')}/></g><circle cx="176" cy="112" r="9" fill="#fff" ${K}/>`,
    shop: `<rect x="70" y="40" width="180" height="96" ${st('panel')} ${K}/><path d="M64 40h192l-10 26H74z" ${st('accent')} ${K}/><path d="M96 40l-6 26M128 40l-3 26M160 40v26M192 40l3 26M224 40l6 26" stroke="${INK}" stroke-width="3"/><rect x="92" y="80" width="60" height="40" rx="4" ${st('bg2')} ${K}/><rect x="176" y="80" width="46" height="56" rx="4" ${st('teamA')} ${K}/><rect x="98" y="88" width="40" height="18" rx="4" ${st('yellow')} ${K}/>`,
    jacke: `<path d="M122 34l-34 20-14 60 22 6 8-34v58h112v-58l8 34 22-6-14-60-34-20q-12 14-38 14t-38-14z" ${st('teamA')} ${K}/><path d="M160 48v96" stroke="${INK}" stroke-width="4"/><g ${st('yellow')} ${K}><circle cx="140" cy="90" r="5"/><circle cx="180" cy="90" r="5"/></g><path d="M122 34q10 22 38 22t38-22" fill="none" ${K}/>`,
  };
  const figure = (x, y, s, col, tilt) => `<g transform="translate(${x} ${y}) rotate(${tilt || 0}) scale(${s})"><circle cx="0" cy="-34" r="13" ${st('yellow')} ${K}/><path d="M-14 16v-26q0-12 14-12t14 12v26" ${st(col)} ${K}/><path d="M-8 16l-6 22M8 16l6 22" fill="none" ${K}/></g>`;
  function mediaSVG(m) {
    if (m.art === 'video') return `<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="150" ${st('bg2')}/><rect y="108" width="320" height="42" ${st('panel2')}/>${figure(118, 96, 1, 'teamB', -58)}${figure(226, 88, 0.8, 'good', 0)}<circle cx="160" cy="70" r="26" fill="rgba(0,0,0,.5)"/><path d="M152 57l22 13-22 13z" fill="#fff"/><rect x="12" y="138" width="296" height="4" rx="2" fill="rgba(255,255,255,.3)"/><rect x="12" y="138" width="96" height="4" rx="2" ${st('accent')}/></svg>`;
    if (m.art === 'meme') return `<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="150" ${st('panel2')}/>${figure(160, 118, 1.25, 'teamB', 0)}<path d="M206 46l8-18M218 56l16-10M200 36l-2-18" stroke="var(--yellow)" stroke-width="5" stroke-linecap="round"/></svg>`;
    return `<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="150" ${st('bg2')}/><circle cx="276" cy="30" r="14" ${st('yellow')} opacity=".85"/>${MOTIF[m.motiv] || MOTIF.shop}</svg>`;
  }
  function mediaEl(m) {
    if (m.art === 'screen') {
      return h('div', { class: 'feed-media screen' },
        h('span', { class: 'feed-shot-l' }, 'Screenshot'),
        h('div', { class: 'feed-shot-b' }, h('b', null, 'privat'), h('span', null, m.text)));
    }
    if (m.art === 'umfrage') {
      const pct = [64, 22, 14];
      return h('div', { class: 'feed-media poll' }, (m.opts || []).map((o, i) =>
        h('div', { class: 'feed-poll-row' }, h('i', { style: { width: pct[i] + '%' } }), h('span', null, o), h('b', null, pct[i] + ' %'))));
    }
    const el = h('div', { class: 'feed-media ' + m.art, html: mediaSVG(m) });
    if (m.text) el.appendChild(h('span', { class: 'feed-cap' + (m.art === 'meme' ? ' top' : '') }, m.text));
    return el;
  }

  /* ---------- Das Handy ---------- */
  const SYS = '<svg viewBox="0 0 66 14" width="60" height="13" aria-hidden="true"><g fill="currentColor"><rect x="0" y="9" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="7" rx="1"/><rect x="10" y="3" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="13" rx="1"/></g><path d="M24.5 5.5a9 9 0 0 1 12 0M27 8.4a5 5 0 0 1 7 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="30.5" cy="11.3" r="1.7" fill="currentColor"/><rect x="41" y="1" width="21" height="12" rx="3.5" stroke="currentColor" stroke-width="1.6" fill="none"/><rect x="43.5" y="3.5" width="13" height="7" rx="1.5" fill="currentColor"/><rect x="63" y="5" width="2" height="4" rx="1" fill="currentColor"/></svg>';
  const clock = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  const statusBar = () => h('div', { class: 'feed-status' }, h('b', null, clock()), h('span', { class: 'feed-island' }), h('span', { class: 'feed-sys', html: SYS }));
  const appHead = () => h('div', { class: 'feed-apphead' }, h('span', { class: 'feed-logo' }, 'glimmr'), h('span', { class: 'feed-grow' }), ownIcon('plus', 22), CREW.icon('heart', 22), ownIcon('send', 22));
  function chatHead(c) {
    return h('div', { class: 'feed-apphead chat' }, CREW.icon('left', 20), ava(c.name, 34),
      h('div', { class: 'feed-chatname' }, h('b', null, c.name), h('span', null, c.sub || 'Gruppe')),
      h('span', { class: 'feed-grow' }), ownIcon('video', 22), CREW.icon('phone', 20));
  }
  const chatInput = () => h('div', { class: 'feed-input' }, ownIcon('plus', 22), h('span', { class: 'feed-input-f' }, 'Nachricht …'), ownIcon('send', 20));
  function phoneShell(head, kids, opts) {
    const o = opts || {};
    const body = h('div', { class: 'feed-body' + (o.chat ? ' chat' : '') }, kids || []);
    const el = h('div', { class: 'feed-phone' + (o.cls ? ' ' + o.cls : '') },
      h('div', { class: 'feed-screen' }, statusBar(), head, body, o.chat ? chatInput() : null, h('div', { class: 'feed-homebar' })));
    return { el, body };
  }

  function postEl(p) {
    return h('div', { class: 'feed-post' },
      h('div', { class: 'feed-post-head' }, ava(p.von, 36),
        h('div', { class: 'feed-who' }, h('b', null, p.von), h('span', null, p.zeit || 'gerade eben')),
        h('span', { class: 'feed-grow' }), h('span', { class: 'feed-more' }, '•••')),
      p.text ? h('div', { class: 'feed-post-text' }, p.text) : null,
      p.bild ? mediaEl(p.bild) : null,
      h('div', { class: 'feed-actions' },
        h('span', null, CREW.icon('heart', 18), fmt(p.likes || 0)),
        h('span', null, CREW.icon('chat', 18), fmt(p.cmts || 0)),
        h('span', null, ownIcon('send', 18)),
        h('span', { class: 'feed-grow' }),
        h('span', null, CREW.icon('eye', 18), fmt((p.likes || 10) * 9))));
  }
  function stampEl(truth, big) {
    return h('span', { class: 'feed-stamp ' + truth + (big ? ' big' : '') }, truth === 'F' ? 'Fakt' : 'Meinung');
  }
  function cmtEl(c, state, stamp) {
    return h('div', { class: 'feed-cmt' + (state ? ' ' + state : '') },
      ava(c.von, 30),
      h('div', { class: 'feed-cmt-b' }, h('b', null, c.von), h('span', null, c.text)),
      stamp ? stampEl(stamp) : null);
  }
  function msgEl(m) {
    const me = m.von === 'Du';
    return h('div', { class: 'feed-msg-row' + (me ? ' me' : '') },
      me ? null : ava(m.von, 30),
      h('div', { class: 'feed-msg' },
        me ? null : h('b', { class: 'feed-msg-name', style: { color: pcol(m.von) } }, m.von),
        m.fwd ? h('span', { class: 'feed-fwd' }, ownIcon('fwd', 14), 'Weitergeleitet') : null,
        m.media ? mediaEl(m.media) : null,
        m.text ? h('span', { class: 'feed-msg-t' }, m.text) : null));
  }
  const typingEl = (von) => h('div', { class: 'feed-msg-row' }, ava(von, 30), h('div', { class: 'feed-msg feed-typing', 'aria-label': 'schreibt' }, h('i'), h('i'), h('i')));
  function trim(body, keep) {
    const rows = body.querySelectorAll('.feed-msg-row');
    for (let i = 0; i < rows.length - keep; i++) rows[i].remove();
  }
  // Nachricht kommt an: „schreibt …“, dann die Blase
  async function arrive(G, body, m, keep) {
    const t = typingEl(m.von);
    body.appendChild(t);
    trim(body, keep + 1);
    await G.ctx.sleep(650);
    t.remove();
    body.appendChild(msgEl(m));
    trim(body, keep);
    CREW.sound.play('tap');
  }
  // Szene für „Was machst du?“: Post oder Gruppenchat
  function scenePhone(G, sz) {
    if (sz.art === 'chat') {
      const ph = phoneShell(chatHead(sz), [], { chat: true });
      return { el: ph.el, async play() { for (const m of sz.msgs) await arrive(G, ph.body, m, 4); } };
    }
    const kids = [postEl(sz)];
    if (sz.kommentare) kids.push(h('div', { class: 'feed-cmts' }, sz.kommentare.map((c) => cmtEl(c))));
    return { el: phoneShell(appHead(), kids).el, async play() {} };
  }

  // Sperrbildschirm fürs Intro: Benachrichtigungen prasseln rein
  function lockPhone() {
    const d = new Date();
    const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const NOTIS = [
      { t: '9B Chaos', b: '23 neue Nachrichten' },
      { t: 'Jeff', b: 'Hast du das gesehen??' },
      { t: 'kirchberg.daily', b: 'Neuer Beitrag: Das glaubt ihr nie …' },
      { t: 'Squad', b: 'Heute 17 Uhr? Du kommst doch, oder?' },
      { t: 'Aylin', b: 'hat dich in einem Beitrag markiert' },
    ];
    const notis = h('div', { class: 'feed-notis' });
    const el = h('div', { class: 'feed-phone feed-lockp' },
      h('div', { class: 'feed-screen feed-lock' }, statusBar(),
        h('div', { class: 'feed-lock-date' }, CREW.util.WEEKDAYS[d.getDay()] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()]),
        h('div', { class: 'feed-lock-time' }, clock()),
        notis, h('div', { class: 'feed-homebar' })));
    return {
      el,
      async run() {
        for (const n of NOTIS) {
          await CREW.util.sleep(700);
          if (!document.body.contains(el)) return;
          notis.prepend(h('div', { class: 'feed-noti' },
            h('span', { class: 'feed-noti-ic' }, 'g'),
            h('div', { class: 'feed-noti-b' }, h('div', { class: 'feed-noti-top' }, h('b', null, n.t), h('span', null, 'jetzt')), h('span', null, n.b))));
          CREW.sound.play('tick');
        }
      },
    };
  }

  /* ---------- Kopfzeile: Runde + Punkte ---------- */
  function typeIcon(type, size, big) {
    const T = TYPES[type];
    const el = h('span', { class: 'feed-tico' + (big ? ' big' : '') }, ownIcon(T.icon, size));
    el.style.setProperty('--c', T.col);
    return el;
  }
  function scoreboard(G) {
    G.scEl = {};
    if (G.solo) {
      const n = h('b', null, String(G.pts.solo));
      const el = h('span', { class: 'feed-sc crew' }, CREW.icon('star', 18), h('span', { class: 'nm' }, 'Punkte'), n);
      G.scEl.solo = { el, n };
      return h('div', { class: 'feed-score' }, el);
    }
    const mk = (side) => {
      const t = G.ctx.teams[side];
      const n = h('b', null, String(G.pts[side]));
      const el = h('span', { class: 'feed-sc ' + t.cls }, h('span', { class: 'dot' }), h('span', { class: 'nm' }, t.name), n);
      G.scEl[side] = { el, n };
      return el;
    };
    const cn = h('b', null, String(G.pts.A + G.pts.B));
    const crew = h('span', { class: 'feed-sc crew' }, CREW.icon('bolt', 18), h('span', { class: 'nm' }, 'Crew'), cn);
    G.scEl.crew = { el: crew, n: cn };
    return h('div', { class: 'feed-score', 'aria-live': 'polite' }, mk('A'), mk('B'), crew);
  }
  // Punkte gutschreiben (max = was möglich war; zählt für die Crew-Energie)
  function score(G, side, got, max) {
    G.max[side] += max;
    if (!got) return;
    const bump = (e, a, b) => {
      if (!e) return;
      CREW.ui.countUp(e.n, a, b, 600);
      e.el.classList.remove('bump');
      void e.el.offsetWidth;
      e.el.classList.add('bump');
    };
    const from = G.pts[side];
    G.pts[side] += got;
    bump(G.scEl[side], from, G.pts[side]);
    if (!G.solo) bump(G.scEl.crew, G.pts.A + G.pts.B - got, G.pts.A + G.pts.B);
  }
  function hud(G, type, sub) {
    return h('div', { class: 'feed-hud' },
      h('div', { class: 'feed-hud-l' }, typeIcon(type, 26),
        h('div', { class: 'stack', style: { gap: '2px' } },
          h('span', { class: 'eyebrow' }, 'Runde ' + G.round + ' von ' + G.total + (sub ? ' · ' + sub : '')),
          h('h3', null, TYPES[type].name))),
      scoreboard(G));
  }
  function layout(G, type, phoneEl, sideKids, sub) {
    return [hud(G, type, sub), h('div', { class: 'feed-main' }, h('div', { class: 'feed-left' }, phoneEl), h('div', { class: 'feed-side' }, sideKids))];
  }
  const teamPill = (G, side) => (side === 'solo' ? h('span', { class: 'pill accent' }, 'Du') : h('span', { class: 'pill ' + G.ctx.teams[side].cls }, G.ctx.teams[side].name));
  const letterChip = (L) => h('span', { class: 'feed-l l' + L }, L);
  const kindChip = (k) => h('span', { class: 'feed-kind ' + k.tone }, k.label);
  const ptsChip = (p) => h('span', { class: 'feed-pts' + (p ? '' : ' zero') }, '+' + p);
  // Überschrift der Frage: optional kleine Zeile davor (lage) und eine Aufforderung danach (post)
  function question(G, lage, title, speakText, post) {
    return h('div', { class: 'feed-q' },
      h('div', { class: 'stack', style: { gap: '4px' } },
        lage ? h('p', { class: 'feed-lage' }, lage) : null,
        h('h2', null, title),
        post ? h('p', { class: 'feed-post-q' }, post) : null),
      G.ctx.ui.speakBtn(speakText));
  }

  /* ---------- Eingabe ---------- */
  // Für Tests und Übergänge: Welcher Bildschirm ist gerade bedienbar?
  function mark(G, stage) {
    G.seq++;
    if (G.wrap) { G.wrap.dataset.feed = stage; G.wrap.dataset.seq = String(G.seq); }
  }
  // Knopf ins Bild holen, falls er unten aus dem Bildschirm ragt (einmal sofort, einmal nach dem Einblenden)
  function scrollIn(el) {
    const go = () => {
      if (!el || !el.isConnected) return;
      const r = el.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 4) el.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };
    requestAnimationFrame(go);
    setTimeout(go, 420);
  }
  function ask(G, container, options, stage, align) {
    const p = G.ctx.ui.choice(container, options, { align: align || 'end' });
    mark(G, stage);
    scrollIn(container.lastElementChild);
    return G.ctx.waitFor(p);
  }
  const nextLabel = (G) => (G.round < G.total ? 'Nächste Runde' : 'Zum Ergebnis');

  // Gruppe: „Zeigt her!“ → 3-2-1 → Lehrkraft tippt, was jedes Team zeigt.
  async function callTeams(G, holder, cfg) {
    const { ctx } = G;
    const ui = ctx.ui;
    let go;
    const p1 = new Promise((r) => { go = r; });
    clear(holder);
    const showBtn = ui.btn('Zeigt her!', () => go('go'), { variant: 'yellow', icon: 'eye', id: 'feed-show' });
    holder.appendChild(h('div', { class: 'feed-callbar' }, ui.paddleHint(cfg.paddle, cfg.hint), showBtn));
    mark(G, cfg.stage + '-ask');
    scrollIn(showBtn);
    const r1 = await ctx.waitFor(p1);
    if (r1 === ctx.SKIP) return ctx.SKIP;
    await ui.threeTwoOne('Zeigt her!');
    const optsEl = G.wrap && G.wrap.querySelector('.feed-opts');
    if (optsEl) optsEl.classList.add('compact');
    const sel = {};
    const teams = cfg.teams || ['A', 'B'];
    let done;
    const p2 = new Promise((r) => { done = r; });
    const rows = teams.map((side) => {
      const t = ctx.teams[side];
      const btns = cfg.choices.map((c) => {
        const b = h('button', { type: 'button', class: 'feed-seg ' + (c.cls || ''), 'data-team': side, 'data-v': c.v, 'aria-pressed': 'false' },
          h('span', null, c.label), c.sub ? h('small', null, c.sub) : null);
        b.addEventListener('click', () => {
          CREW.sound.play('tap');
          sel[side] = sel[side] === c.v ? null : c.v;
          btns.forEach((x) => { const on = x.dataset.v === sel[side]; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
        });
        return b;
      });
      return h('div', { class: 'feed-call-row' }, h('span', { class: 'pill ' + t.cls }, t.name), h('div', { class: 'feed-segs' }, btns));
    });
    const reveal = ui.btn('Auflösen', () => {
      if (!teams.some((s) => sel[s] != null)) { ui.toast('Tippt an, was die Teams zeigen.'); return; }
      done({ ...sel });
    }, { iconRight: 'right', id: 'feed-reveal' });
    clear(holder);
    holder.appendChild(h('div', { class: 'card feed-call enter' },
      h('div', { class: 'feed-call-h' }, CREW.icon('eye', 22), h('b', null, 'Was zeigen die Teams?')),
      rows, h('div', { class: 'row end' }, reveal)));
    mark(G, cfg.stage + '-call');
    scrollIn(reveal);
    return ctx.waitFor(p2);
  }

  // Solo: Knöpfe unter dem Bild
  function soloChoice(G, holder, stage, options) {
    clear(holder);
    const p = G.ctx.ui.choice(holder, options.map((o) => ({ label: o.label, value: o.v, variant: o.variant, icon: o.icon, id: 'feed-solo-' + o.v })), { align: 'start' });
    mark(G, stage);
    scrollIn(holder.lastElementChild);
    return G.ctx.waitFor(p);
  }

  // Antworten A–D: in der Gruppe nur Anzeige, solo zum Antippen
  function optionList(G, opts) {
    let pickFn;
    const picked = new Promise((r) => { pickFn = r; });
    const items = opts.map((o, i) => {
      const kids = [letterChip(o.L), h('span', { class: 'feed-opt-t' }, o.t)];
      const attrs = { class: 'feed-opt enter', 'data-letter': o.L, 'data-p': o.p != null ? String(o.p) : null, 'data-k': o.k || null, style: { animationDelay: 40 + i * 60 + 'ms' } };
      if (!G.solo) return h('div', attrs, kids);
      const b = h('button', { type: 'button', ...attrs }, kids);
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        items.forEach((x) => { x.disabled = true; });
        b.classList.add('picked');
        setTimeout(() => pickFn(o.L), 200);
      });
      return b;
    });
    return { el: h('div', { class: 'feed-opts' }, items), picked };
  }
  async function chooseOption(G, holder, list, stage) {
    if (G.solo) {
      clear(holder);
      holder.appendChild(h('p', { class: 'muted feed-hint' }, 'Tippe an, was du machen würdest.'));
      mark(G, stage + '-ask');
      const r = await G.ctx.waitFor(list.picked);
      return r === G.ctx.SKIP ? r : { solo: r };
    }
    return callTeams(G, holder, { stage, paddle: 'abcd', hint: 'Jedes Team einigt sich leise', choices: LETTERS.map((L) => ({ v: L, label: L, cls: 'l' + L })) });
  }
  // Gleiche Wahl beider Teams zusammenfassen
  function groupSel(G, sel) {
    const map = new Map();
    sides(G).forEach((s) => {
      const v = sel[s];
      if (v == null) return;
      if (!map.has(v)) map.set(v, []);
      map.get(v).push(s);
    });
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([L, ss]) => ({ L, sides: ss }));
  }
  // „Alle Wege“: Was hätten die anderen Antworten bewirkt?
  function allWays(G, title, opts, render) {
    G.ctx.ui.modal({
      title,
      body: h('div', { class: 'feed-ways' }, opts.map((o) => h('div', { class: 'feed-way' }, letterChip(o.L), h('div', { class: 'feed-way-b' }, render(o))))),
      actions: [{ label: 'Schließen', value: true }],
    });
  }
  function footer(G, extra) {
    return h('div', { class: 'row between feed-foot' }, extra || h('span'));
  }

  /* ---------- Gesicht: So geht es der Person ---------- */
  function faceSVG(feel) {
    const f = clamp(feel, 0, 100) / 100;
    const c = Math.round((f - 0.42) * 32);
    const S = `stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"`;
    const eyes = f >= 0.7
      ? `<path d="M31 46 Q38 37 45 46 M55 46 Q62 37 69 46" ${S}/>`
      : `<circle cx="38" cy="44" r="5.5" fill="${INK}"/><circle cx="62" cy="44" r="5.5" fill="${INK}"/>`;
    const brows = f < 0.38 ? `<path d="M27 36 L42 30 M73 36 L58 30" ${S}/>` : '';
    const tear = f < 0.2 ? `<path d="M68 51 Q73 60 68 64 Q63 60 68 51 Z" style="fill:var(--teamA)" stroke="${INK}" stroke-width="2.5"/>` : '';
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" style="fill:var(--yellow)" stroke="${INK}" stroke-width="5"/>${eyes}${brows}<path d="M31 69 Q50 ${69 + c} 69 69" ${S}/>${tear}</svg>`;
  }

  /* ---------- Runde: Fakt oder Meinung? ---------- */
  async function roundFakt(G, card) {
    const { ctx } = G;
    const ui = ctx.ui;
    const n = card.items.length;
    const done = [];
    let playedAny = false;
    for (let i = 0; i < n; i++) {
      const it = card.items[i];
      const ph = phoneShell(appHead(), [postEl(card.post),
        h('div', { class: 'feed-cmts' }, card.items.map((c, j) => cmtEl(c, j === i ? 'cur' : done[j] ? 'done' : j > i ? 'later' : 'skipped', done[j])))], { cls: 'fakt' });
      const holder = h('div', { class: 'feed-holder' });
      G.wrap = ctx.screen(layout(G, 'fakt', ph.el, [
        question(G, null, 'Kann man das nachprüfen?', () => it.text + '. Kann man das nachprüfen?'),
        h('div', { class: 'card feed-quote enter' }, ava(it.von, 46),
          h('div', { class: 'feed-quote-b' }, h('span', { class: 'feed-handle' }, '@' + it.von), h('div', { class: 'feed-quote-t' }, '„' + it.text + '“'))),
        h('div', { class: 'feed-rule' },
          h('div', null, stampEl('F'), h('span', null, 'kann man nachprüfen')),
          h('div', null, stampEl('M'), h('span', null, 'jemand findet etwas'))),
        holder,
      ], 'Kommentar ' + (i + 1) + ' von ' + n));
      // Aktuellen Kommentar im Handy sichtbar halten
      requestAnimationFrame(() => {
        const cur = ph.body.querySelector('.feed-cmt.cur');
        if (cur && cur.offsetTop + cur.offsetHeight > ph.body.clientHeight) ph.body.scrollTop = cur.offsetTop + cur.offsetHeight - ph.body.clientHeight + 10;
      });
      let ans;
      if (G.solo) {
        const r = await soloChoice(G, holder, 'fakt-ask', [{ v: 'F', label: 'Fakt', variant: 'good' }, { v: 'M', label: 'Meinung', variant: 'yellow' }]);
        if (r === ctx.SKIP) continue;
        ans = { solo: r };
      } else {
        const r = await callTeams(G, holder, { stage: 'fakt', paddle: 'janein', hint: 'Ja = Fakt · Nein = Meinung', choices: [{ v: 'F', label: 'Fakt', sub: 'Ja', cls: 'ja' }, { v: 'M', label: 'Meinung', sub: 'Nein', cls: 'nein' }] });
        if (r === ctx.SKIP) continue;
        ans = r;
      }
      playedAny = true;
      const truth = it.fakt ? 'F' : 'M';
      done[i] = truth;
      // Stempel im Handy
      const cur = ph.body.querySelector('.feed-cmt.cur');
      if (cur) { cur.classList.remove('cur'); cur.classList.add('done'); cur.appendChild(stampEl(truth)); }
      let anyRight = false;
      const rows = sides(G).filter((s) => ans[s] != null).map((s) => {
        const ok = ans[s] === truth;
        anyRight = anyRight || ok;
        score(G, s, ok ? 1 : 0, 1);
        const txt = G.solo ? (ok ? 'Richtig erkannt!' : 'Diesmal anders. Lies kurz die Begründung.') : (ok ? 'richtig erkannt' : 'anders getippt');
        return h('div', { class: 'feed-res-row' }, G.solo ? null : teamPill(G, s), h('span', null, txt), h('span', { class: 'feed-grow' }), ptsChip(ok ? 1 : 0));
      });
      clear(holder);
      holder.appendChild(h('div', { class: 'card feed-verdict pop v' + truth },
        h('div', { class: 'feed-verdict-top' }, stampEl(truth, true), h('p', { class: 'lead' }, it.why)),
        h('div', { class: 'feed-res' }, rows)));
      CREW.sound.play(anyRight ? 'good' : 'soft');
      await ask(G, holder, [{ label: i < n - 1 ? 'Nächster Kommentar' : nextLabel(G), value: 'go', iconRight: 'right', id: 'feed-next' }], 'fakt-done');
    }
    return playedAny;
  }

  /* ---------- Runde: Was machst du? ---------- */
  function tunCard(G, card, o, ss) {
    const kind = TUN_KIND[o.p] || TUN_KIND[1];
    const start = card.zahl.start;
    const num = h('b', { class: 'feed-big' }, fmtN(start));
    const face = h('span', { class: 'feed-face', html: faceSVG(50) });
    const word = h('b', { class: 'feed-feel' }, '…');
    const el = h('div', { class: 'card feed-out k-' + kind.tone, 'data-p': String(o.p) },
      h('div', { class: 'feed-out-top' }, letterChip(o.L), ss.map((s) => teamPill(G, s)), h('span', { class: 'feed-grow' }), kindChip(kind)),
      h('div', { class: 'feed-out-t' }, o.t),
      h('div', { class: 'feed-metrics' },
        h('div', { class: 'feed-metric' }, h('span', { class: 'feed-mi' }, CREW.icon('eye', 28)), h('div', { class: 'feed-mv' }, num, h('span', null, card.zahl.label))),
        h('div', { class: 'feed-metric' }, face, h('div', { class: 'feed-mv' }, word, h('span', null, 'So geht’s ' + card.ziel)))),
      h('p', { class: 'feed-line' }, o.line),
      ptsChip(o.p));
    return {
      el,
      play() {
        CREW.ui.countUp(num, start, o.n, 1200).then(() => { num.textContent = fmtN(o.n); });
        setTimeout(() => {
          face.innerHTML = faceSVG(o.feel);
          face.classList.remove('pop');
          void face.offsetWidth;
          face.classList.add('pop');
          word.textContent = feelWord(o.feel);
        }, 500);
      },
    };
  }
  async function roundTun(G, card) {
    const { ctx } = G;
    const ui = ctx.ui;
    const opts = shuffle(card.opts).map((o, i) => ({ ...o, L: LETTERS[i] }));
    const scene = scenePhone(G, card.szene);
    const list = optionList(G, opts);
    const holder = h('div', { class: 'feed-holder' });
    const readAll = () => card.lage + ' Was machst du? ' + opts.map((o) => o.L + ': ' + o.t).join(' ');
    list.el.style.visibility = 'hidden';
    G.wrap = ctx.screen(layout(G, 'tun', scene.el, [question(G, null, card.lage, readAll, G.solo ? 'Was machst du?' : 'Was macht ihr?'), list.el, holder]));
    mark(G, 'tun-intro');
    await scene.play();
    list.el.style.visibility = '';
    const sel = await chooseOption(G, holder, list, 'tun');
    if (sel === ctx.SKIP) return false;
    // Auflösung: Folgen jeder gewählten Antwort
    const groups = groupSel(G, sel);
    const cards = groups.map((g) => ({ g, o: opts.find((x) => x.L === g.L) })).map(({ g, o }) => ({ o, g, c: tunCard(G, card, o, g.sides) }));
    const allBtn = ui.btn('Alle Wege', () => allWays(G, 'Alle Wege · ' + card.ziel, opts, (o) => [
      h('div', { class: 'row', style: { gap: '8px' } }, h('b', null, o.t), kindChip(TUN_KIND[o.p])),
      h('div', { class: 'feed-way-meta' }, h('span', null, CREW.icon('eye', 16), fmtN(o.n) + ' ' + card.zahl.label), h('span', null, card.ziel + ': ' + feelWord(o.feel))),
      h('span', { class: 'muted' }, o.line)]), { variant: 'ghost', icon: 'eye', id: 'feed-all' });
    const foot = footer(G, allBtn);
    G.wrap = ctx.screen([
      hud(G, 'tun', 'Folgen'),
      h('div', { class: 'feed-outs' + (cards.length === 1 ? ' one' : '') }, cards.map((x) => x.c.el)),
      foot,
    ]);
    mark(G, 'tun-out-wait');
    await ctx.sleep(250);
    cards.forEach((x) => { x.c.play(); x.g.sides.forEach((s) => score(G, s, x.o.p, 3)); });
    CREW.sound.play(cards.some((x) => x.o.p >= 2) ? 'good' : 'soft');
    await ctx.sleep(400);
    await ask(G, foot, [{ label: nextLabel(G), value: 'go', iconRight: 'right', id: 'feed-next' }], 'tun-out');
    return true;
  }

  /* ---------- Runde: Gruppendruck ---------- */
  function checkEl(label, v) {
    const ic = v === 'ja' ? CREW.icon('check', 18) : v === 'nein' ? CREW.icon('x', 18) : h('b', { class: 'feed-check-s' }, v === 'halb' ? '~' : '–');
    return h('span', { class: 'feed-check ' + v }, ic, label);
  }
  function druckCard(G, o, ss) {
    const kind = DRUCK_KIND[o.k];
    const chat = h('div', { class: 'feed-minichat' });
    const checks = h('div', { class: 'feed-checks' }, checkEl('Nein gesagt', kind.nein), checkEl('Gesicht gewahrt', kind.gesicht));
    const line = h('p', { class: 'feed-line' }, o.line);
    const pts = ptsChip(kind.p);
    [checks, line, pts].forEach((x) => { x.style.visibility = 'hidden'; });
    const el = h('div', { class: 'card feed-out k-' + kind.tone, 'data-k': o.k },
      h('div', { class: 'feed-out-top' }, letterChip(o.L), ss.map((s) => teamPill(G, s)), h('span', { class: 'feed-grow' }), kindChip(kind)),
      chat, checks, line, pts);
    return {
      el,
      async play() {
        chat.appendChild(msgEl({ von: 'Du', text: o.t }));
        CREW.sound.play('whoosh');
        await G.ctx.sleep(700);
        const t = typingEl(o.antwort.von);
        chat.appendChild(t);
        await G.ctx.sleep(900);
        t.remove();
        chat.appendChild(msgEl(o.antwort));
        [checks, line, pts].forEach((x) => { x.style.visibility = ''; x.classList.add('pop'); });
      },
    };
  }
  async function roundDruck(G, card) {
    const { ctx } = G;
    const ui = ctx.ui;
    const opts = shuffle(card.opts).map((o, i) => ({ ...o, L: LETTERS[i] }));
    const ph = phoneShell(chatHead(card.chat), [], { chat: true });
    const list = optionList(G, opts);
    const holder = h('div', { class: 'feed-holder' });
    const readAll = () => card.msgs.map((m) => m.von + ': ' + m.text).join(' ') + ' Was schreibst du zurück? ' + opts.map((o) => o.L + ': ' + o.t).join(' ');
    list.el.style.visibility = 'hidden';
    G.wrap = ctx.screen(layout(G, 'druck', ph.el, [question(G, card.lage, 'Was schreibst du zurück?', readAll), list.el, holder]));
    mark(G, 'druck-intro');
    for (const m of card.msgs) await arrive(G, ph.body, m, 4);
    list.el.style.visibility = '';
    const sel = await chooseOption(G, holder, list, 'druck');
    if (sel === ctx.SKIP) return false;
    // Auflösung: Antwort im Chat + Reaktion + zwei Häkchen
    const groups = groupSel(G, sel);
    const cards = groups.map((g) => { const o = opts.find((x) => x.L === g.L); return { o, g, c: druckCard(G, o, g.sides) }; });
    const nein = h('div', { class: 'card feed-nein' },
      h('div', { class: 'feed-nein-h' }, CREW.icon('shield', 26), h('b', null, 'Nein-Sätze, die funktionieren')),
      h('div', { class: 'feed-nein-list' }, card.nein.map((s) => h('div', { class: 'feed-nein-l' }, '„' + s + '“'))),
      h('p', { class: 'muted small' }, 'Welcher passt zu dir?'));
    const allBtn = ui.btn('Alle Wege', () => allWays(G, 'Alle Antworten', opts, (o) => [
      h('div', { class: 'row', style: { gap: '8px' } }, h('b', null, '„' + o.t + '“'), kindChip(DRUCK_KIND[o.k])),
      h('span', { class: 'feed-way-meta' }, o.antwort.von + ': „' + o.antwort.text + '“'),
      h('span', { class: 'muted' }, o.line)]), { variant: 'ghost', icon: 'eye', id: 'feed-all' });
    const foot = footer(G, allBtn);
    G.wrap = ctx.screen([
      hud(G, 'druck', 'Reaktionen'),
      h('div', { class: 'feed-outs druck' }, cards.map((x) => x.c.el), nein),
      foot,
    ]);
    mark(G, 'druck-out-wait');
    await ctx.sleep(250);
    await Promise.all(cards.map((x) => x.c.play()));
    cards.forEach((x) => x.g.sides.forEach((s) => score(G, s, DRUCK_KIND[x.o.k].p, 3)));
    CREW.sound.play(cards.some((x) => x.o.k === 'cool') ? 'great' : 'good');
    await ask(G, foot, [{ label: nextLabel(G), value: 'go', iconRight: 'right', id: 'feed-next' }], 'druck-out');
    return true;
  }

  /* ---------- Runde: Gerücht-Kette ---------- */
  // Schritte 1–4 und „?“ (so weit wäre es ohne Stopp gekommen)
  function chainTrack(G, n) {
    const node = (label) => {
      const c = h('span', { class: 'c' }, label);
      const v = h('span', { class: 'v' }, '·');
      const flags = h('span', { class: 'flags' });
      return { el: h('div', { class: 'feed-node' }, c, v, flags), c, v, flags };
    };
    const nodes = Array.from({ length: n }, (_, i) => node(String(i + 1)));
    const end = node('?');
    end.el.classList.add('end');
    return {
      el: h('div', { class: 'feed-track', role: 'img', 'aria-label': 'Kette in ' + n + ' Schritten' }, nodes.map((x) => x.el), end.el),
      set(i, views, stopped) {
        nodes.forEach((x, j) => { x.el.classList.toggle('on', j <= i); x.el.classList.toggle('now', j === i); });
        if (views != null) nodes[i].v.textContent = fmt(views);
        nodes.forEach((x, j) => {
          clear(x.flags);
          sides(G).forEach((s) => {
            if (stopped[s] === j + 1) x.flags.appendChild(h('span', { class: 'feed-flag ' + (s === 'solo' ? 'solo' : G.ctx.teams[s].cls) }, s === 'solo' ? 'Du' : s));
          });
        });
      },
    };
  }
  // Punkte-Wolke: so viele Leute haben es gesehen
  function swarm() {
    const N = 140, W = 220, H = 120;
    const golden = Math.PI * (3 - Math.sqrt(5));
    let dots = '';
    for (let i = 0; i < N; i++) {
      const r = 5.1 * Math.sqrt(i + 0.5);
      const a = i * golden;
      dots += `<circle cx="${(W / 2 + r * Math.cos(a) * 1.55).toFixed(1)}" cy="${(H / 2 + r * Math.sin(a) * 0.93).toFixed(1)}" r="${i ? 3.4 : 6}"/>`;
    }
    const el = h('div', { class: 'feed-swarm', html: `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${dots}</svg>` });
    const cs = el.querySelectorAll('circle');
    let shown = 1;
    cs[0].classList.add('src');
    return {
      el,
      set(frac) {
        const k = Math.max(1, Math.round(N * Math.sqrt(clamp(frac, 0, 1))));
        cs.forEach((c, i) => { c.classList.toggle('on', i < k); c.classList.toggle('new', i >= shown && i < k); });
        shown = k;
      },
    };
  }
  function stepToggles(G, holder, active, last) {
    const { ctx } = G;
    const ui = ctx.ui;
    const stop = new Set();
    let done;
    const p = new Promise((r) => { done = r; });
    const nxt = ui.btn(last ? 'Weiter' : 'Kette läuft weiter', () => done([...stop]), { iconRight: 'right', id: 'feed-next' });
    const lbl = nxt.querySelector('span:not(.ic)');
    const tg = active.map((s) => {
      const t = ctx.teams[s];
      const b = h('button', { type: 'button', class: 'feed-toggle ' + t.cls, 'data-team': s, 'aria-pressed': 'false' },
        h('span', { class: 'feed-tg-box' }, CREW.icon('check', 22)),
        h('span', { class: 'feed-tg-t' }, h('b', null, t.name), h('small', null, 'stoppt hier')));
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        if (stop.has(s)) stop.delete(s); else stop.add(s);
        b.classList.toggle('on', stop.has(s));
        b.setAttribute('aria-pressed', String(stop.has(s)));
        lbl.textContent = stop.size ? 'Stopp!' : last ? 'Weiter' : 'Kette läuft weiter';
      });
      return b;
    });
    clear(holder);
    holder.appendChild(h('div', { class: 'feed-callbar' },
      ui.paddleHint('janein', 'Ja = Wir stoppen hier'),
      ui.btn('3-2-1', () => ui.threeTwoOne('Zeigt her!'), { variant: 'ghost', small: true, icon: 'timer', id: 'feed-321' })));
    holder.appendChild(h('div', { class: 'feed-toggles' }, tg));
    holder.appendChild(h('div', { class: 'row end' }, nxt));
    mark(G, 'kette-step');
    scrollIn(nxt);
    return ctx.waitFor(p);
  }
  function ketteCard(G, card, side, stopStep, o) {
    const views = stopStep ? card.steps[stopStep - 1].views : card.ende.views;
    const tpts = !stopStep ? 0 : stopStep <= 2 ? 2 : 1;
    const mk = o ? WIE_KIND[o.k] : null;
    const mpts = mk ? mk.p : 0;
    const num = h('b', { class: 'feed-big' }, '0');
    const stopKind = !stopStep ? { tone: 'okay', label: 'Kein Stopp' } : { tone: stopStep <= 2 ? 'stark' : 'gut', label: 'Stopp bei ' + stopStep };
    const el = h('div', { class: 'card feed-out feed-kout k-' + stopKind.tone, 'data-stop': String(stopStep || 0) },
      h('div', { class: 'feed-out-top' }, teamPill(G, side), kindChip(stopKind), h('span', { class: 'feed-grow' }),
        h('div', { class: 'feed-seen' }, CREW.icon('eye', 24), num, h('span', null, 'gesehen'))),
      o ? h('div', { class: 'feed-how' }, letterChip(o.L),
        h('div', { class: 'feed-how-b' }, h('b', null, o.t, ' ', kindChip(mk)), h('span', { class: 'muted' }, o.line))) : null,
      ptsChip(tpts + mpts));
    return {
      el,
      pts: tpts + mpts,
      max: 2 + (o ? 1 : 0),
      play() { CREW.ui.countUp(num, 0, views, 1000).then(() => { num.textContent = fmtN(views); }); },
    };
  }
  async function roundKette(G, card) {
    const { ctx } = G;
    const ui = ctx.ui;
    const steps = card.steps;
    const stopped = {};
    const ph = phoneShell(chatHead(card.chat), [], { chat: true });
    const track = chainTrack(G, steps.length);
    const counter = h('b', { class: 'feed-big' }, '0');
    const sw = swarm();
    const holder = h('div', { class: 'feed-holder' });
    const title = h('h2', null, G.solo ? 'Stoppst du die Kette?' : 'Stoppt ihr die Kette?');
    const readAll = () => steps.map((s) => s.text).join(' ');
    G.wrap = ctx.screen(layout(G, 'kette', ph.el, [
      h('div', { class: 'feed-q' }, h('div', { class: 'stack', style: { gap: '4px' } }, h('p', { class: 'feed-lage' }, 'Ein Gerücht über ' + card.ziel + ' wandert durch die Chats.'), title), ui.speakBtn(readAll)),
      h('div', { class: 'card feed-spread' }, track.el,
        h('div', { class: 'feed-spread-row' },
          h('div', { class: 'feed-count' }, h('span', { class: 'feed-mi' }, CREW.icon('eye', 28)), h('div', { class: 'feed-mv' }, counter, h('span', null, 'haben es gesehen'))),
          sw.el)),
      holder,
    ]));
    mark(G, 'kette-intro');
    let views = 0;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      await arrive(G, ph.body, { von: s.von, text: s.text, fwd: i > 0 }, 3);
      CREW.sound.play(i ? 'whoosh' : 'soft');
      ui.countUp(counter, views, s.views, 800);
      views = s.views;
      sw.set(s.views / card.ende.views);
      track.set(i, s.views, stopped);
      const active = sides(G).filter((x) => !stopped[x]);
      const last = i === steps.length - 1;
      let r;
      if (G.solo) {
        r = await soloChoice(G, holder, 'kette-step', [{ v: 'stop', label: 'Stopp! Ich greife ein', variant: 'yellow', icon: 'x' }, { v: 'go', label: last ? 'Nicht stoppen' : 'Weiter zuschauen', variant: 'ghost' }]);
        if (r === ctx.SKIP) return false;
        if (r === 'stop') stopped.solo = i + 1;
      } else {
        r = await stepToggles(G, holder, active, last);
        if (r === ctx.SKIP) return false;
        r.forEach((x) => { stopped[x] = i + 1; });
      }
      track.set(i, null, stopped);
      if ((Array.isArray(r) && r.length) || r === 'stop') CREW.sound.play('go');
      if (sides(G).every((x) => stopped[x])) break;
    }
    // Wie stoppt ihr es?
    const wie = shuffle(card.wie).map((o, i) => ({ ...o, L: LETTERS[i] }));
    const list = optionList(G, wie);
    const holder2 = h('div', { class: 'feed-holder' });
    const info = h('div', { class: 'feed-stopinfo' }, sides(G).map((x) => h('span', { class: 'feed-stopchip' }, teamPill(G, x), stopped[x] ? 'Stopp bei ' + stopped[x] : 'kein Stopp')));
    const anyStop = sides(G).some((x) => stopped[x]);
    G.wrap = ctx.screen(layout(G, 'kette', ph.el, [
      question(G, null, G.solo ? (anyStop ? 'Wie stoppst du es?' : 'Wie hättest du es gestoppt?') : anyStop ? 'Wie stoppt ihr es?' : 'Wie hättet ihr es gestoppt?', () => wie.map((o) => o.L + ': ' + o.t).join(' ')),
      info, list.el, holder2,
    ], 'Wie?'));
    const sel = await chooseOption(G, holder2, list, 'kette');
    const chosen = sel === ctx.SKIP ? {} : sel;
    // Auflösung
    const cards = sides(G).map((x) => ketteCard(G, card, x, stopped[x], chosen[x] ? wie.find((o) => o.L === chosen[x]) : null));
    const endNum = h('b', { class: 'feed-big' }, '0');
    const ohne = h('div', { class: 'card feed-out feed-ghost' },
      h('span', { class: 'eyebrow' }, 'Ohne Stopp'),
      h('div', { class: 'feed-ghost-row' },
        h('div', { class: 'feed-minichat' }, msgEl({ von: '???', text: card.ende.text, fwd: true })),
        h('div', { class: 'feed-metric' }, h('span', { class: 'feed-mi' }, CREW.icon('eye', 28)), h('div', { class: 'feed-mv' }, endNum, h('span', null, 'hätten es gesehen')))));
    const wahr = h('div', { class: 'card feed-out feed-truth' },
      h('span', { class: 'eyebrow' }, 'Was wirklich war'),
      h('div', { class: 'feed-truth-row' }, h('span', { class: 'feed-truth-ic' }, CREW.icon('check', 30)), h('p', { class: 'lead' }, card.wahr)));
    const allBtn = ui.btn('Alle Wege', () => allWays(G, 'Alle Wege zum Stoppen', wie, (o) => [
      h('div', { class: 'row', style: { gap: '8px' } }, h('b', null, o.t), kindChip(WIE_KIND[o.k])),
      h('span', { class: 'muted' }, o.line)]), { variant: 'ghost', icon: 'eye', id: 'feed-all' });
    const foot = footer(G, allBtn);
    G.wrap = ctx.screen([
      hud(G, 'kette', 'Auflösung'),
      h('div', { class: 'feed-outs kette' }, cards.map((c) => c.el), ohne, wahr),
      foot,
    ]);
    mark(G, 'kette-out-wait');
    await ctx.sleep(250);
    cards.forEach((c) => c.play());
    ui.countUp(endNum, 0, card.ende.views, 1300).then(() => { endNum.textContent = fmtN(card.ende.views); });
    sides(G).forEach((x, i) => score(G, x, cards[i].pts, cards[i].max));
    CREW.sound.play(cards.some((c) => c.pts >= 2) ? 'good' : 'reveal');
    await ctx.sleep(400);
    await ask(G, foot, [{ label: nextLabel(G), value: 'go', iconRight: 'right', id: 'feed-next' }], 'kette-out');
    return true;
  }

  /* ---------- Intro, Übergänge, Ende ---------- */
  async function intro(G) {
    const { ctx } = G;
    const ui = ctx.ui;
    const lock = lockPhone();
    const kinds = h('div', { class: 'feed-kinds' }, Object.keys(TYPES).map((k, i) =>
      h('div', { class: 'feed-kindtile enter', style: { animationDelay: 120 + i * 80 + 'ms' } }, typeIcon(k, 24), h('b', null, TYPES[k].name))));
    const formula = G.solo ? null : h('div', { class: 'feed-formula' },
      h('span', { class: 'pill ' + ctx.teams.A.cls }, ctx.teams.A.name), h('b', null, '+'),
      h('span', { class: 'pill ' + ctx.teams.B.cls }, ctx.teams.B.name), h('b', null, '='),
      h('span', { class: 'pill feed-crewpill' }, CREW.icon('bolt', 16), 'Crew-Energie'));
    const side = h('div', { class: 'feed-side' },
      h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, G.solo ? 'Solo · 5 Runden' : 'Mission · 5 Runden'), h('h1', { class: 'outline-text feed-title' }, 'Feed-Check')),
      h('p', { class: 'lead' }, G.solo ? 'Dein Handy vibriert ohne Pause. Was ist echt? Und was machst du?' : 'Euer Handy vibriert ohne Pause. Was ist echt? Und was macht ihr?'),
      kinds,
      h('p', { class: 'muted' }, G.solo ? 'Tippe an, was du machen würdest. Du siehst sofort, was passiert.' : 'Teilt euch in zwei Teams. Jedes Team einigt sich leise und zeigt es.'),
      formula);
    G.wrap = ctx.screen([h('div', { class: 'feed-main feed-intro' }, h('div', { class: 'feed-left' }, lock.el), side)]);
    lock.run();
    await ask(G, side, [{ label: G.solo ? 'Los geht’s' : 'Teams stehen – los!', value: 'go', iconRight: 'right', id: 'feed-go' }], 'intro', 'start');
  }
  async function splash(G, type) {
    const ov = h('div', { class: 'overlay feed-splash', 'aria-hidden': 'true' },
      h('div', { class: 'feed-splash-in' }, typeIcon(type, 60, true),
        h('span', { class: 'eyebrow' }, 'Runde ' + G.round + ' von ' + G.total),
        h('div', { class: 'display feed-splash-t' }, TYPES[type].name)));
    G.ctx.ui.overlays().appendChild(ov);
    CREW.sound.play('whoosh');
    try { await G.ctx.sleep(1150); } finally { ov.remove(); }
  }
  function tipCard() {
    return h('div', { class: 'card feed-tip' },
      h('span', { class: 'feed-tip-ic' }, CREW.icon('shield', 34)),
      h('div', { class: 'stack', style: { gap: '4px' } },
        h('b', { class: 'feed-tip-h' }, 'Online läuft was schief?'),
        h('p', null, 'BEE SECURE Helpline: ', h('b', { class: 'feed-tel selectable' }, '8002 1234')),
        h('p', { class: 'muted small' }, 'Kostenlos, anonym und vertraulich. Oder sprich mit einer Person hier in der Annexe.')));
  }
  const ratioOf = (G) => {
    const max = sides(G).reduce((a, s) => a + G.max[s], 0);
    const got = sides(G).reduce((a, s) => a + G.pts[s], 0);
    return max ? got / max : 0;
  };
  function praise(r, solo) {
    if (r >= 0.8) return solo ? 'Stark! Du hast den Feed voll im Griff.' : 'Stark! Ihr habt den Feed voll im Griff.';
    if (r >= 0.55) return solo ? 'Gut gemacht! Dich legt man nicht so leicht rein.' : 'Gut gemacht! Euch legt man nicht so leicht rein.';
    return solo ? 'Du hast ausprobiert, was online passiert. Das zählt.' : 'Ihr habt ausprobiert, was online passiert. Das zählt.';
  }
  async function ending(G) {
    const { ctx } = G;
    const ui = ctx.ui;
    const total = G.pts.A + G.pts.B;
    const r = ratioOf(G);
    const num = h('span', { class: 'display feed-endnum' }, '0');
    const sc = (side) => h('span', { class: 'feed-sc ' + ctx.teams[side].cls }, h('span', { class: 'dot' }), h('span', { class: 'nm' }, ctx.teams[side].name), h('b', null, String(G.pts[side])));
    const wrap = ctx.screen([
      h('div', { class: 'stack feed-end' },
        h('span', { class: 'eyebrow' }, 'Feed-Check geschafft'),
        h('h2', null, praise(r)),
        h('div', { class: 'feed-formula big' }, sc('A'), h('b', null, '+'), sc('B'), h('b', null, '=')),
        h('div', { class: 'feed-endrow' }, CREW.icon('bolt', 52), num, h('span', { class: 'display feed-endlbl' }, 'Crew-Punkte'))),
      tipCard(),
    ], { center: true, narrow: true });
    G.wrap = wrap;
    CREW.sound.play('great');
    if (r >= 0.55) ui.confetti(140);
    await ui.countUp(num, 0, total, 900);
    await ask(G, wrap, [{ label: 'Weiter', value: 'go', iconRight: 'right', id: 'feed-next' }], 'end', 'center');
  }
  async function soloEnd(G, best) {
    const { ctx } = G;
    const ui = ctx.ui;
    const num = h('span', { class: 'display feed-endnum' }, '0');
    const wrap = ctx.screen([
      h('div', { class: 'stack feed-end' },
        h('span', { class: 'eyebrow' }, 'Solo · Feed-Check'),
        h('h2', null, praise(ratioOf(G), true)),
        h('div', { class: 'feed-endrow' }, CREW.icon('star', 48), num, h('span', { class: 'display feed-endlbl' }, 'von ' + G.max.solo)),
        best.isNew && G.pts.solo > 0 ? h('span', { class: 'pill good' }, 'Neuer Bestwert!') : h('span', { class: 'pill' }, 'Dein Bestwert: ' + best.best)),
      tipCard(),
    ], { center: true, narrow: true });
    G.wrap = wrap;
    CREW.sound.play('good');
    await ui.countUp(num, 0, G.pts.solo, 800);
    return ask(G, wrap, [{ label: 'Nochmal', value: 'again', variant: 'ghost', icon: 'shuffle' }, { label: 'Fertig', value: 'done', iconRight: 'right', id: 'feed-done' }], 'solo-end', 'center');
  }

  /* ---------- Ablauf ---------- */
  // Jede Session: alle vier Rundentypen + eine Extra-Runde (Was machst du? oder Gruppendruck)
  function planRounds(ctx) {
    const order = ['fakt', 'tun', 'kette', 'druck', Math.random() < 0.5 ? 'tun' : 'druck'];
    const ids = new Set();
    const cards = [];
    for (const t of order) {
      let c = ctx.pick('feed', 1, (x) => x.type === t && !ids.has(x.id))[0];
      if (!c) c = ctx.pick('feed', 1, (x) => !ids.has(x.id))[0];
      if (c) { ids.add(c.id); cards.push(c); }
    }
    return cards;
  }
  const ROUND = { fakt: roundFakt, tun: roundTun, kette: roundKette, druck: roundDruck };
  async function play(ctx) {
    const G = { ctx, solo: !!ctx.solo, round: 0, total: 0, pts: { A: 0, B: 0, solo: 0 }, max: { A: 0, B: 0, solo: 0 }, played: 0, seq: 0, scEl: {}, wrap: null };
    const cards = planRounds(ctx);
    G.total = cards.length;
    await intro(G);
    for (const card of cards) {
      G.round++;
      await splash(G, card.type);
      if (await ROUND[card.type](G, card)) G.played++;
    }
    return G;
  }

  CREW.registerMission({
    id: 'feed',
    day: 4,
    title: 'Feed-Check',
    tagline: 'Gerüchte, Chats, Gruppendruck. Was macht ihr?',
    minutes: 7,
    themes: ['Medien', 'Zivilcourage', 'Gruppendruck'],
    etep: 'IV–V',
    eldib: [
      { code: 'KOG-58', text: 'unterscheidet in Posts und Texten Fakten von Meinungen' },
      { code: 'K-31', text: 'findet in angespannten Gruppenmomenten ruhige, entschärfende Worte' },
      { code: 'SOZ-31', text: 'sagt, dass er/sie anders handelt als die Gruppe' },
      { code: 'SOZ-37', text: 'versteht, wie es anderen geht, und nimmt Rücksicht' },
      { code: 'SOZ-39', text: 'entscheidet nach eigenen Werten, auch unter Druck' },
    ],
    teacherNote: 'Zwei Teams, fünf schnelle Runden auf einem erfundenen Handy („Glimmr“). Rundentypen: Fakt oder Meinung? (Antwort-Karte Ja = Fakt, Nein = Meinung), Was machst du? (A–D), Gerücht-Kette (bei jedem Schritt: Ja = wir stoppen hier), Gruppendruck (A–D). Jedes Team einigt sich leise. Auf „Zeigt her!“ hält pro Team eine Person die Karte hoch (oder alle, dann zählt die Mehrheit). Du tippst an, was jedes Team zeigt. Punkte: stark 3, gut 2, okay 1, riskant 0; Fakt/Meinung 1 pro Kommentar; Kette: früh gestoppt 2, später 1, plus 1 für einen starken Weg. Beide Teamkonten zählen am Ende zusammen für die Crew. Es gibt kein „Falsch“: Die Folgen werden nur sichtbar. „Alle Wege“ zeigt, was die anderen Antworten bewirkt hätten – gut zum Nachfragen. Vapes, Familie und Geld sind als heikel markiert. Die X-Karte überspringt einen Kommentar oder eine Runde. Am Ende steht die BEE SECURE Helpline (8002 1234).',
    debrief: [
      'Warum leiten Leute Gerüchte weiter, obwohl sie nicht wissen, ob es stimmt?',
      'Hast du schon mal erlebt, dass online etwas ganz anders war als in echt?',
      'Wie sagt man Nein, ohne uncool zu wirken? Welcher Satz passt zu dir?',
      'Was macht es schwer, im Gruppenchat etwas gegen die anderen zu schreiben?',
      'An wen kannst du dich wenden, wenn online etwas schiefläuft?',
      'Woran erkennst du, ob ein Post eine Meinung oder ein Fakt ist?',
      'Was hilft einer Person, über die gerade alle lästern?',
    ],
    async run(ctx) {
      const G = await play(ctx);
      await ending(G);
      const r = ratioOf(G);
      const energy = G.played ? clamp(5 + Math.round(5 * r), 4, 10) : 4;
      let summary = 'Ihr habt ausprobiert, was online passiert. Das zählt.';
      if (r >= 0.8) summary = 'Stark! Ihr habt den Feed voll im Griff.';
      else if (r >= 0.55) summary = 'Gut gemacht! Ihr lasst euch online nicht so leicht reinlegen.';
      return { energy, summary };
    },
  });

  /* ---------- Solo: eine Person tippt direkt an ---------- */
  CREW.registerSolo({
    id: 'feed',
    title: 'Feed-Check',
    desc: 'Posts, Chats, Gerüchte. Was ist echt und was machst du?',
    icon: 'phone',
    async run(ctx) {
      for (;;) {
        const G = await play(ctx);
        const best = ctx.best('punkte', G.pts.solo, true);
        const r = await soloEnd(G, best);
        if (r !== 'again') return;
      }
    },
  });
})();
