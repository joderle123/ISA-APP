// UI-Plugin (WP21): baut Overlays, Sprechblasen, Auswahl-Kacheln, Einstellungen, Tagebuch, Recap und Lagerfeuer
// zusammen und hängt sie an game.ui:
//   ui.overlay (open/close/confirm) · ui.bubbles (say/glimm) · ui.choices (ask) · ui.settings (get/set/render)
//   ui.journal (registerPage/open/close) · ui.recap.show(...) · ui.campfire.show(...) · ui.icon(name) · ui.pauseMenu.open()
//   Kurzformen: ui.say(opts) · ui.ask(opts) · ui.glimm(text) · ui.lock.acquire('grund') / release('grund') (Spieler steht)
//   ui.demo.dialog() / recap() / campfire() – Beispiele für Tests und Screenshots
// Sicherheit (DESIGN §19): jedes Overlay hat ein X; Esc/Pause schließt das oberste Fenster, sonst öffnet es die Pause.
// Ereignisse: siehe die Module. Menü-Kompatibilität: ui.openMenu/closeMenu/toggleMenu/menuOpen laufen über die Pause.
import { createOverlays } from './overlay.js';
import { createBubbles } from './bubbles.js';
import { createChoices } from './choices.js';
import { createSettings } from './a11y.js';
import { createJournal } from './journal/index.js';
import { installDefaultPages } from './journal/pages.js';
import { createRecap } from './recap.js';
import { createCampfire } from './campfire.js';
import { icon, ICONS, EMOTION_ICON, EMOTION_COLOR } from './icons.js';

export default {
  id: 'ui', order: 60, deps: ['audio'],
  install(game) {
    const { events, audio, state, player, ui } = game;
    const root = ui.root;
    const speech = game.speech || null;

    // Spieler-Sperre mit Gründen (Blase, Kacheln, Szene …) – frei, sobald kein Grund mehr übrig ist
    const reasons = new Set();
    const lock = {
      acquire(r) { reasons.add(r); player.setEnabled(false); if (game.input) game.input.releaseAll(); },
      release(r) { reasons.delete(r); if (!reasons.size) player.setEnabled(true); },
      get active() { return reasons.size > 0; },
      get reasons() { return [...reasons]; },
    };

    const overlay = createOverlays({ root, events, game, audio, icon });
    const settings = createSettings({ game, state, events, speech, audio, icon });
    const bubbles = createBubbles({ root, events, game, speech, audio, icon, lock });
    const choices = createChoices({ root, events, game, speech, audio, icon, lock });
    const journal = createJournal({ overlay, game, events, audio, icon });
    installDefaultPages(journal, { game, settings, audio, icon, speech });
    const recap = createRecap({ overlay, speech, audio, icon });
    const campfire = createCampfire({ overlay, speech, audio, icon, game, speakers: bubbles.speaker });

    // ---- Pause-Menü (immer erreichbar; Hängematte/Sicherer Ort laut §19 über die Pause) ----
    const pauseMenu = {
      open(page) {
        if (page && page !== 'main') return journal.open(page === 'hilfe' ? 'steuerung' : page === 'avatar' ? 'stil' : page === 'wochencode' ? 'code' : page);
        if (overlay.isOpen('pause')) return overlay.get('pause');
        const hasOrt = !!(state && state.get('upgrades', []).includes('ruhe.kopf'));
        const h = overlay.open({
          id: 'pause', title: 'Pause', icon: 'pause', kind: 'panel', pause: true, cls: 'ov-pause',
          content: `<div class="menu-grid">
              <button class="menu-btn is-primary" type="button" data-go="weiter">${icon('play', { size: 26 })}<span>Weiter spielen</span></button>
              <button class="menu-btn" type="button" data-go="tagebuch">${icon('buch', { size: 26 })}<span>Tagebuch</span></button>
              <button class="menu-btn" type="button" data-go="ort">${icon('haengematte', { size: 26 })}<span>${hasOrt ? 'Sicherer Ort' : 'Hängematte'}</span></button>
              <button class="menu-btn" type="button" data-go="einstellungen">${icon('zahnrad', { size: 26 })}<span>Einstellungen</span></button>
              <button class="menu-btn" type="button" data-go="schluss">${icon('feuer', { size: 26 })}<span>Für heute Schluss</span></button>
            </div>`,
          onClose: () => events.emit('ui:menu', { open: false }),
        });
        events.emit('ui:menu', { open: true, page: 'main' });
        h.el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
          audio.play('tile');
          const g = b.dataset.go;
          if (g === 'weiter') overlay.close('pause', 'weiter');
          else if (g === 'tagebuch') { overlay.close('pause', 'tagebuch'); journal.open(); }
          else if (g === 'einstellungen') { overlay.close('pause', 'tagebuch'); journal.open('einstellungen'); }
          else if (g === 'ort') {
            overlay.close('pause', 'ort');
            events.emit('safeplace:open', { kind: hasOrt ? 'sichererOrt' : 'haengematte' });   // WP33/WP40 übernehmen
            if (!game.plugins.baumhaus && !game.plugins.puls) bubbles.glimm('Hängematte. Kommt bald.', { seconds: 2.6 });
          } else if (g === 'schluss') {
            overlay.close('pause', 'schluss');
            events.emit('session:end', { via: 'pause' });                                      // WP42 übernimmt
            if (!game.plugins.session) api.demo.campfire();
          }
        }));
        return h;
      },
      close() { overlay.close('pause', 'close'); },
      get isOpen() { return overlay.isOpen('pause'); },
    };
    // Kompatibilität mit hud.js (openMenu/closeMenu/toggleMenu/menuOpen, registerMenuPage) und Tests
    ui.pauseMenu = pauseMenu;
    ui.onMenuKey = () => {
      if (!ui.visible) return;
      if (overlay.count) { audio.play('close'); overlay.close(undefined, 'esc'); }
      else if (choices.open) { /* Kacheln bleiben: Rückzug ist die Wahl */ }
      else pauseMenu.open();
    };
    ui.registerMenuPage = (page) => journal.registerPage({ id: page.id, label: page.label, icon: typeof page.icon === 'string' && ICONS.includes(page.icon) ? page.icon : 'punkt', order: page.order || 85, render: (el, ctx) => page.render(el, ctx.game) });

    // ---- Glimm-Anzeige oben links: Farbe = Puls (ab ruhe.puls), sonst neutral ----
    function syncGlimm() {
      if (!ui.setGlimm) return;
      const hasPuls = state && state.get('upgrades', []).includes('ruhe.puls');
      const p = state ? state.get('session.puls', 0) : 0;
      const zone = !hasPuls ? 'neutral' : p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot';
      ui.setGlimm({ zone, muted: !!(state && state.get('settings.glimmMuted')) });
    }
    events.on('puls:set', syncGlimm);
    events.on('ability:grant', syncGlimm);
    events.on('state:reset', syncGlimm);
    if (state) state.on('settings.glimmMuted', syncGlimm);
    syncGlimm();
    if (ui.el && ui.el.glimm) ui.el.glimm.addEventListener('click', () => { audio.play('click'); if (bubbles.lastGlimm) bubbles.glimm(bubbles.lastGlimm, { read: true }); });

    // ---- Schleife: verankerte Blasen folgen der Figur ----
    game.addUpdate(() => bubbles.update(), { order: 91, always: true });

    // ---- Beispiele (Tests, Screenshots, Vorführung) ----
    const demo = {
      async dialog() {
        await bubbles.say({ who: 'jolie', text: 'Du bist neu hier, oder? Moien.', anchor: null });
        const r = await choices.ask({ prompt: 'Was sagst du?', items: [
          { id: 'hi', label: 'Moien. Ich bin neu.', icon: 'hand' },
          { id: 'turm', label: 'Was ist mit dem Turm?', icon: 'frage' },
          { id: 'still', label: 'Einfach dazusetzen.', icon: 'herz', tone: 'ruhig' },
          { id: 'boot', label: 'Zeig mir das Boot.', icon: 'boot' },
        ] });
        if (r.system) await bubbles.say({ who: 'glimm', text: 'Okay. Anderes Mal.', wait: false });
        else await bubbles.say({ who: 'jolie', text: r.id === 'turm' ? 'Darüber redet hier keiner.' : 'Okay. Cool.', wait: false });
        return r;
      },
      recap() {
        return recap.show({ cards: [
          { icon: 'anker', color: '#ffb347', title: 'Hafen-Dorf', text: 'Du warst am Steg bei Ilda.' },
          { icon: 'haken', color: '#2de2c9', title: 'Möwe erwischt', text: 'Ildas Schlüssel ist wieder da.' },
          { icon: 'feuer', color: '#ffd166', title: 'Das erste Signalfeuer', text: 'Es wartet am Dorfplatz.' },
        ] });
      },
      campfire() {
        return campfire.show({
          lines: [{ who: 'jolie', text: 'Du hast dich einfach neben mich gesetzt.' }, { who: 'tun', text: 'Okay, die Regel war gut. Zugegeben.' }],
          moments: [{ id: 'moewe', icon: 'kamera', title: 'Die Möwe', color: '#ffd23f' }, { id: 'steg', icon: 'muschel', title: 'Am Steg', color: '#39d0c8' }, { id: 'feuer', icon: 'feuer', title: 'Das Feuer', color: '#ff8c42' }],
          cliffhanger: 'Nachts flackert im Turm ein Licht. Kurz.',
        });
      },
      glimm() { return bubbles.glimm('Regeln. Gähn. Okay, die war gut.'); },
    };

    const api = { overlay, bubbles, choices, settings, journal, recap, campfire, pauseMenu, lock, icon, icons: ICONS, EMOTION_ICON, EMOTION_COLOR, demo,
      say: (o) => bubbles.say(o), ask: (o) => choices.ask(o), glimm: (t, o) => bubbles.glimm(t, o) };
    Object.assign(ui, api);
    return api;
  },
};
