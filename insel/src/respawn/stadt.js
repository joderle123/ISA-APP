// RESPAWN – moderne Kleinstadt statt Bilderbuch-Dorf: Häuser, Läden, Autos, Straßenlampen und Schilder aus den
// Kenney-Bausätzen (CC0; siehe modelle/LIZENZ.md, Umwandlung tools/stadt/stadt.py). Die Modelle tragen ihre Farben in den
// Eckpunkten und nutzen das Material der Insel-Requisiten (flach schattiert, Schleier, Tageslicht).
// Die alten Häuser bleiben als Logik (Kollision, Türen, Orte) bestehen und werden nur unsichtbar.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
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
        const nr = g.attributes.normal;
        if (nr) { const nf = new Float32Array(n * 3), v = new THREE.Vector3(); for (let i = 0; i < n; i++) { v.fromBufferAttribute(nr, i).normalize(); nf[i * 3] = v.x; nf[i * 3 + 1] = v.y; nf[i * 3 + 2] = v.z; } g.setAttribute('normal', new THREE.BufferAttribute(nf, 3)); }
        for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(k)) g.deleteAttribute(k);
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

  // Hindernis passend zum neuen Modell: ersetzt das des alten Hauses und versperrt der Kamera die Sicht (sicht: true),
  // damit sie nicht durch die Wand schaut
  const col = game.colliders;
  const hindernis = (m, b) => {
    if (!col || !m) return;
    for (const o of col.query(b.x, b.z, 1.5)) if (o.tag === 'haus') col.remove(o);
    const bb = m.geometry.boundingBox, s = m.scale.x;
    col.addBox(m.position.x + ((bb.max.x + bb.min.x) / 2) * s * Math.cos(m.rotation.y) + ((bb.max.z + bb.min.z) / 2) * s * Math.sin(m.rotation.y),
      m.position.z - ((bb.max.x + bb.min.x) / 2) * s * Math.sin(m.rotation.y) + ((bb.max.z + bb.min.z) / 2) * s * Math.cos(m.rotation.y),
      Math.max(0.6, (bb.max.x - bb.min.x) * s / 2 - 0.25), Math.max(0.6, (bb.max.z - bb.min.z) * s / 2 - 0.25), m.rotation.y,
      { group: 'props', tag: 'haus', sicht: true, yMax: m.position.y + bb.max.y * s });
  };
  // 1) Häuser und Läden an die Stelle der alten
  let ih = 0, il = 0;
  const decor = game.world.decor;
  for (const zone of ['hafen', 'markt']) { const h = decor && decor.get('haeuser-' + zone); if (h && h.group) h.group.visible = false; }
  for (const b of BUILDINGS) {
    const yaw = buildingYaw(b);
    if (b.type === 'kiosk') {
      const m = setze('laden/c', b.x, b.z, yaw, { breite: 6.2 });
      if (m) m.position.y = grund(b.x, b.z, 2) - 0.05;
      hindernis(m, b);
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
      hindernis(m, b);
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
  for (const [dx, dz, yaw] of [[-9, -7, 0.8], [15.5, -3, -1.2], [11, 7, -2.3], [-10, 8, 2.3]]) setze('strasse/light-square', P.x + dx, P.z + dz, yaw, { massstab: 9 });
  setze('strasse/road-sign-stop', P.x + 7.5, P.z + 11, Math.PI, { massstab: 7 });
  setze('strasse/dumpster', -24.2, 113.2, 0.6, { massstab: 5 });
  setze('strasse/construction-cone', 14.5, 123, 0, { massstab: 6 });
  setze('strasse/construction-cone', 15.6, 124.2, 0.5, { massstab: 6 });
  // Fränz' Lieferwagen am Kiosk: den kann man nehmen (plugin.js → fahren.js)
  const lieferwagen = setze('auto/delivery', LIEFERWAGEN.x, LIEFERWAGEN.z, LIEFERWAGEN.yaw, { massstab: 1.5 });
  const parkplatz = lieferwagen ? { x: lieferwagen.position.x, y: lieferwagen.position.y, z: lieferwagen.position.z, yaw: lieferwagen.rotation.y } : null;
  setze('auto/taxi', -12.5, 103.2, 2.1, { massstab: 1.5 });   // am Weg zum Markt, nicht in der Skate-Ecke
  // 2b) Skate-Ecke am Dorfplatz (Pflasterkreis im Nordosten): Rampe, Rail, Box – Pits Revier
  const fest = (m, hw, hd, hoch) => { if (m && col) col.addBox(m.position.x, m.position.z, hw, hd, m.rotation.y, { group: 'props', tag: 'skate', yMax: m.position.y + hoch }); return m; };
  fest(setze('skate/half-pipe-low', 17.2, 98.6, 0.5, { massstab: 4.2 }), 2.0, 2.0, 1.7);
  fest(setze('skate/obstacle-box-grind', 12.6, 99.4, 1.2, { massstab: 3.4 }), 0.8, 1.6, 0.7);
  fest(setze('skate/rail-low', 14.4, 103.2, 0.5, { massstab: 3.6 }), 0.2, 1.8, 0.9);
  setze('skate/skateboard', 13.3, 101.4, 2.2, { massstab: 1.25 });
  setze('skate/pallet', 19.6, 102.4, 0.3, { massstab: 2.4 });
  // 2c) Boote am Steg und eine Boje vor dem Strand (bis dahin schwimmt man)
  const wasser = (x, z) => (island.waterLevel ? island.waterLevel(x, z) : 0);
  const schwimmt = (n, x, z, yaw, massstab, tief = 0.12) => { const m = setze(n, x, z, yaw, { massstab }); if (m) { const b = m.geometry.boundingBox; m.position.y = wasser(x, z) - tief - b.min.y * massstab; m.userData.wasserY = m.position.y; m.userData.phase = x * 0.7 + z; } return m; };
  const boote = [
    schwimmt('boot/boat-fishing-small', 10.3, 141.5, Math.PI, 1.15),
    schwimmt('boot/boat-row-small', 1.9, 146.5, 0.1, 1.0),
    schwimmt('boot/boat-sail-a', 10.6, 149.5, Math.PI, 1.1),
    schwimmt('boot/boat-row-large', 1.6, 137.5, -0.1, 1.0),
    schwimmt('boot/buoy-flag', 158, 37, 0, 1.3, 0.25),
    schwimmt('boot/buoy', 40, 150, 0, 1.2, 0.25),
  ].filter(Boolean);
  // 2d) Markt: Auslagen vor den vier Ständen
  for (const [n, x, z, yaw, ms] of [
    ['markt/display-fruit', -115.2, 24.2, Math.PI, 2.2], ['markt/display-bread', -120.6, 24.2, Math.PI, 2.2],
    ['markt/display-flowers', -128.2, 16.8, -Math.PI / 2, 2.0], ['markt/shelf-boxes', -128.4, 11.2, Math.PI / 2, 2.0],
    ['markt/clothing-rack', -107.8, 11.4, Math.PI / 2, 2.2], ['markt/display-cans', -107.6, 16.8, -Math.PI / 2, 2.0],
    ['markt/clothing-table', -115.4, 3.8, 0, 2.2], ['markt/hand-truck', -121.4, 4.2, 0.6, 2.2], ['markt/shopping-cart', -123.2, 19.4, 2.2, 2.4],
  ]) { const m = setze(n, x, z, yaw, { massstab: ms }); if (m && col) { const b = m.geometry.boundingBox; col.addCircle(x, z, Math.max(b.max.x - b.min.x, b.max.z - b.min.z) * ms * 0.42, { group: 'props', tag: 'auslage' }); } }
  // 2d2) Lucindas Garten: drei Beete neben ihrem Stand (Kenney „Nature Kit“). Vorher hieß der Ort nur so – zu sehen war nichts.
  {
    const gx = -113.6, reihen = [[28.2, ['natur/crops_leafsStageB']], [29.5, ['natur/crops_cornStageC']], [30.8, ['natur/crop_pumpkin', 'natur/crop_melon', 'natur/crop_carrot', 'natur/crop_turnip']]];
    for (const [z, pflanzen] of reihen) {
      for (const dx of [-1, 1]) setze('natur/crops_dirtRow', gx + dx, z, 0, { massstab: 2, y: 0.04, schatten: false });
      for (let i = 0; i < 5; i++) setze(pflanzen[i % pflanzen.length], gx - 1.6 + i * 0.8, z, i * 1.3, { massstab: 1.5, y: 0.06 });
    }
    for (const [n, x, z] of [['natur/flower_redA', -111.1, 28.0], ['natur/flower_yellowB', -111.0, 29.6], ['natur/flower_purpleB', -111.2, 31.2], ['natur/flower_redA', -116.1, 31.6]]) setze(n, x, z, x, { massstab: 2.6, schatten: false });
  }
  // 2e) Feuerstelle am Strand: erst zu sehen, wenn dort jemand Feuer gemacht hat (plugin.js → zeigeSpuren)
  const feuerstelle = new THREE.Group(); feuerstelle.name = 'respawn-feuerstelle'; feuerstelle.visible = false;
  {
    const fx = 125.5, fz = 43.5, fy = hoehe(fx, fz);
    const stein = new THREE.MeshLambertMaterial({ color: '#8d8a86', flatShading: true }), kohle = new THREE.MeshLambertMaterial({ color: '#2a2422', flatShading: true });
    const asche = new THREE.Mesh(new THREE.CircleGeometry(1.05, 14), new THREE.MeshLambertMaterial({ color: '#3a3330' })); asche.rotation.x = -Math.PI / 2; asche.position.set(fx, fy + 0.05, fz); feuerstelle.add(asche);
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const st = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24 + (i % 3) * 0.05, 0), stein); st.position.set(fx + Math.cos(a) * 1.0, fy + 0.14, fz + Math.sin(a) * 1.0); st.rotation.set(i, i * 2, i * 3); st.castShadow = true; feuerstelle.add(st); }
    for (let i = 0; i < 3; i++) { const ast = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.16, 0.18), kohle); ast.position.set(fx, fy + 0.16 + i * 0.07, fz); ast.rotation.y = i * 1.05 + 0.3; ast.rotation.z = 0.12; feuerstelle.add(ast); }
  }
  wurzel.add(feuerstelle);

  // 4) Mehr Welt (13.11.2026 abends; Kenney Pirate/Survival/Fantasy Town/Holiday/Racing/Industrial Kit, CC0):
  //    Hafen und Bucht, Strandlager, Stände am Platz, Treff am Krater, Bank am Leuchtturm, Windräder auf den Klippen –
  //    und je Jahreszeit eigene Dinge (Kürbisse, Schneemänner, Blumen, Festzelte). Alles Feste wird je Gruppe zu EINEM Netz
  //    zusammengefasst (ein Zeichen-Aufruf statt hunderte).
  const stapel = {};
  const _q = new THREE.Quaternion(), _hoch = new THREE.Vector3(0, 1, 0);
  const lege = (gruppe, n, x, z, yaw = 0, ms = 1, { y = 0, kreis = 0, kipp = 0, aufWasser = false } = {}) => {
    const g = name(n); if (!g) { console.warn('[respawn] Modell fehlt', n); return; }
    const b = g.boundingBox, grund = aufWasser ? wasser(x, z) : hoehe(x, z);
    _q.setFromAxisAngle(_hoch, yaw);
    if (kipp) _q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), kipp));
    const k = g.clone();
    k.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, grund + y - b.min.y * ms, z), _q, new THREE.Vector3(ms, ms, ms)));
    (stapel[gruppe] = stapel[gruppe] || []).push(k);
    if (kreis && col) col.addCircle(x, z, kreis, { group: 'props', tag: 'schmuck' });
  };
  // flachste Stelle in der Nähe (Zelte und Türme sollen nicht am Hang hängen)
  const flach = (x, z, r = 2, such = 7) => {
    let best = { x, z, d: 1e9 };
    for (let dx = -such; dx <= such; dx += 1.75) for (let dz = -such; dz <= such; dz += 1.75) {
      const px = x + dx, pz = z + dz, h = hoehe(px, pz);
      if (h < 0.8) continue;
      const d = Math.abs(hoehe(px + r, pz) - h) + Math.abs(hoehe(px - r, pz) - h) + Math.abs(hoehe(px, pz + r) - h) + Math.abs(hoehe(px, pz - r) - h) + Math.hypot(dx, dz) * 0.06;
      if (d < best.d) best = { x: px, z: pz, d };
    }
    return best;
  };
  // was aus LUMO stammt und in RESPAWN keinen Sinn hat, geht: die Gezeiten-Tanks am Strand
  if (decor && decor.remove) decor.remove('tanks');

  // --- Hafen und Bucht ---
  const segler = [schwimmt('hafen/ship-large', -16, 194, 2.3, 2.3, 1.5), schwimmt('hafen/ship-medium', 74, 176, -0.9, 1.9, 1.2)].filter(Boolean);
  for (const m of segler) { m.castShadow = false; boote.push(m); }
  lege('fest', 'hafen/flag-high', 3.1, 131.4, 0.4, 1.3); lege('fest', 'hafen/flag-high', 8.9, 131.4, -0.4, 1.3);
  lege('welt', 'lager/campfire-fishing-stand', 12.6, 136.4, 0.5, 4.5, { kreis: 0.8 }); lege('welt', 'lager/fish-large', 12.9, 135.2, 1.1, 2.2); lege('welt', 'lager/bucket', 11.5, 137.2, 0, 2.6);
  lege('welt', 'natur/canoe', -3.0, 134.6, 0.9, 3.4, { kreis: 1.0 }); lege('welt', 'natur/canoe_paddle', -1.4, 135.6, 2.2, 3.4);
  lege('welt', 'hafen/boat-row-small', 17.8, 139.8, 1.1, 1.25, { kreis: 1.1 }); lege('welt', 'hafen/tool-paddle', 19.2, 138.6, 0.3, 0.8);
  lege('welt', 'hafen/barrel', -1.2, 132.4, 0, 0.65, { kreis: 0.6 }); lege('welt', 'hafen/crate', -2.4, 131.6, 0.4, 0.75, { kreis: 0.6 }); lege('welt', 'hafen/crate-bottles', -0.3, 131.2, 1.0, 0.75);
  lege('welt', 'lager/signpost', 1.3, 127.6, 0.6, 4.2, { kreis: 0.3 });
  lege('welt', 'hafen/rocks-a', 30.2, 144.2, 0.3, 0.45, { kreis: 1.1 });
  // Werft: Container, Fässer, Planken
  { const c = flach(32, 139, 2.2, 4);
    lege('welt', 'werk/shipping-container-a', c.x, c.z, 0.3, 6.5, { kreis: 2.0 }); lege('welt', 'werk/shipping-container-c', c.x + 3.4, c.z - 1.2, 0.3, 6.5, { kreis: 2.0 });
    { const cb = name('werk/shipping-container-a').boundingBox; lege('welt', 'werk/shipping-container-b', c.x + 0.4, c.z - 0.1, 0.38, 6.5, { y: (cb.max.y - cb.min.y) * 6.5 }); }
    lege('welt', 'lager/resource-planks', 19.6, 135.2, 0.4, 3); lege('welt', 'lager/workbench', 13.2, 128.6, 1.6, 3.2, { kreis: 0.7 }); }

  // --- Dorfplatz: zwei Marktstände, Karren, Laternen ---
  lege('welt', 'platz/stall-green', -0.6, 102.7, 0, 2.7, { kreis: 1.5 }); lege('welt', 'platz/stall-red', 3.4, 102.5, 0.08, 2.7, { kreis: 1.5 });
  lege('welt', 'markt/display-fruit', -0.6, 104.1, Math.PI, 1.3); lege('welt', 'natur/pot_large', 5.3, 103.6, 0, 1.6);
  lege('welt', 'platz/cart-high', -9.2, 111.4, 1.3, 2.3, { kreis: 1.3 });
  for (const [x, z] of [[7.0, 105.4], [-4.6, 105.6], [8.9, 110.6]]) lege('welt', 'platz/lantern', x, z, 0, 2.4, { kreis: 0.25 });

  // --- Strand: Lager statt Tanks, Zeltdach als Strandbar, Boote im Sand, Wrack im Wasser ---
  lege('welt', 'natur/tent_detailedOpen', 121.4, 49.6, 2.5, 4.4, { kreis: 1.6 }); lege('welt', 'natur/tent_smallOpen', 127.2, 51.2, 3.5, 4.2, { kreis: 1.4 });
  lege('welt', 'lager/bedroll', 124.2, 47.8, 0.4, 3.2); lege('welt', 'lager/bedroll-packed', 129.4, 48.6, 1.2, 3);
  lege('welt', 'natur/log', 122.9, 43.0, 0.2, 3.2, { kreis: 0.6 }); lege('welt', 'natur/log', 128.0, 44.8, 1.4, 3.2, { kreis: 0.6 }); lege('welt', 'natur/stump_round', 125.0, 46.3, 0, 2.2, { kreis: 0.5 });
  lege('welt', 'fest/tentRoof', 138.2, 41.2, 0.25, 4.6); lege('welt', 'platz/stall', 138.2, 41.2, 0.25, 2.6, { kreis: 1.4 });
  lege('welt', 'platz/stall-bench', 136.2, 43.3, 0.25, 2.4); lege('welt', 'platz/stall-stool', 140.3, 43.0, 0, 2.4); lege('welt', 'hafen/crate-bottles', 140.4, 39.6, 0.6, 0.75); lege('welt', 'hafen/barrel', 135.9, 39.4, 0, 0.65, { kreis: 0.6 });
  lege('welt', 'hafen/boat-row-small', 152.4, 40.2, 0.5, 1.3, { kreis: 1.1 }); lege('welt', 'natur/canoe', 150.6, 51.4, 1.9, 3.4, { kreis: 1.0 }); lege('welt', 'natur/canoe_paddle', 149.2, 52.6, 0.4, 3.4);
  lege('welt', 'lager/signpost', 132.6, 33.8, -0.6, 4.2, { kreis: 0.3 });
  lege('welt', 'hafen/rocks-a', 156.8, 57.4, 0.4, 0.5, { kreis: 1.2 }); lege('welt', 'hafen/rocks-b', 157.4, 32.6, 1.7, 0.45, { kreis: 1.1 }); lege('welt', 'hafen/chest', 155.4, 59.2, 2.4, 0.6);
  lege('welt', 'hafen/ship-wreck', 176, 49, 2.3, 1.5, { aufWasser: true, y: -2.2, kipp: 0.16 });
  lege('fest', 'hafen/flag-pennant', 134.4, 37.2, 0.2, 1.6);

  // --- Leuchtturm: Bank mit Blick aufs Meer, Wegweiser, Laternen, Felsen ---
  lege('welt', 'winter/bench', -128.8, 131.4, -2.3, 1.7, { kreis: 0.8 }); lege('welt', 'winter/bench', -109.2, 116.2, 0.6, 1.7, { kreis: 0.8 });
  lege('welt', 'lager/signpost', -103.6, 121.6, 1.2, 4.2, { kreis: 0.3 });
  lege('welt', 'platz/lantern', -108.4, 127.2, 0, 2.4, { kreis: 0.25 }); lege('welt', 'platz/lantern', -121.6, 119.2, 0, 2.4, { kreis: 0.25 });
  lege('welt', 'hafen/rocks-a', -131.6, 116.8, 0.8, 0.45, { kreis: 1.1 }); lege('welt', 'hafen/rocks-b', -124.2, 135.6, 2.6, 0.4, { kreis: 0.9 });

  // --- Treff am Krater: Feuerstelle, Stämme, eine Bude aus Blech ---
  { const k = flach(-19, -50, 2.2, 6);
    lege('welt', 'lager/campfire-pit', k.x, k.z, 0, 5, { kreis: 0.9 });
    lege('welt', 'lager/tree-log', k.x - 2.3, k.z + 0.4, 1.5, 2.6, { kreis: 0.6 }); lege('welt', 'lager/tree-log', k.x + 1.2, k.z - 2.2, 0.2, 2.6, { kreis: 0.6 });
    const b2 = flach(k.x - 5, k.z - 3, 2.2, 3);
    lege('welt', 'lager/structure-canvas', b2.x, b2.z, 0.7, 5.5, { kreis: 1.4 }); lege('welt', 'lager/metal-panel', b2.x + 2.2, b2.z + 0.8, 2.0, 3.4); lege('welt', 'lager/bedroll', b2.x, b2.z, 0.7, 3.2, { y: 0.1 });
    lege('welt', 'hafen/barrel', k.x + 2.6, k.z + 1.6, 0, 0.65, { kreis: 0.6 }); lege('welt', 'lager/box', k.x + 3.3, k.z + 0.5, 0.5, 2.6); }

  // --- Markt: Karren und Kisten zwischen den Ständen ---
  lege('welt', 'platz/cart', -127.4, 21.2, 2.2, 2.3, { kreis: 1.2 }); lege('welt', 'lager/box-large', -108.6, 6.2, 0.3, 2.6, { kreis: 0.6 }); lege('welt', 'hafen/barrel', -109.9, 5.2, 0, 0.65, { kreis: 0.6 });

  // --- Fernblick: drei Windräder auf den Klippen, ein Wasserturm über dem Hafen ---
  for (const [x, z, yaw] of [[-112, -70, 0.4], [-94, -90, 0.9], [-82, -58, 0.1]]) { const w = flach(x, z, 2.5, 6); lege('welt', 'werk/windmill', w.x, w.z, yaw, 10, { kreis: 1.0 }); }
  { const t = flach(-44, 96, 3, 8); lege('welt', 'werk/water-tower', t.x, t.z, 0.5, 5.5, { kreis: 2.2 }); }

  // --- Jahreszeiten ---
  // Herbst: Kürbisse vor den Ständen, Holzstapel, Pilze
  for (const [x, z, ms] of [[-1.7, 104.3, 2.3], [-0.9, 104.9, 1.8], [4.6, 104.2, 2.4], [-113.4, 25.4, 2.2], [-112.6, 24.7, 1.8], [-17.8, 121.2, 2.2], [136.4, 44.6, 2.0]]) lege('herbst', 'natur/crop_pumpkin', x, z, x * 1.7, ms);
  lege('herbst', 'natur/log_stack', -10.6, 104.6, 0.4, 3.0); lege('herbst', 'natur/log_stack', -126.2, 5.4, 1.2, 3.0);
  for (const [x, z] of [[-6.4, 100.6], [12.8, 95.2], [-104.2, 119.4], [118.6, 52.4], [-22.4, 108.6]]) lege('herbst', 'natur/mushroom_redGroup', x, z, x, 1.8);
  for (const [x, z] of [[9.6, 99.2], [-111.2, 126.4], [-121.8, 27.6]]) lege('herbst', 'natur/mushroom_tanGroup', x, z, z, 1.8);
  // Winter: Schneemänner, ein geschmückter Baum am Platz und am Markt, Geschenke, Schlitten, Schneehaufen an der Straße
  lege('winter', 'winter/tree-decorated-snow', -7.6, 105.8, 0, 3.4, { kreis: 1.3 }); lege('winter', 'winter/present-a-cube', -6.2, 106.9, 0.4, 1.1); lege('winter', 'winter/present-b-round', -8.6, 107.4, 1.3, 1.1); lege('winter', 'winter/present-a-rectangle', -7.0, 107.8, 2.1, 1.1);
  lege('winter', 'winter/tree-decorated', -125.6, 5.6, 0, 3.0, { kreis: 1.2 }); lege('winter', 'winter/present-a-cube', -124.4, 6.6, 1.0, 1.1);
  lege('winter', 'winter/snowman-hat', 9.4, 112.9, -2.2, 1.5, { kreis: 0.7 }); lege('winter', 'winter/snowman', -112.4, 19.8, 2.4, 1.5, { kreis: 0.7 }); lege('winter', 'winter/snowman', -19.8, 121.8, 0.6, 1.5, { kreis: 0.7 });
  lege('winter', 'winter/snowman-hat', -112.6, 119.4, 1.2, 1.5, { kreis: 0.7 }); lege('winter', 'winter/snowman', 131.2, 41.8, -1.4, 1.5, { kreis: 0.7 });
  lege('winter', 'winter/sled', 12.4, 97.4, 0.8, 1.6); lege('winter', 'winter/sled', -106.8, 118.2, 2.0, 1.6); lege('winter', 'winter/reindeer', -110.6, 113.6, 0.9, 1.5, { kreis: 0.7 });
  for (const [x, z] of [[-3.4, 119.2], [10.2, 119.0], [-15.2, 120.6], [22.6, 118.4], [-121.6, 0.6], [126.4, 33.2], [4.2, 127.6]]) lege('winter', 'winter/snow-pile', x, z, x, 2.6);
  for (const [x, z] of [[-0.6, 103.4], [3.4, 103.2]]) lege('winter', 'winter/wreath-decorated', x, z, 0, 1.2, { y: 1.7 });
  // Frühling: Blumen rund um den Platz, am Leuchtturm, am Weg zum Strand
  { const BL = ['natur/flower_redB', 'natur/flower_yellowA', 'natur/flower_purpleA', 'natur/flower_redA', 'natur/flower_yellowB', 'natur/flower_purpleB'];
    let i = 0;
    for (let a = 0; a < 16; a++) { const w = (a / 16) * Math.PI * 2 + 0.2, r = 8.6 + (a % 3) * 0.9; const x = 1 + Math.sin(w) * r, z = 111 + Math.cos(w) * r; if (z > 114.2) continue; lege('fruehling', BL[i++ % BL.length], x, z, a, 3.0); }
    for (let a = 0; a < 14; a++) { const w = (a / 14) * Math.PI * 2, r = 6.5 + (a % 4) * 1.6; lege('fruehling', BL[i++ % BL.length], -117 + Math.sin(w) * r, 121 + Math.cos(w) * r, a, 3.0); }
    for (const [x, z] of [[120.2, 44.4], [121.4, 45.6], [133.6, 34.6], [-16.4, 122.4], [-19.2, 114.6], [-104.2, 31.4], [-108.6, 33.2], [-126.8, 24.6], [-109.2, 3.4]]) lege('fruehling', BL[i++ % BL.length], x, z, x, 3.0);
    lege('fruehling', 'natur/pot_large', -2.6, 103.6, 0, 1.6); lege('fruehling', 'natur/pot_large', 8.4, 108.2, 0, 1.6); }
  // Sommer: Festzelte am Platz und am Strand, Fahnen, Liegeplätze
  lege('sommer', 'fest/tentLong', -10.6, 106.4, 1.35, 4.2); lege('sommer', 'platz/stall-bench', -10.6, 106.4, 1.35, 2.4, { kreis: 1.2 });
  lege('sommer', 'fest/tent', 145.2, 47.6, 0.3, 4.2); lege('sommer', 'lager/bedroll', 147.8, 44.2, 0.5, 3.2); lege('sommer', 'lager/bedroll', 150.2, 45.4, 0.2, 3.2); lege('sommer', 'lager/bedroll', 146.4, 52.2, 1.1, 3.2);
  lege('sommer', 'fest/flagRed', 142.6, 45.6, 0, 3.0); lege('sommer', 'fest/flagGreen', 148.0, 49.8, 0, 3.0); lege('sommer', 'fest/flagCheckers', 6.2, 104.6, 0, 3.0);
  lege('sommer', 'fest/tentClosed', -121.6, 23.2, 0.8, 4.0, { kreis: 1.8 });

  const gruppen = {};
  for (const [id, liste] of Object.entries(stapel)) {
    const geo = mergeGeometries(liste, false);
    for (const g of liste) g.dispose();
    if (!geo) { console.warn('[respawn] Schmuck-Gruppe leer', id); continue; }
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; m.name = 'schmuck-' + id; wurzel.add(m); gruppen[id] = m;
  }
  const JZ = ['herbst', 'winter', 'fruehling', 'sommer'];
  let jzJetzt = -2;
  const zeigeJahreszeit = (jz) => { if (jz === jzJetzt) return; jzJetzt = jz; JZ.forEach((id, i) => { if (gruppen[id]) gruppen[id].visible = i === jz; }); };
  zeigeJahreszeit(-1);

  // 3) Straßen auf den Hauptwegen, Lampen am Rand, parkende Autos, ein wenig Verkehr
  const fahrten = [];
  const base = game.props.materials.base;
  // Die Wege zum Leuchtturm und zum Strand beginnen beide am Dorfplatz: als EINE durchgehende Hauptstraße bauen
  // (sonst klafft dort eine Lücke). Auf ihr fahren zwei Wagen.
  const wegVon = (id) => ((island.PATHS || []).find((p) => p.id === id) || {}).pts;
  const strassen = [];
  if (wegVon('hafen-leuchtturm') && wegVon('hafen-strand')) strassen.push({ id: 'haupt', pts: wegVon('hafen-leuchtturm').slice().reverse().concat(wegVon('hafen-strand')), wagen: 2 });
  else for (const id of ['hafen-leuchtturm', 'hafen-strand']) if (wegVon(id)) strassen.push({ id, pts: wegVon(id), wagen: 1 });
  if (wegVon('hafen-markt')) strassen.push({ id: 'hafen-markt', pts: wegVon('hafen-markt'), wagen: 1 });
  for (const weg of strassen) {
    const id = weg.id;
    const { geo, punkte } = strassenBand(weg.pts, hoehe);
    const m = new THREE.Mesh(geo, base); m.receiveShadow = true; m.name = 'strasse-' + id; wurzel.add(m);
    // alle ~38 m eine Lampe, abwechselnd links und rechts
    for (let i = 10, s = 1; i < punkte.length - 4; i += 25, s = -s) {
      const a = punkte[i - 1], b = punkte[i + 1]; const yaw = Math.atan2(b.x - a.x, b.z - a.z);
      const nx = Math.cos(yaw), nz = -Math.sin(yaw);
      const lx = punkte[i].x + nx * 3.6 * s, lz = punkte[i].z + nz * 3.6 * s;
      if (Math.hypot(lx - LIEFERWAGEN.x, lz - LIEFERWAGEN.z) < 5) continue;   // nicht auf dem Parkplatz des Lieferwagens
      setze('strasse/light-square', lx, lz, yaw + (s > 0 ? -Math.PI / 2 : Math.PI / 2), { massstab: 9 });
    }
    // parkende Autos am Straßenrand
    for (let i = 18, k = 0; i < punkte.length - 10; i += 31, k++) {
      const a = punkte[i - 1], b = punkte[i + 1]; const yaw = Math.atan2(b.x - a.x, b.z - a.z);
      const nx = Math.cos(yaw), nz = -Math.sin(yaw), s = k % 2 ? 1 : -1;
      setze('auto/' + AUTOS[(k + id.length) % AUTOS.length], punkte[i].x + nx * 3.5 * s, punkte[i].z + nz * 3.5 * s, yaw + (s > 0 ? 0 : Math.PI), { massstab: 1.5 });
    }
    for (let k = 0; k < weg.wagen; k++) fahrten.push(punkte);
  }
  // Verkehr: je Straße ein Fahrzeug, das langsam hin- und herfährt und vor Menschen anhält
  const wagen = [];
  fahrten.forEach((punkte, i) => {
    const m = setze('auto/' + ['van', 'sedan', 'suv'][i % 3], punkte[4].x, punkte[4].z, 0, { massstab: 1.5 });
    if (!m) return;
    m.geometry = gefaerbt(m.geometry, '#000000', ['#F2C14E', '#E9E4D8', '#C9462F'][i % 3]);
    wagen.push({ m, punkte, s: Math.min(punkte.length - 6, 4 + i * 55), richtung: i % 2 ? -1 : 1, v: 0 });
  });
  const _p = new THREE.Vector3();
  const halt = (x, z) => {
    const pl = game.player && game.player.position;
    if (pl && Math.hypot(pl.x - x, pl.z - z) < 6.5) return true;
    for (const f of game.npcs.list()) { const q = f.position || (f.humanoid && f.humanoid.group.position); if (q && Math.hypot(q.x - x, q.z - z) < 4.5) return true; }
    return false;
  };
  let uhr = 0;
  game.addUpdate((dt) => {
    // Boote und Bojen schaukeln leicht
    uhr += dt;
    for (const m of boote) { m.position.y = m.userData.wasserY + Math.sin(uhr * 1.1 + m.userData.phase) * 0.07; m.rotation.z = Math.sin(uhr * 0.8 + m.userData.phase) * 0.035; }
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
  return { gruppe: wurzel, setze, modelle: Object.keys(G), wagen, lieferwagen, boote, gruppen,
    // Dinge der Jahreszeit zeigen (0 Herbst · 1 Winter · 2 Frühling · 3 Sommer; -1 = keine)
    jahreszeit: zeigeJahreszeit,
    // Spuren in der Welt: Was man angestellt hat, bleibt zu sehen
    zeigeSpuren(flags) { feuerstelle.visible = !!(flags && flags.feuer); },
    // am Morgen steht der Lieferwagen wieder am Kiosk (Fränz hat ihn geholt)
    parke() { if (lieferwagen && parkplatz) { lieferwagen.position.set(parkplatz.x, parkplatz.y, parkplatz.z); lieferwagen.rotation.y = parkplatz.yaw; } } };
}
