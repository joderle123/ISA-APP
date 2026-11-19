// Annexe Junglinster – Einrichtung mit Charakter: Dinge, die zeigen, dass hier Menschen leben und lernen.
// Krimskrams auf den Pulten, Computer im CDI, Pokalvitrine, Feuerlöscher, Mülltrennung, Drucker, Kaffeemaschine …
// und Deko je Monat (saison: 'herbst' | 'halloween' | 'weihnacht' | 'winter' | 'fruehling' | 'sommer'; sichtbar je Kapitel, spiel.js).
// Modelle: KayKit (CC0, kk/…), Quaternius (essen/…, einrichtung/…), sonst Kästen.
import * as THREE from 'three';

export function baueEinrichtung({ B, P, C, schild, schilder, stuhl, DECKE }) {
  const { box } = B;
  const hex = (h) => new THREE.Color(h);
  let sz = 4242; const rnd = () => { sz = (sz * 16807) % 2147483647; return sz / 2147483647; };
  const D = (m, x, z, opt = {}) => P(m, x, z, opt.rot != null ? opt.rot : rnd() * Math.PI * 2, opt);

  // ---------- Klassensäle 1.04 und 1.06: Pulte mit Sachen, Lehrerpult, Maskottchen, Gitarrenkoffer ----------
  const KRAM = [['kk/waterbottle_A', { h: 0.24 }], ['kk/waterbottle_B', { h: 0.22 }], ['kk/comicbooks_stacked', { s: 0.3 }], ['kk/puzzlecube_complete', { h: 0.07 }],
    ['kk/book_set', { h: 0.12 }], ['kk/handheld_console', { s: 0.17 }], ['kk/cat_headphones_A', { s: 0.19 }], ['essen/Apple', { h: 0.08 }]];
  for (const [x0, x1, z0, z1, name] of [[-29.8, -16, -29.8, -18, '1.04'], [8, 20, -29.8, -18, '1.06']]) {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) for (const dz of [-0.62, 0.62]) {
      const x = x0 + 5 + r * 2.1, z = z0 + 2.6 + c * 3.4 + dz;
      const n = rnd() < 0.25 ? 0 : rnd() < 0.7 ? 1 : 2;
      for (let k = 0; k < n; k++) { const [m, o] = KRAM[Math.floor(rnd() * KRAM.length)]; D(m, x - 0.15 + rnd() * 0.3, z - 0.35 + rnd() * 0.7, { ...o, y: 0.76 }); }
    }
    // Lehrerpult: Kamera, Bücher, Kaktus; Klassen-Maskottchen auf der Fensterbank; Gitarrenkoffer in der Ecke
    const lx = x0 + 2.0, lz = (z0 + z1) / 2 + 2.6;
    D('kk/instantcamera', lx - 0.2, lz + 0.3, { s: 0.16, y: 0.78 }); D('kk/book_set', lx + 0.1, lz - 0.4, { h: 0.14, y: 0.78, rot: Math.PI / 2 }); D('kk/cactus_small_A', lx + 0.15, lz + 0.55, { h: 0.2, y: 0.78 });
    D('kk/chicken_plushie_A', x0 + 6.4, z0 + 0.16, { h: 0.32, y: 1.02, rot: 0.3 });
    D('kk/guitarcase', x1 - 0.5, z1 - 0.9, { h: 1.05, rot: -0.2 });
    // Jahreszeiten im Saal
    D('kk/pumpkin_orange_jackolantern', x0 + 10.4, z0 + 0.16, { h: 0.3, y: 1.02, saison: 'halloween', rot: 0 });
    D('kk/lantern_decorated', x0 + 10.4, z0 + 0.16, { h: 0.34, y: 1.02, saison: 'weihnacht', rot: 0 });
    D('kk/present_A_red', lx + 0.2, lz - 0.05, { h: 0.18, y: 0.78, saison: 'weihnacht' });
    D('kk/flax_flower_A', x0 + 10.4, z0 + 0.16, { h: 0.45, y: 1.02, saison: 'fruehling' });
    D('kk/autumn_wreath', name === '1.04' ? -21 : 14, -17.78, { s: 0.55, y: 1.55, rot: 0, saison: 'herbst' });   // Kranz an der Tür (Gangseite)
  }

  // ---------- Eingangshalle: Pokalvitrine, Bank, Pflanzen; Weihnachtsbaum, Kürbisse am Eingang ----------
  { const vx0 = -7.75, vz0 = -13.6, vz1 = -11.9;   // Vitrine an der Westwand, neben der Pinnwand
    box(vx0, vx0 + 0.5, 0, 0.8, vz0, vz1, hex('#6b4a32'), { art: 'innen', stoss: true });
    box(vx0, vx0 + 0.5, 0.8, 2.0, vz0, vz0 + 0.04, hex('#6b4a32'), { art: 'innen' }); box(vx0, vx0 + 0.5, 0.8, 2.0, vz1 - 0.04, vz1, hex('#6b4a32'), { art: 'innen' });
    box(vx0, vx0 + 0.5, 2.0, 2.08, vz0, vz1, hex('#6b4a32'), { art: 'innen' }); box(vx0, vx0 + 0.5, 1.38, 1.4, vz0, vz1, hex('#dfe4ea'), { art: 'innen' });
    box(vx0 + 0.48, vx0 + 0.5, 0.8, 2.0, vz0, vz1, C.glas, { art: 'glas' });
    const GOLD = hex('#e9b949'), SILBER = hex('#c9ccd2');
    const pokal = (x, z, y, h, f) => { box(x - 0.07, x + 0.07, y, y + 0.05, z - 0.07, z + 0.07, hex('#2b2b33'), { art: 'innen' }); box(x - 0.025, x + 0.025, y + 0.05, y + h * 0.5, z - 0.025, z + 0.025, f, { art: 'innen' }); box(x - 0.08, x + 0.08, y + h * 0.5, y + h, z - 0.08, z + 0.08, f, { art: 'innen' }); box(x - 0.11, x - 0.08, y + h * 0.62, y + h * 0.85, z - 0.015, z + 0.015, f, { art: 'innen' }); box(x + 0.08, x + 0.11, y + h * 0.62, y + h * 0.85, z - 0.015, z + 0.015, f, { art: 'innen' }); };
    pokal(vx0 + 0.25, vz0 + 0.45, 0.8, 0.45, GOLD); pokal(vx0 + 0.25, vz0 + 0.95, 0.8, 0.32, SILBER); pokal(vx0 + 0.25, vz0 + 1.35, 0.8, 0.28, hex('#b87333'));
    D('kk/basketball', vx0 + 0.25, vz0 + 0.5, { s: 0.22, y: 1.4 }); D('kk/football', vx0 + 0.25, vz0 + 1.1, { s: 0.22, y: 1.4 });
    const t = schild('Coupe inter-lycées · 2e place', 1.5, 0.22, { bg: '#2b3a55', schrift: 'bold 60px system-ui' }); t.position.set(vx0 + 0.52, 2.22, (vz0 + vz1) / 2); t.rotation.y = Math.PI / 2; schilder.push(t);
  }
  D('skate/bench', 7.35, -8.2, { h: 0.8, rot: -Math.PI / 2, fest: true });
  D('einrichtung/Plant', -7.2, -2.8, { h: 1.4 }); D('einrichtung/Plant', 7.2, -5.2, { h: 1.4 });
  // Feuerlöscher und Notausgang (Gang, Halle)
  for (const [x, z, rot] of [[-28.6, -17.86, 0], [-1.2, -17.86, 0], [26.6, -17.86, 0], [-7.86, -4.4, Math.PI / 2]]) {
    const ex = Math.sin(rot) * 0.1, ez = Math.cos(rot) * 0.1;
    box(x - 0.11 + ex, x + 0.11 + ex, 0.55, 1.05, z - 0.11 + ez, z + 0.11 + ez, hex('#c0392b'), { art: 'innen' }); box(x - 0.05 + ex, x + 0.05 + ex, 1.05, 1.15, z - 0.05 + ez, z + 0.05 + ez, hex('#2b2b33'), { art: 'innen' });
    const s = schild('🧯', 0.24, 0.24, { bg: '#c0392b', rand: '#ffffff', schrift: 'bold 90px system-ui' }); s.position.set(x + ex * 0.2, 1.45, z + ez * 0.2); s.rotation.y = rot; schilders(s);
  }
  for (const [x, z, rot] of [[-29.0, -16, Math.PI / 2], [29.0, -16, -Math.PI / 2]]) { const s = schild('🏃 Sortie de secours', 1.2, 0.28, { bg: '#2e9d57', schrift: 'bold 70px system-ui' }); s.position.set(x, 2.75, z); s.rotation.y = rot; schilders(s); }
  function schilders(s) { schilder.push(s); }
  // Weihnachten in der Halle: Baum mit Geschenken, Kranz über dem Eingang; Halloween: Kürbisse am Eingang
  D('kk/christmas_tree_decorated', 5.0, -7.6, { h: 2.9, saison: 'weihnacht', rot: 0.4 });
  for (const [m, dx, dz] of [['kk/present_A_red', -0.7, 0.5], ['kk/present_B_blue', 0.6, 0.6], ['kk/present_C_green', 0.1, 0.85], ['kk/present_D_yellow', -0.5, -0.6], ['kk/present_E_white', 0.7, -0.4]])
    D(m, 5.0 + dx, -7.6 + dz, { h: 0.28 + rnd() * 0.12, saison: 'weihnacht' });
  D('kk/wreath', 0, -1.92, { s: 0.75, y: 2.75, rot: 0, saison: 'weihnacht' });
  D('kk/mistletoe_A', 0, -3.2, { s: 0.35, y: 2.7, rot: 0, saison: 'weihnacht' });
  for (const [m, x, s2] of [['kk/pumpkin_orange_jackolantern', -3.0, 0.5], ['kk/pumpkin_orange', -3.5, 0.42], ['kk/pumpkin_yellow_small', 3.0, 0.3], ['kk/pumpkin_orange_jackolantern', 3.4, 0.46]])
    D(m, x, -0.7, { s: s2, saison: 'halloween', rot: 0.2 });
  // Winter im Hof: Schneemann, Schlitten, Laterne an der Bushaltestelle
  D('kk/snowman_A', 15.5, 21.5, { h: 1.7, saison: 'winter', rot: 0.4 }); D('kk/sled', 16.6, 22.4, { s: 1.2, saison: 'winter', rot: 1.2 });
  D('kk/snowman_A', -32, 27, { h: 1.3, saison: 'winter', rot: -0.6 });
  D('kk/lantern_decorated', -19.6, 41.6, { h: 0.5, saison: 'weihnacht', rot: 0 });
  // Sommer: Bälle auf dem Hof
  D('kk/football', -8, 30, { s: 0.24, saison: 'sommer' }); D('kk/basketball', 26, 18, { s: 0.25, saison: 'sommer' });

  // ---------- CDI: drei Computerplätze an der Gangwand ----------
  { const tz0 = -19.25, tz1 = -18.55;
    box(-15.8, -11.6, 0.72, 0.77, tz0, tz1, C.holzHell, { art: 'innen' });
    for (const lx of [-15.7, -11.7]) box(lx - 0.03, lx + 0.03, 0.08, 0.72, tz0 + 0.05, tz1 - 0.05, C.metall, { art: 'innen' });
    B.kasten.push({ x0: -15.8, x1: -11.6, z0: tz0, z1: tz1, y0: 0, y1: 0.8 });
    for (const x of [-15.0, -13.7, -12.4]) {
      box(x - 0.04, x + 0.04, 0.77, 0.95, -18.72, -18.66, hex('#3a3f4a'), { art: 'innen' });
      box(x - 0.3, x + 0.3, 0.92, 1.28, -18.7, -18.66, hex('#24262c'), { art: 'innen' });
      box(x - 0.27, x + 0.27, 0.95, 1.25, -18.72, -18.7, hex(['#8fc4ff', '#9fe3c8', '#ffd8a0'][Math.round((x + 15) / 1.3) % 3]), { art: 'licht' });
      box(x - 0.22, x + 0.22, 0.77, 0.79, -19.1, -18.95, hex('#2b2b33'), { art: 'innen' }); box(x + 0.3, x + 0.38, 0.77, 0.79, -19.08, -18.98, hex('#2b2b33'), { art: 'innen' });
      stuhl(B, x, -19.75, 0, C.stuhl[Math.round(-x) % C.stuhl.length]);
    }
    const s = schild('Max. 20 min · Merci!', 0.9, 0.22, { bg: '#ffffff', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 60px system-ui' }); s.position.set(-13.7, 1.6, -18.12); s.rotation.y = Math.PI; schilders(s);
  }

  // ---------- Sekretariat: Drucker, Kaffeemaschine, Klingel, Ablage ----------
  box(-28.9, -27.7, 0, 0.75, -3.6, -2.8, hex('#cfd3d8'), { art: 'innen', stoss: true });              // Sideboard
  box(-28.8, -28.1, 0.75, 1.05, -3.5, -2.9, hex('#e9ecef'), { art: 'innen' }); box(-28.75, -28.15, 1.05, 1.07, -3.45, -2.95, hex('#ffffff'), { art: 'innen' });   // Drucker
  box(-28.0, -27.75, 0.75, 1.08, -3.45, -3.15, hex('#2b2b33'), { art: 'innen' }); box(-27.98, -27.77, 0.8, 0.86, -3.15, -3.05, hex('#c0392b'), { art: 'innen' });   // Kaffeemaschine
  { const s = schild('Bitte klingeln 🔔', 0.6, 0.2, { bg: '#ffffff', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 60px system-ui' }); s.position.set(-21, 1.32, -10.52); schilders(s); }
  D('kk/frame_A', -16.15, -10.0, { s: 0.6, y: 1.5, rot: -Math.PI / 2 });

  // ---------- Kantine: Mülltrennung, Tablettstapel, Obstkorb; Krimskrams auf den Tischen ----------
  for (const [i, f, t] of [[0, '#f2c230', 'Plastik'], [1, '#2f6db0', 'Papier'], [2, '#5d6573', 'Rest']]) {
    const x = 9.0 + i * 0.62; box(x - 0.27, x + 0.27, 0, 0.85, -13.75, -13.35, hex(f), { art: 'innen', stoss: true }); box(x - 0.28, x + 0.28, 0.85, 0.9, -13.76, -13.34, hex('#2b2b33'), { art: 'innen' });
    const s = schild(t, 0.5, 0.16, { bg: f, schrift: 'bold 60px system-ui' }); s.position.set(x, 0.65, -13.33); schilders(s);
  }
  for (let i = 0; i < 6; i++) box(23.5, 24.0, 1.0 + i * 0.02, 1.02 + i * 0.02, -13.3, -12.9, hex(['#d9693f', '#2fb8a8', '#e9b949'][i % 3]), { art: 'innen' });   // Tabletts
  D('essen/Apple', 25.6, -4.0, { h: 0.08, y: 1.08 }); D('essen/Apple_Green', 25.75, -4.05, { h: 0.08, y: 1.08 }); D('essen/Banana', 25.7, -3.85, { s: 0.18, y: 1.08 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
    const x = 11.5 + r * 4.4, z = -10.6 + c * 5.2;
    if (rnd() < 0.5) D('kk/plate', x - 0.1, z - 0.6 + rnd() * 0.3, { s: 0.26, y: 0.77 });
    if (rnd() < 0.5) D('kk/waterbottle_A', x + 0.2, z + 0.4, { h: 0.22, y: 0.77 });
    if (rnd() < 0.25) D('kk/cat_headphones_A', x - 0.15, z + 0.7, { s: 0.18, y: 0.77 });
    D('kk/pumpkin_yellow_small', x, z, { s: 0.22, y: 0.77, saison: 'halloween' });
    D('kk/candle_triple', x, z, { s: 0.2, y: 0.77, saison: 'weihnacht' });
    D('kk/flax_flower_A', x, z, { h: 0.32, y: 0.77, saison: 'fruehling' });
  }
  D('kk/hot_chocolate_decorated', 25.65, -6.2, { h: 0.16, y: 1.08, saison: 'weihnacht' }); D('kk/cookie', 25.7, -6.6, { s: 0.12, y: 1.08, saison: 'weihnacht' });
  D('kk/candycane_small', 25.7, -7.0, { h: 0.14, y: 1.08, saison: 'weihnacht' });
  D('kk/pumpkin_orange_jackolantern', 25.7, -9.5, { s: 0.4, y: 1.08, saison: 'halloween', rot: -Math.PI / 2 });
}
