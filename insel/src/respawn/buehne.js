// RESPAWN – Bühne: spielt eine Situation in der 3D-Welt (Ort, Uhrzeit, Figuren aufstellen, Kamera, Blasen, Wahlen).
// Die Schritte kommen aus daten/situationen-*.js; die Regeln (Sperren, Uhr, Wirkungen) aus run.js.
//   const buehne = createBuehne({ game, O })      O = Oberfläche (oberflaeche.js)
//   await buehne.spiele(situation, R) → { abgebrochen? }      buehne.zeige(ort, uhr) (freier Nachmittag)
import * as THREE from 'three';
import { wirke, wahlen, zeitFuer, ohneWahl, SPERRE_TEXT, hatKarte, karte } from './run.js';
import { FIGUREN, STIMMEN } from './daten/index.js';

const fn = (v, R) => (typeof v === 'function' ? v(R) : v);
const warte = (ms) => new Promise((r) => setTimeout(r, ms));

export function createBuehne({ game, O }) {
  const { ui, npcs, player, cameraRig } = game;
  const test = game.params && game.params.has('test');
  let szene = null;   // { sit, R, cast: Map(id → npc), fremd: Set, mitte, versteckt: [npc] }
  const wurzel = document.getElementById('lumo-root');
  const vPos = new THREE.Vector3(), vLook = new THREE.Vector3(), vZiel = new THREE.Vector3();
  // Kino-Unschärfe: scharf ist, wer spricht (oder die Gruppe); der Rest des Bildes wird weich
  let fokus = null;   // Object3D | Vector3 | null
  game.addUpdate(() => {
    const g = game.gfx;
    if (!g || !g.setDof) return;
    if (!szene || !fokus) { g.setDof(0); return; }
    if (fokus.isObject3D) fokus.getWorldPosition(vZiel).y += 1.4; else vZiel.copy(fokus);
    g.setDof(szene.nah ? 1 : 0.6, Math.max(1.5, game.camera.position.distanceTo(vZiel)));
  }, { order: 94, always: true });
  // Bild der Szene: Kamera schräg hinter dir, du im linken Drittel, die anderen im Blick
  function totale() {
    if (!szene || !szene.mitte || !cameraRig.setShot) return;
    const { a, px, pz, cx, cz } = szene.mitte;
    const y = player.position.y;
    const fx = Math.sin(a), fz = Math.cos(a), rx = Math.cos(a), rz = -Math.sin(a);
    vPos.set(px - fx * 2.9 + rx * 3.0, y + 2.15, pz - fz * 2.9 + rz * 3.0);
    vLook.set(cx + fx * 0.6, y + 1.35, cz + fz * 0.6);
    cameraRig.setShot(vPos, vLook);
    fokus = vLook.clone(); szene.nah = false;
  }

  // Sprecher anmelden (Figuren ohne Eintrag in der Insel, Stimmen am Telefon)
  for (const [id, f] of Object.entries(FIGUREN)) ui.bubbles.registerSpeaker(id, { name: f.name, icon: f.icon, color: f.color, voice: f.voice });
  for (const [id, s] of Object.entries(STIMMEN)) ui.bubbles.registerSpeaker(id, s);

  function figur(id) {
    let n = npcs.get(id);
    if (!n && FIGUREN[id]) { n = npcs.spawn(FIGUREN[id]); if (szene) szene.fremd.add(id); }
    return n;
  }
  const yawZu = (x1, z1, x2, z2) => Math.atan2(x2 - x1, z2 - z1);

  function aufstellen(sit, R) {
    const site = game.content.resolveSite(fn(sit.ort, R)) || { x: 6, z: 118 };
    const v = sit.versatz || {};
    const cx = site.x + (v.x || 0), cz = site.z + (v.z || 0);
    // Blickrichtung: zur Inselmitte hin (Dorf und Berg im Hintergrund), außer die Situation gibt eine vor
    const a = typeof sit.richtung === 'number' ? sit.richtung : Math.atan2(-cx, -cz);
    const px = cx - Math.sin(a) * 1.3, pz = cz - Math.cos(a) * 1.3;
    if (typeof sit.uhr === 'number') game.time.setTimeOfDay(sit.uhr);
    if (game.world.sky.setStorm) game.world.sky.setStorm(sit.sturm || 0);
    player.teleport(px, pz, a);
    const ids = fn(sit.cast, R) || [];
    const n = ids.length;
    ids.forEach((id, i) => {
      const f = figur(id);
      if (!f) return;
      const off = n === 1 ? 0 : (i / (n - 1) - 0.5) * Math.min(1.5, 0.75 * (n - 1));
      const d = 1.5 + (n > 2 && i % 2 ? 0.5 : 0);
      const x = cx + Math.sin(a + off) * d, z = cz + Math.cos(a + off) * d;
      const yaw = yawZu(x, z, px, pz);
      if (f.warpTo) f.warpTo(x, z, yaw);
      f.setOverride({ x, z, yaw, anim: 'idle' });
      f.face({ x: px, y: 1.4, z: pz });
      szene.cast.set(id, f);
    });
    szene.mitte = { cx, cz, a, px, pz };
    // Wer nicht zur Situation gehört und im Bild stünde, tritt kurz zur Seite
    for (const f of npcs.list()) {
      if (szene.cast.has(f.id) || f.override || !f.position) continue;
      if (Math.hypot(f.position.x - cx, f.position.z - cz) < 7) { f.setOverride({ hidden: true }); szene.versteckt.push(f); }
    }
    if (cameraRig.behindPlayer) cameraRig.behindPlayer();
    if (cameraRig.snap) cameraRig.snap();
    totale();
    wurzel.classList.add('rs-szene');
  }

  function abbauen() {
    if (!szene) return;
    for (const [id, f] of szene.cast) {
      if (szene.fremd.has(id)) { npcs.remove(id); continue; }
      try { f.face(null); f.clearOverride(); if (f.humanoid) f.humanoid.setExpression(null); } catch (e) { /* Figur schon weg */ }
    }
    for (const f of szene.versteckt) { try { f.clearOverride(); } catch (e) { /* schon weg */ } }
    if (cameraRig.setMode) cameraRig.setMode(null);
    if (cameraRig.setShot) cameraRig.setShot(null);
    if (cameraRig.behindPlayer) cameraRig.behindPlayer();
    wurzel.classList.remove('rs-szene');
    ui.lock.release('respawn');
    szene = null; fokus = null;
  }

  function mimik(id, f, opt) {
    if (!f || !opt) return;
    if (opt.versteckt !== undefined) { const o = f.override || {}; f.setOverride({ ...o, hidden: !!opt.versteckt }); }
    if (opt.mimik) { if (npcs.setEmotion && !szene.fremd.has(id)) npcs.setEmotion(id, { primary: [opt.mimik, 7] }); if (f.humanoid) f.humanoid.setExpression(opt.mimik); }
    if (opt.anim) { const o = f.override || {}; f.setOverride({ ...o, anim: opt.anim }); }
    if (opt.emote && f.humanoid && f.humanoid.playEmote) { try { f.humanoid.playEmote(opt.emote, {}); } catch (e) { /* unbekannte Geste */ } }
  }
  function kamera(f) {
    if (f && f.group && cameraRig.setMode) { cameraRig.setMode('talk', { target: f.group, side: 1 }); fokus = f.group; if (szene) szene.nah = true; }
  }

  async function wahl(liste, opt = {}) {
    const { R, sit } = szene;
    const sicht = wahlen(R, liste);
    if (!sicht.length) return;
    // Zu viel Druck sperrt ruhige Antworten. Dann darf man einmal je Auswahl erst durchatmen (kleines Spiel) – das senkt
    // den Druck, danach steht dieselbe Auswahl noch einmal da. Erst runterkommen, dann antworten: ohne ein Wort darüber.
    const atem = !opt._geatmet && sicht.some((w) => w.gesperrt === 'druck');
    let sek = opt.ruhe ? 0 : zeitFuer(R);
    if (opt.eil) sek = Math.min(sek || 10, 10);
    const standard = ohneWahl(R, sicht);
    totale();
    const r = await O.wahl({
      frage: opt.frage,
      items: sicht.concat(atem ? [{ t: 'Erst durchatmen.', art: 'ruhig', _atem: true }] : []).map((w) => ({
        label: w.t, art: w.art, gesperrt: !!w.gesperrt,
        sub: w.gesperrt ? (w.gesperrt === 'geld' ? 'Zu wenig Geld' : SPERRE_TEXT[w.gesperrt]) : (w.kostet ? w.kostet + ' Euro' : ''),
        karte: w.nur ? karte('kopf', w.nur) : null,
      })),
      sekunden: sek, standard, druck: R.druck,
    });
    if (atem && r.index === sicht.length && !r.uhr) {
      const erg = await O.atmen({ zuege: 3 });
      game.events.emit('respawn:atem', erg);
      O.wirkung(wirke(R, { druck: -(8 + 4 * erg.gut) }), R);
      return wahl(liste, { ...opt, _geatmet: true });
    }
    const w = sicht[r.index] || sicht[standard];
    R.log.push({ sit: sit.id, wahl: w.t, art: w.art, uhr: !!r.uhr });
    game.events.emit('respawn:wahl', { sit: sit.id, wahl: w.t, art: w.art, uhr: !!r.uhr });
    if (r.uhr) await O.erzaehler('Zu lange gezögert.', { kurz: true });
    O.wirkung(wirke(R, w.e, { reiz: !!(w.reiz || opt.reiz) }), R);
    await lauf(w.dann || []);
  }

  async function lauf(schritte) {
    for (const s of schritte) {
      if (!szene) return;
      const { R } = szene;
      const art = s[0];
      if (art === 't') { totale(); await O.erzaehler(s[1]); }
      else if (art === 'd') { totale(); await O.gedanke(s[1]); }
      else if (art === 'k') { if (hatKarte(R, s[1])) { totale(); await O.gedanke(s[2], karte('kopf', s[1])); } }
      else if (art === 's') {
        const id = fn(s[1], R), f = szene.cast.get(id) || null;
        if (f) { mimik(id, f, s[3]); kamera(f); if (f.override) f.setOverride({ ...f.override, anim: (s[3] && s[3].anim) || 'talk' }); }
        await ui.say({ who: id, text: s[2], anchor: f ? f.group : null });
        if (f && f.override) f.setOverride({ ...f.override, anim: (s[3] && s[3].anim) || 'idle' });
      }
      else if (art === 'm') mimik(fn(s[1], R), szene.cast.get(fn(s[1], R)), s[2]);
      else if (art === 'weg') { const f = szene.cast.get(fn(s[1], R)); if (f) { f.setOverride({ ...(f.override || {}), hidden: true }); if (!test) await warte(350); } }
      else if (art === 'e') O.wirkung(wirke(R, s[1], s[2] || {}), R);
      else if (art === 'wenn') await lauf(s[1](R) ? (s[2] || []) : (s[3] || []));
      else if (art === 'w') await wahl(s[1], s[2] || {});
      // Durchatmen: ['atem', { zuege }, (ergebnis) => Schritte]
      else if (art === 'atem') { totale(); const erg = await O.atmen(s[1] || {}); game.events.emit('respawn:atem', erg); await lauf((s[2] && s[2](erg, R)) || []); }
      // Nicht zucken: ['zuck', { titel }, (ergebnis) => Schritte] – ergebnis { richtig, von }
      else if (art === 'zuck') { totale(); const erg = await O.nichtZucken({ ...s[1], druck: R.druck }); game.events.emit('respawn:zucken', erg); await lauf((s[2] && s[2](erg, R)) || []); }
      // Merken: ['merk', { titel, dinge }, (ergebnis) => Schritte] – ergebnis { richtig, von }
      else if (art === 'merk') { totale(); const erg = await O.merken({ ...s[1], druck: R.druck }); game.events.emit('respawn:merken', erg); await lauf((s[2] && s[2](erg, R)) || []); }
      // Geschick: ['spiel', { titel, bild }, (ergebnis) => Schritte] – wie es weitergeht, hängt von den Treffern ab
      else if (art === 'spiel') { totale(); const erg = await O.geschick({ ...s[1], druck: R.druck }); game.events.emit('respawn:geschick', erg); await lauf((s[2] && s[2](erg, R)) || []); }
    }
  }

  return {
    get aktiv() { return !!szene; },
    async spiele(sit, R) {
      szene = { sit, R, cast: new Map(), fremd: new Set(), mitte: null, versteckt: [] };
      ui.lock.acquire('respawn');
      try {
        aufstellen(sit, R);
        if (!test) await warte(500);
        await lauf(fn(sit.szene, R) || []);
      } finally { abbauen(); }
    },
    // Freie Aktion dort, wo man gerade steht: kein Ortswechsel, die Figur (und wer zuschaut) dreht sich zu dir
    async frei(schritte, R, { wer = null, zeugen = [] } = {}) {
      szene = { sit: { id: 'frei' }, R, cast: new Map(), fremd: new Set(), mitte: null, versteckt: [] };
      ui.lock.acquire('respawn');
      wurzel.classList.add('rs-szene');
      try {
        const p = player.position;
        for (const id of [wer, ...zeugen].filter(Boolean)) {
          const f = npcs.get(id);
          if (!f || szene.cast.has(id)) continue;
          f.setOverride({ x: f.position.x, z: f.position.z, yaw: yawZu(f.position.x, f.position.z, p.x, p.z), anim: 'idle' });
          f.face({ x: p.x, y: 1.4, z: p.z });
          szene.cast.set(id, f);
        }
        await lauf(schritte || []);
      } finally { abbauen(); }
    },
    // Wer steht gerade in der Nähe? (Zeugen)
    inDerNaehe(radius = 12, ausser = null) {
      const p = player.position;
      return npcs.list().filter((f) => f.id !== ausser && f.position && !f.hidden && Math.hypot(f.position.x - p.x, f.position.z - p.z) < radius).map((f) => f.id);
    },
    // Ort und Uhrzeit zeigen, ein Satz
    async zeige(ortId, uhr, satz) {
      const site = game.content.resolveSite(ortId) || { x: 6, z: 118 };
      if (typeof uhr === 'number') game.time.setTimeOfDay(uhr);
      const a = Math.atan2(-site.x, -site.z);
      player.teleport(site.x - Math.sin(a) * 1.5, site.z - Math.cos(a) * 1.5, a);
      if (cameraRig.behindPlayer) cameraRig.behindPlayer();
      if (cameraRig.snap) cameraRig.snap();
      if (satz) await O.erzaehler(satz);
    },
    abbrechen() { abbauen(); },
  };
}
