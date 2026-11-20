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

  // ---------- Werkstatt (Atelier DAP/CCP, x −60 … −36, z −28 … −8): Werkzeugwand, Schraubstöcke, Holz, Bohrmaschine, Projekte ----------
  { const NZ = -27.8, BRETT = hex('#c9a46a'), GRIFF = ['#d9523c', '#2f6db0', '#e9b949', '#3fa66b'];
    for (const [a0, a1] of [[-57.2, -50.2], [-45.6, -38.6]]) {
      box(a0, a1, 1.0, 2.5, NZ, NZ + 0.05, BRETT, { art: 'innen' });
      for (let x = a0 + 0.1; x < a1 - 0.05; x += 0.2) for (let y = 1.1; y < 2.45; y += 0.2) box(x, x + 0.02, y, y + 0.02, NZ + 0.05, NZ + 0.055, hex('#8a6a42'), { art: 'innen' });   // Lochblech
      let i = 0;
      for (let x = a0 + 0.4; x < a1 - 0.3; x += 0.55, i++) {
        const k = i % 4, g = hex(GRIFF[i % 4]);
        if (k === 0) { box(x - 0.02, x + 0.02, 1.5, 1.85, NZ + 0.06, NZ + 0.1, g, { art: 'innen' }); box(x - 0.08, x + 0.08, 1.85, 1.92, NZ + 0.05, NZ + 0.11, hex('#5d6573'), { art: 'innen' }); }   // Hammer
        else if (k === 1) { box(x - 0.025, x + 0.025, 1.7, 1.82, NZ + 0.06, NZ + 0.1, g, { art: 'innen' }); box(x - 0.006, x + 0.006, 1.45, 1.7, NZ + 0.07, NZ + 0.09, hex('#c9ccd2'), { art: 'innen' }); }   // Schraubendreher
        else if (k === 2) { box(x - 0.015, x + 0.015, 1.4, 1.9, NZ + 0.06, NZ + 0.09, hex('#8d96a3'), { art: 'innen' }); box(x - 0.05, x + 0.05, 1.86, 1.93, NZ + 0.06, NZ + 0.09, hex('#8d96a3'), { art: 'innen' }); }   // Schlüssel
        else { box(x - 0.2, x + 0.2, 1.95, 2.2, NZ + 0.06, NZ + 0.08, hex('#c9ccd2'), { art: 'innen' }); box(x + 0.2, x + 0.32, 1.95, 2.12, NZ + 0.06, NZ + 0.1, g, { art: 'innen' }); }   // Säge
      }
    }
    // Arbeitsplatz-Kram auf den drei Bänken: Vogelhaus im Bau, Bretter, Schutzbrille, Zwinge
    for (let i = 0; i < 3; i++) {
      const x = -56 + i * 6, y = 0.98, z = -21.4;
      box(x + 1.2, x + 1.7, y, y + 0.02, z - 0.25, z + 0.25, hex('#d4a373'), { art: 'innen' });
      box(x + 1.25, x + 1.65, y + 0.02, y + 0.32, z - 0.2, z + 0.2, hex('#d4a373'), { art: 'innen', kanten: 0.85 });                 // Vogelhaus-Korpus
      box(x + 1.39, x + 1.51, y + 0.12, y + 0.24, z + 0.199, z + 0.205, hex('#3a2a1c'), { art: 'innen' });                              // Flugloch
      box(x + 1.18, x + 1.72, y + 0.32, y + 0.36, z - 0.26, z + 0.26, hex(['#c0392b', '#2f6db0', '#3fa66b'][i]), { art: 'innen', kanten: 0.8 });   // Dach (bemalt)
      box(x + 2.2, x + 3.3, y, y + 0.03, z - 0.3, z - 0.12, hex('#e6c8a0'), { art: 'innen' }); box(x + 2.3, x + 3.2, y + 0.03, y + 0.06, z - 0.28, z - 0.14, hex('#d9b98a'), { art: 'innen' });   // Bretter
      box(x + 2.6, x + 2.82, y, y + 0.05, z + 0.15, z + 0.27, hex('#ffd166'), { art: 'innen' }); box(x + 2.62, x + 2.8, y + 0.05, y + 0.08, z + 0.16, z + 0.26, hex('#9fd0e6'), { art: 'glas' });   // Schutzbrille
      box(x + 0.6, x + 1.6, 0.06, 0.07, z + 0.6, z + 1.4, hex('#e6d2a8'), { art: 'innen' });                                          // Sägespäne am Boden
    }
    // zweite Reihe Werkbänke mit Hockern, gelbe Gehwege am Boden
    for (let i = 0; i < 3; i++) {
      const x = -56 + i * 6, z = -16.4;
      box(x, x + 3.6, 0, 0.9, z - 0.6, z + 0.6, C.holz, { art: 'innen', stoss: true }); box(x - 0.05, x + 3.65, 0.9, 0.98, z - 0.65, z + 0.65, C.holzHell, { art: 'innen' });
      box(x + 0.4, x + 0.7, 0.98, 1.3, z - 0.4, z - 0.2, C.rot, { art: 'innen' }); box(x + 2.9, x + 3.2, 0.98, 1.3, z + 0.2, z + 0.4, C.rot, { art: 'innen' });
      for (const [dx, dz] of [[0.9, -1.0], [2.6, -1.0], [0.9, 1.0], [2.6, 1.0]]) D('moebel/Stool', x + dx, z + dz, { h: 0.65 });
      box(x + 1.4, x + 2.2, 0.98, 1.0, z - 0.3, z + 0.3, hex('#efe6d6'), { art: 'innen' });   // Bauplan
      box(x + 1.5, x + 2.1, 1.0, 1.003, z - 0.2, z + 0.2, hex('#2f6db0'), { art: 'innen' });
    }
    for (const [a0, a1, b0, b1] of [[-58.5, -37.5, -18.6, -18.48], [-58.5, -37.5, -12.4, -12.28], [-58.5, -58.38, -18.6, -12.28]]) box(a0, a1, 0.1, 0.104, b0, b1, hex('#f2c230'), { art: 'innen' });
    // Ständerbohrmaschine mit gelb-schwarzer Sicherheitsfläche
    { const bx = -40.2, bz = -13.5;
      for (let k = 0; k < 8; k++) box(bx - 1.0 + k * 0.25, bx - 0.75 + k * 0.25, 0.1, 0.105, bz - 1.0, bz + 1.0, hex(k % 2 ? '#2b2b33' : '#f2c230'), { art: 'innen' });
      box(bx - 0.35, bx + 0.35, 0.1, 0.2, bz - 0.3, bz + 0.3, hex('#3f6f5a'), { art: 'innen', stoss: true }); box(bx - 0.06, bx + 0.06, 0.2, 1.7, bz + 0.12, bz + 0.24, hex('#8d96a3'), { art: 'innen' });
      box(bx - 0.18, bx + 0.18, 1.35, 1.75, bz - 0.25, bz + 0.25, hex('#3f6f5a'), { art: 'innen' }); box(bx - 0.02, bx + 0.02, 1.1, 1.35, bz - 0.12, bz - 0.08, hex('#c9ccd2'), { art: 'innen' });
      box(bx - 0.22, bx + 0.22, 0.95, 1.0, bz - 0.25, bz + 0.15, hex('#5d6573'), { art: 'innen' });
      B.kasten.push({ x0: bx - 0.4, x1: bx + 0.4, z0: bz - 0.35, z1: bz + 0.35, y0: 0, y1: 1.8 });
    }
    // Holzlager, Kisten, Regal, Eimer, Werkbank
    D('lager/resource-planks', -38.4, -24.5, { h: 0.8, rot: Math.PI / 2, fest: true }); D('lager/box-large', -38.6, -20.8, { h: 0.9, fest: true }); D('lager/box-large', -38.7, -20.8, { h: 0.7, y: 0.9, rot: 0.4 });
    D('markt/shelf-boxes', -37.0, -16.8, { h: 2.0, rot: -Math.PI / 2, fest: true }); D('lager/bucket', -42.5, -10.2, { h: 0.45 }); D('lager/workbench', -52.0, -11.2, { h: 0.95, rot: 0, fest: true });
    // Lampen über den Bänken, Schilder
    for (let i = 0; i < 3; i++) { const x = -54.2 + i * 6; box(x - 0.04, x + 0.04, 3.2, 4.9, -21.42, -21.38, hex('#2b2b33'), { art: 'innen' }); box(x - 0.45, x + 0.45, 3.0, 3.2, -21.7, -21.1, hex('#3a3f4a'), { art: 'innen' }); box(x - 0.4, x + 0.4, 2.97, 3.0, -21.65, -21.15, C.licht, { art: 'licht' }); }
    for (const [t, x, bg] of [['Schutzbrille auf! · Lunettes!', -56, '#f2c230'], ['Ordnung = Sicherheit', -42, '#2e9d57']]) { const z = schild(t, 2.2, 0.36, { bg, fg: bg === '#f2c230' ? '#2b2b33' : '#ffffff', schrift: 'bold 72px system-ui' }); z.position.set(x, 2.85, NZ + 0.06); schilders(z); }
    { const eh = schild('✚ Erste Hilfe', 0.7, 0.3, { bg: '#2e9d57', schrift: 'bold 70px system-ui' }); eh.position.set(-36.2, 1.7, -12); eh.rotation.y = -Math.PI / 2; schilders(eh); box(-36.4, -36.18, 1.1, 1.5, -12.3, -11.7, hex('#ffffff'), { art: 'innen' }); }
    // fertige Vogelhäuser im Sommer (Abschluss der DAP-Probetage), Kürbis-Laternen im Oktober
    for (let i = 0; i < 4; i++) { const x = -57.4 + i * 1.1; box(x, x + 0.4, 1.4, 1.7, -27.6, -27.25, hex('#d4a373'), { art: 'innen' }); }
    D('kk/pumpkin_orange_jackolantern', -46.4, -21.4, { s: 0.35, y: 0.98, saison: 'halloween', rot: 0 });
  }

  // ---------- Gang: Aufkleber auf Spinden, Kram oben drauf; WC: Spender, Trockner, Zettel am Spiegel ----------
  for (const [x0, x1, z, sg] of [[-28.4, -22.2, -17.9, 1], [-19.8, -10.2, -17.9, 1], [-7.8, 1.6, -17.9, 1], [4.4, 12.6, -17.9, 1], [15.4, 23.2, -17.9, 1], [-28.4, -22.2, -14.1, -1], [-19.6, -13, -14.1, -1], [13.4, 23.6, -14.1, -1]]) {
    for (let x = x0; x < x1 - 0.5; x += 0.6) {
      const zf = z + sg * 0.512;
      if (rnd() < 0.3) { const y = 0.5 + rnd() * 0.9, c = ['#e85d75', '#ffd166', '#2fb8a8', '#ffffff', '#9b7bc8'][Math.floor(rnd() * 5)], w = 0.06 + rnd() * 0.06; box(x + 0.1 + rnd() * 0.25, x + 0.1 + rnd() * 0.25 + w, y, y + w, Math.min(zf, zf + sg * 0.004), Math.max(zf, zf + sg * 0.004), hex(c), { art: 'innen' }); }
      if (rnd() < 0.08) D(['kk/basketball', 'kk/football', 'kk/box_A', 'kk/bicycle_helmet', 'kk/chicken_plushie_A'][Math.floor(rnd() * 5)], x + 0.3, z + sg * 0.25, { s: 0.3, y: 1.95 });
    }
  }
  for (let i = 0; i < 3; i++) { const x = 21.2 + i * 1.6;
    box(x + 0.55, x + 0.75, 1.0, 1.35, -29.78, -29.68, hex('#e9ecef'), { art: 'innen' });   // Papierspender
    const z2 = schild(['Du bist gut so.', 'Lächeln steht dir.', 'Heute wird gut.'][i], 0.36, 0.2, { bg: ['#fff59d', '#f48fb1', '#a5d6a7'][i], fg: '#2b2b33', rand: '#00000000', schrift: '44px "Comic Sans MS", cursive' }); z2.position.set(x + 0.25, 1.95, -29.5); z2.rotation.z = (rnd() - 0.5) * 0.2; schilders(z2);
  }
  box(25.2, 25.6, 1.1, 1.45, -29.8, -29.6, hex('#c9ccd2'), { art: 'innen' });   // Händetrockner
  { const t = schild('Hände waschen 🧼 · Lavez les mains', 1.4, 0.22, { bg: '#2fb8a8', schrift: 'bold 60px system-ui' }); t.position.set(22.8, 2.45, -29.78); schilders(t); }

  // ---------- Mut-Wand im Gang neben der SePAS-Tür: Klebezettel mit netten Sätzen (von Schülerinnen und Schülern geschrieben) ----------
  { const W = 2.8, H = 1.5, cv = document.createElement('canvas'); cv.width = 1024; cv.height = Math.round(1024 * H / W);
    const g = cv.getContext('2d'), Z = ['#fff59d', '#ffcc80', '#a5d6a7', '#90caf9', '#f48fb1', '#ce93d8'];
    g.fillStyle = '#c9a46a'; g.fillRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#2b3a55'; g.font = 'bold 44px system-ui'; g.textAlign = 'center'; g.fillText('MUT-WAND · Schreib was Nettes!', cv.width / 2, 52);
    const T = ['Du bist nicht allein.', 'Gut, dass du da bist.', 'Atme. Du schaffst das.', 'Fehler = Lernen.', 'Danke fürs Zuhören!', 'Frag nach. Echt.',
      'Heute schon gelacht?', 'Sei nett. Kostet nix.', 'Reden hilft: 116 111', 'Bonbon war da 🐕', 'Wer sucht, findet. – J.', 'Ich hör zu. – SePAS'];
    let sz2 = 77; const r2 = () => { sz2 = (sz2 * 16807) % 2147483647; return sz2 / 2147483647; };
    T.forEach((t, i) => {
      const c = i % 4, r = Math.floor(i / 4), x = 30 + c * 245 + r2() * 20, y = 80 + r * 115 + r2() * 12;
      g.save(); g.translate(x + 110, y + 50); g.rotate((r2() - 0.5) * 0.12);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-104, -42, 214, 96); g.fillStyle = Z[i % Z.length]; g.fillRect(-110, -48, 214, 96);
      g.fillStyle = '#2b2b33'; g.font = '30px "Comic Sans MS", "Segoe Print", cursive'; g.textAlign = 'center';
      const w = t.split(' '); let z1 = '', z2 = ''; for (const wd of w) { if ((z1 + ' ' + wd).length < 16 && !z2) z1 = (z1 + ' ' + wd).trim(); else z2 = (z2 + ' ' + wd).trim(); }
      g.fillText(z1, -3, z2 ? -6 : 8); if (z2) g.fillText(z2, -3, 30);
      g.restore();
    });
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    m.position.set(-9.7, 1.75, -14.13); m.rotation.y = Math.PI; m.name = 'schild'; schilders(m);
  }

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

  // ---------- Neubau (x 44 … 64): Musik (z −62 … −54), Kunst (−54 … −46), Informatik (−46 … −38) – Räume, in denen gerade noch jemand war ----------
  // Plakat aus Leinwand: zeichne(g, w, h); licht = wie Schilder (leuchtet), sonst beleuchtet und durchscheinend (Farbkleckse am Boden)
  function plakat(W, H, zeichne, { px = 512, licht = true } = {}) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round(px * H / W);
    zeichne(cv.getContext('2d'), cv.width, cv.height);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const mat = licht ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshLambertMaterial({ map: tex, transparent: true, depthWrite: false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), mat); m.name = 'schild'; schilders(m); return m;
  }
  const text = (g, t, x, y, f, c = '#2b3a55', a = 'center') => { g.font = f; g.fillStyle = c; g.textAlign = a; g.fillText(t, x, y); };
  const PAPIER = (bg) => (g, w, h) => { g.fillStyle = bg; g.fillRect(0, 0, w, h); };
  // ein einfaches Plakat: farbige Kante oben, Kopfzeile(n), Zeilen darunter
  const zettel = (W, H, bg, kopf, zeilen, { fg = '#2b3a55', kf = 'bold 64px system-ui', zf = '40px system-ui', akz = '#e85d75' } = {}) => plakat(W, H, (g, w, h) => {
    PAPIER(bg)(g, w, h); g.fillStyle = akz; g.fillRect(0, 0, w, 16);
    const zk = kopf.split('\n'); zk.forEach((t, i) => text(g, t, w / 2, 90 + i * 70, kf, fg));
    zeilen.forEach((t, i) => text(g, t, w / 2, 110 + zk.length * 70 + i * 56, zf, fg));
  });
  const SW = hex('#2b2b33'), STAHL = hex('#9aa3ad');

  // Musikraum: Teppich unterm Schlagzeug, Verstärker, Notenständer, Cajón, Sofa, Gitarre am Fenster, Bandprobe-Plakat, Notentafel, Lautstärke-Ampel
  { D('kk/rug_oval_A', 58, -59.7, { s: 3.4, rot: 0 });
    box(52.4, 53.2, 0.06, 0.66, -61.6, -61.0, SW, { art: 'innen', stoss: true }); box(52.48, 53.12, 0.12, 0.5, -61.0, -60.98, hex('#4a4f5c'), { art: 'innen' });
    box(52.5, 53.1, 0.54, 0.6, -61.0, -60.97, hex('#d4af37'), { art: 'innen' }); box(53.0, 53.06, 0.56, 0.58, -60.97, -60.96, hex('#ff3b30'), { art: 'licht' });
    D('kk/pumpkin_yellow_jackolantern', 52.8, -61.3, { h: 0.26, y: 0.66, rot: 0, saison: 'halloween' }); D('kk/lantern_decorated', 52.8, -61.3, { h: 0.3, y: 0.66, rot: 0, saison: 'weihnacht' });
    for (const [x, z] of [[51.6, -57.7], [54, -58.1], [56.4, -57.7]]) {   // Notenständer mit Blatt
      box(x - 0.015, x + 0.015, 0.06, 1.0, z - 0.015, z + 0.015, SW, { art: 'innen' }); box(x - 0.2, x + 0.2, 0.06, 0.09, z - 0.02, z + 0.02, SW, { art: 'innen' }); box(x - 0.02, x + 0.02, 0.06, 0.09, z - 0.2, z + 0.2, SW, { art: 'innen' });
      box(x - 0.26, x + 0.26, 0.95, 1.3, z - 0.02, z + 0.0, SW, { art: 'innen' }); box(x - 0.2, x + 0.2, 0.98, 1.27, z + 0.0, z + 0.01, hex('#f4f4f2'), { art: 'innen' });
    }
    box(50.1, 50.42, 0.06, 0.54, -55.7, -55.38, hex('#b5793e'), { art: 'innen', stoss: true }); box(50.18, 50.34, 0.2, 0.36, -55.38, -55.37, hex('#3a2a1c'), { art: 'innen' });   // Cajón
    D('kk/couch', 63.0, -56.3, { s: 2.6, rot: -Math.PI / 2, fest: true }); D('kk/pillow_A', 63.15, -55.6, { s: 0.42, y: 0.5, rot: -1.3 }); D('kk/cat_headphones_B', 62.9, -57.0, { s: 0.2, y: 0.5 });
    box(63.0, 63.7, 0.06, 0.1, -61.0, -60.2, SW, { art: 'innen' }); D('kk/guitar_B', 63.45, -60.6, { h: 1.1, rot: -Math.PI / 2 });
    const bp = zettel(1.0, 1.4, '#ffd166', 'BANDPROBE', ['Donnerstag · 13:00', 'hier im Musikraum', '', 'Wir suchen: BASS!', 'Keine Ahnung? Egal.', 'Wir lernen zusammen.', '', '– Gilles 🎸'], { akz: '#2b3a55' });
    bp.position.set(44.12, 1.65, -55.3); bp.rotation.y = Math.PI / 2;
    const nt = plakat(2.4, 1.1, (g, w, h) => {   // Notentafel: fünf Linien, Noten, Rhythmus
      PAPIER('#fbfbf8')(g, w, h); g.strokeStyle = '#2b3a55'; g.lineWidth = 3;
      for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(40, 70 + i * 22); g.lineTo(w - 40, 70 + i * 22); g.stroke(); }
      g.fillStyle = '#2b3a55'; [[120, 136], [200, 114], [280, 103], [360, 92], [440, 114], [520, 136], [600, 125], [680, 103], [760, 81], [840, 114], [920, 136]].forEach(([x, y]) => { g.beginPath(); g.ellipse(x, y, 13, 9, -0.4, 0, 7); g.fill(); g.fillRect(x + 10, y - 62, 4, 62); });
      text(g, 'Rhythmus:  ta   ta   ti-ti   ta   ·   Stille zählt auch.', w / 2, 230, 'bold 34px "Comic Sans MS", cursive', '#e85d75');
    }, { px: 1024 });
    nt.position.set(51.5, 1.6, -54.12); nt.rotation.y = Math.PI;
    const amp = plakat(0.5, 1.0, (g, w, h) => {   // Lautstärke-Ampel
      PAPIER('#2b3a55')(g, w, h); [['#3fa66b', 'flüstern'], ['#e9b949', 'normal'], ['#d9523c', 'BAND!']].forEach(([c, t], i) => { g.fillStyle = c; g.beginPath(); g.arc(w / 2, 110 + i * 300, 80, 0, 7); g.fill(); text(g, t, w / 2, 240 + i * 300, 'bold 46px system-ui', '#ffffff'); });
    }, { px: 512 });
    amp.position.set(44.12, 1.7, -60.6); amp.rotation.y = Math.PI / 2;
  }

  // Kunstraum: Hocker am Werktisch, Pinselgläser, Paletten, Farbkleckse am Boden, Trockengestell, Schürzen, Spiegel, Ton-Regal, Plakate
  { const FARBEN = ['#d9523c', '#2f6db0', '#e9b949', '#3fa66b', '#6b4e8a', '#e85d75'];
    for (const z of [-47.3, -49.9]) for (let i = 0; i < 6; i++) { const x = 48.2 + i * 2.3, c = hex(FARBEN[i % FARBEN.length]);   // Hocker
      box(x - 0.19, x + 0.19, 0.58, 0.62, z - 0.19, z + 0.19, c, { art: 'innen' });
      for (const [dx, dz] of [[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]]) box(x + dx - 0.02, x + dx + 0.02, 0.06, 0.58, z + dz - 0.02, z + dz + 0.02, STAHL, { art: 'innen' });
      box(x - 0.15, x + 0.15, 0.24, 0.26, z - 0.15, z + 0.15, STAHL, { art: 'innen' });
    }
    for (const x of [49.6, 54.0, 58.4]) {   // Pinselglas mit Pinseln
      D('kk/jar_A_medium', x, -48.55, { h: 0.17, y: 0.8, rot: 0 });
      for (let k = 0; k < 4; k++) { const bx = x - 0.045 + k * 0.03, bz = -48.57 + (k % 2) * 0.03; box(bx, bx + 0.012, 0.86, 1.09, bz, bz + 0.012, hex('#c9a46a'), { art: 'innen' }); box(bx - 0.003, bx + 0.015, 1.09, 1.12, bz - 0.003, bz + 0.015, hex(FARBEN[k]), { art: 'innen' }); }
    }
    for (const [x, z] of [[51.2, -48.2], [56.4, -49.0], [60.1, -48.3]]) {   // Paletten mit Farbtupfen
      box(x - 0.17, x + 0.17, 0.8, 0.81, z - 0.12, z + 0.12, hex('#e9d8b4'), { art: 'innen' });
      FARBEN.forEach((f, k) => box(x - 0.13 + (k % 3) * 0.1, x - 0.09 + (k % 3) * 0.1, 0.81, 0.818, z - 0.07 + Math.floor(k / 3) * 0.1, z - 0.03 + Math.floor(k / 3) * 0.1, hex(f), { art: 'innen' }));
    }
    let ks = 31; const kr = () => { ks = (ks * 16807) % 2147483647; return ks / 2147483647; };
    for (const [x, z] of [[49.4, -51.0], [54.6, -50.8], [58.8, -51.2], [62.2, -49.6]]) {   // Farbkleckse auf dem Boden
      const k = plakat(2.0, 1.4, (g, w, h) => { for (let i = 0; i < 16; i++) { g.fillStyle = FARBEN[Math.floor(kr() * FARBEN.length)]; g.globalAlpha = 0.5 + kr() * 0.4; const cx = 60 + kr() * (w - 120), cy = 40 + kr() * (h - 80), r = 4 + kr() * 22; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill(); for (let j = 0; j < 4; j++) { g.beginPath(); g.arc(cx + (kr() - 0.5) * r * 4, cy + (kr() - 0.5) * r * 4, 2 + kr() * 5, 0, 7); g.fill(); } } }, { px: 256, licht: false });
      k.rotation.x = -Math.PI / 2; k.position.set(x, 0.115, z);
    }
    box(44.3, 45.1, 0.06, 0.08, -53.7, -52.3, STAHL, { art: 'innen' });   // Trockengestell mit Bildern
    for (const [x, z] of [[44.3, -53.7], [45.08, -53.7], [44.3, -52.32], [45.08, -52.32]]) box(x, x + 0.02, 0.06, 1.45, z, z + 0.02, STAHL, { art: 'innen', stoss: true });
    for (let i = 0; i < 9; i++) { const y = 0.2 + i * 0.14; box(44.32, 45.08, y, y + 0.012, -53.68, -52.34, STAHL, { art: 'innen' }); box(44.36 + (i % 3) * 0.04, 45.0, y + 0.012, y + 0.016, -53.6, -52.42, hex(['#fbe9d0', '#dfeaf2', '#f2e2e2', '#e3efe0'][i % 4]), { art: 'innen' }); }
    box(44.1, 44.16, 1.62, 1.68, -48.7, -46.4, STAHL, { art: 'innen' });   // Hakenleiste mit Schürzen
    [-48.3, -47.7, -47.1].forEach((z, i) => { box(44.12, 44.17, 0.95, 1.6, z - 0.22, z + 0.22, hex(['#2f6db0', '#3fa66b', '#2b3a55'][i]), { art: 'innen' }); for (let k = 0; k < 3; k++) box(44.17, 44.175, 1.0 + kr() * 0.5, 1.04 + kr() * 0.5, z - 0.15 + kr() * 0.25, z - 0.11 + kr() * 0.25, hex(FARBEN[(i + k) % 6]), { art: 'innen' }); });
    D('kk/ghost_tote', 44.35, -46.6, { h: 0.55, y: 1.05, rot: Math.PI / 2, saison: 'halloween' });
    D('kk/ornate_mirror', 61.0, -53.62, { h: 1.6, rot: 0 });
    const sp = zettel(0.9, 0.5, '#ffffff', 'Selbstporträt-Woche', ['Schau genau hin.', 'Du bist interessant.'], { kf: 'bold 56px system-ui', zf: '38px system-ui', akz: '#6b4e8a' });
    sp.position.set(61.0, 2.05, -53.88);
    const fm = plakat(2.2, 0.8, (g, w, h) => { PAPIER('#2b3a55')(g, w, h); text(g, 'FEHLER?', w / 2, 120, 'bold 110px system-ui', '#ffd166'); text(g, 'Mach Kunst draus.', w / 2, 220, 'bold 72px "Comic Sans MS", cursive', '#ffffff'); }, { px: 1024 });
    fm.position.set(49.2, 2.45, -53.88);
    const au = zettel(1.1, 0.8, '#fff5e1', 'AUSSTELLUNG\nim Dezember', ['Thema: Ich in 10 Jahren', 'Alle machen mit. Auch du.'], { kf: 'bold 60px Georgia, serif', zf: '40px system-ui', akz: '#d9693f' });
    au.position.set(55.2, 2.3, -53.88);
    const fk = plakat(0.9, 0.9, (g, w, h) => { PAPIER('#ffffff')(g, w, h); for (let i = 0; i < 12; i++) { g.fillStyle = `hsl(${i * 30},70%,55%)`; g.beginPath(); g.moveTo(w / 2, h / 2 + 10); g.arc(w / 2, h / 2 + 10, 190, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); g.fill(); } g.fillStyle = '#ffffff'; g.beginPath(); g.arc(w / 2, h / 2 + 10, 70, 0, 7); g.fill(); text(g, 'Farbkreis', w / 2, 50, 'bold 44px system-ui'); });
    fk.position.set(58.6, 2.3, -53.88);
    // Ton-Regal am Fenster: Töpfe, Vasen, kantige Ton-Köpfe zum Trocknen
    for (const y of [0.45, 0.95, 1.45]) box(63.25, 63.78, y, y + 0.04, -51.0, -48.4, hex('#c9a46a'), { art: 'innen' });
    for (const z of [-51.0, -48.44]) box(63.25, 63.78, 0.06, 1.5, z, z + 0.04, hex('#a07a4a'), { art: 'innen', stoss: true });
    const TON = hex('#c96f4a'), TONH = hex('#d99a74');
    D('kk/pot_A', 63.5, -50.5, { h: 0.18, y: 0.49 }); D('kk/jar_C_large', 63.5, -49.0, { h: 0.3, y: 0.49, farbe: '#d99a74' }); D('kk/jar_B_small', 63.5, -49.7, { h: 0.16, y: 0.99, farbe: '#c96f4a' });
    for (const [z, y, c] of [[-50.4, 0.99, TON], [-48.9, 0.99, TONH], [-50.0, 1.49, TON], [-49.0, 1.49, TONH]]) {
      box(63.38, 63.66, y, y + 0.06, z - 0.14, z + 0.14, c, { art: 'innen' }); box(63.42, 63.62, y + 0.06, y + 0.3, z - 0.1, z + 0.1, c, { art: 'innen' });
      box(63.36, 63.42, y + 0.15, y + 0.21, z - 0.025, z + 0.025, c, { art: 'innen' }); for (const dz of [-0.05, 0.05]) box(63.405, 63.42, y + 0.22, y + 0.24, z + dz - 0.015, z + dz + 0.015, hex('#3a2a1c'), { art: 'innen' });
    }
    D('kk/lantern_hanging', 54, -50, { h: 0.7, y: 2.9, rot: 0, saison: 'weihnacht' });
  }

  // Informatik: Mäuse, Kopfhörer, Bildschirme mit Inhalt (Code, Blöcke, Passwort-Check, Pixelbild, Lernplattform), 3D-Drucker, Roboter, Plakate zu Netz und KI
  { const BILD = [
      (g, w, h) => { PAPIER('#1e2230')(g, w, h); const L = ['let punkte = 0;', 'if (korb) {', '  punkte += 2;', '  jubel();', '}', '// TODO: Dreier?']; L.forEach((t, i) => text(g, t, 24, 46 + i * 38, '28px monospace', ['#7fc4ff', '#ffd166', '#a5d6a7', '#f48fb1', '#ffd166', '#8d96a3'][i], 'left')); },
      (g, w, h) => { PAPIER('#f4f4f2')(g, w, h); [['wenn Taste ↑', '#e9b949'], ['gehe 10 Schritte', '#2f6db0'], ['sage „Hallo!“', '#6b4e8a'], ['warte 1 Sek.', '#e9b949'], ['wiederhole 3 ×', '#e9b949']].forEach(([t, c], i) => { g.fillStyle = c; g.fillRect(30 + (i > 0 ? 24 : 0), 24 + i * 44, 300, 38); text(g, t, 44 + (i > 0 ? 24 : 0), 52 + i * 44, 'bold 24px system-ui', '#ffffff', 'left'); }); },
      (g, w, h) => { PAPIER('#2b3a55')(g, w, h); text(g, 'Passwort-Check', w / 2, 52, 'bold 34px system-ui', '#ffffff'); g.fillStyle = '#ffffff'; g.fillRect(40, 80, w - 80, 50); text(g, '●●●●●●●●●●●●', w / 2, 116, '30px system-ui', '#2b3a55'); g.fillStyle = '#3fa66b'; g.fillRect(40, 150, w - 80, 22); text(g, 'stark ✓  · nicht teilen!', w / 2, 200, 'bold 28px system-ui', '#a5d6a7'); },
      (g, w, h) => { PAPIER('#dfeaf2')(g, w, h); const P = ['....YY....', '...YYYY...', '..YKYYKY..', '..YYYYYY..', '..YRRRRY..', '...YYYY...']; P.forEach((r, j) => [...r].forEach((c, i) => { if (c === '.') return; g.fillStyle = { Y: '#e9b949', K: '#2b2b33', R: '#d9523c' }[c]; g.fillRect(70 + i * 24, 20 + j * 24, 23, 23); })); text(g, 'mein Pixel-Ich', w / 2, 194, 'bold 26px system-ui', '#2b3a55'); },
      (g, w, h) => { PAPIER('#ffffff')(g, w, h); g.fillStyle = '#2fb8a8'; g.fillRect(0, 0, w, 44); text(g, 'Annexe · Lernplattform', 20, 31, 'bold 24px system-ui', '#ffffff', 'left'); ['✓ Aufgabe 1', '✓ Aufgabe 2', '○ Aufgabe 3'].forEach((t, i) => text(g, t, 30, 90 + i * 40, '26px system-ui', i < 2 ? '#3fa66b' : '#8d96a3', 'left')); },
    ];
    let bi = 0;
    for (let r = 0; r < 3; r++) { const z = -44.6 + r * 2.2;
      for (let i = 0; i < 6; i++) { const x = 47.4 + i * 2.6;
        box(x + 0.36, x + 0.44, 0.8, 0.825, z + 0.0, z + 0.12, SW, { art: 'innen' });   // Maus
        if (rnd() < 0.3) D('kk/cat_headphones_B', x - 0.6, z + 0.12, { s: 0.18, y: 0.8 });
        if (rnd() < 0.2) D('kk/waterbottle_B', x + 0.75, z - 0.1, { h: 0.22, y: 0.8 });
        if (rnd() < 0.35) box(x + 0.26, x + 0.36, 1.32, 1.42, z - 0.28, z - 0.275, hex(['#fff59d', '#f48fb1', '#a5d6a7'][i % 3]), { art: 'innen' });   // Klebezettel am Bildschirm
        if ((r * 6 + i) % 3 === 1) { const s = plakat(0.74, 0.4, BILD[bi++ % BILD.length], { px: 384 }); s.position.set(x, 1.2, z - 0.275); }
      } }
    // 3D-Drucker auf eigenem Tisch, druckt gerade einen kleinen Hund
    box(62.3, 63.7, 0.74, 0.8, -45.4, -44.2, hex('#f4f4f2'), { art: 'innen', stoss: true }); for (const [x, z] of [[62.35, -45.35], [63.6, -45.35], [62.35, -44.3], [63.6, -44.3]]) box(x, x + 0.05, 0.06, 0.74, z, z + 0.05, STAHL, { art: 'innen' });
    for (const [x, z] of [[62.6, -45.1], [63.36, -45.1], [62.6, -44.5], [63.36, -44.5]]) box(x, x + 0.04, 0.8, 1.42, z, z + 0.04, SW, { art: 'innen' });
    box(62.6, 63.4, 1.38, 1.42, -45.1, -44.46, SW, { art: 'innen' }); box(62.7, 63.3, 0.8, 0.86, -45.0, -44.56, SW, { art: 'innen' }); box(62.72, 63.28, 0.86, 0.87, -44.98, -44.58, hex('#5d6573'), { art: 'innen' });
    box(62.9, 63.1, 1.12, 1.2, -44.85, -44.7, hex('#e9b949'), { art: 'innen' }); box(62.98, 63.02, 1.02, 1.12, -44.8, -44.76, STAHL, { art: 'innen' });   // Druckkopf
    box(62.88, 63.12, 0.87, 0.97, -44.84, -44.72, hex('#d9693f'), { art: 'innen' }); box(63.05, 63.15, 0.97, 1.04, -44.82, -44.74, hex('#d9693f'), { art: 'innen' });   // halber Hund
    { const t = zettel(0.7, 0.3, '#ffffff', '3D-Drucker', ['Nicht anfassen. Er denkt nach.'], { kf: 'bold 60px system-ui', zf: '36px system-ui', akz: '#d9693f' }); t.position.set(63.0, 0.6, -44.18); }
    // kleiner Roboter vom Coding-Club
    { const x = 61.5, z = -40.15; box(x - 0.08, x + 0.08, 0.8, 0.98, z - 0.06, z + 0.06, hex('#c9ccd2'), { art: 'innen' }); box(x - 0.06, x + 0.06, 0.98, 1.08, z - 0.05, z + 0.05, hex('#c9ccd2'), { art: 'innen' });
      for (const dx of [-0.03, 0.03]) box(x + dx - 0.012, x + dx + 0.012, 1.02, 1.045, z + 0.05, z + 0.055, hex('#7fc4ff'), { art: 'licht' });
      box(x - 0.005, x + 0.005, 1.08, 1.16, z - 0.005, z + 0.005, STAHL, { art: 'innen' }); box(x - 0.015, x + 0.015, 1.16, 1.19, z - 0.015, z + 0.015, hex('#ff3b30'), { art: 'licht' });
      for (const dx of [-0.11, 0.11]) box(x + dx - 0.025, x + dx + 0.025, 0.86, 0.96, z - 0.02, z + 0.02, hex('#9aa3ad'), { art: 'innen' }); }
    // Plakate an der Nordwand
    for (const [x, kopf, z1, z2, bg, akz] of [
      [47.6, 'PASSWORT\n= ZAHNBÜRSTE', 'Nicht teilen.', 'Oft wechseln.', '#ffffff', '#2fb8a8'],
      [51.0, 'ERST DENKEN,\nDANN POSTEN.', 'Was online ist,', 'bleibt online.', '#fff5e1', '#e85d75'],
      [54.4, 'KI ist ein\nWerkzeug.', 'Den Kopf', 'hast du.', '#eef3fb', '#6b4e8a'],
      [57.8, 'CODING-CLUB', 'Mittwoch · 13:00', 'Wir bauen ein Mini-Spiel!', '#ffd166', '#2b3a55'],
    ]) { const p = zettel(1.1, 0.95, bg, kopf, ['', z1, z2], { akz, kf: 'bold 62px system-ui', zf: '42px system-ui' }); p.position.set(x, 2.1, -45.88); }
  }

  // ---------- Lesesaal (Nordflügel, x 0 … 30, z −72 … −55): Bücher auf den Tischen, Bücherwagen, Sitzsäcke, Buch des Monats, „Psst“-Aufsteller ----------
  { const SEITE = hex('#fbf7ee'), EINBAND = ['#2f6db0', '#c0392b', '#3fa66b', '#6b4e8a', '#e9b949'];
    for (const [x, z] of [[9, -64.5], [19, -64.5], [9, -59.5], [19, -59.5]]) {
      for (const [dx, dz, rot] of [[-2.2, -0.3, 0.2], [0.7, 0.35, Math.PI - 0.15], [2.2, -0.3, 0.1]]) {   // aufgeschlagene Bücher
        if (rnd() < 0.25) continue;
        const c = Math.cos(rot), s = Math.sin(rot), bx = x + dx, bz = z + dz, f = hex(EINBAND[Math.floor(rnd() * EINBAND.length)]);
        const ax = Math.abs(c) > 0.5;   // nur grob gedreht: Kästen bleiben achsparallel
        box(bx - 0.2, bx + 0.2, 0.8, 0.81, bz - 0.14, bz + 0.14, f, { art: 'innen' }); box(bx - 0.19, bx - 0.005, 0.81, 0.825, bz - 0.13, bz + 0.13, SEITE, { art: 'innen' }); box(bx + 0.005, bx + 0.19, 0.81, 0.825, bz - 0.13, bz + 0.13, SEITE, { art: 'innen' });
        if (ax) for (let k = 0; k < 4; k++) box(bx - 0.16, bx - 0.04, 0.826, 0.828, bz - 0.08 + k * 0.05, bz - 0.07 + k * 0.05, hex('#8d96a3'), { art: 'innen' });
      }
      if (rnd() < 0.7) D('kk/book_set', x - 1.0 + rnd() * 2, z + 0.4, { h: 0.16, y: 0.8, rot: rnd() < 0.5 ? 0 : Math.PI / 2 });
      if (rnd() < 0.5) D('kk/waterbottle_A', x + 1.2, z - 0.45, { h: 0.22, y: 0.8 });
      if (rnd() < 0.4) D('kk/cat_headphones_A', x - 1.3, z + 0.45, { s: 0.18, y: 0.8 });
      D('kk/candle_melted', x + 0.55, z, { h: 0.18, y: 0.8, saison: 'halloween' }); D('kk/lantern_decorated', x + 0.55, z, { h: 0.26, y: 0.8, saison: 'weihnacht' });
      for (const [s, ry] of [[1, 0], [-1, Math.PI]]) { const t = zettel(0.36, 0.18, '#ffffff', '🤫 Psst!', [], { kf: 'bold 120px system-ui', akz: '#3d5a52' }); t.position.set(x, 0.92, z + s * 0.004); t.rotation.y = ry; }
    }
    // Bücherwagen mit zwei Böden
    { const x = 25.4, z = -66.2; box(x - 0.6, x + 0.6, 0.3, 0.34, z - 0.3, z + 0.3, C.holz, { art: 'innen', stoss: true }); box(x - 0.6, x + 0.6, 0.85, 0.89, z - 0.3, z + 0.3, C.holz, { art: 'innen' });
      for (const dx of [-0.58, 0.54]) for (const dz of [-0.28, 0.24]) { box(x + dx, x + dx + 0.04, 0.12, 0.95, z + dz, z + dz + 0.04, STAHL, { art: 'innen' }); box(x + dx - 0.02, x + dx + 0.06, 0.06, 0.12, z + dz - 0.02, z + dz + 0.06, SW, { art: 'innen' }); }
      for (const y of [0.34, 0.89]) for (let i = 0; i < 9; i++) { const bx = x - 0.54 + i * 0.12, hb = 0.18 + rnd() * 0.08; box(bx, bx + 0.09, y, y + hb, z - 0.12, z + 0.12, hex(EINBAND[i % EINBAND.length]), { art: 'innen' }); }
      const t = zettel(0.5, 0.18, '#ffffff', 'Rückgabe', [], { kf: 'bold 90px system-ui', akz: '#3d5a52' }); t.position.set(x, 0.6, z + 0.31); }
    // Sitzsäcke in der Leseecke
    for (const [x, z, c] of [[25.9, -60.9, '#2fb8a8'], [26.1, -62.4, '#d9693f'], [24.9, -61.6, '#e9b949']]) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 10), new THREE.MeshLambertMaterial({ color: c })); m.scale.set(1, 0.6, 1); m.position.set(x, 0.32, z); m.castShadow = true; m.receiveShadow = true; schilders(m);
      B.kasten.push({ x0: x - 0.35, x1: x + 0.35, z0: z - 0.35, z1: z + 0.35, y0: 0, y1: 0.5 });
    }
    D('kk/comicbooks_stacked', 25.4, -61.2, { s: 0.28, y: 0.1 });
    // Buch des Monats: kleiner Tisch mit Aufsteller
    { const x = 24.6, z = -57.6; box(x - 0.5, x + 0.5, 0.7, 0.75, z - 0.35, z + 0.35, C.holz, { art: 'innen', stoss: true }); for (const dx of [-0.45, 0.41]) box(x + dx, x + dx + 0.04, 0.1, 0.7, z - 0.02, z + 0.02, C.holz, { art: 'innen' });
      D('kk/book_set', x - 0.25, z, { h: 0.16, y: 0.75, rot: 0 });
      const t = plakat(0.5, 0.66, (g, w, h) => { PAPIER('#2b3a55')(g, w, h); text(g, 'BUCH DES MONATS', w / 2, 64, 'bold 42px system-ui', '#ffd166'); g.fillStyle = '#e85d75'; g.fillRect(110, 100, w - 220, 380); text(g, 'Mut braucht', w / 2, 260, 'bold 46px Georgia, serif', '#ffffff'); text(g, 'keine Muskeln', w / 2, 316, 'bold 46px Georgia, serif', '#ffffff'); text(g, '„Ich hab’s in zwei Tagen', w / 2, 560, 'italic 34px system-ui', '#ffffff'); text(g, 'gelesen.“ – Lou ★★★★★', w / 2, 606, 'italic 34px system-ui', '#ffffff'); });
      t.position.set(x + 0.18, 1.08, z); t.rotation.y = 0; }
  }

  // ---------- Neubau-Flur (x 40 … 44): Pinnwand mit Zetteln, Bank unter dem Fenster, Pflanzen ----------
  { const W = 2.4, H = 1.3, cv = document.createElement('canvas'); cv.width = 1024; cv.height = Math.round(1024 * H / W);
    const g = cv.getContext('2d'); g.fillStyle = '#c9a46a'; g.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < 400; i++) { g.fillStyle = 'rgba(90,60,30,0.18)'; g.fillRect(Math.random() * cv.width, Math.random() * cv.height, 3, 3); }   // Kork
    const Z = [
      ['#ffffff', '#e85d75', ['SCHULFEST', 'im Juni', 'Bühne frei für alle!']],
      ['#fff59d', '#2b3a55', ['VERLOREN:', 'grüne Flasche', '„Wasserfall“', '– Jeff (6ème)']],
      ['#a5d6a7', '#2b3a55', ['Bonbon hat', 'Geburtstag! 🐕', 'Leckerli nur', 'über die SePAS']],
      ['#90caf9', '#2b3a55', ['Fußball-AG', 'Dienstag 13:00', 'Alle Niveaus']],
      ['#ffcc80', '#2b3a55', ['Hilfe bei', 'Hausaufgaben?', 'CDI · Mo + Do']],
      ['#f48fb1', '#2b3a55', ['Wer leiht mir', 'einen Bass?', '– Gilles 🎸']],
    ];
    Z.forEach(([bg, fg, zeilen], i) => {
      const c = i % 3, r = Math.floor(i / 3), x = 40 + c * 330 + (i * 37 % 40), y = 40 + r * 270 + (i * 53 % 30);
      g.save(); g.translate(x + 140, y + 105); g.rotate(((i * 7) % 5 - 2) * 0.03);
      g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-134, -96, 280, 214); g.fillStyle = bg; g.fillRect(-140, -102, 280, 214);
      g.fillStyle = '#d9523c'; g.beginPath(); g.arc(0, -88, 9, 0, 7); g.fill();
      g.fillStyle = fg; g.textAlign = 'center'; zeilen.forEach((t, k) => { g.font = k === 0 ? 'bold 40px system-ui' : '34px "Comic Sans MS", cursive'; g.fillText(t, 0, -44 + k * 46); });
      g.restore();
    });
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    m.position.set(43.83, 1.6, -46.2); m.rotation.y = -Math.PI / 2; m.name = 'schild'; schilders(m);
    box(43.84, 43.9, 0.92, 2.28, -47.47, -44.93, hex('#6b4a32'), { art: 'innen' });   // Rahmen
    box(40.4, 40.85, 0.42, 0.48, -46.4, -44.2, C.holz, { art: 'innen', stoss: true }); for (const z of [-46.2, -44.4]) box(40.45, 40.8, 0.06, 0.42, z - 0.05, z + 0.05, STAHL, { art: 'innen' });
    D('kk/cactus_medium_B', 40.6, -53.2, { h: 0.9, fest: 0.2 }); D('kk/cactus_medium_A', 40.6, -40.0, { h: 0.8, fest: 0.2 });
    D('kk/rollerskate_pair', 40.7, -45.6, { s: 0.36, y: 0.48, rot: 0.4 });
  }

  // ---------- SePAS (x −16 … −8, z −14 … −2): Gefühle-Rad, Hilfe-Tafel, Sorgen-Briefkasten, Taschentücher – ein Raum, der sagt: Hier darfst du reden ----------
  { // Gefühle-Rad an der Westwand
    const rad = plakat(1.15, 1.3, (g, w, h) => {
      g.fillStyle = '#fbf6ec'; g.fillRect(0, 0, w, h);
      text(g, 'Wie geht’s dir heute?', w / 2, 58, 'bold 40px system-ui');
      const G = [['froh', '#f2c94c'], ['stolz', '#f2994a'], ['wütend', '#eb5757'], ['traurig', '#5b8def'], ['ängstlich', '#9b7bc8'], ['verlegen', '#e88fb0'], ['müde', '#8aa0b4'], ['ruhig', '#6fcf97']];
      const cx = w / 2, cy = h / 2 + 30, r = w * 0.42;
      G.forEach(([t, c], i) => { const a0 = i / G.length * Math.PI * 2 - Math.PI / 2, a1 = (i + 1) / G.length * Math.PI * 2 - Math.PI / 2;
        g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r, a0, a1); g.closePath(); g.fillStyle = c; g.fill(); g.strokeStyle = '#fbf6ec'; g.lineWidth = 6; g.stroke();
        const am = (a0 + a1) / 2; g.save(); g.translate(cx + Math.cos(am) * r * 0.66, cy + Math.sin(am) * r * 0.66); text(g, t, 0, 10, 'bold 28px system-ui', '#2b2b33'); g.restore(); });
      g.beginPath(); g.arc(cx, cy, r * 0.2, 0, 7); g.fillStyle = '#fbf6ec'; g.fill(); text(g, 'alles', cx, cy - 2, 'bold 26px system-ui'); text(g, 'okay', cx, cy + 26, 'bold 26px system-ui');
      text(g, 'Gemischt geht auch.', w / 2, h - 30, 'italic 30px Georgia, serif', '#8a5a3a');
    });
    rad.position.set(-15.86, 1.6, -5.4); rad.rotation.y = Math.PI / 2;
    box(-15.92, -15.88, 0.9, 2.3, -6.06, -4.74, hex('#6b4a32'), { art: 'innen' });
    // Hilfe-Tafel an der Ostwand (neben der Tür)
    const tafel = plakat(1.3, 1.0, (g, w, h) => {
      g.fillStyle = '#2fb8a8'; g.fillRect(0, 0, w, h); g.fillStyle = '#ffffff'; g.fillRect(14, 14, w - 28, h - 28);
      text(g, 'Wenn es zu viel wird', w / 2, 70, 'bold 42px system-ui', '#1f6f66');
      [['116 111', 'Kinder- und Jugendtelefon · anonym'], ['8002 1234', 'BEE SECURE · Internet, Handy, Spiele'], ['112', 'Notfall'], ['SePAS', 'Tür offen. Ohne Termin.']].forEach(([n, t], i) => {
        text(g, n, 40, 150 + i * 72, 'bold 40px system-ui', '#2b3a55', 'left'); text(g, t, 230, 150 + i * 72, '28px system-ui', '#2b3a55', 'left'); });
    });
    tafel.position.set(-8.14, 1.55, -12.2); tafel.rotation.y = -Math.PI / 2;
    // Sorgen-Briefkasten neben der Tür: Holzkasten mit Schlitz auf einem Pfosten
    box(-15.2, -15.1, 0, 1.0, -13.15, -13.05, hex('#6b4a32'), { art: 'innen', stoss: true });
    box(-15.4, -14.9, 1.0, 1.32, -13.3, -12.9, hex('#e9b949'), { art: 'innen' });
    box(-15.3, -15.0, 1.25, 1.27, -12.9, -12.88, SW, { art: 'innen' });
    const sb = zettel(0.8, 0.4, '#ffffff', 'Sorgen-Briefkasten', ['Anonym.', 'Herr Kuedes liest alles.'], { kf: 'bold 52px system-ui', zf: '36px system-ui', akz: '#e9b949' });
    sb.position.set(-15.05, 1.62, -12.87); sb.rotation.y = 0;
    // Taschentücher und Wasser auf dem Tisch
    box(-11.85, -11.55, 0.46, 0.58, -5.5, -5.3, hex('#5b8def'), { art: 'innen' }); box(-11.75, -11.65, 0.58, 0.64, -5.42, -5.38, hex('#ffffff'), { art: 'innen' });
    for (const [x, z] of [[-12.6, -5.2], [-12.45, -5.55]]) box(x - 0.04, x + 0.04, 0.46, 0.6, z - 0.04, z + 0.04, hex('#bfe3f2'), { art: 'innen' });
  }

  // ---------- Gang Ost: Fernands Ecke (Hausmeister) – Leiter an der Wand, Werkzeugkiste, Eimer ----------
  { const RAHM = hex('#c9a227');
    for (const x of [27.3, 27.84]) box(x, x + 0.06, 0.06, 2.6, -14.32, -14.24, RAHM, { art: 'innen', stoss: true });
    for (let y = 0.35; y < 2.5; y += 0.3) box(27.36, 27.84, y, y + 0.04, -14.31, -14.25, RAHM, { art: 'innen' });
    box(25.9, 26.42, 0.06, 0.32, -14.52, -14.24, hex('#c0392b'), { art: 'innen', stoss: true }); box(25.9, 26.42, 0.32, 0.34, -14.5, -14.26, hex('#8a2a1f'), { art: 'innen' });
    box(26.1, 26.22, 0.34, 0.42, -14.39, -14.37, SW, { art: 'innen' });
    box(26.6, 26.92, 0.06, 0.4, -14.5, -14.22, hex('#5d6573'), { art: 'innen' }); box(26.62, 26.9, 0.4, 0.42, -14.48, -14.24, hex('#9aa3ad'), { art: 'innen' });
    const z = zettel(0.5, 0.36, '#ffffff', 'Kaputt?', ['Sag Fernand Bescheid.', 'Ohne Ärger. Versprochen.'], { kf: 'bold 70px system-ui', zf: '38px system-ui', akz: '#3d5a80' }); z.position.set(28.0, 1.55, -14.16); z.rotation.y = Math.PI; }

  // ---------- Halloween: Spinnweben in Ecken (Gang, Werkstatt, CDI, Kantine, Neubau) ----------
  for (const [x, z, y] of [[-28.7, -17.75, DECKE], [28.7, -17.75, DECKE], [-28.7, -14.25, DECKE], [-59.6, -27.6, 5.2], [-36.4, -8.4, 5.2], [-14.6, -29.6, DECKE], [28.6, -2.4, DECKE], [63.6, -61.6, 3.9], [44.4, -45.8, 3.9]])
    D('kk/cobweb_B', x, z, { s: 1.4, y: y - 0.52, saison: 'halloween' });
}
