// Icon-Satz der Oberfläche: kleine SVG-Strichzeichnungen (24×24), keine Emojis – wirkt cool statt süß (DESIGN §1).
//   icon('muschel') → SVG-String (currentColor); icon('herz', { size: 32, cls: 'x' })
//   ICONS: alle Namen (Figuren-Icons, Gefühls-Symbole, Verben, Tagebuch-Seiten, Bedienung). Unbekannt → 'punkt'.
const P = {
  // ---- Figuren (DESIGN §13) ----
  anker: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 7v13M5 12H3a9 9 0 0 0 18 0h-2M8 20l4-2 4 2',
  muschel: 'M4 16c0-6 4-10 8-10s8 4 8 10H4zM12 6v10M8 8l1 8M16 8l-1 8M4 16c2 3 14 3 16 0',
  kamera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  surfbrett: 'M6 20C4 14 8 6 18 3c2 6-1 14-7 18-2 1-4 0-5-1zM6 20l4-5M13 9l2 2',
  trommel: 'M4 8c0 2 16 2 16 0s-16-2-16 0zM4 8v9c0 2 16 2 16 0V8M8 10v8M16 10v8M9 4l3 3M18 3l-3 4',
  windrad: 'M12 12v9M12 12c-1-5 1-8 4-8-1 4-2 6-4 8zM12 12c5-1 8 1 8 4-4-1-6-2-8-4zM12 12c1 5-1 8-4 8 1-4 2-6 4-8zM12 12c-5 1-8-1-8-4 4 1 6 2 8 4z',
  laterne: 'M9 3h6M10 3v3h4V3M8 6h8l1 3v8l-1 3H8l-1-3V9zM12 10a2 2 0 0 0-1 4l1 1 1-1a2 2 0 0 0-1-4z',
  stein: 'M7 19c-3 0-4-3-3-6 1-4 3-8 8-8 4 0 8 3 8 8 0 3-2 6-5 6z',
  spraydose: 'M9 7h6v14H9zM10 4h4v3h-4zM9 12h6M17 4l2-2M18 6h3M16 3v-1',
  giesskanne: 'M4 10h11v9H4zM15 12l5-3M8 10V7a3 3 0 0 1 6 0v3M3 14l1 5',
  flamme: 'M12 21c-4 0-7-3-7-7 0-3 2-5 3-7 1 2 2 3 3 3 0-3 1-6 3-8 1 4 5 6 5 12 0 4-3 7-7 7zM12 21c-2 0-3-2-3-4s2-3 3-5c1 2 3 3 3 5s-1 4-3 4z',
  stern: 'M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z',
  chip: 'M7 7h10v10H7zM10 10h4v4h-4zM7 3v4M12 3v4M17 3v4M7 17v4M12 17v4M17 17v4M3 7h4M3 12h4M3 17h4M17 7h4M17 12h4M17 17h4',
  kompass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15 9l-2 5-4 2 2-5z',
  hammer: 'M4 20l8-8M12 12l2 2M9 5l6 6 4-4-3-3-2 2-2-2-1 1z',
  motte: 'M12 4v16M12 8c-3-4-8-4-8 0s5 6 8 6M12 8c3-4 8-4 8 0s-5 6-8 6M12 14c-2 0-5 2-5 5M12 14c2 0 5 2 5 5M10 4l-2-2M14 4l2-2',
  glimm: 'M5 14c1-4 4-7 8-7 3 0 5 2 5 4 0 3-3 4-5 4-3 0-4 2-6 3M18 11c2 0 3 1 3 3M8 8l-1-3M11 7l1-3M9 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  senait: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 3v18M3 12h18',
  // ---- Gefühls-Symbole (auch für Farbenblinde, DESIGN §1) ----
  sonne: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
  zickzack: 'M13 2L6 13h6l-1 9 7-12h-6z',
  tropfen: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z',
  wirbel: 'M12 12a1 1 0 0 1 2 0c0 2-2 3-4 3-3 0-5-2-5-5 0-4 3-7 7-7 5 0 9 4 9 9 0 6-5 10-11 10',
  // ---- Verben und Dialog ----
  herz: 'M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z',
  frage: 'M9 9a3 3 0 1 1 4 3c-1 .5-1 1-1 2M12 18h.01',
  hand: 'M8 12V6a1.5 1.5 0 0 1 3 0v5M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V6a1.5 1.5 0 0 1 3 0v8c0 4-3 7-7 7s-6-3-6-6v-4a1.5 1.5 0 0 1 3 0v2',
  stopp: 'M8 3h8l5 5v8l-5 5H8l-5-5V8zM8 12h8',
  seil: 'M6 3c0 4 3 4 3 8s-3 4-3 8M12 3c0 4 3 4 3 8s-3 4-3 8M18 3c0 4-3 4-3 8s3 4 3 8',
  sprechblase: 'M4 5h16v11h-7l-5 4v-4H4z',
  ohr: 'M8 17a5 5 0 0 0 4 4c3 0 4-3 4-6 0-2 3-3 3-7a7 7 0 0 0-14 0M11 8a3 3 0 0 1 5 2c0 2-2 2-2 4',
  weiter: 'M9 6l6 6-6 6',
  zurueck: 'M15 6l-6 6 6 6',
  rueckzug: 'M20 12H6M11 7l-5 5 5 5M4 4v16',
  hilfe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v6M12 16h.01',
  lauschen: 'M12 4a8 8 0 0 0-8 8v4a2 2 0 0 0 2 2h2v-6H5M12 4a8 8 0 0 1 8 8v4a2 2 0 0 1-2 2h-2v-6h3',
  // ---- Bedienung ----
  x: 'M6 6l12 12M18 6L6 18',
  pause: 'M8 5v14M16 5v14',
  play: 'M7 5l12 7-12 7z',
  lautsprecher: 'M4 10v4h3l5 4V6l-5 4zM15 9a4 4 0 0 1 0 6M17.5 6.5a8 8 0 0 1 0 11',
  stumm: 'M4 10v4h3l5 4V6l-5 4zM16 9l5 6M21 9l-5 6',
  check: 'M5 12l5 5 9-10',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  schloss: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v3',
  offen: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0M12 15v3',
  haken: 'M4 13l4 4L20 5',
  punkt: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  pfeilhoch: 'M12 19V5M6 11l6-6 6 6',
  drehen: 'M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5',
  augen: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  text: 'M4 6h16M4 12h10M4 18h14',
  lupe: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM14.5 14.5L20 20',
  // ---- Tagebuch-Seiten (DESIGN §17) ----
  karte: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  auftrag: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6M9 8h2',
  pass: 'M4 5h16v14H4zM8 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 9h4M13 13h4M6 17h12',
  koffer: 'M3 8h18v12H3zM8 8V5h8v3M3 13h18M12 12v3',
  ampel: 'M8 2h8v20H8zM12 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  chronik: 'M3 12h18M6 12V8M12 12V6M18 12V9M6 8a1 1 0 1 0 0-2M12 6a1 1 0 1 0 0-2M18 9a1 1 0 1 0 0-2M5 17h14',
  welt: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  stil: 'M7 3h10l3 4-3 2v12H7V9L4 7zM12 3c0 2 2 3 3 3',
  schluessel: 'M8 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h9M18 12v3M15 12v2',
  zahnrad: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  buch: 'M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z',
  steuerung: 'M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5 2l-2-2H9l-2 2a3 3 0 0 1-5-2v-2a4 4 0 0 1 4-4zM8 11v4M6 13h4M16 12h.01M18 14h.01',
  feuer: 'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-6 1-9zM4 21h16',
  haengematte: 'M2 8c4 6 16 6 20 0M4 8v11M20 8v11M7 13c3 2 7 2 10 0',
  mond: 'M14 3a8 8 0 1 0 7 11 7 7 0 0 1-7-11z',
  wolke: 'M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-10 1 3.5 3.5 0 0 0 0 7z',
  blitz: 'M13 2L5 13h6l-1 9 8-12h-6z',
  gluehwurm: 'M12 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 13V9M9 9c1-3 5-3 6 0M8 5l1 2M16 5l-1 2M6 16H3M21 16h-3',
  glas: 'M7 3h10l-1 3H8zM8 6c-2 1-3 3-3 6v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6c0-3-1-5-3-6',
  bild: 'M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M16 9a1 1 0 1 0 0-2',
  medaille: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM9 14l-2 7 5-3 5 3-2-7',
  splitter: 'M12 2l4 7-4 13-4-13zM8 9h8',
  bonsai: 'M12 21v-7M8 21h8M12 14c-4 0-7-2-7-5 2 0 4 1 5 2 0-3 1-6 2-8 1 2 2 5 2 8 1-1 3-2 5-2 0 3-3 5-7 5z',
  speichern: 'M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6',
  segel: 'M6 20L18 4v16zM6 20h12M12 12v8',
  klettern: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 7v6M12 13l-4 7M12 13l4 7M8 9l4 1 4-2',
  schwimmen: 'M3 18c3-2 6 2 9 0s6-2 9 0M4 12l5-6 4 3 4-2M16 8a2 2 0 1 0 0-4',
  mut: 'M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6zM9 12l2 2 4-4',
  ruhe: 'M4 14c4-8 12-8 16 0M8 14a4 4 0 0 0 8 0',
  team: 'M8 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM16 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2 20c0-3 3-5 6-5s6 2 6 5M12 20c0-3 2-5 4-5s6 2 6 5',
  blick: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9v6M9 12h6',
  wetter: 'M7 17h9a4 4 0 0 0 0-8 5 5 0 0 0-9 1M5 21l1-2M9 21l1-2M13 21l1-2',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12',
  boot: 'M4 15h16l-2 4H6zM7 15V7l5-3 5 3v8M12 4v11',
  uhr: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  kalender: 'M4 6h16v14H4zM4 10h16M8 3v5M16 3v5',
  sprint: 'M13 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 13l5-3 3-1 4 3 3-1M9 10l-2 10M13 12l-2 8M3 20h4',
  kristall: 'M12 2l6 6-6 14L6 8zM6 8h12M12 2v20',
  horn: 'M4 10v4h3l7 5V5L7 10zM14 9c2 0 4 1 4 3s-2 3-4 3',
  rune: 'M12 2v20M6 6l6 4 6-4M6 18l6-4 6 4',
};
export const ICONS = Object.keys(P);

export function icon(name, { size = 24, cls = '', title = '' } = {}) {
  const d = P[name] || P.punkt;
  const t = title ? `<title>${title}</title>` : '';
  return `<svg class="ico${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="${d}"/></svg>`;
}
export const hasIcon = (name) => !!P[name];

// Icon einer Gefühlsfarbe (Sonne, Flamme, Zickzack, Tropfen, Wirbel, Stern) – DESIGN §1
export const EMOTION_ICON = { freude: 'sonne', wut: 'flamme', angst: 'zickzack', trauer: 'tropfen', ekel: 'wirbel', ueberraschung: 'stern' };
export const EMOTION_COLOR = { freude: '#ffd23f', wut: '#ff4d4d', angst: '#9b6bff', trauer: '#4d8cff', ekel: '#5ad24f', ueberraschung: '#2de2c9' };
