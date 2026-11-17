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
import { baueRequisiten, stelle } from './requisiten.js';
import { ladePerson, namensschild, SITZ } from './figuren.js';
import { createSteuerung } from './steuerung.js';
import { createUI } from './ui.js';
import { SCHRITTE, GESPRAECHE, LEUTE, STAERKEN, BINGO, GEHEIMNISSE, SPRECHER, KAPITEL } from './geschichte.js';
import { ORTE2, CHAT, ichBotschaftThema } from './kapitel2.js';
import { ORTE3, saegeFolgen } from './kapitel3.js';
import { ORTE4, IMMER, SCHLICHTEN } from './kapitel4.js';
import { ORTE6, LEITER } from './kapitel6.js';
import { ladePaket, speicherePaket, bereinige, waehle, GRUNDPAKET } from './lernen.js';

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
  noah: ['Sorry. Ich steh im Weg, oder?', 'Hast du schon die neue Gruppe gesehen? … Egal.', 'Ich bin nicht mehr „der Neue“, oder?'],
  mila: ['41 Sekunden. Mein Rekord. Mit dem Würfel.', 'Das stimmt nicht ganz. Aber egal.', '(Sie dreht weiter an ihrem Würfel.)'],
  lina: ['(flüstert) Jo hat Senf am Kinn. Seit der Pause.', '(zeichnet weiter)', '…'],
  jo: ['Was?', 'Ich hab nix gemacht. Diesmal echt.', 'Samstag arbeite ich. Bin also müde. Lass mich.'],
  ben: ['Hast du zwei Euro? Kriegst du morgen.', 'Korbball in der Pause?', 'Keks hat heute mein Ladekabel gefressen.'],
  chiara: ['Ich helf dir, wenn du mir hilfst. Deal?', 'Ich muss noch Französisch. Und Bio.', 'Ärztin. Sagen jedenfalls meine Eltern.'],
  yusuf: ['Hm.', 'Judo ist dienstags. Und freitags. Und manchmal sonntags.', 'Schwimmen? … Nächstes Thema.'],
  ayla: ['Unsere Band probt Samstag. Zweite Probe!', 'Kommst du zum Konzert? Wenn es eins gibt?', 'Ich les alles in der Gruppe. Ich schreib nur nie.'],
  luca: ['Na, Kantinen-Polizei?', 'Hast du Kohle? … War ein Witz. Halb.', 'Kenan sagt, ich soll dich in Ruhe lassen. Mal sehen.'],
  kenan: ['„Zweimal messen, einmal sägen.“ Sagt Becker.', 'Ich hab mich für den CCP beworben. Zweimal schon.', 'Was guckst du?'],
  dario: ['Lass, alles gut.', 'Kenan soll aufhören zu rauchen. Sag’s ihm nicht.', 'Bäcker? Nur bis zehn nach.'],
  weber: ['Bis 16 Uhr. Nicht 16:05.', '(telefoniert) … Moment … Was brauchst du?', 'Ausreden kenn ich alle. Nur so.'],
  hoffmann: ['Äh … du bist … richtig. Hallo.', 'Heute machen wir eine neue Methode!', 'Wenn du was brauchst: Nach der Stunde.'],
  kaya: ['(kaut) Moment … So. Was gibt’s?', 'Ich hab zehn Minuten. Dann kommt die Nächste.', 'Was ich weitersagen muss, sag ich dir vorher.'],
  sommer: ['(pfeift) Nicht rennen im Gang!', 'Schuhe dabei? Gut.', 'Einmal sind alle umgezogen. Einmal.'],
  becker: ['Morgen.', 'Zweimal messen.', '(zeigt auf die Schutzbrille)'],
  kremer: ['Zack, zack.', 'Curry ist heute gut. Ehrlich.', 'Karte leer? … Geht heute. Sag zuhause Bescheid.'],
  laurent: ['„Vieleicht“ schreibt man mit zwei l. Nur so.', 'Donnerstags ist der Club. Komm vorbei.', 'Ich war auch mal in einer kleinen Klasse.'],
  fahrer: ['Abfahrt ist pünktlich. Immer.'],
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
  Object.assign(welt.orte, ORTE2, ORTE3, ORTE4, ORTE6);
  let paket = ladePaket();   // Aufgaben der Lehrperson (Phase 2) oder Grundaufgaben
  scene.add(welt.gruppe);
  const sky = createSky({ scene, renderer: rr.renderer, audio, quality: q, events });
  sky.time.paused = true;
  sky.setStorm(0);   // der Himmel der Insel hat ein Gewitter am Rand – im Lycée nicht
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
    plan = { ...IMMER, ...plan };   // Mme Laurent steht immer an der Ausleihe, wenn die Geschichte sie nicht braucht
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
      p.pos.set(x, 0, z); p.yaw = yaw; p.basisYaw = yaw; p.haltung = haltung || ''; p.gegruesst = false;
      p.f.group.position.copy(p.pos); p.f.group.rotation.y = yaw;
      p.f.spiele(haltung === 'redet' ? 'Interact' : haltung === 'winkt' ? 'Wave' : 'Idle', { tempo: haltung === 'redet' ? 0.35 : 1 });
    }
    feste = Object.values(leute).filter((p) => p.f.group.visible).map((p) => ({ x: p.pos.x, z: p.pos.z, r: 0.3 }));
    steuerung.hindernisse = feste.concat(statisten.map((x) => x.h));
  }

  // ---------- Statisten: andere Schülerinnen und Schüler, die über Hof und Gang laufen (nur Kulisse) ----------
  let feste = [];
  const statisten = [];
  // weg: läuft eine Runde · steht: [x, z, yaw, haltung] mit haltung 'redet' | 'sitzt' | 'raucht' | 'handy' · skate: [x0, x1, z]
  const STATISTEN = [
    { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#5a3a24', oben: '#7b8794', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.7, weg: [[-24, 22], [-10, 28], [16, 24], [8, 12], [-20, 8]], tempo: 1.25 },
    { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.63, weg: [[12, 34], [40, 32], [43, 8], [14, 10]], tempo: 1.15 },
    { modell: 'menschen', stil: 'Beach', haut: '#9b6a45', haar: '#1b1410', oben: '#e85d75', unten: '#4a4f5c', schuhe: '#f2f2f2', hoehe: 1.74, kopf: 'cap', kopfFarbe: '#2b2b33', weg: [[-27, -15.0], [27, -15.0]], tempo: 1.2 },
    { modell: 'frauen', stil: 'Adventurer', haut: '#e0b48c', haar: '#2b1d14', oben: '#3fa66b', unten: '#2d3748', schuhe: '#6b4e3a', hoehe: 1.6, weg: [[25, -15.3], [-25, -15.3]], tempo: 1.1 },
    { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#d9b36a', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.68, frisur: 'locken', weg: [[-4.5, 38], [-4.5, 3], [-1, 3], [-1, 38]], tempo: 1.3 },
    // Pausenaufsicht in Warnweste: läuft ihre Runde über den Hof
    { modell: 'menschen', stil: 'Worker', haut: '#e8bf9a', haar: '#7a7a7a', oben: '#ffd166', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.8, weg: [[-20, 30], [20, 30], [30, 6], [0, 4], [-26, 6]], tempo: 0.95 },
    // Schlange beim Bäcker gegenüber
    { modell: 'frauen', stil: 'Casual', haut: '#f3d2b5', haar: '#c9a15a', oben: '#9b7bc8', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.62, steht: [3.2, 55.6, Math.PI, 'handy'] },
    { modell: 'menschen', stil: 'Beach', haut: '#c99a72', haar: '#2b1d14', oben: '#4f88c8', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.7, steht: [3.4, 54.4, Math.PI, 'redet'] },
    // Raucherecke hinter der Turnhalle
    { modell: 'menschen', stil: 'Punk', haut: '#e0b48c', haar: '#2b1d14', oben: '#2b2b33', unten: '#4a4f5c', schuhe: '#2b2b2b', hoehe: 1.78, kopf: 'muetze', kopfFarbe: '#5a5a5a', steht: [60.2, -19.4, 1.9, 'raucht'] },
    { modell: 'frauen', stil: 'Punk', haut: '#f0c9a8', haar: '#8a5a3a', oben: '#6b4e8a', unten: '#2b2b33', schuhe: '#f2f2f2', hoehe: 1.66, steht: [61.3, -18.1, -2.6, 'handy'] },
    // Skate-Ecke
    { modell: 'menschen', stil: 'Casual', haut: '#a8754f', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.72, kopf: 'cap', kopfFarbe: '#ffd166', skate: [-39, -29.5, 16.4] },
    { modell: 'menschen', stil: 'Casual2', haut: '#e8bf9a', haar: '#6b4e3a', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.69, frisur: 'stachel', steht: [-34.2, 18.2, -2.6, 'redet'] },
    { modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#ffffff', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.62, steht: [-44.6, 13.6, Math.PI / 2, 'sitzt'] },
    // Gruppe unter dem Vordach und zwei auf der Bank im Hof
    { modell: 'frauen', stil: 'Suit', haut: '#eec09a', haar: '#5a3a24', oben: '#e85d75', unten: '#2f3a4a', schuhe: '#2b2b2b', hoehe: 1.64, steht: [14.2, 9.6, 0.9, 'redet'] },
    { modell: 'menschen', stil: 'Worker', haut: '#d8a982', haar: '#3a2a1c', oben: '#5f8fc8', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.75, steht: [15.6, 10.6, -2.4, 'handy'] },
    { modell: 'frauen', stil: 'Formal', haut: '#c68e64', haar: '#2b1d14', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#ffffff', hoehe: 1.6, steht: [6, 23.6, 0, 'sitzt'] },
    { modell: 'menschen', stil: 'Farmer', haut: '#f1c7a2', haar: '#d9b36a', oben: '#e9c46a', unten: '#4f88c8', schuhe: '#ffffff', hoehe: 1.7, steht: [6, 24.6, 0, 'handy'] },
  ];
  let brett = null;
  async function statistenLaden() {
    for (const d of STATISTEN) {
      const f = await ladePerson(veil, d);
      scene.add(f.group);
      const st = d.steht || (d.skate ? [d.skate[0], d.skate[2], Math.PI / 2] : null);
      const p = new THREE.Vector3(st ? st[0] : d.weg[0][0], 0, st ? st[1] : d.weg[0][1]);
      const x = { d, f, p, i: 1, warte: Math.random() * 3, h: { x: p.x, z: p.z, r: 0.3 }, richtung: 1 };
      f.group.position.copy(p);
      if (st) f.group.rotation.y = st[2];
      const halt = d.steht && d.steht[3];
      if (halt === 'sitzt') { f.sitzen(true); f.spiele('Idle'); }
      else if (halt === 'redet') f.spiele('Interact', { tempo: 0.35 });
      else if (halt === 'raucht') { f.spiele('Idle'); x.rauch = zigarette(f); }
      else if (halt === 'handy') { f.spiele('Idle_Neutral'); }
      else if (d.skate) {
        f.spiele('Idle');
        if (!brett && req.geo['skate/skateboard']) brett = req.geo['skate/skateboard'];
        if (brett) { const m = new THREE.Mesh(stelle(brett, { x: 0, z: 0, s: 0.8, rot: Math.PI / 2 }), material); m.position.y = -0.05; f.group.add(m); f.group.children[0].position.y = 0.12; }
      } else f.spiele('Walk', { tempo: d.tempo / 1.4 });
      statisten.push(x);
    }
  }
  // Zigarette in der rechten Hand, kleine Rauchwölkchen steigen auf
  const rauchMat = new THREE.MeshBasicMaterial({ color: '#e8e8ee', transparent: true, opacity: 0.4, depthWrite: false });
  function zigarette(f) {
    let hand = null; f.group.traverse((o) => { if (o.isBone && o.name === 'Wrist.R') hand = o; });
    if (!hand) return null;
    const z = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.08, 6), new THREE.MeshBasicMaterial({ color: '#f4f1ea' }));
    z.rotation.z = Math.PI / 2; z.position.set(0.03, 0.09, 0.03);
    hand.updateMatrixWorld(true); const sk = new THREE.Vector3(); hand.getWorldScale(sk); z.scale.setScalar(1 / (sk.x || 1));
    hand.add(z);
    const wolken = [];
    for (let i = 0; i < 6; i++) { const w = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), rauchMat.clone()); w.visible = false; scene.add(w); wolken.push({ w, t: i * 0.5 }); }
    return { z, wolken };
  }
  const _wp = new THREE.Vector3();
  function statistenBewegen(dt) {
    for (const x of statisten) {
      x.f.update(dt);
      if (x.rauch) {
        x.rauch.z.getWorldPosition(_wp);
        for (const r of x.rauch.wolken) {
          r.t += dt; if (r.t > 3) { r.t = 0; r.w.position.copy(_wp); }
          r.w.visible = r.t < 2.8; r.w.position.y += dt * 0.35; r.w.position.x += dt * 0.08;
          r.w.scale.setScalar(0.6 + r.t * 0.9); r.w.material.opacity = Math.max(0, 0.35 * (1 - r.t / 2.8));
        }
      }
      if (x.d.steht) continue;
      if (x.d.skate) {   // hin und her rollen, an den Enden kurz stehen
        if (x.warte > 0) { x.warte -= dt; continue; }
        const [a, b] = x.d.skate; x.p.x += x.richtung * 3.2 * dt;
        if (x.p.x > Math.max(a, b) || x.p.x < Math.min(a, b)) { x.richtung *= -1; x.p.x = Math.max(Math.min(a, b), Math.min(Math.max(a, b), x.p.x)); x.warte = 1.5 + Math.random() * 2; }
        x.f.group.rotation.y = x.richtung > 0 ? Math.PI / 2 : -Math.PI / 2;
        x.f.group.position.copy(x.p); x.h.x = x.p.x; x.h.z = x.p.z;
        continue;
      }
      if (x.warte > 0) { x.warte -= dt; if (x.warte <= 0) x.f.spiele('Walk', { tempo: x.d.tempo / 1.4 }); continue; }
      const [zx, zz] = x.d.weg[x.i];
      const dx = zx - x.p.x, dz = zz - x.p.z, d = Math.hypot(dx, dz);
      if (d < 0.3) { x.i = (x.i + 1) % x.d.weg.length; if (Math.random() < 0.35) { x.warte = 2 + Math.random() * 4; x.f.spiele('Idle'); } continue; }
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
    if (SPRECHER[wer]) return { wer: wer === 'du' ? S.name : SPRECHER[wer].name, farbe: SPRECHER[wer].farbe };
    const d = LEUTE[wer]; return { wer: d ? d.name : wer, farbe: d ? d.farbe : '#2b3a55' };
  }
  let tagHerz = {};
  function herz(id, n) {
    if (!LEUTE[id] || !n) { if (LEUTE[id] && S.herz[id] == null) S.herz[id] = 1; return; }
    S.herz[id] = Math.max(0, Math.min(5, (S.herz[id] == null ? 1 : S.herz[id]) + n));
    tagHerz[id] = (tagHerz[id] || 0) + n;   // erst im Tagesrückblick sichtbar, nicht sofort
  }
  function staerke(k) {
    if (!STAERKEN[k]) return;
    S.staerken[k] = (S.staerken[k] || 0) + 1;
    // still: keine Glocke, keine Karte – sonst verrät das Spiel die „richtige“ Antwort. Sichtbar im Journal und am Kapitelende.
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
        const opt = z.wahl.filter((w) => !w.wenn || w.wenn(S.merke));   // manche Antworten gibt es nur nach früheren Entscheidungen
        const i = await ui.waehle(opt.map((w) => ersetze(w.t)));
        const w = opt[i];
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
      const text = m.linaGefragt ? 'Orte, an denen man sich wohlfühlt. Jo malt das Gebäude, Lina die Orte.' : m.ideeGeklaut ? 'Orte zum Wohlfühlen. Jo malt. Lina malt aus. Sie schaut dich nicht an.' : m.joMacht ? 'Jo malt das Gebäude. Lina malt aus. Du scrollst.' : 'Jo malt das Gebäude. Ihr malt aus.';
      await ui.bild('20 Minuten später …', text, 3);
    },
    plakatEnde: () => {
      const m = S.merke;
      if (m.ideeGeklaut) return [['hoffmann', 'Orte zum Wohlfühlen. Gute Idee. Von wem?'],
        { wahl: [
          { t: '„Von mir.“', herz: { hoffmann: 1, lina: -2 }, merke: 'ideeBehalten', dann: [['hoffmann', 'Stark, {name}.'], ['erzaehler', 'Lina schaut aus dem Fenster.']] },
          { t: '„Eigentlich von Lina.“', staerke: 'ehrlich', herz: { lina: 1 }, dann: [['jo', 'Hä? Du hast doch gesagt …'], ['hoffmann', 'Aha. Dann: gut, Lina.'], ['lina', '(ganz leise) Danke.']] },
        ] }];
      if (m.linaGefragt) return [['hoffmann', 'Orte zum Wohlfühlen. Wessen Idee?'], ['jo', 'Linas. Das Gebäude ist von mir.']];
      if (m.joMacht) return [['hoffmann', 'Schönes Gebäude. Und ihr zwei?'], ['jo', 'Ausgemalt. Und {name} war am Handy.'], ['hoffmann', '{name}. Handy. Auf mein Pult. Bis 16 Uhr.']];
      return [['hoffmann', 'Schönes Gebäude, Jo. Und ihr?'], ['lina', '… ausgemalt.']];
    },
    // ---------- Kapitel 7: Praktikum ----------
    k7Platz: () => (S.merke.berufHolz
      ? [['erzaehler', 'Dein Name: „Werkstatt, M. Becker“. Mit Stern.'], ['noah', 'Wieso hast du schon was? … Ah. Becker.']]
      : [['erzaehler', 'Dein Name. Daneben: nichts. „Bitte zum SePAS.“'], ['noah', 'Bei mir auch. Wir sind die Reste.']]),
    k7Jo: () => {
      const m = S.merke;
      if (m.berufHolz) return [['jo', 'Werkstatt? Viel Spaß mit der Taucherbrille.']];
      if (m.joVerpetzt || m.racheJo) return [['jo', 'Mein Onkel sucht noch wen. Garage.'], ['jo', '(schaut dich an) Keinen, der petzt.'], ['noah', '(leise) Mich hat er auch nicht gefragt.']];
      return [['jo', 'Mein Onkel sucht noch wen. Garage. Reifen schleppen.'],
        { wahl: [
          { t: '„Ernsthaft? Ich komm.“', staerke: 'entscheiden', herz: { jo: 1, noah: -1 }, merke: 'garageJo', dann: [['jo', 'Sieben Uhr. Bist du zu spät, bin ich dran.'], ['noah', '(leise) Und ich?']] },
          { t: '„Frag Noah. Der hat auch nix.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'garageNoah', dann: [['jo', 'Noah? Der hebt keinen Reifen.'], ['noah', 'Doch! … Vielleicht.'], ['jo', '… Okay. Noah.']] },
          { t: '„Bei dir? Nee, danke.“', herz: { jo: -1 }, dann: [['jo', 'Dann Kantine. Viel Spaß mit Kremer.']] },
        ] }];
    },
    k7Unterschrift: () => {
      const m = S.merke;
      if (m.gefaelscht) return [['kaya', 'Hoffmann hat mir deinen Zettel gezeigt. Von neulich.'], ['kaya', 'Die Unterschrift sieht aus wie Noahs Schrift.'], ['erzaehler', 'Noah, an der Tür, wird ganz still.'],
        { wahl: [
          { t: '„Die ist echt.“', merke: 'kayaRuftAn', dann: [['kaya', 'Okay. Dann ruf ich kurz zuhause an. Zum Prüfen.']] },
          { t: '„Hat Noah gemacht. Ich hab ihn gefragt.“', staerke: 'ehrlich', herz: { noah: -1 }, merke: 'faelschungZu', dann: [['kaya', 'Danke. Hoffmann muss ich’s sagen. Nur das.'], ['noah', '(leise) Super. Danke.']] },
          { t: '„Hat Noah gemacht. Ohne mich zu fragen.“', herz: { noah: -3 }, merke: 'noahGeopfert', dann: [['noah', 'Was?!'], ['kaya', 'Noah. Bleib mal kurz hier.']] },
          { t: '(Schweigen.)', dann: [['kaya', 'Okay. Donnerstag ist Elternabend. Ich frag dort.']] },
        ] }];
      if (m.zettelVerloren) return [['kaya', 'Hoffmann sagt, dein Zettel ist „verloren“.'], ['kaya', 'Der hier geht nicht verloren. Ja?']];
      if (m.haStress || m.hoffmannReden) return [['kaya', 'Wenn unterschreiben zuhause schwer ist: sag nur das.'], ['kaya', 'Warum, musst du nicht sagen.'],
        { wahl: [
          { t: '„Geht schon. Ich bring’s.“', dann: [['kaya', 'Okay.']] },
          { t: '„Rufen Sie an. Morgens ist es ruhig.“', staerke: 'hilfe', dann: [['kaya', 'Morgens. Notiert.']] },
        ] }];
      return [];
    },
    k7Garage: () => {
      const m = S.merke;
      if (m.berufHolz) return [['kaya', 'Werkstatt. Becker. Morgen 7:30. Nicht 7:35.']];
      if (m.garageJo) return [['kaya', 'Garage? Der Onkel will dich erst sehen. Samstag.'], ['kaya', 'Diese Woche: Kantine. Oder du findest heute was.']];
      if (m.garageNoah) return [['kaya', 'Noah, Jos Onkel will dich Samstag sehen.'], ['noah', '(strahlt) Echt?'], ['kaya', '{name}: Bäcker anrufen. Sonst Kantine.']];
      if (m.berufMenschen) return [['kaya', 'Du wolltest was mit Menschen. Kantine sind viele Menschen.'], ['kaya', 'Ruf vorher noch beim Bäcker an.']];
      return [['kaya', 'Bei dir ist noch nichts. Ruf heute beim Bäcker an.'], ['kaya', 'Sonst bleibt die Kantine.']];
    },
    weberKennt: () => (S.merke.portiWeber ? [['weber', 'Du hast mal Bens Portemonnaie gebracht. Weiß ich noch.']]
      : S.merke.diebstahlGelogen ? [['weber', '(schaut dich lange an) Ich bleib so lange hier.']] : []),
    lucaHaube: () => (S.merke.lucaAngelegt || S.merke.lucaGepetzt ? [['luca', '(mit Haube) Kantinen-Polizei. Jetzt in echt.']]
      : S.merke.lucaBeschuldigt ? [['luca', 'Kenan sagt, du hast mich verdächtigt. Danke auch.']]
      : [['luca', '(mit Haube) Sag nix. Ich weiß, wie ich aussehe.']]),
    lucaTeilt: () => (S.merke.lucaWitz
      ? [['luca', 'Deal. Ich hasse schälen.'], ['erzaehler', 'Zwei Kisten um Viertel vor neun.'], ['kremer', '(nickt nur)']]
      : [['luca', 'Ich bin seit gestern hier. Ich sag, wer schält.'], ['erzaehler', 'Du schälst. Er schaut zu. Kremer sieht es nicht.']]),
    kenanBetreuer: () => {
      const m = S.merke;
      if (m.kenanVerpfiffen) return [['kenan', 'Ausgerechnet du.'], ['kenan', 'Wegen dir kam ein Brief nach Hause.'],
        { wahl: [
          { t: '„Am Tor hätte ich die Klappe halten können.“', staerke: 'ehrlich', herz: { kenan: 1 }, dann: [['kenan', 'Hättest du. … Okay. Brille auf.']] },
          { t: '„Du hast die Kippe vor mich geworfen.“', staerke: 'klar', dann: [['kenan', '(Pause) … Stimmt.'], ['kenan', 'Trotzdem. Ich zeig’s einmal.']] },
          { t: '(Nichts sagen. Brille auf.)', dann: [['kenan', 'Bohren. Schrauben. Fertig. Mehr sag ich nicht.']] },
        ] }];
      if (m.schuldGenommen || m.kenanSchuldet) return [['kenan', 'Becker sagt, ich bin für dich verantwortlich.'], ['kenan', 'Passt. Ich schulde dir eh was.']];
      if (m.torWeg) return [['kenan', 'Ah. Tor. Weggerannt. Ich erinnere mich.']];
      return [['kenan', 'Becker sagt, ich bin für dich verantwortlich. Also: zuhören.']];
    },
    quitt: () => (S.merke.kenanVerpfiffen && S.merke.kenanGerettet ? [['kenan', '(leise) Tor und Bohrer. Jetzt sind wir quitt.']]
      : S.merke.kenanVerpfiffen && S.merke.kenanVerraten2 ? [['kenan', 'Zweimal. Merk ich mir.']] : []),
    k7Mila: () => {
      const m = S.merke;
      const z = [['mila', m.berufHolz ? 'Du hast Sägemehl in den Haaren.' : 'Du riechst nach Zwiebel. Stark.'], ['mila', 'Freitag präsentieren wir zwei. Hat Hoffmann so verteilt.']];
      if (m.milaVerleugnet) z.push(['mila', 'Keine Sorge. Ich sag allen, wir sind „niemals“ was.'],
        { wahl: [
          { t: '„Das in der Kantine war feige.“', staerke: 'ehrlich', herz: { mila: 2 }, merke: 'milaVersoehnt', dann: [['mila', '… Ja. War es.'], ['mila', 'Freitag redest du zuerst.']] },
          { t: '„Ich frag Hoffmann, ob ich allein darf.“', staerke: 'abstand', herz: { mila: -1 }, merke: 'alleinPraesentieren', dann: [['mila', 'Mach. Ich frag nicht für dich.']] },
          { t: '„Luca hat genervt. Mehr war nicht.“', herz: { mila: -1 }, dann: [['mila', 'Luca hat nicht „niemals“ gesagt.']] },
        ] });
      else if (m.geruechtStehen) z.push(['mila', 'Die fragen immer noch, ob wir … du weißt.'], ['mila', 'Ich sag jetzt einfach ja. Spart Zeit.'],
        { wahl: [
          { t: '„Dann sag ich auch ja.“', staerke: 'humor', herz: { mila: 1 }, dann: [['mila', '(lacht. Laut.)']] },
          { t: '„Lieber nicht. Ernsthaft.“', staerke: 'klar', dann: [['mila', 'Okay. Dann: geht keinen was an.']] },
        ] });
      else z.push(['mila', 'Ich mach die Folien. Du redest. Deal?'],
        { wahl: [
          { t: '„Deal.“', herz: { mila: 1 }, dann: [] },
          { t: '„Andersrum. Ich red nicht gern.“', staerke: 'klar', dann: [['mila', 'Ich auch nicht. Dann jeder die Hälfte.']] },
        ] });
      return z;
    },
    k7Noah: () => {
      const m = S.merke;
      if (m.noahGeopfert) return [['erzaehler', 'Noah steht auf, als du kommst. Er geht.']];
      if (m.beweisDu) return [['noah', 'Der Screenshot von dir. Für Kaya.'], ['noah', 'Ich hab ihn nie geschickt. Sorry.'],
        { wahl: [
          { t: '„Weiß ich. Hab’s gemerkt.“', staerke: 'lesen', dann: [['noah', 'Jo hätte sofort gewusst, dass ich’s war.']] },
          { t: '„Dann schick ihn jetzt.“', staerke: 'klar', dann: [['noah', 'Geht nicht. Jo hat die Gruppe gelöscht.'], ['noah', 'Alles weg. Auch das Bild.']] },
          { t: '„Feige, Noah.“', herz: { noah: -2 }, dann: [['noah', 'Ja.'], ['erzaehler', 'Er steht auf. Er geht zum Brunnen.']] },
        ] }];
      return [['noah', m.garageNoah ? 'Samstag Garage. Ich hab jetzt schon Angst.' : 'Ich hab immer noch nix. Nur Kaya.']];
    },
    benKasse: () => {
      const m = S.merke;
      if (m.zwanzigGenommen && m.diebstahlGelogen) return [['ben', '(in der Schlange) Echt jetzt? {name} an der Kasse?'], ['kremer', 'Wieso?'],
        { wahl: [
          { t: '„Ich hab damals Bens Geld genommen.“', staerke: 'ehrlich', herz: { ben: 1 }, merke: 'diebstahlSpaet', dann: [['kremer', '(lange Pause) Dann heute Tabletts. Morgen sehen wir.'], ['ben', '… Okay. Wenigstens jetzt.']] },
          { t: '„Ben spinnt. Frag ihn, was er meint.“', herz: { ben: -1 }, merke: 'kasseBeobachtet', dann: [['ben', 'Frag Hoffmann.'], ['kremer', 'Ich zähl heute Abend. Auf den Cent.']] },
          { t: '(Kremer die Kasse geben. Wortlos.)', staerke: 'abstand', merke: 'keineKasse', dann: [['kremer', 'Hm. Dann Tabletts.']] },
        ] }];
      if (m.diebstahlZugegeben) return [['ben', 'An die Kasse? Mutig, Frau Kremer.'], ['kremer', 'Weiß ich. Ist geklärt.'], ['ben', '… Hm.']];
      if (m.vierGenommen && m.benMisstrauen) return [['ben', '(zu Yusuf, laut genug) Zähl dein Wechselgeld.']];
      return [['ben', 'Krieg ich Rabatt? … Nein? Okay.']];
    },
    lucaKarte: () => {
      if (S.merke.diebstahlSpaet || S.merke.keineKasse) return [['erzaehler', 'An der Kasse: Luca. Rotes Licht. Karte leer.'], ['kremer', '(leise) Geht heute.'], ['erzaehler', 'Luca sieht, dass du es gesehen hast.']];
      return [['erzaehler', 'Luca ist dran. Karte drauf. Rotes Licht.'], ['luca', '(leise) Leer. Lass mich durch. Merkt keiner.'],
        { wahl: [
          { t: '„Karte leer. Geht nicht.“', staerke: 'klar', herz: { luca: -2 }, dann: [['luca', 'Eine Woche hier und schon Chef.'], ['erzaehler', 'Er stellt das Tablett hin. Und geht.']] },
          { t: '(Durchwinken.)', herz: { luca: 2 }, merke: 'lucaDurch', dann: [['luca', '(nickt. Sagt nichts.)'], ['erzaehler', 'Keiner hat’s gesehen. Glaubst du.']] },
          { t: '„Frau Kremer? Lucas Karte ist leer.“', staerke: 'hilfe', herz: { luca: -1, kremer: 1 }, dann: [['kremer', '(leise) Geht heute. Sag zuhause Bescheid.'], ['luca', '(rot) Musst du das so laut sagen?']] },
          { t: '(Zwei Euro aus deiner Tasche drauflegen.)', staerke: 'loyal', herz: { luca: 1 }, merke: 'lucaBezahlt', dann: [['luca', 'Was soll das? … Okay. Danke.'], ['erzaehler', 'Zwei Euro weg. Deine.']] },
        ] }];
    },
    k7Bogen: () => {
      const m = S.merke;
      if (m.berufHolz) return [['erzaehler', m.kenanGerettet ? 'Becker: „Pünktlich. Der Bohrer? Glaub ich nicht ganz.“' : 'Becker: „Pünktlich. Tempo üben.“']];
      return [['erzaehler', m.lucaDurch ? 'Kremer: „Fleißig. Kasse: ein Essen fehlt. Wir reden.“'
        : m.diebstahlSpaet ? 'Kremer: „Spüle gut. Kasse später.“' : 'Kremer: „Zack, zack. Geht doch.“']];
    },
    k7Folgen: () => {
      const m = S.merke, z = [];
      if (m.garageNoah) z.push(['noah', 'Jos Onkel nimmt mich. Ab nächstem Monat.'], ['noah', 'Wegen dir. Weißt du, oder?']);
      if (m.garageJo) z.push(['jo', 'Samstag, sieben Uhr. Mein Onkel wartet nicht.']);
      if (m.noahGeopfert) z.push(['erzaehler', 'Noah setzt sich ganz vorne hin. Neben den Fahrer.']);
      if (m.kayaRuftAn) z.push(['erzaehler', 'Dein Handy: drei verpasste Anrufe. Von zuhause.']);
      if (m.milaVersoehnt) z.push(['mila', 'Präsentation war okay. Du hast zu schnell geredet.']);
      else if (m.alleinPraesentieren) z.push(['erzaehler', 'Mila steigt hinten ein. Ohne zu schauen.']);
      if (m.kenanGerettet && m.kenanVerpfiffen) z.push(['kenan', '(im Vorbeigehen) Quitt.']);
      if (!z.length) z.push(['noah', 'Erste Arbeitswoche. Ich bin so müde.']);
      return z;
    },
    // ---------- Kapitel 6: kleine Schritte ----------
    torCheck: async () => { const v = await ui.skala({ frage: 'Wie stark ist es gerade?', links: 'ganz ruhig', rechts: 'sehr stark' }); S.merke.torWert = v; sichern(); },
    kayaStart: () => (S.merke.torHeim ? [['kaya', 'Gestern warst du nicht da. Kein Verhör.'], ['kaya', 'Bauch?'], { wahl: [{ t: '(Nicken.)', dann: [] }, { t: '„Geht schon.“', dann: [['kaya', 'Okay.']] }] }]
      : [['kaya', 'Gestern war zäh, oder? Sah man dir an.']]),
    leiterBauen: async () => {
      const ord = await ui.sortieren({ titel: 'Deine Mutleiter', frage: 'Tipp zuerst an, was für dich am leichtesten wäre.', teile: LEITER });
      S.leiter = ord; sichern();
      const t = (id) => LEITER.find((l) => l.id === id).t;
      return [['kaya', 'Unten: „' + t(ord[0]) + '“.'], ['kaya', 'Oben: „' + t(ord[ord.length - 1]) + '“. Das kommt später.']];
    },
    leiterStart: () => {
      const rang = (S.leiter || []).indexOf('pause');
      S.merke.pauseKurz = rang >= 2;
      return [['kaya', 'Die Pause kommt sowieso jeden Tag. Da fangen wir an.'],
        ['kaya', rang >= 2 ? 'Steht bei dir weit oben. Also nur eine halbe Minute.' : 'Zwei Minuten bei den anderen stehen. Reden musst du nicht.']];
    },
    probePause: async () => {
      const vorher = await ui.skala({ frage: 'Wie stark ist die Anspannung jetzt?' });
      const r = await mutprobe({ titel: 'Bei den anderen bleiben', mitte: welt.orte.preau, r: 5.5, dauer: S.merke.pauseKurz ? 30 : 45, start: vorher,
        hinweis: 'Bleib in der Nähe. Reden musst du nicht.',
        saetze: [{ bei: 0.3, wer: 'yusuf', text: 'Hat wer Bio gemacht?' }, { bei: 0.55, wer: 'ayla', text: '(lacht über was auf Noahs Handy)' }, { bei: 0.8, wer: 'noah', text: '(nickt dir zu)' }] });
      const nachher = await ui.skala({ frage: r.geblieben ? 'Und jetzt, am Ende?' : 'Und jetzt, wo du weg bist?' });
      logMut('pause', 'Pause bei der Gruppe', vorher, nachher, r);
      if (r.geblieben) { staerke('bleiben'); return [['erzaehler', 'Vorher: ' + vorher + '. Am Ende: ' + nachher + '.'], ...(nachher < vorher ? [['erzaehler', 'Runter. Obwohl du nichts gemacht hast. Nur geblieben.']] : [['erzaehler', 'Heute ging’s kaum runter. Kommt vor.']]), ['noah', 'Kommst du morgen wieder her?'], { wahl: [{ t: '„Mal sehen.“', dann: [] }, { t: '„Ja.“', herz: { noah: 1 }, dann: [['noah', 'Cool.']] }] }]; }
      return [['erzaehler', 'Du bist nach ' + r.sek + ' Sekunden gegangen.'], ['erzaehler', 'Später, Handy. Herr Kaya: „Wie lang warst du da?“'],
        { wahl: [{ t: '„' + r.sek + ' Sekunden.“', dann: [['kaya', 'Zählt. Nächstes Mal: so lang plus fünf.']] }, { t: '„Kaum. Bringt eh nix.“', dann: [['kaya', 'Bringt mehr, als es sich anfühlt. Morgen nochmal?']] }] }];
    },
    sicherVorher: async () => { S.merke.sicherV = await ui.skala({ kicker: 'Dein Kopf', frage: 'Wie sicher bist du, dass es um dich geht?', links: 'gar nicht', rechts: 'total sicher' }); sichern(); },
    sicherNachher: async () => {
      const n = await ui.skala({ kicker: 'Dein Kopf', frage: 'Und jetzt: Wie sicher, dass es um dich ging?', links: 'gar nicht', rechts: 'total sicher' });
      logMut('lachen', 'Das Lachen im Gang', S.merke.sicherV || 3, n, { geblieben: true }, 'Wie sicher: „Die lachen über mich“');
      return [['erzaehler', 'Vorhin: ' + (S.merke.sicherV || 3) + ' von 5. Jetzt: ' + n + ' von 5.']];
    },
    tafelFolge: () => {
      const m = S.merke;
      if (m.tafelGelesen) logLeiter('tafel', 'ok');
      else if (m.tafelGleich || m.tafelKarte) logLeiter('tafel', 'halb');
      if (m.tafelStumm && !m.karte) return [['erzaehler', 'Nach der Stunde.'], ['hoffmann', 'Ich hab dich vorhin überrumpelt. Sorry.'], ['hoffmann', 'Nächstes Mal sag einfach „gleich“. Dann komm ich zurück.']];
      if (m.tafelStumm) return [['erzaehler', 'Nach der Stunde.'], ['hoffmann', 'Die Karte darfst du echt benutzen. Ich mein das so.']];
      if (m.tafelKlo) return [['erzaehler', 'Nach der Stunde. M. Hoffmann sagt nichts. Er nickt nur.']];
      return [];
    },
    fehlerAufgabe: async () => {
      await ui.quiz([{ id: 'k6f', fach: 'Mathe', frage: '2,5 + 1,25 = ?', antworten: ['3,75', '3,30', '2,75'], richtig: 0, erklaerung: 'Komma unter Komma: 2,50 + 1,25 = 3,75.' }], { titel: 'Ein Fehler' });
      if (S.merke.testFrage) logLeiter('frage', 'ok');
    },
    stufeVorschlag: () => {
      const l = S.leiter || [], b = l.indexOf('baecker'), k = l.indexOf('kantine');
      const leichter = b >= 0 && k >= 0 ? (b < k ? 'der Bäcker' : 'die Kantine') : 'der Bäcker';
      return [['kaya', 'Auf deiner Leiter ist ' + leichter + ' weiter unten.'], ['kaya', 'Du entscheidest.']];
    },
    probeBaecker: async () => {
      const vorher = await ui.skala({ frage: 'Wie stark ist die Anspannung jetzt?' });
      const r = await mutprobe({ titel: 'In der Schlange bleiben', mitte: welt.orte.baeckerSchlange, r: 4, dauer: 30, start: vorher, hinweis: 'Bleib in der Schlange.',
        saetze: [{ bei: 0.4, wer: 'baeckerin', text: 'Zwei Croissants? Bitte schön.' }, { bei: 0.75, wer: 'baeckerin', text: 'Der Nächste, bitte.' }] });
      if (!r.geblieben) {
        const n = await ui.skala({ frage: 'Und jetzt, wo du weg bist?' });
        logMut('baecker', 'Beim Bäcker bestellen', vorher, n, r);
        return [['erzaehler', 'Du gehst zurück. Ohne Teilchen.'], ['erzaehler', 'Nach ' + r.sek + ' Sekunden. Nächstes Mal: kürzer anstellen. Oder mit Mila.']];
      }
      const z = [['baeckerin', 'Und für dich?'], { wahl: [
        { t: '„Ein Kirsch-Teilchen, bitte.“', staerke: 'mut6', merke: 'bestellt', dann: [['baeckerin', 'Eins fünfzig.'], ['erzaehler', 'Du zahlst. Sie sagt „Schönen Tag“. Das war’s.']] },
        { t: '(Aufs Teilchen zeigen.) „Das da.“', merke: 'bestellt', dann: [['baeckerin', 'Kirsch? Eins fünfzig.'], ['erzaehler', 'Zeigen zählt auch. Du hast eins.']] },
        { t: '„Ähm … nichts. Sorry.“', dann: [['baeckerin', 'Kein Problem. Der Nächste.']] },
      ] }, { tu: 'baeckerNachher', v: vorher, r }];
      S.merke.baeckerVorher = vorher;
      return z;
    },
    baeckerNachher: async () => {
      const n = await ui.skala({ frage: 'Und jetzt?' });
      logMut('baecker', 'Beim Bäcker bestellen', S.merke.baeckerVorher || 3, n, { geblieben: true, sek: 30 });
      if (!S.merke.bestellt) logLeiter('baecker', 'halb');
      return [['erzaehler', 'Vorher: ' + (S.merke.baeckerVorher || 3) + '. Jetzt: ' + n + '.']];
    },
    probeKantine: async () => {
      const pl = welt.orte.kantinePlatz; steuerung.setzen(pl.x - 0.1, pl.z, Math.PI / 2);
      const vorher = await ui.skala({ frage: 'Wie stark ist die Anspannung jetzt?' });
      const r = await mutprobe({ titel: 'Am Tisch sitzen bleiben', mitte: pl, r: 2.5, dauer: 40, start: vorher, hinweis: 'Sitzen bleiben. Reden musst du nicht.',
        saetze: [{ bei: 0.25, wer: 'ayla', text: 'Die Soße schmeckt nach Fuß.' }, { bei: 0.5, wer: 'yusuf', text: 'Samstag Skatepark, wer kommt?' }, { bei: 0.8, wer: 'noah', text: '(schiebt dir die Wasserflasche hin)' }] });
      const nachher = await ui.skala({ frage: r.geblieben ? 'Und jetzt, am Ende?' : 'Und jetzt, wo du weg bist?' });
      logMut('kantine', 'Kantine am Tisch', vorher, nachher, r);
      if (!r.geblieben) return [['erzaehler', 'Du stehst auf. Nach ' + r.sek + ' Sekunden.'], ['ayla', 'Schon fertig?'], ['erzaehler', 'Es klang nicht böse. Nur erstaunt.']];
      staerke('bleiben');
      return [['erzaehler', 'Vorher: ' + vorher + '. Am Ende: ' + nachher + '.'], ['yusuf', 'Und du? Samstag Skatepark?'],
        { wahl: [{ t: '„Vielleicht.“', dann: [['yusuf', 'Vielleicht ist kein Nein.']] }, { t: '„Ich kann nicht skaten.“', herz: { yusuf: 1 }, dann: [['yusuf', 'Ich auch nicht. Ich fall nur hin.']] }, { t: '(Schultern zucken.)', dann: [] }] }];
    },
    wocheZeigen: async () => {
      const e = (S.mutLog || []).filter((x) => x.kap === 6).map((x) => ({ titel: x.titel, vorher: x.vorher, nachher: x.nachher, notiz: x.notiz }));
      await ui.woche(e);
    },
    milaAbschied: () => ((S.herz.mila || 0) >= 2 ? GESPRAECHE.milaAbschied_ja : []),
    kapitelEnde: async () => {
      busFaehrt = -1;
      await new Promise((r) => setTimeout(r, 1200));
      const kap = SCHRITTE[S.schritt].kap, weiterIdx = SCHRITTE.findIndex((x) => x.kap === kap + 1), startIdx = SCHRITTE.findIndex((x) => x.kap === kap);
      S.kapitelFertig = Math.max(S.kapitelFertig || 0, kap);
      if (weiterIdx < 0) S.fertig = true;
      sichern();
      const wahl = await ui.ende({ ...bilanz(), kap, ueberschrift: ({ 1: 'Dein erster Tag', 2: 'Deine erste Woche', 3: 'Dein Schnuppertag', 4: 'Deine dritte Woche', 5: 'Deine vierte Woche', 6: 'Deine fünfte Woche', 7: 'Deine erste Arbeitswoche' })[kap] || KAPITEL[kap],
        weiter: weiterIdx >= 0 ? 'Weiter: Kapitel ' + (kap + 1) + ' „' + KAPITEL[kap + 1] + '“' : '' });
      if (wahl === 'weiter') danach = () => starteSchritt(weiterIdx, true);
      else if (wahl === 'neu') { S.fertig = false; danach = () => starteSchritt(startIdx, true); }
      else ui.auftrag({ kapitel: kapName(kap), ...FREI });
    },
    korbRunde: async () => {
      input.setEnabled(false);
      const t = await ui.freiwurf();
      S.merke.korb = t;
      const z = [];
      if (S.merke.joGekontert) z.push(['erzaehler', 'Jo passt dir den Ball kein einziges Mal.']);
      if (t >= 3) return z.concat([['jo', 'Gewonnen. Siehste.'], ['sommer', '(pfeift) Gut. Umziehen.']]);
      const wen = S.merke.linaTeam ? 'lina' : 'du';
      return z.concat([
        ['jo', wen === 'lina' ? 'Verloren. Gegen die Klavierspielerin. Super.' : 'Verloren. Wegen dir, {name}.'],
        { wahl: wen === 'lina' ? [
          { t: '„Du hast dreimal danebengeworfen.“', staerke: 'mut', herz: { lina: 1, jo: -1 }, dann: [['jo', 'Und?'], ['ben', '(grinst) Stimmt aber.']] },
          { t: '„War halt Pech.“', dann: [['erzaehler', 'Lina geht schnell in die Umkleide.']] },
          { t: '(Lina zunicken. Nichts sagen.)', herz: { lina: 1 }, dann: [['lina', '(nickt zurück)']] },
        ] : [
          { t: '„Und du? Drei daneben.“', herz: { jo: -1, ben: 1 }, dann: [['jo', 'Ich war gedeckt.'], ['ben', 'Klar, Jo.']] },
          { t: '(Schulterzucken.) „Nächstes Mal.“', staerke: 'ruhig', dann: [['jo', 'Wenn du dann noch im Team bist.']] },
          { t: '„Halt die Klappe, Jo.“', herz: { jo: -1 }, dann: [['jo', 'Uuh. Sensibel.']] },
        ] },
      ]);
    },
    lernkarte: () => { S.lernkarten = (S.lernkarten || []).concat(['½ + ¼ = ¾ (Pizza: zwei Viertel + ein Viertel)']); ui.toast('<b>Gelernt</b><span>½ + ¼ = ¾ – steht im Journal.</span>', 'ly-t-ent'); },
    chat: async () => { await ui.handy(CHAT); },
    milaGelacht: () => (S.merke.chatGelacht ? [
      ['mila', 'Dein Smiley war der dritte. Ich hab gezählt.'],
      { wahl: [
        { t: '„Sorry. War dumm.“', staerke: 'ehrlich', herz: { mila: 1 }, dann: [['mila', 'Ja. War es.'], ['mila', '… Setz dich halt.']] },
        { t: '„Alle haben gelacht. Nicht nur ich.“', herz: { mila: -1 }, dann: [['mila', 'Weiß ich. Darum ist es ja so schlimm.']] },
        { t: '(Umdrehen. Gehen.)', merke: 'milaWeg', dann: [] },
      ] }]
      : S.merke.chatMut ? [['mila', 'Jetzt machen sie sich über dich lustig. Wegen mir.']]
      : S.merke.chatStumm ? [['mila', 'Du warst online. Ich hab’s gesehen.']]
      : S.merke.chatPrivat ? [['mila', 'Hab deine Nachricht gesehen. Konnte nicht antworten.']] : []),
    setzen: () => { steuerung.setzen(-22.18, -24.42, -Math.PI / 2); },
    atem: async () => { input.setEnabled(false); await ui.atem(); staerke('atmen'); },
    testPizza: () => (S.merke.matheFoto ? [['erzaehler', 'Aufgabe 3: Brüche. Du erinnerst dich an das Foto. Nicht an den Weg.']]
      : S.merke.matheGefragt || S.merke.matheRichtig ? [['erzaehler', 'Aufgabe 3: Brüche. Halbe Pizza, Viertel Pizza. Drei Viertel.']]
      : [['erzaehler', 'Aufgabe 3: Brüche. Leer.']]),
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
      ['kenan', 'Moment. Dich kenn ich. Gang. Erster Tag. Gedrängelt.'],
      { wahl: [
        { t: '„Ja. War nicht cool.“', staerke: 'ehrlich', herz: { kenan: 2 }, dann: [['kenan', 'Hm. Okay. Vergessen.']] },
        { t: '„Ihr standet halt im Weg.“', herz: { kenan: -1 }, dann: [['kenan', 'Stimmt sogar. Trotzdem.']] },
        { t: '(Schulterzucken.)', dann: [['kenan', 'Wie du meinst.']] },
      ] }] : S.merke.gewartet ? [['kenan', 'Dich kenn ich vom Gang. Wir standen im Weg. Sorry.']] : [['kenan', 'Ah. Gang. Erster Tag. Hi.']]),
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
    kenanBus: () => (S.merke.kenanVerpfiffen ? [['erzaehler', 'Kenan steigt ein. Er setzt sich weit weg.']]
      : S.merke.schuldGenommen || S.merke.kenanGedeckt ? [['kenan', 'Das am Tor. Hättest du nicht machen müssen.'], ['kenan', 'Hast was gut bei mir.'],
        { wahl: [{ t: '„Schon okay.“', herz: { kenan: 1 }, dann: [] }, { t: '„Dann rauch nicht vor mir.“', staerke: 'klar', dann: [['kenan', '(grinst) Deal. Vielleicht.']] }] }]
      : [['kenan', 'Hoffmann wusste, dass wir da stehen. Vorher schon.'],
         ['kenan', 'Jemand hat’s ihm gesagt. Warst du das?'],
         { wahl: [
           { t: '„Nein.“', herz: { kenan: 0 }, dann: [['kenan', 'Hm. Okay. Mal sehen.']] },
           { t: '„Frag lieber Luca.“', herz: { kenan: 1, luca: -1 }, merke: 'lucaBeschuldigt', dann: [['kenan', 'Luca? … Hm.']] },
           { t: '„Ist mir egal, was du denkst.“', herz: { kenan: -1 }, dann: [['kenan', 'Merkt man.']] },
         ] }]),
    lernmoment: async () => {
      input.setEnabled(false);
      const r = await ui.quiz(waehle(paket, S.geloest || [], 3), { titel: paket.eigen ? paket.titel : 'Hausaufgaben-Club', pflicht: !!paket.pflicht });
      S.geloest = [...new Set((S.geloest || []).concat(r.geloest))]; S.lernzeit = (S.lernzeit || 0) + 1;
      if (r.geloest.length) staerke('dranbleiben');
      sichern();
    },
    abschreibFolge: () => (S.merke.abgeschrieben ? [
      ['hoffmann', '{name}, Noah. Bleibt kurz da.'],
      ['hoffmann', 'Gleiche Fehler. Gleiche Reihenfolge. Wer von wem?'],
      ['erzaehler', 'Noah schaut dich an.'],
      { wahl: [
        { t: '„Er hat bei mir. Ich hab’s erlaubt.“', staerke: 'ehrlich', herz: { hoffmann: 1, noah: -1 }, dann: [
          ['hoffmann', 'Beide nochmal. Bis Freitag.'], ['noah', '(draußen) Danke auch.'] ] },
        { t: '„Wir haben zusammen gelernt.“', staerke: 'loyal', herz: { noah: 2 }, merke: 'gedeckt', dann: [
          ['hoffmann', 'Zusammen gelernt. Mit denselben Fehlern.'],
          ['hoffmann', 'Dann erklärt mir Noah Aufgabe 3. Jetzt.'],
          ['erzaehler', 'Noah kann es nicht. Hoffmann sagt nichts mehr. Er schreibt was auf.'] ] },
        { t: '(Schweigen.)', dann: [
          ['hoffmann', 'Okay. Dann beide null Punkte.'],
          ['noah', 'Warte. {name} kann nix dafür. Ich war’s.'],
          ['hoffmann', '… Gut. Noah, du machst sie nochmal.'] ] },
      ] }] : []),
    schwaenzFolge: () => (S.merke.geschwaenzt ? [
      ['erzaehler', 'Nach der Stunde. Frau Sommer hält ihre Liste hoch.'],
      ['sommer', 'Unentschuldigt. Steht schon drin.'],
      ...(S.merke.bank ? [['sommer', 'Vor zwei Wochen schlecht. Heute weg. Interessant.']] : []),
      ['sommer', 'Wo warst du? Und mit wem?'],
      { wahl: [
        { t: '„Beim Bäcker. Mit Dario und Luca.“', staerke: 'ehrlich', herz: { sommer: 1, dario: -2, luca: -2 }, merke: 'darioVerpfiffen', dann: [
          ['sommer', 'Danke. Die zwei hol ich mir.'], ['sommer', 'Zettel von zuhause bis Freitag. Unterschrieben.'] ] },
        { t: '„Beim Bäcker. Allein.“', staerke: 'loyal', herz: { dario: 1 }, dann: [
          ['sommer', 'Allein. Mit drei Croissants. Klar.'], ['sommer', 'Zettel von zuhause bis Freitag.'] ] },
        { t: '„Mir war schlecht.“', merke: 'zettelLuege', dann: [
          ['sommer', 'Dann bring morgen einen Zettel. Von zuhause.'] ] },
      ] }]
      : S.merke.deckt ? [
      ['sommer', 'Hast du Dario und Luca gesehen?'],
      { wahl: [
        { t: '„Nö.“', staerke: 'loyal', herz: { dario: 1 }, merke: 'gelogenFuerDario', dann: [['sommer', 'Hm.']] },
        { t: '„Die sind beim Bäcker.“', staerke: 'ehrlich', herz: { sommer: 1, dario: -2 }, merke: 'darioVerpfiffen', dann: [['sommer', 'Danke.']] },
      ] }] : []),
    sommerFrage: () => [],
    schlichten: async () => {
      input.setEnabled(false);
      await ui.reihenfolge(SCHLICHTEN);
      staerke('schlichten');
      return [['ben', 'Okay … wir wollten beide spielen.'], ['jo', 'Dann halbe Pause ihr, halbe Pause wir?'], ['ben', 'Deal.'],
        ...(S.merke.sommerGeholt ? [['sommer', 'Gut gemacht, ihr drei.']] : [['lina', '(leise) Das war cool, {name}.']])];
    },
    noahWoche: () => (S.merke.erklaert ? [['noah', 'Danke fürs Erklären. Hoffmann hat mich drangenommen. Ich konnte es!']] : S.merke.abgeschrieben ? [['noah', 'Sorry wegen der Hausaufgabe. Das hat dir Ärger gemacht.']] : [['noah', 'Schönes Wochenende, {name}.']]),
    matheErklaeren: () => (S.merke.matheGefragt ? [
      ['chiara', 'Halbe Pizza plus Viertel Pizza. Wie viel?'],
      { wahl: [
        { t: '3/4', merke: 'matheRichtig', dann: [['chiara', 'Ja. Siehst du. Jetzt lass mich.']] },
        { t: '2/6', dann: [['chiara', 'Nein. Die Stücke müssen gleich groß sein.'], ['chiara', 'Halbe sind zwei Viertel. Plus eins. Drei Viertel.'], ['chiara', 'Wenn’s nicht klickt: Laurent. Donnerstags.']] },
        { t: '„Jetzt hab ich Hunger.“', staerke: 'humor', dann: [['chiara', '(muss lachen) Konzentrier dich. Drei Viertel.']] },
      ] },
      { tu: 'lernkarte' },
    ] : []),

    kayaBeweis: () => (S.merke.chatBeweis ? [
      { wahl: [
        { t: '(Den Screenshot zeigen.)', merke: 'beweisGezeigt', dann: [['kaya', '(schaut lange) Okay. Schick mir das. An die Schuladresse.']] },
        { t: '(Handy in der Tasche lassen.)', dann: [] },
      ] }] : []),

    milaFehlt: () => (S.merke.keinKaya || S.merke.abgewiegelt || S.merke.milaWeg
      ? [['erzaehler', 'Mila sitzt da. Kapuze auf. Sie schaut niemanden an.']] : []),
    milaRest: () => (S.merke.milaWeg ? [['erzaehler', 'Du gehst. Hinter dir: nichts.']] : GESPRAECHE.milaChatRest),
    entfernt: () => [['erzaehler', 'Dein Handy: „' + (S.merke.chatGelacht ? 'Ben' : 'Jo') + ' hat dich entfernt.“']],

    skateLuca: () => (S.merke.lucaAngelegt || S.merke.lucaGepetzt ? [['luca', 'Ah. Die Kantinen-Polizei.']]
      : S.merke.lucaWitz ? [['luca', 'Ah. Die Nudel-Nummer. Hi.']]
      : S.merke.geraucht ? [['luca', 'Du rauchst mit Kenan am Tor, hab ich gehört.']] : []),

    screenshotDu: () => {
      const m = S.merke;
      const bild = m.gefahren && !m.clipWeg ? 'Dein Sturz an der Box. In Zeitlupe. 112 Aufrufe.'
        : m.fundkiste ? 'Du in den pinken Fundkiste-Schuhen. Mit Clown-Sticker.'
        : m.joPrivat ? 'Deine Nachricht an Jo: „lösch das“. Darunter: „Polizei 🚨“.'
        : 'Ein Foto von dir beim Gähnen. Mit Schlaf-Sticker.';
      return [['erzaehler', bild], ['noah', 'Sorry. Ich hab nicht gelacht. Glaub ich.'],
        { wahl: [
          { t: '„Leite mir das weiter. Für Kaya.“', staerke: 'hilfe', merke: 'beweisDu', dann: [['noah', 'Dann weiß Jo, dass ich’s war …'], ['noah', '… Okay. Mach ich. Später.']] },
          { t: '„Ist doch lustig.“ (Ist es nicht.)', staerke: 'ruhig', dann: [['noah', '(erleichtert) Ja, oder?']] },
          { t: '„Ich mach was über Jo.“', merke: 'racheJo', dann: [['noah', 'Lass das. Bitte. Dann geht’s nie zu Ende.']] },
        ] }];
    },

    noahZahlt: () => [
      ['noah', S.merke.abgeschrieben ? 'Ich zahl. Wegen der Hausaufgabe.' : 'Ich lad dich ein. Echt.'],
      { wahl: [
        { t: '„Danke. Nächstes Mal ich.“', herz: { noah: 1 }, merke: 'noahGezahlt', dann: [['erzaehler', 'Noah zahlt. Du merkst dir den Betrag.']] },
        { t: '„Nee, lass. Ich will nix schulden.“', dann: [['noah', 'Ist doch nicht schulden …'], ['erzaehler', 'Du bleibst am Brunnen. Allein.']] },
      ] }],
    benLeihen: () => [{ wahl: [
      ...(S.merke.kantinengeldWeg ? [] : [{ t: '„Hier. Vier Euro.“ (Das Kantinengeld.)', herz: { ben: 1 }, merke: 'kantinengeldWeg', dann: [['ben', 'Du rettest mich. Morgen. Versprochen.']] }]),
      { t: '„Hab nix. Wirklich.“', staerke: 'neinsagen', dann: [['ben', 'Okay, okay.'], ['erzaehler', 'Er fragt Yusuf. Yusuf gibt.']] },
      { t: '„Du gibst Yusuf auch nie was zurück.“', staerke: 'klar', herz: { ben: -1 }, merke: 'benSchulden', dann: [['ben', 'Wie kleinlich bist du denn?'], ['yusuf', '(grinst) Stimmt aber.']] },
      ...(S.merke.lucaAngelegt ? [{ t: '(Luca kommt dazu.)', dann: [['luca', 'Die Kantinen-Polizei hat Geld? Ich nehm auch zwei.'], ['erzaehler', 'Jetzt wollen zwei was von dir.']] }] : []),
    ] }],

    benSchuldet: () => (S.merke.kantinengeldWeg ? [['erzaehler', 'Ben schuldet dir vier Euro. Seit Dienstag.']] : []),

    zuhauseFolge: () => (S.merke.angeblafft && !S.merke.hoffmannReden ? [
      ['erzaehler', 'Nach der Stunde. Alle sind raus.'],
      ['hoffmann', 'Der Ton gerade. Was war los?'],
      { wahl: [
        { t: '„Müde.“', dann: [['hoffmann', 'Okay. Hausaufgabe bis Freitag.']] },
        { t: '„Nichts.“', dann: [['hoffmann', 'Okay. Nichts.']] },
        { t: '(Schweigen.)', dann: [['hoffmann', 'Okay. Geh ruhig.']] },
      ] }] : S.merke.hoffmannReden ? [
      ['erzaehler', 'Nach der Stunde. Alle sind raus.'],
      ['hoffmann', 'Ich frag nicht nach Details. Musst du nicht erzählen.'],
      ['hoffmann', 'Hausaufgabe bis Freitag. Und wenn’s öfter so ist: Kaya.'],
      { wahl: [
        { t: '„Okay.“', dann: [] },
        { t: '„Kaya erzählt eh alles weiter.“', dann: [['hoffmann', 'Manches muss er. Er sagt dir vorher, was.']] },
        { t: '(Gehen, ohne was zu sagen.)', dann: [['hoffmann', '(ruft nach) Freitag, {name}!']] },
      ] }] : []),

    unfairDanach: () => {
      const m = S.merke, z = [['erzaehler', 'Nach zehn Minuten geht die Tür auf.']];
      if ((S.herz.ayla || 0) >= 3) z.push(['hoffmann', 'Ayla sagt, du warst es nicht.'], ['hoffmann', 'Ich hab mich vertan. Sorry.']);
      else z.push(['hoffmann', 'Komm rein. Und ab jetzt: ruhig.']);
      if (m.laut || m.sarkasmus) z.push(['hoffmann', 'Der Ton steht trotzdem im Klassenbuch.']);
      if (m.schuldGeschluckt) z.push(['erzaehler', 'In der Pause. Jo steht neben dir.'], ['jo', 'Danke. Ehrlich. Hast was gut.']);
      if (m.nachDerStunde) z.push(['erzaehler', 'Nach der Stunde.'], ['hoffmann', 'Du wolltest was sagen. Zwei Minuten.'], { wahl: [
        { t: '„Das war Jo.“', dann: [['hoffmann', 'Ich red mit ihm. Und: War unfair. Sorry.']] },
        { t: '„Sie haben nur mich gesehen.“', dann: [['hoffmann', '… Kann sein. Ich schau nächstes Mal genauer.']] },
        { t: '„Schon gut.“', dann: [['hoffmann', 'Okay.']] },
      ] });
      if (m.joVerpetzt || m.racheJo) z.push(['jo', '(leise) Das kriegst du zurück.']);
      return z;
    },
    // Wer was mit Bens Portemonnaie gemacht hat, merkt man am Freitag
    portiFolge: () => {
      const m = S.merke;
      if (m.vierGenommen) return [['ben', 'Komisch. Da waren zwanzig drin. Jetzt sechzehn.'],
        { wahl: [
          { t: '„Du schuldest mir vier. Jetzt quitt.“', wenn: (mm) => mm.kantinengeldWeg, staerke: 'ehrlich', herz: { ben: -1 }, dann: [['ben', 'Hättest fragen können.'], ['ben', '… Okay. Quitt.']] },
          { t: '„Hab vier genommen. Finderlohn.“', wenn: (mm) => !mm.kantinengeldWeg, herz: { ben: -2 }, dann: [['ben', 'Finderlohn? Aus meinem Portemonnaie?'], ['erzaehler', 'Er redet den Rest des Tages nicht mit dir.']] },
          { t: '„Keine Ahnung.“', merke: 'benMisstrauen', dann: [['ben', 'Hm.'], ['erzaehler', 'Er schaut dich einen Moment zu lang an.']] },
        ] }];
      if (m.zwanzigGenommen) return [['hoffmann', 'Bens Portemonnaie lag im Müll. Das Geld ist weg.'], ['hoffmann', 'Wer war nach Sport im WC?'], ['noah', '(leise) Ich hab {name} reingehen sehen …'],
        { wahl: [
          { t: '„Ich war’s. Ich geb’s zurück.“', staerke: 'ehrlich', herz: { ben: -2, hoffmann: 1 }, merke: 'diebstahlZugegeben', dann: [['hoffmann', 'Gut, dass du es sagst. Das geht trotzdem nach Hause.'], ['ben', '(sagt nichts mehr)']] },
          { t: '„Da waren viele drin.“', merke: 'diebstahlGelogen', dann: [['hoffmann', 'Hm. Ich frag weiter.'], ['erzaehler', 'Noah redet in der Pause nicht mit dir.']] },
          { t: '„Danke auch, Noah.“', herz: { noah: -2 }, dann: [['noah', 'Ich hab nur gesagt, was ich gesehen hab.']] },
        ] }];
      if (m.portiLiegen) return [['ben', 'Mein Portemonnaie ist weg. Mit allem.'], ['ben', 'Du warst doch im WC, oder?'],
        { wahl: [
          { t: '„Ja. Es lag da. Ich hab’s liegen lassen.“', staerke: 'ehrlich', dann: [['ben', 'Und dann? Einfach liegen lassen?'], ['ben', '… Okay. Nicht deine Schuld. Trotzdem.']] },
          { t: '„Nö.“', dann: [['ben', 'Okay.']] },
        ] }];
      if (m.portiWeber) return [['ben', 'Weber sagt, jemand hat mein Portemonnaie abgegeben. Warst du das?'],
        { wahl: [{ t: '„Ja.“', herz: { ben: 1 }, dann: [['ben', 'Danke. Echt.']] }, { t: '„Nö. Glück gehabt.“', dann: [['ben', 'Ja, voll.']] }] }];
      if (m.portiZurueck && m.kantinengeldWeg) return [['ben', 'Hier. Die vier Euro. Diesmal echt.']];
      return [];
    },
    // Kapitel 5: Hoffmann erinnert sich an den Klassenrat
    hoffmannGemerkt: () => (S.merke.hoffmannGestoppt ? [['hoffmann', '(im Vorbeigehen) Das mit Mila neulich. Hab’s mir gemerkt. Danke.']] : []),
    // Kapitel 5, Freitag am Bus: was von der Woche bleibt
    k5Folgen: () => {
      const m = S.merke, z = [];
      if (m.milaVerleugnet) z.push(['erzaehler', 'Mila setzt sich in die letzte Reihe. Weit weg.'], ['erzaehler', 'Abends eine Nachricht: „niemals, ja? gut zu wissen“']);
      else if (m.geruechtStehen) z.push(['mila', 'Jetzt denken alle, wir … egal.'], ['mila', 'Danke. Glaub ich.']);
      if (!m.ideeBehalten && (m.milaVerleugnet || m.geruechtStehen || m.lucaEifersucht)) z.push(['lina', '(leise, im Vorbeigehen) Das mit Mila hat Ben rumgeschickt. Nicht Luca.']);
      if (m.haVergessen) z.push(['noah', 'Hast du den Zettel unterschrieben? Für Hoffmann?'], ['noah', 'Ich kann Unterschriften. Gut sogar.'],
        { wahl: [
          { t: '„Mach.“', merke: 'gefaelscht', dann: [['erzaehler', 'Zwei Sekunden. Sieht echt aus.'], ['noah', 'Montag abgeben. Nicht vorher zeigen.']] },
          { t: '„Ich zeig’s zuhause. Wenn’s ruhig ist.“', staerke: 'ehrlich', dann: [['noah', 'Okay. Viel Glück.']] },
          { t: '„Ich sag, ich hab ihn verloren.“', merke: 'zettelVerloren', dann: [['noah', 'Das klappt genau einmal.']] },
        ] });
      if (m.schuldGeschluckt && !m.chatMut) z.push(['jo', '(schreibt) „bist wieder drin“'], ['erzaehler', 'Gruppe: „7P2 ohne Lehrer“. 19 Leute.']);
      if (m.joVerpetzt || m.racheJo) z.push(['erzaehler', 'Jo geht an dir vorbei. Rempelt. Wie aus Versehen.']);
      if (!z.length) z.push(['noah', 'Was für eine Woche.']);
      return z;
    },
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
        { t: '„Ich muss das machen. Sorry. Haustier?“', staerke: 'humor', dann: [[id, '(grinst) Alle müssen. Okay.']] },
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
  let startet = false;   // solange ein Schritt startet (Tagesrückblick, Teleport), lösen Orte nichts aus
  async function starteSchritt(i, mitStart) {
    startet = true;
    try { await starteSchrittJetzt(i, mitStart); } finally { startet = false; }
  }
  async function starteSchrittJetzt(i, mitStart) {
    const vorher = SCHRITTE[S.schritt];
    S.schritt = i; S.fertig = false; sichern();
    const st = SCHRITTE[i];
    if (mitStart !== false && vorher && (vorher.tag !== st.tag || vorher.kap !== st.kap) && i > 0) {
      const eintraege = Object.entries(tagHerz).filter(([id, n]) => n && LEUTE[id]).map(([id, n]) => ({ name: LEUTE[id].name, farbe: LEUTE[id].farbe, n })).sort((a, b) => b.n - a.n);
      tagHerz = {};
      await ui.rueckblick(st.tag, st.kap !== vorher.kap ? kapName(st.kap) : 'Ein neuer Tag am Lycée des Collines.', eintraege);
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
    let i = S.schritt + 1;
    while (i < SCHRITTE.length && SCHRITTE[i].wenn && !SCHRITTE[i].wenn(S.merke)) i++;   // Szenen, die es nur nach bestimmten Entscheidungen gibt
    if (i < SCHRITTE.length) await starteSchritt(i, true);
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
    // Lernstation: Mme Laurent außerhalb der Geschichte
    if (id === 'laurent') {
      await gespraech([['laurent', 'Hallo {name}! Lust auf ein paar Aufgaben?'], { wahl: [{ t: 'Ja, gern.', dann: [{ tu: 'lernmoment' }, ['laurent', 'Schön. Komm wieder, wann du willst.']] }, { t: 'Heute nicht.', dann: [['laurent', 'Kein Problem. Ich bin da.']] }] }]);
      return;
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

  // ---------- Mutprobe (gestufte Exposition) ----------
  // Während einer Mutprobe läuft das Gespräch weiter (imGespraech bleibt an, niemand anderes spricht dich an), aber man
  // kann sich bewegen. Weggehen beendet sie – das ist erlaubt. Die Anspannung steigt erst etwas und fällt dann ab.
  let probe = null, mutTempo = 1;
  function mutprobe(def) {
    return new Promise((ok) => {
      ui.dialogZu(); input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null;
      probe = { ...def, t: 0, t0: performance.now(), verlauf: [], ok, gesagt: 0, uiT: 0 };
    });
  }
  function probeSchritt(dt, p) {
    const pr = probe; pr.t = (performance.now() - pr.t0) / 1000 * mutTempo;   // Echtzeit: auf langsamen Geräten nicht länger
    const f = Math.min(1, pr.t / pr.dauer), hoch = pr.start * 2, tief = Math.max(1, hoch * 0.45);
    const wert = Math.max(0, Math.min(10, f < 0.2 ? hoch + 1.2 * Math.sin(f / 0.2 * Math.PI / 2) : tief + (hoch + 1.2 - tief) * Math.exp(-(f - 0.2) * 4.2)));
    const s = pr.saetze && pr.saetze[pr.gesagt];
    if (s && f >= s.bei) { pr.gesagt++; ui.toast('<b>' + (LEUTE[s.wer] ? LEUTE[s.wer].name : '') + '</b><span>' + s.text + '</span>'); }
    pr.uiT -= dt;
    if (pr.uiT <= 0) { pr.uiT = 0.2; pr.verlauf.push(wert); ui.mut({ titel: pr.titel, wert, verlauf: pr.verlauf, hinweis: pr.hinweis, rest: Math.ceil((pr.dauer - pr.t) / mutTempo) }); }
    const weg = Math.hypot(pr.mitte.x - p.x, pr.mitte.z - p.z) > pr.r;
    if (weg || f >= 1) {
      probe = null; ui.mut(null); input.setEnabled(false); steuerung.frei = false;
      pr.ok({ geblieben: !weg, sek: Math.round(pr.t), wert: Math.round(wert) });
    }
  }
  function logMut(id, titel, vorher, nachher, r, notiz) {
    S.mutLog = (S.mutLog || []).filter((x) => !(x.id === id && x.kap === 6));
    S.mutLog.push({ id, kap: 6, titel, vorher, nachher, geblieben: !!r.geblieben, notiz: notiz || (r.geblieben ? 'geblieben' : 'nach ' + r.sek + ' s gegangen – zählt trotzdem') });
    if (LEITER.some((l) => l.id === id)) logLeiter(id, r.geblieben ? 'ok' : 'halb');
    sichern();
  }
  function logLeiter(id, status) {
    S.leiterStatus = S.leiterStatus || {};
    if (S.leiterStatus[id] !== 'ok') S.leiterStatus[id] = status;
    sichern();
  }
  function leiterJournal() {
    if (!S.leiter) return null;
    return { stufen: S.leiter.map((id) => { const l = LEITER.find((x) => x.id === id) || { t: id }; const st = (S.leiterStatus || {})[id]; return { t: l.t, status: st || '', notiz: st === 'ok' ? 'geschafft' : st === 'halb' ? 'probiert' : '' }; }) };
  }
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
    ui.journal({ name: S.name, stundenplan: S.stundenplan, leute: b.leute, staerken: b.staerken, geheimnisse: GEHEIMNISSE.filter((g) => S.entdeckt.includes(g.id)), gesamt: GEHEIMNISSE.length, lernkarten: S.lernkarten || [], leiter: leiterJournal() });
  };
  ui.onRaus = () => { if (!S || (imGespraech && !probe)) return; ui.kurzRaus(); };

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
      // Wer dich mag, winkt kurz, wenn du zum ersten Mal in diesem Abschnitt näherkommst
      if (laeuft && !imGespraech && d < 6 && d > 2.5 && !x.gegruesst && x.haltung !== 'sitzt' && (S && (S.herz[x.id] || 0) >= 3)) {
        x.gegruesst = true; x.f.spiele('Wave', { einmal: true }); setTimeout(() => { if (x.f.aktion === 'Wave') x.f.spiele(x.haltung === 'redet' ? 'Interact' : 'Idle', { tempo: x.haltung === 'redet' ? 0.35 : 1 }); }, 2200);
      }
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
    if (probe) probeSchritt(dt, p);
    if (!imGespraech && !startet && st && !S.fertig && st.fertig.ort) {
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
    get probe() { return probe; }, set mutTempo(v) { mutTempo = v; },
  };

  onProgress(1, '');
  if (test && params.get('start')) { await los(true, +(params.get('figur') || 0), 'Sam'); return window.LYCEE; }
  const lehrer = () => ui.lehrer({ paket, bereinige,
    speichern: (b) => { speicherePaket(b); paket = b; },
    zuruecksetzen: () => { speicherePaket(null); paket = GRUNDPAKET; } });
  const w = await ui.titel({ gespeichert: !!(S && S.name), figuren: FIGUREN, lehrer });
  if (w.weiter) await los(false); else await los(true, w.figur, w.name);
  return window.LYCEE;
}
