// Lycée-Simulator – Kern: baut Bild (Renderer mit Kontur/Bloom, gemalter Himmel, Toon-Material), Welt, Möbel, Menschen und
// lässt die Geschichte laufen (geschichte.js). Gespeichert wird nur im Browser („lycee.stand“), nichts geht ins Netz.
// Für Tests: window.LYCEE (zustand, schritt(i), teleport(ort), rede(id), gespraechLaeuft).
import * as THREE from 'three';
import { createEvents } from '../engine/events.js';
import { createLoop } from '../engine/loop.js';
import { createInput } from '../engine/input.js';
import { createAudio } from '../engine/audio.js';
import { createSpeech } from '../engine/speech.js';
import { createRenderer, detectQuality } from '../engine/renderer.js';
import { createVeil } from '../world/veil.js';
import { createSky } from '../world/sky.js';
import { lambertVC } from '../world/landmarks.js';
import { baueWelt } from './welt.js';
import { baueRequisiten } from './requisiten.js';
import { ladePerson, namensschild, SITZ } from './figuren.js';
import { createSteuerung } from './steuerung.js';
import { createUI } from './ui.js';
import { SCHRITTE, GESPRAECHE, LEUTE, STAERKEN, BINGO, GEHEIMNISSE, SPRECHER, KAPITEL } from './geschichte.js';
import { ORTE2, CHAT, ichBotschaftThema } from './kapitel2.js';
import { ORTE3, saegeFolgen } from './kapitel3.js';

const SPEICHER = 'lycee.stand';
const lies = () => { try { return JSON.parse(localStorage.getItem(SPEICHER) || 'null'); } catch (e) { return null; } };
const schreib = (v) => { try { if (v) localStorage.setItem(SPEICHER, JSON.stringify(v)); else localStorage.removeItem(SPEICHER); } catch (e) { /* privat/voll */ } };
const kapName = (k) => 'Kapitel ' + k + ' · ' + KAPITEL[k];
const FREI = { titel: 'Freies Herumlaufen', ziel: 'Schau dich im Lycée um. Das nächste Kapitel kommt bald.' };

// Spielfiguren zur Wahl
const FIGUREN = [
  { titel: 'Figur 1', modell: 'menschen', stil: 'Casual', haut: '#e0b48c', haar: '#3a2a1c', oben: '#2f4f45', unten: '#3a3f4b', schuhe: '#f2f2f2' },
  { titel: 'Figur 2', modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff' },
  { titel: 'Figur 3', modell: 'menschen', stil: 'Casual2', haut: '#8d5a3b', haar: '#1b1410', oben: '#e9c46a', unten: '#2d3748', schuhe: '#2b2b2b' },
  { titel: 'Figur 4', modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#8a5a3a', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#6b4e3a' },
];

// Kleine Sätze, wenn man jemanden außerhalb der Geschichte anspricht
const PLAUDERN = {
  noah: ['Alles okay bei dir?', 'Ich find mich hier noch nicht zurecht.', 'Hast du schon das CDI gesehen?'],
  weber: ['Brauchst du noch etwas?', 'Das Sekretariat ist bis 16 Uhr offen.'],
  hoffmann: ['Alles klar bei dir?', 'Wenn du Fragen hast: einfach kommen.'],
  kenan: ['Was geht?', 'Hoffmann ist okay. Wirklich.'], dario: ['Na, neu hier?', 'Kantine heute: Nudeln. Sagt man.'],
  mila: ['Hi.', '(Sie nickt dir zu.)'], lina: ['(lächelt) Hi.'], jo: ['Yo.', 'Plakate sind nicht so meins.'],
  ayla: ['Hey!', 'Kennst du gute Musik? Sag Bescheid.'], ben: ['Korbball in der Pause?', 'Mein Hund heißt Keks.'],
  chiara: ['Hi!', 'Die Kantine ist echt okay hier.'], yusuf: ['Hey.', 'Judo ist dienstags und freitags.'],
  kremer: ['Essen gibt es ab 12 Uhr.'], luca: ['Hm?'], fahrer: ['Abfahrt ist pünktlich. Immer.'],
};

export async function startLycee({ canvas, root, onProgress = () => {} }) {
  const params = new URLSearchParams(location.search);
  const test = params.has('test');
  const schritt = async (p, t) => { onProgress(p, t); await new Promise((r) => requestAnimationFrame(() => r())); };
  const events = createEvents();
  const rr = createRenderer({ canvas, quality: detectQuality(), events });
  const q = rr.quality;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.12, 700);
  rr.onResize((s) => { camera.aspect = s.aspect || (s.w / s.h); camera.fov = s.portrait ? 64 : 52; camera.updateProjectionMatrix(); });
  const input = createInput({ root, events });
  const audio = createAudio();
  const speech = createSpeech({ events, audio });

  await schritt(0.1, 'Das Lycée wird gebaut …');
  const veil = createVeil({ events, audio, zones: [] });
  veil.setBaseOverride(0); veil.uniforms.uVeilStrength.value = 0;
  const material = lambertVC(veil, 'lycee', { ramp: 'props' });
  const materialInnen = lambertVC(veil, 'lycee-innen', { ramp: 'props' });
  const welt = baueWelt({ material, materialInnen });
  Object.assign(welt.orte, ORTE2, ORTE3);
  scene.add(welt.gruppe);
  const sky = createSky({ scene, renderer: rr.renderer, audio, quality: q, events });
  sky.time.paused = true;
  scene.fog.near = 90; scene.fog.far = 420;
  // Innenräume: weiches Raumlicht, sobald man drin ist (das Dach wirft sonst alles in Schatten)
  const raumLicht = new THREE.HemisphereLight(0xfff6e6, 0xe8dcc6, 0); scene.add(raumLicht);

  await schritt(0.35, 'Tische und Stühle …');
  const req = await baueRequisiten({ welt, material, scene });
  const bus = req.eigene.bus;

  await schritt(0.6, 'Die Klasse kommt …');
  const ui = createUI({ root, input, speech });
  const steuerung = createSteuerung({ camera, input, welt });
  rr.attachPost({ scene, camera, veil });

  // ---------- Zustand ----------
  let S = lies();
  const neuerStand = (name, figur) => ({ v: 1, name, figur, schritt: 0, herz: {}, staerken: {}, merke: {}, entdeckt: [], stundenplan: false, bingo: {}, gefragt: [], fertig: false });
  const sichern = () => schreib(S);

  // ---------- Menschen ----------
  const leute = {};   // id → { def, f, pos, yaw, haltung, schild, ziel }
  async function person(id) {
    if (leute[id]) return leute[id];
    const def = LEUTE[id];
    const f = await ladePerson(veil, def);
    const schild = namensschild(def.name, def.farbe); f.group.add(schild);
    scene.add(f.group);
    const p = { id, def, f, pos: new THREE.Vector3(), yaw: 0, haltung: '', schild, dreh: 0 };
    f.spiele('Idle');
    leute[id] = p;
    return p;
  }
  async function stelleLeute(plan) {
    const ids = Object.keys(plan);
    await Promise.all(ids.map(person));
    for (const [id, p] of Object.entries(leute)) {
      const w = plan[id];
      p.f.group.visible = !!w;
      if (!w) continue;
      let [x, z, yaw, haltung] = w;
      // „sitzt“: auf dem Stuhl, Blick zum Tisch (Stuhl steht 0,62 m hinter der Tischmitte – Figur etwas nach hinten)
      if (haltung === 'sitzt') { x -= Math.sin(yaw) * 0.1; z -= Math.cos(yaw) * 0.1; }
      p.f.sitzen(haltung === 'sitzt');
      p.pos.set(x, 0, z); p.yaw = yaw; p.basisYaw = yaw; p.haltung = haltung || '';
      p.f.group.position.copy(p.pos); p.f.group.rotation.y = yaw;
      p.f.spiele(haltung === 'redet' ? 'Interact' : 'Idle', { tempo: haltung === 'redet' ? 0.35 : 1 });
    }
    feste = Object.values(leute).filter((p) => p.f.group.visible).map((p) => ({ x: p.pos.x, z: p.pos.z, r: 0.3 }));
    steuerung.hindernisse = feste.concat(statisten.map((x) => x.h));
  }

  // ---------- Statisten: andere Schülerinnen und Schüler, die über Hof und Gang laufen (nur Kulisse) ----------
  let feste = [];
  const statisten = [];
  const STATISTEN = [
    { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#5a3a24', oben: '#7b8794', unten: '#2d3748', schuhe: '#ffffff', weg: [[-36, 22], [-10, 28], [16, 24], [8, 12], [-24, 8]], tempo: 1.25 },
    { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#f2f2f2', weg: [[12, 34], [40, 32], [42, 6], [14, 10]], tempo: 1.15 },
    { modell: 'frauen', stil: 'Punk', haut: '#f0c9a8', haar: '#8a5a3a', oben: '#4f88c8', unten: '#2b2b33', schuhe: '#2b2b2b', weg: [[-40, 30], [-40, 4], [-30, 16]], tempo: 1.05 },
    { modell: 'menschen', stil: 'Beach', haut: '#9b6a45', haar: '#1b1410', oben: '#e85d75', unten: '#4a4f5c', schuhe: '#f2f2f2', weg: [[-27, -15.0], [27, -15.0]], tempo: 1.2 },
    { modell: 'frauen', stil: 'Adventurer', haut: '#e0b48c', haar: '#2b1d14', oben: '#3fa66b', unten: '#2d3748', schuhe: '#6b4e3a', weg: [[25, -15.3], [-25, -15.3]], tempo: 1.1 },
    { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#d9b36a', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#2b2b2b', weg: [[-4.5, 38], [-4.5, 3], [-1, 3], [-1, 38]], tempo: 1.3 },
  ];
  async function statistenLaden() {
    for (const d of STATISTEN) {
      const f = await ladePerson(veil, d);
      scene.add(f.group); f.spiele('Walk', { tempo: d.tempo / 1.4 });
      const p = new THREE.Vector3(d.weg[0][0], 0, d.weg[0][1]);
      statisten.push({ d, f, p, i: 1, warte: Math.random() * 3, h: { x: p.x, z: p.z, r: 0.3 } });
    }
  }
  function statistenBewegen(dt) {
    for (const x of statisten) {
      x.f.update(dt);
      if (x.warte > 0) { x.warte -= dt; if (x.warte <= 0) x.f.spiele('Walk', { tempo: x.d.tempo / 1.4 }); continue; }
      const [zx, zz] = x.d.weg[x.i];
      const dx = zx - x.p.x, dz = zz - x.p.z, d = Math.hypot(dx, dz);
      if (d < 0.3) { x.i = (x.i + 1) % x.d.weg.length; if (Math.random() < 0.35) { x.warte = 2 + Math.random() * 4; x.f.spiele('Idle'); } continue; }
      // dem Spieler ausweichen: kurz stehen bleiben, wenn er direkt davor steht
      const sp = steuerung.pos; if (Math.hypot(sp.x - x.p.x, sp.z - x.p.z) < 0.9) continue;
      x.p.x += dx / d * x.d.tempo * dt; x.p.z += dz / d * x.d.tempo * dt;
      const yaw = Math.atan2(dx, dz); let dy = yaw - x.f.group.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      x.f.group.rotation.y += dy * Math.min(1, dt * 6);
      x.f.group.position.copy(x.p); x.h.x = x.p.x; x.h.z = x.p.z;
    }
  }

  // ---------- Spielfigur ----------
  let spieler = null;
  async function spielerFigur(i) {
    if (spieler) { scene.remove(spieler.group); }
    spieler = await ladePerson(veil, FIGUREN[i] || FIGUREN[0]);
    scene.add(spieler.group); steuerung.figur = spieler;
    spieler.spiele('Idle');
  }

  // ---------- Markierungen ----------
  const markerMat = new THREE.MeshBasicMaterial({ color: '#ffcf4a', toneMapped: false, transparent: true, opacity: 0.95 });
  const ringMat = new THREE.MeshBasicMaterial({ color: '#ffcf4a', toneMapped: false, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
  const marker = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const spitze = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 4), markerMat); spitze.rotation.x = Math.PI; g.add(spitze);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.7, 32), ringMat); ring.rotation.x = -Math.PI / 2; ring.name = 'ring'; g.add(ring);
    g.visible = false; scene.add(g); marker.push(g);
  }
  function zielPunkte() {
    const st = SCHRITTE[S.schritt]; if (!st || S.fertig) return [];
    let m = st.marker; if (!m) return [];
    if (m === 'bingo') m = Object.keys(GESPRAECHE).filter((k) => k.startsWith('bingo_')).map((k) => k.slice(6)).filter((id) => id !== 'noah' && !S.gefragt.includes(id));
    if (!Array.isArray(m)) m = [m];
    const out = [];
    for (const id of m) {
      if (leute[id] && leute[id].f.group.visible) out.push({ x: leute[id].pos.x, z: leute[id].pos.z, y: 2.45, person: true });
      else if (welt.orte[id]) out.push({ x: welt.orte[id].x, z: welt.orte[id].z, y: 1.6, person: false });
    }
    return out;
  }

  // ---------- Gespräche ----------
  let imGespraech = false, sperreBis = 0, danach = null;   // nach einem Gespräch kurz kein neues (Echtzeit, auch auf langsamen Geräten)
  const gesperrt = () => performance.now() < sperreBis;
  const ersetze = (t) => String(t).replace(/\{name\}/g, S ? S.name : 'Sam');
  function sprecher(wer) {
    if (SPRECHER[wer]) return { wer: wer === 'du' ? S.name : '', farbe: SPRECHER[wer].farbe };
    const d = LEUTE[wer]; return { wer: d ? d.name : wer, farbe: d ? d.farbe : '#2b3a55' };
  }
  function herz(id, n) {
    if (!LEUTE[id] || !n) { if (LEUTE[id] && S.herz[id] == null) S.herz[id] = 1; return; }
    S.herz[id] = Math.max(0, Math.min(5, (S.herz[id] == null ? 1 : S.herz[id]) + n));
    ui.herz(LEUTE[id].name, n);
  }
  function staerke(k) {
    if (!STAERKEN[k]) return;
    S.staerken[k] = (S.staerken[k] || 0) + 1;
    if (S.staerken[k] === 1) { ui.staerke(STAERKEN[k]); try { audio.play('chime'); } catch (e) { /* egal */ } }
  }
  // Blick: die beteiligte Person dreht sich zum Spieler
  let gegenueber = null;
  async function spiele(zeilen) {
    for (const z of zeilen) {
      if (Array.isArray(z)) {
        const [wer, text] = z;
        if (LEUTE[wer] && S.herz[wer] == null) S.herz[wer] = 1;
        if (leute[wer] && leute[wer].f.group.visible && wer !== 'du') { gegenueber = leute[wer]; steuerung.fokus = gegenueber.pos; }
        await ui.sprich({ ...sprecher(wer), text: ersetze(text) });
      } else if (z.wahl) {
        const i = await ui.waehle(z.wahl.map((w) => ersetze(w.t)));
        const w = z.wahl[i];
        if (w.staerke) staerke(w.staerke);
        if (w.herz) for (const [id, n] of Object.entries(w.herz)) herz(id, n);
        if (w.merke) S.merke[w.merke] = true;
        sichern();
        if (w.dann && w.dann.length) await spiele(w.dann);
      } else if (z.tu) {
        const mehr = await TUN[z.tu]?.();
        if (Array.isArray(mehr) && mehr.length) await spiele(mehr);
      }
    }
  }
  async function gespraech(zeilen) {
    if (imGespraech) return;
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null);
    try { await spiele(zeilen); } finally {
      ui.dialogZu(); imGespraech = false; input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null; gegenueber = null; sperreBis = performance.now() + 350; sichern();
      if (danach) { const d = danach; danach = null; await d(); }
    }
  }

  // ---------- Besondere Momente ----------
  const TUN = {
    stundenplanTipp: () => { ui.toast('<b>Tipp</b><span>Mit Tab oder ☰ öffnest du dein Journal.</span>'); },
    weberTelefon: () => { const w = leute.weber; if (w) w.f.spiele('Interact', { tempo: 0.5 }); },
    stundenplan: () => { S.stundenplan = true; ui.toast('📄 Stundenplan bekommen – steht im Journal.'); },
    zuSpaet: () => (S.merke.gewartet ? [['hoffmann', 'Gerade noch rechtzeitig. Kein Stress, setz dich.']] : []),
    bingoStart: () => { zeigeBingo(); },
    freiwurf: async () => {
      input.setEnabled(false);
      const t = await ui.freiwurf();
      S.merke.freiwurf = t; ui.toast('Freiwürfe: ' + t + ' von 5 getroffen');
      return t >= 3 ? [['yusuf', t + ' von 5! Respekt.']] : [['ben', t + ' von 5. Passt. Übung macht’s.']];
    },
    tablett: () => { ui.toast('🍽 Mit Tablett. Such dir einen Platz.'); },
    gegessen: async () => {   // Spielfigur setzt sich mit an den Tisch (gegenüber)
      const sitz = S.merke.tisch === 'mila' ? [19.55, -4.9, Math.PI / 2] : [12.25, -10.1, -Math.PI / 2];
      steuerung.setzen(sitz[0] - Math.sin(sitz[2]) * 0.1, sitz[1] - Math.cos(sitz[2]) * 0.1, sitz[2]);
      await new Promise((r) => setTimeout(r, 1400));
      await ui.bild('Mittagspause', S.merke.tisch === 'mila' ? 'Ihr esst. Mila erzählt von ihrem Puzzle-Spiel. Es ist ruhig und gut.' : 'Ihr esst und lacht. Ayla erzählt von ihrer Band.', 3);
    },
    plakat: async () => {
      const m = S.merke;
      const text = m.linaGefragt ? 'Ihr malt die Orte, an denen man sich wohlfühlt. Lina schreibt die Namen.' : m.aufgeteilt ? 'Jo malt das Gebäude, Lina schreibt, du machst die Bilder vom Hof.' : 'Jo malt das Gebäude. Ihr malt aus.';
      await ui.bild('20 Minuten später …', text, 3);
    },
    plakatEnde: () => {
      const m = S.merke;
      if (m.linaGefragt) return [['hoffmann', 'Orte zum Wohlfühlen – tolle Idee. Wessen Idee war das?'], ['lina', '(leise) Meine.'], ['jo', 'Ja, von Lina. War gut.']];
      if (m.aufgeteilt) return [['hoffmann', 'Gut aufgeteilt. Man sieht, dass alle drei mitgemacht haben.'], ['lina', 'Die Schrift ist von mir.']];
      return [['hoffmann', 'Schönes Gebäude! Und was habt ihr zwei gemacht?'], ['lina', '…ausgemalt.'], ['erzaehler', 'Lina schaut auf den Tisch.']];
    },
    milaAbschied: () => ((S.herz.mila || 0) >= 2 ? GESPRAECHE.milaAbschied_ja : []),
    kapitelEnde: async () => {
      busFaehrt = -1;
      await new Promise((r) => setTimeout(r, 1200));
      const kap = SCHRITTE[S.schritt].kap, weiterIdx = SCHRITTE.findIndex((x) => x.kap === kap + 1), startIdx = SCHRITTE.findIndex((x) => x.kap === kap);
      S.kapitelFertig = Math.max(S.kapitelFertig || 0, kap);
      if (weiterIdx < 0) S.fertig = true;
      sichern();
      const wahl = await ui.ende({ ...bilanz(), kap, ueberschrift: ({ 1: 'Dein erster Tag', 2: 'Deine erste Woche', 3: 'Dein Schnuppertag' })[kap] || KAPITEL[kap],
        weiter: weiterIdx >= 0 ? 'Weiter: Kapitel ' + (kap + 1) + ' „' + KAPITEL[kap + 1] + '“' : '' });
      if (wahl === 'weiter') danach = () => starteSchritt(weiterIdx, true);
      else if (wahl === 'neu') { S.fertig = false; danach = () => starteSchritt(startIdx, true); }
      else ui.auftrag({ kapitel: kapName(kap), ...FREI });
    },
    korbRunde: async () => {
      input.setEnabled(false);
      const t = await ui.freiwurf();
      S.merke.korb = t; ui.toast('Dein Team: ' + t + ' von 5 getroffen');
      if (t >= 3) return [['sommer', 'Super Teamarbeit!'], ['jo', 'Gewonnen! Gut geworfen, {name}.']];
      const wen = S.merke.linaTeam ? 'lina' : 'du';
      return [
        ['jo', wen === 'lina' ? 'Verloren. Wegen dir, Lina.' : 'Verloren. Wegen dir, {name}!'],
        { wahl: wen === 'lina' ? [
          { t: '„Wir haben alle zusammen verloren.“', staerke: 'fair', herz: { lina: 2 }, dann: [['jo', '… Ja. Okay. Stimmt.']] },
          { t: '„Nächstes Mal klappt es, Lina.“', herz: { lina: 1 }, dann: [['lina', '(lächelt) Danke.']] },
          { t: '(Nichts sagen.)', dann: [['erzaehler', 'Lina geht schnell in die Umkleide.']] },
        ] : [
          { t: '„Ich hab mein Bestes gegeben.“', staerke: 'ruhig', herz: { jo: 1 }, dann: [['jo', '… Ja. Ich hab ja auch danebengeworfen.']] },
          { t: '„Halt die Klappe, Jo.“', herz: { jo: -1 }, dann: [['sommer', 'Hey. Ruhig, ihr zwei.'], ['erzaehler', 'Ihr schaut euch nicht mehr an.']] },
          { t: '(Tief durchatmen. Weggehen.)', staerke: 'ruhig', dann: [['erzaehler', 'Du gehst trinken. Danach ist es leichter.']] },
        ] },
      ];
    },
    lernkarte: () => { S.lernkarten = (S.lernkarten || []).concat(['½ + ¼ = ¾ (Pizza: zwei Viertel + ein Viertel)']); ui.toast('<b>Gelernt</b><span>½ + ¼ = ¾ – steht im Journal.</span>', 'ly-t-ent'); },
    chat: async () => { await ui.handy(CHAT); },
    milaGelacht: () => (S.merke.chatGelacht ? [
      ['mila', 'Du hast auch gelacht. Ich hab’s gesehen.'],
      { wahl: [
        { t: 'Ja. Das war blöd von mir. Tut mir leid.', staerke: 'ehrlich', herz: { mila: 2 }, dann: [['mila', '… Okay. Danke, dass du es sagst.']] },
        { t: 'War doch nur Spaß.', herz: { mila: -1 }, dann: [['mila', 'Für mich nicht.']] },
      ] }] : S.merke.chatMut ? [['mila', 'Du hast geschrieben, dass Jo es löschen soll. Danke.']] : []),
    setzen: () => { steuerung.setzen(-22.18, -24.42, -Math.PI / 2); },
    atem: async () => { input.setEnabled(false); await ui.atem(); staerke('atmen'); },
    testPizza: () => (S.merke.matheGefragt || S.merke.matheRichtig ? [['erzaehler', 'Aufgabe 3: Brüche. Du denkst an Chiaras Pizza.'], ['erzaehler', 'Zwei Viertel plus ein Viertel. Drei Viertel!']] : [['erzaehler', 'Aufgabe 3: Brüche. Hm. Du lässt sie erst mal aus.']]),
    ichBotschaft: async () => {
      input.setEnabled(false);
      const satz = await ui.ichBotschaft(ichBotschaftThema(S.merke));
      staerke('ichbotschaft'); S.merke.ichSatz = satz;
      return [['du', satz], ['hoffmann', 'Danke, {name}. Das war eine echte Ich-Botschaft.'],
        S.merke.chatGelacht ? ['jo', '… Ich lösch so was in Zukunft. Und frag vorher.'] : ['jo', '… Okay. Ich frag nächstes Mal vorher.'],
        ['hoffmann', 'Dann schreiben wir das als Klassenregel auf.']];
    },
    // Kapitel 3
    warten: async () => { await ui.bild('40 Minuten später …', 'Der nächste Bus kommt um 8:17. Ihr steigt ein.', 2.6); },
    kenanErinnert: () => (S.merke.gedraengelt ? [
      ['kenan', 'Moment. Du bist doch der vom Gang. Der gedrängelt hat.'],
      { wahl: [
        { t: 'Ja. Sorry, das war nicht cool.', staerke: 'ehrlich', herz: { kenan: 3 }, dann: [['kenan', 'Schon okay. Vergessen.']] },
        { t: 'Ja, und?', herz: { kenan: -1 }, dann: [['kenan', 'Nix. War nur ’ne Frage.']] },
      ] }] : S.merke.gewartet ? [['kenan', 'Du bist der Neue vom Gang, oder? Sorry, wir standen im Weg.']] : [['kenan', 'Ah, der Neue vom Gang. Hi.']]),
    saege: async () => {
      input.setEnabled(false);
      const abw = await ui.saege();
      S.merke.saege = abw;
      return saegeFolgen(abw).zeilen;
    },
    beckerLob: () => [
      ['becker', (S.merke.saege || 0) <= 1 ? 'Sauber gemessen. Das war richtig gut.' : 'Gut war: Du hast es ein zweites Mal versucht.'],
      ...((S.staerken.sicher || 0) ? [['becker', 'Und du hast sofort an die Brille gedacht.']] : []),
    ],
    kenanBus: () => ((S.herz.kenan || 0) >= 3 ? [['kenan', 'Hey, {name}! Gute Arbeit heute.']] : []),
    milaWoche: () => ((S.herz.mila || 0) >= 4 ? [['mila', 'Danke für Donnerstag, {name}. Wirklich.']] : []),
  };

  // ---------- Bingo ----------
  function zeigeBingo() { ui.bingo(BINGO.map((b) => ({ text: b.text, wer: S.bingo[b.id] ? LEUTE[S.bingo[b.id]].name : '' }))); }
  async function bingoFrage(id) {
    const g = GESPRAECHE['bingo_' + id]; if (!g) return;
    const erst = !S.gefragt.includes(id);
    const zeilen = [];
    if (erst && id !== 'noah') {
      zeilen.push({ wahl: [
        { t: 'Hi! Darf ich dich was fürs Bingo fragen?', staerke: 'kontakt', herz: { [id]: 1 }, dann: [[id, 'Klar, frag.']] },
        { t: 'Hast du ein Haustier? Oder machst du Sport?', dann: [] },
        { t: '(Die Karte hinhalten.)', dann: [[id, 'Ah, das Bingo. Zeig mal.']] },
      ] });
    }
    zeilen.push(...g.zeilen);
    await gespraech(zeilen);
    if (!S.gefragt.includes(id)) S.gefragt.push(id);
    const neu = g.felder.filter((f) => !S.bingo[f]);
    for (const f of neu) S.bingo[f] = id;
    if (neu.length) { zeigeBingo(); ui.toast('✓ Bingo-Feld: ' + BINGO.filter((b) => neu.includes(b.id)).map((b) => b.text).join(', ')); }
    else if (g.felder.length && id !== 'noah') ui.toast('Diese Felder hast du schon.');
    sichern();
    if (BINGO.every((b) => S.bingo[b.id])) { ui.bingo(null); await gespraech(GESPRAECHE.bingoFertig); naechster(); }
  }

  // ---------- Schritte ----------
  let busFaehrt = 0;   // 0 steht, 1 fährt los (weg), −1 fährt am Ende ab
  async function starteSchritt(i, mitStart) {
    const vorher = SCHRITTE[S.schritt];
    S.schritt = i; S.fertig = false; sichern();
    const st = SCHRITTE[i];
    if (mitStart !== false && vorher && (vorher.tag !== st.tag || vorher.kap !== st.kap) && i > 0) {
      await ui.bild(st.tag, st.kap !== vorher.kap ? kapName(st.kap) : 'Ein neuer Tag am Lycée des Collines.', 2.4);
    }
    sky.time.setTimeOfDay(st.uhr); ui.uhr(st.uhr, st.tag);
    ui.bingo(null);
    await stelleLeute(st.leute || {});
    const ort = st.start && st.start.teleport ? welt.orte[st.start.teleport] : null;
    if (ort && mitStart !== false) steuerung.teleport(ort.x, ort.z, ort.yaw);
    if (bus) { bus.position.x = st.id === 'ankunft' || st.fertig.ort === 'bus' ? -12 : 300; busFaehrt = 0; }
    ui.auftrag({ kapitel: kapName(st.kap), titel: st.titel, ziel: st.ziel });
    if (st.id === 'bingo') zeigeBingo();
    if (st.start && st.start.gespraech && mitStart !== false) {
      await gespraech(GESPRAECHE[st.start.gespraech]);
      if (st.id === 'ankunft' && bus) busFaehrt = 1;
    }
  }
  async function naechster() {
    if (S.schritt + 1 < SCHRITTE.length) await starteSchritt(S.schritt + 1, true);
  }
  // Wen spricht man in diesem Schritt an – und was passiert?
  async function rede(id) {
    const st = SCHRITTE[S.schritt];
    const f = st && !S.fertig ? st.fertig : null;
    if (f && f.reden === id) { await gespraech(GESPRAECHE[f.gespraech]); await naechster(); return; }
    if (st && st.id === 'bingo' && GESPRAECHE['bingo_' + id]) { await bingoFrage(id); return; }
    if (f && f.eins) {
      if (st.id === 'pause' && id === 'mila' && !S.merke.pauseMila) { S.merke.pauseMila = true; await gespraech(GESPRAECHE.mila); await nachPause(); return; }
      if (st.id === 'pause' && (id === 'ben' || id === 'yusuf') && !S.merke.pauseKorb) { S.merke.pauseKorb = true; await gespraech(GESPRAECHE.freiwurf); await gespraech(GESPRAECHE.freiwurfDanach); await nachPause(); return; }
      if (st.id === 'tisch' && (id === 'noah' || id === 'mila')) { S.merke.tisch = id; await gespraech(GESPRAECHE['tisch_' + id]); await naechster(); return; }
    }
    // sonst: kurz plaudern
    const l = PLAUDERN[id] || ['Hi.'];
    const n = (S.merke['p_' + id] = ((S.merke['p_' + id] || 0) + 1));
    await gespraech([[id, l[(n - 1) % l.length]]]);
  }
  async function nachPause() {
    const beide = S.merke.pauseMila && S.merke.pauseKorb;
    if (beide) { await gespraech([['erzaehler', 'Es klingelt. Die Pause ist vorbei.']]); await naechster(); return; }
    await gespraech([{ wahl: [{ t: 'Noch etwas Pause machen.', dann: [] }, { t: 'Weiter: zum Mittagessen.', dann: [] }] }]);
    // die zweite Antwort beendet die Pause
    if (lastWahl === 1) await naechster();
  }
  let lastWahl = -1;
  { const w = ui.waehle; ui.waehle = (o, f) => w(o, f).then((i) => { lastWahl = i; return i; }); }

  // ---------- Bilanz ----------
  function bilanz() {
    return {
      name: S.name,
      leute: Object.entries(S.herz).filter(([id]) => LEUTE[id]).map(([id, h]) => ({ name: LEUTE[id].name, farbe: LEUTE[id].farbe, herz: h, notiz: '' })).sort((a, b) => b.herz - a.herz),
      staerken: Object.entries(S.staerken).map(([k, n]) => ({ ...STAERKEN[k], n })),
      entdeckt: S.entdeckt.length, gesamt: GEHEIMNISSE.length,
    };
  }
  ui.onJournal = () => {
    if (!S || imGespraech) return;
    const b = bilanz();
    ui.journal({ name: S.name, stundenplan: S.stundenplan, leute: b.leute, staerken: b.staerken, geheimnisse: GEHEIMNISSE.filter((g) => S.entdeckt.includes(g.id)), gesamt: GEHEIMNISSE.length, lernkarten: S.lernkarten || [] });
  };

  // ---------- Nähe: wen kann man ansprechen? ----------
  let naechste = null;
  function wenNah() {
    let best = null, bd = Infinity;
    const p = steuerung.pos;
    for (const x of Object.values(leute)) {
      if (!x.f.group.visible) continue;
      const d = Math.hypot(x.pos.x - p.x, x.pos.z - p.z);
      if (d < (x.def.reich || 2.2) && d < bd) { bd = d; best = x; }
    }
    return best;
  }
  ui.onAktion = () => { if (naechste && !imGespraech && !gesperrt() && laeuft) rede(naechste.id); };

  // ---------- Schleife ----------
  let laeuft = false, raumAlt = undefined, geheimT = 0;
  const loop = createLoop({ render: () => rr.render({ night: sky.night, time: loop.time, sun: sky.sunDir, sunColor: sky.colors && sky.colors.light }) });
  loop.add(() => input.beginFrame(), { order: -100, always: true });
  loop.add((dt) => {
    if (!laeuft) { camera.position.set(-36, 16, 64); camera.lookAt(0, 6, -10); return; }
    steuerung.update(dt);
    if (spieler) spieler.update(dt);
  }, { order: -50, always: true });
  loop.add((dt, t) => {
    // Menschen: Bewegungen, zum Spieler drehen, Schilder nur nah
    const p = steuerung.pos;
    for (const x of Object.values(leute)) {
      if (!x.f.group.visible) continue;
      x.f.update(dt);
      const d = Math.hypot(x.pos.x - p.x, x.pos.z - p.z);
      const zuMir = ((d < 2.6 && laeuft) || x === gegenueber) && x.haltung !== 'sitzt';
      const will = zuMir ? Math.atan2(p.x - x.pos.x, p.z - x.pos.z) : x.basisYaw;
      let dd = will - x.yaw; dd = Math.atan2(Math.sin(dd), Math.cos(dd)); x.yaw += dd * Math.min(1, dt * 5);
      x.f.group.rotation.y = x.yaw;
      x.schild.visible = d < 9 && laeuft && camera.position.distanceTo(x.pos) > 2.6;
      x.schild.material.opacity = Math.max(0, Math.min(1, (9 - d) / 3));
    }
    statistenBewegen(dt);
    // Bus
    if (bus && busFaehrt) { bus.position.x += dt * 9; if (bus.position.x > 140) { bus.position.x = 300; busFaehrt = 0; } }
    // Marker
    const ziele = laeuft ? zielPunkte() : [];
    marker.forEach((m, i) => {
      const z = ziele[i]; m.visible = !!z && !imGespraech && (!z || Math.hypot(camera.position.x - z.x, camera.position.z - z.z) > 2.2);
      if (!z) return;
      m.position.set(z.x, 0.08, z.z);
      m.children[0].position.y = z.y + Math.sin(t * 3) * 0.1; m.children[0].rotation.y = t * 1.5;
      const r = m.getObjectByName('ring'); r.position.y = 0.02; r.scale.setScalar(1 + (t * 0.8 % 1) * 0.5); r.material.opacity = 0.5 * (1 - (t * 0.8 % 1));
      r.visible = !z.person;
    });
    if (ziele.length) { let dmin = Infinity; for (const z of ziele) dmin = Math.min(dmin, Math.hypot(z.x - p.x, z.z - p.z)); ui.dist(dmin > 4 ? dmin : null); } else ui.dist(null);
    if (!laeuft) return;
    // Raum
    const raum = welt.raumBei(p.x, p.z);
    const rid = raum ? raum.id : null;
    if (rid !== raumAlt) { if (raumAlt !== undefined) ui.raum(raum ? raum.name : 'Schulhof'); raumAlt = rid; }
    raumLicht.intensity += ((raum ? 1.15 : 0) - raumLicht.intensity) * Math.min(1, dt * 3);
    // Ansprechen
    naechste = imGespraech ? null : wenNah();
    ui.hinweis(naechste ? 'Mit ' + naechste.def.name + ' reden' : null);
    if (!imGespraech && !gesperrt() && (input.state.actionTap || input.state.action) && naechste) rede(naechste.id);
    // Orte, die etwas auslösen
    const st = SCHRITTE[S.schritt];
    if (!imGespraech && st && !S.fertig && st.fertig.ort) {
      const o = welt.orte[st.fertig.ort];
      if (Math.hypot(o.x - p.x, o.z - p.z) < st.fertig.r) { const g = GESPRAECHE[st.fertig.gespraech]; gespraech(g).then(() => { if (g.some((z) => z && z.tu === 'kapitelEnde')) return; naechster(); }); }
    }
    // Entdeckungen
    geheimT -= dt;
    if (geheimT <= 0 && !imGespraech) {
      geheimT = 0.3;
      for (const g of GEHEIMNISSE) if (!S.entdeckt.includes(g.id) && Math.hypot(g.x - p.x, g.z - p.z) < g.r) {
        S.entdeckt.push(g.id); sichern();
        ui.toast('<b>Entdeckt: ' + g.titel + '</b><span>' + g.text + '</span>', 'ly-t-ent'); try { audio.play('pickup'); } catch (e) { /* egal */ }
      }
    }
    ui.update();
  }, { order: -10, always: true });
  loop.add((dt, t) => { camera.updateMatrixWorld(); sky.update(dt, t, camera, steuerung.pos, veil); veil.update(dt, t); }, { order: 0, always: true });
  loop.add(() => input.endFrame(), { order: 100, always: true });
  loop.start();

  await schritt(0.8, 'Die Klasse kommt …');
  // alle Menschen schon beim Laden vorbereiten (sonst ruckelt es, wenn jemand zum ersten Mal auftaucht)
  for (const id of Object.keys(LEUTE)) { const x = await person(id); x.f.group.visible = false; }
  await statistenLaden();
  await schritt(0.9, 'Gleich klingelt es …');
  // Start
  async function los(neu, figur, name) {
    if (neu) { S = neuerStand(name, figur); sichern(); }
    await spielerFigur(S.figur);
    laeuft = true;
    if (S.fertig) {
      await starteSchritt(SCHRITTE.length - 1, false);
      steuerung.teleport(welt.orte.hof.x, welt.orte.hof.z, Math.PI);
      ui.auftrag({ kapitel: kapName(SCHRITTE[SCHRITTE.length - 1].kap), ...FREI });
      return;
    }
    // weiterspielen: an den Anfang des Schritts (mit Ort, ohne Einleitung)
    const st = SCHRITTE[S.schritt];
    const ort = welt.orte[(st.start && st.start.teleport) || (S.schritt ? 'halle' : 'busAnkunft')];
    await starteSchritt(S.schritt, neu ? true : false);
    if (!neu && ort) steuerung.teleport(ort.x, ort.z, ort.yaw);
  }

  // Tests
  window.LYCEE = {
    get zustand() { return S; }, get schritt() { return SCHRITTE[S ? S.schritt : 0].id; }, get imGespraech() { return imGespraech; },
    welt, steuerung, leute, sky, camera, scene, req, ui,
    springe: async (i) => { await starteSchritt(typeof i === 'number' ? i : SCHRITTE.findIndex((s) => s.id === i), true); },
    teleport: (ort, yaw) => { const o = typeof ort === 'string' ? welt.orte[ort] : ort; steuerung.teleport(o.x, o.z, yaw !== undefined ? yaw : o.yaw); },
    rede, los, audio, SITZ, input, get naechste() { return naechste && naechste.id; },
  };

  onProgress(1, '');
  if (test && params.get('start')) { await los(true, +(params.get('figur') || 0), 'Sam'); return window.LYCEE; }
  const w = await ui.titel({ gespeichert: !!(S && S.name), figuren: FIGUREN });
  if (w.weiter) await los(false); else await los(true, w.figur, w.name);
  return window.LYCEE;
}
