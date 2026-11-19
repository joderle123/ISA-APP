// Handschläge: zwei Figuren machen zusammen einen Handschlag – echte Arm- und Fingerbewegung (IK aus figuren.js),
// kein festes Klatsch-Bild. Jede Freundin / jeder Freund hat einen eigenen Handschlag (passend zur Person).
// Erst zeigt die Person ihn vor, dann machst du ihn aus dem Kopf nach (Bausteine in der richtigen Reihenfolge, mit Zeit).
// Später kann man zusammen einen neuen erfinden (3–5 Bausteine).
import * as THREE from 'three';

// ---------- Bausteine ----------
// Koordinaten je Person: x = rechts, y = über der Treffhöhe, z = nach vorn (zur anderen Person). H = halber Abstand.
const D = 0.82, H = D / 2;
const BEREIT = { p: [0.14, -0.2, 0.22], d: [0, 0.2, 1], f: [-1, 0, 0], faust: 0.3, w: 1 };
const GRIFF = (y = 0, faust = 0.62) => ({ p: [0.035, y, H - 0.03], d: [0, 0.25, 1], f: [-1, 0, 0], faust, w: 1 });
const FAUST = (z = H - 0.07) => ({ p: [0.03, 0.02, z], d: [0, 0, 1], f: [0, -1, 0], faust: 1, w: 1 });

export const BAUSTEINE = {
  griff: { name: 'Einschlagen', icon: '🤝', dauer: 1.0, kf: [
    [0.32, { R: GRIFF(0, 0.15) }], [0.42, { R: GRIFF(0) }], [0.55, { R: GRIFF(0.05) }], [0.68, { R: GRIFF(-0.05) }], [0.8, { R: GRIFF(0.03) }], [1, { R: GRIFF(0) }]],
    ton: [[0.37, 'hs_griff']] },
  faust: { name: 'Faust', icon: '👊', dauer: 0.65, kf: [[0.45, { R: FAUST() }], [0.62, { R: FAUST() }], [1, { R: FAUST(H - 0.13) }]], ton: [[0.45, 'hs_faust']] },
  boom: { name: 'Explosion', icon: '💥', dauer: 0.7, kf: [
    [0.15, { R: FAUST(H - 0.1) }], [0.55, { R: { p: [0.2, 0.22, 0.16], d: [0.3, 0.8, 0.3], f: [0.2, 0, 1], faust: 0, w: 1 } }], [1, { R: { p: [0.22, 0.2, 0.15], d: [0.3, 0.8, 0.3], f: [0.2, 0, 1], faust: 0, w: 1 } }]],
    ton: [[0.22, 'hs_boom']] },
  oben: { name: 'Oben abklatschen', icon: '✋', dauer: 0.62, kf: [
    [0.42, { R: { p: [0.04, 0.44, H - 0.035], d: [0, 1, 0.15], f: [0, 0, 1], faust: 0, w: 1 } }], [0.55, { R: { p: [0.04, 0.44, H - 0.06], d: [0, 1, 0.15], f: [0, 0, 1], faust: 0, w: 1 } }],
    [1, { R: { p: [0.1, 0.3, H - 0.15], d: [0, 1, 0.2], f: [0, 0, 1], faust: 0, w: 1 } }]], ton: [[0.42, 'hs_klatsch']] },
  unten: { name: 'Unten abklatschen', icon: '🫳', dauer: 0.62, kf: [
    [0.42, { R: { p: [0.04, -0.34, H - 0.035], d: [0, -0.7, 0.7], f: [0, 0.3, 1], faust: 0, w: 1 } }],
    [1, { R: { p: [0.12, -0.26, H - 0.16], d: [0, -0.6, 0.8], f: [0, 0.3, 1], faust: 0, w: 1 } }]], ton: [[0.42, 'hs_klatsch']] },
  schnipp: { name: 'Schnipsen', icon: '🫰', dauer: 0.78, kf: [
    [0.25, { R: GRIFF(0, 0.45) }], [0.55, { R: { p: [0.1, 0.02, H - 0.24], d: [0, 0.3, 1], f: [-1, 0, 0], faust: 0.6, w: 1 } }],
    [0.63, { R: { p: [0.11, 0.03, H - 0.26], d: [0, 0.3, 1], f: [-1, 0, 0], faust: 0.05, w: 1 } }], [1, { R: { p: [0.16, 0.05, 0.18], d: [0.2, 0.6, 0.7], f: [-1, 0, 0], faust: 0, w: 1 } }]],
    ton: [[0.6, 'hs_schnipp']] },
  ran: { name: 'Ranziehen', icon: '🫂', dauer: 1.3, kf: [
    [0.22, { R: { ...GRIFF(0.08, 0.65), d: [0, 0.6, 0.8] }, lehn: 0.06, s: 0.06 }],
    [0.42, { R: { ...GRIFF(0.12, 0.65), d: [0, 0.6, 0.8] }, L: { p: [-0.17, 0.28, 0.6], d: [0, 0, 1], f: [0, 0, 1], faust: 0.25, w: 1, pol: [-0.6, -0.4, -0.5] }, lehn: 0.16, s: 0.14 }],
    [0.55, { R: { ...GRIFF(0.12, 0.65), d: [0, 0.6, 0.8] }, L: { p: [-0.17, 0.28, 0.66], d: [0, 0, 1], f: [0, 0, 1], faust: 0.25, w: 1, pol: [-0.6, -0.4, -0.5] }, lehn: 0.16, s: 0.14 }],
    [0.7, { R: { ...GRIFF(0.12, 0.65), d: [0, 0.6, 0.8] }, L: { p: [-0.17, 0.26, 0.6], d: [0, 0, 1], f: [0, 0, 1], faust: 0.25, w: 1, pol: [-0.6, -0.4, -0.5] }, lehn: 0.16, s: 0.14 }],
    [0.85, { R: { ...GRIFF(0.1, 0.65), d: [0, 0.6, 0.8] }, L: { p: [-0.17, 0.28, 0.64], d: [0, 0, 1], f: [0, 0, 1], faust: 0.25, w: 1, pol: [-0.6, -0.4, -0.5] }, lehn: 0.14, s: 0.12 }],
    [1, { R: GRIFF(0), L: { p: [-0.2, 0, 0.3], d: [0, 0, 1], f: [0, 0, 1], faust: 0.2, w: 0 }, lehn: 0, s: 0 }]],
    ton: [[0.2, 'hs_griff'], [0.55, 'hs_klopf'], [0.75, 'hs_klopf']] },
  pistole: { name: 'Fingerpistolen', icon: '👉', dauer: 0.82, kf: [
    [0.4, { R: { p: [0.24, 0.16, 0.26], d: [0, 0.05, 1], f: [-1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 }, L: { p: [-0.24, 0.16, 0.26], d: [0, 0.05, 1], f: [1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 } }],
    [0.5, { R: { p: [0.24, 0.24, 0.23], d: [0, 0.35, 1], f: [-1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 }, L: { p: [-0.24, 0.24, 0.23], d: [0, 0.35, 1], f: [1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 } }],
    [0.65, { R: { p: [0.24, 0.16, 0.26], d: [0, 0.05, 1], f: [-1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 }, L: { p: [-0.24, 0.16, 0.26], d: [0, 0.05, 1], f: [1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 } }],
    [1, { R: { p: [0.24, 0.16, 0.26], d: [0, 0.05, 1], f: [-1, 0, 0], faust: 1, zeige: 1, daumenHoch: true, w: 1 }, L: { p: [-0.2, 0, 0.3], d: [0, 0.05, 1], f: [1, 0, 0], faust: 0.5, w: 0 } }]],
    ton: [[0.46, 'hs_pistole']] },
  ellbogen: { name: 'Ellbogen', icon: '💪', dauer: 0.72, kf: [
    [0.45, { R: { p: [0.22, 0.32, 0.1], d: [0, 1, -0.2], f: [-1, 0, 0], faust: 1, w: 1, pol: [0.2, 0, 1] }, lehn: 0.1, s: 0.1 }],
    [0.6, { R: { p: [0.22, 0.32, 0.1], d: [0, 1, -0.2], f: [-1, 0, 0], faust: 1, w: 1, pol: [0.2, 0, 1] }, lehn: 0.1, s: 0.1 }],
    [1, { R: { p: [0.16, 0.05, 0.2], d: [0, 0.5, 0.8], f: [-1, 0, 0], faust: 0.6, w: 1 }, lehn: 0, s: 0 }]],
    ton: [[0.45, 'hs_faust']] },
};
export const REIHE = ['griff', 'faust', 'boom', 'oben', 'unten', 'schnipp', 'ran', 'pistole', 'ellbogen'];

// Jede Person hat ihren eigenen Handschlag (passt zum Charakter). Sätze in einfacher Sprache.
export const HANDSCHLAEGE = {
  noah: { folge: ['griff', 'faust'], intro: 'Ich hab noch nie einen eigenen Handschlag gehabt. Ganz einfach, okay?', klappt: 'Wir haben einen Handschlag. Krass.', daneben: 'Haha. Nicht schlimm. Ich hab auch geübt.' },
  ben: { folge: ['faust', 'boom', 'pistole'], intro: 'Okay, Profi-Level. Faust, Explosion, Peng. Schau genau.', klappt: 'PENG! Du bist offiziell cool. Ein bisschen.', daneben: 'Bro. Das war ein Hände-Unfall.' },
  mila: { folge: ['oben', 'unten', 'schnipp'], intro: 'Oben, unten, Schnips. Logisch aufgebaut. Merk es dir.', klappt: 'Fehlerfrei. Ich notier das.', daneben: 'Statistisch klappt es beim dritten Mal.' },
  jo: { folge: ['griff', 'ran', 'faust'], intro: 'Wie im Team. Kurz ran, dann Faust. Bereit?', klappt: 'Teamgeist! So geht das.', daneben: 'Kein Ding. Training ist Training.' },
  ayla: { folge: ['oben', 'faust', 'boom', 'schnipp'], intro: 'Vier Teile. Schnell. Wer langsam ist, verliert.', klappt: 'Okay. Respekt. Du bist schneller als gedacht.', daneben: 'Zu langsam! Nochmal, los.' },
  lina: { folge: ['unten', 'oben', 'faust'], intro: 'Erst unten, dann oben, dann Faust. Wie ein kleines Bild.', klappt: 'Das war schön. Ich zeichne das.', daneben: 'Nicht schlimm. Kunst braucht Versuche.' },
  chiara: { folge: ['griff', 'schnipp', 'pistole'], intro: 'Elegant: Hand, Schnips, und dann zeigen. Mit Stil.', klappt: 'Mit Stil. Genau so.', daneben: 'Hm. Das war… modern. Nochmal?' },
  yusuf: { folge: ['faust', 'griff', 'ran'], intro: 'Faust, Hand, und kurz ran. Wie bei meinen Cousins.', klappt: 'Jetzt bist du quasi Familie. Fast.', daneben: 'Haha, alles gut. Langsam.' },
  kenan: { folge: ['griff', 'ran'], intro: 'Kurz und ruhig. Nicht so ein Theater.', klappt: 'Passt.', daneben: 'Chill. Nochmal.' },
  dario: { folge: ['ellbogen', 'faust', 'boom'], intro: 'Ellbogen, Faust, Boom. Hab ich selbst erfunden.', klappt: 'BOOM. Du kannst es. Erzähl es keinem.', daneben: 'Oh nein. Das war kein Boom. Das war ein Plopp.' },
  luca: { folge: ['faust', 'pistole'], intro: 'Faust und Peng. Mehr braucht man nicht.', klappt: 'Okay. Nicht schlecht.', daneben: 'Hm. Egal. Nochmal.' },
};

const lerp = (a, b, t) => a + (b - a) * t;
const glatt = (t) => t * t * (3 - 2 * t);
const leer = (h) => ({ p: h ? [...h.p] : [...BEREIT.p], d: h ? [...h.d] : [...BEREIT.d], f: h ? [...h.f] : [...BEREIT.f], faust: h ? h.faust || 0 : 0.3, zeige: h ? h.zeige || 0 : 0, w: 0, pol: h && h.pol ? [...h.pol] : null, daumenHoch: !!(h && h.daumenHoch) });
const mischHand = (a, b, t) => {
  if (!a && !b) return null;
  if (!a) a = leer(b); if (!b) b = leer(a);
  const v = (x, y) => [lerp(x[0], y[0], t), lerp(x[1], y[1], t), lerp(x[2], y[2], t)];
  return { p: v(a.p, b.p), d: v(a.d, b.d), f: v(a.f, b.f), faust: lerp(a.faust || 0, b.faust || 0, t), zeige: lerp(a.zeige || 0, b.zeige || 0, t), w: lerp(a.w || 0, b.w || 0, t),
    pol: a.pol || b.pol ? v(a.pol || b.pol, b.pol || a.pol) : null, daumenHoch: t < 0.5 ? !!a.daumenHoch : !!b.daumenHoch };
};
const mischPose = (a, b, t) => ({ R: mischHand(a.R, b.R, t), L: mischHand(a.L, b.L, t), lehn: lerp(a.lehn || 0, b.lehn || 0, t), s: lerp(a.s || 0, b.s || 0, t) });
// Pose eines Bausteins zur Zeit t (0..1), vom Startzustand „von“ aus
function poseBei(b, von, t) {
  const kf = [[0, von], ...b.kf];
  let i = 0; while (i < kf.length - 2 && t > kf[i + 1][0]) i++;
  const [t0, p0] = kf[i], [t1, p1] = kf[i + 1];
  const u = t1 > t0 ? Math.max(0, Math.min(1, (t - t0) / (t1 - t0))) : 1;
  const a = { R: p0.R, L: p0.L, lehn: p0.lehn, s: p0.s }, c = { R: p1.R !== undefined ? p1.R : p0.R, L: p1.L !== undefined ? p1.L : (i === 0 ? p0.L : null), lehn: p1.lehn, s: p1.s };
  return mischPose(a, c, glatt(u));
}

export function createHandschlag({ steuerung, camera, root, audio, rr, ton, vib }) {
  const h = audio.helpers;
  if (h) {
    audio.register('hs_klatsch', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.06, 'highpass', 1700, 0.8, 0.12, bus); h.burst(t, 0.1, 'bandpass', 1100, 1.4, 0.05, bus); });
    audio.register('hs_griff', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.06, 'lowpass', 650, 0.8, 0.09, bus); });
    audio.register('hs_faust', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.04, 'lowpass', 420, 1, 0.1, bus); h.tone('sine', 115, t, 0.002, 0.06, 0.07, bus); });
    audio.register('hs_schnipp', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.018, 'highpass', 3600, 1, 0.13, bus); });
    audio.register('hs_klopf', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.05, 'lowpass', 320, 1, 0.1, bus); });
    audio.register('hs_boom', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.3, 'bandpass', 700, 0.6, 0.05, bus); h.tone('sine', 90, t, 0.01, 0.05, 0.25, bus); });
    audio.register('hs_pistole', (ctx, bus) => { const t = ctx.currentTime; h.tone('square', 980, t, 0.002, 0.025, 0.07, bus); h.tone('square', 760, t + 0.09, 0.002, 0.02, 0.07, bus); });
    audio.register('hs_daneben', (ctx, bus) => { const t = ctx.currentTime; h.tone('triangle', 260, t, 0.01, 0.05, 0.18, bus); h.tone('triangle', 196, t + 0.16, 0.01, 0.05, 0.3, bus); });
  }
  const hs = { aktiv: false };
  let paar = null;   // { A: {f, basis: Vector3, yaw}, B: {...}, yh, posen: {A, B}, lauf: {...} }
  const _f = new THREE.Vector3(), _r = new THREE.Vector3(), _w = new THREE.Vector3();
  const welt = (P, v, out, punkt) => {
    _f.set(Math.sin(P.yaw), 0, Math.cos(P.yaw)); _r.set(-Math.cos(P.yaw), 0, Math.sin(P.yaw));
    out.set(0, 0, 0).addScaledVector(_r, v[0]).addScaledVector(_f, v[2]); out.y = v[1];
    if (punkt) { out.x += P.basis.x + _f.x * P.s; out.z += P.basis.z + _f.z * P.s; out.y += paar.yh; }
    return out;
  };
  const anwenden = (P, pose) => {
    P.s = pose.s || 0;
    P.f.lehnen(pose.lehn || 0);
    for (const s of ['R', 'L']) {
      const q = pose[s], H2 = P.f.hand[s];
      if (!q || q.w < 0.002) { H2.w = 0; continue; }
      H2.w = q.w;
      H2.ziel = welt(P, q.p, H2.ziel || new THREE.Vector3(), true);
      H2.richtung = welt(P, q.d, H2.richtung || new THREE.Vector3(), false).normalize();
      H2.flaeche = welt(P, q.f, H2.flaeche || new THREE.Vector3(), false).normalize();
      H2.pol = welt(P, q.pol || (s === 'R' ? [0.6, -1, -0.3] : [-0.6, -1, -0.3]), H2.pol || new THREE.Vector3(), false).normalize();
      H2.faust = q.faust; H2.zeige = q.zeige; H2.daumenHoch = q.daumenHoch;
    }
    if (P.setzePos) P.setzePos(P.basis.x + Math.sin(P.yaw) * P.s, P.basis.z + Math.cos(P.yaw) * P.s);
  };
  // Kamera: von der Seite auf beide, leicht zu dir gedreht; kurzer Ruck bei Kontakt
  let ruck = 0;
  const _m = new THREE.Vector3(), _c = new THREE.Vector3();
  function kamera(dt) {
    const A = paar.A, B = paar.B;
    _m.set((A.basis.x + B.basis.x) / 2, paar.yh + 0.12, (A.basis.z + B.basis.z) / 2);
    const dx = B.basis.x - A.basis.x, dz = B.basis.z - A.basis.z, l = Math.hypot(dx, dz) || 1;
    const nx = -dz / l * paar.seite, nz = dx / l * paar.seite;
    _c.set(_m.x + nx * paar.weit - dx / l * 0.55 * paar.weit / 2.1, paar.yh + 0.45, _m.z + nz * paar.weit - dz / l * 0.55 * paar.weit / 2.1);
    if (ruck > 0) { _c.x += (Math.random() - 0.5) * ruck * 0.03; _c.y += (Math.random() - 0.5) * ruck * 0.03; ruck = Math.max(0, ruck - dt * 6); }
    camera.position.lerp(_c, Math.min(1, dt * (paar.kamFrisch ? 99 : 4))); paar.kamFrisch = false;
    camera.lookAt(_m);
    rr.setDof(0.45, camera.position.distanceTo(_m));
  }
  let lauf = null;   // laufender Baustein: { bA, bB, t, dauer, von: {A, B}, ok, toene, pause }
  hs.tick = (dt) => {
    if (!paar) return;
    if (lauf) {
      if (lauf.pause > 0) lauf.pause -= dt;   // Mini-Pause beim Treffer (fühlt sich nach Kontakt an)
      else {
        lauf.t += dt / lauf.dauer;
        for (const [zt, name] of lauf.toene) if (!lauf.gespielt.has(zt) && lauf.t >= zt) {
          lauf.gespielt.add(zt);
          if (lauf.kontakt) { try { audio.play(name); } catch (e) { /* Ton */ } ruck = /klatsch|faust|griff/.test(name) ? 1 : 0.4; lauf.pause = 0.06; vib && vib(8); }
        }
      }
      const t = Math.min(1, lauf.t);
      paar.posen.A = poseBei(lauf.BA, lauf.von.A, t);
      paar.posen.B = poseBei(lauf.BB, lauf.von.B, t);
      if (lauf.t >= 1) { const fertig = lauf.fertig; lauf = null; fertig(); }
    }
    anwenden(paar.A, paar.posen.A); anwenden(paar.B, paar.posen.B);
    kamera(dt);
  };
  // Einen Baustein spielen: du (bA) und die andere Person (bB). Stimmen sie nicht überein, gibt es keinen Kontakt.
  const baustein = (bA, bB, tempo = 1) => new Promise((ok) => {
    const kontakt = bA === bB;
    lauf = { BA: BAUSTEINE[bA], BB: BAUSTEINE[bB], t: 0, dauer: Math.max(BAUSTEINE[bA].dauer, BAUSTEINE[bB].dauer) / tempo, von: { A: paar.posen.A, B: paar.posen.B }, kontakt,
      toene: BAUSTEINE[bA].ton.concat(kontakt ? [] : BAUSTEINE[bB].ton), gespielt: new Set(), pause: 0, fertig: ok };
    if (!kontakt) setTimeout(() => { try { audio.play('hs_daneben'); } catch (e) { /* Ton */ } }, 350);
  });
  const zuPose = (ziel, sek) => new Promise((ok) => {
    const B0 = { dauer: sek, kf: [[1, ziel]], ton: [] };
    lauf = { BA: B0, BB: B0, t: 0, dauer: sek, von: { A: paar.posen.A, B: paar.posen.B }, kontakt: false, toene: [], gespielt: new Set(), pause: 0, fertig: ok };
  });

  // ---------- Ein Paar bilden: du und die andere Person stehen sich gegenüber ----------
  hs.start = (spieler, x) => {
    const p = steuerung.pos, dx = p.x - x.pos.x, dz = p.z - x.pos.z, l = Math.hypot(dx, dz) || 1;
    const ax = x.pos.x + dx / l * D, az = x.pos.z + dz / l * D;
    const yawA = Math.atan2(x.pos.x - ax, x.pos.z - az), yawB = Math.atan2(ax - x.pos.x, az - x.pos.z);
    steuerung.teleport(ax, az, yawA); steuerung.kameraAus = true; steuerung.frei = false;
    x.yaw = yawB; x.f.group.rotation.y = yawB;
    const vor = new THREE.Vector3(), yh = (() => { const a = spieler.schulter('R', vor) ? vor.y : 1.4, b = x.f.schulter('R', vor) ? vor.y : 1.4; return (a + b) / 2 - 0.3; })();
    // Kamera-Seite: dort, wo die Kamera gerade ist
    const cx = camera.position.x - (ax + x.pos.x) / 2, cz = camera.position.z - (az + x.pos.z) / 2;
    const seite = (-(x.pos.z - az)) * cx + (x.pos.x - ax) * cz >= 0 ? 1 : -1;
    paar = {
      A: { f: spieler, basis: new THREE.Vector3(ax, 0, az), yaw: yawA, s: 0, setzePos: (px, pz) => { steuerung.pos.x = px; steuerung.pos.z = pz; } },
      B: { f: x.f, basis: x.pos.clone(), yaw: yawB, s: 0, setzePos: (px, pz) => { x.f.group.position.x = px; x.f.group.position.z = pz; } },
      yh, seite, kamFrisch: true, posen: { A: { R: { ...BEREIT, w: 0 } }, B: { R: { ...BEREIT, w: 0 } } }, x,
    };
    // Seite wählen, auf der die Kamera frei steht (nicht in Wänden oder Häuschen); notfalls näher heran
    if (steuerung.strahl) {
      const mx = (ax + x.pos.x) / 2, mz = (az + x.pos.z) / 2, l = Math.hypot(x.pos.x - ax, x.pos.z - az) || 1;
      const frei = (sg) => { const nx = -(x.pos.z - az) / l * sg, nz = (x.pos.x - ax) / l * sg, dir = new THREE.Vector3(nx - (x.pos.x - ax) / l * 0.26, 0.2, nz - (x.pos.z - az) / l * 0.26).normalize();
        return steuerung.strahl(new THREE.Vector3(mx, paar.yh + 0.15, mz), dir, 2.3); };
      const f1 = frei(paar.seite), f2 = frei(-paar.seite);
      if (f2 > f1 + 0.2) paar.seite = -paar.seite;
      paar.weit = Math.max(0.9, Math.min(2.1, Math.max(f1, f2) - 0.25));
    } else paar.weit = 2.1;
    hs.aktiv = true;
    root.classList.add('ly-hs-an');
  };
  hs.ende = async () => {
    if (!paar) return;
    await zuPose({ R: { ...BEREIT, w: 0 }, L: null, lehn: 0, s: 0 }, 0.35);
    for (const P of [paar.A, paar.B]) { P.f.hand.R.w = 0; P.f.hand.L.w = 0; P.f.lehnen(0); P.setzePos(P.basis.x, P.basis.z); }
    steuerung.kameraAus = false; steuerung.frei = true; rr.setDof(0);
    paar = null; hs.aktiv = false; root.classList.remove('ly-hs-an');
    steuerung.kamera(0.016, true);
  };
  // Für Tests: eine feste Pose zeigen (Baustein b bei Zeit t)
  hs.pose = (b, t) => { if (!paar) return; lauf = null; const P = poseBei(BAUSTEINE[b], { R: { ...BEREIT } }, t); paar.posen.A = P; paar.posen.B = P; };
  hs.bereit = () => zuPose({ R: { ...BEREIT }, L: null, lehn: 0, s: 0 }, 0.3);
  // Die ganze Folge zeigen (beide machen es, langsamer)
  hs.zeigen = async (folge, leiste) => {
    await hs.bereit();
    for (let i = 0; i < folge.length; i++) { leiste && leiste.markiere(i, 'zeigt', folge[i]); await baustein(folge[i], folge[i], 0.8); }
    await hs.bereit();
  };
  // Mitmachen: du wählst den nächsten Baustein (Taste/Antippen) – richtig und rechtzeitig, sonst daneben
  hs.mitmachen = async (folge, leiste, { zeit = 1.8, hilfe = false } = {}) => {
    await hs.bereit();
    for (let i = 0; i < folge.length; i++) {
      leiste.markiere(i, 'dran', hilfe ? folge[i] : null);
      const wahl = await leiste.warte(zeit);
      if (wahl !== folge[i]) {
        leiste.markiere(i, 'falsch', folge[i]);
        await baustein(wahl || 'griff', folge[i], 1);
        await hs.bereit();
        return false;
      }
      leiste.markiere(i, 'ok', folge[i]);
      await baustein(folge[i], folge[i], 1.05);
    }
    await hs.bereit();
    ton && ton('pling');
    return true;
  };

  // ---------- Leiste unten: Folge (Plätze) und alle Bausteine als Knöpfe (1–9) ----------
  hs.leiste = ({ titel, laenge, modus = 'spiel' }) => {
    const el = document.createElement('div'); el.className = 'ly-hs hud-interactive ly-hs-' + modus;
    el.innerHTML = '<div class="ly-hs-kopf"><b></b><span class="ly-hs-zeit"><i></i></span></div><div class="ly-hs-folge"></div><div class="ly-hs-knoepfe"></div>' +
      (modus === 'bauen' ? '<div class="ly-hs-unten"><button type="button" data-a="weg">⌫ Zurück</button><button type="button" data-a="ok" disabled>Fertig</button></div>' : '');
    el.querySelector('.ly-hs-kopf b').textContent = titel;
    const folgeEl = el.querySelector('.ly-hs-folge'), kn = el.querySelector('.ly-hs-knoepfe'), zeitEl = el.querySelector('.ly-hs-zeit i');
    const plaetze = []; const baueFolge = (n) => { folgeEl.innerHTML = ''; plaetze.length = 0; for (let i = 0; i < n; i++) { const s = document.createElement('span'); s.className = 'ly-hs-platz'; s.textContent = '?'; folgeEl.appendChild(s); plaetze.push(s); } };
    baueFolge(laenge);
    let warter = null, puffer = null;   // Taste während der Bewegung: wird vorgemerkt (wie bei Rhythmus-Spielen)
    REIHE.forEach((id, k) => {
      const b = document.createElement('button'); b.type = 'button'; b.dataset.b = id;
      b.innerHTML = '<span>' + BAUSTEINE[id].icon + '</span><small>' + BAUSTEINE[id].name + '</small><kbd>' + (k + 1) + '</kbd>';
      b.onclick = () => drueck(id); kn.appendChild(b);
    });
    let bau = [];
    const drueck = (id) => {
      if (modus === 'bauen') { if (bau.length < 5) { bau.push(id); zeigeBau(); } return; }
      if (warter) { const w = warter; warter = null; w(id); } else puffer = id;
    };
    const zeigeBau = () => { baueFolge(Math.max(3, bau.length)); bau.forEach((id, i) => { plaetze[i].textContent = BAUSTEINE[id].icon; plaetze[i].classList.add('ok'); }); const ok = el.querySelector('[data-a="ok"]'); if (ok) ok.disabled = bau.length < 3; };
    const taste = (e) => {
      if (/^Digit[1-9]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); drueck(REIHE[+e.code.slice(5) - 1]); }
      else if (modus === 'bauen' && e.code === 'Backspace') { e.preventDefault(); bau.pop(); zeigeBau(); }
    };
    document.addEventListener('keydown', taste, true);
    root.appendChild(el);
    return {
      el,
      markiere(i, art, id) {
        const s = plaetze[i]; if (!s) return;
        plaetze.forEach((x) => x.classList.remove('dran'));
        s.classList.remove('zeigt', 'ok', 'falsch', 'hilfe'); s.classList.add(art);
        if (art === 'dran') { s.textContent = id ? BAUSTEINE[id].icon : '?'; if (id) s.classList.add('hilfe'); }
        else if (id && BAUSTEINE[id]) s.textContent = BAUSTEINE[id].icon;
      },
      zeigeFolge(folge) { folge.forEach((id, i) => { if (plaetze[i]) { plaetze[i].textContent = BAUSTEINE[id].icon; } }); },
      verstecke() { plaetze.forEach((s) => { s.textContent = '?'; s.className = 'ly-hs-platz'; }); },
      warte(sek) {
        return new Promise((ok) => {
          if (puffer) { const p = puffer; puffer = null; ok(p); return; }
          zeitEl.style.transition = 'none'; zeitEl.style.width = '100%'; void zeitEl.offsetWidth;
          zeitEl.style.transition = 'width ' + sek + 's linear'; zeitEl.style.width = '0%';
          const tm = setTimeout(() => { if (warter) { warter = null; ok(null); } }, sek * 1000);
          warter = (id) => { clearTimeout(tm); zeitEl.style.transition = 'none'; ok(id); };
        });
      },
      bauen() {
        return new Promise((ok) => {
          el.querySelector('[data-a="weg"]').onclick = () => { bau.pop(); zeigeBau(); };
          el.querySelector('[data-a="ok"]').onclick = () => { if (bau.length >= 3) ok(bau.slice()); };
          zeigeBau();
        });
      },
      zu() { document.removeEventListener('keydown', taste, true); el.remove(); },
    };
  };
  return hs;
}
