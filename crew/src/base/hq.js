/* Crew-HQ: die Belohnung der Saison.
   Eine staubige alte Garage wird Level für Level zum Treffpunkt der Crew.
   CREW.base.renderScene(level, {highlight}) baut ein Inline-SVG im Format 16:9.
   Alle wichtigen Farben kommen aus CSS-Variablen (hq.css). So passt das HQ
   zu allen drei Looks (Arena, Pixel, Neon). Keine Bilder, keine Bibliotheken. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const NS = 'http://www.w3.org/2000/svg';

  /* Die 12 Ausbaustufen – pro Level kommt genau eine Sache dazu */
  const ITEMS = [
    { name: 'Lichterkette', desc: 'Das erste Licht im HQ. Sofort viel gemütlicher.' },
    { name: 'Sofa', desc: 'Vom Flohmarkt geholt. Bequemer als jeder Schulstuhl.' },
    { name: 'Teppich', desc: 'Weich und rund. Ab jetzt heißt es: Schuhe aus. Vielleicht.' },
    { name: 'Graffiti-Wand', desc: 'Euer Crew-Name, groß an der Wand. Das ist jetzt euer Revier.' },
    { name: 'Musikbox', desc: 'Mit Lichtring und viel Bass. Man hört sie bis zur Gare.' },
    { name: 'Pflanzen', desc: 'Grün macht gute Luft. Wer gießt? Die ganze Crew.' },
    { name: 'Arcade-Automat', desc: 'Ein echter Automat. Der Highscore gehört der ganzen Crew.' },
    { name: 'Snack-Kühlschrank', desc: 'Immer voll. Wer das Letzte nimmt, füllt nach. Crew-Regel.' },
    { name: 'Tischkicker', desc: 'Blau gegen Pink. Eine Revanche ist immer erlaubt.' },
    { name: 'Discokugel', desc: 'Sie glitzert über allem. Tanzen ist freiwillig.' },
    { name: 'Sitzsäcke', desc: 'Zum Reinfallen. Wieder aufstehen dauert etwas länger.' },
    { name: 'Skyline-Fenster', desc: 'Das Garagentor ist weg. Neonschild an und Blick auf Luxemburg bei Nacht.' },
  ];

  /* Raum in Zentralperspektive: Fluchtpunkt (VX|VY), Rückwand WX0..WX1 / WY0..WY1 */
  const VX = 800, VY = 340;
  const WX0 = 250, WX1 = 1350, WY0 = 64, WY1 = 610;

  /* Wo steht was? (für den Glanz beim Freischalten) */
  const BOX = {
    1: [262, 70, 1076, 110], 2: [486, 440, 428, 200], 3: [390, 660, 660, 138], 4: [262, 92, 440, 320],
    5: [366, 330, 160, 305], 6: [850, 380, 170, 258], 7: [44, 420, 262, 392], 8: [1316, 400, 240, 416],
    9: [908, 640, 372, 230], 10: [744, 96, 112, 124], 11: [248, 740, 356, 152], 12: [708, 112, 632, 500],
  };
  // Eigene Plätze für das „NEU!“-Schild, wo es sonst den Crew-Namen oder Ranken verdeckt
  const BADGE = { 5: [296, 470], 8: [1290, 426] };

  let uid = 0;
  const n1 = (v) => Math.round(v * 10) / 10;
  // Punkt Richtung Fluchtpunkt schieben (k = Tiefe, 0 … 1)
  const toward = (x, y, k) => [n1(x + (VX - x) * k), n1(y + (VY - y) * k)];
  const pts = (arr) => arr.map((p) => p[0] + ',' + p[1]).join(' ');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Kleiner Zufall mit festem Startwert: jedes Mal gleiches Bild
  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* Crew-Namen für die Graffiti-Wand in 1–3 Zeilen teilen.
     Gewählt wird die Aufteilung mit der größten Schrift. Nur wenn ein Wort
     viel zu lang ist, wird es in der Mitte mit Bindestrich getrennt. */
  const MUR_W = 390, MUR_H = 250, CHAR = 0.62, FS_MIN = 52;
  const FS_MAX = [124, 98, 76];
  const SHY = '\u00ad';
  // Trennstelle (SHY): in der Zeile zusammenkleben, am Zeilenende ein Bindestrich
  const joinWords = (arr) => arr.reduce((acc, w) => (acc === '' ? w : acc.endsWith(SHY) ? acc.slice(0, -1) + w : acc + ' ' + w), '').replace(SHY, '-');
  const fontFor = (lines) => Math.min(FS_MAX[lines.length - 1], (MUR_W * 0.95) / (Math.max.apply(null, lines.map((x) => x.length)) * CHAR), MUR_H / (lines.length * 0.95 + 0.25));
  function bestSplit(words) {
    let best = null;
    const tryIt = (lines) => { const fs = fontFor(lines); if (!best || fs > best.fs + 0.5) best = { lines, fs }; };
    const W = words.length;
    tryIt([joinWords(words)]);
    for (let i = 1; i < W; i++) {
      tryIt([joinWords(words.slice(0, i)), joinWords(words.slice(i))]);
      for (let j = i + 1; j < W; j++) tryIt([joinWords(words.slice(0, i)), joinWords(words.slice(i, j)), joinWords(words.slice(j))]);
    }
    return best;
  }
  function nameLayout(name) {
    const words = String(name || '').replace(SHY, '').trim().toUpperCase().split(/\s+/).filter(Boolean);
    if (!words.length) words.push('CREW');
    let best = bestSplit(words);
    if (best.fs < FS_MIN * 0.83) {
      const cut = [];
      words.forEach((w) => { if (w.length > 12) { const k = Math.ceil(w.length / 2); cut.push(w.slice(0, k) + SHY, w.slice(k)); } else cut.push(w); });
      const b2 = bestSplit(cut);
      if (b2.fs > best.fs) best = b2;
    }
    return best;
  }

  function renderScene(level, opts) {
    const o = opts || {};
    const L = Math.max(0, Math.min(12, Math.floor(Number(level) || 0)));
    // owned: Welche Teile hat die Crew gewählt? (ohne Angabe: Teil 1 bis L)
    // ghost: Teile, die als dunkle Silhouette angedeutet werden (Vorschau aufs nächste Level)
    const own = Array.isArray(o.owned) ? o.owned.map(Number) : null;
    const ghost = Array.isArray(o.ghost) ? o.ghost.map(Number) : [];
    const owns = (n) => (own ? own.includes(n) : L >= n);
    const hl = Number(o.highlight) >= 1 && owns(Math.floor(Number(o.highlight))) ? Math.floor(Number(o.highlight)) : 0;
    const appEl = document.getElementById('app');
    const look = (appEl && appEl.dataset.look) || (CREW.state && CREW.state.crew && CREW.state.crew.look) || 'arena';
    const px = look === 'pixel';
    const u = 'hq' + (++uid) + '_';
    const has = (n) => owns(n) || ghost.includes(n);
    const out = [];
    const add = (s) => { out.push(s); };

    /* ---------- Zeichen-Helfer ---------- */
    const at = (cls, more) => (cls ? ` class="${cls}"` : '') + (more ? ' ' + more : '');
    const rect = (x, y, w, h, cls, rx, more) => `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}"${rx && !px ? ` rx="${rx}"` : ''}${at(cls, more)}/>`;
    const circ = (cx, cy, r, cls, more) => `<circle cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}"${at(cls, more)}/>`;
    // kleine Punkte: im Pixel-Look eckig
    const dot = (cx, cy, r, cls, more) => (px ? rect(cx - r, cy - r, 2 * r, 2 * r, cls, 0, more) : circ(cx, cy, r, cls, more));
    const ell = (cx, cy, rx, ry, cls, more) => `<ellipse cx="${n1(cx)}" cy="${n1(cy)}" rx="${n1(rx)}" ry="${n1(ry)}"${at(cls, more)}/>`;
    const path = (d, cls, more) => `<path d="${d}"${at(cls, more)}/>`;
    const poly = (arr, cls, more) => `<polygon points="${pts(arr)}"${at(cls, more)}/>`;
    const line = (x1, y1, x2, y2, cls, more) => `<line x1="${n1(x1)}" y1="${n1(y1)}" x2="${n1(x2)}" y2="${n1(y2)}"${at(cls, more)}/>`;
    const g = (cls, inner, more) => `<g${at(cls, more)}>${inner}</g>`;
    const shadow = (cx, cy, rx, ry) => ell(cx, cy, rx, ry, 'hq-shadow');
    // Vierzackiger Glitzer-Stern um (x|y) mit Größe s
    const star = (x, y, s) => `M${n1(x)} ${n1(y - s)}Q${n1(x)} ${n1(y)} ${n1(x + s)} ${n1(y)}Q${n1(x)} ${n1(y)} ${n1(x)} ${n1(y + s)}Q${n1(x)} ${n1(y)} ${n1(x - s)} ${n1(y)}Q${n1(x)} ${n1(y)} ${n1(x)} ${n1(y - s)}Z`;
    // Kiste in Perspektive: Vorderseite + sichtbare Seite + Deckel
    function box3d(x, y, w, h, k, cls) {
      let s = '';
      const tl = toward(x, y, k), tr = toward(x + w, y, k);
      if (x + w < VX) {
        const br = toward(x + w, y + h, k);
        s += poly([[x + w, y], tr, br, [x + w, y + h]], cls + ' hq-o') + poly([[x + w, y], tr, br, [x + w, y + h]], 'hq-dk');
      } else if (x > VX) {
        const bl = toward(x, y + h, k);
        s += poly([[x, y], tl, bl, [x, y + h]], cls + ' hq-o') + poly([[x, y], tl, bl, [x, y + h]], 'hq-dk');
      }
      if (y > VY) s += poly([[x, y], [x + w, y], tr, tl], cls + ' hq-o') + poly([[x, y], [x + w, y], tr, tl], 'hq-lt');
      s += rect(x, y, w, h, cls + ' hq-o');
      return s;
    }
    // Gruppe für ein freischaltbares Teil (mit Glanz, wenn es neu ist)
    const item = (n, inner) => g('hq-it hq-i' + n + (hl === n ? ' hq-new' : ''), inner);

    /* ---------- Farbverläufe, Muster, Masken ---------- */
    add(`<defs>
<linearGradient id="${u}wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<linearGradient id="${u}cl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="${u}cr" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="${u}fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".22" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<linearGradient id="${u}warm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="hq-sy" stop-opacity=".3"/><stop offset="1" class="hq-sy" stop-opacity="0"/></linearGradient>
<radialGradient id="${u}halo"><stop offset="0" class="hq-sy" stop-opacity=".95"/><stop offset=".3" class="hq-sy" stop-opacity=".4"/><stop offset="1" class="hq-sy" stop-opacity="0"/></radialGradient>
<radialGradient id="${u}cool"><stop offset="0" stop-color="#bfe6ff" stop-opacity=".6"/><stop offset="1" stop-color="#bfe6ff" stop-opacity="0"/></radialGradient>
<radialGradient id="${u}vig" cx="800" cy="330" r="1000" gradientUnits="userSpaceOnUse"><stop offset=".3" class="hq-sd" stop-opacity="0"/><stop offset="1" class="hq-sd" stop-opacity=".96"/></radialGradient>
<linearGradient id="${u}gf" x1="0" y1="0" x2="0" y2="1"><stop offset=".15" class="hq-sy"/><stop offset=".95" class="hq-sa"/></linearGradient>
<linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060925"/><stop offset=".42" stop-color="#191a52"/><stop offset=".7" stop-color="#3f2672"/><stop offset=".88" stop-color="#7a377c"/><stop offset="1" stop-color="#a84c7a"/></linearGradient>
<linearGradient id="${u}fr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4fbff"/><stop offset="1" stop-color="#b5dcff"/></linearGradient>
<radialGradient id="${u}ball" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0b0830" stop-opacity=".6"/></radialGradient>
<pattern id="${u}brick" width="64" height="32" patternUnits="userSpaceOnUse" x="262" y="92"><rect width="64" height="32" class="hq-mortar"/><rect x="2" y="2" width="60" height="12" class="hq-brick"/><rect x="-30" y="18" width="60" height="12" class="hq-brick2"/><rect x="34" y="18" width="60" height="12" class="hq-brick"/></pattern>
<pattern id="${u}mortar" width="64" height="32" patternUnits="userSpaceOnUse" x="262" y="92"><path d="M0 1H64M0 17H64M1 1V16M33 17V32" stroke="#000" stroke-width="3" fill="none"/></pattern>
<pattern id="${u}dsc" width="20" height="20" patternUnits="userSpaceOnUse" x="754" y="116"><rect width="20" height="20" fill="#7c82b8"/><rect x="1" y="1" width="8" height="8" fill="#eef0ff"/><rect x="11" y="1" width="8" height="8" fill="#aeb4df"/><rect x="1" y="11" width="8" height="8" fill="#c8ccef"/><rect x="11" y="11" width="8" height="8" fill="#fbfbff"/></pattern>
<clipPath id="${u}win"><rect x="936" y="124" width="388" height="486"/></clipPath>
<clipPath id="${u}wall"><path d="M268 98L402 92L452 106L546 94L650 104L694 128L686 214L700 300L680 392L590 404L500 396L400 410L312 402L270 380L264 290L276 200Z"/></clipPath>
<clipPath id="${u}dball"><circle cx="800" cy="164" r="46"/></clipPath>
<filter id="${u}blur" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
<path id="${u}leaf" d="M0 0C-26-14-32-54 0-86C32-54 26-14 0 0Z"/>
<path id="${u}leafs" d="M0 0C-9-5-11-18 0-28C11-18 9-5 0 0Z"/>
</defs>`);

    /* ---------- Raum: Decke, Wände, Boden ---------- */
    add(path('M0 0H1600L1350 64H250Z', 'hq-ceil'));
    add(path('M0 0L250 64V610L0 733Z', 'hq-side'));
    add(path('M1600 0L1350 64V610L1600 733Z', 'hq-side hq-side-r'));
    add(rect(WX0, WY0, WX1 - WX0, WY1 - WY0, 'hq-wall'));
    // Kanten zwischen Decke und Wänden
    add(path('M250 64H1350', 'hq-edge') + path('M250 64L0 0M1350 64L1600 0M250 610V64M1350 610V64', 'hq-edge'));

    // Freigelegte Ziegel (Loft-Stil)
    const patch = 'M268 98L402 92L452 106L546 94L650 104L694 128L686 214L700 300L680 392L590 404L500 396L400 410L312 402L270 380L264 290L276 200Z';
    add(path(patch, 'hq-plaster') + path(patch, '', `fill="url(#${u}brick)"`));
    // Kleine Putz-Lücke mit Ziegeln neben dem Tor
    add(path('M712 396l60-6 26 12-4 30-70 6-14-18Z', 'hq-plaster hq-thin') + g('', rect(718, 400, 34, 12, 'hq-brick', 2) + rect(756, 400, 34, 12, 'hq-brick2', 2) + rect(730, 416, 40, 12, 'hq-brick', 2) + rect(714, 416, 12, 12, 'hq-brick2', 2)));

    // Risse und Flecken: nur solange das HQ noch alt ist
    if (L <= 5) add(path('M1196 96l-12 26 10 18-16 30 6 20M720 568l14-20-6-18 12-14M300 450l18 22-8 16 14 20', 'hq-crack'));
    if (L <= 2) add(ell(760, 360, 70, 44, 'hq-stain') + ell(610, 520, 48, 30, 'hq-stain') + ell(1210, 260, 40, 60, 'hq-stain'));

    // Steckdose & Lichtschalter
    add(rect(866, 560, 22, 28, 'hq-plug', 4) + rect(884, 372, 20, 30, 'hq-plug', 4));

    /* ---------- Tor (Level 0–11) oder Panoramafenster (Level 12) ---------- */
    if (!has(12)) {
      let d = rect(918, 136, 424, 32, 'hq-f2 hq-o', 6);
      d += rect(930, 166, 400, 444, 'hq-f hq-o');
      let sl = '';
      for (let y = 190; y < 606; y += 22) sl += `M930 ${y}H1330`;
      d += path(sl, 'hq-slat');
      d += rect(930, 166, 400, 444, '', 0, `fill="url(#${u}wl)"`);
      d += rect(1100, 580, 60, 11, 'hq-f2 hq-o', 5);
      d += rect(916, 166, 16, 444, 'hq-f2 hq-o') + rect(1328, 166, 16, 444, 'hq-f2 hq-o');
      d += rect(932, 604, 396, 5, 'hq-gap');
      if (L <= 3) d += ell(990, 574, 46, 16, 'hq-rust') + ell(1296, 330, 14, 34, 'hq-rust') + ell(1196, 520, 34, 12, 'hq-rust') + ell(1030, 250, 18, 10, 'hq-rust');
      if (L <= 3) d += `<text x="1130" y="300" class="hq-stencil" text-anchor="middle">07</text>`;
      else d += g('hq-tag', path('M1236 214L1200 278H1230L1212 336L1270 252H1238L1258 214Z', '') + path('M1212 336v22M1203 270v12', 'hq-tagdrip') + path(star(1290, 222, 12) + star(1182, 320, 8), 'hq-tagstar'));
      add(g('hq-door', d));
    }

    /* ---------- Boden ---------- */
    add(path('M250 610H1350L1600 733V900H0V733Z', 'hq-floor'));
    let pl = '';
    for (let i = 1; i < 11; i++) {
      const xb = WX0 + i * 110;
      pl += `M${xb} ${WY1}L${n1(VX + (xb - VX) * ((900 - VY) / (WY1 - VY)))} 900`;
    }
    add(path(pl, 'hq-plank'));
    let gr = '';
    [626, 648, 678, 720, 778, 856].forEach((y) => {
      const t = (y - VY) / (WY1 - VY);
      gr += `M${n1(Math.max(0, VX - (VX - WX0) * t))} ${y}H${n1(Math.min(1600, VX + (WX1 - VX) * t))}`;
    });
    add(path(gr, 'hq-grid'));
    add(path('M250 610H1350L1600 733V900H0V733Z', '', `fill="url(#${u}fl)"`));
    // Fußleisten
    add(rect(250, 596, 1100, 14, 'hq-trim') + path('M0 718L250 596V610L0 733Z', 'hq-trim') + path('M1600 718L1350 596V610L1600 733Z', 'hq-trim'));
    // Wand-Schatten in den Ecken und unter der Decke
    add(rect(250, 64, 1100, 546, '', 0, `fill="url(#${u}wl)"`) + rect(250, 64, 70, 546, '', 0, `fill="url(#${u}cl)"`) + rect(1280, 64, 70, 546, '', 0, `fill="url(#${u}cr)"`));
    // Rohr unter der Decke (auch auf den Seitenwänden)
    add(g('hq-pipes', rect(250, 76, 1100, 12, 'hq-pipe hq-o', 6) + poly([[250, 76], [0, -44], [0, -27], [250, 88]], 'hq-pipe') + poly([[1350, 76], [1600, -44], [1600, -27], [1350, 88]], 'hq-pipe') +
      [330, 600, 870, 1140].map((x) => rect(x, 72, 10, 20, 'hq-pipe2', 2)).join('')));

    /* ---------- Fenster mit Skyline (Level 12) ---------- */
    if (has(12)) {
      let w = rect(936, 124, 388, 486, '', 0, `fill="url(#${u}sky)"`);
      // Sterne
      const r2 = rng(3);
      let st = '';
      for (let i = 0; i < 22; i++) st += dot(940 + r2() * 380, 132 + r2() * 200, r2() < 0.25 ? 2.6 : 1.6, i % 4 === 0 ? 'hq-star hq-tw' : 'hq-star');
      w += st;
      // Mond mit Schein
      w += circ(1262, 184, 70, '', `fill="url(#${u}cool)"`) + circ(1262, 184, 24, 'hq-moon') + circ(1254, 178, 5, 'hq-crater') + circ(1270, 192, 3.5, 'hq-crater');
      // Kirchberg: Türme (die goldenen Zwillingstürme, ein hoher Glasturm)
      let k = rect(1146, 372, 32, 150, 'hq-bld');
      k += rect(1186, 318, 30, 204, 'hq-gold') + rect(1224, 300, 30, 222, 'hq-gold hq-gold2');
      let gl = '';
      for (let y = 306; y < 520; y += 9) gl += `M1186 ${y + 14}H1216M1224 ${y}H1254`;
      k += path(gl, 'hq-goldline');
      k += rect(1264, 250, 42, 272, 'hq-bld hq-bld2') + line(1285, 250, 1285, 226, 'hq-antenna') + dot(1285, 224, 3.5, 'hq-blink');
      let lw = '';
      const r3 = rng(11);
      for (let y = 262; y < 510; y += 14) for (let x = 1270; x < 1300; x += 10) if (r3() < 0.45) lw += rect(x, y, 5, 6, '');
      for (let y = 384; y < 510; y += 16) for (let x = 1151; x < 1176; x += 9) if (r3() < 0.4) lw += rect(x, y, 4, 6, '');
      k += g('hq-winlit', lw);
      // Philharmonie (weiß, mit Säulen)
      k += rect(1082, 474, 66, 48, 'hq-phil') + path('M1088 480v40M1096 480v40M1104 480v40M1112 480v40M1120 480v40M1128 480v40M1136 480v40M1142 480v40', 'hq-philcol') + rect(1076, 468, 78, 8, 'hq-phil');
      w += g('hq-kirchberg', k);
      // Ferne Häuser am Horizont
      w += path('M936 520h30v-14h22v-10h26v16h30v-22h24v30h40v-12h28v8h36v-18h30v14h40v-6h26v12h32V612H936Z', 'hq-far');
      // Altstadt auf dem Felsen mit der angestrahlten Kathedrale (drei Türme)
      let old = path('M936 612V500L966 486L1000 480L1050 482L1084 496L1104 530L1110 612Z', 'hq-rock');
      old += path('M944 492V458l12-10 12 10v34ZM1058 490v-30l14-12 14 12v34Z', 'hq-house');
      old += path('M988 484V420H1054V484Z', 'hq-cath') + path('M992 420l7-62 7 62ZM1013 420l8-100 8 100ZM1036 420l7-64 7 64Z', 'hq-cath hq-cath2');
      old += path('M998 484v-26a6 6 0 0 1 12 0v26M1032 484v-26a6 6 0 0 1 12 0v26', 'hq-cathwin') + circ(1021, 440, 8, 'hq-cathwin');
      old += rect(950, 466, 5, 7, 'hq-lit') + rect(958, 476, 5, 7, 'hq-lit') + rect(1066, 468, 5, 7, 'hq-lit') + rect(1076, 468, 5, 7, 'hq-lit') + rect(1072, 480, 5, 6, 'hq-lit');
      w += g('hq-old', old);
      // Adolphe-Brücke: großer Steinbogen im Tal
      w += path('M1004 552H1170V612H1150A66 52 0 0 0 1024 612H1004Z', 'hq-stone hq-o2');
      w += path('M1004 548H1170', 'hq-rail2') + [1016, 1046, 1076, 1106, 1136, 1162].map((x) => dot(x, 544, 3, 'hq-lamp')).join('');
      // Rote Brücke (Pont Grande-Duchesse Charlotte) mit fahrenden Autos
      let br = poly([[1098, 456], [1112, 456], [1164, 612], [1150, 612]], 'hq-red hq-o2') + poly([[1262, 456], [1276, 456], [1214, 612], [1200, 612]], 'hq-red hq-o2');
      br += rect(1000, 444, 340, 13, 'hq-red hq-o2') + path('M1000 441H1340', 'hq-rail');
      br += g('hq-cars', rect(1000, 437, 7, 4, 'hq-carf') + rect(1060, 437, 7, 4, 'hq-carf') + rect(1180, 437, 7, 4, 'hq-carf'));
      br += g('hq-cars hq-cars2', rect(1330, 437, 7, 4, 'hq-carb') + rect(1250, 437, 7, 4, 'hq-carb'));
      w += br;
      w += path('M936 612C944 594 962 592 972 600C980 588 1000 590 1006 604C1016 598 1030 600 1034 610H1140C1150 596 1176 594 1186 604C1200 592 1226 596 1234 606C1252 596 1284 598 1294 606C1306 598 1318 600 1324 606V612Z', 'hq-trees');
      add(g('hq-it hq-i12' + (hl === 12 ? ' hq-new' : ''), `<g clip-path="url(#${u}win)">${w}</g>` +
        // Spiegelung im Glas
        poly([[960, 124], [1010, 124], [940, 300], [936, 300], [936, 190]], 'hq-glare') + poly([[1150, 124], [1180, 124], [1080, 400], [1060, 400]], 'hq-glare') +
        // Stahlrahmen (Loft-Fenster)
        rect(930, 118, 400, 492, 'hq-frame hq-frameo') + path('M1060 124V610M1196 124V610M936 246H1324M936 370H1324M936 494H1324', 'hq-mull')));
    }

    /* ---------- Level 4: Graffiti-Wand mit Crew-Namen ---------- */
    if (has(4)) {
      let m = '';
      m += path('M298 176C312 120 410 108 478 126C560 98 664 116 676 176C702 232 694 322 640 358C560 394 420 392 348 368C288 346 272 236 298 176Z', 'hq-g-bg1');
      m += path('M560 110C620 104 680 130 684 190C690 240 660 250 640 232C610 210 560 200 548 160C540 132 546 112 560 110Z', 'hq-g-bg2');
      m += path('M360 368v44M452 380v26M548 382v48M666 338v26', 'hq-g-drip');
      m += path('M300 330C290 300 310 280 330 296', 'hq-g-line');
      // Name
      const lay = nameLayout(CREW.state && CREW.state.crew && CREW.state.crew.name);
      const lines = lay.lines, k = lines.length;
      const maxW = MUR_W;
      let fs = lay.fs;
      const squeeze = fs < FS_MIN;
      if (squeeze) fs = FS_MIN;
      const cy = 246;
      const base = lines.map((_, i) => cy + 0.36 * fs + (i - (k - 1) / 2) * 0.95 * fs);
      const mk = (cls, dx, dy, sw, more) => lines.map((t, i) => {
        const est = t.length * CHAR * fs;
        const tl = squeeze && est > maxW ? ` textLength="${maxW}" lengthAdjust="spacingAndGlyphs"` : '';
        return `<text x="${n1(486 + dx)}" y="${n1(base[i] + dy)}" text-anchor="middle" font-size="${n1(fs)}"${tl} class="${cls}"${sw ? ` stroke-width="${n1(sw)}"` : ''}${more || ''}>${esc(t)}</text>`;
      }).join('');
      const txt = mk('hq-g1', 0, 0) + mk('hq-g0', fs * 0.06, fs * 0.08) + mk('hq-g2', 0, 0) + mk('hq-g3', 0, 0, 0, ` fill="url(#${u}gf)"`);
      m += g('', txt, 'transform="rotate(-5 486 250)"');
      // Krone, Sterne, kleiner Tag
      m += path('M430 138l14-26 18 18 16-26 16 26 18-18 12 26Z', 'hq-g-crown');
      m += path(star(646, 150, 18) + star(318, 300, 12) + star(660, 330, 10), 'hq-g-star');
      m += `<text x="610" y="394" class="hq-g-tag" transform="rotate(-8 610 394)">Saison 1</text>`;
      // Ziegel-Struktur schimmert durch die Farbe
      m += rect(262, 90, 440, 330, '', 0, `fill="url(#${u}mortar)" opacity=".22" clip-path="url(#${u}wall)"`);
      add(item(4, m));
    }

    /* ---------- Level 12: Neonschild ---------- */
    if (has(12)) {
      const bolt = 'M764 244L738 292H760L748 330L786 278H762L778 244Z';
      let ns = line(740, 88, 740, 234, 'hq-wire') + line(900, 88, 900, 234, 'hq-wire');
      ns += rect(714, 232, 212, 112, 'hq-plate', 16);
      const neonTxt = (cls) => `<text x="850" y="318" text-anchor="middle" font-size="78" class="${cls}">HQ</text>`;
      ns += g('', path(bolt, 'hq-neon-y hq-neon-glow') + neonTxt('hq-neon-p hq-neon-glow'), `filter="url(#${u}blur)"`);
      ns += g('hq-flick', path(bolt, 'hq-neon-y') + neonTxt('hq-neon-p') + path(bolt, 'hq-neon-core') + neonTxt('hq-neon-core'));
      add(item(12, ns));
    }

    /* ---------- Licht der Glühbirne auf der Wand (Level 0–9) ---------- */
    if (!has(10)) add(circ(800, 226, 330, '', `fill="url(#${u}halo)" opacity="${L === 0 ? 0.28 : 0.2}"`));

    /* ---------- Level 1: Lichterkette ---------- */
    if (has(1)) {
      const xs = [262, 477, 692, 907, 1122, 1338];
      let wire = 'M262 96';
      let halos = '', bulbs = '';
      for (let i = 0; i < 5; i++) {
        const x0 = xs[i], x2 = xs[i + 1], cx = (x0 + x2) / 2, cyc = 170;
        wire += `Q${cx} ${cyc} ${x2} 96`;
        for (let j = 1; j <= 6; j++) {
          const t = j / 7;
          const bx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x2;
          const by = (1 - t) * (1 - t) * 96 + 2 * (1 - t) * t * cyc + t * t * 96 + 9;
          halos += circ(bx, by, 30, 'hq-tw', `fill="url(#${u}halo)"`);
          bulbs += dot(bx, by, 7, 'hq-bulb');
        }
      }
      add(item(1, rect(250, 64, 1100, 300, '', 0, `fill="url(#${u}warm)"`) + path(wire, 'hq-wirel') + g('hq-halos', halos) + g('hq-bulbs', bulbs)));
    }

    /* ---------- Spinnweben (nur ganz am Anfang) ---------- */
    if (L <= 2) {
      const web = (x, sx) => path(`M${x} 64l${80 * sx} 0M${x} 64l${70 * sx} 44M${x} 64l${34 * sx} 72M${x} 64l0 84` +
        `M${x + 26 * sx} 64q${-4 * sx} 12 ${-2 * sx} 14q${-8 * sx} 8 ${-12 * sx} 11q${-4 * sx} 6 ${-12 * sx} 5` +
        `M${x + 54 * sx} 64q${-6 * sx} 18 ${-6 * sx} 30q${-14 * sx} 10 ${-24 * sx} 20q${-10 * sx} 6 ${-24 * sx} 12`, 'hq-web');
      add(web(252, 1) + web(1348, -1));
    }

    /* ---------- Level 6: Hängepflanze rechts ---------- */
    if (has(6)) {
      let hp = line(1474, 0, 1446, 206, 'hq-rope') + line(1474, 0, 1502, 206, 'hq-rope') + line(1474, 0, 1474, 206, 'hq-rope');
      hp += path('M1432 204H1516L1506 244C1500 252 1448 252 1442 244Z', 'hq-f3 hq-o');
      hp += path('M1440 214H1508', 'hq-potband');
      const vine = (x, len, sway) => {
        let s = path(`M${x} 214C${x + sway} ${214 + len * 0.4} ${x - sway} ${214 + len * 0.7} ${x + sway * 0.5} ${214 + len}`, 'hq-vine');
        for (let j = 1; j <= 5; j++) {
          const t = j / 5, yy = 214 + len * t, xx = x + Math.sin(t * 5) * sway * 0.6;
          s += `<use href="#${u}leafs" class="hq-f${j % 2 ? '' : '2'} hq-o1" transform="translate(${n1(xx)} ${n1(yy)}) rotate(${j % 2 ? 150 : -150})"/>`;
        }
        return s;
      };
      hp += g('hq-sway', vine(1446, 120, 12) + vine(1474, 170, -14) + vine(1500, 96, 10));
      hp += [-50, -20, 20, 50].map((r, i) => `<use href="#${u}leaf" class="hq-f${i % 2 ? '2' : ''} hq-o1" transform="translate(${1462 + i * 8} 208) rotate(${r}) scale(.42)"/>`).join('');
      add(item(6, hp));
    }

    /* ---------- Gerümpel am Anfang ---------- */
    if (L <= 3) {
      // Leiter, lehnt an der Wand
      let la = path('M300 612L336 250M364 612L396 250', 'hq-ladder');
      for (let y = 290; y < 600; y += 44) la += line(300 + (612 - y) * 0.0994 + 2, y, 364 + (612 - y) * 0.0884 - 2, y, 'hq-ladder2');
      add(g('hq-junk', la));
      // Farbeimer
      add(g('hq-junk', rect(414, 588, 44, 44, 'hq-bucket hq-o', 4) + ell(436, 588, 22, 6, 'hq-bucket2 hq-o') + path('M420 600v14M446 600v8', 'hq-paintdrip') +
        rect(470, 604, 34, 28, 'hq-bucket hq-o', 4) + ell(487, 604, 17, 5, 'hq-bucket2 hq-o')));
    }
    if (L <= 2) add(g('hq-junk', path('M232 660L270 356', 'hq-broom') + path('M218 700L226 648H246L256 700Z', 'hq-broom2 hq-o')));
    if (has(4)) {
      // Sprühdosen vor der Graffiti-Wand
      const cans = ['hq-cy', 'hq-cp', 'hq-cg', 'hq-cb'];
      add(g('hq-cans', cans.map((c, i) => rect(302 + i * 20, 600 - (i % 2) * 4, 13, 30 + (i % 2) * 4, c + ' hq-o1', 3) + rect(304 + i * 20, 594 - (i % 2) * 4, 9, 7, 'hq-cap', 2)).join('')));
    }
    if (L <= 6) {
      // Alter Reifen vor dem Tor
      add(g('hq-junk', shadow(1216, 644, 50, 8) + circ(1216, 600, 42, 'hq-tire hq-o') + circ(1216, 600, 20, 'hq-hub hq-o') + path('M1180 580l8 6M1178 604l10 0M1188 628l7-6M1252 580l-8 6M1254 604l-10 0M1244 628l-7-6M1216 560v10M1216 640v-10', 'hq-tread')));
    }

    /* ---------- Level 12: Mondlicht fällt auf den Boden ---------- */
    if (has(12)) add(g('hq-i12' + (hl === 12 ? ' hq-new' : ''), poly([[936, 612], [1324, 612], [1270, 720], [800, 720]], 'hq-moonlight')));

    /* ---------- Level 3: Teppich ---------- */
    if (has(3)) {
      add(item(3, ell(720, 734, 334, 66, 'hq-f hq-o') + ell(720, 732, 296, 56, 'hq-f3') + ell(720, 731, 250, 46, 'hq-f2') + ell(720, 730, 190, 34, 'hq-f') +
        ell(720, 729, 118, 21, 'hq-f3') + ell(720, 728, 52, 9, 'hq-f2') + ell(720, 734, 334, 66, '', `fill="url(#${u}fl)" opacity=".5"`)));
    }

    /* ---------- Level 5: Musikbox ---------- */
    if (has(5)) {
      let sp = shadow(430, 634, 64, 10);
      sp += poly([[472, 404], toward(472, 404, 0.05), toward(472, 632, 0.05), [472, 632]], 'hq-f hq-o') + poly([[472, 404], toward(472, 404, 0.05), toward(472, 632, 0.05), [472, 632]], 'hq-dk');
      sp += rect(384, 392, 50, 14, 'hq-f hq-o', 7) + rect(388, 402, 88, 232, 'hq-f hq-o', 14);
      sp += rect(396, 412, 72, 10, 'hq-f2 hq-led', 5);
      const woofer = (cy, r) => g('hq-woof', circ(432, cy, r + 6, 'hq-ring') + circ(432, cy, r, 'hq-cone hq-o1') + circ(432, cy, r * 0.5, 'hq-cone2') + circ(432, cy, r * 0.2, 'hq-cap2'));
      sp += woofer(474, 30) + woofer(566, 30);
      sp += circ(456, 612, 4, 'hq-f2');
      add(item(5, sp));
    }

    /* ---------- Level 2: Sofa ---------- */
    if (has(2)) {
      let so = shadow(700, 632, 226, 16);
      so += rect(516, 620, 14, 14, 'hq-leg') + rect(870, 620, 14, 14, 'hq-leg');
      so += rect(510, 448, 380, 128, 'hq-f hq-o', 28);
      so += path('M530 462Q700 450 870 462', 'hq-seam');
      so += path('M700 460V560', 'hq-fold');
      so += rect(500, 580, 400, 44, 'hq-f hq-o', 12) + rect(500, 600, 400, 24, 'hq-dk', 0);
      so += rect(542, 536, 158, 52, 'hq-f hq-o', 16) + rect(700, 536, 158, 52, 'hq-f hq-o', 16) + rect(548, 540, 146, 12, 'hq-lt', 6) + rect(706, 540, 146, 12, 'hq-lt', 6);
      so += g('', rect(0, 0, 78, 68, 'hq-f2 hq-o', 16) + path('M8 34H70', 'hq-fold'), 'transform="translate(560 482) rotate(-10)"');
      so += g('', rect(0, 0, 70, 62, 'hq-f3 hq-o', 16) + path('M35 6V56', 'hq-fold'), 'transform="translate(768 486) rotate(9)"');
      so += rect(486, 508, 64, 114, 'hq-f hq-o', 24) + rect(850, 508, 64, 114, 'hq-f hq-o', 24);
      so += rect(492, 512, 52, 14, 'hq-lt', 7) + rect(856, 512, 52, 14, 'hq-lt', 7);
      // Decke über der Armlehne
      so += path('M846 522C852 504 904 500 916 520L922 594C914 602 908 592 900 600C892 608 886 596 878 604C870 612 864 600 858 606L854 552C854 540 850 530 846 522Z', 'hq-f4 hq-o') + path('M852 546C870 540 900 538 918 542M855 572C872 566 902 564 920 568', 'hq-stripe');
      add(item(2, so));
    }

    /* ---------- Level 6: große Pflanze neben dem Sofa ---------- */
    if (has(6)) {
      let pf = shadow(936, 636, 50, 9);
      const leaves = [[-62, 0.95, 'hq-f2'], [-30, 1.15, 'hq-f'], [-6, 1.3, 'hq-f2'], [22, 1.2, 'hq-f'], [52, 1.0, 'hq-f2'], [-45, 0.8, 'hq-f'], [36, 0.82, 'hq-f']];
      pf += g('hq-sway2', leaves.map(([r, s, c]) => `<use href="#${u}leaf" class="${c} hq-o1" transform="translate(936 584) rotate(${r}) scale(${s})"/>`).join('') +
        path('M936 584L906 500M936 584L932 480M936 584L962 494', 'hq-stem'));
      pf += path('M900 574H972L962 634H910Z', 'hq-f3 hq-o') + rect(896, 568, 80, 14, 'hq-f3 hq-o', 5) + rect(896, 574, 80, 8, 'hq-dk', 0);
      add(item(6, pf));
    }

    /* ---------- Kartons (Level 0–1) ---------- */
    if (L <= 1) {
      let bx = shadow(700, 634, 150, 12);
      bx += box3d(590, 540, 132, 92, 0.1, 'hq-card') + rect(648, 540, 16, 92, 'hq-tape');
      bx += box3d(612, 470, 96, 70, 0.1, 'hq-card') + rect(652, 470, 14, 70, 'hq-tape');
      bx += box3d(738, 570, 94, 62, 0.1, 'hq-card hq-card2') + path('M752 592h40M752 604h28', 'hq-scrib');
      add(g('hq-junk', bx));
    }

    /* ---------- Glühbirne (0–9) oder Discokugel (10+) ---------- */
    if (!has(10)) {
      let b = poly([[790, 236], [810, 236], [1010, 612], [590, 612]], 'hq-cone-light', `opacity="${L === 0 ? 0.12 : 0.07}"`);
      b += line(800, 0, 800, 198, 'hq-cord') + rect(791, 196, 18, 18, 'hq-socket', 3);
      b += circ(800, 228, 60, 'hq-tw2', `fill="url(#${u}halo)"`) + circ(800, 228, 16, 'hq-glass hq-o1') + path('M794 224q6 8 12 0', 'hq-filament');
      add(g('hq-bulbg', b));
    } else {
      let db = '';
      // Lichtstrahlen
      db += g('hq-beams', poly([[800, 164], [480, 610], [560, 610]], 'hq-beam hq-bp') + poly([[800, 164], [1180, 612], [1260, 612]], 'hq-beam hq-bb') + poly([[800, 164], [300, 330], [320, 380]], 'hq-beam hq-by'));
      db += line(800, 0, 800, 118, 'hq-cord') + rect(792, 112, 16, 10, 'hq-socket', 2);
      db += circ(800, 164, 46, '', `fill="url(#${u}dsc)"`);
      db += g('', rect(772, 136, 8, 8, 'hq-fp') + rect(812, 176, 8, 8, 'hq-fb') + rect(792, 196, 8, 8, 'hq-fy') + rect(830, 146, 8, 8, 'hq-fb') + rect(760, 176, 8, 8, 'hq-fy'), `clip-path="url(#${u}dball)"`);
      db += circ(800, 164, 46, 'hq-o1', `fill="url(#${u}ball)"`);
      db += g('hq-spk', path(star(782, 146, 12), 'hq-sparkle')) + g('hq-spk hq-spk2', path(star(826, 186, 8), 'hq-sparkle'));
      // Lichtpunkte im Raum
      const r4 = rng(5);
      const cols = ['hq-dy', 'hq-dp', 'hq-db', 'hq-dw', 'hq-dg'];
      let dots = '';
      for (let i = 0; i < 26; i++) {
        const x = 60 + r4() * 1480, y = 40 + r4() * 820;
        if (has(12) && x > 926 && x < 1334 && y > 114 && y < 612) continue; // nicht aufs Fensterglas
        const onFloor = y > 620;
        dots += ell(x, y, onFloor ? 9 : 6, onFloor ? 4 : 6, cols[i % 5]);
      }
      db += g('hq-dots', dots);
      add(item(10, db));
    }

    /* ---------- Level 7: Arcade-Automat ---------- */
    if (has(7)) {
      let ar = shadow(170, 808, 130, 16) + circ(150, 820, 150, '', `fill="url(#${u}cool)" opacity=".35"`);
      const side = [[228, 440], toward(228, 440, 0.12), toward(228, 806, 0.12), [228, 806]];
      ar += poly(side, 'hq-f hq-o') + poly(side, 'hq-dk');
      ar += poly([[228, 560], toward(228, 560, 0.12), toward(228, 610, 0.12), [228, 610]], 'hq-f2 hq-o1');
      ar += poly([[64, 440], [228, 440], toward(228, 440, 0.12), toward(64, 440, 0.12)], 'hq-f hq-o') + poly([[64, 440], [228, 440], toward(228, 440, 0.12), toward(64, 440, 0.12)], 'hq-lt');
      ar += rect(64, 440, 164, 366, 'hq-f hq-o', 6);
      ar += rect(70, 446, 152, 48, 'hq-f3 hq-o1', 4) + `<text x="146" y="483" text-anchor="middle" class="hq-marq">PLAY</text>`;
      ar += rect(76, 504, 140, 122, 'hq-bezel hq-o1', 8);
      ar += rect(86, 514, 120, 102, 'hq-screen', 6);
      // Mini-Spiel auf dem Bildschirm
      const inv = 'M-12 -8h4v4h4v-4h8v4h4v-4h4v8h4v8h-4v4h-4v-4h-16v4h-4v-4h-4v-8h4z';
      ar += g('hq-game', path(inv, 'hq-inv', 'transform="translate(146 552)"'));
      ar += rect(140, 600, 12, 6, 'hq-ship') + rect(144, 596, 4, 4, 'hq-ship');
      ar += `<text x="92" y="530" class="hq-score">HI 9999</text>`;
      ar += rect(86, 514, 120, 102, 'hq-scanl', 6);
      // Steuerpult
      ar += poly([[58, 640], [234, 640], [246, 664], [46, 664]], 'hq-f2 hq-o') + rect(46, 664, 200, 20, 'hq-f2 hq-o', 3) + rect(46, 672, 200, 12, 'hq-dk', 0);
      ar += line(98, 654, 94, 628, 'hq-stick') + circ(94, 626, 9, 'hq-cp hq-o1');
      ar += ell(148, 656, 9, 5, 'hq-cy hq-o1') + ell(174, 650, 9, 5, 'hq-cg hq-o1') + ell(200, 656, 9, 5, 'hq-cp hq-o1');
      ar += rect(112, 714, 68, 66, 'hq-bezel hq-o1', 5) + rect(126, 732, 10, 22, 'hq-coin') + rect(156, 732, 10, 22, 'hq-coin');
      ar += path('M64 700H228', 'hq-seam');
      add(item(7, ar));
    }

    /* ---------- Level 9: Tischkicker ---------- */
    if (has(9)) {
      let ki = shadow(1112, 866, 190, 14);
      const bl = toward(950, 790, 0.2);
      ki += rect(bl[0] - 7, bl[1] - 4, 14, 62, 'hq-leg hq-o1');
      const tFL = [950, 732], tFR = [1270, 732], tBL = toward(950, 732, 0.2), tBR = toward(1270, 732, 0.2);
      ki += poly([tFL, tBL, toward(950, 790, 0.2), [950, 790]], 'hq-f hq-o') + poly([tFL, tBL, toward(950, 790, 0.2), [950, 790]], 'hq-dk');
      ki += poly([tFL, tFR, tBR, tBL], 'hq-f hq-o');
      // Spielfeld
      const iFL = [966, 726], iFR = [1254, 726], iBL = toward(966, 726, 0.17), iBR = toward(1254, 726, 0.17);
      ki += poly([iFL, iFR, iBR, iBL], 'hq-field');
      const mF = [(iFL[0] + iFR[0]) / 2, 726], mB = [(iBL[0] + iBR[0]) / 2, iBL[1]];
      ki += line(mF[0], mF[1], mB[0], mB[1], 'hq-fline') + ell((mF[0] + mB[0]) / 2, (mF[1] + mB[1]) / 2, 26, 10, 'hq-fline hq-nofill');
      ki += circ(1082, 702, 5, 'hq-ball');
      // Stangen mit Figuren (Blau gegen Pink)
      const teams = ['A', 'A', 'B', 'A', 'B', 'A', 'B', 'B'];
      const count = [1, 2, 3, 3, 3, 3, 2, 1];
      let rods = '';
      for (let i = 0; i < 8; i++) {
        const xf = 976 + i * 38;
        const f = [xf, 742], b = toward(xf, 742, 0.21), hEnd = [n1(xf + (xf - VX) * 0.11), n1(742 + (742 - VY) * 0.11)];
        rods += line(b[0], b[1], f[0], f[1], 'hq-rod');
        const c = count[i];
        for (let j = c; j >= 1; j--) {
          const t = j / (c + 1);
          const p = [b[0] + (f[0] - b[0]) * t, b[1] + (f[1] - b[1]) * t];
          const s = 0.9 + 0.3 * t;
          rods += g('', rect(-7, -26, 14, 28, (teams[i] === 'A' ? 'hq-ta' : 'hq-tb') + ' hq-o1', 5) + circ(0, -32, 7, 'hq-skin hq-o1'), `transform="translate(${n1(p[0])} ${n1(p[1])}) scale(${n1(s)})"`);
        }
        rods += line(f[0], f[1], hEnd[0], hEnd[1], 'hq-grip');
      }
      ki += rods;
      ki += rect(950, 732, 320, 58, 'hq-f hq-o', 4) + rect(950, 752, 320, 10, 'hq-f2', 0);
      ki += rect(958, 790, 18, 74, 'hq-leg hq-o1') + rect(1244, 790, 18, 74, 'hq-leg hq-o1') + rect(976, 836, 268, 8, 'hq-leg');
      add(item(9, ki));
    }

    /* ---------- Level 8: Kühlschrank mit Snacks ---------- */
    if (has(8)) {
      let fr = shadow(1450, 812, 130, 14) + ell(1470, 832, 120, 26, '', `fill="url(#${u}cool)" opacity=".7"`);
      const sideF = [[1392, 468], toward(1392, 468, 0.12), toward(1392, 812, 0.12), [1392, 812]];
      fr += poly(sideF, 'hq-f hq-o') + poly(sideF, 'hq-dk');
      const topF = [[1392, 468], [1552, 468], toward(1552, 468, 0.12), toward(1392, 468, 0.12)];
      fr += poly(topF, 'hq-f hq-o') + poly(topF, 'hq-lt');
      // Popcorn oben drauf
      fr += path('M1432 420H1484L1478 466H1438Z', 'hq-pop hq-o1') + path('M1444 420L1446 466M1458 420V466M1472 420L1470 466', 'hq-popstripe');
      fr += [[1438, 416], [1450, 410], [1462, 414], [1474, 408], [1482, 416], [1456, 402], [1468, 400]].map(([x, y]) => circ(x, y, 8, 'hq-corn hq-o1')).join('');
      fr += rect(1392, 468, 160, 344, 'hq-f hq-o', 10);
      fr += rect(1406, 484, 132, 256, 'hq-fin hq-o1', 6, `fill="url(#${u}fr)"`);
      // Regale mit Dosen, Flaschen, Chips, Obst
      const cc = ['hq-cp', 'hq-cb', 'hq-cy', 'hq-cg', 'hq-ca', 'hq-cp'];
      let sh = '';
      for (let i = 0; i < 6; i++) sh += rect(1414 + i * 20, 512, 15, 32, cc[i] + ' hq-o1', 3) + rect(1416 + i * 20, 516, 11, 5, 'hq-canl', 0);
      sh += rect(1410, 546, 124, 5, 'hq-shelf');
      for (let i = 0; i < 5; i++) sh += path(`M${1418 + i * 24} 608v-24l4-6v-8h6v8l4 6v24z`, (i % 2 ? 'hq-bot1' : 'hq-bot2') + ' hq-o1');
      sh += rect(1410, 610, 124, 5, 'hq-shelf');
      sh += path('M1416 672L1420 636H1450L1454 672Z', 'hq-cy hq-o1') + path('M1460 672L1464 632H1496L1500 672Z', 'hq-cp hq-o1') + path('M1504 672L1508 640H1530L1532 672Z', 'hq-cg hq-o1');
      sh += path('M1422 652H1448M1466 648H1494', 'hq-chipline');
      sh += rect(1410, 674, 124, 5, 'hq-shelf');
      sh += circ(1428, 722, 12, 'hq-apple hq-o1') + circ(1452, 724, 11, 'hq-apple2 hq-o1') + rect(1474, 708, 26, 28, 'hq-yog hq-o1', 4) + rect(1506, 712, 22, 24, 'hq-yog2 hq-o1', 4);
      fr += sh;
      fr += poly([[1420, 484], [1452, 484], [1406, 600], [1406, 540]], 'hq-glare');
      fr += rect(1530, 540, 8, 130, 'hq-handle hq-o1', 4);
      fr += rect(1406, 750, 132, 48, 'hq-bezel hq-o1', 4) + path('M1418 764H1526M1418 774H1526M1418 784H1526', 'hq-grill');
      fr += rect(1508, 474, 30, 8, 'hq-f2', 3);
      add(item(8, fr));
    }

    /* ---------- Level 11: Sitzsäcke ---------- */
    if (has(11)) {
      let bb = shadow(340, 868, 96, 14) + shadow(512, 884, 96, 12);
      bb += path('M256 866C236 818 262 750 336 746C410 742 444 804 428 862C384 884 302 886 256 866Z', 'hq-f hq-o');
      bb += path('M286 798C316 778 372 778 400 800', 'hq-dent') + path('M290 770C300 758 322 752 338 752', 'hq-shine');
      // Controller liegt drauf
      bb += path('M330 800c6-10 44-10 50 0l6 14c2 6-6 10-12 4l-6-6h-26l-6 6c-6 6-14 2-12-4z', 'hq-pad hq-o1') + circ(344, 804, 3, 'hq-cp') + circ(368, 804, 3, 'hq-cg');
      bb += path('M430 882C412 838 440 778 508 774C576 770 606 830 592 880C548 898 474 900 430 882Z', 'hq-f2 hq-o');
      bb += path('M458 818C490 800 540 800 566 820', 'hq-dent') + path('M460 796C472 786 492 780 508 780', 'hq-shine');
      add(item(11, bb));
    }

    /* ---------- Level 5: Musiknoten ---------- */
    if (has(5)) {
      const note = (cls) => g(cls, path('M0 0c-6-6-20 0-16 8 4 6 16 2 16-6V-34l18 6v26c-6-6-20 0-16 8 4 6 16 2 16-6V-36L0-44z', 'hq-note'));
      add(g('hq-i5', g('', note('hq-nt hq-nt1'), 'transform="translate(500 424)"') + g('', note('hq-nt hq-nt2'), 'transform="translate(356 396) scale(.8)"') + g('', note('hq-nt hq-nt3'), 'transform="translate(530 386) scale(.7)"')));
    }

    /* ---------- Staub in der Luft (0–2) ---------- */
    if (L <= 2) {
      const r5 = rng(9);
      let ds = '';
      for (let i = 0; i < 16; i++) ds += dot(640 + r5() * 320, 260 + r5() * 330, 1.5 + r5() * 2.5, 'hq-mote hq-m' + (i % 4));
      add(g('hq-dust', ds));
    }

    /* ---------- Licht & Stimmung: je höher das Level, desto heller ---------- */
    const dark = [0.78, 0.66, 0.6, 0.55, 0.5, 0.46, 0.42, 0.38, 0.35, 0.32, 0.3, 0.27, 0.24][L];
    add(rect(0, 0, 1600, 900, 'hq-vigr', 0, `fill="url(#${u}vig)" opacity="${dark}"`));

    /* ---------- Glanz für das neueste Teil ---------- */
    if (hl) {
      const [bx, by, bw, bh] = BOX[hl];
      const cx = bx + bw / 2, cy = by + bh / 2, r = Math.max(bw, 220) * 0.62;
      const sy = n1(Math.max(bh, 160) / Math.max(bw, 220));
      out.splice(1, 0, `<defs><radialGradient id="${u}spot" cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}" gradientUnits="userSpaceOnUse" gradientTransform="translate(${n1(cx)} ${n1(cy)}) scale(1 ${sy}) translate(${n1(-cx)} ${n1(-cy)})"><stop offset=".6" class="hq-sd" stop-opacity="0"/><stop offset="1" class="hq-sd" stop-opacity=".48"/></radialGradient></defs>`);
      let s = rect(0, 0, 1600, 900, 'hq-spot', 0, `fill="url(#${u}spot)"`);
      const sp = [[bx - 6, by + 18, 22], [bx + bw + 4, by + 30, 16], [bx + bw - 16, by + bh - 6, 20], [bx + 18, by + bh + 4, 14]];
      s += sp.map(([x, y, z], i) => g('', g('hq-spk hq-spk' + (i + 1), path(star(0, 0, z), 'hq-sparkle hq-sparkle2')), `transform="translate(${n1(Math.max(20, Math.min(1580, x)))} ${n1(Math.max(20, Math.min(880, y)))})"`)).join('');
      const bp = BADGE[hl] || [cx, by - 40];
      const tx = n1(Math.max(90, Math.min(1510, bp[0]))), ty = n1(Math.max(46, bp[1]));
      s += g('', g('hq-badge', rect(-82, -34, 164, 68, 'hq-badgebg', 34) + `<text x="0" y="14" text-anchor="middle" class="hq-badgetx">NEU!</text>`), `transform="translate(${tx} ${ty})"`);
      add(s);
    }

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 1600 900');
    svg.setAttribute('class', 'hq-scene' + (hl ? ' hq-hl' : ''));
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('role', 'img');
    const names = ITEMS.filter((it, i) => owns(i + 1)).map((it) => it.name);
    svg.setAttribute('aria-label', 'Crew-HQ auf Level ' + L + (names.length ? ': ' + names.join(', ') : ': eine leere, staubige Garage'));
    svg.innerHTML = out.join('');
    ghost.forEach((n) => { if (!owns(n)) svg.querySelectorAll('.hq-i' + n).forEach((e) => e.classList.add('hq-ghost')); });
    return svg;
  }

  CREW.base = { items: ITEMS, renderScene };
})();
