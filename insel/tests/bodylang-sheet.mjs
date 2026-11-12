// Körpersprache-Bogen (WP17): 12 Posen (10 additive + Emote Stopp + neutral) × 2 Abstände in iPad-Auflösung,
// Emote-Bogen, Auren (Doppel-Aura, Intensitäten, Symbole für Farbenblinde, Innen-Aura, Grenz-Decal, Hotspots, Tanks,
// Streit-Tier) und Kosten: 12 Auren zugleich (Draw-Calls und Frame-Zeit-Differenz, SwiftShader ist nur ein Vergleichswert).
// Aufruf: node tests/bodylang-sheet.mjs   (SHOTS=Ordner, Q=low|medium|high)
import { launch, openGame, startGame, frames, shot, measureFrames, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'medium';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 11.5 });
  await page.evaluate(() => { LUMO.player.teleport(-60, 150, 0); LUMO.player.setEnabled(false); });

  await page.evaluate(() => {
    window.__row = (n, { cols, x0 = 0, z0 = 60, dx = 1.3, dz = 1.8, cfg = {} } = {}) => {
      if (window.__L) for (const h of window.__L) h.remove();
      const L = window.__L = [];
      for (let i = 0; i < n; i++) {
        const c = i % cols, r = Math.floor(i / cols);
        const x = x0 + (c - (cols - 1) / 2) * dx, z = z0 + r * dz;
        const y = LUMO.world.island.getHeight(x, z);
        const hum = LUMO.createHumanoid({ skin: LUMO.avatar.SKIN_TONES[(i * 5) % 16], hairStyle: LUMO.avatar.HAIR_STYLES[i % 15], top: ['#ff5d73', '#2de2c9', '#ffd166', '#6c4bd6', '#ff8a3d', '#3e78e0'][i % 6], topStyle: ['hoodie', 'tshirt', 'pullover', 'jacke'][i % 4], ...cfg }, { name: 'bl-' + i });
        hum.group.position.set(x, y, z);
        hum.setAnim('idle');
        LUMO.scene.add(hum.group);
        const off = LUMO.addUpdate((dt) => hum.update(dt, LUMO.camera));
        L.push({ humanoid: hum, remove() { off(); LUMO.scene.remove(hum.group); hum.dispose(); } });
      }
      return L.length;
    };
    window.__cam = (dist, { x = 0, z = 60, up = 0.55, lookY = 1.0 } = {}) => { const y = LUMO.world.island.getHeight(x, z); LUMO.debug.setShot({ x, y: y + lookY + dist * up * 0.5, z: z + dist }, { x, y: y + lookY, z }); LUMO.debug.advance(0.4); };
  });

  const POSES = await page.evaluate(() => LUMO.avatar.POSE_NAMES);
  check('10 additive Posen', POSES.length === 10, POSES.join(' '));
  const sheet = [...POSES.map((p) => ({ [p]: 1 })), 'stopp', null];   // 12 Spalten: 10 Posen, Stopp-Emote, neutral
  const LABEL = [...POSES, 'stopp (Emote)', 'neutral'];

  // Nahaufnahme (2,6 m) und Abstand (6 m), je 12 Figuren in einer Reihe
  for (const [name, dist, dx] of [['bl01_posen_nah', 2.9, 0.62], ['bl02_posen_fern', 6.5, 1.35]]) {
    await page.evaluate(([sheet, dx]) => {
      window.__row(12, { cols: 12, dx });
      window.__L.forEach((h, i) => {
        const s = sheet[i];
        if (s === 'stopp') h.humanoid.playEmote('stopp', { freeze: 0.5 });
        else if (s) { h.humanoid.setPoses(s); h.humanoid.bodyLanguage.snap(); }
      });
      LUMO.debug.advance(1.4);
    }, [sheet, dx]);
    await page.evaluate((d) => window.__cam(d, { lookY: 1.05, up: 0.35 }), dist);
    await frames(page, 4);
    await shot(page, name);
  }
  console.log('   Spalten:', LABEL.join(' · '));
  // Posen lesbar: Kopf gesenkt, Fäuste, Schultern hoch, Schritt zurück lassen sich am Skelett ablesen
  const readable = await page.evaluate(() => {
    const L = window.__L, J = (i) => L[i].humanoid.joints, H = (i) => L[i].humanoid;
    const neutral = J(11);
    return {
      shoulderUp: J(0).shL.position.y - neutral.shL.position.y > 0.02,
      headDown: J(1).head.rotation.x - neutral.head.rotation.x > 0.3,
      gazeAway: Math.abs(J(2).head.rotation.y - neutral.head.rotation.y) > 0.4,
      fistClench: H(3).hands === 'fist',
      armCross: J(4).elL.rotation.x < -1.2,
      stepBack: J(5).body.position.z < -0.15,
      jawTension: H(6).expression.mouth < -0.4,
      fidget: Math.abs(J(7).elL.rotation.x - neutral.elL.rotation.x) > 0.4,
      slump: J(8).spine.rotation.x - neutral.spine.rotation.x > 0.25,
      upright: J(9).spine.rotation.x - neutral.spine.rotation.x < -0.08,
      stopp: H(10).hands === 'stop' && J(10).shR.rotation.x < -1.2,
    };
  });
  const bad = Object.entries(readable).filter(([, v]) => !v).map(([k]) => k);
  check('Alle Posen sind am Skelett eindeutig ablesbar', bad.length === 0, bad.length ? 'unklar: ' + bad.join(', ') : '11/11');

  // Emote-Bogen: 12 Emotes mitten im Clip
  const EMOTES = await page.evaluate(() => LUMO.avatar.EMOTE_NAMES);
  await page.evaluate((E) => {
    window.__row(12, { cols: 12, dx: 1.3 });
    window.__L.forEach((h, i) => h.humanoid.playEmote(E[i], { freeze: [0.45, 0.5, 0.5, 0.5, 0.3, 0.3, 0.5, 0.2, 0.5, 0.35, 0.3, 0.35][i] }));
    LUMO.debug.advance(0.9);
  }, EMOTES);
  await page.evaluate(() => window.__cam(6.6, { lookY: 1.0, up: 0.35 }));
  await frames(page, 4);
  await shot(page, 'bl03_emotes');
  console.log('   Emotes:', EMOTES.join(' · '));
  const emoting = await page.evaluate(() => window.__L.filter((h) => h.humanoid.emote).length);
  check('12 Emotes laufen gleichzeitig', emoting === 12, String(emoting));

  // Auren: Farbe + Symbol je Gefühl, Intensitäten 1/5/10, Doppel-Aura, Innen-Aura (Masken-Blick), Grenz-Decal, Hotspots, Tanks, Streit-Tier
  await page.evaluate(() => {
    window.__row(12, { cols: 12, dx: 1.6 });
    const E = ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'];
    const L = window.__L;
    E.forEach((e, i) => L[i].humanoid.aura.setEmotion({ emotion: e, intensity: [1, 5, 10, 7, 3, 9][i] }));
    L[6].humanoid.aura.setEmotion({ emotion: 'freude', intensity: 6 }, { emotion: 'trauer', intensity: 8 });
    L[7].humanoid.aura.setEmotion({ emotion: 'freude', intensity: 3 }); L[7].humanoid.aura.setInner({ emotion: 'wut', intensity: 9 }); L[7].humanoid.aura.setMaskView(true);
    L[8].humanoid.aura.setEmotion({ emotion: 'angst', intensity: 6 }); L[8].humanoid.aura.setBoundary(1.6);
    L[9].humanoid.aura.setEmotion({ emotion: 'wut', intensity: 8 }); L[9].humanoid.aura.setHotspots(['bauch', 'faeuste', 'schultern', 'kiefer']); L[9].humanoid.setPoses({ fistClench: 1, jawTension: 1 }); L[9].humanoid.bodyLanguage.snap();
    L[10].humanoid.aura.setEmotion({ emotion: 'ekel', intensity: 4 }); L[10].humanoid.aura.setTanks({ koerper: 0.7, sicherheit: 0.6, zugehoerigkeit: 0.15, anerkennung: 0.4, selbstbestimmung: 0.6, spass: 0.5 });
    L[11].humanoid.aura.setEmotion({ emotion: 'wut', intensity: 7 }); L[11].humanoid.aura.setStreitTier('hai');
    LUMO.debug.advance(2);
  });
  await page.evaluate(() => window.__cam(8.4, { lookY: 1.15, up: 0.3 }));
  await frames(page, 4);
  await shot(page, 'bl04_auren');
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(-4, 60); LUMO.debug.setShot({ x: -6.2, y: y + 1.8, z: 63.3 }, { x: -6.2, y: y + 1.2, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'bl05_auren_nah_symbole');
  await page.evaluate(() => { const y = LUMO.world.island.getHeight(4, 60); LUMO.debug.setShot({ x: 5.6, y: y + 1.9, z: 63.6 }, { x: 5.6, y: y + 1.3, z: 60 }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, 'bl06_auren_nah_extras');
  const auraState = await page.evaluate(() => ({ symbols: window.__L[6].humanoid.aura.symbols.children.length, inner: window.__L[7].humanoid.aura.inner.visible, hot: window.__L[9].humanoid.aura.hotspots.length, tanks: window.__L[10].humanoid.aura.tanks, tier: window.__L[11].humanoid.aura.streitTier }));
  check('Doppel-Aura zeigt zwei Symbole (Farbenblind-Hilfe)', auraState.symbols === 2, JSON.stringify(auraState));
  check('Innen-Aura im Masken-Blick sichtbar, Hotspots, Tanks, Streit-Tier gesetzt', auraState.inner && auraState.hot === 4 && auraState.tanks && auraState.tier === 'hai');

  // Kosten: 12 Figuren ohne / mit Aura (Draw-Calls, Frame-Zeit)
  await page.evaluate(() => { window.__row(12, { cols: 6, dx: 1.4, dz: 1.8 }); LUMO.debug.advance(0.5); });
  await page.evaluate(() => window.__cam(9, { lookY: 1.0, up: 0.35 }));
  await frames(page, 4);
  const msOff = await measureFrames(page, 12);
  const callsOff = await page.evaluate(() => LUMO.renderer.info.render.calls);
  await page.evaluate(() => { window.__L.forEach((h, i) => h.humanoid.aura.setEmotion({ emotion: ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'][i % 6], intensity: 5 + (i % 5) })); LUMO.debug.advance(1.5); });
  await frames(page, 4);
  const msOn = await measureFrames(page, 12);
  const callsOn = await page.evaluate(() => LUMO.renderer.info.render.calls);
  await shot(page, 'bl07_zwoelf_auren');
  console.log(`   12 Auren: Draw-Calls ${callsOff} → ${callsOn} (+${callsOn - callsOff}), Frame ${msOff.toFixed(1)} → ${msOn.toFixed(1)} ms (SwiftShader, nur Vergleich)`);
  check('12 Auren kosten ≤ 3 Draw-Calls je Figur', callsOn - callsOff <= 36, `+${callsOn - callsOff}`);

  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 3).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(failed ? '\n✘ bodylang-sheet' : '\n✔ bodylang-sheet');
process.exit(failed ? 1 : 0);
