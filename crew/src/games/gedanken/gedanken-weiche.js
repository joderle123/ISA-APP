/* Spiel „Gedanken-Weiche“ (Thema: Gedanken & Glaubenssätze) · Vorlage T3 Zu zweit an einem iPad · j1-e16
   Eine Situation („Mika schreibt in die Gruppe, keiner antwortet“) und eine Weiche mit zwei Gedanken-Gleisen.
   Das Paar sagt pro Gleis mit Icon-Chips voraus, welches Gefühl und welches Verhalten folgt; dann fährt der
   Zug beide Gleise ab und zeigt die Ausgänge als Comic-Panels. „Vorhersage stimmt“ statt richtig/falsch.
   Am Ende: „Welche Weiche hätte die Figur genommen – ehrlich?“ Situation 1 ist die aus der SGGV-Übung der
   Stunde (j1-e16); Austausch nur über Mika und die anderen Figuren, nie über sich. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const GEFUEHLE = [
    { id: 'traurig', label: 'Traurig', icon: 'heart' }, { id: 'wut', label: 'Wütend', icon: 'bolt' }, { id: 'angst', label: 'Ängstlich', icon: 'shield' },
    { id: 'ruhig', label: 'Ruhig', icon: 'leaf' }, { id: 'froh', label: 'Froh', icon: 'star' }, { id: 'neugier', label: 'Neugierig', icon: 'eye' },
  ];
  const VERHALTEN = [
    { id: 'rueckzug', label: 'Rückzug', icon: 'eyeOff' }, { id: 'angriff', label: 'Angriff', icon: 'bolt' },
    { id: 'nachfragen', label: 'Nachfragen', icon: 'chat' }, { id: 'weiter', label: 'Weitermachen', icon: 'right' },
  ];
  const gf = (id) => GEFUEHLE.find((g) => g.id === id);
  const vh = (id) => VERHALTEN.find((v) => v.id === id);

  /* Situationen: Figur, Text, zwei Gleise (bremsend / hilfreich) mit Gedanke, Gefühl, Verhalten und drei
     Comic-Panels. Die erste ist die SGGV-Situation der Stunde j1-e16 und kommt immer zuerst. */
  const SITUATIONEN = [
    { id: 'gruppe', weiche: { schoen: '„Alle lieben mich. Die antworten bestimmt gleich alle.“', getarnt: '„Egal. Ich frag eh nie wieder was.“' }, fig: 'mika', mood: 'neutral', text: 'Mika schreibt in den Gruppenchat: „Hat jemand Lust, Samstag ins Freibad?“ Nach einer Stunde: keine Antwort.', sggv: true,
      gleise: [
        { art: 'bremsend', gedanke: '„Die wollen nichts mit mir machen.“', gefuehl: 'traurig', verhalten: 'rueckzug', panels: ['Mika legt das Handy weg und schließt die Tür.', 'Am Abend kommen drei Nachrichten: „Jaaa Freibad!“ Mika liest sie nicht mehr.', 'Samstag sind alle im Freibad. Mika bleibt zu Hause – und denkt: Wusste ich’s doch.'] },
        { art: 'hilfreich', gedanke: '„Samstag ist noch weit. Die sind grad busy.“', gefuehl: 'ruhig', verhalten: 'weiter', panels: ['Mika packt den Rucksack für morgen und hört Musik.', 'Am Abend kommen drei Nachrichten: „Jaaa Freibad!“', 'Samstag: Alle da. Mika hat den Nachmittag nicht mit Warten verbracht.'] },
      ] },
    { id: 'blick', weiche: { schoen: '„Die finden mich bestimmt mega cool.“', getarnt: '„Sollen die doch reden. Die sind eh alle blöd.“' }, fig: 'yara', mood: 'neutral', text: 'Yara kommt in die Klasse. Zwei Mädchen schauen kurz rüber und reden dann leise weiter.',
      gleise: [
        { art: 'bremsend', gedanke: '„Die reden über mich.“', gefuehl: 'angst', verhalten: 'angriff', panels: ['Yara geht hin: „Was ist euer Problem?“', 'Die zwei schauen verwirrt: „Hä? Wir reden über die Bio-Arbeit.“', 'Jetzt reden sie wirklich über Yara. Yara setzt sich mit heißem Kopf hin.'] },
        { art: 'hilfreich', gedanke: '„Ich weiß nicht, worüber die reden. Kann alles sein.“', gefuehl: 'neugier', verhalten: 'nachfragen', panels: ['Yara setzt sich daneben: „Worüber redet ihr?“', '„Die Bio-Arbeit. Hast du Aufgabe 3 verstanden?“', 'Drei Leute, eine Aufgabe, Pause vorbei. Nichts war über Yara.'] },
      ] },
    { id: 'note', weiche: { schoen: '„Noten sind egal. Ich bin sowieso ein Genie.“', getarnt: '„Deutsch kann ich halt nicht. War schon immer so.“' }, fig: 'luca', mood: 'traurig', text: 'Luca bekommt die Deutsch-Arbeit zurück: eine 4. Letztes Mal war es eine 3.',
      gleise: [
        { art: 'bremsend', gedanke: '„Ich bin einfach dumm.“', gefuehl: 'traurig', verhalten: 'rueckzug', panels: ['Luca steckt die Arbeit weg, ohne die Korrekturen anzuschauen.', 'Beim nächsten Aufsatz denkt Luca: Bringt eh nichts.', 'Nächste Arbeit: wieder 4. Der Gedanke hat sich selbst bewiesen.'] },
        { art: 'hilfreich', gedanke: '„Eine Note. Nicht mein Kopf. Was war der Fehler?“', gefuehl: 'neugier', verhalten: 'nachfragen', panels: ['Luca schaut die Korrekturen an: Überall fehlt die Begründung.', 'Nach der Stunde: „Wie mache ich Begründungen besser?“ Die Lehrerin zeigt es in zwei Minuten.', 'Nächste Arbeit: 3+. Nicht perfekt. Aber die Richtung stimmt.'] },
      ] },
    { id: 'lachen', weiche: { schoen: '„Die haben den Witz nur nicht kapiert. Ich bin der Lustigste.“', getarnt: '„Witze lass ich ab jetzt. Ist sicherer.“' }, fig: 'sam', mood: 'ueberrascht', text: 'Sam erzählt in der Pause einen Witz. Keiner lacht. Dann wechselt jemand das Thema.',
      gleise: [
        { art: 'bremsend', gedanke: '„Ich bin peinlich. Ich halte besser den Mund.“', gefuehl: 'angst', verhalten: 'rueckzug', panels: ['Sam sagt den Rest der Pause nichts mehr.', 'In der nächsten Pause steht Sam weiter weg.', 'Nach einer Woche fragt jemand: „Warum bist du so still geworden?“'] },
        { art: 'hilfreich', gedanke: '„Der Witz war nicht so gut. Passiert.“', gefuehl: 'ruhig', verhalten: 'weiter', panels: ['Sam grinst: „Okay, der war schlecht.“ Jetzt lachen zwei.', 'Sam hört beim neuen Thema zu und sagt was dazu.', 'Ein schlechter Witz, eine normale Pause. Niemand erinnert sich morgen daran.'] },
      ] },
    { id: 'team', weiche: { schoen: '„Eigentlich bin ich die Beste. Die wissen es nur nicht.“', getarnt: '„Sport ist eh dumm. Mir doch egal.“' }, fig: 'mika', mood: 'angst', text: 'Sportunterricht. Zwei Kapitäne wählen Teams. Mika wird als Vorletztes gewählt.',
      gleise: [
        { art: 'bremsend', gedanke: '„Keiner will mich im Team.“', gefuehl: 'wut', verhalten: 'angriff', panels: ['Mika spielt absichtlich schlecht: „Dann halt nicht.“', 'Das Team verliert. Jemand sagt: „Mika hat null gemacht.“', 'Nächstes Mal wird Mika als Letztes gewählt. Der Gedanke hat sich bestätigt – weil Mika ihm geholfen hat.'] },
        { art: 'hilfreich', gedanke: '„Die Kapitäne wählen ihre Kumpels. Das sagt nichts über mich.“', gefuehl: 'ruhig', verhalten: 'weiter', panels: ['Mika spielt normal, zwei gute Pässe.', 'Nach dem Spiel: „Dein Pass war stark.“', 'Beim nächsten Mal nimmt Yara Mika als Dritte. Nicht als Erste – aber auch nicht aus Mitleid.'] },
      ] },
    { id: 'einladung', weiche: { schoen: '„Partys sind eh langweilig. Ich hab Besseres vor.“', getarnt: '„Die mögen mich halt nicht. Ist so.“' }, fig: 'yara', mood: 'traurig', text: 'Auf Insta: Fotos von einer Party. Fast die halbe Klasse war da. Yara wusste nichts davon.',
      gleise: [
        { art: 'bremsend', gedanke: '„Ich gehöre da nicht dazu. Nie.“', gefuehl: 'traurig', verhalten: 'rueckzug', panels: ['Yara scrollt eine Stunde durch die Fotos und schreibt niemandem.', 'Montag redet Yara mit niemandem über das Wochenende.', 'Die nächste Party: Yara wird nicht gefragt – weil Yara nie fragt.'] },
        { art: 'hilfreich', gedanke: '„Ich weiß nicht, wer eingeladen hat und warum. Ich frag Sam.“', gefuehl: 'neugier', verhalten: 'nachfragen', panels: ['Yara schreibt Sam: „War das Lenas Party? Wie war’s?“', 'Sam: „Ja, nur ihr Volleyball-Team. War okay. Nächsten Samstag Kino?“', 'Es war keine Klassenparty. Yara hat eine Antwort statt einer Geschichte im Kopf.'] },
      ] },
    { id: 'eltern', weiche: { schoen: '„Papa meint das bestimmt lieb. Alles super.“', getarnt: '„Dann streng ich mich halt gar nicht mehr an.“' }, fig: 'luca', mood: 'genervt', text: 'Lucas Vater sagt beim Essen: „Dein Bruder hatte in deinem Alter nur Einsen.“',
      gleise: [
        { art: 'bremsend', gedanke: '„Ich bin die Enttäuschung der Familie.“', gefuehl: 'wut', verhalten: 'angriff', panels: ['Luca knallt die Gabel hin: „Dann hol dir doch den!“ und geht.', 'Der Abend ist still. Niemand entschuldigt sich.', 'Luca lernt am nächsten Tag nicht – aus Trotz. Der Satz vom Vater bleibt.'] },
        { art: 'hilfreich', gedanke: '„Das ist sein Vergleich. Ich bin nicht mein Bruder.“', gefuehl: 'ruhig', verhalten: 'nachfragen', panels: ['Luca atmet aus: „Vergleich mich bitte nicht mit ihm. Das hilft mir nicht.“', 'Der Vater ist kurz still. „Okay. Was würde dir helfen?“', 'Kein perfektes Gespräch. Aber ein anderes als sonst.'] },
      ] },
  ];

  /* Weiche als SVG: Einfahrt links, zwei Gleise nach oben und unten rechts. Der Zug fährt per animateMotion. */
  function weicheSvg(o) {
    const oo = o || {};
    const el = h('div', { class: 'weiche' + (oo.small ? ' small' : '') });
    const PATH_O = 'M10 70 C 80 70 100 70 150 40 S 230 20 300 20';
    const PATH_U = 'M10 70 C 80 70 100 70 150 100 S 230 120 300 120';
    const rail = (d, cls) => `<path class="rail ${cls}" d="${d}" fill="none" stroke-width="10" stroke-linecap="round"/><path class="rail-in ${cls}" d="${d}" fill="none" stroke-width="4" stroke-dasharray="10 12" stroke-linecap="round"/>`;
    const train = oo.fahrt ? `<g class="zug"><rect x="-18" y="-11" width="36" height="22" rx="6"/><circle cx="-9" cy="12" r="4"/><circle cx="9" cy="12" r="4"/><rect x="-12" y="-7" width="10" height="8" rx="2" fill="#fff"/><animateMotion dur="${oo.dur || 2.2}s" fill="freeze" path="${oo.fahrt === 'o' ? PATH_O : PATH_U}"/></g>` : `<g class="zug" transform="translate(28 70)"><rect x="-18" y="-11" width="36" height="22" rx="6"/><circle cx="-9" cy="12" r="4"/><circle cx="9" cy="12" r="4"/><rect x="-12" y="-7" width="10" height="8" rx="2" fill="#fff"/></g>`;
    el.innerHTML = `<svg viewBox="0 0 310 140" aria-hidden="true">${rail(PATH_O, 'g1' + (oo.fahrt === 'o' ? ' on' : ''))}${rail(PATH_U, 'g2' + (oo.fahrt === 'u' ? ' on' : ''))}<text x="296" y="12" text-anchor="end" class="lbl">Gleis 1</text><text x="296" y="136" text-anchor="end" class="lbl">Gleis 2</text>${train}</svg>`;
    return el;
  }

  /* Chip-Reihe (ein Chip wählbar), ohne eigene Bestätigung. Rückgabe { el, get() } */
  function chipReihe(ctx, liste, title) {
    let sel = null;
    const row = h('div', { class: 'row', style: { gap: '8px' } }, liste.map((c) => {
      const b = h('button', { type: 'button', class: 'chip', 'data-chip': c.id }, CREW.icon(c.icon, 18), ' ' + c.label);
      b.addEventListener('click', () => { CREW.sound.play('tap'); sel = c.id; row.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x === b)); });
      return b;
    }));
    if (ctx.auto) row.querySelectorAll('.chip')[Math.floor(ctx.autoRng() * liste.length)].click();
    return { el: h('div', { class: 'card stack' }, h('b', null, title), row), get: () => sel };
  }

  const LEVELS = ['Vorhersagen', 'Vergleichen', 'Weiche stellen'];
  const WEICHE_FB = {
    fair: (n) => 'Fair und realistisch. Der Gedanke passt zu dem, was man wirklich weiß – und ' + n + ' kann damit handeln.',
    schoen: (n) => 'Klingt gut – aber glaubt ' + n + ' das wirklich? Schöngeredet hält nicht lange. Hilfreich heißt realistisch, nicht „alles toll“.',
    getarnt: (n) => 'Klingt locker, bremst aber genauso: Am Ende steht ' + n + ' allein da. Das ist Gleis 1 in anderen Worten.',
  };

  /* Level 3: Gleis 1 (bremsend) liegt schon. Das Paar stellt die Weiche: Welcher Gedanke kommt auf Gleis 2? */
  async function weicheStellen(ctx, s, ey) {
    const name = CREW.games.figures[s.fig].name;
    const brems = s.gleise.find((g) => g.art === 'bremsend');
    const hilf = s.gleise.find((g) => g.art === 'hilfreich');
    const opts = ctx.rshuffle([{ k: 'fair', t: hilf.gedanke }, { k: 'schoen', t: s.weiche.schoen }, { k: 'getarnt', t: s.weiche.getarnt }]);
    let versuche = 0, wahl = null;
    const tried = [];
    for (;;) {
      const w = ctx.scr([
        ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: 'Die Situation' }),
        h('div', { class: 'weiche-row' }, weicheSvg(), h('div', { class: 'stack' },
          h('div', { class: 'gleis-card', 'data-gleis': 1, 'data-art': 'bremsend' }, h('span', { class: 'eyebrow' }, 'Gleis 1 · liegt schon'), h('b', null, brems.gedanke)),
          h('div', { class: 'gleis-card gleis-leer', 'data-gleis': 2 }, h('span', { class: 'eyebrow' }, 'Gleis 2 · ihr stellt die Weiche'), h('b', null, '?')))),
        ctx.say('Welcher Gedanke bringt ' + name + ' auf ein besseres Gleis? Realistisch, nicht schöngeredet. Einigt euch.', { eyebrow: 'Weiche stellen', small: true }),
      ], { eyebrow: ey + ' · Weiche', badge: ctx.stufe(3, LEVELS) });
      const left = opts.filter((o) => !tried.includes(o.k));
      const r = await ctx.ask(w, left.map((o) => ({ label: o.t, value: o.k, variant: 'ghost', id: 'gw-weiche-' + o.k })), { autoPick: () => (versuche ? 'fair' : left[0].k) });
      if (r === ctx.SKIP) return null;
      versuche++; tried.push(r); wahl = r;
      const ok = r === 'fair';
      CREW.sound.play(ok ? 'good' : 'tap');
      const wf = ctx.scr([
        h('div', { class: 'gleis-card', 'data-gleis': 2, 'data-art': ok ? 'hilfreich' : 'bremsend' }, h('span', { class: 'eyebrow' }, 'Euer Gleis 2'), h('b', null, opts.find((o) => o.k === r).t)),
        ctx.figureCard({ fig: s.fig, mood: ok ? 'froh' : 'neutral', text: WEICHE_FB[r](name), eyebrow: ok ? 'Weiche sitzt' : 'Hm, Moment' }),
      ], { eyebrow: ey + ' · Weiche', badge: ctx.stufe(3, LEVELS) });
      if (ok || versuche >= 2) {
        await ctx.next(wf, ok ? 'Zug fahren lassen' : 'Das faire Gleis zeigen');
        break;
      }
      const again = await ctx.ask(wf, [{ label: 'Faires Gleis zeigen', value: 'show', variant: 'ghost', auto: false }, { label: 'Nochmal stellen', value: 'again', iconRight: 'undo', id: 'gw-nochmal' }]);
      if (again === ctx.SKIP) return null;
      if (again === 'show') break;
    }
    // Zug fährt das faire Gleis
    ctx.scr([weicheSvg({ fahrt: 'u', dur: ctx.fast ? 0.3 : 2.2 }), h('p', { class: 'muted center' }, 'Der Zug fährt Gleis 2 …')], { eyebrow: ey + ' · Fahrt', center: true });
    CREW.sound.play('go');
    await ctx.hold(2400);
    const w3 = ctx.scr([
      h('div', { class: 'gleis-card', 'data-gleis': 2, 'data-art': 'hilfreich' }, h('span', { class: 'eyebrow' }, 'Gleis 2 · fairer Gedanke'), h('b', null, hilf.gedanke)),
      panelRow(hilf, name),
      h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Gedankenschiffchen“: Gedanken bemerken, ziehen lassen, Gleis wählen')),
    ], { eyebrow: ey + ' · Gleis 2 · Ausgang', badge: ctx.stufe(3, LEVELS) });
    await ctx.next(w3, 'Weiter');
    return wahl === 'fair' && versuche === 1 ? 'erster' : wahl === 'fair' ? 'zweiter' : 'gezeigt';
  }

  const panelRow = (g, name) => h('div', { class: 'comic' }, g.panels.map((p, i) => h('div', { class: 'comic-panel' }, h('span', { class: 'comic-n' }, String(i + 1)), h('p', null, p))));

  CREW.registerGame({
    id: 'gedanken-weiche',
    template: 'T3',
    icon: 'sparkle',
    themen: ['Situation–Gedanke–Gefühl–Verhalten', 'Hilfreich vs. bremsend', 'Vorhersage', 'Glaubenssätze'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Situation, zwei Gedanken-Gleise. Sagt zu zweit voraus, welches Gefühl und Verhalten folgt. Am Ende stellt ihr selbst die Weiche.',
        levels: LEVELS,
        steps: [
          { icon: 'sparkle', title: 'Vorhersagen', text: 'Pro Gleis: Gefühl-Chip + Verhalten-Chip. Dann zwei Finger.' },
          { icon: 'right', title: 'Vergleichen', text: 'Der Zug fährt, der Comic zeigt die Folgen.' },
          { icon: 'shuffle', title: 'Weiche stellen', text: 'Letzte Situation: Ihr wählt den fairen Gedanken.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), weicheSvg({ small: true }), ctx.say('Probe: Sam verpasst den Bus. Gleis 1: „Immer ich.“ Gleis 2: „Nächster in 10 Minuten.“ Welches Gleis macht wütend?', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Gleis 1', value: 1, variant: 'ghost' }, { label: 'Gleis 2', value: 2, variant: 'ghost' }]);
        },
      });
      // Situation 1 ist die aus der SGGV-Übung der Stunde, danach zwei weitere per Tagescode
      const erste = SITUATIONEN.find((s) => s.sggv);
      const liste = [erste].concat(ctx.rshuffle(SITUATIONEN.filter((s) => !s.sggv)).slice(0, 2));
      let treffer = 0, vorhersagen = 0, hilfreich = 0, gestellt = null;
      for (let i = 0; i < liste.length; i++) {
        const s = liste[i];
        const name = CREW.games.figures[s.fig].name;
        if (i === liste.length - 1) {
          await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt liegt nur das bremsende Gleis. Ihr stellt die Weiche: Welcher Gedanke ist fair – nicht schöngeredet?' });
          gestellt = await weicheStellen(ctx, s, 'Situation ' + (i + 1) + '/' + liste.length);
          continue;
        }
        // Gleise mischen, damit „bremsend“ nicht immer oben liegt
        const gleise = ctx.rshuffle(s.gleise);
        const ey = 'Situation ' + (i + 1) + '/' + liste.length;
        // Situation + Weiche
        const w0 = ctx.scr([
          ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: i === 0 ? 'Die Situation aus der Stunde' : 'Die Situation' }),
          h('div', { class: 'weiche-row' }, weicheSvg(), h('div', { class: 'stack' }, gleise.map((g, gi) => h('div', { class: 'gleis-card', 'data-gleis': gi + 1 }, h('span', { class: 'eyebrow' }, 'Gleis ' + (gi + 1) + ' · ' + name + ' denkt'), h('b', null, g.gedanke), ctx.readBtn('Gleis ' + (gi + 1) + ': ' + g.gedanke))))),
        ], { eyebrow: ey, step: i + 1, badge: ctx.stufe(1, LEVELS) });
        const go = await ctx.next(w0, 'Vorhersagen');
        if (go === ctx.SKIP) continue;
        // Pro Gleis: Gefühl + Verhalten als zwei Chip-Reihen auf EINEM Bildschirm, Weiter per Knopf.
        // Zwei Finger nur einmal pro Situation: wenn beide Vorhersagen stehen.
        const tipps = [];
        let skipped = false;
        for (let gi = 0; gi < gleise.length; gi++) {
          const g = gleise[gi];
          const gef = chipReihe(ctx, GEFUEHLE, 'Gefühl');
          const ver = chipReihe(ctx, VERHALTEN, 'Verhalten');
          const w1 = ctx.scr([
            h('div', { class: 'gleis-card big', 'data-gleis': gi + 1 }, h('span', { class: 'eyebrow' }, 'Gleis ' + (gi + 1) + ' · ' + name + ' denkt'), h('b', null, g.gedanke), ctx.readBtn(g.gedanke)),
            ctx.say('Wenn ' + name + ' das denkt: Welches Gefühl kommt – und was tut ' + name + ' dann? Einigt euch, dann tippt einer.', { eyebrow: 'Eure Vorhersage', small: true }),
            gef.el, ver.el,
          ], { eyebrow: ey + ' · Gleis ' + (gi + 1), badge: ctx.stufe(1, LEVELS) });
          const r1 = await ctx.next(w1, gi + 1 < gleise.length ? 'Nächstes Gleis' : 'Vorhersage steht');
          if (r1 === ctx.SKIP) { skipped = true; break; }
          tipps.push({ gef: gef.get(), ver: ver.get() });
        }
        if (skipped) continue;
        // Einmal zwei Finger: „Das ist unsere Vorhersage“ – dann fährt der Zug
        const wF = ctx.scr([
          ctx.say('Eure Vorhersage für beide Gleise steht. Beide Finger drauf – dann fährt der Zug.', { eyebrow: ey + ' · Vorhersage', small: true }),
          h('div', { class: 'row' }, gleise.map((g, gi) => h('span', { class: 'chip small' }, 'Gleis ' + (gi + 1) + ': ' + (tipps[gi].gef ? gf(tipps[gi].gef).label : '–') + ' · ' + (tipps[gi].ver ? vh(tipps[gi].ver).label : '–')))),
        ], { eyebrow: ey + ' · Vorhersage' });
        if ((await ctx.T.twoFinger(wF, { label: 'Beide: Finger drauf – Zug fährt', hint: 'Einmal pro Situation.' })) === ctx.SKIP) continue;
        // Zug fährt beide Gleise ab: Animation, dann Comic-Panels und Abgleich
        for (let gi = 0; gi < gleise.length; gi++) {
          const g = gleise[gi];
          const t = tipps[gi];
          const hitG = t.gef === g.gefuehl, hitV = t.ver === g.verhalten;
          vorhersagen += 2; treffer += (hitG ? 1 : 0) + (hitV ? 1 : 0);
          ctx.scr([weicheSvg({ fahrt: gi === 0 ? 'o' : 'u', dur: ctx.fast ? 0.3 : 2.2 }), h('p', { class: 'muted center' }, 'Der Zug fährt Gleis ' + (gi + 1) + ' …')], { eyebrow: ey + ' · Fahrt', center: true });
          CREW.sound.play('go');
          await ctx.hold(2400);
          const w2 = ctx.scr([
            h('div', { class: 'gleis-card', 'data-gleis': gi + 1, 'data-art': g.art }, h('span', { class: 'eyebrow' }, 'Gleis ' + (gi + 1) + ' · ' + (g.art === 'bremsend' ? 'bremsender Gedanke' : 'hilfreicher Gedanke')), h('b', null, g.gedanke)),
            panelRow(g, name),
            h('div', { class: 'vorhersage-row' },
              h('div', { class: 'vorhersage' + (hitG ? ' hit' : '') }, CREW.icon(hitG ? 'check' : 'shuffle', 22), h('span', null, h('b', null, 'Gefühl: '), gf(g.gefuehl).label, ' · ', hitG ? 'Vorhersage stimmt' : 'ihr hattet „' + gf(t.gef).label + '“ – auch möglich')),
              h('div', { class: 'vorhersage' + (hitV ? ' hit' : '') }, CREW.icon(hitV ? 'check' : 'shuffle', 22), h('span', null, h('b', null, 'Verhalten: '), vh(g.verhalten).label, ' · ', hitV ? 'Vorhersage stimmt' : 'ihr hattet „' + vh(t.ver).label + '“ – auch möglich'))),
          ], { eyebrow: ey + ' · Gleis ' + (gi + 1) + ' · Ausgang', badge: ctx.stufe(2, LEVELS) });
          await ctx.next(w2, gi === 0 ? 'Zweites Gleis' : 'Weiter');
        }
        // Ehrlich: Welche Weiche hätte die Figur genommen? (über die Figur, nie über sich)
        const w3 = ctx.scr([
          ctx.say('Ehrlich: Welche Weiche hätte ' + name + ' an einem schlechten Tag genommen? Und wer stellt die Weiche um?', { eyebrow: 'Über ' + name + ', nicht über euch' }),
          h('div', { class: 'row' }, gleise.map((g, gi) => h('span', { class: 'chip small' }, 'Gleis ' + (gi + 1) + ': ' + g.gedanke))),
          ctx.safetyLine('figuren'),
        ], { eyebrow: ey + ' · Ehrlich', badge: ctx.stufe(2, LEVELS) });
        const ehrlich = await ctx.ask(w3, gleise.map((g, gi) => ({ label: 'Gleis ' + (gi + 1), value: g.art, variant: 'ghost' })));
        if (ehrlich === ctx.SKIP) continue;
        if (ehrlich === 'hilfreich') hilfreich++;
        // Rückmeldung zur gewählten Weiche: nennt den Gedanken, den die beiden getippt haben
        const gew = gleise.find((g) => g.art === ehrlich) || gleise[0];
        const andere = gleise.find((g) => g !== gew) || gew;
        const w4 = ctx.scr([ctx.say(ehrlich === 'bremsend'
          ? 'Ihr sagt: An einem schlechten Tag denkt ' + name + ' „' + gew.gedanke + '“. Das Gleis ist schnell da. Die Weiche liegt direkt nach dem Gedanken: „' + andere.gedanke + '“ wäre das andere Gleis – ' + name + ' kann umstellen, bevor der Zug fährt.'
          : 'Ihr sagt: ' + name + ' nimmt „' + gew.gedanke + '“. Stark, wenn das klappt. An schlechten Tagen ist „' + andere.gedanke + '“ schneller da. Der Trick: den Gedanken bemerken, bevor der Zug fährt.', { eyebrow: 'Die Weiche' })], { eyebrow: ey, center: true });
        await ctx.next(w4, 'Weiter');
      }
      return {
        summary: vorhersagen ? treffer + ' von ' + vorhersagen + ' Vorhersagen stimmten. Gedanke → Gefühl → Verhalten: Die Weiche liegt direkt nach der Situation.' : 'Heute nur reingeschaut.',
        stats: [[treffer, 'Vorhersagen stimmten'], [liste.length, 'Weichen']].concat(gestellt ? [[gestellt === 'erster' ? 1 : 0, 'fairer Gedanke im ersten Versuch']] : []),
      };
    },
  });
})();
