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
import { createMusic, THEMES as MUSIK_THEMEN } from '../engine/music.js';
import { createSpeech } from '../engine/speech.js';
import { createRenderer, detectQuality } from '../engine/renderer.js';
import { createVeil } from '../world/veil.js';
import { createSky } from '../world/sky.js';
import { lambertVC } from '../world/landmarks.js';
import { baueWelt } from './welt.js';
import { baueRequisiten, stelle } from './requisiten.js';
import { baueNatur } from './natur.js';
import { STAMM, stammSzene, stammPlan } from './stammgaeste.js';
import { ORTE_UMLAND, DORF_DEKO, tagTextur, wandbild } from './dorf.js';
import { SIT_LEUTE, SZENEN, sitSichtbar, sitOffen, SIT_ZONEN, lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest, spiel, dach, fundkiste, CHAT_NAMEN, zurueckbringen, sitSaetze, sitRueckblick, sitAntwortenOffen, zaun, roller } from './situationen.js';
const SIT_FN = { wald: lichtung, laden, graffiti, halle, wette, kiste, vape, link, video, fest, spiel, dach, fundkiste, zaun, roller };
import { createHund, HUND_ERSTMAL, HUND_MOMENTE } from './hund.js';
import { ladePerson, namensschild, SITZ } from './figuren.js';
import { fussSchatten, WOLKEN } from './texturen.js';
import { createHandschlag, HANDSCHLAEGE } from './handschlag.js';
import { createTischtennis } from './tt3d.js';
import { createZufall } from './zufall.js';
// Das Schuljahr vergeht: Monat auf der Zeitkarte (die Kapitel liegen Wochen auseinander, nicht direkt hintereinander)
const MONAT = { 1: 'September', 2: 'September', 3: 'Oktober', 4: 'November', 5: 'Dezember', 6: 'Februar', 7: 'März', 8: 'April', 9: 'Juni', 10: 'Juli' };
import { createInteraktionen } from './interaktion.js';
import { FAEDEN } from './faeden.js';
import { GEDAECHTNIS, RUF, BELAUSCHT } from './gedaechtnis.js';
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
import { installSkillsRaum } from './skillsraum.js';
import { JETON, ANGEBOTE, alleDinge } from './belohnungen.js';
import { ladePaket, speicherePaket, bereinige, waehle, GRUNDPAKET } from './lernen.js';

// Drei Spielstände: Platz 1 = „lycee.stand“ (wie immer), Platz 2/3 = „lycee.stand.2/.3“. Welcher gerade spielt: „lycee.platz“.
let platz = 1;
try { platz = Math.min(3, Math.max(1, +localStorage.getItem('lycee.platz') || 1)); } catch (e) { /* privat */ }
const speicherName = (p = platz) => (p === 1 ? 'lycee.stand' : 'lycee.stand.' + p);
// Spielstand mit Sicherungskopie (AAA: nie alles verlieren): alle 5 Minuten wandert der letzte gute Stand nach „….kopie“.
// Ist der Hauptstand kaputt (z. B. Akku leer beim Schreiben), wird die Kopie geladen.
const lies = (p = platz) => {
  try { return JSON.parse(localStorage.getItem(speicherName(p)) || 'null'); }
  catch (e) { try { return JSON.parse(localStorage.getItem(speicherName(p) + '.kopie') || 'null'); } catch (e2) { return null; } }
};
let kopieZeit = 0;
let speicherFehler = null;   // wird im Spiel gesetzt: zeigt eine freundliche Meldung (Speicher voll / privat)
const schreib = (v) => { try { if (v) { v.zeit = Date.now(); if (Date.now() - kopieZeit > 300000) { const alt = localStorage.getItem(speicherName()); if (alt) { try { JSON.parse(alt); localStorage.setItem(speicherName() + '.kopie', alt); kopieZeit = Date.now(); } catch (e2) { /* kaputter Stand wird nicht kopiert */ } } } localStorage.setItem(speicherName(), JSON.stringify(v)); } else localStorage.removeItem(speicherName()); return true; } catch (e) { if (speicherFehler) speicherFehler(e); return false; } };
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
  const rr = createRenderer({ canvas, quality: detectQuality(), events, look: 'klar' });
  const q = rr.quality;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.12, 700);
  rr.onResize((s) => { camera.aspect = s.aspect || (s.w / s.h); camera.fov = camera.userData.baseFov = s.portrait ? 64 : 52; camera.updateProjectionMatrix(); });
  const input = createInput({ root, events });
  const audio = createAudio();
  const speech = createSpeech({ events, audio });
  // Musik (AAA: Stimmung je Ort, weiche Übergänge, leiser beim Sprechen). Eigene ruhige Themen für die Annexe,
  // synthetisch über die Musik-Engine (keine fremden Stücke). Lautstärke über den Regler „Musik“.
  Object.assign(MUSIK_THEMEN, {
    annexeHof: { name: 'Annexe: Hof', root: 60, scale: 'pentaMajor', bpm: 82, prog: [0, 5, 3, 4],
      layers: [{ inst: 'pad', role: 'pad', gain: 0.55, oct: 0 }, { inst: 'gitarre', role: 'arp', gain: 0.4, oct: 0, every: 2 }, { inst: 'bass', role: 'bass', gain: 0.35, oct: -1 }, { inst: 'glocken', role: 'melody', gain: 0.32, oct: 0, density: 0.22 }] },
    annexeDrinnen: { name: 'Annexe: drinnen', root: 57, scale: 'ionian', bpm: 70, prog: [0, 3, 5, 4],
      layers: [{ inst: 'pad', role: 'pad', gain: 0.45, oct: 0 }, { inst: 'marimba', role: 'arp', gain: 0.3, oct: 0, every: 2 }, { inst: 'zupf', role: 'sparkle', gain: 0.25, oct: 0, density: 0.16 }, { inst: 'chor', role: 'pad', gain: 0.2, oct: 0 }] },
    annexeTitel: { name: 'Annexe: Titel', root: 62, scale: 'lydian', bpm: 76, prog: [0, 4, 5, 3],
      layers: [{ inst: 'pad', role: 'pad', gain: 0.6, oct: 0 }, { inst: 'glocken', role: 'melody', gain: 0.4, oct: 0, density: 0.3 }, { inst: 'bass', role: 'bass', gain: 0.3, oct: -1 }, { inst: 'glitzer', role: 'sparkle', gain: 0.3, oct: 1, density: 0.1 }] },
  });
  // Raumklang (AAA: Räume klingen verschieden): Geräusche gehen je nach Raum mehr oder weniger in den Hall
  let hallSend = null;
  const HALL = { gang: 0.6, halle: 0.55, aula: 0.7, turnhalle: 0.8, bogenO: 0.4, bogenW: 0.4, neubauFlur: 0.5, kantine: 0.35, wc: 0.5, cdi: 0.04, lesesaal: 0.04, sepas: 0.08, gewaechshaus: 0.12 };
  function raumHall(rid) {
    try {
      const b = audio.buses; if (!b) return;
      if (!hallSend) { hallSend = audio.context.createGain(); hallSend.gain.value = 0; b.sfx.connect(hallSend); hallSend.connect(b.reverb); }
      const ziel = rid == null ? 0.06 : HALL[rid] != null ? HALL[rid] : 0.18;   // draußen fast trocken, Säle etwas Hall
      hallSend.gain.setTargetAtTime(ziel, audio.context.currentTime, 0.4);
    } catch (e) { /* Ton noch nicht bereit */ }
  }
  const musik = createMusic({ audio, events });
  musik.setIntensity(0.55); musik.setVeil(0.25); musik.setRegion('annexeTitel');
  { const los1 = () => { try { musik.start(); } catch (e) { /* Ton gesperrt */ } }; document.addEventListener('pointerdown', los1, { once: true }); document.addEventListener('keydown', los1, { once: true }); }
  // Schulgeräusche (synthetisch, leise): Stimmengewirr auf dem Hof, Geschirr in der Kantine. Wind und Vögel: engine/audio.js
  audio.register('stimmen', (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers;
    for (let i = 0; i < 3; i++) h.burst(t + Math.random() * 0.7, 0.25 + Math.random() * 0.4, 'bandpass', 320 + Math.random() * 800, 6 + Math.random() * 5, 0.005 + Math.random() * 0.007, bus);
  });
  // Unterricht hinter geschlossenen Türen: tiefes, gedämpftes Murmeln im Gang (nur während der Stunden)
  audio.register('unterricht', (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers;
    for (let i = 0; i < 2; i++) h.burst(t + Math.random() * 0.9, 0.35 + Math.random() * 0.5, 'bandpass', 180 + Math.random() * 260, 4 + Math.random() * 3, 0.004 + Math.random() * 0.004, bus);
  });
  // Bumm. Tschak. Bumm-bumm. Tschak. – Noor am Schlagzeug (Bassdrum, Snare, Hi-Hat)
  const trommel = (laut) => (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers, b = 0.3;
    const kick = (z) => h.tone('sine', 62, t + z, 0.004, 0.06 * laut, 0.2, bus), snare = (z) => h.burst(t + z, 0.13, 'bandpass', 1900, 0.8, 0.028 * laut, bus), hat = (z) => h.burst(t + z, 0.035, 'highpass', 7200, 1, 0.009 * laut, bus);
    kick(0); snare(2 * b); kick(4 * b); kick(5 * b); snare(6 * b); for (let i = 0; i < 8; i++) hat(i * b);
  };
  audio.register('trommel', trommel(1)); audio.register('trommelLeise', trommel(0.35));
  // Klänge der offenen Welt und der Situationen: Vögel im Wald, Sprühdose, Dose aufmachen
  audio.register('vogel', (ctx, bus) => {
    const t = ctx.currentTime, h = audio.helpers, base = 2900 + Math.random() * 1500, n = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) { const tt = t + i * (0.09 + Math.random() * 0.05); const { o } = h.tone('sine', base, tt, 0.008, 0.03, 0.06, bus); o.frequency.exponentialRampToValueAtTime(base * (1.2 + Math.random() * 0.4), tt + 0.05); }
  });
  audio.register('spruehen', (ctx, bus) => { const t = ctx.currentTime, h = audio.helpers; h.burst(t, 0.9, 'highpass', 3800, 0.6, 0.05, bus); h.burst(t + 0.02, 0.7, 'bandpass', 6500, 1.2, 0.025, bus); });
  audio.register('dose', (ctx, bus) => { const t = ctx.currentTime, h = audio.helpers; h.tone('square', 1900, t, 0.001, 0.05, 0.02, bus); h.burst(t + 0.01, 0.35, 'highpass', 4200, 0.8, 0.06, bus); });
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
  // Laub wiegt sich im Wind: je höher, desto mehr (Hauptbiegung), dazu feines Flattern. Kostet fast nichts (nur Vertex-Shader).
  const windZeit = { value: 0 };
  const materialLaub = veil.patch(new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }), { key: 'lm-lycee-laub', ramp: 'props', uniforms: { uWind: windZeit },
    vertex: (vs) => vs.replace('void main() {', 'uniform float uWind;\nvoid main() {').replace('#include <begin_vertex>', `#include <begin_vertex>
    float wH = max(position.y - 1.6, 0.0);
    float wP = position.x * 0.31 + position.z * 0.23;
    float wS = sin(uWind * 1.1 + wP) * 0.6 + sin(uWind * 2.3 + wP * 1.7) * 0.4;
    transformed.x += wS * 0.03 * wH;
    transformed.z += cos(uWind * 0.9 + wP) * 0.018 * wH;
    transformed.y += sin(uWind * 3.7 + position.x * 3.0 + position.z * 2.0) * 0.012 * min(wH, 1.0);`) });
  const welt = baueWelt({ material, materialInnen, materialLaub });
  // Nächster echter Sitz (Stuhl, Bank, Kübelrand): Figuren sitzen AUF etwas – mit dessen Höhe und Richtung
  const sitzSuche = (x, z, r = 1.3) => { let best = null, bd = r; for (const q of welt.sitze || []) { const d = Math.hypot(q.x - x, q.z - z); if (d < bd) { bd = d; best = q; } } return best; };
  Object.assign(welt.orte, ORTE2, ORTE3, ORTE4, ORTE6, ORTE_N3, ORTE_UMLAND);
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
  let natur = null;
  try { natur = await baueNatur({ welt, scene, veil, windZeit, wenig: q.name === 'low' }); } catch (e) { console.warn('Natur', e); }
  const bus = req.eigene.bus;
  let reqSichtTakt = 0;

  await schritt(0.6, 'Die Klasse kommt …');
  const ui = createUI({ root, input, speech });
  situationen(ui, { name: () => 'Du', ersetze: (t) => ersetze(t), speech });
  installSkillsRaum(ui, { vorlesen: (t) => { try { if (speech && speech.available) speech.speak(t, { interrupt: true }); } catch (e) { /* keine Stimme */ } }, ton: (a) => { try { audio.play(a === 'pling' ? 'chime' : 'click'); } catch (e) { /* Ton */ } } });
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
  // Schulklingel (elektrisch, synthetisch): Rechteck mit schnellem Zittern, durch einen Tiefpass, 1,3 s
  try {
    audio.register('klingel', (ctx, bus) => {
      const t = ctx.currentTime, o = ctx.createOscillator(), am = ctx.createOscillator(), amG = ctx.createGain(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      o.type = 'square'; o.frequency.value = 1180; am.frequency.value = 24; amG.gain.value = 0.5; lp.type = 'lowpass'; lp.frequency.value = 2600;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.03); g.gain.setValueAtTime(0.05, t + 1.2); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.35);
      const mod = ctx.createGain(); mod.gain.value = 0.5; am.connect(amG); amG.connect(mod.gain);
      o.connect(mod); mod.connect(lp); lp.connect(g); g.connect(bus);
      o.start(t); am.start(t); o.stop(t + 1.4); am.stop(t + 1.4);
    });
  } catch (e) { /* Ton nicht verfügbar */ }
  // Schritte hörbar: Holz in Sälen, CDI, SePAS, Turnhalle; sonst Fliesen/Pflaster
  const vib = (m) => { try { if (navigator.vibrate && matchMedia('(pointer: coarse)').matches && !(ui.wenigBewegung) && ui.vibration !== false) navigator.vibrate(m); } catch (e) { /* egal */ } };
  steuerung.onSchritt = (rennt) => {
    if (imGespraech || !laeuft) return;
    const p = steuerung.pos, r = welt.raumBei(p.x, p.z), holz = r && /saal|cdi|profs|sepas|turnhalle/.test(r.id);
    // Boden bestimmt den Klang: Holz, Fliesen (drinnen), Pflaster (Hof und Wege), Rasen (außerhalb)
    const pflaster = (Math.abs(p.x) < 46 && p.z > -2 && p.z < 40.5) || (Math.abs(p.x) < 62 && p.z > -4 && p.z < 2) || (p.z > 44 && p.z < 52);
    try { audio.footstep(holz ? 'wood' : r ? 'tile' : pflaster ? 'rock' : 'grass', rennt ? 0.55 : 0.38); } catch (e) { /* Ton noch nicht bereit */ }
  };
  const tiere = createTiere({ scene, steuerung });
  // Bonbon, der Schulhund der SePAS (hund.js): Körbchen neben dem Regal
  const hund = createHund({ scene, x: -13.6, z: -9.6, rot: 0.6 });
  welt.kasten.push({ x0: -14.25, x1: -12.95, z0: -10.25, z1: -8.95, y0: 0, y1: 0.5 });
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
  // Speichern sichtbar machen (AAA: „gespeichert“-Zeichen), aber gedrosselt – höchstens alle 20 s ein kleines Häkchen
  let gespeichertZeig = 0, fehlerGezeigt = false;
  speicherFehler = () => { if (fehlerGezeigt) return; fehlerGezeigt = true; ui.toast('<b>⚠️ Speichern klappt gerade nicht</b><span>Der Speicher im Browser ist voll oder gesperrt (privates Fenster?). Tipp: ⚙ Einstellungen → Sicherungscode kopieren.</span>', 'ly-t-kalt'); };
  const sichern = () => { if (S && S.merke) passPruefen(); if (S) S.zuletzt = Date.now(); const ok = schreib(S); if (ok && laeuft && performance.now() - gespeichertZeig > 20000) { gespeichertZeig = performance.now(); ui.gespeichert && ui.gespeichert(); } };

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
      const sp = haltung === 'sitzt' ? sitzSuche(x, z) : null;
      if (sp) { x = sp.x; z = sp.z; yaw = sp.rot; }
      p.f.sitzen(haltung === 'sitzt', sp ? sp.h || 0.47 : 0.47);
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
    { modell: 'menschen', stil: 'Beach', haut: '#9b6a45', haar: '#1b1410', oben: '#e85d75', unten: '#4a4f5c', schuhe: '#f2f2f2', hoehe: 1.74, kopf: 'cap', kopfFarbe: '#2b2b33', weg: [[-27, -15.0], [23.5, -15.0]], tempo: 1.2 },
    { modell: 'frauen', stil: 'Adventurer', haut: '#e0b48c', haar: '#2b1d14', oben: '#3fa66b', unten: '#2d3748', schuhe: '#6b4e3a', hoehe: 1.6, weg: [[23, -15.3], [-25, -15.3]], tempo: 1.1 },
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
    // Neubau: malt an der Staffelei, sitzt am PC; Lesesaal: zwei lesen
    { modell: 'frauen', stil: 'Casual', haut: '#e0b48c', haar: '#7a4a2a', oben: '#e9b949', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.6, steht: [60.0, -51.3, Math.PI, 'redet'] },
    { modell: 'menschen', stil: 'Casual2', haut: '#c68e64', haar: '#1b1410', oben: '#4f88c8', unten: '#3a3f4b', schuhe: '#ffffff', hoehe: 1.66, steht: [50.0, -43.85, Math.PI, 'sitzt'] },
    { modell: 'frauen', stil: 'Adventurer', haut: '#f1c7a2', haar: '#c9a15a', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.6, steht: [8.25, -65.65, 0, 'sitzt'] },
    { modell: 'menschen', stil: 'Casual', haut: '#9b6a45', haar: '#1b1410', oben: '#d9693f', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.7, steht: [19.7, -58.35, Math.PI, 'sitzt'] },
  ];
  // Stammgäste (stammgaeste.js): feste Orte, Namensschild, eigene Geschichte über das Jahr
  // Leben im Dorf: Leute auf der Rue du Moulin, in der Gasse und eine Joggerin auf dem Waldweg
  STATISTEN.push(
    { modell: 'menschen', stil: 'Casual', haut: '#f0c9a8', haar: '#9a9a9a', oben: '#5a6b7a', unten: '#3a3f4b', schuhe: '#3a2a1c', hoehe: 1.72, weg: [[-24, 83.3], [0.8, 83.3], [1.2, 84.5], [8.4, 84.5], [8.8, 83.3], [26, 83.3], [52, 83.3], [96, 83.3], [52, 83.3], [26, 83.3], [8.8, 83.3], [8.4, 84.5], [1.2, 84.5], [0.8, 83.3]], tempo: 0.8 },   // um das Bushäuschen herum
    { modell: 'frauen', stil: 'Casual', haut: '#c68e64', haar: '#2b1d14', oben: '#c0392b', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.64, weg: [[90, 91], [50, 91.1], [20, 91], [-20, 91.1]], tempo: 1.0 },
    { modell: 'menschen', stil: 'Casual2', haut: '#a0694a', haar: '#1b1410', oben: '#e9b949', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.76, weg: [[32, 47], [32.2, 70], [32, 82.6], [40, 83], [32, 82.6], [32.2, 70]], tempo: 1.05 },
    { modell: 'frauen', stil: 'Adventurer', haut: '#f1c7a2', haar: '#c9a15a', oben: '#2fb8a8', unten: '#2b2b33', schuhe: '#e85d75', hoehe: 1.66, weg: [[-64, -8], [-63.8, -50], [-64, -88], [-63.8, -50]], tempo: 1.6 },
  );
  for (const st of STAMM) STATISTEN.push({ ...st.aussehen, steht: [...st.steht], stamm: st.id });
  // Figuren der Situationen (situationen.js): Ältere an der Lichtung, Mika, Mo vor dem Laden, Tante Lisette in der Épicerie
  for (const [id, d] of Object.entries(SIT_LEUTE)) STATISTEN.push({ ...d.aussehen, steht: [...d.steht], sitPerson: id });
  let brett = null;
  async function statistenLaden() {
    for (const d of STATISTEN) {
      const f = await ladePerson(veil, d);
      f.group.add(fussSchatten()); scene.add(f.group);
      if (d.stamm) { const sg = STAMM.find((q) => q.id === d.stamm); if (sg) f.group.add(namensschild(sg.name, sg.farbe)); }
      if (d.sitPerson && !SIT_LEUTE[d.sitPerson].stumm) { const sl = SIT_LEUTE[d.sitPerson]; f.group.add(namensschild(sl.name, sl.farbe)); }
      const st = d.steht || (d.skate ? [d.skate[0], d.skate[2], Math.PI / 2] : null);
      const p = new THREE.Vector3(st ? st[0] : d.weg[0][0], 0, st ? st[1] : d.weg[0][1]);
      const x = { d, f, p, i: 1, warte: Math.random() * 3, h: { x: p.x, z: p.z, r: 0.3 }, richtung: 1 };
      f.group.position.copy(p);
      if (st) f.group.rotation.y = st[2];
      const halt = d.steht && d.steht[3];
      if (halt === 'sitzt') { const sp = sitzSuche(f.group.position.x, f.group.position.z); if (sp) { f.group.position.set(sp.x, 0, sp.z); f.group.rotation.y = sp.rot; d.steht = [sp.x, sp.z, sp.rot, 'sitzt']; } f.sitzen(true, sp ? sp.h || 0.47 : 0.47); f.spiele('Idle'); }
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
  // Während der Stunden ist der Hof fast leer (ein Viertel bleibt: Aufsicht, Raucherecke, Schwänzer); in Pausen sind alle draußen
  function statistenNachZeit(uhr) {
    const unterricht = (uhr >= 8.0 && uhr < 9.85) || (uhr >= 10.4 && uhr < 11.95) || (uhr >= 13.6 && uhr < 15.4);
    statisten.forEach((x, n) => {
      const draussen = !welt.raumBei(x.p.x, x.p.z) && x.p.z > 2;
      const weg = unterricht && draussen && n % 4 !== 0 && !(x.d.steht && x.d.steht[3] === 'raucht') && !x.d.stamm && !x.d.sitPerson;
      if (!!x.weg === weg) return;
      x.weg = weg; x.f.group.visible = !weg; if (x.f.group.children[0]) x.f.group.children[0].visible = !weg;
      x.h.x = weg ? 1e5 : x.p.x; x.h.z = weg ? 1e5 : x.p.z;
    });
    stammUmsetzen(uhr);
    sitSichtbarkeit();
    // Neue Situation verfügbar: einmal eine Nachricht aufs Handy, die neugierig macht (wie ein Gruppenchat)
    if (S && risikoAn()) { const kap = (SCHRITTE[S.schritt] || {}).kap || 1;
      const sid = (SCHRITTE[S.schritt] || {}).id;
      for (const [id, sz] of Object.entries(SZENEN)) if (sz.teaser && sitOffen(id, kap, S.merke, sid, uhrJetzt) && !S.merke['sitTeaser_' + id]) { S.merke['sitTeaser_' + id] = true; (S.merke.nachrichten = S.merke.nachrichten || []).push(...(Array.isArray(sz.teaser[0]) ? sz.teaser : [sz.teaser])); break; } }
    // Nachrichten aus Situationen (Gruppe, Sina, Mika …) kommen beim nächsten Schritt aufs Handy
    if (S && S.merke && ui.handyNeu) ui.handyNeu(S.merke.handyNeu || 0);
    nachrichtenRein();
    // Nach einem schweren Ausgang: einmal ein leiser Hinweis, dass man noch schreiben kann
    if (S && risikoAn()) { const o = sitAntwortenOffen(S.merke).find((x) => !S.merke['antwortTipp_' + x.id]);
      if (o) { S.merke['antwortTipp_' + o.id] = true; setTimeout(() => ui.toast('<b>📱 Du kannst ' + o.an + ' noch schreiben.</b><span>Handy: Taste N</span>'), 9000); sichern(); } }
  }
  function tagLabel() { const st = SCHRITTE[S.schritt] || {}; return 'Kapitel ' + (st.kap || 1) + (st.tag ? ' · ' + st.tag : ''); }
  function nachrichtenRein() {
    const nq = S && S.merke && S.merke.nachrichten;
    if (!nq || !nq.length) return;
    S.merke.nachrichten = []; S.merke.handyLog = (S.merke.handyLog || []).concat(nq.map(([von, t]) => [von, t, tagLabel()])).slice(-40);
    S.merke.handyNeu = (S.merke.handyNeu || 0) + nq.length; ui.handyNeu && ui.handyNeu(S.merke.handyNeu);
    nq.forEach(([von, t], i) => setTimeout(() => ui.toast('<b>📱 ' + von + '</b><span>' + t + '</span>'), 3500 + i * 2600)); sichern();
  }
  // Situationen: wer ist gerade da (Kapitel, Schalter „Schwierige Situationen“, was schon passiert ist)
  const risikoAn = () => !ui.einstellungen || ui.einstellungen().risiko !== false;
  function sitSichtbarkeit() {
    if (!S) return;
    const kap = (SCHRITTE[S.schritt] || {}).kap || 1;
    for (const x of statisten) {
      if (!x.d.sitPerson) continue;
      const v = sitSichtbar(x.d.sitPerson, kap, S.merke || {}, risikoAn(), S.schritt, (SCHRITTE[S.schritt] || {}).id, uhrJetzt);
      x.weg = !v; x.f.group.visible = v; if (x.f.group.children[0]) x.f.group.children[0].visible = v;
      x.h.x = v ? x.p.x : 1e5; x.h.z = v ? x.p.z : 1e5;
    }
    // Dex’ Wandbild im Neubau-Flur – nur, wenn man ihn zu Mme Kiesser geschickt hat (ab dem nächsten Kapitel)
    if (!DORF_DEKO.dexWand) {
      const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 512; const g = cv.getContext('2d');
      const hg = g.createLinearGradient(0, 0, 1024, 512); hg.addColorStop(0, '#2b3a55'); hg.addColorStop(1, '#5a3a7a'); g.fillStyle = hg; g.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 40; i++) { g.fillStyle = ['#e85d75', '#2fb8a8', '#e9b949', '#9b7bc8'][i % 4]; g.globalAlpha = 0.25; g.beginPath(); g.arc((i * 137) % 1024, (i * 89) % 512, 6 + (i % 5) * 4, 0, 7); g.fill(); }
      g.globalAlpha = 1;
      // Bus als Wal (aus Dex’ Skizzenbuch)
      g.fillStyle = '#2fb8a8'; g.beginPath(); g.ellipse(700, 300, 230, 110, -0.08, 0, 7); g.fill();
      g.fillStyle = '#e9f6f4'; for (let i = 0; i < 5; i++) g.fillRect(540 + i * 62, 250 - i * 4, 44, 36);
      g.fillStyle = '#2fb8a8'; g.beginPath(); g.moveTo(920, 290); g.lineTo(1010, 220); g.lineTo(990, 330); g.fill();
      g.strokeStyle = '#e9f6f4'; g.lineWidth = 6; g.beginPath(); g.moveTo(760, 190); g.quadraticCurveTo(750, 120, 800, 100); g.moveTo(760, 190); g.quadraticCurveTo(770, 120, 720, 100); g.stroke();
      g.fillStyle = '#1b1b1f'; g.beginPath(); g.arc(560, 380, 26, 0, 7); g.arc(820, 380, 26, 0, 7); g.fill();
      // fliegende Buchstaben
      g.font = 'bold 120px Impact, system-ui'; g.lineWidth = 10; g.lineJoin = 'round';
      [['A', 90, 180, -0.3, '#e85d75'], ['N', 200, 140, 0.2, '#e9b949'], ['N', 310, 200, -0.15, '#9b7bc8'], ['E', 110, 350, 0.25, '#e85d75'], ['X', 220, 390, 0.1, '#2fb8a8'], ['E', 330, 330, -0.2, '#ffffff']].forEach(([t, x, y, r, c]) => { g.save(); g.translate(x, y); g.rotate(r); g.strokeStyle = '#1b1b1f'; g.strokeText(t, 0, 0); g.fillStyle = c; g.fillText(t, 0, 0); g.restore(); });
      g.font = 'italic bold 30px Georgia, serif'; g.fillStyle = '#ffffff'; g.fillText('Dex · 5ème · mit Mme Kiesser', 40, 480);
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
      const wm = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 2.0), new THREE.MeshLambertMaterial({ map: tex }));
      wm.position.set(43.87, 1.75, -54.0); wm.rotation.y = -Math.PI / 2; wm.visible = false; scene.add(wm); DORF_DEKO.dexWand = wm;
    }
    // Schild an den Umkleiden (Turnhalle), nachdem man Romy geholfen hat – Fernand hat es gemacht
    if (!DORF_DEKO.umkleide) {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 320; const g = cv.getContext('2d');
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, 512, 320); g.strokeStyle = '#c0392b'; g.lineWidth = 16; g.strokeRect(8, 8, 496, 304);
      g.font = 'bold 110px system-ui'; g.textAlign = 'center'; g.fillText('📵', 256, 128);
      g.fillStyle = '#2b3a55'; g.font = 'bold 46px system-ui'; g.fillText('Handys bleiben', 256, 210); g.fillText('draußen.', 256, 262);
      g.fillStyle = '#8a5a3a'; g.font = 'italic 24px Georgia, serif'; g.fillText('– Herr Mesenberg & Fernand', 256, 300);
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
      const gr = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
      for (const zz of [-24.0, -10.8]) { const k = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.39), mat); k.position.set(34.3, 1.6, zz + 0.98); k.rotation.y = Math.PI / 2; gr.add(k); }
      gr.visible = false; scene.add(gr); DORF_DEKO.umkleide = gr;
    }
    // Sachas E-Roller in der Gasse (Roller-Situation)
    if (!DORF_DEKO.roller) {
      const gr = new THREE.Group(), dunkel = new THREE.MeshLambertMaterial({ color: '#2b2b33' }), lila = new THREE.MeshLambertMaterial({ color: '#7a5af5' }), grau = new THREE.MeshLambertMaterial({ color: '#9aa3ad' });
      const teil = (g, mat, x, y, z) => { const k = new THREE.Mesh(g, mat); k.position.set(x, y, z); gr.add(k); return k; };
      teil(new THREE.BoxGeometry(0.17, 0.05, 0.85), lila, 0, 0.13, 0);
      for (const z of [-0.42, 0.42]) { const r = teil(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 14), dunkel, 0, 0.1, z); r.rotation.z = Math.PI / 2; }
      const st = teil(new THREE.CylinderGeometry(0.022, 0.022, 0.95, 8), grau, 0, 0.6, -0.44); st.rotation.x = 0.12;
      const lk = teil(new THREE.CylinderGeometry(0.018, 0.018, 0.48, 8), dunkel, 0, 1.06, -0.5); lk.rotation.z = Math.PI / 2;
      gr.position.set(32.6, 0.05, 66.6); gr.rotation.y = 0.25; gr.visible = false; scene.add(gr); DORF_DEKO.roller = gr;
    }
    // Süße Wolke im WC, solange Ines und Kai dort stehen (Vape-Situation)
    if (!DORF_DEKO.wolke) {
      const gr = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: '#f4eef8', transparent: true, opacity: 0.16, depthWrite: false });
      for (const [x, y, z, r] of [[22.6, 1.75, -27.9, 0.45], [23.1, 1.95, -28.3, 0.55], [22.2, 2.2, -27.4, 0.5], [23.6, 2.35, -27.6, 0.6], [22.9, 2.6, -28.6, 0.7]]) {
        const k = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), mat); k.position.set(x, y, z); gr.add(k);
      }
      gr.visible = false; scene.add(gr); DORF_DEKO.wolke = gr;
    }
    // Spuren der Situationen in der Welt: Dosen am Spielplatz, Dex’ Kürzel am Bushäuschen
    const m = S.merke || {}, an = (id) => statisten.some((q) => q.d.sitPerson === id && !q.weg);
    if (DORF_DEKO.dosen) DORF_DEKO.dosen.visible = an('lenny');
    if (DORF_DEKO.wolke) DORF_DEKO.wolke.visible = an('kai');
    if (DORF_DEKO.roller) DORF_DEKO.roller.visible = an('sacha');
    if (DORF_DEKO.umkleide) DORF_DEKO.umkleide.visible = !!m.romyMesenberg;
    if (DORF_DEKO.dexWand) DORF_DEKO.dexWand.visible = m.sit_graffiti === 'kiesser' && kap > (m.sitKap_graffiti || 99);
    if (DORF_DEKO.tagDex) DORF_DEKO.tagDex.visible = an('dexWand') || (['gegangen', 'verstanden', 'weiter', 'reden', 'kiesser', 'papier'].includes(m.sit_graffiti) && m.sitKap_graffiti === kap);
    // Das Wandbild zeigt, was aus Noors Trommel geworden ist
    const wb = DORF_DEKO.wandbild, var_ = m.graffitiGesagt || ((m.sit_graffiti === 'reden' || m.graffitiGeholfen) && (m.sitKap_graffiti || 0) < kap) ? 'neu'
      : m.sit_graffiti === 'weggemacht' ? 'rosa' : m.sit_graffiti === 'gespruht' ? 'leer' : '';
    if (wb && wb.userData.variante !== var_) { wb.userData.variante = var_; const alt = wb.material.map; wb.material.map = wandbild(THREE, var_); wb.material.needsUpdate = true; if (alt) alt.dispose(); }
    if (DORF_DEKO.tagDu && !DORF_DEKO.tagDu.userData.gemalt && S.name) { DORF_DEKO.tagDu.userData.gemalt = true; const t = DORF_DEKO.tagDu.material.map; DORF_DEKO.tagDu.material.map = tagTextur(THREE, S.name.slice(0, 3).toUpperCase(), '#e9b949'); t.dispose(); }
  }
  // Wanduhren zeigen die Spielzeit; die Uhr in der Halle geht drei Minuten nach – bis Fernand sie stellt (Stammgast, Kapitel 10)
  const uhrBild = { jetzt: null, halle: null }, uhrFlaechen = [];
  function zifferblatt(tex, h) {
    const cv = tex.image, x = cv.getContext('2d'), m = ((h % 12) + 12) % 12;
    x.clearRect(0, 0, 256, 256);
    x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(128, 128, 124, 0, 7); x.fill(); x.strokeStyle = '#2d3d5c'; x.lineWidth = 10; x.stroke();
    x.fillStyle = '#2d3d5c'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(128 + Math.sin(a) * 100 - 4, 128 - Math.cos(a) * 100 - 4, 8, 8); }
    const zeiger = (a, l, w) => { x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(a) * l, 128 - Math.cos(a) * l); x.stroke(); };
    x.strokeStyle = '#2d3d5c'; zeiger(m / 12 * Math.PI * 2, 55, 9); zeiger((h % 1) * Math.PI * 2, 92, 6);
    x.fillStyle = '#c0392b'; x.beginPath(); x.arc(128, 128, 7, 0, 7); x.fill();
    tex.needsUpdate = true;
  }
  function uhrenStellen(h, kap) {
    if (!uhrBild.jetzt) {
      for (const k of ['jetzt', 'halle']) { const cv = document.createElement('canvas'); cv.width = cv.height = 256; const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; uhrBild[k] = t; }
      scene.traverse((o) => { if (o.isMesh && (o.name === 'wanduhr' || o.name === 'wanduhr-halle')) uhrFlaechen.push(o); });
      for (const o of uhrFlaechen) { o.material.map = o.name === 'wanduhr-halle' ? uhrBild.halle : uhrBild.jetzt; o.material.needsUpdate = true; }
    }
    const gestellt = S && S.merke && S.merke.stb_fernand_10;
    zifferblatt(uhrBild.jetzt, h); zifferblatt(uhrBild.halle, gestellt ? h : h - 3 / 60);
  }
  // Tagesablauf der Stammgäste (stammgaeste.js: plan): bei jedem Schritt der Geschichte an den Ort der Uhrzeit setzen
  let uhrJetzt = 8;
  function stammUmsetzen(uhr) {
    uhrJetzt = uhr;
    for (const x of statisten) {
      if (!x.d.stamm) continue;
      const st = STAMM.find((q) => q.id === x.d.stamm), e = st && stammPlan(st, uhr);
      if (!e || !st.plan) continue;
      x.planSaetze = e.saetze || null;
      if (x.planAb === e.ab) continue;
      const neuOrt = x.planAb !== undefined || e.steht[0] !== st.steht[0] || e.steht[1] !== st.steht[1];
      x.planAb = e.ab;
      if (!neuOrt) continue;
      const [px, pz, rot, halt] = e.steht, f = x.f;
      let q = { x: px, z: pz, rot, h: 0.47 };
      if (halt === 'sitzt') { const sp = sitzSuche(px, pz); if (sp) q = { x: sp.x, z: sp.z, rot: sp.rot, h: sp.h || 0.47 }; }
      f.group.position.set(q.x, 0, q.z); f.group.rotation.y = q.rot; x.p.set(q.x, 0, q.z); x.h.x = q.x; x.h.z = q.z;
      x.d.steht = [q.x, q.z, q.rot, halt];
      f.sitzen(halt === 'sitzt', q.h);
      f.spiele(halt === 'redet' ? 'Interact' : halt === 'handy' ? 'Idle_Neutral' : 'Idle', halt === 'redet' ? { tempo: 0.35 } : undefined);
    }
  }
  function statistenBewegen(dt) {
    for (const x of statisten) {
      if (x.weg) continue;
      if (imBild(x.f, x.f.group.position)) {
        const sp = steuerung.pos, gp = x.f.group.position, dd = Math.hypot(sp.x - gp.x, sp.z - gp.z);
        x.blickV = x.blickV || new THREE.Vector3();
        if (dd < 4 && dd > 0.7) { const jz = performance.now(); x.nahSeit = x.nahSeit || jz; x.f.blick((jz - x.nahSeit) % 8000 < 2600 ? x.blickV.set(sp.x, 1.45, sp.z) : null); }
        else { x.nahSeit = 0; x.f.blick(null); }
        x.f.update(dt);
      }
      if (x.rauch) {
        x.rauch.z.getWorldPosition(_wp);
        for (const r of x.rauch.wolken) {
          r.t += dt; if (r.t > 3) { r.t = 0; r.w.position.copy(_wp); }
          r.w.visible = r.t < 2.8; r.w.position.y += dt * 0.35; r.w.position.x += dt * 0.08;
          r.w.scale.setScalar(0.6 + r.t * 0.9); r.w.material.opacity = Math.max(0, 0.35 * (1 - r.t / 2.8));
        }
      }
      // Wer steht und redet/aufs Handy guckt, dreht sich zu dir, wenn du nah vorbeikommst – und danach zurück
      if (x.d.steht && x.d.steht[3] !== 'sitzt' && x.f.group.children[0] && x.f.group.children[0].visible) {
        const sp = steuerung.pos, gp = x.f.group.position, dd = Math.hypot(sp.x - gp.x, sp.z - gp.z);
        const zielYaw = dd < 2.8 && dd > 0.6 ? Math.atan2(sp.x - gp.x, sp.z - gp.z) : x.d.steht[2];
        let dy = zielYaw - x.f.group.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
        x.f.group.rotation.y += dy * Math.min(1, dt * 2.5);
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
    draussen: ['Moien! 👋', 'Wer hat Seite 12?', 'Pause ist zu kurz. Fakt.', 'Ich hab Hunger. Seit der ersten Stunde.', 'Gerd ist wieder da 🐦', 'Eins gegen eins? Am Korb?', 'Ich hab mein Ladekabel vergessen. Schon wieder.',
      'Lowkey müde.', 'Hast du Mathe gemacht? … Ich auch nicht.', 'Salut! Wer hat heute Aufsicht?', 'Wer hat meinen Ball?', 'Heute ist so ein Tag. Du weißt.', 'Bro, mein Akku hat zwei Prozent. Rette mich.', 'Noch 12 Minuten bis zum Klingeln!'],
    kantine: ['Das Curry ist heute okay!', 'Nudeln. Schon wieder.', 'Wer isst seinen Nachtisch nicht?', 'Frau Kremer hat mir extra Soße gegeben 🙏', 'Zu wenig Salz. Sagt Luca immer.', 'Ich hol mir Nachschlag. Wünsch mir Glück.'],
    gang: ['Mein Spind klemmt. Wie immer.', 'Wo ist Saal 1.06?', 'Hast du den Plan für morgen?', 'Pssst. Da kommt wer.', 'Ich renn nicht. Ich gehe schnell.'],
    innenhof: ['Psst. Hier findet uns keiner. Bleib leise.', 'Hast du das Plakat für die Aula gesehen?', 'Ich übe meinen Text. Leise.'],
    skate: ['Kickflip! … fast.', 'Guck! … Nee, warte. Nochmal.', 'Das Board ist von meinem Cousin.'],
  };
  const TAGESGESPRAECH = {
    1: ['Habt ihr die Neuen gesehen? In der 7P2?', 'Dieser @annexe.cam-Account … wer ist das?', 'Heute Umfrage im Chat. Cringe.', 'Die Hallenuhr geht falsch. Seit immer.'],
    2: ['Schon wieder ein Foto von @annexe.cam. Krass.', 'Talenttag in der 7P2? Gibt’s das bei uns auch?', 'Wer ist #3? Alle raten.', 'Im Musikraum trommelt wer. Hörst du’s?'],
    3: ['Sportfest Freitag! Ich lauf als Erster.', 'Die 7P2 war Letzte. Aber mit Stil, sagen sie.', 'Hast du das mit dem Foto gehört? Voll fies.', 'Wo sind die zwei Hütchen hin? Fernand sucht.'],
    4: ['Test morgen. Ich hab null gelernt.', 'Raumwechsel ohne Ansage. Typisch.', 'Atmen hilft. Hab ich im Skills-Kurs gelernt.', 'Ich hab Tiagos Spiel getestet. Die Figur fällt durch den Boden.'],
    5: ['Dieser Fake-Screenshot … glaubt das echt wer?', 'Drei Konten, dreißig Kommentare. Lächerlich.', 'Ich teil nix mehr ohne Quelle.', 'Rosa hat Boxemännercher! Schnell, bevor sie weg sind.'],
    6: ['Klassenfoto heute! Ich hab meinen besten Pulli an.', 'Ich hab mich heute was getraut. Ganz klein.', 'Hast du schon mal Stopp gesagt? Echt jetzt?', 'Bonbon hat heute gegähnt. Süßester Moment der Woche.'],
    7: ['Die 7P2 hat jetzt zwei Gruppen. Drama.', 'Luca hat eine neue Gruppe gemacht. Elf Leute.', 'Praktikum nächstes Jahr. Ich will in eine Bäckerei.', 'Noor hat vor der Klasse getrommelt. Alle haben geklatscht.'],
    8: ['Das Video von Mme Tidderich ist KI! Hundert Pro.', 'Echt oder KI? Ich erkenn das nicht mehr.', 'Ich hab mein Konto auf privat gestellt.', 'Der Roboter im Informatikraum sagt „HALLO MENSCH“. Gruselig.'],
    9: ['Ich schlaf so schlecht. Handy bis zwei Uhr.', 'Ben hat einen Riesen-Würfel gebaut. Aus Pappe!', 'Meine Serie ist gerissen. Und? Lebe noch.', 'Fernand sagt, um sechs ist die Schule ganz still.'],
    10: ['Letzte Woche! Ferien!', 'Sommerfest Freitag. Mit Lampions.', 'Nächstes Jahr 6ème. Wir sind dann die Großen.', 'Schulfest! Noor und Gilles spielen. Erste Reihe!'],
  };
  const sprueche_el = document.createElement('div'); sprueche_el.className = 'ly-bark'; sprueche_el.hidden = true; root.appendChild(sprueche_el);
  const _bv = new THREE.Vector3();
  let spruchNaechst = performance.now() + 4000, spruchWer = null, spruchBis = 0, spruchFolge = [];   // spruchFolge: mitgehörtes Gespräch zwischen zwei
  function sprueche(dt) {
    const offen = !imGespraech && !ui.ebeneArt() && laeuft;
    if (spruchWer && performance.now() < spruchBis && offen) {
      _bv.copy(spruchWer.f.group.position); _bv.y += (spruchWer.d.steht && spruchWer.d.steht[3] === 'sitzt') ? 1.55 : 2.05; _bv.project(camera);
      const sicht = _bv.z < 1 && Math.abs(_bv.x) < 1 && Math.abs(_bv.y) < 1;
      sprueche_el.hidden = !sicht;
      if (sicht) { sprueche_el.style.left = ((_bv.x + 1) * 50) + '%'; sprueche_el.style.top = ((1 - _bv.y) * 50) + '%'; }
    } else if (spruchWer) {
      sprueche_el.hidden = true; spruchWer = null;
      if (spruchFolge.length && offen) { const n = spruchFolge.shift(); sprueche_el.textContent = n.t; spruchWer = n.wer; spruchBis = performance.now() + 2900; return; }
      spruchFolge = [];
    }
    if (performance.now() < spruchNaechst || !offen) return;
    spruchNaechst = performance.now() + 5000 + Math.random() * 6000;
    const p = steuerung.pos; let best = null, bd = 7.5;
    for (const x of statisten) { const d = Math.hypot(x.f.group.position.x - p.x, x.f.group.position.z - p.z); const sichtbar = x.f.group.children[0] && x.f.group.children[0].visible; if (d < bd && d > 1.2 && sichtbar) { bd = d; best = x; } }
    if (!best) return;
    // Leute aus den Situationen murmeln, was sie beschäftigt – passend zu dem, was passiert ist (statt Allerwelts-Sprüchen)
    if (best.d.sitPerson && S) { const sp = SIT_LEUTE[best.d.sitPerson], m0 = S.merke || {};
      if (sp.stumm) return;
      if (sp.immer || m0['sit_' + sp.szene]) { const pool = sitSaetze(best.d.sitPerson, m0).filter((t) => t !== '…');
        if (pool.length) { sprueche_el.textContent = pool[Math.floor(Math.random() * pool.length)]; spruchWer = best; spruchBis = performance.now() + 3400; return; } } }
    const r = welt.raumBei(best.p.x, best.p.z), rid = r ? r.id : 'draussen';
    const pool = best.d.skate ? SPRUECHE.skate : SPRUECHE[rid === 'kantine' || rid === 'gang' ? rid : best.p.z < -32 && best.p.z > -50 && !r ? 'innenhof' : 'draussen'] || SPRUECHE.draussen;
    // Die Welt redet über die Geschichte (Gerüchte, Ereignisse der Woche) – passend zum Kapitel, nicht nur Kulisse
    const kap = (S && SCHRITTE[S.schritt] && SCHRITTE[S.schritt].kap) || 1, tk = TAGESGESPRAECH[kap];
    const tpool = regenJetzt > 0.3 && !r && Math.random() < 0.5 ? ['Mein Pulli ist komplett nass.', 'Wer hat einen Schirm? … Niemand. Okay.', 'Regen am Montag. Doppelt Montag.', 'Pfütze! … zu spät.'] : tk && !best.d.skate && rid !== 'kantine' && Math.random() < 0.35 ? tk : pool;
    // Mitgehört: Steht neben der Person jemand, der auch redet, unterhalten sich die beiden (BELAUSCHT, je Kapitel)
    const partner = best.d.steht && best.d.steht[3] === 'redet' ? statisten.find((y) => y !== best && !y.weg && y.d.steht && y.d.steht[3] === 'redet' && Math.hypot(y.p.x - best.p.x, y.p.z - best.p.z) < 3.2) : null;
    const bel = BELAUSCHT[kap];
    if (partner && bel && Math.random() < 0.55) {
      S.merke.belauscht = S.merke.belauscht || {};
      const frei = bel.map((g, i) => i).filter((i) => !S.merke.belauscht[kap + '_' + i]);
      const i = frei.length ? frei[Math.floor(Math.random() * frei.length)] : Math.floor(Math.random() * bel.length);
      S.merke.belauscht[kap + '_' + i] = 1;
      const g = bel[i].map((t, j) => ({ t, wer: j % 2 ? partner : best }));
      const erst = g.shift(); spruchFolge = g;
      sprueche_el.textContent = erst.t; spruchWer = erst.wer; spruchBis = performance.now() + 2900;
      spruchNaechst = performance.now() + 2900 * (g.length + 1) + 6000;
      return;
    }
    // Ruf: Fremde reden über das, was du getan hast (gedaechtnis.js) – jede Sache höchstens zweimal
    const ruf = S ? RUF.filter((r) => kap >= r.ab && kap <= r.bis && r.wenn(S.merke) && (S.merke['rf_' + r.id] || 0) < 2) : [];
    if (ruf.length && !best.d.skate && Math.random() < 0.35) {
      const r = ruf[Math.floor(Math.random() * ruf.length)]; S.merke['rf_' + r.id] = (S.merke['rf_' + r.id] || 0) + 1;
      sprueche_el.textContent = r.t[Math.floor(Math.random() * r.t.length)];
    } else sprueche_el.textContent = tpool[Math.floor(Math.random() * tpool.length)];
    spruchWer = best; spruchBis = performance.now() + 3400;
    if (bd < 3.5 && best.d.steht && best.d.steht[3] === 'redet' && Math.random() < 0.6) { best.f.spiele('Wave'); setTimeout(() => best.f.spiele('Interact', { tempo: 0.35 }), 2400); }
  }

  // Statisten ansprechen: kurzer, witziger Gruß (zählt für den Schul-Pass)
  const GRUSS = ['Hey! Neu hier, oder?', 'Salut! Coole Schuhe.', 'Moien! Hast du Gerd gesehen? Die Taube mit Hut.', 'Yo. Kennst du Ben? Der schuldet mir 2 €.', 'Hi! … Sorry, ich dachte, du bist wer anders.',
    'Hallo! Ich bin in der 7P1. Wir sind besser. Spaß.', 'Salut! Gleich Französisch. Ohne Hausaufgaben. Hilfe.', 'Moien. Ich hab Hunger. Hast du was?', 'Ey, du bist doch aus der 7P2. Ihr seid laut.', 'Hey. Frag nicht nach Mathe. Bitte.',
    'Der Automat hat Chips. Unten links. Gern geschehen.', 'Salut! Coole Jacke. Wo gibt’s die?', 'Yo! Eins gegen eins am Korb? Später?', 'Moien. Noch drei Stunden. Ich zähl mit.',
    'Hey. Lowkey müde heute.', 'Same. Ich hab auch nix gemacht.', 'Real talk: Die Pommes heute sind tuff.', 'Hast du Zoés Umfrage gemacht? Ich hab „Laut“ gesagt.', 'Ey, hast du Bonbon gesehen? Der Hund in der SePAS!', 'Jeff sucht schon wieder was. Jedes Mal.'];
  const GRUSS_SITZ = ['Mmmh. Willst du probieren? … Nee, Spaß.', '(mit vollem Mund) Hmpf. Hallo.', 'Psst. Ich lern gerade. Also … tu ich so.'];
  function statistNah(p) { let best = null, bd = 1.7; for (const x of statisten) { if (x.weg) continue; const d = Math.hypot(x.f.group.position.x - p.x, x.f.group.position.z - p.z); if (d < bd) { bd = d; best = x; } } return best; }
  function gruss(x) {
    const sitzt = x.d.steht && x.d.steht[3] === 'sitzt', pool = sitzt ? GRUSS_SITZ : GRUSS;
    const n = S.merke.gegruesst = (S.merke.gegruesst || 0) + 1; sichern();
    sprueche_el.textContent = pool[(n * 7 + Math.floor(Math.random() * pool.length)) % pool.length];
    spruchWer = x; spruchBis = performance.now() + 3600; spruchNaechst = performance.now() + 6000; sprueche_el.hidden = false;
    audio.play('bubble');
    if (!sitzt) zurueckWinken(x);
  }
  function zurueckWinken(x) {
    {
      const p = steuerung.pos; x.f.group.rotation.y = Math.atan2(p.x - x.f.group.position.x, p.z - x.f.group.position.z);
      x.f.spiele('Wave'); const w = x.warte; x.warte = Math.max(x.warte || 0, 2.6);
      setTimeout(() => { const h = x.d.steht && x.d.steht[3]; if (h === 'redet') x.f.spiele('Interact', { tempo: 0.35 }); else if (h === 'handy') x.f.spiele('Idle_Neutral'); else if (x.d.weg) { x.f.spiele('Walk', { tempo: x.d.tempo / 1.4 }); x.warte = w > 0 ? w : 0; if (x.d.steht) x.f.group.rotation.y = x.d.steht[2]; } else x.f.spiele('Idle'); if (x.d.steht) x.f.group.rotation.y = x.d.steht[2]; }, 2500);
    }
  }

  // Geheimwort: wer „gerd“ tippt, lässt alle Tauben auffliegen (Schul-Pass „Geheimwort“)
  { let puffer = '';
    document.addEventListener('keydown', (e) => {
      if (e.target && e.target.closest && e.target.closest('input, textarea')) return;
      if (!/^Key[A-Z]$/.test(e.code)) return;
      puffer = (puffer + e.code.slice(3).toLowerCase()).slice(-4);
      // H = winken: die Spielfigur winkt, Leute in der Nähe winken zurück
      if (e.code === 'KeyG' && hsPartner) { e.preventDefault(); handschlagMit(hsPartner); return; }
      if (e.code === 'KeyH' && laeuft && !imGespraech && !ui.ebeneArt() && spieler && steuerung.tempo < 0.3 && !steuerung.sitzt && !steuerung.brett) {
        steuerung.emote = 'Wave'; steuerung.emoteBis = performance.now() + 2200;
        const p = steuerung.pos; let n = 0;
        for (const x of statisten) { const d = Math.hypot(x.f.group.position.x - p.x, x.f.group.position.z - p.z), sitzt = x.d.steht && x.d.steht[3] === 'sitzt';
          if (d < 9 && !sitzt && x.f.group.children[0] && x.f.group.children[0].visible && n < 4) { n++; setTimeout(() => zurueckWinken(x), 350 + Math.random() * 700); } }
        if (n) { S.merke.gewunken = (S.merke.gewunken || 0) + n; sichern(); }
      }
      if (puffer === 'gerd' && S && S.merke) { puffer = ''; tiere.alleAuf(); const neu = !S.merke.geheimwort; S.merke.geheimwort = true; sichern(); ui.toast('<b>🐦 GERD!</b><span>' + (neu ? 'Du kennst das Geheimwort. Die Tauben auch.' : 'Alle Tauben fliegen. Gerd bleibt sitzen. Natürlich.') + '</span>', 'ly-t-ent'); ton('pling'); }
    });
  }

  // ---------- Spielfigur ----------
  let spieler = null;
  async function spielerFigur(i) {
    tiere.kabelSync((S && S.merke && S.merke.kabel) || []);
    if (spieler) { scene.remove(spieler.group); }
    spieler = await ladePerson(veil, { ...(FIGUREN[i] || FIGUREN[0]), ...((S && S.aussehen) || {}) });   // Aussehen aus dem Spind-Spiegel
    spieler.group.add(fussSchatten()); scene.add(spieler.group); steuerung.figur = spieler; steuerung.sitzSuche = sitzSuche;
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
    if (grund !== 'wahl' && neu > alt && stufe(neu) !== stufe(alt)) ui.toast('<b>' + LEUTE[id].name + ': ' + stufe(neu) + '</b><span>Hat dich jetzt auf dem Schirm.' + (HANDSCHLAEGE[id] && alt < 20 && neu >= 20 ? ' Neu: euer eigener Handschlag (🤝 oder Taste G).' : '') + '</span>', 'ly-t-herz');
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
  // Geste zum Satz: Nein → Kopf schütteln, Frage → Kopf neigen, Lachen → Kopf zurück, Seufzen/leise → Kopf senken
  function gesteZu(t) {
    const s = String(t || '').toLowerCase();
    if (/\((lacht|grinst|kichert)|haha|😂|😭/.test(s)) return 'lachen';
    if (/\((seufzt|leise|sehr leise|guckt weg|guckt auf|schaut auf den)/.test(s)) return 'senken';
    if (/^(„)?(nein|nee|nö|nope|auf keinen fall|niemals)\b/.test(s)) return 'schuetteln';
    if (/\((zuckt|schulterzucken)|^(„)?(keine ahnung|weiß nicht|weiss nicht|egal|vielleicht|mal sehen)\b/.test(s)) return 'zucken';
    if (/\?(“|\))?\s*$/.test(s) && s.length < 90) return 'neigen';
    if (s.length > 55) return 'erklaeren';   // längere Sätze: Hand erklärt mit
    return null;
  }
  // Blick: die beteiligte Person dreht sich zum Spieler
  let gegenueber = null, sprichtJetzt = null;
  // Sprechende Figur gestikuliert (wie in Story-Spielen), danach zurück in ihre Haltung
  const haltungAnim = (x) => (x.haltung === 'redet' ? ['Interact', 0.35] : x.haltung === 'handy' ? ['Idle_Neutral', 1] : ['Idle', 1]);
  async function spiele(zeilen) {
    for (const z of zeilen) {
      if (Array.isArray(z)) {
        const [wer, text] = z;
        if (LEUTE[wer] && S.herz[wer] == null) { S.herz[wer] = 1; freund(wer, 5, 'kennen'); }
        if (leute[wer] && leute[wer].f.group.visible && wer !== 'du') { gegenueber = leute[wer]; steuerung.fokus = gegenueber.pos; }
        if (sprichtJetzt && leute[sprichtJetzt] && leute[sprichtJetzt].f.redet) leute[sprichtJetzt].f.redet(false);
        sprichtJetzt = wer;
        if (leute[wer] && leute[wer].f.redet) leute[wer].f.redet(true);
        { const g = gesteZu(text), f = wer === 'du' ? spieler : leute[wer] && leute[wer].f; if (g && f && f.geste) setTimeout(() => f.geste(g), 250); }
        if (spieler && spieler.redet) spieler.redet(wer === 'du');
        if (wer === 'du' && gegenueber && gegenueber.f.nicken) setTimeout(() => { if (gegenueber && gegenueber.f.nicken) gegenueber.f.nicken(); }, 700 + Math.random() * 600);   // Zuhörer nickt
        steuerung.gegenSchuss = wer === 'du' && !!gegenueber;   // du sprichst: Kamera schaut dich an
        const redner = leute[wer] && leute[wer].f.group.visible && leute[wer].haltung !== 'sitzt' ? leute[wer] : null;
        if (redner && redner.f.aktion !== 'Wave') redner.f.spiele('Interact', { tempo: 0.55 + Math.random() * 0.2, blende: 0.35 });
        await ui.sprich({ ...sprecher(wer), text: ersetze(text) });
        if (redner) { const [a, tp] = haltungAnim(redner); redner.f.spiele(a, { tempo: tp, blende: 0.4 }); }
      } else if (z.wahl) {
        const opt = z.wahl.filter((w) => !w.wenn || w.wenn(S.merke));   // manche Antworten gibt es nur nach früheren Entscheidungen
        // Reihenfolge mischen, wenn eine Antwort eine Stärke zeigt – sonst wäre „die erste ist die gute“ zu leicht
        const ord = opt.map((_, k) => k);
        if (opt.some((w) => w.staerke) && !z.fest) for (let k = ord.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [ord[k], ord[r]] = [ord[r], ord[k]]; }
        const i = await ui.waehle(ord.map((k) => ersetze(opt[k].t)));
        vib(10);
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
        if (r.merkkarte) { S.skillsHeft = S.skillsHeft || []; if (!S.skillsHeft.some((m) => m.titel === r.merkkarte.titel)) S.skillsHeft.push(r.merkkarte); }   // Skills-Heft im Journal
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
      ui.dialogZu(); imGespraech = false; input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null; steuerung.gegenSchuss = false; gegenueber = null; if (sprichtJetzt && leute[sprichtJetzt] && leute[sprichtJetzt].f.redet) leute[sprichtJetzt].f.redet(false); sprichtJetzt = null; if (spieler && spieler.redet) spieler.redet(false); sperreBis = performance.now() + 350; sichern();
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
      if (m.falscherPlan) z.push(['hoffmann', 'Zeig mal deinen Plan … das ist die 7P1.'], ['jo', 'Falsche Klasse. Tür ist da hinten.'], ['erzaehler', 'Gelächter. Mme Tidderich gibt dir ihre Kopie. Mit Kaffeefleck.']);
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
    n1_kunstLina: () => (S.merke.linaTisch ? [['lina', '(leise) Du. Von der Kantine.'], ['lina', 'Okay. Mit dir geht das.'], ['erzaehler', 'Lina setzt sich ein Stück näher. Das ist bei ihr viel.']] : []),
    tablett: () => { ui.toast('🍽 Tablett in der Hand. Jetzt der schwerste Teil: ein Platz.'); },
    gegessen: async () => {   // Spielfigur setzt sich mit an den Tisch (gegenüber)
      const sitz = S.merke.tisch === 'mila' ? [19.55, -4.9, Math.PI / 2] : S.merke.tisch === 'lina' ? [16.65, -5.9, -Math.PI / 2] : [12.25, -10.1, -Math.PI / 2];
      steuerung.setzen(sitz[0] - Math.sin(sitz[2]) * 0.1, sitz[1] - Math.cos(sitz[2]) * 0.1, sitz[2]);
      await new Promise((r) => setTimeout(r, 1400));
      await ui.bild('Mittagspause', S.merke.tisch === 'mila' ? 'Mila zeigt dir einen Würfel-Trick. Du schaffst ihn nicht. Sie lacht fast.' : S.merke.tisch === 'lina' ? 'Lina zeichnet weiter. Am Ende schiebt sie dir die Serviette rüber. Du bist auch drauf. Als Taube.' : 'Ayla trommelt den Takt auf das Tablett. Noah verschluckt sich vor Lachen.', 3);
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
      const wahl = await ui.ende({ ...bilanz(), kap, brief: bf ? { von: LEUTE[bf].name, farbe: LEUTE[bf].farbe, text: nachricht(bf, kap) } : null, ueberschrift: ({ 1: 'Deine ersten Tage', 2: 'Die zweite Woche', 3: 'Die Sportfest-Woche', 4: 'Die Test-Woche', 5: 'Die Fake-Woche', 6: 'Die Woche der Grenzen' , 7: 'Die Woche danach', 8: 'Die KI-Woche' , 9: 'Die Akku-Woche' , 10: 'Das Sommerfest' })[kap] || KAPITEL[kap],
        weiter: weiterIdx >= 0 ? 'Weiter: Kapitel ' + (kap + 1) + ' „' + KAPITEL[kap + 1] + '“' : '',
        // Haken fürs nächste Kapitel (kein Spoiler, nur die Frage)
        frage: (() => { const sit = Object.entries(SZENEN).find(([id]) => S.merke['sitKap_' + id] === kap && S.merke['sit_' + id]); return sit ? (REFLEXION[kap] ? REFLEXION[kap] + ' · ' : '') + 'Diese Woche: ' + sit[1].titel[1] + '. ' + sit[1].frage : REFLEXION[kap] || ''; })(), vorschau: weiterIdx >= 0 ? ({ 1: 'Montag. Eine Liste. Und Noah ist Platz 1.', 2: 'Sportfest. #3 kommt. Und es trifft jemanden, den du magst.',
          3: 'Ein Test. Ein Fenster. Und ein Foto, das es nicht geben dürfte.', 4: 'Alle denken, du bist @annexe.cam. Wie beweist man das Gegenteil?',
          5: 'Mila hat einen Beweis. Er wird dir nicht gefallen.', 6: 'Luca will reden. Ehrlich, sagt er. Glaubst du ihm?',
          7: 'Ein Video von Mme Tidderich. 300 Herzen. Es ist nicht echt.', 8: 'Dario kann nicht schlafen. Er will dir etwas sagen.',
          9: 'Sommerfest. Ein Kreis. Und jemand muss etwas zugeben.' })[kap] || '' : '' });
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
  // Reflexionsfrage am Kapitelende (eine offene Frage, kein richtig/falsch – auch als Einstieg fürs Klassengespräch)
  const REFLEXION = { 1: 'Was hat dir am ersten Tag geholfen, dich ein bisschen sicherer zu fühlen?', 2: 'Was kannst du gut – auch wenn es keiner sieht?',
    3: 'Woran merkst du bei anderen, wie es ihnen geht, ohne dass sie es sagen?', 4: 'Was hilft dir, wenn du „bei Rot“ bist?',
    5: 'Welcher Satz über dich selbst ist laut – und stimmt er wirklich?', 6: 'Wann hast du zuletzt klar Stopp gesagt? Wie war das?',
    7: 'Welches Tier bist du im Streit meistens – und welches willst du öfter sein?', 8: 'Was prüfst du, bevor du etwas teilst?',
    9: 'Was lädt deinen Akku wirklich auf?', 10: 'Was nimmst du aus diesem Jahr mit?' };
  // Inhaltshinweise je Kapitel (wie in großen Spielen): kurz, sachlich, mit Weg nach draußen
  const INHALT = { 2: 'Heimliche Fotos, Auslachen im Klassenchat.', 3: 'Bloßstellen mit Fotos, Wut und Streit.', 4: 'Stress, Prüfungsangst, eine Panik-Situation.',
    5: 'Ein gefälschter Chat, Gerüchte, harte Gedanken über sich selbst.', 6: 'Angst und kleine Mutproben, Grenzen setzen.', 7: 'Gruppendruck, Streit, Ausgrenzung.',
    8: 'KI-Fakes, Bloßstellen im Netz, Likes und Selbstwert.', 9: 'Erschöpfung, Schlafmangel, ein Freund in einer Krise.', 10: 'Abschied, Entschuldigung, Versöhnung.' };
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
      if (st.kap !== vorher.kap) await vorspann(st);
      const b = besteFreunde()[0];
      if (b && st.kap !== vorher.kap) setTimeout(() => ui.toast('<b>' + LEUTE[b].name + ' (' + stufe(S.freund[b]) + ')</b><span>„' + GRUSS[b] + '“</span>', 'ly-t-herz'), 2500);
      if (st.kap !== vorher.kap && INHALT[st.kap]) ui.toast('<b>ℹ️ In diesem Kapitel</b><span>' + INHALT[st.kap] + ' Wenn es zu viel wird: ☰ → Kurz raus.</span>');
    }
    sky.time.setTimeOfDay(st.uhr); ui.uhr(st.uhr, st.tag); uhrenStellen(st.uhr, st.kap);
    // Schulklingel, wenn am selben Tag eine neue Stunde/Pause beginnt
    if (mitStart !== false && vorher && vorher.tag === st.tag && Math.abs(st.uhr - vorher.uhr) >= 0.4 && st.uhr < 16.5) setTimeout(() => { ui.toast('🔔 Es klingelt.'); try { audio.play('klingel'); } catch (e) { /* kein Ton */ } }, 600);
    ui.bingo(null);
    const ort = st.start && st.start.teleport ? welt.orte[st.start.teleport] : null;
    const mitBlende = !!(ort && mitStart !== false && vorher && i > 0);
    if (mitBlende) { const hh = Math.floor(st.uhr), mm = Math.round((st.uhr - hh) * 60); await ui.blende((MONAT[st.kap] ? MONAT[st.kap] + ' · ' : '') + (st.tag || '') + ' · ' + hh + ':' + String(mm).padStart(2, '0') + ' · ' + st.titel); }
    statistenNachZeit(st.uhr);
    await stelleLeute(st.leute || {});
    if (ort && mitStart !== false) steuerung.teleport(ort.x, ort.z, ort.yaw);
    if (mitBlende) ui.blendeAus();
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
      if (st.id === 'tisch' && (id === 'noah' || id === 'mila' || id === 'lina')) { S.merke.tisch = id; await gespraech(GESPRAECHE['tisch_' + id]); await naechster(); return; }
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
      const kapJetzt = (SCHRITTE[S.schritt] || {}).kap || 1;   // zeitgebunden: z. B. keine Luca-Plaudereien, solange er der Gegenspieler ist
      if (fa && !(fa.nichtKap && !S.fertig && fa.nichtKap.includes(kapJetzt)) && ((S.herz[id] == null ? 1 : S.herz[id]) >= fa.herz || (S.freund[id] || 0) >= fa.herz * 15) && S.merke['fd_' + id] !== abschnitt) {
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
    // Gedächtnis der Welt (gedaechtnis.js): eine frühere Entscheidung kommt zurück – einmal, im passenden Zeitfenster
    {
      const kapJ = S.fertig ? 10 : ((SCHRITTE[S.schritt] || {}).kap || 1);
      const gd = S.merke['gdk_' + id] !== String(S.schritt) && GEDAECHTNIS.find((g) => g.wer === id && !S.merke['gd_' + g.id] && kapJ >= g.ab && kapJ <= (g.bis || g.ab + 3) && g.wenn(S.merke));
      if (gd) {
        S.merke['gd_' + gd.id] = true; S.merke['gdk_' + id] = String(S.schritt);
        const erste = gd.g.find((z) => Array.isArray(z));   // fürs Journal: „Erinnerungen“ – was zurückkam, mit wem, wann
        S.erinnerungen = [...(S.erinnerungen || []), { wer: (LEUTE[id] || {}).name || id, farbe: (LEUTE[id] || {}).farbe || '#2b3a55', text: erste ? ersetze(erste[1]) : '', kap: kapJ }];
        sichern(); await gespraech(gd.g); return;
      }
    }
    if (CHARAKTER[id] && S.lektionen && S.merke['wn_' + id] !== String(S.schritt) && Math.random() < 0.15) { S.merke['wn_' + id] = String(S.schritt); if (await weisstDuNoch(id)) return; }
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
  { const w = ui.waehle; ui.waehle = (o, f) => w(o, f).then((i) => { lastWahl = i; try { audio.play('click'); } catch (e) { /* Ton */ } return i; }); }

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
      const pool = DURCHSAGEN.concat((S.merke && (S.merke.kabel || []).length < 5) ? ['Herr Mesenberg sucht sein Ladekabel. Schon wieder. Finderlohn: Dankbarkeit.'] : []);
      durchsage += 1 + Math.floor(Math.random() * 3);
      ui.toast('<b>📢 Durchsage</b><span>' + pool[durchsage % pool.length] + '</span>'); audio.play('chime');
    }, 140000);
  }
  ui.onEinstellungen = (e) => {
    try { audio.setVolume(e.laut); audio.setMusicVolume(e.musik); } catch (x) { /* Ton noch nicht bereit */ }
    try { const b = audio.buses; if (b) { b.sfx.gain.value = e.effekte != null ? e.effekte : 0.9; b.amb.gain.value = e.umgebung != null ? e.umgebung : 0.8; } } catch (x) { /* noch kein Ton */ }
    try { speech.set('rate', 0.95 * (e.tempo || 1)); } catch (x) { /* keine Stimme */ }
    try { if (S && statisten.length) sitSichtbarkeit(); } catch (x) { /* Welt noch nicht fertig */ }   // Schalter „Schwierige Situationen“ wirkt sofort
    try { if (e.grafik && e.grafik !== 'auto') rr.setQuality(e.grafik); else if (e.grafik === 'auto' && rr.qualityName) rr.setQuality(rr.qualityName, { enableAuto: true }); } catch (x) { /* alt */ }
  };
  // Lautstärken erst setzen, wenn der Ton bereit ist (nach der ersten Berührung)
  document.addEventListener('pointerdown', () => setTimeout(() => { ui.onEinstellungen(ui.einstellungen()); try { raumHall(raumAlt == null ? null : raumAlt); } catch (e) { /* noch nicht bereit */ } }, 300), { once: true });
  document.addEventListener('keydown', () => setTimeout(() => ui.onEinstellungen(ui.einstellungen()), 300), { once: true });
  ui.wendeEinst();
  ui.ohneName = (t) => (S && S.name && S.name.length > 1 ? t.split(S.name).join('{name}') : t);
  ui.onJournal = () => {
    if (!S || imGespraech) return;
    const b = bilanz();
    ui.journal({ name: S.name, stundenplan: S.stundenplan, leute: b.leute, freunde: b.freunde, staerken: b.staerken, geheimnisse: GEHEIMNISSE.filter((g) => S.entdeckt.includes(g.id)), gesamt: GEHEIMNISSE.length, lernkarten: S.lernkarten || [], heft: S.skillsHeft || [], erinnerungen: S.erinnerungen || [], stamm: STAMM.map((q) => ({ name: q.name, farbe: q.farbe, ort: stammPlan(q, uhrJetzt).ort || q.ort || '', text: q.steckbrief || '', kennt: !!S.merke['stk_' + q.id], besuche: Object.keys(S.merke).filter((k) => k.startsWith('stb_' + q.id + '_')).length })), leiter: leiterJournal(), zaehler: zaehler(), pass: ABZEICHEN.map((x) => ({ sy: x.sy, t: x.t, hinweis: x.hinweis, hat: (S.pass || []).includes(x.id) })) });
  };
  // Running Gags als Zähler im Journal (werden nie kleiner)
  function zaehler() {
    const z = [];
    if (S.benSchuld) z.push({ t: 'Ben hat sich geliehen', w: S.benSchuld + ' €' });
    if (S.benZurueck) z.push({ t: 'Ben hat zurückgezahlt', w: S.benZurueck + ' €' });
    if (S.jetonsGesamt) z.push({ t: 'Jetons (jetzt / verdient)', w: (S.jetons || 0) + ' / ' + S.jetonsGesamt });
    if (S.merke.situationen) { z.push({ t: 'Schwierige Situationen erlebt', w: String(S.merke.situationen) }); z.push(...sitRueckblick(S.merke)); }
    if (S.merke.sit_laden === 'geklaut' && !S.merke.zurueckgebracht) z.push({ t: 'In der Jacke (nicht bezahlt)', w: 'Gummibärchen' });
    if (S.merke.automat) z.push({ t: 'Münzen im Automaten', w: String(S.merke.automat) });
    if (S.merke.korbRekord || S.merke.freiwurf) z.push({ t: 'Freiwurf-Rekord', w: Math.max(S.merke.korbRekord || 0, S.merke.freiwurf || 0) + ' von 5' });
    if (S.merke.skateRekord) z.push({ t: 'Skate-Rekord (Punkte)', w: String(S.merke.skateRekord) });
    if (S.merke.ttRekord) z.push({ t: 'Tischtennis: längster Ballwechsel', w: String(S.merke.ttRekord) });
    if (S.merke.ttSiege) z.push({ t: 'Tischtennis: gewonnen', w: String(S.merke.ttSiege) });
    { const hs2 = Object.values(S.handschlag || {}).filter((h) => h && h.gelernt).length; if (hs2) z.push({ t: 'Handschläge gelernt', w: String(hs2) }); }
    if (S.merke.geholfen) z.push({ t: 'Einfach geholfen', w: S.merke.geholfen + '×' });
    return z;
  }
  // Handy (📱 / N): alle Nachrichten aus Gruppen und von Leuten, die du getroffen hast – sie bleiben, bis das Jahr vorbei ist
  ui.onHandy = async () => {
    if (!S || imGespraech || probe) return;
    const log = S.merke.handyLog || [];
    const liste = log.length ? [] : [{ system: true, text: 'Noch keine Nachrichten. Ist auch mal schön.' }];
    let tagVorher = null;
    for (const [von, t, tag, ich] of log) { if (tag && tag !== tagVorher) { liste.push({ system: true, text: tag }); tagVorher = tag; } liste.push({ wer: ich ? 'Du → ' + von : von, text: t, ich: !!ich }); }
    S.merke.handyNeu = 0; ui.handyNeu && ui.handyNeu(0); sichern();
    const offen = risikoAn() ? sitAntwortenOffen(S.merke) : [];
    const r = await ui.handy(liste, { titel: '📱 Nachrichten', sofort: true, antworten: offen.map((x) => ({ an: x.an, text: x.text })) });
    const A = r && r.antwort != null ? offen[r.antwort] : null;
    if (!A) return;
    // Geschrieben: zählt wie im Gespräch. Die Antwort kommt etwas später.
    S.merke['antwort_' + A.id] = true; for (const k of A.setzt || []) S.merke[k] = true;
    S.merke.handyLog = (S.merke.handyLog || []).concat([[A.an, A.text, tagLabel(), true]]).slice(-40);
    (S.merke.nachrichten = S.merke.nachrichten || []).push([A.an, A.antwort]);
    ui.toast('<b>✉️ Gesendet</b><span>an ' + A.an + '</span>'); sichern(); sitSichtbarkeit();
    setTimeout(() => { if (S) nachrichtenRein(); }, 14000);
  };
  ui.onRaus = () => {
    if (!S || (imGespraech && !probe && !sitLaeuft)) return;
    if (sitLaeuft) { ui.dialogVerstecken(true); ui.kurzRaus().then(() => ui.dialogVerstecken(false)); return; }   // auch mitten in einer schwierigen Situation
    ui.kurzRaus();
  };
  // Pausenmenü: aktuelles Ziel und „Ich stecke fest“ (zurück an den Anfang des Abschnitts, nichts geht verloren)
  ui.zielJetzt = () => { const st = S && SCHRITTE[S.schritt]; return st && !S.fertig ? { titel: st.titel, ziel: st.ziel } : null; };
  ui.onKarte = () => {
    if (!S || imGespraech || !laeuft) return;
    const st = SCHRITTE[S.schritt], p = steuerung.pos;
    // Nur das Erdgeschoss-Gelände: Räume ohne „Stockwerk“-Angabe; doppelte Namen zusammen lassen
    const MARKE = { bus: '🚌 Bus', hof: 'Schulhof', skateEcke: '🛹 Skate-Ecke', korbfeld: '🏀 Korb', tischtennis: '🏓 Tischtennis', sportplatz: '🏃 Sportplatz', innenhof: 'Innenhof', fahrrad: '🚲 Fahrräder', bank: 'Bank', lichtung: '🌲 Lichtung', epicerie: '🛒 Épicerie', spielplatz: '🛝 Spielplatz', rueMoulin: 'Rue du Moulin', arretMoulin: '🚏 Bushäuschen' };
    // Stammgäste: mit 💬, solange diese Woche noch nicht besucht, bekannte mit Namen
    const kapK = (st && st.kap) || 1;
    const stammMarken = STAMM.map((q) => { const neu = !S.merke['stb_' + q.id + '_' + (Object.keys(q.besuch).map(Number).filter((k) => k <= kapK).sort((a, b) => b - a)[0])]; const wo = stammPlan(q, uhrJetzt).steht; return { x: wo[0], z: wo[1], t: (neu ? '💬 ' : '') + (S.merke['stk_' + q.id] ? q.name.split(' ')[0] : '?') }; });
    stammMarken.push({ x: hund.pos.x, z: hund.pos.z, t: '🐕' + (S.merke.hundFreund ? ' Bonbon' : '') });
    // Situationen, von denen eine Nachricht kam und die noch offen sind: Markierung wie ein Auftrag (ohne zu verraten, was passiert)
    if (risikoAn()) { const sid = (SCHRITTE[S.schritt] || {}).id;
      for (const [id, sz] of Object.entries(SZENEN)) { const o = sz.zone || sz.start; if (o && S.merke['sitTeaser_' + id] && sitOffen(id, kapK, S.merke, sid, uhrJetzt)) stammMarken.push({ x: o.x, z: o.z, t: sz.titel[0] + ' ?' }); } }
    ui.karte({ marken: Object.entries(MARKE).filter(([id]) => welt.orte[id]).map(([id, t]) => ({ x: welt.orte[id].x, z: welt.orte[id].z, t })).concat(stammMarken), raeume: welt.raeume.filter((r) => r.x1 - r.x0 < 120), ich: { x: p.x, z: p.z, yaw: steuerung.yaw }, ziele: zielPunkte().map((z) => ({ x: z.x, z: z.z })), titel: st && !S.fertig ? st.titel : 'Freie Zeit' });
  };
  ui.onWenigBewegung = (v) => { steuerung.wenigBewegung = !!v; }; ui.onWenigBewegung(ui.wenigBewegung);
  ui.bodyscanFrei = () => !!(S && S.merke && S.merke.bodyscanGemacht);
  ui.onFest = () => {
    if (!S || imGespraech) return;
    const st = SCHRITTE[S.schritt]; const ort = st && st.start && st.start.teleport ? welt.orte[st.start.teleport] : welt.orte.eingangHof;
    if (steuerung.brett) return;
    if (ort) steuerung.teleport(ort.x, ort.z, ort.yaw);
    ui.toast('<b>↺ Zurückgesetzt</b><span>Du stehst wieder am Anfang dieses Abschnitts. Nichts ist verloren.</span>');
  };
  // Speichern, wenn das Fenster weggeklickt oder geschlossen wird (Tablets schließen Tabs gern ohne Vorwarnung)
  document.addEventListener('visibilitychange', () => { if (document.hidden && S) { try { sichern(); } catch (e) { /* egal */ } } });
  window.addEventListener('pagehide', () => { if (S) { try { sichern(); } catch (e) { /* egal */ } } });
  // Grafik verloren (Tablet wechselt App): freundlich melden statt schwarzer Fläche
  rr.renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); try { sichern(); } catch (x) { /* egal */ } ui.toast('<b>Grafik kurz weg</b><span>Dein Spielstand ist gesichert. Bitte die Seite neu laden.</span>'); });

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
    if (i === frage.i) { await spiele([[id, 'Gewusst! Respekt.']]); S.merke.gewusst = (S.merke.gewusst || 0) + 1; }
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
  // ---------- Handschläge (handschlag.js): mit Freundinnen und Freunden ab „Kumpel“ ----------
  const hs = createHandschlag({ steuerung, camera, root, audio, rr, ton: (a) => ton(a), vib });
  // Tischtennis in 3D an der Platte (tt3d.js); das Gegenüber wird als eigene Figur geladen
  const ttFiguren = {};
  const tt3d = createTischtennis({ scene, camera, steuerung, root, audio, rr, vib,
    holeGegner: async (id) => { const k = LEUTE[id] ? id : 'ben'; if (!ttFiguren[k]) { ttFiguren[k] = await ladePerson(veil, { ...LEUTE[k] }); ttFiguren[k].group.add(fussSchatten()); } return ttFiguren[k]; } });
  const hsKannMit = (x) => !!(x && HANDSCHLAEGE[x.id] && S && ((S.freund && S.freund[x.id] >= 20) || (S.herz[x.id] || 0) >= 3) && x.f.armOk && x.haltung !== 'sitzt');
  const sag = (wer, text) => ui.sprich({ ...sprecher(wer), text: ersetze(text) });
  ui.onHandschlag = () => { if (hsPartner) handschlagMit(hsPartner); };
  // Kleine Begegnungen (zufall.js): helfen, ehrlich sein, dazusetzen
  // Bildschirm wach halten (Handy/Tablet), solange die Seite sichtbar ist – sonst geht beim Lesen das Licht aus
  let wach = null;
  const wachHalten = () => { try { if (document.visibilityState === 'visible' && navigator.wakeLock && !wach) navigator.wakeLock.request('screen').then((w) => { wach = w; w.addEventListener('release', () => { wach = null; }); }).catch(() => {}); } catch (e) { /* nicht unterstützt */ } };
  document.addEventListener('visibilitychange', wachHalten); document.addEventListener('pointerdown', wachHalten, { once: true });
  const blase = (x, t, ms = 3200) => { sprueche_el.textContent = t; spruchWer = x; spruchBis = performance.now() + ms; spruchNaechst = performance.now() + ms + 2500; sprueche_el.hidden = false; try { audio.play('bubble'); } catch (e) { /* Ton */ } };
  const zufall = createZufall({ scene, steuerung, welt, statisten: () => statisten, blase, sag, waehle: (o) => ui.waehle(o), dialogZu: () => ui.dialogZu(), ton: (a) => ton(a), zustand: () => S, sichern: () => sichern(), toast: (t, a) => ui.toast(t, a) });
  async function handschlagMit(x) {
    if (hs.aktiv || imGespraech || !laeuft || !spieler || !spieler.armOk || ui.ebeneArt() || steuerung.brett || steuerung.sitzt || foto) return;
    const id = x.id, H = HANDSCHLAEGE[id];
    S.handschlag = S.handschlag || {};
    const st = S.handschlag[id] = S.handschlag[id] || {};
    imGespraech = true; gegenueber = x; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null); hsPartner = null; ui.hsKnopf && ui.hsKnopf(null);
    const name = LEUTE[id].name;
    try {
      hs.start(spieler, x);
      let folge = st.eigen || H.folge;
      const ueben = async (titel, opt) => { const l = hs.leiste({ titel, laenge: folge.length }); const ok = await hs.mitmachen(folge, l, opt); await new Promise((r) => setTimeout(r, 350)); l.zu(); return ok; };
      const vormachen = async () => { const l = hs.leiste({ titel: 'Schau genau hin: ' + name + 's Handschlag', laenge: folge.length, modus: 'zeigen' }); await hs.zeigen(folge, l); l.zu(); };
      if (!st.gelernt) {
        await sag(id, H.intro); ui.dialogZu();
        await vormachen();
        let versuch = 0, hilfe = false;
        while (true) {
          versuch++;
          const ok = await ueben(hilfe ? 'Mit Spickzettel: drück die Teile nacheinander (1–9)' : 'Jetzt du! Aus dem Kopf – in der richtigen Reihenfolge (1–9)', { zeit: (hilfe ? 3 : 2.2) * (ui.leicht ? 1.6 : 1), hilfe });
          if (ok) {
            st.gelernt = true; st.mal = 1; await sag(id, H.klappt); ui.dialogZu();
            freund(id, 6, 'handschlag'); ui.toast('<b>🤝 Handschlag mit ' + name + '</b><span>Gelernt! Ab jetzt: Taste G oder 🤝, wenn ihr euch trefft.</span>', 'ly-t-ent'); break;
          }
          await sag(id, H.daneben);
          const w = await ui.waehle(['Nochmal versuchen', 'Zeig ihn mir nochmal', versuch >= 2 ? 'Mit Spickzettel' : 'Später']);
          ui.dialogZu();
          if (w === 1) await vormachen();
          else if (w === 2) { if (versuch >= 2) hilfe = true; else break; }
        }
      } else {
        const GRUESSE = ['Na? Handschlag?', 'Hey! Du weißt, was jetzt kommt.', 'Da bist du ja. Los.', 'Kannst du ihn noch?'];
        await sag(id, GRUESSE[(st.mal || 0) % GRUESSE.length]);
        const w = await ui.waehle(['Unser Handschlag', 'Einen neuen erfinden', 'Doch nicht']);
        ui.dialogZu();
        if (w === 0) {
          // jedes Mal etwas weniger Zeit – wer ihn oft macht, wird schneller
          const zeit = Math.max(1.05, 1.9 - (st.mal || 0) * 0.08) * (ui.leicht ? 1.7 : 1);
          const ok = await ueben('Euer Handschlag – ohne Hilfe! (1–9)', { zeit });
          if (ok) { st.mal = (st.mal || 0) + 1; const kap = (SCHRITTE[S.schritt] || {}).kap || 1, key = 'hs_' + id + '_' + kap; if (!S.merke[key]) { S.merke[key] = true; freund(id, 3, 'handschlag'); }
            ui.toast('<b>🤝 ' + name + '</b><span>' + (st.mal % 5 === 0 ? st.mal + '-mal geschafft. Ihr seid ein eingespieltes Team.' : H.klappt) + '</span>', 'ly-t-herz'); }
          else { await sag(id, H.daneben); ui.dialogZu(); }
        } else if (w === 1) {
          const l = hs.leiste({ titel: 'Neuer Handschlag: wähle 3 bis 5 Teile (1–9)', laenge: 3, modus: 'bauen' });
          const neu = await l.bauen(); l.zu();
          const satz = neu.includes('ran') ? 'Mit Ranziehen? Okay. Für dich.' : neu.length >= 5 ? 'Fünf Teile?! Das ist ja ein Tanz. Okay, ich lern das.' : neu.includes('pistole') && neu.includes('boom') ? 'Explosion UND Peng? Du übertreibst. Ich lieb es.' : 'Okay. Langsam, ich lern das.';
          await sag(id, satz); ui.dialogZu();
          folge = neu; st.eigen = neu; st.mal = 0;
          await vormachen();
          ui.toast('<b>🤝 Neuer Handschlag</b><span>' + name + ' kennt ihn jetzt. Beim nächsten Mal machst du ihn aus dem Kopf.</span>', 'ly-t-ent');
        }
      }
    } finally {
      ui.dialogZu(); await hs.ende();
      imGespraech = false; gegenueber = null; input.setEnabled(true); steuerung.frei = true; sperreBis = performance.now() + 500; sichern();
    }
  }
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
      let punkte = 0, rest = 90, fertig = false, draussen = 0, aussen = 0, combo = 0, letzteLandung = -9, uhr = 0, stuerze = 0;
      const rekord = (S.merke && S.merke.skateRekord) || 0;
      const ZIELE = [[10, 'Bronze'], [25, 'Silber'], [45, 'Gold']];
      const zielText = () => { const z = ZIELE.find(([p]) => punkte < p); return z ? 'Nächstes Ziel: ' + z[1] + ' (' + z[0] + ')' : '🥇 Gold geschafft!'; };
      const trickTaste = (e) => { const t = { Digit1: 'kickflip', Digit2: 'shove', Digit3: 'dreh' }[e.code]; if (t && steuerung.brett) { e.preventDefault(); e.stopPropagation(); steuerung.brett.trickWunsch = t; } };
      document.addEventListener('keydown', trickTaste, true);
      ui.onSkateTrick = (t) => { if (steuerung.brett) steuerung.brett.trickWunsch = t; };
      const ende = () => {
        if (fertig) return; fertig = true; skateTick = null;
        steuerung.brett = null; steuerung.tempo = 0; steuerung.pos.y = 0;
        if (m) spieler.group.remove(m);
        if (koerper) koerper.position.y = hoch;
        document.removeEventListener('keydown', trickTaste, true); ui.onSkateTrick = null;
        if (spieler) { spieler.group.rotation.set(0, steuerung.yaw, 0); spieler.lehnen && spieler.lehnen(0); }
        const medaille = ZIELE.filter(([p]) => punkte >= p).pop();
        if (medaille) { S.merke.skateMedaille = Math.max(S.merke.skateMedaille || 0, ZIELE.indexOf(medaille) + 1); }
        ui.skate(null); input.release('jump'); ok(punkte);
      };
      steuerung.brett = { y: 0, vy: 0, ueber: new Set(), start: 0, bereich: [-45.3, -28.3, 3.5, 18.7], mesh: m,
        // Kombo: Tricks kurz nacheinander (innerhalb 1,6 s) zählen mehr – ×2, ×3 …
        onTrick: (name, p) => { combo = uhr - letzteLandung < 1.6 ? Math.min(5, combo + 1) : 1; letzteLandung = uhr; const g = p * combo; punkte += g; ton('pling'); vib(p >= 3 ? 18 : 8);
          ui.skate({ punkte, combo, ziel: zielText(), trick: name + ' +' + g + (combo > 1 ? ' (×' + combo + ')' : '') }); },
        onSturz: (grund) => { combo = 0; stuerze++; ton('klack'); vib([30, 40, 30]); ui.skate({ combo: 0, bal: null, trick: '💥 ' + grund }); },
        onGrind: (dt, bal) => { ui.skate({ bal }); },
        onRaus: () => { draussen = performance.now(); } };
      ui.skate({ rest, punkte, weg: ende, ziel: zielText() + (rekord ? ' · Rekord ' + rekord : '') });
      skateTick = (dt) => {
        rest -= dt; uhr += dt;
        if (steuerung.brett && !steuerung.brett.grind) ui.skate({ bal: null });
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
  const ia = createInteraktionen({ welt, steuerung, ui, zustand: () => S, sichern: () => sichern(), ton, blattWahl, spindAuf: () => spindAuf(), onKabel: (id) => tiere.kabelWeg(id),
    freiwurf: async (o) => ui.freiwurf(o), skate: () => skaten(),
    tt3d: welt.orte.tischtennis ? async (pa) => { ui.hinweis(null); const STAERKE = { ben: 1.4, jo: 1.6, ayla: 1.3, dario: 1.2, yusuf: 1.1 };
      // Leute direkt an der Platte gehen kurz zur Seite (sie stehen sonst im Spielfeld)
      const T = welt.orte.tischtennis, platz = statisten.filter((x) => !x.weg && Math.hypot(x.f.group.position.x - T.x, x.f.group.position.z - T.z) < 3.6);
      platz.forEach((x) => { x.f.group.visible = false; });
      try { return await tt3d.spiel({ tisch: T, gegnerId: pa ? pa.id : 'ben', gegnerName: pa ? pa.name : 'Ben', staerke: (pa ? STAERKE[pa.id] || 0.9 : 1.2) * (ui.leicht ? 0.6 : 1), leicht: !!ui.leicht }); }
      finally { platz.forEach((x) => { if (!x.weg) x.f.group.visible = true; }); } } : null, freund: (id, n, g) => freund(id, n, g),
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
  // Bonbon besuchen: beim ersten Mal (und bis es klappt) die Wahl „Hand hinhalten“ oder „einfach streicheln“
  async function hundBesuch() {
    if (imGespraech) return;
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null); steuerung.fokus = hund.pos;
    const erz = (t) => ui.sprich({ ...sprecher('erzaehler'), text: t });
    try {
      if (!S.merke.hundFreund) {
        await erz(HUND_ERSTMAL.frage);
        const i = await ui.waehle(HUND_ERSTMAL.opt.map((o) => o.t)), o = HUND_ERSTMAL.opt[i] || HUND_ERSTMAL.opt[0];
        for (const t of o.dann) await erz(t);
        if (o.gut) { S.merke.hundFreund = true; hund.freude(); ui.toast('<b>🐕 Bonbon mag dich</b><span>Du hast gefragt und gewartet. Er hat entschieden.</span>', 'ly-t-herz'); }
        else S.merke.hundZuSchnell = (S.merke.hundZuSchnell || 0) + 1;
      } else {
        const n = S.merke.hundBesuche = (S.merke.hundBesuche || 0) + 1;
        hund.freude(); await erz(HUND_MOMENTE[n % HUND_MOMENTE.length]);
        if (n === 5) ui.toast('<b>🐕 Fünfmal bei Bonbon</b><span>Manche Pausen sind am besten mit Hund.</span>', 'ly-t-ent');
      }
      setTimeout(() => missionTank('sitzen'), 0);
    } finally {
      ui.dialogZu(); imGespraech = false; input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null; sperreBis = performance.now() + 600; sichern();
    }
  }
  // Gespräch mit einem Stammgast: einmal je Kapitel eine neue Szene, sonst ein kurzer Satz
  // ---------- Situationen (situationen.js): Lichtung, Épicerie – eigene Gespräche mit Abblende, Folgen, Nachrichten ----------
  const sitApi = () => ({
    sag: async (wer, t) => {
      const L = SIT_LEUTE[wer] || STAMM.find((q) => q.id === wer);
      const w = wer === 'zu' ? { wer: 'Ein paar Leute', farbe: '#5b6472' } : CHAT_NAMEN[wer] ? { wer: '📱 ' + CHAT_NAMEN[wer], farbe: '#5b6472' } : L ? { wer: L.stumm ? 'Jemand' : L.name, farbe: L.farbe } : sprecher(wer === 'du' ? 'du' : wer === 'e' ? 'erzaehler' : wer);
      const x = statisten.find((q) => q.d.sitPerson === wer && !q.weg) || statisten.find((q) => q.d.stamm === wer && !q.weg && q.f.group.visible && steuerung.pos.distanceTo(q.f.group.position) < 8);
      // Gesprächskamera wie in der Geschichte: über die Schulter auf die Person, die spricht; sprichst du, schaut die Kamera dich an
      if (x) steuerung.fokus = x.f.group.position;
      steuerung.gegenSchuss = wer === 'du' && !!steuerung.fokus;
      if (x && x.f.redet) x.f.redet(true);
      { const g = gesteZu(t), f = wer === 'du' ? spieler : x && x.f; if (g && f && f.geste) setTimeout(() => f.geste(g), 250); }
      if (spieler && spieler.redet) spieler.redet(wer === 'du');
      await ui.sprich({ ...w, text: ersetze(t) });
      if (x && x.f.redet) x.f.redet(false);
    },
    wahl: (o) => ui.waehle(o),
    blende: async (t) => { ui.dialogZu(); await ui.blende(t); await new Promise((r) => setTimeout(r, 1400)); await ui.blendeAus(300); },
    merke: (k, v = true) => { S.merke[k] = v; sichern(); },
    m: () => S.merke,
    nachricht: (von, t) => { (S.merke.nachrichten = S.merke.nachrichten || []).push([von, t]); },
    teleport: (ort) => { const o = welt.orte[ort]; if (o) { steuerung.fokus = null; steuerung.gegenSchuss = false; steuerung.teleport(o.x, o.z, o.yaw); } },
    deko: (n, an) => { if (DORF_DEKO[n]) DORF_DEKO[n].visible = an; },
    ton: (n) => (['vogel', 'spruehen', 'dose'].includes(n) ? audio.play(n) : ton(n)),
  });
  async function sitGespraech(fn, gp) {
    if (imGespraech) return;
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null); if (gp) steuerung.fokus = gp;
    try { await fn(); } finally {
      ui.dialogZu(); imGespraech = false; input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null; steuerung.gegenSchuss = false; if (spieler && spieler.redet) spieler.redet(false); sperreBis = performance.now() + 900; sichern(); sitSichtbarkeit();
    }
  }
  let sitLaeuft = false;
  async function sitStart(id) {
    if (sitLaeuft) return; sitLaeuft = true; ui.pauseImDialog = true;
    if (!S.merke.sitPauseTipp) { S.merke.sitPauseTipp = true; ui.toast('<b>⏸ Kurz raus geht immer</b><span>Wenn es zu viel wird: P drücken. Auch mitten im Gespräch.</span>'); }
    try {
      await sitGespraech(async () => {
        const a = sitApi(), kap = (SCHRITTE[S.schritt] || {}).kap || 1;
        await SIT_FN[id](a);
        S.merke.sitWeg = { ...(S.merke.sitWeg || {}), [id]: S.schritt }; S.merke['sitKap_' + id] = kap;
        if (!S.merke['sit_' + id]) S.merke['sit_' + id] = 'erlebt';
        S.merke.situationen = (S.merke.situationen || 0) + 1;
        const [ic, ti, tx] = SZENEN[id].titel;
        ui.toast('<b>' + ic + ' Erlebt: ' + ti + '</b><span>' + tx + '</span>', 'ly-t-ent');
      });
    } finally { sitLaeuft = false; ui.pauseImDialog = false; }
  }
  function sitZonen(p) {
    if (!S || !laeuft || imGespraech || probe || steuerung.brett || gesperrt() || !risikoAn()) return;
    const kap = (SCHRITTE[S.schritt] || {}).kap || 1;
    const sid = (SCHRITTE[S.schritt] || {}).id;
    for (const z of SIT_ZONEN) if (sitOffen(z.id, kap, S.merke || {}, sid, uhrJetzt) && Math.hypot(p.x - z.x, p.z - z.z) < z.r) { sitStart(z.id); return; }
  }
  async function sitRede(x) {
    const id = x.d.sitPerson, kap = (SCHRITTE[S.schritt] || {}).kap || 1, gp = x.f.group.position;
    const sz = SIT_LEUTE[id].szene;
    if (sz && sitOffen(sz, kap, S.merke, (SCHRITTE[S.schritt] || {}).id, uhrJetzt) && risikoAn()) return sitStart(sz);
    await sitGespraech(async () => {
      const a = sitApi();
      if (id === 'lisette' && S.merke.sit_laden === 'geklaut' && !S.merke.zurueckgebracht) {
        const w = await a.wahl(['Die Gummibärchen bezahlen. Ehrlich sagen.', '„Moien!“ (Nur Hallo sagen.)']);
        if (w === 0) { await zurueckbringen(a); S.merke.zurueckKap = kap; ui.toast('<b>🧾 Wiedergutgemacht</b><span>Zurückkommen braucht Mut. Du hattest ihn.</span>', 'ly-t-ent'); return; }
      }
      const pool = sitSaetze(id, S.merke), n = (S.merke['sitn_' + id] = (S.merke['sitn_' + id] || 0) + 1);
      await a.sag(id, pool[n % pool.length]);
    }, gp);
  }

  async function stammRede(x) {
    const st = STAMM.find((q) => q.id === x.d.stamm); if (!st || imGespraech) return;
    const kap = (SCHRITTE[S.schritt] || {}).kap || 1, sitzt = x.d.steht && x.d.steht[3] === 'sitzt', gp = x.f.group.position, p = steuerung.pos;
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null); steuerung.fokus = gp;
    if (!sitzt) { x.f.group.rotation.y = Math.atan2(p.x - gp.x, p.z - gp.z); x.f.spiele('Interact', { tempo: 0.55 }); }
    const neuBekannt = !S.merke['stk_' + st.id];
    try {
      const sz = stammSzene(st, kap, S.merke, x.planSaetze);
      const spiel = async (zeilen) => {
        for (const z of zeilen) {
          if (Array.isArray(z)) {
            const [w, t] = z;
            const wer = w === 's' ? { wer: st.name, farbe: st.farbe } : sprecher(w === 'du' ? 'du' : 'erzaehler');
            if (w === 's' && x.f.redet) x.f.redet(true);
            await ui.sprich({ ...wer, text: ersetze(t) });
            if (x.f.redet) x.f.redet(false);
          } else if (z && z.wahl) {
            const i = await ui.waehle(z.wahl.map((o) => o.t)), o = z.wahl[i] || z.wahl[0];
            if (o.merke) { const [k, v] = o.merke.split('='); S.merke[k] = v != null ? Number(v) : true; }
            if (o.dann) await spiel(o.dann);
          }
        }
      };
      await spiel(sz.zeilen);
      if (sz.neu) { S.merke[sz.key] = true; S.merke.stammBesuche = (S.merke.stammBesuche || 0) + 1; }
      if (neuBekannt) { S.merke['stk_' + st.id] = true; ui.toast('<b>⭐ Stammgast: ' + st.name + '</b><span>Immer hier. Jede Woche gibt es etwas Neues.</span>', 'ly-t-ent'); }
    } finally {
      ui.dialogZu(); if (x.f.redet) x.f.redet(false);
      const h = x.d.steht && x.d.steht[3]; if (h === 'redet') x.f.spiele('Interact', { tempo: 0.35 }); else if (h === 'handy') x.f.spiele('Idle_Neutral'); else if (h !== 'sitzt') x.f.spiele('Idle');
      if (x.d.steht && !sitzt) x.f.group.rotation.y = x.d.steht[2];
      imGespraech = false; input.setEnabled(true); steuerung.frei = true; steuerung.fokus = null; sperreBis = performance.now() + 600; sichern();
    }
  }
  async function aktion(i) {
    setTimeout(() => missionTank(i.tu), 0);
    if (i.tu === 'sitzen') { await ia.tu(i); sperreBis = performance.now() + 350; return; }
    if (i.tu === 'hund') { await hundBesuch(); return; }
    if (i.tu === 'statist' && i.st.d.stamm) { await stammRede(i.st); return; }
    if (i.tu === 'statist' && i.st.d.sitPerson) { await sitRede(i.st); return; }
    if (i.tu === 'statist') { gruss(i.st); sperreBis = performance.now() + 1200; return; }
    if (i.tu === 'zufall') { imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null);
      try { await zufall.tu(); } finally { ui.dialogZu(); imGespraech = false; input.setEnabled(true); steuerung.frei = true; sperreBis = performance.now() + 500; } return; }
    if (i.tu === 'skate') { ui.hinweis(null); await ia.tu(i); sperreBis = performance.now() + 500; return; }
    imGespraech = true; input.setEnabled(false); steuerung.frei = false; ui.hinweis(null); vib(12);
    try { await ia.tu(i); } finally { imGespraech = false; input.setEnabled(true); steuerung.frei = true; sperreBis = performance.now() + 350; }
  }

  // ---------- Schleife ----------
  let laufZeit = 0, spielerBlickV = null, hsPartner = null;
  // Steuerung lernen beim Tun (AAA: Hinweise genau dann, wenn sie passen – jeder nur einmal, dann gemerkt)
  const TOUCH = matchMedia('(pointer: coarse)').matches;
  let freiZeit = 0, stillZeit = 0, zielSchrittAlt = -1, zielZeit = 0, spielZeit = 0, pauseErinnert = false;
  const tipp = (id, html) => { if (!S || !S.merke || S.merke['tipp_' + id]) return; S.merke['tipp_' + id] = true; ui.toast('<b>💡 Tipp</b><span>' + html + '</span>'); };
  function tippTick(dt) {
    if (!laeuft || !S || imGespraech || ui.ebeneArt() || foto || steuerung.brett) return;
    freiZeit += dt;
    if (steuerung.laeuft) stillZeit = 0; else stillZeit += dt;
    if (freiZeit > 25 && (TOUCH ? steuerung.tempo < 3.5 : true) && laufZeit > 6) tipp('rennen', TOUCH ? 'Joystick ganz nach außen schieben = rennen.' : 'Umschalt halten = langsam gehen. Ohne Umschalt rennst du (im Gang lieber nicht vor Lehrkräften 😉).');
    if (freiZeit > 90) tipp('journal', TOUCH ? '☰ oben rechts: Journal mit Freundschaften, Stärken und Entdeckungen.' : 'Tab = Journal: Freundschaften, Stärken, Entdeckungen.');
    spielZeit += dt;
    if (spielZeit > 45 * 60 && !pauseErinnert) { pauseErinnert = true; ui.toast('<b>🌿 Kleine Pause?</b><span>Du spielst seit 45 Minuten. Schau 20 Sekunden aus dem Fenster, streck dich. Das Spiel wartet.</span>'); }
    if (freiZeit > 200) tipp('foto', TOUCH ? '📷 oben: Fotomodus. Pose wählen, Filter, speichern.' : 'C = Fotomodus. Pose wählen, Filter, speichern.');
    if (spruchWer && spruchWer.d && spruchWer.d.steht && Math.hypot(spruchWer.f.group.position.x - steuerung.pos.x, spruchWer.f.group.position.z - steuerung.pos.z) < 5) tipp('winken', TOUCH ? 'Lange auf die Person tippen oder 👋 = winken.' : 'H = winken. Manche winken zurück.');
    // Lange kein Fortschritt im aktuellen Auftrag: Ziel-Box pulsiert und ein sanfter Hinweis (nicht nervig: einmal je Auftrag)
    if (S.schritt !== zielSchrittAlt) { zielSchrittAlt = S.schritt; zielZeit = 0; }
    zielZeit += dt;
    if (zielZeit > 75 && !S.fertig && !S.merke['tippZiel_' + S.schritt]) { S.merke['tippZiel_' + S.schritt] = true; ui.auftragPuls && ui.auftragPuls(); ui.toast('<b>🧭 Wohin?</b><span>Oben links steht dein Ziel. Der gelbe Pfeil am Rand zeigt die Richtung. ☰ → „Was soll ich tun?“ hilft auch.</span>'); }
  }
  // ---------- Staub im Licht: drinnen am Tag schweben feine Teilchen um die Kamera (wie in großen Spielen, kostet fast nichts) ----------
  const STAUB_N = 70, STAUB_R = 4;   // Staub im Licht: dezent (viele helle Punkte wirkten wie Bildfehler)
  const staubPos = new Float32Array(STAUB_N * 3), staubPhase = new Float32Array(STAUB_N);
  for (let k = 0; k < STAUB_N; k++) { staubPos[k * 3] = (Math.random() * 2 - 1) * STAUB_R; staubPos[k * 3 + 1] = 0.4 + Math.random() * 2.6; staubPos[k * 3 + 2] = (Math.random() * 2 - 1) * STAUB_R; staubPhase[k] = Math.random() * 6.28; }
  const staubGeo = new THREE.BufferGeometry(); staubGeo.setAttribute('position', new THREE.BufferAttribute(staubPos, 3));
  // Punkte als weiche Scheiben bzw. Blätter statt als eckige Pixel
  const punktTex = (art) => { const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d');
    if (art === 'blatt') { g.translate(32, 32); g.rotate(0.6); g.fillStyle = '#fff'; g.beginPath(); g.ellipse(0, 0, 26, 13, 0, 0, Math.PI * 2); g.fill(); g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(-24, 0); g.lineTo(24, 0); g.stroke(); }
    else { const rg = g.createRadialGradient(32, 32, 0, 32, 32, 30); rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.45, 'rgba(255,255,255,0.65)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.fillRect(0, 0, 64, 64); }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const TEX_RUND = punktTex('rund'), TEX_BLATT = punktTex('blatt');
  const staubMat = new THREE.PointsMaterial({ size: 0.03, map: TEX_RUND, color: 0xfff1d0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const staub = new THREE.Points(staubGeo, staubMat); staub.frustumCulled = false; staub.visible = false; scene.add(staub);
  let staubT = 0;
  // Lebendige Welt: Wer im Haus an einer Lehrkraft vorbeirennt, wird ermahnt – freundlich, mit Persönlichkeit, höchstens
  // alle 45 Sekunden (Systeme, die auf den Spieler reagieren, statt nur Kulisse zu sein).
  const GANG_SPRUCH = { hoffmann: ['Hé! Doucement! Das ist kein Sportfest.', 'Langsam! Ich hab noch Kaffee in der Hand.'], kaya: ['Hey, Tempo raus. Die Treppe läuft nicht weg.', 'Rennen im Gang? Dein Puls sagt danke.'],
    mesenberg: ['Langsam. Wer rennt, sieht nichts.'], rantini: ['Pas de course dans le couloir!', 'Rennen? Gerne. Draußen.'], weber: ['Nicht rennen! Ich hab hier gerade gewischt.'],
    kremer: ['Langsam, sonst landest du in der Suppe!'], sommer: ['Schöner Sprint! Aber bitte auf dem Platz.'], laurent: ['Chut! Und langsam. Beides.'] };
  let gangPause = 25;
  function gangRegel(dt) {
    gangPause -= dt;
    if (gangPause > 0 || !laeuft || !S || imGespraech || steuerung.brett || steuerung.tempo < 4.2) return;
    const p = steuerung.pos, r = welt.raumBei(p.x, p.z); if (!r || !/gang|halle/.test(r.id)) return;
    for (const [id, l] of Object.entries(leute)) {
      if (!GANG_SPRUCH[id] || !l.f.group.visible || Math.hypot(l.pos.x - p.x, l.pos.z - p.z) > 7) continue;
      const T = GANG_SPRUCH[id]; blase({ f: l.f, d: {} }, T[Math.floor(Math.random() * T.length)], 2800); gangPause = 45; return;
    }
  }
  // Jahreszeiten (AAA: die Welt verändert sich übers Jahr): Herbstlaub (Kap. 1–4), Schnee (Dez./Feb., Kap. 5–6),
  // Blüten (März/April, Kap. 7–8). Nur draußen, nur am Tag, leicht und langsam; bei Regen nichts davon.
  const SAISON_N = 140, SAISON_R = 14;
  const saisonPos = new Float32Array(SAISON_N * 3), saisonPh = new Float32Array(SAISON_N);
  for (let k = 0; k < SAISON_N; k++) { saisonPos[k * 3] = (Math.random() - 0.5) * SAISON_R * 2; saisonPos[k * 3 + 1] = Math.random() * 9; saisonPos[k * 3 + 2] = (Math.random() - 0.5) * SAISON_R * 2; saisonPh[k] = Math.random() * 6.28; }
  const saisonGeo = new THREE.BufferGeometry(); saisonGeo.setAttribute('position', new THREE.BufferAttribute(saisonPos, 3));
  const saisonMat = new THREE.PointsMaterial({ size: 0.09, map: TEX_BLATT, alphaTest: 0.4, color: 0xd9822b, transparent: true, opacity: 0, depthWrite: false });
  const saison = new THREE.Points(saisonGeo, saisonMat); saison.frustumCulled = false; saison.visible = false; scene.add(saison);
  const SAISON = { laub: { farbe: 0xd9822b, fall: 0.7, wind: 0.9, groesse: 0.1 }, schnee: { farbe: 0xffffff, fall: 0.55, wind: 0.35, groesse: 0.07 }, blueten: { farbe: 0xf6c1d4, fall: 0.45, wind: 0.8, groesse: 0.07 } };
  let saisonT = 0;
  // Deko je Monat (requisiten.js, plaetze mit saison): Kürbisse im Oktober, Weihnachten im Dezember, Winter bis Februar
  const DEKO_KAP = { herbst: [3, 4], halloween: [3], weihnacht: [5], winter: [5, 6], fruehling: [7, 8], sommer: [9, 10] };
  let dekoKap = -1;
  // Annexe News an der Pinnwand: jede Woche eine neue Ausgabe; Zoés Umfrage-Ergebnis mit deiner Antwort
  const KURZ_NOTIERT = { 1: 'Die Hallenuhr geht drei Minuten nach. Fernand arbeitet dran. Seit 1998.', 2: 'Coding-Club sucht Testpersonen. Informatik, mittwochs 13 Uhr.',
    3: 'Nach dem Sportfest fehlen zwei orange Hütchen. Hinweise an Fernand.', 4: 'Bonbon hat Geburtstag. Leckerli nur über die SePAS!', 5: 'Bandprobe: Noor und Gilles suchen immer noch einen Bass.',
    6: 'Lou bewertet jetzt auch Menschen. Bisher nur gute Noten.', 7: 'Paulo bringt Karotten. Fernand isst sie. Mittags im Hinterhof.', 8: 'Gerumpel im Informatikraum: Der Roboter sagt jetzt „HALLO MENSCH“.',
    9: 'Tiagos Spiel ist fast fertig. Version 0.9. Wer testet?', 10: 'Schulfest: Noor am Schlagzeug, Gilles singt. Erste Reihe freihalten!' };
  const ZEITUNG_TITEL = { 1: 'Willkommen, neue 7ème!', 2: 'Talenttag: Wer wackelt mit den Ohren?', 3: 'Sportfest: Alle sind angekommen', 4: 'Test-Woche: 5 Tipps gegen Stress',
    5: 'De Kleeschen kommt am 6.!', 6: 'Fuesend in der Aula', 7: 'Praktikum: Was wir gelernt haben', 8: 'Fake oder echt? 3 Fragen', 9: 'Schlaf-Spezial', 10: 'Letzte Ausgabe: Danke!' };
  const zeitung = (() => {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 680;
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.2), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    m.position.set(-7.755, 1.75, -9.2); m.rotation.y = Math.PI / 2; scene.add(m);
    return { cv, tex };
  })();
  function zeitungNeu(kap) {
    const g = zeitung.cv.getContext('2d'), W = 512;
    g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, W, 680); g.fillStyle = '#e85d75'; g.fillRect(0, 0, W, 96);
    g.fillStyle = '#fff'; g.font = 'bold 54px system-ui'; g.textAlign = 'center'; g.fillText('ANNEXE NEWS', W / 2, 64);
    g.fillStyle = '#2b3a55'; g.font = '22px system-ui'; g.fillText('Ausgabe ' + kap + ' · ' + (MONAT[kap] || ''), W / 2, 130);
    const zeilen = (t, y, px, max = 22) => { g.font = px; const w = t.split(' '); let z = ''; for (const x of w) { if ((z + ' ' + x).trim().length > max) { g.fillText(z.trim(), W / 2, y); y += parseInt(px.match(/(\d+)px/)[1], 10) + 8; z = x; } else z += ' ' + x; } if (z.trim()) { g.fillText(z.trim(), W / 2, y); y += 40; } return y; };
    g.fillStyle = '#2b2b33'; let y = zeilen(ZEITUNG_TITEL[kap] || 'Neues aus der Annexe', 190, 'bold 38px system-ui', 20);
    g.fillStyle = '#c9ccd2'; g.fillRect(40, y, W - 80, 3); y += 50;
    const v = kap - 1, a = S && S.merke ? S.merke['zoe_' + v] : null;
    const U = { 1: ['Ein Wort für die Annexe?', ['Groß', 'Laut', 'Eigentlich okay'], [31, 44, 25]], 2: ['Gruppenchat oder Gruppenarbeit?', ['Gruppenchat', 'Gruppenarbeit', 'Beides'], [48, 21, 31]], 3: ['Sportfest: mitmachen?', ['Mitmachen', 'Zuschauen', 'Snacks verkaufen'], [52, 30, 18]],
      4: ['Handy pro Tag?', ['Unter zwei', 'Zwei bis vier', 'Mehr'], [17, 46, 37]], 5: ['Was zählt im Dezember?', ['Ferien', 'Geschenke', 'Leute treffen'], [44, 19, 37]], 6: ['Welchen Satz öfter hören?', ['„Gut gemacht.“', '„Ich hör dir zu.“', '„Pizza ist da.“'], [33, 29, 38]],
      7: ['Wo sitzt du in der Kantine?', ['Am Fenster', 'Bei meinen Leuten', 'Egal'], [24, 58, 18]], 8: ['Glaubst du, was online steht?', ['Fast nie', 'Manchmal', 'Kommt drauf an'], [21, 47, 32]], 9: ['Was hilft beim Einschlafen?', ['Musik', 'Mit wem reden', 'Nichts'], [41, 23, 36]] };
    if (U[v]) {
      g.fillStyle = '#e85d75'; g.font = 'bold 26px system-ui'; g.fillText('UMFRAGE DER LETZTEN WOCHE', W / 2, y); y += 40;
      g.fillStyle = '#2b3a55'; y = zeilen(U[v][0], y, '26px system-ui', 30) + 6;
      U[v][1].forEach((o, i) => { const p = U[v][2][i]; g.fillStyle = a === i ? '#e85d75' : '#9fb3c8'; g.fillRect(60, y - 22, (W - 220) * p / 60, 28); g.fillStyle = '#2b2b33'; g.textAlign = 'left'; g.font = (a === i ? 'bold ' : '') + '22px system-ui'; g.fillText(o + ' · ' + p + ' %' + (a === i ? '  ← du' : ''), 64, y + 34); g.textAlign = 'center'; y += 74; });
    } else { g.fillStyle = '#5b6472'; g.font = 'italic 24px system-ui'; g.fillText('Mach mit! Zoé fragt in der Halle.', W / 2, y + 20); }
    // Kurz notiert: Neues von den Stammgästen – manches reagiert auf das, was du getan hast
    const m = (S && S.merke) || {};
    const kurz = m.zurueckKap && (kap === m.zurueckKap || kap === m.zurueckKap + 1) ? 'Épicerie: Jemand kam zurück und hat bezahlt. Tante Lisette sagt: Respekt.'
      : m.sit_graffiti === 'kiesser' && kap > (m.sitKap_graffiti || 99) ? 'Neubau: Die große Wand bekommt Farbe. Ein 5ème zeichnet vor.'
      : m.romyMesenberg && kap === (m.sitKap_zaun || 0) + 1 ? 'Sport: Handys bleiben draußen. In der Umkleide filmt niemand. Nie.'
      : m.sit_halle && kap === (m.sitKap_halle || 0) + 1 ? 'Streit gefilmt? Nicht teilen. Melden. Die Redaktion.'
      : m.lenningGesagt && kap === (m.sitKap_video || 0) + 1 ? 'Der Account „annexe.memes“ ist weg. Danke an alle, die ihn gemeldet haben.'
      : m.vapeKuedes && kap === (m.sitKap_vape || 0) + 1 ? 'SePAS: Neue Sprechstunde „Weg vom Vape“. Anonym. Dienstags.'
      : m.sit_link && kap === (m.sitKap_link || 0) + 1 ? 'Gratis-Diamanten? Fake! Drei Fragen: Wer? Wohin? Wer hat was davon?'
      : m.sit_kiste && kap === (m.sitKap_kiste || 0) + 1 ? 'Coding-Club: Tiagos Spiel hat jetzt einen Knopf „Keine Kisten“.'
      : m.sit_wald && kap >= 5 && kap % 2 === 1 ? 'Forstverwaltung: Bitte keinen Müll an der Lichtung. Fernand dankt.'
      : (m.sit_laden === 'bezahlt' || m.sit_laden === 'gesagt') && kap === 6 ? 'Épicerie: Gummibärchen im Angebot. Bezahlt schmecken sie besser.'
      : m.huetchen >= 2 && kap >= 3 ? 'Beide Sportfest-Hütchen sind zurück! Fernand dankt der unbekannten Person.'
      : m.huetchen === 1 && kap >= 3 ? 'Ein Hütchen ist zurück. Eins ist noch auf der Flucht. Hinweise an Fernand.'
      : m.handyAbgegeben && kap >= 2 && kap % 2 === 0 ? 'Gefundenes Handy im Sekretariat abgegeben. Ehrlich ist cool.'
      : KURZ_NOTIERT[kap];
    if (kurz) {
      const yk = Math.max(y + 24, 575); g.textAlign = 'center';
      g.fillStyle = '#2b3a55'; g.fillRect(40, yk - 30, W - 80, 2); g.font = 'bold 20px system-ui'; g.fillText('KURZ NOTIERT', W / 2, yk);
      g.fillStyle = '#2b2b33'; zeilen(kurz, yk + 30, '20px system-ui', 40);
    }
    zeitung.tex.needsUpdate = true;
  }
  function saisonTick(dt) {
    const kap = (S && SCHRITTE[S.schritt] && SCHRITTE[S.schritt].kap) || 1;
    if (kap !== dekoKap && req.saison) { dekoKap = kap; for (const [k, m] of Object.entries(req.saison)) m.visible = (DEKO_KAP[k] || []).includes(kap); try { zeitungNeu(kap); } catch (e) { /* Zeitung */ } }
    const art = kap <= 4 ? 'laub' : kap <= 6 ? 'schnee' : kap <= 8 ? 'blueten' : null, A = art && SAISON[art];
    const draussen = !welt.raumBei(steuerung.pos.x, steuerung.pos.z);
    const ziel = laeuft && A && draussen && !(sky.night > 0.5) && regenJetzt < 0.1 ? 0.9 : 0;
    saisonMat.opacity = draussen ? saisonMat.opacity + (ziel - saisonMat.opacity) * Math.min(1, dt * 1.2) : 0;
    saison.visible = saisonMat.opacity > 0.02; if (!saison.visible || !A) return;
    saisonMat.color.setHex(A.farbe); saisonMat.size = A.groesse * (art === 'laub' ? 1.4 : 1.1); const tx = art === 'laub' ? TEX_BLATT : TEX_RUND; if (saisonMat.map !== tx) { saisonMat.map = tx; saisonMat.alphaTest = art === 'laub' ? 0.4 : 0.05; saisonMat.needsUpdate = true; }
    saisonT += dt; const c = camera.position, D = SAISON_R * 2;
    for (let k = 0; k < SAISON_N; k++) {
      const i = k * 3, ph = saisonPh[k];
      saisonPos[i] += (Math.sin(saisonT * 0.7 + ph) * 0.5 + A.wind * 0.4) * dt; saisonPos[i + 1] -= A.fall * (0.7 + 0.3 * Math.sin(ph)) * dt; saisonPos[i + 2] += Math.cos(saisonT * 0.5 + ph) * 0.4 * dt;
      let dx = saisonPos[i] - c.x; if (dx > SAISON_R) saisonPos[i] -= D; else if (dx < -SAISON_R) saisonPos[i] += D;
      let dz = saisonPos[i + 2] - c.z; if (dz > SAISON_R) saisonPos[i + 2] -= D; else if (dz < -SAISON_R) saisonPos[i + 2] += D;
      if (saisonPos[i + 1] < 0.05) saisonPos[i + 1] = 8 + Math.random() * 2;
    }
    saisonGeo.attributes.position.needsUpdate = true;
  }
  function staubTick(dt) {
    const r = welt.raumBei(steuerung.pos.x, steuerung.pos.z), ziel = r && !(sky.night > 0.5) ? 0.22 : 0;
    staubMat.opacity += (ziel - staubMat.opacity) * Math.min(1, dt * 1.5);
    staub.visible = staubMat.opacity > 0.01; if (!staub.visible) return;
    staubT += dt; const c = camera.position, D = STAUB_R * 2;
    for (let k = 0; k < STAUB_N; k++) {
      const i = k * 3, ph = staubPhase[k];
      staubPos[i] += Math.sin(staubT * 0.3 + ph) * 0.05 * dt; staubPos[i + 1] += (Math.sin(staubT * 0.21 + ph * 2) * 0.03 - 0.008) * dt; staubPos[i + 2] += Math.cos(staubT * 0.26 + ph) * 0.05 * dt;
      // um die Kamera herum halten (Teilchen, die zu weit weg sind, tauchen auf der anderen Seite wieder auf)
      let dx = staubPos[i] - c.x; if (dx > STAUB_R) staubPos[i] -= D; else if (dx < -STAUB_R) staubPos[i] += D;
      let dz = staubPos[i + 2] - c.z; if (dz > STAUB_R) staubPos[i + 2] -= D; else if (dz < -STAUB_R) staubPos[i + 2] += D;
      if (staubPos[i + 1] < 0.3) staubPos[i + 1] = 3; else if (staubPos[i + 1] > 3.1) staubPos[i + 1] = 0.4;
    }
    staubGeo.attributes.position.needsUpdate = true;
  }
  // ---------- Fotomodus ----------
  let foto = null;
  const FOTO_FILTER = { warm: 'sepia(.22) saturate(1.25) hue-rotate(-8deg) brightness(1.04)', kalt: 'saturate(.9) hue-rotate(12deg) brightness(1.03) contrast(1.05)', sw: 'grayscale(1) contrast(1.18)', retro: 'sepia(.45) contrast(.9) saturate(1.35) brightness(1.06)' };
  ui.onFoto = () => {
    if (foto || !laeuft || imGespraech || ui.ebeneArt() || !spieler || steuerung.brett || steuerung.kameraAus) return;
    const canvas = rr.renderer.domElement;
    foto = { yaw: steuerung.cam.yaw + Math.PI, pitch: 0.18, dist: 3.2, dof: 0.35, filter: '' };   // von vorn auf die Figur
    input.setEnabled(false); steuerung.frei = false; steuerung.kameraAus = true;
    ui.fotoAuf({
      dreh: (dx, dy) => { foto.yaw -= dx * 0.006; foto.pitch = Math.max(-0.12, Math.min(1.25, foto.pitch + dy * 0.004)); },
      zoom: (d) => { foto.dist = Math.max(1.1, Math.min(9, foto.dist + d)); },
      pose: (a) => { steuerung.emote = a === 'Idle' ? null : a; steuerung.emoteBis = performance.now() + 1e9; },
      filter: (f) => { foto.filter = f; canvas.style.filter = FOTO_FILTER[f] || ''; },
      dof: (v) => { foto.dof = v; },
      knips: () => {
        rr.render({ night: sky.night, time: loop.time, sun: sky.sunDir, sunColor: sky.colors && sky.colors.light });
        const c2 = document.createElement('canvas'); c2.width = canvas.width; c2.height = canvas.height;
        const x = c2.getContext('2d'); x.filter = FOTO_FILTER[foto.filter] || 'none'; x.drawImage(canvas, 0, 0); x.filter = 'none';
        const fs = Math.round(c2.height * 0.026); x.font = '800 ' + fs + 'px system-ui, sans-serif'; x.textAlign = 'right';
        x.fillStyle = 'rgba(0,0,0,.35)'; x.fillText('Annexe · 7P2', c2.width - fs * 1.1 + 1, c2.height - fs * 0.9 + 1);
        x.fillStyle = 'rgba(255,255,255,.88)'; x.fillText('Annexe · 7P2', c2.width - fs * 1.1, c2.height - fs * 0.9);
        try { const a = document.createElement('a'); a.download = 'annexe-foto-' + new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.png'; a.href = c2.toDataURL('image/png'); document.body.appendChild(a); a.click(); a.remove(); } catch (e) { /* manche Browser erlauben kein Speichern */ }
        ton('pling'); S.merke.fotos = (S.merke.fotos || 0) + 1; sichern();
      },
      zu: () => { canvas.style.filter = ''; steuerung.emote = null; steuerung.kameraAus = false; steuerung.frei = true; input.setEnabled(true); foto = null; rr.setDof(0); steuerung.kamera(0.016, true); },
    });
  };
  let laeuft = false, raumAlt = undefined, geheimT = 0, klangT = 1, bankT = 0, trommelT = 1;
  // Während eines Minispiels auf eigener Fläche (Bandprobe, Tischtennis, Freiwurf) ruht die 3D-Welt fast ganz:
  // sie ist ohnehin verdeckt, und der Takt im Spiel braucht die Rechenzeit.
  let ruheN = 0, titelT = 0;
  // ---------- Kapitel-Vorspann: Kamerafahrt über die Schule zur Tageszeit des ersten Schritts (ui.vorspann zeigt Titel) ----------
  const VORSPANN = {
    1: 'Neue Schule. Neue Leute. Und ein Account, der alles sieht.', 2: 'Eine Liste. Fünf Namen. Und Noah ist Platz 1.',
    3: 'Sportfest-Woche. Und jemand hat die Kamera schon an.', 4: 'Ein Test. Ein weißer Bildschirm. Und Zahlen von 0 bis 100.',
    5: 'Ein Screenshot mit deinem Namen. Und alle schauen.', 6: 'Ein Satz kann trennen. Ein Satz kann reparieren.',
    7: 'Zwei Gruppen. Eine Kantine. Und du entscheidest, wo du sitzt.', 8: '300 Herzen für ein Video, das nie passiert ist.',
    9: 'Dario kann nicht schlafen. Er trägt etwas mit sich herum.', 10: 'Letzte Woche. Lampions. Und eine Wahrheit.',
  };
  let kino = null;   // { t, a0 } während des Vorspanns
  async function vorspann(st) {
    sky.time.setTimeOfDay(st.uhr);
    // Wohin die Kamera fährt: meist über die ganze Schule, in manchen Kapiteln zum Ort, um den es geht
    const ORT = { 3: { x: -72, z: -6, r: 46, h: 20 }, 7: { x: 16, z: -8, r: 52, h: 22 }, 10: { x: 0, z: 18, r: 58, h: 22 } };
    kino = { t: 0, a0: 0.55 * st.kap, ziel: ORT[st.kap] || { x: 0, z: -14, r: 92, h: 26 } };
    try { await ui.vorspann({ nr: st.kap, titel: KAPITEL[st.kap] || kapName(st.kap), zeile: VORSPANN[st.kap] || '', ort: MONAT[st.kap] || '' }); } finally { kino = null; }
  }
  function kinoKamera(dt) {
    kino.t += dt;
    const ruhig = ui.wenigBewegung, k = Math.min(1, kino.t / 6), e = k * k * (3 - 2 * k);   // weich ein- und ausfahren
    const z = kino.ziel, a = kino.a0 + (ruhig ? 0 : e * 0.32), r = (ruhig ? 0.76 : 1 - 0.33 * e) * z.r, h = ruhig ? z.h * 0.62 : z.h - z.h * 0.5 * e;
    camera.position.set(z.x + Math.sin(a) * r, h, z.z + 22 + Math.cos(a) * r);
    camera.lookAt(z.x, 6 + (ruhig ? 0 : 2 * (1 - e)), z.z);
  }
  // Wetter (AAA: Welt mit Stimmung): Regen an schweren Montagen (Kap. 5 nach dem Fake, Kap. 9 mit Dario). Kein Gewitter, keine Blitze.
  const REGEN = new Set(['k5_morgen', 'k5_saal', 'k5_skills', 'k9_dario', 'k9_skills']);
  let regenJetzt = 0;
  function regenTick(dt) {
    const st = S && SCHRITTE[S.schritt], ziel = laeuft && st && REGEN.has(st.id) && !S.fertig ? 1 : 0;
    regenJetzt += (ziel - regenJetzt) * Math.min(1, dt * 0.4);
    if (regenJetzt < 0.01) return;
    const drin = !!welt.raumBei(steuerung.pos.x, steuerung.pos.z);
    try { const u = sky.rain.material.uniforms; u.uAmt.value = drin ? 0 : regenJetzt * 1.9; sky.rain.visible = !drin; u.uCam.value.copy(camera.position); } catch (e) { /* kein Regen im Himmel */ }
    // trüber Himmel: weniger Sonne, weniger Füll-Licht (die Szene wird grauer, nicht dunkel)
    if (sky.sun && sky.sun.isLight) sky.sun.intensity *= 1 - 0.5 * regenJetzt;
    sky.hemi.intensity *= 1 - 0.15 * regenJetzt; fuellLicht.intensity *= 1 - 0.6 * regenJetzt;
  }
  const loop = createLoop({ render: () => { if (ui.ebeneArt && ['spiel', 'szene', 'journal', 'handy', 'raus', 'ende', 'laden', 'skills', 'karte'].includes(ui.ebeneArt()) && (ruheN++ % 20)) return; rr.render({ night: sky.night, time: loop.time, sun: sky.sunDir, sunColor: sky.colors && sky.colors.light }); } });
  loop.add(() => input.beginFrame(), { order: -100, always: true });
  loop.add((dt) => {
    // Titelbild: langsame Kamerafahrt um die Schule (AAA: lebendiges Menü statt Standbild); bei „Weniger Bewegung“ fest
    if (!laeuft) { titelT += dt; const a = ui.wenigBewegung ? 0 : titelT * 0.02; camera.position.set(-36 * Math.cos(a) + 70 * Math.sin(a) * 0.5, 17 + Math.sin(titelT * 0.07) * 1.2 * (ui.wenigBewegung ? 0 : 1), 64 * Math.cos(a) + 30 * Math.sin(a)); camera.lookAt(0, 6, -10); return; }
    windZeit.value += dt; WOLKEN.value += dt; staubTick(dt); saisonTick(dt); gangRegel(dt);
    zufall.tick(dt, laeuft && S && !imGespraech && !ui.ebeneArt() && !steuerung.brett && !hs.aktiv && !foto && !steuerung.kameraAus && !steuerung.sitzt && !probe);
    steuerung.update(dt);
    if (kino) kinoKamera(dt);
    // Schärfentiefe im Gespräch: scharf auf die Person im Bild, Hintergrund weich (wie Kino-Szenen)
    if (foto) {   // Fotomodus: Kamera kreist um die eigene Figur
      const p = steuerung.pos, cp = Math.cos(foto.pitch);
      camera.position.set(p.x - Math.sin(foto.yaw) * cp * foto.dist, Math.max(0.25, 1.15 + Math.sin(foto.pitch) * foto.dist), p.z - Math.cos(foto.yaw) * cp * foto.dist);
      camera.lookAt(p.x, 1.15 - Math.min(0.3, foto.dist * 0.04), p.z);
      rr.setDof(foto.dof, foto.dist);
    } else if (steuerung.fokus && imGespraech && !ui.wenigBewegung) { const fz = steuerung.gegenSchussIst ? steuerung.pos : steuerung.fokus; rr.setDof(0.7, Math.max(1.2, Math.hypot(camera.position.x - fz.x, camera.position.z - fz.z))); }
    else rr.setDof(0);
    hs.tick(dt);
    tt3d.tick(dt);
    if (korbSpiel) korbSpiel.tick(dt);
    if (skateTick) skateTick(dt);
    if (wegTick) wegTick();
    if (spieler) {
      // die eigene Figur schaut, wer spricht – oder zur nächsten Person vor ihr (nicht beim Skaten)
      spielerBlickV = spielerBlickV || new THREE.Vector3();
      let ziel = null;
      if (imGespraech && sprichtJetzt && leute[sprichtJetzt] && leute[sprichtJetzt].f.group.visible) ziel = leute[sprichtJetzt].pos;
      else if (imGespraech && gegenueber) ziel = gegenueber.pos;
      else if (!steuerung.brett) { let bd = 4.5; for (const x of Object.values(leute)) { if (!x.f.group.visible) continue; const dd = Math.hypot(x.pos.x - steuerung.pos.x, x.pos.z - steuerung.pos.z); if (dd < bd) { bd = dd; ziel = x.pos; } } }
      spieler.blick(ziel ? spielerBlickV.set(ziel.x, 1.5, ziel.z) : null);
      spieler.update(dt);
    }
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
      // Blick: im Gespräch zur sprechenden Person (der Sprecher selbst zu dir), sonst zu dir, wenn du nah bist
      x.blickV = x.blickV || new THREE.Vector3();
      const sp2 = imGespraech && sprichtJetzt && leute[sprichtJetzt] && leute[sprichtJetzt] !== x ? leute[sprichtJetzt].pos : null;
      if (sp2 && Math.hypot(sp2.x - x.pos.x, sp2.z - x.pos.z) < 7) x.f.blick(x.blickV.set(sp2.x, 1.5, sp2.z));
      else if (d < 7 && (laeuft || x === gegenueber)) x.f.blick(x.blickV.set(p.x, 1.45 + (steuerung.sitzt ? -0.4 : 0), p.z));
      else x.f.blick(null);
      const will = zuMir ? Math.atan2(p.x - x.pos.x, p.z - x.pos.z) : x.basisYaw;
      let dd = will - x.yaw; dd = Math.atan2(Math.sin(dd), Math.cos(dd)); x.yaw += dd * Math.min(1, dt * 5);
      x.f.group.rotation.y = x.yaw;
      x.schild.visible = d < 9 && laeuft && !imGespraech && camera.position.distanceTo(x.pos) > 2.6;
      x.schild.material.opacity = Math.max(0, Math.min(1, (9 - d) / 3));
    }
    statistenBewegen(dt);
    sprueche(dt);
    hund.tick(dt, Math.hypot(steuerung.pos.x - hund.pos.x, steuerung.pos.z - hund.pos.z) < 3.2);
    if (natur) natur.sicht(camera, !!welt.raumBei(camera.position.x, camera.position.z));
    // Requisiten-Zellen nach Entfernung: drinnen nur die Nähe (Wände verdecken den Rest), draußen bis 150 m
    if ((reqSichtTakt = (reqSichtTakt + 1) % 12) === 0 && req.mesh) {
      const drin = !!welt.raumBei(camera.position.x, camera.position.z), max = drin ? 45 : 150;
      for (const m of req.mesh.children) { const bs = m.geometry.boundingSphere || (m.geometry.computeBoundingSphere(), m.geometry.boundingSphere); m.visible = bs.center.distanceTo(camera.position) - bs.radius < max; }
    }
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
    laufZeit = steuerung.laeuft ? laufZeit + dt : Math.max(0, laufZeit - dt * 4);
    tippTick(dt);
    // Handschlag möglich? Nächste befreundete Person in Reichweite (nicht im Gespräch, nicht beim Skaten)
    { let best = null, bd = 2.3;
      if (laeuft && !imGespraech && !hs.aktiv && !foto && !steuerung.brett && !steuerung.sitzt && !ui.ebeneArt() && spieler && spieler.armOk)
        for (const x of Object.values(leute)) { if (!x.f.group.visible || !hsKannMit(x)) continue; const d = Math.hypot(x.pos.x - p.x, x.pos.z - p.z); if (d < bd) { bd = d; best = x; } }
      if (best !== hsPartner) { hsPartner = best; ui.hsKnopf && ui.hsKnopf(best ? LEUTE[best.id].name : null); } }
    ui.auftragRuhe && ui.auftragRuhe(laufZeit > 5 && !ui.einstellungen().vorlesen);
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
    if (rid !== raumAlt) { if (raumAlt !== undefined) ui.raum(raum ? raum.name : 'Schulhof'); raumAlt = rid; raumHall(rid); }
    raumLicht.intensity += ((raum ? 1.15 : 0) - raumLicht.intensity) * Math.min(1, dt * 3);
    // Geräusche: draußen Wind und Vögel (am Tag), auf dem Hof Stimmen; drinnen leise, in der Kantine Geschirr. Kein Meer.
    // Stimmengewirr: je mehr Leute in der Nähe, desto lauter (Kantine, Gang, Hof in der Pause)
    let nah = 0; { const sp = steuerung.pos; for (const x of statisten) { if (x.weg) continue; const g = x.f.group.position; if (Math.abs(g.x - sp.x) < 14 && Math.abs(g.z - sp.z) < 14) nah++; } }
    const gewirr = Math.min(1, nah / 7) * (raum ? 1 : 0.6) * (sky.night > 0.5 ? 0.2 : 1);
    audio.setAmbience({ waves: 0, wind: regenJetzt > 0.05 ? (raum ? 0.12 : 0.85) * regenJetzt : (raum ? 0 : 0.35), birds: raum || regenJetzt > 0.3 ? 0 : 1, day: 1 - (sky.night || 0), night: raum ? 0 : (sky.night || 0), crowd: gewirr });
    audio.update();
    // Musik folgt dem Ort; im Gespräch werden Musik und Umgebung leiser (Ducking), damit man die Worte hört
    if (laeuft) musik.setRegion(raum ? 'annexeDrinnen' : 'annexeHof');
    { const d = imGespraech ? 0.55 : 0; if (Math.abs(d - (audio._duck || 0)) > 0.01) { audio._duck = d; try { audio.setDucking(d); } catch (e) { /* alt */ } } }
    musik.update();
    klangT -= dt;
    if (klangT <= 0) {
      klangT = 0.7 + Math.random() * 0.9;
      if (!raum && p.z > -2 && p.z < 40 && Math.abs(p.x) < 46 && !(sky.night > 0.5)) audio.play('stimmen');
      else if (rid === 'kantine') audio.play('geschirr');
      else if (!raum && p.x < -54 && p.z < -8 && !(sky.night > 0.5) && Math.random() < 0.55) audio.play('vogel');   // Waldweg und Lichtung
      else if (rid === 'gang' && ((uhrJetzt >= 8.0 && uhrJetzt < 9.85) || (uhrJetzt >= 10.4 && uhrJetzt < 11.95) || (uhrJetzt >= 13.6 && uhrJetzt < 15.4)) && Math.random() < 0.6) audio.play('unterricht');
    }
    // Noor übt im Musikraum (Stammgast): leiser Rhythmus, im Flur des Neubaus noch zu hören
    trommelT -= dt;
    if (trommelT <= 0) { trommelT = 2.4 + (Math.random() < 0.35 ? 2.4 : 0); if ((rid === 'musik' || rid === 'neubauFlur') && !(sky.night > 0.5)) audio.play(rid === 'musik' ? 'trommel' : 'trommelLeise'); }
    // Ansprechen
    sitZonen(p);
    naechste = imGespraech || steuerung.brett ? null : wenNah();
    iaNah = !naechste && !imGespraech && !probe && !steuerung.brett ? ia.naechste(p) : null;
    if (!naechste && !iaNah && !imGespraech && !probe && !steuerung.brett) iaNah = zufall.naechste(p);
    if (!naechste && !iaNah && !imGespraech && !probe && !steuerung.brett && Math.hypot(p.x - hund.pos.x, p.z - hund.pos.z) < 1.9) iaNah = { tu: 'hund', text: S.merke.hundFreund ? 'Bonbon streicheln' : 'Zu Bonbon gehen', x: hund.pos.x, z: hund.pos.z };
    if (!naechste && !iaNah && !imGespraech && !probe && !steuerung.brett) { const st = statistNah(p); if (st) { const sg = (st.d.stamm && STAMM.find((q) => q.id === st.d.stamm)) || (st.d.sitPerson && SIT_LEUTE[st.d.sitPerson]); iaNah = { tu: 'statist', text: sg && !sg.stumm ? 'Mit ' + sg.name.split(' ')[0] + ' reden' : 'Hallo sagen', st, x: st.p.x, z: st.p.z }; } }
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
  loop.add((dt, t) => { camera.updateMatrixWorld(); sky.update(dt, t, camera, steuerung.pos, veil); sky.cloudMat.emissiveIntensity = 0.62; fuellLicht.intensity = 0.95 * Math.max(0, Math.min(1, sky.sunDir.y * 3)); regenTick(dt); veil.update(dt, t); }, { order: 0, always: true });   // Wolken heller: keine dunklen Unterseiten
  loop.add(() => input.endFrame(), { order: 100, always: true });
  loop.start();

  await schritt(0.8, 'Die Klasse kommt …');
  // alle Menschen schon beim Laden vorbereiten (sonst ruckelt es, wenn jemand zum ersten Mal auftaucht)
  for (const id of Object.keys(LEUTE)) { const x = await person(id); x.f.group.visible = false; }
  await statistenLaden();
  await schritt(0.9, 'Gleich klingelt es …');
  // Start
  // Für Lehrpersonen: im passenden Kapitel starten, zum Ort springen, Situation beginnt (Ergebnis zählt wie im Spiel)
  async function situationProbieren(w) {
    const id = w.situation, sz = SZENEN[id];
    S = neuerStand(w.name, w.figur);
    const passt = (x) => (x.kap || 1) >= sz.ab && (x.kap || 1) <= (sz.bis || 10) && (!sz.schritt || x.id === sz.schritt) && (!sz.zeit || ((x.uhr || 8) >= sz.zeit[0] && (x.uhr || 8) <= sz.zeit[1]));
    S.schritt = Math.max(0, SCHRITTE.findIndex(passt));
    S.merke['sitTeaser_' + id] = true; sichern();
    await los(false);
    for (let i = 0; i < 240 && (imGespraech || ui.ebeneArt()); i++) await new Promise((r) => setTimeout(r, 500));
    if (sz.start) steuerung.teleport(sz.start.x, sz.start.z, sz.start.yaw);
    sitSichtbarkeit();
    await new Promise((r) => setTimeout(r, 1500));
    if (!S.merke['sit_' + id]) sitStart(id);
  }
  async function los(neu, figur, name, abKap) {
    if (neu) { S = neuerStand(name, figur); if (abKap > 1) S.schritt = Math.max(0, SCHRITTE.findIndex((x) => (x.kap || 1) === abKap)); sichern(); }
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
    const pause = !neu && S.zuletzt ? Date.now() - S.zuletzt : 0;
    if (neu && abKap > 1) await vorspann(st);   // Einstieg über die Kapitelwahl: mit Vorspann
    await starteSchritt(S.schritt, neu ? true : false);
    if (!neu && ort) steuerung.teleport(ort.x, ort.z, ort.yaw);
    // Länger nicht gespielt (Unterricht ist oft eine Woche später): kurzer Rückblick, wo man steht
    if (pause > 18 * 3600 * 1000 && st) {
      const tage = Math.round(pause / 86400000), kap = st.kap || 1;
      const freunde = besteFreunde().slice(0, 2).map((id) => LEUTE[id] && LEUTE[id].name).filter(Boolean);
      setTimeout(() => ui.bild('Was bisher geschah', 'Kapitel ' + kap + ' „' + (KAPITEL[kap] || '') + '“. ' + (freunde.length ? 'Dir nahe: ' + freunde.join(' und ') + '. ' : '') + 'Jetzt: ' + st.titel + ' – ' + st.ziel + (tage >= 2 ? ' (Du warst ' + tage + ' Tage weg.)' : ''), 7), 900);
    }
  }

  // Tests
  window.LYCEE = {
    get zustand() { return S; }, get schritt() { return SCHRITTE[S ? S.schritt : 0].id; }, get imGespraech() { return imGespraech; },
    welt, steuerung, leute, sky, camera, scene, req, ui, rr,
    springe: async (i) => { await starteSchritt(typeof i === 'number' ? i : SCHRITTE.findIndex((s) => s.id === i), true); },
    sitProbe: (id) => situationProbieren({ situation: id, name: 'Sam', figur: 0 }),   // Test: Situation wie „Für Lehrpersonen“ starten
    teleport: (ort, yaw) => { const o = typeof ort === 'string' ? welt.orte[ort] : ort; steuerung.teleport(o.x, o.z, yaw !== undefined ? yaw : o.yaw); },
    rede, los, audio, SITZ, input, get spruch() { return { wer: !!spruchWer }; }, get naechste() { return naechste && naechste.id; },
    get probe() { return probe; }, set mutTempo(v) { mutTempo = v; },
    daten: { SCHRITTE, STATISTEN, LEUTE, BLAETTER, MATHE, LEKTIONEN, GESPRAECHE }, ia, aktion, get iaNah() { return iaNah && iaNah.tu; },
    hs, tt3d, zufall, get spieler() { return spieler; }, vorspann: (k) => vorspann(SCHRITTE.find((x) => (x.kap || 1) === k) || SCHRITTE[0]), gesteZu, handschlagMit, get statisten() { return statisten; }, musik,
  };

  onProgress(1, '');
  if (test && params.get('sit') && SZENEN[params.get('sit')]) { situationProbieren({ situation: params.get('sit'), name: 'Sam', figur: +(params.get('figur') || 0) }); return window.LYCEE; }   // Test: Situation direkt
  if (test && params.get('start')) { await los(true, +(params.get('figur') || 0), 'Sam'); return window.LYCEE; }
  const lehrer = () => ui.lehrer({ paket, bereinige,
    speichern: (b) => { speicherePaket(b); paket = b; },
    zuruecksetzen: () => { speicherePaket(null); paket = GRUNDPAKET; } });
  ui.speicherName = () => speicherName();
  ui.sitListe = Object.entries(SZENEN).map(([id, sz]) => ({ id, titel: sz.titel[0] + ' ' + sz.titel[1], ab: sz.ab }));
  const plaetze = () => [1, 2, 3].map((p) => { const s2 = lies(p); return s2 && s2.name ? { name: s2.name, kap: (SCHRITTE[s2.schritt] || {}).kap || 1, fertig: !!s2.fertig, zeit: s2.zeit || 0 } : null; });
  const w = await ui.titel({ gespeichert: !!(S && S.name), figuren: FIGUREN, lehrer, platz, plaetze,
    wechsle: (p) => { platz = p; try { localStorage.setItem('lycee.platz', String(p)); } catch (e) { /* privat */ } S = neuStart(lies()); return !!(S && S.name); } });
  if (w.weiter) await los(false);
  else if (w.situation && SZENEN[w.situation]) await situationProbieren(w);   // Lehrperson: eine schwierige Situation direkt ausprobieren
  else await los(true, w.figur, w.name, w.kapitel);   // Lehrperson kann direkt in einem Kapitel starten
  return window.LYCEE;
}
