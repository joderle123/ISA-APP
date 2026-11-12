/* Spiel „Vergleichs-Falle“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T3 Zu zweit an einem iPad · j1-e16, j1-e27
   Ein Fake-Profil im Glimmr-Look (Strandfoto, „Beste Freunde“-Post, 2 000 Follower) und eine Figur, die es
   anschaut. Das Paar tippt, womit die Figur sich vergleicht, dreht dann die Posts um (gestellt, dreimal
   gefiltert, der Streit danach) und wählt drei Dinge, die die Figur wertvoll machen und in keinem Feed stehen.
   Der Körper-Chip steht bewusst nicht im Vordergrund. Zwei-Finger-Bestätigung. Hilfenummern am Ende (online).
   j1-e16: der bremsende Satz der Figur steht mit auf der Karte. j1-e27: Trick-Namen am Ende (Social-Media-Plan). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Drei Fake-Profile (keine echten Personen). Jeder Post hat eine Vorder- und eine Rückseite. */
  const PROFILE = [
    { user: 'sunny.lea_', follower: '2 014', posts: 318, bio: 'living my best life ✨', fig: 'luca', mood: 'traurig', zahl: '84',
      satz: '„Alle haben ein besseres Leben als ich.“',
      posts3: [
        { bg: 'strand', cap: 'Paradise 🌴 #malediven', likes: '843', back: 'Gestellt: Der Strand liegt 40 Meter neben dem Hotel-Parkplatz. 23 Versuche, bis das Bild saß.', trick: 'Gestellt' },
        { bg: 'freunde', cap: 'Beste Freunde forever 💕', likes: '612', back: 'Der Streit danach: Zehn Minuten nach dem Foto gab es Streit, wer wen nicht eingeladen hat. Zwei reden seitdem nicht miteinander.', trick: 'Der Streit danach' },
        { bg: 'look', cap: 'Neuer Look ✨', likes: '1 203', back: 'Dreimal gefiltert: Hautfilter, Lichtfilter, Gesicht schmaler gezogen. So sieht Lea morgens nicht aus. Niemand.', trick: 'Dreimal gefiltert' },
      ],
      vergleich: ['Follower', 'Urlaub', 'Freunde', 'Spaß', 'Geld', 'Aussehen'],
      gedanke: 'Die hat 2 014 Follower, ich 84. Die war auf den Malediven, ich im Schwimmbad. Die hat beste Freunde für immer. Und ich?',
      wert: ['hört zu, wenn es jemandem schlecht geht', 'kann jedes Fahrrad reparieren', 'gibt nicht auf, auch beim dritten Versuch', 'bringt die Oma jeden Sonntag zum Lachen', 'ist ehrlich, auch wenn es unangenehm ist', 'merkt, wenn jemand allein steht', 'kann richtig gut zeichnen', 'hält Versprechen'] },
    { user: 'max_on_tour', follower: '5 320', posts: 541, bio: 'grind never stops 🔥', fig: 'yara', mood: 'genervt', zahl: '131',
      satz: '„Ich bin einfach nicht interessant genug.“',
      posts3: [
        { bg: 'setup', cap: 'Neues Setup 🎮 endlich!', likes: '1 870', back: 'Auf Raten gekauft, 36 Monate. Der Vater zahlt. Nach dem Foto wurde die Lampe zurückgeschickt.', trick: 'Gestellt' },
        { bg: 'party', cap: 'Beste Nacht ever 🎉', likes: '960', back: 'Vier Leute. Um 22 Uhr waren alle weg. Das Foto entstand um 20:15 Uhr, bevor jemand kam.', trick: 'Der Streit danach' },
        { bg: 'look', cap: 'Fresh ✨ #ootd', likes: '2 410', back: 'Dreimal gefiltert: Hautfilter, Zähne weißer, Schultern breiter. Dann 40 Minuten die beste Pose gesucht.', trick: 'Dreimal gefiltert' },
      ],
      vergleich: ['Follower', 'Sachen haben', 'Freunde', 'Spaß', 'Geld', 'Aussehen'],
      gedanke: '5 320 Follower. Ein Setup für tausend Euro. Jede Nacht Party. Mein Feed: zwei Fotos vom Hund. Ich bin einfach langweilig.',
      wert: ['kann mit dem kleinen Cousin stundenlang Lego bauen', 'bleibt ruhig, wenn andere ausrasten', 'bringt immer eine Idee mit', 'sagt, wenn etwas unfair ist', 'ist da, wenn jemand weint', 'kann sehr gut Nachrichten nicht weiterleiten', 'übt Gitarre, auch wenn es noch schief klingt', 'merkt sich, was Leuten wichtig ist'] },
    { user: 'team.jonas', follower: '3 877', posts: 402, bio: 'win or learn 🏆', fig: 'sam', mood: 'traurig', zahl: '57',
      satz: '„Ich bin nirgends gut genug.“',
      posts3: [
        { bg: 'pokal', cap: 'Champions 🏆 nichts kann uns stoppen', likes: '1 540', back: 'Gestellt: Der Pokal ist vom Hallenturnier der Unter-12. Jonas war Ersatz und hat zwei Minuten gespielt.', trick: 'Gestellt' },
        { bg: 'freunde', cap: 'Squad 💪 immer zusammen', likes: '890', back: 'Der Streit danach: Nach dem Foto wurde Jonas aus der Gruppe geworfen, weil er zu oft fehlte. Das Foto blieb online.', trick: 'Der Streit danach' },
        { bg: 'auto', cap: 'Mein Baby 🚗', likes: '2 100', back: 'Das Auto gehört dem Onkel. Dreimal gefiltert, damit der Rost nicht auffällt.', trick: 'Dreimal gefiltert' },
      ],
      vergleich: ['Follower', 'Erfolg', 'Freunde', 'Sachen haben', 'Geld', 'Aussehen'],
      gedanke: 'Die gewinnen alles. Die haben einen Squad. Ich hab zwei Freunde und ein altes Fahrrad. Ich bin nirgends gut genug.',
      wert: ['bleibt beim Freund, der verloren hat', 'trainiert weiter, auch ohne Pokal', 'kann Streit schlichten', 'hilft dem Nachbarn mit den Einkäufen', 'sagt „sorry“, wenn es nötig ist', 'kann zuhören, ohne zu unterbrechen', 'baut Dinge, die funktionieren', 'lacht über sich selbst'] },
  ];

  const LEVELS = ['Erkennen', 'Durchschauen', 'Anwenden'];
  /* Level 3: Was macht die Figur beim nächsten Scrollen? */
  const PLAENE = [
    { k: 'atem', t: 'Drei Atemzüge, bevor die App aufgeht – und kurz fragen: Was will ich hier?', ok: true, fb: 'Genau. Drei Atemzüge sind die Lücke zwischen Daumen und Feed. Darin entscheidest du selbst.' },
    { k: 'entfolgen', t: 'Profilen entfolgen oder stumm schalten, nach denen es mir schlechter geht.', ok: true, fb: 'Stark. Dein Feed ist dein Zimmer – du entscheidest, wer drin hängt.' },
    { k: 'timer', t: 'Timer stellen: nach 15 Minuten raus und etwas Echtes machen.', ok: true, fb: 'Gut. Nach 20 Minuten Vergleichen geht es fast allen schlechter. Ein Timer hilft.' },
    { k: 'mehr', t: 'Mehr posten und filtern, damit meine Zahlen auch steigen.', ok: false, fb: 'Das ist die Falle von innen: Dann vergleicht sich bald jemand mit deiner Bühne.' },
    { k: 'weiter', t: 'Weiterscrollen, bis es irgendwann besser wird.', ok: false, fb: 'Leider wird es meistens schlimmer. Der Feed hört nie auf – du musst aufhören.' },
  ];

  /* Der Handy-Look: Profilkopf und drei Posts (Vorder-/Rückseite) */
  function phone(ctx, p, o) {
    const oo = o || {};
    const posts = p.posts3.map((post, i) => {
      const card = h('div', { class: 'gl-post', 'data-post': String(i), 'data-bg': post.bg, role: oo.flip ? 'button' : null, tabindex: oo.flip ? '0' : null, 'aria-label': 'Post ' + (i + 1) + ': ' + post.cap });
      const front = h('div', { class: 'gl-front' }, h('div', { class: 'gl-img' }), h('div', { class: 'gl-cap' }, h('b', null, p.user), ' ' + post.cap), h('div', { class: 'gl-likes' }, CREW.icon('heart', 14), ' ' + post.likes));
      const back = h('div', { class: 'gl-back' }, h('span', { class: 'gl-trick' }, post.trick), h('p', null, post.back));
      card.append(front, back);
      if (oo.flipped) card.classList.add('flipped');
      if (oo.flip) {
        const doFlip = () => { if (card.classList.contains('flipped')) return; CREW.sound.play('tap'); card.classList.add('flipped'); oo.flip(i); };
        card.addEventListener('click', doFlip);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') doFlip(); });
      }
      return card;
    });
    return h('div', { class: 'glimmr' },
      h('div', { class: 'gl-head' }, h('b', null, 'glimmr'), h('span', { class: 'muted small' }, 'Fake-Profil · keine echte Person')),
      h('div', { class: 'gl-profile' }, h('span', { class: 'gl-avatar' }), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, p.user), h('span', { class: 'muted small' }, p.bio)),
        h('div', { class: 'gl-stats' }, h('span', null, h('b', null, p.follower), 'Follower'), h('span', null, h('b', null, String(p.posts)), 'Posts'))),
      h('div', { class: 'gl-posts' }, posts));
  }

  /* Chips mehrfach wählen (max n), Rückgabe { el, picked } */
  function multiChips(ctx, items, max, countEl) {
    const picked = [];
    const el = h('div', { class: 'row', style: { gap: '8px' } }, items.map((t) => {
      const b = h('button', { type: 'button', class: 'chip', 'data-chip': t }, t);
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        const i = picked.indexOf(t);
        if (i >= 0) picked.splice(i, 1); else if (picked.length < max) picked.push(t); else return;
        b.classList.toggle('sel', picked.includes(t));
        if (countEl) countEl.textContent = picked.length + ' von ' + max;
      });
      return b;
    }));
    return { el, picked, pickAuto: (n) => ctx.rshuffle(items).slice(0, n).forEach((t) => el.querySelector('[data-chip="' + t.replace(/"/g, '\\"') + '"]').click()) };
  }

  CREW.registerGame({
    id: 'vergleichs-falle',
    template: 'T3',
    icon: 'phone',
    themen: ['Selbstwert', 'Vergleich', 'Social Media', 'Bremsende Sätze'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit: Eine Figur scrollt durch ein Fake-Profil. Findet die Falle, dreht die Posts um und plant das nächste Scrollen.',
        levels: LEVELS,
        steps: [
          { icon: 'phone', title: 'Erkennen', text: 'Womit vergleicht sich die Figur?' },
          { icon: 'undo', title: 'Durchschauen', text: 'Posts umdrehen: gestellt, gefiltert, Streit.' },
          { icon: 'star', title: 'Anwenden', text: 'Was zählt – und was hilft beim nächsten Scrollen?' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), ctx.say('Probe: Legt beide einen Finger auf die Fläche. Kurz halten.', { eyebrow: 'Zum Ausprobieren' })], { eyebrow: 'Probe' });
          await ctx.T.twoFinger(w, { label: 'Probe: beide Finger drauf' });
        },
      });
      // Stunde: j1-e16 (Glaubenssätze) oder j1-e27 (Social Media)
      const wu = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Vorbereitung', small: true })], { eyebrow: 'Vorbereitung', center: true });
      const set = await ctx.ask(wu, [{ label: 'Was sind Glaubenssätze? (j1-e16)', value: 'e16', variant: 'ghost', icon: 'sparkle' }, { label: 'Social Media und ich (j1-e27)', value: 'e27', variant: 'ghost', icon: 'phone' }]);
      const glaub = set !== 'e27';
      const p = ctx.rpick(PROFILE);
      const fig = CREW.games.figures[p.fig];
      const stats = { schritte: 0 };

      // 1) Profil + Figur, die es anschaut
      const w1 = ctx.scr([
        h('div', { class: 'vf-layout' }, phone(ctx, p), h('div', { class: 'stack' },
          ctx.figureCard({ fig: p.fig, mood: p.mood, text: fig.name + ' scrollt seit zwanzig Minuten durch dieses Profil. Eigene Follower: ' + p.zahl + '.', eyebrow: 'Schaut sich das an', extra: glaub ? h('span', { class: 'pill' }, 'Bremsender Satz: ' + p.satz) : null }),
          h('p', { class: 'muted small' }, 'Schaut euch das Profil an. Dann weiter.'))),
      ], { eyebrow: 'Das Profil', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(w1, 'Angeschaut')) === ctx.SKIP) return { summary: 'Heute nur reingeschaut.' };

      // 2) Womit vergleicht sich die Figur? (bis zu drei Chips, zwei Finger)
      const c1 = h('span', { class: 'pill' }, '0 von 3');
      const m1 = multiChips(ctx, p.vergleich, 3, c1);
      const w2 = ctx.scr([
        ctx.figureCard({ fig: p.fig, mood: p.mood, text: p.gedanke, eyebrow: 'Was ' + fig.name + ' denkt', chat: true }),
        h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Womit vergleicht sich ' + fig.name + '? Bis zu drei.'), c1), m1.el),
      ], { eyebrow: 'Vergleich', badge: ctx.stufe(1, LEVELS) });
      if (ctx.auto) m1.pickAuto(2);
      if ((await ctx.T.twoFinger(w2, { label: 'Beide: Finger drauf', hint: 'Erst Chips antippen, dann zwei Finger.' })) === ctx.SKIP) return { summary: 'Abgebrochen. Auch okay.' };
      stats.schritte++;
      const w2b = ctx.scr([
        ctx.say(fig.name + ' vergleicht sich mit ' + (m1.picked.length ? m1.picked.map((x) => '„' + x + '“').join(', ') : 'allem') + '. Und zwar mit der VORDERSEITE von Posts. Dreht sie um.', { eyebrow: 'Die Falle', small: true }),
        h('p', { class: 'muted' }, 'Ein Vergleich mit einem Feed ist ein Vergleich mit einer Bühne. Hinter der Bühne sieht es anders aus.'),
      ], { eyebrow: 'Vergleich', center: true, badge: ctx.stufe(2, LEVELS) });
      await ctx.next(w2b, 'Posts umdrehen');

      // 3) Posts umdrehen: alle drei, dann zwei Finger
      let flipped = 0;
      const status = h('span', { class: 'pill' }, '0 von 3 umgedreht');
      const ph = phone(ctx, p, { flip: () => { flipped++; status.textContent = flipped + ' von 3 umgedreht'; } });
      const w3 = ctx.scr([
        h('div', { class: 'vf-layout' }, ph, h('div', { class: 'stack' },
          h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Tippt jeden Post an. Er dreht sich um.'), status), h('p', { class: 'muted small' }, 'Lest die Rückseite laut vor. Erst wenn alle drei umgedreht sind: zwei Finger.')),
          ctx.readBtn('Rückseiten: ' + p.posts3.map((x) => x.back).join(' ')))),
      ], { eyebrow: 'Rückseite', badge: ctx.stufe(2, LEVELS) });
      if (ctx.auto) ph.querySelectorAll('.gl-post').forEach((c) => c.click());
      if ((await ctx.T.twoFinger(w3, { label: 'Alle drei umgedreht: Finger drauf' })) === ctx.SKIP) return { summary: 'Abgebrochen. Auch okay.' };
      stats.schritte++;
      const w3b = ctx.scr([
        ctx.figureCard({ fig: p.fig, mood: 'ueberrascht', text: 'Gestellt. Gefiltert. Streit danach. Ich hab mich mit einem Film verglichen, nicht mit einem Menschen.', eyebrow: fig.name + ' nach dem Umdrehen' }),
        h('div', { class: 'row' }, p.posts3.map((x) => h('span', { class: 'chip small' }, x.trick))),
      ], { eyebrow: 'Rückseite' });
      await ctx.next(w3b, 'Weiter');
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Ihr habt die Bühne durchschaut. Jetzt: Was macht ' + fig.name + ' wertvoll – und was tut ' + fig.name + ' beim nächsten Scrollen?' });

      // 4) Drei Dinge, die die Figur wertvoll machen und in keinem Feed stehen
      const c2 = h('span', { class: 'pill' }, '0 von 3');
      const m2 = multiChips(ctx, ctx.rshuffle(p.wert).map((x) => fig.name + ' ' + x), 3, c2);
      const w4 = ctx.scr([
        ctx.say('Wählt drei Dinge, die ' + fig.name + ' wertvoll machen – und die in keinem Feed stehen.', { eyebrow: 'Kein Feed', small: true }),
        h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Acht Dinge, drei wählen'), c2), m2.el, h('p', { class: 'muted small' }, 'Es gibt keine falschen drei. Redet, warum ihr die nehmt.')),
      ], { eyebrow: 'Wertvoll', badge: ctx.stufe(3, LEVELS) });
      if (ctx.auto) m2.pickAuto(3);
      if ((await ctx.T.twoFinger(w4, { label: 'Beide: Finger drauf', hint: 'Drei Chips, dann zwei Finger.' })) === ctx.SKIP) return { summary: 'Abgebrochen. Auch okay.' };
      stats.schritte++;
      const picked = m2.picked.length ? m2.picked : [fig.name + ' ' + p.wert[0]];
      // Das „Profil“ ohne Feed: null Likes, trotzdem wahr
      const w5 = ctx.scr([
        h('div', { class: 'vf-layout' },
          h('div', { class: 'glimmr' }, h('div', { class: 'gl-head' }, h('b', null, 'kein feed'), h('span', { class: 'muted small' }, 'steht nirgends · stimmt trotzdem')),
            h('div', { class: 'gl-profile' }, CREW.games.avatar(p.fig, 'froh', 56), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, fig.name), h('span', { class: 'muted small' }, p.zahl + ' Follower. Egal.'))),
            h('div', { class: 'stack', style: { gap: '8px' } }, picked.map((t) => h('div', { class: 'gl-true' }, h('span', null, t), h('span', { class: 'muted small' }, '0 Likes · wahr'))))),
          h('div', { class: 'stack' },
            ctx.figureCard({ fig: p.fig, mood: 'froh', text: glaub ? 'Mein Satz war: ' + p.satz + ' Der passt nicht zu diesen drei Dingen. Neuer Satz: „Ich habe Dinge, die in keinem Feed stehen.“' : 'Drei Dinge, null Likes. Und trotzdem mehr wert als ' + p.follower + ' Follower.', eyebrow: fig.name }),
            !glaub ? h('div', { class: 'card stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Trick-Namen für euren Social-Media-Plan'), h('div', { class: 'row' }, p.posts3.map((x) => h('span', { class: 'chip small' }, x.trick)), h('span', { class: 'chip small' }, 'Zahlen-Vergleich'))) : null,
            ctx.safetyLine('freiwillig'))),
      ], { eyebrow: 'Kein Feed', badge: ctx.stufe(3, LEVELS) });
      CREW.sound.play('great');
      await ctx.next(w5, 'Und beim nächsten Scrollen?');

      // 5) Anwenden: Was macht die Figur beim nächsten Scrollen? (gemeinsam entscheiden)
      const w6 = ctx.scr([
        ctx.figureCard({ fig: p.fig, mood: 'neutral', text: 'Morgen Abend, 22 Uhr. Das Handy liegt neben mir. Was mache ich, bevor ich wieder in die Falle tappe?', eyebrow: fig.name + ' plant', chat: true }),
        h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Einigt euch: Was hilft ' + fig.name + ' am meisten?'), ctx.readBtn('Was macht ' + fig.name + ' beim nächsten Scrollen? ' + PLAENE.map((x) => x.t).join(' '))),
          h('p', { class: 'muted small' }, 'Erst kurz reden, dann eine Person tippt.')),
      ], { eyebrow: 'Nächstes Scrollen', badge: ctx.stufe(3, LEVELS) });
      const planK = await ctx.ask(w6, ctx.rshuffle(PLAENE).map((x) => ({ label: x.t, value: x.k, variant: 'ghost', id: 'vf-plan-' + x.k, auto: x.k === 'atem' })), { autoPick: () => 'atem' });
      let planOk = 0;
      if (planK !== ctx.SKIP) {
        const pl = PLAENE.find((x) => x.k === planK);
        if (pl) {
          planOk = pl.ok ? 1 : 0;
          CREW.sound.play(pl.ok ? 'good' : 'tap');
          const w7 = ctx.scr([
            ctx.figureCard({ fig: p.fig, mood: pl.ok ? 'froh' : 'neutral', text: pl.fb, eyebrow: pl.ok ? 'Guter Plan' : 'Hm, Moment' }),
            pl.ok ? null : h('p', { class: 'muted' }, 'Besser: ' + PLAENE.filter((x) => x.ok).map((x) => x.t.split(' – ')[0].replace(/[.:].*$/, '')).join(' · ')),
            h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Drei Atemzüge vorm Handy“')),
          ], { eyebrow: 'Nächstes Scrollen', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w7, 'Weiter');
        }
      }
      return { summary: 'Vergleich mit einem Feed ist ein Vergleich mit einer Bühne. Was zählt, steht in keinem Feed.', stats: [[3, 'Posts umgedreht'], [picked.length, 'Dinge ohne Feed'], [planOk, 'Plan fürs nächste Scrollen']], help: true };
    },
  });
})();
