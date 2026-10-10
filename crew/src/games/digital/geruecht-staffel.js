/* Spiel „Gerücht-Staffel“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T4 Bewegung im Raum · j1-e27, j1-e28
   Die Crew steht in einer Reihe, jeder Platz ist eine Station. Ein iPad ist das Gerücht-Handy und wandert die Reihe
   entlang (am besten das Beamer-iPad, dann wächst die Punktwolke groß an der Wand). Ein Gerücht über eine Figur
   startet mit Reichweite 1. Wer das Handy bekommt, macht einen Schritt nach vorn und sieht die Verlockung
   („+90 Leute, wenn du weiterschickst“): Weiterschicken (Handy wandert, Punktwolke wächst) oder Stopp (behält es und
   sagt einen von drei Stopp-Sätzen laut). Durchgang 2 startet am anderen Ende mit einem Gerücht, das sich wahr anfühlt
   (mit „Beweis“-Foto). Level 3 mit Wänden: „Stimmt – und trotzdem?“ Gerüchte nur über erfundene Figuren.
   Ersetzt die Gerücht-Kette im Feed-Check. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Weiterschicken?', 'Fühlt sich wahr an', 'Stimmt – und trotzdem?'];
  /* Stationen: wohin das Gerücht als Nächstes geht und wie viele Leute dazukommen (die Verlockung wächst) */
  const STATIONEN = [
    { wo: 'Privatchat mit der besten Freundin', plus: 1 },
    { wo: 'Gruppe „Pausenhof 8B“', plus: 12 },
    { wo: 'Klassenchat', plus: 28 },
    { wo: 'Gruppe vom Fußballverein', plus: 40 },
    { wo: 'Stufen-Gruppe', plus: 90 },
    { wo: 'Gaming-Server', plus: 120 },
    { wo: 'Status für alle Kontakte', plus: 220 },
    { wo: 'Story, öffentlich', plus: 300 },
  ];
  const GERUECHTE = [
    { id: 'kabine', L: 1, fig: 'luca', text: 'hab gehört, Luca ist aus dem Fußballteam geflogen – angeblich hat er in der Kabine geklaut 😳', quelle: 'Quelle: „hab gehört“',
      stopp: ['Das weiß keiner sicher. Ich schick das nicht weiter.', 'Würdest du das Luca auch ins Gesicht sagen?', 'Ich frag lieber Luca selbst.'],
      wahr: 'Luca hat sich am Knie verletzt und pausiert sechs Wochen. Geklaut hat niemand.', folge: 'Am Montag tuscheln drei Klassen. Luca traut sich nicht mehr in die Kabine.' },
    { id: 'party', L: 1, fig: 'yara', text: 'Yara hat ALLE zu ihrer Party eingeladen außer Sam 👀 voll fies oder', quelle: 'Quelle: „hat mir wer erzählt“',
      stopp: ['Keine Ahnung, ob das stimmt. Ich schick’s nicht weiter.', 'Das ist Yaras und Sams Sache, nicht unsere.', 'Frag doch Yara direkt.'],
      wahr: 'Die Party war nur für Yaras Handball-Team. Sam ist gar nicht im Team – und war nicht sauer.', folge: 'Jetzt denkt die halbe Stufe, Yara sei gemein. Yara bekommt fiese Nachrichten.' },
    { id: 'test', L: 2, fig: 'mika', text: 'Mika hat beim Mathe-Test abgeschrieben!! Sam saß daneben. Hier der Beweis 📸', bild: 'Foto: Mika mit dem Handy unter dem Tisch', quelle: 'Quelle: ein Foto – aber was zeigt es wirklich?',
      stopp: ['Ein Foto ist kein Beweis. Ich schick das nicht weiter.', 'Auch wenn es stimmt: Das ist Mikas Sache.', 'Frag erst Mika, bevor du das rumschickst.'],
      wahr: 'Die Wanduhr war kaputt. Mika hat auf die Uhr am Handy geschaut – die Lehrerin hat es erlaubt und daneben gestanden.', folge: 'Mikas Eltern bekommen einen Screenshot. Mika muss sich bei drei Leuten erklären – für nichts.' },
    { id: 'chat', L: 2, fig: 'sam', text: 'Sam ist in Yara verknallt!!! Hab den Chat gesehen 😍 Screenshot kommt', bild: 'Screenshot: „danke dir ❤️“', quelle: 'Quelle: ein Screenshot – ohne den Chat davor',
      stopp: ['Ein Herz ist kein Liebesbrief. Ich schick’s nicht weiter.', 'Selbst wenn: Das soll Sam selbst sagen.', 'Ich frag lieber, worum es ging.'],
      wahr: 'Sam hat Yara bei Mathe geholfen. Im Chat stand nur „danke dir ❤️“ – so schreibt Yara allen.', folge: 'In der Pause singen alle ein Liebeslied, wenn Sam vorbeigeht. Sam isst allein.' },
  ];
  /* Level 3: wahr – aber privat. Drei Positionen im Raum. */
  const WAHR = { fig: 'sam', text: 'Sam muss die Klasse wiederholen. Das stimmt wirklich – Sams Mutter hat es meiner Mutter erzählt.', loesung: 'Wahr heißt nicht: meins zum Erzählen. Sam erzählt es selbst – wem und wann Sam will. Das ist Sams Geschichte.' };
  const POS3 = [
    { id: 'links', label: 'Weiterschicken', where: 'Wand links · stimmt ja' },
    { id: 'mitte', label: 'Nur der besten Freundin', where: 'Mitte · „bleibt unter uns“' },
    { id: 'rechts', label: 'Bei Sam lassen', where: 'Wand rechts · nicht meine Geschichte' },
  ];

  // Punktwolke: bis 60 ein Punkt pro Person, danach ein Punkt pro 5 Leute (höchstens 180), die Zahl groß daneben
  const punkte = (r) => Math.min(180, r <= 60 ? Math.max(1, r) : 60 + Math.ceil((r - 60) / 5));
  function wolke(reach, neu) {
    const dots = punkte(reach);
    const neuAb = neu ? punkte(Math.max(1, reach - neu)) : dots;
    return h('div', { class: 'gs-wolke', 'aria-label': 'Reichweite: ' + reach + ' Leute' },
      h('div', { class: 'gs-dots' }, Array.from({ length: dots }, (_, i) => h('i', { class: i >= neuAb ? 'neu' : '', style: { animationDelay: Math.min(900, (i - neuAb) * 12) + 'ms' } }))),
      h('div', { class: 'gs-reach' }, h('b', { class: 'display' }, String(reach)), h('span', null, reach === 1 ? 'Person weiß es' : 'Leute wissen es')));
  }
  function nachricht(ctx, g) {
    return h('div', { class: 'gs-msg' },
      h('div', { class: 'row between' }, h('span', { class: 'gs-msg-head' }, CREW.icon('chat', 18), ' Weitergeleitet'), ctx.readBtn('Die Nachricht: ' + g.text + (g.bild ? ' ' + g.bild : ''))),
      h('p', null, g.text),
      g.bild ? h('div', { class: 'gs-bild' }, CREW.icon('eye', 22), h('span', null, g.bild)) : null,
      h('span', { class: 'muted small' }, g.quelle));
  }

  /* Ein Durchgang: das Handy wandert Station für Station. Rückgabe { reach, gestoppt (Station 1…n | 0), satz } oder null */
  async function durchgang(ctx, g, n, L, vonEnde) {
    let reach = 1;
    const name = ctx.figures[g.fig].name;
    const stationen = STATIONEN.slice(0, n);
    const maxReach = 1 + stationen.reduce((a, s) => a + s.plus, 0);
    // Start: Das Gerücht kommt aufs Handy der ersten Person
    const w0 = ctx.scr([
      h('div', { class: 'gs-start' }, h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
        h('span', { class: 'eyebrow' }, 'Die Reihe steht · ' + (vonEnde ? 'Start am anderen Ende' : 'Start links')),
        h('p', { class: 'lead', style: { margin: 0 } }, 'Ein Gerücht über ' + name + ' ist da. Das Handy geht an Station 1. Wer es hat, macht einen Schritt nach vorn.')),
      wolke(1)),
      nachricht(ctx, g),
      h('div', { class: 'row' }, ctx.safetyLine('figuren'), ctx.safetyLine('koerper')),
    ], { eyebrow: 'Durchgang ' + L, badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w0, 'Handy an Station 1')) === ctx.SKIP) return null;
    for (let i = 0; i < stationen.length; i++) {
      const st = stationen[i];
      const w = ctx.scr([
        h('div', { class: 'gs-station' },
          h('div', { class: 'gs-station-n display' }, String(i + 1)),
          h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } }, h('span', { class: 'eyebrow' }, 'Station ' + (i + 1) + ' von ' + stationen.length + ' · Schritt nach vorn'), h('b', null, 'Weiter an: ' + st.wo))),
        h('div', { class: 'gs-grid' }, nachricht(ctx, g), h('div', { class: 'stack' }, wolke(reach),
          h('div', { class: 'gs-lock' }, CREW.icon('bolt', 22), h('b', null, '+' + st.plus + ' ' + (st.plus === 1 ? 'Person' : 'Leute') + ', wenn du weiterschickst'), L === 2 ? h('span', { class: 'small' }, 'Alle reden schon drüber …') : null))),
      ], { eyebrow: 'Durchgang ' + L + ' · Station ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
      const r = await ctx.ask(w, [{ label: 'Stopp', value: 'stopp', variant: 'good', icon: 'shield', id: 'gs-stopp' }, { label: 'Weiterschicken', value: 'weiter', variant: 'ghost', iconRight: 'right', id: 'gs-weiter' }], { autoPick: () => (ctx.autoRng() < 0.35 ? 'stopp' : 'weiter') });
      if (r === ctx.SKIP) return null;
      if (r === 'stopp') {
        CREW.sound.play('good');
        const ws = ctx.scr([
          h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Stopp!'),
          ctx.say('Du behältst das Handy. Such dir einen Stopp-Satz aus und sag ihn laut – so, dass die Reihe ihn hört.', { eyebrow: 'Station ' + (i + 1) + ' stoppt', small: true }),
        ], { eyebrow: 'Durchgang ' + L + ' · Stopp', badge: ctx.stufe(L, LEVELS) });
        const satz = await ctx.ask(ws, g.stopp.map((s, si) => ({ label: '„' + s + '“', value: si, variant: 'ghost', id: 'gs-satz-' + si })));
        return { reach, gestoppt: i + 1, satz: satz === ctx.SKIP ? null : g.stopp[satz], maxReach };
      }
      reach += st.plus;
      CREW.sound.play('tick');
      if (i + 1 < stationen.length) {
        const wp = ctx.scr([
          h('div', { class: 'cover-sheet' }, wolke(reach, st.plus), h('h1', { class: 'outline-text' }, 'Weitergeschickt'),
            h('p', { class: 'lead' }, 'Gib das Handy an die nächste Person in der Reihe und geh einen Schritt zurück. Jetzt wissen es ' + reach + ' Leute.')),
        ], { eyebrow: 'Durchgang ' + L + ' · weiter', center: true, badge: ctx.stufe(L, LEVELS) });
        if ((await ctx.next(wp, 'Weitergegeben', { id: 'btn-passed' })) === ctx.SKIP) return null;
      }
    }
    return { reach, gestoppt: 0, satz: null, maxReach };
  }

  CREW.registerGame({
    id: 'geruecht-staffel',
    geruechte: GERUECHTE, stationen: STATIONEN, // für den Test
    template: 'T4',
    icon: 'users',
    themen: ['Gerüchte stoppen', 'Zivilcourage online', 'Folgen abschätzen'],
    safety: ['figuren', 'koerper', 'raum'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ihr steht in einer Reihe, ein iPad ist das Gerücht-Handy. Wer es bekommt, entscheidet: weiterschicken – oder Stopp und einen Satz laut sagen.',
        levels: LEVELS,
        steps: [
          { icon: 'users', title: 'Reihe', text: 'Jeder Platz ist eine Station. Schritt nach vorn, wer das Handy hat.' },
          { icon: 'bolt', title: 'Verlockung', text: '+40 Leute, wenn du weiterschickst. Die Punktwolke wächst.' },
          { icon: 'shield', title: 'Stopp', text: 'Handy behalten, Stopp-Satz laut sagen.' },
        ],
        probe: ctx.T.probeCard('Probe: „Hab gehört, morgen fällt Sport aus.“ Weiterschicken oder Stopp? Tippt irgendwas – zählt nicht.', [{ label: 'Stopp', value: 1, variant: 'ghost', icon: 'shield' }, { label: 'Weiterschicken', value: 2, variant: 'ghost', icon: 'right' }]),
      });
      // Aufstellung: Reihe bilden (Lehrkraft tippt nur Weiter)
      const n = Math.max(3, Math.min(STATIONEN.length, ctx.n || 5));
      const wA = ctx.scr([
        ctx.say('Stellt euch in eine Reihe, mit etwas Abstand. Jeder Platz ist eine Station – heute ' + n + ' Stationen. Das Handy startet links.', { eyebrow: 'Aufstellung' }),
        h('div', { class: 'gs-reihe' }, Array.from({ length: n }, (_, i) => h('span', { class: 'gs-reihe-p' }, String(i + 1)))),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
        CREW.ui.teacherLine('Am besten das Beamer-iPad als Gerücht-Handy nehmen. Sonst hält die Station es kurz hoch.'),
      ], { eyebrow: 'Aufstellung', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(wA, 'Reihe steht')) === ctx.SKIP) return { summary: 'Heute keine Staffel. Nächstes Mal.' };
      const g1 = ctx.rpick(GERUECHTE.filter((g) => g.L === 1));
      const g2 = ctx.rpick(GERUECHTE.filter((g) => g.L === 2 && g.fig !== g1.fig));
      const ergebnisse = [];
      for (const [L, g] of [[1, g1], [2, g2]]) {
        if (L === 2) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt fühlt sich das Gerücht wahr an: mit Foto. Und es startet am anderen Ende der Reihe.' });
        const res = await durchgang(ctx, g, n, L, L === 2);
        if (!res) continue;
        ergebnisse.push(res);
        const name = ctx.figures[g.fig].name;
        // Auflösung: Was war wirklich? Wie weit kam es? (Stationen, keine Namen)
        const nieGesehen = res.maxReach - res.reach;
        CREW.sound.play(res.gestoppt ? 'great' : 'soft');
        const wR = ctx.scr([
          h('div', { class: 'gs-result' + (res.gestoppt ? ' ok' : '') },
            wolke(res.reach),
            h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
              h('b', { class: 'display gs-result-t' }, res.gestoppt ? 'Gestoppt an Station ' + res.gestoppt : 'Ganz durchgelaufen'),
              h('span', null, res.gestoppt ? nieGesehen + ' Leute haben das Gerücht nie gesehen.' : 'Jetzt wissen es ' + res.reach + ' Leute. ' + name + ' liest es morgen früh.'),
              res.satz ? h('span', { class: 'gs-satz' }, '„' + res.satz + '“') : null)),
          ctx.figureCard({ fig: g.fig, mood: res.gestoppt ? 'froh' : 'traurig', text: g.wahr, eyebrow: 'Was wirklich war' }),
          res.gestoppt ? h('p', { class: 'muted' }, 'Die Reihe hat gestoppt. Ein Satz reicht – und eine Geschichte über ' + name + ' bleibt klein.') : h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon('bulb', 22), h('span', null, h('b', null, 'Die Folge: '), g.folge)),
          CREW.ui.teacherLine('Nicht fragen, wer weitergeschickt hat. Nur: Was hat das Stoppen schwer gemacht?'),
        ], { eyebrow: 'Durchgang ' + L + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wR, L === 1 ? 'Durchgang 2' : 'Weiter');
      }
      // Level 3: Stimmt – und trotzdem? Positionen im Raum
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt stimmt die Nachricht wirklich. Geht zu einer Wand: Was macht ihr damit?' });
      const card = h('div', { class: 'bigcard enter gs-wahr' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Diesmal wahr'), ctx.readBtn(WAHR.text)),
        h('div', { class: 'gs-msg' }, h('p', null, WAHR.text), h('span', { class: 'pill good' }, CREW.icon('check', 14), 'stimmt')));
      const r3 = await ctx.T.walk({ card, positions: POS3, seconds: 10, step: 'Stimmt – und trotzdem?', badge: ctx.stufe(3, LEVELS), question: 'Jede Wand sagt einen Satz: Warum steht ihr hier? Die Mitte zuerst: Bleibt „unter uns“ unter uns?', nextLabel: 'Auflösen' });
      if (r3 !== ctx.SKIP) {
        const w3 = ctx.scr([
          ctx.figureCard({ fig: WAHR.fig, mood: 'neutral', text: WAHR.loesung, eyebrow: 'Auflösung' }),
          h('div', { class: 'grid two' },
            h('div', { class: 'card stack' }, h('b', null, '„Nur der besten Freundin“'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Die beste Freundin hat auch eine beste Freundin. So fangen fast alle Gerüchte an.')),
            h('div', { class: 'card stack' }, h('b', null, 'Bei Sam lassen'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Wenn Sam es erzählt, ist es Sams Geschichte. Wenn andere es erzählen, ist es Gerede.'))),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Teilen-Bremse“')),
        ], { eyebrow: 'Stimmt – und trotzdem? · Auflösung', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w3, 'Weiter');
      }
      const stopps = ergebnisse.filter((e) => e.gestoppt).length;
      const gespart = ergebnisse.reduce((a, e) => a + (e.maxReach - e.reach), 0);
      return {
        summary: stopps ? 'Gerüchte brauchen Leute, die weiterschicken. Ein Stopp-Satz reicht, damit sie klein bleiben.' : 'Ganz durchgelaufen – so schnell geht das. Nächstes Mal reicht ein Stopp-Satz.',
        stats: [[stopps, 'Gerüchte gestoppt'], [gespart, 'Leute haben es nie gesehen']],
        help: true,
      };
    },
  });
})();
