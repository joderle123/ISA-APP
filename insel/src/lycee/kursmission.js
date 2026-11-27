// Annexe Junglinster – Kurs-Missionen (REAL TALK Jahr 1 ↔ Spiel, Auftrag 24.11.2026).
// „Die Missionen sollen nicht undurchdacht, sondern wirklich deep sein, praxisnah, mit Impact – und am Ende ein Resümee,
// das die Lehrperson sehen kann, damit man darüber reden kann.“
//
// Ablauf: Am Ende jeder Kurs-Stunde steht im Heft ein Ticket mit Code (und QR „ANNEXE:<code>“). Im Spiel: 🎟 → Code
// eingeben → Missionskarte → Haken (warum jetzt?) → Schritte an echten Orten (violetter Lichtstrahl, Pfeil unter den
// Füßen) → am Ort startet die Szene von selbst → Entscheidungen mit Folgen (auch in späteren Missionen) → Wendung →
// Abschluss → Resümee (Entscheidungen und Folgen, Skill, ein eigener Satz freiwillig, Frage für die Gruppe) → Belohnung.
// Lehrer-Ansicht: Code „LEHRER“ im selben Feld → alle Resümees auf diesem Gerät, Teilen (AirDrop, Mail) oder Kopieren.
//
// Skript einer Mission (missionen/hNN.js):
//   { start: [Zeilen], schritte: [{ ziel, ort, p: [x, z], leute: { crewId: [x, z, yaw, haltung] }, zeilen, wenn? }],
//     ende: [Zeilen], resuemee: { frage, satz } }
// Zeilen: ['wer', 'Text'] (wer: Crew-Id, 'du', 'e' = Erzähler, 'h:Name' = Nachricht aufs Handy, Stammgast-Id)
//   { wahl: [{ t, log?, folge?, skill?: true|false, setze?: { k: v }, dann?: [Zeilen] }], frage? }
//   { wenn: (f) => bool, dann: [Zeilen], sonst?: [Zeilen] } · { setze: { k: v } } · { moment: 'Wendung fürs Resümee' }
//   { notiz: 'Frage', platz? } (eigener Text, freiwillig) · { skala: 'Frage', links, rechts } (0–10) · { blende: 'Text' }
//   { notiz, platz, privat: true } (nur für die Person, z. B. Brief an mich) · { thermo: 'key', text?, voll? } (0–100; voll: true = hoch ist gut, z. B. Tank) · { erinnerung: 'CODE', sonst } (eigene frühere Mission)
// f = Merkzettel über alle Missionen (S.merke.kmf): Entscheidungen wirken in späteren Missionen weiter.
// Keine echten Namen, keine Familie des Spielers, Hilfe: 116 111 · 112 · BEE SECURE 8002 1234. Belohnungen nur verdient.
import * as THREE from 'three';
import INFO from './kurs-missionen.json';
import H00 from './missionen/h00.js';
import H01 from './missionen/h01.js';
import H02 from './missionen/h02.js';
import H03 from './missionen/h03.js';
import H04 from './missionen/h04.js';
import H05 from './missionen/h05.js';
import H06 from './missionen/h06.js';
import H07 from './missionen/h07.js';
import H08 from './missionen/h08.js';

export const SKRIPTE = { ...H00, ...H01, ...H02, ...H03, ...H04, ...H05, ...H06, ...H07, ...H08 };

// Die Leute aus den REAL-TALK-Heften (alle erfunden) – im Spiel treffen die Jugendlichen sie wieder.
export const KM_CREW = {
  finn: { name: 'Finn', farbe: '#e0784a', aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#efc9a6', haar: '#7a4a2a', oben: '#e0784a', unten: '#2d3748', schuhe: '#2b2b2b', hoehe: 1.72 } },
  lio: { name: 'Lio', farbe: '#2fb8a8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#b98561', haar: '#1b1410', oben: '#2fb8a8', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.7, frisur: 'locken' } },
  amira: { name: 'Amira', farbe: '#c0602a', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#d6a57f', haar: '#2b1d14', oben: '#c0602a', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.62 } },
  chloe: { name: 'Chloé', farbe: '#e85d75', aussehen: { modell: 'frauen', stil: 'Adventurer', haut: '#f6ddc8', haar: '#c9a15a', oben: '#e85d75', unten: '#3a3f4b', schuhe: '#2b2b2b', hoehe: 1.6 } },
  mia: { name: 'Mia', farbe: '#7a5af5', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f2d2b6', haar: '#5a3a24', oben: '#7a5af5', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.58 } },
  sara: { name: 'Sara', farbe: '#3fa66b', aussehen: { modell: 'frauen', stil: 'Punk', haut: '#c68e64', haar: '#1b1410', oben: '#3fa66b', unten: '#2b2b33', schuhe: '#2b2b2b', hoehe: 1.64 } },
  malik: { name: 'Malik', farbe: '#3f78b8', aussehen: { modell: 'menschen', stil: 'Casual', haut: '#9b6a45', haar: '#1b1410', oben: '#3f78b8', unten: '#2d3748', schuhe: '#e9b949', hoehe: 1.78, kopf: 'cap', kopfFarbe: '#2b2b33' } },
  jade: { name: 'Jade', farbe: '#d9a21b', aussehen: { modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#d9a21b', unten: '#3a3f4b', schuhe: '#f2f2f2', hoehe: 1.66 } },
  lenz: { name: 'Herr Lenz · Jugendhaus', farbe: '#2f4f45', erwachsen: true, aussehen: { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#6d6d6d', oben: '#2f4f45', unten: '#3a3f4b', schuhe: '#3a2a1c', hoehe: 1.8 } },
  brandt: { name: 'Frau Brandt · Trainerin', farbe: '#6b4e8a', erwachsen: true, aussehen: { modell: 'frauen', stil: 'Formal', haut: '#f0c9a8', haar: '#8a5a3a', oben: '#6b4e8a', unten: '#2f2f3a', schuhe: '#2b2b2b', hoehe: 1.66 } },
};

const zit = (t) => (/^[„("]/.test(String(t || '')) ? String(t) : '„' + t + '“');   // Antwort zitieren, ohne doppelte Anführungszeichen
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TANKNAME = { koerper: 'Körper', sicherheit: 'Sicherheit', dazu: 'Dazugehören', ernst: 'Ernst genommen', selbst: 'Selbst entscheiden', spass: 'Spaß und Neues', keiner: 'keiner leer' };
const VIOLETT = '#a77bff';
export const INFO_LISTE = Object.entries(INFO.hefte).flatMap(([heft, l]) => l.map((m, i) => ({ ...m, heft, nr: i + 1 })));
const infoVon = (code) => INFO_LISTE.find((m) => m.code === code);
// Code säubern: Groß, ohne Leerzeichen, „ANNEXE:“ vom QR weg, O/0 und Bindestrich großzügig
export function codeNorm(roh) {
  let c = String(roh || '').toUpperCase().replace(/^\s*ANNEXE\s*:\s*/, '').replace(/[\s_.]+/g, '').replace(/–|—/g, '-');
  if (c === 'LEHRER' || c === 'LEHRERIN' || c === 'LEHRPERSON') return 'LEHRER';
  const treffer = INFO_LISTE.find((m) => m.code === c || m.code.replace('-', '') === c.replace('-', '') || m.code.replace('-', '') === c.replace(/O/g, '0').replace('-', ''));
  return treffer ? treffer.code : null;
}

// alle Merker, die eine Mission selbst setzt (für einen sauberen Neustart)
function setzKeys(def) {
  const k = new Set();
  const lauf = (x) => { if (!x || typeof x !== 'object') return; if (Array.isArray(x)) { x.forEach(lauf); return; } if (x.setze) Object.keys(x.setze).forEach((n) => k.add(n)); for (const v of Object.values(x)) if (typeof v === 'object') lauf(v); };
  lauf(def); return k;
}

export function createKursMissionen({ scene, steuerung, ui, ton = () => {}, vib = () => {}, zustand, sichern, api }) {
  const M = () => { const S = zustand(); S.merke.km = S.merke.km || { frei: [], aktiv: null }; S.merke.kmf = S.merke.kmf || {}; return S.merke.km; };
  const F = () => (zustand().merke.kmf = zustand().merke.kmf || {});

  // ---------- Wegweiser: violetter Lichtstrahl, Ring, Symbol, Pfeil unter den Füßen ----------
  const mat = (o) => new THREE.MeshBasicMaterial({ color: VIOLETT, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false, ...o });
  const strahl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 30, 16, 1, true), mat({ opacity: 0.3 })); strahl.visible = false; scene.add(strahl);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.85, 40), mat({ opacity: 0.85 })); ring.rotation.x = -Math.PI / 2; ring.visible = false; scene.add(ring);
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g2 = cv.getContext('2d');
  g2.fillStyle = VIOLETT; g2.beginPath(); g2.arc(64, 64, 58, 0, 7); g2.fill(); g2.lineWidth = 8; g2.strokeStyle = '#fff'; g2.stroke();
  g2.font = '64px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.fillText('🎟', 64, 70);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const symbol = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, toneMapped: false })); symbol.scale.set(1.3, 1.3, 1); symbol.visible = false; symbol.renderOrder = 5; scene.add(symbol);
  const pf = new THREE.Shape(); pf.moveTo(0, 0.95); pf.lineTo(0.5, 0.25); pf.lineTo(0.18, 0.25); pf.lineTo(0.18, -0.45); pf.lineTo(-0.18, -0.45); pf.lineTo(-0.18, 0.25); pf.lineTo(-0.5, 0.25); pf.closePath();
  const pfeil = new THREE.Mesh(new THREE.ShapeGeometry(pf), mat({ opacity: 0.9 })); pfeil.geometry.rotateX(-Math.PI / 2); pfeil.visible = false; scene.add(pfeil);
  const hud = document.createElement('div'); hud.className = 'km-hud'; hud.hidden = true; document.body.appendChild(hud);
  const verstecken = () => { strahl.visible = ring.visible = symbol.visible = pfeil.visible = false; hud.hidden = true; };

  // ---------- Laufzeit ----------
  let lauf = null;   // { code, def, i, log: [], momente: [], notizen: [], skalen: [], t0, inSzene }
  const aktivDef = () => lauf && lauf.def;
  const schritt = () => lauf && lauf.def.schritte[lauf.i];
  function crewSetzen() {
    const st = schritt();
    api.crew(st ? st.leute || {} : {}, st && st.p);
  }
  function zeigeZiel() {
    const st = schritt(); if (!st) { verstecken(); return; }
    crewSetzen();
    if (!st.p) { verstecken(); lauf.warte = 1.2; return; }   // Szene ohne Ort (abends, am Handy): beginnt gleich
    const [x, z] = st.p;
    strahl.position.set(x, 15, z); ring.position.set(x, 0.07, z); symbol.position.set(x, 3.3, z);
    strahl.visible = ring.visible = symbol.visible = true;
  }
  // nächster gültiger Schritt (Schritte mit „wenn“ fallen weg, wenn es nicht passt)
  function weiterZu(i) {
    while (i < lauf.def.schritte.length && lauf.def.schritte[i].wenn && !lauf.def.schritte[i].wenn(F())) i++;
    lauf.i = i;
    const m = M(); m.aktiv = { code: lauf.code, i, log: lauf.log, momente: lauf.momente, notizen: lauf.notizen, skalen: lauf.skalen, t0: lauf.t0 };
    sichern();
    if (i >= lauf.def.schritte.length) { abschluss(); return; }
    zeigeZiel();
    const st = schritt(); ui.toast('<b>🎟 ' + esc(infoVon(lauf.code).titel) + ' · ' + (i + 1) + '/' + lauf.def.schritte.length + '</b><span>' + esc(st.ziel) + '</span>');
  }

  // Zeilen abspielen (siehe Kopf). ctx = laufende Mission.
  // {f:key} = Merkzettel-Wert (z. B. der gewählte Satz), {f:key|Ersatz} mit Ersatz, wenn leer
  const fx = (t) => String(t).replace(/\{f:(\w+)(?:\|([^}]*))?\}/g, (_, k, e) => F()[k] || e || '');
  const plus = (p) => { const f = F(); for (const [k, n] of Object.entries(p)) f[k] = Math.max(0, Math.min(100, (f[k] || 0) + n)); sichern(); };
  async function spiele(zeilen) {
    for (const z of zeilen || []) {
      if (Array.isArray(z)) { await api.sag(z[0], fx(z[1])); continue; }
      if (z.wahl) {
        const opt = z.wahl.filter((w) => !w.wenn || w.wenn(F()));
        const i = await ui.waehle(opt.map((w) => api.ersetze(fx(w.t))), z.frage ? api.ersetze(fx(z.frage)) : '');
        const w = opt[i]; vib(10);
        const besser = w.skill === false ? opt.find((o) => o.skill === true) : null;
        if (w.plus) plus(w.plus);
        if (w.privat) { if (w.setze) Object.assign(F(), w.setze); if (w.dann) await spiele(w.dann); continue; }   // nur für die Person selbst: nicht ins Resümee
        lauf.log.push({ t: api.ersetze(w.log || w.t), folge: w.folge ? api.ersetze(w.folge) : '', skill: w.skill === true ? 1 : w.skill === false ? 0 : null, besser: besser ? api.ersetze(besser.t) : '' });
        if (w.setze) Object.assign(F(), w.setze);
        sichern();
        if (w.dann) await spiele(w.dann);
        continue;
      }
      if (z.wenn) { await spiele(z.wenn(F()) ? z.dann : z.sonst || []); continue; }
      if (z.setze) { Object.assign(F(), z.setze); sichern(); continue; }
      if (z.plus) { plus(z.plus); continue; }
      if (z.thermo) { if (typeof lauf.thermo === 'number') lauf.thermo = { name: 'Druck', wert: lauf.thermo };
        const v = Math.max(0, Math.min(100, F()[z.thermo] || 0)), hoch = z.voll ? 'Grün' : 'Rot', tief = z.voll ? 'Rot' : 'Grün';
        const zone = v >= 70 ? hoch : v >= 30 ? 'Gelb' : tief, name = (z.text || 'Dein Druck').replace(/^Deine?\s+/, '').replace(/\s+jetzt$/, '');
        await api.sag('e', (z.voll ? '🔋 ' : '🌡️ ') + (z.text || 'Dein Druck') + ': ' + v + ' von 100 – ' + zone + '.');
        if (z.voll) lauf.thermo = { name, wert: lauf.thermo && lauf.thermo.voll ? Math.min(lauf.thermo.wert, v) : v, voll: true };
        else lauf.thermo = { name, wert: Math.max(lauf.thermo ? lauf.thermo.wert : 0, v) };
        continue; }
      if (z.erinnerung) {   // eigene frühere Mission: was die Person damals entschieden und geschrieben hat
        const e = (M().fertig || {})[z.erinnerung];
        if (!e) { await api.sag('e', api.ersetze(z.sonst || 'Hier war etwas. Du weißt nicht mehr genau, was.')); continue; }
        const gut = (e.entscheidungen || []).filter((x) => x.skill === 1), d = new Date(e.datum);
        const wann = isNaN(d) ? 'Damals' : 'Am ' + d.toLocaleDateString('de-LU', { day: 'numeric', month: 'long' });
        await api.sag('e', '📸 ' + wann + ' – „' + e.titel + '“: ' + (gut.length ? gut[0].t + '.' : (e.entscheidungen && e.entscheidungen[0] ? e.entscheidungen[0].t + '.' : 'Du warst dabei.')));
        if (e.satz) await api.sag('e', 'Dein Satz von damals: „' + e.satz + '“');
        lauf.momente.push('Erinnerung an „' + e.titel + '“' + (e.satz ? ' – „' + e.satz + '“' : ''));
        continue; }
      if (z.atem) { ui.dialogZu(); await api.atem(); continue; }
      if (z.moment) { lauf.momente.push(api.ersetze(z.moment)); continue; }
      if (z.blende) { await api.blende(api.ersetze(z.blende)); continue; }
      if (z.szene) {   // Mini-Spiel aus der Geschichte (satz, spuren, druck, atem …) – dieselben Prüfungen gegen Durchklicken
        const def = typeof z.def === 'function' ? z.def(F()) : z.def;
        const { r, versuche, ok } = api.szene ? await api.szene(z.szene, def) : { r: {}, versuche: 1, ok: true };
        const wert = !ok ? false : z.wertung ? z.wertung(r, F()) : null;
        if (z.log) lauf.log.push({ t: api.ersetze(fx(typeof z.log === 'function' ? z.log(r, F()) : z.log)), folge: z.folge ? api.ersetze(fx(typeof z.folge === 'function' ? z.folge(r, F()) : z.folge)) : '', skill: wert === true ? 1 : wert === false ? 0 : null, besser: wert === false && z.besser ? z.besser : '' });
        if (versuche > 1) lauf.momente.push((z.titel || 'Mini-Spiel') + ': ' + versuche + ' Versuche' + (ok ? ', dann geschafft' : ', noch nicht geschafft'));
        if (z.setze) Object.assign(F(), typeof z.setze === 'function' ? z.setze(r, F()) : z.setze);
        sichern();
        await spiele(wert === false ? z.schlecht || z.sonst || [] : z.gut || z.dann || []);
        continue; }
      if (z.notiz && z.privat) {   // nur für die Person selbst (z. B. Brief an mich): nicht ins Resümee, nicht in die Lehrer-Ansicht
        const t = await eingabe(z.notiz, z.platz || '', true);
        if (t) { const m = M(); m.briefe = m.briefe || {}; m.briefe[lauf.code] = { frage: z.notiz, text: t, datum: new Date().toISOString() }; sichern(); }
        continue; }
      if (z.notiz) { const t = await eingabe(fx(z.notiz), z.platz || '', false, z.heft); if (t) lauf.notizen.push({ frage: (z.heft ? '📓 ' : '') + fx(z.notiz), text: t }); if (z.key) { F()[z.key] = t; sichern(); } continue; }
      if (z.skala) { const v = await skala(z.skala, z.links || '0', z.rechts || '10'); lauf.skalen.push({ frage: z.skala, wert: v }); continue; }
    }
  }
  // Freitext (freiwillig) – als kleines Feld über dem Dialog
  function eingabe(frage, platz, privat = false, heft = '') {
    return new Promise((ok) => {
      ui.dialogZu();
      const k = ui.ebeneAuf('km', '<div class="km-eingabe' + (heft ? ' km-heftnotiz' : '') + '"><span class="km-kicker">' + (privat ? 'Nur für dich · kommt in kein Resümee, bleibt auf diesem Gerät' : heft ? '📓 Aus deinem REAL-TALK-Heft · ' + esc(heft) : 'Freiwillig · steht in deinem Resümee') + '</span><h3>' + esc(frage) + '</h3>' + (heft ? '<p class="km-heft-tipp">Schlag dein Heft auf und schau nach, was du dort geschrieben hast. Kein Heft dabei? Schreib, was du noch weißt.</p>' : '') + '<textarea rows="' + (privat ? 7 : 3) + '" maxlength="' + (privat ? 1500 : 240) + '" placeholder="' + esc(platz) + '"></textarea>' +
        '<div class="km-knoepfe"><button type="button" class="ly-btn" data-a="nein">Überspringen</button><button type="button" class="ly-btn ly-primaer" data-a="ja">Fertig</button></div></div>');
      const ta = k.querySelector('textarea'); setTimeout(() => ta.focus(), 60);
      const zu = (t) => { ui.ebeneZu(); ok(t); };
      k.querySelector('[data-a="ja"]').onclick = () => zu(ta.value.trim());
      k.querySelector('[data-a="nein"]').onclick = () => zu('');
    });
  }
  function skala(frage, links, rechts) {
    return new Promise((ok) => {
      ui.dialogZu();
      const k = ui.ebeneAuf('km', '<div class="km-eingabe"><span class="km-kicker">Ehrlich · steht in deinem Resümee</span><h3>' + esc(frage) + '</h3><div class="km-skala"><span>' + esc(links) + '</span><input type="range" min="0" max="10" step="1" value="5"><span>' + esc(rechts) + '</span></div><b class="km-wert">5</b>' +
        '<div class="km-knoepfe"><button type="button" class="ly-btn ly-primaer" data-a="ja">So ist es</button></div></div>');
      const r = k.querySelector('input'), w = k.querySelector('.km-wert');
      r.addEventListener('keydown', (e) => e.stopPropagation()); r.oninput = () => { w.textContent = r.value; };
      k.querySelector('[data-a="ja"]').onclick = () => { ui.ebeneZu(); ok(+r.value); };
    });
  }

  async function szene() {
    const st = schritt(); if (!st || lauf.inSzene) return;
    lauf.inSzene = true; verstecken();
    let ok = false;
    try { ok = await api.sitzung(async () => { await spiele(st.zeilen); }, st.leute && Object.keys(st.leute)[0]); } finally { if (lauf) lauf.inSzene = false; }
    if (!ok || !lauf) return;
    weiterZu(lauf.i + 1);
  }

  async function abschluss() {
    const L = lauf, info = infoVon(L.code);
    verstecken();
    if (L.def.ende && L.def.ende.length) { lauf.inSzene = true; try { await api.sitzung(() => spiele(L.def.ende)); } finally { lauf.inSzene = false; } }
    api.crew({});
    if (typeof L.thermo === 'number') L.thermo = { name: 'Druck', wert: L.thermo };
    const ja = L.log.filter((x) => x.skill === 1).length, von = L.log.filter((x) => x.skill != null).length;
    const eintrag = { code: L.code, titel: info.titel, skill: info.skill, heft: info.heft, nr: info.nr, ort: info.ort, datum: new Date().toISOString(), min: Math.max(1, Math.round((Date.now() - L.t0) / 60000)),
      entscheidungen: L.log, momente: L.momente, notizen: L.notizen, skalen: L.skalen.concat(L.thermo ? [{ frage: (L.thermo.voll ? 'Niedrigster Stand: ' : 'Höchster Stand: ') + L.thermo.name + ' (0–100 → hier geteilt durch 10)', wert: Math.round(L.thermo.wert / 10) }] : []), skillJa: ja, skillVon: von, frage: (L.def.resuemee || {}).frage || '', satz: '' };
    const m = M(); m.aktiv = null; m.fertig = m.fertig || {};
    const neu = !m.fertig[L.code];
    lauf = null;
    eintrag.satz = await resuemeeZeigen(eintrag, { eigenerSatz: (L.def.resuemee || {}).satz || 'Mein Satz zu dieser Mission:' });
    m.fertig[L.code] = eintrag; m.verlauf = (m.verlauf || []).concat([{ code: eintrag.code, datum: eintrag.datum }]).slice(-80);
    sichern();
    if (neu) api.belohnung(info);
  }

  // ---------- Resümee ----------
  const skillText = (e) => !e.skillVon ? 'In dieser Mission ging es vor allem ums Hinschauen.' :
    e.skillJa === e.skillVon ? 'Du hast den Skill jedes Mal angewendet (' + e.skillJa + ' von ' + e.skillVon + ').' :
    e.skillJa === 0 ? 'Diesmal hast du den Skill noch nicht eingesetzt. Das ist ein Anfang: Jetzt weißt du, wo er gefehlt hätte.' :
    'Du hast den Skill ' + e.skillJa + ' von ' + e.skillVon + ' Mal angewendet.';
  function resuemeeHtml(e, { mitFeld = false, name = '' } = {}) {
    const d = new Date(e.datum);
    const gut = e.entscheidungen.filter((x) => x.skill === 1), probier = e.entscheidungen.filter((x) => x.skill === 0 && x.besser);
    return '<div class="km-res"><div class="km-res-kopf"><span class="km-kicker">Resümee · REAL TALK #' + esc(e.heft) + ' · Stunde ' + e.nr + (name ? ' · ' + esc(name) : '') + '</span><h2>' + esc(e.titel) + '</h2>' +
      '<p class="km-skill">Skill: <b>' + esc(e.skill) + '</b> · ' + d.toLocaleDateString('de-LU') + ' · ' + e.min + ' Min.</p></div>' +
      '<section><h3>Was du entschieden hast – und was dann passiert ist</h3><ol class="km-ent">' + e.entscheidungen.map((x) => '<li class="' + (x.skill === 1 ? 'ja' : x.skill === 0 ? 'nein' : '') + '"><b>' + esc(x.t) + '</b>' + (x.folge ? '<span>→ ' + esc(x.folge) + '</span>' : '') + '</li>').join('') + '</ol></section>' +
      (e.momente.length ? '<section><h3>Die Wendung</h3><ul class="km-mom">' + e.momente.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul></section>' : '') +
      '<section class="km-sk"><h3>Dein Skill</h3><p>' + esc(skillText(e)) + '</p>' +
      (gut.length ? '<p><b>Das lief gut:</b> ' + gut.slice(0, 3).map((x) => esc(x.t)).join(' · ') + '</p>' : '') +
      (probier.length ? '<p><b>Nächstes Mal probieren:</b> ' + probier.slice(0, 2).map((x) => esc(x.besser)).join(' · ') + '</p>' : '') + '</section>' +
      (e.skalen.length ? '<section><h3>Deine Einschätzung</h3><ul class="km-mom">' + e.skalen.map((s) => '<li>' + esc(s.frage) + ' <b>' + s.wert + ' / 10</b></li>').join('') + '</ul></section>' : '') +
      (e.notizen.length ? '<section><h3>Deine Notizen</h3><ul class="km-mom">' + e.notizen.map((n) => '<li>' + esc(n.frage) + ' <i>„' + esc(n.text) + '“</i></li>').join('') + '</ul></section>' : '') +
      (mitFeld ? '<section><h3>Dein Satz (freiwillig)</h3><textarea class="km-satz" rows="2" maxlength="240" placeholder="' + esc(mitFeld) + '"></textarea></section>' : (e.satz ? '<section><h3>Dein Satz</h3><p class="km-zitat">„' + esc(e.satz) + '“</p></section>' : '')) +
      '<section class="km-gruppe"><h3>💬 Frage für die Gruppe</h3><p>' + esc(e.frage) + '</p></section></div>';
  }
  function resuemeeZeigen(e, { eigenerSatz }) {
    return new Promise((ok) => {
      ui.dialogZu();
      const k = ui.ebeneAuf('km', resuemeeHtml(e, { mitFeld: eigenerSatz, name: zustand().name }) +
        '<p class="km-hinweis">Gespeichert auf diesem Gerät. Deine Lehrperson kann es sich mit dir ansehen.</p><div class="km-knoepfe"><button type="button" class="ly-btn" data-a="teilen">Teilen</button><button type="button" class="ly-btn ly-primaer" data-a="ok">Fertig</button></div>');
      ton('melodie2');
      const satz = () => (k.querySelector('.km-satz') || {}).value || '';
      k.querySelector('[data-a="teilen"]').onclick = () => teilen([{ ...e, satz: satz().trim() }]);
      k.querySelector('[data-a="ok"]').onclick = () => { const s = satz().trim(); ui.ebeneZu(); ok(s); };
    });
  }
  const alsText = (e, name) => [
    'REAL TALK – Mission „' + e.titel + '“ (#' + e.heft + ', Stunde ' + e.nr + ')' + (name ? ' · ' + name : ''),
    'Skill: ' + e.skill + ' · ' + new Date(e.datum).toLocaleDateString('de-LU') + ' · ' + e.min + ' Min.',
    'Entscheidungen:', ...e.entscheidungen.map((x, i) => (i + 1) + '. ' + x.t + (x.folge ? ' → ' + x.folge : '') + (x.skill === 1 ? ' ✓' : '')),
    ...(e.momente.length ? ['Wendung: ' + e.momente.join(' ')] : []),
    skillText(e),
    ...(e.skalen.length ? e.skalen.map((s) => s.frage + ' ' + s.wert + '/10') : []),
    ...(e.notizen.length ? e.notizen.map((n) => n.frage + ' „' + n.text + '“') : []),
    ...(e.satz ? ['Mein Satz: „' + e.satz + '“'] : []),
    'Frage für die Gruppe: ' + e.frage,
  ].join('\n');
  // Geschichte @annexe.cam für die Lehrer-Ansicht: je Kapitel die eigenen Entscheidungen, wo es gehakt hat, eine Frage fürs Gespräch
  const bericht = () => (api.geschichteBericht ? api.geschichteBericht() : null);
  function geschichteHtml(b, lehrer) {
    if (!b || !b.kapitel.length) return '<h3 class="km-h3">📖 Geschichte „@annexe.cam“</h3><p class="km-leer">Noch kein Kapitel fertig.' + (b && b.laeuft ? ' Gerade in Kapitel ' + b.laeuft + '.' : '') + '</p>';
    const kopf = [b.freunde.length ? 'Am nächsten: ' + b.freunde.join(', ') : '', b.staerken.length ? 'Stärken: ' + b.staerken.join(', ') : '',
      b.ende ? 'Ende: ' + b.ende : (b.laeuft ? 'Gerade in Kapitel ' + b.laeuft : ''), b.zuZweit ? 'Zu zweit: ' + b.zuZweit : '', b.neben.length ? 'Nebengeschichten: ' + b.neben.length + ' von ' + b.nebenVon : ''].filter(Boolean);
    const gespielt = b.kapitel.filter((k) => k.gespielt), letztes = (gespielt[gespielt.length - 1] || b.kapitel[0]).kap;
    const haken = b.kapitel.reduce((n, k) => n + k.versuche.filter((v) => !v.ok).length, 0);
    return '<h3 class="km-h3">📖 Geschichte „@annexe.cam“ · ' + gespielt.length + ' von 10 Kapiteln</h3>' +
      (haken ? '<p class="km-gs-hak">⚠️ ' + haken + '× nach drei Versuchen nicht geschafft – unten markiert. Gut zum Nachbesprechen.</p>' : '') +
      (kopf.length ? '<p class="km-leer">' + kopf.map(esc).join(' · ') + '</p>' : '') +
      (lehrer ? '<p class="km-leer">Tipp: Ein Kapitel aufklappen, die Sätze gemeinsam lesen, dann die Frage stellen. Es gibt kein richtig oder falsch – nur Folgen.</p>' : '') +
      '<div class="km-gesch">' + b.kapitel.map((k) => '<details' + (k.kap === letztes ? ' open' : '') + '><summary><span class="km-heft">K' + k.kap + '</span><b>' + esc(k.titel) + '</b><small>' + esc(k.thema) + '</small></summary>' +
        (k.bilder && k.bilder.length ? '<div class="km-bilder">' + k.bilder.map((x) => '<figure' + (x.auch ? ' class="auch"' : '') + '><img src="' + esc(x.url) + '" alt="' + esc(x.titel) + '"><figcaption><b>' + esc(x.titel) + '</b>' + (x.text ? ' ' + esc(x.text) : '') + '</figcaption></figure>').join('') + '</div>' : '') +
        (k.saetze.length ? '<ul>' + k.saetze.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul>' : '<p class="km-leer">' + (k.gespielt ? 'Keine großen Entscheidungen gemerkt.' : 'Kapitel noch nicht gespielt – nur die Skills-Stunde.') + '</p>') +
        (k.partner && k.partner.length ? k.partner.map((p) => '<p class="km-gs-warum">👥 ' + (p.einig ? 'Einig: ' + esc(zit(p.gemeinsam)) : 'Uneinig (' + esc(zit(p.a)) + ' / ' + esc(zit(p.b)) + ') – gemeinsam: ' + esc(zit(p.gemeinsam))) + '</p>').join('') : '') +
        (k.gruende && k.gruende.length ? k.gruende.map((g) => '<p class="km-gs-warum">🧭 Warum ' + esc(zit(g.t)) + '? <b>' + esc(g.grund) + '</b></p>').join('') : '') +
        (k.anzeige ? '<p class="km-gs-zahl">📈 ' + esc(k.anzeige) + '</p>' : '') +
        (k.frei && k.frei.length ? k.frei.map((f) => '<p class="km-gs-warum">⏱ ' + esc(f.titel) + ': bei ' + esc(f.besucht.join(', ') || 'niemandem') + (f.verpasst.length ? ' · verpasst: ' + esc(f.verpasst.join(', ')) : '') + '</p>').join('') : '') +
        (k.blick && k.blick.length ? k.blick.map((b) => '<p class="km-gs-warum">👁 ' + esc(b.titel) + ': bemerkt ' + b.bemerkt + ' von ' + b.wichtig + ' wichtigen Signalen' + (b.uebersehen && b.uebersehen.length ? ' · übersehen: ' + esc(b.uebersehen.join(' ')) : '') + '</p>').join('') : '') +
        (k.tank && k.tank.length ? '<p class="km-gs-warum">⛽ Tank-Blick: ' + k.tank.map((t) => esc(t.wer) + ' – getippt ' + esc(TANKNAME[t.tipp] || t.tipp) + (t.richtig ? ' ✓' : ' (leer war: ' + esc(TANKNAME[t.leer] || t.leer) + ')')).join(' · ') + '</p>' : '') +
        (k.pult ? '<p class="km-gs-zahl">🔴 Rot-Modus: ' + (k.pult.rot ? k.pult.rot + '× auf Rot' : 'nie auf Rot') + (k.pult.hilfen && k.pult.hilfen.length ? ' · geholfen: ' + esc([...new Set(k.pult.hilfen)].map((h) => ({ atmen: 'Atmen', abstand: 'Abstand', gedanke: 'Gedanken prüfen' })[h] || h).join(', ')) : k.pult.rot ? ' · nichts dagegen getan' : '') + '</p>' : '') +
        (k.such && k.such.length ? '<p class="km-gs-warum">🔎 Suchbild: ' + k.such.map((x) => esc(x.frage) + ' – ' + x.gefunden + ' von ' + x.von + ' gefunden' + (x.falsch ? ', ' + x.falsch + '× falsch getippt' : '')).join(' · ') + '</p>' : '') +
        (k.verdacht ? '<p class="km-gs-warum">📌 Verdachts-Wand: getippt auf ' + esc(k.verdacht.wahl) + (k.verdacht.spuren ? ' · Spuren: ' + esc(k.verdacht.spuren) : '') + '</p>' : '') +
        (k.versuche.length ? '<p class="km-gs-hak">🔁 Hängen geblieben: ' + k.versuche.map(versuchText).map(esc).join(' · ') + '</p>' : '') +
        '<p class="km-gs-frage">💬 ' + esc(k.frage) + '</p></details>').join('') + '</div>';
  }
  const versuchText = (v) => v.t + ' (' + v.n + ' Versuche' + (v.ok ? ', dann geschafft' : ', noch nicht geschafft') + ')';
  const geschichteText = (b, name) => !b || !b.kapitel.length ? '' : [
    'Annexe – Geschichte „@annexe.cam“' + (name ? ' · ' + name : '') + ' · ' + b.kapitel.filter((k) => k.gespielt).length + ' von 10 Kapiteln',
    ...(b.freunde.length ? ['Am nächsten: ' + b.freunde.join(', ')] : []), ...(b.staerken.length ? ['Stärken: ' + b.staerken.join(', ')] : []),
    ...(b.ende ? ['Ende: ' + b.ende] : []),
    ...b.kapitel.flatMap((k) => ['', 'Kapitel ' + k.kap + ' „' + k.titel + '“ (' + k.thema + ')', ...k.saetze.map((t) => '– ' + t),
      ...(k.gespielt ? [] : ['(Kapitel noch nicht gespielt)']),
      ...((k.partner || []).map((p) => 'Zu zweit: ' + (p.einig ? 'einig – ' + zit(p.gemeinsam) : 'uneinig (' + zit(p.a) + ' / ' + zit(p.b) + '), gemeinsam: ' + zit(p.gemeinsam)))),
      ...((k.gruende || []).map((g) => 'Warum ' + zit(g.t) + '? ' + g.grund)),
      ...((k.frei || []).map((f) => f.titel + ': bei ' + (f.besucht.join(', ') || 'niemandem') + (f.verpasst.length ? ', verpasst: ' + f.verpasst.join(', ') : ''))),
      ...((k.blick || []).map((b) => 'Hinschauen (' + b.titel + '): ' + b.bemerkt + ' von ' + b.wichtig + ' bemerkt' + (b.uebersehen && b.uebersehen.length ? ', übersehen: ' + b.uebersehen.join(' ') : ''))),
      ...((k.tank || []).map((t) => 'Tank-Blick ' + t.wer + ': getippt ' + (TANKNAME[t.tipp] || t.tipp) + (t.richtig ? ' (stimmt)' : ', leer war ' + (TANKNAME[t.leer] || t.leer)))),
      ...(k.pult ? ['Rot-Modus: ' + (k.pult.rot ? k.pult.rot + '× Rot' : 'nie Rot') + (k.pult.hilfen && k.pult.hilfen.length ? ', geholfen: ' + [...new Set(k.pult.hilfen)].join(', ') : '')] : []),
      ...((k.such || []).map((x) => 'Suchbild: ' + x.frage + ' – ' + x.gefunden + ' von ' + x.von)),
      ...(k.verdacht ? ['Verdachts-Wand: ' + k.verdacht.wahl + (k.verdacht.spuren ? ' (Spuren: ' + k.verdacht.spuren + ')' : '')] : []),
      ...(k.anzeige ? [k.anzeige] : []), ...(k.versuche.length ? ['Hängen geblieben: ' + k.versuche.map(versuchText).join(' · ')] : []),
      'Frage: ' + k.frage]),
  ].join('\n');
  async function teilen(liste, { geschichte = false } = {}) {
    const name = zustand().name || '';
    const gt = geschichte ? geschichteText(bericht(), name) : '';
    const text = [gt, ...liste.map((e) => alsText(e, name))].filter(Boolean).join('\n\n———\n\n');
    if (!text) return;
    try { if (navigator.share) { await navigator.share({ title: 'REAL TALK – Resümee' + (name ? ' von ' + name : ''), text }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(text); ui.toast('<b>📋 Kopiert</b><span>Jetzt in eine Mail oder Nachricht einfügen.</span>'); }
    catch (e) { ui.toast('<b>Teilen geht hier nicht</b><span>Bitte die Lehrer-Ansicht zeigen.</span>'); }
  }

  // ---------- Missionen-Fenster: Code eingeben, Liste, Resümees ----------
  function fenster(meldung = '') {
    const m = M(), fertig = m.fertig || {};
    const frei = INFO_LISTE.filter((x) => m.frei.includes(x.code) || fertig[x.code]);
    const zeile = (x) => '<li class="' + (fertig[x.code] ? 'fertig' : m.aktiv && m.aktiv.code === x.code ? 'aktiv' : '') + '"><span class="km-heft">#' + x.heft + '·' + x.nr + '</span><div><b>' + esc(x.titel) + '</b><small>' + esc(x.skill) + ' · ' + esc(x.ort) + '</small></div>' +
      (fertig[x.code] ? '<button type="button" class="ly-btn" data-res="' + x.code + '">Resümee</button><button type="button" class="ly-btn" data-start="' + x.code + '">Nochmal</button>' : '<button type="button" class="ly-btn ly-primaer" data-start="' + x.code + '">' + (m.aktiv && m.aktiv.code === x.code ? 'Weiter' : 'Starten') + '</button>') + '</li>';
    const k = ui.ebeneAuf('km', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><div class="km-fenster"><span class="km-kicker">REAL TALK × Annexe</span><h2>🎟 Stunden und Missionen</h2>' +
      (api.stundenHtml ? api.stundenHtml() : '') +
      '<p class="km-leer">Den Code findest du am Ende jeder Stunde in deinem REAL-TALK-Heft.</p>' +
      '<form class="km-code"><input type="text" inputmode="text" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="z. B. TANK-6" maxlength="24" aria-label="Missions-Code"><button type="submit" class="ly-btn ly-primaer">Los</button></form>' +
      (meldung ? '<p class="km-meldung">' + meldung + '</p>' : '') +
      (lauf ? '<p class="km-laeuft">Läuft gerade: <b>' + esc(infoVon(lauf.code).titel) + '</b> – ' + esc((schritt() || {}).ziel || '') + ' <button type="button" class="ly-link" data-a="pause">pausieren</button></p>' : '') +
      (frei.length ? '<ul class="km-liste">' + frei.map(zeile).join('') + '</ul>' : '<p class="km-leer">Noch keine Mission freigeschaltet.</p>') +
      '<p class="km-fuss"><button type="button" class="ly-link" data-a="meine">Meine Resümees (' + (Object.keys(fertig).length + ((bericht() || { kapitel: [] }).kapitel.length ? 1 : 0)) + ')</button>' +
      (m.briefe && Object.keys(m.briefe).length ? ' · <button type="button" class="ly-link" data-a="brief">✉️ Postkarte an mich</button>' : '') + '</p></div>');
    const code = k.querySelector('form.km-code:not(.km-partner)'), inp = code.querySelector('input'); inp.addEventListener('keydown', (e) => e.stopPropagation()); setTimeout(() => inp.focus(), 80);   // gezielt das Code-Feld (die Stunden-Liste hat eigene Eingaben)
    k.querySelector('.ly-zu').onclick = () => ui.ebeneZu();
    code.onsubmit = (e) => { e.preventDefault(); codeRein(inp.value); };
    k.querySelectorAll('[data-start]').forEach((b) => { b.onclick = () => karte(b.dataset.start); });
    k.querySelectorAll('[data-res]').forEach((b) => { b.onclick = () => einzeln(fertig[b.dataset.res], () => fenster()); });
    const p = k.querySelector('[data-a="pause"]'); if (p) p.onclick = () => { pausieren(); fenster('Mission pausiert. Du kannst sie jederzeit weiterspielen.'); };
    k.querySelector('[data-a="meine"]').onclick = () => lehrerAnsicht(false);
    const br = k.querySelector('[data-a="brief"]'); if (br) br.onclick = () => brief();
    if (api.stundenBinden) api.stundenBinden(k, fenster);
  }
  // Postkarte an mich (ENDE-4, Speicher-Schlüssel bleibt „briefe“): nur für die Person, mit Datum; Löschen möglich
  function brief() {
    const m = M(), b = Object.values(m.briefe || {});
    const k = ui.ebeneAuf('km', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><div class="km-fenster"><span class="km-kicker">Nur für dich</span><h2>✉️ Postkarte an mich</h2>' +
      b.map((x) => '<p class="km-leer">Geschrieben am ' + new Date(x.datum).toLocaleDateString('de-LU') + '</p><p class="km-brief">' + esc(x.text).replace(/\n/g, '<br>') + '</p>').join('') +
      '<p class="km-fuss"><button type="button" class="ly-link" data-a="weg">Postkarte löschen</button> · <button type="button" class="ly-link" data-a="zurueck">Zurück</button></p></div>');
    k.querySelector('.ly-zu').onclick = () => ui.ebeneZu();
    k.querySelector('[data-a="zurueck"]').onclick = () => fenster();
    k.querySelector('[data-a="weg"]').onclick = () => { m.briefe = {}; sichern(); fenster('Postkarte gelöscht.'); };
  }
  function codeRein(roh) {
    const c = codeNorm(roh);
    if (c === 'LEHRER') { lehrerAnsicht(true); return; }
    { const roh2 = String(roh || '').trim().toUpperCase().replace(/\s+/g, '').replace('Ç', 'C'); const r = api.stundenCode && api.stundenCode(roh2); if (r) { ton('pling'); fenster(r); return; } }   // Stunden-Codes (Unterricht, Skills)
    if (!c) { ton('click'); fenster('Diesen Code kenne ich nicht. Schau noch mal ins Heft – zum Beispiel <b>TANK-6</b>.'); return; }
    const m = M(); if (!m.frei.includes(c)) { m.frei.push(c); sichern(); ton('pling'); }
    karte(c);
  }
  // Missionskarte: Titel, Skill, Ort, Haken, Belohnung
  function karte(code) {
    const x = infoVon(code), def = SKRIPTE[code];
    if (!x) return fenster();
    const k = ui.ebeneAuf('km', '<div class="km-karte"><span class="km-kicker">Mission · REAL TALK #' + x.heft + ' · Stunde ' + x.nr + '</span><h2>' + esc(x.titel) + '</h2>' +
      '<p class="km-kurz">' + esc(x.kurz) + '</p><ul class="km-fakten"><li>📍 ' + esc(x.ort) + '</li><li>🧠 Skill: ' + esc(x.skill) + '</li><li>🎁 ' + esc(x.belohnung) + '</li><li>⏱ etwa ' + (def ? Math.max(8, def.schritte.length * 3) : 10) + ' Minuten</li></ul>' +
      (def ? '' : '<p class="km-meldung">Diese Mission ist noch in Arbeit.</p>') +
      '<div class="km-knoepfe"><button type="button" class="ly-btn" data-a="zurueck">Später</button>' + (def ? '<button type="button" class="ly-btn ly-primaer" data-a="los">Mission starten</button>' : '') + '</div></div>');
    k.querySelector('[data-a="zurueck"]').onclick = () => fenster();
    const los = k.querySelector('[data-a="los"]'); if (los) los.onclick = () => { ui.ebeneZu(); start(code); };
  }
  function pausieren() { if (!lauf) return; lauf = null; verstecken(); api.crew({}); sichern(); }
  async function start(code) {
    const def = SKRIPTE[code]; if (!def) return;
    if (lauf && lauf.code !== code) pausieren();
    const m = M();
    const alt = m.aktiv && m.aktiv.code === code ? m.aktiv : null;
    lauf = alt ? { code, def, i: alt.i, log: alt.log || [], momente: alt.momente || [], notizen: alt.notizen || [], skalen: alt.skalen || [], t0: alt.t0 || Date.now() }
      : { code, def, i: 0, log: [], momente: [], notizen: [], skalen: [], t0: Date.now() };
    if (!m.frei.includes(code)) m.frei.push(code);
    if (!alt) { const f = F(); for (const k of setzKeys(def)) delete f[k]; }   // neu gespielt: eigene Merker von vorn (die anderer Missionen bleiben)
    ton('pling');
    if (!alt && def.start && def.start.length) { lauf.inSzene = true; try { await api.sitzung(() => spiele(def.start)); } finally { lauf.inSzene = false; } }
    if (!lauf) return;
    weiterZu(lauf.i);
  }

  // ---------- Lehrer-Ansicht (Code LEHRER) und „Meine Resümees“ ----------
  function lehrerAnsicht(lehrer) {
    const m = M(), alle = Object.values(m.fertig || {}).sort((a, b) => (a.datum < b.datum ? 1 : -1)), name = zustand().name || '', gb = bericht(), mitG = !!(gb && gb.kapitel.length);
    const k = ui.ebeneAuf('km', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><div class="km-fenster"><span class="km-kicker">' + (lehrer ? 'Für die Lehrperson' : 'Für dich') + '</span><h2>' + (lehrer ? 'Resümees von ' + esc(name || 'diesem Gerät') : 'Meine Resümees') + '</h2>' +
      (lehrer ? '<p class="km-leer">Alles bleibt auf diesem Gerät. „Alle teilen“ öffnet AirDrop, Mail oder Nachrichten. Gut fürs Gespräch: erst die Entscheidungen ansehen, dann die Frage für die Gruppe.</p>' : '') +
      geschichteHtml(gb, lehrer) + '<h3 class="km-h3">🎟 Missionen</h3>' +
      (alle.length ? '<ul class="km-liste">' + alle.map((e) => '<li class="fertig"><span class="km-heft">#' + e.heft + '·' + e.nr + '</span><div><b>' + esc(e.titel) + '</b><small>' + new Date(e.datum).toLocaleDateString('de-LU') + ' · Skill ' + e.skillJa + '/' + e.skillVon + (e.satz ? ' · „' + esc(e.satz.slice(0, 40)) + (e.satz.length > 40 ? '…' : '') + '“' : '') + '</small></div><button type="button" class="ly-btn" data-res="' + e.code + '">Ansehen</button></li>').join('') + '</ul>' : '<p class="km-leer">Noch keine Mission abgeschlossen.</p>') +
      '<div class="km-knoepfe">' + (alle.length || mitG ? '<button type="button" class="ly-btn" data-a="teilen">Alle teilen</button>' : '') + '<button type="button" class="ly-btn ly-primaer" data-a="zurueck">Zurück</button></div></div>');
    k.querySelector('.ly-zu').onclick = () => ui.ebeneZu();
    k.querySelector('[data-a="zurueck"]').onclick = () => fenster();
    const t = k.querySelector('[data-a="teilen"]'); if (t) t.onclick = () => teilen(alle, { geschichte: true });
    k.querySelectorAll('[data-res]').forEach((b) => { b.onclick = () => einzeln(m.fertig[b.dataset.res], () => lehrerAnsicht(lehrer)); });
  }
  function einzeln(e, zurueck) {
    if (!e) return;
    const k = ui.ebeneAuf('km', resuemeeHtml(e, { name: zustand().name }) + '<div class="km-knoepfe"><button type="button" class="ly-btn" data-a="teilen">Teilen</button><button type="button" class="ly-btn ly-primaer" data-a="zurueck">Zurück</button></div>');
    k.querySelector('[data-a="teilen"]').onclick = () => teilen([e]);
    k.querySelector('[data-a="zurueck"]').onclick = zurueck;
  }

  // ---------- jedes Bild: Ziel anzeigen, am Ort die Szene starten ----------
  let anzeigeUhr = 0;
  function tick(dt, { sichtbar = true } = {}) {
    if (!lauf || lauf.inSzene) return;
    const st = schritt(); if (!st) return;
    if (!sichtbar) { verstecken(); return; }
    if (!st.p) { lauf.warte = (lauf.warte || 0) - dt; if (lauf.warte <= 0) szene(); return; }
    const p = steuerung.pos, [x, z] = st.p, dx = x - p.x, dz = z - p.z, d = Math.hypot(dx, dz);
    strahl.visible = ring.visible = symbol.visible = true;
    pfeil.visible = d > 5; pfeil.position.set(p.x, (p.y || 0) + 0.1, p.z); pfeil.rotation.y = Math.atan2(dx, dz);
    ring.scale.setScalar(1 + Math.sin(performance.now() / 260) * 0.08); symbol.position.y = 3.3 + Math.sin(performance.now() / 400) * 0.15;
    anzeigeUhr -= dt;
    if (anzeigeUhr <= 0) {
      anzeigeUhr = 0.25;
      const a = document.querySelector('.ly-auftrag'), r = a && a.offsetParent ? a.getBoundingClientRect() : null;
      hud.style.top = (r && r.height ? Math.round(r.bottom + 46) : 54) + 'px'; hud.hidden = false;
      hud.textContent = '🎟 ' + infoVon(lauf.code).titel + ' · ' + (lauf.i + 1) + '/' + lauf.def.schritte.length + ': ' + st.ort + (d > 3 ? ' · ' + Math.round(d) + ' m' : '');
    }
    if (d < 2.6 && Math.abs(p.y || 0) < 1.5) szene();
  }
  // beim Laden: eine angefangene Mission weiterführen (Schritt von vorn)
  function fortsetzen() {
    const m = M(); if (!m.aktiv || lauf) return;
    const def = SKRIPTE[m.aktiv.code]; if (!def) { m.aktiv = null; return; }
    lauf = { code: m.aktiv.code, def, i: m.aktiv.i, log: m.aktiv.log || [], momente: m.aktiv.momente || [], notizen: m.aktiv.notizen || [], skalen: m.aktiv.skalen || [], t0: m.aktiv.t0 || Date.now() };
    if (lauf.i >= def.schritte.length) { abschluss(); return; }
    zeigeZiel();
  }
  return { skripte: SKRIPTE, fenster, codeRein, start, tick, pausieren, fortsetzen, aktiv: () => !!lauf, imSzene: () => !!(lauf && lauf.inSzene), get lauf() { return lauf; }, teilen, resuemeeHtml, alsText };
}
