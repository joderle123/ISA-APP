// RESPAWN – Spielmodus „Ein Jahr auf der Insel, dann nochmal“ (12.11.2026). Läuft nur mit game.gameMode === 'respawn'
// (dist/respawn.html oder ?mode=respawn); die LUMO-Insel selbst bleibt unverändert.
// Ablauf: Start → Karten ziehen → vier Jahreszeiten (Situationen aus daten/, ein freier Nachmittag je Jahreszeit) →
// Finale → Ausgang und Akte → nochmal mit anderen Karten.
// Gespeichert nur auf dem Gerät: respawn.meta (Album, Runden, Einstellungen) und respawn.lauf (laufende Runde).
// Kein Kursbezug: keine Codes, keine Übungen, keine Bewertung. Ereignisse für Tests: respawn:start, respawn:karten,
// respawn:frei, respawn:weiter, respawn:ende (auslösen) · respawn:wahl, respawn:wirkung, respawn:stand (hören).
import { createOberflaeche } from './oberflaeche.js';
import { createBuehne } from './buehne.js';
import { SITUATIONEN, AUSGAENGE, AKTE, AKTE_LEER, FREIZEIT, FREIZEIT_JE } from './daten/index.js';
import { neuerLauf, zieheKarten, planeJahreszeit, jahreszeitWechsel, jahreszeit, ausgangFuer, akteFuer, wirke, bond, JAHRESZEIT_NAME } from './run.js';

const META = 'respawn.meta', LAUF = 'respawn.lauf';
const lies = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
const schreib = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* voll oder privat */ } };
const zufall = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

export default {
  id: 'respawn', order: 92, deps: ['ui', 'npcs'],
  install(game) {
    if (game.gameMode !== 'respawn') return null;
    const { events, ui } = game;
    const test = game.params.has('test');
    document.getElementById('lumo-root').classList.add('mode-respawn');
    const O = createOberflaeche({ game });
    const B = createBuehne({ game, O });
    const meta = { v: 1, ausgaenge: {}, runden: 0, sanft: false, ...lies(META, {}) };
    if (game.params.has('sanft')) meta.sanft = game.params.get('sanft') !== '0';
    let R = null, laeuft = false;
    const sit = (id) => SITUATIONEN.find((s) => s.id === id);
    const sichern = () => { schreib(LAUF, R && !R.fertig ? R : null); events.emit('respawn:stand', R); };

    // Die Insel ist in diesem Modus überall farbig; der Grauschleier gehört zur LUMO-Geschichte
    const bunt = () => { const veil = game.world && game.world.veil; if (veil && veil.setZone) for (const Z of game.world.island.ZONES) veil.setZone(Z.id, 0); };

    // Ansprechen außerhalb einer Situation: ein kurzer Satz je nach Bindung
    events.on('npc:talk', (e) => {
      if (!e || e.handled) return;
      e.handled = true;
      if (B.aktiv || !R) return;
      const b = bond(R, e.id), n = e.npc;
      const text = b >= 3 ? 'Hey. Gut, dich zu sehen.' : b >= 1 ? 'Moien. Alles klar?' : b < 0 ? 'Was willst du?' : 'Moien.';
      ui.say({ who: e.id, text, anchor: n && n.group ? n.group : null, wait: false, lock: false, seconds: 2.2 });
    });

    function weiterKnopf(text) {
      return new Promise((resolve) => {
        if (test) { resolve(); return; }
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'rs-naechst hud-interactive'; b.textContent = text + ' ▸';
        document.getElementById('hud').appendChild(b);
        const zu = () => { ab(); b.remove(); resolve(); };
        const ab = events.on('respawn:weiter', zu);
        b.addEventListener('click', zu);
      });
    }

    async function freierNachmittag() {
      const ids = FREIZEIT_JE[jahreszeit(R)] || [];
      const angebote = ids.map((id) => FREIZEIT.find((f) => f.id === id)).filter(Boolean);
      if (!angebote.length) return;
      const id = await O.freizeit(angebote, R);
      const f = angebote.find((a) => a.id === id) || angebote[0];
      await B.zeige(f.ort, f.uhr, f.satz);
      O.wirkung(wirke(R, f.e(R)), R);
      R.log.push({ frei: f.id });
      R.frei = true;
    }

    async function runde() {
      if (laeuft) return;
      laeuft = true;
      O.status(R);
      O.setzeHandy(() => O.handy(R, meta));
      while (R.jz < 4) {
        if (!R.plan.length) {
          const rng = zufall(R.seed * 7919 + R.jz * 104729 + 13);
          if (R.jz > 0) O.wirkung(jahreszeitWechsel(R), R);
          R.plan = planeJahreszeit(R, SITUATIONEN, rng);
          R.schritt = 0; R.frei = false;
          sichern();
          await O.titelkarte(JAHRESZEIT_NAME[jahreszeit(R)], 'Kapitel ' + (R.jz + 1) + ' von 4');
        }
        while (R.schritt < R.plan.length) {
          if (!R.frei && R.schritt === Math.min(1, R.plan.length - 1) && R.plan.length > 1) { await freierNachmittag(); sichern(); }
          const s = sit(R.plan[R.schritt]);
          if (s) {
            R.sanft = !!meta.sanft;
            if (R.schritt > 0 || R.jz > 0) await weiterKnopf('Weiter: ' + s.titel);
            await O.titelkarte(s.titel, JAHRESZEIT_NAME[jahreszeit(R)]);
            await B.spiele(s, R);
            R.gespielt.push(s.id);
          }
          R.schritt += 1;
          O.status(R);
          sichern();
        }
        R.jz += 1; R.plan = []; R.schritt = 0;
        sichern();
      }
      await ende();
      laeuft = false;
    }

    async function ende() {
      const a = ausgangFuer(R, AUSGAENGE);
      R.fertig = true; R.ausgang = a.id;
      const neu = !meta.ausgaenge[a.id];
      meta.ausgaenge[a.id] = (meta.ausgaenge[a.id] || 0) + 1;
      meta.runden += 1;
      schreib(META, meta); schreib(LAUF, null);
      const andere = R.gespielt.map(sit).filter((s) => s && s.andere).map((s) => {
        const wer = typeof s.andere.wer === 'function' ? s.andere.wer(R) : s.andere.wer;
        return { name: game.npcs.get(wer) ? game.npcs.nameOf(wer) : ({ kontrolle: 'Der Kontrolleur', geselle: 'Marc' }[wer] || wer), titel: s.titel, zeilen: s.andere.zeilen };
      });
      events.emit('respawn:ausgang', { id: a.id, neu, akte: R.akte.slice(), R });
      O.status(null);
      await O.abschluss({ ausgang: a, akte: akteFuer(R, AKTE), leer: AKTE_LEER, andere, meta, neu });
      R = null;
      hauptmenue();
    }

    async function neueRunde(vorgabe) {
      const seed = (Date.now() ^ (meta.runden * 2654435761)) >>> 0;
      const rng = zufall(seed);
      const karten = vorgabe || await O.kartenZiehen({ ziehe: () => zieheKarten(rng) });
      R = neuerLauf({ seed: seed % 100000, karten });
      sichern();
      await runde();
    }

    async function hauptmenue() {
      bunt();
      const gespeichert = lies(LAUF, null);
      const was = await O.start({ meta, laufend: !!(gespeichert && !gespeichert.fertig) });
      if (was === 'aussehen') {
        if (ui.stil && ui.stil.open) { ui.stil.open({ first: !game.avatar.isSet }); const ab = events.on('ui:overlay', (e) => { if (e && !e.open) { ab(); setTimeout(hauptmenue, 200); } }); }
        else hauptmenue();
        return;
      }
      if (was === 'weiter' && gespeichert) { R = gespeichert; await runde(); return; }
      await neueRunde(typeof was === 'object' ? was : null);
    }

    const los = () => setTimeout(hauptmenue, test ? 0 : 600);
    if (game.started) los(); else events.on('game:start', los);

    return {
      get lauf() { return R; }, get meta() { return meta; },
      situationen: SITUATIONEN, ausgaenge: AUSGAENGE,
      neueRunde, hauptmenue,
      // Tests/Debug: eine einzelne Situation mit einem vorbereiteten Lauf spielen
      async probe(id, { karten, vor } = {}) {
        R = neuerLauf({ seed: 1, karten: karten || { kopf: 'zuendschnur', zuhause: 'oma', tasche: 'ok' } });
        if (vor) vor(R);
        O.status(R);
        await B.spiele(sit(id), R);
        return R;
      },
    };
  },
};
