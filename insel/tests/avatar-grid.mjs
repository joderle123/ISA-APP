// Avatar-Raster (WP16): Screenshots aller Frisuren × 4 Hauttöne, aller Hilfsmittel (Brillen, Hörgeräte, Prothesen),
// Masken, Kopfsachen, Oberteile × Unterteile, Muster, Aufnäher-Raster und Nahaufnahmen. Prüft: keine Seitenfehler,
// ≤ 12000 Dreiecke je Figur, alte Konfigurationen bleiben gültig, 'lite'-Stufe hat weniger Draw-Calls.
// Aufruf: node tests/avatar-grid.mjs   (SHOTS=Ordner, Q=low|medium|high)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'medium';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 11.5 });
  await page.evaluate(() => { LUMO.player.teleport(-60, 150, 0); LUMO.player.setEnabled(false); LUMO.world.sky.setStorm && LUMO.world.sky.setStorm(0); });

  // Raster in der Welt aufstellen: Reihen entlang x, Spalten entlang z; Kamera von vorn oben
  await page.evaluate(() => {
    const H = window.__H = { list: [], next: 0 };
    const A = LUMO.plugins.avatar || null;
    window.__spawnGrid = (configs, { cols, x0 = 0, z0 = 60, dx = 1.15, dz = 1.6, yaw = 0, detail } = {}) => {
      for (const h of H.list) h.remove();
      H.list = [];
      const stats = [];
      configs.forEach((cfg, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = x0 + (c - (cols - 1) / 2) * dx, z = z0 + r * dz;
        const y = LUMO.world.island.getHeight(x, z);
        const hum = LUMO.createHumanoid(cfg, { name: 'grid-' + i, detail });
        hum.group.position.set(x, y, z); hum.group.rotation.y = yaw;
        hum.setAnim('idle');
        LUMO.scene.add(hum.group);
        const off = LUMO.addUpdate((dt) => hum.update(dt));
        H.list.push({ humanoid: hum, remove() { off(); LUMO.scene.remove(hum.group); hum.dispose(); } });
        hum.update(0.05);
        stats.push({ i, tris: hum.triangles, meshes: Object.values(hum.meshes).filter((m) => m.visible).length });
      });
      const rows = Math.ceil(configs.length / cols);
      const cz = z0 + (rows - 1) * dz / 2;
      const yg = LUMO.world.island.getHeight(x0, cz);
      const dist = Math.max(4.5, cols * dx * 0.62, rows * dz * 1.1);
      LUMO.debug.setShot({ x: x0, y: yg + 1.4 + dist * 0.42, z: cz + dist * 1.35 + 1.5 }, { x: x0, y: yg + 0.95, z: cz });
      LUMO.debug.advance(0.4);
      return stats;
    };
    window.__H = H;
    return !!A;
  });

  const H = await page.evaluate(() => ({ hair: LUMO.avatar.HAIR_STYLES, skins: LUMO.avatar.SKIN_TONES, tops: LUMO.avatar.TOP_STYLES, bottoms: LUMO.avatar.BOTTOM_STYLES, shoes: LUMO.avatar.SHOE_STYLES, patterns: LUMO.avatar.PATTERNS, masks: LUMO.avatar.MASKS, heads: LUMO.avatar.HEAD_ITEMS, glasses: LUMO.avatar.GLASSES, aids: LUMO.avatar.HEARING_AIDS, pros: LUMO.avatar.PROSTHESES }));
  check('LUMO.avatar exportiert Wertelisten', H.hair.length >= 14 && H.skins.length === 16, `${H.hair.length} Frisuren, ${H.skins.length} Hauttöne`);

  // 1) Frisuren × 4 Hauttöne
  const skins4 = [H.skins[1], H.skins[6], H.skins[10], H.skins[14]];
  const hairCfgs = [];
  skins4.forEach((skin, r) => H.hair.forEach((hairStyle, c) => hairCfgs.push({ skin, hairStyle, hair: ['#1b1512', '#6b4a2f', '#d9a24a', '#b23a2a', '#3e78e0'][c % 5], top: ['#ff5d73', '#2de2c9', '#ffd166', '#6c4bd6', '#ff8a3d'][(c + r) % 5], topStyle: ['hoodie', 'tshirt', 'pullover'][c % 3], bottoms: '#2f4a7a', headColor: '#ffd166', build: 0.3 + (c % 3) * 0.2, height: 0.5 })));
  let stats = await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 15, dx: 1.05, dz: 1.7 }), hairCfgs);
  await frames(page, 4);
  await shot(page, 'av01_frisuren_hauttoene');
  const maxTris = Math.max(...stats.map((s) => s.tris));
  check('Frisuren × Hauttöne: ≤ 12000 Dreiecke je Figur', maxTris <= 12000, `max ${maxTris}`);
  // Nahaufnahme der ersten Reihe (links und rechts)
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(-3.5, 60); LUMO.debug.setShot({ x: -3.6, y: y + 1.9, z: 63.6 }, { x: -3.6, y: y + 1.3, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av02_frisuren_nah_links');
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(4, 60); LUMO.debug.setShot({ x: 4.2, y: y + 1.9, z: 63.6 }, { x: 4.2, y: y + 1.3, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av03_frisuren_nah_rechts');

  // 2) Hilfsmittel: Brillen × Hörgeräte × Prothesen, dazu Sommersprossen/Vitiligo
  const aidCfgs = [];
  for (const glasses of H.glasses) for (const hearingAid of H.aids) aidCfgs.push({ glasses, hearingAid, prosthesis: H.pros[aidCfgs.length % 3], skin: H.skins[(aidCfgs.length * 3) % 16], hairStyle: H.hair[aidCfgs.length % H.hair.length], topStyle: aidCfgs.length % 2 ? 'tshirt' : 'tanktop', freckles: aidCfgs.length % 3, vitiligo: aidCfgs.length % 4 === 1 ? 1 : 0, glassesColor: ['#1d1d26', '#ff5d73', '#3e78e0'][aidCfgs.length % 3], build: 0.5 });
  stats = await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 8, dx: 1.2, dz: 1.8 }), aidCfgs);
  await frames(page, 4);
  await shot(page, 'av04_hilfsmittel');
  check('Hilfsmittel: ≤ 12000 Dreiecke', Math.max(...stats.map((s) => s.tris)) <= 12000);
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(-2, 60); LUMO.debug.setShot({ x: -1.5, y: y + 1.75, z: 62.6 }, { x: -1.5, y: y + 1.35, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av05_hilfsmittel_nah');

  // 3) Oberteile × Unterteile × Schuhe × Muster
  const clothCfgs = [];
  H.tops.forEach((topStyle, i) => H.bottoms.forEach((bottomsStyle, j) => clothCfgs.push({ topStyle, bottomsStyle, shoesStyle: H.shoes[(i + j) % 4], pattern: H.patterns[(i * 2 + j) % H.patterns.length], top: ['#ff5d73', '#2de2c9', '#ffd166', '#6c4bd6', '#ff8a3d', '#3e78e0', '#1d1d26'][i], patternColor: ['#ffffff', '#ffd166', '#1d1d26', '#2de2c9'][j % 4], bottoms: ['#2f4a7a', '#1d1d26', '#e9dcc4', '#5a6270', '#b23a2a'][j], shoes: ['#ffffff', '#1d1d26', '#ff5d73'][(i + j) % 3], hairStyle: H.hair[(i * 5 + j) % H.hair.length], skin: H.skins[(i * 5 + j) % 16], head: H.heads[(i + j) % H.heads.length], jacket: topStyle === 'crewjacke' ? { signatures: [{ color: '#39d0c8' }, { color: '#ffd166' }, { color: '#ff8a3d' }] } : null })));
  stats = await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 12, dx: 1.15, dz: 1.8 }), clothCfgs);
  await frames(page, 4);
  await shot(page, 'av06_kleidung_muster');
  check('Kleidung: ≤ 12000 Dreiecke', Math.max(...stats.map((s) => s.tris)) <= 12000);
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(-4, 60); LUMO.debug.setShot({ x: -3.5, y: y + 1.8, z: 63.4 }, { x: -3.5, y: y + 1.1, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av07_kleidung_nah');

  // 4) Masken, Rucksack, Aufnäher (39) von hinten, Crew-Jacke
  const patchIds = [...Array.from({ length: 30 }, (_, i) => `j1-e${String(i + 1).padStart(2, '0')}`), ...Array.from({ length: 9 }, (_, i) => `j1-j0${i + 1}`)];
  const extraCfgs = [
    ...H.masks.slice(1).map((mask, i) => ({ mask, hairStyle: H.hair[i * 3 % H.hair.length], topStyle: 'hoodie', top: '#3e78e0', skin: H.skins[i * 3] })),
    { back: 'rucksack', backColor: '#ff8a3d', topStyle: 'hoodie', top: '#2de2c9' },
    { topStyle: 'hoodie', top: '#ff5d73', patches: patchIds },
    { topStyle: 'crewjacke', top: '#1d1d26', patternColor: '#ffd166', patches: patchIds.slice(0, 12), jacket: { signatures: [{ color: '#39d0c8' }, { color: '#ffd166' }, { color: '#ff8a3d' }, { color: '#b06bff' }] } },
    { topStyle: 'hoodie', top: '#6c4bd6', pattern: 'leuchtkante', patternColor: '#2de2c9', hairStyle: 'locs' },
  ];
  stats = await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 10, dx: 1.25, dz: 1.8 }), extraCfgs);
  await frames(page, 4);
  await shot(page, 'av08_masken_rucksack_jacke');
  check('Masken/Aufnäher: ≤ 12000 Dreiecke', Math.max(...stats.map((s) => s.tris)) <= 12000, `max ${Math.max(...stats.map((s) => s.tris))}`);
  // von hinten: Aufnäher-Raster (Figuren zeigen mit dem Rücken zur Kamera)
  await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 3, dx: 1.2, dz: 1.8, yaw: Math.PI }), extraCfgs.slice(5, 8));
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(0, 60); LUMO.debug.setShot({ x: 0, y: y + 1.7, z: 63.2 }, { x: 0, y: y + 1.05, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av09_aufnaeher_ruecken');
  await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 5, dx: 1.2, dz: 1.8 }), extraCfgs.slice(0, 5));
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(0, 60); LUMO.debug.setShot({ x: 0, y: y + 1.8, z: 63.0 }, { x: 0, y: y + 1.35, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'av10_masken_nah');

  // 5) Statur und Größe
  const bodyCfgs = [];
  for (let i = 0; i < 12; i++) bodyCfgs.push({ build: (i % 6) / 5, height: i < 6 ? 0 : 1, topStyle: 'tshirt', top: '#ffd166', bottomsStyle: 'kurz', hairStyle: 'buzz', skin: H.skins[i] });
  await page.evaluate((cfgs) => window.__spawnGrid(cfgs, { cols: 12, dx: 1.1, dz: 1.8 }), bodyCfgs);
  await frames(page, 4);
  await shot(page, 'av11_statur_groesse');
  const heights = await page.evaluate(() => window.__H.list.map((h) => +h.humanoid.height.toFixed(3)));
  check('Größenregler ändert die Körpergröße (klein < groß)', heights[0] < heights[6] && heights[0] > 1.7 && heights[6] < 2.3, heights.join(' '));

  // 6) Alte Konfiguration (vor WP16) bleibt gültig; lite-Stufe spart Draw-Calls
  const legacy = await page.evaluate(() => {
    const cfg = { skin: '#f0c09a', hair: '#4a2e1f', hairStyle: 'kurz', top: '#ff5d73', topStyle: 'hoodie', bottoms: '#2f4a7a', bottomsStyle: 'lang', shoes: '#ffffff', accessory: 'rucksack', accessoryColor: '#ffd166' };
    const a = LUMO.createHumanoid(cfg); a.update(0.05);
    const b = LUMO.createHumanoid({ ...cfg, accessory: 'brille' }); b.update(0.05);
    const l = LUMO.createHumanoid(cfg, { detail: 'lite' }); l.update(0.05);
    const out = { back: a.config.back, glasses: b.config.glasses, full: Object.values(a.meshes).filter((m) => m.visible).length, lite: Object.values(l.meshes).filter((m) => m.visible).length, tris: a.triangles };
    a.dispose(); b.dispose(); l.dispose();
    return out;
  });
  check('Alte Konfiguration: accessory rucksack/brille wird übersetzt', legacy.back === 'rucksack' && legacy.glasses === 'rund', JSON.stringify(legacy));
  check("'lite' hat weniger sichtbare Meshes als 'full'", legacy.lite < legacy.full, `${legacy.lite} < ${legacy.full}`);

  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 3).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(failed ? '\n✘ avatar-grid' : '\n✔ avatar-grid');
process.exit(failed ? 1 : 0);
