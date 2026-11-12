/* Spiel „Kipp-Punkt“ (Thema: Anspannung & Skills) · Vorlage T5 Gerät weitergeben · j1-e09, j1-e11, j1-e24
   Story-Staffel mit der Clash-Idee – nur ist die Hitze diesmal im Körper der Figur. Die Szene startet, das iPad
   wandert: „Nur du schaust“ – Pegel, Warnsignal und der nächste Auslöser. Wer dran ist, wählt einen Zug als Icon
   (Warnsignal + Skill, kurz raus, einen Satz sagen, draufhalten) und begründet ihn laut in einem Satz. Dann trifft
   der Auslöser, der Pegel ändert sich, die Karte wird allen gezeigt. Ab 95 kippt es: Zurückspulen statt „falsch“.
   Crew-Ziel: unter 70 bleiben und am Ende sagen, was die Figur braucht.
   Level: 1) Warnsignal (erste Züge: Signal groß, Hinweise an den Zügen), 2) Vorausschauen (stärkere Auslöser, keine
   Hinweise), 3) Was braucht die Figur? (die ganze Crew entscheidet). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Warnsignal', 'Vorausschauen', 'Was braucht die Figur?'];
  const ZIEL = 70, KNALL = 95;
  const ZUEGE = [
    { id: 'skill', label: 'Warnsignal + Skill', icon: 'leaf', hinweis: 'wirkt fast immer', tipp: '„Ich merke …, darum mache ich …“' },
    { id: 'raus', label: 'Kurz raus', icon: 'right', hinweis: 'stark bei Rot', tipp: '„Ich bin kurz weg. Gleich wieder da.“' },
    { id: 'satz', label: 'Einen Satz sagen', icon: 'chat', hinweis: 'gut unter 60', tipp: '„Stopp, das nervt mich, weil …“' },
    { id: 'drauf', label: 'Draufhalten', icon: 'bolt', hinweis: 'Zähne zusammen, weiter', tipp: '„Ich halt das schon aus.“' },
  ];
  const Z = Object.fromEntries(ZUEGE.map((z) => [z.id, z]));
  const SKILLS = ['Fäuste ballen und lösen', 'lang ausatmen', 'Füße fest in den Boden', 'bis 10 zählen, Schultern runter'];
  const BRAUCHT = {
    gerecht: 'Dass es fair zugeht',
    gehoert: 'Dass jemand richtig zuhört',
    ruhe: 'Ruhe und Zeit für sich',
    hilfe: 'Hilfe von einer erwachsenen Person',
    recht: 'Recht bekommen, egal wie',
    rache: 'Dass die anderen es zurückkriegen',
  };
  /* Szenen: Start-Pegel, sechs Auslöser (Text, Stärke, Warnsignal), ruhiger Satz und Satz bei über 70,
     knall = Eskalation, braucht = zwei passende Bedürfnisse, gut = Ende unter 70, help = Hilfenummern am Ende */
  const SZENEN = [
    { id: 'training', fig: 'mika', titel: 'Das Training', start: 35, text: 'Fußballtraining. Mika hatte schon einen blöden Tag.',
      ausloeser: [
        { t: 'Der Trainer ruft: „Mika, schneller! Was ist heute los?“', d: 12, sig: 'Kiefer fest' },
        { t: 'Ein Mitspieler grinst: „Heute wieder Bank?“', d: 14, sig: 'Schultern hoch' },
        { t: 'Mika wird im Zweikampf gefoult. Kein Pfiff.', d: 16, sig: 'Gesicht heiß' },
        { t: 'Der Mitspieler lacht laut mit den anderen.', d: 13, sig: 'Fäuste' },
        { t: 'Der Trainer: „Mika, reiß dich zusammen!“', d: 15, sig: 'Stimme wird laut' },
        { t: 'Der Ball fliegt Mika an den Kopf. „Sorry“ – mit Grinsen.', d: 18, sig: 'Geht nach vorn' },
      ],
      satz: '„Hey, das war ein Foul. Lass das.“', schrei: '„Halt den Mund, du Idiot!“',
      knall: 'Mika schubst den Mitspieler. Training vorbei, Gespräch mit dem Trainer.',
      gut: 'Nach dem Training sagt Mika zum Trainer: „Ich wurde heute dreimal gefoult. Das war nicht fair.“ Der Trainer hört zu.',
      braucht: ['gerecht', 'gehoert'] },
    { id: 'bruder', fig: 'luca', titel: 'Der kranke Bruder', start: 30, text: 'Luca will in Ruhe zocken. Der kleine Bruder ist krank und den ganzen Tag zu Hause.',
      ausloeser: [
        { t: 'Der Bruder will mitspielen. Sofort.', d: 10, sig: 'Stirn kraus' },
        { t: 'Mama: „Lass ihn halt, er ist krank.“', d: 14, sig: 'Kiefer fest' },
        { t: 'Der Bruder drückt mitten im Level auf Pause.', d: 12, sig: 'Hände kribbeln' },
        { t: 'Kabel raus. Der Spielstand ist weg.', d: 18, sig: 'Gesicht heiß' },
        { t: 'Mama: „Jetzt stell dich nicht so an.“', d: 15, sig: 'Stimme wird laut' },
        { t: 'Der Bruder petzt, Luca hätte ihn geschubst. Stimmt nicht.', d: 16, sig: 'Fäuste' },
      ],
      satz: '„Ich brauch eine Stunde für mich. Danach spielen wir zusammen.“', schrei: '„Ihr nervt alle! Lasst mich in Ruhe!“',
      knall: 'Luca knallt die Tür so fest, dass ein Bild runterfällt. Die Konsole ist für eine Woche weg.',
      gut: 'Luca sagt Mama: „Ich brauch eine Stunde für mich, dann kümmere ich mich.“ Mama nickt. Später spielen die beiden zusammen.',
      braucht: ['ruhe', 'gehoert'] },
    { id: 'gruppe', fig: 'yara', titel: 'Die Gruppenarbeit', start: 40, text: 'Gruppenarbeit. Yara macht seit zwei Wochen fast alles allein.',
      ausloeser: [
        { t: 'Sam hat wieder nichts vorbereitet.', d: 12, sig: 'Schultern hoch' },
        { t: 'Der Lehrer lobt Sam – für Yaras Idee.', d: 16, sig: 'Kiefer fest' },
        { t: 'Sam: „Ist doch egal, wer es war.“', d: 12, sig: 'Gesicht heiß' },
        { t: 'Jemand flüstert: „Streberin.“', d: 14, sig: 'Fäuste' },
        { t: 'Der Lehrer: „Yara, sei doch nicht so verbissen.“', d: 15, sig: 'Stimme wird laut' },
        { t: 'Sam schreibt: „Morgen bin ich krank, mach du die Präsentation.“', d: 16, sig: 'Geht nach vorn' },
      ],
      satz: '„Ich will, dass klar ist, wer was gemacht hat.“', schrei: '„Ihr seid alle so unfair!“',
      knall: 'Yara zerreißt das Plakat vor der ganzen Klasse. Zwei Wochen Arbeit im Müll.',
      gut: 'Yara geht nach der Stunde zum Lehrer: „Die Idee war von mir. Und ich mache fast alles allein.“ Der Lehrer teilt die Gruppe neu ein.',
      braucht: ['gerecht', 'hilfe'] },
    { id: 'video', fig: 'sam', titel: 'Das Video', start: 40, help: true, text: 'Abends im Gruppenchat: Jemand hat ein Video von Sams Sturz beim Sport gepostet.',
      ausloeser: [
        { t: 'Drei Lach-Smileys unter dem Video.', d: 12, sig: 'Kiefer fest' },
        { t: 'Jemand macht einen Sticker daraus.', d: 15, sig: 'Gesicht heiß' },
        { t: 'Neuer Spitzname im Chat: „Banana-Sam“.', d: 14, sig: 'Schultern hoch' },
        { t: 'Sams Freund lacht mit.', d: 16, sig: 'Fäuste' },
        { t: 'Das Video landet in einer anderen Gruppe.', d: 18, sig: 'Tippt in Großbuchstaben' },
        { t: '„Ist doch nur Spaß, chill mal.“', d: 12, sig: 'Steht auf, läuft hin und her' },
      ],
      satz: '„Löscht das Video bitte. Das ist nicht lustig für mich.“', schrei: '„IHR SEID SO ASSI!!!“',
      knall: 'Sam schreibt Beleidigungen in alle Gruppen. Jetzt ist Sam der, über den alle reden.',
      gut: 'Sam macht Screenshots, schreibt „Löscht das bitte“ und zeigt es am nächsten Morgen der Klassenlehrerin.',
      braucht: ['hilfe', 'gehoert'] },
  ];

  // Wirkung eines Zugs bei Pegel p, bevor der Auslöser trifft. faktor = wie stark der Auslöser dann trifft
  function zugWirkung(id, p) {
    if (id === 'skill') return p < 85 ? { d: -15, f: 1, t: 'merkt das Warnsignal und macht einen Skill' } : { d: -8, f: 1, t: 'macht einen Skill – bei so hohem Pegel wirkt er nur ein bisschen' };
    if (id === 'raus') return p < 40 ? { d: -5, f: 0.4, t: 'geht kurz raus – geht, war aber noch nicht nötig. Die Sache bleibt liegen', offen: 1 } : { d: -20, f: 0.4, t: 'geht kurz raus, trinkt Wasser und kommt zurück', offen: 1 };
    if (id === 'satz') return p < 60 ? { d: -12, f: 0.7, t: 'sagt ruhig einen klaren Satz' } : p < 70 ? { d: -4, f: 1, t: 'sagt einen Satz – knapp, aber es klappt noch' } : { d: +10, f: 1, t: 'will einen Satz sagen – bei über 70 kommt er als Schrei raus', schrei: true };
    return { d: 0, f: 1.3, t: 'beißt die Zähne zusammen und macht weiter. Die Wut stapelt sich' };
  }

  // Nächster Platz im Kreis (wie Story-Staffel)
  const dreh = (z, n) => (z % Math.max(1, n)) + 1;

  function pegelKopf(ctx, sc, p, sig, o) {
    const oo = o || {};
    const name = ctx.figures[sc.fig].name;
    const meter = ctx.meter({ value: p, label: name });
    return h('div', { class: 'kp-kopf' },
      h('div', { class: 'kp-fig' }, ctx.avatar(sc.fig, p >= 70 ? 'wut' : p >= 40 ? 'genervt' : 'neutral', 84), h('b', { class: 'fig-name' }, name)),
      h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
        meter.el,
        h('div', { class: 'row', style: { gap: '8px' } },
          h('span', { class: 'amp-pill', 'data-ampel': K().stufe(p) }, K().AMPEL[K().stufe(p)].name + ' · ' + p),
          h('span', { class: 'pill kp-ziel' + (p < ZIEL ? ' ok' : '') }, 'Crew-Ziel: unter ' + ZIEL),
          sig ? h('span', { class: 'kp-sig' + (oo.gross ? ' gross' : '') }, CREW.icon('eye', 18), 'Warnsignal: ' + sig) : null)));
  }

  CREW.registerGame({
    id: 'kipp-punkt',
    template: 'T5',
    icon: 'bolt',
    szenen: SZENEN, zugWirkung, dreh, // für den Test
    themen: ['Wut früh bremsen', 'Erst runter, dann reden', 'Folgen abschätzen', 'Bedürfnis hinter der Wut'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      const sc = ctx.rpick(SZENEN);
      const name = ctx.figures[sc.fig].name;
      const n = Math.max(2, ctx.n || 5);
      const zuege = Math.min(6, Math.max(4, n));
      await ctx.T.intro({
        rule: 'Die Wut steckt im Körper der Figur. Das iPad wandert: Jede Person sieht Pegel und nächsten Auslöser und wählt einen Zug. Crew-Ziel: unter 70 bleiben.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Nur du schaust', text: 'Pegel, Warnsignal, nächster Auslöser.' },
          { icon: 'leaf', title: 'Zug + ein Satz', text: 'Skill, raus, Satz sagen oder draufhalten – und laut sagen, warum.' },
          { icon: 'heart', title: 'Was braucht die Figur?', text: 'Am Ende entscheidet die ganze Crew.' },
        ],
        probe: ctx.T.probeCard('Probe: ' + name + ' ist bei 50, gleich kommt ein blöder Spruch. Welcher Zug? Tippt irgendwas – zählt nicht.', ZUEGE.slice(0, 3).map((z) => ({ label: z.label, value: z.id, variant: 'ghost', icon: z.icon }))),
      });
      // Die Szene für alle
      let p = sc.start;
      const w0 = ctx.scr([
        ctx.figureCard({ fig: sc.fig, mood: 'genervt', text: sc.text, eyebrow: sc.titel + ' · So fängt es an' }),
        pegelKopf(ctx, sc, p, null),
        ctx.say(zuege + ' Züge, jede Person einer. Ab ' + KNALL + ' kippt es – dann wird zurückgespult. Ziel: am Ende unter ' + ZIEL + '.', { eyebrow: 'Crew-Ziel', small: true }),
      ], { eyebrow: sc.titel, badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(w0, 'Staffel starten', { id: 'kp-start' })) === ctx.SKIP) return { summary: 'Heute keine Staffel. Nächstes Mal.' };
      let seat = 1, rewinds = 0, offen = 0, maxP = p, gespielt = 0, lastSig = null;
      const count = { skill: 0, raus: 0, satz: 0, drauf: 0 };
      const verlauf = [];
      let skillI = 0;
      for (let zug = 1; zug <= zuege; zug++) {
        const L = zug <= 2 ? 1 : 2;
        if (zug === 3) await ctx.T.level({ n: 2, names: LEVELS, text: 'Ab jetzt keine Hinweise mehr an den Zügen – und die Auslöser werden heftiger. Schaut voraus: Was kommt als Nächstes?' });
        const a = sc.ausloeser[Math.min(zug - 1, sc.ausloeser.length - 1)];
        const c = await ctx.T.cover({ who: 'Nur du schaust', eyebrow: 'Zug ' + zug + ' von ' + zuege, hint: 'Die anderen schauen weg. Du entscheidest den nächsten Zug für ' + name + '.', extra: h('div', { class: 'row center' }, h('span', { class: 'amp-pill', 'data-ampel': K().stufe(p) }, 'Pegel ' + p), h('span', { class: 'pill accent' }, 'Platz ' + seat)) });
        if (c === ctx.SKIP) { seat = dreh(seat, n); continue; }
        const vorher = p;
        let tipOpen = false;
        const tipBox = h('div', { class: 'card soft stack', style: { display: 'none' } }, ZUEGE.map((z) => h('span', { class: 'chip small' }, CREW.icon(z.icon, 16), z.tipp)));
        const wZ = ctx.scr([
          pegelKopf(ctx, sc, p, lastSig || (zug === 1 ? 'noch keins' : null), { gross: L === 1 }),
          h('div', { class: 'kp-next' }, h('div', { class: 'row between', style: { gap: '8px', gridColumn: '1 / -1' } }, h('span', { class: 'eyebrow' }, 'Gleich passiert'), ctx.readBtn('Pegel ' + p + '. Gleich passiert: ' + a.t)), h('b', null, a.t), h('span', { class: 'pill teamB' }, '+' + a.d + ' Hitze')),
          h('div', { class: 'row between' }, h('b', null, 'Welcher Zug, bevor das passiert? Sag laut in einem Satz, warum.'), CREW.ui.btn('Tipp', () => { tipOpen = !tipOpen; tipBox.style.display = tipOpen ? '' : 'none'; }, { small: true, variant: 'ghost', icon: 'help', id: 'kp-tipp' })),
          tipBox,
        ], { eyebrow: 'Zug ' + zug + ' · Dein Zug', badge: ctx.stufe(L, LEVELS) });
        const typ = await ctx.ask(wZ, ZUEGE.map((z) => ({ label: z.label + (L === 1 ? ' · ' + z.hinweis : ''), value: z.id, icon: z.icon, variant: z.id === 'drauf' ? 'teamB' : 'ghost', id: 'kp-zug-' + z.id })));
        if (typ === ctx.SKIP) { seat = dreh(seat, n); continue; }
        gespielt++;
        count[typ]++;
        const wk = zugWirkung(typ, p);
        if (wk.offen) offen += wk.offen;
        const nachZug = Math.max(5, Math.min(100, p + wk.d));
        const treffer = Math.round(a.d * wk.f);
        p = Math.max(5, Math.min(100, nachZug + treffer));
        maxP = Math.max(maxP, p);
        lastSig = a.sig;
        const zugText = name + ' ' + wk.t + (typ === 'skill' ? ' (' + SKILLS[skillI++ % SKILLS.length] + ')' : '') + '.' + (typ === 'satz' ? ' ' + (wk.schrei ? sc.schrei : sc.satz) : '');
        // Kippt es? Zurückspulen statt „falsch“
        if (p >= KNALL) {
          CREW.sound.play('soft');
          const wK = ctx.scr([
            h('div', { class: 'stop-big display' }, 'Gekippt!'),
            ctx.figureCard({ fig: sc.fig, mood: 'wut', text: sc.knall, eyebrow: 'Pegel ' + p }),
            h('p', { class: 'muted' }, 'Kein „falsch“. Zurückspulen: Der Zug wird zurückgenommen, die nächste Person macht es anders.'),
          ], { eyebrow: 'Zug ' + zug, badge: ctx.stufe(L, LEVELS) });
          await ctx.next(wK, 'Zurückspulen', { id: 'btn-rewind' });
          rewinds++;
          p = vorher;
          seat = dreh(seat, n);
          await ctx.T.passOn({ direction: 'links', text: 'Gib das iPad nach links. Die nächste Person macht diesen Zug anders.', extra: h('span', { class: 'amp-pill', 'data-ampel': K().stufe(p) }, 'Pegel ' + p) });
          zug--; // derselbe Auslöser nochmal
          if (rewinds > 3) zug++; // nicht endlos
          continue;
        }
        verlauf.push({ typ, vorher, nachher: p });
        CREW.sound.play(p < vorher ? 'good' : 'tap');
        const wR = ctx.scr([
          h('div', { class: 'kp-said', 'data-zug': typ }, CREW.icon(Z[typ].icon, 24), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Zug ' + zug + ' · ' + Z[typ].label), h('b', null, zugText))),
          h('div', { class: 'kp-next done' }, h('span', { class: 'eyebrow' }, 'Dann passiert'), h('b', null, a.t), h('span', { class: 'pill' }, (treffer >= 0 ? '+' : '') + treffer + ' Hitze')),
          pegelKopf(ctx, sc, p, a.sig),
          h('div', { class: 'kp-spur' }, verlauf.map((v, i) => h('span', { class: 'kp-spur-p', 'data-ampel': K().stufe(v.nachher), title: Z[v.typ].label }, CREW.icon(Z[v.typ].icon, 14), String(v.nachher)))),
          h('p', { class: 'muted small' }, 'Zeig die Karte allen oder lies sie vor. Es geht um ' + name + ', nicht um dich.'),
        ], { eyebrow: 'Zug ' + zug + ' · Reaktion', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wR, 'Allen gezeigt');
        if (zug < zuege) {
          seat = dreh(seat, n);
          await ctx.T.passOn({ direction: 'links', text: 'Gib das iPad nach links. Die nächste Person sieht den neuen Pegel. Pass ist okay: einfach weitergeben.', extra: h('div', { class: 'stack', style: { alignItems: 'center', gap: '6px' } }, h('div', { class: 'display kp-seat' }, 'Platz ' + seat), h('span', { class: 'amp-pill', 'data-ampel': K().stufe(p) }, 'Pegel ' + p)) });
        }
      }
      // Level 3: Was braucht die Figur? – die ganze Crew
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Alle zusammen: Unter der Wut steckt ein Bedürfnis. Was braucht ' + name + ' eigentlich? Redet kurz, dann tippt die Person mit dem iPad.' });
      const optsB = ctx.rshuffle(sc.braucht.concat(ctx.rshuffle(Object.keys(BRAUCHT).filter((k) => !sc.braucht.includes(k))).slice(0, 2)));
      const wB = ctx.scr([
        pegelKopf(ctx, sc, p, lastSig),
        ctx.say('Was braucht ' + name + ' eigentlich?', { eyebrow: 'Die ganze Crew', small: true }),
      ], { eyebrow: 'Was braucht ' + name + '?', badge: ctx.stufe(3, LEVELS) });
      const br = await ctx.ask(wB, optsB.map((k) => ({ label: BRAUCHT[k], value: k, variant: 'ghost', id: 'kp-braucht-' + k })), { autoPick: () => sc.braucht[0] });
      const brOk = br !== ctx.SKIP && sc.braucht.includes(br);
      const geschafft = p < ZIEL;
      if (geschafft) { CREW.sound.play('great'); if (!ctx.fast) CREW.ui.confetti(90); }
      const wE = ctx.scr([
        h('div', { class: 'kp-ende' + (geschafft ? ' ok' : '') }, h('b', { class: 'display' }, geschafft ? 'Unter ' + ZIEL + '!' : 'Über ' + ZIEL), h('span', null, geschafft ? 'Crew-Ziel geschafft. Höchster Pegel: ' + maxP + '.' : 'Diesmal nicht. Höchster Pegel: ' + maxP + '. Nächstes Mal früher bremsen.')),
        ctx.figureCard({ fig: sc.fig, mood: geschafft ? 'froh' : 'traurig', text: br === ctx.SKIP ? sc.gut : brOk ? 'Genau: ' + BRAUCHT[br] + '. ' + sc.gut : BRAUCHT[br] + '? Das würde den Ärger eher verlängern. Was ' + name + ' braucht: ' + sc.braucht.map((k) => BRAUCHT[k]).join(' und ') + '.', eyebrow: 'Was ' + name + ' braucht' }),
        h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Runter unter 70“'), offen ? h('span', { class: 'muted small' }, offen + '× kurz raus – gut so. Danach muss man trotzdem reden.') : null),
      ], { eyebrow: 'Ergebnis', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wE, 'Weiter');
      return {
        summary: geschafft ? 'Unter ' + ZIEL + ' geblieben: früh bremsen, erst runter, dann reden.' : 'Die Wut war schneller. Früher bremsen – erst runter, dann reden.',
        stats: [[p, 'Pegel am Ende'], [count.skill + count.raus, 'Brems-Züge'], [rewinds, 'zurückgespult']].concat(br !== ctx.SKIP ? [[brOk ? 1 : 0, 'Bedürfnis erkannt']] : []),
        help: !!sc.help,
        again: true,
      };
    },
  });
})();
