/* CREW – Icons (eigene, einfache SVG-Striche) und Wetter-Bilder. */
(function () {
  'use strict';
  const CREW = window.CREW;

  const P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
    pause: '<rect x="6.5" y="5" width="3.5" height="14" rx="1"/><rect x="14" y="5" width="3.5" height="14" rx="1"/>',
    help: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
    speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    speakerOff: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    sound: '<path d="M9 17.5V6l11-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 19.5c.8-3.3 3.3-5 6.5-5s5.7 1.7 6.5 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M16.5 14.5c2.6 0 4.4 1.5 5 4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1-3.8 3.8-6 7.5-6s6.5 2.2 7.5 6"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    play: '<path d="M7 4.5v15l12.5-7.5z"/>',
    shuffle: '<path d="M3 7h3.5c4 0 5 10 9 10H21M3 17h3.5c1.7 0 2.8-1.8 3.8-4M13.7 11c1-2.2 2.1-4 3.8-4H21"/><path d="m18 4 3 3-3 3M18 14l3 3-3 3"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    leaf: '<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>',
    sparkle: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/><path d="m6.5 6.5 2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5.5H4.5a3 3 0 0 0 3.5 4M16 5.5h3.5a3 3 0 0 1-3.5 4"/><path d="M12 13v4M8.5 20.5h7M10 17h4"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.6A10 10 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.6M6.4 6.4C3.9 8 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    base: '<path d="M3 20.5h18"/><path d="M5 20.5V9l7-5 7 5v11.5"/><rect x="9.5" y="13" width="5" height="7.5"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/>',
    heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z"/>',
    copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
  };

  function icon(name, size) {
    const s = size || 26;
    const span = document.createElement('span');
    span.className = 'ic';
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-grid';
    span.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${P[name] || P.star}</svg>`;
    return span;
  }

  /* ---------- Wetter (Check-in) ---------- */
  const SUN = '#ffc93c', CLOUD = '#e9e6ff', CLOUD2 = '#b9b3e6', RAIN = '#3da5ff', BOLT = '#ffe066', INK = '#0e0a26', FOG = '#cfd3e6';
  const cloud = (x, y, s, fill) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M14 40h40a13 13 0 0 0 0-26 18 18 0 0 0-34-4A14 14 0 0 0 14 40z" fill="${fill}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/></g>`;
  const sun = (cx, cy, r) => {
    let rays = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      rays += `<path d="M${cx + Math.cos(a) * (r + 6)} ${cy + Math.sin(a) * (r + 6)}L${cx + Math.cos(a) * (r + 14)} ${cy + Math.sin(a) * (r + 14)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${cx + Math.cos(a) * (r + 6)} ${cy + Math.sin(a) * (r + 6)}L${cx + Math.cos(a) * (r + 14)} ${cy + Math.sin(a) * (r + 14)}" stroke="${SUN}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
    return rays + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SUN}" stroke="${INK}" stroke-width="3.5"/>`;
  };
  const WEATHER = [
    { id: 'sonne', label: 'Sonnig', hint: 'Mir geht es richtig gut.', svg: sun(40, 40, 18) },
    { id: 'wolkig', label: 'Heiter bis wolkig', hint: 'Ganz okay.', svg: sun(30, 30, 13) + cloud(18, 28, 0.75, CLOUD) },
    { id: 'grau', label: 'Grau', hint: 'Geht so, eher meh.', svg: cloud(8, 14, 0.8, CLOUD2) + cloud(20, 26, 0.75, CLOUD) },
    { id: 'regen', label: 'Regen', hint: 'Heute ist es schwer.', svg: cloud(10, 8, 0.9, CLOUD2) + `<path d="M26 54l-4 10M40 54l-4 10M54 54l-4 10" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M26 54l-4 10M40 54l-4 10M54 54l-4 10" stroke="${RAIN}" stroke-width="3.5" stroke-linecap="round"/>` },
    { id: 'gewitter', label: 'Gewitter', hint: 'In mir brodelt es.', svg: cloud(10, 6, 0.9, '#8f86c9') + `<path d="M42 44 32 60h9l-5 14 14-19h-9l5-11z" fill="${BOLT}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>` },
    { id: 'nebel', label: 'Nebel', hint: 'Müde, leer oder weiß nicht.', svg: `<g stroke="${INK}" stroke-width="9" stroke-linecap="round"><path d="M14 30h52M22 44h44M14 58h40"/></g><g stroke="${FOG}" stroke-width="5" stroke-linecap="round"><path d="M14 30h52M22 44h44M14 58h40"/></g>` },
  ];
  function weatherIcon(id, size) {
    const w = WEATHER.find((x) => x.id === id) || WEATHER[0];
    const s = size || 72;
    const span = document.createElement('span');
    span.className = 'wx';
    span.style.width = s + 'px';
    span.style.height = s + 'px';
    span.innerHTML = `<svg viewBox="0 0 80 80" role="img" aria-label="${w.label}">${w.svg}</svg>`;
    return span;
  }

  /* ---------- CREW-Logo ---------- */
  const LOGO = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="9" r="2.6"/><circle cx="17" cy="9" r="2.6"/><circle cx="12" cy="6.5" r="2.6"/><path d="M3 19c.6-3 2.2-4.8 4-5.2M21 19c-.6-3-2.2-4.8-4-5.2M7.5 20c.8-3.6 2.4-5.6 4.5-5.6s3.7 2 4.5 5.6"/></svg>';

  CREW.icon = icon;
  CREW.WEATHER = WEATHER;
  CREW.weatherIcon = weatherIcon;
  CREW.LOGO = LOGO;
})();
