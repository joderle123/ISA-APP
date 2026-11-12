// RESPAWN – moderne Kleinstadt statt Bilderbuch-Dorf: Häuser, Läden, Autos, Straßenlampen und Schilder aus den
// Kenney-Bausätzen (CC0; siehe modelle/LIZENZ.md, Umwandlung tools/stadt/stadt.py). Die Modelle tragen ihre Farben in den
// Eckpunkten und nutzen das Material der Insel-Requisiten (flach schattiert, Schleier, Tageslicht).
// Die alten Häuser bleiben als Logik (Kollision, Türen, Orte) bestehen und werden nur unsichtbar.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import stadtBin from './modelle/stadt.glb';
import { BUILDINGS, buildingYaw } from '../world/layout.js';
import { LIEFERWAGEN } from './daten/welt.js';

let geladen = null;
function lade() {
  if (geladen) return geladen;
  geladen = new Promise((ok, nein) => {
    const buf = stadtBin.buffer.slice(stadtBin.byteOffset, stadtBin.byteOffset + stadtBin.byteLength);
    new GLTFLoader().parse(buf, '', (gltf) => {
      const geo = {};
      gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        const g = o.geometry, c = g.attributes.color, n = c.count;
        // Farben der Farbtafel sind sRGB; das Spiel rechnet linear
        const f = new Float32Array(n * 3), col = new THREE.Color();
        for (let i = 0; i < n; i++) { col.setRGB(c.getX(i), c.getY(i), c.getZ(i), THREE.SRGBColorSpace); f[i * 3] = col.r; f[i * 3 + 1] = col.g; f[i * 3 + 2] = col.b; }
        g.setAttribute('color', new THREE.BufferAttribute(f, 3));
        g.computeBoundingBox();
        // der Lader bereinigt Namen („haus/a“ → „hausa“); der echte Name steht in userData
        geo[(o.userData && o.userData.name) || o.name] = g;
      });
      ok(geo);
    }, nein);
  });
  return geladen;
}

// Zielbreite der Häuser in Metern (größere Seite des Grundrisses)
const BREITE = { S: 8, M: 9.5, L: 11.5 };
const HAUS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
const LADEN = ['e', 'c', 'a', 'h', 'b', 'd'];   // f und g sind dreistöckig – zu hoch für die Insel
const AUTOS = ['sedan', 'hatchback-sports', 'suv', 'van', 'sedan-sports', 'taxi', 'delivery', 'police'];

// Dächer und Wände je Haus umfärben (die Bausätze haben nur grüne Dächer und graue Wände): gedeckte Töne wie in einer
// echten Kleinstadt. Dach = kräftiges Grün der Farbtafel, Wand = helles Grau.
const DACH = ['#8E4B3B', '#5C636D', '#7B5A45', '#4F6170', '#A1583F', '#6B4A3F'];
const WAND = ['#EFE7D8', '#E6D6BC', '#DCE2E8', '#F3EADC', '#D3DDCF', '#EACDAE', '#E2D9E6'];
const _hsl = { h: 0, s: 0, l: 0 };
function gefaerbt(geo, dach, wand) {
  const g = geo.clone();
  const c = g.attributes.color.clone(); g.setAttribute('color', c);
  const D = new THREE.Color(dach), W = new THREE.Color(wand), col = new THREE.Color();
  for (let i = 0; i < c.count; i++) {
    col.setRGB(c.getX(i), c.getY(i), c.getZ(i)).getHSL(_hsl);
    if (_hsl.s > 0.28 && _hsl.h > 0.3 && _hsl.h < 0.52) { const k = _hsl.l / 0.42; c.setXYZ(i, D.r * k, D.g * k, D.b * k); }   // Dach (Grün)
    else if (_hsl.s < 0.2 && _hsl.l > 0.5) { const k = _hsl.l / 0.8; c.setXYZ(i, W.r * k, W.g * k, W.b * k); }                // Wand (helles Grau)
  }
  return g;
}

// Straße als Band auf dem Gelände: folgt einem Weg der Insel (die Wege sind dort schon eingeebnet).
function strassenBand(pts, hoehe, { breite = 5.2, rand = 0.7 } = {}) {
  // Linie glätten und alle ~1,5 m abtasten
  const kurve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'catmullrom', 0.5);
  const n = Math.max(8, Math.round(kurve.getLength() / 1.5));
  const P = kurve.getSpacedPoints(n);
  const pos = [], col = [], idx = [];
  const ASPH = new THREE.Color('#4A4E57'), RAND = new THREE.Color('#B4B7BD'), LINIE = new THREE.Color('#ECEBE4');
  const quer = [-(breite / 2 + rand), -breite / 2, -0.12, 0.12, breite / 2, breite / 2 + rand];   // Rand | Fahrbahn | Mittellinie | Fahrbahn | Rand
  const farbe = (k, strich) => (k === 0 || k === 4 ? RAND : k === 2 && strich ? LINIE : ASPH);
  for (let i = 0; i <= n; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(n, i + 1)];
    let tx = b.x - a.x, tz = b.z - a.z; const L = Math.hypot(tx, tz) || 1; tx /= L; tz /= L;
    const nx = -tz, nz = tx;
    // leicht über dem Gelände; Buckel neben der Mitte dürfen nicht durch den Asphalt stoßen
    const hm = hoehe(P[i].x, P[i].z);
    for (const q of quer) { const x = P[i].x + nx * q, z = P[i].z + nz * q; pos.push(x, Math.max(hoehe(x, z), hm - 0.05, hoehe(x + nx * 0.8, z + nz * 0.8), hoehe(x - nx * 0.8, z - nz * 0.8)) + 0.16, z); }
    if (i === n) break;
    const strich = (i % 4) < 2;
    for (let k = 0; k < 5; k++) {
      // jede Fläche bekommt eigene Eckpunkte (flache Schattierung, klare Farbkanten)
      const c = farbe(k, strich);
      const v = pos.length / 3;   // Platzhalter – echte Ecken werden unten aus den Querreihen gebaut
      idx.push([i * 6 + k, i * 6 + k + 1, (i + 1) * 6 + k, (i + 1) * 6 + k + 1, c, v]);
    }
  }
  const g = new THREE.BufferGeometry();
  const p2 = [], c2 = [], i2 = [];
  for (const [a, b, c, d, f] of idx) {
    const o = p2.length / 3;
    for (const v of [a, b, c, d]) { p2.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]); c2.push(f.r, f.g, f.b); }
    i2.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);   // Sichtseite nach oben
  }
  g.setAttribute('position', new THREE.Float32BufferAttribute(p2, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(c2, 3));
  g.setIndex(i2); g.computeVertexNormals();
  return { geo: g, punkte: P };
}

// Wege der Insel, die zu Straßen werden (id aus world/island.js → PATHS)
const STRASSEN = ['hafen-strand', 'hafen-leuchtturm', 'hafen-markt'];

export async function baueStadt(game) {
  const G = await lade();
  const island = game.world.island, mat = game.props.materials.baseDouble;
  const wurzel = new THREE.Group(); wurzel.name = 'respawn-stadt';
  const hoehe = (x, z) => (island.getHeight ? island.getHeight(x, z) : island.heightAt(x, z));
  const name = (n) => G[n];
  // Modell setzen: breite = Zielmaß der größeren Grundseite in Metern (oder massstab direkt)
  const setze = (n, x, z, yaw, { breite, massstab, y = 0, schatten = true } = {}) => {
    const g = name(n); if (!g) { console.warn('[respawn] Modell fehlt', n); return null; }
    const b = g.boundingBox, s = massstab || breite / Math.max(b.max.x - b.min.x, b.max.z - b.min.z);
    const m = new THREE.Mesh(g, mat);
    m.position.set(x, hoehe(x, z) + y - b.min.y * s, z); m.rotation.y = yaw; m.scale.setScalar(s);
    m.castShadow = schatten; m.receiveShadow = true; m.name = n;
    wurzel.add(m);
    return m;
  };
  // tiefster Punkt unter dem Grundriss, damit ein Haus am Hang nicht in der Luft hängt
  const grund = (x, z, r) => Math.min(hoehe(x, z), hoehe(x + r, z), hoehe(x - r, z), hoehe(x, z + r), hoehe(x, z - r));

  // 1) Häuser und Läden an die Stelle der alten
  let ih = 0, il = 0;
  const decor = game.world.decor;
  for (const zone of ['hafen', 'markt']) { const h = decor && decor.get('haeuser-' + zone); if (h && h.group) h.group.visible = false; }
  for (const b of BUILDINGS) {
    const yaw = buildingYaw(b);
    if (b.type === 'kiosk') {
      const m = setze('laden/c', b.x, b.z, yaw, { breite: 6.2 });
      if (m) m.position.y = grund(b.x, b.z, 2) - 0.05;
      continue;
    }
    const laden = b.zone === 'markt';
    const n = laden ? 'laden/' + LADEN[il++ % LADEN.length] : 'haus/' + HAUS[ih++ % HAUS.length];
    const w = BREITE[b.size] || 9;
    const m = setze(n, b.x, b.z, yaw, laden ? { massstab: 7.2 } : { breite: w });
    if (m) {
      m.position.y = grund(b.x, b.z, w * 0.4) - 0.15;
      const k = ih + il;
      m.geometry = gefaerbt(m.geometry, DACH[k % DACH.length], WAND[(k * 3 + 1) % WAND.length]);
    }
    // Auto neben dem Haus (rechts von der Tür), parallel zur Hausfront
    if (!laden && ih % 2 === 1) {
      const rx = Math.cos(yaw), rz = -Math.sin(yaw), d = w * 0.5 + 2.4;
      const ax = b.x + rx * d + Math.sin(yaw) * 1.5, az = b.z + rz * d + Math.cos(yaw) * 1.5;
      const steil = Math.abs(hoehe(ax + 2, az) - hoehe(ax - 2, az)) + Math.abs(hoehe(ax, az + 2) - hoehe(ax, az - 2));
      if (steil < 1.2 && hoehe(ax, az) > 0.6) setze('auto/' + AUTOS[(ih >> 1) % AUTOS.length], ax, az, yaw + (ih % 4 === 1 ? 0 : Math.PI), { massstab: 1.5 });
    }
  }
  // 2) Dorfplatz: Straßenlampen, Schilder, ein Lieferwagen am Kiosk
  const P = island.SITES && island.SITES.dorfplatz ? island.SITES.dorfplatz : { x: 4, z: 110 };
  for (const [dx, dz, yaw] of [[-9, -7, 0.8], [10, -8, -0.8], [11, 7, -2.3], [-10, 8, 2.3]]) setze('strasse/light-square', P.x + dx, P.z + dz, yaw, { massstab: 9 });
  setze('strasse/road-sign-stop', P.x + 7.5, P.z + 11, Math.PI, { massstab: 7 });
  setze('strasse/dumpster', -24.2, 113.2, 0.6, { massstab: 5 });
  setze('strasse/construction-cone', 14.5, 123, 0, { massstab: 6 });
  setze('strasse/construction-cone', 15.6, 124.2, 0.5, { massstab: 6 });
  // Fränz' Lieferwagen am Kiosk: den kann man nehmen (plugin.js → fahren.js)
  const lieferwagen = setze('auto/delivery', LIEFERWAGEN.x, LIEFERWAGEN.z, LIEFERWAGEN.yaw, { massstab: 1.5 });
  const parkplatz = lieferwagen ? { x: lieferwagen.position.x, y: lieferwagen.position.y, z: lieferwagen.position.z, yaw: lieferwagen.rotation.y } : null;
  setze('auto/taxi', 13.5, 103.5, -0.5, { massstab: 1.5 });
  // 3) Straßen auf den Hauptwegen, Lampen am Rand, parkende Autos, ein wenig Verkehr
  const fahrten = [];
  const base = game.props.materials.base;
  for (const id of STRASSEN) {
    const weg = (island.PATHS || []).find((p) => p.id === id); if (!weg) continue;
    const { geo, punkte } = strassenBand(weg.pts, hoehe);
    const m = new THREE.Mesh(geo, base); m.receiveShadow = true; m.name = 'strasse-' + id; wurzel.add(m);
    // alle ~38 m eine Lampe, abwechselnd links und rechts
    for (let i = 10, s = 1; i < punkte.length - 4; i += 25, s = -s) {
      const a = punkte[i - 1], b = punkte[i + 1]; const yaw = Math.atan2(b.x - a.x, b.z - a.z);
      const nx = Math.cos(yaw), nz = -Math.sin(yaw);
      setze('strasse/light-square', punkte[i].x + nx * 3.6 * s, punkte[i].z + nz * 3.6 * s, yaw + (s > 0 ? -Math.PI / 2 : Math.PI / 2), { massstab: 9 });
    }
    // parkende Autos am Straßenrand
    for (let i = 18, k = 0; i < punkte.length - 10; i += 31, k++) {
      const a = punkte[i - 1], b = punkte[i + 1]; const yaw = Math.atan2(b.x - a.x, b.z - a.z);
      const nx = Math.cos(yaw), nz = -Math.sin(yaw), s = k % 2 ? 1 : -1;
      setze('auto/' + AUTOS[(k + id.length) % AUTOS.length], punkte[i].x + nx * 3.5 * s, punkte[i].z + nz * 3.5 * s, yaw + (s > 0 ? 0 : Math.PI), { massstab: 1.5 });
    }
    fahrten.push(punkte);
  }
  // Verkehr: je Straße ein Fahrzeug, das langsam hin- und herfährt und vor Menschen anhält
  const wagen = [];
  fahrten.forEach((punkte, i) => {
    const m = setze('auto/' + ['van', 'sedan', 'suv'][i % 3], punkte[4].x, punkte[4].z, 0, { massstab: 1.5 });
    if (!m) return;
    m.geometry = gefaerbt(m.geometry, '#000000', ['#F2C14E', '#E9E4D8', '#C9462F'][i % 3]);
    wagen.push({ m, punkte, s: 4 + i * 30, richtung: 1, v: 0 });
  });
  const _p = new THREE.Vector3();
  const halt = (x, z) => {
    const pl = game.player && game.player.position;
    if (pl && Math.hypot(pl.x - x, pl.z - z) < 6.5) return true;
    for (const f of game.npcs.list()) { const q = f.position || (f.humanoid && f.humanoid.group.position); if (q && Math.hypot(q.x - x, q.z - z) < 4.5) return true; }
    return false;
  };
  game.addUpdate((dt) => {
    for (const w of wagen) {
      const n = w.punkte.length - 1;
      const i = Math.max(0, Math.min(n - 1, Math.floor(w.s))), f = w.s - i;
      const a = w.punkte[i], b = w.punkte[i + 1];
      const x = a.x + (b.x - a.x) * f, z = a.z + (b.z - a.z) * f;
      const yaw = Math.atan2((b.x - a.x) * w.richtung, (b.z - a.z) * w.richtung);
      // rechts fahren: 1,3 m neben der Mitte
      const ox = Math.cos(yaw) * -1.3, oz = -Math.sin(yaw) * -1.3;
      const vx = x + Math.sin(yaw) * 5, vz = z + Math.cos(yaw) * 5;   // Punkt vor dem Wagen
      const ziel = halt(vx, vz) || halt(x, z) ? 0 : 5.5;
      w.v += (ziel - w.v) * Math.min(1, dt * 2.5);
      w.s += (w.v * dt / 1.5) * w.richtung;   // Punkte liegen ~1,5 m auseinander
      if (w.s >= n - 3) { w.s = n - 3; w.richtung = -1; } else if (w.s <= 3) { w.s = 3; w.richtung = 1; }
      const b0 = w.m.geometry.boundingBox;
      w.m.position.set(x + ox, hoehe(x + ox, z + oz) + 0.1 - b0.min.y * w.m.scale.y, z + oz);
      w.m.rotation.y = yaw;
    }
  }, { order: 60 });
  game.scene.add(wurzel);
  return { gruppe: wurzel, setze, modelle: Object.keys(G), wagen, lieferwagen,
    // am Morgen steht der Lieferwagen wieder am Kiosk (Fränz hat ihn geholt)
    parke() { if (lieferwagen && parkplatz) { lieferwagen.position.set(parkplatz.x, parkplatz.y, parkplatz.z); lieferwagen.rotation.y = parkplatz.yaw; } } };
}
