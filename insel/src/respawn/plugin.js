// RESPAWN – Spielmodus „Ein Jahr auf der Insel, dann nochmal“ (12.11.2026). Läuft nur mit game.gameMode === 'respawn'
// (dist/respawn.html oder ?mode=respawn); die LUMO-Insel selbst bleibt unverändert.
// Offene Welt: Ein Jahr hat vier Jahreszeiten mit je drei Tagen. An jedem Tag läuft man frei herum und tut, was man will –
// mit Leuten (reden, helfen, aufziehen, filmen, leihen, schubsen …) und an Orten (jobben, in die Kasse greifen, sprühen,
// ein Boot nehmen …). Ereignisse des Tages stehen mit Marke in der Welt; man kann sie auch links liegen lassen.
// Größere Dinge kosten Kraft (3 am Tag). Nach dem Schlafen kommt der Morgen – und mit ihm, was aus gestern geworden ist.
// Kein Gefängnis, keine Strafe vom Spiel: Die Folgen kommen von den Menschen (daten/welt.js).
// Gespeichert nur auf dem Gerät: respawn.meta (Album, Runden, Einstellungen) und respawn.lauf (laufende Runde).
// Für Tests: Ereignisse respawn:start, respawn:karten, respawn:weiter, respawn:ende (auslösen); plugin.tue({...}) spielt
// eine freie Aktion; respawn:wahl, respawn:wirkung, respawn:stand, respawn:frei (hören).
import { createOberflaeche } from './oberflaeche.js';
import { createBuehne } from './buehne.js';
import { ladeFigur, MODELLE, ueberziehe } from './figur3d.js';
import { baueStadt } from './stadt.js';
import { createFahren } from './fahren.js';
import { createRoller } from './roller.js';
import { createWettlauf } from './lauf.js';
import { SITUATIONEN, AUSGAENGE, AKTE, AKTE_LEER, ORTE, ORT_AKTIONEN, LEUTE_AKTIONEN, LEUTE_REIHE, FOLGEN, VERPASST, WICHTIG, statistSagt, ideenFuerHeute } from './daten/index.js';
import { neuerLauf, zieheKarten, planeJahreszeit, jahreszeitWechsel, jahreszeit, ausgangFuer, akteFuer, wirke, bond, verteile, folgenAmMorgen, neuerTag,
  JAHRESZEIT_NAME, UHR_NACH_KRAFT, TAGE_JE_JAHRESZEIT } from './run.js';

const META = 'respawn.meta', LAUF = 'respawn.lauf';
const lies = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
const schreib = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* voll oder privat */ } };
const zufall = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const fn = (v, R) => (typeof v === 'function' ? v(R) : v);

export default {
  id: 'respawn', order: 92, deps: ['ui', 'npcs'],
  install(game) {
    if (game.gameMode !== 'respawn') return null;
    const { events, ui, npcs, player } = game;
    const test = game.params.has('test');
    const hud = document.getElementById('hud');
    document.getElementById('lumo-root').classList.add('mode-respawn');
    const O = createOberflaeche({ game });
    const B = createBuehne({ game, O });
    const meta = { v: 1, ausgaenge: {}, runden: 0, sanft: false, ...lies(META, {}) };
    if (game.params.has('sanft')) meta.sanft = game.params.get('sanft') !== '0';
    let R = null, laeuft = false, beschaeftigt = false, tagEnde = null;
    const sit = (id) => SITUATIONEN.find((s) => s.id === id);
    const ortVon = (ref) => game.content.resolveSite(ref) || { x: 6, z: 118 };
    const sichern = () => { schreib(LAUF, R && !R.fertig ? R : null); events.emit('respawn:stand', R); };

    // Aus LUMO, hier fehl am Platz: Glimm auf der Schulter, die Figuren der Leuchtturm-Geschichte, der Grauschleier
    const ohneGlimm = () => { try { player.humanoid.group.traverse((o) => { if (o.name === 'glimm') o.visible = false; }); if (game.glimm && game.glimm.mesh) game.glimm.mesh.visible = false; } catch (e) { /* egal */ } };
    ohneGlimm(); events.on('avatar:change', () => setTimeout(ohneGlimm, 50)); events.on('game:start', ohneGlimm);
    // Kamera näher und tiefer als in LUMO: man ist bei der Figur, nicht über dem Dorf
    try { const rig = game.cameraRig; rig.targetDist = 5.6; rig.dist = 5.6; rig.pitch = 0.17; rig.baseFov = 46; } catch (e) { /* egal */ }
    for (const id of ['grisel', 'jhemp']) { try { npcs.remove(id); } catch (e) { /* nicht da */ } }
    const bunt = () => { const veil = game.world && game.world.veil; if (veil && veil.setZone) for (const Z of game.world.island.ZONES) veil.setZone(Z.id, 0); };

    // ---------- Moderne Kleinstadt statt Bilderbuch-Dorf (Häuser, Läden, Autos, Lampen) ----------
    let stadt = null;
    baueStadt(game).then((s) => {
      stadt = s;
      // Wimpelketten und Signalfeuer gehören zum alten Dorf
      try { for (const h of game.world.decor.list()) if (/wimpel|signalfeuer/.test(h.id)) game.world.decor.remove(h.id); } catch (e) { /* Dekor ist Zugabe */ }
      // zwei Zonen nutzen denselben Namen „wimpel“ – die Liste kennt nur eine davon; den Rest direkt aus der Szene nehmen
      const weg = []; game.scene.traverse((o) => { if (/^props-bake-dekor-(wimpel|signalfeuer)/.test(o.name || '')) weg.push(o); });
      for (const o of weg) if (o.parent) o.parent.remove(o);
      // der eigene Tretroller (am Markt gekauft): fährt nur an freien Tagen, nicht in Szenen und nicht im Lieferwagen
      const rm = s.setze('skate/scooter', 0, 0, 0, { massstab: 2.0 });
      if (rm) roller = createRoller({ game, mesh: rm, darf: () => !!(R && tagEnde && R.flags.roller && !B.aktiv && !F.aktiv && (!beschaeftigt || W.aktiv) && !ui.overlay.count && !document.querySelector('.rs-voll')) });
    }).catch((e) => console.warn('[respawn] Stadt', e));

    let roller = null;
    const F = createFahren({ game });
    const W = createWettlauf({ game });

    // ---------- Neue Figuren (Skelett, echte Bewegungen): Überzug für die Spielfigur und alle anderen ----------
    const STIL = {
      ilda: { Head: 'Casual2', Body: 'Suit', Legs: 'Suit', Feet: 'Suit' }, fraenz: 'Worker', lucinda: { Head: 'Casual', Body: 'Farmer', Legs: 'Farmer', Feet: 'Farmer' },   // Frauen: Köpfe ohne Bart und Hut – Haar und Mütze kommen aus figur3d.js (baueFrisur)
      kontrolle: 'Suit', geselle: { Head: 'Casual2', Body: 'Worker', Legs: 'Worker', Feet: 'Worker' },
      jolie: { Head: 'Beach', Body: 'Casual2', Legs: 'Casual', Feet: 'Casual' }, tun: { Head: 'Casual2', Body: 'Casual', Legs: 'Casual2', Feet: 'Casual2' },
      pit: { Head: 'Casual', Body: 'Casual2', Legs: 'Casual2', Feet: 'Casual' }, mika: 'Punk', luc: { Head: 'Punk', Body: 'Casual', Legs: 'Punk', Feet: 'Punk' },
      yara: { Head: 'Beach', Body: 'Punk', Legs: 'Punk', Feet: 'Punk' }, noor: { Head: 'Casual', Body: 'Casual2', Legs: 'Casual2', Feet: 'Casual' },
      tiago: 'Beach', maelle: { Head: 'Beach', Body: 'Casual', Legs: 'Casual', Feet: 'Beach' },
    };
    const FRAUEN = ['jolie', 'yara', 'noor', 'maelle', 'ilda', 'lucinda'];   // schmalere Schultern (das Paket hat nur Männerkörper)
    const MISCH = ['Casual', 'Casual2', 'Beach', 'Farmer', 'Adventurer', 'Suit'];
    const hash = (s) => { let x = 7; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
    const stilFuer = (id) => STIL[id] || { Head: MISCH[hash(id) % MISCH.length], Body: MISCH[hash(id + 'b') % MISCH.length], Legs: MISCH[hash(id + 'l') % 4], Feet: MISCH[hash(id + 'f') % 4] };
    const SPIELER_STIL = ['Casual', 'Casual2', 'Punk', 'Beach', 'Adventurer'];
    const spielerStil = () => { const k = SPIELER_STIL[(meta.figur || 0) % SPIELER_STIL.length]; return { Head: k, Body: k === 'Punk' ? 'Casual2' : k, Legs: k === 'Beach' ? 'Beach' : 'Casual2', Feet: 'Casual' }; };
    const zieheAn = (f) => { try { if (f && f.humanoid) ueberziehe(game, f.humanoid, { stil: stilFuer(f.id), look: (f.def && f.def.look) || undefined, frau: FRAUEN.includes(f.id) }).catch((e) => console.warn('[respawn] Figur', e)); } catch (e) { console.warn('[respawn] Figur', e); } };
    ueberziehe(game, player.humanoid, { stil: spielerStil() }).catch((e) => console.warn('[respawn] Figur', e));
    for (const f of npcs.list()) zieheAn(f);
    events.on('npc:spawn', (e) => { const f = e && npcs.get(e.id); if (f) zieheAn(f); });

    // ---------- Jahreszeiten: Farbstimmung und Wetter (Laub, Schnee, Blüten, Glühwürmchen) ----------
    const WETTER = {
      herbst: { palette: 'herbst', sturm: 0, teile: { rate: 9, color: 0xe8792b, jitter: 0.5, size: 0.26, life: 5.5, gravity: -0.55, drag: 0.6, hoch: 7, wind: 1.3 } },
      winter: { palette: 'winter', sturm: 0.22, teile: { rate: 46, color: 0xffffff, jitter: 0.05, size: 0.13, life: 6.5, gravity: -0.28, drag: 0.9, hoch: 8, wind: 0.6 } },
      fruehling: { palette: 'fruehling', sturm: 0, teile: { rate: 6, color: 0xffb7d5, jitter: 0.25, size: 0.2, life: 6, gravity: -0.35, drag: 0.7, hoch: 6, wind: 0.9 } },
      sommer: { palette: 'sommer', sturm: 0, teile: null },
    };
    let wetterT = 0;
    function wetter() {
      const W = WETTER[R ? jahreszeit(R) : 'sommer'];
      const S = game.plugin('session');
      if (S && S.seasons && S.seasons.overrideId !== W.palette) S.seasons.override(W.palette);
      if (game.world.sky.setStorm && !B.aktiv) game.world.sky.setStorm(W.sturm);
      return W;
    }
    game.addUpdate((dt) => {
      if (!R || !game.particles || game.paused) return;
      const W = wetter(), p = player.position, nacht = game.world.sky.night || 0;
      const T = W.teile || (nacht > 0.5 ? { rate: 5, color: 0xfff29a, jitter: 0.1, size: 0.16, life: 4, gravity: 0.05, drag: 1.2, hoch: 1.6, wind: 0.2, additive: true } : null);
      if (!T) return;
      wetterT += dt * T.rate;
      while (wetterT >= 1) {
        wetterT -= 1;
        const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 13;
        game.particles.emit({ x: p.x + Math.cos(a) * r, y: p.y + T.hoch * (0.5 + Math.random() * 0.6), z: p.z + Math.sin(a) * r, count: 1, vx: T.wind * (0.6 + Math.random() * 0.8), vz: T.wind * 0.3 * (Math.random() - 0.3),
          color: T.color, colorJitter: T.jitter, size: T.size, life: T.life, gravity: T.gravity, drag: T.drag, grow: 0, alpha: 0.9, additive: !!T.additive });
      }
    }, { order: 60 });

    // ---------- Marken in der Welt (Ereignisse des Tages, Orte) ----------
    const marken = new Map();   // id → { el, x, z, y, greifen: Interaktion }
    function marke(id, { x, z, text, klein = '', ort = false, radius = 4, onAction, label }) {
      weg(id);
      const el = document.createElement('div');
      el.className = 'rs-marke' + (ort ? ' ist-ort' : '');
      el.innerHTML = text + (klein ? `<small>${klein}</small>` : '');
      hud.appendChild(el);
      const greifen = game.interactions.add({ id: 'rs-' + id, x, z, radius, label: label || text, priority: ort ? 0 : 5, onAction });
      if (!ort && ui.setMarker) ui.setMarker('rs-' + id, x, z, '❗', '#ff5a7a');
      marken.set(id, { el, x, z, greifen, ort });
    }
    function weg(id) { const m = marken.get(id); if (!m) return; m.el.remove(); m.greifen.remove(); if (!m.ort && ui.removeMarker) ui.removeMarker('rs-' + id); marken.delete(id); }
    const alleWeg = () => { for (const id of [...marken.keys()]) weg(id); };
    game.addUpdate(() => {
      const cam = game.camera;
      if (!cam || !marken.size) return;
      const frei = R && !B.aktiv && !ui.overlay.count && !document.querySelector('.rs-voll');
      for (const m of marken.values()) {
        const d = Math.hypot(m.x - player.position.x, m.z - player.position.z);
        if (!frei || (m.ort && d > 40)) { m.el.style.display = 'none'; continue; }
        const y = (game.world.island.heightAt ? game.world.island.heightAt(m.x, m.z) : player.position.y) + (m.ort ? 3.2 : 4.2);
        const p = player.position.clone().set(m.x, y, m.z).project(cam);
        if (p.z > 1 || Math.abs(p.x) > 1.05 || Math.abs(p.y) > 1.05) { m.el.style.display = 'none'; continue; }
        m.el.style.display = '';
        m.el.style.left = ((p.x * 0.5 + 0.5) * 100).toFixed(2) + '%';
        m.el.style.top = ((-p.y * 0.5 + 0.5) * 100).toFixed(2) + '%';
      }
    }, { order: 93, always: true });

    // ---------- Der Tag ----------
    const heute = () => ((R.tage || [])[R.tag] || []).filter((id) => !R.gespielt.includes(id));
    const uhr = () => game.time.setTimeOfDay(UHR_NACH_KRAFT[Math.max(0, Math.min(3, R.kraft))]);
    function kraftWeg(n) {
      if (!n) return;
      R.kraft = Math.max(0, R.kraft - n);
      uhr();
      if (R.kraft === 0) { O.melde('Es wird Abend. Zeit zum Schlafen.'); schlafKnopf(); }
    }
    let knopf = null;
    function schlafKnopf() {
      if (knopf || test) return;
      knopf = document.createElement('button');
      knopf.type = 'button'; knopf.className = 'rs-naechst hud-interactive'; knopf.textContent = 'Schlafen gehen ▸';
      knopf.addEventListener('click', () => frei(() => schlafen()));
      hud.appendChild(knopf);
    }
    const knopfWeg = () => { if (knopf) { knopf.remove(); knopf = null; } };

    // Alles Freie läuft nacheinander: eine Aktion zur Zeit
    async function frei(f) {
      if (beschaeftigt || !R || !tagEnde || B.aktiv || ui.overlay.count) return false;
      beschaeftigt = true;
      try { await f(); } catch (e) { console.error('[respawn]', e); } finally { beschaeftigt = false; }
      if (R) { O.status(R); marken_(); sichern(); if (stadt && stadt.zeigeSpuren) stadt.zeigeSpuren(R.flags); events.emit('respawn:frei', { kraft: R.kraft, tag: R.tag, jz: R.jz }); }
      return true;
    }
    async function schlafen() {
      knopfWeg();
      await O.erzaehler(R.kraft > 0 ? 'Du gehst früh schlafen.' : 'Der Tag ist vorbei.', { kurz: true });
      const ende = tagEnde; tagEnde = null;
      if (ende) ende();
    }
    async function ereignis(id) {
      const s = sit(id);
      if (!s || R.gespielt.includes(id)) return;
      weg('e-' + id);
      R.sanft = !!meta.sanft;
      await O.titelkarte(s.titel, JAHRESZEIT_NAME[jahreszeit(R)]);
      await B.spiele(s, R);
      R.gespielt.push(id);
      uhr();
      kraftWeg(1);
    }
    async function ortAktion(ort, aid) {
      const a = ORT_AKTIONEN[aid];
      if (!a || (a.wenn && !a.wenn(R))) return;
      if (a.schlaf) { await schlafen(); return; }
      if (a.kostet && R.geld < a.kostet) { await O.erzaehler('Dafür fehlt dir das Geld.', { kurz: true }); return; }
      if (a.kraft && R.kraft < a.kraft) { await O.erzaehler('Dafür bist du heute zu müde.', { kurz: true }); return; }
      const zeugen = a.mist ? B.inDerNaehe(12).filter((w) => WICHTIG.includes(w)) : [];
      R.log.push({ ort: ort.id, aktion: aid, zeugen });
      events.emit('respawn:wahl', { sit: 'ort:' + ort.id, wahl: a.t, art: a.art });
      await B.frei(a.szene(R, { zeugen }), R, { zeugen });
      // Aktionen mit Wettlauf: Szene → laufen oder rollern (frei in der Welt, die Uhr läuft) → wie es ausging
      if (a.lauf && R.flags['lauf.jetzt']) {
        delete R.flags['lauf.jetzt'];
        O.status(R);
        const erg = (await W.starte(a.lauf)) || { geschafft: false, zeit: 0, rest: 0 };
        if (roller && roller.aktiv) roller.ab();
        R.log.push({ lauf: erg });
        if (a.nach) await B.frei(a.nach(R, erg, { zeugen }), R, { zeugen });
      }
      // Aktionen mit echter Fahrt: Szene → fahren (frei in der Welt) → was daraus wurde
      if (a.fahrt && R.flags['fahrt.jetzt']) {
        delete R.flags['fahrt.jetzt'];
        let erg = { strecke: 0, vmax: 0, beulen: 0, erschreckt: [], weit: 0 };
        if (stadt && stadt.lieferwagen) { O.status(R); erg = (await F.starte(stadt.lieferwagen, { sekunden: 45 })) || erg; }
        R.log.push({ fahrt: erg });
        if (a.nach) await B.frei(a.nach(R, erg, { zeugen }), R, { zeugen });
      }
      kraftWeg(a.kraft || 0);
    }
    async function leuteAktion(wer, aid) {
      const a = LEUTE_AKTIONEN[aid];
      if (!a || (a.wenn && !a.wenn(R, wer))) return;
      if (a.kostet && R.geld < a.kostet) { await O.erzaehler('Dafür fehlt dir das Geld.', { kurz: true }); return; }
      if (a.kraft && R.kraft < a.kraft) { await O.erzaehler('Dafür bist du heute zu müde.', { kurz: true }); return; }
      const zeugen = a.mist ? B.inDerNaehe(12, wer).filter((w) => WICHTIG.includes(w)) : [];
      R.log.push({ wer, aktion: aid, zeugen });
      events.emit('respawn:wahl', { sit: 'leute:' + wer, wahl: a.t, art: a.art });
      await B.frei(a.szene(R, { wer, zeugen }), R, { wer, zeugen });
      kraftWeg(a.kraft || 0);
    }
    async function menue(frage, liste) {
      const r = await O.wahl({ frage, items: liste.map((x) => ({ label: x.t, art: x.art, sub: x.sub || '' })).concat([{ label: 'Nichts.', art: 'weg' }]), sekunden: 0, standard: liste.length });
      return r.index < liste.length ? liste[r.index] : null;
    }
    const ortMenue = (ort) => frei(async () => {
      const liste = ort.aktionen.map((id) => ({ id, ...ORT_AKTIONEN[id] })).filter((a) => !a.wenn || a.wenn(R)).map((a) => ({ ...a, sub: a.kraft ? '⚡ kostet Kraft' : '' }));
      const w = await menue(ort.name, liste);
      if (w) await ortAktion(ort, w.id);
    });
    // Menü an einer Person: höchstens sechs Kacheln. Das Gemeine liegt eine Ebene tiefer („Gemein sein …“).
    const GEMEIN = ['laestern', 'aufziehen', 'filmen', 'schubsen'];
    const leuteMenue = (wer) => frei(async () => {
      if (!WICHTIG.includes(wer)) { const n = npcs.get(wer); ui.say({ who: wer, text: statistSagt(R, wer), anchor: n ? n.group : null, wait: false, lock: false, seconds: 2.6 }); return; }
      const alle = LEUTE_REIHE.map((id) => ({ id, ...LEUTE_AKTIONEN[id] })).filter((a) => !a.wenn || a.wenn(R, wer)).map((a) => ({ ...a, sub: a.kraft ? '⚡ kostet Kraft' : a.kostet ? a.kostet + ' Euro' : '' }));
      const nett = alle.filter((a) => !GEMEIN.includes(a.id)).slice(0, 4), gemein = alle.filter((a) => GEMEIN.includes(a.id));
      let w = await menue(npcs.nameOf(wer), gemein.length ? nett.concat([{ id: '_gemein', t: 'Gemein sein …', art: 'hart' }]) : nett);
      if (w && w.id === '_gemein') w = await menue(npcs.nameOf(wer), gemein);
      if (w) await leuteAktion(wer, w.id);
    });
    events.on('npc:talk', (e) => { if (!e || e.handled) return; e.handled = true; if (R && tagEnde) leuteMenue(e.id); });

    // ---------- Tippen irgendwo ins Bild schaltet weiter (Sprechblase, Erzählzeile) ----------
    // Am Handy sucht niemand den kleinen Weiter-Knopf: Ein kurzer Tipp aufs Bild reicht. Gilt nur, solange eine Blase mit
    // Weiter-Knopf oder eine Erzählzeile offen ist – nicht auf Knöpfen, in der Auswahl oder in Fenstern.
    {
      let unten = null;
      const offen = () => { const b = ui.bubbles.current; return (b && b.el && b.el.querySelector('[data-next]')) ? b.el : document.querySelector('.rs-zeile.is-da'); };
      const frei_ = (t) => !(t && t.closest && t.closest('button, a, input, .choices, .ov, .overlay, .menu, .rs-voll, .rs-geschick, .rs-zeile, .bubble-tools'));
      window.addEventListener('pointerdown', (e) => { const el = offen(); unten = el && frei_(e.target) ? { el, x: e.clientX, y: e.clientY, t: performance.now() } : null; }, true);
      window.addEventListener('pointerup', (e) => {
        const u = unten; unten = null;
        if (!u || u.el !== offen() || Math.hypot(e.clientX - u.x, e.clientY - u.y) > 14 || performance.now() - u.t > 700) return;
        if (u.el.classList.contains('rs-zeile')) events.emit('respawn:weiter'); else events.emit('input:action:down');
      }, true);
    }

    function marken_() {
      if (!R || !tagEnde) { alleWeg(); return; }
      const soll = new Set();
      for (const id of heute()) {
        const s = sit(id), o = ortVon(fn(s.ort, R));
        soll.add('e-' + id);
        if (!marken.has('e-' + id)) marke('e-' + id, { x: o.x, z: o.z, text: '❗ ' + s.titel, radius: 5, label: s.titel, onAction: () => frei(() => ereignis(id)) });
      }
      for (const ort of ORTE) {
        const o = ortVon(ort.ort);
        // Orte, an denen es gerade nichts zu tun gibt, zeigen keine Marke
        if (!ort.aktionen.some((id) => { const a = ORT_AKTIONEN[id]; return a && (!a.wenn || a.wenn(R)); })) continue;
        soll.add('o-' + ort.id);
        if (!marken.has('o-' + ort.id)) marke('o-' + ort.id, { x: o.x, z: o.z, text: ort.bild + ' ' + ort.name, ort: true, radius: 5, label: ort.name, onAction: () => ortMenue(ort) });
      }
      for (const id of [...marken.keys()]) if (!soll.has(id)) weg(id);
    }
    const weltFuerHandy = () => ({
      ereignisse: heute().map((id) => { const s = sit(id); const o = ORTE.find((x) => x.ort === fn(s.ort, R)); return { id, titel: s.titel, wo: o ? o.name : 'auf der Insel' }; }),
      ideen: ideenFuerHeute(R).map((i) => { const o = ORTE.find((x) => x.id === i.ort); return { ort: i.ort, text: i.text, bild: o.bild, wo: o.name }; }),
      orte: ORTE.map((o) => ({ id: o.id, name: o.name, bild: o.bild })),
      hin(ref) {
        const [art, id] = ref.split(':');
        const o = art === 'e' ? ortVon(fn(sit(id).ort, R)) : ortVon((ORTE.find((x) => x.id === id) || {}).ort);
        const a = Math.atan2(-o.x, -o.z);
        player.teleport(o.x - Math.sin(a) * 3.2, o.z - Math.cos(a) * 3.2, a);
        if (game.cameraRig.behindPlayer) game.cameraRig.behindPlayer();
        if (game.cameraRig.snap) game.cameraRig.snap();
      },
    });

    // Einstieg für die allererste Runde (nach der Ankunft): was man an einem freien Tag tun kann
    const EINSTIEG = ['Der Tag gehört dir. Geh, wohin du willst.', 'Orte haben ein Schild. Leute kannst du ansprechen.', 'Das Handy oben bringt dich schnell überall hin.', 'Zuhause schlafen beendet den Tag.'];
    async function einTag() {
      // Morgen: was aus gestern geworden ist
      O.wirkung(neuerTag(R), R);
      uhr();
      const zuhause = ortVon('bootshaus');
      if (stadt && stadt.zeigeSpuren) stadt.zeigeSpuren(R.flags);
      if (stadt && stadt.parke) { stadt.parke(); if (stadt.lieferwagen) { stadt.lieferwagen.visible = !R.flags['auto.wasser']; stadt.lieferwagen.rotation.z = 0; } }   // der Lieferwagen steht morgens wieder am Kiosk – außer er liegt im Wasser
      player.teleport(zuhause.x + 1.5, zuhause.z - 2.5, Math.atan2(-zuhause.x, -zuhause.z));
      if (game.cameraRig.behindPlayer) game.cameraRig.behindPlayer();
      if (game.cameraRig.snap) game.cameraRig.snap();
      const folgen = folgenAmMorgen(R, FOLGEN);
      if (folgen.length) {
        await O.titelkarte('Am Morgen', JAHRESZEIT_NAME[jahreszeit(R)] + ' · Tag ' + (R.tag + 1));
        for (const f of folgen) { for (const z of f.text) await O.erzaehler(z); O.wirkung(f.aend, R); }
      }
      O.status(R);
      sichern();
      // Erster Tag des Jahres: die Ankunft passiert von selbst
      await new Promise((resolve) => {
        tagEnde = resolve;
        marken_();
        const auto = heute().find((id) => sit(id).platz === 'anfang' && id === 'ankunft');
        if (auto) frei(async () => {
          await ereignis(auto);
          // Allererste Runde: vier kurze Sätze, wie ein freier Tag geht – einmal, dann nie wieder
          if (!meta.runden && !meta.einstieg) {
            meta.einstieg = true; schreib(META, meta);
            for (const z of EINSTIEG) await O.erzaehler(z);
          }
        });
        events.emit('respawn:frei', { kraft: R.kraft, tag: R.tag, jz: R.jz });
      });
      knopfWeg(); alleWeg();
      // Was man heute liegen gelassen hat, läuft ohne einen weiter
      for (const id of heute()) {
        R.gespielt.push(id);
        const v = VERPASST[id];
        if (v) { await O.erzaehler(v.text); O.wirkung(wirke(R, v.e), R); }
      }
    }

    async function jahr() {
      if (laeuft) return;
      laeuft = true;
      O.status(R);
      O.setzeHandy(() => { if (R && !B.aktiv) O.handy(R, meta, tagEnde ? weltFuerHandy : null); });
      while (R.jz < 4) {
        if (!R.plan.length) {
          const rng = zufall(R.seed * 7919 + R.jz * 104729 + 13);
          if (R.jz > 0) O.wirkung(jahreszeitWechsel(R), R);
          R.plan = planeJahreszeit(R, SITUATIONEN, rng);
          R.tage = verteile(R.plan.filter((id) => id !== 'finale'), SITUATIONEN);
          R.tag = 0;
          sichern();
          await O.titelkarte(JAHRESZEIT_NAME[jahreszeit(R)], 'Kapitel ' + (R.jz + 1) + ' von 4');
        }
        while (R.tag < TAGE_JE_JAHRESZEIT) { await einTag(); R.tag += 1; sichern(); }
        R.jz += 1; R.plan = []; R.tage = []; R.tag = 0;
        sichern();
      }
      // Finale am Steg, dann Ausgang und Akte
      R.jz = 3; R.sanft = !!meta.sanft;
      const f = sit('finale');
      await O.titelkarte(f.titel, 'Ein Jahr später');
      await B.spiele(f, R);
      R.gespielt.push('finale');
      await ende();
      laeuft = false;
    }

    async function ende() {
      const a = ausgangFuer(R, AUSGAENGE);
      R.fertig = true; R.ausgang = a.id;
      const neu = !meta.ausgaenge[a.id];
      meta.ausgaenge[a.id] = (meta.ausgaenge[a.id] || 0) + 1;
      meta.runden += 1;
      schreib(META, meta); schreib(LAUF, null);
      const andere = R.gespielt.map(sit).filter((s) => s && s.andere && (R.log || []).some((l) => l.sit === s.id)).map((s) => {
        const wer = fn(s.andere.wer, R);
        return { name: npcs.get(wer) ? npcs.nameOf(wer) : ({ kontrolle: 'Der Kontrolleur', geselle: 'Marc' }[wer] || wer), titel: s.titel, zeilen: s.andere.zeilen };
      });
      events.emit('respawn:ausgang', { id: a.id, neu, akte: R.akte.slice(), R });
      O.status(null);
      await O.abschluss({ ausgang: a, akte: akteFuer(R, AKTE), leer: AKTE_LEER, andere, meta, neu });
      R = null;
      hauptmenue();
    }

    async function neueRunde(vorgabe) {
      const seed = (Date.now() ^ (meta.runden * 2654435761)) >>> 0;
      const rng = zufall(seed);
      const karten = vorgabe || await O.kartenZiehen({ ziehe: () => zieheKarten(rng) });
      R = neuerLauf({ seed: seed % 100000, karten });
      sichern();
      await jahr();
    }

    async function hauptmenue() {
      bunt();
      const gespeichert = lies(LAUF, null);
      const was = await O.start({ meta, laufend: !!(gespeichert && !gespeichert.fertig) });
      if (was === 'aussehen') {
        if (ui.stil && ui.stil.open) { ui.stil.open({ first: !game.avatar.isSet }); const ab = events.on('ui:overlay', (e) => { if (e && !e.open) { ab(); setTimeout(hauptmenue, 200); } }); }
        else hauptmenue();
        return;
      }
      if (was === 'weiter' && gespeichert) { R = gespeichert; await jahr(); return; }
      await neueRunde(typeof was === 'object' ? was : null);
    }

    const los = () => setTimeout(hauptmenue, test ? 0 : 600);
    if (game.started) los(); else events.on('game:start', los);

    return {
      get lauf() { return R; }, get meta() { return meta; }, get frei() { return !!(R && tagEnde && !beschaeftigt && !B.aktiv); },
      get heute() { return R ? heute() : []; },
      situationen: SITUATIONEN, ausgaenge: AUSGAENGE, orte: ORTE,
      // Probe: eine Figur mit Skelett neben die Spielfigur stellen (Grafik-Vergleich alt/neu)
      async probeFigur(id, bewegung = 'Idle', { farben = {}, stil = null, seite = 1.3, vor = 0 } = {}, daten = null) {
        if (daten) MODELLE[id] = daten;
        if (!MODELLE[id]) return [];
        const f = await ladeFigur(game, id, { farben, stil });
        const p = player.position, a = player.yaw || 0;
        f.group.position.set(p.x + Math.cos(a) * seite + Math.sin(a) * vor, p.y, p.z - Math.sin(a) * seite + Math.cos(a) * vor);
        f.group.rotation.y = a;
        game.scene.add(f.group);
        f.spiele(bewegung);
        game.addUpdate((dt) => f.update(dt), { order: 31, always: true });
        return { namen: f.namen, stile: f.stile };
      },
      neueRunde, hauptmenue,
      get roller() { return roller; },
      // Tests: eine freie Aktion ausführen (wie ein Klick in der Welt)
      tue(o) {
        if (o.ereignis) return frei(() => ereignis(o.ereignis));
        if (o.schlafen) return frei(() => schlafen());
        if (o.ort) return frei(() => ortAktion(ORTE.find((x) => x.id === o.ort), o.aktion));
        if (o.wer) return frei(() => leuteAktion(o.wer, o.aktion));
        return Promise.resolve(false);
      },
    };
  },
};
