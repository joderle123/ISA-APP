// Lycée-Simulator – Kern: baut Bild (Renderer mit Kontur/Bloom, gemalter Himmel, Toon-Material), Welt, Möbel, Menschen und
// lässt die Geschichte laufen (geschichte.js). Gespeichert wird nur im Browser („lycee.stand“), nichts geht ins Netz.
// Für Tests: window.LYCEE (zustand, schritt(i), teleport(ort), rede(id), gespraechLaeuft).
import { ABZEICHEN, neuePassAbzeichen } from './pass.js';
import { createTiere } from './tiere.js';
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
import { fussSchatten } from './texturen.js';
import { createInteraktionen } from './interaktion.js';
import { FAEDEN } from './faeden.js';
import { PLAUDERN, BANK } from './stimmen.js';
import { DEUTSCH, deutschBlatt } from './deutsch.js';
import { LEKTIONEN } from './lektionen.js';
import { CHARAKTER, GLEICHALTRIGE, GRUSS, GRUENDE, nachricht, profil, stufe } from './freunde.js';
import { BLAETTER } from './blaetter.js';
import { MATHE, matheBlatt } from './mathe.js';
import { createSteuerung } from './steuerung.js';
import { createUI } from './ui.js';
import { situationen } from './situation.js';
import { FACHLEHRER } from './story/personal.js';
import { tunN2 } from './story/kapitel2.js';
import { tunN1 } from './story/kapitel1.js';
import { tunN3, ORTE_N3 } from './story/kapitel3.js';
import { tunN4 } from './story/kapitel4.js';
import { tunN5 } from './story/kapitel5.js';
import { tunN6 } from './story/kapitel6.js';
import { tunN7 } from './story/kapitel7.js';
import { tunN8 } from './story/kapitel8.js';
import { tunN9 } from './story/kapitel9.js';
import { tunN10 } from './story/kapitel10.js';
import { createKorbSpiel } from './korb3d.js';
import { baerAnhaenger } from './anhaenger.js';
import { SCHRITTE, GESPRAECHE, LEUTE, STAERKEN, BINGO, GEHEIMNISSE, SPRECHER, KAPITEL } from './geschichte.js';
import { ORTE2, CHAT, CHAT5, ichBotschaftThema } from './kapitel2.js';
import { ORTE3, saegeFolgen } from './kapitel3.js';
import { ORTE4, IMMER, SCHLICHTEN } from './kapitel4.js';
import { ORTE6, LEITER } from './kapitel6.js';
import { DURCHSAGEN } from './welttexte.js';
import { JETON, ANGEBOTE, alleDinge } from './belohnungen.js';
import { ladePaket, speicherePaket, bereinige, waehle, GRUNDPAKET } from './lernen.js';

// Drei Spielstände: Platz 1 = „lycee.stand“ (wie immer), Platz 2/3 = „lycee.stand.2/.3“. Welcher gerade spielt: „lycee.platz“.
let platz = 1;
try { platz = Math.min(3, Math.max(1, +localStorage.getItem('lycee.platz') || 1)); } catch (e) { /* privat */ }
const speicherName = (p = platz) => (p === 1 ? 'lycee.stand' : 'lycee.stand.' + p);
const lies = (p = platz) => { try { return JSON.parse(localStorage.getItem(speicherName(p)) || 'null'); } catch (e) { return null; } };
const schreib = (v) => { try { if (v) { v.zeit = Date.now(); localStorage.setItem(speicherName(), JSON.stringify(v)); } else localStorage.removeItem(speicherName()); } catch (e) { /* privat/voll */ } };
const kapName = (k) => 'Kapitel ' + k + ' · ' + KAPITEL[k];
const FREI = { titel: 'Freies Herumlaufen', ziel: 'Schau dich in der Schule um. Das nächste Kapitel kommt bald.' };

// Spielfiguren zur Wahl
const FIGUREN = [
  { titel: 'Figur 1', modell: 'menschen', stil: 'Casual', haut: '#e0b48c', haar: '#3a2a1c', oben: '#2f4f45', unten: '#3a3f4b', schuhe: '#f2f2f2' },
  { titel: 'Figur 2', modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff' },
  { titel: 'Figur 3', modell: 'menschen', stil: 'Casual2', haut: '#8d5a3b', haar: '#1b1410', oben: '#e9c46a', unten: '#2d3748', schuhe: '#2b2b2b' },
  { titel: 'Figur 4', modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#8a5a3a', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#6b4e3a' },
];

// Kleine Sätze, wenn man jemanden außerhalb der Geschichte anspricht: stimmen.js (PLAUDERN)

export async function startLycee({ canvas, root, onProgress = () => {} }) {
  const params = new URLSearchParams(location.search);
  const test = params.has('test');
  const schritt = async (p, t) => { onProgress(p, t); await new Promise((r) => requestAnimationFrame(() => r())); };
  const events = createEvents();
  const rr = createRenderer({ canvas, quality: detectQuality(), events, look: 'comic' });
  const q = rr.quality;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.12, 700);
  rr.onResize((s) => { camera.aspect = s.aspect || (s.w / s.h); camera.fov = s.portrait ? 64 : 52; camera.updateProjectionMatrix(); });
  const input = createInput({ root, events });
  const audio = createAudio();
  const speech = createSpeech({ events, audio });
  // Schulgeräusche (synthetisch, leise): Stimmengewirr auf dem Hof, Geschirr in der Kantine. Wind und Vögel: engine/audio.js
  audio.register('stimmen', (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers;
    for (let i = 0; i < 3; i++) h.burst(t + Math.random() * 0.7, 0.25 + Math.random() * 0.4, 'bandpass', 320 + Math.random() * 800, 6 + Math.random() * 5, 0.005 + Math.random() * 0.007, bus);
  });
  audio.register('geschirr', (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers, n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) h.tone('triangle', 2600 + Math.random() * 1800, t + i * (0.07 + Math.random() * 0.08), 0.002, 0.008, 0.16, bus);
    h.burst(t, 0.05, 'highpass', 5200, 1, 0.004, bus);
  });

  await schritt(0.1, 'Die Annexe wird gebaut …');
  const veil = createVeil({ events, audio, zones: [] });
  veil.setBaseOverride(0); veil.uniforms.uVeilStrength.value = 0;
  const material = lambertVC(veil, 'lycee', { ramp: 'props' });
  const materialInnen = lambertVC(veil, 'lycee-innen', { ramp: 'props' });
  const welt = baueWelt({ material, materialInnen });
  Object.assign(welt.orte, ORTE2, ORTE3, ORTE4, ORTE6, ORTE_N3);
  let paket = ladePaket();   // Aufgaben der Lehrperson (Phase 2) oder Grundaufgaben
  scene.add(welt.gruppe);
  const sky = createSky({ scene, renderer: rr.renderer, audio, quality: { ...q, shadowSize: Math.min(q.shadowSize || 0, 2048), shadowSpan: 28 }, events });
  sky.time.paused = true;
  sky.setStorm(0);   // der Himmel der Insel hat ein Gewitter am Rand – im Lycée nicht
  scene.fog.near = 90; scene.fog.far = 420;
  // Innenräume: weiches Raumlicht, sobald man drin ist (das Dach wirft sonst alles in Schatten)
  const raumLicht = new THREE.HemisphereLight(0xfff6e6, 0xe8dcc6, 0); scene.add(raumLicht);
  // Aufhelllicht von Norden: Schattenseiten der Gebäude (Hofseite) werden nicht fast schwarz
  const fuellLicht = new THREE.DirectionalLight(0xfff1dc, 0.9); fuellLicht.position.set(-30, 40, -90); scene.add(fuellLicht);

  await schritt(0.35, 'Tische und Stühle …');
  const req = await baueRequisiten({ welt, material, scene });
  const bus = req.eigene.bus;

  await schritt(0.6, 'Die Klasse kommt …');
  const ui = createUI({ root, input, speech });
  situationen(ui, { name: () => 'Du', ersetze: (t) => ersetze(t) });
  // Ton und Vorlesen für alle Situations-Spiele an einer Stelle: Klick auf Karten, Sprechblasen, Stempel, neue Karten
  (() => {
    let zuletzt = 0;
    const ton = (n) => { const t = performance.now(); if (t - zuletzt < 90) return; zuletzt = t; audio.play(n); };
    root.addEventListener('click', (e) => { const b = e.target.closest('.sz button'); if (b) ton(b.classList.contains('sz-weiter') ? 'pickup' : 'click'); }, true);
    const lies = (el) => { if (!ui.autoVorlesen || !speech || !speech.available) return; const k = el.cloneNode(true); k.querySelectorAll('b, small').forEach((x) => x.remove()); const t = k.textContent.trim(); if (t) speech.speak(t, { interrupt: false }); };
    new MutationObserver((ms) => {
      for (const m of ms) for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.querySelector && n.querySelector('.sz-stempel')) { ton('unlock'); continue; }
        const blasen = n.classList.contains('sz-blase') ? [n] : n.querySelectorAll ? [...n.querySelectorAll('.sz-blase')] : [];
        if (blasen.length) { ton('bubble'); blasen.forEach(lies); continue; }
        if (n.classList.contains('sz-fall') || (n.querySelector && n.querySelector('.sz-fall p'))) lies(n.classList.contains('sz-fall') ? n : n.querySelector('.sz-fall p'));
      }
    }).observe(root, { childList: true, subtree: true });
  })();
  const steuerung = createSteuerung({ camera, input, welt });
  const tiere = createTiere({ scene, steuerung });
  rr.attachPost({ scene, camera, veil });

  // ---------- Zustand ----------
  let S = lies();
  // Neue Geschichte (v2): alte Spielstände starten beim neuen Kapitel 1 – Freundschaften, Jetons, Dinge, Aussehen bleiben
  const neuStart = (x) => {
    // Spielstand merkt sich den Schritt auch beim Namen: kommen Schritte dazu oder fallen weg, stimmt die Nummer trotzdem
    if (x && x.schrittId) { const j = SCHRITTE.findIndex((s) => s.id === x.schrittId); if (j >= 0) x.schritt = j; }
    if (x && (x.v || 1) < 2) { Object.assign(x, { v: 2, schritt: 0, fertig: false, kapitelFertig: 0, bingo: {}, gefragt: [], szenen: {} }); } return x; };
  neuStart(S);
  const neuerStand = (name, figur) => ({ v: 2, name, figur, schritt: 0, herz: {}, staerken: {}, merke: {}, entdeckt: [], stundenplan: false, bingo: {}, gefragt: [], fertig: false });
  // Schul-Pass: neue Abzeichen beim Speichern prüfen (Toast + Ton, nie mehr als drei auf einmal anzeigen)
  const passPruefen = () => { const neu = neuePassAbzeichen(S); neu.slice(0, 3).forEach((x, n) => setTimeout(() => { ui.toast('<b>🏅 ' + x.sy + ' ' + x.t + '</b><span>Neues Abzeichen im Schul-Pass.</span>', 'ly-t-ent'); audio.play('unlock'); }, n * 900)); };
  const sichern = () => { if (S && S.merke) passPruefen(); schreib(S); };

  // ---------- Menschen ----------
  const leute = {};   // id → { def, f, pos, yaw, haltung, schild, ziel }
  // Erkennungszeichen: jede Figur trägt etwas, das zu ihr passt (Charakter auf einen Blick)
  function zubehoer(f, id) {
    const knochen = (...namen) => { namen = namen.map((n) => n.replace(/\./g, '')); let k = null; f.group.traverse((o) => { if (!k && o.isBone && namen.includes(o.name.replace(/\./g, ''))) k = o; }); return k; };
    const an = (k, mesh, x, y, z) => { if (!k) return; k.updateMatrixWorld(true); const sk = new THREE.Vector3(); k.getWorldScale(sk); mesh.scale.multiplyScalar(1 / (sk.x || 1)); mesh.position.set(x / (sk.x || 1), y / (sk.x || 1), z / (sk.x || 1)); k.add(mesh); };
    const lam = (c) => new THREE.MeshLambertMaterial({ color: c });
    const links = knochen('Wrist.L', 'Hand.L'), rechts = knochen('Wrist.R', 'Hand.R'), hals = knochen('Neck', 'Head');
    if (id === 'mila') { const w = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.055), ['#e85d75', '#ffd166', '#3fa66b', '#4f88c8', '#ffffff', '#f28c38'].map(lam)); w.rotation.set(0.4, 0.6, 0); an(links, w, -0.03, 0.08, 0.03); }
    if (id === 'lina') { const b = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.018, 0.26), [lam('#2b2b33'), lam('#2b2b33'), lam('#f4f1ea'), lam('#f4f1ea'), lam('#9b7bc8'), lam('#9b7bc8')]); b.rotation.z = Math.PI / 2; an(links, b, -0.02, 0.1, 0.06); }
    if (id === 'chiara') { const b = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.03, 0.23), lam('#2f6db0')); b.rotation.z = Math.PI / 2; an(links, b, -0.02, 0.1, 0.05); }
    if (id === 'ben') { const ball = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), lam('#e07b39')); an(rechts, ball, 0.04, 0.14, 0.06); }
    if (id === 'dario') { const h = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.14, 0.012), lam('#2b2b33')); an(rechts, h, 0.02, 0.09, 0.04); }
    if (id === 'ayla' && hals) { const g = new THREE.Group(); const bg = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.016, 8, 20, Math.PI), lam('#2b2b33')); bg.rotation.x = -Math.PI / 2; g.add(bg);
      for (const sx of [-0.11, 0.11]) { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 14), lam('#e85d75')); m.rotation.z = Math.PI / 2; m.position.x = sx; g.add(m); } an(hals, g, 0, hals.name === 'Neck' ? 0.02 : -0.12, 0.04); }
  }
  async function person(id) {
    if (leute[id]) return leute[id];
    const def = LEUTE[id];
    const f = await ladePerson(veil, def);
    const schild = namensschild(def.name, def.farbe); f.group.add(schild); f.group.add(fussSchatten());
    scene.add(f.group);
    zubehoer(f, id);
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
    { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.63, weg: [[12, 32.4], [40, 32], [43, 8], [14, 10]], tempo: 1.15 },
    { modell: 'menschen', stil: 'Beach', haut: '#9b6a45', haar: '#1b1410', oben: '#e85d75', unten: '#4a4f5c', schuhe: '#f2f2f2', hoehe: 1.74, kopf: 'cap', kopfFarbe: '#2b2b33', weg: [[-27, -15.0], [27, -15.0]], tempo: 1.2 },
    { modell: 'frauen', stil: 'Adventurer', haut: '#e0b48c', haar: '#2b1d14', oben: '#3fa66b', unten: '#2d3748', schuhe: '#6b4e3a', hoehe: 1.6, weg: [[25, -15.3], [-25, -15.3]], tempo: 1.1 },
    { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#d9b36a', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.68, frisur: 'locken', weg: [[-4.5, 38], [-4.5, 3], [-1, 3], [-1, 38]], tempo: 1.3 },
    // Pausenaufsicht in Warnweste: läuft ihre Runde über den Hof
    { modell: 'menschen', stil: 'Worker', haut: '#e8bf9a', haar: '#7a7a7a', oben: '#ffd166', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.8, weg: [[-20, 28.4], [20, 28.4], [30, 6], [0, 4], [-26, 6]], tempo: 0.95 },
    // Schlange beim Bäcker gegenüber
    { modell: 'frauen', stil: 'Casual', haut: '#f3d2b5', haar: '#c9a15a', oben: '#9b7bc8', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.62, steht: [3.2, 55.6, Math.PI, 'handy'] },
    { modell: 'menschen', stil: 'Beach', haut: '#c99a72', haar: '#2b1d14', oben: '#4f88c8', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.7, steht: [3.4, 54.4, Math.PI, 'redet'] },
    // Innenhof: Sitzstufen, Linde, ein Rundgang durch die Tore
    { modell: 'frauen', stil: 'Adventurer', haut: '#c68e64', haar: '#2b1d14', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.6, steht: [-19.5, -46.25, 0, 'sitzt'] },
    { modell: 'menschen', stil: 'Casual', haut: '#e0b48c', haar: '#6b4e3a', oben: '#4f88c8', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.72, steht: [-14.2, -46.25, 0, 'sitzt'] },
    { modell: 'frauen', stil: 'Casual', haut: '#f3d2b5', haar: '#8a5a3a', oben: '#e85d75', unten: '#2b2b33', schuhe: '#2b2b2b', hoehe: 1.62, steht: [6.4, -43.2, 2.6, 'handy'] },
    { modell: 'menschen', stil: 'Casual2', haut: '#9b6a45', haar: '#1b1410', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.7, weg: [[-33, -20], [-33, -40.5], [-18, -40.5], [0, -34], [18, -40.5], [33, -40.5], [33, -20], [33, -40.5], [0, -34], [-33, -40.5]], tempo: 1.1 },
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
    { modell: 'menschen', stil: 'Beach', haut: '#f1c7a2', haar: '#d9b36a', oben: '#e9c46a', unten: '#4f88c8', schuhe: '#ffffff', hoehe: 1.7, steht: [6, 24.6, 0, 'handy'] },
    // Mehr Leben auf dem Hof (Details 17.11.): Dreiergruppe am Brunnen, zwei an der Tischtennisplatte, eine auf dem Kübelrand, ein Rundgang
    { modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.61, steht: [-14.0, 21.2, 0.52, 'redet'] },
    { modell: 'menschen', stil: 'Casual2', haut: '#f1c7a2', haar: '#6b4e3a', oben: '#e85d75', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.73, steht: [-12.9, 21.9, -1.57, 'handy'] },
    { modell: 'frauen', stil: 'Adventurer', haut: '#e0b48c', haar: '#c9a15a', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.64, steht: [-13.9, 22.6, 2.74, 'redet'] },
    { modell: 'menschen', stil: 'Beach', haut: '#c68e64', haar: '#1b1410', oben: '#ffd166', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.69, steht: [-20, 29.9, 0, 'redet'] },
    { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#2b1d14', oben: '#3fa66b', unten: '#4a4f5c', schuhe: '#f2f2f2', hoehe: 1.75, kopf: 'cap', kopfFarbe: '#d9523c', steht: [-20, 34.1, Math.PI, 'redet'] },
    { modell: 'frauen', stil: 'Formal', haut: '#f3d2b5', haar: '#5a3a24', oben: '#9b7bc8', unten: '#2b2b33', schuhe: '#2b2b2b', hoehe: 1.6, steht: [5.6, 18.62, 0, 'sitzt'] },
    { modell: 'menschen', stil: 'Worker', haut: '#9b6a45', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.71, weg: [[-30, 20], [-6, 32], [10, 32], [-30, 20]], tempo: 1.1 },
    // Qualitätsrunde Grafik: Kantine nicht mehr leer, Innenhof, Basketball-Rand, Gang
    { modell: 'frauen', stil: 'Casual', haut: '#e0b48c', haar: '#5a3a24', oben: '#e85d75', unten: '#3a3f4b', schuhe: '#ffffff', hoehe: 1.6, steht: [10.75, -5.9, 1.57, 'sitzt'] },
    { modell: 'menschen', stil: 'Casual2', haut: '#9b6a45', haar: '#1b1410', oben: '#ffd166', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.72, steht: [12.25, -5.9, -1.57, 'sitzt'] },
    { modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#c9a15a', oben: '#4f88c8', unten: '#2b2b33', schuhe: '#f2f2f2', hoehe: 1.62, steht: [15.15, -4.9, 1.57, 'sitzt'] },
    { modell: 'menschen', stil: 'Beach', haut: '#c68e64', haar: '#2b1d14', oben: '#2fb8a8', unten: '#4a4f5c', schuhe: '#ffffff', hoehe: 1.7, steht: [-21.2, -46.25, 0, 'sitzt'] },
    { modell: 'frauen', stil: 'Formal', haut: '#8d5a3b', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.62, steht: [-6, -38, 2.2, 'redet'] },
    { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#3a2a1c', oben: '#6b4e8a', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.74, steht: [-7.1, -39.2, -0.9, 'redet'] },
    { modell: 'menschen', stil: 'Worker', haut: '#d8a982', haar: '#1b1410', oben: '#3f78b8', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.76, steht: [40.8, 18.4, -1.57, 'redet'] },
    { modell: 'frauen', stil: 'Casual', haut: '#f1c7a2', haar: '#2b1d14', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#ffffff', hoehe: 1.63, steht: [40.9, 20.2, -1.9, 'handy'] },
    { modell: 'menschen', stil: 'Casual2', haut: '#c99a72', haar: '#2b1d14', oben: '#e85d75', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.7, steht: [4.2, -17.2, Math.PI, 'handy'] },
    // Halle: liest an der Pinnwand
    { modell: 'frauen', stil: 'Casual', haut: '#c99a72', haar: '#2b1d14', oben: '#e9c46a', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.62, steht: [-6.7, -12.4, -Math.PI / 2, 'handy'] },
  ];
  let brett = null;
  async function statistenLaden() {
    for (const d of STATISTEN) {
      const f = await ladePerson(veil, d);
      f.group.add(fussSchatten()); scene.add(f.group);
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
    let hand = null; f.group.traverse((o) => { if (o.isBone && o.name.replace(/\./g, '') === 'WristR') hand = o; });
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
  // Figuren außerhalb des Bildausschnitts oder weiter als 70 m: nicht zeichnen und nicht animieren (Leistung)
  const _fr = new THREE.Frustum(), _pm = new THREE.Matrix4(), _sp = new THREE.Sphere(new THREE.Vector3(), 1.4);
  function ausschnittNeu() { camera.updateMatrixWorld(); _pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); _fr.setFromProjectionMatrix(_pm); }
  function imBild(f, pos) {
    _sp.center.set(pos.x, 0.9, pos.z);
    const v = camera.position.distanceTo(_sp.center) < 70 && _fr.intersectsSphere(_sp);
    const innen = f.group.children[0]; if (innen && innen.visible !== v) innen.visible = v;
    return v;
  }
  function statistenBewegen(dt) {
    for (const x of statisten) {
      if (imBild(x.f, x.f.group.position)) x.f.update(dt);
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

  // ---------- Sprüche im Vorbeigehen: Statisten sagen kurz etwas, manche winken (Lebendigkeit) ----------
  const SPRUECHE = {
    draussen: ['Moien! 👋', 'Wer hat Seite 12?', 'Pause ist zu kurz. Fakt.', 'Ich hab Hunger. Seit 1998.', 'Gerd ist wieder da 🐦', 'Eins gegen eins? Am Korb?', 'Ich hab mein Ladekabel vergessen. Schon wieder.',
      'Lowkey müde.', 'Hast du Mathe gemacht? … Ich auch nicht.', 'Salut! Ça va?', 'Wer hat meinen Ball?', 'Heute ist so ein Tag. Du weißt.', 'Bro, dein Schuh ist offen. … Reingefallen.', 'Noch 12 Minuten bis zum Klingeln!'],
    kantine: ['Das Curry ist heute okay!', 'Nudeln. Schon wieder.', 'Wer isst seinen Nachtisch nicht?', 'Frau Kremer hat mir extra Soße gegeben 🙏', 'Zu wenig Salz. Sagt Luca immer.', 'Ich hol mir Nachschlag. Wünsch mir Glück.'],
    gang: ['Mein Spind klemmt. Wie immer.', 'Wo ist Saal 1.06?', 'Hast du den Plan für morgen?', 'Pssst. Da kommt wer.', 'Ich renn nicht. Ich gehe schnell.'],
    innenhof: ['Hier ist es so ruhig. Ich liebe das.', 'Hast du das Plakat für die Aula gesehen?', 'Ich übe meinen Text. Leise.'],
    skate: ['Kickflip! … fast.', 'Guck! … Nee, warte. Nochmal.', 'Das Board ist von meinem Cousin.'],
  };
  const sprueche_el = document.createElement('div'); sprueche_el.className = 'ly-bark'; sprueche_el.hidden = true; root.appendChild(sprueche_el);
  const _bv = new THREE.Vector3();
  let spruchNaechst = performance.now() + 4000, spruchWer = null, spruchBis = 0;
  function sprueche(dt) {
    const offen = !imGespraech && !ui.ebeneArt() && laeuft;
    if (spruchWer && performance.now() < spruchBis && offen) {
      _bv.copy(spruchWer.f.group.position); _bv.y += (spruchWer.d.steht && spruchWer.d.steht[3] === 'sitzt') ? 1.55 : 2.05; _bv.project(camera);
      const sicht = _bv.z < 1 && Math.abs(_bv.x) < 1 && Math.abs(_bv.y) < 1;
      sprueche_el.hidden = !sicht;
      if (sicht) { sprueche_el.style.left = ((_bv.x + 1) * 50) + '%'; sprueche_el.style.top = ((1 - _bv.y) * 50) + '%'; }
    } else if (spruchWer) { sprueche_el.hidden = true; spruchWer = null; }
    if (performance.now() < spruchNaechst || !offen) return;
    spruchNaechst = performance.now() + 5000 + Math.random() * 6000;
    const p = steuerung.pos; let best = null, bd = 7.5;
    for (const x of statisten) { const d = Math.hypot(x.f.group.position.x - p.x, x.f.group.position.z - p.z); const sichtbar = x.f.group.children[0] && x.f.group.children[0].visible; if (d < bd && d > 1.2 && sichtbar) { bd = d; best = x; } }
    if (!best) return;
    const r = welt.raumBei(best.p.x, best.p.z), rid = r ? r.id : 'draussen';
    const pool = best.d.skate ? SPRUECHE.skate : SPRUECHE[rid === 'kantine' || rid === 'gang' ? rid : best.p.z < -32 && best.p.z > -50 && !r ? 'innenhof' : 'draussen'] || SPRUECHE.draussen;
    sprueche_el.textContent = pool[Math.floor(Math.random() * pool.length)];
    spruchWer = best; spruchBis = performance.now() + 3400;
    if (bd < 3.5 && best.d.steht && best.d.steht[3] === 'redet' && Math.random() < 0.6) { best.f.spiele('Wave'); setTimeout(() => best.f.spiele('Interact', { tempo: 0.35 }), 2400); }
  }

  // ---------- Spielfigur ----------
  let spieler = null;
  async function spielerFigur(i) {
    if (spieler) { scene.remove(spieler.group); }
    spieler = await ladePerson(veil, { ...(FIGUREN[i] || FIGUREN[0]), ...((S && S.aussehen) || {}) });   // Aussehen aus dem Spind-Spiegel
    spieler.group.add(fussSchatten()); scene.add(spieler.group); steuerung.figur = spieler;
    spieler.spiele('Idle');
    anhaengerDran();
  }
  // Anhänger (Lila Bär) an der Hüfte der Spielfigur
  function anhaengerDran() {
    if (!spieler) return;
    const alt = spieler.group.getObjectByName('anhaenger-baer'); if (alt) alt.parent.remove(alt);
    if (!S || S.anhaenger !== 'baer') return;
    let h = null; spieler.group.traverse((o) => { if (!h && o.isBone && /hips|pelvis/i.test(o.name)) h = o; });
    const b = baerAnhaenger();
    if (h) {
      spieler.group.updateMatrixWorld(true);
      const ws = new THREE.Vector3(); h.getWorldScale(ws); b.scale.setScalar(1 / (ws.x || 1));
      const wq = new THREE.Quaternion(); h.getWorldQuaternion(wq); b.quaternion.copy(wq.invert().multiply(spieler.group.getWorldQuaternion(new THREE.Quaternion())));
      b.position.set(0.16 / (ws.x || 1), -0.02 / (ws.x || 1), 0.02 / (ws.x || 1)); h.add(b);
    } else { b.position.set(0.17, 0.95, 0.02); spieler.group.add(b); }
  }

  // ---------- Markierungen ----------
  const markerMat = new THREE.MeshBasicMaterial({ color: '#ffcf4a', toneMapped: false, transparent: true, opacity: 0.95 });
  const ringMat = new THREE.MeshBasicMaterial({ color: '#ffcf4a', toneMapped: false, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
  const marker = [];
  const zielV = new THREE.Vector3();
  const zielPfeil = document.createElement('div'); zielPfeil.className = 'ly-zielpfeil'; zielPfeil.hidden = true; zielPfeil.innerHTML = '<i>➜</i>'; root.appendChild(zielPfeil);
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
    if (!LEUTE[id] || !n) { if (LEUTE[id] && S.herz[id] == null) { S.herz[id] = 1; freund(id, 5, 'kennen'); } return; }
    if (S.herz[id] == null) freund(id, 5, 'kennen');
    S.herz[id] = Math.max(0, Math.min(5, (S.herz[id] == null ? 1 : S.herz[id]) + n));
    tagHerz[id] = (tagHerz[id] || 0) + n;   // erst im Tagesrückblick sichtbar, nicht sofort
    freund(id, n * 6, 'wahl');
  }
  // ---------- Freundschaften (freunde.js): Punkte 0–100 mit Gründen, Stufen, Profil; die engsten Freunde bekommen Rollen ----------
  function sicherFreund() {
    if (S.freund) return;
    S.freund = {}; S.freundGrund = {};
    for (const [id, h] of Object.entries(S.herz || {})) if (CHARAKTER[id]) S.freund[id] = Math.max(5, (h - 1) * 15 + 5);   // alter Spielstand
  }
  function freund(id, n, grund) {
    if (!CHARAKTER[id] || !n || !S) return;
    sicherFreund();
    const alt = S.freund[id] || 0, neu = Math.max(0, Math.min(100, alt + n));
    S.freund[id] = neu;
    const g = (S.freundGrund[id] = S.freundGrund[id] || {}); g[grund] = (g[grund] || 0) + 1;
    // Stufe gestiegen: sofort zeigen – außer bei Entscheidungen (die zeigt erst der Tagesrückblick, sonst verrät es die „richtige“ Antwort)
    if (grund !== 'wahl' && neu > alt && stufe(neu) !== stufe(alt)) ui.toast('<b>' + LEUTE[id].name + ': ' + stufe(neu) + '</b><span>Hat dich jetzt auf dem Schirm.</span>', 'ly-t-herz');
  }
  const besteFreunde = () => { if (!S) return []; sicherFreund(); return Object.entries(S.freund).filter(([id, p]) => CHARAKTER[id] && p >= 20).sort((a, b) => b[1] - a[1]).map(([id]) => id); }
  // Jetons fürs Lernen: werden nie weniger, außer man löst sie bei einer Figur ein (das Ding bleibt dann für immer)
  function jetons(n, warum) {
    if (!n) return;
    S.jetons = (S.jetons || 0) + n; S.jetonsGesamt = (S.jetonsGesamt || 0) + n; sichern();
    ui.toast('<b>+' + n + ' Jeton' + (n > 1 ? 's' : '') + '</b><span>' + warum + ' · Du hast ' + S.jetons + '.</span>', 'ly-t-ent');
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
        if (LEUTE[wer] && S.herz[wer] == null) { S.herz[wer] = 1; freund(wer, 5, 'kennen'); }
        if (leute[wer] && leute[wer].f.group.visible && wer !== 'du') { gegenueber = leute[wer]; steuerung.fokus = gegenueber.pos; }
        await ui.sprich({ ...sprecher(wer), text: ersetze(text) });
      } else if (z.wahl) {
        const opt = z.wahl.filter((w) => !w.wenn || w.wenn(S.merke));   // manche Antworten gibt es nur nach früheren Entscheidungen
        // Reihenfolge mischen, wenn eine Antwort eine Stärke zeigt – sonst wäre „die erste ist die gute“ zu leicht
        const ord = opt.map((_, k) => k);
        if (opt.some((w) => w.staerke) && !z.fest) for (let k = ord.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [ord[k], ord[r]] = [ord[r], ord[k]]; }
        const i = await ui.waehle(ord.map((k) => ersetze(opt[k].t)));
        const w = opt[ord[i]];
        if (w.staerke) staerke(w.staerke);
        if (w.herz) for (const [id, n] of Object.entries(w.herz)) herz(id, n);
        if (w.merke) [].concat(w.merke).forEach((m) => { S.merke[m] = true; });
        sichern();
        if (w.dann && w.dann.length) await spiele(w.dann);
      } else if (z.szene) {
        // Situations-Spiel (situation.js): Ausgang → Folgen (wie eine Wahl: staerke, herz, merke, dann)
        const def = typeof z.def === 'function' ? z.def(S.merke, S) : z.def;
        ui.dialogZu();
        const SZ = { hitze: 'hitzeDuell', chat: 'liveChat', checkin: 'checkIn', namen: 'namenRekord', zwei: 'zweiWahrheiten', blind: 'blindParcours', stempel: 'skillsStempel', tanks: 'tankRaten', meinetanks: 'meineTanks', nachhaken: 'nachhaken', teams: 'teamsWaehlen', pult: 'gefuehlsPult', lesen: 'gesichterLesen', mischpult: 'mischpult', linie: 'linie', staerken: 'staerkenSchenken', sort: 'sortSprint', platz: 'platzwechsel', koerper: 'koerperKarte', synchron: 'synchron', spuren: 'spurenWand', thermo: 'thermometer', zonen: 'zonenWette', test: 'mathTest', atem: 'atemSync', koffer: 'koffer', weiche: 'gedankenWeiche', bohnen: 'bohnenWette', waage: 'beweisWaage', satz: 'satzBau', zettel: 'wenRaten', abstand: 'stoppAbstand', stopp: 'stoppBau', treppe: 'treppe', druck: 'druckRunde', buehne: 'buehneKippen', feed: 'feedSim', rucksack: 'rucksack', akku: 'akkuTag', wuerfel: 'gesundWuerfel', kurve: 'jahresKurve', brief: 'briefAnMich' };
        const r = (await ui[SZ[z.szene] || z.szene](def)) || {};
        const key = z.ausgang ? z.ausgang(r, S.merke) : 'standard';
        S.szenen = S.szenen || {}; if (z.id) S.szenen[z.id] = key;
        S.sz = S.sz || {}; if (z.id) { const kurz = {}; for (const [a, v] of Object.entries(r)) if (typeof v !== 'object' || Array.isArray(v)) kurz[a] = v; S.sz[z.id] = kurz; }
        const f = (z.folgen && (z.folgen[key] || z.folgen.standard)) || {};
        if (f.staerke) [].concat(f.staerke).forEach(staerke);
        if (f.herz) for (const [id, n] of Object.entries(f.herz)) herz(id, n);
        if (f.merke) [].concat(f.merke).forEach((m) => { S.merke[m] = true; });
        sichern();
        if (f.dann && f.dann.length) await spiele(f.dann);
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
    ...tunN1({ get S() { return S; }, ui }),
    ...tunN2({ get S() { return S; }, ui }),
    ...tunN3({ get S() { return S; }, ui }),
    ...tunN4({ get S() { return S; }, ui }),
    ...tunN5({ get S() { return S; }, ui }),
    ...tunN6({ get S() { return S; }, ui }),
    ...tunN7({ get S() { return S; }, ui }),
    ...tunN8({ get S() { return S; }, ui }),
    ...tunN9({ get S() { return S; }, ui }),
    ...tunN10({ get S() { return S; }, ui }),
    stundenplanTipp: () => { ui.toast('<b>Tipp</b><span>Mit Tab oder ☰ öffnest du dein Journal.</span>'); },
    weberTelefon: () => { const w = leute.weber; if (w) w.f.spiele('Interact', { tempo: 0.5 }); },
    stundenplan: () => { S.stundenplan = true; ui.toast('📄 Stundenplan bekommen – steht im Journal.'); },
    // Freischaltung in den ersten fünf Minuten: der eigene Spind (Code steht auf dem Stundenplan)
    spindFrei: () => { S.frei = { ...(S.frei || {}), spind: true }; setTimeout(() => ui.toast('<b>Neu: Spind 117</b><span>Im Gang. Der Code steht auf deinem Plan.</span>', 'ly-t-ent'), 2600); },
    // Running Gag: Ben leiht sich Geld. Der Zähler steht im Journal und wird nie kleiner.
    benSchuld: () => { S.benSchuld = (S.benSchuld || 0) + 2; ui.toast('<b>Ben schuldet dir ' + S.benSchuld + ' €</b><span>Steht im Journal. Für immer, vermutlich.</span>'); },
    benZahlt: () => { S.benZurueck = (S.benZurueck || 0) + 2; ui.toast('<b>Ben hat 2 € zurückgezahlt</b><span>Ein historischer Moment. Steht im Journal.</span>', 'ly-t-ent'); },
    benSchuld4: () => { S.benSchuld = (S.benSchuld || 0) + 4; ui.toast('<b>Ben schuldet dir ' + S.benSchuld + ' €</b><span>Der Zähler im Journal läuft.</span>'); },
    zuSpaet: () => {
      const m = S.merke, z = [];
      if (m.weberGewartet && m.gewartet) z.push(['hoffmann', 'Zehn Minuten. Am ersten Tag. Rekord.'], ['jo', '(halblaut) Starker Auftritt.']);
      else if (m.gewartet) z.push(['hoffmann', 'Gerade noch. Setz dich. Schnell.']);
      if (m.falscherPlan) z.push(['hoffmann', 'Zeig mal deinen Plan … das ist die 7P1.'], ['jo', 'Falsche Klasse. Tür ist da hinten.'], ['erzaehler', 'Gelächter. Hoffmann gibt dir seine Kopie. Mit Kaffeefleck.']);
      return z;
    },
    bingoStart: () => { zeigeBingo(); },
    freiwurf: async () => {
      input.setEnabled(false);
      const t = await ui.freiwurf();
      S.merke.freiwurf = t; ui.toast('Freiwürfe: ' + t + ' von 5 getroffen');
      return t >= 4 ? [['yusuf', t + ' von 5. Hm. Respekt.'], ['ben', 'Okay, du zahlst trotzdem nicht.']]
        : t >= 2 ? [['ben', t + ' von 5. Ich hatte drei. Glaub ich.'], ['yusuf', 'Zwei.']]
        : [['ben', t + ' von 5. Der Korb ist schief. Ehrlich.'], ['yusuf', 'Ist er nicht.']];
    },
    tablett: () => { ui.toast('🍽 Tablett in der Hand. Jetzt der schwerste Teil: ein Platz.'); },
    gegessen: async () => {   // Spielfigur setzt sich mit an den Tisch (gegenüber)
      const sitz = S.merke.tisch === 'mila' ? [19.55, -4.9, Math.PI / 2] : [12.25, -10.1, -Math.PI / 2];
      steuerung.setzen(sitz[0] - Math.sin(sitz[2]) * 0.1, sitz[1] - Math.cos(sitz[2]) * 0.1, sitz[2]);
      await new Promise((r) => setTimeout(r, 1400));
      await ui.bild('Mittagspause', S.merke.tisch === 'mila' ? 'Mila zeigt dir einen Würfel-Trick. Du schaffst ihn nicht. Sie lacht fast.' : 'Ayla trommelt den Takt auf das Tablett. Noah verschluckt sich vor Lachen.', 3);
    },
    plakat: async () => {
      const m = S.merke;
      const text = m.linaGefragt ? 'Lina malt die Orte, wo einen keiner nervt. Jeden erkennt man. Jo malt das Gebäude. Riesig.' : m.ideeGeklaut ? 'Jo malt. Lina malt aus. Sie guckt dich kein einziges Mal an.' : m.joMacht ? 'Jo malt das Gebäude. Lina malt aus. Dein Handy-Akku: 12 %.' : 'Jo malt das Gebäude. Das Gebäude hat jetzt einen Drachen.';
      await ui.bild('20 Minuten später …', text, 3);
    },
    plakatEnde: () => {
      const m = S.merke;
      if (m.hoffmannGelaestert) return [['hoffmann', '(zu dir, trocken) Schräg. Aber pünktlich fertig.'], ...TUN.plakatEndeKern()];
      return TUN.plakatEndeKern();
    },
    plakatEndeKern: () => {
      const m = S.merke;
      if (m.ideeGeklaut) return [['hoffmann', 'Orte, wo einen keiner nervt. Gut. Von wem?'],
        { wahl: [
          { t: '„Von mir.“', herz: { hoffmann: 1, lina: -2 }, merke: 'ideeBehalten', dann: [['hoffmann', 'Stark, {name}.'], ['erzaehler', 'Lina guckt aus dem Fenster. Sehr lange.']] },
          { t: '„Eigentlich von Lina.“', staerke: 'ehrlich', herz: { lina: 1 }, dann: [['jo', 'Hä? Du hast doch gesagt …'], ['hoffmann', 'Aha. Dann: gut, Lina.'], ['erzaehler', 'Unter dem Tisch: ein Zettel. Ein gezeichneter Daumen.']] },
        ] }];
      if (m.linaGefragt) return [['hoffmann', 'Orte ohne Nerverei. Wessen Idee?'], ['jo', 'Linas. Das Gebäude ist von mir. Und der Drache.']];
      if (m.joMacht) return [['hoffmann', 'Schönes Gebäude. Und ihr zwei?'], ['jo', 'Ausgemalt. Und {name} war am Handy.'], ['hoffmann', '{name}. Handy. Mein Pult. Bis 16 Uhr.'], ['weber', '(durch die Tür) 16 Uhr. Nicht 16:05.']];
      return [['hoffmann', 'Schönes Gebäude, Jo. Warum hat es einen Drachen?'], ['jo', 'Weil es geht.'], ['lina', '(ganz leise) … ausgemalt.']];
    },
    // ---------- Zweite Jugend-Kritik: neue Folgen (Kapitel 1–3) ----------
    noahTisch: () => {
      const m = S.merke;
      if (m.noahKlebt) return [['noah', 'Hier! Platz frei gehalten. Mit meiner Jacke.'], ['ayla', 'Seit zehn Minuten. Er hat Ben weggeschickt.']];
      if (m.noahGeneckt) return [['noah', '(zu Ayla) Das ist die Person mit dem Prospekt.'], ['ayla', '(guckt Noah an. Lacht.) Stimmt aber.']];
      if (m.noahKopfhoerer) return [['noah', 'Oh. Ohne Kopfhörer. Du kannst also hören.']];
      return [['noah', 'Hey! Setz dich. Der Stuhl wackelt. Alle wackeln.']];
    },
    aylaTisch: () => [{ wahl: [
      ...(S.gefragt.includes('ayla') ? [{ t: '„Ja. Und du spielst Bass.“', staerke: 'zuhoeren', herz: { ayla: 2 }, merke: 'aylaBand', dann: [
        ['ayla', 'Du hast zugehört? Wow. Ich hab eine Band.'], ['ayla', 'Wir haben noch keinen Namen. Und keinen Proberaum.'], ['erzaehler', 'Sie erzählt. Die ganze Pause. Noah gähnt.']] }] : []),
      { t: '„Ja. Hoffmann ist schräg, oder?“', staerke: 'humor', herz: { ayla: 1, noah: 1 }, merke: 'hoffmannGelaestert', dann: [
        ['ayla', '(lacht) Total. „Neue Methode!“'], ['noah', '(wird blass) Er steht hinter dir.'], ['hoffmann', '(mit Tablett) Guten Appetit. Schräg grüßt.']] },
      { t: '(Nicken. Essen.)', dann: [['erzaehler', 'Ayla redet mit Noah weiter. Du isst. Das Curry ist okay.']] },
    ] }],
    samstag: () => {
      const m = S.merke;
      if (m.doppeltZugesagt) return [['noah', 'Samstag. Wir haben bis halb drei gewartet.'], ['noah', 'Ayla sagt, bei ihr warst du auch nicht.'],
        { wahl: [
          { t: '„Hab’s nicht geschafft. Sorry.“', staerke: 'ehrlich', dann: [['noah', 'Hättest schreiben können.']] },
          { t: '„Mir ist was dazwischengekommen.“', dann: [['noah', 'Hm. Okay.']] },
          { t: '(Schulterzucken.)', herz: { noah: -1 }, dann: [['noah', '… Ja. Okay.']] },
        ] }];
      if (m.samstagNoah) return [['noah', 'Die vom Bolzplatz fragen, ob du wieder kommst.']];
      if (m.samstagAyla) return [['noah', 'Und? Die Band?'], ['erzaehler', 'Drei Leute. Zwei Lieder. Eins davon zweimal.']];
      return [];
    },
    anruf: () => [
      ['weber', 'Annexe Junglinster, Sekretariat. Weber.'],
      { wahl: [
        { t: '„Guten Morgen. {name}, 7P2. Bus verpasst.“', herz: { weber: 1 }, dann: [['weber', 'Mit Noah? Gut. Wann seid ihr da?']] },
        { t: '„Der Bus war zu früh!“', merke: 'busAusrede', dann: [['weber', 'Der 7:35? Der ist seit Jahren pünktlich.'], ['weber', 'Aber gut. Wann seid ihr da?']] },
        { t: '„Äh … hallo? Ich bin’s.“', dann: [['weber', 'Wer ist „ich“? Name, Klasse.'], ['du', '{name}. 7P2. Bus weg.'], ['weber', 'Wann seid ihr da?']] },
      ] },
      ['du', 'Halb neun. Mit dem nächsten.'],
      ['weber', 'Ich sag’s M. Hoffmann.'],
      ['noah', '(flüstert) Wie machst du das?'],
    ],
    spaetFolge: () => {
      const m = S.merke;
      if (m.nichtAngerufen) return [['hoffmann', 'Unentschuldigt, ihr zwei. Mme Weber hat zuhause angerufen.'],
        { wahl: [
          { t: '„Wir haben nicht angerufen. Stimmt.“', staerke: 'ehrlich', dann: [['hoffmann', 'Zettel. Unterschrieben. Beide.'], ['noah', '(leise) Das gibt Ärger. Großen.']] },
          { t: '„Noah sollte anrufen.“', herz: { noah: -2 }, merke: 'noahGeschoben', dann: [['noah', 'Was? Das …'], ['hoffmann', 'Noah: Zettel. {name}: setzen.'], ['erzaehler', 'Noah sagt bis Mittag kein Wort.']] },
          { t: '„Mein Akku war leer.“', dann: [['hoffmann', 'Und Noahs auch. Klar. Zettel, beide.']] },
        ] }];
      if (m.noahRuft) return [['hoffmann', 'Noah ist entschuldigt. Du stehst nicht auf meinem Zettel.'],
        { wahl: [
          { t: '„Ich war mit Noah. Er hat mich vergessen.“', herz: { noah: -1 }, dann: [['noah', 'Sorry! Ich war so nervös.'], ['hoffmann', 'Okay. Ich trag dich nach.']] },
          { t: '„Dann ruf ich jetzt an.“', staerke: 'klar', dann: [['jo', 'Jetzt? Live? Bitte, ja.'], ['hoffmann', 'Lass. Ich geh in der Pause zu Weber.']] },
          { t: '(Schulterzucken. Hinsetzen.)', merke: 'fehlstunde', dann: [['hoffmann', 'Dann steht da „unentschuldigt“.']] },
        ] }];
      return [['hoffmann', 'Ah, da seid ihr. Mme Weber hat Bescheid gesagt.'], ['jo', 'Guten Morgen, Hoheit.'],
        { wahl: [
          { t: '„Morgen, Jo. Hast mich vermisst?“', staerke: 'humor', herz: { jo: 1 }, dann: [['jo', '(grinst) Keine Sekunde.']] },
          { t: '(Hinsetzen. Nicht hinschauen.)', staerke: 'ruhig', dann: [['erzaehler', 'Ein paar lachen. Dann ist es vorbei.']] },
        ] }];
    },
    regalWackelt: () => (S.merke.brettVersteckt ? [['erzaehler', 'Das Regal wackelt. Ein Brett ist kürzer.'], ['becker', '(misst) Wer hat das auf den Stapel gelegt?'],
      { wahl: [
        { t: '„Ich. War zu kurz.“', staerke: 'ehrlich', herz: { becker: 1 }, dann: [['becker', 'Nächstes Mal: Restekiste. Nicht Stapel.']] },
        { t: '(Kenan anschauen.)', herz: { kenan: -2 }, merke: 'kenanAngeschaut', dann: [['becker', 'Kenan?'], ['kenan', '… Ja. Meins.'], ['erzaehler', 'Kenan sagt den Rest der Stunde nichts.']] },
        { t: '„Keine Ahnung.“', dann: [['kenan', '(schaut dich an. Sagt nichts.)'], ['becker', 'Dann neu. Zu zweit.']] },
      ] }] : [['kenan', 'Nicht schlecht für den ersten Tag.']]),
    noahSchuld: () => (S.merke.noahGeschoben ? [['noah', 'Du schuldest mir was. Wegen dem Zettel.']] : []),
    torGespraech: () => (S.merke.torWeg ? [['hoffmann', 'Montag, Tor. Wir reden noch.']] : []),
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
      const ord = await ui.sortieren({ titel: 'Was geht, was ist hart?', frage: 'Tipp zuerst an, was für dich am leichtesten wäre.', teile: LEITER });
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
      if (r.geblieben) { staerke('bleiben'); return [['erzaehler', 'Vorher: ' + vorher + '. Am Ende: ' + nachher + '.'], ...(nachher < vorher ? [['erzaehler', 'Irgendwann lachst du übers Katzenvideo mit. Gemerkt hat’s keiner.']] : [['erzaehler', 'Heute ging’s kaum runter. Kommt vor.']]), ['noah', 'Kommst du morgen wieder her?'], { wahl: [{ t: '„Mal sehen.“', dann: [] }, { t: '„Ja.“', herz: { noah: 1 }, dann: [['noah', 'Cool.']] }] }]; }
      return [['erzaehler', 'Du bist nach ' + r.sek + ' Sekunden gegangen.'], ['erzaehler', 'Später, im Gang. Herr Kaya: „Wie lang warst du da?“'],
        { wahl: [{ t: '„' + r.sek + ' Sekunden.“', dann: [['kaya', 'Zählt. Nächstes Mal: so lang plus fünf.']] }, { t: '„Kaum. Bringt eh nix.“', dann: [['kaya', 'Notiert. Morgen nochmal? Ich wette einen Keks.']] }] }];
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
      if (m.tafelStumm && !m.karte) return [['erzaehler', 'Nach der Stunde.'], ['hoffmann', '(packt ein) Vorhin. Blöd gelaufen.'], ['hoffmann', 'Nächstes Mal sag einfach „gleich“. Dann komm ich zurück.']];
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
      return [['kaya', 'Auf deiner Liste ist ' + leichter + ' leichter.'], ['kaya', 'Du entscheidest.']];
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
        { t: '(Aufs Teilchen zeigen.) „Das da.“', merke: 'bestellt', dann: [['baeckerin', 'Kirsch? Eins fünfzig.'], ['erzaehler', 'Du hast ein Teilchen. Keiner hat was gemerkt.']] },
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
      const bf = besteFreunde()[0];
      audio.play('unlock'); setTimeout(() => audio.play('chime'), 350);
      const wahl = await ui.ende({ ...bilanz(), kap, brief: bf ? { von: LEUTE[bf].name, farbe: LEUTE[bf].farbe, text: nachricht(bf, kap) } : null, ueberschrift: ({ 1: 'Dein erster Tag', 2: 'Deine erste Woche', 3: 'Die Sportfest-Woche', 4: 'Die Test-Woche', 5: 'Die Fake-Woche', 6: 'Die Woche der Grenzen' , 7: 'Die Woche danach', 8: 'Die KI-Woche' , 9: 'Die Akku-Woche' , 10: 'Das Sommerfest' })[kap] || KAPITEL[kap],
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
    chat: async () => { await ui.handy(CHAT, { gelesen: 14, mitglieder: 19 }); },
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
    testPizza: () => (S.merke.testGeguckt ? [['erzaehler', 'Aufgabe 3 steht da. Wie man drauf kommt, weißt du nicht.']]
      : S.merke.matheFoto ? [['erzaehler', 'Aufgabe 3: Brüche. Du erinnerst dich an das Foto. Nicht an den Weg.']]
      : S.merke.matheGefragt || S.merke.matheRichtig ? [['erzaehler', 'Aufgabe 3: Brüche. Halbe Pizza, Viertel Pizza. Drei Viertel.']]
      : [['erzaehler', 'Aufgabe 3: Brüche. Leer.']]),
    ichBotschaft: async () => {
      input.setEnabled(false);
      const satz = await ui.ichBotschaft(ichBotschaftThema(S.merke));
      staerke('ichbotschaft'); S.merke.ichSatz = satz;
      return [['du', satz], ['hoffmann', 'Danke, {name}. Jo?'],
        S.merke.chatGelacht ? ['jo', '(verdreht die Augen) Jaja. Gelöscht. Zufrieden?'] : ['jo', '(verdreht die Augen) Jaja. Ich frag vorher. Zufrieden?'],
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
      return saegeFolgen(abw, S.merke).zeilen;
    },
    beckerLob: () => [
      ['becker', (S.merke.saege || 0) <= 1 ? 'Sauber gemessen. Das war richtig gut.' : 'Gut war: Du hast es ein zweites Mal versucht.'],
      ...((S.staerken.sicher || 0) ? [['becker', 'Und du hast sofort an die Brille gedacht.']] : []),
    ],
    kenanBus: () => {
      const m = S.merke;
      if (m.kenanVerpfiffen) return [['erzaehler', 'Kenan steigt ein. Er setzt sich weit weg.'], ['dario', '(im Vorbeigehen) Mutig. Oder dumm. Mal sehen.']];
      if (m.schuldGenommen) return [['kenan', 'Brief nach Hause. Wegen mir.'], ['kenan', 'Warum hast du das gemacht?'],
        { wahl: [
          { t: '„Du hast schon genug Ärger.“', staerke: 'lesen', herz: { kenan: 1 }, dann: [['kenan', 'Woher weißt du das?'], ['kenan', '… Okay. Danke.']] },
          { t: '„Weiß ich auch nicht.“', dann: [['kenan', '(lacht kurz) Du bist komisch.']] },
          { t: '„Du schuldest mir was.“', herz: { kenan: -1 }, merke: 'kenanSchuldet', dann: [['kenan', 'Okay. Merk ich mir. Echt.']] },
        ] }];
      if (m.torWeg) return [['kenan', 'Abgehauen. Hoffmann hat dich trotzdem erkannt.'], ['kenan', 'Er hat drei Namen. Deiner ist dabei.']];
      return [['kenan', 'Hoffmann kam genau zu uns. Als ob er’s wusste.'], ['kenan', 'Hast du vorher was gesagt?'],
        { wahl: [
          { t: '„Nein.“', dann: [['kenan', 'Hm. Okay.']] },
          { t: '„Frag lieber Luca.“', herz: { kenan: 1, luca: -1 }, merke: 'lucaBeschuldigt', dann: [['kenan', 'Luca? … Hm.']] },
          { t: '„Frag Dario.“', staerke: 'lesen', herz: { dario: -1 }, merke: 'darioVerdacht', dann: [['kenan', '(schaut zu Dario) … Lass das.'], ['erzaehler', 'Dario schaut auf sein Handy. Sehr lange.']] },
        ] }];
    },
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
      ...(S.merke.testGeguckt ? [['hoffmann', 'Beim Test hast du auch schon rübergeschaut.']] : []),
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
      ...(S.merke.fehlstunde ? [['sommer', 'Hoffmann sagt, du hattest schon eine Fehlstunde.']] : []),
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
        ...(S.merke.sommerGeholt ? [['sommer', '(pfeift) Gut. Und jetzt Korbball.']] : [['lina', '(leise) Das war cool, {name}.']])];
    },
    noahWoche: () => (S.merke.erklaert ? [['noah', 'Hoffmann hat mich drangenommen. Ich wusste es. Er war geschockt.']] : S.merke.abgeschrieben ? [['noah', 'Sorry wegen der Hausaufgabe. Das hat dir Ärger gemacht.']] : [['noah', 'Schönes Wochenende, {name}.']]),
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
    entfernt: async () => { const wer = S.merke.chatGelacht ? 'Ben' : 'Jo'; await ui.handy(CHAT5.map((n) => (n.system ? { ...n, text: n.text.replace('{wer}', wer) } : n)), { titel: '7P2 ohne Lehrer 🚫👨‍🏫', mitglieder: 19 }); return []; },

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
      ...(S.merke.kantinengeldWeg ? [] : [{ t: '„Hier. Zwei Euro.“ (Das Kantinengeld.)', herz: { ben: 1 }, merke: 'kantinengeldWeg', dann: [{ tu: 'benSchuld' }, ['ben', 'Du rettest mich. Morgen. Versprochen. Wirklich morgen.']] }]),
      { t: '„Hab nix. Wirklich.“', staerke: 'neinsagen', dann: [['ben', 'Okay, okay.'], ['erzaehler', 'Er fragt Yusuf. Yusuf gibt.']] },
      { t: '„Du gibst Yusuf auch nie was zurück.“', staerke: 'klar', herz: { ben: -1 }, merke: 'benSchulden', dann: [['ben', 'Wie kleinlich bist du denn?'], ['yusuf', '(grinst) Stimmt aber.']] },
      ...(S.merke.lucaAngelegt ? [{ t: '(Luca kommt dazu.)', dann: [['luca', 'Die Kantinen-Polizei hat Geld? Ich nehm auch zwei.'], ['erzaehler', 'Jetzt wollen zwei was von dir.']] }] : []),
    ] }],

    benMorgen: () => (S.benSchuld ? [['erzaehler', 'Er schuldet dir schon ' + S.benSchuld + ' Euro. „Morgen“ war vor einer Woche.']] : [['erzaehler', 'Das mit „morgen“ hat er heute schon zweimal gesagt.']]),
    benSchuldet: () => (S.benSchuld ? [['erzaehler', 'Ben schuldet dir ' + S.benSchuld + ' Euro. Er hat es nicht vergessen. Sagt er.']] : []),

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
      if (m.portiZurueck && m.kantinengeldWeg) return [['ben', 'Hier. Zwei Euro. Diesmal echt.'], ['erzaehler', 'Er gibt sie dir. Dann fragt er nach einem Kaugummi.'], { tu: 'benZahlt' }];
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
    milaWoche: () => ((S.herz.mila || 0) >= 4 ? [['mila', 'Donnerstag. Du weißt schon.'], ['mila', '… Okay. Tschüss.']] : []),
  };

  // ---------- Bingo ----------
  function zeigeBingo() { ui.bingo(BINGO.map((b) => ({ text: b.text, wer: S.bingo[b.id] ? LEUTE[S.bingo[b.id]].name : '' }))); }
  async function bingoFrage(id) {
    const g = GESPRAECHE['bingo_' + id]; if (!g) return;
    const erst = !S.gefragt.includes(id);
    const zeilen = [];
    // je Person anders: Höflichkeit ist nicht bei allen richtig (zweite Jugend-Kritik). [höflich, Karte hinhalten, Witz]
    const RE = {
      jo: [S.merke.mussIch ? ['jo', 'Du schon wieder. Okay, frag.'] : ['jo', 'Frag wen anders. … Na gut.'], ['jo', 'Was? Red halt.'], ['jo', '(grinst) Endlich mal ehrlich.']],
      lina: [['lina', '(nickt nur)'], ['lina', '(zeigt auf ein Feld. Lächelt kurz.)'], ['lina', '(zuckt zusammen) … okay.']],
      ayla: [['ayla', 'Klar! Frag!'], ['ayla', 'Du redest nicht so gern, oder?'], ['ayla', 'Haha. Ja. Los.']],
      ben: [['ben', 'Klar.'], ['ben', 'Zeig. Oh, das bin ich zweimal!'], ['ben', 'Hinter uns bringen? Ich liebe Bingo.']],
      chiara: [['chiara', 'Kurz. Ich hab noch was vor.'], ['chiara', 'Was soll ich damit?'], ['chiara', 'Deal. Aber nichts Peinliches.']],
      yusuf: [['yusuf', 'Hm.'], ['yusuf', '(liest. Tippt auf „Sport“.)'], ['yusuf', 'Hm. (Fast ein Grinsen.)']],
    };
    if (erst && id !== 'noah') {
      const r = RE[id] || [[id, 'Klar.'], [id, 'Ah, das Bingo.'], [id, 'Okay.']];
      zeilen.push({ wahl: [
        { t: 'Darf ich dich was fürs Bingo fragen?', staerke: 'kontakt', herz: { [id]: id === 'jo' ? -1 : 1 }, dann: [r[0]] },
        { t: '(Die Karte hinhalten. Nichts sagen.)', herz: { [id]: id === 'lina' || id === 'yusuf' ? 1 : 0 }, dann: [r[1]] },
        { t: '„Ich muss. Du musst. Hinter uns bringen?“', staerke: 'humor', herz: { [id]: id === 'lina' ? -1 : 1 }, dann: [r[2]] },
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
    S.schritt = i; S.schrittId = SCHRITTE[i] && SCHRITTE[i].id; S.fertig = false; sichern();
    const st = SCHRITTE[i];
    if (mitStart !== false && vorher && (vorher.tag !== st.tag || vorher.kap !== st.kap) && i > 0) {
      const eintraege = Object.entries(tagHerz).filter(([id, n]) => n && LEUTE[id]).map(([id, n]) => ({ name: LEUTE[id].name, farbe: LEUTE[id].farbe, n })).sort((a, b) => b.n - a.n);
      tagHerz = {};
      await ui.rueckblick(st.tag, st.kap !== vorher.kap ? kapName(st.kap) : 'Ein neuer Tag in der Annexe Junglinster.', eintraege);
      const b = besteFreunde()[0];
      if (b && st.kap !== vorher.kap) setTimeout(() => ui.toast('<b>' + LEUTE[b].name + ' (' + stufe(S.freund[b]) + ')</b><span>„' + GRUSS[b] + '“</span>', 'ly-t-herz'), 2500);
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
    // Gesprächsfaden (faeden.js): ein tieferes Gespräch, wenn die Freundschaft gewachsen ist – je Person höchstens eins
    // pro Abschnitt der Geschichte (nach dem Ende: alle zehn Minuten), damit sie sich über die Wochen verteilen
    const fd = FAEDEN[id];
    if (fd) {
      S.faeden = S.faeden || {};
      const n = S.faeden[id] || 0, fa = fd[n], abschnitt = S.fertig ? 'e' + Math.floor(Date.now() / 600000) : String(S.schritt);
      sicherFreund();
      if (fa && ((S.herz[id] == null ? 1 : S.herz[id]) >= fa.herz || (S.freund[id] || 0) >= fa.herz * 15) && S.merke['fd_' + id] !== abschnitt) {
        S.merke['fd_' + id] = abschnitt; S.faeden[id] = n + 1; freund(id, 8, 'tief'); sichern();
        await gespraech(fa.g);
        ui.toast('<b>' + ((LEUTE[id] || {}).name || id) + ': „' + fa.titel + '“</b><span>Gesprächsfaden ' + (n + 1) + ' von ' + fd.length + '</span>');
        return;
      }
    }
    // Jetons einlösen: bei Kenan, Lina, Ayla, Chiara – einmal je Abschnitt angeboten, nur wenn es reicht
    const ang = ANGEBOTE[id];
    if (ang && S.jetons && S.merke['laden_' + id] !== String(S.schritt)) {
      const offen = ang.dinge.filter((d) => !(S.besitz || []).includes(d.id));
      if (offen.length && Math.min(...offen.map((d) => d.preis)) <= S.jetons) {
        S.merke['laden_' + id] = String(S.schritt);
        await gespraech([[id, ang.hallo]]);
        const d = await ui.laden({ wer: (LEUTE[id] || {}).name || id, dinge: ang.dinge, besitz: S.besitz || [], jetons: S.jetons });
        if (d) {
          S.jetons -= d.preis; S.besitz = [...(S.besitz || []), d.id];
          if (d.art === 'deck') S.deck = d.wert;
          if (d.art === 'lampe') S.spindLampe = d.wert;
          if (d.art === 'anhaenger') { S.anhaenger = d.wert; anhaengerDran(); }
          sichern(); freund(id, 2, 'gespraech');
          await gespraech([[id, d.satz]]);
          ui.toast('<b>' + esc(d.name) + '</b><span>Liegt jetzt in deinem Spind 117.</span>', 'ly-t-ent');
        } else await gespraech([[id, 'Okay. Das Angebot bleibt.']]);
        return;
      }
    }
    // sonst: kurz plaudern – zählt für die Freundschaft (einmal je Person und Abschnitt)
    if (CHARAKTER[id] && S.merke['fg_' + id] !== String(S.schritt)) { S.merke['fg_' + id] = String(S.schritt); freund(id, 3, 'gespraech'); }
    if (CHARAKTER[id] && S.lektionen && S.merke['wn_' + id] !== String(S.schritt) && Math.random() < 0.4) { S.merke['wn_' + id] = String(S.schritt); if (await weisstDuNoch(id)) return; }
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
    sicherFreund();
    const faeden = (id) => (FAEDEN[id] ? FAEDEN[id].slice(0, (S.faeden || {})[id] || 0).map((f) => f.titel).join(' · ') : '');
    const gruende = (id) => Object.entries((S.freundGrund || {})[id] || {}).map(([g, n]) => n + '× ' + (GRUENDE[g] || g)).join(' · ');
    const leute = Object.entries(S.herz).filter(([id]) => LEUTE[id]).map(([id, h]) => {
      const c = CHARAKTER[id], p = c ? (S.freund[id] || 0) : null;
      return { id, name: LEUTE[id].name, farbe: LEUTE[id].farbe, herz: h, punkte: p, stufe: c ? stufe(p) : '', typ: c ? c.typ : '', hobby: c ? c.hobby : '', mag: c && p >= 20 ? c.mag : '',
        gruende: c ? gruende(id) : '', notiz: faeden(id) };
    }).sort((a, b) => (b.punkte ?? -1) - (a.punkte ?? -1) || b.herz - a.herz);
    const beste = besteFreunde().slice(0, 3);
    return {
      name: S.name, leute,
      freunde: { beste: beste.map((id) => ({ name: LEUTE[id].name, farbe: LEUTE[id].farbe, punkte: S.freund[id], stufe: stufe(S.freund[id]), typ: CHARAKTER[id].typ })), profil: profil(S.freund),
        unbekannt: GLEICHALTRIGE.filter((id) => S.herz[id] == null).length },
      staerken: Object.entries(S.staerken).map(([k, n]) => ({ ...STAERKEN[k], n })),
      entdeckt: S.entdeckt.length, gesamt: GEHEIMNISSE.length,
    };
  }
  // Durchsagen von Mme Weber, ab und zu beim Herumlaufen (nicht im Test, nicht im Gespräch)
  if (!new URLSearchParams(location.search).has('test')) {
    let durchsage = 0;
    setInterval(() => {
      if (!S || imGespraech || ui.ruhig || !steuerung.frei || document.hidden || Math.random() < 0.5) return;
      ui.toast('<b>📢 Durchsage</b><span>' + DURCHSAGEN[durchsage++ % DURCHSAGEN.length] + '</span>');
    }, 140000);
  }
  ui.onEinstellungen = (e) => { try { audio.setVolume(e.laut); audio.setMusicVolume(e.musik); } catch (x) { /* Ton noch nicht bereit */ } };
  ui.wendeEinst();
  ui.ohneName = (t) => (S && S.name && S.name.length > 1 ? t.split(S.name).join('{name}') : t);
  ui.onJournal = () => {
    if (!S || imGespraech) return;
    const b = bilanz();
    ui.journal({ name: S.name, stundenplan: S.stundenplan, leute: b.leute, freunde: b.freunde, staerken: b.staerken, geheimnisse: GEHEIMNISSE.filter((g) => S.entdeckt.includes(g.id)), gesamt: GEHEIMNISSE.length, lernkarten: S.lernkarten || [], leiter: leiterJournal(), zaehler: zaehler(), pass: ABZEICHEN.map((x) => ({ sy: x.sy, t: x.t, hinweis: x.hinweis, hat: (S.pass || []).includes(x.id) })) });
  };
  // Running Gags als Zähler im Journal (werden nie kleiner)
  function zaehler() {
    const z = [];
    if (S.benSchuld) z.push({ t: 'Ben hat sich geliehen', w: S.benSchuld + ' €' });
    if (S.benZurueck) z.push({ t: 'Ben hat zurückgezahlt', w: S.benZurueck + ' €' });
    if (S.jetonsGesamt) z.push({ t: 'Jetons (jetzt / verdient)', w: (S.jetons || 0) + ' / ' + S.jetonsGesamt });
    if (S.merke.automat) z.push({ t: 'Münzen im Automaten', w: String(S.merke.automat) });
    if (S.merke.korbRekord || S.merke.freiwurf) z.push({ t: 'Freiwurf-Rekord', w: Math.max(S.merke.korbRekord || 0, S.merke.freiwurf || 0) + ' von 5' });
    return z;
  }
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
  ui.onAktion = () => { if (!imGespraech && !gesperrt() && laeuft) { if (naechste) rede(naechste.id); else if (iaNah) aktion(iaNah); } };

  // ---------- Mit Dingen etwas machen (interaktion.js) ----------
  let tonCtx = null;
  function ton(art) {   // kleine Töne ohne Dateien: Klavier, Keyboard, Trommel, Klack, Pling, Platsch
    try {
      tonCtx = tonCtx || new (window.AudioContext || window.webkitAudioContext)();
      const c = tonCtx, t0 = c.currentTime;
      const laut = (ui.einstellungen ? ui.einstellungen().laut : 0.8) ?? 0.8;
      const note = (f, t, d = 0.35, typ = 'triangle', v0 = 0.18) => { const v = Math.max(0.0001, v0 * laut); const o = c.createOscillator(), g = c.createGain(); o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(v, t0 + t); g.gain.exponentialRampToValueAtTime(0.001, t0 + t + d); o.connect(g).connect(c.destination); o.start(t0 + t); o.stop(t0 + t + d + 0.05); };
      const rausch = (t, d = 0.12, v0 = 0.25) => { const v = Math.max(0.0001, v0 * laut); const b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), a = b.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = (Math.random() * 2 - 1) * (1 - i / a.length); const q = c.createBufferSource(), g = c.createGain(); g.gain.value = v; q.buffer = b; q.connect(g).connect(c.destination); q.start(t0 + t); };
      if (art === 'melodie') [523, 659, 784, 659, 698, 880].forEach((f, i) => note(f, i * 0.28, 0.5));
      else if (art === 'melodie2') [392, 392, 523, 494, 440, 523, 587].forEach((f, i) => note(f, i * 0.18, 0.25, 'square', 0.08));
      else if (art === 'trommel') [0, 0.25, 0.5, 0.62, 0.75].forEach((t, i) => (i % 2 ? rausch(t, 0.08, 0.3) : note(70, t, 0.25, 'sine', 0.5)));
      else if (art === 'klack') { rausch(0, 0.05, 0.4); note(140, 0.05, 0.2, 'square', 0.1); }
      else if (art === 'pling') { note(1046, 0, 0.3, 'sine', 0.15); note(1318, 0.1, 0.4, 'sine', 0.12); }
      else if (art === 'platsch') rausch(0, 0.35, 0.2);
    } catch (e) { /* kein Ton – egal */ }
  }
  // ---------- Unterricht (lektionen.js, aus tools/sprachen): eine Lektion als Spiel ----------
  // Lehrperson erklärt kurz → Tafelkarte mit Regel → Rollenspiel mit der Klasse (richtig: Freundschaft wächst; falsch: freundlich
  // korrigiert, nochmal) → Übungsblatt mit wechselnden Aufgaben → Lernkarte ins Journal. Später fragen Freunde „Weißt du noch?“.
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const LOB = ['Okay, verstanden.', 'Passt.', 'Alles klar.', 'Ah, okay.', 'Gut. Weiter.'];
  const FACHNAME = { deutsch: 'Deutsch', francais: 'Français', mathe: 'Mathe' };
  const alleLektionen = () => Object.values(LEKTIONEN).flat().flatMap((m) => m.lektionen.map((l) => ({ ...l, modulNr: m.nr, modulTitel: m.titel })));
  async function unterricht(fach, nr, id) {
    const m = (LEKTIONEN[fach] || []).find((x) => x.nr === nr), l = m && m.lektionen.find((x) => x.id === id);
    if (!l) return;
    S.lektionen = S.lektionen || {};
    const lp = FACHLEHRER[fach] || l.lehrer;
    await spiele([[lp, FACHNAME[fach] + ', Modul ' + nr + ': „' + l.titel + '“.'], ...l.intro.map((t) => [lp, t])]);
    if (l.merke) { ui.dialogZu(); await ui.merke({ titel: l.merke.titel, punkte: l.merke.punkte, ziel: l.ziel, fach: FACHNAME[fach] + ' · Modul ' + nr }); }
    // Lernformen je Lektion (tools/sprachen): Rollenspiel, Satzbau, Paare, Hören, Uhr, Groß/klein, Wegsuche im Haus, Blatt
    const ablauf = l.ablauf || [{ art: 'rollenspiel' }, { art: 'blatt' }];
    let gleich = 0, fehler = 0, best = null;
    for (const sch of ablauf) {
      ui.dialogZu();
      if (sch.art === 'rollenspiel') {
        await spiele([[lp, 'Jetzt ihr. Redet miteinander!']]);
        for (const r of l.rolle) {
          for (let versuch = 0; versuch < 3; versuch++) {
            const i = await ui.waehle(r.optionen.map((o) => ersetze(o)), sprecher(r.wer).wer + ': ' + ersetze(r.sagt));
            if (i === r.richtig) { if (!versuch) gleich++; await spiele([[r.wer, LOB[(gleich + versuch) % LOB.length]]]); freund(r.wer, 2, 'lernen'); break; }
            fehler++; await spiele([[r.wer, r.korrektur]]);
          }
        }
      } else if (sch.art === 'satzbau') fehler += (await ui.satzbau({ titel: l.titel, saetze: sch.saetze })).fehler;
      else if (sch.art === 'paare') fehler += (await ui.paare({ titel: l.titel, frage: sch.frage, paare: sch.paare })).fehler;
      else if (sch.art === 'hoeren') fehler += (await ui.hoeren({ titel: l.titel, items: sch.items })).fehler;
      else if (sch.art === 'uhr') fehler += (await ui.uhrspiel({ titel: l.titel, items: sch.items })).fehler;
      else if (sch.art === 'gross') fehler += (await ui.grossKlein({ titel: l.titel, saetze: sch.saetze })).fehler;
      else if (sch.art === 'weg') { await spiele([[lp, sch.intro || 'Noah wartet in der Kantine. Lauf hin, nur nach Beschreibung!']]); await wegsuche(sch); if (sch.ende) await spiele(sch.ende); }
      else if (sch.art === 'blatt') {
        await spiele([[lp, 'Zum Schluss: üben.']]); ui.dialogZu();
        const pool = l.uebung.map((u) => (u.length === 3 ? { t: u[0], wahl: u[1], a: u[2] } : { t: u[0], a: [u[1]] }));
        for (let runde = 0; runde < 10; runde++) {
          const a = pool.slice(); for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
          const st = SCHRITTE[S.schritt];
          const r = await ui.arbeitsblatt({ blatt: { id, modul: FACHNAME[fach] + ' · Modul ' + nr, titel: l.titel, untertitel: m.titel, erkl: { idee: l.ziel, schritte: l.merke ? l.merke.punkte : [], beispiel: l.karte }, info: [], aufgaben: a.slice(0, 8) }, name: S.name, datum: st ? st.tag : '', neu: true });
          if (!best || r.richtig > best.richtig) best = r;
          if (!r.neu) break;
        }
      }
    }
    await spiele([[lp, fehler === 0 ? 'Null Fehler. Fast unheimlich.' : 'Hat gedauert. Sitzt aber.']]);
    const alt = S.lektionen[id] || { mal: 0 };
    S.lektionen[id] = { fach, nr, formen: ablauf.map((x) => x.art), fehler, rolle: gleich + '/' + l.rolle.length, richtig: Math.max(alt.richtig || 0, best ? best.richtig : 0), gesamt: best ? best.gesamt : 8, mal: (alt.mal || 0) + 1 };
    const karte = l.titel + ': ' + l.karte;
    S.lernkarten = S.lernkarten || []; if (!S.lernkarten.includes(karte)) S.lernkarten.push(karte);
    if (best && best.richtig === best.gesamt) staerke('dranbleiben');
    sichern();
    ui.toast('<b>Lernkarte: ' + esc(l.titel) + '</b><span>' + esc(l.karte) + '</span>', 'ly-t-ent');
    jetons(alt.mal ? JETON.lektion : JETON.lektionNeu, 'Lektion geschafft');
  }
  // Wegsuche im Schulhaus: nur nach der gesagten Beschreibung laufen (kein Marker); jede Station gibt die nächste Anweisung
  let wegTick = null;
  function wegsuche(sch) {
    return new Promise((ok) => {
      ui.dialogZu(); input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null;
      let i = 0;
      const zeige = () => { ui.auftrag({ kapitel: 'Wege finden', titel: 'Folge der Beschreibung', ziel: sch.schritte[i].sagen }); ui.toast('<b>' + esc(sch.schritte[i].sagen) + '</b>'); };
      zeige();
      wegTick = () => {
        const p = steuerung.pos, z = sch.schritte[i];
        if (Math.hypot(p.x - z.x, p.z - z.z) > z.r) return;
        i++; ton('pling');
        if (i < sch.schritte.length) { zeige(); return; }
        wegTick = null; input.setEnabled(false); steuerung.frei = false;
        const st = SCHRITTE[S.schritt]; if (st && !S.fertig) ui.auftrag({ kapitel: kapName(st.kap), titel: st.titel, ziel: st.ziel });
        ok();
      };
    });
  }
  // „Weißt du noch?“ – Freunde fragen Gelerntes ab (verteilte Wiederholung, höchstens einmal je Person und Abschnitt)
  async function weisstDuNoch(id) {
    const gelernt = Object.keys(S.lektionen || {}); if (!gelernt.length) return false;
    const l = alleLektionen().find((x) => x.id === gelernt[Math.floor(Math.random() * gelernt.length)]); if (!l) return false;
    const eigene = l.rolle.filter((r) => r.wer === id), wahl = l.uebung.filter((u) => u.length === 3);
    let frage = null;
    if (eigene.length) { const r = eigene[0]; frage = { t: r.sagt, o: r.optionen, i: r.richtig, k: r.korrektur }; }
    else if (wahl.length) { const u = wahl[Math.floor(Math.random() * wahl.length)]; frage = { t: 'Weißt du noch? ' + u[0].replace('◻', '…'), o: u[1], i: u[1].indexOf(u[2]), k: 'Richtig wäre: ' + u[2] + '.' }; }
    if (!frage) return false;
    await spiele([[id, 'Hey, „' + l.titel + '“ – weißt du das noch?']]);
    const i = await ui.waehle(frage.o.map((o) => ersetze(o)), LEUTE[id].name + ': ' + ersetze(frage.t));
    if (i === frage.i) { await spiele([[id, 'Gewusst! Respekt.']]); freund(id, 3, 'lernen'); S.merke.gewusst = (S.merke.gewusst || 0) + 1; }
    else await spiele([[id, frage.k]]);
    sichern(); return true;
  }
  // Fächer am eigenen Platz: Mathe (mathe.js) und Deutsch (deutsch.js), je Modul Blätter mit Erklärung und neuen Aufgaben
  const FAECHER = { mathe: { name: 'Mathe', module: MATHE, blatt: matheBlatt }, deutsch: { name: 'Deutsch', module: DEUTSCH, blatt: deutschBlatt } };
  const fachStand = (id) => { if (id === 'mathe') return (S.mathe = S.mathe || { modul: 1, stand: {} }); S.fach = S.fach || {}; return (S.fach[id] = S.fach[id] || { modul: 1, stand: {} }); };
  async function blattWahl() {
    S.blaetter = S.blaetter || {};
    const w = await ui.blattWahl({ blaetter: BLAETTER, stand: S.blaetter, lehrer: paket && paket.eigen ? { titel: paket.titel } : null,
      faecher: Object.entries(FAECHER).map(([id, f]) => ({ id, name: f.name, module: f.module, modul: fachStand(id).modul, stand: fachStand(id).stand, lektionen: LEKTIONEN[id] || [], lstand: S.lektionen || {} })), fach: S.letztesFach || 'mathe' });
    if (w.startsWith('lektion:')) { const [, fid, nr, id] = w.split(':'); fachStand(fid).modul = +nr; S.letztesFach = fid; await unterricht(fid, +nr, id); return; }
    if (w === 'nix') return;
    const fid = w.split(':')[0];
    if (FAECHER[fid]) {   // Modul-Blatt: Erklärung, immer neue Aufgaben
      const [, nr, id] = w.split(':'), fs = fachStand(fid); fs.modul = +nr; S.letztesFach = fid;
      for (let runde = 0; runde < 20; runde++) {
        const b = FAECHER[fid].blatt(+nr, id, Date.now() + runde * 977); if (!b) return;
        const st = SCHRITTE[S.schritt];
        const r = await ui.arbeitsblatt({ blatt: b, name: S.name, datum: st ? st.tag : '', neu: true });
        const alt = fs.stand[id] || { richtig: 0, gesamt: r.gesamt, mal: 0 };
        fs.stand[id] = { richtig: Math.max(alt.richtig, r.richtig), gesamt: r.gesamt, mal: (alt.mal || 0) + 1 };
        if (r.richtig === r.gesamt) staerke('dranbleiben');
        sichern();
        jetons(r.richtig === r.gesamt ? JETON.runde : JETON.blatt, r.richtig === r.gesamt ? 'Alles richtig' : 'Geübt');
        if (!r.neu) break;
      }
      return;
    }
    if (w === 'lehrer') { await TUN.lernmoment(); return; }
    const b = BLAETTER.find((x) => x.id === w); if (!b) return;
    const st = SCHRITTE[S.schritt];
    const r = await ui.arbeitsblatt({ blatt: b, name: S.name, datum: st ? st.tag : '' });
    const alt = S.blaetter[b.id];
    if (!alt || r.richtig > alt.richtig) S.blaetter[b.id] = r;
    if (r.richtig === r.gesamt) staerke('dranbleiben');
    sichern();
    jetons(r.richtig === r.gesamt ? JETON.blattAlles : JETON.blatt, r.richtig === r.gesamt ? 'Blatt alles richtig' : 'Blatt geübt');
  }
  // ---------- Skateboard fahren (Skate-Ecke): 60 Sekunden, Punkte für Ollies und Sprünge über Rail, Box, Bank ----------
  let skateTick = null;
  // ---------- Basketball direkt am Korb im Hof (korb3d.js) – ersetzt das flache Freiwurf-Fenster ----------
  const korbSpiel = createKorbSpiel({ scene, camera, steuerung, input, root, ton: (a) => ton(a) });
  ui.freiwurf2d = ui.freiwurf;
  ui.freiwurf = async (o) => {
    const imG = imGespraech;
    const t = await korbSpiel.spiel(o || {});
    ui.letzteRunde = korbSpiel.letzteRunde;
    if (imG) { input.setEnabled(false); steuerung.frei = false; }
    return t;
  };
  // Eigenes Skateboard: flaches Deck mit hochgezogener Nase und Tail, Griptape, zwei Achsen, vier Rollen. Liegt quer zur
  // Gruppe (die Gruppe ist beim Fahren um 90° gedreht), also längs der Fahrtrichtung.
  function skateboard() {
    const b = new THREE.Group(), mat = (c) => new THREE.MeshLambertMaterial({ color: c });
    const df = (S && S.deck) || '#d9693f';
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.022, 0.23), mat(df)); deck.position.y = 0.085; b.add(deck);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.004, 0.215), mat('#2b2b33')); grip.position.y = 0.098; b.add(grip);
    for (const s of [-1, 1]) {
      const n = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.022, 0.23), mat(df)); n.position.set(s * 0.37, 0.1, 0); n.rotation.z = s * 0.38; b.add(n);
      const ng = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.004, 0.215), mat('#2b2b33')); ng.position.set(s * 0.37, 0.112, 0); ng.rotation.z = s * 0.38; b.add(ng);
      const achse = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.035, 0.2), mat('#b8c0ca')); achse.position.set(s * 0.21, 0.055, 0); b.add(achse);
      for (const q of [-1, 1]) { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.035, 12), mat('#f4f1ea')); r.rotation.x = Math.PI / 2; r.position.set(s * 0.21, 0.03, q * 0.115); b.add(r); }
    }
    // Länge längs x der Gruppe: nach der 90°-Drehung der Gruppe zeigt das Brett in Fahrtrichtung
    return b;
  }
  function skaten() {
    return new Promise((ok) => {
      let m = null;
      const g = req.geo['skate/skateboard'];
      // Brett längs der Fahrtrichtung, Figur steht seitlich darauf (Gruppe ist um 90° gedreht, steuerung.js) und oben auf dem Brett
      const koerper = spieler && spieler.group.children[0], hoch = koerper ? koerper.position.y : 0;
      if (spieler) { m = skateboard(); spieler.group.add(m); }
      if (koerper) koerper.position.y = hoch + 0.1;
      let punkte = 0, rest = 60, fertig = false, draussen = 0, aussen = 0;
      const ende = () => {
        if (fertig) return; fertig = true; skateTick = null;
        steuerung.brett = null; steuerung.tempo = 0; steuerung.pos.y = 0;
        if (m) spieler.group.remove(m);
        if (koerper) koerper.position.y = hoch;
        ui.skate(null); input.release('jump'); ok(punkte);
      };
      steuerung.brett = { y: 0, vy: 0, ueber: new Set(), start: 0, bereich: [-45.3, -28.3, 3.5, 18.7],
        onTrick: (name, p) => { punkte += p; ton('pling'); ui.skate({ punkte, trick: name + ' +' + p }); },
        onRaus: () => { draussen = performance.now(); } };
      ui.skate({ rest, punkte, weg: ende });
      skateTick = (dt) => {
        rest -= dt;
        if (rest <= 0 || imGespraech) { ende(); return; }
        if (rest < 59.4 && input.state.action) { ende(); return; }   // E noch einmal = absteigen (nicht das Loslassen vom Start)
        // aus der Skate-Ecke gerollt: zwei Sekunden Zeit zum Umdrehen, dann erst absteigen
        if (performance.now() - draussen < 150) { aussen += dt; if (aussen > 2) { ende(); return; } if (aussen < dt * 1.5) ui.skate({ punkte, trick: '↩ Zurück zur Rampe!' }); } else aussen = 0;
        ui.skate({ rest: Math.ceil(rest) });
      };
    });
  }
  async function spindAuf() {
    const dinge = alleDinge().filter((d) => (S.besitz || []).includes(d.id));
    const w = await ui.spind({ dinge, lampe: S.spindLampe || '', deck: S.deck || '', jetons: S.jetons || 0, gesamt: S.jetonsGesamt || 0, lernkarten: (S.lernkarten || []).length, anhaenger: S.anhaenger || null });
    if (w && w.art === 'spiegel') {
      const neu = await ui.editor({ aussehen: { ...(FIGUREN[S.figur] || FIGUREN[0]), ...(S.aussehen || {}) } });
      if (neu) { S.aussehen = neu; sichern(); const p = steuerung.pos.clone(), y = spieler.group.rotation.y; await spielerFigur(S.figur); spieler.group.position.copy(p); spieler.group.rotation.y = y; ui.toast('<b>Spiegel</b><span>Passt. Sieht nach dir aus.</span>'); }
      return;
    }
    if (w && w.art === 'song') ton(w.wert);
    if (w && w.art === 'deck') { S.deck = w.wert; sichern(); ui.toast('<b>' + esc(w.name) + '</b><span>Ab jetzt dein Brett an der Skate-Ecke.</span>'); }
    if (w && w.art === 'lampe') { S.spindLampe = w.wert; sichern(); }
    if (w && w.art === 'anhaenger') { S.anhaenger = S.anhaenger === w.wert ? null : w.wert; sichern(); anhaengerDran(); ui.toast('<b>' + esc(w.name) + '</b><span>' + (S.anhaenger ? 'Hängt jetzt an dir.' : 'Bleibt im Spind.') + '</span>'); }
  }
  const ia = createInteraktionen({ welt, steuerung, ui, zustand: () => S, sichern: () => sichern(), ton, blattWahl, spindAuf: () => spindAuf(),
    freiwurf: async (o) => ui.freiwurf(o), skate: () => skaten(), freund: (id, n, g) => freund(id, n, g),
    partner: () => { const b = besteFreunde()[0] || GLEICHALTRIGE.find((id) => S.herz[id] != null); return b ? { id: b, name: LEUTE[b].name } : null; } });
  let iaNah = null;
  // Mission „Tank auffüllen“ (Kurs-Ritual nach Modul 1): passende Tätigkeiten in der Welt zählen
  const TANKSTELLE = { korb: 'koerper', automat: 'koerper', skate: 'spass', tischtennis: 'spass', buch: 'sicherheit', sitzen: 'sicherheit', schlagzeug: 'dazu', keyboard: 'spass', spind: 'selbst', giessen: 'selbst', klavier: 'sicherheit' };
  function missionTank(tu) {
    const m = S && S.mission; if (!m || m.fertig || TANKSTELLE[tu] !== m.tank) return;
    const jetzt = Date.now(); if (m.zuletzt && jetzt - m.zuletzt < 20000) return;   // nicht dreimal hintereinander am selben Ort
    m.zuletzt = jetzt; m.mal = (m.mal || 0) + 1;
    if (m.mal >= 3) { m.fertig = true; S.missionen = (S.missionen || 0) + 1; ui.toast('<b>Mission geschafft</b><span>Tank dreimal gefüllt. Sticker für den Spind: 🫙</span>', 'ly-t-ent'); jetons(2, 'Mission'); }
    else ui.toast('<b>Tank +1</b><span>Mission: ' + m.mal + ' von 3.</span>');
    sichern();
  }
  async function aktion(i) {
    setTimeout(() => missionTank(i.tu), 0);
    if (i.tu === 'sitzen') { await ia.tu(i); sperreBis = performance.now() + 350; return; }
    if (i.tu === 'skate') { ui.hinweis(null); await ia.tu(i); sperreBis = performance.now() + 500; return; }
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null);
    try { await ia.tu(i); } finally { imGespraech = false; input.setEnabled(true); steuerung.frei = true; sperreBis = performance.now() + 350; }
  }

  // ---------- Schleife ----------
  let laeuft = false, raumAlt = undefined, geheimT = 0, klangT = 1, bankT = 0;
  // Während eines Minispiels auf eigener Fläche (Bandprobe, Tischtennis, Freiwurf) ruht die 3D-Welt fast ganz:
  // sie ist ohnehin verdeckt, und der Takt im Spiel braucht die Rechenzeit.
  let ruheN = 0;
  const loop = createLoop({ render: () => { if (ui.ebeneArt && ['spiel', 'szene', 'journal', 'handy', 'raus', 'ende', 'laden'].includes(ui.ebeneArt()) && (ruheN++ % 20)) return; rr.render({ night: sky.night, time: loop.time, sun: sky.sunDir, sunColor: sky.colors && sky.colors.light }); } });
  loop.add(() => input.beginFrame(), { order: -100, always: true });
  loop.add((dt) => {
    if (!laeuft) { camera.position.set(-36, 16, 64); camera.lookAt(0, 6, -10); return; }
    steuerung.update(dt);
    if (korbSpiel) korbSpiel.tick(dt);
    if (skateTick) skateTick(dt);
    if (wegTick) wegTick();
    if (spieler) spieler.update(dt);
  }, { order: -50, always: true });
  loop.add((dt, t) => {
    // Menschen: Bewegungen, zum Spieler drehen, Schilder nur nah
    const p = steuerung.pos;
    ausschnittNeu();
    for (const x of Object.values(leute)) {
      if (!x.f.group.visible) continue;
      if (imBild(x.f, x.pos)) x.f.update(dt);
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
    sprueche(dt);
    tiere.update(dt, t, { night: sky.night || 0, onGerd: () => {
      if (!S || imGespraech) return;
      const n = S.merke.gerd = (S.merke.gerd || 0) + 1; sichern();
      const G = ['Gerd. Die Taube. Mit Partyhut. Niemand weiß, warum.', 'Gerd guckt dich an. Du guckst Gerd an. Gerd gewinnt.', 'Gerd fliegt nie weg. Gerd hat keine Angst. Vor nichts.', 'Gerd pickt an deinem Schuh. Ihr seid jetzt Freunde.', 'Gerd hat heute einen schlechten Tag. Man sieht es am Hut.', 'Lina hat Gerd schon 40-mal gezeichnet. Gerd weiß das.'];
      ui.toast('<b>🐦 Gerd</b><span>' + G[(n - 1) % G.length] + '</span>', 'ly-t-herz'); ton('pling');
    } });
    // Bank-Momente: neben jemandem sitzen, nichts sagen. Nach 9 Sekunden zählt das.
    if (laeuft && S && steuerung.sitzt && !imGespraech) {
      const nah = Object.values(leute).find((x) => x.f.group.visible && BANK[x.id] && Math.hypot(x.pos.x - p.x, x.pos.z - p.z) < 1.9);
      const kap = (SCHRITTE[S.schritt] || {}).kap || 1, key = nah ? 'bank_' + nah.id + '_' + kap : '';
      if (nah && !S.merke[key]) { bankT += dt; if (bankT > 9) { bankT = 0; S.merke[key] = true; S.herz[nah.id] = (S.herz[nah.id] || 0) + 1; sichern(); ui.toast('<b>Zusammen sitzen</b><span>' + BANK[nah.id] + '</span>', 'ly-t-ent'); } }
      else bankT = 0;
    } else bankT = 0;
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
    // Richtungspfeil am Bildschirmrand, wenn das Ziel nicht im Bild ist (gegen Verlaufen)
    {
      let zn = null, dn = Infinity; for (const z of ziele) { const d = Math.hypot(z.x - p.x, z.z - p.z); if (d < dn) { dn = d; zn = z; } }
      let zeigen = false;
      if (zn && laeuft && !imGespraech && !ui.ebeneArt() && dn > 4) {
        zielV.set(zn.x, (zn.y || 1) + 0.5, zn.z).project(camera);
        let x = zielV.x, y = zielV.y; const hinten = zielV.z > 1;
        if (hinten) { x = -x; y = -y; if (Math.abs(x) < 0.05 && Math.abs(y) < 0.05) y = -1; }
        if (hinten || Math.abs(x) > 0.92 || Math.abs(y) > 0.92) {
          const m = Math.max(Math.abs(x), Math.abs(y)) || 1; x = x / m * 0.86; y = y / m * 0.8;
          zielPfeil.style.left = ((x + 1) * 50) + '%'; zielPfeil.style.top = ((1 - y) * 50) + '%';
          zielPfeil.style.transform = 'translate(-50%,-50%) rotate(' + Math.atan2(-y, x) + 'rad)';
          zeigen = true;
        }
      }
      zielPfeil.hidden = !zeigen;
    }
    if (!laeuft) return;
    // Raum
    const raum = welt.raumBei(p.x, p.z);
    const rid = raum ? raum.id : null;
    if (rid !== raumAlt) { if (raumAlt !== undefined) ui.raum(raum ? raum.name : 'Schulhof'); raumAlt = rid; }
    raumLicht.intensity += ((raum ? 1.15 : 0) - raumLicht.intensity) * Math.min(1, dt * 3);
    // Geräusche: draußen Wind und Vögel (am Tag), auf dem Hof Stimmen; drinnen leise, in der Kantine Geschirr. Kein Meer.
    audio.setAmbience({ waves: 0, wind: raum ? 0 : 0.35, birds: raum ? 0 : 1, day: 1 - (sky.night || 0), night: raum ? 0 : (sky.night || 0) });
    audio.update();
    klangT -= dt;
    if (klangT <= 0) {
      klangT = 0.7 + Math.random() * 0.9;
      if (!raum && p.z > -2 && p.z < 40 && Math.abs(p.x) < 46 && !(sky.night > 0.5)) audio.play('stimmen');
      else if (rid === 'kantine') audio.play('geschirr');
    }
    // Ansprechen
    naechste = imGespraech || steuerung.brett ? null : wenNah();
    iaNah = !naechste && !imGespraech && !probe && !steuerung.brett ? ia.naechste(p) : null;
    ui.hinweis(naechste ? 'Mit ' + naechste.def.name + ' reden' : iaNah ? iaNah.text : null);
    if (!imGespraech && !gesperrt() && (input.state.actionTap || input.state.action)) { if (naechste) rede(naechste.id); else if (iaNah) aktion(iaNah); }
    // Orte, die etwas auslösen
    const st = SCHRITTE[S.schritt];
    if (probe) probeSchritt(dt, p);
    if (!imGespraech && !startet && !steuerung.brett && st && !S.fertig && st.fertig.ort) {
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
  loop.add((dt, t) => { camera.updateMatrixWorld(); sky.update(dt, t, camera, steuerung.pos, veil); sky.cloudMat.emissiveIntensity = 0.62; fuellLicht.intensity = 0.95 * Math.max(0, Math.min(1, sky.sunDir.y * 3)); veil.update(dt, t); }, { order: 0, always: true });   // Wolken heller: keine dunklen Unterseiten
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
    welt, steuerung, leute, sky, camera, scene, req, ui, rr,
    springe: async (i) => { await starteSchritt(typeof i === 'number' ? i : SCHRITTE.findIndex((s) => s.id === i), true); },
    teleport: (ort, yaw) => { const o = typeof ort === 'string' ? welt.orte[ort] : ort; steuerung.teleport(o.x, o.z, yaw !== undefined ? yaw : o.yaw); },
    rede, los, audio, SITZ, input, get spruch() { return { wer: !!spruchWer }; }, get naechste() { return naechste && naechste.id; },
    get probe() { return probe; }, set mutTempo(v) { mutTempo = v; },
    daten: { SCHRITTE, STATISTEN, LEUTE, BLAETTER, MATHE, LEKTIONEN, GESPRAECHE }, ia, aktion, get iaNah() { return iaNah && iaNah.tu; },
  };

  onProgress(1, '');
  if (test && params.get('start')) { await los(true, +(params.get('figur') || 0), 'Sam'); return window.LYCEE; }
  const lehrer = () => ui.lehrer({ paket, bereinige,
    speichern: (b) => { speicherePaket(b); paket = b; },
    zuruecksetzen: () => { speicherePaket(null); paket = GRUNDPAKET; } });
  ui.speicherName = () => speicherName();
  const plaetze = () => [1, 2, 3].map((p) => { const s2 = lies(p); return s2 && s2.name ? { name: s2.name, kap: (SCHRITTE[s2.schritt] || {}).kap || 1, fertig: !!s2.fertig, zeit: s2.zeit || 0 } : null; });
  const w = await ui.titel({ gespeichert: !!(S && S.name), figuren: FIGUREN, lehrer, platz, plaetze,
    wechsle: (p) => { platz = p; try { localStorage.setItem('lycee.platz', String(p)); } catch (e) { /* privat */ } S = neuStart(lies()); return !!(S && S.name); } });
  if (w.weiter) await los(false); else await los(true, w.figur, w.name);
  return window.LYCEE;
}
