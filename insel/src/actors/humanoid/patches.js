// Aufnäher-Raster (WP16): bis zu 39 Aufnäher auf Hoodie-Rücken (30) und Ärmeln (je 5 links, 4 rechts).
// patchLayout(n) ist rein (testbar in Node); buildPatchParts liefert Geometrie-Teile für merge().
// Ein Aufnäher = gesättigte Scheibe mit weißem Rand (0,006) + Symbol nach Modul (Kreis, Dreieck, Raute, Fünfeck, Sechseck,
// Stern, Flamme, Ring, Blatt, Sonne). Liegt exakt auf dem Rumpfquerschnitt (base.js torsoRadius).
import * as THREE from 'three';
import { fig, FLAG } from './geo.js';
import { M, darker, torsoRadius } from './base.js';
import { UNIT_MODULE } from '../../content/schema/consts.js';

export const PATCH_MAX = 39;
export const MODULE_COLOR = { 'j1-m0': '#ffb347', 'j1-m1': '#2de2c9', 'j1-m2': '#4cd964', 'j1-m3': '#8fa3ff', 'j1-m4': '#b06bff', 'j1-m5': '#ffd166', 'j1-m6': '#ff6b3d', 'j1-m7': '#ff8ccf', 'j1-m8': '#8fd18b', 'j1-m9': '#fff3a0', joker: '#ffffff' };

// Eintrag normalisieren: 'j1-e04' | { id, color?, icon? } → { id, color, module, nr }
export function normalizePatch(p) {
  const id = typeof p === 'string' ? p : (p && p.id) || '';
  const module = UNIT_MODULE[id] || (/^j1-j/.test(id) ? 'joker' : 'j1-m0');
  const color = (p && p.color) || MODULE_COLOR[module] || '#ffffff';
  const nr = Number((id.match(/(\d+)$/) || [])[1]) || 0;
  return { id, color, module, nr, joker: module === 'joker' };
}

// Positionen: Rücken 5 Spalten × 6 Reihen (u = seitlich −1…1, v = Höhe 0…1), Ärmel: Reihen außen am Oberarm
export function patchLayout(n) {
  const out = [];
  const N = Math.max(0, Math.min(PATCH_MAX, n | 0));
  const back = Math.min(30, N);
  for (let i = 0; i < back; i++) {
    const col = i % 5, row = Math.floor(i / 5);
    out.push({ where: 'back', i, u: (col - 2) / 2, v: 0.9 - row / 5.6, r: 0.026 });
  }
  const arm = N - back;                        // bis zu 9 auf den Ärmeln: L 5, R 4
  for (let i = 0; i < arm; i++) {
    const left = i < 5, k = left ? i : i - 5;
    out.push({ where: left ? 'armL' : 'armR', i: back + i, v: k / 4.4, r: 0.02 });
  }
  return out;
}

// Symbolform je Modul-Nummer (0…9, Joker = 10) als kleines flaches Teil
function symbolGeo(mod, r) {
  switch (mod) {
    case 0: return new THREE.CircleGeometry(r * 0.5, 12);
    case 1: return new THREE.CircleGeometry(r * 0.58, 3);
    case 2: return new THREE.CircleGeometry(r * 0.58, 4);
    case 3: return new THREE.CircleGeometry(r * 0.56, 5);
    case 4: return new THREE.CircleGeometry(r * 0.56, 6);
    case 5: return new THREE.RingGeometry(r * 0.22, r * 0.58, 5, 1);
    case 6: return new THREE.CircleGeometry(r * 0.6, 3).rotateZ(Math.PI);
    case 7: return new THREE.RingGeometry(r * 0.3, r * 0.55, 12, 1);
    case 8: return new THREE.CircleGeometry(r * 0.55, 4).scale(0.6, 1, 1);
    default: return new THREE.RingGeometry(r * 0.15, r * 0.6, 8, 1);
  }
}

// Teile für den Rumpf (Rücken) und die Oberarme. W = Breitenfaktor der Statur.
export function buildPatchParts(patches, where, W = 1) {
  const list = (patches || []).slice(0, PATCH_MAX).map(normalizePatch);
  const lay = patchLayout(list.length).filter((l) => l.where === where);
  const parts = [];
  const flat = FLAG.flat;
  for (const l of lay) {
    const p = list[l.i];
    const modNr = p.joker ? 10 : Number((p.module.match(/m(\d)/) || [])[1]) || 0;
    const disc = new THREE.CircleGeometry(l.r, 10);
    const sym = symbolGeo(modNr, l.r);
    const border = new THREE.RingGeometry(l.r * 0.78, l.r, 10, 1);
    if (where === 'back') {
      // Rückenfläche des Rumpfes (Ellipse je Höhe): Position auf der Fläche, Normale nach hinten
      const y = 0.1 + l.v * (M.torso - 0.2);
      const { xr, zr } = torsoRadius(y, W);
      const x = l.u * xr * 0.72;
      const z = -zr * Math.sqrt(Math.max(0.05, 1 - (x / xr) ** 2));
      const nx = x / (xr * xr), nz = z / (zr * zr);
      const yaw = Math.atan2(nx, nz);
      const rot = [0, yaw, 0], dx = Math.sin(yaw), dz = Math.cos(yaw);
      const at = (d) => [x + dx * d, y, z + dz * d];
      parts.push(fig(disc, { pos: at(0.004), rot, flag: flat, color: p.color, smooth: false }));
      parts.push(fig(border, { pos: at(0.006), rot, flag: flat, color: '#ffffff', smooth: false }));
      parts.push(fig(sym, { pos: at(0.008), rot, flag: flat, color: darker(p.color, 0.45), smooth: false }));
    } else {
      // Oberarm außen: auf der Armkapsel (Radius 0,064 → 0,054), Höhe entlang des Arms (0 oben … −upperArm)
      const s = where === 'armL' ? 1 : -1;
      const y = -0.05 - l.v * (M.upperArm - 0.06);
      const r = (0.064 - 0.01 * (-y / (M.upperArm + 0.02))) * W;
      const rot = [0, s * Math.PI / 2, 0];
      const at = (d) => [s * (r + d), y, 0];
      parts.push(fig(disc, { pos: at(0.003), rot, flag: flat, color: p.color, smooth: false }));
      parts.push(fig(border, { pos: at(0.005), rot, flag: flat, color: '#ffffff', smooth: false }));
      parts.push(fig(sym, { pos: at(0.007), rot, flag: flat, color: darker(p.color, 0.45), smooth: false }));
    }
  }
  return parts;
}
