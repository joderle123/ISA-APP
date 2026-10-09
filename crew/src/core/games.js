/* CREW – Spiele-Baukasten: Registrierung, Vorlagen T1–T6, Vergleichskarte, Sticker-Wand, Finder, QR-Links.
   Jedes neue Spiel liegt in src/games/<thema>/<id>.js und ruft CREW.registerGame({...}) auf.
   Die Vorlagen sind Bausteine (ctx.T.*), die ein Spiel frei kombiniert. Alles kann im Auto-Modus
   (ctx.auto) ohne Finger durchlaufen – so prüft tests/games.mjs jedes Spiel bis zum Ende.

   Querschnitt-Regeln (aus der Kritik), die hier eingebaut sind:
   - ein Satz Regel + 10-Sekunden-Probe-Runde vor Runde 1 (T.intro)
   - Vorlese-Knopf auf jeder Figuren-/Textkarte (readBtn, figureCard, say)
   - sichtbarer Pass/X auf jedem Bildschirm (ctx.scr setzt die Kopfzeile mit Pass; X-Karte oben bleibt)
   - kein Timer unter 20 s außer Bewegung (ctx.timer)
   - Spiele reden über Figuren (CREW.games.figures), teilen ist freiwillig (Pass auf der Vergleichskarte)
   - Hilfenummern am Ende von Mobbing-/Druck-/Familien-/Online-Spielen (T.end mit help:true) */
(function () {
  'use strict';
  const CREW = (window.CREW = window.CREW || {});
  const { h, clear } = CREW.util;
  const ui = () => CREW.ui;
  const S = () => CREW.state;

  /* =========================================================
     Registrierung
     ========================================================= */
  const GAMES = [];
  const BY_ID = {};
  const THEME_ICON = { ankommen: 'users', ich: 'star', gefuehle: 'heart', skills: 'leaf', gedanken: 'sparkle', kommunikation: 'chat', konflikt: 'shield', digital: 'phone' };
  const TEMPLATE_OF_FORMAT = { solo: 'T0', 'solo-austausch': 'T1', rollen: 'T2', 'zu-zweit': 'T3', bewegung: 'T4', weitergeben: 'T5', beamer: 'T6' };
  const TEMPLATE_NAME = { T0: 'Solo', T1: 'Solo + Austausch', T2: 'Rollen-Puzzle', T3: 'Zu zweit an einem iPad', T4: 'Bewegung im Raum', T5: 'Gerät weitergeben', T6: 'Beamer-Gruppe' };

  /* CREW.registerGame({ id, name, theme, format, minutes, eldib, themen, units, abschluss, template, run(ctx), ... })
     Fehlende Angaben kommen aus dem Katalog (CREW.katalog.spiele[id]). */
  function registerGame(def) {
    if (!def || !def.id || typeof def.run !== 'function') throw new Error('registerGame: id und run(ctx) fehlen');
    const kat = CREW.katalog && CREW.katalog.spiele ? CREW.katalog.spiele[def.id] : null;
    const g = Object.assign({
      name: kat ? kat.name : def.id,
      theme: kat ? kat.thema : 'ankommen',
      format: kat ? kat.format : 'beamer',
      minutes: kat ? Number((kat.dauer || '5').match(/\d+/)[0]) : 5,
      eldib: kat ? kat.eldib.slice() : [],
      themen: [],
      units: kat ? kat.einheiten.slice() : [],
      abschluss: kat ? kat.abschluss : false,
      tagline: kat ? kat.text.split(/[.!?]\s/)[0].slice(0, 90) : '',
      teacherNote: kat ? kat.text : '',
      foerdert: kat ? kat.foerdert : '',
      top: kat ? kat.top : false,
      help: false,            // Hilfenummern am Ende zeigen (Mobbing, Druck, Familie, Online)
      safety: [],             // z. B. ['familie', 'kein-koerperkontakt', 'niemand-allein']
    }, def);
    g.template = g.template || TEMPLATE_OF_FORMAT[g.format] || 'T6';
    g.icon = g.icon || THEME_ICON[g.theme] || 'star';
    if (BY_ID[g.id]) { const i = GAMES.indexOf(BY_ID[g.id]); if (i >= 0) GAMES.splice(i, 1); }
    BY_ID[g.id] = g;
    GAMES.push(g);
    return g;
  }
  const get = (id) => BY_ID[id] || null;
  // Reihenfolge wie im Katalog (Thema, dann Katalog-Reihenfolge), Unbekanntes hinten
  function list() {
    const order = {};
    if (CREW.katalog) CREW.katalog.themen.forEach((t, ti) => t.spiele.forEach((id, i) => { order[id] = ti * 100 + i; }));
    return GAMES.slice().sort((a, b) => (order[a.id] == null ? 9999 : order[a.id]) - (order[b.id] == null ? 9999 : order[b.id]));
  }

  /* =========================================================
     Figuren: Mika, Yara, Luca, Sam – nie echte Jugendliche
     ========================================================= */
  const FIGURES = {
    mika: { id: 'mika', name: 'Mika', colour: '#3da5ff', hair: '#2b1d14', skin: '#e0ac7e', style: 'kurz' },
    yara: { id: 'yara', name: 'Yara', colour: '#ff4fa3', hair: '#140f1a', skin: '#b87b4f', style: 'lang' },
    luca: { id: 'luca', name: 'Luca', colour: '#2ee6c5', hair: '#6b3b1f', skin: '#f1c9a5', style: 'locken' },
    sam: { id: 'sam', name: 'Sam', colour: '#ffc93c', hair: '#1d1a24', skin: '#8d5a3a', style: 'cap' },
  };
  const MOODS = ['froh', 'neutral', 'genervt', 'traurig', 'angst', 'wut', 'ueberrascht'];
  // Kleines Porträt (SVG). mood: froh | neutral | genervt | traurig | angst | wut | ueberrascht
  function avatar(fig, mood, size) {
    const f = typeof fig === 'string' ? FIGURES[fig] || FIGURES.mika : fig;
    const m = MOODS.includes(mood) ? mood : 'neutral';
    const s = size || 96;
    const INK = '#0e0a26';
    const st = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
    let hair = '';
    if (f.style === 'lang') hair = `<path d="M22 60 C18 24 40 14 60 15 C82 16 96 32 92 62 L94 104 C70 112 36 112 24 104 Z" fill="${f.hair}" ${st}/>`;
    else if (f.style === 'locken') hair = `<circle cx="34" cy="38" r="12" fill="${f.hair}" ${st}/><circle cx="52" cy="24" r="13" fill="${f.hair}" ${st}/><circle cx="74" cy="26" r="13" fill="${f.hair}" ${st}/><circle cx="88" cy="42" r="12" fill="${f.hair}" ${st}/>`;
    else if (f.style === 'cap') hair = `<path d="M26 50 C26 24 46 14 62 15 C80 16 96 28 96 50 Z" fill="${f.colour}" ${st}/><path d="M90 46 C104 46 114 50 118 56 C106 60 94 58 86 56 Z" fill="${f.colour}" ${st}/>`;
    else hair = `<path d="M26 58 C22 26 44 14 62 16 C84 18 98 34 94 58 C84 44 70 40 58 42 C44 44 34 50 26 58 Z" fill="${f.hair}" ${st}/>`;
    const face = `<path d="M30 56 C30 34 44 26 60 26 C78 26 92 36 92 58 C92 82 80 96 61 96 C42 96 30 82 30 56 Z" fill="${f.skin}" ${st}/>`;
    const body = `<path d="M18 128 C20 106 36 98 60 98 C86 98 100 106 104 128 Z" fill="${f.colour}" ${st}/>`;
    const eyes = m === 'froh' ? `<path d="M44 62 Q50 55 56 62 M66 62 Q72 55 78 62" fill="none" ${st}/>`
      : m === 'ueberrascht' || m === 'angst' ? `<circle cx="50" cy="62" r="5" fill="${INK}"/><circle cx="72" cy="62" r="5" fill="${INK}"/>`
      : `<ellipse cx="50" cy="63" rx="3.6" ry="4" fill="${INK}"/><ellipse cx="72" cy="63" rx="3.6" ry="4" fill="${INK}"/>`;
    const brows = { froh: 'M42 50 Q50 45 57 49 M65 49 Q72 45 80 50', neutral: 'M42 50 Q50 47 57 49 M65 49 Q72 47 80 50', genervt: 'M43 52 L57 52 M65 52 L79 51', traurig: 'M43 48 Q50 52 57 54 M65 54 Q72 52 79 48', angst: 'M43 46 Q50 50 57 52 M65 52 Q72 50 79 46', wut: 'M42 48 L57 55 M80 48 L65 55', ueberrascht: 'M42 44 Q50 39 57 43 M65 43 Q72 39 80 44' }[m];
    const mouth = { froh: 'M48 78 Q61 90 74 78', neutral: 'M50 80 L72 80', genervt: 'M50 82 Q61 78 72 82', traurig: 'M48 86 Q61 76 74 86', angst: 'M52 84 Q61 80 70 84 Q61 90 52 84 Z', wut: 'M48 84 Q61 76 74 84', ueberrascht: 'M55 80 a6 7 0 1 0 12 0 a6 7 0 1 0 -12 0' }[m];
    const span = h('span', { class: 'fig-avatar', 'aria-label': f.name, title: f.name });
    span.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 122 130" aria-hidden="true">${body}${f.style === 'lang' ? hair : ''}${face}${f.style !== 'lang' ? hair : ''}${eyes}<path d="${brows}" fill="none" ${st}/><path d="${mouth}" fill="${m === 'angst' || m === 'ueberrascht' ? INK : 'none'}" ${st}/></svg>`;
    return span;
  }

  /* =========================================================
     Kleine Bausteine für alle Spiele
     ========================================================= */
  // Vorlese-Knopf, der IMMER da ist (bei ausgeschaltetem Vorlesen: Hinweis statt Stille)
  function readBtn(text, opts) {
    const o = opts || {};
    return ui().iconBtn('speaker', () => {
      const t = typeof text === 'function' ? text() : text;
      if (!CREW.canSpeak()) { ui().toast('Vorlesen geht auf diesem Gerät nicht.'); return; }
      if (!S().settings.speech) { ui().toast('Vorlesen ist aus. Oben auf den Lautsprecher tippen.'); return; }
      CREW.speak(t);
    }, { label: 'Vorlesen', cls: 'read-btn ' + (o.cls || '') });
  }
  // Textkarte mit Vorlese-Knopf (wie ui.say, aber der Knopf fehlt nie)
  function say(text, opts) {
    const o = opts || {};
    return h('div', { class: 'bigcard enter' + (o.cls ? ' ' + o.cls : '') },
      h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, o.eyebrow || ''), readBtn(o.speakText || text)),
      h('div', { class: 'say' + (o.small ? ' small-say' : '') }, text),
      o.extra || null);
  }
  // Figuren-Karte: Porträt, Name, Text, Vorlesen. {fig, mood, text, eyebrow, extra, chat}
  function figureCard(o) {
    const f = typeof o.fig === 'string' ? FIGURES[o.fig] || FIGURES.mika : o.fig;
    const speak = (f.name + ': ' + (o.speakText || o.text || '')).trim();
    return h('div', { class: 'fig-card enter' + (o.cls ? ' ' + o.cls : ''), style: { '--fc': f.colour } },
      h('div', { class: 'fig-side' }, avatar(f, o.mood, o.size || 96), h('b', { class: 'fig-name' }, f.name)),
      h('div', { class: 'fig-body' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, o.eyebrow || ''), readBtn(speak)),
        o.text ? h('div', { class: o.chat ? 'fig-chat' : 'fig-text' }, o.text) : null,
        o.extra || null));
  }
  // Chat-Blase im Handy-Look (für Chat-Szenen)
  function bubble(text, o) {
    const oo = o || {};
    return h('div', { class: 'bubble' + (oo.me ? ' me' : '') + (oo.cls ? ' ' + oo.cls : '') }, oo.who ? h('span', { class: 'bubble-who' }, oo.who) : null, h('span', null, text));
  }
  // Hilfenummern (Ende von Mobbing-, Druck-, Familien- und Online-Spielen)
  function helpCard(opts) {
    const o = opts || {};
    const nums = [['Kanner- a Jugendtelefon', '116 111'], ['BEE SECURE Helpline', '8002 1234'], ['In der Schule', 'eine erwachsene Person, der du vertraust']];
    return h('div', { class: 'card stack help-card' },
      h('div', { class: 'row between' }, h('b', null, o.title || 'Wenn dich so etwas selbst betrifft'), CREW.icon('heart', 24)),
      h('p', { class: 'muted small' }, o.text || 'Du musst das nicht allein lösen. Reden hilft. Anonym und kostenlos:'),
      h('div', { class: 'help-nums' }, nums.map(([n, t]) => h('div', { class: 'help-num' }, h('span', null, n), h('b', { class: 'display' }, t)))));
  }
  // Sicherheits-Hinweis als kleine Zeile (familie | koerper | raum | freiwillig)
  const SAFETY_TEXT = {
    familie: 'Familien-Themen nur, wenn du magst. Wer reden will: Hilfe oben rechts.',
    koerper: 'Kein Körperkontakt. Abstand ist okay.',
    raum: 'Niemand geht allein aus dem Raum.',
    freiwillig: 'Teilen ist freiwillig. Pass ist okay.',
    figuren: 'Es geht um die Figuren, nie um dich.',
  };
  function safetyLine(key) {
    return h('p', { class: 'safety-line' }, CREW.icon('shield', 18), h('span', null, SAFETY_TEXT[key] || key));
  }

  /* =========================================================
     Verstehen, was läuft: „Darum geht's“, Level, Nachbesprechung, Hinweise für die Lehrkraft.
     Inhalte stehen in src/content/didaktik.js (CREW.didaktik.games / .missions / .solo).
     ========================================================= */
  function didaktik(kind, id) { const D = CREW.didaktik || {}; return (D[kind] && D[kind][id]) || null; }
  const dGame = (id) => didaktik('games', id);
  // Skill (Jugendsprache) + passende Skill-Karte aus dem Skills-Kurs
  function skillRow(e) {
    if (!e || (!e.skill && !e.karte)) return null;
    return h('div', { class: 'skill-row' },
      e.skill ? h('span', { class: 'skill-chip' }, CREW.icon('bolt', 16), h('span', null, h('b', null, 'Skill: '), e.skill)) : null,
      e.karte ? h('span', { class: 'skill-chip karte' }, CREW.icon('star', 16), h('span', null, 'Skill-Karte „' + e.karte + '“')) : null);
  }
  // „Darum geht's“: 1–2 Sätze für die Jugendlichen – worum es geht und wozu es im echten Leben hilft
  function warumCard(e, o) {
    const oo = o || {};
    if (!e || !e.warum) return null;
    const speak = 'Darum geht’s. ' + e.warum + (e.skill ? ' Skill: ' + e.skill + '.' : '');
    return h('div', { class: 'warum-card' + (oo.compact ? ' compact' : '') + (oo.cls ? ' ' + oo.cls : ''), 'data-warum': '1' },
      h('span', { class: 'warum-ic', 'aria-hidden': 'true' }, CREW.icon('target', oo.compact ? 26 : 34)),
      h('div', { class: 'warum-body' },
        h('div', { class: 'row between', style: { gap: '8px', flexWrap: 'nowrap' } }, h('span', { class: 'eyebrow' }, 'Darum geht’s'), readBtn(speak)),
        h('p', { class: 'warum-text' }, e.warum),
        oo.noSkill ? null : skillRow(e)));
  }
  // Level-Leiste: erst erkennen, dann begründen, dann anwenden (Spiele können eigene Namen geben)
  const LEVEL_NAMES = ['Erkennen', 'Begründen', 'Anwenden'];
  function stufenLeiste(n, names) {
    const ns = names || LEVEL_NAMES;
    return h('div', { class: 'stufen', role: 'img', 'aria-label': n ? 'Level ' + n + ' von ' + ns.length + ': ' + ns[n - 1] : 'Drei Level: ' + ns.join(', ') },
      ns.map((nm, i) => h('span', { class: 'stufe' + (i + 1 < n ? ' done' : i + 1 === n ? ' now' : '') }, h('b', null, String(i + 1)), h('span', null, nm))));
  }
  const stufePill = (n, names) => h('span', { class: 'pill stufe-pill', 'data-level': String(n) }, CREW.icon('steps', 16), 'Level ' + n + ' · ' + (names || LEVEL_NAMES)[n - 1]);
  // Kurz-Fazit für Solo-Spiele (am eigenen Endbild): „Das hast du geübt“ + zwei Fragen nur für den Kopf
  function soloNach(e) {
    if (!e) return null;
    const qs = (e.fragen || []).slice(0, 2);
    return h('div', { class: 'card stack solo-nach' },
      h('div', { class: 'row between', style: { gap: '8px', flexWrap: 'nowrap' } }, h('span', { class: 'eyebrow' }, 'Das hast du geübt'), readBtn('Das hast du geübt: ' + e.geuebt + ' ' + qs.join(' '))),
      h('b', null, e.geuebt),
      qs.length ? h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'muted small' }, 'Denk kurz nach – nur im Kopf:'), qs.map((q) => h('span', { class: 'solo-nach-q' }, CREW.icon('bulb', 18), h('span', null, q)))) : null,
      skillRow(e));
  }
  // Lehrer-Hinweise (nur im Lehrermodus): Ziel, worauf achten, Gesprächsimpulse, wenn es kippt
  function lehrerBody(e, o) {
    const oo = o || {};
    const L = e.lehrer || {};
    const sec = (title, ...kids) => h('div', { class: 'lh-sec' }, h('span', { class: 'eyebrow' }, title), kids);
    return h('div', { class: 'stack lehrer-hinweise' },
      L.ziel ? sec('Ziel', h('p', null, L.ziel)) : null,
      sec('Darum geht’s (so steht es für die Jugendlichen da)', h('p', { class: 'muted' }, e.warum), skillRow(e)),
      oo.kurs ? sec('Skills-Kurs Jahr 1', h('p', { class: 'small' }, oo.kurs)) : null,
      L.stufen ? sec('Aufbau in Stufen', h('p', null, L.stufen)) : null,
      L.achten ? sec('Worauf achten', h('p', null, L.achten)) : null,
      L.impulse && L.impulse.length ? sec('Gesprächsimpulse', h('ul', { class: 'lh-list' }, L.impulse.map((x) => h('li', null, x)))) : null,
      L.kippt ? sec('Wenn es kippt', h('p', null, L.kippt)) : null,
      sec('Nachbesprechung', h('p', null, h('b', null, 'Geübt: '), e.geuebt), h('ol', { class: 'lh-list' }, (e.fragen || []).map((q) => h('li', null, q)))));
  }
  function showHinweise(kind, id, title) {
    const e = didaktik(kind, id);
    if (!e) { ui().toast('Für dieses Spiel gibt es noch keine Hinweise.'); return Promise.resolve(null); }
    let kurs = '';
    if (kind === 'games' && CREW.katalog) {
      const units = CREW.katalog.unitsOf ? CREW.katalog.unitsOf(id) : [];
      kurs = units.map((u) => u.id + ' ' + u.titel).join(' · ');
    }
    if (e.einheit) kurs = (kurs ? kurs + ' · ' : '') + e.einheit;
    return ui().modal({ title: 'Hinweise: ' + title, body: lehrerBody(e, { kurs }), actions: [{ label: 'Schließen', value: true, icon: 'check' }] });
  }
  // Paar-Farbe als Chip
  function colourChip(c, big) {
    return h('span', { class: 'colour-chip' + (big ? ' big' : ''), style: { background: c.css, color: c.ink } }, c.name);
  }
  // Hitze-/Pegel-Meter 0–100 (Clash-Stil, für T5 und Konflikt-Spiele)
  function meter(o) {
    const oo = o || {};
    let v = oo.value != null ? oo.value : 30;
    const fill = h('i', { style: { width: v + '%' } });
    const num = h('b', { class: 'meter-num' }, String(v));
    const el = h('div', { class: 'meter', role: 'meter', 'aria-valuemin': '0', 'aria-valuemax': '100' },
      h('span', { class: 'meter-label' }, oo.label || 'Hitze'),
      h('div', { class: 'meter-bar' }, fill), num);
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); fill.style.width = v + '%'; num.textContent = String(v); el.dataset.level = v >= 70 ? 'hot' : v >= 40 ? 'warm' : 'cool'; };
    set(v);
    return { el, set, get: () => v };
  }

  /* =========================================================
     Sticker-Wand (gemeinsame Belohnung aller neuen Spiele)
     ========================================================= */
  function stickers() {
    const st = S();
    if (!st.stickers || typeof st.stickers !== 'object') { st.stickers = {}; }
    return st.stickers;
  }
  function award(gameId) {
    const g = get(gameId);
    const all = stickers();
    const cur = all[gameId] || { n: 0, first: CREW.util.todayISO(), last: null };
    cur.n += 1; cur.last = CREW.util.todayISO();
    all[gameId] = cur;
    CREW.save();
    return { id: gameId, name: g ? g.name : gameId, theme: g ? g.theme : 'ankommen', icon: g ? g.icon : 'star', n: cur.n, isNew: cur.n === 1 };
  }
  function stickerEl(info, o) {
    const oo = o || {};
    return h('div', { class: 'sticker' + (oo.big ? ' big' : '') + (oo.cls ? ' ' + oo.cls : ''), 'data-theme': info.theme, title: info.name },
      h('span', { class: 'sticker-ic' }, CREW.icon(info.icon || 'star', oo.big ? 44 : 26)),
      h('span', { class: 'sticker-name' }, info.name),
      info.n > 1 ? h('span', { class: 'sticker-n' }, '×' + info.n) : null);
  }
  // Wand fürs Crew-HQ
  function renderWall() {
    const all = stickers();
    const ids = Object.keys(all);
    const total = CREW.katalog ? Object.keys(CREW.katalog.spiele).length : 62;
    const items = ids.map((id) => { const g = get(id); const k = CREW.katalog && CREW.katalog.spiele[id]; return { id, name: g ? g.name : k ? k.name : id, theme: g ? g.theme : k ? k.thema : 'ankommen', icon: g ? g.icon : THEME_ICON[k ? k.thema : ''] || 'star', n: all[id].n }; });
    return h('div', { class: 'card stack sticker-wall', id: 'sticker-wall' },
      h('div', { class: 'row between' }, h('b', null, 'Sticker-Wand'), h('span', { class: 'muted small' }, ids.length + ' von ' + total + ' Spielen')),
      ids.length
        ? h('div', { class: 'sticker-grid' }, items.map((it) => stickerEl(it)))
        : h('p', { class: 'muted small' }, 'Noch leer. Jedes gespielte Spiel aus „Spiele“ klebt hier einen Sticker hin.'));
  }

  /* =========================================================
     Deep-Links & QR
     ========================================================= */
  const DEFAULT_BASE = 'https://joderle123.github.io/ISA-APP/crew/dist/index.html';
  const baseUrl = () => (S().settings && S().settings.baseUrl) || DEFAULT_BASE;
  // index.html?spiel=<id>&rolle=<A-D|X>&code=<tagescode>&platz=<1-8>  (keine personenbezogenen Daten)
  function linkParams(search) {
    const q = new URLSearchParams(search != null ? search : window.location.search);
    const out = { spiel: q.get('spiel') || '', rolle: (q.get('rolle') || '').toUpperCase(), code: q.get('code') || '', platz: q.get('platz') || '' };
    if (!/^[a-z0-9-]{1,40}$/.test(out.spiel)) out.spiel = '';
    if (!/^[A-DX]$/.test(out.rolle)) out.rolle = '';
    if (!CREW.seed.valid(out.code)) out.code = '';
    out.platz = /^[1-8]$/.test(out.platz) ? Number(out.platz) : 0;
    return out;
  }
  function linkFor(gameId, o) {
    const oo = o || {};
    const p = new URLSearchParams();
    p.set('spiel', gameId);
    p.set('code', oo.code || CREW.seed.getCode());
    if (oo.rolle) p.set('rolle', oo.rolle);
    if (oo.platz) p.set('platz', String(oo.platz));
    return baseUrl() + '?' + p.toString();
  }
  function qrPanel(gameId, o) {
    const oo = o || {};
    const g = get(gameId) || (CREW.katalog && CREW.katalog.spiele[gameId]) || { id: gameId, name: gameId };
    const tpl = g.template || TEMPLATE_OF_FORMAT[g.format] || 'T6';
    const roles = tpl === 'T2' ? ['A', 'B', 'C', 'D'] : [''];
    const code = CREW.seed.getCode();
    const items = roles.map((r) => {
      const url = linkFor(gameId, { rolle: r, code });
      const box = h('div', { class: 'qr-box' });
      box.innerHTML = CREW.qr.svg(url, { size: oo.size || (roles.length > 1 ? 150 : 220) });
      return h('div', { class: 'qr-item', 'data-rolle': r || 'alle' }, box, h('b', null, r ? 'Rolle ' + r : 'Scannen & spielen'));
    });
    return h('div', { class: 'stack qr-panel' },
      h('div', { class: 'row between' },
        h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'QR-Codes zum Scannen'), h('b', null, g.name)),
        h('span', { class: 'pill accent' }, 'Tagescode ' + code)),
      h('p', { class: 'muted small' }, 'Kamera-App öffnen, Code scannen. Das iPad startet direkt im Spiel' + (roles.length > 1 ? ' mit dieser Rolle' : '') + '. Kein Login, keine Namen.'),
      h('div', { class: 'qr-grid' }, items),
      h('p', { class: 'muted small selectable qr-url' }, linkFor(gameId, { code })));
  }
  function showQR(gameId) {
    return ui().modal({ title: 'Auf eigenem iPad spielen', body: qrPanel(gameId), actions: [{ label: 'Schließen', value: true }] });
  }

  /* =========================================================
     Spiel starten: Kontext erweitern, Auto-Modus
     ========================================================= */
  let running = null;      // { id, startedAt }
  let done = null;         // letztes Ergebnis { id, ok, error, result }
  let codeConfirmed = false; // Tagescode in dieser Sitzung schon bestätigt?

  function extendCtx(ctx, game, opts) {
    const o = opts || {};
    const auto = !!(o.auto || window.__crewAuto);
    const code = o.code || CREW.seed.getCode();
    const seat = o.platz || CREW.seed.getSeat();
    const n = o.n || CREW.seed.crewSize();
    const rng = CREW.seed.rng(code, game.id, o.salt || '');
    const autoRng = CREW.seed.rng('auto', game.id, o.autoSeed || Date.now());
    ctx.game = game;
    ctx.opts = o;
    ctx.auto = auto;
    ctx.code = code; ctx.seat = seat; ctx.n = n;
    ctx.role = o.rolle || null; // feste Rolle per Deep-Link, sonst aus dem Tagescode (T.roleSetup)
    ctx.pair = CREW.seed.pairOf(code, n, seat);
    ctx.rng = rng;
    ctx.rpick = (arr) => CREW.seed.pick(arr, rng);
    ctx.rshuffle = (arr) => CREW.seed.shuffle(arr, rng);
    ctx.autoRng = autoRng;
    ctx.fast = auto || !!window.__fast;
    ctx.T = {};
    ctx.figures = FIGURES;
    ctx.avatar = avatar;
    ctx.readBtn = readBtn;
    ctx.say = say;
    ctx.figureCard = figureCard;
    ctx.bubble = bubble;
    ctx.helpCard = helpCard;
    ctx.safetyLine = safetyLine;
    ctx.meter = meter;
    ctx.colourChip = colourChip;
    ctx.step = 0;
    // Didaktik: „Darum geht's“, Level-Pille für die Kopfzeile
    ctx.didaktik = dGame(game.id);
    ctx.stufe = (n, names) => stufePill(n, names);
    ctx.stufenLeiste = stufenLeiste;
    ctx.warumCard = (o) => warumCard(ctx.didaktik, o);

    /* Bildschirm mit Kopfzeile: Spielname · Schritt, Rolle/Farbe, Pass (immer sichtbar) */
    ctx.scr = (children, o2) => {
      const oo = o2 || {};
      const wrap = ctx.screen([], oo);
      wrap.classList.add('game-screen');
      wrap.dataset.game = game.id;
      wrap.dataset.template = game.template;
      if (oo.step != null) ctx.step = oo.step;
      const head = h('div', { class: 'game-head' },
        h('div', { class: 'stack', style: { gap: '2px' } },
          h('span', { class: 'eyebrow' }, game.name + (oo.eyebrow ? ' · ' + oo.eyebrow : '')),
          oo.title ? h('h2', null, oo.title) : null),
        h('div', { class: 'row', style: { gap: '8px' } },
          oo.badge || null,
          oo.noPass ? null : ui().btn('Pass', () => { if (CREW.app && CREW.app.xcard) CREW.app.xcard(); }, { small: true, variant: 'ghost', icon: 'x', id: 'btn-pass', aria: 'Pass: diese Karte überspringen' })));
      wrap.appendChild(head);
      CREW.util.append(wrap, [children]);
      return wrap;
    };

    /* Auf eine Wahl warten. Auto-Modus: zufällige Option (opt.auto === false wird gemieden). X/Pass → ctx.SKIP */
    ctx.ask = (wrap, options, o2) => {
      const oo = o2 || {};
      const p = ui().choice(wrap, options, oo);
      if (auto) {
        const row = wrap.lastElementChild;
        const cands = options.map((opt, i) => ({ opt, i })).filter((x) => x.opt.auto !== false);
        const pool = cands.length ? cands : options.map((opt, i) => ({ opt, i }));
        let choice = pool[Math.floor(autoRng() * pool.length)];
        if (typeof oo.autoPick === 'function') { const want = oo.autoPick(options); const f = options.findIndex((x) => (x.value !== undefined ? x.value : x.label) === want); if (f >= 0) choice = { opt: options[f], i: f }; }
        setTimeout(() => { const b = row && row.querySelectorAll('button')[choice.i]; if (b && b.isConnected && !b.disabled) b.click(); }, Math.max(oo.autoDelay || 40, window.__crewAutoDelay || 0));
      }
      return ctx.waitFor(p);
    };
    ctx.next = (wrap, label, o2) => ctx.ask(wrap, [{ label: label || 'Weiter', value: true, iconRight: 'right', variant: (o2 && o2.variant) || '', id: (o2 && o2.id) || 'btn-next' }], o2);
    // Kurz warten (Auto-Modus: fast sofort)
    ctx.hold = (ms) => ctx.sleep(auto ? Math.min(ms, 30) : ms);
    /* Timer-Ring. Kein Timer unter 20 s außer Bewegung ({movement:true}). Auto: läuft sofort ab. */
    ctx.timer = (seconds, o2) => {
      const oo = o2 || {};
      let sec = Math.max(oo.movement ? 5 : 20, Math.round(seconds || 20));
      if (auto) sec = 1;
      const t = ui().timer(sec, { autostart: oo.autostart !== false, onDone: oo.onDone });
      ctx.onCleanup(() => t.stop());
      if (auto && oo.onDone) setTimeout(() => { if (t.left() > 0) { t.stop(); oo.onDone(); } }, 60);
      return t;
    };
    // Warten bis Timer fertig ODER Knopf (z. B. „Stopp!“) gedrückt. Liefert 'timer' | Knopf-Wert | SKIP
    ctx.timerOrButton = (wrap, seconds, options, o2) => {
      let resolveDone;
      const doneP = new Promise((r) => { resolveDone = r; });
      const t = ctx.timer(seconds, Object.assign({}, o2, { onDone: () => resolveDone('timer') }));
      const slot = (o2 && o2.slot) || wrap;
      slot.appendChild(t.el);
      const ask = ctx.ask(wrap, options, o2);
      return Promise.race([doneP, ask]).then((v) => { t.stop(); return v; });
    };
    buildTemplates(ctx);
    return ctx;
  }

  /* =========================================================
     Vorlagen T1–T6 als Bausteine (ctx.T.*)
     ========================================================= */
  function buildTemplates(ctx) {
    const T = ctx.T;
    const U = () => ui();

    /* ----- Für alle: Regel-Satz + Probe-Runde ----- */
    // T.intro({ rule, probe: async (ctx) => {}, steps: [{icon,title,text}], safety: ['figuren'] })
    T.intro = async (o) => {
      const oo = o || {};
      const g = ctx.game;
      const fmt = CREW.katalog ? (CREW.katalog.formate.find((f) => f.id === g.format) || {}) : {};
      const wrap = ctx.scr([
        h('div', { class: 'stack', style: { gap: '6px' } },
          h('h1', { class: 'outline-text' }, g.name),
          h('div', { class: 'row' }, h('span', { class: 'pill accent' }, fmt.name || TEMPLATE_NAME[g.template]), h('span', { class: 'pill' }, 'ca. ' + g.minutes + ' Min'), g.top ? h('span', { class: 'pill' }, CREW.icon('star', 16), 'Top') : null)),
        // Erst: Worum geht's und wozu ist das gut? Dann die Regel. (Breit: nebeneinander, iPad hoch: untereinander)
        h('div', { class: 'intro-grid' + (ctx.didaktik ? '' : ' one') },
          warumCard(ctx.didaktik),
          say(oo.rule || g.tagline || 'Los geht’s.', { eyebrow: 'So geht’s', cls: 'rule-card' })),
        oo.levels ? h('div', { class: 'row', style: { gap: '10px' } }, h('span', { class: 'muted small' }, 'So steigt es an:'), stufenLeiste(0, oo.levels === true ? null : oo.levels)) : null,
        oo.steps ? U().steps(oo.steps, { row: oo.steps.length <= 3 }) : null,
        h('div', { class: 'row' }, (oo.safety || g.safety || []).map((k) => safetyLine(k)), g.help ? safetyLine('freiwillig') : null),
      ], { eyebrow: 'Start', step: 0 });
      const opts = [];
      if (oo.probe) opts.push({ label: 'Probe-Runde (10 Sek.)', value: 'probe', variant: 'ghost', icon: 'play', id: 'btn-probe' });
      opts.push({ label: oo.probe ? 'Direkt los' : 'Los geht’s', value: 'go', iconRight: 'right', id: 'btn-go' });
      // Auto-Modus: Startbild kurz stehen lassen (Tests prüfen hier Pass, X, Vorlesen)
      const r = await ctx.ask(wrap, opts, { autoDelay: ctx.opts.autoEndWait || 40 });
      if (r === 'probe') {
        await oo.probe(ctx);
        const w2 = ctx.scr([say('Das war die Probe. Zählt nicht. Jetzt geht’s richtig los.', { eyebrow: 'Probe vorbei' })], { eyebrow: 'Start', center: true });
        await ctx.next(w2, 'Los geht’s');
      }
      return r;
    };
    // Einfache Probe-Karte: dieselbe Mechanik, klar als Probe markiert
    T.probeCard = (text, options) => async () => {
      const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), say(text, { eyebrow: 'Zum Ausprobieren' })], { eyebrow: 'Probe' });
      await ctx.ask(w, options || [{ label: 'Option 1', value: 1, variant: 'ghost' }, { label: 'Option 2', value: 2, variant: 'ghost' }]);
    };

    /* ----- Level-Wechsel: erst erkennen, dann begründen, dann anwenden ----- */
    // T.level({ n, names, text, eyebrow, label }) → kurzer Zwischen-Bildschirm, der sagt, was jetzt schwerer wird
    T.level = async (o) => {
      const oo = o || {};
      const n = oo.n || 1;
      const names = oo.names || LEVEL_NAMES;
      const wrap = ctx.scr([
        h('div', { class: 'level-screen' },
          stufenLeiste(n, names),
          h('h1', { class: 'outline-text' }, 'Level ' + n + ': ' + names[n - 1]),
          oo.text ? say(oo.text, { eyebrow: oo.eyebrow || (n > 1 ? 'Jetzt wird’s kniffliger' : 'Zum Start'), small: true, cls: 'level-say' }) : null),
      ], { eyebrow: 'Level ' + n, center: true });
      CREW.sound.play('unlock');
      return ctx.next(wrap, oo.label || 'Los', { id: 'btn-level' });
    };

    /* ----- Nachbesprechung (für alle Spiele gleich): Das habt ihr geübt + 3 Fragen, Passen ist okay ----- */
    T.nachbesprechung = async (o) => {
      const oo = o || {};
      const e = oo.entry || ctx.didaktik;
      if (!e) return null;
      const solo = ctx.game.template === 'T0' || !!e.solo;
      const ICONS = ['eye', 'mountain', 'calendar'];
      const TAGS = ['Gemerkt', 'Schwer', 'Diese Woche'];
      const qs = (oo.fragen || e.fragen || []).slice(0, 3);
      const tm = U().timer(90, { autostart: false });
      ctx.onCleanup(() => tm.stop());
      const geuebtLabel = solo ? 'Das hast du heute geübt' : 'Das habt ihr heute geübt';
      const wrap = ctx.scr([
        h('div', { class: 'nach-geuebt enter' },
          h('span', { class: 'nach-geuebt-ic', 'aria-hidden': 'true' }, CREW.icon('check', 30)),
          h('div', { class: 'stack', style: { gap: '4px', flex: '1' } }, h('span', { class: 'eyebrow' }, geuebtLabel), h('b', { class: 'nach-geuebt-t' }, e.geuebt), skillRow(e)),
          readBtn(geuebtLabel + ': ' + e.geuebt)),
        h('div', { class: 'nach-qs' }, qs.map((q, i) => h('div', { class: 'nach-q enter-' + Math.min(3, i + 1) },
          h('span', { class: 'nach-q-ic', 'aria-hidden': 'true' }, CREW.icon(ICONS[i] || 'chat', 24)),
          h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } }, h('span', { class: 'nach-q-tag' }, TAGS[i] || 'Frage'), h('span', { class: 'nach-q-t' }, q)),
          readBtn(q)))),
        h('div', { class: 'row between' },
          safetyLine(solo ? 'Nur für dich, im Kopf. Nichts wird gespeichert.' : 'Wer will, sagt was. Passen ist okay. Es geht um die Figuren.'),
          solo ? null : h('div', { class: 'row', style: { gap: '8px' } }, tm.el, U().btn('Timer', () => tm.start(), { variant: 'ghost', small: true, icon: 'timer', id: 'btn-nach-timer' }))),
      ], { eyebrow: 'Nachbesprechung', title: solo ? 'Kurz für dich' : 'Kurz drüber reden' });
      wrap.classList.add('nach-screen');
      return ctx.ask(wrap, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'nach-pass' }, { label: solo ? 'Fertig' : 'Fertig geredet', value: 'done', iconRight: 'right', id: 'nach-done' }]);
    };

    /* ----- Tagescode & Platz prüfen (T1/T2: alle iPads müssen dasselbe sehen) ----- */
    T.codeCheck = async () => {
      if (ctx.auto || ctx.opts.code || codeConfirmed) return ctx.code;
      let code = ctx.code;
      let seat = ctx.seat;
      const codeEl = h('div', { class: 'display daycode', id: 'daycode-now' }, code);
      const seatSt = U().stepper({ value: seat, min: 1, max: 8, onChange: (v) => { seat = v; } });
      const padWrap = h('div', { class: 'stack', style: { display: 'none' } });
      let typed = '';
      const dots = h('div', { class: 'display', style: { fontSize: '2em', letterSpacing: '.3em', minHeight: '1.2em' } }, '');
      const pad = h('div', { class: 'valuepad', style: { maxWidth: '360px', gridTemplateColumns: 'repeat(3, 1fr)' } });
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0'].forEach((d) => pad.appendChild(U().btn(d === 'del' ? null : d, () => {
        if (d === 'del') typed = typed.slice(0, -1); else if (typed.length < 4) typed += d;
        dots.textContent = '•'.repeat(typed.length);
        if (typed.length === 4) { code = typed; codeEl.textContent = code; padWrap.style.display = 'none'; typed = ''; dots.textContent = ''; U().toast('Tagescode gesetzt: ' + code); }
      }, { variant: 'ghost', icon: d === 'del' ? 'left' : null, aria: d === 'del' ? 'Löschen' : d })));
      padWrap.append(h('p', { class: 'muted small' }, 'Code vom Beamer eintippen:'), dots, pad);
      const wrap = ctx.scr([
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack', style: { alignItems: 'center', textAlign: 'center' } },
            h('span', { class: 'eyebrow' }, 'Tagescode'), codeEl,
            h('p', { class: 'muted small' }, 'Steht am Beamer derselbe Code? Dann einfach weiter.'),
            U().btn('Anderen Code eintippen', () => { padWrap.style.display = padWrap.style.display === 'none' ? '' : 'none'; }, { small: true, variant: 'ghost', icon: 'lock', id: 'btn-othercode' }),
            padWrap),
          h('div', { class: 'card stack', style: { alignItems: 'center', textAlign: 'center' } },
            h('span', { class: 'eyebrow' }, 'Dein Platz'), seatSt.el,
            h('p', { class: 'muted small' }, 'Die Nummer klebt am iPad. Sie bestimmt Farbe und Rolle, nicht dich.'))),
      ], { eyebrow: 'Vorbereitung', title: 'Alle sehen dasselbe' });
      const r = await ctx.next(wrap, 'Passt, weiter');
      if (r !== ctx.SKIP) {
        CREW.seed.setCode(code); CREW.seed.setSeat(seat);
        ctx.code = code; ctx.seat = seat;
        ctx.rng = CREW.seed.rng(code, ctx.game.id, ctx.opts.salt || '');
        ctx.rpick = (arr) => CREW.seed.pick(arr, ctx.rng);
        ctx.rshuffle = (arr) => CREW.seed.shuffle(arr, ctx.rng);
        ctx.pair = CREW.seed.pairOf(code, ctx.n, seat);
        codeConfirmed = true;
      }
      return ctx.code;
    };

    /* ----- T1: Solo + Austausch – Paar-Farbe und Vergleichskarte (EINE Komponente für alle Spiele) ----- */
    T.pairScreen = async (o) => {
      const oo = o || {};
      const c = ctx.pair.colour;
      const wrap = ctx.scr([
        h('div', { class: 'pair-screen', style: { '--pc': c.css, '--pi': c.ink } },
          colourChip(c, true),
          h('h1', { class: 'outline-text' }, c.name + ' findet ' + c.name),
          h('p', { class: 'lead' }, oo.text || 'Steh auf und such die Person mit derselben Farbe. Setzt euch zusammen.'),
          ctx.pair.trio ? h('span', { class: 'pill' }, 'Ihr seid heute zu dritt.') : null),
      ], { eyebrow: 'Austausch', center: true, badge: oo.badge || null });
      return ctx.next(wrap, 'Wir sitzen zusammen');
    };
    // T.vergleich({ title, items: [{ label, icon?, text?, el? }], questions: [q1, q2], note })
    T.vergleich = async (o) => {
      const oo = o || {};
      const c = ctx.pair.colour;
      const qs = oo.questions && oo.questions.length ? oo.questions : ['Wie hast du dich entschieden?', 'Warum?'];
      const items = (oo.items || []).map((it) => h('div', { class: 'vk-item' },
        it.el || (it.icon ? h('span', { class: 'vk-ic' }, CREW.icon(it.icon, 28)) : null),
        h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, it.label), it.text ? h('span', { class: 'muted small' }, it.text) : null)));
      const wrap = ctx.scr([
        h('div', { class: 'vk', style: { '--pc': c.css, '--pi': c.ink } },
          h('div', { class: 'vk-head' }, colourChip(c), h('b', null, oo.title || 'Vergleichskarte'), h('span', { class: 'muted small' }, 'zu zweit · nur ihr zwei')),
          h('div', { class: 'vk-grid' },
            h('div', { class: 'vk-col' }, h('span', { class: 'eyebrow' }, 'Deine Wahl'), items.length ? items : h('p', { class: 'muted' }, 'Du hast gepasst. Auch gut.')),
            h('div', { class: 'vk-col' }, h('span', { class: 'eyebrow' }, 'Redet darüber'),
              qs.map((q, i) => h('div', { class: 'vk-q' }, h('span', { class: 'vk-qn' }, String(i + 1)), h('span', { class: 'vk-qt' }, q), readBtn(q))),
              h('p', { class: 'muted small' }, oo.note || 'Anders ist nicht falsch. Teilen ist freiwillig.'))),
          h('div', { class: 'vk-foot' }, safetyLine('freiwillig'))),
      ], { eyebrow: 'Vergleichskarte', badge: oo.badge || null });
      return ctx.ask(wrap, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'vk-pass' }, { label: 'Fertig geredet', value: 'done', iconRight: 'right', id: 'vk-done' }]);
    };

    /* ----- T2: Rollen-Puzzle ----- */
    // T.roleSetup({ roles: {A:{name,desc},B:..,C:..,D:..}, observer: {name,desc} }) → 'A'…'D' | 'X'
    T.roleSetup = async (o) => {
      const oo = o || {};
      const roles = oo.roles || {};
      let role = ctx.role && (roles[ctx.role] || ctx.role === 'X') ? ctx.role : CREW.seed.roleOf(ctx.code, ctx.n, ctx.seat);
      if (!roles[role] && role !== 'X') role = 'A';
      if (role === 'X' && !oo.observer) role = 'A';
      if (ctx.auto && !ctx.role) { const keys = Object.keys(roles).concat(oo.observer ? ['X'] : []); role = keys[Math.floor(ctx.autoRng() * keys.length)]; }
      const info = () => (role === 'X' ? oo.observer : roles[role]) || { name: 'Rolle ' + role, desc: '' };
      const card = h('div', { class: 'role-card', 'data-role': role });
      const draw = () => {
        clear(card);
        card.dataset.role = role;
        card.append(
          h('span', { class: 'role-letter display' }, role === 'X' ? '👁' : role),
          h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Deine Rolle'), h('h2', null, info().name), h('p', { class: 'muted' }, info().desc || '')),
          readBtn('Deine Rolle: ' + info().name + '. ' + (info().desc || '')));
      };
      draw();
      const keys = Object.keys(roles).concat(oo.observer ? ['X'] : []);
      const chips = h('div', { class: 'row' }, keys.map((k) => { const c = h('button', { type: 'button', class: 'chip' + (k === role ? ' sel' : ''), 'data-pick-role': k }, k === 'X' ? 'Beobachter:in' : 'Rolle ' + k); c.addEventListener('click', () => { CREW.sound.play('tap'); role = k; draw(); chips.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x.dataset.pickRole === k)); }); return c; }));
      const wrap = ctx.scr([
        card,
        h('div', { class: 'card stack' }, h('b', null, 'Jedes iPad zeigt etwas anderes. Nur zusammen geht es.'), h('p', { class: 'muted small' }, 'Die Rolle kommt vom Tagescode und deinem Platz. Falls ihr anders verteilt: hier wählen.'), chips),
      ], { eyebrow: 'Rollen', badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
      await ctx.next(wrap, 'Das bin ich');
      ctx.role = role;
      return role;
    };
    // Lösung lokal prüfen: T.checkSolution({ prompt, options:[{id,label,icon}], correct:[ids], notYet, maxTries })
    T.checkSolution = async (o) => {
      const oo = o || {};
      const correct = new Set(oo.correct || []);
      let tries = 0;
      for (;;) {
        tries++;
        const wrap = ctx.scr([say(oo.prompt || 'Was ist eure gemeinsame Lösung?', { eyebrow: oo.eyebrow || 'Gemeinsam lösen' }), oo.extra ? oo.extra() : null], { eyebrow: 'Lösung' });
        const r = await ctx.ask(wrap, oo.options.map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: 'ghost' })), { autoPick: ctx.auto && tries >= 2 ? () => [...correct][0] : undefined });
        if (r === ctx.SKIP) return { ok: false, tries, skipped: true };
        if (correct.has(r)) { CREW.sound.play('great'); return { ok: true, tries, value: r }; }
        CREW.sound.play('soft');
        const w2 = ctx.scr([say(oo.notYet || 'Noch nicht. Fragt nochmal nach: Wer hat welches Puzzle-Teil?', { eyebrow: 'Noch nicht' })], { eyebrow: 'Lösung', center: true });
        await ctx.next(w2, 'Nochmal');
        if (oo.maxTries && tries >= oo.maxTries) return { ok: false, tries, value: r };
      }
    };

    /* ----- T3: Zu zweit an einem iPad ----- */
    // Geteilte Ansicht: oben um 180° gedreht (Person gegenüber), unten normal. T.split({ top, bottom })
    T.split = (o) => h('div', { class: 't3-split' }, h('div', { class: 't3-half flip' }, o.top), h('div', { class: 't3-half' }, o.bottom));
    // Finger-drauf-Zone: zählt Finger (pointerdown/up). Löst auf, wenn `need` Finger `ms` lang gleichzeitig halten.
    function pointerZone(el, need, ms, onDone) {
      let active = new Set();
      let timer = null;
      const update = () => {
        el.dataset.fingers = String(active.size);
        el.classList.toggle('held', active.size >= need);
        if (active.size >= need && !timer) timer = setTimeout(() => { timer = null; if (active.size >= need) { onDone(); } }, ms);
        if (active.size < need && timer) { clearTimeout(timer); timer = null; }
      };
      el.addEventListener('pointerdown', (e) => { e.preventDefault(); active.add(e.pointerId); try { el.setPointerCapture(e.pointerId); } catch (x) { /* egal */ } update(); });
      const off = (e) => { active.delete(e.pointerId); update(); };
      el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('lostpointercapture', off);
      ctx.onCleanup(() => clearTimeout(timer));
    }
    // T.twoFinger(wrap, { label }) → Promise (zwei Finger 600 ms gleichzeitig auf der Zone). Auto: sofort.
    T.twoFinger = (wrap, o) => {
      const oo = o || {};
      return ctx.waitFor(new Promise((resolve) => {
        const zone = h('div', { class: 'two-finger', role: 'button', tabindex: '0', id: oo.id || 'two-finger' },
          h('span', { class: 'tf-dots' }, h('i'), h('i')),
          h('b', null, oo.label || 'Beide: Finger drauf'),
          h('span', { class: 'muted small' }, oo.hint || 'Zwei Finger gleichzeitig, kurz halten.'));
        pointerZone(zone, 2, oo.ms || 600, () => { CREW.sound.play('unlock'); zone.classList.add('done'); resolve(true); });
        zone.addEventListener('keydown', (e) => { if (e.key === 'Enter') { resolve(true); } });
        (oo.slot || wrap).appendChild(zone);
        U().revealRow(zone);
        if (ctx.auto) setTimeout(() => resolve(true), Math.max(50, window.__crewAutoDelay || 0));
      }));
    };
    // T.handOn(wrap, { zones:[{id,label}], ms }) → Promise(id der zuerst gehaltenen Zone) – „Wer ist dran? Hand drauf“
    T.handOn = (wrap, o) => {
      const oo = o || {};
      return ctx.waitFor(new Promise((resolve) => {
        const row = h('div', { class: 'hand-zones' });
        (oo.zones || [{ id: 'A', label: 'Links' }, { id: 'B', label: 'Rechts' }]).forEach((z) => {
          const el = h('div', { class: 'hand-zone', role: 'button', tabindex: '0', 'data-zone': z.id }, h('b', null, z.label), h('span', { class: 'muted small' }, oo.hint || 'Hand drauf'));
          pointerZone(el, 1, oo.ms || 400, () => { CREW.sound.play('tick'); row.querySelectorAll('.hand-zone').forEach((x) => x.classList.toggle('won', x === el)); resolve(z.id); });
          el.addEventListener('keydown', (e) => { if (e.key === 'Enter') resolve(z.id); });
          row.appendChild(el);
        });
        (oo.slot || wrap).appendChild(row);
        if (ctx.auto) setTimeout(() => resolve((oo.zones || [{ id: 'A' }])[0].id), Math.max(50, window.__crewAutoDelay || 0));
      }));
    };

    /* ----- T4: Bewegung im Raum ----- */
    // T.walk({ card, eyebrow, positions:[{id,label,where}], seconds, question, minorityFirst })
    //   Beamer-Karte, Geh-Timer, „Stopp!“, dann Gruppen-Frage. Nur die Lehrkraft tippt. → 'done' | SKIP
    T.walk = async (o) => {
      const oo = o || {};
      const pos = oo.positions || [{ id: 'a', label: 'A', where: 'Wand links' }, { id: 'b', label: 'B', where: 'Wand rechts' }];
      const posRow = h('div', { class: 'walk-pos' }, pos.map((p) => h('div', { class: 'walk-p', 'data-pos': p.id }, h('b', { class: 'display' }, p.label), p.where ? h('span', { class: 'muted small' }, p.where) : null)));
      const slot = h('div', { class: 'row center walk-timer' });
      const wrap = ctx.scr([
        oo.card instanceof Node ? oo.card : say(oo.card || '', { eyebrow: oo.eyebrow || 'Geh zu deiner Antwort' }),
        posRow,
        h('div', { class: 'row between' }, h('p', { class: 'muted' }, oo.hint || 'Mitte ist erlaubt. Gehen, nicht rennen.'), slot),
        oo.safety !== false ? h('div', { class: 'row' }, safetyLine('koerper'), safetyLine('raum')) : null,
      ], { eyebrow: oo.step || 'Bewegung', noPass: false, badge: oo.badge || null });
      const r = await ctx.timerOrButton(wrap, oo.seconds || 10, [{ label: 'Stopp!', value: 'stop', variant: 'teamB', icon: 'pause', id: 'btn-stop' }], { movement: true, slot });
      if (r === ctx.SKIP) return r;
      CREW.sound.play('go');
      // Nachfrage für die Gruppen: die kleinere Gruppe zuerst – wer allein steht, darf schweigen
      const w2 = ctx.scr([
        h('div', { class: 'stop-big display' }, 'Stopp!'),
        say(oo.question || 'Redet in eurer Gruppe: Warum steht ihr hier?', { eyebrow: 'Jetzt reden' }),
        h('div', { class: 'card stack soft' },
          h('b', null, oo.minorityFirst === false ? 'Jede Gruppe sagt einen Satz.' : 'Die kleinere Gruppe erklärt zuerst.'),
          h('p', { class: 'muted small' }, 'Wer allein steht, darf bleiben und nichts sagen. Mitte wird zuerst gefragt.')),
      ], { eyebrow: oo.step || 'Bewegung', badge: oo.badge2 || oo.badge || null });
      return ctx.next(w2, oo.nextLabel || 'Weiter');
    };

    /* ----- T5: Gerät weitergeben ----- */
    // Deckblatt „Nur du schaust“ → Promise. T.cover({ who, hint })
    T.cover = async (o) => {
      const oo = o || {};
      const wrap = ctx.scr([
        h('div', { class: 'cover-sheet' },
          CREW.icon('eyeOff', 64),
          h('h1', { class: 'outline-text' }, oo.who || 'Nur du schaust'),
          h('p', { class: 'lead' }, oo.hint || 'Die anderen schauen weg. Tippe, wenn du bereit bist.'),
          oo.extra || null),
      ], { eyebrow: oo.eyebrow || 'Weitergeben', center: true });
      return ctx.next(wrap, oo.label || 'Ich bin bereit', { id: 'btn-ready' });
    };
    // Weitergabe-Bildschirm. T.passOn({ direction, extra })
    T.passOn = async (o) => {
      const oo = o || {};
      const wrap = ctx.scr([
        h('div', { class: 'cover-sheet' },
          CREW.icon('undo', 64),
          h('h1', { class: 'outline-text' }, oo.title || 'Weitergeben'),
          h('p', { class: 'lead' }, oo.text || ('Gib das iPad nach ' + (oo.direction || 'links') + '. Pass ist okay: einfach weitergeben.')),
          oo.extra || null),
      ], { eyebrow: oo.eyebrow || 'Weitergeben', center: true });
      return ctx.next(wrap, oo.label || 'Weitergegeben', { id: 'btn-passed' });
    };

    /* ----- T6: Beamer-Gruppe ----- */
    // Ein Beamer-Schritt: Textkarte + Knöpfe. Nur die Lehrkraft tippt. T.step({ eyebrow, text, card, extra, options, step })
    T.beamerStep = async (o) => {
      const oo = o || {};
      const wrap = ctx.scr([
        oo.card || say(oo.text || '', { eyebrow: oo.eyebrow || '' }),
        oo.extra || null,
        oo.teacher !== false ? U().teacherLine(oo.teacher || 'Nur „Weiter“ tippen. Keine Hände zählen.') : null,
      ], { eyebrow: oo.step || 'Beamer', center: !!oo.center });
      return ctx.ask(wrap, oo.options || [{ label: 'Weiter', value: true, iconRight: 'right', id: 'btn-next' }]);
    };

    /* ----- Ende: Sticker + Hilfenummern ----- */
    // T.end({ summary, stats:[[n,label]], help, noSticker, extra }) → zeigt Abschluss; Rückgabe 'again' | 'done'
    T.end = async (o) => {
      const oo = o || {};
      const g = ctx.game;
      const st = oo.noSticker ? null : award(g.id);
      const wrap = ctx.scr([
        h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
          h('h2', null, oo.summary || 'Stark gespielt, Crew!'),
          (oo.stats || []).length ? h('div', { class: 'row center' }, oo.stats.map(([n, l]) => h('span', { class: 'pill' }, h('b', null, String(n)), ' ' + l))) : null,
          oo.noSticker ? null : skillRow(ctx.didaktik),
          st ? h('div', { class: 'stack pop', style: { alignItems: 'center', gap: '6px' } }, stickerEl(st, { big: true }), h('span', { class: 'muted small' }, st.isNew ? 'Neuer Sticker für die Sticker-Wand im Crew-HQ!' : 'Sticker ×' + st.n + ' auf der Sticker-Wand.')) : null,
          oo.extra || null),
        g.help || oo.help ? helpCard() : null,
      ], { eyebrow: 'Fertig', center: true, noPass: true });
      if (st) { CREW.sound.play('good'); if (st.isNew && !ctx.fast) U().confetti(90); }
      const opts = [{ label: 'Zurück zu Spiele', value: 'done', iconRight: 'home', id: 'btn-done' }];
      if (oo.again) opts.unshift({ label: 'Nochmal', value: 'again', variant: 'ghost', icon: 'shuffle', auto: false });
      // Auto-Modus: Endbild kurz stehen lassen (Tests machen hier ein Foto)
      const r = await ctx.ask(wrap, opts, { autoDelay: ctx.opts.autoEndWait || 40 });
      return r === 'again' ? 'again' : 'done';
    };
  }

  /* Vom App-Kern aufgerufen: Spiel laufen lassen (ctx kommt aus makeCtx). */
  async function play(game, ctx, opts) {
    extendCtx(ctx, game, opts);
    running = { id: game.id, startedAt: Date.now() };
    done = null;
    let watchdog = null;
    if (ctx.auto) {
      // Auto-Modus: offene Dialoge und Sprechblasen wegklicken
      watchdog = setInterval(() => {
        const m = document.querySelector('#overlays .overlay .modal button:last-child');
        if (m) m.click();
        const c = document.getElementById('coach-ok');
        if (c) c.click();
      }, 200);
      ctx.onCleanup(() => clearInterval(watchdog));
    }
    try {
      let result;
      let nachDone = false;
      for (;;) {
        result = (await game.run(ctx)) || {};
        if (result === ctx.SKIP) result = {};
        if (result.silent) break; // Spiel hat sein eigenes Ende gezeigt
        // Nachbesprechung: einmal pro Spiel, nicht auf Team-/Rollen-iPads (noSticker) und nicht nach „nur reingeschaut“
        if (!nachDone && !result.noSticker && !result.noNach) { await ctx.T.nachbesprechung(result); nachDone = true; }
        const r = await ctx.T.end(result);
        if (r !== 'again') break;
      }
      done = { id: game.id, ok: true, result };
      return result;
    } catch (e) {
      if (!(e && e.constructor && e.constructor.name === 'Abort')) done = { id: game.id, ok: false, error: String(e && e.message || e) };
      throw e;
    } finally {
      clearInterval(watchdog);
      running = null;
    }
  }

  /* =========================================================
     Finder & Spiele-Hub
     ========================================================= */
  const FILTER = { einheit: '', thema: '', format: '', eldib: '', q: '' };
  const builtPill = (id) => (get(id) ? h('span', { class: 'pill good' }, CREW.icon('check', 14), 'spielbar') : h('span', { class: 'pill' }, 'bald'));
  function startFromUi(id) {
    const g = get(id);
    if (!g) { ui().toast('Dieses Spiel ist noch nicht gebaut.'); return; }
    if (CREW.app && CREW.app.startGame) CREW.app.startGame(g, { back: 'hub' });
  }
  function gameRow(k, o) {
    const oo = o || {};
    const g = get(k.id);
    const fmt = CREW.katalog.formate.find((f) => f.id === k.format) || {};
    const units = CREW.katalog.unitsOf(k.id);
    const unitVariant = oo.unit ? CREW.katalog.einheiten.find((e) => e.id === oo.unit && e.spiel === k.id) : null;
    return h('div', { class: 'li game-row', 'data-game': k.id, 'data-built': g ? '1' : '0' },
      h('div', { class: 'stack', style: { gap: '6px', flex: '1' } },
        h('div', { class: 'row', style: { gap: '8px' } },
          h('span', { class: 'game-ic', 'data-theme': k.thema }, CREW.icon(THEME_ICON[k.thema] || 'star', 22)),
          h('h3', null, k.name), k.top ? h('span', { class: 'pill' }, CREW.icon('star', 14), 'Top') : null, builtPill(k.id)),
        h('div', { class: 'row', style: { gap: '6px' } },
          h('span', { class: 'pill accent' }, fmt.name || k.formatName), h('span', { class: 'pill' }, k.dauer),
          k.abschluss ? h('span', { class: 'pill' }, 'Abschluss') : null,
          units.length ? h('span', { class: 'pill' }, units.map((u) => u.id).join(', ')) : null),
        unitVariant ? h('p', { class: 'small unit-variant' }, h('b', null, 'Variante für ' + unitVariant.id + ': '), unitVariant.variante) : null,
        oo.compact ? null : h('p', { class: 'small muted' }, k.text),
        oo.compact ? null : h('p', { class: 'small' }, h('b', null, 'Fördert: '), k.foerdert),
        k.eldib.length ? h('div', { class: 'row', style: { gap: '4px' } }, k.eldib.map((c) => h('span', { class: 'kbd small' }, c))) : null),
      h('div', { class: 'stack', style: { gap: '8px', alignItems: 'flex-end' } },
        ui().btn('Spielen', () => startFromUi(k.id), { small: true, icon: 'play', disabled: !g, id: 'play-' + k.id }),
        oo.teacher && g && dGame(k.id) ? ui().btn('Hinweise', () => showHinweise('games', k.id, k.name), { small: true, variant: 'ghost', icon: 'bulb', id: 'tips-' + k.id }) : null,
        oo.teacher ? ui().btn('QR', () => showQR(k.id), { small: true, variant: 'ghost', icon: 'phone', id: 'qr-' + k.id }) : null));
  }
  function filterGames() {
    const K = CREW.katalog;
    const q = FILTER.q.trim().toLowerCase();
    return Object.values(K.spiele).filter((k) =>
      (!FILTER.thema || k.thema === FILTER.thema) &&
      (!FILTER.format || k.format === FILTER.format) &&
      (!FILTER.eldib || k.eldib.includes(FILTER.eldib)) &&
      (!FILTER.einheit || k.einheiten.includes(FILTER.einheit) || K.einheiten.some((e) => e.id === FILTER.einheit && e.spiel === k.id)) &&
      (!q || (k.name + ' ' + k.text + ' ' + k.foerdert).toLowerCase().includes(q)));
  }
  // Beste GEBAUTE Alternative für eine Einheit, deren Katalog-Spiel noch nicht gebaut ist:
  // gleiches Thema, dann gleiche ELDiB-Codes (Skill), dann Einheit im Spiel genannt. Nie ein toter Link.
  function bestBuiltFor(unit) {
    const K = CREW.katalog;
    const want = K.spiele[unit.spiel];
    if (!want || get(want.id)) return null;
    let best = null, score = -1;
    list().forEach((g) => {
      const k = K.spiele[g.id];
      if (!k) return;
      const eld = k.eldib.filter((c) => want.eldib.includes(c)).length;
      const sc = (k.thema === want.thema ? 10 : 0) + eld * 4 + (k.einheiten.includes(unit.id) ? 3 : 0) + (k.format === want.format ? 1 : 0);
      if (sc > score) { score = sc; best = k; }
    });
    return best;
  }
  // Finder-Element (Startbildschirm/Hub ohne, Lehrermodus mit QR und Tagescode). renderFinder({teacher}) zeichnet den Bildschirm.
  function finderEl(o) {
    const oo = o || {};
    const K = CREW.katalog;
    const box = h('div', { class: 'stack finder' });
    const draw = () => {
      clear(box);
      const unitSel = h('select', { class: 'sel', id: 'finder-unit' },
        h('option', { value: '' }, 'Alle Einheiten (Jahr 1)'),
        K.einheiten.map((e) => h('option', { value: e.id, selected: FILTER.einheit === e.id }, e.id + ' · ' + e.titel)));
      unitSel.addEventListener('change', () => { FILTER.einheit = unitSel.value; draw(); });
      const eldibSel = h('select', { class: 'sel', id: 'finder-eldib' },
        h('option', { value: '' }, 'Alle ELDiB-Codes'),
        Array.from(new Set(Object.values(K.spiele).flatMap((k) => k.eldib))).sort().map((c) => h('option', { value: c, selected: FILTER.eldib === c }, c)));
      eldibSel.addEventListener('change', () => { FILTER.eldib = eldibSel.value; draw(); });
      const chip = (label, on, fn, id) => { const c = h('button', { type: 'button', class: 'chip small' + (on ? ' sel' : ''), 'data-chip': id }, label); c.addEventListener('click', () => { CREW.sound.play('tap'); fn(); draw(); }); return c; };
      const themeChips = h('div', { class: 'row', style: { gap: '6px' } }, chip('Alle Themen', !FILTER.thema, () => { FILTER.thema = ''; }, 'thema-'), K.themen.map((t) => chip(t.name, FILTER.thema === t.id, () => { FILTER.thema = FILTER.thema === t.id ? '' : t.id; }, 'thema-' + t.id)));
      const fmtChips = h('div', { class: 'row', style: { gap: '6px' } }, chip('Alle Formate', !FILTER.format, () => { FILTER.format = ''; }, 'format-'), K.formate.map((f) => chip(f.name, FILTER.format === f.id, () => { FILTER.format = FILTER.format === f.id ? '' : f.id; }, 'format-' + f.id)));
      const search = h('input', { type: 'text', id: 'finder-q', placeholder: 'Suchen (Name, Stichwort) …', value: FILTER.q });
      search.addEventListener('input', () => { FILTER.q = search.value; drawList(); });
      const unit = FILTER.einheit ? K.einheiten.find((e) => e.id === FILTER.einheit) : null;
      const listBox = h('div', { class: 'list', id: 'finder-list' });
      const drawList = () => {
        clear(listBox);
        let games = filterGames();
        const alt = unit ? bestBuiltFor(unit) : null;
        if (unit) games = games.sort((a, b) => (b.id === unit.spiel) - (a.id === unit.spiel) || (alt ? (b.id === alt.id) - (a.id === alt.id) : 0));
        if (alt && !games.some((k) => k.id === alt.id)) games.unshift(alt);
        if (!games.length) listBox.appendChild(h('p', { class: 'muted' }, 'Kein Spiel passt. Filter lockern.'));
        games.forEach((k) => listBox.appendChild(gameRow(k, { teacher: oo.teacher, unit: FILTER.einheit, compact: oo.compact })));
      };
      drawList();
      box.append(
        h('div', { class: 'card stack' },
          h('div', { class: 'grid two' }, h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Einheit'), unitSel), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'ELDiB'), eldibSel)),
          h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Thema'), themeChips),
          h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Format'), fmtChips),
          search),
        unit ? (() => {
          const alt = bestBuiltFor(unit);
          const want = K.spiele[unit.spiel];
          return h('div', { class: 'card stack unit-card', 'data-alt': alt ? alt.id : '' },
            h('span', { class: 'eyebrow' }, 'Abschlussspiel für ' + unit.id),
            h('h3', null, unit.titel + ' → ' + (want ? want.name : unit.spiel)),
            alt
              ? h('div', { class: 'stack', style: { gap: '4px' } },
                h('div', { class: 'row', style: { gap: '6px' } }, h('span', { class: 'pill' }, (want ? want.name : unit.spiel) + ' · bald'), h('span', { class: 'pill good' }, CREW.icon('check', 14), 'Heute spielbar: ' + alt.name)),
                h('p', { class: 'small unit-alt' }, h('b', null, 'Variante: '), alt.name + ' (' + alt.formatName + ', ' + alt.dauer + ') passt zu dieser Stunde: ' + (alt.thema === (want || {}).thema ? 'gleiches Thema' : 'gleiche Fähigkeit') + '. ' + alt.text.split(/[.!?]\s/)[0] + '.'),
                ui().btn('Variante spielen', () => startFromUi(alt.id), { small: true, icon: 'play', id: 'play-alt-' + alt.id }))
              : null,
            h('p', { class: 'small' }, unit.variante));
        })() : null,
        listBox);
    };
    draw();
    return box;
  }
  function renderFinder(o) {
    const oo = o || {};
    if (CREW.app && CREW.app.endRun) CREW.app.endRun();
    ui().screen([
      h('div', { class: 'row between enter' },
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Spiele finden'), h('h1', { class: 'outline-text' }, 'Finder')),
        h('div', { class: 'row' }, ui().btn('Alle Spiele', () => renderHub(), { variant: 'ghost', small: true, icon: 'star', id: 'btn-hub' }), ui().btn('Start', () => CREW.app.renderHome(), { variant: 'ghost', small: true, icon: 'home' }))),
      finderEl(oo),
    ]);
  }
  // Hub: alle Spiele nach Thema
  function renderHub() {
    if (CREW.app && CREW.app.endRun) CREW.app.endRun();
    const K = CREW.katalog;
    const built = list().length;
    const total = Object.keys(K.spiele).length;
    ui().screen([
      h('div', { class: 'row between enter' },
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, built + ' von ' + total + ' Spielen spielbar'), h('h1', { class: 'outline-text' }, 'Spiele')),
        h('div', { class: 'row' }, ui().btn('Finder', () => renderFinder(), { variant: 'ghost', small: true, icon: 'help', id: 'btn-finder' }), ui().btn('Start', () => CREW.app.renderHome(), { variant: 'ghost', small: true, icon: 'home' }))),
      h('p', { class: 'lead muted enter-2' }, 'Nach Thema. Jedes Spiel redet über Figuren, nie über dich. Pass ist immer okay.'),
      K.themen.map((t, i) => h('div', { class: 'card stack hub-theme enter-' + Math.min(3, i + 1), 'data-theme': t.id },
        h('div', { class: 'row between' }, h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'game-ic', 'data-theme': t.id }, CREW.icon(THEME_ICON[t.id] || 'star', 24)), h('h3', null, t.name)), h('span', { class: 'muted small' }, t.spiele.filter((id) => get(id)).length + '/' + t.spiele.length)),
        h('div', { class: 'hub-games' }, t.spiele.map((id) => {
          const k = K.spiele[id];
          const g = get(id);
          const fmt = K.formate.find((f) => f.id === k.format) || {};
          const tile = h('button', { type: 'button', class: 'tile hub-tile' + (g ? '' : ' soon'), 'data-game': id, disabled: !g },
            h('span', { class: 't-title' }, k.name),
            h('span', { class: 't-sub' }, fmt.name + ' · ' + k.dauer + (g ? '' : ' · bald')));
          if (g) tile.addEventListener('click', () => { CREW.sound.play('tap'); startFromUi(id); });
          return tile;
        })))),
    ]);
  }
  // Lehrer-Panel: Tagescode, Basis-URL, Finder mit QR
  function teacherPanel() {
    const codeEl = h('span', { class: 'display daycode', id: 't-daycode' }, CREW.seed.getCode());
    const urlIn = h('input', { type: 'text', id: 't-baseurl', value: baseUrl(), placeholder: DEFAULT_BASE });
    return h('div', { class: 'stack' },
      h('div', { class: 'grid two' },
        h('div', { class: 'card stack' }, h('h3', null, 'Tagescode'), h('div', { class: 'row between' }, codeEl, h('div', { class: 'row' },
          ui().btn('Neuer Code', () => { codeEl.textContent = CREW.seed.newCode(); ui().toast('Neuer Tagescode. Steht jetzt am Beamer.'); }, { small: true, variant: 'ghost', icon: 'shuffle', id: 't-newcode' }),
          ui().btn('Standard', () => { CREW.store.del('daycode'); codeEl.textContent = CREW.seed.getCode(); }, { small: true, variant: 'ghost', icon: 'undo' }))),
          h('p', { class: 'muted small' }, 'Der Standard-Code kommt aus dem Datum: Alle iPads mit richtigem Datum haben ihn von allein. Er bestimmt Szenen, Paar-Farben und Rollen gleich auf allen Geräten. Keine Namen, keine Daten.')),
        h('div', { class: 'card stack' }, h('h3', null, 'Basis-URL für QR-Codes'), urlIn,
          h('div', { class: 'row end' }, ui().btn('Speichern', () => { const v = urlIn.value.trim(); if (!/^https?:\/\//.test(v)) { ui().toast('Bitte eine Adresse mit https:// eintragen.'); return; } S().settings.baseUrl = v; CREW.save(); ui().toast('Gespeichert.'); }, { small: true, id: 't-baseurl-save' })),
          h('p', { class: 'muted small' }, 'Die Jugend-iPads scannen einen QR-Code und landen direkt im Spiel. Dafür muss CREW online stehen (GitHub Pages, siehe README). Ohne Netz: Spiel am Beamer starten.'))),
      finderEl({ teacher: true, compact: false }));
  }

  CREW.registerGame = registerGame;
  CREW.games = {
    register: registerGame, get, list, all: GAMES, play,
    figures: FIGURES, avatar, readBtn, say, figureCard, bubble, helpCard, safetyLine, colourChip, meter,
    didaktik, warumCard, skillRow, stufenLeiste, stufePill, soloNach, lehrerBody, showHinweise, LEVEL_NAMES,
    award, stickers, renderWall, stickerEl,
    linkParams, linkFor, qrPanel, showQR, baseUrl, DEFAULT_BASE,
    renderHub, renderFinder, finderEl, teacherPanel, FILTER, bestBuiltFor,
    THEME_ICON, TEMPLATE_NAME,
    status: () => ({ running, done }),
  };
})();
