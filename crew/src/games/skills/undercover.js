/* Spiel „Undercover-Skill“ (Thema: Anspannung & Skills) · Vorlage T4 Bewegung im Raum · j1-e12
   Der Beamer zeigt einen Ort (Test, Bus, Familientisch – Orte aus dem Skills-Tester). Die Crew setzt sich, als wäre
   sie dort. Ein freiwilliges Paar sieht verdeckt einen Körper-Skill als Bild (alle anderen: Augen zu) und macht ihn
   30 Sekunden lang unauffällig. Die anderen beobachten. Nicht erwischt = alltagstauglich, Crew-Stern.
   Level: 1) Tarnen (leichte Skills, „Habt ihr was gesehen?“), 2) Enttarnen (Beobachter:innen gehen zu dem Skill-Bild,
   das sie gesehen haben – oder in die Mitte), 3) Bis wohin? (Variante j1-e12: die Crew schätzt mit den Füßen,
   bis zu welcher Zahl der Skill noch hilft). Die Lehrkraft tippt nur Weiter/Stopp und einmal „erwischt?“. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Tarnen', 'Enttarnen', 'Bis wohin?'];
  // Körper- und Atem-Skills (j1-e12). reicht: bis 40 / bis 70 / auch über 70. leicht = gut für die erste Runde
  const SKILLS = [
    { id: 'fuss', name: 'Fußdruck', text: 'Beide Füße fest in den Boden drücken. 5 Sekunden halten, loslassen. Dreimal.', reicht: 'ue70', zone: 'beine', leicht: true },
    { id: 'faust', name: 'Faust unterm Tisch', text: 'Hände unter dem Tisch zur Faust ballen. 5 Sekunden fest, dann ganz locker.', reicht: 'ue70', zone: 'haende', leicht: true },
    { id: 'handdruck', name: 'Hände drücken', text: 'Handflächen fest gegeneinander drücken. 5 Sekunden, dann lösen.', reicht: 'ue70', zone: 'haende' },
    { id: 'zehen', name: 'Zehen krallen', text: 'Zehen im Schuh fest krallen. 5 Sekunden, dann lösen.', reicht: 'ue70', zone: 'beine' },
    { id: 'ausatem', name: 'Langer Ausatem', text: 'Normal einatmen, ganz langsam ausatmen – doppelt so lang. Fünfmal.', reicht: 'b70', zone: 'brust', leicht: true },
    { id: 'schultern', name: 'Schultern fallen lassen', text: 'Schultern hochziehen, kurz halten, fallen lassen. Dreimal.', reicht: 'b70', zone: 'schultern' },
    { id: 'box', name: 'Box-Atmen', text: '4 Sekunden ein, 4 halten, 4 aus, 4 halten. Im Kopf zählen.', reicht: 'b70', zone: 'brust' },
    { id: 'kiefer', name: 'Kiefer locker', text: 'Zunge an den Gaumen, Zähne leicht auseinander, Kiefer locker lassen.', reicht: 'b70', zone: 'kiefer' },
    { id: 'scan', name: 'Mini-Bodyscan', text: 'Von Kopf bis Fuß spüren: Wo ist es warm, wo fest? Nur bemerken.', reicht: 'b40', zone: 'kopf' },
  ];
  const REICHT = {
    b40: { label: 'Bis 40', where: 'Wand links', text: 'Braucht Ruhe und Aufmerksamkeit. Gut bei Grün – bei hoher Zahl kommt man nicht hinein.' },
    b70: { label: 'Bis 70', where: 'Mitte', text: 'Atmen und Lockerlassen wirken gut bei Gelb. Über 70 fällt Zählen und langsam Atmen schwer.' },
    ue70: { label: 'Auch über 70', where: 'Wand rechts', text: 'Starke Muskelspannung wirkt sogar, wenn der Kopf im Alarm ist. Darum ist sie ein Notfall-Skill.' },
  };
  // Orte aus dem Skills-Tester: wie sitzt die Crew?
  const ORTE = [
    { id: 'test', name: 'Mathe-Test', szene: 'Ihr schreibt einen Test. Stift in der Hand, Blick aufs Blatt, es ist still.' },
    { id: 'bus', name: 'Voller Bus', szene: 'Ihr sitzt im vollen Bus. Rucksack auf dem Schoß, Blick aus dem Fenster.' },
    { id: 'essen', name: 'Familientisch', szene: 'Abendessen. Alle sitzen am Tisch, es wird geredet und gegessen.' },
    { id: 'warten', name: 'Wartezimmer', szene: 'Ihr wartet beim Arzt. Still, nur die Uhr tickt. Jemand blättert in einer Zeitschrift.' },
    { id: 'kino', name: 'Kino', szene: 'Ihr sitzt im Kino. Dunkel, der Film läuft, alle schauen nach vorn.' },
    { id: 'kabine', name: 'Kabine vor dem Spiel', szene: 'Gleich ist Anpfiff. Ihr sitzt auf der Bank und bindet die Schuhe.' },
  ];

  // Skill-Karte: Körper mit leuchtender Zone, Name, Anleitung
  function skillKarte(ctx, s, o) {
    const oo = o || {};
    return h('div', { class: 'uc-karte' + (oo.small ? ' small' : '') },
      K().koerper({ zonen: { [s.zone]: 'ruhig' }, label: s.name }),
      h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, oo.eyebrow || 'Geheimer Skill'), oo.noRead ? null : ctx.readBtn(s.name + '. ' + s.text)),
        h('b', { class: 'uc-name' }, s.name),
        oo.small ? null : h('p', { class: 'uc-text' }, s.text)));
  }
  function ortKarte(ort, extra) {
    return h('div', { class: 'uc-ort' }, h('span', { class: 'uc-ort-ic' }, CREW.icon('base', 34)), h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } }, h('span', { class: 'eyebrow' }, 'Ihr seid hier'), h('b', { class: 'uc-ort-name' }, ort.name), h('span', null, ort.szene)), extra || null);
  }

  /* Eine Runde: Ort, Paar, Augen zu, geheime Karte, 30 Sekunden undercover, enttarnen, auflösen */
  async function runde(ctx, nr, ort, skill, andere, L) {
    const ey = 'Runde ' + nr + '/3';
    const w0 = ctx.scr([
      ortKarte(ort, ctx.readBtn('Ihr seid hier: ' + ort.name + '. ' + ort.szene)),
      ctx.say('Setzt euch so hin, als wärt ihr dort. Zwei Freiwillige sind das Undercover-Paar. Wer nicht mag: Beobachter:in.', { eyebrow: 'Aufstellung', small: true }),
      CREW.ui.teacherLine('Paar gefunden? Dann Weiter. Niemand muss.'),
    ], { eyebrow: ey + ' · Ort', badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w0, 'Paar steht fest', { id: 'uc-paar' })) === ctx.SKIP) return null;
    const w1 = ctx.scr([
      h('div', { class: 'cover-sheet' }, CREW.icon('eyeOff', 72), h('h1', { class: 'outline-text' }, 'Augen zu!'), h('p', { class: 'lead' }, 'Alle außer dem Paar: Augen zu, Kopf auf den Tisch. Das Paar schaut gleich nach vorn.')),
    ], { eyebrow: ey + ' · Augen zu', center: true, badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w1, 'Alle Augen sind zu', { id: 'uc-augenzu' })) === ctx.SKIP) return null;
    const w2 = ctx.scr([
      skillKarte(ctx, skill),
      h('p', { class: 'muted' }, 'Nur das Paar schaut. Merkt euch den Skill – ihr macht ihn gleich 30 Sekunden lang, so unauffällig wie möglich.'),
    ], { eyebrow: ey + ' · Nur das Paar schaut', badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w2, 'Gemerkt – Karte weg', { id: 'uc-gemerkt' })) === ctx.SKIP) return null;
    // 30 Sekunden undercover
    const slot = h('div', { class: 'row center' });
    const w3 = ctx.scr([
      h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Augen auf!'),
      ortKarte(ort, slot),
      ctx.say('Alle spielen die Szene. Das Paar macht den Skill – undercover. Beobachter:innen: genau hinschauen, nichts sagen.', { eyebrow: 'Undercover läuft', small: true }),
      h('div', { class: 'row' }, ctx.safetyLine('koerper')),
    ], { eyebrow: ey + ' · 30 Sekunden', badge: ctx.stufe(L, LEVELS) });
    CREW.sound.play('go');
    const t = await ctx.timerOrButton(w3, 30, [{ label: 'Stopp!', value: 'stop', variant: 'teamB', icon: 'pause', id: 'btn-stop' }], { slot });
    if (t === ctx.SKIP) return null;
    CREW.sound.play('go');
    // Enttarnen: Level 1 nur fragen, ab Level 2 mit den Füßen
    if (L >= 2) {
      const optsS = ctx.rshuffle([skill].concat(andere.slice(0, 3)));
      const pos = optsS.map((s, i) => ({ id: 's' + (i + 1), label: s.name, where: ['Ecke vorne links', 'Ecke vorne rechts', 'Ecke hinten links', 'Ecke hinten rechts'][i] })).concat([{ id: 'mitte', label: 'Nichts gesehen', where: 'Mitte' }]);
      const card = h('div', { class: 'uc-optionen' }, optsS.map((s, i) => h('div', { class: 'uc-opt', 'data-pos': 's' + (i + 1) }, skillKarte(ctx, s, { small: true, eyebrow: pos[i].where, noRead: true }))));
      const rw = await ctx.T.walk({ card, positions: pos, seconds: 10, step: ey + ' · Enttarnen', badge: ctx.stufe(L, LEVELS), question: 'Beobachter:innen: Geht zu dem Skill, den ihr gesehen habt – oder in die Mitte. Jede Ecke sagt: Woran habt ihr es gesehen?', nextLabel: 'Weiter' });
      if (rw === ctx.SKIP) return null;
    }
    const wE = ctx.scr([
      ctx.say(L >= 2 ? 'Stand die größte Gruppe beim richtigen Skill?' : 'Beobachter:innen: Habt ihr gesehen, wer oder was? Kurz sagen, dann entscheidet die Lehrkraft.', { eyebrow: 'Enttarnt?', small: true }),
      CREW.ui.teacherLine(L >= 2 ? 'Erwischt = die meisten standen beim richtigen Skill.' : 'Erwischt = jemand hat Paar UND Skill erkannt.'),
    ], { eyebrow: ey + ' · Enttarnen', center: true, badge: ctx.stufe(L, LEVELS) });
    const erwischt = await ctx.ask(wE, [{ label: 'Erwischt', value: 'ja', variant: 'ghost', icon: 'eye', id: 'uc-erwischt' }, { label: 'Nicht erwischt', value: 'nein', variant: 'good', icon: 'eyeOff', id: 'uc-nicht' }]);
    if (erwischt === ctx.SKIP) return null;
    const stern = erwischt === 'nein';
    CREW.sound.play(stern ? 'great' : 'reveal');
    if (stern && !ctx.fast) CREW.ui.confetti(60);
    const wR = ctx.scr([
      stern ? h('div', { class: 'uc-stern' }, CREW.icon('star', 40), h('b', { class: 'display' }, 'Undercover geschafft!'), h('span', null, 'Alltagstauglich: Crew-Stern.')) : h('div', { class: 'uc-stern erwischt' }, CREW.icon('eye', 40), h('b', { class: 'display' }, 'Erwischt!'), h('span', null, 'Kein Problem – jetzt wisst ihr, wie es noch leiser geht.')),
      skillKarte(ctx, skill, { eyebrow: 'Das war der Skill' }),
      ctx.say('Paar, wer mag: Wie hat es sich angefühlt? Hat es ein bisschen runtergebracht? ' + (stern ? 'Wo würdet ihr ihn in echt benutzen?' : 'Wie geht es noch unauffälliger?'), { eyebrow: 'Jetzt reden', small: true }),
    ], { eyebrow: ey + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
    await ctx.next(wR, L === 3 ? 'Bis wohin hilft er?' : 'Weiter');
    // Level 3: Bis zu welcher Zahl hilft der Skill noch? (Variante j1-e12)
    let reichtOk = null;
    if (L === 3) {
      const POS = ['b40', 'b70', 'ue70'].map((k) => ({ id: k, label: REICHT[k].label, where: REICHT[k].where }));
      const rw = await ctx.T.walk({ card: skillKarte(ctx, skill, { eyebrow: 'Bis zu welcher Zahl hilft das noch?' }), positions: POS, seconds: 10, step: ey + ' · Bis wohin?', badge: ctx.stufe(3, LEVELS), question: 'Jede Wand sagt einen Satz: Warum hilft der Skill bis dahin – und nicht weiter?', nextLabel: 'Auflösen' });
      if (rw !== ctx.SKIP) {
        const r = REICHT[skill.reicht];
        const wb = ctx.scr([
          h('div', { class: 'row center' }, ['b40', 'b70', 'ue70'].map((k) => h('span', { class: 'pill uc-reicht' + (k === skill.reicht ? ' on' : ''), 'data-pos': k }, REICHT[k].label))),
          skillKarte(ctx, skill, { small: true, eyebrow: r.label }),
          ctx.say(r.text, { eyebrow: skill.name + ': ' + r.label, small: true }),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Unsichtbare Skills“')),
          CREW.ui.teacherLine('Stand die größte Gruppe richtig? Kurz nicken reicht – nicht zählen.'),
        ], { eyebrow: ey + ' · Bis wohin?', badge: ctx.stufe(3, LEVELS) });
        reichtOk = true;
        await ctx.next(wb, 'Weiter');
      }
    }
    return { stern, reichtOk };
  }

  CREW.registerGame({
    id: 'undercover',
    template: 'T4',
    icon: 'eyeOff',
    skills: SKILLS, orte: ORTE, // für den Test
    themen: ['Körper-Skills', 'Unauffällig im Alltag', 'Skills an Orte binden'],
    safety: ['figuren', 'koerper', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ihr spielt einen Ort nach. Ein Paar macht heimlich einen Körper-Skill. Nicht erwischt? Dann taugt der Skill für den Alltag.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Augen zu', text: 'Nur das Paar sieht den geheimen Skill.' },
          { icon: 'timer', title: '30 Sekunden', text: 'Alle spielen die Szene, das Paar ist undercover.' },
          { icon: 'eye', title: 'Enttarnen', text: 'Wer hat was gesehen? Nicht erwischt = Stern.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), skillKarte(ctx, SKILLS[0], { eyebrow: 'Probe für alle' }),
            ctx.say('Alle gleichzeitig: Füße 5 Sekunden fest in den Boden drücken. Sieht man das von außen?', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Sieht man', value: 1, variant: 'ghost', icon: 'eye' }, { label: 'Sieht man nicht', value: 2, variant: 'ghost', icon: 'eyeOff' }]);
        },
      });
      const orte = ctx.rshuffle(ORTE).slice(0, 3);
      const erste = ctx.rpick(SKILLS.filter((s) => s.leicht));
      const rest = ctx.rshuffle(SKILLS.filter((s) => s !== erste));
      // Runde 3 braucht einen Skill, bei dem „bis wohin“ spannend ist: nicht immer „über 70“
      const dritte = rest.find((s) => s.reicht !== 'ue70') || rest[1];
      const zweite = rest.find((s) => s !== dritte);
      const liste = [erste, zweite, dritte];
      let sterne = 0, runden = 0, reicht = 0;
      for (let i = 0; i < 3; i++) {
        const L = i + 1;
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt wird enttarnt: Nach 30 Sekunden gehen die Beobachter:innen zu dem Skill-Bild, das sie gesehen haben.' : 'Letzte Runde: Danach schätzt ihr mit den Füßen, bis zu welcher Zahl der Skill noch hilft.' });
        const andere = ctx.rshuffle(SKILLS.filter((s) => s !== liste[i]));
        const r = await runde(ctx, i + 1, orte[i], liste[i], andere, L);
        if (!r) continue;
        runden++; if (r.stern) sterne++; if (r.reichtOk) reicht++;
      }
      return {
        summary: runden ? (sterne ? sterne + (sterne === 1 ? ' Skill ist' : ' Skills sind') + ' alltagstauglich: unsichtbar und trotzdem wirksam.' : 'Alle erwischt – ihr seid gute Beobachter:innen. Nächstes Mal noch leiser.') : 'Heute nur reingeschaut.',
        stats: [[sterne, 'Crew-Sterne'], [runden, 'Runden undercover']].concat(reicht ? [[reicht, '× „bis wohin?“ geklärt']] : []),
      };
    },
  });
})();
