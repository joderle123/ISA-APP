// Unit-Tests Avatar (WP16/17/41, Node ohne Browser): Konfiguration (alt → neu), 16 Hauttöne, alle Frisuren × Hauttöne
// und alle Hilfsmittel bauen ohne Fehler und bleiben ≤ 12000 Dreiecke (weiche Cel-Shading-Figur, Stil-Bibel §8), Aufnäher-Raster (39, keine Überlappung),
// Körpersprache (10 Posen, additiv, Gefühl → Posen), Emotes (12 inkl. 3 Tänze, Promise), Aura-Helfer, Kosmetik-Inventar.
// Aufruf: node --test tests/unit/avatar.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createHumanoid, normalizeConfig, randomConfig, DEFAULT_CONFIG, SKIN_TONES, HAIR_STYLES, GLASSES, HEARING_AIDS, PROSTHESES, MASKS,
  TOP_STYLES, BOTTOM_STYLES, SHOE_STYLES, PATTERNS, HEAD_ITEMS, PATCH_MAX, patchLayout, normalizePatch,
  POSE_NAMES, POSES, bodyLanguageFor, createBodyLanguage, EMOTE_NAMES, EMOTES, DANCES, ringsFor, ANIMS,
} from '../../src/actors/humanoid.js';
import { createRng } from '../../src/core/rng.js';
import { evalSource, ownedItems, applyEquipped, dyesFor, emotesFor, jacketSignatures } from '../../src/systems/cosmetics/inventory.js';
import basis from '../../src/content/cosmetics/basis.js';

const ALL_PATCHES = [...Array.from({ length: 30 }, (_, i) => `j1-e${String(i + 1).padStart(2, '0')}`), ...Array.from({ length: 9 }, (_, i) => `j1-j0${i + 1}`)];

test('normalizeConfig: alte Konfigurationen (accessory) bleiben gültig und werden übersetzt', () => {
  const a = normalizeConfig({ skin: '#f0c09a', hairStyle: 'lang', accessory: 'rucksack', accessoryColor: '#ffd166' });
  assert.equal(a.back, 'rucksack'); assert.equal(a.backColor, '#ffd166'); assert.equal(a.accessory, 'keins'); assert.equal(a.hairStyle, 'lang');
  assert.equal(normalizeConfig({ accessory: 'brille' }).glasses, 'rund');
  assert.equal(normalizeConfig({ accessory: 'cap', accessoryColor: '#ff0000' }).head, 'cap');
  assert.equal(normalizeConfig({ accessory: 'cap', accessoryColor: '#ff0000' }).headColor, '#ff0000');
  // Unbekannte Werte fallen auf Standard zurück, Zahlen werden begrenzt
  const b = normalizeConfig({ hairStyle: 'gibtsnicht', build: 7, height: -3, freckles: 9, skin: 'rot' });
  assert.equal(b.hairStyle, 'kurz'); assert.equal(b.build, 1); assert.equal(b.height, 0); assert.equal(b.freckles, 2); assert.equal(b.skin, DEFAULT_CONFIG.skin);
  assert.equal(normalizeConfig({ head: 'kapuze', topStyle: 'tshirt' }).head, 'keins');
  assert.equal(normalizeConfig({ patches: ALL_PATCHES.concat(['x']) }).patches.length, PATCH_MAX);
  assert.equal(SKIN_TONES.length, 16);
  assert.ok(HAIR_STYLES.includes('kopftuch') && HAIR_STYLES.includes('locs') && HAIR_STYLES.includes('flechtzoepfe') && HAIR_STYLES.includes('buzz'));
});

test('Alle Frisuren × 4 Hauttöne und alle Hilfsmittel bauen ohne Fehler, ≤ 12000 Dreiecke', () => {
  let max = 0;
  for (const hairStyle of HAIR_STYLES) for (const skin of [SKIN_TONES[0], SKIN_TONES[5], SKIN_TONES[10], SKIN_TONES[15]]) {
    const h = createHumanoid({ hairStyle, skin, freckles: 2, vitiligo: 1 });
    h.update(1 / 30);
    max = Math.max(max, h.triangles);
    h.dispose();
  }
  for (const glasses of GLASSES) for (const hearingAid of HEARING_AIDS) for (const prosthesis of PROSTHESES) {
    const h = createHumanoid({ glasses, hearingAid, prosthesis, topStyle: 'tshirt' });
    h.update(1 / 30); max = Math.max(max, h.triangles); h.dispose();
  }
  // Maximalausstattung: alles an, 39 Aufnäher, Crew-Jacke, Maske
  const full = createHumanoid({ hairStyle: 'flechtzoepfe', glasses: 'sport', hearingAid: 'beide', prosthesis: 'links', mask: 'eule', pattern: 'camo', topStyle: 'crewjacke', patches: ALL_PATCHES, jacket: { signatures: Array.from({ length: 12 }, () => ({ color: '#ffd166' })) }, freckles: 2, vitiligo: 1, head: 'kopfhoerer', back: 'rucksack', shoesStyle: 'boots', bottomsStyle: 'cargo' });
  full.update(1 / 30); max = Math.max(max, full.triangles);
  assert.ok(Object.values(full.meshes).length >= 16);
  full.dispose();
  assert.ok(max <= 12000, `max ${max}`);
  // Alle Kleidungsstile und Masken
  for (const topStyle of TOP_STYLES) for (const bottomsStyle of BOTTOM_STYLES) { const h = createHumanoid({ topStyle, bottomsStyle, shoesStyle: SHOE_STYLES[topStyle.length % 4], pattern: PATTERNS[bottomsStyle.length % PATTERNS.length], head: HEAD_ITEMS[topStyle.length % HEAD_ITEMS.length] }); h.update(0.05); h.dispose(); }
  for (const mask of MASKS) { const h = createHumanoid({ mask }, { detail: 'lite' }); h.update(0.05); assert.ok(Object.values(h.meshes).length < 14); h.dispose(); }
});

test('Statur/Größe: Größe skaliert die Figur, Statur verschiebt Schultern und Hüften', () => {
  const s = createHumanoid({ height: 0, build: 0 }), l = createHumanoid({ height: 1, build: 1 });
  assert.ok(s.height < l.height && s.height > 1.7 && l.height < 2.3, `${s.height} ${l.height}`);
  assert.ok(s.joints.shL.position.x < l.joints.shL.position.x);
  s.dispose(); l.dispose();
});

test('Aufnäher-Raster: 39 Plätze, eindeutig, Rücken 30 + Ärmel 9, Farben je Modul', () => {
  const lay = patchLayout(39);
  assert.equal(lay.length, 39);
  assert.equal(lay.filter((l) => l.where === 'back').length, 30);
  assert.equal(lay.filter((l) => l.where === 'armL').length, 5);
  assert.equal(lay.filter((l) => l.where === 'armR').length, 4);
  const keys = new Set(lay.map((l) => `${l.where}:${(l.u || 0).toFixed(3)}:${l.v.toFixed(3)}`));
  assert.equal(keys.size, 39);
  assert.equal(patchLayout(50).length, 39);
  assert.equal(patchLayout(0).length, 0);
  assert.equal(normalizePatch('j1-e11').module, 'j1-m3');
  assert.equal(normalizePatch('j1-j03').joker, true);
  assert.equal(normalizePatch({ id: 'j1-e01', color: '#123456' }).color, '#123456');
  const h = createHumanoid({ patches: ALL_PATCHES });
  const t0 = createHumanoid({ patches: [] });
  assert.ok(h.meshes.torso.geometry.attributes.position.count > t0.meshes.torso.geometry.attributes.position.count);
  assert.ok(h.meshes.upperL.geometry.attributes.position.count > t0.meshes.upperL.geometry.attributes.position.count);
  h.dispose(); t0.dispose();
});

test('Körpersprache: 10 Posen, additiv über der Animation, Fäuste bei fistClench, Gefühl → Posen', () => {
  assert.equal(POSE_NAMES.length, 10);
  for (const n of POSE_NAMES) assert.ok(POSES[n], n);
  const h = createHumanoid({});
  for (let i = 0; i < 20; i++) h.update(1 / 30);
  const base = h.joints.head.rotation.x;
  h.setPose('headDown', 1);
  for (let i = 0; i < 60; i++) h.update(1 / 30);
  assert.ok(h.joints.head.rotation.x > base + 0.3, 'Kopf senkt sich');
  assert.ok(h.bodyLanguage.weights.headDown > 0.9);
  h.setPoses({ fistClench: 1 });
  for (let i = 0; i < 60; i++) h.update(1 / 30);
  assert.equal(h.hands, 'fist');
  assert.equal(h.meshes['handL-fist'].visible, true); assert.equal(h.meshes['handL-open'].visible, false);
  h.clearPoses();
  for (let i = 0; i < 60; i++) h.update(1 / 30);
  assert.equal(h.hands, 'open');
  assert.ok(Math.abs(h.joints.head.rotation.x - base) < 0.15);
  h.dispose();
  const w = bodyLanguageFor('wut', 10);
  assert.equal(w.fistClench, 1); assert.ok(w.jawTension > 0.8);
  const t = bodyLanguageFor('trauer', 5, { emotion: 'angst', intensity: 10 });
  assert.ok(t.slump > 0.45 && t.slump < 0.55); assert.ok(t.shoulderUp > 0.45);
  assert.deepEqual(bodyLanguageFor('unbekannt', 5), {});
  // Reine Schicht (ohne Figur): Schultern heben
  const J = {}; for (const j of ['body', 'spine', 'head', 'hipL', 'hipR', 'kneeL', 'kneeR', 'shL', 'shR', 'elL', 'elR']) J[j] = { rotation: { x: 0, y: 0, z: 0, set(x, y, z) { this.x = x; this.y = y; this.z = z; } }, position: { x: 0, y: 0, z: 0 } };
  const bl = createBodyLanguage(J, { shoulderY: 0.5 });
  bl.set('shoulderUp', 1); bl.snap(); bl.update(1 / 30, 0);
  assert.ok(J.shL.position.y > 0.52);
  assert.ok(bl.face.brows > 0.3);
});

test('Emotes: 12 Clips inkl. 3 Tänze, laufen ab und lösen auf, Stopp bricht ab, Dreh-Tanz dreht den Körper', async () => {
  assert.equal(EMOTE_NAMES.length, 12);
  assert.equal(DANCES.length, 3);
  for (const n of EMOTE_NAMES) assert.equal(typeof EMOTES[n].fn, 'function', n);
  const h = createHumanoid({});
  const p = h.playEmote('winken');
  assert.equal(h.emote, 'winken');
  for (let i = 0; i < 40; i++) h.update(1 / 30);
  assert.ok(h.joints.shR.rotation.z < -1.5, 'Arm oben beim Winken');
  for (let i = 0; i < 40; i++) h.update(1 / 30);
  const r = await p;
  assert.equal(r.done, true); assert.equal(h.emote, null);
  const q = h.playEmote('tanzDreh');
  for (let i = 0; i < 30; i++) h.update(1 / 30);
  assert.ok(h.joints.body.rotation.y > 1, 'dreht sich');
  h.stopEmote();
  assert.equal((await q).cancelled, true);
  const s = h.playEmote('stopp');
  for (let i = 0; i < 30; i++) h.update(1 / 30);
  assert.equal(h.hands, 'stop');
  h.stopEmote(); await s;
  const d = h.playEmote('daumen');
  for (let i = 0; i < 30; i++) h.update(1 / 30);
  assert.equal(h.meshes['handR-thumb'].visible, true);
  h.stopEmote(); await d;
  assert.equal((await h.playEmote('gibtsnicht')).done, false);
  h.dispose();
  assert.ok(ANIMS.includes('wave'));
});

test('Aura: Ringe je Intensität, Doppel-Aura, Innen-Aura, Grenz-Decal, Hotspots, Tanks, Streit-Tier', () => {
  assert.equal(ringsFor(0), 1); assert.equal(ringsFor(10), 6); assert.equal(ringsFor(5), 4);
  const h = createHumanoid({});
  h.setEmotionAura('#ff0000');
  for (let i = 0; i < 30; i++) h.update(1 / 30);
  assert.ok(h.aura.visible && h.aura.amount > 0.5);
  h.aura.setEmotion({ emotion: 'freude', intensity: 6 }, { emotion: 'trauer', intensity: 8 });
  assert.equal(h.aura.state.secondary.emotion, 'trauer');
  h.aura.setInner({ emotion: 'wut', intensity: 9 }); h.aura.setMaskView(true);
  h.aura.setBoundary(1.8); h.aura.setHotspots(['bauch', 'faeuste', 'kiefer']); h.aura.setTanks({ koerper: 0.5, spass: 1 }); h.aura.setStreitTier('hai');
  for (let i = 0; i < 30; i++) h.update(1 / 30);
  assert.equal(h.aura.inner.visible, true);
  assert.equal(h.aura.boundary, 1.8);
  assert.deepEqual(h.aura.hotspots, ['bauch', 'faeuste', 'kiefer']);
  assert.equal(h.aura.tanks, true);
  assert.equal(h.aura.streitTier, 'hai');
  h.setEmotionAura(null);
  for (let i = 0; i < 90; i++) h.update(1 / 30);
  assert.equal(h.aura.visible, false);
  h.dispose();
});

test('randomConfig ist je Seed gleich und immer gültig', () => {
  const a = randomConfig(createRng(7)), b = randomConfig(createRng(7)), c = randomConfig(createRng(8));
  assert.deepEqual(a, b);
  assert.notDeepEqual(a, c);
  for (let i = 0; i < 40; i++) { const r = randomConfig(createRng(100 + i)); assert.deepEqual(normalizeConfig(r), r); }
});

test('Kosmetik-Inventar: Quellen, Besitz, Anlegen, Farbsets, Emotes, Jacken-Unterschriften', () => {
  const items = basis.items;
  const data = { units: { 'j1-e24': 'fertig', 'j1-e02': 'fertig' }, veil: { zones: { strand: 0, hafen: 0.4 }, patches: { glimmer: 0 } }, shards: [3], bonds: { jolie: 2 }, medals: { 'e10-kronen-segeln': { medal: 'silber' }, 'hafen-daecher': { medal: 'gold' } }, collectibles: { 'nk-strand': true }, cosmetics: { owned: ['glimm-fledermaus'], equipped: {} } };
  assert.equal(evalSource({ start: true }, data), true);
  assert.equal(evalSource({ unitDone: 'j1-e24' }, data), true);
  assert.equal(evalSource({ unitDone: 'j1-e25' }, data), false);
  assert.equal(evalSource({ regionFreed: 'strand' }, data), true);
  assert.equal(evalSource({ regionFreed: 'hafen' }, data), false);
  assert.equal(evalSource({ regionFreed: 'glimmer' }, data), true);
  assert.equal(evalSource({ shard: 3 }, data), true);
  assert.equal(evalSource({ bond: ['jolie', 2] }, data), true);
  assert.equal(evalSource({ bond: ['jolie', 3] }, data), false);
  assert.equal(evalSource({ minigame: 'e10-kronen-segeln', medal: 'gold' }, data), false);
  assert.equal(evalSource({ minigame: 'hafen-daecher', medal: 'gold' }, data), true);
  assert.equal(evalSource({ nebelkern: 'nk-strand' }, data), true);
  assert.equal(evalSource(null, data), false);
  const owned = ownedItems(items, data).map((i) => i.id);
  assert.ok(owned.includes('maske-fuchs') && owned.includes('emote-winken') && owned.includes('glimm-fledermaus') && owned.includes('farbe-lagune') && owned.includes('spur-funken'));
  assert.ok(!owned.includes('jacke-crew') && !owned.includes('segel-regenbogen'));
  const look = applyEquipped(items, { maske: 'maske-hai', kopf: 'kopf-crew-bandana', jacke: 'jacke-crew' }, { topStyle: 'hoodie', mask: 'keine' }, { signatures: [{ color: '#fff' }] });
  assert.equal(look.mask, 'hai'); assert.equal(look.head, 'bandana'); assert.equal(look.topStyle, 'crewjacke'); assert.equal(look.jacket.signatures.length, 1);
  assert.equal(applyEquipped(items, {}, { topStyle: 'crewjacke' }).topStyle, 'hoodie');
  assert.equal(applyEquipped(items, { maske: 'emote-winken' }, { mask: 'fuchs' }).mask, 'keine');
  const dy = dyesFor(items, data);   // Strand und Glimmerwolke sind frei → zwei Farbsets
  assert.ok(dy.includes('#2de2c9') && dy.includes('#ff8ccf') && dy.length === 8, dy.join(' '));
  const em = emotesFor(items, data);
  assert.ok(em.includes('winken') && em.includes('daumen') && em.includes('tanzWelle') && !em.includes('stopp'));
  const sig = jacketSignatures({ jolie: 2, tun: 1, luc: 3 }, [{ id: 'jolie', color: '#39d0c8', icon: 'muschel' }]);
  assert.equal(sig.length, 2); assert.equal(sig[0].color, '#39d0c8'); assert.equal(sig[1].icon, 'stern');
  // Jeder Eintrag hat name (≤ 6 Wörter), slot und Quelle
  for (const it of items) { assert.ok(it.name && it.name.split(/\s+/).length <= 6, it.id); assert.ok(it.slot && it.source, it.id); }
});
