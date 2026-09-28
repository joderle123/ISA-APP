// Mission QUELLE „Leck im Nest“ (j1-e04, konzept/WERKZEUG-QUESTS.md Nr. 1, BAUPLAN §2.1 C): spielt die Schritte, die im
// Innenraum „Nest“ liegen (Quest-Vorlage 'auftrag', fertig über flags.e04.*), und zeichnet die kleinen Bilder der Szenen.
// Alles andere (Ablauf, Texte) steht in content/quests/j1-e04.js und content/dialogues/e04-*.js.
//   leck      2 Planken von der Werkbank zum Leck tragen (Tragen: hingehen liefert ab, „Absetzen“ legt sie zurück), 1 Kiste mit dem Haken aus der Strömung ziehen
//             (Aktion HALTEN, zu früh loslassen = sie treibt weiter), lose Diele → Logbuchseite 2 (chronik.logbuch)
//   spuren    Hängematte (Schlaf, kleines Glas – „Flicken“ ist die Falle: Tun „Danke. Trotzdem.“), Winde (Anerkennung,
//             hohes Glas), Crew-Liste an der Tür (Dazugehören) → je eine Karte mit Tuns Dose (Höhe = wichtig, Füllung = voll)
//   fotowand  Bauplatz bauen (Nest-Aktion „Bauen“), dann „Bild aufhängen“ → Tun bekommt Farbe, Teil-Farbwelle am Nest
//   dachboden Bauplatz bauen, dann am Kartentisch „Route wählen“: „Ich wähle.“ ändert nichts („Klar. Wie immer.“),
//             „Jolie wählt.“ → Marker auf der Karte (nest.route), Jolies Glas steigt ein Stück (nicht voll)
//   Szenen:   e04-ilda-blick zeigt Ildas zwei Laternengläser · nach e04-tun erscheinen Tuns Dosen über ihm ·
//             e04-crewglas zeigt das große Glas mit Muscheln OHNE Namen (die eigene Muschel wird nirgends gespeichert)
//   Blitz-Motor: werft:gebaut {id:'blitzmotor'} → flags.e04.motor (Tun mault danach in e04-winde); Glas/Riss: systems/nest
// Der Lehrsatz („wichtig und leer …“) steht nur auf der Rückseite des Aufnähers, hier NIE.
// Spielstand: flags.e04.{ leck, planken, kiste, spuren, spur.<id>, haengematte, motor, fotowand, dachboden } · chronik.logbuch[]
// Ereignisse: quelle:planke {n} · quelle:kiste {ok} · quelle:logbuch {seite} · quelle:spur {id, flicken} · quelle:bild {npc}
//   · quelle:route {wer} · quelle:muschel {} (ohne Wert: nichts über die Wahl verlässt die Szene)
//   game.quelle → { step(), info(), take(), stopfen(), haken(), diele(), spur(id, { flicken }), bild(), route(wer) }
//   Debug: LUMO.debug.quelle.{ info(), take(), stopfen(), haken(sec), diele(), spur(id, flicken), bild(), route(wer) }
import * as THREE from 'three';
import { vesselSVG } from '../abilities/gefaesse.js';
import { esc } from '../../ui/overlay.js';

const UNIT = 'j1-e04';
const ROOM = 'nest';
// Orte im Nest (lokal, wie SPOTS in systems/nest/plugin.js: Ursprung Bodenmitte, +z zur Tür)
const P = {
  stapel: [-1.9, 0, -5.1], stapelAct: [-1.9, 0, -4.0],
  luke: [-3.1, 0, 3.4], lukeAct: [-3.0, 0, 1.9],
  kisteAblage: [-1.4, 0, 2.2],
  diele: [3.3, 0, 0.3],
  liste: [-2.3, 1.7, 5.8], listeAct: [-2.3, 0, 4.5],
};
const HAKEN_SEK = 0.9;
const KISTE_MATERIAL = { metall: 2, holz: 2, tau: 1 };
const NESTSCHRITTE = ['leck', 'spuren', 'fotowand', 'dachboden'];

const CSS = `
.q4-panel{position:absolute;left:50%;top:calc(96px + var(--safe-t,0px));transform:translateX(-50%) translateY(-8px);z-index:9;pointer-events:none;opacity:0;transition:opacity .35s ease,transform .35s ease;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 16px 8px;border-radius:22px;background:rgba(18,12,36,.62);backdrop-filter:blur(6px);color:#fff}
.q4-panel.is-in{opacity:1;transform:translateX(-50%)}
.q4-panel small{font:800 13px/1.1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;opacity:.8}
.q4-row{display:flex;gap:14px;align-items:flex-end}
.q4-row svg{width:52px;height:118px;display:block}
.q4-glas{position:relative;width:170px;height:200px}
.q4-glas svg{width:170px;height:200px;display:block}
.q4-shell{transition:transform .9s cubic-bezier(.3,1.4,.5,1),opacity .4s ease}
.q4-glas.is-glow .q4-rim{filter:drop-shadow(0 0 10px #ffd166)}
.q4-card{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center}
.q4-card .q4-ves svg{width:64px;height:146px;display:block}
.q4-card h3{margin:0 0 6px;font-size:calc(22px * var(--txt-scale,1));font-weight:900}
.q4-card p{margin:0 0 6px;font-size:calc(18px * var(--txt-scale,1));font-weight:700;line-height:1.3}
.q4-card .q4-need{display:inline-block;margin-top:4px;padding:4px 10px;border-radius:999px;font-weight:900;font-size:calc(15px * var(--txt-scale,1));color:#1d1330}
.q4-log{border-left:6px solid #ffd166;padding:6px 0 6px 14px;border-radius:4px}
.q4-log p{margin:0;font-size:calc(24px * var(--txt-scale,1));font-weight:900;line-height:1.25}
.q4-log small{display:block;margin-top:8px;opacity:.75;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
`;

export default {
  id: 'quelle', order: 67.5, deps: ['nest', 'quests', 'dialogue'],
  install(game) {
    const { events, state, content, ui, audio, player, interactions, particles } = game;
    const scenes = game.scenes;
    const nest = game.nest;
    const M = game.props.materials;
    const { part, merge } = game.geom;
    const emit = (n, p) => events.emit(n, p);
    const F = (k) => state.get('flags.e04.' + k);
    const setF = (k, v = true) => state.set('flags.e04.' + k, v);
    const save = () => { if (game.save && game.save.request) game.save.request('force'); };
    const sound = (id) => { if (audio && (!audio.has || audio.has(id))) audio.play(id); };
    const G = (k) => { const g = content.get('glimm', 'glimm'); const l = g && g.quelle && g.quelle[k]; return l && l.length ? l[0] : null; };
    const glimm = (k, sec = 3) => { const t = G(k); if (t && ui.glimm) ui.glimm(t, { seconds: sec }); };
    const dsl = () => game.dsl || (game.quests && game.quests.dsl);
    const effects = (list) => { const d = dsl(); return d && game.quests && game.quests.ctx ? game.quests.ctx.applyEffects(list) : Promise.resolve(); };
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.quelle = '1'; st.textContent = CSS; document.head.appendChild(st); }

    // ---- Wo steht die Mission? ----
    const step = () => { const q = game.quests; if (!q || q.active !== UNIT) return null; const i = q.stepInfo(UNIT); return i && i.step && !i.kurz ? i.step.id : null; };
    const stepIndex = (id) => { const d = content.get('quests', UNIT); return d ? d.steps.findIndex((s) => s.id === id) : -1; };
    const reached = (id) => { const s = step(); return !!s && stepIndex(s) >= stepIndex(id); };
    const inside = () => !!(nest && nest.isInside);
    const pocket = () => (scenes && scenes.pocket) || null;
    const W = (l) => { const p = pocket(); return p ? { x: p.x + l[0], y: p.y + (l[1] || 0), z: p.z + l[2] } : null; };

    // ================= Innen: Wasser, Planken, Kiste, Diele, Zeiger =================
    let grp = null, water = null, stapel = [], flicken = [], kiste = null, diele = null, zeiger = null, its = [];
    const hook = { phase: 'aus', k: 0, drift: 0 };
    const mk = (geos, mat, name) => { const m = new THREE.Mesh(merge(geos), mat); m.name = name; m.castShadow = true; m.receiveShadow = true; return m; };
    const plankGeo = () => [part(new THREE.BoxGeometry(0.26, 0.07, 1.6), { color: '#b98a5a', faceVar: 0.12, seed: 7 }), part(new THREE.BoxGeometry(0.27, 0.075, 0.05), { pos: [0, 0, 0.6], color: '#6e4a2e' })];
    function build() {
      const r = scenes ? scenes.room(ROOM) : null;
      if (!r || grp) return !!grp;
      grp = new THREE.Group(); grp.name = 'quelle-nest'; r.group.add(grp);
      // Wasser auf dem Boden (steigt, solange das Leck offen ist)
      water = new THREE.Mesh(new THREE.PlaneGeometry(13.4, 11.4), new THREE.MeshBasicMaterial({ color: '#3fa6e0', transparent: true, opacity: 0.55, depthWrite: false }));
      water.rotation.x = -Math.PI / 2; water.name = 'quelle-wasser'; water.renderOrder = 2; grp.add(water);
      // zwei Planken an der Werkbank
      for (let i = 0; i < 2; i++) { const m = mk(plankGeo(), M.base, 'quelle-planke-' + i); m.position.set(P.stapel[0] + i * 0.34, 0.8, P.stapel[2]); m.rotation.x = -1.2; grp.add(m); stapel.push(m); }
      // Flicken über dem Leck (erscheinen je gebrachter Planke)
      for (let i = 0; i < 2; i++) { const m = mk(plankGeo(), M.base, 'quelle-flicken-' + i); m.position.set(P.luke[0] - 0.35 + i * 0.7, 0.26, P.luke[2]); m.rotation.y = Math.PI / 2 + (i ? 0.08 : -0.06); m.scale.set(1, 1, 1.35); grp.add(m); flicken.push(m); }
      // Kiste in der Strömung der Luke
      kiste = mk([
        part(new THREE.BoxGeometry(0.7, 0.55, 0.7), { color: '#a8743f', faceVar: 0.12, seed: 4 }),
        part(new THREE.BoxGeometry(0.72, 0.08, 0.72), { pos: [0, 0.16, 0], color: '#5a3a20' }),
        part(new THREE.BoxGeometry(0.24, 0.24, 0.02), { pos: [0, 0.03, 0.36], color: '#f2c14e' }),
      ], M.base, 'quelle-kiste');
      grp.add(kiste);
      // lose Diele (leuchtende Kante)
      diele = new THREE.Group(); diele.name = 'quelle-diele';
      diele.add(mk([part(new THREE.BoxGeometry(0.34, 0.05, 1.3), { color: '#9c6b45', faceVar: 0.1 })], M.base, 'quelle-diele-brett'));
      const edge = mk([part(new THREE.BoxGeometry(0.38, 0.02, 1.34), { pos: [0, -0.02, 0], color: '#ffd166' })], M.glow('#ffd166', { intensity: 0.8, veil: false }), 'quelle-diele-licht'); edge.castShadow = false; diele.add(edge);
      diele.position.set(P.diele[0], 0.2, P.diele[2]); grp.add(diele);
      // Zeiger: schwebender Kristall über dem nächsten Ziel im Raum (die Ziel-Zeile ist drinnen aus)
      zeiger = mk([part(new THREE.OctahedronGeometry(0.2, 0), { color: '#ffd166' })], M.glow('#ffd166', { intensity: 1, veil: false }), 'quelle-zeiger'); zeiger.castShadow = false; grp.add(zeiger);
      return true;
    }

    // Was ist gerade dran? → Ziel (lokal) für den Zeiger
    function ziel() {
      const s = step();
      if (s === 'leck') {
        if (F('leck')) return null;
        const n = F('planken') || 0;
        if (n < 2) return player.carrying && player.carrying.id === 'planke' ? P.lukeAct : P.stapel;
        if (!F('kiste')) return P.luke;
        return P.diele;
      }
      if (s === 'spuren') {
        if (!F('spur.haengematte')) return nest.SPOTS.haengematte.act;
        if (!F('spur.winde')) return nest.SPOTS.winde.at;
        if (!F('spur.liste')) return P.liste;
        return null;
      }
      if (s === 'fotowand') return nest.SPOTS.fotowand.at;
      if (s === 'dachboden') return nest.slots.state('dachboden') === 'gebaut' ? nest.SPOTS.karte.at : nest.SPOTS.dachboden.act;
      return null;
    }

    function sync() {
      if (!inside() || !build()) return;
      const s = step();
      const leck = s === 'leck' && !F('leck');
      const n = F('planken') || 0;
      water.visible = leck;
      stapel.forEach((m, i) => { m.visible = leck && i >= n; });
      flicken.forEach((m, i) => { m.visible = (s === 'leck' || reached('spuren') || game.quests.status(UNIT) === 'fertig') && i < n; });
      kiste.visible = (leck && n >= 2) || (!!F('kiste') && (reached('leck') || game.quests.status(UNIT) === 'fertig'));
      if (F('kiste') && hook.phase !== 'ziehen') { kiste.position.set(P.kisteAblage[0], 0.28, P.kisteAblage[2]); kiste.rotation.set(0, 0.4, 0); }
      diele.visible = leck && !!F('kiste');
      if (leck && n >= 2 && !F('kiste') && hook.phase === 'aus') hook.phase = 'treibt';
      addIts();
    }

    function addIts() {
      for (const it of its) it.remove();
      its = [];
      if (!inside()) return;
      const add = (id, l, label, onAction, r = 1.6) => { const w = W(l); its.push(interactions.add({ id: 'quelle-' + id, x: w.x, z: w.z, radius: r, label, priority: 3, onAction })); };
      const s = step();
      if (s === 'leck' && !F('leck')) {
        const n = F('planken') || 0;
        // Beim Tragen heißt die Aktion „Absetzen“ (actors/moves): abgeliefert wird wie beim Tragen-Schritt durch Hingehen
        if (n < 2) { if (!player.carrying) add('planke', P.stapelAct, 'Planke nehmen', () => api.take()); }
        else if (!F('kiste')) add('haken', P.lukeAct, 'Haken', () => api.haken(), 2.0);
        else add('diele', [P.diele[0] - 0.9, 0, P.diele[2]], 'Diele heben', () => api.diele(), 1.6);
      }
      if (s === 'spuren' && !F('spur.liste')) add('liste', P.listeAct, 'Crew-Liste', () => api.spur('liste'), 1.3);
      if (s === 'fotowand' && nest.slots.state('fotowand') === 'gebaut' && !F('fotowand')) add('bild', nest.SPOTS.fotowand.act, 'Bild aufhängen', () => api.bild(), 2.0);
      if (s === 'dachboden' && nest.slots.state('dachboden') === 'gebaut' && !F('dachboden')) add('route', nest.SPOTS.karte.act, 'Route wählen', () => api.route(), 1.9);
    }

    let t = 0, dripT = 0;
    game.addUpdate((dt) => {
      if (!grp || !inside()) return;
      t += dt;
      const s = step();
      // Zeiger
      const z = ziel();
      zeiger.visible = !!z && !ui.overlay.count;
      if (z) { zeiger.position.set(z[0], 2.3 + Math.sin(t * 3) * 0.12, z[2]); zeiger.rotation.y = t * 1.6; }
      if (s !== 'leck' || F('leck')) { if (water.visible) sync(); return; }
      const n = F('planken') || 0;
      // Planke am Leck: abliefern durch Hingehen (wie die Vorlage 'tragen')
      if (player.carrying && player.carrying.id === 'planke') { const w = W(P.lukeAct); if (w && Math.hypot(player.position.x - w.x, player.position.z - w.z) < 1.9) api.stopfen(); }
      water.position.y = 0.06 + 0.12 * (1 - n / 2) + Math.sin(t * 1.3) * 0.006;
      // Leck sprudelt, solange Planken fehlen
      dripT -= dt;
      if (n < 2 && dripT <= 0 && particles) { dripT = 0.18; const w = W(P.luke); particles.emit({ x: w.x + (Math.random() - 0.5) * 0.8, y: w.y + 0.25, z: w.z + (Math.random() - 0.5) * 0.6, count: 6, spread: 0.2, up: 2.4, speed: 1.2, color: '#bfe8ff', size: 0.12, life: 0.7, gravity: -6, drag: 0.8, alpha: 0.8 }); }
      // Kiste in der Strömung / am Haken
      if (hook.phase === 'treibt') {
        const a = t * 0.8 + hook.drift;
        kiste.position.set(P.luke[0] + Math.sin(a) * 0.7, 0.2 + Math.sin(t * 2.2) * 0.05, P.luke[2] + Math.cos(a * 1.3) * 0.45);
        kiste.rotation.set(Math.sin(t) * 0.1, a * 0.6, Math.cos(t * 1.2) * 0.08);
      } else if (hook.phase === 'ziehen') {
        if (!player.intent.actionHeld) { hakenFehl(); return; }
        hook.k = Math.min(1, hook.k + dt / HAKEN_SEK);
        const k = hook.k * hook.k;
        kiste.position.set(P.luke[0] + (P.kisteAblage[0] - P.luke[0]) * k, 0.2 + Math.sin(hook.k * Math.PI) * 0.5, P.luke[2] + (P.kisteAblage[2] - P.luke[2]) * k);
        if (Math.random() < dt * 5) sound('click');
        if (hook.k >= 1) hakenFertig();
      }
    }, { order: 12.6 });

    function hakenFehl() {
      hook.phase = 'treibt'; hook.k = 0; hook.drift += 1.9;
      sound('splash');
      glimm('zuFrueh', 2);
      emit('quelle:kiste', { ok: false });
    }
    function hakenFertig() {
      hook.phase = 'aus';
      setF('kiste');
      const m = { ...(state.get('bergen.material') || {}) };
      for (const [k, v] of Object.entries(KISTE_MATERIAL)) m[k] = (Number(m[k]) || 0) + v;
      state.set('bergen.material', m);
      sound('pickup');
      if (ui.toast) ui.toast('Treibgut: Metall, Holz, Tau.', 2600);
      emit('quelle:kiste', { ok: true });
      setTimeout(() => glimm('diele'), 900);
      sync(); save();
    }

    // ---- Karten (Overlays) ----
    const need = (id) => (content.get('beduerfnisse', 'beduerfnisse') || { liste: [] }).liste.find((b) => b.id === id) || { name: id, color: '#fff' };
    const hasGlas = () => (state.get('upgrades', []) || []).includes('blick.tanks');
    const dose = (npc, id) => { const g = nest.glaeser.list(npc).find((x) => x.id === id); const def = content.get('npcs', npc) || {}; return g ? vesselSVG(g, (def.glaeser && def.glaeser.form) || 'glas') : ''; };
    function karte({ id, title, icon, html, buttons = [{ key: 'ok', label: 'Weiter', icon: 'check' }] }) {
      return new Promise((resolve) => {
        let res = 'zu';
        const h = ui.overlay.open({
          id, title, icon, kind: 'panel', pause: true,
          content: (body) => {
            body.innerHTML = `${html}<div class="ov-actions">${buttons.map((b) => `<button class="btn ${b.primary === false ? '' : 'btn-primary'} btn-big" type="button" data-q4="${esc(b.key)}">${ui.icon(b.icon || 'check', { size: 24 })}<span>${esc(b.label)}</span></button>`).join('')}</div>`;
            body.querySelectorAll('[data-q4]').forEach((b) => b.addEventListener('click', () => { res = b.dataset.q4; sound('tile'); h.close('ok'); }));
          },
          onClose: () => resolve(res),
        });
      });
    }

    // ---- Spuren (Tuns drei Dosen) ----
    const SPUR = {
      haengematte: { need: 'schlaf', title: 'Die Hängematte', lines: ['Zerrissen. Tun schläft auf dem Boden.'] },
      winde: { need: 'anerkennung', title: 'Die Winde', lines: ['Neues Tau. Frisch geölt. Ein T im Holz.', 'Gemerkt hat es keiner.'] },
      liste: { need: 'dazugehoeren', title: 'Die Crew-Liste', lines: ['Jolie. Ilda. Und ein leerer Streifen.'] },
    };
    async function spur(id, { flicken: doFlicken = null } = {}) {
      const S = SPUR[id];
      if (!S) return false;
      const b = need(S.need);
      const kannFlicken = id === 'haengematte' && !F('haengematte');
      const html = () => `<div class="q4-card">${hasGlas() ? `<div class="q4-ves" data-ves>${dose('tun', S.need)}</div>` : '<div></div>'}<div>${S.lines.map((l) => `<p>${esc(l)}</p>`).join('')}${hasGlas() ? `<span class="q4-need" style="background:${esc(b.color)}">${esc(b.name)}</span>` : ''}</div></div>`;
      const buttons = kannFlicken ? [{ key: 'flicken', label: 'Flicken', icon: 'hammer' }, { key: 'ok', label: 'Lassen', icon: 'weiter', primary: false }] : undefined;
      let r;
      if (doFlicken !== null && typeof document === 'undefined') r = doFlicken ? 'flicken' : 'ok';
      else {
        const p = karte({ id: 'e04-spur', title: S.title, icon: id === 'liste' ? 'team' : id === 'winde' ? 'seil' : 'haengematte', html: html(), buttons });
        if (doFlicken !== null) setTimeout(() => { const el = document.querySelector(`[data-overlay="e04-spur"] [data-q4="${doFlicken && kannFlicken ? 'flicken' : 'ok'}"]`); if (el) el.click(); }, 60);
        r = await p;
      }
      const neu = !F('spur.' + id);
      setF('spur.' + id);
      if (r === 'flicken' && kannFlicken) {
        // Die Falle: ein kleines Glas wird voll – Tun bleibt grau
        setF('haengematte');
        nest.glaeser.add('tun', 'schlaf', 0.6, { grund: 'haengematte' });
        sound('unlock');
        emit('quelle:spur', { id, flicken: true });
        await ui.say({ who: 'tun', text: 'Danke. Trotzdem.' });
        glimm('haengematte');
      } else emit('quelle:spur', { id, flicken: false });
      if (neu && ['haengematte', 'winde', 'liste'].every((k) => F('spur.' + k)) && step() === 'spuren' && !F('spuren')) {
        setF('spuren');
        glimm('spurenFertig', 3.4);
        setTimeout(() => glimm('raus'), 3800);
      }
      sync(); save();
      return true;
    }
    events.on('nest:station', (e) => {
      if (!e || e.handled || game.quests.status(UNIT) !== 'aktiv') return;
      if (e.id === 'haengematte' && reached('spuren') && (step() === 'spuren' || !F('haengematte'))) { e.handled = true; spur('haengematte'); }
      else if (e.id === 'winde' && step() === 'spuren') { e.handled = true; spur('winde'); }
      else if (e.id === 'fotowand' && step() === 'fotowand' && !F('fotowand')) { e.handled = true; api.bild(); }
      else if (e.id === 'karte' && step() === 'dachboden' && nest.slots.state('dachboden') === 'gebaut' && !F('dachboden')) { e.handled = true; api.route(); }
    });

    // ================= Kleine Bilder der Szenen (DOM über dem Spiel, ohne Klick) =================
    let panel = null;
    function showPanel(html, cls = '') {
      if (typeof document === 'undefined' || !ui.root) return null;
      hidePanel();
      panel = document.createElement('div'); panel.className = 'q4-panel ' + cls; panel.dataset.q4panel = cls || '1'; panel.innerHTML = html;
      ui.root.appendChild(panel);
      requestAnimationFrame(() => panel && panel.classList.add('is-in'));
      return panel;
    }
    function hidePanel() { if (panel) { panel.remove(); panel = null; } }
    // Ildas zwei Laternengläser: hoch und halb voll, klein und leer (keine Namen, keine Zahlen)
    const zweiGlaeser = () => `<small>Welches fehlt mehr?</small><div class="q4-row">${vesselSVG({ id: 'a', wichtig: 1, voll: 0.5, color: '#ffd166' }, 'laternenglas')}${vesselSVG({ id: 'b', wichtig: 0.25, voll: 0, color: '#ffd166' }, 'laternenglas')}</div>`;
    // Crew-Glas: großes Glas, Muscheln fallen hinein – ohne Namen, ohne Zähler
    const MUSCHEL_POS = [[62, 150], [104, 156], [84, 138], [120, 134], [50, 128], [92, 118], [70, 108]];
    let muscheln = [];
    const crewGlas = (glow) => `<small>Was brauchen wir hier alle?</small><div class="q4-glas${glow ? ' is-glow' : ''}"><svg viewBox="0 0 170 200" aria-hidden="true">
      <path class="q4-rim" d="M28 20 L142 20 L136 176 Q134 190 118 190 L52 190 Q36 190 34 176 Z" fill="rgba(191,232,255,.14)" stroke="#bfe8ff" stroke-width="3"/>
      ${muscheln.map((c, i) => { const [x, y] = MUSCHEL_POS[i % MUSCHEL_POS.length]; return `<g class="q4-shell" transform="translate(${x} ${y})"><path d="M-12 6c0-10 5-14 12-14s12 4 12 14z" fill="${esc(c)}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/><path d="M0 -8v14M-6 -5l2 11M6 -5l-2 11" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/></g>`; }).join('')}
      ${glow ? '<ellipse cx="85" cy="150" rx="52" ry="26" fill="rgba(255,209,102,.25)"/>' : ''}</svg></div>`;
    events.on('dialogue:node', (e) => {
      if (!e) return;
      if (e.id === 'e04-ilda-blick') {
        if (e.node === 'b') showPanel(zweiGlaeser(), 'q4-ilda');
        else if (e.node === 'd') hidePanel();
      } else if (e.id === 'e04-crewglas') {
        if (e.node === 'a') { muscheln = []; showPanel(crewGlas(false), 'q4-crew'); }
        else if (e.node === 'b' && muscheln.length === 0) {
          // drei Muscheln der Crew – Farbe = ihr größtes Loch, aber kein Name dran
          muscheln = ['tun', 'jolie', 'ilda'].map((n) => { const id = nest.glaeser.luecke(n); return need(id || 'dazugehoeren').color; });
          sound('tile'); showPanel(crewGlas(false), 'q4-crew');
        } else if (e.node === 'g') { showPanel(crewGlas(true), 'q4-crew'); sound('chime'); }
      }
    });
    events.on('dialogue:choice', (e) => {
      if (!e || e.id !== 'e04-crewglas' || !e.choice) return;
      if (e.choice.muschel) { muscheln.push(need(e.choice.muschel).color); sound('pickup'); showPanel(crewGlas(false), 'q4-crew'); emit('quelle:muschel', {}); }
    });
    events.on('dialogue:close', (e) => {
      if (!e) return;
      if (e.id === 'e04-ilda-blick' || e.id === 'e04-crewglas') hidePanel();
      // Nach Tuns Szene: seine Dosen über ihm (Blick „Gläser“) – gezeigt, nicht erklärt
      if (e.id === 'e04-tun' && e.reason === 'end' && hasGlas()) { const B = game.abilities && game.abilities.blick; if (B && B.glaeser) B.glaeser.show('tun', { seconds: 7 }); }
    });
    events.on('dialogue:end', (e) => {
      if (!e || e.reason !== 'end') return;
      if (e.id === 'e04-ilda-blick') setTimeout(() => glimm('blickTipp', 3.4), 1200);
      if (e.id === 'e04-blitzmotor') setTimeout(() => glimm('motor'), 900);
    });

    // ---- Blitz-Motor (Werft baut; Glas + Riss macht systems/nest) ----
    events.on('werft:gebaut', (e) => { if (e && e.id === 'blitzmotor') { setF('motor'); save(); } });

    // ---- Raum betreten/verlassen, Schritte ----
    events.on('nest:enter', () => {
      sync();
      const s = step();
      if (!s || !NESTSCHRITTE.includes(s)) return;
      const line = s === 'leck' ? 'leck' : s === 'spuren' ? 'spuren' : s === 'fotowand' ? (nest.slots.state('fotowand') === 'gebaut' ? null : 'bauen') : (nest.slots.state('dachboden') === 'gebaut' ? 'karte' : 'oben');
      if (line) setTimeout(() => glimm(line), 700);
    });
    events.on('nest:exit', () => {
      for (const it of its) it.remove(); its = [];
      if (hook.phase === 'ziehen') hook.phase = 'treibt';
      if (player.carrying && player.carrying.id === 'planke' && player.drop) player.drop();
    });
    events.on('nest:gebaut', () => sync());
    events.on('carry:drop', (e) => { if (e && e.id === 'planke') setTimeout(sync, 0); });   // „Absetzen“: Planke liegt wieder am Stapel
    events.on('quest:step', (e) => { if (e && e.id === UNIT) sync(); });
    events.on('quest:step:done', (e) => { if (e && e.id === UNIT) save(); });
    events.on('state:reset', () => { hidePanel(); hook.phase = 'aus'; sync(); });
    events.on('save:load', () => { hook.phase = 'aus'; sync(); });

    // ================= API (Interaktionen rufen dieselben Funktionen) =================
    const api = {
      step, reached, ziel, sync,
      info: () => ({ step: step(), planken: F('planken') || 0, kiste: !!F('kiste'), leck: !!F('leck'), hook: hook.phase, spuren: ['haengematte', 'winde', 'liste'].filter((k) => F('spur.' + k)), haengematte: !!F('haengematte'), motor: !!F('motor'), fotowand: !!F('fotowand'), dachboden: !!F('dachboden'), route: nest.route.get(), logbuch: (state.get('chronik.logbuch', []) || []).slice(), inside: inside(), its: its.map((i) => i.label), water: !!(water && water.visible), panel: panel ? panel.dataset.q4panel : null }),
      take() {
        if (step() !== 'leck' || F('leck') || (F('planken') || 0) >= 2 || player.carrying) return false;
        const m = new THREE.Group(); m.name = 'quelle-planke-trage';
        const pl = mk(plankGeo(), M.base, 'quelle-planke-trage-brett'); pl.rotation.y = Math.PI / 2; pl.position.y = -0.1; m.add(pl);   // quer vor der Brust
        player.carry({ id: 'planke', mesh: m, slosh: 0, kind: 'planke' });
        sound('greifen');
        sync();
        return true;
      },
      stopfen() {
        if (!(player.carrying && player.carrying.id === 'planke')) return false;
        player.drop({ place: false });
        const n = (F('planken') || 0) + 1;
        setF('planken', n);
        sound('hammer'); sound('tile');
        emit('quelle:planke', { n });
        const w = W(P.luke);
        if (particles && w) particles.emit({ x: w.x, y: w.y + 0.4, z: w.z, count: 18, spread: 0.6, up: 1.8, speed: 1.6, color: '#ffd166', size: 0.12, life: 0.8, gravity: -3, drag: 1.2, additive: true });
        if (n === 1) glimm('planke');
        else { hook.phase = 'treibt'; setTimeout(() => glimm('kiste'), 700); }
        sync(); save();
        return true;
      },
      // Haken: die Aktion muss GEHALTEN werden (player.intent.actionHeld), sonst treibt die Kiste weiter
      haken() {
        if (step() !== 'leck' || (F('planken') || 0) < 2 || F('kiste') || hook.phase === 'ziehen') return false;
        hook.phase = 'ziehen'; hook.k = 0;
        sound('greifen');
        return true;
      },
      async diele() {
        if (step() !== 'leck' || !F('kiste') || F('leck')) return false;
        sound('unlock');
        state.addUnique('chronik.logbuch', 2);
        emit('quelle:logbuch', { seite: 2 });
        const html = `<div class="q4-log"><p>${esc('Jhemp hat drei Nächte nicht geschlafen.')}</p><small>Unter einer losen Diele</small></div>`;
        if (typeof document !== 'undefined') await karte({ id: 'e04-logbuch', title: 'Logbuchseite 2', icon: 'buch', html });
        setF('leck');
        glimm('logbuch');
        setTimeout(() => glimm('raus'), 3400);
        sync(); save();
        return true;
      },
      spur,
      async bild() {
        if (step() !== 'fotowand' || F('fotowand')) return false;
        if (nest.slots.state('fotowand') !== 'gebaut') return false;
        nest.fotowand.hang('tun');
        setF('fotowand');
        nest.glaeser.add('tun', 'anerkennung', 0.2, { grund: 'fotowand' });
        emit('quelle:bild', { npc: 'tun' });
        await effects([{ emotion: { npc: 'tun', primary: ['freude', 6] } }, { veil: { zone: 'nest', to: 0.35, from: { site: 'bootshaus' } } }]);
        sound('chime');
        await ui.say({ who: 'tun', text: 'Ich? An der Wand? … Okay. Cool.' });
        glimm('bild');
        setTimeout(() => glimm('raus'), 3000);
        sync(); save();
        return true;
      },
      // Kartentisch: Wer wählt die nächste Route? Nur „Jolie wählt.“ hebt ihr Glas – „Ich wähle.“ ist kein Fehler, nur „wie immer“
      async route(wer = null) {
        if (step() !== 'dachboden' || F('dachboden') || nest.slots.state('dachboden') !== 'gebaut') return false;
        let r = wer;
        if (!r && typeof document !== 'undefined') {
          r = await karte({ id: 'e04-karte', title: 'Die nächste Route', icon: 'karte', html: '<div class="q4-card"><div></div><div><p>Die Karte ist leer.</p><p>Wer wählt?</p></div></div>', buttons: [{ key: 'ich', label: 'Ich wähle.', icon: 'hand' }, { key: 'jolie', label: 'Jolie wählt.', icon: 'karte' }] });
        }
        if (r !== 'ich' && r !== 'jolie') return false;
        emit('quelle:route', { wer: r });
        if (r === 'ich') { await ui.say({ who: 'jolie', text: 'Klar. Wie immer.' }); return 'ich'; }
        nest.route.set('lagune');
        nest.glaeser.add('jolie', 'mitbestimmen', 0.35, { grund: 'route' });
        setF('dachboden');
        sound('chime');
        await ui.say({ who: 'jolie', text: 'Die Lagune. Da war ich noch nie.' });
        glimm('route');
        setTimeout(() => glimm('raus'), 3000);
        sync(); save();
        return 'jolie';
      },
    };
    game.quelle = api;

    const D = game.debug || (game.debug = {});
    D.quelle = {
      info: api.info, take: api.take, stopfen: api.stopfen, diele: api.diele, bild: api.bild, route: (w) => api.route(w || 'jolie'),
      spur: (id, fl) => api.spur(id, { flicken: fl === undefined ? null : !!fl }),   // ohne fl: Karte bleibt offen
      // Haken mit gehaltener Aktion (Spielzeit vorspulen); sec < 0,9 = zu früh losgelassen
      haken(sec = 1.2) { if (!api.haken()) return api.info(); if (!game.input) return api.info(); game.input.press('action'); for (let s = 0; s < sec; s += 0.05) game.debug.advance(0.05); game.input.release('action'); game.debug.advance(0.1); return api.info(); },
    };
    return api;
  },
};
