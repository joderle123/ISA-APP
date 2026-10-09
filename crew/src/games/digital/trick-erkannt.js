/* Spiel „Trick erkannt“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T3 Zu zweit an einem iPad · j1-e27
   Suchbild zu zweit: nachgebaute, erfundene App-Screens (Feed, Chat mit Story-Leiste, Game-Shop) mit versteckten
   Aufmerksamkeits-Tricks (Autoplay, Endlos-Scroll, Streak-Flamme, verzögerte Likes, Countdown …). Abwechselnd tippt
   links oder rechts einen Verdacht an. Ein Treffer erklärt in einem Satz, was der Trick mit dem Kopf macht; harmlose
   Stellen sind „kein Trick“ – nie falsch. Danach wählt das Paar mit zwei Fingern das Gefühl, das nach 40 Minuten bleibt.
   Level 2: erst raten, was der Trick mit dem Kopf macht. Level 3: Gegenzug wählen → Anti-Trick-Plan. Am Ende sammelt
   der Beamer nur Trick-Namen, keine Personen. Keine echten Apps, Logos oder Nutzernamen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Finden', 'Erklären', 'Gegenzug'];
  const GEFUEHLE = [
    { id: 'unruhig', label: 'Unruhig', icon: 'bolt' }, { id: 'leer', label: 'Leer', icon: 'eyeOff' }, { id: 'gestresst', label: 'Gestresst', icon: 'timer' },
    { id: 'gut', label: 'Gut unterhalten', icon: 'star' }, { id: 'muede', label: 'Müde', icon: 'leaf' }, { id: 'fomo', label: 'Angst, was zu verpassen', icon: 'eye' },
  ];
  /* Drei erfundene Apps. hot: alle antippbaren Stellen; trick: true = Aufmerksamkeits-Trick.
     kopf = was der Trick mit dem Kopf macht (ein Satz), raten = drei Antworten für Level 2 (erste stimmt),
     gegen = zwei Gegenzüge für Level 3 (gut: true hilft wirklich, der andere klingt nur so). */
  const APPS = [
    {
      id: 'feed', name: 'Glimmr', art: 'Video-Feed', farbe: 'feed',
      hot: {
        logo: { t: 'Glimmr', kein: 'Nur das Logo der App.' },
        suche: { t: 'Suche', kein: 'Die Suche. Hier entscheidest du selbst, was du siehst.' },
        refresh: { trick: true, name: 'Neu-laden-Automat', t: '↑ 12 neue Beiträge', kopf: 'Nach unten ziehen, und manchmal kommt was Tolles – wie am Spielautomaten. Der Kopf will nochmal ziehen.' },
        autoplay: { trick: true, name: 'Autoplay', t: '▶ Nächstes Video in 3 …', kopf: 'Das nächste Video startet, bevor du entscheidest. Aufhören musst du aktiv – weitermachen passiert von allein.' },
        teilen: { t: 'Teilen', kein: 'Der Teilen-Knopf. Den drückst du selbst – kein Trick.' },
        profil: { t: '@skate.loop', kein: 'Ein erfundenes Profil. Ansehen ist kein Trick.' },
        endlos: { trick: true, name: 'Endlos-Scroll', t: '⟳ lädt weitere …', kopf: 'Der Feed hat kein Ende. Ohne Stopp-Stelle merkt der Kopf nicht, wann es genug ist.' },
      },
    },
    {
      id: 'chat', name: 'Zappo', art: 'Chat mit Storys', farbe: 'chat',
      hot: {
        stories: { trick: true, name: 'Verschwindende Storys', t: 'Storys', kopf: 'Storys verschwinden nach 24 Stunden. Der Kopf hat Angst, etwas zu verpassen.', raten: ['Angst, etwas zu verpassen', 'Mehr Freundschaften', 'Bessere Laune beim Schlafen'] },
        kamera: { t: 'Kamera', kein: 'Die Kamera. Fotos machen ist kein Trick.' },
        streak: { trick: true, name: 'Streak-Flamme', t: 'Sam 🔥 87', kopf: '87 Tage am Stück! Wer einen Tag auslässt, verliert die Flamme. Man schreibt aus Verlustangst, nicht aus Lust.', raten: ['Angst, etwas zu verlieren', 'Freude am Schreiben', 'Gar nichts'] },
        neugier: { trick: true, name: 'Verzögerte Likes', t: '👀 Jemand hat reagiert …', kopf: 'Likes kommen gebündelt und ohne Namen. Wer? Die Neugier zieht dich zurück in die App.', raten: ['Neugier, die nicht aufhört', 'Ruhe im Kopf', 'Langeweile'] },
        suche: { t: 'Suche', kein: 'Chats suchen. Kein Trick.' },
        einstellung: { t: 'Einstellungen', kein: 'Die Einstellungen. Hier kann man Tricks sogar ausschalten.' },
      },
    },
    {
      id: 'shop', name: 'Drachenhort', art: 'Game-Shop', farbe: 'shop',
      hot: {
        zurueck: { t: '← Zurück', kein: 'Der Zurück-Knopf. Der ist dein Freund.' },
        countdown: { trick: true, name: 'Countdown', t: 'Nur noch 02:59! −70 %', kopf: 'Zeitdruck: Du sollst kaufen, bevor du nachdenkst. Morgen gibt es wieder ein „nur heute“.', gegen: [{ t: 'Erst eine Nacht drüber schlafen', gut: true }, { t: 'Nur kaufen, wenn es echt −70 % sind', warum: 'Der Countdown startet morgen neu. Der Rabatt ist der Trick.' }] },
        waehrung: { trick: true, name: 'Fantasie-Geld', t: '💎 500 = 4,99 €', kopf: 'Edelsteine fühlen sich nicht wie echtes Geld an. So gibt man leichter mehr aus.', gegen: [{ t: 'Immer in Euro umrechnen', gut: true }, { t: 'Nur Edelsteine kaufen, die übrig sind', warum: 'Die Pakete sind extra so, dass immer ein Rest übrig bleibt.' }] },
        truhe: { trick: true, name: 'Glücks-Truhe', t: 'Truhe öffnen – vielleicht legendär!', kopf: 'Zufall wie beim Glücksspiel. Das „vielleicht“ hält dich fest.', gegen: [{ t: 'Kein echtes Geld für Zufall', gut: true }, { t: 'So lange öffnen, bis was Gutes kommt', warum: 'Genau so wollen es die Macher: „Nur noch eine“.' }] },
        inventar: { t: 'Inventar', kein: 'Deine Sachen im Spiel. Kein Trick.' },
        login: { trick: true, name: 'Login-Bonus', t: 'Bonus Tag 6/7 – morgen nicht verpassen!', kopf: 'Jeden Tag reinschauen, sonst ist der Bonus weg – wie die Streak-Flamme.', gegen: [{ t: 'Bonus verpassen ist okay', gut: true }, { t: 'Wecker stellen, damit ich ihn nicht verpasse', warum: 'Dann steuert der Bonus deinen Tag.' }] },
        musik: { t: '♪ Musik', kein: 'Musik an oder aus. Kein Trick.' },
      },
    },
  ];
  // Erklär-Antworten für Level 2 aus dem Text, gleiche Reihenfolge auf allen Geräten
  const tricksOf = (app) => Object.keys(app.hot).filter((k) => app.hot[k].trick);

  /* Die nachgebaute App: jede Stelle ist ein Knopf. Aussehen wie normale App-Teile – nichts ist markiert. */
  function phone(app, onTap) {
    const b = (k, cls, ...kids) => {
      const x = h('button', { type: 'button', class: 'te-hot ' + (cls || ''), 'data-hot': k, 'aria-label': app.hot[k].t }, kids.length ? kids : app.hot[k].t);
      x.addEventListener('click', () => onTap(k, x));
      return x;
    };
    let body;
    if (app.id === 'feed') {
      body = [
        h('div', { class: 'te-bar' }, b('logo', 'te-logo'), b('suche', 'te-icon', CREW.icon('eye', 20), ' Suche')),
        b('refresh', 'te-newpill'),
        h('div', { class: 'te-video' }, h('span', { class: 'te-video-cap' }, 'Video: Skate-Trick am Hafen'), b('autoplay', 'te-autoplay')),
        h('div', { class: 'te-actions' }, b('teilen', 'te-icon', CREW.icon('right', 18), ' Teilen'), h('span', { class: 'te-likes' }, '♥ 12,4 Tsd.'), b('profil', 'te-handle')),
        h('div', { class: 'te-more' }, h('i', { class: 'te-thumb' }), h('i', { class: 'te-thumb b' }), b('endlos', 'te-loading')),
      ];
    } else if (app.id === 'chat') {
      body = [
        h('div', { class: 'te-bar' }, b('kamera', 'te-icon', CREW.icon('eye', 20), ' Kamera'), h('b', { class: 'te-appname' }, 'Zappo'), b('einstellung', 'te-icon', CREW.icon('gear', 20))),
        b('stories', 'te-stories', h('span', { class: 'te-story-row' }, ['M', 'Y', 'L', 'S', '+4'].map((x) => h('i', { class: 'te-story' }, x))), h('span', { class: 'te-story-t' }, 'Storys · noch 23 Std.')),
        b('suche', 'te-search', CREW.icon('eye', 18), ' Chats suchen …'),
        b('streak', 'te-chatrow', h('span', { class: 'te-ava s' }, 'S'), h('span', { class: 'te-chat-t' }, h('b', null, 'Sam'), h('span', null, 'haha ja morgen')), h('span', { class: 'te-flame' }, '🔥 87')),
        h('div', { class: 'te-chatrow static' }, h('span', { class: 'te-ava y' }, 'Y'), h('span', { class: 'te-chat-t' }, h('b', null, 'Yara'), h('span', null, 'Foto gesendet')), h('span', { class: 'te-time' }, '18:02')),
        b('neugier', 'te-notif'),
      ];
    } else {
      body = [
        h('div', { class: 'te-bar shop' }, b('zurueck', 'te-icon'), h('b', { class: 'te-appname' }, 'Drachenhort'), b('musik', 'te-icon')),
        b('countdown', 'te-deal', h('b', null, 'Drachen-Paket'), h('span', null, app.hot.countdown.t)),
        h('div', { class: 'te-shop-row' }, b('waehrung', 'te-gems'), b('inventar', 'te-icon', CREW.icon('base', 18), ' Inventar')),
        b('truhe', 'te-chest', h('span', { class: 'te-chest-ic' }, '🎁'), h('span', null, app.hot.truhe.t)),
        b('login', 'te-login', h('span', { class: 'te-days' }, [1, 2, 3, 4, 5, 6, 7].map((d) => h('i', { class: d <= 6 ? 'on' : '' }, String(d)))), h('span', null, app.hot.login.t)),
      ];
    }
    return h('div', { class: 'te-phone', 'data-app': app.farbe }, h('div', { class: 'te-notch' }), body, h('div', { class: 'te-erfunden' }, 'Erfundene App · zum Üben'));
  }

  CREW.registerGame({
    id: 'trick-erkannt',
    apps: APPS, // für den Test
    template: 'T3',
    icon: 'phone',
    themen: ['Aufmerksamkeits-Tricks', 'Social-Media-Plan', 'Eigene Reaktion'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Suchbild zu zweit: In jeder App stecken Tricks, die euch festhalten. Abwechselnd tippt ihr einen Verdacht an. Harmlose Stellen sind kein Fehler.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Finden', text: 'Links und rechts tippen abwechselnd.' },
          { icon: 'bulb', title: 'Erklären', text: 'Erst raten: Was macht der Trick mit dem Kopf?' },
          { icon: 'shield', title: 'Gegenzug', text: 'Für jeden Trick ein Gegenzug – euer Plan.' },
        ],
        probe: ctx.T.probeCard('Probe: Ein Video startet von allein, bevor du etwas tippst. Trick oder nicht? Tippt irgendwas – zählt nicht.', [{ label: 'Trick', value: 1, variant: 'ghost', icon: 'eye' }, { label: 'Kein Trick', value: 2, variant: 'ghost', icon: 'check' }]),
      });
      const gesammelt = [];   // Trick-Namen (nur Namen, keine Personen)
      const plan = [];        // gewählte Gegenzüge
      const gefuehle = [];
      let verdacht = 0, treffer = 0, erklaert = 0;
      for (let ai = 0; ai < APPS.length; ai++) {
        const app = APPS[ai];
        const L = ai + 1;
        if (ai > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Neue App. Bevor die Erklärung kommt, ratet ihr: Was macht der Trick mit dem Kopf?' : 'Der Game-Shop. Für jeden Trick wählt ihr einen Gegenzug – das wird euer Anti-Trick-Plan.' });
        const tricks = tricksOf(app);
        const found = new Set();
        const checked = new Set();
        let seite = 0; // 0 = links, 1 = rechts
        const turn = h('div', { class: 'te-turn' });
        const drawTurn = () => { turn.textContent = ''; turn.append(h('span', { class: 'te-turn-side' + (seite === 0 ? ' on' : '') }, '◀ Links tippt'), h('b', null, found.size + ' / ' + tricks.length + ' Tricks'), h('span', { class: 'te-turn-side' + (seite === 1 ? ' on' : '') }, 'Rechts tippt ▶')); };
        drawTurn();
        const panel = h('div', { class: 'te-panel' }, h('span', { class: 'eyebrow' }, app.name + ' · ' + app.art), h('p', { class: 'muted', style: { margin: 0 } }, L === 2 ? 'Tippt einen Verdacht an. Bei einem Trick ratet ihr zuerst: Was macht er mit dem Kopf?' : L === 3 ? 'Vier Tricks sind versteckt. Danach plant ihr für jeden einen Gegenzug.' : 'Tippt eine Stelle an, die euch verdächtig vorkommt. Redet vorher kurz: Warum die?'));
        let busy = false;
        let finish;
        const fertig = new Promise((res) => { finish = res; });
        const fertigBtn = CREW.ui.btn('Fertig gesucht', () => finish(true), { iconRight: 'right', id: 'te-fertig' });
        const reveal = (k, el) => {
          const x = app.hot[k];
          el.classList.add('found');
          el.dataset.n = String(found.size);
          gesammelt.push(x.name);
          panel.textContent = '';
          panel.append(h('div', { class: 'te-hit' }, h('span', { class: 'te-hit-n' }, String(found.size)), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Trick erkannt'), h('b', { class: 'te-hit-name' }, x.name))),
            h('p', { class: 'te-kopf' }, x.kopf), ctx.readBtn(x.name + '. ' + x.kopf));
          CREW.sound.play(found.size === tricks.length ? 'great' : 'good');
          if (found.size === tricks.length) { fertigBtn.classList.add('pulse'); panel.append(h('p', { class: 'te-alle' }, CREW.icon('check', 20), ' Alle Tricks gefunden!')); }
        };
        const onTap = (k, el) => {
          if (busy || found.has(k) || checked.has(k)) return;
          verdacht++;
          seite = 1 - seite;
          const x = app.hot[k];
          if (!x.trick) {
            checked.add(k); el.classList.add('checked');
            CREW.sound.play('tick');
            panel.textContent = '';
            panel.append(h('div', { class: 'te-miss' }, CREW.icon('check', 22), h('b', null, 'Kein Trick')), h('p', { style: { margin: 0 } }, x.kein), h('p', { class: 'muted small', style: { margin: 0 } }, 'Verdacht geprüft – auch das zählt.'));
            drawTurn();
            return;
          }
          found.add(k); treffer++;
          if (L === 2 && x.raten) {
            // Erst raten: Was macht der Trick mit dem Kopf?
            busy = true;
            el.classList.add('found');
            panel.textContent = '';
            const opts = CREW.seed.shuffle(x.raten.map((t, i) => ({ t, ok: i === 0 })), CREW.seed.rng(ctx.code, 'te-raten', k));
            panel.append(h('span', { class: 'eyebrow' }, 'Verdacht: ' + x.t), h('b', null, 'Was macht das mit dem Kopf?'),
              h('div', { class: 'stack', style: { gap: '8px' } }, opts.map((o) => CREW.ui.btn(o.t, () => {
                busy = false; if (o.ok) erklaert++;
                reveal(k, el);
                panel.insertBefore(h('p', { class: 'te-raten-fb' + (o.ok ? ' ok' : '') }, o.ok ? 'Richtig erklärt!' : 'Fast – so wirkt er wirklich:'), panel.children[1]);
                drawTurn();
              }, { variant: 'ghost', small: true, cls: 'te-raten' }))));
            return;
          }
          reveal(k, el);
          drawTurn();
        };
        const ph = phone(app, onTap);
        const w = ctx.scr([
          turn,
          h('div', { class: 'te-layout' }, ph, h('div', { class: 'stack' }, panel, h('div', { class: 'row end' }, fertigBtn))),
        ], { eyebrow: 'App ' + (ai + 1) + '/3 · ' + app.name, badge: ctx.stufe(L, LEVELS) });
        void w;
        if (ctx.auto) {
          // Auto-Modus: alle Stellen nacheinander antippen (inkl. Raten), dann fertig
          const keys = Object.keys(app.hot);
          let j = 0;
          const step = () => {
            if (!ph.isConnected) return;
            const ratenBtn = panel.querySelector('.te-raten');
            if (ratenBtn) { ratenBtn.click(); setTimeout(step, Math.max(30, window.__crewAutoDelay / 3 || 0)); return; }
            if (j < keys.length) { const el = ph.querySelector('[data-hot="' + keys[j++] + '"]'); if (el) el.click(); setTimeout(step, Math.max(30, window.__crewAutoDelay / 3 || 0)); return; }
            fertigBtn.click();
          };
          setTimeout(step, Math.max(40, window.__crewAutoDelay || 0));
        }
        const r = await ctx.waitFor(fertig);
        if (r === ctx.SKIP) continue;
        // Übersehene Tricks zeigen (nie „falsch“, nur „auch noch da“)
        const fehlt = tricks.filter((k) => !found.has(k));
        if (fehlt.length) {
          const wf = ctx.scr([
            ctx.say('Gut gesucht! Diese Tricks waren auch noch da:', { eyebrow: 'Auch noch versteckt', small: true }),
            h('div', { class: 'stack' }, fehlt.map((k) => h('div', { class: 'te-missed' }, h('b', null, app.hot[k].name + ' · ' + app.hot[k].t), h('span', null, app.hot[k].kopf)))),
          ], { eyebrow: app.name + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
          fehlt.forEach((k) => gesammelt.push(app.hot[k].name));
          await ctx.next(wf, 'Weiter');
        }
        // Level 3: Gegenzug pro Trick → Anti-Trick-Plan
        if (L === 3) {
          for (const k of tricks) {
            const x = app.hot[k];
            const wg = ctx.scr([
              h('div', { class: 'te-missed' }, h('b', null, x.name), h('span', null, x.kopf)),
              ctx.say('Euer Gegenzug gegen „' + x.name + '“? Einigt euch.', { eyebrow: 'Gegenzug', small: true }),
            ], { eyebrow: app.name + ' · Gegenzug', badge: ctx.stufe(3, LEVELS) });
            const opts = CREW.seed.shuffle(x.gegen, CREW.seed.rng(ctx.code, 'te-gegen', k));
            const gz = await ctx.ask(wg, opts.map((o, i) => ({ label: o.t, value: i, variant: 'ghost' })));
            if (gz === ctx.SKIP) continue;
            const o = opts[gz];
            const gut = o.gut ? o : x.gegen.find((y) => y.gut);
            plan.push({ trick: x.name, zug: gut.t });
            const wr = ctx.scr([
              h('div', { class: 'te-plan-row' + (o.gut ? ' ok' : '') }, CREW.icon(o.gut ? 'shield' : 'bulb', 26), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, o.gut ? 'Starker Gegenzug' : 'Klingt gut – aber:'), h('span', null, o.gut ? '„' + o.t + '“ – damit hat ' + x.name + ' keine Macht.' : o.warum + ' Besser: „' + gut.t + '“'))),
            ], { eyebrow: app.name + ' · Gegenzug', center: true, badge: ctx.stufe(3, LEVELS) });
            CREW.sound.play(o.gut ? 'good' : 'tick');
            await ctx.next(wr, 'Weiter');
          }
        }
        // Gefühl, das nach 40 Minuten bleibt – zu zweit einigen, zwei Finger
        let gef = null;
        const row = h('div', { class: 'row', style: { gap: '8px' } }, GEFUEHLE.map((g) => {
          const c = h('button', { type: 'button', class: 'chip', 'data-gefuehl': g.id }, CREW.icon(g.icon, 18), ' ' + g.label);
          c.addEventListener('click', () => { CREW.sound.play('tap'); gef = g.id; row.querySelectorAll('.chip').forEach((y) => y.classList.toggle('sel', y === c)); });
          return c;
        }));
        if (ctx.auto) row.querySelectorAll('.chip')[Math.floor(ctx.autoRng() * GEFUEHLE.length)].click();
        const wg = ctx.scr([
          ctx.say('Stellt euch vor: 40 Minuten ' + app.name + '. Welches Gefühl bleibt danach – bei einer Figur wie Luca? Einigt euch.', { eyebrow: 'Danach', small: true }),
          h('div', { class: 'card stack' }, row),
        ], { eyebrow: app.name + ' · Gefühl danach', badge: ctx.stufe(L, LEVELS) });
        if ((await ctx.T.twoFinger(wg, { label: 'Beide: Finger drauf', hint: 'Erst ein Gefühl wählen, dann zwei Finger.' })) !== ctx.SKIP) {
          const g = GEFUEHLE.find((x) => x.id === gef);
          if (g) gefuehle.push(g.label);
          const wd = ctx.scr([
            h('div', { class: 'grid two' },
              h('div', { class: 'card stack te-want' }, h('span', { class: 'eyebrow' }, 'Das wollte ' + app.name), h('b', null, 'Dass ihr bleibt. Jede Minute zählt für die App.')),
              h('div', { class: 'card stack te-stay' }, h('span', { class: 'eyebrow' }, 'Das bleibt'), h('b', null, g ? g.label : 'Ihr habt nichts gewählt – auch okay.'))),
            h('p', { class: 'muted' }, 'Kein Gefühl ist falsch. Merken, wie es danach ist, ist der erste Schritt zum eigenen Plan.'),
          ], { eyebrow: app.name + ' · Gefühl danach', badge: ctx.stufe(L, LEVELS) });
          await ctx.next(wd, ai + 1 < APPS.length ? 'Nächste App' : 'Weiter');
        }
      }
      // Trick-Sammlung: nur Namen – so kann der Beamer sie für den Social-Media-Plan sammeln
      const namen = Array.from(new Set(gesammelt));
      const wS = ctx.scr([
        h('div', { class: 'te-sammlung' }, h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Trick-Sammlung · nur Namen, keine Personen'), ctx.readBtn('Trick-Sammlung: ' + namen.join(', '))),
          h('div', { class: 'te-tags' }, namen.map((n) => h('span', { class: 'te-tag' }, n)))),
        plan.length ? h('div', { class: 'card stack' }, h('b', null, 'Euer Anti-Trick-Plan'), plan.map((p) => h('div', { class: 'te-plan-row ok' }, CREW.icon('shield', 22), h('span', null, h('b', null, p.trick + ': '), p.zug)))) : null,
        h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Drei Atemzüge vorm Handy“')),
      ], { eyebrow: 'Sammlung', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wS, 'Fertig');
      return {
        summary: treffer >= 8 ? 'Trick erkannt – Trick entschärft. Wer die Tricks kennt, entscheidet selbst.' : 'Tricks gefunden, Gefühl gemerkt, Gegenzug geplant. Das ist ein Social-Media-Plan.',
        stats: [[treffer, 'Tricks erkannt'], [verdacht, 'Verdachte geprüft'], [erklaert, 'richtig erklärt'], [plan.length, 'Gegenzüge im Plan']],
        extra: gefuehle.length ? h('p', { class: 'muted small' }, 'Gefühle danach: ' + gefuehle.join(' · ')) : null,
      };
    },
  });
})();
